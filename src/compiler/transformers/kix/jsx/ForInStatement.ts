import { CustomContextType } from "..";
import { isBlock, isVariableDeclarationList } from "../../../factory/nodeTests";
import { ForInStatement, NodeFlags, Visitor } from "../../../types";
import { createObject, createObjectArgsType } from "../factoryCode/createObject";
import { variableStatement } from "../factoryCode/variableStatement";
import { getVariableDeclarationNames } from "../utils/getVariableDeclarationNames";
import { createBlockVisitor, VariableStateType } from "./utils/createBlockVisitor";

// type DefaultDeclarationsType = [string, string][]
const ForInStatementVisitor = createBlockVisitor(<N extends ForInStatement>({ initializer, statement }: N, visitor: Visitor, context: CustomContextType) => {
    const defaultDeclarations: createObjectArgsType = [];

    if (isVariableDeclarationList(initializer)) {
        for (const variableDeclaration of initializer.declarations) {
            const declarationNamesObject = getVariableDeclarationNames(variableDeclaration);
            for (const declarationIdentifierName in declarationNamesObject) {
                context.addDeclaredIdentifierState(declarationIdentifierName);
                context.addIdentifiersChannelCallback(declarationIdentifierName, (identifierState) => {
                    identifierState.declaredFlag = initializer.flags;
                    // const { substituteCallback } = identifierState
                    identifierState.substituteCallback = (indexIdToUniqueString /*, declarationIdentifier */) => {
                        if (initializer.flags !== NodeFlags.None) {
                            defaultDeclarations.push([
                                indexIdToUniqueString,
                                context.factory.createIdentifier(declarationIdentifierName)
                            ]);
                        }
                        // substituteCallback(indexIdToUniqueString, declarationIdentifier)
                    }

                })
            }
        }
    }
    return {
        defaultDeclarations: defaultDeclarations,
        statement: visitor(statement) as typeof statement
    }
}, false);

export const VisitForInStatement = (
    node: ForInStatement,
    visitor: Visitor,
    context: CustomContextType
) => {
    const [{ statement, defaultDeclarations }, variableState] = ForInStatementVisitor(node, visitor, context);
    const updatedStatement = updateForInStatementStatement(
        statement,
        variableState,
        defaultDeclarations,
        context
    );
    return context.factory.updateForInStatement(
        node,
        visitor(node.initializer) as typeof node.initializer,
        visitor(node.expression) as typeof node.expression,
        updatedStatement,
    )
}
const updateForInStatementStatement = (
    statement: ForInStatement["statement"],
    { blockScopeIdentifiers }: VariableStateType,
    defaultDeclarations: createObjectArgsType,
    context: CustomContextType
) => {
    if (!blockScopeIdentifiers) return statement

    const variableDeclarationNode = variableStatement([
        [
            blockScopeIdentifiers,
            createObject(defaultDeclarations)
        ],
    ], NodeFlags.Const);

    if (isBlock(statement)) {
        return context.factory.updateBlock(
            statement,
            [
                variableDeclarationNode,
                ...statement.statements
            ]
        )
    }

    return context.factory.createBlock([
        variableDeclarationNode,
        statement
    ]);
}