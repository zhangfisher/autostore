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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.ColorPicker=(()=>{var E=Object.create;var n=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var q=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,o)=>(typeof require<"u"?require:e)[o]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var l=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),M=(t,e)=>{for(var o in e)n(t,o,{get:e[o],enumerable:!0})},f=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of F(e))!O.call(t,r)&&r!==o&&n(t,r,{get:()=>e[r],enumerable:!(i=u(e,r))||i.enumerable});return t};var p=(t,e,o)=>(o=t!=null?E(I(t)):{},f(e||!t||!t.__esModule?n(o,"default",{value:t,enumerable:!0}):o,t)),T=t=>f(n({},"__esModule",{value:!0}),t),b=(t,e,o,i)=>{for(var r=i>1?void 0:i?u(e,o):e,c=t.length-1,d;c>=0;c--)(d=t[c])&&(r=(i?d(e,o,r):d(r))||r);return i&&r&&n(e,o,r),r};var g=l((L,m)=>{m.exports=__af_ns9});var v=l((P,x)=>{x.exports=__af_ns0});var y=l((j,$)=>{$.exports=__af_ns11});var _=l((N,w)=>{w.exports=__af_ns4});var A={};M(A,{AutoFieldColorPicker:()=>a});var h=p(g(),1),s=p(v(),1),S=q("@shoelace-style/shoelace/dist/components/color-picker/color-picker.js"),k=p(y(),1),C=p(_(),1);var z=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"],a=class extends h.AutoField{getInitialOptions(){return{format:"hex",opacity:!1,inline:!1,swatches:z}}renderInput(){return s.html`
            <sl-color-picker
                name=${this.name}
                data-path=${this.path}
                class="auto-input"
                value=${this.value}
                .format=${this.options.format}
                ?opacity=${this.options.opacity}
                ?inline=${this.options.inline}
                ?required=${this.options.required}
                ?disabled=${!this.options.enable}
                .placeholder=${this.options.placeholder}
                .swatches=${this.options.swatches.join(";")}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-color-picker>
            ${this._renderColors()}
        `}_onClickPresetColor(e){let o=e.target.dataset.color;o&&(this.input.value=o,this.value=o,this.requestUpdate(),this.onFieldInput(),this.input.dispatchEvent(new Event("sl-input",{bubbles:!0,composed:!0})),this.input.dispatchEvent(new Event("sl-change",{bubbles:!0,composed:!0})))}_renderColors(){if(this.options.presets)return s.html`<div class="preset-colors-container">
                ${(0,C.repeat)(this.options.presets,e=>s.html`<span
                        data-color="${e}"
                        @click=${this._onClickPresetColor}
                        class="preset-color${this.value===e?" selected":""}"
                        style="background-color:${e};"
                    ></span>`)}
            </div>`}renderView(){return s.html`<span><span class="color"   style="background-color:${this.value};"></span>${this.value}</span>`}};a.styles=[h.AutoField.styles,s.css`
            sl-color-picker::part(trigger) {
                border-radius: 4px;
            }
            .value{
                display:flex;
                gap: 0.5em;
                align-items: center;
            }
            .preset-colors-container {
                display: flex;
                gap: 0.5em;
                align-items: center;
            }
            .color {
                border: 2px solid white;
                border-radius: 4px;
                width: 1rem;
                height: 1rem;
                outline: 1px solid #aaa;
                margin-right: 0.5rem;
            }
            :host(.viewonly) {
                .value > span {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
            }
            .preset-color{
                width: var(--sl-input-height-medium);
                height: var(--sl-input-height-medium);
                border-radius: 4px;
                display: inline-block;
                cursor: pointer;
                border: 1px solid var(--sl-input-border-color);
                box-sizing: border-box;
                box-shadow: var(--auto-shadow);
                position: relative;
                &:hover{
                    outline:1px solid var(--auto-primary-color);
                }
                &.selected{
                    outline:2px solid var(--auto-primary-color);
                    &::before{
                        display: block;
                        content: "";
                        width: 12px;
                        height: 8px;
                        transform: rotate(-45deg); 
                        border: 2px solid white;
                        box-sizing: border-box;
                        border-top: transparent;
                        border-right: transparent;
                        margin: auto; /* 修改为 auto */
                        position: absolute;
                        top: 0; /* 添加顶部定位 */
                        left: 0; /* 添加左侧定位 */
                        right: 0; /* 添加右侧定位 */
                        bottom: 0; /* 添加底部定位 */
                    }
                }
            }
        `],a=b([(0,k.tag)("auto-field-colorpicker")],a);return T(A);})();
//# sourceMappingURL=color-picker.global.js.map
