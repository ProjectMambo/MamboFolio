"use client";

import { useRouter } from "next/navigation";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

/**
 * Shape of the structural raw front-matter configuration extracted from a markdown document.
 * * @interface MetadataData
 * @property {string | string[]} [tag] - A single classification category label or an array of tags.
 * @property {string} [description] - A brief summary or excerpt describing the document.
 * @property {string} [date] - Chronological timestamp text or creation date.
 * @property {string} [url] - An external reference or canonical link path.
 */
interface MetadataData {
    tags?: string | string[];
    description?: string;
    period?: string;
    wikiUrl?: string;
    githubUrl?: string;
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
    const { tags, description, period, wikiUrl, githubUrl } = data;
    const tagsArr = (Array.isArray(tags) ? tags : tags ? [tags] : []).map((t) =>
        t.replace(/^web\//, ""),
    );
    const router = useRouter();

    const hasMetadata =
        period || description || tagsArr.length > 0 || wikiUrl || githubUrl;

    return (
        <div className="flex flex-col gap-3 w-full">
            {period && <Text label={period} type="date" />}
            {description && <Text label={description} type="description" />}
            {tagsArr.length > 0 && (
                <div className="flex flex-row flex-wrap gap-2">
                    {tagsArr.map((t) => (
                        <Text
                            key={t}
                            label={t}
                            type="description"
                            as="span"
                            border="light"
                            bg="light"
                        />
                    ))}
                </div>
            )}

            {wikiUrl && (
                <Text as="span">
                    <Text label="Wiki: " type="description" as="span" />
                    <Text label={wikiUrl} link={wikiUrl} type="url" />
                </Text>
            )}

            {githubUrl && (
                <Text as="span">
                    <Text label="Github: " type="description" as="span" />
                    <Text label={githubUrl} link={githubUrl} type="url" />
                </Text>
            )}

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
