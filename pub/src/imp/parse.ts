import * as pi from "pareto-core-internals"
import * as pl from "pareto-core-lib"
import * as pm from "pareto-core-state"

import * as tsmorph from "ts-morph"
import * as api from "api-dynamic-typescript-parser"
import * as ua from "api-untyped-ast"
import * as path from "path"
import { Details } from "./Details"

export const parse: api.Parse<Details> = ($, $i) => {
    return {
        execute: (cb) => {

            const joinedPath = path.join(...pi.flatten($.tsconfigPath))
            const project = new tsmorph.Project({})
            project.addSourceFilesFromTsConfig(joinedPath)
            const filesBuilder = pm.createDictionaryBuilder<api.File<Details>>(
                ["ignore", {}],
                () => {
                    pl.panic("typescript files don't have unique names")
                }
            )

            project.getSourceFiles().map(($) => {

                const fullFilePath = $.getFilePath()
                const relativeFilePath = path.relative(path.dirname(joinedPath), $.getFilePath())
                function wrap(
                    $: tsmorph.Node
                ): ua.TUntypedNode<Details> {
                    const children = pm.createArrayBuilder<ua.TUntypedNode<Details>>()
                    $.forEachChild(($) => {
                        children.push(wrap($))
                    })
                    return {
                        kindName: $.getKindName(),
                        value: $.getText(),
                        implementationDetails: {
                            get location() {
                                const x = $.getSourceFile().getLineAndColumnAtPos($.getStart())
                                return {
                                    line: x.line,
                                    column: x.column
                                }
                            },
                        },
                        children: children.getArray(),
                    }
                }
                filesBuilder.add(relativeFilePath, {
                    root: wrap($),
                    fullPath: fullFilePath
                })

            })
            $i.callback({
                files: filesBuilder.getDictionary()
            })
            cb()
        }
    }
}
