import ProjectGrid from "@/modules/ProjectGrid";

export default function Home() {
    // Keep data structures easy to expand, modify, or fetch from endpoints later
    const personalFleet = [
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
                label: "MamboColour",
                link: "https://github.com/ProjectMambo/MamboColour",
                description: "Colour palette for Project Mambo designs",
            },
            colour: "var(--color-deep-teal)",
        },
        {
            project: {
                label: "MamboSite",
                link: "https://github.com/ProjectMambo/MamboSite",
                description: "Wiki for Project Mambo",
            },
            colour: "var(--color-baked-brick)",
        },
        {
            project: {
                label: "MamboFolio",
                link: "https://github.com/ProjectMambo/MamboFolio",
                description: "Owner's portfolio",
            },
            colour: "var(--color-charred-root)",
        },
        {
            project: {
                label: "MamboFont",
                link: "https://github.com/ProjectMambo/MamboFont",
                description: "Font & Icons for Project Mambo designs",
            },
            colour: "var(--color-dusk-shadow)",
        },
    ];

    return (
        <main className="min-h-screen bg-bg text-fg p-8 md:p-16 font-mono max-w-5xl mx-auto">
            {/* The single, declarative grid cluster module */}
            <ProjectGrid items={personalFleet} />
        </main>
    );
}
