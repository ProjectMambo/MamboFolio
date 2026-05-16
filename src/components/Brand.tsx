import Link from "next/link";
import { LabelLink } from "@/components/Interfaces";

interface BrandProps {
    brand: LabelLink;
}

/**
 * Application branding link block designed to safely adapt to layout positions.
 */
export default function Brand({ brand }: BrandProps) {
    const baseClasses = [
        "font-bold text-brand",
        "hover:text-brand-hover",
        "tracking-tight",
        "transition-colors duration-200",
    ].join(" ");

    return (
        <Link href={brand.link} className={baseClasses}>
            {brand.label}
        </Link>
    );
}
