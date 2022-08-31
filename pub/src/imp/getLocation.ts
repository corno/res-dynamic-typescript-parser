import * as api from "api-dynamic-typescript-parser"

import { Details } from "./Details"

export const getLocation: api.GetLocation<Details> = ($) => {
    return $.location
}