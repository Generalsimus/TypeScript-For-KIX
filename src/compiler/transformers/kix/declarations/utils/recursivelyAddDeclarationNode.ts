import { forEachChildRecursively } from "../../../../parser";
import { Node } from "../../../../types";

export const recursivelyAddDeclarationNode = (
    recurseNode: Node,
    addDeclareNode: ((declareNode: Node) => void)
) => {
    addDeclareNode(recurseNode);
    forEachChildRecursively(recurseNode, addDeclareNode);
};