import { isElementAccessExpression, isIdentifier, isPropertyAccessExpression } from "../../../../factory/nodeTests";
import { ElementAccessExpression, Expression, LeftHandSideExpression, PropertyAccessExpression } from "../../../../types";
import { idText } from "../../../../utilitiesPublic";
import { stringLiteral } from "../../factoryCode/stringLiteral";

export const getExpressionNames = (
    node: PropertyAccessExpression | ElementAccessExpression | LeftHandSideExpression,
    expressionIdentifiers: Expression[] = [],
    haveQuestionDotToken = false
): boolean => {

    if (isPropertyAccessExpression(node)) {
        if (node.questionDotToken) {
            haveQuestionDotToken = true;
        }
        haveQuestionDotToken = getExpressionNames(node.expression, expressionIdentifiers, haveQuestionDotToken) || haveQuestionDotToken;
        if (isIdentifier(node.name)) {

            expressionIdentifiers.push(stringLiteral(idText(node.name)));
        }
    }
    else if (isElementAccessExpression(node)) {
        if (node.questionDotToken) {
            haveQuestionDotToken = true;
        }
        haveQuestionDotToken = getExpressionNames(node.expression, expressionIdentifiers, haveQuestionDotToken) || haveQuestionDotToken;
        expressionIdentifiers.push(node.argumentExpression);

    }
    else {
        expressionIdentifiers.push(node);
    }


    return haveQuestionDotToken;
};