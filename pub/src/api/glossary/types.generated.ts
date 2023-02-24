import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as guast from "glo-typescript-untyped-ast"

export namespace T {
    
    export namespace File {
        
        export type fullPath = string
        
        export type root = guast.T.UntypedNode
    }
    
    export type File = {
        readonly 'fullPath': string
        readonly 'root': guast.T.UntypedNode
    }
    
    export namespace FileData {
        
        export type data = T.File
        
        export type path = string
    }
    
    export type FileData = {
        readonly 'data': T.File
        readonly 'path': string
    }
    
    export namespace ParseData {
        
        export type tsconfigPath = gcommon.T.Path
    }
    
    export type ParseData = {
        readonly 'tsconfigPath': gcommon.T.Path
    }
    
    export namespace TypescriptParseError {
        
        export namespace is__directory {}
        
        export type is__directory = {}
        
        export namespace tsconfig_pejson__does__not__exist {}
        
        export type tsconfig_pejson__does__not__exist = {}
    }
    
    export type TypescriptParseError = 
        | ['is directory', {}]
        | ['tsconfig.json does not exist', {}]
}