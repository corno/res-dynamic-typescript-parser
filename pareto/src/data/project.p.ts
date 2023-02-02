import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pr.wrapRawDictionary

import { $ as api } from "./api.p"

export const $: mproject.TProject = {
    'author': "Corno",
    'description': "a pareto wrapper around basic string operations as Pareto lacks them (yes, really, by design, the idea is to find a way how not to need them, and if you really do, then use this library)",
    'license': "ISC",
    
    'pubdependencies': d({
        "glo-pareto-common": {},
        "glo-typescript-untyped-ast": {},
        "ts-morph": {},
    }),
    'type': ['resource', {
        'definition': api,
        'devDependencies': d({
            "@types/node": {},
        }),
        'test': {
            'dependencies': d({
            }),
        }
    }],
}