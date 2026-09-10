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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Cascader=(()=>{var F=Object.create;var _=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var y=(l,r)=>()=>(r||l((r={exports:{}}).exports,r),r.exports),G=(l,r)=>{for(var e in r)_(l,e,{get:r[e],enumerable:!0})},A=(l,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of T(r))!H.call(l,i)&&i!==e&&_(l,i,{get:()=>r[i],enumerable:!(t=x(r,i))||t.enumerable});return l};var p=(l,r,e)=>(e=l!=null?F(W(l)):{},A(r||!l||!l.__esModule?_(e,"default",{value:l,enumerable:!0}):e,l)),J=l=>A(_({},"__esModule",{value:!0}),l),f=(l,r,e,t)=>{for(var i=t>1?void 0:t?x(r,e):r,s=l.length-1,n;s>=0;s--)(n=l[s])&&(i=(t?n(r,e,i):n(i))||i);return t&&i&&_(r,e,i),i};var z=y((Y,L)=>{L.exports=__af_ns9});var $=y((Z,R)=>{R.exports=__af_ns10});var S=y((ee,k)=>{k.exports=__af_ns11});var O=y((te,w)=>{w.exports=__af_ns0});var E=y((se,C)=>{C.exports=__af_ns1});var j=y((ie,D)=>{D.exports=__af_ns3});var V=y((ne,q)=>{q.exports=__af_ns4});var U=y((oe,P)=>{P.exports=__af_ns7});var Q={};G(Q,{AutoFieldCascader:()=>h});var M=p(z(),1),b=p($(),1),N=p(S(),1),c=p(O(),1),g=p(E(),1),v=p(j(),1),K=p(V(),1),I=p(U(),1);var h=class extends b.AutoDropdownField{constructor(){super(...arguments);this.active=!1;this.data={};this.level=3;this.selected=[];this.focusItems=[]}getInitialOptions(){return Object.assign(super.getInitialOptions(),{idKey:"id",rootKey:"$root",labelKey:"label",maxLevel:3,childrenKey:"children",choices:{}})}getFieldOptions(){let e=super.getFieldOptions();return e.valueKey||(e.valueKey=e.idKey),e.idKey||(e.idKey=e.labelKey),e}_registerChildren(e,t){e.forEach(i=>{let s=i[this.options.childrenKey||"children"];Array.isArray(s)&&s.length>0&&t<this.options.maxLevel&&this._registerChildren(s,t+1)}),this._normalizeLevel(e,t)}_normalizeLevel(e,t){e.forEach(i=>{let s=i[this.options.idKey];if(s==null)return;let n=i[this.options.childrenKey||"children"];Array.isArray(n)&&n.length>0&&t<this.options.maxLevel?this.data[s]=n:this.data[s]=[]})}connectedCallback(){super.connectedCallback(),this._initChoices(),this.selected=this._parseValues(this.value),this.focusItems=Array.from({length:this.options.maxLevel-1}).fill(null)}_initChoices(){let e=this.options.choices;if(typeof e=="function"){this._applyAsyncChoices(e());return}if(e&&typeof e.then=="function"){this._applyAsyncChoices(e);return}let t=typeof e=="object"&&e!==null&&this.options.childrenKey in e;t&&(this.options.rootKey=e[this.options.idKey]),this.data=t||Array.isArray(e)?this._normalizeData(e):{}}_applyAsyncChoices(e){this.data={},e&&typeof e.then=="function"?e.then(t=>{Array.isArray(t)&&t.length>0&&(this.data=this._normalizeData(t),this._markRootLazy(),this.requestUpdate())}):Array.isArray(e)&&(this.data=this._normalizeData(e),this._markRootLazy())}_markRootLazy(){typeof this.options.onLoad=="function"&&(this.data[this.options.rootKey]||[]).forEach(e=>{e.lazy===void 0&&!this._hasRegisteredChildren(e)&&(e.lazy="idle")})}_normalizeData(e){let t={},i=(s,n=!1)=>{let a=s[this.options.idKey]||(n?"$root":void 0);if(!a)return;let o=s[this.options.childrenKey||"children"];o&&Array.isArray(o)&&o.length>0?(t[a]=o,n&&(t.$root=o),o.forEach(d=>{i(d)})):t[a]=[]};return Array.isArray(e)?t.$root=e.reduce((s,n)=>(s.push(n),i(n),s),[]):i(e,!0),t}_clearFocusItems(e){for(let t=e;t<=this.options.maxLevel;t++)Array.from(this.shadow.querySelectorAll(`[data-level='${t}']`)).forEach(s=>{s.classList.remove("focused")})}_onSelectItem(e){let t=e.detail.item,i=Number(t.dataset.level);if(i!==this.options.maxLevel)return;let s=[...this.focusItems.slice(0,i-1),t.dataset.id],n=[],a=(d,u)=>{let m=this.data[u].findIndex(B=>String(B[this.options.idKey])===String(d));if(m>-1)return[this.data[u][m][this.options.labelKey],this.data[u][m][this.options.valueKey]]},o=this.options.rootKey;for(let d=0;d<s.length;d++){let u=s[d],m=a(u,o);if(!m)return;n.push([u,...m]),o=u}this.selected=n,this.onFieldChange()}_getSelectedValue(e){let t=[],i=(n,a)=>{let o=this.data[a].findIndex(d=>String(d[this.options.idKey])===String(n));if(o>-1)return this.data[a][o][this.options.valueKey]},s=this.options.rootKey;for(let n=0;n<e.length;n++){let a=e[n],o=i(a,s);if(!o)return;t.push(o),s=a}return t}getInputValue(){let e=this.selected.map(t=>t[2]);return typeof this.value=="string"?e.join(this.options.delimiter||""):e}async _loadItem(e,t){let i=this._findItemById(e);if(i){if(Array.isArray(this.data[e])&&this.data[e].length>0){i.lazy="done",this.requestUpdate();return}if(typeof this.options.onLoad!="function"){i.lazy="done",this.requestUpdate();return}i.lazy="loading",this.requestUpdate();try{let s=await this.options.onLoad(e);Array.isArray(s)&&(this.data[e]=s,this._registerChildren(s,t),s.forEach(n=>{n.lazy===void 0&&t<this.options.maxLevel-1&&!this._hasRegisteredChildren(n)&&(n.lazy="idle")})),i.lazy="done"}catch{i.lazy="idle"}finally{this.requestUpdate()}}}_findItemById(e){for(let t of Object.values(this.data)){let i=t?.find(s=>String(s[this.options.idKey])===String(e));if(i)return i}}_hasRegisteredChildren(e){let t=e[this.options.childrenKey||"children"];return Array.isArray(t)&&t.length>0}_onItemMouseOverr(e){let t=e.target,i=t.dataset.id,s=Number(t.dataset.level);if(this.focusItems[s-1]===i)return;this._clearFocusItems(s),t.classList.add("focused"),this._findItemById(i)?.lazy==="idle"&&this._loadItem(i,s),this.focusItems[s-1]=i,this.focusItems.forEach((a,o)=>{o>s-1&&(this.focusItems[o]=null)}),this.focusItems=[...this.focusItems]}_renderLevel(e,t=1,i){if(e)return c.html`<sl-menu class="level" @sl-select=${t===this.options.maxLevel?this._onSelectItem.bind(this):null}>
            ${(0,K.repeat)(e,s=>{let n=this.selected[t-1]?.[0]===s[this.options.idKey];return c.html` <sl-menu-item
                    type="checkbox"
                    data-level=${t}
                    data-id=${s[this.options.idKey]}
                    data-pid=${(0,v.ifDefined)(i)}
                    data-lazy=${(0,v.ifDefined)(s.lazy||void 0)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${n}
                    class="${(0,v.ifDefined)(n?"selected":void 0)}"
                >
                    ${s[this.options.labelKey]}
                    ${(0,I.when)(t<this.options.maxLevel,()=>c.html`${(0,I.when)(s.lazy==="loading",()=>c.html`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}
                </sl-menu-item>`})}
        </sl-menu>`}_parseValues(e){let t=[],i=[];if(Array.isArray(e))t=e;else if(e&&typeof e=="string")if(this.options.delimiter&&this.options.delimiter.length>0)t=e.split(this.options.delimiter);else{let s=this.data[this.options.rootKey],n=e;for(;;){let a=s.find(o=>n.startsWith(o[this.options.valueKey]));if(a){if(t.push(a[this.options.valueKey]),n=n.substring(a[this.options.valueKey].length),s=this.data[a[this.options.idKey]],!s)break}else break}}if(t.length>0){let s=this.data[this.options.rootKey];for(let n=0;n<t.length;n++){let a=t[n],o=s.find(d=>d[this.options.valueKey]===a);if(o){if(i.push([o[this.options.idKey],o[this.options.labelKey],o[this.options.valueKey]]),s=this.data[o[this.options.idKey]],!s)break}else break}}return i}renderSelection(){return c.html`
            ${this.selected.map(e=>e[1]).join(this.options.delimiter||"")}
        `}renderDropdown(){let e=this.data[this.options.rootKey],t=this.focusItems;return c.html`<div class="levels">
            ${(0,K.repeat)(Array.from({length:this.options.maxLevel}),(i,s)=>{if(s===0)return this._renderLevel(e,s+1,this.options.rootKey);{let n=t[s-1],a=this.data[n];return a?this._renderLevel(a,s+1,n):this._renderLevel([],s+1,n)}})}
        </div>`}};h.styles=[M.AutoField.styles,b.AutoDropdownField.styles,c.css`
            .levels {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                gap: 0;
                max-height: 20em;
                border: var(--auto-border);
                & > sl-menu.level {
                    flex-grow: 1;
                    flex-basis: 0;
                    padding: 0;
                    border-radius: 0;
                    padding: 0.5em;
                    border: none;
                    border-right: var(--auto-border);
                }
                & > sl-menu.level:last-child {
                    border-right: none;
                }
            }
            sl-menu-item::part(submenu-icon) {
                display: none;
            }
            sl-menu-item.focused::part(base) {
                color: var(--auto-theme-color);
            }
            sl-menu-item.selected::part(base) {
                background-color: var(--auto-bgcolor);
            }
            sl-menu-item[data-lazy='idle'] {
                sl-spinner {
                    display: none;
                }
            }
            sl-menu-item[data-lazy='loading'] {
                sl-spinner {
                    display: inline-block;
                }
                sl-icon[slot='suffix'] {
                    display: none;
                }
            }
            sl-menu-item[data-lazy='done'] {
                sl-spinner {
                    display: none;
                }
            }
            .popoup-container.dropdown {
                                
            }
            .popoup-container.dropdown > .levels {
                border: none;
            }
        `],f([(0,g.state)()],h.prototype,"active",2),f([(0,g.state)()],h.prototype,"data",2),f([(0,g.state)()],h.prototype,"level",2),f([(0,g.state)()],h.prototype,"selected",2),f([(0,g.state)()],h.prototype,"focusItems",2),h=f([(0,N.tag)("auto-field-cascader")],h);return J(Q);})();
//# sourceMappingURL=cascader.global.js.map
