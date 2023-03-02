import { factory } from "../../../factory/nodeFactory";
import { StringLiteral } from "../../../types";



type ReturnValue<T> = T extends string ? StringLiteral : T;

export const stringLiteral = <T extends unknown | string>(stringOrNode: T): ReturnValue<T> => {
    if (typeof stringOrNode === "string") {


        return factory.createStringLiteral(stringOrNode) as unknown as ReturnValue<T>;
    }
    return stringOrNode as unknown as ReturnValue<T>;
};