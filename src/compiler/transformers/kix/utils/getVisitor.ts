import { Node, VisitResult } from "../../../types";
import { visitEachChild } from "../../../visitorPublic";
import { CustomContextType } from "..";
import { declarationTransformers } from "../declarations";
import { jsxTransformers } from "../jsx";

export const getVisitor = (transforms: typeof jsxTransformers | typeof declarationTransformers) => (context: CustomContextType) => {


    const visitor = <N extends Node>(node: N): VisitResult<N> => {

        return ((transforms as any)[node.kind] || visitEachChild)(node, visitor, context);
    };

    return visitor;

};