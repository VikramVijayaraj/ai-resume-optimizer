// "use client";

// import { useState } from "react";
// import { parsePdf } from "../actions/parse-pdf-actions";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function ParsePdf({ action }: { action: (data: any) => void }) {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   async function handleUpload() {
//     const result = await parsePdf(file!);

//     if (result.text) {
//       setText(result.text);
//       // action({ uploadedResumeText: result.text });
//     } else if (result.error) {
//       alert(result.error);
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>PDF to Text</h1>

//       <form action={handleUpload}>
//         <Input
//           type="file"
//           name="file"
//           accept=".pdf"
//           required
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//         />
//         <Button type="submit" style={{ marginLeft: 10 }}>
//           Extract
//         </Button>
//       </form>

//       {text && (
//         <pre style={{ marginTop: 20, background: "#f4f4f4", padding: 10 }}>
//           {text}
//         </pre>
//       )}
//     </div>
//   );
// }
