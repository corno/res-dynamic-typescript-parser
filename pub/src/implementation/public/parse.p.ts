
import * as api from "api-dynamic-typescript-parser"
import { f_parseImp } from "../private/parseImp.p"

export const f_parse: api.FParse = ($, $i, $a) => {
   return f_parseImp($, $i, $a)
}
