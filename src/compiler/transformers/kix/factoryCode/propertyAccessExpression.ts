import { factory } from "../../../factory/nodeFactory";
import { ElementAccessExpression, Expression, PropertyAccessExpression } from "../../../types";
import { identifier } from "./identifier";
import { stringLiteral } from "./stringLiteral";
 



export function propertyAccessExpression(
    properties: (string | Expression)[],
    accessType: "createElementAccessExpression" | "createPropertyAccessExpression" = "createElementAccessExpression"
) {
    let initValueFunction = accessType === "createElementAccessExpression" ? stringLiteral : identifier

    return properties.reduce((property1, property2) => {
        return factory[accessType](
            identifier(property1),
            initValueFunction(property2) as any,
        );
    }) as (ElementAccessExpression | PropertyAccessExpression);
}