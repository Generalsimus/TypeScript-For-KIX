import { identifier } from "./identifier";
import { stringLiteral } from "./stringLiteral";
import { BinaryExpression, BinaryOperator, Expression, SyntaxKind } from "../../../types"; 
import { factory } from "../../../factory/nodeFactory";

// type ArgsType = ts.ElementAccessExpression
export function nodeToken(nodes: (string |  Expression)[], token:  BinaryOperator =  SyntaxKind.EqualsToken) {


    return nodes.reduce((property1, property2) => {
        return factory.createBinaryExpression(
            identifier(property1),
            factory.createToken(token as any),
            stringLiteral(property2),
        );
    }) as BinaryExpression
}