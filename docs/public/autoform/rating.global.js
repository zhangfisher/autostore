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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Rating=(()=>{var O=Object.create;var s=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,M=Object.prototype.hasOwnProperty;var T=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,i)=>(typeof require<"u"?require:e)[i]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var p=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),w=(t,e)=>{for(var i in e)s(t,i,{get:e[i],enumerable:!0})},u=(t,e,i,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of A(e))!M.call(t,a)&&a!==i&&s(t,a,{get:()=>e[a],enumerable:!(n=d(e,a))||n.enumerable});return t};var h=(t,e,i)=>(i=t!=null?O(I(t)):{},u(e||!t||!t.__esModule?s(i,"default",{value:t,enumerable:!0}):i,t)),y=t=>u(s({},"__esModule",{value:!0}),t),g=(t,e,i,n)=>{for(var a=n>1?void 0:n?d(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(n?l(e,i,a):l(a))||a);return n&&a&&s(e,i,a),a};var $=p((H,c)=>{c.exports=__af_ns9});var f=p((L,x)=>{x.exports=__af_ns0});var b=p((N,_)=>{_.exports=__af_ns11});var C={};w(C,{AutoFieldRating:()=>o});var v=h($(),1),m=h(f(),1),R=T("@shoelace-style/shoelace/dist/components/rating/rating.js"),F=h(b(),1);var o=class extends v.AutoField{getInitialOptions(){return{max:5,precision:1}}renderInput(){return m.html`
            <sl-rating
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                value=${this.value}
                max=${this.options.max}
                precision=${this.options.precision}
                .placeholder=${this.options.placeholder}
                ?disabled=${!this.options.enable}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
            </sl-rating>
        `}renderView(){return m.html`<sl-rating slot="value" name="${this.name}" data-path=${this.path} value=${this.value} max=${this.options.max} readonly> </sl-rating> `}};o=g([(0,F.tag)("auto-field-rating")],o);return y(C);})();
//# sourceMappingURL=rating.global.js.map
