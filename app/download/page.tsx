"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { ResumeData } from "@/types/resume";

const Header = dynamic(() => import("@/components/download-page/header"), {
  ssr: false,
});
const ResumePreview = dynamic(
  () => import("@/components/download-page/resume-preview"),
  {
    ssr: false,
  },
);

// const dummyData = {
//   name: "M Vikram Vijayaraj",
//   email: "vikramvijayaraj31@gmail.com",
//   phone: "+91 9626119020",
//   website: "https://vikramvijayaraj.com/",
//   summary:
//     "Front-End Developer with 2+ years building production web applications. Created a marketplace platform serving 100+ users and delivered corporate sites achieving measurable improvements for engineering clients.",
//   skills:
//     "React.js, NextJS, JavaScript, Tailwind CSS, HTML/CSS, Node.js, Express, Python, PostgreSQL, MongoDB, Git/GitHub, Supabase, WordPress, Responsive Design, SEO Optimization",
//   experience: [
//     {
//       role: "Freelance Web Developer",
//       company: "Independent Clients",
//       date: "01/2025 – Present",
//       points: [
//         "Delivered high-performance corporate websites for engineering firms using Next.js and Tailwind.",
//         "Partnered with a UK-based AI startup to author technical Python tutorials.",
//         "Engineered a custom event management platform featuring real-time RSVP tracking. Engineered a custom event management platform featuring real-time RSVP tracking.",
//         "Engineered a custom event management platform featuring real-time RSVP tracking.",
//       ],
//     },
//     {
//       role: "Founder & Full Stack Developer",
//       company: "Crelands",
//       date: "10/2024 – Present",
//       points: [
//         "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
//         "Achieved 100+ registered users with 100+ listed products.",
//         "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
//         "Achieved 100+ registered users with 100+ listed products.",
//         "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase. Achieved 100+ registered users with 100+ listed products.",
//       ],
//     },
//     {
//       role: "Data Engineer",
//       company: "LTIMindtree",
//       date: "10/2024 – Present",
//       points: [
//         "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
//         "Achieved 100+ registered users with 100+ listed products.",
//         "Developed and deployed a scalable full-stack marketplace using Next.js and Supabase.",
//       ],
//     },
//   ],
//   education: [
//     {
//       degree: "Bachelors Degree in Information Technology",
//       school: "Panimalar Engineering College",
//       location: "Chennai, Tamil Nadu",
//       date: "06/2022",
//     },
//   ],
// };

export default function DownloadPage() {
  const [data, setData] = useState<ResumeData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve from localStorage
    const savedData = localStorage.getItem("optimizedResumeData");

    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      // Redirect back if no data found
      setData(null);
      router.push("/");
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-10/12 mx-auto space-y-16">
      <Header data={data} />
      <ResumePreview data={data} />
    </div>
  );
}
