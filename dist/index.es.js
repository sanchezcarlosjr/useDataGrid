import { useLiveMode as is, useResourceParams as ss, useTable as us, useUpdate as os, useCreate as cs, useDeleteMany as fs } from "@refinedev/core";
import { useRef as on, useState as Me, useMemo as ae, useEffect as je, useCallback as L } from "react";
import { GridLogicOperator as Ht, GridRowModes as de, GridRowEditStopReasons as ls } from "@mui/x-data-grid";
var ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Kt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var De, cn;
function ge() {
  if (cn) return De;
  cn = 1;
  function r(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  return De = r, De;
}
var xe, fn;
function qi() {
  if (fn) return xe;
  fn = 1;
  var r = typeof ve == "object" && ve && ve.Object === Object && ve;
  return xe = r, xe;
}
var Pe, ln;
function U() {
  if (ln) return Pe;
  ln = 1;
  var r = qi(), e = typeof self == "object" && self && self.Object === Object && self, t = r || e || Function("return this")();
  return Pe = t, Pe;
}
var Le, dn;
function ds() {
  if (dn) return Le;
  dn = 1;
  var r = U(), e = function() {
    return r.Date.now();
  };
  return Le = e, Le;
}
var Ne, vn;
function vs() {
  if (vn) return Ne;
  vn = 1;
  var r = /\s/;
  function e(t) {
    for (var n = t.length; n-- && r.test(t.charAt(n)); )
      ;
    return n;
  }
  return Ne = e, Ne;
}
var Ge, _n;
function _s() {
  if (_n) return Ge;
  _n = 1;
  var r = vs(), e = /^\s+/;
  function t(n) {
    return n && n.slice(0, r(n) + 1).replace(e, "");
  }
  return Ge = t, Ge;
}
var Fe, hn;
function pe() {
  if (hn) return Fe;
  hn = 1;
  var r = U(), e = r.Symbol;
  return Fe = e, Fe;
}
var He, gn;
function hs() {
  if (gn) return He;
  gn = 1;
  var r = pe(), e = Object.prototype, t = e.hasOwnProperty, n = e.toString, a = r ? r.toStringTag : void 0;
  function i(s) {
    var u = t.call(s, a), l = s[a];
    try {
      s[a] = void 0;
      var c = !0;
    } catch {
    }
    var _ = n.call(s);
    return c && (u ? s[a] = l : delete s[a]), _;
  }
  return He = i, He;
}
var Ke, pn;
function gs() {
  if (pn) return Ke;
  pn = 1;
  var r = Object.prototype, e = r.toString;
  function t(n) {
    return e.call(n);
  }
  return Ke = t, Ke;
}
var ke, yn;
function ue() {
  if (yn) return ke;
  yn = 1;
  var r = pe(), e = hs(), t = gs(), n = "[object Null]", a = "[object Undefined]", i = r ? r.toStringTag : void 0;
  function s(u) {
    return u == null ? u === void 0 ? a : n : i && i in Object(u) ? e(u) : t(u);
  }
  return ke = s, ke;
}
var Ue, bn;
function Q() {
  if (bn) return Ue;
  bn = 1;
  function r(e) {
    return e != null && typeof e == "object";
  }
  return Ue = r, Ue;
}
var We, qn;
function ps() {
  if (qn) return We;
  qn = 1;
  var r = ue(), e = Q(), t = "[object Symbol]";
  function n(a) {
    return typeof a == "symbol" || e(a) && r(a) == t;
  }
  return We = n, We;
}
var Be, Sn;
function ys() {
  if (Sn) return Be;
  Sn = 1;
  var r = _s(), e = ge(), t = ps(), n = NaN, a = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, s = /^0o[0-7]+$/i, u = parseInt;
  function l(c) {
    if (typeof c == "number")
      return c;
    if (t(c))
      return n;
    if (e(c)) {
      var _ = typeof c.valueOf == "function" ? c.valueOf() : c;
      c = e(_) ? _ + "" : _;
    }
    if (typeof c != "string")
      return c === 0 ? c : +c;
    c = r(c);
    var p = i.test(c);
    return p || s.test(c) ? u(c.slice(2), p ? 2 : 8) : a.test(c) ? n : +c;
  }
  return Be = l, Be;
}
var ze, Tn;
function bs() {
  if (Tn) return ze;
  Tn = 1;
  var r = ge(), e = ds(), t = ys(), n = "Expected a function", a = Math.max, i = Math.min;
  function s(u, l, c) {
    var _, p, w, A, I, S, b = 0, T = !1, g = !1, m = !0;
    if (typeof u != "function")
      throw new TypeError(n);
    l = t(l) || 0, r(c) && (T = !!c.leading, g = "maxWait" in c, w = g ? a(t(c.maxWait) || 0, l) : w, m = "trailing" in c ? !!c.trailing : m);
    function q(C) {
      var F = _, K = p;
      return _ = p = void 0, b = C, A = u.apply(K, F), A;
    }
    function D(C) {
      return b = C, I = setTimeout(j, l), T ? q(C) : A;
    }
    function o(C) {
      var F = C - S, K = C - b, z = l - F;
      return g ? i(z, w - K) : z;
    }
    function R(C) {
      var F = C - S, K = C - b;
      return S === void 0 || F >= l || F < 0 || g && K >= w;
    }
    function j() {
      var C = e();
      if (R(C))
        return M(C);
      I = setTimeout(j, o(C));
    }
    function M(C) {
      return I = void 0, m && _ ? q(C) : (_ = p = void 0, A);
    }
    function x() {
      I !== void 0 && clearTimeout(I), b = 0, _ = S = p = I = void 0;
    }
    function v() {
      return I === void 0 ? A : M(e());
    }
    function N() {
      var C = e(), F = R(C);
      if (_ = arguments, p = this, S = C, F) {
        if (I === void 0)
          return D(S);
        if (g)
          return clearTimeout(I), I = setTimeout(j, l), q(S);
      }
      return I === void 0 && (I = setTimeout(j, l)), A;
    }
    return N.cancel = x, N.flush = v, N;
  }
  return ze = s, ze;
}
var qs = bs();
const Ss = /* @__PURE__ */ Kt(qs);
var Ve, Rn;
function Si() {
  if (Rn) return Ve;
  Rn = 1;
  var r = ue(), e = ge(), t = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function s(u) {
    if (!e(u))
      return !1;
    var l = r(u);
    return l == n || l == a || l == t || l == i;
  }
  return Ve = s, Ve;
}
var $e, Cn;
function Ts() {
  if (Cn) return $e;
  Cn = 1;
  var r = U(), e = r["__core-js_shared__"];
  return $e = e, $e;
}
var Je, An;
function Rs() {
  if (An) return Je;
  An = 1;
  var r = Ts(), e = (function() {
    var n = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function t(n) {
    return !!e && e in n;
  }
  return Je = t, Je;
}
var Xe, wn;
function Ti() {
  if (wn) return Xe;
  wn = 1;
  var r = Function.prototype, e = r.toString;
  function t(n) {
    if (n != null) {
      try {
        return e.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return Xe = t, Xe;
}
var Ye, In;
function Cs() {
  if (In) return Ye;
  In = 1;
  var r = Si(), e = Rs(), t = ge(), n = Ti(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, s = Function.prototype, u = Object.prototype, l = s.toString, c = u.hasOwnProperty, _ = RegExp(
    "^" + l.call(c).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function p(w) {
    if (!t(w) || e(w))
      return !1;
    var A = r(w) ? _ : i;
    return A.test(n(w));
  }
  return Ye = p, Ye;
}
var Ze, On;
function As() {
  if (On) return Ze;
  On = 1;
  function r(e, t) {
    return e == null ? void 0 : e[t];
  }
  return Ze = r, Ze;
}
var Qe, mn;
function J() {
  if (mn) return Qe;
  mn = 1;
  var r = Cs(), e = As();
  function t(n, a) {
    var i = e(n, a);
    return r(i) ? i : void 0;
  }
  return Qe = t, Qe;
}
var er, En;
function ye() {
  if (En) return er;
  En = 1;
  var r = J(), e = r(Object, "create");
  return er = e, er;
}
var rr, Mn;
function ws() {
  if (Mn) return rr;
  Mn = 1;
  var r = ye();
  function e() {
    this.__data__ = r ? r(null) : {}, this.size = 0;
  }
  return rr = e, rr;
}
var tr, jn;
function Is() {
  if (jn) return tr;
  jn = 1;
  function r(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  return tr = r, tr;
}
var nr, Dn;
function Os() {
  if (Dn) return nr;
  Dn = 1;
  var r = ye(), e = "__lodash_hash_undefined__", t = Object.prototype, n = t.hasOwnProperty;
  function a(i) {
    var s = this.__data__;
    if (r) {
      var u = s[i];
      return u === e ? void 0 : u;
    }
    return n.call(s, i) ? s[i] : void 0;
  }
  return nr = a, nr;
}
var ar, xn;
function ms() {
  if (xn) return ar;
  xn = 1;
  var r = ye(), e = Object.prototype, t = e.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return r ? i[a] !== void 0 : t.call(i, a);
  }
  return ar = n, ar;
}
var ir, Pn;
function Es() {
  if (Pn) return ir;
  Pn = 1;
  var r = ye(), e = "__lodash_hash_undefined__";
  function t(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = r && a === void 0 ? e : a, this;
  }
  return ir = t, ir;
}
var sr, Ln;
function Ms() {
  if (Ln) return sr;
  Ln = 1;
  var r = ws(), e = Is(), t = Os(), n = ms(), a = Es();
  function i(s) {
    var u = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++u < l; ) {
      var c = s[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = r, i.prototype.delete = e, i.prototype.get = t, i.prototype.has = n, i.prototype.set = a, sr = i, sr;
}
var ur, Nn;
function js() {
  if (Nn) return ur;
  Nn = 1;
  function r() {
    this.__data__ = [], this.size = 0;
  }
  return ur = r, ur;
}
var or, Gn;
function Ri() {
  if (Gn) return or;
  Gn = 1;
  function r(e, t) {
    return e === t || e !== e && t !== t;
  }
  return or = r, or;
}
var cr, Fn;
function be() {
  if (Fn) return cr;
  Fn = 1;
  var r = Ri();
  function e(t, n) {
    for (var a = t.length; a--; )
      if (r(t[a][0], n))
        return a;
    return -1;
  }
  return cr = e, cr;
}
var fr, Hn;
function Ds() {
  if (Hn) return fr;
  Hn = 1;
  var r = be(), e = Array.prototype, t = e.splice;
  function n(a) {
    var i = this.__data__, s = r(i, a);
    if (s < 0)
      return !1;
    var u = i.length - 1;
    return s == u ? i.pop() : t.call(i, s, 1), --this.size, !0;
  }
  return fr = n, fr;
}
var lr, Kn;
function xs() {
  if (Kn) return lr;
  Kn = 1;
  var r = be();
  function e(t) {
    var n = this.__data__, a = r(n, t);
    return a < 0 ? void 0 : n[a][1];
  }
  return lr = e, lr;
}
var dr, kn;
function Ps() {
  if (kn) return dr;
  kn = 1;
  var r = be();
  function e(t) {
    return r(this.__data__, t) > -1;
  }
  return dr = e, dr;
}
var vr, Un;
function Ls() {
  if (Un) return vr;
  Un = 1;
  var r = be();
  function e(t, n) {
    var a = this.__data__, i = r(a, t);
    return i < 0 ? (++this.size, a.push([t, n])) : a[i][1] = n, this;
  }
  return vr = e, vr;
}
var _r, Wn;
function qe() {
  if (Wn) return _r;
  Wn = 1;
  var r = js(), e = Ds(), t = xs(), n = Ps(), a = Ls();
  function i(s) {
    var u = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++u < l; ) {
      var c = s[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = r, i.prototype.delete = e, i.prototype.get = t, i.prototype.has = n, i.prototype.set = a, _r = i, _r;
}
var hr, Bn;
function kt() {
  if (Bn) return hr;
  Bn = 1;
  var r = J(), e = U(), t = r(e, "Map");
  return hr = t, hr;
}
var gr, zn;
function Ns() {
  if (zn) return gr;
  zn = 1;
  var r = Ms(), e = qe(), t = kt();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new r(),
      map: new (t || e)(),
      string: new r()
    };
  }
  return gr = n, gr;
}
var pr, Vn;
function Gs() {
  if (Vn) return pr;
  Vn = 1;
  function r(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
  }
  return pr = r, pr;
}
var yr, $n;
function Se() {
  if ($n) return yr;
  $n = 1;
  var r = Gs();
  function e(t, n) {
    var a = t.__data__;
    return r(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return yr = e, yr;
}
var br, Jn;
function Fs() {
  if (Jn) return br;
  Jn = 1;
  var r = Se();
  function e(t) {
    var n = r(this, t).delete(t);
    return this.size -= n ? 1 : 0, n;
  }
  return br = e, br;
}
var qr, Xn;
function Hs() {
  if (Xn) return qr;
  Xn = 1;
  var r = Se();
  function e(t) {
    return r(this, t).get(t);
  }
  return qr = e, qr;
}
var Sr, Yn;
function Ks() {
  if (Yn) return Sr;
  Yn = 1;
  var r = Se();
  function e(t) {
    return r(this, t).has(t);
  }
  return Sr = e, Sr;
}
var Tr, Zn;
function ks() {
  if (Zn) return Tr;
  Zn = 1;
  var r = Se();
  function e(t, n) {
    var a = r(this, t), i = a.size;
    return a.set(t, n), this.size += a.size == i ? 0 : 1, this;
  }
  return Tr = e, Tr;
}
var Rr, Qn;
function Ci() {
  if (Qn) return Rr;
  Qn = 1;
  var r = Ns(), e = Fs(), t = Hs(), n = Ks(), a = ks();
  function i(s) {
    var u = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++u < l; ) {
      var c = s[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = r, i.prototype.delete = e, i.prototype.get = t, i.prototype.has = n, i.prototype.set = a, Rr = i, Rr;
}
var Cr, ea;
function Us() {
  if (ea) return Cr;
  ea = 1;
  var r = "__lodash_hash_undefined__";
  function e(t) {
    return this.__data__.set(t, r), this;
  }
  return Cr = e, Cr;
}
var Ar, ra;
function Ws() {
  if (ra) return Ar;
  ra = 1;
  function r(e) {
    return this.__data__.has(e);
  }
  return Ar = r, Ar;
}
var wr, ta;
function Ai() {
  if (ta) return wr;
  ta = 1;
  var r = Ci(), e = Us(), t = Ws();
  function n(a) {
    var i = -1, s = a == null ? 0 : a.length;
    for (this.__data__ = new r(); ++i < s; )
      this.add(a[i]);
  }
  return n.prototype.add = n.prototype.push = e, n.prototype.has = t, wr = n, wr;
}
var Ir, na;
function Bs() {
  if (na) return Ir;
  na = 1;
  function r(e, t, n, a) {
    for (var i = e.length, s = n + (a ? 1 : -1); a ? s-- : ++s < i; )
      if (t(e[s], s, e))
        return s;
    return -1;
  }
  return Ir = r, Ir;
}
var Or, aa;
function zs() {
  if (aa) return Or;
  aa = 1;
  function r(e) {
    return e !== e;
  }
  return Or = r, Or;
}
var mr, ia;
function Vs() {
  if (ia) return mr;
  ia = 1;
  function r(e, t, n) {
    for (var a = n - 1, i = e.length; ++a < i; )
      if (e[a] === t)
        return a;
    return -1;
  }
  return mr = r, mr;
}
var Er, sa;
function $s() {
  if (sa) return Er;
  sa = 1;
  var r = Bs(), e = zs(), t = Vs();
  function n(a, i, s) {
    return i === i ? t(a, i, s) : r(a, e, s);
  }
  return Er = n, Er;
}
var Mr, ua;
function Js() {
  if (ua) return Mr;
  ua = 1;
  var r = $s();
  function e(t, n) {
    var a = t == null ? 0 : t.length;
    return !!a && r(t, n, 0) > -1;
  }
  return Mr = e, Mr;
}
var jr, oa;
function Xs() {
  if (oa) return jr;
  oa = 1;
  function r(e, t, n) {
    for (var a = -1, i = e == null ? 0 : e.length; ++a < i; )
      if (n(t, e[a]))
        return !0;
    return !1;
  }
  return jr = r, jr;
}
var Dr, ca;
function Ys() {
  if (ca) return Dr;
  ca = 1;
  function r(e, t) {
    for (var n = -1, a = e == null ? 0 : e.length, i = Array(a); ++n < a; )
      i[n] = t(e[n], n, e);
    return i;
  }
  return Dr = r, Dr;
}
var xr, fa;
function wi() {
  if (fa) return xr;
  fa = 1;
  function r(e) {
    return function(t) {
      return e(t);
    };
  }
  return xr = r, xr;
}
var Pr, la;
function Ii() {
  if (la) return Pr;
  la = 1;
  function r(e, t) {
    return e.has(t);
  }
  return Pr = r, Pr;
}
var Lr, da;
function Zs() {
  if (da) return Lr;
  da = 1;
  var r = Ai(), e = Js(), t = Xs(), n = Ys(), a = wi(), i = Ii(), s = 200;
  function u(l, c, _, p) {
    var w = -1, A = e, I = !0, S = l.length, b = [], T = c.length;
    if (!S)
      return b;
    _ && (c = n(c, a(_))), p ? (A = t, I = !1) : c.length >= s && (A = i, I = !1, c = new r(c));
    e:
      for (; ++w < S; ) {
        var g = l[w], m = _ == null ? g : _(g);
        if (g = p || g !== 0 ? g : 0, I && m === m) {
          for (var q = T; q--; )
            if (c[q] === m)
              continue e;
          b.push(g);
        } else A(c, m, p) || b.push(g);
      }
    return b;
  }
  return Lr = u, Lr;
}
var Nr, va;
function Oi() {
  if (va) return Nr;
  va = 1;
  function r(e, t) {
    for (var n = -1, a = t.length, i = e.length; ++n < a; )
      e[i + n] = t[n];
    return e;
  }
  return Nr = r, Nr;
}
var Gr, _a;
function Qs() {
  if (_a) return Gr;
  _a = 1;
  var r = ue(), e = Q(), t = "[object Arguments]";
  function n(a) {
    return e(a) && r(a) == t;
  }
  return Gr = n, Gr;
}
var Fr, ha;
function mi() {
  if (ha) return Fr;
  ha = 1;
  var r = Qs(), e = Q(), t = Object.prototype, n = t.hasOwnProperty, a = t.propertyIsEnumerable, i = r(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? r : function(s) {
    return e(s) && n.call(s, "callee") && !a.call(s, "callee");
  };
  return Fr = i, Fr;
}
var Hr, ga;
function Te() {
  if (ga) return Hr;
  ga = 1;
  var r = Array.isArray;
  return Hr = r, Hr;
}
var Kr, pa;
function eu() {
  if (pa) return Kr;
  pa = 1;
  var r = pe(), e = mi(), t = Te(), n = r ? r.isConcatSpreadable : void 0;
  function a(i) {
    return t(i) || e(i) || !!(n && i && i[n]);
  }
  return Kr = a, Kr;
}
var kr, ya;
function ru() {
  if (ya) return kr;
  ya = 1;
  var r = Oi(), e = eu();
  function t(n, a, i, s, u) {
    var l = -1, c = n.length;
    for (i || (i = e), u || (u = []); ++l < c; ) {
      var _ = n[l];
      a > 0 && i(_) ? a > 1 ? t(_, a - 1, i, s, u) : r(u, _) : s || (u[u.length] = _);
    }
    return u;
  }
  return kr = t, kr;
}
var Ur, ba;
function Ei() {
  if (ba) return Ur;
  ba = 1;
  function r(e) {
    return e;
  }
  return Ur = r, Ur;
}
var Wr, qa;
function tu() {
  if (qa) return Wr;
  qa = 1;
  function r(e, t, n) {
    switch (n.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, n[0]);
      case 2:
        return e.call(t, n[0], n[1]);
      case 3:
        return e.call(t, n[0], n[1], n[2]);
    }
    return e.apply(t, n);
  }
  return Wr = r, Wr;
}
var Br, Sa;
function nu() {
  if (Sa) return Br;
  Sa = 1;
  var r = tu(), e = Math.max;
  function t(n, a, i) {
    return a = e(a === void 0 ? n.length - 1 : a, 0), function() {
      for (var s = arguments, u = -1, l = e(s.length - a, 0), c = Array(l); ++u < l; )
        c[u] = s[a + u];
      u = -1;
      for (var _ = Array(a + 1); ++u < a; )
        _[u] = s[u];
      return _[a] = i(c), r(n, this, _);
    };
  }
  return Br = t, Br;
}
var zr, Ta;
function au() {
  if (Ta) return zr;
  Ta = 1;
  function r(e) {
    return function() {
      return e;
    };
  }
  return zr = r, zr;
}
var Vr, Ra;
function iu() {
  if (Ra) return Vr;
  Ra = 1;
  var r = J(), e = (function() {
    try {
      var t = r(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch {
    }
  })();
  return Vr = e, Vr;
}
var $r, Ca;
function su() {
  if (Ca) return $r;
  Ca = 1;
  var r = au(), e = iu(), t = Ei(), n = e ? function(a, i) {
    return e(a, "toString", {
      configurable: !0,
      enumerable: !1,
      value: r(i),
      writable: !0
    });
  } : t;
  return $r = n, $r;
}
var Jr, Aa;
function uu() {
  if (Aa) return Jr;
  Aa = 1;
  var r = 800, e = 16, t = Date.now;
  function n(a) {
    var i = 0, s = 0;
    return function() {
      var u = t(), l = e - (u - s);
      if (s = u, l > 0) {
        if (++i >= r)
          return arguments[0];
      } else
        i = 0;
      return a.apply(void 0, arguments);
    };
  }
  return Jr = n, Jr;
}
var Xr, wa;
function ou() {
  if (wa) return Xr;
  wa = 1;
  var r = su(), e = uu(), t = e(r);
  return Xr = t, Xr;
}
var Yr, Ia;
function cu() {
  if (Ia) return Yr;
  Ia = 1;
  var r = Ei(), e = nu(), t = ou();
  function n(a, i) {
    return t(e(a, i, r), a + "");
  }
  return Yr = n, Yr;
}
var Zr, Oa;
function Mi() {
  if (Oa) return Zr;
  Oa = 1;
  var r = 9007199254740991;
  function e(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= r;
  }
  return Zr = e, Zr;
}
var Qr, ma;
function ji() {
  if (ma) return Qr;
  ma = 1;
  var r = Si(), e = Mi();
  function t(n) {
    return n != null && e(n.length) && !r(n);
  }
  return Qr = t, Qr;
}
var et, Ea;
function fu() {
  if (Ea) return et;
  Ea = 1;
  var r = ji(), e = Q();
  function t(n) {
    return e(n) && r(n);
  }
  return et = t, et;
}
var rt, Ma;
function lu() {
  if (Ma) return rt;
  Ma = 1;
  function r(e) {
    var t = e == null ? 0 : e.length;
    return t ? e[t - 1] : void 0;
  }
  return rt = r, rt;
}
var tt, ja;
function du() {
  if (ja) return tt;
  ja = 1;
  var r = Zs(), e = ru(), t = cu(), n = fu(), a = lu(), i = t(function(s, u) {
    var l = a(u);
    return n(l) && (l = void 0), n(s) ? r(s, e(u, 1, n, !0), void 0, l) : [];
  });
  return tt = i, tt;
}
var vu = du();
const Da = /* @__PURE__ */ Kt(vu);
var nt, xa;
function _u() {
  if (xa) return nt;
  xa = 1;
  var r = qe();
  function e() {
    this.__data__ = new r(), this.size = 0;
  }
  return nt = e, nt;
}
var at, Pa;
function hu() {
  if (Pa) return at;
  Pa = 1;
  function r(e) {
    var t = this.__data__, n = t.delete(e);
    return this.size = t.size, n;
  }
  return at = r, at;
}
var it, La;
function gu() {
  if (La) return it;
  La = 1;
  function r(e) {
    return this.__data__.get(e);
  }
  return it = r, it;
}
var st, Na;
function pu() {
  if (Na) return st;
  Na = 1;
  function r(e) {
    return this.__data__.has(e);
  }
  return st = r, st;
}
var ut, Ga;
function yu() {
  if (Ga) return ut;
  Ga = 1;
  var r = qe(), e = kt(), t = Ci(), n = 200;
  function a(i, s) {
    var u = this.__data__;
    if (u instanceof r) {
      var l = u.__data__;
      if (!e || l.length < n - 1)
        return l.push([i, s]), this.size = ++u.size, this;
      u = this.__data__ = new t(l);
    }
    return u.set(i, s), this.size = u.size, this;
  }
  return ut = a, ut;
}
var ot, Fa;
function bu() {
  if (Fa) return ot;
  Fa = 1;
  var r = qe(), e = _u(), t = hu(), n = gu(), a = pu(), i = yu();
  function s(u) {
    var l = this.__data__ = new r(u);
    this.size = l.size;
  }
  return s.prototype.clear = e, s.prototype.delete = t, s.prototype.get = n, s.prototype.has = a, s.prototype.set = i, ot = s, ot;
}
var ct, Ha;
function qu() {
  if (Ha) return ct;
  Ha = 1;
  function r(e, t) {
    for (var n = -1, a = e == null ? 0 : e.length; ++n < a; )
      if (t(e[n], n, e))
        return !0;
    return !1;
  }
  return ct = r, ct;
}
var ft, Ka;
function Di() {
  if (Ka) return ft;
  Ka = 1;
  var r = Ai(), e = qu(), t = Ii(), n = 1, a = 2;
  function i(s, u, l, c, _, p) {
    var w = l & n, A = s.length, I = u.length;
    if (A != I && !(w && I > A))
      return !1;
    var S = p.get(s), b = p.get(u);
    if (S && b)
      return S == u && b == s;
    var T = -1, g = !0, m = l & a ? new r() : void 0;
    for (p.set(s, u), p.set(u, s); ++T < A; ) {
      var q = s[T], D = u[T];
      if (c)
        var o = w ? c(D, q, T, u, s, p) : c(q, D, T, s, u, p);
      if (o !== void 0) {
        if (o)
          continue;
        g = !1;
        break;
      }
      if (m) {
        if (!e(u, function(R, j) {
          if (!t(m, j) && (q === R || _(q, R, l, c, p)))
            return m.push(j);
        })) {
          g = !1;
          break;
        }
      } else if (!(q === D || _(q, D, l, c, p))) {
        g = !1;
        break;
      }
    }
    return p.delete(s), p.delete(u), g;
  }
  return ft = i, ft;
}
var lt, ka;
function Su() {
  if (ka) return lt;
  ka = 1;
  var r = U(), e = r.Uint8Array;
  return lt = e, lt;
}
var dt, Ua;
function Tu() {
  if (Ua) return dt;
  Ua = 1;
  function r(e) {
    var t = -1, n = Array(e.size);
    return e.forEach(function(a, i) {
      n[++t] = [i, a];
    }), n;
  }
  return dt = r, dt;
}
var vt, Wa;
function Ru() {
  if (Wa) return vt;
  Wa = 1;
  function r(e) {
    var t = -1, n = Array(e.size);
    return e.forEach(function(a) {
      n[++t] = a;
    }), n;
  }
  return vt = r, vt;
}
var _t, Ba;
function Cu() {
  if (Ba) return _t;
  Ba = 1;
  var r = pe(), e = Su(), t = Ri(), n = Di(), a = Tu(), i = Ru(), s = 1, u = 2, l = "[object Boolean]", c = "[object Date]", _ = "[object Error]", p = "[object Map]", w = "[object Number]", A = "[object RegExp]", I = "[object Set]", S = "[object String]", b = "[object Symbol]", T = "[object ArrayBuffer]", g = "[object DataView]", m = r ? r.prototype : void 0, q = m ? m.valueOf : void 0;
  function D(o, R, j, M, x, v, N) {
    switch (j) {
      case g:
        if (o.byteLength != R.byteLength || o.byteOffset != R.byteOffset)
          return !1;
        o = o.buffer, R = R.buffer;
      case T:
        return !(o.byteLength != R.byteLength || !v(new e(o), new e(R)));
      case l:
      case c:
      case w:
        return t(+o, +R);
      case _:
        return o.name == R.name && o.message == R.message;
      case A:
      case S:
        return o == R + "";
      case p:
        var C = a;
      case I:
        var F = M & s;
        if (C || (C = i), o.size != R.size && !F)
          return !1;
        var K = N.get(o);
        if (K)
          return K == R;
        M |= u, N.set(o, R);
        var z = n(C(o), C(R), M, x, v, N);
        return N.delete(o), z;
      case b:
        if (q)
          return q.call(o) == q.call(R);
    }
    return !1;
  }
  return _t = D, _t;
}
var ht, za;
function Au() {
  if (za) return ht;
  za = 1;
  var r = Oi(), e = Te();
  function t(n, a, i) {
    var s = a(n);
    return e(n) ? s : r(s, i(n));
  }
  return ht = t, ht;
}
var gt, Va;
function wu() {
  if (Va) return gt;
  Va = 1;
  function r(e, t) {
    for (var n = -1, a = e == null ? 0 : e.length, i = 0, s = []; ++n < a; ) {
      var u = e[n];
      t(u, n, e) && (s[i++] = u);
    }
    return s;
  }
  return gt = r, gt;
}
var pt, $a;
function Iu() {
  if ($a) return pt;
  $a = 1;
  function r() {
    return [];
  }
  return pt = r, pt;
}
var yt, Ja;
function Ou() {
  if (Ja) return yt;
  Ja = 1;
  var r = wu(), e = Iu(), t = Object.prototype, n = t.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(s) {
    return s == null ? [] : (s = Object(s), r(a(s), function(u) {
      return n.call(s, u);
    }));
  } : e;
  return yt = i, yt;
}
var bt, Xa;
function mu() {
  if (Xa) return bt;
  Xa = 1;
  function r(e, t) {
    for (var n = -1, a = Array(e); ++n < e; )
      a[n] = t(n);
    return a;
  }
  return bt = r, bt;
}
var ie = { exports: {} }, qt, Ya;
function Eu() {
  if (Ya) return qt;
  Ya = 1;
  function r() {
    return !1;
  }
  return qt = r, qt;
}
ie.exports;
var Za;
function xi() {
  return Za || (Za = 1, (function(r, e) {
    var t = U(), n = Eu(), a = e && !e.nodeType && e, i = a && !0 && r && !r.nodeType && r, s = i && i.exports === a, u = s ? t.Buffer : void 0, l = u ? u.isBuffer : void 0, c = l || n;
    r.exports = c;
  })(ie, ie.exports)), ie.exports;
}
var St, Qa;
function Mu() {
  if (Qa) return St;
  Qa = 1;
  var r = 9007199254740991, e = /^(?:0|[1-9]\d*)$/;
  function t(n, a) {
    var i = typeof n;
    return a = a ?? r, !!a && (i == "number" || i != "symbol" && e.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return St = t, St;
}
var Tt, ei;
function ju() {
  if (ei) return Tt;
  ei = 1;
  var r = ue(), e = Mi(), t = Q(), n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", s = "[object Date]", u = "[object Error]", l = "[object Function]", c = "[object Map]", _ = "[object Number]", p = "[object Object]", w = "[object RegExp]", A = "[object Set]", I = "[object String]", S = "[object WeakMap]", b = "[object ArrayBuffer]", T = "[object DataView]", g = "[object Float32Array]", m = "[object Float64Array]", q = "[object Int8Array]", D = "[object Int16Array]", o = "[object Int32Array]", R = "[object Uint8Array]", j = "[object Uint8ClampedArray]", M = "[object Uint16Array]", x = "[object Uint32Array]", v = {};
  v[g] = v[m] = v[q] = v[D] = v[o] = v[R] = v[j] = v[M] = v[x] = !0, v[n] = v[a] = v[b] = v[i] = v[T] = v[s] = v[u] = v[l] = v[c] = v[_] = v[p] = v[w] = v[A] = v[I] = v[S] = !1;
  function N(C) {
    return t(C) && e(C.length) && !!v[r(C)];
  }
  return Tt = N, Tt;
}
var se = { exports: {} };
se.exports;
var ri;
function Du() {
  return ri || (ri = 1, (function(r, e) {
    var t = qi(), n = e && !e.nodeType && e, a = n && !0 && r && !r.nodeType && r, i = a && a.exports === n, s = i && t.process, u = (function() {
      try {
        var l = a && a.require && a.require("util").types;
        return l || s && s.binding && s.binding("util");
      } catch {
      }
    })();
    r.exports = u;
  })(se, se.exports)), se.exports;
}
var Rt, ti;
function Pi() {
  if (ti) return Rt;
  ti = 1;
  var r = ju(), e = wi(), t = Du(), n = t && t.isTypedArray, a = n ? e(n) : r;
  return Rt = a, Rt;
}
var Ct, ni;
function xu() {
  if (ni) return Ct;
  ni = 1;
  var r = mu(), e = mi(), t = Te(), n = xi(), a = Mu(), i = Pi(), s = Object.prototype, u = s.hasOwnProperty;
  function l(c, _) {
    var p = t(c), w = !p && e(c), A = !p && !w && n(c), I = !p && !w && !A && i(c), S = p || w || A || I, b = S ? r(c.length, String) : [], T = b.length;
    for (var g in c)
      (_ || u.call(c, g)) && !(S && // Safari 9 has enumerable `arguments.length` in strict mode.
      (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      A && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      I && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
      a(g, T))) && b.push(g);
    return b;
  }
  return Ct = l, Ct;
}
var At, ai;
function Pu() {
  if (ai) return At;
  ai = 1;
  var r = Object.prototype;
  function e(t) {
    var n = t && t.constructor, a = typeof n == "function" && n.prototype || r;
    return t === a;
  }
  return At = e, At;
}
var wt, ii;
function Lu() {
  if (ii) return wt;
  ii = 1;
  function r(e, t) {
    return function(n) {
      return e(t(n));
    };
  }
  return wt = r, wt;
}
var It, si;
function Nu() {
  if (si) return It;
  si = 1;
  var r = Lu(), e = r(Object.keys, Object);
  return It = e, It;
}
var Ot, ui;
function Gu() {
  if (ui) return Ot;
  ui = 1;
  var r = Pu(), e = Nu(), t = Object.prototype, n = t.hasOwnProperty;
  function a(i) {
    if (!r(i))
      return e(i);
    var s = [];
    for (var u in Object(i))
      n.call(i, u) && u != "constructor" && s.push(u);
    return s;
  }
  return Ot = a, Ot;
}
var mt, oi;
function Fu() {
  if (oi) return mt;
  oi = 1;
  var r = xu(), e = Gu(), t = ji();
  function n(a) {
    return t(a) ? r(a) : e(a);
  }
  return mt = n, mt;
}
var Et, ci;
function Hu() {
  if (ci) return Et;
  ci = 1;
  var r = Au(), e = Ou(), t = Fu();
  function n(a) {
    return r(a, t, e);
  }
  return Et = n, Et;
}
var Mt, fi;
function Ku() {
  if (fi) return Mt;
  fi = 1;
  var r = Hu(), e = 1, t = Object.prototype, n = t.hasOwnProperty;
  function a(i, s, u, l, c, _) {
    var p = u & e, w = r(i), A = w.length, I = r(s), S = I.length;
    if (A != S && !p)
      return !1;
    for (var b = A; b--; ) {
      var T = w[b];
      if (!(p ? T in s : n.call(s, T)))
        return !1;
    }
    var g = _.get(i), m = _.get(s);
    if (g && m)
      return g == s && m == i;
    var q = !0;
    _.set(i, s), _.set(s, i);
    for (var D = p; ++b < A; ) {
      T = w[b];
      var o = i[T], R = s[T];
      if (l)
        var j = p ? l(R, o, T, s, i, _) : l(o, R, T, i, s, _);
      if (!(j === void 0 ? o === R || c(o, R, u, l, _) : j)) {
        q = !1;
        break;
      }
      D || (D = T == "constructor");
    }
    if (q && !D) {
      var M = i.constructor, x = s.constructor;
      M != x && "constructor" in i && "constructor" in s && !(typeof M == "function" && M instanceof M && typeof x == "function" && x instanceof x) && (q = !1);
    }
    return _.delete(i), _.delete(s), q;
  }
  return Mt = a, Mt;
}
var jt, li;
function ku() {
  if (li) return jt;
  li = 1;
  var r = J(), e = U(), t = r(e, "DataView");
  return jt = t, jt;
}
var Dt, di;
function Uu() {
  if (di) return Dt;
  di = 1;
  var r = J(), e = U(), t = r(e, "Promise");
  return Dt = t, Dt;
}
var xt, vi;
function Wu() {
  if (vi) return xt;
  vi = 1;
  var r = J(), e = U(), t = r(e, "Set");
  return xt = t, xt;
}
var Pt, _i;
function Bu() {
  if (_i) return Pt;
  _i = 1;
  var r = J(), e = U(), t = r(e, "WeakMap");
  return Pt = t, Pt;
}
var Lt, hi;
function zu() {
  if (hi) return Lt;
  hi = 1;
  var r = ku(), e = kt(), t = Uu(), n = Wu(), a = Bu(), i = ue(), s = Ti(), u = "[object Map]", l = "[object Object]", c = "[object Promise]", _ = "[object Set]", p = "[object WeakMap]", w = "[object DataView]", A = s(r), I = s(e), S = s(t), b = s(n), T = s(a), g = i;
  return (r && g(new r(new ArrayBuffer(1))) != w || e && g(new e()) != u || t && g(t.resolve()) != c || n && g(new n()) != _ || a && g(new a()) != p) && (g = function(m) {
    var q = i(m), D = q == l ? m.constructor : void 0, o = D ? s(D) : "";
    if (o)
      switch (o) {
        case A:
          return w;
        case I:
          return u;
        case S:
          return c;
        case b:
          return _;
        case T:
          return p;
      }
    return q;
  }), Lt = g, Lt;
}
var Nt, gi;
function Vu() {
  if (gi) return Nt;
  gi = 1;
  var r = bu(), e = Di(), t = Cu(), n = Ku(), a = zu(), i = Te(), s = xi(), u = Pi(), l = 1, c = "[object Arguments]", _ = "[object Array]", p = "[object Object]", w = Object.prototype, A = w.hasOwnProperty;
  function I(S, b, T, g, m, q) {
    var D = i(S), o = i(b), R = D ? _ : a(S), j = o ? _ : a(b);
    R = R == c ? p : R, j = j == c ? p : j;
    var M = R == p, x = j == p, v = R == j;
    if (v && s(S)) {
      if (!s(b))
        return !1;
      D = !0, M = !1;
    }
    if (v && !M)
      return q || (q = new r()), D || u(S) ? e(S, b, T, g, m, q) : t(S, b, R, T, g, m, q);
    if (!(T & l)) {
      var N = M && A.call(S, "__wrapped__"), C = x && A.call(b, "__wrapped__");
      if (N || C) {
        var F = N ? S.value() : S, K = C ? b.value() : b;
        return q || (q = new r()), m(F, K, T, g, q);
      }
    }
    return v ? (q || (q = new r()), n(S, b, T, g, m, q)) : !1;
  }
  return Nt = I, Nt;
}
var Gt, pi;
function $u() {
  if (pi) return Gt;
  pi = 1;
  var r = Vu(), e = Q();
  function t(n, a, i, s, u) {
    return n === a ? !0 : n == null || a == null || !e(n) && !e(a) ? n !== n && a !== a : r(n, a, i, s, t, u);
  }
  return Gt = t, Gt;
}
var Ft, yi;
function Ju() {
  if (yi) return Ft;
  yi = 1;
  var r = $u();
  function e(t, n) {
    return r(t, n);
  }
  return Ft = e, Ft;
}
var Xu = Ju();
const _e = /* @__PURE__ */ Kt(Xu), Yu = (r) => r.map(({ field: t, sort: n }) => ({
  field: t,
  order: n || "asc"
})), Zu = (r) => r.map(({ field: t, order: n }) => ({
  field: t,
  sort: n
})), Qu = (r) => {
  if (!r)
    return "eq";
  switch (r) {
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
      return r;
  }
}, eo = ({
  items: r,
  logicOperator: e
}) => {
  const t = r.map(({ field: n, value: a, operator: i }) => ({
    field: n,
    value: ["isEmpty", "isNotEmpty"].includes(i) ? !0 : a ?? "",
    operator: Qu(i)
  }));
  return e === Ht.Or ? [{ operator: "or", value: t }] : t;
}, bi = (r, e) => {
  switch (e) {
    case "number":
      switch (r) {
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
          return r;
      }
    case "singleSelect":
    case "boolean":
      switch (r) {
        case "eq":
          return "is";
        default:
          return r;
      }
    case void 0:
    case "string":
      switch (r) {
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
          return r;
      }
    case "date":
    case "dateTime":
      switch (r) {
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
          return r;
      }
    default:
      return r;
  }
}, ro = (r, e) => {
  var a;
  const t = [], n = r.some(
    (i) => i.operator === "or"
  );
  return e && (n ? ((a = r.find(
    (s) => s.operator === "or"
  )) == null ? void 0 : a.value).map(({ field: s, value: u, operator: l }) => {
    const c = e[s];
    t.push({
      field: s,
      operator: bi(l, c),
      value: u === "" ? void 0 : u,
      id: s + l
    });
  }) : r.map(({ field: i, value: s, operator: u }) => {
    const l = e[i];
    t.push({
      field: i,
      operator: bi(u, l),
      value: s === "" ? void 0 : s,
      id: i + u
    });
  })), {
    items: t,
    // If there is "or" filter, default link operator is "or"
    logicOperator: n ? Ht.Or : Ht.And
  };
};
function so() {
  return {
    // Create an accessor field with direct key
    accessor: (r, e) => ({
      accessorKey: r,
      ...e,
      type: (e == null ? void 0 : e.type) || "string"
    }),
    // Create an accessor field with a function
    accessorFn: (r, e) => ({
      accessorFn: r,
      ...e,
      type: e.type || "string"
    }),
    // Create a display-only field (no data model)
    display: (r) => ({
      ...r,
      type: "display"
    }),
    // Create a group field
    group: (r) => ({
      ...r,
      type: "group"
    })
  };
}
function to(r, e) {
  if ("accessorKey" in r)
    return e[r.accessorKey];
  if ("accessorFn" in r)
    return r.accessorFn(e);
  if ("fields" in r && r.fields.length > 0) {
    const t = r.fields[0];
    return to(t, e);
  }
}
function he(r) {
  return r.flatMap((e) => "fields" in e ? he(e.fields) : "accessorKey" in e || "accessorFn" in e ? [e] : []);
}
function uo({
  onSearch: r,
  pagination: e,
  filters: t,
  sorters: n,
  syncWithLocation: a,
  resource: i,
  successNotification: s,
  errorNotification: u,
  queryOptions: l,
  liveMode: c,
  onLiveEvent: _,
  liveParams: p,
  meta: w,
  dataProviderName: A,
  overtimeOptions: I,
  editable: S = !1,
  selectable: b = !1,
  rowSelection: T,
  onRowSelectionChange: g,
  enableRowSelection: m = !0,
  updateMutationOptions: q,
  deleteMutationOptions: D,
  schema: o
} = {}) {
  const R = is(c), j = on({}), { identifier: M } = ss({ resource: i }), {
    tableQuery: x,
    result: v,
    currentPage: N,
    setCurrentPage: C,
    pageSize: F,
    setPageSize: K,
    filters: z,
    setFilters: oe,
    sorters: Re,
    setSorters: Ut,
    pageCount: Li,
    createLinkForSyncWithLocation: Ni,
    overtime: Gi
  } = us({
    pagination: e,
    filters: t,
    sorters: n,
    syncWithLocation: a,
    resource: i,
    successNotification: s,
    errorNotification: u,
    queryOptions: l,
    liveMode: c,
    onLiveEvent: _,
    liveParams: p,
    meta: w,
    dataProviderName: A,
    overtimeOptions: I
  }), [Wt, Ce] = Me(z), [G, V] = Me(T || {}), [ee, re] = Me({}), Fi = on(!0), Hi = ae(() => Object.values(ee).some((f) => f.mode === de.Edit), [ee]);
  je(() => {
    T && !_e(T, G) && V(T);
  }, [T]), je(() => {
    g && g(G);
  }, [G, g]);
  const { isFetched: Bt, isLoading: zt } = x, H = ae(() => {
    var f, d;
    if (!(v != null && v.data)) return [];
    if ((d = (f = o == null ? void 0 : o.operations) == null ? void 0 : f.list) != null && d.transform)
      try {
        const y = o.operations.list.transform(v.data);
        return y instanceof Promise ? v.data : y;
      } catch (y) {
        return console.error("Error transforming rows:", y), v.data;
      }
    return v.data;
  }, [v == null ? void 0 : v.data, o]);
  je(() => {
    var f, d;
    v != null && v.data && ((d = (f = o == null ? void 0 : o.operations) == null ? void 0 : f.list) != null && d.transform) && Promise.resolve(o.operations.list.transform(v.data)).catch((h) => {
      console.error("Error in async row transformation:", h);
    });
  }, [v == null ? void 0 : v.data, o]);
  const Vt = ((t == null ? void 0 : t.mode) || "server") === "server", $t = ((n == null ? void 0 : n.mode) || "server") === "server", X = ((e == null ? void 0 : e.mode) ?? "server") !== "off", Jt = (n == null ? void 0 : n.permanent) ?? [], Xt = (t == null ? void 0 : t.permanent) ?? [], Ki = (f) => {
    X && C(f + 1);
  }, ki = (f) => {
    X && K(f);
  }, Yt = (f) => {
    const d = Yu(f);
    Ut(d);
  }, Ui = async (f) => {
    if (r) {
      const d = await r(f);
      Ce(d), oe(d.filter((y) => y.value !== "")), X && C(1);
    }
  }, Zt = () => X ? {
    paginationMode: "server",
    paginationModel: {
      page: N - 1,
      pageSize: F
    },
    onPaginationModelChange: (f) => {
      Ki(f.page), ki(f.pageSize);
    }
  } : {
    paginationMode: "client"
  }, { mutate: Wi } = os({
    mutationOptions: q
  }), { mutate: Ae } = cs(), { mutate: we } = fs({
    mutationOptions: D
  }), B = L((f) => {
    if (o != null && o.getId) {
      try {
        const d = o.getId(f);
        if (!(d instanceof Promise))
          return String(d);
      } catch (d) {
        console.error("Error getting row ID:", d);
      }
      return String(f.id);
    }
    return String(f.id);
  }, [o]), ce = L((f) => typeof m == "function" ? m(f) : m === !0, [m]), Ie = L(() => ({ rows: H.filter((d) => {
    const y = B(d);
    return G[y];
  }) }), [G, H, B]), Oe = L(() => {
    if (H.length === 0) return !1;
    const f = H.filter((y) => ce(y)), d = f.filter((y) => {
      const h = B(y);
      return G[h];
    }).length;
    return f.length > 0 && d === f.length;
  }, [G, H, ce, B]), Bi = L(() => {
    if (H.length === 0) return !1;
    const f = H.filter((d) => {
      const y = B(d);
      return G[y];
    }).length;
    return f > 0 && f < H.length;
  }, [G, H, B]), zi = L((f) => {
    if (f ?? !Oe()) {
      const y = {};
      H.forEach((h) => {
        if (ce(h)) {
          const E = B(h);
          y[E] = !0;
        }
      }), V(y);
    } else
      V({});
  }, [H, Oe, ce, B]), Vi = L(() => Object.entries(G).filter(([f, d]) => d).map(([f]) => f), [G]), $i = async (f) => {
    var E;
    if (!o)
      return { isValid: !0, errors: {} };
    const d = {};
    let y = !0;
    const h = he(o.fields);
    for (const O of h) {
      const P = "accessorKey" in O ? f[O.accessorKey] : (E = O.accessorFn) == null ? void 0 : E.call(O, f);
      if (O.required && (P == null || P === "")) {
        const W = O.id || ("accessorKey" in O ? String(O.accessorKey) : "");
        d[W] = `${W} is required`, y = !1;
        continue;
      }
      if (P !== void 0 && O.validate) {
        const W = O.id || ("accessorKey" in O ? String(O.accessorKey) : ""), k = await Promise.resolve(O.validate(P));
        k !== !0 && (d[W] = typeof k == "string" ? k : `${W} is invalid`, y = !1);
      }
    }
    return { isValid: y, errors: d };
  }, Qt = async (f) => {
    if (!o) return f;
    const d = { ...f }, y = he(o.fields);
    for (const h of y) {
      let E, O = !1;
      if ("accessorKey" in h)
        E = h.accessorKey, O = d[E] !== void 0;
      else if ("accessorFn" in h && h.id)
        E = h.id, O = d[E] !== void 0;
      else
        continue;
      if (!O && h.default !== void 0) {
        const P = typeof h.default == "function" ? await Promise.resolve(h.default()) : h.default;
        d[E] = P;
      }
    }
    return d;
  }, Ji = async (f) => {
    if (!o) return f;
    const d = { ...f }, y = he(o.fields);
    for (const h of y) {
      if (!h.transform) continue;
      let E, O;
      if ("accessorKey" in h)
        E = h.accessorKey, O = d[E];
      else if ("accessorFn" in h && h.id)
        E = h.id, O = h.accessorFn(d);
      else
        continue;
      if (O !== void 0) {
        const P = await Promise.resolve(h.transform(O));
        d[E] = P;
      }
    }
    return d;
  }, en = async (f, d) => {
    var y, h, E, O;
    if (!S)
      return Promise.resolve(d);
    if (!M)
      return Promise.reject(new Error("Resource is not defined"));
    try {
      const { isValid: P, errors: W } = await $i(f);
      if (!P)
        return Promise.reject({ validationErrors: W });
      const k = await Ji(f);
      if (f._isTrasientInFrontend) {
        const Y = { ...k };
        delete Y._isTrasientInFrontend;
        let te = Y;
        return (h = (y = o == null ? void 0 : o.operations) == null ? void 0 : y.create) != null && h.beforeCreate && (te = await Promise.resolve(o.operations.create.beforeCreate(Y))), new Promise((fe, Z) => {
          Ae(
            {
              resource: M,
              values: te
            },
            {
              onError: ($) => {
                Z($);
              },
              onSuccess: async ($) => {
                var ne, le;
                if ((le = (ne = o == null ? void 0 : o.operations) == null ? void 0 : ne.create) != null && le.afterCreate) {
                  const as = await Promise.resolve(o.operations.create.afterCreate($));
                  fe(as);
                } else
                  fe($.data);
              }
            }
          );
        });
      } else {
        let Y = k;
        return (O = (E = o == null ? void 0 : o.operations) == null ? void 0 : E.update) != null && O.beforeUpdate && (Y = await Promise.resolve(o.operations.update.beforeUpdate(k, d))), new Promise((te, fe) => {
          Wi(
            {
              resource: M,
              id: f.id,
              values: Y
            },
            {
              onError: (Z) => {
                fe(Z);
              },
              onSuccess: async (Z) => {
                var $, ne;
                if ((ne = ($ = o == null ? void 0 : o.operations) == null ? void 0 : $.update) != null && ne.afterUpdate) {
                  const le = await Promise.resolve(o.operations.update.afterUpdate(Z, d));
                  te(le);
                } else
                  te(Z.data);
              }
            }
          );
        });
      }
    } catch (P) {
      return console.error("Error updating row:", P), Promise.reject(P);
    }
  }, Xi = async () => {
    var d, y;
    const f = Vi();
    if (!(!M || f.length === 0))
      try {
        let h = f;
        if ((y = (d = o == null ? void 0 : o.operations) == null ? void 0 : d.delete) != null && y.beforeDelete && (h = await Promise.resolve(o.operations.delete.beforeDelete(h))), h.length === 0) return;
        we(
          {
            resource: M,
            ids: h
          },
          {
            onSuccess: async () => {
              var E, O;
              (O = (E = o == null ? void 0 : o.operations) == null ? void 0 : E.delete) != null && O.afterDelete && await Promise.resolve(o.operations.delete.afterDelete(h)), V({});
            }
          }
        );
      } catch (h) {
        console.error("Error deleting items:", h);
      }
  }, me = (f, d) => {
    f.reason === ls.rowFocusOut && (d.defaultMuiPrevented = !0);
  }, Yi = L((f) => () => {
    re((d) => ({
      ...d,
      [f]: { mode: de.Edit }
    }));
  }, []), Zi = L((f) => () => {
    re((d) => ({
      ...d,
      [f]: { mode: de.View }
    }));
  }, []), Qi = L((f) => () => {
    if (!M) return;
    (async () => {
      var y, h;
      try {
        let E = [String(f)];
        if ((h = (y = o == null ? void 0 : o.operations) == null ? void 0 : y.delete) != null && h.beforeDelete && (E = await Promise.resolve(o.operations.delete.beforeDelete(E))), E.length === 0) return;
        we(
          {
            resource: M,
            ids: E
          },
          {
            onSuccess: async () => {
              var O, P;
              (P = (O = o == null ? void 0 : o.operations) == null ? void 0 : O.delete) != null && P.afterDelete && await Promise.resolve(o.operations.delete.afterDelete(E)), G[String(f)] && V((W) => {
                const k = { ...W };
                return delete k[String(f)], k;
              });
            }
          }
        );
      } catch (E) {
        console.error("Error deleting item:", E);
      }
    })();
  }, [M, we, o, G]), es = L((f) => () => {
    re((y) => ({
      ...y,
      [f]: { mode: de.View, ignoreModifications: !0 }
    }));
    const d = H.find((y) => y.id === f);
    d != null && d._isTrasientInFrontend && x.refetch();
  }, [H, x]), rs = L(async () => {
    var f, d, y;
    try {
      let h = {};
      (d = (f = o == null ? void 0 : o.operations) == null ? void 0 : f.create) != null && d.defaults && (h = await Promise.resolve(o.operations.create.defaults())), o != null && o.fields && (h = await Qt(h));
      const E = (h == null ? void 0 : h.id) ?? ((y = o == null ? void 0 : o.getId) == null ? void 0 : y.call(o, h));
      Ae(
        {
          resource: M ?? "",
          values: {
            ...h,
            id: E
          }
        },
        {
          onError: (O) => {
            console.error("Error creating new row:", O);
          },
          onSuccess: () => x.refetch()
        }
      );
    } catch (h) {
      console.error("Error creating new row:", h);
    }
  }, [o, Ae, M, Qt]), rn = L(() => Object.entries(G).filter(([f, d]) => d).map(([f]) => f), [G]), tn = L((f) => {
    const d = {};
    f.forEach((y) => {
      d[String(y)] = !0;
    }), V(d);
  }, []), nn = L((f) => {
    const d = Object.fromEntries(
      Object.entries(f.columns.lookup).map(([h, E]) => [h, E.type])
    );
    !_e(d, j.current) && (j.current = d);
  }, []), Ee = L((f, d) => {
    Fi.current = !1, d.defaultMuiPrevented = !1;
  }, []), an = (t == null ? void 0 : t.debounceDelay) ?? 500, sn = ae(
    () => Ss(
      (f) => {
        const d = eo(f);
        Ce(d), oe(d.filter((y) => y.value !== "")), X && C(1);
      },
      an
    ),
    [Ce, oe, X, C, an]
  ), un = L((f) => {
    re(f);
  }, []), ts = ae(() => Ie().rows.length > 0, [Ie]), ns = ae(() => ({
    disableRowSelectionOnClick: !b,
    rows: H,
    loading: R === "auto" ? zt : !Bt,
    rowCount: (v == null ? void 0 : v.total) || 0,
    ...Zt(),
    sortingMode: $t ? "server" : "client",
    sortModel: Zu(
      Da(Re, Jt, _e)
    ),
    onSortModelChange: Yt,
    filterMode: Vt ? "server" : "client",
    filterModel: ro(
      Da(Wt, Xt, _e),
      j.current
    ),
    onFilterModelChange: sn,
    onStateChange: nn,
    processRowUpdate: S ? en : void 0,
    checkboxSelection: b,
    rowSelectionModel: rn(),
    onRowSelectionModelChange: tn,
    onCellDoubleClick: Ee,
    editMode: "row",
    rowModesModel: ee,
    onRowModesModelChange: un,
    onRowEditStop: me
  }), [
    b,
    H,
    R,
    zt,
    Bt,
    v == null ? void 0 : v.total,
    Zt,
    $t,
    Re,
    Jt,
    Yt,
    Vt,
    Wt,
    Xt,
    j.current,
    sn,
    nn,
    S,
    en,
    rn,
    tn,
    Ee,
    ee,
    un,
    me
  ]);
  return {
    query: x,
    result: v,
    tableQuery: x,
    dataGridProps: ns,
    currentPage: N,
    setCurrentPage: C,
    pageSize: F,
    setPageSize: K,
    pageCount: Li,
    sorters: Re,
    setSorters: Ut,
    filters: z,
    setFilters: oe,
    search: Ui,
    createLinkForSyncWithLocation: Ni,
    overtime: Gi,
    rowSelection: G,
    setRowSelection: V,
    getSelectedRowModel: Ie,
    getIsAllRowsSelected: Oe,
    getIsSomeRowsSelected: Bi,
    toggleAllRowsSelected: zi,
    deleteSelectedItems: Xi,
    rowModesModel: ee,
    setRowModesModel: re,
    addNewRow: rs,
    handleRowEditStop: me,
    handleEditClick: Yi,
    handleSaveClick: Zi,
    handleDeleteClick: Qi,
    handleCancelClick: es,
    handleCellDoubleClick: Ee,
    isInEditMode: Hi,
    hasSelected: ts,
    schema: o
  };
}
export {
  so as createSchemaHelper,
  he as getAllAccessorFields,
  to as getFieldValue,
  uo as useDataGrid
};
