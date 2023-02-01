import { API } from "./api"
import { $$ as iparse } from "./implementations/parse.native"
import { $$ as istripQuotes } from "./implementations/stripQuotes.native"

export const $a: API = {
    'parse': iparse,
    'stripQuotes': istripQuotes,
}