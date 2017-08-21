<template>
  <div id="report-content">
    <loading v-if="loading"></loading>
    <!--<link rel="stylesheet" type="text/css" href="../../static/print.css"/>-->
    <div class="row">
      <div class="col-md-8 col-md-offset-2 report">
        <div class="title-content">
          <button class="btn btn-color-r pull-left refresh-btn" @click="refresh1">重新生成报告</button>
          <div class="logo-content">
            <div class="logo-left">
              <img src="../../static/img/report-1.png" alt="">
              <span>北京中科医学检验所</span>
            </div>
            <div class="logo-right">
              <img src="../../static/img/report-2.png" alt="">
              <span>中国首家第三代测序精准医疗公司</span>
            </div>
          </div>
        </div>
        <div class="office-content">
          <div class="office-one">
            <div>北京中科医学检验实验室</div>
            <div class="office-one-content">
              <span>电话：400-110-1066</span>
              <span>邮箱：report@metabolicare.co</span>
              <span>网址：www.metabolicare.com</span>
              <span>地址：北京中关村昌平科技园区超前路37号6号楼4层1001室</span>
            </div>
          </div>
          <div class="office-one">
            <div>北京希望组生物科技有限公司</div>
            <div class="office-one-content">
              <span>遗传咨询/查询电话：400-651-6230</span>
              <span>邮箱：support@grandomics.com</span>
              <span>网址：http://www.grandomics.com</span>
              <span>地址：北京市昌平区中关村生命科学园创新大厦D301</span>
            </div>
          </div>
        </div>
        <div class="sample-content">
          <img class="first-img" src="../../static/img/report-3.png" alt="">
          <div class="sample-title">
            <span class="big">基因分析报告</span>
            <span class="small">GENE ANALYSIS REPORT</span>
          </div>
          <div class="basic-content">
            <div class="one">
              <span>姓名：{{sampleData.name}}</span>
              <span>性别：{{sampleData.gender}}</span>
              <span>民族：{{sampleData.nation}}</span>
              <span>出生年月：{{sampleData.birthday}}</span>
              <span>样本编号：{{sampleData.sn}}</span>
            </div>
            <div class="two">
              <span>样品类型：- </span>
              <span>检测项目：{{sampleData.item}}</span>
              <span>检测方法：{{sampleData ? '靶向捕获-高通量测序' : ''}}</span>
              <span>送检医院：{{sampleData.unit_name}}</span>
            </div>
            <img src="../../static/img/report-4.png" class="bottom-img" alt="">
          </div>
          <div class="first-page">
            <div class="one">
              <div class="title">临床信息</div>
              <div class="content">{{sampleData.remark}}</div>
            </div>
            <div class="one">
              <div class="title">检测结果</div>
              <div class="content">
                <span class="no-data" v-if="allData.majors && allData.majors.length == 0">未检测到与患者临床表型相关的具有可能临床意义的变异（包括SNV和Indel）</span>
                <table class="table" id="main-result" v-if="allData.majors && allData.majors.length !=0">
                  <thead>
                  <tr>
                    <th>序号</th>
                    <th>基因名</th>
                    <th>转录本</th>
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
                  <tr v-for="(list,index) in allData.majors">
                    <td>{{index + 1}}</td>
                    <td>{{list.gene.symbol}}</td>
                    <td>{{list.transcript}}</td>
                    <td>{{list.position}}</td>
                    <td>{{list.change.na ? list.change.na : '-'}}</td>
                    <td>{{list.change.aa ? list.change.aa : '-'}}</td>
                    <td>{{list.homhet}}</td>
                    <td>{{list.freq}}</td>
                    <td>-</td>
                    <td>{{list.intervar.value === 'Uncertain significance' ? 'VUS' : list.intervar.value}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="one">
              <div class="title">结果说明</div>
              <div class="content">
                <span v-for="(major,index) in allData.majorsVue"> <!--不同基因-->
                {{major.gene.symbol}}基因是<span v-if="major.diseases.length === 1" v-for="(disease,index) in major.diseases"><span
                    v-for="(list,index) in disease.inheritance">{{list | getName}}<span
                    v-if="disease.inheritance.length!==1 &&index!==disease.inheritance.length">、</span></span>
                    <!--{{disease.inheritance|getName.join(',')}}-->的{{disease.title.chinese}}(OMIM：# {{disease.mimNumber}};{{disease.title.english}})</span><span
                    v-if="major.diseases.length === 2" v-for="(disease,index) in major.diseases">{{disease.inheritance.join(
                    ',')}}的{{disease.title.chinese}}(OMIM：# {{disease.mimNumber}};{{disease.title.english}}) <span v-if="index === 0">和</span></span>
                <span v-if="major.diseases.length > 2" v-for="(disease,index) in major.diseases">{{disease.inheritance.join(
                  ',')}}的{{disease.title.chinese}}(OMIM：# {{disease.mimNumber}};{{disease.title.english}}) <span
                  v-if="index != major.diseases.length-1"> , </span></span><span v-if="index !== allData.majorsVue.length-1">。</span>
              </span>。在本次检测中，我们检测到受检者{{funStr}}。
                对于常染色体隐性遗传的疾病来说，单个致病性变异的携带者并不会发展为患者，只有纯合致病性变异和复合杂合型致病性变异（反式）才会导致疾病的发生。若父母均为携带者，每次剩余的子女均有25%的可能为患者。
                <span class="bold">疾病的最终确诊还需结合进一步的临床检查和家系调查。</span>
                <div class="notice">
                  注：以上解读基于目前对单基因遗传病致病基因的研究。疾病简介、基因简介、一代验证及其他意义未明变异位点见附录。
                  变异的解释及证据定级是参照美国医学遗传学与基因组学学会（<span>ACMG</span>）发布的最新版基因变异解读标准和指南；
                  <span>Pathogenic</span>表示致病性变异，<span>Likely pathogenic</span>表示疑似致病性变异，
                  <span>VUS</span>表示临床性意义未明变异，<span>Likely benign</span>表示疑
                  似良性变异，<span>Benign</span>表示良性变异<sup>[1]</sup>.参考基因组为<span>hg19</span>，
                  变异命名参照<span>HGVS</span>建议的规则给出
                </div>
              </div>
            </div>
          </div>
          <div class="appendix-page"> <!--附录-->
            <div class="title">附录</div>
            <div class="one">
              <div class="title">1.疾病简介</div>
              <div class="content">
                <div class="appendix-content">
                  <div v-for="(majorD,index) in majorDiseases" class="diseases-content">
                    <div class="diseases-content-title">{{index + 1}}) {{majorD.title.chinese ? majorD.title.chinese : majorD.title.english}}</div>
                    <div class="diseases-content-remark" v-show="majorD.hpoLength !==0">
                      疾病概述：<span v-for="(list,index) in majorD.inheritance">{{list | getName}}<span
                      v-if="majorD.inheritance.length!==1 &&index!==majorD.inheritance.length">、</span></span><!--{{majorD.inheritance.join(',')}}-->
                      ，典型的临床症状包括<span v-for="(hpo,index) in majorD.hpos">{{hpo.titles.chinese ? hpo.titles.chinese : hpo.titles.english}}<span
                      v-if="index!=majorD.hpos.length-1">、</span></span>。
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="one">
              <div class="title">2.变异详情</div>
              <div class="content">
                <div class="appendix-content">
                  <div class="diseases-content" v-for="(major,index) in allData.majors">
                    <div class="variation-title">{{index + 1}}) <span
                      class="variation-title-content">{{major.gene.symbol}}基因的{{major.position}}({{major.change.aa}})变异</span></div>
                    <div class="variation-content">
                      该变异在EXAC普通人数据库东亚人群中的频率为{{major.freq}}({{major.intervar.rank.join(',')}}),该变异未见文献报道。基于以上证据，我们建议判定该变异为{{major.intervar.value ===
                    'Uncertain significance' ? 'VUS' : major.intervar.value}}变异。
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="one">
              <div class="title">3.一代验证结果</div>
              <div class="content">
              </div>
            </div>
            <div class="one">
              <div class="title">4.其他变异信息</div>
              <div class="content">
                <table class="table">
                  <thead>
                  <tr>
                  <tr>
                    <th>序号</th>
                    <th>基因名</th>
                    <th>转录本</th>
                    <th>染色体位置</th>
                    <th>核苷酸改变</th>
                    <th>氨基酸改变</th>
                    <th>纯/杂合</th>
                    <th>普通人群频率</th>
                    <th>遗传方式</th>
                    <th>疾病表型及OMIM编号</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(list,index) in allData.minors">
                    <td>{{index + 1}}</td>
                    <td>{{list.gene.symbol}}</td>
                    <td>{{list.transcript}}</td>
                    <td>{{list.position}}</td>
                    <td>{{list.change.na ? list.change.na : '-'}}</td>
                    <td>{{list.change.aa ? list.change.aa : '-'}}</td>
                    <td>{{list.homhet}}</td>
                    <td>{{list.freq}}</td>
                    <td>
                      <div v-for="a in list.diseases">
                        <span v-if="a.inheritance.length !== 0">{{a.inheritance.join(',')}}</span>
                        <span v-else="">-</span>
                      </div>
                    </td>
                    <td>
                      <div v-for="a in list.diseases">
                        <span>{{a.title.chinese?a.title.chinese:a.title.english}}({{a.mimNumber}})</span>
                      </div>
                    </td>
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
            </div>
            <div class="one">
              <div class="title">5.检测基因列表<span>(临床表型较不相符或遗传模式不相符的变异信息)</span></div>
              <div class="content">
                <table class="table">
                  <thead>
                  <tr>
                    <th colspan="8">相关疾病panel，共<span v-if="allData.genes">{{allData.genes.length}}</span>个基因</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="list in geneArr">
                    <td v-for="listS in list">{{listS}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        id: this.$route.query.code,
        app: this.$route.query.app,
        allData: '',
        geneArr: [],
        minorDiseases: [],
        loading: false,
        token: '',
        funStr: '',
        majorDiseases: [],
        sampleData: '',

        header: `
          <img class="left" src="../../static/img/report-1.png" alt="中科检验">
          <img class="right" src="../../static/img/report-2.png" alt="希望组">
        `,
        footerStr: `
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
          <div>地址：北京市昌平区中关村生命科学院创新大厦D301</div>`
      }
    },
    created: function () {
      if (!this.id) {
        alert('页面错误');
        this.$router.push('/')
      }
      this.getData();
      this.sampleInfo();
      this.printPlugIn(); //插件相关
    },
    methods: {
      sampleInfo: function () {
        const _vue = this;
        _vue.loading = true;
        _vue.$axios({
          url: 'report/reportsnv/patient/?datafile=' + _vue.id
        }).then(function (resp) {
          if (resp.data.status === 'error') {
          } else {
            if (resp.data.data.birthday) {
              let arr = resp.data.data.birthday.split('-');
              resp.data.data.birthday = arr[0] + '年' + arr[1] + '月' + arr[2] + '号';
            }
            _vue.sampleData = resp.data.data;
          }
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      refresh1: function () {
        const _vue = this;
        _vue.loading = true;
        _vue.$axios({
          url: 'report/reportsnv/refresh/?datafile=' + _vue.id + '&app=' + _vue.app
        }).then(function (respRe) {
          _vue.allData = respRe.data;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      getData: function () {
        const _vue = this;
        _vue.loading = true;
        this.$axios({
          url: 'report/reportsnv/?datafile=' + this.id + '&app=' + this.app,
        }).then(function (resp) {
          if (resp.data.results.length === 0) {
            _vue.$axios({
              url: 'report/reportsnv/refresh/?datafile=' + _vue.id + '&app=' + _vue.app
            }).then(function (respRe) {
              _vue.allData = respRe.data;
              _vue.loading = false;
            }).catch(function (error) {
              _vue.catchFun(error);
            });
          } else {
            _vue.allData = resp.data.results[0];
            _vue.loading = false;
          }
        })
      },

      print1: function () {
        $("#content-1").jqprint({
          debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
          importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
          printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
          operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        });
      },
      print2: function () {
        $("#content-2").jqprint({
          debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
          importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
          printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
          operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        });
      },
      print3: function () {
        $("#content-3").jqprint({
          debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
          importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
          printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
          operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        });
      },
      print4: function () {
        $("#content-4").jqprint({
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
            i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute &&
            (r.warn("JQMIGRATE: " + n), e.migrateTrace && r.trace && r.trace()))
          }

          function a(t, a, i, o) {
            if (Object.defineProperty) try {
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
          e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"), e.migrateTrace ===
          n && (e.migrateTrace = !0), e.migrateReset = function () {
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
            return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ?
              e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode &&
              r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
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
              return "button" === n ? u.apply(this, arguments) :
                ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
            }, set: function (e, t) {
              var a = (e.nodeName || "").toLowerCase();
              return "button" === a ? c.apply(this, arguments) :
                ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n)
            }
          };
          var g, h, v = e.fn.init, m = e.parseJSON, y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
          e.fn.init = function (t, n, a) {
            var i;
            return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] &&
            ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] &&
            r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) &&
            (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context &&
            (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments)
          }, e.fn.init.prototype = e.fn, e.parseJSON = function (e) {
            return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
          }, e.uaMatch = function (e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) ||
              /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {browser: t[1] || "", version: t[2] || "0"}
          }, e.browser ||
          (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 :
            h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function () {
            function t(e, n) {
              return new t.fn.init(e, n)
            }

            e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init =
              function (r, a) {
                return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n)
              }, t.fn.init.prototype = t.fn;
            var n = t(document);
            return r("jQuery.sub() is deprecated"), t
          }, e.ajaxSetup({converters: {"text json": e.parseJSON}});
          var b = e.fn.data;
          e.fn.data = function (t) {
            var a, i, o = this[0];
            return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ?
              b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i)
          };
          var j = /\/(java|ecma)script/i, w = e.fn.andSelf || e.fn.addBack;
          e.fn.andSelf = function () {
            return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
          }, e.clean || (e.clean = function (t, a, i, o) {
            a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
            var s, u, c, l, d = [];
            if (e.merge(d, e.buildFragment(t, a).childNodes), i) for (c = function (e) {
              return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n
            }, s = 0; null != (u = d[s]); s++) e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n &&
            (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
            return d
          });
          var Q = e.event.add, x = e.event.remove, k = e.event.trigger, N = e.fn.toggle, T = e.fn.live, M = e.fn.die,
            S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", C = RegExp("\\b(?:" + S + ")\\b"),
            H = /(?:^|\s)hover(\.\S+|)\b/, A = function (t) {
              return "string" != typeof t || e.event.special.hover ? t :
                (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"))
            };
          e.event.props && "attrChange" !== e.event.props[0] &&
          e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch &&
          a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function (e, t, n, a, i) {
            e !== document && C.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, i)
          }, e.event.remove = function (e, t, n, r, a) {
            x.call(this, e, A(t) || "", n, r, a)
          }, e.fn.error = function () {
            var e = Array.prototype.slice.call(arguments, 0);
            return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) :
              (this.triggerHandler.apply(this, e), this)
          }, e.fn.toggle = function (t, n) {
            if (!e.isFunction(t) || !e.isFunction(n)) return N.apply(this, arguments);
            r("jQuery.fn.toggle(handler, handler...) is deprecated");
            var a = arguments, i = t.guid || e.guid++, o = 0, s = function (n) {
              var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;
              return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1
            };
            for (s.guid = i; a.length > o;) a[o++].guid = i;
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
    watch: {
      allData: function () {
        /*将数组里面的值8个8个输出*/
        if (!this.allData) {
          return
        }
        const _vue = this;
        const genes = this.allData.genes;
        var arrCount = Math.ceil(genes.length / 8);
        var pushArr = [];
        while (arrCount) {
          pushArr.push([]);
          arrCount -= 1
        }
        $.each(genes, function (i, data) {
          i += 1;
          $.each(pushArr, function (k1, k2) {
            if (Math.ceil(i / 8) === k1 + 1) {
              k2.push(data)
            }
          })
        });
        $.each(pushArr, function (i, data) {
          if (data.length !== 8) {
            data.length = 8
          }
        });
        this.geneArr = pushArr;

        //结果说明
        this.allData.majorsVue = [];
        let majors = this.allData.majors;
        let geneStr = '';
        let funcStr = '';
        let funcObj = {};
        $.each(majors, function (i, data) {

          //分类出不同的基因名
          if (geneStr.includes(data.gene.symbol)) {
          } else {
            geneStr += data.gene.symbol;
            _vue.allData.majorsVue.push(data)
          }

          //剪切变异位点统计
          if (funcStr.includes(data.func)) {
            funcObj[data.func] += 1;
          } else {
            funcStr += data.func;
            funcObj[data.func] = 1;
          }

        });

        //剪切变异位点变成文字
        let funArr = [];
        $.each(funcObj, function (n, value) {
          funArr.push(value + '个' + n + '变异位点')
        });
        const funArrCount = funArr.length;
        if (funArrCount === 1) {
          _vue.funStr = funArr[0];
        } else if (funArrCount === 2) {
          _vue.funStr += funArr[0] + '和' + funArr[1]
        } else {
          $.each(funArr, function (k1, k2) {
            if (k1 !== funArrCount - 1) {
              _vue.funStr += k2 + ','
            } else {
              _vue.funStr += k2
            }
          })
        }

        //提取疾病信息
        let majorDiseases = [];
        _vue.majorDiseases = [];
        $.each(_vue.allData.majorsVue, function (k3, k4) {
          majorDiseases = majorDiseases.concat(k4.diseases);
        });

        $.each(majorDiseases, function (k5, k6) {
          k6.hpos = [];
          k6.hpoLength = 0;
          _vue.$axios({
            url: _vue.dbUrl + 'knowledge/omim/' + k6.mimNumber + "/",
            method: 'get'
          }).then(function (respRe) {
            k6.hpos = respRe.data.hpos;
            k6.hpoLength = respRe.data.hpos.length;
            _vue.majorDiseases.push(k6);
            console.log(_vue.majorDiseases)
          }).catch(function (error) {
            _vue.catchFun(error);
          });
        });

      }
    },
    filters: {
      getName: function (type) {
        switch (type) {
          case 'AR':
            return '常染色体隐性遗传';
            break;
          case 'AD':
            return '常染色体显性遗传';
            break;
          case 'XLR':
            return 'X连锁隐性遗传';
            break;
          case 'XLD':
            return 'X连锁显性遗传';
            break;
          case '':
            return '未知遗传';
            break;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @gray: rgb(125, 125, 125);
  @green: rgb(112, 178, 79);
  @lineH: 23px;
  @title: rgb(83, 83, 83);
  #report-content {
    color: @gray;
    >.row{
      margin: 0;
      padding-left: 50px;
    }
    table {
      text-align: center;
      thead {
        /*background:linear-gradient(to right,rgb(35,129,27),rgb(143,185,84));*/
        background: url('../../static/img/report-4.png');
        background-size: 100% 100%;
        color: #fff;
        th {
          border-right: 1px solid #fff;
          text-align: center;
        }
      }
      tbody {
        td {
          background-color: rgb(239, 239, 239);
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
        }
      }
    }
    .report {
      min-height: 200px;
      margin-top: 50px;
      padding-left: 0;
      padding-right: 0;
    }
    .refresh-btn {
      margin: 10px;
    }
    .logo-content {
      text-align: right;
      .logo-left {
        display: inline-block;
        padding-right: 15px;
        border-right: 1px solid gray;
        text-align: left;
        img {
          width: 160px;
        }
      }
      .logo-right {
        display: inline-block;
        padding-left: 15px;
        text-align: left;
        img {
          width: 165px;
        }
      }
      span {
        display: block;
        font-size: 12px;
        transform: scale(0.9); /*2D缩放*/
        color: gray;
        margin-left: -7px;
        margin-top: 5px;
      }
    }
    .office-content {
      margin: 50px 0 60px 0;
      font-size: 12px;
      .office-one:last-child {
        margin-top: 15px;
      }
      .office-one {
        .office-one-content {
          margin-left: -15px;
        }
        > div {
          margin-top: 2px;
          span:not(:last-child) {
            border-right: 1px solid rgb(84, 84, 84);
          }
          span {
            display: inline-block;
            padding-right: 13px;
            padding-left: 13px;
          }
        }
      }
    }
    .sample-content {
      .first-img {
        width: 100%;
      }
      .sample-title {
        margin: 30px 0 80px 0;
        .big {
          font-size: 48px;
          color: @green;
        }
        .small {
          display: block;
          font-size: 18px;
          font-family: "SIL";
          color: rgb(137, 137, 137);
          padding-left: 73px;
        }
      }
      .basic-content {
        .one {
          > span {
            display: inline-block;
            width: 17%;
          }
          margin-bottom: 20px;
        }
        .two {
          > span {
            display: inline-block;
            width: 23%;
          }
          margin-bottom: 22px;
        }
        .bottom-img {
          width: 100%;
        }
      }
      .first-page {
        padding-top: 60px;
        .one {
          margin-bottom: 30px;
          .title {
            font-size: 16px;
            color: @green;
            margin-bottom: 5px;
          }
          .content {
            line-height: @lineH;
            .notice {
              margin-top: 40px;
              font-size: 12px;
              color: @gray
            }
          }
        }
      }
      .appendix-page {
        margin-top: 80px;
        >.title {
          font-size: 18px;
          color: @title;
          text-align: center;
        }
        .one {
          margin-bottom: 30px;
          .title {
            font-size: 16px;
            color: @title;
            margin-bottom: 5px;
            >span{
              font-size: 12px;
              color: @gray;
            }
          }
          .content {
            line-height: @lineH;
            .diseases-content{
              margin-top: 10px;
            }
            .notice {
              margin-top: 40px;
              font-size: 12px;
              color: @gray
            }
          }
        }
      }
    }
  }
</style>
