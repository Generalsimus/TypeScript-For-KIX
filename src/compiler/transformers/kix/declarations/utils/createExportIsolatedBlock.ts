import { factory } from "../../../../factory/nodeFactory";
import { Declaration, NodeFlags, Statement, SyntaxKind, Visitor } from "../../../../types";
import { DeclarationCustomContextType } from "../..";
import { arrowFunction } from "../../factoryCode/arrowFunction";
import { variableStatement } from "../../factoryCode/variableStatement";
import { createDeclarationFullStatement } from "./createDeclarationFullStatement";

export const createExportIsolatedBlock = (declaration: Declaration, name: string, _visitor: Visitor, context: DeclarationCustomContextType) => {
    const statements: Statement[] = [];
    const resolver = context.getEmitResolver();

    createDeclarationFullStatement(
        declaration,
        statements,
        resolver,
        context.symbolTracker,
    );
    statements.reverse();

    statements.push(factory.createReturnStatement(factory.createIdentifier(name)));

    return variableStatement([
        [name, factory.createCallExpression(
            factory.createParenthesizedExpression(arrowFunction(
               /* params */ undefined,
                statements
            )),
             /* typeArgument */ undefined,
            []
        )]
    ],
        NodeFlags.Const,

        [factory.createToken(SyntaxKind.DeclareKeyword)],
    );
};
