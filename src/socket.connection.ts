/** 
 * @author Pihedy
 */

import { Logger } from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";
import { EventManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import { NotificationManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/notification-manager";

import { io, Socket } from "socket.io-client";

import { Config } from "./interfaces/config.interface";

import { connectedNotification } from "./notifications/connected.notification";


/**
 * Holds the reference to the custom Socket.IO client connection.
 */
let CustomSocket: Socket = null;

/**
 * Holds the most recent data received from the custom socket connection.
 */
export let customSocketData: any = null;

/**
 * Holds the reference to the logger module for logging debug and error messages.
 */
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
export function socketConnection(Config: Config, Logger: Logger, EventManager: EventManager, NotificationManager: NotificationManager): void {
    CustomSocket = io(Config.socket_server_url, {
        autoConnect: false
    });

    CustomSocketLogger = Logger;

    /**
     * Holds the number of attempts made to reconnect the custom Socket.IO connection.
     */
    let reconnectTryCount: number = 0;

    CustomSocket.on('connect', () => {
        Logger.debug(`[Custom Socket] Connection opened.`);

        NotificationManager.addNotification(connectedNotification);
        EventManager.triggerEvent('CustomSocket', 'connect_established', {});
    });

    CustomSocket.on(Config.event_name, (data: any) => {
        Logger.debug(`[Custom Socket] Message received.`);

        customSocketData = data;

        EventManager.triggerEvent('CustomSocket', 'message_received', {data});
    });

    CustomSocket.on('connect_error', (error) => {
        if (CustomSocket.active && reconnectTryCount <= 5) {
            Logger.error(`[Custom Socket] Connection error: ${error}. Trying to reconnect (${reconnectTryCount}).`);

            if (reconnectTryCount == 5) {
                socketDisconnect();
            }

            reconnectTryCount++;

            return;
        }

        Logger.error(`[Custom Socket] Connection error: ${error}.`);

        EventManager.triggerEvent('CustomSocket', 'manual_reconnect', {error});
    });

    CustomSocket.on('disconnect', (reason) => {
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

/**
 * Disconnects the custom Socket.IO socket.
 */
export function socketDisconnect(): void {
    CustomSocket.disconnect();
}
