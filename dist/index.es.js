import { useState as qe, useRef as yn, useMemo as ge, useEffect as Ne, useCallback as F } from "react";
import { useLiveMode as ys, useResourceParams as bs, useTable as qs, pickNotDeprecated as pe, useUpdate as Ss, useCreate as Ts, useDeleteMany as Rs } from "@refinedev/core";
import { GridLogicOperator as Bt, GridRowModes as ue, GridRowEditStopReasons as Cs } from "@mui/x-data-grid";
const qo = (e) => {
  const [r, t] = qe(0);
  return { count: r, increment: () => t(r + e) };
};
var ye = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ge, bn;
function Te() {
  if (bn) return Ge;
  bn = 1;
  function e(r) {
    var t = typeof r;
    return r != null && (t == "object" || t == "function");
  }
  return Ge = e, Ge;
}
var Fe, qn;
function Ei() {
  if (qn) return Fe;
  qn = 1;
  var e = typeof ye == "object" && ye && ye.Object === Object && ye;
  return Fe = e, Fe;
}
var He, Sn;
function B() {
  if (Sn) return He;
  Sn = 1;
  var e = Ei(), r = typeof self == "object" && self && self.Object === Object && self, t = e || r || Function("return this")();
  return He = t, He;
}
var Ke, Tn;
function As() {
  if (Tn) return Ke;
  Tn = 1;
  var e = B(), r = function() {
    return e.Date.now();
  };
  return Ke = r, Ke;
}
var ke, Rn;
function ws() {
  if (Rn) return ke;
  Rn = 1;
  var e = /\s/;
  function r(t) {
    for (var n = t.length; n-- && e.test(t.charAt(n)); )
      ;
    return n;
  }
  return ke = r, ke;
}
var Ue, Cn;
function Is() {
  if (Cn) return Ue;
  Cn = 1;
  var e = ws(), r = /^\s+/;
  function t(n) {
    return n && n.slice(0, e(n) + 1).replace(r, "");
  }
  return Ue = t, Ue;
}
var We, An;
function Re() {
  if (An) return We;
  An = 1;
  var e = B(), r = e.Symbol;
  return We = r, We;
}
var Be, wn;
function Os() {
  if (wn) return Be;
  wn = 1;
  var e = Re(), r = Object.prototype, t = r.hasOwnProperty, n = r.toString, a = e ? e.toStringTag : void 0;
  function i(s) {
    var u = t.call(s, a), l = s[a];
    try {
      s[a] = void 0;
      var o = !0;
    } catch {
    }
    var v = n.call(s);
    return o && (u ? s[a] = l : delete s[a]), v;
  }
  return Be = i, Be;
}
var ze, In;
function ms() {
  if (In) return ze;
  In = 1;
  var e = Object.prototype, r = e.toString;
  function t(n) {
    return r.call(n);
  }
  return ze = t, ze;
}
var Ve, On;
function fe() {
  if (On) return Ve;
  On = 1;
  var e = Re(), r = Os(), t = ms(), n = "[object Null]", a = "[object Undefined]", i = e ? e.toStringTag : void 0;
  function s(u) {
    return u == null ? u === void 0 ? a : n : i && i in Object(u) ? r(u) : t(u);
  }
  return Ve = s, Ve;
}
var $e, mn;
function te() {
  if (mn) return $e;
  mn = 1;
  function e(r) {
    return r != null && typeof r == "object";
  }
  return $e = e, $e;
}
var Je, En;
function Es() {
  if (En) return Je;
  En = 1;
  var e = fe(), r = te(), t = "[object Symbol]";
  function n(a) {
    return typeof a == "symbol" || r(a) && e(a) == t;
  }
  return Je = n, Je;
}
var Xe, Mn;
function Ms() {
  if (Mn) return Xe;
  Mn = 1;
  var e = Is(), r = Te(), t = Es(), n = NaN, a = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, s = /^0o[0-7]+$/i, u = parseInt;
  function l(o) {
    if (typeof o == "number")
      return o;
    if (t(o))
      return n;
    if (r(o)) {
      var v = typeof o.valueOf == "function" ? o.valueOf() : o;
      o = r(v) ? v + "" : v;
    }
    if (typeof o != "string")
      return o === 0 ? o : +o;
    o = e(o);
    var _ = i.test(o);
    return _ || s.test(o) ? u(o.slice(2), _ ? 2 : 8) : a.test(o) ? n : +o;
  }
  return Xe = l, Xe;
}
var Qe, jn;
function js() {
  if (jn) return Qe;
  jn = 1;
  var e = Te(), r = As(), t = Ms(), n = "Expected a function", a = Math.max, i = Math.min;
  function s(u, l, o) {
    var v, _, w, R, I, S, b = 0, C = !1, g = !1, M = !0;
    if (typeof u != "function")
      throw new TypeError(n);
    l = t(l) || 0, e(o) && (C = !!o.leading, g = "maxWait" in o, w = g ? a(t(o.maxWait) || 0, l) : w, M = "trailing" in o ? !!o.trailing : M);
    function y(E) {
      var k = v, f = _;
      return v = _ = void 0, b = E, R = u.apply(f, k), R;
    }
    function j(E) {
      return b = E, I = setTimeout(D, l), C ? y(E) : R;
    }
    function A(E) {
      var k = E - S, f = E - b, $ = l - k;
      return g ? i($, w - f) : $;
    }
    function T(E) {
      var k = E - S, f = E - b;
      return S === void 0 || k >= l || k < 0 || g && f >= w;
    }
    function D() {
      var E = r();
      if (T(E))
        return P(E);
      I = setTimeout(D, A(E));
    }
    function P(E) {
      return I = void 0, M && v ? y(E) : (v = _ = void 0, R);
    }
    function N() {
      I !== void 0 && clearTimeout(I), b = 0, v = S = _ = I = void 0;
    }
    function q() {
      return I === void 0 ? R : P(r());
    }
    function G() {
      var E = r(), k = T(E);
      if (v = arguments, _ = this, S = E, k) {
        if (I === void 0)
          return j(S);
        if (g)
          return clearTimeout(I), I = setTimeout(D, l), y(S);
      }
      return I === void 0 && (I = setTimeout(D, l)), R;
    }
    return G.cancel = N, G.flush = q, G;
  }
  return Qe = s, Qe;
}
var Ds = js();
const xs = /* @__PURE__ */ zt(Ds);
var Ye, Dn;
function Mi() {
  if (Dn) return Ye;
  Dn = 1;
  var e = fe(), r = Te(), t = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function s(u) {
    if (!r(u))
      return !1;
    var l = e(u);
    return l == n || l == a || l == t || l == i;
  }
  return Ye = s, Ye;
}
var Ze, xn;
function Ps() {
  if (xn) return Ze;
  xn = 1;
  var e = B(), r = e["__core-js_shared__"];
  return Ze = r, Ze;
}
var er, Pn;
function Ls() {
  if (Pn) return er;
  Pn = 1;
  var e = Ps(), r = function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  }();
  function t(n) {
    return !!r && r in n;
  }
  return er = t, er;
}
var rr, Ln;
function ji() {
  if (Ln) return rr;
  Ln = 1;
  var e = Function.prototype, r = e.toString;
  function t(n) {
    if (n != null) {
      try {
        return r.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return rr = t, rr;
}
var tr, Nn;
function Ns() {
  if (Nn) return tr;
  Nn = 1;
  var e = Mi(), r = Ls(), t = Te(), n = ji(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, s = Function.prototype, u = Object.prototype, l = s.toString, o = u.hasOwnProperty, v = RegExp(
    "^" + l.call(o).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function _(w) {
    if (!t(w) || r(w))
      return !1;
    var R = e(w) ? v : i;
    return R.test(n(w));
  }
  return tr = _, tr;
}
var nr, Gn;
function Gs() {
  if (Gn) return nr;
  Gn = 1;
  function e(r, t) {
    return r == null ? void 0 : r[t];
  }
  return nr = e, nr;
}
var ar, Fn;
function Q() {
  if (Fn) return ar;
  Fn = 1;
  var e = Ns(), r = Gs();
  function t(n, a) {
    var i = r(n, a);
    return e(i) ? i : void 0;
  }
  return ar = t, ar;
}
var ir, Hn;
function Ce() {
  if (Hn) return ir;
  Hn = 1;
  var e = Q(), r = e(Object, "create");
  return ir = r, ir;
}
var sr, Kn;
function Fs() {
  if (Kn) return sr;
  Kn = 1;
  var e = Ce();
  function r() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return sr = r, sr;
}
var ur, kn;
function Hs() {
  if (kn) return ur;
  kn = 1;
  function e(r) {
    var t = this.has(r) && delete this.__data__[r];
    return this.size -= t ? 1 : 0, t;
  }
  return ur = e, ur;
}
var or, Un;
function Ks() {
  if (Un) return or;
  Un = 1;
  var e = Ce(), r = "__lodash_hash_undefined__", t = Object.prototype, n = t.hasOwnProperty;
  function a(i) {
    var s = this.__data__;
    if (e) {
      var u = s[i];
      return u === r ? void 0 : u;
    }
    return n.call(s, i) ? s[i] : void 0;
  }
  return or = a, or;
}
var cr, Wn;
function ks() {
  if (Wn) return cr;
  Wn = 1;
  var e = Ce(), r = Object.prototype, t = r.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return e ? i[a] !== void 0 : t.call(i, a);
  }
  return cr = n, cr;
}
var fr, Bn;
function Us() {
  if (Bn) return fr;
  Bn = 1;
  var e = Ce(), r = "__lodash_hash_undefined__";
  function t(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = e && a === void 0 ? r : a, this;
  }
  return fr = t, fr;
}
var lr, zn;
function Ws() {
  if (zn) return lr;
  zn = 1;
  var e = Fs(), r = Hs(), t = Ks(), n = ks(), a = Us();
  function i(s) {
    var u = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++u < l; ) {
      var o = s[u];
      this.set(o[0], o[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = r, i.prototype.get = t, i.prototype.has = n, i.prototype.set = a, lr = i, lr;
}
var dr, Vn;
function Bs() {
  if (Vn) return dr;
  Vn = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return dr = e, dr;
}
var vr, $n;
function Di() {
  if ($n) return vr;
  $n = 1;
  function e(r, t) {
    return r === t || r !== r && t !== t;
  }
  return vr = e, vr;
}
var _r, Jn;
function Ae() {
  if (Jn) return _r;
  Jn = 1;
  var e = Di();
  function r(t, n) {
    for (var a = t.length; a--; )
      if (e(t[a][0], n))
        return a;
    return -1;
  }
  return _r = r, _r;
}
var hr, Xn;
function zs() {
  if (Xn) return hr;
  Xn = 1;
  var e = Ae(), r = Array.prototype, t = r.splice;
  function n(a) {
    var i = this.__data__, s = e(i, a);
    if (s < 0)
      return !1;
    var u = i.length - 1;
    return s == u ? i.pop() : t.call(i, s, 1), --this.size, !0;
  }
  return hr = n, hr;
}
var gr, Qn;
function Vs() {
  if (Qn) return gr;
  Qn = 1;
  var e = Ae();
  function r(t) {
    var n = this.__data__, a = e(n, t);
    return a < 0 ? void 0 : n[a][1];
  }
  return gr = r, gr;
}
var pr, Yn;
function $s() {
  if (Yn) return pr;
  Yn = 1;
  var e = Ae();
  function r(t) {
    return e(this.__data__, t) > -1;
  }
  return pr = r, pr;
}
var yr, Zn;
function Js() {
  if (Zn) return yr;
  Zn = 1;
  var e = Ae();
  function r(t, n) {
    var a = this.__data__, i = e(a, t);
    return i < 0 ? (++this.size, a.push([t, n])) : a[i][1] = n, this;
  }
  return yr = r, yr;
}
var br, ea;
function we() {
  if (ea) return br;
  ea = 1;
  var e = Bs(), r = zs(), t = Vs(), n = $s(), a = Js();
  function i(s) {
    var u = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++u < l; ) {
      var o = s[u];
      this.set(o[0], o[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = r, i.prototype.get = t, i.prototype.has = n, i.prototype.set = a, br = i, br;
}
var qr, ra;
function Vt() {
  if (ra) return qr;
  ra = 1;
  var e = Q(), r = B(), t = e(r, "Map");
  return qr = t, qr;
}
var Sr, ta;
function Xs() {
  if (ta) return Sr;
  ta = 1;
  var e = Ws(), r = we(), t = Vt();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (t || r)(),
      string: new e()
    };
  }
  return Sr = n, Sr;
}
var Tr, na;
function Qs() {
  if (na) return Tr;
  na = 1;
  function e(r) {
    var t = typeof r;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? r !== "__proto__" : r === null;
  }
  return Tr = e, Tr;
}
var Rr, aa;
function Ie() {
  if (aa) return Rr;
  aa = 1;
  var e = Qs();
  function r(t, n) {
    var a = t.__data__;
    return e(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return Rr = r, Rr;
}
var Cr, ia;
function Ys() {
  if (ia) return Cr;
  ia = 1;
  var e = Ie();
  function r(t) {
    var n = e(this, t).delete(t);
    return this.size -= n ? 1 : 0, n;
  }
  return Cr = r, Cr;
}
var Ar, sa;
function Zs() {
  if (sa) return Ar;
  sa = 1;
  var e = Ie();
  function r(t) {
    return e(this, t).get(t);
  }
  return Ar = r, Ar;
}
var wr, ua;
function eu() {
  if (ua) return wr;
  ua = 1;
  var e = Ie();
  function r(t) {
    return e(this, t).has(t);
  }
  return wr = r, wr;
}
var Ir, oa;
function ru() {
  if (oa) return Ir;
  oa = 1;
  var e = Ie();
  function r(t, n) {
    var a = e(this, t), i = a.size;
    return a.set(t, n), this.size += a.size == i ? 0 : 1, this;
  }
  return Ir = r, Ir;
}
var Or, ca;
function xi() {
  if (ca) return Or;
  ca = 1;
  var e = Xs(), r = Ys(), t = Zs(), n = eu(), a = ru();
  function i(s) {
    var u = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++u < l; ) {
      var o = s[u];
      this.set(o[0], o[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = r, i.prototype.get = t, i.prototype.has = n, i.prototype.set = a, Or = i, Or;
}
var mr, fa;
function tu() {
  if (fa) return mr;
  fa = 1;
  var e = "__lodash_hash_undefined__";
  function r(t) {
    return this.__data__.set(t, e), this;
  }
  return mr = r, mr;
}
var Er, la;
function nu() {
  if (la) return Er;
  la = 1;
  function e(r) {
    return this.__data__.has(r);
  }
  return Er = e, Er;
}
var Mr, da;
function Pi() {
  if (da) return Mr;
  da = 1;
  var e = xi(), r = tu(), t = nu();
  function n(a) {
    var i = -1, s = a == null ? 0 : a.length;
    for (this.__data__ = new e(); ++i < s; )
      this.add(a[i]);
  }
  return n.prototype.add = n.prototype.push = r, n.prototype.has = t, Mr = n, Mr;
}
var jr, va;
function au() {
  if (va) return jr;
  va = 1;
  function e(r, t, n, a) {
    for (var i = r.length, s = n + (a ? 1 : -1); a ? s-- : ++s < i; )
      if (t(r[s], s, r))
        return s;
    return -1;
  }
  return jr = e, jr;
}
var Dr, _a;
function iu() {
  if (_a) return Dr;
  _a = 1;
  function e(r) {
    return r !== r;
  }
  return Dr = e, Dr;
}
var xr, ha;
function su() {
  if (ha) return xr;
  ha = 1;
  function e(r, t, n) {
    for (var a = n - 1, i = r.length; ++a < i; )
      if (r[a] === t)
        return a;
    return -1;
  }
  return xr = e, xr;
}
var Pr, ga;
function uu() {
  if (ga) return Pr;
  ga = 1;
  var e = au(), r = iu(), t = su();
  function n(a, i, s) {
    return i === i ? t(a, i, s) : e(a, r, s);
  }
  return Pr = n, Pr;
}
var Lr, pa;
function ou() {
  if (pa) return Lr;
  pa = 1;
  var e = uu();
  function r(t, n) {
    var a = t == null ? 0 : t.length;
    return !!a && e(t, n, 0) > -1;
  }
  return Lr = r, Lr;
}
var Nr, ya;
function cu() {
  if (ya) return Nr;
  ya = 1;
  function e(r, t, n) {
    for (var a = -1, i = r == null ? 0 : r.length; ++a < i; )
      if (n(t, r[a]))
        return !0;
    return !1;
  }
  return Nr = e, Nr;
}
var Gr, ba;
function fu() {
  if (ba) return Gr;
  ba = 1;
  function e(r, t) {
    for (var n = -1, a = r == null ? 0 : r.length, i = Array(a); ++n < a; )
      i[n] = t(r[n], n, r);
    return i;
  }
  return Gr = e, Gr;
}
var Fr, qa;
function Li() {
  if (qa) return Fr;
  qa = 1;
  function e(r) {
    return function(t) {
      return r(t);
    };
  }
  return Fr = e, Fr;
}
var Hr, Sa;
function Ni() {
  if (Sa) return Hr;
  Sa = 1;
  function e(r, t) {
    return r.has(t);
  }
  return Hr = e, Hr;
}
var Kr, Ta;
function lu() {
  if (Ta) return Kr;
  Ta = 1;
  var e = Pi(), r = ou(), t = cu(), n = fu(), a = Li(), i = Ni(), s = 200;
  function u(l, o, v, _) {
    var w = -1, R = r, I = !0, S = l.length, b = [], C = o.length;
    if (!S)
      return b;
    v && (o = n(o, a(v))), _ ? (R = t, I = !1) : o.length >= s && (R = i, I = !1, o = new e(o));
    e:
      for (; ++w < S; ) {
        var g = l[w], M = v == null ? g : v(g);
        if (g = _ || g !== 0 ? g : 0, I && M === M) {
          for (var y = C; y--; )
            if (o[y] === M)
              continue e;
          b.push(g);
        } else R(o, M, _) || b.push(g);
      }
    return b;
  }
  return Kr = u, Kr;
}
var kr, Ra;
function Gi() {
  if (Ra) return kr;
  Ra = 1;
  function e(r, t) {
    for (var n = -1, a = t.length, i = r.length; ++n < a; )
      r[i + n] = t[n];
    return r;
  }
  return kr = e, kr;
}
var Ur, Ca;
function du() {
  if (Ca) return Ur;
  Ca = 1;
  var e = fe(), r = te(), t = "[object Arguments]";
  function n(a) {
    return r(a) && e(a) == t;
  }
  return Ur = n, Ur;
}
var Wr, Aa;
function Fi() {
  if (Aa) return Wr;
  Aa = 1;
  var e = du(), r = te(), t = Object.prototype, n = t.hasOwnProperty, a = t.propertyIsEnumerable, i = e(/* @__PURE__ */ function() {
    return arguments;
  }()) ? e : function(s) {
    return r(s) && n.call(s, "callee") && !a.call(s, "callee");
  };
  return Wr = i, Wr;
}
var Br, wa;
function Oe() {
  if (wa) return Br;
  wa = 1;
  var e = Array.isArray;
  return Br = e, Br;
}
var zr, Ia;
function vu() {
  if (Ia) return zr;
  Ia = 1;
  var e = Re(), r = Fi(), t = Oe(), n = e ? e.isConcatSpreadable : void 0;
  function a(i) {
    return t(i) || r(i) || !!(n && i && i[n]);
  }
  return zr = a, zr;
}
var Vr, Oa;
function _u() {
  if (Oa) return Vr;
  Oa = 1;
  var e = Gi(), r = vu();
  function t(n, a, i, s, u) {
    var l = -1, o = n.length;
    for (i || (i = r), u || (u = []); ++l < o; ) {
      var v = n[l];
      a > 0 && i(v) ? a > 1 ? t(v, a - 1, i, s, u) : e(u, v) : s || (u[u.length] = v);
    }
    return u;
  }
  return Vr = t, Vr;
}
var $r, ma;
function Hi() {
  if (ma) return $r;
  ma = 1;
  function e(r) {
    return r;
  }
  return $r = e, $r;
}
var Jr, Ea;
function hu() {
  if (Ea) return Jr;
  Ea = 1;
  function e(r, t, n) {
    switch (n.length) {
      case 0:
        return r.call(t);
      case 1:
        return r.call(t, n[0]);
      case 2:
        return r.call(t, n[0], n[1]);
      case 3:
        return r.call(t, n[0], n[1], n[2]);
    }
    return r.apply(t, n);
  }
  return Jr = e, Jr;
}
var Xr, Ma;
function gu() {
  if (Ma) return Xr;
  Ma = 1;
  var e = hu(), r = Math.max;
  function t(n, a, i) {
    return a = r(a === void 0 ? n.length - 1 : a, 0), function() {
      for (var s = arguments, u = -1, l = r(s.length - a, 0), o = Array(l); ++u < l; )
        o[u] = s[a + u];
      u = -1;
      for (var v = Array(a + 1); ++u < a; )
        v[u] = s[u];
      return v[a] = i(o), e(n, this, v);
    };
  }
  return Xr = t, Xr;
}
var Qr, ja;
function pu() {
  if (ja) return Qr;
  ja = 1;
  function e(r) {
    return function() {
      return r;
    };
  }
  return Qr = e, Qr;
}
var Yr, Da;
function yu() {
  if (Da) return Yr;
  Da = 1;
  var e = Q(), r = function() {
    try {
      var t = e(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch {
    }
  }();
  return Yr = r, Yr;
}
var Zr, xa;
function bu() {
  if (xa) return Zr;
  xa = 1;
  var e = pu(), r = yu(), t = Hi(), n = r ? function(a, i) {
    return r(a, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(i),
      writable: !0
    });
  } : t;
  return Zr = n, Zr;
}
var et, Pa;
function qu() {
  if (Pa) return et;
  Pa = 1;
  var e = 800, r = 16, t = Date.now;
  function n(a) {
    var i = 0, s = 0;
    return function() {
      var u = t(), l = r - (u - s);
      if (s = u, l > 0) {
        if (++i >= e)
          return arguments[0];
      } else
        i = 0;
      return a.apply(void 0, arguments);
    };
  }
  return et = n, et;
}
var rt, La;
function Su() {
  if (La) return rt;
  La = 1;
  var e = bu(), r = qu(), t = r(e);
  return rt = t, rt;
}
var tt, Na;
function Tu() {
  if (Na) return tt;
  Na = 1;
  var e = Hi(), r = gu(), t = Su();
  function n(a, i) {
    return t(r(a, i, e), a + "");
  }
  return tt = n, tt;
}
var nt, Ga;
function Ki() {
  if (Ga) return nt;
  Ga = 1;
  var e = 9007199254740991;
  function r(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= e;
  }
  return nt = r, nt;
}
var at, Fa;
function ki() {
  if (Fa) return at;
  Fa = 1;
  var e = Mi(), r = Ki();
  function t(n) {
    return n != null && r(n.length) && !e(n);
  }
  return at = t, at;
}
var it, Ha;
function Ru() {
  if (Ha) return it;
  Ha = 1;
  var e = ki(), r = te();
  function t(n) {
    return r(n) && e(n);
  }
  return it = t, it;
}
var st, Ka;
function Cu() {
  if (Ka) return st;
  Ka = 1;
  function e(r) {
    var t = r == null ? 0 : r.length;
    return t ? r[t - 1] : void 0;
  }
  return st = e, st;
}
var ut, ka;
function Au() {
  if (ka) return ut;
  ka = 1;
  var e = lu(), r = _u(), t = Tu(), n = Ru(), a = Cu(), i = t(function(s, u) {
    var l = a(u);
    return n(l) && (l = void 0), n(s) ? e(s, r(u, 1, n, !0), void 0, l) : [];
  });
  return ut = i, ut;
}
var wu = Au();
const Ua = /* @__PURE__ */ zt(wu);
var ot, Wa;
function Iu() {
  if (Wa) return ot;
  Wa = 1;
  var e = we();
  function r() {
    this.__data__ = new e(), this.size = 0;
  }
  return ot = r, ot;
}
var ct, Ba;
function Ou() {
  if (Ba) return ct;
  Ba = 1;
  function e(r) {
    var t = this.__data__, n = t.delete(r);
    return this.size = t.size, n;
  }
  return ct = e, ct;
}
var ft, za;
function mu() {
  if (za) return ft;
  za = 1;
  function e(r) {
    return this.__data__.get(r);
  }
  return ft = e, ft;
}
var lt, Va;
function Eu() {
  if (Va) return lt;
  Va = 1;
  function e(r) {
    return this.__data__.has(r);
  }
  return lt = e, lt;
}
var dt, $a;
function Mu() {
  if ($a) return dt;
  $a = 1;
  var e = we(), r = Vt(), t = xi(), n = 200;
  function a(i, s) {
    var u = this.__data__;
    if (u instanceof e) {
      var l = u.__data__;
      if (!r || l.length < n - 1)
        return l.push([i, s]), this.size = ++u.size, this;
      u = this.__data__ = new t(l);
    }
    return u.set(i, s), this.size = u.size, this;
  }
  return dt = a, dt;
}
var vt, Ja;
function ju() {
  if (Ja) return vt;
  Ja = 1;
  var e = we(), r = Iu(), t = Ou(), n = mu(), a = Eu(), i = Mu();
  function s(u) {
    var l = this.__data__ = new e(u);
    this.size = l.size;
  }
  return s.prototype.clear = r, s.prototype.delete = t, s.prototype.get = n, s.prototype.has = a, s.prototype.set = i, vt = s, vt;
}
var _t, Xa;
function Du() {
  if (Xa) return _t;
  Xa = 1;
  function e(r, t) {
    for (var n = -1, a = r == null ? 0 : r.length; ++n < a; )
      if (t(r[n], n, r))
        return !0;
    return !1;
  }
  return _t = e, _t;
}
var ht, Qa;
function Ui() {
  if (Qa) return ht;
  Qa = 1;
  var e = Pi(), r = Du(), t = Ni(), n = 1, a = 2;
  function i(s, u, l, o, v, _) {
    var w = l & n, R = s.length, I = u.length;
    if (R != I && !(w && I > R))
      return !1;
    var S = _.get(s), b = _.get(u);
    if (S && b)
      return S == u && b == s;
    var C = -1, g = !0, M = l & a ? new e() : void 0;
    for (_.set(s, u), _.set(u, s); ++C < R; ) {
      var y = s[C], j = u[C];
      if (o)
        var A = w ? o(j, y, C, u, s, _) : o(y, j, C, s, u, _);
      if (A !== void 0) {
        if (A)
          continue;
        g = !1;
        break;
      }
      if (M) {
        if (!r(u, function(T, D) {
          if (!t(M, D) && (y === T || v(y, T, l, o, _)))
            return M.push(D);
        })) {
          g = !1;
          break;
        }
      } else if (!(y === j || v(y, j, l, o, _))) {
        g = !1;
        break;
      }
    }
    return _.delete(s), _.delete(u), g;
  }
  return ht = i, ht;
}
var gt, Ya;
function xu() {
  if (Ya) return gt;
  Ya = 1;
  var e = B(), r = e.Uint8Array;
  return gt = r, gt;
}
var pt, Za;
function Pu() {
  if (Za) return pt;
  Za = 1;
  function e(r) {
    var t = -1, n = Array(r.size);
    return r.forEach(function(a, i) {
      n[++t] = [i, a];
    }), n;
  }
  return pt = e, pt;
}
var yt, ei;
function Lu() {
  if (ei) return yt;
  ei = 1;
  function e(r) {
    var t = -1, n = Array(r.size);
    return r.forEach(function(a) {
      n[++t] = a;
    }), n;
  }
  return yt = e, yt;
}
var bt, ri;
function Nu() {
  if (ri) return bt;
  ri = 1;
  var e = Re(), r = xu(), t = Di(), n = Ui(), a = Pu(), i = Lu(), s = 1, u = 2, l = "[object Boolean]", o = "[object Date]", v = "[object Error]", _ = "[object Map]", w = "[object Number]", R = "[object RegExp]", I = "[object Set]", S = "[object String]", b = "[object Symbol]", C = "[object ArrayBuffer]", g = "[object DataView]", M = e ? e.prototype : void 0, y = M ? M.valueOf : void 0;
  function j(A, T, D, P, N, q, G) {
    switch (D) {
      case g:
        if (A.byteLength != T.byteLength || A.byteOffset != T.byteOffset)
          return !1;
        A = A.buffer, T = T.buffer;
      case C:
        return !(A.byteLength != T.byteLength || !q(new r(A), new r(T)));
      case l:
      case o:
      case w:
        return t(+A, +T);
      case v:
        return A.name == T.name && A.message == T.message;
      case R:
      case S:
        return A == T + "";
      case _:
        var E = a;
      case I:
        var k = P & s;
        if (E || (E = i), A.size != T.size && !k)
          return !1;
        var f = G.get(A);
        if (f)
          return f == T;
        P |= u, G.set(A, T);
        var $ = n(E(A), E(T), P, N, q, G);
        return G.delete(A), $;
      case b:
        if (y)
          return y.call(A) == y.call(T);
    }
    return !1;
  }
  return bt = j, bt;
}
var qt, ti;
function Gu() {
  if (ti) return qt;
  ti = 1;
  var e = Gi(), r = Oe();
  function t(n, a, i) {
    var s = a(n);
    return r(n) ? s : e(s, i(n));
  }
  return qt = t, qt;
}
var St, ni;
function Fu() {
  if (ni) return St;
  ni = 1;
  function e(r, t) {
    for (var n = -1, a = r == null ? 0 : r.length, i = 0, s = []; ++n < a; ) {
      var u = r[n];
      t(u, n, r) && (s[i++] = u);
    }
    return s;
  }
  return St = e, St;
}
var Tt, ai;
function Hu() {
  if (ai) return Tt;
  ai = 1;
  function e() {
    return [];
  }
  return Tt = e, Tt;
}
var Rt, ii;
function Ku() {
  if (ii) return Rt;
  ii = 1;
  var e = Fu(), r = Hu(), t = Object.prototype, n = t.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(s) {
    return s == null ? [] : (s = Object(s), e(a(s), function(u) {
      return n.call(s, u);
    }));
  } : r;
  return Rt = i, Rt;
}
var Ct, si;
function ku() {
  if (si) return Ct;
  si = 1;
  function e(r, t) {
    for (var n = -1, a = Array(r); ++n < r; )
      a[n] = t(n);
    return a;
  }
  return Ct = e, Ct;
}
var oe = { exports: {} }, At, ui;
function Uu() {
  if (ui) return At;
  ui = 1;
  function e() {
    return !1;
  }
  return At = e, At;
}
oe.exports;
var oi;
function Wi() {
  return oi || (oi = 1, function(e, r) {
    var t = B(), n = Uu(), a = r && !r.nodeType && r, i = a && !0 && e && !e.nodeType && e, s = i && i.exports === a, u = s ? t.Buffer : void 0, l = u ? u.isBuffer : void 0, o = l || n;
    e.exports = o;
  }(oe, oe.exports)), oe.exports;
}
var wt, ci;
function Wu() {
  if (ci) return wt;
  ci = 1;
  var e = 9007199254740991, r = /^(?:0|[1-9]\d*)$/;
  function t(n, a) {
    var i = typeof n;
    return a = a ?? e, !!a && (i == "number" || i != "symbol" && r.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return wt = t, wt;
}
var It, fi;
function Bu() {
  if (fi) return It;
  fi = 1;
  var e = fe(), r = Ki(), t = te(), n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", s = "[object Date]", u = "[object Error]", l = "[object Function]", o = "[object Map]", v = "[object Number]", _ = "[object Object]", w = "[object RegExp]", R = "[object Set]", I = "[object String]", S = "[object WeakMap]", b = "[object ArrayBuffer]", C = "[object DataView]", g = "[object Float32Array]", M = "[object Float64Array]", y = "[object Int8Array]", j = "[object Int16Array]", A = "[object Int32Array]", T = "[object Uint8Array]", D = "[object Uint8ClampedArray]", P = "[object Uint16Array]", N = "[object Uint32Array]", q = {};
  q[g] = q[M] = q[y] = q[j] = q[A] = q[T] = q[D] = q[P] = q[N] = !0, q[n] = q[a] = q[b] = q[i] = q[C] = q[s] = q[u] = q[l] = q[o] = q[v] = q[_] = q[w] = q[R] = q[I] = q[S] = !1;
  function G(E) {
    return t(E) && r(E.length) && !!q[e(E)];
  }
  return It = G, It;
}
var ce = { exports: {} };
ce.exports;
var li;
function zu() {
  return li || (li = 1, function(e, r) {
    var t = Ei(), n = r && !r.nodeType && r, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, s = i && t.process, u = function() {
      try {
        var l = a && a.require && a.require("util").types;
        return l || s && s.binding && s.binding("util");
      } catch {
      }
    }();
    e.exports = u;
  }(ce, ce.exports)), ce.exports;
}
var Ot, di;
function Bi() {
  if (di) return Ot;
  di = 1;
  var e = Bu(), r = Li(), t = zu(), n = t && t.isTypedArray, a = n ? r(n) : e;
  return Ot = a, Ot;
}
var mt, vi;
function Vu() {
  if (vi) return mt;
  vi = 1;
  var e = ku(), r = Fi(), t = Oe(), n = Wi(), a = Wu(), i = Bi(), s = Object.prototype, u = s.hasOwnProperty;
  function l(o, v) {
    var _ = t(o), w = !_ && r(o), R = !_ && !w && n(o), I = !_ && !w && !R && i(o), S = _ || w || R || I, b = S ? e(o.length, String) : [], C = b.length;
    for (var g in o)
      (v || u.call(o, g)) && !(S && // Safari 9 has enumerable `arguments.length` in strict mode.
      (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      R && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      I && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
      a(g, C))) && b.push(g);
    return b;
  }
  return mt = l, mt;
}
var Et, _i;
function $u() {
  if (_i) return Et;
  _i = 1;
  var e = Object.prototype;
  function r(t) {
    var n = t && t.constructor, a = typeof n == "function" && n.prototype || e;
    return t === a;
  }
  return Et = r, Et;
}
var Mt, hi;
function Ju() {
  if (hi) return Mt;
  hi = 1;
  function e(r, t) {
    return function(n) {
      return r(t(n));
    };
  }
  return Mt = e, Mt;
}
var jt, gi;
function Xu() {
  if (gi) return jt;
  gi = 1;
  var e = Ju(), r = e(Object.keys, Object);
  return jt = r, jt;
}
var Dt, pi;
function Qu() {
  if (pi) return Dt;
  pi = 1;
  var e = $u(), r = Xu(), t = Object.prototype, n = t.hasOwnProperty;
  function a(i) {
    if (!e(i))
      return r(i);
    var s = [];
    for (var u in Object(i))
      n.call(i, u) && u != "constructor" && s.push(u);
    return s;
  }
  return Dt = a, Dt;
}
var xt, yi;
function Yu() {
  if (yi) return xt;
  yi = 1;
  var e = Vu(), r = Qu(), t = ki();
  function n(a) {
    return t(a) ? e(a) : r(a);
  }
  return xt = n, xt;
}
var Pt, bi;
function Zu() {
  if (bi) return Pt;
  bi = 1;
  var e = Gu(), r = Ku(), t = Yu();
  function n(a) {
    return e(a, t, r);
  }
  return Pt = n, Pt;
}
var Lt, qi;
function eo() {
  if (qi) return Lt;
  qi = 1;
  var e = Zu(), r = 1, t = Object.prototype, n = t.hasOwnProperty;
  function a(i, s, u, l, o, v) {
    var _ = u & r, w = e(i), R = w.length, I = e(s), S = I.length;
    if (R != S && !_)
      return !1;
    for (var b = R; b--; ) {
      var C = w[b];
      if (!(_ ? C in s : n.call(s, C)))
        return !1;
    }
    var g = v.get(i), M = v.get(s);
    if (g && M)
      return g == s && M == i;
    var y = !0;
    v.set(i, s), v.set(s, i);
    for (var j = _; ++b < R; ) {
      C = w[b];
      var A = i[C], T = s[C];
      if (l)
        var D = _ ? l(T, A, C, s, i, v) : l(A, T, C, i, s, v);
      if (!(D === void 0 ? A === T || o(A, T, u, l, v) : D)) {
        y = !1;
        break;
      }
      j || (j = C == "constructor");
    }
    if (y && !j) {
      var P = i.constructor, N = s.constructor;
      P != N && "constructor" in i && "constructor" in s && !(typeof P == "function" && P instanceof P && typeof N == "function" && N instanceof N) && (y = !1);
    }
    return v.delete(i), v.delete(s), y;
  }
  return Lt = a, Lt;
}
var Nt, Si;
function ro() {
  if (Si) return Nt;
  Si = 1;
  var e = Q(), r = B(), t = e(r, "DataView");
  return Nt = t, Nt;
}
var Gt, Ti;
function to() {
  if (Ti) return Gt;
  Ti = 1;
  var e = Q(), r = B(), t = e(r, "Promise");
  return Gt = t, Gt;
}
var Ft, Ri;
function no() {
  if (Ri) return Ft;
  Ri = 1;
  var e = Q(), r = B(), t = e(r, "Set");
  return Ft = t, Ft;
}
var Ht, Ci;
function ao() {
  if (Ci) return Ht;
  Ci = 1;
  var e = Q(), r = B(), t = e(r, "WeakMap");
  return Ht = t, Ht;
}
var Kt, Ai;
function io() {
  if (Ai) return Kt;
  Ai = 1;
  var e = ro(), r = Vt(), t = to(), n = no(), a = ao(), i = fe(), s = ji(), u = "[object Map]", l = "[object Object]", o = "[object Promise]", v = "[object Set]", _ = "[object WeakMap]", w = "[object DataView]", R = s(e), I = s(r), S = s(t), b = s(n), C = s(a), g = i;
  return (e && g(new e(new ArrayBuffer(1))) != w || r && g(new r()) != u || t && g(t.resolve()) != o || n && g(new n()) != v || a && g(new a()) != _) && (g = function(M) {
    var y = i(M), j = y == l ? M.constructor : void 0, A = j ? s(j) : "";
    if (A)
      switch (A) {
        case R:
          return w;
        case I:
          return u;
        case S:
          return o;
        case b:
          return v;
        case C:
          return _;
      }
    return y;
  }), Kt = g, Kt;
}
var kt, wi;
function so() {
  if (wi) return kt;
  wi = 1;
  var e = ju(), r = Ui(), t = Nu(), n = eo(), a = io(), i = Oe(), s = Wi(), u = Bi(), l = 1, o = "[object Arguments]", v = "[object Array]", _ = "[object Object]", w = Object.prototype, R = w.hasOwnProperty;
  function I(S, b, C, g, M, y) {
    var j = i(S), A = i(b), T = j ? v : a(S), D = A ? v : a(b);
    T = T == o ? _ : T, D = D == o ? _ : D;
    var P = T == _, N = D == _, q = T == D;
    if (q && s(S)) {
      if (!s(b))
        return !1;
      j = !0, P = !1;
    }
    if (q && !P)
      return y || (y = new e()), j || u(S) ? r(S, b, C, g, M, y) : t(S, b, T, C, g, M, y);
    if (!(C & l)) {
      var G = P && R.call(S, "__wrapped__"), E = N && R.call(b, "__wrapped__");
      if (G || E) {
        var k = G ? S.value() : S, f = E ? b.value() : b;
        return y || (y = new e()), M(k, f, C, g, y);
      }
    }
    return q ? (y || (y = new e()), n(S, b, C, g, M, y)) : !1;
  }
  return kt = I, kt;
}
var Ut, Ii;
function uo() {
  if (Ii) return Ut;
  Ii = 1;
  var e = so(), r = te();
  function t(n, a, i, s, u) {
    return n === a ? !0 : n == null || a == null || !r(n) && !r(a) ? n !== n && a !== a : e(n, a, i, s, t, u);
  }
  return Ut = t, Ut;
}
var Wt, Oi;
function oo() {
  if (Oi) return Wt;
  Oi = 1;
  var e = uo();
  function r(t, n) {
    return e(t, n);
  }
  return Wt = r, Wt;
}
var co = oo();
const be = /* @__PURE__ */ zt(co), fo = (e) => e.map(({ field: t, sort: n }) => ({
  field: t,
  order: n || "asc"
})), lo = (e) => e.map(({ field: t, order: n }) => ({
  field: t,
  sort: n
})), vo = (e) => {
  if (!e)
    return "eq";
  switch (e) {
    case "equals":
    case "is":
    case "=":
      return "eq";
    case "!=":
    case "not":
      return "ne";
    case "contains":
      return "contains";
    case "isAnyOf":
      return "in";
    case ">":
    case "after":
      return "gt";
    case ">=":
    case "onOrAfter":
      return "gte";
    case "<":
    case "before":
      return "lt";
    case "<=":
    case "onOrBefore":
      return "lte";
    case "startsWith":
      return "startswith";
    case "endsWith":
      return "endswith";
    case "isEmpty":
      return "null";
    case "isNotEmpty":
      return "nnull";
    default:
      return e;
  }
}, _o = ({
  items: e,
  logicOperator: r
}) => {
  const t = e.map(({ field: n, value: a, operator: i }) => ({
    field: n,
    value: ["isEmpty", "isNotEmpty"].includes(i) ? !0 : a ?? "",
    operator: vo(i)
  }));
  return r === Bt.Or ? [{ operator: "or", value: t }] : t;
}, mi = (e, r) => {
  switch (r) {
    case "number":
      switch (e) {
        case "eq":
          return "=";
        case "ne":
          return "!=";
        case "gt":
          return ">";
        case "gte":
          return ">=";
        case "lt":
          return "<";
        case "lte":
          return "<=";
        case "null":
          return "isEmpty";
        case "nnull":
          return "isNotEmpty";
        case "in":
          return "isAnyOf";
        default:
          return e;
      }
    case "singleSelect":
    case "boolean":
      switch (e) {
        case "eq":
          return "is";
        default:
          return e;
      }
    case void 0:
    case "string":
      switch (e) {
        case "eq":
          return "equals";
        case "contains":
          return "contains";
        case "null":
          return "isEmpty";
        case "nnull":
          return "isNotEmpty";
        case "startswith":
          return "startsWith";
        case "endswith":
          return "endsWith";
        case "in":
          return "isAnyOf";
        default:
          return e;
      }
    case "date":
    case "dateTime":
      switch (e) {
        case "eq":
          return "is";
        case "ne":
          return "not";
        case "gt":
          return "after";
        case "gte":
          return "onOrAfter";
        case "lt":
          return "before";
        case "lte":
          return "onOrBefore";
        case "null":
          return "isEmpty";
        case "nnull":
          return "isNotEmpty";
        default:
          return e;
      }
    default:
      return e;
  }
}, ho = (e, r) => {
  var a;
  const t = [], n = e.some(
    (i) => i.operator === "or"
  );
  return r && (n ? ((a = e.find(
    (s) => s.operator === "or"
  )) == null ? void 0 : a.value).map(({ field: s, value: u, operator: l }) => {
    const o = r[s];
    t.push({
      field: s,
      operator: mi(l, o),
      value: u === "" ? void 0 : u,
      id: s + l
    });
  }) : e.map(({ field: i, value: s, operator: u }) => {
    const l = r[i];
    t.push({
      field: i,
      operator: mi(u, l),
      value: s === "" ? void 0 : s,
      id: i + u
    });
  })), {
    items: t,
    // If there is "or" filter, default link operator is "or"
    logicOperator: n ? Bt.Or : Bt.And
  };
};
function So() {
  return {
    // Create an accessor field with direct key
    accessor: (e, r) => ({
      accessorKey: e,
      ...r,
      type: (r == null ? void 0 : r.type) || "string"
    }),
    // Create an accessor field with a function
    accessorFn: (e, r) => ({
      accessorFn: e,
      ...r,
      type: r.type || "string"
    }),
    // Create a display-only field (no data model)
    display: (e) => ({
      ...e,
      type: "display"
    }),
    // Create a group field
    group: (e) => ({
      ...e,
      type: "group"
    })
  };
}
function go(e, r) {
  if ("accessorKey" in e)
    return r[e.accessorKey];
  if ("accessorFn" in e)
    return e.accessorFn(r);
  if ("fields" in e && e.fields.length > 0) {
    const t = e.fields[0];
    return go(t, r);
  }
}
function Se(e) {
  return e.flatMap((r) => "fields" in r ? Se(r.fields) : "accessorKey" in r || "accessorFn" in r ? [r] : []);
}
function To({
  onSearch: e,
  initialCurrent: r,
  initialPageSize: t = 25,
  pagination: n,
  hasPagination: a = !0,
  initialSorter: i,
  permanentSorter: s,
  defaultSetFilterBehavior: u = "replace",
  initialFilter: l,
  permanentFilter: o,
  filters: v,
  sorters: _,
  syncWithLocation: w,
  resource: R,
  successNotification: I,
  errorNotification: S,
  queryOptions: b,
  liveMode: C,
  onLiveEvent: g,
  liveParams: M,
  meta: y,
  metaData: j,
  dataProviderName: A,
  overtimeOptions: T,
  editable: D = !1,
  selectable: P = !1,
  rowSelection: N,
  onRowSelectionChange: q,
  enableRowSelection: G = !0,
  updateMutationOptions: E,
  deleteMutationOptions: k,
  schema: f
} = {}) {
  const $ = ys(C), le = yn({}), { identifier: U } = bs({ resource: R }), {
    tableQueryResult: $t,
    tableQuery: me,
    current: Jt,
    setCurrent: ne,
    pageSize: Xt,
    setPageSize: Qt,
    filters: Yt,
    setFilters: de,
    sorters: Ee,
    setSorters: Zt,
    sorter: zi,
    setSorter: Vi,
    pageCount: $i,
    createLinkForSyncWithLocation: Ji,
    overtime: Xi
  } = qs({
    permanentSorter: s,
    permanentFilter: o,
    initialCurrent: r,
    initialPageSize: t,
    pagination: n,
    hasPagination: a,
    initialSorter: i,
    initialFilter: l,
    filters: v,
    sorters: _,
    syncWithLocation: w,
    defaultSetFilterBehavior: u,
    resource: R,
    successNotification: I,
    errorNotification: S,
    queryOptions: b,
    liveMode: C,
    onLiveEvent: g,
    liveParams: M,
    meta: pe(y, j),
    metaData: pe(y, j),
    dataProviderName: A,
    overtimeOptions: T
  }), [en, Me] = qe(Yt), [H, J] = qe(N || {}), [ae, Y] = qe({}), Qi = yn(!0), Yi = ge(() => Object.values(ae).some((c) => c.mode === ue.Edit), [ae]);
  Ne(() => {
    N && !be(N, H) && J(N);
  }, [N]), Ne(() => {
    q && q(H);
  }, [H, q]);
  const { data: x, isFetched: rn, isLoading: tn } = $t, K = ge(() => {
    var c, d;
    if (!(x != null && x.data)) return [];
    if ((d = (c = f == null ? void 0 : f.operations) == null ? void 0 : c.list) != null && d.transform)
      try {
        const p = f.operations.list.transform(x.data);
        return p instanceof Promise ? x.data : p;
      } catch (p) {
        return console.error("Error transforming rows:", p), x.data;
      }
    return x.data;
  }, [x == null ? void 0 : x.data, f]);
  Ne(() => {
    var c, d;
    x != null && x.data && ((d = (c = f == null ? void 0 : f.operations) == null ? void 0 : c.list) != null && d.transform) && Promise.resolve(f.operations.list.transform(x.data)).catch((h) => {
      console.error("Error in async row transformation:", h);
    });
  }, [x == null ? void 0 : x.data, f]);
  const nn = ((v == null ? void 0 : v.mode) || "server") === "server", an = ((_ == null ? void 0 : _.mode) || "server") === "server", Zi = a === !1 ? "off" : "server", Z = ((n == null ? void 0 : n.mode) ?? Zi) !== "off", sn = pe(_ == null ? void 0 : _.permanent, s) ?? [], un = pe(v == null ? void 0 : v.permanent, o) ?? [], es = (c) => {
    Z && ne(c + 1);
  }, rs = (c) => {
    Z && Qt(c);
  }, on = (c) => {
    const d = fo(c);
    Zt(d);
  }, ts = async (c) => {
    if (e) {
      const d = await e(c);
      Me(d), de(d.filter((p) => p.value !== "")), Z && ne(1);
    }
  }, cn = () => Z ? {
    paginationMode: "server",
    paginationModel: {
      page: Jt - 1,
      pageSize: Xt
    },
    onPaginationModelChange: (c) => {
      es(c.page), rs(c.pageSize);
    }
  } : {
    paginationMode: "client"
  }, { mutate: ns } = Ss({
    mutationOptions: E
  }), { mutate: je } = Ts(), { mutate: De } = Rs({
    mutationOptions: k
  }), V = F((c) => {
    if (f != null && f.getId) {
      try {
        const d = f.getId(c);
        if (!(d instanceof Promise))
          return String(d);
      } catch (d) {
        console.error("Error getting row ID:", d);
      }
      return String(c.id);
    }
    return String(c.id);
  }, [f]), ve = F((c) => typeof G == "function" ? G(c) : G === !0, [G]), as = F(() => ({ rows: K.filter((d) => {
    const p = V(d);
    return H[p];
  }) }), [H, K, V]), xe = F(() => {
    if (K.length === 0) return !1;
    const c = K.filter((p) => ve(p)), d = c.filter((p) => {
      const h = V(p);
      return H[h];
    }).length;
    return c.length > 0 && d === c.length;
  }, [H, K, ve, V]), is = F(() => {
    if (K.length === 0) return !1;
    const c = K.filter((d) => {
      const p = V(d);
      return H[p];
    }).length;
    return c > 0 && c < K.length;
  }, [H, K, V]), ss = F((c) => {
    if (c ?? !xe()) {
      const p = {};
      K.forEach((h) => {
        if (ve(h)) {
          const O = V(h);
          p[O] = !0;
        }
      }), J(p);
    } else
      J({});
  }, [K, xe, ve, V]), us = F(() => Object.entries(H).filter(([c, d]) => d).map(([c]) => c), [H]), os = async (c) => {
    var O;
    if (!f)
      return { isValid: !0, errors: {} };
    const d = {};
    let p = !0;
    const h = Se(f.fields);
    for (const m of h) {
      const L = "accessorKey" in m ? c[m.accessorKey] : (O = m.accessorFn) == null ? void 0 : O.call(m, c);
      if (m.required && (L == null || L === "")) {
        const z = m.id || ("accessorKey" in m ? String(m.accessorKey) : "");
        d[z] = `${z} is required`, p = !1;
        continue;
      }
      if (L !== void 0 && m.validate) {
        const z = m.id || ("accessorKey" in m ? String(m.accessorKey) : ""), W = await Promise.resolve(m.validate(L));
        W !== !0 && (d[z] = typeof W == "string" ? W : `${z} is invalid`, p = !1);
      }
    }
    return { isValid: p, errors: d };
  }, fn = async (c) => {
    if (!f) return c;
    const d = { ...c }, p = Se(f.fields);
    for (const h of p) {
      let O, m = !1;
      if ("accessorKey" in h)
        O = h.accessorKey, m = d[O] !== void 0;
      else if ("accessorFn" in h && h.id)
        O = h.id, m = d[O] !== void 0;
      else
        continue;
      if (!m && h.default !== void 0) {
        const L = typeof h.default == "function" ? await Promise.resolve(h.default()) : h.default;
        d[O] = L;
      }
    }
    return d;
  }, cs = async (c) => {
    if (!f) return c;
    const d = { ...c }, p = Se(f.fields);
    for (const h of p) {
      if (!h.transform) continue;
      let O, m;
      if ("accessorKey" in h)
        O = h.accessorKey, m = d[O];
      else if ("accessorFn" in h && h.id)
        O = h.id, m = h.accessorFn(d);
      else
        continue;
      if (m !== void 0) {
        const L = await Promise.resolve(h.transform(m));
        d[O] = L;
      }
    }
    return d;
  }, ln = async (c, d) => {
    var p, h, O, m;
    if (!D)
      return Promise.resolve(d);
    if (!U)
      return Promise.reject(new Error("Resource is not defined"));
    try {
      const { isValid: L, errors: z } = await os(c);
      if (!L)
        return Promise.reject({ validationErrors: z });
      const W = await cs(c);
      if (c._isTrasientInFrontend) {
        const ee = { ...W };
        delete ee._isTrasientInFrontend;
        let ie = ee;
        return (h = (p = f == null ? void 0 : f.operations) == null ? void 0 : p.create) != null && h.beforeCreate && (ie = await Promise.resolve(f.operations.create.beforeCreate(ee))), new Promise((_e, re) => {
          je(
            {
              resource: U,
              values: ie
            },
            {
              onError: (X) => {
                re(X);
              },
              onSuccess: async (X) => {
                var se, he;
                if ((he = (se = f == null ? void 0 : f.operations) == null ? void 0 : se.create) != null && he.afterCreate) {
                  const ps = await Promise.resolve(f.operations.create.afterCreate(X));
                  _e(ps);
                } else
                  _e(X.data);
              }
            }
          );
        });
      } else {
        let ee = W;
        return (m = (O = f == null ? void 0 : f.operations) == null ? void 0 : O.update) != null && m.beforeUpdate && (ee = await Promise.resolve(f.operations.update.beforeUpdate(W, d))), new Promise((ie, _e) => {
          ns(
            {
              resource: U,
              id: c.id,
              values: ee
            },
            {
              onError: (re) => {
                _e(re);
              },
              onSuccess: async (re) => {
                var X, se;
                if ((se = (X = f == null ? void 0 : f.operations) == null ? void 0 : X.update) != null && se.afterUpdate) {
                  const he = await Promise.resolve(f.operations.update.afterUpdate(re, d));
                  ie(he);
                } else
                  ie(re.data);
              }
            }
          );
        });
      }
    } catch (L) {
      return console.error("Error updating row:", L), Promise.reject(L);
    }
  }, fs = async () => {
    var d, p;
    const c = us();
    if (!(!U || c.length === 0))
      try {
        let h = c;
        if ((p = (d = f == null ? void 0 : f.operations) == null ? void 0 : d.delete) != null && p.beforeDelete && (h = await Promise.resolve(f.operations.delete.beforeDelete(h))), h.length === 0) return;
        De(
          {
            resource: U,
            ids: h
          },
          {
            onSuccess: async () => {
              var O, m;
              (m = (O = f == null ? void 0 : f.operations) == null ? void 0 : O.delete) != null && m.afterDelete && await Promise.resolve(f.operations.delete.afterDelete(h)), J({});
            }
          }
        );
      } catch (h) {
        console.error("Error deleting items:", h);
      }
  }, Pe = (c, d) => {
    c.reason === Cs.rowFocusOut && (d.defaultMuiPrevented = !0);
  }, ls = F((c) => () => {
    Y((d) => ({
      ...d,
      [c]: { mode: ue.Edit }
    }));
  }, []), ds = F((c) => () => {
    Y((d) => ({
      ...d,
      [c]: { mode: ue.View }
    }));
  }, []), vs = F((c) => () => {
    if (!U) return;
    (async () => {
      var p, h;
      try {
        let O = [String(c)];
        if ((h = (p = f == null ? void 0 : f.operations) == null ? void 0 : p.delete) != null && h.beforeDelete && (O = await Promise.resolve(f.operations.delete.beforeDelete(O))), O.length === 0) return;
        De(
          {
            resource: U,
            ids: O
          },
          {
            onSuccess: async () => {
              var m, L;
              (L = (m = f == null ? void 0 : f.operations) == null ? void 0 : m.delete) != null && L.afterDelete && await Promise.resolve(f.operations.delete.afterDelete(O)), H[String(c)] && J((z) => {
                const W = { ...z };
                return delete W[String(c)], W;
              });
            }
          }
        );
      } catch (O) {
        console.error("Error deleting item:", O);
      }
    })();
  }, [U, De, f, H]), _s = F((c) => () => {
    Y((p) => ({
      ...p,
      [c]: { mode: ue.View, ignoreModifications: !0 }
    }));
    const d = K.find((p) => p.id === c);
    d != null && d._isTrasientInFrontend && me.refetch();
  }, [K, me]), hs = F(async () => {
    var c, d, p;
    try {
      let h = {};
      (d = (c = f == null ? void 0 : f.operations) == null ? void 0 : c.create) != null && d.defaults && (h = await Promise.resolve(f.operations.create.defaults())), f != null && f.fields && (h = await fn(h));
      const O = ((p = f == null ? void 0 : f.getId) == null ? void 0 : p.call(f, h)) || `temp_${Date.now()}`, m = String(O);
      je(
        {
          resource: U ?? "",
          values: {
            ...h,
            id: O
          }
        },
        {
          onError: (L) => {
            console.error("Error creating new row:", L);
          },
          onSuccess: () => {
            Y((L) => ({
              ...L,
              [m]: { mode: ue.Edit, fieldToFocus: "name" }
            }));
          }
        }
      );
    } catch (h) {
      console.error("Error creating new row:", h);
    }
  }, [f, je, U, fn]), dn = F(() => Object.entries(H).filter(([c, d]) => d).map(([c]) => c), [H]), vn = F((c) => {
    const d = {};
    c.forEach((p) => {
      d[String(p)] = !0;
    }), J(d);
  }, []), _n = F((c) => {
    const d = Object.fromEntries(
      Object.entries(c.columns.lookup).map(([h, O]) => [h, O.type])
    );
    !be(d, le.current) && (le.current = d);
  }, []), Le = F((c, d) => {
    Qi.current = !1, d.defaultMuiPrevented = !1;
  }, []), hn = (v == null ? void 0 : v.debounceDelay) ?? 500, gn = ge(
    () => xs(
      (c) => {
        const d = _o(c);
        Me(d), de(d.filter((p) => p.value !== "")), Z && ne(1);
      },
      hn
    ),
    [Me, de, Z, ne, hn]
  ), pn = F((c) => {
    Y(c);
  }, []), gs = ge(() => ({
    disableRowSelectionOnClick: !P,
    rows: K,
    loading: $ === "auto" ? tn : !rn,
    rowCount: (x == null ? void 0 : x.total) || 0,
    ...cn(),
    sortingMode: an ? "server" : "client",
    sortModel: lo(
      Ua(Ee, sn, be)
    ),
    onSortModelChange: on,
    filterMode: nn ? "server" : "client",
    filterModel: ho(
      Ua(en, un, be),
      le.current
    ),
    onFilterModelChange: gn,
    onStateChange: _n,
    processRowUpdate: D ? ln : void 0,
    checkboxSelection: P,
    rowSelectionModel: dn(),
    onRowSelectionModelChange: vn,
    onCellDoubleClick: Le,
    editMode: "row",
    rowModesModel: ae,
    onRowModesModelChange: pn,
    onRowEditStop: Pe
  }), [
    P,
    K,
    $,
    tn,
    rn,
    x == null ? void 0 : x.total,
    cn,
    an,
    Ee,
    sn,
    on,
    nn,
    en,
    un,
    le.current,
    gn,
    _n,
    D,
    ln,
    dn,
    vn,
    Le,
    ae,
    pn,
    Pe
  ]);
  return {
    tableQueryResult: $t,
    tableQuery: me,
    dataGridProps: gs,
    current: Jt,
    setCurrent: ne,
    pageSize: Xt,
    setPageSize: Qt,
    pageCount: $i,
    sorters: Ee,
    setSorters: Zt,
    sorter: zi,
    setSorter: Vi,
    filters: Yt,
    setFilters: de,
    search: ts,
    createLinkForSyncWithLocation: Ji,
    overtime: Xi,
    rowSelection: H,
    setRowSelection: J,
    getSelectedRowModel: as,
    getIsAllRowsSelected: xe,
    getIsSomeRowsSelected: is,
    toggleAllRowsSelected: ss,
    deleteSelectedItems: fs,
    rowModesModel: ae,
    setRowModesModel: Y,
    addNewRow: hs,
    handleRowEditStop: Pe,
    handleEditClick: ls,
    handleSaveClick: ds,
    handleDeleteClick: vs,
    handleCancelClick: _s,
    handleCellDoubleClick: Le,
    isInEditMode: Yi,
    schema: f
  };
}
export {
  So as createSchemaHelper,
  Se as getAllAccessorFields,
  go as getFieldValue,
  qo as useCountUp,
  To as useDataGrid
};
