import { API } from "./api.generated"
import { $$ as iparse } from "./implementations/parse.native"

export const $r: API = {
    'parse': iparse,
}