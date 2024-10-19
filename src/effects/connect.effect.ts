/** 
 * @author: Pihedy
 */

import {
    Effects
} from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { socketConnect } from "../socket.connection";

export const ConnectEffect: Effects.EffectType<{}> = {
    definition: {
        id: 'pihedy:custom_socket_connect',
        name: 'CustomSocket Connect',
        description: 'Attempts to connect to the CustomSocket.',
        icon: 'fa fa-server',
        categories: ["common"]
    },
    optionsTemplate: '',
    optionsController: null,
    optionsValidator: null,
    onTriggerEvent: async () => {
        socketConnect();

        return true;
    },
    overlayExtension: null
};
