/** 
 * @author Pihedy
 */

import { Logger } from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";
import { EventManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import { NotificationManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/notification-manager";

import { io, Socket } from "socket.io-client";

import { Config } from "./interfaces/config.interface";

import { connectedNotification } from "./notifications/connected.notification";
import { disconnectedNotification } from "./notifications/disconnected.notification";


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
    /**
     * Establishes a connection to a custom Socket.IO server.
     *
     * @param {Config} Config - The configuration object containing the Socket.IO server URL.
     */
    CustomSocket = io(Config.socket_server_url, {
        autoConnect: false,
        extraHeaders: Config.header
    });

    /** 
     * Holds the reference to the logger module for logging debug and error messages.
     */
    CustomSocketLogger = Logger;

    /**
     * Holds the number of attempts made to reconnect the custom Socket.IO connection.
     */
    let reconnectTryCount: number = 0;

    /**
     * Handles the 'connect' event for the custom Socket.IO connection.
     */
    CustomSocket.on('connect', () => {
        EventManager.triggerEvent('CustomSocket', 'connect_established', {});

        NotificationManager.addNotification(connectedNotification);

        Logger.debug(`[Custom Socket] Connection opened.`);
    });

    /**
     * Handles the event with the name specified in the `Config.event_name` property. 
     * 
     * This event is emitted by the custom Socket.IO server and the data received is stored in the `customSocketData` variable.
     * 
     * @param {any} data - The data received from the custom Socket.IO server for the event.
     * 
     * @returns {void}
     */
    CustomSocket.on(Config.event_name, (data: any) => {
        customSocketData = data;
        
        EventManager.triggerEvent('CustomSocket', 'message_received', {data});

        Logger.debug(`[Custom Socket] Message received.`);
    });

    /**
     * Handles the 'connect_error' event for the custom Socket.IO connection.
     * 
     * This event is emitted when there is an error connecting to the Socket.IO server.
     * 
     * @param {Error} Error - The error object containing information about the connection error.
     * 
     * @returns {void}
     */
    CustomSocket.on('connect_error', (Error: Error) => {
        if (CustomSocket.active && reconnectTryCount <= 5) {
            Logger.error(`[Custom Socket] Connection error: ${Error.message}. Trying to reconnect (${reconnectTryCount}).`);

            if (reconnectTryCount == 5) {
                socketDisconnect();
            }

            reconnectTryCount++;

            return;
        }

        EventManager.triggerEvent('CustomSocket', 'manual_reconnect', {Error});

        Logger.error(`[Custom Socket] Connection error: ${Error.message}.`);
    });

    /**
     * Handles the 'disconnect' event for the custom Socket.IO connection.
     * 
     * This event is emitted when the custom Socket.IO connection is disconnected.
     * 
     * @param {string} reason - The reason for the disconnection.
     * 
     * @returns {void}
     */
    CustomSocket.on('disconnect', (Reason) => {
        EventManager.triggerEvent('CustomSocket', 'disconnect', {Reason});

        NotificationManager.addNotification(disconnectedNotification);

        Logger.debug(`[Custom Socket] Connection closed: ${Reason}.`);
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
