import * as pd from 'pareto-core-data'

import {
    string,
    nested,
    array,
    typeReference,
    interfaceReference,
    null_,
    method,
    number, dictionary, group, member, taggedUnion, types, func, data, reference, type, parametrizedTypeReference, computed,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands"

import * as gmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

const d = pd.d

export const $: gmoduleDefinition.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': {
        'imports': d({
            "common": "glo-pareto-common",
            "uast": "glo-typescript-untyped-ast",
        }),
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
    },
    'api': {
        'imports': d({
        }),
        'algorithms': d({
            "stripQuotes": algorithm(definitionReference("StripQuotes")),
            "parse": algorithm(definitionReference("Parse")),
        })
    },
}