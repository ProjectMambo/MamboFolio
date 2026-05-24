"use client"

import { Fragment } from "react";
import NavButton from "@/components/NavButton"; // Adjust these paths based on your file tree
import Brand from "@/components/bar/Brand";
import Divider from "@/components/bar/Divider";
import Clock from "@/components/bar/Clock";
import { useScrollDirection } from "@/hooks/useScrollDirection"; // Adjust path as needed

export interface LabelLink {
    label: string;
    link: string;
}

interface WaybarProps {
    pages: LabelLink[];
    brand: LabelLink;
}

export default function Waybar({ pages, brand }: WaybarProps) {
    const isVisible = useScrollDirection(40);

    const baseHeader = [
        "sticky top-0 z-50",
        "w-full px-4 pt-3",
        "select-none",
        "c-transition",
        isVisible ? "translate-y-0" : "-translate-y-full",
    ].join(" ");

    /**
     * Layout Canvas Container:
     * The row height constraints now hold steady until the screen gets considerably narrower.
     */
    const baseContainer = [
        "max-w-6xl mx-auto py-1.5 self-stretch",
        "flex flex-col items-center justify-between gap-y-3",
        "bg-bg shadow-xl",
        "c-transition c-border-static",
    ].join(" ");

    const mediumContainer = ["md:flex-row"].join(" ");
    const largeContainer = ["lg:flex-row"].join(" ");

    return (
        <header className={baseHeader}>
            <div className={`${baseContainer} ${mediumContainer} ${largeContainer}`}>
                
                {/* NAV ZONE: Now dynamically maps over your incoming pages prop */}
                <nav className="flex flex-row items-center justify-between px-3">
                    {pages.map((item, index) => (
                        <Fragment key={item.link}>
                            <NavButton button={item} />
                            {/* Injects a separator line ONLY between sibling buttons */}
                            {index < pages.length - 1 && <Divider />}
                        </Fragment>
                    ))}
                </nav>

                {/* BRAND ZONE: Now uses your modular incoming brand input data */}
                <Brand brand={brand} />
                
                {/* CLOCK ZONE: Keeps layout boundaries clean, hiding until lg viewports */}
                <div className="hidden lg:block">
                    <Clock />
                </div>
            </div>
        </header>
    );
}