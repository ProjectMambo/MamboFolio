"use client";

import { useLayoutEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

import { getContrastColor } from "@/utils/contrastColor";

/**
 * Manages foundational dimensions, matching aspect ratios, typography configurations,
 * and standard responsive padding scale increments for the Canvas bounding container.
 */
const CanvasStyles = cva(
    [
        "w-full aspect-square",
        "font-bold font-mono uppercase",
        "flex items-center justify-center",
        "selection:bg-transparent",
        "c-transition",
    ].join(" "),
    {
        variants: {
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
            size: "lg",
        },
    },
);

/**
 * Interface representing the properties accepted by the Canvas component.
 *
 * @interface CanvasProps
 * @extends {VariantProps<typeof CanvasStyles>} Inherits style variant options ('size').
 * @property {string} label - The central text content string displayed inside the layout primitive.
 * @property {string} color - The core background color string applied to the canvas area.
 * @property {string} [className] - Optional additional CSS class names to adjust or extend base layout styles.
 */
interface CanvasProps extends VariantProps<typeof CanvasStyles> {
    label: string;
    color: string;
    className?: string;
}

/**
 * A client-rendered layout block that sets an explicit aspect-square background canvas.
 * It mutates its own style attributes during the browser layout phase to dynamically update
 * and enforce a high-contrast legible font color based on the provided background color value.
 *
 * @public
 * @param {CanvasProps} props - The content metrics, accessibility overrides, and dimensions for the Canvas view.
 * @param {string} props.label - Raw descriptive text content mapped inside the container center.
 * @param {string} props.color - CSS valid background color sequence used to determine internal contrast properties.
 * @param {string} [props.className] - Extra Tailwind styling descriptors compiled onto the wrapper element.
 * @param {"sm" | "md" | "lg"} [props.size="lg"] - Configured responsive text scaling rules and structural padding metrics.
 * @returns {JSX.Element} A color-locked container rendering dynamic high-contrast accessible text blocks.
 */
export default function Canvas({ label, color, className, size }: CanvasProps) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            const contrastColor = getContrastColor(color);

            ref.current.style.setProperty("color", contrastColor, "important");
        }
    }, [color]);

    return (
        <div
            ref={ref}
            className={twMerge(CanvasStyles({ size }), className)}
            style={{ backgroundColor: color }}
        >
            {label}
        </div>
    );
}
