/** 
 * @author Pihedy
 */

import {
    EventManager
} from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";

import {
    Logger
} from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";

export class EventsRegister {

    public static readonly events = [
        {
            id: 'WebSocketEvent_Connected',
            name: 'WebSocket Connected',
            description: 'This event is fired when the websocket connection is established.',
        },
        {
            id: 'WebSocketEvent_Open',
            name: 'WebSocket Open',
            description: 'When the websocket opens and starts.',
        },
        {
            id: 'WebSocketEvent_Message',
            name: 'WebSocket Message',
            description: 'When a message is received by the connected clients.'
        },
        {
            id: 'WebSocketEvent_Close',
            name: 'WebSocket Close',
            description: 'If you are disconnected from the server.'
        },
        {
            id: 'WebSocketEvent_Error',
            name: 'WebSocket Error',
            description: 'If something goes wrong with WebSocket.'
        }
    ];

    public static init(Manager: EventManager, Logger: Logger): void {
        Manager.registerEventSource({
            id: 'WebSocketEvent',
            name: 'WebSocketEvent',
            events: EventsRegister.events,
        });
    }
    
}
