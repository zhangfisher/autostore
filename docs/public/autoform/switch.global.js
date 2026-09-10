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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Switch=(()=>{var C=Object.create;var a=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,S=Object.prototype.hasOwnProperty;var I=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,s)=>(typeof require<"u"?require:e)[s]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var c=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),O=(t,e)=>{for(var s in e)a(t,s,{get:e[s],enumerable:!0})},g=(t,e,s,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of L(e))!S.call(t,i)&&i!==s&&a(t,i,{get:()=>e[i],enumerable:!(n=f(e,i))||n.enumerable});return t};var l=(t,e,s)=>(s=t!=null?C(A(t)):{},g(e||!t||!t.__esModule?a(s,"default",{value:t,enumerable:!0}):s,t)),j=t=>g(a({},"__esModule",{value:!0}),t),w=(t,e,s,n)=>{for(var i=n>1?void 0:n?f(e,s):e,r=t.length-1,u;r>=0;r--)(u=t[r])&&(i=(n?u(e,s,i):u(i))||i);return n&&i&&a(e,s,i),i};var b=c((M,_)=>{_.exports=__af_ns3});var m=c((T,y)=>{y.exports=__af_ns9});var V=c((D,k)=>{k.exports=__af_ns0});var v=c((E,$)=>{$.exports=__af_ns11});var F={};O(F,{AutoFieldSwitch:()=>o});var p=l(b(),1),d=l(m(),1),h=l(V(),1),H=I("@shoelace-style/shoelace/dist/components/switch/switch.js"),x=l(v(),1);var o=class extends d.AutoField{renderInput(){return h.html`
            <sl-switch
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                value="${this._getSwitchValues()[0]}"
                .checked=${this._isChecked()}
                ?disabled=${!this.options.enable}
                size="${(0,p.ifDefined)(this.context.size)}"
                placeholder="${(0,p.ifDefined)(this.options.placeholder)}"
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-switch
            >
        `}_getSwitchValues(){let e=this.options.choices;return Array.isArray(e)&&e.length>=2?[typeof e[0]=="object"?e[0].value:e[0],typeof e[1]=="object"?e[1].value:e[1]]:this.options.switchValues}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;let e=this.options.choices;if(Array.isArray(e)&&e.length>=2){let n=e[this._isChecked()?0:1];return typeof n=="object"?n.label??"":""}let s=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof s=="boolean"?"":s}getInitialOptions(){return{switchValues:[!0,!1]}}_isChecked(){return this.value===this._getSwitchValues()[0]}getInputValue(){return this.input.checked?this._getSwitchValues()[0]:this._getSwitchValues()[1]}renderView(){return h.html` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `}};o.styles=[d.AutoField.styles,h.css`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],o=w([(0,x.tag)("auto-field-switch")],o);return j(F);})();
//# sourceMappingURL=switch.global.js.map
