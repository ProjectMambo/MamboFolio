import Link from "next/link";
import { ReactNode } from "react";
import { LabelLinkDesDate } from "@/components/Interfaces";

interface BlogEntryProps {
    blog: LabelLinkDesDate;
    children?: ReactNode;
}

/**
 * Editorial list row component featuring distinct typographic hierarchy,
 * an optional children slot, and an interactive full-bleed hover state.
 */
export default function BlogEntry({ blog, children }: BlogEntryProps) {
    const containerClasses = ["group block w-full bg-bg"].join(" ");

    const innerRowClasses = [
        "w-full flex flex-col transition-all duration-300 ease-in-out",
        "group-hover:bg-bg-surface/50", // Removes outer padding constraints to let background hover bleed out full-width
    ].join(" ");

    const contentClasses = [
        "mx-auto max-w-6xl w-full flex flex-col gap-2 px-4 py-6", // Aligns content text boundaries cleanly with global grids
    ].join(" ");

    const metaClasses = [
        "text-[11px] font-mono tracking-widest text-fg-muted uppercase",
        "selection:bg-transparent",
    ].join(" ");

    const titleClasses = [
        "text-lg md:text-xl font-bold tracking-wide text-fg",
        "transition-colors duration-300 ease-in-out group-hover:text-brand",
    ].join(" ");

    const descriptionClasses = [
        "text-[14px] leading-relaxed text-fg-muted font-medium max-w-4xl",
    ].join(" ");

    const childrenClasses = [
        "w-full mt-1", // Container for dynamic layout injectables like tag modules
    ].join(" ");

    const dividerClasses = [
        "w-full border-t border-border opacity-40",
        "transition-colors duration-300 ease-in-out group-hover:border-comment/80", // Synchronizes matching color treatments across hovers
    ].join(" ");

    return (
        <Link href={blog.link} className={containerClasses}>
            {/* Visual Row Container: Handles background canvas state changes */}
            <div className={innerRowClasses}>
                {/* Content Block: Houses structured textual data sets */}
                <div className={contentClasses}>
                    <div className="flex flex-col gap-1">
                        {blog.date && (
                            <span className={metaClasses}>{blog.date}</span>
                        )}
                        <h3 className={titleClasses}>{blog.label}</h3>
                    </div>

                    <p className={descriptionClasses}>{blog.description}</p>

                    {children && (
                        <div className={childrenClasses}>{children}</div>
                    )}
                </div>

                {/* Divider Layout: Extends perfectly edge-to-edge outside content limitations */}
                <div className="w-full">
                    <hr className={dividerClasses} />
                </div>
            </div>
        </Link>
    );
}
