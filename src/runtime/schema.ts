export type JsonValue =
  | null
  | boolean
  | number
  | string
  | readonly JsonValue[]
  | JsonObject;

export interface JsonObject {
  readonly [key: string]: JsonValue;
}

export interface SourcePosition {
  readonly line: number;
  readonly column: number;
}

export interface SourceSpan {
  readonly start: SourcePosition;
  readonly end: SourcePosition;
  readonly startByte: number;
  readonly endByte: number;
}

export type DirectiveScalar =
  | { readonly type: "string"; readonly value: string }
  | { readonly type: "number"; readonly value: number }
  | { readonly type: "boolean"; readonly value: boolean };

export type DirectiveValue =
  | DirectiveScalar
  | { readonly type: "array"; readonly value: readonly DirectiveScalar[] };

export interface DirectiveProperty {
  readonly [key: string]: unknown;
  readonly name: string;
  readonly value: DirectiveValue;
}

export interface ParsedDirective {
  readonly [key: string]: unknown;
  readonly form: "leaf" | "container";
  readonly name: string;
  readonly properties: readonly DirectiveProperty[];
}

export interface MarkdownNode {
  readonly [key: string]: unknown;
  readonly type: string;
  readonly children?: readonly MarkdownNode[];
  readonly span?: SourceSpan;
  readonly blockId?: string;
  readonly invocation?: ParsedDirective;
  readonly level?: number;
  readonly value?: string;
  readonly literal?: string;
  readonly info?: string;
  readonly destination?: string;
  readonly source?: string;
  readonly title?: string;
  readonly name?: string;
  readonly kind?: string;
  readonly start?: number;
  readonly tight?: boolean;
  readonly isTaskList?: boolean;
  readonly checked?: boolean;
  readonly marker?: string | null;
  readonly header?: boolean;
  readonly alignments?: readonly string[];
  readonly display?: boolean;
  readonly option?: string | null;
}

export interface HeadingRecord {
  readonly id: string;
  readonly level: number;
  readonly text: string;
  readonly span?: SourceSpan;
}

export interface ResolvedLink {
  readonly [key: string]: unknown;
  readonly authoredDestination: string;
  readonly target:
    | { readonly kind: "external"; readonly href: string }
    | {
        readonly kind: "page";
        readonly pageId: string;
        readonly route: string;
        readonly fragment?: { readonly id?: string };
      }
    | { readonly kind: "unresolved" };
  readonly span?: SourceSpan;
}

export interface PageSummary {
  readonly schemaVersion: number;
  readonly id: string;
  readonly route: string;
  readonly sourcePath: string;
  readonly title: string;
  readonly description?: string;
  readonly status: "published" | "draft";
  readonly listed: boolean;
  readonly date?: string;
  readonly updated?: string;
  readonly tags: readonly string[];
  readonly aliases: readonly string[];
  readonly order?: number;
  readonly cover?: string;
  readonly data: JsonObject;
  readonly children: readonly string[];
}

export interface PageRecord extends PageSummary {
  readonly extra: JsonObject;
  readonly headings: readonly HeadingRecord[];
  readonly blocks: readonly unknown[];
  readonly directives: readonly unknown[];
  readonly body: MarkdownNode;
  readonly outgoingLinks: readonly ResolvedLink[];
  readonly embeds: readonly unknown[];
  readonly backlinks: readonly string[];
}

export interface SiteManifest {
  readonly schemaVersion: number;
  readonly entryPage: string;
  readonly routes: Readonly<Record<string, string>>;
  readonly pages: readonly PageSummary[];
  readonly site: {
    readonly title: string;
    readonly url?: string;
    readonly basePath: string;
    readonly language: string;
    readonly trailingSlash: boolean;
  };
}
