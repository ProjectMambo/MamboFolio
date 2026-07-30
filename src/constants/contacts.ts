import { Entry } from "@/components/Interfaces";

/**
 * Static configuration dataset representing a curated collection of communication channels
 * and external social platform profiles.
 * * Defines an immutable, read-only manifest that drives interactive connection links,
 * explicitly enforcing structural schema alignment with the base Entry contract.
 */
export const contactConfig = [
    {
        label: "Email",
        link: "mailto:me@kohkohnut.org",
        color: "var(--color-magma-dust)",
    },
    {
        label: "Github",
        link: "https://github.com/KohKoh-Nut",
        color: "var(--color-canyon-flash)",
    },
    {
        label: "LinkedIn",
        link: "https://www.linkedin.com/in/sheng-jun-koh",
        color: "var(--color-tumbleweed)",
    },
    {
        label: "Instagram",
        link: "https://www.instagram.com/kohkohnut67",
        color: "var(--color-desert-sage)",
    },
    {
        label: "Facebook",
        link: "https://www.facebook.com/profile.php?id=61592514714206",
        color: "var(--color-storm-canopy)",
    },
    {
        label: "Steam",
        link: "https://steamcommunity.com/id/KohKohNut/",
        color: "var(--color-berry-bramble)",
    },
] as const satisfies Entry[];
