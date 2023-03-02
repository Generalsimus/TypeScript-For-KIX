import { factory } from "../../../../factory/nodeFactory";
import { isVariableDeclaration, isVariableDeclarationList } from "../../../../factory/nodeTests";
import { Declaration, EmitResolver, InterfaceDeclaration, Node, NodeBuilderFlags, Statement, SymbolTracker, SyntaxKind, TypeAliasDeclaration, TypeParameterDeclaration } from "../../../../types";
import { addDeclarationNode } from "./addDeclarationNode";
import { recursivelyAddDeclarationNode } from "./recursivelyAddDeclarationNode";



const declarationEmitNodeBuilderFlags =
    NodeBuilderFlags.MultilineObjectLiterals |
    NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    NodeBuilderFlags.UseTypeOfFunction |
    NodeBuilderFlags.UseStructuralFallback |
    NodeBuilderFlags.AllowEmptyTuple |
    NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    NodeBuilderFlags.NoTruncation;



export const createDeclarationFullStatement = (
    declaration: Declaration,
    statements: Statement[],
    resolver: EmitResolver,
    symbolTracker: SymbolTracker,
    checkedSet = new Set<Node>(),
    addDeclareNode = (node: Node) => {
        addDeclarationNode(node, (declarationNode) => {
            createDeclarationFullStatement(declarationNode, statements, resolver, symbolTracker, checkedSet, addDeclareNode);
        });
    }
) => {
    if (checkedSet.has(declaration)) return;
    checkedSet.add(declaration);



    switch (declaration.kind) {
        case SyntaxKind.TypeParameter:
            const constraint = (declaration as TypeParameterDeclaration).constraint;
            const name = (declaration as TypeParameterDeclaration).name;
            if (constraint) {
                statements.push(factory.createTypeAliasDeclaration(
                     /* modifiers */ undefined,
                    name,
                     /* typeParameters */ undefined,
                    constraint
                ));

            }

            break;
        case SyntaxKind.TypeAliasDeclaration:
            statements.push(declaration as TypeAliasDeclaration);
            break;
        case SyntaxKind.InterfaceDeclaration:
            statements.push(declaration as InterfaceDeclaration);
            break;
        case SyntaxKind.VariableDeclaration: {

            if (isVariableDeclaration(declaration) && declaration.parent && isVariableDeclarationList(declaration.parent)) {
                const typeNode = resolver.createTypeOfDeclaration(declaration, declaration, declarationEmitNodeBuilderFlags, symbolTracker);


                const updatedDeclaration = factory.updateVariableDeclaration(
                    declaration,
                    declaration.name,
                    declaration.exclamationToken,
                    typeNode,
                     /* initializer */ undefined,
                );
                statements.push(factory.createVariableStatement(
                    [factory.createToken(SyntaxKind.DeclareKeyword)],
                    factory.createVariableDeclarationList(
                        [
                            updatedDeclaration
                        ],
                        declaration.parent.flags
                    )
                ));

                declaration = updatedDeclaration;
            }
        }

    }
    recursivelyAddDeclarationNode(
        declaration,
        addDeclareNode
    );
};