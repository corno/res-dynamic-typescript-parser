import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_uast from "glo-typescript-untyped-ast"

export namespace T {
    
    export namespace ParseData {
        
        export type path = g_common.T.Path
    }
    
    export type ParseData = {
        readonly 'path': g_common.T.Path
    }
    
    export namespace TypescriptParseError {
        
        export namespace could__not__read__file {}
        
        export type could__not__read__file = null
    }
    
    export type TypescriptParseError = 
        | ['could not read file', null]
    
    export namespace TypescriptParserNode {
        
        export namespace internal {}
        
        export type internal = null
        
        export namespace location {
            
            export namespace C {
                
                export type column = number
                
                export type line = number
            }
            
            export type C = {
                readonly 'column': number
                readonly 'line': number
            }
        }
        
        export type location = () => {
            readonly 'column': number
            readonly 'line': number
        }
    }
    
    export type TypescriptParserNode = {
        readonly 'internal': null
        readonly 'location': () => {
            readonly 'column': number
            readonly 'line': number
        }
    }
}