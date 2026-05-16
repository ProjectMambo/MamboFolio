import Link from "next/link";
import { LabelLink } from "@/components/Interfaces";

interface NavButtonProps {
    button: LabelLink;
    defaultBorder?: boolean; // Controls whether borders render statically or reveal during user interaction
}

/**
 * Interactive navigation utility that maps data parameters to semantic Next.js link routes.
 */
export default function NavButton({
    button,
    defaultBorder = false,
}: NavButtonProps) {
    const baseClasses = [
        "px-3 h-full min-h-[28px]",
        "flex flex-shrink-0 items-center justify-center",
        "pt-px font-bold",
        "text-fg-muted hover:text-fg",
        "outline hover:outline-border",
        "hover:bg-bg-surface/40",
        "transition-all duration-200",
    ].join(" ");

    // Dynamic conditional flags resolve toggle styles cleanly outside return statements
    const borderClasses = defaultBorder
        ? "outline-border"
        : "outline-transparent";

    return (
        <Link href={button.link} className={`${baseClasses} ${borderClasses}`}>
            {button.label}
        </Link>
    );
}
