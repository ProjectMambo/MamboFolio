interface HeadingProps {
    title: string;
    subtitle?: string;
    level?: "h1" | "h2" | "h3";
}

/**
 * Reusable layout heading block following a unified modular typography system.
 */
export default function Heading({
    title,
    subtitle,
    level = "h2",
}: HeadingProps) {
    const sizeClasses = {
        h1: "text-2xl md:text-3xl font-black tracking-wider uppercase",
        h2: "text-xl md:text-2xl font-bold tracking-wide",
        h3: "text-base md:text-lg font-bold tracking-normal text-fg-muted",
    }[level];

    const Tag = level;

    return (
        <div className="w-full flex flex-col gap-1 select-none">
            {subtitle && (
                <span className="text-[11px] font-mono tracking-widest text-fg-muted uppercase opacity-80 selection:bg-transparent">
                    {subtitle}
                </span>
            )}
            <Tag
                className={`${sizeClasses} text-fg`}
                dangerouslySetInnerHTML={{ __html: title }}
            />
        </div>
    );
}
