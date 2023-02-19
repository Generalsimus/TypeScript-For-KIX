import { FunctionExpression } from "../../../types";
import { getModifiers } from "../../../utilitiesPublic";
import { createGlobalBlockNodesVisitor } from "./utils/createGlobalBlockNodesVisitor";



export const VisitFunctionExpression = createGlobalBlockNodesVisitor(
    (visitedNode: FunctionExpression, declarationNode, context) => {
        return context.factory.updateFunctionExpression(
            visitedNode,
             getModifiers(visitedNode),
            visitedNode.asteriskToken,
            visitedNode.name,
            visitedNode.typeParameters,
            visitedNode.parameters,
            visitedNode.type,
            context.factory.updateBlock(
                visitedNode.body,
                [
                    declarationNode,
                    ...visitedNode.body.statements
                ]
            ),

        );
    }
);
