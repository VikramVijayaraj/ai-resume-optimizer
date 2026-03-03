"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function optimizeDataAction(
  jobDescription: string,
  resumeText: string,
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are an AI assistant that rewrites and optimizes resume content.
            Your task is to improve the user's Experience and Skills sections so they align with the provided job description.
            You must preserve factual accuracy and not invent information.
            Always format your response as valid JSON.
          `,
        },
        {
          role: "user",
          content: `
            Using the resume content and job description below, rewrite and optimize ONLY the Summary, Experience and Skills sections.

            STRICT RULES:
            - Use ONLY information present in the resume.
            - Do NOT add new experience, tools, or skills.
            - Do NOT rename job titles, companies, or dates.
            - Do NOT significantly increase word count.
            - Keep bullets similar in length.
            - Optimize for ATS keywords where relevant.
            - Preserve one-page resume formatting.
            - Return ONLY valid JSON.

            ====================
            RESUME CONTENT (SOURCE OF TRUTH)
            ====================
            ${resumeText}

            ====================
            JOB DESCRIPTION
            ====================
            ${jobDescription}

            ====================
            REQUIRED OUTPUT FORMAT
            ====================
            {
              "name": "",
              "email": "",
              "phone": "",
              "website": "",
              "summary": "",
              "experience": [
                {
                  "role": "",
                  "company": "",
                  "dates": "",
                  "bullets": ["...", "..."]
                }
              ],
              "skills": ["...", "..."],
              "education": [
                {
                  "degree": "",
                  "school": "",
                  "location": "",
                  "date": ""
                }
              ],
              "remarks": {
                "optimization_summary": "A brief summary of the optimizations made, such as which keywords were added or which sections were enhanced.",
                "ats_score_improvement": "An estimate of how much the ATS score may have improved based on keyword optimization, on a scale of 0-100.",
                "final_ats_score": "An estimate of the final ATS score after optimization, on a scale of 0-100. Give a just a single score without the % sign."
              }
            }
          `,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    return {
      ...result,
      error: null,
    };
  } catch (error) {
    console.error("Error extracting data:", error);

    return {
      error: "Failed to extract resume data",
    };
  }
}
