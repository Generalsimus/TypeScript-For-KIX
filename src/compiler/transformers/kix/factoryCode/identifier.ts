import { factory } from "../../../factory/nodeFactory";
import { Identifier } from "../../../types";



export const identifier = <T extends any | string>(StringOrNode: T): T extends string ? Identifier : T => {
    if (typeof StringOrNode === "string") {


        return factory.createIdentifier(StringOrNode) as any;
    }
    return StringOrNode as any;
};