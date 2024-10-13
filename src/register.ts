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
import { MessageEvent } from "./events/message.event";
import { ConnectEvent } from "./events/connect.event";

export class Register {

    public static initVariables(Manager: ReplaceVariableManager): void {
        Manager.registerReplaceVariable(MessageReplaceVariable);
    }

    public static initEvents(Manager: EventManager): void {
        Manager.registerEventSource({
            id: 'CustomSocket',
            name: 'CustomSocket',
            events: [ConnectEvent, MessageEvent]
        });
    }

}