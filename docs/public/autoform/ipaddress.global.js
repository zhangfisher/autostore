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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Ipaddress=(()=>{var T=Object.create;var c=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var y=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var m=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),w=(a,t)=>{for(var e in t)c(a,e,{get:t[e],enumerable:!0})},b=(a,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of y(t))!H.call(a,s)&&s!==e&&c(a,s,{get:()=>t[s],enumerable:!(n=f(t,s))||n.enumerable});return a};var g=(a,t,e)=>(e=a!=null?T(S(a)):{},b(t||!a||!a.__esModule?c(e,"default",{value:a,enumerable:!0}):e,a)),P=a=>b(c({},"__esModule",{value:!0}),a),I=(a,t,e,n)=>{for(var s=n>1?void 0:n?f(t,e):t,r=a.length-1,u;r>=0;r--)(u=a[r])&&(s=(n?u(t,e,s):u(s))||s);return n&&s&&c(t,e,s),s};var E=m((z,v)=>{v.exports=__af_ns9});var x=m((A,_)=>{_.exports=__af_ns11});var M=m((F,L)=>{L.exports=__af_ns0});var C={};w(C,{AutoFieldIpAddress:()=>o});var h=g(E(),1),$=g(x(),1),p=g(M(),1);var o=class extends h.AutoField{getInitialOptions(){return{size:"medium"}}_onPartFocus(t){t.target.select()}_getIpBits(){let t=this.value?.split(".");return[parseInt(t[0]||"0"),parseInt(t[1]||"0"),parseInt(t[2]||"0"),parseInt(t[3]||"0")]}_restrictSegment(t){let e=(t.value||"").replace(/\D/g,""),n=e===""?"":String(Math.min(parseInt(e,10),255));n!==t.value&&(t.value=n)}_onIpChange(t,e){let n=e.target;this._restrictSegment(n),e.type==="sl-change"&&n.value===""&&(n.value="0"),this.onFieldChange(),this._isLastInput(e)}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(e=>e.value||"0").join(".")}_isLastInput(t){let e=t.target;if(e.value.length>=3){e.blur();let n=e.nextElementSibling?.nextElementSibling;n&&(n.focus(),n.select())}}_onPaste(t){t.preventDefault();let e=t.target,n=t.clipboardData?.getData("text/plain")||"",s=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,r=n.match(s),u=r?.slice(1).every(i=>parseInt(i,10)<=255);if(!r||!u)return;let l=[],d=e;for(let i=0;i<4&&d;i++)d.tagName==="SL-INPUT"&&l.push(d),d=d.nextElementSibling?.nextElementSibling;for(let i=0;i<Math.min(4,l.length);i++)l[i].value=r[i+1],l[i].dispatchEvent(new Event("input",{bubbles:!0}));if(l.length>0){let i=l[Math.min(3,l.length-1)];i.focus(),i.select()}}renderInput(){return p.html`
            <auto-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((t,e)=>p.html`
                        <sl-input
                            value="${t}"
                            name=${this.name}
                            data-path=${this.path}
                            defaultValue="0"
                            size=${this.context.size}
                            maxLength="3"
                            inputmode="numeric"
                            ?disabled=${!this.options.enable}
                            @sl-input=${n=>this._onIpChange(e,n)}
                            @sl-change=${n=>this._onIpChange(e,n)}
                            @sl-focus=${this._onPartFocus.bind(this)}
                            @paste=${n=>this._onPaste(n)}
                        ></sl-input>
                        ${e<3?p.html`<span class="dot">.</span>`:""}
                    `)}
            </auto-flex>
        `}};o.styles=[h.AutoField.styles,p.css`
            span.dot {
                width: 1em;
                text-align: center;
                font-weight: bold;
            }
            sl-input::part(base) {
                border: none;
            }
            auto-flex {
                width: 15rem;
                justify-content: space-around;
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
                align-items: baseline;
                background-color: var(--auto-bgcolor);
            }
            sl-input {
                width: 2em;
            }
            sl-input::part(input) {
                text-align: center;
                padding: 0px 2px;
                padding-inline: 0px;
                letter-spacing: var(--sl-letter-spacing-denser);
            }
        `],o=I([(0,$.tag)("auto-field-ipaddress")],o);return P(C);})();
//# sourceMappingURL=ipaddress.global.js.map
