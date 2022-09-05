import * as pi from "pareto-core-internals"
import * as pm from "pareto-core-state"

import * as tsmorph from "ts-morph"
import * as api from "api-dynamic-typescript-parser"
import * as ua from "api-untyped-ast"
import * as path from "path"

export const parse: api.XParse = ($, $i) => {
    return {
        execute: (cb) => {

            const joinedPath = path.join(...pi.flatten($.tsconfigPath))
            const project = new tsmorph.Project({})
            try {
                project.addSourceFilesFromTsConfig(joinedPath)
            } catch (e) {
                if (!(e instanceof Error)) {
                    throw new Error("PANIC: catched a non-error")
                }
                if (!e.message.startsWith("File not found:")) {
                    throw new Error(`PANIC: unknown error: ${e.message}`)
                }
                $i.onError(["tsconfg.json does not exist", {}])
            }

            project.getSourceFiles().forEach(($) => {
                
                const fullFilePath = $.getFilePath()
                const relativeFilePath = path.relative(path.dirname(joinedPath), $.getFilePath())
                function wrap(
                    $: tsmorph.Node
                ): ua.TUntypedNode {
                    const children = pm.createArrayBuilder<ua.TUntypedNode>()
                    $.forEachChild(($) => {
                        children.push(wrap($))
                    })
                    return {
                        kindName: $.getKindName(),
                        value: $.getText(),
                        //getting the location is slow. Only do it when it is really requested
                        details: {
                            get location() {
                                const x = $.getSourceFile().getLineAndColumnAtPos($.getStart())
                                return {
                                    line: x.line,
                                    column: x.column
                                }
                            }
                        },
                        children: children.getArray(),
                    }
                }
                $i.onFile({
                    path: relativeFilePath,
                    data: {
                        root: wrap($),
                        fullPath: fullFilePath
                    }
                })
            })
            $i.onEnd()
            cb()
        }
    }
}
