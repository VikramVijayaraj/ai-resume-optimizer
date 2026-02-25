interface Experience {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

interface Education {
  degree: string;
  school: string;
  location: string;
  date: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  error: null | string;
}

export type { ResumeData };
