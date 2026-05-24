import type { Metadata } from "next";
import { LabelLink } from "@/components/Interfaces";
import Waybar from "@/modules/Waybar";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "KohKohNut",
    description: "KohKohNut's website",
};

/**
 * Root structural layout shell handling context setups, baseline theme canvases,
 * font optimization systems, and centralized layout parameters.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Array maps centralizing application directories for easy route configuration updates
    const pagesConfig: LabelLink[] = [
        { label: "HOME", link: "/" },
        { label: "PROJECT", link: "/project" },
        { label: "BLOG", link: "/blog" },
    ];

    const brandConfig: LabelLink = {
        label: "KOHKOHNUT",
        link: "/",
    };

    // Stacked token arrays isolate baseline global layout and typographic styles
    const base = [
        "antialiased min-h-screen",
        "bg-bg text-fg",
        "font-mono",
    ].join(" ");

    return (
        <html lang="en">
            <body className={base}>
                <Waybar pages={pagesConfig} brand={brandConfig} />
                {children}
            </body>
        </html>
    );
}
