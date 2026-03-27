"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ResumeLayout from "../generate-pdf/resume-layout";

export default function ResumePreview({ data }: { data: any }) {
  return (
    <div className="h-full flex gap-4 items-start justify-between">
      <div className="w-1/4 space-y-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg p-6 flex flex-col gap-8">
          <p className="text-lg font-semibold uppercase">ATS Analysis</p>

          <CircularProgressbar
            value={data?.remarks?.final_ats_score || "NA"}
            text={`${data?.remarks?.final_ats_score || "NA"}%`}
            styles={{
              path: { stroke: "#008080" },
              text: { fill: "#008080" },
            }}
            className="w-44 h-44"
          />

          <p className="">
            An estimate of the final ATS score after optimization, on a scale of
            0-100.
            {data?.remarks?.ats_score_improvement && (
              <span className="block mt-2 text-sm text-gray-500">
                (Estimated improvement: {data?.remarks?.ats_score_improvement}%)
              </span>
            )}
          </p>

          <div>
            {data?.remarks?.before_and_after_examples?.map(
              (example: any, index: number) => (
                <div key={index} className="mt-2">
                  <p className="font-semibold">Original:</p>
                  <p>{example.original}</p>
                  <p className="font-semibold">Optimized:</p>
                  <p>{example.optimized}</p>
                </div>
              ),
            )}
          </div>

          <p>
            {data?.remarks?.missing_keywords?.join(", ") ||
              "No missing keywords found."}
          </p>
        </div>

        {/* Card 2 */}
        {data?.remarks?.optimization_summary && (
          <div className="bg-white rounded-lg p-6 flex flex-col gap-8">
            <p className="text-lg font-semibold uppercase">Summary</p>
            <p className="">{data?.remarks?.optimization_summary}</p>
          </div>
        )}
      </div>

      <div className="w-3/4">
        <PDFViewer
          // width="100%"
          // height="100%"
          // showToolbar={false}
          className="w-full h-[700px] rounded-lg"
        >
          <ResumeLayout data={data} />
        </PDFViewer>
      </div>
    </div>
  );
}
