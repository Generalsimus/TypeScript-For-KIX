import { CustomContextType } from "..";
import { Node, VariableStatement, Visitor } from "../../../types";
import { getModifiers } from "../../../utilitiesPublic";
import { visitEachChild } from "../../../visitorPublic";
import { identifier } from "../factoryCode/identifier";
import { nodeToken } from "../factoryCode/nodeToken";
import { propertyAccessExpression } from "../factoryCode/propertyAccessExpression";
import { getVariableDeclarationNames } from "../utils/getVariableDeclarationNames";


export const VisitVariableStatement = (node: VariableStatement, visitor: Visitor, context: CustomContextType) => {

    const visitedVariableStatement = visitEachChild(node, visitor, context);

    const returnValue: Node[] = [];
    for (const variableDeclaration of visitedVariableStatement.declarationList.declarations) {
        const declarationNamesObject = getVariableDeclarationNames(variableDeclaration);
        const declarationNode = context.factory.updateVariableStatement(
            visitedVariableStatement,
            getModifiers(visitedVariableStatement),
            context.factory.updateVariableDeclarationList(visitedVariableStatement.declarationList, [variableDeclaration])
        );
        returnValue.push(declarationNode);


        // export enum NodeFlags {
        //     None = 0,
        //     Let = 1,
        //     Const = 2,
        for (const declarationIdentifierName in declarationNamesObject) {
            // const declarationMarker = context.factory.createIdentifier("");
            // returnValue.push(declarationMarker);
            context.addDeclaredIdentifierState(declarationIdentifierName);
            context.addIdentifiersChannelCallback(declarationIdentifierName, (identifierState) => {
                // console.log("🚀 --> file: VariableStatement.ts --> line 35 --> context.addIdentifiersChannelCallback --> declarationIdentifierName", declarationIdentifierName);

                identifierState.declaredFlag = visitedVariableStatement.declarationList.flags;
                // const { substituteCallback } = identifierState
                identifierState.substituteCallback = (indexIdToUniqueString, declarationIdentifier) => {
                    context.substituteNodesList.set(declarationNode, (_, substituteVisitor) => {
                        context.substituteNodesList.delete(declarationNode);
                        return [
                            substituteVisitor(declarationNode) as Node,
                            context.factory.createExpressionStatement(nodeToken([
                                propertyAccessExpression(
                                    [
                                        declarationIdentifier,
                                        indexIdToUniqueString
                                    ],
                                    "createPropertyAccessExpression"
                                ),
                                identifier(declarationIdentifierName)
                            ]))
                        ];
                    });
                    // substituteCallback(indexIdToUniqueString, declarationIdentifier);
                };

            });
        }
    }

    return returnValue;
};

