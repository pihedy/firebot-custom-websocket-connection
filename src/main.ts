/** 
 * WebSocket Connection
 * 
 * @author Pihedy
 */

import { Firebot } from "@crowbartools/firebot-custom-scripts-types";

import { Config } from "./interfaces/config.interface";

import { Register } from "./register";
import { socketConnection } from "./socket.connection";

interface Params {
    socket_server_url: string;
    event_name: string;
    header: string;
}

const script: Firebot.CustomScript <Params> = {
    getScriptManifest: () => {
        return {
            name: "WebSocket Connection",
            description: "Connecting a firebot to a custiom websocket server as a client.",
            author: "Pihedy",
            version: "1.1.0",
            firebotVersion: "5",
        };
    },
    getDefaultParameters: () => {
        return {
            socket_server_url: {
                type: "string",
                title: "WebSocket Server URL",
                description: "The websocket server you want to use.",
                default: "http://localhost:3000",
                secondaryDescription: "Enter the address of the websocket server.",
            },
            event_name: {
                type: "string",
                title: "Event Name",
                description: "The event name you want to use.",
                default: "message",
                secondaryDescription: "Enter the name of the event you want to use.",
            },
            header: {
                type: 'string',
                title: "Header",
                description: "The header you want to use.",
                default: '{"foo":"bar"}',
                useTextArea: true
            }
        };
    },
    run: (runRequest) => {
        const {
            eventManager,
            replaceVariableManager,
            effectManager,
            notificationManager,
            logger
        } = runRequest.modules;

        logger.info("[WebSocket] Connection script loaded.");

        Register.initVariables(replaceVariableManager);
        Register.initEvents(eventManager);
        Register.initEffects(effectManager);

        const Config: Config = {
            socket_server_url: runRequest.parameters.socket_server_url,
            event_name: runRequest.parameters.event_name,
            header: JSON.parse(runRequest.parameters.header)
        };

        socketConnection(Config, logger, eventManager, notificationManager);
    },
};

export default script;
