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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Combine=(()=>{var T=Object.create;var d=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var h=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),B=(n,e)=>{for(var t in e)d(n,t,{get:e[t],enumerable:!0})},f=(n,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of V(e))!k.call(n,i)&&i!==t&&d(n,i,{get:()=>e[i],enumerable:!(s=m(e,i))||s.enumerable});return n};var c=(n,e,t)=>(t=n!=null?T(M(n)):{},f(e||!n||!n.__esModule?d(t,"default",{value:n,enumerable:!0}):t,n)),H=n=>f(d({},"__esModule",{value:!0}),n),u=(n,e,t,s)=>{for(var i=s>1?void 0:s?m(e,t):e,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(s?a(e,t,i):a(i))||i);return s&&i&&d(e,t,i),i};var g=h((W,_)=>{_.exports=__af_ns10});var v=h((j,y)=>{y.exports=__af_ns14});var b=h((q,C)=>{C.exports=__af_ns11});var w=h((N,S)=>{S.exports=__af_ns0});var O=h(($,x)=>{x.exports=__af_ns1});var E=h((U,A)=>{A.exports=__af_ns4});var P={};B(P,{AutoFieldCombine:()=>l});var p=c(g(),1),D=c(v(),1),I=c(b(),1),o=c(w(),1),L=c(O(),1),F=c(E(),1);var l=class extends p.AutoDropdownField{constructor(){super(...arguments);this._handleChildrenChange=()=>{Object.defineProperty(this,"dirty",{configurable:!0,get:()=>this._combineDirty,set:t=>{this._combineDirty=t}}),this.onFieldChange(),this._updateSelection()};this._combineDirty=!1;this._isFirst=!0}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{children:[]})}connectedCallback(){super.connectedCallback(),this._onChildrenChange()}disconnectedCallback(){this.shadow.removeEventListener("sl-change",this._handleChildrenChange),this.shadow.removeEventListener("sl-input",this._handleChildrenChange)}_updateSelection(){this.selection&&setTimeout(()=>{let t=this.toState(this.getInputValue()),s=super.renderSelection(t);this._isFirst&&((0,o.render)(o.nothing,this.selection),this._isFirst=!1),(0,o.render)(o.nothing,this.selection,{isConnected:!0}),(0,o.render)(s,this.selection,{isConnected:!0})})}_onChildrenChange(){this.options.children.length>0&&(this.shadow.addEventListener("sl-change",this._handleChildrenChange),this.shadow.addEventListener("sl-input",this._handleChildrenChange))}renderSelection(){return setTimeout(()=>this._updateSelection()),o.html``}getInputValue(){let t=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),s=[];return t.forEach(i=>{if(i instanceof HTMLElement&&i.tagName.startsWith("AUTO-FIELD-")){let r=i,a=typeof r.getInputValue=="function"?r.getInputValue():r.value;a===""&&(a=r.value),s.push(a)}}),s}renderDropdown(){return o.html`
            <div class="children">
                ${(0,F.repeat)(this.options.children,(t,s)=>String(t.name??s),t=>o.html`${(0,D.renderWidget)(t,{parent:this,attrs:{noreactive:!0,compact:!0}})}`)}
            </div>
        `}_handleStateChange(){}};l.styles=[p.AutoDropdownField.styles,o.css`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `],u([(0,L.query)(".selection>.select-value")],l.prototype,"selection",2),l=u([(0,I.tag)("auto-field-combine")],l);return H(P);})();
//# sourceMappingURL=combine.global.js.map
