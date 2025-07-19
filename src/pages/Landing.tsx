import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Star, Users, Zap } from "lucide-react";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      
      {/* Templates Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get Started with 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Ready-Made Templates</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from professionally designed templates and customize them to fit your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "CRM Dashboard", type: "Customer Management", preview: "crm-preview.jpg" },
              { name: "Project Tracker", type: "Team Collaboration", preview: "project-preview.jpg" },
              { name: "E-commerce Admin", type: "Online Store", preview: "ecommerce-preview.jpg" },
              { name: "Analytics Dashboard", type: "Data Visualization", preview: "analytics-preview.jpg" },
              { name: "Task Manager", type: "Productivity", preview: "task-preview.jpg" },
              { name: "Invoice Generator", type: "Business Tools", preview: "invoice-preview.jpg" }
            ].map((template, index) => (
              <Card key={template.name} className="group bg-glass backdrop-blur-glass border-glass hover:shadow-glow transition-all duration-300 hover:scale-105">
                <div className="aspect-video bg-gradient-secondary rounded-t-lg relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary-glow/10">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{template.type}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{template.type}</p>
                  <Button variant="hero" className="w-full group">
                    Use Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Loved by Teams 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Worldwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Product Manager",
                company: "TechCorp",
                content: "Buildify transformed how we build internal tools. What used to take weeks now takes hours.",
                rating: 5
              },
              {
                name: "Mike Rodriguez",
                role: "Startup Founder",
                company: "GrowthLab",
                content: "The drag-and-drop interface is incredibly intuitive. Our MVP was ready in just 2 days!",
                rating: 5
              },
              {
                name: "Emily Watson",
                role: "Operations Lead",
                company: "ScaleUp Inc",
                content: "Finally, a no-code platform that doesn't compromise on functionality. Game-changer!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={testimonial.name} className="bg-glass backdrop-blur-glass border-glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Build Your 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Dream App?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams already building with Buildify. Start free, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="group">
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl">
                Schedule Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-glass bg-glass backdrop-blur-glass">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Buildify</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © 2024 Buildify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};