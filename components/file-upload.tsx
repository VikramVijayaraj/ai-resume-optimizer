"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FileUpload({
  file,
  setFile,
}: {
  file: File | null;
  setFile: (file: File | null) => void;
}) {
  // const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      // setFileName(file.name);
      setFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className={cn(
          "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload
            className={cn(
              "w-6 h-6 mb-3",
              isDragging ? "text-blue-500" : "text-gray-400",
            )}
          />

          <p className="mb-2 text-sm text-gray-500">
            Drop your resume here or{" "}
            <span className="text-blue-500 hover:text-blue-600 font-medium">
              browse
            </span>
          </p>

          {/* <p className="text-xs text-gray-400">PDF, DOC, or DOCX</p> */}

          {file && (
            <p className="mt-2 text-sm text-gray-700 font-medium">
              Selected: {file.name}
            </p>
          )}
        </div>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
