/** 
 * @author: Pihedy
 */

import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";

import { socketDisconnect } from "../socket.connection";

export const DisconnectEffect: Effects.EffectType<{}> = {
    definition: {
        id: 'pihedy:custom_socket_disconnect',
        name: 'CustomSocket Disconnect',
        description: 'Disconnects from the websocket server.',
        icon: 'far fa-times-circle',
        categories: ["common"]
    },
    optionsTemplate: '',
    optionsController: null,
    optionsValidator: null,
    onTriggerEvent: async () => {
        socketDisconnect();

        return true;
    },
    overlayExtension: null
};
