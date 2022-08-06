import { tags } from "@lezer/highlight"
import { HighlightStyle } from "@codemirror/language"
import { EditorView } from "@codemirror/view"

import { isBlank } from "@app/lib"

type TagProperty = keyof typeof tags

type TagColors = Record<TagProperty, string>

const tagColors: TagColors = {
    string: "#ce9178",
    number: "#b5cea8",
    function: "#dcdcaa",
    color: "",
    comment: "#6a9955",
    lineComment: "#6a9955",
    blockComment: "#6a9955",
    docComment: "#6a9955",
    name: "",
    variableName: "#9cdcfe",
    typeName: "#4ec9b0",
    tagName: "#569CD6",
    propertyName: "#9cdcfe",
    attributeName: "#9cdcfe",
    className: "#4ec9b0",
    labelName: "",
    namespace: "#4ec9b0",
    macroName: "",
    literal: "#d7ba7d",
    docString: "",
    character: "",
    attributeValue: "",
    integer: "#b5cea8",
    float: "#b5cea8",
    bool: "#569CD6",
    regexp: "#d16969",
    escape: "#d7ba7d",
    url: "",
    keyword: "#569CD6",
    self: "#569CD6",
    null: "#569CD6",
    atom: "",
    unit: "",
    modifier: "",
    operatorKeyword: "#c586c0",
    controlKeyword: "#c586c0",
    definitionKeyword: "",
    moduleKeyword: "",
    operator: "#c586c0",
    derefOperator: "#c586c0",
    arithmeticOperator: "#c586c0",
    logicOperator: "#c586c0",
    bitwiseOperator: "#c586c0",
    compareOperator: "#c586c0",
    updateOperator: "#c586c0",
    definitionOperator: "#c586c0",
    typeOperator: "#c586c0",
    controlOperator: "#c586c0",
    punctuation: "",
    separator: "#D4D4D4",
    bracket: "",
    angleBracket: "",
    squareBracket: "#D4D4D4",
    paren: "#D4D4D4",
    brace: "#D4D4D4",
    content: "",
    heading: "",
    heading1: "",
    heading2: "",
    heading3: "",
    heading4: "",
    heading5: "",
    heading6: "",
    contentSeparator: "",
    list: "",
    quote: "",
    emphasis: "",
    strong: "",
    link: "",
    monospace: "",
    strikethrough: "",
    inserted: "",
    deleted: "",
    changed: "",
    invalid: "",
    meta: "",
    documentMeta: "",
    annotation: "",
    processingInstruction: "",
    definition: "",
    constant: "#569CD6",
    standard: "",
    local: "",
    special: "",
}

// export const myHighlightStyle = HighlightStyle.define([
//     { tag: tags.keyword, color: "#569CD6" },
//     { tag: tags.comment, color: "#6a9955", fontStyle: "italic" },
//     { tag: tags.angleBracket, color: "#808080" },
// ])

const styles = []
for (const [tag, color] of Object.entries(tagColors)) {
    if (isBlank(color)) {
        continue
    }
    styles.push({
        tag: tags[tag],
        color: color,
    })
}

export const editorHighlighting = HighlightStyle.define(styles)

export const editorTheme = EditorView.baseTheme({
    ".cm-content": {
        backgroundColor: "#1E1E1E",
        color: "#d4d4d4",
    },
    ".cm-activeLine": {
        backgroundColor: "#1E1E1E",
        color: "#d4d4d4",
    },
    ".cm-linenumber": {
        color: "#858585",
    },
    ".cm-cursor": {
        borderLeft: "1px solid #b0b0b0",
    },
    // ".ͼ1c": {
    //     color: "rebeccapurple",
    // },
    ".cm-activeLineGutter": {
        background: "#252526",
        color: "#6a9955",
    },
    ".cm-gutter": {
        backgroundColor: "#252526",
    },
    ".cm-gutters": {
        border: "none !important",
    },
    ".cm-lineNumbers": {
        backgroundColor: "#252526",
    },
    ".cm-o-replacement": {
        display: "inline-block",
        width: ".5em",
        height: ".5em",
        borderRadius: ".25em",
    },
    "&light .cm-o-replacement": {
        backgroundColor: "#FFFFFF",
    },
    "&dark .cm-o-replacement": {
        backgroundColor: "#1E1E1E",
        color: "#d4d4d4",
    },
})
