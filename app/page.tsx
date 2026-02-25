import JobForm from "@/components/job-form";

export default function Home() {
  return (
    <div className="max-w-10/12 lg:max-w-6/12 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl">
          Tailor your resume <span className="text-primary">instantly</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Stop guessing keywords. Paste the job description and upload your
          resume to get an instantly optimized version that beats the ATS.
        </p>
      </div>
      <JobForm />
    </div>
  );
}
