import * as pd from 'pareto-core-data'

import {
    string,
    null_,
    nested,
    dictionary, member, taggedUnion, types, group,
    array,
    typeReference,
    data,
    boolean,
    func,
    type,
    optional,
    reference,
    number,
    method,
    parametrizedTypeReference,
    computed,
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
            })))
        })),
    }),
    'interfaces': d({
        "ParserHandler": ['group', {
            'members': d({
                "onError": method(typeReference("TypescriptParseError")),
                "onSuccess": method(parametrizedTypeReference("uast", { "Annotation": typeReference("TypescriptParserNode")}, "UntypedNode")),
            }),
        }],
    }),
    'functions': d({
        "StripQuotes": func(typeReference("common", "String"), null, null, data(typeReference("common", "String"), false)),
        "Parse": func(typeReference("ParseData"), null, interfaceReference("ParserHandler"), null)
    }),
}