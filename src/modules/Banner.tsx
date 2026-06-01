import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

import Image, { StaticImageData } from "next/image";
import Text from "@/components/Text";

/**
 * Manages foundational structural layout parameters, maintaining standard aspect video proportions,
 * container child centering rules, and dynamic grid flex stacking modifications across target viewports.
 */
const BannerLayout = cva(
    [
        "w-full aspect-video",
        "flex flex-col gap-4 items-center justify-center",
        "c-transition",
    ].join(" "),
    {
        variants: {
            stack: {
                always: "",
                sm: "sm:flex-row sm:gap-8",
                md: "md:flex-row md:gap-8",
                lg: "lg:flex-row lg:gap-8",
                xl: "xl:flex-row xl:gap-8",
            },
        },
        defaultVariants: { stack: "md" },
    },
);

/**
 * Interface representing the properties accepted by the Banner component.
 *
 * @interface BannerProps
 * @extends {VariantProps<typeof BannerLayout>} Inherits structural column stacking variant choices ('stack').
 * @property {string | StaticImageData} src - Asset reference string or static layout import object passed to Next.js Image.
 * @property {string} alt - Accessibility alternative text targeting screen reader arrays.
 * @property {string} header - Primary focus text string displayed as the main title asset.
 * @property {string} paragraph - Secondary descriptive subtext providing content depth or summaries.
 * @property {string} paragraph - Tertiary subtext providing additional information.
 */
interface BannerProps extends VariantProps<typeof BannerLayout> {
    src: string | StaticImageData;
    alt: string;
    header: string;
    paragraph: string;
    footer: string;
}

/**
 * A highly structural master presentation block that places visual media assets adjacent
 * to dynamic context-optimized text fields. It controls image scaling profiles while handling
 * viewport transformation changes to match responsive screen layouts.
 *
 * @public
 * @param {BannerProps} props - Graphic resources, text elements, and directional parameters for the presentation layout.
 * @param {string | StaticImageData} props.src - Target source material forwarded to optimization engine components.
 * @param {string} props.alt - Accessibility label descriptions paired with image structures.
 * @param {string} props.header - Bold heading message text target mapped to top elements.
 * @param {string} props.paragraph - Context string snippet rendered as structural paragraph text.
 * @param {string} props.footer - Tertiary subtext providing additional information.
 * @param {"always" | "sm" | "md" | "lg" | "xl"} [props.stack="md"] - Viewport breaking rules governing flex layout orientation transformations.
 * @returns {JSX.Element} A coordinated interface banner block housing optimized imagery and textual segments.
 */
export default function Banner({
    src,
    alt,
    header,
    paragraph,
    footer,
    stack,
}: BannerProps) {
    const combined = twMerge(BannerLayout({ stack }));
    return (
        <div className={combined}>
            <Image
                src={src}
                alt={alt}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-48 md:h-64 lg:h-80 shrink-0 object-contain border-2 border-brand"
            />
            <div className="flex flex-col gap-2 min-w-0 max-w-md lg:max-w-xl md:mr-10">
                <Text label={header} type="header" level={1} />
                <Text
                    label={paragraph}
                    type="paragraph"
                    size="lg"
                    className="wrap-break-word whitespace-normal"
                />
                <Text
                    label={footer}
                    type="paragraph"
                    size="md"
                    formatting="semibold"
                    className="wrap-break-word whitespace-normal ml-4"
                />
            </div>
        </div>
    );
}
