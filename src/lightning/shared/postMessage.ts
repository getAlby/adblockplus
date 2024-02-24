import { PromiseQueue } from "./promiseQueue";
// global queue object
const queue = new PromiseQueue();

// post a message from the inpage context to the content script
export function postMessage<T>(
  scope: string,
  action: string,
  args: T | undefined
): Promise<T> {
  return queue.add(
    () =>
      new Promise((resolve, reject) => {
        const id = Math.random().toString().slice(4);

        // post the request to the content script. from there it gets passed to the background script and back
        // in page script can not directly connect to the background script
        window.postMessage(
          {
            id: id,
            application: "AdblockPlus",
            prompt: true,
            action: `${action}`,
            scope: scope,
            args
          },
          window.location.origin
        );

        function handleWindowMessage(messageEvent: MessageEvent) {
          // check if it is a relevant message
          // there are some other events happening
          if (
            messageEvent.origin !== window.location.origin ||
            !messageEvent.data ||
            !messageEvent.data.response ||
            messageEvent.data.application !== "AdblockPlus" ||
            messageEvent.data.scope !== scope ||
            messageEvent.data.id !== id
          ) {
            return;
          }

          if (messageEvent.data.error) {
            reject(new Error(messageEvent.data.error));
          } else {
            // 1. data: the message data
            // 2. data: the data passed as data to the message
            resolve(messageEvent.data.data);
          }

          // For some reason must happen only at the end of this function
          window.removeEventListener("message", handleWindowMessage);
        }

        window.addEventListener("message", handleWindowMessage);
      })
  );
}
