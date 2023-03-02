import { isBlock, isVariableDeclarationList } from "../../../factory/nodeTests";
import { ForStatement, NodeFlags, SyntaxKind, VariableDeclarationList, Visitor } from "../../../types";
import { CustomContextType } from "..";
import { createObject } from "../factoryCode/createObject";
import { nodeToken } from "../factoryCode/nodeToken";
import { variableStatement } from "../factoryCode/variableStatement";
import { getVariableDeclarationNames } from "../utils/getVariableDeclarationNames";
import { createBlockVisitor, VariableStateType } from "./utils/createBlockVisitor";

interface InitializerArgType {
    getVariableUniqueIdentifierParent: CustomContextType["getVariableUniqueIdentifier"],
    node: ForStatement
}
const ForStatementBlockVisitor = createBlockVisitor(<N extends InitializerArgType>(
    {
        node: { statement },
        getVariableUniqueIdentifierParent
    }: N,
    visitor: Visitor,
    context: CustomContextType
) => {
    const getVariableUniqueIdentifierCache = context.getVariableUniqueIdentifier;
    context.getVariableUniqueIdentifier = getVariableUniqueIdentifierParent;

    statement = visitor(statement) as typeof statement;

    context.getVariableUniqueIdentifier = getVariableUniqueIdentifierCache;

    return statement;

}, /* isGlobalBlock */ false);

const ForStatementVisitor = createBlockVisitor((
    node: ForStatement,
    visitor: Visitor,
    context: CustomContextType
) => {
    let { initializer, condition, incrementor } = node;
    initializer = initializer && visitor(initializer) as typeof initializer;
    condition = condition && visitor(condition) as typeof condition;
    incrementor = incrementor && visitor(incrementor) as typeof incrementor;
    if (initializer && isVariableDeclarationList(initializer)) {
        for (const variableDeclaration of initializer.declarations) {
            const declarationNamesObject = getVariableDeclarationNames(variableDeclaration);
            for (const declarationIdentifierName in declarationNamesObject) {
                context.addDeclaredIdentifierState(declarationIdentifierName);
                context.addIdentifiersChannelCallback(declarationIdentifierName, (identifierState) => {
                    identifierState.declaredFlag = initializer!.flags;
                });
            }
        }
    }
    const [statement, _] = ForStatementBlockVisitor({
        node,
        getVariableUniqueIdentifierParent: context.getVariableUniqueIdentifier
    }, visitor, context);


    return {
        initializer,
        condition,
        incrementor,
        statement
    };
}, /* isGlobalBlock */ false);

export const VisitForStatement = (node: ForStatement, visitor: Visitor, context: CustomContextType) => {
    let [{
        initializer,
        condition,
        incrementor,
        statement
    }, variableState] = ForStatementVisitor(node, visitor, context);

    if (initializer && isVariableDeclarationList(initializer) && (initializer.flags & NodeFlags.Let)) {
        const letInitializerUpdated = updateLetInitializerAndConditionForBlock(initializer, condition, variableState, context);
        initializer = letInitializerUpdated.initializer;
        condition = letInitializerUpdated.condition;
    }
    else {
        statement = updateStatementNode(statement, variableState, context);
    }
    return context.factory.updateForStatement(
        node,
        initializer,
        condition,
        incrementor,
        statement,
    );
};




////////////////////////////////////////////////////////////////////////////////////////
const updateLetInitializerAndConditionForBlock = (
    initializer: VariableDeclarationList,
    condition: ForStatement["condition"],
    { blockScopeIdentifiers }: VariableStateType,
    context: CustomContextType
) => {
    if (!blockScopeIdentifiers) return { initializer, condition };

    const declarationNode = context.factory.createVariableDeclaration(
        blockScopeIdentifiers,
         /* exclamationToken */ undefined,
         /* type */ undefined,
         /* initializer */ undefined
    );
    initializer = context.factory.updateVariableDeclarationList(
        initializer,
        [
            declarationNode,
            ...initializer.declarations
        ],
    );
    const stateObjectNode = nodeToken([
        blockScopeIdentifiers,
        createObject([])
    ], SyntaxKind.EqualsToken);

    if (condition) {
        condition = nodeToken([stateObjectNode, condition], SyntaxKind.CommaToken);
    }
    else {
        condition = stateObjectNode;
    }

    return { initializer, condition };
};

////////////////////////////////////////////////////////////////////////////////////////////
const updateStatementNode = (
    statement: ForStatement["statement"],
    { blockScopeIdentifiers }: VariableStateType,
    context: CustomContextType
) => {
    if (!blockScopeIdentifiers) return statement;
    const variableDeclarationNode = variableStatement([
        [
            blockScopeIdentifiers,
            createObject([])
        ],
    ], NodeFlags.Const);

    if (isBlock(statement)) {
        return context.factory.updateBlock(
            statement,
            [
                variableDeclarationNode,
                ...statement.statements
            ],
        );
    }

    return context.factory.createBlock([
        variableDeclarationNode,
        statement
    ]);
};