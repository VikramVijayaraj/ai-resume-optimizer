"use client";

import { createContext, useState } from "react";

type ResumeContextType = {
  resumeText: string;
  setResumeText: (text: string) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeText, setResumeText] = useState("");

  return (
    <ResumeContext.Provider value={{ resumeText, setResumeText }}>
      {children}
    </ResumeContext.Provider>
  );
}

export default ResumeContext;
