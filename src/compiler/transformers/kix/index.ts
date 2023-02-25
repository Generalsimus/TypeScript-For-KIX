import { Bundle, Identifier, LanguageVariant, Node, NodeFlags, SourceFile, ThisExpression, TransformationContext, TransformerFactory, Visitor } from "../../types";
import { chainBundle } from "../utilities";
import { declarationTransformers } from "./declarations";
import { jsxTransformers } from "./jsx";
import { getVisitor } from "./utils/getVisitor";



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

const getNodeVisitor = getVisitor(jsxTransformers) as TransformerFactory<SourceFile>;


export function transformKix(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const visitor = getNodeVisitor(context);

    return chainBundle(context, (sourceFile: SourceFile) => {
        const languageVariant = sourceFile?.languageVariant;

        if (languageVariant === LanguageVariant.JSX || languageVariant === LanguageVariant.KJS) {

            return visitor(sourceFile);
        }
        return sourceFile;
    });
}


export interface DeclarationCustomContextType extends TransformationContext {
    isScriptTagInsideContent: boolean,
    // scriptTagContentNodes: Statement[]
}
const getDeclarationNodeVisitor = getVisitor(declarationTransformers) as TransformerFactory<SourceFile>;
export function transformKixDeclaration(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const visitor = getDeclarationNodeVisitor(context);

    return chainBundle(context, (sourceFile: SourceFile) => {
        const languageVariant = sourceFile?.languageVariant;

        if (languageVariant === LanguageVariant.KJS) {
            return visitor(sourceFile);
        }
        return sourceFile;
    });
}
