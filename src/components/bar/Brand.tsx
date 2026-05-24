import Link from "next/link";
import { LabelLink } from "@/components/Interfaces";

interface BrandProps {
    brand: LabelLink;
}

/**
 * Application branding link block designed to safely adapt to layout positions.
 */
export default function Brand({ brand }: BrandProps) {
    const base = [
        "text-xs pt-1 uppercase",
        "shrink-0 px-3 py-1",
        "flex items-center justify-center",
        "c-transition c-label-brand",
    ].join(" ");

    const medium = ["md:text-sm"].join(" ");

    const large = ["lg:text-sm"].join(" ");

    return (
        <Link href={brand.link} className={`${base} ${medium} ${large}`}>
            {brand.label}
        </Link>
    );
}
