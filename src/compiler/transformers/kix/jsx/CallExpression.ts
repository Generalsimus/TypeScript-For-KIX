import { CustomContextType } from "..";
import { CallExpression, Visitor } from "../../../types";
import { visitEachChild } from "../../../visitorPublic";
import { callChainFunction } from "../factoryCode/callChainFunction";

export const VisitCallExpression = (
    node: CallExpression,
    visitor: Visitor,
    context: CustomContextType
) => {
    const oldValue = context.JsxHaveQuestionDotToken;
    let newNode = visitEachChild(node, visitor, context);
    if (context.JsxHaveQuestionDotToken === node) {
        newNode = callChainFunction(newNode.expression, [...newNode.arguments]);
    }
    context.JsxHaveQuestionDotToken = oldValue;
    return newNode;
};