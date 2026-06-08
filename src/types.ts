export interface Project {
  title: string;
  description: string;
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface Certificate {
  name: string;
  link: string;
  bullets?: string[];
  issuer?: string;
}

export interface Language {
  name: string;
  level: number; // 1 to 5
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    leetcode: string;
    geeksforgeeks?: string;
    portfolio: string;
  };
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
  interests: string[];
  hobbies: string[];
  languages: Language[];
}
