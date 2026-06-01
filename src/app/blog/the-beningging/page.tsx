import path from "path";

import Page from "@/modules/Page";
import { parseMarkdownFile } from "@/components/markdown/MarkdownParser";

export default function GeneratedPage() {
  const nodes = parseMarkdownFile(path.join(process.cwd(), "docs", "blog/The Beningging.md"));
  return <Page nodes={nodes} />;
}
