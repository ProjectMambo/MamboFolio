import path from "path";

import Page from "@/modules/Page";
import { parseMarkdownFile } from "@/components/markdown/MarkdownParser";

export default function GeneratedPage() {
  const nodes = parseMarkdownFile(path.join(process.cwd(), "docs", "project/Project Mambo.md"));
  return <Page nodes={nodes} />;
}
