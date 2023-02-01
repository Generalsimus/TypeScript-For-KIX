import { factory } from "../../../factory/nodeFactory";
import { BindingName, Expression, NodeFlags } from "../../../types";


export const variableStatement = (Nodes: [ BindingName | string,  Expression][], flag =  NodeFlags.Const) => {

    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            Nodes.map(([NameNode, ValueNode]) => {
                return factory.createVariableDeclaration(
                    NameNode,
                    undefined,
                    undefined,
                    ValueNode
                );
            }),
            flag
        )
    );
};