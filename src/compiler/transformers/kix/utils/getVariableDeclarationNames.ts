import { isIdentifier, isObjectBindingPattern } from "../../../factory/nodeTests";
import { BindingElement, ExportSpecifier, ParameterDeclaration, VariableDeclaration } from "../../../types";
import { idText } from "../../../utilitiesPublic";


export const getVariableDeclarationNames = (node: ParameterDeclaration | ExportSpecifier | BindingElement | VariableDeclaration, currentThree: string[] = [], three: Record<string, string[]> = {}) => {
    const currentThreeList = [...currentThree];
    const identifierName = ((node as any).propertyName || node.name);
    if (isIdentifier(identifierName)) {
        currentThreeList.push(idText(identifierName));

        if (isIdentifier(node.name)) {
            // context.factory.getGeneratedNameForNode(node, GeneratedIdentifierFlags.AllowNameSubstitution)
            three[idText(node.name)] = currentThreeList;
        }

    }

    if (node && isObjectBindingPattern(node.name)) {

        for (const element of node.name.elements) {
            getVariableDeclarationNames(element, [...currentThreeList], three);
        }

    }
    return three;
};