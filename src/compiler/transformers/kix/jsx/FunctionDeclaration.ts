import { FunctionDeclaration, Node, NodeFlags, Visitor } from "../../../types";
import { getModifiers, idText } from "../../../utilitiesPublic";
import { CustomContextType } from "..";
import { identifier } from "../factoryCode/identifier";
import { nodeToken } from "../factoryCode/nodeToken";
import { propertyAccessExpression } from "../factoryCode/propertyAccessExpression";
import { createGlobalBlockNodesVisitor } from "./utils/createGlobalBlockNodesVisitor";



const FunctionDeclarationVisitor = createGlobalBlockNodesVisitor(
    (visitedNode: FunctionDeclaration, declarationNode, context) => {
        return context.factory.updateFunctionDeclaration(
            visitedNode,
            getModifiers(visitedNode),
            visitedNode.asteriskToken,
            visitedNode.name,
            visitedNode.typeParameters,
            visitedNode.parameters,
            visitedNode.type,
            visitedNode.body && context.factory.updateBlock(
                visitedNode.body,
                [
                    declarationNode,
                    ...visitedNode.body.statements
                ]
            ),
        );
    }
);

export const VisitFunctionDeclaration = (node: FunctionDeclaration, visitor: Visitor, context: CustomContextType) => {
    const returnValue: Node[] = [
        FunctionDeclarationVisitor(node, visitor, context)
    ];
    if (node.name) {
        const declarationIdentifierName = idText(node.name);

        context.addIdentifiersChannelCallback(declarationIdentifierName, (identifierState) => {
            identifierState.declaredFlag = NodeFlags.None;
            const declarationMarker = context.factory.createIdentifier("");
            returnValue.push(declarationMarker);
            // const { substituteCallback } = identifierState
            identifierState.substituteCallback = (indexIdToUniqueString, declarationIdentifier) => {
                context.substituteNodesList.set(declarationMarker, () => {

                    return context.factory.createExpressionStatement(nodeToken([
                        propertyAccessExpression(
                            [
                                declarationIdentifier,
                                indexIdToUniqueString
                            ],
                            "createPropertyAccessExpression"
                        ),
                        identifier(declarationIdentifierName)
                    ]));
                });

                // substituteCallback(indexIdToUniqueString, declarationIdentifier)
            };
        });

    }

    // returnValue.push();
    return returnValue;
};