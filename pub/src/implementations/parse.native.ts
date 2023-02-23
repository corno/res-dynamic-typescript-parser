import * as pi from 'pareto-core-internals'

import * as api from "../api"

import * as mtsmorph from "ts-morph"
import * as mua from "glo-typescript-untyped-ast"
import * as mpath from "path"

export const $$: api.Cparse = ($, $i) => {
   const joinedPath = mpath.join(...pi.flatten($.tsconfigPath))
   const project = new mtsmorph.Project({})
   try {
      project.addSourceFilesFromTsConfig(joinedPath)
   } catch (e) {
      if (!(e instanceof Error)) {
         throw new Error("PANIC: catched a non-error")
      } else {
         if (e.message.startsWith("File not found:")) {
            $i.onError(['tsconfig.json does not exist', {}])
         } else {
            if (e.message.startsWith("EISDIR")) {
               $i.onError(['is directory', {}])
            } else {
               throw new Error(`PANIC: unknown error: ${e.message}##${e.name}`)
            }
         }
      }
   }

   project.resolveSourceFileDependencies()

   project.getSourceFiles().forEach(($) => {

      //     const x = $.asKind(tsmorph.ts.SyntaxKind.PrefixUnaryExpression)

      //    const z = x?.getOperatorToken()
      //    z.
      //     const y = x?.getOperand()

      const fullFilePath = $.getFilePath()
      const relativeFilePath = mpath.relative(mpath.dirname(joinedPath), $.getFilePath())
      function wrap(
         $: mtsmorph.Node
      ): mua.T.UntypedNode {
         const children: mua.T.UntypedNode[] = []
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
            children: pi.wrapRawArray(children),
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
}