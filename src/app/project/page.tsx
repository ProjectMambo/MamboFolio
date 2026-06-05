import Page from "@/modules/Page";
import CardView from "@/modules/CardView";
import Text from "@/components/Text";
import { projectConfig } from "@/constants/projects";

export default function Home() {
    const nodes = [
        <Text key="Project" label="Project" type="header" level={1} />,
        <CardView key="ProjectView" cardItems={projectConfig} view="grid" />,
    ].flat();
    return <Page nodes={nodes} />;
}
