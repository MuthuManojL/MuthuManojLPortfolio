// @ts-ignore - html2pdf module
declare const html2pdf: any;

export interface PDFOptions {
  filename?: string;
  margin?: number | number[];
  pageSize?: "a4" | "letter";
}

/**
 * Generate PDF from HTML element
 * @param element - The HTML element to convert to PDF
 * @param options - PDF generation options
 */
export async function generatePDFFromElement(
  element: HTMLElement,
  options: PDFOptions = {}
) {
  const {
    filename = "Resume_Muthu_Manoj.pdf",
    margin = [10, 10, 10, 10],
    pageSize = "a4",
  } = options;

  const pdfOptions = {
    margin,
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: false },
    jsPDF: { orientation: "portrait", unit: "mm", format: pageSize },
  };

  try {
    await html2pdf().set(pdfOptions).from(element).save();
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
}

/**
 * Download resume as PDF
 */
export function downloadResumePDF() {
  const resumeElement = document.getElementById("resume-content");

  if (!resumeElement) {
    console.error("Resume element not found");
    return;
  }

  generatePDFFromElement(resumeElement, {
    filename: "Resume_Muthu_Manoj_L.pdf",
    margin: 15,
    pageSize: "a4",
  });
}

/**
 * Print resume (uses browser print dialog)
 */
export function printResume() {
  const resumeElement = document.getElementById("resume-content");

  if (!resumeElement) {
    console.error("Resume element not found");
    return;
  }

  const printWindow = window.open("", "", "height=800,width=1000");
  if (!printWindow) {
    console.error("Could not open print window");
    return;
  }

  printWindow.document.write(
    `
    <html>
      <head>
        <title>Resume - Muthu Manoj L</title>
        <style>
          ${getCSSForPrint()}
        </style>
      </head>
      <body>
        ${resumeElement.innerHTML}
      </body>
    </html>
  `
  );

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

/**
 * Get CSS styles for print-friendly resume
 */
function getCSSForPrint(): string {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #333;
      background: white;
      padding: 20px;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 4px;
      page-break-after: avoid;
    }

    h2 {
      font-size: 13px;
      margin-top: 12px;
      margin-bottom: 8px;
      page-break-after: avoid;
      border-bottom: 2px solid #00d4ff;
      padding-bottom: 4px;
    }

    h3 {
      font-size: 11px;
      font-weight: 600;
      margin-top: 4px;
      margin-bottom: 2px;
    }

    p {
      margin-bottom: 4px;
    }

    ul {
      margin-left: 16px;
      margin-bottom: 4px;
    }

    li {
      margin-bottom: 2px;
    }

    .section {
      page-break-inside: avoid;
      margin-bottom: 12px;
    }

    @media print {
      body {
        padding: 0;
      }

      h2 {
        page-break-before: avoid;
      }

      .no-print {
        display: none;
      }
    }
  `;
}
