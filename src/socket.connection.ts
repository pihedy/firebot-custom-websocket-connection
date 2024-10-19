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
    io,
    Socket
} from "socket.io-client";

import {
    Config
} from "./interfaces/config.interface";

/**
 * Holds the reference to the custom Socket.IO client connection.
 */
let CustomSocket: Socket = null;

/**
 * Holds the most recent data received from the custom socket connection.
 */
export let customSocketData: any = null;

export let CustomSocketLogger: Logger|null = null;

/**
 * Establishes a connection to a custom Socket.IO server and handles various events related to the connection.
 * 
 * @param {Config} Config - The configuration object containing the Socket.IO server URL.
 * @param {Logger} Logger - The logger module for logging debug and error messages.
 * @param {EventManager} EventManager - The event manager module for triggering custom events.
 * 
 * @returns {void}
 */
export function socketConnection(Config: Config, Logger: Logger, EventManager: EventManager): void {
    CustomSocket = io(Config.socket_server_url, {
        autoConnect: false
    });

    CustomSocketLogger = Logger;

    CustomSocket.on('connect', () => {
        Logger.debug(`[Custom Socket] Connection opened.`);

        EventManager.triggerEvent('CustomSocket', 'connect_established', {});
    });

    CustomSocket.on(Config.event_name, (data: any) => {
        Logger.debug(`[Custom Socket] Message received.`);

        customSocketData = data;

        EventManager.triggerEvent('CustomSocket', 'message_received', {data});
    });

    CustomSocket.on('connect_error', (error) => {
        if (CustomSocket.active) {
            Logger.error(`[Custom Socket] Connection error: ${error}. Trying to reconnect...`);

            return;
        }

        Logger.error(`[Custom Socket] Connection error: ${error}.`);

        EventManager.triggerEvent('CustomSocket', 'manual_reconnect', {error});
    });

    CustomSocket.on('disconnect', (reason) => {
        if (CustomSocket.active) {
            Logger.error(`[Custom Socket] Connection error: ${reason}. Trying to reconnect...`);

            return;
        }

        Logger.debug(`[Custom Socket] Connection closed: ${reason}.`);

        EventManager.triggerEvent('CustomSocket', 'disconnect', {reason});
    });
}

/**
 * Returns the custom socket data received from the Socket.IO server.
 * 
 * @returns {any} The custom socket data.
 */
export function getCustomSocketData(): any {
    return customSocketData;
}

/**
 * Connects the custom Socket.IO socket.
 */
export function socketConnect(): void {
    CustomSocket.connect();
}
