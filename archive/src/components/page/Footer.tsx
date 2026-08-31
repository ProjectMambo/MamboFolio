import React from "react";

import Divider from "@/components/Divider";

/**
 * Interface representing the properties accepted by the Footer component.
 *
 * @interface FooterProps
 * @property {React.ReactNode[]} [nodes=[]] - An optional array of structured informational blocks, copyright texts, or tracking layouts.
 */
interface FooterProps {
    nodes?: React.ReactNode[];
}

/**
 * A layout manager component serving as the terminal closing section for page documents.
 * It injects a clean horizontal separation line and orchestrates a series of supplementary elements,
 * links, or informational markers into a unified responsive vertical container tracking stack.
 *
 * @public
 * @param {FooterProps} props - Supplementary layout elements targeted for terminal document placement.
 * @param {React.ReactNode[]} [props.nodes=[]] - Context nodes or metadata components populated below the boundary lines.
 * @returns {JSX.Element} A structured footer container element closing out platform viewports.
 */
export default function Footer({ nodes = [] }: FooterProps) {
    return (
        <footer className="w-full flex flex-col pt-8 pb-16 mb-20 md:mb-30">
            <Divider orientation="horizontal" />

            <div className="flex flex-col gap-y-4 mt-6">
                {nodes.map((node, index) => (
                    <React.Fragment key={`footer-node-${index}`}>
                        {node}
                    </React.Fragment>
                ))}
            </div>
        </footer>
    );
}
