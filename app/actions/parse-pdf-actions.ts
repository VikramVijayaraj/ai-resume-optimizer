"use server";

import { PDFParse } from "pdf-parse";

export async function parsePdf(file: File) {
  if (!file) {
    return { error: "No file uploaded" };
  }

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Parse PDF
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();

  return { text: result.text };
}
