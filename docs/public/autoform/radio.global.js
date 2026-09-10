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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Radio=(()=>{var k=Object.create;var n=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,K=Object.prototype.hasOwnProperty;var m=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(o,e)=>(typeof require<"u"?require:o)[e]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var l=(r,o)=>()=>(o||r((o={exports:{}}).exports,o),o.exports),j=(r,o)=>{for(var e in o)n(r,e,{get:o[e],enumerable:!0})},x=(r,o,e,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of C(o))!K.call(r,t)&&t!==e&&n(r,t,{get:()=>o[t],enumerable:!(i=g(o,t))||i.enumerable});return r};var d=(r,o,e)=>(e=r!=null?k(W(r)):{},x(o||!r||!r.__esModule?n(e,"default",{value:r,enumerable:!0}):e,r)),M=r=>x(n({},"__esModule",{value:!0}),r),u=(r,o,e,i)=>{for(var t=i>1?void 0:i?g(o,e):o,p=r.length-1,c;p>=0;p--)(c=r[p])&&(t=(i?c(o,e,t):c(t))||t);return i&&t&&n(o,e,t),t};var v=l((q,f)=>{f.exports=__af_ns9});var w=l((E,y)=>{y.exports=__af_ns0});var _=l((F,$)=>{$.exports=__af_ns5});var O=l((H,z)=>{z.exports=__af_ns11});var R={};j(R,{AutoFieldRadio:()=>a});var h=d(v(),1),s=d(w(),1),b=d(_(),1),L=m("@shoelace-style/shoelace/dist/components/radio/radio.js"),N=m("@shoelace-style/shoelace/dist/components/radio-group/radio-group.js"),I=d(O(),1);var a=class extends h.AutoField{getInitialOptions(){return{card:!1,choices:[],valueKey:"value"}}renderOptionItemWithCard(o,e){if(this.options.card){let i=e[this.options.valueKey]||e.label,t=this.value===i;return s.html`<div
                class="card"
                style=${(0,b.styleMap)({width:this.options.itemWidth})}
            >
                <div class="body ${t?"selected":""}">
                    <sl-icon class="icon" name="settings"></sl-icon>
                    ${o}
                </div>
            </div>`}else return o}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate()}renderOptionItem(o){let e=o[this.options.valueKey]||o.label;return s.html`<sl-radio
            value="${e}"
            style=${(0,b.styleMap)({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
            >${o.label}<br /><span class="memo">${o.tips}</span></sl-radio
        >`}renderInput(){let o=this.options.choices.map(e=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{label:e}),i});return s.html`
            <sl-radio-group class="value" name=${this.name} value="${this.value}" size="${this.context.size}" @sl-change=${this.onRadioChange.bind(this)}>
                ${o.map(e=>this.renderOptionItemWithCard(this.renderOptionItem(e),e))}
            </sl-radio-group>
        `}};a.styles=[h.AutoField.styles,s.css`
            sl-radio-group::part(form-control-input) {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
            }
            sl-icon::part(svg) {
                stroke-width: 1.1;
            }
            sl-radio {
                position: relative;
                & .memo {
                    color: var(--auto-color);                    
                    filter: opacity(0.5);
                    font-size: 0.8em;
                    max-height: 2.8em;
                    overflow: hidden;
                    display: -webkit-box;
                    line-height: 150%;
                    margin-top: 2px;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            sl-radio::part(label) {
                margin-right: 1em;
            }
            .card {
                padding: calc(var(--auto-spacing) * 0.3);
                box-sizing: border-box;
                & > .body {
                    display: flex;
                    flex-direction: row;
                    border: var(--auto-border);
                    border-radius: var(--auto-border-radius);
                    box-shadow: var(--auto-shadow);
                    padding: var(--auto-spacing);
                    box-sizing: border-box;
                    position: relative;
                    overflow: hidden;
                    &:hover {
                        outline: 1px solid var(--sl-color-primary-500);
                    }
                    & > sl-radio {
                        flex-grow: 1;
                    }
                    & sl-radio::part(control) {
                        display: none;
                    }
                    & sl-radio::part(label) {
                        padding-right: 0px;
                        margin-right: 0px;
                    }
                    &.selected {
                        border: 1px solid var(--sl-color-primary-500); 
                        background: color-mix(in srgb, var(--t-color-primary-5) 20%, transparent);
                    }
                    &.selected:before {
                        content: ' ';
                        position: absolute;
                        left: calc(100% - 24px);
                        top: 0px;
                        width: 24px;
                        height: 24px;
                        box-sizing: border-box;
                        border: 12px solid transparent;
                        border-top-color: var(--sl-color-primary-500);
                        border-right-color: var(--sl-color-primary-500);
                    }
                    &.selected:after {
                        content: ' ';
                        position: absolute;
                        left: calc(100% - 12px);
                        top: 2px;
                        width: 10px;
                        height: 6px;
                        box-sizing: border-box;
                        border: 2px solid transparent;
                        border-left-color: white;
                        border-bottom-color: white;
                        transform: rotate(-45deg);
                    }
                    sl-icon.icon {
                        flex-shrink: 0;
                        color: var(--auto-primary-color);
                        padding-top: 0px;
                        padding-left: 0px;
                        font-size: calc(2 * var(--auto-font-size));
                    }
                }
            }
        `],a=u([(0,I.tag)("auto-field-radio")],a);return M(R);})();
//# sourceMappingURL=radio.global.js.map
