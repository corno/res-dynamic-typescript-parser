import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as muast from "glo-typescript-untyped-ast"

export type IParserHandler = {
    'onEnd': () => void
    'onError': ($: T.TypescriptParseError, ) => void
    'onFile': ($: T.FileData, ) => void
}

export type FParse = ($: T.ParseData, $i: IParserHandler,) => void

export type FStripQuotes = ($: mcommon.T.String,) => mcommon.T.String