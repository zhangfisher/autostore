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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Markdown=(()=>{var q=Object.create;var p=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var m=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),L=(t,e)=>{for(var a in e)p(t,a,{get:e[a],enumerable:!0})},d=(t,e,a,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of w(e))!H.call(t,s)&&s!==a&&p(t,s,{get:()=>e[s],enumerable:!(o=_(e,s))||o.enumerable});return t};var f=(t,e,a)=>(a=t!=null?q(E(t)):{},d(e||!t||!t.__esModule?p(a,"default",{value:t,enumerable:!0}):a,t)),M=t=>d(p({},"__esModule",{value:!0}),t),x=(t,e,a,o)=>{for(var s=o>1?void 0:o?_(e,a):e,n=t.length-1,i;n>=0;n--)(i=t[n])&&(s=(o?i(e,a,s):i(s))||s);return o&&s&&p(e,a,s),s};var y=m((h,c)=>{c.exports=__af_ns9});var u=m((j,g)=>{g.exports=__af_ns0});var T=m((v,O)=>{O.exports=__af_ns11});var N={};L(N,{AutoFieldMarkdown:()=>r});var l=f(y(),1),b=f(u(),1),k=f(T(),1);var r=class extends l.AutoField{};r.styles=[l.AutoField.styles,b.css``],r=x([(0,k.tag)("auto-field-markdown")],r);return M(N);})();
//# sourceMappingURL=markdown.global.js.map
