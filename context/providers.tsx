"use client";

import { JobProvider } from "./job-context";
import { ResumeProvider } from "./resume-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JobProvider>
      <ResumeProvider>{children}</ResumeProvider>
    </JobProvider>
  );
}
