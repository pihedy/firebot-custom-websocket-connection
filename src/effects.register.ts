/** 
 * @author: Pihedy
 * 
 * TODO: Finish this file.
 */

import {
    EffectManager
} from "@crowbartools/firebot-custom-scripts-types/types/modules/effect-manager";

import {
    Effects
} from "@crowbartools/firebot-custom-scripts-types/types/effects";

import {
    Logger
} from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";

export class EffectsRegister {

    public static WebsocketConnect: Effects.EffectType<{}> = {
        definition: {
            id: 'pihedy:websocket_connect',
            name: 'Start WebSocket connection.',
            description: 'Attempts to connect to the WebSocket.',
            icon: 'fa fa-server',
            categories: ["common"]
        },
        optionsTemplate: '',
        optionsController: null,
        optionsValidator: null,
        onTriggerEvent: async () => {},
        overlayExtension: null
    };

    public static init(Manager: EffectManager, Logger: Logger): void {
        Manager.registerEffect(this.WebsocketConnect);
    }

}
