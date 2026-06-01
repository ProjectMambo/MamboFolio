import React from "react";

import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Manages typography layout systems, defining typographic leading scales, letter spacing,
 * structural content alignments, font family mappings, heading variations, text sizes,
 * and standard font formatting attributes.
 */
const TextLayout = cva("", {
    variants: {
        type: {
            header: "leading-tight tracking-wide font-mono",
            paragraph: "leading-relaxed tracking-normal font-sans text-justify",
            description:
                "leading-normal tracking-normal font-sans text-justify",
            date: "uppercase tabular-nums tracking-wider font-mono",
            time: "uppercase tabular-nums",
            url: "underline underline-offset-2 tracking-normal font-mono break-all",
        },
        level: {
            none: "",
            1: "",
            2: "",
            3: "",
        },
        size: {
            none: "",
            sm: "text-xs md:text-sm",
            md: "text-sm md:text-base",
            lg: "text-base md:text-lg",
            xl: "text-lg md:text-xl",
            xxl: "text-xl md:text-2xl",
        },
        formatting: {
            none: "",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            italics: "italic",
        },
        border: {
            none: "",
            light: "py-1 px-2",
        },
    },
    defaultVariants: {
        type: "paragraph",
        level: "none",
        size: "md",
        formatting: "none",
        border: "none",
    },
});

/**
 * Handles typography color themes, mapping localized semantic design systems,
 * layer opacity filters, and custom contrast highlighting colors across selection events.
 */
const TextTheme = cva("c-transition", {
    variants: {
        border: {
            none: "",
            light: "border border-border",
        },
        bg: {
            none: "",
            light: "bg-bg-surface",
        },
        color: {
            none: "",
            important:
                "text-fg selection:text-crimson-creek selection:bg-wildfire",
            primary:
                "text-fg selection:text-bluestone selection:bg-eucalyptus-smoke",
            secondary:
                "text-fg-muted opacity-80 selection:text-dry-straw selection:bg-spinifex-gold",
            muted: "text-fg-muted opacity-60 selection:text-dry-moss selection:bg-pale-spinifex",
            link: "text-brand hover:text-brand-hover selection:text-berry-bramble selection:bg-dusty-mauve",
        },
    },
    defaultVariants: { border: "none", bg: "none", color: "primary" },
});

/**
 * Fallback translation mapping providing smart semantic structural metadata, sizing rules,
 * weight states, and visual contrast settings for various types of document tokens.
 */
const typeConfig = {
    header_1: {
        tag: "h1",
        defaultSize: "xxl",
        defaultFormatting: "bold",
        defaultColor: "important",
    },
    header_2: {
        tag: "h2",
        defaultSize: "xl",
        defaultFormatting: "semibold",
        defaultColor: "important",
    },
    header_3: {
        tag: "h3",
        defaultSize: "lg",
        defaultFormatting: "medium",
        defaultColor: "important",
    },
    paragraph: {
        tag: "p",
        defaultSize: "md",
        defaultFormatting: "none",
        defaultColor: "primary",
    },
    description: {
        tag: "span",
        defaultSize: "sm",
        defaultFormatting: "none",
        defaultColor: "secondary",
    },
    date: {
        tag: "time",
        defaultSize: "sm",
        defaultFormatting: "none",
        defaultColor: "muted",
    },
    time: {
        tag: "time",
        defaultSize: "sm",
        defaultFormatting: "none",
        defaultColor: "muted",
    },
    url: {
        tag: "a",
        defaultSize: "sm",
        defaultFormatting: "none",
        defaultColor: "link",
    },
} as const;

/**
 * Base design fallbacks used when structural type indicators mismatch expected token arrays.
 */
const defaultConfig = {
    tag: "p",
    defaultSize: "md",
    defaultFormatting: "none",
    defaultColor: "primary",
} as const;

/**
 * Interface representing the properties accepted by the Text component.
 *
 * @interface TextProps
 * @extends {VariantProps<typeof TextLayout>} Inherits configuration variant options ('type', 'level', 'size', 'formatting').
 * @extends {VariantProps<typeof TextTheme>} Inherits font color design properties ('color').
 * @property {string} [label] - Simple text string content passed directly to the typography container.
 * @property {string} [link] - Anchor destination resolved when the structural type resolves to a url token.
 * @property {React.ReactNode} [children] - Complex nested document nodes or sub-components rendered within the block.
 * @property {keyof React.JSX.IntrinsicElements} [as] - Explicit HTML element override tag used to change semantics.
 * @property {string} [className] - Optional custom CSS styles to append to the compiled layout classes.
 */
interface TextProps
    extends VariantProps<typeof TextLayout>, VariantProps<typeof TextTheme> {
    label?: string;
    link?: string;
    children?: React.ReactNode;
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
}

/**
 * A highly adaptive core typography element that handles semantic rendering structures.
 * It matches lookups against design rules to determine smart fallback behaviors for sizes,
 * font weight configurations, and color tokens, while supporting polymorphic tag element overrides.
 *
 * @public
 * @param {TextProps} props - Typography tokens, semantic overrides, interactive classes, and string structures.
 * @param {string} [props.label] - Inline layout string evaluated when explicit sub-elements are omitted.
 * @param {string} [link] - Anchor destination resolved when the structural type resolves to a url token.
 * @param {React.ReactNode} [props.children] - Main document trees or rich formatting elements inside the container.
 * @param {keyof React.JSX.IntrinsicElements} [props.as] - Explicit semantic HTML tag override to handle custom layout needs.
 * @param {string} [props.className] - Dynamic class chains combined into the wrapper element via tailwind-merge.
 * @param {"paragraph" | "header" | "description" | "date" | "time" | "url"} [props.type="paragraph"] - The structural layout intent.
 * @param {"none" | "1" | "2" | "3"} [props.level="none"] - Structural heading depth levels used for resolving complex headers.
 * @param {"none" | "sm" | "md" | "lg" | "xl" | "xxl"} [props.size] - Specific responsive text resizing rule overrides.
 * @param {"none" | "medium" | "semibold" | "bold" | "italics"} [props.formatting] - Layout font weight and typography design additions.
 * @param {"none" | "important" | "primary" | "secondary" | "muted"} [props.color] - Selection colors and color system targets.
 * @returns {JSX.Element} A polymorphically bounded typographic container rendering safe text tokens.
 */
export default function Text({
    label,
    link,
    children,
    as,
    className,
    type,
    level,
    size,
    formatting,
    color,
    border,
    bg,
}: TextProps) {
    const lookupKey =
        type === "header" && level !== "none" ? `${type}_${level}` : type;

    const {
        tag: Tag,
        defaultSize,
        defaultFormatting,
        defaultColor,
    } = typeConfig[lookupKey as keyof typeof typeConfig] ?? defaultConfig;

    const FinalTag = as ?? Tag;
    const finalSize = size ?? defaultSize;
    const finalFormatting = formatting ?? defaultFormatting;
    const finalColor = color ?? defaultColor;

    const combined = twMerge(
        TextLayout({
            type,
            size: finalSize,
            level,
            formatting: finalFormatting,
            border,
        }),
        TextTheme({ border, bg, color: finalColor }),
        className,
    );

    const anchorProps =
        FinalTag === "a"
            ? { href: link, target: "_blank", rel: "noopener noreferrer" }
            : {};

    return (
        <FinalTag className={combined} {...anchorProps}>
            {children ?? label}
        </FinalTag>
    );
}
