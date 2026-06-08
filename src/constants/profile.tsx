import Text from "@/components/Text";

/**
 * Configuration data cluster defining context attributes for the primary introduction block.
 * * Implements a read-only manifest containing optimized asset paths, screen reader text,
 * header signatures, and localized literary quotes.
 */
export const bannerConfig = {
    src: "/profile/profile-square.jpg",
    alt: "Profile Cover",
    header: "Solomon",
    paragraph: '"But how could you live and have no story to tell?"',
    footer: "- Fyodor Dostoevsky",
} as const;

/**
 * Ordered layout manifest containing collection segments designed to sit inside page closings.
 * * Hosts dynamic text elements, copyright indicators, layout anchors, and source link definitions.
 */
export const footerConfig = [
    <Text
        key="copyright"
        type="description"
        label={`\uE00C 2026 Solomon. Built with Next.js.`}
    />,
    <Text
        key="sitePage"
        type="url"
        link="/project/mambofolio"
        label="About This Site"
    />,
    <Text
        key="siteGithub"
        type="url"
        link="https://github.com/ProjectMambo/MamboFolio"
        label="Source Code"
    />,
];
