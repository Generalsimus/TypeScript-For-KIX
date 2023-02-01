import { CustomContextType } from "..";
import { Node, VisitResult } from "../../../types";
import { visitEachChild } from "../../../visitorPublic";
import { jsxTransformers } from "../jsx";

export const getVisitor = (transforms: typeof jsxTransformers) => (context: CustomContextType) => {


    const visitor = <N extends  Node>(node: N):  VisitResult<N> => {

        return ((transforms as any)[node.kind] ||  visitEachChild)(node, visitor, context)
    }

    return visitor

}