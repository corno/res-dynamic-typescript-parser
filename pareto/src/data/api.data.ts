import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.Module.api.root<pd.SourceLocation> = {
    'algorithms': d({
        //"stripQuotes": algorithm(functionReference("this", {}, "StripQuotes")),
        "createParser": algorithm(functionReference("this", {}, "CreateParser")),
    }),
}