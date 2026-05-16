import ProjectCard from "@/components/ProjectCard";
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
    return (
        /* Grid layout configurations: 1 col mobile, 2 col tablet, 3 col desktop panels */
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
