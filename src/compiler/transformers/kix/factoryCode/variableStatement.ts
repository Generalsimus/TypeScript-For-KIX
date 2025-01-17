import { factory } from "../../../factory/nodeFactory";
import { BindingName, Expression, ModifierLike, NodeFlags } from "../../../types";



export const variableStatement = (nodes: [BindingName | string, Expression][], flag = NodeFlags.Const, modifiers: ModifierLike[] | undefined = undefined) => {

    return factory.createVariableStatement(
        modifiers,
        factory.createVariableDeclarationList(
            nodes.map(([nameNode, valueNode]) => {
                return factory.createVariableDeclaration(
                    nameNode,
                     /* exclamationToken */ undefined,
                     /* type */ undefined,
                    valueNode
                );
            }),
            flag
        )
    );
};