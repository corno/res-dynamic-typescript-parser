import * as api from "api-dynamic-typescript-parser"

import * as tsmorph from "ts-morph"

export function getLocation($: tsmorph.Node): api.Location {
    return $.getSourceFile().getLineAndColumnAtPos($.getStart())
}