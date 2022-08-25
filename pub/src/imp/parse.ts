import * as pl from "pareto-core-lib"
import * as pm from "pareto-core-state"

import * as tsmorph from "ts-morph"
import * as api from "api-dynamic-typescript-parser"
import * as ua from "api-untyped-ast"
import * as path from "path"

export function parse(
    $: {
        tsconfigPath: api.Path
    }
): api.Project<tsmorph.Node> {
    const joinedPath = path.join(...pl.flatten($.tsconfigPath))
    const project = new tsmorph.Project({})
    project.addSourceFilesFromTsConfig(joinedPath)
    const filesBuilder = pm.createDictionaryBuilder<api.File<tsmorph.Node>>(
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
        ): ua.TUntypedNode<tsmorph.Node> {
            const children = pm.createArrayBuilder<ua.TUntypedNode<tsmorph.Node>>()
            $.forEachChild(($) => {
                children.push(wrap($))
            })
            return {
                kindName: $.getKindName(),
                value: $.getText(),
                implementationDetails: $,
                children: children.getArray(),
            }
        }
        filesBuilder.add(relativeFilePath, {
            root: wrap($),
            fullPath: fullFilePath
        })

    })
    return {
        files: filesBuilder.getDictionary()
    }
}
