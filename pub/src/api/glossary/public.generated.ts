import * as pt from 'pareto-core-types'

import * as t from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as muast from "glo-typescript-untyped-ast"

export type TFile = t.UFile

export type TFileData = t.UFileData

export type TParseData = t.UParseData

export type TTypescriptParseError = t.UTypescriptParseError

export type IParserHandler = {
    'onEnd': () => void
    'onError': ($: TTypescriptParseError, ) => void
    'onFile': ($: TFileData, ) => void
}

export type FParse = ($: TParseData, $i: IParserHandler,) => void

export type FStripQuotes = ($: mcommon.TString,) => mcommon.TString