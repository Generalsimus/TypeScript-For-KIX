import { factory } from "../../../factory/nodeFactory";
import { BindingElement, Expression, Identifier } from "../../../types";
import { identifier } from "./identifier";

type KeyType = string | Identifier;
type CreateType = "createArrayBindingPattern" | "createObjectBindingPattern";
type EqualsToType = Expression | undefined;
type Elements = [KeyType, PatternType | undefined, EqualsToType][];
export interface PatternType {
    elements: Elements,
    type: CreateType
}

export const bindingPattern = (pattern: PatternType) => {

    return factory[pattern.type](pattern.elements.reduce((bindElements: BindingElement[], item) => {
        const propertyName = item[1] && item[0];
        const name = item[1] ? bindingPattern(item[1]) : identifier(item[0]);
        bindElements.push(
            factory.createBindingElement(
                 /* dotDotDotToken */ undefined,
                propertyName,
                name,
                item[2]
            )
        );
        return bindElements;
    }, []));
};