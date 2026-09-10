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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Custom=(()=>{var O=Object.create;var r=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty;var o=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),C=(t,e)=>{for(var n in e)r(t,n,{get:e[n],enumerable:!0})},m=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of R(e))!q.call(t,s)&&s!==n&&r(t,s,{get:()=>e[s],enumerable:!(i=_(e,s))||i.enumerable});return t};var l=(t,e,n)=>(n=t!=null?O(w(t)):{},m(e||!t||!t.__esModule?r(n,"default",{value:t,enumerable:!0}):n,t)),F=t=>m(r({},"__esModule",{value:!0}),t),c=(t,e,n,i)=>{for(var s=i>1?void 0:i?_(e,n):e,u=t.length-1,d;u>=0;u--)(d=t[u])&&(s=(i?d(e,n,s):d(s))||s);return i&&s&&r(e,n,s),s};var y=o((H,v)=>{v.exports=__af_ns1});var g=o((D,f)=>{f.exports=__af_ns0});var S=o((V,I)=>{I.exports=__af_ns15});var b=o((j,x)=>{x.exports=__af_ns10});var L=o((W,E)=>{E.exports=__af_ns11});var M={};C(M,{AutoFieldCustom:()=>a});var k=l(y(),1),p=l(g(),1),A=l(S(),1),h=l(b(),1),N=l(L(),1);var a=class extends h.AutoDropdownField{constructor(){super(...arguments);this.selection=[];this._skipSync=!1;this._lastRendered=void 0;this._onNativeInput=()=>{this._skipSync=!0,requestAnimationFrame(()=>{this._skipSync=!1}),this.onFieldChange()}}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{placeholder:"\u8BF7\u9009\u62E9",dropdown:!0,inputSelectors:"input,textarea"})}connectedCallback(){super.connectedCallback(),this._onFieldInput()}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this._onNativeInput),this.removeEventListener("change",this._onNativeInput)}}),this.addEventListener("input",this._onNativeInput),this.addEventListener("change",this._onNativeInput)}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(s=>(0,A.getInputValue)(s))}renderDropdown(){let n=Array.isArray(this.value)?this.value:[this.value];return this._skipSync?this._lastRendered??p.html`<div class="container"></div>`:(this._lastRendered=p.html`<div class="container">${this.options.renderContent(n,p.html)}</div>`,this._lastRendered)}};a.styles=[h.AutoDropdownField.styles],c([(0,k.query)(".container")],a.prototype,"container",2),a=c([(0,N.tag)("auto-field-custom")],a);return F(M);})();
//# sourceMappingURL=custom.global.js.map
