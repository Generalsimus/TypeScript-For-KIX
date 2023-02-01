import { CustomContextType } from "..";
import { isBlock } from "../../../factory/nodeTests";
import { Expression, IfStatement, Node, Statement, Visitor } from "../../../types";
import { createObject } from "../factoryCode/createObject";
import { variableStatement } from "../factoryCode/variableStatement";
import { createBlockVisitor, VariableStateType } from "./utils/createBlockVisitor";

const visitIfStatementBlockNode = createBlockVisitor(<N extends  Node>(node: N, visitor:  Visitor, _: CustomContextType) => {

    return visitor(node);
}, false);


export const VisitIfStatement = (node: IfStatement, visitor:  Visitor, context: CustomContextType,) => {
    const expression = visitor(node.expression) as  Expression;
    const visitedThenStatement = visitIfStatementBlockNode(node.thenStatement, visitor, context);
    const visitedElseStatement = node.elseStatement && visitIfStatementBlockNode(node.elseStatement, visitor, context);



    return context.factory.updateIfStatement(
        node,
        expression,
        statementToBlock(visitedThenStatement[0] as  Statement, visitedThenStatement[1], context),
        visitedElseStatement && statementToBlock(visitedElseStatement[0] as  Statement, visitedElseStatement[1], context),
    )
}



const statementToBlock = (visitedNode:  Statement, variableState: VariableStateType, context: CustomContextType) => {
    if (!visitedNode || !variableState.blockScopeIdentifiers) return visitedNode

    const declarationNode = variableStatement([
        [variableState.blockScopeIdentifiers, createObject([])]
    ]);
    if ( isBlock(visitedNode)) {
        return context.factory.updateBlock(
            visitedNode,
            [declarationNode, ...visitedNode.statements]
        )
    } else {
        return context.factory.createBlock([
            declarationNode,
            visitedNode
        ], true)
    }
} 