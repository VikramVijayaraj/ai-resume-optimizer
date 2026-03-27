"use server";

import pdf from "pdf-parse";


export async function parsePdfAction(file: File) {
  try {
    if (!file) {
      return { error: "No file uploaded", text: null };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = await pdf(buffer);

    return {
      text: data.text,
      numPages: data.numpages,
      error: null,
    };
  } catch (error) {
    console.error("PDF Parse Error:", error);
    return { error: "Failed to parse PDF", text: null };
  }
}
