/** 
 * @author: Pihedy
 */

import { NotificationBase } from "@crowbartools/firebot-custom-scripts-types/types/modules/notification-manager";
import { NotificationType } from "../enums/NotificationType";

export const disconnectedNotification: NotificationBase = {
    title: 'WebSocket connection lost',
    message: 'The connection to the websocket server has been lost.',
    type: NotificationType.INFO,
};
