import Page from "@/modules/Page";
import CardView from "@/modules/CardView";
import Text from "@/components/Text";
import { galleryConfig } from "@/constants/gallery";

export default function Home() {
    const nodes = [
        <Text key="Gallery" label="Gallery" type="header" level={1} />,
        <CardView key="GalleryView" cardItems={galleryConfig} view="grid" />,
    ].flat();
    return <Page nodes={nodes} />;
}
