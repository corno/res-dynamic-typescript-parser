import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"
import * as muast from "glo-typescript-untyped-ast"

export namespace T {
    
    export namespace File {
        
        export type fullPath = string
        
        export type root = muast.T.UntypedNode
    }
    
    export type File = {
        readonly 'fullPath': string
        readonly 'root': muast.T.UntypedNode
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
        
        export type tsconfigPath = mcommon.T.Path
    }
    
    export type ParseData = {
        readonly 'tsconfigPath': mcommon.T.Path
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