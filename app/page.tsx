"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import KeywordsList from "@/components/keywords-list";
import JobForm from "@/components/job-form";
import {
  getMissingKeywordsAction,
  optimizeDataAction,
} from "./actions/ai-api-actions";
import ResumeContext from "@/context/resume-context";
import JobContext from "@/context/job-context";

// const keywords = [
//   "HTML5",
//   "CSS3",
//   "JavaScript",
//   "TypeScript",
//   "React",
//   "Responsive Design",
//   "Git",
//   "REST APIs",
//   "Webpack",
//   "Redux",
// ];

export default function Home() {
  const { jobDescription } = useContext(JobContext)!;
  const { resumeText } = useContext(ResumeContext)!;
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);

  async function optimizeResume() {
    const result = await optimizeDataAction(
      jobDescription,
      resumeText,
      selectedKeywords,
    );

    if (result.error) {
      console.error(result.error);
      alert(
        "An error occurred while processing your request. Please try again.",
      );
    }

    // Save result to localStorage for retrieval on download page
    localStorage.setItem("optimizedResumeData", JSON.stringify(result));
    router.push("/download");
  }

  useEffect(() => {
    if (selectedKeywords.length > 0) {
      optimizeResume();
    }
  }, [selectedKeywords]);

  async function handleSubmit() {
    setIsSubmitted(true);

    // Fetch missing keywords
    const keywords = await getMissingKeywordsAction(jobDescription, resumeText);

    if (keywords.error) {
      console.error(keywords.error);
      alert("Error fetching missing keywords. Please try again.");
      return;
    }
    setMissingKeywords(keywords.missing_keywords);
  }

  return (
    <div className="max-w-10/12 lg:max-w-6/12 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl">
          Tailor your resume <span className="text-primary">instantly</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Stop guessing keywords. Paste the job description and upload your
          resume to get an instantly optimized version that beats the ATS.
        </p>
      </div>

      {!isSubmitted ? (
        <JobForm onSubmit={handleSubmit} />
      ) : (
        <KeywordsList
          keywords={missingKeywords}
          onSubmit={(items: string[]) => setSelectedKeywords(items)}
        />
      )}
    </div>
  );
}
