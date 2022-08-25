import * as api from "api-dynamic-typescript-parser"

import * as tsmorph from "ts-morph"

export const getLocation: api.GetLocation<tsmorph.Node> = ($) => {
    return $.getSourceFile().getLineAndColumnAtPos($.getStart())
}