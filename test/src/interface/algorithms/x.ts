import * as test from "lib-pareto-test"
import { DDependencies } from "../dependencies/x"

export type XCreateGetTestset = (
    $d: DDependencies
) => test.GetTestSet