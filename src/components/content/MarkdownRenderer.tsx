import Link from "next/link";
import {
  Fragment,
  createElement,
  type CSSProperties,
  type ReactNode,
} from "react";

import { CollectionView } from "@/components/content/CollectionView";
import { Hero } from "@/components/content/Hero";
import { Metadata } from "@/components/content/Metadata";
import { TableOfContents } from "@/components/content/TableOfContents";
import {
  booleanProperty,
  directiveProperties,
  numberProperty,
  stringArrayProperty,
  stringProperty,
} from "@/lib/directives";
import {
  childPages,
  getPageById,
  pages,
  resolvePageReference,
  resolvedHref,
  sortPages,
} from "@/lib/content";
import type { MarkdownNode, PageRecord } from "@/runtime/schema";

interface MarkdownRendererProps {
  readonly page: PageRecord;
  readonly nodes?: readonly MarkdownNode[];
  readonly headingOffset?: number;
  readonly embedded?: ReadonlySet<string>;
}

export function MarkdownRenderer({
  page,
  nodes = page.body.children ?? [],
  headingOffset = 0,
  embedded = new Set([page.id]),
}: MarkdownRendererProps) {
  return (
    <>
      {nodes.map((node, index) => (
        <MarkdownNodeView
          embedded={embedded}
          headingOffset={headingOffset}
          key={`${node.type}-${node.span?.startByte ?? index}`}
          node={node}
          page={page}
        />
      ))}
    </>
  );
}

interface MarkdownNodeViewProps {
  readonly node: MarkdownNode;
  readonly page: PageRecord;
  readonly headingOffset: number;
  readonly embedded: ReadonlySet<string>;
}

function MarkdownNodeView(context: MarkdownNodeViewProps): ReactNode {
  const { node, page, headingOffset, embedded } = context;
  const children = (
    <MarkdownRenderer
      embedded={embedded}
      headingOffset={headingOffset}
      nodes={node.children ?? []}
      page={page}
    />
  );

  switch (node.type) {
    case "document":
      return children;
    case "frontMatter":
      return null;
    case "paragraph":
      return <p id={node.blockId}>{children}</p>;
    case "heading": {
      const level = Math.min(6, Math.max(1, (node.level ?? 1) + headingOffset));
      const heading = page.headings.find(
        (candidate) => candidate.span?.startByte === node.span?.startByte,
      );
      return createElement(`h${level}`, { id: heading?.id ?? node.blockId }, children);
    }
    case "text":
      return node.value ?? "";
    case "softBreak":
      return "\n";
    case "lineBreak":
      return <br />;
    case "emphasis":
      return <em>{children}</em>;
    case "strong":
      return <strong>{children}</strong>;
    case "strikethrough":
      return <del>{children}</del>;
    case "highlight":
      return <mark>{children}</mark>;
    case "insert":
      return <ins>{children}</ins>;
    case "underline":
      return <u>{children}</u>;
    case "subscript":
      return <sub>{children}</sub>;
    case "superscript":
      return <sup>{children}</sup>;
    case "spoileredText":
      return <span className="spoiler">{children}</span>;
    case "escaped":
      return children;
    case "escapedTag":
      return `<${node.name ?? ""}>`;
    case "raw":
      return node.literal ?? "";
    case "inlineCode":
      return <code>{node.literal}</code>;
    case "codeBlock":
      return (
        <pre id={node.blockId}>
          <code data-language={node.info?.split(/\s+/, 1)[0] || undefined}>
            {node.literal}
          </code>
        </pre>
      );
    case "htmlBlock":
    case "htmlInline":
      return <code className="raw-html">{node.literal}</code>;
    case "blockQuote":
    case "multilineBlockQuote":
      return <blockquote id={node.blockId}>{children}</blockquote>;
    case "alert":
      return (
        <aside className={`callout callout--${node.kind ?? "note"}`}>
          {node.title ? <strong>{node.title}</strong> : null}
          {children}
        </aside>
      );
    case "list": {
      const Tag = node.kind === "ordered" ? "ol" : "ul";
      return <Tag start={Tag === "ol" ? node.start : undefined}>{children}</Tag>;
    }
    case "listItem":
      return <li>{children}</li>;
    case "taskItem":
      return <input type="checkbox" checked={node.checked} readOnly aria-label="Task status" />;
    case "descriptionList":
      return <dl>{children}</dl>;
    case "descriptionItem":
      return children;
    case "descriptionTerm":
      return <dt>{children}</dt>;
    case "descriptionDetails":
      return <dd>{children}</dd>;
    case "thematicBreak":
      return <hr />;
    case "table":
      return <div className="table-scroll"><table><tbody>{children}</tbody></table></div>;
    case "tableRow":
      return (
        <tr>
          {(node.children ?? []).map((cell, index) => {
            const Cell = node.header ? "th" : "td";
            return (
              <Cell key={cell.span?.startByte ?? index}>
                <MarkdownRenderer
                  embedded={embedded}
                  headingOffset={headingOffset}
                  nodes={cell.children ?? []}
                  page={page}
                />
              </Cell>
            );
          })}
        </tr>
      );
    case "tableCell":
      return <td>{children}</td>;
    case "link": {
      const destination = node.destination ?? "";
      const href = resolvedHref(page, destination, node.span);
      return <SmartLink href={href}>{children}</SmartLink>;
    }
    case "wikiLink": {
      const target = resolvePageReference(node.destination ?? "", page);
      return (
        <SmartLink href={target?.route ?? "#"}>
          {node.children?.length ? children : node.destination}
        </SmartLink>
      );
    }
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={node.source} alt={plainNodeText(node)} title={node.title} />;
    case "obsidianEmbed":
      return renderObsidianEmbed(context);
    case "footnoteDefinition":
      return <aside className="footnote" id={`footnote-${node.name}`}>{children}</aside>;
    case "footnoteReference":
      return <sup><a href={`#footnote-${node.name}`}>[{node.name}]</a></sup>;
    case "math":
      return node.display
        ? <pre className="math"><code>{node.literal}</code></pre>
        : <code className="math">{node.literal}</code>;
    case "subtext":
      return <small>{children}</small>;
    case "directive":
      return renderDirective(context);
    case "blockDirective":
      return <div className="unsupported-node">Unsupported directive: {node.info}</div>;
    default:
      return children;
  }
}

function renderDirective(context: MarkdownNodeViewProps): ReactNode {
  const { node, page, headingOffset, embedded } = context;
  const invocation = node.invocation;
  if (!invocation) return null;
  const properties = directiveProperties(invocation);
  const children = (
    <MarkdownRenderer
      embedded={embedded}
      headingOffset={headingOffset}
      nodes={node.children ?? []}
      page={page}
    />
  );

  switch (invocation.name) {
    case "page":
      return null;
    case "hero":
      return (
        <Hero
          align={stringProperty(properties, "align", "left")}
          image={stringProperty(properties, "image") || undefined}
          page={page}
          showDescription={booleanProperty(properties, "show-description", true)}
          showMeta={booleanProperty(properties, "show-meta", false)}
          showTitle={booleanProperty(properties, "show-title", true)}
        />
      );
    case "meta":
      return (
        <Metadata
          fields={stringArrayProperty(properties, "show")}
          page={page}
          showEmpty={stringProperty(properties, "empty", "hide") === "placeholder"}
          style={stringProperty(properties, "style", "stack")}
        />
      );
    case "toc":
      return (
        <TableOfContents
          headings={page.headings}
          maxDepth={numberProperty(properties, "max-depth", 4)}
          minDepth={numberProperty(properties, "min-depth", 2)}
          title={stringProperty(properties, "title", "On this page")}
        />
      );
    case "children":
      return renderChildrenDirective(page, properties);
    case "gallery":
      return renderGalleryDirective(page, properties);
    case "include":
      return renderIncludeDirective(page, properties, headingOffset, embedded);
    case "button": {
      const href = stringProperty(properties, "href", "#");
      const external = booleanProperty(properties, "external", false);
      return (
        <p className="button-row">
          <SmartLink
            className={`button button--${stringProperty(properties, "variant", "primary")}`}
            href={href}
            newTab={external && !href.startsWith("mailto:")}
          >
            {stringProperty(properties, "label", "Open")}
          </SmartLink>
        </p>
      );
    }
    case "section":
      return (
        <section
          className={`directive-section directive-section--${stringProperty(properties, "tone", "plain")}`}
          id={stringProperty(properties, "id") || undefined}
          data-align={stringProperty(properties, "align") || undefined}
        >
          {children}
        </section>
      );
    case "columns": {
      const count = numberProperty(properties, "count", 2);
      const style = { "--column-count": count } as CSSProperties;
      return <div className="columns" style={style}>{children}</div>;
    }
    case "column":
      return <div className="column">{children}</div>;
    case "breadcrumbs":
      return <Breadcrumbs page={page} />;
    case "related": {
      const limit = numberProperty(properties, "limit", 4);
      const related = pages
        .filter((candidate) => candidate.id !== page.id && candidate.listed)
        .map((candidate) => ({
          page: candidate,
          score: candidate.tags.filter((tag) => page.tags.includes(tag)).length,
        }))
        .filter((candidate) => candidate.score > 0)
        .sort((left, right) => right.score - left.score || left.page.route.localeCompare(right.page.route))
        .slice(0, limit)
        .map((candidate) => candidate.page);
      return <CollectionView items={related} view={stringProperty(properties, "view", "cards")} />;
    }
    case "backlinks": {
      const backlinks = page.backlinks.map(getPageById);
      return <CollectionView items={backlinks} view={stringProperty(properties, "view", "list")} />;
    }
    default:
      return <div className="unsupported-node">Unsupported component: {invocation.name}</div>;
  }
}

function renderChildrenDirective(
  page: PageRecord,
  properties: ReturnType<typeof directiveProperties>,
) {
  const source = stringProperty(properties, "source") || undefined;
  const sorted = sortPages(
    childPages(page, source).filter(
      (child) => child.listed || booleanProperty(properties, "include-unlisted", false),
    ),
    stringProperty(properties, "sort", "order"),
    stringProperty(properties, "direction") || undefined,
  );
  const limit = numberProperty(properties, "limit", sorted.length);
  return (
    <CollectionView
      columns={numberProperty(properties, "columns", 3)}
      empty={stringProperty(properties, "empty", "hide") === "message" ? "Nothing here yet." : ""}
      items={sorted.slice(0, limit)}
      show={stringArrayProperty(properties, "show")}
      view={stringProperty(properties, "view", "list")}
    />
  );
}

function renderGalleryDirective(
  page: PageRecord,
  properties: ReturnType<typeof directiveProperties>,
) {
  const source = stringProperty(properties, "source", "children");
  return (
    <CollectionView
      columns={numberProperty(properties, "columns", 3)}
      items={sortPages(childPages(page, source), "order", "asc")}
      show={["cover", "title", ...(booleanProperty(properties, "captions", true) ? ["description"] : [])]}
      view="gallery"
    />
  );
}

function renderIncludeDirective(
  page: PageRecord,
  properties: ReturnType<typeof directiveProperties>,
  headingOffset: number,
  embedded: ReadonlySet<string>,
) {
  const target = resolvePageReference(stringProperty(properties, "source"), page);
  if (!target) return <p className="embed-error">Included page could not be resolved.</p>;
  if (embedded.has(target.id)) return <p className="embed-error">Recursive include blocked.</p>;
  const nextEmbedded = new Set(embedded);
  nextEmbedded.add(target.id);
  const shift = stringProperty(properties, "headings", "keep") === "shift" ? 1 : 0;

  return (
    <section className="embedded-page" data-source={target.sourcePath}>
      {booleanProperty(properties, "show-title", true) ? <h2>{target.title}</h2> : null}
      <MarkdownRenderer
        embedded={nextEmbedded}
        headingOffset={headingOffset + shift}
        page={target}
      />
      {booleanProperty(properties, "show-source", false) ? (
        <p><Link href={target.route}>Read {target.title}</Link></p>
      ) : null}
    </section>
  );
}

function renderObsidianEmbed({
  node,
  page,
  headingOffset,
  embedded,
}: MarkdownNodeViewProps) {
  const destination = node.destination ?? "";
  const target = resolvePageReference(destination, page);
  if (target) {
    return renderIncludeDirective(
      page,
      { source: `[[${destination}]]`, "show-title": false, headings: "shift" },
      headingOffset,
      embedded,
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={destination} alt={node.option ?? ""} />;
}

function Breadcrumbs({ page }: { readonly page: PageRecord }) {
  const segments = page.route.split("/").filter(Boolean);
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      <Link href="/">Home</Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}/`;
        return (
          <Fragment key={href}>
            <span aria-hidden="true">/</span>
            <Link href={href}>{segment.replaceAll("-", " ")}</Link>
          </Fragment>
        );
      })}
    </nav>
  );
}

interface SmartLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly newTab?: boolean;
}

function SmartLink({ href, children, className, newTab = false }: SmartLinkProps) {
  if (/^(?:https?:)?\/\//i.test(href) || /^(?:mailto|tel):/i.test(href)) {
    return (
      <a
        className={className}
        href={href}
        rel={newTab ? "noreferrer" : undefined}
        target={newTab ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }
  return <Link className={className} href={href}>{children}</Link>;
}

function plainNodeText(node: MarkdownNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(plainNodeText).join("");
}
