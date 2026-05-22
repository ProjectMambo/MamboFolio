import { ReactNode } from "react";

interface HeadingProps {
    title: string;
    subtitle?: string; // Optional subtitle tracker
    level?: "h1" | "h2" | "h3"; // Allows you to choose the HTML tag size
}

/**
 * Reusable layout heading block following a unified modular typography system.
 */
export default function Heading({ title, subtitle, level = "h2" }: HeadingProps) {
    // Determine responsive sizing tokens based on heading level choice
    const sizeClasses = {
        h1: "text-2xl md:text-3xl font-black tracking-wider uppercase",
        h2: "text-xl md:text-2xl font-bold tracking-wide",
        h3: "text-base md:text-lg font-bold tracking-normal text-fg-muted",
    }[level];

    // Dynamically assign the semantic HTML element type at runtime
    const Tag = level;

    return (
        <div className="w-full flex flex-col gap-1 select-none">
            {subtitle && (
                <span className="text-[11px] font-mono tracking-widest text-fg-muted uppercase opacity-80 selection:bg-transparent">
                    {subtitle}
                </span>
            )}
            <Tag className={`${sizeClasses} text-fg`}>
                {title}
            </Tag>
        </div>
    );
}