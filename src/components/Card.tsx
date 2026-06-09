import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

import Link from "next/link";
import Image from "next/image";
import Text from "@/components/Text";
import Divider from "@/components/Divider";
import Canvas from "@/components/Canvas";
import { isExternalLink } from "@/utils/linkChecker";

/**
 * Manages foundational structural dimensions, flex alignments, and distinct layout
 * behaviors mapping to grid boxes or vertical list layout sequences.
 * The meta variant is grid-exclusive and controls canvas header visibility;
 * it carries no structural effect in list display orientations.
 */
const CardLayout = cva(
    [
        "group block",
        "font-mono w-full",
        "flex flex-col items-stretch",
        "c-transition",
    ].join(" "),
    {
        variants: {
            view: {
                grid: "border-2",
                list: "border-t-2 border-l-2 border-r-2",
            },
            meta: {
                show: "",
                hide: "",
            },
        },
        defaultVariants: { view: "grid", meta: "show" },
    },
);

/**
 * Handles container design system tokens, defining interactive border tracking,
 * background surfaces, and standard font color configurations during hover cycles.
 */
const CardTheme = cva("cursor-pointer", {
    variants: {
        border: {
            none: "border-transparent hover:border-transparent active:border-transparent",
            muted: "border-transparent hover:border-border active:border-border",
            light: "border-border hover:border-comment active:border-comment",
        },
        bg: {
            none: "bg-transparent hover:bg-transparent active:bg-transparent",
            muted: "bg-transparent hover:bg-bg-surface active:bg-bg-surface",
            light: "bg-bg-surface hover:bg-border-65 active:bg-border-65",
        },
        text: {
            muted: "text-fg/0 hover:text-brand active:text-brand tracking-wide",
            light: "text-fg-muted hover:text-fg active:text-fg",
            dark: "text-fg hover:text-brand active:text-brand",
        },
    },
    defaultVariants: { border: "light", bg: "light", text: "dark" },
});

/**
 * Interface representing the properties accepted by the Card component.
 *
 * @interface CardProps
 * @extends {VariantProps<typeof CardLayout>} Inherits layout variant options ('view').
 * @extends {VariantProps<typeof CardTheme>} Inherits aesthetic theme choices ('border', 'bg', 'text').
 * @property {string} label - The main structural headline text displayed on the component.
 * @property {string} link - Navigation route string or external URL. Internal paths use Next.js Link; external URLs render as anchor tags with safe rel attributes.
 * @property {string} [image] - Optional path to a public folder image displayed in place of the Canvas block in grid view.
 * @property {string} [description] - Extended summary or body text snippet.
 * @property {string} [date] - Chronological context display string.
 * @property {string} [color] - Custom backing paint code provided to the internal decoration Canvas.
 * @property {"sm" | "md" | "lg"} [size] - Layout scale indicator explicitly linked to Canvas variant options.
 * @property {string} [className] - Optional custom styles blended into the compiled Tailwind output stack.
 */
interface CardProps
    extends VariantProps<typeof CardLayout>, VariantProps<typeof CardTheme> {
    label: string;
    link: string;
    image?: string;
    description?: string;
    date?: string;
    color?: string;
    // 💡 FIX: Explicitly type this to match the allowed Canvas layout options
    size?: "sm" | "md" | "lg";
    className?: string;
}

/**
 * A highly adaptive promotional link wrapper component that switches its internal document structures,
 * header placement blocks, text boundary clamp restrictions, and dividers based on standard layout display viewports.
 *
 * @public
 * @param {CardProps} props - Layout controls, navigational targets, and descriptive text fields for the Card element.
 * @param {string} props.label - Primary header information passed to the card interface.
 * @param {string} link - Navigation route string or external URL. Internal paths use Next.js Link; external URLs render as anchor tags with safe rel attributes.
 * @param {string} [image] - Optional path to a public folder image displayed in place of the Canvas block in grid view.
 * @param {string} [props.description] - Complementary summary string restricted via responsive layout clamps.
 * @param {string} [props.date] - Optional timeline stamp targeting the core sub-components.
 * @param {string} [props.color] - Custom theme identifier fallbacks parsed when building deep design backgrounds.
 * @param {"sm" | "md" | "lg"} [props.size="lg"] - Sizing parameter controlling internal background decoration parameters with an explicit fallback logic layer.
 * @param {string} [props.className] - Override styling tags combined into the parent block element.
 * @param {"grid" | "list"} [props.view="grid"] - Layout strategy altering item dividers and content placement rules.
 * @param {"show" | "hide"} [props.meta="show"] - Grid-exclusive metadata banner toggle. Hides the metadata block banner when set to hide.
 * @param {"light" | "muted" | "none"} [props.border="light"] - Boundary outline configurations managing state changes.
 * @param {"light" | "muted" | "none"} [props.bg="light"] - Layer background theme configurations.
 * @param {"dark" | "light" | "muted"} [props.text="dark"] - Font variant system color parameters.
 * @returns {JSX.Element} A structured navigational component encapsulating title blocks, media targets, and data fragments.
 */
export default function Card({
    label,
    link,
    image,
    description,
    date,
    color,
    size = "lg", // 💡 FIX: Handles the "lg" fallback default cleanly at the destructuring level
    className,
    view,
    meta,
    border,
    bg,
    text,
}: CardProps) {
    const showMeta = view === "list" || meta === "show";
    const combined = twMerge(
        CardLayout({ view, meta }),
        CardTheme({ border, bg, text }),
        className,
    );
    const canvasColor = color ? color : "var(--color-brand)";
    const isExternal = isExternalLink(link);

    const viewConfig = {
        grid: {
            clamp: "line-clamp-2",
            header: (
                <div className="">
                    {image ? (
                        <div className="relative w-full aspect-square">
                            <Image
                                src={image}
                                alt={label}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <Canvas
                            label={date || label.substring(0, 15)}
                            color={canvasColor}
                            size={size}
                        />
                    )}
                    {showMeta ? (
                        <Divider orientation="horizontal" margin="none" />
                    ) : null}
                </div>
            ),
            footer: null,
        },
        list: {
            clamp: "line-clamp-1",
            header: null,
            footer: <Divider orientation="horizontal" margin="none" />,
        },
    };

    const active =
        viewConfig[view as keyof typeof viewConfig] || viewConfig.list;

    const inner = (
        <>
            {active.header}
            {showMeta ? (
                <div className="flex flex-col w-full px-3 py-3 pt-4">
                    {view !== "grid" && date && (
                        <Text label={date} type="date" />
                    )}
                    <Text
                        label={label}
                        className="selection:text-crimson-creek selection:bg-wildfire"
                        type="header"
                        level={2}
                        color="none"
                    />
                    {description && (
                        <Text
                            label={description}
                            className={`${active.clamp} [hyphens:none]`}
                            type="description"
                            size="md"
                        />
                    )}
                </div>
            ) : null}
            {active.footer}
        </>
    );

    if (isExternal) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={combined}
            >
                {inner}
            </a>
        );
    }

    return (
        <Link href={link} className={combined}>
            {inner}
        </Link>
    );
}
