import { cva, type VariantProps } from "class-variance-authority";

import Card from "@/components/Card";

import { Entry } from "@/components/Interfaces";

/**
 * Structural type enforcement ensuring project items provide explicit navigational
 * routing paths and complementary description summaries.
 */
type Project = Entry & Required<Pick<Entry, "link" | "description">>;

/**
 * Structural type enforcement ensuring blog entries provide explicit navigational
 * routing paths, summary statements, and calendar date properties.
 */
type Blog = Entry & Required<Pick<Entry, "link" | "description" | "date">>;

/**
 * Controls structural layout display configurations, shifting between vertical stacking
 * patterns or responsive multi-column layout matrices based on design system rules.
 */
const CardLayout = cva("w-full", {
    variants: {
        view: {
            list: "flex flex-col",
            grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3",
        },
    },
    defaultVariants: {
        view: "list",
    },
});

/**
 * Interface representing the properties accepted by the CardView component.
 *
 * @interface CardViewProps
 * @extends {VariantProps<typeof CardLayout>} Inherits configuration variant choices ('view').
 * @property {Project[] | Blog[]} cardItems - Homogeneous collection of either validated project profiles or blog objects.
 */
interface CardViewProps extends VariantProps<typeof CardLayout> {
    cardItems: Project[] | Blog[];
}

/**
 * A layout manager component that dynamically formats collections of data records.
 * It iterates over uniform items, relies on internal type inspections to isolate variable data properties,
 * and synchronizes sub-component styling parameters to match active display presentations.
 *
 * @public
 * @param {CardViewProps} props - Layout arrangements and structured data records for the display viewport.
 * @param {Project[] | Blog[]} props.cardItems - Datasets targeted for conversion into separate content cards.
 * @param {"list" | "grid"} [props.view="list"] - Layout approach driving geometric organization rules.
 * @returns {JSX.Element} A structured section element encapsulating child view primitives matching selected presentation rules.
 */
export default function CardView({ cardItems, view }: CardViewProps) {
    return (
        <section className={CardLayout({ view: view })}>
            {cardItems.map((item) => {
                const itemDate = "date" in item ? item.date : undefined;
                const itemColor = "color" in item ? item.color : undefined;

                return (
                    <Card
                        view={view}
                        key={`${item.label}-${item.link}`}
                        label={item.label}
                        link={item.link}
                        color={itemColor}
                        description={item.description}
                        date={itemDate}
                        border={view == "list" ? "none" : undefined}
                    />
                );
            })}
        </section>
    );
}
