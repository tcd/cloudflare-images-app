import {
    camelCase,
    capitalCase,
    constantCase,
    dotCase,
    headerCase,
    noCase,
    paramCase,
    pascalCase,
    pathCase,
    sentenceCase,
    snakeCase,
} from "change-case"

export const CaseChanges = {
    "camelCase":    "camelCase",
    "Capital Case":  "capitalCase",
    "CONSTANT_CASE": "constantCase",
    "dot.case":      "dotCase",
    "Header-Case":   "headerCase",
    "noCase":       "noCase",
    "paramCase":    "paramCase",
    "pascalCase":   "pascalCase",
    "pathCase":     "pathCase",
    "sentenceCase": "sentenceCase",
    "snakeCase":    "snakeCase",
} as const

export type CaseChangeName = keyof typeof CaseChanges
export type CaseChange = typeof CaseChanges[CaseChangeName]

export const CaseChangeDescriptions: Record<CaseChange, string> = {
    "camelCase":    "Transform into a string with the separator denoted by the next word capitalized.",
    "capitalCase":  "Transform into a space separated string with each word capitalized.",
    "constantCase": "Transform into upper case string with an underscore between words.",
    "dotCase":      "Transform into a lower case string with a period between words.",
    "headerCase":   "Transform into a dash separated string of capitalized words.",
    "noCase":       "Transform into a lower cased string with spaces between words.",
    "paramCase":    "Transform into a lower cased string with dashes between words.",
    "pascalCase":   "Transform into a string of capitalized words without separators.",
    "pathCase":     "Transform into a lower case string with slashes between words.",
    "sentenceCase": "Transform into a lower case with spaces between words, then capitalize the string.",
    "snakeCase":    "Transform into a lower case string with underscores between words.",
}

export const changeCase = (input: string, caseChange: CaseChange): string => {
    switch (caseChange) {
        case "camelCase":    return camelCase(input)
        case "capitalCase":  return capitalCase(input)
        case "constantCase": return constantCase(input)
        case "dotCase":      return dotCase(input)
        case "headerCase":   return headerCase(input)
        case "noCase":       return noCase(input)
        case "paramCase":    return paramCase(input)
        case "pascalCase":   return pascalCase(input)
        case "pathCase":     return pathCase(input)
        case "sentenceCase": return sentenceCase(input)
        case "snakeCase":    return snakeCase(input)
        default:             return input
    }
}

