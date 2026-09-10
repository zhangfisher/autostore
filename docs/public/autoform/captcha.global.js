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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Captcha=(()=>{var G=Object.create;var m=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var z=Object.getPrototypeOf,B=Object.prototype.hasOwnProperty;var d=(n,i)=>()=>(i||n((i={exports:{}}).exports,i),i.exports),N=(n,i)=>{for(var e in i)m(n,e,{get:i[e],enumerable:!0})},A=(n,i,e,t)=>{if(i&&typeof i=="object"||typeof i=="function")for(let r of H(i))!B.call(n,r)&&r!==e&&m(n,r,{get:()=>i[r],enumerable:!(t=v(i,r))||t.enumerable});return n};var h=(n,i,e)=>(e=n!=null?G(z(n)):{},A(i||!n||!n.__esModule?m(e,"default",{value:n,enumerable:!0}):e,n)),j=n=>A(m({},"__esModule",{value:!0}),n),g=(n,i,e,t)=>{for(var r=t>1?void 0:t?v(i,e):i,s=n.length-1,a;s>=0;s--)(a=n[s])&&(r=(t?a(i,e,r):a(r))||r);return t&&r&&m(i,e,r),r};var T=d((K,C)=>{C.exports=__af_ns1});var O=d((Q,L)=>{L.exports=__af_ns3});var U=d((X,w)=>{w.exports=__af_ns9});var _=d((Y,k)=>{k.exports=__af_ns0});var $=d((Z,S)=>{S.exports=__af_ns11});var E=d((it,M)=>{M.exports=__af_ns4});var V={};N(V,{AutoFieldCaptcha:()=>p});var x=h(T(),1);var l=h(O(),1),I=h(U(),1),b=h(_(),1),W=h($(),1);var c=class extends I.AutoField{constructor(){super(...arguments);this._prefix="";this._suffix=""}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix()}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return{inputType:"input"}}getPrefix(){if(this.options.icon)return b.html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=r=>r.map(s=>typeof s=="string"?s:s.value||s.label),t=(r,s,a=!0)=>{if(Array.isArray(s)&&s.length>0){let F=e(s),f=-1;F.some((o,D)=>{if(a&&this.value.startsWith(o)||!a&&this.value.endsWith(o))return a?(this._prefix=o,this.value=this.value.substring(o.length)):(this._suffix=o,this.value=this.value.substring(0,this.value.length-o.length)),f=D,!0});let R=f===-1?"?":typeof s[f]=="string"?s[f]:s[f].label,u={type:s.length===1?"button":"dropdown",label:R,caret:!a};u.type==="dropdown"?u.items=s.map(o=>(o==="-"||(o=typeof o=="string"?{label:o}:o,o.onClick=()=>{a?this._prefix=o.value??o.label:this._suffix=o.value??o.label,this.onFieldChange()}),o)):typeof s[0]=="string"?u.label=s[0]:Object.assign(u,s[0]),u.syncMenu=!0,u.pos=a?"before":"after",a?r.splice(0,0,u):r.push(u)}};this.options.prefix&&t(this.beforeActions,this.options.prefix),this.options.suffix&&t(this.afterActions,this.options.suffix,!1)}onInputChange(e){let t=e.type;t.includes("input")?this.onFieldInput():t.includes("change")&&this.onFieldChange()}onInputBlur(e){this.context.validAt==="lost-focus"&&this.onFieldChange()}renderInput(){return b.html`
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
                placeholder=${(0,l.ifDefined)(this.options.placeholder)}
                pattern=${(0,l.ifDefined)(this.options.pattern)}
                minLength=${(0,l.ifDefined)(this.options.minLength)}
                maxLength=${(0,l.ifDefined)(this.options.maxLength)}
                max=${(0,l.ifDefined)(this.options.max)}
                min=${(0,l.ifDefined)(this.options.min)}
                step=${(0,l.ifDefined)(this.options.step)}
                ?disabled=${!this.options.enable}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${(0,l.ifDefined)(this.options.spellcheck)}
            >
                ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input
            >
        `}toState(e){let t=super.toState(e);return typeof t=="string"&&(this._prefix&&(t=this._prefix+t),this._suffix&&(t=t+this._suffix)),t}toInput(e){let t=super.toInput(e);return typeof t=="string"&&(this._prefix&&t.startsWith(this._prefix)&&(t=t.substring(this._prefix.length)),this._suffix&&t.endsWith(this._suffix)&&(t=t.substring(0,t.length-this._suffix.length))),t}};c.styles=[I.AutoField.styles,b.css`
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
        `],c=g([(0,W.tag)("auto-field-input")],c);var y=h(_(),1),P=h($(),1),q=h(E(),1);var p=class extends c{constructor(){super(...arguments);this.loading=!1;this.captchaUrl=""}getInitialOptions(){return{url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}connectedCallback(){super.connectedCallback(),this.captchaUrl=this.getCaptchaUrl()}getCaptchaUrl(){return typeof this.options.onGenerate=="function"?this.options.onGenerate.call(this):this.getRefreshUrl()}getRefreshUrl(){let e=this.options.url,[t,r]=e.split("?"),s=new URLSearchParams(r);return s.set("t",Date.now().toString()),`${t}?${s.toString()}`}refreshCaptchaImage(){this.captchaUrl=this.getCaptchaUrl(),this.loading=!0}updated(){let e=this.img;e&&(e.onload=()=>{this.loading=!1,this.input?.focus(),this.input?.select()},e.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=!1})}renderAfterActions(e){return y.html`<div
            class="actions after"
            part="after-actions"
            slot="${e?"suffix":void 0}"
        >
            ${this._renderImageAction({type:"image",url:this.captchaUrl,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)})}
            ${(0,q.repeat)(this.afterActions,t=>this.renderActionWidget(t))}
        </div>`}renderView(){return y.html`${this.value}`}};p.styles=[c.styles,y.css`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
            sl-button.action-widget.image img {
                display: block;
                height: 30px;
                width: auto;
                border-radius: var(--sl-border-radius-small, 4px);
            }
        `],g([(0,x.query)("img")],p.prototype,"img",2),g([(0,x.state)()],p.prototype,"loading",2),g([(0,x.state)()],p.prototype,"captchaUrl",2),p=g([(0,P.tag)("auto-field-captcha")],p);return j(V);})();
//# sourceMappingURL=captcha.global.js.map
