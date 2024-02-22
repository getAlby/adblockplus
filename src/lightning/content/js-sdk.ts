//@ts-nocheck
import { EventEmitter } from "events";
import * as n from "nostr-tools";

function r(e) {
  return e && "object" == typeof e && "default" in e ? e : { default: e };
}
var o = /*#__PURE__*/ r(EventEmitter);
function i(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function s(e, t, n) {
  return (
    t && i(e.prototype, t),
    n && i(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function u() {
  return (
    (u = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    u.apply(this, arguments)
  );
}
function c(e) {
  return (
    (c = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    c(e)
  );
}
function a(e, t) {
  return (
    (a = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return (e.__proto__ = t), e;
        }),
    a(e, t)
  );
}
function l() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    );
  } catch (e) {
    return !1;
  }
}
function h(e, t, n) {
  return (
    (h = l()
      ? Reflect.construct.bind()
      : function (e, t, n) {
          var r = [null];
          r.push.apply(r, t);
          var o = new (Function.bind.apply(e, r))();
          return n && a(o, n.prototype), o;
        }),
    h.apply(null, arguments)
  );
}
function d(e) {
  var t = "function" == typeof Map ? new Map() : void 0;
  return (
    (d = function (e) {
      if (
        null === e ||
        -1 === Function.toString.call(e).indexOf("[native code]")
      )
        return e;
      if ("function" != typeof e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (void 0 !== t) {
        if (t.has(e)) return t.get(e);
        t.set(e, n);
      }
      function n() {
        return h(e, arguments, c(this).constructor);
      }
      return (
        (n.prototype = Object.create(e.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
        a(n, e)
      );
    }),
    d(e)
  );
}
function f(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) t.indexOf((n = i[r])) >= 0 || (o[n] = e[n]);
  return o;
}
function m(e) {
  return Object.entries(e)
    .map(function (e) {
      var t = e[0],
        n = e[1];
      return t && n ? t + "=" + n : "";
    })
    .filter(function (e) {
      return e;
    })
    .join("&");
}
function p(e, t) {
  return "Basic " + btoa(e + ":" + t);
}
var v = /*#__PURE__*/ (function (e) {
    var t, n;
    function r(t, n, r, o) {
      var i,
        s = t.toString();
      return (
        n && (s += " " + n),
        (s += ": "),
        (s += o.message ? o.message : JSON.stringify(o)),
        ((i = e.call(this, s) || this).status = void 0),
        (i.statusText = void 0),
        (i.headers = void 0),
        (i.error = void 0),
        (i.status = t),
        (i.statusText = n),
        (i.headers = r),
        (i.error = o),
        i
      );
    }
    return (
      (n = e),
      ((t = r).prototype = Object.create(n.prototype)),
      (t.prototype.constructor = t),
      a(t, n),
      r
    );
  })(/*#__PURE__*/ d(Error)),
  y = {
    __proto__: null,
    OAuthClient: function () {},
    AuthClient: function () {},
    AlbyResponseError: v
  },
  g = [
    "auth",
    "endpoint",
    "params",
    "request_body",
    "method",
    "max_retries",
    "base_url",
    "user_agent",
    "headers"
  ],
  P = function (e) {
    return Promise.resolve(w(e)).then(function (e) {
      return e.json();
    });
  },
  w = function (e) {
    var t = e.auth,
      n = e.endpoint,
      r = e.params,
      o = void 0 === r ? {} : r,
      i = e.request_body,
      s = e.method,
      c = e.max_retries,
      a = e.base_url,
      l = void 0 === a ? k : a,
      h = e.user_agent,
      d = e.headers,
      p = f(e, g);
    try {
      var y = function (e) {
          return Promise.resolve(
            b(
              P.toString(),
              u(
                {
                  headers: u(
                    {},
                    w
                      ? { "Content-Type": "application/json; charset=utf-8" }
                      : void 0,
                    e,
                    d,
                    {
                      "User-Agent": null != h ? h : "@getalby/sdk",
                      "X-User-Agent": null != h ? h : "@getalby/sdk"
                    }
                  ),
                  method: s,
                  body: w ? JSON.stringify(i) : void 0
                },
                p
              ),
              c
            )
          ).then(function (e) {
            var t = (function () {
              if (!e.ok)
                return Promise.resolve(e.json()).then(function (t) {
                  throw new v(e.status, e.statusText, e.headers, t);
                });
            })();
            return t && t.then
              ? t.then(function (t) {
                  return e;
                })
              : e;
          });
        },
        P = new URL(l + n);
      P.search = m(o);
      var w = "POST" === s && !!i;
      return Promise.resolve(
        t ? Promise.resolve(t.getAuthHeader(P.href, s)).then(y) : y(void 0)
      );
    } catch (e) {
      return Promise.reject(e);
    }
  },
  b = function e(t, n, r) {
    void 0 === r && (r = 0);
    try {
      return Promise.resolve(fetch(t, n)).then(function (o) {
        var i,
          s = (function () {
            if (429 === o.status && r > 0) {
              var s = Number(o.headers.get("x-rate-limit-reset")),
                u = Number(o.headers.get("x-rate-limit-remaining")),
                c = 1e3 * s - Date.now(),
                a = 1e3;
              return (
                0 === u && (a = c),
                Promise.resolve(
                  new Promise(function (e) {
                    return setTimeout(e, a);
                  })
                ).then(function () {
                  var o = e(t, n, r - 1);
                  return (i = 1), o;
                })
              );
            }
          })();
        return s && s.then
          ? s.then(function (e) {
              return i ? e : o;
            })
          : i
          ? s
          : o;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  k = "https://api.getalby.com",
  _ = ["expires_in"],
  E = ["token"];
function T(e) {
  var t = e.expires_in;
  return u({}, f(e, _), !!t && { expires_at: Date.now() + 1e3 * t });
}
var q = /*#__PURE__*/ (function () {
    function e(e) {
      (this.token = void 0),
        (this.options = void 0),
        (this.code_verifier = void 0),
        (this.code_challenge = void 0),
        (this._refreshAccessTokenPromise = void 0),
        (this._tokenEvents = void 0),
        (this._tokenEvents = new o.default());
      var t = e.token,
        n = f(e, E);
      (this.options = u({ client_secret: "" }, n)),
        (this.token = t),
        (this._refreshAccessTokenPromise = null);
    }
    var t = e.prototype;
    return (
      (t.on = function (e, t) {
        this._tokenEvents.on(e, t);
      }),
      (t.refreshAccessToken = function () {
        try {
          var e = this;
          return (
            e._refreshAccessTokenPromise ||
              (e._refreshAccessTokenPromise = new Promise(function (t, n) {
                try {
                  return Promise.resolve(
                    (function (r, o) {
                      try {
                        var i = (function (n, r) {
                          try {
                            var o = (function () {
                              var n,
                                r =
                                  null == (n = e.token)
                                    ? void 0
                                    : n.refresh_token,
                                o = e.options,
                                i = o.client_id,
                                s = o.client_secret,
                                c = o.request_options,
                                a = o.user_agent;
                              if (!i) throw new Error("client_id is required");
                              if (!r)
                                throw new Error("refresh_token is required");
                              return Promise.resolve(
                                P(
                                  u({}, c, {
                                    endpoint: "/oauth/token",
                                    params: {
                                      client_id: i,
                                      grant_type: "refresh_token",
                                      refresh_token: r
                                    },
                                    user_agent: a,
                                    method: "POST",
                                    headers: u(
                                      {},
                                      null == c ? void 0 : c.headers,
                                      {
                                        "Content-type":
                                          "application/x-www-form-urlencoded"
                                      },
                                      { Authorization: p(i, s) }
                                    )
                                  })
                                )
                              ).then(function (n) {
                                var r = T(n);
                                (e.token = r),
                                  t({ token: r }),
                                  e._tokenEvents.emit(
                                    "tokenRefreshed",
                                    e.token
                                  );
                              });
                            })();
                          } catch (e) {
                            return r(e);
                          }
                          return o && o.then ? o.then(void 0, r) : o;
                        })(0, function (t) {
                          console.error(t),
                            n(t),
                            e._tokenEvents.emit("tokenRefreshFailed", t);
                        });
                      } catch (e) {
                        return o(!0, e);
                      }
                      return i && i.then
                        ? i.then(o.bind(null, !1), o.bind(null, !0))
                        : o(!1, i);
                    })(0, function (t, n) {
                      if (((e._refreshAccessTokenPromise = null), t)) throw n;
                      return n;
                    })
                  );
                } catch (e) {
                  return Promise.reject(e);
                }
              })),
            Promise.resolve(e._refreshAccessTokenPromise)
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.isAccessTokenExpired = function () {
        var e,
          t,
          n = null == (e = this.token) ? void 0 : e.refresh_token,
          r = null == (t = this.token) ? void 0 : t.expires_at;
        return !r || (!!n && r <= Date.now() + 1e3);
      }),
      (t.requestAccessToken = function (e) {
        try {
          var t = this,
            n = t.options,
            r = n.client_id,
            o = n.client_secret,
            i = n.callback,
            s = n.request_options,
            c = n.user_agent,
            a = t.code_verifier;
          if (!r) throw new Error("client_id is required");
          if (!o && !a)
            throw new Error(
              "either client_secret is required, or code should be generated using a challenge"
            );
          if (!i) throw new Error("callback is required");
          return Promise.resolve(
            P(
              u({}, s, {
                endpoint: "/oauth/token",
                params: {
                  code: e,
                  grant_type: "authorization_code",
                  code_verifier: a,
                  client_id: r,
                  redirect_uri: i
                },
                user_agent: c,
                method: "POST",
                headers: u(
                  {},
                  null == s ? void 0 : s.headers,
                  { "Content-Type": "application/x-www-form-urlencoded" },
                  { Authorization: p(r, o) }
                )
              })
            )
          ).then(function (e) {
            var n = T(e);
            return (t.token = n), { token: n };
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.generateAuthURL = function (e) {
        try {
          var t = function () {
              var t = n.code_challenge,
                o = new URL(e.authorizeUrl || "https://getalby.com/oauth");
              return (
                (o.search = m(
                  u({}, e, {
                    client_id: i,
                    scope: c.join(" "),
                    response_type: "code",
                    redirect_uri: s,
                    code_challenge_method: r,
                    code_challenge: t
                  })
                )),
                o.toString()
              );
            },
            n = this;
          e || (e = {});
          var r,
            o = n.options,
            i = o.client_id,
            s = o.callback,
            c = o.scopes;
          if (!s) throw new Error("callback required");
          if (!c) throw new Error("scopes required");
          var a = (function () {
            if ("S256" === e.code_challenge_method)
              return Promise.resolve(n._generateS256Challenge()).then(
                function () {
                  r = "S256";
                }
              );
            "plain" === e.code_challenge_method &&
              e.code_challenge &&
              ((n.code_challenge = e.code_challenge),
              (n.code_verifier = e.code_challenge),
              (r = "plain"));
          })();
          return Promise.resolve(a && a.then ? a.then(t) : t());
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.getAuthHeader = function () {
        try {
          var e,
            t = function () {
              return { Authorization: "Bearer " + n.token.access_token };
            },
            n = this;
          if (null == (e = n.token) || !e.access_token)
            throw new Error("access_token is required");
          var r = (function () {
            if (n.isAccessTokenExpired())
              return Promise.resolve(n.refreshAccessToken()).then(
                function () {}
              );
          })();
          return Promise.resolve(r && r.then ? r.then(t) : t());
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t._generateS256Challenge = function () {
        try {
          var e = this,
            t = crypto.getRandomValues(new Uint8Array(64));
          return (
            (e.code_verifier = t.reduce(function (e, t) {
              return e + t.toString(16).padStart(2, "0");
            }, "")),
            Promise.resolve(
              crypto.subtle.digest(
                "SHA-256",
                new TextEncoder().encode(e.code_verifier)
              )
            ).then(function (t) {
              var n = new Uint8Array(t);
              e.code_challenge = btoa(String.fromCharCode.apply(String, n))
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
            })
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      e
    );
  })(),
  j = /*#__PURE__*/ (function () {
    function e(e) {
      (this.bearer_token = void 0), (this.bearer_token = e);
    }
    return (
      (e.prototype.getAuthHeader = function () {
        return { Authorization: "Bearer " + this.bearer_token };
      }),
      e
    );
  })(),
  O = { __proto__: null, OAuth2User: q, OAuth2Bearer: j };
function R(e, t) {
  try {
    var n = e();
  } catch (e) {
    return t(e);
  }
  return n && n.then ? n.then(void 0, t) : n;
}
var A = {
    alby: {
      authorizationUrl: "https://nwc.getalby.com/apps/new",
      relayUrl: "wss://relay.getalby.com/v1",
      walletPubkey:
        "69effe7b49a6dd5cf525bd0905917a5005ffe480b58eeb8e861418cf3ae760d9"
    }
  },
  N = /*#__PURE__*/ (function () {
    function e(t) {
      var r;
      (this.relay = void 0),
        (this.relayUrl = void 0),
        (this.secret = void 0),
        (this.walletPubkey = void 0),
        (this.options = void 0),
        t &&
          t.nostrWalletConnectUrl &&
          (t = u({}, e.parseWalletConnectUrl(t.nostrWalletConnectUrl), t));
      var o = A[(null == (r = t) ? void 0 : r.providerName) || "alby"];
      (this.options = u({}, o, t || {})),
        (this.relayUrl = this.options.relayUrl),
        (this.relay = n.relayInit(this.relayUrl)),
        this.options.secret &&
          (this.secret = this.options.secret.toLowerCase().startsWith("nsec")
            ? n.nip19.decode(this.options.secret).data
            : this.options.secret),
        (this.walletPubkey = this.options.walletPubkey
          .toLowerCase()
          .startsWith("npub")
          ? n.nip19.decode(this.options.walletPubkey).data
          : this.options.walletPubkey),
        void 0 === globalThis.WebSocket &&
          console.error(
            "WebSocket is undefined. Make sure to `import websocket-polyfill` for nodejs environments"
          );
    }
    (e.parseWalletConnectUrl = function (e) {
      e = e
        .replace("nostrwalletconnect://", "http://")
        .replace("nostr+walletconnect://", "http://");
      var t = new URL(e),
        n = t.searchParams.get("relay");
      if (!n) throw new Error("No relay URL found in connection string");
      var r = { walletPubkey: t.host, relayUrl: n },
        o = t.searchParams.get("secret");
      return o && (r.secret = o), r;
    }),
      (e.withNewSecret = function (t) {
        return ((t = t || {}).secret = n.generatePrivateKey()), new e(t);
      });
    var t = e.prototype;
    return (
      (t.getNostrWalletConnectUrl = function (e) {
        void 0 === e && (e = !0);
        var t =
          "nostr+walletconnect://" +
          this.walletPubkey +
          "?relay=" +
          this.relayUrl +
          "&pubkey=" +
          this.publicKey;
        return e && (t = t + "&secret=" + this.secret), t;
      }),
      (t.getPublicKey = function () {
        return Promise.resolve(this.publicKey);
      }),
      (t.signEvent = function (e) {
        if (!this.secret) throw new Error("Missing secret key");
        return Promise.resolve(n.finishEvent(e, this.secret));
      }),
      (t.getEventHash = function (e) {
        return n.getEventHash(e);
      }),
      (t.close = function () {
        return this.relay.close();
      }),
      (t.encrypt = function (e, t) {
        try {
          if (!this.secret) throw new Error("Missing secret");
          return Promise.resolve(n.nip04.encrypt(this.secret, e, t));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.decrypt = function (e, t) {
        try {
          if (!this.secret) throw new Error("Missing secret");
          return Promise.resolve(n.nip04.decrypt(this.secret, e, t));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.getAuthorizationUrl = function (e) {
        if (!this.options.authorizationUrl)
          throw new Error("Missing authorizationUrl option");
        var t = new URL(this.options.authorizationUrl);
        return (
          null != e &&
            e.name &&
            t.searchParams.set("name", null == e ? void 0 : e.name),
          t.searchParams.set("pubkey", this.publicKey),
          null != e &&
            e.returnTo &&
            t.searchParams.set("return_to", e.returnTo),
          null != e &&
            e.budgetRenewal &&
            t.searchParams.set("budget_renewal", e.budgetRenewal),
          null != e &&
            e.expiresAt &&
            t.searchParams.set(
              "expires_at",
              Math.floor(e.expiresAt.getTime() / 1e3).toString()
            ),
          null != e &&
            e.maxAmount &&
            t.searchParams.set("max_amount", e.maxAmount.toString()),
          void 0 !== (null == e ? void 0 : e.editable) &&
            t.searchParams.set("editable", e.editable.toString()),
          null != e &&
            e.requestMethods &&
            t.searchParams.set("request_methods", e.requestMethods.join(" ")),
          t
        );
      }),
      (t.initNWC = function (e) {
        void 0 === e && (e = {}), e.name || (e.name = document.location.host);
        var t = this.getAuthorizationUrl(e),
          n = window.outerHeight / 2 + window.screenY - 300,
          r = window.outerWidth / 2 + window.screenX - 200;
        return new Promise(function (e, o) {
          var i = window.open(
            t.toString(),
            document.title + " - Wallet Connect",
            "height=600,width=400,top=" + n + ",left=" + r
          );
          if (i) {
            var s = function n(r) {
                var o = r.data;
                o &&
                  "nwc:success" === o.type &&
                  r.origin === t.protocol + "//" + t.host &&
                  (e(o),
                  clearInterval(u),
                  window.removeEventListener("message", n),
                  i && i.close());
              },
              u = setInterval(function () {
                i &&
                  i.closed &&
                  (o(),
                  clearInterval(u),
                  window.removeEventListener("message", s));
              }, 500);
            window.addEventListener("message", s);
          } else o();
        });
      }),
      (t.getInfo = function () {
        try {
          var e = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  e.executeNip47Request("get_info", {}, function (e) {
                    return !!e.methods;
                  })
                );
              },
              function (e) {
                throw (console.error("Failed to request get_info", e), e);
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.getBalance = function () {
        try {
          var e = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  e.executeNip47Request("get_balance", {}, function (e) {
                    return void 0 !== e.balance;
                  })
                );
              },
              function (e) {
                throw (console.error("Failed to request get_balance", e), e);
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.payInvoice = function (e) {
        try {
          var t = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  t.executeNip47Request("pay_invoice", e, function (e) {
                    return !!e.preimage;
                  })
                );
              },
              function (e) {
                throw (console.error("Failed to request pay_invoice", e), e);
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.payKeysend = function (e) {
        try {
          var t = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  t.executeNip47Request("pay_keysend", e, function (e) {
                    return !!e.preimage;
                  })
                );
              },
              function (e) {
                throw (console.error("Failed to request pay_keysend", e), e);
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.multiPayInvoice = function (e) {
        try {
          var t = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  t.executeMultiNip47Request(
                    "multi_pay_invoice",
                    e,
                    e.invoices.length,
                    function (e) {
                      return !!e.preimage;
                    }
                  )
                ).then(function (e) {
                  return { invoices: e, errors: [] };
                });
              },
              function (e) {
                throw (
                  (console.error("Failed to request multi_pay_keysend", e), e)
                );
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.multiPayKeysend = function (e) {
        try {
          var t = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  t.executeMultiNip47Request(
                    "multi_pay_keysend",
                    e,
                    e.keysends.length,
                    function (e) {
                      return !!e.preimage;
                    }
                  )
                ).then(function (e) {
                  return { keysends: e, errors: [] };
                });
              },
              function (e) {
                throw (
                  (console.error("Failed to request multi_pay_keysend", e), e)
                );
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.makeInvoice = function (e) {
        try {
          var t = this;
          return Promise.resolve(
            R(
              function () {
                if (!e.amount) throw new Error("No amount specified");
                return Promise.resolve(
                  t.executeNip47Request("make_invoice", e, function (e) {
                    return !!e.invoice;
                  })
                );
              },
              function (e) {
                throw (console.error("Failed to request make_invoice", e), e);
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.lookupInvoice = function (e) {
        try {
          var t = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  t.executeNip47Request("lookup_invoice", e, function (e) {
                    return !!e.invoice;
                  })
                );
              },
              function (e) {
                throw (console.error("Failed to request lookup_invoice", e), e);
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.listTransactions = function (e) {
        try {
          var t = this;
          return Promise.resolve(
            R(
              function () {
                return Promise.resolve(
                  t.executeNip47Request("list_transactions", e, function (e) {
                    return !!e.transactions;
                  })
                );
              },
              function (e) {
                throw (
                  (console.error("Failed to request list_transactions", e), e)
                );
              }
            )
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.executeNip47Request = function (e, t, n) {
        try {
          var r = this;
          return Promise.resolve(r._checkConnected()).then(function () {
            return new Promise(function (o, i) {
              try {
                return Promise.resolve(
                  r.encrypt(
                    r.walletPubkey,
                    JSON.stringify({ method: e, params: t })
                  )
                ).then(function (e) {
                  var t = {
                    kind: 23194,
                    created_at: Math.floor(Date.now() / 1e3),
                    tags: [["p", r.walletPubkey]],
                    content: e,
                    pubkey: r.publicKey
                  };
                  return Promise.resolve(r.signEvent(t)).then(function (e) {
                    var t = r.relay.sub([
                        {
                          kinds: [23195],
                          authors: [r.walletPubkey],
                          "#e": [e.id]
                        }
                      ]),
                      s = setTimeout(function () {
                        t.unsub(),
                          i({
                            error: "reply timeout: event " + e.id,
                            code: "INTERNAL"
                          });
                      }, 6e4);
                    t.on("event", function (e) {
                      try {
                        return (
                          clearTimeout(s),
                          t.unsub(),
                          Promise.resolve(
                            r.decrypt(r.walletPubkey, e.content)
                          ).then(function (t) {
                            var r, s, u;
                            try {
                              r = JSON.parse(t);
                            } catch (e) {
                              return void i({
                                error: "invalid response",
                                code: "INTERNAL"
                              });
                            }
                            23195 == e.kind && r.result
                              ? n(r.result)
                                ? o(r.result)
                                : i({
                                    error:
                                      "Response from NWC failed validation: " +
                                      JSON.stringify(r.result),
                                    code: "INTERNAL"
                                  })
                              : i({
                                  error:
                                    null == (s = r.error) ? void 0 : s.message,
                                  code: null == (u = r.error) ? void 0 : u.code
                                });
                          })
                        );
                      } catch (e) {
                        return Promise.reject(e);
                      }
                    });
                    var u = setTimeout(function () {
                        i({ error: "Publish timeout: event " + e.id });
                      }, 5e3),
                      c = R(
                        function () {
                          return Promise.resolve(r.relay.publish(e)).then(
                            function () {
                              clearTimeout(u);
                            }
                          );
                        },
                        function (e) {
                          clearTimeout(u),
                            i({ error: "Failed to publish request: " + e });
                        }
                      );
                    if (c && c.then) return c.then(function () {});
                  });
                });
              } catch (e) {
                Promise.reject(e);
              }
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.executeMultiNip47Request = function (e, t, n, r) {
        try {
          var o = this;
          return Promise.resolve(o._checkConnected()).then(function () {
            var i = [];
            return new Promise(function (s, c) {
              try {
                return Promise.resolve(
                  o.encrypt(
                    o.walletPubkey,
                    JSON.stringify({ method: e, params: t })
                  )
                ).then(function (e) {
                  var t = {
                    kind: 23194,
                    created_at: Math.floor(Date.now() / 1e3),
                    tags: [["p", o.walletPubkey]],
                    content: e,
                    pubkey: o.publicKey
                  };
                  return Promise.resolve(o.signEvent(t)).then(function (e) {
                    var t = o.relay.sub([
                        {
                          kinds: [23195],
                          authors: [o.walletPubkey],
                          "#e": [e.id]
                        }
                      ]),
                      a = setTimeout(function () {
                        t.unsub(),
                          c({
                            error: "reply timeout: event " + e.id,
                            code: "INTERNAL"
                          });
                      }, 6e4);
                    t.on("event", function (e) {
                      try {
                        return Promise.resolve(
                          o.decrypt(o.walletPubkey, e.content)
                        ).then(function (o) {
                          var l, h, d;
                          try {
                            l = JSON.parse(o);
                          } catch (e) {
                            return (
                              console.error(e),
                              clearTimeout(a),
                              t.unsub(),
                              void c({
                                error: "invalid response",
                                code: "INTERNAL"
                              })
                            );
                          }
                          if (23195 == e.kind && l.result)
                            try {
                              var f;
                              if (!r(l.result))
                                throw new Error(
                                  "Response from NWC failed validation: " +
                                    JSON.stringify(l.result)
                                );
                              var m =
                                null ==
                                (f = e.tags.find(function (e) {
                                  return "d" === e[0];
                                }))
                                  ? void 0
                                  : f[1];
                              if (void 0 === m)
                                throw new Error(
                                  "No d tag found in response event"
                                );
                              i.push(u({}, l.result, { dTag: m })),
                                i.length === n &&
                                  (clearTimeout(a), t.unsub(), s(i));
                            } catch (e) {
                              console.error(e),
                                clearTimeout(a),
                                t.unsub(),
                                c({ error: e.message, code: "INTERNAL" });
                            }
                          else
                            clearTimeout(a),
                              t.unsub(),
                              c({
                                error:
                                  null == (h = l.error) ? void 0 : h.message,
                                code: null == (d = l.error) ? void 0 : d.code
                              });
                        });
                      } catch (e) {
                        return Promise.reject(e);
                      }
                    });
                    var l = setTimeout(function () {
                        c({ error: "Publish timeout: event " + e.id });
                      }, 5e3),
                      h = R(
                        function () {
                          return Promise.resolve(o.relay.publish(e)).then(
                            function () {
                              clearTimeout(l);
                            }
                          );
                        },
                        function (e) {
                          clearTimeout(l),
                            c({ error: "Failed to publish request: " + e });
                        }
                      );
                    if (h && h.then) return h.then(function () {});
                  });
                });
              } catch (e) {
                Promise.reject(e);
              }
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t._checkConnected = function () {
        try {
          if (!this.secret) throw new Error("Missing secret key");
          return Promise.resolve(this.relay.connect()).then(function () {});
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      s(e, [
        {
          key: "nostrWalletConnectUrl",
          get: function () {
            return this.getNostrWalletConnectUrl();
          }
        },
        {
          key: "connected",
          get: function () {
            return 1 === this.relay.status;
          }
        },
        {
          key: "publicKey",
          get: function () {
            if (!this.secret) throw new Error("Missing secret key");
            return n.getPublicKey(this.secret);
          }
        }
      ]),
      e
    );
  })(),
  x = { __proto__: null, NWCs: A, NWCClient: N },
  U = {
    get_info: "getInfo",
    get_balance: "getBalance",
    make_invoice: "makeInvoice",
    pay_invoice: "sendPayment",
    pay_keysend: "payKeysend",
    lookup_invoice: "lookupInvoice",
    list_transactions: "listTransactions",
    multi_pay_invoice: "sendMultiPayment",
    multi_pay_keysend: "multiKeysend"
  },
  S = /*#__PURE__*/ (function () {
    function e(e) {
      (this._enabled = !1),
        (this.client = void 0),
        (this.subscribers = void 0),
        (this.client = new N(e)),
        (this.subscribers = {});
    }
    e.withNewSecret = function (t) {
      return ((t = t || {}).secret = n.generatePrivateKey()), new e(t);
    };
    var t = e.prototype;
    return (
      (t.on = function (e, t) {
        this.subscribers[e] = t;
      }),
      (t.notify = function (e, t) {
        var n = this.subscribers[e];
        n && n(t);
      }),
      (t.getNostrWalletConnectUrl = function (e) {
        return (
          void 0 === e && (e = !0),
          console.warn(
            "getNostrWalletConnectUrl is deprecated. Please use client.getNostrWalletConnectUrl instead."
          ),
          this.client.getNostrWalletConnectUrl(e)
        );
      }),
      (t.getPublicKey = function () {
        return this.client.getPublicKey();
      }),
      (t.signEvent = function (e) {
        return this.client.signEvent(e);
      }),
      (t.getEventHash = function (e) {
        return (
          console.warn(
            "getEventHash is deprecated. Please use client.getEventHash instead."
          ),
          this.client.getEventHash(e)
        );
      }),
      (t.enable = function () {
        try {
          return (this._enabled = !0), Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.close = function () {
        return this.client.close();
      }),
      (t.encrypt = function (e, t) {
        try {
          return (
            console.warn(
              "encrypt is deprecated. Please use client.encrypt instead."
            ),
            Promise.resolve(this.client.encrypt(e, t))
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.decrypt = function (e, t) {
        try {
          return (
            console.warn(
              "decrypt is deprecated. Please use client.decrypt instead."
            ),
            Promise.resolve(this.client.decrypt(e, t))
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.getAuthorizationUrl = function (e) {
        return (
          console.warn(
            "getAuthorizationUrl is deprecated. Please use client.getAuthorizationUrl instead."
          ),
          this.client.getAuthorizationUrl(e)
        );
      }),
      (t.initNWC = function (e) {
        return (
          void 0 === e && (e = {}),
          console.warn(
            "initNWC is deprecated. Please use client.initNWC instead."
          ),
          this.client.initNWC(e)
        );
      }),
      (t.getInfo = function () {
        try {
          var e = this;
          return Promise.resolve(e.checkEnabled()).then(function () {
            var t = ["lightning", "nostr"],
              n = "Alby JS SDK";
            return (function (r, o) {
              try {
                var i = Promise.resolve(e.client.getInfo()).then(function (r) {
                  var o = {
                    methods: r.methods.map(function (e) {
                      return U[e];
                    }),
                    node: {
                      alias: r.alias,
                      pubkey: r.pubkey,
                      color: r.color
                    },
                    supports: t,
                    version: n
                  };
                  return e.notify("getInfo", o), o;
                });
              } catch (e) {
                return o(e);
              }
              return i && i.then ? i.then(void 0, o) : i;
            })(0, function (e) {
              return (
                console.error("Using minimal getInfo", e),
                {
                  methods: ["sendPayment"],
                  node: {},
                  supports: t,
                  version: n
                }
              );
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.getBalance = function () {
        try {
          var e = this;
          return Promise.resolve(e.checkEnabled()).then(function () {
            return Promise.resolve(e.client.getBalance()).then(function (t) {
              var n = {
                balance: Math.floor(t.balance / 1e3),
                currency: "sats"
              };
              return e.notify("getBalance", n), n;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.sendPayment = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.checkEnabled()).then(function () {
            return Promise.resolve(t.client.payInvoice({ invoice: e })).then(
              function (e) {
                var n = { preimage: e.preimage };
                return t.notify("sendPayment", n), n;
              }
            );
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.keysend = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.checkEnabled()).then(function () {
            return Promise.resolve(t.client.payKeysend(C(e))).then(function (
              e
            ) {
              var n = { preimage: e.preimage };
              return t.notify("keysend", n), n;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.makeInvoice = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.checkEnabled()).then(function () {
            var n,
              r = "object" == typeof e ? e : void 0,
              o = +(null != (n = null == r ? void 0 : r.amount) ? n : e);
            if (!o) throw new Error("No amount specified");
            return Promise.resolve(
              t.client.makeInvoice({
                amount: 1e3 * o,
                description: null == r ? void 0 : r.defaultMemo
              })
            ).then(function (e) {
              var n = { paymentRequest: e.invoice };
              return t.notify("makeInvoice", n), n;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.lookupInvoice = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.checkEnabled()).then(function () {
            return Promise.resolve(
              t.client.lookupInvoice({
                invoice: e.paymentRequest,
                payment_hash: e.paymentHash
              })
            ).then(function (e) {
              var n = {
                preimage: e.preimage,
                paymentRequest: e.invoice,
                paid: !!e.settled_at
              };
              return t.notify("lookupInvoice", n), n;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.listTransactions = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.checkEnabled()).then(function () {
            return Promise.resolve(t.client.listTransactions(e)).then(function (
              e
            ) {
              var n = { transactions: e.transactions.map(I) };
              return t.notify("listTransactions", n), n;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.sendMultiPayment = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.checkEnabled()).then(function () {
            return Promise.resolve(
              t.client.multiPayInvoice({
                invoices: e.map(function (e, t) {
                  return { invoice: e, id: t.toString() };
                })
              })
            ).then(function (n) {
              var r = {
                payments: n.invoices.map(function (t) {
                  var n = e[parseInt(t.dTag)];
                  if (!n)
                    throw new Error(
                      "Could not find paymentRequest matching response d tag"
                    );
                  return { paymentRequest: n, preimage: t.preimage };
                }),
                errors: []
              };
              return t.notify("sendMultiPayment", r), r;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.multiKeysend = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.checkEnabled()).then(function () {
            return Promise.resolve(
              t.client.multiPayKeysend({
                keysends: e.map(function (e, t) {
                  return u({}, C(e), { id: t.toString() });
                })
              })
            ).then(function (n) {
              var r = {
                keysends: n.keysends.map(function (t) {
                  var n = e[parseInt(t.dTag)];
                  if (!n)
                    throw new Error(
                      "Could not find keysend matching response d tag"
                    );
                  return { keysend: n, preimage: t.preimage };
                }),
                errors: []
              };
              return t.notify("multiKeysend", r), r;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.lnurl = function (e) {
        throw new Error("Method not implemented.");
      }),
      (t.request = function (e, t) {
        throw new Error("Method not implemented.");
      }),
      (t.signMessage = function (e) {
        throw new Error("Method not implemented.");
      }),
      (t.verifyMessage = function (e, t) {
        throw new Error("Method not implemented.");
      }),
      (t.checkEnabled = function () {
        try {
          if (!this._enabled)
            throw new Error(
              "please call enable() and await the promise before calling this function"
            );
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      s(e, [
        {
          key: "relay",
          get: function () {
            return (
              console.warn(
                "relay is deprecated. Please use client.relay instead."
              ),
              this.client.relay
            );
          }
        },
        {
          key: "relayUrl",
          get: function () {
            return (
              console.warn(
                "relayUrl is deprecated. Please use client.relayUrl instead."
              ),
              this.client.relayUrl
            );
          }
        },
        {
          key: "walletPubkey",
          get: function () {
            return (
              console.warn(
                "walletPubkey is deprecated. Please use client.walletPubkey instead."
              ),
              this.client.walletPubkey
            );
          }
        },
        {
          key: "options",
          get: function () {
            return this.client.options;
          }
        },
        {
          key: "secret",
          get: function () {
            return (
              console.warn(
                "secret is deprecated. Please use client.secret instead."
              ),
              this.client.secret
            );
          }
        },
        {
          key: "nostrWalletConnectUrl",
          get: function () {
            return (
              console.warn(
                "nostrWalletConnectUrl is deprecated. Please use client.nostrWalletConnectUrl instead."
              ),
              this.client.nostrWalletConnectUrl
            );
          }
        },
        {
          key: "connected",
          get: function () {
            return (
              console.warn(
                "connected is deprecated. Please use client.connected instead."
              ),
              this.client.connected
            );
          }
        },
        {
          key: "publicKey",
          get: function () {
            return (
              console.warn(
                "publicKey is deprecated. Please use client.publicKey instead."
              ),
              this.client.publicKey
            );
          }
        }
      ]),
      e
    );
  })();
function I(e) {
  return u({}, e, {
    amount: Math.floor(e.amount / 1e3),
    fees_paid: e.fees_paid ? Math.floor(e.fees_paid / 1e3) : 0
  });
}
function C(e) {
  return {
    amount: 1e3 * +e.amount,
    pubkey: e.destination,
    tlv_records: e.customRecords
      ? Object.entries(e.customRecords).map(function (e) {
          return { type: parseInt(e[0]), value: e[1] };
        })
      : []
  };
}
var W = S;
function M(e) {
  var t = {};
  return (
    e.recipient.customKey &&
      e.recipient.customValue &&
      (t[e.recipient.customKey] = e.recipient.customValue),
    (t[7629169] = JSON.stringify(e.boostagram)),
    { destination: e.recipient.address, amount: e.amount, customRecords: t }
  );
}
var K = /*#__PURE__*/ (function () {
  function e(e, t) {
    (this.auth = void 0),
      (this.defaultRequestOptions = void 0),
      (this.auth = "string" == typeof e ? new j(e) : e),
      (this.defaultRequestOptions = u({}, t, {
        user_agent: null == t ? void 0 : t.user_agent
      }));
  }
  var t = e.prototype;
  return (
    (t.accountBalance = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/balance",
          params: e,
          method: "GET"
        })
      );
    }),
    (t.accountSummary = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/user/summary",
          params: e,
          method: "GET"
        })
      );
    }),
    (t.accountInformation = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/user/me",
          params: e,
          method: "GET"
        })
      );
    }),
    (t.accountValue4Value = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/user/value4value",
          params: e,
          method: "GET"
        })
      );
    }),
    (t.incomingInvoices = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/invoices/incoming",
          params: e,
          method: "GET"
        })
      );
    }),
    (t.outgoingInvoices = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/invoices/outgoing",
          params: e,
          method: "GET"
        })
      );
    }),
    (t.invoices = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/invoices",
          params: e,
          method: "GET"
        })
      );
    }),
    (t.getInvoice = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/invoices/" + e,
          method: "GET"
        })
      );
    }),
    (t.decodeInvoice = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/decode/bolt11/" + e,
          method: "GET"
        })
      );
    }),
    (t.createInvoice = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/invoices",
          request_body: e,
          method: "POST"
        })
      );
    }),
    (t.keysend = function (e, t) {
      var n, r;
      return (
        Array.isArray(e)
          ? ((n = "/payments/keysend/multi"), (r = { keysends: e }))
          : ((n = "/payments/keysend"), (r = e)),
        P(
          u({ auth: this.auth }, this.defaultRequestOptions, t, {
            endpoint: n,
            request_body: r,
            method: "POST"
          })
        )
      );
    }),
    (t.sendPayment = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/payments/bolt11",
          request_body: e,
          method: "POST"
        })
      );
    }),
    (t.sendBoostagram = function (e, t) {
      var n, r;
      return (
        Array.isArray(e)
          ? ((n = "/payments/keysend/multi"),
            (r = {
              keysends: e.map(function (e) {
                return M(e);
              })
            }))
          : ((n = "/payments/keysend"), (r = M(e))),
        P(
          u({ auth: this.auth }, this.defaultRequestOptions, t, {
            endpoint: n,
            request_body: r,
            method: "POST"
          })
        )
      );
    }),
    (t.sendToAlbyAccount = function (e, t) {
      return (
        console.warn(
          "sendToAlbyAccount is deprecated. Please use sendBoostagramToAlbyAccount instead."
        ),
        this.sendBoostagramToAlbyAccount(e, t)
      );
    }),
    (t.sendBoostagramToAlbyAccount = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/payments/keysend",
          request_body: {
            destination:
              "030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3",
            customRecords: { 696969: e.account },
            amount: e.amount,
            memo: e.memo
          },
          method: "POST"
        })
      );
    }),
    (t.createWebhookEndpoint = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/webhook_endpoints",
          request_body: e,
          method: "POST"
        })
      );
    }),
    (t.deleteWebhookEndpoint = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/webhook_endpoints/" + e,
          method: "DELETE"
        })
      );
    }),
    (t.getSwapInfo = function (e) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, e, {
          endpoint: "/swaps/info",
          method: "GET"
        })
      );
    }),
    (t.createSwap = function (e, t) {
      return P(
        u({ auth: this.auth }, this.defaultRequestOptions, t, {
          endpoint: "/swaps",
          method: "POST",
          request_body: e
        })
      );
    }),
    e
  );
})();
function L(e, t) {
  try {
    var n = e();
  } catch (e) {
    return t(!0, e);
  }
  return n && n.then ? n.then(t.bind(null, !1), t.bind(null, !0)) : t(!1, n);
}
function z(e, t) {
  try {
    var n = e();
  } catch (e) {
    return t(e);
  }
  return n && n.then ? n.then(void 0, t) : n;
}
var B = {
  __proto__: null,
  NostrWebLNProvider: S,
  NWC: W,
  OauthWeblnProvider: /*#__PURE__*/ (function () {
    function e(e) {
      (this.client = void 0),
        (this.auth = void 0),
        (this.oauth = void 0),
        (this.subscribers = void 0),
        (this.isExecuting = void 0),
        (this.auth = e.auth),
        (this.client = new K(e.auth)),
        (this.oauth = !0),
        (this.subscribers = {}),
        (this.isExecuting = !1);
    }
    var t = e.prototype;
    return (
      (t.on = function (e, t) {
        this.subscribers[e] = t;
      }),
      (t.notify = function (e, t) {
        var n = this.subscribers[e];
        n && n(t);
      }),
      (t.enable = function () {
        try {
          var e,
            t = this;
          return t.isExecuting
            ? Promise.resolve()
            : null != (e = t.auth.token) && e.access_token
            ? Promise.resolve({ enabled: !0 })
            : Promise.resolve(
                (function () {
                  if (
                    "undefined" == typeof window ||
                    void 0 === window.document
                  )
                    throw new Error("Missing access token");
                  var e = L(
                    function () {
                      return (
                        (t.isExecuting = !0),
                        Promise.resolve(t.openAuthorization()).then(
                          function () {}
                        )
                      );
                    },
                    function (e, n) {
                      if (((t.isExecuting = !1), e)) throw n;
                      return n;
                    }
                  );
                  if (e && e.then) return e.then(function () {});
                })()
              );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.sendPayment = function (e) {
        try {
          var t = this;
          return t.isExecuting
            ? Promise.resolve()
            : Promise.resolve(
                L(
                  function () {
                    return z(
                      function () {
                        return (
                          (t.isExecuting = !0),
                          Promise.resolve(
                            t.client.sendPayment({ invoice: e })
                          ).then(function (e) {
                            return (
                              t.notify("sendPayment", e),
                              { preimage: e.payment_preimage }
                            );
                          })
                        );
                      },
                      function (e) {
                        var t = "Unknown Error";
                        throw (
                          (e instanceof Error && (t = e.message), new Error(t))
                        );
                      }
                    );
                  },
                  function (e, n) {
                    if (((t.isExecuting = !1), e)) throw n;
                    return n;
                  }
                )
              );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.keysend = function (e) {
        try {
          var t = this;
          return t.isExecuting
            ? Promise.resolve()
            : Promise.resolve(
                L(
                  function () {
                    return z(
                      function () {
                        return (
                          (t.isExecuting = !0),
                          Promise.resolve(t.client.keysend(e)).then(function (
                            e
                          ) {
                            return (
                              t.notify("keysend", e),
                              { preimage: e.payment_preimage }
                            );
                          })
                        );
                      },
                      function (e) {
                        var t = "Unknown Error";
                        throw (
                          (e instanceof Error && (t = e.message), new Error(t))
                        );
                      }
                    );
                  },
                  function (e, n) {
                    if (((t.isExecuting = !1), e)) throw n;
                    return n;
                  }
                )
              );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.getInfo = function () {
        try {
          return Promise.resolve({ alias: "Alby" });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.makeInvoice = function (e) {
        try {
          var t = this;
          return t.isExecuting
            ? Promise.resolve()
            : Promise.resolve(
                L(
                  function () {
                    return z(
                      function () {
                        return (
                          (t.isExecuting = !0),
                          Promise.resolve(
                            t.client.createInvoice({
                              amount: parseInt(e.amount.toString()),
                              description: e.defaultMemo
                            })
                          ).then(function (e) {
                            return (
                              t.notify("makeInvoice", e),
                              { paymentRequest: e.payment_request }
                            );
                          })
                        );
                      },
                      function (e) {
                        var t = "Unknown Error";
                        throw (
                          (e instanceof Error && (t = e.message), new Error(t))
                        );
                      }
                    );
                  },
                  function (e, n) {
                    if (((t.isExecuting = !1), e)) throw n;
                    return n;
                  }
                )
              );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.openAuthorization = function () {
        try {
          var e = this,
            t = window.outerHeight / 2 + window.screenY - 350,
            n = window.outerWidth / 2 + window.screenX - 300;
          return Promise.resolve(
            e.auth.generateAuthURL({ code_challenge_method: "S256" })
          ).then(function (r) {
            return new Promise(function (o, i) {
              var s = window.open(
                  r,
                  document.title + " - WebLN enable",
                  "height=700,width=600,top=" + t + ",left=" + n
                ),
                u = !1;
              window.addEventListener("message", function (t) {
                try {
                  var n = t.data,
                    r = (function () {
                      if (
                        n &&
                        "alby:oauth:success" === n.type &&
                        t.origin ===
                          document.location.protocol +
                            "//" +
                            document.location.host &&
                        !u
                      ) {
                        (u = !0),
                          console.info("Processing OAuth code response");
                        var r = n.payload.code,
                          c = z(
                            function () {
                              return Promise.resolve(
                                e.auth.requestAccessToken(r)
                              ).then(function () {
                                (e.client = new K(e.auth)),
                                  s && s.close(),
                                  e.notify("enable"),
                                  o({ enabled: !0 });
                              });
                            },
                            function (e) {
                              console.error(e), i({ enabled: !1 });
                            }
                          );
                        if (c && c.then) return c.then(function () {});
                      }
                    })();
                  return Promise.resolve(
                    r && r.then ? r.then(function () {}) : void 0
                  );
                } catch (e) {
                  return Promise.reject(e);
                }
              });
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      e
    );
  })()
};

export { K as Client, O as auth, x as nwc, y as types, B as webln };
