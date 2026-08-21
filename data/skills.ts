import { SkillGroup } from "@/types/content";

export const skills: SkillGroup[] = [
  {
    id: "development",
    sanskritLabel: "शिल्प",
    englishLabel: "Development",
    skills: ["Flutter", "Dart", "Java", "Kotlin", "Android Development", "Python", "HTML", "CSS"],
    order: 1,
  },
  {
    id: "ai",
    sanskritLabel: "बुद्धि",
    englishLabel: "Backend & Intelligence",
    skills: ["Firebase", "SQL", "Flask", "Artificial Intelligence", "Machine Learning"],
    order: 2,
  },
  {
    id: "design",
    sanskritLabel: "रचना",
    englishLabel: "Design & Tools",
    skills: ["Figma", "Material Design 3", "Android Studio", "Git", "GitHub", "UI/UX Design"],
    order: 3,
  },
];
