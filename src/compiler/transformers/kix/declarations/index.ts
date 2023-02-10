import { CustomContextType } from "..";
import { SourceFile, SyntaxKind, Visitor } from "../../../types";


export const declarationTransformers = {
    [SyntaxKind.SourceFile]: (node: SourceFile, visitor: Visitor, _: CustomContextType) => {
        // console.log("🚀 --> file: index.ts:7 --> context", context);
        console.log("🚀 --> file: index.ts:9 --> node", node);
        return visitor(node)
    }
}
