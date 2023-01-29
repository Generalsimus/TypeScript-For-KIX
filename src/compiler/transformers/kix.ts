import { Bundle, SourceFile, TransformationContext } from "../types";
import { chainBundle } from "./utilities";
// import { getNodeVisitor } from "kix/dist/transformers"
// console.log("🚀 --> file: kix.ts:4 --> getTransformers", getTransformers);

// transformKix

/** @internal */
export function transformKix(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    // const visitor = getNodeVisitor(context);

    return chainBundle(context, (sourceFile: SourceFile) => {
        // const languageVariant = sourceFile?.languageVariant;

        // if (languageVariant === LanguageVariant.JSX || languageVariant === LanguageVariant.KJS) {

        //     return visitor(sourceFile) as typeof sourceFile
        // }
        return sourceFile
    });
} 