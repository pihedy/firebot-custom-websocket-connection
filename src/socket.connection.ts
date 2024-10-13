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

        EventManager.triggerEvent('CustomSocket', 'connect_established', {});
    });

    Socket.on(Config.event_name, (data: any) => {
        Logger.debug(`[Custom Socket] Message received.`);

        customSocketData = data;

        EventManager.triggerEvent('CustomSocket', 'message_received', {data});
    });

    Socket.on('connect_error', (error) => {
        if (Socket.active) {
            Logger.error(`[Custom Socket] Connection error: ${error}. Trying to reconnect...`);

            return;
        }

        Logger.error(`[Custom Socket] Connection error: ${error}.`);

        EventManager.triggerEvent('CustomSocket', 'manual_reconnect', {error});
    });

    Socket.on('disconnect', (reason) => {
        if (Socket.active) {
            Logger.error(`[Custom Socket] Connection error: ${reason}. Trying to reconnect...`);

            return;
        }

        Logger.debug(`[Custom Socket] Connection closed: ${reason}.`);

        EventManager.triggerEvent('CustomSocket', 'disconnect', {reason});
    });
}

export function getCustomSocketData(): any {
    return customSocketData;
}
