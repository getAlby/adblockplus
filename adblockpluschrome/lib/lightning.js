import { port } from "./messaging/port.js";

/**
 * Retrieves the list of allowlisted pages for Lightning feature.
 *
 * @returns {Promise<string[]>}
 */
async function getAllowlistedLightningFilters() {
  return new Promise((resolve) =>
    chrome.storage.local.get("abp:pref:lightning_filters", (result) =>
      resolve(result?.["abp:pref:lightning_filters"] || [])
    )
  );
}

/**
 * Add or remove a filter in the list of allowlisted pages for Lightning feature.
 *
 * @param {string} host
 * @param {boolean} toAdd
 */
async function setAllowlistedLightningFilters(host, toAdd) {
  let filters = await getAllowlistedLightningFilters();

  if (toAdd && filters.includes(host)) {
    return;
  }

  if (toAdd) {
    filters.push(host);
  } else {
    filters = filters.filter((filter) => filter !== host);
  }

  chrome.storage.local.set({ "abp:pref:lightning_filters": filters });

  const tabs = await browser.tabs.query({});
  for (let tab of tabs) {
    const page = new ext.Page(tab);
    if (!page.url || !(page.url instanceof URL)) continue;

    const tabHost = page.url.hostname.replace(/^www\./, "");
    if (tabHost === host)
      browser.tabs.sendMessage(tab.id, {
        type: "lightning.allowlistUpdated",
        enabled: toAdd
      });
  }
}

export function start() {
  /**
   * Returns all the allowlisted pages for Lightning feature.
   *
   * @event "lightning.getAllowlist"
   * @returns {string[]}
   */
  port.on("lightning.getAllowlist", async () => {
    return getAllowlistedLightningFilters();
  });

  /**
   * Checks if the given page has Lightning enabled.
   *
   * @event "lightning.isAllowlisted"
   * @property {object} tab
   *  Tab that contains the page to check.
   * @returns {boolean}
   */
  port.on("lightning.isAllowlisted", async (message) => {
    let host = message.hostname && message.hostname.replace(/^www\./, "");
    if (!host) {
      const page = new ext.Page(message.tab);

      if (!page.url || !(page.url instanceof URL)) return false;

      host = page.url.hostname.replace(/^www\./, "");
    }

    const filters = await getAllowlistedLightningFilters();

    return filters.includes(host);
  });

  /**
   * Allowlists or unallowlists the given domain for Lightning feature.
   *
   * @event "lightning.allowlist"
   * @property {object} tab
   *   Tab that contains the page to allowlist.
   * @property {boolean} [toAdd]
   */
  port.on("lightning.allowlist", async (message) => {
    const page = new ext.Page(message.tab);

    if (!page.url || !(page.url instanceof URL)) throw new Error("Invalid URL");

    const host = page.url.hostname.replace(/^www\./, "");

    await setAllowlistedLightningFilters(host, message.toAdd);
  });
}
