import { MamboSiteFrame } from "@mambosite/react";
import { siteMetadata, themeBootstrapScript } from "@mambosite/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { runtime, theme, themeStylesheetHref } from "@/mambo/runtime";
import "@/app/globals.css";

const basePath = runtime.store.manifest.site.basePath;

export const metadata: Metadata = {
  ...siteMetadata(runtime),
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/icon.png`, type: "image/png", sizes: "512x512" },
    ],
    apple: `${basePath}/apple-icon.png`,
  },
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html
      data-theme={theme.defaultScheme}
      lang={runtime.store.manifest.site.language}
      suppressHydrationWarning
    >
      <head>
        <link
          href={`${basePath}${themeStylesheetHref}`}
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootstrapScript(theme.defaultScheme),
          }}
        />
      </head>
      <body>
        <MamboSiteFrame runtime={runtime}>{children}</MamboSiteFrame>
      </body>
    </html>
  );
}
