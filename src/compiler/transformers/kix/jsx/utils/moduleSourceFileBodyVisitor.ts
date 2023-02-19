import { factory } from "../../../../factory/nodeFactory";
import { SourceFile, Visitor } from "../../../../types";
import { visitEachChild } from "../../../../visitorPublic";
import { CustomContextType } from "../..";
import { createObject } from "../../factoryCode/createObject";
import { variableStatement } from "../../factoryCode/variableStatement";
import { createBlockVisitor } from "./createBlockVisitor";

const moduleBodyNodesVisitor = createBlockVisitor(<N extends SourceFile>(sourceFileNode: N, visitor: Visitor, context: CustomContextType) => {

    return visitEachChild(sourceFileNode, visitor, context);
}, /* isGlobalBlock */ true);

export const moduleSourceFileBodyVisitor = (
    sourceFileNode: SourceFile,
    visitor: Visitor,
    context: CustomContextType,
): SourceFile => {

    const [visitedStatements, variableState] = moduleBodyNodesVisitor(sourceFileNode, visitor, context);


    if (variableState.globalScopeIdentifiers) {
        const declarationNode = variableStatement([
            [variableState.globalScopeIdentifiers, createObject([])]
        ]);

        return factory.updateSourceFile(
            sourceFileNode,
            [
                declarationNode,
                ...visitedStatements.statements
            ],
            sourceFileNode.isDeclarationFile,
            sourceFileNode.referencedFiles,
            sourceFileNode.typeReferenceDirectives,
            sourceFileNode.hasNoDefaultLib,
            sourceFileNode.libReferenceDirectives,
        );

    }



    return visitedStatements;
};