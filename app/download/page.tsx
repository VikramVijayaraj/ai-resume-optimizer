"use client";

import dynamic from "next/dynamic";

const DownloadPdf = dynamic(() => import("../components/download-pdf"), {
  ssr: false,
});

const resumeData = {
  name: "M Vikram Vijayaraj",
  email: "vikramvijayaraj31@gmail.com",
  phone: "+91 9626119020",
  website: "https://vikramvijayaraj.com/",
  summary:
    "Front-End Developer with 2+ years building production web applications. Created a marketplace platform serving 100+ users and delivered corporate sites achieving measurable improvements for engineering clients.",
  skills:
    "React.js, NextJS, JavaScript, Tailwind CSS, HTML/CSS, Node.js, Express, Python, PostgreSQL, MongoDB, Git/GitHub, Supabase, WordPress, Responsive Design, SEO Optimization",
  experience: [
    {
      role: "Freelance Web Developer",
      company: "Independent Clients",
      date: "01/2025 – Present",
      points: [
        "Delivered high-performance corporate websites for engineering firms using Next.js and Tailwind.",
        "Partnered with a UK-based AI startup to author technical Python tutorials.",
        "Engineered a custom event management platform featuring real-time RSVP tracking. Engineered a custom event management platform featuring real-time RSVP tracking.",
        "Engineered a custom event management platform featuring real-time RSVP tracking.",
      ],
    },
    {
      role: "Founder & Full Stack Developer",
      company: "Crelands",
      date: "10/2024 – Present",
      points: [
        "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
        "Achieved 100+ registered users with 100+ listed products.",
        "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
        "Achieved 100+ registered users with 100+ listed products.",
        "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase. Achieved 100+ registered users with 100+ listed products.",
      ],
    },
    {
      role: "Data Engineer",
      company: "LTIMindtree",
      date: "10/2024 – Present",
      points: [
        "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
        "Achieved 100+ registered users with 100+ listed products.",
        "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelors Degree in Information Technology",
      school: "Panimalar Engineering College",
      location: "Chennai, Tamil Nadu",
      date: "06/2022",
    },
  ],
};

export default function DownloadPage() {
  return (
    <div>
      <DownloadPdf />
    </div>
  );
}
