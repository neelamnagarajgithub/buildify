-- Fix infinite recursion in RLS policies for projects table

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view their own projects and collaborations" ON public.projects;

-- Recreate the policies with correct references
CREATE POLICY "Users can update their own projects" 
ON public.projects 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (auth.uid() IN (
    SELECT project_collaborators.user_id
    FROM project_collaborators
    WHERE project_collaborators.project_id = projects.id 
    AND project_collaborators.role = ANY (ARRAY['owner'::text, 'editor'::text])
  ))
);

CREATE POLICY "Users can view their own projects and collaborations" 
ON public.projects 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (auth.uid() IN (
    SELECT project_collaborators.user_id
    FROM project_collaborators
    WHERE project_collaborators.project_id = projects.id
  ))
);