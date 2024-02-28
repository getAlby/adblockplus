import { Prefs } from "../../../adblockpluschrome/lib/prefs";
import { port } from "../../../adblockpluschrome/lib/messaging/port";
import { type Message } from "../../core/api/shared";

const prefMap = {
  "lightning.secret": "nwc_pairing_secret"
} as { [key: string]: string };

/**
 * Handles message
 *
 * @param message - Message
 */
function handleMessage(message: Message): any {
  return Prefs.get(prefMap[message.type]);
}

/**
 * Initializes Lightning feature
 */
export function start(): void {
  port.on("lightning.secret", handleMessage);

  ext.addTrustedMessageTypes(null, [
    "lightning.isAllowlisted",
    "lightning.secret"
  ]);
}

start();
