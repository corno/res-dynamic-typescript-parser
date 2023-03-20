import * as pd from 'pareto-core-data'

import {
    aconstructor,
    afunction, aInterfaceMethod, aInterfaceReference, computed, data, externalTypeReference, group, imp, inf, member, number, ref, sfunction, sInterfaceMethod, stream, taggedUnion, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
        "uast": imp({ "Annotation": typeReference("TypescriptParserNode") }),
    }),
    'types': d({

        // export declare type TFile = {
        //     readonly "fullPath": string;
        //     readonly "root": uast.TUntypedNode;
        // };
        // export declare type TLocation = {
        //     readonly "line": number;
        //     readonly "column": number;
        // };

        "ParseData": type(group({
            "path": member(ref(externalTypeReference("common", "Path"))),
        })),
        "TypescriptParseError": type(taggedUnion({
            "could not read file": group({}),
        })),
        "TypescriptParserNode": type(group({
            "internal": member(group({
                //cast this one to a Typescript.Node if needed
            })),
            "location": member(computed(group({
                "line": member(number()),
                "column": member(number()),
            }))),
        })),
    }),
    'asynchronous': {
        'interfaces': d({
            "Parse": aInterfaceMethod(typeReference("ParseData")),
            "ParserHandler": aInterfaceMethod(externalTypeReference("uast", "UntypedNode")), //FIXME optionally called
            "ErrorHandler": stream(
                aInterfaceMethod(typeReference("TypescriptParseError")),
                aInterfaceMethod(null),
            )
        }),
        'algorithms': d({
            "CreateParser": aconstructor(aInterfaceReference("Parse"), {
                "handler": aInterfaceReference("ParserHandler"),
                "errorHandler": aInterfaceReference("ErrorHandler"),
            }),
        }),
    },
    'synchronous': {
        'interfaces': d({
        }),
        'algorithms': d({
            "StripQuotes": sfunction(externalTypeReference("common", "String"), data(externalTypeReference("common", "String"))),
        }),
    },
}