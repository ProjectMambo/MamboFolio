import React from "react";
import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { marked, Token } from "marked";

import Text from "@/components/Text";
import Metadata from "@/components/markdown/Metadata";

/**
 * Iterates through a flat array of inline markdown tokens and transforms them
 * into specialized React configuration nodes. Handles styles like emphasis,
 * bolding, and raw text layout.
 *
 * @param {Token[]} tokens - The collection of marked inline lexer tokens to parse.
 * @param {string} parentKey - Unique identifier context inherited from the parent structural token.
 * @returns {React.ReactNode[]} An array of configured typography elements mapping to inline text elements.
 */
function parseInlineTokens(
    tokens: Token[],
    parentKey: string,
): React.ReactNode[] {
    return tokens
        .map((token, index) => {
            const key = `${parentKey}-inline-${index}`;
            switch (token.type) {
                case "strong":
                    return (
                        <Text
                            label={token.text}
                            key={key}
                            type="paragraph"
                            formatting="bold"
                            as="strong"
                        />
                    );
                case "em":
                    return (
                        <Text
                            key={key}
                            label={token.text}
                            type="paragraph"
                            formatting="italics"
                            as="em"
                        />
                    );
                case "text":
                    return (
                        <Text
                            key={key}
                            label={token.raw}
                            type="paragraph"
                            as="span"
                        />
                    );
                default:
                    return null;
            }
        })
        .filter(Boolean);
}

/**
 * Reads a local markdown file, extracts YAML front-matter configurations,
 * processes structural layout tokens, and compiles them into a sequence of safe renderable React layout primitives.
 *
 * @public
 * @param {string} filePath - Absolute or relative path to the targeted `.md` document.
 * @returns {React.ReactNode[]} An ordered array containing the generated title header, metadata block, and main content components.
 */
export function parseMarkdownFile(filePath: string): React.ReactNode[] {
    const rawMarkdownString = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath, ".md");

    const { data, content: strippedMarkdown } = matter(rawMarkdownString);
    const tokens = marked.lexer(strippedMarkdown);

    const nodes = tokens
        .map((token, index) => {
            switch (token.type) {
                case "heading":
                    return (
                        <Text
                            key={`h-${index}`}
                            type="header"
                            level={token.depth as 1 | 2 | 3}
                            label={token.text}
                        />
                    );
                case "paragraph":
                    return (
                        <Text key={`p-${index}`} type="paragraph">
                            {parseInlineTokens(
                                token.tokens ?? [],
                                `p-${index}`,
                            )}
                        </Text>
                    );
                default:
                    if ("text" in token) {
                        return (
                            <Text
                                key={`def-${index}`}
                                type="paragraph"
                                label={token.raw}
                            />
                        );
                    }
                    return null;
            }
        })
        .filter(Boolean);

    return [
        <Text key="file-title" type="header" level={1} label={fileName} />,
        <Metadata key="metadata" data={data} />,
        ...nodes,
    ];
}
