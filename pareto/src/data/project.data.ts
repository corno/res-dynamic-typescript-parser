import * as pd from 'pareto-core-data'

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

import { external, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"


export const $: g_project.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "a pareto wrapper around basic string operations as Pareto lacks them (yes, really, by design, the idea is to find a way how not to need them, and if you really do, then use this library)",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
        "glo-typescript-untyped-ast": null,
    }),
    'type': ['resource', {
        'glossary': {
            'root': glossary,
            'imports': d({
                "common": external("glo-pareto-common"),
                "uast": external("glo-typescript-untyped-ast"),
            }),
        },
        'api': {
            'root': api,

            'imports': d({
                "this": this_(),
            }),
        },
        'nativeDependencies': d({
            "typescript": null,
        }),
        'devDependencies': d({
            "@types/node": null,
        }),
        'test': {
            'dependencies': d({
                "glo-typescript-untyped-ast": null,
            }),
            'glossary': {
                'parameters': d({}),
                'imports': d({}),
                'types': d({}),
                'type': ['synchronous', {
                    'builders': d({}),
                    'functions': d<g_glossary.T.Glossary._ltype.synchronous.functions.D<pd.SourceLocation>>({}),
                }],
            },
            'imports': d({}),
        }
    }],
}