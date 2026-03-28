"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getMissingKeywordsAction(
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
            You are an AI assistant that analyzes resumes for missing keywords.
            Your task is to identify keywords present in the job description that are missing from the resume.
            Always format your response as valid JSON.
          `,
        },
        {
          role: "user",
          content: `
            Using the resume content and job description below, identify all keywords that are present in the job description but missing from the resume.

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
              "missing_keywords": ["keyword1", "keyword2", "..."]
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

export async function optimizeDataAction(
  jobDescription: string,
  resumeText: string,
  keywords: string[] = [],
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
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
            You are an expert resume optimization assistant specializing in ATS-friendly resumes.

            Your task is to rewrite and optimize ONLY the Summary, Experience, and Skills sections of the resume using:
            1. The original resume content (source of truth)
            2. The job description
            3. The user-selected keywords (HIGH PRIORITY)

            ====================
            CORE OBJECTIVE
            ====================
            Maximize ATS alignment by incorporating the provided keywords while maintaining factual accuracy.

            ====================
            STRICT RULES (NON-NEGOTIABLE)
            ====================
            - Use ONLY information present in the resume.
            - Do NOT fabricate new experience, projects, or achievements.
            - Do NOT change job titles, company names, or dates.
            - Preserve the original structure and formatting.
            - Keep bullet points concise and similar in length.
            - Do NOT significantly increase total word count.

            ====================
            KEYWORD INCLUSION RULE (HIGHEST PRIORITY)
            ====================
            - The provided keywords are explicitly selected by the user and MUST be included.
            - Include as many keywords as possible WITHOUT increasing overall length.
            - Prioritize the most relevant and impactful keywords.

            - You are allowed to:
              • Rephrase existing bullet points
              • Replace synonyms with the provided keywords
              • Generalize wording to align with industry terminology
              • Adjust phrasing in Summary, Experience, and Skills

            - You are NOT allowed to:
              • Add completely unrelated tools or technologies
              • Claim experience with tools that cannot be reasonably inferred

            - If a keyword is reasonably related to existing experience, you MUST include it.

            - Only skip a keyword if it is completely impossible to connect to the resume.
            - Any skipped keywords MUST be listed in "missing_keywords".

            ====================
            LENGTH CONTROL (STRICT):
            ====================

            - The final resume MUST remain the same length or shorter than the original.
            - You are NOT allowed to add new bullet points.
            - You are NOT allowed to expand sentences.

            - For every keyword added, you MUST:
              • Replace an existing word or phrase
              • OR compress other parts of the sentence

            - Prefer shorter, more impactful phrasing.
            - Remove filler words (e.g., "worked on", "responsible for", "helped with").
            - Use concise, action-oriented language.
            - Keyword optimization must be achieved through substitution, not expansion.

            ====================
            SKILLS SECTION OPTIMIZATION
            ====================
            - Include as many provided keywords as possible in the Skills section by replacing or consolidating existing skills.
            - You MAY reorder, or replace skills to better match the keywords.
            - Remove less relevant skills if necessary to make room for important keywords.

            ====================
            EXPERIENCE OPTIMIZATION
            ====================
            - Improve bullet points using strong action verbs.
            - Naturally embed keywords into bullet points.
            - Maintain realism and avoid exaggerated claims.

            ====================
            SUMMARY OPTIMIZATION
            ====================
            - Make the summary concise and keyword-rich.
            - Align it with the job description.
            - Include 2–4 relevant keywords naturally.

            ====================
            VALIDATION STEP (MANDATORY)
            ====================
            Before finalizing:
            - Ensure at least 80% of keywords are included.
            - Ensure no rule violations.
            - Ensure output remains realistic and believable.

            ====================
            INPUT DATA
            ====================

            RESUME CONTENT:
            ${resumeText}

            JOB DESCRIPTION:
            ${jobDescription}

            KEYWORDS:
            ${JSON.stringify(keywords)}

            ====================
            OUTPUT FORMAT (STRICT JSON ONLY)
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
                "final_ats_score": "An estimate of the final ATS score after optimization, on a scale of 0-100. Give a just a single score without the % sign.",
                "before_and_after_examples": "Provide 1-2 specific examples of how the resume content was optimized. For each example, show the original bullet or skill, and the optimized version after incorporating keywords. Format this as an array of objects with 'original' and 'optimized' fields.",
                "missing_keywords": "A list of all the missing keywords in the resume that were present in the job description. This list should be array of strings. If there are no missing keywords, return an empty array."
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
