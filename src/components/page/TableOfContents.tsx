"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

import Text from "@/components/Text";
import Button from "@/components/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Size threshold of the active viewport sliding index container.
 */
const WINDOW_SIZE = 7;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Metadata record representing a discovered document heading token mapped from the DOM tree.
 *
 * @interface HeadingEntry
 * @property {string} id - The matching element layout hash tag.
 * @property {string} text - The core raw string content contained inside the heading tag.
 * @property {1 | 2 | 3} level - The structural semantic depth tier of the heading.
 * @property {HTMLElement} element - Direct object reference to the underlying browser DOM node.
 * @property {HTMLElement} scrollTarget - The element that will be scrolled into view on click.
 *   Resolves to the nearest ancestor with the `group` class if one exists, otherwise falls back
 *   to `element` itself. This ensures card components are scrolled to from their top edge.
 */
interface HeadingEntry {
    id: string;
    text: string;
    level: 1 | 2 | 3;
    element: HTMLElement;
    scrollTarget: HTMLElement;
}

// ─────────────────────────────────────────────────────────────────────────────
// CVA style definitions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Structural layout variants establishing bounds, text placement vectors, padding distributions,
 * and operational toggle sizes for table of contents layers.
 */
const TocLayout = cva("", {
    variants: {
        part: {
            root: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2",
            panel: [
                "flex flex-col gap-0.5",
                "py-3 px-3",
                "min-w-[180px] max-w-[240px]",
                "overflow-y-auto max-h-[70vh]",
                "scrollbar-none",
                "[&::-webkit-scrollbar]:none",
                "select-none touch-none",
            ],
            entry: [
                "flex items-center gap-2 text-left w-full",
                "py-[3px] cursor-pointer",
                "c-transition select-none",
            ],
            scrubber: "flex gap-[2px] mb-2 px-0.5",
            overflow: "flex justify-between mt-1.5 px-0.5",
            icon: "flex flex-col gap-[3px]",
            iconBar: "block h-[2px] bg-current",
            accentBar: "shrink-0 h-[1.5px] c-transition",
        },
    },
    defaultVariants: { part: "root" },
});

/**
 * Visual surface declarations defining context borders, backdrop colors,
 * and custom accent shadow effects matched from variables.
 */
const TocTheme = cva("c-transition", {
    variants: {
        part: {
            panel: [
                "border-2 border-border",
                "bg-bg-surface",
                "shadow-[3px_3px_0px_0px_rgba(0,0,0,0)] shadow-border",
            ],
        },
    },
    defaultVariants: { part: "panel" },
});

/**
 * Individual interaction layers that control layer visibility values across active,
 * parent, and non-focused typography indexes.
 */
const TocEntryState = cva("c-transition", {
    variants: {
        state: {
            active: "opacity-100",
            ancestor: "opacity-70",
            idle: "opacity-30 hover:opacity-60",
        },
    },
    defaultVariants: { state: "idle" },
});

/**
 * Handles inline spacing indentations derived from heading level metadata.
 */
const TocEntryIndent = cva("", {
    variants: {
        level: {
            1: "pl-0",
            2: "pl-3",
            3: "pl-6",
        },
    },
    defaultVariants: { level: 1 },
});

/**
 * Geometric configuration modifiers determining accent line scales
 * and baseline colors across active reading tracking states.
 */
const TocAccentBar = cva("shrink-0 h-[1.5px] c-transition", {
    variants: {
        level: {
            1: "w-3",
            2: "w-2",
            3: "w-1.5",
        },
        state: {
            active: "bg-fg",
            ancestor: "bg-fg-muted",
            idle: "bg-fg-muted",
        },
    },
    defaultVariants: { level: 1, state: "idle" },
});

/**
 * Visual rendering weights applied across the top mini-map macro ticker items
 * to depict their relationship with the sliding viewport window.
 */
const TocScrubberPip = cva("h-[2px] flex-1 c-transition", {
    variants: {
        pip: {
            active: "bg-fg opacity-100",
            inWindow: "bg-fg-muted opacity-60",
            outside: "bg-border opacity-30",
        },
    },
    defaultVariants: { pip: "outside" },
});

// ─────────────────────────────────────────────────────────────────────────────
// Pure helpers
// ─────────────────────────────────────────────────────────────────────────────

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Walks up the DOM from `el` and returns the first ancestor that has the
 * Tailwind `group` class, or `el` itself if none is found.
 *
 * This is used so that clicking a TOC entry for a heading that lives inside
 * a card component scrolls to the top of the card rather than to the bare
 * heading element (which may be visually mid-card).
 */
function resolveScrollTarget(el: HTMLElement): HTMLElement {
    let node: HTMLElement | null = el.parentElement;
    while (node && node !== document.body) {
        if (node.classList.contains("group")) return node;
        node = node.parentElement;
    }
    return el;
}

function ensureHeadingIds(container: HTMLElement): HeadingEntry[] {
    return Array.from(
        container.querySelectorAll<HTMLElement>("h1, h2, h3"),
    ).map((el) => {
        const text = el.textContent ?? "";
        if (!el.id) {
            el.id =
                slugify(text) ||
                `heading-${Math.random().toString(36).slice(2, 7)}`;
        }
        const tag = el.tagName.toLowerCase();
        const level: 1 | 2 | 3 = tag === "h1" ? 1 : tag === "h2" ? 2 : 3;
        const scrollTarget = resolveScrollTarget(el);
        return { id: el.id, text, level, element: el, scrollTarget };
    });
}

function getHighlightedIndices(
    headings: HeadingEntry[],
    activeIdx: number,
): Set<number> {
    const set = new Set<number>();
    if (activeIdx < 0 || activeIdx >= headings.length) return set;
    set.add(activeIdx);
    let searchLevel = headings[activeIdx].level - 1;
    for (let i = activeIdx - 1; i >= 0 && searchLevel >= 1; i--) {
        if (headings[i].level === searchLevel) {
            set.add(i);
            searchLevel--;
        }
    }
    return set;
}

function computeWindow(
    headings: HeadingEntry[],
    activeIdx: number,
): { start: number; end: number } {
    const total = headings.length;
    if (total <= WINDOW_SIZE) return { start: 0, end: total };
    let start = Math.max(0, activeIdx - Math.floor(WINDOW_SIZE / 2));
    let end = start + WINDOW_SIZE;
    if (end > total) {
        end = total;
        start = Math.max(0, end - WINDOW_SIZE);
    }
    return { start, end };
}

function entryState(
    globalIdx: number,
    activeIdx: number,
    highlighted: Set<number>,
): "active" | "ancestor" | "idle" {
    if (globalIdx === activeIdx) return "active";
    if (highlighted.has(globalIdx)) return "ancestor";
    return "idle";
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function TableOfContents() {
    const [headings, setHeadings] = useState<HeadingEntry[]>([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const visibleSet = useRef<Set<number>>(new Set());
    const activeIdxRef = useRef(0);
    const headingsRef = useRef<HeadingEntry[]>([]);
    const touchStartYRef = useRef<number | null>(null);
    const virtualOffsetRef = useRef<number | null>(null);

    useEffect(() => {
        headingsRef.current = headings;
    }, [headings]);

    useEffect(() => {
        activeIdxRef.current = activeIdx;
        if (
            virtualOffsetRef.current !== null &&
            activeIdx !== virtualOffsetRef.current
        ) {
            virtualOffsetRef.current = null;
        }
    }, [activeIdx]);

    useEffect(() => {
        const container = document.querySelector("article") ?? document.body;
        const discovered = ensureHeadingIds(container);
        headingsRef.current = discovered;
        setTimeout(() => setHeadings(discovered), 0);

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (isExpanded && isMouseOver) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMouseOver, isExpanded]);

    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = headingsRef.current.findIndex(
                        (h) => h.id === entry.target.id,
                    );
                    if (idx === -1) return;
                    if (entry.isIntersecting) {
                        visibleSet.current.add(idx);
                    } else {
                        visibleSet.current.delete(idx);
                    }
                });

                if (
                    virtualOffsetRef.current === null &&
                    visibleSet.current.size > 0
                ) {
                    const top = Math.min(...visibleSet.current);
                    setTimeout(() => setActiveIdx(top), 0);
                }
            },
            { rootMargin: "0px 0px -55% 0px", threshold: 0 },
        );

        const handleGlobalWheel = (e: WheelEvent) => {
            const isAtBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4;

            if (isAtBottom && e.deltaY > 0) {
                const currentVirtual =
                    virtualOffsetRef.current ?? activeIdxRef.current;
                if (currentVirtual < headingsRef.current.length - 1) {
                    const nextIdx = currentVirtual + 1;
                    virtualOffsetRef.current = nextIdx;
                    setActiveIdx(nextIdx);
                }
            } else if (e.deltaY < 0) {
                if (virtualOffsetRef.current !== null) {
                    const prevIdx = virtualOffsetRef.current - 1;
                    const baseIntersectionIdx =
                        visibleSet.current.size > 0
                            ? Math.min(...visibleSet.current)
                            : activeIdxRef.current;

                    if (prevIdx <= baseIntersectionIdx) {
                        virtualOffsetRef.current = null;
                        setActiveIdx(baseIntersectionIdx);
                    } else {
                        virtualOffsetRef.current = prevIdx;
                        setActiveIdx(prevIdx);
                    }
                }
            }
        };

        window.addEventListener("wheel", handleGlobalWheel, { passive: true });
        headings.forEach((h) => observer.observe(h.element));

        return () => {
            observer.disconnect();
            window.removeEventListener("wheel", handleGlobalWheel);
        };
    }, [headings]);

    const handleClick = useCallback(
        (heading: HeadingEntry, globalIdx: number) => {
            virtualOffsetRef.current = null;
            setActiveIdx(globalIdx);
            activeIdxRef.current = globalIdx;

            const scrollMt = window.innerWidth >= 768 ? 96 : 144;
            const top =
                heading.scrollTarget.getBoundingClientRect().top +
                window.scrollY -
                scrollMt;

            window.scrollTo({ top, behavior: "smooth" });
        },
        [],
    );

    if (headings.length === 0) return null;

    const { start, end } = computeWindow(headings, activeIdx);
    const windowedHeadings = headings.slice(start, end);
    const highlighted = getHighlightedIndices(headings, activeIdx);

    return (
        <div className={TocLayout({ part: "root" })}>
            <Button
                label=">TOC"
                onClick={() => setIsExpanded((v) => !v)}
                aria={
                    isExpanded
                        ? "Collapse table of contents"
                        : "Expand table of contents"
                }
                className="opacity-60 hover:opacity-100"
                text="brand"
            />

            {isExpanded && (
                <nav
                    aria-label="Table of contents"
                    className={twMerge(
                        TocLayout({ part: "panel" }),
                        TocTheme({ part: "panel" }),
                    )}
                    onMouseEnter={() => setIsMouseOver(true)}
                    onMouseLeave={() => setIsMouseOver(false)}
                    onWheel={(e) => {
                        e.stopPropagation();
                        if (e.deltaY > 0) {
                            if (activeIdx < headings.length - 1)
                                setActiveIdx((prev) => prev + 1);
                        } else if (e.deltaY < 0) {
                            if (activeIdx > 0) setActiveIdx((prev) => prev - 1);
                        }
                    }}
                    onTouchStart={(e) => {
                        setIsMouseOver(true);
                        touchStartYRef.current = e.touches[0].clientY;
                    }}
                    onTouchMove={(e) => {
                        if (touchStartYRef.current === null) return;

                        const currentY = e.touches[0].clientY;
                        const deltaY = touchStartYRef.current - currentY;

                        if (deltaY > 20) {
                            if (activeIdx < headings.length - 1) {
                                setActiveIdx((prev) => prev + 1);
                                touchStartYRef.current = currentY;
                            }
                        } else if (deltaY < -20) {
                            if (activeIdx > 0) {
                                setActiveIdx((prev) => prev - 1);
                                touchStartYRef.current = currentY;
                            }
                        }
                    }}
                    onTouchEnd={() => {
                        setIsMouseOver(false);
                        touchStartYRef.current = null;
                    }}
                >
                    {headings.length > WINDOW_SIZE && (
                        <div className={TocLayout({ part: "scrubber" })}>
                            {headings.map((_, i) => (
                                <div
                                    key={i}
                                    className={TocScrubberPip({
                                        pip:
                                            i === activeIdx
                                                ? "active"
                                                : i >= start && i < end
                                                  ? "inWindow"
                                                  : "outside",
                                    })}
                                />
                            ))}
                        </div>
                    )}

                    {windowedHeadings.map((heading, windowIdx) => {
                        const globalIdx = start + windowIdx;
                        const state = entryState(
                            globalIdx,
                            activeIdx,
                            highlighted,
                        );

                        let textColor: "important" | "primary" | "muted" =
                            "muted";
                        let textFormat: "bold" | "medium" | "none" = "none";

                        if (state === "active") {
                            textColor = "important";
                            textFormat = "bold";
                        } else if (state === "ancestor") {
                            textColor = "primary";
                            textFormat = "medium";
                        }

                        const textProps = {
                            type: "header" as const,
                            level: heading.level,
                            size: "sm" as const,
                            as: "span" as const,
                            color: textColor,
                            formatting: textFormat,
                        };

                        return (
                            <button
                                key={heading.id}
                                onClick={() => {
                                    handleClick(heading, globalIdx);
                                }}
                                title={heading.text}
                                className={twMerge(
                                    TocLayout({ part: "entry" }),
                                    TocEntryIndent({ level: heading.level }),
                                    TocEntryState({ state }),
                                    "active:opacity-100 active:scale-[0.98] transition-transform duration-70",
                                )}
                            >
                                <span
                                    className={TocAccentBar({
                                        level: heading.level,
                                        state,
                                    })}
                                />

                                <Text
                                    {...textProps}
                                    className="truncate tracking-normal text-[11px] leading-snug"
                                >
                                    {heading.text}
                                </Text>
                            </button>
                        );
                    })}

                    {headings.length > WINDOW_SIZE && (
                        <div className={TocLayout({ part: "overflow" })}>
                            <Text
                                type="date"
                                color="muted"
                                className="text-[9px] opacity-40"
                            >
                                {start > 0 ? `↑ ${start} more` : ""}
                            </Text>
                            <Text
                                type="date"
                                color="muted"
                                className="text-[9px] opacity-40"
                            >
                                {end < headings.length
                                    ? `${headings.length - end} more ↓`
                                    : ""}
                            </Text>
                        </div>
                    )}
                </nav>
            )}
        </div>
    );
}
