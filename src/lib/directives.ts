import type {
  DirectiveScalar,
  DirectiveValue,
  ParsedDirective,
} from "@/runtime/schema";

export type DirectiveProperties = Readonly<
  Record<string, string | number | boolean | readonly (string | number | boolean)[]>
>;

function scalarValue(value: DirectiveScalar): string | number | boolean {
  return value.value;
}

function directiveValue(
  value: DirectiveValue,
): string | number | boolean | readonly (string | number | boolean)[] {
  if (value.type === "array") return value.value.map(scalarValue);
  return scalarValue(value);
}

export function directiveProperties(
  invocation: ParsedDirective,
): DirectiveProperties {
  return Object.fromEntries(
    invocation.properties.map((property) => [
      property.name,
      directiveValue(property.value),
    ]),
  );
}

export function stringProperty(
  properties: DirectiveProperties,
  name: string,
  fallback = "",
): string {
  const value = properties[name];
  return typeof value === "string" ? value : fallback;
}

export function numberProperty(
  properties: DirectiveProperties,
  name: string,
  fallback: number,
): number {
  const value = properties[name];
  return typeof value === "number" ? value : fallback;
}

export function booleanProperty(
  properties: DirectiveProperties,
  name: string,
  fallback: boolean,
): boolean {
  const value = properties[name];
  return typeof value === "boolean" ? value : fallback;
}

export function stringArrayProperty(
  properties: DirectiveProperties,
  name: string,
): readonly string[] {
  const value = properties[name];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}
