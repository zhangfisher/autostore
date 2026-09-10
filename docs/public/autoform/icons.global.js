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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Icons=(()=>{var D=Object.create;var d=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var T=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var r=(s,i)=>()=>(i||s((i={exports:{}}).exports,i),i.exports),q=(s,i)=>{for(var t in i)d(s,t,{get:i[t],enumerable:!0})},m=(s,i,t,o)=>{if(i&&typeof i=="object"||typeof i=="function")for(let e of E(i))!V.call(s,e)&&e!==t&&d(s,e,{get:()=>i[e],enumerable:!(o=w(i,e))||o.enumerable});return s};var l=(s,i,t)=>(t=s!=null?D(T(s)):{},m(i||!s||!s.__esModule?d(t,"default",{value:s,enumerable:!0}):t,s)),B=s=>m(d({},"__esModule",{value:!0}),s),p=(s,i,t,o)=>{for(var e=o>1?void 0:o?w(i,t):i,h=s.length-1,u;h>=0;h--)(u=s[h])&&(e=(o?u(i,t,e):u(e))||e);return o&&e&&d(i,t,e),e};var y=r((N,g)=>{g.exports=__af_ns1});var b=r((R,v)=>{v.exports=__af_ns9});var _=r((W,x)=>{x.exports=__af_ns0});var k=r((j,I)=>{I.exports=__af_ns4});var O=r((G,A)=>{A.exports=__af_ns10});var $=r((J,S)=>{S.exports=__af_ns11});var H={};q(H,{AutoFieldIcons:()=>n});var a=l(y(),1),z=l(b(),1),c=l(_(),1),C=l(k(),1),f=l(O(),1),M=l($(),1);var F=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"],n=class extends f.AutoDropdownField{constructor(){super(...arguments);this.multiple=!1;this.active=!1;this.selected=[];this.icons=[]}getInitialOptions(){return{icons:[],size:"24px",multiple:!1,dropdown:!1,builtIn:!0}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&F.forEach(t=>{this.icons.includes(t)||this.icons.push(t)}),this.selected=Array.isArray(this.value)?this.value:this.value.split(",")}updateOptions(){super.updateOptions(),this.multiple=this.options.multiple||!1,this.multiple||(this.options.dropdown=!0)}updated(t){super.updated(t),t.has("value")&&this.value!==void 0&&(this.selected=Array.isArray(this.value)?[...this.value]:String(this.value).split(",")),this.multiple?this.style.width!=="100%"&&(this.style.width="100%"):this.style.width&&(this.style.width="")}renderView(){return this.renderIcons(this.selected)}_isSelected(t){return this.options.multiple?this.selected.includes(t):this.selected[0]===t}_onClickIcon(t){if(!this.context.viewonly)if(this.options.multiple){let o=this.selected.findIndex(e=>e===t);this.selected=o>-1?this.selected.filter(e=>e!==t):[...this.selected,t],this.onFieldInput()}else{this.selected=[t],this.onFieldInput();let o=this.shadowRoot?.querySelector("sl-dropdown");o&&typeof o.hide=="function"&&o.hide()}}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(t,o=!0){return c.html`<div class="icons" style="font-size:${this.options.size}">
            ${(0,C.repeat)(t,e=>{if(e!=="")return c.html`<span
                    class="icon ${o&&this._isSelected(e)?"selected":void 0}"
                    title="${e}"
                    @click=${()=>this._onClickIcon(e)}
                    ><sl-icon name="${e}"></sl-icon
                ></span>`})}
        </div>`}renderSelection(){return this.renderIcons(this.multiple?this.selected:this.selected.slice(0,1),!1)}renderDropdown(){return this.renderIcons(this.icons)}};n.styles=[z.AutoField.styles,f.AutoDropdownField.styles,c.css`
            /* ============ 单选：收缩为单个图标 + 下拉箭头的宽度 ============ */
            :host(:not([multiple])) {
                width: fit-content;
                /* 基类宽度链逐层放开：.autofield{width:100%} → .content（块级默认满宽）
                   → .dropdown{flex-grow:1} → sl-dropdown{width:100%} */
                & > .autofield {
                    width: auto;
                    & > .value > .content {
                        /* fit-content：flex 父级（.value 是普通块、内容行由 .content 自身撑开）
                           下按内容收缩，与 host 的收缩联动 */
                        width: fit-content;
                        & > .dropdown {
                            flex-grow: 0;
                            padding: 0px;
                            & > sl-dropdown {
                                width: auto;
                            }
                        }
                    }
                }
                min-width: var(--auto-line-height);
                /* 下拉面板不跟随触发器收缩（对冲 sl-dropdown 的 sync=width） */
                .popoup-container {
                    min-width: 180px;
                }
            }
            /* ============ 多选：满宽展示 ============ */
            :host([multiple]) {
                width: 100%;
            }
            /* 平铺模式下为图标容器提供输入框外观（.icons 不是 sl-dropdown 直接子元素，选择器须从容器向下到达） */
            .content > .dropdown > sl-dropdown > .icons,
            :host([dropdown]) .popoup-container:not(.dropdown) > .icons {
                padding: 0.5em;
                box-sizing: border-box;
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
            }
            sl-icon::part(svg) {
                stroke-width: 1.1;
            }
            .icons {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5em;
                & > .icon {
                    cursor: pointer;
                    display: inline-flex;
                    &:hover {
                        color: var(--auto-theme-color);
                    }
                    &.selected {
                        color: var(--auto-theme-color);
                    }
                }
            }
            .popoup-container {
                padding: 1em;
            }
        `],p([(0,a.property)({type:Boolean,reflect:!0})],n.prototype,"multiple",2),p([(0,a.state)()],n.prototype,"active",2),p([(0,a.state)()],n.prototype,"selected",2),n=p([(0,M.tag)("auto-field-icons")],n);return B(H);})();
//# sourceMappingURL=icons.global.js.map
