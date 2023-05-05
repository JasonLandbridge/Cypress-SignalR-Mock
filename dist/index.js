var se = Object.defineProperty;
var ce = (t, r, e) => r in t ? se(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var m = (t, r, e) => (ce(t, typeof r != "symbol" ? r + "" : r, e), e);
function ue(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var M = { exports: {} }, A, z;
function ae() {
  if (z)
    return A;
  z = 1;
  var t = 1e3, r = t * 60, e = r * 60, n = e * 24, o = n * 7, s = n * 365.25;
  A = function(i, c) {
    c = c || {};
    var u = typeof i;
    if (u === "string" && i.length > 0)
      return a(i);
    if (u === "number" && isFinite(i))
      return c.long ? l(i) : f(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function a(i) {
    if (i = String(i), !(i.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (c) {
        var u = parseFloat(c[1]), d = (c[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return u * s;
          case "weeks":
          case "week":
          case "w":
            return u * o;
          case "days":
          case "day":
          case "d":
            return u * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return u * e;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return u * r;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return u * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return u;
          default:
            return;
        }
      }
    }
  }
  function f(i) {
    var c = Math.abs(i);
    return c >= n ? Math.round(i / n) + "d" : c >= e ? Math.round(i / e) + "h" : c >= r ? Math.round(i / r) + "m" : c >= t ? Math.round(i / t) + "s" : i + "ms";
  }
  function l(i) {
    var c = Math.abs(i);
    return c >= n ? p(i, c, n, "day") : c >= e ? p(i, c, e, "hour") : c >= r ? p(i, c, r, "minute") : c >= t ? p(i, c, t, "second") : i + " ms";
  }
  function p(i, c, u, d) {
    var g = c >= u * 1.5;
    return Math.round(i / u) + " " + d + (g ? "s" : "");
  }
  return A;
}
function le(t) {
  e.debug = e, e.default = e, e.coerce = l, e.disable = s, e.enable = o, e.enabled = a, e.humanize = ae(), e.destroy = p, Object.keys(t).forEach((i) => {
    e[i] = t[i];
  }), e.names = [], e.skips = [], e.formatters = {};
  function r(i) {
    let c = 0;
    for (let u = 0; u < i.length; u++)
      c = (c << 5) - c + i.charCodeAt(u), c |= 0;
    return e.colors[Math.abs(c) % e.colors.length];
  }
  e.selectColor = r;
  function e(i) {
    let c, u = null, d, g;
    function h(...b) {
      if (!h.enabled)
        return;
      const C = h, w = Number(/* @__PURE__ */ new Date()), ne = w - (c || w);
      C.diff = ne, C.prev = c, C.curr = w, c = w, b[0] = e.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
      let F = 0;
      b[0] = b[0].replace(/%([a-zA-Z%])/g, (O, oe) => {
        if (O === "%%")
          return "%";
        F++;
        const Y = e.formatters[oe];
        if (typeof Y == "function") {
          const ie = b[F];
          O = Y.call(C, ie), b.splice(F, 1), F--;
        }
        return O;
      }), e.formatArgs.call(C, b), (C.log || e.log).apply(C, b);
    }
    return h.namespace = i, h.useColors = e.useColors(), h.color = e.selectColor(i), h.extend = n, h.destroy = e.destroy, Object.defineProperty(h, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => u !== null ? u : (d !== e.namespaces && (d = e.namespaces, g = e.enabled(i)), g),
      set: (b) => {
        u = b;
      }
    }), typeof e.init == "function" && e.init(h), h;
  }
  function n(i, c) {
    const u = e(this.namespace + (typeof c > "u" ? ":" : c) + i);
    return u.log = this.log, u;
  }
  function o(i) {
    e.save(i), e.namespaces = i, e.names = [], e.skips = [];
    let c;
    const u = (typeof i == "string" ? i : "").split(/[\s,]+/), d = u.length;
    for (c = 0; c < d; c++)
      u[c] && (i = u[c].replace(/\*/g, ".*?"), i[0] === "-" ? e.skips.push(new RegExp("^" + i.slice(1) + "$")) : e.names.push(new RegExp("^" + i + "$")));
  }
  function s() {
    const i = [
      ...e.names.map(f),
      ...e.skips.map(f).map((c) => "-" + c)
    ].join(",");
    return e.enable(""), i;
  }
  function a(i) {
    if (i[i.length - 1] === "*")
      return !0;
    let c, u;
    for (c = 0, u = e.skips.length; c < u; c++)
      if (e.skips[c].test(i))
        return !1;
    for (c = 0, u = e.names.length; c < u; c++)
      if (e.names[c].test(i))
        return !0;
    return !1;
  }
  function f(i) {
    return i.toString().substring(2, i.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function l(i) {
    return i instanceof Error ? i.stack || i.message : i;
  }
  function p() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return e.enable(e.load()), e;
}
var fe = le;
(function(t, r) {
  r.formatArgs = n, r.save = o, r.load = s, r.useColors = e, r.storage = a(), r.destroy = (() => {
    let l = !1;
    return () => {
      l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), r.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function e() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function n(l) {
    if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
      return;
    const p = "color: " + this.color;
    l.splice(1, 0, p, "color: inherit");
    let i = 0, c = 0;
    l[0].replace(/%[a-zA-Z%]/g, (u) => {
      u !== "%%" && (i++, u === "%c" && (c = i));
    }), l.splice(c, 0, p);
  }
  r.log = console.debug || console.log || (() => {
  });
  function o(l) {
    try {
      l ? r.storage.setItem("debug", l) : r.storage.removeItem("debug");
    } catch {
    }
  }
  function s() {
    let l;
    try {
      l = r.storage.getItem("debug");
    } catch {
    }
    return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
  }
  function a() {
    try {
      return localStorage;
    } catch {
    }
  }
  t.exports = fe(r);
  const { formatters: f } = t.exports;
  f.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
})(M, M.exports);
var he = M.exports;
const pe = /* @__PURE__ */ ue(he);
class y {
  static debug(r) {
    pe("cypress-signalr-mock")(r);
  }
  static info(r, e = void 0) {
    console.info(this._prefix + r, e);
  }
  static warn(r) {
    console.warn(this._prefix + r);
  }
  static error(r, e = !0) {
    if (e)
      throw new Error(this._prefix + r);
    console.error(this._prefix + r);
  }
}
m(y, "_prefix", "[Cypress-SignalR-Mock] - ");
var T = function(t, r) {
  return T = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
  }, T(t, r);
};
function x(t, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  T(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
function $(t) {
  var r = typeof Symbol == "function" && Symbol.iterator, e = r && t[r], n = 0;
  if (e)
    return e.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
      }
    };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function E(t, r) {
  var e = typeof Symbol == "function" && t[Symbol.iterator];
  if (!e)
    return t;
  var n = e.call(t), o, s = [], a;
  try {
    for (; (r === void 0 || r-- > 0) && !(o = n.next()).done; )
      s.push(o.value);
  } catch (f) {
    a = { error: f };
  } finally {
    try {
      o && !o.done && (e = n.return) && e.call(n);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return s;
}
function k(t, r, e) {
  if (e || arguments.length === 2)
    for (var n = 0, o = r.length, s; n < o; n++)
      (s || !(n in r)) && (s || (s = Array.prototype.slice.call(r, 0, n)), s[n] = r[n]);
  return t.concat(s || Array.prototype.slice.call(r));
}
function v(t) {
  return typeof t == "function";
}
function W(t) {
  var r = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, e = t(r);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var D = W(function(t) {
  return function(e) {
    t(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(n, o) {
      return o + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function R(t, r) {
  if (t) {
    var e = t.indexOf(r);
    0 <= e && t.splice(e, 1);
  }
}
var P = function() {
  function t(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var r, e, n, o, s;
    if (!this.closed) {
      this.closed = !0;
      var a = this._parentage;
      if (a)
        if (this._parentage = null, Array.isArray(a))
          try {
            for (var f = $(a), l = f.next(); !l.done; l = f.next()) {
              var p = l.value;
              p.remove(this);
            }
          } catch (h) {
            r = { error: h };
          } finally {
            try {
              l && !l.done && (e = f.return) && e.call(f);
            } finally {
              if (r)
                throw r.error;
            }
          }
        else
          a.remove(this);
      var i = this.initialTeardown;
      if (v(i))
        try {
          i();
        } catch (h) {
          s = h instanceof D ? h.errors : [h];
        }
      var c = this._finalizers;
      if (c) {
        this._finalizers = null;
        try {
          for (var u = $(c), d = u.next(); !d.done; d = u.next()) {
            var g = d.value;
            try {
              B(g);
            } catch (h) {
              s = s ?? [], h instanceof D ? s = k(k([], E(s)), E(h.errors)) : s.push(h);
            }
          }
        } catch (h) {
          n = { error: h };
        } finally {
          try {
            d && !d.done && (o = u.return) && o.call(u);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (s)
        throw new D(s);
    }
  }, t.prototype.add = function(r) {
    var e;
    if (r && r !== this)
      if (this.closed)
        B(r);
      else {
        if (r instanceof t) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (e = this._finalizers) !== null && e !== void 0 ? e : []).push(r);
      }
  }, t.prototype._hasParent = function(r) {
    var e = this._parentage;
    return e === r || Array.isArray(e) && e.includes(r);
  }, t.prototype._addParent = function(r) {
    var e = this._parentage;
    this._parentage = Array.isArray(e) ? (e.push(r), e) : e ? [e, r] : r;
  }, t.prototype._removeParent = function(r) {
    var e = this._parentage;
    e === r ? this._parentage = null : Array.isArray(e) && R(e, r);
  }, t.prototype.remove = function(r) {
    var e = this._finalizers;
    e && R(e, r), r instanceof t && r._removeParent(this);
  }, t.EMPTY = function() {
    var r = new t();
    return r.closed = !0, r;
  }(), t;
}(), K = P.EMPTY;
function Q(t) {
  return t instanceof P || t && "closed" in t && v(t.remove) && v(t.add) && v(t.unsubscribe);
}
function B(t) {
  v(t) ? t() : t.unsubscribe();
}
var X = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, U = {
  setTimeout: function(t, r) {
    for (var e = [], n = 2; n < arguments.length; n++)
      e[n - 2] = arguments[n];
    var o = U.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, k([t, r], E(e))) : setTimeout.apply(void 0, k([t, r], E(e)));
  },
  clearTimeout: function(t) {
    var r = U.delegate;
    return ((r == null ? void 0 : r.clearTimeout) || clearTimeout)(t);
  },
  delegate: void 0
};
function de(t) {
  U.setTimeout(function() {
    throw t;
  });
}
function J() {
}
function S(t) {
  t();
}
var N = function(t) {
  x(r, t);
  function r(e) {
    var n = t.call(this) || this;
    return n.isStopped = !1, e ? (n.destination = e, Q(e) && e.add(n)) : n.destination = Ce, n;
  }
  return r.create = function(e, n, o) {
    return new L(e, n, o);
  }, r.prototype.next = function(e) {
    this.isStopped || this._next(e);
  }, r.prototype.error = function(e) {
    this.isStopped || (this.isStopped = !0, this._error(e));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(e) {
    this.destination.next(e);
  }, r.prototype._error = function(e) {
    try {
      this.destination.error(e);
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
}(P), be = Function.prototype.bind;
function I(t, r) {
  return be.call(t, r);
}
var ye = function() {
  function t(r) {
    this.partialObserver = r;
  }
  return t.prototype.next = function(r) {
    var e = this.partialObserver;
    if (e.next)
      try {
        e.next(r);
      } catch (n) {
        _(n);
      }
  }, t.prototype.error = function(r) {
    var e = this.partialObserver;
    if (e.error)
      try {
        e.error(r);
      } catch (n) {
        _(n);
      }
    else
      _(r);
  }, t.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (e) {
        _(e);
      }
  }, t;
}(), L = function(t) {
  x(r, t);
  function r(e, n, o) {
    var s = t.call(this) || this, a;
    if (v(e) || !e)
      a = {
        next: e ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var f;
      s && X.useDeprecatedNextContext ? (f = Object.create(e), f.unsubscribe = function() {
        return s.unsubscribe();
      }, a = {
        next: e.next && I(e.next, f),
        error: e.error && I(e.error, f),
        complete: e.complete && I(e.complete, f)
      }) : a = e;
    }
    return s.destination = new ye(a), s;
  }
  return r;
}(N);
function _(t) {
  de(t);
}
function ve(t) {
  throw t;
}
var Ce = {
  closed: !0,
  next: J,
  error: ve,
  complete: J
}, ge = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function me(t) {
  return t;
}
function we(t) {
  return t.length === 0 ? me : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(n, o) {
      return o(n);
    }, e);
  };
}
var q = function() {
  function t(r) {
    r && (this._subscribe = r);
  }
  return t.prototype.lift = function(r) {
    var e = new t();
    return e.source = this, e.operator = r, e;
  }, t.prototype.subscribe = function(r, e, n) {
    var o = this, s = _e(r) ? r : new L(r, e, n);
    return S(function() {
      var a = o, f = a.operator, l = a.source;
      s.add(f ? f.call(s, l) : l ? o._subscribe(s) : o._trySubscribe(s));
    }), s;
  }, t.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (e) {
      r.error(e);
    }
  }, t.prototype.forEach = function(r, e) {
    var n = this;
    return e = Z(e), new e(function(o, s) {
      var a = new L({
        next: function(f) {
          try {
            r(f);
          } catch (l) {
            s(l), a.unsubscribe();
          }
        },
        error: s,
        complete: o
      });
      n.subscribe(a);
    });
  }, t.prototype._subscribe = function(r) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(r);
  }, t.prototype[ge] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var r = [], e = 0; e < arguments.length; e++)
      r[e] = arguments[e];
    return we(r)(this);
  }, t.prototype.toPromise = function(r) {
    var e = this;
    return r = Z(r), new r(function(n, o) {
      var s;
      e.subscribe(function(a) {
        return s = a;
      }, function(a) {
        return o(a);
      }, function() {
        return n(s);
      });
    });
  }, t.create = function(r) {
    return new t(r);
  }, t;
}();
function Z(t) {
  var r;
  return (r = t ?? X.Promise) !== null && r !== void 0 ? r : Promise;
}
function Fe(t) {
  return t && v(t.next) && v(t.error) && v(t.complete);
}
function _e(t) {
  return t && t instanceof N || Fe(t) && Q(t);
}
var Se = W(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), H = function(t) {
  x(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }
  return r.prototype.lift = function(e) {
    var n = new G(this, this);
    return n.operator = e, n;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Se();
  }, r.prototype.next = function(e) {
    var n = this;
    S(function() {
      var o, s;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = $(n.currentObservers), f = a.next(); !f.done; f = a.next()) {
            var l = f.value;
            l.next(e);
          }
        } catch (p) {
          o = { error: p };
        } finally {
          try {
            f && !f.done && (s = a.return) && s.call(a);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, r.prototype.error = function(e) {
    var n = this;
    S(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = e;
        for (var o = n.observers; o.length; )
          o.shift().error(e);
      }
    });
  }, r.prototype.complete = function() {
    var e = this;
    S(function() {
      if (e._throwIfClosed(), !e.isStopped) {
        e.isStopped = !0;
        for (var n = e.observers; n.length; )
          n.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var e;
      return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(e) {
    return this._throwIfClosed(), t.prototype._trySubscribe.call(this, e);
  }, r.prototype._subscribe = function(e) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
  }, r.prototype._innerSubscribe = function(e) {
    var n = this, o = this, s = o.hasError, a = o.isStopped, f = o.observers;
    return s || a ? K : (this.currentObservers = null, f.push(e), new P(function() {
      n.currentObservers = null, R(f, e);
    }));
  }, r.prototype._checkFinalizedStatuses = function(e) {
    var n = this, o = n.hasError, s = n.thrownError, a = n.isStopped;
    o ? e.error(s) : a && e.complete();
  }, r.prototype.asObservable = function() {
    var e = new q();
    return e.source = this, e;
  }, r.create = function(e, n) {
    return new G(e, n);
  }, r;
}(q), G = function(t) {
  x(r, t);
  function r(e, n) {
    var o = t.call(this) || this;
    return o.destination = e, o.source = n, o;
  }
  return r.prototype.next = function(e) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, e);
  }, r.prototype.error = function(e) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, e);
  }, r.prototype.complete = function() {
    var e, n;
    (n = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || n === void 0 || n.call(e);
  }, r.prototype._subscribe = function(e) {
    var n, o;
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e)) !== null && o !== void 0 ? o : K;
  }, r;
}(H);
class Ee {
  constructor(r, e) {
    this._subject = r, this._observer = e;
  }
  dispose() {
    const r = this._subject.observers.indexOf(this._observer);
    r > -1 && this._subject.observers.splice(r, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((e) => {
    });
  }
}
class ke {
  constructor() {
    this.observers = [];
  }
  next(r) {
    for (const e of this.observers)
      e.next(r);
  }
  error(r) {
    for (const e of this.observers)
      e.error && e.error(r);
  }
  complete() {
    for (const r of this.observers)
      r.complete && r.complete();
  }
  subscribe(r) {
    return this.observers.push(r), new Ee(this, r);
  }
}
class xe {
  constructor(r) {
    m(this, "_hubConnectionData", []);
    m(this, "_serverInvokes", []);
    m(this, "name");
    this.name = r;
  }
  publish(r, e) {
    r = r.toLowerCase();
    const n = this._hubConnectionData.filter(
      (o) => o.messageType === r
    );
    if (n.length === 0) {
      y.warn(`No subscribers for ${r}`);
      return;
    }
    y.debug(
      `Publishing action: ${r} to ${n.length} subscribers`
    ), n.forEach((o) => {
      o.channel.next({ name: r, value: e });
    });
  }
  verify(r, e) {
    r = r.toLowerCase();
    const n = this._serverInvokes.filter(
      (o) => o.action === r
    );
    e && e(n);
  }
  on(r, e) {
    r = r.toLowerCase(), this._hubConnectionData.some((s) => s.messageType === r) || this._hubConnectionData.push({
      messageType: r,
      isStream: !1,
      channel: new H(),
      subscriptions: []
    });
    let n = this._hubConnectionData.find(
      (s) => s.messageType === r
    );
    if (!n)
      throw new Error(`Could not find connection data for ${r}`);
    let o = n.channel.subscribe((s) => {
      e(s.value);
    });
    n.subscriptions.push({
      handler: e,
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
  stream(r, ...e) {
    r = r.toLowerCase(), this._hubConnectionData.some((s) => s.messageType === r) || this._hubConnectionData.push({
      messageType: r,
      isStream: !0,
      channel: new H(),
      subscriptions: []
    });
    let n = this._hubConnectionData.find(
      (s) => s.messageType === r
    );
    if (!n)
      throw new Error(`Could not find connection data for ${r}`);
    const o = new ke();
    return n.channel.subscribe({
      next: (s) => o.next(s),
      error: (s) => o.error(s),
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
  invoke(r, ...e) {
    return new Promise((n) => {
      this._serverInvokes.push({
        action: r,
        args: e
      }), n(0);
    });
  }
  off(r, e) {
    r = r.toLowerCase();
    const n = this._hubConnectionData.findIndex(
      (o) => o.messageType === r
    );
    if (n == -1) {
      y.warn(`No channels registered for action name: ${r}`);
      return;
    }
    if (e) {
      const o = this._hubConnectionData[n].subscriptions.findIndex((s) => s.handler === e);
      if (o == -1) {
        y.warn(
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
  send(r, ...e) {
    return Promise.resolve();
  }
  // endregion
}
function ee() {
  return V() ? !1 : window.hasOwnProperty("Cypress");
}
function j() {
  return !V() && window["cypress-signalr-mock"] ? window["cypress-signalr-mock"] : (re(), j());
}
function Pe(t) {
  V() || (window["cypress-signalr-mock"] = t);
}
function re() {
  Pe(je());
}
function je() {
  return {
    mocks: []
  };
}
function te(t) {
  return j().mocks.find((e) => e.name === t) ?? null;
}
function V() {
  return window ? !1 : (y.error(
    "window is not defined. This most likely happens during SSR, which is not supported,"
  ), !0);
}
function Oe() {
  if (!ee()) {
    y.info("Cypress is not running, skipping setup of Cypress commands");
    return;
  }
  const t = window.Cypress;
  t.Commands.add("hubPublish", Ae), t.Commands.add("hubVerifyInvokes", De), t.Commands.add("hubClear", Me), t.Commands.add("hubPrintData", Ie);
}
function Ae(t, r, e) {
  const n = te(t);
  if (!n) {
    y.error(`[cy.hubPublish] - HubConnectionMock not found for ${t}`);
    return;
  }
  n.publish(r, e);
}
function De(t, r, e) {
  const n = te(t);
  if (!n) {
    y.error(
      `[cy.hubVerify] - HubConnectionMock not found for hub with name: ${t}`
    );
    return;
  }
  n.verify(r, e);
}
function Ie() {
  y.info(
    'Current window["cypress-signalr-mock"] data:',
    j()
  );
}
function Me() {
  re();
}
Oe();
function Re(t) {
  if (!ee())
    return null;
  const r = new xe(t);
  return j().mocks.push(r), r;
}
export {
  Re as useCypressSignalRMock
};
//# sourceMappingURL=index.js.map
