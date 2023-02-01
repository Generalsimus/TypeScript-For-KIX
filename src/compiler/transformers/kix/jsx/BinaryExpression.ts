import { CustomContextType } from "..";
import { BinaryExpression, SyntaxKind, Visitor } from "../../../types";
import { visitEachChild } from "../../../visitorPublic";
import { nodeToken } from "../factoryCode/nodeToken";
import { propertyAccessExpression } from "../factoryCode/propertyAccessExpression";
import { isIdentifier } from "../../../factory/nodeTests";
import { idText } from "../../../utilitiesPublic";



const AssignmentTokensList = [
    SyntaxKind.EqualsToken,
    SyntaxKind.AsteriskEqualsToken,
    SyntaxKind.AsteriskAsteriskEqualsToken,
    SyntaxKind.SlashEqualsToken,
    SyntaxKind.PercentEqualsToken,
    SyntaxKind.PlusEqualsToken,
    SyntaxKind.MinusEqualsToken,
    SyntaxKind.LessThanLessThanEqualsToken,
    SyntaxKind.GreaterThanGreaterThanEqualsToken,
    SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    SyntaxKind.AmpersandEqualsToken,
    SyntaxKind.CaretEqualsToken,
    SyntaxKind.BarEqualsToken,
    SyntaxKind.AmpersandAmpersandEqualsToken,
    SyntaxKind.BarBarEqualsToken,
    SyntaxKind.QuestionQuestionEqualsToken,
]
export const VisitBinaryExpression = (node: BinaryExpression, visitor: Visitor, context: CustomContextType) => {
    let visitedNode = visitEachChild(node, visitor, context);
    if (isIdentifier(visitedNode.left) && AssignmentTokensList.includes(visitedNode.operatorToken.kind)) {

        const identifierName = idText(visitedNode.left);

        context.addIdentifiersChannelCallback(identifierName, (identifierState) => {
            // console.log("🚀 --> file: BinaryExpression.ts --> line 33 --> context.addIdentifiersChannelCallback --> identifierName", identifierName);

            identifierState.isChanged = true;
            // const { substituteCallback } = identifierState
            // visitedNode = context.factory.updateBinaryExpression(
            //     visitedNode,
            //     visitedNode.left,
            //     visitedNode.operatorToken,
            //     context.factory.createParenthesizedExpression(visitedNode.right),
            // )

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
                            context.factory.createParenthesizedExpression(
                                context.factory.createBinaryExpression(
                                    visitedNode.left,
                                    visitedNode.operatorToken,
                                    visitedNode.right,
                                )
                            )
                        ]
                    );
                });
                // substituteCallback(indexIdToUniqueString, declarationIdentifier);
            }

        });


    }

    return visitedNode
}

