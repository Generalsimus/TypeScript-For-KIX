// import ts from "typescript"
import { factory } from "../../../factory/nodeFactory";
import { isIdentifier } from "../../../factory/nodeTests";
import { ComputedPropertyName, Expression, Identifier, ObjectLiteralElementLike, StringLiteral } from "../../../types";
import { idText, isObjectLiteralElementLike } from "../../../utilitiesPublic";
import { identifier } from "./identifier"
import { stringLiteral } from "./stringLiteral";

export type createObjectArgsType = (ObjectLiteralElementLike | [string | Expression, Expression] | Expression)[]
export const createObject = (objectPropertiesNodes: createObjectArgsType) => {
    const saferPropertyRegexp = /^[a-zA-Z_]+$/;

    return factory.createObjectLiteralExpression(
        objectPropertiesNodes.map((node) => {
            if (node instanceof Array) {
                let propertyNameNode = node[0];
                let propertyNode: Identifier | StringLiteral | ComputedPropertyName

                if (typeof propertyNameNode === "string" || isIdentifier(propertyNameNode)) {

                    propertyNameNode = typeof propertyNameNode === "string" ? propertyNameNode : idText(propertyNameNode);

                    propertyNode = saferPropertyRegexp.test(propertyNameNode) ? identifier(propertyNameNode) : stringLiteral(propertyNameNode);

                } else {
                    propertyNode = factory.createComputedPropertyName(propertyNameNode);
                }

                return factory.createPropertyAssignment(
                    propertyNode,
                    node[1]
                )
            } else if (isObjectLiteralElementLike(node)) {
                return node
            }
            return factory.createSpreadAssignment(factory.createParenthesizedExpression(identifier(node)))
        }),
        false
    )
}