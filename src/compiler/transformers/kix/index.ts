import { Bundle, Identifier, LanguageVariant, Node, NodeFlags, SourceFile, TransformationContext, TransformerFactory, Visitor } from "../../types";
import { chainBundle } from "../utilities";
import { jsxTransformers } from "./jsx";
import { getVisitor } from "./utils/getVisitor";
// import { chainBundle } from "./utilities";



export type VisitEachType = <N extends Node>(node: N, nodeVisitor: Visitor, context: CustomContextType) => N;
export interface IdentifiersStateType {
    isJsx: boolean,
    isChanged: boolean,
    declaredFlag: NodeFlags | undefined,
    substituteCallback: (indexIdToUniqueString: string, declarationIdentifier: Identifier) => void,
}
export type DeclaredBlockIdentifiersType = Map<string, IdentifiersStateType>;
export interface CustomContextType extends TransformationContext {
    getJSXPropRegistrationIdentifier?: () => Identifier
    /* JSX ში მოთავხებული .? უსაფრთხოებისთვის როდესაც ხდება რეგისტრაცია და ასევესაჭიროა მისი გაშვებაც ნიმუში: ssss?.() */
    JsxHaveQuestionDotToken?: Node


    getVariableUniqueIdentifier: (flag: NodeFlags) => Identifier
    substituteNodesList: Map<Node, (node: Node, substituteVisitor: Visitor, context: Visitor) => Node | Node[]>



    addDeclaredIdentifierState: (identifierName: string, identifierState?: IdentifiersStateType) => void
    addIdentifiersChannelCallback: (identifierName: string, addCallback: (identifierState: IdentifiersStateType) => void) => void

    languageVariant: LanguageVariant
}
// export interface CustomContextTypeExperimental extends CustomContextType {

// }

const getNodeVisitor = getVisitor(jsxTransformers) as TransformerFactory<SourceFile>;


// transformKix

/** @internal */
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