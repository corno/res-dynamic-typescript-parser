
import * as api from "api-dynamic-typescript-parser"
import { parseImp } from "../private/parseImp"

export const parse: api.XParse = ($, $i) => {
   return parseImp($, $i)
}
