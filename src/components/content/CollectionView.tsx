import Link from "next/link";
import type { CSSProperties } from "react";

import { formatDate, stripWebTag } from "@/lib/content";
import type { PageRecord } from "@/runtime/schema";

interface CollectionViewProps {
  readonly items: readonly PageRecord[];
  readonly view?: string;
  readonly columns?: number;
  readonly show?: readonly string[];
  readonly empty?: string;
}

export function CollectionView({
  items,
  view = "list",
  columns = 3,
  show = [],
  empty = "Nothing here yet.",
}: CollectionViewProps) {
  if (items.length === 0) {
    return empty ? <p className="empty-state">{empty}</p> : null;
  }
  if (view === "hidden") return null;

  const visible = new Set(show);
  const gallery = view === "gallery";
  const grid = gallery || view === "grid" || view === "cards";
  const style = grid
    ? ({ "--collection-columns": columns } as CSSProperties)
    : undefined;

  return (
    <div className={`collection collection--${grid ? "grid" : view}`} style={style}>
      {items.map((item) => (
        <Link className="content-card" href={item.route} key={item.id}>
          {(gallery || visible.has("cover")) && item.cover ? (
            // Authored images have no required dimensions, so the Markdown renderer
            // deliberately uses the native element rather than next/image.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="content-card__image" src={item.cover} alt="" />
          ) : null}
          <div className="content-card__body">
            {item.date && (visible.has("date") || view === "list") ? (
              <time className="content-card__date" dateTime={item.date}>
                {formatDate(item.date)}
              </time>
            ) : null}
            <h3>{item.title}</h3>
            {item.description && (show.length === 0 || visible.has("description")) ? (
              <p>{item.description}</p>
            ) : null}
            {item.tags.length > 0 && visible.has("tags") ? (
              <div className="tag-list">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>{stripWebTag(tag)}</span>
                ))}
              </div>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
