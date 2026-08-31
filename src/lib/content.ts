import manifestData from "@/generated/mambo/manifest";
import { pages as generatedPages } from "@/generated/mambo/pages";
import type {
  JsonObject,
  JsonValue,
  PageRecord,
  SiteManifest,
  SourceSpan,
} from "@/runtime/schema";

export const manifest = manifestData as SiteManifest;
export const pages = generatedPages as unknown as readonly PageRecord[];

const pagesById = new Map(pages.map((page) => [page.id, page]));
const pagesByRoute = new Map(pages.map((page) => [page.route, page]));

export const entryPage = getPageById(manifest.entryPage);

export function normalizeRoute(route: string): string {
  const path = `/${route.split(/[?#]/, 1)[0].split("/").filter(Boolean).join("/")}`;
  return path === "/" ? path : `${path}/`;
}

export function getPageById(id: string): PageRecord {
  const page = pagesById.get(id);
  if (!page) throw new Error(`Generated page ${id} is missing`);
  return page;
}

export function getPageByRoute(route: string): PageRecord | undefined {
  return pagesByRoute.get(normalizeRoute(route));
}

export function routeFromSegments(segments: readonly string[] = []): string {
  return normalizeRoute(segments.join("/"));
}

export function segmentsFromRoute(route: string): string[] {
  return normalizeRoute(route).split("/").filter(Boolean);
}

export function resolvePageReference(
  reference: string,
  sourcePage?: PageRecord,
): PageRecord | undefined {
  let target = reference.trim();
  if (target.startsWith("[[") && target.endsWith("]]")) {
    target = target.slice(2, -2);
  }
  target = target.split("|", 1)[0].split("#", 1)[0].trim();
  if (!target) return sourcePage;
  if (target.startsWith("/")) return getPageByRoute(target);

  const normalized = target
    .replace(/\\/g, "/")
    .replace(/\.md$/i, "")
    .replace(/\/index$/i, "")
    .toLocaleLowerCase("en");
  const sourceDirectory = sourcePage?.sourcePath.includes("/")
    ? sourcePage.sourcePath.slice(0, sourcePage.sourcePath.lastIndexOf("/"))
    : "";
  const relative = sourceDirectory
    ? `${sourceDirectory}/${normalized}`.toLocaleLowerCase("en")
    : normalized;

  return pages.find((page) => {
    const source = page.sourcePath
      .replace(/\.md$/i, "")
      .replace(/\/index$/i, "")
      .toLocaleLowerCase("en");
    const basename = source.slice(source.lastIndexOf("/") + 1);
    return source === relative || source === normalized || basename === normalized;
  });
}

export function childPages(
  currentPage: PageRecord,
  source?: string,
): PageRecord[] {
  const owner = source && source !== "children"
    ? resolvePageReference(source, currentPage)
    : currentPage;
  if (!owner) return [];
  return owner.children.map(getPageById).filter((page) => page.status === "published");
}

export function sortPages(
  input: readonly PageRecord[],
  key: string,
  direction?: string,
): PageRecord[] {
  const pagesToSort = [...input];
  const multiplier = direction === "desc" || (!direction && key === "date") ? -1 : 1;
  pagesToSort.sort((left, right) => {
    const result = comparePageValue(left, right, key);
    return result * multiplier || left.route.localeCompare(right.route, "en");
  });
  return pagesToSort;
}

function comparePageValue(left: PageRecord, right: PageRecord, key: string): number {
  if (key === "order") {
    return (left.order ?? Number.MAX_SAFE_INTEGER) -
      (right.order ?? Number.MAX_SAFE_INTEGER);
  }
  const leftValue = key === "path" ? left.route : pageValue(left, key);
  const rightValue = key === "path" ? right.route : pageValue(right, key);
  return String(leftValue ?? "").localeCompare(String(rightValue ?? ""), "en", {
    numeric: true,
  });
}

export function pageValue(page: PageRecord, key: string): JsonValue | undefined {
  if (key === "title") return page.title;
  if (key === "description") return page.description;
  if (key === "date") return page.date;
  if (key === "updated") return page.updated;
  if (key === "tags") return page.tags;
  return page.data[key];
}

export function resolvedHref(
  page: PageRecord,
  destination: string,
  span?: SourceSpan,
): string {
  const link = page.outgoingLinks.find(
    (candidate) =>
      candidate.authoredDestination === destination &&
      (!span || candidate.span?.startByte === span.startByte),
  ) ?? page.outgoingLinks.find(
    (candidate) => candidate.authoredDestination === destination,
  );
  if (!link) return destination;
  if (link.target.kind === "external") return link.target.href;
  if (link.target.kind === "page") {
    const fragment = link.target.fragment?.id;
    return fragment ? `${link.target.route}#${fragment}` : link.target.route;
  }
  return destination;
}

export function stripWebTag(tag: string): string {
  return tag.replace(/^web\//, "");
}

export function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function objectValue(value: JsonValue | undefined): JsonObject | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as JsonObject
    : undefined;
}
