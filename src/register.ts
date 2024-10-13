/** 
 * @author: Pihedy
 */

import {
    ReplaceVariableManager
} from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";

import {
    MessageReplaceVariable
} from "./variables/message.variable";

import {
    EventManager
} from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";

import { ConnectEvent } from "./events/connect.event";
import { MessageEvent } from "./events/message.event";
import { ManualReconnectEvent } from "./events/manual-reconnect.event";
import { DisconnectEvent } from "./events/disconnect.event";

export class Register {

    public static initVariables(Manager: ReplaceVariableManager): void {
        Manager.registerReplaceVariable(MessageReplaceVariable);
    }

    public static initEvents(Manager: EventManager): void {
        Manager.registerEventSource({
            id: 'CustomSocket',
            name: 'CustomSocket',
            events: [
                ConnectEvent, 
                MessageEvent, 
                ManualReconnectEvent,
                DisconnectEvent
            ]
        });
    }

}