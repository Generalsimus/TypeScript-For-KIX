import { factory } from "../../../factory/nodeFactory";
import { isIdentifier } from "../../../factory/nodeTests";
import { JsxElement, Node, ReturnStatement, SourceFile, SyntaxKind, Visitor } from "../../../types";
import { idText } from "../../../utilitiesPublic";
import { visitEachChild } from "../../../visitorPublic";
import { DeclarationCustomContextType } from "..";
// visitEachNode
const mainBlockIsInsideScriptTag = <C extends DeclarationCustomContextType, N extends Node>(visitEachNode: typeof visitEachChild) => {

    return (node: N, visitor: Visitor, context: C) => {
        const CacheIsScriptTagInsideContent = context.isScriptTagInsideContent;
        context.isScriptTagInsideContent = false;

        const result = visitEachNode(node, visitor, context);
        context.isScriptTagInsideContent = CacheIsScriptTagInsideContent;
        return result;
    };
};

const visitSourceFile = mainBlockIsInsideScriptTag<DeclarationCustomContextType, SourceFile>(visitEachChild);
export const declarationTransformers = {
    [SyntaxKind.SourceFile]: (node: SourceFile, visitor: Visitor, context: DeclarationCustomContextType) => {
        const visitedSourceFile = visitSourceFile(node, visitor, context);
        console.log("🚀 --> file: index.ts:23 --> visitedSourceFile:", visitedSourceFile);

        return factory.updateSourceFile(visitedSourceFile, [
            // ...visitedSourceFile.statements,
            factory.createClassDeclaration(
                [factory.createToken(SyntaxKind.DeclareKeyword)],
                factory.createIdentifier("AbstractComponent"),
                [factory.createTypeParameterDeclaration(
                    undefined,
                    factory.createIdentifier("Model"),
                    factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    undefined
                )],
                undefined,
                [
                    factory.createPropertyDeclaration(
                        undefined,
                        factory.createIdentifier("children"),
                        undefined,
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                        undefined
                    ),
                    factory.createPropertyDeclaration(
                        [factory.createToken(SyntaxKind.PrivateKeyword)],
                        factory.createIdentifier("____$$$$$$$$$$$Props"),
                        undefined,
                        factory.createTypeReferenceNode(
                            factory.createIdentifier("Model"),
                            undefined
                        ),
                        undefined
                    )
                ]
            ),
            factory.createExportAssignment(
                undefined,
                undefined,
                factory.createParenthesizedExpression(factory.createAsExpression(
                    factory.createClassExpression(
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        []
                    ),
                    factory.createConstructorTypeNode(
                        undefined,
                        [factory.createTypeParameterDeclaration(
                            undefined,
                            factory.createIdentifier("Model"),
                            undefined,
                            factory.createTypeLiteralNode([])
                        )],
                        [],
                        factory.createIntersectionTypeNode([
                            factory.createTypeReferenceNode(
                                factory.createIdentifier("Model"),
                                undefined
                            ),
                            factory.createTypeReferenceNode(
                                factory.createIdentifier("AbstractComponent"),
                                [factory.createTypeReferenceNode(
                                    factory.createIdentifier("Model"),
                                    undefined
                                )]
                            )
                        ])
                    )
                ))
            )
        ]);
        // const updatedNode = factory.updateSourceFile(visitedSourceFile, [
        //     ...visitedSourceFile.statements,
        //     factory.createClassDeclaration(
        //         factory.createNodeArray([factory.createToken(SyntaxKind.AbstractKeyword)]),
        //         factory.createIdentifier("AbstractComponent"),
        //         factory.createNodeArray([factory.createTypeParameterDeclaration(
        //             undefined,
        //             factory.createIdentifier("Model"),
        //             factory.createTypeReferenceNode(
        //                 factory.createIdentifier("Record"),
        //                 factory.createNodeArray([
        //                     factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
        //                     factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
        //                 ])
        //             ),
        //             undefined
        //         )]),
        //         undefined,
        //         factory.createNodeArray([
        //             factory.createPropertyDeclaration(
        //                 undefined,
        //                 factory.createIdentifier("children"),
        //                 undefined,
        //                 factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
        //                 undefined
        //             ),
        //             factory.createPropertyDeclaration(
        //                 factory.createNodeArray([factory.createToken(SyntaxKind.PrivateKeyword)]),
        //                 factory.createIdentifier("____$$$$$$$$$$$Props"),
        //                 undefined,
        //                 factory.createTypeReferenceNode(
        //                     factory.createIdentifier("Model"),
        //                     undefined
        //                 ),
        //                 undefined
        //             )
        //         ])
        //     ),
        //     factory.createClassDeclaration(
        //         factory.createNodeArray([
        //             factory.createToken(SyntaxKind.ExportKeyword),
        //             factory.createToken(SyntaxKind.DefaultKeyword)
        //         ]),
        //         factory.createIdentifier("Component"),
        //         undefined,
        //         undefined,
        //         factory.createNodeArray([])
        //     ),
        //     factory.createExpressionStatement(factory.createIdentifier("as")),
        //     factory.createExpressionStatement(factory.createBinaryExpression(
        //         factory.createNewExpression(
        //             factory.createIdentifier(""),
        //             undefined,
        //             undefined
        //         ),
        //         factory.createToken(SyntaxKind.LessThanToken),
        //         factory.createIdentifier("Model")
        //     )),
        //     factory.createBlock(
        //         factory.createNodeArray([]),
        //         false
        //     ),
        //     factory.createExpressionStatement(factory.createBinaryExpression(
        //         factory.createIdentifier(""),
        //         factory.createToken(SyntaxKind.GreaterThanToken),
        //         factory.createParenthesizedExpression(factory.createIdentifier(""))
        //     )),
        //     factory.createExpressionStatement(factory.createBinaryExpression(
        //         factory.createIdentifier("Model"),
        //         factory.createToken(SyntaxKind.AmpersandToken),
        //         factory.createExpressionWithTypeArguments(
        //             factory.createIdentifier("AbstractComponent"),
        //             factory.createNodeArray([factory.createTypeReferenceNode(
        //                 factory.createIdentifier("Model"),
        //                 undefined
        //             )])
        //         )
        //     ))
        // ]);
        // forEachChildRecursively(setParentRecursive(updatedNode, true), (node, parent) => {
        //     if (node.original) {
        //         return "skip";
        //     }
        //     node.original = node;
        //     return node;
        // });
        // console.log("🚀 --> file: index.ts:115 --> res:", updatedNode);
        // return updatedNode;
    },
    [SyntaxKind.JsxElement]: (node: JsxElement, visitor: Visitor, context: DeclarationCustomContextType) => {
        const tagName = node.openingElement.tagName;
        if (isIdentifier(tagName) && idText(tagName) === "script") {
            const CacheIsScriptTagInsideContent = context.isScriptTagInsideContent;
            context.isScriptTagInsideContent = true;

            const visitedNode = visitEachChild(node, visitor, context);

            context.isScriptTagInsideContent = CacheIsScriptTagInsideContent;

            return visitedNode;
        }
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
        return visitEachChild(node, visitor, context);
    },
    [SyntaxKind.ArrowFunction]: mainBlockIsInsideScriptTag(visitEachChild),
    [SyntaxKind.FunctionExpression]: mainBlockIsInsideScriptTag(visitEachChild),
    [SyntaxKind.FunctionDeclaration]: mainBlockIsInsideScriptTag(visitEachChild),
    [SyntaxKind.MethodDeclaration]: mainBlockIsInsideScriptTag(visitEachChild),
    [SyntaxKind.ClassStaticBlockDeclaration]: mainBlockIsInsideScriptTag(visitEachChild),
    [SyntaxKind.Constructor]: mainBlockIsInsideScriptTag(visitEachChild),


    [SyntaxKind.ReturnStatement]: (node: ReturnStatement, visitor: Visitor, context: DeclarationCustomContextType) => {
        if (context.isScriptTagInsideContent) {
            return visitEachChild(node.expression, visitor, context);
        }

        return visitEachChild(node, visitor, context);
    },
};
