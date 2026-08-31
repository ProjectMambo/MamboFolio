import type { HeadingRecord } from "@/runtime/schema";

interface TableOfContentsProps {
  readonly headings: readonly HeadingRecord[];
  readonly title?: string;
  readonly minDepth?: number;
  readonly maxDepth?: number;
}

export function TableOfContents({
  headings,
  title = "On this page",
  minDepth = 2,
  maxDepth = 4,
}: TableOfContentsProps) {
  const visible = headings.filter(
    (heading) => heading.level >= minDepth && heading.level <= maxDepth,
  );
  if (visible.length === 0) return null;

  return (
    <nav className="toc" aria-label={title}>
      <p className="toc__title">{title}</p>
      <ol>
        {visible.map((heading) => (
          <li key={`${heading.id}-${heading.span?.startByte ?? 0}`} data-level={heading.level}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
