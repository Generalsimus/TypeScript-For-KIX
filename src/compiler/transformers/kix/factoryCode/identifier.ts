import { factory } from "../../../factory/nodeFactory";
import { Identifier } from "../../../types";



export const identifier = <T extends any | string>(stringOrNode: T): T extends string ? Identifier : T => {
    if (typeof stringOrNode === "string") {


        return factory.createIdentifier(stringOrNode) as any;
    }
    return stringOrNode as any;
};