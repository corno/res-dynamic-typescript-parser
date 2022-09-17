
import * as api from "api-dynamic-typescript-parser"
import { f_parseImp } from "../private/f_parseImp"

export const f_parse: api.XParse = ($, $i) => {
   return f_parseImp($, $i)
}
