import React from "react";
import localFont from "next/font/local";
import type { Metadata } from "next";

import Bar from "@/modules/Bar";
import { ThemeProvider } from "@/context/ThemeContext";
import { Entry } from "@/components/Interfaces";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "KohKohNut",
    description: "KohKohNut's website",
    icons: {
        icon: [
            { url: "/icon.svg?v=2", type: "image/svg+xml" },
            { url: "/icon.png?v=2", type: "image/png", sizes: "512x512" },
        ],
        apple: [
            { url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" },
        ],
    },
};

const mambo = localFont({
    src: [
        {
            path: "../../public/fonts/MamboFont-Regular_v0.2.4.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/MamboFont-Medium_v0.2.4.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/MamboFont-SemiBold_v0.2.4.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/MamboFont-Bold_v0.2.4.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-mambo",
    display: "swap",
});

/**
 * Root structural layout shell handling context setups, baseline theme canvases,
 * font optimization systems, and centralized layout parameters.
 *
 * @public
 * @param {Object} props - Structural nodes mapping layout contexts.
 * @param {React.ReactNode} props.children - Renderable nodes inserted inside the viewport document flow.
 * @returns {JSX.Element} The absolute root HTML tree lifecycle wrapper configuring runtime styles and contexts.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navConfig = [
        { label: "KOHKOHNUT", link: "/" },
        { label: "HOME", link: "/" },
        { label: "PROJECT", link: "/project" },
        { label: "BLOG", link: "/blog" },
        { label: "GALLERY", link: "/gallery" },
    ] as const satisfies Entry[];

    return (
        <html lang="en" className={mambo.variable} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('mambo-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
                    }}
                />
            </head>
            <body className="antialiased min-h-screen bg-bg text-fg font-mono">
                <ThemeProvider>
                    <Bar navItems={navConfig} />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
