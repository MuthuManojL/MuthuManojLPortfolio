import { useState, useEffect } from "react";
import { Project, PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects?: Project[];
  showFilter?: boolean;
  isDarkMode?: boolean;
}

type FilterCategory = "all" | Project["category"];

export default function ProjectGrid({
  projects = PROJECTS,
  showFilter = true,
  isDarkMode = false,
}: ProjectGridProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeFilter));
    }
  }, [activeFilter, projects]);

  const categories: { value: FilterCategory; label: string }[] = [
    { value: "all", label: "All" },
    { value: "iot", label: "IoT" },
    { value: "research", label: "Research" },
    { value: "concepts", label: "Concepts" },
    { value: "healthcare", label: "Healthcare" },
  ];

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      {showFilter && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeFilter === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(cat.value)}
              className={cn(
                "transition-all",
                activeFilter === cat.value && isDarkMode
                  ? "bg-neon-cyan text-tech-dark hover:bg-neon-cyan/90"
                  : ""
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isDarkMode={isDarkMode}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-foreground/60">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Result Count */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>
    </div>
  );
}
