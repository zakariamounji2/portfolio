import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zakaria Mounji | Software Engineer & DevOps",
    template: "%s | Zakaria Mounji"
  },
  description: "Portfolio of Zakaria Mounji: Backend, DevOps, and Cloud Infrastructure."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

