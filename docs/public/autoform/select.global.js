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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Select=(()=>{var E=Object.create;var u=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var N=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var g=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(i,e)=>(typeof require<"u"?require:i)[e]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var r=(t,i)=>()=>(i||t((i={exports:{}}).exports,i),i.exports),R=(t,i)=>{for(var e in i)u(t,e,{get:i[e],enumerable:!0})},y=(t,i,e,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of F(i))!P.call(t,o)&&o!==e&&u(t,o,{get:()=>i[o],enumerable:!(s=f(i,o))||s.enumerable});return t};var l=(t,i,e)=>(e=t!=null?E(N(t)):{},y(i||!t||!t.__esModule?u(e,"default",{value:t,enumerable:!0}):e,t)),W=t=>y(u({},"__esModule",{value:!0}),t),_=(t,i,e,s)=>{for(var o=s>1?void 0:s?f(i,e):i,p=t.length-1,d;p>=0;p--)(d=t[p])&&(o=(s?d(i,e,o):d(o))||o);return s&&o&&u(i,e,o),o};var $=r((J,x)=>{x.exports=__af_ns3});var O=r((Q,v)=>{v.exports=__af_ns9});var w=r((S,I)=>{I.exports=__af_ns0});var K=r((U,A)=>{A.exports=__af_ns7});var j=r((X,V)=>{V.exports=__af_ns6});var k=r((Y,M)=>{M.exports=__af_ns16});var D=r((Z,z)=>{z.exports=__af_ns11});var q=r((ee,T)=>{T.exports=__af_ns12});var C={};R(C,{AutoFieldSelect:()=>a});var c=l($(),1),h=l(O(),1),n=l(w(),1),te=g("@shoelace-style/shoelace/dist/components/select/select.js"),ie=g("@shoelace-style/shoelace/dist/components/option/option.js"),m=l(K(),1),b=l(j(),1),H=l(k(),1),L=l(D(),1),B=l(q(),1);var a=class extends h.AutoField{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";this.items=new B.AsyncOptionState(this,"choices",e=>!e||!Array.isArray(e)?[]:e.map(s=>{let o={};return typeof s=="object"?Object.assign(o,s):typeof s=="string"&&s.startsWith("-")?Object.assign(o,{type:"divider"}):Object.assign(o,{label:s}),o}))}getInitialOptions(){return{valueKey:"value",labelKey:"label",choices:[],multiple:!1,clearable:!0,maxOptionsVisible:0,placement:"top"}}_renderItem(e){let s=this.options.renderItem;return typeof s=="string"?n.html`${(0,b.unsafeHTML)(s.replace(/\{(.+?)\}/g,(o,p)=>e[p]))}`:typeof s=="function"?n.html`${(0,b.unsafeHTML)(s(e))}`:e.label||e.value}_onDropdownMenu(){}renderInput(){return n.html`
            <sl-select
                name="${this.name}"
                data-path="${this.path}"
                value="${this.getValue()}"
                ?multiple=${this.options.multiple}
                ?disabled=${!this.options.enable}
                ?clearable=${this.options.clearable}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?required=${this.options.required}
                placeholder="${(0,c.ifDefined)(this.options.placeholder)}"
                .maxOptionsVisible=${this.options.maxOptionsVisible}
                help-text="${(0,c.ifDefined)(this.options.help)}"
                .placement=${this.options.placement}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-show=${this._onDropdownMenu.bind(this)}
                hoist
            >
                
                ${(0,m.when)(this.items.loading,()=>n.html`<auto-loading></auto-loading>`,()=>n.html`${this.renderBeforeActions()}
                ${this.items.value.map(e=>e.type==="divider"?n.html`<sl-divider></sl-divider>`:n.html`<sl-option value="${e[this.valueKey]||e.label}" ?disabled=${!this.options.enable}>
                            <auto-flex class="item" gap="1em" align="center" grow="sl-icon + *,:first-child:not(sl-icon)" style="text-align:left;">
                                ${(0,m.when)(e.icon,()=>n.html`<sl-icon name="${e.icon}"></sl-icon>`)}
                                ${this._renderItem(e)}
                            </auto-flex>
                        </sl-option>`)}
                    ${this.renderAfterActions()}`)}
                
            </sl-select>
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};a.styles=[h.AutoField.styles,H.vars,n.css`
            .actions.before {
                position: sticky;
                top: 0;
                width: 100%;
                min-height: 1em;
                padding: 0.5em 0.5em;
                border-bottom: var(--auto-border);
                box-sizing: border-box;
                background-color: var(--auto-bgcolor);
                z-index: 9;
            }
            .actions.after {
                position: sticky;
                bottom: 0;
                width: 100%;
                min-height: 1em;
                padding: 0.5em 0.5em;
                border-top: var(--auto-border);
                box-sizing: border-box;
                background-color: var(--auto-bgcolor);
                z-index: 9;
            }
            sl-select::part(listbox) {
                padding: 0;
            } 
        `],a=_([(0,L.tag)("auto-field-select")],a);return W(C);})();
//# sourceMappingURL=select.global.js.map
