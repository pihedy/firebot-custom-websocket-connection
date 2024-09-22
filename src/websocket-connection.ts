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
    WebSocket
} from "ws";

export function initWebSocket(url: string, Logger: Logger, EventManager: EventManager): void {
    const WS = new WebSocket(url);

    WS.on("open", () => {
        Logger.info("[WebSocket] Connection opened.");

        EventManager.triggerEvent('WebSocketEvent', 'WebSocketEvent_Open', {});
    });

    WS.on("message", (data) => {
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
    });
}
