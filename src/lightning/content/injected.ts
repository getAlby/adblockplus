import WebLNProvider from "../shared/weblnProvider";

function init() {
  window.webln = new WebLNProvider();
  registerLightningLinkClickHandler();
}

function registerLightningLinkClickHandler() {
  // Intercept any `lightning:` requests
  window.addEventListener(
    "click",
    async (ev) => {
      // Use composedPath() for detecting links inside a Shadow DOM
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
      const target = ev.composedPath()[0];

      if (!target || !target.closest) {
        return;
      }
      // parse protocol schemes defined in LUD-17
      // https://github.com/lnurl/luds/blob/luds/17.md
      const lightningLink = target.closest('[href^="lightning:" i]');
      const lnurlLink = target.closest(
        '[href^="lnurlp:" i],[href^="lnurlw:" i],[href^="lnurlc:" i]'
      );
      const bitcoinLinkWithLighting = target.closest(
        '[href*="lightning=ln" i]'
      ); // links with a lightning parameter and a value that starts with ln: payment requests (lnbc...) or lnurl (lnurl[pwc]:)
      let href;
      let paymentRequest;
      let lnurl;
      let link; // used to dispatch a succcess event

      if (!lightningLink && !bitcoinLinkWithLighting && !lnurlLink) {
        return;
      }
      ev.preventDefault();

      if (lightningLink) {
        href = lightningLink.getAttribute("href").toLowerCase();
        paymentRequest = href.replace("lightning:", "");
        link = lightningLink;
      } else if (bitcoinLinkWithLighting) {
        href = bitcoinLinkWithLighting.getAttribute("href").toLowerCase();
        link = bitcoinLinkWithLighting;
        const url = new URL(href);
        const query = new URLSearchParams(url.search);
        paymentRequest = query.get("lightning");
      } else if (lnurlLink) {
        href = lnurlLink.getAttribute("href").toLowerCase();
        link = lnurlLink;
        lnurl = href.replace(/^lnurl[pwc]:/i, "");
      }

      // if we did not find any paymentRequest and no LNURL we give up and return
      if (!paymentRequest && !lnurl) {
        return;
      }

      // it could be it is a LNURL behind a lightning: link
      if (paymentRequest && paymentRequest.startsWith("lnurl")) {
        lnurl = paymentRequest.replace(/^lnurl[pwc]:/i, ""); // replace potential scheme. the different lnurl types are handled in the lnurl action (by checking the type in the LNURL response)
      }
      // it could be a lightning address behind a lightning: link
      if (paymentRequest && paymentRequest.match(/(\S+@\S+)/)) {
        lnurl = paymentRequest.match(/(\S+@\S+)/)[1];
      }

      try {
        await window.webln.enable();
      } catch (e) {
        console.error(e);
      }

      if (lnurl) {
        return; // not supported right now
      }

      try {
        const response = await window.webln.sendPayment(paymentRequest);
        const responseEvent = new CustomEvent("lightning:success", {
          bubbles: true,
          detail: {
            paymentRequest,
            response,
          },
        });
        link.dispatchEvent(responseEvent);
      } catch (e) {
        console.error(e);
        alert(`Error: ${e.message}`);
      }
    },
    { capture: true }
  );
}


init();
