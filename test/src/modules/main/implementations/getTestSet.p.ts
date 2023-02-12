
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as pub from "../../../../../pub"

import * as mtest from "lib-pareto-test"

export const $$: api.CgetTestSet = ($) => {


    pub.$a.parse(
        {
            'tsconfigPath': [$.testDirectory, "..", "tsconfig.json"]
        },
        {
            'onEnd': () => {
                pl.logDebugMessage(`END`)
            },
            'onError': ($) => {
                switch ($[0]) {
                    case 'tsconfig.json does not exist':
                        pl.cc($[1], ($) => {
                            pl.logDebugMessage(`tsconfig.json does not exist`)
                        })
                        break
                        case 'is directory':
                            pl.cc($[1], ($) => {
                                pl.logDebugMessage(`specified path refers to a directory, not a file`)

                            })
                            break
                    default: pl.au($[0])
                }
            },
            'onFile': ($) => {
                pl.logDebugMessage($.path)
                pl.logDebugMessage($.data.fullPath)
                $.data.root
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