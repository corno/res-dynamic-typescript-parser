
import * as ps from 'pareto-core-state'
import * as pl from 'pareto-core-lib'
import * as pv from 'pareto-core-dev'
import * as pa from 'pareto-core-async'

import * as g_pub from "../../../../../pub"
import * as g_test from "lib-pareto-test"
import * as g_uast from "glo-typescript-untyped-ast"

import { getTestSet } from "../api.generated"

export const $$: getTestSet = ($) => {
    g_pub.$r.createParser()(
        {
            'errorHandler': {
                'data': ($) => {
                    switch ($[0]) {
                        case 'could not read file':
                            pl.cc($[1], ($) => {
                                pv.logDebugMessage(`could not read file`)
                            })
                            break
                        default: pl.au($[0])
                    }
                },
                'end': () => {}
            },
            'handler': ($) => {
                // pv.logDebugMessage($.path)
                // pv.logDebugMessage($.data.fullPath)
                function doNode($: g_uast.T.UntypedNode<g_pub.T.TypescriptParserNode>) {
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
    )(
        {
            'path': [$.testDirectory, "../src/modules/main/implementations/getTestSet.a.f.ts"]
        },
    )
    const builder = ps.createUnsafeDictionaryBuilder<g_test.T.TestElement>()
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