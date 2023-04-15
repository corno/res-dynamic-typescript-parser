import * as pi from 'pareto-core-internals'

import * as g_xml from "lib-xml4pareto/dist/submodules/read"
import * as g_this from "../glossary"

import * as n_typescript from "typescript"
import * as n_path from "path"

import { A } from "../api.generated"

export const $$: A.createParser = () => {
   return {
      'construct': ($is) => {
         return ($) => {


            let joinedPath = ""
            $.path.__forEach(($) => {
               joinedPath = n_path.join(joinedPath, $)
            })

            const fileContents = n_typescript.sys.readFile(joinedPath);

            if (fileContents === undefined) {
               $is.errorHandler.data(['could not read file', null])
            } else {

               // Parse the TypeScript file and get its AST
               const sourceFile = n_typescript.createSourceFile(
                  joinedPath,
                  fileContents,
                  n_typescript.ScriptTarget.Latest
               );

               function wrap(
                  $: n_typescript.Node
               ): g_xml.T.Element<g_this.T.TypescriptParserNode> {
                  const children: g_xml.T.Element.content.A<g_this.T.TypescriptParserNode>[] = []
                  $.forEachChild(($) => {
                     children.push(['element', wrap($)])
                  })

                  const attributes: { [key: string]: string } = {}
                  const x: any = $
                  if (x.text !== undefined) {
                     if (typeof x.text !== "string") {
                        pi.panic("expected the 'text' property to be of type 'string'")
                     }
                     attributes["text"] = x.text
                     //attributes["wrapper"] = $.getText()[0]
                  }
                  if (x.operator !== undefined) {
                     let value = ""

                     //const x =n_typescript.SyntaxKind.AbstractKeyword
                     function getOperator($: n_typescript.SyntaxKind) {
                        switch (x.operator) {
                           case n_typescript.SyntaxKind.PlusToken: return "plus"
                           case n_typescript.SyntaxKind.MinusToken: return "minus"
                           case n_typescript.SyntaxKind.TildeToken: return "tilde"
                           case n_typescript.SyntaxKind.ExclamationToken: return "exclamation"
                           case n_typescript.SyntaxKind.PlusPlusToken: return "plusplus"
                           case n_typescript.SyntaxKind.MinusMinusToken: return "minusminus"
                           case n_typescript.SyntaxKind.TypeOfKeyword: return "typeof"
                           default: pi.panic(`unexpected 'operator' property: ${$.toString()}`)
                        }
                     }
                     attributes["operator"] = getOperator(x.operator)
                  }
                  return {
                     'name': n_typescript.SyntaxKind[$.kind],
                     //getting the location is slow. Only do it when it is really requested
                     // 'annotation': {
                     //    'internal': null,
                     //    'location': () => {
                     //       const start = n_typescript.getLineAndCharacterOfPosition(sourceFile, $.getStart());

                     //       return {
                     //          line: start.line,
                     //          column: start.character,
                     //       }
                     //    }
                     // },
                     'content': pi.wrapRawArray(children),
                     'attributes': pi.wrapRawDictionary(attributes)
                     // 'attributes': () => {
                     //    const tmp: { [key: string]: () => g_xml.T.UntypedNode.flags.C.D.C<g_this.T.TypescriptParserNode> } = {}
                     //    Object.keys($).forEach((key) => {
                     //       const currentNode: any = $
                     //       const currentProp = currentNode[key]
                     //       if (typeof currentProp === "number") {
                     //          tmp[key] = () => ['number', currentProp]
                     //       }
                     //       if (typeof currentProp === "string") {
                     //          tmp[key] = () => ['string', currentProp]
                     //       }
                     //    })
                     //    return pi.wrapRawDictionary(tmp)
                     // },
                  }
               }
               $is.handler({
                  'root': wrap(sourceFile)
               })


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