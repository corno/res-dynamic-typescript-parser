import * as pt from 'pareto-core-types'

import * as g_this from "./glossary"

export namespace A {
    
    export type createParser = () => g_this.ASYNC.A.C.CreateParser
    
    export type stripQuotes = () => g_this.SYNC.A.F.StripQuotes
}

export type API = {
    readonly 'createParser': A.createParser
    readonly 'stripQuotes': A.stripQuotes
}