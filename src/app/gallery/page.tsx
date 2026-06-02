import Page from "@/modules/Page";
import CardView from "@/modules/CardView";
import { galleryConfig } from "@/constants/gallery";

export default function Home() {
    const nodes = [
        <CardView key="GalleryView" cardItems={galleryConfig} view="grid" />,
    ].flat();
    return <Page nodes={nodes} />;
}
