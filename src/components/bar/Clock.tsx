"use client";

import Divider from "@/components/bar/Divider";
import { useDateTime } from "@/hooks/useDateTime";

/**
 * Client-rendered chronological display module tracking precise platform time.
 */
export default function Clock() {
    const { timeStr, dateStr } = useDateTime();

    const baseContainer = [
        "group",
        "text-xs pt-1 font-mono tracking-widest",
        "px-3 py-1",
        "flex items-center justify-between",
        "c-transition c-label-muted",
    ].join(" ");

    const mediumContainer = ["md:text-sm "].join(" ");

    const largeContainer = ["lg:text-sm"].join(" ");

    if (!timeStr) {
        return null;
    }

    return (
        <div
            className={`${baseContainer} ${mediumContainer} ${largeContainer}`}
        >
            <span className="tabular-nums px-3">{dateStr}</span>
            <Divider variant="normal" />
            <span className="uppercase px-3">{timeStr}</span>
        </div>
    );
}
