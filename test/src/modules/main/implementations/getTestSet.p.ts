
import * as ps from 'pareto-core-state'
import * as pl from 'pareto-core-lib'
import * as pv from 'pareto-core-dev'
import * as pa from 'pareto-core-async'


import * as gpub from "../../../../../pub"
import * as gtest from "lib-pareto-test"
import * as guast from "glo-typescript-untyped-ast"

import { CgetTestSet } from "../api"

export const $$:CgetTestSet = ($) => {
    gpub.$a.parse(
        {
            'tsconfigPath': [$.testDirectory, "..", "tsconfig.json"]
        },
        {
            'onEnd': () => {
                pv.logDebugMessage(`END`)
            },
            'onError': ($) => {
                switch ($[0]) {
                    case 'tsconfig.json does not exist':
                        pl.cc($[1], ($) => {
                            pv.logDebugMessage(`tsconfig.json does not exist`)
                        })
                        break
                    case 'is directory':
                        pl.cc($[1], ($) => {
                            pv.logDebugMessage(`specified path refers to a directory, not a file`)

                        })
                        break
                    default: pl.au($[0])
                }
            },
            'onFile': ($) => {
                pv.logDebugMessage($.path)
                pv.logDebugMessage($.data.fullPath)
                function doNode($: guast.T.UntypedNode) {
                    $.children.__forEach(($) => {
                        //pv.logDebugMessage("-")
                        doNode($)
                    })
                }
                doNode($.data.root)
            }
        }
    )
    const builder = ps.createUnsafeDictionaryBuilder<gtest.T.TestElement>()
    function createTest(name: string, actual: string, expected: string) {
        builder.add(name, {
            'type': ['test', {
                type: ['short string', {
                    actual: actual,
                    expected: expected
                }]
            }]
        })
    }

    return pa.asyncValue({
        elements: builder.getDictionary()
    })
}