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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Textarea=(()=>{var O=Object.create;var i=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var F=Object.getPrototypeOf,M=Object.prototype.hasOwnProperty;var C=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,o)=>(typeof require<"u"?require:e)[o]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var r=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),D=(t,e)=>{for(var o in e)i(t,o,{get:e[o],enumerable:!0})},f=(t,e,o,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of z(e))!M.call(t,s)&&s!==o&&i(t,s,{get:()=>e[s],enumerable:!(a=c(e,s))||a.enumerable});return t};var p=(t,e,o)=>(o=t!=null?O(F(t)):{},f(e||!t||!t.__esModule?i(o,"default",{value:t,enumerable:!0}):o,t)),E=t=>f(i({},"__esModule",{value:!0}),t),d=(t,e,o,a)=>{for(var s=a>1?void 0:a?c(e,o):e,h=t.length-1,u;h>=0;h--)(u=t[h])&&(s=(a?u(e,o,s):u(s))||s);return a&&s&&i(e,o,s),s};var x=r((R,g)=>{g.exports=__af_ns3});var _=r((T,$)=>{$.exports=__af_ns9});var v=r((V,b)=>{b.exports=__af_ns0});var w=r((j,L)=>{L.exports=__af_ns11});var H={};D(H,{AutoFieldTextArea:()=>n});var y=p(x(),1),k=C("@shoelace-style/shoelace/dist/components/textarea/textarea.js"),m=p(_(),1),l=p(v(),1),I=p(w(),1);var n=class extends m.AutoField{renderInput(){return l.html`
            <sl-textarea
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                placeholder="${(0,y.ifDefined)(this.options.placeholder)}"
                .minlength=${this.options.minLength}
                .maxlength=${this.options.maxLength}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                ?disabled=${!this.options.enable}
                .rows=${this.options.rows}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.value}</sl-textarea
            >
        `}getInitialOptions(){return{rows:3}}getInputValue(){return this.input.value}};n.styles=[m.AutoField.styles,l.css`
            sl-textarea::part(textarea) {
                font-size: var(--auto-font-size);
            }
        `],n=d([(0,I.tag)("auto-field-textarea")],n);return E(H);})();
//# sourceMappingURL=textarea.global.js.map
