import Page from "@/modules/Page";
import CardView from "@/modules/CardView";
import Text from "@/components/Text";
import { blogConfig } from "@/constants/blogs";

export default function Home() {
    const nodes = [
        <Text key="Blog" label="Blog" type="header" level={1} />,
        <CardView key="BlogView" cardItems={blogConfig} view="list" />,
    ].flat();
    return <Page nodes={nodes} />;
}
