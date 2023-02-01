import { factory } from "../../../factory/nodeFactory";
import { BindingElement, Expression, Identifier } from "../../../types";
import { identifier } from "./identifier";

type keyType = string | Identifier;
type createType = "createArrayBindingPattern" | "createObjectBindingPattern";
type equalsToType = Expression | undefined;
type Elements = [keyType, PatternType | undefined, equalsToType][];
export interface PatternType {
    elements: Elements,
    type: createType
}

export const bindingPattern = (pattern: PatternType) => {

    return factory[pattern.type](pattern.elements.reduce((bindElements: BindingElement[], item) => {
        const propertyName = item[1] && item[0];
        const name = item[1] ? bindingPattern(item[1]) : identifier(item[0]);
        bindElements.push(
            factory.createBindingElement(
                undefined,
                propertyName,
                name,
                item[2]
            )
        );
        return bindElements;
    }, []));
};