import * as pt from 'pareto-core-types'

import * as g_this from "./glossary"

export type parse = g_this.F.Parse

export type stripQuotes = g_this.F.StripQuotes

export type API = {
    parse: parse
    stripQuotes: stripQuotes
}