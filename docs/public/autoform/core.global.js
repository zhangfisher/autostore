var AutoFormCoreExports=(function(exports){'use strict';var Di=Object.defineProperty;var Dl=Object.getOwnPropertyDescriptor;var he=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var q=(t,e)=>{for(var r in e)Di(t,r,{get:e[r],enumerable:true});};var w=(t,e,r,o)=>{for(var s=o>1?void 0:o?Dl(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&Di(e,r,s),s};var qi={};q(qi,{customElement:()=>ss,eventOptions:()=>gs,property:()=>h,query:()=>k,queryAll:()=>Xl,queryAssignedElements:()=>bs,queryAssignedNodes:()=>Jl,queryAsync:()=>Zl,standardProperty:()=>Wi,state:()=>P});var ss=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};var Ii=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(e){this.ariaActiveDescendantElement=null,this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColIndexText="",this.ariaColSpan="",this.ariaControlsElements=null,this.ariaCurrent="",this.ariaDescribedByElements=null,this.ariaDescription="",this.ariaDetailsElements=null,this.ariaDisabled="",this.ariaErrorMessageElements=null,this.ariaExpanded="",this.ariaFlowToElements=null,this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLabelledByElements=null,this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaOwnsElements=null,this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRelevant="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowIndexText="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=e;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var Rt=function(t,e,r,o,s){if(typeof e=="function"?t!==e||true:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(t,r),r},J=function(t,e,r,o){if(typeof e=="function"?t!==e||!o:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?o:r==="a"?o.call(t):o?o.value:e.get(t)},Ve,ro,oo,lr,is,cr,so,de,ur,oe,io,Vi,zi=t=>typeof t=="boolean"?t:t?.capture??false;var ns=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(e,r,o){if(r==null)return;let s=zi(o)?this.__captureEventListeners:this.__eventListeners,i=s.get(e);if(i===void 0)i=new Map,s.set(e,i);else if(i.has(r))return;let n=typeof o=="object"&&o?o:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(e,r,o)),i.set(r,n??{});}removeEventListener(e,r,o){if(r==null)return;let s=zi(o)?this.__captureEventListeners:this.__eventListeners,i=s.get(e);i!==void 0&&(i.delete(r),i.size||s.delete(e));}dispatchEvent(e){let r=[this],o=this.__eventTargetParent;if(e.composed)for(;o;)r.push(o),o=o.__eventTargetParent;else for(;o&&o!==this.__host;)r.push(o),o=o.__eventTargetParent;let s=false,i=false,n=0,a=null,l=null,c=null,u=e.stopPropagation,p=e.stopImmediatePropagation;Object.defineProperties(e,{target:{get(){return a??l},...R},srcElement:{get(){return e.target},...R},currentTarget:{get(){return c},...R},eventPhase:{get(){return n},...R},composedPath:{value:()=>r,...R},stopPropagation:{value:()=>{s=true,u.call(e);},...R},stopImmediatePropagation:{value:()=>{i=true,p.call(e);},...R}});let m=(v,A,O)=>{typeof v=="function"?v(e):typeof v?.handleEvent=="function"&&v.handleEvent(e),A.once&&O.delete(v);},f=()=>(c=null,n=0,!e.defaultPrevented),g=r.slice().reverse();a=!this.__host||!e.composed?this:null;let y=v=>{for(l=this;l.__host&&v.includes(l.__host);)l=l.__host;};for(let v of g){!a&&(!l||l===v.__host)&&y(g.slice(g.indexOf(v))),c=v,n=v===e.target?2:1;let A=v.__captureEventListeners.get(e.type);if(A){for(let[O,j]of A)if(m(O,j,A),i)return f()}if(s)return f()}let S=e.bubbles?r:[this];l=null;for(let v of S){!a&&(!l||v===l.__host)&&y(S.slice(0,S.indexOf(v)+1)),c=v,n=v===e.target?2:3;let A=v.__eventListeners.get(e.type);if(A){for(let[O,j]of A)if(m(O,j,A),i)return f()}if(s)return f()}return f()}},as=ns;var R={__proto__:null};R.enumerable=true;Object.freeze(R);var ls=(oe=class{constructor(e,r={}){if(Ve.set(this,false),ro.set(this,false),oo.set(this,false),lr.set(this,false),is.set(this,Date.now()),cr.set(this,false),so.set(this,void 0),de.set(this,void 0),ur.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof r!="object"||!r)throw new Error('The "options" argument must be an object');let{bubbles:o,cancelable:s,composed:i}=r;Rt(this,Ve,!!s),Rt(this,ro,!!o),Rt(this,oo,!!i),Rt(this,so,`${e}`),Rt(this,de,null),Rt(this,ur,false);}initEvent(e,r,o){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){Rt(this,lr,true);}get target(){return J(this,de,"f")}get currentTarget(){return J(this,de,"f")}get srcElement(){return J(this,de,"f")}get type(){return J(this,so,"f")}get cancelable(){return J(this,Ve,"f")}get defaultPrevented(){return J(this,Ve,"f")&&J(this,lr,"f")}get timeStamp(){return J(this,is,"f")}composedPath(){return J(this,ur,"f")?[J(this,de,"f")]:[]}get returnValue(){return !J(this,Ve,"f")||!J(this,lr,"f")}get bubbles(){return J(this,ro,"f")}get composed(){return J(this,oo,"f")}get eventPhase(){return J(this,ur,"f")?oe.AT_TARGET:oe.NONE}get cancelBubble(){return J(this,cr,"f")}set cancelBubble(e){e&&Rt(this,cr,true);}stopPropagation(){Rt(this,cr,true);}get isTrusted(){return  false}},Ve=new WeakMap,ro=new WeakMap,oo=new WeakMap,lr=new WeakMap,is=new WeakMap,cr=new WeakMap,so=new WeakMap,de=new WeakMap,ur=new WeakMap,oe.NONE=0,oe.CAPTURING_PHASE=1,oe.AT_TARGET=2,oe.BUBBLING_PHASE=3,oe);Object.defineProperties(ls.prototype,{initEvent:R,stopImmediatePropagation:R,preventDefault:R,target:R,currentTarget:R,srcElement:R,type:R,cancelable:R,defaultPrevented:R,timeStamp:R,composedPath:R,returnValue:R,bubbles:R,composed:R,eventPhase:R,cancelBubble:R,stopPropagation:R,isTrusted:R});var Bi=(Vi=class extends ls{constructor(e,r={}){super(e,r),io.set(this,void 0),Rt(this,io,r?.detail??null);}initCustomEvent(e,r,o,s){throw new Error("Method not implemented.")}get detail(){return J(this,io,"f")}},io=new WeakMap,Vi);Object.defineProperties(Bi.prototype,{detail:R});var cs=ls,us=Bi;var lt;(lt=class{constructor(){this.STYLE_RULE=1,this.CHARSET_RULE=2,this.IMPORT_RULE=3,this.MEDIA_RULE=4,this.FONT_FACE_RULE=5,this.PAGE_RULE=6,this.NAMESPACE_RULE=10,this.KEYFRAMES_RULE=7,this.KEYFRAME_RULE=8,this.SUPPORTS_RULE=12,this.COUNTER_STYLE_RULE=11,this.FONT_FEATURE_VALUES_RULE=14,this.__parentStyleSheet=null,this.cssText="";}get parentRule(){return null}get parentStyleSheet(){return this.__parentStyleSheet}get type(){return 0}},lt.STYLE_RULE=1,lt.CHARSET_RULE=2,lt.IMPORT_RULE=3,lt.MEDIA_RULE=4,lt.FONT_FACE_RULE=5,lt.PAGE_RULE=6,lt.NAMESPACE_RULE=10,lt.KEYFRAMES_RULE=7,lt.KEYFRAME_RULE=8,lt.SUPPORTS_RULE=12,lt.COUNTER_STYLE_RULE=11,lt.FONT_FEATURE_VALUES_RULE=14,lt);globalThis.Event??=cs;globalThis.CustomEvent??=us;var ji=new WeakMap,pr=t=>{let e=ji.get(t);return e===void 0&&ji.set(t,e=new Map),e},Il=class extends as{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(pr(this)).map(([e,r])=>({name:e,value:r}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(e,r){pr(this).set(e,String(r));}removeAttribute(e){pr(this).delete(e);}toggleAttribute(e,r){if(this.hasAttribute(e)){if(r===void 0||!r)return this.removeAttribute(e),false}else return r===void 0||r?(this.setAttribute(e,""),true):false;return  true}hasAttribute(e){return pr(this).has(e)}attachShadow(e){let r={host:this};return this.__shadowRootMode=e.mode,e&&e.mode==="open"&&(this.__shadowRoot=r),r}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let e=new Ii(this);return this.__internals=e,e}getAttribute(e){return pr(this).get(e)??null}};var Vl=class extends Il{},hs=Vl;globalThis.litServerRoot??=Object.defineProperty(new hs,"localName",{get(){return "lit-server-root"}});function zl(){let t,e;return {promise:new Promise((o,s)=>{t=o,e=s;}),resolve:t,reject:e}}var ps=class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map;}define(e,r){if(this.__definitions.has(e))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${e}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${e}" has already been used with this registry`);if(this.__reverseDefinitions.has(r))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(r)}`);r.__localName=e,this.__definitions.set(e,{ctor:r,observedAttributes:r.observedAttributes??[]}),this.__reverseDefinitions.set(r,e),this.__pendingWhenDefineds.get(e)?.resolve(r),this.__pendingWhenDefineds.delete(e);}get(e){return this.__definitions.get(e)?.ctor}getName(e){return this.__reverseDefinitions.get(e)??null}upgrade(e){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(e){let r=this.__definitions.get(e);if(r)return r.ctor;let o=this.__pendingWhenDefineds.get(e);return o||(o=zl(),this.__pendingWhenDefineds.set(e,o)),o.promise}},Bl=ps;var Ni=new Bl;var hr=globalThis,dr=hr.ShadowRoot&&(hr.ShadyCSS===void 0||hr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ds=Symbol(),Fi=new WeakMap,ze=class{constructor(e,r,o){if(this._$cssResult$=true,o!==ds)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r;}get styleSheet(){let e=this.o,r=this.t;if(dr&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=Fi.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Fi.set(r,e));}return e}toString(){return this.cssText}},fs=t=>new ze(typeof t=="string"?t:t+"",void 0,ds),x=(t,...e)=>{let r=t.length===1?t[0]:e.reduce((o,s,i)=>o+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new ze(r,t,ds)},ms=(t,e)=>{if(dr)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(let r of e){let o=document.createElement("style"),s=hr.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,t.appendChild(o);}},no=dr||hr.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return fs(r)})(t):t;var{is:jl,defineProperty:Nl,getOwnPropertyDescriptor:Fl,getOwnPropertyNames:Hl,getOwnPropertySymbols:Ul,getPrototypeOf:Wl}=Object,mr=globalThis;mr.customElements??=Ni;var Hi=mr.trustedTypes,ql=Hi?Hi.emptyScript:"",Gl=mr.reactiveElementPolyfillSupport,fr=(t,e)=>t,Ft={toAttribute(t,e){switch(e){case Boolean:t=t?ql:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t);}catch{r=null;}}return r}},gr=(t,e)=>!jl(t,e),Ui={attribute:true,type:String,converter:Ft,reflect:false,useDefault:false,hasChanged:gr};Symbol.metadata??=Symbol("metadata"),mr.litPropertyMetadata??=new WeakMap;var Pt=class extends(globalThis.HTMLElement??hs){static addInitializer(e){this._$Ei(),(this.l??=[]).push(e);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Ui){if(r.state&&(r.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=true),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,r);s!==void 0&&Nl(this.prototype,e,s);}}static getPropertyDescriptor(e,r,o){let{get:s,set:i}=Fl(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n;}};return {get:s,set(n){let a=s?.call(this);i?.call(this,n),this.requestUpdate(e,a,o);},configurable:true,enumerable:true}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ui}static _$Ei(){if(this.hasOwnProperty(fr("elementProperties")))return;let e=Wl(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties);}static finalize(){if(this.hasOwnProperty(fr("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(fr("properties"))){let r=this.properties,o=[...Hl(r),...Ul(r)];for(let s of o)this.createProperty(s,r[s]);}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s);}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)r.unshift(no(s));}else e!==void 0&&r.push(no(e));return r}static _$Eu(e,r){let o=r.attribute;return o===false?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this));}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.();}removeController(e){this._$EO?.delete(e);}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e);}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ms(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(e=>e.hostConnected?.());}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.());}attributeChangedCallback(e,r,o){this._$AK(e,o);}_$ET(e,r){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===true){let i=(o.converter?.toAttribute!==void 0?o.converter:Ft).toAttribute(r,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null;}}_$AK(e,r){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Ft;this._$Em=s;let a=n.fromAttribute(r,i.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null;}}requestUpdate(e,r,o,s=false,i){if(e!==void 0){let n=this.constructor;if(s===false&&(i=this[e]),o??=n.getPropertyOptions(e),!((o.hasChanged??gr)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,o))))return;this.C(e,r,o);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(e,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),i!==true||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),s===true&&this._$Em!==e&&(this._$Eq??=new Set).add(e));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(r){Promise.reject(r);}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0;}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,a=this[s];n!==true||this._$AL.has(s)||a===void 0||this.C(s,void 0,i,a);}}let e=false,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(r)):this._$EM();}catch(o){throw e=false,this._$EM(),o}e&&this._$AE(r);}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(e)),this.updated(e);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return  true}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM();}updated(e){}firstUpdated(e){}};Pt.elementStyles=[],Pt.shadowRootOptions={mode:"open"},Pt[fr("elementProperties")]=new Map,Pt[fr("finalized")]=new Map,Gl?.({ReactiveElement:Pt}),(mr.reactiveElementVersions??=[]).push("2.1.2");var Kl={attribute:true,type:String,converter:Ft,reflect:false,hasChanged:gr},Wi=(t=Kl,e,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=true),i.set(r.name,t),o==="accessor"){let{name:n}=r;return {set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t,true,a);},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(o==="setter"){let{name:n}=r;return function(a){let l=this[n];e.call(this,a),this.requestUpdate(n,l,t,true,a);}}throw Error("Unsupported decorator location: "+o)};function h(t){return (e,r)=>typeof r=="object"?Wi(t,e,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}function P(t){return h({...t,state:true,attribute:false})}function gs(t){return (e,r)=>{let o=typeof e=="function"?e:e[r];Object.assign(o,t);}}var St=(t,e,r)=>(r.configurable=true,r.enumerable=true,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function k(t,e){return (r,o,s)=>{let i=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:a}=typeof o=="object"?r:s??(()=>{let l=Symbol();return {get(){return this[l]},set(c){this[l]=c;}}})();return St(r,o,{get(){let l=n.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return St(r,o,{get(){return i(this)}})}}var Yl;function Xl(t){return (e,r)=>St(e,r,{get(){return (this.renderRoot??(Yl??=document.createDocumentFragment())).querySelectorAll(t)}})}function Zl(t){return (e,r)=>St(e,r,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(t)??null}})}function bs(t){return (e,r)=>{let{slot:o,selector:s}=t??{},i="slot"+(o?`[name=${o}]`:":not([name])");return St(e,r,{get(){let n=this.renderRoot?.querySelector(i),a=n?.assignedElements(t)??[];return s===void 0?a:a.filter(l=>l.matches(s))}})}}function Jl(t){return (e,r)=>{let{slot:o}=t??{},s="slot"+(o?`[name=${o}]`:":not([name])");return St(e,r,{get(){return this.renderRoot?.querySelector(s)?.assignedNodes(t)??[]}})}}var sn={};q(sn,{CSSResult:()=>ze,LitElement:()=>H,ReactiveElement:()=>Pt,_$LE:()=>rc,_$LH:()=>Es,adoptStyles:()=>ms,css:()=>x,defaultConverter:()=>Ft,getCompatibleStyle:()=>no,html:()=>b,isServer:()=>ph,mathml:()=>As,noChange:()=>F,notEqual:()=>gr,nothing:()=>D,render:()=>Cs,supportsAdoptingStyleSheets:()=>dr,svg:()=>Ss,unsafeCSS:()=>fs});var fo=globalThis,Gi=t=>t,ao=fo.trustedTypes,Ki=ao?ao.createPolicy("lit-html",{createHTML:t=>t}):void 0,ys="$lit$",Ht=`lit$${Math.random().toFixed(9).slice(2)}$`,ws="?"+Ht,Ql=`<${ws}>`,ge=fo.document===void 0?{createTreeWalker:()=>({})}:document,vr=()=>ge.createComment(""),yr=t=>t===null||typeof t!="object"&&typeof t!="function",_s=Array.isArray,tn=t=>_s(t)||typeof t?.[Symbol.iterator]=="function",vs=`[ 	
\f\r]`,br=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yi=/-->/g,Xi=/>/g,fe=RegExp(`>|${vs}(?:([^\\s"'>=/]+)(${vs}*=${vs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zi=/'/g,Ji=/"/g,en=/^(?:script|style|textarea|title)$/i,xs=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),b=xs(1),Ss=xs(2),As=xs(3),F=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),Qi=new WeakMap,me=ge.createTreeWalker(ge,129);function rn(t,e){if(!_s(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ki!==void 0?Ki.createHTML(e):e}var on=(t,e)=>{let r=t.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=br;for(let a=0;a<r;a++){let l=t[a],c,u,p=-1,m=0;for(;m<l.length&&(n.lastIndex=m,u=n.exec(l),u!==null);)m=n.lastIndex,n===br?u[1]==="!--"?n=Yi:u[1]!==void 0?n=Xi:u[2]!==void 0?(en.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=fe):u[3]!==void 0&&(n=fe):n===fe?u[0]===">"?(n=s??br,p=-1):u[1]===void 0?p=-2:(p=n.lastIndex-u[2].length,c=u[1],n=u[3]===void 0?fe:u[3]==='"'?Ji:Zi):n===Ji||n===Zi?n=fe:n===Yi||n===Xi?n=br:(n=fe,s=void 0);let f=n===fe&&t[a+1].startsWith("/>")?" ":"";i+=n===br?l+Ql:p>=0?(o.push(c),l.slice(0,p)+ys+l.slice(p)+Ht+f):l+Ht+(p===-2?a:f);}return [rn(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},wr=class t{constructor({strings:e,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,a=e.length-1,l=this.parts,[c,u]=on(e,r);if(this.el=t.createElement(c,o),me.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes);}for(;(s=me.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(ys)){let m=u[n++],f=s.getAttribute(p).split(Ht),g=/([.?@])?(.*)/.exec(m);l.push({type:1,index:i,name:g[2],strings:f,ctor:g[1]==="."?co:g[1]==="?"?uo:g[1]==="@"?po:ve}),s.removeAttribute(p);}else p.startsWith(Ht)&&(l.push({type:6,index:i}),s.removeAttribute(p));if(en.test(s.tagName)){let p=s.textContent.split(Ht),m=p.length-1;if(m>0){s.textContent=ao?ao.emptyScript:"";for(let f=0;f<m;f++)s.append(p[f],vr()),me.nextNode(),l.push({type:2,index:++i});s.append(p[m],vr());}}}else if(s.nodeType===8)if(s.data===ws)l.push({type:2,index:i});else {let p=-1;for(;(p=s.data.indexOf(Ht,p+1))!==-1;)l.push({type:7,index:i}),p+=Ht.length-1;}i++;}}static createElement(e,r){let o=ge.createElement("template");return o.innerHTML=e,o}};function be(t,e,r=t,o){if(e===F)return e;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=yr(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(false),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(e=be(t,s._$AS(t,e.values),s,o)),e}var lo=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:o}=this._$AD,s=(e?.creationScope??ge).importNode(r,true);me.currentNode=s;let i=me.nextNode(),n=0,a=0,l=o[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new Be(i,i.nextSibling,this,e):l.type===1?c=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(c=new ho(i,this,e)),this._$AV.push(c),l=o[++a];}n!==l?.index&&(i=me.nextNode(),n++);}return me.currentNode=ge,s}p(e){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++;}},Be=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,s){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??true;}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=be(this,e,r),yr(e)?e===D||e==null||e===""?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==F&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):tn(e)?this.k(e):this._(e);}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e));}_(e){this._$AH!==D&&yr(this._$AH)?this._$AA.nextSibling.data=e:this.T(ge.createTextNode(e)),this._$AH=e;}$(e){let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=wr.createElement(rn(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else {let i=new lo(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i;}}_$AC(e){let r=Qi.get(e.strings);return r===void 0&&Qi.set(e.strings,r=new wr(e)),r}k(e){_s(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of e)s===r.length?r.push(o=new t(this.O(vr()),this.O(vr()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s);}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(false,true,r);e!==this._$AB;){let o=Gi(e).nextSibling;Gi(e).remove(),e=o;}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e));}},ve=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,s,i){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=D;}_$AI(e,r=this,o,s){let i=this.strings,n=false;if(i===void 0)e=be(this,e,r,0),n=!yr(e)||e!==this._$AH&&e!==F,n&&(this._$AH=e);else {let a=e,l,c;for(e=i[0],l=0;l<i.length-1;l++)c=be(this,a[o+l],r,l),c===F&&(c=this._$AH[l]),n||=!yr(c)||c!==this._$AH[l],c===D?e=D:e!==D&&(e+=(c??"")+i[l+1]),this._$AH[l]=c;}n&&!s&&this.j(e);}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"");}},co=class extends ve{constructor(){super(...arguments),this.type=3;}j(e){this.element[this.name]=e===D?void 0:e;}},uo=class extends ve{constructor(){super(...arguments),this.type=4;}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D);}},po=class extends ve{constructor(e,r,o,s,i){super(e,r,o,s,i),this.type=5;}_$AI(e,r=this){if((e=be(this,e,r,0)??D)===F)return;let o=this._$AH,s=e===D&&o!==D||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==D&&(o===D||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e;}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e);}},ho=class{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o;}get _$AU(){return this._$AM._$AU}_$AI(e){be(this,e);}},Es={M:ys,P:Ht,A:ws,C:1,L:on,R:lo,D:tn,V:be,I:Be,H:ve,N:uo,U:po,B:co,F:ho},tc=fo.litHtmlPolyfillSupport;tc?.(wr,Be),(fo.litHtmlVersions??=[]).push("3.3.2");var Cs=(t,e,r)=>{let o=r?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new Be(e.insertBefore(vr(),i),i,void 0,r??{});}return s._$AI(t),s};var Os=globalThis,H=class extends Pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Cs(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return F}};H._$litElement$=true,H.finalized=true,Os.litElementHydrateSupport?.({LitElement:H});var ec=Os.litElementPolyfillSupport;ec?.({LitElement:H});var rc={_$AK:(t,e,r)=>{t._$AK(e,r);},_$AL:t=>t._$AL};(Os.litElementVersions??=[]).push("4.2.2");var ph=true;var nn={};q(nn,{tag:()=>ht});function ht(t){return e=>customElements.get(t)?e:ss(t)(e)}var an=x`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;var ln=x`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;var ks="";function cn(t){ks=t;}function un(t=""){if(!ks){let e=[...document.getElementsByTagName("script")],r=e.find(o=>o.hasAttribute("data-shoelace"));if(r)cn(r.getAttribute("data-shoelace"));else {let o=e.find(i=>/shoelace(\.min)?\.js($|\?)/.test(i.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(i.src)),s="";o&&(s=o.getAttribute("src")),cn(s.split("/").slice(0,-1).join("/"));}}return ks.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var oc={name:"default",resolver:t=>un(`assets/icons/${t}.svg`)},pn=oc;var hn={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},sc={name:"system",resolver:t=>t in hn?`data:image/svg+xml,${encodeURIComponent(hn[t])}`:""},dn=sc;var mo=[pn,dn],go=[];function Ts(t){go.push(t);}function $s(t){go=go.filter(e=>e!==t);}function je(t){return mo.find(e=>e.name===t)}function Rs(t,e){fn(t),mo.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),go.forEach(r=>{r.library===t&&r.setIcon();});}function fn(t){mo=mo.filter(e=>e.name!==t);}var mn=x`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;var vn=Object.defineProperty,ic=Object.defineProperties,nc=Object.getOwnPropertyDescriptor,ac=Object.getOwnPropertyDescriptors,gn=Object.getOwnPropertySymbols,lc=Object.prototype.hasOwnProperty,cc=Object.prototype.propertyIsEnumerable,Ps=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Ls=t=>{throw TypeError(t)},bn=(t,e,r)=>e in t?vn(t,e,{enumerable:true,configurable:true,writable:true,value:r}):t[e]=r,rt=(t,e)=>{for(var r in e||(e={}))lc.call(e,r)&&bn(t,r,e[r]);if(gn)for(var r of gn(e))cc.call(e,r)&&bn(t,r,e[r]);return t},Ut=(t,e)=>ic(t,ac(e)),d=(t,e,r,o)=>{for(var s=o>1?void 0:o?nc(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&vn(e,r,s),s},yn=(t,e,r)=>e.has(t)||Ls("Cannot "+r),wn=(t,e,r)=>(yn(t,e,"read from private field"),e.get(t)),_n=(t,e,r)=>e.has(t)?Ls("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),xn=(t,e,r,o)=>(yn(t,e,"write to private field"),e.set(t,r),r),uc=function(t,e){this[0]=t,this[1]=e;},Sn=t=>{var e=t[Ps("asyncIterator")],r=false,o,s={};return e==null?(e=t[Ps("iterator")](),o=i=>s[i]=n=>e[i](n)):(e=e.call(t),o=i=>s[i]=n=>{if(r){if(r=false,i==="throw")throw n;return n}return r=true,{done:false,value:new uc(new Promise(a=>{var l=e[i](n);l instanceof Object||Ls("Object expected"),a(l);}),1)}}),s[Ps("iterator")]=()=>s,o("next"),"throw"in e?o("throw"):s.throw=i=>{throw i},"return"in e&&o("return"),s};function z(t,e){let r=rt({waitUntilFirstUpdate:false},e);return (o,s)=>{let{update:i}=o,n=Array.isArray(t)?t:[t];o.update=function(a){n.forEach(l=>{let c=l;if(a.has(c)){let u=a.get(c),p=this[c];u!==p&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](u,p);}}),i.call(this,a);};}}var I=x`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;var bo,T=class extends H{constructor(){super(),_n(this,bo,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e);});}emit(t,e){let r=new CustomEvent(t,rt({bubbles:true,cancelable:false,composed:true,detail:{}},e));return this.dispatchEvent(r),r}static define(t,e=this,r={}){let o=customElements.get(t);if(!o){try{customElements.define(t,e,r);}catch{customElements.define(t,class extends e{},r);}return}let s=" (unknown version)",i=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in o&&o.version&&(i=" v"+o.version),!(s&&i&&s===i)&&console.warn(`Attempted to register <${t}>${s}, but <${t}>${i} has already been registered.`);}attributeChangedCallback(t,e,r){wn(this,bo)||(this.constructor.elementProperties.forEach((o,s)=>{o.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s]);}),xn(this,bo,true)),super.attributeChangedCallback(t,e,r);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,r)=>{t.has(r)&&this[r]==null&&(this[r]=e);});}};bo=new WeakMap;T.version="2.20.1";T.dependencies={};d([h()],T.prototype,"dir",2);d([h()],T.prototype,"lang",2);var{I:pc}=Es,An=t=>t;var Cn=(t,e)=>t?._$litType$!==void 0;var On=t=>t.strings===void 0,En=()=>document.createComment(""),Ne=(t,e,r)=>{let o=t._$AA.parentNode,s=e===void 0?t._$AB:e._$AA;if(r===void 0){let i=o.insertBefore(En(),s),n=o.insertBefore(En(),s);r=new pc(i,n,t,t.options);}else {let i=r._$AB.nextSibling,n=r._$AM,a=n!==t;if(a){let l;r._$AQ?.(t),r._$AM=t,r._$AP!==void 0&&(l=t._$AU)!==n._$AU&&r._$AP(l);}if(i!==s||a){let l=r._$AA;for(;l!==i;){let c=An(l).nextSibling;An(o).insertBefore(l,s),l=c;}}}return r},se=(t,e,r=t)=>(t._$AI(e,r),t),hc={},vo=(t,e=hc)=>t._$AH=e,kn=t=>t._$AH,yo=t=>{t._$AR(),t._$AA.remove();};var _r=Symbol(),wo=Symbol(),Ms,Ds=new Map,Y=class extends T{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,e){var r;let o;if(e?.spriteSheet)return this.svg=b`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?_r:wo}catch{return wo}try{let s=document.createElement("div");s.innerHTML=await o.text();let i=s.firstElementChild;if(((r=i?.tagName)==null?void 0:r.toLowerCase())!=="svg")return _r;Ms||(Ms=new DOMParser);let a=Ms.parseFromString(i.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):_r}catch{return _r}}connectedCallback(){super.connectedCallback(),Ts(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),$s(this);}getIconSource(){let t=je(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:e,fromLibrary:r}=this.getIconSource(),o=r?je(this.library):void 0;if(!e){this.svg=null;return}let s=Ds.get(e);if(s||(s=this.resolveIcon(e,o),Ds.set(e,s)),!this.initialRender)return;let i=await s;if(i===wo&&Ds.delete(e),e===this.getIconSource().url){if(Cn(i)){if(this.svg=i,o){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n);}return}switch(i){case wo:case _r:this.svg=null,this.emit("sl-error");break;default:this.svg=i.cloneNode(true),(t=o?.mutator)==null||t.call(o,this.svg),this.emit("sl-load");}}}render(){return this.svg}};Y.styles=[I,mn];d([P()],Y.prototype,"svg",2);d([h({reflect:true})],Y.prototype,"name",2);d([h()],Y.prototype,"src",2);d([h()],Y.prototype,"label",2);d([h({reflect:true})],Y.prototype,"library",2);d([z("label")],Y.prototype,"handleLabelChange",1);d([z(["name","src","library"])],Y.prototype,"setIcon",1);var it={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Lt=t=>(...e)=>({_$litDirective$:t,values:e}),ft=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o;}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var L=Lt(class extends ft{constructor(t){if(super(t),t.type!==it.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let r=t.element.classList;for(let o of this.st)o in e||(r.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)));}return F}});var Is=Symbol.for(""),dc=t=>{if(t?.r===Is)return t?._$litStatic$},$n=t=>({_$litStatic$:t,r:Is}),Fe=(t,...e)=>({_$litStatic$:e.reduce((r,o,s)=>r+(i=>{if(i._$litStatic$!==void 0)return i._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[s+1],t[0]),r:Is}),Tn=new Map,Vs=t=>(e,...r)=>{let o=r.length,s,i,n=[],a=[],l,c=0,u=false;for(;c<o;){for(l=e[c];c<o&&(i=r[c],(s=dc(i))!==void 0);)l+=s+e[++c],u=true;c!==o&&a.push(i),n.push(l),c++;}if(c===o&&n.push(e[o]),u){let p=n.join("$$lit$$");(e=Tn.get(p))===void 0&&(n.raw=n,Tn.set(p,e=n)),r=a;}return t(e,...r)},ie=Vs(b);var _=t=>t??D;var X=class extends T{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,e=t?Fe`a`:Fe`button`;return ie`
      <${e}
        part="base"
        class=${L({"icon-button":true,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${_(t?void 0:this.disabled)}
        type=${_(t?void 0:"button")}
        href=${_(t?this.href:void 0)}
        target=${_(t?this.target:void 0)}
        download=${_(t?this.download:void 0)}
        rel=${_(t&&this.target?"noreferrer noopener":void 0)}
        role=${_(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${_(this.name)}
          library=${_(this.library)}
          src=${_(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};X.styles=[I,ln];X.dependencies={"sl-icon":Y};d([k(".icon-button")],X.prototype,"button",2);d([P()],X.prototype,"hasFocus",2);d([h()],X.prototype,"name",2);d([h()],X.prototype,"library",2);d([h()],X.prototype,"src",2);d([h()],X.prototype,"href",2);d([h()],X.prototype,"target",2);d([h()],X.prototype,"download",2);d([h()],X.prototype,"label",2);d([h({type:Boolean,reflect:true})],X.prototype,"disabled",2);var zs=new Set,He=new Map,ye,Bs="ltr",js="en",Rn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Rn){let t=new MutationObserver(Pn);Bs=document.documentElement.dir||"ltr",js=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function xr(...t){t.map(e=>{let r=e.$code.toLowerCase();He.has(r)?He.set(r,Object.assign(Object.assign({},He.get(r)),e)):He.set(r,e),ye||(ye=e);}),Pn();}function Pn(){Rn&&(Bs=document.documentElement.dir||"ltr",js=document.documentElement.lang||navigator.language),[...zs.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var _o=class{constructor(e){this.host=e,this.host.addController(this);}hostConnected(){zs.add(this.host);}hostDisconnected(){zs.delete(this.host);}dir(){return `${this.host.dir||Bs}`.toLowerCase()}lang(){return `${this.host.lang||js}`.toLowerCase()}getTranslationData(e){var r,o;let s=new Intl.Locale(e.replace(/_/g,"-")),i=s?.language.toLowerCase(),n=(o=(r=s?.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&o!==void 0?o:"",a=He.get(`${i}-${n}`),l=He.get(i);return {locale:s,language:i,region:n,primary:a,secondary:l}}exists(e,r){var o;let{primary:s,secondary:i}=this.getTranslationData((o=r.lang)!==null&&o!==void 0?o:this.lang());return r=Object.assign({includeFallback:false},r),!!(s&&s[e]||i&&i[e]||r.includeFallback&&ye&&ye[e])}term(e,...r){let{primary:o,secondary:s}=this.getTranslationData(this.lang()),i;if(o&&o[e])i=o[e];else if(s&&s[e])i=s[e];else if(ye&&ye[e])i=ye[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i=="function"?i(...r):i}date(e,r){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),r).format(e)}number(e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),r).format(e)}relativeTime(e,r,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,r)}};var Ln={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};xr(Ln);var Mn=Ln;var ot=class extends _o{};xr(Mn);var fc=0,mt=class extends T{constructor(){super(...arguments),this.localize=new ot(this),this.attrId=++fc,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=false,this.closable=false,this.disabled=false,this.tabIndex=0;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab");}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close");}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0;}render(){return this.id=this.id.length>0?this.id:this.componentId,b`
      <div
        part="base"
        class=${L({tab:true,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?b`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};mt.styles=[I,an];mt.dependencies={"sl-icon-button":X};d([k(".tab")],mt.prototype,"tab",2);d([h({reflect:true})],mt.prototype,"panel",2);d([h({type:Boolean,reflect:true})],mt.prototype,"active",2);d([h({type:Boolean,reflect:true})],mt.prototype,"closable",2);d([h({type:Boolean,reflect:true})],mt.prototype,"disabled",2);d([h({type:Number,reflect:true})],mt.prototype,"tabIndex",2);d([z("active")],mt.prototype,"handleActiveChange",1);d([z("disabled")],mt.prototype,"handleDisabledChange",1);mt.define("sl-tab");var Dn=x`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;var In=x`
  :host {
    display: contents;
  }
`;var Sr=class extends T{constructor(){super(...arguments),this.observedElements=[],this.disabled=false;}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}});}),this.disabled||this.startObserver();}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver();}handleSlotChange(){this.disabled||this.startObserver();}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let e=t.assignedElements({flatten:true});this.observedElements.forEach(r=>this.resizeObserver.unobserve(r)),this.observedElements=[],e.forEach(r=>{this.resizeObserver.observe(r),this.observedElements.push(r);});}}stopObserver(){this.resizeObserver.disconnect();}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver();}render(){return b` <slot @slotchange=${this.handleSlotChange}></slot> `}};Sr.styles=[I,In];d([h({type:Boolean,reflect:true})],Sr.prototype,"disabled",2);d([z("disabled",{waitUntilFirstUpdate:true})],Sr.prototype,"handleDisabledChange",1);function mc(t,e){return {top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function Ns(t,e,r="vertical",o="smooth"){let s=mc(t,e),i=s.top+e.scrollTop,n=s.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,u=e.scrollTop+e.offsetHeight;(r==="horizontal"||r==="both")&&(n<a?e.scrollTo({left:n,behavior:o}):n+t.clientWidth>l&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:o})),(r==="vertical"||r==="both")&&(i<c?e.scrollTo({top:i,behavior:o}):i+t.clientHeight>u&&e.scrollTo({top:i-e.offsetHeight+t.clientHeight,behavior:o}));}var Z=class extends T{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new ot(this),this.hasScrollControls=false,this.shouldHideScrollStartButton=false,this.shouldHideScrollEndButton=false,this.placement="top",this.activation="auto",this.noScrollControls=false,this.fixedScrollControls=false,this.scrollOffset=1;}connectedCallback(){let t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls();}),this.mutationObserver=new MutationObserver(e=>{let r=e.filter(({target:o})=>{if(o===this)return  true;if(o.closest("sl-tab-group")!==this)return  false;let s=o.tagName.toLowerCase();return s==="sl-tab"||s==="sl-tab-panel"});if(r.length!==0){if(r.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels()),r.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(r.some(o=>o.attributeName==="active")){let s=r.filter(i=>i.attributeName==="active"&&i.target.tagName.toLowerCase()==="sl-tab").map(i=>i.target).find(i=>i.active);s&&this.setActiveTab(s);}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:true,attributeFilter:["active","disabled","name","panel"],childList:true,subtree:true}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((r,o)=>{var s;r[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((s=this.getActiveTab())!=null?s:this.tabs[0],{emitEvents:false}),o.unobserve(r[0].target));}).observe(this.tabGroup);});});}disconnectedCallback(){var t,e;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect(),this.nav&&((e=this.resizeObserver)==null||e.unobserve(this.nav));}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return [...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let r=t.target.closest("sl-tab");r?.closest("sl-tab-group")===this&&r!==null&&this.setActiveTab(r,{scrollBehavior:"smooth"});}handleKeyDown(t){let r=t.target.closest("sl-tab");if(r?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&r!==null&&(this.setActiveTab(r,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){let s=this.tabs.find(a=>a.matches(":focus")),i=this.localize.dir()==="rtl",n=null;if(s?.tagName.toLowerCase()==="sl-tab"){if(t.key==="Home")n=this.focusableTabs[0];else if(t.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(i?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){let a=this.tabs.findIndex(l=>l===s);n=this.findNextFocusableTab(a,"backward");}else if(["top","bottom"].includes(this.placement)&&t.key===(i?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){let a=this.tabs.findIndex(l=>l===s);n=this.findNextFocusableTab(a,"forward");}if(!n)return;n.tabIndex=0,n.focus({preventScroll:true}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(a=>{a.tabIndex=a===n?0:-1;}),["top","bottom"].includes(this.placement)&&Ns(n,this.nav,"horizontal"),t.preventDefault();}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"});}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"});}setActiveTab(t,e){if(e=rt({emitEvents:true,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){let r=this.activeTab;this.activeTab=t,this.tabs.forEach(o=>{o.active=o===this.activeTab,o.tabIndex=o===this.activeTab?0:-1;}),this.panels.forEach(o=>{var s;return o.active=o.name===((s=this.activeTab)==null?void 0:s.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Ns(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(r&&this.emit("sl-tab-hide",{detail:{name:r.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}));}}setAriaLabels(){this.tabs.forEach(t=>{let e=this.panels.find(r=>r.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")));});}repositionIndicator(){let t=this.getActiveTab();if(!t)return;let e=t.clientWidth,r=t.clientHeight,o=this.localize.dir()==="rtl",s=this.getAllTabs(),n=s.slice(0,s.indexOf(t)).reduce((a,l)=>({left:a.left+l.clientWidth,top:a.top+l.clientHeight}),{left:0,top:0});switch(this.placement){case "top":case "bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=o?`${ -1*n.left}px`:`${n.left}px`;break;case "start":case "end":this.indicator.style.width="auto",this.indicator.style.height=`${r}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls());}findNextFocusableTab(t,e){let r=null,o=e==="forward"?1:-1,s=t+o;for(;t<this.tabs.length;){if(r=this.tabs[s]||null,r===null){e==="forward"?r=this.focusableTabs[0]:r=this.focusableTabs[this.focusableTabs.length-1];break}if(!r.disabled)break;s+=o;}return r}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd());}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=false:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons();}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none";}show(t){let e=this.tabs.find(r=>r.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"});}render(){let t=this.localize.dir()==="rtl";return b`
      <div
        part="base"
        class=${L({"tab-group":true,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?b`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${L({"tab-group__scroll-button":true,"tab-group__scroll-button--start":true,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?b`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${L({"tab-group__scroll-button":true,"tab-group__scroll-button--end":true,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};Z.styles=[I,Dn];Z.dependencies={"sl-icon-button":X,"sl-resize-observer":Sr};d([k(".tab-group")],Z.prototype,"tabGroup",2);d([k(".tab-group__body")],Z.prototype,"body",2);d([k(".tab-group__nav")],Z.prototype,"nav",2);d([k(".tab-group__indicator")],Z.prototype,"indicator",2);d([P()],Z.prototype,"hasScrollControls",2);d([P()],Z.prototype,"shouldHideScrollStartButton",2);d([P()],Z.prototype,"shouldHideScrollEndButton",2);d([h()],Z.prototype,"placement",2);d([h()],Z.prototype,"activation",2);d([h({attribute:"no-scroll-controls",type:Boolean})],Z.prototype,"noScrollControls",2);d([h({attribute:"fixed-scroll-controls",type:Boolean})],Z.prototype,"fixedScrollControls",2);d([gs({passive:true})],Z.prototype,"updateScrollButtons",1);d([z("noScrollControls",{waitUntilFirstUpdate:true})],Z.prototype,"updateScrollControls",1);d([z("placement",{waitUntilFirstUpdate:true})],Z.prototype,"syncIndicator",1);Z.define("sl-tab-group");var gc=(t,e)=>{let r=0;return function(...o){window.clearTimeout(r),r=window.setTimeout(()=>{t.call(this,...o);},e);}},Vn=(t,e,r)=>{let o=t[e];t[e]=function(...s){o.call(this,...s),r.call(this,o,...s);};};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){let e=new Set,r=new WeakMap,o=i=>{for(let n of i.changedTouches)e.add(n.identifier);},s=i=>{for(let n of i.changedTouches)e.delete(n.identifier);};document.addEventListener("touchstart",o,true),document.addEventListener("touchend",s,true),document.addEventListener("touchcancel",s,true),Vn(EventTarget.prototype,"addEventListener",function(i,n){if(n!=="scrollend")return;let a=gc(()=>{e.size?a():this.dispatchEvent(new Event("scrollend"));},100);i.call(this,"scroll",a,{passive:true}),r.set(this,a);}),Vn(EventTarget.prototype,"removeEventListener",function(i,n){if(n!=="scrollend")return;let a=r.get(this);a&&i.call(this,"scroll",a,{passive:true});});}})();var zn=x`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`;var bc=0,Ue=class extends T{constructor(){super(...arguments),this.attrId=++bc,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=false;}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel");}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true");}render(){return b`
      <slot
        part="base"
        class=${L({"tab-panel":true,"tab-panel--active":this.active})}
      ></slot>
    `}};Ue.styles=[I,zn];d([h({reflect:true})],Ue.prototype,"name",2);d([h({type:Boolean,reflect:true})],Ue.prototype,"active",2);d([z("active")],Ue.prototype,"handleActiveChange",1);Ue.define("sl-tab-panel");Y.define("sl-icon");var Bn=x`
:root,
:host,
.sl-theme-light {
    color-scheme: light;
    --sl-color-gray-50: var(--t-color-gray-0, hsl(0 0% 97.5%));
    --sl-color-gray-100: var(--t-color-gray-1, hsl(240 4.8% 95.9%));
    --sl-color-gray-200: var(--t-color-gray-2, hsl(240 5.9% 90%));
    --sl-color-gray-300: var(--t-color-gray-3, hsl(240 4.9% 83.9%));
    --sl-color-gray-400: var(--t-color-gray-4, hsl(240 5% 64.9%));
    --sl-color-gray-500: var(--t-color-gray-5, hsl(240 3.8% 46.1%));
    --sl-color-gray-600: var(--t-color-gray-6, hsl(240 5.2% 33.9%));
    --sl-color-gray-700: var(--t-color-gray-7, hsl(240 5.3% 26.1%));
    --sl-color-gray-800: var(--t-color-gray-8, hsl(240 3.7% 15.9%));
    --sl-color-gray-900: var(--t-color-gray-9, hsl(240 5.9% 10%));
    --sl-color-gray-950: var(--t-color-gray-10, hsl(240 7.3% 8%));

    --sl-color-red-50: var(--t-color-red-0, hsl(0 85.7% 97.3%));
    --sl-color-red-100: var(--t-color-red-1, hsl(0 93.3% 94.1%));
    --sl-color-red-200: var(--t-color-red-2, hsl(0 96.3% 89.4%));
    --sl-color-red-300: var(--t-color-red-3, hsl(0 93.5% 81.8%));
    --sl-color-red-400: var(--t-color-red-4, hsl(0 90.6% 70.8%));
    --sl-color-red-500: var(--t-color-red-5, hsl(0 84.2% 60.2%));
    --sl-color-red-600: var(--t-color-red-6, hsl(0 72.2% 50.6%));
    --sl-color-red-700: var(--t-color-red-7, hsl(0 73.7% 41.8%));
    --sl-color-red-800: var(--t-color-red-8, hsl(0 70% 35.3%));
    --sl-color-red-900: var(--t-color-red-9, hsl(0 62.8% 30.6%));
    --sl-color-red-950: var(--t-color-red-10, hsl(0 60% 19.6%));

    --sl-color-orange-50: var(--t-color-orange-0, hsl(33.3 100% 96.5%));
    --sl-color-orange-100: var(--t-color-orange-1, hsl(34.3 100% 91.8%));
    --sl-color-orange-200: var(--t-color-orange-2, hsl(32.1 97.7% 83.1%));
    --sl-color-orange-300: var(--t-color-orange-3, hsl(30.7 97.2% 72.4%));
    --sl-color-orange-400: var(--t-color-orange-4, hsl(27 96% 61%));
    --sl-color-orange-500: var(--t-color-orange-5, hsl(24.6 95% 53.1%));
    --sl-color-orange-600: var(--t-color-orange-6, hsl(20.5 90.2% 48.2%));
    --sl-color-orange-700: var(--t-color-orange-7, hsl(17.5 88.3% 40.4%));
    --sl-color-orange-800: var(--t-color-orange-8, hsl(15 79.1% 33.7%));
    --sl-color-orange-900: var(--t-color-orange-9, hsl(15.3 74.6% 27.8%));
    --sl-color-orange-950: var(--t-color-orange-10, hsl(15.2 69.1% 19%));

    --sl-color-amber-50: var(--t-color-amber-0, hsl(48 100% 96.1%));
    --sl-color-amber-100: var(--t-color-amber-1, hsl(48 96.5% 88.8%));
    --sl-color-amber-200: var(--t-color-amber-2, hsl(48 96.6% 76.7%));
    --sl-color-amber-300: var(--t-color-amber-3, hsl(45.9 96.7% 64.5%));
    --sl-color-amber-400: var(--t-color-amber-4, hsl(43.3 96.4% 56.3%));
    --sl-color-amber-500: var(--t-color-amber-5, hsl(37.7 92.1% 50.2%));
    --sl-color-amber-600: var(--t-color-amber-6, hsl(32.1 94.6% 43.7%));
    --sl-color-amber-700: var(--t-color-amber-7, hsl(26 90.5% 37.1%));
    --sl-color-amber-800: var(--t-color-amber-8, hsl(22.7 82.5% 31.4%));
    --sl-color-amber-900: var(--t-color-amber-9, hsl(21.7 77.8% 26.5%));
    --sl-color-amber-950: var(--t-color-amber-10, hsl(22.9 74.1% 16.7%));

    --sl-color-yellow-50: var(--t-color-yellow-0, hsl(54.5 91.7% 95.3%));
    --sl-color-yellow-100: var(--t-color-yellow-1, hsl(54.9 96.7% 88%));
    --sl-color-yellow-200: var(--t-color-yellow-2, hsl(52.8 98.3% 76.9%));
    --sl-color-yellow-300: var(--t-color-yellow-3, hsl(50.4 97.8% 63.5%));
    --sl-color-yellow-400: var(--t-color-yellow-4, hsl(47.9 95.8% 53.1%));
    --sl-color-yellow-500: var(--t-color-yellow-5, hsl(45.4 93.4% 47.5%));
    --sl-color-yellow-600: var(--t-color-yellow-6, hsl(40.6 96.1% 40.4%));
    --sl-color-yellow-700: var(--t-color-yellow-7, hsl(35.5 91.7% 32.9%));
    --sl-color-yellow-800: var(--t-color-yellow-8, hsl(31.8 81% 28.8%));
    --sl-color-yellow-900: var(--t-color-yellow-9, hsl(28.4 72.5% 25.7%));
    --sl-color-yellow-950: var(--t-color-yellow-10, hsl(33.1 69% 13.9%));

    --sl-color-lime-50: var(--t-color-lime-0, hsl(78.3 92% 95.1%));
    --sl-color-lime-100: var(--t-color-lime-1, hsl(79.6 89.1% 89.2%));
    --sl-color-lime-200: var(--t-color-lime-2, hsl(80.9 88.5% 79.6%));
    --sl-color-lime-300: var(--t-color-lime-3, hsl(82 84.5% 67.1%));
    --sl-color-lime-400: var(--t-color-lime-4, hsl(82.7 78% 55.5%));
    --sl-color-lime-500: var(--t-color-lime-5, hsl(83.7 80.5% 44.3%));
    --sl-color-lime-600: var(--t-color-lime-6, hsl(84.8 85.2% 34.5%));
    --sl-color-lime-700: var(--t-color-lime-7, hsl(85.9 78.4% 27.3%));
    --sl-color-lime-800: var(--t-color-lime-8, hsl(86.3 69% 22.7%));
    --sl-color-lime-900: var(--t-color-lime-9, hsl(87.6 61.2% 20.2%));
    --sl-color-lime-950: var(--t-color-lime-10, hsl(86.5 60.6% 13.9%));

    --sl-color-green-50: var(--t-color-green-0, hsl(138.5 76.5% 96.7%));
    --sl-color-green-100: var(--t-color-green-1, hsl(140.6 84.2% 92.5%));
    --sl-color-green-200: var(--t-color-green-2, hsl(141 78.9% 85.1%));
    --sl-color-green-300: var(--t-color-green-3, hsl(141.7 76.6% 73.1%));
    --sl-color-green-400: var(--t-color-green-4, hsl(141.9 69.2% 58%));
    --sl-color-green-500: var(--t-color-green-5, hsl(142.1 70.6% 45.3%));
    --sl-color-green-600: var(--t-color-green-6, hsl(142.1 76.2% 36.3%));
    --sl-color-green-700: var(--t-color-green-7, hsl(142.4 71.8% 29.2%));
    --sl-color-green-800: var(--t-color-green-8, hsl(142.8 64.2% 24.1%));
    --sl-color-green-900: var(--t-color-green-9, hsl(143.8 61.2% 20.2%));
    --sl-color-green-950: var(--t-color-green-10, hsl(144.3 60.7% 12%));

    --sl-color-emerald-50: var(--t-color-emerald-0, hsl(151.8 81% 95.9%));
    --sl-color-emerald-100: var(--t-color-emerald-1, hsl(149.3 80.4% 90%));
    --sl-color-emerald-200: var(--t-color-emerald-2, hsl(152.4 76% 80.4%));
    --sl-color-emerald-300: var(--t-color-emerald-3, hsl(156.2 71.6% 66.9%));
    --sl-color-emerald-400: var(--t-color-emerald-4, hsl(158.1 64.4% 51.6%));
    --sl-color-emerald-500: var(--t-color-emerald-5, hsl(160.1 84.1% 39.4%));
    --sl-color-emerald-600: var(--t-color-emerald-6, hsl(161.4 93.5% 30.4%));
    --sl-color-emerald-700: var(--t-color-emerald-7, hsl(162.9 93.5% 24.3%));
    --sl-color-emerald-800: var(--t-color-emerald-8, hsl(163.1 88.1% 19.8%));
    --sl-color-emerald-900: var(--t-color-emerald-9, hsl(164.2 85.7% 16.5%));
    --sl-color-emerald-950: var(--t-color-emerald-10, hsl(164.3 87.5% 9.4%));

    --sl-color-teal-50: var(--t-color-teal-0, hsl(166.2 76.5% 96.7%));
    --sl-color-teal-100: var(--t-color-teal-1, hsl(167.2 85.5% 89.2%));
    --sl-color-teal-200: var(--t-color-teal-2, hsl(168.4 83.8% 78.2%));
    --sl-color-teal-300: var(--t-color-teal-3, hsl(170.6 76.9% 64.3%));
    --sl-color-teal-400: var(--t-color-teal-4, hsl(172.5 66% 50.4%));
    --sl-color-teal-500: var(--t-color-teal-5, hsl(173.4 80.4% 40%));
    --sl-color-teal-600: var(--t-color-teal-6, hsl(174.7 83.9% 31.6%));
    --sl-color-teal-700: var(--t-color-teal-7, hsl(175.3 77.4% 26.1%));
    --sl-color-teal-800: var(--t-color-teal-8, hsl(176.1 69.4% 21.8%));
    --sl-color-teal-900: var(--t-color-teal-9, hsl(175.9 60.8% 19%));
    --sl-color-teal-950: var(--t-color-teal-10, hsl(176.5 58.6% 11.4%));

    --sl-color-cyan-50: var(--t-color-cyan-0, hsl(183.2 100% 96.3%));
    --sl-color-cyan-100: var(--t-color-cyan-1, hsl(185.1 95.9% 90.4%));
    --sl-color-cyan-200: var(--t-color-cyan-2, hsl(186.2 93.5% 81.8%));
    --sl-color-cyan-300: var(--t-color-cyan-3, hsl(187 92.4% 69%));
    --sl-color-cyan-400: var(--t-color-cyan-4, hsl(187.9 85.7% 53.3%));
    --sl-color-cyan-500: var(--t-color-cyan-5, hsl(188.7 94.5% 42.7%));
    --sl-color-cyan-600: var(--t-color-cyan-6, hsl(191.6 91.4% 36.5%));
    --sl-color-cyan-700: var(--t-color-cyan-7, hsl(192.9 82.3% 31%));
    --sl-color-cyan-800: var(--t-color-cyan-8, hsl(194.4 69.6% 27.1%));
    --sl-color-cyan-900: var(--t-color-cyan-9, hsl(196.4 63.6% 23.7%));
    --sl-color-cyan-950: var(--t-color-cyan-10, hsl(196.8 61% 16.1%));

    --sl-color-sky-50: var(--t-color-sky-0, hsl(204 100% 97.1%));
    --sl-color-sky-100: var(--t-color-sky-1, hsl(204 93.8% 93.7%));
    --sl-color-sky-200: var(--t-color-sky-2, hsl(200.6 94.4% 86.1%));
    --sl-color-sky-300: var(--t-color-sky-3, hsl(199.4 95.5% 73.9%));
    --sl-color-sky-400: var(--t-color-sky-4, hsl(198.4 93.2% 59.6%));
    --sl-color-sky-500: var(--t-color-sky-5, hsl(198.6 88.7% 48.4%));
    --sl-color-sky-600: var(--t-color-sky-6, hsl(200.4 98% 39.4%));
    --sl-color-sky-700: var(--t-color-sky-7, hsl(201.3 96.3% 32.2%));
    --sl-color-sky-800: var(--t-color-sky-8, hsl(201 90% 27.5%));
    --sl-color-sky-900: var(--t-color-sky-9, hsl(202 80.3% 23.9%));
    --sl-color-sky-950: var(--t-color-sky-10, hsl(202.3 73.8% 16.5%));

    --sl-color-blue-50: var(--t-color-blue-0, hsl(213.8 100% 96.9%));
    --sl-color-blue-100: var(--t-color-blue-1, hsl(214.3 94.6% 92.7%));
    --sl-color-blue-200: var(--t-color-blue-2, hsl(213.3 96.9% 87.3%));
    --sl-color-blue-300: var(--t-color-blue-3, hsl(211.7 96.4% 78.4%));
    --sl-color-blue-400: var(--t-color-blue-4, hsl(213.1 93.9% 67.8%));
    --sl-color-blue-500: var(--t-color-blue-5, hsl(217.2 91.2% 59.8%));
    --sl-color-blue-600: var(--t-color-blue-6, hsl(221.2 83.2% 53.3%));
    --sl-color-blue-700: var(--t-color-blue-7, hsl(224.3 76.3% 48%));
    --sl-color-blue-800: var(--t-color-blue-8, hsl(225.9 70.7% 40.2%));
    --sl-color-blue-900: var(--t-color-blue-9, hsl(224.4 64.3% 32.9%));
    --sl-color-blue-950: var(--t-color-blue-10, hsl(226.2 55.3% 18.4%));

    --sl-color-indigo-50: var(--t-color-indigo-0, hsl(225.9 100% 96.7%));
    --sl-color-indigo-100: var(--t-color-indigo-1, hsl(226.5 100% 93.9%));
    --sl-color-indigo-200: var(--t-color-indigo-2, hsl(228 96.5% 88.8%));
    --sl-color-indigo-300: var(--t-color-indigo-3, hsl(229.7 93.5% 81.8%));
    --sl-color-indigo-400: var(--t-color-indigo-4, hsl(234.5 89.5% 73.9%));
    --sl-color-indigo-500: var(--t-color-indigo-5, hsl(238.7 83.5% 66.7%));
    --sl-color-indigo-600: var(--t-color-indigo-6, hsl(243.4 75.4% 58.6%));
    --sl-color-indigo-700: var(--t-color-indigo-7, hsl(244.5 57.9% 50.6%));
    --sl-color-indigo-800: var(--t-color-indigo-8, hsl(243.7 54.5% 41.4%));
    --sl-color-indigo-900: var(--t-color-indigo-9, hsl(242.2 47.4% 34.3%));
    --sl-color-indigo-950: var(--t-color-indigo-10, hsl(243.5 43.6% 22.9%));

    --sl-color-violet-50: var(--t-color-violet-0, hsl(250 100% 97.6%));
    --sl-color-violet-100: var(--t-color-violet-1, hsl(251.4 91.3% 95.5%));
    --sl-color-violet-200: var(--t-color-violet-2, hsl(250.5 95.2% 91.8%));
    --sl-color-violet-300: var(--t-color-violet-3, hsl(252.5 94.7% 85.1%));
    --sl-color-violet-400: var(--t-color-violet-4, hsl(255.1 91.7% 76.3%));
    --sl-color-violet-500: var(--t-color-violet-5, hsl(258.3 89.5% 66.3%));
    --sl-color-violet-600: var(--t-color-violet-6, hsl(262.1 83.3% 57.8%));
    --sl-color-violet-700: var(--t-color-violet-7, hsl(263.4 70% 50.4%));
    --sl-color-violet-800: var(--t-color-violet-8, hsl(263.4 69.3% 42.2%));
    --sl-color-violet-900: var(--t-color-violet-9, hsl(263.5 67.4% 34.9%));
    --sl-color-violet-950: var(--t-color-violet-10, hsl(265.1 61.5% 21.4%));

    --sl-color-purple-50: var(--t-color-purple-0, hsl(270 100% 98%));
    --sl-color-purple-100: var(--t-color-purple-1, hsl(268.7 100% 95.5%));
    --sl-color-purple-200: var(--t-color-purple-2, hsl(268.6 100% 91.8%));
    --sl-color-purple-300: var(--t-color-purple-3, hsl(269.2 97.4% 85.1%));
    --sl-color-purple-400: var(--t-color-purple-4, hsl(270 95.2% 75.3%));
    --sl-color-purple-500: var(--t-color-purple-5, hsl(270.7 91% 65.1%));
    --sl-color-purple-600: var(--t-color-purple-6, hsl(271.5 81.3% 55.9%));
    --sl-color-purple-700: var(--t-color-purple-7, hsl(272.1 71.7% 47.1%));
    --sl-color-purple-800: var(--t-color-purple-8, hsl(272.9 67.2% 39.4%));
    --sl-color-purple-900: var(--t-color-purple-9, hsl(273.6 65.6% 32%));
    --sl-color-purple-950: var(--t-color-purple-10, hsl(276 59.5% 16.5%));

    --sl-color-fuchsia-50: var(--t-color-fuchsia-0, hsl(289.1 100% 97.8%));
    --sl-color-fuchsia-100: var(--t-color-fuchsia-1, hsl(287 100% 95.5%));
    --sl-color-fuchsia-200: var(--t-color-fuchsia-2, hsl(288.3 95.8% 90.6%));
    --sl-color-fuchsia-300: var(--t-color-fuchsia-3, hsl(291.1 93.1% 82.9%));
    --sl-color-fuchsia-400: var(--t-color-fuchsia-4, hsl(292 91.4% 72.5%));
    --sl-color-fuchsia-500: var(--t-color-fuchsia-5, hsl(292.2 84.1% 60.6%));
    --sl-color-fuchsia-600: var(--t-color-fuchsia-6, hsl(293.4 69.5% 48.8%));
    --sl-color-fuchsia-700: var(--t-color-fuchsia-7, hsl(294.7 72.4% 39.8%));
    --sl-color-fuchsia-800: var(--t-color-fuchsia-8, hsl(295.4 70.2% 32.9%));
    --sl-color-fuchsia-900: var(--t-color-fuchsia-9, hsl(296.7 63.6% 28%));
    --sl-color-fuchsia-950: var(--t-color-fuchsia-10, hsl(297.1 56.8% 14.5%));

    --sl-color-pink-50: var(--t-color-pink-0, hsl(327.3 73.3% 97.1%));
    --sl-color-pink-100: var(--t-color-pink-1, hsl(325.7 77.8% 94.7%));
    --sl-color-pink-200: var(--t-color-pink-2, hsl(325.9 84.6% 89.8%));
    --sl-color-pink-300: var(--t-color-pink-3, hsl(327.4 87.1% 81.8%));
    --sl-color-pink-400: var(--t-color-pink-4, hsl(328.6 85.5% 70.2%));
    --sl-color-pink-500: var(--t-color-pink-5, hsl(330.4 81.2% 60.4%));
    --sl-color-pink-600: var(--t-color-pink-6, hsl(333.3 71.4% 50.6%));
    --sl-color-pink-700: var(--t-color-pink-7, hsl(335.1 77.6% 42%));
    --sl-color-pink-800: var(--t-color-pink-8, hsl(335.8 74.4% 35.3%));
    --sl-color-pink-900: var(--t-color-pink-9, hsl(335.9 69% 30.4%));
    --sl-color-pink-950: var(--t-color-pink-10, hsl(336.2 65.4% 15.9%));

    --sl-color-rose-50: var(--t-color-rose-0, hsl(355.7 100% 97.3%));
    --sl-color-rose-100: var(--t-color-rose-1, hsl(355.6 100% 94.7%));
    --sl-color-rose-200: var(--t-color-rose-2, hsl(352.7 96.1% 90%));
    --sl-color-rose-300: var(--t-color-rose-3, hsl(352.6 95.7% 81.8%));
    --sl-color-rose-400: var(--t-color-rose-4, hsl(351.3 94.5% 71.4%));
    --sl-color-rose-500: var(--t-color-rose-5, hsl(349.7 89.2% 60.2%));
    --sl-color-rose-600: var(--t-color-rose-6, hsl(346.8 77.2% 49.8%));
    --sl-color-rose-700: var(--t-color-rose-7, hsl(345.3 82.7% 40.8%));
    --sl-color-rose-800: var(--t-color-rose-8, hsl(343.4 79.7% 34.7%));
    --sl-color-rose-900: var(--t-color-rose-9, hsl(341.5 75.5% 30.4%));
    --sl-color-rose-950: var(--t-color-rose-10, hsl(341.3 70.1% 17.1%));

    --sl-color-primary-50: var(--t-color-primary-0, var(--sl-color-sky-50));
    --sl-color-primary-100: var(--t-color-primary-1, var(--sl-color-sky-100));
    --sl-color-primary-200: var(--t-color-primary-2, var(--sl-color-sky-200));
    --sl-color-primary-300: var(--t-color-primary-3, var(--sl-color-sky-300));
    --sl-color-primary-400: var(--t-color-primary-4, var(--sl-color-sky-400));
    --sl-color-primary-500: var(--t-color-primary-5, var(--sl-color-sky-500));
    --sl-color-primary-600: var(--t-color-primary-6, var(--sl-color-sky-600));
    --sl-color-primary-700: var(--t-color-primary-7, var(--sl-color-sky-700));
    --sl-color-primary-800: var(--t-color-primary-8, var(--sl-color-sky-800));
    --sl-color-primary-900: var(--t-color-primary-9, var(--sl-color-sky-900));
    --sl-color-primary-950: var(--t-color-primary-10, var(--sl-color-sky-950));

    --sl-color-success-50: var(--t-color-success-0, var(--sl-color-green-50));
    --sl-color-success-100: var(--t-color-success-1, var(--sl-color-green-100));
    --sl-color-success-200: var(--t-color-success-2, var(--sl-color-green-200));
    --sl-color-success-300: var(--t-color-success-3, var(--sl-color-green-300));
    --sl-color-success-400: var(--t-color-success-4, var(--sl-color-green-400));
    --sl-color-success-500: var(--t-color-success-5, var(--sl-color-green-500));
    --sl-color-success-600: var(--t-color-success-6, var(--sl-color-green-600));
    --sl-color-success-700: var(--t-color-success-7, var(--sl-color-green-700));
    --sl-color-success-800: var(--t-color-success-8, var(--sl-color-green-800));
    --sl-color-success-900: var(--t-color-success-9, var(--sl-color-green-900));
    --sl-color-success-950: var(--t-color-success-10, var(--sl-color-green-950));

    --sl-color-warning-50: var(--sl-color-amber-50);
    --sl-color-warning-100: var(--t-color-warning-1, var(--sl-color-amber-100));
    --sl-color-warning-200: var(--t-color-warning-2, var(--sl-color-amber-200));
    --sl-color-warning-300: var(--t-color-warning-3, var(--sl-color-amber-300));
    --sl-color-warning-400: var(--t-color-warning-4, var(--sl-color-amber-400));
    --sl-color-warning-500: var(--t-color-warning-5, var(--sl-color-amber-500));
    --sl-color-warning-600: var(--t-color-warning-6, var(--sl-color-amber-600));
    --sl-color-warning-700: var(--t-color-warning-7, var(--sl-color-amber-700));
    --sl-color-warning-800: var(--t-color-warning-8, var(--sl-color-amber-800));
    --sl-color-warning-900: var(--t-color-warning-9, var(--sl-color-amber-900));
    --sl-color-warning-950: var(--sl-color-amber-950);

    --sl-color-danger-50: var(--t-color-danger-0, var(--sl-color-red-50));
    --sl-color-danger-100: var(--t-color-danger-1, var(--sl-color-red-100));
    --sl-color-danger-200: var(--t-color-danger-2, var(--sl-color-red-200));
    --sl-color-danger-300: var(--t-color-danger-3, var(--sl-color-red-300));
    --sl-color-danger-400: var(--t-color-danger-4, var(--sl-color-red-400));
    --sl-color-danger-500: var(--t-color-danger-5, var(--sl-color-red-500));
    --sl-color-danger-600: var(--t-color-danger-6, var(--sl-color-red-600));
    --sl-color-danger-700: var(--t-color-danger-7, var(--sl-color-red-700));
    --sl-color-danger-800: var(--t-color-danger-8, var(--sl-color-red-800));
    --sl-color-danger-900: var(--t-color-danger-9, var(--sl-color-red-900));
    --sl-color-danger-950: var(--t-color-danger-10, var(--sl-color-red-950));

    --sl-color-neutral-50: var(--t-color-theme-0, var(--sl-color-gray-50));
    --sl-color-neutral-100: var(--t-color-theme-1, var(--sl-color-gray-100));
    --sl-color-neutral-200: var(--t-color-theme-2, var(--sl-color-gray-200));
    --sl-color-neutral-300: var(--t-color-theme-3, var(--sl-color-gray-300));
    --sl-color-neutral-400: var(--t-color-theme-4, var(--sl-color-gray-400));
    --sl-color-neutral-500: var(--t-color-theme-5, var(--sl-color-gray-500));
    --sl-color-neutral-600: var(--t-color-theme-6, var(--sl-color-gray-600));
    --sl-color-neutral-700: var(--t-color-theme-7, var(--sl-color-gray-700));
    --sl-color-neutral-800: var(--t-color-theme-8, var(--sl-color-gray-800));
    --sl-color-neutral-900: var(--t-color-theme-9, var(--sl-color-gray-900));
    --sl-color-neutral-950: var(--t-color-theme-10, var(--sl-color-gray-950));

    --sl-color-neutral-0: var(--t-color-theme-0, hsl(0, 0%, 100%));
    --sl-color-neutral-1000: var(--t-color-theme-10, hsl(0, 0%, 0%));

    --sl-border-radius-small: var(--t-border-radius-small, 0.1875rem);
    --sl-border-radius-medium: var(--t-border-radius-medium, 0.25rem);
    --sl-border-radius-large: var(--t-border-radius-large, 0.5rem);
    --sl-border-radius-x-large: var(--t-border-radius-x-large, 1rem);

    --sl-border-radius-circle: var(--t-border-radius-circle, 50%);
    --sl-border-radius-pill: var(--t-border-radius-pill, 9999px);

    --sl-shadow-x-small: var(--t-shadow-x-small, 0 1px 2px hsl(240 3.8% 46.1% / 6%));
    --sl-shadow-small: var(--t-shadow-small, 0 1px 2px hsl(240 3.8% 46.1% / 12%));
    --sl-shadow-medium: var(--t-shadow-medium, 0 2px 4px hsl(240 3.8% 46.1% / 12%));
    --sl-shadow-large: var(--t-shadow-large, 0 2px 8px hsl(240 3.8% 46.1% / 12%));
    --sl-shadow-x-large: var(--t-shadow-x-large, 0 4px 16px hsl(240 3.8% 46.1% / 12%));

    --sl-spacing-3x-small: 0.125rem;
    --sl-spacing-2x-small: 0.25rem;
    --sl-spacing-x-small: var(--t-spacing-x-small, 0.5rem);
    --sl-spacing-small: var(--t-spacing-small, 0.75rem);
    --sl-spacing-medium: var(--t-spacing-medium, 1rem);
    --sl-spacing-large: var(--t-spacing-large, 1.25rem);
    --sl-spacing-x-large: var(--t-spacing-x-large, 1.75rem);
    --sl-spacing-2x-large: 2.25rem;
    --sl-spacing-3x-large: 3rem;
    --sl-spacing-4x-large: 4.5rem;

    --sl-transition-x-slow: 1000ms;
    --sl-transition-slow: 500ms;
    --sl-transition-medium: 250ms;
    --sl-transition-fast: 150ms;
    --sl-transition-x-fast: 50ms;

    --sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    --sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
    --sl-font-serif: Georgia, "Times New Roman", serif;

    --sl-font-size-2x-small: 0.625rem;
    --sl-font-size-x-small: var(--t-font-size-x-small, 0.75rem);
    --sl-font-size-small: var(--t-font-size-small, 0.875rem);
    --sl-font-size-medium: var(--t-font-size-medium, 1rem);
    --sl-font-size-large: var(--t-font-size-large, 1.25rem);
    --sl-font-size-x-large: var(--t-font-size-x-large, 1.5rem);
    --sl-font-size-2x-large: 2.25rem;
    --sl-font-size-3x-large: 3rem;
    --sl-font-size-4x-large: 4.5rem;

    --sl-font-weight-light: var(--t-font-weight-small, 300);
    --sl-font-weight-normal: var(--t-font-weight-medium, 400);
    --sl-font-weight-semibold: var(--t-font-weight-large, 500);
    --sl-font-weight-bold: var(--t-font-weight-x-large, 700);

    --sl-letter-spacing-denser: -0.03em;
    --sl-letter-spacing-dense: -0.015em;
    --sl-letter-spacing-normal: normal;
    --sl-letter-spacing-loose: 0.075em;
    --sl-letter-spacing-looser: 0.15em;

    --sl-line-height-denser: var(--sl-line-height-x-small);
    --sl-line-height-dense: var(--sl-line-height-small);
    --sl-line-height-normal: var(--t-line-height-medium, 1.8);
    --sl-line-height-loose: var(--sl-line-height-large);
    --sl-line-height-looser: var(--sl-line-height-x-large);

    --sl-focus-ring-color: var(--sl-color-primary-600);
    --sl-focus-ring-style: solid;
    --sl-focus-ring-width: 3px;
    --sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);
    --sl-focus-ring-offset: 1px;

    --sl-button-font-size-small: var(--sl-font-size-x-small);
    --sl-button-font-size-medium: var(--sl-font-size-small);
    --sl-button-font-size-large: var(--sl-font-size-medium);

    --sl-input-height-x-small: 1.525rem;
    --sl-input-height-small: 1.875rem;
    --sl-input-height-medium: 2.5rem;
    --sl-input-height-large: 3.125rem;
    --sl-input-height-x-large: 3.875rem;

    --sl-input-background-color: var(--auto-input-bgcolor);
    --sl-input-background-color-hover: var(--auto-input-bgcolor);
    --sl-input-background-color-focus: var(--sl-input-background-color);
    --sl-input-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-border-color: var(--auto-border-color);
    --sl-input-border-color-hover: var(--sl-color-neutral-400);
    --sl-input-border-color-focus: var(--sl-color-primary-500);
    --sl-input-border-color-disabled: var(--sl-color-neutral-300);
    --sl-input-border-width: 1px;
    --sl-input-required-content: "*";
    --sl-input-required-content-offset: -2px;
    --sl-input-required-content-color: var(--sl-input-label-color);

    --sl-input-border-radius-small: var(--sl-border-radius-medium);
    --sl-input-border-radius-medium: var(--sl-border-radius-medium);
    --sl-input-border-radius-large: var(--sl-border-radius-medium);

    --sl-input-font-family: var(--sl-font-sans);
    --sl-input-font-weight: var(--sl-font-weight-normal);
    --sl-input-font-size-small: var(--sl-font-size-small);
    --sl-input-font-size-medium: var(--sl-font-size-medium);
    --sl-input-font-size-large: var(--sl-font-size-large);
    --sl-input-letter-spacing: var(--sl-letter-spacing-normal);

    --sl-input-color: var(--auto-color);
    --sl-input-color-hover: var(--auto-primary-color);
    --sl-input-color-focus: var(--auto-primary-color);
    --sl-input-color-disabled: var(--auto-disable-color);
    --sl-input-icon-color: var(--auto-color);
    --sl-input-icon-color-hover: var(--auto-primary-color);
    --sl-input-icon-color-focus: var(--auto-primary-color);
    --sl-input-placeholder-color: var(--auto-disable-color);
    --sl-input-placeholder-color-disabled: var(--sl-color-neutral-400);
    --sl-input-spacing-small: var(--sl-spacing-small);
    --sl-input-spacing-medium: var(--sl-spacing-medium);
    --sl-input-spacing-large: var(--sl-spacing-large);

    --sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);
    --sl-input-focus-ring-offset: 0;

    --sl-input-filled-background-color: var(--sl-color-neutral-100);
    --sl-input-filled-background-color-hover: var(--auto-primary-color);
    --sl-input-filled-background-color-focus: var(--sl-color-neutral-100);
    --sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-filled-color: var(--sl-color-neutral-800);
    --sl-input-filled-color-hover: var(--sl-color-neutral-800);
    --sl-input-filled-color-focus: var(--sl-color-neutral-700);
    --sl-input-filled-color-disabled: var(--sl-color-neutral-800);

    --sl-input-label-font-size-small: var(--sl-font-size-small);
    --sl-input-label-font-size-medium: var(--sl-font-size-medium);
    --sl-input-label-font-size-large: var(--sl-font-size-large);
    --sl-input-label-color: inherit;

    --sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
    --sl-input-help-text-font-size-medium: var(--sl-font-size-small);
    --sl-input-help-text-font-size-large: var(--sl-font-size-medium);
    --sl-input-help-text-color: var(--sl-color-neutral-500);

    --sl-toggle-size-small: 0.875rem;
    --sl-toggle-size-medium: 1.125rem;
    --sl-toggle-size-large: 1.375rem;

    --sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);

    --sl-panel-background-color: var(--auto-panel-bgcolor);
    --sl-panel-border-color: var(--auto-border-color);
    --sl-panel-border-width: 1px;

    --sl-tooltip-border-radius: var(--auto-border-radius);
    --sl-tooltip-background-color: var(--auto-panel-bgcolor);
    --sl-tooltip-color: var(--auto-color);
    --sl-tooltip-font-family: var(--sl-font-sans);
    --sl-tooltip-font-weight: var(--sl-font-weight-normal);
    --sl-tooltip-font-size: var(--sl-font-size-small);
    --sl-tooltip-line-height: var(--sl-line-height-dense);
    --sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
    --sl-tooltip-arrow-size: 6px;

    --sl-z-index-drawer: 700;
    --sl-z-index-dialog: 800;
    --sl-z-index-dropdown: 900;
    --sl-z-index-toast: 950;
    --sl-z-index-tooltip: 1000;
}

@supports (scrollbar-gutter: stable) {
    .sl-scroll-lock {
        scrollbar-gutter: var(--sl-scroll-lock-gutter) !important;
    }

    .sl-scroll-lock body {
        overflow: hidden !important;
    }
}

@supports not (scrollbar-gutter: stable) {
    .sl-scroll-lock body {
        padding-right: var(--sl-scroll-lock-size) !important;
        overflow: hidden !important;
    }
}

.sl-toast-stack {
    position: fixed;
    top: 0;
    inset-inline-end: 0;
    z-index: var(--sl-z-index-toast);
    width: 28rem;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
}

.sl-toast-stack sl-alert {
    margin: var(--sl-spacing-medium);
}

.sl-toast-stack sl-alert::part(base) {
    box-shadow: var(--sl-shadow-large);
}
`;var jn=x`
:host(.dark) {
  color-scheme: dark;

  --sl-color-gray-50: hsl(240 5.1% 15%);
  --sl-color-gray-100: hsl(240 5.7% 18.2%);
  --sl-color-gray-200: hsl(240 4.6% 22%);
  --sl-color-gray-300: hsl(240 5% 27.6%);
  --sl-color-gray-400: hsl(240 5% 35.5%);
  --sl-color-gray-500: hsl(240 3.7% 44%);
  --sl-color-gray-600: hsl(240 5.3% 58%);
  --sl-color-gray-700: hsl(240 5.6% 73%);
  --sl-color-gray-800: hsl(240 7.3% 84%);
  --sl-color-gray-900: hsl(240 9.1% 91.8%);
  --sl-color-gray-950: hsl(0 0% 95%);

  --sl-color-red-50: hsl(0 56% 23.9%);
  --sl-color-red-100: hsl(0.6 60% 33.9%);
  --sl-color-red-200: hsl(0.9 67.2% 37.1%);
  --sl-color-red-300: hsl(1.1 71.3% 43.7%);
  --sl-color-red-400: hsl(1 76% 52.5%);
  --sl-color-red-500: hsl(0.7 89.6% 57.2%);
  --sl-color-red-600: hsl(0 98.6% 67.9%);
  --sl-color-red-700: hsl(0 100% 72.3%);
  --sl-color-red-800: hsl(0 100% 85.6%);
  --sl-color-red-900: hsl(0 100% 90.3%);
  --sl-color-red-950: hsl(0 100% 95.9%);

  --sl-color-orange-50: hsl(15 64.2% 23.3%);
  --sl-color-orange-100: hsl(15.1 70.9% 31.1%);
  --sl-color-orange-200: hsl(15.3 75.7% 35.5%);
  --sl-color-orange-300: hsl(17.1 83.5% 42.7%);
  --sl-color-orange-400: hsl(20.1 88% 50.8%);
  --sl-color-orange-500: hsl(24.3 100% 50.5%);
  --sl-color-orange-600: hsl(27.2 100% 57.7%);
  --sl-color-orange-700: hsl(31.3 100% 68.7%);
  --sl-color-orange-800: hsl(33.8 100% 79.3%);
  --sl-color-orange-900: hsl(38.9 100% 87.7%);
  --sl-color-orange-950: hsl(46.2 100% 95%);

  --sl-color-amber-50: hsl(21.9 66.3% 21.1%);
  --sl-color-amber-100: hsl(21.5 73.6% 29.7%);
  --sl-color-amber-200: hsl(22.3 77.6% 33.3%);
  --sl-color-amber-300: hsl(25.4 84.2% 39.6%);
  --sl-color-amber-400: hsl(31.4 87.4% 46.7%);
  --sl-color-amber-500: hsl(37 96.6% 48.3%);
  --sl-color-amber-600: hsl(43.3 100% 53.4%);
  --sl-color-amber-700: hsl(46.5 100% 61.1%);
  --sl-color-amber-800: hsl(49.3 100% 73%);
  --sl-color-amber-900: hsl(51.8 100% 85%);
  --sl-color-amber-950: hsl(60 100% 94.6%);

  --sl-color-yellow-50: hsl(32.5 60% 18.2%);
  --sl-color-yellow-100: hsl(28.1 68.6% 29%);
  --sl-color-yellow-200: hsl(31.3 75.8% 30.8%);
  --sl-color-yellow-300: hsl(34.7 84.4% 35.3%);
  --sl-color-yellow-400: hsl(40.1 87.3% 43.3%);
  --sl-color-yellow-500: hsl(44.7 88% 46%);
  --sl-color-yellow-600: hsl(47.7 100% 50.9%);
  --sl-color-yellow-700: hsl(51.3 100% 59.9%);
  --sl-color-yellow-800: hsl(54.6 100% 73%);
  --sl-color-yellow-900: hsl(58.9 100% 84.2%);
  --sl-color-yellow-950: hsl(60 100% 94%);

  --sl-color-lime-50: hsl(86.5 54.4% 18%);
  --sl-color-lime-100: hsl(87.6 56.8% 23.3%);
  --sl-color-lime-200: hsl(85.8 63.2% 24.5%);
  --sl-color-lime-300: hsl(86.1 72% 29.4%);
  --sl-color-lime-400: hsl(85.5 76.8% 37.3%);
  --sl-color-lime-500: hsl(84.3 74.2% 42.1%);
  --sl-color-lime-600: hsl(82.8 81.5% 52.6%);
  --sl-color-lime-700: hsl(82 89.9% 64%);
  --sl-color-lime-800: hsl(80.9 97.9% 76.6%);
  --sl-color-lime-900: hsl(77.9 100% 85.8%);
  --sl-color-lime-950: hsl(69.5 100% 93.8%);

  --sl-color-green-50: hsl(144.3 53.6% 16%);
  --sl-color-green-100: hsl(143.2 55.4% 23.5%);
  --sl-color-green-200: hsl(141.5 58.2% 26.3%);
  --sl-color-green-300: hsl(140.8 64.2% 31.8%);
  --sl-color-green-400: hsl(140.3 68% 39.2%);
  --sl-color-green-500: hsl(141.1 64.9% 43%);
  --sl-color-green-600: hsl(141.6 72.4% 55.2%);
  --sl-color-green-700: hsl(141.7 82.7% 70.1%);
  --sl-color-green-800: hsl(141 90.9% 82.1%);
  --sl-color-green-900: hsl(142 100% 89.1%);
  --sl-color-green-950: hsl(144 100% 95.5%);

  --sl-color-emerald-50: hsl(164.3 75% 13.5%);
  --sl-color-emerald-100: hsl(163.5 72.6% 20.1%);
  --sl-color-emerald-200: hsl(162.1 73.7% 22.4%);
  --sl-color-emerald-300: hsl(161.3 77.3% 27.6%);
  --sl-color-emerald-400: hsl(159.6 77.1% 34.3%);
  --sl-color-emerald-500: hsl(159.1 73.5% 37.9%);
  --sl-color-emerald-600: hsl(157.8 66.8% 48.9%);
  --sl-color-emerald-700: hsl(156.2 76.1% 63.8%);
  --sl-color-emerald-800: hsl(152.4 84.4% 77.4%);
  --sl-color-emerald-900: hsl(149.3 100% 87%);
  --sl-color-emerald-950: hsl(158.6 100% 94.8%);

  --sl-color-teal-50: hsl(176.5 51.5% 15.4%);
  --sl-color-teal-100: hsl(175.9 54.7% 22.3%);
  --sl-color-teal-200: hsl(175.9 60.7% 23.9%);
  --sl-color-teal-300: hsl(174.5 67.3% 28.8%);
  --sl-color-teal-400: hsl(174.4 71.9% 34.9%);
  --sl-color-teal-500: hsl(173.1 71% 38.3%);
  --sl-color-teal-600: hsl(172.3 68.2% 48.1%);
  --sl-color-teal-700: hsl(170.5 81.3% 61.5%);
  --sl-color-teal-800: hsl(168.4 92.1% 75.2%);
  --sl-color-teal-900: hsl(168.3 100% 86%);
  --sl-color-teal-950: hsl(180 100% 95.5%);

  --sl-color-cyan-50: hsl(197.1 53.8% 20.3%);
  --sl-color-cyan-100: hsl(196.8 57.3% 27.2%);
  --sl-color-cyan-200: hsl(195.3 62.7% 29.4%);
  --sl-color-cyan-300: hsl(193.5 71.3% 34.1%);
  --sl-color-cyan-400: hsl(192.5 76.8% 40.6%);
  --sl-color-cyan-500: hsl(189.4 78.6% 42.6%);
  --sl-color-cyan-600: hsl(188.2 89.1% 51.7%);
  --sl-color-cyan-700: hsl(187 98.6% 66.2%);
  --sl-color-cyan-800: hsl(184.9 100% 78.3%);
  --sl-color-cyan-900: hsl(180 100% 86.6%);
  --sl-color-cyan-950: hsl(180 100% 94.8%);

  --sl-color-sky-50: hsl(203 63.8% 20.9%);
  --sl-color-sky-100: hsl(203.4 70.4% 28%);
  --sl-color-sky-200: hsl(202.7 75.8% 30.8%);
  --sl-color-sky-300: hsl(203.1 80.4% 36.1%);
  --sl-color-sky-400: hsl(202.1 80.5% 44.3%);
  --sl-color-sky-500: hsl(199.7 85.9% 47.7%);
  --sl-color-sky-600: hsl(198.7 97.9% 57.2%);
  --sl-color-sky-700: hsl(198.7 100% 70.5%);
  --sl-color-sky-800: hsl(198.8 100% 82.5%);
  --sl-color-sky-900: hsl(198.5 100% 89.9%);
  --sl-color-sky-950: hsl(186 100% 95.5%);

  --sl-color-blue-50: hsl(227.1 49.5% 22.7%);
  --sl-color-blue-100: hsl(225.8 58.9% 36.8%);
  --sl-color-blue-200: hsl(227.7 64.4% 42.9%);
  --sl-color-blue-300: hsl(226.1 72.7% 51.2%);
  --sl-color-blue-400: hsl(222.6 86.5% 56.3%);
  --sl-color-blue-500: hsl(217.8 95.8% 57.4%);
  --sl-color-blue-600: hsl(213.3 100% 65%);
  --sl-color-blue-700: hsl(210.9 100% 74.8%);
  --sl-color-blue-800: hsl(211.5 100% 83.4%);
  --sl-color-blue-900: hsl(211 100% 88.9%);
  --sl-color-blue-950: hsl(201.8 100% 95.3%);

  --sl-color-indigo-50: hsl(243.5 40.8% 27%);
  --sl-color-indigo-100: hsl(242.9 45.7% 37.6%);
  --sl-color-indigo-200: hsl(244.7 52.7% 43.1%);
  --sl-color-indigo-300: hsl(245.3 60.5% 52.4%);
  --sl-color-indigo-400: hsl(244.1 79.2% 60.4%);
  --sl-color-indigo-500: hsl(239.6 88.7% 63.8%);
  --sl-color-indigo-600: hsl(234.5 96.7% 70.9%);
  --sl-color-indigo-700: hsl(229.4 100% 78.3%);
  --sl-color-indigo-800: hsl(227.1 100% 85%);
  --sl-color-indigo-900: hsl(223.8 100% 89.9%);
  --sl-color-indigo-950: hsl(220 100% 95.1%);

  --sl-color-violet-50: hsl(265.1 57.3% 25.4%);
  --sl-color-violet-100: hsl(263.5 63.8% 39.4%);
  --sl-color-violet-200: hsl(263.4 66.2% 44.1%);
  --sl-color-violet-300: hsl(263.7 72.8% 52.4%);
  --sl-color-violet-400: hsl(262.5 87.3% 59.8%);
  --sl-color-violet-500: hsl(258.3 95.1% 63.2%);
  --sl-color-violet-600: hsl(255.1 100% 67.2%);
  --sl-color-violet-700: hsl(253 100% 81.5%);
  --sl-color-violet-800: hsl(251.7 100% 87.9%);
  --sl-color-violet-900: hsl(254.1 100% 91.7%);
  --sl-color-violet-950: hsl(257.1 100% 96.1%);

  --sl-color-purple-50: hsl(276 54.3% 20.5%);
  --sl-color-purple-100: hsl(273.6 61.8% 35.4%);
  --sl-color-purple-200: hsl(272.9 64% 41.4%);
  --sl-color-purple-300: hsl(271.9 68.1% 49.2%);
  --sl-color-purple-400: hsl(271.5 85.1% 57.8%);
  --sl-color-purple-500: hsl(270.7 96.4% 62.1%);
  --sl-color-purple-600: hsl(270.5 100% 71.9%);
  --sl-color-purple-700: hsl(270.9 100% 81.3%);
  --sl-color-purple-800: hsl(272.4 100% 87.7%);
  --sl-color-purple-900: hsl(276.7 100% 91.5%);
  --sl-color-purple-950: hsl(300 100% 96.5%);

  --sl-color-fuchsia-50: hsl(297.1 51.2% 18.6%);
  --sl-color-fuchsia-100: hsl(296.7 59.5% 31.5%);
  --sl-color-fuchsia-200: hsl(295.4 65.4% 35.1%);
  --sl-color-fuchsia-300: hsl(294.6 67.4% 42.2%);
  --sl-color-fuchsia-400: hsl(293.3 68.7% 51.2%);
  --sl-color-fuchsia-500: hsl(292.1 88.4% 57.7%);
  --sl-color-fuchsia-600: hsl(292 98.5% 59.5%);
  --sl-color-fuchsia-700: hsl(292.4 100% 79.5%);
  --sl-color-fuchsia-800: hsl(292.9 100% 86.8%);
  --sl-color-fuchsia-900: hsl(300 100% 91.5%);
  --sl-color-fuchsia-950: hsl(300 100% 96.3%);

  --sl-color-pink-50: hsl(336.2 59.6% 20%);
  --sl-color-pink-100: hsl(336.8 63.9% 34%);
  --sl-color-pink-200: hsl(336.8 68.7% 37.6%);
  --sl-color-pink-300: hsl(336.1 71.8% 44.5%);
  --sl-color-pink-400: hsl(333.9 74.9% 53.1%);
  --sl-color-pink-500: hsl(330.7 86.3% 57.7%);
  --sl-color-pink-600: hsl(328.6 91.5% 67.2%);
  --sl-color-pink-700: hsl(327.4 97.6% 78.7%);
  --sl-color-pink-800: hsl(325.1 100% 86.6%);
  --sl-color-pink-900: hsl(322.1 100% 91.3%);
  --sl-color-pink-950: hsl(315 100% 95.9%);

  --sl-color-rose-50: hsl(342.3 62.9% 21.5%);
  --sl-color-rose-100: hsl(342.8 68.9% 34.2%);
  --sl-color-rose-200: hsl(344.8 72.6% 37.3%);
  --sl-color-rose-300: hsl(346.9 75.8% 43.7%);
  --sl-color-rose-400: hsl(348.2 80.1% 52.7%);
  --sl-color-rose-500: hsl(350.4 94.8% 57.5%);
  --sl-color-rose-600: hsl(351.2 100% 58.1%);
  --sl-color-rose-700: hsl(352.3 100% 78.1%);
  --sl-color-rose-800: hsl(352 100% 86.2%);
  --sl-color-rose-900: hsl(354.5 100% 90.7%);
  --sl-color-rose-950: hsl(353.3 100% 95.7%);

  --sl-color-primary-50: var(--sl-color-sky-50);
  --sl-color-primary-100: var(--sl-color-sky-100);
  --sl-color-primary-200: var(--sl-color-sky-200);
  --sl-color-primary-300: var(--sl-color-sky-300);
  --sl-color-primary-400: var(--sl-color-sky-400);
  --sl-color-primary-500: var(--sl-color-sky-500);
  --sl-color-primary-600: var(--sl-color-sky-600);
  --sl-color-primary-700: var(--sl-color-sky-700);
  --sl-color-primary-800: var(--sl-color-sky-800);
  --sl-color-primary-900: var(--sl-color-sky-900);
  --sl-color-primary-950: var(--sl-color-sky-950);

  --sl-color-success-50: var(--sl-color-green-50);
  --sl-color-success-100: var(--sl-color-green-100);
  --sl-color-success-200: var(--sl-color-green-200);
  --sl-color-success-300: var(--sl-color-green-300);
  --sl-color-success-400: var(--sl-color-green-400);
  --sl-color-success-500: var(--sl-color-green-500);
  --sl-color-success-600: var(--sl-color-green-600);
  --sl-color-success-700: var(--sl-color-green-700);
  --sl-color-success-800: var(--sl-color-green-800);
  --sl-color-success-900: var(--sl-color-green-900);
  --sl-color-success-950: var(--sl-color-green-950);

  --sl-color-warning-50: var(--sl-color-amber-50);
  --sl-color-warning-100: var(--sl-color-amber-100);
  --sl-color-warning-200: var(--sl-color-amber-200);
  --sl-color-warning-300: var(--sl-color-amber-300);
  --sl-color-warning-400: var(--sl-color-amber-400);
  --sl-color-warning-500: var(--sl-color-amber-500);
  --sl-color-warning-600: var(--sl-color-amber-600);
  --sl-color-warning-700: var(--sl-color-amber-700);
  --sl-color-warning-800: var(--sl-color-amber-800);
  --sl-color-warning-900: var(--sl-color-amber-900);
  --sl-color-warning-950: var(--sl-color-amber-950);

  --sl-color-danger-50: var(--sl-color-red-50);
  --sl-color-danger-100: var(--sl-color-red-100);
  --sl-color-danger-200: var(--sl-color-red-200);
  --sl-color-danger-300: var(--sl-color-red-300);
  --sl-color-danger-400: var(--sl-color-red-400);
  --sl-color-danger-500: var(--sl-color-red-500);
  --sl-color-danger-600: var(--sl-color-red-600);
  --sl-color-danger-700: var(--sl-color-red-700);
  --sl-color-danger-800: var(--sl-color-red-800);
  --sl-color-danger-900: var(--sl-color-red-900);
  --sl-color-danger-950: var(--sl-color-red-950);

  --sl-color-neutral-50: var(--sl-color-gray-50);
  --sl-color-neutral-100: var(--sl-color-gray-100);
  --sl-color-neutral-200: var(--sl-color-gray-200);
  --sl-color-neutral-300: var(--sl-color-gray-300);
  --sl-color-neutral-400: var(--sl-color-gray-400);
  --sl-color-neutral-500: var(--sl-color-gray-500);
  --sl-color-neutral-600: var(--sl-color-gray-600);
  --sl-color-neutral-700: var(--sl-color-gray-700);
  --sl-color-neutral-800: var(--sl-color-gray-800);
  --sl-color-neutral-900: var(--sl-color-gray-900);
  --sl-color-neutral-950: var(--sl-color-gray-950);

  --sl-color-neutral-0: hsl(240, 5.9%, 11%);
  --sl-color-neutral-1000: hsl(0, 0%, 100%);

  --sl-border-radius-small: 0.1875rem;
  --sl-border-radius-medium: 0.25rem;
  --sl-border-radius-large: 0.5rem;
  --sl-border-radius-x-large: 1rem;

  --sl-border-radius-circle: 50%;
  --sl-border-radius-pill: 9999px;

  --sl-shadow-x-small: 0 1px 2px rgb(0 0 0 / 18%);
  --sl-shadow-small: 0 1px 2px rgb(0 0 0 / 24%);
  --sl-shadow-medium: 0 2px 4px rgb(0 0 0 / 24%);
  --sl-shadow-large: 0 2px 8px rgb(0 0 0 / 24%);
  --sl-shadow-x-large: 0 4px 16px rgb(0 0 0 / 24%);

  --sl-spacing-3x-small: 0.125rem;
  --sl-spacing-2x-small: 0.25rem;
  --sl-spacing-x-small: 0.5rem;
  --sl-spacing-small: 0.75rem;
  --sl-spacing-medium: 1rem;
  --sl-spacing-large: 1.25rem;
  --sl-spacing-x-large: 1.75rem;
  --sl-spacing-2x-large: 2.25rem;
  --sl-spacing-3x-large: 3rem;
  --sl-spacing-4x-large: 4.5rem;

  --sl-transition-x-slow: 1000ms;
  --sl-transition-slow: 500ms;
  --sl-transition-medium: 250ms;
  --sl-transition-fast: 150ms;
  --sl-transition-x-fast: 50ms;

  --sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  --sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  --sl-font-serif: Georgia, "Times New Roman", serif;

  --sl-font-size-2x-small: 0.625rem;
  --sl-font-size-x-small: 0.75rem;
  --sl-font-size-small: 0.875rem;
  --sl-font-size-medium: 1rem;
  --sl-font-size-large: 1.25rem;
  --sl-font-size-x-large: 1.5rem;
  --sl-font-size-2x-large: 2.25rem;
  --sl-font-size-3x-large: 3rem;
  --sl-font-size-4x-large: 4.5rem;

  --sl-font-weight-light: 300;
  --sl-font-weight-normal: 400;
  --sl-font-weight-semibold: 500;
  --sl-font-weight-bold: 700;

  --sl-letter-spacing-denser: -0.03em;
  --sl-letter-spacing-dense: -0.015em;
  --sl-letter-spacing-normal: normal;
  --sl-letter-spacing-loose: 0.075em;
  --sl-letter-spacing-looser: 0.15em;

  --sl-line-height-denser: 1;
  --sl-line-height-dense: 1.4;
  --sl-line-height-normal: 1.8;
  --sl-line-height-loose: 2.2;
  --sl-line-height-looser: 2.6;

  --sl-focus-ring-color: var(--sl-color-primary-700);
  --sl-focus-ring-style: solid;
  --sl-focus-ring-width: 3px;
  --sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width)
    var(--sl-focus-ring-color);
  --sl-focus-ring-offset: 1px;

  --sl-button-font-size-small: var(--sl-font-size-x-small);
  --sl-button-font-size-medium: var(--sl-font-size-small);
  --sl-button-font-size-large: var(--sl-font-size-medium);

  --sl-input-height-small: 1.875rem;
  --sl-input-height-medium: 2.5rem;
  --sl-input-height-large: 3.125rem;

  --sl-input-background-color: var(--sl-color-neutral-0);
  --sl-input-background-color-hover: var(--sl-input-background-color);
  --sl-input-background-color-focus: var(--sl-input-background-color);
  --sl-input-background-color-disabled: var(--sl-color-neutral-100);
  --sl-input-border-color: var(--sl-color-neutral-400);
  --sl-input-border-color-hover: var(--sl-color-neutral-500);
  --sl-input-border-color-focus: var(--sl-color-primary-600);
  --sl-input-border-color-disabled: var(--sl-color-neutral-400);
  --sl-input-border-width: 1px;
  --sl-input-required-content: "*";
  --sl-input-required-content-offset: -2px;
  --sl-input-required-content-color: var(--sl-input-label-color);

  --sl-input-border-radius-small: var(--sl-border-radius-medium);
  --sl-input-border-radius-medium: var(--sl-border-radius-medium);
  --sl-input-border-radius-large: var(--sl-border-radius-medium);

  --sl-input-font-family: var(--sl-font-sans);
  --sl-input-font-weight: var(--sl-font-weight-normal);
  --sl-input-font-size-small: var(--sl-font-size-small);
  --sl-input-font-size-medium: var(--sl-font-size-medium);
  --sl-input-font-size-large: var(--sl-font-size-large);
  --sl-input-letter-spacing: var(--sl-letter-spacing-normal);

  --sl-input-color: var(--sl-color-neutral-700);
  --sl-input-color-hover: var(--sl-color-neutral-700);
  --sl-input-color-focus: var(--sl-color-neutral-700);
  --sl-input-color-disabled: var(--sl-color-neutral-900);
  --sl-input-icon-color: var(--sl-color-neutral-500);
  --sl-input-icon-color-hover: var(--sl-color-neutral-600);
  --sl-input-icon-color-focus: var(--sl-color-neutral-600);
  --sl-input-placeholder-color: var(--sl-color-neutral-500);
  --sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);
  --sl-input-spacing-small: var(--sl-spacing-small);
  --sl-input-spacing-medium: var(--sl-spacing-medium);
  --sl-input-spacing-large: var(--sl-spacing-large);

  --sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);
  --sl-input-focus-ring-offset: 0;

  --sl-input-filled-background-color: var(--sl-color-neutral-100);
  --sl-input-filled-background-color-hover: var(--sl-color-neutral-100);
  --sl-input-filled-background-color-focus: var(--sl-color-neutral-100);
  --sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);
  --sl-input-filled-color: var(--sl-color-neutral-800);
  --sl-input-filled-color-hover: var(--sl-color-neutral-800);
  --sl-input-filled-color-focus: var(--sl-color-neutral-700);
  --sl-input-filled-color-disabled: var(--sl-color-neutral-800);

  --sl-input-label-font-size-small: var(--sl-font-size-small);
  --sl-input-label-font-size-medium: var(--sl-font-size-medium);
  --sl-input-label-font-size-large: var(--sl-font-size-large);
  --sl-input-label-color: inherit;

  --sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
  --sl-input-help-text-font-size-medium: var(--sl-font-size-small);
  --sl-input-help-text-font-size-large: var(--sl-font-size-medium);
  --sl-input-help-text-color: var(--sl-color-neutral-600);

  --sl-toggle-size-small: 0.875rem;
  --sl-toggle-size-medium: 1.125rem;
  --sl-toggle-size-large: 1.375rem;

  --sl-overlay-background-color: hsl(0 0% 0% / 43%);

  --sl-panel-background-color: var(--sl-color-neutral-50);
  --sl-panel-border-color: var(--sl-color-neutral-200);
  --sl-panel-border-width: 1px;

  --sl-tooltip-border-radius: var(--sl-border-radius-medium);
  --sl-tooltip-background-color: var(--sl-color-neutral-800);
  --sl-tooltip-color: var(--sl-color-neutral-0);
  --sl-tooltip-font-family: var(--sl-font-sans);
  --sl-tooltip-font-weight: var(--sl-font-weight-normal);
  --sl-tooltip-font-size: var(--sl-font-size-small);
  --sl-tooltip-line-height: var(--sl-line-height-dense);
  --sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
  --sl-tooltip-arrow-size: 6px;

  --sl-z-index-drawer: 700;
  --sl-z-index-dialog: 800;
  --sl-z-index-dropdown: 900;
  --sl-z-index-toast: 950;
  --sl-z-index-tooltip: 1000;
}
`;var Nn={};q(Nn,{vars:()=>Ar});var Ar=x`
    :host {
        --auto-theme-color: var(--sl-color-primary-500);
        --auto-text-color: var(--sl-color-gray-700);
        --auto-gray-color: var(--sl-color-gray-500);
        --auto-bgcolor: var(--sl-color-neutral-0);
        --auto-panel-bgcolor: var(--sl-color-neutral-0);
        --auto-line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 4);
        --auto-font-size: var(--sl-font-size-medium);
        --auto-spacing: var(--sl-spacing-medium); /* 用于内边距和外边距 */
        --auto-border-color: var(--sl-color-neutral-300);
        --auto-border: 1px solid var(--auto-border-color);
        --auto-border-radius: var(--sl-border-radius-medium);
        --auto-shadow: var(--sl-shadow-medium);
        --auto-workspace-color: var(--sl-color-neutral-50);
        --auto-icon-size: calc(1.5 * var(--sl-font-size-medium));
        /* 以下变量在 overloads/field/widgets 中被引用，此前无定义处 */
        --auto-color: var(--auto-text-color);
        --auto-primary-color: var(--auto-theme-color);
        --auto-secondary-color: var(--sl-color-gray-600);
        --auto-disable-color: var(--sl-color-neutral-400);
        /* 不能写 var(--sl-input-background-color)——themeMap 中该 --sl 令牌
           反向引用本变量，会构成循环引用导致双方都失效 */
        --auto-input-bgcolor: var(--sl-color-neutral-0);
        --auto-title-bgcolor: var(--sl-color-neutral-100);
        --auto-padding: var(--auto-spacing);
        --auto-letter-spacing: var(--sl-letter-spacing-normal);
        --auto-font: var(--sl-font-sans) var(--auto-font-size)/var(--auto-line-height);
    }
    :host([size='small']) {
        --auto-font-size: var(--sl-font-size-small);
        --auto-spacing: var(--sl-spacing-small); /* 用于内边距和外边距 */
        --auto-border-radius: var(--sl-border-radius-small);
        --auto-shadow: var(--sl-shadow-small);
        --auto-line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 4);
        --auto-icon-size: calc(1.5 * var(--sl-font-size-small));
    }
    :host([size='large']) {
        --auto-font-size: var(--sl-font-size-large);
        --auto-spacing: var(--sl-spacing-large); /* 用于内边距和外边距 */
        --auto-border-radius: var(--sl-border-radius-large);
        --auto-shadow: var(--sl-shadow-large);
        --auto-line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 4);
        --auto-icon-size: calc(1.5 * var(--sl-font-size-large));
    }

    auto-form.error {
        --auto-border: 1px solid red;
        --auto-text-color: red;
    }
`;var xo=x`
    ${Bn}
    ${jn}
    ${Ar}
    :host {
        display: flex;
        position: relative;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        background-color: var(--auto-panel-bgcolor);
        & > .fields {
            & > * {
                width: 100%;
                box-sizing: border-box;
            }
        }
    }
    /* 布局 */
    :host([layout="auto"]) {
        & > .fields {
            /* 字段间换行空白会产生 inline-block 间隙（约 4px），font-size:0 消除 */
            font-size: 0;
            & > * {
                width: 100%;
                box-sizing: border-box;
                display: inline-block;
                font-size: initial;
            }
        }
    }
    :host([layout="row"]) {
        & > .fields {
            display: flex;
            flex-direction: row;
            & > * {
                width: auto;
                border-bottom: none !important;
            }
        }
    }
    :host([layout="col"]) {
        & > .fields {
            display: flex;
            flex-direction: column;
        }
    }

    /* 网格线 */
    :host([border="none"]) {
        border: none;
        & > .fields {
            & > * {
                border: none;
            }
        }
    }
    :host([border="outline"]) {
        border: 1px solid var(--sl-input-border-color);
        & > .fields {
            & > * {
                border: none;
            }
        }
    }
    :host([border="grid"]) {
        border: 1px solid var(--sl-input-border-color);
        border-left: none;
        & > .fields > :last-child {
            border-bottom: none;
        }
        & > .fields {
            & > * {
                border-bottom: 1px solid var(--sl-input-border-color);
                border-left: 1px solid var(--sl-input-border-color);
            }
        }
    }
`;var So=x`
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
`;function ne(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function Fn(t,e){return ne(t)?Object.assign({},t,e):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},e)}function Ao(t,e,r){if(!e||e.length===0)return t;let o=Array.isArray(e)?e:e.split("."),s,i=t;for(let n=0;n<o.length;n++){let a=o[n];if(a in i)s=i[a];else return r;i=s;}return s}function We(t,e,r,o){if(!e||!t)return t;let s=e;if(s.length===0)return typeof t=="object"&&Object.assign(t,r),t;{let i=t,n=[],a=(l,c,u)=>{l[c]=u;};for(let l=0;l<s.length;l++){let c=s[l];if(n.push(c),i)if(Array.isArray(i)){let u=parseInt(c,10);if(Number.isNaN(u)||u<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===s.length-1?a(i,u,r):i=i[u];}else i instanceof Map||i instanceof WeakMap?l===s.length-1?i.set(c,r):(i.has(c)||i.set(c,{}),i=i.get(c)):typeof i=="object"&&c in i?l===s.length-1?a(i,c,r):i=i[c]:(i[c]=l===s.length-1?r:{},i=i[c]);else i[c]=l===s.length-1?r:{},i=i[c];}}return t}function vc(t){if(t==null)return "";let e=typeof t;if(e==="boolean")return String(t);if(Array.isArray(t))return t.join(",");if(e==="object")try{return JSON.stringify(t)}catch{return "{}"}return String(t)}function Hn(t,e){if(!e)return t;let r=e.datatype||"any";if(r==="any")return t;if(r==="string")return vc(t);if(r==="number")return Number(t);if(Array.isArray(t))return [...t];if(typeof t=="object")return {...t};if(typeof t=="string"){if(r==="boolean")return t.toLowerCase()==="true";if(r==="array")return t.split(",").map(o=>o.trim());if(r==="object")try{return JSON.parse(t)}catch{return {}}}return r==="boolean"?!!t:t}function Un(t,e,r){return t?r(e):e}var Fs="https://unpkg.com/lucide-static@latest/icons/{name}.svg",Hs={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>',bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>',plus:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',minus:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>'},Wn=t=>t in Hs?`data:image/svg+xml,${encodeURIComponent(Hs[t])}`:Fs.replace("{name}",t),yc=t=>{t&&t.setAttribute("stroke-width","1");};function we(t,e){let r=t??Fs;if(!r.includes("{name}"))throw new Error('icon url must include "{name}"');Fs=r,e&&Object.entries(e).forEach(([s,i])=>{Hs[s]=i;}),je("default").resolver!==Wn&&Rs("default",{resolver:Wn,mutator:yc});}function wc(t){t=t.replace(/^#/,"");let e=parseInt(t.substring(0,2),16)/255,r=parseInt(t.substring(2,4),16)/255,o=parseInt(t.substring(4,6),16)/255,s=Math.max(e,r,o),i=Math.min(e,r,o),n=0,a=0,l=(s+i)/2;if(s!==i){let c=s-i;switch(a=l>.5?c/(2-s-i):c/(s+i),s){case e:n=(r-o)/c+(r<o?6:0);break;case r:n=(o-e)/c+2;break;case o:n=(e-r)/c+4;break}n/=6;}return {h:Math.round(n*360),s:Math.round(a*100),l:Math.round(l*100)}}function _c(t,e,r){e/=100,r/=100;let o=(1-Math.abs(2*r-1))*e,s=o*(1-Math.abs(t/60%2-1)),i=r-o/2,n=0,a=0,l=0;0<=t&&t<60?(n=o,a=s,l=0):60<=t&&t<120?(n=s,a=o,l=0):120<=t&&t<180?(n=0,a=o,l=s):180<=t&&t<240?(n=0,a=s,l=o):240<=t&&t<300?(n=s,a=0,l=o):300<=t&&t<360&&(n=o,a=0,l=s),n=Math.round((n+i)*255),a=Math.round((a+i)*255),l=Math.round((l+i)*255);let c=u=>{let p=u.toString(16);return p.length===1?"0"+p:p};return `#${c(n)}${c(a)}${c(l)}`}function qn(t){let e=wc(t),r={50:{hDiff:3.3,sFactor:.74,lFactor:.44},100:{hDiff:3.7,sFactor:.82,lFactor:.59},200:{hDiff:3,sFactor:.88,lFactor:.65},300:{hDiff:3.4,sFactor:.94,lFactor:.76},400:{hDiff:2.4,sFactor:.94,lFactor:.93},500:{hDiff:0,sFactor:1,lFactor:1},600:{hDiff:-1,sFactor:1.14,lFactor:1.2},700:{hDiff:-1,sFactor:1.16,lFactor:1.48},800:{hDiff:-0.9,sFactor:1.16,lFactor:1.73},900:{hDiff:-1.2,sFactor:1.16,lFactor:1.89},950:{hDiff:-13.7,sFactor:1.16,lFactor:2}},o={};for(let[s,i]of Object.entries(r)){let n=Math.max(0,Math.min(360,e.h+i.hDiff)),a=Math.max(0,Math.min(100,e.s*i.sFactor)),l=Math.max(0,Math.min(100,e.l*i.lFactor));o[`--sl-color-primary-${s}`]=_c(n,a,l);}return o}function xc(t){if(!t.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){console.error("Invalid color format. Please provide a valid hex color (e.g., #3B82F6)");return}try{let e=qn(t),r=document.getElementById("auto-styles");r||(r=document.createElement("style"),r.id="auto-styles",document.head.appendChild(r));let o=`:root {
`;Object.entries(e).forEach(([i,n])=>{o+=`  ${i}: ${n};
`;}),o+="}",r.textContent=o;let s=document.body;return e["--sl-color-primary-500"]&&s.style.setProperty("--sl-color-primary-500",e["--sl-color-primary-500"]),console.log("Primary color changed successfully"),e}catch(e){console.error("Failed to change theme color:",e);}}globalThis.changePrimaryColor=xc;var ha={};q(ha,{ASYNC_COMPUTED_VALUE:()=>qs,AbortError:()=>Ge,AsyncComputedObject:()=>Br,AutoStore:()=>gt,AutoStoreError:()=>Dt,BATCH_UPDATE_EVENT:()=>Ws,ComputedObject:()=>Yt,ComputedObjects:()=>Ir,ConfigManager:()=>Nr,CyleDependError:()=>ni,DELETE_FLAG:()=>Ac,EMPTY:()=>Sc,FastEvent:()=>di,GLOBAL_CONFIG_MANAGER:()=>Wt,InvalidComputedArgumentsError:()=>Vr,InvalidDependsError:()=>li,InvalidScopeError:()=>ai,OBSERVER_DESCRIPTOR_BUILDER_FLAG:()=>Us,OBSERVER_DESCRIPTOR_FLAG:()=>Cr,OBSERVER_TYPE_FLAG:()=>ct,ObserverObject:()=>zr,ObserverScopeRef:()=>mi,PATH_DELIMITER:()=>C,SHALLOW_PROXY_FLAG:()=>ae,SKIP_PROXY_FLAG:()=>Er,SyncComputedObject:()=>jr,TimeoutError:()=>ii,ValidateError:()=>Ee,WITH_SCHEMA_VALUE:()=>Qs,calcDependPaths:()=>Se,computed:()=>gi,configurable:()=>bi,createAsyncComputedValue:()=>Pc,createRefState:()=>ia,delay:()=>Oc,emitEvent:()=>oi,emitStoreEvent:()=>G,escapePath:()=>Co,execObserverInitial2:()=>Ic,forEachObject:()=>Rr,getAbsolutePath:()=>Or,getComputedType:()=>Mc,getDefaultComputedOptions:()=>Ae,getDefaultConfigManager:()=>zc,getDepends:()=>kc,getError:()=>si,getId:()=>Tr,getMapVal:()=>kr,getSchemaValue:()=>ei,getSnap:()=>Pr,getSnapshot:()=>Mr,getVal:()=>V,getValueScope:()=>Kt,installPlugin:()=>Rc,isAbsolutePath:()=>Ec,isAllowCreatedObserver:()=>ri,isAsyncComputed:()=>Dc,isAsyncComputedValue:()=>At,isAutoStore:()=>Vc,isEq:()=>Gs,isFunction:()=>W,isMap:()=>_e,isObserverDescriptor:()=>Cc,isObserverDescriptorBuilder:()=>Zs,isPathEq:()=>xe,isPathMatched:()=>Ks,isPlainObject:()=>Ys,isPrimitive:()=>$c,isPromise:()=>Xs,isRaw:()=>qt,isRelPath:()=>Lc,isSchemaDescriptorBuilder:()=>Dr,isShallow:()=>au,isWithSchemaValue:()=>Yn,joinPath:()=>Gt,markRaw:()=>U,noRepeat:()=>Lr,normalizeDeps:()=>qe,params:()=>Gn,pathIsExists:()=>Tc,pathStartsWith:()=>Js,refState:()=>fi,schema:()=>Po,setVal:()=>Mt,shallow:()=>nu,splitPath:()=>le,unescapePath:()=>Kn,withSchema:()=>ti});function Gn(t,...e){let r=t.valueOf(),o={},s=[...e];try{if(s.length===0)return r;if(s.length===1){let i=s[0];if(i==null)return r;Array.isArray(i)?s=i:typeof i=="object"&&(o=i,s=[]);}return r=r.replace(/\{\s*([a-zA-Z\d]*)\s*\}/g,(i,n)=>{let a;return n&&o.hasOwnProperty(n)?a=o[n]:!n&&s.length>0&&(a=s.shift()),a==null?"":(typeof a=="function"&&(a=a()),String(a))}),r}catch{return r}}String.prototype.params=function(){return Gn(this,...arguments)};var Er="__AS_SKIP_PROXY__",ae=Symbol.for("__AS_SHALLOW_PROXY__"),ct="__OBSERVER_TYPE__",Us="__AS_OBSERVER_DESCRIPTOR_BUILDER__",Cr="__AS_OBSERVER_DESCRIPTOR__",C=".",Ws="__batch_update__",qs="__AS_ASYNC_COMPUTED_VALUE__",Sc="__AS_EMPTY__",Ac="__AS_DELETE_FLAG__",Wt="AutoStoreConfigManager";function qt(t){try{return t[Er]===!0}catch{}return  false}function Gs(t,e){if(t===e)return  true;if(t===null||e===null||typeof t!=typeof e)return  false;if(typeof t=="object"){if(Array.isArray(t)&&Array.isArray(e))return t.length!==e.length?false:t.every((r,o)=>Gs(r,e[o]));if(!Array.isArray(t)&&!Array.isArray(e)){let r=Object.keys(t);return r.length!==Object.keys(e).length?false:r.every(o=>Gs(t[o],e[o]))}else return  false}return  false}function _e(t){return toString.call(t)==="[object Map]"}function Ec(t){return t?t.some(e=>typeof e=="string"?e.startsWith("./")||e.startsWith("../")||e.startsWith("@")?false:!["CURRENT","SELF","PARENT"].includes(e):true):false}function Or(t,e){let r=o=>!!(o.startsWith("./")||o.startsWith("../")||["CURRENT","SELF","PARENT"].includes(o));if(typeof t=="string")if(r(t)){if(!e)return [t];if(t==="SELF")return e;if(t==="CURRENT"||t==="PARENT")return e.slice(0,-1);if(t.startsWith("./")){let o=t.slice(2),s=e.slice(0,-1);return o===""?s:[...s,...o.split(C)]}if(t.startsWith("../")){let o=t.slice(3),s=e.length>=2?e.slice(0,-2):void 0;return s===void 0?void 0:o.startsWith("../")?Or(o,s):o===""?s:[...s,...o.split(C)]}return [t]}else return t.split(C);if(t.length>0&&r(t[0])){if(!e)return t;let o=t[0],s=t.slice(1),i=Or(o,e);return i===void 0?void 0:[...i,...s]}return t}function xe(t,e){return !t||!e||t.length!==e.length?false:t.every((r,o)=>r===e[o])}function Eo(t){return Array.isArray(t)?t:t.split(C)}function Ks(t,e){let r=Eo(t),o=Array.isArray(e)?e:e===""?[]:e.split(C);return o.length===0||xe(r,o)?true:(o[o.length-1]==="**"&&(o[o.length-1]="*",o.splice(o.length-1,0,...Array.from({length:r.length-o.length}).fill("*"))),r.length!==o.length?false:o.every((i,n)=>i==="*"||i==="**"?true:i===r[n]))}function Ys(t){return t==null||typeof t!="object"?false:Object.prototype.toString.call(t)==="[object Object]"}function At(t){return t&&typeof t=="object"&&(t.hasOwnProperty(qs)||"value"in t&&"loading"in t&&"retry"in t)}function Xs(t){try{return !!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"&&typeof t.catch=="function"&&(t instanceof Promise||Object.prototype.toString.call(t)==="[object Promise]")}catch{return  false}}function Cc(t){return typeof t=="object"&&t.hasOwnProperty("type")&&typeof t.type=="string"&&t.hasOwnProperty("getter")&&typeof t.getter=="function"&&t.hasOwnProperty("options")&&typeof t.options=="object"}function Zs(t){return typeof t=="function"&&t[ct]}function kr(t,e){let r=t.get(e);if(r!==void 0)return r;let o=t.get(Number(e)||e);if(o!==void 0)return o}function Kn(t){let e="";for(let r=0;r<t.length;r++)t[r]==="\\"&&r+1<t.length?(e+=t[r+1],r++):e+=t[r];return e}function Co(t,e=C){return t.replace(/\\/g,"\\\\").replace(new RegExp(`\\${e}`,"g"),`\\${e}`)}function le(t,e=C){let r=[],o="";for(let s=0;s<t.length;s++){let i=t[s];i==="\\"&&s+1<t.length?(o+=i,o+=t[s+1],s++):i===e?(r.push(o),o=""):o+=i;}return r.push(o),r.map(Kn)}function V(t,e,r){if(!e||e.length===0)return t;let o=Array.isArray(e)?e:le(e),s,i=t;for(let n=0;n<o.length;n++){let a=o[n];if(_e(i))s=kr(i,a);else if(a in i)s=i[a];else return r;i=s;}return s}function U(t){try{["object","function"].includes(typeof t)&&(t[Er]=!0);}catch{}return t}function Mt(t,e,r,o){if(!e||!t)return t;let s=e;if(s.length===0)return typeof t=="object"&&Object.assign(t,r),t;{let i=t,n=[],a=(l,c,u)=>{o&&At(l[c])?l[c].value=u:l[c]=u;};for(let l=0;l<s.length;l++){let c=s[l];if(n.push(c),i)if(Array.isArray(i)){let u=parseInt(c,10);if(Number.isNaN(u)||u<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===s.length-1?a(i,u,r):i=i[u];}else i instanceof Map||i instanceof WeakMap?l===s.length-1?i.set(c,r):(i.has(c)||i.set(c,{}),i=i.get(c)):typeof i=="object"&&c in i?l===s.length-1?a(i,c,r):i=i[c]:(i[c]=l===s.length-1?r:{},i=i[c]);else i[c]=l===s.length-1?r:{},i=i[c];}}return t}function Gt(t){return (t||["ROOT"]).map(e=>Array.isArray(e)?e.map(r=>Co(r)).join(C):Co(e)).join(C)}function qe(t){return t?t.map(e=>Array.isArray(e)?e:typeof e=="string"?["/","./","../"].some(r=>e.startsWith(r))?e:e.includes(C)?e.split(C):e.split("."):[]):[]}function Tr(){return Math.random().toString(36).slice(2)}function $r(t,e,r){let o=t&&!t[0].startsWith("#");if(Array.isArray(e))return e;if(e==="self")return o?t:void 0;if(e==="root")return o?[]:void 0;if(e==="parent")return o?t.slice(0,-2):void 0;if(e==="current")return o?t.slice(0,-1):void 0;if(typeof e=="string")return e.startsWith("./")?o?[...t.slice(0,-1),...e.slice(2).split(C)]:void 0:e.startsWith("../")?o?$r(t.slice(0,-1),e.slice(3),true):void 0:e.startsWith("/")?e.replace(/^(\/)*/,"").split(C):o&&r?[...t.slice(0,-1),...e.split(C)]:e.split(C)}function Se(t,e){return e?e.map(r=>$r(t,r)).filter(r=>r!==void 0):[]}function Rr(t,e){function r(o,s){for(let i in o){let n=o[i];typeof e=="function"&&e({value:n,key:i,parent:o,path:s.concat(i)}),typeof n=="object"&&!qt(n)&&r(n,s.concat(i));}}r(t,[]);}function Pr(t){return typeof t=="object"?JSON.parse(JSON.stringify(t)):t}function Oc(t=1e3){return new Promise(e=>{setTimeout(e,t);})}function Lr(t){let e=new Map;return t.forEach(r=>{let o=r.join(".");e.set(o,r);}),Array.from(e.values())}function Js(t,e){return t.length>e.length?false:t.every((r,o)=>r===e[o])}function kc(t,e,r){let o=[];return typeof t=="function"?o=e.collectDependencies(()=>t(e.state)):typeof t=="string"?o=[t.split(C)]:Array.isArray(t)?o=[[...t]]:o=[],r!=="none"&&o.forEach(s=>{let i=e.peep(n=>V(n,s));At(i)&&s.push(r==="all"?"*":"value");}),o}function Tc(t,e){if(!e||e.length===0)return  false;let r,o=t;for(let s=0;s<e.length;s++){let i=e[s],n=false;if(_e(o)){if(n=o.has(i),!n)return  false;r=kr(o,i);}else {if(n=i in o,!n)return  false;r=o[i];}o=r;}return  true}function W(t){return t?typeof t=="function":false}function Mr(t,e){let{reserveAsync:r,includeFunc:o}=Object.assign({reserveAsync:false},e);if(Array.isArray(t)){let s=[...t];for(let i=0;i<s.length;i++)s[i]=Mr(s[i],e);return s}else if(typeof t=="object"){if(!r&&At(t))return t.value;{let s={...t};for(let i in s)s[i]=Mr(s[i],e);return s}}return o&&W(t)?`\`\`\`${t.toString()}\`\`\``:t}function $c(t){return t==null||typeof t=="string"||typeof t=="number"||typeof t=="boolean"}function Rc(t){globalThis.__AUTOSTORE_PLUGINS__||(globalThis.__AUTOSTORE_PLUGINS__=[]),typeof t=="function"&&!globalThis.__AUTOSTORE_PLUGINS__.includes(t)&&globalThis.__AUTOSTORE_PLUGINS__.push(t);}function Pc(t,e){return At(t)?Object.assign({},t,e):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:r=>{},cancel:()=>{}},e)}function Lc(t){let e=Array.isArray(t)?t[0]:t;return !!(e.startsWith("./")||e.startsWith("../")||["CURRENT","PARENT","SELF"].includes(e))}function Dr(t){return typeof t=="function"&&t[ct]==="schema"}var Qs="__WITH_SCHEMA_VALUE__";function ti(t,e){return Object.assign({validate:"throw"},e,{[Qs]:true,value:t})}function Yn(t){return t&&typeof t=="object"&&t[Qs]===true}function ei(t){return Yn(t)?[t.value,t]:[t,void 0]}function Mc(t,e){let r=t.computedObjects.find(e);return r?r.async?r.lite?"lite-async":"async":"sync":"none"}function Dc(t,e){let r=t.computedObjects.find(e);return r?r.async??false:false}function Xn(t,e,r,o){try{let s=t.emit(e,r);return o(s)}catch(s){t.logger.error(`Error while emit store event ${e}: ${s.message}`);return}}function ri(t,e,r,o,s){return Xn(t,"observer/initial",{path:e,value:r,parentPath:o,parent:s},i=>!i.some(n=>n===!1))}function Ic(t,e,r,o){let s=t.options?.onObserverInitial;return s==null||(Array.isArray(s)?s:[s]).every(a=>{try{return a.call(t,{path:e,value:r,parent:o})!==!1}catch(l){return t.logger.error(`onObserverInitial error: ${l.message}`),true}})?void 0:false}function oi(t,e,r){try{t.emit(e,r);}catch(o){t.logger.error(`Error while emit store event ${e}: ${o.message}`);}}function G(t,e,r,o=false){o?setTimeout(()=>{oi(t,e,r);},0):oi(t,e,r);}function si(t){return t instanceof Error?t:new Error(t)}function Ae(){return {async:false,enable:true,depends:[],immediate:"auto",extras:void 0}}function Vc(t){return t instanceof gt||t!==null&&typeof t=="object"&&t.__AUTO_STORE__===true}function zc(){return globalThis[Wt]?globalThis[Wt]:null}var Ir=class extends Map{constructor(r){super();this.store=r;}get enable(){return this.store.options.enableComputed}set enable(r){this.store.options.enableComputed=r;}delete(r){let o=this.get(r);return o?(o.destroy(),true):Map.prototype.delete.call(this,r)}find(r){if(!r)return;let o=Eo(r);for(let s of this.values())if(xe(s.path,o))return s}};function Oo(t,e){return Array.from({length:e},(r,o)=>o+t)}function Zn(t,e,r,o,s){let i=(a,l)=>{t({type:"insert",path:s,indexs:a,value:l,oldValue:void 0,parentPath:s,parent:e});},n=(a,l)=>{t({type:"remove",path:s,indexs:a,value:l,oldValue:void 0,parentPath:s,parent:e});};return r==="push"||r==="unshift"||r==="concat"?(...a)=>{let l=e.length,c=o.apply(e,a);return e.length>l&&i(Oo(r==="unshift"?0:l,e.length-l),a),c}:r==="pop"||r==="shift"?()=>{let a=e.length,l=o.apply(e);return e.length===a-1&&n([r==="pop"?a-1:0],[l]),l}:r==="splice"?(a,l,...c)=>{let u=l===void 0&&c.length===0?o.apply(e,[a]):o.apply(e,[a,l,...c]);return (u.length>0||l===void 0)&&n(l===void 0?[]:Oo(a,u.length),u),c.length>0&&i(Oo(a,c.length),c),u}:r==="fill"?(a,l,c)=>{let u=o.apply(e,[a,l,c]),p=l??0,m=c??e.length;return t({type:"update",path:s,indexs:Oo(p,m-p),value:a,oldValue:void 0,parentPath:s,parent:e}),u}:o}var Dt=class extends Error{},Ge=class extends Dt{},ii=class extends Dt{},ni=class extends Dt{},Vr=class extends Dt{},ai=class extends Dt{},li=class extends Dt{},Ee=class extends Dt{constructor(e){super(e),this.name="ValidateError";}};function Jn(t){return typeof t=="number"||typeof t=="string"&&!Number.isNaN(parseInt(t))}var ci=Symbol("__NOTIFY__");function Qn(t,e){let r=t.options.configKey;return r&&r.length>0?`${t.options.configKey}.${e}`:e}function Bc(t,e,r,o){if(t.configManager){let s=t.configManager.errors;s&&(s[e]=o),e in t.configManager.state&&(t.configManager.state[e].errorMessage=o);}t.errors[r]=o;}function jc(t,e,r){t.configManager&&(delete t.configManager.errors[e],e in t.configManager.state&&(t.configManager.state[e].errorMessage=null)),t.errors&&delete t.errors[r];}function Nc(t){if(this.options.validators){let e=t.join(this.options.delimiter);if(this.options.validators[e])return this.options.validators[e];let r=Object.keys(this.options.validators);for(let o of r)if(Ks(t,o))return this.options.validators[o]}return this.options.validate}function Fc(t,e,r,o,s){let i=s?.onInvalid||this._updateValidateBehavior;if(i==="none")return  true;let n=Nc.call(this,e);if(typeof n!="function")return  true;let a=true,l,c=e.join(C),u=Qn(this,c);try{if(n.call(this,r,o,e)===!1)throw new Ee;jc(this,u,c);}catch(p){l=p;let m=n.getErrorMessage?.(p)||p.message||p.stack;Bc(this,u,c,m);let f=i||p.onInvalid||n.onInvalid||this.options.onInvalid||"throw";if(f==="pass")a=true;else if(f==="ignore")a=false;else if(f==="throw-pass")a=p;else throw a=false,p}finally{this.emit("validate",{path:e,newValue:r,oldValue:o,error:l});}return a}function ui(t,e,r,o){if(qt(t)||typeof t!="object"||t===null)return t;if(r.has(t))return r.get(t);let s=t[ae],i=s===1?1:s===true||s===0?0:void 0,n=new Proxy(t,{get:(a,l,c)=>{let u=Reflect.get(a,l,c);if(typeof l!="string")return u;let p=[...e,String(l)];if(typeof u=="function"||!Object.hasOwn(a,l))if(typeof u=="function"){if(Array.isArray(a)&&!Jn(l))return Zn(o.notify,a,l,u,e);if(!qt(u)&&Object.hasOwn(a,l)){if(!ri(this,p,u,e,a))return U(u),u;let f=o.createObserverObject(p,u,e,a);return typeof f!="function"&&Reflect.set(a,l,f,c),f}else return u}else return u;if(o.notify({type:"get",path:p,indexs:[],value:u,oldValue:void 0,parentPath:e,parent:a}),i===1&&typeof u=="object"&&u!==null&&!qt(u)){try{u[ae]===void 0&&(u[ae]=0);}catch{}return ui.call(this,u,p,r,o)}return i!==void 0?u:ui.call(this,u,p,r,o)},set:(a,l,c,u)=>{let p=Reflect.get(a,l,u),m=[...e,String(l)],f=typeof c=="object"&&c!==null,[g,y]=f?ei(c):[c,void 0],S=Fc.call(this,n,m,g,p,y);if(S){let v=Reflect.set(a,l,g,u);if(l===ci)return  true;if(v&&this.configManager){let A=m.join(C);if(this.configurabled.has(A)){let O=Qn(this,A);setTimeout(()=>{this.configManager?.onUpdate(this,O,g);},0);}}if(v&&!y?.slient&&l!==ci&&g!==p&&o.notify({type:Array.isArray(a)?"update":"set",path:m,indexs:[],value:g,oldValue:p,parentPath:e,parent:a}),S instanceof Error)throw S;return v}else return  true},deleteProperty:(a,l)=>{let c=a[l],u=[...e,String(l)],p=Reflect.deleteProperty(a,l);return p&&l!==ci&&o.notify({type:"delete",path:u,indexs:[],value:c,oldValue:void 0,parentPath:e,parent:a}),p}});return r.set(t,n),n}function ta(t,e){let r=new WeakMap;return ui.call(this,t,[],r,e)}function ko(t){return t.constructor.name==="AsyncFunction"}function ea(t){let e;return Zs(t)?e=t():typeof t=="function"&&(e={type:"sync",getter:t,options:Object.assign({},Ae(),{async:ko(t)})}),e}function pi(t,e){if(e==="*")return  true;if(e==="write"){if(t.type==="get")return}else if(e==="read"){if(t.type!=="get")return}else if(Array.isArray(e)&&e.length>0&&!e.includes(t.type))return;return  true}var di={};q(di,{FastLiteEvent:()=>To});var Hc=Object.defineProperty,Uc=(t,e,r)=>e in t?Hc(t,e,{enumerable:true,configurable:true,writable:true,value:r}):t[e]=r,Ke=(t,e,r)=>Uc(t,typeof e!="symbol"?e+"":e,r);function ra(t,e){let r=t.length,o=e.length;if(r!==o&&(o===0||e[o-1]!=="**"))return  false;if(o>0&&e[o-1]==="**"){for(let s=0;s<o-1;s++)if(e[s]!=="*"&&e[s]!==t[s])return  false;return  true}for(let s=0;s<r;s++)if(e[s]!=="*"&&e[s]!==t[s])return  false;return  true}function Wc(t,e){let r=[];for(let o=t.length-1;o>=0;o--)e(t[o])&&(r.push(o),t.splice(o,1));return r.reverse()}function hi(t){return t&&typeof t=="function"}var qc=Symbol.for("__expandable__");function Gc(t){return t&&t[qc]}function Kc(t){for(let e=0;e<t.length;e++){let r=t[e];Array.isArray(r)&&Gc(r)&&(t.splice(e,1,...r),e+=r.length-1);}return t}function Yc(t,e){return t.catch(r=>(e&&e(r),Promise.resolve(r)))}function Xc(t){return t.map(e=>e.status==="fulfilled"?e.value:e.reason)}function Zc(t,e){let r=t;for(let o of e)if(r&&o in r)r=r[o];else return;return r}function oa(t,e,r){for(let[o,s]of Object.entries(t)){if(o.startsWith("__")||!s)continue;let i=[...e,o];r(i,s),oa(s,i,r);}}function Jc(t,e,r){let o=Zc(t,e);if(!o)return [];let s=[];return oa(o,e,(i,n)=>{s.push({node:n,type:i.join(r)});}),s}function Qc(t){let e={},r={};return typeof t[0]=="object"?(Object.assign(e,t[0]),r=typeof t[1]=="boolean"?{retain:t[1]}:t[1]&&typeof t[1]=="object"?t[1]:{}):(e.type=t[0],e.payload=t[1],r=typeof t[2]=="boolean"?{retain:t[2]}:t[2]&&typeof t[2]=="object"?t[2]:{}),[e,r]}var To=class{constructor(t){Ke(this,"__FastLiteEvent__",true),Ke(this,"listeners",{__listeners:[]}),Ke(this,"_options"),Ke(this,"_delimiter","/"),Ke(this,"retainedMessages",new Map),Ke(this,"listenerCount",0),this._options=Object.assign({id:Math.random().toString(36).substring(2),delimiter:"/",ignoreErrors:true,expandEmitResults:true},this._initOptions(t)),this._delimiter=this._options.delimiter;}get options(){return this._options}get id(){return this._options.id}get title(){return this._options.title||this.id||"FastLiteEvent"}_initOptions(t){return t}_addListener(t,e,r){let o=0;return [this._forEachNodes(t,s=>{let i=[e,r.count,0,r.tag,r.flags];s.__listeners.push(i),o=s.__listeners.length-1,this.listenerCount++;}),o]}_forEachNodes(t,e){if(t.length===0)return;let r=this.listeners;for(let o=0;o<t.length;o++){let s=t[o];if(s in r||(r[s]={__listeners:[]}),o===t.length-1){let i=r[s];return e(i,r),i}else r=r[s];}}_removeListener(t,e,r){r&&Wc(t.__listeners,o=>{o=Array.isArray(o)?o[0]:o;let s=o===r;return s&&this.listenerCount--,s});}on(t,e,r){if(t.length===0)throw new Error("event cannot be empty");let o=Object.assign({count:0,flags:0},r),s=t.split(this._delimiter),[i,n]=this._addListener(s,e,o),a=()=>i&&this._removeListener(i,s,e);return this._emitRetainMessage(t,i,n),{off:a,listener:e,[Symbol.dispose](){a();}}}once(t,e,r){return this.on(t,e,Object.assign({},r,{count:1}))}onAny(t,e){return this.on("**",t,e)}off(){let t=arguments,e=hi(t[0])?void 0:t[0],r=hi(t[0])?t[0]:t[1],o=e?e.split(this._delimiter):[],s=e?e.includes("*"):false;if(e&&!s)this._traverseToPath(this.listeners,o,i=>{r?this._removeListener(i,o,r):e&&(i.__listeners=[]);});else {let i=s?[]:o;this._traverseListeners(this.listeners,i,(n,a)=>{(r!==void 0||s&&ra(n,o))&&(r?this._removeListener(a,o,r):a.__listeners=[]);});}}offAll(t){if(t){let e=t.split(this._delimiter),r=0;this._traverseListeners(this.listeners,e,(o,s)=>{r+=s.__listeners.length,s.__listeners=[];}),this.listenerCount-=r,this._removeRetainedEvents(t);}else {let e=0;this._traverseListeners(this.listeners,[],(r,o)=>{e+=o.__listeners.length;}),this.listenerCount-=e,this.retainedMessages.clear(),this.listeners={__listeners:[]};}}_removeRetainedEvents(t){t||this.retainedMessages.clear(),t?.endsWith(this._delimiter)&&(t+=this._delimiter),this.retainedMessages.delete(t);for(let e of this.retainedMessages.keys())e.startsWith(t)&&this.retainedMessages.delete(e);}clear(t){this.offAll(t),this._removeRetainedEvents(t);}_emitRetainMessage(t,e,r){let o=[];if(t.includes("*")){let s=t.split(this._delimiter);this.retainedMessages.forEach((i,n)=>{let a=n.split(this._delimiter);ra(a,s)&&o.push(i);});}else this.retainedMessages.has(t)&&o.push(this.retainedMessages.get(t));e&&o.forEach(s=>{this._executeListeners([e],s,{},i=>i[0]===e.__listeners[r][0]);});}_traverseToPath(t,e,r,o=0,s){if(o>=e.length){r(t);return}let i=e[o];if(s===true){this._traverseToPath(t,e,r,o+1,true);return}"*"in t&&this._traverseToPath(t["*"],e,r,o+1),"**"in t&&this._traverseToPath(t["**"],e,r,o+1,true),i in t&&this._traverseToPath(t[i],e,r,o+1);}_traverseListeners(t,e,r){let o=t;e&&e.length>0&&this._traverseToPath(t,e,i=>{o=i;});let s=(i,n,a)=>{n(a,i);for(let[l,c]of Object.entries(i))l.startsWith("__")||c&&s(c,n,[...a,l]);};s(o,r,[]);}_onListenerError(t,e,r,o){if(o instanceof Error&&(o._emitter=`${t.name||"anonymous"}:${e.type}`),this._options.ignoreErrors)return o;throw o}_executeListener(t,e,r,o=false){let s=t[0];try{let i=((r?.flags||0)&1)>0,n=s.call(this,i?e.payload:e,r);return o&&n&&n instanceof Promise&&(n=Yc(n,a=>this._onListenerError(s,e,r,a))),n}catch(i){return this._onListenerError(s,e,r,i)}}_executeListeners(t,e,r,o){if(!t||t.length===0)return [];let s=[];for(let i of t){let n=0;for(let a of i.__listeners)(!o||o(a,i))&&s.push([a,n,i.__listeners]),n++;}return this._decListenerExecCount(s),s.map(i=>this._executeListener(i[0],e,r,true))}_decListenerExecCount(t){for(let e=t.length-1;e>=0;e--){let r=t[e][0];r[2]++,r[1]>0&&r[1]<=r[2]&&(t[e][2].splice(t[e][1],1),this.listenerCount--);}}getListeners(t){let e=[],r=t.split(this._delimiter);this._traverseToPath(this.listeners,r,s=>{e.push(s);});let o=[];return e.map(s=>{o.push(...s.__listeners);}),o}clearRetainMessages(t){t?this.retainedMessages.delete(t):this.retainedMessages.clear();}emit(){let[t,e]=Qc(arguments),r=t.type.split(this._delimiter);e.retain&&this.retainedMessages.set(t.type,t);let o=(l,c)=>{let u=this._options.transform;if(!hi(u))return [l,c];let p=u.call(this,l);return p===l?[l,c]:[{...l,payload:p},{...c,rawEventType:l.type,flags:(c.flags||0)|1}]},s=[],i=[];this._traverseToPath(this.listeners,r,l=>{i.push(l);});let[n,a]=o(t,e);if(s.push(...this._executeListeners(i,n,a)),e.broadcast){let l=Jc(this.listeners,r,this._delimiter);for(let{node:c,type:u}of l){if(!c.__listeners||c.__listeners.length===0)continue;let p,m;if(e.broadcast===true)p={...t,type:u},m=e;else {let y=e.broadcast.call(this,u,t,e);if(!y)continue;Array.isArray(y)?[p,m]=y:(p=y,m=e);}let[f,g]=o(p,m);s.push(...this._executeListeners([c],f,g));}}return this._options.expandEmitResults&&Kc(s),s}broadcast(t,e,r,o){let s=o?{broadcast:r??true,retain:true}:{broadcast:r??true};return this.emit(t,e,s)}async emitAsync(){let t=await Promise.allSettled(this.emit.apply(this,arguments));return Xc(t)}};function sa(t,e){let r=Object.keys(t),o=Object.values(t),s=e?.disabledGlobals||["alert","window","document"];if(s&&s.length>0){let i=new Set(r),n=s.filter(a=>!i.has(a));n.length>0&&(r.push(...n),o.push(...Array.from({length:n.length}).fill(void 0)));}return (i,n)=>{try{let a=[...r,...Object.keys(n||{})],l=[...o,...Object.values(n||{})];return new Function(...a,`return ${i}`)(...l)}catch(a){if(e?.onError){let l=e.onError(a,i);if(l!==void 0)return l}throw a}}}function tu(t,e,r){let o=r?._getRefStore||(()=>{let s=e.options.refStore||t.options.refStore;if(s)return new WeakRef(s)});if(typeof o=="function"){let s=o();s&&(e.refStateContext=ia(s,e));}}function ia(t,e){let r=null;function o(s,i){let n=t.deref(),a=Array.isArray(n)?n:[n],l=(s?.startsWith("@")?s:`@/${s||""}`).substring(1),[c,u]=l.split("/"),p=a.length===1&&c===""?a[0]:a.find(m=>m&&m.id===c);if(p&&a.length>0){let{runArgs:m,reactive:f=true}=i||{};if(f&&(r||(r=new Map),p&&!r.has(l))){let g=p.watch(u,()=>{e.run(m);});r.set(l,g);}return V(p.state,u)}}return {ref:o,off:()=>{r&&(r.forEach(s=>s.off()),r.clear(),r=null);}}}function fi(t){let e=[];e.push(t.on("observer/*/created",({observer:r,context:o})=>{tu(t,r,o?.value);})),e.push(t.on("observer/*/destroyed",r=>{r.refStateContext?.off();})),e.push(t.on("observer/*/run",({observer:r,args:o})=>{r.refStateContext&&(o.ref||(o.ref=r.refStateContext.ref));})),t.once("unload",()=>{try{e.forEach(r=>r.off());}finally{e.splice(0,e.length);}});}function Ye(t,e,r=C){let o=[];try{return typeof e=="function"&&(e=e.call(t,t)),o=Array.isArray(e)?e:typeof e=="string"?le(e,r):[],o.length>0?V(t,o):t}catch{return t}}var mi=(i=>(i.Root="ROOT",i.Current="CURRENT",i.Parent="PARENT",i.Depends="DEPENDS",i.Self="SELF",i))(mi||{});function eu(t,e,r){let o=e===void 0?r:e;if(typeof o=="function")try{o=o.call(t.store,t);}catch{}return o===void 0?r===void 0?"CURRENT":r:o}function Kt(t,e,r,o){let s=t.store.state,i=t.store.options;if(typeof i.getRootScope=="function"){let u=i.getRootScope(t,{observerType:e,valuePath:r?.path});u!==void 0&&(s=u);}let{path:n,parentPath:a}=r||{},l=eu(t,o.scope,i.scope),c=s;try{l==="CURRENT"?c=Ye(s,a):l==="PARENT"?c=Ye(s,n.slice(0,n.length-2<0?0:n.length-2)):l==="ROOT"?c=s:l==="DEPENDS"?c=t.depends?.map(u=>Ye(s,u)):typeof l=="string"?l.startsWith("@")?c=Kt(t,e,r,{...o,scope:Kt(t,e,{...r,path:l.slice(1).split(i.delimiter)},{...o,scope:l.slice(1)})}):c=Ye(s,$r(t.path,l)):Array.isArray(l)&&(c=Ye(s,l));}catch(u){t.store.logger.error(`Error while getting computed scope ${t.toString()}: ${u.message}`,"error");}return c}var zr=class{constructor(e,r,o){this.descriptor=r;this.context=o;this._id="";this._associated=false;this._attached=false;this._destroyed=false;this._depends=[];this._subscribers=[];this._running=false;this.store=e,this._associated=o!==void 0,this._getter=r.getter,this._options=Object.assign({enable:true,group:"",depends:[],throwError:true},r.options),this._id=this._options.id||(this._associated?Gt(o?.path):Tr());let s=o||this._options.anchor;this.context=s,this._path=s?.path||[`#${this._id}`],this._path||(this._path=[`#${this._id}`]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=Se(this._path,this._options.depends),G(this.store,`observer/${this.id}/created`,{context:s,observer:this}),this._onInitial();}get type(){return this.descriptor.type}get options(){return this._options}get id(){return this._id}get associated(){return this._associated}get async(){return this._options.async}get running(){return this._running}get enable(){return this._options.enable}set enable(e){this._options.enable=e;}set group(e){this._options.group=e;}get group(){return this._options.group}get initial(){return this._initial}set initial(e){this._initial=e;}get path(){return this._path}get attached(){return this._attached}get destroyed(){return this._destroyed}get depends(){return this._depends}set depends(e){this._depends=e;}get getter(){return this._getter}set getter(e){this._getter=e;}get strPath(){return this._strPath||(this._strPath=this._path.join(this.store.options.delimiter)),this._strPath}get error(){return this._error}set error(e){this._error=e;}toString(){return `ObserverObject<${this.strPath}>`}get value(){return this._associated?V(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)}set value(e){if(this._associated)Mt(this.store.state,this._path,e);else {let r=this._value;e!==r&&(this._value=e,this.store.emit(`observer/${this.id}/updated`,{type:"set",path:this.path,value:e,oldValue:r}));}}_onInitial(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:true}),this.onInitial();}onInitial(){}onInitOptions(e){}update(e,r){this.store.update(()=>{this.value=e;},r);}silentUpdate(e){this.update(e,{silent:true});}watch(e,r){let o;return this._associated?o=this.store.watch(this.getValueWatchPath(),s=>{e.call(this,s);},r):o=this.store.on(`observer/${this.id}/updated`,s=>{e.call(this,s);}),this._subscribers.push(o),o}getValueWatchPath(){return this.path.join(this.store.options.delimiter)}getDepends(){return this.depends}onDependsChange(e){}attach(){!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this._attached=true);}detach(){this._attached&&(this._subscribers.forEach(e=>{e.off();}),this._attached=false,this._subscribers=[]);}destroy(){this._destroyed||(this._destroyed=true,this.onDestroy(),this.detach(),this.store.off(`observer:set:${this.id}`),Map.prototype.delete.call(this.store.computedObjects,this.id),this.store.watchObjects&&Map.prototype.delete.call(this.store.watchObjects,this.id),G(this.store,`observer/${this.id}/destroyed`,this));}onDestroy(){}get shadowStore(){return this._shadowStore||(this._shadowStore=W(this.store.options.getShadowStore)?this.store.options.getShadowStore()||this.store:this.store),this._shadowStore}run(...e){}reset(){}};var Yt=class extends zr{constructor(r,o,s){super(r,o,s);this.descriptor=o;o.options.depends=Se(this.path,this.options.depends),this.silentUpdate(this.initial);}toString(){return `ComputedObject<${Gt(this.path)}>`}getValue(){return this.value}_reportComputedStatus(r,o){if(!this[`_${r}`]){let i=(this.options.reports||{})[r];(typeof i=="string"||Array.isArray(i)&&i.length>0)&&(this[`_${r}`]=Or(i,this.path));}Array.isArray(this[`_${r}`])&&this.store.update(s=>{Mt(s,this[`_${r}`],o);});}isDisable(r){return !this.store.options.enableComputed||!this.enable&&r!==true||r===false}run(r){throw new Error("Method not implemented.")}detach(){super.detach(),this.store.computedObjects.delete(this.id);}};var Br=class extends Yt{constructor(){super(...arguments);this._firstRun=false;this.lite=true;}get async(){return  true}onInitial(){this.initial=this.options.initial,this.attach(),setTimeout(()=>{(this.options.immediate===true||this.options.immediate==="auto"&&this.options.initial===void 0)&&this.run({first:true});},0);}async run(r){let{first:o}=r??{};if(this.isDisable(r?.enable)){this.store.logger.warn(()=>`Async computed <${this.toString()}> is disabled`);return}this.error=void 0,this._firstRun=true;let s=r?Object.assign({first:o},this.options,r):this.options,i=Kt(this,"sync",this.context,s),{reentry:n}=s;if(this._running&&!n){this.store.logger.warn(()=>`Async computed: ${this.toString()} is running, can't reentry`),G(this.store,`observer/${this.id}/cancel`,{reason:"reentry",observer:this});return}this._running=true;try{return await this.executeGetter(i,s)}finally{this._running=false;}}async executeGetter(r,o){let s={getSnap:a=>Pr(a),extras:o.extras,operate:o.operate,first:o.first};this.error=void 0;let i,n;try{this._reportComputedStatus("loading",!0),G(this.store,`observer/${this.id}/run`,{args:s,scope:r,observer:this}),n=await this.getter.call(this,r,s),o.raw&&U(n),this.store.peep(()=>{this.value=n;}),this._reportComputedStatus("error",void 0);}catch(a){i=a,this._reportComputedStatus("error",a.message);}finally{this._reportComputedStatus("loading",false);}i?(this.error=i,G(this.store,`observer/${this.id}/error`,{error:i,observer:this})):G(this.store,`observer/${this.id}/done`,{value:n,observer:this}),this.onDoneCallback(o,n,r,n);}onDoneCallback(r,o,s,i){typeof r.onDone=="function"&&r.onDone.call(this,{id:this.id,path:this.path,timeout:false,abort:false,value:i,error:o,scope:s});}onDependsChange(r){this.run({operate:r,first:!this._firstRun});}};var jr=class extends Yt{get async(){return  false}onInitial(){this.collectDependencies();}run(e){let{first:r,operate:o}=Object.assign({first:false,operate:void 0},e);if(this.error=void 0,!r&&this.isDisable(e?.enable)){this.store.logger.warn(`Sync computed <${this.toString()}> is disabled`);return}let s=e?Object.assign({},this.options,e):this.options,i=Kt(this,"sync",this.context,s);this.error=void 0;let n=s.initial;try{let a={operate:o,first:r};G(this.store,`observer/${this.id}/run`,{args:a,scope:i,observer:this}),n=this.getter.call(this,i,a),s.raw&&U(n);}catch(a){this.error=a;}this.onDone(r,n,s);}onDone(e,r,o){let s=r;if(this.error&&W(o.onError)){let i=o.onError(this.error);i!==void 0&&(s=i);}if(e&&(this.initial=s),this.error||this.store.peep(()=>{o.raw&&U(s),this.value=s;}),!e)if(this.error){if(G(this.store,`observer/${this.id}/error`,{error:this.error,observer:this}),this.options.throwError)throw this.error}else G(this.store,`observer/${this.id}/done`,{value:s,observer:this});}collectDependencies(){let e=[],r=this.shadowStore.watch(o=>{e.push(o.path);},{operates:["get"]});this.run({first:true}),r.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&e.push(...Se(this.path,this.options.depends)),this.depends=Lr(e),this.attach();}onDependsChange(e){this.run({operate:e});}};var na={sync:(t,e,r)=>{let o=new jr(t,e,r);return t.computedObjects.set(o.id,o),o},async:(t,e,r)=>{let o=new Br(t,e,r);return t.computedObjects.set(o.id,o),o},schema:(t,e,r)=>{if(t.options.configManager){let{path:o,value:s}=r,i=t.configManager.add(t,o,s);return t.configurabled.add(Gt(o)),{initial:i}}else return {initial:e.getter()}}};function aa(t){return typeof t=="string"&&t.startsWith("```")&&t.endsWith("```")}function la(t,e){return (...r)=>{try{return t.call(this,...r)}catch(o){return this.logger.error(o),e}}}var $o=()=>{},Ro=t=>(...e)=>{W(e[0])&&(e[0]=e[0]()),t(...e);};function ca(t=false){return {debug:t?$o:Ro(console.debug),info:t?$o:Ro(console.info),warn:t?$o:Ro(console.warn),error:t?$o:Ro(console.error)}}function gi(){let t=arguments[0];if(typeof t!="function")throw new Error("computed getter must be a function");let e=[],r=Object.assign({},Ae());if(arguments.length===1)e=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))r.depends=arguments[1];else if(typeof arguments[1]=="object")Object.assign(r,arguments[1]),r.depends=qe(r.depends);else throw new Vr;else arguments.length>=3&&(e=qe(arguments[1]),Object.assign(r,arguments[2]),r.depends=e);r.async=r.async===true||ko(t)||arguments.length>=2&&Array.isArray(arguments[1]);let o=()=>{let s={type:r.async?"async":"sync",getter:t,options:r,[Cr]:true};return r.async&&(s.liteAsync=true),s};return o[Us]=true,o[ct]=r.async?"async":"sync",o}function ru(t){Ys(t)&&Rr(t,({value:e,key:r,parent:o})=>{W(e)&&(r==="validate"||r.startsWith("on")||r.startsWith("render")||r.startsWith("to"))&&(o[r]=U(e));});}function ou(t){let e={getter:t[0],options:Object.assign({onInvalid:void 0},t[1])};return ru(e.options),e}function Po(t,e){let r=ou([t,e]),o=t;typeof o=="object"&&U(o),r.options.datatype=Array.isArray(o)?"array":typeof o,r.options.errorMessage||(r.options.errorMessage="{error}");let s=()=>({type:"schema",getter:()=>o,options:r.options});return s[ct]="schema",s}var bi=Po;var ua={computed:gi,configurable:bi,schema:Po};var Lo=Symbol("autostore.broadcast");function pa(t){if(t==null||typeof t!="object"||t instanceof Set)return  false;if(Array.isArray(t)||t instanceof Map)return  true;let e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}function su(t){let e=t.type;return e==="set"||e==="delete"?pa(t.value):e==="update"?(!t.indexs||t.indexs.length===0)&&pa(t.value):false}function iu(t,e,r){return !e||e<=0?[t]:e===1?[t,`${t}${r}*`]:[`${t}${r}**`]}var gt=class t extends To{constructor(r,o){super(Object.assign({id:Tr(),debug:false,enableComputed:true,reentry:true,lazy:false,enableValueExpr:true,shadow:false,resetable:false,plugins:[]},o,{delimiter:"/",transform:s=>s.payload}));this.__AUTO_STORE__=true;this._operates=new To({delimiter:".",transform:r=>r.payload});this._silenting=false;this._batching=false;this._batchOperates=[];this._updateFlags=0;this._peeping=false;this._subscribers=[];this._createSandbox(),this._createConfigManager(),this.computedObjects=new Ir(this),this._subscribeHooks(),this._installPlugins(),this._data=ta.call(this,r||{},{notify:this._notify.bind(this),createObserverObject:this.handleReactiveObject.bind(this)}),this.getSnap=this.getSnap.bind(this),this.watch=this.watch.bind(this),this.update=this.update.bind(this),this.peep=this.peep.bind(this),this.silentUpdate=this.silentUpdate.bind(this),this.batchUpdate=this.batchUpdate.bind(this),this.collectDependencies=this.collectDependencies.bind(this),this._enableReset(),this.options.lazy||Rr(this._data,this._onFirstEachState.bind(this)),this._options.debug&&typeof globalThis.__AUTOSTORE_DEVTOOLS__=="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(this),this.emit("load",this);}static{this.observers=na;}static{this.sandboxVars=ua;}get id(){return this.options.id}get state(){return this._data}get plugins(){return this.options.plugins}get operates(){return this._operates}get configurabled(){return this._configurabled||(this._configurabled=new Set),this._configurabled}get errors(){return this._errors||(this._errors={}),this._errors}get options(){return super.options}get silenting(){return this._silenting}get delimiter(){return C}get batching(){return this._batching}get peeping(){return this._peeping}get configManager(){return this._configManager}get configKey(){return this.options.configKey===void 0?this.id:this.options.configKey}get logger(){return this._logger||(this._logger=this.options.logger||ca(this.options.debug)),this._logger}get resetable(){return this.options.resetable??false}set resetable(r){if(r){if(this._resetWatcher)return;this._enableReset();}else this._resetWatcher&&(this._resetWatcher.off(),this._resetWatcher=void 0),this.updatedState={};this.options.resetable=r;}_enableReset(){this.updatedState={},this._resetWatcher=this.watch(({path:r,oldValue:o,type:s})=>{if(r.length===0||s==="batch")return;let i=r.join(this.delimiter||".");!i.startsWith("#")&&this.updatedState&&!(i in this.updatedState)&&(this.updatedState[i]=o);});}_createSandbox(){if(this.options.enableValueExpr){let r=W(this.options.sandbox?.create)?this.options.sandbox.create:sa;this._safeEval=r(t.sandboxVars,{onError:(o,s)=>(this.logger.error(o),s)});}}_installPlugins(){let r=this.options.plugins;r.push(fi);let o=globalThis.__AUTOSTORE_PLUGINS__;Array.isArray(o)&&r.push(...o),r.forEach(s=>{try{typeof s=="function"&&s(this);}catch(i){this.logger.error(`Error while installing the plugin<${s.name}>:{}`,i.message);}});}_createConfigManager(){let r=this.options.configManager;this.options.configKey===void 0&&(this.options.configKey=this.id),r&&typeof r=="object"&&"add"in r?this._configManager=r:globalThis[Wt]&&r!==false&&(this._configManager=globalThis[Wt]);}_onFirstEachState({value:r,path:o}){if(typeof r=="string"){if(this.options.enableValueExpr===false||!W(this._safeEval))return;let s=r.trim();if(aa(s)){if(s.length<=6)return;this.update(i=>{let n=s.slice(3,s.length-3).trim();if(!n)return;let a=this._safeEval?.(n,this.options.sandbox?.context||{});Mt(i,o,a);});}}}_subscribeHooks(){Object.entries({"observer/initial":"onObserverInitial","observer/*/created":"onObserverCreated","observer/*/run":"onObserverRun","observer/*/done":"onObserverDone","observer/*/cancel":"onObserverCancel","observer/*/error":"onObserverError","observer/*/destroyed":"onObserverDestroyed"}).forEach(([o,s])=>{let i=this.options?.[s];if(i==null)return;let n=(Array.isArray(i)?i:[i]).filter(a=>typeof a=="function");this._subscribers.push(...n.map(a=>this.on(o,la.call(this,a))));});}_notify(r){if(this._peeping&&r.type==="get"||(this._batching&&this._batchOperates.push(r),this._silenting))return;r.flags=this._updateFlags;let o=r.path.join(this.delimiter);su(r)?this._broadcastOperate(o,r):this.operates.emit(o,r);}_broadcastOperate(r,o){let s=new Set;this.computedObjects.forEach(c=>s.add(c.path.join(this.delimiter)));let i=o.path,n=o.type,a=n==="delete"?void 0:o.value,l=n==="delete"?o.value:o.oldValue;this.operates.broadcast(r,o,(c,u)=>{if(s.has(c))return null;let p=c.split(this.delimiter),m=p.slice(i.length);if(m.length===0)return null;if(m.some(g=>g==="*"||g==="**"))return {...u,type:c,payload:{...o,path:i,broadcast:true}};let f=this._peeping;this._peeping=true;try{let g=a!=null&&V(a,m,Lo)!==Lo,y=l!=null&&V(l,m,Lo)!==Lo;if(!g&&!y)return null;let S=g?V(a,m):void 0,v=y?V(l,m):void 0;if(g&&y&&S===v||typeof S=="function"||typeof v=="function")return null;let A={...o,type:g?"set":"delete",path:p,value:S,oldValue:v,parentPath:p.slice(0,-1),parent:g?V(a,m.slice(0,-1)):V(l,m.slice(0,-1)),indexs:[],broadcast:!0};return {...u,type:c,payload:A}}finally{this._peeping=f;}});}watch(){let r=typeof arguments[0]=="function"||["*","**"].includes(arguments[0])||Array.isArray(arguments[0])&&arguments[0].length===0,o=typeof arguments[0]=="function"?arguments[0]:arguments[1],s=arguments.length>=2&&typeof arguments[arguments.length-1]=="object"?arguments[arguments.length-1]:void 0,i=(n,a)=>l=>{if(pi(l,n)&&!(typeof a=="function"&&!a(l)))try{if(this._peeping=!0,l.type==="batch"){let c=l.value.filter(u=>pi(u,n));if(c.length>0)l.value=c;else return}o(l);}finally{this._peeping=false;}};if(r){let{operates:n,filter:a}=Object.assign({once:false,operates:"write"},s),l=i(n,a);return this.operates.onAny(l)}else {let n=arguments[0],a=Array.isArray(n)?n.map(v=>typeof v=="string"?v:v.join(this.delimiter)):[n],{once:l,operates:c,filter:u,depth:p}=Object.assign({once:false,operates:"write"},s),m=l?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),f=[],g=i(c,u),y=l||!p||p<=0?0:p,S=new Set;return a.forEach(v=>{iu(v,y,this.delimiter).forEach(A=>S.add(A));}),S.forEach(v=>{f.push(m.call(this,v,g));}),{off:()=>f.forEach(v=>{v.off();})}}}handleReactiveObject(r,o,s,i){let n=ea(o),a={path:r,value:o,parentPath:s,parent:i},l=this.createObserverObject(n,a);return l?l.initial:o}reset(r){if(!this.resetable||!this.updatedState){this.logger.warn("Resetable \u672A\u542F\u7528\uFF0C\u8BF7\u5148\u6267\u884C store.resetable = true");return}let o=this.updatedState,s=this.delimiter||".",i=r?`${r}${s}`:"";this.batchUpdate(n=>{for(let[a,l]of Object.entries(o))r&&!a.startsWith(i)||Mt(n,le(a,s),l);}),this.updatedState={},this.emit("reset",r);}createObserverObject(r,o){if(r){let s=t.observers[r.type];if(s)return s(this,r,o)}}silentUpdate(r){this.update(r,{silent:true});}batchUpdate(r){this.update(r,{batch:true,onInvalid:"pass"});}update(r,o){let{batch:s=false,reply:i=true,silent:n=false,peep:a=false,flags:l=0,onInvalid:c}=o||{};if(typeof r=="function"){this._updateFlags=l,this._updateValidateBehavior=c,n&&(this._silenting=true),s&&(this._batching=true,this._silenting=true),a&&(this._peeping=true);try{let u=r(this.state);if(s&&Xs(u))throw new Error("Batch update method can't be async function")}finally{this._silenting=false,this._batching=false,this._peeping=false,this._updateFlags=0,this._updateValidateBehavior=void 0,this.replyBatchOperates(i,s);}}else throw new Error("update method must provide a function argument")}replyBatchOperates(r,o){if(this._batchOperates.length>0){let s=[...this._batchOperates];this._batchOperates=[],r&&s.forEach(i=>{i.reply=true,this._notify(i);});try{let i=o===!0?Ws:String(o);this.operates.emit(i,{type:"batch",path:[i],value:s});}finally{this._batchOperates=[];}}}peep(){let r=typeof arguments[0]=="function"?()=>arguments[0](this.state):()=>V(this.state,Array.isArray(arguments[0])?arguments[0]:le(arguments[0],this.delimiter));this._peeping=true;try{return r()}finally{this._peeping=false;}}collectDependencies(r,o="*"){let s=[],i=this.watch(n=>{s.push(n.path);},{operates:o});try{r();}finally{i.off();}return Lr(s)}destroy(){this.offAll(),this._operates.offAll(),this.computedObjects.clear(),this._resetWatcher?.off(),this._resetWatcher=void 0,this._subscribers.forEach(r=>r.off()),this._configManager?.remove?.(this),this.emit("unload",this);}getSnap(r){let{reserveAsync:o,entry:s,includeFunc:i}=Object.assign({reserveAsync:true},r);return Mr(s?V(this._data,s):this._data,{reserveAsync:o,includeFunc:i})}toString(){return `AutoStore<${this.id}>`}};var Nr=class extends gt{constructor(r,o){let s=Object.assign({global:true,configManager:false,autoload:true,autosave:true,scope:"ROOT"},o);super({},s);this.source=r;this.dirtyValues={};this._reseting=false;this._loadingCount=0;if(s.global!==false){let i=s.global===true?Wt:s.global;return globalThis[i]===void 0&&(globalThis[i]=this),s.autoload&&this.load().catch(()=>{}),globalThis[i]=this,this}s.autoload&&this.load().catch(()=>{});}get fields(){return this.state}get size(){return Object.keys(this.fields).length}async load(){let r=await this.source.load();this._loadingCount++;let o=false;try{this.update(s=>{Object.entries(r).forEach(([i,n])=>{let a=s[i];a?(a.value=n,o=!0):s[i]={value:n};});},{silent:!0}),o&&await new Promise(s=>setTimeout(s,0));}finally{this._loadingCount--,this.dirtyValues={};}}async save(r){let o=r?this._getValues():this.dirtyValues;Object.keys(o).length>0&&(await this.source.save?.(o),this.dirtyValues={});}_getValues(){return Object.entries(this.state).reduce((r,[o,s])=>(r[o]=s.value,r),{})}async reset(){if(!this._reseting){this._reseting=true;try{this.dirtyValues={},Object.values(this.state).forEach(r=>{try{let o=r.default;o!==void 0&&(r.value=ti(U(o),{slient:!0,onInvalid:"none"}));}catch{}}),await new Promise(r=>setTimeout(r,0));}finally{typeof this.source.reset=="function"&&this.source.reset.call(this),this._reseting=false,this.dirtyValues={};}}}onUpdate(r,o,s){if(!(this._loadingCount>0||this._reseting))try{this.dirtyValues[o]=s,this.options.autosave&&Promise.resolve(this.source.save?.(this.dirtyValues)).then(()=>{this.dirtyValues={};});}finally{this._notify({type:"set",path:[o,"value"],value:s});}}remove(r){let o=r.options.delimiter;r.configurabled.forEach(s=>{let n=[...s.split(o)];r.options.configKey&&n.splice(0,0,r.options.configKey);let a=n.join(C);delete this.state[a],delete this.dirtyValues[a];});}add(r,o,s){this.operates.options.delimiter=r.options.delimiter;let i=Dr(s)?s():s,n=Array.isArray(o)?o:o.split("."),a=n.join(r.options.delimiter),l=[...n];r.options.configKey&&l.splice(0,0,r.options.configKey);let c=i.getter();i.options.default===void 0&&(i.options.default=c),i.options.value=c,r.options.defaultSchema&&Object.keys(r.options.defaultSchema).forEach(p=>{let m=r.options.defaultSchema[p];i.options[p]===void 0&&(i.options[p]=m);}),i.options.onInvalid===void 0&&(i.options.onInvalid="throw"),this._installValidator(a,i,r);let u=this.peep(p=>V(p,[l.join(C),"value"]));return this._handleRefState(i.options,r),this.state[Gt(l)]=i.options,u!==void 0&&(i.options.value=u),this._createValueProxy(i,r,n),u||c}_handleRefState(r,o){Object.values(r).forEach(s=>{W(s)&&!qt(s)&&(s._getRefStore=()=>new WeakRef(o));});}_installValidator(r,o,s){if(o.options.required===true){let i=o.options.validate,n=o.options.errorMessage,a=!n||n==="{error}"?"{label}\u4E0D\u80FD\u4E3A\u7A7A":n,l=(u,p,m)=>{if(typeof u=="string"&&u.length===0){let f=new Ee(a);throw f.onInvalid="throw-pass",f}return W(i)?i.call(this,u,p,m):true};l.getErrorMessage=u=>typeof a=="string"?a.params({...o.options,error:u.message,errorStack:u.stack,path:r}):u.message;let c=o.options.onInvalid;c!==void 0&&(l.onInvalid=c),s.options.validators||(s.options.validators={}),s.options.validators[r]=l;}else if(W(o.options.validate)){let i=o.options.errorMessage;o.options.validate.getErrorMessage=a=>typeof i=="string"?i.params({...o.options,error:a.message,errorStack:a.stack,path:r}):a.message;let n=o.options.onInvalid;n!==void 0&&(o.options.validate.onInvalid=n),s.options.validators||(s.options.validators={}),s.options.validators[r]=o.options.validate;}else s.options.validators&&delete s.options.validators[r];}_createValueProxy(r,o,s){let i=this;return Object.defineProperty(r.options,"value",U({get(){let n=V(o.state,s);return i._notify({type:"get",path:[...s,"value"],value:n}),n},set(n){o.update(a=>{Mt(a,s,n);}),i._notify({type:"set",path:[...s,"value"],value:n});}}))}getConfigValue(r){return this.peep(o=>V(o,[...r,"value"]))}};function nu(t,e=0){try{t!==null&&typeof t=="object"&&(t[ae]=e>0?1:0);}catch{}return t}function au(t){let e=t?.[ae];return t!==null&&typeof t=="object"&&(e===true||typeof e=="number")}function Fr(t){if(Array.isArray(t))return t.map(e=>Fr(e));if(typeof t=="function"){if(t[ct]==="schema"){let e=t,r=(...o)=>{let s=e(...o);return s&&typeof s=="object"?{...s,options:Fr(s.options)}:s};return r[ct]="schema",r}return t}if(t!==null&&typeof t=="object"){let e={};for(let r of Object.keys(t))e[r]=Fr(t[r]);return e}return t}var Et=class extends H{constructor(){super();this.forms=[];we();}static{this.styles=[xo,So,x`
            :host {
                display: block;
                width: 100%;
                background-color: var(--auto-bgcolor);
                    font: var(--auto-font);
            }
        `];}firstUpdated(){this.forms=this.getForms(),this.forms.length===0&&setTimeout(()=>{this.forms=this.getForms();});}getForms(){let r=this.shadowRoot.querySelector("slot");return r?r.assignedElements({flatten:true}):[]}bind(r){this.store=r,this.forms&&this.forms.forEach(o=>{o.bind&&o.bind(r);});}getFormInfo(r,o){let s=r.getAttribute("icon")||r.dataset.icon,i=r.getAttribute("label")||r.dataset.label,n=r.getAttribute("title")||r.dataset.title,a=r.getAttribute("name")||r.dataset.name||"",l=this.active?this.active.split(",").includes(a):o===0;return {icon:s,label:i,title:n,name:a,active:l}}renderGroups(){}render(){return b`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `}};w([k("slot")],Et.prototype,"slotElement",2),w([h()],Et.prototype,"active",2),w([P()],Et.prototype,"forms",2);var da={};q(da,{ifDefined:()=>_});var fa={};q(fa,{when:()=>Q});function Q(t,e,r){return t?e(t):r?.(t)}exports.AutoFormTabs=class Ce extends Et{constructor(){super(...arguments);this.direction="top";this.hideLabel=false;}_getPlacement(){return this.direction==="left"?"start":this.direction==="right"?"end":this.direction}renderGroups(){return b`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${()=>this.dispatchEvent(new CustomEvent("tab-change"))}"
            >
                ${this.forms.map((r,o)=>{if(r.tagName!=="AUTO-FORM")return;let s=this.getFormInfo(r,o);return r.bind&&r.bind(this.store),r.setAttribute("border","none"),b`
                        <sl-tab
                            ?active=${s.active}
                            slot="nav"
                            title="${_(s.title||s.label)}"
                            panel="${o}"
                        >
                            ${s.icon?b`<sl-icon name="${s.icon}"></sl-icon>`:""}
                            ${Q(!this.hideLabel&&s.label,()=>b`<span class="label">${s.label}</span>`)}
                        </sl-tab>
                    `})}
                ${this.forms.map((r,o)=>b`<sl-tab-panel name="${o}" class="scrollbar"
                            >${r}</sl-tab-panel
                        >`)}
            </sl-tab-group>
        `}};exports.AutoFormTabs.styles=[Et.styles,x`
            auto-form {
                padding: 1.5em;
            }
            sl-tab-group {
                width: 100%;
                height: 100%;
            }
            sl-tab::part(base) {
                display: flex;
                align-items: center;
                font: var(--auto-font);
                font-size: calc(1.5 * var(--auto-font-size));
                color: var(--auto-color);                    
            }
            sl-tab sl-icon {
                &::part(svg) {
                    stroke-width: 1.1;
                }
            }
            sl-tab-group::part(tabs) {
                border: none;
                background-color: transparent;
            }
            /* 边框架 */
            sl-tab-group[placement='start']::part(nav) {
                border-right: var(--auto-border);
            }
            sl-tab-group[placement='end']::part(nav) {
                border-left: var(--auto-border);
            }
            sl-tab-group[placement='top']::part(nav) {
                border-bottom: var(--auto-border);
            }
            sl-tab-group[placement='bottom']::part(nav) {
                border-top: var(--auto-border);
            }

            sl-tab::part(base) {
                padding: calc(0.8 * var(--auto-spacing));
            }
            sl-tab-panel::part(base) {
                padding: 0;
                height: 100%;
                position: relative;
            }
            sl-tab-panel,
            sl-tab-group[placement='start'],
            sl-tab-group[placement='end'] {
                height: 100%;
                position: relative;
                overflow: auto;
            }
            sl-tab-group::part(base) {
                height: 100%;
            }
            sl-tab-group::part(body) {
                overflow: unset;
            }
            sl-tab-group[placement='top']::part(base),
            sl-tab-group[placement='bottom']::part(base) {
                display: flex;
                position: relative;
            }
            sl-tab-group[placement='top']::part(body),
            sl-tab-group[placement='bottom']::part(body) {
                flex-grow: 1;
                min-height: 0;
            }
            sl-tab-group[placement='top']::part(active-tab-indicator) {
                bottom: calc(var(--track-width) - 2px);
            }
            sl-tab-group[placement='bottom']::part(active-tab-indicator) {
                top: calc(var(--track-width) - 2px);
            }
            .label {
                font-size: var(--auto-font-size);
                padding-left: 0.5em;
            }
        `],w([h({type:String,reflect:true})],exports.AutoFormTabs.prototype,"direction",2),w([h({type:Boolean,reflect:true})],exports.AutoFormTabs.prototype,"hideLabel",2),exports.AutoFormTabs=w([ht("auto-form-tabs")],exports.AutoFormTabs);var ma=x`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`;var ba=new Map,lu=new WeakMap;function cu(t){return t??{keyframes:[],options:{duration:0}}}function ga(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Xe(t,e){ba.set(t,cu(e));}function Ze(t,e,r){let o=lu.get(t);if(o?.[e])return ga(o[e],r.dir);let s=ba.get(e);return s?ga(s,r.dir):{keyframes:[],options:{duration:0}}}function Je(t,e){return new Promise(r=>{function o(s){s.target===t&&(t.removeEventListener(e,o),r());}t.addEventListener(e,o);})}function Qe(t,e,r){return new Promise(o=>{if(r?.duration===1/0)throw new Error("Promise-based animations must be finite.");let s=t.animate(e,Ut(rt({},r),{duration:uu()?0:r.duration}));s.addEventListener("cancel",o,{once:true}),s.addEventListener("finish",o,{once:true});})}function uu(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function tr(t){return Promise.all(t.getAnimations().map(e=>new Promise(r=>{e.cancel(),requestAnimationFrame(r);})))}function vi(t,e){return t.map(r=>Ut(rt({},r),{height:r.height==="auto"?`${e}px`:r.height}))}var bt=class extends T{constructor(){super(...arguments),this.localize=new ot(this),this.open=false,this.disabled=false;}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=true),this.detailsObserver=new MutationObserver(t=>{for(let e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide());}),this.detailsObserver.observe(this.details,{attributes:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect();}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus());}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show());}async handleOpenChange(){if(this.open){if(this.details.open=true,this.emit("sl-show",{cancelable:true}).defaultPrevented){this.open=false,this.details.open=false;return}await tr(this.body);let{keyframes:e,options:r}=Ze(this,"details.show",{dir:this.localize.dir()});await Qe(this.body,vi(e,this.body.scrollHeight),r),this.body.style.height="auto",this.emit("sl-after-show");}else {if(this.emit("sl-hide",{cancelable:true}).defaultPrevented){this.details.open=true,this.open=true;return}await tr(this.body);let{keyframes:e,options:r}=Ze(this,"details.hide",{dir:this.localize.dir()});await Qe(this.body,vi(e,this.body.scrollHeight),r),this.body.style.height="auto",this.details.open=false,this.emit("sl-after-hide");}}async show(){if(!(this.open||this.disabled))return this.open=true,Je(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=false,Je(this,"sl-after-hide")}render(){let t=this.localize.dir()==="rtl";return b`
      <details
        part="base"
        class=${L({details:true,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};bt.styles=[I,ma];bt.dependencies={"sl-icon":Y};d([k(".details")],bt.prototype,"details",2);d([k(".details__header")],bt.prototype,"header",2);d([k(".details__body")],bt.prototype,"body",2);d([k(".details__expand-icon-slot")],bt.prototype,"expandIconSlot",2);d([h({type:Boolean,reflect:true})],bt.prototype,"open",2);d([h()],bt.prototype,"summary",2);d([h({type:Boolean,reflect:true})],bt.prototype,"disabled",2);d([z("open",{waitUntilFirstUpdate:true})],bt.prototype,"handleOpenChange",1);Xe("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Xe("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});bt.define("sl-details");var Mo=x`
    
    sl-input::part(input),
    sl-popup::part(display-input){        
        color: var(--auto-color);
    }  
 
    sl-input::part(input)::placeholder,
    sl-textarea::part(textarea)::placeholder{
        color: var(--auto-disable-color);
    }
    sl-button::part(label){
        color: color-mix(in hsl, var(--auto-primary-color), white 80%);
    }
     sl-button[variant=default]::part(label){
        color: var(--auto-color);
    }
    input,textarea{ 
        background-color: var(--auto-input-bgcolor);
    }

    sl-button{
        /* ThemePro 未安装时回落 shoelace 官方 primary-50 */
        --sl-color-primary-50: color-mix(in srgb, var(--t-color-primary-5, hsl(198.6 88.7% 48.4%)) 20%, transparent);
    }
    

`;var va=x`
    ${Mo}
    :host {
        display: flex;
        position: relative;
        flex-direction: column; /* 组件只使用column布局 */
        box-sizing: border-box;
        width: 100%;
        --auto-icon-size: 1.5em;
        background-color: var(--auto-bgcolor);
            font: var(--auto-font);
    }

    :host([fit]) {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
    }
    .header {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        gap: 0.5em;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-bottom:var(--auto-border);
        font: var(--auto-font);
        background-color: transparent;
        box-sizing: border-box;
        color: var(--auto-color);
    }
    .header:hover {
        color: var(--auto-theme-color);        
        filter: brightness(0.99);
    }
    .header.active {
        font-weight: 500;
    }
    .icon {
        font-size: var(--auto-icon-size);
        &.action {
            padding: 2px;
            cursor: pointer;
            box-sizing: border-box;
        }
        &.action:hover {
            color: var(--auto-color);
        }
        &.action:active {
            background-color:var(--auto-bgcolor);
        }
    }
    sl-icon-button sl-icon::part(svg) {
        stroke-width: 1.1;
    }
    .icon::part(svg) {
        stroke-width: 1.1;
    }
    .label {
        flex-grow: 1;
    }
    .panel-arrow {
        transition: transform 0.3s ease;
    }
    .header.active .panel-arrow {
        transform: rotate(180deg);
    }
    .content {
        position: relative;
        height: 0;
        padding: 0 15px;
        overflow: hidden;
        background-color: var(--auto-panel-bgcolor);
        border-bottom: var(--auto-border);
        visibility: hidden;
        flex-direction: column;
        box-sizing: border-box;
        color: var(--auto-color);
        /* 高度动画由组件 JS 以真实高度驱动（见 _animatePanel），
           此处只保留 padding/visibility 的补间与延迟隐藏 */
        transition: padding 0.18s ease, visibility 0s 0.18s; /* 延迟visibility变化，确保在动画完成后才隐藏 */
    }
    .content.active {
        height: auto;
        padding: 15px;
        transition: padding 0.18s ease, visibility 0s; /* 立即改变visibility */
        visibility: visible;
        flex-grow: 1; /* 当指定高度时，内容区域配置flex-grow=1 */
        display: flex;
    }
    /* 当组件有高度时，内容区域自动填充剩余空间 */
    :host([style*='height']) .content.active {
        overflow: auto;
    }
    /* 最后一个面板的内容区域不需要底部边框 */
    .content:last-of-type {
        border-bottom: none;
    }
    /* 隐藏slot元素但保持其功能 */
    .hidden-slot {
        display: none !important;
        visibility: hidden;
        position: absolute;
        pointer-events: none;
    }
    :host:first-child {
        border-top: none;
    }
    .header:last-of-type {
        border-bottom: none;
    }
    ${So}
`;var ya={};q(ya,{classMap:()=>L});var _a={};q(_a,{styleMap:()=>Hr});var wa="important",pu=" !"+wa,Hr=Lt(class extends ft{constructor(t){if(super(t),t.type!==it.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{let o=t[r];return o==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){let{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?r.removeProperty(o):r[o]=null);for(let o in e){let s=e[o];if(s!=null){this.ft.add(o);let i=typeof s=="string"&&s.endsWith(pu);o.includes("-")||i?r.setProperty(o,i?s.slice(0,-11):s,i?wa:""):r[o]=s;}}return F}});var Sa={};q(Sa,{repeat:()=>Xt});var xa=(t,e,r)=>{let o=new Map;for(let s=e;s<=r;s++)o.set(t[s],s);return o},Xt=Lt(class extends ft{constructor(t){if(super(t),t.type!==it.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let o;r===void 0?r=e:e!==void 0&&(o=e);let s=[],i=[],n=0;for(let a of t)s[n]=o?o(a,n):n,i[n]=r(a,n),n++;return {values:i,keys:s}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,o]){let s=kn(t),{values:i,keys:n}=this.dt(e,r,o);if(!Array.isArray(s))return this.ut=n,i;let a=this.ut??=[],l=[],c,u,p=0,m=s.length-1,f=0,g=i.length-1;for(;p<=m&&f<=g;)if(s[p]===null)p++;else if(s[m]===null)m--;else if(a[p]===n[f])l[f]=se(s[p],i[f]),p++,f++;else if(a[m]===n[g])l[g]=se(s[m],i[g]),m--,g--;else if(a[p]===n[g])l[g]=se(s[p],i[g]),Ne(t,l[g+1],s[p]),p++,g--;else if(a[m]===n[f])l[f]=se(s[m],i[f]),Ne(t,s[p],s[m]),m--,f++;else if(c===void 0&&(c=xa(n,f,g),u=xa(a,p,m)),c.has(a[p]))if(c.has(a[m])){let y=u.get(n[f]),S=y!==void 0?s[y]:null;if(S===null){let v=Ne(t,s[p]);se(v,i[f]),l[f]=v;}else l[f]=se(S,i[f]),Ne(t,s[p],S),s[y]=null;f++;}else yo(s[m]),m--;else yo(s[p]),p++;for(;f<=g;){let y=Ne(t,l[g+1]);se(y,i[f]),l[f++]=y;}for(;p<=m;){let y=s[p++];y!==null&&yo(y);}return this.ut=n,vo(t,l),F}});var Do=180;exports.AutoCollapse=class It extends H{constructor(){super(...arguments);this.active="";this.accordion=false;this.panels=[];this._activeArray=[];this._contentHeights=new Map;this._animCleanups=new Map;}firstUpdated(){this.panels=this.getPanels();}connectedCallback(){super.connectedCallback(),we(),this._activeArray=this.active?this.active.split(","):[];}disconnectedCallback(){super.disconnectedCallback(),this._animCleanups.forEach(r=>r()),this._animCleanups.clear();}getPanels(){let r=this.shadowRoot.querySelector("slot");return r?r.assignedElements({flatten:true}):[]}updated(r){r.has("active")&&typeof this.active=="string"&&(this._activeArray=this.active?this.active.split(","):[]),super.updated(r);}_getContentEl(r){return this.shadowRoot.querySelector(`.content[data-name="${r}"]`)}_measureContent(r){let o=r.style.height,s=r.style.overflow,i=r.style.maxHeight,n=r.style.transition;r.style.transition="none",r.style.height="auto",r.style.maxHeight="none",r.style.overflow="hidden";let a=r.scrollHeight;return r.style.height=o,r.style.maxHeight=i,r.style.overflow=s,r.style.transition=n,a}_animatePanel(r,o){let s=this._getContentEl(r);if(!s)return;this._animCleanups.get(r)?.(),this._animCleanups.delete(r);let i=this._contentHeights.get(r)??s.scrollHeight;if(o)s.style.transition="none",s.style.height="0px",s.offsetHeight,s.style.transition=`height ${Do}ms ease-out, padding ${Do}ms ease-out`,s.style.height=`${i}px`;else {let l=s.getBoundingClientRect().height;s.style.transition="none",s.style.height=`${l}px`,s.offsetHeight,s.style.transition=`height ${Do}ms ease-in, padding ${Do}ms ease-in`,s.style.height="0px";}let n=l=>{l.propertyName==="height"&&(a(),o&&(s.style.transition="none",s.style.height="auto"));},a=()=>{s.removeEventListener("transitionend",n),this._animCleanups.delete(r);};s.addEventListener("transitionend",n),this._animCleanups.set(r,a);}togglePanel(r){let o=this._activeArray.indexOf(r);if(o===-1)if(this.accordion){let s=this._activeArray.filter(i=>i!==r);this._activeArray=[r],this._runAnimations(r,true,s);}else this._activeArray=[...this._activeArray,r],this._runAnimations(r,true,[]);else {let s=[...this._activeArray];s.splice(o,1),this._activeArray=s,this._runAnimations(r,false,[]);}this.active=this._activeArray.join(","),this.dispatchEvent(new CustomEvent("change",{detail:{active:this.active}}));}_runAnimations(r,o,s){let i=this._getContentEl(r);i&&this._contentHeights.set(r,this._measureContent(i)),this._animatePanel(r,o),s.forEach(n=>this._animatePanel(n,false));}isPanelActive(r){return this._activeArray.includes(r)}_onActionClick(r,o){let s=new CustomEvent("action-click",{detail:{name:r},composed:true,bubbles:true});o.stopPropagation(),this.dispatchEvent(s);}_renderHeaderActions(r){let o=(r.getAttribute("data-actions")||"").split(",");if(o.length>0)return Xt(o,s=>{let[i,n]=s.split(":");return b`<sl-icon
                    part="action"
                    class="icon action"
                    name=${i}
                    title=${n}
                    @click=${a=>{this._onActionClick(i,a);}}
                ></sl-icon>`})}_renderHeader(r){let o=r.getAttribute("name")||r.dataset.name||"",s=r.getAttribute("label")||r.dataset.label||"",i=r.getAttribute("icon")||r.dataset.icon||"",n=this.isPanelActive(o);return b`
            <div
                part="header"
                class="header ${L({active:n})}"
                @click=${()=>this.togglePanel(o)}
            >
                ${i?b`<sl-icon name="${i}" class="icon"></sl-icon>`:""}
                <div part="label" class="label">${s}</div>
                ${this._renderHeaderActions(r)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `}renderPanels(){return this.panels.map(r=>{let o=r.getAttribute("name")||r.dataset.name||"",s=this.isPanelActive(o),i=Hr({padding:this.padding});return b`
                ${this._renderHeader(r)}
                <div
                    part="content"
                    data-name="${o}"
                    class="content scrollbar ${L({active:s})}"
                    style=${i}
                >
                    ${r}
                </div>
            `})}_onSlotChange(){let r=this.getPanels();if(r.length>0){let o=this.panels.map(i=>i.getAttribute("name")||i.dataset.name).filter(i=>!!i),s=r.filter(i=>!o.includes(i.getAttribute("name")||i.dataset.name));this.panels.push(...s),this.requestUpdate();}}render(){return b`
            ${this.renderPanels()}
            <slot @slotchange=${this._onSlotChange.bind(this)} style="display:none;"></slot>
        `}};exports.AutoCollapse.styles=[va],w([h({type:String,reflect:true})],exports.AutoCollapse.prototype,"active",2),w([h({type:String,reflect:true})],exports.AutoCollapse.prototype,"padding",2),w([h({type:Boolean,reflect:true})],exports.AutoCollapse.prototype,"accordion",2),w([P()],exports.AutoCollapse.prototype,"panels",2),w([P()],exports.AutoCollapse.prototype,"_activeArray",2),exports.AutoCollapse=w([ht("auto-collapse")],exports.AutoCollapse);exports.AutoFormCollapse=class ce extends Et{constructor(){super(...arguments);this.active="";this.accordion=false;}renderGroups(){return b`
            <auto-collapse
                style="flex-grow:1;min-height:0"
                active=${_(this.active)}
                padding=${_(this.padding)}
                ?accordion=${this.accordion}
            >
                ${this.forms.map(r=>{if(r.tagName==="AUTO-FORM")return r.bind&&r.bind(this.store),r.setAttribute("border","none"),r})}
            </auto-collapse>
        `}};exports.AutoFormCollapse.styles=[Et.styles,x`
            auto-form {
                padding: 1.5em;
            }
            sl-details {
                display: flex;
                flex-direction: column;
                min-height: 2em;
            }
            sl-details::part(base) {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            sl-details::part(summary) {
                display: flex;
                align-items: center;
                font-size: calc(1.5 * var(--auto-font-size));
            }
            sl-details::part(content) {
                flex-grow: 1;
            }
            sl-icon {
                &::part(svg) {
                    font-size: calc(1.5 * var(--auto-font-size));
                    stroke-width: 1.1;
                }
            }
            sl-details::part(header) {
                padding: var(--auto-spacing);
            }
            sl-details:not([open]) {
                flex-shrink: 0;
            }
            sl-details[open]::part(content) {
                border-top: var(--auto-border);
                padding: 0;
            }
            .header {
                display: flex;
                align-items: center;
                gap: 0.5em;
                .label {
                    font: var(--auto-font);
                    font-size: var(--auto-font-size);
                }
            }
            :host {
                display: flex;
                flex-direction: column;
            }
        `],w([h({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"active",2),w([h({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"padding",2),w([h({type:Boolean,reflect:true})],exports.AutoFormCollapse.prototype,"accordion",2),exports.AutoFormCollapse=w([ht("auto-form-collapse")],exports.AutoFormCollapse);var Zt=class{constructor(e,...r){this.initialClasses=[];this._lastUsedClasses=new Set;this.host=e,e.addController(this),this.initialClasses=r;}_forEachClasss(e,r){e&&e.forEach(o=>{typeof o=="string"?(r(o,true),this.host.classList.add(o)):Object.entries(o).forEach(([s,i])=>{r(s,i);});});}add(...e){this.host&&e&&this._forEachClasss(e,r=>{this.host.classList.add(r);});}remove(...e){this.host&&e&&this._forEachClasss(e,r=>{this.host.classList.remove(r);});}toggle(...e){this.host&&this._forEachClasss(e,r=>{this.host.classList.toggle(r);});}use(...e){if(!this.host)return;let r=new Set;this._forEachClasss(e,(o,s)=>{s?(this.host.classList.add(o),r.add(o)):this.host.classList.remove(o);});for(let o of this._lastUsedClasses)r.has(o)||this.host.classList.remove(o);this._lastUsedClasses=r;}has(e){return this.host.classList.contains(e)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var Aa=x`
    :host{
        display: flex;
        position: relative;
        flex-direction: row;
        box-sizing: border-box;
        .inline-border::slotted(*) {
            border-bottom: 1px solid red;
        }
        &.inline-border::slotted(*) {
            border-bottom: 1px solid blue;
        }
        &>::slotted(*){
            box-sizing: border-box;
        }
    }  
    
    /* direction */
    :host([direction=row]){
        flex-direction: row;
    }
    :host([direction=row-reverse]){
        flex-direction: row-reverse;
    }
    :host([direction=column]){
        flex-direction: column;
    }    
    :host([direction=column-reverse]){
        flex-direction: row-reverse;
    }
    /* align */
    :host([align=flex-start]){
        align-items: flex-start;
    }
    :host([align=center]){
        align-items: center;
    }
    :host([align=flex-end]){
        align-items: flex-end;
    }
    :host([align=stretch]){
        align-items: stretch;
    }
    /* justify */ 
    :host([justify=flex-start]){
        justify-content: flex-start;
    }
    :host([justify=center]){
        justify-content: center;
    }
    :host([justify=flex-end]){
        justify-content: flex-end;
    }
    :host([justify=stretch]){
        justify-content: stretch;
    }
    :host([justify=space-around]){
        justify-content: space-around;
    }
    :host([justify=space-between]){
        justify-content: space-between;
    }
    :host([justify=space-evenly]){
        justify-content: space-evenly;
    }
    :host([wrap]){
        flex-wrap: wrap;
    }
    :host([wrap=false]){
        flex-wrap: nowrap;
    }    
    :host([fit]){
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
    }

`;exports.AutoFlex=class ut extends H{constructor(){super(...arguments);this.classes=new Zt(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let r=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=r,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(o=>{o.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(o=>{o.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(r,o,s){super.attributeChangedCallback(r,o,s),this.updateStyles();}render(){return b` <slot></slot> `}};exports.AutoFlex.styles=Aa,w([h({type:String})],exports.AutoFlex.prototype,"direction",2),w([h({type:String})],exports.AutoFlex.prototype,"gap",2),w([h({type:Boolean})],exports.AutoFlex.prototype,"wrap",2),w([h({type:String})],exports.AutoFlex.prototype,"align",2),w([h({type:String})],exports.AutoFlex.prototype,"justify",2),w([h({type:String})],exports.AutoFlex.prototype,"border",2),w([h({type:String})],exports.AutoFlex.prototype,"grow",2),w([h({type:String})],exports.AutoFlex.prototype,"shrink",2),w([h({type:Boolean,reflect:true})],exports.AutoFlex.prototype,"fit",2),exports.AutoFlex=w([ht("auto-flex")],exports.AutoFlex);exports.AutoLoading=class ue extends H{constructor(){super(...arguments);this.tips="Loading";this.hide=false;this.size="2em";}render(){return this.hide?b``:b`  
            <sl-spinner style="font-size:${this.size};"></sl-spinner>
            <div>${this.tips}</div>
        `}};exports.AutoLoading.styles=x`    
        :host{
            display: flex;
            flex-direction: column;
            gap:0.5em;
            align-items: center;
            justify-content: center;
            height: 6em;
        }        
    `,w([h({type:String})],exports.AutoLoading.prototype,"tips",2),w([h({type:Boolean})],exports.AutoLoading.prototype,"hide",2),w([h({type:String})],exports.AutoLoading.prototype,"size",2),exports.AutoLoading=w([ht("auto-loading")],exports.AutoLoading);var Ea=x`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;var Ur=class extends T{constructor(){super(...arguments),this.localize=new ot(this);}render(){return b`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Ur.styles=[I,Ea];var Wr=new WeakMap,qr=new WeakMap,Gr=new WeakMap,yi=new WeakSet,Io=new WeakMap,Vo=class{constructor(t,e){this.handleFormData=r=>{let o=this.options.disabled(this.host),s=this.options.name(this.host),i=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof s=="string"&&s.length>0&&typeof i<"u"&&(Array.isArray(i)?i.forEach(a=>{r.formData.append(s,a.toString());}):r.formData.append(s,i.toString()));},this.handleFormSubmit=r=>{var o;let s=this.options.disabled(this.host),i=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=Wr.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!s&&!i(this.host)&&(r.preventDefault(),r.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),Io.set(this.host,[]);},this.handleInteraction=r=>{let o=Io.get(this.host);o.includes(r.type)||o.push(r.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let r=this.form.querySelectorAll("*");for(let o of r)if(typeof o.checkValidity=="function"&&!o.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let r=this.form.querySelectorAll("*");for(let o of r)if(typeof o.reportValidity=="function"&&!o.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=rt({form:r=>{let o=r.form;if(o){let i=r.getRootNode().querySelector(`#${o}`);if(i)return i}return r.closest("form")},name:r=>r.name,value:r=>r.value,defaultValue:r=>r.defaultValue,disabled:r=>{var o;return (o=r.disabled)!=null?o:false},reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():true,checkValidity:r=>typeof r.checkValidity=="function"?r.checkValidity():true,setValue:(r,o)=>r.value=o,assumeInteractionOn:["sl-input"]},e);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),Io.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction);});}hostDisconnected(){this.detachForm(),Io.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,Wr.has(this.form)?Wr.get(this.form).add(this.host):Wr.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),qr.has(this.form)||(qr.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Gr.has(this.form)||(Gr.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=Wr.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),qr.has(this.form)&&(this.form.reportValidity=qr.get(this.form),qr.delete(this.form)),Gr.has(this.form)&&(this.form.checkValidity=Gr.get(this.form),Gr.delete(this.form)),this.form=void 0));}setUserInteracted(t,e){e?yi.add(t):yi.delete(t),t.requestUpdate();}doAction(t,e){if(this.form){let r=document.createElement("button");r.type=t,r.style.position="absolute",r.style.width="0",r.style.height="0",r.style.clipPath="inset(50%)",r.style.overflow="hidden",r.style.whiteSpace="nowrap",e&&(r.name=e.name,r.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{e.hasAttribute(o)&&r.setAttribute(o,e.getAttribute(o));})),this.form.append(r),r.click(),r.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let e=this.host,r=!!yi.has(e),o=!!e.required;e.toggleAttribute("data-required",o),e.toggleAttribute("data-optional",!o),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&r),e.toggleAttribute("data-user-valid",t&&r);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let e=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault();}},zo=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false});Object.freeze(Ut(rt({},zo),{valid:false,valueMissing:true}));Object.freeze(Ut(rt({},zo),{valid:false,customError:true}));var Ca=x`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;var Bo=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=r=>{let o=r.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=e;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!e.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};var $=class extends T{constructor(){super(...arguments),this.formControlController=new Vo(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Bo(this,"[default]","prefix","suffix"),this.localize=new ot(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:zo}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),e=t?Fe`a`:Fe`button`;return ie`
      <${e}
        part="base"
        class=${L({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${_(t?void 0:this.disabled)}
        type=${_(t?void 0:this.type)}
        title=${this.title}
        name=${_(t?void 0:this.name)}
        value=${_(t?void 0:this.value)}
        href=${_(t&&!this.disabled?this.href:void 0)}
        target=${_(t?this.target:void 0)}
        download=${_(t?this.download:void 0)}
        rel=${_(t?this.rel:void 0)}
        role=${_(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?ie` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?ie`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};$.styles=[I,Ca];$.dependencies={"sl-icon":Y,"sl-spinner":Ur};d([k(".button")],$.prototype,"button",2);d([P()],$.prototype,"hasFocus",2);d([P()],$.prototype,"invalid",2);d([h()],$.prototype,"title",2);d([h({reflect:true})],$.prototype,"variant",2);d([h({reflect:true})],$.prototype,"size",2);d([h({type:Boolean,reflect:true})],$.prototype,"caret",2);d([h({type:Boolean,reflect:true})],$.prototype,"disabled",2);d([h({type:Boolean,reflect:true})],$.prototype,"loading",2);d([h({type:Boolean,reflect:true})],$.prototype,"outline",2);d([h({type:Boolean,reflect:true})],$.prototype,"pill",2);d([h({type:Boolean,reflect:true})],$.prototype,"circle",2);d([h()],$.prototype,"type",2);d([h()],$.prototype,"name",2);d([h()],$.prototype,"value",2);d([h()],$.prototype,"href",2);d([h()],$.prototype,"target",2);d([h()],$.prototype,"rel",2);d([h()],$.prototype,"download",2);d([h()],$.prototype,"form",2);d([h({attribute:"formaction"})],$.prototype,"formAction",2);d([h({attribute:"formenctype"})],$.prototype,"formEnctype",2);d([h({attribute:"formmethod"})],$.prototype,"formMethod",2);d([h({attribute:"formnovalidate",type:Boolean})],$.prototype,"formNoValidate",2);d([h({attribute:"formtarget"})],$.prototype,"formTarget",2);d([z("disabled",{waitUntilFirstUpdate:true})],$.prototype,"handleDisabledChange",1);$.define("sl-button");var Oa=x`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;var ka=(t="value")=>(e,r)=>{let o=e.constructor,s=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(i,n,a){var l;let c=o.getPropertyOptions(t),u=typeof c.attribute=="string"?c.attribute:t;if(i===u){let p=c.converter||Ft,f=(typeof p=="function"?p:(l=p?.fromAttribute)!=null?l:Ft.fromAttribute)(a,c.type);this[t]!==f&&(this[r]=f);}s.call(this,i,n,a);};};var Ta=x`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;var $a=Lt(class extends ft{constructor(t){if(super(t),t.type!==it.PROPERTY&&t.type!==it.ATTRIBUTE&&t.type!==it.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!On(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===F||e===D)return e;let r=t.element,o=t.name;if(t.type===it.PROPERTY){if(e===r[o])return F}else if(t.type===it.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(o))return F}else if(t.type===it.ATTRIBUTE&&r.getAttribute(o)===e+"")return F;return vo(t),e}});var E=class extends T{constructor(){super(...arguments),this.formControlController=new Vo(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Bo(this,"help-text","label"),this.localize=new ot(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r);}setRangeText(t,e,r,o="preserve"){let s=e??this.input.selectionStart,i=r??this.input.selectionEnd;this.input.setRangeText(t,s,i,o),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?true:!!t,o=this.helpText?true:!!e,i=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return b`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${L({input:true,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${_(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${_(this.placeholder)}
              minlength=${_(this.minlength)}
              maxlength=${_(this.maxlength)}
              min=${_(this.min)}
              max=${_(this.max)}
              step=${_(this.step)}
              .value=${$a(this.value)}
              autocapitalize=${_(this.autocapitalize)}
              autocomplete=${_(this.autocomplete)}
              autocorrect=${_(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${_(this.pattern)}
              enterkeyhint=${_(this.enterkeyhint)}
              inputmode=${_(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${i?b`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?b`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?b`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:b`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};E.styles=[I,Ta,Oa];E.dependencies={"sl-icon":Y};d([k(".input__control")],E.prototype,"input",2);d([P()],E.prototype,"hasFocus",2);d([h()],E.prototype,"title",2);d([h({reflect:true})],E.prototype,"type",2);d([h()],E.prototype,"name",2);d([h()],E.prototype,"value",2);d([ka()],E.prototype,"defaultValue",2);d([h({reflect:true})],E.prototype,"size",2);d([h({type:Boolean,reflect:true})],E.prototype,"filled",2);d([h({type:Boolean,reflect:true})],E.prototype,"pill",2);d([h()],E.prototype,"label",2);d([h({attribute:"help-text"})],E.prototype,"helpText",2);d([h({type:Boolean})],E.prototype,"clearable",2);d([h({type:Boolean,reflect:true})],E.prototype,"disabled",2);d([h()],E.prototype,"placeholder",2);d([h({type:Boolean,reflect:true})],E.prototype,"readonly",2);d([h({attribute:"password-toggle",type:Boolean})],E.prototype,"passwordToggle",2);d([h({attribute:"password-visible",type:Boolean})],E.prototype,"passwordVisible",2);d([h({attribute:"no-spin-buttons",type:Boolean})],E.prototype,"noSpinButtons",2);d([h({reflect:true})],E.prototype,"form",2);d([h({type:Boolean,reflect:true})],E.prototype,"required",2);d([h()],E.prototype,"pattern",2);d([h({type:Number})],E.prototype,"minlength",2);d([h({type:Number})],E.prototype,"maxlength",2);d([h()],E.prototype,"min",2);d([h()],E.prototype,"max",2);d([h()],E.prototype,"step",2);d([h()],E.prototype,"autocapitalize",2);d([h()],E.prototype,"autocorrect",2);d([h()],E.prototype,"autocomplete",2);d([h({type:Boolean})],E.prototype,"autofocus",2);d([h()],E.prototype,"enterkeyhint",2);d([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],E.prototype,"spellcheck",2);d([h()],E.prototype,"inputmode",2);d([z("disabled",{waitUntilFirstUpdate:true})],E.prototype,"handleDisabledChange",1);d([z("step",{waitUntilFirstUpdate:true})],E.prototype,"handleStepChange",1);d([z("value",{waitUntilFirstUpdate:true})],E.prototype,"handleValueChange",1);E.define("sl-input");var Ra=x`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;var Kr=class extends T{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};Kr.styles=[I,Ra];d([h({type:Boolean,reflect:true})],Kr.prototype,"vertical",2);d([z("vertical")],Kr.prototype,"handleVerticalChange",1);Kr.define("sl-divider");var Pa=x`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;function*Ma(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Sn(Ma(t.shadowRoot.activeElement))));}function Da(){return [...Ma()].pop()}var La=new WeakMap;function Ia(t){let e=La.get(t);return e||(e=window.getComputedStyle(t,null),La.set(t,e)),e}function hu(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let e=Ia(t);return e.visibility!=="hidden"&&e.display!=="none"}function du(t){let e=Ia(t),{overflowY:r,overflowX:o}=e;return r==="scroll"||o==="scroll"?true:r!=="auto"||o!=="auto"?false:t.scrollHeight>t.clientHeight&&r==="auto"||t.scrollWidth>t.clientWidth&&o==="auto"}function fu(t){let e=t.tagName.toLowerCase(),r=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(r)||r<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(e==="input"&&t.getAttribute("type")==="radio"){let i=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,a=i.querySelector(`${n}:checked`);return a?a===t:i.querySelector(n)===t}return hu(t)?(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?true:du(t):false}function Va(t){var e,r;let o=gu(t),s=(e=o[0])!=null?e:null,i=(r=o[o.length-1])!=null?r:null;return {start:s,end:i}}function mu(t,e){var r;return ((r=t.getRootNode({composed:true}))==null?void 0:r.host)!==e}function gu(t){let e=new WeakMap,r=[];function o(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||e.has(s))return;e.set(s,true),!r.includes(s)&&fu(s)&&r.push(s),s instanceof HTMLSlotElement&&mu(s,t)&&s.assignedElements({flatten:true}).forEach(i=>{o(i);}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&o(s.shadowRoot);}for(let i of s.children)o(i);}return o(t),r.sort((s,i)=>{let n=Number(s.getAttribute("tabindex"))||0;return (Number(i.getAttribute("tabindex"))||0)-n})}var za=x`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;var Vt=Math.min,nt=Math.max,Xr=Math.round,Zr=Math.floor,Ct=t=>({x:t,y:t}),bu={left:"right",right:"left",bottom:"top",top:"bottom"},vu={start:"end",end:"start"};function No(t,e,r){return nt(t,Vt(e,r))}function Oe(t,e){return typeof t=="function"?t(e):t}function Jt(t){return t.split("-")[0]}function ke(t){return t.split("-")[1]}function wi(t){return t==="x"?"y":"x"}function Fo(t){return t==="y"?"height":"width"}var yu=new Set(["top","bottom"]);function zt(t){return yu.has(Jt(t))?"y":"x"}function Ho(t){return wi(zt(t))}function Na(t,e,r){r===void 0&&(r=false);let o=ke(t),s=Ho(t),i=Fo(s),n=s==="x"?o===(r?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(n=Yr(n)),[n,Yr(n)]}function Fa(t){let e=Yr(t);return [jo(t),e,jo(e)]}function jo(t){return t.replace(/start|end/g,e=>vu[e])}var Ba=["left","right"],ja=["right","left"],wu=["top","bottom"],_u=["bottom","top"];function xu(t,e,r){switch(t){case "top":case "bottom":return r?e?ja:Ba:e?Ba:ja;case "left":case "right":return e?wu:_u;default:return []}}function Ha(t,e,r,o){let s=ke(t),i=xu(Jt(t),r==="start",o);return s&&(i=i.map(n=>n+"-"+s),e&&(i=i.concat(i.map(jo)))),i}function Yr(t){return t.replace(/left|right|bottom|top/g,e=>bu[e])}function Su(t){return {top:0,right:0,bottom:0,left:0,...t}}function _i(t){return typeof t!="number"?Su(t):{top:t,right:t,bottom:t,left:t}}function Te(t){let{x:e,y:r,width:o,height:s}=t;return {width:o,height:s,top:r,left:e,right:e+o,bottom:r+s,x:e,y:r}}function Ua(t,e,r){let{reference:o,floating:s}=t,i=zt(e),n=Ho(e),a=Fo(n),l=Jt(e),c=i==="y",u=o.x+o.width/2-s.width/2,p=o.y+o.height/2-s.height/2,m=o[a]/2-s[a]/2,f;switch(l){case "top":f={x:u,y:o.y-s.height};break;case "bottom":f={x:u,y:o.y+o.height};break;case "right":f={x:o.x+o.width,y:p};break;case "left":f={x:o.x-s.width,y:p};break;default:f={x:o.x,y:o.y};}switch(ke(e)){case "start":f[n]-=m*(r&&c?-1:1);break;case "end":f[n]+=m*(r&&c?-1:1);break}return f}var Wa=async(t,e,r)=>{let{placement:o="bottom",strategy:s="absolute",middleware:i=[],platform:n}=r,a=i.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e)),c=await n.getElementRects({reference:t,floating:e,strategy:s}),{x:u,y:p}=Ua(c,o,l),m=o,f={},g=0;for(let y=0;y<a.length;y++){let{name:S,fn:v}=a[y],{x:A,y:O,data:j,reset:N}=await v({x:u,y:p,initialPlacement:o,placement:m,strategy:s,middlewareData:f,rects:c,platform:n,elements:{reference:t,floating:e}});u=A??u,p=O??p,f={...f,[S]:{...f[S],...j}},N&&g<=50&&(g++,typeof N=="object"&&(N.placement&&(m=N.placement),N.rects&&(c=N.rects===true?await n.getElementRects({reference:t,floating:e,strategy:s}):N.rects),{x:u,y:p}=Ua(c,m,l)),y=-1);}return {x:u,y:p,placement:m,strategy:s,middlewareData:f}};async function Uo(t,e){var r;e===void 0&&(e={});let{x:o,y:s,platform:i,rects:n,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:p="floating",altBoundary:m=false,padding:f=0}=Oe(e,t),g=_i(f),S=a[m?p==="floating"?"reference":"floating":p],v=Te(await i.getClippingRect({element:(r=await(i.isElement==null?void 0:i.isElement(S)))==null||r?S:S.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(a.floating)),boundary:c,rootBoundary:u,strategy:l})),A=p==="floating"?{x:o,y:s,width:n.floating.width,height:n.floating.height}:n.reference,O=await(i.getOffsetParent==null?void 0:i.getOffsetParent(a.floating)),j=await(i.isElement==null?void 0:i.isElement(O))?await(i.getScale==null?void 0:i.getScale(O))||{x:1,y:1}:{x:1,y:1},N=Te(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:A,offsetParent:O,strategy:l}):A);return {top:(v.top-N.top+g.top)/j.y,bottom:(N.bottom-v.bottom+g.bottom)/j.y,left:(v.left-N.left+g.left)/j.x,right:(N.right-v.right+g.right)/j.x}}var qa=t=>({name:"arrow",options:t,async fn(e){let{x:r,y:o,placement:s,rects:i,platform:n,elements:a,middlewareData:l}=e,{element:c,padding:u=0}=Oe(t,e)||{};if(c==null)return {};let p=_i(u),m={x:r,y:o},f=Ho(s),g=Fo(f),y=await n.getDimensions(c),S=f==="y",v=S?"top":"left",A=S?"bottom":"right",O=S?"clientHeight":"clientWidth",j=i.reference[g]+i.reference[f]-m[f]-i.floating[g],N=m[f]-i.reference[f],wt=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c)),et=wt?wt[O]:0;(!et||!await(n.isElement==null?void 0:n.isElement(wt)))&&(et=a.floating[O]||i.floating[g]);let jt=j/2-N/2,Tt=et/2-y[g]/2-1,dt=Vt(p[v],Tt),te=Vt(p[A],Tt),$t=dt,ee=et-y[g]-te,st=et/2-y[g]/2+jt,pe=No($t,st,ee),Nt=!l.arrow&&ke(s)!=null&&st!==pe&&i.reference[g]/2-(st<$t?dt:te)-y[g]/2<0,_t=Nt?st<$t?st-$t:st-ee:0;return {[f]:m[f]+_t,data:{[f]:pe,centerOffset:st-pe-_t,...Nt&&{alignmentOffset:_t}},reset:Nt}}});var Ga=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var r,o;let{placement:s,middlewareData:i,rects:n,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:u=true,crossAxis:p=true,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:y=true,...S}=Oe(t,e);if((r=i.arrow)!=null&&r.alignmentOffset)return {};let v=Jt(s),A=zt(a),O=Jt(a)===a,j=await(l.isRTL==null?void 0:l.isRTL(c.floating)),N=m||(O||!y?[Yr(a)]:Fa(a)),wt=g!=="none";!m&&wt&&N.push(...Ha(a,y,g,j));let et=[a,...N],jt=await Uo(e,S),Tt=[],dt=((o=i.flip)==null?void 0:o.overflows)||[];if(u&&Tt.push(jt[v]),p){let st=Na(s,n,j);Tt.push(jt[st[0]],jt[st[1]]);}if(dt=[...dt,{placement:s,overflows:Tt}],!Tt.every(st=>st<=0)){var te,$t;let st=(((te=i.flip)==null?void 0:te.index)||0)+1,pe=et[st];if(pe&&(!(p==="alignment"?A!==zt(pe):false)||dt.every(xt=>zt(xt.placement)===A?xt.overflows[0]>0:true)))return {data:{index:st,overflows:dt},reset:{placement:pe}};let Nt=($t=dt.filter(_t=>_t.overflows[0]<=0).sort((_t,xt)=>_t.overflows[1]-xt.overflows[1])[0])==null?void 0:$t.placement;if(!Nt)switch(f){case "bestFit":{var ee;let _t=(ee=dt.filter(xt=>{if(wt){let re=zt(xt.placement);return re===A||re==="y"}return  true}).map(xt=>[xt.placement,xt.overflows.filter(re=>re>0).reduce((re,Ml)=>re+Ml,0)]).sort((xt,re)=>xt[1]-re[1])[0])==null?void 0:ee[0];_t&&(Nt=_t);break}case "initialPlacement":Nt=a;break}if(s!==Nt)return {reset:{placement:Nt}}}return {}}}};var Au=new Set(["left","top"]);async function Eu(t,e){let{placement:r,platform:o,elements:s}=t,i=await(o.isRTL==null?void 0:o.isRTL(s.floating)),n=Jt(r),a=ke(r),l=zt(r)==="y",c=Au.has(n)?-1:1,u=i&&l?-1:1,p=Oe(e,t),{mainAxis:m,crossAxis:f,alignmentAxis:g}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return a&&typeof g=="number"&&(f=a==="end"?g*-1:g),l?{x:f*u,y:m*c}:{x:m*c,y:f*u}}var Ka=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var r,o;let{x:s,y:i,placement:n,middlewareData:a}=e,l=await Eu(e,t);return n===((r=a.offset)==null?void 0:r.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:s+l.x,y:i+l.y,data:{...l,placement:n}}}}},Ya=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:r,y:o,placement:s}=e,{mainAxis:i=true,crossAxis:n=false,limiter:a={fn:S=>{let{x:v,y:A}=S;return {x:v,y:A}}},...l}=Oe(t,e),c={x:r,y:o},u=await Uo(e,l),p=zt(Jt(s)),m=wi(p),f=c[m],g=c[p];if(i){let S=m==="y"?"top":"left",v=m==="y"?"bottom":"right",A=f+u[S],O=f-u[v];f=No(A,f,O);}if(n){let S=p==="y"?"top":"left",v=p==="y"?"bottom":"right",A=g+u[S],O=g-u[v];g=No(A,g,O);}let y=a.fn({...e,[m]:f,[p]:g});return {...y,data:{x:y.x-r,y:y.y-o,enabled:{[m]:i,[p]:n}}}}}};var Xa=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var r,o;let{placement:s,rects:i,platform:n,elements:a}=e,{apply:l=()=>{},...c}=Oe(t,e),u=await Uo(e,c),p=Jt(s),m=ke(s),f=zt(s)==="y",{width:g,height:y}=i.floating,S,v;p==="top"||p==="bottom"?(S=p,v=m===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(v=p,S=m==="end"?"top":"bottom");let A=y-u.top-u.bottom,O=g-u.left-u.right,j=Vt(y-u[S],A),N=Vt(g-u[v],O),wt=!e.middlewareData.shift,et=j,jt=N;if((r=e.middlewareData.shift)!=null&&r.enabled.x&&(jt=O),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(et=A),wt&&!m){let dt=nt(u.left,0),te=nt(u.right,0),$t=nt(u.top,0),ee=nt(u.bottom,0);f?jt=g-2*(dt!==0||te!==0?dt+te:nt(u.left,u.right)):et=y-2*($t!==0||ee!==0?$t+ee:nt(u.top,u.bottom));}await l({...e,availableWidth:jt,availableHeight:et});let Tt=await n.getDimensions(a.floating);return g!==Tt.width||y!==Tt.height?{reset:{rects:true}}:{}}}};function Wo(){return typeof window<"u"}function $e(t){return Ja(t)?(t.nodeName||"").toLowerCase():"#document"}function pt(t){var e;return (t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Ot(t){var e;return (e=(Ja(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ja(t){return Wo()?t instanceof Node||t instanceof pt(t).Node:false}function vt(t){return Wo()?t instanceof Element||t instanceof pt(t).Element:false}function kt(t){return Wo()?t instanceof HTMLElement||t instanceof pt(t).HTMLElement:false}function Za(t){return !Wo()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof pt(t).ShadowRoot}var Cu=new Set(["inline","contents"]);function rr(t){let{overflow:e,overflowX:r,overflowY:o,display:s}=yt(t);return /auto|scroll|overlay|hidden|clip/.test(e+o+r)&&!Cu.has(s)}var Ou=new Set(["table","td","th"]);function Qa(t){return Ou.has($e(t))}var ku=[":popover-open",":modal"];function Jr(t){return ku.some(e=>{try{return t.matches(e)}catch{return  false}})}var Tu=["transform","translate","scale","rotate","perspective"],$u=["transform","translate","scale","rotate","perspective","filter"],Ru=["paint","layout","strict","content"];function or(t){let e=qo(),r=vt(t)?yt(t):t;return Tu.some(o=>r[o]?r[o]!=="none":false)||(r.containerType?r.containerType!=="normal":false)||!e&&(r.backdropFilter?r.backdropFilter!=="none":false)||!e&&(r.filter?r.filter!=="none":false)||$u.some(o=>(r.willChange||"").includes(o))||Ru.some(o=>(r.contain||"").includes(o))}function tl(t){let e=Qt(t);for(;kt(e)&&!Re(e);){if(or(e))return e;if(Jr(e))return null;e=Qt(e);}return null}function qo(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}var Pu=new Set(["html","body","#document"]);function Re(t){return Pu.has($e(t))}function yt(t){return pt(t).getComputedStyle(t)}function Qr(t){return vt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Qt(t){if($e(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Za(t)&&t.host||Ot(t);return Za(e)?e.host:e}function el(t){let e=Qt(t);return Re(e)?t.ownerDocument?t.ownerDocument.body:t.body:kt(e)&&rr(e)?e:el(e)}function er(t,e,r){var o;e===void 0&&(e=[]),r===void 0&&(r=true);let s=el(t),i=s===((o=t.ownerDocument)==null?void 0:o.body),n=pt(s);if(i){let a=Go(n);return e.concat(n,n.visualViewport||[],rr(s)?s:[],a&&r?er(a):[])}return e.concat(s,er(s,[],r))}function Go(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function il(t){let e=yt(t),r=parseFloat(e.width)||0,o=parseFloat(e.height)||0,s=kt(t),i=s?t.offsetWidth:r,n=s?t.offsetHeight:o,a=Xr(r)!==i||Xr(o)!==n;return a&&(r=i,o=n),{width:r,height:o,$:a}}function Si(t){return vt(t)?t:t.contextElement}function sr(t){let e=Si(t);if(!kt(e))return Ct(1);let r=e.getBoundingClientRect(),{width:o,height:s,$:i}=il(e),n=(i?Xr(r.width):r.width)/o,a=(i?Xr(r.height):r.height)/s;return (!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}var Lu=Ct(0);function nl(t){let e=pt(t);return !qo()||!e.visualViewport?Lu:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Mu(t,e,r){return e===void 0&&(e=false),!r||e&&r!==pt(t)?false:e}function Pe(t,e,r,o){e===void 0&&(e=false),r===void 0&&(r=false);let s=t.getBoundingClientRect(),i=Si(t),n=Ct(1);e&&(o?vt(o)&&(n=sr(o)):n=sr(t));let a=Mu(i,r,o)?nl(i):Ct(0),l=(s.left+a.x)/n.x,c=(s.top+a.y)/n.y,u=s.width/n.x,p=s.height/n.y;if(i){let m=pt(i),f=o&&vt(o)?pt(o):o,g=m,y=Go(g);for(;y&&o&&f!==g;){let S=sr(y),v=y.getBoundingClientRect(),A=yt(y),O=v.left+(y.clientLeft+parseFloat(A.paddingLeft))*S.x,j=v.top+(y.clientTop+parseFloat(A.paddingTop))*S.y;l*=S.x,c*=S.y,u*=S.x,p*=S.y,l+=O,c+=j,g=pt(y),y=Go(g);}}return Te({width:u,height:p,x:l,y:c})}function Ko(t,e){let r=Qr(t).scrollLeft;return e?e.left+r:Pe(Ot(t)).left+r}function al(t,e){let r=t.getBoundingClientRect(),o=r.left+e.scrollLeft-Ko(t,r),s=r.top+e.scrollTop;return {x:o,y:s}}function Du(t){let{elements:e,rect:r,offsetParent:o,strategy:s}=t,i=s==="fixed",n=Ot(o),a=e?Jr(e.floating):false;if(o===n||a&&i)return r;let l={scrollLeft:0,scrollTop:0},c=Ct(1),u=Ct(0),p=kt(o);if((p||!p&&!i)&&(($e(o)!=="body"||rr(n))&&(l=Qr(o)),kt(o))){let f=Pe(o);c=sr(o),u.x=f.x+o.clientLeft,u.y=f.y+o.clientTop;}let m=n&&!p&&!i?al(n,l):Ct(0);return {width:r.width*c.x,height:r.height*c.y,x:r.x*c.x-l.scrollLeft*c.x+u.x+m.x,y:r.y*c.y-l.scrollTop*c.y+u.y+m.y}}function Iu(t){return Array.from(t.getClientRects())}function Vu(t){let e=Ot(t),r=Qr(t),o=t.ownerDocument.body,s=nt(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),i=nt(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),n=-r.scrollLeft+Ko(t),a=-r.scrollTop;return yt(o).direction==="rtl"&&(n+=nt(e.clientWidth,o.clientWidth)-s),{width:s,height:i,x:n,y:a}}var rl=25;function zu(t,e){let r=pt(t),o=Ot(t),s=r.visualViewport,i=o.clientWidth,n=o.clientHeight,a=0,l=0;if(s){i=s.width,n=s.height;let u=qo();(!u||u&&e==="fixed")&&(a=s.offsetLeft,l=s.offsetTop);}let c=Ko(o);if(c<=0){let u=o.ownerDocument,p=u.body,m=getComputedStyle(p),f=u.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,g=Math.abs(o.clientWidth-p.clientWidth-f);g<=rl&&(i-=g);}else c<=rl&&(i+=c);return {width:i,height:n,x:a,y:l}}var Bu=new Set(["absolute","fixed"]);function ju(t,e){let r=Pe(t,true,e==="fixed"),o=r.top+t.clientTop,s=r.left+t.clientLeft,i=kt(t)?sr(t):Ct(1),n=t.clientWidth*i.x,a=t.clientHeight*i.y,l=s*i.x,c=o*i.y;return {width:n,height:a,x:l,y:c}}function ol(t,e,r){let o;if(e==="viewport")o=zu(t,r);else if(e==="document")o=Vu(Ot(t));else if(vt(e))o=ju(e,r);else {let s=nl(t);o={x:e.x-s.x,y:e.y-s.y,width:e.width,height:e.height};}return Te(o)}function ll(t,e){let r=Qt(t);return r===e||!vt(r)||Re(r)?false:yt(r).position==="fixed"||ll(r,e)}function Nu(t,e){let r=e.get(t);if(r)return r;let o=er(t,[],false).filter(a=>vt(a)&&$e(a)!=="body"),s=null,i=yt(t).position==="fixed",n=i?Qt(t):t;for(;vt(n)&&!Re(n);){let a=yt(n),l=or(n);!l&&a.position==="fixed"&&(s=null),(i?!l&&!s:!l&&a.position==="static"&&!!s&&Bu.has(s.position)||rr(n)&&!l&&ll(t,n))?o=o.filter(u=>u!==n):s=a,n=Qt(n);}return e.set(t,o),o}function Fu(t){let{element:e,boundary:r,rootBoundary:o,strategy:s}=t,n=[...r==="clippingAncestors"?Jr(e)?[]:Nu(e,this._c):[].concat(r),o],a=n[0],l=n.reduce((c,u)=>{let p=ol(e,u,s);return c.top=nt(p.top,c.top),c.right=Vt(p.right,c.right),c.bottom=Vt(p.bottom,c.bottom),c.left=nt(p.left,c.left),c},ol(e,a,s));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Hu(t){let{width:e,height:r}=il(t);return {width:e,height:r}}function Uu(t,e,r){let o=kt(e),s=Ot(e),i=r==="fixed",n=Pe(t,true,i,e),a={scrollLeft:0,scrollTop:0},l=Ct(0);function c(){l.x=Ko(s);}if(o||!o&&!i)if(($e(e)!=="body"||rr(s))&&(a=Qr(e)),o){let f=Pe(e,true,i,e);l.x=f.x+e.clientLeft,l.y=f.y+e.clientTop;}else s&&c();i&&!o&&s&&c();let u=s&&!o&&!i?al(s,a):Ct(0),p=n.left+a.scrollLeft-l.x-u.x,m=n.top+a.scrollTop-l.y-u.y;return {x:p,y:m,width:n.width,height:n.height}}function xi(t){return yt(t).position==="static"}function sl(t,e){if(!kt(t)||yt(t).position==="fixed")return null;if(e)return e(t);let r=t.offsetParent;return Ot(t)===r&&(r=r.ownerDocument.body),r}function cl(t,e){let r=pt(t);if(Jr(t))return r;if(!kt(t)){let s=Qt(t);for(;s&&!Re(s);){if(vt(s)&&!xi(s))return s;s=Qt(s);}return r}let o=sl(t,e);for(;o&&Qa(o)&&xi(o);)o=sl(o,e);return o&&Re(o)&&xi(o)&&!or(o)?r:o||tl(t)||r}var Wu=async function(t){let e=this.getOffsetParent||cl,r=this.getDimensions,o=await r(t.floating);return {reference:Uu(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function qu(t){return yt(t).direction==="rtl"}var to={convertOffsetParentRelativeRectToViewportRelativeRect:Du,getDocumentElement:Ot,getClippingRect:Fu,getOffsetParent:cl,getElementRects:Wu,getClientRects:Iu,getDimensions:Hu,getScale:sr,isElement:vt,isRTL:qu};function ul(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Gu(t,e){let r=null,o,s=Ot(t);function i(){var a;clearTimeout(o),(a=r)==null||a.disconnect(),r=null;}function n(a,l){a===void 0&&(a=false),l===void 0&&(l=1),i();let c=t.getBoundingClientRect(),{left:u,top:p,width:m,height:f}=c;if(a||e(),!m||!f)return;let g=Zr(p),y=Zr(s.clientWidth-(u+m)),S=Zr(s.clientHeight-(p+f)),v=Zr(u),O={rootMargin:-g+"px "+-y+"px "+-S+"px "+-v+"px",threshold:nt(0,Vt(1,l))||1},j=true;function N(wt){let et=wt[0].intersectionRatio;if(et!==l){if(!j)return n();et?n(false,et):o=setTimeout(()=>{n(false,1e-7);},1e3);}et===1&&!ul(c,t.getBoundingClientRect())&&n(),j=false;}try{r=new IntersectionObserver(N,{...O,root:s.ownerDocument});}catch{r=new IntersectionObserver(N,O);}r.observe(t);}return n(true),i}function pl(t,e,r,o){o===void 0&&(o={});let{ancestorScroll:s=true,ancestorResize:i=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=false}=o,c=Si(t),u=s||i?[...c?er(c):[],...er(e)]:[];u.forEach(v=>{s&&v.addEventListener("scroll",r,{passive:true}),i&&v.addEventListener("resize",r);});let p=c&&a?Gu(c,r):null,m=-1,f=null;n&&(f=new ResizeObserver(v=>{let[A]=v;A&&A.target===c&&f&&(f.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var O;(O=f)==null||O.observe(e);})),r();}),c&&!l&&f.observe(c),f.observe(e));let g,y=l?Pe(t):null;l&&S();function S(){let v=Pe(t);y&&!ul(y,v)&&r(),y=v,g=requestAnimationFrame(S);}return r(),()=>{var v;u.forEach(A=>{s&&A.removeEventListener("scroll",r),i&&A.removeEventListener("resize",r);}),p?.(),(v=f)==null||v.disconnect(),f=null,l&&cancelAnimationFrame(g);}}var hl=Ka;var dl=Ya,fl=Ga,Ai=Xa;var ml=qa;var gl=(t,e,r)=>{let o=new Map,s={platform:to,...r},i={...s.platform,_c:o};return Wa(t,e,{...s,platform:i})};function bl(t){return Ku(t)}function Ei(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Ku(t){for(let e=t;e;e=Ei(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Ei(t);e;e=Ei(e)){if(!(e instanceof Element))continue;let r=getComputedStyle(e);if(r.display!=="contents"&&(r.position!=="static"||or(r)||e.tagName==="BODY"))return e}return null}function Yu(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var M=class extends T{constructor(){super(...arguments),this.localize=new ot(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom"),o=0,s=0,i=0,n=0,a=0,l=0,c=0,u=0;r?t.top<e.top?(o=t.left,s=t.bottom,i=t.right,n=t.bottom,a=e.left,l=e.top,c=e.right,u=e.top):(o=e.left,s=e.bottom,i=e.right,n=e.bottom,a=t.left,l=t.top,c=t.right,u=t.top):t.left<e.left?(o=t.right,s=t.top,i=e.left,n=e.top,a=t.right,l=t.bottom,c=e.left,u=e.bottom):(o=e.right,s=e.top,i=t.left,n=t.top,a=e.right,l=e.bottom,c=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||Yu(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=pl(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[hl({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Ai({apply:({rects:r})=>{let o=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${r.reference.width}px`:"",this.popup.style.height=s?`${r.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(fl({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(dl({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Ai({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(ml({element:this.arrowEl,padding:this.arrowPadding}));let e=this.strategy==="absolute"?r=>to.getOffsetParent(r,bl):to.getOffsetParent;gl(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Ut(rt({},to),{getOffsetParent:e})}).then(({x:r,y:o,middlewareData:s,placement:i})=>{let n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${r}px`,top:`${o}px`}),this.arrow){let l=s.arrow.x,c=s.arrow.y,u="",p="",m="",f="";if(this.arrowPlacement==="start"){let g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?g:"",f=n?"":g;}else if(this.arrowPlacement==="end"){let g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":g,f=n?g:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(f=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",u=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(f=typeof l=="number"?`${l}px`:"",u=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:u,right:p,bottom:m,left:f,[a]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return b`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${L({"popup-hover-bridge":true,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${L({popup:true,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?b`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};M.styles=[I,za];d([k(".popup")],M.prototype,"popup",2);d([k(".popup__arrow")],M.prototype,"arrowEl",2);d([h()],M.prototype,"anchor",2);d([h({type:Boolean,reflect:true})],M.prototype,"active",2);d([h({reflect:true})],M.prototype,"placement",2);d([h({reflect:true})],M.prototype,"strategy",2);d([h({type:Number})],M.prototype,"distance",2);d([h({type:Number})],M.prototype,"skidding",2);d([h({type:Boolean})],M.prototype,"arrow",2);d([h({attribute:"arrow-placement"})],M.prototype,"arrowPlacement",2);d([h({attribute:"arrow-padding",type:Number})],M.prototype,"arrowPadding",2);d([h({type:Boolean})],M.prototype,"flip",2);d([h({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],M.prototype,"flipFallbackPlacements",2);d([h({attribute:"flip-fallback-strategy"})],M.prototype,"flipFallbackStrategy",2);d([h({type:Object})],M.prototype,"flipBoundary",2);d([h({attribute:"flip-padding",type:Number})],M.prototype,"flipPadding",2);d([h({type:Boolean})],M.prototype,"shift",2);d([h({type:Object})],M.prototype,"shiftBoundary",2);d([h({attribute:"shift-padding",type:Number})],M.prototype,"shiftPadding",2);d([h({attribute:"auto-size"})],M.prototype,"autoSize",2);d([h()],M.prototype,"sync",2);d([h({type:Object})],M.prototype,"autoSizeBoundary",2);d([h({attribute:"auto-size-padding",type:Number})],M.prototype,"autoSizePadding",2);d([h({attribute:"hover-bridge",type:Boolean})],M.prototype,"hoverBridge",2);var tt=class extends T{constructor(){super(...arguments),this.localize=new ot(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let r=(o,s)=>{if(!o)return null;let i=o.closest(s);if(i)return i;let n=o.getRootNode();return n instanceof ShadowRoot?r(n.host,s):null};setTimeout(()=>{var o;let s=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?Da():document.activeElement;(!this.containingElement||r(s,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let e=this.getMenu();if(e){let r=e.getAllItems(),o=r[0],s=r[r.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),r.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(o),o.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(s),s.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let e=this.trigger.assignedElements({flatten:true}).find(o=>Va(o).start),r;if(e){switch(e.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":r=e.button;break;default:r=e;}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,Je(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,Je(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await tr(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:e}=Ze(this,"dropdown.show",{dir:this.localize.dir()});await Qe(this.popup.popup,t,e),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await tr(this);let{keyframes:t,options:e}=Ze(this,"dropdown.hide",{dir:this.localize.dir()});await Qe(this.popup.popup,t,e),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return b`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${_(this.sync?this.sync:void 0)}
        class=${L({dropdown:true,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};tt.styles=[I,Pa];tt.dependencies={"sl-popup":M};d([k(".dropdown")],tt.prototype,"popup",2);d([k(".dropdown__trigger")],tt.prototype,"trigger",2);d([k(".dropdown__panel")],tt.prototype,"panel",2);d([h({type:Boolean,reflect:true})],tt.prototype,"open",2);d([h({reflect:true})],tt.prototype,"placement",2);d([h({type:Boolean,reflect:true})],tt.prototype,"disabled",2);d([h({attribute:"stay-open-on-select",type:Boolean,reflect:true})],tt.prototype,"stayOpenOnSelect",2);d([h({attribute:false})],tt.prototype,"containingElement",2);d([h({type:Number})],tt.prototype,"distance",2);d([h({type:Number})],tt.prototype,"skidding",2);d([h({type:Boolean})],tt.prototype,"hoist",2);d([h({reflect:true})],tt.prototype,"sync",2);d([z("open",{waitUntilFirstUpdate:true})],tt.prototype,"handleOpenChange",1);Xe("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Xe("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});tt.define("sl-dropdown");Ur.define("sl-spinner");X.define("sl-icon-button");var vl={};q(vl,{ContextConsumer:()=>Le,ContextEvent:()=>Bt,ContextProvider:()=>Me,ContextRoot:()=>Xo,consume:()=>Jo,createContext:()=>Ci,provide:()=>Zo});var Bt=class extends Event{constructor(e,r,o,s){super("context-request",{bubbles:true,composed:true}),this.context=e,this.contextTarget=r,this.callback=o,this.subscribe=s??false;}};function Ci(t){return t}var Le=class{constructor(e,r,o,s){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(i,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=i,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(i,n)),this.unsubscribe=n;},this.host=e,r.context!==void 0){let i=r;this.context=i.context,this.callback=i.callback,this.subscribe=i.subscribe??false;}else this.context=r,this.callback=o,this.subscribe=s??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new Bt(this.context,this.host,this.t,this.subscribe));}};var Yo=class{get value(){return this.o}set value(e){this.setValue(e);}setValue(e,r=false){let o=r||!Object.is(e,this.o);this.o=e,o&&this.updateObservers();}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[r,{disposer:o}]of this.subscriptions)r(this.o,o);},e!==void 0&&(this.value=e);}addCallback(e,r,o){if(!o)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e);},consumerHost:r});let{disposer:s}=this.subscriptions.get(e);e(this.value,s);}clearCallbacks(){this.subscriptions.clear();}};var Oi=class extends Event{constructor(e,r){super("context-provider",{bubbles:true,composed:true}),this.context=e,this.contextTarget=r;}},Me=class extends Yo{constructor(e,r,o){super(r.context!==void 0?r.initialValue:o),this.onContextRequest=s=>{if(s.context!==this.context)return;let i=s.contextTarget??s.composedPath()[0];i!==this.host&&(s.stopPropagation(),this.addCallback(s.callback,i,s.subscribe));},this.onProviderRequest=s=>{if(s.context!==this.context||(s.contextTarget??s.composedPath()[0])===this.host)return;let i=new Set;for(let[n,{consumerHost:a}]of this.subscriptions)i.has(n)||(i.add(n),a.dispatchEvent(new Bt(this.context,a,n,true)));s.stopPropagation();},this.host=e,r.context!==void 0?this.context=r.context:this.context=r,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new Oi(this.context,this.host));}};var Xo=class{constructor(){this.pendingContextRequests=new Map,this.onContextProvider=e=>{let r=this.pendingContextRequests.get(e.context);if(r===void 0)return;this.pendingContextRequests.delete(e.context);let{requests:o}=r;for(let{elementRef:s,callbackRef:i}of o){let n=s.deref(),a=i.deref();n===void 0||a===void 0||n.dispatchEvent(new Bt(e.context,n,a,true));}},this.onContextRequest=e=>{if(e.subscribe!==true)return;let r=e.contextTarget??e.composedPath()[0],o=e.callback,s=this.pendingContextRequests.get(e.context);s===void 0&&this.pendingContextRequests.set(e.context,s={callbacks:new WeakMap,requests:[]});let i=s.callbacks.get(r);i===void 0&&s.callbacks.set(r,i=new WeakSet),i.has(o)||(i.add(o),s.requests.push({elementRef:new WeakRef(r),callbackRef:new WeakRef(o)}));};}attach(e){e.addEventListener("context-request",this.onContextRequest),e.addEventListener("context-provider",this.onContextProvider);}detach(e){e.removeEventListener("context-request",this.onContextRequest),e.removeEventListener("context-provider",this.onContextProvider);}};function Zo({context:t}){return (e,r)=>{let o=new WeakMap;if(typeof r=="object")return {get(){return e.get.call(this)},set(s){return o.get(this).setValue(s),e.set.call(this,s)},init(s){return o.set(this,new Me(this,{context:t,initialValue:s})),s}};{e.constructor.addInitializer((n=>{o.set(n,new Me(n,{context:t}));}));let s=Object.getOwnPropertyDescriptor(e,r),i;if(s===void 0){let n=new WeakMap;i={get(){return n.get(this)},set(a){o.get(this).setValue(a),n.set(this,a);},configurable:true,enumerable:true};}else {let n=s.set;i={...s,set(a){o.get(this).setValue(a),n?.call(this,a);}};}return void Object.defineProperty(e,r,i)}}}function Jo({context:t,subscribe:e}){return (r,o)=>{typeof o=="object"?o.addInitializer((function(){new Le(this,{context:t,callback:s=>{r.set.call(this,s);},subscribe:e});})):r.constructor.addInitializer((s=>{new Le(s,{context:t,callback:i=>{s[o]=i;},subscribe:e});}));}}var Qo="autoform";var De=class{constructor(e){this.host=e,e.addController(this);}updateContext(){this.host.context={...this.host.context,labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size,dark:this.host.dark,validAtInit:this.host.validAtInit};}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext();}};var Sl={};q(Sl,{AutoField:()=>K});var yl=x`
    ${Mo}
    ${Ar}
    :host {
        display: inline-block;
        vertical-align: top;
        position: relative;
        box-sizing: border-box;
        & > .autofield {
            display: flex;
            position: relative;
            flex-direction: column;
            width: 100%;

            box-sizing: border-box;
            padding-right: 0px;
            padding: calc(0.2 * var(--auto-spacing)); 
            & > .label {
                display: flex;
                color: var(--auto-color);
                & > .title {
                    font-size: var(--auto-font-size);
                    flex-grow: 1;
                    line-height: var(--auto-line-height);
                    &::after {
                        content: "：";
                    }
                }
            }
            & > .value {
                position: relative;
                color: var(--auto-color);
            }

            & .help {
                display: flex;
                align-items: center;
                font-size: calc(var(--auto-font-size) * 0.9);
                color: var(--auto-gray-color);
                padding: calc(var(--auto-spacing) * 0.3) 0px;
                & a {
                    text-decoration: none;
                    color: var(--auto-disable-color);
                    &:hover {
                        color: var(--auto-theme-color);
                    }
                }
            }
        }
        sl-input::part(base) {
            font: var(--auto-font) !important;
            outline: none !important;
            box-shadow: none !important;
        }
        sl-textarea::part(base) {
            font: var(--auto-font) !important;
            outline: none !important;
            box-shadow: none !important;
        }
        & sl-input::part(suffix) .action-widget {
            color: red;
        }
        & .action-widget.image {
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0px;
            border-left: var(--auto-border);
            & img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
    /* 隐藏 */
    :host(.hidden) {
        display: none !important;
    }
    /* 错误样式 */
    :host(.error) {
        & > .autofield {
            color: red;
            & sl-input::part(base) {
                outline: none !important;
                box-shadow: none !important;
                border-color: red;
                color: red;
            }
            & sl-input::part(input) {
                color: red;
            }
            & .error {
                display: flex;
                align-items: center;
                padding: 4px;
                font-size: 0.8em;
                color: red;
            }
            & > .label > .title {
                color: red;
            }
            & .mark-err {
                border-color: red;
            }
        }
    }
    :host(.left-label) {
        & > .autofield {
            flex-direction: row;
            & > .label {
                flex-shrink: 1;
            }
            & > .value {
                flex-grow: 1;
                display: flex;
                align-items: stretch;
                flex-direction: column;
                justify-content: center;
            }
            & .help {
                display: inline;
                a {
                    text-decoration: none;
                }
            }
        }
    }
    /* 禁用样式 */
    :host(.disable) {
        & > .autofield {
            & > .label {
                color: var(--sl-color-gray-400);
                & > .title {
                    color: var(--sl-color-gray-400);
                }
            }
            & sl-input::part(base),
            sl-input::part(input) {
                color: var(--sl-color-gray-400);
                user-select: none;
                pointer-events: none;
            }
            & sl-textarea::part(textarea) {
                color: var(--sl-color-gray-400);
                user-select: none;
                pointer-events: none;
            }
        }
    }
    /* 网格线 */
    :host(.grid-border) {
        & > .autofield {
            padding: calc(var(--auto-spacing) * 0.5) var(--auto-spacing);
        }
    }
    /* 非网格边框（none/outline）下字段水平内边距收窄，贴近紧凑排布 */
    :host(:not(.grid-border)) {
        & > .autofield {
            padding: calc(var(--auto-spacing) * 0.1) var(--auto-spacing);
        }
    }
    :host(.grid-border.compact) {
        & > .autofield {
            padding: calc(var(--auto-spacing) * 0.3) var(--auto-spacing);
        }
    }
    :host(:not(.grid-border).compact) {
        & > .autofield {
            padding: calc(var(--auto-spacing) * 0.2);
        }
    }
    /* 布局 */
    :host(.row-layout) {
        & > .autofield {
            & > .label > .title {
                display: flex;
                align-items: center;
            }
        }
    }
    /* 浏览视图  */
    :host(.viewonly) {
        & > .autofield > .value {
            display: flex;
            align-items: end;
        }
    }
    :host(.viewonly.view-left) {
        & > .autofield > .value {
            align-items: start;
        }
    }
    :host(.viewonly.view-center) {
        & > .autofield > .value {
            align-items: center;
        }
    }
    :host(.readonly) {
        & > .autofield {
            & > .value:after {
                content: " ";
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                opacity: 0;
                user-select: none;
                z-index: 1;
            }
        }
    }
`;var wl={};q(wl,{UnsafeHTMLDirective:()=>ir,unsafeHTML:()=>ki});var ir=class extends ft{constructor(e){if(super(e),this.it=D,e.type!==it.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===D||e==null)return this._t=void 0,this.it=e;if(e===F)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};ir.directiveName="unsafeHTML",ir.resultType=1;var ki=Lt(ir);function _l(t,e){e&&Object.entries(e).forEach(([r,o])=>{(r==="root"?[t]:Array.from(t.querySelectorAll(r))).forEach(i=>{typeof o=="string"?i.style.cssText=o:typeof o=="object"&&Object.assign(i.style,o);});});}function nr(t,e,r){r?t.classList.add(e):t.classList.remove(e);}function xl(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var Xu=/^(validate|on.+|to.+|render.+)$/,K=class extends H{constructor(){super(...arguments);this.theme=new De(this);this.classs=new Zt(this);this.options=xl();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this.context.validAt==="input"?this._updateFieldValue():this.clearError();}static{this.styles=yl;}get shadow(){return this.shadowRoot}getFieldOptions(){let r=this.schema||{};return Object.entries(r).reduce((o,[s,i])=>(ne(i)?o[s]=i.value:o[s]=i,o),Object.assign({},xl(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(r=true){return b`${this.renderBeforeActions(r)} ${this.renderAfterActions(r)}`}_onClickAction(r,o){return s=>{typeof o=="function"&&o(s),r.onClick&&typeof r.onClick=="function"&&r.onClick?.call(this,this.getInputValue(),{action:r,options:this.options,event:s,update:i=>{We(this.context.store?.state,this.options.path,i);}});}}renderBeforeActions(r){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return b`<div
                class="actions before"
                part="before-actions"
                slot="${_(r?"prefix":void 0)}"
            >
                ${Xt(this.beforeActions,o=>this.renderActionWidget(o))}
            </div>`}renderAfterActions(r){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return b`<div
                class="actions after"
                part="after-actions"
                slot="${_(r?"suffix":void 0)}"
            >
                ${Xt(this.afterActions,o=>this.renderActionWidget(o))}
            </div>`}_renderDropdownAction(r){return b`
            <sl-dropdown
                class="action-widget"
                hoist
                title=${_(r.tips)}
                placement=${r.pos==="before"?"bottom-start":"bottom-end"}
            >
                <sl-button slot="trigger" ?caret=${r.caret}>
                    ${Q(r.icon,()=>b`<sl-icon name=${_(r.icon)}></sl-icon>`)}
                    ${r.label}
                </sl-button>
                <sl-menu>
                    ${Xt(r.items||[],o=>o==="-"?b`<sl-divider></sl-divider>`:(typeof o=="string"&&(o={label:o}),b`<sl-menu-item
                            @click=${this._onClickAction.call(this,o,()=>{r.syncMenu&&(r.label=o.label,r.icon=o.icon,r.tips=o.tips,this.requestUpdate());})}
                        >
                            ${Q(o.icon,()=>b`<sl-icon
                                        name=${_(o.icon)}
                                        slot="prefix"
                                    ></sl-icon>`)}
                            ${o.label}</sl-menu-item
                        >`))}
                </sl-menu>
            </sl-dropdown>
        `}_renderButtonAction(r){return b`
            <sl-button
                class="action-widget"
                title=${_(r.tips)}
                variant=${_(r.variant)}
                size=${r.size||this.context.size}
                @click=${this._onClickAction.call(this,r)}
            >
                ${Q(r.icon,()=>b`<sl-icon name=${_(r.icon)}></sl-icon>`)}
                ${r.label}
            </sl-button>
        `}_renderImageAction(r){return b`
            <sl-button
                title="${_(r.tips)}"
                variant="text"
                class="action-widget image"
                @click=${this._onClickAction.call(this,r)}
            >
                <img src="${_(r.url)}" />
            </sl-button>
        `}renderActionWidget(r){if(typeof r!="object")return;let o=r.type||"button";if(o==="dropdown")return this._renderDropdownAction(r);if(o==="button")return this._renderButtonAction(r);if(o==="image")return this._renderImageAction(r)}renderOption(r,o){let s=this.schema[r];if(s)return s.loading?b`<sl-spinner></sl-spinner>`:b`${o?o(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(r){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,r):r}toState(r){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,r):r}toInput(r){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,r):r}getOptionValue(r,o){if(this.schema&&r in this.schema){let s=this.schema[r];return s===void 0?o:ne(s)?s.value:s}else return o}getOption(r){if(this.schema&&r in this.schema){let o=this.schema[r];return ne(o)?o:Fn(o)}}getInputValue(){if(!this.input)return "";let r=this.input.value;if(typeof this.options.toState!="function"){let o=this.options.datatype||"string";o==="number"?r=Number(r):o==="boolean"&&(r=!!r);}return r}_renderRequiredOption(){return this.renderOption("required",r=>r?b`<span style="color:red;">*</span>`:"")}renderHelp(r=false){let o=this.options.help;if(!o)return;let s=o.match(/\(([^)]+)\)[^)]*$/),i=s?s[1]:null,n=i?o.replace(`(${i})`,""):o;return b`<span
            class="help"
            part="field-help"
            title="${_(r?n:void 0)}"
        >
            ${Un(!!i,b`
                    <sl-icon name="help"></sl-icon>
                    ${Q(!r,()=>b`${n}`)}
                `,a=>b`<a target="_blank" href="${i}">${a}</a>`)}
        </span>`}renderLabel(){let r=this.context,o=this.options.labelPos||r.labelPos;if(o==="none")return b``;{let s={};return (r.labelWidth&&o==="left"||r.viewonly)&&(s.width=r.labelWidth),b`<div class="label" part="field-label" style="${_(Hr(s))}">
                <span class="title">
                    ${this.getLabel()} ${Q(r.viewonly,()=>this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${Q(o==="top"&&!r.viewonly,()=>this.renderHelp())}
            </div>`}}renderInput(){return b``}clearError(){this.errorMessage&&(this.errorMessage=void 0,this._updateFormClasss());}isShowError(){return this.context.validAtInit?!!this.errorMessage:this.dirty?!!this.errorMessage:false}renderError(){return this.isShowError()?b`<div class="error">${this.errorMessage}</div>`:b``}_handleSchemaChange(){let r=this.context;if(r?.store&&this.schema){let o=this.getPath();if(!o||!Array.isArray(o)||o.length===0)return;let s=o.join("_$_");this._subscribers.push(r.store.watch(`${s}.**`,i=>{let{reply:n,type:a,value:l,flags:c}=i;if(n||r.form.seq===c)return;(a==="batch"?l:[i]).forEach(p=>{let m=p.path.slice(1);We(this.schema,m,p.value),this.options[m[0]]=p.value;}),this.requestUpdate();},{operates:"write"}));}}_evalDynamicOptions(){let o=this.context?.store;if(!o||!this.schema)return;let s=this.schema;for(let i of Object.keys(s)){let n=s[i];if(typeof n!="function"||Xu.test(i))continue;let a=o.collectDependencies(()=>{try{this.options[i]=n.call(this,o.state);}catch(l){console.error(`Error while evaluating schema <${i}>: ${l.message}`);}});a.length!==0&&this._subscribers.push(o.watch(a,()=>{try{this.options[i]=n.call(this,o.state);}catch(l){console.error(`Error while evaluating schema <${i}>: ${l.message}`);}this.requestUpdate();}));}}renderView(){let r=this.value;if(this.options.toView&&this.options.toView)try{r=this.options.toView.call(this,this.value);}catch(o){console.error(`Error while toView<${this.path}>: ${o.message}`);}return b`${ki(String(r))}`}_handleStateChange(){if(this.noreactive)return;let r=this.context;if(r?.store&&this.schema){let o=this.getPath();if(!o||!Array.isArray(o)||o.length===0)return;this._subscribers.push(r.store.watch(o.join("."),s=>{this.value=this.toInput(s.value),this.errorMessage=this.getFieldError();},{operates:"write"}));}}getStateValue(){let r=this.getPath();return !r||!Array.isArray(r)||r.length===0?this.value:this.toInput(Ao(this.context.store?.state,r))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){if(this.context?.store&&this.schema){this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this._evalDynamicOptions();let o=this.getPath();o&&Array.isArray(o)&&o.length>0?this.path=o.join("."):this.path="",this.name=this.options.name||this.path;let s=this.getFieldError();s!==void 0&&(this.errorMessage=s),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(i=>i.pos==="before"),this.afterActions=this.options.actions.filter(i=>i.pos!=="before"));}}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(r=>{r.off();}),this._subscribers=[];}getLabelPos(){return this.options.labelPos||this.context.labelPos}getFieldError(){let r=this.context?.store;if(!r?.configManager)return;let o=r.options.configKey?.trim(),s=o?`${o}.${this.path}`:this.path;return r.configManager.errors[s]}_updateFormClasss(){this.context.form&&(nr(this.context.form,"dirty",this.dirty),nr(this.context.form,"invalid",!!this.errorMessage));}_updateFieldValue(){if(!this.schema)return;let r=this.getPath(),o=this.toState(this.getInputValue()),s=this.context;s.dirty=true,this.dirty=true;try{let i=this.context.store;this.noreactive||(i?.update(n=>{let a=Hn(o,this.schema);We(n,r,a);},{flags:s.form.seq}),this.errorMessage=this.getFieldError()),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:o,options:this.options},composed:!0,bubbles:!0}));}catch(i){this.errorMessage=this.getFieldError()??i.message;}finally{this._updateFormClasss();}}renderValue(){let r=this.options.labelPos||this.context.labelPos;return b`
            ${this.renderInput()}
            ${Q(this.context.viewonly||r==="left",()=>this.renderHelp())}
            ${this.renderError()}
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(r){r.has("schema")&&this.schema&&this.updateOptions(),this.options.styles&&_l(this.shadow,this.options.styles);}render(){let r=this.context,o=this.options.labelPos?this.options.labelPos:r.labelPos,s={error:this.isShowError(),"left-label":o==="left"||r.viewonly,"top-label":o==="top"&&!r.viewonly,disable:this.options.enable===false,readonly:r.readonly,viewonly:r.viewonly,compact:this.compact===void 0?r.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${r.viewAlign}`]:true,[`${r.layout}-layout`]:true};return s[`${r.border}-border`]=true,this.classs.use(r.size,s),this.options.width?this.style.width=this.options.width:this.style.width&&(this.style.width=""),b`
            <div class="autofield" part="autofield">
                ${this.options.divider?b`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${Q(r.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>
            </div>
        `}};w([h({type:Object})],K.prototype,"schema",2),w([P()],K.prototype,"value",2),w([P()],K.prototype,"errorMessage",2),w([P()],K.prototype,"labelPos",2),w([P()],K.prototype,"dirty",2),w([h({type:Boolean,reflect:true})],K.prototype,"noreactive",2),w([h({type:Boolean,reflect:true})],K.prototype,"compact",2),w([bs({slot:"value",flatten:true})],K.prototype,"_field",2),w([k(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],K.prototype,"input",2),w([Jo({context:Qo,subscribe:true}),h({attribute:false})],K.prototype,"context",2);var ts=class{constructor(e){this.store=e;}getFullPath(e){let r=this.store.options.configKey||"";return r?`${r}.${e.join(".")}`:e.join(".")}getSchema(e){let r=this.getFullPath(e);return this.store.configManager?.state[r]}getAllSchemas(){let e=this.store.configManager;if(!e)return console.warn("[SchemaAccessor] configManager \u4E0D\u5B58\u5728\uFF01"),{};let r=this.store.configKey||"",o=r?`${r}.`:"",s={};return Object.entries(e.state).forEach(([i,n])=>{if(i.startsWith(o)){let a=i.substring(o.length);s[a]=n;}}),s}getFieldValue(e){return V(this.store.state,e)}setFieldValue(e,r){let o=this.getFullPath(e),s=this.store.configManager?.state[o];s&&s.value!==void 0&&(s.value=r);}hasSchema(e){return !!this.getSchema(e)}getFieldError(e){let r=this.getFullPath(e);return this.store.configManager?.errors[r]}};var Zu=/^(validate|on.+|to.+|render.+)$/,Ju=new Set(["name","id","key","value","path","datatype"]);function Al(t,e=0){if(!(t===null||typeof t!="object"||e>2))for(let r of Object.keys(t)){let o=t[r];typeof o=="function"&&!Zu.test(r)&&!Ju.has(r)?U(o):Al(o,e+1);}}var es=class extends Nr{add(e,r,o){let s=Dr(o)?o():o;return Al(s.options),super.add(e,r,s)}};var B=class B extends H{constructor(){super();this.classs=new Zt(this);this.ctxController=new De(this);this.seq=++B.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="none";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";we();}static{this.seq=0;}static{this.styles=xo;}get activeStore(){return this.internalStore||this.store}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}connectedCallback(){if(super.connectedCallback(),this.state&&!this.store)this._lastInitState!==this.state&&this._initializeInternalStore();else if(this.store)this._validateExternalStore(),this._initializeWithStore(this.store);else {console.warn("[AutoForm] \u65E2\u6CA1\u6709 .state \u4E5F\u6CA1\u6709 .store \u5C5E\u6027\uFF0C\u65E0\u6CD5\u521D\u59CB\u5316");return}}_initializeInternalStore(){this.internalConfigManager=new es({load:()=>({})}),this.internalStore=new gt(Fr(this.state),{configManager:this.internalConfigManager,configKey:"",resetable:true}),this._lastInitState=this.state,this._initializeWithStore(this.internalStore);}_validateExternalStore(){if(!this.store){console.error("[AutoForm] .store \u5C5E\u6027\u4E0D\u5B58\u5728");return}if(!this.store.configManager)throw console.error("[AutoForm] \u4F7F\u7528 .store \u5C5E\u6027\u65F6\uFF0Cstore \u5FC5\u987B\u6709 configManager\uFF01\u8BF7\u521B\u5EFA ConfigManager \u5E76\u4F20\u5165\uFF1Anew AutoStore(state, { configManager }) \u6216\u4F7F\u7528\u63A8\u8350\u7684 .state \u5C5E\u6027\u8BA9 AutoForm \u81EA\u52A8\u521B\u5EFA\u3002"),new Error("AutoForm requires store to have a configManager when using .store property")}_initializeWithStore(r){this.schemaAccessor=new ts(r),this._initialContext(r),this._loadSchemas();}shouldUpdate(r){if(r.has("state")){if(this._lastInitState===this.state)return  true;this.internalConfigManager&&this.internalConfigManager.remove(this.internalStore),this._initializeInternalStore();}else r.has("store")&&this.store&&(this._validateExternalStore(),this._initializeWithStore(this.store));return ["group","path","advanced"].some(o=>r.has(o))&&this._loadSchemas(),true}_appearanceContext(){return {labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,compact:this.compact,readonly:this.readonly,viewonly:this.viewonly,size:this.size,validAt:this.validAt,layout:this.layout}}willUpdate(r){Object.keys(this._appearanceContext()).some(o=>r.has(o))&&(this.context={...this.context,...this._appearanceContext()}),r.has("store")&&this.store&&!(this.store instanceof gt)&&console.warn("[autoform] .store \u4F20\u5165\u7684\u5B9E\u4F8B\u6765\u81EA\u53E6\u4E00\u4EFD autostore \u5B9E\u73B0\uFF0C\u8DE8\u526F\u672C\u7684 Symbol/instanceof \u5224\u522B\u4F1A\u5931\u6548\u3002\u8BF7\u6539\u7528\u672C\u5305\u91CD\u5BFC\u51FA\u7684 AutoForm.AutoStore \u521B\u5EFA\u5B9E\u4F8B\uFF08\u89C1 ADR-0006\uFF09\u3002");}_initialContext(r){this.context={...this.context,...this._appearanceContext(),store:r||this.activeStore,form:this,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit};}_isValid(){let r=this.store?.configManager;if(!r)return  false;if(this.path){let o=r.errors||{},s=this.path.split(".");return Object.keys(o).some(i=>Js(s,i.split(".")))}else return Object.keys(r.errors||{}).length>0}_loadSchemas(){if(!this.schemaAccessor){console.warn("[AutoForm] schemaAccessor not initialized");return}let r=this.schemaAccessor.getAllSchemas(),o=Object.entries(r).map(([s,i])=>({...i,path:s.split(".")}));o=o.filter(s=>this._matchesGroup(s)),o=o.filter(s=>this._matchesAdvanced(s)),o=o.filter(s=>this._matchesPath(s)),o.sort((s,i)=>(s.order||0)-(i.order||0)),this.schemas=o,this.validAtInit&&this._validateAtInit(),this.requestUpdate();}_validateAtInit(){let r=this.activeStore;if(r)for(let o of this.schemas){let s=o.path;if(!(!s||s.length===0))try{let i=Ao(r.state,s);We(r.state,s,i);}catch{}}}_matchesGroup(r){if(!this.group)return  true;let o=this.group.split(",");return o.includes("*")?true:(r.group||"").split(",").some(i=>o.includes(i))}_matchesAdvanced(r){return !(this.advanced===false&&r.advanced)}_matchesPath(r){if(!this.path)return  true;let o=r.path||[];return this.path.split(",").map(i=>i.trim().split(".")).some(i=>o.length<i.length?false:i.every((n,a)=>o[a]===n))}bind(r){if(r){if(!r.configManager){console.error("[AutoForm] bind() \u65B9\u6CD5\u7684 store \u5FC5\u987B\u6709 configManager");return}this.store=r,this._initializeWithStore(r);}}clearErrors(){this.activeStore?.configManager&&this.activeStore?.update(()=>{}),Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(s=>{s.tagName.startsWith("auto-field")&&(s.errorMessage=void 0);}),this.requestUpdate();}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),b`
            <div class="actions header"></div>
            <div class="fields">
                ${Xt(this.schemas,(r,o)=>`field-${o}`,r=>this._renderField(r))}
            </div>
            <div class="actions footer"></div>
        `}_renderField(r){let o=r.widget||"input",s=$n(`auto-field-${o}`);return ie`
			<${s}
				.schema=${r}
				part="field"
				exportparts="field-value,field-label,field-help"
				size=${this.size}
			></${s}>
		`}reset(){this.activeStore?.reset(),this._initialContext(),nr(this,"dirty",false),nr(this,"invalid",false);}submit(r){if(typeof r=="function"){let o=this.activeStore?.configManager,s=this.activeStore?.options.configKey||"",i=s?`${s}.`:"",n=o?Object.entries(o.state).reduce((l,[c,u])=>{let p=c.substring(i.length);return l[p]=u.value,l},{}):{},a=o?o.errors:{};r(n,a);}}};w([Zo({context:Qo})],B.prototype,"context",2),w([P()],B.prototype,"schemas",2),w([h({type:Object})],B.prototype,"store",2),w([h({type:Object})],B.prototype,"state",2),w([h({type:Boolean,reflect:true,attribute:"valid-at-init"})],B.prototype,"validAtInit",2),w([h({type:String,reflect:true})],B.prototype,"group",2),w([h({type:String,reflect:true})],B.prototype,"icon",2),w([h({type:String,reflect:true})],B.prototype,"path",2),w([h({type:Boolean,reflect:true})],B.prototype,"compact",2),w([h({type:Boolean,reflect:true})],B.prototype,"advanced",2),w([h({type:String,reflect:true,attribute:"valid-at"})],B.prototype,"validAt",2),w([h({type:String,reflect:true})],B.prototype,"border",2),w([h({type:String})],B.prototype,"size",2),w([h({type:String,reflect:true,attribute:"label-pos"})],B.prototype,"labelPos",2),w([h({type:String,reflect:true,attribute:"label-width"})],B.prototype,"labelWidth",2),w([h({type:Boolean,reflect:true})],B.prototype,"dark",2),w([h({type:Boolean,reflect:true})],B.prototype,"readonly",2),w([h({type:Boolean,reflect:true})],B.prototype,"viewonly",2),w([h({type:String,reflect:true,attribute:"view-align"})],B.prototype,"viewAlign",2),w([h({type:String,reflect:true})],B.prototype,"layout",2),w([h({type:String,reflect:true})],B.prototype,"icons",2);var Ti=B;customElements.get("auto-form")||customElements.define("auto-form",Ti);var eo=class extends K{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return b`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let r=s=>s.map(i=>typeof i=="string"?i:i.value||i.label),o=(s,i,n=true)=>{if(Array.isArray(i)&&i.length>0){let a=r(i),l=-1;a.some((p,m)=>{if(n&&this.value.startsWith(p)||!n&&this.value.endsWith(p))return n?(this._prefix=p,this.value=this.value.substring(p.length)):(this._suffix=p,this.value=this.value.substring(0,this.value.length-p.length)),l=m,true});let c=l===-1?"?":typeof i[l]=="string"?i[l]:i[l].label,u={type:i.length===1?"button":"dropdown",label:c,caret:!n};u.type==="dropdown"?u.items=i.map(p=>(p==="-"||(p=typeof p=="string"?{label:p}:p,p.onClick=()=>{n?this._prefix=p.value??p.label:this._suffix=p.value??p.label,this.onFieldChange();}),p)):typeof i[0]=="string"?u.label=i[0]:Object.assign(u,i[0]),u.syncMenu=true,u.pos=n?"before":"after",n?s.splice(0,0,u):s.push(u);}};this.options.prefix&&o(this.beforeActions,this.options.prefix),this.options.suffix&&o(this.afterActions,this.options.suffix,false);}onInputChange(r){let o=r.type;o.includes("input")?this.onFieldInput():o.includes("change")&&this.onFieldChange();}onInputBlur(r){this.context.validAt==="lost-focus"&&this.onFieldChange();}renderInput(){return b`
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
                placeholder=${_(this.options.placeholder)}
                pattern=${_(this.options.pattern)}
                minLength=${_(this.options.minLength)}
                maxLength=${_(this.options.maxLength)}
                max=${_(this.options.max)}
                min=${_(this.options.min)}
                step=${_(this.options.step)}
                ?disabled=${!this.options.enable}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${_(this.options.spellcheck)}
            >
                ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input
            >
        `}toState(r){let o=super.toState(r);return typeof o=="string"&&(this._prefix&&(o=this._prefix+o),this._suffix&&(o=o+this._suffix)),o}toInput(r){let o=super.toInput(r);return typeof o=="string"&&(this._prefix&&o.startsWith(this._prefix)&&(o=o.substring(this._prefix.length)),this._suffix&&o.endsWith(this._suffix)&&(o=o.substring(0,o.length-this._suffix.length))),o}};eo.styles=[K.styles,x`
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
        `],eo=w([ht("auto-field-input")],eo);var Qu=Object.defineProperty,at=(t,e)=>Qu(t,"name",{value:e,configurable:true}),ar=(t=>typeof he<"u"?he:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof he<"u"?he:e)[r]}):t)(function(t){if(typeof he<"u")return he.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});function El(t){globalThis.__AUTOSTORE_PLUGINS__||(globalThis.__AUTOSTORE_PLUGINS__=[]),globalThis.__AUTOSTORE_PLUGINS__.push(t);}at(El,"installPlugin");async function Cl(t){return new Promise((e,r)=>setTimeout(e,t))}at(Cl,"t");(t=>typeof ar<"u"?ar:typeof Proxy<"u"?new Proxy(t,{get:at((e,r)=>(typeof ar<"u"?ar:e)[r],"get")}):t)(function(t){if(typeof ar<"u")return ar.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});function Ol(t,e,r){let o=t,s=e.length-1;e.forEach((i,n)=>{let a=_e(o);if(n===s){let l=a?o.get(i):o[i];typeof l=="object"&&Object.assign(l,r);return}a?(o.has(i)||o.set(i,{}),o=o.get(i)):(i in o||(o[i]={}),o=o[i]);});}at(Ol,"updateObjectVal");var tp=class extends Yt{static{at(this,"AsyncProComputedObject");}_isRunning=false;_defaultAbortController=null;_userAbortController;_firstRun=false;lite=false;get async(){return  true}get value(){return super.value}set value(t){super.value=t;}get running(){return this._isRunning}onInitOptions(t){t.reentry===void 0&&(t.reentry=this.store.options.reentry);}onInitial(){this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(()=>{(this.options.immediate===true||this.options.immediate==="auto"&&this.options.initial===void 0)&&this.run({first:true});},0);}onDestroy(){try{this._isRunning&&this.getAbortController().abort();}catch{}}createAsyncComputedValue(){return Object.assign({loading:false,timeout:0,retry:0,error:null,value:this.options.initial,progress:0,run:U(t=>this.store.computedObjects.run(this.id,Object.assign({},t))),cancel:U(()=>{this.getAbortController().abort();})})}updateComputedValue(t){let e=this.strPath,r=Object.keys(t).length;if(this.associated)this.store.update(o=>{Ol(o,this.path,t);},{batch:r>1?e:false});else {Object.assign(this.value,t);let o=r>1,s=[];Object.entries(t).forEach(([i,n])=>{let a={type:"set",path:[...this.path,i],value:n,parent:this.value};o&&(a.reply=true),this.store.operates.emit(`${this.strPath}.${i}`,a),s.push(a);}),o&&this.store.operates.emit(this.strPath,{type:"batch",path:this.path,value:s});}}async run(t){let{first:e}=t??{};if(this.isDisable(t?.enable))return;let r=this.error!==void 0;this.error=void 0,this._firstRun=true;let o=t?Object.assign({first:e},this.options,t):this.options,s=Kt(this,"sync",this.context,o),{reentry:i}=o;if(this._isRunning&&!i){G(this.store,`observer/${this.id}/cancel`,{reason:"reentry",observer:this});return}this._isRunning=true;try{return await this.executeGetter(s,o,r)}finally{this._isRunning=false;}}getValue(){return this.value.value}createComputeProgressbar(t){let{max:e=100,min:r=0,value:o=0}=Object.assign({},t);return this.updateComputedValue({progress:o}),{value:at(s=>{s>e&&(s=e),s<r&&(s=r),this.updateComputedValue({progress:s});},"value"),end(){this.value(e);}}}getAbortController(t){if(t&&typeof t.abortController=="function"){let e=t.abortController();e&&e instanceof AbortController&&(this._userAbortController=e);}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}setTimeoutControl(t,e,r){let{timeout:o}=r,[s,i]=Array.isArray(o)?o:[o,0],n,a;return s>0&&(e.timeout=i>1?i:s,a=setTimeout(()=>{t.hasTimeout=true,t.hasError=true,t.error="TIMEOUT",typeof t.timeoutCallback=="function"&&t.timeoutCallback(),clearInterval(n),this.updateComputedValue({loading:false,error:"TIMEOUT",timeout:0});},s),i>1&&(n=setInterval(()=>{this.updateComputedValue({timeout:i--}),i===0&&clearInterval(n);},s/(i+1)))),{clear:at(()=>{clearTimeout(a),clearInterval(n);},"clear"),enable:s>0}}async executeGetter(t,e,r=false){let{retry:o}=e,[s,i]=o?Array.isArray(o)?o:[Number(o),0]:[0,0],n,a=this.getAbortController(e),l={onTimeout:at(f=>{n=f;},"onTimeout"),getProgressbar:this.createComputeProgressbar.bind(this),getSnap:at(f=>Pr(f),"getSnap"),cancel:a.abort.bind(a),extras:e.extras,operate:e.operate,first:e.first,abortSignal:a.signal},c={error:null,hasError:false,hasTimeout:false,hasAbort:false,timeoutCallback:n},u=at(()=>{c.hasAbort=true;},"abortHandler");a.signal.addEventListener("abort",u),this.error=void 0;let p={clear:at(()=>{},"clear"),enable:false},m;try{let f=at(g=>Object.assign(c,g),"updateCtx");for(let g=0;g<s+1;g++){let y={};try{let S={loading:!0};if(r&&(S.error=null),s>0&&(S.retry=g>0?s-g+1:0),g>0&&f({error:null,hasError:!1,hasTimeout:!1}),p=this.setTimeoutControl(c,S,e),this.updateComputedValue(S),c.hasAbort)throw new Ge;if(G(this.store,`observer/${this.id}/run`,{args:l,observer:this,scope:t}),m=await this.getter.call(this,t,l),c.hasAbort)throw new Ge;c.hasTimeout||(e.raw&&U(m),y.value=m,r&&(y.error=null),p.enable&&(y.timeout=0));}catch(S){if(c.hasError=!0,c.error=S,c.hasTimeout||(y.error=si(S).message),W(e.onError)){let v=e.onError(S);v!==void 0&&(y.value=v);}}finally{p.clear(),g===s&&(c.hasTimeout&&(y.error=c.error),s>0&&(y.retry=0)),y.loading=!1,this.updateComputedValue(y);}c.hasError&&s>0&&i>0&&g<s&&await Cl(i);}c.hasAbort?G(this.store,`observer/${this.id}/cancel`,{reason:"abort",observer:this}):c.hasError||c.hasTimeout?(this.error=c.error,G(this.store,`observer/${this.id}/error`,{error:c.error,observer:this})):G(this.store,`observer/${this.id}/done`,{value:m,observer:this}),this.onDoneCallback(e,c.error,c.hasAbort,c.hasTimeout,t,m);}finally{a.signal.removeEventListener("abort",u);}}onDoneCallback(t,e,r,o,s,i){typeof t.onDone=="function"&&t.onDone.call(this,{id:this.id,path:this.path,value:i,error:e,abort:r,timeout:o,scope:s});}onDependsChange(t){this.run({operate:t,first:!this._firstRun});}getValueWatchPath(){let t=this.path.join(this.store.options.delimiter);return [`${t}.*`,t]}getDepends(){return super.getDepends().map(t=>{if(t.length===0)return t;for(let e of this.store.computedObjects.values())if(xe(e.path,t)&&e.async)return [`${t.join(this.store.options.delimiter)}.value`];return t})}};function Ie(t,e,r){if(typeof t!="function")throw new Error("computed getter must be a function");let o=Object.assign({},Ae(),r,{async:true});o.depends=qe(e);let s=at(()=>({type:"asyncpro",getter:t,options:o,[Cr]:true}),"descriptorBuilder");return s[ct]="asyncpro",s}at(Ie,"asyncComputed");function kl(t){let e=t.constructor.observers;e.asyncpro=(r,o,s)=>{let i=new tp(r,o,s);return r.computedObjects.set(i.id,i),i},t.options.sandbox||(t.options.sandbox={}),t.options.sandbox.context||(t.options.sandbox.context={}),t.options.sandbox.context.asyncComputed=Ie,gt.sandboxVars.asyncComputed=Ie;}at(kl,"asyncpro");El(kl);var $i=class{static createAsyncComputedField(e,r,o,s,i){let n=Ie(o,s,i||{timeout:8e3,retry:2}),a=r.join(".");return e.configManager?.add(e,a,n),n}static subscribeToAsyncValue(e,r){e.run();let o=false,s=setInterval(()=>{!e.loading&&!o&&(e.error||(r(e.value),o=true),clearInterval(s));},100);return ()=>{clearInterval(s),e.cancel?.();}}static getAsyncState(e){return {loading:e.loading||false,progress:e.progress||0,error:e.error,value:e.value}}static createProgressiveAsyncField(e,r,o,s){let i=Ie(o,s,{timeout:[1e4,100],retry:[3,1e3],immediate:true}),n=r.join(".");return e.configManager?.add(e,n,i),i}};var Tl={};q(Tl,{AutoDropdownField:()=>rs});var rs=class extends K{constructor(){super(...arguments);this.active=false;}static{this.styles=[K.styles,x`
            sl-dropdown {
                width: 100%;
                padding: 4px;
            }
            .placeholder {
                color: var(--auto-border-color);
                flex-grow: 1;
            }
            :host > .autofield > .value > .content {
                display: flex;
                flex-direction: row;
                border: var(--auto-border);
                font-size: var(--auto-font-size);
                color: var(--auto-color);
                border-radius: var(--auto-border-radius);
                letter-spacing: var(--auto-letter-spacing);
                background-color: var(--auto-input-bgcolor);
                overflow-y: auto;
                overflow-x: hidden;
                align-items: anchor-center;
                & > .dropdown {
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    background-color: var(--auto-input-bgcolor);
                    padding: calc(0.05 * var(--auto-padding));
                    box-sizing: border-box;
                    & > sl-dropdown {
                        &::slotted(*) {
                            align-items: center;
                        }
                    }
                }
                & > .actions {
                    display: flex;
                    align-items: center;
                    & > *::part(base) {
                        border: 0px;
                        border-radius: 0px;
                    }
                }
                & > .actions.before {
                    & > *::part(base) {
                        border-right: var(--auto-border);
                    }
                }
                & > .actions.after {
                    & > *::part(base) {
                        border-left: var(--auto-border);
                    }
                }
            }
            .selection {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
                border-radius: var(--sl-input-border-radius-medium);
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                height: var(--auto-line-height);
                & > .select-value,
                & > .content {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    padding: 0 0.5em;
                }
                & > .suffix {
                    cursor: pointer;
                    padding-left: 0.5em;
                    padding-right: 0.5em;
                }
                sl-tag {
                    margin-right: 0.5em;
                    margin-top: 0rem;
                    margin-bottom: 0.2em;
                }
                & > .icon {
                    display: flex;
                    align-items: center;
                    font-size: var(--auto-font-size);
                    padding-left: 0.5em;
                }
            }
            .popoup-container {
                min-height: 1em;
                position: relative;
                &.dropdown {
                    border: var(--auto-border);
                    background-color: var(--sl-input-background-color);
                }
            }
            sl-icon.chevron {
                transition: all 0.2s ease-in;
                &.active {
                    transform: rotate(-180deg);
                }
            }
        `];}getInitialOptions(){return {dropdown:true}}_isEmpty(){return Array.isArray(this.value)?this.value.length===0:this.value.trim()===""}_renderSelection(){return b`<div class="selection" slot="trigger">
            ${Q(this.options.icon,()=>b`<span class="icon"
                        ><sl-icon name="${this.options.icon}"></sl-icon
                    ></span>`)}
            ${Q(this._isEmpty()&&this.options.placeholder,()=>b`<span class="placeholder">${this.options.placeholder}</span>`,()=>b`<span class="select-value"> ${this.renderSelection()} </span>`)}
            <span class="suffix">
                <sl-icon
                    library="system"
                    class="chevron ${L({active:this.active})}"
                    name="chevron-down"
                    aria-hidden="true"
                >
                </sl-icon>
            </span>
        </div> `}_renderContent(){return b`<div
            class="popoup-container ${_(this.options.dropdown?"dropdown":void 0)}"
        >
            ${this.renderDropdown()}
        </div>`}renderDropdown(){}renderSelection(r){return b`
            ${this.options.renderSelection?this.options.renderSelection(r||this.value,b):r||this.value}
        `}renderInput(){return this.options.dropdown?b`
                <div class="content">
                    ${this.renderBeforeActions(false)}
                    <span class="dropdown">
                        <sl-dropdown
                            size="${this.context.size}"
                            @sl-show="${()=>{this.active=true;}}"
                            @sl-after-hide="${()=>{this.active=false;}}"
                            sync="width"
                            distance="12"
                            .containingElement="${this}"
                        >
                            ${this._renderSelection()} ${this._renderContent()}
                        </sl-dropdown>
                    </span>
                    ${this.renderAfterActions(false)}
                </div>
            `:b`${this._renderContent()}`}};w([P()],rs.prototype,"active",2);var $l={};q($l,{AsyncOptionState:()=>Ri});var Ri=class{constructor(e,r,o){this.path=r;this.handle=o;this._loading=false;this._promiseSeq=0;this._consumedPromise=null;this.host=e,e.addController(this);}get loading(){return this._loading}get value(){return this._value}load(){let e=this.host.options,r=V(e,this.path);if(At(r))r.loading?(this._loading=true,this._value=this.handle(void 0)):(this._value=this.handle(r.value),this._loading=false);else if(r instanceof Promise){if(r!==this._consumedPromise){this._consumedPromise=r,this._loading=true,this._value=this.handle(void 0);let o=++this._promiseSeq;r.then(s=>{o===this._promiseSeq&&(this._value=this.handle(s),this._loading=false,this.host.requestUpdate());},s=>{o===this._promiseSeq&&(this._value=this.handle(void 0),this._loading=false,console.error(`AsyncOptionState load <${Array.isArray(this.path)?this.path.join("."):this.path}> failed: ${s?.message||s}`),this.host.requestUpdate());});}}else this._consumedPromise=null,this._value=this.handle(r),this._loading=false;}render(e){return b`
            ${Q(this.loading,()=>b`<auto-loading></auto-loading>`,()=>e(this._value))}
        `}hostUpdate(){this.load();}hostUpdated(){}};var Rl={};q(Rl,{ContextController:()=>De,HostClasses:()=>Zt,HostStyles:()=>Pi,ImagePreview:()=>Li,Scrollbar:()=>os,ScrollbarController:()=>Mi});var Pi=class{constructor(e,...r){this.initialStyles=[];this.host=e,e.addController(this),this.initialStyles=r;}_forEachStyle(e,r){e&&e.forEach(o=>{Object.entries(o).forEach(([s,i])=>{r(s,i);});});}add(...e){this.host&&this._forEachStyle(e,(r,o)=>{this.host.style.setProperty(r,o);});}remove(...e){this.host&&e.forEach(r=>{this.host.style.removeProperty(r);});}toggle(...e){this.host&&e.forEach(r=>{Object.entries(r).forEach(([o,s])=>{s?o.split(";").filter(n=>n.trim()).forEach(n=>{let[a,l]=n.split(":").map(c=>c.trim());a&&l&&this.host.style.setProperty(a,l);}):o.split(";").filter(n=>n.trim()).forEach(n=>{let[a]=n.split(":").map(l=>l.trim());a&&this.host.style.removeProperty(a);});});});}has(e){return !!this.host.style.getPropertyValue(e)}hostConnected(){this.add(...this.initialStyles);}hostDisconnected(){this.initialStyles.forEach(e=>{Object.keys(e).forEach(r=>{this.host.style.removeProperty(r);});});}};var Li=class{constructor(e,r){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=e,this.options={...this.options,...r},e.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(e){let r=e.target;if(this.isPreviewActive){this.closePreview();return}r.matches(this.options.selector)&&(e.preventDefault(),e.stopPropagation(),this.originalImage=r,this.showPreview(this.originalImage));}showPreview(e){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let r=this.options.overlayColor,o=this.hexToRgb(r);this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=e.src,this.previewImage.alt=e.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let s=e.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${s.top}px`,this.previewImage.style.left=`${s.left}px`,this.previewImage.style.width=`${s.width}px`,this.previewImage.style.height=`${s.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",this.closePreview.bind(this)),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, ${this.options.overlayOpacity})`;let i=window.innerWidth,n=window.innerHeight,{width:a,height:l}=this.calculateAspectRatioFit(e.naturalWidth,e.naturalHeight,i*.9,n*.9),c=(n-l)/2,u=(i-a)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${c}px`,this.previewImage.style.left=`${u}px`,this.previewImage.style.width=`${a}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let e=window.innerWidth,r=window.innerHeight,{width:o,height:s}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,e*.9,r*.9),i=(r-s)/2,n=(e-o)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${i}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${o}px`,this.previewImage.style.height=`${s}px`);});}handleKeydown(e){e.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let e=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${e.top}px`,this.previewImage.style.left=`${e.left}px`,this.previewImage.style.width=`${e.width}px`,this.previewImage.style.height=`${e.height}px`;});let r=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(e,r,o,s){if(e<=o&&r<=s)return {width:e,height:r};let i=Math.min(o/e,s/r);return {width:e*i,height:r*i}}hexToRgb(e){e=e.replace(/^#/,""),e.length===3&&(e=e.split("").map(i=>i+i).join(""));let r=parseInt(e.substring(0,2),16),o=parseInt(e.substring(2,4),16),s=parseInt(e.substring(4,6),16);return {r:isNaN(r)?0:r,g:isNaN(o)?0:o,b:isNaN(s)?0:s}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var os=class{constructor(e,r){for(this.options=Object.assign({width:"8px"},r),this.target=e,this.content=e.firstElementChild,this.direction=window.getComputedStyle(this.target).direction,this.scrollRatio=1,this.bar=null,this.wrapper=document.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=document.createElement("div"),this.el.setAttribute("class","ss-content"),this.direction==="rtl"&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",'<div class="ss-scroll">'),this.bar=this.target.lastChild,this.bar.style.width=this.options.width,this.mB=this.moveBar.bind(this),this.dragDealer(this.bar),this.moveBar(),window.addEventListener("resize",this.mB),this.el.addEventListener("scroll",this.mB),this.el.addEventListener("mouseenter",this.mB),this.target.classList.add("ss-container");let o=window.getComputedStyle(e);o.height==="0px"&&o["max-height"]!=="0px"&&(e.style.height=o["max-height"]);}dragDealer(e){let r,o=n=>{let a=n.pageY-r;r=n.pageY,this.requestAnimationFrame(()=>{this.el&&(this.el.scrollTop+=a/this.scrollRatio);});},s=()=>{e.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",s);},i=n=>(r=n.pageY,e.classList.add("ss-grabbed"),document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",s),false);e.mouseDownHandler=i,e.addEventListener("mousedown",i);}requestAnimationFrame(e){window.requestAnimationFrame?window.requestAnimationFrame(e):window.setTimeout(e,0);}moveBar(){if(!this.el||!this.target)return;let e=this.el.scrollHeight,r=this.el.clientHeight;this.scrollRatio=r/e;let s=this.direction==="rtl"&&this.bar?this.target.clientWidth-this.bar.clientWidth+18:this.bar?(this.target.clientWidth-this.bar.clientWidth)*-1:0;this.requestAnimationFrame(()=>{this.scrollRatio>=1?this.bar?.classList.add("ss-hidden"):(this.bar?.classList.remove("ss-hidden"),this.bar&&(this.bar.style.cssText="height:"+Math.max(this.scrollRatio*100,10)+"%; top:"+this.el.scrollTop/e*100+"%;right:"+s+"px;"));});}destroy(){if(window.removeEventListener("resize",this.mB),this.el&&(this.el.removeEventListener("scroll",this.mB),this.el.removeEventListener("mouseenter",this.mB)),this.bar?.mouseDownHandler&&(this.bar.removeEventListener("mousedown",this.bar.mouseDownHandler),delete this.bar.mouseDownHandler),this.target){this.target.classList.remove("ss-container");try{this.content&&this.wrapper&&this.target.insertBefore(this.content,this.wrapper),this.wrapper&&this.target.removeChild(this.wrapper);}catch(e){console.error("Error restoring DOM structure during scrollbar destroy:",e);}if(this.bar){try{this.target.removeChild(this.bar);}catch(e){console.error("Error removing scrollbar during destroy:",e);}this.bar=null;}}this.target=null,this.content=null,this.wrapper=null,this.el=null,this.mB=null;}},Mi=class{constructor(e){this._scrollbars=[];this.host=e,e.addController(this);}static{this.styles=x`
        .ss-wrapper {
            overflow: hidden;
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 1;
            float: left;
        }

        .ss-content {
            height: 100%;
            width: calc(100% + 18px);
            padding: 0 0 0 0;
            position: relative;
            overflow-x: auto;
            overflow-y: scroll;
            box-sizing: border-box;
        }

        .ss-content.rtl {
            width: calc(100% + 18px);
            right: auto;
        }

        .ss-scroll {
            position: relative;
            background: rgba(0, 0, 0, 0.1);
            width: 8px;
            border-radius: 4px;
            top: 0;
            z-index: 2;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.25s linear;
        }

        .ss-hidden {
            display: none;
        }
        .ss-container {
            overflow-x: clip;
        }
        .ss-container:hover .ss-scroll,
        .ss-container:active .ss-scroll {
            opacity: 1;
        }

        .ss-grabbed {
            -o-user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;
        }
    `;}create(e,r){let o=new os(e,r);return this._scrollbars.push(o),o}hostConnected(){}hostUpdate(){}hostDisconnected(){for(let e of this._scrollbars)e.destroy();this._scrollbars=[];}};var Pl={};q(Pl,{renderWidget:()=>ep});function ep(t,e){let r=t.width,o=t.height,s=t.widget,i;try{i=document.createElement(`auto-field-${s||"input"}`);}catch{i=document.createElement("auto-field-input");}if(i.schema=t,i.setAttribute("part","field"),i.setAttribute("exportparts","field-value, field-label,field-help"),e?.styles&&Object.assign(i.style,e.styles),e?.attrs){for(let n in e.attrs)i.setAttribute(n,String(e.attrs[n]));i.parent=e.parent;}return r&&(i.style.width=String(r)),o&&(i.style.height=String(o)),e?.classs&&(typeof e.classs=="string"?i.classList.add(e.classs):typeof e.classs=="object"&&Object.entries(e.classs).forEach(([n,a])=>{a?i.classList.add(n):i.classList.remove(n);})),i}var Ll={};q(Ll,{getInputValue:()=>rp});function rp(t){if(t)if(t.type==="checkbox"){if(t.value==="on")return t.checked;if(t.value.startsWith("[")&&t.value.endsWith("]"))try{let e=JSON.parse(t.value);return t.checked?e[0]:e[1]}catch{return t.checked}else return t.checked?t.value:null}else return t.value}void(function(){
    window.AutoFormCore = exports;
})();exports.ASYNC_COMPUTED_VALUE=qs;exports.AbortError=Ge;exports.AsyncComputedObject=Br;exports.AsyncFieldHandler=$i;exports.AutoField=K;exports.AutoForm=Ti;exports.AutoStore=gt;exports.AutoStoreError=Dt;exports.AutoStoreNS=ha;exports.BATCH_UPDATE_EVENT=Ws;exports.ComputedObject=Yt;exports.ComputedObjects=Ir;exports.ConfigManager=Nr;exports.Controllers=Rl;exports.ControllersAsyncState=$l;exports.CyleDependError=ni;exports.DELETE_FLAG=Ac;exports.EMPTY=Sc;exports.FastEvent=di;exports.Field=Sl;exports.FieldDropdown=Tl;exports.FormVars=Nn;exports.GLOBAL_CONFIG_MANAGER=Wt;exports.InvalidComputedArgumentsError=Vr;exports.InvalidDependsError=li;exports.InvalidScopeError=ai;exports.OBSERVER_DESCRIPTOR_BUILDER_FLAG=Us;exports.OBSERVER_DESCRIPTOR_FLAG=Cr;exports.OBSERVER_TYPE_FLAG=ct;exports.ObserverObject=zr;exports.ObserverScopeRef=mi;exports.PATH_DELIMITER=C;exports.SHALLOW_PROXY_FLAG=ae;exports.SKIP_PROXY_FLAG=Er;exports.SyncComputedObject=jr;exports.TimeoutError=ii;exports.UtilsGetInputValue=Ll;exports.UtilsRenderWidget=Pl;exports.UtilsTag=nn;exports.ValidateError=Ee;exports.WITH_SCHEMA_VALUE=Qs;exports.asyncComputed=Ie;exports.calcDependPaths=Se;exports.computed=gi;exports.configurable=bi;exports.createAsyncComputedValue=Pc;exports.createRefState=ia;exports.delay=Oc;exports.emitEvent=oi;exports.emitStoreEvent=G;exports.escapePath=Co;exports.execObserverInitial2=Ic;exports.forEachObject=Rr;exports.getAbsolutePath=Or;exports.getComputedType=Mc;exports.getDefaultComputedOptions=Ae;exports.getDefaultConfigManager=zc;exports.getDepends=kc;exports.getError=si;exports.getId=Tr;exports.getMapVal=kr;exports.getSchemaValue=ei;exports.getSnap=Pr;exports.getSnapshot=Mr;exports.getVal=V;exports.getValueScope=Kt;exports.installPlugin=Rc;exports.isAbsolutePath=Ec;exports.isAllowCreatedObserver=ri;exports.isAsyncComputed=Dc;exports.isAsyncComputedValue=At;exports.isAutoStore=Vc;exports.isEq=Gs;exports.isFunction=W;exports.isMap=_e;exports.isObserverDescriptor=Cc;exports.isObserverDescriptorBuilder=Zs;exports.isPathEq=xe;exports.isPathMatched=Ks;exports.isPlainObject=Ys;exports.isPrimitive=$c;exports.isPromise=Xs;exports.isRaw=qt;exports.isRelPath=Lc;exports.isSchemaDescriptorBuilder=Dr;exports.isShallow=au;exports.isWithSchemaValue=Yn;exports.joinPath=Gt;exports.lit=sn;exports.litContext=vl;exports.litDecorators=qi;exports.litDirectivesClassMap=ya;exports.litDirectivesIfDefined=da;exports.litDirectivesRepeat=Sa;exports.litDirectivesStyleMap=_a;exports.litDirectivesUnsafeHTML=wl;exports.litDirectivesWhen=fa;exports.markRaw=U;exports.noRepeat=Lr;exports.normalizeDeps=qe;exports.params=Gn;exports.pathIsExists=Tc;exports.pathStartsWith=Js;exports.refState=fi;exports.registerIcons=we;exports.schema=Po;exports.setVal=Mt;exports.shallow=nu;exports.splitPath=le;exports.unescapePath=Kn;exports.withSchema=ti;return exports;})({});//# sourceMappingURL=core.global.js.map
//# sourceMappingURL=core.global.js.map