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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Input=(()=>{var k=Object.create;var c=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var g=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),M=(n,e)=>{for(var i in e)c(n,i,{get:e[i],enumerable:!0})},x=(n,e,i,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of w(e))!P.call(n,r)&&r!==i&&c(n,r,{get:()=>e[r],enumerable:!(t=b(e,r))||t.enumerable});return n};var f=(n,e,i)=>(i=n!=null?k(E(n)):{},x(e||!n||!n.__esModule?c(i,"default",{value:n,enumerable:!0}):i,n)),q=n=>x(c({},"__esModule",{value:!0}),n),y=(n,e,i,t)=>{for(var r=t>1?void 0:t?b(e,i):e,s=n.length-1,p;s>=0;s--)(p=n[s])&&(r=(t?p(e,i,r):p(r))||r);return t&&r&&c(e,i,r),r};var $=g((D,_)=>{_.exports=__af_ns3});var v=g((j,I)=>{I.exports=__af_ns9});var T=g((H,A)=>{A.exports=__af_ns0});var O=g((N,C)=>{C.exports=__af_ns11});var z={};M(z,{AutoFieldInput:()=>a});var l=f($(),1),m=f(v(),1),d=f(T(),1),L=f(O(),1);var a=class extends m.AutoField{constructor(){super(...arguments);this._prefix="";this._suffix=""}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix()}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return{inputType:"input"}}getPrefix(){if(this.options.icon)return d.html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let i=r=>r.map(s=>typeof s=="string"?s:s.value||s.label),t=(r,s,p=!0)=>{if(Array.isArray(s)&&s.length>0){let W=i(s),h=-1;W.some((o,S)=>{if(p&&this.value.startsWith(o)||!p&&this.value.endsWith(o))return p?(this._prefix=o,this.value=this.value.substring(o.length)):(this._suffix=o,this.value=this.value.substring(0,this.value.length-o.length)),h=S,!0});let F=h===-1?"?":typeof s[h]=="string"?s[h]:s[h].label,u={type:s.length===1?"button":"dropdown",label:F,caret:!p};u.type==="dropdown"?u.items=s.map(o=>(o==="-"||(o=typeof o=="string"?{label:o}:o,o.onClick=()=>{p?this._prefix=o.value??o.label:this._suffix=o.value??o.label,this.onFieldChange()}),o)):typeof s[0]=="string"?u.label=s[0]:Object.assign(u,s[0]),u.syncMenu=!0,u.pos=p?"before":"after",p?r.splice(0,0,u):r.push(u)}};this.options.prefix&&t(this.beforeActions,this.options.prefix),this.options.suffix&&t(this.afterActions,this.options.suffix,!1)}onInputChange(i){let t=i.type;t.includes("input")?this.onFieldInput():t.includes("change")&&this.onFieldChange()}onInputBlur(i){this.context.validAt==="lost-focus"&&this.onFieldChange()}renderInput(){return d.html`
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
        `}toState(i){let t=super.toState(i);return typeof t=="string"&&(this._prefix&&(t=this._prefix+t),this._suffix&&(t=t+this._suffix)),t}toInput(i){let t=super.toInput(i);return typeof t=="string"&&(this._prefix&&t.startsWith(this._prefix)&&(t=t.substring(this._prefix.length)),this._suffix&&t.endsWith(this._suffix)&&(t=t.substring(0,t.length-this._suffix.length))),t}};a.styles=[m.AutoField.styles,d.css`
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
        `],a=y([(0,L.tag)("auto-field-input")],a);return q(z);})();
//# sourceMappingURL=input.global.js.map
