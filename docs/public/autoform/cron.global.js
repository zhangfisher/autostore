if(typeof window.AutoFormCore==='undefined'){throw new Error('[autoform] AutoFormCore 未初始化：请先加载 core.global.js，再加载 widget 产物（见 ADR-0005 IIFE 双 script 用法）');}
var __core = window.AutoFormCore;
var __af_ns0 = __core.lit;
var __af_ns1 = __core.litDecorators;
var __af_ns2 = __core.litDirectivesClassMap;
var __af_ns3 = __core.litDirectivesIfDefined;
var __af_ns4 = __core.litDirectivesRepeat;
var __af_ns5 = __core.litDirectivesStyleMap;
var __af_ns6 = __core.litDirectivesUnsafeHTML;
var __af_ns7 = __core.litDirectivesWhen;
var __af_ns8 = __core.litContext;
var __af_ns9 = __core.AutoField;
var __af_ns10 = __core.AutoDropdownField;
var __af_ns11 = __core.tag;
var __af_ns12 = __core.AsyncOptionState;
var __af_ns13 = __core.Controllers;
var __af_ns14 = __core.renderWidget;
var __af_ns15 = __core.getInputValue;
var __af_ns16 = __core.vars;
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Cron=(()=>{var re=Object.create;var E=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var ie=Object.getOwnPropertyNames;var ae=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var g=(a=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(a,{get:(i,e)=>(typeof require<"u"?require:i)[e]}):a)(function(a){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+a+'" is not supported')});var y=(a,i)=>()=>(i||a((i={exports:{}}).exports,i),i.exports),le=(a,i)=>{for(var e in i)E(a,e,{get:i[e],enumerable:!0})},R=(a,i,e,t)=>{if(i&&typeof i=="object"||typeof i=="function")for(let n of ie(i))!oe.call(a,n)&&n!==e&&E(a,n,{get:()=>i[n],enumerable:!(t=V(i,n))||t.enumerable});return a};var _=(a,i,e)=>(e=a!=null?re(ae(a)):{},R(i||!a||!a.__esModule?E(e,"default",{value:a,enumerable:!0}):e,a)),ce=a=>R(E({},"__esModule",{value:!0}),a),I=(a,i,e,t)=>{for(var n=t>1?void 0:t?V(i,e):i,s=a.length-1,r;s>=0;s--)(r=a[s])&&(n=(t?r(i,e,n):r(n))||n);return t&&n&&E(i,e,n),n};var H=y((he,D)=>{D.exports=__af_ns1});var O=y((ge,L)=>{L.exports=__af_ns0});var Y=y((ve,A)=>{A.exports=__af_ns4});var W=y((fe,j)=>{j.exports=__af_ns7});var U=y((be,J)=>{J.exports=__af_ns9});var G=y((xe,B)=>{B.exports=__af_ns10});var q=y((ke,X)=>{X.exports=__af_ns11});var ue={};le(ue,{AutoFieldCron:()=>C,describeCron:()=>N,parseCron:()=>b,serializeCron:()=>ne});var Z=_(H(),1),p=_(O(),1),F=_(Y(),1),w=_(W(),1),K=_(U(),1),P=_(G(),1),ee=_(q(),1),ye=g("@shoelace-style/shoelace/dist/components/tab-group/tab-group.js"),_e=g("@shoelace-style/shoelace/dist/components/tab/tab.js"),we=g("@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js"),Ce=g("@shoelace-style/shoelace/dist/components/radio-group/radio-group.js"),$e=g("@shoelace-style/shoelace/dist/components/radio/radio.js"),Fe=g("@shoelace-style/shoelace/dist/components/button/button.js"),Ee=g("@shoelace-style/shoelace/dist/components/input/input.js"),Se=g("@shoelace-style/shoelace/dist/components/select/select.js"),ze=g("@shoelace-style/shoelace/dist/components/option/option.js");var x={second:{min:0,max:59},minute:{min:0,max:59},hour:{min:0,max:23},day:{min:1,max:31},month:{min:1,max:12},week:{min:1,max:7},year:{min:1970,max:9999}},z=["second","minute","hour","day","month","week","year"],Q=["year","month","week","day","hour","minute","second"];function pe(a,i){let e=x[i];if(a==="*")return{pattern:"any"};let t=a.match(/^(\*|\d+)\/(\d+)$/);if(t){let n=t[1]==="*"?e.min:i==="week"&&Number(t[1])===0?7:Number(t[1]),s=Number(t[2]);return n<e.min||n>e.max||s<1||s>e.max?{pattern:"any",advanced:a}:{pattern:"interval",start:n,step:s}}if(/^\d+(-\d+)?(,\d+(-\d+)?)*$/.test(a)){let n=[];for(let s of a.split(",")){let r=s.match(/^(\d+)-(\d+)$/);if(r){let o=Number(r[1]),c=i==="week"&&Number(r[2])===7?7:Number(r[2]);if(o<e.min||c>e.max||o>c)return{pattern:"any",advanced:a};for(let l=o;l<=c;l++)n.includes(l)||n.push(l)}else{let o=i==="week"&&Number(s)===0?7:Number(s);if(o<e.min||o>e.max)return{pattern:"any",advanced:a};n.includes(o)||n.push(o)}}return n.sort((s,r)=>s-r),{pattern:"pick",picks:n}}return{pattern:"any",advanced:a}}function b(a,i=!1){let e={valid:!1,raw:a};if(typeof a!="string"||a.trim()==="")return e;let t=a.trim().split(/\s+/),n=i?7:6;if(t.length!==n)return e;let s=i?z:z.filter(r=>r!=="second");for(let r=0;r<s.length;r++)e[s[r]]=pe(t[r],s[r]);return e.valid=!0,e}function te(a){let i=a.slice().sort((s,r)=>s-r);if(i.length===0)return"";let e=[],t=i[0],n=i[0];for(let s=1;s<=i.length;s++){let r=i[s];r!==n+1&&(e.push(t===n?`${t}`:`${t}-${n}`),t=r),n=r}return e.join(",")}function de(a,i){if(!i||i.pattern==="any")return i?.advanced??"*";if(i.pattern==="interval"){let e=x[a],t=i.start??e.min;return t===e.min?`*/${i.step}`:`${t}/${i.step}`}return te(i.picks??[])||"*"}function ne(a,i=!1){return(i?z:z.filter(t=>t!=="second")).map(t=>de(t,a[t])).join(" ")}var M={year:"\u5E74",month:"\u6708",week:"\u5468",day:"\u65E5",hour:"\u5C0F\u65F6",minute:"\u5206\u949F",second:"\u79D2",patternAny:"\u4E0D\u9650",patternInterval:"\u95F4\u9694\u5468\u671F",patternPick:"\u6307\u5B9A",intervalEvery:"\u6BCF{interval}",intervalFrom:"\u4ECE{start}\u5F00\u59CB",intervalUnit:"",fromPrefix:"\u4ECE",fromSuffix:"\u5F00\u59CB",stepLabel:"\u6B65\u957F",intervalSuffix:"{field}\uFF08\u6B65\u957F\uFF09",intervalPreviewEvery:"\u6BCF{field} {values}",pickAll:"\u5168\u9009",pickInvert:"\u53CD\u9009",pickClear:"\u6E05\u7A7A",pickInputHint:"\u5982 1,1-2,33,22",weekNames:["\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D","\u5468\u65E5"],descSecond:"{value}\u79D2",descMinute:"{value}\u5206",descHour:"{value}\u70B9",descDay:"{value}\u65E5",descMonth:"{value}\u6708",descWeek:"\u5468{value}",descYear:"{value}\u5E74",descEveryField:"\u6BCF{value}",descJoin:"\u3001",descRange:"{from}-{to}",descEveryMinute:"\u6BCF\u5206\u949F",descEverySecond:"\u6BCF\u79D2",placeholder:"\u8BF7\u9009\u62E9\u6267\u884C\u5468\u671F",unparseable:"\u8868\u8FBE\u5F0F\u65E0\u6CD5\u89E3\u6790",advanced:"\u9AD8\u7EA7\u8BED\u6CD5\uFF08\u672A\u53EF\u89C6\u5316\uFF09\uFF1A{value}",resetToStart:"\u5F53\u524D\u503C\u65E0\u6CD5\u89E3\u6790\uFF0C\u7F16\u8F91\u5C06\u4ECE\u9ED8\u8BA4\u5F00\u59CB"};function N(a,i=!1,e){let t={...M,...e},n=typeof a=="string"?b(a,i):a;if(!n.valid)return typeof a=="string"?a:n.raw??"";let s=[],r=(l,v,f)=>{let u=n[l];if(!u||u.pattern==="any")return;let d=t[l];if(u.pattern==="interval"){let h=u.step??1,S=t.intervalUnit.params({field:d}),k=t.descEveryField.params({value:`${h>1?h:""}${d}${S}`}),$=u.start===void 0||u.start===x[l].min;s.push($?k:`${k}${t.intervalFrom.params({start:u.start})}`);return}if(u.pattern==="pick"&&u.picks?.length){if(f){s.push(u.picks.map(m=>f(m)).join(t.descJoin));return}let h=u.picks.slice().sort((m,se)=>m-se),S=[],k=h[0],$=h[0],T=m=>{S.push(m===k?t[v].params({value:k}):t.descRange.params({from:k,to:m})+t[v].params({value:""}))};for(let m=1;m<h.length;m++)h[m]!==$+1&&(T($),k=h[m]),$=h[m];T($),s.push(S.join(t.descJoin))}},o=n.second,c=o?.pattern==="pick"&&o.picks?.length===1&&o.picks[0]===0;return r("year","descYear"),r("month","descMonth"),r("week","descWeek",l=>t.weekNames[l-1]),r("day","descDay"),r("hour","descHour"),r("minute","descMinute"),i&&c||r("second","descSecond"),s.length===0?i?t.descEverySecond:t.descEveryMinute:s.join(t.descJoin)}var C=class extends P.AutoDropdownField{constructor(){super(...arguments);this._editing=null;this._pickTexts={};this._dragging=!1;this._dragSelect=!0}getInitialOptions(){let e=new Date;return{...super.getInitialOptions(),enableSeconds:!1,showYear:!1,yearRange:[e.getFullYear(),e.getFullYear()+10],stepOptions:{},defaultCron:void 0,placeholder:M.placeholder,panelMinWidth:620,i18n:{}}}get texts(){return{...M,...this.options.i18n}}connectedCallback(){if(super.connectedCallback(),this._isEmpty()&&this.options.defaultCron){let e=b(this.options.defaultCron,this.options.enableSeconds);e.valid&&this._commit(e)}}get _expr(){return this._editing?this._editing:b(this.value??"",this.options.enableSeconds)}_isEmpty(){return!this.value||typeof this.value=="string"&&this.value.trim()===""}getInputValue(){let e=this._expr;return!this.options.showYear&&e.valid&&(e.year={pattern:"any"}),ne(e,this.options.enableSeconds)}_commit(e){this._editing=e,this.onFieldChange()}_ensureEditing(){if(!this._editing){let e=b(this.value??"",this.options.enableSeconds);this._editing=e.valid?e:{valid:!0,...Q.reduce((t,n)=>({...t,[n]:{pattern:"any"}}),{})}}return this._editing}_setField(e,t){let n=this._ensureEditing();this._commit({...n,[e]:t})}renderSelection(){return this._isEmpty()?p.html``:b(this.value,this.options.enableSeconds).valid?p.html`<span class="trigger-expr">${this.value}</span>`:p.html`<span class="trigger-desc">${this.value}</span
                ><span class="trigger-warn" title="${this.texts.unparseable}">⚠</span>`}renderView(){if(this._isEmpty())return p.html``;let e=b(this.value,this.options.enableSeconds);return e.valid?p.html`<div>
                ${N(e,this.options.enableSeconds,this.options.i18n)}
            </div>
            <div class="trigger-expr">${this.value}</div>`:p.html`${this.value}`}renderDropdown(){let e=Q.filter(s=>(s!=="second"||this.options.enableSeconds)&&(s!=="year"||this.options.showYear)),t=this._ensureEditing(),n=!this._isEmpty()&&!b(this.value,this.options.enableSeconds).valid;return p.html`<div class="cron-panel" style="min-width:${this.options.panelMinWidth}px">
            ${(0,w.when)(n,()=>p.html`<div class="reset-banner">${this.texts.resetToStart}</div>`)}
            <div class="cron-desc">
                ${N(t,this.options.enableSeconds,this.options.i18n)}
            </div>
            <div class="cron-body">
                <sl-tab-group placement="start" class="cron-tabs cron-tab-group">
                    ${(0,F.repeat)(e,s=>`tab-${s}`,s=>p.html`<sl-tab slot="nav" panel="${s}">${this.texts[s]}</sl-tab>`)}
                    ${(0,F.repeat)(e,s=>`panel-${s}`,s=>p.html`<sl-tab-panel name="${s}"
                                ><div class="cron-editor">
                                    ${this._renderFieldEditor(s,t)}
                                </div></sl-tab-panel
                            >`)}
                </sl-tab-group>
            </div>
        </div>`}_renderFieldEditor(e,t){let n=t[e],s=n?.pattern??"any",r=x[e],o=e!=="year";return p.html`<div class="pattern-row">
                <sl-radio-group
                    size="small"
                    .value=${s}
                    @sl-change=${c=>{let l=c.target.value;delete this._pickTexts[e],l==="any"?this._setField(e,{pattern:"any"}):l==="interval"?this._setField(e,{pattern:"interval",start:r.min,step:this._steps(e)[0]}):this._setField(e,{pattern:"pick",picks:[r.min]})}}
                >
                    <sl-radio value="any">${this.texts.patternAny}</sl-radio>
                    ${(0,w.when)(o,()=>p.html`<sl-radio value="interval"
                                >${this.texts.patternInterval}</sl-radio
                            >`)}
                    ${(0,w.when)(s==="interval"&&o&&n,()=>p.html`<div class="interval-slot">
                                ${this._renderInterval(e,n)}
                            </div>`,()=>p.nothing)}
                    <sl-radio value="pick">${this.texts.patternPick}</sl-radio>
                </sl-radio-group>
            </div>
            ${(0,w.when)(n?.advanced,()=>p.html`<div class="advanced-tip">
                        ${this.texts.advanced.params({value:n.advanced})}
                    </div>`)}
            ${(0,w.when)(s==="pick"&&n,()=>this._renderPick(e,n),()=>p.nothing)}`}_steps(e){return this.options.stepOptions?.[e]??this._range(1,x[e].max)}_renderInterval(e,t){let n=x[e],s=this._steps(e),r=this._range(n.min,n.max),o=t.start??n.min,c=t.step??s[0],l=this.texts[e],v=this._expandInterval(e,t),f=e==="week"?"":l,u=v.map(d=>e==="week"?this.texts.weekNames[d-1]:String(d)).join(this.texts.descJoin);return p.html`<div class="interval-row">
                <span class="label">${this.texts.fromPrefix}</span>
                <sl-select
                    size="small"
                    hoist
                    .value=${String(o)}
                    @sl-change=${d=>{d.stopPropagation(),this._setField(e,{pattern:"interval",start:Number(d.target.value),step:t.step??s[0]})}}
                >
                    ${(0,F.repeat)(r,d=>p.html`<sl-option value="${d}">${d}</sl-option>`)}
                </sl-select>
                <span class="label">${this.texts.fromSuffix}，</span>
                <span class="label">${this.texts.intervalEvery.params({field:l})}</span>
                <sl-select
                    size="small"
                    hoist
                    .value=${String(c)}
                    @sl-change=${d=>{d.stopPropagation(),this._setField(e,{pattern:"interval",start:t.start??n.min,step:Number(d.target.value)})}}
                >
                    ${(0,F.repeat)(s,d=>p.html`<sl-option value="${d}">${d}</sl-option>`)}
                </sl-select>
                <span class="label">${this.texts.intervalSuffix.params({field:f})}</span>
            </div>
            <div class="interval-preview">
                ${this.texts.intervalPreviewEvery.params({field:l,values:u})}
            </div>`}_expandInterval(e,t){let[n,s]=this._pickBounds(e),r=t.start??n,o=t.step??1,c=[];for(let l=r;l<=s;l+=o)c.push(l);return c}_renderPickGrid(e,t){let[n,s]=this._pickBounds(e),r=s>24;return(0,F.repeat)(this._range(n,s),o=>o,o=>p.html`<sl-button
                    size="small"
                    class="${e==="week"?"week":r?"compact":""}"
                    variant="${t.includes(o)?"primary":"default"}"
                    pill
                    @mousedown=${c=>{c.preventDefault(),this._dragging=!0,this._dragSelect=!t.includes(o),this._togglePick(e,o,this._dragSelect)}}
                    @mouseenter=${()=>{this._dragging&&this._togglePick(e,o,this._dragSelect)}}
                    >${this._pickLabel(e,o)}</sl-button
                >`)}_renderPick(e,t){let[n,s]=this._pickBounds(e),r=t.picks??[],o=this._pickTexts[e]??te(r),c=s-n+1<=31;return p.html`<div class="pick-input-row">
                <sl-input
                    size="small"
                    .value=${o}
                    placeholder="${this.texts.pickInputHint}"
                    @sl-change=${l=>{l.stopPropagation(),this._parsePickInput(e,l.target.value)}}
                    @sl-input=${l=>{l.stopPropagation(),this._parsePickInput(e,l.target.value)}}
                ></sl-input>
            </div>
            ${(0,w.when)(c,()=>p.html`<div
                        class="pick-grid"
                        @mouseup=${()=>this._dragging=!1}
                        @mouseleave=${()=>this._dragging=!1}
                    >
                        ${this._renderPickGrid(e,r)}
                    </div>
                    <div class="pick-toolbar">
                        <sl-button
                            size="small"
                            @click=${()=>{delete this._pickTexts[e],this._setField(e,{pattern:"pick",picks:this._range(n,s)})}}
                            >${this.texts.pickAll}</sl-button
                        >
                        <sl-button
                            size="small"
                            @click=${()=>{delete this._pickTexts[e],this._pickInvert(e,n,s)}}
                            >${this.texts.pickInvert}</sl-button
                        >
                        <sl-button
                            size="small"
                            @click=${()=>{delete this._pickTexts[e],this._setField(e,{pattern:"any"})}}
                            >${this.texts.pickClear}</sl-button
                        >
                    </div>`)}`}_parsePickInput(e,t){let n=x[e],s=t.trim();if(this._pickTexts[e]=t,s===""){delete this._pickTexts[e],this._setField(e,{pattern:"any"});return}let r=new Set;for(let o of s.split(/[,，]/)){let c=o.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);if(!c)return;let l=e==="week"&&Number(c[1])===0?7:Number(c[1]);if(c[2]===void 0){if(l<n.min||l>n.max)return;r.add(l)}else{let v=e==="week"&&Number(c[2])===0?7:Number(c[2]);if(l<n.min||v>n.max||l>v)return;for(let f=l;f<=v;f++)r.add(f)}}this._setField(e,{pattern:"pick",picks:[...r].sort((o,c)=>o-c)})}_pickBounds(e){if(e==="year")return this.options.yearRange;let t=x[e];return[t.min,t.max]}_pickLabel(e,t){return e==="week"?this.texts.weekNames[t-1]:String(t)}_togglePick(e,t,n){delete this._pickTexts[e];let r=(this._ensureEditing()[e]??{pattern:"pick",picks:[]}).picks??[];if(n?r.includes(t)||(r=[...r,t]):r=r.filter(o=>o!==t),r.length===0){this._setField(e,{pattern:"any"});return}this._setField(e,{pattern:"pick",picks:r})}_pickInvert(e,t,n){let s=this._range(t,n),r=this._ensureEditing()[e]?.picks??[],o=s.filter(c=>!r.includes(c));if(o.length===0){this._setField(e,{pattern:"any"});return}this._setField(e,{pattern:"pick",picks:o})}_range(e,t){let n=[];for(let s=e;s<=t;s++)n.push(s);return n}};C.styles=[K.AutoField.styles,P.AutoDropdownField.styles,p.css`
            :host {
                display: block;
            }
            /* 面板高度自动：由内容（编辑区）决定，上限约束在可视区内 */
            .cron-panel {
                display: flex;
                flex-direction: column;
                max-height: min(380px, 80vh);
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
                box-sizing: border-box;
                overflow: hidden;
            }
            .cron-body {
                flex: 1 1 auto;
                min-height: 0;
                display: flex;
                overflow: hidden;
            }
            /* tab-group 充满 .cron-body（shoelace :host 默认 display:block，不参与拉伸） */
            .cron-tab-group {
                flex: 1 1 auto;
                min-width: 0;
                display: flex;
                flex-direction: column;
            }
            /* base=横向布局根：nav 列固定内容宽，body(panel) 占满剩余空间 */
            .cron-tab-group::part(base) {
                display: flex;
                flex-direction: row;
                align-items: stretch;
                min-height: 0;
                border-right: var(--auto-border);
            }
            /* nav 两侧默认 x-large 留白会撑宽 tab 列，收敛为小间距 */
            .cron-tab-group::part(nav) {
                flex: 0 0 auto;
                padding: 0 var(--sl-spacing-small);
            }
            /* tab 固定宽度：内容自适应 + 统一最小宽，不随容器拉伸 */
            .cron-tabs sl-tab {
                flex: 0 0 auto;
                min-width: 5em;
                font-size: var(--auto-font-size);
            }
            .cron-tabs sl-tab::part(base) {
                justify-content: center;
            }
            /* body 是 tab-panel 的直接父级，占满剩余宽度与高度 */
            .cron-tab-group::part(body) {
                flex: 1 1 auto;
                min-width: 0;
                min-height: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            /* 不能对 sl-tab-panel 设 display：shoelace 依赖 :host{display:none}/:host([active]){display:block}
               控制显隐，外部 display:flex 会覆盖 none 导致所有 panel 恒显、切换失效。
               高度 100% 只能借 host 自身选择器设 height（不触碰 display），
               flex 拉伸对 block host 无效；内部布局在 ::part(base) 上展开。 */
            .cron-body sl-tab-panel {
                height: 100%;
                min-height: 0;
            }
            .cron-body sl-tab-panel::part(base) {
                display: flex;
                flex-direction: column;
                height: 100%;
                min-height: 0;
                box-sizing: border-box;
            }
            .cron-tabs sl-tab {
                font-size: var(--auto-font-size);
            }
            /* 面板内容容器：gap + 自动换行；按钮网格自适应换行填满面板，不出滚动条 */
            .cron-editor {
                flex: 1 1 auto;
                width: 100%;
                box-sizing: border-box;
                padding: 0.8em;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: stretch;
                gap: 0.8em;
            }
            .pattern-row sl-radio-group {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5em;
            }
            /* 间隔配置从属于「间隔」radio：缩进对齐 radio 文案，与后续 radio 同列 */
            .interval-slot {
                padding-left: calc(var(--sl-toggle-size-small) + 0.5em);
            }
            .interval-row {
                display: flex;
                align-items: center;
                gap: 0.5em;
                flex-wrap: wrap;
                max-width: 100%;
                padding-top: 1em;
                padding-bottom: 0.2em;
            }
            .interval-row .label {
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
            }
            /* 间隔模式预览：灰色小字两行（配置句 + 命中值展开） */
            .interval-preview {
                display: flex;
                flex-direction: column;
                gap: 0.15em;
                font-size: calc(0.8 * var(--auto-font-size));
                color: var(--auto-border-color);
                line-height: 1.5;
            }
            /* 下拉宽度由内容决定：外部 width:auto 无效，因内部 display input 有默认内在宽度（约 20 字符）。
               间隔值最多两位数字（年无间隔模式），按 ch 收缩 input 即可让整体贴合内容 */
            .interval-row sl-select {
                flex: 0 0 auto;
                width: auto;
                min-width: 0;
            }
            .interval-row sl-select::part(display-input) {
                width: 2.5ch;
            }
            /* 间隔下拉的弹出层：面板是 overflow:hidden 的固定高容器（380px），select 处于面板下部时
               floating-ui flip 会把 listbox 翻到上方并按剩余可视高度压缩（auto-size vertical），
               表现为「向上弹 + 只有一行」。hoist 属性让 popup 以 fixed 定位逃出裁剪容器，
               再用 max-height 放开高度限制（listbox 自身 overflow:auto 会出滚动条）。 */
            .interval-row sl-select::part(listbox) {
                max-height: 16em;
            }
            .pick-toolbar {
                display: flex;
                flex-wrap: wrap;
                gap: 0.4em;
            }
            .pick-toolbar sl-button::part(base) {
                font-size: calc(0.85 * var(--auto-font-size));
            }
            .pick-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.3em;
                width: 100%;
            }
            /* 间隔模式的覆盖范围网格：只读高亮（用户已移除该预览，样式保留以防回退） */
            .pick-grid.readonly {
                pointer-events: none;
            }
            /* 指定模式输入框：占位提示即格式说明 */
            .pick-input-row {
                width: 100%;
            }
            .pick-input-row sl-input {
                width: 100%;
                font-family: var(--sl-font-mono);
            }
            .pick-grid sl-button {
                margin: 0;
            }
            .pick-grid sl-button::part(base) {
                font-size: calc(0.85 * var(--auto-font-size));
                padding-left: 0.4em;
                padding-right: 0.4em;
            }
            .pick-grid sl-button.week::part(base) {
                font-size: calc(0.95 * var(--auto-font-size));
            }
            .advanced-tip {
                font-size: calc(0.85 * var(--auto-font-size));
                color: var(--sl-color-warning-600);
            }
            .advanced-tip::before {
                content: "⚠ ";
            }
            .reset-banner {
                padding: 0.4em 0.8em;
                font-size: calc(0.85 * var(--auto-font-size));
                color: var(--sl-color-warning-600);
                background-color: var(--sl-color-warning-100);
            }
            .reset-banner::before {
                content: "⚠ ";
            }
            /* 面板顶部：cron 友好描述（编辑即时更新） */
            .cron-desc {
                padding: 0.5em;
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
                border-bottom: var(--auto-border);
                flex-shrink: 0;
            }
            .trigger-desc {
                flex: 1;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .trigger-expr {
                font-size: calc(0.8 * var(--auto-font-size));
                color: var(--auto-border-color);
                font-family: var(--sl-font-mono);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .trigger-warn {
                color: var(--sl-color-warning-600);
                margin-left: 0.3em;
            }
        `],I([(0,Z.state)()],C.prototype,"_editing",2),C=I([(0,ee.tag)("auto-field-cron")],C);return ce(ue);})();
//# sourceMappingURL=cron.global.js.map
