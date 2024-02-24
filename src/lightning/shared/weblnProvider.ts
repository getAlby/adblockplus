import { postMessage } from "./postMessage";

type RequestInvoiceArgs = {
  amount?: string | number;
  defaultAmount?: string | number;
  minimumAmount?: string | number;
  maximumAmount?: string | number;
  defaultMemo?: string;
};

type KeysendArgs = {
  destination: string;
  customRecords?: Record<string, string>;
  amount: string | number;
};

export default class WebLNProvider {
  private _isEnabled: boolean;
  private _scope = "webln";

  constructor() {
    this._isEnabled = false;
  }

  protected _checkEnabled(methodName: string): void {
    if (!this._isEnabled) {
      throw new Error(`Provider must be enabled before calling ${methodName}`);
    }
  }

  async enable(): Promise<void> {
    if (this._isEnabled) {
      return;
    }
    const result = await this.execute("enable");
    if (typeof result.enabled === "boolean") {
      this._isEnabled = result.enabled;
    }
  }

  getInfo() {
    this._checkEnabled("getInfo");
    return this.execute("getInfo");
  }

  sendPayment(paymentRequest: string) {
    this._checkEnabled("sendPayment");
    return this.execute("sendPayment", { paymentRequest });
  }

  sendPaymentAsync(paymentRequest: string) {
    this._checkEnabled("sendPaymentAsync");
    return this.execute("sendPaymentAsync", { paymentRequest });
  }

  keysend(args: KeysendArgs) {
    this._checkEnabled("keysend");
    return this.execute("keysend", args);
  }

  makeInvoice(args: string | number | RequestInvoiceArgs) {
    this._checkEnabled("makeInvoice");
    if (typeof args !== "object") {
      args = { amount: args };
    }

    return this.execute("makeInvoice", args);
  }

  signMessage(_message: string) {
    this._checkEnabled("signMessage");
    throw new Error("Not supported `signMessage`");
  }

  verifyMessage(_signature: string, _message: string) {
    this._checkEnabled("verifyMessage");
    throw new Error("Not supported `verifyMessage`");
  }

  getBalance() {
    this._checkEnabled("getBalance");
    return this.execute("getBalance");
  }

  request(_method: string, _params: Record<string, unknown>) {
    this._checkEnabled("request");
    throw new Error("Not supported `request`");
  }

  private execute(
    action: string,
    args?: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return postMessage(this._scope, action, args);
  }

}
