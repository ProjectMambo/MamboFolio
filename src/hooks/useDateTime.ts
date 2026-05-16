import { useState, useEffect } from "react";

interface DateTimeState {
    timeStr: string;
    dateStr: string;
}

/**
 * Custom React hook that initializes a centralized system clock heartbeat.
 * Leverages a standard 1-second interval loop to dispatch formatted string states
 * tuned for clean typographic alignments.
 *
 * DESIGN RATIONALE:
 * Extracts chronological scheduling logic away from structural presentation components.
 * By standardizing uppercase locales and isolating updating side effects, it acts
 * as a single source of truth for time synchronization across consumer modules.
 *
 * @returns {DateTimeState} Synchronized data strings for rendering downstream.
 */
export function useDateTime(): DateTimeState {
    // Keep states empty at mount initialization to prevent hydration mismatch flashes in SSR environments
    const [dateTime, setDateTime] = useState<DateTimeState>({
        timeStr: "",
        dateStr: "",
    });

    useEffect(() => {
        /**
         * Pulls active local system signatures and normalizes values across custom boundaries.
         */
        const updateDateTime = () => {
            const now = new Date();

            // Enforces military time string formats (24-hour cycle)
            const time = now.toLocaleTimeString("en-US", { hour12: false });

            // Build uppercase date tokens using strict English string configurations
            const weekday = now
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase();
            const dateBody = now
                .toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })
                .toUpperCase();

            setDateTime({
                timeStr: time,
                dateStr: `${weekday}, ${dateBody}`,
            });
        };

        // Instantiate execution immediately upon browser mount to minimize blank frame delays
        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);

        // Eject structural thread bindings to completely eliminate potential memory leaks during unmount actions
        return () => clearInterval(timer);
    }, []);

    return dateTime;
}
