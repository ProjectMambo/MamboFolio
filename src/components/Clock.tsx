"use client";

import Divider from "@/components/Divider";
import { useDateTime } from "@/hooks/useDateTime";

/**
 * Client-rendered chronological display module tracking precise platform time.
 */
export default function Clock() {
    const { timeStr, dateStr } = useDateTime();

    const containerClasses = [
        "flex items-center gap-3",
        "font-mono text-[12px]",
        "tracking-widest text-fg",
    ].join(" ");

    // Tabular numbers prevent text from shifting horizontally as the seconds increment
    const timeClasses = ["text-fg-muted font-bold", "tabular-nums"].join(" ");
    const dateClasses = [
        "text-fg-muted font-bold",
        "uppercase selection:bg-transparent",
    ].join(" ");

    // Render a structural placeholder frame if server values do not match live browser states.
    if (!timeStr) {
        return <div className="h-[18px] w-48 bg-transparent" />;
    }

    return (
        <div className={containerClasses}>
            <span className={dateClasses}>{dateStr}</span>
            <Divider />
            <span className={timeClasses}>{timeStr}</span>
        </div>
    );
}
