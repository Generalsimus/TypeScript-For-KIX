import { identifier } from "./identifier"
import { factory } from "../../../factory/nodeFactory"
import { Expression } from "../../../types"

export const callClass = (name: string | Expression, args: (Expression | string)[] = []) => {
    return factory.createNewExpression(
        identifier(name),
        undefined,
        args.map(identifier),
    )
}