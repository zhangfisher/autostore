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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Qrcode=(()=>{var v=Object.create;var s=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var M=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(o,r)=>(typeof require<"u"?require:o)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var a=(t,o)=>()=>(o||t((o={exports:{}}).exports,o),o.exports),F=(t,o)=>{for(var r in o)s(t,r,{get:o[r],enumerable:!0})},u=(t,o,r,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let e of A(o))!L.call(t,e)&&e!==r&&s(t,e,{get:()=>o[e],enumerable:!(i=c(o,e))||i.enumerable});return t};var l=(t,o,r)=>(r=t!=null?v(I(t)):{},u(o||!t||!t.__esModule?s(r,"default",{value:t,enumerable:!0}):r,t)),H=t=>u(s({},"__esModule",{value:!0}),t),f=(t,o,r,i)=>{for(var e=i>1?void 0:i?c(o,r):o,p=t.length-1,d;p>=0;p--)(d=t[p])&&(e=(i?d(o,r,e):d(e))||e);return i&&e&&s(o,r,e),e};var h=a((S,m)=>{m.exports=__af_ns3});var _=a((T,g)=>{g.exports=__af_ns9});var b=a((w,$)=>{$.exports=__af_ns0});var k=a((y,x)=>{x.exports=__af_ns11});var Q={};F(Q,{AutoFieldQRCode:()=>n});var q=l(h(),1),z=l(_(),1),C=l(b(),1),D=M("@shoelace-style/shoelace/dist/components/qr-code/qr-code.js"),O=l(k(),1);var n=class extends z.AutoField{getInitialOptions(){return{fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return C.html`
            <sl-qr-code
                slot="value"
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                .placeholder=${this.options.placeholder}
                title="${(0,q.ifDefined)(this.options.tooltip)}"
                fill=${this.options.fill}
                background=${this.options.background}
                radius=${this.options.radius}
                error-correction=${this.options.errorCorrection}
                size=${parseInt(String(this.options.size))}
            ></sl-qr-code>
        `}};n=f([(0,O.tag)("auto-field-qrcode")],n);return H(Q);})();
//# sourceMappingURL=qrcode.global.js.map
