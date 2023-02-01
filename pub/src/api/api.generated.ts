import * as pt from 'pareto-core-types'

import * as glo from "./glossary"


export type Cparse = glo.FParse

export type CstripQuotes = glo.FStripQuotes

export type API = {
    parse: Cparse
    stripQuotes: CstripQuotes
}