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

import { 
    EffectManager 
} from "@crowbartools/firebot-custom-scripts-types/types/modules/effect-manager";

import { ConnectEvent } from "./events/connect.event";
import { MessageEvent } from "./events/message.event";
import { ManualReconnectEvent } from "./events/manual-reconnect.event";
import { DisconnectEvent } from "./events/disconnect.event";

import { ConnectEffect } from "./effects/connect.effect";
import { TestEffect } from "./effects/test.effect";

/** 
 * Provides methods for registering variables, events, and effects with the Firebot custom scripts system.
 */
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

    public static initEffects(Manager: EffectManager): void {
        Manager.registerEffect(ConnectEffect);
        Manager.registerEffect(TestEffect);
    }

}