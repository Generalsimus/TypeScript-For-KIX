import { factory } from "../../../../factory/nodeFactory";
import { isFunctionDeclaration, isIdentifier, isJsxExpression } from "../../../../factory/nodeTests";
import { JsxAttributes, JsxChild, JsxTagNameExpression, LanguageVariant, NodeArray, SyntaxKind, Visitor } from "../../../../types";
import { isFunctionExpressionOrArrowFunction } from "../../../../utilities";
import { idText } from "../../../../utilitiesPublic";
import { CustomContextType } from "../..";
import { createKIXJsxTag } from "../FactoryCreate/createKixJsxTag";

const getTagNameString = (tagName: JsxTagNameExpression, _?: string) => {
    if (isIdentifier(tagName)) {
        const tagNameString = idText(tagName);
        if (/^([a-z]|\d+|\-|\:)*$/.test(tagNameString)) {
            return tagNameString;
        }
    }
    else if (tagName.kind === SyntaxKind.ThisKeyword) {
        return "this";
    }
};
export const VisitJsxToObject = (
    visitor: Visitor,
    context: CustomContextType,
    tagName: JsxTagNameExpression,
    attributes: JsxAttributes,
    children: NodeArray<JsxChild>
) => {
    const tagNameToString = getTagNameString(tagName);
    if (context.languageVariant === LanguageVariant.KJS && tagNameToString === "script") {
        for (const childNode of children) {
            if (isJsxExpression(childNode) && childNode.expression && (isFunctionExpressionOrArrowFunction(childNode.expression) || isFunctionDeclaration(childNode.expression))) {

                return factory.createCallExpression(
                    factory.createParenthesizedExpression(childNode.expression),
                    [],
                    []
                );
            }
        }
        return context.factory.createArrayLiteralExpression([]);
    }

    return createKIXJsxTag(
        visitor,
        context,
        tagName,
        attributes,
        children,
        tagNameToString
    );

};