import { factory } from "../../../factory/nodeFactory";
import { StringLiteral } from "../../../types";



type ReturnValue<T> = T extends string ?  StringLiteral : T;

export const stringLiteral = <T extends unknown | string>(StringOrNode: T): ReturnValue<T> => {
    if (typeof StringOrNode === "string") {


        return factory.createStringLiteral(StringOrNode) as unknown as ReturnValue<T>;
    }
    return StringOrNode as unknown as ReturnValue<T>;
};