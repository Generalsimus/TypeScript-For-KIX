import { CustomContextType } from "..";
import { isBlock } from "../../../factory/nodeTests";
import { ArrowFunction, ConciseBody, Statement } from "../../../types";
import { getModifiers } from "../../../utilitiesPublic";
import { createGlobalBlockNodesVisitor } from "./utils/createGlobalBlockNodesVisitor";

export const VisitArrowFunction = createGlobalBlockNodesVisitor(
    (visitedNode:  ArrowFunction, declarationVariableNode, context) => {
        // console.log("🚀 --> file: ArrowFunction.ts --> line 7 --> declarationVariableNode", declarationVariableNode);

        return context.factory.updateArrowFunction(
            visitedNode,
            getModifiers(visitedNode),
            visitedNode.typeParameters,
            visitedNode.parameters,
            visitedNode.type,
            visitedNode.equalsGreaterThanToken,
            ConciseBodyToMultiLineBlock(visitedNode.body, context, [
                declarationVariableNode,
            ]),
        );
    }
);

const ConciseBodyToMultiLineBlock = (body:  ConciseBody, context: CustomContextType, addStatement:  Statement[] = []) => {
    if (isBlock(body)) {
        return context.factory.updateBlock(body, [...addStatement, ...body.statements]);
    }

    return context.factory.createBlock([
        ...addStatement,
        context.factory.createReturnStatement(body)
    ], true);
};