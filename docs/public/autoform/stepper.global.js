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
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Stepper=(()=>{var B=Object.create;var b=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var x=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),D=(n,t)=>{for(var e in t)b(n,e,{get:t[e],enumerable:!0})},A=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of W(t))!E.call(n,s)&&s!==e&&b(n,s,{get:()=>t[s],enumerable:!(i=S(t,s))||i.enumerable});return n};var f=(n,t,e)=>(e=n!=null?B(M(n)):{},A(t||!n||!n.__esModule?b(e,"default",{value:n,enumerable:!0}):e,n)),q=n=>A(b({},"__esModule",{value:!0}),n),$=(n,t,e,i)=>{for(var s=i>1?void 0:i?S(t,e):t,o=n.length-1,p;o>=0;o--)(p=n[o])&&(s=(i?p(t,e,s):p(s))||s);return i&&s&&b(t,e,s),s};var y=x((H,O)=>{O.exports=__af_ns0});var _=x((j,w)=>{w.exports=__af_ns3});var T=x((R,N)=>{N.exports=__af_ns9});var v=x((G,C)=>{C.exports=__af_ns11});var U={};D(U,{AutoFieldStepper:()=>c});var a=f(y(),1),l=f(_(),1);var u=f(_(),1),I=f(T(),1),g=f(y(),1),L=f(v(),1);var d=class extends I.AutoField{constructor(){super(...arguments);this._prefix="";this._suffix=""}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix()}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return{inputType:"input"}}getPrefix(){if(this.options.icon)return g.html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=s=>s.map(o=>typeof o=="string"?o:o.value||o.label),i=(s,o,p=!0)=>{if(Array.isArray(o)&&o.length>0){let k=e(o),m=-1;k.some((r,F)=>{if(p&&this.value.startsWith(r)||!p&&this.value.endsWith(r))return p?(this._prefix=r,this.value=this.value.substring(r.length)):(this._suffix=r,this.value=this.value.substring(0,this.value.length-r.length)),m=F,!0});let z=m===-1?"?":typeof o[m]=="string"?o[m]:o[m].label,h={type:o.length===1?"button":"dropdown",label:z,caret:!p};h.type==="dropdown"?h.items=o.map(r=>(r==="-"||(r=typeof r=="string"?{label:r}:r,r.onClick=()=>{p?this._prefix=r.value??r.label:this._suffix=r.value??r.label,this.onFieldChange()}),r)):typeof o[0]=="string"?h.label=o[0]:Object.assign(h,o[0]),h.syncMenu=!0,h.pos=p?"before":"after",p?s.splice(0,0,h):s.push(h)}};this.options.prefix&&i(this.beforeActions,this.options.prefix),this.options.suffix&&i(this.afterActions,this.options.suffix,!1)}onInputChange(e){let i=e.type;i.includes("input")?this.onFieldInput():i.includes("change")&&this.onFieldChange()}onInputBlur(e){this.context.validAt==="lost-focus"&&this.onFieldChange()}renderInput(){return g.html`
            <sl-input
                slot="value"
                type="${this.getInputType()}"
                .value=${this.value}
                name=${this.name}
                data-path=${this.path}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?clearable=${this.options.clearable}
                ?required=${this.options.required}
                size=${this.context.size}
                placeholder=${(0,u.ifDefined)(this.options.placeholder)}
                pattern=${(0,u.ifDefined)(this.options.pattern)}
                minLength=${(0,u.ifDefined)(this.options.minLength)}
                maxLength=${(0,u.ifDefined)(this.options.maxLength)}
                max=${(0,u.ifDefined)(this.options.max)}
                min=${(0,u.ifDefined)(this.options.min)}
                step=${(0,u.ifDefined)(this.options.step)}
                ?disabled=${!this.options.enable}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${(0,u.ifDefined)(this.options.spellcheck)}
            >
                ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input
            >
        `}toState(e){let i=super.toState(e);return typeof i=="string"&&(this._prefix&&(i=this._prefix+i),this._suffix&&(i=i+this._suffix)),i}toInput(e){let i=super.toInput(e);return typeof i=="string"&&(this._prefix&&i.startsWith(this._prefix)&&(i=i.substring(this._prefix.length)),this._suffix&&i.endsWith(this._suffix)&&(i=i.substring(0,i.length-this._suffix.length))),i}};d.styles=[I.AutoField.styles,g.css`
            .actions {
                margin-right: 0px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .actions > sl-button {
                margin: 0px;
            }
            .actions.before {
                margin-left: 0px;
            }
            .actions.before sl-button::part(base) {
                border-left: none;
                border-radius: 0px;
            }
            .actions.after sl-button::part(base) {
                border-right: none;
                border-radius: 0px;
            }
        `],d=$([(0,L.tag)("auto-field-input")],d);var P=f(v(),1);var c=class extends d{getInputType(){return"number"}getInitialOptions(){return{step:1}}_initPrefixAndSuffix(){}getStep(){return Number(this.options.step)||1}getPrecision(){if(this.options.precision!==void 0)return this.options.precision;let t=String(this.getStep()),e=t.indexOf(".");return e===-1?0:t.length-e-1}_fixPrecision(t){let e=this.getPrecision();return Number(t.toFixed(e))}_stepValue(t){let e=typeof this.value=="number"&&!Number.isNaN(this.value)?this.value:0,i=this.options.min!==void 0?Number(this.options.min):-1/0,s=this.options.max!==void 0?Number(this.options.max):1/0;return this._fixPrecision(Math.min(Math.max(e+t*this.getStep(),i),s))}_onStep(t){if(this.options.readOnly||!this.options.enable)return;let e=this._stepValue(t);this.input&&(this.input.value=String(e)),this.onFieldChange()}_isStepDisabled(t){if(this.options.readOnly||!this.options.enable)return!0;let e=typeof this.value=="number"&&!Number.isNaN(this.value)?this.value:0;return t===1?this.options.max!==void 0&&e>=Number(this.options.max):this.options.min!==void 0&&e<=Number(this.options.min)}_renderStepButton(t){return a.html`<sl-button
            class="stepper-btn"
            size=${this.context.size}
            title=${t===1?"\u589E\u52A0":"\u51CF\u5C11"}
            ?disabled=${this._isStepDisabled(t)}
            @click=${()=>this._onStep(t)}
        >
            <sl-icon name=${t===1?"plus":"minus"}></sl-icon>
        </sl-button>`}renderBeforeActions(t){return a.html`<div
            class="actions before"
            part="before-actions"
            slot="${t?"prefix":void 0}"
        >
            ${this._renderStepButton(-1)}
        </div>`}renderAfterActions(t){return a.html`<div
            class="actions after"
            part="after-actions"
            slot="${t?"suffix":void 0}"
        >
            ${this._renderStepButton(1)}
        </div>`}_renderUnitPrefix(){return this.options.prefix?a.html`<span slot="prefix">${this.options.prefix}</span>`:""}_renderUnitSuffix(){return this.options.suffix?a.html`<span slot="suffix">${this.options.suffix}</span>`:""}renderInput(){return a.html`
            <sl-input
                slot="value"
                type="${this.getInputType()}"
                .value=${this.value}
                name=${this.name}
                data-path=${this.path}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?clearable=${this.options.clearable}
                ?required=${this.options.required}
                size=${this.context.size}
                placeholder=${(0,l.ifDefined)(this.options.placeholder)}
                pattern=${(0,l.ifDefined)(this.options.pattern)}
                minLength=${(0,l.ifDefined)(this.options.minLength)}
                maxLength=${(0,l.ifDefined)(this.options.maxLength)}
                max=${(0,l.ifDefined)(this.options.max)}
                min=${(0,l.ifDefined)(this.options.min)}
                step=${(0,l.ifDefined)(this.options.step)}
                ?disabled=${!this.options.enable}
                ?readonly=${this.options.readOnly}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${(0,l.ifDefined)(this.options.spellcheck)}
            >
                ${this.renderBeforeActions(!0)}${this.getPrefix()}${this._renderUnitPrefix()}${this._renderUnitSuffix()}${this.getSuffix()}${this.renderAfterActions(!0)}</sl-input
            >
        `}renderView(){return a.html`<span>${this.options.prefix??""}${this.value}${this.options.suffix??""}</span>`}};c.styles=[d.styles,a.css`
            /* sl-input 宽度由 width 选项控制（写宿主 inline style），默认 12em；
               显式设置 width 时输入框撑满宿主宽度 */
            sl-input {
                width: 12em;
            }
            :host([style*="width"]) sl-input {
                width: 100%;
            }
            /* 数值内容居中 + 隐藏原生 spinner（与自定义 +/- 按钮功能重复） */
            sl-input::part(input) {
                text-align: center;
                -moz-appearance: textfield;
                appearance: textfield;
            }
            sl-input::part(input)::-webkit-outer-spin-button,
            sl-input::part(input)::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            /* +/- 按钮紧凑：label 水平内边距收窄 */
            .actions sl-button.stepper-btn::part(label) {
                padding-left: 0.5em;
                padding-right: 0.5em;
            }
            .actions sl-button.stepper-btn {
                --sl-button-font-size: var(--auto-font-size);
            }
            .actions sl-button.stepper-btn sl-icon {
                font-size: var(--auto-font-size);
            }
        `],c=$([(0,P.tag)("auto-field-stepper")],c);return q(U);})();
//# sourceMappingURL=stepper.global.js.map
