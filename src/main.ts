/** 
 * WebSocket Connection
 * 
 * @author Pihedy
 */

import {
    Firebot
} from "@crowbartools/firebot-custom-scripts-types";

import {
    socketConnection
} from "./socket.connection";

import {
    Config
} from "./interfaces/config.interface";

import {
    Register
} from "./register";

interface Params {
    socket_server_url: string;
    event_name: string;
}

const script: Firebot.CustomScript < Params > = {
    getScriptManifest: () => {
        return {
            name: "WebSocket Connection",
            description: "Connecting a firebot to a custiom websocket server as a client.",
            author: "Pihedy",
            version: "1.0.0",
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
            }
        };
    },
    run: (runRequest) => {
        const {
            eventManager,
            replaceVariableManager,
            logger
        } = runRequest.modules;

        logger.info("[WebSocket] Connection script loaded.");

        /* EventsRegister.init(eventManager, logger);
        VariableRegister.init(replaceVariableManager); */

        Register.initVariables(replaceVariableManager);
        Register.initEvents(eventManager);

        const Config: Config = {
            socket_server_url: runRequest.parameters.socket_server_url,
            event_name: runRequest.parameters.event_name,
        };

        socketConnection(Config, logger, eventManager);
    },
};

export default script;
