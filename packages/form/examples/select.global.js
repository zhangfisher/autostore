var AutoFieldSelect=(function(exports){'use strict';var so=Object.defineProperty;var oo=Object.getOwnPropertyDescriptor;var Lt=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var J=(e,t,r,i)=>{for(var s=i>1?void 0:i?oo(t,r):t,o=e.length-1,n;o>=0;o--)(n=e[o])&&(s=(i?n(t,r,s):n(s))||s);return i&&s&&so(t,r,s),s};var je=globalThis,Ve=je.trustedTypes,ii=Ve?Ve.createPolicy("lit-html",{createHTML:e=>e}):void 0,dr="$lit$",ft=`lit$${Math.random().toFixed(9).slice(2)}$`,fr="?"+ft,no=`<${fr}>`,It=je.document===void 0?{createTreeWalker:()=>({})}:document,le=()=>It.createComment(""),ce=e=>e===null||typeof e!="object"&&typeof e!="function",mr=Array.isArray,ci=e=>mr(e)||typeof e?.[Symbol.iterator]=="function",hr=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,si=/-->/g,oi=/>/g,kt=RegExp(`>|${hr}(?:([^\\s"'>=/]+)(${hr}*=${hr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ni=/'/g,ai=/"/g,pi=/^(?:script|style|textarea|title)$/i,gr=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),v=gr(1),M=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),li=new WeakMap,Mt=It.createTreeWalker(It,129);function di(e,t){if(!mr(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ii!==void 0?ii.createHTML(t):t}var fi=(e,t)=>{let r=e.length-1,i=[],s,o=t===2?"<svg>":t===3?"<math>":"",n=ae;for(let l=0;l<r;l++){let a=e[l],c,u,p=-1,f=0;for(;f<a.length&&(n.lastIndex=f,u=n.exec(a),u!==null);)f=n.lastIndex,n===ae?u[1]==="!--"?n=si:u[1]!==void 0?n=oi:u[2]!==void 0?(pi.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=kt):u[3]!==void 0&&(n=kt):n===kt?u[0]===">"?(n=s??ae,p=-1):u[1]===void 0?p=-2:(p=n.lastIndex-u[2].length,c=u[1],n=u[3]===void 0?kt:u[3]==='"'?ai:ni):n===ai||n===ni?n=kt:n===si||n===oi?n=ae:(n=kt,s=void 0);let h=n===kt&&e[l+1].startsWith("/>")?" ":"";o+=n===ae?a+no:p>=0?(i.push(c),a.slice(0,p)+dr+a.slice(p)+ft+h):a+ft+(p===-2?l:h);}return [di(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},pe=class e{constructor({strings:t,_$litType$:r},i){let s;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[c,u]=fi(t,r);if(this.el=e.createElement(c,i),Mt.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes);}for(;(s=Mt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(dr)){let f=u[n++],h=s.getAttribute(p).split(ft),m=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:m[2],strings:h,ctor:m[1]==="."?Le:m[1]==="?"?ke:m[1]==="@"?Me:Bt}),s.removeAttribute(p);}else p.startsWith(ft)&&(a.push({type:6,index:o}),s.removeAttribute(p));if(pi.test(s.tagName)){let p=s.textContent.split(ft),f=p.length-1;if(f>0){s.textContent=Ve?Ve.emptyScript:"";for(let h=0;h<f;h++)s.append(p[h],le()),Mt.nextNode(),a.push({type:2,index:++o});s.append(p[f],le());}}}else if(s.nodeType===8)if(s.data===fr)a.push({type:2,index:o});else {let p=-1;for(;(p=s.data.indexOf(ft,p+1))!==-1;)a.push({type:7,index:o}),p+=ft.length-1;}o++;}}static createElement(t,r){let i=It.createElement("template");return i.innerHTML=t,i}};function jt(e,t,r=e,i){if(t===M)return t;let s=i!==void 0?r._$Co?.[i]:r._$Cl,o=ce(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(false),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,i)),i!==void 0?(r._$Co??=[])[i]=s:r._$Cl=s),s!==void 0&&(t=jt(e,s._$AS(e,t.values),s,i)),t}var De=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:i}=this._$AD,s=(t?.creationScope??It).importNode(r,true);Mt.currentNode=s;let o=Mt.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new Zt(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Ie(o,this,t)),this._$AV.push(c),a=i[++l];}n!==a?.index&&(o=Mt.nextNode(),n++);}return Mt.currentNode=It,s}p(t){let r=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,r),r+=i.strings.length-2):i._$AI(t[r])),r++;}},Zt=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,i,s){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=jt(this,t,r),ce(t)?t===E||t==null||t===""?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ci(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&ce(this._$AH)?this._$AA.nextSibling.data=t:this.T(It.createTextNode(t)),this._$AH=t;}$(t){let{values:r,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=pe.createElement(di(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(r);else {let o=new De(s,this),n=o.u(this.options);o.p(r),this.T(n),this._$AH=o;}}_$AC(t){let r=li.get(t.strings);return r===void 0&&li.set(t.strings,r=new pe(t)),r}k(t){mr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,i,s=0;for(let o of t)s===r.length?r.push(i=new e(this.O(le()),this.O(le()),this,this.options)):i=r[s],i._$AI(o),s++;s<r.length&&(this._$AR(i&&i._$AB.nextSibling,s),r.length=s);}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(false,true,r);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i;}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t));}},Bt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,i,s,o){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E;}_$AI(t,r=this,i,s){let o=this.strings,n=false;if(o===void 0)t=jt(this,t,r,0),n=!ce(t)||t!==this._$AH&&t!==M,n&&(this._$AH=t);else {let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=jt(this,l[i+a],r,a),c===M&&(c=this._$AH[a]),n||=!ce(c)||c!==this._$AH[a],c===E?t=E:t!==E&&(t+=(c??"")+o[a+1]),this._$AH[a]=c;}n&&!s&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}},Le=class extends Bt{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}},ke=class extends Bt{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}},Me=class extends Bt{constructor(t,r,i,s,o){super(t,r,i,s,o),this.type=5;}_$AI(t,r=this){if((t=jt(this,t,r,0)??E)===M)return;let i=this._$AH,s=t===E&&i!==E||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==E&&(i===E||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}},Ie=class{constructor(t,r,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i;}get _$AU(){return this._$AM._$AU}_$AI(t){jt(this,t);}},mi={I:Zt},ao=je.litHtmlPolyfillSupport;ao?.(pe,Zt),(je.litHtmlVersions??=[]).push("3.3.0");var gi=(e,t,r)=>{let i=r?.renderBefore??t,s=i._$litPart$;if(s===void 0){let o=r?.renderBefore??null;i._$litPart$=s=new Zt(t.insertBefore(le(),o),o,void 0,r??{});}return s._$AI(e),s};var P=e=>e??E;var yi=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=t;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var lt=function(e,t,r,i,s){if(typeof t=="function"?e!==t||true:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(e,r),r},V=function(e,t,r,i){if(typeof t=="function"?e!==t||true:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?i:r==="a"?i.call(e):i?i.value:t.get(e)},Jt,Be,ze,ue,yr,he,We,zt,de,At,He,bi,vi=e=>typeof e=="boolean"?e:e?.capture??false;var lo=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(t,r,i){if(r==null)return;let s=vi(i)?this.__captureEventListeners:this.__eventListeners,o=s.get(t);if(o===void 0)o=new Map,s.set(t,o);else if(o.has(r))return;let n=typeof i=="object"&&i?i:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(t,r,i)),o.set(r,n??{});}removeEventListener(t,r,i){if(r==null)return;let s=vi(i)?this.__captureEventListeners:this.__eventListeners,o=s.get(t);o!==void 0&&(o.delete(r),o.size||s.delete(t));}dispatchEvent(t){let r=[this],i=this.__eventTargetParent;if(t.composed)for(;i;)r.push(i),i=i.__eventTargetParent;else for(;i&&i!==this.__host;)r.push(i),i=i.__eventTargetParent;let s=false,o=false,n=0,l=null,a=null,c=null,u=t.stopPropagation,p=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get(){return l??a},...A},srcElement:{get(){return t.target},...A},currentTarget:{get(){return c},...A},eventPhase:{get(){return n},...A},composedPath:{value:()=>r,...A},stopPropagation:{value:()=>{s=true,u.call(t);},...A},stopImmediatePropagation:{value:()=>{o=true,p.call(t);},...A}});let f=(y,x,S)=>{typeof y=="function"?y(t):typeof y?.handleEvent=="function"&&y.handleEvent(t),x.once&&S.delete(y);},h=()=>(c=null,n=0,!t.defaultPrevented),m=r.slice().reverse();l=!this.__host||!t.composed?this:null;let b=y=>{for(a=this;a.__host&&y.includes(a.__host);)a=a.__host;};for(let y of m){!l&&(!a||a===y.__host)&&b(m.slice(m.indexOf(y))),c=y,n=y===t.target?2:1;let x=y.__captureEventListeners.get(t.type);if(x){for(let[S,O]of x)if(f(S,O,x),o)return h()}if(s)return h()}let _=t.bubbles?r:[this];a=null;for(let y of _){!l&&(!a||y===a.__host)&&b(_.slice(0,_.indexOf(y)+1)),c=y,n=y===t.target?2:3;let x=y.__eventListeners.get(t.type);if(x){for(let[S,O]of x)if(f(S,O,x),o)return h()}if(s)return h()}return h()}},br=lo;var A={__proto__:null};A.enumerable=true;Object.freeze(A);var vr=(At=class{constructor(t,r={}){if(Jt.set(this,false),Be.set(this,false),ze.set(this,false),ue.set(this,false),yr.set(this,Date.now()),he.set(this,false),We.set(this,void 0),zt.set(this,void 0),de.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof r!="object"||!r)throw new Error('The "options" argument must be an object');let{bubbles:i,cancelable:s,composed:o}=r;lt(this,Jt,!!s),lt(this,Be,!!i),lt(this,ze,!!o),lt(this,We,`${t}`),lt(this,zt,null),lt(this,de,false);}initEvent(t,r,i){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){lt(this,ue,true);}get target(){return V(this,zt,"f")}get currentTarget(){return V(this,zt,"f")}get srcElement(){return V(this,zt,"f")}get type(){return V(this,We,"f")}get cancelable(){return V(this,Jt,"f")}get defaultPrevented(){return V(this,Jt,"f")&&V(this,ue,"f")}get timeStamp(){return V(this,yr,"f")}composedPath(){return V(this,de,"f")?[V(this,zt,"f")]:[]}get returnValue(){return !V(this,Jt,"f")||!V(this,ue,"f")}get bubbles(){return V(this,Be,"f")}get composed(){return V(this,ze,"f")}get eventPhase(){return V(this,de,"f")?At.AT_TARGET:At.NONE}get cancelBubble(){return V(this,he,"f")}set cancelBubble(t){t&&lt(this,he,true);}stopPropagation(){lt(this,he,true);}get isTrusted(){return  false}},Jt=new WeakMap,Be=new WeakMap,ze=new WeakMap,ue=new WeakMap,yr=new WeakMap,he=new WeakMap,We=new WeakMap,zt=new WeakMap,de=new WeakMap,At.NONE=0,At.CAPTURING_PHASE=1,At.AT_TARGET=2,At.BUBBLING_PHASE=3,At);Object.defineProperties(vr.prototype,{initEvent:A,stopImmediatePropagation:A,preventDefault:A,target:A,currentTarget:A,srcElement:A,type:A,cancelable:A,defaultPrevented:A,timeStamp:A,composedPath:A,returnValue:A,bubbles:A,composed:A,eventPhase:A,cancelBubble:A,stopPropagation:A,isTrusted:A});var _i=(bi=class extends vr{constructor(t,r={}){super(t,r),He.set(this,void 0),lt(this,He,r?.detail??null);}initCustomEvent(t,r,i,s){throw new Error("Method not implemented.")}get detail(){return V(this,He,"f")}},He=new WeakMap,bi);Object.defineProperties(_i.prototype,{detail:A});var _r=vr,xr=_i;globalThis.Event??=_r;globalThis.CustomEvent??=xr;var xi=new WeakMap,fe=e=>{let t=xi.get(e);return t===void 0&&xi.set(e,t=new Map),t},co=class extends br{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(fe(this)).map(([t,r])=>({name:t,value:r}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,r){fe(this).set(t,String(r));}removeAttribute(t){fe(this).delete(t);}toggleAttribute(t,r){if(this.hasAttribute(t)){if(r===void 0||!r)return this.removeAttribute(t),false}else return r===void 0||r?(this.setAttribute(t,""),true):false;return  true}hasAttribute(t){return fe(this).has(t)}attachShadow(t){let r={host:this};return this.__shadowRootMode=t.mode,t&&t.mode==="open"&&(this.__shadowRoot=r),r}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let t=new yi(this);return this.__internals=t,t}getAttribute(t){return fe(this).get(t)??null}};var po=class extends co{},wr=po;globalThis.litServerRoot??=Object.defineProperty(new wr,"localName",{get(){return "lit-server-root"}});var uo=class{constructor(){this.__definitions=new Map;}define(t,r){if(this.__definitions.has(t))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);r.__localName=t,this.__definitions.set(t,{ctor:r,observedAttributes:r.observedAttributes??[]});}get(t){return this.__definitions.get(t)?.ctor}},ho=uo;var wi=new ho;var me=globalThis,Fe=me.ShadowRoot&&(me.ShadyCSS===void 0||me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Sr=Symbol(),Si=new WeakMap,ge=class{constructor(t,r,i){if(this._$cssResult$=true,i!==Sr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r;}get styleSheet(){let t=this.o,r=this.t;if(Fe&&t===void 0){let i=r!==void 0&&r.length===1;i&&(t=Si.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Si.set(r,t));}return t}toString(){return this.cssText}},Ai=e=>new ge(typeof e=="string"?e:e+"",void 0,Sr),R=(e,...t)=>{let r=e.length===1?e[0]:t.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new ge(r,e,Sr)},Ci=(e,t)=>{if(Fe)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(let r of t){let i=document.createElement("style"),s=me.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=r.cssText,e.appendChild(i);}},Ar=Fe||me.CSSStyleSheet===void 0?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(let i of t.cssRules)r+=i.cssText;return Ai(r)})(e):e;var{is:fo,defineProperty:mo,getOwnPropertyDescriptor:go,getOwnPropertyNames:yo,getOwnPropertySymbols:bo,getPrototypeOf:vo}=Object,ve=globalThis;ve.customElements??=wi;var Ei=ve.trustedTypes,_o=Ei?Ei.emptyScript:"",xo=ve.reactiveElementPolyfillSupport,ye=(e,t)=>e,be={toAttribute(e,t){switch(t){case Boolean:e=e?_o:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e);}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e);}catch{r=null;}}return r}},Ne=(e,t)=>!fo(e,t),Oi={attribute:true,type:String,converter:be,reflect:false,useDefault:false,hasChanged:Ne};Symbol.metadata??=Symbol("metadata"),ve.litPropertyMetadata??=new WeakMap;var mt=class extends(globalThis.HTMLElement??wr){static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=Oi){if(r.state&&(r.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=true),this.elementProperties.set(t,r),!r.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,r);s!==void 0&&mo(this.prototype,t,s);}}static getPropertyDescriptor(t,r,i){let{get:s,set:o}=go(this.prototype,t)??{get(){return this[r]},set(n){this[r]=n;}};return {get:s,set(n){let l=s?.call(this);o?.call(this,n),this.requestUpdate(t,l,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??Oi}static _$Ei(){if(this.hasOwnProperty(ye("elementProperties")))return;let t=vo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(ye("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(ye("properties"))){let r=this.properties,i=[...yo(r),...bo(r)];for(let s of i)this.createProperty(s,r[s]);}let t=this[Symbol.metadata];if(t!==null){let r=litPropertyMetadata.get(t);if(r!==void 0)for(let[i,s]of r)this.elementProperties.set(i,s);}this._$Eh=new Map;for(let[r,i]of this.elementProperties){let s=this._$Eu(r,i);s!==void 0&&this._$Eh.set(s,r);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)r.unshift(Ar(s));}else t!==void 0&&r.push(Ar(t));return r}static _$Eu(t,r){let i=r.attribute;return i===false?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){let t=new Map,r=this.constructor.elementProperties;for(let i of r.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ci(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,r,i){this._$AK(t,i);}_$ET(t,r){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===true){let o=(i.converter?.toAttribute!==void 0?i.converter:be).toAttribute(r,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null;}}_$AK(t,r){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:be;this._$Em=s,this[s]=n.fromAttribute(r,o.type)??this._$Ej?.get(s)??null,this._$Em=null;}}requestUpdate(t,r,i){if(t!==void 0){let s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??Ne)(o,r)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,r,i);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(t,r,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??r??this[t]),o!==true||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(r=void 0),this._$AL.set(t,r)),s===true&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(r){Promise.reject(r);}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0;}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:n}=o,l=this[s];n!==true||this._$AL.has(s)||l===void 0||this.C(s,void 0,o,l);}}let t=false,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(r)):this._$EM();}catch(i){throw t=false,this._$EM(),i}t&&this._$AE(r);}willUpdate(t){}_$AE(t){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM();}updated(t){}firstUpdated(t){}};mt.elementStyles=[],mt.shadowRootOptions={mode:"open"},mt[ye("elementProperties")]=new Map,mt[ye("finalized")]=new Map,xo?.({ReactiveElement:mt}),(ve.reactiveElementVersions??=[]).push("2.1.0");var Cr=globalThis,ct=class extends mt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gi(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return M}};ct._$litElement$=true,ct.finalized=true,Cr.litElementHydrateSupport?.({LitElement:ct});var wo=Cr.litElementPolyfillSupport;wo?.({LitElement:ct});(Cr.litElementVersions??=[]).push("4.2.0");var Ti=e=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,t);}):customElements.define(e,t);};var So={attribute:true,type:String,converter:be,reflect:false,hasChanged:Ne},Ao=(e=So,t,r)=>{let{kind:i,metadata:s}=r,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=true),o.set(r.name,e),i==="accessor"){let{name:n}=r;return {set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,e);},init(l){return l!==void 0&&this.C(n,void 0,e,l),l}}}if(i==="setter"){let{name:n}=r;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,e);}}throw Error("Unsupported decorator location: "+i)};function g(e){return (t,r)=>typeof r=="object"?Ao(e,t,r):((i,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,r)}function $(e){return g({...e,state:true,attribute:false})}var Ct=(e,t,r)=>(r.configurable=true,r.enumerable=true,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);function I(e,t){return (r,i,s)=>{let o=n=>n.renderRoot?.querySelector(e)??null;return Ct(r,i,{get(){return o(this)}})}}function $i(e){return (t,r)=>{let{slot:i,selector:s}=e??{},o="slot"+(i?`[name=${i}]`:":not([name])");return Ct(t,r,{get(){let n=this.renderRoot?.querySelector(o),l=n?.assignedElements(e)??[];return s===void 0?l:l.filter(a=>a.matches(s))}})}}var L=".";var Or="__AS_ASYNC_COMPUTED_VALUE__";function qe(e){return toString.call(e)==="[object Map]"}function Q(e){return e&&typeof e=="object"&&e.hasOwnProperty(Or)}function $r(e,t){let r=e.get(t);if(r!==void 0)return r;let i=e.get(Number(t)||t);if(i!==void 0)return i}function gt(e,t,r){if(!t||t.length===0)return e;let i=Array.isArray(t)?t:t.split(L),s,o=e;for(let n=0;n<i.length;n++){let l=i[n];if(qe(o))s=$r(o,l);else if(l in o)s=o[l];else return r;o=s;}return s}function Wt(e,t,r,i){if(!t||!e)return e;let s=t;if(s.length===0)return typeof e=="object"&&Object.assign(e,r),e;{let o=e,n=[],l=(a,c,u)=>{a[c]=u;};for(let a=0;a<s.length;a++){let c=s[a];if(n.push(c),o)if(Array.isArray(o)){let u=parseInt(c,10);if(Number.isNaN(u)||u<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);a===s.length-1?l(o,u,r):o=o[u];}else o instanceof Map||o instanceof WeakMap?a===s.length-1?o.set(c,r):(o.has(c)||o.set(c,{}),o=o.get(c)):typeof o=="object"&&c in o?a===s.length-1?l(o,c,r):o=o[c]:(o[c]=a===s.length-1?r:{},o=o[c]);else o[c]=a===s.length-1?r:{},o=o[c];}}return e}function Et(e,t){return Q(e)?Object.assign({},e,t):Object.assign({value:e,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},t)}(e=>typeof Lt<"u"?Lt:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof Lt<"u"?Lt:t)[r]}):e)(function(e){if(typeof Lt<"u")return Lt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var Ft=class extends Event{constructor(t,r,i,s){super("context-request",{bubbles:true,composed:true}),this.context=t,this.contextTarget=r,this.callback=i,this.subscribe=s??false;}};var te=class{constructor(t,r,i,s){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(o,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=o,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(o,n)),this.unsubscribe=n;},this.host=t,r.context!==void 0){let o=r;this.context=o.context,this.callback=o.callback,this.subscribe=o.subscribe??false;}else this.context=r,this.callback=i,this.subscribe=s??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new Ft(this.context,this.host,this.t,this.subscribe));}};function Rr({context:e,subscribe:t}){return (r,i)=>{typeof i=="object"?i.addInitializer(function(){new te(this,{context:e,callback:s=>{r.set.call(this,s);},subscribe:t});}):r.constructor.addInitializer(s=>{new te(s,{context:e,callback:o=>{s[i]=o;},subscribe:t});});}}var ki="autoform";var Mi=R`
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

   
`;function Ii(e,t){if(!t)return e;let r=t.datatype||"any";if(r==="any")return e;if(r==="string")return e.toString();if(r==="number")return Number(e);if(typeof e=="string"){if(r==="boolean")return e.toLowerCase()==="true";if(r==="array")return e.split(",").map(i=>i.trim());if(r==="object")try{return JSON.parse(e)}catch{return {}}}return r==="boolean"?!!e:e}var Ot={ATTRIBUTE:1,CHILD:2},Tt=e=>(...t)=>({_$litDirective$:e,values:t}),pt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,i){this._$Ct=t,this._$AM=r,this._$Ci=i;}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var{I:Ho}=mi;var Bi=(e,t)=>e?._$litType$!==void 0;var ji=()=>document.createComment(""),ee=(e,t,r)=>{let i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(r===void 0){let o=i.insertBefore(ji(),s),n=i.insertBefore(ji(),s);r=new Ho(o,n,e,e.options);}else {let o=r._$AB.nextSibling,n=r._$AM,l=n!==e;if(l){let a;r._$AQ?.(e),r._$AM=e,r._$AP!==void 0&&(a=e._$AU)!==n._$AU&&r._$AP(a);}if(o!==s||l){let a=r._$AA;for(;a!==o;){let c=a.nextSibling;i.insertBefore(a,s),a=c;}}}return r},$t=(e,t,r=e)=>(e._$AI(t,r),e),Fo={},zi=(e,t=Fo)=>e._$AH=t,Wi=e=>e._$AH,Ye=e=>{e._$AP?.(false,true);let t=e._$AA,r=e._$AB.nextSibling;for(;t!==r;){let i=t.nextSibling;t.remove(),t=i;}};var Hi=(e,t,r)=>{let i=new Map;for(let s=t;s<=r;s++)i.set(e[s],s);return i},Vr=Tt(class extends pt{constructor(e){if(super(e),e.type!==Ot.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let i;r===void 0?r=t:t!==void 0&&(i=t);let s=[],o=[],n=0;for(let l of e)s[n]=i?i(l,n):n,o[n]=r(l,n),n++;return {values:o,keys:s}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,i]){let s=Wi(e),{values:o,keys:n}=this.dt(t,r,i);if(!Array.isArray(s))return this.ut=n,o;let l=this.ut??=[],a=[],c,u,p=0,f=s.length-1,h=0,m=o.length-1;for(;p<=f&&h<=m;)if(s[p]===null)p++;else if(s[f]===null)f--;else if(l[p]===n[h])a[h]=$t(s[p],o[h]),p++,h++;else if(l[f]===n[m])a[m]=$t(s[f],o[m]),f--,m--;else if(l[p]===n[m])a[m]=$t(s[p],o[m]),ee(e,a[m+1],s[p]),p++,m--;else if(l[f]===n[h])a[h]=$t(s[f],o[h]),ee(e,s[p],s[f]),f--,h++;else if(c===void 0&&(c=Hi(n,h,m),u=Hi(l,p,f)),c.has(l[p]))if(c.has(l[f])){let b=u.get(n[h]),_=b!==void 0?s[b]:null;if(_===null){let y=ee(e,s[p]);$t(y,o[h]),a[h]=y;}else a[h]=$t(_,o[h]),ee(e,s[p],_),s[b]=null;h++;}else Ye(s[f]),f--;else Ye(s[p]),p++;for(;h<=m;){let b=ee(e,a[m+1]);$t(b,o[h]),a[h++]=b;}for(;p<=f;){let b=s[p++];b!==null&&Ye(b);}return this.ut=n,zi(e,a),M}});var Xe=class{constructor(t){(this.host=t).addController(this);}hostConnected(){let t=this.host;t.hasAttribute("dark")&&(t.classList.add("sl-theme-dark"),t.style.color="var(--sl-color-neutral-900,white)",t.shadowRoot.ownerDocument.style=t.style.color);}_toDark(){let t=this.host;t.classList.add("sl-theme-dark"),t.style.color="var(--sl-color-neutral-900,white)";}_toLight(){let t=this.host;t.classList.remove("sl-theme-dark"),t.style.color="var(--sl-color-neutral-1000)";}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,grid:this.host.grid,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext(),this.host.dark?this._toDark():this._toLight();}};var Fi="important",No=" !"+Fi,Ni=Tt(class extends pt{constructor(e){if(super(e),e.type!==Ot.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,r)=>{let i=e[r];return i==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(e,[t]){let{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?r.removeProperty(i):r[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let o=typeof s=="string"&&s.endsWith(No);i.includes("-")||o?r.setProperty(i,o?s.slice(0,-11):s,o?Fi:""):r[i]=s;}}return M}});function Dr(e,t,r){return e?t(e):r?.(e)}var Ze=class{constructor(t,...r){this.initialClasses=[];(this.host=t).addController(this),this.initialClasses=r;}_forEachClasss(t,r){t&&t.forEach(i=>{typeof i=="string"?(r(i,true),this.host.classList.add(i)):Object.entries(i).forEach(([s,o])=>{r(s,o);});});}add(...t){this.host&&t&&this._forEachClasss(t,r=>{this.host.classList.add(r);});}remove(...t){this.host&&t&&this._forEachClasss(t,r=>{this.host.classList.remove(r);});}toggle(...t){this.host&&this._forEachClasss(t,r=>{this.host.classList.toggle(r);});}use(...t){this.host&&this._forEachClasss(t,(r,i)=>{i?this.host.classList.add(r):this.host.classList.remove(r);});}has(t){return this.host.classList.contains(t)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var _e=class extends pt{constructor(t){if(super(t),this.it=E,t.type!==Ot.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===E||t==null)return this._t=void 0,this.it=t;if(t===M)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};_e.directiveName="unsafeHTML",_e.resultType=1;var Je=Tt(_e);function Ui(){return {widget:"input",name:"",path:[],visible:Et(true),enable:Et(true),required:Et(false),order:Et(0),advanced:Et(false),actions:Et([])}}var U=class extends ct{constructor(){super(...arguments);this.theme=new Xe(this);this.classs=new Ze(this);this.field=Ui();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this._subscribers=[];}static{this.styles=Mi;}getFieldOptions(){return Object.entries(this.schema||{}).reduce((r,[i,s])=>(["value","path","widget"].includes(i)?r[i]=s:Q(s)?r[i]=Object.assign({},r[i],s):r[i]=Object.assign({},r[i],Et(s)),r),Ui())}getPrefix(){}getSuffix(){}renderActions(){return v`${this.renderBeforeActions()}
                ${this.renderAfterActions()}`}_onClickAction(r){if(typeof r.onClick=="function")return i=>r.onClick.call(this,this.getInputValue(),{action:r,schema:this.schema,event:i,update:s=>{Wt(this.context.store.state,this.schema.path,s);}})}renderBeforeActions(){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return v`<div class="actions before" slot="prefix">
            ${Vr(this.beforeActions,r=>this.renderActionWidget(r))}</div>`}renderAfterActions(){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return v`<div class="actions after" slot="suffix">
            ${Vr(this.afterActions,r=>this.renderActionWidget(r))}</div>`}renderActionWidget(r){if(typeof r!="object")return;let i=r.type||"button";if(i!=="dropdown"){if(i==="button")return v`
            <sl-button class='action-widget' 
                title=${P(r.tips)}
                variant=${P(r.variant)}
                size=${r.size||this.context.size} 
                @click=${this._onClickAction.call(this,r)}>
                ${Dr(r.icon,()=>v`<sl-icon name=${r.icon}></sl-icon>`)}
                ${r.label}
            </sl-button>
        `;if(i==="image")return v`
            <sl-button title="${P(r.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this,r)}>                
                <img src="${r.url}"/>
            </sl-button>
        `}}_renderSchemaOption(r,i){let s=this.field[r];if(s)return s.loading?v`<sl-spinner></sl-spinner>`:v`${i?i(s.value):s.value}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(r){return this.field.toView&&typeof this.field.toView.value=="function"?this.field.toView.value.call(this,r):r}toState(r){return this.field.toState&&typeof this.field.toState.value=="function"?this.field.toState.value.call(this,r):r}toInput(r){return this.field.toInput&&typeof this.field.toInput.value=="function"?this.field.toInput.value.call(this,r):r}getFieldOption(r,i){if(this.schema&&r in this.schema){let s=this.schema[r];return s===void 0?i:Q(s)?s.value:s}else return i}getInputValue(){if(!this.input)return "";let r=this.schema?.datatype||"string",i=this.input.value;return r==="number"?i=Number(i):r==="boolean"&&(i=!!i),i}_renderRequiredOption(){return this._renderSchemaOption("required",r=>r?v`<span style='color:red;padding:2px;'>*</span>`:"")}renderHelp(){if(this.getFieldOption("help"))return v`<span class="help">
        <sl-icon name="help"></sl-icon>
        ${P(this.getFieldOption("help"))}
        </span>`}renderLabel(){let r=this.context,i=this.field.labelPos?.value||r.labelPos;if(i==="none")return v``;{let s={};return r.labelWidth&&i==="left"&&(s.width=r.labelWidth),v`<div class="label" style="${P(Ni(s))}">
            <span class="title">${this.getLabel()}${this._renderRequiredOption()}</span>            
        </div>`}}renderInput(){return v``}isShowError(){return this.context.showInitialError?!!this.invalidMessage:this.dirty?!!this.invalidMessage:false}renderError(){return this.isShowError()?v`<div class="error">
            ${this.invalidMessage}
        </div>`:v``}onFieldChange(r){this._updateFieldValue();}onFieldInput(r){this._updateFieldValue();}_handleSchemaChange(){let r=this.context;if(r&&r.store&&this.schema){let i=this.schema.path.join("_$_");this._subscribers.push(r.store.schemas.store.watch(i+".**",s=>{let{reply:o,type:n,value:l,flags:a}=s;if(o||r.form.seq===a)return;(n==="batch"?l:[s]).forEach(u=>{let p=u.path.length===2?[...u.path.slice(1),"value"]:u.path.slice(1);Wt(this.field,p,u.value);}),this.requestUpdate();},{operates:"write"}));}}renderView(){let r=this.value;if(this.field.toView&&this.field.toView.value)try{r=this.field.toView.value.call(this,this.value);}catch(i){console.error(`Error while toView<${this.path}>: ${i.message}`);}return v`${Je(String(r))}`}_handleStateChange(){let r=this.context;r&&r.store&&this.schema&&this._subscribers.push(r.store.watch(this.schema.path.join("."),i=>{this.value=this.toInput(i.value);},{operates:"write"}));}getStateValue(){return this.toInput(gt(this.context.store.state,this.field.path))}connectedCallback(){super.connectedCallback();let r=this.context;r&&r.store&&this.schema&&(this.field=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.schema.path.join("."),this.name=this.schema.name||this.path,this.path in r.store.schemas.errors&&(this.invalidMessage=r.store.schemas.errors[this.path]),Array.isArray(this.schema.actions)&&(this.beforeActions=this.schema.actions.filter(i=>i.position==="before"),this.afterActions=this.schema.actions.filter(i=>i.position!=="before")));}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(r=>r.off());}getLabelPos(){return this.field.labelPos?.value||this.context.labelPos}getHelpPos(){return this.field.helpPos?.value||this.context.helpPos}_updateFieldValue(){if(!this.schema)return;let r=this.schema.path,i=this.getInputValue(),s=this.context;s.dirty=true,this.dirty=true;try{this.context.store.update(n=>{let l=this.toState(Ii(i,this.schema));Wt(n,r,l),this.invalidMessage=void 0;},{flags:s.form.seq});}catch(o){this.invalidMessage=o.message;}}renderValue(){return v`
            ${this.renderInput()}
            ${this.renderHelp()}                    
            ${this.renderError()} 
        `}render(){let r=this.context;return this.classs.use(r.size,{grid:r.grid,error:this.isShowError(),"left-label":r.labelPos==="left"||r.viewonly,"top-label":r.labelPos==="top"&&!r.viewonly,disable:this.field.enable.value===false,viewonly:r.viewonly,required:this.field.required.value===true,hidden:this.field.visible.value===false}),v`           
            <div class="autofield">
                ${this.field.divider?.value?v`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value">
                    ${Dr(r.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>                            
            </div>
        `}};J([g({type:Object})],U.prototype,"schema",2),J([$()],U.prototype,"value",2),J([$()],U.prototype,"invalidMessage",2),J([$()],U.prototype,"labelPos",2),J([$()],U.prototype,"dirty",2),J([$i({slot:"value",flatten:true})],U.prototype,"_field",2),J([I(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],U.prototype,"input",2),J([Rr({context:ki}),g({attribute:false})],U.prototype,"context",2);var qi=R`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;var Gi=R`
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
`;var Lr="";function Ki(e){Lr=e;}function Yi(e=""){if(!Lr){let t=[...document.getElementsByTagName("script")],r=t.find(i=>i.hasAttribute("data-shoelace"));if(r)Ki(r.getAttribute("data-shoelace"));else {let i=t.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src)),s="";i&&(s=i.getAttribute("src")),Ki(s.split("/").slice(0,-1).join("/"));}}return Lr.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}var Uo={name:"default",resolver:e=>Yi(`assets/icons/${e}.svg`)},Xi=Uo;var Zi={caret:`
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
  `},qo={name:"system",resolver:e=>e in Zi?`data:image/svg+xml,${encodeURIComponent(Zi[e])}`:""},Ji=qo;var Go=[Xi,Ji],kr=[];function Qi(e){kr.push(e);}function ts(e){kr=kr.filter(t=>t!==e);}function Mr(e){return Go.find(t=>t.name===e)}var es=R`
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
`;var ss=Object.defineProperty,Ko=Object.defineProperties,Yo=Object.getOwnPropertyDescriptor,Xo=Object.getOwnPropertyDescriptors,rs=Object.getOwnPropertySymbols,Zo=Object.prototype.hasOwnProperty,Jo=Object.prototype.propertyIsEnumerable;var os=e=>{throw TypeError(e)},is=(e,t,r)=>t in e?ss(e,t,{enumerable:true,configurable:true,writable:true,value:r}):e[t]=r,H=(e,t)=>{for(var r in t||(t={}))Zo.call(t,r)&&is(e,r,t[r]);if(rs)for(var r of rs(t))Jo.call(t,r)&&is(e,r,t[r]);return e},Pt=(e,t)=>Ko(e,Xo(t)),d=(e,t,r,i)=>{for(var s=i>1?void 0:i?Yo(t,r):t,o=e.length-1,n;o>=0;o--)(n=e[o])&&(s=(i?n(t,r,s):n(s))||s);return i&&s&&ss(t,r,s),s},ns=(e,t,r)=>t.has(e)||os("Cannot "+r),as=(e,t,r)=>(ns(e,t,"read from private field"),t.get(e)),ls=(e,t,r)=>t.has(e)?os("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),cs=(e,t,r,i)=>(ns(e,t,"write to private field"),t.set(e,r),r);function tt(e,t){let r=H({waitUntilFirstUpdate:false},t);return (i,s)=>{let{update:o}=i,n=Array.isArray(e)?e:[e];i.update=function(l){n.forEach(a=>{let c=a;if(l.has(c)){let u=l.get(c),p=this[c];u!==p&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](u,p);}}),o.call(this,l);};}}var q=R`
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
`;var Qe,k=class extends ct{constructor(){super(),ls(this,Qe,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t);});}emit(e,t){let r=new CustomEvent(e,H({bubbles:true,cancelable:false,composed:true,detail:{}},t));return this.dispatchEvent(r),r}static define(e,t=this,r={}){let i=customElements.get(e);if(!i){try{customElements.define(e,t,r);}catch{customElements.define(e,class extends t{},r);}return}let s=" (unknown version)",o=s;"version"in t&&t.version&&(s=" v"+t.version),"version"in i&&i.version&&(o=" v"+i.version),!(s&&o&&s===o)&&console.warn(`Attempted to register <${e}>${s}, but <${e}>${o} has already been registered.`);}attributeChangedCallback(e,t,r){as(this,Qe)||(this.constructor.elementProperties.forEach((i,s)=>{i.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s]);}),cs(this,Qe,true)),super.attributeChangedCallback(e,t,r);}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,r)=>{e.has(r)&&this[r]==null&&(this[r]=t);});}};Qe=new WeakMap;k.version="2.20.1";k.dependencies={};d([g()],k.prototype,"dir",2);d([g()],k.prototype,"lang",2);var xe=Symbol(),tr=Symbol(),Ir,jr=new Map,B=class extends k{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(e,t){var r;let i;if(t?.spriteSheet)return this.svg=v`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(i=await fetch(e,{mode:"cors"}),!i.ok)return i.status===410?xe:tr}catch{return tr}try{let s=document.createElement("div");s.innerHTML=await i.text();let o=s.firstElementChild;if(((r=o?.tagName)==null?void 0:r.toLowerCase())!=="svg")return xe;Ir||(Ir=new DOMParser);let l=Ir.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):xe}catch{return xe}}connectedCallback(){super.connectedCallback(),Qi(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),ts(this);}getIconSource(){let e=Mr(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var e;let{url:t,fromLibrary:r}=this.getIconSource(),i=r?Mr(this.library):void 0;if(!t){this.svg=null;return}let s=jr.get(t);if(s||(s=this.resolveIcon(t,i),jr.set(t,s)),!this.initialRender)return;let o=await s;if(o===tr&&jr.delete(t),t===this.getIconSource().url){if(Bi(o)){if(this.svg=o,i){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof i.mutator=="function"&&n&&i.mutator(n);}return}switch(o){case tr:case xe:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(true),(e=i?.mutator)==null||e.call(i,this.svg),this.emit("sl-load");}}}render(){return this.svg}};B.styles=[q,es];d([$()],B.prototype,"svg",2);d([g({reflect:true})],B.prototype,"name",2);d([g()],B.prototype,"src",2);d([g()],B.prototype,"label",2);d([g({reflect:true})],B.prototype,"library",2);d([tt("label")],B.prototype,"handleLabelChange",1);d([tt(["name","src","library"])],B.prototype,"setIcon",1);var G=Tt(class extends pt{constructor(e){if(super(e),e.type!==Ot.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return " "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let r=e.element.classList;for(let i of this.st)i in t||(r.remove(i),this.st.delete(i));for(let i in t){let s=!!t[i];s===this.st.has(i)||this.nt?.has(i)||(s?(r.add(i),this.st.add(i)):(r.remove(i),this.st.delete(i)));}return M}});var us=Symbol.for(""),Qo=e=>{if(e?.r===us)return e?._$litStatic$};var Br=(e,...t)=>({_$litStatic$:t.reduce((r,i,s)=>r+(o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+e[s+1],e[0]),r:us}),ps=new Map,zr=e=>(t,...r)=>{let i=r.length,s,o,n=[],l=[],a,c=0,u=false;for(;c<i;){for(a=t[c];c<i&&(o=r[c],(s=Qo(o))!==void 0);)a+=s+t[++c],u=true;c!==i&&l.push(o),n.push(a),c++;}if(c===i&&n.push(t[i]),u){let p=n.join("$$lit$$");(t=ps.get(p))===void 0&&(n.raw=n,ps.set(p,t=n)),r=l;}return e(t,...r)},hs=zr(v);var z=class extends k{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}click(){this.button.click();}focus(e){this.button.focus(e);}blur(){this.button.blur();}render(){let e=!!this.href,t=e?Br`a`:Br`button`;return hs`
      <${t}
        part="base"
        class=${G({"icon-button":true,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${P(e?void 0:this.disabled)}
        type=${P(e?void 0:"button")}
        href=${P(e?this.href:void 0)}
        target=${P(e?this.target:void 0)}
        download=${P(e?this.download:void 0)}
        rel=${P(e&&this.target?"noreferrer noopener":void 0)}
        role=${P(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${P(this.name)}
          library=${P(this.library)}
          src=${P(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};z.styles=[q,Gi];z.dependencies={"sl-icon":B};d([I(".icon-button")],z.prototype,"button",2);d([$()],z.prototype,"hasFocus",2);d([g()],z.prototype,"name",2);d([g()],z.prototype,"library",2);d([g()],z.prototype,"src",2);d([g()],z.prototype,"href",2);d([g()],z.prototype,"target",2);d([g()],z.prototype,"download",2);d([g()],z.prototype,"label",2);d([g({type:Boolean,reflect:true})],z.prototype,"disabled",2);var Wr=new Set,re=new Map,Nt,Hr="ltr",Fr="en",ds=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(ds){let e=new MutationObserver(fs);Hr=document.documentElement.dir||"ltr",Fr=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function we(...e){e.map(t=>{let r=t.$code.toLowerCase();re.has(r)?re.set(r,Object.assign(Object.assign({},re.get(r)),t)):re.set(r,t),Nt||(Nt=t);}),fs();}function fs(){ds&&(Hr=document.documentElement.dir||"ltr",Fr=document.documentElement.lang||navigator.language),[...Wr.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate();});}var er=class{constructor(t){this.host=t,this.host.addController(this);}hostConnected(){Wr.add(this.host);}hostDisconnected(){Wr.delete(this.host);}dir(){return `${this.host.dir||Hr}`.toLowerCase()}lang(){return `${this.host.lang||Fr}`.toLowerCase()}getTranslationData(t){var r,i;let s=new Intl.Locale(t.replace(/_/g,"-")),o=s?.language.toLowerCase(),n=(i=(r=s?.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&i!==void 0?i:"",l=re.get(`${o}-${n}`),a=re.get(o);return {locale:s,language:o,region:n,primary:l,secondary:a}}exists(t,r){var i;let{primary:s,secondary:o}=this.getTranslationData((i=r.lang)!==null&&i!==void 0?i:this.lang());return r=Object.assign({includeFallback:false},r),!!(s&&s[t]||o&&o[t]||r.includeFallback&&Nt&&Nt[t])}term(t,...r){let{primary:i,secondary:s}=this.getTranslationData(this.lang()),o;if(i&&i[t])o=i[t];else if(s&&s[t])o=s[t];else if(Nt&&Nt[t])o=Nt[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof o=="function"?o(...r):o}date(t,r){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),r).format(t)}number(t,r){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),r).format(t)}relativeTime(t,r,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,r)}};var ms={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};we(ms);var gs=ms;var Rt=class extends er{};we(gs);var Vt=class extends k{constructor(){super(...arguments),this.localize=new Rt(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return v`
      <span
        part="base"
        class=${G({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?v`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};Vt.styles=[q,qi];Vt.dependencies={"sl-icon-button":z};d([g({reflect:true})],Vt.prototype,"variant",2);d([g({reflect:true})],Vt.prototype,"size",2);d([g({type:Boolean,reflect:true})],Vt.prototype,"pill",2);d([g({type:Boolean})],Vt.prototype,"removable",2);var ys=R`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
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

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;function tn(e,t){return {top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}function bs(e,t,r="vertical",i="smooth"){let s=tn(e,t),o=s.top+t.scrollTop,n=s.left+t.scrollLeft,l=t.scrollLeft,a=t.scrollLeft+t.offsetWidth,c=t.scrollTop,u=t.scrollTop+t.offsetHeight;(r==="horizontal"||r==="both")&&(n<l?t.scrollTo({left:n,behavior:i}):n+e.clientWidth>a&&t.scrollTo({left:n-t.offsetWidth+e.clientWidth,behavior:i})),(r==="vertical"||r==="both")&&(o<c?t.scrollTo({top:o,behavior:i}):o+e.clientHeight>u&&t.scrollTo({top:o-t.offsetHeight+e.clientHeight,behavior:i}));}var vs=R`
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
`;var _s=R`
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
`;var ut=Math.min,j=Math.max,Ae=Math.round,Ce=Math.floor,et=e=>({x:e,y:e}),en={left:"right",right:"left",bottom:"top",top:"bottom"},rn={start:"end",end:"start"};function ir(e,t,r){return j(e,ut(t,r))}function Ut(e,t){return typeof e=="function"?e(t):e}function yt(e){return e.split("-")[0]}function qt(e){return e.split("-")[1]}function Nr(e){return e==="x"?"y":"x"}function sr(e){return e==="y"?"height":"width"}function bt(e){return ["top","bottom"].includes(yt(e))?"y":"x"}function or(e){return Nr(bt(e))}function xs(e,t,r){r===void 0&&(r=false);let i=qt(e),s=or(e),o=sr(s),n=s==="x"?i===(r?"end":"start")?"right":"left":i==="start"?"bottom":"top";return t.reference[o]>t.floating[o]&&(n=Se(n)),[n,Se(n)]}function ws(e){let t=Se(e);return [rr(e),t,rr(t)]}function rr(e){return e.replace(/start|end/g,t=>rn[t])}function sn(e,t,r){let i=["left","right"],s=["right","left"],o=["top","bottom"],n=["bottom","top"];switch(e){case "top":case "bottom":return r?t?s:i:t?i:s;case "left":case "right":return t?o:n;default:return []}}function Ss(e,t,r,i){let s=qt(e),o=sn(yt(e),r==="start",i);return s&&(o=o.map(n=>n+"-"+s),t&&(o=o.concat(o.map(rr)))),o}function Se(e){return e.replace(/left|right|bottom|top/g,t=>en[t])}function on(e){return {top:0,right:0,bottom:0,left:0,...e}}function Ur(e){return typeof e!="number"?on(e):{top:e,right:e,bottom:e,left:e}}function Gt(e){let{x:t,y:r,width:i,height:s}=e;return {width:i,height:s,top:r,left:t,right:t+i,bottom:r+s,x:t,y:r}}function As(e,t,r){let{reference:i,floating:s}=e,o=bt(t),n=or(t),l=sr(n),a=yt(t),c=o==="y",u=i.x+i.width/2-s.width/2,p=i.y+i.height/2-s.height/2,f=i[l]/2-s[l]/2,h;switch(a){case "top":h={x:u,y:i.y-s.height};break;case "bottom":h={x:u,y:i.y+i.height};break;case "right":h={x:i.x+i.width,y:p};break;case "left":h={x:i.x-s.width,y:p};break;default:h={x:i.x,y:i.y};}switch(qt(t)){case "start":h[n]-=f*(r&&c?-1:1);break;case "end":h[n]+=f*(r&&c?-1:1);break}return h}var Cs=async(e,t,r)=>{let{placement:i="bottom",strategy:s="absolute",middleware:o=[],platform:n}=r,l=o.filter(Boolean),a=await(n.isRTL==null?void 0:n.isRTL(t)),c=await n.getElementRects({reference:e,floating:t,strategy:s}),{x:u,y:p}=As(c,i,a),f=i,h={},m=0;for(let b=0;b<l.length;b++){let{name:_,fn:y}=l[b],{x,y:S,data:O,reset:T}=await y({x:u,y:p,initialPlacement:i,placement:f,strategy:s,middlewareData:h,rects:c,platform:n,elements:{reference:e,floating:t}});u=x??u,p=S??p,h={...h,[_]:{...h[_],...O}},T&&m<=50&&(m++,typeof T=="object"&&(T.placement&&(f=T.placement),T.rects&&(c=T.rects===true?await n.getElementRects({reference:e,floating:t,strategy:s}):T.rects),{x:u,y:p}=As(c,f,a)),b=-1);}return {x:u,y:p,placement:f,strategy:s,middlewareData:h}};async function nr(e,t){var r;t===void 0&&(t={});let{x:i,y:s,platform:o,rects:n,elements:l,strategy:a}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:p="floating",altBoundary:f=false,padding:h=0}=Ut(t,e),m=Ur(h),_=l[f?p==="floating"?"reference":"floating":p],y=Gt(await o.getClippingRect({element:(r=await(o.isElement==null?void 0:o.isElement(_)))==null||r?_:_.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(l.floating)),boundary:c,rootBoundary:u,strategy:a})),x=p==="floating"?{x:i,y:s,width:n.floating.width,height:n.floating.height}:n.reference,S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l.floating)),O=await(o.isElement==null?void 0:o.isElement(S))?await(o.getScale==null?void 0:o.getScale(S))||{x:1,y:1}:{x:1,y:1},T=Gt(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:x,offsetParent:S,strategy:a}):x);return {top:(y.top-T.top+m.top)/O.y,bottom:(T.bottom-y.bottom+m.bottom)/O.y,left:(y.left-T.left+m.left)/O.x,right:(T.right-y.right+m.right)/O.x}}var Es=e=>({name:"arrow",options:e,async fn(t){let{x:r,y:i,placement:s,rects:o,platform:n,elements:l,middlewareData:a}=t,{element:c,padding:u=0}=Ut(e,t)||{};if(c==null)return {};let p=Ur(u),f={x:r,y:i},h=or(s),m=sr(h),b=await n.getDimensions(c),_=h==="y",y=_?"top":"left",x=_?"bottom":"right",S=_?"clientHeight":"clientWidth",O=o.reference[m]+o.reference[h]-f[h]-o.floating[m],T=f[h]-o.reference[h],X=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c)),D=X?X[S]:0;(!D||!await(n.isElement==null?void 0:n.isElement(X)))&&(D=l.floating[S]||o.floating[m]);let ht=O/2-T/2,st=D/2-b[m]/2-1,N=ut(p[y],st),_t=ut(p[x],st),ot=N,xt=D-b[m]-_t,nt=D/2-b[m]/2+ht,Z=ir(ot,nt,xt),Dt=!a.arrow&&qt(s)!=null&&nt!==Z&&o.reference[m]/2-(nt<ot?N:_t)-b[m]/2<0,dt=Dt?nt<ot?nt-ot:nt-xt:0;return {[h]:f[h]+dt,data:{[h]:Z,centerOffset:nt-Z-dt,...Dt&&{alignmentOffset:dt}},reset:Dt}}});var Os=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var r,i;let{placement:s,middlewareData:o,rects:n,initialPlacement:l,platform:a,elements:c}=t,{mainAxis:u=true,crossAxis:p=true,fallbackPlacements:f,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:b=true,..._}=Ut(e,t);if((r=o.arrow)!=null&&r.alignmentOffset)return {};let y=yt(s),x=bt(l),S=yt(l)===l,O=await(a.isRTL==null?void 0:a.isRTL(c.floating)),T=f||(S||!b?[Se(l)]:ws(l)),X=m!=="none";!f&&X&&T.push(...Ss(l,b,m,O));let D=[l,...T],ht=await nr(t,_),st=[],N=((i=o.flip)==null?void 0:i.overflows)||[];if(u&&st.push(ht[y]),p){let Z=xs(s,n,O);st.push(ht[Z[0]],ht[Z[1]]);}if(N=[...N,{placement:s,overflows:st}],!st.every(Z=>Z<=0)){var _t,ot;let Z=(((_t=o.flip)==null?void 0:_t.index)||0)+1,Dt=D[Z];if(Dt){var xt;let wt=p==="alignment"?x!==bt(Dt):false,at=((xt=N[0])==null?void 0:xt.overflows[0])>0;if(!wt||at)return {data:{index:Z,overflows:N},reset:{placement:Dt}}}let dt=(ot=N.filter(wt=>wt.overflows[0]<=0).sort((wt,at)=>wt.overflows[1]-at.overflows[1])[0])==null?void 0:ot.placement;if(!dt)switch(h){case "bestFit":{var nt;let wt=(nt=N.filter(at=>{if(X){let St=bt(at.placement);return St===x||St==="y"}return  true}).map(at=>[at.placement,at.overflows.filter(St=>St>0).reduce((St,io)=>St+io,0)]).sort((at,St)=>at[1]-St[1])[0])==null?void 0:nt[0];wt&&(dt=wt);break}case "initialPlacement":dt=l;break}if(s!==dt)return {reset:{placement:dt}}}return {}}}};async function nn(e,t){let{placement:r,platform:i,elements:s}=e,o=await(i.isRTL==null?void 0:i.isRTL(s.floating)),n=yt(r),l=qt(r),a=bt(r)==="y",c=["left","top"].includes(n)?-1:1,u=o&&a?-1:1,p=Ut(t,e),{mainAxis:f,crossAxis:h,alignmentAxis:m}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&typeof m=="number"&&(h=l==="end"?m*-1:m),a?{x:h*u,y:f*c}:{x:f*c,y:h*u}}var Ts=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var r,i;let{x:s,y:o,placement:n,middlewareData:l}=t,a=await nn(t,e);return n===((r=l.offset)==null?void 0:r.placement)&&(i=l.arrow)!=null&&i.alignmentOffset?{}:{x:s+a.x,y:o+a.y,data:{...a,placement:n}}}}},$s=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:r,y:i,placement:s}=t,{mainAxis:o=true,crossAxis:n=false,limiter:l={fn:_=>{let{x:y,y:x}=_;return {x:y,y:x}}},...a}=Ut(e,t),c={x:r,y:i},u=await nr(t,a),p=bt(yt(s)),f=Nr(p),h=c[f],m=c[p];if(o){let _=f==="y"?"top":"left",y=f==="y"?"bottom":"right",x=h+u[_],S=h-u[y];h=ir(x,h,S);}if(n){let _=p==="y"?"top":"left",y=p==="y"?"bottom":"right",x=m+u[_],S=m-u[y];m=ir(x,m,S);}let b=l.fn({...t,[f]:h,[p]:m});return {...b,data:{x:b.x-r,y:b.y-i,enabled:{[f]:o,[p]:n}}}}}};var Ps=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var r,i;let{placement:s,rects:o,platform:n,elements:l}=t,{apply:a=()=>{},...c}=Ut(e,t),u=await nr(t,c),p=yt(s),f=qt(s),h=bt(s)==="y",{width:m,height:b}=o.floating,_,y;p==="top"||p==="bottom"?(_=p,y=f===(await(n.isRTL==null?void 0:n.isRTL(l.floating))?"start":"end")?"left":"right"):(y=p,_=f==="end"?"top":"bottom");let x=b-u.top-u.bottom,S=m-u.left-u.right,O=ut(b-u[_],x),T=ut(m-u[y],S),X=!t.middlewareData.shift,D=O,ht=T;if((r=t.middlewareData.shift)!=null&&r.enabled.x&&(ht=S),(i=t.middlewareData.shift)!=null&&i.enabled.y&&(D=x),X&&!f){let N=j(u.left,0),_t=j(u.right,0),ot=j(u.top,0),xt=j(u.bottom,0);h?ht=m-2*(N!==0||_t!==0?N+_t:j(u.left,u.right)):D=b-2*(ot!==0||xt!==0?ot+xt:j(u.top,u.bottom));}await a({...t,availableWidth:ht,availableHeight:D});let st=await n.getDimensions(l.floating);return m!==st.width||b!==st.height?{reset:{rects:true}}:{}}}};function ar(){return typeof window<"u"}function Kt(e){return Vs(e)?(e.nodeName||"").toLowerCase():"#document"}function W(e){var t;return (e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function rt(e){var t;return (t=(Vs(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Vs(e){return ar()?e instanceof Node||e instanceof W(e).Node:false}function K(e){return ar()?e instanceof Element||e instanceof W(e).Element:false}function it(e){return ar()?e instanceof HTMLElement||e instanceof W(e).HTMLElement:false}function Rs(e){return !ar()||typeof ShadowRoot>"u"?false:e instanceof ShadowRoot||e instanceof W(e).ShadowRoot}function se(e){let{overflow:t,overflowX:r,overflowY:i,display:s}=Y(e);return /auto|scroll|overlay|hidden|clip/.test(t+i+r)&&!["inline","contents"].includes(s)}function Ds(e){return ["table","td","th"].includes(Kt(e))}function Ee(e){return [":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch{return  false}})}function oe(e){let t=lr(),r=K(e)?Y(e):e;return ["transform","translate","scale","rotate","perspective"].some(i=>r[i]?r[i]!=="none":false)||(r.containerType?r.containerType!=="normal":false)||!t&&(r.backdropFilter?r.backdropFilter!=="none":false)||!t&&(r.filter?r.filter!=="none":false)||["transform","translate","scale","rotate","perspective","filter"].some(i=>(r.willChange||"").includes(i))||["paint","layout","strict","content"].some(i=>(r.contain||"").includes(i))}function Ls(e){let t=vt(e);for(;it(t)&&!Yt(t);){if(oe(t))return t;if(Ee(t))return null;t=vt(t);}return null}function lr(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}function Yt(e){return ["html","body","#document"].includes(Kt(e))}function Y(e){return W(e).getComputedStyle(e)}function Oe(e){return K(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function vt(e){if(Kt(e)==="html")return e;let t=e.assignedSlot||e.parentNode||Rs(e)&&e.host||rt(e);return Rs(t)?t.host:t}function ks(e){let t=vt(e);return Yt(t)?e.ownerDocument?e.ownerDocument.body:e.body:it(t)&&se(t)?t:ks(t)}function ie(e,t,r){var i;t===void 0&&(t=[]),r===void 0&&(r=true);let s=ks(e),o=s===((i=e.ownerDocument)==null?void 0:i.body),n=W(s);if(o){let l=cr(n);return t.concat(n,n.visualViewport||[],se(s)?s:[],l&&r?ie(l):[])}return t.concat(s,ie(s,[],r))}function cr(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function js(e){let t=Y(e),r=parseFloat(t.width)||0,i=parseFloat(t.height)||0,s=it(e),o=s?e.offsetWidth:r,n=s?e.offsetHeight:i,l=Ae(r)!==o||Ae(i)!==n;return l&&(r=o,i=n),{width:r,height:i,$:l}}function Gr(e){return K(e)?e:e.contextElement}function ne(e){let t=Gr(e);if(!it(t))return et(1);let r=t.getBoundingClientRect(),{width:i,height:s,$:o}=js(t),n=(o?Ae(r.width):r.width)/i,l=(o?Ae(r.height):r.height)/s;return (!n||!Number.isFinite(n))&&(n=1),(!l||!Number.isFinite(l))&&(l=1),{x:n,y:l}}var an=et(0);function Bs(e){let t=W(e);return !lr()||!t.visualViewport?an:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function ln(e,t,r){return t===void 0&&(t=false),!r||t&&r!==W(e)?false:t}function Xt(e,t,r,i){t===void 0&&(t=false),r===void 0&&(r=false);let s=e.getBoundingClientRect(),o=Gr(e),n=et(1);t&&(i?K(i)&&(n=ne(i)):n=ne(e));let l=ln(o,r,i)?Bs(o):et(0),a=(s.left+l.x)/n.x,c=(s.top+l.y)/n.y,u=s.width/n.x,p=s.height/n.y;if(o){let f=W(o),h=i&&K(i)?W(i):i,m=f,b=cr(m);for(;b&&i&&h!==m;){let _=ne(b),y=b.getBoundingClientRect(),x=Y(b),S=y.left+(b.clientLeft+parseFloat(x.paddingLeft))*_.x,O=y.top+(b.clientTop+parseFloat(x.paddingTop))*_.y;a*=_.x,c*=_.y,u*=_.x,p*=_.y,a+=S,c+=O,m=W(b),b=cr(m);}}return Gt({width:u,height:p,x:a,y:c})}function Kr(e,t){let r=Oe(e).scrollLeft;return t?t.left+r:Xt(rt(e)).left+r}function zs(e,t,r){r===void 0&&(r=false);let i=e.getBoundingClientRect(),s=i.left+t.scrollLeft-(r?0:Kr(e,i)),o=i.top+t.scrollTop;return {x:s,y:o}}function cn(e){let{elements:t,rect:r,offsetParent:i,strategy:s}=e,o=s==="fixed",n=rt(i),l=t?Ee(t.floating):false;if(i===n||l&&o)return r;let a={scrollLeft:0,scrollTop:0},c=et(1),u=et(0),p=it(i);if((p||!p&&!o)&&((Kt(i)!=="body"||se(n))&&(a=Oe(i)),it(i))){let h=Xt(i);c=ne(i),u.x=h.x+i.clientLeft,u.y=h.y+i.clientTop;}let f=n&&!p&&!o?zs(n,a,true):et(0);return {width:r.width*c.x,height:r.height*c.y,x:r.x*c.x-a.scrollLeft*c.x+u.x+f.x,y:r.y*c.y-a.scrollTop*c.y+u.y+f.y}}function pn(e){return Array.from(e.getClientRects())}function un(e){let t=rt(e),r=Oe(e),i=e.ownerDocument.body,s=j(t.scrollWidth,t.clientWidth,i.scrollWidth,i.clientWidth),o=j(t.scrollHeight,t.clientHeight,i.scrollHeight,i.clientHeight),n=-r.scrollLeft+Kr(e),l=-r.scrollTop;return Y(i).direction==="rtl"&&(n+=j(t.clientWidth,i.clientWidth)-s),{width:s,height:o,x:n,y:l}}function hn(e,t){let r=W(e),i=rt(e),s=r.visualViewport,o=i.clientWidth,n=i.clientHeight,l=0,a=0;if(s){o=s.width,n=s.height;let c=lr();(!c||c&&t==="fixed")&&(l=s.offsetLeft,a=s.offsetTop);}return {width:o,height:n,x:l,y:a}}function dn(e,t){let r=Xt(e,true,t==="fixed"),i=r.top+e.clientTop,s=r.left+e.clientLeft,o=it(e)?ne(e):et(1),n=e.clientWidth*o.x,l=e.clientHeight*o.y,a=s*o.x,c=i*o.y;return {width:n,height:l,x:a,y:c}}function Ms(e,t,r){let i;if(t==="viewport")i=hn(e,r);else if(t==="document")i=un(rt(e));else if(K(t))i=dn(t,r);else {let s=Bs(e);i={x:t.x-s.x,y:t.y-s.y,width:t.width,height:t.height};}return Gt(i)}function Ws(e,t){let r=vt(e);return r===t||!K(r)||Yt(r)?false:Y(r).position==="fixed"||Ws(r,t)}function fn(e,t){let r=t.get(e);if(r)return r;let i=ie(e,[],false).filter(l=>K(l)&&Kt(l)!=="body"),s=null,o=Y(e).position==="fixed",n=o?vt(e):e;for(;K(n)&&!Yt(n);){let l=Y(n),a=oe(n);!a&&l.position==="fixed"&&(s=null),(o?!a&&!s:!a&&l.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||se(n)&&!a&&Ws(e,n))?i=i.filter(u=>u!==n):s=l,n=vt(n);}return t.set(e,i),i}function mn(e){let{element:t,boundary:r,rootBoundary:i,strategy:s}=e,n=[...r==="clippingAncestors"?Ee(t)?[]:fn(t,this._c):[].concat(r),i],l=n[0],a=n.reduce((c,u)=>{let p=Ms(t,u,s);return c.top=j(p.top,c.top),c.right=ut(p.right,c.right),c.bottom=ut(p.bottom,c.bottom),c.left=j(p.left,c.left),c},Ms(t,l,s));return {width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function gn(e){let{width:t,height:r}=js(e);return {width:t,height:r}}function yn(e,t,r){let i=it(t),s=rt(t),o=r==="fixed",n=Xt(e,true,o,t),l={scrollLeft:0,scrollTop:0},a=et(0);function c(){a.x=Kr(s);}if(i||!i&&!o)if((Kt(t)!=="body"||se(s))&&(l=Oe(t)),i){let h=Xt(t,true,o,t);a.x=h.x+t.clientLeft,a.y=h.y+t.clientTop;}else s&&c();o&&!i&&s&&c();let u=s&&!i&&!o?zs(s,l):et(0),p=n.left+l.scrollLeft-a.x-u.x,f=n.top+l.scrollTop-a.y-u.y;return {x:p,y:f,width:n.width,height:n.height}}function qr(e){return Y(e).position==="static"}function Is(e,t){if(!it(e)||Y(e).position==="fixed")return null;if(t)return t(e);let r=e.offsetParent;return rt(e)===r&&(r=r.ownerDocument.body),r}function Hs(e,t){let r=W(e);if(Ee(e))return r;if(!it(e)){let s=vt(e);for(;s&&!Yt(s);){if(K(s)&&!qr(s))return s;s=vt(s);}return r}let i=Is(e,t);for(;i&&Ds(i)&&qr(i);)i=Is(i,t);return i&&Yt(i)&&qr(i)&&!oe(i)?r:i||Ls(e)||r}var bn=async function(e){let t=this.getOffsetParent||Hs,r=this.getDimensions,i=await r(e.floating);return {reference:yn(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function vn(e){return Y(e).direction==="rtl"}var Te={convertOffsetParentRelativeRectToViewportRelativeRect:cn,getDocumentElement:rt,getClippingRect:mn,getOffsetParent:Hs,getElementRects:bn,getClientRects:pn,getDimensions:gn,getScale:ne,isElement:K,isRTL:vn};function Fs(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function _n(e,t){let r=null,i,s=rt(e);function o(){var l;clearTimeout(i),(l=r)==null||l.disconnect(),r=null;}function n(l,a){l===void 0&&(l=false),a===void 0&&(a=1),o();let c=e.getBoundingClientRect(),{left:u,top:p,width:f,height:h}=c;if(l||t(),!f||!h)return;let m=Ce(p),b=Ce(s.clientWidth-(u+f)),_=Ce(s.clientHeight-(p+h)),y=Ce(u),S={rootMargin:-m+"px "+-b+"px "+-_+"px "+-y+"px",threshold:j(0,ut(1,a))||1},O=true;function T(X){let D=X[0].intersectionRatio;if(D!==a){if(!O)return n();D?n(false,D):i=setTimeout(()=>{n(false,1e-7);},1e3);}D===1&&!Fs(c,e.getBoundingClientRect())&&n(),O=false;}try{r=new IntersectionObserver(T,{...S,root:s.ownerDocument});}catch{r=new IntersectionObserver(T,S);}r.observe(e);}return n(true),o}function Ns(e,t,r,i){i===void 0&&(i={});let{ancestorScroll:s=true,ancestorResize:o=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:a=false}=i,c=Gr(e),u=s||o?[...c?ie(c):[],...ie(t)]:[];u.forEach(y=>{s&&y.addEventListener("scroll",r,{passive:true}),o&&y.addEventListener("resize",r);});let p=c&&l?_n(c,r):null,f=-1,h=null;n&&(h=new ResizeObserver(y=>{let[x]=y;x&&x.target===c&&h&&(h.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var S;(S=h)==null||S.observe(t);})),r();}),c&&!a&&h.observe(c),h.observe(t));let m,b=a?Xt(e):null;a&&_();function _(){let y=Xt(e);b&&!Fs(b,y)&&r(),b=y,m=requestAnimationFrame(_);}return r(),()=>{var y;u.forEach(x=>{s&&x.removeEventListener("scroll",r),o&&x.removeEventListener("resize",r);}),p?.(),(y=h)==null||y.disconnect(),h=null,a&&cancelAnimationFrame(m);}}var Us=Ts;var qs=$s,Gs=Os,Yr=Ps;var Ks=Es;var Ys=(e,t,r)=>{let i=new Map,s={platform:Te,...r},o={...s.platform,_c:i};return Cs(e,t,{...s,platform:o})};function Xs(e){return xn(e)}function Xr(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function xn(e){for(let t=e;t;t=Xr(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=Xr(e);t;t=Xr(t)){if(!(t instanceof Element))continue;let r=getComputedStyle(t);if(r.display!=="contents"&&(r.position!=="static"||oe(r)||t.tagName==="BODY"))return t}return null}function wn(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e.contextElement instanceof Element:true)}var C=class extends k{constructor(){super(...arguments),this.localize=new Rt(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom"),i=0,s=0,o=0,n=0,l=0,a=0,c=0,u=0;r?e.top<t.top?(i=e.left,s=e.bottom,o=e.right,n=e.bottom,l=t.left,a=t.top,c=t.right,u=t.top):(i=t.left,s=t.bottom,o=t.right,n=t.bottom,l=e.left,a=e.top,c=e.right,u=e.top):e.left<t.left?(i=e.right,s=e.top,o=t.left,n=t.top,l=e.right,a=e.bottom,c=t.left,u=t.bottom):(i=t.right,s=t.top,o=e.left,n=e.top,l=t.right,a=t.bottom,c=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${o}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor);}else this.anchor instanceof Element||wn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Ns(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e();})}reposition(){if(!this.active||!this.anchorEl)return;let e=[Us({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Yr({apply:({rects:r})=>{let i=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${r.reference.width}px`:"",this.popup.style.height=s?`${r.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&e.push(Gs({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(qs({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(Yr({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(Ks({element:this.arrowEl,padding:this.arrowPadding}));let t=this.strategy==="absolute"?r=>Te.getOffsetParent(r,Xs):Te.getOffsetParent;Ys(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:Pt(H({},Te),{getOffsetParent:t})}).then(({x:r,y:i,middlewareData:s,placement:o})=>{let n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${r}px`,top:`${i}px`}),this.arrow){let a=s.arrow.x,c=s.arrow.y,u="",p="",f="",h="";if(this.arrowPlacement==="start"){let m=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?m:"",h=n?"":m;}else if(this.arrowPlacement==="end"){let m=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":m,h=n?m:"",f=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(h=typeof a=="number"?"calc(50% - var(--arrow-size-diagonal))":"",u=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(h=typeof a=="number"?`${a}px`:"",u=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:u,right:p,bottom:f,left:h,[l]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return v`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${G({"popup-hover-bridge":true,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${G({popup:true,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?v`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};C.styles=[q,_s];d([I(".popup")],C.prototype,"popup",2);d([I(".popup__arrow")],C.prototype,"arrowEl",2);d([g()],C.prototype,"anchor",2);d([g({type:Boolean,reflect:true})],C.prototype,"active",2);d([g({reflect:true})],C.prototype,"placement",2);d([g({reflect:true})],C.prototype,"strategy",2);d([g({type:Number})],C.prototype,"distance",2);d([g({type:Number})],C.prototype,"skidding",2);d([g({type:Boolean})],C.prototype,"arrow",2);d([g({attribute:"arrow-placement"})],C.prototype,"arrowPlacement",2);d([g({attribute:"arrow-padding",type:Number})],C.prototype,"arrowPadding",2);d([g({type:Boolean})],C.prototype,"flip",2);d([g({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],C.prototype,"flipFallbackPlacements",2);d([g({attribute:"flip-fallback-strategy"})],C.prototype,"flipFallbackStrategy",2);d([g({type:Object})],C.prototype,"flipBoundary",2);d([g({attribute:"flip-padding",type:Number})],C.prototype,"flipPadding",2);d([g({type:Boolean})],C.prototype,"shift",2);d([g({type:Object})],C.prototype,"shiftBoundary",2);d([g({attribute:"shift-padding",type:Number})],C.prototype,"shiftPadding",2);d([g({attribute:"auto-size"})],C.prototype,"autoSize",2);d([g()],C.prototype,"sync",2);d([g({type:Object})],C.prototype,"autoSizeBoundary",2);d([g({attribute:"auto-size-padding",type:Number})],C.prototype,"autoSizePadding",2);d([g({attribute:"hover-bridge",type:Boolean})],C.prototype,"hoverBridge",2);var $e=new WeakMap,Pe=new WeakMap,Re=new WeakMap,Zr=new WeakSet,pr=new WeakMap,Zs=class{constructor(e,t){this.handleFormData=r=>{let i=this.options.disabled(this.host),s=this.options.name(this.host),o=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!n&&typeof s=="string"&&s.length>0&&typeof o<"u"&&(Array.isArray(o)?o.forEach(l=>{r.formData.append(s,l.toString());}):r.formData.append(s,o.toString()));},this.handleFormSubmit=r=>{var i;let s=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=$e.get(this.form))==null||i.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!s&&!o(this.host)&&(r.preventDefault(),r.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),pr.set(this.host,[]);},this.handleInteraction=r=>{let i=pr.get(this.host);i.includes(r.type)||i.push(r.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let r=this.form.querySelectorAll("*");for(let i of r)if(typeof i.checkValidity=="function"&&!i.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let r=this.form.querySelectorAll("*");for(let i of r)if(typeof i.reportValidity=="function"&&!i.reportValidity())return  false}return  true},(this.host=e).addController(this),this.options=H({form:r=>{let i=r.form;if(i){let o=r.getRootNode().querySelector(`#${i}`);if(o)return o}return r.closest("form")},name:r=>r.name,value:r=>r.value,defaultValue:r=>r.defaultValue,disabled:r=>{var i;return (i=r.disabled)!=null?i:false},reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():true,checkValidity:r=>typeof r.checkValidity=="function"?r.checkValidity():true,setValue:(r,i)=>r.value=i,assumeInteractionOn:["sl-input"]},t);}hostConnected(){let e=this.options.form(this.host);e&&this.attachForm(e),pr.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction);});}hostDisconnected(){this.detachForm(),pr.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction);});}hostUpdated(){let e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(e){e?(this.form=e,$e.has(this.form)?$e.get(this.form).add(this.host):$e.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Pe.has(this.form)||(Pe.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Re.has(this.form)||(Re.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let e=$e.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Pe.has(this.form)&&(this.form.reportValidity=Pe.get(this.form),Pe.delete(this.form)),Re.has(this.form)&&(this.form.checkValidity=Re.get(this.form),Re.delete(this.form)),this.form=void 0));}setUserInteracted(e,t){t?Zr.add(e):Zr.delete(e),e.requestUpdate();}doAction(e,t){if(this.form){let r=document.createElement("button");r.type=e,r.style.position="absolute",r.style.width="0",r.style.height="0",r.style.clipPath="inset(50%)",r.style.overflow="hidden",r.style.whiteSpace="nowrap",t&&(r.name=t.name,r.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{t.hasAttribute(i)&&r.setAttribute(i,t.getAttribute(i));})),this.form.append(r),r.click(),r.remove();}}getForm(){var e;return (e=this.form)!=null?e:null}reset(e){this.doAction("reset",e);}submit(e){this.doAction("submit",e);}setValidity(e){let t=this.host,r=!!Zr.has(t),i=!!t.required;t.toggleAttribute("data-required",i),t.toggleAttribute("data-optional",!i),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&r),t.toggleAttribute("data-user-valid",e&&r);}updateValidity(){let e=this.host;this.setValidity(e.validity.valid);}emitInvalidEvent(e){let t=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||e?.preventDefault();}},Js=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false});Object.freeze(Pt(H({},Js),{valid:false,valueMissing:true}));Object.freeze(Pt(H({},Js),{valid:false,customError:true}));var to=new Map,Sn=new WeakMap;function An(e){return e??{keyframes:[],options:{duration:0}}}function Qs(e,t){return t.toLowerCase()==="rtl"?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function Jr(e,t){to.set(e,An(t));}function Qr(e,t,r){let i=Sn.get(e);if(i?.[t])return Qs(i[t],r.dir);let s=to.get(t);return s?Qs(s,r.dir):{keyframes:[],options:{duration:0}}}function ti(e,t){return new Promise(r=>{function i(s){s.target===e&&(e.removeEventListener(t,i),r());}e.addEventListener(t,i);})}function ei(e,t,r){return new Promise(i=>{if(r?.duration===1/0)throw new Error("Promise-based animations must be finite.");let s=e.animate(t,Pt(H({},r),{duration:Cn()?0:r.duration}));s.addEventListener("cancel",i,{once:true}),s.addEventListener("finish",i,{once:true});})}function Cn(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ri(e){return Promise.all(e.getAnimations().map(t=>new Promise(r=>{t.cancel(),requestAnimationFrame(r);})))}var eo=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=r=>{let i=r.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate();},(this.host=e).addController(this),this.slotNames=t;}hasDefaultSlot(){return [...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return  true;if(e.nodeType===e.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!t.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};var w=class extends k{constructor(){super(...arguments),this.formControlController=new Zs(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new eo(this,"help-text","label"),this.localize=new Rt(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=e=>v`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${t=>this.handleTagRemove(t,e)}
      >
        ${e.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide();},this.handleDocumentKeyDown=e=>{let t=e.target,r=t.closest(".select__clear")!==null,i=t.closest("sl-icon-button")!==null;if(!(r||i)){if(e.key==="Escape"&&this.open&&!this.closeWatcher&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let s=this.getAllOptions(),o=s.indexOf(this.currentOption),n=Math.max(0,o);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(n=o+1,n>s.length-1&&(n=0)):e.key==="ArrowUp"?(n=o-1,n<0&&(n=s.length-1)):e.key==="Home"?n=0:e.key==="End"&&(n=s.length-1),this.setCurrentOption(s[n]);}if(e.key&&e.key.length===1||e.key==="Backspace"){let s=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show();}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(let o of s)if(o.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(o);break}}}},this.handleDocumentMouseDown=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide();};}get value(){return this._value}set value(e){this.multiple?e=Array.isArray(e)?e:e.split(" "):e=Array.isArray(e)?e.join(" "):e,this._value!==e&&(this.valueHasChanged=true,this._value=e);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var e;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var e;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(e=this.closeWatcher)==null||e.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(e){let r=e.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="sl-icon-button");this.disabled||r||(e.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(e){e.key!=="Tab"&&(e.stopPropagation(),this.handleDocumentKeyDown(e));}handleClearClick(e){e.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault();}handleOptionClick(e){let r=e.target.closest("sl-option"),i=this.value;r&&!r.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(r):this.setSelectedOptions(r),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==i&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let e=this.getAllOptions(),t=this.valueHasChanged?this.value:this.defaultValue,r=Array.isArray(t)?t:[t],i=[];e.forEach(s=>i.push(s.value)),this.setSelectedOptions(e.filter(s=>r.includes(s.value)));}handleTagRemove(e,t){e.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(t,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(e){this.getAllOptions().forEach(r=>{r.current=false,r.tabIndex=-1;}),e&&(this.currentOption=e,e.current=true,e.tabIndex=0,e.focus());}setSelectedOptions(e){let t=this.getAllOptions(),r=Array.isArray(e)?e:[e];t.forEach(i=>i.selected=false),r.length&&r.forEach(i=>i.selected=true),this.selectionChanged();}toggleOptionSelection(e,t){t===true||t===false?e.selected=t:e.selected=!e.selected,this.selectionChanged();}selectionChanged(){var e,t,r;let i=this.getAllOptions();this.selectedOptions=i.filter(o=>o.selected);let s=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(o=>o.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let o=this.selectedOptions[0];this.value=(e=o?.value)!=null?e:"",this.displayLabel=(r=(t=o?.getTextLabel)==null?void 0:t.call(o))!=null?r:"";}this.valueHasChanged=s,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){let r=this.getTag(e,t);return v`<div @sl-remove=${i=>this.handleTagRemove(i,e)}>
          ${typeof r=="string"?Je(r):r}
        </div>`}else if(t===this.maxOptionsVisible)return v`<sl-tag size=${this.size}>+${this.selectedOptions.length-t}</sl-tag>`;return v``})}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(e,t,r){if(super.attributeChangedCallback(e,t,r),e==="value"){let i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i;}}handleValueChange(){if(!this.valueHasChanged){let r=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=r;}let e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(e.filter(r=>t.includes(r.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await ri(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:e,options:t}=Qr(this,"select.show",{dir:this.localize.dir()});await ei(this.popup.popup,e,t),this.currentOption&&bs(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await ri(this);let{keyframes:e,options:t}=Qr(this,"select.hide",{dir:this.localize.dir()});await ei(this.popup.popup,e,t),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,ti(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,ti(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(e){this.valueInput.setCustomValidity(e),this.formControlController.updateValidity();}focus(e){this.displayInput.focus(e);}blur(){this.displayInput.blur();}render(){let e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),r=this.label?true:!!e,i=this.helpText?true:!!t,s=this.clearable&&!this.disabled&&this.value.length>0,o=this.placeholder&&this.value&&this.value.length<=0;return v`
      <div
        part="form-control"
        class=${G({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${G({select:true,"select--standard":true,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":o,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?v`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${s?v`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};w.styles=[q,vs,ys];w.dependencies={"sl-icon":B,"sl-popup":C,"sl-tag":Vt};d([I(".select")],w.prototype,"popup",2);d([I(".select__combobox")],w.prototype,"combobox",2);d([I(".select__display-input")],w.prototype,"displayInput",2);d([I(".select__value-input")],w.prototype,"valueInput",2);d([I(".select__listbox")],w.prototype,"listbox",2);d([$()],w.prototype,"hasFocus",2);d([$()],w.prototype,"displayLabel",2);d([$()],w.prototype,"currentOption",2);d([$()],w.prototype,"selectedOptions",2);d([$()],w.prototype,"valueHasChanged",2);d([g()],w.prototype,"name",2);d([$()],w.prototype,"value",1);d([g({attribute:"value"})],w.prototype,"defaultValue",2);d([g({reflect:true})],w.prototype,"size",2);d([g()],w.prototype,"placeholder",2);d([g({type:Boolean,reflect:true})],w.prototype,"multiple",2);d([g({attribute:"max-options-visible",type:Number})],w.prototype,"maxOptionsVisible",2);d([g({type:Boolean,reflect:true})],w.prototype,"disabled",2);d([g({type:Boolean})],w.prototype,"clearable",2);d([g({type:Boolean,reflect:true})],w.prototype,"open",2);d([g({type:Boolean})],w.prototype,"hoist",2);d([g({type:Boolean,reflect:true})],w.prototype,"filled",2);d([g({type:Boolean,reflect:true})],w.prototype,"pill",2);d([g()],w.prototype,"label",2);d([g({reflect:true})],w.prototype,"placement",2);d([g({attribute:"help-text"})],w.prototype,"helpText",2);d([g({reflect:true})],w.prototype,"form",2);d([g({type:Boolean,reflect:true})],w.prototype,"required",2);d([g()],w.prototype,"getTag",2);d([tt("disabled",{waitUntilFirstUpdate:true})],w.prototype,"handleDisabledChange",1);d([tt(["defaultValue","value"],{waitUntilFirstUpdate:true})],w.prototype,"handleValueChange",1);d([tt("open",{waitUntilFirstUpdate:true})],w.prototype,"handleOpenChange",1);Jr("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Jr("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});w.define("sl-select");var ro=R`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;var F=class extends k{constructor(){super(...arguments),this.localize=new Rt(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let e=this.closest("sl-select");e&&e.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let e=this.childNodes,t="";return [...e].forEach(r=>{r.nodeType===Node.ELEMENT_NODE&&(r.hasAttribute("slot")||(t+=r.textContent)),r.nodeType===Node.TEXT_NODE&&(t+=r.textContent);}),t.trim()}render(){return v`
      <div
        part="base"
        class=${G({option:true,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};F.styles=[q,ro];F.dependencies={"sl-icon":B};d([I(".option__label")],F.prototype,"defaultSlot",2);d([$()],F.prototype,"current",2);d([$()],F.prototype,"selected",2);d([$()],F.prototype,"hasHover",2);d([g({reflect:true})],F.prototype,"value",2);d([g({type:Boolean,reflect:true})],F.prototype,"disabled",2);d([tt("disabled")],F.prototype,"handleDisabledChange",1);d([tt("selected")],F.prototype,"handleSelectedChange",1);d([tt("value")],F.prototype,"handleValueChange",1);F.define("sl-option");exports.AutoFieldSelect=class ur extends U{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";}renderInput(){let r=this.getFieldOption("select",[]).map(i=>{let s={};return typeof i=="object"?Object.assign(s,i):typeof i=="string"&&i.startsWith("-")?Object.assign(s,{type:"divider"}):Object.assign(s,{label:i}),s});return v`              
        <sl-select
            name="${this.name}"
            data-path="${this.path}"
            value="${this.getValue()}"           
            ?multiple=${this.getFieldOption("multiple")}
            ?disabled=${this.getFieldOption("disabled")}
            ?clearable=${this.getFieldOption("clearable",true)}  
            ?filled=${this.getFieldOption("filled")}  
            ?pill=${this.getFieldOption("pill")}  
            ?required=${this.getFieldOption("required")}  
            .placeholder=${this.getFieldOption("placeholder")}  
            .maxOptionsVisible=${this.getFieldOption("maxOptionsVisible",0)}  
            .help-text=${this.getFieldOption("help")}  
            .defaultValue=${this.getFieldOption("defaultValue",this.value)}  
            .placement=${this.getFieldOption("placement")}  
            @sl-input=${this.onFieldInput.bind(this)}
         >
            ${r.map(i=>i.type==="divider"?v`<sl-divider></sl-divider>`:v`<sl-option 
                    value="${i[this.valueKey]||i.label}"
                    ${P(this.getFieldOption("disabled"))}
                >${i[this.labelKey]}</sl-option>`)}
        ${this.renderBeforeActions()}
        ${this.renderAfterActions()}
        </sl-select> 
        `}getValue(){return this.getFieldOption("multiple")?this.value.join(" "):this.value}};exports.AutoFieldSelect=J([Ti("auto-field-select")],exports.AutoFieldSelect);/*! Bundled license information:

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

lit-html/node/directives/if-defined.js:
lit-html/node/directives/style-map.js:
lit-html/node/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

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
lit-html/node/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/return exports;})({});