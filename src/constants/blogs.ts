import { Entry } from "@/components/Interfaces";

/**
 * Static configuration collection representing the structured list of blog entries
 * rendered within the platform application routing modules.
 * * Defines a strongly-typed, read-only manifest conforming to the base Entry blueprint.
 */
export const blogConfig = [
    {
        label: "Test",
        link: "/blog/test?from=home",
        description: "tset",
        date: "22 May 2026",
    },
] as const satisfies Entry[];
