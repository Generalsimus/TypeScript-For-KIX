import { CustomContextType } from "..";
import { Node, SourceFile, Visitor } from "../../../types";
import { visitEachChild } from "../../../visitorPublic";
import { moduleSourceFileBodyVisitor } from "./utils/moduleSourceFileBodyVisitor";

export const VisitSourceFile = (node: SourceFile, visitor: Visitor, context: CustomContextType) => {

    const substituteNodesList = context.substituteNodesList = new Map();

    context.addDeclaredIdentifierState = () => { };
    context.addIdentifiersChannelCallback = () => { };

    node = moduleSourceFileBodyVisitor(node, visitor, context);
    if (substituteNodesList.size) {
        const replaceNodesVisitor = (node: Node) => {
            return (substituteNodesList.get(node) || visitEachChild)?.(node, replaceNodesVisitor, context);
        };
        node = visitEachChild(node, replaceNodesVisitor, context);
        substituteNodesList.clear();
    }

    return node;
};