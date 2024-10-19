/** 
 * @author: Pihedy
 */

import { NotificationBase } from "@crowbartools/firebot-custom-scripts-types/types/modules/notification-manager";
import { NotificationType } from "../enums/NotificationType";

export const connectedNotification: NotificationBase = {
    title: 'WebSocket Connection',
    message: 'WebSocket connection established.',
    type: NotificationType.INFO,
};
