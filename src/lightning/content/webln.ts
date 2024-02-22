import { webln as weblnImport } from "./js-sdk";
const webln: { [key: string]: any } = weblnImport;

// WebLN calls that can be executed from the WebLNProvider.
// Update when new calls are added
const weblnCalls = [
  "webln/enable",
  "webln/getInfo",
  "webln/lnurl",
  "webln/sendPaymentOrPrompt",
  "webln/sendPaymentAsyncWithPrompt",
  "webln/keysendOrPrompt",
  "webln/makeInvoice",
  "webln/signMessageOrPrompt",
  "webln/getBalanceOrPrompt",
  "webln/request",
  "webln/on",
  "webln/emit",
  "webln/off",
  "webln/isEnabled"
];
// calls that can be executed when webln is not enabled for the current content page
const disabledCalls = ["webln/enable", "webln/isEnabled"];

let isEnabled = false; // store if webln is enabled for this content page
let isRejected = false; // store if the webln enable call failed. if so we do not prompt again
let nwc: any;

async function init() {
  injectWebln();

  browser.runtime.onMessage.addListener((request) => {
    // extract LN data from websites
    if (request.action === "accountChanged" && isEnabled) {
      window.postMessage(
        { action: "accountChanged", scope: "webln" },
        window.location.origin
      );
    }
  });

  // message listener to listen to inpage webln/webbtc calls
  // those calls get passed on to the background script
  // (the inpage script can not do that directly, but only the inpage script can make webln available to the page)
  window.addEventListener("message", async (ev) => {
    // Only accept messages from the current window
    if (
      ev.source !== window ||
      ev.data.application !== "Adblocker Plus" ||
      ev.data.scope !== "webln"
    ) {
      return;
    }

    if (ev.data && !ev.data.response) {
      // if an enable call railed we ignore the request to prevent spamming the user with prompts
      if (isRejected) {
        postMessage(ev, {
          error:
            "webln.enable() failed (rejecting further window.webln calls until the next reload)"
        });
        return;
      }

      // limit the calls that can be made from webln
      // only listed calls can be executed
      // if not enabled only enable can be called.
      const availableCalls = isEnabled ? weblnCalls : disabledCalls;
      if (!availableCalls.includes(ev.data.action)) {
        console.error("Function not available. Is the provider enabled?");
        return;
      }

      const replyFunction = (response: any) => {
        // if it is the enable call we store if webln is enabled for this content script
        if (ev.data.action === "webln/enable") {
          isEnabled = response.data?.enabled;
          const enabledEvent = new Event("webln:enabled");
          window.dispatchEvent(enabledEvent);
          if (response.error) {
            console.error(response.error);
            console.info("Enable was rejected ignoring further webln calls");
            isRejected = true;
          }
        }

        if (ev.data.action === "webln/isEnabled") {
          isEnabled = response.data?.isEnabled;
        }
        postMessage(ev, response);
      };
      return exec(ev.data.action, ev.data.args)
        .then(replyFunction)
        .catch(replyFunction);
    }
  });
}

init();

async function injectWebln() {
  try {
    if (!document) throw new Error("No document");
    const container = document.head || document.documentElement;
    if (!container) throw new Error("No container element");
    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("async", "false");
    scriptEl.setAttribute("type", "text/javascript");
    scriptEl.src = browser.runtime.getURL("lightning.injected.js");
    container.insertBefore(scriptEl, container.children[0]);
    container.removeChild(scriptEl);
  } catch (err) {
    console.error("WebLN injection failed", err);
  }
}

function postMessage(ev: MessageEvent, response: any) {
  window.postMessage(
    {
      id: ev.data.id,
      application: "Adblocker Plus",
      response: true,
      data: response,
      scope: "webln"
    },
    window.location.origin
  );
}

async function exec(action: string, args: any) {
  const lightningEnabled = await browser.runtime.sendMessage({
    type: "lightning.enabled"
  });
  if (!lightningEnabled) {
    throw new Error("Lightning is not enabled");
  }

  if (!nwc) {
    const secret = await browser.runtime.sendMessage({
      type: "lightning.secret"
    });
    if (!secret) {
      throw new Error("No pairing secret");
    }

    nwc = new webln.NostrWebLNProvider({
      nostrWalletConnectUrl: secret
    });
  }

  console.log("NWC client", nwc);

  if (action === "webln/enable") {
    await nwc.enable();
    return { data: { enabled: true } };
  } else if (nwc[action]) {
    return await nwc[action](args);
  } else {
    throw new Error("Method not found");
  }
}

export {};
