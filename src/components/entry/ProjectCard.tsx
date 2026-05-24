"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LabelLinkDes } from "@/components/Interfaces";
import { getContrastTextColor } from "@/utils/colours";

interface ProjectCardProps {
    project: LabelLinkDes;
    colour: string;
}

/**
 * Interactive showcase card designed to display a project's repository info, descriptions,
 * and links. It safely defers color accessibility evaluations to the browser client.
 */
export default function ProjectCard({ project, colour }: ProjectCardProps) {
    const [localTextColor, setLocalTextColor] = useState("transparent");

    useEffect(() => {
        const adaptiveColor = getContrastTextColor(colour);
        setLocalTextColor(adaptiveColor);
    }, [colour]);

    const baseContainer = [
        "group block",
        "text-xs",
        "flex flex-col items-center justify-between",
        "c-transition c-border-normal c-bg-normal ",
    ].join(" ");

    const mediumContainer = ["md:text-sm"].join(" ");
    const largeContainer = ["lg:text-sm"].join(" ");

    const baseCanvas = [
        "aspect-square w-full h-full",
        "flex items-center justify-center",
    ].join(" ");

    return (
        <Link
            href={project.link}
            className={`${baseContainer} ${mediumContainer} ${largeContainer}`}
        >
            {/* Canvas section */}
            <div className={baseCanvas} style={{ backgroundColor: colour }}>
                <span
                    className={"c-transition c-label-brand text-lg uppercase"}
                    style={{ color: localTextColor }}
                >
                    {project.label}
                </span>
            </div>

            {/* Info banner */}
            <div className="p-3 c-transition c-border-top-normal W-full">
                {/* Main Label */}
                <div className="flex flex-row items-center justify-between text-lg">
                    <h3 className="c-transition c-label-normal">
                        {project.label}
                    </h3>
                    <span className="c-transition c-label-hidden line-clamp-1">{"->"}</span>
                </div>

                {/* Description */}
                <p className="c-transition c-text-des line-clamp-2 mt-1">
                    {project.description}
                </p>
            </div>
        </Link>
    );
}