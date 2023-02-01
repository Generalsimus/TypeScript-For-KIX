import { CustomContextType } from "../.."
import { isJsxText } from "../../../../factory/nodeTests"
import { Expression, JsxChild, NodeArray, Visitor } from "../../../../types"
import { createObject } from "../../factoryCode/createObject"
import { stringLiteral } from "../../factoryCode/stringLiteral"
import { safeInitializer } from "./safeInitializer"
import { useJsxPropRegistration } from "./useJsxPropRegistration"

export const createJsxChildrenNode = (
    visitor: Visitor,
    context: CustomContextType,
    children: NodeArray<JsxChild>
) => {
    const newChildren = children.reduce((newChildren: Expression[], child,/*, index */) => {
        let currentChild = safeInitializer(child)
        if (!currentChild) {
            return newChildren
        }


        if (isJsxText(currentChild)) {
            const jsxText = currentChild.text
            if (jsxText.trim().length === 0) {
                return newChildren
            }
            newChildren.push(stringLiteral(jsxText))
        } else {

            newChildren.push(useJsxPropRegistration(currentChild, visitor, context, (node, isRegisterNode) => {

                if (isRegisterNode) {
                    return createObject([
                        ["$D", node]
                    ])
                }

                return node
            }))
        }

        return newChildren
    }, [])
    if (newChildren.length > 1) {
        return context.factory.createArrayLiteralExpression(newChildren, false)
    } else if (newChildren.length === 1) {
        return newChildren[0]
    }
}