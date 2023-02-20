import { factory } from "../../../../factory/nodeFactory";
import { isExpressionStatement, isJsxFragment } from "../../../../factory/nodeTests";
import { JsxFragment, SourceFile, SyntaxKind } from "../../../../types";


export const createKJSDefaultExportClassForSourceFile = (sourceFile: SourceFile): SourceFile => {
    let JsxFragmentNode: JsxFragment | undefined;
    for(const node of sourceFile.statements){
        if(isJsxFragment(node)){
            JsxFragmentNode = node;
            break;
        }
        else if(isExpressionStatement(node) && isJsxFragment(node.expression)){
            JsxFragmentNode = node.expression;
            break;
        }
    }

    return factory.updateSourceFile(sourceFile, [
        factory.createClassDeclaration(
            [
              factory.createToken(SyntaxKind.ExportKeyword),
              factory.createToken(SyntaxKind.DefaultKeyword)
            ],
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            /*heritageClauses*/ undefined,
            [factory.createMethodDeclaration(
              /*modifiers*/ undefined,
              /*asteriskToken*/ undefined,
              factory.createIdentifier("render"),
              /*questionToken*/ undefined,
              /*typeParameters*/ undefined,
              [],
              /*type*/ undefined,
              factory.createBlock(
                [factory.createReturnStatement(JsxFragmentNode?JsxFragmentNode:factory.createNull())],
                /*multiLine*/ true
              )
            )]
          )
    ]);
};