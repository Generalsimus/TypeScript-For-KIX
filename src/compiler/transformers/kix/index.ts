import { BindingElement, Bundle, CallSignatureDeclaration, ConstructSignatureDeclaration, FunctionDeclaration, GetAccessorDeclaration, Identifier, LanguageVariant, MethodDeclaration, MethodSignature, Node, NodeFlags, ParameterDeclaration, PropertyDeclaration, PropertySignature, SetAccessorDeclaration, SourceFile, Statement, SymbolTracker, ThisExpression, TransformationContext, TransformerFactory, TypeNode, VariableDeclaration, Visitor } from "../../types";
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

type HasInferredType =
    | FunctionDeclaration
    | MethodDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | BindingElement
    | ConstructSignatureDeclaration
    | VariableDeclaration
    | MethodSignature
    | CallSignatureDeclaration
    | ParameterDeclaration
    | PropertyDeclaration
    | PropertySignature;

type EnsureFuncType = (node: HasInferredType, type: TypeNode | undefined, ignorePrivate?: boolean) => TypeNode | undefined;

export interface DeclarationCustomContextType extends TransformationContext {
    isScriptTagInsideContent: boolean,
    declarationsStatement: Statement[]
    symbolTracker: SymbolTracker
    ensureType: EnsureFuncType
}
const getDeclarationNodeVisitor = getVisitor(declarationTransformers) as TransformerFactory<SourceFile>;
export function kixDeclarationTransformer(context: TransformationContext) {
    // context.symbolTracker = symbolTracker;
    // context.ensureType = ensureType;
    // context.getEmitHost().
    // context.getEmitHelperFactory().get
    // context.getEmitResolver().
    const visitor = getDeclarationNodeVisitor(context);
    // const visitor = getNodeVisitor(context);

    return chainBundle(context, (sourceFile: SourceFile) => {
        const languageVariant = sourceFile?.languageVariant;
        console.log("🚀 --> file: index.ts:84 --> returnchainBundle --> languageVariant:", sourceFile.fileName, LanguageVariant[languageVariant]);

        if (languageVariant === LanguageVariant.KJS) {
            console.log("🚀 --> file: index.ts:86 --> returnchainBundle --> languageVariant:", languageVariant);
            const file = visitor(sourceFile);
            // bindSourceFile(file, context.getCompilerOptions());
            return file;
        }
        return sourceFile;
    });
}
