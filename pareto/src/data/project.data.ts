import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

export const $: gproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "a pareto wrapper around basic string operations as Pareto lacks them (yes, really, by design, the idea is to find a way how not to need them, and if you really do, then use this library)",
    'license': "TBD",
    
    'dependencies': d({
        "glo-pareto-common": null,
        "glo-typescript-untyped-ast": null,
    }),
    'type': ['resource', {
        'definition': {
            'glossary': glossary,
            'api': api,
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
                'functions': d({}),
                'imports': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
        }
    }],
}