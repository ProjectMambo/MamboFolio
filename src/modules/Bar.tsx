"use client";

import { Fragment, useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Clock from "@/components/bar/Clock";
import { useScrollDirection } from "@/hooks/useScrollDirection";

import { Entry } from "@/components/Interfaces";

/**
 * Handles visibility translation modifiers for the header container wrapper,
 * smoothly pulling the navigation tracking deck off-screen when scrolls move downwards.
 */
const BarVisibility = cva(
    "sticky top-0 z-50 w-full px-4 pt-3 select-none c-transition",
    {
        variants: {
            visible: {
                true: "translate-y-0",
                false: "-translate-y-full",
            },
        },
        defaultVariants: {
            visible: true,
        },
    },
);

/**
 * Manages core geometric scaling matrices, handling horizontal layout limits
 * and controlling vertical stacking behaviors across different layout viewports.
 */
const BarLayout = cva(
    [
        "mx-auto py-1.5 self-stretch gap-y-3",
        "flex flex-col items-center justify-between",
    ].join(" "),
    {
        variants: {
            width: {
                narrow: "max-w-max",
                mid: "max-w-6xl",
                screen: "max-w-screen",
            },
            stack: {
                always: "",
                sm: "sm:flex-row",
                md: "md:flex-row",
                lg: "lg:flex-row",
                xl: "xl:flex-row",
            },
        },
        defaultVariants: {
            width: "mid",
            stack: "sm",
        },
    },
);

/**
 * Applies core interface decorations, handling design system borders, backdrops,
 * box shadow accents, and custom transition timing configurations.
 */
const BarTheme = cva("border-2 transition-all ease-in-out", {
    variants: {
        border: {
            none: "border-transparent",
            static: "border-border",
        },
        bg: {
            none: "bg-transparent",
            static: "bg-bg",
        },
        animation: {
            none: "duration-0",
            slow: "duration-400 ",
            mid: "duration-300",
            fast: "duration-200",
            ultra: "duration-100",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
    },
    defaultVariants: {
        border: "static",
        bg: "static",
        animation: "mid",
        shadow: "xl",
    },
});

/**
 * Controls responsive rendering for chronological components, mapping responsive
 * breakpoint rules to hide or show clock modules dynamically.
 */
const ClockVisibility = cva("block", {
    variants: {
        hide: {
            always: "hidden",
            sm: "hidden sm:block",
            md: "hidden md:block",
            lg: "hidden lg:block",
            xl: "hidden xl:block",
            never: "block",
        },
    },
    defaultVariants: {
        hide: "lg",
    },
});

/**
 * Explicit type variation ensuring all navigational routing entries possess a valid string pathway.
 */
type Nav = Entry & Required<Pick<Entry, "link">>;

/**
 * Interface representing the properties accepted by the Bar component.
 *
 * @interface BarProps
 * @extends {VariantProps<typeof BarLayout>} Inherits structural layout definitions ('width', 'stack').
 * @extends {VariantProps<typeof BarTheme>} Inherits aesthetic theme styling configurations ('border', 'bg', 'animation', 'shadow').
 * @extends {VariantProps<typeof ClockVisibility>} Inherits target responsive visibility toggles ('hide').
 * @property {[brand: Nav, ...pages: Nav[]]} navItems - Strongly typed array structure enforcing a primary brand entry followed by page nodes.
 */
interface BarProps
    extends
        VariantProps<typeof BarLayout>,
        VariantProps<typeof BarTheme>,
        VariantProps<typeof ClockVisibility> {
    navItems: [brand: Nav, ...pages: Nav[]];
}

/**
 * A highly structural master header shell that serves as the root orchestration point for application navigation.
 * It manages context-aware display toggles based on view scrolling trends, segregates structural brand entries from
 * page collections, and builds inline separation blocks while rendering platform chronological systems.
 *
 * @public
 * @param {BarProps} props - Layout configurations, theme modifiers, tracking parameters, and system data collections.
 * @param {[brand: Nav, ...pages: Nav[]]} props.navItems - Segmented structural items used to configure anchors and links.
 * @param {"always" | "sm" | "md" | "lg" | "xl"} [props.stack="sm"] - Viewport mapping configuration determining layout behavior.
 * @param {"none" | "static"} [props.border="static"] - Active framework boundary layout configurations.
 * @param {"none" | "static"} [props.bg="static"] - Interactive base plate styling parameters.
 * @param {"none" | "slow" | "mid" | "fast" | "ultra"} [props.animation="mid"] - Vector update transformation timings.
 * @param {"none" | "sm" | "md" | "lg" | "xl"} [props.shadow="xl"] - Backdrop shadow elevations applied to the container.
 * @param {"always" | "sm" | "md" | "lg" | "xl" | "never"} [props.hide="lg"] - Breakpoint limiters controlling clock visibility.
 * @returns {JSX.Element} An interactive layout bar component tracking navigation anchors, logos, and clocks.
 */
export default function Bar({
    navItems,
    stack,
    border,
    bg,
    animation,
    shadow,
    hide: clockHide,
}: BarProps) {
    const [brand, ...pages] = navItems;
    const isVisible = useScrollDirection(40);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [sameRow, setSameRow] = useState<boolean[]>([]);

    useEffect(() => {
        const checkRows = () => {
            const rows = itemRefs.current.map(
                (el) => el?.getBoundingClientRect().top ?? 0,
            );
            setSameRow(
                rows.map(
                    (top, i) => i < rows.length - 1 && top === rows[i + 1],
                ),
            );
        };

        checkRows();
        window.addEventListener("resize", checkRows);
        return () => window.removeEventListener("resize", checkRows);
    }, [pages.length]);

    const barStyles = twMerge(
        BarLayout({ stack }),
        BarTheme({ border, bg, animation, shadow }),
    );

    return (
        <header className={BarVisibility({ visible: isVisible })}>
            <div className={twMerge(barStyles, "overflow-hidden")}>
                <Button
                    label={brand.label}
                    link={brand.link}
                    className="uppercase"
                    border="none"
                    bg="none"
                    text="brand"
                    scale="none"
                />

                <nav className="flex flex-row flex-wrap items-center justify-center px-3 gap-1">
                    {pages.map((item, index) => (
                        <Fragment key={`${item.label}-${item.link}`}>
                            <div
                                ref={(el) => {
                                    itemRefs.current[index] = el;
                                }}
                            >
                                <Button
                                    label={item.label}
                                    link={item.link}
                                    border="muted"
                                    bg="muted"
                                />
                            </div>
                            {sameRow[index] && <Divider border="static" />}
                        </Fragment>
                    ))}
                </nav>

                <div className={ClockVisibility({ hide: clockHide })}>
                    <Clock />
                </div>
            </div>
        </header>
    );
}
