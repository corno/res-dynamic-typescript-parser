import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as gcommon from "glo-pareto-common"
import * as guast from "glo-typescript-untyped-ast"

export type IParserHandler = {
    'onEnd': () => void
    'onError': ($: T.TypescriptParseError, ) => void
    'onFile': ($: T.FileData, ) => void
}

export type FParse = ($: T.ParseData, $i: IParserHandler,) => void

export type FStripQuotes = ($: gcommon.T.String,) => gcommon.T.String