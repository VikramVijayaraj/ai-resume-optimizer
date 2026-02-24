"use client";

import { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import Resume from "./generate-pdf/resume";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Experience {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

interface ResumeData {
  experience: Experience[];
  skills: string[];
  error: null | string;
}

export default function DownloadPdf() {
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
    <div>
      <div className="my-10 text-center">
        <PDFDownloadLink
          document={<Resume data={data} />}
          fileName="resume.pdf"
        >
          {({ blob, url, loading, error }) => (
            <Button
              disabled={loading}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Generating PDF..." : "Download Resume"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
      <PDFViewer width="100%" height="1000">
        <Resume data={data} />
      </PDFViewer>
    </div>
  );
}
