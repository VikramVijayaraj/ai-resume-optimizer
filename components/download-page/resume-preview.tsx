"use client";

import { PDFViewer } from "@react-pdf/renderer";

import ResumeLayout from "../generate-pdf/resume-layout";

export default function ResumePreview({ data }: { data: any }) {
  return (
    <div className="h-fit flex gap-4 items-start justify-between">
      <div className="w-1/4">ATS Score</div>

      <PDFViewer
        width="100%"
        height="100%"
        showToolbar={false}
        className="w-[60%] h-full"
      >
        <ResumeLayout data={data} />
      </PDFViewer>
    </div>
  );
}
