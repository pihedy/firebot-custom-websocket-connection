/** 
 * @author: Pihedy
 */

import { NotificationBase } from "@crowbartools/firebot-custom-scripts-types/types/modules/notification-manager";
import { NotificationType } from "../enums/NotificationType";

export const connectedNotification: NotificationBase = {
    title: 'WebSocket connection established',
    message: 'The connection to the websocket server has been established.',
    type: NotificationType.INFO,
};
