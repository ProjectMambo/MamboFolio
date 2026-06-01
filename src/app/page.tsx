import path from "path";

import Page from "@/modules/Page";
import Text from "@/components/Text";
import Button from "@/components/Button";
import CardView from "@/modules/CardView";
import { parseMarkdownFile } from "@/components/markdown/MarkdownParser";

import { projectConfig } from "@/constants/projects";
import { blogConfig } from "@/constants/blogs";

export default function Home() {
    const content = [
        parseMarkdownFile(path.join(process.cwd(), "docs", "About.md")),

        <Text key="Project" label="Project" type="header" level={1} />,
        <CardView
            key="ProjectView"
            cardItems={projectConfig.slice(0, 3)}
            view="grid"
        />,
        <div key="ProjectSeeMore" className="flex justify-center py-px">
            <Button label="See More" link="/project" bg="muted" text="light" />
        </div>,

        <Text key="Blog" label="Blog" type="header" level={1} />,
        <CardView
            key="BlogView"
            cardItems={blogConfig.slice(0, 3)}
            view="list"
        />,
        <div key="BlogSeeMore" className="flex justify-center py-px">
            <Button label="See More" link="/blog" bg="muted" text="light" />
        </div>,

        <Text key="Contact" label="Contact" type="header" level={1} />,
        <div key="ContactContent" className="flex flex-col"></div>,
    ].flat();
    return <Page nodes={content} />;
}
