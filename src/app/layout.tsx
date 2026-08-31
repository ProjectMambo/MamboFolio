import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { manifest } from "@/lib/content";
import { footer, navigation } from "@/lib/site";
import "@/app/globals.css";

const mambo = localFont({
  src: [
    { path: "../../public/fonts/MamboFont-Regular_v0.0.0.woff2", weight: "400" },
    { path: "../../public/fonts/MamboFont-Medium_v0.0.0.woff2", weight: "500" },
    { path: "../../public/fonts/MamboFont-SemiBold_v0.0.0.woff2", weight: "600" },
    { path: "../../public/fonts/MamboFont-Bold_v0.0.0.woff2", weight: "700" },
  ],
  variable: "--font-mambo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: manifest.site.title,
    template: `%s | ${manifest.site.title}`,
  },
  description: "Solomon's portfolio and Project Mambo work.",
  metadataBase: manifest.site.url ? new URL(manifest.site.url) : undefined,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('mambo-theme')||'dark';document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html className={mambo.variable} data-theme="dark" lang={manifest.site.language} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <SiteHeader items={navigation} />
        <main className="site-main">{children}</main>
        <SiteFooter data={footer} />
      </body>
    </html>
  );
}
