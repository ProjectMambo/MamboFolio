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
 * Structural type enforcement ensuring contact entries provide explicit navigational
 * routing paths and canvas label.
 */
type Contact = Entry & Required<Pick<Entry, "link">>;

/**
 * Controls structural layout display configurations, shifting between vertical stacking
 * patterns or responsive multi-column layout matrices based on design system rules.
 * The meta variant is grid-exclusive and controls canvas header visibility;
 * it carries no structural effect in list display orientations.
 * Entry density variants are exclusively applied within grid contexts and have no effect
 * on list display orientations.
 */
const CardLayout = cva("w-full", {
    variants: {
        view: {
            list: "flex flex-col",
            grid: "grid",
        },
        meta: {
            show: "",
            hide: "",
        },
        entry: {
            normal: "",
            compact: "",
        },
    },
    compoundVariants: [
        {
            view: "grid",
            entry: "normal",
            className: "gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        },
        {
            view: "grid",
            entry: "compact",
            className: "gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
        },
    ],
    defaultVariants: {
        view: "list",
        meta: "show",
        entry: "normal",
    },
});

/**
 * Interface representing the properties accepted by the CardView component.
 *
 * @interface CardViewProps
 * @extends {VariantProps<typeof CardLayout>} Inherits configuration variant choices ('view').
 * @property {Project[] | Blog[] | Contact[]} cardItems - Homogeneous collection of either validated project profiles, blog objects, or contact cards.
 */
interface CardViewProps extends VariantProps<typeof CardLayout> {
    cardItems: Project[] | Blog[] | Contact[];
}

/**
 * A layout manager component that dynamically formats collections of data records.
 * It iterates over uniform items, relies on internal type inspections to isolate variable data properties,
 * and synchronizes sub-component styling parameters to match active display presentations.
 *
 * @public
 * @param {CardViewProps} props - Layout arrangements and structured data records for the display viewport.
 * @param {Project[] | Blog[] | Contact[]} props.cardItems - Datasets targeted for conversion into separate content cards.
 * @param {"list" | "grid"} [props.view="list"] - Layout approach driving geometric organization rules.
 * @param {"show" | "hide"} [props.meta="show"] - Grid-exclusive metadata banner toggle. Hides the metadata block banner when set to hide.
 * @param {"normal" | "compact"} [props.entry="normal"] - Grid-exclusive density configuration controlling column counts and gap spacing. Has no effect in list view.
 * @returns {JSX.Element} A structured section element encapsulating child view primitives matching selected presentation rules.
 */
export default function CardView({
    cardItems,
    view,
    meta = "show",
    entry,
}: CardViewProps) {
    return (
        <section className={CardLayout({ view, meta, entry })}>
            {cardItems.map((item) => {
                const itemDate = "date" in item ? item.date : undefined;
                const itemColor = "color" in item ? item.color : undefined;
                const itemDescription =
                    "description" in item ? item.description : undefined;

                return (
                    <Card
                        view={view}
                        meta={meta}
                        key={`${item.label}-${item.link}`}
                        label={item.label}
                        link={item.link}
                        color={itemColor}
                        description={itemDescription}
                        date={itemDate}
                        border={view == "list" ? "none" : undefined}
                    />
                );
            })}
        </section>
    );
}
