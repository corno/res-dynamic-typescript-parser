import * as api from "api-dynamic-typescript-parser"
import { stripQuotesImp } from "../private/stripQuotesImp"

export const stripQuotes: api.FStripQuotes = ($) => {
    return stripQuotesImp($)
}