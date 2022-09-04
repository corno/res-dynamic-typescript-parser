import * as api from "api-dynamic-typescript-parser"

export const stripQuotesFromValue: api.FStripQuotesFromValue = ($) => {
    const firstCharacter = $.value.substring(0, 1)
    if (firstCharacter !== "\"" && firstCharacter != "'") {
        throw new Error("unexpected wrapper")
    }
    return $.value.substring(1, $.value.length - 2)
}