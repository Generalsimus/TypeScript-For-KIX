import { CustomContextType } from "..";
import { isBlock } from "../../../factory/nodeTests";
import { DoStatement, NodeFlags, Visitor } from "../../../types";
import { createObject } from "../factoryCode/createObject";
import { variableStatement } from "../factoryCode/variableStatement";
import { createBlockVisitor, VariableStateType } from "./utils/createBlockVisitor";
const doWhileBlockVisitor = createBlockVisitor(<N extends DoStatement["statement"]>(statement: N, visitor: Visitor,  /*, context: CustomContextType */) => {
    return visitor(statement) as typeof statement;
}, false);

export const VisitDoStatement = (node: DoStatement, visitor: Visitor, context: CustomContextType) => {
    const [visitedStatementNode, variableState] = doWhileBlockVisitor(node.statement, visitor, context);
    const expression = visitor(node.expression) as typeof node.expression;


    return context.factory.updateDoStatement(
        node,
        updateStatement(visitedStatementNode, variableState, context),
        expression
    );
};









const updateStatement = (
    statement: DoStatement["statement"],
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
            ]
        );
    }

    return context.factory.createBlock([
        variableDeclarationNode,
        statement
    ]);

};