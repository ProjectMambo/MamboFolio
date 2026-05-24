"use client";

import { useEffect, useState, useRef } from "react";
import Heading from "@/components/markdown/Heading";

interface DocumentMeta {
    description?: string;
    tags?: string[];
    date?: string;
    url?: string;
}

interface DocumentPayload {
    title: string;
    html: string;
    meta: DocumentMeta | null;
}

interface MarkdownProps {
    path: string;
    variant?: "main" | "subpage";
    showTitle?: boolean;
}

export default function Markdown({
    path,
    variant = "subpage",
    showTitle = true,
}: MarkdownProps) {
    const [doc, setDoc] = useState<DocumentPayload | null>(null);
    const lastLoadedPath = useRef<string>("");

    // Cache engine to prevent repeating network queries on the same target path
    useEffect(() => {
        if (path === lastLoadedPath.current) return;
        lastLoadedPath.current = path;

        fetch(`/parsed-docs/${path}.json`)
            .then((res) => res.json())
            .then((data) => setDoc(data))
            .catch((err) =>
                console.error("Error reading static markdown payload:", err),
            );
    }, [path]);

    if (!doc) {
        return (
            <div className="text-sm text-fg-muted">
                Loading content layout...
            </div>
        );
    }

    const hasValidMeta =
        !!doc.meta &&
        (!!doc.meta.date ||
            !!doc.meta.url ||
            !!doc.meta.description ||
            (!!doc.meta.tags && doc.meta.tags.length > 0));

    // Structural layout alignment parameters based on active variant mode
    const outerContainerClass = variant === "main" ? "max-w-6xl" : "max-w-4xl";
    const proseColumnClass =
        variant === "main" ? "mx-auto max-w-4xl w-full" : "w-full";

    return (
        <article className="w-full bg-bg flex flex-col gap-y-4">
            {/* Header: Core title segment */}
            {showTitle && (
                <header
                    className={`mx-auto ${outerContainerClass} w-full px-4 flex flex-col gap-y-2`}
                >
                    <Heading title={doc.title} level="h1" />
                </header>
            )}

            {/* Metadata Banner: Timestamps, description blocks, and structural labels */}
            {hasValidMeta && (
                <div
                    className={`mx-auto ${outerContainerClass} w-full px-4 border-b border-border/40 pb-4 mb-2`}
                >
                    <div className={proseColumnClass}>
                        {/* Meta tracking date and external reference hyperlinks */}
                        {(doc.meta?.date || doc.meta?.url) && (
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono tracking-widest text-fg-muted uppercase">
                                {doc.meta.date && <span>{doc.meta.date}</span>}
                                {doc.meta.url && (
                                    <a
                                        href={doc.meta.url}
                                        className="text-brand hover:underline transition-all lowercase tracking-normal font-sans font-medium"
                                    >
                                        {doc.meta.url} ➔
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Summary caption profile text */}
                        {doc.meta?.description && (
                            <p className="text-sm md:text-base text-fg-muted italic leading-relaxed font-serif mt-2">
                                {doc.meta.description}
                            </p>
                        )}

                        {/* Classification inline row tags */}
                        {doc.meta?.tags && doc.meta.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {doc.meta.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-mono font-medium px-2 py-0.5 bg-bg-surface border border-border/60 text-fg select-none uppercase tracking-wider"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Body Content: Deep styling layer for pre-rendered markdown elements */}
            <div className={`mx-auto ${outerContainerClass} w-full px-4 py-2`}>
                <div
                    className={[
                        "flex flex-col gap-y-3",
                        proseColumnClass,

                        // Paragraph and body layout typography tokens
                        "[&_p]:text-sm [&_p]:md:text-base [&_p]:leading-relaxed [&_p]:text-fg [&_p]:text-justify [&_p]:tracking-normal [&_p]:font-sans [&_p]:antialiased",

                        // Structural content subheadings
                        "[&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:text-fg [&_h2]:mt-4",
                        "[&_h3]:text-base [&_h3]:md:text-lg [&_h3]:font-bold [&_h3]:tracking-normal [&_h3]:text-fg-muted [&_h3]:mt-2",
                    ].join(" ")}
                    dangerouslySetInnerHTML={{ __html: doc.html }}
                />
            </div>
        </article>
    );
}
