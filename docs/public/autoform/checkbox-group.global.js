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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.CheckboxGroup=(()=>{var W=Object.create;var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var d=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports),F=(r,t)=>{for(var e in t)c(r,e,{get:t[e],enumerable:!0})},b=(r,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of j(t))!A.call(r,o)&&o!==e&&c(r,o,{get:()=>t[o],enumerable:!(i=u(t,o))||i.enumerable});return r};var h=(r,t,e)=>(e=r!=null?W(M(r)):{},b(t||!r||!r.__esModule?c(e,"default",{value:r,enumerable:!0}):e,r)),L=r=>b(c({},"__esModule",{value:!0}),r),f=(r,t,e,i)=>{for(var o=i>1?void 0:i?u(t,e):t,l=r.length-1,s;l>=0;l--)(s=r[l])&&(o=(i?s(t,e,o):s(o))||o);return i&&o&&c(t,e,o),o};var y=d((E,v)=>{v.exports=__af_ns9});var m=d((H,g)=>{g.exports=__af_ns11});var w=d((P,k)=>{k.exports=__af_ns0});var $=d((R,_)=>{_.exports=__af_ns5});var I=d((V,C)=>{C.exports=__af_ns7});var N={};F(N,{AutoFieldCheckboxGroup:()=>n});var p=h(y(),1),K=h(m(),1),a=h(w(),1),z=h($(),1),S=h(I(),1);var n=class extends p.AutoField{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=!1}getInitialOptions(){return{valueKey:"value",card:!1}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.choices.map((e,i)=>{let o={};return typeof e=="object"?Object.assign(o,e):Object.assign(o,{id:e,label:e,value:e}),o.icon&&(this.isShowIcon=!0),o.$index=i,o}),this.selection=this.value}renderInput(){return a.html`
            <div class="items">
                ${this.items.map(e=>this.renderCheckItemWithCard(this.renderCheckboxItem(e),e))}
            </div>
        `}renderCheckboxItem(e){return a.html`
            <sl-checkbox
                data-index="${e.$index}"
                data-value="${e[this.valueKey]}"
                .value="${e[this.valueKey]}"
                .checked=${this.value.includes(e[this.valueKey])}
                help-text="${e.tips}"
                @sl-change=${this._onCheckChange.bind(this)}
            >
                ${e.label}</sl-checkbox
            >
        `}_onCheckChange(e){let i=e.target.closest(".card")||e.target,o=Number(i.dataset.index),l=i.checked??!i.classList.contains("selected"),s=this.items[o];if(s){if(l)this.selection.includes(s[this.valueKey])||this.selection.push(s[this.valueKey]);else{let x=this.selection.findIndex(O=>O===s[this.valueKey]);x>-1&&this.selection.splice(x,1)}this.onFieldChange()}}getInputValue(){return this.selection}renderCheckItemWithCard(e,i){if(this.options.card){let o=this.selection.includes(i[this.valueKey]);return a.html`<div
                class="card ${o?"selected":""}"
                data-index="${i.$index}"
                style=${(0,z.styleMap)({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">${(0,S.when)(this.isShowIcon,()=>a.html`<sl-icon class="icon" name="${i.icon||""}"></sl-icon>`)} ${e}</div>
            </div>`}else return e}};n.styles=[p.AutoField.styles,a.css`
            .items {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
                sl-checkbox {
                    padding: 0.5rem;
                }
                sl-checkbox::part(form-control-help-text) {
                    max-height: 2.4rem;
                    overflow: hidden;
                }
                sl-checkbox::part(base) {
                    font-size: var(--auto-font-size);
                }
            }
            sl-icon::part(svg) {
                stroke-width: 1.1;
            }
            .card {
                padding: calc(var(--auto-spacing) * 0.3);
                box-sizing: border-box;
                cursor: pointer;
                sl-checkbox {
                    padding: 0rem;
                }
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
                    sl-icon.icon {
                        flex-shrink: 0;
                        color: var(--auto-primary-color);
                        padding: 0.5em;
                        padding-top: 0px;
                        padding-left: 0px;
                        font-size: calc(2 * var(--auto-font-size));
                    }
                    sl-checkbox::part(label) {
                        margin-left: 0px;
                        font-size: var(--auto-font-size);
                    }
                    sl-checkbox::part(form-control-help-text) {
                        max-height: 2.8em;
                        line-height: 150%;                        
                        color: var(--auto-color);
                        filter: opacity(0.5);
                        overflow: hidden;
                    }
                    sl-checkbox::part(control) {
                        display: none;
                    }
                }
                &.card.selected {
                    & > .body {
                        border: 1px solid var(--sl-color-primary-500);
                        background: color-mix(in srgb, var(--t-color-primary-5, var(--sl-color-primary-500)) 20%, transparent);
                        &:hover {
                            outline: 1px solid var(--sl-color-primary-500); 
                        }
                        &:before {
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
                        &:after {
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
                    }
                }
            }
        `],n=f([(0,K.tag)("auto-field-checkbox-group")],n);return L(N);})();
//# sourceMappingURL=checkbox-group.global.js.map
