import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_uast from "glo-typescript-untyped-ast"

export namespace ASYNC {
    
    export namespace I {
        
        export type ErrorHandler = {
            'data': ($: T.TypescriptParseError, ) => void
            'end': () => void
        }
        
        export type Parse = ($: T.ParseData, ) => void
        
        export type ParserHandler = ($: g_uast.T.UntypedNode<T.TypescriptParserNode>, ) => void
    }
    
    export namespace A {
        
        
        export namespace C {
            export type CreateParser = ($is: {
                readonly 'errorHandler': ASYNC.I.ErrorHandler
                readonly 'handler': ASYNC.I.ParserHandler
            }) => ASYNC.I.Parse
        }
    }
}

export namespace SYNC {
    
    export namespace I {}
    
    export namespace IW {}
    
    export namespace A {
        
        
        export namespace F {
            export type StripQuotes = ($: g_common.T.String) => g_common.T.String
        }
    }
}