/** 
 * WebSocket Connection
 * 
 * @author Pihedy
 */

import {
    Firebot
} from "@crowbartools/firebot-custom-scripts-types";

import { EventsRegister } from "./events-register";

import {
    initWebSocket
} from "./websocket-connection";

interface Params {
    WebSocketServer: string;
}

const script: Firebot.CustomScript<Params> = {
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
            WebSocketServer: {
                type: "string",
                title: "WebSocket Server",
                description: "The websocket server you want to use.",
                default: "wss://echo.websocket.org/",
                secondaryDescription: "Enter the address of the websocket server.",
            },
        };
    },
    run: (runRequest) => {
        const {
            eventManager,
            logger
        } = runRequest.modules;

        logger.info("[WebSocket] Connection script loaded.");

        EventsRegister.init(eventManager, logger);

        initWebSocket(
            runRequest.parameters.WebSocketServer,
            logger,
            eventManager
        );
    },
};

export default script;
