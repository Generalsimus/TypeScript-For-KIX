import { CustomContextType } from "..";
import { isIdentifier } from "../../../factory/nodeTests";
import { PrefixUnaryExpression, SyntaxKind, Visitor } from "../../../types";
import { idText } from "../../../utilitiesPublic";
import { visitEachChild } from "../../../visitorPublic";
import { nodeToken } from "../factoryCode/nodeToken";
import { propertyAccessExpression } from "../factoryCode/propertyAccessExpression";
import { ValueChangeNodeTokens } from "./PostfixUnaryExpression";




export const VisitPrefixUnaryExpression = (node: PrefixUnaryExpression, visitor: Visitor, context: CustomContextType) => {

    const visitedNode = visitEachChild(node, visitor, context);
    if ( isIdentifier(visitedNode.operand) && ValueChangeNodeTokens.includes(node.operator)) {

        const identifierName =  idText(visitedNode.operand);

        context.addIdentifiersChannelCallback(identifierName, (identifierState) => {
            identifierState.isChanged = true;
            identifierState.substituteCallback = (indexIdToUniqueString, declarationIdentifier) => {
                context.substituteNodesList.set(visitedNode, () => {
                    return nodeToken(
                        [
                            propertyAccessExpression(
                                [
                                    declarationIdentifier,
                                    indexIdToUniqueString
                                ],
                                "createPropertyAccessExpression"
                            ),
                            context.factory.updatePrefixUnaryExpression(
                                visitedNode,
                                visitedNode.operand
                            )
                        ],
                        SyntaxKind.EqualsToken
                    )
                })
            }
        });
    }
return visitedNode
}