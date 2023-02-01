import { CustomContextType } from "../..";
import { arrowFunction } from "../../factoryCode/arrowFunction";
import { Expression, Identifier, Visitor } from "../../../../types";

export const useJsxPropRegistration = <T extends Expression | undefined | void>(
    node: Expression,
    visitor: Visitor,
    context: CustomContextType,
    callBeforeReturn: (registererArrowFunctionNode: Expression, isJSXregistererNode: boolean) => T
): T => {
    const OldGetRegistrationIdentifier = context.getJSXPropRegistrationIdentifier;
    let getRegistrationIdentifier: Identifier | undefined
    context.getJSXPropRegistrationIdentifier = () => (getRegistrationIdentifier || (getRegistrationIdentifier = context.factory.createUniqueName("_R")));
    const newNode = visitor(node);
    context.getJSXPropRegistrationIdentifier = OldGetRegistrationIdentifier;
    if (getRegistrationIdentifier) {
        return callBeforeReturn(arrowFunction([getRegistrationIdentifier], [], newNode as Expression), true)
    }

    return callBeforeReturn(newNode as typeof node, false)
}