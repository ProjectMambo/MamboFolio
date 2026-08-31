import { Entry } from "@/components/Interfaces";

/**
 * Static configuration dataset representing a curated manifest of engineering and design projects.
 * * Defines an immutable, read-only collection that drives the layout showcase components,
 * explicitly enforcing structural schema alignment with the base Entry contract.
 */
export const projectConfig = [
    {
        label: "Project Mambo",
        link: "/project/project-mambo",
        description:
            "A design-driven ecosystem of optimized Unix configurations, unified palettes, and automated dotfile deployment architectures.",
        color: "var(--color-shale-green)",
    },
    {
        label: "MamboDot",
        link: "/project/mambodot",
        description:
            "A GNU Stow-managed dotfiles repository optimised for speed and consistent styling.",
        color: "var(--color-apricot-dust)",
    },
    {
        label: "MamboFinance",
        link: "/project/mambofinance",
        description:
            "A lightweight, privacy-focused financial dashboard for effortless expense tracking and budgeting.",
        color: "var(--color-desert-sage)",
    },
    {
        label: "Cod",
        link: "/project/cod",
        description: "Orbital 26 project",
        color: "var(--color-outback-sky)",
    },
    {
        label: "Pitcher",
        link: "/project/pitcher",
        description: "A simple voice-controlled platformer game.",
        color: "var(--color-ember-glow)",
    },
    {
        label: "MamboFont",
        link: "/project/mambofont",
        description: "A modern font designed for consistent layout.",
        color: "var(--color-dusk-shadow)",
    },
    {
        label: "MamboColour",
        link: "/project/mambocolour",
        description:
            "A modern and premium colour palette collection with parsers for different use case.",
        color: "var(--color-deep-teal)",
    },
    {
        label: "MamboFolio",
        link: "/project/mambofolio",
        description:
            "A responsive portfolio website built with Next.js and Tailwind CSS.",
        color: "var(--color-charred-root)",
    },
    {
        label: "MamboSite",
        link: "/project/mambosite",
        description:
            "A responsive project wiki built with Next.js and Tailwind CSS.",
        color: "var(--color-baked-brick)",
    },
] as const satisfies Entry[];
