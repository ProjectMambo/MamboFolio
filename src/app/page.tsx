import path from "path";

import Page from "@/modules/Page";
import Text from "@/components/Text";
import Button from "@/components/Button";
import CardView from "@/modules/CardView";
import Banner from "@/modules/Banner";
import Divider from "@/components/Divider";
import { parseMarkdownFile } from "@/components/markdown/MarkdownParser";

import { bannerConfig } from "@/constants/profile";
import { projectConfig } from "@/constants/projects";
import { blogConfig } from "@/constants/blogs";
import { contactConfig } from "@/constants/contacts";
import { galleryConfig } from "@/constants/gallery";

export default function Home() {
    const content = [
        <Banner key="Banner" {...bannerConfig} />,

        <Text key="Theme" label="F.Y.I. You can change theme by clicking the brand text on the bar." 
        color="link" 
        formatting="italics"/>,

        <Divider
            key="DividerBanner"
            orientation="horizontal"
            border="static"
        />,

        parseMarkdownFile(path.join(process.cwd(), "docs", "About.md")),

        <Divider
            key="DividerAbout"
            orientation="horizontal"
            border="static"
        />,

        <Text key="Project" label="Project" type="header" level={1} />,
        <CardView
            key="ProjectView"
            cardItems={projectConfig.slice(0, 3)}
            view="grid"
        />,
        <div key="ProjectSeeMore" className="flex justify-center py-px">
            <Button label="See More" link="/project" bg="muted" text="light" />
        </div>,

        <Divider
            key="DividerProject"
            orientation="horizontal"
            border="static"
        />,

        <Text key="Blog" label="Blog" type="header" level={1} />,
        <CardView
            key="BlogView"
            cardItems={blogConfig.slice(0, 3)}
            view="list"
        />,
        <div key="BlogSeeMore" className="flex justify-center py-px">
            <Button label="See More" link="/blog" bg="muted" text="light" />
        </div>,

        <Divider
            key="DividerBlog"
            orientation="horizontal"
            border="static"
        />,

        <Text key="Gallery" label="Gallery" type="header" level={1} />,
        <CardView
            key="GalleryView"
            cardItems={galleryConfig.slice(0, 3)}
            view="grid"
        />,
        <div key="GallerySeeMore" className="flex justify-center py-px">
            <Button label="See More" link="/gallery" bg="muted" text="light" />
        </div>,

        <Divider
            key="DividerGallery"
            orientation="horizontal"
            border="static"
        />,

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
