import { factory } from "../../../factory/nodeFactory";
import { Expression } from "../../../types";
import { identifier } from "./identifier";

export const callClass = (name: string | Expression, args: (Expression | string)[] = []) => {
    return factory.createNewExpression(
        identifier(name),
         /* typeArguments */ undefined,
        args.map(identifier),
    );
};