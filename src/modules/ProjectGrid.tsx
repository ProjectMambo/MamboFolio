import ProjectCard from "@/components/entry/ProjectCard";
import { LabelLinkDes } from "@/components/Interfaces";

interface GridProjectItem {
    project: LabelLinkDes;
    colour: string;
}

interface ProjectGridProps {
    items: GridProjectItem[];
}

/**
 * Grid matrix that handles media breakpoints automatically to realign children across responsive platforms.
 */
export default function ProjectGrid({ items }: ProjectGridProps) {
    const base = ["grid grid-cols-1 gap-6"].join(" ");
    const small = ["sm:grid-cols-2"].join("");
    const medium = ["md:grid-cols-3"].join("");
    const large = ["lg:grid-cols-3"].join("");

    return (
        /* Grid layout configurations: 1 col mobile, 2 col tablet, 3 col desktop panels */
        <section className={`${base} ${small} ${medium} ${large}`}>
            {items.map((item) => (
                <ProjectCard
                    key={item.project.link}
                    project={item.project}
                    colour={item.colour}
                />
            ))}
        </section>
    );
}
