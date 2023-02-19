import { JsxElement, JsxFragment, JsxSelfClosingElement, SyntaxKind, Visitor } from "../../../types";
import { CustomContextType } from "..";
import { VisitArrowFunction } from "./ArrowFunction";
import { VisitBinaryExpression } from "./BinaryExpression";
import { VisitCallExpression } from "./CallExpression";
import { VisitClassStaticBlockDeclaration } from "./ClassStaticBlockDeclaration";
import { VisitDoStatement } from "./DoStatement";
import { VisitForInStatement } from "./ForInStatement";
import { VisitForOfStatement } from "./ForOfStatement";
import { VisitForStatement } from "./ForStatement";
import { VisitFunctionDeclaration } from "./FunctionDeclaration";
import { VisitFunctionExpression } from "./FunctionExpression";
import { VisitIdentifier } from "./Identifier";
import { VisitIfStatement } from "./IfStatement";
import { VisitMethodDeclaration } from "./MethodDeclaration";
import { VisitPostfixUnaryExpression } from "./PostfixUnaryExpression";
import { VisitPrefixUnaryExpression } from "./PrefixUnaryExpression";
import { VisitSourceFile } from "./SourceFile";
import { VisitSwitchStatement } from "./SwitchStatement";
import { VisitTryStatement } from "./TryStatement";
import { createJsxChildrenNode } from "./utils/createJsxChildrenNode";
import { VisitJsxToObject } from "./utils/jsxToObject";
import { VisitPropertyAccessExpressionOrElementAccessExpression } from "./utils/PropertyAccessExpressionOrElementAccessExpression";
import { VisitVariableStatement } from "./VariableStatement";
import { VisitWhileStatement } from "./WhileStatement";


export const jsxTransformers = {
    [SyntaxKind.JsxElement]: (node: JsxElement, visitor: Visitor, context: CustomContextType) => {

        const {
            openingElement: {
                tagName,
                attributes
            },
            children
        } = node;

        return VisitJsxToObject(visitor, context, tagName, attributes, children);
    },
    [SyntaxKind.JsxSelfClosingElement]: (node: JsxSelfClosingElement, visitor: Visitor, context: CustomContextType) => {

        return VisitJsxToObject(visitor, context, node.tagName, node.attributes, [] as any);
    },
    [SyntaxKind.JsxFragment]: (node: JsxFragment, visitor: Visitor, context: CustomContextType) => {
        const childrenNode = createJsxChildrenNode(
            visitor,
            context,
            node.children
        );
        return childrenNode || context.factory.createArrayLiteralExpression([], /*multiLine*/ false);
    },
    [SyntaxKind.ArrowFunction]: VisitArrowFunction,
    [SyntaxKind.FunctionExpression]: VisitFunctionExpression,
    [SyntaxKind.FunctionDeclaration]: VisitFunctionDeclaration,
    [SyntaxKind.MethodDeclaration]: VisitMethodDeclaration,
    [SyntaxKind.ClassStaticBlockDeclaration]: VisitClassStaticBlockDeclaration,
    [SyntaxKind.IfStatement]: VisitIfStatement,
    [SyntaxKind.TryStatement]: VisitTryStatement,
    [SyntaxKind.SwitchStatement]: VisitSwitchStatement,
    [SyntaxKind.WhileStatement]: VisitWhileStatement,
    [SyntaxKind.DoStatement]: VisitDoStatement,
    [SyntaxKind.ForStatement]: VisitForStatement,
    [SyntaxKind.ForInStatement]: VisitForInStatement,
    [SyntaxKind.ForOfStatement]: VisitForOfStatement,



    //////////////////////////////////
    // [ts.SyntaxKind.CaseClause]: createLowLevelBlockVisitor(ts.visitEachChild),
    //
    [SyntaxKind.PropertyAccessExpression]: VisitPropertyAccessExpressionOrElementAccessExpression,
    [SyntaxKind.ElementAccessExpression]: VisitPropertyAccessExpressionOrElementAccessExpression,
    [SyntaxKind.CallExpression]: VisitCallExpression,
    [SyntaxKind.Identifier]: VisitIdentifier,
    [SyntaxKind.BinaryExpression]: VisitBinaryExpression,
    [SyntaxKind.VariableStatement]: VisitVariableStatement,
    [SyntaxKind.PostfixUnaryExpression]: VisitPostfixUnaryExpression,
    [SyntaxKind.PrefixUnaryExpression]: VisitPrefixUnaryExpression,
    [SyntaxKind.SourceFile]: VisitSourceFile,
};
