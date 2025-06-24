var AutoFieldTreeSelect=(function(exports){'use strict';var xi=Object.defineProperty;var Si=Object.getOwnPropertyDescriptor;var te=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var j=(r,e,t,i)=>{for(var s=i>1?void 0:i?Si(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&xi(e,t,s),s};var Qt=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(e){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=e;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var B=function(r,e,t,i,s){if(typeof e=="function"?r!==e||true:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(r,t),t},E=function(r,e,t,i){if(typeof e=="function"?r!==e||true:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?i:t==="a"?i.call(r):i?i.value:e.get(r)},fe,He,Fe,we,gt,Ee,qe,re,Ce,K,Ge,er,tr=r=>typeof r=="boolean"?r:r?.capture??false;var Ai=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(e,t,i){if(t==null)return;let s=tr(i)?this.__captureEventListeners:this.__eventListeners,o=s.get(e);if(o===void 0)o=new Map,s.set(e,o);else if(o.has(t))return;let n=typeof i=="object"&&i?i:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(e,t,i)),o.set(t,n??{});}removeEventListener(e,t,i){if(t==null)return;let s=tr(i)?this.__captureEventListeners:this.__eventListeners,o=s.get(e);o!==void 0&&(o.delete(t),o.size||s.delete(e));}dispatchEvent(e){let t=[this],i=this.__eventTargetParent;if(e.composed)for(;i;)t.push(i),i=i.__eventTargetParent;else for(;i&&i!==this.__host;)t.push(i),i=i.__eventTargetParent;let s=false,o=false,n=0,l=null,a=null,c=null,u=e.stopPropagation,h=e.stopImmediatePropagation;Object.defineProperties(e,{target:{get(){return l??a},...y},srcElement:{get(){return e.target},...y},currentTarget:{get(){return c},...y},eventPhase:{get(){return n},...y},composedPath:{value:()=>t,...y},stopPropagation:{value:()=>{s=true,u.call(e);},...y},stopImmediatePropagation:{value:()=>{o=true,h.call(e);},...y}});let g=(_,H,Ae)=>{typeof _=="function"?_(e):typeof _?.handleEvent=="function"&&_.handleEvent(e),H.once&&Ae.delete(_);},f=()=>(c=null,n=0,!e.defaultPrevented),v=t.slice().reverse();l=!this.__host||!e.composed?this:null;let D=_=>{for(a=this;a.__host&&_.includes(a.__host);)a=a.__host;};for(let _ of v){!l&&(!a||a===_.__host)&&D(v.slice(v.indexOf(_))),c=_,n=_===e.target?2:1;let H=_.__captureEventListeners.get(e.type);if(H){for(let[Ae,mt]of H)if(g(Ae,mt,H),o)return f()}if(s)return f()}let ee=e.bubbles?t:[this];a=null;for(let _ of ee){!l&&(!a||_===a.__host)&&D(ee.slice(0,ee.indexOf(_)+1)),c=_,n=_===e.target?2:3;let H=_.__eventListeners.get(e.type);if(H){for(let[Ae,mt]of H)if(g(Ae,mt,H),o)return f()}if(s)return f()}return f()}},yt=Ai;var y={__proto__:null};y.enumerable=true;Object.freeze(y);var bt=(K=class{constructor(e,t={}){if(fe.set(this,false),He.set(this,false),Fe.set(this,false),we.set(this,false),gt.set(this,Date.now()),Ee.set(this,false),qe.set(this,void 0),re.set(this,void 0),Ce.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof t!="object"||!t)throw new Error('The "options" argument must be an object');let{bubbles:i,cancelable:s,composed:o}=t;B(this,fe,!!s),B(this,He,!!i),B(this,Fe,!!o),B(this,qe,`${e}`),B(this,re,null),B(this,Ce,false);}initEvent(e,t,i){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){B(this,we,true);}get target(){return E(this,re,"f")}get currentTarget(){return E(this,re,"f")}get srcElement(){return E(this,re,"f")}get type(){return E(this,qe,"f")}get cancelable(){return E(this,fe,"f")}get defaultPrevented(){return E(this,fe,"f")&&E(this,we,"f")}get timeStamp(){return E(this,gt,"f")}composedPath(){return E(this,Ce,"f")?[E(this,re,"f")]:[]}get returnValue(){return !E(this,fe,"f")||!E(this,we,"f")}get bubbles(){return E(this,He,"f")}get composed(){return E(this,Fe,"f")}get eventPhase(){return E(this,Ce,"f")?K.AT_TARGET:K.NONE}get cancelBubble(){return E(this,Ee,"f")}set cancelBubble(e){e&&B(this,Ee,true);}stopPropagation(){B(this,Ee,true);}get isTrusted(){return  false}},fe=new WeakMap,He=new WeakMap,Fe=new WeakMap,we=new WeakMap,gt=new WeakMap,Ee=new WeakMap,qe=new WeakMap,re=new WeakMap,Ce=new WeakMap,K.NONE=0,K.CAPTURING_PHASE=1,K.AT_TARGET=2,K.BUBBLING_PHASE=3,K);Object.defineProperties(bt.prototype,{initEvent:y,stopImmediatePropagation:y,preventDefault:y,target:y,currentTarget:y,srcElement:y,type:y,cancelable:y,defaultPrevented:y,timeStamp:y,composedPath:y,returnValue:y,bubbles:y,composed:y,eventPhase:y,cancelBubble:y,stopPropagation:y,isTrusted:y});var rr=(er=class extends bt{constructor(e,t={}){super(e,t),Ge.set(this,void 0),B(this,Ge,t?.detail??null);}initCustomEvent(e,t,i,s){throw new Error("Method not implemented.")}get detail(){return E(this,Ge,"f")}},Ge=new WeakMap,er);Object.defineProperties(rr.prototype,{detail:y});var vt=bt,_t=rr;globalThis.Event??=vt;globalThis.CustomEvent??=_t;var ir=new WeakMap,Oe=r=>{let e=ir.get(r);return e===void 0&&ir.set(r,e=new Map),e},wi=class extends yt{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(Oe(this)).map(([e,t])=>({name:e,value:t}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(e,t){Oe(this).set(e,String(t));}removeAttribute(e){Oe(this).delete(e);}toggleAttribute(e,t){if(this.hasAttribute(e)){if(t===void 0||!t)return this.removeAttribute(e),false}else return t===void 0||t?(this.setAttribute(e,""),true):false;return  true}hasAttribute(e){return Oe(this).has(e)}attachShadow(e){let t={host:this};return this.__shadowRootMode=e.mode,e&&e.mode==="open"&&(this.__shadowRoot=t),t}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let e=new Qt(this);return this.__internals=e,e}getAttribute(e){return Oe(this).get(e)??null}};var Ei=class extends wi{},xt=Ei;globalThis.litServerRoot??=Object.defineProperty(new xt,"localName",{get(){return "lit-server-root"}});var Ci=class{constructor(){this.__definitions=new Map;}define(e,t){if(this.__definitions.has(e))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${e}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${e}" has already been used with this registry`);t.__localName=e,this.__definitions.set(e,{ctor:t,observedAttributes:t.observedAttributes??[]});}get(e){return this.__definitions.get(e)?.ctor}},Oi=Ci;var sr=new Oi;var Te=globalThis,Ke=Te.ShadowRoot&&(Te.ShadyCSS===void 0||Te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,St=Symbol(),or=new WeakMap,$e=class{constructor(e,t,i){if(this._$cssResult$=true,i!==St)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t;}get styleSheet(){let e=this.o,t=this.t;if(Ke&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=or.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&or.set(t,e));}return e}toString(){return this.cssText}},nr=r=>new $e(typeof r=="string"?r:r+"",void 0,St),A=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new $e(t,r,St)},ar=(r,e)=>{if(Ke)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=Te.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i);}},At=Ke||Te.CSSStyleSheet===void 0?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return nr(t)})(r):r;var{is:Ti,defineProperty:$i,getOwnPropertyDescriptor:Vi,getOwnPropertyNames:Ri,getOwnPropertySymbols:Pi,getPrototypeOf:Di}=Object,Re=globalThis;Re.customElements??=sr;var lr=Re.trustedTypes,ki=lr?lr.emptyScript:"",Li=Re.reactiveElementPolyfillSupport,Ve=(r,e)=>r,Y={toAttribute(r,e){switch(e){case Boolean:r=r?ki:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r);}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r);}catch{t=null;}}return t}},Ye=(r,e)=>!Ti(r,e),cr={attribute:true,type:String,converter:Y,reflect:false,useDefault:false,hasChanged:Ye};Symbol.metadata??=Symbol("metadata"),Re.litPropertyMetadata??=new WeakMap;var F=class extends(globalThis.HTMLElement??xt){static addInitializer(e){this._$Ei(),(this.l??=[]).push(e);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=cr){if(t.state&&(t.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=true),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&$i(this.prototype,e,s);}}static getPropertyDescriptor(e,t,i){let{get:s,set:o}=Vi(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n;}};return {get:s,set(n){let l=s?.call(this);o?.call(this,n),this.requestUpdate(e,l,i);},configurable:true,enumerable:true}}static getPropertyOptions(e){return this.elementProperties.get(e)??cr}static _$Ei(){if(this.hasOwnProperty(Ve("elementProperties")))return;let e=Di(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties);}static finalize(){if(this.hasOwnProperty(Ve("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(Ve("properties"))){let t=this.properties,i=[...Ri(t),...Pi(t)];for(let s of i)this.createProperty(s,t[s]);}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s);}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(At(s));}else e!==void 0&&t.push(At(e));return t}static _$Eu(e,t){let i=t.attribute;return i===false?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this));}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.();}removeController(e){this._$EO?.delete(e);}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e);}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ar(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(e=>e.hostConnected?.());}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.());}attributeChangedCallback(e,t,i){this._$AK(e,i);}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===true){let o=(i.converter?.toAttribute!==void 0?i.converter:Y).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null;}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Y;this._$Em=s,this[s]=n.fromAttribute(t,o.type)??this._$Ej?.get(s)??null,this._$Em=null;}}requestUpdate(e,t,i){if(e!==void 0){let s=this.constructor,o=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??Ye)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==true||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===true&&this._$Em!==e&&(this._$Eq??=new Set).add(e));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0;}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:n}=o,l=this[s];n!==true||this._$AL.has(s)||l===void 0||this.C(s,void 0,o,l);}}let e=false,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM();}catch(i){throw e=false,this._$EM(),i}e&&this._$AE(t);}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(e)),this.updated(e);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return  true}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(e){}firstUpdated(e){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[Ve("elementProperties")]=new Map,F[Ve("finalized")]=new Map,Li?.({ReactiveElement:F}),(Re.reactiveElementVersions??=[]).push("2.1.0");var rt=globalThis,Xe=rt.trustedTypes,hr=Xe?Xe.createPolicy("lit-html",{createHTML:r=>r}):void 0,Et="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+q,Ii=`<${Ct}>`,oe=rt.document===void 0?{createTreeWalker:()=>({})}:document,De=()=>oe.createComment(""),ke=r=>r===null||typeof r!="object"&&typeof r!="function",Ot=Array.isArray,gr=r=>Ot(r)||typeof r?.[Symbol.iterator]=="function",wt=`[ 	
\f\r]`,Pe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pr=/-->/g,ur=/>/g,ie=RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dr=/'/g,fr=/"/g,yr=/^(?:script|style|textarea|title)$/i,Tt=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),d=Tt(1),S=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),mr=new WeakMap,se=oe.createTreeWalker(oe,129);function br(r,e){if(!Ot(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return hr!==void 0?hr.createHTML(e):e}var vr=(r,e)=>{let t=r.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",n=Pe;for(let l=0;l<t;l++){let a=r[l],c,u,h=-1,g=0;for(;g<a.length&&(n.lastIndex=g,u=n.exec(a),u!==null);)g=n.lastIndex,n===Pe?u[1]==="!--"?n=pr:u[1]!==void 0?n=ur:u[2]!==void 0?(yr.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=ie):u[3]!==void 0&&(n=ie):n===ie?u[0]===">"?(n=s??Pe,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,c=u[1],n=u[3]===void 0?ie:u[3]==='"'?fr:dr):n===fr||n===dr?n=ie:n===pr||n===ur?n=Pe:(n=ie,s=void 0);let f=n===ie&&r[l+1].startsWith("/>")?" ":"";o+=n===Pe?a+Ii:h>=0?(i.push(c),a.slice(0,h)+Et+a.slice(h)+q+f):a+q+(h===-2?l:f);}return [br(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},Le=class r{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0,l=e.length-1,a=this.parts,[c,u]=vr(e,t);if(this.el=r.createElement(c,i),se.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes);}for(;(s=se.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Et)){let g=u[n++],f=s.getAttribute(h).split(q),v=/([.?@])?(.*)/.exec(g);a.push({type:1,index:o,name:v[2],strings:f,ctor:v[1]==="."?Je:v[1]==="?"?Qe:v[1]==="@"?et:ae}),s.removeAttribute(h);}else h.startsWith(q)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(yr.test(s.tagName)){let h=s.textContent.split(q),g=h.length-1;if(g>0){s.textContent=Xe?Xe.emptyScript:"";for(let f=0;f<g;f++)s.append(h[f],De()),se.nextNode(),a.push({type:2,index:++o});s.append(h[g],De());}}}else if(s.nodeType===8)if(s.data===Ct)a.push({type:2,index:o});else {let h=-1;for(;(h=s.data.indexOf(q,h+1))!==-1;)a.push({type:7,index:o}),h+=q.length-1;}o++;}}static createElement(e,t){let i=oe.createElement("template");return i.innerHTML=e,i}};function ne(r,e,t=r,i){if(e===S)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,o=ke(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(false),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=ne(r,s._$AS(r,e.values),s,i)),e}var Ze=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??oe).importNode(t,true);se.currentNode=s;let o=se.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new me(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new tt(o,this,e)),this._$AV.push(c),a=i[++l];}n!==a?.index&&(o=se.nextNode(),n++);}return se.currentNode=oe,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++;}},me=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??true;}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ne(this,e,t),ke(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):gr(e)?this.k(e):this._(e);}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e));}_(e){this._$AH!==b&&ke(this._$AH)?this._$AA.nextSibling.data=e:this.T(oe.createTextNode(e)),this._$AH=e;}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Le.createElement(br(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else {let o=new Ze(s,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o;}}_$AC(e){let t=mr.get(e.strings);return t===void 0&&mr.set(e.strings,t=new Le(e)),t}k(e){Ot(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let o of e)s===t.length?t.push(i=new r(this.O(De()),this.O(De()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s);}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(false,true,t);e&&e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i;}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e));}},ae=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b;}_$AI(e,t=this,i,s){let o=this.strings,n=false;if(o===void 0)e=ne(this,e,t,0),n=!ke(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else {let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=ne(this,l[i+a],t,a),c===S&&(c=this._$AH[a]),n||=!ke(c)||c!==this._$AH[a],c===b?e=b:e!==b&&(e+=(c??"")+o[a+1]),this._$AH[a]=c;}n&&!s&&this.j(e);}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"");}},Je=class extends ae{constructor(){super(...arguments),this.type=3;}j(e){this.element[this.name]=e===b?void 0:e;}},Qe=class extends ae{constructor(){super(...arguments),this.type=4;}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b);}},et=class extends ae{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5;}_$AI(e,t=this){if((e=ne(this,e,t,0)??b)===S)return;let i=this._$AH,s=e===b&&i!==b||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e;}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e);}},tt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i;}get _$AU(){return this._$AM._$AU}_$AI(e){ne(this,e);}},_r={I:me},ji=rt.litHtmlPolyfillSupport;ji?.(Le,me),(rt.litHtmlVersions??=[]).push("3.3.0");var xr=(r,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=t?.renderBefore??null;i._$litPart$=s=new me(e.insertBefore(De(),o),o,void 0,t??{});}return s._$AI(r),s};var $t=globalThis,N=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xr(t,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return S}};N._$litElement$=true,N.finalized=true,$t.litElementHydrateSupport?.({LitElement:N});var Mi=$t.litElementPolyfillSupport;Mi?.({LitElement:N});($t.litElementVersions??=[]).push("4.2.0");var Sr=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e);}):customElements.define(r,e);};var Bi={attribute:true,type:String,converter:Y,reflect:false,hasChanged:Ye},Ni=(r=Bi,e,t)=>{let{kind:i,metadata:s}=t,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=true),o.set(t.name,r),i==="accessor"){let{name:n}=t;return {set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,r);},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(i==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,r);}}throw Error("Unsupported decorator location: "+i)};function m(r){return (e,t)=>typeof t=="object"?Ni(r,e,t):((i,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,e,t)}function $(r){return m({...r,state:true,attribute:false})}var X=(r,e,t)=>(t.configurable=true,t.enumerable=true,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(r,e,t),t);function V(r,e){return (t,i,s)=>{let o=n=>n.renderRoot?.querySelector(r)??null;return X(t,i,{get(){return o(this)}})}}function Ar(r){return (e,t)=>{let{slot:i,selector:s}=r??{},o="slot"+(i?`[name=${i}]`:":not([name])");return X(e,t,{get(){let n=this.renderRoot?.querySelector(o),l=n?.assignedElements(r)??[];return s===void 0?l:l.filter(a=>a.matches(s))}})}}var C=".";var Rt="__AS_ASYNC_COMPUTED_VALUE__";function st(r){return toString.call(r)==="[object Map]"}function M(r){return r&&typeof r=="object"&&r.hasOwnProperty(Rt)}function Dt(r,e){let t=r.get(e);if(t!==void 0)return t;let i=r.get(Number(e)||e);if(i!==void 0)return i}function G(r,e,t){if(!e||e.length===0)return r;let i=Array.isArray(e)?e:e.split(C),s,o=r;for(let n=0;n<i.length;n++){let l=i[n];if(st(o))s=Dt(o,l);else if(l in o)s=o[l];else return t;o=s;}return s}function le(r,e,t,i){if(!e||!r)return r;let s=e;if(s.length===0)return typeof r=="object"&&Object.assign(r,t),r;{let o=r,n=[],l=(a,c,u)=>{a[c]=u;};for(let a=0;a<s.length;a++){let c=s[a];if(n.push(c),o)if(Array.isArray(o)){let u=parseInt(c,10);if(Number.isNaN(u)||u<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);a===s.length-1?l(o,u,t):o=o[u];}else o instanceof Map||o instanceof WeakMap?a===s.length-1?o.set(c,t):(o.has(c)||o.set(c,{}),o=o.get(c)):typeof o=="object"&&c in o?a===s.length-1?l(o,c,t):o=o[c]:(o[c]=a===s.length-1?t:{},o=o[c]);else o[c]=a===s.length-1?t:{},o=o[c];}}return r}function W(r,e){return M(r)?Object.assign({},r,e):Object.assign({value:r,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},e)}(r=>typeof te<"u"?te:typeof Proxy<"u"?new Proxy(r,{get:(e,t)=>(typeof te<"u"?te:e)[t]}):r)(function(r){if(typeof te<"u")return te.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var he=class extends Event{constructor(e,t,i,s){super("context-request",{bubbles:true,composed:true}),this.context=e,this.contextTarget=t,this.callback=i,this.subscribe=s??false;}};var ye=class{constructor(e,t,i,s){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(o,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=o,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(o,n)),this.unsubscribe=n;},this.host=e,t.context!==void 0){let o=t;this.context=o.context,this.callback=o.callback,this.subscribe=o.subscribe??false;}else this.context=t,this.callback=i,this.subscribe=s??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new he(this.context,this.host,this.t,this.subscribe));}};function Lt({context:r,subscribe:e}){return (t,i)=>{typeof i=="object"?i.addInitializer(function(){new ye(this,{context:r,callback:s=>{t.set.call(this,s);},subscribe:e});}):t.constructor.addInitializer(s=>{new ye(s,{context:r,callback:o=>{s[i]=o;},subscribe:e});});}}var $r="autoform";var Vr=A`
    :host{
        display: flex;
        position: relative; 
        & > .autofield{
            display: flex;
            position: relative;
            flex-direction:column;
            background-color: var(--sl-color-neutral-0);        
            width:100%;        
            padding: calc(var(--auto-spacing) * 0.5);
            box-sizing: border-box;
            padding-right: 0px;
            &>.label{
                display: flex;   
                color: var(--auto-text-color);   
                padding: 4px; 
                font-weight: 600;                             
                &>.title{
                    font-size: var(--auto-font-size);
                    flex-grow: 1;
                    line-height: var(--auto-line-height);
                    &::after{
                        content: '：';                    
                    }
                }
            }    
            
            & .help{
                display: flex;
                align-items: center;
                font-size: calc(var(--auto-font-size) * 0.9);
                color: var(--auto-gray-color);
                padding:  calc(var(--auto-spacing) * 0.3) 0px;
            }    
        }
        
        & > .autofield:hover{
            background-color: var(--sl-color-gray-50);
        }

        sl-input::part(base){
            outline: none!important;
            box-shadow: none!important;
        }

        & sl-input::part(suffix) .action-widget{
            color: red;
        }
        & .action-widget.image{
            position: relative; 
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding:0px;
            border-left: 1px solid var(--sl-input-border-color);
            & img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        
    }
    /* 错误样式 */
    :host(.error){
        & > .autofield{
            color:red; 
            & sl-input::part(base){
                outline: none!important;
                box-shadow: none!important;
                border-color: red;
                color:red;
            }
            & sl-input::part(input){
                color:red;
            }
            & .error{
                display: flex;
                align-items: center;
                padding: 4px;                
                font-size: 0.8em;
                color:red;
            }
            & > .label > .title {
                color:red;
            }
            & .mark-err{
                border-color: red;
            }
        }
        
    } 
    :host(.left-label){
        & > .autofield{
            flex-direction:row;
            &>.label{                
                flex-shrink: 0;
            }
            &>.value{
                flex-grow: 1;
                display: flex;
                align-items: stretch;
                flex-direction: column;
                justify-content: center;
               
            }
        }
    }
    
    /* 禁用样式 */
    :host(.disable){
        & > .autofield{
            &>.label{
                color: var(--sl-color-gray-400);
                &>.title{
                    color: var(--sl-color-gray-400);
                }
            }           
            & sl-input::part(base),sl-input::part(input){
                color: var(--sl-color-gray-400);
                user-select: none;
                cursor: not-allowed;
                pointer-events: none;
            }
            & sl-textarea::part(textarea){
                color: var(--sl-color-gray-400);
                user-select: none;
                cursor: not-allowed;
                pointer-events: none;
            }
        }
        
    }
    /* 网格线 */
    :host(.grid){ 
        & > .autofield{ 
            padding: var(--auto-spacing);
        }
    } 
    :host(.viewonly){
        & > .autofield{
            &>.value{
                display:flex;
                align-items: center;
                justify-content: end; 
            }  
        }
    }

   
`;function Rr(r,e){if(!e)return r;let t=e.datatype||"any";if(t==="any")return r;if(t==="string")return r.toString();if(t==="number")return Number(r);if(typeof r=="string"){if(t==="boolean")return r.toLowerCase()==="true";if(t==="array")return r.split(",").map(i=>i.trim());if(t==="object")try{return JSON.parse(r)}catch{return {}}}return t==="boolean"?!!r:r}var O={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},U=r=>(...e)=>({_$litDirective$:r,values:e}),k=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i;}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:ss}=_r;var Dr=(r,e)=>r?._$litType$!==void 0;var kr=r=>r.strings===void 0,Pr=()=>document.createComment(""),be=(r,e,t)=>{let i=r._$AA.parentNode,s=e===void 0?r._$AB:e._$AA;if(t===void 0){let o=i.insertBefore(Pr(),s),n=i.insertBefore(Pr(),s);t=new ss(o,n,r,r.options);}else {let o=t._$AB.nextSibling,n=t._$AM,l=n!==r;if(l){let a;t._$AQ?.(r),t._$AM=r,t._$AP!==void 0&&(a=r._$AU)!==n._$AU&&t._$AP(a);}if(o!==s||l){let a=t._$AA;for(;a!==o;){let c=a.nextSibling;i.insertBefore(a,s),a=c;}}}return t},Z=(r,e,t=r)=>(r._$AI(e,t),r),os={},at=(r,e=os)=>r._$AH=e,Lr=r=>r._$AH,lt=r=>{r._$AP?.(false,true);let e=r._$AA,t=r._$AB.nextSibling;for(;e!==t;){let i=e.nextSibling;e.remove(),e=i;}};var Ir=(r,e,t)=>{let i=new Map;for(let s=e;s<=t;s++)i.set(r[s],s);return i},It=U(class extends k{constructor(r){if(super(r),r.type!==O.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);let s=[],o=[],n=0;for(let l of r)s[n]=i?i(l,n):n,o[n]=t(l,n),n++;return {values:o,keys:s}}render(r,e,t){return this.dt(r,e,t).values}update(r,[e,t,i]){let s=Lr(r),{values:o,keys:n}=this.dt(e,t,i);if(!Array.isArray(s))return this.ut=n,o;let l=this.ut??=[],a=[],c,u,h=0,g=s.length-1,f=0,v=o.length-1;for(;h<=g&&f<=v;)if(s[h]===null)h++;else if(s[g]===null)g--;else if(l[h]===n[f])a[f]=Z(s[h],o[f]),h++,f++;else if(l[g]===n[v])a[v]=Z(s[g],o[v]),g--,v--;else if(l[h]===n[v])a[v]=Z(s[h],o[v]),be(r,a[v+1],s[h]),h++,v--;else if(l[g]===n[f])a[f]=Z(s[g],o[f]),be(r,s[h],s[g]),g--,f++;else if(c===void 0&&(c=Ir(n,f,v),u=Ir(l,h,g)),c.has(l[h]))if(c.has(l[g])){let D=u.get(n[f]),ee=D!==void 0?s[D]:null;if(ee===null){let _=be(r,s[h]);Z(_,o[f]),a[f]=_;}else a[f]=Z(ee,o[f]),be(r,s[h],ee),s[D]=null;f++;}else lt(s[g]),g--;else lt(s[h]),h++;for(;f<=v;){let D=be(r,a[v+1]);Z(D,o[f]),a[f++]=D;}for(;h<=g;){let D=s[h++];D!==null&&lt(D);}return this.ut=n,at(r,a),S}});var ct=class{constructor(e){(this.host=e).addController(this);}hostConnected(){let e=this.host;e.hasAttribute("dark")&&(e.classList.add("sl-theme-dark"),e.style.color="var(--sl-color-neutral-900,white)",e.shadowRoot.ownerDocument.style=e.style.color);}_toDark(){let e=this.host;e.classList.add("sl-theme-dark"),e.style.color="var(--sl-color-neutral-900,white)";}_toLight(){let e=this.host;e.classList.remove("sl-theme-dark"),e.style.color="var(--sl-color-neutral-1000)";}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,grid:this.host.grid,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext(),this.host.dark?this._toDark():this._toLight();}};var jr="important",ns=" !"+jr,Mr=U(class extends k{constructor(r){if(super(r),r.type!==O.ATTRIBUTE||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{let i=r[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[e]){let{style:t}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(let i in e){let s=e[i];if(s!=null){this.ft.add(i);let o=typeof s=="string"&&s.endsWith(ns);i.includes("-")||o?t.setProperty(i,o?s.slice(0,-11):s,o?jr:""):t[i]=s;}}return S}});var J=r=>r??b;function ve(r,e,t){return r?e(r):t?.(r)}var ht=class{constructor(e,...t){this.initialClasses=[];(this.host=e).addController(this),this.initialClasses=t;}_forEachClasss(e,t){e&&e.forEach(i=>{typeof i=="string"?(t(i,true),this.host.classList.add(i)):Object.entries(i).forEach(([s,o])=>{t(s,o);});});}add(...e){this.host&&e&&this._forEachClasss(e,t=>{this.host.classList.add(t);});}remove(...e){this.host&&e&&this._forEachClasss(e,t=>{this.host.classList.remove(t);});}toggle(...e){this.host&&this._forEachClasss(e,t=>{this.host.classList.toggle(t);});}use(...e){this.host&&this._forEachClasss(e,(t,i)=>{i?this.host.classList.add(t):this.host.classList.remove(t);});}has(e){return this.host.classList.contains(e)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var Ie=class extends k{constructor(e){if(super(e),this.it=b,e.type!==O.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===b||e==null)return this._t=void 0,this.it=e;if(e===S)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Ie.directiveName="unsafeHTML",Ie.resultType=1;var Br=U(Ie);function Nr(){return {widget:"input",name:"",path:[],visible:W(true),enable:W(true),required:W(false),order:W(0),advanced:W(false),actions:W([])}}var P=class extends N{constructor(){super(...arguments);this.theme=new ct(this);this.classs=new ht(this);this.field=Nr();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this._subscribers=[];}static{this.styles=Vr;}getFieldOptions(){return Object.entries(this.schema||{}).reduce((t,[i,s])=>(["value","path","widget"].includes(i)?t[i]=s:M(s)?t[i]=Object.assign({},t[i],s):t[i]=Object.assign({},t[i],W(s)),t),Nr())}getPrefix(){}getSuffix(){}renderActions(){return d`${this.renderBeforeActions()}
                ${this.renderAfterActions()}`}_onClickAction(t){if(typeof t.onClick=="function")return i=>t.onClick.call(this,this.getInputValue(),{action:t,schema:this.schema,event:i,update:s=>{le(this.context.store.state,this.schema.path,s);}})}renderBeforeActions(){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return d`<div class="actions before" slot="prefix">
            ${It(this.beforeActions,t=>this.renderActionWidget(t))}</div>`}renderAfterActions(){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return d`<div class="actions after" slot="suffix">
            ${It(this.afterActions,t=>this.renderActionWidget(t))}</div>`}renderActionWidget(t){if(typeof t!="object")return;let i=t.type||"button";if(i!=="dropdown"){if(i==="button")return d`
            <sl-button class='action-widget' 
                title=${J(t.tips)}
                variant=${J(t.variant)}
                size=${t.size||this.context.size} 
                @click=${this._onClickAction.call(this,t)}>
                ${ve(t.icon,()=>d`<sl-icon name=${t.icon}></sl-icon>`)}
                ${t.label}
            </sl-button>
        `;if(i==="image")return d`
            <sl-button title="${J(t.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this,t)}>                
                <img src="${t.url}"/>
            </sl-button>
        `}}_renderSchemaOption(t,i){let s=this.field[t];if(s)return s.loading?d`<sl-spinner></sl-spinner>`:d`${i?i(s.value):s.value}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(t){return this.field.toView&&typeof this.field.toView.value=="function"?this.field.toView.value.call(this,t):t}toState(t){return this.field.toState&&typeof this.field.toState.value=="function"?this.field.toState.value.call(this,t):t}toInput(t){return this.field.toInput&&typeof this.field.toInput.value=="function"?this.field.toInput.value.call(this,t):t}getFieldOption(t,i){if(this.schema&&t in this.schema){let s=this.schema[t];return s===void 0?i:M(s)?s.value:s}else return i}getInputValue(){if(!this.input)return "";let t=this.schema?.datatype||"string",i=this.input.value;return t==="number"?i=Number(i):t==="boolean"&&(i=!!i),i}_renderRequiredOption(){return this._renderSchemaOption("required",t=>t?d`<span style='color:red;padding:2px;'>*</span>`:"")}renderHelp(){if(this.getFieldOption("help"))return d`<span class="help">
        <sl-icon name="help"></sl-icon>
        ${J(this.getFieldOption("help"))}
        </span>`}renderLabel(){let t=this.context,i=this.field.labelPos?.value||t.labelPos;if(i==="none")return d``;{let s={};return t.labelWidth&&i==="left"&&(s.width=t.labelWidth),d`<div class="label" style="${J(Mr(s))}">
            <span class="title">${this.getLabel()}${this._renderRequiredOption()}</span>            
        </div>`}}renderInput(){return d``}isShowError(){return this.context.showInitialError?!!this.invalidMessage:this.dirty?!!this.invalidMessage:false}renderError(){return this.isShowError()?d`<div class="error">
            ${this.invalidMessage}
        </div>`:d``}onFieldChange(t){this._updateFieldValue();}onFieldInput(t){this._updateFieldValue();}_handleSchemaChange(){let t=this.context;if(t&&t.store&&this.schema){let i=this.schema.path.join("_$_");this._subscribers.push(t.store.schemas.store.watch(i+".**",s=>{let{reply:o,type:n,value:l,flags:a}=s;if(o||t.form.seq===a)return;(n==="batch"?l:[s]).forEach(u=>{let h=u.path.length===2?[...u.path.slice(1),"value"]:u.path.slice(1);le(this.field,h,u.value);}),this.requestUpdate();},{operates:"write"}));}}renderView(){let t=this.value;if(this.field.toView&&this.field.toView.value)try{t=this.field.toView.value.call(this,this.value);}catch(i){console.error(`Error while toView<${this.path}>: ${i.message}`);}return d`${Br(String(t))}`}_handleStateChange(){let t=this.context;t&&t.store&&this.schema&&this._subscribers.push(t.store.watch(this.schema.path.join("."),i=>{this.value=this.toInput(i.value);},{operates:"write"}));}getStateValue(){return this.toInput(G(this.context.store.state,this.field.path))}connectedCallback(){super.connectedCallback();let t=this.context;t&&t.store&&this.schema&&(this.field=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.schema.path.join("."),this.name=this.schema.name||this.path,this.path in t.store.schemas.errors&&(this.invalidMessage=t.store.schemas.errors[this.path]),Array.isArray(this.schema.actions)&&(this.beforeActions=this.schema.actions.filter(i=>i.position==="before"),this.afterActions=this.schema.actions.filter(i=>i.position!=="before")));}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(t=>t.off());}getLabelPos(){return this.field.labelPos?.value||this.context.labelPos}getHelpPos(){return this.field.helpPos?.value||this.context.helpPos}_updateFieldValue(){if(!this.schema)return;let t=this.schema.path,i=this.getInputValue(),s=this.context;s.dirty=true,this.dirty=true;try{this.context.store.update(n=>{let l=this.toState(Rr(i,this.schema));le(n,t,l),this.invalidMessage=void 0;},{flags:s.form.seq});}catch(o){this.invalidMessage=o.message;}}renderValue(){return d`
            ${this.renderInput()}
            ${this.renderHelp()}                    
            ${this.renderError()} 
        `}render(){let t=this.context;return this.classs.use(t.size,{grid:t.grid,error:this.isShowError(),"left-label":t.labelPos==="left"||t.viewonly,"top-label":t.labelPos==="top"&&!t.viewonly,disable:this.field.enable.value===false,viewonly:t.viewonly,required:this.field.required.value===true,hidden:this.field.visible.value===false}),d`           
            <div class="autofield">
                ${this.field.divider?.value?d`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value">
                    ${ve(t.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>                            
            </div>
        `}};j([m({type:Object})],P.prototype,"schema",2),j([$()],P.prototype,"value",2),j([$()],P.prototype,"invalidMessage",2),j([$()],P.prototype,"labelPos",2),j([$()],P.prototype,"dirty",2),j([Ar({slot:"value",flatten:true})],P.prototype,"_field",2),j([V(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],P.prototype,"input",2),j([Lt({context:$r}),m({attribute:false})],P.prototype,"context",2);function Wr(r,e){Object.entries(e).forEach(([t,i])=>{r[t]===void 0&&(r[t]=W(i));});}var Ur=A`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`;var zr=A`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;var Hr=(r="value")=>(e,t)=>{let i=e.constructor,s=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(o,n,l){var a;let c=i.getPropertyOptions(r),u=typeof c.attribute=="string"?c.attribute:r;if(o===u){let h=c.converter||Y,f=(typeof h=="function"?h:(a=h?.fromAttribute)!=null?a:Y.fromAttribute)(l,c.type);this[r]!==f&&(this[t]=f);}s.call(this,o,n,l);};};var Fr=A`
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
`;var Kr=Object.defineProperty,as=Object.defineProperties,ls=Object.getOwnPropertyDescriptor,cs=Object.getOwnPropertyDescriptors,qr=Object.getOwnPropertySymbols,hs=Object.prototype.hasOwnProperty,ps=Object.prototype.propertyIsEnumerable;var Yr=r=>{throw TypeError(r)},Gr=(r,e,t)=>e in r?Kr(r,e,{enumerable:true,configurable:true,writable:true,value:t}):r[e]=t,L=(r,e)=>{for(var t in e||(e={}))hs.call(e,t)&&Gr(r,t,e[t]);if(qr)for(var t of qr(e))ps.call(e,t)&&Gr(r,t,e[t]);return r},pe=(r,e)=>as(r,cs(e)),p=(r,e,t,i)=>{for(var s=i>1?void 0:i?ls(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&Kr(e,t,s),s},Xr=(r,e,t)=>e.has(r)||Yr("Cannot "+t),Zr=(r,e,t)=>(Xr(r,e,"read from private field"),e.get(r)),Jr=(r,e,t)=>e.has(r)?Yr("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(r):e.set(r,t),Qr=(r,e,t,i)=>(Xr(r,e,"write to private field"),e.set(r,t),t);var je=new WeakMap,Me=new WeakMap,Be=new WeakMap,jt=new WeakSet,pt=new WeakMap,ei=class{constructor(r,e){this.handleFormData=t=>{let i=this.options.disabled(this.host),s=this.options.name(this.host),o=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!n&&typeof s=="string"&&s.length>0&&typeof o<"u"&&(Array.isArray(o)?o.forEach(l=>{t.formData.append(s,l.toString());}):t.formData.append(s,o.toString()));},this.handleFormSubmit=t=>{var i;let s=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=je.get(this.form))==null||i.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!s&&!o(this.host)&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),pt.set(this.host,[]);},this.handleInteraction=t=>{let i=pt.get(this.host);i.includes(t.type)||i.push(t.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let t=this.form.querySelectorAll("*");for(let i of t)if(typeof i.checkValidity=="function"&&!i.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let t=this.form.querySelectorAll("*");for(let i of t)if(typeof i.reportValidity=="function"&&!i.reportValidity())return  false}return  true},(this.host=r).addController(this),this.options=L({form:t=>{let i=t.form;if(i){let o=t.getRootNode().querySelector(`#${i}`);if(o)return o}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var i;return (i=t.disabled)!=null?i:false},reportValidity:t=>typeof t.reportValidity=="function"?t.reportValidity():true,checkValidity:t=>typeof t.checkValidity=="function"?t.checkValidity():true,setValue:(t,i)=>t.value=i,assumeInteractionOn:["sl-input"]},e);}hostConnected(){let r=this.options.form(this.host);r&&this.attachForm(r),pt.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction);});}hostDisconnected(){this.detachForm(),pt.delete(this.host),this.options.assumeInteractionOn.forEach(r=>{this.host.removeEventListener(r,this.handleInteraction);});}hostUpdated(){let r=this.options.form(this.host);r||this.detachForm(),r&&this.form!==r&&(this.detachForm(),this.attachForm(r)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(r){r?(this.form=r,je.has(this.form)?je.get(this.form).add(this.host):je.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Me.has(this.form)||(Me.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Be.has(this.form)||(Be.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let r=je.get(this.form);r&&(r.delete(this.host),r.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Me.has(this.form)&&(this.form.reportValidity=Me.get(this.form),Me.delete(this.form)),Be.has(this.form)&&(this.form.checkValidity=Be.get(this.form),Be.delete(this.form)),this.form=void 0));}setUserInteracted(r,e){e?jt.add(r):jt.delete(r),r.requestUpdate();}doAction(r,e){if(this.form){let t=document.createElement("button");t.type=r,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",e&&(t.name=e.name,t.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{e.hasAttribute(i)&&t.setAttribute(i,e.getAttribute(i));})),this.form.append(t),t.click(),t.remove();}}getForm(){var r;return (r=this.form)!=null?r:null}reset(r){this.doAction("reset",r);}submit(r){this.doAction("submit",r);}setValidity(r){let e=this.host,t=!!jt.has(e),i=!!e.required;e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!r),e.toggleAttribute("data-valid",r),e.toggleAttribute("data-user-invalid",!r&&t),e.toggleAttribute("data-user-valid",r&&t);}updateValidity(){let r=this.host;this.setValidity(r.validity.valid);}emitInvalidEvent(r){let e=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});r||e.preventDefault(),this.host.dispatchEvent(e)||r?.preventDefault();}},ti=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false});Object.freeze(pe(L({},ti),{valid:false,valueMissing:true}));Object.freeze(pe(L({},ti),{valid:false,customError:true}));var ri=class{constructor(r,...e){this.slotNames=[],this.handleSlotChange=t=>{let i=t.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate();},(this.host=r).addController(this),this.slotNames=e;}hasDefaultSlot(){return [...this.host.childNodes].some(r=>{if(r.nodeType===r.TEXT_NODE&&r.textContent.trim()!=="")return  true;if(r.nodeType===r.ELEMENT_NODE){let e=r;if(e.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!e.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(r){return this.host.querySelector(`:scope > [slot="${r}"]`)!==null}test(r){return r==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(r)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};var Mt="";function ii(r){Mt=r;}function si(r=""){if(!Mt){let e=[...document.getElementsByTagName("script")],t=e.find(i=>i.hasAttribute("data-shoelace"));if(t)ii(t.getAttribute("data-shoelace"));else {let i=e.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src)),s="";i&&(s=i.getAttribute("src")),ii(s.split("/").slice(0,-1).join("/"));}}return Mt.replace(/\/$/,"")+(r?`/${r.replace(/^\//,"")}`:"")}var us={name:"default",resolver:r=>si(`assets/icons/${r}.svg`)},oi=us;var ni={caret:`
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
  `},ds={name:"system",resolver:r=>r in ni?`data:image/svg+xml,${encodeURIComponent(ni[r])}`:""},ai=ds;var fs=[oi,ai],Bt=[];function li(r){Bt.push(r);}function ci(r){Bt=Bt.filter(e=>e!==r);}function Nt(r){return fs.find(e=>e.name===r)}var hi=A`
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
`;function T(r,e){let t=L({waitUntilFirstUpdate:false},e);return (i,s)=>{let{update:o}=i,n=Array.isArray(r)?r:[r];i.update=function(l){n.forEach(a=>{let c=a;if(l.has(c)){let u=l.get(c),h=this[c];u!==h&&(!t.waitUntilFirstUpdate||this.hasUpdated)&&this[s](u,h);}}),o.call(this,l);};}}var z=A`
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
`;var ut,R=class extends N{constructor(){super(),Jr(this,ut,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([r,e])=>{this.constructor.define(r,e);});}emit(r,e){let t=new CustomEvent(r,L({bubbles:true,cancelable:false,composed:true,detail:{}},e));return this.dispatchEvent(t),t}static define(r,e=this,t={}){let i=customElements.get(r);if(!i){try{customElements.define(r,e,t);}catch{customElements.define(r,class extends e{},t);}return}let s=" (unknown version)",o=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in i&&i.version&&(o=" v"+i.version),!(s&&o&&s===o)&&console.warn(`Attempted to register <${r}>${s}, but <${r}>${o} has already been registered.`);}attributeChangedCallback(r,e,t){Zr(this,ut)||(this.constructor.elementProperties.forEach((i,s)=>{i.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s]);}),Qr(this,ut,true)),super.attributeChangedCallback(r,e,t);}willUpdate(r){super.willUpdate(r),this.initialReflectedProperties.forEach((e,t)=>{r.has(t)&&this[t]==null&&(this[t]=e);});}};ut=new WeakMap;R.version="2.20.1";R.dependencies={};p([m()],R.prototype,"dir",2);p([m()],R.prototype,"lang",2);var Ne=Symbol(),dt=Symbol(),Wt,Ut=new Map,I=class extends R{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(r,e){var t;let i;if(e?.spriteSheet)return this.svg=d`<svg part="svg">
        <use part="use" href="${r}"></use>
      </svg>`,this.svg;try{if(i=await fetch(r,{mode:"cors"}),!i.ok)return i.status===410?Ne:dt}catch{return dt}try{let s=document.createElement("div");s.innerHTML=await i.text();let o=s.firstElementChild;if(((t=o?.tagName)==null?void 0:t.toLowerCase())!=="svg")return Ne;Wt||(Wt=new DOMParser);let l=Wt.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):Ne}catch{return Ne}}connectedCallback(){super.connectedCallback(),li(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),ci(this);}getIconSource(){let r=Nt(this.library);return this.name&&r?{url:r.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var r;let{url:e,fromLibrary:t}=this.getIconSource(),i=t?Nt(this.library):void 0;if(!e){this.svg=null;return}let s=Ut.get(e);if(s||(s=this.resolveIcon(e,i),Ut.set(e,s)),!this.initialRender)return;let o=await s;if(o===dt&&Ut.delete(e),e===this.getIconSource().url){if(Dr(o)){if(this.svg=o,i){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof i.mutator=="function"&&n&&i.mutator(n);}return}switch(o){case dt:case Ne:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(true),(r=i?.mutator)==null||r.call(i,this.svg),this.emit("sl-load");}}}render(){return this.svg}};I.styles=[z,hi];p([$()],I.prototype,"svg",2);p([m({reflect:true})],I.prototype,"name",2);p([m()],I.prototype,"src",2);p([m()],I.prototype,"label",2);p([m({reflect:true})],I.prototype,"library",2);p([T("label")],I.prototype,"handleLabelChange",1);p([T(["name","src","library"])],I.prototype,"setIcon",1);var _e=U(class extends k{constructor(r){if(super(r),r.type!==O.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return " "+Object.keys(r).filter(e=>r[e]).join(" ")+" "}update(r,[e]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let t=r.element.classList;for(let i of this.st)i in e||(t.remove(i),this.st.delete(i));for(let i in e){let s=!!e[i];s===this.st.has(i)||this.nt?.has(i)||(s?(t.add(i),this.st.add(i)):(t.remove(i),this.st.delete(i)));}return S}});var We=U(class extends k{constructor(r){if(super(r),r.type!==O.PROPERTY&&r.type!==O.ATTRIBUTE&&r.type!==O.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!kr(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===S||e===b)return e;let t=r.element,i=r.name;if(r.type===O.PROPERTY){if(e===t[i])return S}else if(r.type===O.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return S}else if(r.type===O.ATTRIBUTE&&t.getAttribute(i)===e+"")return S;return at(r),e}});var w=class extends R{constructor(){super(...arguments),this.formControlController=new ei(this,{value:r=>r.checked?r.value||"on":void 0,defaultValue:r=>r.defaultChecked,setValue:(r,e)=>r.checked=e}),this.hasSlotController=new ri(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(r){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(r);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(r){this.input.focus(r);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(r){this.input.setCustomValidity(r),this.formControlController.updateValidity();}render(){let r=this.hasSlotController.test("help-text"),e=this.helpText?true:!!r;return d`
      <div
        class=${_e({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${_e({checkbox:true,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${J(this.value)}
            .indeterminate=${We(this.indeterminate)}
            .checked=${We(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?d`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?d`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};w.styles=[z,Fr,zr];w.dependencies={"sl-icon":I};p([V('input[type="checkbox"]')],w.prototype,"input",2);p([$()],w.prototype,"hasFocus",2);p([m()],w.prototype,"title",2);p([m()],w.prototype,"name",2);p([m()],w.prototype,"value",2);p([m({reflect:true})],w.prototype,"size",2);p([m({type:Boolean,reflect:true})],w.prototype,"disabled",2);p([m({type:Boolean,reflect:true})],w.prototype,"checked",2);p([m({type:Boolean,reflect:true})],w.prototype,"indeterminate",2);p([Hr("checked")],w.prototype,"defaultChecked",2);p([m({reflect:true})],w.prototype,"form",2);p([m({type:Boolean,reflect:true})],w.prototype,"required",2);p([m({attribute:"help-text"})],w.prototype,"helpText",2);p([T("disabled",{waitUntilFirstUpdate:true})],w.prototype,"handleDisabledChange",1);p([T(["checked","indeterminate"],{waitUntilFirstUpdate:true})],w.prototype,"handleStateChange",1);var pi=A`
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
`;var zt=new Set,xe=new Map,ue,Ht="ltr",Ft="en",ui=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(ui){let r=new MutationObserver(di);Ht=document.documentElement.dir||"ltr",Ft=document.documentElement.lang||navigator.language,r.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function Ue(...r){r.map(e=>{let t=e.$code.toLowerCase();xe.has(t)?xe.set(t,Object.assign(Object.assign({},xe.get(t)),e)):xe.set(t,e),ue||(ue=e);}),di();}function di(){ui&&(Ht=document.documentElement.dir||"ltr",Ft=document.documentElement.lang||navigator.language),[...zt.keys()].map(r=>{typeof r.requestUpdate=="function"&&r.requestUpdate();});}var ft=class{constructor(e){this.host=e,this.host.addController(this);}hostConnected(){zt.add(this.host);}hostDisconnected(){zt.delete(this.host);}dir(){return `${this.host.dir||Ht}`.toLowerCase()}lang(){return `${this.host.lang||Ft}`.toLowerCase()}getTranslationData(e){var t,i;let s=new Intl.Locale(e.replace(/_/g,"-")),o=s?.language.toLowerCase(),n=(i=(t=s?.region)===null||t===void 0?void 0:t.toLowerCase())!==null&&i!==void 0?i:"",l=xe.get(`${o}-${n}`),a=xe.get(o);return {locale:s,language:o,region:n,primary:l,secondary:a}}exists(e,t){var i;let{primary:s,secondary:o}=this.getTranslationData((i=t.lang)!==null&&i!==void 0?i:this.lang());return t=Object.assign({includeFallback:false},t),!!(s&&s[e]||o&&o[e]||t.includeFallback&&ue&&ue[e])}term(e,...t){let{primary:i,secondary:s}=this.getTranslationData(this.lang()),o;if(i&&i[e])o=i[e];else if(s&&s[e])o=s[e];else if(ue&&ue[e])o=ue[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof o=="function"?o(...t):o}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var fi={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(r,e)=>`Go to slide ${r} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:r=>r===0?"No options selected":r===1?"1 option selected":`${r} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:r=>`Slide ${r}`,toggleColorFormat:"Toggle color format"};Ue(fi);var mi=fi;var Se=class extends ft{};Ue(mi);var qt=class extends R{constructor(){super(...arguments),this.localize=new Se(this);}render(){return d`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};qt.styles=[z,pi];var yi=new Map,ms=new WeakMap;function gs(r){return r??{keyframes:[],options:{duration:0}}}function gi(r,e){return e.toLowerCase()==="rtl"?{keyframes:r.rtlKeyframes||r.keyframes,options:r.options}:r}function Gt(r,e){yi.set(r,gs(e));}function Kt(r,e,t){let i=ms.get(r);if(i?.[e])return gi(i[e],t.dir);let s=yi.get(e);return s?gi(s,t.dir):{keyframes:[],options:{duration:0}}}function Yt(r,e,t){return new Promise(i=>{if(t?.duration===1/0)throw new Error("Promise-based animations must be finite.");let s=r.animate(e,pe(L({},t),{duration:ys()?0:t.duration}));s.addEventListener("cancel",i,{once:true}),s.addEventListener("finish",i,{once:true});})}function ys(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Xt(r){return Promise.all(r.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t);})))}function Zt(r,e){return r.map(t=>pe(L({},t),{height:t.height==="auto"?`${e}px`:t.height}))}var x=class Jt extends R{constructor(){super(...arguments),this.localize=new Se(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await Xt(this.childrenContainer);let{keyframes:e,options:t}=Kt(this,"tree-item.collapse",{dir:this.localize.dir()});await Yt(this.childrenContainer,Zt(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let e=this.parentElement;return !!e&&Jt.isTreeItem(e)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await Xt(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:e,options:t}=Kt(this,"tree-item.expand",{dir:this.localize.dir()});await Yt(this.childrenContainer,Zt(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:e=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(t=>Jt.isTreeItem(t)&&(e||!t.disabled)):[]}render(){let e=this.localize.dir()==="rtl",t=!this.loading&&(!this.isLeaf||this.lazy);return d`
      <div
        part="base"
        class="${_e({"tree-item":true,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":t,"tree-item--rtl":this.localize.dir()==="rtl"})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${_e({"tree-item__expand-button":true,"tree-item__expand-button--visible":t})}
            aria-hidden="true"
          >
            ${ve(this.loading,()=>d` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${ve(this.selectable,()=>d`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${We(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};x.styles=[z,Ur];x.dependencies={"sl-checkbox":w,"sl-icon":I,"sl-spinner":qt};p([$()],x.prototype,"indeterminate",2);p([$()],x.prototype,"isLeaf",2);p([$()],x.prototype,"loading",2);p([$()],x.prototype,"selectable",2);p([m({type:Boolean,reflect:true})],x.prototype,"expanded",2);p([m({type:Boolean,reflect:true})],x.prototype,"selected",2);p([m({type:Boolean,reflect:true})],x.prototype,"disabled",2);p([m({type:Boolean,reflect:true})],x.prototype,"lazy",2);p([V("slot:not([name])")],x.prototype,"defaultSlot",2);p([V("slot[name=children]")],x.prototype,"childrenSlot",2);p([V(".tree-item__item")],x.prototype,"itemElement",2);p([V(".tree-item__children")],x.prototype,"childrenContainer",2);p([V(".tree-item__expand-button slot")],x.prototype,"expandButtonSlot",2);p([T("loading",{waitUntilFirstUpdate:true})],x.prototype,"handleLoadingChange",1);p([T("disabled")],x.prototype,"handleDisabledChange",1);p([T("selected")],x.prototype,"handleSelectedChange",1);p([T("expanded",{waitUntilFirstUpdate:true})],x.prototype,"handleExpandedChange",1);p([T("expanded",{waitUntilFirstUpdate:true})],x.prototype,"handleExpandAnimation",1);p([T("lazy",{waitUntilFirstUpdate:true})],x.prototype,"handleLazyChange",1);var de=x;Gt("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Gt("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var bi=A`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;function vi(r,e,t){let i=s=>Object.is(s,-0)?0:s;return r<e?i(e):r>t?i(t):i(r)}function _i(r,e=false){function t(o){let n=o.getChildrenItems({includeDisabled:false});if(n.length){let l=n.every(c=>c.selected),a=n.every(c=>!c.selected&&!c.indeterminate);o.selected=l,o.indeterminate=!l&&!a;}}function i(o){let n=o.parentElement;de.isTreeItem(n)&&(t(n),i(n));}function s(o){for(let n of o.getChildrenItems())n.selected=e?o.selected||n.selected:!n.disabled&&o.selected,s(n);e&&t(o);}s(r),i(r);}var Q=class extends R{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new Se(this),this.initTreeItem=r=>{r.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{let t=r.querySelector(`[slot="${e}-icon"]`),i=this.getExpandButtonIcon(e);i&&(t===null?r.append(i):t.hasAttribute("data-default")&&t.replaceWith(i));});},this.handleTreeChanged=r=>{for(let e of r){let t=[...e.addedNodes].filter(de.isTreeItem),i=[...e.removedNodes].filter(de.isTreeItem);t.forEach(this.initTreeItem),this.lastFocusedItem&&i.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=r=>{let e=r.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0);},this.handleFocusIn=r=>{let e=r.target;r.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),de.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.mutationObserver)==null||r.disconnect();}getExpandButtonIcon(r){let t=(r==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(t){let i=t.cloneNode(true);return [i,...i.querySelectorAll("[id]")].forEach(s=>s.removeAttribute("id")),i.setAttribute("data-default",""),i.slot=`${r}-icon`,i}return null}selectItem(r){let e=[...this.selectedItems];if(this.selection==="multiple")r.selected=!r.selected,r.lazy&&(r.expanded=true),_i(r);else if(this.selection==="single"||r.isLeaf){let i=this.getAllTreeItems();for(let s of i)s.selected=s===r;}else this.selection==="leaf"&&(r.expanded=!r.expanded);let t=this.selectedItems;(e.length!==t.length||t.some(i=>!e.includes(i)))&&Promise.all(t.map(i=>i.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:t}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(r){r?.focus();}handleKeyDown(r){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(r.key)||r.composedPath().some(s=>{var o;return ["input","textarea"].includes((o=s?.tagName)==null?void 0:o.toLowerCase())}))return;let e=this.getFocusableItems(),t=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl";if(e.length>0){r.preventDefault();let s=e.findIndex(a=>a.matches(":focus")),o=e[s],n=a=>{let c=e[vi(a,0,e.length-1)];this.focusItem(c);},l=a=>{o.expanded=a;};r.key==="ArrowDown"?n(s+1):r.key==="ArrowUp"?n(s-1):t&&r.key==="ArrowRight"||i&&r.key==="ArrowLeft"?!o||o.disabled||o.expanded||o.isLeaf&&!o.lazy?n(s+1):l(true):t&&r.key==="ArrowLeft"||i&&r.key==="ArrowRight"?!o||o.disabled||o.isLeaf||!o.expanded?n(s-1):l(false):r.key==="Home"?n(0):r.key==="End"?n(e.length-1):(r.key==="Enter"||r.key===" ")&&(o.disabled||this.selectItem(o));}}handleClick(r){let e=r.target,t=e.closest("sl-tree-item"),i=r.composedPath().some(s=>{var o;return (o=s?.classList)==null?void 0:o.contains("tree-item__expand-button")});!t||t.disabled||e!==this.clickTarget||(i?t.expanded=!t.expanded:this.selectItem(t));}handleMouseDown(r){this.clickTarget=r.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let r=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",r?"true":"false");for(let t of e)t.selectable=r;r&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(t=>_i(t,true)));}get selectedItems(){let r=this.getAllTreeItems(),e=t=>t.selected;return r.filter(e)}getFocusableItems(){let r=this.getAllTreeItems(),e=new Set;return r.filter(t=>{var i;if(t.disabled)return  false;let s=(i=t.parentElement)==null?void 0:i.closest("[role=treeitem]");return s&&(!s.expanded||s.loading||e.has(s))&&e.add(t),!e.has(t)})}render(){return d`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};Q.styles=[z,bi];p([V("slot:not([name])")],Q.prototype,"defaultSlot",2);p([V("slot[name=expand-icon]")],Q.prototype,"expandedIconSlot",2);p([V("slot[name=collapse-icon]")],Q.prototype,"collapsedIconSlot",2);p([m()],Q.prototype,"selection",2);p([T("selection")],Q.prototype,"handleSelectionChange",1);Q.define("sl-tree");de.define("sl-tree-item");exports.AutoFieldTreeSelect=class ze extends P{constructor(){super(...arguments);this.nodes={};this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}connectedCallback(){if(super.connectedCallback(),this.field){this.idKey=this.field.idKey.value||"id",this.valueKey=this.field.valueKey.value||this.idKey,this.labelKey=this.field.labelKey.value||"label";let t=this.field.items.value;t&&(this.nodes=t,this._forEachTree((i,s,o,n)=>{o<1&&i.expanded===void 0&&(i.expanded=true),this.isItemSelected(i)&&(i.selected=true,this.selection.push({id:i[this.idKey],value:i[this.valueKey],path:n.join("/")}));}));}}isItemSelected(t){return this.value===void 0?false:this.schema.multiple===false?this.value===t[this.valueKey]:this.value.includes(t[this.valueKey])}getStateValue(){let t=super.getStateValue();return this.schema.multiple?Array.isArray(t)?t:[t]:t}_forEachTree(t){let i=(o,n,l,a)=>{let c=[...a,o[this.labelKey]];if(t(o,n,l,c),o.children){let u=l+1;o.children.forEach(h=>{i(h,o,u,[...c]);});}};(Array.isArray(this.nodes)?this.nodes:[this.nodes]).forEach(o=>{i(o,void 0,0,[]);});}_renderNode(t,i,s){let o=i.includes(t[this.valueKey]),n=[...s,t[this.labelKey]];return d`<sl-tree-item 
            data-id=${String(t[this.idKey])}
            data-value=${String(t[this.valueKey])}
            data-path=${n.join("/")}
            ?selected=${o}
            ?expanded=${t.expanded}
        >${t.label}        
        ${Array.isArray(t.children)?d`${t.children.map(l=>this._renderNode(l,i,n))}`:""}</sl-tree-item>`}_renderNodes(t){let i=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(t)?t.map(s=>this._renderNode(s,i,[])):this._renderNode(t,i,[])}getFieldOptions(){let t=super.getFieldOptions();return Wr(t,{multiple:false,idKey:"id",valueKey:"label",labelKey:"label",showAsPath:true,onlySelectLeaf:false}),t}onSelectionChange(t){let i=Array.from(t.detail.selection);i&&(this.selection=i.map(s=>({id:s.dataset.id,value:s.dataset.value,path:s.dataset.path})),this.schema&&typeof this.schema.onSelectionChange=="function"&&this.schema.onSelectionChange(this.selection),this.onFieldChange(t));}getInputValue(){return this.field.multiple.value?this.selection.map(t=>t.value):this.selection.length>0?this.selection[0].value:void 0}renderTree(){return d`
        <sl-tree 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}   
            size=${this.context.size}
            selection = "${this.field.onlySelectLeaf.value?"leaf":this.field.multiple.value?"multiple":"single"}"
            @sl-selection-change=${this.onSelectionChange.bind(this)}
        >${this._renderNodes(this.nodes)}</sl-tree> 
        `}renderInput(){return d`              
            ${this.renderTree()}
        `}};exports.AutoFieldTreeSelect.styles=[P.styles,A`
            sl-tree{
                padding: 0.2em;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
            }
    `],exports.AutoFieldTreeSelect=j([Sr("auto-field-tree-select")],exports.AutoFieldTreeSelect);/*! Bundled license information:

@lit-labs/ssr-dom-shim/lib/element-internals.js:
@lit-labs/ssr-dom-shim/lib/events.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/ssr-dom-shim/index.js:
@lit/reactive-element/node/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/node/decorators/custom-element.js:
@lit/reactive-element/node/decorators/property.js:
@lit/reactive-element/node/decorators/state.js:
@lit/reactive-element/node/decorators/event-options.js:
@lit/reactive-element/node/decorators/base.js:
@lit/reactive-element/node/decorators/query.js:
@lit/reactive-element/node/decorators/query-all.js:
@lit/reactive-element/node/decorators/query-async.js:
@lit/reactive-element/node/decorators/query-assigned-nodes.js:
@lit/context/lib/decorators/provide.js:
lit-html/node/directive.js:
lit-html/node/directives/repeat.js:
lit-html/node/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/is-server.js:
@lit/context/lib/decorators/consume.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/query-assigned-elements.js:
@lit/context/lib/context-request-event.js:
@lit/context/lib/create-context.js:
@lit/context/lib/controllers/context-consumer.js:
@lit/context/lib/value-notifier.js:
@lit/context/lib/controllers/context-provider.js:
@lit/context/lib/context-root.js:
lit-html/node/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/directive-helpers.js:
lit-html/node/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/directives/style-map.js:
lit-html/node/directives/if-defined.js:
lit-html/node/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/return exports;})({});