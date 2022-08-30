import * as pi from "pareto-core-internals"
import * as pl from "pareto-core-lib"
import * as pm from "pareto-core-state"

import * as tsmorph from "ts-morph"
import * as api from "api-dynamic-typescript-parser"
import * as ua from "api-untyped-ast"
import * as path from "path"

export const parse: api.Parse<api.Location> = ($, $i) => {
    return {
        execute: (cb) => {

            const joinedPath = path.join(...pi.flatten($.tsconfigPath))
            const project = new tsmorph.Project({})
            project.addSourceFilesFromTsConfig(joinedPath)
            const filesBuilder = pm.createDictionaryBuilder<api.File<api.Location>>(
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
                ): ua.TUntypedNode<api.Location> {
                    const children = pm.createArrayBuilder<ua.TUntypedNode<api.Location>>()
                    $.forEachChild(($) => {
                        children.push(wrap($))
                    })
                    return {
                        kindName: $.getKindName(),
                        value: $.getText(),
                        implementationDetails: $.getSourceFile().getLineAndColumnAtPos($.getStart()),
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
