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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Checkbox=(()=>{var C=Object.create;var c=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var j=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,s)=>(typeof require<"u"?require:e)[s]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var h=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),I=(t,e)=>{for(var s in e)c(t,s,{get:e[s],enumerable:!0})},f=(t,e,s,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of L(e))!A.call(t,i)&&i!==s&&c(t,i,{get:()=>e[i],enumerable:!(o=b(e,i))||o.enumerable});return t};var l=(t,e,s)=>(s=t!=null?C(S(t)):{},f(e||!t||!t.__esModule?c(s,"default",{value:t,enumerable:!0}):s,t)),O=t=>f(c({},"__esModule",{value:!0}),t),d=(t,e,s,o)=>{for(var i=o>1?void 0:o?b(e,s):e,r=t.length-1,u;r>=0;r--)(u=t[r])&&(i=(o?u(e,s,i):u(i))||i);return o&&i&&c(e,s,i),i};var g=h((D,_)=>{_.exports=__af_ns0});var y=h((E,k)=>{k.exports=__af_ns3});var w=h((F,m)=>{m.exports=__af_ns9});var V=h((H,x)=>{x.exports=__af_ns11});var M={};I(M,{AutoFieldCheckbox:()=>a});var n=l(g(),1),v=l(y(),1),N=j("@shoelace-style/shoelace/dist/components/checkbox/checkbox.js"),p=l(w(),1),$=l(V(),1);var a=class extends p.AutoField{renderInput(){return n.html`
            <sl-checkbox
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                class="auto-input"
                ?disabled=${!this.options.enable}
                .value="${this._getSwitchValues()[0]}"
                .checked=${this._isChecked()}
                placeholder="${(0,v.ifDefined)(this.options.placeholder)}"
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-checkbox
            >
        `}getInitialOptions(){return{switchValues:[!0,!1]}}_getSwitchValues(){let e=this.options.choices;return Array.isArray(e)&&e.length>=2?[typeof e[0]=="object"?e[0].value:e[0],typeof e[1]=="object"?e[1].value:e[1]]:this.options.switchValues}_isChecked(){return this.value===this._getSwitchValues()[0]}getInputValue(){return this.input.checked?this._getSwitchValues()[0]:this._getSwitchValues()[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;let e=this.options.choices;if(Array.isArray(e)&&e.length>=2){let o=e[this._isChecked()?0:1];return typeof o=="object"?o.label??"":""}let s=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof s=="boolean"?"":s}renderView(){return n.html` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `}};a.styles=[p.AutoField.styles,n.css`
            sl-checkbox.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],a=d([(0,$.tag)("auto-field-checkbox")],a);return O(M);})();
//# sourceMappingURL=checkbox.global.js.map
