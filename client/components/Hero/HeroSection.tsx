import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BitsRealisticModel } from "@/bits/BitsRealisticModel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { useRobotAnimations } from "@/hooks/useRobotAnimations";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  isDarkMode: boolean;
}

export default function HeroSection({ isDarkMode }: HeroSectionProps) {
  const robotAnimationsRef = useRef<ReturnType<typeof useRobotAnimations>>();

  const handleSayHi = () => {
    if (robotAnimationsRef.current) {
      robotAnimationsRef.current.triggerWave();
      // Add a smile after the wave
      setTimeout(() => {
        robotAnimationsRef.current?.triggerSmile();
      }, 600);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 -z-10",
          isDarkMode
            ? "bg-gradient-tech"
            : "bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/30"
        )}
      />

      {/* Decorative elements */}
      <div className={cn(
        "absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl -z-10",
        isDarkMode ? "bg-neon-cyan/10" : "bg-indigo-200/20"
      )} />
      <div className={cn(
        "absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl -z-10",
        isDarkMode ? "bg-neon-magenta/10" : "bg-blue-200/20"
      )} />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text & CTAs */}
          <div className="space-y-6 lg:pr-8">
            {/* Name & Title */}
            <div className="space-y-2 animate-fade-in">
              <h1
                className={cn(
                  "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
                  isDarkMode
                    ? "bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent"
                    : "text-primary"
                )}
              >
                Muthu Manoj L
              </h1>
              <p
                className={cn(
                  "text-xl sm:text-2xl font-semibold",
                  isDarkMode ? "text-neon-cyan" : "text-accent"
                )}
              >
                Biomedical Engineer & IoT Innovator
              </p>
            </div>

            {/* Bio */}
            <p
              className={cn(
                "text-base sm:text-lg max-w-xl leading-relaxed",
                isDarkMode ? "text-foreground/80" : "text-foreground/70"
              )}
            >
              Passionate about leveraging technology to solve real-world healthcare challenges. 
              Specializing in IoT-enabled medical devices and smart healthcare solutions.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div
                className={cn(
                  "p-4 rounded-lg backdrop-blur-sm border",
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                )}
              >
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-neon-cyan" : "text-accent")}>
                  5+
                </p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div
                className={cn(
                  "p-4 rounded-lg backdrop-blur-sm border",
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                )}
              >
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-neon-magenta" : "text-destructive")}>
                  1
                </p>
                <p className="text-sm text-muted-foreground">Book Chapter</p>
              </div>
              <div
                className={cn(
                  "p-4 rounded-lg backdrop-blur-sm border",
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                )}
              >
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-accent" : "text-primary")}>
                  9.0
                </p>
                <p className="text-sm text-muted-foreground">IoT CGPA</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                onClick={handleSayHi}
                size="lg"
                className={cn(
                  "gap-2 font-semibold",
                  isDarkMode
                    ? "bg-neon-cyan hover:bg-neon-cyan/90 text-tech-dark"
                    : "bg-accent hover:bg-accent/90 text-white"
                )}
              >
                Say Hi 👋
              </Button>

              <Link to="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 font-semibold"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              <a
                href="https://www.linkedin.com/in/muthu-manoj-l-90a6b5252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 rounded-lg backdrop-blur-sm border transition-all hover:scale-110",
                  isDarkMode
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20"
                )}
              >
                <Linkedin className={cn("w-5 h-5", isDarkMode ? "text-neon-cyan" : "text-accent")} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 rounded-lg backdrop-blur-sm border transition-all hover:scale-110",
                  isDarkMode
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20"
                )}
              >
                <Github className={cn("w-5 h-5", isDarkMode ? "text-neon-magenta" : "text-destructive")} />
              </a>
            </div>
          </div>

          {/* Right Column - BitsRealisticModel */}
          <div className="hidden lg:flex justify-center items-center h-full min-h-[600px] relative">
            <BitsRealisticModel />
          </div>
        </div>
      </div>

      {/* Mobile version - smaller BitsRealisticModel */}
      <div className="lg:hidden absolute bottom-0 right-0 w-48 h-48 opacity-50 pointer-events-none">
        <div className="scale-75">
          <BitsRealisticModel />
        </div>
      </div>
    </section>
  );
}
