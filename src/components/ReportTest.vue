<template>
  <div id="report-content">
    <link rel="stylesheet" type="text/css" href="../../static/print.css"/>
    <div class="btn-content">
      <button @click="print1">点击打印第1页</button>
    </div>
    <div class="print-content-basic" id="content-1">
      <div class="all-content">
        <div class="logo-content">
          <img class="left" src="../../static/img/report-1.png" alt="中科检验">
          <img class="right" src="../../static/img/report-2.png" alt="希望组">
        </div>
        <div class="detail-content">
          <div class="title">基因分析报告</div>
          <div class="basic-info">
            <div class="basic-info-row">
              <div>姓名：郑韵清</div>
              <div>性别：女</div>
              <div>出生年月：2001年6月16号</div>
            </div>
            <div class="basic-info-row">
              <div>样本编号：M173A4354</div>
              <div>民族：汉</div>
              <div>样品类型：外周血</div>
            </div>
            <div class="basic-info-row">
              <div>检测项目：周围神经病</div>
              <div>检测方法：靶向捕获-高通量测序</div>
              <div>送检医院：武汉协和医院</div>
            </div>
          </div>
          <div class="clinic">
            <span class="title">临床信息：</span>
            <span class="clinic-detail">
                    身体不适，身体不适身体不适身体不适身体不适，身体不适，身体不适身体不适身体不适身体不适，
                    身体不适，身体不适身体不适身体不适身体不适，身体不适，身体不适身体不适身体不适身体不适，
                    身体不适，身体不适身体不适身体不适身体不适，身体不适，身体不适身体不适身体不适身体不适，
                    身体不适，身体不适身体不适身体不适身体不适，身体不适，身体不适身体不适身体不适身体不适，
                </span>
          </div>
          <div class="result-info">
            <span class="title">检测结果：</span>
            <div class="result-info-detail">
              <table>
                <thead>
                <tr>
                  <th>序号</th>
                  <th>基因名</th>
                  <th>染色体位置</th>
                  <th>核苷酸改变</th>
                  <th>氨基酸改变</th>
                  <th>纯杂合</th>
                  <th>普通人群频率</th>
                  <th>来源</th>
                  <th>变异类型</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="result-remark">
            <div class="title">结果说明：</div>
            <div class="remark-detail">
              结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明，结果说明
              结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明，结果说明
              结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明，结果说明
              结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明结果说明，结果说明
            </div>
          </div>
        </div>
        <div class="footer-print1">
          <div class="notice">
            注：以上解读基于目前对单基因遗传病致病基因的研究。疾病简介、基因简介、一代验证及其他意义未明变异位点见附录。
            变异的解释及证据定级是参照美国医学遗传学与基因组学学会（<span>ACMG</span>）发布的最新版基因变异解读标准和指南；
            <span>Pathogenic</span>表示致病性变异，<span>Likely pathogenic</span>表示疑似致病性变异，
            <span>VUS</span>表示临床性意义未明变异，<span>Likely benign</span>表示疑
            似良性变异，<span>Benign</span>表示良性变异<sup>[1]</sup>.参考基因组为<span>hg19</span>，
            变异命名参照<span>HGVS</span>建议的规则给出
          </div>
          <div class="info">
            <div class="info-title">
              <div>分析人：ABC</div>
              <div>报告人：ABC</div>
              <div>审核人：ABC</div>
              <div>报告日期：2017.1.1</div>
            </div>
            <div class="info-content">
              <div class="left">
                <div>北京中科医学检验所</div>
                <div>电话：<span class="bold">400-110-1066</span></div>
                <div>邮箱：<span class="bold">report@metabolicare.com</span></div>
                <div>网址: <span class="bold">www.metabolicare.com</span></div>
                <div>地址：北京市中关村昌平科技园区超前路37号6号楼4层1001室</div>
              </div>
              <div class="right text-right">
                <div>北京希望组生物科技有限公司</div>
                <div>遗传咨询/查询电话：<span class="bold">400-027-1221</span></div>
                <div>邮箱：<span class="bold">suport@grandomics.com</span></div>
                <div>网址: <span class="bold">http://www.grandomics.com</span></div>
                <div>地址：北京市昌平区中关村生命科学院创新大厦D301</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="print-content-basic" id="content-3">
      <div class="all-content">
        <div class="logo-content">
          <img class="left" src="img-1.png" alt="中科检验">
          <img class="right" src="img-2.png" alt="希望组">
        </div>
        <div class="detail-basic">
          <div class="title">检测基因列表</div>
          <div class="content">
            <table class="table1">
              <thead style="background-color: red">
              <tr>
                <th colspan="8">派金森和运动障碍，巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉共计69个基因</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="footer">
          <div class="left">
            <div>北京中科医学检验所</div>
            <div>电话：<span class="bold">400-110-1066</span></div>
            <div>邮箱：<span class="bold">report@metabolicare.com</span></div>
            <div>网址: <a class="bold" href="www.metabolicare.com">www.metabolicare.com</a></div>
            <div>地址：北京市中关村昌平科技园区超前路37号6号楼4层1001室</div>
          </div>
          <div class="right text-right">
            <div>北京希望组生物科技有限公司</div>
            <div>遗传咨询/查询电话：<span class="bold">400-027-1221</span></div>
            <div>邮箱：<span class="bold">suport@grandomics.com</span></div>
            <div>网址: <a class="bold" href="http://www.grandomics.com">http://www.grandomics.com</a></div>
            <div>地址：北京市昌平区中关村生命科学院创新大厦D301</div>
          </div>
        </div>
      </div>
    </div>
    <div class="print-content-basic" id="content-4">
      <div class="all-content">
        <div class="logo-content">
          <img class="left" src="img-1.png" alt="中科检验">
          <img class="right" src="img-2.png" alt="希望组">
        </div>
        <div class="detail-basic">
          <div class="title">参考文献</div>
          <div class="content">
            <div class="reference">
              [1].adbcpikjgiji og4o
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="left">
            <div>北京中科医学检验所</div>
            <div>电话：<span class="bold">400-110-1066</span></div>
            <div>邮箱：<span class="bold">report@metabolicare.com</span></div>
            <div>网址: <a class="bold" href="www.metabolicare.com">www.metabolicare.com</a></div>
            <div>地址：北京市中关村昌平科技园区超前路37号6号楼4层1001室</div>
          </div>
          <div class="right text-right">
            <div>北京希望组生物科技有限公司</div>
            <div>遗传咨询/查询电话：<span class="bold">400-027-1221</span></div>
            <div>邮箱：<span class="bold">suport@grandomics.com</span></div>
            <div>网址: <a class="bold" href="http://www.grandomics.com">http://www.grandomics.com</a></div>
            <div>地址：北京市昌平区中关村生命科学院创新大厦D301</div>
          </div>
        </div>
      </div>
    </div>
    <div class="print-content-2" id="content-2">
      <div class="all-content">
        <div class="logo-content">
          <img class="left" src="img-1.png" alt="中科检验">
          <img class="right" src="img-2.png" alt="希望组">
        </div>
        <div class="detail">
          <div class="detail-title">
            <span class="big">其他变异信息</span>
            <span class="small">(临床表型较不相符或遗传模式不相符的变异信息)</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>序号</th>
              <th>基因名</th>
              <th>染色体位置</th>
              <th>核苷酸改变</th>
              <th>氨基酸改变</th>
              <th>纯杂合</th>
              <th>普通人群频率</th>
              <th>遗传方式</th>
              <th>疾病表型及OMIM编号</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            </tbody>
          </table>
          <div class="notice">
            (
            注：以上次要变异均未经一代测序验证，AD表示常染色体遗传，AR表示常染色体隐性遗传，DR表示双基因隐性遗传，
            DD表示双基因显性遗传，XLD表示X连锁显性遗传，XLR表示X连锁隐性遗传，IC表示散发病例
            )
          </div>
        </div>
        <div class="footer">
          <div class="left">
            <div>北京中科医学检验所</div>
            <div>电话：<span class="bold">400-110-1066</span></div>
            <div>邮箱：<span class="bold">report@metabolicare.com</span></div>
            <div>网址: <a class="bold" href="www.metabolicare.com">www.metabolicare.com</a></div>
            <div>地址：北京市中关村昌平科技园区超前路37号6号楼4层1001室</div>
          </div>
          <div class="right text-right">
            <div>北京希望组生物科技有限公司</div>
            <div>遗传咨询/查询电话：<span class="bold">400-027-1221</span></div>
            <div>邮箱：<span class="bold">suport@grandomics.com</span></div>
            <div>网址: <a class="bold" href="http://www.grandomics.com">http://www.grandomics.com</a></div>
            <div>地址：北京市昌平区中关村生命科学院创新大厦D301</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    created: function () {
      this.printPlugIn(); //插件相关
    },
    methods: {
      print1: function () {
        $("#content-1").jqprint({
          debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
          importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
          printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
          operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        });
      },
      printPlugIn: function () {
        /*兼容jquery版本*/
        jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0), function (e, t, n) {
          function r(n) {
            var r = t.console;
            i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute && (r.warn("JQMIGRATE: " + n), e.migrateTrace && r.trace && r.trace()))
          }

          function a(t, a, i, o) {
            if (Object.defineProperty)try {
              return Object.defineProperty(t, a, {
                configurable: !0, enumerable: !0, get: function () {
                  return r(o), i
                }, set: function (e) {
                  r(o), i = e
                }
              }), n
            } catch (s) {
            }
            e._definePropertyBroken = !0, t[a] = i
          }

          var i = {};
          e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function () {
            i = {}, e.migrateWarnings.length = 0
          }, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
          var o = e("<input/>", {size: 1}).attr("size") && e.attrFn, s = e.attr,
            u = e.attrHooks.value && e.attrHooks.value.get || function () {
                return null
              }, c = e.attrHooks.value && e.attrHooks.value.set || function () {
                return n
              }, l = /^(?:input|button)$/i, d = /^[238]$/,
            p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            f = /^(?:checked|selected)$/i;
          a(e, "attrFn", o || {}, "jQuery.attrFn is deprecated"), e.attr = function (t, a, i, u) {
            var c = a.toLowerCase(), g = t && t.nodeType;
            return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ? e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
              get: function (t, r) {
                var a, i = e.prop(t, r);
                return i === !0 || "boolean" != typeof i && (a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n
              }, set: function (t, n, r) {
                var a;
                return n === !1 ? e.removeAttr(t, r) : (a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r
              }
            }, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, i))
          }, e.attrHooks.value = {
            get: function (e, t) {
              var n = (e.nodeName || "").toLowerCase();
              return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
            }, set: function (e, t) {
              var a = (e.nodeName || "").toLowerCase();
              return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n)
            }
          };
          var g, h, v = e.fn.init, m = e.parseJSON, y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
          e.fn.init = function (t, n, a) {
            var i;
            return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] && r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments)
          }, e.fn.init.prototype = e.fn, e.parseJSON = function (e) {
            return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
          }, e.uaMatch = function (e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {browser: t[1] || "", version: t[2] || "0"}
          }, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function () {
            function t(e, n) {
              return new t.fn.init(e, n)
            }

            e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function (r, a) {
              return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n)
            }, t.fn.init.prototype = t.fn;
            var n = t(document);
            return r("jQuery.sub() is deprecated"), t
          }, e.ajaxSetup({converters: {"text json": e.parseJSON}});
          var b = e.fn.data;
          e.fn.data = function (t) {
            var a, i, o = this[0];
            return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i)
          };
          var j = /\/(java|ecma)script/i, w = e.fn.andSelf || e.fn.addBack;
          e.fn.andSelf = function () {
            return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
          }, e.clean || (e.clean = function (t, a, i, o) {
            a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
            var s, u, c, l, d = [];
            if (e.merge(d, e.buildFragment(t, a).childNodes), i)for (c = function (e) {
              return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n
            }, s = 0; null != (u = d[s]); s++)e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n && (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
            return d
          });
          var Q = e.event.add, x = e.event.remove, k = e.event.trigger, N = e.fn.toggle, T = e.fn.live, M = e.fn.die,
            S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", C = RegExp("\\b(?:" + S + ")\\b"),
            H = /(?:^|\s)hover(\.\S+|)\b/, A = function (t) {
              return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"))
            };
          e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function (e, t, n, a, i) {
            e !== document && C.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, i)
          }, e.event.remove = function (e, t, n, r, a) {
            x.call(this, e, A(t) || "", n, r, a)
          }, e.fn.error = function () {
            var e = Array.prototype.slice.call(arguments, 0);
            return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
          }, e.fn.toggle = function (t, n) {
            if (!e.isFunction(t) || !e.isFunction(n))return N.apply(this, arguments);
            r("jQuery.fn.toggle(handler, handler...) is deprecated");
            var a = arguments, i = t.guid || e.guid++, o = 0, s = function (n) {
              var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;
              return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1
            };
            for (s.guid = i; a.length > o;)a[o++].guid = i;
            return this.click(s)
          }, e.fn.live = function (t, n, a) {
            return r("jQuery.fn.live() is deprecated"), T ? T.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this)
          }, e.fn.die = function (t, n) {
            return r("jQuery.fn.die() is deprecated"), M ? M.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
          }, e.event.trigger = function (e, t, n, a) {
            return n || C.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a)
          }, e.each(S.split("|"), function (t, n) {
            e.event.special[n] = {
              setup: function () {
                var t = this;
                return t !== document && (e.event.add(document, n + "." + e.guid, function () {
                  e.event.trigger(n, null, t, !0)
                }), e._data(this, n, e.guid++)), !1
              }, teardown: function () {
                return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1
              }
            }
          })
        }(jQuery, window);
        /*插件代码*/
        (function ($) {
          var opt;
          $.fn.jqprint = function (options) {
            opt = $.extend({}, $.fn.jqprint.defaults, options);
            var $element = (this instanceof jQuery) ? this : $(this);
            if (opt.operaSupport && $.browser.opera) {
              var tab = window.open("", "jqPrint-preview");
              tab.document.open();
              var doc = tab.document;
            }
            else {
              var $iframe = $("<iframe  />");
              if (!opt.debug) {
                $iframe.css({position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px"});
              }
              $iframe.appendTo("body");
              var doc = $iframe[0].contentWindow.document;
            }
            if (opt.importCSS) {
              if ($("link[media=print]").length > 0) {
                $("link[media=print]").each(function () {
                  doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                });
              }
              else {
                $("link").each(function () {
                  doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                });
              }
//              let b = document.documentElement.innerHTML.match(/<(style)[^>]*>([\s\S]*?)(?=<\/\1>)/gi).join('').split(/<style[^>]*>/);
//              $.each(b, function (i, data) {
//                doc.write(`<style>${data}</style>`)
//              });
            }

            if (opt.printContainer) {
              doc.write($element.outer());
            }
            else {
              $element.each(function () {
                doc.write($(this).html());
              });
            }
            doc.close();

            (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
            setTimeout(function () {
              (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print();
              if (tab) {
                tab.close();
              }
            }, 1000);
          }
          $.fn.jqprint.defaults = {
            debug: false,
            importCSS: true,
            printContainer: true,
            operaSupport: true
          };

          // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
          jQuery.fn.outer = function () {
            return $($('<div></div>').html(this.clone())).html();
          }
        })(jQuery);
      }
    },
  }
</script>

<style scoped>
  .border {
    border: 1px solid #fff;
  }

  .small-title {
    color: black;
    font-size: 24px;
    font-weight: bold;
  }

  .small-font {
    line-height: 30px;
    color: #444;
    font-size: 18px;
  }

  .footer-line {
    line-height: 20px;
  }

  #report-content {
    padding-left: 56px;
    font-size: 20px;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }

  table td,
  table th {
    border: 1px solid black;
    padding: 6px 4px;
    text-align: center;
  }

  table thead {
    background-color: red;
    font-weight: inherit;
    color: #fff;
  }

  table thead tr,
  table thead th {
    background-color: red;
  }

  .bold {
    font-weight: bold;
    color: inherit;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .text-right {
    text-align: right;
  }

  .btn-content button {
    margin-left: 10px;
  }

  .footer {
    line-height: 30px;
    color: #444;
    font-size: 18px;
    line-height: 20px;
    padding-top: 10px;
    width: 1450px;
    position: absolute;
    bottom: 0;
    left: 50PX;
    border-top: 1px solid #333;
  }

  .print-content-basic {
    border: 1px solid #fff;
    padding: 0;
    width: 1073px;
    height: 1500px;
    /*1566*/
    margin: 0 auto;
    position: relative;
  }

  .print-content-basic .all-content {
    margin: 50px 50px 30px 50px;
    /*第三四页样式*/
    /*第一页样式*/
  }

  .print-content-basic .all-content .detail-basic {
    clear: both;
    padding-top: 40px;
  }

  .print-content-basic .all-content .detail-basic .title {
    color: black;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .print-content-basic .all-content .detail-basic .reference {
    line-height: 30px;
    color: #444;
    font-size: 18px;
  }

  .print-content-basic .all-content .footer {
    width: 973px;
    margin-bottom: 30px;
  }

  .print-content-basic .all-content .detail-content {
    clear: both;
    padding-top: 50px;
  }

  .print-content-basic .all-content .detail-content > .title {
    font-size: 31px;
    font-weight: bold;
    color: black;
    text-align: center;
  }

  .print-content-basic .all-content .detail-content .basic-info {
    margin-top: 30px;
    border-top: 4px solid #62b275;
    border-bottom: 4px solid #62b275;
  }

  .print-content-basic .all-content .detail-content .basic-info .basic-info-row {
    margin: 12px 0 18px 0;
  }

  .print-content-basic .all-content .detail-content .basic-info .basic-info-row div {
    display: inline-block;
    width: 315px;
    vertical-align: top;
  }

  .print-content-basic .all-content .detail-content .clinic {
    margin-top: 20px;
  }

  .print-content-basic .all-content .detail-content .clinic .title {
    color: black;
    font-size: 24px;
    font-weight: bold;
  }

  .print-content-basic .all-content .detail-content .clinic .clinic-detail {
    line-height: 35px;
  }

  .print-content-basic .all-content .detail-content .result-info {
    margin-top: 20px;
  }

  .print-content-basic .all-content .detail-content .result-info .title {
    color: black;
    font-size: 24px;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 10px;
  }

  .print-content-basic .all-content .detail-content .result-remark {
    margin-top: 20px;
  }

  .print-content-basic .all-content .detail-content .result-remark .title {
    color: black;
    font-size: 24px;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 10px;
  }

  .print-content-basic .all-content .detail-content .result-remark .remark-detail {
    text-indent: 40px;
    line-height: 35px;
  }

  .print-content-basic .all-content .footer-print1 {
    position: absolute;
    bottom: 0;
    padding-bottom: 30px;
    left: 0;
    margin: 0 50px;
  }

  .print-content-basic .all-content .footer-print1 .notice {
    line-height: 30px;
    color: #444;
    font-size: 18px;
  }

  .print-content-basic .all-content .footer-print1 .notice span {
    font-weight: bold;
  }

  .print-content-basic .all-content .footer-print1 .notice sup {
    display: inline-block;
    font-size: 13px;
  }

  .print-content-basic .all-content .footer-print1 .info {
    margin-top: 20px;
  }

  .print-content-basic .all-content .footer-print1 .info .info-title {
    text-align: center;
    border-bottom: 1px solid #333;
    padding-bottom: 5px;
  }

  .print-content-basic .all-content .footer-print1 .info .info-title div {
    display: inline-block;
    width: 220px;
  }

  .print-content-basic .all-content .footer-print1 .info .info-content {
    line-height: 30px;
    color: #444;
    font-size: 18px;
    margin-top: 5px;
    line-height: 20px;
  }

  .print-content-2 {
    padding: 0;
    width: 1550px;
    height: 1060px;
    margin: 0 auto;
    position: relative;
    border: 1px solid #fff;
  }

  .print-content-2 .footer {
    padding-bottom: 30px;
  }

  .print-content-2 .all-content {
    margin: 30px 50px 30px 50px;
  }

  .print-content-2 .all-content .detail {
    clear: both;
    padding-top: 25px;
  }

  .print-content-2 .all-content .detail .detail-title {
    margin-bottom: 10px;
  }

  .print-content-2 .all-content .detail .detail-title .big {
    color: black;
    font-size: 24px;
    font-weight: bold;
  }

  .print-content-2 .all-content .detail .detail-title .small {
    margin-left: 10px;
  }

  .print-content-2 .all-content .detail .notice {
    line-height: 30px;
    color: #444;
    font-size: 18px;
    margin-top: 20px;
  }

</style>
