import { CustomContextType } from "../..";
import { isClassStaticBlockDeclaration } from "../../../../factory/nodeTests";
import { ArrowFunction, ClassStaticBlockDeclaration, FunctionDeclaration, FunctionExpression, MethodDeclaration, NodeFlags, VariableStatement, Visitor } from "../../../../types";
import { visitEachChild } from "../../../../visitorPublic";
import { createObject, createObjectArgsType } from "../../factoryCode/createObject";
import { identifier } from "../../factoryCode/identifier";
import { variableStatement } from "../../factoryCode/variableStatement";
import { getVariableDeclarationNames } from "../../utils/getVariableDeclarationNames";
import { createBlockVisitor } from "./createBlockVisitor";

type BlockNodesType = FunctionExpression | ArrowFunction | FunctionDeclaration | MethodDeclaration | ClassStaticBlockDeclaration;

const createGlobalBlockVisitor = createBlockVisitor(<N extends BlockNodesType>(node: N, visitor: Visitor, context: CustomContextType) => {
    const declarationProperties: createObjectArgsType = [];

    if (!isClassStaticBlockDeclaration(node)) {
        for (const parameter of node.parameters) {
            const declarationNamesObject = getVariableDeclarationNames(parameter);
            for (const declarationIdentifierName in declarationNamesObject) {

                context.addIdentifiersChannelCallback(declarationIdentifierName, (identifierState) => {
                    identifierState.declaredFlag = NodeFlags.None;
                    identifierState.substituteCallback = (indexIdToUniqueString, _) => {
                        declarationProperties.push([indexIdToUniqueString, identifier(declarationIdentifierName)]);

                    };
                });


            }

        }

    }
    return {
        visitedNode: visitEachChild(node, visitor, context),
        declarationProperties
    };
    // return ts.visitEachChild(node, visitor, context);
}, true);

// TODO: parametrebi deklaraciaSia gasaSvebi
export const createGlobalBlockNodesVisitor = <N extends BlockNodesType>(
    updateNode: (Node: N, declaration: VariableStatement, context: CustomContextType) => N
) => (
    node: N,
    visitor: Visitor,
    context: CustomContextType
) => {

        const OldRegistrations = context.getJSXPropRegistrationIdentifier;
        context.getJSXPropRegistrationIdentifier = undefined;

        const [{ visitedNode, declarationProperties }, variableState] = createGlobalBlockVisitor(node, visitor, context);

        context.getJSXPropRegistrationIdentifier = OldRegistrations;


        if (variableState.globalScopeIdentifiers) {
            return updateNode(
                visitedNode,
                variableStatement([
                    [variableState.globalScopeIdentifiers, createObject(declarationProperties)]
                ]),
                context
            );
        }

        return visitedNode;
    };