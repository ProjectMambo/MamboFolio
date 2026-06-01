import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Manages spatial geometry configurations, matching structural layout directions,
 * explicit border visibility rules, and contextual matrix spacing combinations via compound rules.
 */
const DividerStyles = cva("self-stretch c-transition border", {
    variants: {
        orientation: {
            horizontal: "w-auto",
            vertical: "h-auto",
        },
        border: {
            static: "border-border",
            muted: "border-transparent group-hover:border-border group-active:border-border",
            light: "border-border group-hover:border-comment group-active:border-comment",
        },
        margin: {
            none: "m-0",
            sm: "",
            md: "",
        },
    },
    compoundVariants: [
        { orientation: "vertical", margin: "sm", className: "mx-1.5" },
        { orientation: "vertical", margin: "md", className: "mx-3" },

        { orientation: "horizontal", margin: "sm", className: "my-1.5" },
        { orientation: "horizontal", margin: "md", className: "my-3" },
    ],
    defaultVariants: {
        orientation: "vertical",
        border: "light",
        margin: "sm",
    },
});

/**
 * Interface representing the properties accepted by the Divider component.
 *
 * @interface DividerProps
 * @extends {VariantProps<typeof DividerStyles>} Inherits variation controls ('orientation', 'border', 'margin').
 * @property {string} [className] - Optional explicit styling overrides combined down into the target layout node.
 */
interface DividerProps extends VariantProps<typeof DividerStyles> {
    className?: string;
}

/**
 * A layout primitive that handles layout boundaries between adjacent design modules.
 * It reads parent grid/flex contexts to stretch efficiently, resolving margins via
 * compound variants while matching hover states of outer container groups.
 *
 * @public
 * @param {DividerProps} props - Layout boundaries, dimension settings, and color values for the structural row line.
 * @param {"horizontal" | "vertical"} [props.orientation="vertical"] - Structural alignment rule defining layout dimensions.
 * @param {"static" | "muted" | "light"} [props.border="light"] - Interactive border visibility rules applied to local assets.
 * @param {"none" | "sm" | "md"} [props.margin="sm"] - Base spacing configurations used to apply custom axis margins.
 * @param {string} [props.className] - Dynamic class chains mixed to final container strings via tailwind-merge.
 * @returns {JSX.Element} A clean layout separating node adapting to enclosing directional components.
 */
export default function Divider({
    orientation,
    border,
    margin,
    className,
}: DividerProps) {
    return (
        <div
            className={twMerge(
                DividerStyles({ orientation, border, margin }),
                className,
            )}
        />
    );
}
