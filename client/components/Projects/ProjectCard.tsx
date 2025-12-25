import { Project } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  isDarkMode?: boolean;
}

export default function ProjectCard({ project, isDarkMode = false }: ProjectCardProps) {

  const categoryColors: Record<Project["category"], { bg: string; text: string }> = {
    iot: { bg: isDarkMode ? "bg-neon-cyan/10" : "bg-accent/10", text: isDarkMode ? "text-neon-cyan" : "text-accent" },
    research: {
      bg: isDarkMode ? "bg-neon-magenta/10" : "bg-destructive/10",
      text: isDarkMode ? "text-neon-magenta" : "text-destructive",
    },
    concepts: { bg: isDarkMode ? "bg-yellow-400/10" : "bg-yellow-100", text: isDarkMode ? "text-yellow-400" : "text-yellow-600" },
    healthcare: { bg: isDarkMode ? "bg-violet-400/10" : "bg-violet-100", text: isDarkMode ? "text-violet-400" : "text-violet-600" },
  };

  const categoryColor = categoryColors[project.category];

  return (
    <Card
      className={cn(
        "relative h-full overflow-hidden group transition-all duration-300 hover:shadow-lg",
        isDarkMode ? "hover:border-neon-cyan/50" : "hover:border-accent/50"
      )}
    >
      {/* Background gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          categoryColor.bg
        )}
      />

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4 space-y-3">
          {/* Category Badge */}
          <div
            className={cn(
              "w-fit px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all",
              categoryColor.bg,
              categoryColor.text
            )}
          >
            {project.category}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/60 mb-4 flex-grow">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">{project.date}</span>

          {/* Status Badge */}
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded capitalize",
              project.status === "completed"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : project.status === "ongoing"
                  ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            )}
          >
            {project.status}
          </span>
        </div>
      </div>
    </Card>
  );
}