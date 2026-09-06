var AutoForm=(function(exports){'use strict';var Hp=Object.defineProperty;var jp=Object.getOwnPropertyDescriptor;var Mt=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(r,t)=>(typeof require<"u"?require:r)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var v=(e,r,t,o)=>{for(var i=o>1?void 0:o?jp(r,t):r,s=e.length-1,n;s>=0;s--)(n=e[s])&&(i=(o?n(r,t,i):n(i))||i);return o&&i&&Hp(r,t,i),i};var ui=globalThis,Jn=e=>e,si=ui.trustedTypes,Qn=si?si.createPolicy("lit-html",{createHTML:e=>e}):void 0,Hs="$lit$",xe=`lit$${Math.random().toFixed(9).slice(2)}$`,js="?"+xe,Bp=`<${js}>`,or=ui.document===void 0?{createTreeWalker:()=>({})}:document,co=()=>or.createComment(""),po=e=>e===null||typeof e!="object"&&typeof e!="function",Bs=Array.isArray,ia=e=>Bs(e)||typeof e?.[Symbol.iterator]=="function",Fs=`[ 	
\f\r]`,lo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zn=/-->/g,ta=/>/g,er=RegExp(`>|${Fs}(?:([^\\s"'>=/]+)(${Fs}*=${Fs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ea=/'/g,ra=/"/g,sa=/^(?:script|style|textarea|title)$/i,Ns=e=>(r,...t)=>({_$litType$:e,strings:r,values:t}),f=Ns(1),ht=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),oa=new WeakMap,rr=or.createTreeWalker(or,129);function la(e,r){if(!Bs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qn!==void 0?Qn.createHTML(r):r}var ca=(e,r)=>{let t=e.length-1,o=[],i,s=r===2?"<svg>":r===3?"<math>":"",n=lo;for(let a=0;a<t;a++){let l=e[a],c,d,u=-1,m=0;for(;m<l.length&&(n.lastIndex=m,d=n.exec(l),d!==null);)m=n.lastIndex,n===lo?d[1]==="!--"?n=Zn:d[1]!==void 0?n=ta:d[2]!==void 0?(sa.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=er):d[3]!==void 0&&(n=er):n===er?d[0]===">"?(n=i??lo,u=-1):d[1]===void 0?u=-2:(u=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?er:d[3]==='"'?ra:ea):n===ra||n===ea?n=er:n===Zn||n===ta?n=lo:(n=er,i=void 0);let g=n===er&&e[a+1].startsWith("/>")?" ":"";s+=n===lo?l+Bp:u>=0?(o.push(c),l.slice(0,u)+Hs+l.slice(u)+xe+g):l+xe+(u===-2?a:g);}return [la(e,s+(e[t]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),o]},uo=class e{constructor({strings:r,_$litType$:t},o){let i;this.parts=[];let s=0,n=0,a=r.length-1,l=this.parts,[c,d]=ca(r,t);if(this.el=e.createElement(c,o),rr.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes);}for(;(i=rr.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(Hs)){let m=d[n++],g=i.getAttribute(u).split(xe),b=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?ai:b[1]==="?"?li:b[1]==="@"?ci:sr}),i.removeAttribute(u);}else u.startsWith(xe)&&(l.push({type:6,index:s}),i.removeAttribute(u));if(sa.test(i.tagName)){let u=i.textContent.split(xe),m=u.length-1;if(m>0){i.textContent=si?si.emptyScript:"";for(let g=0;g<m;g++)i.append(u[g],co()),rr.nextNode(),l.push({type:2,index:++s});i.append(u[m],co());}}}else if(i.nodeType===8)if(i.data===js)l.push({type:2,index:s});else {let u=-1;for(;(u=i.data.indexOf(xe,u+1))!==-1;)l.push({type:7,index:s}),u+=xe.length-1;}s++;}}static createElement(r,t){let o=or.createElement("template");return o.innerHTML=r,o}};function ir(e,r,t=e,o){if(r===ht)return r;let i=o!==void 0?t._$Co?.[o]:t._$Cl,s=po(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(false),s===void 0?i=void 0:(i=new s(e),i._$AT(e,t,o)),o!==void 0?(t._$Co??=[])[o]=i:t._$Cl=i),i!==void 0&&(r=ir(e,i._$AS(e,r.values),i,o)),r}var ni=class{constructor(r,t){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=t;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:t},parts:o}=this._$AD,i=(r?.creationScope??or).importNode(t,true);rr.currentNode=i;let s=rr.nextNode(),n=0,a=0,l=o[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new kr(s,s.nextSibling,this,r):l.type===1?c=new l.ctor(s,l.name,l.strings,this,r):l.type===6&&(c=new pi(s,this,r)),this._$AV.push(c),l=o[++a];}n!==l?.index&&(s=rr.nextNode(),n++);}return rr.currentNode=or,i}p(r){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(r,o,t),t+=o.strings.length-2):o._$AI(r[t])),t++;}},kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,t,o,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=r,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??true;}get parentNode(){let r=this._$AA.parentNode,t=this._$AM;return t!==void 0&&r?.nodeType===11&&(r=t.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,t=this){r=ir(this,r,t),po(r)?r===q||r==null||r===""?(this._$AH!==q&&this._$AR(),this._$AH=q):r!==this._$AH&&r!==ht&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):ia(r)?this.k(r):this._(r);}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r));}_(r){this._$AH!==q&&po(this._$AH)?this._$AA.nextSibling.data=r:this.T(or.createTextNode(r)),this._$AH=r;}$(r){let{values:t,_$litType$:o}=r,i=typeof o=="number"?this._$AC(r):(o.el===void 0&&(o.el=uo.createElement(la(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else {let s=new ni(i,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s;}}_$AC(r){let t=oa.get(r.strings);return t===void 0&&oa.set(r.strings,t=new uo(r)),t}k(r){Bs(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,i=0;for(let s of r)i===t.length?t.push(o=new e(this.O(co()),this.O(co()),this,this.options)):o=t[i],o._$AI(s),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i);}_$AR(r=this._$AA.nextSibling,t){for(this._$AP?.(false,true,t);r!==this._$AB;){let o=Jn(r).nextSibling;Jn(r).remove(),r=o;}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r));}},sr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,t,o,i,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=r,this.name=t,this._$AM=i,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q;}_$AI(r,t=this,o,i){let s=this.strings,n=false;if(s===void 0)r=ir(this,r,t,0),n=!po(r)||r!==this._$AH&&r!==ht,n&&(this._$AH=r);else {let a=r,l,c;for(r=s[0],l=0;l<s.length-1;l++)c=ir(this,a[o+l],t,l),c===ht&&(c=this._$AH[l]),n||=!po(c)||c!==this._$AH[l],c===q?r=q:r!==q&&(r+=(c??"")+s[l+1]),this._$AH[l]=c;}n&&!i&&this.j(r);}j(r){r===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"");}},ai=class extends sr{constructor(){super(...arguments),this.type=3;}j(r){this.element[this.name]=r===q?void 0:r;}},li=class extends sr{constructor(){super(...arguments),this.type=4;}j(r){this.element.toggleAttribute(this.name,!!r&&r!==q);}},ci=class extends sr{constructor(r,t,o,i,s){super(r,t,o,i,s),this.type=5;}_$AI(r,t=this){if((r=ir(this,r,t,0)??q)===ht)return;let o=this._$AH,i=r===q&&o!==q||r.capture!==o.capture||r.once!==o.once||r.passive!==o.passive,s=r!==q&&(o===q||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,r),this._$AH=r;}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r);}},pi=class{constructor(r,t,o){this.element=r,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o;}get _$AU(){return this._$AM._$AU}_$AI(r){ir(this,r);}},pa={I:kr},Np=ui.litHtmlPolyfillSupport;Np?.(uo,kr),(ui.litHtmlVersions??=[]).push("3.3.2");var Cr=(e,r,t)=>{let o=t?.renderBefore??r,i=o._$litPart$;if(i===void 0){let s=t?.renderBefore??null;o._$litPart$=i=new kr(r.insertBefore(co(),s),s,void 0,t??{});}return i._$AI(e),i};var k=e=>e??q;var ua=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(r){this.ariaActiveDescendantElement=null,this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColIndexText="",this.ariaColSpan="",this.ariaControlsElements=null,this.ariaCurrent="",this.ariaDescribedByElements=null,this.ariaDescription="",this.ariaDetailsElements=null,this.ariaDisabled="",this.ariaErrorMessageElements=null,this.ariaExpanded="",this.ariaFlowToElements=null,this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLabelledByElements=null,this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaOwnsElements=null,this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRelevant="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowIndexText="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=r;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var de=function(e,r,t,o,i){if(typeof r=="function"?e!==r||true:!r.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r.set(e,t),t},wt=function(e,r,t,o){if(typeof r=="function"?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?o:t==="a"?o.call(e):o?o.value:r.get(e)},Ar,hi,di,ho,Us,fo,fi,nr,mo,Ie,mi,ha,da=e=>typeof e=="boolean"?e:e?.capture??false;var Ws=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(r,t,o){if(t==null)return;let i=da(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);if(s===void 0)s=new Map,i.set(r,s);else if(s.has(t))return;let n=typeof o=="object"&&o?o:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(r,t,o)),s.set(t,n??{});}removeEventListener(r,t,o){if(t==null)return;let i=da(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);s!==void 0&&(s.delete(t),s.size||i.delete(r));}dispatchEvent(r){let t=[this],o=this.__eventTargetParent;if(r.composed)for(;o;)t.push(o),o=o.__eventTargetParent;else for(;o&&o!==this.__host;)t.push(o),o=o.__eventTargetParent;let i=false,s=false,n=0,a=null,l=null,c=null,d=r.stopPropagation,u=r.stopImmediatePropagation;Object.defineProperties(r,{target:{get(){return a??l},...tt},srcElement:{get(){return r.target},...tt},currentTarget:{get(){return c},...tt},eventPhase:{get(){return n},...tt},composedPath:{value:()=>t,...tt},stopPropagation:{value:()=>{i=true,d.call(r);},...tt},stopImmediatePropagation:{value:()=>{s=true,u.call(r);},...tt}});let m=(S,w,E)=>{typeof S=="function"?S(r):typeof S?.handleEvent=="function"&&S.handleEvent(r),w.once&&E.delete(S);},g=()=>(c=null,n=0,!r.defaultPrevented),b=t.slice().reverse();a=!this.__host||!r.composed?this:null;let y=S=>{for(l=this;l.__host&&S.includes(l.__host);)l=l.__host;};for(let S of b){!a&&(!l||l===S.__host)&&y(b.slice(b.indexOf(S))),c=S,n=S===r.target?2:1;let w=S.__captureEventListeners.get(r.type);if(w){for(let[E,_]of w)if(m(E,_,w),s)return g()}if(i)return g()}let C=r.bubbles?t:[this];l=null;for(let S of C){!a&&(!l||S===l.__host)&&y(C.slice(0,C.indexOf(S)+1)),c=S,n=S===r.target?2:3;let w=S.__eventListeners.get(r.type);if(w){for(let[E,_]of w)if(m(E,_,w),s)return g()}if(i)return g()}return g()}},qs=Ws;var tt={__proto__:null};tt.enumerable=true;Object.freeze(tt);var Ks=(Ie=class{constructor(r,t={}){if(Ar.set(this,false),hi.set(this,false),di.set(this,false),ho.set(this,false),Us.set(this,Date.now()),fo.set(this,false),fi.set(this,void 0),nr.set(this,void 0),mo.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof t!="object"||!t)throw new Error('The "options" argument must be an object');let{bubbles:o,cancelable:i,composed:s}=t;de(this,Ar,!!i),de(this,hi,!!o),de(this,di,!!s),de(this,fi,`${r}`),de(this,nr,null),de(this,mo,false);}initEvent(r,t,o){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){de(this,ho,true);}get target(){return wt(this,nr,"f")}get currentTarget(){return wt(this,nr,"f")}get srcElement(){return wt(this,nr,"f")}get type(){return wt(this,fi,"f")}get cancelable(){return wt(this,Ar,"f")}get defaultPrevented(){return wt(this,Ar,"f")&&wt(this,ho,"f")}get timeStamp(){return wt(this,Us,"f")}composedPath(){return wt(this,mo,"f")?[wt(this,nr,"f")]:[]}get returnValue(){return !wt(this,Ar,"f")||!wt(this,ho,"f")}get bubbles(){return wt(this,hi,"f")}get composed(){return wt(this,di,"f")}get eventPhase(){return wt(this,mo,"f")?Ie.AT_TARGET:Ie.NONE}get cancelBubble(){return wt(this,fo,"f")}set cancelBubble(r){r&&de(this,fo,true);}stopPropagation(){de(this,fo,true);}get isTrusted(){return  false}},Ar=new WeakMap,hi=new WeakMap,di=new WeakMap,ho=new WeakMap,Us=new WeakMap,fo=new WeakMap,fi=new WeakMap,nr=new WeakMap,mo=new WeakMap,Ie.NONE=0,Ie.CAPTURING_PHASE=1,Ie.AT_TARGET=2,Ie.BUBBLING_PHASE=3,Ie);Object.defineProperties(Ks.prototype,{initEvent:tt,stopImmediatePropagation:tt,preventDefault:tt,target:tt,currentTarget:tt,srcElement:tt,type:tt,cancelable:tt,defaultPrevented:tt,timeStamp:tt,composedPath:tt,returnValue:tt,bubbles:tt,composed:tt,eventPhase:tt,cancelBubble:tt,stopPropagation:tt,isTrusted:tt});var fa=(ha=class extends Ks{constructor(r,t={}){super(r,t),mi.set(this,void 0),de(this,mi,t?.detail??null);}initCustomEvent(r,t,o,i){throw new Error("Method not implemented.")}get detail(){return wt(this,mi,"f")}},mi=new WeakMap,ha);Object.defineProperties(fa.prototype,{detail:tt});var Gs=Ks,Ys=fa;var zt;(zt=class{constructor(){this.STYLE_RULE=1,this.CHARSET_RULE=2,this.IMPORT_RULE=3,this.MEDIA_RULE=4,this.FONT_FACE_RULE=5,this.PAGE_RULE=6,this.NAMESPACE_RULE=10,this.KEYFRAMES_RULE=7,this.KEYFRAME_RULE=8,this.SUPPORTS_RULE=12,this.COUNTER_STYLE_RULE=11,this.FONT_FEATURE_VALUES_RULE=14,this.__parentStyleSheet=null,this.cssText="";}get parentRule(){return null}get parentStyleSheet(){return this.__parentStyleSheet}get type(){return 0}},zt.STYLE_RULE=1,zt.CHARSET_RULE=2,zt.IMPORT_RULE=3,zt.MEDIA_RULE=4,zt.FONT_FACE_RULE=5,zt.PAGE_RULE=6,zt.NAMESPACE_RULE=10,zt.KEYFRAMES_RULE=7,zt.KEYFRAME_RULE=8,zt.SUPPORTS_RULE=12,zt.COUNTER_STYLE_RULE=11,zt.FONT_FEATURE_VALUES_RULE=14,zt);globalThis.Event??=Gs;globalThis.CustomEvent??=Ys;var ma=new WeakMap,go=e=>{let r=ma.get(e);return r===void 0&&ma.set(e,r=new Map),r},Up=class extends qs{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(go(this)).map(([r,t])=>({name:r,value:t}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(r,t){go(this).set(r,String(t));}removeAttribute(r){go(this).delete(r);}toggleAttribute(r,t){if(this.hasAttribute(r)){if(t===void 0||!t)return this.removeAttribute(r),false}else return t===void 0||t?(this.setAttribute(r,""),true):false;return  true}hasAttribute(r){return go(this).has(r)}attachShadow(r){let t={host:this};return this.__shadowRootMode=r.mode,r&&r.mode==="open"&&(this.__shadowRoot=t),t}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let r=new ua(this);return this.__internals=r,r}getAttribute(r){return go(this).get(r)??null}};var Wp=class extends Up{},Js=Wp;globalThis.litServerRoot??=Object.defineProperty(new Js,"localName",{get(){return "lit-server-root"}});function qp(){let e,r;return {promise:new Promise((o,i)=>{e=o,r=i;}),resolve:e,reject:r}}var Xs=class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map;}define(r,t){if(this.__definitions.has(r))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${r}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${r}" has already been used with this registry`);if(this.__reverseDefinitions.has(t))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(t)}`);t.__localName=r,this.__definitions.set(r,{ctor:t,observedAttributes:t.observedAttributes??[]}),this.__reverseDefinitions.set(t,r),this.__pendingWhenDefineds.get(r)?.resolve(t),this.__pendingWhenDefineds.delete(r);}get(r){return this.__definitions.get(r)?.ctor}getName(r){return this.__reverseDefinitions.get(r)??null}upgrade(r){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(r){let t=this.__definitions.get(r);if(t)return t.ctor;let o=this.__pendingWhenDefineds.get(r);return o||(o=qp(),this.__pendingWhenDefineds.set(r,o)),o.promise}},Kp=Xs;var ga=new Kp;var bo=globalThis,gi=bo.ShadowRoot&&(bo.ShadyCSS===void 0||bo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qs=Symbol(),ba=new WeakMap,vo=class{constructor(r,t,o){if(this._$cssResult$=true,o!==Qs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=t;}get styleSheet(){let r=this.o,t=this.t;if(gi&&r===void 0){let o=t!==void 0&&t.length===1;o&&(r=ba.get(t)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),o&&ba.set(t,r));}return r}toString(){return this.cssText}},va=e=>new vo(typeof e=="string"?e:e+"",void 0,Qs),x=(e,...r)=>{let t=e.length===1?e[0]:r.reduce((o,i,s)=>o+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new vo(t,e,Qs)},ya=(e,r)=>{if(gi)e.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of r){let o=document.createElement("style"),i=bo.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,e.appendChild(o);}},Zs=gi||bo.CSSStyleSheet===void 0?e=>e:e=>e instanceof CSSStyleSheet?(r=>{let t="";for(let o of r.cssRules)t+=o.cssText;return va(t)})(e):e;var{is:Gp,defineProperty:Yp,getOwnPropertyDescriptor:Xp,getOwnPropertyNames:Jp,getOwnPropertySymbols:Qp,getPrototypeOf:Zp}=Object,xo=globalThis;xo.customElements??=ga;var xa=xo.trustedTypes,tu=xa?xa.emptyScript:"",eu=xo.reactiveElementPolyfillSupport,yo=(e,r)=>e,Me={toAttribute(e,r){switch(r){case Boolean:e=e?tu:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e);}return e},fromAttribute(e,r){let t=e;switch(r){case Boolean:t=e!==null;break;case Number:t=e===null?null:Number(e);break;case Object:case Array:try{t=JSON.parse(e);}catch{t=null;}}return t}},bi=(e,r)=>!Gp(e,r),_a={attribute:true,type:String,converter:Me,reflect:false,useDefault:false,hasChanged:bi};Symbol.metadata??=Symbol("metadata"),xo.litPropertyMetadata??=new WeakMap;var _e=class extends(globalThis.HTMLElement??Js){static addInitializer(r){this._$Ei(),(this.l??=[]).push(r);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,t=_a){if(t.state&&(t.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(r)&&((t=Object.create(t)).wrapped=true),this.elementProperties.set(r,t),!t.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(r,o,t);i!==void 0&&Yp(this.prototype,r,i);}}static getPropertyDescriptor(r,t,o){let{get:i,set:s}=Xp(this.prototype,r)??{get(){return this[t]},set(n){this[t]=n;}};return {get:i,set(n){let a=i?.call(this);s?.call(this,n),this.requestUpdate(r,a,o);},configurable:true,enumerable:true}}static getPropertyOptions(r){return this.elementProperties.get(r)??_a}static _$Ei(){if(this.hasOwnProperty(yo("elementProperties")))return;let r=Zp(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties);}static finalize(){if(this.hasOwnProperty(yo("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(yo("properties"))){let t=this.properties,o=[...Jp(t),...Qp(t)];for(let i of o)this.createProperty(i,t[i]);}let r=this[Symbol.metadata];if(r!==null){let t=litPropertyMetadata.get(r);if(t!==void 0)for(let[o,i]of t)this.elementProperties.set(o,i);}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(r){let t=[];if(Array.isArray(r)){let o=new Set(r.flat(1/0).reverse());for(let i of o)t.unshift(Zs(i));}else r!==void 0&&t.push(Zs(r));return t}static _$Eu(r,t){let o=t.attribute;return o===false?void 0:typeof o=="string"?o:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this));}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.();}removeController(r){this._$EO?.delete(r);}_$E_(){let r=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(r.set(o,this[o]),delete this[o]);r.size>0&&(this._$Ep=r);}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ya(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(r=>r.hostConnected?.());}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.());}attributeChangedCallback(r,t,o){this._$AK(r,o);}_$ET(r,t){let o=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,o);if(i!==void 0&&o.reflect===true){let s=(o.converter?.toAttribute!==void 0?o.converter:Me).toAttribute(t,o.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null;}}_$AK(r,t){let o=this.constructor,i=o._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=o.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Me;this._$Em=i;let a=n.fromAttribute(t,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null;}}requestUpdate(r,t,o,i=false,s){if(r!==void 0){let n=this.constructor;if(i===false&&(s=this[r]),o??=n.getPropertyOptions(r),!((o.hasChanged??bi)(s,t)||o.useDefault&&o.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(n._$Eu(r,o))))return;this.C(r,t,o);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(r,t,{useDefault:o,reflect:i,wrapped:s},n){o&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??t??this[r]),s!==true||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||o||(t=void 0),this._$AL.set(r,t)),i===true&&this._$Em!==r&&(this._$Eq??=new Set).add(r));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0;}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,s]of o){let{wrapped:n}=s,a=this[i];n!==true||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a);}}let r=false,t=this._$AL;try{r=this.shouldUpdate(t),r?(this.willUpdate(t),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(t)):this._$EM();}catch(o){throw r=false,this._$EM(),o}r&&this._$AE(t);}willUpdate(r){}_$AE(r){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(r)),this.updated(r);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return  true}update(r){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(r){}firstUpdated(r){}};_e.elementStyles=[],_e.shadowRootOptions={mode:"open"},_e[yo("elementProperties")]=new Map,_e[yo("finalized")]=new Map,eu?.({ReactiveElement:_e}),(xo.reactiveElementVersions??=[]).push("2.1.2");var tn=globalThis,dt=class extends _e{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Cr(t,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return ht}};dt._$litElement$=true,dt.finalized=true,tn.litElementHydrateSupport?.({LitElement:dt});var ru=tn.litElementPolyfillSupport;ru?.({LitElement:dt});(tn.litElementVersions??=[]).push("4.2.2");var wa=e=>(r,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(e,r);}):customElements.define(e,r);};var ou={attribute:true,type:String,converter:Me,reflect:false,hasChanged:bi},iu=(e=ou,r,t)=>{let{kind:o,metadata:i}=t,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),o==="setter"&&((e=Object.create(e)).wrapped=true),s.set(t.name,e),o==="accessor"){let{name:n}=t;return {set(a){let l=r.get.call(this);r.set.call(this,a),this.requestUpdate(n,l,e,true,a);},init(a){return a!==void 0&&this.C(n,void 0,e,a),a}}}if(o==="setter"){let{name:n}=t;return function(a){let l=this[n];r.call(this,a),this.requestUpdate(n,l,e,true,a);}}throw Error("Unsupported decorator location: "+o)};function h(e){return (r,t)=>typeof t=="object"?iu(e,r,t):((o,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,o),n?Object.getOwnPropertyDescriptor(i,s):void 0})(e,r,t)}function $(e){return h({...e,state:true,attribute:false})}function ze(e){return (r,t)=>{let o=typeof r=="function"?r:r[t];Object.assign(o,e);}}var we=(e,r,t)=>(t.configurable=true,t.enumerable=true,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(e,r,t),t);function O(e,r){return (t,o,i)=>{let s=n=>n.renderRoot?.querySelector(e)??null;return we(t,o,{get(){return s(this)}})}}var su;function Sa(e){return (r,t)=>we(r,t,{get(){return (this.renderRoot??(su??=document.createDocumentFragment())).querySelectorAll(e)}})}function ka(e){return (r,t)=>{let{slot:o,selector:i}=e??{},s="slot"+(o?`[name=${o}]`:":not([name])");return we(r,t,{get(){let n=this.renderRoot?.querySelector(s),a=n?.assignedElements(e)??[];return i===void 0?a:a.filter(l=>l.matches(i))}})}}function Le(e){return e&&typeof e=="object"&&e.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function Ca(e,r){return Le(e)?Object.assign({},e,r):Object.assign({value:e,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},r)}function Aa(e,r,t){if(!r||r.length===0)return e;let o=Array.isArray(r)?r:r.split("."),i,s=e;for(let n=0;n<o.length;n++){let a=o[n];if(a in s)i=s[a];else return t;s=i;}return i}function vi(e,r,t,o){if(!r||!e)return e;let i=r;if(i.length===0)return typeof e=="object"&&Object.assign(e,t),e;{let s=e,n=[],a=(l,c,d)=>{l[c]=d;};for(let l=0;l<i.length;l++){let c=i[l];if(n.push(c),s)if(Array.isArray(s)){let d=parseInt(c,10);if(Number.isNaN(d)||d<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===i.length-1?a(s,d,t):s=s[d];}else s instanceof Map||s instanceof WeakMap?l===i.length-1?s.set(c,t):(s.has(c)||s.set(c,{}),s=s.get(c)):typeof s=="object"&&c in s?l===i.length-1?a(s,c,t):s=s[c]:(s[c]=l===i.length-1?t:{},s=s[c]);else s[c]=l===i.length-1?t:{},s=s[c];}}return e}function nu(e){if(e==null)return "";let r=typeof e;if(r==="boolean")return String(e);if(Array.isArray(e))return e.join(",");if(r==="object")try{return JSON.stringify(e)}catch{return "{}"}return String(e)}function $a(e,r){if(!r)return e;let t=r.datatype||"any";if(t==="any")return e;if(t==="string")return nu(e);if(t==="number")return Number(e);if(Array.isArray(e))return [...e];if(typeof e=="object")return {...e};if(typeof e=="string"){if(t==="boolean")return e.toLowerCase()==="true";if(t==="array")return e.split(",").map(o=>o.trim());if(t==="object")try{return JSON.parse(e)}catch{return {}}}return t==="boolean"?!!e:e}function Ea(e,r,t){return e?t(r):r}var en="";function Oa(e){en=e;}function Ta(e=""){if(!en){let r=[...document.getElementsByTagName("script")],t=r.find(o=>o.hasAttribute("data-shoelace"));if(t)Oa(t.getAttribute("data-shoelace"));else {let o=r.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),i="";o&&(i=o.getAttribute("src")),Oa(i.split("/").slice(0,-1).join("/"));}}return en.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}var au={name:"default",resolver:e=>Ta(`assets/icons/${e}.svg`)},Ra=au;var Ia={caret:`
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
  `},lu={name:"system",resolver:e=>e in Ia?`data:image/svg+xml,${encodeURIComponent(Ia[e])}`:""},Ma=lu;var yi=[Ra,Ma],xi=[];function rn(e){xi.push(e);}function on(e){xi=xi.filter(r=>r!==e);}function $r(e){return yi.find(r=>r.name===e)}function sn(e,r){za(e),yi.push({name:e,resolver:r.resolver,mutator:r.mutator,spriteSheet:r.spriteSheet}),xi.forEach(t=>{t.library===e&&t.setIcon();});}function za(e){yi=yi.filter(r=>r.name!==e);}var Va=Object.defineProperty,cu=Object.defineProperties,pu=Object.getOwnPropertyDescriptor,uu=Object.getOwnPropertyDescriptors,La=Object.getOwnPropertySymbols,hu=Object.prototype.hasOwnProperty,du=Object.prototype.propertyIsEnumerable,nn=(e,r)=>(r=Symbol[e])?r:Symbol.for("Symbol."+e),an=e=>{throw TypeError(e)},Pa=(e,r,t)=>r in e?Va(e,r,{enumerable:true,configurable:true,writable:true,value:t}):e[r]=t,Ot=(e,r)=>{for(var t in r||(r={}))hu.call(r,t)&&Pa(e,t,r[t]);if(La)for(var t of La(r))du.call(r,t)&&Pa(e,t,r[t]);return e},Se=(e,r)=>cu(e,uu(r)),p=(e,r,t,o)=>{for(var i=o>1?void 0:o?pu(r,t):r,s=e.length-1,n;s>=0;s--)(n=e[s])&&(i=(o?n(r,t,i):n(i))||i);return o&&i&&Va(r,t,i),i},Da=(e,r,t)=>r.has(e)||an("Cannot "+t),Fa=(e,r,t)=>(Da(e,r,"read from private field"),r.get(e)),Ha=(e,r,t)=>r.has(e)?an("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,t),ja=(e,r,t,o)=>(Da(e,r,"write to private field"),r.set(e,t),t),fu=function(e,r){this[0]=e,this[1]=r;},Ba=e=>{var r=e[nn("asyncIterator")],t=false,o,i={};return r==null?(r=e[nn("iterator")](),o=s=>i[s]=n=>r[s](n)):(r=r.call(e),o=s=>i[s]=n=>{if(t){if(t=false,s==="throw")throw n;return n}return t=true,{done:false,value:new fu(new Promise(a=>{var l=r[s](n);l instanceof Object||an("Object expected"),a(l);}),1)}}),i[nn("iterator")]=()=>i,o("next"),"throw"in r?o("throw"):i.throw=s=>{throw s},"return"in r&&o("return"),i};var ln="https://unpkg.com/lucide-static@latest/icons/{name}.svg",cn={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>',bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>'},Na=e=>e in cn?`data:image/svg+xml,${encodeURIComponent(cn[e])}`:ln.replace("{name}",e),mu=e=>{e&&e.setAttribute("stroke-width","1");};function ar(e,r){let t=e??ln;if(!t.includes("{name}"))throw new Error('icon url must include "{name}"');ln=t,r&&Object.entries(r).forEach(([i,s])=>{cn[i]=s;}),$r("default").resolver!==Na&&sn("default",{resolver:Na,mutator:mu});}function gu(e){e=e.replace(/^#/,"");let r=parseInt(e.substring(0,2),16)/255,t=parseInt(e.substring(2,4),16)/255,o=parseInt(e.substring(4,6),16)/255,i=Math.max(r,t,o),s=Math.min(r,t,o),n=0,a=0,l=(i+s)/2;if(i!==s){let c=i-s;switch(a=l>.5?c/(2-i-s):c/(i+s),i){case r:n=(t-o)/c+(t<o?6:0);break;case t:n=(o-r)/c+2;break;case o:n=(r-t)/c+4;break}n/=6;}return {h:Math.round(n*360),s:Math.round(a*100),l:Math.round(l*100)}}function bu(e,r,t){r/=100,t/=100;let o=(1-Math.abs(2*t-1))*r,i=o*(1-Math.abs(e/60%2-1)),s=t-o/2,n=0,a=0,l=0;0<=e&&e<60?(n=o,a=i,l=0):60<=e&&e<120?(n=i,a=o,l=0):120<=e&&e<180?(n=0,a=o,l=i):180<=e&&e<240?(n=0,a=i,l=o):240<=e&&e<300?(n=i,a=0,l=o):300<=e&&e<360&&(n=o,a=0,l=i),n=Math.round((n+s)*255),a=Math.round((a+s)*255),l=Math.round((l+s)*255);let c=d=>{let u=d.toString(16);return u.length===1?"0"+u:u};return `#${c(n)}${c(a)}${c(l)}`}function Ua(e){let r=gu(e),t={50:{hDiff:3.3,sFactor:.74,lFactor:.44},100:{hDiff:3.7,sFactor:.82,lFactor:.59},200:{hDiff:3,sFactor:.88,lFactor:.65},300:{hDiff:3.4,sFactor:.94,lFactor:.76},400:{hDiff:2.4,sFactor:.94,lFactor:.93},500:{hDiff:0,sFactor:1,lFactor:1},600:{hDiff:-1,sFactor:1.14,lFactor:1.2},700:{hDiff:-1,sFactor:1.16,lFactor:1.48},800:{hDiff:-0.9,sFactor:1.16,lFactor:1.73},900:{hDiff:-1.2,sFactor:1.16,lFactor:1.89},950:{hDiff:-13.7,sFactor:1.16,lFactor:2}},o={};for(let[i,s]of Object.entries(t)){let n=Math.max(0,Math.min(360,r.h+s.hDiff)),a=Math.max(0,Math.min(100,r.s*s.sFactor)),l=Math.max(0,Math.min(100,r.l*s.lFactor));o[`--sl-color-primary-${i}`]=bu(n,a,l);}return o}function vu(e){if(!e.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){console.error("Invalid color format. Please provide a valid hex color (e.g., #3B82F6)");return}try{let r=Ua(e),t=document.getElementById("auto-styles");t||(t=document.createElement("style"),t.id="auto-styles",document.head.appendChild(t));let o=`:root {
`;Object.entries(r).forEach(([s,n])=>{o+=`  ${s}: ${n};
`;}),o+="}",t.textContent=o;let i=document.body;return r["--sl-color-primary-500"]&&i.style.setProperty("--sl-color-primary-500",r["--sl-color-primary-500"]),console.log("Primary color changed successfully"),r}catch(r){console.error("Failed to change theme color:",r);}}globalThis.changePrimaryColor=vu;function yu(e,...r){let t=e.valueOf(),o={},i=[...r];try{if(i.length===0)return t;if(i.length===1){let s=i[0];if(s==null)return t;Array.isArray(s)?i=s:typeof s=="object"&&(o=s,i=[]);}return t=t.replace(/\{\s*([a-zA-Z\d]*)\s*\}/g,(s,n)=>{let a;return n&&o.hasOwnProperty(n)?a=o[n]:!n&&i.length>0&&(a=i.shift()),a==null?"":(typeof a=="function"&&(a=a()),String(a))}),t}catch{return t}}String.prototype.params=function(){return yu(this,...arguments)};var ke=class extends Error{},_o=class extends ke{},Er=class extends ke{},_i=class extends ke{},wi=class extends ke{},wo=class extends ke{},Si=class extends ke{},Or=class extends ke{constructor(r){super(r),this.name="ValidateError";}};var ki="__AS_SKIP_PROXY__",Tt="__OBSERVER_TYPE__",Wa="__AS_OBSERVER_DESCRIPTOR_BUILDER__",Ci="__AS_OBSERVER_DESCRIPTOR__";var qa="__batch_update__",Ka="__AS_ASYNC_COMPUTED_VALUE__";var Tr="AutoStoreConfigManager";function Ai(e){return e.constructor.name==="AsyncFunction"}function So(e){return e?e.map(r=>Array.isArray(r)?r:typeof r=="string"?["/","./","../"].some(t=>r.startsWith(t))?r:r.includes(".")?r.split("."):r.split("."):[]):[]}function Rr(){return {async:false,enable:true,depends:[],immediate:"auto",extras:void 0}}function $i(){let e=arguments[0];if(typeof e!="function")throw new Error("computed getter must be a function");let r=[],t=Object.assign({},Rr());if(arguments.length===1)r=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))t.depends=arguments[1];else if(typeof arguments[1]=="object")Object.assign(t,arguments[1]),t.depends=So(t.depends);else throw new wi;else arguments.length>=3&&(r=So(arguments[1]),Object.assign(t,arguments[2]),t.depends=r);t.async=t.async===true||Ai(e)||arguments.length>=2&&Array.isArray(arguments[1]);let o=()=>{let i={type:t.async?"async":"sync",getter:e,options:t,[Ci]:true};return t.async&&(i.liteAsync=true),i};return o[Wa]=true,o[Tt]=t.async?"async":"sync",o}function pn(e){return e?e.some(r=>typeof r=="string"?r.startsWith("./")||r.startsWith("../")||r.startsWith("@")?false:!["CURRENT","SELF","PARENT"].includes(r):true):false}function Ei(e){return typeof e=="object"&&e.hasOwnProperty("type")&&typeof e.type=="string"&&e.hasOwnProperty("getter")&&typeof e.getter=="function"&&e.hasOwnProperty("options")&&typeof e.options=="object"}function lr(e){try{return e[ki]===!0}catch{}return  false}function Oi(e,r){if(e===r)return  true;if(e===null||r===null||typeof e!=typeof r)return  false;if(typeof e=="object"){if(Array.isArray(e)&&Array.isArray(r))return e.length!==r.length?false:e.every((t,o)=>Oi(t,r[o]));if(!Array.isArray(e)&&!Array.isArray(r)){let t=Object.keys(e);return t.length!==Object.keys(r).length?false:t.every(o=>Oi(e[o],r[o]))}else return  false}return  false}function Ir(e){return toString.call(e)==="[object Map]"}function Ti(e,r){let t=o=>!!(o.startsWith("./")||o.startsWith("../")||["CURRENT","SELF","PARENT"].includes(o));if(typeof e=="string")if(t(e)){if(!r)return [e];if(e==="SELF")return r;if(e==="CURRENT"||e==="PARENT")return r.slice(0,-1);if(e.startsWith("./")){let o=e.slice(2),i=r.slice(0,-1);return o===""?i:[...i,...o.split(".")]}if(e.startsWith("../")){let o=e.slice(3),i=r.length>=2?r.slice(0,-2):void 0;return i===void 0?void 0:o.startsWith("../")?Ti(o,i):o===""?i:[...i,...o.split(".")]}return [e]}else return e.split(".");if(e.length>0&&t(e[0])){if(!r)return e;let o=e[0],i=e.slice(1),s=Ti(o,r);return s===void 0?void 0:[...s,...i]}return e}function Mr(e,r){return !e||!r||e.length!==r.length?false:e.every((t,o)=>t===r[o])}function Ri(e){return Array.isArray(e)?e:e.split(".")}function Ga(e,r){let t=Ri(e),o=Array.isArray(r)?r:r===""?[]:r.split(".");return o.length===0||Mr(t,o)?true:(o[o.length-1]==="**"&&(o[o.length-1]="*",o.splice(o.length-1,0,...Array.from({length:t.length-o.length}).fill("*"))),t.length!==o.length?false:o.every((s,n)=>s==="*"||s==="**"?true:s===t[n]))}function Ya(e){return e==null||typeof e!="object"?false:Object.prototype.toString.call(e)==="[object Object]"}function Pe(e){return e&&typeof e=="object"&&(e.hasOwnProperty(Ka)||"value"in e&&"loading"in e&&"retry"in e)}function Xa(e){try{return !!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function"&&typeof e.catch=="function"&&(e instanceof Promise||Object.prototype.toString.call(e)==="[object Promise]")}catch{return  false}}function Ja(e){return typeof e=="function"&&e[Tt]}function un(e,r){let t=e.get(r);if(t!==void 0)return t;let o=e.get(Number(r)||r);if(o!==void 0)return o}function xu(e){let r="";for(let t=0;t<e.length;t++)e[t]==="\\"&&t+1<e.length?(r+=e[t+1],t++):r+=e[t];return r}function hn(e,r="."){return e.replace(/\\/g,"\\\\").replace(new RegExp(`\\${r}`,"g"),`\\${r}`)}function Ve(e,r="."){let t=[],o="";for(let i=0;i<e.length;i++){let s=e[i];s==="\\"&&i+1<e.length?(o+=s,o+=e[i+1],i++):s===r?(t.push(o),o=""):o+=s;}return t.push(o),t.map(xu)}function et(e,r,t){if(!r||r.length===0)return e;let o=Array.isArray(r)?r:Ve(r),i,s=e;for(let n=0;n<o.length;n++){let a=o[n];if(Ir(s))i=un(s,a);else if(a in s)i=s[a];else return t;s=i;}return i}function at(e){try{["object","function"].includes(typeof e)&&(e[ki]=!0);}catch{}return e}function Ce(e,r,t,o){if(!r||!e)return e;let i=r;if(i.length===0)return typeof e=="object"&&Object.assign(e,t),e;{let s=e,n=[],a=(l,c,d)=>{l[c]=d;};for(let l=0;l<i.length;l++){let c=i[l];if(n.push(c),s)if(Array.isArray(s)){let d=parseInt(c,10);if(Number.isNaN(d)||d<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===i.length-1?a(s,d,t):s=s[d];}else s instanceof Map||s instanceof WeakMap?l===i.length-1?s.set(c,t):(s.has(c)||s.set(c,{}),s=s.get(c)):typeof s=="object"&&c in s?l===i.length-1?a(s,c,t):s=s[c]:(s[c]=l===i.length-1?t:{},s=s[c]);else s[c]=l===i.length-1?t:{},s=s[c];}}return e}function De(e){return (e||["ROOT"]).map(r=>Array.isArray(r)?r.map(t=>hn(t)).join("."):hn(r)).join(".")}function Ii(){return Math.random().toString(36).slice(2)}function ko(e,r,t){let o=e&&!e[0].startsWith("#");if(Array.isArray(r))return r;if(r==="self")return o?e:void 0;if(r==="root")return o?[]:void 0;if(r==="parent")return o?e.slice(0,-2):void 0;if(r==="current")return o?e.slice(0,-1):void 0;if(typeof r=="string")return r.startsWith("./")?o?[...e.slice(0,-1),...r.slice(2).split(".")]:void 0:r.startsWith("../")?o?ko(e.slice(0,-1),r.slice(3),true):void 0:r.startsWith("/")?r.replace(/^(\/)*/,"").split("."):o&&t?[...e.slice(0,-1),...r.split(".")]:r.split(".")}function zr(e,r){return r?r.map(t=>ko(e,t)).filter(t=>t!==void 0):[]}function Mi(e,r){function t(o,i){for(let s in o){let n=o[s];typeof r=="function"&&r({value:n,key:s,parent:o,path:i.concat(s)}),typeof n=="object"&&!lr(n)&&t(n,i.concat(s));}}t(e,[]);}function zi(e){return typeof e=="object"?JSON.parse(JSON.stringify(e)):e}function Li(e){let r=new Map;return e.forEach(t=>{let o=t.join(".");r.set(o,t);}),Array.from(r.values())}function Co(e,r){return e.length>r.length?false:e.every((t,o)=>t===r[o])}function St(e){return e?typeof e=="function":false}function Pi(e,r){let{reserveAsync:t,includeFunc:o}=Object.assign({reserveAsync:false},r);if(Array.isArray(e)){let i=[...e];for(let s=0;s<i.length;s++)i[s]=Pi(i[s],r);return i}else if(typeof e=="object"){if(!t&&Pe(e))return e.value;{let i={...e};for(let s in i)i[s]=Pi(i[s],r);return i}}return o&&St(e)?`\`\`\`${e.toString()}\`\`\``:e}function Vi(e){return typeof e=="function"&&e[Tt]==="schema"}var Qa="__WITH_SCHEMA_VALUE__";function Za(e,r){return Object.assign({validate:"throw"},r,{[Qa]:true,value:e})}function _u(e){return e&&typeof e=="object"&&e[Qa]===true}function tl(e){return _u(e)?[e.value,e]:[e,void 0]}function el(e,r,t,o){try{let i=e.emit(r,t);return o(i)}catch(i){e.logger.error(`Error while emit store event ${r}: ${i.message}`);return}}function rl(e,r,t,o,i){return el(e,"observer/initial",{path:r,value:t,parentPath:o,parent:i},s=>!s.some(n=>n===!1))}function ol(e,r,t){try{e.emit(r,t);}catch(o){e.logger.error(`Error while emit store event ${r}: ${o.message}`);}}function st(e,r,t,o=false){o?setTimeout(()=>{ol(e,r,t);},0):ol(e,r,t);}function il(e){return e instanceof Error?e:new Error(e)}var Di=class extends Map{constructor(t){super();this.store=t;}get enable(){return this.store.options.enableComputed}set enable(t){this.store.options.enableComputed=t;}create(){let t=Ei(arguments[0])?arguments[0]:$i(...arguments)(),o=!!t.options.anchor;if(o){let s=t.options.anchor.path;if(!s||s.length===0)throw new wo("When anchor is provided, anchor.path is required to resolve relative paths");t.options.anchor.parentPath||(t.options.anchor.parentPath=s.slice(0,-1));}if(t.options.async){let s=t.options.depends,n=Array.isArray(s)&&s.length>0&&!pn(s);if(!o&&n)throw new Si("The depends of the dynamic computed object must be absolute paths, or provide an anchor to enable relative paths")}let i=t.options.scope;if(o)i==="ROOT"&&(t.options.scope="ROOT");else if(i===void 0||i==="ROOT")t.options.scope="ROOT";else if(!pn([i]))throw new wo("The scope of the dynamic computed object must be the root state object or an absolute path, or provide an anchor to enable relative paths");return this.store.createObserverObject(t)}async runGroup(t,o,i){return await this.run(s=>s.group===t,o,i)}async run(){if(arguments.length===0)return Promise.all([...this.values()].map(n=>n.run()));let t;typeof arguments[0]=="function"?t=arguments[0]:typeof arguments[0]=="string"&&(t=n=>n.id===arguments[0]);let o=Object.assign({},arguments[1]),i=Object.assign({wait:false,timeout:0},arguments[2]),s={};return new Promise((n,a)=>{if(i.wait){let l;o.onDone=({id:c})=>{if(s[c]=true,Object.values(s).every(d=>d))return clearTimeout(l),true},i.timeout>0&&(l=setTimeout(()=>{a(new Er);},i.timeout));}Promise.all([...this.values()].filter(l=>t(l)?(s[l.id]=false,true):false).map(l=>l.run(o))),i.wait||n();})}async enableGroup(t){for(let o of this.values())o.options.enable=t;}delete(t){let o=this.get(t);return o?(o.destroy(),true):Map.prototype.delete.call(this,t)}find(t){if(!t)return;let o=Ri(t);for(let i of this.values())if(Mr(i.path,o))return i}};function sl(e,r,t,o,i){return t==="push"?(...s)=>{let n=r.length,a=o.apply(r,s);if(r.length>n){let l=Array.from({length:r.length-n},(c,d)=>d+n);e({type:"insert",path:i,indexs:l,value:s,oldValue:void 0,parentPath:i,parent:r});}return a}:t==="pop"?()=>{let s=r.length,n=o.apply(r);return r.length===s-1&&e({type:"remove",path:i,indexs:[s-1],value:[n],oldValue:void 0,parentPath:i,parent:r}),n}:t==="splice"?(s,n,...a)=>{let l=n===void 0&&a.length===0?o.apply(r,[s]):o.apply(r,[s,n,...a]);if(l.length>0||n===void 0){let c=n===void 0?[]:Array.from({length:l.length},(d,u)=>s+u);e({type:"remove",path:i,indexs:c,value:l,oldValue:void 0,parentPath:i,parent:r});}if(a.length>0){let c=Array.from({length:a.length},(d,u)=>s+u);e({type:"insert",path:i,indexs:c,value:a,oldValue:void 0,parentPath:i,parent:r});}return l}:t==="unshift"?(...s)=>{let n=r.length,a=o.apply(r,s);if(r.length>n){let l=Array.from({length:r.length-n},(c,d)=>d);e({type:"insert",path:i,indexs:l,value:s,oldValue:void 0,parentPath:i,parent:r});}return a}:t==="shift"?()=>{let s=r.length,n=o.apply(r);return r.length===s-1&&e({type:"remove",path:i,indexs:[0],value:[n],oldValue:void 0,parentPath:i,parent:r}),n}:t==="fill"?(s,n,a)=>{let l=o.apply(r,[s,n,a]),c=n??0,d=a??r.length,u=Array.from({length:d-c},(g,b)=>b+c),m=Array.from({length:d-c},()=>s);return e({type:"update",path:i,indexs:u,value:m,oldValue:void 0,parentPath:i,parent:r}),l}:t==="concat"?(...s)=>{let n=r.length,a=o.apply(r,s),l=Array.from({length:s.length},(c,d)=>n+d);return e({type:"insert",path:i,indexs:l,value:s,oldValue:void 0,parentPath:i,parent:r}),a}:o}function nl(e){return typeof e=="number"||typeof e=="string"&&!Number.isNaN(parseInt(e))}var dn=Symbol("__NOTIFY__");function wu(e){if(this.options.validators){let r=e.join(this.options.delimiter||".");if(this.options.validators[r])return this.options.validators[r];let t=Object.keys(this.options.validators);for(let o of t)if(Ga(e,o))return this.options.validators[o]}return this.options.validate}function Su(e,r,t,o,i){let s=i?.onInvalid||this._updateValidateBehavior;if(s==="none")return  true;let n=wu.call(this,r);if(typeof n!="function")return  true;let a=true,l,c=r.join("."),d=(this.options.configKey&&this.options.configKey.trim().length>0?`${this.options.configKey.trim()}/${c}`:c).replaceAll("/",".");try{if(n.call(this,t,o,r)===!1)throw new Or;this.configManager&&(delete this.configManager.errors[d],d in this.configManager.state&&(this.configManager.state[d].errorMessage=null)),this.errors&&delete this.errors[c];}catch(u){l=u;let m=n.getErrorMessage?.(u)||u.message||u.stack;if(this.configManager){let b=this.configManager?.errors;b&&(b[d]=m),d in this.configManager.state&&(this.configManager.state[d].errorMessage=m);}this.errors[c]=m;let g=s||u.onInvalid||n.onInvalid||this.options.onInvalid||"throw";if(g==="pass")a=true;else if(g==="ignore")a=false;else if(g==="throw-pass")a=u;else throw a=false,u}finally{this.emit("validate",{path:r,newValue:t,oldValue:o,error:l});}return a}function al(e,r,t,o,i){if(lr(e)||typeof e!="object"||e===null)return e;if(t.has(e))return t.get(e);let s=new Proxy(e,{get:(n,a,l)=>{let c=Reflect.get(n,a,l);if(typeof a!="string")return c;let d=[...r,String(a)];if(typeof c=="function"||!Object.hasOwn(n,a))if(typeof c=="function"){if(Array.isArray(n)&&!nl(a))return sl(i.notify,n,a,c,r);if(!lr(c)&&Object.hasOwn(n,a)){if(!rl(this,d,c,r,n))return at(c),c;let m=d.join(".");try{if(o.has(m)){let b=[...o.keys(),m];throw o.clear(),new _i(`Find circular dependency at <"${m}">, steps: ${b.join(" -> ")}`)}o.set(m,!0);let g=i.createObserverObject(d,c,r,n);return typeof g!="function"&&Reflect.set(n,a,g,l),g}finally{o.delete(m);}}else return c}else return c;return i.notify({type:"get",path:d,indexs:[],value:c,oldValue:void 0,parentPath:r,parent:n}),al.call(this,c,d,t,o,i)},set:(n,a,l,c)=>{let d=Reflect.get(n,a,c),u=[...r,String(a)],[m,g]=tl(l),b=Su.call(this,s,u,m,d,g);if(b){let y=Reflect.set(n,a,m,c);if(a===dn)return  true;let C=u.join("."),S=this.options.configKey,w=S&&S.length>0?`${this.options.configKey}.${C}`:C;if(y&&this.configManager&&this.configurabled.has(C)&&setTimeout(()=>{this.configManager?.onUpdate(this,w,m);},0),y&&!g?.slient&&a!==dn&&m!==d&&i.notify({type:Array.isArray(n)?"update":"set",path:u,indexs:[],value:m,oldValue:d,parentPath:r,parent:n}),b instanceof Error)throw b;return y}else return  true},deleteProperty:(n,a)=>{let l=n[a],c=[...r,String(a)],d=Reflect.deleteProperty(n,a);return d&&a!==dn&&i.notify({type:"delete",path:c,indexs:[],value:l,oldValue:void 0,parentPath:r,parent:n}),d}});return t.set(e,s),s}function ll(e,r){let t=new Map,o=new WeakMap;return al.call(this,e,[],o,t,r)}function Fi(){let e=arguments[0],r=typeof arguments[1]=="function"?arguments[1]:()=>true,t=typeof arguments[1]=="object"?arguments[1]:arguments[2],o=Object.assign({depends:[],enable:true,objectify:true,filter:r},t),i=()=>({type:"watch",getter:e,options:o});return i[Tt]=true,i}var Hi=class extends Map{constructor(t){super();this.store=t;this._watcher={off:()=>{}};this._enable=true;}get enable(){return this._enable}set enable(t){this._enable=t;}set(t,o){return super.size===0&&this.createWacher(),super.set(t,o)}delete(t){let o=this.get(t);return o?(o.destroy(),true):Map.prototype.delete.call(this,t)}createWacher(){this._watcher=this.store.watch("**",({path:t,value:o})=>{if(!this._enable)return;let i=t[0].startsWith("#")?o:et(this.store.state,t);for(let s of this.values())s.isMatched(t,i)&&s.run(t,i);});}reset(){this._watcher?.off();for(let t of this.values())t.reset();this.createWacher();}create(){let t=Ei(arguments[0])?arguments[0]:Fi(...arguments)();return this.store.createObserverObject(t)}enableGroup(t,o=true){for(let i of this.values())i.options.group===t&&(i.options.enable=o);}};function cl(e){let r;return Ja(e)?r=e():typeof e=="function"&&(r={type:"sync",getter:e,options:Object.assign({},Rr(),{async:Ai(e)})}),r}function fn(e,r){if(r==="*")return  true;if(r==="write"){if(e.type==="get")return}else if(r==="read"){if(e.type!=="get")return}else if(Array.isArray(r)&&r.length>0&&!r.includes(e.type))return;return  true}var ku=Object.defineProperty,Cu=(e,r,t)=>r in e?ku(e,r,{enumerable:true,configurable:true,writable:true,value:t}):e[r]=t,Lr=(e,r,t)=>Cu(e,typeof r!="symbol"?r+"":r,t);function pl(e,r){let t=e.length,o=r.length;if(t!==o&&(o===0||r[o-1]!=="**"))return  false;if(o>0&&r[o-1]==="**"){for(let i=0;i<o-1;i++)if(r[i]!=="*"&&r[i]!==e[i])return  false;return  true}for(let i=0;i<t;i++)if(r[i]!=="*"&&r[i]!==e[i])return  false;return  true}function Au(e,r){let t=[];for(let o=e.length-1;o>=0;o--)r(e[o])&&(t.push(o),e.splice(o,1));return t.reverse()}function mn(e){return e&&typeof e=="function"}var $u=Symbol.for("__expandable__");function Eu(e){return e&&e[$u]}function Ou(e){for(let r=0;r<e.length;r++){let t=e[r];Array.isArray(t)&&Eu(t)&&(e.splice(r,1,...t),r+=t.length-1);}return e}function Tu(e,r){return e.catch(t=>(r&&r(t),Promise.resolve(t)))}function Ru(e){return e.map(r=>r.status==="fulfilled"?r.value:r.reason)}function Iu(e,r){let t=e;for(let o of r)if(t&&o in t)t=t[o];else return;return t}function ul(e,r,t){for(let[o,i]of Object.entries(e)){if(o.startsWith("__")||!i)continue;let s=[...r,o];t(s,i),ul(i,s,t);}}function Mu(e,r,t){let o=Iu(e,r);if(!o)return [];let i=[];return ul(o,r,(s,n)=>{i.push({node:n,type:s.join(t)});}),i}function zu(e){let r={},t={};return typeof e[0]=="object"?(Object.assign(r,e[0]),t=typeof e[1]=="boolean"?{retain:e[1]}:e[1]&&typeof e[1]=="object"?e[1]:{}):(r.type=e[0],r.payload=e[1],t=typeof e[2]=="boolean"?{retain:e[2]}:e[2]&&typeof e[2]=="object"?e[2]:{}),[r,t]}var gn=class{constructor(e){Lr(this,"__FastLiteEvent__",true),Lr(this,"listeners",{__listeners:[]}),Lr(this,"_options"),Lr(this,"_delimiter","/"),Lr(this,"retainedMessages",new Map),Lr(this,"listenerCount",0),this._options=Object.assign({id:Math.random().toString(36).substring(2),delimiter:"/",ignoreErrors:true,expandEmitResults:true},this._initOptions(e)),this._delimiter=this._options.delimiter;}get options(){return this._options}get id(){return this._options.id}get title(){return this._options.title||this.id||"FastLiteEvent"}_initOptions(e){return e}_addListener(e,r,t){let o=0;return [this._forEachNodes(e,i=>{let s=[r,t.count,0,t.tag,t.flags];i.__listeners.push(s),o=i.__listeners.length-1,this.listenerCount++;}),o]}_forEachNodes(e,r){if(e.length===0)return;let t=this.listeners;for(let o=0;o<e.length;o++){let i=e[o];if(i in t||(t[i]={__listeners:[]}),o===e.length-1){let s=t[i];return r(s,t),s}else t=t[i];}}_removeListener(e,r,t){t&&Au(e.__listeners,o=>{o=Array.isArray(o)?o[0]:o;let i=o===t;return i&&this.listenerCount--,i});}on(e,r,t){if(e.length===0)throw new Error("event cannot be empty");let o=Object.assign({count:0,flags:0},t),i=e.split(this._delimiter),[s,n]=this._addListener(i,r,o),a=()=>s&&this._removeListener(s,i,r);return this._emitRetainMessage(e,s,n),{off:a,listener:r,[Symbol.dispose](){a();}}}once(e,r,t){return this.on(e,r,Object.assign({},t,{count:1}))}onAny(e,r){return this.on("**",e,r)}off(){let e=arguments,r=mn(e[0])?void 0:e[0],t=mn(e[0])?e[0]:e[1],o=r?r.split(this._delimiter):[],i=r?r.includes("*"):false;if(r&&!i)this._traverseToPath(this.listeners,o,s=>{t?this._removeListener(s,o,t):r&&(s.__listeners=[]);});else {let s=i?[]:o;this._traverseListeners(this.listeners,s,(n,a)=>{(t!==void 0||i&&pl(n,o))&&(t?this._removeListener(a,o,t):a.__listeners=[]);});}}offAll(e){if(e){let r=e.split(this._delimiter),t=0;this._traverseListeners(this.listeners,r,(o,i)=>{t+=i.__listeners.length,i.__listeners=[];}),this.listenerCount-=t,this._removeRetainedEvents(e);}else {let r=0;this._traverseListeners(this.listeners,[],(t,o)=>{r+=o.__listeners.length;}),this.listenerCount-=r,this.retainedMessages.clear(),this.listeners={__listeners:[]};}}_removeRetainedEvents(e){e||this.retainedMessages.clear(),e?.endsWith(this._delimiter)&&(e+=this._delimiter),this.retainedMessages.delete(e);for(let r of this.retainedMessages.keys())r.startsWith(e)&&this.retainedMessages.delete(r);}clear(e){this.offAll(e),this._removeRetainedEvents(e);}_emitRetainMessage(e,r,t){let o=[];if(e.includes("*")){let i=e.split(this._delimiter);this.retainedMessages.forEach((s,n)=>{let a=n.split(this._delimiter);pl(a,i)&&o.push(s);});}else this.retainedMessages.has(e)&&o.push(this.retainedMessages.get(e));r&&o.forEach(i=>{this._executeListeners([r],i,{},s=>s[0]===r.__listeners[t][0]);});}_traverseToPath(e,r,t,o=0,i){if(o>=r.length){t(e);return}let s=r[o];if(i===true){this._traverseToPath(e,r,t,o+1,true);return}"*"in e&&this._traverseToPath(e["*"],r,t,o+1),"**"in e&&this._traverseToPath(e["**"],r,t,o+1,true),s in e&&this._traverseToPath(e[s],r,t,o+1);}_traverseListeners(e,r,t){let o=e;r&&r.length>0&&this._traverseToPath(e,r,s=>{o=s;});let i=(s,n,a)=>{n(a,s);for(let[l,c]of Object.entries(s))l.startsWith("__")||c&&i(c,n,[...a,l]);};i(o,t,[]);}_onListenerError(e,r,t,o){if(o instanceof Error&&(o._emitter=`${e.name||"anonymous"}:${r.type}`),this._options.ignoreErrors)return o;throw o}_executeListener(e,r,t,o=false){let i=e[0];try{let s=((t?.flags||0)&1)>0,n=i.call(this,s?r.payload:r,t);return o&&n&&n instanceof Promise&&(n=Tu(n,a=>this._onListenerError(i,r,t,a))),n}catch(s){return this._onListenerError(i,r,t,s)}}_executeListeners(e,r,t,o){if(!e||e.length===0)return [];let i=[];for(let s of e){let n=0;for(let a of s.__listeners)(!o||o(a,s))&&i.push([a,n,s.__listeners]),n++;}return this._decListenerExecCount(i),i.map(s=>this._executeListener(s[0],r,t,true))}_decListenerExecCount(e){for(let r=e.length-1;r>=0;r--){let t=e[r][0];t[2]++,t[1]>0&&t[1]<=t[2]&&(e[r][2].splice(e[r][1],1),this.listenerCount--);}}getListeners(e){let r=[],t=e.split(this._delimiter);this._traverseToPath(this.listeners,t,i=>{r.push(i);});let o=[];return r.map(i=>{o.push(...i.__listeners);}),o}clearRetainMessages(e){e?this.retainedMessages.delete(e):this.retainedMessages.clear();}emit(){let[e,r]=zu(arguments),t=e.type.split(this._delimiter);r.retain&&this.retainedMessages.set(e.type,e);let o=(l,c)=>{let d=this._options.transform;if(!mn(d))return [l,c];let u=d.call(this,l);return u===l?[l,c]:[{...l,payload:u},{...c,rawEventType:l.type,flags:(c.flags||0)|1}]},i=[],s=[];this._traverseToPath(this.listeners,t,l=>{s.push(l);});let[n,a]=o(e,r);if(i.push(...this._executeListeners(s,n,a)),r.broadcast){let l=Mu(this.listeners,t,this._delimiter);for(let{node:c,type:d}of l){if(!c.__listeners||c.__listeners.length===0)continue;let u,m;if(r.broadcast===true)u={...e,type:d},m=r;else {let y=r.broadcast.call(this,d,e,r);if(!y)continue;Array.isArray(y)?[u,m]=y:(u=y,m=r);}let[g,b]=o(u,m);i.push(...this._executeListeners([c],g,b));}}return this._options.expandEmitResults&&Ou(i),i}broadcast(e,r,t,o){let i=o?{broadcast:t??true,retain:true}:{broadcast:t??true};return this.emit(e,r,i)}async emitAsync(){let e=await Promise.allSettled(this.emit.apply(this,arguments));return Ru(e)}};function hl(e,r){let t=Object.keys(e),o=Object.values(e),i=r?.disabledGlobals||["alert","window","document"];if(i&&i.length>0){let s=new Set(t),n=i.filter(a=>!s.has(a));n.length>0&&(t.push(...n),o.push(...Array.from({length:n.length}).fill(void 0)));}return (s,n)=>{try{let a=[...t,...Object.keys(n||{})],l=[...o,...Object.values(n||{})];return new Function(...a,`return ${s}`)(...l)}catch(a){if(r?.onError){let l=r.onError(a,s);if(l!==void 0)return l}throw a}}}function Pu(e){Ya(e)&&Mi(e,({value:r,key:t,parent:o})=>{St(r)&&(t==="validate"||t.startsWith("on")||t.startsWith("render")||t.startsWith("to"))&&(o[t]=at(r));});}function Vu(e){let r={getter:e[0],options:Object.assign({onInvalid:void 0},e[1])};return Pu(r.options),r}function ji(e,r){let t=Vu([e,r]),o=e;typeof o=="object"&&at(o),t.options.datatype=Array.isArray(o)?"array":typeof o,t.options.errorMessage||(t.options.errorMessage="{error}");let i=()=>({type:"schema",getter:()=>o,options:t.options});return i[Tt]="schema",i}var dl=ji;function Bi(e){return e!=null&&typeof e[Symbol.iterator]=="function"&&typeof e!="string"}function fl(e,r=false){if(typeof e=="number")return  true;if(typeof e!="string"||r)return  false;try{if(e.includes(".")){let t=parseFloat(e);return e.endsWith(".")?!isNaN(t)&&String(t).length===e.length-1:!isNaN(t)&&String(t).length===e.length}else {let t=parseInt(e);return !isNaN(t)&&String(t).length===e.length}}catch{return  false}}function Ae(e){if(typeof e!="object"||e===null)return  false;var r=Object.getPrototypeOf(e);if(r===null)return  true;for(var t=r;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return r===t}function Pr(e){if(fl(e)||typeof e=="boolean"||typeof e=="function"||e instanceof Error)return  false;if(e==null||e==null||Array.isArray(e)&&e.length==0||Ae(e)&&Object.keys(e).length==0||typeof e=="string"&&e.trim()=="")return  true;try{if(Bi(e)&&e.size==0)return !0}catch{}return  false}function ml(e,...r){if(r.length===0)return e;let t=r.map((o,i)=>{let s=Object.entries(o||{});return s.some(([n,a])=>a===void 0)?s.reduce((n,[a,l])=>(l!==void 0&&(n[a]=l),n),{}):o});return Object.assign(e,...t)}function gl(e,{empty:r,delimiter:t=","}){let o=e;try{return typeof o=="function"&&(o=o.call(this,o)),Pr(o)&&(o=r||""),Array.isArray(o)?o.map(i=>String(i)).join(t):Ae(o)?Object.entries(o).reduce((i,[s,n])=>(i.push(`${s}=${String(n)}`),i),[]).join(t):Bi(o)&&typeof o!="string"?[...o].map(i=>String(i)).join(t):o instanceof Error?o.message:String(o)}catch{return String(o)}}var Du=/\{(\<(.*?)\>)?\s*([^\{\}\>\<]*)(?<!\s)\s*(\<(.*?)\>)?\}/gm;function bn(e,r,t){let o,i=ml({empty:null,delimiter:",",forEach:null},t);typeof r=="function"&&(r=r.call(e)),Array.isArray(r)&&r.length===1&&(Ae(r[0])||Array.isArray(r[0]))&&(r=r[0]),["boolean","string","number"].includes(typeof r)?o=[r]:r instanceof Map?o=[...r.entries()].reduce((n,a)=>(n[a[0]]=a[1],n),{}):Symbol.iterator in r?o=[...r]:Ae(r)?o=r:r instanceof Error?o=[`Error:${r.message}`]:o=[r];let s=0;return e.replaceAll(Du,function(){let n=arguments[2]||"",a=arguments[3]||"",l=arguments[5]||"",c="",d=false;if(Array.isArray(o)){let u=s>=o.length;c=u?"":gl.call(e,o[s],i),d=Pr(c)||u,s++;}else if(Ae(o)){let u=a in o;c=u?gl.call(e,o[a],i):"",d=Pr(c)||!u;}if(typeof i.forEach=="function"){let u=i.forEach(a,c,n,l);u!==void 0&&(Array.isArray(u)&&u.length===3?(n=u[0],c=u[1],l=u[2]):Pr(u)||(c=String(u)),d=Pr(c));}return d&&(i.empty==null?(c="",n="",l=""):c=i.empty),`${n}${c}${l}`})}function bl(){let e=new Date,r=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0"),i=String(e.getHours()).padStart(2,"0"),s=String(e.getMinutes()).padStart(2,"0"),n=String(e.getSeconds()).padStart(2,"0"),a=String(e.getMilliseconds()).padStart(3,"0");return `${r}/${t}/${o} ${i}:${s}:${n} ${a}`}var vl=["DEBUG","INFO","WARN","ERROR"],Fu=["\x1B[2m","","\x1B[1m\x1B[33m","\x1B[1m\x1B[31m"];function vn(e){let{debug:r,template:t,vars:o,colorized:i}=Object.assign({debug:false,template:"[{level}] {time} - {message}",colorized:true},e);function s(n,a){return (l,...c)=>{let d=r?0:vl.findIndex(C=>C.toLowerCase()===n);d<0&&(d=0),d>3&&(d=3);let u=i?Fu[d]:"",m=typeof l=="function"?l():l instanceof Error?l.message:l,g=bn(m instanceof Error?m.message:m,c,{forEach:(C,S)=>{if(i)return `\x1B[36m ${S} \x1B[0m${u}`}}),b=vl[d].padEnd(5),y=bn(t,{message:g,time:bl(),level:b,...o});n==="debug"&&(y=`${u}${y}\x1B[0m`),n==="warn"&&(y=`${u}${y}\x1B[0m`),n==="error"&&(y=`${u}${y}\x1B[0m`),a(y);}}return {debug:s("debug",console.debug),info:s("info",console.info),warn:s("warn",console.warn),error:s("error",console.error)}}function Hu(e,r,t){if(typeof r=="string"){let o=0,i;for(;(i=e.indexOf(r,o))>-1;){let s=typeof t=="function"?t(r):t,n=e.length;e=e.substring(0,i)+s+e.substring(i+r.length),o=i+s.length+e.length-n;}}else {let o;if(!r.global||!r.multiline)throw new Error("The search parameter must be enabled '/gm' option");for(;(o=r.exec(e))!==null;){o.index===r.lastIndex&&r.lastIndex++;let i=e.length,s=o[0].length,n=typeof t=="function"?t(o[0],...o):t;e=e.substring(0,o.index)+n+e.substring(o.index+s),r.lastIndex+=e.length-i;}}return e}String.prototype.replaceAll||(String.prototype.replaceAll=function(e,r){return Hu(this,e,r)});(e=>typeof Mt<"u"?Mt:typeof Proxy<"u"?new Proxy(e,{get:(r,t)=>(typeof Mt<"u"?Mt:r)[t]}):e)(function(e){if(typeof Mt<"u")return Mt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});function yl(e){if(e.options.cascadeDestroy===false)return;let r=a=>(a.options.cascadeDestroy??e.options.cascadeDestroy??true)===true,t=(a,l)=>a.associated&&Co(l,a.path)?true:(a.depends??[]).some(c=>Co(l,c)),o=[],i,s=()=>{i=void 0;let a=o;o=[];let l=c=>a.some(d=>t(c,d));for(let c of e.computedObjects.values())c.destroyed||!r(c)||!l(c)||e.computedObjects.delete(c.id);for(let c of e.watchObjects.values())c.destroyed||!r(c)||!l(c)||e.watchObjects.delete(c.id);},n=e.watch("**",a=>{a.type==="delete"&&(o.push(a.path),i===void 0&&(i=setTimeout(s,0)));},{});e.once("unload",()=>{n.off(),i!==void 0&&clearTimeout(i),i=void 0,o=[];});}function ju(e,r,t){let o=t?._getRefStore||(()=>{let i=r.options.refStore||e.options.refStore;if(i)return new WeakRef(i)});if(typeof o=="function"){let i=o();i&&(r.refStateContext=Bu(i,r));}}function Bu(e,r){let t=null;function o(i,s){let n=e.deref(),a=Array.isArray(n)?n:[n],l=(i?.startsWith("@")?i:`@/${i||""}`).substring(1),[c,d]=l.split("/"),u=a.length===1&&c===""?a[0]:a.find(m=>m&&m.id===c);if(u&&a.length>0){let{runArgs:m,reactive:g=true}=s||{};if(g&&(t||(t=new Map),u&&!t.has(l))){let b=u.watch(d,()=>{r.run(m);});t.set(l,b);}return et(u.state,d)}}return {ref:o,off:()=>{t&&(t.forEach(i=>i.off()),t.clear(),t=null);}}}function xl(e){let r=[];r.push(e.on("observer/*/created",({observer:t,context:o})=>{ju(e,t,o?.value);})),r.push(e.on("observer/*/destroyed",t=>{t.refStateContext?.off();})),r.push(e.on("observer/*/run",({observer:t,args:o})=>{t.refStateContext&&(o.ref||(o.ref=t.refStateContext.ref));})),e.once("unload",()=>{try{r.forEach(t=>t.off());}finally{r.splice(0,r.length);}});}function Vr(e,r,t="."){let o=[];try{return typeof r=="function"&&(r=r.call(e,e)),o=Array.isArray(r)?r:typeof r=="string"?Ve(r,t):[],o.length>0?et(e,o):e}catch{return e}}function Nu(e,r,t){let o=r===void 0?t:r;if(typeof o=="function")try{o=o.call(e.store,e);}catch{}return o===void 0?t===void 0?"CURRENT":t:o}function Fe(e,r,t,o){let i=e.store.state,s=e.store.options;if(typeof s.getRootScope=="function"){let d=s.getRootScope(e,{observerType:r,valuePath:t?.path});d!==void 0&&(i=d);}let{path:n,parentPath:a}=t||{},l=Nu(e,o.scope,s.scope),c=i;try{l==="CURRENT"?c=Vr(i,a):l==="PARENT"?c=Vr(i,n.slice(0,n.length-2<0?0:n.length-2)):l==="ROOT"?c=i:l==="DEPENDS"?c=e.depends?.map(d=>Vr(i,d)):typeof l=="string"?l.startsWith("@")?c=Fe(e,r,t,{...o,scope:Fe(e,r,{...t,path:l.slice(1).split(s.delimiter)},{...o,scope:l.slice(1)})}):c=Vr(i,ko(e.path,l)):Array.isArray(l)&&(c=Vr(i,l));}catch(d){e.store.logger.error(`Error while getting computed scope ${e.toString()}: ${d.message}`,"error");}return c}var Dr=class{constructor(r,t,o){this.descriptor=t;this.context=o;this._id="";this._associated=false;this._attached=false;this._destroyed=false;this._depends=[];this._subscribers=[];this._running=false;this.store=r,this._associated=o!==void 0,this._getter=t.getter,this._options=Object.assign({enable:true,group:"",depends:[],throwError:true},t.options),this._id=this._options.id||(this._associated?De(o?.path):Ii());let i=o||this._options.anchor;this.context=i,this._path=i?.path||[`#${this._id}`],this._path||(this._path=[`#${this._id}`]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=zr(this._path,this._options.depends),st(this.store,`observer/${this.id}/created`,{context:i,observer:this}),this._onInitial();}get type(){return this.descriptor.type}get options(){return this._options}get id(){return this._id}get associated(){return this._associated}get async(){return this._options.async}get running(){return this._running}get enable(){return this._options.enable}set enable(r){this._options.enable=r;}set group(r){this._options.group=r;}get group(){return this._options.group}get initial(){return this._initial}set initial(r){this._initial=r;}get path(){return this._path}get attached(){return this._attached}get destroyed(){return this._destroyed}get depends(){return this._depends}set depends(r){this._depends=r;}get getter(){return this._getter}set getter(r){this._getter=r;}get strPath(){return this._strPath||(this._strPath=this._path.join(this.store.options.delimiter)),this._strPath}get error(){return this._error}set error(r){this._error=r;}toString(){return `ObserverObject<${this.strPath}>`}get value(){return this._associated?et(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)}set value(r){if(this._associated)Ce(this.store.state,this._path,r);else {let t=this._value;r!==t&&(this._value=r,this.store.emit(`observer/${this.id}/updated`,{type:"set",path:this.path,value:r,oldValue:t}));}}_onInitial(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:true}),this.onInitial();}onInitial(){}onInitOptions(r){}update(r,t){this.store.update(()=>{this.value=r;},t);}silentUpdate(r){this.update(r,{silent:true});}watch(r,t){let o;return this._associated?o=this.store.watch(this.getValueWatchPath(),i=>{r.call(this,i);},t):o=this.store.on(`observer/${this.id}/updated`,i=>{r.call(this,i);}),this._subscribers.push(o),o}getValueWatchPath(){return this.path.join(this.store.options.delimiter)}getDepends(){return this.depends}onDependsChange(r){}attach(){!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.logger.debug(()=>`${this.toString()} subscribed to ${this.depends.map(r=>r.join(this.store.options.delimiter)).join(",")}`),this._attached=true);}detach(){this._attached&&(this._subscribers.forEach(r=>{r.off();}),this._attached=false,this._subscribers=[],this.store.watchObjects.delete(this.id));}destroy(){this._destroyed||(this._destroyed=true,this.onDestroy(),this.detach(),this.store.off(`observer:set:${this.id}`),Map.prototype.delete.call(this.store.computedObjects,this.id),Map.prototype.delete.call(this.store.watchObjects,this.id),st(this.store,`observer/${this.id}/destroyed`,this));}onDestroy(){}get shadowStore(){return this._shadowStore||(this._shadowStore=St(this.store.options.getShadowStore)?this.store.options.getShadowStore()||this.store:this.store),this._shadowStore}run(...r){}reset(){}};var He=class extends Dr{constructor(t,o,i){super(t,o,i);this.descriptor=o;o.options.depends=zr(this.path,this.options.depends),this.silentUpdate(this.initial);}toString(){return `ComputedObject<${De(this.path)}>`}getValue(){return this.value}_reportComputedStatus(t,o){if(!this[`_${t}`]){let s=(this.options.reports||{})[t];(typeof s=="string"||Array.isArray(s)&&s.length>0)&&(this[`_${t}`]=Ti(s,this.path));}Array.isArray(this[`_${t}`])&&this.store.update(i=>{Ce(i,this[`_${t}`],o);});}isDisable(t){return !this.store.options.enableComputed||!this.enable&&t!==true||t===false}run(t){throw new Error("Method not implemented.")}};var Ni=class extends He{constructor(){super(...arguments);this._firstRun=false;this.lite=true;}get async(){return  true}onInitial(){this.initial=this.options.initial,this.attach(),setTimeout(()=>{(this.options.immediate===true||this.options.immediate==="auto"&&this.options.initial===void 0)&&this.run({first:true});},0);}async run(t){let{first:o}=t??{};if(this.isDisable(t?.enable)){this.store.logger.warn(()=>`Async computed <${this.toString()}> is disabled`);return}this.error=void 0,this._firstRun=true,o||this.store.logger.debug(()=>`Run async computed for : ${this.toString()}`);let i=t?Object.assign({first:o},this.options,t):this.options,s=Fe(this,"sync",this.context,i),{reentry:n}=i;if(this._running&&!n){this.store.logger.warn(()=>`Async computed: ${this.toString()} is running, can't reentry`),st(this.store,`observer/${this.id}/cancel`,{reason:"reentry",observer:this});return}this._running=true;try{return await this.executeGetter(s,i)}finally{this._running=false;}}async executeGetter(t,o){let i={getSnap:a=>zi(a),extras:o.extras,operate:o.operate,first:o.first};this.error=void 0;let s,n;try{this._reportComputedStatus("loading",!0),st(this.store,`observer/${this.id}/run`,{args:i,scope:t,observer:this}),n=await this.getter.call(this,t,i),o.raw&&at(n),this.store.peep(()=>{this.value=n;}),this._reportComputedStatus("error",void 0);}catch(a){s=a,this._reportComputedStatus("error",a.message);}finally{this._reportComputedStatus("loading",false);}s?(this.error=s,st(this.store,`observer/${this.id}/error`,{error:s,observer:this})):st(this.store,`observer/${this.id}/done`,{value:n,observer:this}),this.onDoneCallback(o,n,t,n);}onDoneCallback(t,o,i,s){typeof t.onDone=="function"&&t.onDone.call(this,{id:this.id,path:this.path,timeout:false,abort:false,value:s,error:o,scope:i});}onDependsChange(t){this.store.logger.debug(()=>`AsyncComputed<${this.id}> is running by depends ${t.type}/${t.path.join(".")} operate `),this.run({operate:t,first:!this._firstRun});}};var Ui=class extends He{get async(){return  false}onInitial(){this.collectDependencies();}run(r){let{first:t,operate:o}=Object.assign({first:false,operate:void 0},r);if(this.error=void 0,!t&&this.isDisable(r?.enable)){this.store.logger.warn(`Sync computed <${this.toString()}> is disabled`);return}t||this.store.logger.debug(`Run sync computed for : ${this.toString()}`);let i=r?Object.assign({},this.options,r):this.options,s=Fe(this,"sync",this.context,i);this.error=void 0;let n=i.initial;try{let a={operate:o,first:t};st(this.store,`observer/${this.id}/run`,{args:a,scope:s,observer:this}),n=this.getter.call(this,s,a),i.raw&&at(n);}catch(a){this.error=a;}this.onDone(t,n,i);}onDone(r,t,o){let i=t;if(this.error&&St(o.onError)){let s=o.onError(this.error);s!==void 0&&(i=s);}if(r&&(this.initial=i),this.error||this.store.peep(()=>{o.raw&&at(i),this.value=i;}),!r)if(this.error){if(st(this.store,`observer/${this.id}/error`,{error:this.error,observer:this}),this.options.throwError)throw this.error}else st(this.store,`observer/${this.id}/done`,{value:i,observer:this});}collectDependencies(){let r=[],t=this.shadowStore.watch(o=>{r.push(o.path);},{operates:["get"]});this.run({first:true}),t.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&r.push(...zr(this.path,this.options.depends)),this.depends=Li(r),this.attach();}onDependsChange(r){this.run({operate:r});}};var Wi=class extends Dr{constructor(t,o,i){super(t,o,i);this.store=t;if(typeof this.options.filter!="function")throw new Error("watch options.filter must be a function")}get filter(){return this.options.filter}get cache(){return this._cache||(this._cache={}),this._cache}toString(){return `WatchObject<${this.id}>`}onInitial(){}isMatched(t,o){return Oi(t,this.path)?false:this.filter(t,o)}reset(){this._cache={},this.value=this.initial;}run(t,o){if(!this.enable){this.store.logger.debug(`WatchObject <${this.toString()}> is disabled`);return}try{let i={path:t,value:o};st(this.store,`observer/${this.id}/run`,{args:i,observer:this,scope:void 0});let s=this.getter?.call(this,i,this);this.options.raw&&at(s),this.value=s,st(this.store,`observer/${this.id}/done`,{value:s,observer:this});}catch(i){st(this.store,`observer/${this.id}/error`,{error:i,observer:this});}}};var _l={sync:(e,r,t)=>{let o=new Ui(e,r,t);return e.computedObjects.set(o.id,o),o},async:(e,r,t)=>{let o=new Ni(e,r,t);return e.computedObjects.set(o.id,o),o},watch:(e,r,t)=>{let o=new Wi(e,r,t);return e.watchObjects.set(o.id,o),o},schema:(e,r,t)=>{if(e.options.configManager){let{path:o,value:i}=t,s=e.configManager.add(e,o,i);return e.configurabled.add(De(o)),{initial:s}}else return {initial:r.getter()}}};function wl(e){return typeof e=="string"&&e.startsWith("```")&&e.endsWith("```")}function Sl(e,r){return e.computedObjects.find(r)}function kl(e,r){return (...t)=>{try{return e.call(this,...t)}catch(o){return this.logger.error(o),r}}}var qi=Symbol("autostore.broadcast");function Cl(e){if(e==null||typeof e!="object"||e instanceof Set)return  false;if(Array.isArray(e)||e instanceof Map)return  true;let r=Object.getPrototypeOf(e);return r===null||r===Object.prototype}function Uu(e){let r=e.type;return r==="set"||r==="delete"?Cl(e.value):r==="update"?(!e.indexs||e.indexs.length===0)&&Cl(e.value):false}function Wu(e,r,t){return !r||r<=0?[e]:r===1?[e,`${e}${t}*`]:[`${e}${t}**`]}var cr=class e extends gn{constructor(t,o){super(Object.assign({id:Ii(),debug:false,enableComputed:true,reentry:true,lazy:false,enableValueExpr:true,shadow:false,cascadeDestroy:true,resetable:false,plugins:[]},o,{delimiter:"/",transform:i=>i.payload}));this.__AUTO_STORE__=true;this._operates=new gn({delimiter:".",transform:t=>t.payload});this._silenting=false;this._batching=false;this._batchOperates=[];this._updateFlags=0;this._peeping=false;this._subscribers=[];this._createSandbox(),this._createConfigManager(),this.computedObjects=new Di(this),this.watchObjects=new Hi(this),this._subscribeHooks(),this._installPlugins(),this._data=ll.call(this,t||{},{notify:this._notify.bind(this),createObserverObject:this.handleReactiveObject.bind(this)}),this.getSnap=this.getSnap.bind(this),this.watch=this.watch.bind(this),this.update=this.update.bind(this),this.peep=this.peep.bind(this),this.silentUpdate=this.silentUpdate.bind(this),this.batchUpdate=this.batchUpdate.bind(this),this.collectDependencies=this.collectDependencies.bind(this),this._enableReset(),this.options.lazy||Mi(this._data,this._onFirstEachState.bind(this)),this._options.debug&&typeof globalThis.__AUTOSTORE_DEVTOOLS__=="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(this),this.emit("load",this);}static{this.observers=_l;}get id(){return this.options.id}get state(){return this._data}get plugins(){return this.options.plugins}get operates(){return this._operates}get configurabled(){return this._configurabled||(this._configurabled=new Set),this._configurabled}get errors(){return this._errors||(this._errors={}),this._errors}get options(){return super.options}get silenting(){return this._silenting}get delimiter(){return "."}get batching(){return this._batching}get peeping(){return this._peeping}get configManager(){return this._configManager}get configKey(){return this.options.configKey===void 0?this.id:this.options.configKey}get logger(){return this._logger||(this._logger=this.options.logger||vn({debug:this.options.debug})),this._logger}get resetable(){return this.options.resetable??false}set resetable(t){if(t){if(this._resetWatcher)return;this._enableReset();}else this._resetWatcher&&(this._resetWatcher.off(),this._resetWatcher=void 0),this.updatedState={};this.options.resetable=t;}_enableReset(){this.updatedState={},this._resetWatcher=this.watch(({path:t,oldValue:o,type:i})=>{if(t.length===0||i==="batch")return;let s=t.join(this.delimiter||".");!s.startsWith("#")&&this.updatedState&&!(s in this.updatedState)&&(this.updatedState[s]=o);});}_createSandbox(){if(this.options.enableValueExpr){let t=St(this.options.sandbox?.create)?this.options.sandbox.create:hl;this._safeEval=t({computed:$i,watch:Fi,configurable:dl,schema:ji},{onError:(o,i)=>(this.logger.error(o),i)});}}_installPlugins(){let t=this.options.plugins;t.push(yl),t.push(xl);let o=globalThis.__AUTOSTORE_PLUGINS__;Array.isArray(o)&&t.push(...o),t.forEach(i=>{try{typeof i=="function"&&i(this);}catch(s){this.logger.error(`Error while installing the plugin<${i.name}>:{}`,s.message);}});}_createConfigManager(){let t=this.options.configManager;this.options.configKey===void 0&&(this.options.configKey=this.id),t&&typeof t=="object"&&"add"in t?this._configManager=t:globalThis[Tr]&&t!==false&&(this._configManager=globalThis[Tr]);}_onFirstEachState({value:t,path:o}){if(typeof t=="string"){if(this.options.enableValueExpr===false||!St(this._safeEval))return;let i=t.trim();if(wl(i)){if(i.length<=6)return;this.update(s=>{let n=i.slice(3,i.length-3).trim();if(!n)return;let a=this._safeEval?.(n,this.options.sandbox?.context||{});Ce(s,o,a);});}}}_subscribeHooks(){Object.entries({"observer/initial":"onObserverInitial","observer/*/created":"onObserverCreated","observer/*/run":"onObserverRun","observer/*/done":"onObserverDone","observer/*/cancel":"onObserverCancel","observer/*/error":"onObserverError","observer/*/destroyed":"onObserverDestroyed"}).forEach(([o,i])=>{let s=this.options?.[i];if(s==null)return;let n=(Array.isArray(s)?s:[s]).filter(a=>typeof a=="function");this._subscribers.push(...n.map(a=>this.on(o,kl.call(this,a))));});}_notify(t){if(this._peeping&&t.type==="get"||(this._batching&&this._batchOperates.push(t),this._silenting))return;t.flags=this._updateFlags;let o=t.path.join(this.delimiter);Uu(t)?this._broadcastOperate(o,t):this.operates.emit(o,t);}_broadcastOperate(t,o){let i=new Set;this.computedObjects.forEach(c=>i.add(c.path.join(this.delimiter))),this.watchObjects.forEach(c=>i.add(c.path.join(this.delimiter)));let s=o.path,n=o.type,a=n==="delete"?void 0:o.value,l=n==="delete"?o.value:o.oldValue;this.operates.broadcast(t,o,(c,d)=>{if(i.has(c))return null;let u=c.split(this.delimiter),m=u.slice(s.length);if(m.length===0)return null;if(m.some(b=>b==="*"||b==="**"))return {...d,type:c,payload:{...o,path:s,broadcast:true}};let g=this._peeping;this._peeping=true;try{let b=a!=null&&et(a,m,qi)!==qi,y=l!=null&&et(l,m,qi)!==qi;if(!b&&!y)return null;let C=b?et(a,m):void 0,S=y?et(l,m):void 0;if(b&&y&&C===S||typeof C=="function"||typeof S=="function")return null;let w={...o,type:b?"set":"delete",path:u,value:C,oldValue:S,parentPath:u.slice(0,-1),parent:b?et(a,m.slice(0,-1)):et(l,m.slice(0,-1)),indexs:[],broadcast:!0};return {...d,type:c,payload:w}}finally{this._peeping=g;}});}watch(){let t=typeof arguments[0]=="function"||["*","**"].includes(arguments[0])||Array.isArray(arguments[0])&&arguments[0].length===0,o=typeof arguments[0]=="function"?arguments[0]:arguments[1],i=arguments.length>=2&&typeof arguments[arguments.length-1]=="object"?arguments[arguments.length-1]:void 0,s=(n,a)=>l=>{if(fn(l,n)&&!(typeof a=="function"&&!a(l)))try{if(this._peeping=!0,l.type==="batch"){let c=l.value.filter(d=>fn(d,n));if(c.length>0)l.value=c;else return}o(l);}finally{this._peeping=false;}};if(t){let{operates:n,filter:a}=Object.assign({once:false,operates:"write"},i),l=s(n,a);return this.operates.onAny(l)}else {let n=arguments[0],a=Array.isArray(n)?n.map(S=>typeof S=="string"?S:S.join(this.delimiter)):[n],{once:l,operates:c,filter:d,depth:u}=Object.assign({once:false,operates:"write"},i),m=l?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),g=[],b=s(c,d),y=l||!u||u<=0?0:u,C=new Set;return a.forEach(S=>{Wu(S,y,this.delimiter).forEach(w=>C.add(w));}),C.forEach(S=>{g.push(m.call(this,S,b));}),{off:()=>g.forEach(S=>{S.off();})}}}handleReactiveObject(t,o,i,s){let n=cl(o),a={path:t,value:o,parentPath:i,parent:s},l=this.createObserverObject(n,a);return l?l.initial:o}reset(t){if(!this.resetable||!this.updatedState){this.logger.warn("Resetable \u672A\u542F\u7528\uFF0C\u8BF7\u5148\u6267\u884C store.resetable = true");return}let o=this.updatedState,i=this.delimiter||".",s=t?`${t}${i}`:"";this.batchUpdate(n=>{for(let[a,l]of Object.entries(o))t&&!a.startsWith(s)||Ce(n,Ve(a,i),l);}),this.updatedState={},this.emit("reset",t);}createObserverObject(t,o){if(t){let i=e.observers[t.type];if(i)return i(this,t,o)}}silentUpdate(t){this.update(t,{silent:true});}batchUpdate(t){this.update(t,{batch:true,onInvalid:"pass"});}update(t,o){let{batch:i=false,reply:s=true,silent:n=false,peep:a=false,flags:l=0,onInvalid:c}=o||{};if(typeof t=="function"){this._updateFlags=l,this._updateValidateBehavior=c,n&&(this._silenting=true),i&&(this._batching=true,this._silenting=true),a&&(this._peeping=true);try{let d=t(this.state);if(i&&Xa(d))throw new Error("Batch update method can't be async function")}finally{this._silenting=false,this._batching=false,this._peeping=false,this._updateFlags=0,this._updateValidateBehavior=void 0,this.replyBatchOperates(s,i);}}else throw new Error("update method must provide a function argument")}replyBatchOperates(t,o){if(this._batchOperates.length>0){let i=[...this._batchOperates];this._batchOperates=[],t&&i.forEach(s=>{s.reply=true,this._notify(s);});try{let s=o===!0?qa:String(o);this.operates.emit(s,{type:"batch",path:[s],value:i});}finally{this._batchOperates=[];}}}peep(){let t=typeof arguments[0]=="function"?()=>arguments[0](this.state):()=>et(this.state,Array.isArray(arguments[0])?arguments[0]:Ve(arguments[0],this.delimiter));this._peeping=true;try{return t()}finally{this._peeping=false;}}collectDependencies(t,o="*"){let i=[],s=this.watch(n=>{i.push(n.path);},{operates:o});try{t();}finally{s.off();}return Li(i)}destroy(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this._resetWatcher?.off(),this._resetWatcher=void 0,this._subscribers.forEach(t=>t.off()),this._configManager?.remove?.(this),this.emit("unload",this);}getSnap(t){let{reserveAsync:o,entry:i,includeFunc:s}=Object.assign({reserveAsync:true},t);return Pi(i?et(this._data,i):this._data,{reserveAsync:o,includeFunc:s})}get(t,o){let{defaultValue:i,timeout:s=0,waitAsyncDone:n=false}=Object.assign({},o),a=Array.isArray(t)?t:Ve(t,this.delimiter),l=et(this.state,a,i),c=Sl(this,t);return c?c.async&&c.running&&n?new Promise((d,u)=>{let m,g;s>0&&(m=setTimeout(()=>{g?.off(),u(new Er);},s)),g=c.watch(()=>{clearTimeout(m),g?.off(),d(c.getValue());},{once:true});}):c.getValue():l}toString(){return `AutoStore<${this.id}>`}};var Ki=class extends cr{constructor(t,o){let i=Object.assign({global:true,configManager:false,autoload:true,autosave:true,scope:"ROOT"},o);super({},i);this.source=t;this.dirtyValues={};this._reseting=false;this._loadingCount=0;if(i.global!==false){let s=i.global===true?Tr:i.global;return globalThis[s]===void 0&&(globalThis[s]=this),i.autoload&&this.load().catch(()=>{}),globalThis[s]=this,this}i.autoload&&this.load().catch(()=>{});}get fields(){return this.state}get size(){return Object.keys(this.fields).length}async load(){let t=await this.source.load();this._loadingCount++;let o=false;try{this.update(i=>{Object.entries(t).forEach(([s,n])=>{let a=i[s];a?(a.value=n,o=!0):i[s]={value:n};});},{silent:!0}),o&&await new Promise(i=>setTimeout(i,0));}finally{this._loadingCount--,this.dirtyValues={};}}async save(t){let o=t?this._getValues():this.dirtyValues;Object.keys(o).length>0&&(await this.source.save?.(o),this.dirtyValues={});}_getValues(){return Object.entries(this.state).reduce((t,[o,i])=>(t[o]=i.value,t),{})}async reset(){if(!this._reseting){this._reseting=true;try{this.dirtyValues={},Object.values(this.state).forEach(t=>{try{let o=t.default;o!==void 0&&(t.value=Za(at(o),{slient:!0,onInvalid:"none"}));}catch{}}),await new Promise(t=>setTimeout(t,0));}finally{typeof this.source.reset=="function"&&this.source.reset.call(this),this._reseting=false,this.dirtyValues={};}}}onUpdate(t,o,i){if(!(this._loadingCount>0||this._reseting))try{this.dirtyValues[o]=i,this.options.autosave&&Promise.resolve(this.source.save?.(this.dirtyValues)).then(()=>{this.dirtyValues={};});}finally{this._notify({type:"set",path:[o,"value"],value:i});}}remove(t){let o=t.options.delimiter;t.configurabled.forEach(i=>{let n=[...i.split(o)];t.options.configKey&&n.splice(0,0,t.options.configKey);let a=n.join(".");delete this.state[a],delete this.dirtyValues[a];});}add(t,o,i){this.operates.options.delimiter=t.options.delimiter;let s=Vi(i)?i():i,n=Array.isArray(o)?o:o.split("."),a=n.join(t.options.delimiter),l=[...n];t.options.configKey&&l.splice(0,0,t.options.configKey);let c=s.getter();s.options.default===void 0&&(s.options.default=c),s.options.value=c,t.options.defaultSchema&&Object.keys(t.options.defaultSchema).forEach(u=>{let m=t.options.defaultSchema[u];s.options[u]===void 0&&(s.options[u]=m);}),s.options.onInvalid===void 0&&(s.options.onInvalid="throw"),this._installValidator(a,s,t);let d=this.peep(u=>et(u,[l.join("."),"value"]));return this._handleRefState(s.options,t),this.state[De(l)]=s.options,d!==void 0&&(s.options.value=d),this._createValueProxy(s,t,n),d||c}_handleRefState(t,o){Object.values(t).forEach(i=>{St(i)&&!lr(i)&&(i._getRefStore=()=>new WeakRef(o));});}_installValidator(t,o,i){if(o.options.required===true){let s=o.options.validate,n=o.options.errorMessage,a=!n||n==="{error}"?"{label}\u4E0D\u80FD\u4E3A\u7A7A":n,l=(d,u,m)=>{if(typeof d=="string"&&d.length===0){let g=new Or(a);throw g.onInvalid="throw-pass",g}return St(s)?s.call(this,d,u,m):true};l.getErrorMessage=d=>typeof a=="string"?a.params({...o.options,error:d.message,errorStack:d.stack,path:t}):d.message;let c=o.options.onInvalid;c!==void 0&&(l.onInvalid=c),i.options.validators||(i.options.validators={}),i.options.validators[t]=l;}else if(St(o.options.validate)){let s=o.options.errorMessage;o.options.validate.getErrorMessage=a=>typeof s=="string"?s.params({...o.options,error:a.message,errorStack:a.stack,path:t}):a.message;let n=o.options.onInvalid;n!==void 0&&(o.options.validate.onInvalid=n),i.options.validators||(i.options.validators={}),i.options.validators[t]=o.options.validate;}else i.options.validators&&delete i.options.validators[t];}_createValueProxy(t,o,i){let s=this;return Object.defineProperty(t.options,"value",at({get(){let n=et(o.state,i);return s._notify({type:"get",path:[...i,"value"],value:n}),n},set(n){o.update(a=>{Ce(a,i,n);}),s._notify({type:"set",path:[...i,"value"],value:n});}}))}getConfigValue(t){return this.peep(o=>et(o,[...t,"value"]))}};function Ao(e){if(Array.isArray(e))return e.map(r=>Ao(r));if(typeof e=="function"){if(e[Tt]==="schema"){let r=e,t=(...o)=>{let i=r(...o);return i&&typeof i=="object"?{...i,options:Ao(i.options)}:i};return t[Tt]="schema",t}return e}if(e!==null&&typeof e=="object"){let r={};for(let t of Object.keys(e))r[t]=Ao(e[t]);return r}return e}var je=class extends Event{constructor(r,t,o,i){super("context-request",{bubbles:true,composed:true}),this.context=r,this.contextTarget=t,this.callback=o,this.subscribe=i??false;}};var Fr=class{constructor(r,t,o,i){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=r,t.context!==void 0){let s=t;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=t,this.callback=o,this.subscribe=i??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new je(this.context,this.host,this.t,this.subscribe));}};var Gi=class{get value(){return this.o}set value(r){this.setValue(r);}setValue(r,t=false){let o=t||!Object.is(r,this.o);this.o=r,o&&this.updateObservers();}constructor(r){this.subscriptions=new Map,this.updateObservers=()=>{for(let[t,{disposer:o}]of this.subscriptions)t(this.o,o);},r!==void 0&&(this.value=r);}addCallback(r,t,o){if(!o)return void r(this.value);this.subscriptions.has(r)||this.subscriptions.set(r,{disposer:()=>{this.subscriptions.delete(r);},consumerHost:t});let{disposer:i}=this.subscriptions.get(r);r(this.value,i);}clearCallbacks(){this.subscriptions.clear();}};var yn=class extends Event{constructor(r,t){super("context-provider",{bubbles:true,composed:true}),this.context=r,this.contextTarget=t;}},Hr=class extends Gi{constructor(r,t,o){super(t.context!==void 0?t.initialValue:o),this.onContextRequest=i=>{if(i.context!==this.context)return;let s=i.contextTarget??i.composedPath()[0];s!==this.host&&(i.stopPropagation(),this.addCallback(i.callback,s,i.subscribe));},this.onProviderRequest=i=>{if(i.context!==this.context||(i.contextTarget??i.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:a}]of this.subscriptions)s.has(n)||(s.add(n),a.dispatchEvent(new je(this.context,a,n,true)));i.stopPropagation();},this.host=r,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new yn(this.context,this.host));}};function xn({context:e}){return (r,t)=>{let o=new WeakMap;if(typeof t=="object")return {get(){return r.get.call(this)},set(i){return o.get(this).setValue(i),r.set.call(this,i)},init(i){return o.set(this,new Hr(this,{context:e,initialValue:i})),i}};{r.constructor.addInitializer((n=>{o.set(n,new Hr(n,{context:e}));}));let i=Object.getOwnPropertyDescriptor(r,t),s;if(i===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(a){o.get(this).setValue(a),n.set(this,a);},configurable:true,enumerable:true};}else {let n=i.set;s={...i,set(a){o.get(this).setValue(a),n?.call(this,a);}};}return void Object.defineProperty(r,t,s)}}}function _n({context:e,subscribe:r}){return (t,o)=>{typeof o=="object"?o.addInitializer((function(){new Fr(this,{context:e,callback:i=>{t.set.call(this,i);},subscribe:r});})):t.constructor.addInitializer((i=>{new Fr(i,{context:e,callback:s=>{i[o]=s;},subscribe:r});}));}}var Yi="autoform";var Xi=x`
    
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
    

`;var jr=x`
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
`;var Al=x`
    ${Xi}
    ${jr}
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
                        content: '：';
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
                color: var(--auto-secondary-color);
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
                flex-shrink: 0;
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
            padding: calc(var(--auto-spacing) * 0.6) var(--auto-spacing);
        }
    }
    :host(.grid-border.compact) {
        & > .autofield {
            padding: calc(var(--auto-spacing) * 0.3) var(--auto-spacing);
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
    /* 紧凑模式 */
    :host(.compact) {
        & > .autofield {
            padding: calc(var(--auto-spacing) * 0.1);
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
                content: ' ';
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
`;var kt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Bt=e=>(...r)=>({_$litDirective$:e,values:r}),Lt=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,t,o){this._$Ct=r,this._$AM=t,this._$Ci=o;}_$AS(r,t){return this.update(r,t)}update(r,t){return this.render(...t)}};var{I:Ku}=pa,$l=e=>e;var Ol=(e,r)=>e?._$litType$!==void 0;var Ji=e=>e.strings===void 0,El=()=>document.createComment(""),Br=(e,r,t)=>{let o=e._$AA.parentNode,i=r===void 0?e._$AB:r._$AA;if(t===void 0){let s=o.insertBefore(El(),i),n=o.insertBefore(El(),i);t=new Ku(s,n,e,e.options);}else {let s=t._$AB.nextSibling,n=t._$AM,a=n!==e;if(a){let l;t._$AQ?.(e),t._$AM=e,t._$AP!==void 0&&(l=e._$AU)!==n._$AU&&t._$AP(l);}if(s!==i||a){let l=t._$AA;for(;l!==s;){let c=$l(l).nextSibling;$l(o).insertBefore(l,i),l=c;}}}return t},Be=(e,r,t=e)=>(e._$AI(r,t),e),Gu={},Qi=(e,r=Gu)=>e._$AH=r,Tl=e=>e._$AH,Zi=e=>{e._$AR(),e._$AA.remove();};var Rl=(e,r,t)=>{let o=new Map;for(let i=r;i<=t;i++)o.set(e[i],i);return o},W=Bt(class extends Lt{constructor(e){if(super(e),e.type!==kt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,r,t){let o;t===void 0?t=r:r!==void 0&&(o=r);let i=[],s=[],n=0;for(let a of e)i[n]=o?o(a,n):n,s[n]=t(a,n),n++;return {values:s,keys:i}}render(e,r,t){return this.dt(e,r,t).values}update(e,[r,t,o]){let i=Tl(e),{values:s,keys:n}=this.dt(r,t,o);if(!Array.isArray(i))return this.ut=n,s;let a=this.ut??=[],l=[],c,d,u=0,m=i.length-1,g=0,b=s.length-1;for(;u<=m&&g<=b;)if(i[u]===null)u++;else if(i[m]===null)m--;else if(a[u]===n[g])l[g]=Be(i[u],s[g]),u++,g++;else if(a[m]===n[b])l[b]=Be(i[m],s[b]),m--,b--;else if(a[u]===n[b])l[b]=Be(i[u],s[b]),Br(e,l[b+1],i[u]),u++,b--;else if(a[m]===n[g])l[g]=Be(i[m],s[g]),Br(e,i[u],i[m]),m--,g++;else if(c===void 0&&(c=Rl(n,g,b),d=Rl(a,u,m)),c.has(a[u]))if(c.has(a[m])){let y=d.get(n[g]),C=y!==void 0?i[y]:null;if(C===null){let S=Br(e,i[u]);Be(S,s[g]),l[g]=S;}else l[g]=Be(C,s[g]),Br(e,i[u],C),i[y]=null;g++;}else Zi(i[m]),m--;else Zi(i[u]),u++;for(;g<=b;){let y=Br(e,l[b+1]);Be(y,s[g]),l[g++]=y;}for(;u<=m;){let y=i[u++];y!==null&&Zi(y);}return this.ut=n,Qi(e,l),ht}});var Nr=class{constructor(r){this.host=r,r.addController(this);}updateContext(){this.host.context={...this.host.context,labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size,dark:this.host.dark,validAtInit:this.host.validAtInit};}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext();}};var Il="important",Yu=" !"+Il,rt=Bt(class extends Lt{constructor(e){if(super(e),e.type!==kt.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((r,t)=>{let o=e[t];return o==null?r:r+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(e,[r]){let{style:t}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(r)),this.render(r);for(let o of this.ft)r[o]==null&&(this.ft.delete(o),o.includes("-")?t.removeProperty(o):t[o]=null);for(let o in r){let i=r[o];if(i!=null){this.ft.add(o);let s=typeof i=="string"&&i.endsWith(Yu);o.includes("-")||s?t.setProperty(o,s?i.slice(0,-11):i,s?Il:""):t[o]=i;}}return ht}});function F(e,r,t){return e?r(e):t?.(e)}var Ne=class{constructor(r,...t){this.initialClasses=[];this.host=r,r.addController(this),this.initialClasses=t;}_forEachClasss(r,t){r&&r.forEach(o=>{typeof o=="string"?(t(o,true),this.host.classList.add(o)):Object.entries(o).forEach(([i,s])=>{t(i,s);});});}add(...r){this.host&&r&&this._forEachClasss(r,t=>{this.host.classList.add(t);});}remove(...r){this.host&&r&&this._forEachClasss(r,t=>{this.host.classList.remove(t);});}toggle(...r){this.host&&this._forEachClasss(r,t=>{this.host.classList.toggle(t);});}use(...r){this.host&&this._forEachClasss(r,(t,o)=>{o?this.host.classList.add(t):this.host.classList.remove(t);});}has(r){return this.host.classList.contains(r)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var $o=class extends Lt{constructor(r){if(super(r),this.it=q,r.type!==kt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===q||r==null)return this._t=void 0,this.it=r;if(r===ht)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let t=[r];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};$o.directiveName="unsafeHTML",$o.resultType=1;var Pt=Bt($o);function Ml(e,r){r&&Object.entries(r).forEach(([t,o])=>{(t==="root"?[e]:Array.from(e.querySelectorAll(t))).forEach(s=>{typeof o=="string"?s.style.cssText=o:typeof o=="object"&&Object.assign(s.style,o);});});}function Ur(e,r,t){t?e.classList.add(r):e.classList.remove(r);}function zl(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var Xu=/^(validate|on.+|to.+|render.+)$/,I=class extends dt{constructor(){super(...arguments);this.theme=new Nr(this);this.classs=new Ne(this);this.options=zl();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this.context.validAt==="input"?this._updateFieldValue():this.clearError();}static{this.styles=Al;}get shadow(){return this.shadowRoot}getFieldOptions(){let t=this.schema||{};return Object.entries(t).reduce((o,[i,s])=>(Le(s)?o[i]=s.value:o[i]=s,o),Object.assign({},zl(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(t=true){return f`${this.renderBeforeActions(t)} ${this.renderAfterActions(t)}`}_onClickAction(t,o){return i=>{typeof o=="function"&&o(i),t.onClick&&typeof t.onClick=="function"&&t.onClick?.call(this,this.getInputValue(),{action:t,options:this.options,event:i,update:s=>{vi(this.context.store?.state,this.options.path,s);}});}}renderBeforeActions(t){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return f`<div
                class="actions before"
                part="before-actions"
                slot="${k(t?"prefix":void 0)}"
            >
                ${W(this.beforeActions,o=>this.renderActionWidget(o))}
            </div>`}renderAfterActions(t){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return f`<div
                class="actions after"
                part="after-actions"
                slot="${k(t?"suffix":void 0)}"
            >
                ${W(this.afterActions,o=>this.renderActionWidget(o))}
            </div>`}_renderDropdownAction(t){return f`
            <sl-dropdown
                class="action-widget"
                hoist
                title=${k(t.tips)}
                placement=${t.pos==="before"?"bottom-start":"bottom-end"}
            >
                <sl-button slot="trigger" ?caret=${t.caret}>
                    ${F(t.icon,()=>f`<sl-icon name=${k(t.icon)}></sl-icon>`)}
                    ${t.label}
                </sl-button>
                <sl-menu>
                    ${W(t.items||[],o=>o==="-"?f`<sl-divider></sl-divider>`:(typeof o=="string"&&(o={label:o}),f`<sl-menu-item
                            @click=${this._onClickAction.call(this,o,()=>{t.syncMenu&&(t.label=o.label,t.icon=o.icon,t.tips=o.tips,this.requestUpdate());})}
                        >
                            ${F(o.icon,()=>f`<sl-icon
                                        name=${k(o.icon)}
                                        slot="prefix"
                                    ></sl-icon>`)}
                            ${o.label}</sl-menu-item
                        >`))}
                </sl-menu>
            </sl-dropdown>
        `}_renderButtonAction(t){return f`
            <sl-button
                class="action-widget"
                title=${k(t.tips)}
                variant=${k(t.variant)}
                size=${t.size||this.context.size}
                @click=${this._onClickAction.call(this,t)}
            >
                ${F(t.icon,()=>f`<sl-icon name=${k(t.icon)}></sl-icon>`)}
                ${t.label}
            </sl-button>
        `}_renderImageAction(t){return f`
            <sl-button
                title="${k(t.tips)}"
                variant="text"
                class="action-widget image"
                @click=${this._onClickAction.call(this,t)}
            >
                <img src="${k(t.url)}" />
            </sl-button>
        `}renderActionWidget(t){if(typeof t!="object")return;let o=t.type||"button";if(o==="dropdown")return this._renderDropdownAction(t);if(o==="button")return this._renderButtonAction(t);if(o==="image")return this._renderImageAction(t)}renderOption(t,o){let i=this.schema[t];if(i)return i.loading?f`<sl-spinner></sl-spinner>`:f`${o?o(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(t){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,t):t}toState(t){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,t):t}toInput(t){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,t):t}getOptionValue(t,o){if(this.schema&&t in this.schema){let i=this.schema[t];return i===void 0?o:Le(i)?i.value:i}else return o}getOption(t){if(this.schema&&t in this.schema){let o=this.schema[t];return Le(o)?o:Ca(o)}}getInputValue(){if(!this.input)return "";let t=this.input.value;if(typeof this.options.toState!="function"){let o=this.options.datatype||"string";o==="number"?t=Number(t):o==="boolean"&&(t=!!t);}return t}_renderRequiredOption(){return this.renderOption("required",t=>t?f`<span style="color:red;">*</span>`:"")}renderHelp(t=false){let o=this.options.help;if(!o)return;let i=o.match(/\(([^)]+)\)[^)]*$/),s=i?i[1]:null,n=s?o.replace(`(${s})`,""):o;return f`<span
            class="help"
            part="field-help"
            title="${k(t?n:void 0)}"
        >
            ${Ea(!!s,f`
                    <sl-icon name="help"></sl-icon>
                    ${F(!t,()=>f`${n}`)}
                `,a=>f`<a target="_blank" href="${s}">${a}</a>`)}
        </span>`}renderLabel(){let t=this.context,o=this.options.labelPos||t.labelPos;if(o==="none")return f``;{let i={};return (t.labelWidth&&o==="left"||t.viewonly)&&(i.width=t.labelWidth),f`<div class="label" part="field-label" style="${k(rt(i))}">
                <span class="title">
                    ${this.getLabel()}
                    ${F(t.viewonly,()=>this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${F(o==="top"&&!t.viewonly,()=>this.renderHelp())}
            </div>`}}renderInput(){return f``}clearError(){this.errorMessage&&(this.errorMessage=void 0,this._updateFormClasss());}isShowError(){return this.context.validAtInit?!!this.errorMessage:this.dirty?!!this.errorMessage:false}renderError(){return this.isShowError()?f`<div class="error">${this.errorMessage}</div>`:f``}_handleSchemaChange(){let t=this.context;if(t?.store&&this.schema){let o=this.getPath();if(!o||!Array.isArray(o)||o.length===0)return;let i=o.join("_$_");this._subscribers.push(t.store.watch(`${i}.**`,s=>{let{reply:n,type:a,value:l,flags:c}=s;if(n||t.form.seq===c)return;(a==="batch"?l:[s]).forEach(u=>{let m=u.path.slice(1);vi(this.schema,m,u.value),this.options[m[0]]=u.value;}),this.requestUpdate();},{operates:"write"}));}}_evalDynamicOptions(){let o=this.context?.store;if(!o||!this.schema)return;let i=this.schema;for(let s of Object.keys(i)){let n=i[s];if(typeof n!="function"||Xu.test(s))continue;let a=o.collectDependencies(()=>{try{this.options[s]=n.call(this,o.state);}catch(l){console.error(`Error while evaluating schema <${s}>: ${l.message}`);}});a.length!==0&&this._subscribers.push(o.watch(a,()=>{try{this.options[s]=n.call(this,o.state);}catch(l){console.error(`Error while evaluating schema <${s}>: ${l.message}`);}this.requestUpdate();}));}}renderView(){let t=this.value;if(this.options.toView&&this.options.toView)try{t=this.options.toView.call(this,this.value);}catch(o){console.error(`Error while toView<${this.path}>: ${o.message}`);}return f`${Pt(String(t))}`}_handleStateChange(){if(this.noreactive)return;let t=this.context;if(t?.store&&this.schema){let o=this.getPath();if(!o||!Array.isArray(o)||o.length===0)return;this._subscribers.push(t.store.watch(o.join("."),i=>{this.value=this.toInput(i.value),this.errorMessage=this.getFieldError();},{operates:"write"}));}}getStateValue(){let t=this.getPath();return !t||!Array.isArray(t)||t.length===0?this.value:this.toInput(Aa(this.context.store?.state,t))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){if(this.context?.store&&this.schema){this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this._evalDynamicOptions();let o=this.getPath();o&&Array.isArray(o)&&o.length>0?this.path=o.join("."):this.path="",this.name=this.options.name||this.path;let i=this.getFieldError();i!==void 0&&(this.errorMessage=i),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(s=>s.pos==="before"),this.afterActions=this.options.actions.filter(s=>s.pos!=="before"));}}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(t=>{t.off();}),this._subscribers=[];}getLabelPos(){return this.options.labelPos||this.context.labelPos}getFieldError(){let t=this.context?.store;if(!t?.configManager)return;let o=t.options.configKey?.trim(),i=o?`${o}.${this.path}`:this.path;return t.configManager.errors[i]}_updateFormClasss(){this.context.form&&(Ur(this.context.form,"dirty",this.dirty),Ur(this.context.form,"invalid",!!this.errorMessage));}_updateFieldValue(){if(!this.schema)return;let t=this.getPath(),o=this.toState(this.getInputValue()),i=this.context;i.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||(s?.update(n=>{let a=$a(o,this.schema);vi(n,t,a);},{flags:i.form.seq}),this.errorMessage=this.getFieldError()),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:o,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.errorMessage=this.getFieldError()??s.message;}finally{this._updateFormClasss();}}renderValue(){let t=this.options.labelPos||this.context.labelPos;return f`
            ${this.renderInput()} ${F(this.context.viewonly||t==="left",()=>this.renderHelp())}
            ${this.renderError()}
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(t){t.has("schema")&&this.schema&&this.updateOptions(),this.options.styles&&Ml(this.shadow,this.options.styles);}render(){let t=this.context,o=this.options.labelPos?this.options.labelPos:t.labelPos;return this.classs.use(t.size,{[`${t.border}-border`]:true,error:this.isShowError(),"left-label":o==="left"||t.viewonly,"top-label":o==="top"&&!t.viewonly,disable:this.options.enable===false,readonly:t.readonly,viewonly:t.viewonly,compact:this.compact===void 0?t.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${t.viewAlign}`]:true,[`${t.layout}-layout`]:true}),this.options.width?this.style.width=this.options.width:this.style.width&&(this.style.width=""),f`
            <div class="autofield">
                ${this.options.divider?f`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${F(t.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>
            </div>
        `}};v([h({type:Object})],I.prototype,"schema",2),v([$()],I.prototype,"value",2),v([$()],I.prototype,"errorMessage",2),v([$()],I.prototype,"labelPos",2),v([$()],I.prototype,"dirty",2),v([h({type:Boolean,reflect:true})],I.prototype,"noreactive",2),v([h({type:Boolean,reflect:true})],I.prototype,"compact",2),v([ka({slot:"value",flatten:true})],I.prototype,"_field",2),v([O(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],I.prototype,"input",2),v([_n({context:Yi,subscribe:true}),h({attribute:false})],I.prototype,"context",2);function T(e){return r=>customElements.get(e)?r:wa(e)(r)}exports.AutoFieldInput=class Z extends I{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return f`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let t=i=>i.map(s=>typeof s=="string"?s:s.value||s.label),o=(i,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let a=t(s),l=-1;a.some((u,m)=>{if(n&&this.value.startsWith(u)||!n&&this.value.endsWith(u))return n?(this._prefix=u,this.value=this.value.substring(u.length)):(this._suffix=u,this.value=this.value.substring(0,this.value.length-u.length)),l=m,true});let c=l===-1?"?":typeof s[l]=="string"?s[l]:s[l].label,d={type:s.length===1?"button":"dropdown",label:c,caret:!n};d.type==="dropdown"?d.items=s.map(u=>(u==="-"||(u=typeof u=="string"?{label:u}:u,u.onClick=()=>{n?this._prefix=u.value??u.label:this._suffix=u.value??u.label,this.onFieldChange();}),u)):typeof s[0]=="string"?d.label=s[0]:Object.assign(d,s[0]),d.syncMenu=true,d.pos=n?"before":"after",n?i.splice(0,0,d):i.push(d);}};this.options.prefix&&o(this.beforeActions,this.options.prefix),this.options.suffix&&o(this.afterActions,this.options.suffix,false);}onInputChange(t){let o=t.type;o.includes("input")?this.onFieldInput():o.includes("change")&&this.onFieldChange();}onInputBlur(t){this.context.validAt==="lost-focus"&&this.onFieldChange();}renderInput(){return f`
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
                placeholder=${k(this.options.placeholder)}
                pattern=${k(this.options.pattern)}
                minLength=${k(this.options.minLength)}
                maxLength=${k(this.options.maxLength)}
                max=${k(this.options.max)}
                min=${k(this.options.min)}
                ?disabled=${!this.options.enable}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${k(this.options.spellcheck)}
            >
                ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input
            >
        `}toState(t){let o=super.toState(t);return typeof o=="string"&&(this._prefix&&(o=this._prefix+o),this._suffix&&(o=o+this._suffix)),o}toInput(t){let o=super.toInput(t);return typeof o=="string"&&(this._prefix&&o.startsWith(this._prefix)&&(o=o.substring(this._prefix.length)),this._suffix&&o.endsWith(this._suffix)&&(o=o.substring(0,o.length-this._suffix.length))),o}};exports.AutoFieldInput.styles=[I.styles,x`
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
        `],exports.AutoFieldInput=v([T("auto-field-input")],exports.AutoFieldInput);var Ll=x`
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
`;var Kt=(e="value")=>(r,t)=>{let o=r.constructor,i=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(s,n,a){var l;let c=o.getPropertyOptions(e),d=typeof c.attribute=="string"?c.attribute:e;if(s===d){let u=c.converter||Me,g=(typeof u=="function"?u:(l=u?.fromAttribute)!=null?l:Me.fromAttribute)(a,c.type);this[e]!==g&&(this[t]=g);}i.call(this,s,n,a);};};var Vt=x`
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
`;var Eo=new WeakMap,Oo=new WeakMap,To=new WeakMap,wn=new WeakSet,ts=new WeakMap,yt=class{constructor(e,r){this.handleFormData=t=>{let o=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(a=>{t.formData.append(i,a.toString());}):t.formData.append(i,s.toString()));},this.handleFormSubmit=t=>{var o;let i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=Eo.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),ts.set(this.host,[]);},this.handleInteraction=t=>{let o=ts.get(this.host);o.includes(t.type)||o.push(t.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let t=this.form.querySelectorAll("*");for(let o of t)if(typeof o.checkValidity=="function"&&!o.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let t=this.form.querySelectorAll("*");for(let o of t)if(typeof o.reportValidity=="function"&&!o.reportValidity())return  false}return  true},(this.host=e).addController(this),this.options=Ot({form:t=>{let o=t.form;if(o){let s=t.getRootNode().querySelector(`#${o}`);if(s)return s}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var o;return (o=t.disabled)!=null?o:false},reportValidity:t=>typeof t.reportValidity=="function"?t.reportValidity():true,checkValidity:t=>typeof t.checkValidity=="function"?t.checkValidity():true,setValue:(t,o)=>t.value=o,assumeInteractionOn:["sl-input"]},r);}hostConnected(){let e=this.options.form(this.host);e&&this.attachForm(e),ts.set(this.host,[]),this.options.assumeInteractionOn.forEach(r=>{this.host.addEventListener(r,this.handleInteraction);});}hostDisconnected(){this.detachForm(),ts.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction);});}hostUpdated(){let e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(e){e?(this.form=e,Eo.has(this.form)?Eo.get(this.form).add(this.host):Eo.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Oo.has(this.form)||(Oo.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),To.has(this.form)||(To.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let e=Eo.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Oo.has(this.form)&&(this.form.reportValidity=Oo.get(this.form),Oo.delete(this.form)),To.has(this.form)&&(this.form.checkValidity=To.get(this.form),To.delete(this.form)),this.form=void 0));}setUserInteracted(e,r){r?wn.add(e):wn.delete(e),e.requestUpdate();}doAction(e,r){if(this.form){let t=document.createElement("button");t.type=e,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",r&&(t.name=r.name,t.value=r.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{r.hasAttribute(o)&&t.setAttribute(o,r.getAttribute(o));})),this.form.append(t),t.click(),t.remove();}}getForm(){var e;return (e=this.form)!=null?e:null}reset(e){this.doAction("reset",e);}submit(e){this.doAction("submit",e);}setValidity(e){let r=this.host,t=!!wn.has(r),o=!!r.required;r.toggleAttribute("data-required",o),r.toggleAttribute("data-optional",!o),r.toggleAttribute("data-invalid",!e),r.toggleAttribute("data-valid",e),r.toggleAttribute("data-user-invalid",!e&&t),r.toggleAttribute("data-user-valid",e&&t);}updateValidity(){let e=this.host;this.setValidity(e.validity.valid);}emitInvalidEvent(e){let r=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});e||r.preventDefault(),this.host.dispatchEvent(r)||e?.preventDefault();}},Wr=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),Pl=Object.freeze(Se(Ot({},Wr),{valid:false,valueMissing:true})),Vl=Object.freeze(Se(Ot({},Wr),{valid:false,customError:true}));var ft=class{constructor(e,...r){this.slotNames=[],this.handleSlotChange=t=>{let o=t.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate();},(this.host=e).addController(this),this.slotNames=r;}hasDefaultSlot(){return [...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return  true;if(e.nodeType===e.ELEMENT_NODE){let r=e;if(r.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!r.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function Dl(e){if(!e)return "";let r=e.assignedNodes({flatten:true}),t="";return [...r].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(t+=o.textContent);}),t}var Fl=x`
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
`;function R(e,r){let t=Ot({waitUntilFirstUpdate:false},r);return (o,i)=>{let{update:s}=o,n=Array.isArray(e)?e:[e];o.update=function(a){n.forEach(l=>{let c=l;if(a.has(c)){let d=a.get(c),u=this[c];d!==u&&(!t.waitUntilFirstUpdate||this.hasUpdated)&&this[i](d,u);}}),s.call(this,a);};}}var L=x`
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
`;var es,z=class extends dt{constructor(){super(),Ha(this,es,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,r])=>{this.constructor.define(e,r);});}emit(e,r){let t=new CustomEvent(e,Ot({bubbles:true,cancelable:false,composed:true,detail:{}},r));return this.dispatchEvent(t),t}static define(e,r=this,t={}){let o=customElements.get(e);if(!o){try{customElements.define(e,r,t);}catch{customElements.define(e,class extends r{},t);}return}let i=" (unknown version)",s=i;"version"in r&&r.version&&(i=" v"+r.version),"version"in o&&o.version&&(s=" v"+o.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${e}>${i}, but <${e}>${s} has already been registered.`);}attributeChangedCallback(e,r,t){Fa(this,es)||(this.constructor.elementProperties.forEach((o,i)=>{o.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i]);}),ja(this,es,true)),super.attributeChangedCallback(e,r,t);}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((r,t)=>{e.has(t)&&this[t]==null&&(this[t]=r);});}};es=new WeakMap;z.version="2.20.1";z.dependencies={};p([h()],z.prototype,"dir",2);p([h()],z.prototype,"lang",2);var Ro=Symbol(),rs=Symbol(),Sn,kn=new Map,K=class extends z{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(e,r){var t;let o;if(r?.spriteSheet)return this.svg=f`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?Ro:rs}catch{return rs}try{let i=document.createElement("div");i.innerHTML=await o.text();let s=i.firstElementChild;if(((t=s?.tagName)==null?void 0:t.toLowerCase())!=="svg")return Ro;Sn||(Sn=new DOMParser);let a=Sn.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):Ro}catch{return Ro}}connectedCallback(){super.connectedCallback(),rn(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),on(this);}getIconSource(){let e=$r(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var e;let{url:r,fromLibrary:t}=this.getIconSource(),o=t?$r(this.library):void 0;if(!r){this.svg=null;return}let i=kn.get(r);if(i||(i=this.resolveIcon(r,o),kn.set(r,i)),!this.initialRender)return;let s=await i;if(s===rs&&kn.delete(r),r===this.getIconSource().url){if(Ol(s)){if(this.svg=s,o){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n);}return}switch(s){case rs:case Ro:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(e=o?.mutator)==null||e.call(o,this.svg),this.emit("sl-load");}}}render(){return this.svg}};K.styles=[L,Fl];p([$()],K.prototype,"svg",2);p([h({reflect:true})],K.prototype,"name",2);p([h()],K.prototype,"src",2);p([h()],K.prototype,"label",2);p([h({reflect:true})],K.prototype,"library",2);p([R("label")],K.prototype,"handleLabelChange",1);p([R(["name","src","library"])],K.prototype,"setIcon",1);var M=Bt(class extends Lt{constructor(e){if(super(e),e.type!==kt.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return " "+Object.keys(e).filter(r=>e[r]).join(" ")+" "}update(e,[r]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in r)r[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(r)}let t=e.element.classList;for(let o of this.st)o in r||(t.remove(o),this.st.delete(o));for(let o in r){let i=!!r[o];i===this.st.has(o)||this.nt?.has(o)||(i?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)));}return ht}});var Nt=Bt(class extends Lt{constructor(e){if(super(e),e.type!==kt.PROPERTY&&e.type!==kt.ATTRIBUTE&&e.type!==kt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ji(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[r]){if(r===ht||r===q)return r;let t=e.element,o=e.name;if(e.type===kt.PROPERTY){if(r===t[o])return ht}else if(e.type===kt.BOOLEAN_ATTRIBUTE){if(!!r===t.hasAttribute(o))return ht}else if(e.type===kt.ATTRIBUTE&&t.getAttribute(o)===r+"")return ht;return Qi(e),r}});var lt=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,r)=>e.checked=r}),this.hasSlotController=new ft(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(e){this.input.focus(e);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("help-text"),r=this.helpText?true:!!e;return f`
      <div
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":r})}
      >
        <label
          part="base"
          class=${M({checkbox:true,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${k(this.value)}
            .indeterminate=${Nt(this.indeterminate)}
            .checked=${Nt(this.checked)}
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
            ${this.checked?f`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?f`
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
          aria-hidden=${r?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};lt.styles=[L,Vt,Ll];lt.dependencies={"sl-icon":K};p([O('input[type="checkbox"]')],lt.prototype,"input",2);p([$()],lt.prototype,"hasFocus",2);p([h()],lt.prototype,"title",2);p([h()],lt.prototype,"name",2);p([h()],lt.prototype,"value",2);p([h({reflect:true})],lt.prototype,"size",2);p([h({type:Boolean,reflect:true})],lt.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],lt.prototype,"checked",2);p([h({type:Boolean,reflect:true})],lt.prototype,"indeterminate",2);p([Kt("checked")],lt.prototype,"defaultChecked",2);p([h({reflect:true})],lt.prototype,"form",2);p([h({type:Boolean,reflect:true})],lt.prototype,"required",2);p([h({attribute:"help-text"})],lt.prototype,"helpText",2);p([R("disabled",{waitUntilFirstUpdate:true})],lt.prototype,"handleDisabledChange",1);p([R(["checked","indeterminate"],{waitUntilFirstUpdate:true})],lt.prototype,"handleStateChange",1);lt.define("sl-checkbox");exports.AutoFieldCheckbox=class Io extends I{renderInput(){return f`
            <sl-checkbox
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                class="auto-input"
                ?disabled=${!this.options.enable}
                .value="${this._getSwitchValues()[0]}"
                .checked=${this._isChecked()}
                placeholder="${k(this.options.placeholder)}"
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-checkbox
            >
        `}getInitialOptions(){return {switchValues:[true,false]}}_getSwitchValues(){let r=this.options.choices;return Array.isArray(r)&&r.length>=2?[typeof r[0]=="object"?r[0].value:r[0],typeof r[1]=="object"?r[1].value:r[1]]:this.options.switchValues}_isChecked(){return this.value===this._getSwitchValues()[0]}getInputValue(){return this.input.checked?this._getSwitchValues()[0]:this._getSwitchValues()[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;let r=this.options.choices;if(Array.isArray(r)&&r.length>=2){let o=r[this._isChecked()?0:1];return typeof o=="object"?o.label??"":""}let t=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof t=="boolean"?"":t}renderView(){return f` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `}};exports.AutoFieldCheckbox.styles=[I.styles,x`
            sl-checkbox.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=v([T("auto-field-checkbox")],exports.AutoFieldCheckbox);var Hl=x`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`;var ae=class extends z{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return f`
      <span
        part="base"
        class=${M({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?f` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};ae.styles=[L,Hl];ae.dependencies={"sl-icon":K};p([$()],ae.prototype,"checked",2);p([$()],ae.prototype,"hasFocus",2);p([h()],ae.prototype,"value",2);p([h({reflect:true})],ae.prototype,"size",2);p([h({type:Boolean,reflect:true})],ae.prototype,"disabled",2);p([R("checked")],ae.prototype,"handleCheckedChange",1);p([R("disabled",{waitUntilFirstUpdate:true})],ae.prototype,"handleDisabledChange",1);ae.define("sl-radio");var jl=x`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;var Bl=x`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var Ue=class extends z{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(e){let r=Mo(e.target);r?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(e){let r=Mo(e.target);r?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(e){let r=Mo(e.target);r?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(e){let r=Mo(e.target);r?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let e=[...this.defaultSlot.assignedElements({flatten:true})];e.forEach(r=>{let t=e.indexOf(r),o=Mo(r);o&&(o.toggleAttribute("data-sl-button-group__button",true),o.toggleAttribute("data-sl-button-group__button--first",t===0),o.toggleAttribute("data-sl-button-group__button--inner",t>0&&t<e.length-1),o.toggleAttribute("data-sl-button-group__button--last",t===e.length-1),o.toggleAttribute("data-sl-button-group__button--radio",o.tagName.toLowerCase()==="sl-radio-button"));});}render(){return f`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Ue.styles=[L,Bl];p([O("slot")],Ue.prototype,"defaultSlot",2);p([$()],Ue.prototype,"disableRole",2);p([h()],Ue.prototype,"label",2);function Mo(e){var r;let t="sl-button, sl-radio-button";return (r=e.closest(t))!=null?r:e.querySelector(t)}var xt=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this),this.hasSlotController=new ft(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let e=this.required&&!this.value;return this.customValidityMessage!==""?Vl:e?Pl:Wr}get validationMessage(){let e=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:e?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(e){let r=e.target.closest("sl-radio, sl-radio-button"),t=this.getAllRadios(),o=this.value;!r||r.disabled||(this.value=r.value,t.forEach(i=>i.checked=i===r),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(e){var r;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))return;let t=this.getAllRadios().filter(a=>!a.disabled),o=(r=t.find(a=>a.checked))!=null?r:t[0],i=e.key===" "?0:["ArrowUp","ArrowLeft"].includes(e.key)?-1:1,s=this.value,n=t.indexOf(o)+i;n<0&&(n=t.length-1),n>t.length-1&&(n=0),this.getAllRadios().forEach(a=>{a.checked=false,this.hasButtonGroup||a.setAttribute("tabindex","-1");}),this.value=t[n].value,t[n].checked=true,this.hasButtonGroup?t[n].shadowRoot.querySelector("button").focus():(t[n].setAttribute("tabindex","0"),t[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),e.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}async syncRadioElements(){var e,r;let t=this.getAllRadios();if(await Promise.all(t.map(async o=>{await o.updateComplete,o.checked=o.value===this.value,o.size=this.size;})),this.hasButtonGroup=t.some(o=>o.tagName.toLowerCase()==="sl-radio-button"),t.length>0&&!t.some(o=>o.checked))if(this.hasButtonGroup){let o=(e=t[0].shadowRoot)==null?void 0:e.querySelector("button");o&&o.setAttribute("tabindex","0");}else t[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let o=(r=this.shadowRoot)==null?void 0:r.querySelector("sl-button-group");o&&(o.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(r=>r.checked=r.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let e=this.required&&!this.value,r=this.customValidityMessage!=="";return e||r?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let e=this.validity.valid;return this.errorMessage=this.customValidityMessage||e?"":this.validationInput.validationMessage,this.formControlController.setValidity(e),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),e||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),e}setCustomValidity(e=""){this.customValidityMessage=e,this.errorMessage=e,this.validationInput.setCustomValidity(e),this.formControlController.updateValidity();}focus(e){let r=this.getAllRadios(),t=r.find(s=>s.checked),o=r.find(s=>!s.disabled),i=t||o;i&&i.focus(e);}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r,i=f`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return f`
      <fieldset
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":t,"form-control--has-help-text":o})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${t?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?f`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${i}
                </sl-button-group>
              `:i}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};xt.styles=[L,Vt,jl];xt.dependencies={"sl-button-group":Ue};p([O("slot:not([name])")],xt.prototype,"defaultSlot",2);p([O(".radio-group__validation-input")],xt.prototype,"validationInput",2);p([$()],xt.prototype,"hasButtonGroup",2);p([$()],xt.prototype,"errorMessage",2);p([$()],xt.prototype,"defaultValue",2);p([h()],xt.prototype,"label",2);p([h({attribute:"help-text"})],xt.prototype,"helpText",2);p([h()],xt.prototype,"name",2);p([h({reflect:true})],xt.prototype,"value",2);p([h({reflect:true})],xt.prototype,"size",2);p([h({reflect:true})],xt.prototype,"form",2);p([h({type:Boolean,reflect:true})],xt.prototype,"required",2);p([R("size",{waitUntilFirstUpdate:true})],xt.prototype,"handleSizeChange",1);p([R("value")],xt.prototype,"handleValueChange",1);xt.define("sl-radio-group");exports.AutoFieldRadio=class zo extends I{getInitialOptions(){return {card:false,choices:[],valueKey:"value"}}renderOptionItemWithCard(r,t){if(this.options.card){let o=t[this.options.valueKey]||t.label,i=this.value===o;return f`<div
                class="card"
                style=${rt({width:this.options.itemWidth})}
            >
                <div class="body ${i?"selected":""}">
                    <sl-icon class="icon" name="settings"></sl-icon>
                    ${r}
                </div>
            </div>`}else return r}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(r){let t=r[this.options.valueKey]||r.label;return f`<sl-radio
            value="${t}"
            style=${rt({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
            >${r.label}<br /><span class="memo">${r.tips}</span></sl-radio
        >`}renderInput(){let r=this.options.choices.map(t=>{let o={};return typeof t=="object"?Object.assign(o,t):Object.assign(o,{label:t}),o});return f`
            <sl-radio-group class="value" name=${this.name} value="${this.value}" size="${this.context.size}" @sl-change=${this.onRadioChange.bind(this)}>
                ${r.map(t=>this.renderOptionItemWithCard(this.renderOptionItem(t),t))}
            </sl-radio-group>
        `}};exports.AutoFieldRadio.styles=[I.styles,x`
            sl-radio-group::part(form-control-input) {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
            }
            sl-icon::part(svg) {
                stroke-width: 1.1;
            }
            sl-radio {
                position: relative;
                & .memo {
                    color: var(--auto-color);                    
                    filter: opacity(0.5);
                    font-size: 0.8em;
                    max-height: 2.8em;
                    overflow: hidden;
                    display: -webkit-box;
                    line-height: 150%;
                    margin-top: 2px;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            sl-radio::part(label) {
                margin-right: 1em;
            }
            .card {
                padding: calc(var(--auto-spacing) * 0.3);
                box-sizing: border-box;
                & > .body {
                    display: flex;
                    flex-direction: row;
                    border: var(--auto-border);
                    border-radius: var(--auto-border-radius);
                    box-shadow: var(--auto-shadow);
                    padding: var(--auto-spacing);
                    box-sizing: border-box;
                    position: relative;
                    overflow: hidden;
                    &:hover {
                        outline: 1px solid var(--sl-color-primary-500);
                    }
                    & > sl-radio {
                        flex-grow: 1;
                    }
                    & sl-radio::part(control) {
                        display: none;
                    }
                    & sl-radio::part(label) {
                        padding-right: 0px;
                        margin-right: 0px;
                    }
                    &.selected {
                        border: 1px solid var(--sl-color-primary-500); 
                        background: color-mix(in srgb, var(--t-color-primary-5) 20%, transparent);
                    }
                    &.selected:before {
                        content: ' ';
                        position: absolute;
                        left: calc(100% - 24px);
                        top: 0px;
                        width: 24px;
                        height: 24px;
                        box-sizing: border-box;
                        border: 12px solid transparent;
                        border-top-color: var(--sl-color-primary-500);
                        border-right-color: var(--sl-color-primary-500);
                    }
                    &.selected:after {
                        content: ' ';
                        position: absolute;
                        left: calc(100% - 12px);
                        top: 2px;
                        width: 10px;
                        height: 6px;
                        box-sizing: border-box;
                        border: 2px solid transparent;
                        border-left-color: white;
                        border-bottom-color: white;
                        transform: rotate(-45deg);
                    }
                    sl-icon.icon {
                        flex-shrink: 0;
                        color: var(--auto-primary-color);
                        padding-top: 0px;
                        padding-left: 0px;
                        font-size: calc(2 * var(--auto-font-size));
                    }
                }
            }
        `],exports.AutoFieldRadio=v([T("auto-field-radio")],exports.AutoFieldRadio);var Nl=x`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;var Y=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ft(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var e;super.disconnectedCallback(),this.input&&((e=this.resizeObserver)==null||e.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(e){this.input.focus(e);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(e){if(e){typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,r,t="none"){this.input.setSelectionRange(e,r,t);}setRangeText(e,r,t,o="preserve"){let i=r??this.input.selectionStart,s=t??this.input.selectionEnd;this.input.setRangeText(e,i,s,o),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r;return f`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${t?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${M({textarea:true,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${k(this.name)}
              .value=${Nt(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${k(this.placeholder)}
              rows=${k(this.rows)}
              minlength=${k(this.minlength)}
              maxlength=${k(this.maxlength)}
              autocapitalize=${k(this.autocapitalize)}
              autocorrect=${k(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${k(this.spellcheck)}
              enterkeyhint=${k(this.enterkeyhint)}
              inputmode=${k(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize!=="auto"}></div>
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
    `}};Y.styles=[L,Vt,Nl];p([O(".textarea__control")],Y.prototype,"input",2);p([O(".textarea__size-adjuster")],Y.prototype,"sizeAdjuster",2);p([$()],Y.prototype,"hasFocus",2);p([h()],Y.prototype,"title",2);p([h()],Y.prototype,"name",2);p([h()],Y.prototype,"value",2);p([h({reflect:true})],Y.prototype,"size",2);p([h({type:Boolean,reflect:true})],Y.prototype,"filled",2);p([h()],Y.prototype,"label",2);p([h({attribute:"help-text"})],Y.prototype,"helpText",2);p([h()],Y.prototype,"placeholder",2);p([h({type:Number})],Y.prototype,"rows",2);p([h()],Y.prototype,"resize",2);p([h({type:Boolean,reflect:true})],Y.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],Y.prototype,"readonly",2);p([h({reflect:true})],Y.prototype,"form",2);p([h({type:Boolean,reflect:true})],Y.prototype,"required",2);p([h({type:Number})],Y.prototype,"minlength",2);p([h({type:Number})],Y.prototype,"maxlength",2);p([h()],Y.prototype,"autocapitalize",2);p([h()],Y.prototype,"autocorrect",2);p([h()],Y.prototype,"autocomplete",2);p([h({type:Boolean})],Y.prototype,"autofocus",2);p([h()],Y.prototype,"enterkeyhint",2);p([h({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],Y.prototype,"spellcheck",2);p([h()],Y.prototype,"inputmode",2);p([Kt()],Y.prototype,"defaultValue",2);p([R("disabled",{waitUntilFirstUpdate:true})],Y.prototype,"handleDisabledChange",1);p([R("rows",{waitUntilFirstUpdate:true})],Y.prototype,"handleRowsChange",1);p([R("value",{waitUntilFirstUpdate:true})],Y.prototype,"handleValueChange",1);Y.define("sl-textarea");exports.AutoFieldTextArea=class Lo extends I{renderInput(){return f`
            <sl-textarea
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                placeholder="${k(this.options.placeholder)}"
                .minlength=${this.options.minLength}
                .maxlength=${this.options.maxLength}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                ?disabled=${!this.options.enable}
                .rows=${this.options.rows}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.value}</sl-textarea
            >
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea.styles=[I.styles,x`
            sl-textarea::part(textarea) {
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTextArea=v([T("auto-field-textarea")],exports.AutoFieldTextArea);var Ul=x`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`;var Ct=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,r)=>e.checked=r}),this.hasSlotController=new ft(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(e){e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(e){this.input.focus(e);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("help-text"),r=this.helpText?true:!!e;return f`
      <div
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":r})}
      >
        <label
          part="base"
          class=${M({switch:true,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${k(this.value)}
            .checked=${Nt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${r?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Ct.styles=[L,Vt,Ul];p([O('input[type="checkbox"]')],Ct.prototype,"input",2);p([$()],Ct.prototype,"hasFocus",2);p([h()],Ct.prototype,"title",2);p([h()],Ct.prototype,"name",2);p([h()],Ct.prototype,"value",2);p([h({reflect:true})],Ct.prototype,"size",2);p([h({type:Boolean,reflect:true})],Ct.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],Ct.prototype,"checked",2);p([Kt("checked")],Ct.prototype,"defaultChecked",2);p([h({reflect:true})],Ct.prototype,"form",2);p([h({type:Boolean,reflect:true})],Ct.prototype,"required",2);p([h({attribute:"help-text"})],Ct.prototype,"helpText",2);p([R("checked",{waitUntilFirstUpdate:true})],Ct.prototype,"handleCheckedChange",1);p([R("disabled",{waitUntilFirstUpdate:true})],Ct.prototype,"handleDisabledChange",1);Ct.define("sl-switch");exports.AutoFieldSwitch=class Po extends I{renderInput(){return f`
            <sl-switch
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                value="${this._getSwitchValues()[0]}"
                .checked=${this._isChecked()}
                ?disabled=${!this.options.enable}
                size="${k(this.context.size)}"
                placeholder="${k(this.options.placeholder)}"
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-switch
            >
        `}_getSwitchValues(){let r=this.options.choices;return Array.isArray(r)&&r.length>=2?[typeof r[0]=="object"?r[0].value:r[0],typeof r[1]=="object"?r[1].value:r[1]]:this.options.switchValues}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;let r=this.options.choices;if(Array.isArray(r)&&r.length>=2){let o=r[this._isChecked()?0:1];return typeof o=="object"?o.label??"":""}let t=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof t=="boolean"?"":t}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return this.value===this._getSwitchValues()[0]}getInputValue(){return this.input.checked?this._getSwitchValues()[0]:this._getSwitchValues()[1]}renderView(){return f` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `}};exports.AutoFieldSwitch.styles=[I.styles,x`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=v([T("auto-field-switch")],exports.AutoFieldSwitch);var os=x`
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
`;var Wl=x`
  ${os}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`;var Cn=Symbol.for(""),Ju=e=>{if(e?.r===Cn)return e?._$litStatic$},Kl=e=>({_$litStatic$:e,r:Cn}),qr=(e,...r)=>({_$litStatic$:r.reduce((t,o,i)=>t+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+e[i+1],e[0]),r:Cn}),ql=new Map,An=e=>(r,...t)=>{let o=t.length,i,s,n=[],a=[],l,c=0,d=false;for(;c<o;){for(l=r[c];c<o&&(s=t[c],(i=Ju(s))!==void 0);)l+=i+r[++c],d=true;c!==o&&a.push(s),n.push(l),c++;}if(c===o&&n.push(r[o]),d){let u=n.join("$$lit$$");(r=ql.get(u))===void 0&&(n.raw=n,ql.set(u,r=n)),t=a;}return e(r,...t)},fe=An(f);var Gt=class extends z{constructor(){super(...arguments),this.hasSlotController=new ft(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(e){this.input.focus(e);}blur(){this.input.blur();}render(){return fe`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${M({button:true,"button--default":true,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":true,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${k(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Gt.styles=[L,Wl];p([O(".button")],Gt.prototype,"input",2);p([O(".hidden-input")],Gt.prototype,"hiddenInput",2);p([$()],Gt.prototype,"hasFocus",2);p([h({type:Boolean,reflect:true})],Gt.prototype,"checked",2);p([h()],Gt.prototype,"value",2);p([h({type:Boolean,reflect:true})],Gt.prototype,"disabled",2);p([h({reflect:true})],Gt.prototype,"size",2);p([h({type:Boolean,reflect:true})],Gt.prototype,"pill",2);p([R("disabled",{waitUntilFirstUpdate:true})],Gt.prototype,"handleDisabledChange",1);Gt.define("sl-radio-button");exports.AutoFieldRadioButton=class Vo extends I{getInitialOptions(){return {valueKey:"value"}}renderRadioItem(r){let t=r[this.options.valueKey];return f`<sl-radio-button value="${t}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${r.label}</sl-radio-button>`}renderInput(){let r=this.getOptionValue("choices",[]).map(t=>{let o={};return typeof t=="object"?Object.assign(o,t):Object.assign(o,{label:t,value:t}),o});return f`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${r.map(t=>this.renderRadioItem(t))}
            </sl-radio-group>
        `}};exports.AutoFieldRadioButton.styles=[I.styles,x`
            sl-radio-group::part(form-control-input) {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
            }
            sl-radio {
                margin-right: 1em;
                padding: 0.2em;
            }
        `],exports.AutoFieldRadioButton=v([T("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class is extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=v([T("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class ss extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=v([T("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class ns extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=v([T("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class as extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=v([T("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class ls extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();}};exports.AutoFieldEmail=v([T("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class cs extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=v([T("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class ps extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=v([T("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class us extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=v([T("auto-field-phone")],exports.AutoFieldPhone);var hs=class{constructor(r,t){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=r,this.options={...this.options,...t},r.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(r){let t=r.target;if(this.isPreviewActive){this.closePreview();return}t.matches(this.options.selector)&&(r.preventDefault(),r.stopPropagation(),this.originalImage=t,this.showPreview(this.originalImage));}showPreview(r){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let t=this.options.overlayColor,o=this.hexToRgb(t);this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=r.src,this.previewImage.alt=r.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let i=r.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",this.closePreview.bind(this)),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:a,height:l}=this.calculateAspectRatioFit(r.naturalWidth,r.naturalHeight,s*.9,n*.9),c=(n-l)/2,d=(s-a)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${c}px`,this.previewImage.style.left=`${d}px`,this.previewImage.style.width=`${a}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let r=window.innerWidth,t=window.innerHeight,{width:o,height:i}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,r*.9,t*.9),s=(t-i)/2,n=(r-o)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${o}px`,this.previewImage.style.height=`${i}px`);});}handleKeydown(r){r.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let r=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${r.top}px`,this.previewImage.style.left=`${r.left}px`,this.previewImage.style.width=`${r.width}px`,this.previewImage.style.height=`${r.height}px`;});let t=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${t.r}, ${t.g}, ${t.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(r,t,o,i){if(r<=o&&t<=i)return {width:r,height:t};let s=Math.min(o/r,i/t);return {width:r*s,height:t*s}}hexToRgb(r){r=r.replace(/^#/,""),r.length===3&&(r=r.split("").map(s=>s+s).join(""));let t=parseInt(r.substring(0,2),16),o=parseInt(r.substring(2,4),16),i=parseInt(r.substring(4,6),16);return {r:isNaN(t)?0:t,g:isNaN(o)?0:o,b:isNaN(i)?0:i}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var $n=class{constructor(r,t){for(this.options=Object.assign({width:"8px"},t),this.target=r,this.content=r.firstElementChild,this.direction=window.getComputedStyle(this.target).direction,this.scrollRatio=1,this.bar=null,this.wrapper=document.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=document.createElement("div"),this.el.setAttribute("class","ss-content"),this.direction==="rtl"&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",'<div class="ss-scroll">'),this.bar=this.target.lastChild,this.bar.style.width=this.options.width,this.mB=this.moveBar.bind(this),this.dragDealer(this.bar),this.moveBar(),window.addEventListener("resize",this.mB),this.el.addEventListener("scroll",this.mB),this.el.addEventListener("mouseenter",this.mB),this.target.classList.add("ss-container");let o=window.getComputedStyle(r);o.height==="0px"&&o["max-height"]!=="0px"&&(r.style.height=o["max-height"]);}dragDealer(r){let t,o=n=>{let a=n.pageY-t;t=n.pageY,this.requestAnimationFrame(()=>{this.el&&(this.el.scrollTop+=a/this.scrollRatio);});},i=()=>{r.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",i);},s=n=>(t=n.pageY,r.classList.add("ss-grabbed"),document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i),false);r.mouseDownHandler=s,r.addEventListener("mousedown",s);}requestAnimationFrame(r){window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,0);}moveBar(){if(!this.el||!this.target)return;let r=this.el.scrollHeight,t=this.el.clientHeight;this.scrollRatio=t/r;let i=this.direction==="rtl"&&this.bar?this.target.clientWidth-this.bar.clientWidth+18:this.bar?(this.target.clientWidth-this.bar.clientWidth)*-1:0;this.requestAnimationFrame(()=>{this.scrollRatio>=1?this.bar?.classList.add("ss-hidden"):(this.bar?.classList.remove("ss-hidden"),this.bar&&(this.bar.style.cssText="height:"+Math.max(this.scrollRatio*100,10)+"%; top:"+this.el.scrollTop/r*100+"%;right:"+i+"px;"));});}destroy(){if(window.removeEventListener("resize",this.mB),this.el&&(this.el.removeEventListener("scroll",this.mB),this.el.removeEventListener("mouseenter",this.mB)),this.bar?.mouseDownHandler&&(this.bar.removeEventListener("mousedown",this.bar.mouseDownHandler),delete this.bar.mouseDownHandler),this.target){this.target.classList.remove("ss-container");try{this.content&&this.wrapper&&this.target.insertBefore(this.content,this.wrapper),this.wrapper&&this.target.removeChild(this.wrapper);}catch(r){console.error("Error restoring DOM structure during scrollbar destroy:",r);}if(this.bar){try{this.target.removeChild(this.bar);}catch(r){console.error("Error removing scrollbar during destroy:",r);}this.bar=null;}}this.target=null,this.content=null,this.wrapper=null,this.el=null,this.mB=null;}};(class{constructor(r){this._scrollbars=[];this.host=r,r.addController(this);}static{this.styles=x`
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
    `;}create(r,t){let o=new $n(r,t);return this._scrollbars.push(o),o}hostConnected(){}hostUpdate(){}hostDisconnected(){for(let r of this._scrollbars)r.destroy();this._scrollbars=[];}});var Qu=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],Zu=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function th(e){if(!e||typeof e!="string")return  false;let o=e.split("?")[0].split("/").pop().split(".").pop();return Qu.includes(`.${o}`)}function eh(e){if(!e||typeof e!="string")return  false;let o=e.split("?")[0].split("/").pop().split(".").pop();return Zu.includes(`.${o}`)}exports.AutoFieldUpload=class Kr extends I{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new hs(this);}retryUpload(t){this.startUpload(t.file,t.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:true}}_getDefaultFileLabel(t){return typeof t=="string"?t:t.title||t.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(t=>t!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(t){let o=t.target;if(!o.files||o.files.length===0)return;Array.from(o.files).forEach(s=>this.uploadFile(s)),o.value="";}handleDragOver(t){t.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(t){t.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(t){if(t.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!t.dataTransfer?.files)return;let i=Array.from(t.dataTransfer.files);if(!this.options?.multiple&&i.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=i.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(a=>a==="*"?true:a.startsWith(".")?n.name.toLowerCase().endsWith(a.toLowerCase()):n.type.startsWith(a)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}i.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(t){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let o={id:this.generateId(),file:t,progress:0,status:"uploading",value:{url:t.name}};return this.files.push(o),this.startUpload(t,o.id)}_updateFileRecord(t,o){let i=this.files.findIndex(s=>s.id===t);i!==-1&&(this.files=[...this.files.slice(0,i),{...this.files[i],...o},...this.files.slice(i+1)]);}_getResponseError(t){let o="\u4E0A\u4F20\u5931\u8D25";try{let i=JSON.parse(t.responseText);o=i.message||i.error||o;}catch{switch(t.status){case 400:o="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:o="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:o="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:o="\u6587\u4EF6\u592A\u5927";break;case 415:o="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:o="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:o="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:o=`\u4E0A\u4F20\u5931\u8D25 (${t.status})`;}}return new Error(o)}_defaultFileResolver(t){if(typeof t=="string")return t;if(typeof t=="object"){if(!t.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return t}}_parseUploadResponse(t){let o={};try{Object.assign(o,JSON.parse(t));}catch{o=t;}return typeof this.options.onResolve=="function"&&(o=this.options.onResolve(o)),o}async startUpload(t,o){let i=this.files.findIndex(n=>n.id===o);if(i===-1)return;let s=this.files[i];return new Promise((n,a)=>{let l=new XMLHttpRequest,c=new FormData;c.append(this.options.fileFieldName,t),l.upload.onprogress=d=>{if(d.lengthComputable){let u=Math.round(d.loaded/d.total*100);this._updateFileRecord(o,{progress:u});}},l.onload=()=>{if(this.files.findIndex(u=>u.id===o)!==-1)if(l.status>=200&&l.status<300){this._updateFileRecord(o,{status:"done"});try{let u=this._parseUploadResponse(l.responseText);this._updateFileRecord(o,{value:u}),s.status="done",this.onFieldChange(),n();}catch{let u=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(o,u),a(u);}}else {let u=this._getResponseError(l);this.handleUploadError(o,u),a(u);}},l.onerror=()=>{if(this.files.findIndex(m=>m.id===o)===-1)return;let u=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(o,u),a(u);},l.ontimeout=()=>{if(this.files.findIndex(m=>m.id===o)===-1)return;let u=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(o,u),a(u);},l.open("POST",this.options.url),this._updateFileRecord(o,{progress:0,status:"uploading"}),l.send(c);})}handleUploadError(t,o){this._updateFileRecord(t,{error:o.message,status:"error"});}deleteFile(t){let o=this.files.findIndex(a=>a.id===t);if(o===-1)return;let i=this.files[o],s=i.status==="uploading"||i.status==="error",n=()=>{this.files=[...this.files.slice(0,o),...this.files.slice(o+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,i.value)).then(()=>{n(),this.onFieldChange();}).catch(a=>{alert(a.message);}):(n(),this.onFieldChange());}getInputValue(){if(this.options.multiple){let t=this.files.map(o=>o.value);return this.options.onlyFileUrl?t.map(o=>typeof o=="object"?o.url:o):t}else {let t=this.files.length>0?this.files[0].value:void 0;if(t)return this.options.onlyFileUrl&&typeof t=="object"?t.url:t}}getStateValue(){let t=super.getStateValue();return Array.isArray(t)||(t=[t]),this.files=t.map((o,i)=>{let s={id:String(i),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof o=="string"?s.value=o:typeof o=="object"&&(s.value=Object.assign({},s.value,o)),s}),t}renderProgressbar(t,o){if(t.status!=="uploading")return;let i=o==="hori"?`width:${t.progress}%;`:`height:${t.progress}%;top:${100-t.progress}%`;return f`<span
            class="uploading progressbar ${M({hori:o==="hori",vert:o==="vert"})}"
            style="${i}"
        >
            <span class="value">${t.progress}%</span>
        </span> `}renderFileContent(t){if(t.error)return;let o=typeof t.value=="string"?t.value:t.value.url,i;if(th(o))i=f` <img class="content" src="${o}" /> `;else if(eh(o))i=f` <video class="content" src="${o}"></video> `;else {let s=o.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,i=f`<div class="content">${s}</div>`;}return i}renderFilePreview(t){let o=!!t.error,i=typeof this.options.preview=="boolean"?"80px":this.options.preview;return f`
            <div
                class="file preview ${M({error:o})}"
                title=${t.error||this.options.onFileLabel(t.value)}
                style="${rt({width:i,height:i})}"
            >
                ${this.renderFileContent(t)} ${this.renderProgressbar(t,"vert")}
                ${F(t.status==="error",()=>f`<div class="error" title="${t.error}">
                            <span>上传出错</span>
                            <span>
                                <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(t.id)}></sl-icon>
                                <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(t)}></sl-icon>
                            </span>
                        </div>`,()=>{if(!this.context.viewonly)return f`<sl-icon name="remove" @click=${()=>this.deleteFile(t.id)}></sl-icon>`})}
            </div>
        `}renderFile(t){let o=!!t.error;return f`
            <auto-flex class="file default ${M({error:o})}" wrap align="center" gap="0.5rem" title=${k(t.error)}>
                ${this.renderProgressbar(t,"hori")}
                <span class="label">${this.options.onFileLabel(t.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(t.id)}></sl-icon>
                ${F(t.status==="error",()=>f`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(t)}></sl-icon>`)}
            </auto-flex>
        `}renderFiels(){return f`<auto-flex class="files" grow="none" gap="0.5rem" wrap>
            ${F(this.files.length>0,()=>W(this.files,t=>this.options.preview?this.renderFilePreview(t):this.renderFile(t)),()=>f`<span class="placeholder">${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </auto-flex>`}renderInput(){return f`
            <auto-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${F(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>f`<div
                        class="indicator"
                        @click=${this.handleUploadClick}
                        @dragover=${this.handleDragOver}
                        @dragleave=${this.handleDragLeave}
                        @drop=${this.handleDrop}
                    >
                        ${this.options.tips}
                    </div>`)}
                <auto-flex class="actions" align="center" grow=".actions.after" gap="0.5rem">
                    ${F(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>f`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}
                    ${this.renderActions(false)}
                </auto-flex>
            </auto-flex>
        `}renderView(){return this.renderFiels()}};exports.AutoFieldUpload.styles=[I.styles,x`
            .value {
                & auto-flex.files {
                    position: relative;
                    padding: 0px;
                    & > .file.default {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0.5rem;
                        border: var(--auto-border);
                        border-radius: var(--auto-border-radius);
                        background-color: var(--auto-input-bgcolor);
                        & > [name='remove'] {
                            cursor: pointer;
                            &:hover {
                                color: var(--auto-theme-color);
                            }
                        }
                        &.error {
                            border: 1px solid red;
                            background-color: #ff006221;
                            border-radius: var(--auto-border-radius);
                            color: red;
                        }
                        & > sl-icon {
                            cursor: pointer;
                            &:hover {
                                color: var(--auto-theme-color);
                            }
                        }
                    }
                    & > .file.preview {
                        position: relative;
                        display: flex;
                        border: var(--auto-border);
                        border-radius: var(--auto-border-radius);
                        background-color: var(--auto-input-bgcolor);
                        align-items: 0px;
                        &.error {
                            border: 1px solid red;
                            background-color: #ff006221;
                            border-radius: var(--auto-border-radius);
                            color: red;
                            & > .error {
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                font-size: 0.8rem;
                                & > * {
                                    padding: 4px 0px;
                                    cursor: pointer;
                                }
                                & > :last-child {
                                    font-size: 1rem;
                                }
                            }
                        }
                        & > img.content,
                        video.content,
                        .content {
                            width: 100%;
                            flex-grow: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: var(--auto-border-color);
                            &.img {
                                object-fit: cover;
                            }
                        }
                        & > sl-icon[name='remove'] {
                            width: 16px;
                            height: 16px;
                            position: absolute;
                            display: none;
                            left: calc(100% - 8px);
                            top: -8px;
                            background-color: white;
                            border-radius: 8px;
                            cursor: pointer;
                            color: red;
                            z-index: 9;
                            &:hover {
                                color: var(--auto-theme-color);
                            }
                        }
                        &:hover > sl-icon[name='remove'] {
                            display: block;
                        }
                    }
                }
            }
            :host::part(after-actions) {
                text-align: right;
            }
            .indicator {
                border: 2px dashed var(--auto-border-color);
                border-radius: 4px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                color: var(--auto-disable-color);
                transition: all 0.2s ease;
                &.dragover {
                    border-color: #2196f3;
                    background: rgba(33, 150, 243, 0.1);
                }
                &:hover {
                    border-color: var(--auto-gray-color);
                }
            }
            .placeholder {
                border-radius: var(--auto-border-radius);
                padding: 0.5rem;
                color: var(--auto-gray-color);
                width: 100%;
            }
            .uploading.progressbar {
                position: absolute;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: var(--auto-border-radius);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                z-index: 1;
                &.hori {
                    left: 0px;
                    top: 0px;
                    width: 0px;
                    height: 100%;
                }
                &.vert {
                    left: 0px;
                    bottom: 100%;
                    width: 100%;
                    height: 0px;
                }
            }
        `],v([$()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=v([T("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class ds extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=v([T("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class Do extends I{getInitialOptions(){return {size:"medium"}}_onPartFocus(r){r.target.select();}_getIpBits(){let r=this.value?.split(".");return [parseInt(r[0]||"0"),parseInt(r[1]||"0"),parseInt(r[2]||"0"),parseInt(r[3]||"0")]}_onIpChange(r,t){this.onFieldChange(),this._isLastInput(t);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(t=>t.value).join(".")}_isLastInput(r){let t=r.target;if(t.value.length>=3){t.blur();let o=t.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(r){r.preventDefault();let t=r.target,o=r.clipboardData?.getData("text/plain")||"",i=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=o.match(i);if(!s)return;let n=[],a=t;for(let l=0;l<4&&a;l++)a.tagName==="SL-INPUT"&&n.push(a),a=a.nextElementSibling?.nextElementSibling;for(let l=0;l<Math.min(4,n.length);l++)n[l].value=s[l+1],n[l].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let l=n[Math.min(3,n.length-1)];l.focus(),l.select();}}renderInput(){return f`
            <auto-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((r,t)=>f`
                        <sl-input
                            value="${r}"
                            name=${this.name}
                            data-path=${this.path}
                            defaultValue="0"
                            size=${this.context.size}
                            maxLength="3"
                            minLength="1"
                            max="255"
                            min="0"
                            ?disabled=${!this.options.enable}
                            @sl-input=${o=>this._onIpChange(t,o)}
                            @sl-change=${o=>this._onIpChange(t,o)}
                            @sl-focus=${this._onPartFocus.bind(this)}
                            @paste=${o=>this._onPaste(o)}
                        ></sl-input>
                        ${t<3?f`<span class="dot">.</span>`:""}
                    `)}
            </auto-flex>
        `}};exports.AutoFieldIpAddress.styles=[I.styles,x`
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
        `],exports.AutoFieldIpAddress=v([T("auto-field-ipaddress")],exports.AutoFieldIpAddress);var Yl=x`
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
`;var Xl=x`
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
`;var mt=class extends z{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}click(){this.button.click();}focus(e){this.button.focus(e);}blur(){this.button.blur();}render(){let e=!!this.href,r=e?qr`a`:qr`button`;return fe`
      <${r}
        part="base"
        class=${M({"icon-button":true,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${k(e?void 0:this.disabled)}
        type=${k(e?void 0:"button")}
        href=${k(e?this.href:void 0)}
        target=${k(e?this.target:void 0)}
        download=${k(e?this.download:void 0)}
        rel=${k(e&&this.target?"noreferrer noopener":void 0)}
        role=${k(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${k(this.name)}
          library=${k(this.library)}
          src=${k(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${r}>
    `}};mt.styles=[L,Xl];mt.dependencies={"sl-icon":K};p([O(".icon-button")],mt.prototype,"button",2);p([$()],mt.prototype,"hasFocus",2);p([h()],mt.prototype,"name",2);p([h()],mt.prototype,"library",2);p([h()],mt.prototype,"src",2);p([h()],mt.prototype,"href",2);p([h()],mt.prototype,"target",2);p([h()],mt.prototype,"download",2);p([h()],mt.prototype,"label",2);p([h({type:Boolean,reflect:true})],mt.prototype,"disabled",2);var En=new Set,Gr=new Map,ur,On="ltr",Tn="en",Jl=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Jl){let e=new MutationObserver(Ql);On=document.documentElement.dir||"ltr",Tn=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function Fo(...e){e.map(r=>{let t=r.$code.toLowerCase();Gr.has(t)?Gr.set(t,Object.assign(Object.assign({},Gr.get(t)),r)):Gr.set(t,r),ur||(ur=r);}),Ql();}function Ql(){Jl&&(On=document.documentElement.dir||"ltr",Tn=document.documentElement.lang||navigator.language),[...En.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate();});}var fs=class{constructor(r){this.host=r,this.host.addController(this);}hostConnected(){En.add(this.host);}hostDisconnected(){En.delete(this.host);}dir(){return `${this.host.dir||On}`.toLowerCase()}lang(){return `${this.host.lang||Tn}`.toLowerCase()}getTranslationData(r){var t,o;let i=new Intl.Locale(r.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(o=(t=i?.region)===null||t===void 0?void 0:t.toLowerCase())!==null&&o!==void 0?o:"",a=Gr.get(`${s}-${n}`),l=Gr.get(s);return {locale:i,language:s,region:n,primary:a,secondary:l}}exists(r,t){var o;let{primary:i,secondary:s}=this.getTranslationData((o=t.lang)!==null&&o!==void 0?o:this.lang());return t=Object.assign({includeFallback:false},t),!!(i&&i[r]||s&&s[r]||t.includeFallback&&ur&&ur[r])}term(r,...t){let{primary:o,secondary:i}=this.getTranslationData(this.lang()),s;if(o&&o[r])s=o[r];else if(i&&i[r])s=i[r];else if(ur&&ur[r])s=ur[r];else return console.error(`No translation found for: ${String(r)}`),String(r);return typeof s=="function"?s(...t):s}date(r,t){return r=new Date(r),new Intl.DateTimeFormat(this.lang(),t).format(r)}number(r,t){return r=Number(r),isNaN(r)?"":new Intl.NumberFormat(this.lang(),t).format(r)}relativeTime(r,t,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(r,t)}};var Zl={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,r)=>`Go to slide ${e} of ${r}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};Fo(Zl);var tc=Zl;var G=class extends fs{};Fo(tc);var me=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return f`
      <span
        part="base"
        class=${M({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?f`
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
    `}};me.styles=[L,Yl];me.dependencies={"sl-icon-button":mt};p([h({reflect:true})],me.prototype,"variant",2);p([h({reflect:true})],me.prototype,"size",2);p([h({type:Boolean,reflect:true})],me.prototype,"pill",2);p([h({type:Boolean})],me.prototype,"removable",2);var ec=x`
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
`;function rh(e,r){return {top:Math.round(e.getBoundingClientRect().top-r.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-r.getBoundingClientRect().left)}}function Ho(e,r,t="vertical",o="smooth"){let i=rh(e,r),s=i.top+r.scrollTop,n=i.left+r.scrollLeft,a=r.scrollLeft,l=r.scrollLeft+r.offsetWidth,c=r.scrollTop,d=r.scrollTop+r.offsetHeight;(t==="horizontal"||t==="both")&&(n<a?r.scrollTo({left:n,behavior:o}):n+e.clientWidth>l&&r.scrollTo({left:n-r.offsetWidth+e.clientWidth,behavior:o})),(t==="vertical"||t==="both")&&(s<c?r.scrollTo({top:s,behavior:o}):s+e.clientHeight>d&&r.scrollTo({top:s-r.offsetHeight+e.clientHeight,behavior:o}));}var rc=x`
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
`;var ge=Math.min,Rt=Math.max,Bo=Math.round,No=Math.floor,le=e=>({x:e,y:e}),oh={left:"right",right:"left",bottom:"top",top:"bottom"},ih={start:"end",end:"start"};function gs(e,r,t){return Rt(e,ge(r,t))}function hr(e,r){return typeof e=="function"?e(r):e}function $e(e){return e.split("-")[0]}function dr(e){return e.split("-")[1]}function Rn(e){return e==="x"?"y":"x"}function bs(e){return e==="y"?"height":"width"}var sh=new Set(["top","bottom"]);function be(e){return sh.has($e(e))?"y":"x"}function vs(e){return Rn(be(e))}function sc(e,r,t){t===void 0&&(t=false);let o=dr(e),i=vs(e),s=bs(i),n=i==="x"?o===(t?"end":"start")?"right":"left":o==="start"?"bottom":"top";return r.reference[s]>r.floating[s]&&(n=jo(n)),[n,jo(n)]}function nc(e){let r=jo(e);return [ms(e),r,ms(r)]}function ms(e){return e.replace(/start|end/g,r=>ih[r])}var oc=["left","right"],ic=["right","left"],nh=["top","bottom"],ah=["bottom","top"];function lh(e,r,t){switch(e){case "top":case "bottom":return t?r?ic:oc:r?oc:ic;case "left":case "right":return r?nh:ah;default:return []}}function ac(e,r,t,o){let i=dr(e),s=lh($e(e),t==="start",o);return i&&(s=s.map(n=>n+"-"+i),r&&(s=s.concat(s.map(ms)))),s}function jo(e){return e.replace(/left|right|bottom|top/g,r=>oh[r])}function ch(e){return {top:0,right:0,bottom:0,left:0,...e}}function In(e){return typeof e!="number"?ch(e):{top:e,right:e,bottom:e,left:e}}function fr(e){let{x:r,y:t,width:o,height:i}=e;return {width:o,height:i,top:t,left:r,right:r+o,bottom:t+i,x:r,y:t}}function lc(e,r,t){let{reference:o,floating:i}=e,s=be(r),n=vs(r),a=bs(n),l=$e(r),c=s==="y",d=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,m=o[a]/2-i[a]/2,g;switch(l){case "top":g={x:d,y:o.y-i.height};break;case "bottom":g={x:d,y:o.y+o.height};break;case "right":g={x:o.x+o.width,y:u};break;case "left":g={x:o.x-i.width,y:u};break;default:g={x:o.x,y:o.y};}switch(dr(r)){case "start":g[n]-=m*(t&&c?-1:1);break;case "end":g[n]+=m*(t&&c?-1:1);break}return g}var cc=async(e,r,t)=>{let{placement:o="bottom",strategy:i="absolute",middleware:s=[],platform:n}=t,a=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(r)),c=await n.getElementRects({reference:e,floating:r,strategy:i}),{x:d,y:u}=lc(c,o,l),m=o,g={},b=0;for(let y=0;y<a.length;y++){let{name:C,fn:S}=a[y],{x:w,y:E,data:_,reset:A}=await S({x:d,y:u,initialPlacement:o,placement:m,strategy:i,middlewareData:g,rects:c,platform:n,elements:{reference:e,floating:r}});d=w??d,u=E??u,g={...g,[C]:{...g[C],..._}},A&&b<=50&&(b++,typeof A=="object"&&(A.placement&&(m=A.placement),A.rects&&(c=A.rects===true?await n.getElementRects({reference:e,floating:r,strategy:i}):A.rects),{x:d,y:u}=lc(c,m,l)),y=-1);}return {x:d,y:u,placement:m,strategy:i,middlewareData:g}};async function ys(e,r){var t;r===void 0&&(r={});let{x:o,y:i,platform:s,rects:n,elements:a,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:m=false,padding:g=0}=hr(r,e),b=In(g),C=a[m?u==="floating"?"reference":"floating":u],S=fr(await s.getClippingRect({element:(t=await(s.isElement==null?void 0:s.isElement(C)))==null||t?C:C.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:c,rootBoundary:d,strategy:l})),w=u==="floating"?{x:o,y:i,width:n.floating.width,height:n.floating.height}:n.reference,E=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),_=await(s.isElement==null?void 0:s.isElement(E))?await(s.getScale==null?void 0:s.getScale(E))||{x:1,y:1}:{x:1,y:1},A=fr(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:w,offsetParent:E,strategy:l}):w);return {top:(S.top-A.top+b.top)/_.y,bottom:(A.bottom-S.bottom+b.bottom)/_.y,left:(S.left-A.left+b.left)/_.x,right:(A.right-S.right+b.right)/_.x}}var pc=e=>({name:"arrow",options:e,async fn(r){let{x:t,y:o,placement:i,rects:s,platform:n,elements:a,middlewareData:l}=r,{element:c,padding:d=0}=hr(e,r)||{};if(c==null)return {};let u=In(d),m={x:t,y:o},g=vs(i),b=bs(g),y=await n.getDimensions(c),C=g==="y",S=C?"top":"left",w=C?"bottom":"right",E=C?"clientHeight":"clientWidth",_=s.reference[b]+s.reference[g]-m[g]-s.floating[b],A=m[g]-s.reference[g],V=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c)),j=V?V[E]:0;(!j||!await(n.isElement==null?void 0:n.isElement(V)))&&(j=a.floating[E]||s.floating[b]);let U=_/2-A/2,D=j/2-y[b]/2-1,P=ge(u[S],D),gt=ge(u[w],D),pt=P,Et=j-y[b]-gt,ut=j/2-y[b]/2+U,qt=gs(pt,ut,Et),he=!l.arrow&&dr(i)!=null&&ut!==qt&&s.reference[b]/2-(ut<pt?P:gt)-y[b]/2<0,se=he?ut<pt?ut-pt:ut-Et:0;return {[g]:m[g]+se,data:{[g]:qt,centerOffset:ut-qt-se,...he&&{alignmentOffset:se}},reset:he}}});var uc=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(r){var t,o;let{placement:i,middlewareData:s,rects:n,initialPlacement:a,platform:l,elements:c}=r,{mainAxis:d=true,crossAxis:u=true,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:y=true,...C}=hr(e,r);if((t=s.arrow)!=null&&t.alignmentOffset)return {};let S=$e(i),w=be(a),E=$e(a)===a,_=await(l.isRTL==null?void 0:l.isRTL(c.floating)),A=m||(E||!y?[jo(a)]:nc(a)),V=b!=="none";!m&&V&&A.push(...ac(a,y,b,_));let j=[a,...A],U=await ys(r,C),D=[],P=((o=s.flip)==null?void 0:o.overflows)||[];if(d&&D.push(U[S]),u){let ut=sc(i,n,_);D.push(U[ut[0]],U[ut[1]]);}if(P=[...P,{placement:i,overflows:D}],!D.every(ut=>ut<=0)){var gt,pt;let ut=(((gt=s.flip)==null?void 0:gt.index)||0)+1,qt=j[ut];if(qt&&(!(u==="alignment"?w!==be(qt):false)||P.every(ne=>be(ne.placement)===w?ne.overflows[0]>0:true)))return {data:{index:ut,overflows:P},reset:{placement:qt}};let he=(pt=P.filter(se=>se.overflows[0]<=0).sort((se,ne)=>se.overflows[1]-ne.overflows[1])[0])==null?void 0:pt.placement;if(!he)switch(g){case "bestFit":{var Et;let se=(Et=P.filter(ne=>{if(V){let Re=be(ne.placement);return Re===w||Re==="y"}return  true}).map(ne=>[ne.placement,ne.overflows.filter(Re=>Re>0).reduce((Re,Fp)=>Re+Fp,0)]).sort((ne,Re)=>ne[1]-Re[1])[0])==null?void 0:Et[0];se&&(he=se);break}case "initialPlacement":he=a;break}if(i!==he)return {reset:{placement:he}}}return {}}}};var ph=new Set(["left","top"]);async function uh(e,r){let{placement:t,platform:o,elements:i}=e,s=await(o.isRTL==null?void 0:o.isRTL(i.floating)),n=$e(t),a=dr(t),l=be(t)==="y",c=ph.has(n)?-1:1,d=s&&l?-1:1,u=hr(r,e),{mainAxis:m,crossAxis:g,alignmentAxis:b}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return a&&typeof b=="number"&&(g=a==="end"?b*-1:b),l?{x:g*d,y:m*c}:{x:m*c,y:g*d}}var hc=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(r){var t,o;let{x:i,y:s,placement:n,middlewareData:a}=r,l=await uh(r,e);return n===((t=a.offset)==null?void 0:t.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:i+l.x,y:s+l.y,data:{...l,placement:n}}}}},dc=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(r){let{x:t,y:o,placement:i}=r,{mainAxis:s=true,crossAxis:n=false,limiter:a={fn:C=>{let{x:S,y:w}=C;return {x:S,y:w}}},...l}=hr(e,r),c={x:t,y:o},d=await ys(r,l),u=be($e(i)),m=Rn(u),g=c[m],b=c[u];if(s){let C=m==="y"?"top":"left",S=m==="y"?"bottom":"right",w=g+d[C],E=g-d[S];g=gs(w,g,E);}if(n){let C=u==="y"?"top":"left",S=u==="y"?"bottom":"right",w=b+d[C],E=b-d[S];b=gs(w,b,E);}let y=a.fn({...r,[m]:g,[u]:b});return {...y,data:{x:y.x-t,y:y.y-o,enabled:{[m]:s,[u]:n}}}}}};var fc=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(r){var t,o;let{placement:i,rects:s,platform:n,elements:a}=r,{apply:l=()=>{},...c}=hr(e,r),d=await ys(r,c),u=$e(i),m=dr(i),g=be(i)==="y",{width:b,height:y}=s.floating,C,S;u==="top"||u==="bottom"?(C=u,S=m===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(S=u,C=m==="end"?"top":"bottom");let w=y-d.top-d.bottom,E=b-d.left-d.right,_=ge(y-d[C],w),A=ge(b-d[S],E),V=!r.middlewareData.shift,j=_,U=A;if((t=r.middlewareData.shift)!=null&&t.enabled.x&&(U=E),(o=r.middlewareData.shift)!=null&&o.enabled.y&&(j=w),V&&!m){let P=Rt(d.left,0),gt=Rt(d.right,0),pt=Rt(d.top,0),Et=Rt(d.bottom,0);g?U=b-2*(P!==0||gt!==0?P+gt:Rt(d.left,d.right)):j=y-2*(pt!==0||Et!==0?pt+Et:Rt(d.top,d.bottom));}await l({...r,availableWidth:U,availableHeight:j});let D=await n.getDimensions(a.floating);return b!==D.width||y!==D.height?{reset:{rects:true}}:{}}}};function xs(){return typeof window<"u"}function mr(e){return gc(e)?(e.nodeName||"").toLowerCase():"#document"}function Dt(e){var r;return (e==null||(r=e.ownerDocument)==null?void 0:r.defaultView)||window}function ce(e){var r;return (r=(gc(e)?e.ownerDocument:e.document)||window.document)==null?void 0:r.documentElement}function gc(e){return xs()?e instanceof Node||e instanceof Dt(e).Node:false}function Yt(e){return xs()?e instanceof Element||e instanceof Dt(e).Element:false}function pe(e){return xs()?e instanceof HTMLElement||e instanceof Dt(e).HTMLElement:false}function mc(e){return !xs()||typeof ShadowRoot>"u"?false:e instanceof ShadowRoot||e instanceof Dt(e).ShadowRoot}var hh=new Set(["inline","contents"]);function Xr(e){let{overflow:r,overflowX:t,overflowY:o,display:i}=Xt(e);return /auto|scroll|overlay|hidden|clip/.test(r+o+t)&&!hh.has(i)}var dh=new Set(["table","td","th"]);function bc(e){return dh.has(mr(e))}var fh=[":popover-open",":modal"];function Uo(e){return fh.some(r=>{try{return e.matches(r)}catch{return  false}})}var mh=["transform","translate","scale","rotate","perspective"],gh=["transform","translate","scale","rotate","perspective","filter"],bh=["paint","layout","strict","content"];function Jr(e){let r=_s(),t=Yt(e)?Xt(e):e;return mh.some(o=>t[o]?t[o]!=="none":false)||(t.containerType?t.containerType!=="normal":false)||!r&&(t.backdropFilter?t.backdropFilter!=="none":false)||!r&&(t.filter?t.filter!=="none":false)||gh.some(o=>(t.willChange||"").includes(o))||bh.some(o=>(t.contain||"").includes(o))}function vc(e){let r=Ee(e);for(;pe(r)&&!gr(r);){if(Jr(r))return r;if(Uo(r))return null;r=Ee(r);}return null}function _s(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}var vh=new Set(["html","body","#document"]);function gr(e){return vh.has(mr(e))}function Xt(e){return Dt(e).getComputedStyle(e)}function Wo(e){return Yt(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Ee(e){if(mr(e)==="html")return e;let r=e.assignedSlot||e.parentNode||mc(e)&&e.host||ce(e);return mc(r)?r.host:r}function yc(e){let r=Ee(e);return gr(r)?e.ownerDocument?e.ownerDocument.body:e.body:pe(r)&&Xr(r)?r:yc(r)}function Yr(e,r,t){var o;r===void 0&&(r=[]),t===void 0&&(t=true);let i=yc(e),s=i===((o=e.ownerDocument)==null?void 0:o.body),n=Dt(i);if(s){let a=ws(n);return r.concat(n,n.visualViewport||[],Xr(i)?i:[],a&&t?Yr(a):[])}return r.concat(i,Yr(i,[],t))}function ws(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Sc(e){let r=Xt(e),t=parseFloat(r.width)||0,o=parseFloat(r.height)||0,i=pe(e),s=i?e.offsetWidth:t,n=i?e.offsetHeight:o,a=Bo(t)!==s||Bo(o)!==n;return a&&(t=s,o=n),{width:t,height:o,$:a}}function zn(e){return Yt(e)?e:e.contextElement}function Qr(e){let r=zn(e);if(!pe(r))return le(1);let t=r.getBoundingClientRect(),{width:o,height:i,$:s}=Sc(r),n=(s?Bo(t.width):t.width)/o,a=(s?Bo(t.height):t.height)/i;return (!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}var yh=le(0);function kc(e){let r=Dt(e);return !_s()||!r.visualViewport?yh:{x:r.visualViewport.offsetLeft,y:r.visualViewport.offsetTop}}function xh(e,r,t){return r===void 0&&(r=false),!t||r&&t!==Dt(e)?false:r}function br(e,r,t,o){r===void 0&&(r=false),t===void 0&&(t=false);let i=e.getBoundingClientRect(),s=zn(e),n=le(1);r&&(o?Yt(o)&&(n=Qr(o)):n=Qr(e));let a=xh(s,t,o)?kc(s):le(0),l=(i.left+a.x)/n.x,c=(i.top+a.y)/n.y,d=i.width/n.x,u=i.height/n.y;if(s){let m=Dt(s),g=o&&Yt(o)?Dt(o):o,b=m,y=ws(b);for(;y&&o&&g!==b;){let C=Qr(y),S=y.getBoundingClientRect(),w=Xt(y),E=S.left+(y.clientLeft+parseFloat(w.paddingLeft))*C.x,_=S.top+(y.clientTop+parseFloat(w.paddingTop))*C.y;l*=C.x,c*=C.y,d*=C.x,u*=C.y,l+=E,c+=_,b=Dt(y),y=ws(b);}}return fr({width:d,height:u,x:l,y:c})}function Ss(e,r){let t=Wo(e).scrollLeft;return r?r.left+t:br(ce(e)).left+t}function Cc(e,r){let t=e.getBoundingClientRect(),o=t.left+r.scrollLeft-Ss(e,t),i=t.top+r.scrollTop;return {x:o,y:i}}function _h(e){let{elements:r,rect:t,offsetParent:o,strategy:i}=e,s=i==="fixed",n=ce(o),a=r?Uo(r.floating):false;if(o===n||a&&s)return t;let l={scrollLeft:0,scrollTop:0},c=le(1),d=le(0),u=pe(o);if((u||!u&&!s)&&((mr(o)!=="body"||Xr(n))&&(l=Wo(o)),pe(o))){let g=br(o);c=Qr(o),d.x=g.x+o.clientLeft,d.y=g.y+o.clientTop;}let m=n&&!u&&!s?Cc(n,l):le(0);return {width:t.width*c.x,height:t.height*c.y,x:t.x*c.x-l.scrollLeft*c.x+d.x+m.x,y:t.y*c.y-l.scrollTop*c.y+d.y+m.y}}function wh(e){return Array.from(e.getClientRects())}function Sh(e){let r=ce(e),t=Wo(e),o=e.ownerDocument.body,i=Rt(r.scrollWidth,r.clientWidth,o.scrollWidth,o.clientWidth),s=Rt(r.scrollHeight,r.clientHeight,o.scrollHeight,o.clientHeight),n=-t.scrollLeft+Ss(e),a=-t.scrollTop;return Xt(o).direction==="rtl"&&(n+=Rt(r.clientWidth,o.clientWidth)-i),{width:i,height:s,x:n,y:a}}var xc=25;function kh(e,r){let t=Dt(e),o=ce(e),i=t.visualViewport,s=o.clientWidth,n=o.clientHeight,a=0,l=0;if(i){s=i.width,n=i.height;let d=_s();(!d||d&&r==="fixed")&&(a=i.offsetLeft,l=i.offsetTop);}let c=Ss(o);if(c<=0){let d=o.ownerDocument,u=d.body,m=getComputedStyle(u),g=d.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,b=Math.abs(o.clientWidth-u.clientWidth-g);b<=xc&&(s-=b);}else c<=xc&&(s+=c);return {width:s,height:n,x:a,y:l}}var Ch=new Set(["absolute","fixed"]);function Ah(e,r){let t=br(e,true,r==="fixed"),o=t.top+e.clientTop,i=t.left+e.clientLeft,s=pe(e)?Qr(e):le(1),n=e.clientWidth*s.x,a=e.clientHeight*s.y,l=i*s.x,c=o*s.y;return {width:n,height:a,x:l,y:c}}function _c(e,r,t){let o;if(r==="viewport")o=kh(e,t);else if(r==="document")o=Sh(ce(e));else if(Yt(r))o=Ah(r,t);else {let i=kc(e);o={x:r.x-i.x,y:r.y-i.y,width:r.width,height:r.height};}return fr(o)}function Ac(e,r){let t=Ee(e);return t===r||!Yt(t)||gr(t)?false:Xt(t).position==="fixed"||Ac(t,r)}function $h(e,r){let t=r.get(e);if(t)return t;let o=Yr(e,[],false).filter(a=>Yt(a)&&mr(a)!=="body"),i=null,s=Xt(e).position==="fixed",n=s?Ee(e):e;for(;Yt(n)&&!gr(n);){let a=Xt(n),l=Jr(n);!l&&a.position==="fixed"&&(i=null),(s?!l&&!i:!l&&a.position==="static"&&!!i&&Ch.has(i.position)||Xr(n)&&!l&&Ac(e,n))?o=o.filter(d=>d!==n):i=a,n=Ee(n);}return r.set(e,o),o}function Eh(e){let{element:r,boundary:t,rootBoundary:o,strategy:i}=e,n=[...t==="clippingAncestors"?Uo(r)?[]:$h(r,this._c):[].concat(t),o],a=n[0],l=n.reduce((c,d)=>{let u=_c(r,d,i);return c.top=Rt(u.top,c.top),c.right=ge(u.right,c.right),c.bottom=ge(u.bottom,c.bottom),c.left=Rt(u.left,c.left),c},_c(r,a,i));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Oh(e){let{width:r,height:t}=Sc(e);return {width:r,height:t}}function Th(e,r,t){let o=pe(r),i=ce(r),s=t==="fixed",n=br(e,true,s,r),a={scrollLeft:0,scrollTop:0},l=le(0);function c(){l.x=Ss(i);}if(o||!o&&!s)if((mr(r)!=="body"||Xr(i))&&(a=Wo(r)),o){let g=br(r,true,s,r);l.x=g.x+r.clientLeft,l.y=g.y+r.clientTop;}else i&&c();s&&!o&&i&&c();let d=i&&!o&&!s?Cc(i,a):le(0),u=n.left+a.scrollLeft-l.x-d.x,m=n.top+a.scrollTop-l.y-d.y;return {x:u,y:m,width:n.width,height:n.height}}function Mn(e){return Xt(e).position==="static"}function wc(e,r){if(!pe(e)||Xt(e).position==="fixed")return null;if(r)return r(e);let t=e.offsetParent;return ce(e)===t&&(t=t.ownerDocument.body),t}function $c(e,r){let t=Dt(e);if(Uo(e))return t;if(!pe(e)){let i=Ee(e);for(;i&&!gr(i);){if(Yt(i)&&!Mn(i))return i;i=Ee(i);}return t}let o=wc(e,r);for(;o&&bc(o)&&Mn(o);)o=wc(o,r);return o&&gr(o)&&Mn(o)&&!Jr(o)?t:o||vc(e)||t}var Rh=async function(e){let r=this.getOffsetParent||$c,t=this.getDimensions,o=await t(e.floating);return {reference:Th(e.reference,await r(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Ih(e){return Xt(e).direction==="rtl"}var qo={convertOffsetParentRelativeRectToViewportRelativeRect:_h,getDocumentElement:ce,getClippingRect:Eh,getOffsetParent:$c,getElementRects:Rh,getClientRects:wh,getDimensions:Oh,getScale:Qr,isElement:Yt,isRTL:Ih};function Ec(e,r){return e.x===r.x&&e.y===r.y&&e.width===r.width&&e.height===r.height}function Mh(e,r){let t=null,o,i=ce(e);function s(){var a;clearTimeout(o),(a=t)==null||a.disconnect(),t=null;}function n(a,l){a===void 0&&(a=false),l===void 0&&(l=1),s();let c=e.getBoundingClientRect(),{left:d,top:u,width:m,height:g}=c;if(a||r(),!m||!g)return;let b=No(u),y=No(i.clientWidth-(d+m)),C=No(i.clientHeight-(u+g)),S=No(d),E={rootMargin:-b+"px "+-y+"px "+-C+"px "+-S+"px",threshold:Rt(0,ge(1,l))||1},_=true;function A(V){let j=V[0].intersectionRatio;if(j!==l){if(!_)return n();j?n(false,j):o=setTimeout(()=>{n(false,1e-7);},1e3);}j===1&&!Ec(c,e.getBoundingClientRect())&&n(),_=false;}try{t=new IntersectionObserver(A,{...E,root:i.ownerDocument});}catch{t=new IntersectionObserver(A,E);}t.observe(e);}return n(true),s}function Oc(e,r,t,o){o===void 0&&(o={});let{ancestorScroll:i=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=false}=o,c=zn(e),d=i||s?[...c?Yr(c):[],...Yr(r)]:[];d.forEach(S=>{i&&S.addEventListener("scroll",t,{passive:true}),s&&S.addEventListener("resize",t);});let u=c&&a?Mh(c,t):null,m=-1,g=null;n&&(g=new ResizeObserver(S=>{let[w]=S;w&&w.target===c&&g&&(g.unobserve(r),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var E;(E=g)==null||E.observe(r);})),t();}),c&&!l&&g.observe(c),g.observe(r));let b,y=l?br(e):null;l&&C();function C(){let S=br(e);y&&!Ec(y,S)&&t(),y=S,b=requestAnimationFrame(C);}return t(),()=>{var S;d.forEach(w=>{i&&w.removeEventListener("scroll",t),s&&w.removeEventListener("resize",t);}),u?.(),(S=g)==null||S.disconnect(),g=null,l&&cancelAnimationFrame(b);}}var Tc=hc;var Rc=dc,Ic=uc,Ln=fc;var Mc=pc;var zc=(e,r,t)=>{let o=new Map,i={platform:qo,...t},s={...i.platform,_c:o};return cc(e,r,{...i,platform:s})};function Lc(e){return zh(e)}function Pn(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function zh(e){for(let r=e;r;r=Pn(r))if(r instanceof Element&&getComputedStyle(r).display==="none")return null;for(let r=Pn(e);r;r=Pn(r)){if(!(r instanceof Element))continue;let t=getComputedStyle(r);if(t.display!=="contents"&&(t.position!=="static"||Jr(t)||r.tagName==="BODY"))return r}return null}function Lh(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e.contextElement instanceof Element:true)}var Q=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),r=this.popup.getBoundingClientRect(),t=this.placement.includes("top")||this.placement.includes("bottom"),o=0,i=0,s=0,n=0,a=0,l=0,c=0,d=0;t?e.top<r.top?(o=e.left,i=e.bottom,s=e.right,n=e.bottom,a=r.left,l=r.top,c=r.right,d=r.top):(o=r.left,i=r.bottom,s=r.right,n=r.bottom,a=e.left,l=e.top,c=e.right,d=e.top):e.left<r.left?(o=e.right,i=e.top,s=r.left,n=r.top,a=e.right,l=e.bottom,c=r.left,d=r.bottom):(o=r.right,i=r.top,s=e.left,n=e.top,a=r.right,l=r.bottom,c=e.left,d=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${d}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor);}else this.anchor instanceof Element||Lh(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Oc(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e();})}reposition(){if(!this.active||!this.anchorEl)return;let e=[Tc({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Ln({apply:({rects:t})=>{let o=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${t.reference.width}px`:"",this.popup.style.height=i?`${t.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&e.push(Ic({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(Rc({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(Ln({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(Mc({element:this.arrowEl,padding:this.arrowPadding}));let r=this.strategy==="absolute"?t=>qo.getOffsetParent(t,Lc):qo.getOffsetParent;zc(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:Se(Ot({},qo),{getOffsetParent:r})}).then(({x:t,y:o,middlewareData:i,placement:s})=>{let n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${t}px`,top:`${o}px`}),this.arrow){let l=i.arrow.x,c=i.arrow.y,d="",u="",m="",g="";if(this.arrowPlacement==="start"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",u=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=n?"":b,g=n?b:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",d=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",d=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:d,right:u,bottom:m,left:g,[a]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return f`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${M({"popup-hover-bridge":true,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${M({popup:true,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?f`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};Q.styles=[L,rc];p([O(".popup")],Q.prototype,"popup",2);p([O(".popup__arrow")],Q.prototype,"arrowEl",2);p([h()],Q.prototype,"anchor",2);p([h({type:Boolean,reflect:true})],Q.prototype,"active",2);p([h({reflect:true})],Q.prototype,"placement",2);p([h({reflect:true})],Q.prototype,"strategy",2);p([h({type:Number})],Q.prototype,"distance",2);p([h({type:Number})],Q.prototype,"skidding",2);p([h({type:Boolean})],Q.prototype,"arrow",2);p([h({attribute:"arrow-placement"})],Q.prototype,"arrowPlacement",2);p([h({attribute:"arrow-padding",type:Number})],Q.prototype,"arrowPadding",2);p([h({type:Boolean})],Q.prototype,"flip",2);p([h({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(r=>r.trim()).filter(r=>r!==""),toAttribute:e=>e.join(" ")}})],Q.prototype,"flipFallbackPlacements",2);p([h({attribute:"flip-fallback-strategy"})],Q.prototype,"flipFallbackStrategy",2);p([h({type:Object})],Q.prototype,"flipBoundary",2);p([h({attribute:"flip-padding",type:Number})],Q.prototype,"flipPadding",2);p([h({type:Boolean})],Q.prototype,"shift",2);p([h({type:Object})],Q.prototype,"shiftBoundary",2);p([h({attribute:"shift-padding",type:Number})],Q.prototype,"shiftPadding",2);p([h({attribute:"auto-size"})],Q.prototype,"autoSize",2);p([h()],Q.prototype,"sync",2);p([h({type:Object})],Q.prototype,"autoSizeBoundary",2);p([h({attribute:"auto-size-padding",type:Number})],Q.prototype,"autoSizePadding",2);p([h({attribute:"hover-bridge",type:Boolean})],Q.prototype,"hoverBridge",2);var Vc=new Map,Ph=new WeakMap;function Vh(e){return e??{keyframes:[],options:{duration:0}}}function Pc(e,r){return r.toLowerCase()==="rtl"?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function Jt(e,r){Vc.set(e,Vh(r));}function Qt(e,r,t){let o=Ph.get(e);if(o?.[r])return Pc(o[r],t.dir);let i=Vc.get(r);return i?Pc(i,t.dir):{keyframes:[],options:{duration:0}}}function Oe(e,r){return new Promise(t=>{function o(i){i.target===e&&(e.removeEventListener(r,o),t());}e.addEventListener(r,o);})}function Zt(e,r,t){return new Promise(o=>{if(t?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=e.animate(r,Se(Ot({},t),{duration:Dh()?0:t.duration}));i.addEventListener("cancel",o,{once:true}),i.addEventListener("finish",o,{once:true});})}function Dh(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function te(e){return Promise.all(e.getAnimations().map(r=>new Promise(t=>{r.cancel(),requestAnimationFrame(t);})))}function Zr(e,r){return e.map(t=>Se(Ot({},t),{height:t.height==="auto"?`${r}px`:t.height}))}var B=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ft(this,"help-text","label"),this.localize=new G(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=e=>f`
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
        @sl-remove=${r=>this.handleTagRemove(r,e)}
      >
        ${e.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=e=>{let r=e.composedPath();this&&!r.includes(this)&&this.hide();},this.handleDocumentKeyDown=e=>{let r=e.target,t=r.closest(".select__clear")!==null,o=r.closest("sl-icon-button")!==null;if(!(t||o)){if(e.key==="Escape"&&this.open&&!this.closeWatcher&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let i=this.getAllOptions(),s=i.indexOf(this.currentOption),n=Math.max(0,s);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(n=s+1,n>i.length-1&&(n=0)):e.key==="ArrowUp"?(n=s-1,n<0&&(n=i.length-1)):e.key==="Home"?n=0:e.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n]);}if(e.key&&e.key.length===1||e.key==="Backspace"){let i=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show();}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(let s of i)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=e=>{let r=e.composedPath();this&&!r.includes(this)&&this.hide();};}get value(){return this._value}set value(e){this.multiple?e=Array.isArray(e)?e:e.split(" "):e=Array.isArray(e)?e.join(" "):e,this._value!==e&&(this.valueHasChanged=true,this._value=e);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var e;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var e;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(e=this.closeWatcher)==null||e.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(e){let t=e.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="sl-icon-button");this.disabled||t||(e.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(e){e.key!=="Tab"&&(e.stopPropagation(),this.handleDocumentKeyDown(e));}handleClearClick(e){e.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault();}handleOptionClick(e){let t=e.target.closest("sl-option"),o=this.value;t&&!t.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(t):this.setSelectedOptions(t),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let e=this.getAllOptions(),r=this.valueHasChanged?this.value:this.defaultValue,t=Array.isArray(r)?r:[r],o=[];e.forEach(i=>o.push(i.value)),this.setSelectedOptions(e.filter(i=>t.includes(i.value)));}handleTagRemove(e,r){e.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(r,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(e){this.getAllOptions().forEach(t=>{t.current=false,t.tabIndex=-1;}),e&&(this.currentOption=e,e.current=true,e.tabIndex=0,e.focus());}setSelectedOptions(e){let r=this.getAllOptions(),t=Array.isArray(e)?e:[e];r.forEach(o=>o.selected=false),t.length&&t.forEach(o=>o.selected=true),this.selectionChanged();}toggleOptionSelection(e,r){r===true||r===false?e.selected=r:e.selected=!e.selected,this.selectionChanged();}selectionChanged(){var e,r,t;let o=this.getAllOptions();this.selectedOptions=o.filter(s=>s.selected);let i=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(e=s?.value)!=null?e:"",this.displayLabel=(t=(r=s?.getTextLabel)==null?void 0:r.call(s))!=null?t:"";}this.valueHasChanged=i,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((e,r)=>{if(r<this.maxOptionsVisible||this.maxOptionsVisible<=0){let t=this.getTag(e,r);return f`<div @sl-remove=${o=>this.handleTagRemove(o,e)}>
          ${typeof t=="string"?Pt(t):t}
        </div>`}else if(r===this.maxOptionsVisible)return f`<sl-tag size=${this.size}>+${this.selectedOptions.length-r}</sl-tag>`;return f``})}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(e,r,t){if(super.attributeChangedCallback(e,r,t),e==="value"){let o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o;}}handleValueChange(){if(!this.valueHasChanged){let t=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=t;}let e=this.getAllOptions(),r=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(e.filter(t=>r.includes(t.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await te(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:e,options:r}=Qt(this,"select.show",{dir:this.localize.dir()});await Zt(this.popup.popup,e,r),this.currentOption&&Ho(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await te(this);let{keyframes:e,options:r}=Qt(this,"select.hide",{dir:this.localize.dir()});await Zt(this.popup.popup,e,r),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,Oe(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,Oe(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(e){this.valueInput.setCustomValidity(e),this.formControlController.updateValidity();}focus(e){this.displayInput.focus(e);}blur(){this.displayInput.blur();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r,i=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return f`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":o})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${t?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${M({select:true,"select--standard":true,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":s,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
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

              ${this.multiple?f`<div part="tags" class="select__tags">${this.tags}</div>`:""}

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

              ${i?f`
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};B.styles=[L,Vt,ec];B.dependencies={"sl-icon":K,"sl-popup":Q,"sl-tag":me};p([O(".select")],B.prototype,"popup",2);p([O(".select__combobox")],B.prototype,"combobox",2);p([O(".select__display-input")],B.prototype,"displayInput",2);p([O(".select__value-input")],B.prototype,"valueInput",2);p([O(".select__listbox")],B.prototype,"listbox",2);p([$()],B.prototype,"hasFocus",2);p([$()],B.prototype,"displayLabel",2);p([$()],B.prototype,"currentOption",2);p([$()],B.prototype,"selectedOptions",2);p([$()],B.prototype,"valueHasChanged",2);p([h()],B.prototype,"name",2);p([$()],B.prototype,"value",1);p([h({attribute:"value"})],B.prototype,"defaultValue",2);p([h({reflect:true})],B.prototype,"size",2);p([h()],B.prototype,"placeholder",2);p([h({type:Boolean,reflect:true})],B.prototype,"multiple",2);p([h({attribute:"max-options-visible",type:Number})],B.prototype,"maxOptionsVisible",2);p([h({type:Boolean,reflect:true})],B.prototype,"disabled",2);p([h({type:Boolean})],B.prototype,"clearable",2);p([h({type:Boolean,reflect:true})],B.prototype,"open",2);p([h({type:Boolean})],B.prototype,"hoist",2);p([h({type:Boolean,reflect:true})],B.prototype,"filled",2);p([h({type:Boolean,reflect:true})],B.prototype,"pill",2);p([h()],B.prototype,"label",2);p([h({reflect:true})],B.prototype,"placement",2);p([h({attribute:"help-text"})],B.prototype,"helpText",2);p([h({reflect:true})],B.prototype,"form",2);p([h({type:Boolean,reflect:true})],B.prototype,"required",2);p([h()],B.prototype,"getTag",2);p([R("disabled",{waitUntilFirstUpdate:true})],B.prototype,"handleDisabledChange",1);p([R(["defaultValue","value"],{waitUntilFirstUpdate:true})],B.prototype,"handleValueChange",1);p([R("open",{waitUntilFirstUpdate:true})],B.prototype,"handleOpenChange",1);Jt("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Jt("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});B.define("sl-select");var Dc=x`
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
`;var Ut=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let e=this.closest("sl-select");e&&e.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let e=this.childNodes,r="";return [...e].forEach(t=>{t.nodeType===Node.ELEMENT_NODE&&(t.hasAttribute("slot")||(r+=t.textContent)),t.nodeType===Node.TEXT_NODE&&(r+=t.textContent);}),r.trim()}render(){return f`
      <div
        part="base"
        class=${M({option:true,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Ut.styles=[L,Dc];Ut.dependencies={"sl-icon":K};p([O(".option__label")],Ut.prototype,"defaultSlot",2);p([$()],Ut.prototype,"current",2);p([$()],Ut.prototype,"selected",2);p([$()],Ut.prototype,"hasHover",2);p([h({reflect:true})],Ut.prototype,"value",2);p([h({type:Boolean,reflect:true})],Ut.prototype,"disabled",2);p([R("disabled")],Ut.prototype,"handleDisabledChange",1);p([R("selected")],Ut.prototype,"handleSelectedChange",1);p([R("value")],Ut.prototype,"handleValueChange",1);Ut.define("sl-option");var We=class{constructor(r,t,o){this.path=t;this.handle=o;this._loading=false;this._promiseSeq=0;this._consumedPromise=null;this.host=r,r.addController(this);}get loading(){return this._loading}get value(){return this._value}load(){let r=this.host.options,t=et(r,this.path);if(Pe(t))t.loading?(this._loading=true,this._value=this.handle(void 0)):(this._value=this.handle(t.value),this._loading=false);else if(t instanceof Promise){if(t!==this._consumedPromise){this._consumedPromise=t,this._loading=true,this._value=this.handle(void 0);let o=++this._promiseSeq;t.then(i=>{o===this._promiseSeq&&(this._value=this.handle(i),this._loading=false,this.host.requestUpdate());},i=>{o===this._promiseSeq&&(this._value=this.handle(void 0),this._loading=false,console.error(`AsyncOptionState load <${Array.isArray(this.path)?this.path.join("."):this.path}> failed: ${i?.message||i}`),this.host.requestUpdate());});}}else this._consumedPromise=null,this._value=this.handle(t),this._loading=false;}render(r){return f`
            ${F(this.loading,()=>f`<auto-loading></auto-loading>`,()=>r(this._value))}
        `}hostUpdate(){this.load();}hostUpdated(){}};exports.AutoFieldSelect=class Ko extends I{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";this.items=new We(this,"choices",t=>!t||!Array.isArray(t)?[]:t.map(o=>{let i={};return typeof o=="object"?Object.assign(i,o):typeof o=="string"&&o.startsWith("-")?Object.assign(i,{type:"divider"}):Object.assign(i,{label:o}),i}));}getInitialOptions(){return {valueKey:"value",labelKey:"label",choices:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}_renderItem(t){let o=this.options.renderItem;return typeof o=="string"?f`${Pt(o.replace(/\{(.+?)\}/g,(i,s)=>t[s]))}`:typeof o=="function"?f`${Pt(o(t))}`:t.label||t.value}_onDropdownMenu(){}renderInput(){return f`
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
                placeholder="${k(this.options.placeholder)}"
                .maxOptionsVisible=${this.options.maxOptionsVisible}
                help-text="${k(this.options.help)}"
                .placement=${this.options.placement}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-show=${this._onDropdownMenu.bind(this)}
                hoist
            >
                
                ${F(this.items.loading,()=>f`<auto-loading></auto-loading>`,()=>f`${this.renderBeforeActions()}
                ${this.items.value.map(t=>t.type==="divider"?f`<sl-divider></sl-divider>`:f`<sl-option value="${t[this.valueKey]||t.label}" ?disabled=${!this.options.enable}>
                            <auto-flex class="item" gap="1em" align="center" grow="sl-icon + *,:first-child:not(sl-icon)" style="text-align:left;">
                                ${F(t.icon,()=>f`<sl-icon name="${t.icon}"></sl-icon>`)}
                                ${this._renderItem(t)}
                            </auto-flex>
                        </sl-option>`)}
                    ${this.renderAfterActions()}`)}
                
            </sl-select>
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect.styles=[I.styles,jr,x`
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
        `],exports.AutoFieldSelect=v([T("auto-field-select")],exports.AutoFieldSelect);var Fc=x`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`;var ot=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this),this.hasSlotController=new ft(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=e=>e.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(e){this.input.style.setProperty("--percent",`${e*100}%`);}syncTooltip(e){if(this.output!==null){let r=this.input.offsetWidth,t=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",s=r*e;if(i){let n=`${r-s}px + ${e} * ${o}`;this.output.style.translate=`calc((${n} - ${t/2}px - ${o} / 2))`;}else {let n=`${s}px - ${e} * ${o}`;this.output.style.translate=`calc(${n} - ${t/2}px + ${o} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(e));}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}focus(e){this.input.focus(e);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r;return f`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--medium":true,"form-control--has-label":t,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${t?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${M({range:true,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${k(this.name)}
              ?disabled=${this.disabled}
              min=${k(this.min)}
              max=${k(this.max)}
              step=${k(this.step)}
              .value=${Nt(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?f`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
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
    `}};ot.styles=[L,Vt,Fc];p([O(".range__control")],ot.prototype,"input",2);p([O(".range__tooltip")],ot.prototype,"output",2);p([$()],ot.prototype,"hasFocus",2);p([$()],ot.prototype,"hasTooltip",2);p([h()],ot.prototype,"title",2);p([h()],ot.prototype,"name",2);p([h({type:Number})],ot.prototype,"value",2);p([h()],ot.prototype,"label",2);p([h({attribute:"help-text"})],ot.prototype,"helpText",2);p([h({type:Boolean,reflect:true})],ot.prototype,"disabled",2);p([h({type:Number})],ot.prototype,"min",2);p([h({type:Number})],ot.prototype,"max",2);p([h({type:Number})],ot.prototype,"step",2);p([h()],ot.prototype,"tooltip",2);p([h({attribute:false})],ot.prototype,"tooltipFormatter",2);p([h({reflect:true})],ot.prototype,"form",2);p([Kt()],ot.prototype,"defaultValue",2);p([ze({passive:true})],ot.prototype,"handleThumbDragStart",1);p([R("value",{waitUntilFirstUpdate:true})],ot.prototype,"handleValueChange",1);p([R("disabled",{waitUntilFirstUpdate:true})],ot.prototype,"handleDisabledChange",1);p([R("hasTooltip",{waitUntilFirstUpdate:true})],ot.prototype,"syncRange",1);ot.define("sl-range");exports.AutoFieldRabge=class Go extends I{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top"}}renderInput(){return f`
            <div>
                <span>${this.toView(this.value)}</span>
                <sl-range
                    slot="value"
                    name="${this.name}"
                    data-path=${this.path}
                    value=${this.value}
                    .placeholder=${this.options.placeholder}
                    ?disabled=${!this.options.enable}
                    .max=${this.options.max}
                    .min=${this.options.min}
                    .step=${this.options.step}
                    .tooltip=${this.options.tooltip}
                    @sl-input=${this.onFieldInput.bind(this)}
                    @sl-change=${this.onFieldChange.bind(this)}
                >
                </sl-range>
            </div>
        `}};exports.AutoFieldRabge.styles=[I.styles,x`
            .scale {
                position: relative;
                display: flex;
                flex-direction: row;
            }
            .box {
                background-color: var(--auto-bgcolor);
                border: var(--auto-border);
                padding: 0.5rem;
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
            }
            sl-range {
                --track-color-active: var(--auto-theme-color);
                box-sizing: border-box;
            }
            .value > div {
                display: flex;
                align-items: center;
                & :first-child {
                    padding: 0 1em;
                    padding-left: 0.1em;
                }
                & :last-child {
                    flex-grow: 1;
                }
            }
        `],exports.AutoFieldRabge=v([T("auto-field-range")],exports.AutoFieldRabge);var Hc=x`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;function At(e,r,t){let o=i=>Object.is(i,-0)?0:i;return e<r?o(r):e>t?o(t):o(e)}var $t=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(e){return this.getValueFromXCoordinate(e.clientX)}getValueFromTouchPosition(e){return this.getValueFromXCoordinate(e.touches[0].clientX)}getValueFromXCoordinate(e){let r=this.localize.dir()==="rtl",{left:t,right:o,width:i}=this.rating.getBoundingClientRect(),s=r?this.roundToPrecision((o-e)/i*this.max,this.precision):this.roundToPrecision((e-t)/i*this.max,this.precision);return At(s,0,this.max)}handleClick(e){this.disabled||(this.setValue(this.getValueFromMousePosition(e)),this.emit("sl-change"));}setValue(e){this.disabled||this.readonly||(this.value=e===this.value?0:e,this.isHovering=false);}handleKeyDown(e){let r=this.localize.dir()==="ltr",t=this.localize.dir()==="rtl",o=this.value;if(!(this.disabled||this.readonly)){if(e.key==="ArrowDown"||r&&e.key==="ArrowLeft"||t&&e.key==="ArrowRight"){let i=e.shiftKey?1:this.precision;this.value=Math.max(0,this.value-i),e.preventDefault();}if(e.key==="ArrowUp"||r&&e.key==="ArrowRight"||t&&e.key==="ArrowLeft"){let i=e.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+i),e.preventDefault();}e.key==="Home"&&(this.value=0,e.preventDefault()),e.key==="End"&&(this.value=this.max,e.preventDefault()),this.value!==o&&this.emit("sl-change");}}handleMouseEnter(e){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(e);}handleMouseMove(e){this.hoverValue=this.getValueFromMousePosition(e);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(e){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(e),e.preventDefault();}handleTouchMove(e){this.hoverValue=this.getValueFromTouchPosition(e);}handleTouchEnd(e){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),e.preventDefault();}roundToPrecision(e,r=.5){let t=1/r;return Math.ceil(e*t)/t}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(e){this.rating.focus(e);}blur(){this.rating.blur();}render(){let e=this.localize.dir()==="rtl",r=Array.from(Array(this.max).keys()),t=0;return this.disabled||this.readonly?t=this.value:t=this.isHovering?this.hoverValue:this.value,f`
      <div
        part="base"
        class=${M({rating:true,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":e})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${r.map(o=>t>o&&t<o+1?f`
                <span
                  class=${M({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(t)===o+1})}
                  role="presentation"
                >
                  <div
                    style=${rt({clipPath:e?`inset(0 ${(t-o)*100}% 0 0)`:`inset(0 0 0 ${(t-o)*100}%)`})}
                  >
                    ${Pt(this.getSymbol(o+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${rt({clipPath:e?`inset(0 0 0 ${100-(t-o)*100}%)`:`inset(0 ${100-(t-o)*100}% 0 0)`})}
                  >
                    ${Pt(this.getSymbol(o+1))}
                  </div>
                </span>
              `:f`
              <span
                class=${M({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(t)===o+1,"rating__symbol--active":t>=o+1})}
                role="presentation"
              >
                ${Pt(this.getSymbol(o+1))}
              </span>
            `)}
        </span>
      </div>
    `}};$t.styles=[L,Hc];$t.dependencies={"sl-icon":K};p([O(".rating")],$t.prototype,"rating",2);p([$()],$t.prototype,"hoverValue",2);p([$()],$t.prototype,"isHovering",2);p([h()],$t.prototype,"label",2);p([h({type:Number})],$t.prototype,"value",2);p([h({type:Number})],$t.prototype,"max",2);p([h({type:Number})],$t.prototype,"precision",2);p([h({type:Boolean,reflect:true})],$t.prototype,"readonly",2);p([h({type:Boolean,reflect:true})],$t.prototype,"disabled",2);p([h()],$t.prototype,"getSymbol",2);p([ze({passive:true})],$t.prototype,"handleTouchMove",1);p([R("hoverValue")],$t.prototype,"handleHoverValueChange",1);p([R("isHovering")],$t.prototype,"handleIsHoveringChange",1);$t.define("sl-rating");exports.AutoFieldRating=class ks extends I{getInitialOptions(){return {max:5,precision:1}}renderInput(){return f`
            <sl-rating
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                value=${this.value}
                max=${this.options.max}
                precision=${this.options.precision}
                .placeholder=${this.options.placeholder}
                ?disabled=${!this.options.enable}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
            </sl-rating>
        `}renderView(){return f`<sl-rating slot="value" name="${this.name}" data-path=${this.path} value=${this.value} max=${this.options.max} readonly> </sl-rating> `}};exports.AutoFieldRating=v([T("auto-field-rating")],exports.AutoFieldRating);var jc=x`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;var Vn=class extends z{render(){return f` <slot></slot> `}};Vn.styles=[L,jc];var Bc=x`
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
`;var H=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ft(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var e;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((e=this.input)==null?void 0:e.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value;}get valueAsNumber(){var e;return this.__numberInput.value=this.value,((e=this.input)==null?void 0:e.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleKeyDown(e){let r=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!r&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(e){this.input.focus(e);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(e,r,t="none"){this.input.setSelectionRange(e,r,t);}setRangeText(e,r,t,o="preserve"){let i=r??this.input.selectionStart,s=t??this.input.selectionEnd;this.input.setRangeText(e,i,s,o),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return f`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${t?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${M({input:true,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
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
              name=${k(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${k(this.placeholder)}
              minlength=${k(this.minlength)}
              maxlength=${k(this.maxlength)}
              min=${k(this.min)}
              max=${k(this.max)}
              step=${k(this.step)}
              .value=${Nt(this.value)}
              autocapitalize=${k(this.autocapitalize)}
              autocomplete=${k(this.autocomplete)}
              autocorrect=${k(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${k(this.pattern)}
              enterkeyhint=${k(this.enterkeyhint)}
              inputmode=${k(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${s?f`
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
            ${this.passwordToggle&&!this.disabled?f`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?f`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:f`
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
    `}};H.styles=[L,Vt,Bc];H.dependencies={"sl-icon":K};p([O(".input__control")],H.prototype,"input",2);p([$()],H.prototype,"hasFocus",2);p([h()],H.prototype,"title",2);p([h({reflect:true})],H.prototype,"type",2);p([h()],H.prototype,"name",2);p([h()],H.prototype,"value",2);p([Kt()],H.prototype,"defaultValue",2);p([h({reflect:true})],H.prototype,"size",2);p([h({type:Boolean,reflect:true})],H.prototype,"filled",2);p([h({type:Boolean,reflect:true})],H.prototype,"pill",2);p([h()],H.prototype,"label",2);p([h({attribute:"help-text"})],H.prototype,"helpText",2);p([h({type:Boolean})],H.prototype,"clearable",2);p([h({type:Boolean,reflect:true})],H.prototype,"disabled",2);p([h()],H.prototype,"placeholder",2);p([h({type:Boolean,reflect:true})],H.prototype,"readonly",2);p([h({attribute:"password-toggle",type:Boolean})],H.prototype,"passwordToggle",2);p([h({attribute:"password-visible",type:Boolean})],H.prototype,"passwordVisible",2);p([h({attribute:"no-spin-buttons",type:Boolean})],H.prototype,"noSpinButtons",2);p([h({reflect:true})],H.prototype,"form",2);p([h({type:Boolean,reflect:true})],H.prototype,"required",2);p([h()],H.prototype,"pattern",2);p([h({type:Number})],H.prototype,"minlength",2);p([h({type:Number})],H.prototype,"maxlength",2);p([h()],H.prototype,"min",2);p([h()],H.prototype,"max",2);p([h()],H.prototype,"step",2);p([h()],H.prototype,"autocapitalize",2);p([h()],H.prototype,"autocorrect",2);p([h()],H.prototype,"autocomplete",2);p([h({type:Boolean})],H.prototype,"autofocus",2);p([h()],H.prototype,"enterkeyhint",2);p([h({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],H.prototype,"spellcheck",2);p([h()],H.prototype,"inputmode",2);p([R("disabled",{waitUntilFirstUpdate:true})],H.prototype,"handleDisabledChange",1);p([R("step",{waitUntilFirstUpdate:true})],H.prototype,"handleStepChange",1);p([R("value",{waitUntilFirstUpdate:true})],H.prototype,"handleValueChange",1);function Cs(e,r){function t(i){let s=e.getBoundingClientRect(),n=e.ownerDocument.defaultView,a=s.left+n.scrollX,l=s.top+n.scrollY,c=i.pageX-a,d=i.pageY-l;r?.onMove&&r.onMove(c,d);}function o(){document.removeEventListener("pointermove",t),document.removeEventListener("pointerup",o),r?.onStop&&r.onStop();}document.addEventListener("pointermove",t,{passive:true}),document.addEventListener("pointerup",o),r?.initialEvent instanceof PointerEvent&&t(r.initialEvent);}var Nc=x`
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
`;function*Wc(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*Ba(Wc(e.shadowRoot.activeElement))));}function qc(){return [...Wc()].pop()}var Uc=new WeakMap;function Kc(e){let r=Uc.get(e);return r||(r=window.getComputedStyle(e,null),Uc.set(e,r)),r}function Fh(e){if(typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let r=Kc(e);return r.visibility!=="hidden"&&r.display!=="none"}function Hh(e){let r=Kc(e),{overflowY:t,overflowX:o}=r;return t==="scroll"||o==="scroll"?true:t!=="auto"||o!=="auto"?false:e.scrollHeight>e.clientHeight&&t==="auto"||e.scrollWidth>e.clientWidth&&o==="auto"}function jh(e){let r=e.tagName.toLowerCase(),t=Number(e.getAttribute("tabindex"));if(e.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||e.hasAttribute("disabled")||e.closest("[inert]"))return  false;if(r==="input"&&e.getAttribute("type")==="radio"){let s=e.getRootNode(),n=`input[type='radio'][name="${e.getAttribute("name")}"]`,a=s.querySelector(`${n}:checked`);return a?a===e:s.querySelector(n)===e}return Fh(e)?(r==="audio"||r==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(r)?true:Hh(e):false}function Gc(e){var r,t;let o=Nh(e),i=(r=o[0])!=null?r:null,s=(t=o[o.length-1])!=null?t:null;return {start:i,end:s}}function Bh(e,r){var t;return ((t=e.getRootNode({composed:true}))==null?void 0:t.host)!==r}function Nh(e){let r=new WeakMap,t=[];function o(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||r.has(i))return;r.set(i,true),!t.includes(i)&&jh(i)&&t.push(i),i instanceof HTMLSlotElement&&Bh(i,e)&&i.assignedElements({flatten:true}).forEach(s=>{o(s);}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&o(i.shadowRoot);}for(let s of i.children)o(s);}return o(e),t.sort((i,s)=>{let n=Number(i.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var bt=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=e=>{var r;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((r=document.activeElement)==null?void 0:r.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}let t=(o,i)=>{if(!o)return null;let s=o.closest(i);if(s)return s;let n=o.getRootNode();return n instanceof ShadowRoot?t(n.host,i):null};setTimeout(()=>{var o;let i=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?qc():document.activeElement;(!this.containingElement||t(i,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=e=>{let r=e.composedPath();this.containingElement&&!r.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=e=>{let r=e.target;!this.stayOpenOnSelect&&r.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let e=this.trigger.assignedElements({flatten:true})[0];typeof e?.focus=="function"&&e.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}let r=this.getMenu();if(r){let t=r.getAllItems(),o=t[0],i=t[t.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),t.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(r.setCurrentItem(o),o.focus()),(e.key==="ArrowUp"||e.key==="End")&&(r.setCurrentItem(i),i.focus());}));}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let r=this.trigger.assignedElements({flatten:true}).find(o=>Gc(o).start),t;if(r){switch(r.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":t=r.button;break;default:t=r;}t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,Oe(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,Oe(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await te(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:e,options:r}=Qt(this,"dropdown.show",{dir:this.localize.dir()});await Zt(this.popup.popup,e,r),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await te(this);let{keyframes:e,options:r}=Qt(this,"dropdown.hide",{dir:this.localize.dir()});await Zt(this.popup.popup,e,r),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return f`
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
        sync=${k(this.sync?this.sync:void 0)}
        class=${M({dropdown:true,"dropdown--open":this.open})}
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
    `}};bt.styles=[L,Nc];bt.dependencies={"sl-popup":Q};p([O(".dropdown")],bt.prototype,"popup",2);p([O(".dropdown__trigger")],bt.prototype,"trigger",2);p([O(".dropdown__panel")],bt.prototype,"panel",2);p([h({type:Boolean,reflect:true})],bt.prototype,"open",2);p([h({reflect:true})],bt.prototype,"placement",2);p([h({type:Boolean,reflect:true})],bt.prototype,"disabled",2);p([h({attribute:"stay-open-on-select",type:Boolean,reflect:true})],bt.prototype,"stayOpenOnSelect",2);p([h({attribute:false})],bt.prototype,"containingElement",2);p([h({type:Number})],bt.prototype,"distance",2);p([h({type:Number})],bt.prototype,"skidding",2);p([h({type:Boolean})],bt.prototype,"hoist",2);p([h({reflect:true})],bt.prototype,"sync",2);p([R("open",{waitUntilFirstUpdate:true})],bt.prototype,"handleOpenChange",1);Jt("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Jt("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Yc=x`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var Xc=x`
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
`;var Te=class extends z{constructor(){super(...arguments),this.localize=new G(this);}render(){return f`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Te.styles=[L,Xc];var J=class extends z{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new ft(this,"[default]","prefix","suffix"),this.localize=new G(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:Wr}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(e){this.button.focus(e);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity());}render(){let e=this.isLink(),r=e?qr`a`:qr`button`;return fe`
      <${r}
        part="base"
        class=${M({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${k(e?void 0:this.disabled)}
        type=${k(e?void 0:this.type)}
        title=${this.title}
        name=${k(e?void 0:this.name)}
        value=${k(e?void 0:this.value)}
        href=${k(e&&!this.disabled?this.href:void 0)}
        target=${k(e?this.target:void 0)}
        download=${k(e?this.download:void 0)}
        rel=${k(e?this.rel:void 0)}
        role=${k(e?void 0:"button")}
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
        ${this.caret?fe` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?fe`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${r}>
    `}};J.styles=[L,os];J.dependencies={"sl-icon":K,"sl-spinner":Te};p([O(".button")],J.prototype,"button",2);p([$()],J.prototype,"hasFocus",2);p([$()],J.prototype,"invalid",2);p([h()],J.prototype,"title",2);p([h({reflect:true})],J.prototype,"variant",2);p([h({reflect:true})],J.prototype,"size",2);p([h({type:Boolean,reflect:true})],J.prototype,"caret",2);p([h({type:Boolean,reflect:true})],J.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],J.prototype,"loading",2);p([h({type:Boolean,reflect:true})],J.prototype,"outline",2);p([h({type:Boolean,reflect:true})],J.prototype,"pill",2);p([h({type:Boolean,reflect:true})],J.prototype,"circle",2);p([h()],J.prototype,"type",2);p([h()],J.prototype,"name",2);p([h()],J.prototype,"value",2);p([h()],J.prototype,"href",2);p([h()],J.prototype,"target",2);p([h()],J.prototype,"rel",2);p([h()],J.prototype,"download",2);p([h()],J.prototype,"form",2);p([h({attribute:"formaction"})],J.prototype,"formAction",2);p([h({attribute:"formenctype"})],J.prototype,"formEnctype",2);p([h({attribute:"formmethod"})],J.prototype,"formMethod",2);p([h({attribute:"formnovalidate",type:Boolean})],J.prototype,"formNoValidate",2);p([h({attribute:"formtarget"})],J.prototype,"formTarget",2);p([R("disabled",{waitUntilFirstUpdate:true})],J.prototype,"handleDisabledChange",1);function vt(e,r){Uh(e)&&(e="100%");let t=Wh(e);return e=r===360?e:Math.min(r,Math.max(0,parseFloat(e))),t&&(e=parseInt(String(e*r),10)/100),Math.abs(e-r)<1e-6?1:(r===360?e=(e<0?e%r+r:e%r)/parseFloat(String(r)):e=e%r/parseFloat(String(r)),e)}function Yo(e){return Math.min(1,Math.max(0,e))}function Uh(e){return typeof e=="string"&&e.indexOf(".")!==-1&&parseFloat(e)===1}function Wh(e){return typeof e=="string"&&e.indexOf("%")!==-1}function As(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function Xo(e){return Number(e)<=1?`${Number(e)*100}%`:e}function qe(e){return e.length===1?"0"+e:String(e)}function Jc(e,r,t){return {r:vt(e,255)*255,g:vt(r,255)*255,b:vt(t,255)*255}}function Fn(e,r,t){e=vt(e,255),r=vt(r,255),t=vt(t,255);let o=Math.max(e,r,t),i=Math.min(e,r,t),s=0,n=0,a=(o+i)/2;if(o===i)n=0,s=0;else {let l=o-i;switch(n=a>.5?l/(2-o-i):l/(o+i),o){case e:s=(r-t)/l+(r<t?6:0);break;case r:s=(t-e)/l+2;break;case t:s=(e-r)/l+4;break;}s/=6;}return {h:s,s:n,l:a}}function Dn(e,r,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?e+(r-e)*(6*t):t<1/2?r:t<2/3?e+(r-e)*(2/3-t)*6:e}function Qc(e,r,t){let o,i,s;if(e=vt(e,360),r=vt(r,100),t=vt(t,100),r===0)i=t,s=t,o=t;else {let n=t<.5?t*(1+r):t+r-t*r,a=2*t-n;o=Dn(a,n,e+1/3),i=Dn(a,n,e),s=Dn(a,n,e-1/3);}return {r:o*255,g:i*255,b:s*255}}function Hn(e,r,t){e=vt(e,255),r=vt(r,255),t=vt(t,255);let o=Math.max(e,r,t),i=Math.min(e,r,t),s=0,n=o,a=o-i,l=o===0?0:a/o;if(o===i)s=0;else {switch(o){case e:s=(r-t)/a+(r<t?6:0);break;case r:s=(t-e)/a+2;break;case t:s=(e-r)/a+4;break;}s/=6;}return {h:s,s:l,v:n}}function Zc(e,r,t){e=vt(e,360)*6,r=vt(r,100),t=vt(t,100);let o=Math.floor(e),i=e-o,s=t*(1-r),n=t*(1-i*r),a=t*(1-(1-i)*r),l=o%6,c=[t,n,s,s,a,t][l],d=[a,t,t,n,s,s][l],u=[s,s,a,t,t,n][l];return {r:c*255,g:d*255,b:u*255}}function jn(e,r,t,o){let i=[qe(Math.round(e).toString(16)),qe(Math.round(r).toString(16)),qe(Math.round(t).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function tp(e,r,t,o,i){let s=[qe(Math.round(e).toString(16)),qe(Math.round(r).toString(16)),qe(Math.round(t).toString(16)),qe(qh(o))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function ep(e,r,t,o){let i=e/100,s=r/100,n=t/100,a=o/100,l=255*(1-i)*(1-a),c=255*(1-s)*(1-a),d=255*(1-n)*(1-a);return {r:l,g:c,b:d}}function Bn(e,r,t){let o=1-e/255,i=1-r/255,s=1-t/255,n=Math.min(o,i,s);return n===1?(o=0,i=0,s=0):(o=(o-n)/(1-n)*100,i=(i-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(o),m:Math.round(i),y:Math.round(s),k:Math.round(n)}}function qh(e){return Math.round(parseFloat(e)*255).toString(16)}function Nn(e){return Ft(e)/255}function Ft(e){return parseInt(e,16)}function rp(e){return {r:e>>16,g:(e&65280)>>8,b:e&255}}var Jo={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function op(e){let r={r:0,g:0,b:0},t=1,o=null,i=null,s=null,n=false,a=false;return typeof e=="string"&&(e=Yh(e)),typeof e=="object"&&(Wt(e.r)&&Wt(e.g)&&Wt(e.b)?(r=Jc(e.r,e.g,e.b),n=true,a=String(e.r).substr(-1)==="%"?"prgb":"rgb"):Wt(e.h)&&Wt(e.s)&&Wt(e.v)?(o=Xo(e.s),i=Xo(e.v),r=Zc(e.h,o,i),n=true,a="hsv"):Wt(e.h)&&Wt(e.s)&&Wt(e.l)?(o=Xo(e.s),s=Xo(e.l),r=Qc(e.h,o,s),n=true,a="hsl"):Wt(e.c)&&Wt(e.m)&&Wt(e.y)&&Wt(e.k)&&(r=ep(e.c,e.m,e.y,e.k),n=true,a="cmyk"),Object.prototype.hasOwnProperty.call(e,"a")&&(t=e.a)),t=As(t),{ok:n,format:e.format||a,r:Math.min(255,Math.max(r.r,0)),g:Math.min(255,Math.max(r.g,0)),b:Math.min(255,Math.max(r.b,0)),a:t}}var Kh="[-\\+]?\\d+%?",Gh="[-\\+]?\\d*\\.\\d+%?",Ke="(?:"+Gh+")|(?:"+Kh+")",Un="[\\s|\\(]+("+Ke+")[,|\\s]+("+Ke+")[,|\\s]+("+Ke+")\\s*\\)?",$s="[\\s|\\(]+("+Ke+")[,|\\s]+("+Ke+")[,|\\s]+("+Ke+")[,|\\s]+("+Ke+")\\s*\\)?",ee={CSS_UNIT:new RegExp(Ke),rgb:new RegExp("rgb"+Un),rgba:new RegExp("rgba"+$s),hsl:new RegExp("hsl"+Un),hsla:new RegExp("hsla"+$s),hsv:new RegExp("hsv"+Un),hsva:new RegExp("hsva"+$s),cmyk:new RegExp("cmyk"+$s),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Yh(e){if(e=e.trim().toLowerCase(),e.length===0)return  false;let r=false;if(Jo[e])e=Jo[e],r=true;else if(e==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let t=ee.rgb.exec(e);return t?{r:t[1],g:t[2],b:t[3]}:(t=ee.rgba.exec(e),t?{r:t[1],g:t[2],b:t[3],a:t[4]}:(t=ee.hsl.exec(e),t?{h:t[1],s:t[2],l:t[3]}:(t=ee.hsla.exec(e),t?{h:t[1],s:t[2],l:t[3],a:t[4]}:(t=ee.hsv.exec(e),t?{h:t[1],s:t[2],v:t[3]}:(t=ee.hsva.exec(e),t?{h:t[1],s:t[2],v:t[3],a:t[4]}:(t=ee.cmyk.exec(e),t?{c:t[1],m:t[2],y:t[3],k:t[4]}:(t=ee.hex8.exec(e),t?{r:Ft(t[1]),g:Ft(t[2]),b:Ft(t[3]),a:Nn(t[4]),format:r?"name":"hex8"}:(t=ee.hex6.exec(e),t?{r:Ft(t[1]),g:Ft(t[2]),b:Ft(t[3]),format:r?"name":"hex"}:(t=ee.hex4.exec(e),t?{r:Ft(t[1]+t[1]),g:Ft(t[2]+t[2]),b:Ft(t[3]+t[3]),a:Nn(t[4]+t[4]),format:r?"name":"hex8"}:(t=ee.hex3.exec(e),t?{r:Ft(t[1]+t[1]),g:Ft(t[2]+t[2]),b:Ft(t[3]+t[3]),format:r?"name":"hex"}:false))))))))))}function Wt(e){return typeof e=="number"?!Number.isNaN(e):ee.CSS_UNIT.test(e)}var Qo=class e{constructor(r="",t={}){if(r instanceof e)return r;typeof r=="number"&&(r=rp(r)),this.originalInput=r;let o=op(r);this.originalInput=r,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=t.format??o.format,this.gradientType=t.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let r=this.toRgb();return (r.r*299+r.g*587+r.b*114)/1e3}getLuminance(){let r=this.toRgb(),t,o,i,s=r.r/255,n=r.g/255,a=r.b/255;return s<=.03928?t=s/12.92:t=Math.pow((s+.055)/1.055,2.4),n<=.03928?o=n/12.92:o=Math.pow((n+.055)/1.055,2.4),a<=.03928?i=a/12.92:i=Math.pow((a+.055)/1.055,2.4),.2126*t+.7152*o+.0722*i}getAlpha(){return this.a}setAlpha(r){return this.a=As(r),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:r}=this.toHsl();return r===0}toHsv(){let r=Hn(this.r,this.g,this.b);return {h:r.h*360,s:r.s,v:r.v,a:this.a}}toHsvString(){let r=Hn(this.r,this.g,this.b),t=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.v*100);return this.a===1?`hsv(${t}, ${o}%, ${i}%)`:`hsva(${t}, ${o}%, ${i}%, ${this.roundA})`}toHsl(){let r=Fn(this.r,this.g,this.b);return {h:r.h*360,s:r.s,l:r.l,a:this.a}}toHslString(){let r=Fn(this.r,this.g,this.b),t=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.l*100);return this.a===1?`hsl(${t}, ${o}%, ${i}%)`:`hsla(${t}, ${o}%, ${i}%, ${this.roundA})`}toHex(r=false){return jn(this.r,this.g,this.b,r)}toHexString(r=false){return "#"+this.toHex(r)}toHex8(r=false){return tp(this.r,this.g,this.b,this.a,r)}toHex8String(r=false){return "#"+this.toHex8(r)}toHexShortString(r=false){return this.a===1?this.toHexString(r):this.toHex8String(r)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let r=Math.round(this.r),t=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${r}, ${t}, ${o})`:`rgba(${r}, ${t}, ${o}, ${this.roundA})`}toPercentageRgb(){let r=t=>`${Math.round(vt(t,255)*100)}%`;return {r:r(this.r),g:r(this.g),b:r(this.b),a:this.a}}toPercentageRgbString(){let r=t=>Math.round(vt(t,255)*100);return this.a===1?`rgb(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%)`:`rgba(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%, ${this.roundA})`}toCmyk(){return {...Bn(this.r,this.g,this.b)}}toCmykString(){let{c:r,m:t,y:o,k:i}=Bn(this.r,this.g,this.b);return `cmyk(${r}, ${t}, ${o}, ${i})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let r="#"+jn(this.r,this.g,this.b,false);for(let[t,o]of Object.entries(Jo))if(r===o)return t;return  false}toString(r){let t=!!r;r=r??this.format;let o=false,i=this.a<1&&this.a>=0;return !t&&i&&(r.startsWith("hex")||r==="name")?r==="name"&&this.a===0?this.toName():this.toRgbString():(r==="rgb"&&(o=this.toRgbString()),r==="prgb"&&(o=this.toPercentageRgbString()),(r==="hex"||r==="hex6")&&(o=this.toHexString()),r==="hex3"&&(o=this.toHexString(true)),r==="hex4"&&(o=this.toHex8String(true)),r==="hex8"&&(o=this.toHex8String()),r==="name"&&(o=this.toName()),r==="hsl"&&(o=this.toHslString()),r==="hsv"&&(o=this.toHsvString()),r==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new e(this.toString())}lighten(r=10){let t=this.toHsl();return t.l+=r/100,t.l=Yo(t.l),new e(t)}brighten(r=10){let t=this.toRgb();return t.r=Math.max(0,Math.min(255,t.r-Math.round(255*-(r/100)))),t.g=Math.max(0,Math.min(255,t.g-Math.round(255*-(r/100)))),t.b=Math.max(0,Math.min(255,t.b-Math.round(255*-(r/100)))),new e(t)}darken(r=10){let t=this.toHsl();return t.l-=r/100,t.l=Yo(t.l),new e(t)}tint(r=10){return this.mix("white",r)}shade(r=10){return this.mix("black",r)}desaturate(r=10){let t=this.toHsl();return t.s-=r/100,t.s=Yo(t.s),new e(t)}saturate(r=10){let t=this.toHsl();return t.s+=r/100,t.s=Yo(t.s),new e(t)}greyscale(){return this.desaturate(100)}spin(r){let t=this.toHsl(),o=(t.h+r)%360;return t.h=o<0?360+o:o,new e(t)}mix(r,t=50){let o=this.toRgb(),i=new e(r).toRgb(),s=t/100,n={r:(i.r-o.r)*s+o.r,g:(i.g-o.g)*s+o.g,b:(i.b-o.b)*s+o.b,a:(i.a-o.a)*s+o.a};return new e(n)}analogous(r=6,t=30){let o=this.toHsl(),i=360/t,s=[this];for(o.h=(o.h-(i*r>>1)+720)%360;--r;)o.h=(o.h+i)%360,s.push(new e(o));return s}complement(){let r=this.toHsl();return r.h=(r.h+180)%360,new e(r)}monochromatic(r=6){let t=this.toHsv(),{h:o}=t,{s:i}=t,{v:s}=t,n=[],a=1/r;for(;r--;)n.push(new e({h:o,s:i,v:s})),s=(s+a)%1;return n}splitcomplement(){let r=this.toHsl(),{h:t}=r;return [this,new e({h:(t+72)%360,s:r.s,l:r.l}),new e({h:(t+216)%360,s:r.s,l:r.l})]}onBackground(r){let t=this.toRgb(),o=new e(r).toRgb(),i=t.a+o.a*(1-t.a);return new e({r:(t.r*t.a+o.r*o.a*(1-t.a))/i,g:(t.g*t.a+o.g*o.a*(1-t.a))/i,b:(t.b*t.a+o.b*o.a*(1-t.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(r){let t=this.toHsl(),{h:o}=t,i=[this],s=360/r;for(let n=1;n<r;n++)i.push(new e({h:(o+n*s)%360,s:t.s,l:t.l}));return i}equals(r){let t=new e(r);return this.format==="cmyk"||t.format==="cmyk"?this.toCmykString()===t.toCmykString():this.toRgbString()===t.toRgbString()}};var ip="EyeDropper"in window,N=class extends z{constructor(){super(),this.formControlController=new yt(this),this.isSafeValue=false,this.localize=new G(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let e=["hex","rgb","hsl","hsv"],r=(e.indexOf(this.format)+1)%e.length;this.format=e[r],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(e){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),t=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;t.focus(),e.preventDefault(),Cs(r,{onMove:n=>{this.alpha=At(n/o*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:e});}handleHueDrag(e){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),t=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;t.focus(),e.preventDefault(),Cs(r,{onMove:n=>{this.hue=At(n/o*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:e});}handleGridDrag(e){let r=this.shadowRoot.querySelector(".color-picker__grid"),t=r.querySelector(".color-picker__grid-handle"),{width:o,height:i}=r.getBoundingClientRect(),s=this.value,n=this.value;t.focus(),e.preventDefault(),this.isDraggingGridHandle=true,Cs(r,{onMove:(a,l)=>{this.saturation=At(a/o*100,0,100),this.brightness=At(100-l/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:e});}handleAlphaKeyDown(e){let r=e.shiftKey?10:1,t=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.alpha=At(this.alpha-r,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.alpha=At(this.alpha+r,0,100),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.alpha=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.alpha=100,this.syncValues()),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(e){let r=e.shiftKey?10:1,t=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.hue=At(this.hue-r,0,360),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.hue=At(this.hue+r,0,360),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.hue=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.hue=360,this.syncValues()),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(e){let r=e.shiftKey?10:1,t=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.saturation=At(this.saturation-r,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.saturation=At(this.saturation+r,0,100),this.syncValues()),e.key==="ArrowUp"&&(e.preventDefault(),this.brightness=At(this.brightness+r,0,100),this.syncValues()),e.key==="ArrowDown"&&(e.preventDefault(),this.brightness=At(this.brightness-r,0,100),this.syncValues()),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(e){let r=e.target,t=this.value;e.stopPropagation(),this.input.value?(this.setColor(r.value),r.value=this.value):this.value="",this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(e){this.formControlController.updateValidity(),e.stopPropagation();}handleInputKeyDown(e){if(e.key==="Enter"){let r=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleTouchMove(e){e.preventDefault();}parseColor(e){let r=new Qo(e);if(!r.isValid)return null;let t=r.toHsl(),o={h:t.h,s:t.s*100,l:t.l*100,a:t.a},i=r.toRgb(),s=r.toHexString(),n=r.toHex8String(),a=r.toHsv(),l={h:a.h,s:a.s*100,v:a.v*100,a:a.a};return {hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(e){let r=this.parseColor(e);return r===null?false:(this.hue=r.hsva.h,this.saturation=r.hsva.s,this.brightness=r.hsva.v,this.alpha=this.opacity?r.hsva.a*100:100,this.syncValues(),true)}setLetterCase(e){return typeof e!="string"?"":this.uppercase?e.toUpperCase():e.toLowerCase()}async syncValues(){let e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);e!==null&&(this.format==="hsl"?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?e.hsva.string:e.hsv.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!ip)return;new EyeDropper().open().then(r=>{let t=this.value;this.setColor(r.sRGBHex),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(e){let r=this.value;this.disabled||(this.setColor(e),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(e,r,t,o=100){let i=new Qo(`hsva(${e}, ${r}%, ${t}%, ${o/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(e){e.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(e,r){if(this.isEmpty=!r,r||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let t=this.parseColor(r);t!==null?(this.inputValue=this.value,this.hue=t.hsva.h,this.saturation=t.hsva.s,this.brightness=t.hsva.v,this.alpha=t.hsva.a*100,this.syncValues()):this.inputValue=e??"";}}focus(e){this.inline?this.base.focus(e):this.trigger.focus(e);}blur(){var e;let r=this.inline?this.base:this.trigger;this.hasFocus&&(r.focus({preventScroll:true}),r.blur()),(e=this.dropdown)!=null&&e.open&&this.dropdown.hide();}getFormattedValue(e="hex"){let r=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(r===null)return "";switch(e){case "hex":return r.hex;case "hexa":return r.hexa;case "rgb":return r.rgb.string;case "rgba":return r.rgba.string;case "hsl":return r.hsl.string;case "hsla":return r.hsla.string;case "hsv":return r.hsv.string;case "hsva":return r.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.saturation,r=100-this.brightness,t=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),o=f`
      <div
        part="base"
        class=${M({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?f`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${rt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${M({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${rt({top:`${r}%`,left:`${e}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${k(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${rt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${k(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?f`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${rt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${rt({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${k(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${rt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":f`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${ip?f`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${t.length>0?f`
              <div part="swatches" class="color-picker__swatches">
                ${t.map(i=>{let s=this.parseColor(i);return s?f`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${k(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${i}
                      @click=${()=>this.selectSwatch(i)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(s.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${rt({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${i}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?o:f`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${M({"color-dropdown__trigger":true,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":true})}
          style=${rt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${o}
      </sl-dropdown>
    `}};N.styles=[L,Yc];N.dependencies={"sl-button-group":Ue,"sl-button":J,"sl-dropdown":bt,"sl-icon":K,"sl-input":H,"sl-visually-hidden":Vn};p([O('[part~="base"]')],N.prototype,"base",2);p([O('[part~="input"]')],N.prototype,"input",2);p([O(".color-dropdown")],N.prototype,"dropdown",2);p([O('[part~="preview"]')],N.prototype,"previewButton",2);p([O('[part~="trigger"]')],N.prototype,"trigger",2);p([$()],N.prototype,"hasFocus",2);p([$()],N.prototype,"isDraggingGridHandle",2);p([$()],N.prototype,"isEmpty",2);p([$()],N.prototype,"inputValue",2);p([$()],N.prototype,"hue",2);p([$()],N.prototype,"saturation",2);p([$()],N.prototype,"brightness",2);p([$()],N.prototype,"alpha",2);p([h()],N.prototype,"value",2);p([Kt()],N.prototype,"defaultValue",2);p([h()],N.prototype,"label",2);p([h()],N.prototype,"format",2);p([h({type:Boolean,reflect:true})],N.prototype,"inline",2);p([h({reflect:true})],N.prototype,"size",2);p([h({attribute:"no-format-toggle",type:Boolean})],N.prototype,"noFormatToggle",2);p([h()],N.prototype,"name",2);p([h({type:Boolean,reflect:true})],N.prototype,"disabled",2);p([h({type:Boolean})],N.prototype,"hoist",2);p([h({type:Boolean})],N.prototype,"opacity",2);p([h({type:Boolean})],N.prototype,"uppercase",2);p([h()],N.prototype,"swatches",2);p([h({reflect:true})],N.prototype,"form",2);p([h({type:Boolean,reflect:true})],N.prototype,"required",2);p([ze({passive:false})],N.prototype,"handleTouchMove",1);p([R("format",{waitUntilFirstUpdate:true})],N.prototype,"handleFormatChange",1);p([R("opacity",{waitUntilFirstUpdate:true})],N.prototype,"handleOpacityChange",1);p([R("value")],N.prototype,"handleValueChange",1);N.define("sl-color-picker");var Xh=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class Zo extends I{getInitialOptions(){return {format:"hex",opacity:false,inline:false,swatches:Xh}}renderInput(){return f`
            <sl-color-picker
                name=${this.name}
                data-path=${this.path}
                class="auto-input"
                value=${this.value}
                .format=${this.options.format}
                ?opacity=${this.options.opacity}
                ?inline=${this.options.inline}
                ?required=${this.options.required}
                ?disabled=${!this.options.enable}
                .placeholder=${this.options.placeholder}
                .swatches=${this.options.swatches.join(";")}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-color-picker>
            ${this._renderColors()}
        `}_onClickPresetColor(r){let t=r.target.dataset.color;t&&(this.input.value=t,this.value=t,this.requestUpdate(),this.onFieldInput(),this.input.dispatchEvent(new Event("sl-input",{bubbles:true,composed:true})),this.input.dispatchEvent(new Event("sl-change",{bubbles:true,composed:true})));}_renderColors(){if(this.options.presets)return f`<div class="preset-colors-container">
                ${W(this.options.presets,r=>f`<span
                        data-color="${r}"
                        @click=${this._onClickPresetColor}
                        class="preset-color${this.value===r?" selected":""}"
                        style="background-color:${r};"
                    ></span>`)}
            </div>`}renderView(){return f`<span><span class="color"   style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[I.styles,x`
            sl-color-picker::part(trigger) {
                border-radius: 4px;
            }
            .value{
                display:flex;
                gap: 0.5em;
                align-items: center;
            }
            .preset-colors-container {
                display: flex;
                gap: 0.5em;
                align-items: center;
            }
            .color {
                border: 2px solid white;
                border-radius: 4px;
                width: 1rem;
                height: 1rem;
                outline: 1px solid #aaa;
                margin-right: 0.5rem;
            }
            :host(.viewonly) {
                .value > span {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
            }
            .preset-color{
                width: var(--sl-input-height-medium);
                height: var(--sl-input-height-medium);
                border-radius: 4px;
                display: inline-block;
                cursor: pointer;
                border: 1px solid var(--sl-input-border-color);
                box-sizing: border-box;
                box-shadow: var(--auto-shadow);
                position: relative;
                &:hover{
                    outline:1px solid var(--auto-primary-color);
                }
                &.selected{
                    outline:2px solid var(--auto-primary-color);
                    &::before{
                        display: block;
                        content: "";
                        width: 12px;
                        height: 8px;
                        transform: rotate(-45deg); 
                        border: 2px solid white;
                        box-sizing: border-box;
                        border-top: transparent;
                        border-right: transparent;
                        margin: auto; /* 修改为 auto */
                        position: absolute;
                        top: 0; /* 添加顶部定位 */
                        left: 0; /* 添加左侧定位 */
                        right: 0; /* 添加右侧定位 */
                        bottom: 0; /* 添加底部定位 */
                    }
                }
            }
        `],exports.AutoFieldColorPicker=v([T("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class ti extends I{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.choices.map((t,o)=>{let i={};return typeof t=="object"?Object.assign(i,t):Object.assign(i,{id:t,label:t,value:t}),i.icon&&(this.isShowIcon=true),i.$index=o,i}),this.selection=this.value;}renderInput(){return f`
            <div class="items">
                ${this.items.map(t=>this.renderCheckItemWithCard(this.renderCheckboxItem(t),t))}
            </div>
        `}renderCheckboxItem(t){return f`
            <sl-checkbox
                data-index="${t.$index}"
                data-value="${t[this.valueKey]}"
                .value="${t[this.valueKey]}"
                .checked=${this.value.includes(t[this.valueKey])}
                help-text="${t.tips}"
                @sl-change=${this._onCheckChange.bind(this)}
            >
                ${t.label}</sl-checkbox
            >
        `}_onCheckChange(t){let o=t.target.closest(".card")||t.target,i=Number(o.dataset.index),s=o.checked??!o.classList.contains("selected"),n=this.items[i];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let a=this.selection.findIndex(l=>l===n[this.valueKey]);a>-1&&this.selection.splice(a,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(t,o){if(this.options.card){let i=this.selection.includes(o[this.valueKey]);return f`<div
                class="card ${i?"selected":""}"
                data-index="${o.$index}"
                style=${rt({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">${F(this.isShowIcon,()=>f`<sl-icon class="icon" name="${o.icon||""}"></sl-icon>`)} ${t}</div>
            </div>`}else return t}};exports.AutoFieldCheckboxGroup.styles=[I.styles,x`
            .items {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
                sl-checkbox {
                    padding: 0.5rem;
                }
                sl-checkbox::part(form-control-help-text) {
                    max-height: 2.4rem;
                    overflow: hidden;
                }
                sl-checkbox::part(base) {
                    font-size: var(--auto-font-size);
                }
            }
            sl-icon::part(svg) {
                stroke-width: 1.1;
            }
            .card {
                padding: calc(var(--auto-spacing) * 0.3);
                box-sizing: border-box;
                cursor: pointer;
                sl-checkbox {
                    padding: 0rem;
                }
                & > .body {
                    display: flex;
                    flex-direction: row;
                    border: var(--auto-border);
                    border-radius: var(--auto-border-radius);
                    box-shadow: var(--auto-shadow);
                    padding: var(--auto-spacing);
                    box-sizing: border-box;
                    position: relative;
                        overflow: hidden;
                    &:hover {
                        outline: 1px solid var(--sl-color-primary-500);
                    }
                    sl-icon.icon {
                        flex-shrink: 0;
                        color: var(--auto-primary-color);
                        padding: 0.5em;
                        padding-top: 0px;
                        padding-left: 0px;
                        font-size: calc(2 * var(--auto-font-size));
                    }
                    sl-checkbox::part(label) {
                        margin-left: 0px;
                        font-size: var(--auto-font-size);
                    }
                    sl-checkbox::part(form-control-help-text) {
                        max-height: 2.8em;
                        line-height: 150%;                        
                        color: var(--auto-color);
                        filter: opacity(0.5);
                        overflow: hidden;
                    }
                    sl-checkbox::part(control) {
                        display: none;
                    }
                }
                &.card.selected {
                    & > .body {
                        border: 1px solid var(--sl-color-primary-500);
                        background: color-mix(in srgb, var(--t-color-primary-5, var(--sl-color-primary-500)) 20%, transparent);
                        &:hover {
                            outline: 1px solid var(--sl-color-primary-500); 
                        }
                        &:before {
                            content: ' ';
                            position: absolute;
                            left: calc(100% - 24px);
                            top: 0px;
                            width: 24px;
                            height: 24px;
                            box-sizing: border-box;
                            border: 12px solid transparent;
                            border-top-color: var(--sl-color-primary-500);
                            border-right-color: var(--sl-color-primary-500);
                        }
                        &:after {
                            content: ' ';
                            position: absolute;
                            left: calc(100% - 12px);
                            top: 2px;
                            width: 10px;
                            height: 6px;
                            box-sizing: border-box;
                            border: 2px solid transparent;
                            border-left-color: white;
                            border-bottom-color: white;
                            transform: rotate(-45deg);
                        }
                    }
                }
            }
        `],exports.AutoFieldCheckboxGroup=v([T("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class ei extends I{constructor(){super(...arguments);this.parts=[];}getInitialOptions(){return {template:"0000",delimiter:"",caseType:"both",includeDelimiter:true,onlyNumber:false}}_isValidChar(t){return this.options.chars?new RegExp(this.options.chars).test(t):true}_onKeyDown(t){let o=t.key;o.length===1&&(this._isValidChar(o)||t.preventDefault(),t.stopPropagation());}_onPartInput(t){let i=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,a)=>(n+=a.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),s=0;this.parts.forEach((n,a)=>{this.options.delimiter.includes(n)||(this.parts[a]=i[s++]);}),this.onFieldChange(),this._isLastInput(t);}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((t,o)=>this.options.delimiter.includes(o)?t:`${t}${o}`,"")}_isLastInput(t){let o=t.target;if(o.value.length>=1){o.blur();let i=o.nextElementSibling||o.nextElementSibling?.nextElementSibling;i&&(i.focus(),i.select());}}_onPaste(t){t.preventDefault();let o=t.clipboardData?.getData("text/plain")||"",i=this._parseParts(o),s=a=>{if(a){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let a of i)if(!this.options.delimiter.includes(a)&&(n.value=a,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value);}_parseParts(t){let o=this.options.delimiter,i=this.options.template,s=0;return Array.from(i).map(n=>{if(o.includes(n))return t[s]===n&&s++,n;{let a=t[s++]||n;return this.options.caseType==="upper"?a.toUpperCase():this.options.caseType==="lower"?a.toLowerCase():a}})}_onPartFocus(t){t.target.select();}renderPart(t){return f`<sl-input
            maxLength="1"
            .value=${t}
            noSpinButtons
            autocorrect="off"
            autocomplete="off"
            spellcheck="false"
            @paste=${o=>this._onPaste(o)}
            @sl-focus=${this._onPartFocus.bind(this)}
            @keydown=${this._onKeyDown.bind(this)}
            @sl-input=${this._onPartInput.bind(this)}
        ></sl-input>`}renderInput(){return f`
            <auto-flex grow="none" align="center" gap="0.5em" wrap>
                ${W(this.parts,t=>this.options.delimiter.includes(t)?f`${t}`:this.renderPart(t))}
            </auto-flex>
        `}};exports.AutoFieldParts.styles=[I.styles,x`
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
        `],exports.AutoFieldParts=v([T("auto-field-parts")],exports.AutoFieldParts);var ct=class extends I{constructor(){super(...arguments);this.active=false;}static{this.styles=[I.styles,x`
            sl-dropdown{
                width: 100%;                
            } 
            .placeholder{
                color: var(--auto-border-color);                
                flex-grow: 1; 
            }
            :host>.autofield>.value>.content{
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
                &>.dropdown{
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    background-color: var(--auto-input-bgcolor);                    
                    padding: calc(0.5 * var(--auto-padding));
                    box-sizing: border-box;
                    &>sl-dropdown{
                        &::slotted(*){
                            align-items: center;
                        }
                    }
                }
                &>.actions{
                    display: flex;
                    align-items: center;
                    &>*::part(base){
                        border: 0px;
                        border-radius: 0px;
                    }
                }
                &>.actions.before{                    
                    &>*::part(base){
                        border-right: var(--auto-border);
                    }
                }
                &>.actions.after{
                    &>*::part(base){
                        border-left: var(--auto-border);
                    }
                }
            }
            .selection{
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: var(--auto-font-size);
                color: var(--auto-text-color); 
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                height:var(--auto-line-height);
                &>.select-value,&>.content{
                    flex-grow: 1; 
                    display: flex;
                    align-items: center;
                    padding: 0 0.5em;
                }
                &>.suffix{
                    cursor: pointer;
                    padding-left: 0.5em;
                    padding-right: 0.5em;
                }
                sl-tag{
                    margin-right: 0.5em;
                    margin-top: 0.rem;
                    margin-bottom: 0.2em;
                }
                &>.icon{
                    display: flex;
                    align-items: center;
                    font-size: var(--auto-font-size);
                    padding-left: 0.5em;
                }
            } 
            .popoup-container{
                min-height: 1em;
                position: relative;                
                &.dropdown{
                    border: var(--auto-border);
                    background-color: var(--sl-input-background-color);
                }
            }            
            sl-icon.chevron{
                transition: all 0.2s ease-in;
                &.active{
                    transform: rotate(-180deg);
                }
            }
        `];}getInitialOptions(){return {dropdown:true}}_isEmpty(){return Array.isArray(this.value)?this.value.length===0:this.value.trim()===""}_renderSelection(){return f`<div class="selection" slot="trigger">                    
                    ${F(this.options.icon,()=>f`<span class='icon'><sl-icon name="${this.options.icon}"></sl-icon></span>`)}
                    ${F(this._isEmpty()&&this.options.placeholder,()=>f`<span class='placeholder'>${this.options.placeholder}</span>`,()=>f`<span class="select-value">
                    ${this.renderSelection()}
                </span>`)}
                <span class='suffix'>
                    <sl-icon 
                        library="system" 
                        class="chevron ${M({active:this.active})}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>
            </div>       `}_renderContent(){return f`<div class="popoup-container ${k(this.options.dropdown?"dropdown":void 0)}">
            ${this.renderDropdown()}
        </div>`}renderDropdown(){}renderSelection(t){return f`    
        ${this.options.renderSelection?this.options.renderSelection(t||this.value,f):t||this.value}
            `}renderInput(){return this.options.dropdown?f`
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
                    ${this._renderSelection()}
                    ${this._renderContent()}
                </sl-dropdown>
            </span>
            ${this.renderAfterActions(false)}
            </div>
            `:f`${this._renderContent()}`}};v([$()],ct.prototype,"active",2);var sp=x`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;var Es=class extends z{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(e){let r=["menuitem","menuitemcheckbox"],t=e.composedPath(),o=t.find(a=>{var l;return r.includes(((l=a?.getAttribute)==null?void 0:l.call(a,"role"))||"")});if(!o||t.find(a=>{var l;return ((l=a?.getAttribute)==null?void 0:l.call(a,"role"))==="menu"})!==this)return;let n=o;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){let r=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),r?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){let r=this.getAllItems(),t=this.getCurrentItem(),o=t?r.indexOf(t):0;r.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?o++:e.key==="ArrowUp"?o--:e.key==="Home"?o=0:e.key==="End"&&(o=r.length-1),o<0&&(o=r.length-1),o>r.length-1&&(o=0),this.setCurrentItem(r[o]),r[o].focus());}}handleMouseDown(e){let r=e.target;this.isMenuItem(r)&&this.setCurrentItem(r);}handleSlotChange(){let e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0]);}isMenuItem(e){var r;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((r=e.getAttribute("role"))!=null?r:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(t=>{t.setAttribute("tabindex",t===e?"0":"-1");});}render(){return f`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Es.styles=[L,sp];p([O("slot")],Es.prototype,"defaultSlot",2);Es.define("sl-menu");var np=x`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;var ri=(e,r)=>{let t=e._$AN;if(t===void 0)return  false;for(let o of t)o._$AO?.(r,false),ri(o,r);return  true},Os=e=>{let r,t;do{if((r=e._$AM)===void 0)break;t=r._$AN,t.delete(e),e=r;}while(t?.size===0)},ap=e=>{for(let r;r=e._$AM;e=r){let t=r._$AN;if(t===void 0)r._$AN=t=new Set;else if(t.has(e))break;t.add(e),Zh(r);}};function Jh(e){this._$AN!==void 0?(Os(this),this._$AM=e,ap(this)):this._$AM=e;}function Qh(e,r=false,t=0){let o=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(r)if(Array.isArray(o))for(let s=t;s<o.length;s++)ri(o[s],false),Os(o[s]);else o!=null&&(ri(o,false),Os(o));else ri(this,e);}var Zh=e=>{e.type==kt.CHILD&&(e._$AP??=Qh,e._$AQ??=Jh);},Ts=class extends Lt{constructor(){super(...arguments),this._$AN=void 0;}_$AT(r,t,o){super._$AT(r,t,o),ap(this),this.isConnected=r._$AU;}_$AO(r,t=true){r!==this.isConnected&&(this.isConnected=r,r?this.reconnected?.():this.disconnected?.()),t&&(ri(this,r),Os(this));}setValue(r){if(Ji(this._$Ct))this._$Ct._$AI(r,this);else {let t=[...this._$Ct._$AH];t[this._$Ci]=r,this._$Ct._$AI(t,this,0);}}disconnected(){}reconnected(){}};var lp=()=>new qn,qn=class{},Wn=new WeakMap,cp=Bt(class extends Ts{render(e){return q}update(e,[r]){let t=r!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=r,this.ht=e.options?.host,this.rt(this.ct=e.element)),q}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){let r=this.ht??globalThis,t=Wn.get(r);t===void 0&&(t=new WeakMap,Wn.set(r,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,e),e!==void 0&&this.G.call(this.ht,e);}else this.G.value=e;}get lt(){return typeof this.G=="function"?Wn.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var pp=class{constructor(e,r){this.popupRef=lp(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=t=>{switch(t.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(t);break;}},this.handleClick=t=>{var o;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&(t.target.tagName==="sl-menu-item"||(o=t.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=t=>{t.stopPropagation();},this.handlePopupReposition=()=>{let t=this.host.renderRoot.querySelector("slot[name='submenu']"),o=t?.assignedElements({flatten:true}).filter(c=>c.localName==="sl-menu")[0],i=getComputedStyle(this.host).direction==="rtl";if(!o)return;let{left:s,top:n,width:a,height:l}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${i?s+a:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${i?s+a:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`);},(this.host=e).addController(this),this.hasSlotController=r;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(e){let r=this.host.renderRoot.querySelector("slot[name='submenu']");if(!r){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let t=null;for(let o of r.assignedElements())if(t=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),t.length!==0)break;if(!(!t||t.length===0)){t[0].setAttribute("tabindex","0");for(let o=1;o!==t.length;++o)t[o].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?t[0]instanceof HTMLElement&&t[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{t[0]instanceof HTMLElement&&t[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate());}enableSubmenu(e=true){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;let r=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((i,s)=>{var n;let a=(n=r.get(s))!=null?n:new CSSUnitValue(0,"px"),c=(a instanceof CSSUnitValue?a:new CSSUnitValue(0,"px")).to("px");return i-c.value},0);this.skidding=o;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?f`
      <sl-popup
        ${cp(this.popupRef)}
        placement=${e?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:f` <slot name="submenu" hidden></slot> `}};var Ht=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new ft(this,"submenu"),this.submenuController=new pp(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleMouseOver=e=>{this.focus(),e.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return Dl(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let e=this.localize.dir()==="rtl",r=this.submenuController.isExpanded();return f`
      <div
        id="anchor"
        part="base"
        class=${M({"menu-item":true,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":r})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!r}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${e?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?f` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};Ht.styles=[L,np];Ht.dependencies={"sl-icon":K,"sl-popup":Q,"sl-spinner":Te};p([O("slot:not([name])")],Ht.prototype,"defaultSlot",2);p([O(".menu-item")],Ht.prototype,"menuItem",2);p([h()],Ht.prototype,"type",2);p([h({type:Boolean,reflect:true})],Ht.prototype,"checked",2);p([h()],Ht.prototype,"value",2);p([h({type:Boolean,reflect:true})],Ht.prototype,"loading",2);p([h({type:Boolean,reflect:true})],Ht.prototype,"disabled",2);p([R("checked")],Ht.prototype,"handleCheckedChange",1);p([R("disabled")],Ht.prototype,"handleDisabledChange",1);p([R("type")],Ht.prototype,"handleTypeChange",1);Ht.define("sl-menu-item");K.define("sl-icon");me.define("sl-tag");exports.AutoFieldList=class vr extends ct{constructor(){super(...arguments);this.selection=[];this.valueKey="value";this.labelKey="label";this.items=new We(this,"choices",t=>{if(!t||!Array.isArray(t))return [];let o=up(this.value).filter(s=>t.some(n=>n[this.options.valueKey]===s));return o.length===this.selection.length&&o.every((s,n)=>s===this.selection[n])||(this.selection=o),t});this.selectedTips="";}get loadedItems(){return this.items.value||[]}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,dropdown:false,maxTagCount:3,itemTemplate:void 0,choices:[]}}connectedCallback(){super.connectedCallback(),this.options&&this.setPresetActions(),this.style.height="auto";}updateOptions(){super.updateOptions(),this.setPresetActions();}isItemSelected(t){return this.value===void 0?false:this.options.multiple===false?this.value===t[this.options.valueKey]:this.value.includes(t[this.options.valueKey])}_addSecectItem(t){let o=t[this.options.valueKey];this.selection.includes(o)||(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(o));}_removeSelectItem(t){let o=this.selection.findIndex(i=>i===t);o>-1&&this.selection.splice(o,1),this.onFieldChange(),this.requestUpdate();}_onSelectItem(t){let o=t.detail.item,i=o.dataset.index,s=this.loadedItems[i];s&&(o.checked?this._addSecectItem(s):this._removeSelectItem(s[this.options.valueKey]),this.selectedTips=`${this.selection.length}/${this.loadedItems.length}`,this.onFieldChange());}_renderItem(t){let o=this.options.renderItem;return typeof o=="string"?f`${Pt(o.replace(/\{(.+?)\}/g,(i,s)=>t[s]))}`:typeof o=="function"?f`${Pt(o(t))}`:t.label}_onClickPresetAction(t){t==="all"?this.selection=this.loadedItems.map(o=>o[this.options.valueKey]):t==="reverse"?this.selection=this.loadedItems.filter(o=>!this.selection.includes(o[this.options.valueKey])).map(o=>o[this.options.valueKey]):t==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let t=[];this.options.multiple&&t.push({id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")});let o=i=>{for(let s=t.length-1;s>=0;s--)if(t[s].id===i.id){let n=i.onClick;i.onClick=()=>{t[s].onClick(),n&&n.call(this,this.getInputValue());},t.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(i=>{o(i);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(i=>{o(i);}),t.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...t));}getInputValue(){return this.options.multiple?[...this.selection]:this.selection.length>0?this.selection[0]:void 0}getShowLabel(t){let o=this.options.labelKey;if(o){if(o in t)return t[o]}else return t.label}_renderList(){let t=up(this.value);return f` <sl-menu
            class="mark-err ${M({multiple:this.options.multiple})}"
            style=${rt({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}
        >
            ${W(this.loadedItems,(o,i)=>{let s=t.includes(o[this.options.valueKey]);return f`<sl-menu-item type="checkbox"
                    data-index=${String(i)} .checked=${s}>
                    ${F(o.icon,()=>f`<sl-icon slot="prefix" name="${o.icon}"></sl-icon>`)}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(o)} </auto-flex>
                </sl-menu-item>`})}
        </sl-menu>`}_renderHeader(){return f`${F(this.beforeActions.length>0,()=>f`<div class="header">${this.renderBeforeActions()}</div>`)}
        `}_renderFooter(){if(!(!this.options.multiple&&this.afterActions.length===0))return f`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.loadedItems.length} </span>
        </div>`}renderSelection(){let t=this.options.labelKey||"label",o=this.options.maxTagCount,i=s=>{let n=this.loadedItems.find(a=>a[this.options.valueKey]===s);return n?n[t]:s};return this.options.multiple?f`<span class="tags">
                ${this.selection.slice(0,o).map(s=>f`<sl-tag
                                data-id="${s}"
                                removable
                                @sl-remove=${this._onRemoveTag.bind(this)}
                                @click=${n=>n.stopPropagation()}
                                >${i(s)}</sl-tag
                            >`)}
                ${F(this.selection.length>o,()=>f`<sl-tag>+${this.selection.length-o}</sl-tag>`)}
            </span>`:f`${i(this.selection[0])}`}_onRemoveTag(t){this._removeSelectItem(t.target.dataset.id),t.stopPropagation();}renderDropdown(){return f`${F(this.items.loading,()=>f`<auto-loading></auto-loading>`,()=>f`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`)}`}renderInput(){return this.options.dropdown?f`<div class="content">
                <sl-dropdown
                    size="${this.context.size}"
                    @sl-show=${()=>{this.active=true;}}
                    @sl-after-hide=${()=>{this.active=false;}}
                    sync="width"
                    distance="12"
                    .containingElement="${this}"
                >
                    ${this._renderSelection()} ${this._renderContent()}
                </sl-dropdown>
            </div>`:f`${F(this.items.loading,()=>f`<auto-loading></auto-loading>`,()=>f`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`)}`}};exports.AutoFieldList.styles=[I.styles,ct.styles,x`
            sl-menu-item[checked] {
                background-color: color-mix(in srgb, var(--auto-theme-color) 10%, transparent);
            }
            .header {
                padding: 0.5em;
                padding-bottom: 0.5em;
            }
            .footer {
                padding: 0.5em;
                padding-top: 0.5em;
                display: flex;
                flex-direction: row;
                align-items: center;
                & > .detail {
                    flex-grow: 1;
                    text-align: right;
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-400);
                    padding: 0px 1em;
                }
            }
            sl-menu-item::part(label) {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: var(--auto-font-size);
                & :first-child {
                    flex-grow: 1;
                }
            }
            /* dropdown 面板内的 menu 去自身边框与圆角——面板外框由基类
               .popoup-container.dropdown 单一提供，menu 直角铺满容器，
               底部圆角才不会被 menu 背景盖住 */
            .popoup-container sl-menu {
                border: 0px;
                border-radius: 0px;
                background-color: transparent;
            }
            /* ============ 列表滚动条：低调 8px，hover 容器时才显示 ============ */
            /* Firefox */
            sl-menu {
                scrollbar-width: thin;
                scrollbar-color: transparent transparent;
                transition: scrollbar-color 0.3s ease;
            }
            sl-menu:hover {
                scrollbar-color: var(--sl-color-neutral-300, #cbd5e1) transparent;
            }
            /* WebKit（Chrome/Safari/Edge） */
            sl-menu::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            sl-menu::-webkit-scrollbar-thumb {
                background-color: transparent;
                border-radius: 4px;
                transition: background-color 0.3s ease;
            }
            sl-menu:hover::-webkit-scrollbar-thumb {
                background-color: var(--sl-color-neutral-300, #cbd5e1);
            }
            sl-menu:hover::-webkit-scrollbar-thumb:hover {
                background-color: var(--sl-color-neutral-400, #94a3b8);
            }
            /* ============ 下拉触发器 tags（与 tree-dropdown 同款展示） ============
               dropdown 模式走 .content 包裹（自带边框+padding），sl-dropdown 直接
               挂 .content 下；.selection 单行高度、无边框。溢出不可滚——tag 数量
               交由 maxTagCount 折叠控制（触发器内滚动交互差），隐藏溢出即可 */
            .content > sl-dropdown .selection {
                height: auto;
                min-height: var(--auto-line-height);
                max-height: 12rem;
                overflow: hidden;
                & > .select-value {
                    display: block;
                    & > .tags {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                    }
                }
                sl-tag {
                    margin-right: 0.5rem;
                    margin-top: 0.1rem;
                    margin-bottom: 0.1rem;
                }
            }
            sl-icon.chevron {
                transition: all 0.2s ease-in;
                &.active {
                    transform: rotate(-180deg);
                }
            }
        `],v([$()],exports.AutoFieldList.prototype,"selectedTips",2),v([O("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=v([T("auto-field-list")],exports.AutoFieldList);function up(e){return e==null||e===""?[]:Array.isArray(e)?e:[e]}exports.AutoFieldStepper=class Rs extends I{render(){return f`
            <div class="">
                <sl-button>-</sl-button>
                <sl-input></sl-input>
                <sl-button>+</sl-button>
            </div>
        `}};exports.AutoFieldStepper=v([T("auto-field-stepper")],exports.AutoFieldStepper);var hp=x`
  :host {
    display: inline-block;
  }
`;var dp=null,Is=class{};Is.render=function(e,r){dp(e,r);};self.QrCreator=Is;(function(e){function r(a,l,c,d){var u={},m=e(c,l);m.u(a),m.J(),d=d||0;var g=m.h(),b=m.h()+2*d;return u.text=a,u.level=l,u.version=c,u.O=b,u.a=function(y,C){return y-=d,C-=d,0>y||y>=g||0>C||C>=g?false:m.a(y,C)},u}function t(a,l,c,d,u,m,g,b,y,C){function S(w,E,_,A,V,j,U){w?(a.lineTo(E+j,_+U),a.arcTo(E,_,A,V,m)):a.lineTo(E,_);}g?a.moveTo(l+m,c):a.moveTo(l,c),S(b,d,c,d,u,-m,0),S(y,d,u,l,u,0,-m),S(C,l,u,l,c,m,0),S(g,l,c,d,c,0,m);}function o(a,l,c,d,u,m,g,b,y,C){function S(w,E,_,A){a.moveTo(w+_,E),a.lineTo(w,E),a.lineTo(w,E+A),a.arcTo(w,E,w+_,E,m);}g&&S(l,c,m,m),b&&S(d,c,-m,m),y&&S(d,u,-m,-m),C&&S(l,u,m,-m);}function i(a,l){var c=l.fill;if(typeof c=="string")a.fillStyle=c;else {var d=c.type,u=c.colorStops;if(c=c.position.map(g=>Math.round(g*l.size)),d==="linear-gradient")var m=a.createLinearGradient.apply(a,c);else if(d==="radial-gradient")m=a.createRadialGradient.apply(a,c);else throw Error("Unsupported fill");u.forEach(([g,b])=>{m.addColorStop(g,b);}),a.fillStyle=m;}}function s(a,l){t:{var c=l.text,d=l.v,u=l.N,m=l.K,g=l.P;for(u=Math.max(1,u||1),m=Math.min(40,m||40);u<=m;u+=1)try{var b=r(c,d,u,g);break t}catch{}b=void 0;}if(!b)return null;for(c=a.getContext("2d"),l.background&&(c.fillStyle=l.background,c.fillRect(l.left,l.top,l.size,l.size)),d=b.O,m=l.size/d,c.beginPath(),g=0;g<d;g+=1)for(u=0;u<d;u+=1){var y=c,C=l.left+u*m,S=l.top+g*m,w=g,E=u,_=b.a,A=C+m,V=S+m,j=w-1,U=w+1,D=E-1,P=E+1,gt=Math.floor(Math.min(.5,Math.max(0,l.R))*m),pt=_(w,E),Et=_(j,D),ut=_(j,E);j=_(j,P);var qt=_(w,P);P=_(U,P),E=_(U,E),U=_(U,D),w=_(w,D),C=Math.round(C),S=Math.round(S),A=Math.round(A),V=Math.round(V),pt?t(y,C,S,A,V,gt,!ut&&!w,!ut&&!qt,!E&&!qt,!E&&!w):o(y,C,S,A,V,gt,ut&&w&&Et,ut&&qt&&j,E&&qt&&P,E&&w&&U);}return i(c,l),c.fill(),a}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};dp=function(a,l){var c={};Object.assign(c,n,a),c.N=c.minVersion,c.K=c.maxVersion,c.v=c.ecLevel,c.left=c.left,c.top=c.top,c.size=c.size,c.fill=c.fill,c.background=c.background,c.text=c.text,c.R=c.radius,c.P=c.quiet,l instanceof HTMLCanvasElement?((l.width!==c.size||l.height!==c.size)&&(l.width=c.size,l.height=c.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,c)):(a=document.createElement("canvas"),a.width=c.size,a.height=c.size,c=s(a,c),l.appendChild(c));};})((function(){function e(l){var c=t.s(l);return {S:function(){return 4},b:function(){return c.length},write:function(d){for(var u=0;u<c.length;u+=1)d.put(c[u],8);}}}function r(){var l=[],c=0,d={B:function(){return l},c:function(u){return (l[Math.floor(u/8)]>>>7-u%8&1)==1},put:function(u,m){for(var g=0;g<m;g+=1)d.m((u>>>m-g-1&1)==1);},f:function(){return c},m:function(u){var m=Math.floor(c/8);l.length<=m&&l.push(0),u&&(l[m]|=128>>>c%8),c+=1;}};return d}function t(l,c){function d(w,E){for(var _=-1;7>=_;_+=1)if(!(-1>=w+_||b<=w+_))for(var A=-1;7>=A;A+=1) -1>=E+A||b<=E+A||(g[w+_][E+A]=0<=_&&6>=_&&(A==0||A==6)||0<=A&&6>=A&&(_==0||_==6)||2<=_&&4>=_&&2<=A&&4>=A);}function u(w,E){for(var _=b=4*l+17,A=Array(_),V=0;V<_;V+=1){A[V]=Array(_);for(var j=0;j<_;j+=1)A[V][j]=null;}for(g=A,d(0,0),d(b-7,0),d(0,b-7),_=s.G(l),A=0;A<_.length;A+=1)for(V=0;V<_.length;V+=1){j=_[A];var U=_[V];if(g[j][U]==null)for(var D=-2;2>=D;D+=1)for(var P=-2;2>=P;P+=1)g[j+D][U+P]=D==-2||D==2||P==-2||P==2||D==0&&P==0;}for(_=8;_<b-8;_+=1)g[_][6]==null&&(g[_][6]=_%2==0);for(_=8;_<b-8;_+=1)g[6][_]==null&&(g[6][_]=_%2==0);for(_=s.w(m<<3|E),A=0;15>A;A+=1)V=!w&&(_>>A&1)==1,g[6>A?A:8>A?A+1:b-15+A][8]=V,g[8][8>A?b-A-1:9>A?15-A:14-A]=V;if(g[b-8][8]=!w,7<=l){for(_=s.A(l),A=0;18>A;A+=1)V=!w&&(_>>A&1)==1,g[Math.floor(A/3)][A%3+b-8-3]=V;for(A=0;18>A;A+=1)V=!w&&(_>>A&1)==1,g[A%3+b-8-3][Math.floor(A/3)]=V;}if(y==null){for(w=a.I(l,m),_=r(),A=0;A<C.length;A+=1)V=C[A],_.put(4,4),_.put(V.b(),s.f(4,l)),V.write(_);for(A=V=0;A<w.length;A+=1)V+=w[A].j;if(_.f()>8*V)throw Error("code length overflow. ("+_.f()+">"+8*V+")");for(_.f()+4<=8*V&&_.put(0,4);_.f()%8!=0;)_.m(false);for(;!(_.f()>=8*V)&&(_.put(236,8),!(_.f()>=8*V));)_.put(17,8);var gt=0;for(V=A=0,j=Array(w.length),U=Array(w.length),D=0;D<w.length;D+=1){var pt=w[D].j,Et=w[D].o-pt;for(A=Math.max(A,pt),V=Math.max(V,Et),j[D]=Array(pt),P=0;P<j[D].length;P+=1)j[D][P]=255&_.B()[P+gt];for(gt+=pt,P=s.C(Et),pt=o(j[D],P.b()-1).l(P),U[D]=Array(P.b()-1),P=0;P<U[D].length;P+=1)Et=P+pt.b()-U[D].length,U[D][P]=0<=Et?pt.c(Et):0;}for(P=_=0;P<w.length;P+=1)_+=w[P].o;for(_=Array(_),P=gt=0;P<A;P+=1)for(D=0;D<w.length;D+=1)P<j[D].length&&(_[gt]=j[D][P],gt+=1);for(P=0;P<V;P+=1)for(D=0;D<w.length;D+=1)P<U[D].length&&(_[gt]=U[D][P],gt+=1);y=_;}for(w=y,_=-1,A=b-1,V=7,j=0,E=s.F(E),U=b-1;0<U;U-=2)for(U==6&&--U;;){for(D=0;2>D;D+=1)g[A][U-D]==null&&(P=false,j<w.length&&(P=(w[j]>>>V&1)==1),E(A,U-D)&&(P=!P),g[A][U-D]=P,--V,V==-1&&(j+=1,V=7));if(A+=_,0>A||b<=A){A-=_,_=-_;break}}}var m=i[c],g=null,b=0,y=null,C=[],S={u:function(w){w=e(w),C.push(w),y=null;},a:function(w,E){if(0>w||b<=w||0>E||b<=E)throw Error(w+","+E);return g[w][E]},h:function(){return b},J:function(){for(var w=0,E=0,_=0;8>_;_+=1){u(true,_);var A=s.D(S);(_==0||w>A)&&(w=A,E=_);}u(false,E);}};return S}function o(l,c){if(typeof l.length>"u")throw Error(l.length+"/"+c);var d=(function(){for(var m=0;m<l.length&&l[m]==0;)m+=1;for(var g=Array(l.length-m+c),b=0;b<l.length-m;b+=1)g[b]=l[b+m];return g})(),u={c:function(m){return d[m]},b:function(){return d.length},multiply:function(m){for(var g=Array(u.b()+m.b()-1),b=0;b<u.b();b+=1)for(var y=0;y<m.b();y+=1)g[b+y]^=n.i(n.g(u.c(b))+n.g(m.c(y)));return o(g,0)},l:function(m){if(0>u.b()-m.b())return u;for(var g=n.g(u.c(0))-n.g(m.c(0)),b=Array(u.b()),y=0;y<u.b();y+=1)b[y]=u.c(y);for(y=0;y<m.b();y+=1)b[y]^=n.i(n.g(m.c(y))+g);return o(b,0).l(m)}};return u}t.s=function(l){for(var c=[],d=0;d<l.length;d++){var u=l.charCodeAt(d);128>u?c.push(u):2048>u?c.push(192|u>>6,128|u&63):55296>u||57344<=u?c.push(224|u>>12,128|u>>6&63,128|u&63):(d++,u=65536+((u&1023)<<10|l.charCodeAt(d)&1023),c.push(240|u>>18,128|u>>12&63,128|u>>6&63,128|u&63));}return c};var i={L:1,M:0,Q:3,H:2},s=(function(){function l(u){for(var m=0;u!=0;)m+=1,u>>>=1;return m}var c=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],d={w:function(u){for(var m=u<<10;0<=l(m)-l(1335);)m^=1335<<l(m)-l(1335);return (u<<10|m)^21522},A:function(u){for(var m=u<<12;0<=l(m)-l(7973);)m^=7973<<l(m)-l(7973);return u<<12|m},G:function(u){return c[u-1]},F:function(u){switch(u){case 0:return function(m,g){return (m+g)%2==0};case 1:return function(m){return m%2==0};case 2:return function(m,g){return g%3==0};case 3:return function(m,g){return (m+g)%3==0};case 4:return function(m,g){return (Math.floor(m/2)+Math.floor(g/3))%2==0};case 5:return function(m,g){return m*g%2+m*g%3==0};case 6:return function(m,g){return (m*g%2+m*g%3)%2==0};case 7:return function(m,g){return (m*g%3+(m+g)%2)%2==0};default:throw Error("bad maskPattern:"+u)}},C:function(u){for(var m=o([1],0),g=0;g<u;g+=1)m=m.multiply(o([1,n.i(g)],0));return m},f:function(u,m){if(u!=4||1>m||40<m)throw Error("mode: "+u+"; type: "+m);return 10>m?8:16},D:function(u){for(var m=u.h(),g=0,b=0;b<m;b+=1)for(var y=0;y<m;y+=1){for(var C=0,S=u.a(b,y),w=-1;1>=w;w+=1)if(!(0>b+w||m<=b+w))for(var E=-1;1>=E;E+=1)0>y+E||m<=y+E||(w!=0||E!=0)&&S==u.a(b+w,y+E)&&(C+=1);5<C&&(g+=3+C-5);}for(b=0;b<m-1;b+=1)for(y=0;y<m-1;y+=1)C=0,u.a(b,y)&&(C+=1),u.a(b+1,y)&&(C+=1),u.a(b,y+1)&&(C+=1),u.a(b+1,y+1)&&(C+=1),(C==0||C==4)&&(g+=3);for(b=0;b<m;b+=1)for(y=0;y<m-6;y+=1)u.a(b,y)&&!u.a(b,y+1)&&u.a(b,y+2)&&u.a(b,y+3)&&u.a(b,y+4)&&!u.a(b,y+5)&&u.a(b,y+6)&&(g+=40);for(y=0;y<m;y+=1)for(b=0;b<m-6;b+=1)u.a(b,y)&&!u.a(b+1,y)&&u.a(b+2,y)&&u.a(b+3,y)&&u.a(b+4,y)&&!u.a(b+5,y)&&u.a(b+6,y)&&(g+=40);for(y=C=0;y<m;y+=1)for(b=0;b<m;b+=1)u.a(b,y)&&(C+=1);return g+=Math.abs(100*C/m/m-50)/5*10}};return d})(),n=(function(){for(var l=Array(256),c=Array(256),d=0;8>d;d+=1)l[d]=1<<d;for(d=8;256>d;d+=1)l[d]=l[d-4]^l[d-5]^l[d-6]^l[d-8];for(d=0;255>d;d+=1)c[l[d]]=d;return {g:function(u){if(1>u)throw Error("glog("+u+")");return c[u]},i:function(u){for(;0>u;)u+=255;for(;256<=u;)u-=255;return l[u]}}})(),a=(function(){function l(u,m){switch(m){case i.L:return c[4*(u-1)];case i.M:return c[4*(u-1)+1];case i.Q:return c[4*(u-1)+2];case i.H:return c[4*(u-1)+3]}}var c=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],d={I:function(u,m){var g=l(u,m);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+u+"/errorCorrectLevel:"+m);u=g.length/3,m=[];for(var b=0;b<u;b+=1)for(var y=g[3*b],C=g[3*b+1],S=g[3*b+2],w=0;w<y;w+=1){var E=S,_={};_.o=C,_.j=E,m.push(_);}return m}};return d})();return t})());var fp=QrCreator;var re=class extends z{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&fp.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var e;return f`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((e=this.label)==null?void 0:e.length)>0?this.label:this.value}
        style=${rt({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};re.styles=[L,hp];p([O("canvas")],re.prototype,"canvas",2);p([h()],re.prototype,"value",2);p([h()],re.prototype,"label",2);p([h({type:Number})],re.prototype,"size",2);p([h()],re.prototype,"fill",2);p([h()],re.prototype,"background",2);p([h({type:Number})],re.prototype,"radius",2);p([h({attribute:"error-correction"})],re.prototype,"errorCorrection",2);p([R(["background","errorCorrection","fill","radius","size","value"])],re.prototype,"generate",1);re.define("sl-qr-code");exports.AutoFieldQRCode=class Ms extends I{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return f`
            <sl-qr-code
                slot="value"
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                .placeholder=${this.options.placeholder}
                title="${k(this.options.tips)}"
                fill=${this.options.fill}
                background=${this.options.background}
                radius=${this.options.radius}
                error-correction=${this.options.errorCorrection}
                size=${parseInt(String(this.options.size))}
            ></sl-qr-code>
        `}};exports.AutoFieldQRCode=v([T("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class Ge extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;this.captchaUrl="";}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}connectedCallback(){super.connectedCallback(),this.captchaUrl=this.getCaptchaUrl();}getCaptchaUrl(){return typeof this.options.onGenerate=="function"?this.options.onGenerate.call(this):this.getRefreshUrl()}getRefreshUrl(){let t=this.options.url,[o,i]=t.split("?"),s=new URLSearchParams(i);return s.set("t",Date.now().toString()),`${o}?${s.toString()}`}refreshCaptchaImage(){this.captchaUrl=this.getCaptchaUrl(),this.loading=true;}updated(){let t=this.img;t&&(t.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},t.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false;});}renderAfterActions(t){return f`<div
            class="actions after"
            part="after-actions"
            slot="${t?"suffix":void 0}"
        >
            ${this._renderImageAction({type:"image",url:this.captchaUrl,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)})}
            ${W(this.afterActions,o=>this.renderActionWidget(o))}
        </div>`}renderView(){return f`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,x`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
            sl-button.action-widget.image img {
                display: block;
                height: 30px;
                width: auto;
                border-radius: var(--sl-border-radius-small, 4px);
            }
        `],v([O("img")],exports.AutoFieldCaptcha.prototype,"img",2),v([$()],exports.AutoFieldCaptcha.prototype,"loading",2),v([$()],exports.AutoFieldCaptcha.prototype,"captchaUrl",2),exports.AutoFieldCaptcha=v([T("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class yr extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;this.countdownLabel=null;}connectedCallback(){super.connectedCallback();let t=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(t)?Number(t[0]):Number(t),this.step=Array.isArray(t)?Number(t[1]):1e3,this.stepCount=this.timeout/this.step;}getSendLabel(){return this.countdownLabel!==null?this.countdownLabel:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801")}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,typeof this.options.onRequest=="function"&&this.options.onRequest.call(this);let t=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1"),o=this.stepCount,i=()=>{let s=Math.ceil(o*this.step/1e3);this.countdownLabel=t.replace("{timeout}",s.toString()),o--,o<=0?(this.countdownLabel=null,this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(i,this.step);};i();}renderAfterActions(t){return f`<div
            class="actions after"
            part="after-actions"
            slot="${t?"suffix":void 0}"
        >
            ${this._renderButtonAction({label:this.getSendLabel(),variant:this.countdowning?void 0:"primary",onClick:this.sendRequest.bind(this)})}
            ${W(this.afterActions,o=>this.renderActionWidget(o))}
        </div>`}disconnectedCallback(){super.disconnectedCallback(),this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0);}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles],v([$()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),v([$()],exports.AutoFieldVerifyCode.prototype,"countdownLabel",2),exports.AutoFieldVerifyCode=v([T("auto-field-verifycode")],exports.AutoFieldVerifyCode);var mp=x`
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
`;var nt=class Kn extends z{constructor(){super(...arguments),this.localize=new G(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(r){return r instanceof Element&&r.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await te(this.childrenContainer);let{keyframes:r,options:t}=Qt(this,"tree-item.collapse",{dir:this.localize.dir()});await Zt(this.childrenContainer,Zr(r,this.childrenContainer.scrollHeight),t),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let r=this.parentElement;return !!r&&Kn.isTreeItem(r)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(r){r.has("selected")&&!r.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await te(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:r,options:t}=Qt(this,"tree-item.expand",{dir:this.localize.dir()});await Zt(this.childrenContainer,Zr(r,this.childrenContainer.scrollHeight),t),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:r=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(t=>Kn.isTreeItem(t)&&(r||!t.disabled)):[]}render(){let r=this.localize.dir()==="rtl",t=!this.loading&&(!this.isLeaf||this.lazy);return f`
      <div
        part="base"
        class="${M({"tree-item":true,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":t,"tree-item--rtl":this.localize.dir()==="rtl"})}"
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
            class=${M({"tree-item__expand-button":true,"tree-item__expand-button--visible":t})}
            aria-hidden="true"
          >
            ${F(this.loading,()=>f` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${F(this.selectable,()=>f`
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
                ?checked="${Nt(this.selected)}"
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
    `}};nt.styles=[L,mp];nt.dependencies={"sl-checkbox":lt,"sl-icon":K,"sl-spinner":Te};p([$()],nt.prototype,"indeterminate",2);p([$()],nt.prototype,"isLeaf",2);p([$()],nt.prototype,"loading",2);p([$()],nt.prototype,"selectable",2);p([h({type:Boolean,reflect:true})],nt.prototype,"expanded",2);p([h({type:Boolean,reflect:true})],nt.prototype,"selected",2);p([h({type:Boolean,reflect:true})],nt.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],nt.prototype,"lazy",2);p([O("slot:not([name])")],nt.prototype,"defaultSlot",2);p([O("slot[name=children]")],nt.prototype,"childrenSlot",2);p([O(".tree-item__item")],nt.prototype,"itemElement",2);p([O(".tree-item__children")],nt.prototype,"childrenContainer",2);p([O(".tree-item__expand-button slot")],nt.prototype,"expandButtonSlot",2);p([R("loading",{waitUntilFirstUpdate:true})],nt.prototype,"handleLoadingChange",1);p([R("disabled")],nt.prototype,"handleDisabledChange",1);p([R("selected")],nt.prototype,"handleSelectedChange",1);p([R("expanded",{waitUntilFirstUpdate:true})],nt.prototype,"handleExpandedChange",1);p([R("expanded",{waitUntilFirstUpdate:true})],nt.prototype,"handleExpandAnimation",1);p([R("lazy",{waitUntilFirstUpdate:true})],nt.prototype,"handleLazyChange",1);var xr=nt;Jt("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Jt("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var gp=x`
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
`;function bp(e,r=false){function t(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let a=n.every(c=>c.selected),l=n.every(c=>!c.selected&&!c.indeterminate);s.selected=a,s.indeterminate=!a&&!l;}}function o(s){let n=s.parentElement;xr.isTreeItem(n)&&(t(n),o(n));}function i(s){for(let n of s.getChildrenItems())n.selected=r?s.selected||n.selected:!n.disabled&&s.selected,i(n);r&&t(s);}i(e),o(e);}var Ye=class extends z{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new G(this),this.initTreeItem=e=>{e.selectable=this.selection==="multiple",["expand","collapse"].filter(r=>!!this.querySelector(`[slot="${r}-icon"]`)).forEach(r=>{let t=e.querySelector(`[slot="${r}-icon"]`),o=this.getExpandButtonIcon(r);o&&(t===null?e.append(o):t.hasAttribute("data-default")&&t.replaceWith(o));});},this.handleTreeChanged=e=>{for(let r of e){let t=[...r.addedNodes].filter(xr.isTreeItem),o=[...r.removedNodes].filter(xr.isTreeItem);t.forEach(this.initTreeItem),this.lastFocusedItem&&o.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=e=>{let r=e.relatedTarget;(!r||!this.contains(r))&&(this.tabIndex=0);},this.handleFocusIn=e=>{let r=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),xr.isTreeItem(r)&&!r.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=r,this.tabIndex=-1,r.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect();}getExpandButtonIcon(e){let t=(e==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(t){let o=t.cloneNode(true);return [o,...o.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),o.setAttribute("data-default",""),o.slot=`${e}-icon`,o}return null}selectItem(e){let r=[...this.selectedItems];if(this.selection==="multiple")e.selected=!e.selected,e.lazy&&(e.expanded=true),bp(e);else if(this.selection==="single"||e.isLeaf){let o=this.getAllTreeItems();for(let i of o)i.selected=i===e;}else this.selection==="leaf"&&(e.expanded=!e.expanded);let t=this.selectedItems;(r.length!==t.length||t.some(o=>!r.includes(o)))&&Promise.all(t.map(o=>o.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:t}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(e){e?.focus();}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(i=>{var s;return ["input","textarea"].includes((s=i?.tagName)==null?void 0:s.toLowerCase())}))return;let r=this.getFocusableItems(),t=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(r.length>0){e.preventDefault();let i=r.findIndex(l=>l.matches(":focus")),s=r[i],n=l=>{let c=r[At(l,0,r.length-1)];this.focusItem(c);},a=l=>{s.expanded=l;};e.key==="ArrowDown"?n(i+1):e.key==="ArrowUp"?n(i-1):t&&e.key==="ArrowRight"||o&&e.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(i+1):a(true):t&&e.key==="ArrowLeft"||o&&e.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(i-1):a(false):e.key==="Home"?n(0):e.key==="End"?n(r.length-1):(e.key==="Enter"||e.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(e){let r=e.target,t=r.closest("sl-tree-item"),o=e.composedPath().some(i=>{var s;return (s=i?.classList)==null?void 0:s.contains("tree-item__expand-button")});!t||t.disabled||r!==this.clickTarget||(o?t.expanded=!t.expanded:this.selectItem(t));}handleMouseDown(e){this.clickTarget=e.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let e=this.selection==="multiple",r=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(let t of r)t.selectable=e;e&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(t=>bp(t,true)));}get selectedItems(){let e=this.getAllTreeItems(),r=t=>t.selected;return e.filter(r)}getFocusableItems(){let e=this.getAllTreeItems(),r=new Set;return e.filter(t=>{var o;if(t.disabled)return  false;let i=(o=t.parentElement)==null?void 0:o.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||r.has(i))&&r.add(t),!r.has(t)})}render(){return f`
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
    `}};Ye.styles=[L,gp];p([O("slot:not([name])")],Ye.prototype,"defaultSlot",2);p([O("slot[name=expand-icon]")],Ye.prototype,"expandedIconSlot",2);p([O("slot[name=collapse-icon]")],Ye.prototype,"collapsedIconSlot",2);p([h()],Ye.prototype,"selection",2);p([R("selection")],Ye.prototype,"handleSelectionChange",1);Ye.define("sl-tree");xr.define("sl-tree-item");var to=x`
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
`;exports.AutoFieldTreeSelect=class Xe extends I{constructor(){super(...arguments);this.nodes=new We(this,"items",t=>t?(this.selection=[],this._forEachTree(t,(o,i,s,n)=>{this.isItemSelected(o)&&(o.selected=true,this.selection.push({id:o[this.options.idKey],value:o[this.options.valueKey],path:n.join("/")}));}),t):[]);this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,defaultExpandLevel:2,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}isItemSelected(t){return this.value===void 0?false:this.options.multiple===false?this.value===t[this.options.valueKey]:this.value.includes(t[this.options.valueKey])}getStateValue(){let t=super.getStateValue();return this.options.multiple?Array.isArray(t)?t:[t]:t}_forEachTree(t,o){let i=(s,n,a,l)=>{let c=[...l,s[this.options.labelKey]];if(this.options.defaultExpandLevel>0&&a<this.options.defaultExpandLevel-1&&s.expanded===void 0&&(s.expanded=true),o(s,n,a,c),s.children){let d=a+1;s.children.forEach(u=>{i(u,s,d,[...c]);});}};(Array.isArray(t)?t:[t]).forEach(s=>{i(s,void 0,0,[]);});}onSelectionChange(t){let o=Array.from(t.detail.selection);o&&(this.selection=o.map(i=>({id:i.dataset.id,value:i.dataset.value,path:i.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(t=>t.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(t,o,i){let s=o.includes(t[this.options.valueKey]),n=[...i,t[this.options.labelKey]];return f`<sl-tree-item
            data-id=${String(t[this.options.idKey])}
            data-value=${String(t[this.options.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${t.expanded}
        >
            ${F(t.icon,()=>f`<sl-icon name="${t.icon}"></sl-icon>`)} ${t.label}
            ${Array.isArray(t.children)?f`${t.children.map(a=>this._renderNode(a,o,n))}`:""}</sl-tree-item
        >`}_renderNodes(t){let o=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(t)?t.map(i=>this._renderNode(i,o,[])):this._renderNode(t,o,[])}renderTree(){return f`
            ${this.nodes.render(t=>f`<sl-tree
                    class="scrollbar"
                    name="${this.name}"
                    data-path=${this.path}
                    size=${this.context.size}
                    selection="${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
                    @sl-selection-change=${this.onSelectionChange.bind(this)}
                    style="max-height:${this.options.height||"18em"};overflow:auto;"
                    >${this._renderNodes(t)}</sl-tree
                >`)}
            
        `}renderInput(){return f` ${this.renderTree()} `}};exports.AutoFieldTreeSelect.styles=[I.styles,x`
            ${to}
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTreeSelect=v([T("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class _r extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(t){let o=t.target.dataset.id;for(let i=0;i<this.selection.length;i++)if(String(this.selection[i].id)===o){this.selection.splice(i,1),this.onFieldChange(),this.requestUpdate();break}t.stopPropagation();}getShowItemValue(t,o,i){if(o===i)return t}getSelectedTagValue(t){if(this.options.showAsPath)return f`${t.path}`;{let i=t.path.split("/");return i[i.length-1]}}renderSelectedTags(){let t=this.selection;return f`<span class="tags"
            >${W(t,o=>f`<sl-tag data-id="${o.id}" title=${o.path} @sl-remove=${this._onRemoveSelection.bind(this)} @click=${i=>i.stopPropagation()} removable
                    >${this.getSelectedTagValue(o)}</sl-tag
                >`)}</span
        >`}renderSelection(){return f` <div class="selection" slot="trigger">
            ${F(this.selection.length===0&&this.options.placeholder,()=>f`<span class="placeholder">${this.options.placeholder}</span>`)} ${this.renderSelectedTags()}
            <span class="suffix">
                <sl-icon library="system" class="chevron ${M({active:this.active})}" name="chevron-down" aria-hidden="true"> </sl-icon>
            </span>
        </div>`}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}renderInput(){return f`
            <sl-dropdown size="${this.context.size}" @sl-show="${this._onShowPopup.bind(this)}" @sl-after-hide="${this._onHidePopup.bind(this)}" sync="width" hoist>
                ${this.renderSelection()}
                <div>${this.renderTree()}</div>
            </sl-dropdown>
        `}};exports.AutoFieldTreeDropdown.styles=[I.styles,exports.AutoFieldTreeSelect.styles,x`
            sl-dropdown {
                width: 100%;
            }
            sl-tree {
                background-color: var(--sl-color-neutral-0);
            }
            .selection {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: solid var(--sl-input-border-width) var(--sl-input-border-color);
                font-size: var(--auto-font-size);
                min-height: var(--sl-input-height-medium);
                border-radius: var(--sl-input-border-radius-medium);
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                max-height: 12rem;
                overflow-y: auto;
                overflow-x: hidden;
                & > .tags {
                    flex-grow: 1;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                & > .suffix {
                    cursor: pointer;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                sl-tag {
                    margin-right: 0.5rem;
                    margin-top: 0.2rem;
                    margin-bottom: 0.2rem;
                }
            }
            sl-icon.chevron {
                transition: all 0.2s ease-in;
                &.active {
                    transform: rotate(-180deg);
                }
            }
            .placeholder {
                padding-left: 0.5rem;
                color: var(--sl-input-placeholder-color);
            }
        `],v([$()],exports.AutoFieldTreeDropdown.prototype,"active",2),v([O("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=v([T("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);function vp(e){if(e)if(e.type==="checkbox"){if(e.value==="on")return e.checked;if(e.value.startsWith("[")&&e.value.endsWith("]"))try{let r=JSON.parse(e.value);return e.checked?r[0]:r[1]}catch{return e.checked}else return e.checked?e.value:null}else return e.value}exports.AutoFieldCustom=class eo extends ct{constructor(){super(...arguments);this.selection=[];this._skipSync=false;this._lastRendered=void 0;this._onNativeInput=()=>{this._skipSync=true,requestAnimationFrame(()=>{this._skipSync=false;}),this.onFieldChange();};}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{placeholder:"\u8BF7\u9009\u62E9",dropdown:true,inputSelectors:"input,textarea"})}connectedCallback(){super.connectedCallback(),this._onFieldInput();}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this._onNativeInput),this.removeEventListener("change",this._onNativeInput);}}),this.addEventListener("input",this._onNativeInput),this.addEventListener("change",this._onNativeInput);}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(i=>vp(i))}renderDropdown(){let t=Array.isArray(this.value)?this.value:[this.value];return this._skipSync?this._lastRendered??f`<div class="container"></div>`:(this._lastRendered=f`<div class="container">${this.options.renderContent(t,f)}</div>`,this._lastRendered)}};exports.AutoFieldCustom.styles=[ct.styles],v([O(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=v([T("auto-field-custom")],exports.AutoFieldCustom);function yp(e,r){let t=e.width,o=e.height,i=e.widget,s;try{s=document.createElement(`auto-field-${i||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=e,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),r?.styles&&Object.assign(s.style,r.styles),r?.attrs){for(let n in r.attrs)s.setAttribute(n,String(r.attrs[n]));s.parent=r.parent;}return t&&(s.style.width=String(t)),o&&(s.style.height=String(o)),r?.classs&&(typeof r.classs=="string"?s.classList.add(r.classs):typeof r.classs=="object"&&Object.entries(r.classs).forEach(([n,a])=>{a?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class ro extends ct{constructor(){super(...arguments);this._handleChildrenChange=()=>{Object.defineProperty(this,"dirty",{configurable:true,get:()=>this._combineDirty,set:t=>{this._combineDirty=t;}}),this.onFieldChange(),this._updateSelection();};this._combineDirty=false;this._isFirst=true;}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{children:[]})}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("sl-change",this._handleChildrenChange),this.shadow.removeEventListener("sl-input",this._handleChildrenChange);}_updateSelection(){this.selection&&setTimeout(()=>{let t=this.toState(this.getInputValue()),o=super.renderSelection(t);this._isFirst&&(Cr(q,this.selection),this._isFirst=false),Cr(q,this.selection,{isConnected:true}),Cr(o,this.selection,{isConnected:true});});}_onChildrenChange(){this.options.children.length>0&&(this.shadow.addEventListener("sl-change",this._handleChildrenChange),this.shadow.addEventListener("sl-input",this._handleChildrenChange));}renderSelection(){return setTimeout(()=>this._updateSelection()),f``}getInputValue(){let t=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),o=[];return t.forEach(i=>{if(i instanceof HTMLElement&&i.tagName.startsWith("AUTO-FIELD-")){let s=i,n=typeof s.getInputValue=="function"?s.getInputValue():s.value;n===""&&(n=s.value),o.push(n);}}),o}renderDropdown(){return f`
            <div class="children">
                ${W(this.options.children,(t,o)=>String(t.name??o),t=>f`${yp(t,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[ct.styles,x`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `],v([O(".selection>.select-value")],exports.AutoFieldCombine.prototype,"selection",2),exports.AutoFieldCombine=v([T("auto-field-combine")],exports.AutoFieldCombine);var td=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"];exports.AutoFieldIcons=class Je extends ct{constructor(){super(...arguments);this.multiple=false;this.active=false;this.selected=[];this.icons=[];}getInitialOptions(){return {icons:[],size:"24px",multiple:false,dropdown:false,builtIn:true}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&td.forEach(t=>{this.icons.includes(t)||this.icons.push(t);}),this.selected=Array.isArray(this.value)?this.value:this.value.split(",");}updateOptions(){super.updateOptions(),this.multiple=this.options.multiple||false,this.multiple||(this.options.dropdown=true);}updated(t){super.updated(t),t.has("value")&&this.value!==void 0&&(this.selected=Array.isArray(this.value)?[...this.value]:String(this.value).split(",")),this.multiple?this.style.width!=="100%"&&(this.style.width="100%"):this.style.width&&(this.style.width="");}renderView(){return this.renderIcons(this.selected)}_isSelected(t){return this.options.multiple?this.selected.includes(t):this.selected[0]===t}_onClickIcon(t){if(!this.context.viewonly)if(this.options.multiple){let o=this.selected.findIndex(i=>i===t);this.selected=o>-1?this.selected.filter(i=>i!==t):[...this.selected,t],this.onFieldInput();}else {this.selected=[t],this.onFieldInput();let o=this.shadowRoot?.querySelector("sl-dropdown");o&&typeof o.hide=="function"&&o.hide();}}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(t,o=true){return f`<div class="icons" style="font-size:${this.options.size}">
            ${W(t,i=>{if(i!=="")return f`<span class="icon ${o&&this._isSelected(i)?"selected":void 0}" title="${i}" @click=${()=>this._onClickIcon(i)}
                    ><sl-icon name="${i}" size="${this.options.size}"></sl-icon
                ></span>`})}
        </div>`}renderSelection(){return this.renderIcons(this.multiple?this.selected:this.selected.slice(0,1),false)}renderDropdown(){return this.renderIcons(this.icons)}};exports.AutoFieldIcons.styles=[I.styles,ct.styles,x`
            /* ============ 单选：收缩为单个图标 + 下拉箭头的宽度 ============ */
            :host(:not([multiple])) {
                width: fit-content;
                /* 基类宽度链逐层放开：.autofield{width:100%} → .content（块级默认满宽）
                   → .dropdown{flex-grow:1} → sl-dropdown{width:100%} */
                & > .autofield {
                    width: auto;
                    & > .value > .content {
                        /* fit-content：flex 父级（.value 是普通块、内容行由 .content 自身撑开）
                           下按内容收缩，与 host 的收缩联动 */
                        width: fit-content;
                        & > .dropdown {
                            flex-grow: 0;
                            & > sl-dropdown {
                                width: auto;
                            }
                        }
                    }
                }
                min-width: var(--auto-line-height);
                /* 下拉面板不跟随触发器收缩（对冲 sl-dropdown 的 sync=width） */
                .popoup-container {
                    min-width: 200px;
                }
            }
            /* ============ 多选：满宽展示 ============ */
            :host([multiple]) {
                width: 100%;
            }
            /* 平铺模式下为图标容器提供输入框外观（.icons 不是 sl-dropdown 直接子元素，选择器须从容器向下到达） */
            .content > .dropdown > sl-dropdown > .icons,
            :host([dropdown]) .popoup-container:not(.dropdown) > .icons {
                padding: 0.5em;
                box-sizing: border-box;
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
            }
            sl-icon::part(svg) {
                stroke-width: 1.1;
            }
            .icons {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5em;
                & > .icon {
                    cursor: pointer;
                    display: inline-flex;
                    &:hover {
                        color: var(--auto-theme-color);
                    }
                    &.selected {
                        color: var(--auto-theme-color);
                    }
                }
            }
            .popoup-container {
                padding: 1em;
            }
        `],v([h({type:Boolean,reflect:true})],exports.AutoFieldIcons.prototype,"multiple",2),v([$()],exports.AutoFieldIcons.prototype,"active",2),v([$()],exports.AutoFieldIcons.prototype,"selected",2),exports.AutoFieldIcons=v([T("auto-field-icons")],exports.AutoFieldIcons);var xp=x`
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
`;var _p=x`
  :host {
    display: contents;
  }
`;var oi=class extends z{constructor(){super(...arguments),this.observedElements=[],this.disabled=false;}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit("sl-resize",{detail:{entries:e}});}),this.disabled||this.startObserver();}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver();}handleSlotChange(){this.disabled||this.startObserver();}startObserver(){let e=this.shadowRoot.querySelector("slot");if(e!==null){let r=e.assignedElements({flatten:true});this.observedElements.forEach(t=>this.resizeObserver.unobserve(t)),this.observedElements=[],r.forEach(t=>{this.resizeObserver.observe(t),this.observedElements.push(t);});}}stopObserver(){this.resizeObserver.disconnect();}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver();}render(){return f` <slot @slotchange=${this.handleSlotChange}></slot> `}};oi.styles=[L,_p];p([h({type:Boolean,reflect:true})],oi.prototype,"disabled",2);p([R("disabled",{waitUntilFirstUpdate:true})],oi.prototype,"handleDisabledChange",1);var _t=class extends z{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new G(this),this.hasScrollControls=false,this.shouldHideScrollStartButton=false,this.shouldHideScrollEndButton=false,this.placement="top",this.activation="auto",this.noScrollControls=false,this.fixedScrollControls=false,this.scrollOffset=1;}connectedCallback(){let e=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls();}),this.mutationObserver=new MutationObserver(r=>{let t=r.filter(({target:o})=>{if(o===this)return  true;if(o.closest("sl-tab-group")!==this)return  false;let i=o.tagName.toLowerCase();return i==="sl-tab"||i==="sl-tab-panel"});if(t.length!==0){if(t.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels()),t.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(t.some(o=>o.attributeName==="active")){let i=t.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="sl-tab").map(s=>s.target).find(s=>s.active);i&&this.setActiveTab(i);}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:true,attributeFilter:["active","disabled","name","panel"],childList:true,subtree:true}),this.resizeObserver.observe(this.nav),e.then(()=>{new IntersectionObserver((t,o)=>{var i;t[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((i=this.getActiveTab())!=null?i:this.tabs[0],{emitEvents:false}),o.unobserve(t[0].target));}).observe(this.tabGroup);});});}disconnectedCallback(){var e,r;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect(),this.nav&&((r=this.resizeObserver)==null||r.unobserve(this.nav));}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return [...this.body.assignedElements()].filter(e=>e.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){let t=e.target.closest("sl-tab");t?.closest("sl-tab-group")===this&&t!==null&&this.setActiveTab(t,{scrollBehavior:"smooth"});}handleKeyDown(e){let t=e.target.closest("sl-tab");if(t?.closest("sl-tab-group")===this&&(["Enter"," "].includes(e.key)&&t!==null&&(this.setActiveTab(t,{scrollBehavior:"smooth"}),e.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))){let i=this.tabs.find(a=>a.matches(":focus")),s=this.localize.dir()==="rtl",n=null;if(i?.tagName.toLowerCase()==="sl-tab"){if(e.key==="Home")n=this.focusableTabs[0];else if(e.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&e.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&e.key==="ArrowUp"){let a=this.tabs.findIndex(l=>l===i);n=this.findNextFocusableTab(a,"backward");}else if(["top","bottom"].includes(this.placement)&&e.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&e.key==="ArrowDown"){let a=this.tabs.findIndex(l=>l===i);n=this.findNextFocusableTab(a,"forward");}if(!n)return;n.tabIndex=0,n.focus({preventScroll:true}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(a=>{a.tabIndex=a===n?0:-1;}),["top","bottom"].includes(this.placement)&&Ho(n,this.nav,"horizontal"),e.preventDefault();}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"});}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"});}setActiveTab(e,r){if(r=Ot({emitEvents:true,scrollBehavior:"auto"},r),e!==this.activeTab&&!e.disabled){let t=this.activeTab;this.activeTab=e,this.tabs.forEach(o=>{o.active=o===this.activeTab,o.tabIndex=o===this.activeTab?0:-1;}),this.panels.forEach(o=>{var i;return o.active=o.name===((i=this.activeTab)==null?void 0:i.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Ho(this.activeTab,this.nav,"horizontal",r.scrollBehavior),r.emitEvents&&(t&&this.emit("sl-tab-hide",{detail:{name:t.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}));}}setAriaLabels(){this.tabs.forEach(e=>{let r=this.panels.find(t=>t.name===e.panel);r&&(e.setAttribute("aria-controls",r.getAttribute("id")),r.setAttribute("aria-labelledby",e.getAttribute("id")));});}repositionIndicator(){let e=this.getActiveTab();if(!e)return;let r=e.clientWidth,t=e.clientHeight,o=this.localize.dir()==="rtl",i=this.getAllTabs(),n=i.slice(0,i.indexOf(e)).reduce((a,l)=>({left:a.left+l.clientWidth,top:a.top+l.clientHeight}),{left:0,top:0});switch(this.placement){case "top":case "bottom":this.indicator.style.width=`${r}px`,this.indicator.style.height="auto",this.indicator.style.translate=o?`${ -1*n.left}px`:`${n.left}px`;break;case "start":case "end":this.indicator.style.width="auto",this.indicator.style.height=`${t}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls());}findNextFocusableTab(e,r){let t=null,o=r==="forward"?1:-1,i=e+o;for(;e<this.tabs.length;){if(t=this.tabs[i]||null,t===null){r==="forward"?t=this.focusableTabs[0]:t=this.focusableTabs[this.focusableTabs.length-1];break}if(!t.disabled)break;i+=o;}return t}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd());}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=false:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons();}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none";}show(e){let r=this.tabs.find(t=>t.panel===e);r&&this.setActiveTab(r,{scrollBehavior:"smooth"});}render(){let e=this.localize.dir()==="rtl";return f`
      <div
        part="base"
        class=${M({"tab-group":true,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?f`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${M({"tab-group__scroll-button":true,"tab-group__scroll-button--start":true,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${e?"chevron-right":"chevron-left"}
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

          ${this.hasScrollControls?f`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${M({"tab-group__scroll-button":true,"tab-group__scroll-button--end":true,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${e?"chevron-left":"chevron-right"}
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
    `}};_t.styles=[L,xp];_t.dependencies={"sl-icon-button":mt,"sl-resize-observer":oi};p([O(".tab-group")],_t.prototype,"tabGroup",2);p([O(".tab-group__body")],_t.prototype,"body",2);p([O(".tab-group__nav")],_t.prototype,"nav",2);p([O(".tab-group__indicator")],_t.prototype,"indicator",2);p([$()],_t.prototype,"hasScrollControls",2);p([$()],_t.prototype,"shouldHideScrollStartButton",2);p([$()],_t.prototype,"shouldHideScrollEndButton",2);p([h()],_t.prototype,"placement",2);p([h()],_t.prototype,"activation",2);p([h({attribute:"no-scroll-controls",type:Boolean})],_t.prototype,"noScrollControls",2);p([h({attribute:"fixed-scroll-controls",type:Boolean})],_t.prototype,"fixedScrollControls",2);p([ze({passive:true})],_t.prototype,"updateScrollButtons",1);p([R("noScrollControls",{waitUntilFirstUpdate:true})],_t.prototype,"updateScrollControls",1);p([R("placement",{waitUntilFirstUpdate:true})],_t.prototype,"syncIndicator",1);_t.define("sl-tab-group");var ed=(e,r)=>{let t=0;return function(...o){window.clearTimeout(t),t=window.setTimeout(()=>{e.call(this,...o);},r);}},wp=(e,r,t)=>{let o=e[r];e[r]=function(...i){o.call(this,...i),t.call(this,o,...i);};};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){let r=new Set,t=new WeakMap,o=s=>{for(let n of s.changedTouches)r.add(n.identifier);},i=s=>{for(let n of s.changedTouches)r.delete(n.identifier);};document.addEventListener("touchstart",o,true),document.addEventListener("touchend",i,true),document.addEventListener("touchcancel",i,true),wp(EventTarget.prototype,"addEventListener",function(s,n){if(n!=="scrollend")return;let a=ed(()=>{r.size?a():this.dispatchEvent(new Event("scrollend"));},100);s.call(this,"scroll",a,{passive:true}),t.set(this,a);}),wp(EventTarget.prototype,"removeEventListener",function(s,n){if(n!=="scrollend")return;let a=t.get(this);a&&s.call(this,"scroll",a,{passive:true});});}})();var Sp=x`
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
`;var rd=0,oe=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.attrId=++rd,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=false,this.closable=false,this.disabled=false,this.tabIndex=0;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab");}handleCloseClick(e){e.stopPropagation(),this.emit("sl-close");}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0;}render(){return this.id=this.id.length>0?this.id:this.componentId,f`
      <div
        part="base"
        class=${M({tab:true,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?f`
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
    `}};oe.styles=[L,Sp];oe.dependencies={"sl-icon-button":mt};p([O(".tab")],oe.prototype,"tab",2);p([h({reflect:true})],oe.prototype,"panel",2);p([h({type:Boolean,reflect:true})],oe.prototype,"active",2);p([h({type:Boolean,reflect:true})],oe.prototype,"closable",2);p([h({type:Boolean,reflect:true})],oe.prototype,"disabled",2);p([h({type:Number,reflect:true})],oe.prototype,"tabIndex",2);p([R("active")],oe.prototype,"handleActiveChange",1);p([R("disabled")],oe.prototype,"handleDisabledChange",1);oe.define("sl-tab");var kp=x`
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
`;var od=0,oo=class extends z{constructor(){super(...arguments),this.attrId=++od,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=false;}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel");}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true");}render(){return f`
      <slot
        part="base"
        class=${M({"tab-panel":true,"tab-panel--active":this.active})}
      ></slot>
    `}};oo.styles=[L,kp];p([h({reflect:true})],oo.prototype,"name",2);p([h({type:Boolean,reflect:true})],oo.prototype,"active",2);p([R("active")],oo.prototype,"handleActiveChange",1);oo.define("sl-tab-panel");J.define("sl-button");H.define("sl-input");var Qe={second:{min:0,max:59},minute:{min:0,max:59},hour:{min:0,max:23},day:{min:1,max:31},month:{min:1,max:12},week:{min:1,max:7},year:{min:1970,max:9999}},zs=["second","minute","hour","day","month","week","year"],Cp=["year","month","week","day","hour","minute","second"];function id(e,r){let t=Qe[r];if(e==="*")return {pattern:"any"};let o=e.match(/^(\*|\d+)\/(\d+)$/);if(o){let i=o[1]==="*"?t.min:r==="week"&&Number(o[1])===0?7:Number(o[1]),s=Number(o[2]);return i<t.min||i>t.max||s<1||s>t.max?{pattern:"any",advanced:e}:{pattern:"interval",start:i,step:s}}if(/^\d+(-\d+)?(,\d+(-\d+)?)*$/.test(e)){let i=[];for(let s of e.split(",")){let n=s.match(/^(\d+)-(\d+)$/);if(n){let a=Number(n[1]),l=r==="week"&&Number(n[2])===7?7:Number(n[2]);if(a<t.min||l>t.max||a>l)return {pattern:"any",advanced:e};for(let c=a;c<=l;c++)i.includes(c)||i.push(c);}else {let a=r==="week"&&Number(s)===0?7:Number(s);if(a<t.min||a>t.max)return {pattern:"any",advanced:e};i.includes(a)||i.push(a);}}return i.sort((s,n)=>s-n),{pattern:"pick",picks:i}}return {pattern:"any",advanced:e}}function wr(e,r=false){let t={valid:false,raw:e};if(typeof e!="string"||e.trim()==="")return t;let o=e.trim().split(/\s+/),i=r?7:6;if(o.length!==i)return t;let s=r?zs:zs.filter(n=>n!=="second");for(let n=0;n<s.length;n++)t[s[n]]=id(o[n],s[n]);return t.valid=true,t}function $p(e){let r=e.slice().sort((s,n)=>s-n);if(r.length===0)return "";let t=[],o=r[0],i=r[0];for(let s=1;s<=r.length;s++){let n=r[s];n!==i+1&&(t.push(o===i?`${o}`:`${o}-${i}`),o=n),i=n;}return t.join(",")}function sd(e,r){if(!r||r.pattern==="any")return r?.advanced??"*";if(r.pattern==="interval"){let t=Qe[e],o=r.start??t.min;return o===t.min?`*/${r.step}`:`${o}/${r.step}`}return $p(r.picks??[])||"*"}function nd(e,r=false){return (r?zs:zs.filter(o=>o!=="second")).map(o=>sd(o,e[o])).join(" ")}var Gn={year:"\u5E74",month:"\u6708",week:"\u5468",day:"\u65E5",hour:"\u5C0F\u65F6",minute:"\u5206\u949F",second:"\u79D2",patternAny:"\u4E0D\u9650",patternInterval:"\u95F4\u9694\u5468\u671F",patternPick:"\u6307\u5B9A",intervalEvery:"\u6BCF{interval}",intervalFrom:"\u4ECE{start}\u5F00\u59CB",intervalUnit:"",fromPrefix:"\u4ECE",fromSuffix:"\u5F00\u59CB",stepLabel:"\u6B65\u957F",intervalSuffix:"{field}\uFF08\u6B65\u957F\uFF09",intervalPreviewEvery:"\u6BCF{field} {values}",pickAll:"\u5168\u9009",pickInvert:"\u53CD\u9009",pickClear:"\u6E05\u7A7A",pickInputHint:"\u5982 1,1-2,33,22",weekNames:["\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D","\u5468\u65E5"],descSecond:"{value}\u79D2",descMinute:"{value}\u5206",descHour:"{value}\u70B9",descDay:"{value}\u65E5",descMonth:"{value}\u6708",descWeek:"\u5468{value}",descYear:"{value}\u5E74",descEveryField:"\u6BCF{value}",descJoin:"\u3001",descRange:"{from}-{to}",descEveryMinute:"\u6BCF\u5206\u949F",descEverySecond:"\u6BCF\u79D2",placeholder:"\u8BF7\u9009\u62E9\u6267\u884C\u5468\u671F",unparseable:"\u8868\u8FBE\u5F0F\u65E0\u6CD5\u89E3\u6790",advanced:"\u9AD8\u7EA7\u8BED\u6CD5\uFF08\u672A\u53EF\u89C6\u5316\uFF09\uFF1A{value}",resetToStart:"\u5F53\u524D\u503C\u65E0\u6CD5\u89E3\u6790\uFF0C\u7F16\u8F91\u5C06\u4ECE\u9ED8\u8BA4\u5F00\u59CB"};function Ap(e,r=false,t){let o={...Gn,...t},i=typeof e=="string"?wr(e,r):e;if(!i.valid)return typeof e=="string"?e:i.raw??"";let s=[],n=(c,d,u)=>{let m=i[c];if(!m||m.pattern==="any")return;let g=o[c];if(m.pattern==="interval"){let b=m.step??1,y=o.intervalUnit.params({field:g}),C=o.descEveryField.params({value:`${b>1?b:""}${g}${y}`}),S=m.start===void 0||m.start===Qe[c].min;s.push(S?C:`${C}${o.intervalFrom.params({start:m.start})}`);return}if(m.pattern==="pick"&&m.picks?.length){if(u){s.push(m.picks.map(E=>u(E)).join(o.descJoin));return}let b=m.picks.slice().sort((E,_)=>E-_),y=[],C=b[0],S=b[0],w=E=>{y.push(E===C?o[d].params({value:C}):o.descRange.params({from:C,to:E})+o[d].params({value:""}));};for(let E=1;E<b.length;E++)b[E]!==S+1&&(w(S),C=b[E]),S=b[E];w(S),s.push(y.join(o.descJoin));}},a=i.second,l=a?.pattern==="pick"&&a.picks?.length===1&&a.picks[0]===0;return n("year","descYear"),n("month","descMonth"),n("week","descWeek",c=>o.weekNames[c-1]),n("day","descDay"),n("hour","descHour"),n("minute","descMinute"),r&&l||n("second","descSecond"),s.length===0?r?o.descEverySecond:o.descEveryMinute:s.join(o.descJoin)}exports.AutoFieldCron=class io extends ct{constructor(){super(...arguments);this._editing=null;this._pickTexts={};this._dragging=false;this._dragSelect=true;}getInitialOptions(){let t=new Date;return {...super.getInitialOptions(),enableSeconds:false,showYear:false,yearRange:[t.getFullYear(),t.getFullYear()+10],stepOptions:{},defaultCron:void 0,placeholder:Gn.placeholder,panelMinWidth:620,i18n:{}}}get texts(){return {...Gn,...this.options.i18n}}connectedCallback(){if(super.connectedCallback(),this._isEmpty()&&this.options.defaultCron){let t=wr(this.options.defaultCron,this.options.enableSeconds);t.valid&&this._commit(t);}}get _expr(){return this._editing?this._editing:wr(this.value??"",this.options.enableSeconds)}_isEmpty(){return !this.value||typeof this.value=="string"&&this.value.trim()===""}getInputValue(){let t=this._expr;return !this.options.showYear&&t.valid&&(t.year={pattern:"any"}),nd(t,this.options.enableSeconds)}_commit(t){this._editing=t,this.onFieldChange();}_ensureEditing(){if(!this._editing){let t=wr(this.value??"",this.options.enableSeconds);this._editing=t.valid?t:{valid:true,...Cp.reduce((o,i)=>({...o,[i]:{pattern:"any"}}),{})};}return this._editing}_setField(t,o){let i=this._ensureEditing();this._commit({...i,[t]:o});}renderSelection(){return this._isEmpty()?f``:wr(this.value,this.options.enableSeconds).valid?f`<span class="trigger-expr">${this.value}</span>`:f`<span class="trigger-desc">${this.value}</span
                ><span class="trigger-warn" title="${this.texts.unparseable}">⚠</span>`}renderView(){if(this._isEmpty())return f``;let t=wr(this.value,this.options.enableSeconds);return t.valid?f`<div>
                ${Ap(t,this.options.enableSeconds,this.options.i18n)}
            </div>
            <div class="trigger-expr">${this.value}</div>`:f`${this.value}`}renderDropdown(){let t=Cp.filter(s=>(s!=="second"||this.options.enableSeconds)&&(s!=="year"||this.options.showYear)),o=this._ensureEditing(),i=!this._isEmpty()&&!wr(this.value,this.options.enableSeconds).valid;return f`<div class="cron-panel" style="min-width:${this.options.panelMinWidth}px">
            ${F(i,()=>f`<div class="reset-banner">${this.texts.resetToStart}</div>`)}
            <div class="cron-desc">
                ${Ap(o,this.options.enableSeconds,this.options.i18n)}
            </div>
            <div class="cron-body">
                <sl-tab-group placement="start" class="cron-tabs cron-tab-group">
                    ${W(t,s=>`tab-${s}`,s=>f`<sl-tab slot="nav" panel="${s}">${this.texts[s]}</sl-tab>`)}
                    ${W(t,s=>`panel-${s}`,s=>f`<sl-tab-panel name="${s}"
                                ><div class="cron-editor">
                                    ${this._renderFieldEditor(s,o)}
                                </div></sl-tab-panel
                            >`)}
                </sl-tab-group>
            </div>
        </div>`}_renderFieldEditor(t,o){let i=o[t],s=i?.pattern??"any",n=Qe[t],a=t!=="year";return f`<div class="pattern-row">
                <sl-radio-group
                    size="small"
                    .value=${s}
                    @sl-change=${l=>{let c=l.target.value;delete this._pickTexts[t],c==="any"?this._setField(t,{pattern:"any"}):c==="interval"?this._setField(t,{pattern:"interval",start:n.min,step:this._steps(t)[0]}):this._setField(t,{pattern:"pick",picks:[n.min]});}}
                >
                    <sl-radio value="any">${this.texts.patternAny}</sl-radio>
                    ${F(a,()=>f`<sl-radio value="interval"
                                >${this.texts.patternInterval}</sl-radio
                            >`)}
                    ${F(s==="interval"&&a&&i,()=>f`<div class="interval-slot">
                                ${this._renderInterval(t,i)}
                            </div>`,()=>q)}
                    <sl-radio value="pick">${this.texts.patternPick}</sl-radio>
                </sl-radio-group>
            </div>
            ${F(i?.advanced,()=>f`<div class="advanced-tip">
                        ${this.texts.advanced.params({value:i.advanced})}
                    </div>`)}
            ${F(s==="pick"&&i,()=>this._renderPick(t,i),()=>q)}`}_steps(t){return this.options.stepOptions?.[t]??this._range(1,Qe[t].max)}_renderInterval(t,o){let i=Qe[t],s=this._steps(t),n=this._range(i.min,i.max),a=o.start??i.min,l=o.step??s[0],c=this.texts[t],d=this._expandInterval(t,o),u=t==="week"?"":c,m=d.map(g=>t==="week"?this.texts.weekNames[g-1]:String(g)).join(this.texts.descJoin);return f`<div class="interval-row">
                <span class="label">${this.texts.fromPrefix}</span>
                <sl-select
                    size="small"
                    hoist
                    .value=${String(a)}
                    @sl-change=${g=>{g.stopPropagation(),this._setField(t,{pattern:"interval",start:Number(g.target.value),step:o.step??s[0]});}}
                >
                    ${W(n,g=>f`<sl-option value="${g}">${g}</sl-option>`)}
                </sl-select>
                <span class="label">${this.texts.fromSuffix}，</span>
                <span class="label">${this.texts.intervalEvery.params({field:c})}</span>
                <sl-select
                    size="small"
                    hoist
                    .value=${String(l)}
                    @sl-change=${g=>{g.stopPropagation(),this._setField(t,{pattern:"interval",start:o.start??i.min,step:Number(g.target.value)});}}
                >
                    ${W(s,g=>f`<sl-option value="${g}">${g}</sl-option>`)}
                </sl-select>
                <span class="label">${this.texts.intervalSuffix.params({field:u})}</span>
            </div>
            <div class="interval-preview">
                ${this.texts.intervalPreviewEvery.params({field:c,values:m})}
            </div>`}_expandInterval(t,o){let[i,s]=this._pickBounds(t),n=o.start??i,a=o.step??1,l=[];for(let c=n;c<=s;c+=a)l.push(c);return l}_renderPickGrid(t,o){let[i,s]=this._pickBounds(t),n=s>24;return W(this._range(i,s),a=>a,a=>f`<sl-button
                    size="small"
                    class="${t==="week"?"week":n?"compact":""}"
                    variant="${o.includes(a)?"primary":"default"}"
                    pill
                    @mousedown=${l=>{l.preventDefault(),this._dragging=true,this._dragSelect=!o.includes(a),this._togglePick(t,a,this._dragSelect);}}
                    @mouseenter=${()=>{this._dragging&&this._togglePick(t,a,this._dragSelect);}}
                    >${this._pickLabel(t,a)}</sl-button
                >`)}_renderPick(t,o){let[i,s]=this._pickBounds(t),n=o.picks??[],a=this._pickTexts[t]??$p(n),l=s-i+1<=31;return f`<div class="pick-input-row">
                <sl-input
                    size="small"
                    .value=${a}
                    placeholder="${this.texts.pickInputHint}"
                    @sl-change=${c=>{c.stopPropagation(),this._parsePickInput(t,c.target.value);}}
                    @sl-input=${c=>{c.stopPropagation(),this._parsePickInput(t,c.target.value);}}
                ></sl-input>
            </div>
            ${F(l,()=>f`<div
                        class="pick-grid"
                        @mouseup=${()=>this._dragging=false}
                        @mouseleave=${()=>this._dragging=false}
                    >
                        ${this._renderPickGrid(t,n)}
                    </div>
                    <div class="pick-toolbar">
                        <sl-button
                            size="small"
                            @click=${()=>{delete this._pickTexts[t],this._setField(t,{pattern:"pick",picks:this._range(i,s)});}}
                            >${this.texts.pickAll}</sl-button
                        >
                        <sl-button
                            size="small"
                            @click=${()=>{delete this._pickTexts[t],this._pickInvert(t,i,s);}}
                            >${this.texts.pickInvert}</sl-button
                        >
                        <sl-button
                            size="small"
                            @click=${()=>{delete this._pickTexts[t],this._setField(t,{pattern:"any"});}}
                            >${this.texts.pickClear}</sl-button
                        >
                    </div>`)}`}_parsePickInput(t,o){let i=Qe[t],s=o.trim();if(this._pickTexts[t]=o,s===""){delete this._pickTexts[t],this._setField(t,{pattern:"any"});return}let n=new Set;for(let a of s.split(/[,，]/)){let l=a.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);if(!l)return;let c=t==="week"&&Number(l[1])===0?7:Number(l[1]);if(l[2]===void 0){if(c<i.min||c>i.max)return;n.add(c);}else {let d=t==="week"&&Number(l[2])===0?7:Number(l[2]);if(c<i.min||d>i.max||c>d)return;for(let u=c;u<=d;u++)n.add(u);}}this._setField(t,{pattern:"pick",picks:[...n].sort((a,l)=>a-l)});}_pickBounds(t){if(t==="year")return this.options.yearRange;let o=Qe[t];return [o.min,o.max]}_pickLabel(t,o){return t==="week"?this.texts.weekNames[o-1]:String(o)}_togglePick(t,o,i){delete this._pickTexts[t];let n=(this._ensureEditing()[t]??{picks:[]}).picks??[];if(i?n.includes(o)||(n=[...n,o]):n=n.filter(a=>a!==o),n.length===0){this._setField(t,{pattern:"any"});return}this._setField(t,{pattern:"pick",picks:n});}_pickInvert(t,o,i){let s=this._range(o,i),n=this._ensureEditing()[t]?.picks??[],a=s.filter(l=>!n.includes(l));if(a.length===0){this._setField(t,{pattern:"any"});return}this._setField(t,{pattern:"pick",picks:a});}_range(t,o){let i=[];for(let s=t;s<=o;s++)i.push(s);return i}};exports.AutoFieldCron.styles=[I.styles,ct.styles,x`
            :host {
                display: block;
            }
            /* 面板高度自动：由内容（编辑区）决定，上限约束在可视区内 */
            .cron-panel {
                display: flex;
                flex-direction: column;
                max-height: min(380px, 80vh);
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
                box-sizing: border-box;
                overflow: hidden;
            }
            .cron-body {
                flex: 1 1 auto;
                min-height: 0;
                display: flex;
                overflow: hidden;
            }
            /* tab-group 充满 .cron-body（shoelace :host 默认 display:block，不参与拉伸） */
            .cron-tab-group {
                flex: 1 1 auto;
                min-width: 0;
                display: flex;
                flex-direction: column;
            }
            /* base=横向布局根：nav 列固定内容宽，body(panel) 占满剩余空间 */
            .cron-tab-group::part(base) {
                display: flex;
                flex-direction: row;
                align-items: stretch;
                min-height: 0;
                border-right: var(--auto-border);
            }
            /* nav 两侧默认 x-large 留白会撑宽 tab 列，收敛为小间距 */
            .cron-tab-group::part(nav) {
                flex: 0 0 auto;
                padding: 0 var(--sl-spacing-small);
            }
            /* tab 固定宽度：内容自适应 + 统一最小宽，不随容器拉伸 */
            .cron-tabs sl-tab {
                flex: 0 0 auto;
                min-width: 5em;
                font-size: var(--auto-font-size);
            }
            .cron-tabs sl-tab::part(base) {
                justify-content: center;
            }
            /* body 是 tab-panel 的直接父级，占满剩余宽度与高度 */
            .cron-tab-group::part(body) {
                flex: 1 1 auto;
                min-width: 0;
                min-height: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            /* 不能对 sl-tab-panel 设 display：shoelace 依赖 :host{display:none}/:host([active]){display:block}
               控制显隐，外部 display:flex 会覆盖 none 导致所有 panel 恒显、切换失效。
               高度 100% 只能借 host 自身选择器设 height（不触碰 display），
               flex 拉伸对 block host 无效；内部布局在 ::part(base) 上展开。 */
            .cron-body sl-tab-panel {
                height: 100%;
                min-height: 0;
            }
            .cron-body sl-tab-panel::part(base) {
                display: flex;
                flex-direction: column;
                height: 100%;
                min-height: 0;
                box-sizing: border-box;
            }
            .cron-tabs sl-tab {
                font-size: var(--auto-font-size);
            }
            /* 面板内容容器：gap + 自动换行；按钮网格自适应换行填满面板，不出滚动条 */
            .cron-editor {
                flex: 1 1 auto;
                width: 100%;
                box-sizing: border-box;
                padding: 0.8em;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: stretch;
                gap: 0.8em;
            }
            .pattern-row sl-radio-group {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5em;
            }
            /* 间隔配置从属于「间隔」radio：缩进对齐 radio 文案，与后续 radio 同列 */
            .interval-slot {
                padding-left: calc(var(--sl-toggle-size-small) + 0.5em);
            }
            .interval-row {
                display: flex;
                align-items: center;
                gap: 0.5em;
                flex-wrap: wrap;
                max-width: 100%;
                padding-top: 1em;
                padding-bottom: 0.2em;
            }
            .interval-row .label {
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
            }
            /* 间隔模式预览：灰色小字两行（配置句 + 命中值展开） */
            .interval-preview {
                display: flex;
                flex-direction: column;
                gap: 0.15em;
                font-size: calc(0.8 * var(--auto-font-size));
                color: var(--auto-border-color);
                line-height: 1.5;
            }
            /* 下拉宽度由内容决定：外部 width:auto 无效，因内部 display input 有默认内在宽度（约 20 字符）。
               间隔值最多两位数字（年无间隔模式），按 ch 收缩 input 即可让整体贴合内容 */
            .interval-row sl-select {
                flex: 0 0 auto;
                width: auto;
                min-width: 0;
            }
            .interval-row sl-select::part(display-input) {
                width: 2.5ch;
            }
            /* 间隔下拉的弹出层：面板是 overflow:hidden 的固定高容器（380px），select 处于面板下部时
               floating-ui flip 会把 listbox 翻到上方并按剩余可视高度压缩（auto-size vertical），
               表现为「向上弹 + 只有一行」。hoist 属性让 popup 以 fixed 定位逃出裁剪容器，
               再用 max-height 放开高度限制（listbox 自身 overflow:auto 会出滚动条）。 */
            .interval-row sl-select::part(listbox) {
                max-height: 16em;
            }
            .pick-toolbar {
                display: flex;
                flex-wrap: wrap;
                gap: 0.4em;
            }
            .pick-toolbar sl-button::part(base) {
                font-size: calc(0.85 * var(--auto-font-size));
            }
            .pick-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.3em;
                width: 100%;
            }
            /* 间隔模式的覆盖范围网格：只读高亮（用户已移除该预览，样式保留以防回退） */
            .pick-grid.readonly {
                pointer-events: none;
            }
            /* 指定模式输入框：占位提示即格式说明 */
            .pick-input-row {
                width: 100%;
            }
            .pick-input-row sl-input {
                width: 100%;
                font-family: var(--sl-font-mono);
            }
            .pick-grid sl-button {
                margin: 0;
            }
            .pick-grid sl-button::part(base) {
                font-size: calc(0.85 * var(--auto-font-size));
                padding-left: 0.4em;
                padding-right: 0.4em;
            }
            .pick-grid sl-button.week::part(base) {
                font-size: calc(0.95 * var(--auto-font-size));
            }
            .advanced-tip {
                font-size: calc(0.85 * var(--auto-font-size));
                color: var(--sl-color-warning-600);
            }
            .advanced-tip::before {
                content: "⚠ ";
            }
            .reset-banner {
                padding: 0.4em 0.8em;
                font-size: calc(0.85 * var(--auto-font-size));
                color: var(--sl-color-warning-600);
                background-color: var(--sl-color-warning-100);
            }
            .reset-banner::before {
                content: "⚠ ";
            }
            /* 面板顶部：cron 友好描述（编辑即时更新） */
            .cron-desc {
                padding: 0.5em;
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
                border-bottom: var(--auto-border);
                flex-shrink: 0;
            }
            .trigger-desc {
                flex: 1;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .trigger-expr {
                font-size: calc(0.8 * var(--auto-font-size));
                color: var(--auto-border-color);
                font-family: var(--sl-font-mono);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .trigger-warn {
                color: var(--sl-color-warning-600);
                margin-left: 0.3em;
            }
        `],v([$()],exports.AutoFieldCron.prototype,"_editing",2),exports.AutoFieldCron=v([T("auto-field-cron")],exports.AutoFieldCron);exports.AutoFieldCascader=class ve extends ct{constructor(){super(...arguments);this.active=false;this.data={};this.level=3;this.selected=[];this.focusItems=[];}getInitialOptions(){return Object.assign(super.getInitialOptions(),{idKey:"id",rootKey:"$root",labelKey:"label",maxLevel:3,childrenKey:"children",choices:{}})}getFieldOptions(){let t=super.getFieldOptions();return t.valueKey||(t.valueKey=t.idKey),t.idKey||(t.idKey=t.labelKey),t}_registerChildren(t,o){t.forEach(i=>{let s=i[this.options.childrenKey||"children"];Array.isArray(s)&&s.length>0&&o<this.options.maxLevel&&this._registerChildren(s,o+1);}),this._normalizeLevel(t,o);}_normalizeLevel(t,o){t.forEach(i=>{let s=i[this.options.idKey];if(s==null)return;let n=i[this.options.childrenKey||"children"];Array.isArray(n)&&n.length>0&&o<this.options.maxLevel?this.data[s]=n:this.data[s]=[];});}connectedCallback(){super.connectedCallback(),this._initChoices(),this.selected=this._parseValues(this.value),this.focusItems=Array.from({length:this.options.maxLevel-1}).fill(null);}_initChoices(){let t=this.options.choices;if(typeof t=="function"){this._applyAsyncChoices(t());return}if(t&&typeof t.then=="function"){this._applyAsyncChoices(t);return}let o=typeof t=="object"&&t!==null&&this.options.childrenKey in t;o&&(this.options.rootKey=t[this.options.idKey]),this.data=o||Array.isArray(t)?this._normalizeData(t):{};}_applyAsyncChoices(t){this.data={},t&&typeof t.then=="function"?t.then(o=>{Array.isArray(o)&&o.length>0&&(this.data=this._normalizeData(o),this._markRootLazy(),this.requestUpdate());}):Array.isArray(t)&&(this.data=this._normalizeData(t),this._markRootLazy());}_markRootLazy(){typeof this.options.onLoad=="function"&&(this.data[this.options.rootKey]||[]).forEach(t=>{t.lazy===void 0&&!this._hasRegisteredChildren(t)&&(t.lazy="idle");});}_normalizeData(t){let o={},i=(s,n=false)=>{let a=s[this.options.idKey]||(n?"$root":void 0);if(!a)return;let l=s[this.options.childrenKey||"children"];l&&Array.isArray(l)&&l.length>0?(o[a]=l,l.forEach(c=>{i(c);})):o[a]=[];};return Array.isArray(t)?o.$root=t.reduce((s,n)=>(s.push(n),i(n),s),[]):i(t,true),o}_clearFocusItems(t){for(let o=t;o<=this.options.maxLevel;o++)Array.from(this.shadow.querySelectorAll(`[data-level='${o}']`)).forEach(s=>{s.classList.remove("focused");});}_onSelectItem(t){let o=t.detail.item,i=Number(o.dataset.level);if(i!==this.options.maxLevel)return;let s=[...this.focusItems.slice(0,i-1),o.dataset.id],n=[],a=(c,d)=>{let u=this.data[d].findIndex(m=>String(m[this.options.idKey])===String(c));if(u>-1)return [this.data[d][u][this.options.labelKey],this.data[d][u][this.options.valueKey]]},l=this.options.rootKey;for(let c=0;c<s.length;c++){let d=s[c],u=a(d,l);if(!u)return;n.push([d,...u]),l=d;}this.selected=n,this.onFieldChange();}_getSelectedValue(t){let o=[],i=(n,a)=>{let l=this.data[a].findIndex(c=>String(c[this.options.idKey])===String(n));if(l>-1)return this.data[a][l][this.options.valueKey]},s=this.options.rootKey;for(let n=0;n<t.length;n++){let a=t[n],l=i(a,s);if(!l)return;o.push(l),s=a;}return o}getInputValue(){let t=this.selected.map(o=>o[2]);return typeof this.value=="string"?t.join(this.options.delimiter||""):t}async _loadItem(t,o){let i=this._findItemById(t);if(i){if(Array.isArray(this.data[t])&&this.data[t].length>0){i.lazy="done",this.requestUpdate();return}if(typeof this.options.onLoad!="function"){i.lazy="done",this.requestUpdate();return}i.lazy="loading",this.requestUpdate();try{let s=await this.options.onLoad(t);Array.isArray(s)&&(this.data[t]=s,this._registerChildren(s,o),s.forEach(n=>{n.lazy===void 0&&o<this.options.maxLevel-1&&!this._hasRegisteredChildren(n)&&(n.lazy="idle");})),i.lazy="done";}catch{i.lazy="idle";}finally{this.requestUpdate();}}}_findItemById(t){for(let o of Object.values(this.data)){let i=o?.find(s=>String(s[this.options.idKey])===String(t));if(i)return i}}_hasRegisteredChildren(t){let o=t[this.options.childrenKey||"children"];return Array.isArray(o)&&o.length>0}_onItemMouseOverr(t){let o=t.target,i=o.dataset.id,s=Number(o.dataset.level);if(this.focusItems[s-1]===i)return;this._clearFocusItems(s),o.classList.add("focused"),this._findItemById(i)?.lazy==="idle"&&this._loadItem(i,s),this.focusItems[s-1]=i,this.focusItems.forEach((a,l)=>{l>s-1&&(this.focusItems[l]=null);}),this.focusItems=[...this.focusItems];}_renderLevel(t,o=1,i){if(t)return f`<sl-menu class="level" @sl-select=${o===this.options.maxLevel?this._onSelectItem.bind(this):null}>
            ${W(t,s=>{let n=this.selected[o-1]?.[0]===s[this.options.idKey];return f` <sl-menu-item
                    type="checkbox"
                    data-level=${o}
                    data-id=${s[this.options.idKey]}
                    data-pid=${k(i)}
                    data-lazy=${k(s.lazy||void 0)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${n}
                    class="${k(n?"selected":void 0)}"
                >
                    ${s[this.options.labelKey]}
                    ${F(o<this.options.maxLevel,()=>f`${F(s.lazy==="loading",()=>f`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}
                </sl-menu-item>`})}
        </sl-menu>`}_parseValues(t){let o=[],i=[];if(Array.isArray(t))o=t;else if(t&&typeof t=="string")if(this.options.delimiter&&this.options.delimiter.length>0)o=t.split(this.options.delimiter);else {let s=this.data[this.options.rootKey],n=t;for(;;){let a=s.find(l=>n.startsWith(l[this.options.valueKey]));if(a){if(o.push(a[this.options.valueKey]),n=n.substring(a[this.options.valueKey].length),s=this.data[a[this.options.idKey]],!s)break}else break}}if(o.length>0){let s=this.data[this.options.rootKey];for(let n=0;n<o.length;n++){let a=o[n],l=s.find(c=>c[this.options.valueKey]===a);if(l){if(i.push([l[this.options.idKey],l[this.options.labelKey],l[this.options.valueKey]]),s=this.data[l[this.options.idKey]],!s)break}else break}}return i}renderSelection(){return f`
            ${this.selected.map(t=>t[1]).join(this.options.delimiter||"")}
        `}renderDropdown(){let t=this.data[this.options.rootKey],o=this.focusItems;return f`<div class="levels">
            ${W(Array.from({length:this.options.maxLevel}),(i,s)=>{if(s===0)return this._renderLevel(t,s+1,this.options.rootKey);{let n=o[s-1],a=this.data[n];return a?this._renderLevel(a,s+1,n):this._renderLevel([],s+1,n)}})}
        </div>`}};exports.AutoFieldCascader.styles=[I.styles,ct.styles,x`
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
        `],v([$()],exports.AutoFieldCascader.prototype,"active",2),v([$()],exports.AutoFieldCascader.prototype,"data",2),v([$()],exports.AutoFieldCascader.prototype,"level",2),v([$()],exports.AutoFieldCascader.prototype,"selected",2),v([$()],exports.AutoFieldCascader.prototype,"focusItems",2),exports.AutoFieldCascader=v([T("auto-field-cascader")],exports.AutoFieldCascader);exports.AutoFieldDateRange=class so extends I{getInitialOptions(){return {icon:"date",delimiter:",",includeTime:false}}_onInputChange(r){let t=r.type;this.context.validAt==="input"&&t.includes("input")?this.onFieldInput():t.includes("change")&&this.onFieldChange();}_getDate(r){return (Array.isArray(this.value)?this.value:this.value.split(this.options.delimiter))[r]}_renderIcon(){if(this.options.icon)return f`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}_renderDate(r){return f`<sl-input
            type="${this.options.includeTime?"datetime-local":"date"}"
            .value=${this._getDate(r)}
            size=${this.context.size}
            ?disabled=${!this.options.enable}
            @sl-input=${this._onInputChange.bind(this)}
            @sl-change=${this._onInputChange.bind(this)}
            ?filled=${this.options.filled}
            ?pill=${this.options.pill}
            ?clearable=${this.options.clearable}
            ?required=${this.options.required}
            >${this._renderIcon()}</sl-input
        >`}renderInput(){return f`
            <div class="dates">
                ${this._renderDate(0)}
                <span class="sp">-</span>
                ${this._renderDate(1)}
            </div>
        `}getInputValue(){let r=Array.from(this.inputs||[]).map(t=>t.value);return Array.isArray(this.value)?r:r.join(this.options.delimiter)}};exports.AutoFieldDateRange.styles=[I.styles,x`
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
        `],v([Sa("sl-input")],exports.AutoFieldDateRange.prototype,"inputs",2),exports.AutoFieldDateRange=v([T("auto-field-date-range")],exports.AutoFieldDateRange);var Ep=x`
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
`;var Op=x`
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
`;var Ls=x`
    ${Ep}
    ${Op}
    ${jr}
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
    :host([layout='auto']) {
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
    :host([layout='row']) {
        & > .fields {
            display: flex;
            flex-direction: row;
            & > * {
                width: auto;
                border-bottom: none !important;
            }
        }
    }
    :host([layout='col']) {
        & > .fields {
            display: flex;
            flex-direction: column;
        }
    }

    /* 网格线 */
    :host([border='none']) {
        border: none;
        & > .fields {
            & > * {
                border: none;
            }
        }
    }
    :host([border='outline']) {
        border: 1px solid var(--sl-input-border-color);
        & > .fields {
            & > * {
                border: none;
            }
        }
    }
    :host([border='grid']) {
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
`;var ue=class extends dt{constructor(){super();this.forms=[];ar();}static{this.styles=[Ls,to,x`
            :host {
                display: block;
                width: 100%;
                background-color: var(--auto-bgcolor);
                    font: var(--auto-font);
            }
        `];}firstUpdated(){this.forms=this.getForms(),this.forms.length===0&&setTimeout(()=>{this.forms=this.getForms();});}getForms(){let t=this.shadowRoot.querySelector("slot");return t?t.assignedElements({flatten:true}):[]}bind(t){this.store=t,this.forms&&this.forms.forEach(o=>{o.bind&&o.bind(t);});}getFormInfo(t,o){let i=t.getAttribute("icon")||t.dataset.icon,s=t.getAttribute("label")||t.dataset.label,n=t.getAttribute("title")||t.dataset.title,a=t.getAttribute("name")||t.dataset.name||"",l=this.active?this.active.split(",").includes(a):o===0;return {icon:i,label:s,title:n,name:a,active:l}}renderGroups(){}render(){return f`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `}};v([O("slot")],ue.prototype,"slotElement",2),v([h()],ue.prototype,"active",2),v([$()],ue.prototype,"forms",2);exports.AutoFormTabs=class Sr extends ue{constructor(){super(...arguments);this.direction="top";this.hideLabel=false;}_getPlacement(){return this.direction==="left"?"start":this.direction==="right"?"end":this.direction}renderGroups(){return f`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${()=>this.dispatchEvent(new CustomEvent("tab-change"))}"
            >
                ${this.forms.map((t,o)=>{if(t.tagName!=="AUTO-FORM")return;let i=this.getFormInfo(t,o);return t.bind&&t.bind(this.store),t.setAttribute("border","none"),f`
                        <sl-tab
                            ?active=${i.active}
                            slot="nav"
                            title="${k(i.title||i.label)}"
                            panel="${o}"
                        >
                            ${i.icon?f`<sl-icon name="${i.icon}"></sl-icon>`:""}
                            ${F(!this.hideLabel&&i.label,()=>f`<span class="label">${i.label}</span>`)}
                        </sl-tab>
                    `})}
                ${this.forms.map((t,o)=>f`<sl-tab-panel name="${o}" class="scrollbar"
                            >${t}</sl-tab-panel
                        >`)}
            </sl-tab-group>
        `}};exports.AutoFormTabs.styles=[ue.styles,x`
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
        `],v([h({type:String,reflect:true})],exports.AutoFormTabs.prototype,"direction",2),v([h({type:Boolean,reflect:true})],exports.AutoFormTabs.prototype,"hideLabel",2),exports.AutoFormTabs=v([T("auto-form-tabs")],exports.AutoFormTabs);var Tp=x`
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
`;var ie=class extends z{constructor(){super(...arguments),this.localize=new G(this),this.open=false,this.disabled=false;}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=true),this.detailsObserver=new MutationObserver(e=>{for(let r of e)r.type==="attributes"&&r.attributeName==="open"&&(this.details.open?this.show():this.hide());}),this.detailsObserver.observe(this.details,{attributes:true});}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.detailsObserver)==null||e.disconnect();}handleSummaryClick(e){e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus());}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show());}async handleOpenChange(){if(this.open){if(this.details.open=true,this.emit("sl-show",{cancelable:true}).defaultPrevented){this.open=false,this.details.open=false;return}await te(this.body);let{keyframes:r,options:t}=Qt(this,"details.show",{dir:this.localize.dir()});await Zt(this.body,Zr(r,this.body.scrollHeight),t),this.body.style.height="auto",this.emit("sl-after-show");}else {if(this.emit("sl-hide",{cancelable:true}).defaultPrevented){this.details.open=true,this.open=true;return}await te(this.body);let{keyframes:r,options:t}=Qt(this,"details.hide",{dir:this.localize.dir()});await Zt(this.body,Zr(r,this.body.scrollHeight),t),this.body.style.height="auto",this.details.open=false,this.emit("sl-after-hide");}}async show(){if(!(this.open||this.disabled))return this.open=true,Oe(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=false,Oe(this,"sl-after-hide")}render(){let e=this.localize.dir()==="rtl";return f`
      <details
        part="base"
        class=${M({details:true,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":e})}
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
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};ie.styles=[L,Tp];ie.dependencies={"sl-icon":K};p([O(".details")],ie.prototype,"details",2);p([O(".details__header")],ie.prototype,"header",2);p([O(".details__body")],ie.prototype,"body",2);p([O(".details__expand-icon-slot")],ie.prototype,"expandIconSlot",2);p([h({type:Boolean,reflect:true})],ie.prototype,"open",2);p([h()],ie.prototype,"summary",2);p([h({type:Boolean,reflect:true})],ie.prototype,"disabled",2);p([R("open",{waitUntilFirstUpdate:true})],ie.prototype,"handleOpenChange",1);Jt("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Jt("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});ie.define("sl-details");var Rp=x`
    ${Xi}
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
    ${to}
`;var Ps=180;exports.AutoCollapse=class ye extends dt{constructor(){super(...arguments);this.active="";this.accordion=false;this.panels=[];this._activeArray=[];this._contentHeights=new Map;this._animCleanups=new Map;}firstUpdated(){this.panels=this.getPanels();}connectedCallback(){super.connectedCallback(),ar(),this._activeArray=this.active?this.active.split(","):[];}disconnectedCallback(){super.disconnectedCallback(),this._animCleanups.forEach(t=>t()),this._animCleanups.clear();}getPanels(){let t=this.shadowRoot.querySelector("slot");return t?t.assignedElements({flatten:true}):[]}updated(t){t.has("active")&&typeof this.active=="string"&&(this._activeArray=this.active?this.active.split(","):[]),super.updated(t);}_getContentEl(t){return this.shadowRoot.querySelector(`.content[data-name="${t}"]`)}_measureContent(t){let o=t.style.height,i=t.style.overflow,s=t.style.maxHeight,n=t.style.transition;t.style.transition="none",t.style.height="auto",t.style.maxHeight="none",t.style.overflow="hidden";let a=t.scrollHeight;return t.style.height=o,t.style.maxHeight=s,t.style.overflow=i,t.style.transition=n,a}_animatePanel(t,o){let i=this._getContentEl(t);if(!i)return;this._animCleanups.get(t)?.(),this._animCleanups.delete(t);let s=this._contentHeights.get(t)??i.scrollHeight;if(o)i.style.transition="none",i.style.height="0px",i.offsetHeight,i.style.transition=`height ${Ps}ms ease-out, padding ${Ps}ms ease-out`,i.style.height=`${s}px`;else {let l=i.getBoundingClientRect().height;i.style.transition="none",i.style.height=`${l}px`,i.offsetHeight,i.style.transition=`height ${Ps}ms ease-in, padding ${Ps}ms ease-in`,i.style.height="0px";}let n=l=>{l.propertyName==="height"&&(a(),o&&(i.style.transition="none",i.style.height="auto"));},a=()=>{i.removeEventListener("transitionend",n),this._animCleanups.delete(t);};i.addEventListener("transitionend",n),this._animCleanups.set(t,a);}togglePanel(t){let o=this._activeArray.indexOf(t);if(o===-1)if(this.accordion){let i=this._activeArray.filter(s=>s!==t);this._activeArray=[t],this._runAnimations(t,true,i);}else this._activeArray=[...this._activeArray,t],this._runAnimations(t,true,[]);else {let i=[...this._activeArray];i.splice(o,1),this._activeArray=i,this._runAnimations(t,false,[]);}this.active=this._activeArray.join(","),this.dispatchEvent(new CustomEvent("change",{detail:{active:this.active}}));}_runAnimations(t,o,i){let s=this._getContentEl(t);s&&this._contentHeights.set(t,this._measureContent(s)),this._animatePanel(t,o),i.forEach(n=>this._animatePanel(n,false));}isPanelActive(t){return this._activeArray.includes(t)}_onActionClick(t,o){let i=new CustomEvent("action-click",{detail:{name:t},composed:true,bubbles:true});o.stopPropagation(),this.dispatchEvent(i);}_renderHeaderActions(t){let o=(t.getAttribute("data-actions")||"").split(",");if(o.length>0)return W(o,i=>{let[s,n]=i.split(":");return f`<sl-icon
                    part="action"
                    class="icon action"
                    name=${s}
                    title=${n}
                    @click=${a=>{this._onActionClick(s,a);}}
                ></sl-icon>`})}_renderHeader(t){let o=t.getAttribute("name")||t.dataset.name||"",i=t.getAttribute("label")||t.dataset.label||"",s=t.getAttribute("icon")||t.dataset.icon||"",n=this.isPanelActive(o);return f`
            <div
                part="header"
                class="header ${M({active:n})}"
                @click=${()=>this.togglePanel(o)}
            >
                ${s?f`<sl-icon name="${s}" class="icon"></sl-icon>`:""}
                <div part="label" class="label">${i}</div>
                ${this._renderHeaderActions(t)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `}renderPanels(){return this.panels.map(t=>{let o=t.getAttribute("name")||t.dataset.name||"",i=this.isPanelActive(o),s=rt({padding:this.padding});return f`
                ${this._renderHeader(t)}
                <div
                    part="content"
                    data-name="${o}"
                    class="content scrollbar ${M({active:i})}"
                    style=${s}
                >
                    ${t}
                </div>
            `})}_onSlotChange(){let t=this.getPanels();if(t.length>0){let o=this.panels.map(s=>s.getAttribute("name")||s.dataset.name).filter(s=>!!s),i=t.filter(s=>!o.includes(s.getAttribute("name")||s.dataset.name));this.panels.push(...i),this.requestUpdate();}}render(){return f`
            ${this.renderPanels()}
            <slot @slotchange=${this._onSlotChange.bind(this)} style="display:none;"></slot>
        `}};exports.AutoCollapse.styles=[Rp],v([h({type:String,reflect:true})],exports.AutoCollapse.prototype,"active",2),v([h({type:String,reflect:true})],exports.AutoCollapse.prototype,"padding",2),v([h({type:Boolean,reflect:true})],exports.AutoCollapse.prototype,"accordion",2),v([$()],exports.AutoCollapse.prototype,"panels",2),v([$()],exports.AutoCollapse.prototype,"_activeArray",2),exports.AutoCollapse=v([T("auto-collapse")],exports.AutoCollapse);exports.AutoFormCollapse=class Ze extends ue{constructor(){super(...arguments);this.active="";this.accordion=false;}renderGroups(){return f`
            <auto-collapse
                style="flex-grow:1;min-height:0"
                active=${k(this.active)}
                padding=${k(this.padding)}
                ?accordion=${this.accordion}
            >
                ${this.forms.map(t=>{if(t.tagName==="AUTO-FORM")return t.bind&&t.bind(this.store),t.setAttribute("border","none"),t})}
            </auto-collapse>
        `}};exports.AutoFormCollapse.styles=[ue.styles,x`
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
        `],v([h({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"active",2),v([h({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"padding",2),v([h({type:Boolean,reflect:true})],exports.AutoFormCollapse.prototype,"accordion",2),exports.AutoFormCollapse=v([T("auto-form-collapse")],exports.AutoFormCollapse);var Ip=x`
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

`;exports.AutoFlex=class jt extends dt{constructor(){super(...arguments);this.classes=new Ne(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let t=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=t,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(o=>{o.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(o=>{o.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(t,o,i){super.attributeChangedCallback(t,o,i),this.updateStyles();}render(){return f` <slot></slot> `}};exports.AutoFlex.styles=Ip,v([h({type:String})],exports.AutoFlex.prototype,"direction",2),v([h({type:String})],exports.AutoFlex.prototype,"gap",2),v([h({type:Boolean})],exports.AutoFlex.prototype,"wrap",2),v([h({type:String})],exports.AutoFlex.prototype,"align",2),v([h({type:String})],exports.AutoFlex.prototype,"justify",2),v([h({type:String})],exports.AutoFlex.prototype,"border",2),v([h({type:String})],exports.AutoFlex.prototype,"grow",2),v([h({type:String})],exports.AutoFlex.prototype,"shrink",2),v([h({type:Boolean,reflect:true})],exports.AutoFlex.prototype,"fit",2),exports.AutoFlex=v([T("auto-flex")],exports.AutoFlex);exports.AutoLoading=class tr extends dt{constructor(){super(...arguments);this.tips="Loading";this.hide=false;this.size="2em";}render(){return this.hide?f``:f`  
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
    `,v([h({type:String})],exports.AutoLoading.prototype,"tips",2),v([h({type:Boolean})],exports.AutoLoading.prototype,"hide",2),v([h({type:String})],exports.AutoLoading.prototype,"size",2),exports.AutoLoading=v([T("auto-loading")],exports.AutoLoading);var Mp=x`
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
`;var ii=class extends z{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};ii.styles=[L,Mp];p([h({type:Boolean,reflect:true})],ii.prototype,"vertical",2);p([R("vertical")],ii.prototype,"handleVerticalChange",1);ii.define("sl-divider");bt.define("sl-dropdown");Te.define("sl-spinner");mt.define("sl-icon-button");var Vs=class{constructor(r){this.store=r;}getFullPath(r){let t=this.store.options.configKey||"";return t?`${t}.${r.join(".")}`:r.join(".")}getSchema(r){let t=this.getFullPath(r);return this.store.configManager?.state[t]}getAllSchemas(){let r=this.store.configManager;if(!r)return console.warn("[SchemaAccessor] configManager \u4E0D\u5B58\u5728\uFF01"),{};let t=this.store.configKey||"",o=t?`${t}.`:"",i={};return Object.entries(r.state).forEach(([s,n])=>{if(s.startsWith(o)){let a=s.substring(o.length);i[a]=n;}}),i}getFieldValue(r){return et(this.store.state,r)}setFieldValue(r,t){let o=this.getFullPath(r),i=this.store.configManager?.state[o];i&&i.value!==void 0&&(i.value=t);}hasSchema(r){return !!this.getSchema(r)}getFieldError(r){let t=this.getFullPath(r);return this.store.configManager?.errors[t]}};var ad=/^(validate|on.+|to.+|render.+)$/,ld=new Set(["name","id","key","value","path","datatype"]);function zp(e,r=0){if(!(e===null||typeof e!="object"||r>2))for(let t of Object.keys(e)){let o=e[t];typeof o=="function"&&!ad.test(t)&&!ld.has(t)?at(o):zp(o,r+1);}}var Ds=class extends Ki{add(r,t,o){let i=Vi(o)?o():o;return zp(i.options),super.add(r,t,i)}};var it=class it extends dt{constructor(){super(...arguments);this.classs=new Ne(this);this.ctxController=new Nr(this);this.seq=++it.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";}static{this.seq=0;}static{this.styles=Ls;}get activeStore(){return this.internalStore||this.store}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}connectedCallback(){if(super.connectedCallback(),this.state&&!this.store)this._lastInitState!==this.state&&this._initializeInternalStore();else if(this.store)this._validateExternalStore(),this._initializeWithStore(this.store);else {console.warn("[AutoForm] \u65E2\u6CA1\u6709 .state \u4E5F\u6CA1\u6709 .store \u5C5E\u6027\uFF0C\u65E0\u6CD5\u521D\u59CB\u5316");return}ar();}_initializeInternalStore(){this.internalConfigManager=new Ds({load:()=>({})}),this.internalStore=new cr(Ao(this.state),{configManager:this.internalConfigManager,configKey:"",resetable:true}),this._lastInitState=this.state,this._initializeWithStore(this.internalStore);}_validateExternalStore(){if(!this.store){console.error("[AutoForm] .store \u5C5E\u6027\u4E0D\u5B58\u5728");return}if(!this.store.configManager)throw console.error("[AutoForm] \u4F7F\u7528 .store \u5C5E\u6027\u65F6\uFF0Cstore \u5FC5\u987B\u6709 configManager\uFF01\u8BF7\u521B\u5EFA ConfigManager \u5E76\u4F20\u5165\uFF1Anew AutoStore(state, { configManager }) \u6216\u4F7F\u7528\u63A8\u8350\u7684 .state \u5C5E\u6027\u8BA9 AutoForm \u81EA\u52A8\u521B\u5EFA\u3002"),new Error("AutoForm requires store to have a configManager when using .store property")}_initializeWithStore(t){this.schemaAccessor=new Vs(t),this._initialContext(t),this._loadSchemas();}shouldUpdate(t){if(t.has("state")){if(this._lastInitState===this.state)return  true;this.internalConfigManager&&this.internalConfigManager.remove(this.internalStore),this._initializeInternalStore();}else t.has("store")&&this.store&&(this._validateExternalStore(),this._initializeWithStore(this.store));return  true}_initialContext(t){this.context={...this.context,store:t||this.activeStore,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit,compact:this.compact,readonly:this.readonly,viewonly:this.viewonly,size:this.size,validAt:this.validAt,layout:this.layout};}_isValid(){let t=this.store?.configManager;if(!t)return  false;if(this.path){let o=t.errors||{},i=this.path.split(".");return Object.keys(o).some(s=>Co(i,s.split(".")))}else return Object.keys(t.errors||{}).length>0}_loadSchemas(){if(!this.schemaAccessor){console.warn("[AutoForm] schemaAccessor not initialized");return}let t=this.schemaAccessor.getAllSchemas(),o=Object.entries(t).map(([i,s])=>({...s,path:i.split(".")}));o=o.filter(i=>this._matchesGroup(i)),o=o.filter(i=>this._matchesAdvanced(i)),o=o.filter(i=>this._matchesPath(i)),o.sort((i,s)=>(i.order||0)-(s.order||0)),this.schemas=o,this.requestUpdate();}_matchesGroup(t){if(!this.group)return  true;let o=(t.group||"").split(","),i=this.group.split(",");return o.some(s=>i.includes(s))}_matchesAdvanced(t){return !(this.advanced===false&&t.advanced)}_matchesPath(t){if(!this.path)return  true;let o=t.path||[];return this.path.split(",").map(s=>s.trim().split(".")).some(s=>o.length<s.length?false:s.every((n,a)=>o[a]===n))}bind(t){if(t){if(!t.configManager){console.error("[AutoForm] bind() \u65B9\u6CD5\u7684 store \u5FC5\u987B\u6709 configManager");return}this.store=t,this._initializeWithStore(t);}}clearErrors(){this.activeStore?.configManager&&this.activeStore?.update(()=>{}),Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(i=>{i.tagName.startsWith("auto-field")&&(i.errorMessage=void 0);}),this.requestUpdate();}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),f`
            <div class="actions header"></div>
            <div class="fields">
                ${W(this.schemas,(t,o)=>`field-${o}`,t=>this._renderField(t))}
            </div>
            <div class="actions footer"></div>
        `}_renderField(t){let o=t.widget||"input",i=Kl(`auto-field-${o}`);return fe`
			<${i}
				.schema=${t}
				part="field"
				exportparts="field-value,field-label,field-help"
				size=${this.size}
			></${i}>
		`}reset(){this.activeStore?.reset(),this._initialContext(),Ur(this,"dirty",false),Ur(this,"invalid",false);}submit(t){if(typeof t=="function"){let o=this.activeStore?.configManager,i=this.activeStore?.options.configKey||"",s=i?`${i}.`:"",n=o?Object.entries(o.state).reduce((l,[c,d])=>{let u=c.substring(s.length);return l[u]=d.value,l},{}):{},a=o?o.errors:{};t(n,a);}}};v([xn({context:Yi})],it.prototype,"context",2),v([$()],it.prototype,"schemas",2),v([h({type:Object})],it.prototype,"store",2),v([h({type:Object})],it.prototype,"state",2),v([h({type:Boolean,reflect:true,attribute:"valid-at-init"})],it.prototype,"validAtInit",2),v([h({type:String,reflect:true})],it.prototype,"group",2),v([h({type:String,reflect:true})],it.prototype,"icon",2),v([h({type:String,reflect:true})],it.prototype,"path",2),v([h({type:Boolean,reflect:true})],it.prototype,"compact",2),v([h({type:Boolean,reflect:true})],it.prototype,"advanced",2),v([h({type:String,reflect:true,attribute:"valid-at"})],it.prototype,"validAt",2),v([h({type:String,reflect:true})],it.prototype,"border",2),v([h({type:String})],it.prototype,"size",2),v([h({type:String,reflect:true,attribute:"label-pos"})],it.prototype,"labelPos",2),v([h({type:String,reflect:true,attribute:"label-width"})],it.prototype,"labelWidth",2),v([h({type:Boolean,reflect:true})],it.prototype,"dark",2),v([h({type:Boolean,reflect:true})],it.prototype,"readonly",2),v([h({type:Boolean,reflect:true})],it.prototype,"viewonly",2),v([h({type:String,reflect:true,attribute:"view-align"})],it.prototype,"viewAlign",2),v([h({type:String,reflect:true})],it.prototype,"layout",2),v([h({type:String,reflect:true})],it.prototype,"icons",2);var Yn=it;customElements.get("auto-form")||customElements.define("auto-form",Yn);var cd=Object.defineProperty,It=(e,r)=>cd(e,"name",{value:r,configurable:true}),no=(e=>typeof Mt<"u"?Mt:typeof Proxy<"u"?new Proxy(e,{get:(r,t)=>(typeof Mt<"u"?Mt:r)[t]}):e)(function(e){if(typeof Mt<"u")return Mt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});function Lp(e){globalThis.__AUTOSTORE_PLUGINS__||(globalThis.__AUTOSTORE_PLUGINS__=[]),globalThis.__AUTOSTORE_PLUGINS__.push(e);}It(Lp,"installPlugin");async function Pp(e){return new Promise((r,t)=>setTimeout(r,e))}It(Pp,"t");(e=>typeof no<"u"?no:typeof Proxy<"u"?new Proxy(e,{get:It((r,t)=>(typeof no<"u"?no:r)[t],"get")}):e)(function(e){if(typeof no<"u")return no.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});function Vp(e,r,t){let o=e,i=r.length-1;r.forEach((s,n)=>{let a=Ir(o);if(n===i){let l=a?o.get(s):o[s];typeof l=="object"&&Object.assign(l,t);return}a?(o.has(s)||o.set(s,{}),o=o.get(s)):(s in o||(o[s]={}),o=o[s]);});}It(Vp,"updateObjectVal");var pd=class extends He{static{It(this,"AsyncProComputedObject");}_isRunning=false;_defaultAbortController=null;_userAbortController;_firstRun=false;lite=false;get async(){return  true}get value(){return super.value}set value(e){super.value=e;}get running(){return this._isRunning}onInitOptions(e){e.reentry===void 0&&(e.reentry=this.store.options.reentry);}onInitial(){this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(()=>{(this.options.immediate===true||this.options.immediate==="auto"&&this.options.initial===void 0)&&this.run({first:true});},0);}onDestroy(){try{this._isRunning&&this.getAbortController().abort();}catch{}}createAsyncComputedValue(){return Object.assign({loading:false,timeout:0,retry:0,error:null,value:this.options.initial,progress:0,run:at(e=>this.store.computedObjects.run(this.id,Object.assign({},e))),cancel:at(()=>{this.getAbortController().abort();})})}updateComputedValue(e){let r=this.strPath,t=Object.keys(e).length;if(this.associated)this.store.update(o=>{Vp(o,this.path,e);},{batch:t>1?r:false});else {Object.assign(this.value,e);let o=t>1,i=[];Object.entries(e).forEach(([s,n])=>{let a={type:"set",path:[...this.path,s],value:n,parent:this.value};o&&(a.reply=true),this.store.operates.emit(`${this.strPath}.${s}`,a),i.push(a);}),o&&this.store.operates.emit(this.strPath,{type:"batch",path:this.path,value:i});}}async run(e){let{first:r}=e??{};if(this.isDisable(e?.enable)){this.store.logger.warn(()=>`Async computed <${this.toString()}> is disabled`);return}let t=this.error!==void 0;this.error=void 0,this._firstRun=true,r||this.store.logger.info(()=>`Run async computed for : ${this.toString()}`);let o=e?Object.assign({first:r},this.options,e):this.options,i=Fe(this,"sync",this.context,o),{reentry:s}=o;if(this._isRunning&&!s){this.store.logger.warn(()=>`Async computed: ${this.toString()} is running, can't reentry`),st(this.store,`observer/${this.id}/cancel`,{reason:"reentry",observer:this});return}this._isRunning=true;try{return await this.executeGetter(i,o,t)}finally{this._isRunning=false;}}getValue(){return this.value.value}createComputeProgressbar(e){let{max:r=100,min:t=0,value:o=0}=Object.assign({},e);return this.updateComputedValue({progress:o}),{value:It(i=>{i>r&&(i=r),i<t&&(i=t),this.updateComputedValue({progress:i});},"value"),end(){this.value(r);}}}getAbortController(e){if(e&&typeof e.abortController=="function"){let r=e.abortController();r&&r instanceof AbortController&&(this._userAbortController=r);}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}setTimeoutControl(e,r,t){let{timeout:o}=t,[i,s]=Array.isArray(o)?o:[o,0],n,a;return i>0&&(r.timeout=s>1?s:i,a=setTimeout(()=>{e.hasTimeout=true,e.hasError=true,e.error="TIMEOUT",typeof e.timeoutCallback=="function"&&e.timeoutCallback(),clearInterval(n),this.updateComputedValue({loading:false,error:"TIMEOUT",timeout:0});},i),s>1&&(n=setInterval(()=>{this.updateComputedValue({timeout:s--}),s===0&&clearInterval(n);},i/(s+1)))),{clear:It(()=>{clearTimeout(a),clearInterval(n);},"clear"),enable:i>0}}async executeGetter(e,r,t=false){let{retry:o}=r,[i,s]=o?Array.isArray(o)?o:[Number(o),0]:[0,0],n,a=this.getAbortController(r),l={onTimeout:It(g=>{n=g;},"onTimeout"),getProgressbar:this.createComputeProgressbar.bind(this),getSnap:It(g=>zi(g),"getSnap"),cancel:a.abort.bind(a),extras:r.extras,operate:r.operate,first:r.first,abortSignal:a.signal},c={error:null,hasError:false,hasTimeout:false,hasAbort:false,timeoutCallback:n},d=It(()=>{c.hasAbort=true;},"abortHandler");a.signal.addEventListener("abort",d),this.error=void 0;let u={clear:It(()=>{},"clear"),enable:false},m;try{let g=It(b=>Object.assign(c,b),"updateCtx");for(let b=0;b<i+1;b++){let y={};try{let C={loading:!0};if(t&&(C.error=null),i>0&&(C.retry=b>0?i-b+1:0),b>0&&g({error:null,hasError:!1,hasTimeout:!1}),u=this.setTimeoutControl(c,C,r),this.updateComputedValue(C),c.hasAbort)throw new _o;if(st(this.store,`observer/${this.id}/run`,{args:l,observer:this,scope:e}),m=await this.getter.call(this,e,l),c.hasAbort)throw new _o;c.hasTimeout||(r.raw&&at(m),y.value=m,t&&(y.error=null),u.enable&&(y.timeout=0));}catch(C){if(c.hasError=!0,c.error=C,c.hasTimeout||(y.error=il(C).message),St(r.onError)){let S=r.onError(C);S!==void 0&&(y.value=S);}}finally{u.clear(),b===i&&(c.hasTimeout&&(y.error=c.error),i>0&&(y.retry=0)),y.loading=!1,this.updateComputedValue(y);}c.hasError&&i>0&&s>0&&b<i&&await Pp(s);}c.hasAbort?st(this.store,`observer/${this.id}/cancel`,{reason:"abort",observer:this}):c.hasError||c.hasTimeout?(this.error=c.error,st(this.store,`observer/${this.id}/error`,{error:c.error,observer:this})):st(this.store,`observer/${this.id}/done`,{value:m,observer:this}),this.onDoneCallback(r,c.error,c.hasAbort,c.hasTimeout,e,m);}finally{a.signal.removeEventListener("abort",d);}}onDoneCallback(e,r,t,o,i,s){typeof e.onDone=="function"&&e.onDone.call(this,{id:this.id,path:this.path,value:s,error:r,abort:t,timeout:o,scope:i});}onDependsChange(e){this.store.logger.debug(()=>`AsyncComputed<${this.id}> is running by depends ${e.type}/${e.path.join(".")} operate `),this.run({operate:e,first:!this._firstRun});}getValueWatchPath(){let e=this.path.join(this.store.options.delimiter);return [`${e}.*`,e]}getDepends(){return super.getDepends().map(e=>{if(e.length===0)return e;for(let r of this.store.computedObjects.values())if(Mr(r.path,e)&&r.async)return [`${e.join(this.store.options.delimiter)}.value`];return e})}};function ao(e,r,t){if(typeof e!="function")throw new Error("computed getter must be a function");let o=Object.assign({},Rr(),t,{async:true});o.depends=So(r);let i=It(()=>({type:"asyncpro",getter:e,options:o,[Ci]:true}),"descriptorBuilder");return i[Tt]="asyncpro",i}It(ao,"asyncComputed");function Dp(e){let r=e.constructor.observers;r.asyncpro=(t,o,i)=>{let s=new pd(t,o,i);return t.computedObjects.set(s.id,s),s},e.options.sandbox||(e.options.sandbox={}),e.options.sandbox.context||(e.options.sandbox.context={}),e.options.sandbox.context.asyncComputed=ao;}It(Dp,"asyncpro");Lp(Dp);var Xn=class{static createAsyncComputedField(r,t,o,i,s){let n=ao(o,i,s||{timeout:8e3,retry:2}),a=t.join(".");return r.configManager?.add(r,a,n),n}static subscribeToAsyncValue(r,t){r.run();let o=false,i=setInterval(()=>{!r.loading&&!o&&(r.error||(t(r.value),o=true),clearInterval(i));},100);return ()=>{clearInterval(i),r.cancel?.();}}static getAsyncState(r){return {loading:r.loading||false,progress:r.progress||0,error:r.error,value:r.value}}static createProgressiveAsyncField(r,t,o,i){let s=ao(o,i,{timeout:[1e4,100],retry:[3,1e3],immediate:true}),n=t.join(".");return r.configManager?.add(r,n,s),s}};/*! Bundled license information:

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
lit-html/node/async-directive.js:
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

@lit-labs/ssr-dom-shim/lib/css.js:
  (**
   * @license
   * Copyright 2024 Google LLC
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
lit-html/node/directives/live.js:
lit-html/node/static.js:
lit-html/node/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/exports.AsyncFieldHandler=Xn;exports.AutoField=I;exports.AutoForm=Yn;exports.asyncComputed=ao;exports.describeCron=Ap;exports.parseCron=wr;exports.registerIcons=ar;exports.serializeCron=nd;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map