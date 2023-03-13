import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_uast from "glo-typescript-untyped-ast"

export namespace I {
    
    export type Parse = ($: T.ParseData, ) => void
    
    export type ParserHandler = {
        'onError': ($: T.TypescriptParseError, ) => void
        'onSuccess': ($: g_uast.T.UntypedNode<T.TypescriptParserNode>, ) => void
    }
}

export namespace F {
    
    export type CreateParser = ($: g_common.T.Null, $i: I.ParserHandler,) => I.Parse
}