import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_xml from "lib-xml4pareto/dist/submodules/read"

export namespace ASYNC {
    
    export namespace I {
        
        export type ErrorHandler = {
            'data': ($: T.TypescriptParseError, ) => void
            'end': () => void
        }
        
        export type Parse = ($: T.ParseData, ) => void
        
        export type ParserHandler = ($: g_xml.T.Document<T.TypescriptParserNode>, ) => void
    }
    
    export namespace A {
        
        
        export namespace C {
            export type CreateParser = {
                'construct': ($is: {
                    readonly 'errorHandler': ASYNC.I.ErrorHandler
                    readonly 'handler': ASYNC.I.ParserHandler
                }) => ASYNC.I.Parse
            }
        }
    }
}

export namespace SYNC {
    
    export namespace A {
        
        
        export namespace F {
            export type StripQuotes = ($: g_common.T.String) => g_common.T.String
        }
    }
}