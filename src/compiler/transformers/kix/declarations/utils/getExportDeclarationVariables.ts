import { factory } from "../../../../factory/nodeFactory";
import { PropertyDeclaration, Statement, SymbolTable, SyntaxKind, Visitor } from "../../../../types";
import { DeclarationCustomContextType } from "../..";
import { createExportIsolatedBlock } from "./createExportIsolatedBlock";

export const getExportDeclarationVariables = (exportSymbolTable: SymbolTable | undefined, visitor: Visitor, context: DeclarationCustomContextType): Statement[] => {
    const statement: Statement[] = [];
    const propertyDeclaration: PropertyDeclaration[] = [];
    if (exportSymbolTable) {
        exportSymbolTable.forEach((member, definedExportVariable) => {
            if (member.valueDeclaration) {
                statement.push(createExportIsolatedBlock(member.valueDeclaration, definedExportVariable as string, visitor, context));
                propertyDeclaration.push(
                    factory.createPropertyDeclaration(
                        /* modifiers */ undefined,
                        factory.createIdentifier(definedExportVariable as string),
                         /* questionOrExclamationToken */ undefined,
                        factory.createTypeQueryNode(
                            factory.createIdentifier(definedExportVariable as string),
                             /* typeArgument */ undefined
                        ),
                         /* initializer */ undefined
                    )
                );


            }

        });
    }
    statement.push(
        factory.createClassDeclaration(
            [
                factory.createToken(SyntaxKind.ExportKeyword),
                factory.createToken(SyntaxKind.DefaultKeyword)
            ],
             /* name */ undefined,
             /* typeParameters */ undefined,
             /* heritageClauses */ undefined,
            propertyDeclaration
        )
    );

    return statement;
};