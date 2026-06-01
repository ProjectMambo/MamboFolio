"use client";

import { useRouter } from "next/navigation";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

/**
 * Shape of the structural raw front-matter configuration extracted from a markdown document.
 * * @interface MetadataData
 * @property {string} [description] - A brief summary or excerpt describing the document.
 * @property {string | string[]} [tag] - A single classification category label or an array of tags.
 * @property {string} [date] - Chronological timestamp text or creation date.
 * @property {string} [url] - An external reference or canonical link path.
 */
interface MetadataData {
    description?: string;
    tag?: string | string[];
    date?: string;
    url?: string;
}

/**
 * Interface representing the properties accepted by the Metadata component.
 * * @interface MetadataProps
 * @property {MetadataData} data - The extracted configuration attributes to be rendered.
 */
interface MetadataProps {
    data: MetadataData;
}

/**
 * A client or server component that standardizes the presentation of parsed file metadata.
 * It normalizes tags into flat collections, displays contextual attributes conditionally,
 * and appends a separating boundary divider if any metadata property exists.
 *
 * @public
 * @param {MetadataProps} props - The configuration and content properties for the Metadata view.
 * @param {MetadataData} props.data - The segmented file details including dates, tags, and links.
 * @returns {JSX.Element} A layout block displaying the populated document properties, appended with a structural divider.
 */
export default function Metadata({ data }: MetadataProps) {
    const { description, tag, date, url } = data;
    const tags = Array.isArray(tag) ? tag : tag ? [tag] : [];
    const router = useRouter();

    const hasMetadata = date || description || tags.length > 0 || url;

    return (
        <div className="flex flex-col gap-3 w-full">
            {date && <Text type="date" label={date} />}
            {description && <Text type="description" label={description} />}
            {tags.length > 0 && (
                <div className="flex flex-row flex-wrap gap-2">
                    {tags.map((t) => (
                        <span
                            key={t}
                            className="font-mono text-xs uppercase px-2 py-0.5 border border-border text-fg-muted"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}
            {url && <Text type="url" label={url} link={url} />}

            {hasMetadata && (
                <>
                    <Divider
                        orientation="horizontal"
                        margin="none"
                        border="static"
                    />
                    <Button
                        label="< Back"
                        onClick={() => router.back()}
                        border="muted"
                        bg="none"
                        text="light"
                        scale="none"
                    />
                </>
            )}
        </div>
    );
}
