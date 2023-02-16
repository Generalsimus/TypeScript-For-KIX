
import { isIdentifier, isObjectBindingPattern } from "../../../factory/nodeTests";
import { BindingElement, ExportSpecifier, Identifier, ParameterDeclaration, VariableDeclaration } from "../../../types";
import { idText } from "../../../utilitiesPublic";

interface DeclarationIdentifierState {
    declarationIdentifier: Identifier,
    insiderDeclarationIdentifiers: Identifier[]
}
export const getVariableDeclarationIdentifiers = (node: ParameterDeclaration | ExportSpecifier | BindingElement | VariableDeclaration, currentThree: Identifier[] = [], three: Record<string, DeclarationIdentifierState> = {}) => {
    const currentThreeList = [...currentThree];
    const identifierName = ((node as any).propertyName || node.name);
    if (isIdentifier(identifierName)) {
        currentThreeList.push(identifierName);

        if (isIdentifier(node.name)) {
            three[idText(node.name)] = {
                declarationIdentifier: node.name,
                insiderDeclarationIdentifiers: currentThreeList
            };
        }

    }

    if (node && isObjectBindingPattern(node.name)) {

        for (const element of node.name.elements) {
            getVariableDeclarationIdentifiers(element, [...currentThreeList], three);
        }

    }
    return three;
};
