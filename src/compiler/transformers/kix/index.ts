// import { factory } from "../../factory/nodeFactory";
import { getTypeNode } from "../../factory/emitNode";
import { factory } from "../../factory/nodeFactory";
import { SyntaxKind } from "../../types";
import { Bundle, Identifier, LanguageVariant, Node, NodeArray, NodeFlags, SourceFile, ThisExpression, TransformationContext, TransformerFactory, Visitor } from "../../types";
import { chainBundle } from "../utilities";
import { jsxTransformers } from "./jsx";
import { getVisitor } from "./utils/getVisitor";
// import { chainBundle } from "./utilities";



export type VisitEachType = <N extends Node>(node: N, nodeVisitor: Visitor, context: CustomContextType) => N;
export interface IdentifiersStateType {
    isDynamicJsx: boolean,
    isChanged: boolean,
    declaredFlag: NodeFlags | undefined,
    defaultPropertyName: string | undefined,
    defaultDeclareNameNode: ThisExpression | Identifier | undefined,
    substituteCallback: (indexIdToUniqueString: string, declarationIdentifier: ThisExpression | Identifier) => void,
}
export type DeclaredBlockIdentifiersType = Map<string, IdentifiersStateType>;
export interface CustomContextType extends TransformationContext {
    getJSXPropRegistrationIdentifier?: () => Identifier
    /* JSX ში მოთავხებული .? უსაფრთხოებისთვის როდესაც ხდება რეგისტრაცია და ასევესაჭიროა მისი გაშვებაც ნიმუში: ssss?.() */
    JsxHaveQuestionDotToken?: Node


    getVariableUniqueIdentifier: (flag: NodeFlags) => Identifier
    // | ThisExpression
    substituteNodesList: Map<Node, (node: Node, substituteVisitor: Visitor, context: Visitor) => Node | Node[]>



    addDeclaredIdentifierState: (identifierName: string, identifierState?: IdentifiersStateType) => void
    addIdentifiersChannelCallback: (identifierName: string, addCallback: (identifierState: IdentifiersStateType) => void) => void

    languageVariant: LanguageVariant
}
// export interface CustomContextTypeExperimental extends CustomContextType {
//     substituteChannelCallback: () => void
//     addSubstituteCallBack: <N extends (Node | Node[] | NodeArray<Node>) >(node: N, callback: (node: N) => N | undefined) => void
//     languageVariant: LanguageVariant
// }

const getNodeVisitor = getVisitor(jsxTransformers) as TransformerFactory<SourceFile>;


export function transformKix(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const visitor = getNodeVisitor(context);

    return chainBundle(context, (sourceFile: SourceFile) => {
        const languageVariant = sourceFile?.languageVariant;
        //    console.log("🚀 --> file: index.ts:43 --> returnchainBundle --> sourceFile", sourceFile.fileName, LanguageVariant[languageVariant] );

        if (languageVariant === LanguageVariant.JSX || languageVariant === LanguageVariant.KJS) {

            return visitor(sourceFile);
        }
        return sourceFile;
    });
}
const getDeclarationNodeVisitor = getVisitor({
    [SyntaxKind.SourceFile]: (node: SourceFile, visitor: Visitor, context: CustomContextType) => {
        console.log("🚀 --> file: index.ts:66 --> node:", node);
        // getTypeNode
        // if(node.l\)
        for (const declarationNode of (node.kixExportedProps || [])) {
            // console.log("🚀 --> file: index.ts:68 --> declarationNode:", getTypeNode(declarationNode));
            
        }
        // factory.updateSourceFile(
        //     node,
        //     []
        // );
        return node;
    }
}) as TransformerFactory<SourceFile>;


export function transformKixDeclaration(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const visitor = getDeclarationNodeVisitor(context);

    return chainBundle(context, (sourceFile: SourceFile) => {
        const languageVariant = sourceFile?.languageVariant;
        //    console.log("🚀 --> file: index.ts:43 --> returnchainBundle --> sourceFile", sourceFile.fileName, LanguageVariant[languageVariant] );

        if (languageVariant === LanguageVariant.KJS) {

            return visitor(sourceFile);
        }
        return sourceFile;
    });
}