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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.DateRange=(()=>{var C=Object.create;var a=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var O=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty;var o=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),w=(t,e)=>{for(var i in e)a(t,i,{get:e[i],enumerable:!0})},f=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of D(e))!q.call(t,n)&&n!==i&&a(t,n,{get:()=>e[n],enumerable:!(s=m(e,n))||s.enumerable});return t};var p=(t,e,i)=>(i=t!=null?C(O(t)):{},f(e||!t||!t.__esModule?a(i,"default",{value:t,enumerable:!0}):i,t)),z=t=>f(a({},"__esModule",{value:!0}),t),c=(t,e,i,s)=>{for(var n=s>1?void 0:s?m(e,i):e,d=t.length-1,u;d>=0;d--)(u=t[d])&&(n=(s?u(e,i,n):u(n))||n);return s&&n&&a(e,i,n),n};var g=o((M,_)=>{_.exports=__af_ns1});var $=o((j,v)=>{v.exports=__af_ns9});var y=o((H,x)=>{x.exports=__af_ns0});var I=o((L,b)=>{b.exports=__af_ns11});var E={};w(E,{AutoFieldDateRange:()=>r});var A=p(g(),1),h=p($(),1),l=p(y(),1),T=p(I(),1);var r=class extends h.AutoField{getInitialOptions(){return{icon:"date",delimiter:",",includeTime:!1}}_onInputChange(e){let i=e.type;this.context.validAt==="input"&&i.includes("input")?this.onFieldInput():i.includes("change")&&this.onFieldChange()}_getDate(e){return(Array.isArray(this.value)?this.value:this.value.split(this.options.delimiter))[e]}_renderIcon(){if(this.options.icon)return l.html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}_renderDate(e){return l.html`<sl-input
            type="${this.options.includeTime?"datetime-local":"date"}"
            .value=${this._getDate(e)}
            size=${this.context.size}
            ?disabled=${!this.options.enable}
            @sl-input=${this._onInputChange.bind(this)}
            @sl-change=${this._onInputChange.bind(this)}
            ?filled=${this.options.filled}
            ?pill=${this.options.pill}
            ?clearable=${this.options.clearable}
            ?required=${this.options.required}
            >${this._renderIcon()}</sl-input
        >`}renderInput(){return l.html`
            <div class="dates">
                ${this._renderDate(0)}
                <span class="sp">-</span>
                ${this._renderDate(1)}
            </div>
        `}getInputValue(){let e=Array.from(this.inputs||[]).map(i=>i.value);return Array.isArray(this.value)?e:e.join(this.options.delimiter)}};r.styles=[h.AutoField.styles,l.css`
            .dates {
                display: flex;
                align-items: center;
                flex-direction: row;
                & > sl-input {
                    flex-grow: 1;
                }
                & > .sp {
                    padding: 0.5em;
                }
            }
        `],c([(0,A.queryAll)("sl-input")],r.prototype,"inputs",2),r=c([(0,T.tag)("auto-field-date-range")],r);return z(E);})();
//# sourceMappingURL=date-range.global.js.map
