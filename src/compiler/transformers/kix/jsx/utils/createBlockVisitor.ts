import { NodeFlags, Visitor } from "../../../../types";
import { CustomContextType } from "../..";
import { creteManageIdentifierState } from "./getIdentifierState";

export interface VariableStateType {
    blockScopeIdentifiers?: ReturnType<CustomContextType["getVariableUniqueIdentifier"]>
    globalScopeIdentifiers?: ReturnType<CustomContextType["getVariableUniqueIdentifier"]>

}

export const createBlockVisitor = <N extends any, R extends any>(
    nodeVisitor: (node: N, visitor: Visitor, context: CustomContextType) => R,
    isGlobalBlock: boolean
) => {
    return (node: N, visitor: Visitor, context: CustomContextType): [R, VariableStateType] => {

        const getVariableUniqueIdentifierCache = context.getVariableUniqueIdentifier;
        const variableState: VariableStateType = {
            blockScopeIdentifiers: undefined,
            globalScopeIdentifiers: undefined,
        };
        context.getVariableUniqueIdentifier = (flag: NodeFlags) => {
            // ThisExpression
            // if(){

            // }
            if (isGlobalBlock) {

                return variableState.globalScopeIdentifiers ||= context.factory.createUniqueName("_");
            }
            if (flag === NodeFlags.None) {

                return getVariableUniqueIdentifierCache(flag);
            }
            return variableState.blockScopeIdentifiers ||= context.factory.createUniqueName("_");
        };
        const visitedNode = creteManageIdentifierState(context, isGlobalBlock, () => {

            return nodeVisitor(node, visitor, context);
        });

        context.getVariableUniqueIdentifier = getVariableUniqueIdentifierCache;





        return [visitedNode, variableState];
    };
};