"use client";

import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

import Text from "@/components/Text";
import Divider from "@/components/Divider";
import { useDateTime } from "@/hooks/useDateTime";

/**
 * Defines the design system variants, responsive scaling rules,
 * and style states for the Clock component using `class-variance-authority`.
 */
export const ClockStyles = cva(
    [
        "group px-3",
        "font-bold font-mono tracking-widest",
        "shrink-0 flex items-center justify-between",
        "c-transition",
    ].join(" "),
    {
        variants: {
            text: {
                light: "text-fg-muted hover:text-fg",
                dark: "text-fg hover:text-brand",
            },
            size: {
                sm: [
                    "text-xs pt-1 px-2 py-0.5",
                    "md:text-sm md:pt-1.5 md:px-3 md:py-1",
                    "lg:text-base lg:pt-2 lg:px-4 lg:py-2",
                ].join(" "),
                md: [
                    "text-sm pt-1.5 px-3 py-1",
                    "md:text-base md:pt-2 md:px-4 md:py-2",
                    "lg:text-lg lg:pt-2.5 lg:px-5 lg:py-2.5",
                ].join(" "),
                lg: [
                    "text-base pt-2 px-4 py-2",
                    "md:text-lg md:pt-2.5 md:px-5 md:py-2.5",
                    "lg:text-xl lg:pt-3 lg:px-6 lg:py-3",
                ].join(" "),
            },
        },
        defaultVariants: {
            text: "light",
            size: "sm",
        },
    },
);

/**
 * Interface representing the properties accepted by the Clock component.
 *
 * @interface ClockProps
 * @extends {VariantProps<typeof ClockStyles>} Inherits style variant options ('text' and 'size').
 * @property {string} [className] - Optional additional CSS class names to override or extend base styles.
 */
interface ClockProps extends VariantProps<typeof ClockStyles> {
    className?: string;
}

/**
 * A client-side component that renders a synchronized date and time display.
 * It leverages a custom hook to fetch platform time and dynamically scales
 * responsively based on the provided style props.
 *
 * @public
 * @param {ClockProps} props - The configuration and styling options for the Clock component.
 * @param {"light" | "dark"} [props.text="light"] - The color theme variant for the text.
 * @param {"sm" | "md" | "lg"} [props.size="sm"] - The responsive size configuration mapping.
 * @param {string} [props.className] - Extra Tailwind classes to apply to the root wrapper.
 * @returns {JSX.Element | null} A responsive container displaying formatted date and time subcomponents,
 * or `null` if the system time strings have not yet initialized.
 */
export default function Clock({ text, size, className }: ClockProps) {
    const { timeStr, dateStr } = useDateTime();

    if (!timeStr || !dateStr) {
        return null;
    }

    return (
        <div className={twMerge(ClockStyles({ text, size }), className)}>
            <Text label={dateStr} type="date" size="none" color="primary" />
            <Divider margin="md" border="static" />
            <Text label={timeStr} type="time" size="none" color="primary" />
        </div>
    );
}
