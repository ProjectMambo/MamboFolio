import Page from "@/modules/Page";
import CardView from "@/modules/CardView";
import { projectConfig } from "@/constants/projects";

export default function Home() {
    const nodes = [
        <CardView key="ProjectView" cardItems={projectConfig} view="grid" />,
    ].flat();
    return <Page nodes={nodes} />;
}
