import { MethodDeclaration } from "../../../types";
import { getModifiers } from "../../../utilitiesPublic";
import { createGlobalBlockNodesVisitor } from "./utils/createGlobalBlockNodesVisitor";


export const VisitMethodDeclaration = createGlobalBlockNodesVisitor(
    (visitedNode: MethodDeclaration, declarationNode, context) => {

        
        return context.factory.updateMethodDeclaration(
            visitedNode,
            getModifiers(visitedNode),
            visitedNode.asteriskToken,
            visitedNode.name,
            visitedNode.questionToken,
            visitedNode.typeParameters,
            visitedNode.parameters,
            visitedNode.type,
            visitedNode.body && context.factory.updateBlock(
                visitedNode.body,
                [
                    declarationNode,
                    ...visitedNode.body.statements
                ]
            ),
        );
    }
)
