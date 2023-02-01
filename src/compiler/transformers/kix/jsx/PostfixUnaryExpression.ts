import { CustomContextType } from "..";
import { isIdentifier } from "../../../factory/nodeTests";
import { PostfixUnaryExpression, SyntaxKind, Visitor } from "../../../types";
import { idText } from "../../../utilitiesPublic";
import { visitEachChild } from "../../../visitorPublic";
import { nodeToken } from "../factoryCode/nodeToken";
import { propertyAccessExpression } from "../factoryCode/propertyAccessExpression";


export const ValueChangeNodeTokens = [
    SyntaxKind.PlusPlusToken,
    SyntaxKind.MinusMinusToken
]

export const VisitPostfixUnaryExpression = (node:  PostfixUnaryExpression, visitor:  Visitor, context: CustomContextType) => {

    const visitedNode =  visitEachChild(node, visitor, context);
    if ( isIdentifier(visitedNode.operand) && ValueChangeNodeTokens.includes(node.operator)) {

        const identifierName =  idText(visitedNode.operand);

        context.addIdentifiersChannelCallback(identifierName, (identifierState) => {
            identifierState.isChanged = true;
            identifierState.substituteCallback = (indexIdToUniqueString, declarationIdentifier) => {
                context.substituteNodesList.set(visitedNode, () => {


                    return nodeToken([
                        context.factory.createParenthesizedExpression(
                            nodeToken(
                                [
                                    propertyAccessExpression(
                                        [
                                            declarationIdentifier,
                                            indexIdToUniqueString
                                        ],
                                        "createPropertyAccessExpression"
                                    ),
                                    context.factory.createPrefixUnaryExpression(
                                        visitedNode.operator,
                                        visitedNode.operand
                                    )
                                ],
                                SyntaxKind.EqualsToken
                            )
                        ),
                        context.factory.createNumericLiteral("1")
                    ],  SyntaxKind.MinusToken)
                })
            }
        });
    }

    return visitedNode
}
