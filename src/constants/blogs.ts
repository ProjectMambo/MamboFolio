import { Entry } from "@/components/Interfaces";

/**
 * Static configuration collection representing the structured list of blog entries
 * rendered within the platform application routing modules.
 * * Defines a strongly-typed, read-only manifest conforming to the base Entry blueprint.
 */
export const blogConfig = [
    {
        label: "Start of MamboFont",
        link: "/blog/start-of-mambofont",
        description: "Site has migrated to MamboFont",
        date: "10 June 2026",
    },
    {
        label: "The Beningging",
        link: "/blog/the-beningging",
        description: "In the beningging... In the... In the bening... In the beningging",
        date: "01 June 2026",
    },
] as const satisfies Entry[];
