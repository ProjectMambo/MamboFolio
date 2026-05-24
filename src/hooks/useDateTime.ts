import { useState, useEffect } from "react";

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
export function useDateTime() {
    // 🎯 Set baseline defaults that don't depend on browser engines during build
    const [timeStr, setTimeStr] = useState("");
    const [dateStr, setDateStr] = useState("");

    useEffect(() => {
        // Safe: This function block executes exclusively inside the user's browser
        const updateDateTime = () => {
            const now = new Date();
            setTimeStr(now.toLocaleTimeString());
            setDateStr(now.toLocaleDateString());
        };

        // Set the initial values immediately on mount
        updateDateTime();

        // Start the chronological clock cycle track loop
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return { timeStr, dateStr };
}
