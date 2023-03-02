import * as pt from 'pareto-core-types'

import * as gthis from "./glossary"

export type Cparse = gthis.FParse

export type CstripQuotes = gthis.FStripQuotes

export type API = {
    parse: Cparse
    stripQuotes: CstripQuotes
}