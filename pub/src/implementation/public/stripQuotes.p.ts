import * as api from "api-dynamic-typescript-parser"
import { stripQuotesImp } from "../private/stripQuotesImp.p"

export const f_stripQuotes: api.FStripQuotes = ($) => {
    return stripQuotesImp($)
}