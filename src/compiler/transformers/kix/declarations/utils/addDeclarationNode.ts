import { Declaration } from "../../../../types";

export const addDeclarationNode = (checkNode: any, addDeclarationNode: ((declareNode: Declaration) => void)) => {
    if (checkNode.symbol === undefined) return;
    const declarations = checkNode.symbol.declarations;
    const valueDeclaration = checkNode.symbol.valueDeclaration;
    if (valueDeclaration) {
        addDeclarationNode(valueDeclaration);
    }
    if (declarations) {
        for (const declaration of declarations) {
            addDeclarationNode(declaration);
        }
    }
};