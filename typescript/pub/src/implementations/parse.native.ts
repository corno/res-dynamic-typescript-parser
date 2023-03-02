import * as pi from 'pareto-core-internals'

import * as gua from "glo-typescript-untyped-ast"
import * as gapi from "../definition/glossary"

import * as ntypescript from "typescript"
import * as npath from "path"

import { Cparse } from "../definition/api.generated"

export const $$: Cparse = ($, $i) => {
   const joinedPath = npath.join(...pi.flatten($.path))

   const fileContents = ntypescript.sys.readFile(joinedPath);

   if (fileContents === undefined) {
      $i.onError(['could not read file', null])
   } else {

      // Parse the TypeScript file and get its AST
      const sourceFile = ntypescript.createSourceFile(
         joinedPath,
         fileContents,
         ntypescript.ScriptTarget.Latest
      );

      function wrap(
         $: ntypescript.Node
      ): gua.T.UntypedNode<gapi.T.TypescriptParserNode> {
         const children: gua.T.UntypedNode<gapi.T.TypescriptParserNode>[] = []
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
               const tmp: {[key:string]: () => gua.T.UntypedNode.flags.C.D.C<gapi.T.TypescriptParserNode>} = {}
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
      $i.onSuccess(wrap(sourceFile))


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

}