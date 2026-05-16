/**
 * Micro-spacer pipe module providing consistent vertical margins inside navigation groups.
 */
export default function Divider() {
    const baseClasses = [
        "px-1",
        "text-fg",
        "select-none",
        "cursor-default",
    ].join(" ");

    return <span className={baseClasses}>|</span>;
}
