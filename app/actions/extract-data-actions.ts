"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractData(jobDescription: string, resumeText: string) {
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
            Using the resume content and job description below, rewrite and optimize ONLY the Experience and Skills sections.

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
              "experience": [
                {
                  "role": "",
                  "company": "",
                  "dates": "",
                  "bullets": ["...", "..."]
                }
              ],
              "skills": ["...", "..."]
            }
          `,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(
      completion.choices[0].message.content || '{"experience":[],"skills":[]}',
    );

    return {
      experience: Array.isArray(result.experience) ? result.experience : [],
      skills: Array.isArray(result.skills) ? result.skills : [],
      error: null,
    };
  } catch (error) {
    console.error("Error extracting data:", error);

    return {
      experience: [],
      skills: [],
      error: "Failed to extract resume data",
    };
  }
}
