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

export default function Waybar({ pages, brand }: WaybarProps) {
    const isVisible = useScrollDirection(40);

    const headerClasses = [
        "sticky top-0 z-50",
        "w-full px-4 pt-3",
        "select-none",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
    ].join(" ");

    /**
     * Layout Canvas Container:
     * The row height constraints now hold steady until the screen gets considerably narrower.
     */
    const innerBarClasses = [
        "max-w-6xl mx-auto pt-2.5 pb-3.5 md:py-0 md:h-10",
        "bg-bg border border-border",
        "flex flex-col md:flex-row items-center justify-between",
        "px-4 shadow-xl gap-y-3 md:gap-y-0",
    ].join(" ");

    /**
     * Left Zone Link Layout:
     */
    const leftNavClasses = [
        "flex flex-wrap items-center gap-y-1",
        "text-[12px] uppercase tracking-wider",
        "justify-center md:justify-start",
        "w-full md:w-auto md:flex-1",
        "order-1",
    ].join(" ");

    /**
     * Center Zone Brand Frame:
     *
     * - Under 768px (Mobile): Centers completely (`justify-center w-full`).
     * - 768px to 1024px (Mid/Tablet): The clock is hidden, so the brand snaps beautifully to the right side (`md:justify-end md:w-auto`).
     * - Above 1024px (Desktop): The clock returns, and the brand moves to the exact middle center (`lg:justify-center lg:flex-1`).
     */
    const brandContainerClasses = [
        "flex items-center gap-2 text-xs font-bold",
        "justify-center w-full",
        "md:justify-end md:w-auto",
        "lg:justify-center lg:flex-1",
        "order-2 md:order-2",
    ].join(" ");

    /**
     * Right Zone Chrono Element:
     * Now, the second the screen drops below 1024px, the clock disappears cleanly *long before* the text can run out of space and stack.
     */
    const rightNavClasses = [
        "hidden lg:flex justify-end items-center",
        "lg:w-auto lg:flex-1",
        "order-3 lg:order-3",
    ].join(" ");

    return (
        <header className={headerClasses}>
            <div className={innerBarClasses}>
                {/* LEFT ZONE: Navigation menu options */}
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

                {/* CENTER ZONE: Brand tracking node */}
                <div className={brandContainerClasses}>
                    <Brand brand={brand} />
                </div>

                {/* RIGHT ZONE: Desktop clock readout (Hidden early on mid/small screens) */}
                <div className={rightNavClasses}>
                    <Clock />
                </div>
            </div>
        </header>
    );
}
