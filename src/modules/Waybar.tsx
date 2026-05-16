"use client";

import { LabelLink } from "@/components/Interfaces";
import NavButton from "@/components/NavButton";
import Divider from "@/components/Divider";
import Brand from "@/components/Brand";
import Clock from "@/components/Clock";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface WaybarProps {
    pages: LabelLink[];
    brand: LabelLink;
}

/**
 * Application-wide structural header bar. Uses a fluid flex-wrap mechanism
 * to handle variable navigation lengths gracefully, integrated with a passive
 * scroll listener hook to maximize vertical viewport space during active scrolling.
 */
export default function Waybar({ pages, brand }: WaybarProps) {
    /**
     * Scroll State Lifecycle:
     * Leverages a passive scroll vector hook. Evaluates direction delta vectors
     * against a 40px threshold to prevent hyper-sensitive toggling when users tap or wiggle.
     */
    const isVisible = useScrollDirection(40);

    /**
     * Header Structural Container:
     * Applies CSS hardware acceleration classes (`translate-y`). By offloading the position shift
     * to the browser's transform layer rather than manipulating layout-heavy parameters like `top`,
     * the animation executes at a smooth 60fps without causing costly browser reflows.
     */
    const headerClasses = [
        "sticky top-0 z-50",
        "w-full px-4 pt-3",
        "select-none",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
    ].join(" ");

    /**
     * Layout Canvas Container:
     * Swaps standard CSS grid distributions for a flex-wrap engine. Removing rigid heights
     * allows the structural navbar wrapper to expand vertically when long asset arrays push down.
     */
    const innerBarClasses = [
        "max-w-6xl mx-auto py-2 md:py-0 md:h-10",
        "bg-bg border border-border",
        "flex flex-wrap items-stretch justify-between",
        "px-4 shadow-xl gap-y-3",
    ].join(" ");

    /**
     * Left Zone Link Layout:
     * Maps out navigation arrays. Utilizes wrapped flex strings to absorb ultra-narrow screen limits,
     * automatically stacking raw link parameters vertically before scaling side-by-side on larger screens.
     */
    const leftNavClasses = [
        "flex flex-wrap items-center gap-y-1",
        "text-[12px] uppercase tracking-wider",
        "py-1 justify-start",
        "w-full sm:w-auto md:flex-1",
        "order-1",
    ].join(" ");

    /**
     * Center Zone Brand Frame:
     * Manages layout tracking rules based on device breakpoints. It occupies 50% width on
     * mobile screens to share space with active headers, then scales down to an equal, centered slot
     * once tablet dimensions match standard desktop rows.
     */
    const brandContainerClasses = [
        "flex items-center justify-center md:justify-center gap-2 text-xs font-bold",
        "w-1/2 sm:w-auto md:flex-1",
        "order-2 md:order-2",
    ].join(" ");

    /**
     * Right Zone Chrono Element:
     * Strips rigid absolute hidden values to maintain real-time tracking access across all platforms.
     * It takes a full single row space on mid-break screens to cleanly drop below the header layers,
     * then locks safely into the right-side alignment on large screens.
     */
    const rightNavClasses = [
        "flex justify-end items-center",
        "w-1/2 sm:w-full md:w-auto md:flex-1",
        "order-3 md:order-3",
    ].join(" ");

    return (
        <header className={headerClasses}>
            <div className={innerBarClasses}>
                {/* LEFT ZONE: Dynamically loops menu objects and places layout dividers */}
                <nav className={leftNavClasses}>
                    {pages.map((item, index) => (
                        <div
                            key={item.link}
                            className="flex items-center h-full"
                        >
                            <NavButton button={item} />
                            {index < pages.length - 1 && <Divider />}
                        </div>
                    ))}
                </nav>

                {/* CENTER ZONE: Brand focal element position anchor */}
                <div className={brandContainerClasses}>
                    <Brand brand={brand} />
                </div>

                {/* RIGHT ZONE: Desktop clock readout position anchor */}
                <div className={rightNavClasses}>
                    <Clock />
                </div>
            </div>
        </header>
    );
}
