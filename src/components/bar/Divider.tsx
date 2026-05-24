interface DividerProps {
    /** The border style variant from your design system utility engine. Defaults to "static". */
    variant?: "static" | "normal";
    /** Controls the axis of the divider line. Defaults to "vertical". */
    orientation?: "horizontal" | "vertical";
    hasMargin?: boolean;
}

/**
 * Micro-spacer pipe module providing consistent layout margins inside navigation and list groups.
 */
export default function Divider({
    variant = "static",
    orientation = "vertical",
    hasMargin = true,
}: DividerProps) {
    const isVertical = orientation === "vertical";

    const base = [
        isVertical ? "w-0 self-stretch" : "h-0 self-stretch",
        hasMargin ? (isVertical ? "mx-1.5" : "my-1.5") : "",
        `c-border-${variant}`,
        "c-transition",
    ].join(" ");

    return <div className={base} />;
}
