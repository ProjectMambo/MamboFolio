import { useState, useEffect } from "react";

/**
 * Shape of the synchronized real-time chronological data structure.
 *
 * @interface DateTimeState
 * @property {string} timeStr - The localized real-time clock signature string.
 * @property {string} dateStr - The parsed space-separated calendar tracking sequence.
 */
interface DateTimeState {
    timeStr: string;
    dateStr: string;
}

/**
 * A custom lifecycle hook that mounts a synchronized system clock heartbeat interval.
 * It manages continuous state transformations across ticking segments, reads internal locale strings
 * to segment specific date tokens, and handles memory cleanup actions upon hook teardown.
 *
 * @public
 * @returns {DateTimeState} An object containing the derived time and customized date strings.
 */
export function useDateTime(): DateTimeState {
    const [timeStr, setTimeStr] = useState("");
    const [dateStr, setDateStr] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            setTimeStr(now.toLocaleTimeString());

            const formatter = new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });

            const parts = formatter.formatToParts(now);

            const day = parts.find((p) => p.type === "day")?.value || "";
            const month = parts.find((p) => p.type === "month")?.value || "";
            const year = parts.find((p) => p.type === "year")?.value || "";

            setDateStr(`${day} ${month} ${year}`);
        };

        updateDateTime();

        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return { timeStr, dateStr };
}
