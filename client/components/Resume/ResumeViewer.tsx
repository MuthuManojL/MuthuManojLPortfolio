import { RESUME_DATA, ResumeData } from "@/data/resumeData";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Award,
  BookOpen,
  Briefcase,
} from "lucide-react";

interface ResumeViewerProps {
  data?: ResumeData;
  isDarkMode?: boolean;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
      <span className="w-1 h-6 bg-neon-cyan rounded-full" />
      {children}
    </h2>
  );
}

export default function ResumeViewer({
  data = RESUME_DATA,
  isDarkMode = false,
}: ResumeViewerProps) {
  return (
    <div
      className={cn(
        "max-w-4xl mx-auto p-8 sm:p-12 space-y-8",
        isDarkMode ? "bg-tech-darker" : "bg-white"
      )}
      id="resume-content"
    >
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{data.personal.name}</h1>
          <p className="text-lg text-accent mt-2 font-semibold">{data.personal.title}</p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <a href={`mailto:${data.personal.email}`} className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors">
            <Mail className="w-4 h-4" />
            {data.personal.email}
          </a>
          <a href={`tel:${data.personal.phone}`} className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            {data.personal.phone}
          </a>
          <div className="flex items-center gap-2 text-foreground/70">
            <MapPin className="w-4 h-4" />
            {data.personal.location}
          </div>
          {data.personal.linkedin && (
            <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Career Objective */}
      <div className="space-y-3">
        <SectionTitle>Career Objective</SectionTitle>
        <p className="text-foreground/70 leading-relaxed">{data.professional.objective}</p>
        <p className="text-foreground/70 leading-relaxed">{data.professional.summary}</p>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <SectionTitle>Education</SectionTitle>
        {data.education.map((edu, idx) => (
          <div key={idx} className="space-y-2 pb-4 last:pb-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-foreground/60">{edu.institution}</p>
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {edu.duration}
              </span>
            </div>
            <p className="text-sm font-medium text-accent">{edu.cgpa}</p>
            {edu.details && (
              <ul className="text-sm text-foreground/60 space-y-1 ml-4">
                {edu.details.map((detail, i) => (
                  <li key={i} className="list-disc">
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <SectionTitle>Experience</SectionTitle>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="space-y-2 pb-4 last:pb-0 border-l-2 border-accent/20 pl-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <p className="text-foreground/60">{exp.company}</p>
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {exp.duration}
              </span>
            </div>
            {exp.days && (
              <p className="text-sm text-accent">({exp.days} days)</p>
            )}
            {exp.description && (
              <p className="text-sm text-foreground/60">{exp.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <SectionTitle>Projects</SectionTitle>
        {data.projects.map((project, idx) => (
          <div key={idx} className="space-y-1 pb-3 last:pb-0">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold">{project.title}</h3>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {project.year}
              </span>
            </div>
            <p className="text-sm text-foreground/60">{project.description}</p>
          </div>
        ))}
      </div>

      {/* Publications & Certifications */}
      <div className="space-y-4">
        <SectionTitle>Research Excellence & Certifications</SectionTitle>

        {/* Publications */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Publications & Awards
          </h3>
          {data.publications.map((pub, idx) => (
            <div key={idx} className="text-sm space-y-1">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    {pub.type}: {pub.title}
                  </p>
                  <p className="text-foreground/60">
                    {pub.event || pub.publisher} {pub.institution && `- ${pub.institution}`}
                  </p>
                  <p className="text-xs text-muted-foreground">{pub.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <SectionTitle>Technical Skills</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.skills.map((skillGroup, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, i) => (
                  <Badge key={i} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <SectionTitle>Languages</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((lang, idx) => (
            <Badge key={idx} variant="outline">
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="space-y-4">
        <SectionTitle>Leadership & Co-Curricular Impact</SectionTitle>
        {data.leadership.map((lead, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4 text-sm pb-3 last:pb-0">
            <div>
              <p className="font-semibold">{lead.role}</p>
              <p className="text-foreground/60">{lead.organization}</p>
            </div>
            <span className="text-muted-foreground whitespace-nowrap">{lead.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
