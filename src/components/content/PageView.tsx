import Link from "next/link";

import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { TableOfContents } from "@/components/content/TableOfContents";
import { directiveProperties, stringProperty } from "@/lib/directives";
import type { MarkdownNode, PageRecord } from "@/runtime/schema";

function topLevelNodes(page: PageRecord): readonly MarkdownNode[] {
  return page.body.children ?? [];
}

function pageLayout(page: PageRecord): { layout: string; width: string } {
  const pageNode = topLevelNodes(page).find(
    (node) => node.type === "directive" && node.invocation?.name === "page",
  );
  if (!pageNode?.invocation) return { layout: "default", width: "normal" };
  const properties = directiveProperties(pageNode.invocation);
  return {
    layout: stringProperty(properties, "layout", "default"),
    width: stringProperty(properties, "width", "normal"),
  };
}

function hasVisibleTitle(page: PageRecord): boolean {
  return topLevelNodes(page).some(
    (node) =>
      (node.type === "heading" && node.level === 1) ||
      (node.type === "directive" && node.invocation?.name === "hero"),
  );
}

function parentRoute(page: PageRecord): string {
  const segments = page.route.split("/").filter(Boolean);
  if (segments.length <= 1) return "/";
  return `/${segments.slice(0, -1).join("/")}/`;
}

export function PageView({ page }: { readonly page: PageRecord }) {
  const { layout, width } = pageLayout(page);
  const showToc = page.headings.some((heading) => heading.level >= 2);

  return (
    <div className={`page-frame page-frame--${width}`} data-layout={layout}>
      <article className="page-article">
        {!hasVisibleTitle(page) ? <h1>{page.title}</h1> : null}
        <MarkdownRenderer page={page} />
        {page.route !== "/" ? (
          <p className="back-link"><Link href={parentRoute(page)}>← Back</Link></p>
        ) : null}
      </article>
      {showToc ? (
        <aside className="page-sidebar">
          <TableOfContents headings={page.headings} />
        </aside>
      ) : null}
    </div>
  );
}
