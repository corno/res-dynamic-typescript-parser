
import * as ps from 'pareto-core-state'
import * as pl from 'pareto-core-lib'
import * as pv from 'pareto-core-dev'
import * as pa from 'pareto-core-async'

import * as gpub from "../../../../../pub"
import * as gtest from "lib-pareto-test"
import * as guast from "glo-typescript-untyped-ast"

import { CgetTestSet } from "../definition/api.generated"

export const $$: CgetTestSet = ($) => {
    gpub.$a.parse(
        {
            'path': [$.testDirectory, "../src/modules/main/implementations/getTestSet.p.ts"]
        },
        {
            'onError': ($) => {
                switch ($[0]) {
                    case 'could not read file':
                        pl.cc($[1], ($) => {
                            pv.logDebugMessage(`could not read file`)
                        })
                        break
                    default: pl.au($[0])
                }
            },
            'onSuccess': ($) => {
                // pv.logDebugMessage($.path)
                // pv.logDebugMessage($.data.fullPath)
                function doNode($: guast.T.UntypedNode<gpub.T.TypescriptParserNode>) {
                    $.children.__forEach(($) => {
                        // pv.logDebugMessage($.kind)

                        // const x = !true
                        // if ($.kind === "PrefixUnaryExpression") {
                        //     const operator = $.flags().__unsafeGetEntry("operator")()
                        //     if (operator[0] !== 'number') {
                        //         pl.panic(`expected a number`)
                        //     } else {
                        //         if (operator[1] !== 53) {
                        //             pl.panic(`expected 53`)
                        //         } else {
                        //             pv.logDebugMessage("WOOOHHOOO############################################################")
                        //         }
                        //     }
                        // }
                        // if ($.kind === "Identifier") {
                        //     const operator = $.flags().__unsafeGetEntry("escapedText")()
                        //     if (operator[0] !== 'string') {
                        //         pl.panic(`expected a string`)
                        //     } else {
                        //         pv.logDebugMessage(`WOOOHHOO$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   ${operator[1]}`)
           
                        //     }
                        // }
                        // if ($.kind === "StringLiteral") {
                        //     const operator = $.flags().__unsafeGetEntry("text")()
                        //     if (operator[0] !== 'string') {
                        //         pl.panic(`expected a string`)
                        //     } else {
                        //         pv.logDebugMessage(`WOOOHHOO$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   ${operator[1]}`)
           
                        //     }
                        // }

                        doNode($)

                    })
                }
                doNode($)
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