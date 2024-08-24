var W = Object.defineProperty;
var X = (e, r, t) => r in e ? W(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var p = (e, r, t) => (X(e, typeof r != "symbol" ? r + "" : r, t), t);
class c {
  static debug(r) {
    this._logLevel >= 4 && console.debug(this._prefix + r);
  }
  static info(r, t = void 0) {
    this._logLevel >= 3 && console.info(this._prefix + r, t);
  }
  static warn(r) {
    this._logLevel >= 1 && console.warn(this._prefix + r);
  }
  static error(r, t = !0) {
    if (this._logLevel >= 0) {
      if (t)
        throw new Error(this._prefix + r);
      console.error(this._prefix + r);
    }
  }
  static setLogLevel(r) {
    this._logLevel = r;
  }
}
p(c, "_prefix", "[Cypress-SignalR-Mock] - "), p(c, "_logLevel", 3);
var k = function(e, r) {
  return k = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
    t.__proto__ = n;
  } || function(t, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
  }, k(e, r);
};
function w(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  k(e, r);
  function t() {
    this.constructor = e;
  }
  e.prototype = r === null ? Object.create(r) : (t.prototype = r.prototype, new t());
}
function x(e) {
  var r = typeof Symbol == "function" && Symbol.iterator, t = r && e[r], n = 0;
  if (t)
    return t.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
      }
    };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function y(e, r) {
  var t = typeof Symbol == "function" && e[Symbol.iterator];
  if (!t)
    return e;
  var n = t.call(e), o, i = [], s;
  try {
    for (; (r === void 0 || r-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (u) {
    s = { error: u };
  } finally {
    try {
      o && !o.done && (t = n.return) && t.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return i;
}
function _(e, r, t) {
  if (t || arguments.length === 2)
    for (var n = 0, o = r.length, i; n < o; n++)
      (i || !(n in r)) && (i || (i = Array.prototype.slice.call(r, 0, n)), i[n] = r[n]);
  return e.concat(i || Array.prototype.slice.call(r));
}
function f(e) {
  return typeof e == "function";
}
function H(e) {
  var r = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, t = e(r);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var C = H(function(e) {
  return function(t) {
    e(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(n, o) {
      return o + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function P(e, r) {
  if (e) {
    var t = e.indexOf(r);
    0 <= t && e.splice(t, 1);
  }
}
var S = function() {
  function e(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var r, t, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var u = x(s), a = u.next(); !a.done; a = u.next()) {
              var m = a.value;
              m.remove(this);
            }
          } catch (l) {
            r = { error: l };
          } finally {
            try {
              a && !a.done && (t = u.return) && t.call(u);
            } finally {
              if (r)
                throw r.error;
            }
          }
        else
          s.remove(this);
      var I = this.initialTeardown;
      if (f(I))
        try {
          I();
        } catch (l) {
          i = l instanceof C ? l.errors : [l];
        }
      var M = this._finalizers;
      if (M) {
        this._finalizers = null;
        try {
          for (var b = x(M), h = b.next(); !h.done; h = b.next()) {
            var Q = h.value;
            try {
              A(Q);
            } catch (l) {
              i = i ?? [], l instanceof C ? i = _(_([], y(i)), y(l.errors)) : i.push(l);
            }
          }
        } catch (l) {
          n = { error: l };
        } finally {
          try {
            h && !h.done && (o = b.return) && o.call(b);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new C(i);
    }
  }, e.prototype.add = function(r) {
    var t;
    if (r && r !== this)
      if (this.closed)
        A(r);
      else {
        if (r instanceof e) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(r);
      }
  }, e.prototype._hasParent = function(r) {
    var t = this._parentage;
    return t === r || Array.isArray(t) && t.includes(r);
  }, e.prototype._addParent = function(r) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(r), t) : t ? [t, r] : r;
  }, e.prototype._removeParent = function(r) {
    var t = this._parentage;
    t === r ? this._parentage = null : Array.isArray(t) && P(t, r);
  }, e.prototype.remove = function(r) {
    var t = this._finalizers;
    t && P(t, r), r instanceof e && r._removeParent(this);
  }, e.EMPTY = function() {
    var r = new e();
    return r.closed = !0, r;
  }(), e;
}(), F = S.EMPTY;
function Y(e) {
  return e instanceof S || e && "closed" in e && f(e.remove) && f(e.add) && f(e.unsubscribe);
}
function A(e) {
  f(e) ? e() : e.unsubscribe();
}
var B = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, j = {
  setTimeout: function(e, r) {
    for (var t = [], n = 2; n < arguments.length; n++)
      t[n - 2] = arguments[n];
    var o = j.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, _([e, r], y(t))) : setTimeout.apply(void 0, _([e, r], y(t)));
  },
  clearTimeout: function(e) {
    var r = j.delegate;
    return ((r == null ? void 0 : r.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function Z(e) {
  j.setTimeout(function() {
    throw e;
  });
}
function L() {
}
function v(e) {
  e();
}
var q = function(e) {
  w(r, e);
  function r(t) {
    var n = e.call(this) || this;
    return n.isStopped = !1, t ? (n.destination = t, Y(t) && t.add(n)) : n.destination = tr, n;
  }
  return r.create = function(t, n, o) {
    return new D(t, n, o);
  }, r.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, r.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(t) {
    this.destination.next(t);
  }, r.prototype._error = function(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }, r.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, r;
}(S), z = Function.prototype.bind;
function E(e, r) {
  return z.call(e, r);
}
var N = function() {
  function e(r) {
    this.partialObserver = r;
  }
  return e.prototype.next = function(r) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(r);
      } catch (n) {
        d(n);
      }
  }, e.prototype.error = function(r) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(r);
      } catch (n) {
        d(n);
      }
    else
      d(r);
  }, e.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (t) {
        d(t);
      }
  }, e;
}(), D = function(e) {
  w(r, e);
  function r(t, n, o) {
    var i = e.call(this) || this, s;
    if (f(t) || !t)
      s = {
        next: t ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var u;
      i && B.useDeprecatedNextContext ? (u = Object.create(t), u.unsubscribe = function() {
        return i.unsubscribe();
      }, s = {
        next: t.next && E(t.next, u),
        error: t.error && E(t.error, u),
        complete: t.complete && E(t.complete, u)
      }) : s = t;
    }
    return i.destination = new N(s), i;
  }
  return r;
}(q);
function d(e) {
  Z(e);
}
function rr(e) {
  throw e;
}
var tr = {
  closed: !0,
  next: L,
  error: rr,
  complete: L
}, er = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function nr(e) {
  return e;
}
function or(e) {
  return e.length === 0 ? nr : e.length === 1 ? e[0] : function(t) {
    return e.reduce(function(n, o) {
      return o(n);
    }, t);
  };
}
var $ = function() {
  function e(r) {
    r && (this._subscribe = r);
  }
  return e.prototype.lift = function(r) {
    var t = new e();
    return t.source = this, t.operator = r, t;
  }, e.prototype.subscribe = function(r, t, n) {
    var o = this, i = sr(r) ? r : new D(r, t, n);
    return v(function() {
      var s = o, u = s.operator, a = s.source;
      i.add(u ? u.call(i, a) : a ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (t) {
      r.error(t);
    }
  }, e.prototype.forEach = function(r, t) {
    var n = this;
    return t = R(t), new t(function(o, i) {
      var s = new D({
        next: function(u) {
          try {
            r(u);
          } catch (a) {
            i(a), s.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(s);
    });
  }, e.prototype._subscribe = function(r) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(r);
  }, e.prototype[er] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var r = [], t = 0; t < arguments.length; t++)
      r[t] = arguments[t];
    return or(r)(this);
  }, e.prototype.toPromise = function(r) {
    var t = this;
    return r = R(r), new r(function(n, o) {
      var i;
      t.subscribe(function(s) {
        return i = s;
      }, function(s) {
        return o(s);
      }, function() {
        return n(i);
      });
    });
  }, e.create = function(r) {
    return new e(r);
  }, e;
}();
function R(e) {
  var r;
  return (r = e ?? B.Promise) !== null && r !== void 0 ? r : Promise;
}
function ir(e) {
  return e && f(e.next) && f(e.error) && f(e.complete);
}
function sr(e) {
  return e && e instanceof q || ir(e) && Y(e);
}
var ur = H(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), O = function(e) {
  w(r, e);
  function r() {
    var t = e.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return r.prototype.lift = function(t) {
    var n = new U(this, this);
    return n.operator = t, n;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new ur();
  }, r.prototype.next = function(t) {
    var n = this;
    v(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var s = x(n.currentObservers), u = s.next(); !u.done; u = s.next()) {
            var a = u.value;
            a.next(t);
          }
        } catch (m) {
          o = { error: m };
        } finally {
          try {
            u && !u.done && (i = s.return) && i.call(s);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, r.prototype.error = function(t) {
    var n = this;
    v(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = t;
        for (var o = n.observers; o.length; )
          o.shift().error(t);
      }
    });
  }, r.prototype.complete = function() {
    var t = this;
    v(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.isStopped = !0;
        for (var n = t.observers; n.length; )
          n.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var t;
      return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(t) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
  }, r.prototype._subscribe = function(t) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
  }, r.prototype._innerSubscribe = function(t) {
    var n = this, o = this, i = o.hasError, s = o.isStopped, u = o.observers;
    return i || s ? F : (this.currentObservers = null, u.push(t), new S(function() {
      n.currentObservers = null, P(u, t);
    }));
  }, r.prototype._checkFinalizedStatuses = function(t) {
    var n = this, o = n.hasError, i = n.thrownError, s = n.isStopped;
    o ? t.error(i) : s && t.complete();
  }, r.prototype.asObservable = function() {
    var t = new $();
    return t.source = this, t;
  }, r.create = function(t, n) {
    return new U(t, n);
  }, r;
}($), U = function(e) {
  w(r, e);
  function r(t, n) {
    var o = e.call(this) || this;
    return o.destination = t, o.source = n, o;
  }
  return r.prototype.next = function(t) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, t);
  }, r.prototype.error = function(t) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, t);
  }, r.prototype.complete = function() {
    var t, n;
    (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t);
  }, r.prototype._subscribe = function(t) {
    var n, o;
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && o !== void 0 ? o : F;
  }, r;
}(O);
class cr {
  constructor(r, t) {
    this._subject = r, this._observer = t;
  }
  dispose() {
    const r = this._subject.observers.indexOf(this._observer);
    r > -1 && this._subject.observers.splice(r, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((t) => {
    });
  }
}
class ar {
  constructor() {
    this.observers = [];
  }
  next(r) {
    for (const t of this.observers)
      t.next(r);
  }
  error(r) {
    for (const t of this.observers)
      t.error && t.error(r);
  }
  complete() {
    for (const r of this.observers)
      r.complete && r.complete();
  }
  subscribe(r) {
    return this.observers.push(r), new cr(this, r);
  }
}
class lr {
  constructor(r) {
    p(this, "_hubConnectionData", []);
    p(this, "_serverInvokes", []);
    p(this, "name");
    this.name = r;
  }
  publish(r, t) {
    r = r.toLowerCase();
    const n = this._hubConnectionData.filter(
      (o) => o.messageType === r
    );
    if (n.length === 0) {
      c.warn(`No subscribers for ${r}`);
      return;
    }
    c.debug(
      `Publishing action: ${r} to ${n.length} subscribers`
    ), n.forEach((o) => {
      o.channel.next({ name: r, value: t });
    });
  }
  verify(r, t) {
    r = r.toLowerCase();
    const n = this._serverInvokes.filter(
      (o) => o.action === r
    );
    t && t(n);
  }
  on(r, t) {
    r = r.toLowerCase(), this._hubConnectionData.some((i) => i.messageType === r) || this._hubConnectionData.push({
      messageType: r,
      isStream: !1,
      channel: new O(),
      subscriptions: []
    });
    let n = this._hubConnectionData.find(
      (i) => i.messageType === r
    );
    if (!n)
      throw new Error(`Could not find connection data for ${r}`);
    let o = n.channel.subscribe((i) => {
      t(i.value);
    });
    n.subscriptions.push({
      handler: t,
      subscription: o
    });
  }
  /** Invokes a streaming hub method on the server using the specified name and arguments.
   *
   * @typeparam T The type of the items returned by the server.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
   */
  // @ts-ignore
  stream(r, ...t) {
    r = r.toLowerCase(), this._hubConnectionData.some((i) => i.messageType === r) || this._hubConnectionData.push({
      messageType: r,
      isStream: !0,
      channel: new O(),
      subscriptions: []
    });
    let n = this._hubConnectionData.find(
      (i) => i.messageType === r
    );
    if (!n)
      throw new Error(`Could not find connection data for ${r}`);
    const o = new ar();
    return n.channel.subscribe({
      next: (i) => o.next(i),
      error: (i) => o.error(i),
      complete: () => o.complete()
    }), o;
  }
  /** Invokes a hub method on the server using the specified name and arguments.
   *
   * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
   * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
   * resolving the Promise.
   *
   * @typeparam T The expected return type.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
   */
  invoke(r, ...t) {
    return new Promise((n) => {
      this._serverInvokes.push({
        action: r,
        args: t
      }), n(0);
    });
  }
  off(r, t) {
    r = r.toLowerCase();
    const n = this._hubConnectionData.findIndex(
      (o) => o.messageType === r
    );
    if (n == -1) {
      c.warn(`No channels registered for action name: ${r}`);
      return;
    }
    if (t) {
      const o = this._hubConnectionData[n].subscriptions.findIndex((i) => i.handler === t);
      if (o == -1) {
        c.warn(
          `Could not find the handler to delete for action name: ${r}`
        );
        return;
      }
      this._hubConnectionData[n].subscriptions.splice(o, 1), this._hubConnectionData[n].subscriptions.length === 0 && this._hubConnectionData.splice(n, 1);
    } else
      this._hubConnectionData.splice(n, 1);
  }
  /** Registers a handler that will be invoked when the connection is closed.
   *
   * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
   */
  // @ts-ignore
  onclose(r) {
  }
  /** Starts the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
   */
  start() {
    return Promise.resolve();
  }
  /** Stops the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
   */
  async stop() {
    return Promise.resolve();
  }
  /** Registers a handler that will be invoked when the connection starts reconnecting.
   *
   * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
   */
  // @ts-ignore
  onreconnecting(r) {
  }
  /** Registers a handler that will be invoked when the connection successfully reconnects.
   *
   * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
   */
  // @ts-ignore
  onreconnected(r) {
  }
  /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
   *
   * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
   * be processing the invocation.
   *
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
   */
  // @ts-ignore
  send(r, ...t) {
    return Promise.resolve();
  }
  // endregion
}
function G() {
  return T() ? !1 : window.hasOwnProperty("Cypress");
}
function g() {
  return !T() && window["cypress-signalr-mock"] ? window["cypress-signalr-mock"] : (J(), g());
}
function fr(e) {
  T() || (window["cypress-signalr-mock"] = e);
}
function J() {
  fr(pr());
}
function pr() {
  return {
    mocks: []
  };
}
function K(e) {
  return g().mocks.find((t) => t.name === e) ?? null;
}
function T() {
  return typeof window > "u" ? (c.error(
    "window is not defined. This most likely happens during SSR, which is not supported",
    !1
  ), !0) : !1;
}
function V() {
  var e;
  return typeof process < "u" && ((e = process == null ? void 0 : process.env) == null ? void 0 : e.hasOwnProperty("VITEST")) && process.env.VITEST === "true";
}
function hr() {
  if (!G()) {
    c.debug("Cypress is not running, skipping setup of Cypress commands");
    return;
  }
  const e = window.Cypress;
  e.Commands.add("hubPublish", br), e.Commands.add("hubVerifyInvokes", dr), e.Commands.add("hubClear", yr), e.Commands.add("hubPrintData", vr);
}
function br(e, r, t) {
  const n = K(e);
  if (!n) {
    c.error(`[cy.hubPublish] - HubConnectionMock not found for ${e}`);
    return;
  }
  n.publish(r, t);
}
function dr(e, r, t) {
  const n = K(e);
  if (!n) {
    c.error(
      `[cy.hubVerify] - HubConnectionMock not found for hub with name: ${e}`
    );
    return;
  }
  n.verify(r, t);
}
function vr() {
  c.info(
    'Current window["cypress-signalr-mock"] data:',
    g()
  );
}
function yr() {
  J();
}
hr();
_r("default");
function _r(e, {
  debug: r,
  enableForVitest: t
} = {}) {
  if (r && c.setLogLevel(4), !t && V() && c.info(
    `Vitest is running but 'enableForVitest' is ${t}, skip enabling CypressSignalRMock...`
  ), G() || t && V()) {
    const n = new lr(e);
    return g().mocks.push(n), n;
  }
  return null;
}
export {
  yr as hubClear,
  vr as hubPrintData,
  br as hubPublish,
  dr as hubVerify,
  _r as useCypressSignalRMock
};
//# sourceMappingURL=index.js.map
