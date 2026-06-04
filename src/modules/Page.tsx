import React from "react";

import Footer from "@/components/page/Footer";
import TableOfContents from "@/components/page/TableOfContents";
import { footerConfig } from "@/constants/profile";

/**
 * Interface representing the properties accepted by the Page component.
 *
 * @interface PageProps
 * @property {React.ReactNode[]} nodes - An ordered collection of pre-rendered layout nodes, primitives, or markdown blocks.
 */
interface PageProps {
    nodes: React.ReactNode[];
}

/**
 * A layout container element that orchestrates a sequence of arbitrary layout blocks
 * into a single unified article column. It handles responsive base layouts, outer margins,
 * page sizing limits, and typography states while safely rendering indexed node fragments.
 *
 * @public
 * @param {PageProps} props - The content elements and layout settings for the Page view.
 * @param {React.ReactNode[]} props.nodes - The structured nodes to populate sequentially within the main viewport.
 * @returns {JSX.Element} A structured article document tree hosting sequential child elements inside a bounded workspace.
 */
export default function Page({ nodes }: PageProps) {
    return (
        <>
            <article
                className="flex flex-col gap-y-5 min-h-screen max-w-5xl mx-auto p-8 md:p-16 bg-bg text-fg font-mono 
                [&_h1]:scroll-mt-36 md:[&_h1]:scroll-mt-24 
                [&_h2]:scroll-mt-36 md:[&_h2]:scroll-mt-24 
                [&_h3]:scroll-mt-36 md:[&_h3]:scroll-mt-24"
            >
                {nodes.map((node, index) => (
                    <React.Fragment key={index}>{node}</React.Fragment>
                ))}
                <Footer nodes={footerConfig} />
            </article>

            <TableOfContents />
        </>
    );
}
