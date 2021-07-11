import { escapeRegExp } from "lodash";

type MarkdownRule = {
    tag: { end: string; start: string };
    template: (value: string) => string;
}

type MarkdownPattern = {
    regexp: RegExp;
    template: ((value: string) => string);
}

const MARKDOWN = {
    loaded: false,
    patterns: [] as Array<MarkdownPattern>
};

export const CAPSULE_TAG = {
    bold: { start: "*", end: "*" },
    highlight: { start: "=", end: "=" },
    italic: { start: "/", end: "/" },
    stroke: { start: "~", end: "~" },
    underline: { start: "_", end: "_" }
};

const MARKDOWN_RULES = [
    {
        tag: CAPSULE_TAG.bold,
        template: (value: string) => `<strong>${ value }</strong>`
    },
    {
        tag: CAPSULE_TAG.underline,
        template: (value: string) => `<u>${ value }</u>`
    },
    {
        tag: CAPSULE_TAG.stroke,
        template: (value: string) => `<del>${ value }</del>`
    },
    {
        tag: CAPSULE_TAG.highlight,
        template: (value: string) => `<mark>${ value }</mark>`
    },
    {
        tag: CAPSULE_TAG.italic,
        template: (value: string) => `<em>${ value }</em>`
    }
] as Array<MarkdownRule>;


export function process(input: string) {
    loadMarkdown();

    for (const pattern of MARKDOWN.patterns) {
        input = input.replace(pattern.regexp, pattern.template);
    }

    return input;
}

function loadMarkdown() {
    if (!MARKDOWN.loaded) {
        for (const rule of MARKDOWN_RULES) {
            MARKDOWN.patterns.push({
                regexp: generateCapsuleRegex(rule.tag.start, rule.tag.end),
                template: (value: string) => `${ rule.template(value.slice(rule.tag.start.length, -rule.tag.end.length)) }`
            });
        }
    }
}


function generateCapsuleRegex(startTag: string, endTag: string, loose = false) {
    startTag = escapeRegExp(startTag);
    endTag = escapeRegExp(endTag);
    if (loose) {
        return new RegExp(`${ startTag }(.*?)${ endTag }`, "g");
    }
    return new RegExp(`(?<=[^a-zA-Z0-9]|^)${ startTag }([^\\s].*?[^\\s]|[^\\s])${ endTag }(?=[^a-zA-Z0-9]|$)`, "g");
}
