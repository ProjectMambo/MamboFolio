import Page from "@/modules/Page";
import CardView from "@/modules/CardView";
import { blogConfig } from "@/constants/blogs";

export default function Home() {
    const nodes = [
        <CardView key="BlogView" cardItems={blogConfig} view="list" />,
    ].flat();
    return <Page nodes={nodes} />;
}
