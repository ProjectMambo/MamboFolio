import { Entry } from "@/components/Interfaces";

/**
 * Static configuration dataset representing a collection of media assets and interactive showcase gallery targets.
 * * Defines an immutable, read-only manifest that drives media card layouts,
 * explicitly enforcing structural schema alignment with the base Entry contract.
 */
export const galleryConfig = [
    {
        label: "KohKohNut",
        link: "/gallery/kohkohnut?from=home",
        image: "/coconut.png",
    },
    {
        label: "Mambo",
        link: "/gallery/mambo?from=home",
        image: "/mambo.png",
    },
    {
        label: "Cod",
        link: "/gallery/cod?from=home",
        image: "/cod.png",
    },
] as const satisfies Entry[];
