import Link from "next/link";

import type { JsonObject, JsonValue } from "@/runtime/schema";

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

function footerLinks(value: JsonValue | undefined): FooterLink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const object = item as JsonObject;
    return typeof object.label === "string" && typeof object.href === "string"
      ? [{ label: object.label, href: object.href }]
      : [];
  });
}

export function SiteFooter({ data }: { readonly data?: JsonObject }) {
  const copyright = typeof data?.copyright === "string"
    ? data.copyright
    : "Project Mambo";
  const links = footerLinks(data?.links);

  return (
    <footer className="site-footer">
      <p>© {copyright}</p>
      <nav aria-label="Footer navigation">
        {links.map((item) => item.href.startsWith("http") ? (
          <a href={item.href} key={item.href}>{item.label}</a>
        ) : (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </nav>
    </footer>
  );
}
