export interface Profile {
  name: string;
  displayName: string;
  role: string;
  shortBio: string;
  aboutBody: string;
  portraitSrc: string | null; // TODO: Path to actual image
  cutoutSrc: string | null; // TODO: Path to cutout image
  resumeUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  email: string | null;
  selectedSkills: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  role: string;
  technologies: string[];
  coverImage: string | null; // TODO: Path to cover image
  gallery: string[]; // TODO: Paths to gallery images
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  order: number;
}

export interface SkillGroup {
  id: string;
  sanskritLabel: string;
  englishLabel: string;
  skills: string[];
  order: number;
}

export interface JourneyItem {
  id: string;
  period: string;
  title: string;
  description: string;
  category: string;
  optionalMedia: string | null;
  order: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}
