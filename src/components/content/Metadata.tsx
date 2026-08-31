import { formatDate, pageValue, stripWebTag } from "@/lib/content";
import type { JsonValue, PageRecord } from "@/runtime/schema";

interface MetadataProps {
  readonly page: PageRecord;
  readonly fields: readonly string[];
  readonly style?: string;
  readonly showEmpty?: boolean;
}

const LABELS: Readonly<Record<string, string>> = {
  date: "Published",
  updated: "Updated",
  period: "Period",
  description: "Description",
  tags: "Tags",
  wikiUrl: "Website",
  githubUrl: "GitHub",
};

function renderValue(field: string, value: JsonValue) {
  if (field === "tags" && Array.isArray(value)) {
    return (
      <span className="tag-list">
        {value.map((tag) => typeof tag === "string" ? (
          <span className="tag" key={tag}>{stripWebTag(tag)}</span>
        ) : null)}
      </span>
    );
  }
  if ((field === "date" || field === "updated") && typeof value === "string") {
    return <time dateTime={value}>{formatDate(value)}</time>;
  }
  if (typeof value === "string" && /Url$/.test(field)) {
    return <a href={value}>{value}</a>;
  }
  if (["string", "number", "boolean"].includes(typeof value)) {
    return String(value);
  }
  return <code>{JSON.stringify(value)}</code>;
}

export function Metadata({
  page,
  fields,
  style = "stack",
  showEmpty = false,
}: MetadataProps) {
  const entries = fields.flatMap((field) => {
    const value = pageValue(page, field);
    if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
      return showEmpty ? [[field, "—"] as const] : [];
    }
    return [[field, value] as const];
  });
  if (entries.length === 0) return null;

  return (
    <dl className={`metadata metadata--${style}`}>
      {entries.map(([field, value]) => (
        <div className="metadata__item" key={field}>
          <dt>{LABELS[field] ?? field}</dt>
          <dd>{renderValue(field, value)}</dd>
        </div>
      ))}
    </dl>
  );
}
