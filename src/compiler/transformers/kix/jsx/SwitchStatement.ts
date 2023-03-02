import { isDefaultClause } from "../../../factory/nodeTests";
import { CaseOrDefaultClause, Expression, NodeArray, Statement, SwitchStatement, Visitor } from "../../../types";
import { isStatement } from "../../../utilitiesPublic";
import { visitNodes } from "../../../visitorPublic";
import { CustomContextType } from "..";
import { createObject } from "../factoryCode/createObject";
import { variableStatement } from "../factoryCode/variableStatement";
import { createBlockVisitor, VariableStateType } from "./utils/createBlockVisitor";


const SwitchStatementBlockVisitor = createBlockVisitor(<N extends NodeArray<Statement>>(nodes: N, visitor: Visitor, _: CustomContextType): NodeArray<Statement> => {

    return visitNodes(nodes, visitor, isStatement);
},  /* isGlobalBlock */ false);

export const VisitSwitchStatement = (
    node: SwitchStatement,
    visitor: Visitor,
    context: CustomContextType
) => {
    // statement
    const clauses: CaseOrDefaultClause[] = node.caseBlock.clauses.map(caseBlockNode => {
        const [visitedStatementNode, variableState] = SwitchStatementBlockVisitor(caseBlockNode.statements, visitor, context);
        const updatedStatements = updateCaseOrDefaultClauseStatements(visitedStatementNode, variableState);
        if (isDefaultClause(caseBlockNode)) {
            return context.factory.updateDefaultClause(
                caseBlockNode,
                updatedStatements
            );
        }
        return context.factory.updateCaseClause(
            caseBlockNode,
            visitor(caseBlockNode.expression) as Expression,
            updatedStatements
        );
    });

    return context.factory.updateSwitchStatement(
        node,
        visitor(node.expression) as Expression,
        context.factory.updateCaseBlock(
            node.caseBlock,
            clauses
        ),
    );
};


const updateCaseOrDefaultClauseStatements = (statements: NodeArray<Statement>, variableState: VariableStateType) => {
    if (variableState.blockScopeIdentifiers) {
        return [
            variableStatement([
                [variableState.blockScopeIdentifiers, createObject([])]
            ]),
            ...statements
        ];
    }

    return statements;
};
