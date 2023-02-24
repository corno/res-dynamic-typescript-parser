import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"


export type Cparse = gglo.FParse

export type CstripQuotes = gglo.FStripQuotes

export type API = {
    parse: Cparse
    stripQuotes: CstripQuotes
}