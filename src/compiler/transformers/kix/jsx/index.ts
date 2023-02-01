import { CustomContextType } from "..";
import { VisitArrowFunction } from "./ArrowFunction";
import { VisitBinaryExpression } from "./BinaryExpression";
import { VisitFunctionDeclaration } from "./FunctionDeclaration";
import { VisitFunctionExpression } from "./FunctionExpression";
import { VisitIdentifier } from "./Identifier";
import { VisitJsxToObject } from "./jsxToObject";
import { VisitCallExpression } from "./CallExpression";
import { createJsxChildrenNode } from "./utils/createJsxChildrenNode";
import { VisitPropertyAccessExpressionOrElementAccessExpression } from "./utils/PropertyAccessExpressionOrElementAccessExpression";
import { VisitVariableStatement } from "./VariableStatement";
import { VisitIfStatement } from "./IfStatement";
import { VisitSwitchStatement } from "./SwitchStatement";
import { VisitForStatement } from "./ForStatement";
import { VisitForInStatement } from "./ForInStatement";
import { VisitForOfStatement } from "./ForOfStatement";
import { VisitMethodDeclaration } from "./MethodDeclaration";
import { VisitClassStaticBlockDeclaration } from "./ClassStaticBlockDeclaration";
import { VisitTryStatement } from "./TryStatement";
import { VisitWhileStatement } from "./WhileStatement";
import { VisitPostfixUnaryExpression } from "./PostfixUnaryExpression";
import { VisitPrefixUnaryExpression } from "./PrefixUnaryExpression";
import { VisitSourceFile } from "./SourceFile";
import { VisitDoStatement } from "./DoStatement";
import { JsxElement, JsxFragment, JsxSelfClosingElement, SyntaxKind, Visitor } from "../../../types";


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
        return childrenNode || context.factory.createArrayLiteralExpression([], false);
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
