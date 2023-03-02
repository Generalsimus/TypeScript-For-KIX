import { factory } from "../../../factory/nodeFactory";
import { BindingName } from "../../../types";

export const parameterDeclaration = (params: (string | BindingName)[] = []) => {
    return params.map(param => {
        return factory.createParameterDeclaration(
             /* modifiers */ undefined,
             /* dotDotDotToken */ undefined,
            param,
             /* questionToken */ undefined,
             /* type */ undefined,
             /* initializer */ undefined
        );
    });
};