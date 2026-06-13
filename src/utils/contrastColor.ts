/**
 * Resolves raw CSS values, Tailwind tokens, or custom properties down to absolute computing matrices.
 * It instantiates temporary layout mock nodes to intercept computed styles, runs perceptually balanced
 * RGB-to-HSL conversions, and applies standard weighting calculations to enforce accessible visibility.
 *
 * @public
 * @param {string} input - A Tailwind shorthand token name, raw custom property string, or explicit variable invocation.
 * @returns {string} An accessible, color-harmonized HSL functional string configured to meet high-contrast presentation criteria.
 */
export function getContrastColor(input: string): string {
    let computedColor = input;

    // If not already resolved rgb, resolve via dummy element
    if (!input.startsWith("rgb")) {
        const dummy = document.createElement("div");
        dummy.style.display = "none";
        document.body.appendChild(dummy);

        let colorString = input;
        if (!input.startsWith("--") && !input.startsWith("var(")) {
            const tokenName = input.replace(/^(bg|text|border|ring)-/, "");
            colorString = `var(--color-${tokenName})`;
        } else if (input.startsWith("--")) {
            colorString = `var(${input})`;
        }

        dummy.style.color = colorString;
        computedColor = window.getComputedStyle(dummy).color;
        document.body.removeChild(dummy);
    }

    const rgbValues = computedColor.match(/\d+(\.\d+)?/g);
    if (!rgbValues) return "currentColor";

    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);

    // Normalize color channels to establish relative color ranges
    const rNorm = r / 255,
        gNorm = g / 255,
        bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const d = max - min;
    let h = 0;

    if (d !== 0) {
        switch (max) {
            case rNorm:
                h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
                break;
            case gNorm:
                h = ((bNorm - rNorm) / d + 2) / 6;
                break;
            case bNorm:
                h = ((rNorm - gNorm) / d + 4) / 6;
                break;
        }
    }

    const l = (max + min) / 2;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

    const hueDegrees = Math.round(h * 360);
    const saturationPercent = Math.round(s * 100);

    // Apply YIQ luma coefficients to calculate perceived text contrast
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    const targetLightness = yiq < 128 ? 88 : 15;

    return `hsl(${hueDegrees}, ${saturationPercent}%, ${targetLightness}%)`;
}
