import { factory } from "../../../factory/nodeFactory";
import { __String, SourceFile, SyntaxKind, Visitor } from "../../../types";
import { DeclarationCustomContextType } from "..";
import { getExportDeclarationVariables } from "./utils/getExportDeclarationVariables";






export const declarationTransformers = {
    [SyntaxKind.SourceFile]: (node: SourceFile, visitor: Visitor, context: DeclarationCustomContextType) => {
        const exportedClassMember = node.symbol?.exports?.get("default" as __String)?.members;

        const declarationStatements = getExportDeclarationVariables(exportedClassMember, visitor, context);

        return factory.updateSourceFile(node, [
            ...declarationStatements,
        ], /* isDeclarationFile */ true);
    },
};