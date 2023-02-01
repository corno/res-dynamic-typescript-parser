import * as pr from 'pareto-core-raw'

import {
    string,
    nested,
    array,
    typeReference,
    interfaceReference,
    null_,
    method,
    number, dictionary, group, member, taggedUnion, types, parameter, template, func, data, reference,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "common": "glo-pareto-common",
            "uast": "glo-typescript-untyped-ast",
        }),
        'parameters': d({}),
        'templates': d({
        }),
        'types': types({

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
            
            "File": group({
                "fullPath": member(string()),
                "root": member(reference("uast", "UntypedNode")),
            }),
            "FileData": group({
                "path": member(string()),
                "data":member(reference("File")),
            }),
            "ParseData": group({
                "tsconfigPath": member(reference("common", "Path")),
            }),
            "TypescriptParseError": taggedUnion({
                "tsconfig.json does not exist": group({}),
                "is directory": group({}),
            }),
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