import { factory } from "../../../factory/nodeFactory";
import { Expression, SyntaxKind } from "../../../types";
import { identifier } from "./identifier";

export const callChainFunction = (
    name: string | Expression,
    args: (Expression | string)[] = []
) => {
    return factory.createCallChain(
        identifier(name),
        factory.createToken(SyntaxKind.QuestionDotToken),
         /* typeArguments */ undefined,
        args.map(identifier),
    );
};