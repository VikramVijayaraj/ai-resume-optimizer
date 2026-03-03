import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Resume Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased py-10 bg-gray-100`}>{children}</body>
    </html>
  );
}
