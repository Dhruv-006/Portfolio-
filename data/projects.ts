import { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "dukanwala",
    title: "DukanWala",
    slug: "dukanwala",
    shortDescription: "A hyperlocal shopping and delivery application connecting users with nearby shops through a modern mobile experience.",
    description: "Built a hyperlocal shopping and delivery application using Flutter and Firebase, featuring Firebase authentication, AI-assisted product search, modern UI, and shop discovery.",
    role: "Developer",
    technologies: ["Flutter", "Firebase", "Dart", "AI-assisted Search"],
    coverImage: "/images/projects/DukanWala.png",
    gallery: ["/images/projects/DukanWala.png"],
    liveUrl: null, // TODO: Add live URL
    githubUrl: null, // TODO: Add GitHub URL
    featured: true,
    order: 1,
  },
  {
    id: "ai-finance-coach",
    title: "AI Finance Coach",
    slug: "ai-finance-coach",
    shortDescription: "An AI-powered personal finance coach designed to help users understand their finances, track spending, and make smarter financial decisions through conversational guidance.",
    description: "Built an AI-powered finance coaching application that combines personal finance management with an intelligent conversational assistant. The application focuses on helping users track and understand their financial activity, analyze spending patterns, and receive personalized guidance through an AI-driven experience. The project combines financial data management, analytics, and AI assistance into a single user-focused platform.",
    role: "Developer",
    technologies: ["Python", "AI / LLM", "Financial Data Analysis", "Streamlit", "Firebase"],
    coverImage: "/images/projects/AI Finance Coach.png",
    gallery: ["/images/projects/AI Finance Coach.png"],
    liveUrl: null, // TODO: Add live URL
    githubUrl: null, // TODO: Add GitHub URL
    featured: true,
    order: 2,
  },
  {
    id: "moodify",
    title: "Moodify",
    slug: "moodify",
    shortDescription: "A mood tracking and self-reflection application designed to help users understand their emotional patterns through daily mood entries, journaling, and visual insights.",
    description: "Built a Flutter-based mood tracking application with automatic mood logging, personal journaling, mood history, monthly analytics, mood streaks, and interactive insights. The app also includes Firebase authentication and Firestore integration, local data handling with Hive, responsive UI, and a structured mood system with centralized mood icons, colors, and states.",
    role: "Developer",
    technologies: ["Flutter", "Dart", "Material Design 3", "Firebase Authentication", "Cloud Firestore", "Hive", "Provider", "fl_chart"],
    coverImage: "/images/projects/Moodify.png",
    gallery: ["/images/projects/Moodify.png"],
    liveUrl: null, // TODO: Add live URL
    githubUrl: null, // TODO: Add GitHub URL
    featured: true,
    order: 3,
  },
  {
    id: "dhanrakshak",
    title: "DhanRakshak",
    slug: "dhanrakshak",
    shortDescription: "A personal finance management application designed to help users track expenses, manage transactions, and understand their spending through financial statistics.",
    description: "Developed an Android finance management application focused on expense tracking and financial statistics. Implemented categorized transaction management with Daily, Weekly, and Monthly filters, along with transaction history, summary cards, analytics dashboards, and a clean Material Design 3 interface.",
    role: "Developer",
    technologies: ["Java", "Firebase", "Android Studio", "Material Design 3"],
    coverImage: "/images/projects/DhanRakshak.png",
    gallery: ["/images/projects/DhanRakshak.png"],
    liveUrl: null, // TODO: Add live URL
    githubUrl: null, // TODO: Add GitHub URL
    featured: true,
    order: 4,
  },
  {
    id: "signspeak",
    title: "SignSpeak",
    slug: "signspeak",
    shortDescription: "A machine learning-based sign language recognition system designed to detect and interpret hand gestures using computer vision.",
    description: "Built a sign language recognition system using MediaPipe for hand landmark detection and a machine learning model for gesture classification. The system uses a Flask backend to process and serve the recognition functionality, combining computer vision and machine learning into an interactive application.",
    role: "Developer",
    technologies: ["Python", "MediaPipe", "Flask", "Machine Learning", "RandomForestClassifier", "Computer Vision"],
    coverImage: "/images/projects/SignSpeak.png",
    gallery: ["/images/projects/SignSpeak.png"],
    liveUrl: null, // TODO: Add live URL
    githubUrl: null, // TODO: Add GitHub URL
    featured: true,
    order: 5,
  },
];
