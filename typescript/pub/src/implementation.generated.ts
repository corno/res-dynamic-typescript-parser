import { API } from "./definition/api.generated"
import { $$ as iparse } from "./implementations/parse.native"
import { $$ as istripQuotes } from "./implementations/stripQuotes.native"

export const $r: API = {
    'parse': iparse,
    'stripQuotes': istripQuotes,
}