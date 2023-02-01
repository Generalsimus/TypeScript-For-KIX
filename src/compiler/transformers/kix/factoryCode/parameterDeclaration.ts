import { factory } from "../../../factory/nodeFactory";
import { BindingName } from "../../../types";

export const parameterDeclaration = (params: (string | BindingName)[] = []) => {
    return params.map(param => {
        return factory.createParameterDeclaration(
            undefined,
            undefined,
            param,
            undefined,
            undefined,
            undefined
        )
    })
}