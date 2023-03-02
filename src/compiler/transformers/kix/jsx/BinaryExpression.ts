import { isIdentifier } from "../../../factory/nodeTests";
import { BinaryExpression, SyntaxKind, Visitor } from "../../../types";
import { idText } from "../../../utilitiesPublic";
import { visitEachChild } from "../../../visitorPublic";
import { CustomContextType } from "..";
import { nodeToken } from "../factoryCode/nodeToken";
import { propertyAccessExpression } from "../factoryCode/propertyAccessExpression";



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
];
export const VisitBinaryExpression = (node: BinaryExpression, visitor: Visitor, context: CustomContextType) => {
    const visitedNode = visitEachChild(node, visitor, context);
    if (isIdentifier(visitedNode.left) && AssignmentTokensList.includes(visitedNode.operatorToken.kind)) {

        const identifierName = idText(visitedNode.left);

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

            };

        });


    }

    return visitedNode;
};

