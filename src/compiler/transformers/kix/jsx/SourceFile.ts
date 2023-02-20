import { LanguageVariant, Node, SourceFile, Visitor } from "../../../types";
import { visitEachChild } from "../../../visitorPublic";
import { CustomContextType } from "..";
import { createKJSDefaultExportClassForSourceFile } from "./factoryTransforms/createKJSDefaultExportClassForSourceFile";
import { moduleSourceFileBodyVisitor } from "./utils/moduleSourceFileBodyVisitor";

export const VisitSourceFile = (node: SourceFile, visitor: Visitor, context: CustomContextType) => {

    const substituteNodesList = context.substituteNodesList = new Map();

    context.addDeclaredIdentifierState = () => { };
    context.addIdentifiersChannelCallback = () => { };
    context.languageVariant = node.languageVariant;

    if (node.languageVariant === LanguageVariant.KJS) {
        node = createKJSDefaultExportClassForSourceFile(node);
    }

    node = moduleSourceFileBodyVisitor(node, visitor, context);
    if (substituteNodesList.size) {
        const replaceNodesVisitor = (node: Node) => {
            return (substituteNodesList.get(node) || visitEachChild)?.(node, replaceNodesVisitor, context);
        };
        node = visitEachChild(node, replaceNodesVisitor, context);
        substituteNodesList.clear();
    }

    return node;
};