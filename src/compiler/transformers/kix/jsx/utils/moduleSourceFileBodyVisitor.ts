import { CustomContextType } from "../.."
import { SourceFile, Visitor } from "../../../../types";
import { visitEachChild } from "../../../../visitorPublic";
import { createObject } from "../../factoryCode/createObject";
import { variableStatement } from "../../factoryCode/variableStatement";
import { createBlockVisitor } from "./createBlockVisitor"; 

const moduleBodyNodesVisitor = createBlockVisitor(<N extends SourceFile>(sourceFileNode: N, visitor: Visitor, context: CustomContextType) => {

    return visitEachChild(sourceFileNode, visitor, context);
}, true);

export const moduleSourceFileBodyVisitor = (
    sourceFileNode: SourceFile,
    visitor: Visitor,
    context: CustomContextType,
): SourceFile => {

    let [visitedStatements, variableState] = moduleBodyNodesVisitor(sourceFileNode, visitor, context)


    if (variableState.globalScopeIdentifiers) {
        const declarationNode = variableStatement([
            [variableState.globalScopeIdentifiers, createObject([])]
        ])

        return context.factory.updateSourceFile(
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
        )

    }



    return visitedStatements
} 