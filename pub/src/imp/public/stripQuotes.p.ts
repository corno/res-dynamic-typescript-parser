import * as api from "api-dynamic-typescript-parser"
import { stripQuotesImp } from "../private/f_stripQuotesImp"

export const f_stripQuotes: api.FStripQuotes = ($) => {
    return stripQuotesImp($)
}