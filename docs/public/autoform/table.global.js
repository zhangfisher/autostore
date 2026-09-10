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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Table=(()=>{var H=Object.create;var i=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var l=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),j=(t,e)=>{for(var r in e)i(t,r,{get:e[r],enumerable:!0})},b=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of I(e))!D.call(t,s)&&s!==r&&i(t,s,{get:()=>e[s],enumerable:!(n=f(e,s))||n.enumerable});return t};var d=(t,e,r)=>(r=t!=null?H(M(t)):{},b(e||!t||!t.__esModule?i(r,"default",{value:t,enumerable:!0}):r,t)),v=t=>b(i({},"__esModule",{value:!0}),t),g=(t,e,r,n)=>{for(var s=n>1?void 0:n?f(e,r):e,u=t.length-1,_;u>=0;u--)(_=t[u])&&(s=(n?_(e,r,s):_(s))||s);return n&&s&&i(e,r,s),s};var w=l((N,h)=>{h.exports=__af_ns10});var c=l((V,y)=>{y.exports=__af_ns11});var $=l((k,x)=>{x.exports=__af_ns0});var O=l((q,R)=>{R.exports=__af_ns4});var A=l((z,T)=>{T.exports=__af_ns5});var E={};j(E,{AutoFieldTable:()=>a});var m=d(w(),1),C=d(c(),1),o=d($(),1),p=d(O(),1),F=d(A(),1);var a=class extends m.AutoDropdownField{constructor(){super(...arguments);this.selection=[]}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{dropdown:!1,fields:[]})}getInputValue(){}_renderHeader(){return o.html`
            <thead>
                ${(0,p.repeat)(this.options.fields,r=>o.html`<th
                        style=${(0,F.styleMap)({width:r.width})}
                    >
                        ${r.label}
                    </th>`)}
            </thead>
        `}_renderRow(r){return o.html` ${(0,p.repeat)(this.options.fields,n=>o.html`<td>${r[n.name]}</td>`)}`}_renderRows(){let r=this.value;return o.html`
            <tbody>
                ${(0,p.repeat)(r,n=>o.html`<tr>
                        ${this._renderRow(n)}
                    </tr>`)}
            </tbody>
        `}renderDropdown(){return o.html`<table class="table">
            ${this._renderHeader()} ${this._renderRows()}
        </table>`}};a.styles=[m.AutoDropdownField.styles],a=g([(0,C.tag)("auto-field-table")],a);return v(E);})();
//# sourceMappingURL=table.global.js.map
