
import * as api from "api-dynamic-typescript-parser"
import { getLocation } from "./getLocation"
import { parse } from "./parse"
import * as tsmorph from "ts-morph"

type API = {
    parse: api.Parse<tsmorph.Node>
    getLocation: api.GetLocation<tsmorph.Node>
}

export const $: API = {
    parse: parse,
    getLocation: getLocation,
}