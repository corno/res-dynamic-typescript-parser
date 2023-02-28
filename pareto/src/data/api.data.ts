import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/api/shorthands"

import * as gapi from "lib-pareto-typescript-project/dist/submodules/api"
const d = pd.d

export const $: gapi.T.API<pd.SourceLocation> = {
    'imports': d({
        "this": "./glossary",
    }),
    'algorithms': d({
        "stripQuotes": algorithm(functionReference("this", {}, "StripQuotes")),
        "parse": algorithm(functionReference("this", {}, "Parse")),
    })
}