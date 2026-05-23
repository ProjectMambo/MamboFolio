import ProjectGrid from "@/modules/ProjectGrid";

export default function Home() {
    const projectList = [
        {
            project: {
                label: "Project Mambo",
                link: "/project/project-mambo?from=home",
                description: "A design-driven ecosystem of optimized Unix configurations, unified palettes, and automated dotfile deployment architectures.",
            },
            colour: "var(--color-shale-green)",
        },
        {
            project: {
                label: "MamboDot",
                link: "/project/mambodot?from=home",
                description:
                    "A GNU Stow-managed dotfiles repository optimised for speed and consistent styling.",
            },
            colour: "var(--color-apricot-dust)",
        },
        {
            project: {
                label: "MamboFolio",
                link: "/project/mambofolio?from=home",
                description: "A responsive portfolio website built with Next.js and Tailwind CSS.",
            },
            colour: "var(--color-charred-root)",
        },
        {
            project: {
                label: "MamboColour",
                link: "/project/mambocolour?from=home",
                description: "A modern and premium colour palette collection with parsers for different use case.",
            },
            colour: "var(--color-deep-teal)",
        },
        {
            project: {
                label: "MamboSite",
                link: "/project/mambosite?from=home",
                description: "A responsive project wiki built with Next.js and Tailwind CSS.",
            },
            colour: "var(--color-baked-brick)",
        },
        {
            project: {
                label: "MamboFont",
                link: "/project/mambofont?from=home",
                description: "A modern font designed for consistent layout.",
            },
            colour: "var(--color-dusk-shadow)",
        },
        {
            project: {
                label: "Pitcher",
                link: "/project/pitcher?from=home",
                description: "A simple voice-controlled platformer game.",
            },
            colour: "var(--color-ember-glow)",
        },
    ];

    return (
        <main className="min-h-screen bg-bg text-fg p-8 md:p-16 font-mono max-w-5xl mx-auto">
            {/* The single, declarative grid cluster module */}
            <ProjectGrid items={projectList} />
        </main>
    );
}
