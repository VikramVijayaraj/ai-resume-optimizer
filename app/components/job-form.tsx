"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { extractData } from "../actions/extract-data-actions";
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
import { Input } from "@/components/ui/input";
import { parsePdf } from "../actions/parse-pdf-actions";
import FileUpload from "./file-upload";

export default function JobForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const jobDescription = `We are looking for a skilled software engineer with experience in React, Node.js, and cloud technologies. The ideal candidate should have a strong understanding of web development and be able to work in a fast-paced environment. Experience with AWS or Azure is a plus.`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Extract text from uploaded resume and include in the prompt
    const resumeText = await parsePdf(file!);

    if (resumeText.error) {
      alert(resumeText.error);
      setLoading(false);
      return;
    }

    console.log("Extracted Resume Text:", resumeText.text);
    console.log("Job Description:", jobDescription);

    const result = await extractData(jobDescription, resumeText.text!);

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
          <FieldLegend>AI Resume Optimizer</FieldLegend>
          <FieldDescription>Update your resume with AI</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="jobDescription">
                Enter Job Description
              </FieldLabel>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                rows={10}
                cols={50}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              {/* <FieldError>Choose another username.</FieldError> */}
            </Field>
          </FieldGroup>

          {/* User Resume */}
          <FieldGroup>
            <Input
              type="file"
              name="file"
              accept=".pdf"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {/* <FileUpload /> */}
          </FieldGroup>

          <Button disabled={loading} type="submit">
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
