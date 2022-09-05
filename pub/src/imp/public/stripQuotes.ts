import * as api from "api-dynamic-typescript-parser"

export const stripQuotes: api.FStripQuotes = ($) => {
    const firstCharacter = $.substring(0, 1)
    if (firstCharacter !== "\"" && firstCharacter != "'") {
        throw new Error("unexpected wrapper")
    }
    return $.substring(1, $.length - 1)
}