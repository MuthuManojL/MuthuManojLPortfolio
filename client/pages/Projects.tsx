import { useState, useEffect } from "react";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("min-h-screen", isDarkMode ? "bg-tech-darker" : "bg-white")}>
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A showcase of my work in IoT, embedded systems, healthcare innovation, and research.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectGrid isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
