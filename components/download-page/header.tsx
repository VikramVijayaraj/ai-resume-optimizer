"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { CircleCheck, Download, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import ResumeLayout from "../generate-pdf/resume-layout";

export default function Header({ data }: { data: any }) {
  return (
    <div className="text-center flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
      <div className="flex items-center justify-center gap-2">
        <CircleCheck stroke="#008080" size="30" />
        <h1>Your Resume is Ready!</h1>
      </div>

      <PDFDownloadLink
        document={<ResumeLayout data={data} />}
        fileName="resume.pdf"
      >
        {({ blob, url, loading, error }) => (
          <Button
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className="py-6 text-lg flex items-center justify-center gap-2 hover:cursor-pointer"
          >
            <Download />
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <LoaderCircle className="animate-spin" />
                <span>generating...</span>
              </div>
            ) : (
              "Download Resume"
            )}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
