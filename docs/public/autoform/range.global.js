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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Range=(()=>{var w=Object.create;var r=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var O=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var F=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,o)=>(typeof require<"u"?require:e)[o]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),M=(t,e)=>{for(var o in e)r(t,o,{get:e[o],enumerable:!0})},u=(t,e,o,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of I(e))!k.call(t,i)&&i!==o&&r(t,i,{get:()=>e[i],enumerable:!(a=c(e,i))||a.enumerable});return t};var h=(t,e,o)=>(o=t!=null?w(O(t)):{},u(e||!t||!t.__esModule?r(o,"default",{value:t,enumerable:!0}):o,t)),T=t=>u(r({},"__esModule",{value:!0}),t),g=(t,e,o,a)=>{for(var i=a>1?void 0:a?c(e,o):e,l=t.length-1,p;l>=0;l--)(p=t[l])&&(i=(a?p(e,o,i):p(i))||i);return a&&i&&r(e,o,i),i};var f=d((C,x)=>{x.exports=__af_ns0});var b=d((E,v)=>{v.exports=__af_ns9});var _=d((H,$)=>{$.exports=__af_ns11});var q={};M(q,{AutoFieldRabge:()=>s});var n=h(f(),1),L=F("@shoelace-style/shoelace/dist/components/range/range.js"),m=h(b(),1),y=h(_(),1);var s=class extends m.AutoField{getInitialOptions(){return{max:100,min:0,step:1,tooltip:"top"}}renderInput(){return n.html`
            <div>
                <span>${this.toView(this.value)}</span>
                <sl-range
                    slot="value"
                    name="${this.name}"
                    data-path=${this.path}
                    value=${this.value}
                    .placeholder=${this.options.placeholder}
                    ?disabled=${!this.options.enable}
                    .max=${this.options.max}
                    .min=${this.options.min}
                    .step=${this.options.step}
                    .tooltip=${this.options.tooltip}
                    @sl-input=${this.onFieldInput.bind(this)}
                    @sl-change=${this.onFieldChange.bind(this)}
                >
                </sl-range>
            </div>
        `}};s.styles=[m.AutoField.styles,n.css`
            .scale {
                position: relative;
                display: flex;
                flex-direction: row;
            }
            .box {
                background-color: var(--auto-bgcolor);
                border: var(--auto-border);
                padding: 0.5rem;
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
            }
            sl-range {
                --track-color-active: var(--auto-theme-color);
                box-sizing: border-box;
            }
            .value > div {
                display: flex;
                align-items: center;
                & :first-child {
                    padding: 0 1em;
                    padding-left: 0.1em;
                }
                & :last-child {
                    flex-grow: 1;
                }
            }
        `],s=g([(0,y.tag)("auto-field-range")],s);return T(q);})();
//# sourceMappingURL=range.global.js.map
