import "../app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Track and manage key business events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
