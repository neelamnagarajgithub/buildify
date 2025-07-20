import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/auth");
    } else {
      navigate("/dashboard");
    }
  };
  const handlewatchClick = () => {
    window.open("https://www.youtube.com/watch?v=Q77OWHg8fq0", "_blank");
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-glass backdrop-blur-glass border border-glass rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Build anything. No code required.</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in delay-200">
          Build <span className="bg-gradient-primary bg-clip-text text-transparent">Powerful SaaS</span>
          <br />
          Apps in Minutes
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in delay-300">
          Create custom CRMs, dashboards, and business tools with our intuitive drag-and-drop builder.
          No coding skills needed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-500">
          <Button variant="hero" size="xl" className="group"  onClick={handleClick}>
            Start Building Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button variant="glass" size="xl" onClick={handlewatchClick}>
            <Zap className="w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Social proof */}
        <div className="text-sm text-muted-foreground animate-fade-in delay-700">
          <p className="mb-4">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="h-8 w-24 bg-gradient-to-r from-muted to-muted/50 rounded" />
            <div className="h-8 w-32 bg-gradient-to-r from-muted to-muted/50 rounded" />
            <div className="h-8 w-28 bg-gradient-to-r from-muted to-muted/50 rounded" />
            <div className="h-8 w-36 bg-gradient-to-r from-muted to-muted/50 rounded" />
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-20 animate-bounce delay-1000">
        <div className="w-16 h-16 bg-primary/20 rounded-lg rotate-12 backdrop-blur-sm border border-primary/30" />
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-[1500ms]">
        <div className="w-12 h-12 bg-primary-glow/20 rounded-full backdrop-blur-sm border border-primary-glow/30" />
      </div>
    </section>
  );
};