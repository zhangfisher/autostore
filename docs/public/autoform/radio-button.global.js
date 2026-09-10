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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.RadioButton=(()=>{var O=Object.create;var s=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty;var F=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,a)=>(typeof require<"u"?require:t)[a]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var d=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),K=(e,t)=>{for(var a in t)s(e,a,{get:t[a],enumerable:!0})},g=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of I(t))!w.call(e,i)&&i!==a&&s(e,i,{get:()=>t[i],enumerable:!(o=m(t,i))||o.enumerable});return e};var u=(e,t,a)=>(a=e!=null?O(j(e)):{},g(t||!e||!e.__esModule?s(a,"default",{value:e,enumerable:!0}):a,e)),A=e=>g(s({},"__esModule",{value:!0}),e),h=(e,t,a,o)=>{for(var i=o>1?void 0:o?m(t,a):t,l=e.length-1,p;l>=0;l--)(p=e[l])&&(i=(o?p(t,a,i):p(i))||i);return o&&i&&s(t,a,i),i};var b=d((T,f)=>{f.exports=__af_ns9});var $=d((C,y)=>{y.exports=__af_ns0});var x=d((E,v)=>{v.exports=__af_ns11});var M={};K(M,{AutoFieldRadioButton:()=>n});var c=u(b(),1),r=u($(),1),H=F("@shoelace-style/shoelace/dist/components/radio-button/radio-button.js"),_=u(x(),1);var n=class extends c.AutoField{getInitialOptions(){return{valueKey:"value"}}renderRadioItem(t){let a=t[this.options.valueKey];return r.html`<sl-radio-button value="${a}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${t.label}</sl-radio-button>`}renderInput(){let t=this.getOptionValue("choices",[]).map(a=>{let o={};return typeof a=="object"?Object.assign(o,a):Object.assign(o,{label:a,value:a}),o});return r.html`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${t.map(a=>this.renderRadioItem(a))}
            </sl-radio-group>
        `}};n.styles=[c.AutoField.styles,r.css`
            sl-radio-group::part(form-control-input) {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
            }
            sl-radio {
                margin-right: 1em;
                padding: 0.2em;
            }
        `],n=h([(0,_.tag)("auto-field-radio-button")],n);return A(M);})();
//# sourceMappingURL=radio-button.global.js.map
