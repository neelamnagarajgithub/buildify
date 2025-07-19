-- Add foreign key relationship between project_collaborators and profiles
ALTER TABLE public.project_collaborators 
ADD CONSTRAINT fk_project_collaborators_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key relationship between project_collaborators and projects  
ALTER TABLE public.project_collaborators
ADD CONSTRAINT fk_project_collaborators_project_id
FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;