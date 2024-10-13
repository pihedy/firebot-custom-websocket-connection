/** 
 * @author Pihedy
 */

import {
    Logger
} from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";

import {
    EventManager
} from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";

import {
    io
} from "socket.io-client";

import {
    Config
} from "./interfaces/config.interface";

export let customSocketData: any = null;

export function socketConnection(Config: Config, Logger: Logger, EventManager: EventManager): void {
    const Socket = io(Config.socket_server_url);

    Socket.on('connect', () => {
        Logger.debug(`[Custom Socket] Connection opened.`);

        EventManager.triggerEvent('WebSocketEvent', 'WebSocketEvent_Open', {});
    });

    Socket.on(Config.event_name, (data: any) => {
        Logger.debug(`[Custom Socket] Message received.`);

        customSocketData = data;

        EventManager.triggerEvent('WebSocketEvent', 'WebSocketEvent_Message', {data});
    });

    /* WS.on("message", (data) => {
        Logger.info(`[WebSocket] Message received (${data.toString()}).`);

        EventManager.triggerEvent('WebSocketEvent', 'WebSocketEvent_Message', {});
    });

    WS.on("close", () => {
        Logger.info("[WebSocket] Connection closed.");

        EventManager.triggerEvent('WebSocketEvent', 'WebSocketEvent_Close', {});
    });

    WS.on('error', (error) => {
        Logger.error(`[WebSocket] Error: ${error.message}`);

        EventManager.triggerEvent('WebSocketEvent', 'WebSocketEvent_Close', {});
    }); */
}

export function getCustomSocketData(): any {
    return customSocketData;
}
