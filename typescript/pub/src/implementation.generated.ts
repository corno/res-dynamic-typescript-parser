import { API } from "./api.generated"
import { $$ as icreateParser } from "./implementations/createParser.native"
import { $$ as istripQuotes } from "./implementations/stripQuotes.native"

export const $api: API = {
    'createParser': icreateParser,
    'stripQuotes': istripQuotes,
}