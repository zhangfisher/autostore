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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Number=(()=>{var W=Object.create;var c=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty;var m=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports),z=(i,e)=>{for(var n in e)c(i,n,{get:e[n],enumerable:!0})},$=(i,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of E(e))!q.call(i,r)&&r!==n&&c(i,r,{get:()=>e[r],enumerable:!(t=_(e,r))||t.enumerable});return i};var d=(i,e,n)=>(n=i!=null?W(P(i)):{},$(e||!i||!i.__esModule?c(n,"default",{value:i,enumerable:!0}):n,i)),B=i=>$(c({},"__esModule",{value:!0}),i),b=(i,e,n,t)=>{for(var r=t>1?void 0:t?_(e,n):e,s=i.length-1,l;s>=0;s--)(l=i[s])&&(r=(t?l(e,n,r):l(r))||r);return t&&r&&c(e,n,r),r};var x=m((N,I)=>{I.exports=__af_ns11});var T=m((R,v)=>{v.exports=__af_ns3});var L=m((j,A)=>{A.exports=__af_ns9});var C=m((G,O)=>{O.exports=__af_ns0});var D={};z(D,{AutoFieldNumber:()=>f});var k=d(x(),1);var p=d(T(),1),y=d(L(),1),g=d(C(),1),F=d(x(),1);var u=class extends y.AutoField{constructor(){super(...arguments);this._prefix="";this._suffix=""}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix()}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return{inputType:"input"}}getPrefix(){if(this.options.icon)return g.html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let n=r=>r.map(s=>typeof s=="string"?s:s.value||s.label),t=(r,s,l=!0)=>{if(Array.isArray(s)&&s.length>0){let S=n(s),h=-1;S.some((o,M)=>{if(l&&this.value.startsWith(o)||!l&&this.value.endsWith(o))return l?(this._prefix=o,this.value=this.value.substring(o.length)):(this._suffix=o,this.value=this.value.substring(0,this.value.length-o.length)),h=M,!0});let w=h===-1?"?":typeof s[h]=="string"?s[h]:s[h].label,a={type:s.length===1?"button":"dropdown",label:w,caret:!l};a.type==="dropdown"?a.items=s.map(o=>(o==="-"||(o=typeof o=="string"?{label:o}:o,o.onClick=()=>{l?this._prefix=o.value??o.label:this._suffix=o.value??o.label,this.onFieldChange()}),o)):typeof s[0]=="string"?a.label=s[0]:Object.assign(a,s[0]),a.syncMenu=!0,a.pos=l?"before":"after",l?r.splice(0,0,a):r.push(a)}};this.options.prefix&&t(this.beforeActions,this.options.prefix),this.options.suffix&&t(this.afterActions,this.options.suffix,!1)}onInputChange(n){let t=n.type;t.includes("input")?this.onFieldInput():t.includes("change")&&this.onFieldChange()}onInputBlur(n){this.context.validAt==="lost-focus"&&this.onFieldChange()}renderInput(){return g.html`
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
                placeholder=${(0,p.ifDefined)(this.options.placeholder)}
                pattern=${(0,p.ifDefined)(this.options.pattern)}
                minLength=${(0,p.ifDefined)(this.options.minLength)}
                maxLength=${(0,p.ifDefined)(this.options.maxLength)}
                max=${(0,p.ifDefined)(this.options.max)}
                min=${(0,p.ifDefined)(this.options.min)}
                step=${(0,p.ifDefined)(this.options.step)}
                ?disabled=${!this.options.enable}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${(0,p.ifDefined)(this.options.spellcheck)}
            >
                ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input
            >
        `}toState(n){let t=super.toState(n);return typeof t=="string"&&(this._prefix&&(t=this._prefix+t),this._suffix&&(t=t+this._suffix)),t}toInput(n){let t=super.toInput(n);return typeof t=="string"&&(this._prefix&&t.startsWith(this._prefix)&&(t=t.substring(this._prefix.length)),this._suffix&&t.endsWith(this._suffix)&&(t=t.substring(0,t.length-this._suffix.length))),t}};u.styles=[y.AutoField.styles,g.css`
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
        `],u=b([(0,F.tag)("auto-field-input")],u);var f=class extends u{getInputType(){return"number"}};f=b([(0,k.tag)("auto-field-number")],f);return B(D);})();
//# sourceMappingURL=number.global.js.map
