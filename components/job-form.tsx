"use client";

import { useState, useEffect, useContext } from "react";
import { FileText, LoaderCircle } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "./file-upload";
import { parsePdfAction } from "@/app/actions/parse-pdf-actions";
import { optimizeDataAction } from "@/app/actions/ai-api-actions";
import JobContext from "@/context/job-context";
import { Label } from "./ui/label";
import ResumeContext from "@/context/resume-context";

interface JobFormProps {
  onSubmit: () => void;
}

export default function JobForm({ onSubmit }: JobFormProps) {
  const { jobDescription, setJobDescription } = useContext(JobContext)!;
  const { setResumeText } = useContext(ResumeContext)!;

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  // const jobDescription = `We are looking for a skilled software engineer with experience in React, Node.js, and cloud technologies. The ideal candidate should have a strong understanding of web development and be able to work in a fast-paced environment. Experience with AWS or Azure is a plus.`;

  // Clear any previously stored data on component mount
  useEffect(() => {
    if (localStorage.getItem("optimizedResumeData")) {
      localStorage.removeItem("optimizedResumeData");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Extract text from uploaded resume and include in the prompt
    const resumeContent = await parsePdfAction(file!);

    if (resumeContent.error) {
      alert(resumeContent.error);
      setLoading(false);
      return;
    }

    console.log("Extracted Resume Text:", resumeContent.text);
    setResumeText(resumeContent.text!);

    // Call the parent function
    await onSubmit();

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Label
          htmlFor="jobDescription"
          className="flex items-center justify-start gap-2"
        >
          <FileText size={16} className="opacity-70" />
          Enter Job Description
        </Label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Paste the job description here..."
          required
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full h-48 bg-gray-50"
        />
      </div>

      {/* User Resume */}
      <div className="space-y-4">
        <Label htmlFor="file" className="flex items-center justify-start gap-2">
          <FileText size={16} className="opacity-70" />
          Your Resume (PDF only)
        </Label>
        {/* <Input
              type="file"
              name="file"
              accept=".pdf"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            /> */}
        <FileUpload file={file} setFile={(f) => setFile(f || null)} />
      </div>

      <Button
        disabled={loading}
        type="submit"
        className="w-full py-6 text-lg hover:cursor-pointer"
      >
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LoaderCircle className="animate-spin" />
            <span>processing...</span>
          </div>
        ) : (
          "Optimize Resume"
        )}
      </Button>
    </form>
  );
}
