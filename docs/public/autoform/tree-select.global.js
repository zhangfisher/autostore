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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.TreeSelect=(()=>{var F=Object.create;var h=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,M=Object.prototype.hasOwnProperty;var m=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(s,e)=>(typeof require<"u"?require:s)[e]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var u=(t,s)=>()=>(s||t((s={exports:{}}).exports,s),s.exports),R=(t,s)=>{for(var e in s)h(t,e,{get:s[e],enumerable:!0})},g=(t,s,e,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of V(s))!M.call(t,r)&&r!==e&&h(t,r,{get:()=>s[r],enumerable:!(o=f(s,r))||o.enumerable});return t};var n=(t,s,e)=>(e=t!=null?F(j(t)):{},g(s||!t||!t.__esModule?h(e,"default",{value:t,enumerable:!0}):e,t)),W=t=>g(h({},"__esModule",{value:!0}),t),v=(t,s,e,o)=>{for(var r=o>1?void 0:o?f(s,e):s,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(o?i(s,e,r):i(r))||r);return o&&r&&h(s,e,r),r};var T=u((B,x)=>{x.exports=__af_ns9});var p=u((D,S)=>{S.exports=__af_ns0});var $=u((J,K)=>{K.exports=__af_ns7});var w=u((Q,A)=>{A.exports=__af_ns11});var I=u((U,k)=>{k.exports=__af_ns12});var H={};R(H,{AutoFieldTreeSelect:()=>d});var b=n(T(),1),l=n(p(),1),X=m("@shoelace-style/shoelace/dist/components/tree/tree.js"),Y=m("@shoelace-style/shoelace/dist/components/tree-item/tree-item.js");var N=n(p(),1),_=N.css`
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
`;var E=n($(),1),C=n(w(),1),L=n(I(),1);var d=class extends b.AutoField{constructor(){super(...arguments);this.nodes=new L.AsyncOptionState(this,"items",e=>e?(this.selection=[],this._forEachTree(e,(o,r,a,i)=>{this.isItemSelected(o)&&(o.selected=!0,this.selection.push({id:o[this.options.idKey],value:o[this.options.valueKey],path:i.join("/")}))}),e):[]);this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label"}getInitialOptions(){return{items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:!1,maxItems:0,minItems:0,defaultExpandLevel:2,onlySelectLeaf:!1,showAsPath:!1,onSelectionChange:()=>{}}}isItemSelected(e){return this.value===void 0?!1:this.options.multiple===!1?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e,o){let r=(a,i,c,O)=>{let y=[...O,a[this.options.labelKey]];if(this.options.defaultExpandLevel>0&&c<this.options.defaultExpandLevel-1&&a.expanded===void 0&&(a.expanded=!0),o(a,i,c,y),a.children){let P=c+1;a.children.forEach(z=>{r(z,a,P,[...y])})}};(Array.isArray(e)?e:[e]).forEach(a=>{r(a,void 0,0,[])})}onSelectionChange(e){let o=Array.from(e.detail.selection);o&&(this.selection=o.map(r=>({id:r.dataset.id,value:r.dataset.value,path:r.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange())}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(e,o,r){let a=o.includes(e[this.options.valueKey]),i=[...r,e[this.options.labelKey]];return l.html`<sl-tree-item
            data-id=${String(e[this.options.idKey])}
            data-value=${String(e[this.options.valueKey])}
            data-path=${i.join("/")}
            ?selected=${a}
            ?expanded=${e.expanded}
        >
            ${(0,E.when)(e.icon,()=>l.html`<sl-icon name="${e.icon}"></sl-icon>`)} ${e.label}
            ${Array.isArray(e.children)?l.html`${e.children.map(c=>this._renderNode(c,o,i))}`:""}</sl-tree-item
        >`}_renderNodes(e){let o=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(r=>this._renderNode(r,o,[])):this._renderNode(e,o,[])}renderTree(){return l.html`
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
            
        `}renderInput(){return l.html` ${this.renderTree()} `}};d.styles=[b.AutoField.styles,l.css`
            ${_}
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `],d=v([(0,C.tag)("auto-field-tree-select")],d);return W(H);})();
//# sourceMappingURL=tree-select.global.js.map
