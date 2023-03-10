import * as pd from 'pareto-core-data'

import {
    string,
    null_,
    nested,
    dictionary, member, taggedUnion, types, group,
    array,
    typeReference,
    adata,
    boolean,
    afunc,
    type,
    optional,
    reference,
    number,
    interfaceMethod,
    parametrizedTypeReference,
    computed,
    builderReference,
    interfaceReference,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as gglossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: gglossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'types': d({

        // import * as pt from 'pareto-core-types';
        // import * as uast from "api-untyped-ast";
        // export declare type TFile = {
        //     readonly "fullPath": string;
        //     readonly "root": uast.TUntypedNode;
        // };
        // export declare type TLocation = {
        //     readonly "line": number;
        //     readonly "column": number;
        // };

        "ParseData": type(group({
            "path": member(reference("common", "Path")),
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
    'type': ['asynchronous', {
        'interfaces': d({
            "ParserHandler": ['choice', {
                'options': d({
                    //FIXME this onError can be called multiple times
                    "onError": interfaceMethod(typeReference("TypescriptParseError")),
                    "onSuccess": interfaceMethod(parametrizedTypeReference("uast", { "Annotation": typeReference("TypescriptParserNode") }, "UntypedNode")),
                }),
            }],
        }),
        'functions': d<gglossary.T.Glossary._ltype.asynchronous.functions.D<pd.SourceLocation>>({
            // "StripQuotes": func(typeReference("common", "String"), null, null, data(typeReference("common", "String"))),
            "Parse": afunc(typeReference("ParseData"), interfaceReference("ParserHandler"), null),
        }),

    }],
}