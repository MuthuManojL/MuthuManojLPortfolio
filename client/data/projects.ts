export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "iot" | "research" | "concepts" | "healthcare";
  date: string;
  image?: string;
  link?: string;
  status: "completed" | "ongoing" | "research";
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Smart Glasses with Real-Time Speech-to-Text Conversion",
    description:
      "Wearable glasses that display real-time transcriptions of speech, enhancing communication for hearing-impaired individuals.",
    longDescription:
      "Created wearable glasses equipped with real-time speech-to-text conversion technology. This innovative project aims to break down communication barriers for hearing-impaired individuals by providing instant visual feedback of spoken words. The system integrates embedded processors, microphones, and display technology to create a seamless user experience.",
    technologies: [
      "Embedded Systems",
      "Speech Processing",
      "Accessibility Tech",
      "Real-time Processing",
      "IoT",
    ],
    category: "healthcare",
    date: "2024-2025",
    status: "ongoing",
  },
  {
    id: 2,
    title: "Non-Invasive Heart Rate Monitoring System",
    description:
      "Real-time heart rate monitor with cloud visualization using ThingsBoard and MQTT protocols.",
    longDescription:
      "Developed a non-invasive heart rate monitoring system with real-time cloud visualization. The system utilizes sensor integration, data processing, and cloud communication via MQTT protocol with ThingsBoard platform. This enables healthcare providers to monitor patients remotely with instant updates and historical data tracking.",
    technologies: ["IoT", "ThingsBoard", "MQTT", "Sensor Integration", "Cloud Communication", "Data Visualization"],
    category: "healthcare",
    date: "2025",
    status: "completed",
  },
  {
    id: 3,
    title: "Pill Reminder IoT System",
    description:
      "Smart medication reminder system that improves adherence and reduces missed doses through IoT automation.",
    longDescription:
      "Simulated a smart system to remind patients of medication timings, aiming to improve adherence and reduce missed doses. The system uses IoT principles to send timely notifications and track medication history, helping healthcare professionals monitor patient compliance.",
    technologies: ["Proteus Simulation", "IoT", "Blynk", "Smart Devices", "Healthcare IT"],
    category: "iot",
    date: "2023",
    status: "completed",
  },
  {
    id: 4,
    title: "Speech Transcription in Smart Glasses for Hearing Impaired People",
    description:
      "Award-winning project on speech transcription technology for accessibility.",
    longDescription:
      "This groundbreaking research project won the Best Paper Award at NCETBT-25 conference at Hindustan College of Engineering and Technology. It focuses on developing smart glasses capable of real-time speech transcription to assist hearing-impaired individuals in communication.",
    technologies: [
      "ML/AI",
      "Speech Recognition",
      "Wearables",
      "Accessibility",
      "Embedded Systems",
    ],
    category: "research",
    date: "10/2023",
    status: "completed",
  },
  {
    id: 5,
    title: "Graphene-Infused Polyurethane Composites",
    description:
      "Research on advanced materials for biomedical applications.",
    longDescription:
      "Paper presented at ISCIEM 2024 at Sri Krishna College of Technology. This research explores the use of graphene-infused polyurethane composites for enhanced biomedical device performance, focusing on material science innovations in healthcare technology.",
    technologies: ["Materials Science", "Biomedical Engineering", "Composites", "Research"],
    category: "research",
    date: "2024",
    status: "completed",
  },
  {
    id: 6,
    title: "Mg²⁺ Decorated Titania over Ti Alloy for Biomedical Use",
    description:
      "Advanced surface treatment for biomedical implants and devices.",
    longDescription:
      "Paper presented at ICOST'25 conference at Annapoorna Engineering College, Salem. This research focuses on developing advanced biomedical surfaces using magnesium-decorated titanium oxide coatings on titanium alloys for improved biocompatibility and performance.",
    technologies: ["Materials Engineering", "Biomedical Devices", "Surface Treatment", "Alloys"],
    category: "research",
    date: "2025",
    status: "completed",
  },
  {
    id: 7,
    title: "AI Leg Concept for Amputees",
    description:
      "Innovative AI-powered prosthetic leg concept that adapts to normal movement patterns for enhanced mobility.",
    longDescription:
      "Conceptual design of an intelligent prosthetic leg system powered by AI that learns and adapts to the user's natural movement patterns. The system aims to provide amputees with enhanced mobility, comfort, and natural gait by analyzing movement data and automatically adjusting joint angles and resistance in real-time.",
    technologies: ["AI/ML", "Prosthetics", "Motion Analysis", "IoT", "Wearables", "Biomechanics"],
    category: "concepts",
    date: "2023",
    status: "research",
  },
];

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return PROJECTS.filter((project) => project.category === category);
}

export function getProjectById(id: number): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}
