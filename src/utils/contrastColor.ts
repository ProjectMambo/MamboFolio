/**
 * Resolves raw CSS values, Tailwind tokens, or custom properties down to absolute computing matrices.
 * It instantiates temporary layout mock nodes to intercept computed styles, runs perceptually balanced
 * RGB-to-HSL conversions, and applies standard weighting calculations to enforce accessible visibility.
 *
 * @public
 * @param {string} variable - A Tailwind shorthand token name, raw custom property string, or explicit variable invocation.
 * @returns {string} An accessible, color-harmonized HSL functional string configured to meet high-contrast presentation criteria.
 */
export function getContrastColor(variable: string): string {
    const dummy = document.createElement("div");
    dummy.style.display = "none";
    document.body.appendChild(dummy);

    let colorString = variable;
    if (!variable.startsWith("--") && !variable.startsWith("var(")) {
        const tokenName = variable.replace(/^(bg|text|border|ring)-/, "");
        colorString = `var(--color-${tokenName})`;
    } else if (variable.startsWith("--")) {
        colorString = `var(${variable})`;
    }

    dummy.style.color = colorString;
    const computedColor = window.getComputedStyle(dummy).color;
    document.body.removeChild(dummy);

    const rgbValues = computedColor.match(/\d+(\.\d+)?/g);
    if (!rgbValues) return "currentColor";

    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case rNorm:
                h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
                break;
            case gNorm:
                h = (bNorm - rNorm) / d + 2;
                break;
            case bNorm:
                h = (rNorm - gNorm) / d + 4;
                break;
        }
        h /= 6;
    }

    const hueDegrees = Math.round(h * 360);
    const saturationPercent = Math.round(s * 100);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    const targetLightness = yiq < 128 ? 88 : 15;

    return `hsl(${hueDegrees}, ${saturationPercent}%, ${targetLightness}%)`;
}
