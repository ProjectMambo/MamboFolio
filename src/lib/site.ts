import { entryPage, objectValue } from "@/lib/content";
import type { JsonObject, JsonValue } from "@/runtime/schema";
import type { NavigationItem } from "@/components/site/SiteHeader";

function navigationItems(value: JsonValue | undefined): NavigationItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const object = item as JsonObject;
    return typeof object.label === "string" && typeof object.href === "string"
      ? [{ label: object.label, href: object.href }]
      : [];
  });
}

export const navigation = navigationItems(entryPage.data.navigation);
export const footer = objectValue(entryPage.data.footer);
