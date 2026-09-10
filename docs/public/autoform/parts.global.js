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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Parts=(()=>{var C=Object.create;var u=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var c=(r,s)=>()=>(s||r((s={exports:{}}).exports,s),s.exports),S=(r,s)=>{for(var t in s)u(r,t,{get:s[t],enumerable:!0})},m=(r,s,t,e)=>{if(s&&typeof s=="object"||typeof s=="function")for(let i of k(s))!L.call(r,i)&&i!==t&&u(r,i,{get:()=>s[i],enumerable:!(e=f(s,i))||e.enumerable});return r};var d=(r,s,t)=>(t=r!=null?C(D(r)):{},m(s||!r||!r.__esModule?u(t,"default",{value:r,enumerable:!0}):t,r)),$=r=>m(u({},"__esModule",{value:!0}),r),g=(r,s,t,e)=>{for(var i=e>1?void 0:e?f(s,t):s,a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=(e?n(s,t,i):n(i))||i);return e&&i&&u(s,t,i),i};var _=c((N,y)=>{y.exports=__af_ns0});var x=c((F,b)=>{b.exports=__af_ns4});var w=c((H,E)=>{E.exports=__af_ns9});var P=c((O,I)=>{I.exports=__af_ns11});var A={};S(A,{AutoFieldParts:()=>l});var p=d(_(),1),v=d(x(),1),h=d(w(),1),T=d(P(),1);var l=class extends h.AutoField{constructor(){super(...arguments);this.parts=[]}getInitialOptions(){return{template:"0000",delimiter:"",caseType:"both",includeDelimiter:!0,onlyNumber:!1}}_isValidChar(t){return this.options.chars?new RegExp(this.options.chars).test(t):!0}_onKeyDown(t){let e=t.key;e.length===1&&(this._isValidChar(e)||t.preventDefault(),t.stopPropagation())}_onPartInput(t){let i=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,o)=>(n+=o.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),a=0;this.parts.forEach((n,o)=>{this.options.delimiter.includes(n)||(this.parts[o]=i[a++])}),this.onFieldChange(),this._isLastInput(t)}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((t,e)=>this.options.delimiter.includes(e)?t:`${t}${e}`,"")}_isLastInput(t){let e=t.target;if(e.value.length>=1){e.blur();let i=e.nextElementSibling||e.nextElementSibling?.nextElementSibling;i&&(i.focus(),i.select())}}_onPaste(t){t.preventDefault();let e=t.clipboardData?.getData("text/plain")||"",i=this._parseParts(e),a=o=>{if(o){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let o of i)if(!this.options.delimiter.includes(o)&&(n.value=o,n=a(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value)}_parseParts(t){let e=this.options.delimiter,i=this.options.template,a=0;return Array.from(i).map(n=>{if(e.includes(n))return t[a]===n&&a++,n;{let o=t[a++]||n;return this.options.caseType==="upper"?o.toUpperCase():this.options.caseType==="lower"?o.toLowerCase():o}})}_onPartFocus(t){t.target.select()}renderPart(t){return p.html`<sl-input
            maxLength="1"
            .value=${t}
            noSpinButtons
            autocorrect="off"
            autocomplete="off"
            spellcheck="false"
            @paste=${e=>this._onPaste(e)}
            @sl-focus=${this._onPartFocus.bind(this)}
            @keydown=${this._onKeyDown.bind(this)}
            @sl-input=${this._onPartInput.bind(this)}
        ></sl-input>`}renderInput(){return p.html`
            <auto-flex grow="none" align="center" gap="0.5em" wrap>
                ${(0,v.repeat)(this.parts,t=>this.options.delimiter.includes(t)?p.html`${t}`:this.renderPart(t))}
            </auto-flex>
        `}};l.styles=[h.AutoField.styles,p.css`
            :host > .autofield {
                & > .value {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
            }
            sl-input {
                width: 3rem;
                height: 3rem;
                line-height: 3rem;
                text-align: center;
            }
            sl-input::part(input) {
                text-align: center;
            }
            sl-input::part(input)::selection {
                background: none;
            }
            sl-input::part(input):focus {
                background-color: var(--t-color-theme--1, var(--sl-color-primary-100));
            }
        `],l=g([(0,T.tag)("auto-field-parts")],l);return $(A);})();
//# sourceMappingURL=parts.global.js.map
