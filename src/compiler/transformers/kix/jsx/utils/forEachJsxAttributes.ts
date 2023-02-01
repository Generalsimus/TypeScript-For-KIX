import { isJsxText } from "../../../../factory/nodeTests";
import { Expression, Identifier, JsxAttributes, SyntaxKind } from "../../../../types";
import { stringLiteral } from "../../factoryCode/stringLiteral";
import { safeInitializer } from "./safeInitializer";


export const forEachJsxAttributes = (
    attributeProperties: JsxAttributes["properties"],
    forEachCallback: (attributeName: Identifier, attributeValueNode: Expression) => void
) => {
    for (const attribute of attributeProperties) {
        if (attribute.kind === SyntaxKind.JsxAttribute) {
            const attributeName = attribute.name
            let attributeValueNode = safeInitializer(attribute.initializer)
            if (!attributeValueNode) continue;
            if (isJsxText(attributeValueNode)) {

                attributeValueNode = stringLiteral(attributeValueNode.text)
                // attributeValueNode = stringLiteral(attributeValueNode.getText())
            }
            forEachCallback(attributeName, attributeValueNode)

        }
    }

}
