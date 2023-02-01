import { CustomContextType } from "..";
import { Identifier, Visitor } from "../../../types";
import { idText } from "../../../utilitiesPublic";
import { callFunction } from "../factoryCode/callFunction";
import { stringLiteral } from "../factoryCode/stringLiteral";



export const VisitIdentifier = (node: Identifier, _: Visitor , context: CustomContextType) => {

  if (context.getJSXPropRegistrationIdentifier && context.isSubstitutionEnabled(node)) {
    const JSXPropRegistrationIdentifier = context.getJSXPropRegistrationIdentifier();

    const identifierName = idText(node);

    context.addIdentifiersChannelCallback(identifierName, (identifierState) => {
      identifierState.isJsx = true;
      // const { substituteCallback } = identifierState
      identifierState.substituteCallback = (indexIdToUniqueString, declarationIdentifier) => {

        context.substituteNodesList.set(node, () => {

          return callFunction(
            JSXPropRegistrationIdentifier,
            [
              declarationIdentifier,
              stringLiteral(indexIdToUniqueString)
            ]
          )
        });
        //   substituteCallback(indexIdToUniqueString, declarationIdentifier)
      }


      return node
    });

  }

  return node
}


