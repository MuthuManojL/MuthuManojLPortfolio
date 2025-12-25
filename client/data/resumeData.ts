export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  professional: {
    objective: string;
    summary: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    duration: string;
    cgpa: string;
    details?: string[];
  }[];
  experience: {
    title: string;
    company: string;
    duration: string;
    type: "internship" | "training" | "hospital";
    days?: number;
    description?: string;
  }[];
  projects: {
    title: string;
    description: string;
    year: string;
  }[];
  publications: {
    type: string;
    title: string;
    publisher?: string;
    event?: string;
    institution?: string;
    date: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  certifications: {
    name: string;
    issuer: string;
  }[];
  languages: string[];
  leadership: {
    role: string;
    organization: string;
    year: string;
  }[];
  interests: string[];
}

export const RESUME_DATA: ResumeData = {
  personal: {
    name: "Muthu Manoj L",
    title: "Biomedical Engineering Student | Specializing in IoT-Enabled Healthcare Innovations",
    email: "muthumanoj100@gmail.com",
    phone: "91-7845098181",
    location: "Vadavalli, Coimbatore, 641046",
    linkedin: "https://www.linkedin.com/in/muthu-manoj-l-90a6b5252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  professional: {
    objective:
      "Driven by a passion for solving real-world problems through technology, I build IoT-enabled products that eliminate human friction and reduce pain points. From helping patients remember medications and enabling seamless communication for the hearing impaired, to making vital health metrics accessible and automating complex tasks, I create solutions that matter.",
    summary:
      "I create intelligent IoT solutions that reduce manual effort and human barriers. Specializing in healthcare and smart automation, I focus on products that make health monitoring effortless, enhance accessibility for people with disabilities, automate routine tasks, and transform complex data into actionable insights. My work bridges the gap between users and better outcomes, whether in health, accessibility, or daily life efficiency.",
  },
  education: [
    {
      institution: "Dr. N.G.P Institute of Technology, Coimbatore",
      degree: "BE - Biomedical Engineering [Final Year]",
      field: "Biomedical Engineering",
      duration: "2022 - 2026",
      cgpa: "8.964 (upto VI Sem)",
      details: [
        "Minor Degree in Internet of Things (IoT) - CGPA: 9.0",
        "Focus on IoT-enabled healthcare solutions",
      ],
    },
    {
      institution: "Chinmaya Vidyalaya Matriculation Higher Secondary School, CBE",
      degree: "Higher Secondary",
      field: "General Studies",
      duration: "",
      cgpa: "HSC: 76.8% | SSLC: 75%",
    },
  ],
  experience: [
    {
      title: "Internet Of Things Internship",
      company: "Krish Tec, Coimbatore",
      duration: "July 2024",
      type: "internship",
      days: 15,
      description: "Hands-on training in IoT systems and implementations",
    },
    {
      title: "Hospital Training",
      company: "Kumaran Medical Center, CBE",
      duration: "September 2023",
      type: "hospital",
      days: 5,
    },
    {
      title: "Hospital Training",
      company: "Sri Ramakrishna Hospital, CBE",
      duration: "March 2025",
      type: "hospital",
      days: 15,
    },
    {
      title: "Hospital Training",
      company: "KMCH, Coimbatore",
      duration: "April 2023",
      type: "hospital",
      days: 6,
    },
    {
      title: "Hands-On Practice [MATLAB, Medical Instrumentation]",
      company: "Krish Tec",
      duration: "January 2024",
      type: "training",
      days: 7,
    },
    {
      title: "Hands-On Practice [MATLAB, Medical Instrumentation]",
      company: "Prashan Medical Technology",
      duration: "September 2024",
      type: "training",
      days: 7,
    },
  ],
  projects: [
    {
      title: "Pill Reminder (Simulation)",
      description:
        "Simulated a smart system to remind patients of medication timings, aiming to improve adherence and reduce missed doses.",
      year: "2023",
    },
    {
      title: "Smart Glasses with Real-Time Speech-to-Text Conversion",
      description:
        "Created wearable glasses that display real-time transcriptions of speech, enhancing communication for hearing-impaired individuals.",
      year: "2024-2025",
    },
    {
      title: "Non-Invasive Heart Rate Monitoring",
      description:
        "Developed a non-invasive heart rate monitor with real-time cloud visualization using ThingsBoard and MQTT.",
      year: "2025",
    },
  ],
  publications: [
    {
      type: "Best Paper Award",
      title: "Speech Transcription in Smart Glasses for Hearing Impaired People",
      event: "NCETBT-25",
      institution: "Hindustan College of Engineering and Technology",
      date: "10/2023",
    },
    {
      type: "Book Chapter",
      title: "Computational Techniques for Analysis of Breast Cancer",
      publisher: "Elsevier",
      institution: "Dr. N.G.P Institute of Technology",
      date: "2024",
    },
    {
      type: "Paper Presented",
      title: "Graphene-Infused Polyurethane Composites",
      event: "ISCIEM 2024",
      institution: "Sri Krishna College of Technology",
      date: "2024",
    },
    {
      type: "Paper Presented",
      title: "Mg²⁺ Decorated Titania over Ti Alloy for Biomedical Use",
      event: "ICOST'25",
      institution: "Annapoorna Engineering College, Salem",
      date: "2025",
    },
  ],
  skills: [
    {
      category: "Professional Skills",
      items: [
        "Project Management",
        "Innovative Thinking",
        "Leadership Quality",
        "Effective Communication",
        "Creative Problem Solving",
        "Multitasking",
      ],
    },
    {
      category: "Technical Skills",
      items: [
        "Arduino IDE",
        "MATLAB",
        "LabVIEW",
        "Wokwi",
        "Blynk",
        "MS Office",
        "Proteus",
        "ThingsBoard",
        "VS Code",
        "GitHub",
        "Netlify",
        "FreeCAD",
        "KiCad",
      ],
    },
    {
      category: "Programming Languages",
      items: [
        "Basics of C",
        "Embedded C",
        "Java",
        "Python",
      ],
    },
    {
      category: "Core Concepts",
      items: [
        "Sensor Integration",
        "Signal Processing",
        "Data Visualization",
        "Cloud Communication Basics",
      ],
    },
  ],
  certifications: [
    {
      name: "Biophotonics (ELITE+SILVER)",
      issuer: "NPTEL",
    },
    {
      name: "C Programming",
      issuer: "NPTEL",
    },
    {
      name: "Transducers for Instrumentation",
      issuer: "NPTEL",
    },
    {
      name: "Voice Communication Training Program",
      issuer: "NPTEL",
    },
    {
      name: "IoT for Healthcare & Embedded Systems",
      issuer: "Dr. N.G.P Institute of Technology",
    },
  ],
  languages: ["English", "Hindi", "Tamil"],
  leadership: [
    {
      role: "Chairperson",
      organization: "Yi Innovation Club",
      year: "2024-2025",
    },
    {
      role: "Team Leader",
      organization: "Toastmasters Club (Team Sapphire)",
      year: "2024-2025",
    },
    {
      role: "Winner, Internal Hackathon",
      organization: "Dr. N.G.P Itech - Project: AI Leg (Team Pogues)",
      year: "2023",
    },
    {
      role: "Leadership Role",
      organization: "Business Leadership Program by Udhayam Foundation",
      year: "2024",
    },
  ],
  interests: [
    "Biomedical Devices",
    "IoT in Healthcare",
    "3D Designing",
    "Embedded Systems",
    "Cloud-Based Monitoring and Processing",
  ],
};
