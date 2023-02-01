import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"
import * as muast from "glo-typescript-untyped-ast"

export namespace GFile {}
export type GFile = {
    readonly 'fullPath': string
    readonly 'root': muast.TUntypedNode
}
export type UFile = GFile

export namespace GFileData {}
export type GFileData = {
    readonly 'data': UFile
    readonly 'path': string
}
export type UFileData = GFileData

export namespace GParseData {}
export type GParseData = {
    readonly 'tsconfigPath': mcommon.TPath
}
export type UParseData = GParseData

export namespace GTypescriptParseError {
    
    export namespace Ois__directory {}
    export type Ois__directory = {}
    
    export namespace Otsconfig_pejson__does__not__exist {}
    export type Otsconfig_pejson__does__not__exist = {}
}
export type GTypescriptParseError = 
    | ['is directory', GTypescriptParseError.Ois__directory]
    | ['tsconfig.json does not exist', GTypescriptParseError.Otsconfig_pejson__does__not__exist]
export type UTypescriptParseError = GTypescriptParseError