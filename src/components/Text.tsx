interface TextProps {
    text: string;
}

/**
 * Reusable layout text block handling justified alignment and custom prose sizing.
 */
export default function Text({ text }: TextProps) {
    return (
        <p
            className="text-sm md:text-base leading-relaxed text-fg text-justify tracking-normal font-sans antialiased"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
}
