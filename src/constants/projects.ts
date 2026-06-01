import { Entry } from "@/components/Interfaces";

/**
 * Static configuration dataset representing a curated manifest of engineering and design projects.
 * * Defines an immutable, read-only collection that drives the layout showcase components,
 * explicitly enforcing structural schema alignment with the base Entry contract.
 */
export const projectConfig = [
    {
        label: "Project Mambo",
        link: "/project/project-mambo?from=home",
        description:
            "A design-driven ecosystem of optimized Unix configurations, unified palettes, and automated dotfile deployment architectures.",
        color: "var(--color-shale-green)",
    },
    {
        label: "MamboDot",
        link: "/project/mambodot?from=home",
        description:
            "A GNU Stow-managed dotfiles repository optimised for speed and consistent styling.",
        color: "var(--color-apricot-dust)",
    },
    {
        label: "MamboFolio",
        link: "/project/mambofolio?from=home",
        description:
            "A responsive portfolio website built with Next.js and Tailwind CSS.",
        color: "var(--color-charred-root)",
    },
    {
        label: "Cod",
        link: "/project/cod?from=home",
        description: "Orbital 26 project",
        color: "var(--color-outback-sky)",
    },
    {
        label: "Pitcher",
        link: "/project/pitcher?from=home",
        description: "A simple voice-controlled platformer game.",
        color: "var(--color-ember-glow)",
    },
    {
        label: "MamboColour",
        link: "/project/mambocolour?from=home",
        description:
            "A modern and premium colour palette collection with parsers for different use case.",
        color: "var(--color-deep-teal)",
    },
    {
        label: "MamboSite",
        link: "/project/mambosite?from=home",
        description:
            "A responsive project wiki built with Next.js and Tailwind CSS.",
        color: "var(--color-baked-brick)",
    },
    {
        label: "MamboFont",
        link: "/project/mambofont?from=home",
        description: "A modern font designed for consistent layout.",
        color: "var(--color-dusk-shadow)",
    },
] as const satisfies Entry[];
