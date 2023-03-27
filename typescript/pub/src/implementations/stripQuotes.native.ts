import * as pi from 'pareto-core-internals'

import { A } from "../api.generated"

export const $$: A.stripQuotes = () => {
    return ($) => {
        const firstCharacter = $.substring(0, 1)
        if (firstCharacter !== "\"" && firstCharacter != "'") {
            throw new Error("unexpected wrapper")
        }
        return $.substring(1, $.length - 1)
    }
}