import path from "path";

import Page from "@/modules/Page";
import Text from "@/components/Text";
import Button from "@/components/Button";
import CardView from "@/modules/CardView";
import Banner from "@/modules/Banner";
import { parseMarkdownFile } from "@/components/markdown/MarkdownParser";

import { projectConfig } from "@/constants/projects";
import { blogConfig } from "@/constants/blogs";
import { contactConfig } from "@/constants/contacts";

export default function Home() {
    const content = [
        <Banner
            key="Banner"
            src="/profile-square.jpg"
            alt="Profile Cover"
            header="Solomon"
            paragraph='"But how could you live and have no story to tell?"'
            footer="- Fyodor Dostoevsky"
        />,

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
        <CardView
            key="ContactView"
            cardItems={contactConfig}
            view="grid"
            meta="hide"
            entry="compact"
        />,
    ].flat();
    return <Page nodes={content} />;
}
