"use client";

import { LabelLinkDes } from "@/components/Interfaces";
import { getContrastTextColor } from "@/utils/colours";
import { useEffect, useState } from "react";

interface ProjectCardProps {
    project: LabelLinkDes;
    colour: string;
}

/**
 * Interactive showcase card designed to display a project's repository info, descriptions,
 * and links. It automatically evaluates dark or light backgrounds to guarantee text accessibility.
 */
export default function ProjectCard({ project, colour }: ProjectCardProps) {
    // Initialize text as transparent to prevent sudden color flashes during early Next.js server generation cycles
    const [localTextColor, setLocalTextColor] = useState<string>("transparent");

    const containerClasses = [
        "group block overflow-hidden",
        "border border-border bg-bg-surface",
        "transition-all duration-200",
        "hover:border-comment hover:scale-[1.01]",
        "flex flex-col h-full", // Stretch elements to equal heights across uniform matrix rows
    ].join(" ");

    const canvasClasses = [
        "relative w-full aspect-square", // Keep canvas blocks at a perfectly locked 1:1 landscape profile
        "flex items-center justify-center",
        "overflow-hidden transition-colors",
    ].join(" ");

    const canvasLabelClasses = [
        "font-mono text-xs font-bold",
        "tracking-widest uppercase",
        "selection:bg-transparent",
    ].join(" ");

    const infoBarClasses = [
        "p-4 border-t border-border",
        "group-hover:bg-fg/5 transition-colors duration-200",
        "flex-grow", // Tell lower description fields to expand and push shorter text panels flat against the baseline
    ].join(" ");

    const arrowClasses = [
        "text-xl text-brand font-bold",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-200 tracking-wider",
    ].join(" ");

    // Wait for the browser mount lifecycle to trigger before calculating color values
    useEffect(() => {
        const adaptiveColor = getContrastTextColor(colour);
        setLocalTextColor(adaptiveColor);
    }, [colour]);

    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={containerClasses}
        >
            {/* Visual Canvas Block: Displays project names against color tokens */}
            <div className={canvasClasses} style={{ backgroundColor: colour }}>
                <span
                    className={canvasLabelClasses}
                    style={{ color: localTextColor }}
                >
                    {project.label}
                </span>
            </div>

            {/* Content Meta Bar: Displays lower title summaries and description blocks */}
            <div className={infoBarClasses}>
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-fg text-base group-hover:text-brand transition-colors duration-200">
                        {project.label}
                    </h3>
                    <span className={arrowClasses}>→</span>
                </div>
                <p className="mt-1 text-xs text-fg-muted line-clamp-2 leading-relaxed">
                    {project.description}
                </p>
            </div>
        </a>
    );
}
