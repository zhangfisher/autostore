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
var __af_ns9 = __core.Field;
var __af_ns10 = __core.FieldDropdown;
var __af_ns11 = __core.UtilsTag;
var __af_ns12 = __core.ControllersAsyncState;
var __af_ns13 = __core.Controllers;
var __af_ns14 = __core.UtilsRenderWidget;
var __af_ns15 = __core.UtilsGetInputValue;
var __af_ns16 = __core.FormVars;
var __af_ns17 = __core.AutoStoreNS;
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Verifycode=(()=>{var z=Object.create;var g=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var H=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var d=(s,i)=>()=>(i||s((i={exports:{}}).exports,i),i.exports),V=(s,i)=>{for(var e in i)g(s,e,{get:i[e],enumerable:!0})},v=(s,i,e,t)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of D(i))!j.call(s,o)&&o!==e&&g(s,o,{get:()=>i[o],enumerable:!(t=T(i,o))||t.enumerable});return s};var p=(s,i,e)=>(e=s!=null?z(H(s)):{},v(i||!s||!s.__esModule?g(e,"default",{value:s,enumerable:!0}):e,s)),G=s=>v(g({},"__esModule",{value:!0}),s),m=(s,i,e,t)=>{for(var o=t>1?void 0:t?T(i,e):i,n=s.length-1,l;n>=0;n--)(l=s[n])&&(o=(t?l(i,e,o):l(o))||o);return t&&o&&g(i,e,o),o};var I=d((Q,A)=>{A.exports=__af_ns1});var L=d((U,w)=>{w.exports=__af_ns3});var O=d((X,C)=>{C.exports=__af_ns9});var y=d((Y,S)=>{S.exports=__af_ns0});var x=d((Z,k)=>{k.exports=__af_ns11});var M=d((it,W)=>{W.exports=__af_ns4});var J={};V(J,{AutoFieldVerifyCode:()=>c});var $=p(I(),1);var u=p(L(),1),_=p(O(),1),b=p(y(),1),q=p(x(),1);var h=class extends _.AutoField{constructor(){super(...arguments);this._prefix="";this._suffix=""}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix()}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return{inputType:"input"}}getPrefix(){if(this.options.icon)return b.html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=o=>o.map(n=>typeof n=="string"?n:n.value||n.label),t=(o,n,l=!0)=>{if(Array.isArray(n)&&n.length>0){let B=e(n),f=-1;B.some((r,P)=>{if(l&&this.value.startsWith(r)||!l&&this.value.endsWith(r))return l?(this._prefix=r,this.value=this.value.substring(r.length)):(this._suffix=r,this.value=this.value.substring(0,this.value.length-r.length)),f=P,!0});let E=f===-1?"?":typeof n[f]=="string"?n[f]:n[f].label,a={type:n.length===1?"button":"dropdown",label:E,caret:!l};a.type==="dropdown"?a.items=n.map(r=>(r==="-"||(r=typeof r=="string"?{label:r}:r,r.onClick=()=>{l?this._prefix=r.value??r.label:this._suffix=r.value??r.label,this.onFieldChange()}),r)):typeof n[0]=="string"?a.label=n[0]:Object.assign(a,n[0]),a.syncMenu=!0,a.pos=l?"before":"after",l?o.splice(0,0,a):o.push(a)}};this.options.prefix&&t(this.beforeActions,this.options.prefix),this.options.suffix&&t(this.afterActions,this.options.suffix,!1)}onInputChange(e){let t=e.type;t.includes("input")?this.onFieldInput():t.includes("change")&&this.onFieldChange()}onInputBlur(e){this.context.validAt==="lost-focus"&&this.onFieldChange()}renderInput(){return b.html`
            <sl-input
                slot="value"
                type="${this.getInputType()}"
                .value=${this.value}
                name=${this.name}
                data-path=${this.path}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?clearable=${this.options.clearable}
                ?required=${this.options.required}
                size=${this.context.size}
                placeholder=${(0,u.ifDefined)(this.options.placeholder)}
                pattern=${(0,u.ifDefined)(this.options.pattern)}
                minLength=${(0,u.ifDefined)(this.options.minLength)}
                maxLength=${(0,u.ifDefined)(this.options.maxLength)}
                max=${(0,u.ifDefined)(this.options.max)}
                min=${(0,u.ifDefined)(this.options.min)}
                step=${(0,u.ifDefined)(this.options.step)}
                ?disabled=${!this.options.enable}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${(0,u.ifDefined)(this.options.spellcheck)}
            >
                ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input
            >
        `}toState(e){let t=super.toState(e);return typeof t=="string"&&(this._prefix&&(t=this._prefix+t),this._suffix&&(t=t+this._suffix)),t}toInput(e){let t=super.toInput(e);return typeof t=="string"&&(this._prefix&&t.startsWith(this._prefix)&&(t=t.substring(this._prefix.length)),this._suffix&&t.endsWith(this._suffix)&&(t=t.substring(0,t.length-this._suffix.length))),t}};h.styles=[_.AutoField.styles,b.css`
            .actions {
                margin-right: 0px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .actions > sl-button {
                margin: 0px;
            }
            .actions.before {
                margin-left: 0px;
            }
            .actions.before sl-button::part(base) {
                border-left: none;
                border-radius: 0px;
            }
            .actions.after sl-button::part(base) {
                border-right: none;
                border-radius: 0px;
            }
        `],h=m([(0,q.tag)("auto-field-input")],h);var R=p(y(),1),F=p(x(),1),N=p(M(),1);var c=class extends h{constructor(){super(...arguments);this.countdowning=!1;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;this.countdownLabel=null}connectedCallback(){super.connectedCallback();let e=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(e)?Number(e[0]):Number(e),this.step=Array.isArray(e)?Number(e[1]):1e3,this.stepCount=this.timeout/this.step}getSendLabel(){return this.countdownLabel!==null?this.countdownLabel:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801")}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=!0,typeof this.options.onRequest=="function"&&this.options.onRequest.call(this);let e=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1"),t=this.stepCount,o=()=>{let n=Math.ceil(t*this.step/1e3);this.countdownLabel=e.replace("{timeout}",n.toString()),t--,t<=0?(this.countdownLabel=null,this.countdowning=!1,this.currentTimer=void 0):this.currentTimer=window.setTimeout(o,this.step)};o()}renderAfterActions(e){return R.html`<div
            class="actions after"
            part="after-actions"
            slot="${e?"suffix":void 0}"
        >
            ${this._renderButtonAction({label:this.getSendLabel(),variant:this.countdowning?void 0:"primary",onClick:this.sendRequest.bind(this)})}
            ${(0,N.repeat)(this.afterActions,t=>this.renderActionWidget(t))}
        </div>`}disconnectedCallback(){super.disconnectedCallback(),this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0)}};c.styles=[h.styles],m([(0,$.state)()],c.prototype,"countdowning",2),m([(0,$.state)()],c.prototype,"countdownLabel",2),c=m([(0,F.tag)("auto-field-verifycode")],c);return G(J);})();
//# sourceMappingURL=verifycode.global.js.map
