import { factory } from "../../../factory/nodeFactory";
import { isVariableDeclaration, isVariableDeclarationList } from "../../../factory/nodeTests";
import { forEachChildRecursively } from "../../../parser";
import { __String, Declaration, EmitResolver, InterfaceDeclaration, Node, NodeBuilderFlags, NodeFlags, PropertyDeclaration, SourceFile, Statement, SymbolTable, SymbolTracker, SyntaxKind, TypeAliasDeclaration, TypeParameterDeclaration, Visitor } from "../../../types";
import { DeclarationCustomContextType } from "..";
import { arrowFunction } from "../factoryCode/arrowFunction";
import { variableStatement } from "../factoryCode/variableStatement";



const declarationEmitNodeBuilderFlags =
    NodeBuilderFlags.MultilineObjectLiterals |
    NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    NodeBuilderFlags.UseTypeOfFunction |
    NodeBuilderFlags.UseStructuralFallback |
    NodeBuilderFlags.AllowEmptyTuple |
    NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    NodeBuilderFlags.NoTruncation;
const addDeclarationNode = (checkNode: any, addDeclarationNode: ((declareNode: Declaration) => void)) => {
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
const recursivelyAddDeclarationNode = (
    recurseNode: Node,
    addDeclareNode: ((declareNode: Node) => void)
) => {
    addDeclareNode(recurseNode);
    forEachChildRecursively(recurseNode, addDeclareNode);
};
const createDeclarationFullStatement = (
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


    console.log("🚀 --> file: --> :", SyntaxKind[declaration.kind]);
    // declaration.
    switch (declaration.kind) {
        // TypeAliasDeclaration
        case SyntaxKind.TypeParameter:
            const constraint = (declaration as TypeParameterDeclaration).constraint;
            const name = (declaration as TypeParameterDeclaration).name;
            if (constraint) {
                statements.push(factory.createTypeAliasDeclaration(
                    undefined,
                    name,
                    undefined,
                    constraint
                ));

            }
            // case SyntaxKind.InterfaceDeclaration:
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
                    undefined,
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
// const addDeclaration = () => {

// };
// const eachPushRecursively = (declaration: Declaration,) => {

//     forEachChildRecursively(declaration, (node) => {

//         return node;
//     });
// };

const createExportIsolatedBlock = (declaration: Declaration, name: string, _visitor: Visitor, context: DeclarationCustomContextType) => {
    const statements: Statement[] = [];
    const resolver = context.getEmitResolver();
    // context.symbolTracker
    createDeclarationFullStatement(
        declaration,
        statements,
        resolver,
        context.symbolTracker,
    );
    statements.reverse();
    // getDeclarationNodeStatement(declaration, visitor, context),
    statements.push(factory.createReturnStatement(factory.createIdentifier(name)));

    return variableStatement([
        [name, factory.createCallExpression(
            factory.createParenthesizedExpression(arrowFunction(
                undefined,
                statements
            )),
            undefined,
            []
        )]
    ],
        NodeFlags.Const,

        [factory.createToken(SyntaxKind.DeclareKeyword)],
    );
};

const getExportDeclarationVariables = (exportSymbolTable: SymbolTable | undefined, visitor: Visitor, context: DeclarationCustomContextType): Statement[] => {
    const statement: Statement[] = [];
    const propertyDeclaration: PropertyDeclaration[] = [];
    if (exportSymbolTable) {
        exportSymbolTable.forEach((member, definedExportVariable) => {
            if (member.valueDeclaration) {
                statement.push(createExportIsolatedBlock(member.valueDeclaration, definedExportVariable as string, visitor, context));
                propertyDeclaration.push(
                    factory.createPropertyDeclaration(
                        undefined,
                        factory.createIdentifier(definedExportVariable as string),
                        undefined,
                        factory.createTypeQueryNode(
                            factory.createIdentifier(definedExportVariable as string),
                            undefined
                        ),
                        undefined
                    )
                );

                // console.log("🚀 --> file: index.ts:28 --> exportSymbolTable.forEach --> member:", SyntaxKind[member.valueDeclaration.kind]);
            }

        });
    }
    statement.push(
        factory.createClassDeclaration(
            [
                factory.createToken(SyntaxKind.ExportKeyword),
                factory.createToken(SyntaxKind.DefaultKeyword)
            ],
            undefined,
            undefined,
            undefined,
            propertyDeclaration
        )
    );

    return statement;
};
export const declarationTransformers = {
    [SyntaxKind.SourceFile]: (node: SourceFile, visitor: Visitor, context: DeclarationCustomContextType) => {
        const exportedClassMember = node.symbol?.exports?.get("default" as __String)?.members;

        const declarationStatements = getExportDeclarationVariables(exportedClassMember, visitor, context);

        return factory.updateSourceFile(node, [
            ...declarationStatements,
            // ...node.statements,
        ], true);
    },
    // [SyntaxKind.JsxElement]: (node: JsxElement, visitor: Visitor, context: DeclarationCustomContextType) => {
    //     const tagName = node.openingElement.tagName;
    //     if (isIdentifier(tagName) && idText(tagName) === "script") {
    //         const CacheIsScriptTagInsideContent = context.isScriptTagInsideContent;
    //         context.isScriptTagInsideContent = true;

    //         const visitedNode = visitEachChild(node, visitor, context);

    //         context.isScriptTagInsideContent = CacheIsScriptTagInsideContent;

    //         return visitedNode;
    //     }
    // const CacheScriptTagContentNodes = context.scriptTagContentNodes;
    // arrowFunction()
    // callChainFunction();
    // factory.createExpressionStatement(factory.createCallExpression(
    //     factory.createParenthesizedExpression(factory.createArrowFunction(
    //       undefined,
    //       undefined,
    //       [],
    //       undefined,
    //       factory.createToken(SyntaxKind.EqualsGreaterThanToken),
    //       factory.createBlock(
    //         [],
    //         true
    //       )
    //     )),
    //     undefined,
    //     []
    //   ))
    //     return visitEachChild(node, visitor, context);
    // },
    // [SyntaxKind.ArrowFunction]: mainBlockIsInsideScriptTag(visitEachChild),
    // [SyntaxKind.FunctionExpression]: mainBlockIsInsideScriptTag(visitEachChild),
    // [SyntaxKind.FunctionDeclaration]: mainBlockIsInsideScriptTag(visitEachChild),
    // [SyntaxKind.MethodDeclaration]: mainBlockIsInsideScriptTag(visitEachChild),
    // [SyntaxKind.ClassStaticBlockDeclaration]: mainBlockIsInsideScriptTag(visitEachChild),
    // [SyntaxKind.Constructor]: mainBlockIsInsideScriptTag(visitEachChild),
    // [SyntaxKind.ReturnStatement]: (node: ReturnStatement, visitor: Visitor, context: DeclarationCustomContextType) => {
    //     if (context.isScriptTagInsideContent) {
    //         return visitEachChild(node.expression, visitor, context);
    //     }

    //     return visitEachChild(node, visitor, context);
    // },
    // [SyntaxKind.Identifier]: (node: Identifier, visitor: Visitor, context: DeclarationCustomContextType) => {


    //     const valueDeclaration = node.symbol?.valueDeclaration;
    //     console.log("🚀 --> file: index.ts:164 --> node:", node, idText(node));
    //     if (!valueDeclaration) return node;
    //     // const parent = valueDeclaration.parent;
    //     // getNodeSymbol
    //     const ccc = context.getEmitResolver();
    //     switch (valueDeclaration.kind) {
    //         case SyntaxKind.VariableDeclaration: {
    //             // node = node as VariableDeclaration;
    //             if (isVariableDeclaration(valueDeclaration) && valueDeclaration.parent && isVariableDeclarationList(valueDeclaration.parent)) {
    //                 context.declarationsStatement.push(visitEachChild(
    //                     factory.createVariableStatement(
    //                         undefined,
    //                         factory.createVariableDeclarationList(
    //                             [valueDeclaration],
    //                             node.parent.flags
    //                         )
    //                     ),
    //                     visitor,
    //                     context
    //                 )

    //                 );
    //             }
    //             break;
    //         }
    //     }

    // }
    // [SyntaxKind.VariableDeclaration]:
};