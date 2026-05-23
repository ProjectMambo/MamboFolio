"use client";

import { useRouter } from "next/navigation";
import Markdown from "@/modules/Markdown";

export default function Page() {
  const router = useRouter();

  const handleBack = () => {
    // If there is a browser history, step back natively. Fallback to default index route parameters if empty.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/project");
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col pt-6 pb-12">
      {/* Aligns back link container with the core content spine */}
      <div className="w-full mx-auto max-w-4xl px-4 mb-4">
        <button 
          onClick={handleBack}
          type="button"
          className="inline-flex items-center gap-x-2 text-xs font-mono text-fg-muted hover:text-fg transition-colors group cursor-pointer bg-transparent border-none p-0 outline-none"
        >
          <span className="transform group-hover:-translate-x-0.5 transition-transform">←</span> Back
        </button>
      </div>
      <Markdown path="project/MamboFont" />
    </div>
  );
}
