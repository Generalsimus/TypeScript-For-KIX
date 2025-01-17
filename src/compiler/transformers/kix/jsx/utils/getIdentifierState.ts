import { NodeFlags } from "../../../../types";
import { CustomContextType, DeclaredBlockIdentifiersType, IdentifiersStateType } from "../..";
import { getIndexId } from "./getIndexId";
import { NumberToUniqueString } from "./numberToUniqueString";



const createIdentifiersMap = (context: CustomContextType) => {
    const declaredBlockIdentifiers = new Map<string, IdentifiersStateType>();
    const addDeclaredIdentifierState = (identifierName: string, identifierState?: IdentifiersStateType) => {
        const hasIdentifierState = declaredBlockIdentifiers.has(identifierName);


        if (!hasIdentifierState) {

            let substituteCallback: IdentifiersStateType["substituteCallback"] = () => { };
            const { getVariableUniqueIdentifier } = context;
            const indexId = getIndexId();
            const newIdentifierState = {
                isDynamicJsx: false,
                isChanged: false,
                declaredFlag: undefined,
                defaultDeclareNameNode: undefined,
                defaultPropertyName: undefined,
                get substituteCallback() {
                    return substituteCallback;
                },
                set substituteCallback(newValue) {

                    const substituteCallbackCache = substituteCallback;
                    substituteCallback = (indexIdToUniqueString, declarationIdentifier) => {
                        newValue(indexIdToUniqueString, declarationIdentifier);
                        substituteCallbackCache(indexIdToUniqueString, declarationIdentifier);
                    };
                    if (this.isDynamicJsx && this.isChanged && this.declaredFlag !== undefined) {
                        if (this.declaredFlag !== NodeFlags.Const) {
                            substituteCallback(this.defaultPropertyName || NumberToUniqueString(indexId), this.defaultDeclareNameNode || getVariableUniqueIdentifier(this.declaredFlag));
                        }
                        substituteCallback = () => { };
                    }
                }

            };

            if (identifierState) {
                newIdentifierState.substituteCallback = identifierState.substituteCallback;
            }

            declaredBlockIdentifiers.set(identifierName, newIdentifierState);
        }
        else if (identifierState) {
            const currentIdentifierState = declaredBlockIdentifiers.get(identifierName)!;

            currentIdentifierState.substituteCallback = identifierState.substituteCallback;

        }
    };
    return { declaredBlockIdentifiers, addDeclaredIdentifierState };
};


type LocalIdentifiersChannelCallbackType = (declaredBlockIdentifiers: DeclaredBlockIdentifiersType, isGlobalBlock: boolean) => void;

export const creteManageIdentifierState = <R extends any>(context: CustomContextType, isGlobalBlock: boolean, visitor: () => R): R => {
    const { declaredBlockIdentifiers, addDeclaredIdentifierState } = createIdentifiersMap(context);
    let localIdentifiersChannelCallback: LocalIdentifiersChannelCallbackType = () => { };

    const addDeclaredIdentifierParentCache = context.addDeclaredIdentifierState;
    const addIdentifiersChannelCallbackParentCache = context.addIdentifiersChannelCallback;

    const addIdentifiersChannelCallback = (
        identifierName: string,
        addCallback: (identifierState: IdentifiersStateType) => void
    ) => {

        const newIdentifiersChannelCallback = (declaredBlockIdentifiers: DeclaredBlockIdentifiersType, isGlobalBlock: boolean) => {
            const identifierState = declaredBlockIdentifiers.get(identifierName);
            if (identifierState) {
                if (identifierState.declaredFlag === NodeFlags.None && !isGlobalBlock) {
                    addIdentifiersChannelCallbackParentCache(identifierName, addCallback);
                    addDeclaredIdentifierParentCache(identifierName, identifierState);
                }
                else {
                    addCallback(identifierState);
                }
            }
            else {
                addIdentifiersChannelCallbackParentCache(identifierName, addCallback);
            }
        };



        const localIdentifiersChannelCallbackCache = localIdentifiersChannelCallback;
        localIdentifiersChannelCallback = (declaredBlockIdentifiers: DeclaredBlockIdentifiersType, isGlobalBlock: boolean) => {
            localIdentifiersChannelCallbackCache(declaredBlockIdentifiers, isGlobalBlock);
            newIdentifiersChannelCallback(declaredBlockIdentifiers, isGlobalBlock);
        };
    };







    context.addDeclaredIdentifierState = addDeclaredIdentifierState;
    context.addIdentifiersChannelCallback = addIdentifiersChannelCallback;


    const visitedBlock = visitor();
    localIdentifiersChannelCallback(declaredBlockIdentifiers, isGlobalBlock);


    context.addDeclaredIdentifierState = addDeclaredIdentifierParentCache;
    context.addIdentifiersChannelCallback = addIdentifiersChannelCallbackParentCache;



    return visitedBlock;
};