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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.TreeDropdown=(()=>{var Y=Object.create;var f=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,ee=Object.prototype.hasOwnProperty;var y=(s=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(s,{get:(o,e)=>(typeof require<"u"?require:o)[e]}):s)(function(s){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+s+'" is not supported')});var c=(s,o)=>()=>(o||s((o={exports:{}}).exports,o),o.exports),te=(s,o)=>{for(var e in o)f(s,e,{get:o[e],enumerable:!0})},$=(s,o,e,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of Z(o))!ee.call(s,t)&&t!==e&&f(s,t,{get:()=>o[t],enumerable:!(r=w(o,t))||r.enumerable});return s};var a=(s,o,e)=>(e=s!=null?Y(D(s)):{},$(o||!s||!s.__esModule?f(e,"default",{value:s,enumerable:!0}):e,s)),re=s=>$(f({},"__esModule",{value:!0}),s),u=(s,o,e,r)=>{for(var t=r>1?void 0:r?w(o,e):o,i=s.length-1,n;i>=0;i--)(n=s[i])&&(t=(r?n(o,e,t):n(t))||t);return r&&t&&f(o,e,t),t};var v=c((ie,N)=>{N.exports=__af_ns9});var g=c((ae,A)=>{A.exports=__af_ns0});var k=c((ne,K)=>{K.exports=__af_ns1});var P=c((le,I)=>{I.exports=__af_ns4});var L=c((de,E)=>{E.exports=__af_ns2});var x=c((pe,z)=>{z.exports=__af_ns7});var S=c((he,M)=>{M.exports=__af_ns11});var F=c((ue,V)=>{V.exports=__af_ns12});var se={};te(se,{AutoFieldTreeDropdown:()=>h});var W=a(v(),1),d=a(g(),1),b=a(k(),1),j=a(P(),1),ve=y("@shoelace-style/shoelace/dist/components/tag/tag.js"),U=a(L(),1);var T=a(v(),1),l=a(g(),1),me=y("@shoelace-style/shoelace/dist/components/tree/tree.js"),fe=y("@shoelace-style/shoelace/dist/components/tree-item/tree-item.js");var C=a(g(),1),O=C.css`
    /* 自定义滚动条样式 */
    .scrollbar {
        /* Firefox - 默认隐藏 */
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        transition: scrollbar-color 0.3s ease;
        /* 常驻预留滚动条槽位：内容是否溢出都固定留白，
           避免 tab 切换时滚动条出现/消失导致容器宽度跳变 */
        scrollbar-gutter: stable;
    }

    /* Firefox - 悬停时显示 */
    .scrollbar:hover {
        scrollbar-color: var(--sl-color-neutral-300, #cbd5e1) transparent;
    }

    /* Webkit浏览器 (Chrome, Safari, Edge等) */
    .scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    /* 隐藏滚动条上下箭头按钮 */
    .scrollbar::-webkit-scrollbar-button {
        display: none;
        height: 0;
        width: 0;
    }

    .scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }

    .scrollbar::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 3px;
        transition: background-color 0.3s ease;
    }

    /* 仅在鼠标悬停时显示滚动条 */
    .scrollbar:hover::-webkit-scrollbar-thumb {
        background-color: var(--sl-color-neutral-300, #cbd5e1);
    }

    .scrollbar:hover::-webkit-scrollbar-thumb:hover {
        background-color: var(--sl-color-neutral-400, #94a3b8);
    }
`;var H=a(x(),1),R=a(S(),1),q=a(F(),1);var p=class extends T.AutoField{constructor(){super(...arguments);this.nodes=new q.AsyncOptionState(this,"items",e=>e?(this.selection=[],this._forEachTree(e,(r,t,i,n)=>{this.isItemSelected(r)&&(r.selected=!0,this.selection.push({id:r[this.options.idKey],value:r[this.options.valueKey],path:n.join("/")}))}),e):[]);this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label"}getInitialOptions(){return{items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:!1,maxItems:0,minItems:0,defaultExpandLevel:2,onlySelectLeaf:!1,showAsPath:!1,onSelectionChange:()=>{}}}isItemSelected(e){return this.value===void 0?!1:this.options.multiple===!1?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e,r){let t=(i,n,m,J)=>{let _=[...J,i[this.options.labelKey]];if(this.options.defaultExpandLevel>0&&m<this.options.defaultExpandLevel-1&&i.expanded===void 0&&(i.expanded=!0),r(i,n,m,_),i.children){let Q=m+1;i.children.forEach(X=>{t(X,i,Q,[..._])})}};(Array.isArray(e)?e:[e]).forEach(i=>{t(i,void 0,0,[])})}onSelectionChange(e){let r=Array.from(e.detail.selection);r&&(this.selection=r.map(t=>({id:t.dataset.id,value:t.dataset.value,path:t.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange())}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(e,r,t){let i=r.includes(e[this.options.valueKey]),n=[...t,e[this.options.labelKey]];return l.html`<sl-tree-item
            data-id=${String(e[this.options.idKey])}
            data-value=${String(e[this.options.valueKey])}
            data-path=${n.join("/")}
            ?selected=${i}
            ?expanded=${e.expanded}
        >
            ${(0,H.when)(e.icon,()=>l.html`<sl-icon name="${e.icon}"></sl-icon>`)} ${e.label}
            ${Array.isArray(e.children)?l.html`${e.children.map(m=>this._renderNode(m,r,n))}`:""}</sl-tree-item
        >`}_renderNodes(e){let r=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(t=>this._renderNode(t,r,[])):this._renderNode(e,r,[])}renderTree(){return l.html`
            ${this.nodes.render(e=>l.html`<sl-tree
                    class="scrollbar"
                    name="${this.name}"
                    data-path=${this.path}
                    size=${this.context.size}
                    selection="${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
                    @sl-selection-change=${this.onSelectionChange.bind(this)}
                    style="max-height:${this.options.height||"18em"};overflow:auto;"
                    >${this._renderNodes(e)}</sl-tree
                >`)}
            
        `}renderInput(){return l.html` ${this.renderTree()} `}};p.styles=[T.AutoField.styles,l.css`
            ${O}
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `],p=u([(0,R.tag)("auto-field-tree-select")],p);var B=a(x(),1),G=a(S(),1);var h=class extends p{constructor(){super(...arguments);this.active=!1}_onRemoveSelection(e){let r=e.target.dataset.id;for(let t=0;t<this.selection.length;t++)if(String(this.selection[t].id)===r){this.selection.splice(t,1),this.onFieldChange(),this.requestUpdate();break}e.stopPropagation()}getShowItemValue(e,r,t){if(r===t)return e}getSelectedTagValue(e){if(this.options.showAsPath)return d.html`${e.path}`;{let t=e.path.split("/");return t[t.length-1]}}renderSelectedTags(){let e=this.selection;return d.html`<span class="tags"
            >${(0,j.repeat)(e,r=>d.html`<sl-tag data-id="${r.id}" title=${r.path} @sl-remove=${this._onRemoveSelection.bind(this)} @click=${t=>t.stopPropagation()} removable
                    >${this.getSelectedTagValue(r)}</sl-tag
                >`)}</span
        >`}renderSelection(){return d.html` <div class="selection" slot="trigger">
            ${(0,B.when)(this.selection.length===0&&this.options.placeholder,()=>d.html`<span class="placeholder">${this.options.placeholder}</span>`)} ${this.renderSelectedTags()}
            <span class="suffix">
                <sl-icon library="system" class="chevron ${(0,U.classMap)({active:this.active})}" name="chevron-down" aria-hidden="true"> </sl-icon>
            </span>
        </div>`}_onShowPopup(){this.active=!0}_onHidePopup(){this.active=!1}renderInput(){return d.html`
            <sl-dropdown size="${this.context.size}" @sl-show="${this._onShowPopup.bind(this)}" @sl-after-hide="${this._onHidePopup.bind(this)}" sync="width" hoist>
                ${this.renderSelection()}
                <div>${this.renderTree()}</div>
            </sl-dropdown>
        `}};h.styles=[W.AutoField.styles,p.styles,d.css`
            sl-dropdown {
                width: 100%;
            }
            sl-tree {
                background-color: var(--sl-color-neutral-0);
            }
            .selection {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: solid var(--sl-input-border-width) var(--sl-input-border-color);
                font-size: var(--auto-font-size);
                min-height: var(--sl-input-height-medium);
                border-radius: var(--sl-input-border-radius-medium);
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                max-height: 12rem;
                overflow-y: auto;
                overflow-x: hidden;
                & > .tags {
                    flex-grow: 1;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                & > .suffix {
                    cursor: pointer;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                sl-tag {
                    margin-right: 0.5rem;
                    margin-top: 0.2rem;
                    margin-bottom: 0.2rem;
                }
            }
            sl-icon.chevron {
                transition: all 0.2s ease-in;
                &.active {
                    transform: rotate(-180deg);
                }
            }
            .placeholder {
                padding-left: 0.5rem;
                color: var(--sl-input-placeholder-color);
            }
        `],u([(0,b.state)()],h.prototype,"active",2),u([(0,b.query)("sl-tree")],h.prototype,"tree",2),h=u([(0,G.tag)("auto-field-tree-dropdown")],h);return re(se);})();
//# sourceMappingURL=tree-dropdown.global.js.map
