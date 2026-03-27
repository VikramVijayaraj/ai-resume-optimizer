"use client";

import { createContext, useState } from "react";

type JobContextType = {
  jobDescription: string;
  setJobDescription: (description: string) => void;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobDescription, setJobDescription] = useState("");

  return (
    <JobContext.Provider value={{ jobDescription, setJobDescription }}>
      {children}
    </JobContext.Provider>
  );
}

export default JobContext;
