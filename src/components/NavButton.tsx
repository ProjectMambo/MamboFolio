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
    const base = [
        "text-xs pt-1",
        "shrink-0 px-3 py-1",
        "flex items-center justify-center",
        "c-transition c-bg-hover c-label-muted",
        defaultBorder ? "c-border-normal" : "c-outline-hover",
    ].join(" ");

    const medium = ["md:text-sm"].join(" ");

    const large = ["lg:text-sm"].join(" ");

    return (
        <Link href={button.link} className={`${base} ${medium} ${large}`}>
            {button.label}
        </Link>
    );
}
