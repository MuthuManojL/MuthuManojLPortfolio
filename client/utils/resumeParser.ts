import { ResumeData } from "@/data/resumeData";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Parse resume PDF file and extract text
 * Note: Full PDF parsing is complex. This provides basic extraction capability.
 * For production use, consider using a server-side PDF parsing service.
 */
export async function parsePDFFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      text += pageText + "\n";
    }

    return text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF file");
  }
}

/**
 * Convert JSON resume data to HTML string
 * Useful for generating printable HTML or PDF
 */
export function resumeDataToHTML(data: ResumeData): string {
  return `
    <div class="resume">
      <header>
        <h1>${escapeHTML(data.personal.name)}</h1>
        <p class="title">${escapeHTML(data.personal.title)}</p>
        <div class="contact">
          <a href="mailto:${data.personal.email}">${escapeHTML(data.personal.email)}</a> |
          ${escapeHTML(data.personal.phone)} |
          ${escapeHTML(data.personal.location)}
          ${data.personal.linkedin ? `| <a href="${data.personal.linkedin}">LinkedIn</a>` : ""}
        </div>
      </header>

      <section>
        <h2>Career Objective</h2>
        <p>${escapeHTML(data.professional.objective)}</p>
      </section>

      <section>
        <h2>Education</h2>
        ${data.education
          .map(
            (edu) => `
          <div class="entry">
            <h3>${escapeHTML(edu.degree)}</h3>
            <p class="institution">${escapeHTML(edu.institution)}</p>
            <p class="meta">${escapeHTML(edu.duration)} | ${escapeHTML(edu.cgpa)}</p>
          </div>
        `
          )
          .join("")}
      </section>

      <section>
        <h2>Experience</h2>
        ${data.experience
          .map(
            (exp) => `
          <div class="entry">
            <h3>${escapeHTML(exp.title)}</h3>
            <p class="company">${escapeHTML(exp.company)}</p>
            <p class="meta">${escapeHTML(exp.duration)} ${exp.days ? `(${exp.days} days)` : ""}</p>
            ${exp.description ? `<p>${escapeHTML(exp.description)}</p>` : ""}
          </div>
        `
          )
          .join("")}
      </section>

      <section>
        <h2>Projects</h2>
        ${data.projects
          .map(
            (proj) => `
          <div class="entry">
            <h3>${escapeHTML(proj.title)}</h3>
            <p>${escapeHTML(proj.description)}</p>
            <p class="meta">${escapeHTML(proj.year)}</p>
          </div>
        `
          )
          .join("")}
      </section>

      <section>
        <h2>Publications</h2>
        <ul>
          ${data.publications
            .map(
              (pub) => `
            <li>
              <strong>${escapeHTML(pub.type)}:</strong> ${escapeHTML(pub.title)}
              ${pub.event ? `- ${escapeHTML(pub.event)}` : ""}
              ${pub.publisher ? `(${escapeHTML(pub.publisher)})` : ""}
              <em>${escapeHTML(pub.date)}</em>
            </li>
          `
            )
            .join("")}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        ${data.skills
          .map(
            (skillGroup) => `
          <div>
            <h3>${escapeHTML(skillGroup.category)}</h3>
            <p>${skillGroup.items.map(escapeHTML).join(" • ")}</p>
          </div>
        `
          )
          .join("")}
      </section>

      <section>
        <h2>Certifications</h2>
        <ul>
          ${data.certifications
            .map(
              (cert) => `
            <li>${escapeHTML(cert.name)} - ${escapeHTML(cert.issuer)}</li>
          `
            )
            .join("")}
        </ul>
      </section>

      <section>
        <h2>Languages</h2>
        <p>${data.languages.map(escapeHTML).join(" • ")}</p>
      </section>

      <section>
        <h2>Leadership & Impact</h2>
        <ul>
          ${data.leadership
            .map(
              (lead) => `
            <li><strong>${escapeHTML(lead.role)}</strong> - ${escapeHTML(lead.organization)} (${escapeHTML(lead.year)})</li>
          `
            )
            .join("")}
        </ul>
      </section>
    </div>
  `;
}

/**
 * Escape HTML special characters
 */
function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Extract email addresses from parsed text
 */
export function extractEmails(text: string): string[] {
  const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
  return text.match(emailRegex) || [];
}

/**
 * Extract phone numbers from parsed text
 */
export function extractPhones(text: string): string[] {
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}[-.\s]?\d{4}/g;
  return text.match(phoneRegex) || [];
}
