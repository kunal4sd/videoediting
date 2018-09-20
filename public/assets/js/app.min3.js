function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

if (function(t, e) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(t, e) {
        "use strict";

        function i(t, e) {
            e = e || it;
            var i = e.createElement("script");
            i.text = t, e.head.appendChild(i).parentNode.removeChild(i)
        }

        function n(t) {
            var e = !!t && "length" in t && t.length,
                i = ft.type(t);
            return "function" !== i && !ft.isWindow(t) && ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function s(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        }

        function o(t, e, i) {
            return ft.isFunction(e) ? ft.grep(t, function(t, n) {
                return !!e.call(t, n, t) !== i
            }) : e.nodeType ? ft.grep(t, function(t) {
                return t === e !== i
            }) : "string" != typeof e ? ft.grep(t, function(t) {
                return at.call(e, t) > -1 !== i
            }) : wt.test(e) ? ft.filter(e, t, i) : (e = ft.filter(e, t), ft.grep(t, function(t) {
                return at.call(e, t) > -1 !== i && 1 === t.nodeType
            }))
        }

        function r(t, e) {
            for (;
                (t = t[e]) && 1 !== t.nodeType;);
            return t
        }

        function a(t) {
            var e = {};
            return ft.each(t.match(kt) || [], function(t, i) {
                e[i] = !0
            }), e
        }

        function l(t) {
            return t
        }

        function h(t) {
            throw t
        }

        function u(t, e, i, n) {
            var s;
            try {
                t && ft.isFunction(s = t.promise) ? s.call(t).done(e).fail(i) : t && ft.isFunction(s = t.then) ? s.call(t, e, i) : e.apply(void 0, [t].slice(n))
            } catch (t) {
                i.apply(void 0, [t])
            }
        }

        function c() {
            it.removeEventListener("DOMContentLoaded", c), t.removeEventListener("load", c), ft.ready()
        }

        function d() {
            this.expando = ft.expando + d.uid++
        }

        function p(t) {
            return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : Nt.test(t) ? JSON.parse(t) : t)
        }

        function f(t, e, i) {
            var n;
            if (void 0 === i && 1 === t.nodeType)
                if (n = "data-" + e.replace(Mt, "-$&").toLowerCase(), "string" == typeof(i = t.getAttribute(n))) {
                    try {
                        i = p(i)
                    } catch (t) {}
                    Pt.set(t, e, i)
                } else i = void 0;
            return i
        }

        function g(t, e, i, n) {
            var s, o = 1,
                r = 20,
                a = n ? function() {
                    return n.cur()
                } : function() {
                    return ft.css(t, e, "")
                },
                l = a(),
                h = i && i[3] || (ft.cssNumber[e] ? "" : "px"),
                u = (ft.cssNumber[e] || "px" !== h && +l) && Lt.exec(ft.css(t, e));
            if (u && u[3] !== h) {
                h = h || u[3], i = i || [], u = +l || 1;
                do {
                    o = o || ".5", u /= o, ft.style(t, e, u + h)
                } while (o !== (o = a() / l) && 1 !== o && --r)
            }
            return i && (u = +u || +l || 0, s = i[1] ? u + (i[1] + 1) * i[2] : +i[2], n && (n.unit = h, n.start = u, n.end = s)), s
        }

        function m(t) {
            var e, i = t.ownerDocument,
                n = t.nodeName,
                s = jt[n];
            return s || (e = i.body.appendChild(i.createElement(n)), s = ft.css(e, "display"), e.parentNode.removeChild(e), "none" === s && (s = "block"), jt[n] = s, s)
        }

        function v(t, e) {
            for (var i, n, s = [], o = 0, r = t.length; o < r; o++) n = t[o], n.style && (i = n.style.display, e ? ("none" === i && (s[o] = Ot.get(n, "display") || null, s[o] || (n.style.display = "")), "" === n.style.display && Ft(n) && (s[o] = m(n))) : "none" !== i && (s[o] = "none", Ot.set(n, "display", i)));
            for (o = 0; o < r; o++) null != s[o] && (t[o].style.display = s[o]);
            return t
        }

        function _(t, e) {
            var i;
            return i = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && s(t, e) ? ft.merge([t], i) : i
        }

        function b(t, e) {
            for (var i = 0, n = t.length; i < n; i++) Ot.set(t[i], "globalEval", !e || Ot.get(e[i], "globalEval"))
        }

        function y(t, e, i, n, s) {
            for (var o, r, a, l, h, u, c = e.createDocumentFragment(), d = [], p = 0, f = t.length; p < f; p++)
                if ((o = t[p]) || 0 === o)
                    if ("object" === ft.type(o)) ft.merge(d, o.nodeType ? [o] : o);
                    else if ($t.test(o)) {
                for (r = r || c.appendChild(e.createElement("div")), a = (Bt.exec(o) || ["", ""])[1].toLowerCase(), l = Ut[a] || Ut._default, r.innerHTML = l[1] + ft.htmlPrefilter(o) + l[2], u = l[0]; u--;) r = r.lastChild;
                ft.merge(d, r.childNodes), r = c.firstChild, r.textContent = ""
            } else d.push(e.createTextNode(o));
            for (c.textContent = "", p = 0; o = d[p++];)
                if (n && ft.inArray(o, n) > -1) s && s.push(o);
                else if (h = ft.contains(o.ownerDocument, o), r = _(c.appendChild(o), "script"), h && b(r), i)
                for (u = 0; o = r[u++];) qt.test(o.type || "") && i.push(o);
            return c
        }

        function w() {
            return !0
        }

        function x() {
            return !1
        }

        function C() {
            try {
                return it.activeElement
            } catch (t) {}
        }

        function T(t, e, i, n, s, o) {
            var r, a;
            if ("object" == typeof e) {
                "string" != typeof i && (n = n || i, i = void 0);
                for (a in e) T(t, a, i, n, e[a], o);
                return t
            }
            if (null == n && null == s ? (s = i, n = i = void 0) : null == s && ("string" == typeof i ? (s = n, n = void 0) : (s = n, n = i, i = void 0)), !1 === s) s = x;
            else if (!s) return t;
            return 1 === o && (r = s, s = function(t) {
                return ft().off(t), r.apply(this, arguments)
            }, s.guid = r.guid || (r.guid = ft.guid++)), t.each(function() {
                ft.event.add(this, e, s, n, i)
            })
        }

        function D(t, e) {
            return s(t, "table") && s(11 !== e.nodeType ? e : e.firstChild, "tr") ? ft(">tbody", t)[0] || t : t
        }

        function k(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function E(t) {
            var e = Jt.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function I(t, e) {
            var i, n, s, o, r, a, l, h;
            if (1 === e.nodeType) {
                if (Ot.hasData(t) && (o = Ot.access(t), r = Ot.set(e, o), h = o.events)) {
                    delete r.handle, r.events = {};
                    for (s in h)
                        for (i = 0, n = h[s].length; i < n; i++) ft.event.add(e, s, h[s][i])
                }
                Pt.hasData(t) && (a = Pt.access(t), l = ft.extend({}, a), Pt.set(e, l))
            }
        }

        function S(t, e) {
            var i = e.nodeName.toLowerCase();
            "input" === i && zt.test(t.type) ? e.checked = t.checked : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
        }

        function A(t, e, n, s) {
            e = ot.apply([], e);
            var o, r, a, l, h, u, c = 0,
                d = t.length,
                p = d - 1,
                f = e[0],
                g = ft.isFunction(f);
            if (g || d > 1 && "string" == typeof f && !pt.checkClone && Qt.test(f)) return t.each(function(i) {
                var o = t.eq(i);
                g && (e[0] = f.call(this, i, o.html())), A(o, e, n, s)
            });
            if (d && (o = y(e, t[0].ownerDocument, !1, t, s), r = o.firstChild, 1 === o.childNodes.length && (o = r), r || s)) {
                for (a = ft.map(_(o, "script"), k), l = a.length; c < d; c++) h = o, c !== p && (h = ft.clone(h, !0, !0), l && ft.merge(a, _(h, "script"))), n.call(t[c], h, c);
                if (l)
                    for (u = a[a.length - 1].ownerDocument, ft.map(a, E), c = 0; c < l; c++) h = a[c], qt.test(h.type || "") && !Ot.access(h, "globalEval") && ft.contains(u, h) && (h.src ? ft._evalUrl && ft._evalUrl(h.src) : i(h.textContent.replace(Zt, ""), u))
            }
            return t
        }

        function O(t, e, i) {
            for (var n, s = e ? ft.filter(e, t) : t, o = 0; null != (n = s[o]); o++) i || 1 !== n.nodeType || ft.cleanData(_(n)), n.parentNode && (i && ft.contains(n.ownerDocument, n) && b(_(n, "script")), n.parentNode.removeChild(n));
            return t
        }

        function P(t, e, i) {
            var n, s, o, r, a = t.style;
            return i = i || ie(t), i && (r = i.getPropertyValue(e) || i[e], "" !== r || ft.contains(t.ownerDocument, t) || (r = ft.style(t, e)), !pt.pixelMarginRight() && ee.test(r) && te.test(e) && (n = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = n, a.minWidth = s, a.maxWidth = o)), void 0 !== r ? r + "" : r
        }

        function N(t, e) {
            return {
                get: function() {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function M(t) {
            if (t in le) return t;
            for (var e = t[0].toUpperCase() + t.slice(1), i = ae.length; i--;)
                if ((t = ae[i] + e) in le) return t
        }

        function H(t) {
            var e = ft.cssProps[t];
            return e || (e = ft.cssProps[t] = M(t) || t), e
        }

        function L(t, e, i) {
            var n = Lt.exec(e);
            return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
        }

        function W(t, e, i, n, s) {
            var o, r = 0;
            for (o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0; o < 4; o += 2) "margin" === i && (r += ft.css(t, i + Wt[o], !0, s)), n ? ("content" === i && (r -= ft.css(t, "padding" + Wt[o], !0, s)), "margin" !== i && (r -= ft.css(t, "border" + Wt[o] + "Width", !0, s))) : (r += ft.css(t, "padding" + Wt[o], !0, s), "padding" !== i && (r += ft.css(t, "border" + Wt[o] + "Width", !0, s)));
            return r
        }

        function F(t, e, i) {
            var n, s = ie(t),
                o = P(t, e, s),
                r = "border-box" === ft.css(t, "boxSizing", !1, s);
            return ee.test(o) ? o : (n = r && (pt.boxSizingReliable() || o === t.style[e]), "auto" === o && (o = t["offset" + e[0].toUpperCase() + e.slice(1)]), (o = parseFloat(o) || 0) + W(t, e, i || (r ? "border" : "content"), n, s) + "px")
        }

        function R(t, e, i, n, s) {
            return new R.prototype.init(t, e, i, n, s)
        }

        function j() {
            ue && (!1 === it.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(j) : t.setTimeout(j, ft.fx.interval), ft.fx.tick())
        }

        function z() {
            return t.setTimeout(function() {
                he = void 0
            }), he = ft.now()
        }

        function B(t, e) {
            var i, n = 0,
                s = {
                    height: t
                };
            for (e = e ? 1 : 0; n < 4; n += 2 - e) i = Wt[n], s["margin" + i] = s["padding" + i] = t;
            return e && (s.opacity = s.width = t), s
        }

        function q(t, e, i) {
            for (var n, s = (V.tweeners[e] || []).concat(V.tweeners["*"]), o = 0, r = s.length; o < r; o++)
                if (n = s[o].call(i, e, t)) return n
        }

        function U(t, e, i) {
            var n, s, o, r, a, l, h, u, c = "width" in e || "height" in e,
                d = this,
                p = {},
                f = t.style,
                g = t.nodeType && Ft(t),
                m = Ot.get(t, "fxshow");
            i.queue || (r = ft._queueHooks(t, "fx"), null == r.unqueued && (r.unqueued = 0, a = r.empty.fire, r.empty.fire = function() {
                r.unqueued || a()
            }), r.unqueued++, d.always(function() {
                d.always(function() {
                    r.unqueued--, ft.queue(t, "fx").length || r.empty.fire()
                })
            }));
            for (n in e)
                if (s = e[n], ce.test(s)) {
                    if (delete e[n], o = o || "toggle" === s, s === (g ? "hide" : "show")) {
                        if ("show" !== s || !m || void 0 === m[n]) continue;
                        g = !0
                    }
                    p[n] = m && m[n] || ft.style(t, n)
                }
            if ((l = !ft.isEmptyObject(e)) || !ft.isEmptyObject(p)) {
                c && 1 === t.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY], h = m && m.display, null == h && (h = Ot.get(t, "display")), u = ft.css(t, "display"), "none" === u && (h ? u = h : (v([t], !0), h = t.style.display || h, u = ft.css(t, "display"), v([t]))), ("inline" === u || "inline-block" === u && null != h) && "none" === ft.css(t, "float") && (l || (d.done(function() {
                    f.display = h
                }), null == h && (u = f.display, h = "none" === u ? "" : u)), f.display = "inline-block")), i.overflow && (f.overflow = "hidden", d.always(function() {
                    f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
                })), l = !1;
                for (n in p) l || (m ? "hidden" in m && (g = m.hidden) : m = Ot.access(t, "fxshow", {
                    display: h
                }), o && (m.hidden = !g), g && v([t], !0), d.done(function() {
                    g || v([t]), Ot.remove(t, "fxshow");
                    for (n in p) ft.style(t, n, p[n])
                })), l = q(g ? m[n] : 0, n, d), n in m || (m[n] = l.start, g && (l.end = l.start, l.start = 0))
            }
        }

        function $(t, e) {
            var i, n, s, o, r;
            for (i in t)
                if (n = ft.camelCase(i), s = e[n], o = t[i], Array.isArray(o) && (s = o[1], o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), (r = ft.cssHooks[n]) && "expand" in r) {
                    o = r.expand(o), delete t[n];
                    for (i in o) i in t || (t[i] = o[i], e[i] = s)
                } else e[n] = s
        }

        function V(t, e, i) {
            var n, s, o = 0,
                r = V.prefilters.length,
                a = ft.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (s) return !1;
                    for (var e = he || z(), i = Math.max(0, h.startTime + h.duration - e), n = i / h.duration || 0, o = 1 - n, r = 0, l = h.tweens.length; r < l; r++) h.tweens[r].run(o);
                    return a.notifyWith(t, [h, o, i]), o < 1 && l ? i : (l || a.notifyWith(t, [h, 1, 0]), a.resolveWith(t, [h]), !1)
                },
                h = a.promise({
                    elem: t,
                    props: ft.extend({}, e),
                    opts: ft.extend(!0, {
                        specialEasing: {},
                        easing: ft.easing._default
                    }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: he || z(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(e, i) {
                        var n = ft.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
                        return h.tweens.push(n), n
                    },
                    stop: function(e) {
                        var i = 0,
                            n = e ? h.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; i < n; i++) h.tweens[i].run(1);
                        return e ? (a.notifyWith(t, [h, 1, 0]), a.resolveWith(t, [h, e])) : a.rejectWith(t, [h, e]), this
                    }
                }),
                u = h.props;
            for ($(u, h.opts.specialEasing); o < r; o++)
                if (n = V.prefilters[o].call(h, t, u, h.opts)) return ft.isFunction(n.stop) && (ft._queueHooks(h.elem, h.opts.queue).stop = ft.proxy(n.stop, n)), n;
            return ft.map(u, q, h), ft.isFunction(h.opts.start) && h.opts.start.call(t, h), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always), ft.fx.timer(ft.extend(l, {
                elem: t,
                anim: h,
                queue: h.opts.queue
            })), h
        }

        function Y(t) {
            return (t.match(kt) || []).join(" ")
        }

        function K(t) {
            return t.getAttribute && t.getAttribute("class") || ""
        }

        function G(t, e, i, n) {
            var s;
            if (Array.isArray(e)) ft.each(e, function(e, s) {
                i || we.test(t) ? n(t, s) : G(t + "[" + ("object" == typeof s && null != s ? e : "") + "]", s, i, n)
            });
            else if (i || "object" !== ft.type(e)) n(t, e);
            else
                for (s in e) G(t + "[" + s + "]", e[s], i, n)
        }

        function X(t) {
            return function(e, i) {
                "string" != typeof e && (i = e, e = "*");
                var n, s = 0,
                    o = e.toLowerCase().match(kt) || [];
                if (ft.isFunction(i))
                    for (; n = o[s++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
            }
        }

        function Q(t, e, i, n) {
            function s(a) {
                var l;
                return o[a] = !0, ft.each(t[a] || [], function(t, a) {
                    var h = a(e, i, n);
                    return "string" != typeof h || r || o[h] ? r ? !(l = h) : void 0 : (e.dataTypes.unshift(h), s(h), !1)
                }), l
            }
            var o = {},
                r = t === Ie;
            return s(e.dataTypes[0]) || !o["*"] && s("*")
        }

        function J(t, e) {
            var i, n, s = ft.ajaxSettings.flatOptions || {};
            for (i in e) void 0 !== e[i] && ((s[i] ? t : n || (n = {}))[i] = e[i]);
            return n && ft.extend(!0, t, n), t
        }

        function Z(t, e, i) {
            for (var n, s, o, r, a = t.contents, l = t.dataTypes;
                "*" === l[0];) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
            if (n)
                for (s in a)
                    if (a[s] && a[s].test(n)) {
                        l.unshift(s);
                        break
                    }
            if (l[0] in i) o = l[0];
            else {
                for (s in i) {
                    if (!l[0] || t.converters[s + " " + l[0]]) {
                        o = s;
                        break
                    }
                    r || (r = s)
                }
                o = o || r
            }
            if (o) return o !== l[0] && l.unshift(o), i[o]
        }

        function tt(t, e, i, n) {
            var s, o, r, a, l, h = {},
                u = t.dataTypes.slice();
            if (u[1])
                for (r in t.converters) h[r.toLowerCase()] = t.converters[r];
            for (o = u.shift(); o;)
                if (t.responseFields[o] && (i[t.responseFields[o]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = u.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (!(r = h[l + " " + o] || h["* " + o]))
                    for (s in h)
                        if (a = s.split(" "), a[1] === o && (r = h[l + " " + a[0]] || h["* " + a[0]])) {
                            !0 === r ? r = h[s] : !0 !== h[s] && (o = a[0], u.unshift(a[1]));
                            break
                        }
                if (!0 !== r)
                    if (r && t.throws) e = r(e);
                    else try {
                        e = r(e)
                    } catch (t) {
                        return {
                            state: "parsererror",
                            error: r ? t : "No conversion from " + l + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }
        var et = [],
            it = t.document,
            nt = Object.getPrototypeOf,
            st = et.slice,
            ot = et.concat,
            rt = et.push,
            at = et.indexOf,
            lt = {},
            ht = lt.toString,
            ut = lt.hasOwnProperty,
            ct = ut.toString,
            dt = ct.call(Object),
            pt = {},
            ft = function(t, e) {
                return new ft.fn.init(t, e)
            },
            gt = function(t, e) {
                return e.toUpperCase()
            };
        ft.fn = ft.prototype = {
            jquery: "3.2.1",
            constructor: ft,
            length: 0,
            toArray: function() {
                return st.call(this)
            },
            get: function(t) {
                return null == t ? st.call(this) : t < 0 ? this[t + this.length] : this[t]
            },
            pushStack: function(t) {
                var e = ft.merge(this.constructor(), t);
                return e.prevObject = this, e
            },
            each: function(t) {
                return ft.each(this, t)
            },
            map: function(t) {
                return this.pushStack(ft.map(this, function(e, i) {
                    return t.call(e, i, e)
                }))
            },
            slice: function() {
                return this.pushStack(st.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    i = +t + (t < 0 ? e : 0);
                return this.pushStack(i >= 0 && i < e ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: rt,
            sort: et.sort,
            splice: et.splice
        }, ft.extend = ft.fn.extend = function() {
            var t, e, i, n, s, o, r = arguments[0] || {},
                a = 1,
                l = arguments.length,
                h = !1;
            for ("boolean" == typeof r && (h = r, r = arguments[a] || {}, a++), "object" == typeof r || ft.isFunction(r) || (r = {}), a === l && (r = this, a--); a < l; a++)
                if (null != (t = arguments[a]))
                    for (e in t) i = r[e], n = t[e], r !== n && (h && n && (ft.isPlainObject(n) || (s = Array.isArray(n))) ? (s ? (s = !1, o = i && Array.isArray(i) ? i : []) : o = i && ft.isPlainObject(i) ? i : {}, r[e] = ft.extend(h, o, n)) : void 0 !== n && (r[e] = n));
            return r
        }, ft.extend({
            expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isFunction: function(t) {
                return "function" === ft.type(t)
            },
            isWindow: function(t) {
                return null != t && t === t.window
            },
            isNumeric: function(t) {
                var e = ft.type(t);
                return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
            },
            isPlainObject: function(t) {
                var e, i;
                return !(!t || "[object Object]" !== ht.call(t)) && (!(e = nt(t)) || "function" == typeof(i = ut.call(e, "constructor") && e.constructor) && ct.call(i) === dt)
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? lt[ht.call(t)] || "object" : typeof t
            },
            globalEval: function(t) {
                i(t)
            },
            camelCase: function(t) {
                return t.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, gt)
            },
            each: function(t, e) {
                var i, s = 0;
                if (n(t))
                    for (i = t.length; s < i && !1 !== e.call(t[s], s, t[s]); s++);
                else
                    for (s in t)
                        if (!1 === e.call(t[s], s, t[s])) break; return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            },
            makeArray: function(t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? ft.merge(i, "string" == typeof t ? [t] : t) : rt.call(i, t)), i
            },
            inArray: function(t, e, i) {
                return null == e ? -1 : at.call(e, t, i)
            },
            merge: function(t, e) {
                for (var i = +e.length, n = 0, s = t.length; n < i; n++) t[s++] = e[n];
                return t.length = s, t
            },
            grep: function(t, e, i) {
                for (var n = [], s = 0, o = t.length, r = !i; s < o; s++) !e(t[s], s) !== r && n.push(t[s]);
                return n
            },
            map: function(t, e, i) {
                var s, o, r = 0,
                    a = [];
                if (n(t))
                    for (s = t.length; r < s; r++) null != (o = e(t[r], r, i)) && a.push(o);
                else
                    for (r in t) null != (o = e(t[r], r, i)) && a.push(o);
                return ot.apply([], a)
            },
            guid: 1,
            proxy: function(t, e) {
                var i, n, s;
                if ("string" == typeof e && (i = t[e], e = t, t = i), ft.isFunction(t)) return n = st.call(arguments, 2), s = function() {
                    return t.apply(e || this, n.concat(st.call(arguments)))
                }, s.guid = t.guid = t.guid || ft.guid++, s
            },
            now: Date.now,
            support: pt
        }), "function" == typeof Symbol && (ft.fn[Symbol.iterator] = et[Symbol.iterator]), ft.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
            lt["[object " + e + "]"] = e.toLowerCase()
        });
        var mt = function(t) {
            function e(t, e, i, n) {
                var s, o, r, a, l, u, d, p = e && e.ownerDocument,
                    f = e ? e.nodeType : 9;
                if (i = i || [], "string" != typeof t || !t || 1 !== f && 9 !== f && 11 !== f) return i;
                if (!n && ((e ? e.ownerDocument || e : R) !== O && A(e), e = e || O, N)) {
                    if (11 !== f && (l = gt.exec(t)))
                        if (s = l[1]) {
                            if (9 === f) {
                                if (!(r = e.getElementById(s))) return i;
                                if (r.id === s) return i.push(r), i
                            } else if (p && (r = p.getElementById(s)) && W(e, r) && r.id === s) return i.push(r), i
                        } else {
                            if (l[2]) return X.apply(i, e.getElementsByTagName(t)), i;
                            if ((s = l[3]) && y.getElementsByClassName && e.getElementsByClassName) return X.apply(i, e.getElementsByClassName(s)), i
                        }
                    if (y.qsa && !U[t + " "] && (!M || !M.test(t))) {
                        if (1 !== f) p = e, d = t;
                        else if ("object" !== e.nodeName.toLowerCase()) {
                            for ((a = e.getAttribute("id")) ? a = a.replace(bt, yt) : e.setAttribute("id", a = F), u = T(t), o = u.length; o--;) u[o] = "#" + a + " " + c(u[o]);
                            d = u.join(","), p = mt.test(t) && h(e.parentNode) || e
                        }
                        if (d) try {
                            return X.apply(i, p.querySelectorAll(d)), i
                        } catch (t) {} finally {
                            a === F && e.removeAttribute("id")
                        }
                    }
                }
                return k(t.replace(ot, "$1"), e, i, n)
            }

            function i() {
                function t(i, n) {
                    return e.push(i + " ") > w.cacheLength && delete t[e.shift()], t[i + " "] = n
                }
                var e = [];
                return t
            }

            function n(t) {
                return t[F] = !0, t
            }

            function s(t) {
                var e = O.createElement("fieldset");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function o(t, e) {
                for (var i = t.split("|"), n = i.length; n--;) w.attrHandle[i[n]] = e
            }

            function r(t, e) {
                var i = e && t,
                    n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                if (n) return n;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === e) return -1;
                return t ? 1 : -1
            }

            function a(t) {
                return function(e) {
                    return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && xt(e) === t : e.disabled === t : "label" in e && e.disabled === t
                }
            }

            function l(t) {
                return n(function(e) {
                    return e = +e, n(function(i, n) {
                        for (var s, o = t([], i.length, e), r = o.length; r--;) i[s = o[r]] && (i[s] = !(n[s] = i[s]))
                    })
                })
            }

            function h(t) {
                return t && void 0 !== t.getElementsByTagName && t
            }

            function u() {}

            function c(t) {
                for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
                return n
            }

            function d(t, e, i) {
                var n = e.dir,
                    s = e.next,
                    o = s || n,
                    r = i && "parentNode" === o,
                    a = z++;
                return e.first ? function(e, i, s) {
                    for (; e = e[n];)
                        if (1 === e.nodeType || r) return t(e, i, s);
                    return !1
                } : function(e, i, l) {
                    var h, u, c, d = [j, a];
                    if (l) {
                        for (; e = e[n];)
                            if ((1 === e.nodeType || r) && t(e, i, l)) return !0
                    } else
                        for (; e = e[n];)
                            if (1 === e.nodeType || r)
                                if (c = e[F] || (e[F] = {}), u = c[e.uniqueID] || (c[e.uniqueID] = {}), s && s === e.nodeName.toLowerCase()) e = e[n] || e;
                                else {
                                    if ((h = u[o]) && h[0] === j && h[1] === a) return d[2] = h[2];
                                    if (u[o] = d, d[2] = t(e, i, l)) return !0
                                } return !1
                }
            }

            function p(t) {
                return t.length > 1 ? function(e, i, n) {
                    for (var s = t.length; s--;)
                        if (!t[s](e, i, n)) return !1;
                    return !0
                } : t[0]
            }

            function f(t, i, n) {
                for (var s = 0, o = i.length; s < o; s++) e(t, i[s], n);
                return n
            }

            function g(t, e, i, n, s) {
                for (var o, r = [], a = 0, l = t.length, h = null != e; a < l; a++)(o = t[a]) && (i && !i(o, n, s) || (r.push(o), h && e.push(a)));
                return r
            }

            function m(t, e, i, s, o, r) {
                return s && !s[F] && (s = m(s)), o && !o[F] && (o = m(o, r)), n(function(n, r, a, l) {
                    var h, u, c, d = [],
                        p = [],
                        m = r.length,
                        v = n || f(e || "*", a.nodeType ? [a] : a, []),
                        _ = !t || !n && e ? v : g(v, d, t, a, l),
                        b = i ? o || (n ? t : m || s) ? [] : r : _;
                    if (i && i(_, b, a, l), s)
                        for (h = g(b, p), s(h, [], a, l), u = h.length; u--;)(c = h[u]) && (b[p[u]] = !(_[p[u]] = c));
                    if (n) {
                        if (o || t) {
                            if (o) {
                                for (h = [], u = b.length; u--;)(c = b[u]) && h.push(_[u] = c);
                                o(null, b = [], h, l)
                            }
                            for (u = b.length; u--;)(c = b[u]) && (h = o ? J(n, c) : d[u]) > -1 && (n[h] = !(r[h] = c))
                        }
                    } else b = g(b === r ? b.splice(m, b.length) : b), o ? o(null, r, b, l) : X.apply(r, b)
                })
            }

            function v(t) {
                for (var e, i, n, s = t.length, o = w.relative[t[0].type], r = o || w.relative[" "], a = o ? 1 : 0, l = d(function(t) {
                        return t === e
                    }, r, !0), h = d(function(t) {
                        return J(e, t) > -1
                    }, r, !0), u = [function(t, i, n) {
                        var s = !o && (n || i !== E) || ((e = i).nodeType ? l(t, i, n) : h(t, i, n));
                        return e = null, s
                    }]; a < s; a++)
                    if (i = w.relative[t[a].type]) u = [d(p(u), i)];
                    else {
                        if (i = w.filter[t[a].type].apply(null, t[a].matches), i[F]) {
                            for (n = ++a; n < s && !w.relative[t[n].type]; n++);
                            return m(a > 1 && p(u), a > 1 && c(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(ot, "$1"), i, a < n && v(t.slice(a, n)), n < s && v(t = t.slice(n)), n < s && c(t))
                        }
                        u.push(i)
                    }
                return p(u)
            }

            function _(t, i) {
                var s = i.length > 0,
                    o = t.length > 0,
                    r = function(n, r, a, l, h) {
                        var u, c, d, p = 0,
                            f = "0",
                            m = n && [],
                            v = [],
                            _ = E,
                            b = n || o && w.find.TAG("*", h),
                            y = j += null == _ ? 1 : Math.random() || .1,
                            x = b.length;
                        for (h && (E = r === O || r || h); f !== x && null != (u = b[f]); f++) {
                            if (o && u) {
                                for (c = 0, r || u.ownerDocument === O || (A(u), a = !N); d = t[c++];)
                                    if (d(u, r || O, a)) {
                                        l.push(u);
                                        break
                                    }
                                h && (j = y)
                            }
                            s && ((u = !d && u) && p--, n && m.push(u))
                        }
                        if (p += f, s && f !== p) {
                            for (c = 0; d = i[c++];) d(m, v, r, a);
                            if (n) {
                                if (p > 0)
                                    for (; f--;) m[f] || v[f] || (v[f] = K.call(l));
                                v = g(v)
                            }
                            X.apply(l, v), h && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                        }
                        return h && (j = y, E = _), m
                    };
                return s ? n(r) : r
            }
            var b, y, w, x, C, T, D, k, E, I, S, A, O, P, N, M, H, L, W, F = "sizzle" + 1 * new Date,
                R = t.document,
                j = 0,
                z = 0,
                B = i(),
                q = i(),
                U = i(),
                $ = function(t, e) {
                    return t === e && (S = !0), 0
                },
                V = {}.hasOwnProperty,
                Y = [],
                K = Y.pop,
                G = Y.push,
                X = Y.push,
                Q = Y.slice,
                J = function(t, e) {
                    for (var i = 0, n = t.length; i < n; i++)
                        if (t[i] === e) return i;
                    return -1
                },
                Z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                tt = "[\\x20\\t\\r\\n\\f]",
                et = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                it = "\\[" + tt + "*(" + et + ")(?:" + tt + "*([*^$|!~]?=)" + tt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + et + "))|)" + tt + "*\\]",
                nt = ":(" + et + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + it + ")*)|.*)\\)|)",
                st = new RegExp(tt + "+", "g"),
                ot = new RegExp("^" + tt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + tt + "+$", "g"),
                rt = new RegExp("^" + tt + "*," + tt + "*"),
                at = new RegExp("^" + tt + "*([>+~]|" + tt + ")" + tt + "*"),
                lt = new RegExp("=" + tt + "*([^\\]'\"]*?)" + tt + "*\\]", "g"),
                ht = new RegExp(nt),
                ut = new RegExp("^" + et + "$"),
                ct = {
                    ID: new RegExp("^#(" + et + ")"),
                    CLASS: new RegExp("^\\.(" + et + ")"),
                    TAG: new RegExp("^(" + et + "|[*])"),
                    ATTR: new RegExp("^" + it),
                    PSEUDO: new RegExp("^" + nt),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + tt + "*(even|odd|(([+-]|)(\\d*)n|)" + tt + "*(?:([+-]|)" + tt + "*(\\d+)|))" + tt + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + Z + ")$", "i"),
                    needsContext: new RegExp("^" + tt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + tt + "*((?:-\\d)?\\d*)" + tt + "*\\)|)(?=[^-]|$)", "i")
                },
                dt = /^(?:input|select|textarea|button)$/i,
                pt = /^h\d$/i,
                ft = /^[^{]+\{\s*\[native \w/,
                gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                mt = /[+~]/,
                vt = new RegExp("\\\\([\\da-f]{1,6}" + tt + "?|(" + tt + ")|.)", "ig"),
                _t = function(t, e, i) {
                    var n = "0x" + e - 65536;
                    return n !== n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                },
                bt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                yt = function(t, e) {
                    return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
                },
                wt = function() {
                    A()
                },
                xt = d(function(t) {
                    return !0 === t.disabled && ("form" in t || "label" in t)
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                X.apply(Y = Q.call(R.childNodes), R.childNodes), Y[R.childNodes.length].nodeType
            } catch (t) {
                X = {
                    apply: Y.length ? function(t, e) {
                        G.apply(t, Q.call(e))
                    } : function(t, e) {
                        for (var i = t.length, n = 0; t[i++] = e[n++];);
                        t.length = i - 1
                    }
                }
            }
            y = e.support = {}, C = e.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, A = e.setDocument = function(t) {
                var e, i, n = t ? t.ownerDocument || t : R;
                return n !== O && 9 === n.nodeType && n.documentElement ? (O = n, P = O.documentElement, N = !C(O), R !== O && (i = O.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", wt, !1) : i.attachEvent && i.attachEvent("onunload", wt)), y.attributes = s(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), y.getElementsByTagName = s(function(t) {
                    return t.appendChild(O.createComment("")), !t.getElementsByTagName("*").length
                }), y.getElementsByClassName = ft.test(O.getElementsByClassName), y.getById = s(function(t) {
                    return P.appendChild(t).id = F, !O.getElementsByName || !O.getElementsByName(F).length
                }), y.getById ? (w.filter.ID = function(t) {
                    var e = t.replace(vt, _t);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }, w.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && N) {
                        var i = e.getElementById(t);
                        return i ? [i] : []
                    }
                }) : (w.filter.ID = function(t) {
                    var e = t.replace(vt, _t);
                    return function(t) {
                        var i = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                        return i && i.value === e
                    }
                }, w.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && N) {
                        var i, n, s, o = e.getElementById(t);
                        if (o) {
                            if ((i = o.getAttributeNode("id")) && i.value === t) return [o];
                            for (s = e.getElementsByName(t), n = 0; o = s[n++];)
                                if ((i = o.getAttributeNode("id")) && i.value === t) return [o]
                        }
                        return []
                    }
                }), w.find.TAG = y.getElementsByTagName ? function(t, e) {
                    return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : y.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var i, n = [],
                        s = 0,
                        o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; i = o[s++];) 1 === i.nodeType && n.push(i);
                        return n
                    }
                    return o
                }, w.find.CLASS = y.getElementsByClassName && function(t, e) {
                    if (void 0 !== e.getElementsByClassName && N) return e.getElementsByClassName(t)
                }, H = [], M = [], (y.qsa = ft.test(O.querySelectorAll)) && (s(function(t) {
                    P.appendChild(t).innerHTML = "<a id='" + F + "'></a><select id='" + F + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + tt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || M.push("\\[" + tt + "*(?:value|" + Z + ")"), t.querySelectorAll("[id~=" + F + "-]").length || M.push("~="), t.querySelectorAll(":checked").length || M.push(":checked"), t.querySelectorAll("a#" + F + "+*").length || M.push(".#.+[+~]")
                }), s(function(t) {
                    t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var e = O.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && M.push("name" + tt + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && M.push(":enabled", ":disabled"), P.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && M.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), M.push(",.*:")
                })), (y.matchesSelector = ft.test(L = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && s(function(t) {
                    y.disconnectedMatch = L.call(t, "*"), L.call(t, "[s!='']:x"), H.push("!=", nt)
                }), M = M.length && new RegExp(M.join("|")), H = H.length && new RegExp(H.join("|")), e = ft.test(P.compareDocumentPosition), W = e || ft.test(P.contains) ? function(t, e) {
                    var i = 9 === t.nodeType ? t.documentElement : t,
                        n = e && e.parentNode;
                    return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, $ = e ? function(t, e) {
                    if (t === e) return S = !0, 0;
                    var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return i || (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !y.sortDetached && e.compareDocumentPosition(t) === i ? t === O || t.ownerDocument === R && W(R, t) ? -1 : e === O || e.ownerDocument === R && W(R, e) ? 1 : I ? J(I, t) - J(I, e) : 0 : 4 & i ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return S = !0, 0;
                    var i, n = 0,
                        s = t.parentNode,
                        o = e.parentNode,
                        a = [t],
                        l = [e];
                    if (!s || !o) return t === O ? -1 : e === O ? 1 : s ? -1 : o ? 1 : I ? J(I, t) - J(I, e) : 0;
                    if (s === o) return r(t, e);
                    for (i = t; i = i.parentNode;) a.unshift(i);
                    for (i = e; i = i.parentNode;) l.unshift(i);
                    for (; a[n] === l[n];) n++;
                    return n ? r(a[n], l[n]) : a[n] === R ? -1 : l[n] === R ? 1 : 0
                }, O) : O
            }, e.matches = function(t, i) {
                return e(t, null, null, i)
            }, e.matchesSelector = function(t, i) {
                if ((t.ownerDocument || t) !== O && A(t), i = i.replace(lt, "='$1']"), y.matchesSelector && N && !U[i + " "] && (!H || !H.test(i)) && (!M || !M.test(i))) try {
                    var n = L.call(t, i);
                    if (n || y.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                } catch (t) {}
                return e(i, O, null, [t]).length > 0
            }, e.contains = function(t, e) {
                return (t.ownerDocument || t) !== O && A(t), W(t, e)
            }, e.attr = function(t, e) {
                (t.ownerDocument || t) !== O && A(t);
                var i = w.attrHandle[e.toLowerCase()],
                    n = i && V.call(w.attrHandle, e.toLowerCase()) ? i(t, e, !N) : void 0;
                return void 0 !== n ? n : y.attributes || !N ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }, e.escape = function(t) {
                return (t + "").replace(bt, yt)
            }, e.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function(t) {
                var e, i = [],
                    n = 0,
                    s = 0;
                if (S = !y.detectDuplicates, I = !y.sortStable && t.slice(0), t.sort($), S) {
                    for (; e = t[s++];) e === t[s] && (n = i.push(s));
                    for (; n--;) t.splice(i[n], 1)
                }
                return I = null, t
            }, x = e.getText = function(t) {
                var e, i = "",
                    n = 0,
                    s = t.nodeType;
                if (s) {
                    if (1 === s || 9 === s || 11 === s) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) i += x(t)
                    } else if (3 === s || 4 === s) return t.nodeValue
                } else
                    for (; e = t[n++];) i += x(e);
                return i
            }, w = e.selectors = {
                cacheLength: 50,
                createPseudo: n,
                match: ct,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(vt, _t), t[3] = (t[3] || t[4] || t[5] || "").replace(vt, _t), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, i = !t[6] && t[2];
                        return ct.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ht.test(i) && (e = T(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(vt, _t).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = B[t + " "];
                        return e || (e = new RegExp("(^|" + tt + ")" + t + "(" + tt + "|$)")) && B(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, i, n) {
                        return function(s) {
                            var o = e.attr(s, t);
                            return null == o ? "!=" === i : !i || (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o.replace(st, " ") + " ").indexOf(n) > -1 : "|=" === i && (o === n || o.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(t, e, i, n, s) {
                        var o = "nth" !== t.slice(0, 3),
                            r = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === n && 0 === s ? function(t) {
                            return !!t.parentNode
                        } : function(e, i, l) {
                            var h, u, c, d, p, f, g = o !== r ? "nextSibling" : "previousSibling",
                                m = e.parentNode,
                                v = a && e.nodeName.toLowerCase(),
                                _ = !l && !a,
                                b = !1;
                            if (m) {
                                if (o) {
                                    for (; g;) {
                                        for (d = e; d = d[g];)
                                            if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                        f = g = "only" === t && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [r ? m.firstChild : m.lastChild], r && _) {
                                    for (d = m, c = d[F] || (d[F] = {}), u = c[d.uniqueID] || (c[d.uniqueID] = {}), h = u[t] || [], p = h[0] === j && h[1], b = p && h[2], d = p && m.childNodes[p]; d = ++p && d && d[g] || (b = p = 0) || f.pop();)
                                        if (1 === d.nodeType && ++b && d === e) {
                                            u[t] = [j, p, b];
                                            break
                                        }
                                } else if (_ && (d = e, c = d[F] || (d[F] = {}), u = c[d.uniqueID] || (c[d.uniqueID] = {}), h = u[t] || [], p = h[0] === j && h[1], b = p), !1 === b)
                                    for (;
                                        (d = ++p && d && d[g] || (b = p = 0) || f.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (_ && (c = d[F] || (d[F] = {}), u = c[d.uniqueID] || (c[d.uniqueID] = {}), u[t] = [j, b]), d !== e)););
                                return (b -= s) === n || b % n == 0 && b / n >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, i) {
                        var s, o = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return o[F] ? o(i) : o.length > 1 ? (s = [t, t, "", i], w.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                            for (var n, s = o(t, i), r = s.length; r--;) n = J(t, s[r]), t[n] = !(e[n] = s[r])
                        }) : function(t) {
                            return o(t, 0, s)
                        }) : o
                    }
                },
                pseudos: {
                    not: n(function(t) {
                        var e = [],
                            i = [],
                            s = D(t.replace(ot, "$1"));
                        return s[F] ? n(function(t, e, i, n) {
                            for (var o, r = s(t, null, n, []), a = t.length; a--;)(o = r[a]) && (t[a] = !(e[a] = o))
                        }) : function(t, n, o) {
                            return e[0] = t, s(e, null, o, i), e[0] = null, !i.pop()
                        }
                    }),
                    has: n(function(t) {
                        return function(i) {
                            return e(t, i).length > 0
                        }
                    }),
                    contains: n(function(t) {
                        return t = t.replace(vt, _t),
                            function(e) {
                                return (e.textContent || e.innerText || x(e)).indexOf(t) > -1
                            }
                    }),
                    lang: n(function(t) {
                        return ut.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(vt, _t).toLowerCase(),
                            function(e) {
                                var i;
                                do {
                                    if (i = N ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var i = t.location && t.location.hash;
                        return i && i.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === P
                    },
                    focus: function(t) {
                        return t === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: a(!1),
                    disabled: a(!0),
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !w.pseudos.empty(t)
                    },
                    header: function(t) {
                        return pt.test(t.nodeName)
                    },
                    input: function(t) {
                        return dt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: l(function() {
                        return [0]
                    }),
                    last: l(function(t, e) {
                        return [e - 1]
                    }),
                    eq: l(function(t, e, i) {
                        return [i < 0 ? i + e : i]
                    }),
                    even: l(function(t, e) {
                        for (var i = 0; i < e; i += 2) t.push(i);
                        return t
                    }),
                    odd: l(function(t, e) {
                        for (var i = 1; i < e; i += 2) t.push(i);
                        return t
                    }),
                    lt: l(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; --n >= 0;) t.push(n);
                        return t
                    }),
                    gt: l(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; ++n < e;) t.push(n);
                        return t
                    })
                }
            }, w.pseudos.nth = w.pseudos.eq;
            for (b in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) w.pseudos[b] = function(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }(b);
            for (b in {
                    submit: !0,
                    reset: !0
                }) w.pseudos[b] = function(t) {
                return function(e) {
                    var i = e.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && e.type === t
                }
            }(b);
            return u.prototype = w.filters = w.pseudos, w.setFilters = new u, T = e.tokenize = function(t, i) {
                var n, s, o, r, a, l, h, u = q[t + " "];
                if (u) return i ? 0 : u.slice(0);
                for (a = t, l = [], h = w.preFilter; a;) {
                    n && !(s = rt.exec(a)) || (s && (a = a.slice(s[0].length) || a), l.push(o = [])), n = !1, (s = at.exec(a)) && (n = s.shift(), o.push({
                        value: n,
                        type: s[0].replace(ot, " ")
                    }), a = a.slice(n.length));
                    for (r in w.filter) !(s = ct[r].exec(a)) || h[r] && !(s = h[r](s)) || (n = s.shift(), o.push({
                        value: n,
                        type: r,
                        matches: s
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return i ? a.length : a ? e.error(t) : q(t, l).slice(0)
            }, D = e.compile = function(t, e) {
                var i, n = [],
                    s = [],
                    o = U[t + " "];
                if (!o) {
                    for (e || (e = T(t)), i = e.length; i--;) o = v(e[i]), o[F] ? n.push(o) : s.push(o);
                    o = U(t, _(s, n)), o.selector = t
                }
                return o
            }, k = e.select = function(t, e, i, n) {
                var s, o, r, a, l, u = "function" == typeof t && t,
                    d = !n && T(t = u.selector || t);
                if (i = i || [], 1 === d.length) {
                    if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (r = o[0]).type && 9 === e.nodeType && N && w.relative[o[1].type]) {
                        if (!(e = (w.find.ID(r.matches[0].replace(vt, _t), e) || [])[0])) return i;
                        u && (e = e.parentNode), t = t.slice(o.shift().value.length)
                    }
                    for (s = ct.needsContext.test(t) ? 0 : o.length; s-- && (r = o[s], !w.relative[a = r.type]);)
                        if ((l = w.find[a]) && (n = l(r.matches[0].replace(vt, _t), mt.test(o[0].type) && h(e.parentNode) || e))) {
                            if (o.splice(s, 1), !(t = n.length && c(o))) return X.apply(i, n), i;
                            break
                        }
                }
                return (u || D(t, d))(n, e, !N, i, !e || mt.test(t) && h(e.parentNode) || e), i
            }, y.sortStable = F.split("").sort($).join("") === F, y.detectDuplicates = !!S, A(), y.sortDetached = s(function(t) {
                return 1 & t.compareDocumentPosition(O.createElement("fieldset"))
            }), s(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function(t, e, i) {
                if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), y.attributes && s(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || o("value", function(t, e, i) {
                if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), s(function(t) {
                return null == t.getAttribute("disabled")
            }) || o(Z, function(t, e, i) {
                var n;
                if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }), e
        }(t);
        ft.find = mt, ft.expr = mt.selectors, ft.expr[":"] = ft.expr.pseudos, ft.uniqueSort = ft.unique = mt.uniqueSort, ft.text = mt.getText, ft.isXMLDoc = mt.isXML, ft.contains = mt.contains, ft.escapeSelector = mt.escape;
        var vt = function(t, e, i) {
                for (var n = [], s = void 0 !== i;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (s && ft(t).is(i)) break;
                        n.push(t)
                    }
                return n
            },
            _t = function(t, e) {
                for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                return i
            },
            bt = ft.expr.match.needsContext,
            yt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            wt = /^.[^:#\[\.,]*$/;
        ft.filter = function(t, e, i) {
            var n = e[0];
            return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ft.find.matchesSelector(n, t) ? [n] : [] : ft.find.matches(t, ft.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, ft.fn.extend({
            find: function(t) {
                var e, i, n = this.length,
                    s = this;
                if ("string" != typeof t) return this.pushStack(ft(t).filter(function() {
                    for (e = 0; e < n; e++)
                        if (ft.contains(s[e], this)) return !0
                }));
                for (i = this.pushStack([]), e = 0; e < n; e++) ft.find(t, s[e], i);
                return n > 1 ? ft.uniqueSort(i) : i
            },
            filter: function(t) {
                return this.pushStack(o(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(o(this, t || [], !0))
            },
            is: function(t) {
                return !!o(this, "string" == typeof t && bt.test(t) ? ft(t) : t || [], !1).length
            }
        });
        var xt, Ct = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (ft.fn.init = function(t, e, i) {
            var n, s;
            if (!t) return this;
            if (i = i || xt, "string" == typeof t) {
                if (!(n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : Ct.exec(t)) || !n[1] && e) return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
                if (n[1]) {
                    if (e = e instanceof ft ? e[0] : e, ft.merge(this, ft.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : it, !0)), yt.test(n[1]) && ft.isPlainObject(e))
                        for (n in e) ft.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                    return this
                }
                return s = it.getElementById(n[2]), s && (this[0] = s, this.length = 1), this
            }
            return t.nodeType ? (this[0] = t, this.length = 1, this) : ft.isFunction(t) ? void 0 !== i.ready ? i.ready(t) : t(ft) : ft.makeArray(t, this)
        }).prototype = ft.fn, xt = ft(it);
        var Tt = /^(?:parents|prev(?:Until|All))/,
            Dt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ft.fn.extend({
            has: function(t) {
                var e = ft(t, this),
                    i = e.length;
                return this.filter(function() {
                    for (var t = 0; t < i; t++)
                        if (ft.contains(this, e[t])) return !0
                })
            },
            closest: function(t, e) {
                var i, n = 0,
                    s = this.length,
                    o = [],
                    r = "string" != typeof t && ft(t);
                if (!bt.test(t))
                    for (; n < s; n++)
                        for (i = this[n]; i && i !== e; i = i.parentNode)
                            if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && ft.find.matchesSelector(i, t))) {
                                o.push(i);
                                break
                            }
                return this.pushStack(o.length > 1 ? ft.uniqueSort(o) : o)
            },
            index: function(t) {
                return t ? "string" == typeof t ? at.call(ft(t), this[0]) : at.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(ft.uniqueSort(ft.merge(this.get(), ft(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), ft.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return vt(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return vt(t, "parentNode", i)
            },
            next: function(t) {
                return r(t, "nextSibling")
            },
            prev: function(t) {
                return r(t, "previousSibling")
            },
            nextAll: function(t) {
                return vt(t, "nextSibling")
            },
            prevAll: function(t) {
                return vt(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return vt(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return vt(t, "previousSibling", i)
            },
            siblings: function(t) {
                return _t((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return _t(t.firstChild)
            },
            contents: function(t) {
                return s(t, "iframe") ? t.contentDocument : (s(t, "template") && (t = t.content || t), ft.merge([], t.childNodes))
            }
        }, function(t, e) {
            ft.fn[t] = function(i, n) {
                var s = ft.map(this, e, i);
                return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = ft.filter(n, s)), this.length > 1 && (Dt[t] || ft.uniqueSort(s), Tt.test(t) && s.reverse()), this.pushStack(s)
            }
        });
        var kt = /[^\x20\t\r\n\f]+/g;
        ft.Callbacks = function(t) {
            t = "string" == typeof t ? a(t) : ft.extend({}, t);
            var e, i, n, s, o = [],
                r = [],
                l = -1,
                h = function() {
                    for (s = s || t.once, n = e = !0; r.length; l = -1)
                        for (i = r.shift(); ++l < o.length;) !1 === o[l].apply(i[0], i[1]) && t.stopOnFalse && (l = o.length, i = !1);
                    t.memory || (i = !1), e = !1, s && (o = i ? [] : "")
                },
                u = {
                    add: function() {
                        return o && (i && !e && (l = o.length - 1, r.push(i)), function e(i) {
                            ft.each(i, function(i, n) {
                                ft.isFunction(n) ? t.unique && u.has(n) || o.push(n) : n && n.length && "string" !== ft.type(n) && e(n)
                            })
                        }(arguments), i && !e && h()), this
                    },
                    remove: function() {
                        return ft.each(arguments, function(t, e) {
                            for (var i;
                                (i = ft.inArray(e, o, i)) > -1;) o.splice(i, 1), i <= l && l--
                        }), this
                    },
                    has: function(t) {
                        return t ? ft.inArray(t, o) > -1 : o.length > 0
                    },
                    empty: function() {
                        return o && (o = []), this
                    },
                    disable: function() {
                        return s = r = [], o = i = "", this
                    },
                    disabled: function() {
                        return !o
                    },
                    lock: function() {
                        return s = r = [], i || e || (o = i = ""), this
                    },
                    locked: function() {
                        return !!s
                    },
                    fireWith: function(t, i) {
                        return s || (i = i || [], i = [t, i.slice ? i.slice() : i], r.push(i), e || h()), this
                    },
                    fire: function() {
                        return u.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!n
                    }
                };
            return u
        }, ft.extend({
            Deferred: function(e) {
                var i = [
                        ["notify", "progress", ft.Callbacks("memory"), ft.Callbacks("memory"), 2],
                        ["resolve", "done", ft.Callbacks("once memory"), ft.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", ft.Callbacks("once memory"), ft.Callbacks("once memory"), 1, "rejected"]
                    ],
                    n = "pending",
                    s = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this
                        },
                        catch: function(t) {
                            return s.then(null, t)
                        },
                        pipe: function() {
                            var t = arguments;
                            return ft.Deferred(function(e) {
                                ft.each(i, function(i, n) {
                                    var s = ft.isFunction(t[n[4]]) && t[n[4]];
                                    o[n[1]](function() {
                                        var t = s && s.apply(this, arguments);
                                        t && ft.isFunction(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[n[0] + "With"](this, s ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        then: function(e, n, s) {
                            function o(e, i, n, s) {
                                return function() {
                                    var a = this,
                                        u = arguments,
                                        c = function() {
                                            var t, c;
                                            if (!(e < r)) {
                                                if ((t = n.apply(a, u)) === i.promise()) throw new TypeError("Thenable self-resolution");
                                                c = t && ("object" == typeof t || "function" == typeof t) && t.then, ft.isFunction(c) ? s ? c.call(t, o(r, i, l, s), o(r, i, h, s)) : (r++, c.call(t, o(r, i, l, s), o(r, i, h, s), o(r, i, l, i.notifyWith))) : (n !== l && (a = void 0, u = [t]), (s || i.resolveWith)(a, u))
                                            }
                                        },
                                        d = s ? c : function() {
                                            try {
                                                c()
                                            } catch (t) {
                                                ft.Deferred.exceptionHook && ft.Deferred.exceptionHook(t, d.stackTrace), e + 1 >= r && (n !== h && (a = void 0, u = [t]), i.rejectWith(a, u))
                                            }
                                        };
                                    e ? d() : (ft.Deferred.getStackHook && (d.stackTrace = ft.Deferred.getStackHook()), t.setTimeout(d))
                                }
                            }
                            var r = 0;
                            return ft.Deferred(function(t) {
                                i[0][3].add(o(0, t, ft.isFunction(s) ? s : l, t.notifyWith)), i[1][3].add(o(0, t, ft.isFunction(e) ? e : l)), i[2][3].add(o(0, t, ft.isFunction(n) ? n : h))
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? ft.extend(t, s) : s
                        }
                    },
                    o = {};
                return ft.each(i, function(t, e) {
                    var r = e[2],
                        a = e[5];
                    s[e[1]] = r.add, a && r.add(function() {
                        n = a
                    }, i[3 - t][2].disable, i[0][2].lock), r.add(e[3].fire), o[e[0]] = function() {
                        return o[e[0] + "With"](this === o ? void 0 : this, arguments), this
                    }, o[e[0] + "With"] = r.fireWith
                }), s.promise(o), e && e.call(o, o), o
            },
            when: function(t) {
                var e = arguments.length,
                    i = e,
                    n = Array(i),
                    s = st.call(arguments),
                    o = ft.Deferred(),
                    r = function(t) {
                        return function(i) {
                            n[t] = this, s[t] = arguments.length > 1 ? st.call(arguments) : i, --e || o.resolveWith(n, s)
                        }
                    };
                if (e <= 1 && (u(t, o.done(r(i)).resolve, o.reject, !e), "pending" === o.state() || ft.isFunction(s[i] && s[i].then))) return o.then();
                for (; i--;) u(s[i], r(i), o.reject);
                return o.promise()
            }
        });
        var Et = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        ft.Deferred.exceptionHook = function(e, i) {
            t.console && t.console.warn && e && Et.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, i)
        }, ft.readyException = function(e) {
            t.setTimeout(function() {
                throw e
            })
        };
        var It = ft.Deferred();
        ft.fn.ready = function(t) {
            return It.then(t).catch(function(t) {
                ft.readyException(t)
            }), this
        }, ft.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(t) {
                (!0 === t ? --ft.readyWait : ft.isReady) || (ft.isReady = !0, !0 !== t && --ft.readyWait > 0 || It.resolveWith(it, [ft]))
            }
        }), ft.ready.then = It.then, "complete" === it.readyState || "loading" !== it.readyState && !it.documentElement.doScroll ? t.setTimeout(ft.ready) : (it.addEventListener("DOMContentLoaded", c), t.addEventListener("load", c));
        var St = function(t, e, i, n, s, o, r) {
                var a = 0,
                    l = t.length,
                    h = null == i;
                if ("object" === ft.type(i)) {
                    s = !0;
                    for (a in i) St(t, e, a, i[a], !0, o, r)
                } else if (void 0 !== n && (s = !0, ft.isFunction(n) || (r = !0), h && (r ? (e.call(t, n), e = null) : (h = e, e = function(t, e, i) {
                        return h.call(ft(t), i)
                    })), e))
                    for (; a < l; a++) e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
                return s ? t : h ? e.call(t) : l ? e(t[0], i) : o
            },
            At = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
            };
        d.uid = 1, d.prototype = {
            cache: function(t) {
                var e = t[this.expando];
                return e || (e = {}, At(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                }))), e
            },
            set: function(t, e, i) {
                var n, s = this.cache(t);
                if ("string" == typeof e) s[ft.camelCase(e)] = i;
                else
                    for (n in e) s[ft.camelCase(n)] = e[n];
                return s
            },
            get: function(t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][ft.camelCase(e)]
            },
            access: function(t, e, i) {
                return void 0 === e || e && "string" == typeof e && void 0 === i ? this.get(t, e) : (this.set(t, e, i), void 0 !== i ? i : e)
            },
            remove: function(t, e) {
                var i, n = t[this.expando];
                if (void 0 !== n) {
                    if (void 0 !== e) {
                        Array.isArray(e) ? e = e.map(ft.camelCase) : (e = ft.camelCase(e), e = e in n ? [e] : e.match(kt) || []), i = e.length;
                        for (; i--;) delete n[e[i]]
                    }(void 0 === e || ft.isEmptyObject(n)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            },
            hasData: function(t) {
                var e = t[this.expando];
                return void 0 !== e && !ft.isEmptyObject(e)
            }
        };
        var Ot = new d,
            Pt = new d,
            Nt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Mt = /[A-Z]/g;
        ft.extend({
            hasData: function(t) {
                return Pt.hasData(t) || Ot.hasData(t)
            },
            data: function(t, e, i) {
                return Pt.access(t, e, i)
            },
            removeData: function(t, e) {
                Pt.remove(t, e)
            },
            _data: function(t, e, i) {
                return Ot.access(t, e, i)
            },
            _removeData: function(t, e) {
                Ot.remove(t, e)
            }
        }), ft.fn.extend({
            data: function(t, e) {
                var i, n, s, o = this[0],
                    r = o && o.attributes;
                if (void 0 === t) {
                    if (this.length && (s = Pt.get(o), 1 === o.nodeType && !Ot.get(o, "hasDataAttrs"))) {
                        for (i = r.length; i--;) r[i] && (n = r[i].name, 0 === n.indexOf("data-") && (n = ft.camelCase(n.slice(5)), f(o, n, s[n])));
                        Ot.set(o, "hasDataAttrs", !0)
                    }
                    return s
                }
                return "object" == typeof t ? this.each(function() {
                    Pt.set(this, t)
                }) : St(this, function(e) {
                    var i;
                    if (o && void 0 === e) {
                        if (void 0 !== (i = Pt.get(o, t))) return i;
                        if (void 0 !== (i = f(o, t))) return i
                    } else this.each(function() {
                        Pt.set(this, t, e)
                    })
                }, null, e, arguments.length > 1, null, !0)
            },
            removeData: function(t) {
                return this.each(function() {
                    Pt.remove(this, t)
                })
            }
        }), ft.extend({
            queue: function(t, e, i) {
                var n;
                if (t) return e = (e || "fx") + "queue", n = Ot.get(t, e), i && (!n || Array.isArray(i) ? n = Ot.access(t, e, ft.makeArray(i)) : n.push(i)), n || []
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = ft.queue(t, e),
                    n = i.length,
                    s = i.shift(),
                    o = ft._queueHooks(t, e),
                    r = function() {
                        ft.dequeue(t, e)
                    };
                "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), delete o.stop, s.call(t, r, o)), !n && o && o.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return Ot.get(t, i) || Ot.access(t, i, {
                    empty: ft.Callbacks("once memory").add(function() {
                        Ot.remove(t, [e + "queue", i])
                    })
                })
            }
        }), ft.fn.extend({
            queue: function(t, e) {
                var i = 2;
                return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? ft.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                    var i = ft.queue(this, t, e);
                    ft._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && ft.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    ft.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var i, n = 1,
                    s = ft.Deferred(),
                    o = this,
                    r = this.length,
                    a = function() {
                        --n || s.resolveWith(o, [o])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--;)(i = Ot.get(o[r], t + "queueHooks")) && i.empty && (n++, i.empty.add(a));
                return a(), s.promise(e)
            }
        });
        var Ht = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Lt = new RegExp("^(?:([+-])=|)(" + Ht + ")([a-z%]*)$", "i"),
            Wt = ["Top", "Right", "Bottom", "Left"],
            Ft = function(t, e) {
                return t = e || t, "none" === t.style.display || "" === t.style.display && ft.contains(t.ownerDocument, t) && "none" === ft.css(t, "display")
            },
            Rt = function(t, e, i, n) {
                var s, o, r = {};
                for (o in e) r[o] = t.style[o], t.style[o] = e[o];
                s = i.apply(t, n || []);
                for (o in e) t.style[o] = r[o];
                return s
            },
            jt = {};
        ft.fn.extend({
            show: function() {
                return v(this, !0)
            },
            hide: function() {
                return v(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    Ft(this) ? ft(this).show() : ft(this).hide()
                })
            }
        });
        var zt = /^(?:checkbox|radio)$/i,
            Bt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            qt = /^$|\/(?:java|ecma)script/i,
            Ut = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Ut.optgroup = Ut.option, Ut.tbody = Ut.tfoot = Ut.colgroup = Ut.caption = Ut.thead, Ut.th = Ut.td;
        var $t = /<|&#?\w+;/;
        ! function() {
            var t = it.createDocumentFragment(),
                e = t.appendChild(it.createElement("div")),
                i = it.createElement("input");
            i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), e.appendChild(i), pt.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", pt.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
        }();
        var Vt = it.documentElement,
            Yt = /^key/,
            Kt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Gt = /^([^.]*)(?:\.(.+)|)/;
        ft.event = {
            global: {},
            add: function(t, e, i, n, s) {
                var o, r, a, l, h, u, c, d, p, f, g, m = Ot.get(t);
                if (m)
                    for (i.handler && (o = i, i = o.handler, s = o.selector), s && ft.find.matchesSelector(Vt, s), i.guid || (i.guid = ft.guid++), (l = m.events) || (l = m.events = {}), (r = m.handle) || (r = m.handle = function(e) {
                            return void 0 !== ft && ft.event.triggered !== e.type ? ft.event.dispatch.apply(t, arguments) : void 0
                        }), e = (e || "").match(kt) || [""], h = e.length; h--;) a = Gt.exec(e[h]) || [], p = g = a[1], f = (a[2] || "").split(".").sort(), p && (c = ft.event.special[p] || {}, p = (s ? c.delegateType : c.bindType) || p, c = ft.event.special[p] || {}, u = ft.extend({
                        type: p,
                        origType: g,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: s,
                        needsContext: s && ft.expr.match.needsContext.test(s),
                        namespace: f.join(".")
                    }, o), (d = l[p]) || (d = l[p] = [], d.delegateCount = 0, c.setup && !1 !== c.setup.call(t, n, f, r) || t.addEventListener && t.addEventListener(p, r)), c.add && (c.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)), s ? d.splice(d.delegateCount++, 0, u) : d.push(u), ft.event.global[p] = !0)
            },
            remove: function(t, e, i, n, s) {
                var o, r, a, l, h, u, c, d, p, f, g, m = Ot.hasData(t) && Ot.get(t);
                if (m && (l = m.events)) {
                    for (e = (e || "").match(kt) || [""], h = e.length; h--;)
                        if (a = Gt.exec(e[h]) || [], p = g = a[1], f = (a[2] || "").split(".").sort(), p) {
                            for (c = ft.event.special[p] || {}, p = (n ? c.delegateType : c.bindType) || p, d = l[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = o = d.length; o--;) u = d[o], !s && g !== u.origType || i && i.guid !== u.guid || a && !a.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (d.splice(o, 1), u.selector && d.delegateCount--, c.remove && c.remove.call(t, u));
                            r && !d.length && (c.teardown && !1 !== c.teardown.call(t, f, m.handle) || ft.removeEvent(t, p, m.handle), delete l[p])
                        } else
                            for (p in l) ft.event.remove(t, p + e[h], i, n, !0);
                    ft.isEmptyObject(l) && Ot.remove(t, "handle events")
                }
            },
            dispatch: function(t) {
                var e, i, n, s, o, r, a = ft.event.fix(t),
                    l = new Array(arguments.length),
                    h = (Ot.get(this, "events") || {})[a.type] || [],
                    u = ft.event.special[a.type] || {};
                for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
                if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
                    for (r = ft.event.handlers.call(this, a, h), e = 0;
                        (s = r[e++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = s.elem, i = 0;
                            (o = s.handlers[i++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(o.namespace) || (a.handleObj = o, a.data = o.data, void 0 !== (n = ((ft.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, l)) && !1 === (a.result = n) && (a.preventDefault(), a.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, a), a.result
                }
            },
            handlers: function(t, e) {
                var i, n, s, o, r, a = [],
                    l = e.delegateCount,
                    h = t.target;
                if (l && h.nodeType && !("click" === t.type && t.button >= 1))
                    for (; h !== this; h = h.parentNode || this)
                        if (1 === h.nodeType && ("click" !== t.type || !0 !== h.disabled)) {
                            for (o = [], r = {}, i = 0; i < l; i++) n = e[i], s = n.selector + " ", void 0 === r[s] && (r[s] = n.needsContext ? ft(s, this).index(h) > -1 : ft.find(s, this, null, [h]).length), r[s] && o.push(n);
                            o.length && a.push({
                                elem: h,
                                handlers: o
                            })
                        }
                return h = this, l < e.length && a.push({
                    elem: h,
                    handlers: e.slice(l)
                }), a
            },
            addProp: function(t, e) {
                Object.defineProperty(ft.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: ft.isFunction(e) ? function() {
                        if (this.originalEvent) return e(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[t]
                    },
                    set: function(e) {
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }
                })
            },
            fix: function(t) {
                return t[ft.expando] ? t : new ft.Event(t)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== C() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === C() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && s(this, "input")) return this.click(), !1
                    },
                    _default: function(t) {
                        return s(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            }
        }, ft.removeEvent = function(t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i)
        }, ft.Event = function(t, e) {
            if (!(this instanceof ft.Event)) return new ft.Event(t, e);
            t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? w : x, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && ft.extend(this, e), this.timeStamp = t && t.timeStamp || ft.now(), this[ft.expando] = !0
        }, ft.Event.prototype = {
            constructor: ft.Event,
            isDefaultPrevented: x,
            isPropagationStopped: x,
            isImmediatePropagationStopped: x,
            isSimulated: !1,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = w, t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = w, t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = w, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, ft.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(t) {
                var e = t.button;
                return null == t.which && Yt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Kt.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
            }
        }, ft.event.addProp), ft.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            ft.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var i, n = this,
                        s = t.relatedTarget,
                        o = t.handleObj;
                    return s && (s === n || ft.contains(n, s)) || (t.type = o.origType, i = o.handler.apply(this, arguments), t.type = e), i
                }
            }
        }), ft.fn.extend({
            on: function(t, e, i, n) {
                return T(this, t, e, i, n)
            },
            one: function(t, e, i, n) {
                return T(this, t, e, i, n, 1)
            },
            off: function(t, e, i) {
                var n, s;
                if (t && t.preventDefault && t.handleObj) return n = t.handleObj, ft(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                if ("object" == typeof t) {
                    for (s in t) this.off(s, e, t[s]);
                    return this
                }
                return !1 !== e && "function" != typeof e || (i = e, e = void 0), !1 === i && (i = x), this.each(function() {
                    ft.event.remove(this, t, i, e)
                })
            }
        });
        var Xt = /<script|<style|<link/i,
            Qt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Jt = /^true\/(.*)/,
            Zt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        ft.extend({
            htmlPrefilter: function(t) {
                return t.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, "<$1></$2>")
            },
            clone: function(t, e, i) {
                var n, s, o, r, a = t.cloneNode(!0),
                    l = ft.contains(t.ownerDocument, t);
                if (!(pt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ft.isXMLDoc(t)))
                    for (r = _(a), o = _(t), n = 0, s = o.length; n < s; n++) S(o[n], r[n]);
                if (e)
                    if (i)
                        for (o = o || _(t), r = r || _(a), n = 0, s = o.length; n < s; n++) I(o[n], r[n]);
                    else I(t, a);
                return r = _(a, "script"), r.length > 0 && b(r, !l && _(t, "script")), a
            },
            cleanData: function(t) {
                for (var e, i, n, s = ft.event.special, o = 0; void 0 !== (i = t[o]); o++)
                    if (At(i)) {
                        if (e = i[Ot.expando]) {
                            if (e.events)
                                for (n in e.events) s[n] ? ft.event.remove(i, n) : ft.removeEvent(i, n, e.handle);
                            i[Ot.expando] = void 0
                        }
                        i[Pt.expando] && (i[Pt.expando] = void 0)
                    }
            }
        }), ft.fn.extend({
            detach: function(t) {
                return O(this, t, !0)
            },
            remove: function(t) {
                return O(this, t)
            },
            text: function(t) {
                return St(this, function(t) {
                    return void 0 === t ? ft.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return A(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        D(this, t).appendChild(t)
                    }
                })
            },
            prepend: function() {
                return A(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = D(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return A(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return A(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (ft.cleanData(_(t, !1)), t.textContent = "");
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return ft.clone(this, t, e)
                })
            },
            html: function(t) {
                return St(this, function(t) {
                    var e = this[0] || {},
                        i = 0,
                        n = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !Xt.test(t) && !Ut[(Bt.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = ft.htmlPrefilter(t);
                        try {
                            for (; i < n; i++) e = this[i] || {}, 1 === e.nodeType && (ft.cleanData(_(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = [];
                return A(this, arguments, function(e) {
                    var i = this.parentNode;
                    ft.inArray(this, t) < 0 && (ft.cleanData(_(this)), i && i.replaceChild(e, this))
                }, t)
            }
        }), ft.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            ft.fn[t] = function(t) {
                for (var i, n = [], s = ft(t), o = s.length - 1, r = 0; r <= o; r++) i = r === o ? this : this.clone(!0), ft(s[r])[e](i), rt.apply(n, i.get());
                return this.pushStack(n)
            }
        });
        var te = /^margin/,
            ee = new RegExp("^(" + Ht + ")(?!px)[a-z%]+$", "i"),
            ie = function(e) {
                var i = e.ownerDocument.defaultView;
                return i && i.opener || (i = t), i.getComputedStyle(e)
            };
        ! function() {
            function e() {
                if (a) {
                    a.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Vt.appendChild(r);
                    var e = t.getComputedStyle(a);
                    i = "1%" !== e.top, o = "2px" === e.marginLeft, n = "4px" === e.width, a.style.marginRight = "50%", s = "4px" === e.marginRight, Vt.removeChild(r), a = null
                }
            }
            var i, n, s, o, r = it.createElement("div"),
                a = it.createElement("div");
            a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", pt.clearCloneStyle = "content-box" === a.style.backgroundClip, r.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", r.appendChild(a), ft.extend(pt, {
                pixelPosition: function() {
                    return e(), i
                },
                boxSizingReliable: function() {
                    return e(), n
                },
                pixelMarginRight: function() {
                    return e(), s
                },
                reliableMarginLeft: function() {
                    return e(), o
                }
            }))
        }();
        var ne = /^(none|table(?!-c[ea]).+)/,
            se = /^--/,
            oe = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            re = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            ae = ["Webkit", "Moz", "ms"],
            le = it.createElement("div").style;
        ft.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var i = P(t, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(t, e, i, n) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var s, o, r, a = ft.camelCase(e),
                        l = se.test(e),
                        h = t.style;
                    if (l || (e = H(a)), r = ft.cssHooks[e] || ft.cssHooks[a], void 0 === i) return r && "get" in r && void 0 !== (s = r.get(t, !1, n)) ? s : h[e];
                    o = typeof i, "string" === o && (s = Lt.exec(i)) && s[1] && (i = g(t, e, s), o = "number"), null != i && i === i && ("number" === o && (i += s && s[3] || (ft.cssNumber[a] ? "" : "px")), pt.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (h[e] = "inherit"), r && "set" in r && void 0 === (i = r.set(t, i, n)) || (l ? h.setProperty(e, i) : h[e] = i))
                }
            },
            css: function(t, e, i, n) {
                var s, o, r, a = ft.camelCase(e);
                return se.test(e) || (e = H(a)), r = ft.cssHooks[e] || ft.cssHooks[a], r && "get" in r && (s = r.get(t, !0, i)), void 0 === s && (s = P(t, e, n)), "normal" === s && e in re && (s = re[e]), "" === i || i ? (o = parseFloat(s), !0 === i || isFinite(o) ? o || 0 : s) : s
            }
        }), ft.each(["height", "width"], function(t, e) {
            ft.cssHooks[e] = {
                get: function(t, i, n) {
                    if (i) return !ne.test(ft.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? F(t, e, n) : Rt(t, oe, function() {
                        return F(t, e, n)
                    })
                },
                set: function(t, i, n) {
                    var s, o = n && ie(t),
                        r = n && W(t, e, n, "border-box" === ft.css(t, "boxSizing", !1, o), o);
                    return r && (s = Lt.exec(i)) && "px" !== (s[3] || "px") && (t.style[e] = i, i = ft.css(t, e)), L(t, i, r)
                }
            }
        }), ft.cssHooks.marginLeft = N(pt.reliableMarginLeft, function(t, e) {
            if (e) return (parseFloat(P(t, "marginLeft")) || t.getBoundingClientRect().left - Rt(t, {
                marginLeft: 0
            }, function() {
                return t.getBoundingClientRect().left
            })) + "px"
        }), ft.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            ft.cssHooks[t + e] = {
                expand: function(i) {
                    for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) s[t + Wt[n] + e] = o[n] || o[n - 2] || o[0];
                    return s
                }
            }, te.test(t) || (ft.cssHooks[t + e].set = L)
        }), ft.fn.extend({
            css: function(t, e) {
                return St(this, function(t, e, i) {
                    var n, s, o = {},
                        r = 0;
                    if (Array.isArray(e)) {
                        for (n = ie(t), s = e.length; r < s; r++) o[e[r]] = ft.css(t, e[r], !1, n);
                        return o
                    }
                    return void 0 !== i ? ft.style(t, e, i) : ft.css(t, e)
                }, t, e, arguments.length > 1)
            }
        }), ft.Tween = R, R.prototype = {
            constructor: R,
            init: function(t, e, i, n, s, o) {
                this.elem = t, this.prop = i, this.easing = s || ft.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = o || (ft.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = R.propHooks[this.prop];
                return t && t.get ? t.get(this) : R.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = R.propHooks[this.prop];
                return this.options.duration ? this.pos = e = ft.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : R.propHooks._default.set(this), this
            }
        }, R.prototype.init.prototype = R.prototype, R.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = ft.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
                },
                set: function(t) {
                    ft.fx.step[t.prop] ? ft.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[ft.cssProps[t.prop]] && !ft.cssHooks[t.prop] ? t.elem[t.prop] = t.now : ft.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, ft.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        }, ft.fx = R.prototype.init, ft.fx.step = {};
        var he, ue, ce = /^(?:toggle|show|hide)$/,
            de = /queueHooks$/;
        ft.Animation = ft.extend(V, {
                tweeners: {
                    "*": [function(t, e) {
                        var i = this.createTween(t, e);
                        return g(i.elem, t, Lt.exec(e), i), i
                    }]
                },
                tweener: function(t, e) {
                    ft.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(kt);
                    for (var i, n = 0, s = t.length; n < s; n++) i = t[n], V.tweeners[i] = V.tweeners[i] || [], V.tweeners[i].unshift(e)
                },
                prefilters: [U],
                prefilter: function(t, e) {
                    e ? V.prefilters.unshift(t) : V.prefilters.push(t)
                }
            }), ft.speed = function(t, e, i) {
                var n = t && "object" == typeof t ? ft.extend({}, t) : {
                    complete: i || !i && e || ft.isFunction(t) && t,
                    duration: t,
                    easing: i && e || e && !ft.isFunction(e) && e
                };
                return ft.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in ft.fx.speeds ? n.duration = ft.fx.speeds[n.duration] : n.duration = ft.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    ft.isFunction(n.old) && n.old.call(this), n.queue && ft.dequeue(this, n.queue)
                }, n
            }, ft.fn.extend({
                fadeTo: function(t, e, i, n) {
                    return this.filter(Ft).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, i, n)
                },
                animate: function(t, e, i, n) {
                    var s = ft.isEmptyObject(t),
                        o = ft.speed(e, i, n),
                        r = function() {
                            var e = V(this, ft.extend({}, t), o);
                            (s || Ot.get(this, "finish")) && e.stop(!0)
                        };
                    return r.finish = r, s || !1 === o.queue ? this.each(r) : this.queue(o.queue, r)
                },
                stop: function(t, e, i) {
                    var n = function(t) {
                        var e = t.stop;
                        delete t.stop, e(i)
                    };
                    return "string" != typeof t && (i = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                        var e = !0,
                            s = null != t && t + "queueHooks",
                            o = ft.timers,
                            r = Ot.get(this);
                        if (s) r[s] && r[s].stop && n(r[s]);
                        else
                            for (s in r) r[s] && r[s].stop && de.test(s) && n(r[s]);
                        for (s = o.length; s--;) o[s].elem !== this || null != t && o[s].queue !== t || (o[s].anim.stop(i),
                            e = !1, o.splice(s, 1));
                        !e && i || ft.dequeue(this, t)
                    })
                },
                finish: function(t) {
                    return !1 !== t && (t = t || "fx"), this.each(function() {
                        var e, i = Ot.get(this),
                            n = i[t + "queue"],
                            s = i[t + "queueHooks"],
                            o = ft.timers,
                            r = n ? n.length : 0;
                        for (i.finish = !0, ft.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                        for (e = 0; e < r; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete i.finish
                    })
                }
            }), ft.each(["toggle", "show", "hide"], function(t, e) {
                var i = ft.fn[e];
                ft.fn[e] = function(t, n, s) {
                    return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(B(e, !0), t, n, s)
                }
            }), ft.each({
                slideDown: B("show"),
                slideUp: B("hide"),
                slideToggle: B("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                ft.fn[t] = function(t, i, n) {
                    return this.animate(e, t, i, n)
                }
            }), ft.timers = [], ft.fx.tick = function() {
                var t, e = 0,
                    i = ft.timers;
                for (he = ft.now(); e < i.length; e++)(t = i[e])() || i[e] !== t || i.splice(e--, 1);
                i.length || ft.fx.stop(), he = void 0
            }, ft.fx.timer = function(t) {
                ft.timers.push(t), ft.fx.start()
            }, ft.fx.interval = 13, ft.fx.start = function() {
                ue || (ue = !0, j())
            }, ft.fx.stop = function() {
                ue = null
            }, ft.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, ft.fn.delay = function(e, i) {
                return e = ft.fx ? ft.fx.speeds[e] || e : e, i = i || "fx", this.queue(i, function(i, n) {
                    var s = t.setTimeout(i, e);
                    n.stop = function() {
                        t.clearTimeout(s)
                    }
                })
            },
            function() {
                var t = it.createElement("input"),
                    e = it.createElement("select"),
                    i = e.appendChild(it.createElement("option"));
                t.type = "checkbox", pt.checkOn = "" !== t.value, pt.optSelected = i.selected, t = it.createElement("input"), t.value = "t", t.type = "radio", pt.radioValue = "t" === t.value
            }();
        var pe, fe = ft.expr.attrHandle;
        ft.fn.extend({
            attr: function(t, e) {
                return St(this, ft.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    ft.removeAttr(this, t)
                })
            }
        }), ft.extend({
            attr: function(t, e, i) {
                var n, s, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return void 0 === t.getAttribute ? ft.prop(t, e, i) : (1 === o && ft.isXMLDoc(t) || (s = ft.attrHooks[e.toLowerCase()] || (ft.expr.match.bool.test(e) ? pe : void 0)), void 0 !== i ? null === i ? void ft.removeAttr(t, e) : s && "set" in s && void 0 !== (n = s.set(t, i, e)) ? n : (t.setAttribute(e, i + ""), i) : s && "get" in s && null !== (n = s.get(t, e)) ? n : (n = ft.find.attr(t, e), null == n ? void 0 : n))
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!pt.radioValue && "radio" === e && s(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e), i && (t.value = i), e
                        }
                    }
                }
            },
            removeAttr: function(t, e) {
                var i, n = 0,
                    s = e && e.match(kt);
                if (s && 1 === t.nodeType)
                    for (; i = s[n++];) t.removeAttribute(i)
            }
        }), pe = {
            set: function(t, e, i) {
                return !1 === e ? ft.removeAttr(t, i) : t.setAttribute(i, i), i
            }
        }, ft.each(ft.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var i = fe[e] || ft.find.attr;
            fe[e] = function(t, e, n) {
                var s, o, r = e.toLowerCase();
                return n || (o = fe[r], fe[r] = s, s = null != i(t, e, n) ? r : null, fe[r] = o), s
            }
        });
        var ge = /^(?:input|select|textarea|button)$/i,
            me = /^(?:a|area)$/i;
        ft.fn.extend({
            prop: function(t, e) {
                return St(this, ft.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return this.each(function() {
                    delete this[ft.propFix[t] || t]
                })
            }
        }), ft.extend({
            prop: function(t, e, i) {
                var n, s, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && ft.isXMLDoc(t) || (e = ft.propFix[e] || e, s = ft.propHooks[e]), void 0 !== i ? s && "set" in s && void 0 !== (n = s.set(t, i, e)) ? n : t[e] = i : s && "get" in s && null !== (n = s.get(t, e)) ? n : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = ft.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : ge.test(t.nodeName) || me.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), pt.optSelected || (ft.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            },
            set: function(t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), ft.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ft.propFix[this.toLowerCase()] = this
        }), ft.fn.extend({
            addClass: function(t) {
                var e, i, n, s, o, r, a, l = 0;
                if (ft.isFunction(t)) return this.each(function(e) {
                    ft(this).addClass(t.call(this, e, K(this)))
                });
                if ("string" == typeof t && t)
                    for (e = t.match(kt) || []; i = this[l++];)
                        if (s = K(i), n = 1 === i.nodeType && " " + Y(s) + " ") {
                            for (r = 0; o = e[r++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                            a = Y(n), s !== a && i.setAttribute("class", a)
                        }
                return this
            },
            removeClass: function(t) {
                var e, i, n, s, o, r, a, l = 0;
                if (ft.isFunction(t)) return this.each(function(e) {
                    ft(this).removeClass(t.call(this, e, K(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof t && t)
                    for (e = t.match(kt) || []; i = this[l++];)
                        if (s = K(i), n = 1 === i.nodeType && " " + Y(s) + " ") {
                            for (r = 0; o = e[r++];)
                                for (; n.indexOf(" " + o + " ") > -1;) n = n.replace(" " + o + " ", " ");
                            a = Y(n), s !== a && i.setAttribute("class", a)
                        }
                return this
            },
            toggleClass: function(t, e) {
                var i = typeof t;
                return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : ft.isFunction(t) ? this.each(function(i) {
                    ft(this).toggleClass(t.call(this, i, K(this), e), e)
                }) : this.each(function() {
                    var e, n, s, o;
                    if ("string" === i)
                        for (n = 0, s = ft(this), o = t.match(kt) || []; e = o[n++];) s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                    else void 0 !== t && "boolean" !== i || (e = K(this), e && Ot.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : Ot.get(this, "__className__") || ""))
                })
            },
            hasClass: function(t) {
                var e, i, n = 0;
                for (e = " " + t + " "; i = this[n++];)
                    if (1 === i.nodeType && (" " + Y(K(i)) + " ").indexOf(e) > -1) return !0;
                return !1
            }
        });
        ft.fn.extend({
            val: function(t) {
                var e, i, n, s = this[0]; {
                    if (arguments.length) return n = ft.isFunction(t), this.each(function(i) {
                        var s;
                        1 === this.nodeType && (s = n ? t.call(this, i, ft(this).val()) : t, null == s ? s = "" : "number" == typeof s ? s += "" : Array.isArray(s) && (s = ft.map(s, function(t) {
                            return null == t ? "" : t + ""
                        })), (e = ft.valHooks[this.type] || ft.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, s, "value") || (this.value = s))
                    });
                    if (s) return (e = ft.valHooks[s.type] || ft.valHooks[s.nodeName.toLowerCase()]) && "get" in e && void 0 !== (i = e.get(s, "value")) ? i : (i = s.value, "string" == typeof i ? i.replace(/\r/g, "") : null == i ? "" : i)
                }
            }
        }), ft.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = ft.find.attr(t, "value");
                        return null != e ? e : Y(ft.text(t))
                    }
                },
                select: {
                    get: function(t) {
                        var e, i, n, o = t.options,
                            r = t.selectedIndex,
                            a = "select-one" === t.type,
                            l = a ? null : [],
                            h = a ? r + 1 : o.length;
                        for (n = r < 0 ? h : a ? r : 0; n < h; n++)
                            if (i = o[n], (i.selected || n === r) && !i.disabled && (!i.parentNode.disabled || !s(i.parentNode, "optgroup"))) {
                                if (e = ft(i).val(), a) return e;
                                l.push(e)
                            }
                        return l
                    },
                    set: function(t, e) {
                        for (var i, n, s = t.options, o = ft.makeArray(e), r = s.length; r--;) n = s[r], (n.selected = ft.inArray(ft.valHooks.option.get(n), o) > -1) && (i = !0);
                        return i || (t.selectedIndex = -1), o
                    }
                }
            }
        }), ft.each(["radio", "checkbox"], function() {
            ft.valHooks[this] = {
                set: function(t, e) {
                    if (Array.isArray(e)) return t.checked = ft.inArray(ft(t).val(), e) > -1
                }
            }, pt.checkOn || (ft.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var ve = /^(?:focusinfocus|focusoutblur)$/;
        ft.extend(ft.event, {
            trigger: function(e, i, n, s) {
                var o, r, a, l, h, u, c, d = [n || it],
                    p = ut.call(e, "type") ? e.type : e,
                    f = ut.call(e, "namespace") ? e.namespace.split(".") : [];
                if (r = a = n = n || it, 3 !== n.nodeType && 8 !== n.nodeType && !ve.test(p + ft.event.triggered) && (p.indexOf(".") > -1 && (f = p.split("."), p = f.shift(), f.sort()), h = p.indexOf(":") < 0 && "on" + p, e = e[ft.expando] ? e : new ft.Event(p, "object" == typeof e && e), e.isTrigger = s ? 2 : 3, e.namespace = f.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : ft.makeArray(i, [e]), c = ft.event.special[p] || {}, s || !c.trigger || !1 !== c.trigger.apply(n, i))) {
                    if (!s && !c.noBubble && !ft.isWindow(n)) {
                        for (l = c.delegateType || p, ve.test(l + p) || (r = r.parentNode); r; r = r.parentNode) d.push(r), a = r;
                        a === (n.ownerDocument || it) && d.push(a.defaultView || a.parentWindow || t)
                    }
                    for (o = 0;
                        (r = d[o++]) && !e.isPropagationStopped();) e.type = o > 1 ? l : c.bindType || p, u = (Ot.get(r, "events") || {})[e.type] && Ot.get(r, "handle"), u && u.apply(r, i), (u = h && r[h]) && u.apply && At(r) && (e.result = u.apply(r, i), !1 === e.result && e.preventDefault());
                    return e.type = p, s || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), i) || !At(n) || h && ft.isFunction(n[p]) && !ft.isWindow(n) && (a = n[h], a && (n[h] = null), ft.event.triggered = p, n[p](), ft.event.triggered = void 0, a && (n[h] = a)), e.result
                }
            },
            simulate: function(t, e, i) {
                var n = ft.extend(new ft.Event, i, {
                    type: t,
                    isSimulated: !0
                });
                ft.event.trigger(n, null, e)
            }
        }), ft.fn.extend({
            trigger: function(t, e) {
                return this.each(function() {
                    ft.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var i = this[0];
                if (i) return ft.event.trigger(t, e, i, !0)
            }
        }), ft.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
            ft.fn[e] = function(t, i) {
                return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
            }
        }), ft.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), pt.focusin = "onfocusin" in t, pt.focusin || ft.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var i = function(t) {
                ft.event.simulate(e, t.target, ft.event.fix(t))
            };
            ft.event.special[e] = {
                setup: function() {
                    var n = this.ownerDocument || this,
                        s = Ot.access(n, e);
                    s || n.addEventListener(t, i, !0), Ot.access(n, e, (s || 0) + 1)
                },
                teardown: function() {
                    var n = this.ownerDocument || this,
                        s = Ot.access(n, e) - 1;
                    s ? Ot.access(n, e, s) : (n.removeEventListener(t, i, !0), Ot.remove(n, e))
                }
            }
        });
        var _e = t.location,
            be = ft.now(),
            ye = /\?/;
        ft.parseXML = function(e) {
            var i;
            if (!e || "string" != typeof e) return null;
            try {
                i = (new t.DOMParser).parseFromString(e, "text/xml")
            } catch (t) {
                i = void 0
            }
            return i && !i.getElementsByTagName("parsererror").length || ft.error("Invalid XML: " + e), i
        };
        var we = /\[\]$/,
            xe = /^(?:submit|button|image|reset|file)$/i,
            Ce = /^(?:input|select|textarea|keygen)/i;
        ft.param = function(t, e) {
            var i, n = [],
                s = function(t, e) {
                    var i = ft.isFunction(e) ? e() : e;
                    n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i)
                };
            if (Array.isArray(t) || t.jquery && !ft.isPlainObject(t)) ft.each(t, function() {
                s(this.name, this.value)
            });
            else
                for (i in t) G(i, t[i], e, s);
            return n.join("&")
        }, ft.fn.extend({
            serialize: function() {
                return ft.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = ft.prop(this, "elements");
                    return t ? ft.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !ft(this).is(":disabled") && Ce.test(this.nodeName) && !xe.test(t) && (this.checked || !zt.test(t))
                }).map(function(t, e) {
                    var i = ft(this).val();
                    return null == i ? null : Array.isArray(i) ? ft.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(/\r?\n/g, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(/\r?\n/g, "\r\n")
                    }
                }).get()
            }
        });
        var Te = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            De = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            ke = /^(?:GET|HEAD)$/,
            Ee = {},
            Ie = {},
            Se = "*/".concat("*"),
            Ae = it.createElement("a");
        Ae.href = _e.href, ft.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: _e.href,
                type: "GET",
                isLocal: De.test(_e.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Se,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": ft.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? J(J(t, ft.ajaxSettings), e) : J(ft.ajaxSettings, t)
            },
            ajaxPrefilter: X(Ee),
            ajaxTransport: X(Ie),
            ajax: function(e, i) {
                function n(e, i, n, a) {
                    var h, d, p, y, w, x = i;
                    u || (u = !0, l && t.clearTimeout(l), s = void 0, r = a || "", C.readyState = e > 0 ? 4 : 0, h = e >= 200 && e < 300 || 304 === e, n && (y = Z(f, C, n)), y = tt(f, y, C, h), h ? (f.ifModified && (w = C.getResponseHeader("Last-Modified"), w && (ft.lastModified[o] = w), (w = C.getResponseHeader("etag")) && (ft.etag[o] = w)), 204 === e || "HEAD" === f.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = y.state, d = y.data, p = y.error, h = !p)) : (p = x, !e && x || (x = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (i || x) + "", h ? v.resolveWith(g, [d, x, C]) : v.rejectWith(g, [C, x, p]), C.statusCode(b), b = void 0, c && m.trigger(h ? "ajaxSuccess" : "ajaxError", [C, f, h ? d : p]), _.fireWith(g, [C, x]), c && (m.trigger("ajaxComplete", [C, f]), --ft.active || ft.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (i = e, e = void 0), i = i || {};
                var s, o, r, a, l, h, u, c, d, p, f = ft.ajaxSetup({}, i),
                    g = f.context || f,
                    m = f.context && (g.nodeType || g.jquery) ? ft(g) : ft.event,
                    v = ft.Deferred(),
                    _ = ft.Callbacks("once memory"),
                    b = f.statusCode || {},
                    y = {},
                    w = {},
                    x = "canceled",
                    C = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (u) {
                                if (!a)
                                    for (a = {}; e = Te.exec(r);) a[e[1].toLowerCase()] = e[2];
                                e = a[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return u ? r : null
                        },
                        setRequestHeader: function(t, e) {
                            return null == u && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t, y[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return null == u && (f.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (u) C.always(t[C.status]);
                                else
                                    for (e in t) b[e] = [b[e], t[e]];
                            return this
                        },
                        abort: function(t) {
                            var e = t || x;
                            return s && s.abort(e), n(0, e), this
                        }
                    };
                if (v.promise(C), f.url = ((e || f.url || _e.href) + "").replace(/^\/\//, _e.protocol + "//"), f.type = i.method || i.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(kt) || [""], null == f.crossDomain) {
                    h = it.createElement("a");
                    try {
                        h.href = f.url, h.href = h.href, f.crossDomain = Ae.protocol + "//" + Ae.host != h.protocol + "//" + h.host
                    } catch (t) {
                        f.crossDomain = !0
                    }
                }
                if (f.data && f.processData && "string" != typeof f.data && (f.data = ft.param(f.data, f.traditional)), Q(Ee, f, i, C), u) return C;
                c = ft.event && f.global, c && 0 == ft.active++ && ft.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !ke.test(f.type), o = f.url.replace(/#.*$/, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(/%20/g, "+")) : (p = f.url.slice(o.length), f.data && (o += (ye.test(o) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (o = o.replace(/([?&])_=[^&]*/, "$1"), p = (ye.test(o) ? "&" : "?") + "_=" + be++ + p), f.url = o + p), f.ifModified && (ft.lastModified[o] && C.setRequestHeader("If-Modified-Since", ft.lastModified[o]), ft.etag[o] && C.setRequestHeader("If-None-Match", ft.etag[o])), (f.data && f.hasContent && !1 !== f.contentType || i.contentType) && C.setRequestHeader("Content-Type", f.contentType), C.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Se + "; q=0.01" : "") : f.accepts["*"]);
                for (d in f.headers) C.setRequestHeader(d, f.headers[d]);
                if (f.beforeSend && (!1 === f.beforeSend.call(g, C, f) || u)) return C.abort();
                if (x = "abort", _.add(f.complete), C.done(f.success), C.fail(f.error), s = Q(Ie, f, i, C)) {
                    if (C.readyState = 1, c && m.trigger("ajaxSend", [C, f]), u) return C;
                    f.async && f.timeout > 0 && (l = t.setTimeout(function() {
                        C.abort("timeout")
                    }, f.timeout));
                    try {
                        u = !1, s.send(y, n)
                    } catch (t) {
                        if (u) throw t;
                        n(-1, t)
                    }
                } else n(-1, "No Transport");
                return C
            },
            getJSON: function(t, e, i) {
                return ft.get(t, e, i, "json")
            },
            getScript: function(t, e) {
                return ft.get(t, void 0, e, "script")
            }
        }), ft.each(["get", "post"], function(t, e) {
            ft[e] = function(t, i, n, s) {
                return ft.isFunction(i) && (s = s || n, n = i, i = void 0), ft.ajax(ft.extend({
                    url: t,
                    type: e,
                    dataType: s,
                    data: i,
                    success: n
                }, ft.isPlainObject(t) && t))
            }
        }), ft._evalUrl = function(t) {
            return ft.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }, ft.fn.extend({
            wrapAll: function(t) {
                var e;
                return this[0] && (ft.isFunction(t) && (t = t.call(this[0])), e = ft(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this
            },
            wrapInner: function(t) {
                return ft.isFunction(t) ? this.each(function(e) {
                    ft(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = ft(this),
                        i = e.contents();
                    i.length ? i.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = ft.isFunction(t);
                return this.each(function(i) {
                    ft(this).wrapAll(e ? t.call(this, i) : t)
                })
            },
            unwrap: function(t) {
                return this.parent(t).not("body").each(function() {
                    ft(this).replaceWith(this.childNodes)
                }), this
            }
        }), ft.expr.pseudos.hidden = function(t) {
            return !ft.expr.pseudos.visible(t)
        }, ft.expr.pseudos.visible = function(t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        }, ft.ajaxSettings.xhr = function() {
            try {
                return new t.XMLHttpRequest
            } catch (t) {}
        };
        var Oe = {
                0: 200,
                1223: 204
            },
            Pe = ft.ajaxSettings.xhr();
        pt.cors = !!Pe && "withCredentials" in Pe, pt.ajax = Pe = !!Pe, ft.ajaxTransport(function(e) {
            var i, n;
            if (pt.cors || Pe && !e.crossDomain) return {
                send: function(s, o) {
                    var r, a = e.xhr();
                    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (r in e.xhrFields) a[r] = e.xhrFields[r];
                    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest");
                    for (r in s) a.setRequestHeader(r, s[r]);
                    i = function(t) {
                        return function() {
                            i && (i = n = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Oe[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                binary: a.response
                            } : {
                                text: a.responseText
                            }, a.getAllResponseHeaders()))
                        }
                    }, a.onload = i(), n = a.onerror = i("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                        4 === a.readyState && t.setTimeout(function() {
                            i && n()
                        })
                    }, i = i("abort");
                    try {
                        a.send(e.hasContent && e.data || null)
                    } catch (t) {
                        if (i) throw t
                    }
                },
                abort: function() {
                    i && i()
                }
            }
        }), ft.ajaxPrefilter(function(t) {
            t.crossDomain && (t.contents.script = !1)
        }), ft.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return ft.globalEval(t), t
                }
            }
        }), ft.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), ft.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var e, i;
                return {
                    send: function(n, s) {
                        e = ft("<script>").prop({
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", i = function(t) {
                            e.remove(), i = null, t && s("error" === t.type ? 404 : 200, t.type)
                        }), it.head.appendChild(e[0])
                    },
                    abort: function() {
                        i && i()
                    }
                }
            }
        });
        var Ne = [],
            Me = /(=)\?(?=&|$)|\?\?/;
        ft.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Ne.pop() || ft.expando + "_" + be++;
                return this[t] = !0, t
            }
        }), ft.ajaxPrefilter("json jsonp", function(e, i, n) {
            var s, o, r, a = !1 !== e.jsonp && (Me.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Me.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0]) return s = e.jsonpCallback = ft.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Me, "$1" + s) : !1 !== e.jsonp && (e.url += (ye.test(e.url) ? "&" : "?") + e.jsonp + "=" + s), e.converters["script json"] = function() {
                return r || ft.error(s + " was not called"), r[0]
            }, e.dataTypes[0] = "json", o = t[s], t[s] = function() {
                r = arguments
            }, n.always(function() {
                void 0 === o ? ft(t).removeProp(s) : t[s] = o, e[s] && (e.jsonpCallback = i.jsonpCallback, Ne.push(s)), r && ft.isFunction(o) && o(r[0]), r = o = void 0
            }), "script"
        }), pt.createHTMLDocument = function() {
            var t = it.implementation.createHTMLDocument("").body;
            return t.innerHTML = "<form></form><form></form>", 2 === t.childNodes.length
        }(), ft.parseHTML = function(t, e, i) {
            if ("string" != typeof t) return [];
            "boolean" == typeof e && (i = e, e = !1);
            var n, s, o;
            return e || (pt.createHTMLDocument ? (e = it.implementation.createHTMLDocument(""), n = e.createElement("base"), n.href = it.location.href, e.head.appendChild(n)) : e = it), s = yt.exec(t), o = !i && [], s ? [e.createElement(s[1])] : (s = y([t], e, o), o && o.length && ft(o).remove(), ft.merge([], s.childNodes))
        }, ft.fn.load = function(t, e, i) {
            var n, s, o, r = this,
                a = t.indexOf(" ");
            return a > -1 && (n = Y(t.slice(a)), t = t.slice(0, a)), ft.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (s = "POST"), r.length > 0 && ft.ajax({
                url: t,
                type: s || "GET",
                dataType: "html",
                data: e
            }).done(function(t) {
                o = arguments, r.html(n ? ft("<div>").append(ft.parseHTML(t)).find(n) : t)
            }).always(i && function(t, e) {
                r.each(function() {
                    i.apply(this, o || [t.responseText, e, t])
                })
            }), this
        }, ft.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            ft.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), ft.expr.pseudos.animated = function(t) {
            return ft.grep(ft.timers, function(e) {
                return t === e.elem
            }).length
        }, ft.offset = {
            setOffset: function(t, e, i) {
                var n, s, o, r, a, l, h, u = ft.css(t, "position"),
                    c = ft(t),
                    d = {};
                "static" === u && (t.style.position = "relative"), a = c.offset(), o = ft.css(t, "top"), l = ft.css(t, "left"), h = ("absolute" === u || "fixed" === u) && (o + l).indexOf("auto") > -1, h ? (n = c.position(), r = n.top, s = n.left) : (r = parseFloat(o) || 0, s = parseFloat(l) || 0), ft.isFunction(e) && (e = e.call(t, i, ft.extend({}, a))), null != e.top && (d.top = e.top - a.top + r), null != e.left && (d.left = e.left - a.left + s), "using" in e ? e.using.call(t, d) : c.css(d)
            }
        }, ft.fn.extend({
            offset: function(t) {
                if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                    ft.offset.setOffset(this, t, e)
                });
                var e, i, n, s, o = this[0];
                if (o) return o.getClientRects().length ? (n = o.getBoundingClientRect(), e = o.ownerDocument, i = e.documentElement, s = e.defaultView, {
                    top: n.top + s.pageYOffset - i.clientTop,
                    left: n.left + s.pageXOffset - i.clientLeft
                }) : {
                    top: 0,
                    left: 0
                }
            },
            position: function() {
                if (this[0]) {
                    var t, e, i = this[0],
                        n = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === ft.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), s(t[0], "html") || (n = t.offset()), n = {
                        top: n.top + ft.css(t[0], "borderTopWidth", !0),
                        left: n.left + ft.css(t[0], "borderLeftWidth", !0)
                    }), {
                        top: e.top - n.top - ft.css(i, "marginTop", !0),
                        left: e.left - n.left - ft.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && "static" === ft.css(t, "position");) t = t.offsetParent;
                    return t || Vt
                })
            }
        }), ft.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, e) {
            var i = "pageYOffset" === e;
            ft.fn[t] = function(n) {
                return St(this, function(t, n, s) {
                    var o;
                    if (ft.isWindow(t) ? o = t : 9 === t.nodeType && (o = t.defaultView), void 0 === s) return o ? o[e] : t[n];
                    o ? o.scrollTo(i ? o.pageXOffset : s, i ? s : o.pageYOffset) : t[n] = s
                }, t, n, arguments.length)
            }
        }), ft.each(["top", "left"], function(t, e) {
            ft.cssHooks[e] = N(pt.pixelPosition, function(t, i) {
                if (i) return i = P(t, e), ee.test(i) ? ft(t).position()[e] + "px" : i
            })
        }), ft.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            ft.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(i, n) {
                ft.fn[n] = function(s, o) {
                    var r = arguments.length && (i || "boolean" != typeof s),
                        a = i || (!0 === s || !0 === o ? "margin" : "border");
                    return St(this, function(e, i, s) {
                        var o;
                        return ft.isWindow(e) ? 0 === n.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === s ? ft.css(e, i, a) : ft.style(e, i, s, a)
                    }, e, r ? s : void 0, r)
                }
            })
        }), ft.fn.extend({
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            }
        }), ft.holdReady = function(t) {
            t ? ft.readyWait++ : ft.ready(!0)
        }, ft.isArray = Array.isArray, ft.parseJSON = JSON.parse, ft.nodeName = s, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ft
        });
        var He = t.jQuery,
            Le = t.$;
        return ft.noConflict = function(e) {
            return t.$ === ft && (t.$ = Le), e && t.jQuery === ft && (t.jQuery = He), ft
        }, e || (t.jQuery = t.$ = ft), ft
    }), function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(t) {
            for (var e = t.css("visibility");
                "inherit" === e;) t = t.parent(), e = t.css("visibility");
            return "hidden" !== e
        }

        function i(t) {
            for (var e, i; t.length && t[0] !== document;) {
                if (("absolute" === (e = t.css("position")) || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
                t = t.parent()
            }
            return 0
        }

        function n() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function s(e) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.on("mouseout", i, function() {
                t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
            }).on("mouseover", i, o)
        }

        function o() {
            t.datepicker._isDisabledDatepicker(d.inline ? d.dpDiv.parent()[0] : d.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        }

        function r(e, i) {
            t.extend(e, i);
            for (var n in i) null == i[n] && (e[n] = i[n]);
            return e
        }

        function a(t) {
            return function() {
                var e = this.element.val();
                t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
            }
        }
        t.ui = t.ui || {};
        var l = (t.ui.version = "1.12.1", 0),
            h = Array.prototype.slice;
        t.cleanData = function(e) {
            return function(i) {
                var n, s, o;
                for (o = 0; null != (s = i[o]); o++) try {
                    n = t._data(s, "events"), n && n.remove && t(s).triggerHandler("remove")
                } catch (t) {}
                e(i)
            }
        }(t.cleanData), t.widget = function(e, i, n) {
            var s, o, r, a = {},
                l = e.split(".")[0];
            e = e.split(".")[1];
            var h = l + "-" + e;
            return n || (n = i, i = t.Widget), t.isArray(n) && (n = t.extend.apply(null, [{}].concat(n))), t.expr[":"][h.toLowerCase()] = function(e) {
                return !!t.data(e, h)
            }, t[l] = t[l] || {}, s = t[l][e], o = t[l][e] = function(t, e) {
                if (!this._createWidget) return new o(t, e);
                arguments.length && this._createWidget(t, e)
            }, t.extend(o, s, {
                version: n.version,
                _proto: t.extend({}, n),
                _childConstructors: []
            }), r = new i, r.options = t.widget.extend({}, r.options), t.each(n, function(e, n) {
                if (!t.isFunction(n)) return void(a[e] = n);
                a[e] = function() {
                    function t() {
                        return i.prototype[e].apply(this, arguments)
                    }

                    function s(t) {
                        return i.prototype[e].apply(this, t)
                    }
                    return function() {
                        var e, i = this._super,
                            o = this._superApply;
                        return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = o, e
                    }
                }()
            }), o.prototype = t.widget.extend(r, {
                widgetEventPrefix: s ? r.widgetEventPrefix || e : e
            }, a, {
                constructor: o,
                namespace: l,
                widgetName: e,
                widgetFullName: h
            }), s ? (t.each(s._childConstructors, function(e, i) {
                var n = i.prototype;
                t.widget(n.namespace + "." + n.widgetName, o, i._proto)
            }), delete s._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o
        }, t.widget.extend = function(e) {
            for (var i, n, s = h.call(arguments, 1), o = 0, r = s.length; o < r; o++)
                for (i in s[o]) n = s[o][i], s[o].hasOwnProperty(i) && void 0 !== n && (t.isPlainObject(n) ? e[i] = t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], n) : t.widget.extend({}, n) : e[i] = n);
            return e
        }, t.widget.bridge = function(e, i) {
            var n = i.prototype.widgetFullName || e;
            t.fn[e] = function(s) {
                var o = "string" == typeof s,
                    r = h.call(arguments, 1),
                    a = this;
                return o ? this.length || "instance" !== s ? this.each(function() {
                    var i, o = t.data(this, n);
                    return "instance" === s ? (a = o, !1) : o ? t.isFunction(o[s]) && "_" !== s.charAt(0) ? (i = o[s].apply(o, r), i !== o && void 0 !== i ? (a = i && i.jquery ? a.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + s + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + s + "'")
                }) : a = void 0 : (r.length && (s = t.widget.extend.apply(null, [s].concat(r))), this.each(function() {
                    var e = t.data(this, n);
                    e ? (e.option(s || {}), e._init && e._init()) : t.data(this, n, new i(s, this))
                })), a
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(e, i) {
                i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = l++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === i && this.destroy()
                    }
                }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: function() {
                return {}
            },
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                var e = this;
                this._destroy(), t.each(this.classesElementLookup, function(t, i) {
                    e._removeClass(i, t)
                }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, i) {
                var n, s, o, r = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (r = {}, n = e.split("."), e = n.shift(), n.length) {
                        for (s = r[e] = t.widget.extend({}, this.options[e]), o = 0; o < n.length - 1; o++) s[n[o]] = s[n[o]] || {}, s = s[n[o]];
                        if (e = n.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
                        s[e] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                        r[e] = i
                    }
                return this._setOptions(r), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this
            },
            _setOptionClasses: function(e) {
                var i, n, s;
                for (i in e) s = this.classesElementLookup[i], e[i] !== this.options.classes[i] && s && s.length && (n = t(s.get()), this._removeClass(s, i), n.addClass(this._classes({
                    element: n,
                    keys: i,
                    classes: e,
                    add: !0
                })))
            },
            _setOptionDisabled: function(t) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _classes: function(e) {
                function i(i, o) {
                    var r, a;
                    for (a = 0; a < i.length; a++) r = s.classesElementLookup[i[a]] || t(), r = t(e.add ? t.unique(r.get().concat(e.element.get())) : r.not(e.element).get()), s.classesElementLookup[i[a]] = r, n.push(i[a]), o && e.classes[i[a]] && n.push(e.classes[i[a]])
                }
                var n = [],
                    s = this;
                return e = t.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, e), this._on(e.element, {
                    remove: "_untrackClassesElement"
                }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), n.join(" ")
            },
            _untrackClassesElement: function(e) {
                var i = this;
                t.each(i.classesElementLookup, function(n, s) {
                    -1 !== t.inArray(e.target, s) && (i.classesElementLookup[n] = t(s.not(e.target).get()))
                })
            },
            _removeClass: function(t, e, i) {
                return this._toggleClass(t, e, i, !1)
            },
            _addClass: function(t, e, i) {
                return this._toggleClass(t, e, i, !0)
            },
            _toggleClass: function(t, e, i, n) {
                n = "boolean" == typeof n ? n : i;
                var s = "string" == typeof t || null === t,
                    o = {
                        extra: s ? e : i,
                        keys: s ? t : e,
                        element: s ? this.element : t,
                        add: n
                    };
                return o.element.toggleClass(this._classes(o), n), this
            },
            _on: function(e, i, n) {
                var s, o = this;
                "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, r) {
                    function a() {
                        if (e || !0 !== o.options.disabled && !t(this).hasClass("ui-state-disabled")) return ("string" == typeof r ? o[r] : r).apply(o, arguments)
                    }
                    "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || t.guid++);
                    var l = n.match(/^([\w:-]*)\s*(.*)$/),
                        h = l[1] + o.eventNamespace,
                        u = l[2];
                    u ? s.on(h, u, a) : i.on(h, a)
                })
            },
            _off: function(e, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        this._addClass(t(e.currentTarget), null, "ui-state-hover")
                    },
                    mouseleave: function(e) {
                        this._removeClass(t(e.currentTarget), null, "ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        this._addClass(t(e.currentTarget), null, "ui-state-focus")
                    },
                    focusout: function(e) {
                        this._removeClass(t(e.currentTarget), null, "ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, n) {
                var s, o, r = this.options[e];
                if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                    for (s in o) s in i || (i[s] = o[s]);
                return this.element.trigger(i, n), !(t.isFunction(r) && !1 === r.apply(this.element[0], [i].concat(n)) || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(n, s, o) {
                "string" == typeof s && (s = {
                    effect: s
                });
                var r, a = s ? !0 === s || "number" == typeof s ? i : s.effect || i : e;
                s = s || {}, "number" == typeof s && (s = {
                    duration: s
                }), r = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), r && t.effects && t.effects.effect[a] ? n[e](s) : a !== e && n[a] ? n[a](s.duration, s.easing, o) : n.queue(function(i) {
                    t(this)[e](), o && o.call(n[0]), i()
                })
            }
        });
        t.widget;
        ! function() {
            function e(t, e, i) {
                return [parseFloat(t[0]) * (c.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (c.test(t[1]) ? i / 100 : 1)]
            }

            function i(e, i) {
                return parseInt(t.css(e, i), 10) || 0
            }

            function n(e) {
                var i = e[0];
                return 9 === i.nodeType ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : t.isWindow(i) ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    offset: e.offset()
                }
            }
            var s, o = Math.max,
                r = Math.abs,
                a = /left|center|right/,
                l = /top|center|bottom/,
                h = /[\+\-]\d+(\.[\d]+)?%?/,
                u = /^\w+/,
                c = /%$/,
                d = t.fn.position;
            t.position = {
                scrollbarWidth: function() {
                    if (void 0 !== s) return s;
                    var e, i, n = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        o = n.children()[0];
                    return t("body").append(n), e = o.offsetWidth, n.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = n[0].clientWidth), n.remove(), s = e - i
                },
                getScrollInfo: function(e) {
                    var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                        n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                        s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth;
                    return {
                        width: "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight ? t.position.scrollbarWidth() : 0,
                        height: s ? t.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(e) {
                    var i = t(e || window),
                        n = t.isWindow(i[0]),
                        s = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: n,
                        isDocument: s,
                        offset: n || s ? {
                            left: 0,
                            top: 0
                        } : t(e).offset(),
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: i.outerWidth(),
                        height: i.outerHeight()
                    }
                }
            }, t.fn.position = function(s) {
                if (!s || !s.of) return d.apply(this, arguments);
                s = t.extend({}, s);
                var c, p, f, g, m, v, _ = t(s.of),
                    b = t.position.getWithinInfo(s.within),
                    y = t.position.getScrollInfo(b),
                    w = (s.collision || "flip").split(" "),
                    x = {};
                return v = n(_), _[0].preventDefault && (s.at = "left top"), p = v.width, f = v.height, g = v.offset, m = t.extend({}, g), t.each(["my", "at"], function() {
                    var t, e, i = (s[this] || "").split(" ");
                    1 === i.length && (i = a.test(i[0]) ? i.concat(["center"]) : l.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = a.test(i[0]) ? i[0] : "center", i[1] = l.test(i[1]) ? i[1] : "center", t = h.exec(i[0]), e = h.exec(i[1]), x[this] = [t ? t[0] : 0, e ? e[0] : 0], s[this] = [u.exec(i[0])[0], u.exec(i[1])[0]]
                }), 1 === w.length && (w[1] = w[0]), "right" === s.at[0] ? m.left += p : "center" === s.at[0] && (m.left += p / 2), "bottom" === s.at[1] ? m.top += f : "center" === s.at[1] && (m.top += f / 2), c = e(x.at, p, f), m.left += c[0], m.top += c[1], this.each(function() {
                    var n, a, l = t(this),
                        h = l.outerWidth(),
                        u = l.outerHeight(),
                        d = i(this, "marginLeft"),
                        v = i(this, "marginTop"),
                        C = h + d + i(this, "marginRight") + y.width,
                        T = u + v + i(this, "marginBottom") + y.height,
                        D = t.extend({}, m),
                        k = e(x.my, l.outerWidth(), l.outerHeight());
                    "right" === s.my[0] ? D.left -= h : "center" === s.my[0] && (D.left -= h / 2), "bottom" === s.my[1] ? D.top -= u : "center" === s.my[1] && (D.top -= u / 2), D.left += k[0], D.top += k[1], n = {
                        marginLeft: d,
                        marginTop: v
                    }, t.each(["left", "top"], function(e, i) {
                        t.ui.position[w[e]] && t.ui.position[w[e]][i](D, {
                            targetWidth: p,
                            targetHeight: f,
                            elemWidth: h,
                            elemHeight: u,
                            collisionPosition: n,
                            collisionWidth: C,
                            collisionHeight: T,
                            offset: [c[0] + k[0], c[1] + k[1]],
                            my: s.my,
                            at: s.at,
                            within: b,
                            elem: l
                        })
                    }), s.using && (a = function(t) {
                        var e = g.left - D.left,
                            i = e + p - h,
                            n = g.top - D.top,
                            a = n + f - u,
                            c = {
                                target: {
                                    element: _,
                                    left: g.left,
                                    top: g.top,
                                    width: p,
                                    height: f
                                },
                                element: {
                                    element: l,
                                    left: D.left,
                                    top: D.top,
                                    width: h,
                                    height: u
                                },
                                horizontal: i < 0 ? "left" : e > 0 ? "right" : "center",
                                vertical: a < 0 ? "top" : n > 0 ? "bottom" : "middle"
                            };
                        p < h && r(e + i) < p && (c.horizontal = "center"), f < u && r(n + a) < f && (c.vertical = "middle"), o(r(e), r(i)) > o(r(n), r(a)) ? c.important = "horizontal" : c.important = "vertical", s.using.call(this, t, c)
                    }), l.offset(t.extend(D, {
                        using: a
                    }))
                })
            }, t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i, n = e.within,
                            s = n.isWindow ? n.scrollLeft : n.offset.left,
                            r = n.width,
                            a = t.left - e.collisionPosition.marginLeft,
                            l = s - a,
                            h = a + e.collisionWidth - r - s;
                        e.collisionWidth > r ? l > 0 && h <= 0 ? (i = t.left + l + e.collisionWidth - r - s, t.left += l - i) : t.left = h > 0 && l <= 0 ? s : l > h ? s + r - e.collisionWidth : s : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = o(t.left - a, t.left)
                    },
                    top: function(t, e) {
                        var i, n = e.within,
                            s = n.isWindow ? n.scrollTop : n.offset.top,
                            r = e.within.height,
                            a = t.top - e.collisionPosition.marginTop,
                            l = s - a,
                            h = a + e.collisionHeight - r - s;
                        e.collisionHeight > r ? l > 0 && h <= 0 ? (i = t.top + l + e.collisionHeight - r - s, t.top += l - i) : t.top = h > 0 && l <= 0 ? s : l > h ? s + r - e.collisionHeight : s : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = o(t.top - a, t.top)
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i, n, s = e.within,
                            o = s.offset.left + s.scrollLeft,
                            a = s.width,
                            l = s.isWindow ? s.scrollLeft : s.offset.left,
                            h = t.left - e.collisionPosition.marginLeft,
                            u = h - l,
                            c = h + e.collisionWidth - a - l,
                            d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                            p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                            f = -2 * e.offset[0];
                        u < 0 ? ((i = t.left + d + p + f + e.collisionWidth - a - o) < 0 || i < r(u)) && (t.left += d + p + f) : c > 0 && ((n = t.left - e.collisionPosition.marginLeft + d + p + f - l) > 0 || r(n) < c) && (t.left += d + p + f)
                    },
                    top: function(t, e) {
                        var i, n, s = e.within,
                            o = s.offset.top + s.scrollTop,
                            a = s.height,
                            l = s.isWindow ? s.scrollTop : s.offset.top,
                            h = t.top - e.collisionPosition.marginTop,
                            u = h - l,
                            c = h + e.collisionHeight - a - l,
                            d = "top" === e.my[1],
                            p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                            f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                            g = -2 * e.offset[1];
                        u < 0 ? ((n = t.top + p + f + g + e.collisionHeight - a - o) < 0 || n < r(u)) && (t.top += p + f + g) : c > 0 && ((i = t.top - e.collisionPosition.marginTop + p + f + g - l) > 0 || r(i) < c) && (t.top += p + f + g)
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }
        }();
        var u = (t.ui.position, t.extend(t.expr[":"], {
                data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                    return function(i) {
                        return !!t.data(i, e)
                    }
                }) : function(e, i, n) {
                    return !!t.data(e, n[3])
                }
            }), t.fn.extend({
                disableSelection: function() {
                    var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                    return function() {
                        return this.on(t + ".ui-disableSelection", function(t) {
                            t.preventDefault()
                        })
                    }
                }(),
                enableSelection: function() {
                    return this.off(".ui-disableSelection")
                }
            }), "ui-effects-animated"),
            c = t;
        t.effects = {
                effect: {}
            },
            function(t, e) {
                function i(t, e, i) {
                    var n = u[e.type] || {};
                    return null == t ? i || !e.def ? null : e.def : (t = n.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : 0 > t ? 0 : n.max < t ? n.max : t)
                }

                function n(e) {
                    var i = l(),
                        n = i._rgba = [];
                    return e = e.toLowerCase(), p(a, function(t, s) {
                        var o, r = s.re.exec(e),
                            a = r && s.parse(r),
                            l = s.space || "rgba";
                        if (a) return o = i[l](a), i[h[l].cache] = o[h[l].cache], n = i._rgba = o._rgba, !1
                    }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), i) : o[e]
                }

                function s(t, e, i) {
                    return i = (i + 1) % 1, 6 * i < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) * (2 / 3 - i) * 6 : t
                }
                var o, r = /^([\-+])=\s*(\d+\.?\d*)/,
                    a = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [t[1], t[2], t[3], t[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(t) {
                            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(t) {
                            return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(t) {
                            return [t[1], t[2] / 100, t[3] / 100, t[4]]
                        }
                    }],
                    l = t.Color = function(e, i, n, s) {
                        return new t.Color.fn.parse(e, i, n, s)
                    },
                    h = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    u = {
                        byte: {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    c = l.support = {},
                    d = t("<p>")[0],
                    p = t.each;
                d.style.cssText = "background-color:rgba(1,1,1,.5)", c.rgba = d.style.backgroundColor.indexOf("rgba") > -1, p(h, function(t, e) {
                    e.cache = "_" + t, e.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), l.fn = t.extend(l.prototype, {
                    parse: function(e, s, r, a) {
                        if (void 0 === e) return this._rgba = [null, null, null, null], this;
                        (e.jquery || e.nodeType) && (e = t(e).css(s), s = void 0);
                        var u = this,
                            c = t.type(e),
                            d = this._rgba = [];
                        return void 0 !== s && (e = [e, s, r, a], c = "array"), "string" === c ? this.parse(n(e) || o._default) : "array" === c ? (p(h.rgba.props, function(t, n) {
                            d[n.idx] = i(e[n.idx], n)
                        }), this) : "object" === c ? (e instanceof l ? p(h, function(t, i) {
                            e[i.cache] && (u[i.cache] = e[i.cache].slice())
                        }) : p(h, function(n, s) {
                            var o = s.cache;
                            p(s.props, function(t, n) {
                                if (!u[o] && s.to) {
                                    if ("alpha" === t || null == e[t]) return;
                                    u[o] = s.to(u._rgba)
                                }
                                u[o][n.idx] = i(e[t], n, !0)
                            }), u[o] && t.inArray(null, u[o].slice(0, 3)) < 0 && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])))
                        }), this) : void 0
                    },
                    is: function(t) {
                        var e = l(t),
                            i = !0,
                            n = this;
                        return p(h, function(t, s) {
                            var o, r = e[s.cache];
                            return r && (o = n[s.cache] || s.to && s.to(n._rgba) || [], p(s.props, function(t, e) {
                                if (null != r[e.idx]) return i = r[e.idx] === o[e.idx]
                            })), i
                        }), i
                    },
                    _space: function() {
                        var t = [],
                            e = this;
                        return p(h, function(i, n) {
                            e[n.cache] && t.push(i)
                        }), t.pop()
                    },
                    transition: function(t, e) {
                        var n = l(t),
                            s = n._space(),
                            o = h[s],
                            r = 0 === this.alpha() ? l("transparent") : this,
                            a = r[o.cache] || o.to(r._rgba),
                            c = a.slice();
                        return n = n[o.cache], p(o.props, function(t, s) {
                            var o = s.idx,
                                r = a[o],
                                l = n[o],
                                h = u[s.type] || {};
                            null !== l && (null === r ? c[o] = l : (h.mod && (l - r > h.mod / 2 ? r += h.mod : r - l > h.mod / 2 && (r -= h.mod)), c[o] = i((l - r) * e + r, s)))
                        }), this[s](c)
                    },
                    blend: function(e) {
                        if (1 === this._rgba[3]) return this;
                        var i = this._rgba.slice(),
                            n = i.pop(),
                            s = l(e)._rgba;
                        return l(t.map(i, function(t, e) {
                            return (1 - n) * s[e] + n * t
                        }))
                    },
                    toRgbaString: function() {
                        var e = "rgba(",
                            i = t.map(this._rgba, function(t, e) {
                                return null == t ? e > 2 ? 1 : 0 : t
                            });
                        return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                    },
                    toHslaString: function() {
                        var e = "hsla(",
                            i = t.map(this.hsla(), function(t, e) {
                                return null == t && (t = e > 2 ? 1 : 0), e && e < 3 && (t = Math.round(100 * t) + "%"), t
                            });
                        return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                    },
                    toHexString: function(e) {
                        var i = this._rgba.slice(),
                            n = i.pop();
                        return e && i.push(~~(255 * n)), "#" + t.map(i, function(t) {
                            return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), l.fn.parse.prototype = l.fn, h.hsla.to = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e, i, n = t[0] / 255,
                        s = t[1] / 255,
                        o = t[2] / 255,
                        r = t[3],
                        a = Math.max(n, s, o),
                        l = Math.min(n, s, o),
                        h = a - l,
                        u = a + l,
                        c = .5 * u;
                    return e = l === a ? 0 : n === a ? 60 * (s - o) / h + 360 : s === a ? 60 * (o - n) / h + 120 : 60 * (n - s) / h + 240, i = 0 === h ? 0 : c <= .5 ? h / u : h / (2 - u), [Math.round(e) % 360, i, c, null == r ? 1 : r]
                }, h.hsla.from = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e = t[0] / 360,
                        i = t[1],
                        n = t[2],
                        o = t[3],
                        r = n <= .5 ? n * (1 + i) : n + i - n * i,
                        a = 2 * n - r;
                    return [Math.round(255 * s(a, r, e + 1 / 3)), Math.round(255 * s(a, r, e)), Math.round(255 * s(a, r, e - 1 / 3)), o]
                }, p(h, function(e, n) {
                    var s = n.props,
                        o = n.cache,
                        a = n.to,
                        h = n.from;
                    l.fn[e] = function(e) {
                        if (a && !this[o] && (this[o] = a(this._rgba)), void 0 === e) return this[o].slice();
                        var n, r = t.type(e),
                            u = "array" === r || "object" === r ? e : arguments,
                            c = this[o].slice();
                        return p(s, function(t, e) {
                            var n = u["object" === r ? t : e.idx];
                            null == n && (n = c[e.idx]), c[e.idx] = i(n, e)
                        }), h ? (n = l(h(c)), n[o] = c, n) : l(c)
                    }, p(s, function(i, n) {
                        l.fn[i] || (l.fn[i] = function(s) {
                            var o, a = t.type(s),
                                l = "alpha" === i ? this._hsla ? "hsla" : "rgba" : e,
                                h = this[l](),
                                u = h[n.idx];
                            return "undefined" === a ? u : ("function" === a && (s = s.call(this, u), a = t.type(s)), null == s && n.empty ? this : ("string" === a && (o = r.exec(s)) && (s = u + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1)), h[n.idx] = s, this[l](h)))
                        })
                    })
                }), l.hook = function(e) {
                    var i = e.split(" ");
                    p(i, function(e, i) {
                        t.cssHooks[i] = {
                            set: function(e, s) {
                                var o, r, a = "";
                                if ("transparent" !== s && ("string" !== t.type(s) || (o = n(s)))) {
                                    if (s = l(o || s), !c.rgba && 1 !== s._rgba[3]) {
                                        for (r = "backgroundColor" === i ? e.parentNode : e;
                                            ("" === a || "transparent" === a) && r && r.style;) try {
                                            a = t.css(r, "backgroundColor"), r = r.parentNode
                                        } catch (t) {}
                                        s = s.blend(a && "transparent" !== a ? a : "_default")
                                    }
                                    s = s.toRgbaString()
                                }
                                try {
                                    e.style[i] = s
                                } catch (t) {}
                            }
                        }, t.fx.step[i] = function(e) {
                            e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                        }
                    })
                }, l.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"), t.cssHooks.borderColor = {
                    expand: function(t) {
                        var e = {};
                        return p(["Top", "Right", "Bottom", "Left"], function(i, n) {
                            e["border" + n + "Color"] = t
                        }), e
                    }
                }, o = t.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(c),
            function() {
                function e(e) {
                    var i, n, s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                        o = {};
                    if (s && s.length && s[0] && s[s[0]])
                        for (n = s.length; n--;) i = s[n], "string" == typeof s[i] && (o[t.camelCase(i)] = s[i]);
                    else
                        for (i in s) "string" == typeof s[i] && (o[i] = s[i]);
                    return o
                }

                function i(e, i) {
                    var n, o, r = {};
                    for (n in i) o = i[n], e[n] !== o && (s[n] || !t.fx.step[n] && isNaN(parseFloat(o)) || (r[n] = o));
                    return r
                }
                var n = ["add", "remove", "toggle"],
                    s = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                    t.fx.step[i] = function(t) {
                        ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (c.style(t.elem, i, t.end), t.setAttr = !0)
                    }
                }), t.fn.addBack || (t.fn.addBack = function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }), t.effects.animateClass = function(s, o, r, a) {
                    var l = t.speed(o, r, a);
                    return this.queue(function() {
                        var o, r = t(this),
                            a = r.attr("class") || "",
                            h = l.children ? r.find("*").addBack() : r;
                        h = h.map(function() {
                            return {
                                el: t(this),
                                start: e(this)
                            }
                        }), o = function() {
                            t.each(n, function(t, e) {
                                s[e] && r[e + "Class"](s[e])
                            })
                        }, o(), h = h.map(function() {
                            return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this
                        }), r.attr("class", a), h = h.map(function() {
                            var e = this,
                                i = t.Deferred(),
                                n = t.extend({}, l, {
                                    queue: !1,
                                    complete: function() {
                                        i.resolve(e)
                                    }
                                });
                            return this.el.animate(this.diff, n), i.promise()
                        }), t.when.apply(t, h.get()).done(function() {
                            o(), t.each(arguments, function() {
                                var e = this.el;
                                t.each(this.diff, function(t) {
                                    e.css(t, "")
                                })
                            }), l.complete.call(r[0])
                        })
                    })
                }, t.fn.extend({
                    addClass: function(e) {
                        return function(i, n, s, o) {
                            return n ? t.effects.animateClass.call(this, {
                                add: i
                            }, n, s, o) : e.apply(this, arguments)
                        }
                    }(t.fn.addClass),
                    removeClass: function(e) {
                        return function(i, n, s, o) {
                            return arguments.length > 1 ? t.effects.animateClass.call(this, {
                                remove: i
                            }, n, s, o) : e.apply(this, arguments)
                        }
                    }(t.fn.removeClass),
                    toggleClass: function(e) {
                        return function(i, n, s, o, r) {
                            return "boolean" == typeof n || void 0 === n ? s ? t.effects.animateClass.call(this, n ? {
                                add: i
                            } : {
                                remove: i
                            }, s, o, r) : e.apply(this, arguments) : t.effects.animateClass.call(this, {
                                toggle: i
                            }, n, s, o)
                        }
                    }(t.fn.toggleClass),
                    switchClass: function(e, i, n, s, o) {
                        return t.effects.animateClass.call(this, {
                            add: i,
                            remove: e
                        }, n, s, o)
                    }
                })
            }(),
            function() {
                function e(e, i, n, s) {
                    return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                        effect: e
                    }, null == i && (i = {}), t.isFunction(i) && (s = i, n = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (s = n, n = i, i = {}), t.isFunction(n) && (s = n, n = null), i && t.extend(e, i), n = n || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = s || i.complete, e
                }

                function i(e) {
                    return !(e && "number" != typeof e && !t.fx.speeds[e]) || ("string" == typeof e && !t.effects.effect[e] || (!!t.isFunction(e) || "object" == typeof e && !e.effect))
                }

                function n(t, e) {
                    var i = e.outerWidth(),
                        n = e.outerHeight(),
                        s = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
                        o = s.exec(t) || ["", 0, i, n, 0];
                    return {
                        top: parseFloat(o[1]) || 0,
                        right: "auto" === o[2] ? i : parseFloat(o[2]),
                        bottom: "auto" === o[3] ? n : parseFloat(o[3]),
                        left: parseFloat(o[4]) || 0
                    }
                }
                t.expr && t.expr.filters && t.expr.filters.animated && (t.expr.filters.animated = function(e) {
                    return function(i) {
                        return !!t(i).data(u) || e(i)
                    }
                }(t.expr.filters.animated)), !1 !== t.uiBackCompat && t.extend(t.effects, {
                    save: function(t, e) {
                        for (var i = 0, n = e.length; i < n; i++) null !== e[i] && t.data("ui-effects-" + e[i], t[0].style[e[i]])
                    },
                    restore: function(t, e) {
                        for (var i, n = 0, s = e.length; n < s; n++) null !== e[n] && (i = t.data("ui-effects-" + e[n]), t.css(e[n], i))
                    },
                    setMode: function(t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                    },
                    createWrapper: function(e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = {
                                width: e.outerWidth(!0),
                                height: e.outerHeight(!0),
                                float: e.css("float")
                            },
                            n = t("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            s = {
                                width: e.width(),
                                height: e.height()
                            },
                            o = document.activeElement;
                        try {
                            o.id
                        } catch (t) {
                            o = document.body
                        }
                        return e.wrap(n), (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"), n = e.parent(), "static" === e.css("position") ? (n.css({
                            position: "relative"
                        }), e.css({
                            position: "relative"
                        })) : (t.extend(i, {
                            position: e.css("position"),
                            zIndex: e.css("z-index")
                        }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                            i[n] = e.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                        }), e.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), e.css(s), n.css(i).show()
                    },
                    removeWrapper: function(e) {
                        var i = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).trigger("focus")), e
                    }
                }), t.extend(t.effects, {
                    version: "1.12.1",
                    define: function(e, i, n) {
                        return n || (n = i, i = "effect"), t.effects.effect[e] = n, t.effects.effect[e].mode = i, n
                    },
                    scaledDimensions: function(t, e, i) {
                        if (0 === e) return {
                            height: 0,
                            width: 0,
                            outerHeight: 0,
                            outerWidth: 0
                        };
                        var n = "horizontal" !== i ? (e || 100) / 100 : 1,
                            s = "vertical" !== i ? (e || 100) / 100 : 1;
                        return {
                            height: t.height() * s,
                            width: t.width() * n,
                            outerHeight: t.outerHeight() * s,
                            outerWidth: t.outerWidth() * n
                        }
                    },
                    clipToBox: function(t) {
                        return {
                            width: t.clip.right - t.clip.left,
                            height: t.clip.bottom - t.clip.top,
                            left: t.clip.left,
                            top: t.clip.top
                        }
                    },
                    unshift: function(t, e, i) {
                        var n = t.queue();
                        e > 1 && n.splice.apply(n, [1, 0].concat(n.splice(e, i))), t.dequeue()
                    },
                    saveStyle: function(t) {
                        t.data("ui-effects-style", t[0].style.cssText)
                    },
                    restoreStyle: function(t) {
                        t[0].style.cssText = t.data("ui-effects-style") || "", t.removeData("ui-effects-style")
                    },
                    mode: function(t, e) {
                        var i = t.is(":hidden");
                        return "toggle" === e && (e = i ? "show" : "hide"), (i ? "hide" === e : "show" === e) && (e = "none"), e
                    },
                    getBaseline: function(t, e) {
                        var i, n;
                        switch (t[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = t[0] / e.height
                        }
                        switch (t[1]) {
                            case "left":
                                n = 0;
                                break;
                            case "center":
                                n = .5;
                                break;
                            case "right":
                                n = 1;
                                break;
                            default:
                                n = t[1] / e.width
                        }
                        return {
                            x: n,
                            y: i
                        }
                    },
                    createPlaceholder: function(e) {
                        var i, n = e.css("position"),
                            s = e.position();
                        return e.css({
                            marginTop: e.css("marginTop"),
                            marginBottom: e.css("marginBottom"),
                            marginLeft: e.css("marginLeft"),
                            marginRight: e.css("marginRight")
                        }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()), /^(static|relative)/.test(n) && (n = "absolute", i = t("<" + e[0].nodeName + ">").insertAfter(e).css({
                            display: /^(inline|ruby)/.test(e.css("display")) ? "inline-block" : "block",
                            visibility: "hidden",
                            marginTop: e.css("marginTop"),
                            marginBottom: e.css("marginBottom"),
                            marginLeft: e.css("marginLeft"),
                            marginRight: e.css("marginRight"),
                            float: e.css("float")
                        }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"), e.data("ui-effects-placeholder", i)), e.css({
                            position: n,
                            left: s.left,
                            top: s.top
                        }), i
                    },
                    removePlaceholder: function(t) {
                        var e = "ui-effects-placeholder",
                            i = t.data(e);
                        i && (i.remove(), t.removeData(e))
                    },
                    cleanUp: function(e) {
                        t.effects.restoreStyle(e), t.effects.removePlaceholder(e)
                    },
                    setTransition: function(e, i, n, s) {
                        return s = s || {}, t.each(i, function(t, i) {
                            var o = e.cssUnit(i);
                            o[0] > 0 && (s[i] = o[0] * n + o[1])
                        }), s
                    }
                }), t.fn.extend({
                    effect: function() {
                        function i(e) {
                            function i() {
                                a.removeData(u), t.effects.cleanUp(a), "hide" === n.mode && a.hide(), r()
                            }

                            function r() {
                                t.isFunction(l) && l.call(a[0]), t.isFunction(e) && e()
                            }
                            var a = t(this);
                            n.mode = c.shift(), !1 === t.uiBackCompat || o ? "none" === n.mode ? (a[h](), r()) : s.call(a[0], n, i) : (a.is(":hidden") ? "hide" === h : "show" === h) ? (a[h](), r()) : s.call(a[0], n, r)
                        }
                        var n = e.apply(this, arguments),
                            s = t.effects.effect[n.effect],
                            o = s.mode,
                            r = n.queue,
                            a = r || "fx",
                            l = n.complete,
                            h = n.mode,
                            c = [],
                            d = function(e) {
                                var i = t(this),
                                    n = t.effects.mode(i, h) || o;
                                i.data(u, !0), c.push(n), o && ("show" === n || n === o && "hide" === n) && i.show(), o && "none" === n || t.effects.saveStyle(i), t.isFunction(e) && e()
                            };
                        return t.fx.off || !s ? h ? this[h](n.duration, l) : this.each(function() {
                            l && l.call(this)
                        }) : !1 === r ? this.each(d).each(i) : this.queue(a, d).queue(a, i)
                    },
                    show: function(t) {
                        return function(n) {
                            if (i(n)) return t.apply(this, arguments);
                            var s = e.apply(this, arguments);
                            return s.mode = "show", this.effect.call(this, s)
                        }
                    }(t.fn.show),
                    hide: function(t) {
                        return function(n) {
                            if (i(n)) return t.apply(this, arguments);
                            var s = e.apply(this, arguments);
                            return s.mode = "hide", this.effect.call(this, s)
                        }
                    }(t.fn.hide),
                    toggle: function(t) {
                        return function(n) {
                            if (i(n) || "boolean" == typeof n) return t.apply(this, arguments);
                            var s = e.apply(this, arguments);
                            return s.mode = "toggle", this.effect.call(this, s)
                        }
                    }(t.fn.toggle),
                    cssUnit: function(e) {
                        var i = this.css(e),
                            n = [];
                        return t.each(["em", "px", "%", "pt"], function(t, e) {
                            i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                        }), n
                    },
                    cssClip: function(t) {
                        return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : n(this.css("clip"), this)
                    },
                    transfer: function(e, i) {
                        var n = t(this),
                            s = t(e.to),
                            o = "fixed" === s.css("position"),
                            r = t("body"),
                            a = o ? r.scrollTop() : 0,
                            l = o ? r.scrollLeft() : 0,
                            h = s.offset(),
                            u = {
                                top: h.top - a,
                                left: h.left - l,
                                height: s.innerHeight(),
                                width: s.innerWidth()
                            },
                            c = n.offset(),
                            d = t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({
                                top: c.top - a,
                                left: c.left - l,
                                height: n.innerHeight(),
                                width: n.innerWidth(),
                                position: o ? "fixed" : "absolute"
                            }).animate(u, e.duration, e.easing, function() {
                                d.remove(), t.isFunction(i) && i()
                            })
                    }
                }), t.fx.step.clip = function(e) {
                    e.clipInit || (e.start = t(e.elem).cssClip(), "string" == typeof e.end && (e.end = n(e.end, e.elem)), e.clipInit = !0), t(e.elem).cssClip({
                        top: e.pos * (e.end.top - e.start.top) + e.start.top,
                        right: e.pos * (e.end.right - e.start.right) + e.start.right,
                        bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
                        left: e.pos * (e.end.left - e.start.left) + e.start.left
                    })
                }
            }(),
            function() {
                var e = {};
                t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                    e[i] = function(e) {
                        return Math.pow(e, t + 2)
                    }
                }), t.extend(e, {
                    Sine: function(t) {
                        return 1 - Math.cos(t * Math.PI / 2)
                    },
                    Circ: function(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    },
                    Elastic: function(t) {
                        return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(t) {
                        return t * t * (3 * t - 2)
                    },
                    Bounce: function(t) {
                        for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                    }
                }), t.each(e, function(e, i) {
                    t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                        return 1 - i(1 - t)
                    }, t.easing["easeInOut" + e] = function(t) {
                        return t < .5 ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
                    }
                })
            }();
        t.effects, t.effects.define("blind", "hide", function(e, i) {
            var n = {
                    up: ["bottom", "top"],
                    vertical: ["bottom", "top"],
                    down: ["top", "bottom"],
                    left: ["right", "left"],
                    horizontal: ["right", "left"],
                    right: ["left", "right"]
                },
                s = t(this),
                o = e.direction || "up",
                r = s.cssClip(),
                a = {
                    clip: t.extend({}, r)
                },
                l = t.effects.createPlaceholder(s);
            a.clip[n[o][0]] = a.clip[n[o][1]], "show" === e.mode && (s.cssClip(a.clip), l && l.css(t.effects.clipToBox(a)), a.clip = r), l && l.animate(t.effects.clipToBox(a), e.duration, e.easing), s.animate(a, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("bounce", function(e, i) {
            var n, s, o, r = t(this),
                a = e.mode,
                l = "hide" === a,
                h = "show" === a,
                u = e.direction || "up",
                c = e.distance,
                d = e.times || 5,
                p = 2 * d + (h || l ? 1 : 0),
                f = e.duration / p,
                g = e.easing,
                m = "up" === u || "down" === u ? "top" : "left",
                v = "up" === u || "left" === u,
                _ = 0,
                b = r.queue().length;
            for (t.effects.createPlaceholder(r), o = r.css(m), c || (c = r["top" === m ? "outerHeight" : "outerWidth"]() / 3), h && (s = {
                    opacity: 1
                }, s[m] = o, r.css("opacity", 0).css(m, v ? 2 * -c : 2 * c).animate(s, f, g)), l && (c /= Math.pow(2, d - 1)), s = {}, s[m] = o; _ < d; _++) n = {}, n[m] = (v ? "-=" : "+=") + c, r.animate(n, f, g).animate(s, f, g), c = l ? 2 * c : c / 2;
            l && (n = {
                opacity: 0
            }, n[m] = (v ? "-=" : "+=") + c, r.animate(n, f, g)), r.queue(i), t.effects.unshift(r, b, p + 1)
        }), t.effects.define("clip", "hide", function(e, i) {
            var n, s = {},
                o = t(this),
                r = e.direction || "vertical",
                a = "both" === r,
                l = a || "horizontal" === r,
                h = a || "vertical" === r;
            n = o.cssClip(), s.clip = {
                top: h ? (n.bottom - n.top) / 2 : n.top,
                right: l ? (n.right - n.left) / 2 : n.right,
                bottom: h ? (n.bottom - n.top) / 2 : n.bottom,
                left: l ? (n.right - n.left) / 2 : n.left
            }, t.effects.createPlaceholder(o), "show" === e.mode && (o.cssClip(s.clip), s.clip = n), o.animate(s, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("drop", "hide", function(e, i) {
            var n, s = t(this),
                o = e.mode,
                r = "show" === o,
                a = e.direction || "left",
                l = "up" === a || "down" === a ? "top" : "left",
                h = "up" === a || "left" === a ? "-=" : "+=",
                u = "+=" === h ? "-=" : "+=",
                c = {
                    opacity: 0
                };
            t.effects.createPlaceholder(s), n = e.distance || s["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, c[l] = h + n, r && (s.css(c), c[l] = u + n, c.opacity = 1), s.animate(c, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("explode", "hide", function(e, i) {
            function n() {
                b.push(this), b.length === c * d && s()
            }

            function s() {
                p.css({
                    visibility: "visible"
                }), t(b).remove(), i()
            }
            var o, r, a, l, h, u, c = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
                d = c,
                p = t(this),
                f = e.mode,
                g = "show" === f,
                m = p.show().css("visibility", "hidden").offset(),
                v = Math.ceil(p.outerWidth() / d),
                _ = Math.ceil(p.outerHeight() / c),
                b = [];
            for (o = 0; o < c; o++)
                for (l = m.top + o * _, u = o - (c - 1) / 2, r = 0; r < d; r++) a = m.left + r * v, h = r - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -r * v,
                    top: -o * _
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: v,
                    height: _,
                    left: a + (g ? h * v : 0),
                    top: l + (g ? u * _ : 0),
                    opacity: g ? 0 : 1
                }).animate({
                    left: a + (g ? 0 : h * v),
                    top: l + (g ? 0 : u * _),
                    opacity: g ? 1 : 0
                }, e.duration || 500, e.easing, n)
        }), t.effects.define("fade", "toggle", function(e, i) {
            var n = "show" === e.mode;
            t(this).css("opacity", n ? 0 : 1).animate({
                opacity: n ? 1 : 0
            }, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("fold", "hide", function(e, i) {
            var n = t(this),
                s = e.mode,
                o = "show" === s,
                r = "hide" === s,
                a = e.size || 15,
                l = /([0-9]+)%/.exec(a),
                h = !!e.horizFirst,
                u = h ? ["right", "bottom"] : ["bottom", "right"],
                c = e.duration / 2,
                d = t.effects.createPlaceholder(n),
                p = n.cssClip(),
                f = {
                    clip: t.extend({}, p)
                },
                g = {
                    clip: t.extend({}, p)
                },
                m = [p[u[0]], p[u[1]]],
                v = n.queue().length;
            l && (a = parseInt(l[1], 10) / 100 * m[r ? 0 : 1]), f.clip[u[0]] = a, g.clip[u[0]] = a, g.clip[u[1]] = 0, o && (n.cssClip(g.clip), d && d.css(t.effects.clipToBox(g)), g.clip = p), n.queue(function(i) {
                d && d.animate(t.effects.clipToBox(f), c, e.easing).animate(t.effects.clipToBox(g), c, e.easing), i()
            }).animate(f, c, e.easing).animate(g, c, e.easing).queue(i), t.effects.unshift(n, v, 4)
        }), t.effects.define("highlight", "show", function(e, i) {
            var n = t(this),
                s = {
                    backgroundColor: n.css("backgroundColor")
                };
            "hide" === e.mode && (s.opacity = 0), t.effects.saveStyle(n), n.css({
                backgroundImage: "none",
                backgroundColor: e.color || "#ffff99"
            }).animate(s, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("size", function(e, i) {
            var n, s, o, r = t(this),
                a = ["fontSize"],
                l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                u = e.mode,
                c = "effect" !== u,
                d = e.scale || "both",
                p = e.origin || ["middle", "center"],
                f = r.css("position"),
                g = r.position(),
                m = t.effects.scaledDimensions(r),
                v = e.from || m,
                _ = e.to || t.effects.scaledDimensions(r, 0);
            t.effects.createPlaceholder(r), "show" === u && (o = v, v = _, _ = o), s = {
                from: {
                    y: v.height / m.height,
                    x: v.width / m.width
                },
                to: {
                    y: _.height / m.height,
                    x: _.width / m.width
                }
            }, "box" !== d && "both" !== d || (s.from.y !== s.to.y && (v = t.effects.setTransition(r, l, s.from.y, v), _ = t.effects.setTransition(r, l, s.to.y, _)), s.from.x !== s.to.x && (v = t.effects.setTransition(r, h, s.from.x, v), _ = t.effects.setTransition(r, h, s.to.x, _))), "content" !== d && "both" !== d || s.from.y !== s.to.y && (v = t.effects.setTransition(r, a, s.from.y, v), _ = t.effects.setTransition(r, a, s.to.y, _)), p && (n = t.effects.getBaseline(p, m), v.top = (m.outerHeight - v.outerHeight) * n.y + g.top, v.left = (m.outerWidth - v.outerWidth) * n.x + g.left, _.top = (m.outerHeight - _.outerHeight) * n.y + g.top, _.left = (m.outerWidth - _.outerWidth) * n.x + g.left), r.css(v), "content" !== d && "both" !== d || (l = l.concat(["marginTop", "marginBottom"]).concat(a), h = h.concat(["marginLeft", "marginRight"]), r.find("*[width]").each(function() {
                var i = t(this),
                    n = t.effects.scaledDimensions(i),
                    o = {
                        height: n.height * s.from.y,
                        width: n.width * s.from.x,
                        outerHeight: n.outerHeight * s.from.y,
                        outerWidth: n.outerWidth * s.from.x
                    },
                    r = {
                        height: n.height * s.to.y,
                        width: n.width * s.to.x,
                        outerHeight: n.height * s.to.y,
                        outerWidth: n.width * s.to.x
                    };
                s.from.y !== s.to.y && (o = t.effects.setTransition(i, l, s.from.y, o), r = t.effects.setTransition(i, l, s.to.y, r)), s.from.x !== s.to.x && (o = t.effects.setTransition(i, h, s.from.x, o), r = t.effects.setTransition(i, h, s.to.x, r)), c && t.effects.saveStyle(i), i.css(o), i.animate(r, e.duration, e.easing, function() {
                    c && t.effects.restoreStyle(i)
                })
            })), r.animate(_, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    var e = r.offset();
                    0 === _.opacity && r.css("opacity", v.opacity), c || (r.css("position", "static" === f ? "relative" : f).offset(e), t.effects.saveStyle(r)), i()
                }
            })
        }), t.effects.define("scale", function(e, i) {
            var n = t(this),
                s = e.mode,
                o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "effect" !== s ? 0 : 100),
                r = t.extend(!0, {
                    from: t.effects.scaledDimensions(n),
                    to: t.effects.scaledDimensions(n, o, e.direction || "both"),
                    origin: e.origin || ["middle", "center"]
                }, e);
            e.fade && (r.from.opacity = 1, r.to.opacity = 0), t.effects.effect.size.call(this, r, i)
        }), t.effects.define("puff", "hide", function(e, i) {
            var n = t.extend(!0, {}, e, {
                fade: !0,
                percent: parseInt(e.percent, 10) || 150
            });
            t.effects.effect.scale.call(this, n, i)
        }), t.effects.define("pulsate", "show", function(e, i) {
            var n = t(this),
                s = e.mode,
                o = "show" === s,
                r = "hide" === s,
                a = o || r,
                l = 2 * (e.times || 5) + (a ? 1 : 0),
                h = e.duration / l,
                u = 0,
                c = 1,
                d = n.queue().length;
            for (!o && n.is(":visible") || (n.css("opacity", 0).show(), u = 1); c < l; c++) n.animate({
                opacity: u
            }, h, e.easing), u = 1 - u;
            n.animate({
                opacity: u
            }, h, e.easing), n.queue(i), t.effects.unshift(n, d, l + 1)
        }), t.effects.define("shake", function(e, i) {
            var n = 1,
                s = t(this),
                o = e.direction || "left",
                r = e.distance || 20,
                a = e.times || 3,
                l = 2 * a + 1,
                h = Math.round(e.duration / l),
                u = "up" === o || "down" === o ? "top" : "left",
                c = "up" === o || "left" === o,
                d = {},
                p = {},
                f = {},
                g = s.queue().length;
            for (t.effects.createPlaceholder(s), d[u] = (c ? "-=" : "+=") + r, p[u] = (c ? "+=" : "-=") + 2 * r, f[u] = (c ? "-=" : "+=") + 2 * r, s.animate(d, h, e.easing); n < a; n++) s.animate(p, h, e.easing).animate(f, h, e.easing);
            s.animate(p, h, e.easing).animate(d, h / 2, e.easing).queue(i), t.effects.unshift(s, g, l + 1)
        }), t.effects.define("slide", "show", function(e, i) {
            var n, s, o = t(this),
                r = {
                    up: ["bottom", "top"],
                    down: ["top", "bottom"],
                    left: ["right", "left"],
                    right: ["left", "right"]
                },
                a = e.mode,
                l = e.direction || "left",
                h = "up" === l || "down" === l ? "top" : "left",
                u = "up" === l || "left" === l,
                c = e.distance || o["top" === h ? "outerHeight" : "outerWidth"](!0),
                d = {};
            t.effects.createPlaceholder(o), n = o.cssClip(), s = o.position()[h], d[h] = (u ? -1 : 1) * c + s, d.clip = o.cssClip(), d.clip[r[l][1]] = d.clip[r[l][0]], "show" === a && (o.cssClip(d.clip), o.css(h, d[h]), d.clip = n, d[h] = s), o.animate(d, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        });
        !1 !== t.uiBackCompat && t.effects.define("transfer", function(e, i) {
            t(this).transfer(e, i)
        });
        t.ui.focusable = function(i, n) {
            var s, o, r, a, l, h = i.nodeName.toLowerCase();
            return "area" === h ? (s = i.parentNode, o = s.name, !(!i.href || !o || "map" !== s.nodeName.toLowerCase()) && (r = t("img[usemap='#" + o + "']"), r.length > 0 && r.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(h) ? (a = !i.disabled) && (l = t(i).closest("fieldset")[0]) && (a = !l.disabled) : a = "a" === h ? i.href || n : n, a && t(i).is(":visible") && e(t(i)))
        }, t.extend(t.expr[":"], {
            focusable: function(e) {
                return t.ui.focusable(e, null != t.attr(e, "tabindex"))
            }
        });
        t.ui.focusable, t.fn.form = function() {
            return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form)
        }, t.ui.formResetMixin = {
            _formResetHandler: function() {
                var e = t(this);
                setTimeout(function() {
                    var i = e.data("ui-form-reset-instances");
                    t.each(i, function() {
                        this.refresh()
                    })
                })
            },
            _bindFormResetHandler: function() {
                if (this.form = this.element.form(), this.form.length) {
                    var t = this.form.data("ui-form-reset-instances") || [];
                    t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t)
                }
            },
            _unbindFormResetHandler: function() {
                if (this.form.length) {
                    var e = this.form.data("ui-form-reset-instances");
                    e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
                }
            }
        };
        "1.7" === t.fn.jquery.substring(0, 3) && (t.each(["Width", "Height"], function(e, i) {
            function n(e, i, n, o) {
                return t.each(s, function() {
                    i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                }), i
            }
            var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                o = i.toLowerCase(),
                r = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
            t.fn["inner" + i] = function(e) {
                return void 0 === e ? r["inner" + i].call(this) : this.each(function() {
                    t(this).css(o, n(this, e) + "px")
                })
            }, t.fn["outer" + i] = function(e, s) {
                return "number" != typeof e ? r["outer" + i].call(this, e) : this.each(function() {
                    t(this).css(o, n(this, e, !0, s) + "px")
                })
            }
        }), t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        });
        t.ui.keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }, t.ui.escapeSelector = function() {
            return function(t) {
                return t.replace(/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g, "\\$1")
            }
        }(), t.fn.labels = function() {
            var e, i, n, s, o;
            return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (s = this.eq(0).parents("label"), n = this.attr("id"), n && (e = this.eq(0).parents().last(), o = e.add(e.length ? e.siblings() : this.siblings()), i = "label[for='" + t.ui.escapeSelector(n) + "']", s = s.add(o.find(i).addBack(i))), this.pushStack(s))
        }, t.fn.scrollParent = function(e) {
            var i = this.css("position"),
                n = "absolute" === i,
                s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                o = this.parents().filter(function() {
                    var e = t(this);
                    return (!n || "static" !== e.css("position")) && s.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                }).eq(0);
            return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
        }, t.extend(t.expr[":"], {
            tabbable: function(e) {
                var i = t.attr(e, "tabindex"),
                    n = null != i;
                return (!n || i >= 0) && t.ui.focusable(e, n)
            }
        }), t.fn.extend({
            uniqueId: function() {
                var t = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++t)
                    })
                }
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
                })
            }
        }), t.widget("ui.accordion", {
            version: "1.12.1",
            options: {
                active: 0,
                animate: {},
                classes: {
                    "ui-accordion-header": "ui-corner-top",
                    "ui-accordion-header-collapsed": "ui-corner-all",
                    "ui-accordion-content": "ui-corner-bottom"
                },
                collapsible: !1,
                event: "click",
                header: "> li > :first-child, > :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            hideProps: {
                borderTopWidth: "hide",
                borderBottomWidth: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                height: "hide"
            },
            showProps: {
                borderTopWidth: "show",
                borderBottomWidth: "show",
                paddingTop: "show",
                paddingBottom: "show",
                height: "show"
            },
            _create: function() {
                var e = this.options;
                this.prevShow = this.prevHide = t(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), e.collapsible || !1 !== e.active && null != e.active || (e.active = 0), this._processPanels(), e.active < 0 && (e.active += this.headers.length), this._refresh()
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : t()
                }
            },
            _createIcons: function() {
                var e, i, n = this.options.icons;
                n && (e = t("<span>"), this._addClass(e, "ui-accordion-header-icon", "ui-icon " + n.header), e.prependTo(this.headers), i = this.active.children(".ui-accordion-header-icon"), this._removeClass(i, n.header)._addClass(i, null, n.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove()
            },
            _destroy: function() {
                var t;
                this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "")
            },
            _setOption: function(t, e) {
                if ("active" === t) return void this._activate(e);
                "event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || !1 !== this.options.active || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons())
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t)
            },
            _keydown: function(e) {
                if (!e.altKey && !e.ctrlKey) {
                    var i = t.ui.keyCode,
                        n = this.headers.length,
                        s = this.headers.index(e.target),
                        o = !1;
                    switch (e.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            o = this.headers[(s + 1) % n];
                            break;
                        case i.LEFT:
                        case i.UP:
                            o = this.headers[(s - 1 + n) % n];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._eventHandler(e);
                            break;
                        case i.HOME:
                            o = this.headers[0];
                            break;
                        case i.END:
                            o = this.headers[n - 1]
                    }
                    o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), t(o).trigger("focus"), e.preventDefault())
                }
            },
            _panelKeyDown: function(e) {
                e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().trigger("focus")
            },
            refresh: function() {
                var e = this.options;
                this._processPanels(), !1 === e.active && !0 === e.collapsible || !this.headers.length ? (e.active = !1, this.active = t()) : !1 === e.active ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
            },
            _processPanels: function() {
                var t = this.headers,
                    e = this.panels;
                this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)))
            },
            _refresh: function() {
                var e, i = this.options,
                    n = i.heightStyle,
                    s = this.element.parent();
                this.active = this._findActive(i.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function() {
                    var e = t(this),
                        i = e.uniqueId().attr("id"),
                        n = e.next(),
                        s = n.uniqueId().attr("id");
                    e.attr("aria-controls", s), n.attr("aria-labelledby", i)
                }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-hidden": "true"
                }).hide(), this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === n ? (e = s.height(), this.element.siblings(":visible").each(function() {
                    var i = t(this),
                        n = i.css("position");
                    "absolute" !== n && "fixed" !== n && (e -= i.outerHeight(!0))
                }), this.headers.each(function() {
                    e -= t(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
                }).css("overflow", "auto")) : "auto" === n && (e = 0, this.headers.next().each(function() {
                    var i = t(this).is(":visible");
                    i || t(this).show(), e = Math.max(e, t(this).css("height", "").height()), i || t(this).hide()
                }).height(e))
            },
            _activate: function(e) {
                var i = this._findActive(e)[0];
                i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: t.noop
                }))
            },
            _findActive: function(e) {
                return "number" == typeof e ? this.headers.eq(e) : t()
            },
            _setupEvents: function(e) {
                var i = {
                    keydown: "_keydown"
                };
                e && t.each(e.split(" "), function(t, e) {
                    i[e] = "_eventHandler"
                }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                }), this._hoverable(this.headers), this._focusable(this.headers)
            },
            _eventHandler: function(e) {
                var i, n, s = this.options,
                    o = this.active,
                    r = t(e.currentTarget),
                    a = r[0] === o[0],
                    l = a && s.collapsible,
                    h = l ? t() : r.next(),
                    u = o.next(),
                    c = {
                        oldHeader: o,
                        oldPanel: u,
                        newHeader: l ? t() : r,
                        newPanel: h
                    };
                e.preventDefault(), a && !s.collapsible || !1 === this._trigger("beforeActivate", e, c) || (s.active = !l && this.headers.index(r), this.active = a ? t() : r, this._toggle(c), this._removeClass(o, "ui-accordion-header-active", "ui-state-active"), s.icons && (i = o.children(".ui-accordion-header-icon"), this._removeClass(i, null, s.icons.activeHeader)._addClass(i, null, s.icons.header)), a || (this._removeClass(r, "ui-accordion-header-collapsed")._addClass(r, "ui-accordion-header-active", "ui-state-active"), s.icons && (n = r.children(".ui-accordion-header-icon"), this._removeClass(n, null, s.icons.header)._addClass(n, null, s.icons.activeHeader)), this._addClass(r.next(), "ui-accordion-content-active")))
            },
            _toggle: function(e) {
                var i = e.newPanel,
                    n = this.prevShow.length ? this.prevShow : e.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = n, this.options.animate ? this._animate(i, n, e) : (n.hide(), i.show(), this._toggleComplete(e)), n.attr({
                    "aria-hidden": "true"
                }), n.prev().attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), i.length && n.length ? n.prev().attr({
                    tabIndex: -1,
                    "aria-expanded": "false"
                }) : i.length && this.headers.filter(function() {
                    return 0 === parseInt(t(this).attr("tabIndex"), 10)
                }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _animate: function(t, e, i) {
                var n, s, o, r = this,
                    a = 0,
                    l = t.css("box-sizing"),
                    h = t.length && (!e.length || t.index() < e.index()),
                    u = this.options.animate || {},
                    c = h && u.down || u,
                    d = function() {
                        r._toggleComplete(i)
                    };
                return "number" == typeof c && (o = c), "string" == typeof c && (s = c), s = s || c.easing || u.easing, o = o || c.duration || u.duration, e.length ? t.length ? (n = t.show().outerHeight(), e.animate(this.hideProps, {
                    duration: o,
                    easing: s,
                    step: function(t, e) {
                        e.now = Math.round(t)
                    }
                }), void t.hide().animate(this.showProps, {
                    duration: o,
                    easing: s,
                    complete: d,
                    step: function(t, i) {
                        i.now = Math.round(t), "height" !== i.prop ? "content-box" === l && (a += i.now) : "content" !== r.options.heightStyle && (i.now = Math.round(n - e.outerHeight() - a), a = 0)
                    }
                })) : e.animate(this.hideProps, o, s, d) : t.animate(this.showProps, o, s, d)
            },
            _toggleComplete: function(t) {
                var e = t.oldPanel,
                    i = e.prev();
                this._removeClass(e, "ui-accordion-content-active"), this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
            }
        }), t.ui.safeActiveElement = function(t) {
            var e;
            try {
                e = t.activeElement
            } catch (i) {
                e = t.body
            }
            return e || (e = t.body), e.nodeName || (e = t.body), e
        }, t.widget("ui.menu", {
            version: "1.12.1",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-caret-1-e"
                },
                items: "> *",
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({
                    role: this.options.role,
                    tabIndex: 0
                }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({
                    "mousedown .ui-menu-item": function(t) {
                        t.preventDefault()
                    },
                    "click .ui-menu-item": function(e) {
                        var i = t(e.target),
                            n = t(t.ui.safeActiveElement(this.document[0]));
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && n.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(e) {
                        if (!this.previousFilter) {
                            var i = t(e.target).closest(".ui-menu-item"),
                                n = t(e.currentTarget);
                            i[0] === n[0] && (this._removeClass(n.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(e, n))
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(t, e) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        e || this.focus(t, i)
                    },
                    blur: function(e) {
                        this._delay(function() {
                            !t.contains(this.element[0], t.ui.safeActiveElement(this.document[0])) && this.collapseAll(e)
                        })
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function(t) {
                        this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                var e = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
                    i = e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), i.children().each(function() {
                    var e = t(this);
                    e.data("ui-menu-submenu-caret") && e.remove()
                })
            },
            _keydown: function(e) {
                var i, n, s, o, r = !0;
                switch (e.keyCode) {
                    case t.ui.keyCode.PAGE_UP:
                        this.previousPage(e);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        this.nextPage(e);
                        break;
                    case t.ui.keyCode.HOME:
                        this._move("first", "first", e);
                        break;
                    case t.ui.keyCode.END:
                        this._move("last", "last", e);
                        break;
                    case t.ui.keyCode.UP:
                        this.previous(e);
                        break;
                    case t.ui.keyCode.DOWN:
                        this.next(e);
                        break;
                    case t.ui.keyCode.LEFT:
                        this.collapse(e);
                        break;
                    case t.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                        break;
                    case t.ui.keyCode.ENTER:
                    case t.ui.keyCode.SPACE:
                        this._activate(e);
                        break;
                    case t.ui.keyCode.ESCAPE:
                        this.collapse(e);
                        break;
                    default:
                        r = !1, n = this.previousFilter || "", o = !1, s = e.keyCode >= 96 && e.keyCode <= 105 ? (e.keyCode - 96).toString() : String.fromCharCode(e.keyCode), clearTimeout(this.filterTimer), s === n ? o = !0 : s = n + s, i = this._filterMenuItems(s), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (s = String.fromCharCode(e.keyCode), i = this._filterMenuItems(s)), i.length ? (this.focus(e, i), this.previousFilter = s, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter
                }
                r && e.preventDefault()
            },
            _activate: function(t) {
                this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
            },
            refresh: function() {
                var e, i, n, s, o, r = this,
                    a = this.options.icons.submenu,
                    l = this.element.find(this.options.menus);
                this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), n = l.filter(":not(.ui-menu)").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var e = t(this),
                        i = e.prev(),
                        n = t("<span>").data("ui-menu-submenu-caret", !0);
                    r._addClass(n, "ui-menu-icon", "ui-icon " + a), i.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", i.attr("id"))
                }), this._addClass(n, "ui-menu", "ui-widget ui-widget-content ui-front"), e = l.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function() {
                    var e = t(this);
                    r._isDivider(e) && r._addClass(e, "ui-menu-divider", "ui-widget-content")
                }), s = i.not(".ui-menu-item, .ui-menu-divider"), o = s.children().not(".ui-menu").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), this._addClass(s, "ui-menu-item")._addClass(o, "ui-menu-item-wrapper"), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function(t, e) {
                if ("icons" === t) {
                    var i = this.element.find(".ui-menu-icon");
                    this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu)
                }
                this._super(t, e)
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.element.attr("aria-disabled", String(t)), this._toggleClass(null, "ui-state-disabled", !!t)
            },
            focus: function(t, e) {
                var i, n, s;
                this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), n = this.active.children(".ui-menu-item-wrapper"), this._addClass(n, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), s = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(s, null, "ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                    item: e
                })
            },
            _scrollIntoView: function(e) {
                var i, n, s, o, r, a;
                this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, s = e.offset().top - this.activeMenu.offset().top - i - n, o = this.activeMenu.scrollTop(), r = this.activeMenu.height(), a = e.outerHeight(), s < 0 ? this.activeMenu.scrollTop(o + s) : s + a > r && this.activeMenu.scrollTop(o + s - r + a))
            },
            blur: function(t, e) {
                e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, {
                    item: this.active
                }), this.active = null)
            },
            _startOpening: function(t) {
                clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(), this._open(t)
                }, this.delay))
            },
            _open: function(e) {
                var i = t.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(e, i) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var n = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                    n.length || (n = this.element), this._close(n), this.blur(e), this._removeClass(n.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = n
                }, this.delay)
            },
            _close: function(t) {
                t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
            },
            _closeOnDocumentClick: function(e) {
                return !t(e.target).closest(".ui-menu").length
            },
            _isDivider: function(t) {
                return !/[^\-\u2014\u2013\s]/.test(t.text())
            },
            collapse: function(t) {
                var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                e && e.length && (this._close(), this.focus(t, e))
            },
            expand: function(t) {
                var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                e && e.length && (this._open(e.parent()), this._delay(function() {
                    this.focus(t, e)
                }))
            },
            next: function(t) {
                this._move("next", "first", t)
            },
            previous: function(t) {
                this._move("prev", "last", t)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(t, e, i) {
                var n;
                this.active && (n = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.find(this.options.items)[e]()), this.focus(i, n)
            },
            nextPage: function(e) {
                var i, n, s;
                if (!this.active) return void this.next(e);
                this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - n - s < 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
            },
            previousPage: function(e) {
                var i, n, s;
                if (!this.active) return void this.next(e);
                this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - n + s > 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first()))
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(e) {
                this.active = this.active || t(e.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
            },
            _filterMenuItems: function(e) {
                var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    n = new RegExp("^" + i, "i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                    return n.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))
                })
            }
        });
        t.widget("ui.autocomplete", {
            version: "1.12.1",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var e, i, n, s = this.element[0].nodeName.toLowerCase(),
                    o = "textarea" === s,
                    r = "input" === s;
                this.isMultiLine = o || !r && this._isContentEditable(this.element), this.valueMethod = this.element[o || r ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(s) {
                        if (this.element.prop("readOnly")) return e = !0, n = !0, void(i = !0);
                        e = !1, n = !1, i = !1;
                        var o = t.ui.keyCode;
                        switch (s.keyCode) {
                            case o.PAGE_UP:
                                e = !0, this._move("previousPage", s);
                                break;
                            case o.PAGE_DOWN:
                                e = !0, this._move("nextPage", s);
                                break;
                            case o.UP:
                                e = !0, this._keyEvent("previous", s);
                                break;
                            case o.DOWN:
                                e = !0, this._keyEvent("next", s);
                                break;
                            case o.ENTER:
                                this.menu.active && (e = !0, s.preventDefault(), this.menu.select(s));
                                break;
                            case o.TAB:
                                this.menu.active && this.menu.select(s);
                                break;
                            case o.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(s), s.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(s)
                        }
                    },
                    keypress: function(n) {
                        if (e) return e = !1, void(this.isMultiLine && !this.menu.element.is(":visible") || n.preventDefault());
                        if (!i) {
                            var s = t.ui.keyCode;
                            switch (n.keyCode) {
                                case s.PAGE_UP:
                                    this._move("previousPage", n);
                                    break;
                                case s.PAGE_DOWN:
                                    this._move("nextPage", n);
                                    break;
                                case s.UP:
                                    this._keyEvent("previous", n);
                                    break;
                                case s.DOWN:
                                    this._keyEvent("next", n)
                            }
                        }
                    },
                    input: function(t) {
                        if (n) return n = !1, void t.preventDefault();
                        this._searchTimeout(t)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(t) {
                        if (this.cancelBlur) return void delete this.cancelBlur;
                        clearTimeout(this.searching), this.close(t), this._change(t)
                    }
                }), this._initSource(), this.menu = t("<ul>").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, {
                    mousedown: function(e) {
                        e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur, this.element[0] !== t.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
                        })
                    },
                    menufocus: function(e, i) {
                        var n, s;
                        if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) return this.menu.blur(), void this.document.one("mousemove", function() {
                            t(e.target).trigger(e.originalEvent)
                        });
                        s = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {
                            item: s
                        }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value), (n = i.item.attr("aria-label") || s.value) && t.trim(n).length && (this.liveRegion.children().hide(), t("<div>").text(n).appendTo(this.liveRegion))
                    },
                    menuselect: function(e, i) {
                        var n = i.item.data("ui-autocomplete-item"),
                            s = this.previous;
                        this.element[0] !== t.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = s, this._delay(function() {
                            this.previous = s, this.selectedItem = n
                        })), !1 !== this._trigger("select", e, {
                            item: n
                        }) && this._value(n.value), this.term = this._value(), this.close(e), this.selectedItem = n
                    }
                }), this.liveRegion = t("<div>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(t, e) {
                this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
            },
            _isEventTargetInWidget: function(e) {
                var i = this.menu.element[0];
                return e.target === this.element[0] || e.target === i || t.contains(i, e.target)
            },
            _closeOnClickOutside: function(t) {
                this._isEventTargetInWidget(t) || this.close()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
            },
            _initSource: function() {
                var e, i, n = this;
                t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, n) {
                    n(t.ui.autocomplete.filter(e, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, s) {
                    n.xhr && n.xhr.abort(), n.xhr = t.ajax({
                        url: i,
                        data: e,
                        dataType: "json",
                        success: function(t) {
                            s(t)
                        },
                        error: function() {
                            s([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(t) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    var e = this.term === this._value(),
                        i = this.menu.element.is(":visible"),
                        n = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                    e && (!e || i || n) || (this.selectedItem = null, this.search(null, t))
                }, this.options.delay)
            },
            search: function(t, e) {
                return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : !1 !== this._trigger("search", e) ? this._search(t) : void 0
            },
            _search: function(t) {
                this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: t
                }, this._response())
            },
            _response: function() {
                var e = ++this.requestIndex;
                return t.proxy(function(t) {
                    e === this.requestIndex && this.__response(t), --this.pending || this._removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function(t) {
                t && (t = this._normalize(t)), this._trigger("response", null, {
                    content: t
                }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
            },
            close: function(t) {
                this.cancelSearch = !0, this._close(t)
            },
            _close: function(t) {
                this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
            },
            _change: function(t) {
                this.previous !== this._value() && this._trigger("change", t, {
                    item: this.selectedItem
                })
            },
            _normalize: function(e) {
                return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                    return "string" == typeof e ? {
                        label: e,
                        value: e
                    } : t.extend({}, e, {
                        label: e.label || e.value,
                        value: e.value || e.label
                    })
                })
            },
            _suggest: function(e) {
                var i = this.menu.element.empty();
                this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, {
                    mousedown: "_closeOnClickOutside"
                })
            },
            _resizeMenu: function() {
                var t = this.menu.element;
                t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(e, i) {
                var n = this;
                t.each(i, function(t, i) {
                    n._renderItemData(e, i)
                })
            },
            _renderItemData: function(t, e) {
                return this._renderItem(t, e).data("ui-autocomplete-item", e)
            },
            _renderItem: function(e, i) {
                return t("<li>").append(t("<div>").text(i.label)).appendTo(e)
            },
            _move: function(t, e) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(t, e) {
                this.isMultiLine && !this.menu.element.is(":visible") || (this._move(t, e), e.preventDefault())
            },
            _isContentEditable: function(t) {
                if (!t.length) return !1;
                var e = t.prop("contentEditable");
                return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e
            }
        }), t.extend(t.ui.autocomplete, {
            escapeRegex: function(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(e, i) {
                var n = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                return t.grep(e, function(t) {
                    return n.test(t.label || t.value || t)
                })
            }
        }), t.widget("ui.autocomplete", t.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(t) {
                        return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(e) {
                var i;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
            }
        });
        t.ui.autocomplete, t.widget("ui.controlgroup", {
            version: "1.12.1",
            defaultElement: "<div>",
            options: {
                direction: "horizontal",
                disabled: null,
                onlyVisible: !0,
                items: {
                    button: "input[type=button], input[type=submit], input[type=reset], button, a",
                    controlgroupLabel: ".ui-controlgroup-label",
                    checkboxradio: "input[type='checkbox'], input[type='radio']",
                    selectmenu: "select",
                    spinner: ".ui-spinner-input"
                }
            },
            _create: function() {
                this._enhance()
            },
            _enhance: function() {
                this.element.attr("role", "toolbar"), this.refresh()
            },
            _destroy: function() {
                this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
            },
            _initWidgets: function() {
                var e = this,
                    i = [];
                t.each(this.options.items, function(n, s) {
                    var o, r = {};
                    if (s) return "controlgroupLabel" === n ? (o = e.element.find(s), o.each(function() {
                            var e = t(this);
                            e.children(".ui-controlgroup-label-contents").length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
                        }),
                        e._addClass(o, null, "ui-widget ui-widget-content ui-state-default"), void(i = i.concat(o.get()))) : void(t.fn[n] && (r = e["_" + n + "Options"] ? e["_" + n + "Options"]("middle") : {
                        classes: {}
                    }, e.element.find(s).each(function() {
                        var s = t(this),
                            o = s[n]("instance"),
                            a = t.widget.extend({}, r);
                        if ("button" !== n || !s.parent(".ui-spinner").length) {
                            o || (o = s[n]()[n]("instance")), o && (a.classes = e._resolveClassesValues(a.classes, o)), s[n](a);
                            var l = s[n]("widget");
                            t.data(l[0], "ui-controlgroup-data", o || s[n]("instance")), i.push(l[0])
                        }
                    })))
                }), this.childWidgets = t(t.unique(i)), this._addClass(this.childWidgets, "ui-controlgroup-item")
            },
            _callChildMethod: function(e) {
                this.childWidgets.each(function() {
                    var i = t(this),
                        n = i.data("ui-controlgroup-data");
                    n && n[e] && n[e]()
                })
            },
            _updateCornerClass: function(t, e) {
                var i = this._buildSimpleOptions(e, "label").classes.label;
                this._removeClass(t, null, "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"), this._addClass(t, null, i)
            },
            _buildSimpleOptions: function(t, e) {
                var i = "vertical" === this.options.direction,
                    n = {
                        classes: {}
                    };
                return n.classes[e] = {
                    middle: "",
                    first: "ui-corner-" + (i ? "top" : "left"),
                    last: "ui-corner-" + (i ? "bottom" : "right"),
                    only: "ui-corner-all"
                }[t], n
            },
            _spinnerOptions: function(t) {
                var e = this._buildSimpleOptions(t, "ui-spinner");
                return e.classes["ui-spinner-up"] = "", e.classes["ui-spinner-down"] = "", e
            },
            _buttonOptions: function(t) {
                return this._buildSimpleOptions(t, "ui-button")
            },
            _checkboxradioOptions: function(t) {
                return this._buildSimpleOptions(t, "ui-checkboxradio-label")
            },
            _selectmenuOptions: function(t) {
                var e = "vertical" === this.options.direction;
                return {
                    width: !!e && "auto",
                    classes: {
                        middle: {
                            "ui-selectmenu-button-open": "",
                            "ui-selectmenu-button-closed": ""
                        },
                        first: {
                            "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
                            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left")
                        },
                        last: {
                            "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
                            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right")
                        },
                        only: {
                            "ui-selectmenu-button-open": "ui-corner-top",
                            "ui-selectmenu-button-closed": "ui-corner-all"
                        }
                    }[t]
                }
            },
            _resolveClassesValues: function(e, i) {
                var n = {};
                return t.each(e, function(s) {
                    var o = i.options.classes[s] || "";
                    o = t.trim(o.replace(/ui-corner-([a-z]){2,6}/g, "")), n[s] = (o + " " + e[s]).replace(/\s+/g, " ")
                }), n
            },
            _setOption: function(t, e) {
                if ("direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" === t) return void this._callChildMethod(e ? "disable" : "enable");
                this.refresh()
            },
            refresh: function() {
                var e, i = this;
                this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), e = this.childWidgets, this.options.onlyVisible && (e = e.filter(":visible")), e.length && (t.each(["first", "last"], function(t, n) {
                    var s = e[n]().data("ui-controlgroup-data");
                    if (s && i["_" + s.widgetName + "Options"]) {
                        var o = i["_" + s.widgetName + "Options"](1 === e.length ? "only" : n);
                        o.classes = i._resolveClassesValues(o.classes, s), s.element[s.widgetName](o)
                    } else i._updateCornerClass(e[n](), n)
                }), this._callChildMethod("refresh"))
            }
        });
        t.widget("ui.checkboxradio", [t.ui.formResetMixin, {
            version: "1.12.1",
            options: {
                disabled: null,
                label: null,
                icon: !0,
                classes: {
                    "ui-checkboxradio-label": "ui-corner-all",
                    "ui-checkboxradio-icon": "ui-corner-all"
                }
            },
            _getCreateOptions: function() {
                var e, i, n = this,
                    s = this._super() || {};
                return this._readType(), i = this.element.labels(), this.label = t(i[i.length - 1]), this.label.length || t.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function() {
                    n.originalLabel += 3 === this.nodeType ? t(this).text() : this.outerHTML
                }), this.originalLabel && (s.label = this.originalLabel), e = this.element[0].disabled, null != e && (s.disabled = e), s
            },
            _create: function() {
                var t = this.element[0].checked;
                this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), t && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({
                    change: "_toggleClasses",
                    focus: function() {
                        this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                    },
                    blur: function() {
                        this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                    }
                })
            },
            _readType: function() {
                var e = this.element[0].nodeName.toLowerCase();
                this.type = this.element[0].type, "input" === e && /radio|checkbox/.test(this.type) || t.error("Can't create checkboxradio on element.nodeName=" + e + " and element.type=" + this.type)
            },
            _enhance: function() {
                this._updateIcon(this.element[0].checked)
            },
            widget: function() {
                return this.label
            },
            _getRadioGroup: function() {
                var e, i = this.element[0].name,
                    n = "input[name='" + t.ui.escapeSelector(i) + "']";
                return i ? (e = this.form.length ? t(this.form[0].elements).filter(n) : t(n).filter(function() {
                    return 0 === t(this).form().length
                }), e.not(this.element)) : t([])
            },
            _toggleClasses: function() {
                var e = this.element[0].checked;
                this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", e)._toggleClass(this.icon, null, "ui-icon-blank", !e), "radio" === this.type && this._getRadioGroup().each(function() {
                    var e = t(this).checkboxradio("instance");
                    e && e._removeClass(e.label, "ui-checkboxradio-checked", "ui-state-active")
                })
            },
            _destroy: function() {
                this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove())
            },
            _setOption: function(t, e) {
                if ("label" !== t || e) {
                    if (this._super(t, e), "disabled" === t) return this._toggleClass(this.label, null, "ui-state-disabled", e), void(this.element[0].disabled = e);
                    this.refresh()
                }
            },
            _updateIcon: function(e) {
                var i = "ui-icon ui-icon-background ";
                this.options.icon ? (this.icon || (this.icon = t("<span>"), this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += e ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, e ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), e || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
            },
            _updateLabel: function() {
                var t = this.label.contents().not(this.element[0]);
                this.icon && (t = t.not(this.icon[0])), this.iconSpace && (t = t.not(this.iconSpace[0])), t.remove(), this.label.append(this.options.label)
            },
            refresh: function() {
                var t = this.element[0].checked,
                    e = this.element[0].disabled;
                this._updateIcon(t), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), null !== this.options.label && this._updateLabel(), e !== this.options.disabled && this._setOptions({
                    disabled: e
                })
            }
        }]);
        t.ui.checkboxradio;
        t.widget("ui.button", {
            version: "1.12.1",
            defaultElement: "<button>",
            options: {
                classes: {
                    "ui-button": "ui-corner-all"
                },
                disabled: null,
                icon: null,
                iconPosition: "beginning",
                label: null,
                showLabel: !0
            },
            _getCreateOptions: function() {
                var t, e = this._super() || {};
                return this.isInput = this.element.is("input"), t = this.element[0].disabled, null != t && (e.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (e.label = this.originalLabel), e
            },
            _create: function() {
                !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
                    keyup: function(e) {
                        e.keyCode === t.ui.keyCode.SPACE && (e.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                    }
                })
            },
            _enhance: function() {
                this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
            },
            _updateTooltip: function() {
                this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label)
            },
            _updateIcon: function(e, i) {
                var n = "iconPosition" !== e,
                    s = n ? this.options.iconPosition : i,
                    o = "top" === s || "bottom" === s;
                this.icon ? n && this._removeClass(this.icon, null, this.options.icon) : (this.icon = t("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), n && this._addClass(this.icon, null, i), this._attachIcon(s), o ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(s))
            },
            _destroy: function() {
                this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title")
            },
            _attachIconSpace: function(t) {
                this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace)
            },
            _attachIcon: function(t) {
                this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon)
            },
            _setOptions: function(t) {
                var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
                    i = void 0 === t.icon ? this.options.icon : t.icon;
                e || i || (t.showLabel = !0), this._super(t)
            },
            _setOption: function(t, e) {
                "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, e), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, e), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), this.element[0].disabled = e, e && this.element.blur())
            },
            refresh: function() {
                var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
                t !== this.options.disabled && this._setOptions({
                    disabled: t
                }), this._updateTooltip()
            }
        }), !1 !== t.uiBackCompat && (t.widget("ui.button", t.ui.button, {
            options: {
                text: !0,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super()
            },
            _setOption: function(t, e) {
                if ("text" === t) return void this._super("showLabel", e);
                "showLabel" === t && (this.options.text = e), "icon" === t && (this.options.icons.primary = e), "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))), this._superApply(arguments)
            }
        }), t.fn.button = function(e) {
            return function() {
                return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? e.apply(this, arguments) : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({
                    icon: !1
                }) : this.checkboxradio.apply(this, arguments))
            }
        }(t.fn.button), t.fn.buttonset = function() {
            return t.ui.controlgroup || t.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
                button: arguments[0].items
            }), this.controlgroup.apply(this, arguments))
        });
        t.ui.button;
        t.extend(t.ui, {
            datepicker: {
                version: "1.12.1"
            }
        });
        var d;
        t.extend(n.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return r(this._defaults, t || {}), this
            },
            _attachDatepicker: function(e, i) {
                var n, s, o;
                n = e.nodeName.toLowerCase(), s = "div" === n || "span" === n, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), s), o.settings = t.extend({}, i || {}), "input" === n ? this._connectDatepicker(e, o) : s && this._inlineDatepicker(e, o)
            },
            _newInst: function(e, i) {
                return {
                    id: e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(e, i) {
                var n = t(e);
                i.append = t([]), i.trigger = t([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
            },
            _attachments: function(e, i) {
                var n, s, o, r = this._get(i, "appendText"),
                    a = this._get(i, "isRTL");
                i.append && i.append.remove(), r && (i.append = t("<span class='" + this._appendClass + "'>" + r + "</span>"), e[a ? "before" : "after"](i.append)), e.off("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), "focus" !== n && "both" !== n || e.on("focus", this._showDatepicker), "button" !== n && "both" !== n || (s = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                    src: o,
                    alt: s,
                    title: s
                }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
                    src: o,
                    alt: s,
                    title: s
                }) : s)), e[a ? "before" : "after"](i.trigger), i.trigger.on("click", function() {
                    return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
                }))
            },
            _autoSize: function(t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e, i, n, s, o = new Date(2009, 11, 20),
                        r = this._get(t, "dateFormat");
                    r.match(/[DM]/) && (e = function(t) {
                        for (i = 0, n = 0, s = 0; s < t.length; s++) t[s].length > i && (i = t[s].length, n = s);
                        return n
                    }, o.setMonth(e(this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
                }
            },
            _inlineDatepicker: function(e, i) {
                var n = t(e);
                n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(e, i, n, s, o) {
                var a, l, h, u, c, d = this._dialogInst;
                return d || (this.uuid += 1, a = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), r(d.settings, s || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, c = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, h / 2 - 150 + c]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this
            },
            _destroyDatepicker: function(e) {
                var i, n = t(e),
                    s = t.data(e, "datepicker");
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== i && "span" !== i || n.removeClass(this.markerClassName).empty(), d === s && (d = null))
            },
            _enableDatepicker: function(e) {
                var i, n, s = t(e),
                    o = t.data(e, "datepicker");
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : "div" !== i && "span" !== i || (n = s.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }))
            },
            _disableDatepicker: function(e) {
                var i, n, s = t(e),
                    o = t.data(e, "datepicker");
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : "div" !== i && "span" !== i || (n = s.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e)
            },
            _isDisabledDatepicker: function(t) {
                if (!t) return !1;
                for (var e = 0; e < this._disabledInputs.length; e++)
                    if (this._disabledInputs[e] === t) return !0;
                return !1
            },
            _getInst: function(e) {
                try {
                    return t.data(e, "datepicker")
                } catch (t) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(e, i, n) {
                var s, o, a, l, h = this._getInst(e);
                if (2 === arguments.length && "string" == typeof i) return "defaults" === i ? t.extend({}, t.datepicker._defaults) : h ? "all" === i ? t.extend({}, h.settings) : this._get(h, i) : null;
                s = i || {}, "string" == typeof i && (s = {}, s[i] = n), h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), a = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), r(h.settings, s), null !== a && void 0 !== s.dateFormat && void 0 === s.minDate && (h.settings.minDate = this._formatDate(h, a)), null !== l && void 0 !== s.dateFormat && void 0 === s.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled" in s && (s.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h))
            },
            _changeDatepicker: function(t, e, i) {
                this._optionDatepicker(t, e, i)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
            },
            _doKeyDown: function(e) {
                var i, n, s, o = t.datepicker._getInst(e.target),
                    r = !0,
                    a = o.dpDiv.is(".ui-datepicker-rtl");
                if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        t.datepicker._hideDatepicker(), r = !1;
                        break;
                    case 13:
                        return s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), s[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, s[0]), i = t.datepicker._get(o, "onSelect"), i ? (n = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [n, o])) : t.datepicker._hideDatepicker(), !1;
                    case 27:
                        t.datepicker._hideDatepicker();
                        break;
                    case 33:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 34:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), r = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), r = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? 1 : -1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), r = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? -1 : 1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), r = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        r = !1
                } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : r = !1;
                r && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function(e) {
                var i, n, s = t.datepicker._getInst(e.target);
                if (t.datepicker._get(s, "constrainInput")) return i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat")), n = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || n < " " || !i || i.indexOf(n) > -1
            },
            _doKeyUp: function(e) {
                var i, n = t.datepicker._getInst(e.target);
                if (n.input.val() !== n.lastVal) try {
                    i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)), i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
                } catch (t) {}
                return !0
            },
            _showDatepicker: function(e) {
                if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                    var n, s, o, a, l, h, u;
                    n = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== n && (t.datepicker._curInst.dpDiv.stop(!0, !0), n && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(n, "beforeShow"), o = s ? s.apply(e, [e, n]) : {}, !1 !== o && (r(n.settings, o), n.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(n), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function() {
                        return !(a |= "fixed" === t(this).css("position"))
                    }), l = {
                        left: t.datepicker._pos[0],
                        top: t.datepicker._pos[1]
                    }, t.datepicker._pos = null, n.dpDiv.empty(), n.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), t.datepicker._updateDatepicker(n), l = t.datepicker._checkOffset(n, l, a), n.dpDiv.css({
                        position: t.datepicker._inDialog && t.blockUI ? "static" : a ? "fixed" : "absolute",
                        display: "none",
                        left: l.left + "px",
                        top: l.top + "px"
                    }), n.inline || (h = t.datepicker._get(n, "showAnim"), u = t.datepicker._get(n, "duration"), n.dpDiv.css("z-index", i(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? n.dpDiv.show(h, t.datepicker._get(n, "showOptions"), u) : n.dpDiv[h || "show"](h ? u : null), t.datepicker._shouldFocusInput(n) && n.input.trigger("focus"), t.datepicker._curInst = n))
                }
            },
            _updateDatepicker: function(e) {
                this.maxRows = 4, d = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                var i, n = this._getNumberOfMonths(e),
                    s = n[1],
                    r = e.dpDiv.find("." + this._dayOverClass + " a");
                r.length > 0 && o.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", 17 * s + "em"), e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                    i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(t) {
                return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
            },
            _checkOffset: function(e, i, n) {
                var s = e.dpDiv.outerWidth(),
                    o = e.dpDiv.outerHeight(),
                    r = e.input ? e.input.outerWidth() : 0,
                    a = e.input ? e.input.outerHeight() : 0,
                    l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
                    h = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
                return i.left -= this._get(e, "isRTL") ? s - r : 0, i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= n && i.top === e.input.offset().top + a ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0), i.top -= Math.min(i.top, i.top + o > h && h > o ? Math.abs(o + a) : 0), i
            },
            _findPos: function(e) {
                for (var i, n = this._getInst(e), s = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[s ? "previousSibling" : "nextSibling"];
                return i = t(e).offset(), [i.left, i.top]
            },
            _hideDatepicker: function(e) {
                var i, n, s, o, r = this._curInst;
                !r || e && r !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(r, "showAnim"), n = this._get(r, "duration"), s = function() {
                    t.datepicker._tidyDialog(r)
                }, t.effects && (t.effects.effect[i] || t.effects[i]) ? r.dpDiv.hide(i, t.datepicker._get(r, "showOptions"), n, s) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, s), i || s(), this._datepickerShowing = !1, o = this._get(r, "onClose"), o && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(e) {
                if (t.datepicker._curInst) {
                    var i = t(e.target),
                        n = t.datepicker._getInst(i[0]);
                    (i[0].id === t.datepicker._mainDivId || 0 !== i.parents("#" + t.datepicker._mainDivId).length || i.hasClass(t.datepicker.markerClassName) || i.closest("." + t.datepicker._triggerClass).length || !t.datepicker._datepickerShowing || t.datepicker._inDialog && t.blockUI) && (!i.hasClass(t.datepicker.markerClassName) || t.datepicker._curInst === n) || t.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(e, i, n) {
                var s = t(e),
                    o = this._getInst(s[0]);
                this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(o, i + ("M" === n ? this._get(o, "showCurrentAtPos") : 0), n), this._updateDatepicker(o))
            },
            _gotoToday: function(e) {
                var i, n = t(e),
                    s = this._getInst(n[0]);
                this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()), this._notifyChange(s), this._adjustDate(n)
            },
            _selectMonthYear: function(e, i, n) {
                var s = t(e),
                    o = this._getInst(s[0]);
                o["selected" + ("M" === n ? "Month" : "Year")] = o["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(s)
            },
            _selectDay: function(e, i, n, s) {
                var o, r = t(e);
                t(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (o = this._getInst(r[0]), o.selectedDay = o.currentDay = t("a", s).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = n, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
            },
            _clearDate: function(e) {
                var i = t(e);
                this._selectDate(i, "")
            },
            _selectDate: function(e, i) {
                var n, s = t(e),
                    o = this._getInst(s[0]);
                i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), n = this._get(o, "onSelect"), n ? n.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.trigger("focus"), this._lastInput = null)
            },
            _updateAlternate: function(e) {
                var i, n, s, o = this._get(e, "altField");
                o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), s = this.formatDate(i, n, this._getFormatConfig(e)), t(o).val(s))
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && e < 6, ""]
            },
            iso8601Week: function(t) {
                var e, i = new Date(t.getTime());
                return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
            },
            parseDate: function(e, i, n) {
                if (null == e || null == i) throw "Invalid arguments";
                if ("" === (i = "object" == typeof i ? i.toString() : i + "")) return null;
                var s, o, r, a, l = 0,
                    h = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    u = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
                    c = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                    d = (n ? n.dayNames : null) || this._defaults.dayNames,
                    p = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                    f = (n ? n.monthNames : null) || this._defaults.monthNames,
                    g = -1,
                    m = -1,
                    v = -1,
                    _ = -1,
                    b = !1,
                    y = function(t) {
                        var i = s + 1 < e.length && e.charAt(s + 1) === t;
                        return i && s++, i
                    },
                    w = function(t) {
                        var e = y(t),
                            n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                            s = "y" === t ? n : 1,
                            o = new RegExp("^\\d{" + s + "," + n + "}"),
                            r = i.substring(l).match(o);
                        if (!r) throw "Missing number at position " + l;
                        return l += r[0].length, parseInt(r[0], 10)
                    },
                    x = function(e, n, s) {
                        var o = -1,
                            r = t.map(y(e) ? s : n, function(t, e) {
                                return [
                                    [e, t]
                                ]
                            }).sort(function(t, e) {
                                return -(t[1].length - e[1].length)
                            });
                        if (t.each(r, function(t, e) {
                                var n = e[1];
                                if (i.substr(l, n.length).toLowerCase() === n.toLowerCase()) return o = e[0], l += n.length, !1
                            }), -1 !== o) return o + 1;
                        throw "Unknown name at position " + l
                    },
                    C = function() {
                        if (i.charAt(l) !== e.charAt(s)) throw "Unexpected literal at position " + l;
                        l++
                    };
                for (s = 0; s < e.length; s++)
                    if (b) "'" !== e.charAt(s) || y("'") ? C() : b = !1;
                    else switch (e.charAt(s)) {
                        case "d":
                            v = w("d");
                            break;
                        case "D":
                            x("D", c, d);
                            break;
                        case "o":
                            _ = w("o");
                            break;
                        case "m":
                            m = w("m");
                            break;
                        case "M":
                            m = x("M", p, f);
                            break;
                        case "y":
                            g = w("y");
                            break;
                        case "@":
                            a = new Date(w("@")), g = a.getFullYear(), m = a.getMonth() + 1, v = a.getDate();
                            break;
                        case "!":
                            a = new Date((w("!") - this._ticksTo1970) / 1e4), g = a.getFullYear(), m = a.getMonth() + 1, v = a.getDate();
                            break;
                        case "'":
                            y("'") ? C() : b = !0;
                            break;
                        default:
                            C()
                    }
                    if (l < i.length && (r = i.substr(l), !/^\s+/.test(r))) throw "Extra/unparsed characters found in date: " + r;
                if (-1 === g ? g = (new Date).getFullYear() : g < 100 && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (g <= u ? 0 : -100)), _ > -1)
                    for (m = 1, v = _;;) {
                        if (o = this._getDaysInMonth(g, m - 1), v <= o) break;
                        m++, v -= o
                    }
                if (a = this._daylightSavingAdjust(new Date(g, m - 1, v)), a.getFullYear() !== g || a.getMonth() + 1 !== m || a.getDate() !== v) throw "Invalid date";
                return a
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(t, e, i) {
                if (!e) return "";
                var n, s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    o = (i ? i.dayNames : null) || this._defaults.dayNames,
                    r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    a = (i ? i.monthNames : null) || this._defaults.monthNames,
                    l = function(e) {
                        var i = n + 1 < t.length && t.charAt(n + 1) === e;
                        return i && n++, i
                    },
                    h = function(t, e, i) {
                        var n = "" + e;
                        if (l(t))
                            for (; n.length < i;) n = "0" + n;
                        return n
                    },
                    u = function(t, e, i, n) {
                        return l(t) ? n[e] : i[e]
                    },
                    c = "",
                    d = !1;
                if (e)
                    for (n = 0; n < t.length; n++)
                        if (d) "'" !== t.charAt(n) || l("'") ? c += t.charAt(n) : d = !1;
                        else switch (t.charAt(n)) {
                            case "d":
                                c += h("d", e.getDate(), 2);
                                break;
                            case "D":
                                c += u("D", e.getDay(), s, o);
                                break;
                            case "o":
                                c += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                c += h("m", e.getMonth() + 1, 2);
                                break;
                            case "M":
                                c += u("M", e.getMonth(), r, a);
                                break;
                            case "y":
                                c += l("y") ? e.getFullYear() : (e.getFullYear() % 100 < 10 ? "0" : "") + e.getFullYear() % 100;
                                break;
                            case "@":
                                c += e.getTime();
                                break;
                            case "!":
                                c += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                l("'") ? c += "'" : d = !0;
                                break;
                            default:
                                c += t.charAt(n)
                        }
                        return c
            },
            _possibleChars: function(t) {
                var e, i = "",
                    n = !1,
                    s = function(i) {
                        var n = e + 1 < t.length && t.charAt(e + 1) === i;
                        return n && e++, n
                    };
                for (e = 0; e < t.length; e++)
                    if (n) "'" !== t.charAt(e) || s("'") ? i += t.charAt(e) : n = !1;
                    else switch (t.charAt(e)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            s("'") ? i += "'" : n = !0;
                            break;
                        default:
                            i += t.charAt(e)
                    }
                    return i
            },
            _get: function(t, e) {
                return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() !== t.lastVal) {
                    var i = this._get(t, "dateFormat"),
                        n = t.lastVal = t.input ? t.input.val() : null,
                        s = this._getDefaultDate(t),
                        o = s,
                        r = this._getFormatConfig(t);
                    try {
                        o = this.parseDate(i, n, r) || s
                    } catch (t) {
                        n = e ? "" : n
                    }
                    t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = n ? o.getDate() : 0, t.currentMonth = n ? o.getMonth() : 0, t.currentYear = n ? o.getFullYear() : 0, this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
            },
            _determineDate: function(e, i, n) {
                var s = null == i || "" === i ? n : "string" == typeof i ? function(i) {
                    try {
                        return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                    } catch (t) {}
                    for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, s = n.getFullYear(), o = n.getMonth(), r = n.getDate(), a = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = a.exec(i); l;) {
                        switch (l[2] || "d") {
                            case "d":
                            case "D":
                                r += parseInt(l[1], 10);
                                break;
                            case "w":
                            case "W":
                                r += 7 * parseInt(l[1], 10);
                                break;
                            case "m":
                            case "M":
                                o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(s, o));
                                break;
                            case "y":
                            case "Y":
                                s += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(s, o))
                        }
                        l = a.exec(i)
                    }
                    return new Date(s, o, r)
                }(i) : "number" == typeof i ? isNaN(i) ? n : function(t) {
                    var e = new Date;
                    return e.setDate(e.getDate() + t), e
                }(i) : new Date(i.getTime());
                return s = s && "Invalid Date" === s.toString() ? n : s, s && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)), this._daylightSavingAdjust(s)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
            },
            _setDate: function(t, e, i) {
                var n = !e,
                    s = t.selectedMonth,
                    o = t.selectedYear,
                    r = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = r.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(), t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(), s === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(n ? "" : this._formatDate(t))
            },
            _getDate: function(t) {
                return !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay))
            },
            _attachHandlers: function(e) {
                var i = this._get(e, "stepMonths"),
                    n = "#" + e.id.replace(/\\\\/g, "\\");
                e.dpDiv.find("[data-handler]").map(function() {
                    var e = {
                        prev: function() {
                            t.datepicker._adjustDate(n, -i, "M")
                        },
                        next: function() {
                            t.datepicker._adjustDate(n, +i, "M")
                        },
                        hide: function() {
                            t.datepicker._hideDatepicker()
                        },
                        today: function() {
                            t.datepicker._gotoToday(n)
                        },
                        selectDay: function() {
                            return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return t.datepicker._selectMonthYear(n, this, "M"), !1
                        },
                        selectYear: function() {
                            return t.datepicker._selectMonthYear(n, this, "Y"), !1
                        }
                    };
                    t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(t) {
                var e, i, n, s, o, r, a, l, h, u, c, d, p, f, g, m, v, _, b, y, w, x, C, T, D, k, E, I, S, A, O, P, N, M, H, L, W, F, R, j = new Date,
                    z = this._daylightSavingAdjust(new Date(j.getFullYear(), j.getMonth(), j.getDate())),
                    B = this._get(t, "isRTL"),
                    q = this._get(t, "showButtonPanel"),
                    U = this._get(t, "hideIfNoPrevNext"),
                    $ = this._get(t, "navigationAsDateFormat"),
                    V = this._getNumberOfMonths(t),
                    Y = this._get(t, "showCurrentAtPos"),
                    K = this._get(t, "stepMonths"),
                    G = 1 !== V[0] || 1 !== V[1],
                    X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    Q = this._getMinMaxDate(t, "min"),
                    J = this._getMinMaxDate(t, "max"),
                    Z = t.drawMonth - Y,
                    tt = t.drawYear;
                if (Z < 0 && (Z += 12, tt--), J)
                    for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - V[0] * V[1] + 1, J.getDate())), e = Q && e < Q ? Q : e; this._daylightSavingAdjust(new Date(tt, Z, 1)) > e;) --Z < 0 && (Z = 11, tt--);
                for (t.drawMonth = Z, t.drawYear = tt, i = this._get(t, "prevText"), i = $ ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, Z - K, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, tt, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>" : U ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>", s = this._get(t, "nextText"), s = $ ? this.formatDate(s, this._daylightSavingAdjust(new Date(tt, Z + K, 1)), this._getFormatConfig(t)) : s, o = this._canAdjustMonth(t, 1, tt, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + s + "</span></a>" : U ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + s + "</span></a>", r = this._get(t, "currentText"), a = this._get(t, "gotoCurrent") && t.currentDay ? X : z, r = $ ? this.formatDate(r, a, this._getFormatConfig(t)) : r, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = q ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (B ? l : "") + (this._isInRange(t, a) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (B ? "" : l) + "</div>" : "", u = parseInt(this._get(t, "firstDay"), 10), u = isNaN(u) ? 0 : u, c = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", x = 0; x < V[0]; x++) {
                    for (C = "", this.maxRows = 4, T = 0; T < V[1]; T++) {
                        if (D = this._daylightSavingAdjust(new Date(tt, Z, t.selectedDay)), k = " ui-corner-all", E = "", G) {
                            if (E += "<div class='ui-datepicker-group", V[1] > 1) switch (T) {
                                case 0:
                                    E += " ui-datepicker-group-first", k = " ui-corner-" + (B ? "right" : "left");
                                    break;
                                case V[1] - 1:
                                    E += " ui-datepicker-group-last", k = " ui-corner-" + (B ? "left" : "right");
                                    break;
                                default:
                                    E += " ui-datepicker-group-middle", k = ""
                            }
                            E += "'>"
                        }
                        for (E += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + k + "'>" + (/all|left/.test(k) && 0 === x ? B ? o : n : "") + (/all|right/.test(k) && 0 === x ? B ? n : o : "") + this._generateMonthYearHeader(t, Z, tt, Q, J, x > 0 || T > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead><tr>", I = c ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; w < 7; w++) S = (w + u) % 7, I += "<th scope='col'" + ((w + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[S] + "'>" + p[S] + "</span></th>";
                        for (E += I + "</tr></thead><tbody>", A = this._getDaysInMonth(tt, Z), tt === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, A)), O = (this._getFirstDayOfMonth(tt, Z) - u + 7) % 7, P = Math.ceil((O + A) / 7), N = G && this.maxRows > P ? this.maxRows : P, this.maxRows = N, M = this._daylightSavingAdjust(new Date(tt, Z, 1 - O)), H = 0; H < N; H++) {
                            for (E += "<tr>", L = c ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(M) + "</td>" : "", w = 0; w < 7; w++) W = m ? m.apply(t.input ? t.input[0] : null, [M]) : [!0, ""], F = M.getMonth() !== Z, R = F && !_ || !W[0] || Q && M < Q || J && M > J, L += "<td class='" + ((w + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (M.getTime() === D.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === M.getTime() && b.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !v ? "" : " " + W[1] + (M.getTime() === X.getTime() ? " " + this._currentClass : "") + (M.getTime() === z.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !v || !W[2] ? "" : " title='" + W[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + M.getMonth() + "' data-year='" + M.getFullYear() + "'") + ">" + (F && !v ? "&#xa0;" : R ? "<span class='ui-state-default'>" + M.getDate() + "</span>" : "<a class='ui-state-default" + (M.getTime() === z.getTime() ? " ui-state-highlight" : "") + (M.getTime() === X.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + M.getDate() + "</a>") + "</td>", M.setDate(M.getDate() + 1), M = this._daylightSavingAdjust(M);
                            E += L + "</tr>"
                        }
                        Z++, Z > 11 && (Z = 0, tt++), E += "</tbody></table>" + (G ? "</div>" + (V[0] > 0 && T === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), C += E
                    }
                    y += C
                }
                return y += h, t._keyEvent = !1, y
            },
            _generateMonthYearHeader: function(t, e, i, n, s, o, r, a) {
                var l, h, u, c, d, p, f, g, m = this._get(t, "changeMonth"),
                    v = this._get(t, "changeYear"),
                    _ = this._get(t, "showMonthAfterYear"),
                    b = "<div class='ui-datepicker-title'>",
                    y = "";
                if (o || !m) y += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
                else {
                    for (l = n && n.getFullYear() === i, h = s && s.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; u < 12; u++)(!l || u >= n.getMonth()) && (!h || u <= s.getMonth()) && (y += "<option value='" + u + "'" + (u === e ? " selected='selected'" : "") + ">" + a[u] + "</option>");
                    y += "</select>"
                }
                if (_ || (b += y + (!o && m && v ? "" : "&#xa0;")), !t.yearshtml)
                    if (t.yearshtml = "", o || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                    else {
                        for (c = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                                var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                                return isNaN(e) ? d : e
                            }, f = p(c[0]), g = Math.max(f, p(c[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, g = s ? Math.min(g, s.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; f <= g; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                        t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                    }
                return b += this._get(t, "yearSuffix"), _ && (b += (!o && m && v ? "" : "&#xa0;") + y), b += "</div>"
            },
            _adjustInstDate: function(t, e, i) {
                var n = t.selectedYear + ("Y" === i ? e : 0),
                    s = t.selectedMonth + ("M" === i ? e : 0),
                    o = Math.min(t.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? e : 0),
                    r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, s, o)));
                t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), "M" !== i && "Y" !== i || this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    n = this._getMinMaxDate(t, "max"),
                    s = i && e < i ? i : e;
                return n && s > n ? n : s
            },
            _notifyChange: function(t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, "numberOfMonths");
                return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null)
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t, e, 1).getDay()
            },
            _canAdjustMonth: function(t, e, i, n) {
                var s = this._getNumberOfMonths(t),
                    o = this._daylightSavingAdjust(new Date(i, n + (e < 0 ? e : s[0] * s[1]), 1));
                return e < 0 && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
            },
            _isInRange: function(t, e) {
                var i, n, s = this._getMinMaxDate(t, "min"),
                    o = this._getMinMaxDate(t, "max"),
                    r = null,
                    a = null,
                    l = this._get(t, "yearRange");
                return l && (i = l.split(":"), n = (new Date).getFullYear(), r = parseInt(i[0], 10), a = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += n), i[1].match(/[+\-].*/) && (a += n)), (!s || e.getTime() >= s.getTime()) && (!o || e.getTime() <= o.getTime()) && (!r || e.getFullYear() >= r) && (!a || e.getFullYear() <= a)
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, "shortYearCutoff");
                return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                    shortYearCutoff: e,
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames")
                }
            },
            _formatDate: function(t, e, i, n) {
                e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                var s = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t))
            }
        }), t.fn.datepicker = function(e) {
            if (!this.length) return this;
            t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
                "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
            }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
        }, t.datepicker = new n, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.12.1";
        var p = (t.datepicker, t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), !1);
        t(document).on("mouseup", function() {
            p = !1
        });
        t.widget("ui.mouse", {
            version: "1.12.1",
            options: {
                cancel: "input, textarea, button, select, option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var e = this;
                this.element.on("mousedown." + this.widgetName, function(t) {
                    return e._mouseDown(t)
                }).on("click." + this.widgetName, function(i) {
                    if (!0 === t.data(i.target, e.widgetName + ".preventClickEvent")) return t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(e) {
                if (!p) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                    var i = this,
                        n = 1 === e.which,
                        s = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                    return !(n && !s && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        i.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                        return i._mouseMove(t)
                    }, this._mouseUpDelegate = function(t) {
                        return i._mouseUp(t)
                    }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), p = !0, !0))
                }
            },
            _mouseMove: function(e) {
                if (this._mouseMoved) {
                    if (t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button) return this._mouseUp(e);
                    if (!e.which)
                        if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                        else if (!this.ignoreMissingWhich) return this._mouseUp(e)
                }
                return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
            },
            _mouseUp: function(e) {
                this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, p = !1, e.preventDefault()
            },
            _mouseDistanceMet: function(t) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        }), t.ui.plugin = {
            add: function(e, i, n) {
                var s, o = t.ui[e].prototype;
                for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]])
            },
            call: function(t, e, i, n) {
                var s, o = t.plugins[e];
                if (o && (n || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                    for (s = 0; s < o.length; s++) t.options[o[s][0]] && o[s][1].apply(t.element, i)
            }
        }, t.ui.safeBlur = function(e) {
            e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur")
        };
        t.widget("ui.draggable", t.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit()
            },
            _setOption: function(t, e) {
                this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
            },
            _destroy: function() {
                if ((this.helper || this.element).is(".ui-draggable-dragging")) return void(this.destroyOnClear = !0);
                this._removeHandleClassName(), this._mouseDestroy()
            },
            _mouseCapture: function(e) {
                var i = this.options;
                return !(this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(e), !!this.handle && (this._blurActiveElement(e), this._blockFrames(!0 === i.iframeFix ? "iframe" : i.iframeFix), !0))
            },
            _blockFrames: function(e) {
                this.iframeBlocks = this.document.find(e).map(function() {
                    var e = t(this);
                    return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _blurActiveElement: function(e) {
                var i = t.ui.safeActiveElement(this.document[0]);
                t(e.target).closest(i).length || t.ui.safeBlur(i)
            },
            _mouseStart: function(e) {
                var i = this.options;
                return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                    return "fixed" === t(this).css("position")
                }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), !1 === this._trigger("start", e) ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
            },
            _refreshOffsets: function(t) {
                this.offset = {
                    top: this.positionAbs.top - this.margins.top,
                    left: this.positionAbs.left - this.margins.left,
                    scroll: !1,
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }, this.offset.click = {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                }
            },
            _mouseDrag: function(e, i) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                    var n = this._uiHash();
                    if (!1 === this._trigger("drag", e, n)) return this._mouseUp(new t.Event("mouseup", e)), !1;
                    this.position = n.position
                }
                return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
            },
            _mouseStop: function(e) {
                var i = this,
                    n = !1;
                return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), this.dropped && (n = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !n || "valid" === this.options.revert && n || !0 === this.options.revert || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    !1 !== i._trigger("stop", e) && i._clear()
                }) : !1 !== this._trigger("stop", e) && this._clear(), !1
            },
            _mouseUp: function(e) {
                return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", {
                    target: this.element[0]
                })) : this._clear(), this
            },
            _getHandle: function(e) {
                return !this.options.handle || !!t(e.target).closest(this.element.find(this.options.handle)).length
            },
            _setHandleClassName: function() {
                this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle")
            },
            _removeHandleClassName: function() {
                this._removeClass(this.handleElement, "ui-draggable-handle")
            },
            _createHelper: function(e) {
                var i = this.options,
                    n = t.isFunction(i.helper),
                    s = n ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n && s[0] === this.element[0] && this._setPositionRelative(), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
            },
            _setPositionRelative: function() {
                /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _isRootNode: function(t) {
                return /(html|body)/i.test(t.tagName) || t === this.document[0]
            },
            _getParentOffset: function() {
                var e = this.offsetParent.offset(),
                    i = this.document[0];
                return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" !== this.cssPosition) return {
                    top: 0,
                    left: 0
                };
                var t = this.element.position(),
                    e = this._isRootNode(this.scrollParent[0]);
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, n, s = this.options,
                    o = this.document[0];
                return this.relativeContainer = null, s.containment ? "window" === s.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === s.containment ? void(this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : s.containment.constructor === Array ? void(this.containment = s.containment) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), i = t(s.containment), void((n = i[0]) && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
            },
            _convertPositionTo: function(t, e) {
                e || (e = this.position);
                var i = "absolute" === t ? 1 : -1,
                    n = this._isRootNode(this.scrollParent[0]);
                return {
                    top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top) * i,
                    left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left) * i
                }
            },
            _generatePosition: function(t, e) {
                var i, n, s, o, r = this.options,
                    a = this._isRootNode(this.scrollParent[0]),
                    l = t.pageX,
                    h = t.pageY;
                return a && this.offset.scroll || (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }), e && (this.containment && (this.relativeContainer ? (n = this.relativeContainer.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), r.grid && (s = r.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, h = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - r.grid[1] : s + r.grid[1] : s, o = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - r.grid[0] : o + r.grid[0] : o), "y" === r.axis && (l = this.originalPageX), "x" === r.axis && (h = this.originalPageY)), {
                    top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top),
                    left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
            },
            _trigger: function(e, i, n) {
                return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), n.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, n)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), t.ui.plugin.add("draggable", "connectToSortable", {
            start: function(e, i, n) {
                var s = t.extend({}, i, {
                    item: n.element
                });
                n.sortables = [], t(n.options.connectToSortable).each(function() {
                    var i = t(this).sortable("instance");
                    i && !i.options.disabled && (n.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, s))
                })
            },
            stop: function(e, i, n) {
                var s = t.extend({}, i, {
                    item: n.element
                });
                n.cancelHelperRemoval = !1, t.each(n.sortables, function() {
                    var t = this;
                    t.isOver ? (t.isOver = 0, n.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                        position: t.placeholder.css("position"),
                        top: t.placeholder.css("top"),
                        left: t.placeholder.css("left")
                    }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, s))
                })
            },
            drag: function(e, i, n) {
                t.each(n.sortables, function() {
                    var s = !1,
                        o = this;
                    o.positionAbs = n.positionAbs, o.helperProportions = n.helperProportions, o.offset.click = n.offset.click, o._intersectsWith(o.containerCache) && (s = !0, t.each(n.sortables, function() {
                        return this.positionAbs = n.positionAbs, this.helperProportions = n.helperProportions, this.offset.click = n.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (s = !1), s
                    })), s ? (o.isOver || (o.isOver = 1, n._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() {
                        return i.helper[0]
                    }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = n.offset.click.top, o.offset.click.left = n.offset.click.left, o.offset.parent.left -= n.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= n.offset.parent.top - o.offset.parent.top, n._trigger("toSortable", e), n.dropped = o.element, t.each(n.sortables, function() {
                        this.refreshPositions()
                    }), n.currentItem = n.element, o.fromOutside = n), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(n._parent), n._refreshOffsets(e), i.position = n._generatePosition(e, !0), n._trigger("fromSortable", e), n.dropped = !1, t.each(n.sortables, function() {
                        this.refreshPositions()
                    }))
                })
            }
        }), t.ui.plugin.add("draggable", "cursor", {
            start: function(e, i, n) {
                var s = t("body"),
                    o = n.options;
                s.css("cursor") && (o._cursor = s.css("cursor")), s.css("cursor", o.cursor)
            },
            stop: function(e, i, n) {
                var s = n.options;
                s._cursor && t("body").css("cursor", s._cursor)
            }
        }), t.ui.plugin.add("draggable", "opacity", {
            start: function(e, i, n) {
                var s = t(i.helper),
                    o = n.options;
                s.css("opacity") && (o._opacity = s.css("opacity")), s.css("opacity", o.opacity)
            },
            stop: function(e, i, n) {
                var s = n.options;
                s._opacity && t(i.helper).css("opacity", s._opacity)
            }
        }), t.ui.plugin.add("draggable", "scroll", {
            start: function(t, e, i) {
                i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
            },
            drag: function(e, i, n) {
                var s = n.options,
                    o = !1,
                    r = n.scrollParentNotHidden[0],
                    a = n.document[0];
                r !== a && "HTML" !== r.tagName ? (s.axis && "x" === s.axis || (n.overflowOffset.top + r.offsetHeight - e.pageY < s.scrollSensitivity ? r.scrollTop = o = r.scrollTop + s.scrollSpeed : e.pageY - n.overflowOffset.top < s.scrollSensitivity && (r.scrollTop = o = r.scrollTop - s.scrollSpeed)),
                    s.axis && "y" === s.axis || (n.overflowOffset.left + r.offsetWidth - e.pageX < s.scrollSensitivity ? r.scrollLeft = o = r.scrollLeft + s.scrollSpeed : e.pageX - n.overflowOffset.left < s.scrollSensitivity && (r.scrollLeft = o = r.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(a).scrollTop() < s.scrollSensitivity ? o = t(a).scrollTop(t(a).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(a).scrollTop()) < s.scrollSensitivity && (o = t(a).scrollTop(t(a).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(a).scrollLeft() < s.scrollSensitivity ? o = t(a).scrollLeft(t(a).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(a).scrollLeft()) < s.scrollSensitivity && (o = t(a).scrollLeft(t(a).scrollLeft() + s.scrollSpeed)))), !1 !== o && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(n, e)
            }
        }), t.ui.plugin.add("draggable", "snap", {
            start: function(e, i, n) {
                var s = n.options;
                n.snapElements = [], t(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function() {
                    var e = t(this),
                        i = e.offset();
                    this !== n.element[0] && n.snapElements.push({
                        item: this,
                        width: e.outerWidth(),
                        height: e.outerHeight(),
                        top: i.top,
                        left: i.left
                    })
                })
            },
            drag: function(e, i, n) {
                var s, o, r, a, l, h, u, c, d, p, f = n.options,
                    g = f.snapTolerance,
                    m = i.offset.left,
                    v = m + n.helperProportions.width,
                    _ = i.offset.top,
                    b = _ + n.helperProportions.height;
                for (d = n.snapElements.length - 1; d >= 0; d--) l = n.snapElements[d].left - n.margins.left, h = l + n.snapElements[d].width, u = n.snapElements[d].top - n.margins.top, c = u + n.snapElements[d].height, v < l - g || m > h + g || b < u - g || _ > c + g || !t.contains(n.snapElements[d].item.ownerDocument, n.snapElements[d].item) ? (n.snapElements[d].snapping && n.options.snap.release && n.options.snap.release.call(n.element, e, t.extend(n._uiHash(), {
                    snapItem: n.snapElements[d].item
                })), n.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (s = Math.abs(u - b) <= g, o = Math.abs(c - _) <= g, r = Math.abs(l - v) <= g, a = Math.abs(h - m) <= g, s && (i.position.top = n._convertPositionTo("relative", {
                    top: u - n.helperProportions.height,
                    left: 0
                }).top), o && (i.position.top = n._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top), r && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: l - n.helperProportions.width
                }).left), a && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: h
                }).left)), p = s || o || r || a, "outer" !== f.snapMode && (s = Math.abs(u - _) <= g, o = Math.abs(c - b) <= g, r = Math.abs(l - m) <= g, a = Math.abs(h - v) <= g, s && (i.position.top = n._convertPositionTo("relative", {
                    top: u,
                    left: 0
                }).top), o && (i.position.top = n._convertPositionTo("relative", {
                    top: c - n.helperProportions.height,
                    left: 0
                }).top), r && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left), a && (i.position.left = n._convertPositionTo("relative", {
                    top: 0,
                    left: h - n.helperProportions.width
                }).left)), !n.snapElements[d].snapping && (s || o || r || a || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, e, t.extend(n._uiHash(), {
                    snapItem: n.snapElements[d].item
                })), n.snapElements[d].snapping = s || o || r || a || p)
            }
        }), t.ui.plugin.add("draggable", "stack", {
            start: function(e, i, n) {
                var s, o = n.options,
                    r = t.makeArray(t(o.stack)).sort(function(e, i) {
                        return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                    });
                r.length && (s = parseInt(t(r[0]).css("zIndex"), 10) || 0, t(r).each(function(e) {
                    t(this).css("zIndex", s + e)
                }), this.css("zIndex", s + r.length))
            }
        }), t.ui.plugin.add("draggable", "zIndex", {
            start: function(e, i, n) {
                var s = t(i.helper),
                    o = n.options;
                s.css("zIndex") && (o._zIndex = s.css("zIndex")), s.css("zIndex", o.zIndex)
            },
            stop: function(e, i, n) {
                var s = n.options;
                s._zIndex && t(i.helper).css("zIndex", s._zIndex)
            }
        });
        t.ui.draggable;
        t.widget("ui.resizable", t.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                classes: {
                    "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
                },
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _num: function(t) {
                return parseFloat(t) || 0
            },
            _isNumber: function(t) {
                return !isNaN(parseFloat(t))
            },
            _hasScroll: function(e, i) {
                if ("hidden" === t(e).css("overflow")) return !1;
                var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                    s = !1;
                return e[n] > 0 || (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
            },
            _create: function() {
                var e, i = this.options,
                    n = this;
                this._addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!i.aspectRatio,
                    aspectRatio: i.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, e = {
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom"),
                    marginLeft: this.originalElement.css("marginLeft")
                }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on("mouseenter", function() {
                    i.disabled || (n._removeClass("ui-resizable-autohide"), n._handles.show())
                }).on("mouseleave", function() {
                    i.disabled || n.resizing || (n._addClass("ui-resizable-autohide"), n._handles.hide())
                }), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var e, i = function(e) {
                    t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                    position: e.css("position"),
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: e.css("top"),
                    left: e.css("left")
                }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
            },
            _setOption: function(t, e) {
                switch (this._super(t, e), t) {
                    case "handles":
                        this._removeHandles(), this._setupHandles()
                }
            },
            _setupHandles: function() {
                var e, i, n, s, o, r = this.options,
                    a = this;
                if (this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this._handles = t(), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), n = this.handles.split(","), this.handles = {}, i = 0; i < n.length; i++) e = t.trim(n[i]), s = "ui-resizable-" + e, o = t("<div>"), this._addClass(o, "ui-resizable-handle " + s), o.css({
                        zIndex: r.zIndex
                    }), this.handles[e] = ".ui-resizable-" + e, this.element.append(o);
                this._renderAxis = function(e) {
                    var i, n, s, o;
                    e = e || this.element;
                    for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {
                        mousedown: a._mouseDown
                    })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (n = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(s, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
                }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function() {
                    a.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = o && o[1] ? o[1] : "se")
                }), r.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
            },
            _removeHandles: function() {
                this._handles.remove()
            },
            _mouseCapture: function(e) {
                var i, n, s = !1;
                for (i in this.handles)((n = t(this.handles[i])[0]) === e.target || t.contains(n, e.target)) && (s = !0);
                return !this.options.disabled && s
            },
            _mouseStart: function(e) {
                var i, n, s, o = this.options,
                    r = this.element;
                return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), n = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, n += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: i,
                    top: n
                }, this.size = this._helper ? {
                    width: this.helper.width(),
                    height: this.helper.height()
                } : {
                    width: r.width(),
                    height: r.height()
                }, this.originalSize = this._helper ? {
                    width: r.outerWidth(),
                    height: r.outerHeight()
                } : {
                    width: r.width(),
                    height: r.height()
                }, this.sizeDiff = {
                    width: r.outerWidth() - r.width(),
                    height: r.outerHeight() - r.height()
                }, this.originalPosition = {
                    left: i,
                    top: n
                }, this.originalMousePosition = {
                    left: e.pageX,
                    top: e.pageY
                }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), this._addClass("ui-resizable-resizing"), this._propagate("start", e), !0
            },
            _mouseDrag: function(e) {
                var i, n, s = this.originalMousePosition,
                    o = this.axis,
                    r = e.pageX - s.left || 0,
                    a = e.pageY - s.top || 0,
                    l = this._change[o];
                return this._updatePrevProperties(), !!l && (i = l.apply(this, [e, r, a]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), n = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1)
            },
            _mouseStop: function(e) {
                this.resizing = !1;
                var i, n, s, o, r, a, l, h = this.options,
                    u = this;
                return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), s = n && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, o = n ? 0 : u.sizeDiff.width, r = {
                    width: u.helper.width() - o,
                    height: u.helper.height() - s
                }, a = parseFloat(u.element.css("left")) + (u.position.left - u.originalPosition.left) || null, l = parseFloat(u.element.css("top")) + (u.position.top - u.originalPosition.top) || null, h.animate || this.element.css(t.extend(r, {
                    top: l,
                    left: a
                })), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
            },
            _updatePrevProperties: function() {
                this.prevPosition = {
                    top: this.position.top,
                    left: this.position.left
                }, this.prevSize = {
                    width: this.size.width,
                    height: this.size.height
                }
            },
            _applyChanges: function() {
                var t = {};
                return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
            },
            _updateVirtualBoundaries: function(t) {
                var e, i, n, s, o, r = this.options;
                o = {
                    minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
                    maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
                    minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
                    maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0
                }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, s = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), n > o.minHeight && (o.minHeight = n), i < o.maxWidth && (o.maxWidth = i), s < o.maxHeight && (o.maxHeight = s)), this._vBoundaries = o
            },
            _updateCache: function(t) {
                this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
            },
            _updateRatio: function(t) {
                var e = this.position,
                    i = this.size,
                    n = this.axis;
                return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
            },
            _respectSize: function(t) {
                var e = this._vBoundaries,
                    i = this.axis,
                    n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                    s = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                    o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                    r = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                    a = this.originalPosition.left + this.originalSize.width,
                    l = this.originalPosition.top + this.originalSize.height,
                    h = /sw|nw|w/.test(i),
                    u = /nw|ne|n/.test(i);
                return o && (t.width = e.minWidth), r && (t.height = e.minHeight), n && (t.width = e.maxWidth), s && (t.height = e.maxHeight), o && h && (t.left = a - e.minWidth), n && h && (t.left = a - e.maxWidth), r && u && (t.top = l - e.minHeight), s && u && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
            },
            _getPaddingPlusBorderDimensions: function(t) {
                for (var e = 0, i = [], n = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], s = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; e < 4; e++) i[e] = parseFloat(n[e]) || 0, i[e] += parseFloat(s[e]) || 0;
                return {
                    height: i[0] + i[2],
                    width: i[1] + i[3]
                }
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length)
                    for (var t, e = 0, i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0
                    })
            },
            _renderProxy: function() {
                var e = this.element,
                    i = this.options;
                this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++i.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(t, e) {
                    return {
                        width: this.originalSize.width + e
                    }
                },
                w: function(t, e) {
                    var i = this.originalSize;
                    return {
                        left: this.originalPosition.left + e,
                        width: i.width - e
                    }
                },
                n: function(t, e, i) {
                    var n = this.originalSize;
                    return {
                        top: this.originalPosition.top + i,
                        height: n.height - i
                    }
                },
                s: function(t, e, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(e, i, n) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                },
                sw: function(e, i, n) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                },
                ne: function(e, i, n) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                },
                nw: function(e, i, n) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                }
            },
            _propagate: function(e, i) {
                t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), t.ui.plugin.add("resizable", "animate", {
            stop: function(e) {
                var i = t(this).resizable("instance"),
                    n = i.options,
                    s = i._proportionallyResizeElements,
                    o = s.length && /textarea/i.test(s[0].nodeName),
                    r = o && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                    a = o ? 0 : i.sizeDiff.width,
                    l = {
                        width: i.size.width - a,
                        height: i.size.height - r
                    },
                    h = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                    u = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(t.extend(l, u && h ? {
                    top: u,
                    left: h
                } : {}), {
                    duration: n.animateDuration,
                    easing: n.animateEasing,
                    step: function() {
                        var n = {
                            width: parseFloat(i.element.css("width")),
                            height: parseFloat(i.element.css("height")),
                            top: parseFloat(i.element.css("top")),
                            left: parseFloat(i.element.css("left"))
                        };
                        s && s.length && t(s[0]).css({
                            width: n.width,
                            height: n.height
                        }), i._updateCache(n), i._propagate("resize", e)
                    }
                })
            }
        }), t.ui.plugin.add("resizable", "containment", {
            start: function() {
                var e, i, n, s, o, r, a, l = t(this).resizable("instance"),
                    h = l.options,
                    u = l.element,
                    c = h.containment,
                    d = c instanceof t ? c.get(0) : /parent/.test(c) ? u.parent().get(0) : c;
                d && (l.containerElement = t(d), /document/.test(c) || c === document ? (l.containerOffset = {
                    left: 0,
                    top: 0
                }, l.containerPosition = {
                    left: 0,
                    top: 0
                }, l.parentData = {
                    element: t(document),
                    left: 0,
                    top: 0,
                    width: t(document).width(),
                    height: t(document).height() || document.body.parentNode.scrollHeight
                }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
                    i[t] = l._num(e.css("padding" + n))
                }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                    height: e.innerHeight() - i[3],
                    width: e.innerWidth() - i[1]
                }, n = l.containerOffset, s = l.containerSize.height, o = l.containerSize.width, r = l._hasScroll(d, "left") ? d.scrollWidth : o, a = l._hasScroll(d) ? d.scrollHeight : s, l.parentData = {
                    element: d,
                    left: n.left,
                    top: n.top,
                    width: r,
                    height: a
                }))
            },
            resize: function(e) {
                var i, n, s, o, r = t(this).resizable("instance"),
                    a = r.options,
                    l = r.containerOffset,
                    h = r.position,
                    u = r._aspectRatio || e.shiftKey,
                    c = {
                        top: 0,
                        left: 0
                    },
                    d = r.containerElement,
                    p = !0;
                d[0] !== document && /static/.test(d.css("position")) && (c = l), h.left < (r._helper ? l.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - l.left : r.position.left - c.left), u && (r.size.height = r.size.width / r.aspectRatio, p = !1), r.position.left = a.helper ? l.left : 0), h.top < (r._helper ? l.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - l.top : r.position.top), u && (r.size.width = r.size.height * r.aspectRatio, p = !1), r.position.top = r._helper ? l.top : 0), s = r.containerElement.get(0) === r.element.parent().get(0), o = /relative|absolute/.test(r.containerElement.css("position")), s && o ? (r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top) : (r.offset.left = r.element.offset().left, r.offset.top = r.element.offset().top), i = Math.abs(r.sizeDiff.width + (r._helper ? r.offset.left - c.left : r.offset.left - l.left)), n = Math.abs(r.sizeDiff.height + (r._helper ? r.offset.top - c.top : r.offset.top - l.top)), i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i, u && (r.size.height = r.size.width / r.aspectRatio, p = !1)), n + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - n, u && (r.size.width = r.size.height * r.aspectRatio, p = !1)), p || (r.position.left = r.prevPosition.left, r.position.top = r.prevPosition.top, r.size.width = r.prevSize.width, r.size.height = r.prevSize.height)
            },
            stop: function() {
                var e = t(this).resizable("instance"),
                    i = e.options,
                    n = e.containerOffset,
                    s = e.containerPosition,
                    o = e.containerElement,
                    r = t(e.helper),
                    a = r.offset(),
                    l = r.outerWidth() - e.sizeDiff.width,
                    h = r.outerHeight() - e.sizeDiff.height;
                e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                    left: a.left - s.left - n.left,
                    width: l,
                    height: h
                }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                    left: a.left - s.left - n.left,
                    width: l,
                    height: h
                })
            }
        }), t.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var e = t(this).resizable("instance"),
                    i = e.options;
                t(i.alsoResize).each(function() {
                    var e = t(this);
                    e.data("ui-resizable-alsoresize", {
                        width: parseFloat(e.width()),
                        height: parseFloat(e.height()),
                        left: parseFloat(e.css("left")),
                        top: parseFloat(e.css("top"))
                    })
                })
            },
            resize: function(e, i) {
                var n = t(this).resizable("instance"),
                    s = n.options,
                    o = n.originalSize,
                    r = n.originalPosition,
                    a = {
                        height: n.size.height - o.height || 0,
                        width: n.size.width - o.width || 0,
                        top: n.position.top - r.top || 0,
                        left: n.position.left - r.left || 0
                    };
                t(s.alsoResize).each(function() {
                    var e = t(this),
                        n = t(this).data("ui-resizable-alsoresize"),
                        s = {},
                        o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    t.each(o, function(t, e) {
                        var i = (n[e] || 0) + (a[e] || 0);
                        i && i >= 0 && (s[e] = i || null)
                    }), e.css(s)
                })
            },
            stop: function() {
                t(this).removeData("ui-resizable-alsoresize")
            }
        }), t.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var e = t(this).resizable("instance"),
                    i = e.size;
                e.ghost = e.originalElement.clone(), e.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: i.height,
                    width: i.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }), e._addClass(e.ghost, "ui-resizable-ghost"), !1 !== t.uiBackCompat && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper)
            },
            resize: function() {
                var e = t(this).resizable("instance");
                e.ghost && e.ghost.css({
                    position: "relative",
                    height: e.size.height,
                    width: e.size.width
                })
            },
            stop: function() {
                var e = t(this).resizable("instance");
                e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
            }
        }), t.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var e, i = t(this).resizable("instance"),
                    n = i.options,
                    s = i.size,
                    o = i.originalSize,
                    r = i.originalPosition,
                    a = i.axis,
                    l = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
                    h = l[0] || 1,
                    u = l[1] || 1,
                    c = Math.round((s.width - o.width) / h) * h,
                    d = Math.round((s.height - o.height) / u) * u,
                    p = o.width + c,
                    f = o.height + d,
                    g = n.maxWidth && n.maxWidth < p,
                    m = n.maxHeight && n.maxHeight < f,
                    v = n.minWidth && n.minWidth > p,
                    _ = n.minHeight && n.minHeight > f;
                n.grid = l, v && (p += h), _ && (f += u), g && (p -= h), m && (f -= u), /^(se|s|e)$/.test(a) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.top = r.top - d) : /^(sw)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.left = r.left - c) : ((f - u <= 0 || p - h <= 0) && (e = i._getPaddingPlusBorderDimensions(this)), f - u > 0 ? (i.size.height = f, i.position.top = r.top - d) : (f = u - e.height, i.size.height = f, i.position.top = r.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = r.left - c) : (p = h - e.width, i.size.width = p, i.position.left = r.left + o.width - p))
            }
        });
        t.ui.resizable;
        t.widget("ui.dialog", {
            version: "1.12.1",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                classes: {
                    "ui-dialog": "ui-corner-all",
                    "ui-dialog-titlebar": "ui-corner-all"
                },
                closeOnEscape: !0,
                closeText: "Close",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(e) {
                        var i = t(this).css(e).offset().top;
                        i < 0 && t(this).css("top", e.top - i)
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            sizeRelatedOptions: {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            resizableRelatedOptions: {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            },
            _create: function() {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                }, this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
            },
            _destroy: function() {
                var t, e = this.originalPosition;
                this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
            },
            widget: function() {
                return this.uiDialog
            },
            disable: t.noop,
            enable: t.noop,
            close: function(e) {
                var i = this;
                this._isOpen && !1 !== this._trigger("beforeClose", e) && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function() {
                    i._trigger("close", e)
                }))
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function() {
                this._moveToTop()
            },
            _moveToTop: function(e, i) {
                var n = !1,
                    s = this.uiDialog.siblings(".ui-front:visible").map(function() {
                        return +t(this).css("z-index")
                    }).get(),
                    o = Math.max.apply(null, s);
                return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), n = !0), n && !i && this._trigger("focus", e), n
            },
            open: function() {
                var e = this;
                if (this._isOpen) return void(this._moveToTop() && this._focusTabbable());
                this._isOpen = !0, this.opener = t(t.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
                    e._focusTabbable(), e._trigger("focus")
                }), this._makeFocusTarget(), this._trigger("open")
            },
            _focusTabbable: function() {
                var t = this._focusedElement;
                t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).trigger("focus")
            },
            _keepFocus: function(e) {
                function i() {
                    var e = t.ui.safeActiveElement(this.document[0]);
                    this.uiDialog[0] === e || t.contains(this.uiDialog[0], e) || this._focusTabbable()
                }
                e.preventDefault(), i.call(this), this._delay(i)
            },
            _createWrapper: function() {
                this.uiDialog = t("<div>").hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, {
                    keydown: function(e) {
                        if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), void this.close(e);
                        if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                            var i = this.uiDialog.find(":tabbable"),
                                n = i.filter(":first"),
                                s = i.filter(":last");
                            e.target !== s[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== n[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function() {
                                s.trigger("focus")
                            }), e.preventDefault()) : (this._delay(function() {
                                n.trigger("focus")
                            }), e.preventDefault())
                        }
                    },
                    mousedown: function(t) {
                        this._moveToTop(t) && this._focusTabbable()
                    }
                }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            },
            _createTitlebar: function() {
                var e;
                this.uiDialogTitlebar = t("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, {
                    mousedown: function(e) {
                        t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                    }
                }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                    label: t("<a>").text(this.options.closeText).html(),
                    icon: "ui-icon-closethick",
                    showLabel: !1
                }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, {
                    click: function(t) {
                        t.preventDefault(), this.close(t)
                    }
                }), e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(e, "ui-dialog-title"), this._title(e), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({
                    "aria-labelledby": e.attr("id")
                })
            },
            _title: function(t) {
                this.options.title ? t.text(this.options.title) : t.html("&#160;")
            },
            _createButtonPane: function() {
                this.uiDialogButtonPane = t("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons()
            },
            _createButtons: function() {
                var e = this,
                    i = this.options.buttons;
                if (this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length) return void this._removeClass(this.uiDialog, "ui-dialog-buttons");
                t.each(i, function(i, n) {
                    var s, o;
                    n = t.isFunction(n) ? {
                        click: n,
                        text: i
                    } : n, n = t.extend({
                        type: "button"
                    }, n), s = n.click, o = {
                        icon: n.icon,
                        iconPosition: n.iconPosition,
                        showLabel: n.showLabel,
                        icons: n.icons,
                        text: n.text
                    }, delete n.click, delete n.icon, delete n.iconPosition, delete n.showLabel, delete n.icons, "boolean" == typeof n.text && delete n.text, t("<button></button>", n).button(o).appendTo(e.uiButtonSet).on("click", function() {
                        s.apply(e.element[0], arguments)
                    })
                }), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog)
            },
            _makeDraggable: function() {
                function e(t) {
                    return {
                        position: t.position,
                        offset: t.offset
                    }
                }
                var i = this,
                    n = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(n, s) {
                        i._addClass(t(this), "ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", n, e(s))
                    },
                    drag: function(t, n) {
                        i._trigger("drag", t, e(n))
                    },
                    stop: function(s, o) {
                        var r = o.offset.left - i.document.scrollLeft(),
                            a = o.offset.top - i.document.scrollTop();
                        n.position = {
                            my: "left top",
                            at: "left" + (r >= 0 ? "+" : "") + r + " top" + (a >= 0 ? "+" : "") + a,
                            of: i.window
                        }, i._removeClass(t(this), "ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", s, e(o))
                    }
                })
            },
            _makeResizable: function() {
                function e(t) {
                    return {
                        originalPosition: t.originalPosition,
                        originalSize: t.originalSize,
                        position: t.position,
                        size: t.size
                    }
                }
                var i = this,
                    n = this.options,
                    s = n.resizable,
                    o = this.uiDialog.css("position"),
                    r = "string" == typeof s ? s : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: n.maxWidth,
                    maxHeight: n.maxHeight,
                    minWidth: n.minWidth,
                    minHeight: this._minHeight(),
                    handles: r,
                    start: function(n, s) {
                        i._addClass(t(this), "ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", n, e(s))
                    },
                    resize: function(t, n) {
                        i._trigger("resize", t, e(n))
                    },
                    stop: function(s, o) {
                        var r = i.uiDialog.offset(),
                            a = r.left - i.document.scrollLeft(),
                            l = r.top - i.document.scrollTop();
                        n.height = i.uiDialog.height(), n.width = i.uiDialog.width(), n.position = {
                            my: "left top",
                            at: "left" + (a >= 0 ? "+" : "") + a + " top" + (l >= 0 ? "+" : "") + l,
                            of: i.window
                        }, i._removeClass(t(this), "ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", s, e(o))
                    }
                }).css("position", o)
            },
            _trackFocus: function() {
                this._on(this.widget(), {
                    focusin: function(e) {
                        this._makeFocusTarget(), this._focusedElement = t(e.target)
                    }
                })
            },
            _makeFocusTarget: function() {
                this._untrackInstance(), this._trackingInstances().unshift(this)
            },
            _untrackInstance: function() {
                var e = this._trackingInstances(),
                    i = t.inArray(this, e); - 1 !== i && e.splice(i, 1)
            },
            _trackingInstances: function() {
                var t = this.document.data("ui-dialog-instances");
                return t || (t = [], this.document.data("ui-dialog-instances", t)), t
            },
            _minHeight: function() {
                var t = this.options;
                return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
            },
            _position: function() {
                var t = this.uiDialog.is(":visible");
                t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
            },
            _setOptions: function(e) {
                var i = this,
                    n = !1,
                    s = {};
                t.each(e, function(t, e) {
                    i._setOption(t, e), t in i.sizeRelatedOptions && (n = !0), t in i.resizableRelatedOptions && (s[t] = e)
                }), n && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", s)
            },
            _setOption: function(e, i) {
                var n, s, o = this.uiDialog;
                "disabled" !== e && (this._super(e, i), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({
                        label: t("<a>").text("" + this.options.closeText).html()
                    }), "draggable" === e && (n = o.is(":data(ui-draggable)"), n && !i && o.draggable("destroy"), !n && i && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (s = o.is(":data(ui-resizable)"), s && !i && o.resizable("destroy"), s && "string" == typeof i && o.resizable("option", "handles", i), s || !1 === i || this._makeResizable()),
                    "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
            },
            _size: function() {
                var t, e, i, n = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                }), n.minWidth > n.width && (n.width = n.minWidth), t = this.uiDialog.css({
                    height: "auto",
                    width: n.width
                }).outerHeight(), e = Math.max(0, n.minHeight - t), i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none", "auto" === n.height ? this.element.css({
                    minHeight: e,
                    maxHeight: i,
                    height: "auto"
                }) : this.element.height(Math.max(0, n.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            },
            _blockFrames: function() {
                this.iframeBlocks = this.document.find("iframe").map(function() {
                    var e = t(this);
                    return t("<div>").css({
                        position: "absolute",
                        width: e.outerWidth(),
                        height: e.outerHeight()
                    }).appendTo(e.parent()).offset(e.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _allowInteraction: function(e) {
                return !!t(e.target).closest(".ui-dialog").length || !!t(e.target).closest(".ui-datepicker").length
            },
            _createOverlay: function() {
                if (this.options.modal) {
                    var e = !0;
                    this._delay(function() {
                        e = !1
                    }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                        focusin: function(t) {
                            e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                        }
                    }), this.overlay = t("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, {
                        mousedown: "_keepFocus"
                    }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
                }
            },
            _destroyOverlay: function() {
                if (this.options.modal && this.overlay) {
                    var t = this.document.data("ui-dialog-overlays") - 1;
                    t ? this.document.data("ui-dialog-overlays", t) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null
                }
            }
        }), !1 !== t.uiBackCompat && t.widget("ui.dialog", t.ui.dialog, {
            options: {
                dialogClass: ""
            },
            _createWrapper: function() {
                this._super(), this.uiDialog.addClass(this.options.dialogClass)
            },
            _setOption: function(t, e) {
                "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments)
            }
        });
        t.ui.dialog;
        t.widget("ui.droppable", {
            version: "1.12.1",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                addClasses: !0,
                greedy: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var e, i = this.options,
                    n = i.accept;
                this.isover = !1, this.isout = !0, this.accept = t.isFunction(n) ? n : function(t) {
                    return t.is(n)
                }, this.proportions = function() {
                    if (!arguments.length) return e || (e = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    });
                    e = arguments[0]
                }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable")
            },
            _addToManager: function(e) {
                t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
            },
            _splice: function(t) {
                for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1)
            },
            _destroy: function() {
                var e = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(e)
            },
            _setOption: function(e, i) {
                if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
                    return t.is(i)
                };
                else if ("scope" === e) {
                    var n = t.ui.ddmanager.droppables[this.options.scope];
                    this._splice(n), this._addToManager(i)
                }
                this._super(e, i)
            },
            _activate: function(e) {
                var i = t.ui.ddmanager.current;
                this._addActiveClass(), i && this._trigger("activate", e, this.ui(i))
            },
            _deactivate: function(e) {
                var i = t.ui.ddmanager.current;
                this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i))
            },
            _over: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)))
            },
            _out: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)))
            },
            _drop: function(e, i) {
                var n = i || t.ui.ddmanager.current,
                    s = !1;
                return !(!n || (n.currentItem || n.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var i = t(this).droppable("instance");
                    if (i.options.greedy && !i.options.disabled && i.options.scope === n.options.scope && i.accept.call(i.element[0], n.currentItem || n.element) && f(n, t.extend(i, {
                            offset: i.element.offset()
                        }), i.options.tolerance, e)) return s = !0, !1
                }), !s && (!!this.accept.call(this.element[0], n.currentItem || n.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(n)), this.element)))
            },
            ui: function(t) {
                return {
                    draggable: t.currentItem || t.element,
                    helper: t.helper,
                    position: t.position,
                    offset: t.positionAbs
                }
            },
            _addHoverClass: function() {
                this._addClass("ui-droppable-hover")
            },
            _removeHoverClass: function() {
                this._removeClass("ui-droppable-hover")
            },
            _addActiveClass: function() {
                this._addClass("ui-droppable-active")
            },
            _removeActiveClass: function() {
                this._removeClass("ui-droppable-active")
            }
        });
        var f = t.ui.intersect = function() {
            function t(t, e, i) {
                return t >= e && t < e + i
            }
            return function(e, i, n, s) {
                if (!i.offset) return !1;
                var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
                    r = (e.positionAbs || e.position.absolute).top + e.margins.top,
                    a = o + e.helperProportions.width,
                    l = r + e.helperProportions.height,
                    h = i.offset.left,
                    u = i.offset.top,
                    c = h + i.proportions().width,
                    d = u + i.proportions().height;
                switch (n) {
                    case "fit":
                        return h <= o && a <= c && u <= r && l <= d;
                    case "intersect":
                        return h < o + e.helperProportions.width / 2 && a - e.helperProportions.width / 2 < c && u < r + e.helperProportions.height / 2 && l - e.helperProportions.height / 2 < d;
                    case "pointer":
                        return t(s.pageY, u, i.proportions().height) && t(s.pageX, h, i.proportions().width);
                    case "touch":
                        return (r >= u && r <= d || l >= u && l <= d || r < u && l > d) && (o >= h && o <= c || a >= h && a <= c || o < h && a > c);
                    default:
                        return !1
                }
            }
        }();
        t.ui.ddmanager = {
            current: null,
            droppables: {
                default: []
            },
            prepareOffsets: function(e, i) {
                var n, s, o = t.ui.ddmanager.droppables[e.options.scope] || [],
                    r = i ? i.type : null,
                    a = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                t: for (n = 0; n < o.length; n++)
                    if (!(o[n].options.disabled || e && !o[n].accept.call(o[n].element[0], e.currentItem || e.element))) {
                        for (s = 0; s < a.length; s++)
                            if (a[s] === o[n].element[0]) {
                                o[n].proportions().height = 0;
                                continue t
                            }
                        o[n].visible = "none" !== o[n].element.css("display"), o[n].visible && ("mousedown" === r && o[n]._activate.call(o[n], i), o[n].offset = o[n].element.offset(), o[n].proportions({
                            width: o[n].element[0].offsetWidth,
                            height: o[n].element[0].offsetHeight
                        }))
                    }
            },
            drop: function(e, i) {
                var n = !1;
                return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && f(e, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                }), n
            },
            dragStart: function(e, i) {
                e.element.parentsUntil("body").on("scroll.droppable", function() {
                    e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                })
            },
            drag: function(e, i) {
                e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var n, s, o, r = f(e, this, this.options.tolerance, i),
                            a = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
                        a && (this.options.greedy && (s = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                            return t(this).droppable("instance").options.scope === s
                        }), o.length && (n = t(o[0]).droppable("instance"), n.greedyChild = "isover" === a)), n && "isover" === a && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[a] = !0, this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, i), n && "isout" === a && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                    }
                })
            },
            dragStop: function(e, i) {
                e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            }
        }, !1 !== t.uiBackCompat && t.widget("ui.droppable", t.ui.droppable, {
            options: {
                hoverClass: !1,
                activeClass: !1
            },
            _addActiveClass: function() {
                this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass)
            },
            _removeActiveClass: function() {
                this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass)
            },
            _addHoverClass: function() {
                this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass)
            },
            _removeHoverClass: function() {
                this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
            }
        });
        t.ui.droppable, t.widget("ui.progressbar", {
            version: "1.12.1",
            options: {
                classes: {
                    "ui-progressbar": "ui-corner-all",
                    "ui-progressbar-value": "ui-corner-left",
                    "ui-progressbar-complete": "ui-corner-right"
                },
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = t("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue()
            },
            _destroy: function() {
                this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove()
            },
            value: function(t) {
                if (void 0 === t) return this.options.value;
                this.options.value = this._constrainedValue(t), this._refreshValue()
            },
            _constrainedValue: function(t) {
                return void 0 === t && (t = this.options.value), this.indeterminate = !1 === t, "number" != typeof t && (t = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, t))
            },
            _setOptions: function(t) {
                var e = t.value;
                delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
            },
            _setOption: function(t, e) {
                "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t)
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function() {
                var e = this.options.value,
                    i = this._percentage();
                this.valueDiv.toggle(this.indeterminate || e > this.min).width(i.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, e === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": e
                }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
            }
        }), t.widget("ui.selectable", t.ui.mouse, {
            version: "1.12.1",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var e = this;
                this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                    e.elementPos = t(e.element[0]).offset(), e.selectees = t(e.options.filter, e.element[0]), e._addClass(e.selectees, "ui-selectee"), e.selectees.each(function() {
                        var i = t(this),
                            n = i.offset(),
                            s = {
                                left: n.left - e.elementPos.left,
                                top: n.top - e.elementPos.top
                            };
                        t.data(this, "selectable-item", {
                            element: this,
                            $element: i,
                            left: s.left,
                            top: s.top,
                            right: s.left + i.outerWidth(),
                            bottom: s.top + i.outerHeight(),
                            startselected: !1,
                            selected: i.hasClass("ui-selected"),
                            selecting: i.hasClass("ui-selecting"),
                            unselecting: i.hasClass("ui-unselecting")
                        })
                    })
                }, this.refresh(), this._mouseInit(), this.helper = t("<div>"), this._addClass(this.helper, "ui-selectable-helper")
            },
            _destroy: function() {
                this.selectees.removeData("selectable-item"), this._mouseDestroy()
            },
            _mouseStart: function(e) {
                var i = this,
                    n = this.options;
                this.opos = [e.pageX, e.pageY], this.elementPos = t(this.element[0]).offset(), this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                    left: e.pageX,
                    top: e.pageY,
                    width: 0,
                    height: 0
                }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var n = t.data(this, "selectable-item");
                    n.startselected = !0, e.metaKey || e.ctrlKey || (i._removeClass(n.$element, "ui-selected"), n.selected = !1, i._addClass(n.$element, "ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                        unselecting: n.element
                    }))
                }), t(e.target).parents().addBack().each(function() {
                    var n, s = t.data(this, "selectable-item");
                    if (s) return n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), i._removeClass(s.$element, n ? "ui-unselecting" : "ui-selected")._addClass(s.$element, n ? "ui-selecting" : "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                        selecting: s.element
                    }) : i._trigger("unselecting", e, {
                        unselecting: s.element
                    }), !1
                }))
            },
            _mouseDrag: function(e) {
                if (this.dragged = !0, !this.options.disabled) {
                    var i, n = this,
                        s = this.options,
                        o = this.opos[0],
                        r = this.opos[1],
                        a = e.pageX,
                        l = e.pageY;
                    return o > a && (i = a, a = o, o = i), r > l && (i = l, l = r, r = i), this.helper.css({
                        left: o,
                        top: r,
                        width: a - o,
                        height: l - r
                    }), this.selectees.each(function() {
                        var i = t.data(this, "selectable-item"),
                            h = !1,
                            u = {};
                        i && i.element !== n.element[0] && (u.left = i.left + n.elementPos.left, u.right = i.right + n.elementPos.left, u.top = i.top + n.elementPos.top, u.bottom = i.bottom + n.elementPos.top, "touch" === s.tolerance ? h = !(u.left > a || u.right < o || u.top > l || u.bottom < r) : "fit" === s.tolerance && (h = u.left > o && u.right < a && u.top > r && u.bottom < l), h ? (i.selected && (n._removeClass(i.$element, "ui-selected"), i.selected = !1), i.unselecting && (n._removeClass(i.$element, "ui-unselecting"), i.unselecting = !1), i.selecting || (n._addClass(i.$element, "ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {
                            selecting: i.element
                        }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (n._removeClass(i.$element, "ui-selecting"), i.selecting = !1, n._addClass(i.$element, "ui-selected"), i.selected = !0) : (n._removeClass(i.$element, "ui-selecting"), i.selecting = !1, i.startselected && (n._addClass(i.$element, "ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {
                            unselecting: i.element
                        }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (n._removeClass(i.$element, "ui-selected"), i.selected = !1, n._addClass(i.$element, "ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                            unselecting: i.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function(e) {
                var i = this;
                return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                    var n = t.data(this, "selectable-item");
                    i._removeClass(n.$element, "ui-unselecting"), n.unselecting = !1, n.startselected = !1, i._trigger("unselected", e, {
                        unselected: n.element
                    })
                }), t(".ui-selecting", this.element[0]).each(function() {
                    var n = t.data(this, "selectable-item");
                    i._removeClass(n.$element, "ui-selecting")._addClass(n.$element, "ui-selected"), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger("selected", e, {
                        selected: n.element
                    })
                }), this._trigger("stop", e), this.helper.remove(), !1
            }
        }), t.widget("ui.selectmenu", [t.ui.formResetMixin, {
            version: "1.12.1",
            defaultElement: "<select>",
            options: {
                appendTo: null,
                classes: {
                    "ui-selectmenu-button-open": "ui-corner-top",
                    "ui-selectmenu-button-closed": "ui-corner-all"
                },
                disabled: null,
                icons: {
                    button: "ui-icon-triangle-1-s"
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                width: !1,
                change: null,
                close: null,
                focus: null,
                open: null,
                select: null
            },
            _create: function() {
                var e = this.element.uniqueId().attr("id");
                this.ids = {
                    element: e,
                    button: e + "-button",
                    menu: e + "-menu"
                }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = t()
            },
            _drawButton: function() {
                var e, i = this,
                    n = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
                this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, {
                    click: function(t) {
                        this.button.focus(), t.preventDefault()
                    }
                }), this.element.hide(), this.button = t("<span>", {
                    tabindex: this.options.disabled ? -1 : 0,
                    id: this.ids.button,
                    role: "combobox",
                    "aria-expanded": "false",
                    "aria-autocomplete": "list",
                    "aria-owns": this.ids.menu,
                    "aria-haspopup": "true",
                    title: this.element.attr("title")
                }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), e = t("<span>").appendTo(this.button), this._addClass(e, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(n).appendTo(this.button), !1 !== this.options.width && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
                    i._rendered || i._refreshMenu()
                })
            },
            _drawMenu: function() {
                var e = this;
                this.menu = t("<ul>", {
                    "aria-hidden": "true",
                    "aria-labelledby": this.ids.button,
                    id: this.ids.menu
                }), this.menuWrap = t("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                    classes: {
                        "ui-menu": "ui-corner-bottom"
                    },
                    role: "listbox",
                    select: function(t, i) {
                        t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t)
                    },
                    focus: function(t, i) {
                        var n = i.item.data("ui-selectmenu-item");
                        null != e.focusIndex && n.index !== e.focusIndex && (e._trigger("focus", t, {
                            item: n
                        }), e.isOpen || e._select(n, t)), e.focusIndex = n.index, e.button.attr("aria-activedescendant", e.menuItems.eq(n.index).attr("id"))
                    }
                }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
                    return !1
                }, this.menuInstance._isDivider = function() {
                    return !1
                }
            },
            refresh: function() {
                this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton()
            },
            _refreshMenu: function() {
                var t, e = this.element.find("option");
                this.menu.empty(), this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, e.length && (t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
            },
            open: function(t) {
                this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)))
            },
            _position: function() {
                this.menuWrap.position(t.extend({
                    of: this.button
                }, this.options.position))
            },
            close: function(t) {
                this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
            },
            widget: function() {
                return this.button
            },
            menuWidget: function() {
                return this.menu
            },
            _renderButtonItem: function(e) {
                var i = t("<span>");
                return this._setText(i, e.label), this._addClass(i, "ui-selectmenu-text"), i
            },
            _renderMenu: function(e, i) {
                var n = this,
                    s = "";
                t.each(i, function(i, o) {
                    var r;
                    o.optgroup !== s && (r = t("<li>", {
                        text: o.optgroup
                    }), n._addClass(r, "ui-selectmenu-optgroup", "ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), r.appendTo(e), s = o.optgroup), n._renderItemData(e, o)
                })
            },
            _renderItemData: function(t, e) {
                return this._renderItem(t, e).data("ui-selectmenu-item", e)
            },
            _renderItem: function(e, i) {
                var n = t("<li>"),
                    s = t("<div>", {
                        title: i.element.attr("title")
                    });
                return i.disabled && this._addClass(n, null, "ui-state-disabled"), this._setText(s, i.label), n.append(s).appendTo(e)
            },
            _setText: function(t, e) {
                e ? t.text(e) : t.html("&#160;")
            },
            _move: function(t, e) {
                var i, n, s = ".ui-menu-item";
                this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), s += ":not(.ui-state-disabled)"), n = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1) : i[t + "All"](s).eq(0), n.length && this.menuInstance.focus(e, n)
            },
            _getSelectedItem: function() {
                return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
            },
            _toggle: function(t) {
                this[this.isOpen ? "close" : "open"](t)
            },
            _setSelection: function() {
                var t;
                this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
            },
            _documentClick: {
                mousedown: function(e) {
                    this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)).length || this.close(e))
                }
            },
            _buttonEvents: {
                mousedown: function() {
                    var t;
                    window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
                },
                click: function(t) {
                    this._setSelection(), this._toggle(t)
                },
                keydown: function(e) {
                    var i = !0;
                    switch (e.keyCode) {
                        case t.ui.keyCode.TAB:
                        case t.ui.keyCode.ESCAPE:
                            this.close(e), i = !1;
                            break;
                        case t.ui.keyCode.ENTER:
                            this.isOpen && this._selectFocusedItem(e);
                            break;
                        case t.ui.keyCode.UP:
                            e.altKey ? this._toggle(e) : this._move("prev", e);
                            break;
                        case t.ui.keyCode.DOWN:
                            e.altKey ? this._toggle(e) : this._move("next", e);
                            break;
                        case t.ui.keyCode.SPACE:
                            this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                            break;
                        case t.ui.keyCode.LEFT:
                            this._move("prev", e);
                            break;
                        case t.ui.keyCode.RIGHT:
                            this._move("next", e);
                            break;
                        case t.ui.keyCode.HOME:
                        case t.ui.keyCode.PAGE_UP:
                            this._move("first", e);
                            break;
                        case t.ui.keyCode.END:
                        case t.ui.keyCode.PAGE_DOWN:
                            this._move("last", e);
                            break;
                        default:
                            this.menu.trigger(e), i = !1
                    }
                    i && e.preventDefault()
                }
            },
            _selectFocusedItem: function(t) {
                var e = this.menuItems.eq(this.focusIndex).parent("li");
                e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
            },
            _select: function(t, e) {
                var i = this.element[0].selectedIndex;
                this.element[0].selectedIndex = t.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)), this._setAria(t), this._trigger("select", e, {
                    item: t
                }), t.index !== i && this._trigger("change", e, {
                    item: t
                }), this.close(e)
            },
            _setAria: function(t) {
                var e = this.menuItems.eq(t.index).attr("id");
                this.button.attr({
                    "aria-labelledby": e,
                    "aria-activedescendant": e
                }), this.menu.attr("aria-activedescendant", e)
            },
            _setOption: function(t, e) {
                if ("icons" === t) {
                    var i = this.button.find("span.ui-icon");
                    this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button)
                }
                this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton()
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.menuInstance.option("disabled", t), this.button.attr("aria-disabled", t), this._toggleClass(this.button, null, "ui-state-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
            },
            _toggleAttr: function() {
                this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
            },
            _resizeButton: function() {
                var t = this.options.width;
                if (!1 === t) return void this.button.css("width", "");
                null === t && (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t)
            },
            _resizeMenu: function() {
                this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
            },
            _getCreateOptions: function() {
                var t = this._super();
                return t.disabled = this.element.prop("disabled"), t
            },
            _parseOptions: function(e) {
                var i = this,
                    n = [];
                e.each(function(e, s) {
                    n.push(i._parseOption(t(s), e))
                }), this.items = n
            },
            _parseOption: function(t, e) {
                var i = t.parent("optgroup");
                return {
                    element: t,
                    index: e,
                    value: t.val(),
                    label: t.text(),
                    optgroup: i.attr("label") || "",
                    disabled: i.prop("disabled") || t.prop("disabled")
                }
            },
            _destroy: function() {
                this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element)
            }
        }]), t.widget("ui.slider", t.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                classes: {
                    "ui-slider": "ui-corner-all",
                    "ui-slider-handle": "ui-corner-all",
                    "ui-slider-range": "ui-corner-all ui-widget-header"
                },
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            numPages: 5,
            _create: function() {
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1
            },
            _refresh: function() {
                this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
            },
            _createHandles: function() {
                var e, i, n = this.options,
                    s = this.element.find(".ui-slider-handle"),
                    o = [];
                for (i = n.values && n.values.length || 1, s.length > i && (s.slice(i).remove(), s = s.slice(0, i)), e = s.length; e < i; e++) o.push("<span tabindex='0'></span>");
                this.handles = s.add(t(o.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                    t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0)
                })
            },
            _createRange: function() {
                var e = this.options;
                e.range ? (!0 === e.range && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
                    left: "",
                    bottom: ""
                })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== e.range && "max" !== e.range || this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null)
            },
            _setupEvents: function() {
                this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
            },
            _destroy: function() {
                this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy()
            },
            _mouseCapture: function(e) {
                var i, n, s, o, r, a, l, h = this,
                    u = this.options;
                return !u.disabled && (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), i = {
                    x: e.pageX,
                    y: e.pageY
                }, n = this._normValueFromMouse(i), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                    var i = Math.abs(n - h.values(e));
                    (s > i || s === i && (e === h._lastChangedValue || h.values(e) === u.min)) && (s = i, o = t(this), r = e)
                }), !1 !== this._start(e, r) && (this._mouseSliding = !0, this._handleIndex = r, this._addClass(o, null, "ui-state-active"), o.trigger("focus"), a = o.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
                    left: 0,
                    top: 0
                } : {
                    left: e.pageX - a.left - o.width() / 2,
                    top: e.pageY - a.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(e, r, n), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(t) {
                var e = {
                        x: t.pageX,
                        y: t.pageY
                    },
                    i = this._normValueFromMouse(e);
                return this._slide(t, this._handleIndex, i), !1
            },
            _mouseStop: function(t) {
                return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(t) {
                var e, i, n, s, o;
                return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), n = i / e, n > 1 && (n = 1), n < 0 && (n = 0), "vertical" === this.orientation && (n = 1 - n), s = this._valueMax() - this._valueMin(), o = this._valueMin() + n * s, this._trimAlignValue(o)
            },
            _uiHash: function(t, e, i) {
                var n = {
                    handle: this.handles[t],
                    handleIndex: t,
                    value: void 0 !== e ? e : this.value()
                };
                return this._hasMultipleValues() && (n.value = void 0 !== e ? e : this.values(t), n.values = i || this.values()), n
            },
            _hasMultipleValues: function() {
                return this.options.values && this.options.values.length
            },
            _start: function(t, e) {
                return this._trigger("start", t, this._uiHash(e))
            },
            _slide: function(t, e, i) {
                var n, s = this.value(),
                    o = this.values();
                this._hasMultipleValues() && (n = this.values(e ? 0 : 1), s = this.values(e), 2 === this.options.values.length && !0 === this.options.range && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), o[e] = i), i !== s && !1 !== this._trigger("slide", t, this._uiHash(e, i, o)) && (this._hasMultipleValues() ? this.values(e, i) : this.value(i))
            },
            _stop: function(t, e) {
                this._trigger("stop", t, this._uiHash(e))
            },
            _change: function(t, e) {
                this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)))
            },
            value: function(t) {
                return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
            },
            values: function(e, i) {
                var n, s, o;
                if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
                if (!arguments.length) return this._values();
                if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value();
                for (n = this.options.values, s = arguments[0], o = 0; o < n.length; o += 1) n[o] = this._trimAlignValue(s[o]), this._change(null, o);
                this._refreshValue()
            },
            _setOption: function(e, i) {
                var n, s = 0;
                switch ("range" === e && !0 === this.options.range && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (s = this.options.values.length), this._super(e, i), e) {
                    case "orientation":
                        this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), n = s - 1; n >= 0; n--) this._change(null, n);
                        this._animateOff = !1;
                        break;
                    case "step":
                    case "min":
                    case "max":
                        this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                        break;
                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1
                }
            },
            _setOptionDisabled: function(t) {
                this._super(t), this._toggleClass(null, "ui-state-disabled", !!t)
            },
            _value: function() {
                var t = this.options.value;
                return t = this._trimAlignValue(t)
            },
            _values: function(t) {
                var e, i, n;
                if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
                if (this._hasMultipleValues()) {
                    for (i = this.options.values.slice(), n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(i[n]);
                    return i
                }
                return []
            },
            _trimAlignValue: function(t) {
                if (t <= this._valueMin()) return this._valueMin();
                if (t >= this._valueMax()) return this._valueMax();
                var e = this.options.step > 0 ? this.options.step : 1,
                    i = (t - this._valueMin()) % e,
                    n = t - i;
                return 2 * Math.abs(i) >= e && (n += i > 0 ? e : -e), parseFloat(n.toFixed(5))
            },
            _calculateNewMax: function() {
                var t = this.options.max,
                    e = this._valueMin(),
                    i = this.options.step;
                t = Math.round((t - e) / i) * i + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()))
            },
            _precision: function() {
                var t = this._precisionOf(this.options.step);
                return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
            },
            _precisionOf: function(t) {
                var e = t.toString(),
                    i = e.indexOf(".");
                return -1 === i ? 0 : e.length - i - 1
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.max
            },
            _refreshRange: function(t) {
                "vertical" === t && this.range.css({
                    width: "",
                    left: ""
                }), "horizontal" === t && this.range.css({
                    height: "",
                    bottom: ""
                })
            },
            _refreshValue: function() {
                var e, i, n, s, o, r = this.options.range,
                    a = this.options,
                    l = this,
                    h = !this._animateOff && a.animate,
                    u = {};
                this._hasMultipleValues() ? this.handles.each(function(n) {
                    i = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100,
                        u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](u, a.animate), !0 === l.options.range && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                            left: i + "%"
                        }, a.animate), 1 === n && l.range[h ? "animate" : "css"]({
                            width: i - e + "%"
                        }, {
                            queue: !1,
                            duration: a.animate
                        })) : (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                            bottom: i + "%"
                        }, a.animate), 1 === n && l.range[h ? "animate" : "css"]({
                            height: i - e + "%"
                        }, {
                            queue: !1,
                            duration: a.animate
                        }))), e = i
                }) : (n = this.value(), s = this._valueMin(), o = this._valueMax(), i = o !== s ? (n - s) / (o - s) * 100 : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](u, a.animate), "min" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    width: i + "%"
                }, a.animate), "max" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    width: 100 - i + "%"
                }, a.animate), "min" === r && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    height: i + "%"
                }, a.animate), "max" === r && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    height: 100 - i + "%"
                }, a.animate))
            },
            _handleEvents: {
                keydown: function(e) {
                    var i, n, s, o = t(e.target).data("ui-slider-handle-index");
                    switch (e.keyCode) {
                        case t.ui.keyCode.HOME:
                        case t.ui.keyCode.END:
                        case t.ui.keyCode.PAGE_UP:
                        case t.ui.keyCode.PAGE_DOWN:
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), !1 === this._start(e, o))) return
                    }
                    switch (s = this.options.step, i = n = this._hasMultipleValues() ? this.values(o) : this.value(), e.keyCode) {
                        case t.ui.keyCode.HOME:
                            n = this._valueMin();
                            break;
                        case t.ui.keyCode.END:
                            n = this._valueMax();
                            break;
                        case t.ui.keyCode.PAGE_UP:
                            n = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / this.numPages);
                            break;
                        case t.ui.keyCode.PAGE_DOWN:
                            n = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / this.numPages);
                            break;
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                            if (i === this._valueMax()) return;
                            n = this._trimAlignValue(i + s);
                            break;
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (i === this._valueMin()) return;
                            n = this._trimAlignValue(i - s)
                    }
                    this._slide(e, o, n)
                },
                keyup: function(e) {
                    var i = t(e.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active"))
                }
            }
        }), t.widget("ui.sortable", t.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _isOverAxis: function(t, e, i) {
                return t >= e && t < e + i
            },
            _isFloating: function(t) {
                return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
            },
            _create: function() {
                this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
            },
            _setOption: function(t, e) {
                this._super(t, e), "handle" === t && this._setHandleClassName()
            },
            _setHandleClassName: function() {
                var e = this;
                this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), t.each(this.items, function() {
                    e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
                })
            },
            _destroy: function() {
                this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                return this
            },
            _mouseCapture: function(e, i) {
                var n = null,
                    s = !1,
                    o = this;
                return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(e), t(e.target).parents().each(function() {
                    if (t.data(this, o.widgetName + "-item") === o) return n = t(this), !1
                }), t.data(e.target, o.widgetName + "-item") === o && (n = t(e.target)), !!n && (!(this.options.handle && !i && (t(this.options.handle, n).find("*").addBack().each(function() {
                    this === e.target && (s = !0)
                }), !s)) && (this.currentItem = n, this._removeCurrentsFromItems(), !0))))
            },
            _mouseStart: function(e, i, n) {
                var s, o, r = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", r.cursor), this.storedStylesheet = t("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(o)), r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                    for (s = this.containers.length - 1; s >= 0; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
                return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(e), !0
            },
            _mouseDrag: function(e) {
                var i, n, s, o, r = this.options,
                    a = !1;
                for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < r.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + r.scrollSpeed : e.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - r.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < r.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + r.scrollSpeed : e.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - r.scrollSpeed)) : (e.pageY - this.document.scrollTop() < r.scrollSensitivity ? a = this.document.scrollTop(this.document.scrollTop() - r.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < r.scrollSensitivity && (a = this.document.scrollTop(this.document.scrollTop() + r.scrollSpeed)), e.pageX - this.document.scrollLeft() < r.scrollSensitivity ? a = this.document.scrollLeft(this.document.scrollLeft() - r.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < r.scrollSensitivity && (a = this.document.scrollLeft(this.document.scrollLeft() + r.scrollSpeed))), !1 !== a && t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                    if (n = this.items[i], s = n.item[0], (o = this._intersectsWithPointer(n)) && n.instance === this.currentContainer && !(s === this.currentItem[0] || this.placeholder[1 === o ? "next" : "prev"]()[0] === s || t.contains(this.placeholder[0], s) || "semi-dynamic" === this.options.type && t.contains(this.element[0], s))) {
                        if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                        this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                        break
                    }
                return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(e, i) {
                if (e) {
                    if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                        var n = this,
                            s = this.placeholder.offset(),
                            o = this.options.axis,
                            r = {};
                        o && "x" !== o || (r.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (r.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() {
                            n._clear(e)
                        })
                    } else this._clear(e, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp(new t.Event("mouseup", {
                        target: null
                    })), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, t(i).each(function() {
                    var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                    i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
                }), !n.length && e.key && n.push(e.key + "="), n.join("&")
            },
            toArray: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, i.each(function() {
                    n.push(t(e.item || this).attr(e.attribute || "id") || "")
                }), n
            },
            _intersectsWith: function(t) {
                var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    n = this.positionAbs.top,
                    s = n + this.helperProportions.height,
                    o = t.left,
                    r = o + t.width,
                    a = t.top,
                    l = a + t.height,
                    h = this.offset.click.top,
                    u = this.offset.click.left,
                    c = "x" === this.options.axis || n + h > a && n + h < l,
                    d = "y" === this.options.axis || e + u > o && e + u < r,
                    p = c && d;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < r && a < n + this.helperProportions.height / 2 && s - this.helperProportions.height / 2 < l
            },
            _intersectsWithPointer: function(t) {
                var e, i, n = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    s = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width);
                return !(!n || !s) && (e = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1))
            },
            _intersectsWithSides: function(t) {
                var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    n = this._getDragVerticalDirection(),
                    s = this._getDragHorizontalDirection();
                return this.floating && s ? "right" === s && i || "left" === s && !i : n && ("down" === n && e || "up" === n && !e)
            },
            _getDragVerticalDirection: function() {
                var t = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== t && (t > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var t = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== t && (t > 0 ? "right" : "left")
            },
            refresh: function(t) {
                return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
            },
            _connectWith: function() {
                var t = this.options;
                return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
            },
            _getItemsAsjQuery: function(e) {
                function i() {
                    a.push(this)
                }
                var n, s, o, r, a = [],
                    l = [],
                    h = this._connectWith();
                if (h && e)
                    for (n = h.length - 1; n >= 0; n--)
                        for (o = t(h[n], this.document[0]), s = o.length - 1; s >= 0; s--)(r = t.data(o[s], this.widgetFullName)) && r !== this && !r.options.disabled && l.push([t.isFunction(r.options.items) ? r.options.items.call(r.element) : t(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r]);
                for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = l.length - 1; n >= 0; n--) l[n][0].each(i);
                return t(a)
            },
            _removeCurrentsFromItems: function() {
                var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = t.grep(this.items, function(t) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i] === t.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(e) {
                this.items = [], this.containers = [this];
                var i, n, s, o, r, a, l, h, u = this.items,
                    c = [
                        [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                            item: this.currentItem
                        }) : t(this.options.items, this.element), this]
                    ],
                    d = this._connectWith();
                if (d && this.ready)
                    for (i = d.length - 1; i >= 0; i--)
                        for (s = t(d[i], this.document[0]), n = s.length - 1; n >= 0; n--)(o = t.data(s[n], this.widgetFullName)) && o !== this && !o.options.disabled && (c.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                            item: this.currentItem
                        }) : t(o.options.items, o.element), o]), this.containers.push(o));
                for (i = c.length - 1; i >= 0; i--)
                    for (r = c[i][1], a = c[i][0], n = 0, h = a.length; n < h; n++) l = t(a[n]), l.data(this.widgetName + "-item", r), u.push({
                        item: l,
                        instance: r,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(e) {
                this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)), this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, n, s, o;
                for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = s.outerWidth(), n.height = s.outerHeight()), o = s.offset(), n.left = o.left, n.top = o.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(e) {
                e = e || this;
                var i, n = e.options;
                n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                    element: function() {
                        var n = e.currentItem[0].nodeName.toLowerCase(),
                            s = t("<" + n + ">", e.document[0]);
                        return e._addClass(s, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(s, "ui-sortable-helper"), "tbody" === n ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(s)) : "tr" === n ? e._createTrPlaceholder(e.currentItem, s) : "img" === n && s.attr("src", e.currentItem.attr("src")), i || s.css("visibility", "hidden"), s
                    },
                    update: function(t, s) {
                        i && !n.forcePlaceholderSize || (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
            },
            _createTrPlaceholder: function(e, i) {
                var n = this;
                e.children().each(function() {
                    t("<td>&#160;</td>", n.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
                })
            },
            _contactContainers: function(e) {
                var i, n, s, o, r, a, l, h, u, c, d = null,
                    p = null;
                for (i = this.containers.length - 1; i >= 0; i--)
                    if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                        if (this._intersectsWith(this.containers[i].containerCache)) {
                            if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
                            d = this.containers[i], p = i
                        } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
                if (d)
                    if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                    else {
                        for (s = 1e4, o = null, u = d.floating || this._isFloating(this.currentItem), r = u ? "left" : "top", a = u ? "width" : "height", c = u ? "pageX" : "pageY", n = this.items.length - 1; n >= 0; n--) t.contains(this.containers[p].element[0], this.items[n].item[0]) && this.items[n].item[0] !== this.currentItem[0] && (l = this.items[n].item.offset()[r], h = !1, e[c] - l > this.items[n][a] / 2 && (h = !0), Math.abs(e[c] - l) < s && (s = Math.abs(e[c] - l), o = this.items[n], this.direction = h ? "up" : "down"));
                        if (!o && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[p]) return void(this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1));
                        o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
                    }
            },
            _createHelper: function(e) {
                var i = this.options,
                    n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), n[0].style.width && !i.forceHelperSize || n.width(this.currentItem.width()), n[0].style.height && !i.forceHelperSize || n.height(this.currentItem.height()), n
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var t = this.currentItem.position();
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, n, s = this.options;
                "parent" === s.containment && (s.containment = this.helper[0].parentNode), "document" !== s.containment && "window" !== s.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === s.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === s.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var n = "absolute" === e ? 1 : -1,
                    s = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(s[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * n,
                    left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * n
                }
            },
            _generatePosition: function(e) {
                var i, n, s = this.options,
                    o = e.pageX,
                    r = e.pageY,
                    a = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = /(html|body)/i.test(a[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), s.grid && (i = this.originalPageY + Math.round((r - this.originalPageY) / s.grid[1]) * s.grid[1], r = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, n = this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0], o = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)), {
                    top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                    left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
                }
            },
            _rearrange: function(t, e, i, n) {
                i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var s = this.counter;
                this._delay(function() {
                    s === this.counter && this.refreshPositions(!n)
                })
            },
            _clear: function(t, e) {
                function i(t, e, i) {
                    return function(n) {
                        i._trigger(t, n, e._uiHash(e))
                    }
                }
                this.reverting = !1;
                var n, s = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (n in this._storedCSS) "auto" !== this._storedCSS[n] && "static" !== this._storedCSS[n] || (this._storedCSS[n] = "");
                    this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !e && s.push(function(t) {
                        this._trigger("receive", t, this._uiHash(this.fromOutside))
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                        this._trigger("update", t, this._uiHash())
                    }), this !== this.currentContainer && (e || (s.push(function(t) {
                        this._trigger("remove", t, this._uiHash())
                    }), s.push(function(t) {
                        return function(e) {
                            t._trigger("receive", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), s.push(function(t) {
                        return function(e) {
                            t._trigger("update", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || s.push(i("deactivate", this, this.containers[n])), this.containers[n].containerCache.over && (s.push(i("out", this, this.containers[n])), this.containers[n].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                    for (n = 0; n < s.length; n++) s[n].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !this.cancelHelperRemoval
            },
            _trigger: function() {
                !1 === t.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
            },
            _uiHash: function(e) {
                var i = e || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || t([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: e ? e.element : null
                }
            }
        });
        t.widget("ui.spinner", {
            version: "1.12.1",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                classes: {
                    "ui-spinner": "ui-corner-all",
                    "ui-spinner-down": "ui-corner-br",
                    "ui-spinner-up": "ui-corner-tr"
                },
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _getCreateOptions: function() {
                var e = this._super(),
                    i = this.element;
                return t.each(["min", "max", "step"], function(t, n) {
                    var s = i.attr(n);
                    null != s && s.length && (e[n] = s)
                }), e
            },
            _events: {
                keydown: function(t) {
                    this._start(t) && this._keydown(t) && t.preventDefault()
                },
                keyup: "_stop",
                focus: function() {
                    this.previous = this.element.val()
                },
                blur: function(t) {
                    if (this.cancelBlur) return void delete this.cancelBlur;
                    this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t)
                },
                mousewheel: function(t, e) {
                    if (e) {
                        if (!this.spinning && !this._start(t)) return !1;
                        this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                            this.spinning && this._stop(t)
                        }, 100), t.preventDefault()
                    }
                },
                "mousedown .ui-spinner-button": function(e) {
                    function i() {
                        this.element[0] === t.ui.safeActiveElement(this.document[0]) || (this.element.trigger("focus"), this.previous = n, this._delay(function() {
                            this.previous = n
                        }))
                    }
                    var n;
                    n = this.element[0] === t.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur, i.call(this)
                    }), !1 !== this._start(e) && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function(e) {
                    if (t(e.currentTarget).hasClass("ui-state-active")) return !1 !== this._start(e) && void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>")
            },
            _draw: function() {
                this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
                    classes: {
                        "ui-button": ""
                    }
                }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({
                    icon: this.options.icons.up,
                    showLabel: !1
                }), this.buttons.last().button({
                    icon: this.options.icons.down,
                    showLabel: !1
                }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height())
            },
            _keydown: function(e) {
                var i = this.options,
                    n = t.ui.keyCode;
                switch (e.keyCode) {
                    case n.UP:
                        return this._repeat(null, 1, e), !0;
                    case n.DOWN:
                        return this._repeat(null, -1, e), !0;
                    case n.PAGE_UP:
                        return this._repeat(null, i.page, e), !0;
                    case n.PAGE_DOWN:
                        return this._repeat(null, -i.page, e), !0
                }
                return !1
            },
            _start: function(t) {
                return !(!this.spinning && !1 === this._trigger("start", t)) && (this.counter || (this.counter = 1), this.spinning = !0, !0)
            },
            _repeat: function(t, e, i) {
                t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                    this._repeat(40, e, i)
                }, t), this._spin(e * this.options.step, i)
            },
            _spin: function(t, e) {
                var i = this.value() || 0;
                this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && !1 === this._trigger("spin", e, {
                    value: i
                }) || (this._value(i), this.counter++)
            },
            _increment: function(e) {
                var i = this.options.incremental;
                return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
            },
            _precision: function() {
                var t = this._precisionOf(this.options.step);
                return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
            },
            _precisionOf: function(t) {
                var e = t.toString(),
                    i = e.indexOf(".");
                return -1 === i ? 0 : e.length - i - 1
            },
            _adjustValue: function(t) {
                var e, i, n = this.options;
                return e = null !== n.min ? n.min : 0, i = t - e, i = Math.round(i / n.step) * n.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== n.max && t > n.max ? n.max : null !== n.min && t < n.min ? n.min : t
            },
            _stop: function(t) {
                this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
            },
            _setOption: function(t, e) {
                var i, n, s;
                if ("culture" === t || "numberFormat" === t) return i = this._parse(this.element.val()), this.options[t] = e, void this.element.val(this._format(i));
                "max" !== t && "min" !== t && "step" !== t || "string" == typeof e && (e = this._parse(e)), "icons" === t && (n = this.buttons.first().find(".ui-icon"), this._removeClass(n, null, this.options.icons.up), this._addClass(n, null, e.up),
                    s = this.buttons.last().find(".ui-icon"), this._removeClass(s, null, this.options.icons.down), this._addClass(s, null, e.down)), this._super(t, e)
            },
            _setOptionDisabled: function(t) {
                this._super(t), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable")
            },
            _setOptions: a(function(t) {
                this._super(t)
            }),
            _parse: function(t) {
                return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
            },
            _format: function(t) {
                return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
            },
            _refresh: function() {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                })
            },
            isValid: function() {
                var t = this.value();
                return null !== t && t === this._adjustValue(t)
            },
            _value: function(t, e) {
                var i;
                "" !== t && null !== (i = this._parse(t)) && (e || (i = this._adjustValue(i)), t = this._format(i)), this.element.val(t), this._refresh()
            },
            _destroy: function() {
                this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element)
            },
            stepUp: a(function(t) {
                this._stepUp(t)
            }),
            _stepUp: function(t) {
                this._start() && (this._spin((t || 1) * this.options.step), this._stop())
            },
            stepDown: a(function(t) {
                this._stepDown(t)
            }),
            _stepDown: function(t) {
                this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
            },
            pageUp: a(function(t) {
                this._stepUp((t || 1) * this.options.page)
            }),
            pageDown: a(function(t) {
                this._stepDown((t || 1) * this.options.page)
            }),
            value: function(t) {
                if (!arguments.length) return this._parse(this.element.val());
                a(this._value).call(this, t)
            },
            widget: function() {
                return this.uiSpinner
            }
        }), !1 !== t.uiBackCompat && t.widget("ui.spinner", t.ui.spinner, {
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
            },
            _uiSpinnerHtml: function() {
                return "<span>"
            },
            _buttonHtml: function() {
                return "<a></a><a></a>"
            }
        });
        t.ui.spinner;
        t.widget("ui.tabs", {
            version: "1.12.1",
            delay: 300,
            options: {
                active: null,
                classes: {
                    "ui-tabs": "ui-corner-all",
                    "ui-tabs-nav": "ui-corner-all",
                    "ui-tabs-panel": "ui-corner-bottom",
                    "ui-tabs-tab": "ui-corner-top"
                },
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _isLocal: function() {
                return function(t) {
                    var e, i;
                    e = t.href.replace(/#.*$/, ""), i = location.href.replace(/#.*$/, "");
                    try {
                        e = decodeURIComponent(e)
                    } catch (t) {}
                    try {
                        i = decodeURIComponent(i)
                    } catch (t) {}
                    return t.hash.length > 1 && e === i
                }
            }(),
            _create: function() {
                var e = this,
                    i = this.options;
                this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                    return e.tabs.index(t)
                }))).sort()), !1 !== this.options.active && this.anchors.length ? this.active = this._findActive(i.active) : this.active = t(), this._refresh(), this.active.length && this.load(i.active)
            },
            _initialActive: function() {
                var e = this.options.active,
                    i = this.options.collapsible,
                    n = location.hash.substring(1);
                return null === e && (n && this.tabs.each(function(i, s) {
                    if (t(s).attr("aria-controls") === n) return e = i, !1
                }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== e && -1 !== e || (e = !!this.tabs.length && 0)), !1 !== e && -1 === (e = this.tabs.index(this.tabs.eq(e))) && (e = !i && 0), !i && !1 === e && this.anchors.length && (e = 0), e
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : t()
                }
            },
            _tabKeydown: function(e) {
                var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
                    n = this.tabs.index(i),
                    s = !0;
                if (!this._handlePageNav(e)) {
                    switch (e.keyCode) {
                        case t.ui.keyCode.RIGHT:
                        case t.ui.keyCode.DOWN:
                            n++;
                            break;
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.LEFT:
                            s = !1, n--;
                            break;
                        case t.ui.keyCode.END:
                            n = this.anchors.length - 1;
                            break;
                        case t.ui.keyCode.HOME:
                            n = 0;
                            break;
                        case t.ui.keyCode.SPACE:
                            return e.preventDefault(), clearTimeout(this.activating), void this._activate(n);
                        case t.ui.keyCode.ENTER:
                            return e.preventDefault(), clearTimeout(this.activating), void this._activate(n !== this.options.active && n);
                        default:
                            return
                    }
                    e.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, s), e.ctrlKey || e.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                        this.option("active", n)
                    }, this.delay))
                }
            },
            _panelKeydown: function(e) {
                this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.trigger("focus"))
            },
            _handlePageNav: function(e) {
                return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
            },
            _findNextTab: function(e, i) {
                for (var n = this.tabs.length - 1; - 1 !== t.inArray(function() {
                        return e > n && (e = 0), e < 0 && (e = n), e
                    }(), this.options.disabled);) e = i ? e + 1 : e - 1;
                return e
            },
            _focusNextTab: function(t, e) {
                return t = this._findNextTab(t, e), this.tabs.eq(t).trigger("focus"), t
            },
            _setOption: function(t, e) {
                if ("active" === t) return void this._activate(e);
                this._super(t, e), "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e), e || !1 !== this.options.active || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e)
            },
            _sanitizeSelector: function(t) {
                return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var e = this.options,
                    i = this.tablist.children(":has(a[href])");
                e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                    return i.index(t)
                }), this._processTabs(), !1 !== e.active && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
            },
            _refresh: function() {
                this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var e = this,
                    i = this.tabs,
                    n = this.anchors,
                    s = this.panels;
                this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function(e) {
                    t(this).is(".ui-state-disabled") && e.preventDefault()
                }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                    t(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this.tabs = this.tablist.find("> li:has(a[href])").attr({
                    role: "tab",
                    tabIndex: -1
                }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function() {
                    return t("a", this)[0]
                }).attr({
                    role: "presentation",
                    tabIndex: -1
                }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = t(), this.anchors.each(function(i, n) {
                    var s, o, r, a = t(n).uniqueId().attr("id"),
                        l = t(n).closest("li"),
                        h = l.attr("aria-controls");
                    e._isLocal(n) ? (s = n.hash, r = s.substring(1), o = e.element.find(e._sanitizeSelector(s))) : (r = l.attr("aria-controls") || t({}).uniqueId()[0].id, s = "#" + r, o = e.element.find(s), o.length || (o = e._createPanel(r), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), h && l.data("ui-tabs-aria-controls", h), l.attr({
                        "aria-controls": r,
                        "aria-labelledby": a
                    }), o.attr("aria-labelledby", a)
                }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), i && (this._off(i.not(this.tabs)), this._off(n.not(this.anchors)), this._off(s.not(this.panels)))
            },
            _getList: function() {
                return this.tablist || this.element.find("ol, ul").eq(0)
            },
            _createPanel: function(e) {
                return t("<div>").attr("id", e).data("ui-tabs-destroy", !0)
            },
            _setOptionDisabled: function(e) {
                var i, n, s;
                for (t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1), s = 0; n = this.tabs[s]; s++) i = t(n), !0 === e || -1 !== t.inArray(s, e) ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
                this.options.disabled = e, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !0 === e)
            },
            _setupEvents: function(e) {
                var i = {};
                e && t.each(e.split(" "), function(t, e) {
                    i[e] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                    click: function(t) {
                        t.preventDefault()
                    }
                }), this._on(this.anchors, i), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(e) {
                var i, n = this.element.parent();
                "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                    var e = t(this),
                        n = e.css("position");
                    "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function() {
                    i -= t(this).outerHeight(!0)
                }), this.panels.each(function() {
                    t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
                }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                    i = Math.max(i, t(this).height("").height())
                }).height(i))
            },
            _eventHandler: function(e) {
                var i = this.options,
                    n = this.active,
                    s = t(e.currentTarget),
                    o = s.closest("li"),
                    r = o[0] === n[0],
                    a = r && i.collapsible,
                    l = a ? t() : this._getPanelForTab(o),
                    h = n.length ? this._getPanelForTab(n) : t(),
                    u = {
                        oldTab: n,
                        oldPanel: h,
                        newTab: a ? t() : o,
                        newPanel: l
                    };
                e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || r && !i.collapsible || !1 === this._trigger("beforeActivate", e, u) || (i.active = !a && this.tabs.index(o), this.active = r ? t() : o, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(o), e), this._toggle(e, u))
            },
            _toggle: function(e, i) {
                function n() {
                    o.running = !1, o._trigger("activate", e, i)
                }

                function s() {
                    o._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), r.length && o.options.show ? o._show(r, o.options.show, n) : (r.show(), n())
                }
                var o = this,
                    r = i.newPanel,
                    a = i.oldPanel;
                this.running = !0, a.length && this.options.hide ? this._hide(a, this.options.hide, function() {
                    o._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), s()
                }) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), a.hide(), s()), a.attr("aria-hidden", "true"), i.oldTab.attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), r.length && a.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() {
                    return 0 === t(this).attr("tabIndex")
                }).attr("tabIndex", -1), r.attr("aria-hidden", "false"), i.newTab.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _activate: function(e) {
                var i, n = this._findActive(e);
                n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: t.noop
                }))
            },
            _findActive: function(e) {
                return !1 === e ? t() : this.tabs.eq(e)
            },
            _getIndex: function(e) {
                return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']"))), e
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                    t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
                }), this.tabs.each(function() {
                    var e = t(this),
                        i = e.data("ui-tabs-aria-controls");
                    i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
            },
            enable: function(e) {
                var i = this.options.disabled;
                !1 !== i && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function(t) {
                    return t !== e ? t : null
                }) : t.map(this.tabs, function(t, i) {
                    return i !== e ? i : null
                })), this._setOptionDisabled(i))
            },
            disable: function(e) {
                var i = this.options.disabled;
                if (!0 !== i) {
                    if (void 0 === e) i = !0;
                    else {
                        if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;
                        i = t.isArray(i) ? t.merge([e], i).sort() : [e]
                    }
                    this._setOptionDisabled(i)
                }
            },
            load: function(e, i) {
                e = this._getIndex(e);
                var n = this,
                    s = this.tabs.eq(e),
                    o = s.find(".ui-tabs-anchor"),
                    r = this._getPanelForTab(s),
                    a = {
                        tab: s,
                        panel: r
                    },
                    l = function(t, e) {
                        "abort" === e && n.panels.stop(!1, !0), n._removeClass(s, "ui-tabs-loading"), r.removeAttr("aria-busy"), t === n.xhr && delete n.xhr
                    };
                this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, a)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(s, "ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.done(function(t, e, s) {
                    setTimeout(function() {
                        r.html(t), n._trigger("load", i, a), l(s, e)
                    }, 1)
                }).fail(function(t, e) {
                    setTimeout(function() {
                        l(t, e)
                    }, 1)
                })))
            },
            _ajaxSettings: function(e, i, n) {
                var s = this;
                return {
                    url: e.attr("href").replace(/#.*$/, ""),
                    beforeSend: function(e, o) {
                        return s._trigger("beforeLoad", i, t.extend({
                            jqXHR: e,
                            ajaxSettings: o
                        }, n))
                    }
                }
            },
            _getPanelForTab: function(e) {
                var i = t(e).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + i))
            }
        }), !1 !== t.uiBackCompat && t.widget("ui.tabs", t.ui.tabs, {
            _processTabs: function() {
                this._superApply(arguments), this._addClass(this.tabs, "ui-tab")
            }
        });
        t.ui.tabs;
        t.widget("ui.tooltip", {
            version: "1.12.1",
            options: {
                classes: {
                    "ui-tooltip": "ui-corner-all ui-widget-shadow"
                },
                content: function() {
                    var e = t(this).attr("title") || "";
                    return t("<a>").text(e).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                track: !1,
                close: null,
                open: null
            },
            _addDescribedBy: function(e, i) {
                var n = (e.attr("aria-describedby") || "").split(/\s+/);
                n.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(n.join(" ")))
            },
            _removeDescribedBy: function(e) {
                var i = e.data("ui-tooltip-id"),
                    n = (e.attr("aria-describedby") || "").split(/\s+/),
                    s = t.inArray(i, n); - 1 !== s && n.splice(s, 1), e.removeData("ui-tooltip-id"), n = t.trim(n.join(" ")), n ? e.attr("aria-describedby", n) : e.removeAttr("aria-describedby")
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }), this.tooltips = {}, this.parents = {}, this.liveRegion = t("<div>").attr({
                    role: "log",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = t([])
            },
            _setOption: function(e, i) {
                var n = this;
                this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
                    n._updateContent(e.element)
                })
            },
            _setOptionDisabled: function(t) {
                this[t ? "_disable" : "_enable"]()
            },
            _disable: function() {
                var e = this;
                t.each(this.tooltips, function(i, n) {
                    var s = t.Event("blur");
                    s.target = s.currentTarget = n.element[0], e.close(s, !0)
                }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                    var e = t(this);
                    if (e.is("[title]")) return e.data("ui-tooltip-title", e.attr("title")).removeAttr("title")
                }))
            },
            _enable: function() {
                this.disabledTitles.each(function() {
                    var e = t(this);
                    e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
                }), this.disabledTitles = t([])
            },
            open: function(e) {
                var i = this,
                    n = t(e ? e.target : this.element).closest(this.options.items);
                n.length && !n.data("ui-tooltip-id") && (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")), n.data("ui-tooltip-open", !0), e && "mouseover" === e.type && n.parents().each(function() {
                    var e, n = t(this);
                    n.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), n.attr("title") && (n.uniqueId(), i.parents[this.id] = {
                        element: this,
                        title: n.attr("title")
                    }, n.attr("title", ""))
                }), this._registerCloseHandlers(e, n), this._updateContent(n, e))
            },
            _updateContent: function(t, e) {
                var i, n = this.options.content,
                    s = this,
                    o = e ? e.type : null;
                if ("string" == typeof n || n.nodeType || n.jquery) return this._open(e, t, n);
                (i = n.call(t[0], function(i) {
                    s._delay(function() {
                        t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i))
                    })
                })) && this._open(e, t, i)
            },
            _open: function(e, i, n) {
                function s(t) {
                    h.of = t, r.is(":hidden") || r.position(h)
                }
                var o, r, a, l, h = t.extend({}, this.options.position);
                if (n) {
                    if (o = this._find(i)) return void o.tooltip.find(".ui-tooltip-content").html(n);
                    i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), r = o.tooltip, this._addDescribedBy(i, r.attr("id")), r.find(".ui-tooltip-content").html(n), this.liveRegion.children().hide(), l = t("<div>").html(r.find(".ui-tooltip-content").html()), l.removeAttr("name").find("[name]").removeAttr("name"), l.removeAttr("id").find("[id]").removeAttr("id"), l.appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, {
                        mousemove: s
                    }), s(e)) : r.position(t.extend({
                        of: i
                    }, this.options.position)), r.hide(), this._show(r, this.options.show), this.options.track && this.options.show && this.options.show.delay && (a = this.delayedShow = setInterval(function() {
                        r.is(":visible") && (s(h.of), clearInterval(a))
                    }, t.fx.interval)), this._trigger("open", e, {
                        tooltip: r
                    })
                }
            },
            _registerCloseHandlers: function(e, i) {
                var n = {
                    keyup: function(e) {
                        if (e.keyCode === t.ui.keyCode.ESCAPE) {
                            var n = t.Event(e);
                            n.currentTarget = i[0], this.close(n, !0)
                        }
                    }
                };
                i[0] !== this.element[0] && (n.remove = function() {
                    this._removeTooltip(this._find(i).tooltip)
                }), e && "mouseover" !== e.type || (n.mouseleave = "close"), e && "focusin" !== e.type || (n.focusout = "close"), this._on(!0, i, n)
            },
            close: function(e) {
                var i, n = this,
                    s = t(e ? e.currentTarget : this.element),
                    o = this._find(s);
                if (!o) return void s.removeData("ui-tooltip-open");
                i = o.tooltip, o.closing || (clearInterval(this.delayedShow), s.data("ui-tooltip-title") && !s.attr("title") && s.attr("title", s.data("ui-tooltip-title")), this._removeDescribedBy(s), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function() {
                    n._removeTooltip(t(this))
                }), s.removeData("ui-tooltip-open"), this._off(s, "mouseleave focusout keyup"), s[0] !== this.element[0] && this._off(s, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
                    t(i.element).attr("title", i.title), delete n.parents[e]
                }), o.closing = !0, this._trigger("close", e, {
                    tooltip: i
                }), o.hiding || (o.closing = !1))
            },
            _tooltip: function(e) {
                var i = t("<div>").attr("role", "tooltip"),
                    n = t("<div>").appendTo(i),
                    s = i.uniqueId().attr("id");
                return this._addClass(n, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(e)), this.tooltips[s] = {
                    element: e,
                    tooltip: i
                }
            },
            _find: function(t) {
                var e = t.data("ui-tooltip-id");
                return e ? this.tooltips[e] : null
            },
            _removeTooltip: function(t) {
                t.remove(), delete this.tooltips[t.attr("id")]
            },
            _appendTo: function(t) {
                var e = t.closest(".ui-front, dialog");
                return e.length || (e = this.document[0].body), e
            },
            _destroy: function() {
                var e = this;
                t.each(this.tooltips, function(i, n) {
                    var s = t.Event("blur"),
                        o = n.element;
                    s.target = s.currentTarget = o[0], e.close(s, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
                }), this.liveRegion.remove()
            }
        }), !1 !== t.uiBackCompat && t.widget("ui.tooltip", t.ui.tooltip, {
            options: {
                tooltipClass: null
            },
            _tooltip: function() {
                var t = this._superApply(arguments);
                return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass), t
            }
        });
        t.ui.tooltip
    }), function(t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e(require, exports, module) : t.Tether = e()
    }(this, function(t, e, i) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t) {
            var e = t.getBoundingClientRect(),
                i = {};
            for (var n in e) i[n] = e[n];
            if (t.ownerDocument !== document) {
                var o = t.ownerDocument.defaultView.frameElement;
                if (o) {
                    var r = s(o);
                    i.top += r.top, i.bottom += r.top, i.left += r.left, i.right += r.left
                }
            }
            return i
        }

        function o(t) {
            var e = getComputedStyle(t) || {},
                i = e.position,
                n = [];
            if ("fixed" === i) return [t];
            for (var s = t;
                (s = s.parentNode) && s && 1 === s.nodeType;) {
                var o = void 0;
                try {
                    o = getComputedStyle(s)
                } catch (t) {}
                if (void 0 === o || null === o) return n.push(s), n;
                var r = o,
                    a = r.overflow,
                    l = r.overflowX;
                /(auto|scroll)/.test(a + r.overflowY + l) && ("absolute" !== i || ["relative", "absolute", "fixed"].indexOf(o.position) >= 0) && n.push(s)
            }
            return n.push(t.ownerDocument.body), t.ownerDocument !== document && n.push(t.ownerDocument.defaultView), n
        }

        function r() {
            D && document.body.removeChild(D), D = null
        }

        function a(t) {
            var e = void 0;
            t === document ? (e = document, t = document.documentElement) : e = t.ownerDocument;
            var i = e.documentElement,
                n = s(t),
                o = I();
            return n.top -= o.top, n.left -= o.left, void 0 === n.width && (n.width = document.body.scrollWidth - n.left - n.right), void 0 === n.height && (n.height = document.body.scrollHeight - n.top - n.bottom), n.top = n.top - i.clientTop, n.left = n.left - i.clientLeft, n.right = e.body.clientWidth - n.width - n.left, n.bottom = e.body.clientHeight - n.height - n.top, n
        }

        function l(t) {
            return t.offsetParent || document.documentElement
        }

        function h() {
            if (S) return S;
            var t = document.createElement("div");
            t.style.width = "100%", t.style.height = "200px";
            var e = document.createElement("div");
            u(e.style, {
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                visibility: "hidden",
                width: "200px",
                height: "150px",
                overflow: "hidden"
            }), e.appendChild(t), document.body.appendChild(e);
            var i = t.offsetWidth;
            e.style.overflow = "scroll";
            var n = t.offsetWidth;
            i === n && (n = e.clientWidth), document.body.removeChild(e);
            var s = i - n;
            return S = {
                width: s,
                height: s
            }
        }

        function u() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                e = [];
            return Array.prototype.push.apply(e, arguments), e.slice(1).forEach(function(e) {
                if (e)
                    for (var i in e)({}).hasOwnProperty.call(e, i) && (t[i] = e[i])
            }), t
        }

        function c(t, e) {
            if (void 0 !== t.classList) e.split(" ").forEach(function(e) {
                e.trim() && t.classList.remove(e)
            });
            else {
                var i = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
                    n = f(t).replace(i, " ");
                g(t, n)
            }
        }

        function d(t, e) {
            if (void 0 !== t.classList) e.split(" ").forEach(function(e) {
                e.trim() && t.classList.add(e)
            });
            else {
                c(t, e);
                var i = f(t) + " " + e;
                g(t, i)
            }
        }

        function p(t, e) {
            if (void 0 !== t.classList) return t.classList.contains(e);
            var i = f(t);
            return new RegExp("(^| )" + e + "( |$)", "gi").test(i)
        }

        function f(t) {
            return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString ? t.className.baseVal : t.className
        }

        function g(t, e) {
            t.setAttribute("class", e)
        }

        function m(t, e, i) {
            i.forEach(function(i) {
                -1 === e.indexOf(i) && p(t, i) && c(t, i)
            }), e.forEach(function(e) {
                p(t, e) || d(t, e)
            })
        }

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function v(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }

        function _(t, e) {
            var i = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
            return t + i >= e && e >= t - i
        }

        function b() {
            return "undefined" != typeof performance && void 0 !== performance.now ? performance.now() : +new Date
        }

        function y() {
            for (var t = {
                    top: 0,
                    left: 0
                }, e = arguments.length, i = Array(e), n = 0; n < e; n++) i[n] = arguments[n];
            return i.forEach(function(e) {
                var i = e.top,
                    n = e.left;
                "string" == typeof i && (i = parseFloat(i, 10)), "string" == typeof n && (n = parseFloat(n, 10)), t.top += i, t.left += n
            }), t
        }

        function w(t, e) {
            return "string" == typeof t.left && -1 !== t.left.indexOf("%") && (t.left = parseFloat(t.left, 10) / 100 * e.width), "string" == typeof t.top && -1 !== t.top.indexOf("%") && (t.top = parseFloat(t.top, 10) / 100 * e.height), t
        }

        function x(t, e) {
            return "scrollParent" === e ? e = t.scrollParents[0] : "window" === e && (e = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]), e === document && (e = e.documentElement), void 0 !== e.nodeType && function() {
                var t = e,
                    i = a(e),
                    n = i,
                    s = getComputedStyle(e);
                if (e = [n.left, n.top, i.width + n.left, i.height + n.top], t.ownerDocument !== document) {
                    var o = t.ownerDocument.defaultView;
                    e[0] += o.pageXOffset, e[1] += o.pageYOffset, e[2] += o.pageXOffset, e[3] += o.pageYOffset
                }
                G.forEach(function(t, i) {
                    t = t[0].toUpperCase() + t.substr(1), "Top" === t || "Left" === t ? e[i] += parseFloat(s["border" + t + "Width"]) : e[i] -= parseFloat(s["border" + t + "Width"])
                })
            }(), e
        }
        var C = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            T = void 0;
        void 0 === T && (T = {
            modules: []
        });
        var D = null,
            k = function() {
                var t = 0;
                return function() {
                    return ++t
                }
            }(),
            E = {},
            I = function() {
                var t = D;
                t && document.body.contains(t) || (t = document.createElement("div"), t.setAttribute("data-tether-id", k()), u(t.style, {
                    top: 0,
                    left: 0,
                    position: "absolute"
                }), document.body.appendChild(t), D = t);
                var e = t.getAttribute("data-tether-id");
                return void 0 === E[e] && (E[e] = s(t), O(function() {
                    delete E[e]
                })), E[e]
            },
            S = null,
            A = [],
            O = function(t) {
                A.push(t)
            },
            P = function() {
                for (var t = void 0; t = A.pop();) t()
            },
            N = function() {
                function t() {
                    n(this, t)
                }
                return C(t, [{
                    key: "on",
                    value: function(t, e, i) {
                        var n = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
                        void 0 === this.bindings && (this.bindings = {}), void 0 === this.bindings[t] && (this.bindings[t] = []), this.bindings[t].push({
                            handler: e,
                            ctx: i,
                            once: n
                        })
                    }
                }, {
                    key: "once",
                    value: function(t, e, i) {
                        this.on(t, e, i, !0)
                    }
                }, {
                    key: "off",
                    value: function(t, e) {
                        if (void 0 !== this.bindings && void 0 !== this.bindings[t])
                            if (void 0 === e) delete this.bindings[t];
                            else
                                for (var i = 0; i < this.bindings[t].length;) this.bindings[t][i].handler === e ? this.bindings[t].splice(i, 1) : ++i
                    }
                }, {
                    key: "trigger",
                    value: function(t) {
                        if (void 0 !== this.bindings && this.bindings[t]) {
                            for (var e = 0, i = arguments.length, n = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s];
                            for (; e < this.bindings[t].length;) {
                                var o = this.bindings[t][e],
                                    r = o.handler,
                                    a = o.ctx,
                                    l = o.once,
                                    h = a;
                                void 0 === h && (h = this), r.apply(h, n), l ? this.bindings[t].splice(e, 1) : ++e
                            }
                        }
                    }
                }]), t
            }();
        T.Utils = {
            getActualBoundingClientRect: s,
            getScrollParents: o,
            getBounds: a,
            getOffsetParent: l,
            extend: u,
            addClass: d,
            removeClass: c,
            hasClass: p,
            updateClasses: m,
            defer: O,
            flush: P,
            uniqueId: k,
            Evented: N,
            getScrollBarSize: h,
            removeUtilElements: r
        };
        var M = function() {
                function t(t, e) {
                    var i = [],
                        n = !0,
                        s = !1,
                        o = void 0;
                    try {
                        for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0);
                    } catch (t) {
                        s = !0, o = t
                    } finally {
                        try {
                            !n && a.return && a.return()
                        } finally {
                            if (s) throw o
                        }
                    }
                    return i
                }
                return function(e, i) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            C = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            H = function(t, e, i) {
                for (var n = !0; n;) {
                    var s = t,
                        o = e,
                        r = i;
                    n = !1, null === s && (s = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(s, o);
                    if (void 0 !== a) {
                        if ("value" in a) return a.value;
                        var l = a.get;
                        if (void 0 === l) return;
                        return l.call(r)
                    }
                    var h = Object.getPrototypeOf(s);
                    if (null === h) return;
                    t = h, e = o, i = r, n = !0, a = h = void 0
                }
            };
        if (void 0 === T) throw new Error("You must include the utils.js file before tether.js");
        var L = T.Utils,
            o = L.getScrollParents,
            a = L.getBounds,
            l = L.getOffsetParent,
            u = L.extend,
            d = L.addClass,
            c = L.removeClass,
            m = L.updateClasses,
            O = L.defer,
            P = L.flush,
            h = L.getScrollBarSize,
            r = L.removeUtilElements,
            W = function() {
                if ("undefined" == typeof document) return "";
                for (var t = document.createElement("div"), e = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], i = 0; i < e.length; ++i) {
                    var n = e[i];
                    if (void 0 !== t.style[n]) return n
                }
            }(),
            F = [],
            R = function() {
                F.forEach(function(t) {
                    t.position(!1)
                }), P()
            };
        ! function() {
            var t = null,
                e = null,
                i = null,
                n = function n() {
                    if (void 0 !== e && e > 16) return e = Math.min(e - 16, 250), void(i = setTimeout(n, 250));
                    void 0 !== t && b() - t < 10 || (null != i && (clearTimeout(i), i = null), t = b(), R(), e = b() - t)
                };
            "undefined" != typeof window && void 0 !== window.addEventListener && ["resize", "scroll", "touchmove"].forEach(function(t) {
                window.addEventListener(t, n)
            })
        }();
        var j = {
                center: "center",
                left: "right",
                right: "left"
            },
            z = {
                middle: "middle",
                top: "bottom",
                bottom: "top"
            },
            B = {
                top: 0,
                left: 0,
                middle: "50%",
                center: "50%",
                bottom: "100%",
                right: "100%"
            },
            q = function(t, e) {
                var i = t.left,
                    n = t.top;
                return "auto" === i && (i = j[e.left]), "auto" === n && (n = z[e.top]), {
                    left: i,
                    top: n
                }
            },
            U = function(t) {
                var e = t.left,
                    i = t.top;
                return void 0 !== B[t.left] && (e = B[t.left]), void 0 !== B[t.top] && (i = B[t.top]), {
                    left: e,
                    top: i
                }
            },
            $ = function(t) {
                var e = t.split(" "),
                    i = M(e, 2);
                return {
                    top: i[0],
                    left: i[1]
                }
            },
            V = $,
            Y = function(t) {
                function e(t) {
                    var i = this;
                    n(this, e), H(Object.getPrototypeOf(e.prototype), "constructor", this).call(this), this.position = this.position.bind(this), F.push(this), this.history = [], this.setOptions(t, !1), T.modules.forEach(function(t) {
                        void 0 !== t.initialize && t.initialize.call(i)
                    }), this.position()
                }
                return v(e, t), C(e, [{
                    key: "getClass",
                    value: function() {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
                            e = this.options.classes;
                        return void 0 !== e && e[t] ? this.options.classes[t] : this.options.classPrefix ? this.options.classPrefix + "-" + t : t
                    }
                }, {
                    key: "setOptions",
                    value: function(t) {
                        var e = this,
                            i = arguments.length <= 1 || void 0 === arguments[1] || arguments[1],
                            n = {
                                offset: "0 0",
                                targetOffset: "0 0",
                                targetAttachment: "auto auto",
                                classPrefix: "tether"
                            };
                        this.options = u(n, t);
                        var s = this.options,
                            r = s.element,
                            a = s.target,
                            l = s.targetModifier;
                        if (this.element = r, this.target = a, this.targetModifier = l, "viewport" === this.target ? (this.target = document.body, this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body, this.targetModifier = "scroll-handle"), ["element", "target"].forEach(function(t) {
                                if (void 0 === e[t]) throw new Error("Tether Error: Both element and target must be defined");
                                void 0 !== e[t].jquery ? e[t] = e[t][0] : "string" == typeof e[t] && (e[t] = document.querySelector(e[t]))
                            }), d(this.element, this.getClass("element")), !1 !== this.options.addTargetClasses && d(this.target, this.getClass("target")), !this.options.attachment) throw new Error("Tether Error: You must provide an attachment");
                        this.targetAttachment = V(this.options.targetAttachment), this.attachment = V(this.options.attachment), this.offset = $(this.options.offset), this.targetOffset = $(this.options.targetOffset), void 0 !== this.scrollParents && this.disable(), "scroll-handle" === this.targetModifier ? this.scrollParents = [this.target] : this.scrollParents = o(this.target), !1 !== this.options.enabled && this.enable(i)
                    }
                }, {
                    key: "getTargetBounds",
                    value: function() {
                        if (void 0 === this.targetModifier) return a(this.target);
                        if ("visible" === this.targetModifier) {
                            if (this.target === document.body) return {
                                top: pageYOffset,
                                left: pageXOffset,
                                height: innerHeight,
                                width: innerWidth
                            };
                            var t = a(this.target),
                                e = {
                                    height: t.height,
                                    width: t.width,
                                    top: t.top,
                                    left: t.left
                                };
                            return e.height = Math.min(e.height, t.height - (pageYOffset - t.top)), e.height = Math.min(e.height, t.height - (t.top + t.height - (pageYOffset + innerHeight))), e.height = Math.min(innerHeight, e.height), e.height -= 2, e.width = Math.min(e.width, t.width - (pageXOffset - t.left)), e.width = Math.min(e.width, t.width - (t.left + t.width - (pageXOffset + innerWidth))), e.width = Math.min(innerWidth, e.width), e.width -= 2, e.top < pageYOffset && (e.top = pageYOffset), e.left < pageXOffset && (e.left = pageXOffset), e
                        }
                        if ("scroll-handle" === this.targetModifier) {
                            var t = void 0,
                                i = this.target;
                            i === document.body ? (i = document.documentElement, t = {
                                left: pageXOffset,
                                top: pageYOffset,
                                height: innerHeight,
                                width: innerWidth
                            }) : t = a(i);
                            var n = getComputedStyle(i),
                                s = i.scrollWidth > i.clientWidth || [n.overflow, n.overflowX].indexOf("scroll") >= 0 || this.target !== document.body,
                                o = 0;
                            s && (o = 15);
                            var r = t.height - parseFloat(n.borderTopWidth) - parseFloat(n.borderBottomWidth) - o,
                                e = {
                                    width: 15,
                                    height: .975 * r * (r / i.scrollHeight),
                                    left: t.left + t.width - parseFloat(n.borderLeftWidth) - 15
                                },
                                l = 0;
                            r < 408 && this.target === document.body && (l = -11e-5 * Math.pow(r, 2) - .00727 * r + 22.58), this.target !== document.body && (e.height = Math.max(e.height, 24));
                            var h = this.target.scrollTop / (i.scrollHeight - r);
                            return e.top = h * (r - e.height - l) + t.top + parseFloat(n.borderTopWidth), this.target === document.body && (e.height = Math.max(e.height, 24)), e
                        }
                    }
                }, {
                    key: "clearCache",
                    value: function() {
                        this._cache = {}
                    }
                }, {
                    key: "cache",
                    value: function(t, e) {
                        return void 0 === this._cache && (this._cache = {}), void 0 === this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t]
                    }
                }, {
                    key: "enable",
                    value: function() {
                        var t = this,
                            e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        !1 !== this.options.addTargetClasses && d(this.target, this.getClass("enabled")), d(this.element, this.getClass("enabled")), this.enabled = !0, this.scrollParents.forEach(function(e) {
                            e !== t.target.ownerDocument && e.addEventListener("scroll", t.position)
                        }), e && this.position()
                    }
                }, {
                    key: "disable",
                    value: function() {
                        var t = this;
                        c(this.target, this.getClass("enabled")), c(this.element, this.getClass("enabled")), this.enabled = !1, void 0 !== this.scrollParents && this.scrollParents.forEach(function(e) {
                            e.removeEventListener("scroll", t.position)
                        })
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        var t = this;
                        this.disable(), F.forEach(function(e, i) {
                            e === t && F.splice(i, 1)
                        }), 0 === F.length && r()
                    }
                }, {
                    key: "updateAttachClasses",
                    value: function(t, e) {
                        var i = this;
                        t = t || this.attachment, e = e || this.targetAttachment;
                        var n = ["left", "top", "bottom", "right", "middle", "center"];
                        void 0 !== this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length), void 0 === this._addAttachClasses && (this._addAttachClasses = []);
                        var s = this._addAttachClasses;
                        t.top && s.push(this.getClass("element-attached") + "-" + t.top), t.left && s.push(this.getClass("element-attached") + "-" + t.left), e.top && s.push(this.getClass("target-attached") + "-" + e.top), e.left && s.push(this.getClass("target-attached") + "-" + e.left);
                        var o = [];
                        n.forEach(function(t) {
                            o.push(i.getClass("element-attached") + "-" + t), o.push(i.getClass("target-attached") + "-" + t)
                        }), O(function() {
                            void 0 !== i._addAttachClasses && (m(i.element, i._addAttachClasses, o), !1 !== i.options.addTargetClasses && m(i.target, i._addAttachClasses, o), delete i._addAttachClasses)
                        })
                    }
                }, {
                    key: "position",
                    value: function() {
                        var t = this,
                            e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        if (this.enabled) {
                            this.clearCache();
                            var i = q(this.targetAttachment, this.attachment);
                            this.updateAttachClasses(this.attachment, i);
                            var n = this.cache("element-bounds", function() {
                                    return a(t.element)
                                }),
                                s = n.width,
                                o = n.height;
                            if (0 === s && 0 === o && void 0 !== this.lastSize) {
                                var r = this.lastSize;
                                s = r.width, o = r.height
                            } else this.lastSize = {
                                width: s,
                                height: o
                            };
                            var u = this.cache("target-bounds", function() {
                                    return t.getTargetBounds()
                                }),
                                c = u,
                                d = w(U(this.attachment), {
                                    width: s,
                                    height: o
                                }),
                                p = w(U(i), c),
                                f = w(this.offset, {
                                    width: s,
                                    height: o
                                }),
                                g = w(this.targetOffset, c);
                            d = y(d, f), p = y(p, g);
                            for (var m = u.left + p.left - d.left, v = u.top + p.top - d.top, _ = 0; _ < T.modules.length; ++_) {
                                var b = T.modules[_],
                                    x = b.position.call(this, {
                                        left: m,
                                        top: v,
                                        targetAttachment: i,
                                        targetPos: u,
                                        elementPos: n,
                                        offset: d,
                                        targetOffset: p,
                                        manualOffset: f,
                                        manualTargetOffset: g,
                                        scrollbarSize: E,
                                        attachment: this.attachment
                                    });
                                if (!1 === x) return !1;
                                void 0 !== x && "object" == typeof x && (v = x.top, m = x.left)
                            }
                            var C = {
                                    page: {
                                        top: v,
                                        left: m
                                    },
                                    viewport: {
                                        top: v - pageYOffset,
                                        bottom: pageYOffset - v - o + innerHeight,
                                        left: m - pageXOffset,
                                        right: pageXOffset - m - s + innerWidth
                                    }
                                },
                                D = this.target.ownerDocument,
                                k = D.defaultView,
                                E = void 0;
                            return k.innerHeight > D.documentElement.clientHeight && (E = this.cache("scrollbar-size", h), C.viewport.bottom -= E.height), k.innerWidth > D.documentElement.clientWidth && (E = this.cache("scrollbar-size", h), C.viewport.right -= E.width), -1 !== ["", "static"].indexOf(D.body.style.position) && -1 !== ["", "static"].indexOf(D.body.parentElement.style.position) || (C.page.bottom = D.body.scrollHeight - v - o, C.page.right = D.body.scrollWidth - m - s), void 0 !== this.options.optimizations && !1 !== this.options.optimizations.moveElement && void 0 === this.targetModifier && function() {
                                var e = t.cache("target-offsetparent", function() {
                                        return l(t.target)
                                    }),
                                    i = t.cache("target-offsetparent-bounds", function() {
                                        return a(e)
                                    }),
                                    n = getComputedStyle(e),
                                    s = i,
                                    o = {};
                                if (["Top", "Left", "Bottom", "Right"].forEach(function(t) {
                                        o[t.toLowerCase()] = parseFloat(n["border" + t + "Width"])
                                    }), i.right = D.body.scrollWidth - i.left - s.width + o.right, i.bottom = D.body.scrollHeight - i.top - s.height + o.bottom, C.page.top >= i.top + o.top && C.page.bottom >= i.bottom && C.page.left >= i.left + o.left && C.page.right >= i.right) {
                                    var r = e.scrollTop,
                                        h = e.scrollLeft;
                                    C.offset = {
                                        top: C.page.top - i.top + r - o.top,
                                        left: C.page.left - i.left + h - o.left
                                    }
                                }
                            }(), this.move(C), this.history.unshift(C), this.history.length > 3 && this.history.pop(), e && P(), !0
                        }
                    }
                }, {
                    key: "move",
                    value: function(t) {
                        var e = this;
                        if (void 0 !== this.element.parentNode) {
                            var i = {};
                            for (var n in t) {
                                i[n] = {};
                                for (var s in t[n]) {
                                    for (var o = !1, r = 0; r < this.history.length; ++r) {
                                        var a = this.history[r];
                                        if (void 0 !== a[n] && !_(a[n][s], t[n][s])) {
                                            o = !0;
                                            break
                                        }
                                    }
                                    o || (i[n][s] = !0)
                                }
                            }
                            var h = {
                                    top: "",
                                    left: "",
                                    right: "",
                                    bottom: ""
                                },
                                c = function(t, i) {
                                    if (!1 !== (void 0 !== e.options.optimizations ? e.options.optimizations.gpu : null)) {
                                        var n = void 0,
                                            s = void 0;
                                        t.top ? (h.top = 0, n = i.top) : (h.bottom = 0, n = -i.bottom), t.left ? (h.left = 0, s = i.left) : (h.right = 0, s = -i.right), window.matchMedia && (window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches || (s = Math.round(s), n = Math.round(n))), h[W] = "translateX(" + s + "px) translateY(" + n + "px)", "msTransform" !== W && (h[W] += " translateZ(0)")
                                    } else t.top ? h.top = i.top + "px" : h.bottom = i.bottom + "px", t.left ? h.left = i.left + "px" : h.right = i.right + "px"
                                },
                                d = !1;
                            if ((i.page.top || i.page.bottom) && (i.page.left || i.page.right) ? (h.position = "absolute", c(i.page, t.page)) : (i.viewport.top || i.viewport.bottom) && (i.viewport.left || i.viewport.right) ? (h.position = "fixed", c(i.viewport, t.viewport)) : void 0 !== i.offset && i.offset.top && i.offset.left ? function() {
                                    h.position = "absolute";
                                    var n = e.cache("target-offsetparent", function() {
                                        return l(e.target)
                                    });
                                    l(e.element) !== n && O(function() {
                                        e.element.parentNode.removeChild(e.element), n.appendChild(e.element)
                                    }), c(i.offset, t.offset), d = !0
                                }() : (h.position = "absolute", c({
                                    top: !0,
                                    left: !0
                                }, t.page)), !d)
                                if (this.options.bodyElement) this.options.bodyElement.appendChild(this.element);
                                else {
                                    for (var p = !0, f = this.element.parentNode; f && 1 === f.nodeType && "BODY" !== f.tagName;) {
                                        if ("static" !== getComputedStyle(f).position) {
                                            p = !1;
                                            break
                                        }
                                        f = f.parentNode
                                    }
                                    p || (this.element.parentNode.removeChild(this.element), this.element.ownerDocument.body.appendChild(this.element))
                                }
                            var g = {},
                                m = !1;
                            for (var s in h) {
                                var v = h[s];
                                this.element.style[s] !== v && (m = !0, g[s] = v)
                            }
                            m && O(function() {
                                u(e.element.style, g), e.trigger("repositioned")
                            })
                        }
                    }
                }]), e
            }(N);
        Y.modules = [], T.position = R;
        var K = u(Y, T),
            M = function() {
                function t(t, e) {
                    var i = [],
                        n = !0,
                        s = !1,
                        o = void 0;
                    try {
                        for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0);
                    } catch (t) {
                        s = !0, o = t
                    } finally {
                        try {
                            !n && a.return && a.return()
                        } finally {
                            if (s) throw o
                        }
                    }
                    return i
                }
                return function(e, i) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            L = T.Utils,
            a = L.getBounds,
            u = L.extend,
            m = L.updateClasses,
            O = L.defer,
            G = ["left", "top", "right", "bottom"];
        T.modules.push({
            position: function(t) {
                var e = this,
                    i = t.top,
                    n = t.left,
                    s = t.targetAttachment;
                if (!this.options.constraints) return !0;
                var o = this.cache("element-bounds", function() {
                        return a(e.element)
                    }),
                    r = o.height,
                    l = o.width;
                if (0 === l && 0 === r && void 0 !== this.lastSize) {
                    var h = this.lastSize;
                    l = h.width, r = h.height
                }
                var c = this.cache("target-bounds", function() {
                        return e.getTargetBounds()
                    }),
                    d = c.height,
                    p = c.width,
                    f = [this.getClass("pinned"), this.getClass("out-of-bounds")];
                this.options.constraints.forEach(function(t) {
                    var e = t.outOfBoundsClass,
                        i = t.pinnedClass;
                    e && f.push(e), i && f.push(i)
                }), f.forEach(function(t) {
                    ["left", "top", "right", "bottom"].forEach(function(e) {
                        f.push(t + "-" + e)
                    })
                });
                var g = [],
                    v = u({}, s),
                    _ = u({}, this.attachment);
                return this.options.constraints.forEach(function(t) {
                    var o = t.to,
                        a = t.attachment,
                        h = t.pin;
                    void 0 === a && (a = "");
                    var u = void 0,
                        c = void 0;
                    if (a.indexOf(" ") >= 0) {
                        var f = a.split(" "),
                            m = M(f, 2);
                        c = m[0], u = m[1]
                    } else u = c = a;
                    var b = x(e, o);
                    "target" !== c && "both" !== c || (i < b[1] && "top" === v.top && (i += d, v.top = "bottom"), i + r > b[3] && "bottom" === v.top && (i -= d, v.top = "top")), "together" === c && ("top" === v.top && ("bottom" === _.top && i < b[1] ? (i += d, v.top = "bottom", i += r, _.top = "top") : "top" === _.top && i + r > b[3] && i - (r - d) >= b[1] && (i -= r - d, v.top = "bottom", _.top = "bottom")), "bottom" === v.top && ("top" === _.top && i + r > b[3] ? (i -= d, v.top = "top", i -= r, _.top = "bottom") : "bottom" === _.top && i < b[1] && i + (2 * r - d) <= b[3] && (i += r - d, v.top = "top", _.top = "top")), "middle" === v.top && (i + r > b[3] && "top" === _.top ? (i -= r, _.top = "bottom") : i < b[1] && "bottom" === _.top && (i += r, _.top = "top"))), "target" !== u && "both" !== u || (n < b[0] && "left" === v.left && (n += p, v.left = "right"), n + l > b[2] && "right" === v.left && (n -= p, v.left = "left")), "together" === u && (n < b[0] && "left" === v.left ? "right" === _.left ? (n += p, v.left = "right", n += l, _.left = "left") : "left" === _.left && (n += p, v.left = "right", n -= l, _.left = "right") : n + l > b[2] && "right" === v.left ? "left" === _.left ? (n -= p, v.left = "left", n -= l, _.left = "right") : "right" === _.left && (n -= p, v.left = "left", n += l, _.left = "left") : "center" === v.left && (n + l > b[2] && "left" === _.left ? (n -= l, _.left = "right") : n < b[0] && "right" === _.left && (n += l, _.left = "left"))), "element" !== c && "both" !== c || (i < b[1] && "bottom" === _.top && (i += r, _.top = "top"), i + r > b[3] && "top" === _.top && (i -= r, _.top = "bottom")), "element" !== u && "both" !== u || (n < b[0] && ("right" === _.left ? (n += l, _.left = "left") : "center" === _.left && (n += l / 2, _.left = "left")), n + l > b[2] && ("left" === _.left ? (n -= l, _.left = "right") : "center" === _.left && (n -= l / 2, _.left = "right"))), "string" == typeof h ? h = h.split(",").map(function(t) {
                        return t.trim()
                    }) : !0 === h && (h = ["top", "left", "right", "bottom"]), h = h || [];
                    var y = [],
                        w = [];
                    i < b[1] && (h.indexOf("top") >= 0 ? (i = b[1], y.push("top")) : w.push("top")), i + r > b[3] && (h.indexOf("bottom") >= 0 ? (i = b[3] - r, y.push("bottom")) : w.push("bottom")), n < b[0] && (h.indexOf("left") >= 0 ? (n = b[0], y.push("left")) : w.push("left")), n + l > b[2] && (h.indexOf("right") >= 0 ? (n = b[2] - l, y.push("right")) : w.push("right")), y.length && function() {
                        var t = void 0;
                        t = void 0 !== e.options.pinnedClass ? e.options.pinnedClass : e.getClass("pinned"), g.push(t), y.forEach(function(e) {
                            g.push(t + "-" + e)
                        })
                    }(), w.length && function() {
                        var t = void 0;
                        t = void 0 !== e.options.outOfBoundsClass ? e.options.outOfBoundsClass : e.getClass("out-of-bounds"), g.push(t), w.forEach(function(e) {
                            g.push(t + "-" + e)
                        })
                    }(), (y.indexOf("left") >= 0 || y.indexOf("right") >= 0) && (_.left = v.left = !1), (y.indexOf("top") >= 0 || y.indexOf("bottom") >= 0) && (_.top = v.top = !1), v.top === s.top && v.left === s.left && _.top === e.attachment.top && _.left === e.attachment.left || (e.updateAttachClasses(_, v), e.trigger("update", {
                        attachment: _,
                        targetAttachment: v
                    }))
                }), O(function() {
                    !1 !== e.options.addTargetClasses && m(e.target, g, f), m(e.element, g, f)
                }), {
                    top: i,
                    left: n
                }
            }
        });
        var L = T.Utils,
            a = L.getBounds,
            m = L.updateClasses,
            O = L.defer;
        T.modules.push({
            position: function(t) {
                var e = this,
                    i = t.top,
                    n = t.left,
                    s = this.cache("element-bounds", function() {
                        return a(e.element)
                    }),
                    o = s.height,
                    r = s.width,
                    l = this.getTargetBounds(),
                    h = i + o,
                    u = n + r,
                    c = [];
                i <= l.bottom && h >= l.top && ["left", "right"].forEach(function(t) {
                    var e = l[t];
                    e !== n && e !== u || c.push(t)
                }), n <= l.right && u >= l.left && ["top", "bottom"].forEach(function(t) {
                    var e = l[t];
                    e !== i && e !== h || c.push(t)
                });
                var d = [],
                    p = [],
                    f = ["left", "top", "right", "bottom"];
                return d.push(this.getClass("abutted")), f.forEach(function(t) {
                    d.push(e.getClass("abutted") + "-" + t)
                }), c.length && p.push(this.getClass("abutted")), c.forEach(function(t) {
                    p.push(e.getClass("abutted") + "-" + t)
                }), O(function() {
                    !1 !== e.options.addTargetClasses && m(e.target, p, d), m(e.element, p, d)
                }), !0
            }
        });
        var M = function() {
            function t(t, e) {
                var i = [],
                    n = !0,
                    s = !1,
                    o = void 0;
                try {
                    for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0);
                } catch (t) {
                    s = !0, o = t
                } finally {
                    try {
                        !n && a.return && a.return()
                    } finally {
                        if (s) throw o
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        return T.modules.push({
            position: function(t) {
                var e = t.top,
                    i = t.left;
                if (this.options.shift) {
                    var n = this.options.shift;
                    "function" == typeof this.options.shift && (n = this.options.shift.call(this, {
                        top: e,
                        left: i
                    }));
                    var s = void 0,
                        o = void 0;
                    if ("string" == typeof n) {
                        n = n.split(" "), n[1] = n[1] || n[0];
                        var r = n,
                            a = M(r, 2);
                        s = a[0], o = a[1], s = parseFloat(s, 10), o = parseFloat(o, 10)
                    } else s = n.top, o = n.left;
                    return e += s, i += o, {
                        top: e,
                        left: i
                    }
                }
            }
        }), K
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."); + function(t) {
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(jQuery),
function() {
    function t(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function e(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        s = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        o = function(t) {
            function e(t) {
                return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }

            function i(t) {
                return (t[0] || t).nodeType
            }

            function n() {
                return {
                    bindType: r.end,
                    delegateType: r.end,
                    handle: function(e) {
                        if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                    }
                }
            }

            function s() {
                if (window.QUnit) return !1;
                var t = document.createElement("bootstrap");
                for (var e in a)
                    if (void 0 !== t.style[e]) return {
                        end: a[e]
                    };
                return !1
            }

            function o(e) {
                var i = this,
                    n = !1;
                return t(this).one(l.TRANSITION_END, function() {
                    n = !0
                }), setTimeout(function() {
                    n || l.triggerTransitionEnd(i)
                }, e), this
            }
            var r = !1,
                a = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                },
                l = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(t) {
                        do {
                            t += ~~(1e6 * Math.random())
                        } while (document.getElementById(t));
                        return t
                    },
                    getSelectorFromElement: function(t) {
                        var e = t.getAttribute("data-target");
                        return e || (e = t.getAttribute("href") || "", e = /^#[a-z]/i.test(e) ? e : null), e
                    },
                    reflow: function(t) {
                        return t.offsetHeight
                    },
                    triggerTransitionEnd: function(e) {
                        t(e).trigger(r.end)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(r)
                    },
                    typeCheckConfig: function(t, n, s) {
                        for (var o in s)
                            if (s.hasOwnProperty(o)) {
                                var r = s[o],
                                    a = n[o],
                                    l = a && i(a) ? "element" : e(a);
                                if (!new RegExp(r).test(l)) throw new Error(t.toUpperCase() + ': Option "' + o + '" provided type "' + l + '" but expected type "' + r + '".')
                            }
                    }
                };
            return function() {
                r = s(), t.fn.emulateTransitionEnd = o, l.supportsTransitionEnd() && (t.event.special[l.TRANSITION_END] = n())
            }(), l
        }(jQuery),
        r = (function(t) {
            var e = "alert",
                n = t.fn[e],
                r = {
                    DISMISS: '[data-dismiss="alert"]'
                },
                a = {
                    CLOSE: "close.bs.alert",
                    CLOSED: "closed.bs.alert",
                    CLICK_DATA_API: "click.bs.alert.data-api"
                },
                l = {
                    ALERT: "alert",
                    FADE: "fade",
                    SHOW: "show"
                },
                h = function() {
                    function e(t) {
                        i(this, e), this._element = t
                    }
                    return e.prototype.close = function(t) {
                        t = t || this._element;
                        var e = this._getRootElement(t);
                        this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                    }, e.prototype.dispose = function() {
                        t.removeData(this._element, "bs.alert"), this._element = null
                    }, e.prototype._getRootElement = function(e) {
                        var i = o.getSelectorFromElement(e),
                            n = !1;
                        return i && (n = t(i)[0]), n || (n = t(e).closest("." + l.ALERT)[0]), n
                    }, e.prototype._triggerCloseEvent = function(e) {
                        var i = t.Event(a.CLOSE);
                        return t(e).trigger(i), i
                    }, e.prototype._removeElement = function(e) {
                        var i = this;
                        if (t(e).removeClass(l.SHOW), !o.supportsTransitionEnd() || !t(e).hasClass(l.FADE)) return void this._destroyElement(e);
                        t(e).one(o.TRANSITION_END, function(t) {
                            return i._destroyElement(e, t)
                        }).emulateTransitionEnd(150)
                    }, e.prototype._destroyElement = function(e) {
                        t(e).detach().trigger(a.CLOSED).remove()
                    }, e._jQueryInterface = function(i) {
                        return this.each(function() {
                            var n = t(this),
                                s = n.data("bs.alert");
                            s || (s = new e(this), n.data("bs.alert", s)), "close" === i && s[i](this)
                        })
                    }, e._handleDismiss = function(t) {
                        return function(e) {
                            e && e.preventDefault(), t.close(this)
                        }
                    }, s(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }]), e
                }();
            t(document).on(a.CLICK_DATA_API, r.DISMISS, h._handleDismiss(new h)), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function() {
                return t.fn[e] = n, h._jQueryInterface
            }
        }(jQuery), function(t) {
            var e = "button",
                n = t.fn[e],
                o = {
                    ACTIVE: "active",
                    BUTTON: "btn",
                    FOCUS: "focus"
                },
                r = {
                    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
                    DATA_TOGGLE: '[data-toggle="buttons"]',
                    INPUT: "input",
                    ACTIVE: ".active",
                    BUTTON: ".btn"
                },
                a = {
                    CLICK_DATA_API: "click.bs.button.data-api",
                    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
                },
                l = function() {
                    function e(t) {
                        i(this, e), this._element = t
                    }
                    return e.prototype.toggle = function() {
                        var e = !0,
                            i = t(this._element).closest(r.DATA_TOGGLE)[0];
                        if (i) {
                            var n = t(this._element).find(r.INPUT)[0];
                            if (n) {
                                if ("radio" === n.type)
                                    if (n.checked && t(this._element).hasClass(o.ACTIVE)) e = !1;
                                    else {
                                        var s = t(i).find(r.ACTIVE)[0];
                                        s && t(s).removeClass(o.ACTIVE)
                                    }
                                e && (n.checked = !t(this._element).hasClass(o.ACTIVE), t(n).trigger("change")), n.focus()
                            }
                        }
                        this._element.setAttribute("aria-pressed", !t(this._element).hasClass(o.ACTIVE)), e && t(this._element).toggleClass(o.ACTIVE)
                    }, e.prototype.dispose = function() {
                        t.removeData(this._element, "bs.button"), this._element = null
                    }, e._jQueryInterface = function(i) {
                        return this.each(function() {
                            var n = t(this).data("bs.button");
                            n || (n = new e(this), t(this).data("bs.button", n)), "toggle" === i && n[i]()
                        })
                    }, s(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }]), e
                }();
            t(document).on(a.CLICK_DATA_API, r.DATA_TOGGLE_CARROT, function(e) {
                e.preventDefault();
                var i = e.target;
                t(i).hasClass(o.BUTTON) || (i = t(i).closest(r.BUTTON)), l._jQueryInterface.call(t(i), "toggle")
            }).on(a.FOCUS_BLUR_DATA_API, r.DATA_TOGGLE_CARROT, function(e) {
                var i = t(e.target).closest(r.BUTTON)[0];
                t(i).toggleClass(o.FOCUS, /^focus(in)?$/.test(e.type))
            }), t.fn[e] = l._jQueryInterface, t.fn[e].Constructor = l, t.fn[e].noConflict = function() {
                return t.fn[e] = n, l._jQueryInterface
            }
        }(jQuery), function(t) {
            var e = "carousel",
                r = "bs.carousel",
                a = "." + r,
                l = t.fn[e],
                h = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                u = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                c = {
                    NEXT: "next",
                    PREV: "prev",
                    LEFT: "left",
                    RIGHT: "right"
                },
                d = {
                    SLIDE: "slide" + a,
                    SLID: "slid" + a,
                    KEYDOWN: "keydown" + a,
                    MOUSEENTER: "mouseenter" + a,
                    MOUSELEAVE: "mouseleave" + a,
                    LOAD_DATA_API: "load.bs.carousel.data-api",
                    CLICK_DATA_API: "click.bs.carousel.data-api"
                },
                p = {
                    CAROUSEL: "carousel",
                    ACTIVE: "active",
                    SLIDE: "slide",
                    RIGHT: "carousel-item-right",
                    LEFT: "carousel-item-left",
                    NEXT: "carousel-item-next",
                    PREV: "carousel-item-prev",
                    ITEM: "carousel-item"
                },
                f = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                g = function() {
                    function l(e, n) {
                        i(this, l), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(f.INDICATORS)[0], this._addEventListeners()
                    }
                    return l.prototype.next = function() {
                        if (this._isSliding) throw new Error("Carousel is sliding");
                        this._slide(c.NEXT)
                    }, l.prototype.nextWhenVisible = function() {
                        document.hidden || this.next()
                    }, l.prototype.prev = function() {
                        if (this._isSliding) throw new Error("Carousel is sliding");
                        this._slide(c.PREVIOUS)
                    }, l.prototype.pause = function(e) {
                        e || (this._isPaused = !0), t(this._element).find(f.NEXT_PREV)[0] && o.supportsTransitionEnd() && (o.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, l.prototype.cycle = function(t) {
                        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, l.prototype.to = function(e) {
                        var i = this;
                        this._activeElement = t(this._element).find(f.ACTIVE_ITEM)[0];
                        var n = this._getItemIndex(this._activeElement);
                        if (!(e > this._items.length - 1 || e < 0)) {
                            if (this._isSliding) return void t(this._element).one(d.SLID, function() {
                                return i.to(e)
                            });
                            if (n === e) return this.pause(), void this.cycle();
                            var s = e > n ? c.NEXT : c.PREVIOUS;
                            this._slide(s, this._items[e])
                        }
                    }, l.prototype.dispose = function() {
                        t(this._element).off(a), t.removeData(this._element, r), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, l.prototype._getConfig = function(i) {
                        return i = t.extend({}, h, i), o.typeCheckConfig(e, i, u), i
                    }, l.prototype._addEventListeners = function() {
                        var e = this;
                        this._config.keyboard && t(this._element).on(d.KEYDOWN, function(t) {
                            return e._keydown(t)
                        }), "hover" !== this._config.pause || "ontouchstart" in document.documentElement || t(this._element).on(d.MOUSEENTER, function(t) {
                            return e.pause(t)
                        }).on(d.MOUSELEAVE, function(t) {
                            return e.cycle(t)
                        })
                    }, l.prototype._keydown = function(t) {
                        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                            case 37:
                                t.preventDefault(), this.prev();
                                break;
                            case 39:
                                t.preventDefault(), this.next();
                                break;
                            default:
                                return
                        }
                    }, l.prototype._getItemIndex = function(e) {
                        return this._items = t.makeArray(t(e).parent().find(f.ITEM)), this._items.indexOf(e)
                    }, l.prototype._getItemByDirection = function(t, e) {
                        var i = t === c.NEXT,
                            n = t === c.PREVIOUS,
                            s = this._getItemIndex(e),
                            o = this._items.length - 1;
                        if ((n && 0 === s || i && s === o) && !this._config.wrap) return e;
                        var r = t === c.PREVIOUS ? -1 : 1,
                            a = (s + r) % this._items.length;
                        return -1 === a ? this._items[this._items.length - 1] : this._items[a]
                    }, l.prototype._triggerSlideEvent = function(e, i) {
                        var n = t.Event(d.SLIDE, {
                            relatedTarget: e,
                            direction: i
                        });
                        return t(this._element).trigger(n), n
                    }, l.prototype._setActiveIndicatorElement = function(e) {
                        if (this._indicatorsElement) {
                            t(this._indicatorsElement).find(f.ACTIVE).removeClass(p.ACTIVE);
                            var i = this._indicatorsElement.children[this._getItemIndex(e)];
                            i && t(i).addClass(p.ACTIVE)
                        }
                    }, l.prototype._slide = function(e, i) {
                        var n = this,
                            s = t(this._element).find(f.ACTIVE_ITEM)[0],
                            r = i || s && this._getItemByDirection(e, s),
                            a = Boolean(this._interval),
                            l = void 0,
                            h = void 0,
                            u = void 0;
                        if (e === c.NEXT ? (l = p.LEFT, h = p.NEXT, u = c.LEFT) : (l = p.RIGHT, h = p.PREV, u = c.RIGHT), r && t(r).hasClass(p.ACTIVE)) return void(this._isSliding = !1);
                        if (!this._triggerSlideEvent(r, u).isDefaultPrevented() && s && r) {
                            this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(r);
                            var g = t.Event(d.SLID, {
                                relatedTarget: r,
                                direction: u
                            });
                            o.supportsTransitionEnd() && t(this._element).hasClass(p.SLIDE) ? (t(r).addClass(h), o.reflow(r), t(s).addClass(l), t(r).addClass(l), t(s).one(o.TRANSITION_END, function() {
                                t(r).removeClass(l + " " + h).addClass(p.ACTIVE), t(s).removeClass(p.ACTIVE + " " + h + " " + l), n._isSliding = !1, setTimeout(function() {
                                    return t(n._element).trigger(g)
                                }, 0)
                            }).emulateTransitionEnd(600)) : (t(s).removeClass(p.ACTIVE), t(r).addClass(p.ACTIVE), this._isSliding = !1, t(this._element).trigger(g)), a && this.cycle()
                        }
                    }, l._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(r),
                                s = t.extend({}, h, t(this).data());
                            "object" === (void 0 === e ? "undefined" : n(e)) && t.extend(s, e);
                            var o = "string" == typeof e ? e : s.slide;
                            if (i || (i = new l(this, s), t(this).data(r, i)), "number" == typeof e) i.to(e);
                            else if ("string" == typeof o) {
                                if (void 0 === i[o]) throw new Error('No method named "' + o + '"');
                                i[o]()
                            } else s.interval && (i.pause(), i.cycle())
                        })
                    }, l._dataApiClickHandler = function(e) {
                        var i = o.getSelectorFromElement(this);
                        if (i) {
                            var n = t(i)[0];
                            if (n && t(n).hasClass(p.CAROUSEL)) {
                                var s = t.extend({}, t(n).data(), t(this).data()),
                                    a = this.getAttribute("data-slide-to");
                                a && (s.interval = !1), l._jQueryInterface.call(t(n), s), a && t(n).data(r).to(a), e.preventDefault()
                            }
                        }
                    }, s(l, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return h
                        }
                    }]), l
                }();
            t(document).on(d.CLICK_DATA_API, f.DATA_SLIDE, g._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function() {
                t(f.DATA_RIDE).each(function() {
                    var e = t(this);
                    g._jQueryInterface.call(e, e.data())
                })
            }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function() {
                return t.fn[e] = l, g._jQueryInterface
            }
        }(jQuery), function(t) {
            var e = "collapse",
                r = "bs.collapse",
                a = t.fn[e],
                l = {
                    toggle: !0,
                    parent: ""
                },
                h = {
                    toggle: "boolean",
                    parent: "string"
                },
                u = {
                    SHOW: "show." + r,
                    SHOWN: "shown." + r,
                    HIDE: "hide." + r,
                    HIDDEN: "hidden." + r,
                    CLICK_DATA_API: "click.bs.collapse.data-api"
                },
                c = {
                    SHOW: "show",
                    COLLAPSE: "collapse",
                    COLLAPSING: "collapsing",
                    COLLAPSED: "collapsed"
                },
                d = {
                    WIDTH: "width",
                    HEIGHT: "height"
                },
                p = {
                    ACTIVES: ".card > .show, .card > .collapsing",
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                f = function() {
                    function a(e, n) {
                        i(this, a), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]')), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    return a.prototype.toggle = function() {
                        t(this._element).hasClass(c.SHOW) ? this.hide() : this.show()
                    }, a.prototype.show = function() {
                        var e = this;
                        if (this._isTransitioning) throw new Error("Collapse is transitioning");
                        if (!t(this._element).hasClass(c.SHOW)) {
                            var i = void 0,
                                n = void 0;
                            if (this._parent && (i = t.makeArray(t(this._parent).find(p.ACTIVES)), i.length || (i = null)), !(i && (n = t(i).data(r)) && n._isTransitioning)) {
                                var s = t.Event(u.SHOW);
                                if (t(this._element).trigger(s), !s.isDefaultPrevented()) {
                                    i && (a._jQueryInterface.call(t(i), "hide"), n || t(i).data(r, null));
                                    var l = this._getDimension();
                                    t(this._element).removeClass(c.COLLAPSE).addClass(c.COLLAPSING), this._element.style[l] = 0, this._element.setAttribute("aria-expanded", !0), this._triggerArray.length && t(this._triggerArray).removeClass(c.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                    var h = function() {
                                        t(e._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).addClass(c.SHOW), e._element.style[l] = "", e.setTransitioning(!1), t(e._element).trigger(u.SHOWN)
                                    };
                                    if (!o.supportsTransitionEnd()) return void h();
                                    var d = l[0].toUpperCase() + l.slice(1),
                                        f = "scroll" + d;
                                    t(this._element).one(o.TRANSITION_END, h).emulateTransitionEnd(600), this._element.style[l] = this._element[f] + "px"
                                }
                            }
                        }
                    }, a.prototype.hide = function() {
                        var e = this;
                        if (this._isTransitioning) throw new Error("Collapse is transitioning");
                        if (t(this._element).hasClass(c.SHOW)) {
                            var i = t.Event(u.HIDE);
                            if (t(this._element).trigger(i), !i.isDefaultPrevented()) {
                                var n = this._getDimension(),
                                    s = n === d.WIDTH ? "offsetWidth" : "offsetHeight";
                                this._element.style[n] = this._element[s] + "px", o.reflow(this._element), t(this._element).addClass(c.COLLAPSING).removeClass(c.COLLAPSE).removeClass(c.SHOW), this._element.setAttribute("aria-expanded", !1), this._triggerArray.length && t(this._triggerArray).addClass(c.COLLAPSED).attr("aria-expanded", !1), this.setTransitioning(!0);
                                var r = function() {
                                    e.setTransitioning(!1), t(e._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).trigger(u.HIDDEN)
                                };
                                if (this._element.style[n] = "", !o.supportsTransitionEnd()) return void r();
                                t(this._element).one(o.TRANSITION_END, r).emulateTransitionEnd(600)
                            }
                        }
                    }, a.prototype.setTransitioning = function(t) {
                        this._isTransitioning = t
                    }, a.prototype.dispose = function() {
                        t.removeData(this._element, r), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, a.prototype._getConfig = function(i) {
                        return i = t.extend({}, l, i), i.toggle = Boolean(i.toggle), o.typeCheckConfig(e, i, h), i
                    }, a.prototype._getDimension = function() {
                        return t(this._element).hasClass(d.WIDTH) ? d.WIDTH : d.HEIGHT
                    }, a.prototype._getParent = function() {
                        var e = this,
                            i = t(this._config.parent)[0],
                            n = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return t(i).find(n).each(function(t, i) {
                            e._addAriaAndCollapsedClass(a._getTargetFromElement(i), [i])
                        }), i
                    }, a.prototype._addAriaAndCollapsedClass = function(e, i) {
                        if (e) {
                            var n = t(e).hasClass(c.SHOW);
                            e.setAttribute("aria-expanded", n), i.length && t(i).toggleClass(c.COLLAPSED, !n).attr("aria-expanded", n)
                        }
                    }, a._getTargetFromElement = function(e) {
                        var i = o.getSelectorFromElement(e);
                        return i ? t(i)[0] : null
                    }, a._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this),
                                s = i.data(r),
                                o = t.extend({}, l, i.data(), "object" === (void 0 === e ? "undefined" : n(e)) && e);
                            if (!s && o.toggle && /show|hide/.test(e) && (o.toggle = !1), s || (s = new a(this, o), i.data(r, s)), "string" == typeof e) {
                                if (void 0 === s[e]) throw new Error('No method named "' + e + '"');
                                s[e]()
                            }
                        })
                    }, s(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }]), a
                }();
            t(document).on(u.CLICK_DATA_API, p.DATA_TOGGLE, function(e) {
                e.preventDefault();
                var i = f._getTargetFromElement(this),
                    n = t(i).data(r),
                    s = n ? "toggle" : t(this).data();
                f._jQueryInterface.call(t(i), s)
            }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function() {
                return t.fn[e] = a, f._jQueryInterface
            }
        }(jQuery), function(t) {
            var e = "dropdown",
                n = ".bs.dropdown",
                r = t.fn[e],
                a = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    CLICK: "click" + n,
                    CLICK_DATA_API: "click.bs.dropdown.data-api",
                    FOCUSIN_DATA_API: "focusin.bs.dropdown.data-api",
                    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api"
                },
                l = {
                    BACKDROP: "dropdown-backdrop",
                    DISABLED: "disabled",
                    SHOW: "show"
                },
                h = {
                    BACKDROP: ".dropdown-backdrop",
                    DATA_TOGGLE: '[data-toggle="dropdown"]',
                    FORM_CHILD: ".dropdown form",
                    ROLE_MENU: '[role="menu"]',
                    ROLE_LISTBOX: '[role="listbox"]',
                    NAVBAR_NAV: ".navbar-nav",
                    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a'
                },
                u = function() {
                    function e(t) {
                        i(this, e), this._element = t, this._addEventListeners()
                    }
                    return e.prototype.toggle = function() {
                        if (this.disabled || t(this).hasClass(l.DISABLED)) return !1;
                        var i = e._getParentFromElement(this),
                            n = t(i).hasClass(l.SHOW);
                        if (e._clearMenus(), n) return !1;
                        if ("ontouchstart" in document.documentElement && !t(i).closest(h.NAVBAR_NAV).length) {
                            var s = document.createElement("div");
                            s.className = l.BACKDROP, t(s).insertBefore(this), t(s).on("click", e._clearMenus)
                        }
                        var o = {
                                relatedTarget: this
                            },
                            r = t.Event(a.SHOW, o);
                        return t(i).trigger(r), !r.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", !0), t(i).toggleClass(l.SHOW), t(i).trigger(t.Event(a.SHOWN, o)), !1)
                    }, e.prototype.dispose = function() {
                        t.removeData(this._element, "bs.dropdown"), t(this._element).off(n), this._element = null
                    }, e.prototype._addEventListeners = function() {
                        t(this._element).on(a.CLICK, this.toggle)
                    }, e._jQueryInterface = function(i) {
                        return this.each(function() {
                            var n = t(this).data("bs.dropdown");
                            if (n || (n = new e(this), t(this).data("bs.dropdown", n)), "string" == typeof i) {
                                if (void 0 === n[i]) throw new Error('No method named "' + i + '"');
                                n[i].call(this)
                            }
                        })
                    }, e._clearMenus = function(i) {
                        if (!i || 3 !== i.which) {
                            var n = t(h.BACKDROP)[0];
                            n && n.parentNode.removeChild(n);
                            for (var s = t.makeArray(t(h.DATA_TOGGLE)), o = 0; o < s.length; o++) {
                                var r = e._getParentFromElement(s[o]),
                                    u = {
                                        relatedTarget: s[o]
                                    };
                                if (t(r).hasClass(l.SHOW) && !(i && ("click" === i.type && /input|textarea/i.test(i.target.tagName) || "focusin" === i.type) && t.contains(r, i.target))) {
                                    var c = t.Event(a.HIDE, u);
                                    t(r).trigger(c), c.isDefaultPrevented() || (s[o].setAttribute("aria-expanded", "false"), t(r).removeClass(l.SHOW).trigger(t.Event(a.HIDDEN, u)))
                                }
                            }
                        }
                    }, e._getParentFromElement = function(e) {
                        var i = void 0,
                            n = o.getSelectorFromElement(e);
                        return n && (i = t(n)[0]), i || e.parentNode
                    }, e._dataApiKeydownHandler = function(i) {
                        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName) && (i.preventDefault(), i.stopPropagation(), !this.disabled && !t(this).hasClass(l.DISABLED))) {
                            var n = e._getParentFromElement(this),
                                s = t(n).hasClass(l.SHOW);
                            if (!s && 27 !== i.which || s && 27 === i.which) {
                                if (27 === i.which) {
                                    var o = t(n).find(h.DATA_TOGGLE)[0];
                                    t(o).trigger("focus")
                                }
                                return void t(this).trigger("click")
                            }
                            var r = t(n).find(h.VISIBLE_ITEMS).get();
                            if (r.length) {
                                var a = r.indexOf(i.target);
                                38 === i.which && a > 0 && a--, 40 === i.which && a < r.length - 1 && a++, a < 0 && (a = 0),
                                    r[a].focus()
                            }
                        }
                    }, s(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }]), e
                }();
            t(document).on(a.KEYDOWN_DATA_API, h.DATA_TOGGLE, u._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, h.ROLE_MENU, u._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, h.ROLE_LISTBOX, u._dataApiKeydownHandler).on(a.CLICK_DATA_API + " " + a.FOCUSIN_DATA_API, u._clearMenus).on(a.CLICK_DATA_API, h.DATA_TOGGLE, u.prototype.toggle).on(a.CLICK_DATA_API, h.FORM_CHILD, function(t) {
                t.stopPropagation()
            }), t.fn[e] = u._jQueryInterface, t.fn[e].Constructor = u, t.fn[e].noConflict = function() {
                return t.fn[e] = r, u._jQueryInterface
            }
        }(jQuery), function(t) {
            var e = "modal",
                r = ".bs.modal",
                a = t.fn[e],
                l = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                h = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                u = {
                    HIDE: "hide.bs.modal",
                    HIDDEN: "hidden.bs.modal",
                    SHOW: "show.bs.modal",
                    SHOWN: "shown.bs.modal",
                    FOCUSIN: "focusin.bs.modal",
                    RESIZE: "resize.bs.modal",
                    CLICK_DISMISS: "click.dismiss.bs.modal",
                    KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                    MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                    MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                    CLICK_DATA_API: "click.bs.modal.data-api"
                },
                c = {
                    SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                    BACKDROP: "modal-backdrop",
                    OPEN: "modal-open",
                    FADE: "fade",
                    SHOW: "show"
                },
                d = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
                },
                p = function() {
                    function a(e, n) {
                        i(this, a), this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(d.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    return a.prototype.toggle = function(t) {
                        return this._isShown ? this.hide() : this.show(t)
                    }, a.prototype.show = function(e) {
                        var i = this;
                        if (this._isTransitioning) throw new Error("Modal is transitioning");
                        o.supportsTransitionEnd() && t(this._element).hasClass(c.FADE) && (this._isTransitioning = !0);
                        var n = t.Event(u.SHOW, {
                            relatedTarget: e
                        });
                        t(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), t(document.body).addClass(c.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(u.CLICK_DISMISS, d.DATA_DISMISS, function(t) {
                            return i.hide(t)
                        }), t(this._dialog).on(u.MOUSEDOWN_DISMISS, function() {
                            t(i._element).one(u.MOUSEUP_DISMISS, function(e) {
                                t(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
                            })
                        }), this._showBackdrop(function() {
                            return i._showElement(e)
                        }))
                    }, a.prototype.hide = function(e) {
                        var i = this;
                        if (e && e.preventDefault(), this._isTransitioning) throw new Error("Modal is transitioning");
                        var n = o.supportsTransitionEnd() && t(this._element).hasClass(c.FADE);
                        n && (this._isTransitioning = !0);
                        var s = t.Event(u.HIDE);
                        t(this._element).trigger(s), this._isShown && !s.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), t(document).off(u.FOCUSIN), t(this._element).removeClass(c.SHOW), t(this._element).off(u.CLICK_DISMISS), t(this._dialog).off(u.MOUSEDOWN_DISMISS), n ? t(this._element).one(o.TRANSITION_END, function(t) {
                            return i._hideModal(t)
                        }).emulateTransitionEnd(300) : this._hideModal())
                    }, a.prototype.dispose = function() {
                        t.removeData(this._element, "bs.modal"), t(window, document, this._element, this._backdrop).off(r), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null
                    }, a.prototype._getConfig = function(i) {
                        return i = t.extend({}, l, i), o.typeCheckConfig(e, i, h), i
                    }, a.prototype._showElement = function(e) {
                        var i = this,
                            n = o.supportsTransitionEnd() && t(this._element).hasClass(c.FADE);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && o.reflow(this._element), t(this._element).addClass(c.SHOW), this._config.focus && this._enforceFocus();
                        var s = t.Event(u.SHOWN, {
                                relatedTarget: e
                            }),
                            r = function() {
                                i._config.focus && i._element.focus(), i._isTransitioning = !1, t(i._element).trigger(s)
                            };
                        n ? t(this._dialog).one(o.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                    }, a.prototype._enforceFocus = function() {
                        var e = this;
                        t(document).off(u.FOCUSIN).on(u.FOCUSIN, function(i) {
                            document === i.target || e._element === i.target || t(e._element).has(i.target).length || e._element.focus()
                        })
                    }, a.prototype._setEscapeEvent = function() {
                        var e = this;
                        this._isShown && this._config.keyboard ? t(this._element).on(u.KEYDOWN_DISMISS, function(t) {
                            27 === t.which && e.hide()
                        }) : this._isShown || t(this._element).off(u.KEYDOWN_DISMISS)
                    }, a.prototype._setResizeEvent = function() {
                        var e = this;
                        this._isShown ? t(window).on(u.RESIZE, function(t) {
                            return e._handleUpdate(t)
                        }) : t(window).off(u.RESIZE)
                    }, a.prototype._hideModal = function() {
                        var e = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", "true"), this._isTransitioning = !1, this._showBackdrop(function() {
                            t(document.body).removeClass(c.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(u.HIDDEN)
                        })
                    }, a.prototype._removeBackdrop = function() {
                        this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                    }, a.prototype._showBackdrop = function(e) {
                        var i = this,
                            n = t(this._element).hasClass(c.FADE) ? c.FADE : "";
                        if (this._isShown && this._config.backdrop) {
                            var s = o.supportsTransitionEnd() && n;
                            if (this._backdrop = document.createElement("div"), this._backdrop.className = c.BACKDROP, n && t(this._backdrop).addClass(n), t(this._backdrop).appendTo(document.body), t(this._element).on(u.CLICK_DISMISS, function(t) {
                                    if (i._ignoreBackdropClick) return void(i._ignoreBackdropClick = !1);
                                    t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
                                }), s && o.reflow(this._backdrop), t(this._backdrop).addClass(c.SHOW), !e) return;
                            if (!s) return void e();
                            t(this._backdrop).one(o.TRANSITION_END, e).emulateTransitionEnd(150)
                        } else if (!this._isShown && this._backdrop) {
                            t(this._backdrop).removeClass(c.SHOW);
                            var r = function() {
                                i._removeBackdrop(), e && e()
                            };
                            o.supportsTransitionEnd() && t(this._element).hasClass(c.FADE) ? t(this._backdrop).one(o.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                        } else e && e()
                    }, a.prototype._handleUpdate = function() {
                        this._adjustDialog()
                    }, a.prototype._adjustDialog = function() {
                        var t = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, a.prototype._resetAdjustments = function() {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, a.prototype._checkScrollbar = function() {
                        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, a.prototype._setScrollbar = function() {
                        var e = parseInt(t(d.FIXED_CONTENT).css("padding-right") || 0, 10);
                        this._originalBodyPadding = document.body.style.paddingRight || "", this._isBodyOverflowing && (document.body.style.paddingRight = e + this._scrollbarWidth + "px")
                    }, a.prototype._resetScrollbar = function() {
                        document.body.style.paddingRight = this._originalBodyPadding
                    }, a.prototype._getScrollbarWidth = function() {
                        var t = document.createElement("div");
                        t.className = c.SCROLLBAR_MEASURER, document.body.appendChild(t);
                        var e = t.offsetWidth - t.clientWidth;
                        return document.body.removeChild(t), e
                    }, a._jQueryInterface = function(e, i) {
                        return this.each(function() {
                            var s = t(this).data("bs.modal"),
                                o = t.extend({}, a.Default, t(this).data(), "object" === (void 0 === e ? "undefined" : n(e)) && e);
                            if (s || (s = new a(this, o), t(this).data("bs.modal", s)), "string" == typeof e) {
                                if (void 0 === s[e]) throw new Error('No method named "' + e + '"');
                                s[e](i)
                            } else o.show && s.show(i)
                        })
                    }, s(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }]), a
                }();
            t(document).on(u.CLICK_DATA_API, d.DATA_TOGGLE, function(e) {
                var i = this,
                    n = void 0,
                    s = o.getSelectorFromElement(this);
                s && (n = t(s)[0]);
                var r = t(n).data("bs.modal") ? "toggle" : t.extend({}, t(n).data(), t(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
                var a = t(n).one(u.SHOW, function(e) {
                    e.isDefaultPrevented() || a.one(u.HIDDEN, function() {
                        t(i).is(":visible") && i.focus()
                    })
                });
                p._jQueryInterface.call(t(n), r, this)
            }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function() {
                return t.fn[e] = a, p._jQueryInterface
            }
        }(jQuery), function(t) {
            var e = "scrollspy",
                r = t.fn[e],
                a = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                l = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                h = {
                    ACTIVATE: "activate.bs.scrollspy",
                    SCROLL: "scroll.bs.scrollspy",
                    LOAD_DATA_API: "load.bs.scrollspy.data-api"
                },
                u = {
                    DROPDOWN_ITEM: "dropdown-item",
                    DROPDOWN_MENU: "dropdown-menu",
                    NAV_LINK: "nav-link",
                    NAV: "nav",
                    ACTIVE: "active"
                },
                c = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    LIST_ITEM: ".list-item",
                    LI: "li",
                    LI_DROPDOWN: "li.dropdown",
                    NAV_LINKS: ".nav-link",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                d = {
                    OFFSET: "offset",
                    POSITION: "position"
                },
                p = function() {
                    function r(e, n) {
                        var s = this;
                        i(this, r), this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + c.NAV_LINKS + "," + this._config.target + " " + c.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function(t) {
                            return s._process(t)
                        }), this.refresh(), this._process()
                    }
                    return r.prototype.refresh = function() {
                        var e = this,
                            i = this._scrollElement !== this._scrollElement.window ? d.POSITION : d.OFFSET,
                            n = "auto" === this._config.method ? i : this._config.method,
                            s = n === d.POSITION ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function(e) {
                            var i = void 0,
                                r = o.getSelectorFromElement(e);
                            return r && (i = t(r)[0]), i && (i.offsetWidth || i.offsetHeight) ? [t(i)[n]().top + s, r] : null
                        }).filter(function(t) {
                            return t
                        }).sort(function(t, e) {
                            return t[0] - e[0]
                        }).forEach(function(t) {
                            e._offsets.push(t[0]), e._targets.push(t[1])
                        })
                    }, r.prototype.dispose = function() {
                        t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, r.prototype._getConfig = function(i) {
                        if (i = t.extend({}, a, i), "string" != typeof i.target) {
                            var n = t(i.target).attr("id");
                            n || (n = o.getUID(e), t(i.target).attr("id", n)), i.target = "#" + n
                        }
                        return o.typeCheckConfig(e, i, l), i
                    }, r.prototype._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, r.prototype._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, r.prototype._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight
                    }, r.prototype._process = function() {
                        var t = this._getScrollTop() + this._config.offset,
                            e = this._getScrollHeight(),
                            i = this._config.offset + e - this._getOffsetHeight();
                        if (this._scrollHeight !== e && this.refresh(), t >= i) {
                            var n = this._targets[this._targets.length - 1];
                            return void(this._activeTarget !== n && this._activate(n))
                        }
                        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                        for (var s = this._offsets.length; s--;) {
                            this._activeTarget !== this._targets[s] && t >= this._offsets[s] && (void 0 === this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s])
                        }
                    }, r.prototype._activate = function(e) {
                        this._activeTarget = e, this._clear();
                        var i = this._selector.split(",");
                        i = i.map(function(t) {
                            return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                        });
                        var n = t(i.join(","));
                        n.hasClass(u.DROPDOWN_ITEM) ? (n.closest(c.DROPDOWN).find(c.DROPDOWN_TOGGLE).addClass(u.ACTIVE), n.addClass(u.ACTIVE)) : n.parents(c.LI).find("> " + c.NAV_LINKS).addClass(u.ACTIVE), t(this._scrollElement).trigger(h.ACTIVATE, {
                            relatedTarget: e
                        })
                    }, r.prototype._clear = function() {
                        t(this._selector).filter(c.ACTIVE).removeClass(u.ACTIVE)
                    }, r._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data("bs.scrollspy"),
                                s = "object" === (void 0 === e ? "undefined" : n(e)) && e;
                            if (i || (i = new r(this, s), t(this).data("bs.scrollspy", i)), "string" == typeof e) {
                                if (void 0 === i[e]) throw new Error('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s(r, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), r
                }();
            t(window).on(h.LOAD_DATA_API, function() {
                for (var e = t.makeArray(t(c.DATA_SPY)), i = e.length; i--;) {
                    var n = t(e[i]);
                    p._jQueryInterface.call(n, n.data())
                }
            }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function() {
                return t.fn[e] = r, p._jQueryInterface
            }
        }(jQuery), function(t) {
            var e = t.fn.tab,
                n = {
                    HIDE: "hide.bs.tab",
                    HIDDEN: "hidden.bs.tab",
                    SHOW: "show.bs.tab",
                    SHOWN: "shown.bs.tab",
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                r = {
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active",
                    DISABLED: "disabled",
                    FADE: "fade",
                    SHOW: "show"
                },
                a = {
                    A: "a",
                    LI: "li",
                    DROPDOWN: ".dropdown",
                    LIST: "ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)",
                    FADE_CHILD: "> .nav-item .fade, > .fade",
                    ACTIVE: ".active",
                    ACTIVE_CHILD: "> .nav-item > .active, > .active",
                    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
                    DROPDOWN_TOGGLE: ".dropdown-toggle",
                    DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
                },
                l = function() {
                    function e(t) {
                        i(this, e), this._element = t
                    }
                    return e.prototype.show = function() {
                        var e = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(r.ACTIVE) || t(this._element).hasClass(r.DISABLED))) {
                            var i = void 0,
                                s = void 0,
                                l = t(this._element).closest(a.LIST)[0],
                                h = o.getSelectorFromElement(this._element);
                            l && (s = t.makeArray(t(l).find(a.ACTIVE)), s = s[s.length - 1]);
                            var u = t.Event(n.HIDE, {
                                    relatedTarget: this._element
                                }),
                                c = t.Event(n.SHOW, {
                                    relatedTarget: s
                                });
                            if (s && t(s).trigger(u), t(this._element).trigger(c), !c.isDefaultPrevented() && !u.isDefaultPrevented()) {
                                h && (i = t(h)[0]), this._activate(this._element, l);
                                var d = function() {
                                    var i = t.Event(n.HIDDEN, {
                                            relatedTarget: e._element
                                        }),
                                        o = t.Event(n.SHOWN, {
                                            relatedTarget: s
                                        });
                                    t(s).trigger(i), t(e._element).trigger(o)
                                };
                                i ? this._activate(i, i.parentNode, d) : d()
                            }
                        }
                    }, e.prototype.dispose = function() {
                        t.removeClass(this._element, "bs.tab"), this._element = null
                    }, e.prototype._activate = function(e, i, n) {
                        var s = this,
                            l = t(i).find(a.ACTIVE_CHILD)[0],
                            h = n && o.supportsTransitionEnd() && (l && t(l).hasClass(r.FADE) || Boolean(t(i).find(a.FADE_CHILD)[0])),
                            u = function() {
                                return s._transitionComplete(e, l, h, n)
                            };
                        l && h ? t(l).one(o.TRANSITION_END, u).emulateTransitionEnd(150) : u(), l && t(l).removeClass(r.SHOW)
                    }, e.prototype._transitionComplete = function(e, i, n, s) {
                        if (i) {
                            t(i).removeClass(r.ACTIVE);
                            var l = t(i.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];
                            l && t(l).removeClass(r.ACTIVE), i.setAttribute("aria-expanded", !1)
                        }
                        if (t(e).addClass(r.ACTIVE), e.setAttribute("aria-expanded", !0), n ? (o.reflow(e), t(e).addClass(r.SHOW)) : t(e).removeClass(r.FADE), e.parentNode && t(e.parentNode).hasClass(r.DROPDOWN_MENU)) {
                            var h = t(e).closest(a.DROPDOWN)[0];
                            h && t(h).find(a.DROPDOWN_TOGGLE).addClass(r.ACTIVE), e.setAttribute("aria-expanded", !0)
                        }
                        s && s()
                    }, e._jQueryInterface = function(i) {
                        return this.each(function() {
                            var n = t(this),
                                s = n.data("bs.tab");
                            if (s || (s = new e(this), n.data("bs.tab", s)), "string" == typeof i) {
                                if (void 0 === s[i]) throw new Error('No method named "' + i + '"');
                                s[i]()
                            }
                        })
                    }, s(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }]), e
                }();
            t(document).on(n.CLICK_DATA_API, a.DATA_TOGGLE, function(e) {
                e.preventDefault(), l._jQueryInterface.call(t(this), "show")
            }), t.fn.tab = l._jQueryInterface, t.fn.tab.Constructor = l, t.fn.tab.noConflict = function() {
                return t.fn.tab = e, l._jQueryInterface
            }
        }(jQuery), function(t) {
            if ("undefined" == typeof Tether) throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");
            var e = "tooltip",
                r = ".bs.tooltip",
                a = t.fn[e],
                l = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: "0 0",
                    constraints: [],
                    container: !1
                },
                h = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "string",
                    constraints: "array",
                    container: "(string|element|boolean)"
                },
                u = {
                    TOP: "bottom center",
                    RIGHT: "middle left",
                    BOTTOM: "top center",
                    LEFT: "middle right"
                },
                c = {
                    SHOW: "show",
                    OUT: "out"
                },
                d = {
                    HIDE: "hide" + r,
                    HIDDEN: "hidden" + r,
                    SHOW: "show" + r,
                    SHOWN: "shown" + r,
                    INSERTED: "inserted" + r,
                    CLICK: "click" + r,
                    FOCUSIN: "focusin" + r,
                    FOCUSOUT: "focusout" + r,
                    MOUSEENTER: "mouseenter" + r,
                    MOUSELEAVE: "mouseleave" + r
                },
                p = {
                    FADE: "fade",
                    SHOW: "show"
                },
                f = {
                    TOOLTIP: ".tooltip",
                    TOOLTIP_INNER: ".tooltip-inner"
                },
                g = {
                    element: !1,
                    enabled: !1
                },
                m = {
                    HOVER: "hover",
                    FOCUS: "focus",
                    CLICK: "click",
                    MANUAL: "manual"
                },
                v = function() {
                    function a(t, e) {
                        i(this, a), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._isTransitioning = !1, this._tether = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                    }
                    return a.prototype.enable = function() {
                        this._isEnabled = !0
                    }, a.prototype.disable = function() {
                        this._isEnabled = !1
                    }, a.prototype.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, a.prototype.toggle = function(e) {
                        if (e) {
                            var i = this.constructor.DATA_KEY,
                                n = t(e.currentTarget).data(i);
                            n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                        } else {
                            if (t(this.getTipElement()).hasClass(p.SHOW)) return void this._leave(null, this);
                            this._enter(null, this)
                        }
                    }, a.prototype.dispose = function() {
                        clearTimeout(this._timeout), this.cleanupTether(), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null
                    }, a.prototype.show = function() {
                        var e = this;
                        if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                        var i = t.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            if (this._isTransitioning) throw new Error("Tooltip is transitioning");
                            t(this.element).trigger(i);
                            var n = t.contains(this.element.ownerDocument.documentElement, this.element);
                            if (i.isDefaultPrevented() || !n) return;
                            var s = this.getTipElement(),
                                r = o.getUID(this.constructor.NAME);
                            s.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && t(s).addClass(p.FADE);
                            var l = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                                h = this._getAttachment(l),
                                u = !1 === this.config.container ? document.body : t(this.config.container);
                            t(s).data(this.constructor.DATA_KEY, this).appendTo(u), t(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({
                                attachment: h,
                                element: s,
                                target: this.element,
                                classes: g,
                                classPrefix: "bs-tether",
                                offset: this.config.offset,
                                constraints: this.config.constraints,
                                addTargetClasses: !1
                            }), o.reflow(s), this._tether.position(), t(s).addClass(p.SHOW);
                            var d = function() {
                                var i = e._hoverState;
                                e._hoverState = null, e._isTransitioning = !1, t(e.element).trigger(e.constructor.Event.SHOWN), i === c.OUT && e._leave(null, e)
                            };
                            if (o.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE)) return this._isTransitioning = !0, void t(this.tip).one(o.TRANSITION_END, d).emulateTransitionEnd(a._TRANSITION_DURATION);
                            d()
                        }
                    }, a.prototype.hide = function(e) {
                        var i = this,
                            n = this.getTipElement(),
                            s = t.Event(this.constructor.Event.HIDE);
                        if (this._isTransitioning) throw new Error("Tooltip is transitioning");
                        var r = function() {
                            i._hoverState !== c.SHOW && n.parentNode && n.parentNode.removeChild(n), i.element.removeAttribute("aria-describedby"), t(i.element).trigger(i.constructor.Event.HIDDEN), i._isTransitioning = !1, i.cleanupTether(), e && e()
                        };
                        t(this.element).trigger(s), s.isDefaultPrevented() || (t(n).removeClass(p.SHOW), this._activeTrigger[m.CLICK] = !1, this._activeTrigger[m.FOCUS] = !1, this._activeTrigger[m.HOVER] = !1, o.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE) ? (this._isTransitioning = !0, t(n).one(o.TRANSITION_END, r).emulateTransitionEnd(150)) : r(), this._hoverState = "")
                    }, a.prototype.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, a.prototype.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0]
                    }, a.prototype.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(f.TOOLTIP_INNER), this.getTitle()), e.removeClass(p.FADE + " " + p.SHOW), this.cleanupTether()
                    }, a.prototype.setElementContent = function(e, i) {
                        var s = this.config.html;
                        "object" === (void 0 === i ? "undefined" : n(i)) && (i.nodeType || i.jquery) ? s ? t(i).parent().is(e) || e.empty().append(i) : e.text(t(i).text()): e[s ? "html" : "text"](i)
                    }, a.prototype.getTitle = function() {
                        var t = this.element.getAttribute("data-original-title");
                        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                    }, a.prototype.cleanupTether = function() {
                        this._tether && this._tether.destroy()
                    }, a.prototype._getAttachment = function(t) {
                        return u[t.toUpperCase()]
                    }, a.prototype._setListeners = function() {
                        var e = this;
                        this.config.trigger.split(" ").forEach(function(i) {
                            if ("click" === i) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                                return e.toggle(t)
                            });
                            else if (i !== m.MANUAL) {
                                var n = i === m.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                    s = i === m.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                                t(e.element).on(n, e.config.selector, function(t) {
                                    return e._enter(t)
                                }).on(s, e.config.selector, function(t) {
                                    return e._leave(t)
                                })
                            }
                            t(e.element).closest(".modal").on("hide.bs.modal", function() {
                                return e.hide()
                            })
                        }), this.config.selector ? this.config = t.extend({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, a.prototype._fixTitle = function() {
                        var t = n(this.element.getAttribute("data-original-title"));
                        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, a.prototype._enter = function(e, i) {
                        var n = this.constructor.DATA_KEY;
                        return i = i || t(e.currentTarget).data(n), i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusin" === e.type ? m.FOCUS : m.HOVER] = !0), t(i.getTipElement()).hasClass(p.SHOW) || i._hoverState === c.SHOW ? void(i._hoverState = c.SHOW) : (clearTimeout(i._timeout), i._hoverState = c.SHOW, i.config.delay && i.config.delay.show ? void(i._timeout = setTimeout(function() {
                            i._hoverState === c.SHOW && i.show()
                        }, i.config.delay.show)) : void i.show())
                    }, a.prototype._leave = function(e, i) {
                        var n = this.constructor.DATA_KEY;
                        if (i = i || t(e.currentTarget).data(n), i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusout" === e.type ? m.FOCUS : m.HOVER] = !1), !i._isWithActiveTrigger()) {
                            if (clearTimeout(i._timeout), i._hoverState = c.OUT, !i.config.delay || !i.config.delay.hide) return void i.hide();
                            i._timeout = setTimeout(function() {
                                i._hoverState === c.OUT && i.hide()
                            }, i.config.delay.hide)
                        }
                    }, a.prototype._isWithActiveTrigger = function() {
                        for (var t in this._activeTrigger)
                            if (this._activeTrigger[t]) return !0;
                        return !1
                    }, a.prototype._getConfig = function(i) {
                        return i = t.extend({}, this.constructor.Default, t(this.element).data(), i), i.delay && "number" == typeof i.delay && (i.delay = {
                            show: i.delay,
                            hide: i.delay
                        }), o.typeCheckConfig(e, i, this.constructor.DefaultType), i
                    }, a.prototype._getDelegateConfig = function() {
                        var t = {};
                        if (this.config)
                            for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                        return t
                    }, a._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data("bs.tooltip"),
                                s = "object" === (void 0 === e ? "undefined" : n(e)) && e;
                            if ((i || !/dispose|hide/.test(e)) && (i || (i = new a(this, s), t(this).data("bs.tooltip", i)), "string" == typeof e)) {
                                if (void 0 === i[e]) throw new Error('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.tooltip"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return d
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return r
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return h
                        }
                    }]), a
                }();
            return t.fn[e] = v._jQueryInterface, t.fn[e].Constructor = v, t.fn[e].noConflict = function() {
                return t.fn[e] = a, v._jQueryInterface
            }, v
        }(jQuery));
    ! function(o) {
        var a = "popover",
            l = ".bs.popover",
            h = o.fn[a],
            u = o.extend({}, r.Default, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }),
            c = o.extend({}, r.DefaultType, {
                content: "(string|element|function)"
            }),
            d = {
                FADE: "fade",
                SHOW: "show"
            },
            p = {
                TITLE: ".popover-title",
                CONTENT: ".popover-content"
            },
            f = {
                HIDE: "hide" + l,
                HIDDEN: "hidden" + l,
                SHOW: "show" + l,
                SHOWN: "shown" + l,
                INSERTED: "inserted" + l,
                CLICK: "click" + l,
                FOCUSIN: "focusin" + l,
                FOCUSOUT: "focusout" + l,
                MOUSEENTER: "mouseenter" + l,
                MOUSELEAVE: "mouseleave" + l
            },
            g = function(r) {
                function h() {
                    return i(this, h), t(this, r.apply(this, arguments))
                }
                return e(h, r), h.prototype.isWithContent = function() {
                    return this.getTitle() || this._getContent()
                }, h.prototype.getTipElement = function() {
                    return this.tip = this.tip || o(this.config.template)[0]
                }, h.prototype.setContent = function() {
                    var t = o(this.getTipElement());
                    this.setElementContent(t.find(p.TITLE), this.getTitle()), this.setElementContent(t.find(p.CONTENT), this._getContent()), t.removeClass(d.FADE + " " + d.SHOW), this.cleanupTether()
                }, h.prototype._getContent = function() {
                    return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
                }, h._jQueryInterface = function(t) {
                    return this.each(function() {
                        var e = o(this).data("bs.popover"),
                            i = "object" === (void 0 === t ? "undefined" : n(t)) ? t : null;
                        if ((e || !/destroy|hide/.test(t)) && (e || (e = new h(this, i), o(this).data("bs.popover", e)), "string" == typeof t)) {
                            if (void 0 === e[t]) throw new Error('No method named "' + t + '"');
                            e[t]()
                        }
                    })
                }, s(h, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return u
                    }
                }, {
                    key: "NAME",
                    get: function() {
                        return a
                    }
                }, {
                    key: "DATA_KEY",
                    get: function() {
                        return "bs.popover"
                    }
                }, {
                    key: "Event",
                    get: function() {
                        return f
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function() {
                        return l
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return c
                    }
                }]), h
            }(r);
        o.fn[a] = g._jQueryInterface, o.fn[a].Constructor = g, o.fn[a].noConflict = function() {
            return o.fn[a] = h, g._jQueryInterface
        }
    }(jQuery)
}(),
function() {
    function t(t) {
        function e(e, i, n, s, o, r) {
            for (; o >= 0 && o < r; o += t) {
                var a = s ? s[o] : o;
                n = i(n, e[a], a, e)
            }
            return n
        }
        return function(i, n, s, o) {
            n = b(n, o, 4);
            var r = !k(i) && _.keys(i),
                a = (r || i).length,
                l = t > 0 ? 0 : a - 1;
            return arguments.length < 3 && (s = i[r ? r[l] : l], l += t), e(i, n, s, r, l, a)
        }
    }

    function e(t) {
        return function(e, i, n) {
            i = y(i, n);
            for (var s = D(e), o = t > 0 ? 0 : s - 1; o >= 0 && o < s; o += t)
                if (i(e[o], o, e)) return o;
            return -1
        }
    }

    function i(t, e, i) {
        return function(n, s, o) {
            var r = 0,
                a = D(n);
            if ("number" == typeof o) t > 0 ? r = o >= 0 ? o : Math.max(o + a, r) : a = o >= 0 ? Math.min(o + 1, a) : o + a + 1;
            else if (i && o && a) return o = i(n, s), n[o] === s ? o : -1;
            if (s !== s) return o = e(u.call(n, r, a), _.isNaN), o >= 0 ? o + r : -1;
            for (o = t > 0 ? r : a - 1; o >= 0 && o < a; o += t)
                if (n[o] === s) return o;
            return -1
        }
    }

    function n(t, e) {
        var i = O.length,
            n = t.constructor,
            s = _.isFunction(n) && n.prototype || a,
            o = "constructor";
        for (_.has(t, o) && !_.contains(e, o) && e.push(o); i--;)(o = O[i]) in t && t[o] !== s[o] && !_.contains(e, o) && e.push(o)
    }
    var s = this,
        o = s._,
        r = Array.prototype,
        a = Object.prototype,
        l = Function.prototype,
        h = r.push,
        u = r.slice,
        c = a.toString,
        d = a.hasOwnProperty,
        p = Array.isArray,
        f = Object.keys,
        g = l.bind,
        m = Object.create,
        v = function() {},
        _ = function(t) {
            return t instanceof _ ? t : this instanceof _ ? void(this._wrapped = t) : new _(t)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), exports._ = _) : s._ = _, _.VERSION = "1.8.3";
    var b = function(t, e, i) {
            if (void 0 === e) return t;
            switch (null == i ? 3 : i) {
                case 1:
                    return function(i) {
                        return t.call(e, i)
                    };
                case 2:
                    return function(i, n) {
                        return t.call(e, i, n)
                    };
                case 3:
                    return function(i, n, s) {
                        return t.call(e, i, n, s)
                    };
                case 4:
                    return function(i, n, s, o) {
                        return t.call(e, i, n, s, o)
                    }
            }
            return function() {
                return t.apply(e, arguments)
            }
        },
        y = function(t, e, i) {
            return null == t ? _.identity : _.isFunction(t) ? b(t, e, i) : _.isObject(t) ? _.matcher(t) : _.property(t)
        };
    _.iteratee = function(t, e) {
        return y(t, e, 1 / 0)
    };
    var w = function(t, e) {
            return function(i) {
                var n = arguments.length;
                if (n < 2 || null == i) return i;
                for (var s = 1; s < n; s++)
                    for (var o = arguments[s], r = t(o), a = r.length, l = 0; l < a; l++) {
                        var h = r[l];
                        e && void 0 !== i[h] || (i[h] = o[h])
                    }
                return i
            }
        },
        x = function(t) {
            if (!_.isObject(t)) return {};
            if (m) return m(t);
            v.prototype = t;
            var e = new v;
            return v.prototype = null, e
        },
        C = function(t) {
            return function(e) {
                return null == e ? void 0 : e[t]
            }
        },
        T = Math.pow(2, 53) - 1,
        D = C("length"),
        k = function(t) {
            var e = D(t);
            return "number" == typeof e && e >= 0 && e <= T
        };
    _.each = _.forEach = function(t, e, i) {
        e = b(e, i);
        var n, s;
        if (k(t))
            for (n = 0, s = t.length; n < s; n++) e(t[n], n, t);
        else {
            var o = _.keys(t);
            for (n = 0, s = o.length; n < s; n++) e(t[o[n]], o[n], t)
        }
        return t
    }, _.map = _.collect = function(t, e, i) {
        e = y(e, i);
        for (var n = !k(t) && _.keys(t), s = (n || t).length, o = Array(s), r = 0; r < s; r++) {
            var a = n ? n[r] : r;
            o[r] = e(t[a], a, t)
        }
        return o
    }, _.reduce = _.foldl = _.inject = t(1), _.reduceRight = _.foldr = t(-1), _.find = _.detect = function(t, e, i) {
        var n;
        if (void 0 !== (n = k(t) ? _.findIndex(t, e, i) : _.findKey(t, e, i)) && -1 !== n) return t[n]
    }, _.filter = _.select = function(t, e, i) {
        var n = [];
        return e = y(e, i), _.each(t, function(t, i, s) {
            e(t, i, s) && n.push(t)
        }), n
    }, _.reject = function(t, e, i) {
        return _.filter(t, _.negate(y(e)), i)
    }, _.every = _.all = function(t, e, i) {
        e = y(e, i);
        for (var n = !k(t) && _.keys(t), s = (n || t).length, o = 0; o < s; o++) {
            var r = n ? n[o] : o;
            if (!e(t[r], r, t)) return !1
        }
        return !0
    }, _.some = _.any = function(t, e, i) {
        e = y(e, i);
        for (var n = !k(t) && _.keys(t), s = (n || t).length, o = 0; o < s; o++) {
            var r = n ? n[o] : o;
            if (e(t[r], r, t)) return !0
        }
        return !1
    }, _.contains = _.includes = _.include = function(t, e, i, n) {
        return k(t) || (t = _.values(t)), ("number" != typeof i || n) && (i = 0), _.indexOf(t, e, i) >= 0
    }, _.invoke = function(t, e) {
        var i = u.call(arguments, 2),
            n = _.isFunction(e);
        return _.map(t, function(t) {
            var s = n ? e : t[e];
            return null == s ? s : s.apply(t, i)
        })
    }, _.pluck = function(t, e) {
        return _.map(t, _.property(e))
    }, _.where = function(t, e) {
        return _.filter(t, _.matcher(e))
    }, _.findWhere = function(t, e) {
        return _.find(t, _.matcher(e))
    }, _.max = function(t, e, i) {
        var n, s, o = -1 / 0,
            r = -1 / 0;
        if (null == e && null != t) {
            t = k(t) ? t : _.values(t);
            for (var a = 0, l = t.length; a < l; a++)(n = t[a]) > o && (o = n)
        } else e = y(e, i), _.each(t, function(t, i, n) {
            ((s = e(t, i, n)) > r || s === -1 / 0 && o === -1 / 0) && (o = t, r = s)
        });
        return o
    }, _.min = function(t, e, i) {
        var n, s, o = 1 / 0,
            r = 1 / 0;
        if (null == e && null != t) {
            t = k(t) ? t : _.values(t);
            for (var a = 0, l = t.length; a < l; a++)(n = t[a]) < o && (o = n)
        } else e = y(e, i), _.each(t, function(t, i, n) {
            ((s = e(t, i, n)) < r || s === 1 / 0 && o === 1 / 0) && (o = t, r = s)
        });
        return o
    }, _.shuffle = function(t) {
        for (var e, i = k(t) ? t : _.values(t), n = i.length, s = Array(n), o = 0; o < n; o++) e = _.random(0, o), e !== o && (s[o] = s[e]), s[e] = i[o];
        return s
    }, _.sample = function(t, e, i) {
        return null == e || i ? (k(t) || (t = _.values(t)), t[_.random(t.length - 1)]) : _.shuffle(t).slice(0, Math.max(0, e))
    }, _.sortBy = function(t, e, i) {
        return e = y(e, i), _.pluck(_.map(t, function(t, i, n) {
            return {
                value: t,
                index: i,
                criteria: e(t, i, n)
            }
        }).sort(function(t, e) {
            var i = t.criteria,
                n = e.criteria;
            if (i !== n) {
                if (i > n || void 0 === i) return 1;
                if (i < n || void 0 === n) return -1
            }
            return t.index - e.index
        }), "value")
    };
    var E = function(t) {
        return function(e, i, n) {
            var s = {};
            return i = y(i, n), _.each(e, function(n, o) {
                var r = i(n, o, e);
                t(s, n, r)
            }), s
        }
    };
    _.groupBy = E(function(t, e, i) {
        _.has(t, i) ? t[i].push(e) : t[i] = [e]
    }), _.indexBy = E(function(t, e, i) {
        t[i] = e
    }), _.countBy = E(function(t, e, i) {
        _.has(t, i) ? t[i]++ : t[i] = 1
    }), _.toArray = function(t) {
        return t ? _.isArray(t) ? u.call(t) : k(t) ? _.map(t, _.identity) : _.values(t) : []
    }, _.size = function(t) {
        return null == t ? 0 : k(t) ? t.length : _.keys(t).length
    }, _.partition = function(t, e, i) {
        e = y(e, i);
        var n = [],
            s = [];
        return _.each(t, function(t, i, o) {
            (e(t, i, o) ? n : s).push(t)
        }), [n, s]
    }, _.first = _.head = _.take = function(t, e, i) {
        if (null != t) return null == e || i ? t[0] : _.initial(t, t.length - e)
    }, _.initial = function(t, e, i) {
        return u.call(t, 0, Math.max(0, t.length - (null == e || i ? 1 : e)))
    }, _.last = function(t, e, i) {
        if (null != t) return null == e || i ? t[t.length - 1] : _.rest(t, Math.max(0, t.length - e))
    }, _.rest = _.tail = _.drop = function(t, e, i) {
        return u.call(t, null == e || i ? 1 : e)
    }, _.compact = function(t) {
        return _.filter(t, _.identity)
    };
    var I = function(t, e, i, n) {
        for (var s = [], o = 0, r = n || 0, a = D(t); r < a; r++) {
            var l = t[r];
            if (k(l) && (_.isArray(l) || _.isArguments(l))) {
                e || (l = I(l, e, i));
                var h = 0,
                    u = l.length;
                for (s.length += u; h < u;) s[o++] = l[h++]
            } else i || (s[o++] = l)
        }
        return s
    };
    _.flatten = function(t, e) {
        return I(t, e, !1)
    }, _.without = function(t) {
        return _.difference(t, u.call(arguments, 1))
    }, _.uniq = _.unique = function(t, e, i, n) {
        _.isBoolean(e) || (n = i, i = e, e = !1), null != i && (i = y(i, n));
        for (var s = [], o = [], r = 0, a = D(t); r < a; r++) {
            var l = t[r],
                h = i ? i(l, r, t) : l;
            e ? (r && o === h || s.push(l), o = h) : i ? _.contains(o, h) || (o.push(h), s.push(l)) : _.contains(s, l) || s.push(l)
        }
        return s
    }, _.union = function() {
        return _.uniq(I(arguments, !0, !0))
    }, _.intersection = function(t) {
        for (var e = [], i = arguments.length, n = 0, s = D(t); n < s; n++) {
            var o = t[n];
            if (!_.contains(e, o)) {
                for (var r = 1; r < i && _.contains(arguments[r], o); r++);
                r === i && e.push(o)
            }
        }
        return e
    }, _.difference = function(t) {
        var e = I(arguments, !0, !0, 1);
        return _.filter(t, function(t) {
            return !_.contains(e, t)
        })
    }, _.zip = function() {
        return _.unzip(arguments)
    }, _.unzip = function(t) {
        for (var e = t && _.max(t, D).length || 0, i = Array(e), n = 0; n < e; n++) i[n] = _.pluck(t, n);
        return i
    }, _.object = function(t, e) {
        for (var i = {}, n = 0, s = D(t); n < s; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
        return i
    }, _.findIndex = e(1), _.findLastIndex = e(-1), _.sortedIndex = function(t, e, i, n) {
        i = y(i, n, 1);
        for (var s = i(e), o = 0, r = D(t); o < r;) {
            var a = Math.floor((o + r) / 2);
            i(t[a]) < s ? o = a + 1 : r = a
        }
        return o
    }, _.indexOf = i(1, _.findIndex, _.sortedIndex), _.lastIndexOf = i(-1, _.findLastIndex), _.range = function(t, e, i) {
        null == e && (e = t || 0, t = 0), i = i || 1;
        for (var n = Math.max(Math.ceil((e - t) / i), 0), s = Array(n), o = 0; o < n; o++, t += i) s[o] = t;
        return s
    };
    var S = function(t, e, i, n, s) {
        if (!(n instanceof e)) return t.apply(i, s);
        var o = x(t.prototype),
            r = t.apply(o, s);
        return _.isObject(r) ? r : o
    };
    _.bind = function(t, e) {
        if (g && t.bind === g) return g.apply(t, u.call(arguments, 1));
        if (!_.isFunction(t)) throw new TypeError("Bind must be called on a function");
        var i = u.call(arguments, 2),
            n = function() {
                return S(t, n, e, this, i.concat(u.call(arguments)))
            };
        return n
    }, _.partial = function(t) {
        var e = u.call(arguments, 1),
            i = function() {
                for (var n = 0, s = e.length, o = Array(s), r = 0; r < s; r++) o[r] = e[r] === _ ? arguments[n++] : e[r];
                for (; n < arguments.length;) o.push(arguments[n++]);
                return S(t, i, this, this, o)
            };
        return i
    }, _.bindAll = function(t) {
        var e, i, n = arguments.length;
        if (n <= 1) throw new Error("bindAll must be passed function names");
        for (e = 1; e < n; e++) i = arguments[e], t[i] = _.bind(t[i], t);
        return t
    }, _.memoize = function(t, e) {
        var i = function(n) {
            var s = i.cache,
                o = "" + (e ? e.apply(this, arguments) : n);
            return _.has(s, o) || (s[o] = t.apply(this, arguments)), s[o]
        };
        return i.cache = {}, i
    }, _.delay = function(t, e) {
        var i = u.call(arguments, 2);
        return setTimeout(function() {
            return t.apply(null, i)
        }, e)
    }, _.defer = _.partial(_.delay, _, 1), _.throttle = function(t, e, i) {
        var n, s, o, r = null,
            a = 0;
        i || (i = {});
        var l = function() {
            a = !1 === i.leading ? 0 : _.now(), r = null, o = t.apply(n, s), r || (n = s = null)
        };
        return function() {
            var h = _.now();
            a || !1 !== i.leading || (a = h);
            var u = e - (h - a);
            return n = this, s = arguments, u <= 0 || u > e ? (r && (clearTimeout(r), r = null), a = h, o = t.apply(n, s), r || (n = s = null)) : r || !1 === i.trailing || (r = setTimeout(l, u)), o
        }
    }, _.debounce = function(t, e, i) {
        var n, s, o, r, a, l = function() {
            var h = _.now() - r;
            h < e && h >= 0 ? n = setTimeout(l, e - h) : (n = null, i || (a = t.apply(o, s), n || (o = s = null)))
        };
        return function() {
            o = this, s = arguments, r = _.now();
            var h = i && !n;
            return n || (n = setTimeout(l, e)), h && (a = t.apply(o, s), o = s = null), a
        }
    }, _.wrap = function(t, e) {
        return _.partial(e, t)
    }, _.negate = function(t) {
        return function() {
            return !t.apply(this, arguments)
        }
    }, _.compose = function() {
        var t = arguments,
            e = t.length - 1;
        return function() {
            for (var i = e, n = t[e].apply(this, arguments); i--;) n = t[i].call(this, n);
            return n
        }
    }, _.after = function(t, e) {
        return function() {
            if (--t < 1) return e.apply(this, arguments)
        }
    }, _.before = function(t, e) {
        var i;
        return function() {
            return --t > 0 && (i = e.apply(this, arguments)), t <= 1 && (e = null), i
        }
    }, _.once = _.partial(_.before, 2);
    var A = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        O = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    _.keys = function(t) {
        if (!_.isObject(t)) return [];
        if (f) return f(t);
        var e = [];
        for (var i in t) _.has(t, i) && e.push(i);
        return A && n(t, e), e
    }, _.allKeys = function(t) {
        if (!_.isObject(t)) return [];
        var e = [];
        for (var i in t) e.push(i);
        return A && n(t, e), e
    }, _.values = function(t) {
        for (var e = _.keys(t), i = e.length, n = Array(i), s = 0; s < i; s++) n[s] = t[e[s]];
        return n
    }, _.mapObject = function(t, e, i) {
        e = y(e, i);
        for (var n, s = _.keys(t), o = s.length, r = {}, a = 0; a < o; a++) n = s[a], r[n] = e(t[n], n, t);
        return r
    }, _.pairs = function(t) {
        for (var e = _.keys(t), i = e.length, n = Array(i), s = 0; s < i; s++) n[s] = [e[s], t[e[s]]];
        return n
    }, _.invert = function(t) {
        for (var e = {}, i = _.keys(t), n = 0, s = i.length; n < s; n++) e[t[i[n]]] = i[n];
        return e
    }, _.functions = _.methods = function(t) {
        var e = [];
        for (var i in t) _.isFunction(t[i]) && e.push(i);
        return e.sort()
    }, _.extend = w(_.allKeys), _.extendOwn = _.assign = w(_.keys), _.findKey = function(t, e, i) {
        e = y(e, i);
        for (var n, s = _.keys(t), o = 0, r = s.length; o < r; o++)
            if (n = s[o], e(t[n], n, t)) return n
    }, _.pick = function(t, e, i) {
        var n, s, o = {},
            r = t;
        if (null == r) return o;
        _.isFunction(e) ? (s = _.allKeys(r), n = b(e, i)) : (s = I(arguments, !1, !1, 1), n = function(t, e, i) {
            return e in i
        }, r = Object(r));
        for (var a = 0, l = s.length; a < l; a++) {
            var h = s[a],
                u = r[h];
            n(u, h, r) && (o[h] = u)
        }
        return o
    }, _.omit = function(t, e, i) {
        if (_.isFunction(e)) e = _.negate(e);
        else {
            var n = _.map(I(arguments, !1, !1, 1), String);
            e = function(t, e) {
                return !_.contains(n, e)
            }
        }
        return _.pick(t, e, i)
    }, _.defaults = w(_.allKeys, !0), _.create = function(t, e) {
        var i = x(t);
        return e && _.extendOwn(i, e), i
    }, _.clone = function(t) {
        return _.isObject(t) ? _.isArray(t) ? t.slice() : _.extend({}, t) : t
    }, _.tap = function(t, e) {
        return e(t), t
    }, _.isMatch = function(t, e) {
        var i = _.keys(e),
            n = i.length;
        if (null == t) return !n;
        for (var s = Object(t), o = 0; o < n; o++) {
            var r = i[o];
            if (e[r] !== s[r] || !(r in s)) return !1
        }
        return !0
    };
    var P = function(t, e, i, n) {
        if (t === e) return 0 !== t || 1 / t == 1 / e;
        if (null == t || null == e) return t === e;
        t instanceof _ && (t = t._wrapped), e instanceof _ && (e = e._wrapped);
        var s = c.call(t);
        if (s !== c.call(e)) return !1;
        switch (s) {
            case "[object RegExp]":
            case "[object String]":
                return "" + t == "" + e;
            case "[object Number]":
                return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;
            case "[object Date]":
            case "[object Boolean]":
                return +t == +e
        }
        var o = "[object Array]" === s;
        if (!o) {
            if ("object" != typeof t || "object" != typeof e) return !1;
            var r = t.constructor,
                a = e.constructor;
            if (r !== a && !(_.isFunction(r) && r instanceof r && _.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1
        }
        i = i || [], n = n || [];
        for (var l = i.length; l--;)
            if (i[l] === t) return n[l] === e;
        if (i.push(t), n.push(e), o) {
            if ((l = t.length) !== e.length) return !1;
            for (; l--;)
                if (!P(t[l], e[l], i, n)) return !1
        } else {
            var h, u = _.keys(t);
            if (l = u.length, _.keys(e).length !== l) return !1;
            for (; l--;)
                if (h = u[l], !_.has(e, h) || !P(t[h], e[h], i, n)) return !1
        }
        return i.pop(), n.pop(), !0
    };
    _.isEqual = function(t, e) {
        return P(t, e)
    }, _.isEmpty = function(t) {
        return null == t || (k(t) && (_.isArray(t) || _.isString(t) || _.isArguments(t)) ? 0 === t.length : 0 === _.keys(t).length)
    }, _.isElement = function(t) {
        return !(!t || 1 !== t.nodeType)
    }, _.isArray = p || function(t) {
        return "[object Array]" === c.call(t)
    }, _.isObject = function(t) {
        var e = typeof t;
        return "function" === e || "object" === e && !!t
    }, _.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
        _["is" + t] = function(e) {
            return c.call(e) === "[object " + t + "]"
        }
    }), _.isArguments(arguments) || (_.isArguments = function(t) {
        return _.has(t, "callee")
    }), "function" != typeof /./ && "object" != typeof Int8Array && (_.isFunction = function(t) {
        return "function" == typeof t || !1
    }), _.isFinite = function(t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }, _.isNaN = function(t) {
        return _.isNumber(t) && t !== +t
    }, _.isBoolean = function(t) {
        return !0 === t || !1 === t || "[object Boolean]" === c.call(t)
    }, _.isNull = function(t) {
        return null === t
    }, _.isUndefined = function(t) {
        return void 0 === t
    }, _.has = function(t, e) {
        return null != t && d.call(t, e)
    }, _.noConflict = function() {
        return s._ = o, this
    }, _.identity = function(t) {
        return t
    }, _.constant = function(t) {
        return function() {
            return t
        }
    }, _.noop = function() {}, _.property = C, _.propertyOf = function(t) {
        return null == t ? function() {} : function(e) {
            return t[e]
        }
    }, _.matcher = _.matches = function(t) {
        return t = _.extendOwn({}, t),
            function(e) {
                return _.isMatch(e, t)
            }
    }, _.times = function(t, e, i) {
        var n = Array(Math.max(0, t));
        e = b(e, i, 1);
        for (var s = 0; s < t; s++) n[s] = e(s);
        return n
    }, _.random = function(t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    }, _.now = Date.now || function() {
        return (new Date).getTime()
    };
    var N = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        M = _.invert(N),
        H = function(t) {
            var e = function(e) {
                    return t[e]
                },
                i = "(?:" + _.keys(t).join("|") + ")",
                n = RegExp(i),
                s = RegExp(i, "g");
            return function(t) {
                return t = null == t ? "" : "" + t, n.test(t) ? t.replace(s, e) : t
            }
        };
    _.escape = H(N), _.unescape = H(M), _.result = function(t, e, i) {
        var n = null == t ? void 0 : t[e];
        return void 0 === n && (n = i), _.isFunction(n) ? n.call(t) : n
    };
    var L = 0;
    _.uniqueId = function(t) {
        var e = ++L + "";
        return t ? t + e : e
    }, _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var W = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        F = function(t) {
            return "\\" + W[t]
        };
    _.template = function(t, e, i) {
        !e && i && (e = i), e = _.defaults({}, e, _.templateSettings);
        var n = RegExp([(e.escape || /(.)^/).source, (e.interpolate || /(.)^/).source, (e.evaluate || /(.)^/).source].join("|") + "|$", "g"),
            s = 0,
            o = "__p+='";
        t.replace(n, function(e, i, n, r, a) {
            return o += t.slice(s, a).replace(/\\|'|\r|\n|\u2028|\u2029/g, F), s = a + e.length, i ? o += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : n ? o += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : r && (o += "';\n" + r + "\n__p+='"), e
        }), o += "';\n", e.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            var r = new Function(e.variable || "obj", "_", o)
        } catch (t) {
            throw t.source = o, t
        }
        var a = function(t) {
            return r.call(this, t, _)
        };
        return a.source = "function(" + (e.variable || "obj") + "){\n" + o + "}", a
    }, _.chain = function(t) {
        var e = _(t);
        return e._chain = !0, e
    };
    var R = function(t, e) {
        return t._chain ? _(e).chain() : e
    };
    _.mixin = function(t) {
        _.each(_.functions(t), function(e) {
            var i = _[e] = t[e];
            _.prototype[e] = function() {
                var t = [this._wrapped];
                return h.apply(t, arguments), R(this, i.apply(_, t))
            }
        })
    }, _.mixin(_), _.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
        var e = r[t];
        _.prototype[t] = function() {
            var i = this._wrapped;
            return e.apply(i, arguments), "shift" !== t && "splice" !== t || 0 !== i.length || delete i[0], R(this, i)
        }
    }), _.each(["concat", "join", "slice"], function(t) {
        var e = r[t];
        _.prototype[t] = function() {
            return R(this, e.apply(this._wrapped, arguments))
        }
    }), _.prototype.value = function() {
        return this._wrapped
    }, _.prototype.valueOf = _.prototype.toJSON = _.prototype.value, _.prototype.toString = function() {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return _
    })
}.call(this);
var WebVideoEditor = function(t) {
    "use strict";
	
    var e, i, n, s, o, r, a = this,
        l = {
            requestHandler: "index.php",
            userId: "",
            baseUrl: "",
            inputDir: "userfiles/input/",
            outputDir: "userfiles/output/",
            updateDataInterval: 2e3
        };
    this.init = function() {
        this.options = $.extend({}, l, t), "loading" != document.readyState ? this.onReady() : document.addEventListener("DOMContentLoaded", this.onReady.bind(this))
    }, this.onReady = function() {
		var ac = getParameterByName('action');
		if ( ac == 'users'){
			s = $("#wve-timeline"), o = $("#wve-timeline-range"), $("body").tooltip({
				selector: '[data-toggle="tooltip"],.toggle-tooltip',
				container: "body",
				trigger: "hover",
				animation: !1,
				placement: function(t, e) {
					return $(this.element).data("placement") ? $(this.element).data("placement") : "bottom"
				}
			}).on("mousedown", '[data-toggle="tooltip"],.toggle-tooltip', function() {
				//$($(this).data("bs.tooltip").tip).remove()
			}), i = $("#wve-video").get(0), $(i).on("loadedmetadata error", function() {
				e && (this.readyState || a.alert("The video format is not supported by your browser."))
			}).on("play pause", a.onMainVideoPlayChange.bind(a)).on("timeupdate", {
				playing: !0
			}, function(t) {
				n && (s.slider("option", {
					value: 1e3 * this.currentTime
				}), $("#wve-editor-player-time-current").text(a.secondsToTime(this.currentTime)))
			}), this.buttonsInit()
			//this.updateUserResult("output"), this.buttonsInit()			
		} else {
			s = $("#wve-timeline"), o = $("#wve-timeline-range"), $("body").tooltip({
				selector: '[data-toggle="tooltip"],.toggle-tooltip',
				container: "body",
				trigger: "hover",
				animation: !1,
				placement: function(t, e) {
					return $(this.element).data("placement") ? $(this.element).data("placement") : "bottom"
				}
			}).on("mousedown", '[data-toggle="tooltip"],.toggle-tooltip', function() {
				//$($(this).data("bs.tooltip").tip).remove()
			}), i = $("#wve-video").get(0), $(i).on("loadedmetadata error", function() {
				if ( this.readyState  ) {
					/*xxx*/
					$('button[data-action="play_main"]').prop('disabled', false);
				}
				//if ($('#autoPlay').is(':checked')) {
					i.play(); 
				//}
				
				e && (this.readyState || a.alert("The video format is not supported by your browser."))
			}).on("play pause", a.onMainVideoPlayChange.bind(a)).on("timeupdate", {
				playing: !0
			}, function(t) {
				n && (s.slider("option", {
					value: 1e3 * this.currentTime
				}), $("#wve-editor-player-time-current").text(a.secondsToTime(this.currentTime)))
			}), this.updateMediaList("input"), this.updateMediaList("output"), this.buttonsInit()
			//this.updateUserResult("output"), this.buttonsInit()
		}
		//
    }, this.onMainVideoPlayChange = function() {
        var t = $('button[data-action="play_main"]');
        i.paused ? (t.html('<span class="icon-play3"></span>'), n = !1, a.clearTimers()) : (t.html('<span class="icon-pause2"></span>'), n = !0)
    }, this.clearTimers = function() {
        clearInterval(this.interval), clearTimeout(this.timer)
    }, this.onTimelineChange = function(t, n) {
        e && e.url && t.originalEvent && (i.currentTime = n.value / 1e3, $("#wve-editor-player-time-current").text(this.secondsToTime(n.value / 1e3)))
    }, this.onTimelineRangeChange = function(t, e) {
        n = !1, i.pause(), i.currentTime = e.value / 1e3
    }, this.onTimelineRangeSlide = function(t, i) {
        var n = i.values.indexOf(i.value),
            r = s.slider("value"),
            a = Math.round(.007 * e.duration_ms);
        if (_.range(r - a, r + a).indexOf(i.value) > -1) {
            var l = 0 === n ? [r, i.values[1]] : [i.values[0], r];
            return o.slider("values", l), !1
        }
    }, this.importMediaInit = function() {
        var t = _.template($("#modalImportMediaTemplate").html());
        $(document.body).append(t());
        var e = $("#modalImportMedia"),
            i = $(".js-button-submit", e),
            n = $('[name="youtube_url"]', e),
            s = $('[type="file"]', e);
        $(".file-input-container", e).each(function() {
            var t = $('[type="file"]', this),
                e = $(".file-input", this);
            e.on("click", function(e) {
                e.preventDefault(), $(this).is(".disabled") || t.trigger("click")
            }), t.on("change", function() {
                var t = $(this).val().split(/[\/\\]/),
                    i = t[t.length - 1];
                i.length > 30 && (i = i.substr(0, 14) + "..." + i.substr(i.length - 14)), i && e.text(i)
            })
        }), e.on("hidden.bs.modal", function() {
            e.remove()
        }), i.on("click", function(t) {
            if (t.preventDefault(), !n.val() && !s.val()) return a.alert("Please enter the URL or select the video file.", "Error", "danger"), !1;
            var i = new FormData;
            i.append("input_file", s.get(0).files[0] ? s.get(0).files[0] : ""), i.append("input_url", n.val()), i.append("action", "upload"), a.showPreloader(), $.ajax({
                url: a.options.baseUrl + a.options.requestHandler,
                method: "POST",
                data: i,
                cache: !1,
                contentType: !1,
                processData: !1
            }).done(function(t) {
                a.hidePreloader(500), "string" == typeof t && (t = JSON.parse(t)), t.success ? (e.modal("hide"), t.msg && a.alert(t.msg), a.updateMediaList()) : t.msg && a.alert(t.msg, "Error", "danger"), a.updateUserStat()
            })
        }), e.modal("show")
    }, this.buttonsInit = function() {
        $(document.body).on("click", '[data-toggle="action"]', function(t) {
            t.preventDefault(), t.stopPropagation();
            var n = $(this),
                o = n.data("action").split("_"),
                r = n.data("id");
            switch (o[0]) {
                case "delete":
                    switch (o[1]) {
                        case "input":
                        case "output":
                            a.mediaRemove(r, o[1]);
                            break;
                        case "episode":
						/*alert pooo'*/
                            a.episodeRemove(n.data("index"))
                    }
                    break;
                case "rename":
                    a.mediaRename(r, o[1]);
                    break;
                case "import":
                    a.importMediaInit();
                    break;
                case "select-media":
					//$('div[aria-label="First group"]').css('visibility','hidden'); //By Rami
					$('button[data-action="play_main"]').prop('disabled', true);
                    if ($(this).parent("li").hasClass("active")) return;
                    a.selectMedia(r, o[1]);
                    break;
                case "play":
                    switch (o[1]) {
                        case "main":
                            if (!e || !e.url) return;
                            if (!i.readyState) return void a.alert("The video format is not supported by your browser.");
                            i.paused ? i.play() : i.pause();
                            break;
                        case "selected":
                            a.playVideoSelected();
                            break;
                        case "episode":
                            var l = n.data("index");
                            a.playMedia("episode", null, l);
                            break;
                        case "output":
                            a.playMedia("output", r)
                    }
                    break;
                case "stepback":
                case "stepforward":
                    switch (a.clearTimers(), o[1]) {
                        case "main":
                            if (!e || !e.url) return;
                            var h = s.slider("value"),
                                u = s.slider("option", "min"),
                                c = s.slider("option", "max");
                            h += "stepforward" == o[0] ? 10 : -10, h = Math.min(c, Math.max(u, h)), s.slider("value", h), i.currentTime = h / 1e3
                    }
                    break;
                case "take-episode":
                    a.takeEpisode();
                    break;
                case "render":
					
                    a.checkProcessStatus(function() {
						
						a.renderProject2()
                    });
                    break;
                case "convert":
                    a.checkProcessStatus(function() {
                        a.convertMedia(r, o[1])
                    });
                    break;
                case "log":
                    a.showLog();
                    break;
                case "profile":
                    a.showUserProfile()
					break;
				case "updateUserResult":
					//$("#dtable").find("tr:not(:first)").remove();;	
					a.updateUserResult('output');
					break;
				case "approveVideos":		
					a.publishVideos('approve');
					break;
				case "penddingVideos":		
					a.publishVideos('pending');
					break;
				case "liveVideos":		
					a.publishVideos('live');
					break;

				case "searchPublication":		
					a.searchPublication();
					break;					

                case "managePublication":
					
					a.managePublicationInfo( $(this).attr('data-id') );
					//a.mediaRename(r, o[1]);
                    break;
					
            }
        })
		
    }, this.publishVideos = function(s) {
			
	    var multivalue='';
		$('.selected').each(function(){
			var publish= $(this).find('td span:eq(1)').text();
			var start_pos = publish.indexOf('(') + 1;
			var end_pos = publish.indexOf(')');
			var text_to_get = publish.substring(start_pos,end_pos)
			multivalue += text_to_get+",";
			
		});
		
		if (multivalue == ''){
			alert('Please select videos');
		    return false;
		}
		
		$.ajax({
			url: a.options.baseUrl + a.options.requestHandler,
			method: "GET",
			data: {
				action: "publish",
				multivalue :multivalue,
				stat : s,
			},
			dataType: "json",
			cache: !1
		}).done(function(i) {
				
			var ids = i.items;
			var array = ids.split(",");
			
			$.each(array,function(h){
			  a.updatDataTableRow( array[h] , i.clas, i.sta);
			});
			
			if(typeof i.livecount != 'undefined'){
				alert("("+i.livecount + ') Videos Goes Live'); 
			}
			 //a.updateUserResult('output');
			
		})	
		
    }, this.searchPublication = function() {	
		var id = $('#channel').val();
		var type = $('#pubType').val();
		var lang = $('#pubLang').val();
		var country = $('#pubCountry').val();
		var flag = $('#flag24').is(":checked");	
		
		var e = $("#wve-publication_output");

		$.ajax({
			url: a.options.baseUrl + a.options.requestHandler,
			method: "GET",
			beforeSend: function() { e.html('Loading...'); },
			data: {
				action: "get_publication_list",
				pub_type :type,	
				pubLang :lang,	
				pubCountry :country,	
				flag24 :flag,					
				pub_id :id
			},
			dataType: "json",
			cache: 1
		}).done(function(i) {
			if (i.success) {
			   if( $.fn.DataTable.isDataTable('#dtable') ){
				
					$("#dtable").DataTable().destroy()
			   }				
				e.html('');
				var n = _.template($("#publication_output").html()),
					s = _.template($("#listEmptyTemplate_output").html());
				
				i.data && i.data.length > 0 ? i.data.forEach(function(t, i) {
					t.index = i, e.append(n(t))
				}) : e.append(s())
			 
			 
			   $('#dtable').DataTable( {
				  destroy: true,
				  "cache": false,
				  "pageLength": 5,
				  "lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
				});
				
			}
		})
		
			
    }, this.managePublicationInfo = function(pid) {
		
		$.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
            data: {
                action: "get_publication_info",
				pub_id:pid,
            },
            dataType: "json",
            cache: !1
        }).done(function(i) {
            n = _.template($("#modalPubDetails").html());
            var h = n(i);
            $(document.body).append(h), s = $("#modalAlert"), s.modal("show").on("hidden.bs.modal", function(t) {
                s.remove()
            }).find(".pub-js-button-submit").on("click", function(i) {
				var iname, ivalz, checked;
				var jsonStr = {};
				var jsonObj = [];
				
				
				jsonStr['note'] = $('textarea#note').val() ;
				$("input").each(function(){
					iname = $(this).attr('name'); 
					if(typeof iname != 'undefined') {
						ivalz = '';
						if( $(this).attr('type') == 'radio'   ) {// if input is radio
							if ( this.checked ){
								ivalz = $(this).val()
								jsonStr[iname] = ivalz ;
							}
						} else { // if input is text
							ivalz = $('input[name="'+iname+'"]').val()
							jsonStr[iname] = ivalz ;							
						}
					}
				});
				
				jsonObj.push(jsonStr);
				$.ajax({
						url: a.options.baseUrl + a.options.requestHandler,
						method: "POST",
						data: {
							action: "save_publication_info",
							data:JSON.stringify(jsonObj),
						},
						dataType: "json",
						cache: !1
					}).done(function(i) {
						
					})		
            })
			
        })
	
	var n = _.template($("#ModifyPublicationModalTemplate").html());
		  $(document.body).append(n({
                content:'rami'
            }));
           $("#modifyPublicationModal").modal("show")

			
    }, this.updatDataTableRow = function(i, s, t) {	

		var elm= $('#'+i+' td:eq(0) span:eq(0)');
		elm.attr('class',  function(i, c){  return c.replace(/(^|\s)badge-\S+/g, '');  });
		elm.addClass('badge-'+s);
		elm.text(t);
			
    }, this.updatDataTableInfo = function(id, title, keywords) {
			
		var elm= $('#'+id+' td:eq(0) span:eq(1)');
		elm.attr('title', keywords);
		elm.text(title +' ('+id+')');
		
			
    }, this.deleteDataTableRow = function(id) {
			$("#dtable").DataTable().row('#'+id).remove().draw( false );
    }, this.updateUserResult = function(t) {

	    if( $.fn.DataTable.isDataTable('#dtable') ){
			
			$("#dtable").DataTable().destroy()
	    }
		
        t = t || "input";
		
		$('#publishBtn').css("display", "block");
		var channels = $('#channel').val();
		var sta = $('#status').val();
		var fdate = $('#date').val();
		var tdate = $('#date1').val();
		
        var e = $("#wve-list_" + t);
		var pid = getParameterByName('tab_id');
		
        e.empty(), $.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
			beforeSend: function() { e.html('Loading...'); },
			
            data: {
                action: "search_list",
				channels :channels,
				sta :sta,				
				fdate :fdate,				
				tdate :tdate
            },
            dataType: "json",
            cache: 1
        }).done(function(i) {
			$('#dtable').show();
            if (i.success) {
			e.html('');
                var n = _.template($("#listItemTemplate2_" + t).html()),
                    s = _.template($("#listEmptyTemplate_" + t).html());
                i.data && i.data.length > 0 ? i.data.forEach(function(t, i) {
                    t.index = i, e.append(n(t))
                }) : e.append(s())
				if(i.data.length > 0){
				   $('#dtable').DataTable( {
					  destroy: true,
					  "cache": false,
					  "pageLength": 5,
					   "lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
					});
					
				
			$('#dtable').on('click', 'td', function () {
				$(this).closest('tr').toggleClass('selected');
			});			   
				   $('#dtable').DataTable().column( 4 ).visible( false );
				}
			   				
            }
        })
		
    },this.removeAllList = function(t) {
		 
		while(vArray.length > 0) {
			vArray.pop();
		}		
		
		$("#wve-episode-container").html('');
		
	},this.updateMediaList = function(t) {
        t = t || "input";
		
		var e = $("#wve-list_" + t);
		if(t == "input"){
			var fdate  = $('#fdate').val();
			var tdate  = $('#tdate').val();
			var channel_id = $("#channel").chosen().val()
			var durationS = $("#duration").chosen().val()
			
			
			//alert(channel_id+' Duration='+durationS);
			if ( (channel_id != 0) &&  (typeof tdate != 'undefined') && (typeof fdate != 'undefined') ){
				var callFun = 'content_list3';
				$('#input-loading').text('loading...');
				$('#submitBTN').attr("disabled", "disabled");
				$.getJSON( "http://edit.mediaobserver-me.com/file_listing.php?length="+durationS+"&stime="+fdate+"&etime="+tdate+"&id="+channel_id, function( data ) {
				  var items = [];
				  var idnu = 0
				  $.each( data, function( key, val ) {
					  
					  if(key == 'error' ){
						  a.alert(val, "Error", "danger")
						  $('#submitBTN').removeAttr("disabled");
						  $('#input-loading').text('Empty');
						  return;
					  }
					  /*
					val =  val.replace('/var/www/', 'http://');
					val =  val.replace('playlist//', 'playlist/');
					val =  val.replace('public/', '');
					*/
					val = val.substring(val.indexOf('playlist//') + 10);
					
					val = '<li onclick="plist(\''+val+'\', \''+idnu+'\')"  id="id'+idnu+'" class=" list-group-item list-group-item-action show-on-hover-parent" style="width:495px !important; font-weight:bold;"><div><span class="jp-free-media"><span  style="cursor:hand;">'+changeDateFormat(val)+'</span></div></li>';
					
					$('#input-loading').remove();
					$('#submitBTN').removeAttr("disabled");
					
					var n = _.template($("#listItemTemplate_input" ).html()),
						s = _.template($("#listEmptyTemplate_input").html());
					 e.append(val)
					 idnu++;
					
					
				  });
				 
				 
				}).fail(function() {
					$('#input-loading').text('Something error');
					$('#submitBTN').removeAttr("disabled");
				  });	
			}			
		} else {
			
			var callFun = 'content_list4';
		
			
			var pid = getParameterByName('tab_id');
			e.empty(), $.ajax({
				url: a.options.baseUrl + a.options.requestHandler,
				method: "GET",
				beforeSend: function() { e.html('Loading...'); },
				data: {
					action: callFun,
					tab_id: pid,
					type: t
				},
				dataType: "json",
				cache: !1
			}).done(function(i) {
				if (i.success) {
					e.html('');
					var n = _.template($("#listItemTemplate_" + t).html()),
						s = _.template($("#listEmptyTemplate_" + t).html());
					i.data && i.data.length > 0 ? i.data.forEach(function(t, i) {
						t.index = i, e.append(n(t))
					}) : e.append(s())
				}
			})
		}
    }, this.mediaRemove = function(t, n) {
		var inPage = getParameterByName('action');
        a.confirm("Are you sure you want to remove this item?", function() {
			var rid = t;
            $.ajax({
                url: a.options.baseUrl + a.options.requestHandler,
                method: "POST",
                data: {
                    action: "delete",
                    type: n,
					inPage:inPage,
                    itemId: t
                },
                dataType: "json",
                cache: !1
            }).done(function(t) {
				if (t.redirect == 'user'){
					//$('#searchSubmit').click();
					a.deleteDataTableRow(rid);
				} else {
					t.success ? ("input" == n && (e = null, i.pause(), i.src = "", $("#wve-editor-player-time-current").parent().hide()), a.updateUserStat(), a.updateMediaList(n)) : t.msg && a.alert(t.msg, "Error", "danger")
				}
                
            })
			
        })
    }, this.mediaRename = function(t, e) {
		
        this.getMediaData(t, e, function(i) {
			var inPage = getParameterByName('action');
			
			var n = _.template($("#mediaRenameModalTemplate").html());
			
            $(document.body).append(n({
                content: i.data.keywords
            }));
			//alert(i.data.toSource());
			
            var s = $("#mediaRenameModal"),
                o = $('input[type="text"]', s);
				r = $('select', s);
				

            s.on("shown.bs.modal", function(t) {
                o.get(0).focus();
                var e = o.val();
                o.val("").val(e)
				
            }).modal("show").on("hidden.bs.modal", function(t) {
                s.remove()
            }).find(".js-button-submit").on("click", function(i) {
                i.preventDefault();
				
                var n = o.val();
				var k = r.val();
                $.ajax({
                    url: a.options.baseUrl + a.options.requestHandler,
                    method: "POST",
                    data: {
                        action: "update_media",
                        type: e,
                        itemId: t,
						inpage: inPage,
                        value: k
                    },
                    dataType: "json",
                    cache: !1
                }).done(function(t) {
					
					if (t.redirect == 'user'){
						t.success ? ( s.modal("hide") , a.alert(t.msg, "Keywords saved successfully") ): t.msg && a.alert(t.msg, "Error", "danger")
					} else {
						t.success ? (a.updateMediaList(e), s.modal("hide")) : t.msg && a.alert(t.msg, "Error", "danger")
					}
                })
            })
        })
    }, this.getMediaData = function(t, e, i) {
		
		var pid = getParameterByName('tab_id');
        $.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
            data: {
                action: "select_media3",
                type: e,
				tab_id : pid,
                itemId: t
            },
            dataType: "json",
            cache: !1
        }).done(function(t) {
            t.success ? "function" == typeof i && i(t) : t.msg && a.alert(t.msg, "Error", "danger")
        })
    }, this.playMedia = function(t, e, i) {
		
		var vTitle = "";
        if ("episode" != t || r[i]) {

			var n, s = "";
			"episode" == t && (n = r[i], s = n.url);
			var o = _.template($("#videoPreviewModalTemplate").html());
			$(document.body).append(o({
				src: s,
				vid : e,
			}));
			
            var l = $("#videoPreviewModal"),
                h = $(".js-button-play", l),
				r = $(".changeInfo", l),
                u = $("video", l).get(0),
                c = $('input[type="range"]', l),
                d = !1;
            "episode" != t && this.getMediaData(e, t, function(t) {
                n = t.data, n.time = [0, n.duration_ms], u.src = n.url
            }), c.on("change", function(t) {
                var e = parseInt(this.value);
                if (t.originalEvent) {
                    var i = (n.time[1] - n.time[0]) / 1e3;
                    u.currentTime = i * (e / 100) + n.time[0] / 1e3
                }
            }), $(u).css({
                visibility: "hidden"
            }).on("loadedmetadata error", function() {
                $(this).css({
                    visibility: "visible"
                })
            }).on("canplay", function() {
                d || (n.time && (this.currentTime = n.time[0] / 1e3), d = !0, $(this).css({
                    visibility: "visible"
                }))
            }).on("play pause", function() {
                this.paused ? h.html('<i class="icon-play3"></i> Play') : (h.html('<i class="icon-pause2"></i> Pause'), u.currentTime > n.time[1] / 1e3 && (u.currentTime = n.time[0] / 1e3))
            }).on("timeupdate", {
                playing: !0
            }, function(t) {
                if (this.readyState) {
                    var e = this.currentTime;
                    e < n.time[0] / 1e3 && (this.currentTime = n.time[0] / 1e3), e > n.time[1] / 1e3 && this.pause();
                    var i = (e - n.time[0] / 1e3) / ((n.time[1] - n.time[0]) / 1e3);
                    c.val(100 * i)
                }
            }), h.on("click", function(t) {
                if (t.preventDefault(), !u.readyState) return void a.alert("Playback is not possible.", "Error", "danger");
                u.paused ? u.play() : u.pause()
            }), r.on("click", function(t) {
				var kwz = 	$('select', l).val();
				var stext =$('select option:selected', l).text();
				var title =  $('#vtitle').val() ;
				var atext =  $('#vtext').val() ;
				var vid   =  $('#vid').val() ;
				$.ajax({
					url: a.options.baseUrl + a.options.requestHandler,
					method: "POST",
					data: {
						action: "update_video_info",
						kwz: kwz,
						title : title,
						atext : atext,
						vid: vid
					},
					dataType: "json",
					cache: !1
				}).done(function(t) {
					if ( $( "#fdate" ).length ) { // if in index 
						a.updateMediaList("output")
					} else { // if in list
						//Rami After save info
						var txtArr = stext.split(" ");
						var keysArr = new Array();
						$.each( txtArr, function( index, value ) {
							var arabic = /[\u0600-\u06FF]/;
							if( !(arabic.test(value) || value.includes('::') || !value ) ){
								keysArr.push(value)
							} 
						  
						});
						keysArr = $.unique(keysArr)
						
						a.updatDataTableInfo(vid,title, keysArr.join(',') );
						//$('#dtable #'+vid+' td:eq(0)').html(title +'('+vid+')' );
					}
					
					//alert('Saved');
					//u.pause(), l.remove()
				})				
				
            }), l.modal("show").on("hidden.bs.modal", function(t) {
                u.pause(), l.remove()
            })
			
        }
    }, this.playVideoSelected = function() {
        if (e && e.url) {
            var t = o.slider("values");
            if (i.currentTime = t[0] / 1e3, !i.readyState) return void a.alert("The video format is not supported by your browser.");
            i.play(), this.clearTimers(), this.interval = setInterval(function() {
                1e3 * i.currentTime >= t[1] && (i.pause(), i.currentTime = t[1] / 1e3)
            }, 10)
        }
    }, this.selectMedia = function(t, n) {
		var pid = getParameterByName('tab_id');
        i.pause(), $.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
            data: {
                action: "select_media",
                type: n,
				tab_id : pid,
                itemId: t
            },
            dataType: "json",
            cache: !1
        }).done(function(t) {
            if (t.success) {
                var i = $("#wve-list_input");
                i.find(".list-group-item").removeClass("active"), i.find('.btn-link[data-id="' + t.data.id + '"]').parent("li").addClass("active"), e = t.data, a.updateSelectedMedia()
            } else t.msg && a.alert(t.msg, "Error", "danger")
        })
    }, this.updateSelectedMedia = function() {
        s.data("uiSlider") || s.slider({
            step: 1,
            min: 0,
            max: 500
        }).on("slidechange", a.onTimelineChange.bind(a)), o.data("uiSlider") || o.slider({
            range: !0,
            step: 1,
            min: 0,
            max: 500,
            values: [0, 500],
            change: a.onTimelineRangeChange.bind(a),
            slide: a.onTimelineRangeSlide.bind(a)
        }), i.pause(), this.clearTimers(), i.src = e.url, i.currentTime = 0, s.slider("option", {
            max: e.duration_ms,
            value: 0
        }), o.slider("option", {
            max: e.duration_ms,
            values: [0, e.duration_ms]
        }), $("#wve-editor-player-time").text(e.duration_time).parent().show(), $("#wve-editor-player-time-current").text("00:00:00")
    }, this.takeEpisode = function() {
        if (e && e.url) {
            r || (r = []);
            var t = o.slider("values"),
                i = _.clone(e);
            i.time = t, r.push(i), this.updateEpisodesContent()
        }
    }, this.updateEpisodesContent = function() {
        var t = $("#wve-episode-container"),
            e = $("#wve-episode-container-inner");
        if (e.empty(), t.toggle(r.length > 0), 0 != r.length) {
            var i = _.template($("#episodeItemTemplate").html());
			var pid = getParameterByName('tab_id');
            r.forEach(function(t, n) {
                t.index = n, t.imageUrl = a.options.baseUrl + a.options.requestHandler, t.imageUrl += "?action=frame_image&time=" + t.time[0] + "&itemId=" + t.id+ "&tab_id=" + pid, e.append(i(t))
            })
        }
    }, this.episodeRemove = function(t) {
        r.splice(t, 1), a.updateEpisodesContent()
    }, this.checkProcessStatus = function(t) {
		/*Rami open dialog to get the file name */
		var pid = getParameterByName('tab_id');
        this.showPreloader(), $.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
            data: {
                action: "queue_status",
				pid   : pid
            },
            dataType: "json",
            cache: !1
        }).done(function(e) {
            a.hidePreloader(), e.status && "not_logged_in" == e.status ? (clearInterval(a.interval), window.location.reload()) : e.status && ["pending", "processing"].indexOf(e.status) > -1 ? setTimeout(a.showProgress.bind(a), 1) : "function" == typeof t && t()
        })
    }, this.renderProject2 = function() {
		//alert('xxxx'+vArray);
		
        if (vArray.length == 0) return void this.alert("Your project is empty.", "Error", "danger");
		
       
		var t = _.template($("#renderModalTemplate").html());
        $(document.body).append(t({
            title: "Create movie",
            type: "render"
        }));
        var i, n, s, o = $("#renderModal");
		
        o.modal("show").on("hidden.bs.modal", function(t) {
            o.remove()
        }).find(".js-button-submit").on("click", function(t) {
			
			
            t.preventDefault(), o.find(".js-button-submit").prop("disabled", !0), i = $('input[name="title"]', o).val(), n = a.serializeForm($("form", o)), s = a.getProjectData(), o.find('.modal-body').html('Loading...');
            var e = $(this);
			var pid = getParameterByName('tab_id');
            e.prop("disabled", !0),
				$.ajax({
					url: a.options.baseUrl + a.options.requestHandler,
					method: "POST",
					data: {
						action: "render2",
						title: i,
						options: n,
						pid    : pid,
						tab_id : pid,
						data: JSON.stringify(vArray)
					},
					dataType: "json",
					cache: !1
				}).done(function(t) {
					
					e.prop("disabled", !1), t.success ? (o.modal("hide"),a.updateMediaList("output"), a.removeAllList()) : t.msg && a.alert(t.msg, "Error", "danger")
					
				//	a.clearTimers(), a.updateUserStat(),  a.updateMediaList("output"), e.remove() 
				})
        })
		
    }, this.renderProject = function() {
        if (!e || !e.url) return void this.alert("Your project is empty.", "Error", "danger");
        var t = _.template($("#renderModalTemplate").html());
        $(document.body).append(t({
            title: "Create movie",
            type: "render"
        }));
        var i, n, s, o = $("#renderModal");
        o.modal("show").on("hidden.bs.modal", function(t) {
            o.remove()
        }).find(".js-button-submit").on("click", function(t) {
            t.preventDefault(), o.find(".js-button-submit").prop("disabled", !0), i = $('input[name="title"]', o).val(), n = a.serializeForm($("form", o)), s = a.getProjectData();
            var e = $(this);
			var pid = getParameterByName('tab_id');
            e.prop("disabled", !0), $.ajax({
                url: a.options.baseUrl + a.options.requestHandler,
                method: "POST",
                data: {
                    action: "render",
                    title: i,
                    options: n,
					pid    : pid,
					tab_id : pid,
                    data: JSON.stringify(s)
                },
                dataType: "json",
                cache: !1
            }).done(function(t) {
                e.prop("disabled", !1), t.success ? (o.modal("hide"), a.showProgress()) : t.msg && a.alert(t.msg, "Error", "danger")
            })
        })
    }, this.convertMedia = function(t, e) {
        var i = _.template($("#renderModalTemplate").html());
        $(document.body).append(i({
            title: "Convert video",
            type: "convert"
        }));
        var n, s = $("#renderModal");
        s.modal("show").on("hidden.bs.modal", function(t) {
            s.remove()
        }).find(".js-button-submit").on("click", function(i) {
            i.preventDefault(), n = a.serializeForm($("form", s));
            var o = $(this);
            o.prop("disabled", !0), $.ajax({
                url: a.options.baseUrl + a.options.requestHandler,
                method: "POST",
                data: {
                    action: "convert",
                    itemId: t,
                    type: e,
                    options: n
                },
                dataType: "json",
                cache: !1
            }).done(function(t) {
                o.prop("disabled", !1), t.success ? (s.modal("hide"), a.showProgress()) : t.msg && a.alert(t.msg, "Error", "danger")
            })
        })
    }, this.getProjectData = function() {
        var t = [];
        if (!e || !e.url) return t;
        if (r && r.length > 0) r.forEach(function(e) {
            var i = {
                id: e.id
            };
            i.time = e.time, t.push(i)
        });
        else {
            var i = {
                id: e.id
            };
            i.time = o.slider("values"), t.push(i)
        }
        return t
    }, this.serializeForm = function(t) {
        var e, i;
        return e = $(t).serializeArray(), i = {}, $.each(e, function() {
            var t;
            t = null != this.value ? this.value : "", null != i[this.name] ? (i[this.name].push || (i[this.name] = [i[this.name]]), i[this.name].push(t)) : i[this.name] = t
        }), i
    }, this.confirm = function(t, e) {
        var i = _.template($("#modalConfirmTemplate").html());
        $(document.body).append(i({
            content: t
        }));
        var n = $("#modalConfirm");
        n.modal("show").on("hidden.bs.modal", function(t) {
            n.remove()
        }).find(".js-button-submit").on("click", function(t) {
            t.preventDefault(), "function" == typeof e && e(), n.modal("hide")
        })
    }, this.alert = function(t, e, i) {
        e = e || "Warning", i = i || "warning";
        var n, s, o = {
                danger: "icon-warning color-red big",
                info: "icon-info color-blue big"
            },
            r = o[i] || o.info;
        if ($(".modal.show").length > 0) {
            n = _.template($("#alertTemplate").html()), s = $(".modal.show");
            var a = $(".modal.show:first").find(".modal-body"),
                l = n({
                    type: i,
                    title: e,
                    content: t,
                    icon_class: r
                });
            a.find(".alert").remove(), a.append(l)
        } else {
            n = _.template($("#modalAlertTemplate").html());
            var h = n({
                type: i,
                title: e,
                content: t,
                icon_class: r
            });
            $(document.body).append(h), s = $("#modalAlert"), s.modal("show").on("hidden.bs.modal", function(t) {
                s.remove()
            })
        }
    }, this.showProgress = function() {
		
        $(".wve-preloader").length > 0 && $(".wve-preloader").remove();
        var t = '<div class="wve-preloader" id="wve-preloader">';
        t += '<div class="wve-preloader-inner">', t += '<div class="wve-preloader-caption">Processing...</div>', t += '<div class="wve-preloader-progress">', t += '<div class="progress">', t += '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>', t += "</div>", t += '<div class="mt-3 text-center">', t += ' <button class="btn btn-danger js-button-stop">Stop</button>', t += ' <button class="btn btn-secondary js-button-close">Close</button>', t += "<div>", t += "<div></div></div>", $(document.body).append(t);
        var e = $(".wve-preloader:first"),
            i = e.find(".js-button-stop");
        e.find(".js-button-close").on("click", function(t) {
            t.preventDefault(), a.clearTimers(), e.remove()
        }), i.on("click", function(t) {
            t.preventDefault(), i.prop("disabled", !0), a.clearTimers(), $.ajax({
                url: a.options.baseUrl + a.options.requestHandler,
                method: "POST",
                data: {
                    action: "processing_stop"
                },
                dataType: "json",
                cache: !1
            }).done(function(t) {
                //t.success ? (a.clearTimers(), a.updateUserStat(), a.updateMediaList("input"), a.updateMediaList("output"), e.remove()) : t.msg && alert(t.msg)
				t.success ? (a.clearTimers(), a.updateUserStat(),  a.updateMediaList("output"), e.remove()) : t.msg && alert(t.msg)
            })
        }), a.clearTimers(), this.timer = setTimeout(this.updateRenderingProgressData.bind(this), a.options.updateDataInterval)
    }, this.updateRenderingProgressData = function() {
        var t, e = $(".wve-preloader:first"),
            i = e.find(".wve-preloader-caption");
			var pid = getParameterByName('tab_id');

        $.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
            data: {
                action: "queue_status",
				pid : pid
            },
            dataType: "json",
            cache: !1
        }).done(function(n) {
			/*Rami after finish converting*/
			var nu_of_episods = $('#wve-episode-container .episode-item').length;

							
            n.status && "not_logged_in" == n.status && (a.clearTimers(), window.location.reload()), void 0 !== n.percent && (e.find(".progress-bar").css("width", n.percent + "%").toggleClass("progress-bar-empty", n.percent < 7).text(n.percent + "%"), void 0 !== n.status ? (t = a.capitalizeFirstLetter(n.status) + "...", "pending" == n.status && (t += " Queue: " + (n.pendingCount + n.processingCount)), i.text(t)) : i.text("Please wait..."), n.percent >= 100 || !n.status ? (a.clearTimers(), setTimeout(function() {
               // a.hidePreloader(), a.updateUserStat(), a.updateMediaList("input"), a.updateMediaList("output")
			    a.hidePreloader(), a.updateUserStat(), a.updateMediaList("output")
            }, 1e3)) : a.timer = setTimeout(a.updateRenderingProgressData.bind(a), a.options.updateDataInterval))
			for(i=0;  i<nu_of_episods; i++){
				a.episodeRemove(i)
			}
        })
    }, this.showPreloader = function() {
        var t = '<div class="wve-preloader" id="wve-preloader">';
        t += '<div class="wve-preloader-inner">', t += '<div class="wve-preloader-caption">Please wait...</div>', t += '<div class="wve-preloader-content"><div>', t += "</div>", t += "</div>", $(document.body).append(t)
    }, this.hidePreloader = function(t) {
        t = t || 0, setTimeout(function() {
            $("#wve-preloader").remove()
        }, t)
    }, this.showLog = function() {
        this.showPreloader();
        var t, e;
        $.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
            data: {
                action: "user_log"
            },
            dataType: "json",
            cache: !1
        }).done(function(i) {
            if (a.hidePreloader(), i.success) {
                t = _.template($("#modalLargeTemplate").html());
                var n = '<pre class="code">' + i.content + "</pre>";
                $(document.body).append(t({
                    title: "Log",
                    content: n
                })), e = $("#modalLarge"), e.modal("show").on("hidden.bs.modal", function(t) {
                    e.remove()
                })
            } else i.msg && a.alert(i.msg, "Error", "danger")
        })
    }, this.getUserData = function(t) {
        $.ajax({
            url: a.options.baseUrl + a.options.requestHandler,
            method: "GET",
            data: {
                action: "user_profile"
            },
            dataType: "json",
            cache: !1
        }).done(function(e) {
            e.status && "not_logged_in" == e.status ? (clearInterval(a.interval), window.location.reload()) : "function" == typeof t && t(e)
        })
    }, this.updateUserStat = function() {
        var t = _.template($("#userStatTemplate").html()),
            e = $("#wve-user-stat");
        this.getUserData(function(i) {
            i.success && e.html(t(i.data))
        })
    }, this.secondsToTime = function(t) {
        var e = Math.floor(t / 3600),
            i = Math.floor((t - 3600 * e) / 60),
            n = t - 3600 * e - 60 * i;
        return n = n.toFixed(2), e < 10 && (e = "0" + e), i < 10 && (i = "0" + i), n < 10 && (n = "0" + n), e + ":" + i + ":" + n
    }, this.showUserProfile = function() {
        var t, e = _.template($("#userProfileTemplate").html()),
            i = _.template($("#modalAlertTemplate").html());
        this.showPreloader(), this.getUserData(function(n) {
            if (a.hidePreloader(), n.success) {
                var s = e(n.data),
                    o = i({
                        title: "User profile",
                        content: "[content]",
                        icon_class: ""
                    });
                o = o.replace("[content]", s), $(document.body).append(o), t = $("#modalAlert"), t.modal("show").on("hidden.bs.modal", function(e) {
                    t.remove()
                })
            }
        })
    }, this.capitalizeFirstLetter = function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }, this.init()
};