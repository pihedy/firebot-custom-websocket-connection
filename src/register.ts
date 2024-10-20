/** 
 * @author: Pihedy
 */

import { ReplaceVariableManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { EventManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import { EffectManager  } from "@crowbartools/firebot-custom-scripts-types/types/modules/effect-manager";

import { MessageReplaceVariable } from "./variables/message.variable";

import { ConnectEvent } from "./events/connect.event";
import { MessageEvent } from "./events/message.event";
import { DisconnectEvent } from "./events/disconnect.event";
import { ManualReconnectEvent } from "./events/manual-reconnect.event";

import { ConnectEffect } from "./effects/connect.effect";
import { DisconnectEffect } from "./effects/disconnect.effect";
import { TestEffect } from "./effects/test.effect";

/** 
 * Provides methods for registering variables, events, and effects with the Firebot custom scripts system.
 */
export class Register {

    /** 
     * Registers a custom replace variable with the Firebot custom scripts system.
     * 
     * @param {ReplaceVariableManager} Manager - The manager for managing custom replace variables.
     */
    public static initVariables(Manager: ReplaceVariableManager): void {
        Manager.registerReplaceVariable(MessageReplaceVariable);
    }

    /** 
     * Registers custom event sources with the Firebot custom scripts system.
     * 
     * @param {EventManager} Manager - The manager for managing custom events.
     */
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

    /** 
     * Registers custom effects with the Firebot custom scripts system.
     * 
     * @param {EffectManager} Manager - The manager for managing custom effects.
     */
    public static initEffects(Manager: EffectManager): void {
        Manager.registerEffect(ConnectEffect);
        Manager.registerEffect(DisconnectEffect);
        Manager.registerEffect(TestEffect);
    }

}