import Link from "next/link";
import { LabelLinkDesDate } from "@/components/Interfaces";
import Divider from "../bar/Divider";

interface BlogEntryProps {
    blog: LabelLinkDesDate;
}

/**
 * Editorial list row component featuring distinct typographic hierarchy,
 * an optional children slot, and an interactive full-bleed hover state.
 */
export default function BlogEntry({ blog }: BlogEntryProps) {
    const baseContainer = [
        "group block",
        "text-xs",
        "flex flex-col items-center justify-center",
        "c-transition c-bg-normal ",
    ].join(" ");

    const mediumContainer = ["md:text-sm"].join(" ");

    const largeContainer = ["lg:text-sm"].join(" ");

    return (
        <Link
            href={blog.link}
            className={`${baseContainer} ${mediumContainer} ${largeContainer}`}
        >
            {/* Info Banner */}
            <div className="flex flex-col w-full px-3 py-3 pt-4">
                {/* Date */}
                <span className="c-transition c-text-date uppercase">
                    {blog.date}
                </span>

                {/* Main Label */}
                <h3 className="c-transition c-label-normal text-lg">{blog.label}</h3>

                {/* Description */}
                <p className="c-transition c-text-des line-clamp-1 mt-1">
                    {blog.description}
                </p>
            </div>

            <Divider
                variant="normal"
                orientation="horizontal"
                hasMargin={false}
            />
        </Link>
    );
}
