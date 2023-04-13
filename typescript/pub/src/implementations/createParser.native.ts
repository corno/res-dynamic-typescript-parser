import * as pi from 'pareto-core-internals'

import * as g_ua from "glo-typescript-untyped-ast"
import * as g_this from "../glossary"

import * as ntypescript from "typescript"
import * as npath from "path"

import { A } from "../api.generated"

export const $$: A.createParser = () => {
   return {
      'construct': ($is) => {
         return ($) => {
   
            const joinedPath = npath.join(...pi.xflatten($.path))
   
            const fileContents = ntypescript.sys.readFile(joinedPath);
   
            if (fileContents === undefined) {
               $is.errorHandler.data(['could not read file', null])
            } else {
   
               // Parse the TypeScript file and get its AST
               const sourceFile = ntypescript.createSourceFile(
                  joinedPath,
                  fileContents,
                  ntypescript.ScriptTarget.Latest
               );
   
               function wrap(
                  $: ntypescript.Node
               ): g_ua.T.UntypedNode<g_this.T.TypescriptParserNode> {
                  const children: g_ua.T.UntypedNode<g_this.T.TypescriptParserNode>[] = []
                  $.forEachChild(($) => {
                     children.push(wrap($))
                  })
   
   
                  return {
                     'kind': ntypescript.SyntaxKind[$.kind],
                     //getting the location is slow. Only do it when it is really requested
                     'annotation': {
                        'internal': null,
                        'location': () => {
                           const start = ntypescript.getLineAndCharacterOfPosition(sourceFile, $.getStart());
   
                           return {
                              line: start.line,
                              column: start.character,
                           }
                        }
                     },
                     'children': pi.wrapRawArray(children),
                     'flags': () => {
                        const tmp: { [key: string]: () => g_ua.T.UntypedNode.flags.C.D.C<g_this.T.TypescriptParserNode> } = {}
                        Object.keys($).forEach((key) => {
                           const currentNode: any = $
                           const currentProp = currentNode[key]
                           if (typeof currentProp === "number") {
                              tmp[key] = () => ['number', currentProp]
                           }
                           if (typeof currentProp === "string") {
                              tmp[key] = () => ['string', currentProp]
                           }
                        })
                        return pi.wrapRawDictionary(tmp)
                     },
                  }
               }
               $is.handler(wrap(sourceFile))
   
   
               // project.resolveSourceFileDependencies()
   
               // project.getSourceFiles().forEach(($) => {
   
               //    //     const x = $.asKind(tsmorph.ts.SyntaxKind.PrefixUnaryExpression)
   
               //    //    const z = x?.getOperatorToken()
               //    //    z.
               //    //     const y = x?.getOperand()
   
               //    const fullFilePath = $.getFilePath()
               //    const relativeFilePath = npath.relative(npath.dirname(joinedPath), $.getFilePath())
               //    $i.onFile({
               //       path: relativeFilePath,
               //       data: {
               //          root: wrap($),
               //          fullPath: fullFilePath
               //       }
               //    })
               // })
               // $i.onEnd()
            }
            $is.errorHandler.end()
         }
      }
   }
}