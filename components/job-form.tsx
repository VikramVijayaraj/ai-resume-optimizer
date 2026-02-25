"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, LoaderCircle } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import FileUpload from "./file-upload";
import { parsePdfAction } from "@/app/actions/parse-pdf-actions";
import { optimizeDataAction } from "@/app/actions/optimize-data-actions";

export default function JobForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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
    const resumeText = await parsePdfAction(file!);

    if (resumeText.error) {
      alert(resumeText.error);
      setLoading(false);
      return;
    }

    console.log("Extracted Resume Text:", resumeText.text);

    const result = await optimizeDataAction(jobDescription, resumeText.text!);

    if (result.error) {
      console.error(result.error);
      alert(
        "An error occurred while processing your request. Please try again.",
      );
    }

    // Save result to localStorage for retrieval on download page
    localStorage.setItem("optimizedResumeData", JSON.stringify(result));

    setLoading(false);
    router.push("/download");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="jobDescription"
                className="flex items-center justify-start gap-2"
              >
                <FileText size={16} className="opacity-70" />
                Enter Job Description
              </FieldLabel>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the job description here..."
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-48 bg-gray-50"
              />
              {/* <FieldError>Choose another username.</FieldError> */}
            </Field>
          </FieldGroup>

          {/* User Resume */}
          <FieldGroup>
            <FieldLabel
              htmlFor="file"
              className="flex items-center justify-start gap-2"
            >
              <FileText size={16} className="opacity-70" />
              Your Resume (PDF only)
            </FieldLabel>
            {/* <Input
              type="file"
              name="file"
              accept=".pdf"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            /> */}
            <FileUpload file={file} setFile={(f) => setFile(f || null)} />
          </FieldGroup>

          <Button
            disabled={loading}
            type="submit"
            className="py-6 text-lg hover:cursor-pointer"
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
        </FieldSet>
      </form>
    </div>
  );
}
