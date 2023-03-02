import { factory } from "../../../factory/nodeFactory";
import { BindingName, Expression, Statement, SyntaxKind } from "../../../types";
import { parameterDeclaration } from "./parameterDeclaration";



export const arrowFunction = (params: (string | BindingName)[] = [], statements: Statement[] = [], returnNode?: Expression) => {

    return factory.createArrowFunction(
         /* modifiers */ undefined,
         /* typeParameters */ undefined,
        parameterDeclaration(params),
         /* type */ undefined,
        factory.createToken(SyntaxKind.EqualsGreaterThanToken),
        returnNode ? factory.createParenthesizedExpression(returnNode) : factory.createBlock(
            statements,
             /* multiline */ true
        )
    );
};
