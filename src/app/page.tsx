import ProjectGrid from "@/modules/ProjectGrid";
import BlogList from "@/modules/BlogList";
import NavButton from "@/components/NavButton";
import Heading from "@/components/Heading";

export default function Home() {
    // Keep data structures easy to expand, modify, or fetch from endpoints later
    const projectList = [
        {
            project: {
                label: "Project Mambo",
                link: "https://projectmambo.org",
                description: "A series of stuff.",
            },
            colour: "var(--color-shale-green)",
        },
        {
            project: {
                label: "MamboDot",
                link: "https://github.com/ProjectMambo/MamboDot",
                description:
                    "A GNU Stow-managed dotfiles repository optimised for speed and consistent styling.",
            },
            colour: "var(--color-apricot-dust)",
        },
        {
            project: {
                label: "MamboFolio",
                link: "https://github.com/ProjectMambo/MamboFolio",
                description: "Owner's portfolio",
            },
            colour: "var(--color-charred-root)",
        },
    ];

    const blogList = [
        {
            blog: {
                label: "MamboFolio",
                link: "https://github.com/ProjectMambo/MamboFolio",
                description: "Owner's portfolio",
                date: "20-05-2026",
            },
        },
        {
            blog: {
                label: "test",
                link: "https://github.com/ProjectMambo/test",
                description: "Owner's portfolio",
                date: "20-05-2026",
            },
        },
        {
            blog: {
                label: "test2",
                link: "https://github.com/ProjectMambo/test22",
                description: "tset",
                date: "20May2026",
            },
        },
    ];

    return (
        <main className="min-h-screen bg-bg text-fg p-8 md:p-16 font-mono max-w-5xl mx-auto flex flex-col gap-y-5">
            {/* The single, declarative grid cluster module */}
            <Heading title="Project" level="h1" />
            <ProjectGrid items={projectList} />
            <div className="flex justify-center py-px">
                <NavButton
                    button={{ label: "See More", link: "/project" }}
                    defaultBorder={true}
                />
            </div>

            <Heading title="Blog" level="h1" />
            <BlogList items={blogList} />
            <div className="flex justify-center py-px">
                <NavButton
                    button={{ label: "See More", link: "/blog" }}
                    defaultBorder={true}
                />
            </div>
        </main>
    );
}
