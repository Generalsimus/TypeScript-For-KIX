import { JsxChild, JsxExpression, StringLiteral, SyntaxKind } from "../../../../types";

export const safeInitializer = (initializer:  JsxChild |  StringLiteral |  JsxExpression | undefined) => {
    if (!initializer) return;
    if (initializer.kind ===  SyntaxKind.JsxExpression) {
        if (!initializer.expression) {
            return
        }
        return initializer.expression
    }
    return initializer
}


