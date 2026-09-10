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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.List=(()=>{var Q=Object.create;var p=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var X=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty;var u=(s=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(s,{get:(o,e)=>(typeof require<"u"?require:o)[e]}):s)(function(s){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+s+'" is not supported')});var a=(s,o)=>()=>(o||s((o={exports:{}}).exports,o),o.exports),ee=(s,o)=>{for(var e in o)p(s,e,{get:o[e],enumerable:!0})},_=(s,o,e,t)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of X(o))!Z.call(s,i)&&i!==e&&p(s,i,{get:()=>o[i],enumerable:!(t=b(o,i))||t.enumerable});return s};var c=(s,o,e)=>(e=s!=null?Q(Y(s)):{},_(o||!s||!s.__esModule?p(e,"default",{value:s,enumerable:!0}):e,s)),te=s=>_(p({},"__esModule",{value:!0}),s),m=(s,o,e,t)=>{for(var i=t>1?void 0:t?b(o,e):o,n=s.length-1,l;n>=0;n--)(l=s[n])&&(i=(t?l(o,e,i):l(i))||i);return t&&i&&p(o,e,i),i};var x=a((ne,v)=>{v.exports=__af_ns1});var I=a((oe,$)=>{$.exports=__af_ns9});var k=a((re,w)=>{w.exports=__af_ns10});var C=a((le,A)=>{A.exports=__af_ns0});var S=a((ae,K)=>{K.exports=__af_ns4});var L=a((ce,T)=>{T.exports=__af_ns5});var O=a((de,P)=>{P.exports=__af_ns6});var z=a((he,F)=>{F.exports=__af_ns7});var H=a((pe,E)=>{E.exports=__af_ns11});var q=a((ue,M)=>{M.exports=__af_ns2});var R=a((me,D)=>{D.exports=__af_ns12});var se={};ee(se,{AutoFieldList:()=>d});var f=c(x(),1),V=c(I(),1),g=c(k(),1),r=c(C(),1),fe=u("@shoelace-style/shoelace/dist/components/menu/menu.js"),ge=u("@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"),ye=u("@shoelace-style/shoelace/dist/components/icon/icon.js"),be=u("@shoelace-style/shoelace/dist/components/tag/tag.js"),W=c(S(),1),B=c(L(),1),y=c(O(),1),h=c(z(),1),N=c(H(),1),j=c(q(),1),G=c(R(),1);var d=class extends g.AutoDropdownField{constructor(){super(...arguments);this.selection=[];this.valueKey="value";this.labelKey="label";this.items=new G.AsyncOptionState(this,"choices",e=>{if(!e||!Array.isArray(e))return[];let t=U(this.value).filter(n=>e.some(l=>l[this.options.valueKey]===n));return t.length===this.selection.length&&t.every((n,l)=>n===this.selection[l])||(this.selection=t),e});this.selectedTips=""}get loadedItems(){return this.items.value||[]}getInitialOptions(){return{valueKey:"value",labelKey:"label",multiple:!1,maxItems:0,minItems:0,dropdown:!1,maxTagCount:3,itemTemplate:void 0,choices:[]}}connectedCallback(){super.connectedCallback(),this.options&&this.setPresetActions(),this.style.height="auto"}updateOptions(){super.updateOptions(),this.setPresetActions()}isItemSelected(e){return this.value===void 0?!1:this.options.multiple===!1?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}_addSecectItem(e){let t=e[this.options.valueKey];this.selection.includes(t)||(this.options.multiple===!1&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(t))}_removeSelectItem(e){let t=this.selection.findIndex(i=>i===e);t>-1&&this.selection.splice(t,1),this.onFieldChange(),this.requestUpdate()}_onSelectItem(e){let t=e.detail.item,i=t.dataset.index,n=this.loadedItems[i];n&&(t.checked?this._addSecectItem(n):this._removeSelectItem(n[this.options.valueKey]),this.selectedTips=`${this.selection.length}/${this.loadedItems.length}`,this.onFieldChange())}_renderItem(e){let t=this.options.renderItem;return typeof t=="string"?r.html`${(0,y.unsafeHTML)(t.replace(/\{(.+?)\}/g,(i,n)=>e[n]))}`:typeof t=="function"?r.html`${(0,y.unsafeHTML)(t(e))}`:e.label}_onClickPresetAction(e){e==="all"?this.selection=this.loadedItems.map(t=>t[this.options.valueKey]):e==="reverse"?this.selection=this.loadedItems.filter(t=>!this.selection.includes(t[this.options.valueKey])).map(t=>t[this.options.valueKey]):e==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate()}setPresetActions(){let e=[];this.options.multiple&&e.push({id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")});let t=i=>{for(let n=e.length-1;n>=0;n--)if(e[n].id===i.id){let l=i.onClick;i.onClick=()=>{e[n].onClick(),l&&l.call(this,this.getInputValue())},e.splice(n,1)}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(i=>{t(i)}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(i=>{t(i)}),e.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...e))}getInputValue(){return this.options.multiple?[...this.selection]:this.selection.length>0?this.selection[0]:void 0}getShowLabel(e){let t=this.options.labelKey;if(t){if(t in e)return e[t]}else return e.label}_renderList(){let e=U(this.value);return r.html` <sl-menu
            class="mark-err ${(0,j.classMap)({multiple:this.options.multiple})}"
            style=${(0,B.styleMap)({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}
        >
            ${(0,W.repeat)(this.loadedItems,(t,i)=>{let n=e.includes(t[this.options.valueKey]);return r.html`<sl-menu-item type="checkbox"
                    data-index=${String(i)} .checked=${n}>
                    ${(0,h.when)(t.icon,()=>r.html`<sl-icon slot="prefix" name="${t.icon}"></sl-icon>`)}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(t)} </auto-flex>
                </sl-menu-item>`})}
        </sl-menu>`}_renderHeader(){return r.html`${(0,h.when)(this.beforeActions.length>0,()=>r.html`<div class="header">${this.renderBeforeActions()}</div>`)}
        `}_renderFooter(){if(!(!this.options.multiple&&this.afterActions.length===0))return r.html`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.loadedItems.length} </span>
        </div>`}renderSelection(){let e=this.options.labelKey||"label",t=this.options.maxTagCount,i=n=>{let l=this.loadedItems.find(J=>J[this.options.valueKey]===n);return l?l[e]:n};return this.options.multiple?r.html`<span class="tags">
                ${this.selection.slice(0,t).map(n=>r.html`<sl-tag
                                data-id="${n}"
                                removable
                                @sl-remove=${this._onRemoveTag.bind(this)}
                                @click=${l=>l.stopPropagation()}
                                >${i(n)}</sl-tag
                            >`)}
                ${(0,h.when)(this.selection.length>t,()=>r.html`<sl-tag>+${this.selection.length-t}</sl-tag>`)}
            </span>`:r.html`${i(this.selection[0])}`}_onRemoveTag(e){this._removeSelectItem(e.target.dataset.id),e.stopPropagation()}renderDropdown(){return r.html`${(0,h.when)(this.items.loading,()=>r.html`<auto-loading></auto-loading>`,()=>r.html`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`)}`}renderInput(){return this.options.dropdown?r.html`<div class="content">
                <sl-dropdown
                    size="${this.context.size}"
                    @sl-show=${()=>{this.active=!0}}
                    @sl-after-hide=${()=>{this.active=!1}}
                    sync="width"
                    distance="12"
                    .containingElement="${this}"
                >
                    ${this._renderSelection()} ${this._renderContent()}
                </sl-dropdown>
            </div>`:r.html`${(0,h.when)(this.items.loading,()=>r.html`<auto-loading></auto-loading>`,()=>r.html`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`)}`}};d.styles=[V.AutoField.styles,g.AutoDropdownField.styles,r.css`
            sl-menu-item[checked] {
                background-color: color-mix(in srgb, var(--auto-theme-color) 10%, transparent);
            }
            .header {
                padding: 0.5em;
                padding-bottom: 0.5em;
            }
            .footer {
                padding: 0.5em;
                padding-top: 0.5em;
                display: flex;
                flex-direction: row;
                align-items: center;
                & > .detail {
                    flex-grow: 1;
                    text-align: right;
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-400);
                    padding: 0px 1em;
                }
            }
            sl-menu-item::part(label) {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: var(--auto-font-size);
                & :first-child {
                    flex-grow: 1;
                }
            }
            /* dropdown 面板内的 menu 去自身边框与圆角——面板外框由基类
               .popoup-container.dropdown 单一提供，menu 直角铺满容器，
               底部圆角才不会被 menu 背景盖住 */
            .popoup-container sl-menu {
                border: 0px;
                border-radius: 0px;
                background-color: transparent;
            }
            /* ============ 列表滚动条：低调 8px，hover 容器时才显示 ============ */
            /* Firefox */
            sl-menu {
                scrollbar-width: thin;
                scrollbar-color: transparent transparent;
                transition: scrollbar-color 0.3s ease;
            }
            sl-menu:hover {
                scrollbar-color: var(--sl-color-neutral-300, #cbd5e1) transparent;
            }
            /* WebKit（Chrome/Safari/Edge） */
            sl-menu::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            sl-menu::-webkit-scrollbar-thumb {
                background-color: transparent;
                border-radius: 4px;
                transition: background-color 0.3s ease;
            }
            sl-menu:hover::-webkit-scrollbar-thumb {
                background-color: var(--sl-color-neutral-300, #cbd5e1);
            }
            sl-menu:hover::-webkit-scrollbar-thumb:hover {
                background-color: var(--sl-color-neutral-400, #94a3b8);
            }
            /* ============ 下拉触发器 tags（与 tree-dropdown 同款展示） ============
               dropdown 模式走 .content 包裹（自带边框+padding），sl-dropdown 直接
               挂 .content 下；.selection 单行高度、无边框。溢出不可滚——tag 数量
               交由 maxTagCount 折叠控制（触发器内滚动交互差），隐藏溢出即可 */
            .content > sl-dropdown .selection {
                height: auto;
                min-height: var(--auto-line-height);
                max-height: 12rem;
                overflow: hidden;
                & > .select-value {
                    display: block;
                    & > .tags {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                    }
                }
                sl-tag {
                    margin-right: 0.5rem;
                    margin-top: 0.1rem;
                    margin-bottom: 0.1rem;
                }
            }
            sl-icon.chevron {
                transition: all 0.2s ease-in;
                &.active {
                    transform: rotate(-180deg);
                }
            }
        `],m([(0,f.state)()],d.prototype,"selectedTips",2),m([(0,f.query)("sl-menu")],d.prototype,"menu",2),d=m([(0,N.tag)("auto-field-list")],d);function U(s){return s==null||s===""?[]:Array.isArray(s)?s:[s]}return te(se);})();
//# sourceMappingURL=list.global.js.map
