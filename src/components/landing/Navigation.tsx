import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass dark:bg-[#18181c] backdrop-blur-glass border-b border-glass dark:border-[#23232a]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Buildify Logo" className="w-14 h-14 object-contain" />
            <span className="text-xl font-bold text-foreground dark:text-white">Buildify</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground dark:text-[#b0b0c3] hover:text-foreground dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth" className="text-foreground dark:text-white">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/auth" className="text-foreground dark:text-white">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5 text-foreground dark:text-white" /> : <Menu className="w-5 h-5 text-foreground dark:text-white" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-glass dark:border-[#23232a] animate-fade-in bg-glass dark:bg-[#18181c]">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground dark:text-[#b0b0c3] hover:text-foreground dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-glass dark:border-[#23232a]">
                <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/auth" className="text-foreground dark:text-white">Sign In</Link>
                </Button>
                <Button variant="hero" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/auth" className="text-foreground dark:text-white">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};