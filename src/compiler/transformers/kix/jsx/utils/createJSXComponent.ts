import { Expression, Identifier, JsxAttributes, JsxChild, JsxTagNameExpression, NodeArray, Visitor } from "../../../../types";
import { CustomContextType } from "../..";
import { createObject } from "../../factoryCode/createObject";
import { createJsxChildrenNode } from "./createJsxChildrenNode";
import { forEachJsxAttributes } from "./forEachJsxAttributes";
import { useJsxPropRegistration } from "./useJsxPropRegistration";

//TODO:კლასის კომპენენტის შემთXვევაში უნდა იყოს ასე new ClassName().method() და არა ესე new ClassName.method()
export const createJSXComponent = (
    visitor: Visitor,
    context: CustomContextType,
    componentName: JsxTagNameExpression,
    attributes: JsxAttributes,
    children: NodeArray<JsxChild>
) => {
    const childrenNode = createJsxChildrenNode(
        visitor,
        context,
        children
    );

    const propsObjectNodesForFactoryCode: [Identifier | string, Expression][] = [
        ["$C", componentName],
    ];

    if (childrenNode) {
        propsObjectNodesForFactoryCode.push([
            "i",
            childrenNode,
        ]);
    }
    const dynamicPropsObjectNodesForFactoryCode: [Identifier | string, Expression][] = [];
    const staticPropsObjectNodesForFactoryCode: [Identifier | string, Expression][] = [];


    forEachJsxAttributes(attributes.properties, (attributeName, attributeValueNode) => {
        useJsxPropRegistration(
            attributeValueNode,
            visitor,
            context,
            (node, isJSXregistererNode) => {
                if (isJSXregistererNode) {
                    dynamicPropsObjectNodesForFactoryCode.push([attributeName, node]);
                }
                else {
                    staticPropsObjectNodesForFactoryCode.push([attributeName, node]);
                }
            }
        );
    });
    if (staticPropsObjectNodesForFactoryCode.length) {
        propsObjectNodesForFactoryCode.push(["a", createObject(staticPropsObjectNodesForFactoryCode)]);
    }
    if (dynamicPropsObjectNodesForFactoryCode.length) {
        propsObjectNodesForFactoryCode.push(["d", createObject(dynamicPropsObjectNodesForFactoryCode)]);
    }

    return createObject(propsObjectNodesForFactoryCode);
};