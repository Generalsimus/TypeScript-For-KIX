import { factory } from "../../../factory/nodeFactory";
import { Expression } from "../../../types";
import { identifier } from "./identifier";

export const callFunction = (
    name: string | Expression,
    args: (Expression | string)[] = [],
    callTypeName: "createCallExpression" | "createNewExpression" = "createCallExpression"
) => {
    return factory[callTypeName](
        identifier(name),
        undefined,
        args.map(identifier),
    );
};