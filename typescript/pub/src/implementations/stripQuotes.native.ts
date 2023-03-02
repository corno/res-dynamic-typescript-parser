import { CstripQuotes } from "../definition/api.generated"

export const $$:CstripQuotes = ($) => {
    const firstCharacter = $.substring(0, 1)
    if (firstCharacter !== "\"" && firstCharacter != "'") {
        throw new Error("unexpected wrapper")
    }
    return $.substring(1, $.length - 1)
}