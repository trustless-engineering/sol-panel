/*!
 * @stijn-dejongh/docsify-glossary
 * v0.0.2
 * https://github.com/stijn-dejongh/docsify-glossary#readme
 * (c) 2018-2022 Stijn Dejongh
 * Apache-2.0 license
 */
(this['@stijn-dejongh/docsify-glossary'] = this['@stijn-dejongh/docsify-glossary'] || {}),
	(this['@stijn-dejongh/docsify-glossary'].js = (function (e) {
		'use strict';
		function t(e) {
			return e.trim().startsWith('#');
		}
		function n(e, n, i, o) {
			var r = '',
				c = !1;
			return (
				e.split('\n').forEach(function (e, s) {
					e.trim().startsWith('```') && (c = !c);
					var a = e;
					e.trim().length > 0 &&
						!c &&
						(a = (function (e, n, i, o) {
							if (t(n) && !o.replaceTitleTerms) return n;
							var r = new RegExp('\\s('.concat(e, ')[\\s$]'), 'ig'),
								c = new RegExp('\\s('.concat(e, ').'), 'ig'),
								s = new RegExp('\\s('.concat(e, '),'), 'ig'),
								a = ' [$1](/_glossary?id='.concat(i, ')'),
								l = n
									.replace(s, a + ',')
									.replace(r, a + ' ')
									.replace(c, a + '.');
							return t(n) ? l.replaceAll('['.concat(e, ']'), '[ '.concat(e, ']')) : l;
						})(n, e + ' ', i, o).trimEnd()),
						(r += a + '\n');
				}),
				r
			);
		}
		function i(e, t) {
			var n = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var i = Object.getOwnPropertySymbols(e);
				t &&
					(i = i.filter(function (t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable;
					})),
					n.push.apply(n, i);
			}
			return n;
		}
		function o(e, t) {
			for (var n = 0; n < t.length; n++) {
				var i = t[n];
				(i.enumerable = i.enumerable || !1), (i.configurable = !0), 'value' in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
			}
		}
		function r(e, t, n) {
			return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
		}
		var c = '#####',
			s = '_glossary.md',
			a = (function () {
				function e() {
					!(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, e),
						r(this, 'terminologyHeading', ''),
						r(this, 'glossaryLocation', ''),
						r(this, 'debug', !1),
						r(this, 'replaceTitleTerms', !0),
						(this.terminologyHeading = c),
						(this.glossaryLocation = s);
				}
				var t, n, a;
				return (
					(t = e),
					(n = [
						{
							key: 'withTermHeading',
							value: function (e) {
								return (this.terminologyHeading = e), this;
							},
						},
						{
							key: 'withGlossaryLocation',
							value: function (e) {
								return (this.glossaryLocation = e), this;
							},
						},
						{
							key: 'withDebugEnabled',
							value: function (e) {
								return (this.debug = e), this;
							},
						},
						{
							key: 'withTitleTermReplacement',
							value: function (e) {
								return (this.replaceTitleTerms = e), this;
							},
						},
						{
							key: 'build',
							value: function () {
								return (function (e) {
									for (var t = 1; t < arguments.length; t++) {
										var n = null != arguments[t] ? arguments[t] : {};
										t % 2
											? i(Object(n), !0).forEach(function (t) {
													r(e, t, n[t]);
											  })
											: Object.getOwnPropertyDescriptors
											? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
											: i(Object(n)).forEach(function (t) {
													Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
											  });
									}
									return e;
								})({}, this);
							},
						},
					]),
					n && o(t.prototype, n),
					a && o(t, a),
					Object.defineProperty(t, 'prototype', { writable: !1 }),
					e
				);
			})();
		function l(e, t, i) {
			i(
				(e = (function (e, t, i) {
					var o = e;
					for (var r in (i.debug && console.log('Adding links for terminology: '.concat(t)), t)) o = n(o, r, t[r], i);
					return o;
				})(e, window.$docsify.terms, t)),
			);
		}
		function u() {
			if (void 0 !== window.$docsify && void 0 !== window.$docsify.glossify) {
				var e = window.$docsify.glossify;
				return (
					(t = e),
					new a()
						.withTermHeading(null !== (n = t.terminologyHeading) && void 0 !== n ? n : c)
						.withGlossaryLocation(null !== (i = t.glossaryLocation) && void 0 !== i ? i : s)
						.withDebugEnabled(null !== (o = t.debug) && void 0 !== o && o)
						.withTitleTermReplacement(null === (r = t.replaceTitleTerms) || void 0 === r || r)
						.build()
				);
			}
			return new a().build();
			var t, n, i, o, r;
		}
		function f(e, t) {
			var n = u();
			n.debug && console.log('Using config options: '.concat(n.glossaryLocation, ', ').concat(n.terminologyHeading)),
				e.beforeEach(function (e, t) {
					window.location.hash.match(/_glossary/g)
						? t(e)
						: (window.$docsify.terms ||
								fetch(n.glossaryLocation).then(function (i) {
									i.text().then(function (i) {
										(window.$docsify.terms = (function (e, t) {
											var n = e.split('\n'),
												i = {};
											return (
												n.forEach(function (e) {
													if (e.trimStart().startsWith(t.terminologyHeading)) {
														var n = e.replace(t.terminologyHeading, '').trim();
														t.debug && console.log('detected glossary term: '.concat(n)), (i[n] = n.toLowerCase().replace(' ', '-'));
													}
												}),
												i
											);
										})(i, n)),
											l(e, n, t);
									});
								}),
						  l(e, n, t));
				});
		}
		return (
			window.$docsify || (window.$docsify = {}),
			(window.$docsify.plugins = (window.$docsify.plugins || []).concat(f)),
			(e.install = f),
			Object.defineProperty(e, '__esModule', { value: !0 }),
			e
		);
	})({}));
