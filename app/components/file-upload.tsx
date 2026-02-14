"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FileUpload() {
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) { 
      setFileName(file.name);
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
      setFileName(file.name);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
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
              "w-10 h-10 mb-3",
              isDragging ? "text-blue-500" : "text-gray-400",
            )}
          />

          <p className="mb-2 text-sm text-gray-500">
            Drop your resume here or{" "}
            <span className="text-blue-500 hover:text-blue-600 font-medium">
              browse
            </span>
          </p>

          <p className="text-xs text-gray-400">PDF, DOC, or DOCX</p>

          {fileName && (
            <p className="mt-2 text-sm text-gray-700 font-medium">
              Selected: {fileName}
            </p>
          )}
        </div>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
