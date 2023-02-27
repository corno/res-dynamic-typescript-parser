import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as guast from "glo-typescript-untyped-ast"

export namespace T {
    
    export namespace ParseData {
        
        export type path = gcommon.T.Path
    }
    
    export type ParseData = {
        readonly 'path': gcommon.T.Path
    }
    
    export namespace TypescriptParseError {
        
        export namespace could__not__read__file {}
        
        export type could__not__read__file = {}
    }
    
    export type TypescriptParseError = 
        | ['could not read file', {}]
    
    export namespace TypescriptParserNode {
        
        export namespace internal {}
        
        export type internal = {}
        
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
        readonly 'internal': {}
        readonly 'location': () => {
            readonly 'column': number
            readonly 'line': number
        }
    }
}