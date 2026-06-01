import type { Metadata } from "next";
import Waybar from "@/modules/Bar";
import "@/styles/globals.css";

import { Entry } from "@/components/Interfaces";

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
    const navConfig = [
        { label: "KOHKOHNUT", link: "/" },
        { label: "HOME", link: "/" },
        { label: "PROJECT", link: "/project" },
        { label: "BLOG", link: "/blog" },
    ] as const satisfies Entry[];

    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-bg text-fg font-mono">
                <Waybar navItems={navConfig} />
                {children}
            </body>
        </html>
    );
}
