import { CustomContextType } from "../.."
import { ElementAccessExpression, Expression, PropertyAccessExpression, Visitor } from "../../../../types";
import { visitEachChild } from "../../../../visitorPublic";
import { callFunction } from "../../factoryCode/callFunction"
import { getExpressionNames } from "./getExpressionNames"

export const VisitPropertyAccessExpressionOrElementAccessExpression = (
    node: PropertyAccessExpression | ElementAccessExpression,
    visitor: Visitor,
    context: CustomContextType
) => {
    // context.hoistVariableDeclaration(node)
    if (context.getJSXPropRegistrationIdentifier) {
        // export var webSocketUrl = ({} as any).sdfsd.dsdf?. && ()
        const expressionIdentifiers: Expression[] = [];
        const haveQuestionDotToken = getExpressionNames(node, expressionIdentifiers);

        // context.JsxHaveQuestionDotToken = haveQuestionDotToken;
        if (haveQuestionDotToken && node.parent) {
            context.JsxHaveQuestionDotToken = node.parent

        }

        // // const nodes = haveQuestionDotToken
        return visitor(callFunction(context.getJSXPropRegistrationIdentifier(), expressionIdentifiers))
    }
    return visitEachChild(node, visitor, context)
}