/** 
 * @author: Pihedy
 */

import {
    ReplaceVariable
} from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";

import {
    Effects
} from "@crowbartools/firebot-custom-scripts-types/types/effects";

import {
    CustomSocketLogger,
    getCustomSocketData
} from "../socket.connection";

/**
 * Represents a custom socket message variable that can be used in Firebot scripts.
 * This variable provides access to the message data sent from the websocket server.
 */
export const MessageReplaceVariable: ReplaceVariable = {
    definition: {
        handle: "customSocketMessage",
        usage: "customSocketMessage[key?, defa?]",
        description: "The message that was sent from the websocket server.",
        categories: ['trigger based'],
        possibleDataOutput: ['ALL']
    },
    evaluator: (trigger: Effects.Trigger, key: string|null = null, defa: any = null): any => {
        let data = getCustomSocketData();

        if (data === null) {
            return defa;
        }

        if (key === null) {
            return data;
        }

        data = JSON.parse(data);

        return data[key] !== undefined ? data[key] : defa;
    }
};
