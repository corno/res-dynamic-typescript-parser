
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"
import * as pv from "pareto-core-dev"

import * as api from "../api"

import * as pub from "../../../../../pub"

import * as mtest from "lib-pareto-test"
import * as muast from "glo-typescript-untyped-ast"

export const $$: api.CgetTestSet = ($) => {


    pub.$a.parse(
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
                function doNode($: muast.T.UntypedNode) {
                    $.children.__forEach(($) => {
                        //pv.logDebugMessage("-")
                        doNode($)
                    })
                }
                doNode($.data.root)
            }
        }
    )
    const builder = pm.createUnsafeDictionaryBuilder<mtest.T.TestElement>()
    function createTest(name: string, actual: string, expected: string) {
        builder.add(name, {
            type: ["test", {
                type: ["short string", {
                    actual: actual,
                    expected: expected
                }]
            }]
        })
    }

    return pl.asyncValue({
        elements: builder.getDictionary()
    })
}