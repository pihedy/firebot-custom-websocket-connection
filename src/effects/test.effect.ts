/** 
 * @author: Pihedy
 */

import {
    Effects
} from "@crowbartools/firebot-custom-scripts-types/types/effects";

export const TestEffect: Effects.EffectType<{}> = {
    definition: {
        id: 'pihedy:test_socket',
        name: 'CustomSocket Test',
        description: 'Test only.',
        icon: 'fa fa-question',
        categories: ["common"]
    },
    optionsTemplate: '',
    optionsController: null,
    optionsValidator: null,
    onTriggerEvent: async () => {

        return await new Promise(() => {
            let valami = new Notification('Test nottttiiiii!');
        });
    },
    overlayExtension: null
};

