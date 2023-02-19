import * as pd from 'pareto-core-data'

import {
    string,
    nested,
    array,
    typeReference,
    interfaceReference,
    null_,
    method,
    number, dictionary, group, member, taggedUnion, types, func, data, reference, type,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

const d = pd.d

export const $: mmoduleDefinition.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': {
        'imports': d({
            "common": "glo-pareto-common",
            "uast": "glo-typescript-untyped-ast",
        }),
        'parameters': d({}),
        'types': d({

            // import * as pt from "pareto-core-types";
            // import * as uast from "api-untyped-ast";
            // export declare type TFile = {
            //     readonly "fullPath": string;
            //     readonly "root": uast.TUntypedNode;
            // };
            // export declare type TLocation = {
            //     readonly "line": number;
            //     readonly "column": number;
            // };

            "File": type(group({
                "fullPath": member(string()),
                "root": member(reference("uast", "UntypedNode")),
            })),
            "FileData": type(group({
                "path": member(string()),
                "data": member(reference("File")),
            })),
            "ParseData": type(group({
                "tsconfigPath": member(reference("common", "Path")),
            })),
            "TypescriptParseError": type(taggedUnion({
                "tsconfig.json does not exist": group({}),
                "is directory": group({}),
            })),
        }),
        'interfaces': d({
            "ParserHandler": ['group', {
                'members': d({
                    "onError": method(typeReference("TypescriptParseError")),
                    "onFile": method(typeReference("FileData")),
                    "onEnd": method(null),
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