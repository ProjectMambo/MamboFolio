import { useEffect, useState, useRef } from "react";

/**
 * A custom window layout hook that monitors viewport scroll velocity vectors to track vertical
 * directional shifts. It manages a visibility flag used to build auto-hiding interaction elements
 * based on reading trends, tracking historical offsets via mutable references to prevent state decay.
 *
 * @public
 * @param {number} [thresholdBuffer=40] - Boundary padding limit in pixels used to protect top header regions.
 * @returns {boolean} A visibility flag indicating whether contextual navigation controls should show or hide.
 */
export function useScrollDirection(thresholdBuffer = 40): boolean {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const lastScrollY = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const maxScrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            if (currentScrollY < 0 || currentScrollY >= maxScrollableHeight) {
                return;
            }

            if (currentScrollY < thresholdBuffer) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [thresholdBuffer]);

    return isVisible;
}
