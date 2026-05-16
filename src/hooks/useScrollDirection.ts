import { useEffect, useState, useRef } from "react";

/**
 * Custom React hook that monitors window scrolling vectors to detect vertical directional changes.
 * Primarily designed to build smart, contextual, auto-hiding navigation bars that maximize screen
 * landscape during downward reader reading flows.
 *
 * DESIGN RATIONALE:
 * Uses a mutable `useRef` variable instead of a standard `useState` container to store historical
 * scroll tracking positions. This prevents unnecessary re-renders while updating raw coordinate matrices
 * hundreds of times a second during scroll events.
 *
 * @param {number} thresholdBuffer - Safe boundary zone in pixels before downward hiding logic activates.
 * @returns {boolean} Visibility state flag: True to render/show elements, False to transition out/hide.
 */
export function useScrollDirection(thresholdBuffer = 40): boolean {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const lastScrollY = useRef<number>(0);

    useEffect(() => {
        /**
         * Evaluates scroll coordinate changes against past benchmarks to assign real-time visibility profiles.
         */
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Calculate total scrollable document height
            const maxScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Avoid updating state if the browser enters bouncing zones
            if (currentScrollY < 0 || currentScrollY >= maxScrollableHeight) {
                return;
            }

            // Top Boundaries Anchor: Avoid snapping layout flags if the user bounces near header boundaries
            if (currentScrollY < thresholdBuffer) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            // Check Vector Trajectory: If current offset exceeds the historical marker, the user is scrolling down
            if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Sync historical position reference tracker to current positions for subsequent iterations
            lastScrollY.current = currentScrollY;
        };

        /**
         * Bind passive event handler listeners to the global window layout stack.
         * Setting `passive: true` explicitly signals to the browser engine that the scroll handler
         * will never execute event cancellations, enabling smooth frames on mobile devices.
         */
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Eject handlers to eliminate asynchronous memory leak threats during component unmount cycles
        return () => window.removeEventListener("scroll", handleScroll);
    }, [thresholdBuffer]);

    return isVisible;
}
