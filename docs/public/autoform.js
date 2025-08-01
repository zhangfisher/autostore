var AutoForm=(function(exports){'use strict';var Tl=Object.defineProperty;var Il=Object.getOwnPropertyDescriptor;var De=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(i,e)=>(typeof require<"u"?require:i)[e]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var v=(t,i,e,r)=>{for(var o=r>1?void 0:r?Il(i,e):i,s=t.length-1,n;s>=0;s--)(n=t[s])&&(o=(r?n(i,e,o):n(o))||o);return r&&o&&Tl(i,e,o),o};var Or=globalThis,Sr=Or.trustedTypes,Is=Sr?Sr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Oo="$lit$",pe=`lit$${Math.random().toFixed(9).slice(2)}$`,To="?"+pe,Rl=`<${To}>`,Fe=Or.document===void 0?{createTreeWalker:()=>({})}:document,Li=()=>Fe.createComment(""),Vi=t=>t===null||typeof t!="object"&&typeof t!="function",Io=Array.isArray,Ds=t=>Io(t)||typeof t?.[Symbol.iterator]=="function",Eo=`[ 	
\f\r]`,Ri=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rs=/-->/g,Ls=/>/g,Me=RegExp(`>|${Eo}(?:([^\\s"'>=/]+)(${Eo}*=${Eo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Vs=/'/g,Ps=/"/g,Ms=/^(?:script|style|textarea|title)$/i,Ro=t=>(i,...e)=>({_$litType$:t,strings:i,values:e}),u=Ro(1),nt=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),zs=new WeakMap,He=Fe.createTreeWalker(Fe,129);function Bs(t,i){if(!Io(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Is!==void 0?Is.createHTML(i):i}var Ws=(t,i)=>{let e=t.length-1,r=[],o,s=i===2?"<svg>":i===3?"<math>":"",n=Ri;for(let c=0;c<e;c++){let l=t[c],h,m,d=-1,f=0;for(;f<l.length&&(n.lastIndex=f,m=n.exec(l),m!==null);)f=n.lastIndex,n===Ri?m[1]==="!--"?n=Rs:m[1]!==void 0?n=Ls:m[2]!==void 0?(Ms.test(m[2])&&(o=RegExp("</"+m[2],"g")),n=Me):m[3]!==void 0&&(n=Me):n===Me?m[0]===">"?(n=o??Ri,d=-1):m[1]===void 0?d=-2:(d=n.lastIndex-m[2].length,h=m[1],n=m[3]===void 0?Me:m[3]==='"'?Ps:Vs):n===Ps||n===Vs?n=Me:n===Rs||n===Ls?n=Ri:(n=Me,o=void 0);let g=n===Me&&t[c+1].startsWith("/>")?" ":"";s+=n===Ri?l+Rl:d>=0?(r.push(h),l.slice(0,d)+Oo+l.slice(d)+pe+g):l+pe+(d===-2?c:g);}return [Bs(t,s+(t[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),r]},Pi=class t{constructor({strings:i,_$litType$:e},r){let o;this.parts=[];let s=0,n=0,c=i.length-1,l=this.parts,[h,m]=Ws(i,e);if(this.el=t.createElement(h,r),He.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes);}for(;(o=He.nextNode())!==null&&l.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(let d of o.getAttributeNames())if(d.endsWith(Oo)){let f=m[n++],g=o.getAttribute(d).split(pe),b=/([.?@])?(.*)/.exec(f);l.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?kr:b[1]==="?"?$r:b[1]==="@"?Ar:We}),o.removeAttribute(d);}else d.startsWith(pe)&&(l.push({type:6,index:s}),o.removeAttribute(d));if(Ms.test(o.tagName)){let d=o.textContent.split(pe),f=d.length-1;if(f>0){o.textContent=Sr?Sr.emptyScript:"";for(let g=0;g<f;g++)o.append(d[g],Li()),He.nextNode(),l.push({type:2,index:++s});o.append(d[f],Li());}}}else if(o.nodeType===8)if(o.data===To)l.push({type:2,index:s});else {let d=-1;for(;(d=o.data.indexOf(pe,d+1))!==-1;)l.push({type:7,index:s}),d+=pe.length-1;}s++;}}static createElement(i,e){let r=Fe.createElement("template");return r.innerHTML=i,r}};function Be(t,i,e=t,r){if(i===nt)return i;let o=r!==void 0?e._$Co?.[r]:e._$Cl,s=Vi(i)?void 0:i._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(false),s===void 0?o=void 0:(o=new s(t),o._$AT(t,e,r)),r!==void 0?(e._$Co??=[])[r]=o:e._$Cl=o),o!==void 0&&(i=Be(t,o._$AS(t,i.values),o,r)),i}var Cr=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:r}=this._$AD,o=(i?.creationScope??Fe).importNode(e,true);He.currentNode=o;let s=He.nextNode(),n=0,c=0,l=r[0];for(;l!==void 0;){if(n===l.index){let h;l.type===2?h=new ai(s,s.nextSibling,this,i):l.type===1?h=new l.ctor(s,l.name,l.strings,this,i):l.type===6&&(h=new Er(s,this,i)),this._$AV.push(h),l=r[++c];}n!==l?.index&&(s=He.nextNode(),n++);}return He.currentNode=Fe,o}p(i){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(i,r,e),e+=r.strings.length-2):r._$AI(i[e])),e++;}},ai=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,r,o){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??true;}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=Be(this,i,e),Vi(i)?i===Y||i==null||i===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):i!==this._$AH&&i!==nt&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Ds(i)?this.k(i):this._(i);}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i));}_(i){this._$AH!==Y&&Vi(this._$AH)?this._$AA.nextSibling.data=i:this.T(Fe.createTextNode(i)),this._$AH=i;}$(i){let{values:e,_$litType$:r}=i,o=typeof r=="number"?this._$AC(i):(r.el===void 0&&(r.el=Pi.createElement(Bs(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(e);else {let s=new Cr(o,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s;}}_$AC(i){let e=zs.get(i.strings);return e===void 0&&zs.set(i.strings,e=new Pi(i)),e}k(i){Io(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,o=0;for(let s of i)o===e.length?e.push(r=new t(this.O(Li()),this.O(Li()),this,this.options)):r=e[o],r._$AI(s),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o);}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(false,true,e);i&&i!==this._$AB;){let r=i.nextSibling;i.remove(),i=r;}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i));}},We=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,r,o,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=i,this.name=e,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Y;}_$AI(i,e=this,r,o){let s=this.strings,n=false;if(s===void 0)i=Be(this,i,e,0),n=!Vi(i)||i!==this._$AH&&i!==nt,n&&(this._$AH=i);else {let c=i,l,h;for(i=s[0],l=0;l<s.length-1;l++)h=Be(this,c[r+l],e,l),h===nt&&(h=this._$AH[l]),n||=!Vi(h)||h!==this._$AH[l],h===Y?i=Y:i!==Y&&(i+=(h??"")+s[l+1]),this._$AH[l]=h;}n&&!o&&this.j(i);}j(i){i===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"");}},kr=class extends We{constructor(){super(...arguments),this.type=3;}j(i){this.element[this.name]=i===Y?void 0:i;}},$r=class extends We{constructor(){super(...arguments),this.type=4;}j(i){this.element.toggleAttribute(this.name,!!i&&i!==Y);}},Ar=class extends We{constructor(i,e,r,o,s){super(i,e,r,o,s),this.type=5;}_$AI(i,e=this){if((i=Be(this,i,e,0)??Y)===nt)return;let r=this._$AH,o=i===Y&&r!==Y||i.capture!==r.capture||i.once!==r.once||i.passive!==r.passive,s=i!==Y&&(r===Y||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,i),this._$AH=i;}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i);}},Er=class{constructor(i,e,r){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r;}get _$AU(){return this._$AM._$AU}_$AI(i){Be(this,i);}},Ns={I:ai},Ll=Or.litHtmlPolyfillSupport;Ll?.(Pi,ai),(Or.litHtmlVersions??=[]).push("3.3.0");var li=(t,i,e)=>{let r=e?.renderBefore??i,o=r._$litPart$;if(o===void 0){let s=e?.renderBefore??null;r._$litPart$=o=new ai(i.insertBefore(Li(),s),s,void 0,e??{});}return o._$AI(t),o};var w=t=>t??Y;var js=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(i){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=i;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var oe=function(t,i,e,r,o){if(typeof i=="function"?t!==i||true:!i.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return i.set(t,e),e},bt=function(t,i,e,r){if(typeof i=="function"?t!==i||true:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?r:e==="a"?r.call(t):r?r.value:i.get(t)},ci,Tr,Ir,zi,Lo,Di,Rr,Ne,Mi,we,Lr,Us,qs=t=>typeof t=="boolean"?t:t?.capture??false;var Vl=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(i,e,r){if(e==null)return;let o=qs(r)?this.__captureEventListeners:this.__eventListeners,s=o.get(i);if(s===void 0)s=new Map,o.set(i,s);else if(s.has(e))return;let n=typeof r=="object"&&r?r:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(i,e,r)),s.set(e,n??{});}removeEventListener(i,e,r){if(e==null)return;let o=qs(r)?this.__captureEventListeners:this.__eventListeners,s=o.get(i);s!==void 0&&(s.delete(e),s.size||o.delete(i));}dispatchEvent(i){let e=[this],r=this.__eventTargetParent;if(i.composed)for(;r;)e.push(r),r=r.__eventTargetParent;else for(;r&&r!==this.__host;)e.push(r),r=r.__eventTargetParent;let o=false,s=false,n=0,c=null,l=null,h=null,m=i.stopPropagation,d=i.stopImmediatePropagation;Object.defineProperties(i,{target:{get(){return c??l},...Z},srcElement:{get(){return i.target},...Z},currentTarget:{get(){return h},...Z},eventPhase:{get(){return n},...Z},composedPath:{value:()=>e,...Z},stopPropagation:{value:()=>{o=true,m.call(i);},...Z},stopImmediatePropagation:{value:()=>{s=true,d.call(i);},...Z}});let f=(A,S,O)=>{typeof A=="function"?A(i):typeof A?.handleEvent=="function"&&A.handleEvent(i),S.once&&O.delete(A);},g=()=>(h=null,n=0,!i.defaultPrevented),b=e.slice().reverse();c=!this.__host||!i.composed?this:null;let x=A=>{for(l=this;l.__host&&A.includes(l.__host);)l=l.__host;};for(let A of b){!c&&(!l||l===A.__host)&&x(b.slice(b.indexOf(A))),h=A,n=A===i.target?2:1;let S=A.__captureEventListeners.get(i.type);if(S){for(let[O,_]of S)if(f(O,_,S),s)return g()}if(o)return g()}let T=i.bubbles?e:[this];l=null;for(let A of T){!c&&(!l||A===l.__host)&&x(T.slice(0,T.indexOf(A)+1)),h=A,n=A===i.target?2:3;let S=A.__eventListeners.get(i.type);if(S){for(let[O,_]of S)if(f(O,_,S),s)return g()}if(o)return g()}return g()}},Vo=Vl;var Z={__proto__:null};Z.enumerable=true;Object.freeze(Z);var Po=(we=class{constructor(i,e={}){if(ci.set(this,false),Tr.set(this,false),Ir.set(this,false),zi.set(this,false),Lo.set(this,Date.now()),Di.set(this,false),Rr.set(this,void 0),Ne.set(this,void 0),Mi.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof e!="object"||!e)throw new Error('The "options" argument must be an object');let{bubbles:r,cancelable:o,composed:s}=e;oe(this,ci,!!o),oe(this,Tr,!!r),oe(this,Ir,!!s),oe(this,Rr,`${i}`),oe(this,Ne,null),oe(this,Mi,false);}initEvent(i,e,r){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){oe(this,zi,true);}get target(){return bt(this,Ne,"f")}get currentTarget(){return bt(this,Ne,"f")}get srcElement(){return bt(this,Ne,"f")}get type(){return bt(this,Rr,"f")}get cancelable(){return bt(this,ci,"f")}get defaultPrevented(){return bt(this,ci,"f")&&bt(this,zi,"f")}get timeStamp(){return bt(this,Lo,"f")}composedPath(){return bt(this,Mi,"f")?[bt(this,Ne,"f")]:[]}get returnValue(){return !bt(this,ci,"f")||!bt(this,zi,"f")}get bubbles(){return bt(this,Tr,"f")}get composed(){return bt(this,Ir,"f")}get eventPhase(){return bt(this,Mi,"f")?we.AT_TARGET:we.NONE}get cancelBubble(){return bt(this,Di,"f")}set cancelBubble(i){i&&oe(this,Di,true);}stopPropagation(){oe(this,Di,true);}get isTrusted(){return  false}},ci=new WeakMap,Tr=new WeakMap,Ir=new WeakMap,zi=new WeakMap,Lo=new WeakMap,Di=new WeakMap,Rr=new WeakMap,Ne=new WeakMap,Mi=new WeakMap,we.NONE=0,we.CAPTURING_PHASE=1,we.AT_TARGET=2,we.BUBBLING_PHASE=3,we);Object.defineProperties(Po.prototype,{initEvent:Z,stopImmediatePropagation:Z,preventDefault:Z,target:Z,currentTarget:Z,srcElement:Z,type:Z,cancelable:Z,defaultPrevented:Z,timeStamp:Z,composedPath:Z,returnValue:Z,bubbles:Z,composed:Z,eventPhase:Z,cancelBubble:Z,stopPropagation:Z,isTrusted:Z});var Ks=(Us=class extends Po{constructor(i,e={}){super(i,e),Lr.set(this,void 0),oe(this,Lr,e?.detail??null);}initCustomEvent(i,e,r,o){throw new Error("Method not implemented.")}get detail(){return bt(this,Lr,"f")}},Lr=new WeakMap,Us);Object.defineProperties(Ks.prototype,{detail:Z});var zo=Po,Do=Ks;globalThis.Event??=zo;globalThis.CustomEvent??=Do;var Gs=new WeakMap,Hi=t=>{let i=Gs.get(t);return i===void 0&&Gs.set(t,i=new Map),i},Pl=class extends Vo{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(Hi(this)).map(([i,e])=>({name:i,value:e}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(i,e){Hi(this).set(i,String(e));}removeAttribute(i){Hi(this).delete(i);}toggleAttribute(i,e){if(this.hasAttribute(i)){if(e===void 0||!e)return this.removeAttribute(i),false}else return e===void 0||e?(this.setAttribute(i,""),true):false;return  true}hasAttribute(i){return Hi(this).has(i)}attachShadow(i){let e={host:this};return this.__shadowRootMode=i.mode,i&&i.mode==="open"&&(this.__shadowRoot=e),e}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let i=new js(this);return this.__internals=i,i}getAttribute(i){return Hi(this).get(i)??null}};var zl=class extends Pl{},Mo=zl;globalThis.litServerRoot??=Object.defineProperty(new Mo,"localName",{get(){return "lit-server-root"}});var Dl=class{constructor(){this.__definitions=new Map;}define(i,e){if(this.__definitions.has(i))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${i}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${i}" has already been used with this registry`);e.__localName=i,this.__definitions.set(i,{ctor:e,observedAttributes:e.observedAttributes??[]});}get(i){return this.__definitions.get(i)?.ctor}},Ml=Dl;var Ys=new Ml;var Fi=globalThis,Vr=Fi.ShadowRoot&&(Fi.ShadyCSS===void 0||Fi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ho=Symbol(),Xs=new WeakMap,Bi=class{constructor(i,e,r){if(this._$cssResult$=true,r!==Ho)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e;}get styleSheet(){let i=this.o,e=this.t;if(Vr&&i===void 0){let r=e!==void 0&&e.length===1;r&&(i=Xs.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),r&&Xs.set(e,i));}return i}toString(){return this.cssText}},Qs=t=>new Bi(typeof t=="string"?t:t+"",void 0,Ho),y=(t,...i)=>{let e=t.length===1?t[0]:i.reduce((r,o,s)=>r+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new Bi(e,t,Ho)},Zs=(t,i)=>{if(Vr)t.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let r=document.createElement("style"),o=Fi.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=e.cssText,t.appendChild(r);}},Fo=Vr||Fi.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(i=>{let e="";for(let r of i.cssRules)e+=r.cssText;return Qs(e)})(t):t;var{is:Hl,defineProperty:Fl,getOwnPropertyDescriptor:Bl,getOwnPropertyNames:Wl,getOwnPropertySymbols:Nl,getPrototypeOf:jl}=Object,Ni=globalThis;Ni.customElements??=Ys;var Js=Ni.trustedTypes,Ul=Js?Js.emptyScript:"",ql=Ni.reactiveElementPolyfillSupport,Wi=(t,i)=>t,Se={toAttribute(t,i){switch(i){case Boolean:t=t?Ul:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t);}catch{e=null;}}return e}},Pr=(t,i)=>!Hl(t,i),tn={attribute:true,type:String,converter:Se,reflect:false,useDefault:false,hasChanged:Pr};Symbol.metadata??=Symbol("metadata"),Ni.litPropertyMetadata??=new WeakMap;var de=class extends(globalThis.HTMLElement??Mo){static addInitializer(i){this._$Ei(),(this.l??=[]).push(i);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=tn){if(e.state&&(e.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=true),this.elementProperties.set(i,e),!e.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(i,r,e);o!==void 0&&Fl(this.prototype,i,o);}}static getPropertyDescriptor(i,e,r){let{get:o,set:s}=Bl(this.prototype,i)??{get(){return this[e]},set(n){this[e]=n;}};return {get:o,set(n){let c=o?.call(this);s?.call(this,n),this.requestUpdate(i,c,r);},configurable:true,enumerable:true}}static getPropertyOptions(i){return this.elementProperties.get(i)??tn}static _$Ei(){if(this.hasOwnProperty(Wi("elementProperties")))return;let i=jl(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties);}static finalize(){if(this.hasOwnProperty(Wi("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(Wi("properties"))){let e=this.properties,r=[...Wl(e),...Nl(e)];for(let o of r)this.createProperty(o,e[o]);}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[r,o]of e)this.elementProperties.set(r,o);}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let o=this._$Eu(e,r);o!==void 0&&this._$Eh.set(o,e);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let r=new Set(i.flat(1/0).reverse());for(let o of r)e.unshift(Fo(o));}else i!==void 0&&e.push(Fo(i));return e}static _$Eu(i,e){let r=e.attribute;return r===false?void 0:typeof r=="string"?r:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this));}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.();}removeController(i){this._$EO?.delete(i);}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(i.set(r,this[r]),delete this[r]);i.size>0&&(this._$Ep=i);}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Zs(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(i=>i.hostConnected?.());}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.());}attributeChangedCallback(i,e,r){this._$AK(i,r);}_$ET(i,e){let r=this.constructor.elementProperties.get(i),o=this.constructor._$Eu(i,r);if(o!==void 0&&r.reflect===true){let s=(r.converter?.toAttribute!==void 0?r.converter:Se).toAttribute(e,r.type);this._$Em=i,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null;}}_$AK(i,e){let r=this.constructor,o=r._$Eh.get(i);if(o!==void 0&&this._$Em!==o){let s=r.getPropertyOptions(o),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Se;this._$Em=o,this[o]=n.fromAttribute(e,s.type)??this._$Ej?.get(o)??null,this._$Em=null;}}requestUpdate(i,e,r){if(i!==void 0){let o=this.constructor,s=this[i];if(r??=o.getPropertyOptions(i),!((r.hasChanged??Pr)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,r))))return;this.C(i,e,r);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(i,e,{useDefault:r,reflect:o,wrapped:s},n){r&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,n??e??this[i]),s!==true||n!==void 0)||(this._$AL.has(i)||(this.hasUpdated||r||(e=void 0),this._$AL.set(i,e)),o===true&&this._$Em!==i&&(this._$Eq??=new Set).add(i));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(e){Promise.reject(e);}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0;}let r=this.constructor.elementProperties;if(r.size>0)for(let[o,s]of r){let{wrapped:n}=s,c=this[o];n!==true||this._$AL.has(o)||c===void 0||this.C(o,void 0,s,c);}}let i=false,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM();}catch(r){throw i=false,this._$EM(),r}i&&this._$AE(e);}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(i)),this.updated(i);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return  true}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM();}updated(i){}firstUpdated(i){}};de.elementStyles=[],de.shadowRootOptions={mode:"open"},de[Wi("elementProperties")]=new Map,de[Wi("finalized")]=new Map,ql?.({ReactiveElement:de}),(Ni.reactiveElementVersions??=[]).push("2.1.0");var Bo=globalThis,ut=class extends de{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=li(e,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return nt}};ut._$litElement$=true,ut.finalized=true,Bo.litElementHydrateSupport?.({LitElement:ut});var Kl=Bo.litElementPolyfillSupport;Kl?.({LitElement:ut});(Bo.litElementVersions??=[]).push("4.2.0");var en=t=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,i);}):customElements.define(t,i);};var Gl={attribute:true,type:String,converter:Se,reflect:false,hasChanged:Pr},Yl=(t=Gl,i,e)=>{let{kind:r,metadata:o}=e,s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=true),s.set(e.name,t),r==="accessor"){let{name:n}=e;return {set(c){let l=i.get.call(this);i.set.call(this,c),this.requestUpdate(n,l,t);},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(r==="setter"){let{name:n}=e;return function(c){let l=this[n];i.call(this,c),this.requestUpdate(n,l,t);}}throw Error("Unsupported decorator location: "+r)};function p(t){return (i,e)=>typeof e=="object"?Yl(t,i,e):((r,o,s)=>{let n=o.hasOwnProperty(s);return o.constructor.createProperty(s,r),n?Object.getOwnPropertyDescriptor(o,s):void 0})(t,i,e)}function k(t){return p({...t,state:true,attribute:false})}function Ce(t){return (i,e)=>{let r=typeof i=="function"?i:i[e];Object.assign(r,t);}}var he=(t,i,e)=>(e.configurable=true,e.enumerable=true,Reflect.decorate&&typeof i!="object"&&Object.defineProperty(t,i,e),e);function $(t,i){return (e,r,o)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return he(e,r,{get(){return s(this)}})}}var Xl;function rn(t){return (i,e)=>he(i,e,{get(){return (this.renderRoot??(Xl??=document.createDocumentFragment())).querySelectorAll(t)}})}function on(t){return (i,e)=>{let{slot:r,selector:o}=t??{},s="slot"+(r?`[name=${r}]`:":not([name])");return he(i,e,{get(){let n=this.renderRoot?.querySelector(s),c=n?.assignedElements(t)??[];return o===void 0?c:c.filter(l=>l.matches(o))}})}}function ke(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function sn(t,i){return ke(t)?Object.assign({},t,i):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},i)}var Ql=".";function nn(t,i,e){if(!i||i.length===0)return t;let r=Array.isArray(i)?i:i.split(Ql),o,s=t;for(let n=0;n<r.length;n++){let c=r[n];if(c in s)o=s[c];else return e;s=o;}return o}function zr(t,i,e,r){if(!i||!t)return t;let o=i;if(o.length===0)return typeof t=="object"&&Object.assign(t,e),t;{let s=t,n=[],c=(l,h,m)=>{l[h]=m;};for(let l=0;l<o.length;l++){let h=o[l];if(n.push(h),s)if(Array.isArray(s)){let m=parseInt(h,10);if(Number.isNaN(m)||m<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===o.length-1?c(s,m,e):s=s[m];}else s instanceof Map||s instanceof WeakMap?l===o.length-1?s.set(h,e):(s.has(h)||s.set(h,{}),s=s.get(h)):typeof s=="object"&&h in s?l===o.length-1?c(s,h,e):s=s[h]:(s[h]=l===o.length-1?e:{},s=s[h]);else s[h]=l===o.length-1?e:{},s=s[h];}}return t}function Zl(t){if(t==null)return "";let i=typeof t;if(i==="boolean")return String(t);if(Array.isArray(t))return t.join(",");if(i==="object")try{return JSON.stringify(t)}catch{return "{}"}return String(t)}function an(t,i){if(!i)return t;let e=i.datatype||"any";if(e==="any")return t;if(e==="string")return Zl(t);if(e==="number")return Number(t);if(Array.isArray(t))return [...t];if(typeof t=="object")return {...t};if(typeof t=="string"){if(e==="boolean")return t.toLowerCase()==="true";if(e==="array")return t.split(",").map(r=>r.trim());if(e==="object")try{return JSON.parse(t)}catch{return {}}}return e==="boolean"?!!t:t}function ln(t,i,e){return t?e(i):i}var Wo="";function cn(t){Wo=t;}function pn(t=""){if(!Wo){let i=[...document.getElementsByTagName("script")],e=i.find(r=>r.hasAttribute("data-shoelace"));if(e)cn(e.getAttribute("data-shoelace"));else {let r=i.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),o="";r&&(o=r.getAttribute("src")),cn(o.split("/").slice(0,-1).join("/"));}}return Wo.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var Jl={name:"default",resolver:t=>pn(`assets/icons/${t}.svg`)},dn=Jl;var hn={caret:`
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
  `},tc={name:"system",resolver:t=>t in hn?`data:image/svg+xml,${encodeURIComponent(hn[t])}`:""},un=tc;var Dr=[dn,un],Mr=[];function No(t){Mr.push(t);}function jo(t){Mr=Mr.filter(i=>i!==t);}function pi(t){return Dr.find(i=>i.name===t)}function Uo(t,i){mn(t),Dr.push({name:t,resolver:i.resolver,mutator:i.mutator,spriteSheet:i.spriteSheet}),Mr.forEach(e=>{e.library===t&&e.setIcon();});}function mn(t){Dr=Dr.filter(i=>i.name!==t);}var bn=Object.defineProperty,ec=Object.defineProperties,ic=Object.getOwnPropertyDescriptor,rc=Object.getOwnPropertyDescriptors,fn=Object.getOwnPropertySymbols,oc=Object.prototype.hasOwnProperty,sc=Object.prototype.propertyIsEnumerable,qo=(t,i)=>(i=Symbol[t])?i:Symbol.for("Symbol."+t),Ko=t=>{throw TypeError(t)},gn=(t,i,e)=>i in t?bn(t,i,{enumerable:true,configurable:true,writable:true,value:e}):t[i]=e,St=(t,i)=>{for(var e in i||(i={}))oc.call(i,e)&&gn(t,e,i[e]);if(fn)for(var e of fn(i))sc.call(i,e)&&gn(t,e,i[e]);return t},ue=(t,i)=>ec(t,rc(i)),a=(t,i,e,r)=>{for(var o=r>1?void 0:r?ic(i,e):i,s=t.length-1,n;s>=0;s--)(n=t[s])&&(o=(r?n(i,e,o):n(o))||o);return r&&o&&bn(i,e,o),o},vn=(t,i,e)=>i.has(t)||Ko("Cannot "+e),yn=(t,i,e)=>(vn(t,i,"read from private field"),i.get(t)),xn=(t,i,e)=>i.has(t)?Ko("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(t):i.set(t,e),_n=(t,i,e,r)=>(vn(t,i,"write to private field"),i.set(t,e),e),nc=function(t,i){this[0]=t,this[1]=i;},wn=t=>{var i=t[qo("asyncIterator")],e=false,r,o={};return i==null?(i=t[qo("iterator")](),r=s=>o[s]=n=>i[s](n)):(i=i.call(t),r=s=>o[s]=n=>{if(e){if(e=false,s==="throw")throw n;return n}return e=true,{done:false,value:new nc(new Promise(c=>{var l=i[s](n);l instanceof Object||Ko("Object expected"),c(l);}),1)}}),o[qo("iterator")]=()=>o,r("next"),"throw"in i?r("throw"):o.throw=s=>{throw s},"return"in i&&r("return"),o};var Cn="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg",Go={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>',bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>'},Sn=t=>t in Go?`data:image/svg+xml,${encodeURIComponent(Go[t])}`:Cn.replace("{name}",t),ac=t=>{t&&t.setAttribute("stroke-width","1");};function di(t="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg",i){if(!t.includes("{name}"))throw new Error('icon url must include "{name}"');Cn=t,pi("default").resolver!==Sn&&Uo("default",{resolver:Sn,mutator:ac});}var $e=class extends Event{constructor(i,e,r,o){super("context-request",{bubbles:true,composed:true}),this.context=i,this.contextTarget=e,this.callback=r,this.subscribe=o??false;}};var hi=class{constructor(i,e,r,o){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=i,e.context!==void 0){let s=e;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=e,this.callback=r,this.subscribe=o??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new $e(this.context,this.host,this.t,this.subscribe));}};var Hr=class{get value(){return this.o}set value(i){this.setValue(i);}setValue(i,e=false){let r=e||!Object.is(i,this.o);this.o=i,r&&this.updateObservers();}constructor(i){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:r}]of this.subscriptions)e(this.o,r);},i!==void 0&&(this.value=i);}addCallback(i,e,r){if(!r)return void i(this.value);this.subscriptions.has(i)||this.subscriptions.set(i,{disposer:()=>{this.subscriptions.delete(i);},consumerHost:e});let{disposer:o}=this.subscriptions.get(i);i(this.value,o);}clearCallbacks(){this.subscriptions.clear();}};var Yo=class extends Event{constructor(i,e){super("context-provider",{bubbles:true,composed:true}),this.context=i,this.contextTarget=e;}},ui=class extends Hr{constructor(i,e,r){super(e.context!==void 0?e.initialValue:r),this.onContextRequest=o=>{if(o.context!==this.context)return;let s=o.contextTarget??o.composedPath()[0];s!==this.host&&(o.stopPropagation(),this.addCallback(o.callback,s,o.subscribe));},this.onProviderRequest=o=>{if(o.context!==this.context||(o.contextTarget??o.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:c}]of this.subscriptions)s.has(n)||(s.add(n),c.dispatchEvent(new $e(this.context,c,n,true)));o.stopPropagation();},this.host=i,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new Yo(this.context,this.host));}};function Xo({context:t}){return (i,e)=>{let r=new WeakMap;if(typeof e=="object")return {get(){return i.get.call(this)},set(o){return r.get(this).setValue(o),i.set.call(this,o)},init(o){return r.set(this,new ui(this,{context:t,initialValue:o})),o}};{i.constructor.addInitializer(n=>{r.set(n,new ui(n,{context:t}));});let o=Object.getOwnPropertyDescriptor(i,e),s;if(o===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(c){r.get(this).setValue(c),n.set(this,c);},configurable:true,enumerable:true};}else {let n=o.set;s={...o,set(c){r.get(this).setValue(c),n?.call(this,c);}};}return void Object.defineProperty(i,e,s)}}}function Qo({context:t,subscribe:i}){return (e,r)=>{typeof r=="object"?r.addInitializer(function(){new hi(this,{context:t,callback:o=>{e.set.call(this,o);},subscribe:i});}):e.constructor.addInitializer(o=>{new hi(o,{context:t,callback:s=>{o[r]=s;},subscribe:i});});}}var Fr="autoform";var kn=y`
    :host {
        display: flex;
        position: relative;
        box-sizing: border-box;
        display: block;
        & > .autofield {
            display: flex;
            position: relative;
            flex-direction: column;
            width: 100%;
            background-color: var(--auto-bgcolor);
            box-sizing: border-box;
            padding-right: 0px;
            & > .label {
                display: flex;
                color: var(--auto-text-color);
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
            }

            & .help {
                display: flex;
                align-items: center;
                font-size: calc(var(--auto-font-size) * 0.9);
                color: var(--auto-gray-color);
                padding: calc(var(--auto-spacing) * 0.3) 0px;
                font-weight: lighter;
                & a {
                    text-decoration: none;
                    color: var(--auto-gray-color);
                    &:hover {
                        color: var(--auto-theme-color);
                    }
                }
            }
        }
        sl-input::part(base) {
            outline: none !important;
            box-shadow: none !important;
        }
        sl-textarea::part(base) {
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
            border-left: 1px solid var(--sl-input-border-color);
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
            padding: calc(var(--auto-spacing) * 0.2);
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
`;var vt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Dt=t=>(...i)=>({_$litDirective$:t,values:i}),Et=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,r){this._$Ct=i,this._$AM=e,this._$Ci=r;}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:cc}=Ns;var An=(t,i)=>t?._$litType$!==void 0;var Br=t=>t.strings===void 0,$n=()=>document.createComment(""),mi=(t,i,e)=>{let r=t._$AA.parentNode,o=i===void 0?t._$AB:i._$AA;if(e===void 0){let s=r.insertBefore($n(),o),n=r.insertBefore($n(),o);e=new cc(s,n,t,t.options);}else {let s=e._$AB.nextSibling,n=e._$AM,c=n!==t;if(c){let l;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(l=t._$AU)!==n._$AU&&e._$AP(l);}if(s!==o||c){let l=e._$AA;for(;l!==s;){let h=l.nextSibling;r.insertBefore(l,o),l=h;}}}return e},Ae=(t,i,e=t)=>(t._$AI(i,e),t),pc={},Wr=(t,i=pc)=>t._$AH=i,En=t=>t._$AH,Nr=t=>{t._$AP?.(false,true);let i=t._$AA,e=t._$AB.nextSibling;for(;i!==e;){let r=i.nextSibling;i.remove(),i=r;}};var On=(t,i,e)=>{let r=new Map;for(let o=i;o<=e;o++)r.set(t[o],o);return r},et=Dt(class extends Et{constructor(t){if(super(t),t.type!==vt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,i,e){let r;e===void 0?e=i:i!==void 0&&(r=i);let o=[],s=[],n=0;for(let c of t)o[n]=r?r(c,n):n,s[n]=e(c,n),n++;return {values:s,keys:o}}render(t,i,e){return this.dt(t,i,e).values}update(t,[i,e,r]){let o=En(t),{values:s,keys:n}=this.dt(i,e,r);if(!Array.isArray(o))return this.ut=n,s;let c=this.ut??=[],l=[],h,m,d=0,f=o.length-1,g=0,b=s.length-1;for(;d<=f&&g<=b;)if(o[d]===null)d++;else if(o[f]===null)f--;else if(c[d]===n[g])l[g]=Ae(o[d],s[g]),d++,g++;else if(c[f]===n[b])l[b]=Ae(o[f],s[b]),f--,b--;else if(c[d]===n[b])l[b]=Ae(o[d],s[b]),mi(t,l[b+1],o[d]),d++,b--;else if(c[f]===n[g])l[g]=Ae(o[f],s[g]),mi(t,o[d],o[f]),f--,g++;else if(h===void 0&&(h=On(n,g,b),m=On(c,d,f)),h.has(c[d]))if(h.has(c[f])){let x=m.get(n[g]),T=x!==void 0?o[x]:null;if(T===null){let A=mi(t,o[d]);Ae(A,s[g]),l[g]=A;}else l[g]=Ae(T,s[g]),mi(t,o[d],T),o[x]=null;g++;}else Nr(o[f]),f--;else Nr(o[d]),d++;for(;g<=b;){let x=mi(t,l[b+1]);Ae(x,s[g]),l[g++]=x;}for(;d<=f;){let x=o[d++];x!==null&&Nr(x);}return this.ut=n,Wr(t,l),nt}});var fi=class{constructor(i){this.host=i,i.addController(this);}hostConnected(){let i=this.host;i.hasAttribute("dark")&&(i.classList.add("sl-theme-dark"),i.style.color="var(--sl-color-neutral-900,white)",i.shadowRoot.ownerDocument.style=i.style.color);}_toDark(){let i=this.host;i.classList.add("sl-theme-dark"),i.style.color="var(--sl-color-neutral-900,white)";}_toLight(){let i=this.host;i.classList.remove("sl-theme-dark"),i.style.color="var(--sl-color-neutral-1000)";}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext(),this.host.dark?this._toDark():this._toLight();}};var Tn="important",dc=" !"+Tn,J=Dt(class extends Et{constructor(t){if(super(t),t.type!==vt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((i,e)=>{let r=t[e];return r==null?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[i]){let{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(i)),this.render(i);for(let r of this.ft)i[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(let r in i){let o=i[r];if(o!=null){this.ft.add(r);let s=typeof o=="string"&&o.endsWith(dc);r.includes("-")||s?e.setProperty(r,s?o.slice(0,-11):o,s?Tn:""):e[r]=o;}}return nt}});function B(t,i,e){return t?i(t):e?.(t)}var Ee=class{constructor(i,...e){this.initialClasses=[];this.host=i,i.addController(this),this.initialClasses=e;}_forEachClasss(i,e){i&&i.forEach(r=>{typeof r=="string"?(e(r,true),this.host.classList.add(r)):Object.entries(r).forEach(([o,s])=>{e(o,s);});});}add(...i){this.host&&i&&this._forEachClasss(i,e=>{this.host.classList.add(e);});}remove(...i){this.host&&i&&this._forEachClasss(i,e=>{this.host.classList.remove(e);});}toggle(...i){this.host&&this._forEachClasss(i,e=>{this.host.classList.toggle(e);});}use(...i){this.host&&this._forEachClasss(i,(e,r)=>{r?this.host.classList.add(e):this.host.classList.remove(e);});}has(i){return this.host.classList.contains(i)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var ji=class extends Et{constructor(i){if(super(i),this.it=Y,i.type!==vt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===Y||i==null)return this._t=void 0,this.it=i;if(i===nt)return i;if(typeof i!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.it)return this._t;this.it=i;let e=[i];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};ji.directiveName="unsafeHTML",ji.resultType=1;var Ot=Dt(ji);function In(t,i){i&&Object.entries(i).forEach(([e,r])=>{(e==="root"?[t]:Array.from(t.querySelectorAll(e))).forEach(s=>{typeof r=="string"?s.style.cssText=r:typeof r=="object"&&Object.assign(s.style,r);});});}function gi(t,i,e){e?t.classList.add(i):t.classList.remove(i);}function Rn(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var R=class extends ut{constructor(){super(...arguments);this.theme=new fi(this);this.classs=new Ee(this);this.options=Rn();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this._updateFieldValue();}static{this.styles=kn;}get shadow(){return this.shadowRoot}getFieldOptions(){return Object.entries(this.schema||{}).reduce((e,[r,o])=>(ke(o)?e[r]=o.value:e[r]=o,e),Object.assign({},Rn(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(e=true){return u`${this.renderBeforeActions(e)} ${this.renderAfterActions(e)}`}_onClickAction(e,r){return o=>{typeof r=="function"&&r(o),e.onClick&&typeof e.onClick=="function"&&e.onClick?.call(this,this.getInputValue(),{action:e,options:this.options,event:o,update:s=>{zr(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(e){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return u`<div
                class="actions before"
                part="before-actions"
                slot="${w(e?"prefix":void 0)}"
            >
                ${et(this.beforeActions,r=>this.renderActionWidget(r))}
            </div>`}renderAfterActions(e){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return u`<div
                class="actions after"
                part="after-actions"
                slot="${w(e?"suffix":void 0)}"
            >
                ${et(this.afterActions,r=>this.renderActionWidget(r))}
            </div>`}_renderDropdownAction(e){return u`
            <sl-dropdown
                class="action-widget"
                hoist
                title=${w(e.tips)}
                placement=${e.pos==="before"?"bottom-start":"bottom-end"}
            >
                <sl-button slot="trigger" ?caret=${e.caret}>
                    ${B(e.icon,()=>u`<sl-icon name=${w(e.icon)}></sl-icon>`)}
                    ${e.label}
                </sl-button>
                <sl-menu>
                    ${et(e.items||[],r=>r==="-"?u`<sl-divider></sl-divider>`:(typeof r=="string"&&(r={label:r}),u`<sl-menu-item
                            @click=${this._onClickAction.call(this,r,()=>{e.syncMenu&&(e.label=r.label,e.icon=r.icon,e.tips=r.tips,this.requestUpdate());})}
                        >
                            ${B(r.icon,()=>u`<sl-icon
                                        name=${w(r.icon)}
                                        slot="prefix"
                                    ></sl-icon>`)}
                            ${r.label}</sl-menu-item
                        >`))}
                </sl-menu>
            </sl-dropdown>
        `}_renderButtonAction(e){return u`
            <sl-button
                class="action-widget"
                title=${w(e.tips)}
                variant=${w(e.variant)}
                size=${e.size||this.context.size}
                @click=${this._onClickAction.call(this,e)}
            >
                ${B(e.icon,()=>u`<sl-icon name=${w(e.icon)}></sl-icon>`)}
                ${e.label}
            </sl-button>
        `}_renderImageAction(e){return u`
            <sl-button
                title="${w(e.tips)}"
                variant="text"
                class="action-widget image"
                @click=${this._onClickAction.call(this,e)}
            >
                <img src="${w(e.url)}" />
            </sl-button>
        `}renderActionWidget(e){if(typeof e!="object")return;let r=e.type||"button";if(r==="dropdown")return this._renderDropdownAction(e);if(r==="button")return this._renderButtonAction(e);if(r==="image")return this._renderImageAction(e)}renderOption(e,r){let o=this.schema[e];if(o)return o.loading?u`<sl-spinner></sl-spinner>`:u`${r?r(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(e){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,e):e}toState(e){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,e):e}toInput(e){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,e):e}getOptionValue(e,r){if(this.schema&&e in this.schema){let o=this.schema[e];return o===void 0?r:ke(o)?o.value:o}else return r}getOption(e){if(this.schema&&e in this.schema){let r=this.schema[e];return ke(r)?r:sn(r)}}getInputValue(){if(!this.input)return "";let e=this.input.value;if(typeof this.options.toState!="function"){let r=this.options.datatype||"string";r==="number"?e=Number(e):r==="boolean"&&(e=!!e);}return e}_renderRequiredOption(){return this.renderOption("required",e=>e?u`<span style="color:red;">*</span>`:"")}renderHelp(e=false){let r=this.options.help;if(!r)return;let o=r.match(/\(([^)]+)\)[^)]*$/),s=o?o[1]:null,n=s?r.replace(`(${s})`,""):r;return u`<span
            class="help"
            part="field-help"
            title="${w(e?n:void 0)}"
        >
            ${ln(!!s,u`
                    <sl-icon name="help"></sl-icon>
                    ${B(!e,()=>u`${n}`)}
                `,c=>u`<a target="_blank" href="${s}">${c}</a>`)}
        </span>`}renderLabel(){let e=this.context,r=this.options.labelPos||e.labelPos;if(r==="none")return u``;{let o={};return (e.labelWidth&&r==="left"||e.viewonly)&&(o.width=e.labelWidth),u`<div class="label" part="field-label" style="${w(J(o))}">
                <span class="title">
                    ${this.getLabel()}
                    ${B(r==="left"||e.viewonly,()=>this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${B(r==="top"&&!e.viewonly,()=>this.renderHelp())}
            </div>`}}renderInput(){return u``}isShowError(){return this.context.validAtInit?!!this.invalidTips:this.dirty?!!this.invalidTips:false}renderError(){return this.isShowError()?u`<div class="error">${this.invalidTips}</div>`:u``}_handleSchemaChange(){let e=this.context;if(e?.store&&this.schema){let r=this.getPath().join("_$_");this._subscribers.push(e.store.schemas.store.watch(`${r}.**`,o=>{let{reply:s,type:n,value:c,flags:l}=o;if(s||e.form.seq===l)return;(n==="batch"?c:[o]).forEach(m=>{let d=m.path.slice(1);zr(this.schema,d,m.value),this.options[d[0]]=m.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let e=this.value;if(this.options.toView&&this.options.toView)try{e=this.options.toView.call(this,this.value);}catch(r){console.error(`Error while toView<${this.path}>: ${r.message}`);}return u`${Ot(String(e))}`}_handleStateChange(){let e=this.context;e?.store&&this.schema&&this._subscribers.push(e.store.watch(this.getPath().join("."),r=>{this.value=this.toInput(r.value);},{operates:"write"}));}getStateValue(){return this.toInput(nn(this.context.store.state,this.getPath()))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let e=this.context;e?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.getPath().join("."),this.name=this.options.name||this.path,this.path in e.store.schemas.errors&&(this.invalidTips=e.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(r=>r.pos==="before"),this.afterActions=this.options.actions.filter(r=>r.pos!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(e=>e.off());}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFormClasss(){this.context.form&&(gi(this.context.form,"dirty",this.dirty),gi(this.context.form,"invalid",!!this.invalidTips));}_updateFieldValue(){if(!this.schema)return;let e=this.getPath(),r=this.toState(this.getInputValue()),o=this.context;o.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let c=an(r,this.schema);zr(n,e,c),this.invalidTips=void 0;},{flags:o.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:r,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidTips=s.message;}finally{this._updateFormClasss();}}renderValue(){return u`
            ${this.renderInput()} ${B(this.context.viewonly,()=>this.renderHelp())}
            ${this.renderError()}
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(){this.options.styles&&In(this.shadow,this.options.styles);}render(){let e=this.context,r=this.options.labelPos?this.options.labelPos:e.labelPos;return this.classs.use(e.size,{[`${e.border}-border`]:true,error:this.isShowError(),"left-label":r==="left"||e.viewonly,"top-label":r==="top"&&!e.viewonly,disable:this.options.enable===false,readonly:e.readonly,viewonly:e.viewonly,compact:this.compact===void 0?e.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${e.viewAlign}`]:true,[`${e.layout}-layout`]:true}),u`
            <div class="autofield">
                ${this.options.divider?u`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${B(e.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>
            </div>
        `}};v([p({type:Object})],R.prototype,"schema",2),v([k()],R.prototype,"value",2),v([k()],R.prototype,"invalidTips",2),v([k()],R.prototype,"labelPos",2),v([k()],R.prototype,"dirty",2),v([p({type:Boolean,reflect:true})],R.prototype,"noreactive",2),v([p({type:Boolean,reflect:true})],R.prototype,"compact",2),v([on({slot:"value",flatten:true})],R.prototype,"_field",2),v([$(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],R.prototype,"input",2),v([Qo({context:Fr}),p({attribute:false})],R.prototype,"context",2);function I(t){return i=>customElements.get(t)?i:en(t)(i)}exports.AutoFieldInput=class Q extends R{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return u`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=o=>o.map(s=>typeof s=="string"?s:s.value||s.label),r=(o,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let c=e(s),l=-1;c.some((d,f)=>{if(n&&this.value.startsWith(d)||!n&&this.value.endsWith(d))return n?(this._prefix=d,this.value=this.value.substring(d.length)):(this._suffix=d,this.value=this.value.substring(0,this.value.length-d.length)),l=f,true});let h=l===-1?"?":typeof s[l]=="string"?s[l]:s[l].label,m={type:s.length===1?"button":"dropdown",label:h,caret:!n};m.type==="dropdown"?m.items=s.map(d=>(d==="-"||(d=typeof d=="string"?{label:d}:d,d.onClick=()=>{n?this._prefix=d.value??d.label:this._suffix=d.value??d.label,this.onFieldChange();}),d)):typeof s[0]=="string"?m.label=s[0]:Object.assign(m,s[0]),m.syncMenu=true,m.pos=n?"before":"after",n?o.splice(0,0,m):o.push(m);}};this.options.prefix&&r(this.beforeActions,this.options.prefix),this.options.suffix&&r(this.afterActions,this.options.suffix,false);}onInputChange(e){let r=e.type;this.context.validAt==="input"&&r.includes("input")?this.onFieldInput():r.includes("change")&&this.onFieldChange();}renderInput(){return u`
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
                placeholder=${w(this.options.placeholder)}
                pattern=${w(this.options.pattern)}
                minLength=${w(this.options.minLength)}
                maxLength=${w(this.options.maxLength)}
                max=${w(this.options.max)}
                min=${w(this.options.min)}
                ?disabled=${!this.options.enable}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                spellcheck=${w(this.options.spellcheck)}
            >
                ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input
            >
        `}toState(e){let r=super.toState(e);return typeof r=="string"&&(this._prefix&&(r=this._prefix+r),this._suffix&&(r=r+this._suffix)),r}toInput(e){let r=super.toInput(e);return typeof r=="string"&&(this._prefix&&r.startsWith(this._prefix)&&(r=r.substring(this._prefix.length)),this._suffix&&r.endsWith(this._suffix)&&(r=r.substring(0,r.length-this._suffix.length))),r}};exports.AutoFieldInput.styles=[R.styles,y`
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
        `],exports.AutoFieldInput=v([I("auto-field-input")],exports.AutoFieldInput);var Ln=y`
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
`;var Ft=(t="value")=>(i,e)=>{let r=i.constructor,o=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(s,n,c){var l;let h=r.getPropertyOptions(t),m=typeof h.attribute=="string"?h.attribute:t;if(s===m){let d=h.converter||Se,g=(typeof d=="function"?d:(l=d?.fromAttribute)!=null?l:Se.fromAttribute)(c,h.type);this[t]!==g&&(this[e]=g);}o.call(this,s,n,c);};};var Tt=y`
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
`;var Ui=new WeakMap,qi=new WeakMap,Ki=new WeakMap,Zo=new WeakSet,jr=new WeakMap,mt=class{constructor(t,i){this.handleFormData=e=>{let r=this.options.disabled(this.host),o=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!n&&typeof o=="string"&&o.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(c=>{e.formData.append(o,c.toString());}):e.formData.append(o,s.toString()));},this.handleFormSubmit=e=>{var r;let o=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=Ui.get(this.form))==null||r.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!o&&!s(this.host)&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),jr.set(this.host,[]);},this.handleInteraction=e=>{let r=jr.get(this.host);r.includes(e.type)||r.push(e.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let r of e)if(typeof r.checkValidity=="function"&&!r.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let r of e)if(typeof r.reportValidity=="function"&&!r.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=St({form:e=>{let r=e.form;if(r){let s=e.getRootNode().querySelector(`#${r}`);if(s)return s}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var r;return (r=e.disabled)!=null?r:false},reportValidity:e=>typeof e.reportValidity=="function"?e.reportValidity():true,checkValidity:e=>typeof e.checkValidity=="function"?e.checkValidity():true,setValue:(e,r)=>e.value=r,assumeInteractionOn:["sl-input"]},i);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),jr.set(this.host,[]),this.options.assumeInteractionOn.forEach(i=>{this.host.addEventListener(i,this.handleInteraction);});}hostDisconnected(){this.detachForm(),jr.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,Ui.has(this.form)?Ui.get(this.form).add(this.host):Ui.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),qi.has(this.form)||(qi.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Ki.has(this.form)||(Ki.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=Ui.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),qi.has(this.form)&&(this.form.reportValidity=qi.get(this.form),qi.delete(this.form)),Ki.has(this.form)&&(this.form.checkValidity=Ki.get(this.form),Ki.delete(this.form)),this.form=void 0));}setUserInteracted(t,i){i?Zo.add(t):Zo.delete(t),t.requestUpdate();}doAction(t,i){if(this.form){let e=document.createElement("button");e.type=t,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",i&&(e.name=i.name,e.value=i.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{i.hasAttribute(r)&&e.setAttribute(r,i.getAttribute(r));})),this.form.append(e),e.click(),e.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let i=this.host,e=!!Zo.has(i),r=!!i.required;i.toggleAttribute("data-required",r),i.toggleAttribute("data-optional",!r),i.toggleAttribute("data-invalid",!t),i.toggleAttribute("data-valid",t),i.toggleAttribute("data-user-invalid",!t&&e),i.toggleAttribute("data-user-valid",t&&e);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let i=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||i.preventDefault(),this.host.dispatchEvent(i)||t?.preventDefault();}},bi=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),Vn=Object.freeze(ue(St({},bi),{valid:false,valueMissing:true})),Pn=Object.freeze(ue(St({},bi),{valid:false,customError:true}));var at=class{constructor(t,...i){this.slotNames=[],this.handleSlotChange=e=>{let r=e.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=i;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let i=t;if(i.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!i.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function zn(t){if(!t)return "";let i=t.assignedNodes({flatten:true}),e="";return [...i].forEach(r=>{r.nodeType===Node.TEXT_NODE&&(e+=r.textContent);}),e}var Dn=y`
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
`;function E(t,i){let e=St({waitUntilFirstUpdate:false},i);return (r,o)=>{let{update:s}=r,n=Array.isArray(t)?t:[t];r.update=function(c){n.forEach(l=>{let h=l;if(c.has(h)){let m=c.get(h),d=this[h];m!==d&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[o](m,d);}}),s.call(this,c);};}}var P=y`
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
`;var Ur,V=class extends ut{constructor(){super(),xn(this,Ur,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,i])=>{this.constructor.define(t,i);});}emit(t,i){let e=new CustomEvent(t,St({bubbles:true,cancelable:false,composed:true,detail:{}},i));return this.dispatchEvent(e),e}static define(t,i=this,e={}){let r=customElements.get(t);if(!r){try{customElements.define(t,i,e);}catch{customElements.define(t,class extends i{},e);}return}let o=" (unknown version)",s=o;"version"in i&&i.version&&(o=" v"+i.version),"version"in r&&r.version&&(s=" v"+r.version),!(o&&s&&o===s)&&console.warn(`Attempted to register <${t}>${o}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,i,e){yn(this,Ur)||(this.constructor.elementProperties.forEach((r,o)=>{r.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o]);}),_n(this,Ur,true)),super.attributeChangedCallback(t,i,e);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((i,e)=>{t.has(e)&&this[e]==null&&(this[e]=i);});}};Ur=new WeakMap;V.version="2.20.1";V.dependencies={};a([p()],V.prototype,"dir",2);a([p()],V.prototype,"lang",2);var Gi=Symbol(),qr=Symbol(),Jo,ts=new Map,q=class extends V{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,i){var e;let r;if(i?.spriteSheet)return this.svg=u`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Gi:qr}catch{return qr}try{let o=document.createElement("div");o.innerHTML=await r.text();let s=o.firstElementChild;if(((e=s?.tagName)==null?void 0:e.toLowerCase())!=="svg")return Gi;Jo||(Jo=new DOMParser);let c=Jo.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return c?(c.part.add("svg"),document.adoptNode(c)):Gi}catch{return Gi}}connectedCallback(){super.connectedCallback(),No(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),jo(this);}getIconSource(){let t=pi(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:i,fromLibrary:e}=this.getIconSource(),r=e?pi(this.library):void 0;if(!i){this.svg=null;return}let o=ts.get(i);if(o||(o=this.resolveIcon(i,r),ts.set(i,o)),!this.initialRender)return;let s=await o;if(s===qr&&ts.delete(i),i===this.getIconSource().url){if(An(s)){if(this.svg=s,r){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof r.mutator=="function"&&n&&r.mutator(n);}return}switch(s){case qr:case Gi:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=r?.mutator)==null||t.call(r,this.svg),this.emit("sl-load");}}}render(){return this.svg}};q.styles=[P,Dn];a([k()],q.prototype,"svg",2);a([p({reflect:true})],q.prototype,"name",2);a([p()],q.prototype,"src",2);a([p()],q.prototype,"label",2);a([p({reflect:true})],q.prototype,"library",2);a([E("label")],q.prototype,"handleLabelChange",1);a([E(["name","src","library"])],q.prototype,"setIcon",1);var L=Dt(class extends Et{constructor(t){if(super(t),t.type!==vt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(i=>t[i]).join(" ")+" "}update(t,[i]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in i)i[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(i)}let e=t.element.classList;for(let r of this.st)r in i||(e.remove(r),this.st.delete(r));for(let r in i){let o=!!i[r];o===this.st.has(r)||this.nt?.has(r)||(o?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)));}return nt}});var kt=Dt(class extends Et{constructor(t){if(super(t),t.type!==vt.PROPERTY&&t.type!==vt.ATTRIBUTE&&t.type!==vt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Br(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[i]){if(i===nt||i===Y)return i;let e=t.element,r=t.name;if(t.type===vt.PROPERTY){if(i===e[r])return nt}else if(t.type===vt.BOOLEAN_ATTRIBUTE){if(!!i===e.hasAttribute(r))return nt}else if(t.type===vt.ATTRIBUTE&&e.getAttribute(r)===i+"")return nt;return Wr(t),i}});var rt=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,i)=>t.checked=i}),this.hasSlotController=new at(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),i=this.helpText?true:!!t;return u`
      <div
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":i})}
      >
        <label
          part="base"
          class=${L({checkbox:true,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${w(this.value)}
            .indeterminate=${kt(this.indeterminate)}
            .checked=${kt(this.checked)}
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
            ${this.checked?u`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?u`
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
          aria-hidden=${i?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};rt.styles=[P,Tt,Ln];rt.dependencies={"sl-icon":q};a([$('input[type="checkbox"]')],rt.prototype,"input",2);a([k()],rt.prototype,"hasFocus",2);a([p()],rt.prototype,"title",2);a([p()],rt.prototype,"name",2);a([p()],rt.prototype,"value",2);a([p({reflect:true})],rt.prototype,"size",2);a([p({type:Boolean,reflect:true})],rt.prototype,"disabled",2);a([p({type:Boolean,reflect:true})],rt.prototype,"checked",2);a([p({type:Boolean,reflect:true})],rt.prototype,"indeterminate",2);a([Ft("checked")],rt.prototype,"defaultChecked",2);a([p({reflect:true})],rt.prototype,"form",2);a([p({type:Boolean,reflect:true})],rt.prototype,"required",2);a([p({attribute:"help-text"})],rt.prototype,"helpText",2);a([E("disabled",{waitUntilFirstUpdate:true})],rt.prototype,"handleDisabledChange",1);a([E(["checked","indeterminate"],{waitUntilFirstUpdate:true})],rt.prototype,"handleStateChange",1);rt.define("sl-checkbox");exports.AutoFieldCheckbox=class Yi extends R{renderInput(){return u`
            <sl-checkbox
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                class="auto-input"
                ?disabled=${!this.options.enable}
                .value="${this.options.switchValues[0]}"
                .checked=${this._isChecked()}
                placeholder="${w(this.options.placeholder)}"
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-checkbox
            >
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let i=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof i=="boolean"?"":i}}renderView(){return u` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `}};exports.AutoFieldCheckbox.styles=[R.styles,y`
            sl-checkbox.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=v([I("auto-field-checkbox")],exports.AutoFieldCheckbox);var Mn=y`
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
`;var Zt=class extends V{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return u`
      <span
        part="base"
        class=${L({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?u` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Zt.styles=[P,Mn];Zt.dependencies={"sl-icon":q};a([k()],Zt.prototype,"checked",2);a([k()],Zt.prototype,"hasFocus",2);a([p()],Zt.prototype,"value",2);a([p({reflect:true})],Zt.prototype,"size",2);a([p({type:Boolean,reflect:true})],Zt.prototype,"disabled",2);a([E("checked")],Zt.prototype,"handleCheckedChange",1);a([E("disabled",{waitUntilFirstUpdate:true})],Zt.prototype,"handleDisabledChange",1);Zt.define("sl-radio");var Hn=y`
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
`;var Fn=y`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var Oe=class extends V{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let i=Xi(t.target);i?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let i=Xi(t.target);i?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let i=Xi(t.target);i?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let i=Xi(t.target);i?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(i=>{let e=t.indexOf(i),r=Xi(i);r&&(r.toggleAttribute("data-sl-button-group__button",true),r.toggleAttribute("data-sl-button-group__button--first",e===0),r.toggleAttribute("data-sl-button-group__button--inner",e>0&&e<t.length-1),r.toggleAttribute("data-sl-button-group__button--last",e===t.length-1),r.toggleAttribute("data-sl-button-group__button--radio",r.tagName.toLowerCase()==="sl-radio-button"));});}render(){return u`
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
    `}};Oe.styles=[P,Fn];a([$("slot")],Oe.prototype,"defaultSlot",2);a([k()],Oe.prototype,"disableRole",2);a([p()],Oe.prototype,"label",2);function Xi(t){var i;let e="sl-button, sl-radio-button";return (i=t.closest(e))!=null?i:t.querySelector(e)}var ft=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this),this.hasSlotController=new at(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Pn:t?Vn:bi}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let i=t.target.closest("sl-radio, sl-radio-button"),e=this.getAllRadios(),r=this.value;!i||i.disabled||(this.value=i.value,e.forEach(o=>o.checked=o===i),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var i;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let e=this.getAllRadios().filter(c=>!c.disabled),r=(i=e.find(c=>c.checked))!=null?i:e[0],o=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=e.indexOf(r)+o;n<0&&(n=e.length-1),n>e.length-1&&(n=0),this.getAllRadios().forEach(c=>{c.checked=false,this.hasButtonGroup||c.setAttribute("tabindex","-1");}),this.value=e[n].value,e[n].checked=true,this.hasButtonGroup?e[n].shadowRoot.querySelector("button").focus():(e[n].setAttribute("tabindex","0"),e[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,i;let e=this.getAllRadios();if(await Promise.all(e.map(async r=>{await r.updateComplete,r.checked=r.value===this.value,r.size=this.size;})),this.hasButtonGroup=e.some(r=>r.tagName.toLowerCase()==="sl-radio-button"),e.length>0&&!e.some(r=>r.checked))if(this.hasButtonGroup){let r=(t=e[0].shadowRoot)==null?void 0:t.querySelector("button");r&&r.setAttribute("tabindex","0");}else e[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let r=(i=this.shadowRoot)==null?void 0:i.querySelector("sl-button-group");r&&(r.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(i=>i.checked=i.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,i=this.customValidityMessage!=="";return t||i?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let i=this.getAllRadios(),e=i.find(s=>s.checked),r=i.find(s=>!s.disabled),o=e||r;o&&o.focus(t);}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!i,o=u`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return u`
      <fieldset
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":e,"form-control--has-help-text":r})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${e?"false":"true"}
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

          ${this.hasButtonGroup?u`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${o}
                </sl-button-group>
              `:o}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};ft.styles=[P,Tt,Hn];ft.dependencies={"sl-button-group":Oe};a([$("slot:not([name])")],ft.prototype,"defaultSlot",2);a([$(".radio-group__validation-input")],ft.prototype,"validationInput",2);a([k()],ft.prototype,"hasButtonGroup",2);a([k()],ft.prototype,"errorMessage",2);a([k()],ft.prototype,"defaultValue",2);a([p()],ft.prototype,"label",2);a([p({attribute:"help-text"})],ft.prototype,"helpText",2);a([p()],ft.prototype,"name",2);a([p({reflect:true})],ft.prototype,"value",2);a([p({reflect:true})],ft.prototype,"size",2);a([p({reflect:true})],ft.prototype,"form",2);a([p({type:Boolean,reflect:true})],ft.prototype,"required",2);a([E("size",{waitUntilFirstUpdate:true})],ft.prototype,"handleSizeChange",1);a([E("value")],ft.prototype,"handleValueChange",1);ft.define("sl-radio-group");exports.AutoFieldRadio=class Qi extends R{getInitialOptions(){return {card:false,select:[],valueKey:"value"}}renderOptionItemWithCard(i,e){if(this.options.card){let r=e[this.options.valueKey]||e.label,o=this.value===r;return u`<div
                class="card"
                style=${J({width:this.options.itemWidth})}
            >
                <div class="body ${o?"selected":""}">
                    <sl-icon class="icon" name="settings"></sl-icon>
                    ${i}
                </div>
            </div>`}else return i}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(i){let e=i[this.options.valueKey]||i.label;return u`<sl-radio
            value="${e}"
            style=${J({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
            >${i.label}<br /><span class="memo">${i.tips}</span></sl-radio
        >`}renderInput(){let i=this.options.select.map(e=>{let r={};return typeof e=="object"?Object.assign(r,e):Object.assign(r,{label:e}),r});return u`
            <sl-radio-group class="value" name=${this.name} value="${this.value}" size="${this.context.size}" @sl-change=${this.onRadioChange.bind(this)}>
                ${i.map(e=>this.renderOptionItemWithCard(this.renderOptionItem(e),e))}
            </sl-radio-group>
        `}};exports.AutoFieldRadio.styles=[R.styles,y`
            sl-radio-group::part(form-control-input) {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
            }
            sl-icon::part(svg) {
                stroke-width: 1;
            }
            sl-radio {
                position: relative;
                & .memo {
                    color: var(--sl-color-gray-500);
                    font-size: 0.8em;
                    max-height: 2.8em;
                    overflow: hidden;
                    display: -webkit-box;
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
                        background-color: var(--sl-color-primary-50);
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
                        color: var(--sl-color-gray-500);
                        padding-top: 0px;
                        padding-left: 0px;
                        font-size: calc(2 * var(--auto-font-size));
                    }
                }
            }
        `],exports.AutoFieldRadio=v([I("auto-field-radio")],exports.AutoFieldRadio);var Bn=y`
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
`;var K=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new at(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,i,e="none"){this.input.setSelectionRange(t,i,e);}setRangeText(t,i,e,r="preserve"){let o=i??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,o,s,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!i;return u`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${e?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${L({textarea:true,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${w(this.name)}
              .value=${kt(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${w(this.placeholder)}
              rows=${w(this.rows)}
              minlength=${w(this.minlength)}
              maxlength=${w(this.maxlength)}
              autocapitalize=${w(this.autocapitalize)}
              autocorrect=${w(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${w(this.spellcheck)}
              enterkeyhint=${w(this.enterkeyhint)}
              inputmode=${w(this.inputmode)}
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
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};K.styles=[P,Tt,Bn];a([$(".textarea__control")],K.prototype,"input",2);a([$(".textarea__size-adjuster")],K.prototype,"sizeAdjuster",2);a([k()],K.prototype,"hasFocus",2);a([p()],K.prototype,"title",2);a([p()],K.prototype,"name",2);a([p()],K.prototype,"value",2);a([p({reflect:true})],K.prototype,"size",2);a([p({type:Boolean,reflect:true})],K.prototype,"filled",2);a([p()],K.prototype,"label",2);a([p({attribute:"help-text"})],K.prototype,"helpText",2);a([p()],K.prototype,"placeholder",2);a([p({type:Number})],K.prototype,"rows",2);a([p()],K.prototype,"resize",2);a([p({type:Boolean,reflect:true})],K.prototype,"disabled",2);a([p({type:Boolean,reflect:true})],K.prototype,"readonly",2);a([p({reflect:true})],K.prototype,"form",2);a([p({type:Boolean,reflect:true})],K.prototype,"required",2);a([p({type:Number})],K.prototype,"minlength",2);a([p({type:Number})],K.prototype,"maxlength",2);a([p()],K.prototype,"autocapitalize",2);a([p()],K.prototype,"autocorrect",2);a([p()],K.prototype,"autocomplete",2);a([p({type:Boolean})],K.prototype,"autofocus",2);a([p()],K.prototype,"enterkeyhint",2);a([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],K.prototype,"spellcheck",2);a([p()],K.prototype,"inputmode",2);a([Ft()],K.prototype,"defaultValue",2);a([E("disabled",{waitUntilFirstUpdate:true})],K.prototype,"handleDisabledChange",1);a([E("rows",{waitUntilFirstUpdate:true})],K.prototype,"handleRowsChange",1);a([E("value",{waitUntilFirstUpdate:true})],K.prototype,"handleValueChange",1);K.define("sl-textarea");exports.AutoFieldTextArea=class Zi extends R{renderInput(){return u`
            <sl-textarea
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                placeholder="${w(this.options.placeholder)}"
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
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea.styles=[R.styles,y`
            sl-textarea::part(textarea) {
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTextArea=v([I("auto-field-textarea")],exports.AutoFieldTextArea);var Wn=y`
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
`;var yt=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,i)=>t.checked=i}),this.hasSlotController=new at(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),i=this.helpText?true:!!t;return u`
      <div
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":i})}
      >
        <label
          part="base"
          class=${L({switch:true,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${w(this.value)}
            .checked=${kt(this.checked)}
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
          aria-hidden=${i?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};yt.styles=[P,Tt,Wn];a([$('input[type="checkbox"]')],yt.prototype,"input",2);a([k()],yt.prototype,"hasFocus",2);a([p()],yt.prototype,"title",2);a([p()],yt.prototype,"name",2);a([p()],yt.prototype,"value",2);a([p({reflect:true})],yt.prototype,"size",2);a([p({type:Boolean,reflect:true})],yt.prototype,"disabled",2);a([p({type:Boolean,reflect:true})],yt.prototype,"checked",2);a([Ft("checked")],yt.prototype,"defaultChecked",2);a([p({reflect:true})],yt.prototype,"form",2);a([p({type:Boolean,reflect:true})],yt.prototype,"required",2);a([p({attribute:"help-text"})],yt.prototype,"helpText",2);a([E("checked",{waitUntilFirstUpdate:true})],yt.prototype,"handleCheckedChange",1);a([E("disabled",{waitUntilFirstUpdate:true})],yt.prototype,"handleDisabledChange",1);yt.define("sl-switch");exports.AutoFieldSwitch=class Ji extends R{renderInput(){return u`
            <sl-switch
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                value="${this.options.switchValues[0]}"
                .checked=${this._isChecked()}
                ?disabled=${!this.options.enable}
                size="${w(this.context.size)}"
                placeholder="${w(this.options.placeholder)}"
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-switch
            >
        `}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let i=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof i=="boolean"?"":i}}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return u` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `}};exports.AutoFieldSwitch.styles=[R.styles,y`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=v([I("auto-field-switch")],exports.AutoFieldSwitch);var Kr=y`
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
`;var Nn=y`
  ${Kr}

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
`;var Un=Symbol.for(""),hc=t=>{if(t?.r===Un)return t?._$litStatic$};var vi=(t,...i)=>({_$litStatic$:i.reduce((e,r,o)=>e+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[o+1],t[0]),r:Un}),jn=new Map,es=t=>(i,...e)=>{let r=e.length,o,s,n=[],c=[],l,h=0,m=false;for(;h<r;){for(l=i[h];h<r&&(s=e[h],(o=hc(s))!==void 0);)l+=o+i[++h],m=true;h!==r&&c.push(s),n.push(l),h++;}if(h===r&&n.push(i[r]),m){let d=n.join("$$lit$$");(i=jn.get(d))===void 0&&(n.raw=n,jn.set(d,i=n)),e=c;}return t(i,...e)},Te=es(u);var Bt=class extends V{constructor(){super(...arguments),this.hasSlotController=new at(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return Te`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${L({button:true,"button--default":true,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":true,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${w(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Bt.styles=[P,Nn];a([$(".button")],Bt.prototype,"input",2);a([$(".hidden-input")],Bt.prototype,"hiddenInput",2);a([k()],Bt.prototype,"hasFocus",2);a([p({type:Boolean,reflect:true})],Bt.prototype,"checked",2);a([p()],Bt.prototype,"value",2);a([p({type:Boolean,reflect:true})],Bt.prototype,"disabled",2);a([p({reflect:true})],Bt.prototype,"size",2);a([p({type:Boolean,reflect:true})],Bt.prototype,"pill",2);a([E("disabled",{waitUntilFirstUpdate:true})],Bt.prototype,"handleDisabledChange",1);Bt.define("sl-radio-button");exports.AutoFieldRadioButton=class tr extends R{getInitialOptions(){return {valueKey:"value"}}renderRadioItem(i){let e=i[this.options.valueKey];return u`<sl-radio-button value="${e}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${i.label}</sl-radio-button>`}renderInput(){let i=this.getOptionValue("select",[]).map((e,r)=>{let o={};return typeof e=="object"?Object.assign(o,e):Object.assign(o,{label:e,value:r+1}),o});return u`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${i.map(e=>this.renderRadioItem(e))}
            </sl-radio-group>
        `}};exports.AutoFieldRadioButton.styles=[R.styles,y`
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
        `],exports.AutoFieldRadioButton=v([I("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class Gr extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=v([I("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class Yr extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=v([I("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class Xr extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=v([I("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class Qr extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=v([I("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class Zr extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();let i=this.context.store.schemas.getValidator(this.path);(!i||typeof i.validate!="function")&&this.context.store.schemas.addValidator(this.path,{validate:e=>this._isEmail(e),message:"\u65E0\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740",onFail:"throw-pass"});}_isEmail(i){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(i)}};exports.AutoFieldEmail=v([I("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class Jr extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=v([I("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class to extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=v([I("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class eo extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=v([I("auto-field-phone")],exports.AutoFieldPhone);var io=class{constructor(i,e){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=i,this.options={...this.options,...e},i.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(i){let e=i.target;if(this.isPreviewActive){this.closePreview();return}e.matches(this.options.selector)&&(i.preventDefault(),i.stopPropagation(),this.originalImage=e,this.showPreview(this.originalImage));}showPreview(i){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let e=this.options.overlayColor,r=this.hexToRgb(e);this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=i.src,this.previewImage.alt=i.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let o=i.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${o.top}px`,this.previewImage.style.left=`${o.left}px`,this.previewImage.style.width=`${o.width}px`,this.previewImage.style.height=`${o.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",this.closePreview.bind(this)),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:c,height:l}=this.calculateAspectRatioFit(i.naturalWidth,i.naturalHeight,s*.9,n*.9),h=(n-l)/2,m=(s-c)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${h}px`,this.previewImage.style.left=`${m}px`,this.previewImage.style.width=`${c}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let i=window.innerWidth,e=window.innerHeight,{width:r,height:o}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,i*.9,e*.9),s=(e-o)/2,n=(i-r)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${r}px`,this.previewImage.style.height=`${o}px`);});}handleKeydown(i){i.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let i=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`;});let e=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${e.r}, ${e.g}, ${e.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(i,e,r,o){if(i<=r&&e<=o)return {width:i,height:e};let s=Math.min(r/i,o/e);return {width:i*s,height:e*s}}hexToRgb(i){i=i.replace(/^#/,""),i.length===3&&(i=i.split("").map(s=>s+s).join(""));let e=parseInt(i.substring(0,2),16),r=parseInt(i.substring(2,4),16),o=parseInt(i.substring(4,6),16);return {r:isNaN(e)?0:e,g:isNaN(r)?0:r,b:isNaN(o)?0:o}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var is=class{constructor(i,e){for(this.options=Object.assign({width:"8px"},e),this.target=i,this.content=i.firstElementChild,this.direction=window.getComputedStyle(this.target).direction,this.scrollRatio=1,this.bar=null,this.wrapper=document.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=document.createElement("div"),this.el.setAttribute("class","ss-content"),this.direction==="rtl"&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",'<div class="ss-scroll">'),this.bar=this.target.lastChild,this.bar.style.width=this.options.width,this.mB=this.moveBar.bind(this),this.dragDealer(this.bar),this.moveBar(),window.addEventListener("resize",this.mB),this.el.addEventListener("scroll",this.mB),this.el.addEventListener("mouseenter",this.mB),this.target.classList.add("ss-container");let r=window.getComputedStyle(i);r.height==="0px"&&r["max-height"]!=="0px"&&(i.style.height=r["max-height"]);}dragDealer(i){let e,r=n=>{let c=n.pageY-e;e=n.pageY,this.requestAnimationFrame(()=>{this.el&&(this.el.scrollTop+=c/this.scrollRatio);});},o=()=>{i.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o);},s=n=>(e=n.pageY,i.classList.add("ss-grabbed"),document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",r),document.addEventListener("mouseup",o),false);i.mouseDownHandler=s,i.addEventListener("mousedown",s);}requestAnimationFrame(i){window.requestAnimationFrame?window.requestAnimationFrame(i):window.setTimeout(i,0);}moveBar(){if(!this.el||!this.target)return;let i=this.el.scrollHeight,e=this.el.clientHeight;this.scrollRatio=e/i;let o=this.direction==="rtl"&&this.bar?this.target.clientWidth-this.bar.clientWidth+18:this.bar?(this.target.clientWidth-this.bar.clientWidth)*-1:0;this.requestAnimationFrame(()=>{this.scrollRatio>=1?this.bar?.classList.add("ss-hidden"):(this.bar?.classList.remove("ss-hidden"),this.bar&&(this.bar.style.cssText="height:"+Math.max(this.scrollRatio*100,10)+"%; top:"+this.el.scrollTop/i*100+"%;right:"+o+"px;"));});}destroy(){if(window.removeEventListener("resize",this.mB),this.el&&(this.el.removeEventListener("scroll",this.mB),this.el.removeEventListener("mouseenter",this.mB)),this.bar?.mouseDownHandler&&(this.bar.removeEventListener("mousedown",this.bar.mouseDownHandler),delete this.bar.mouseDownHandler),this.target){this.target.classList.remove("ss-container");try{this.content&&this.wrapper&&this.target.insertBefore(this.content,this.wrapper),this.wrapper&&this.target.removeChild(this.wrapper);}catch(i){console.error("Error restoring DOM structure during scrollbar destroy:",i);}if(this.bar){try{this.target.removeChild(this.bar);}catch(i){console.error("Error removing scrollbar during destroy:",i);}this.bar=null;}}this.target=null,this.content=null,this.wrapper=null,this.el=null,this.mB=null;}},Ie=class{constructor(i){this._scrollbars=[];this.host=i,i.addController(this);}static{this.styles=y`
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
    `;}create(i,e){let r=new is(i,e);return this._scrollbars.push(r),r}hostConnected(){}hostUpdate(){}hostDisconnected(){for(let i of this._scrollbars)i.destroy();this._scrollbars=[];}};var uc=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],mc=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function fc(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return uc.includes(`.${r}`)}function gc(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return mc.includes(`.${r}`)}exports.AutoFieldUpload=class yi extends R{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new io(this);}retryUpload(e){this.startUpload(e.file,e.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:true}}_getDefaultFileLabel(e){return typeof e=="string"?e:e.title||e.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(e=>e!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(e){let r=e.target;if(!r.files||r.files.length===0)return;Array.from(r.files).forEach(s=>this.uploadFile(s)),r.value="";}handleDragOver(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(e){if(e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!e.dataTransfer?.files)return;let o=Array.from(e.dataTransfer.files);if(!this.options?.multiple&&o.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=o.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(c=>c==="*"?true:c.startsWith(".")?n.name.toLowerCase().endsWith(c.toLowerCase()):n.type.startsWith(c)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}o.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(e){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let r={id:this.generateId(),file:e,progress:0,status:"uploading",value:{url:e.name}};return this.files.push(r),this.startUpload(e,r.id)}_updateFileRecord(e,r){let o=this.files.findIndex(s=>s.id===e);o!==-1&&(this.files=[...this.files.slice(0,o),{...this.files[o],...r},...this.files.slice(o+1)]);}_getResponseError(e){let r="\u4E0A\u4F20\u5931\u8D25";try{let o=JSON.parse(e.responseText);r=o.message||o.error||r;}catch{switch(e.status){case 400:r="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:r="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:r="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:r="\u6587\u4EF6\u592A\u5927";break;case 415:r="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:r="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:r="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:r=`\u4E0A\u4F20\u5931\u8D25 (${e.status})`;}}return new Error(r)}_defaultFileResolver(e){if(typeof e=="string")return e;if(typeof e=="object"){if(!e.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return e}}_parseUploadResponse(e){let r={};try{Object.assign(r,JSON.parse(e));}catch{r=e;}return typeof this.options.onResolve=="function"&&(r=this.options.onResolve(r)),r}async startUpload(e,r){let o=this.files.findIndex(n=>n.id===r);if(o===-1)return;let s=this.files[o];return new Promise((n,c)=>{let l=new XMLHttpRequest,h=new FormData;h.append(this.options.fileFieldName,e),l.upload.onprogress=m=>{if(m.lengthComputable){let d=Math.round(m.loaded/m.total*100);this._updateFileRecord(r,{progress:d});}},l.onload=()=>{if(this.files.findIndex(d=>d.id===r)!==-1)if(l.status>=200&&l.status<300){this._updateFileRecord(r,{status:"done"});try{let d=this._parseUploadResponse(l.responseText);this._updateFileRecord(r,{value:d}),s.status="done",this.onFieldChange(),n();}catch{let d=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(r,d),c(d);}}else {let d=this._getResponseError(l);this.handleUploadError(r,d),c(d);}},l.onerror=()=>{if(this.files.findIndex(f=>f.id===r)===-1)return;let d=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(r,d),c(d);},l.ontimeout=()=>{if(this.files.findIndex(f=>f.id===r)===-1)return;let d=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(r,d),c(d);},l.open("POST",this.options.url),this._updateFileRecord(r,{progress:0,status:"uploading"}),l.send(h);})}handleUploadError(e,r){this._updateFileRecord(e,{error:r.message,status:"error"});}deleteFile(e){let r=this.files.findIndex(c=>c.id===e);if(r===-1)return;let o=this.files[r],s=o.status==="uploading"||o.status==="error",n=()=>{this.files=[...this.files.slice(0,r),...this.files.slice(r+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,o.value)).then(()=>{n(),this.onFieldChange();}).catch(c=>{alert(c.message);}):(n(),this.onFieldChange());}getInputValue(){if(this.options.multiple){let e=this.files.map(r=>r.value);return this.options.onlyFileUrl?e.map(r=>typeof r=="object"?r.url:r):e}else {let e=this.files.length>0?this.files[0].value:void 0;if(e)return this.options.onlyFileUrl&&typeof e=="object"?e.url:e}}getStateValue(){let e=super.getStateValue();return Array.isArray(e)||(e=[e]),this.files=e.map((r,o)=>{let s={id:String(o),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof r=="string"?s.value=r:typeof r=="object"&&(s.value=Object.assign({},s.value,r)),s}),e}renderProgressbar(e,r){if(e.status!=="uploading")return;let o=r==="hori"?`width:${e.progress}%;`:`height:${e.progress}%;top:${100-e.progress}%`;return u`<span
            class="uploading progressbar ${L({hori:r==="hori",vert:r==="vert"})}"
            style="${o}"
        >
            <span class="value">${e.progress}%</span>
        </span> `}renderFileContent(e){if(e.error)return;let r=typeof e.value=="string"?e.value:e.value.url,o;if(fc(r))o=u` <img class="content" src="${r}" /> `;else if(gc(r))o=u` <video class="content" src="${r}"></video> `;else {let s=r.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,o=u`<div class="content">${s}</div>`;}return o}renderFilePreview(e){let r=!!e.error,o=typeof this.options.preview=="boolean"?"80px":this.options.preview;return u`
            <div
                class="file preview ${L({error:r})}"
                title=${e.error||this.options.onFileLabel(e.value)}
                style="${J({width:o,height:o})}"
            >
                ${this.renderFileContent(e)} ${this.renderProgressbar(e,"vert")}
                ${B(e.status==="error",()=>u`<div class="error" title="${e.error}">
                            <span>上传出错</span>
                            <span>
                                <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                                <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>
                            </span>
                        </div>`,()=>{if(!this.context.viewonly)return u`<sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>`})}
            </div>
        `}renderFile(e){let r=!!e.error;return u`
            <auto-flex class="file default ${L({error:r})}" wrap align="center" gap="0.5rem" title=${w(e.error)}>
                ${this.renderProgressbar(e,"hori")}
                <span class="label">${this.options.onFileLabel(e.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                ${B(e.status==="error",()=>u`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>`)}
            </auto-flex>
        `}renderFiels(){return u`<auto-flex class="files" grow="none" gap="0.5rem" wrap>
            ${B(this.files.length>0,()=>et(this.files,e=>this.options.preview?this.renderFilePreview(e):this.renderFile(e)),()=>u`<span class="placeholder">${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </auto-flex>`}renderInput(){return u`
            <auto-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${B(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>u`<div
                        class="indicator"
                        @click=${this.handleUploadClick}
                        @dragover=${this.handleDragOver}
                        @dragleave=${this.handleDragLeave}
                        @drop=${this.handleDrop}
                    >
                        ${this.options.tips}
                    </div>`)}
                <auto-flex class="actions" align="center" grow=".actions.after" gap="0.5rem">
                    ${B(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>u`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}
                    ${this.renderActions(false)}
                </auto-flex>
            </auto-flex>
        `}renderView(){return this.renderFiels()}};exports.AutoFieldUpload.styles=[R.styles,y`
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
                        background-color: var(--auto-workspace-color);
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
                        background-color: var(--auto-workspace-color);
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
                color: var(--auto-gray-color);
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
        `],v([k()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=v([I("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class ro extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=v([I("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class er extends R{getInitialOptions(){return {size:"medium"}}_onPartFocus(i){i.target.select();}_getIpBits(){let i=this.value?.split(".");return [parseInt(i[0]||"0"),parseInt(i[1]||"0"),parseInt(i[2]||"0"),parseInt(i[3]||"0")]}_onIpChange(i,e){this.onFieldChange(),this._isLastInput(e);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(e=>e.value).join(".")}_isLastInput(i){let e=i.target;if(e.value.length>=3){e.blur();let r=e.nextElementSibling?.nextElementSibling;r&&(r.focus(),r.select());}}_onPaste(i){i.preventDefault();let e=i.target,r=i.clipboardData?.getData("text/plain")||"",o=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=r.match(o);if(!s)return;let n=[],c=e;for(let l=0;l<4&&c;l++)c.tagName==="SL-INPUT"&&n.push(c),c=c.nextElementSibling?.nextElementSibling;for(let l=0;l<Math.min(4,n.length);l++)n[l].value=s[l+1],n[l].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let l=n[Math.min(3,n.length-1)];l.focus(),l.select();}}renderInput(){return u`
            <auto-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((i,e)=>u`
                        <sl-input
                            value="${i}"
                            name=${this.name}
                            data-path=${this.path}
                            defaultValue="0"
                            size=${this.context.size}
                            maxLength="3"
                            minLength="1"
                            max="255"
                            min="0"
                            @sl-input=${r=>this._onIpChange(e,r)}
                            @sl-change=${r=>this._onIpChange(e,r)}
                            @sl-focus=${this._onPartFocus.bind(this)}
                            @paste=${r=>this._onPaste(r)}
                        ></sl-input>
                        ${e<3?u`<span class="dot">.</span>`:""}
                    `)}
            </auto-flex>
        `}};exports.AutoFieldIpAddress.styles=[R.styles,y`
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
        `],exports.AutoFieldIpAddress=v([I("auto-field-ipaddress")],exports.AutoFieldIpAddress);var qn=y`
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
`;var Kn=y`
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
`;var lt=class extends V{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,i=t?vi`a`:vi`button`;return Te`
      <${i}
        part="base"
        class=${L({"icon-button":true,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${w(t?void 0:this.disabled)}
        type=${w(t?void 0:"button")}
        href=${w(t?this.href:void 0)}
        target=${w(t?this.target:void 0)}
        download=${w(t?this.download:void 0)}
        rel=${w(t&&this.target?"noreferrer noopener":void 0)}
        role=${w(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${w(this.name)}
          library=${w(this.library)}
          src=${w(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${i}>
    `}};lt.styles=[P,Kn];lt.dependencies={"sl-icon":q};a([$(".icon-button")],lt.prototype,"button",2);a([k()],lt.prototype,"hasFocus",2);a([p()],lt.prototype,"name",2);a([p()],lt.prototype,"library",2);a([p()],lt.prototype,"src",2);a([p()],lt.prototype,"href",2);a([p()],lt.prototype,"target",2);a([p()],lt.prototype,"download",2);a([p()],lt.prototype,"label",2);a([p({type:Boolean,reflect:true})],lt.prototype,"disabled",2);var rs=new Set,xi=new Map,je,os="ltr",ss="en",Gn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Gn){let t=new MutationObserver(Yn);os=document.documentElement.dir||"ltr",ss=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function ir(...t){t.map(i=>{let e=i.$code.toLowerCase();xi.has(e)?xi.set(e,Object.assign(Object.assign({},xi.get(e)),i)):xi.set(e,i),je||(je=i);}),Yn();}function Yn(){Gn&&(os=document.documentElement.dir||"ltr",ss=document.documentElement.lang||navigator.language),[...rs.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var oo=class{constructor(i){this.host=i,this.host.addController(this);}hostConnected(){rs.add(this.host);}hostDisconnected(){rs.delete(this.host);}dir(){return `${this.host.dir||os}`.toLowerCase()}lang(){return `${this.host.lang||ss}`.toLowerCase()}getTranslationData(i){var e,r;let o=new Intl.Locale(i.replace(/_/g,"-")),s=o?.language.toLowerCase(),n=(r=(e=o?.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&r!==void 0?r:"",c=xi.get(`${s}-${n}`),l=xi.get(s);return {locale:o,language:s,region:n,primary:c,secondary:l}}exists(i,e){var r;let{primary:o,secondary:s}=this.getTranslationData((r=e.lang)!==null&&r!==void 0?r:this.lang());return e=Object.assign({includeFallback:false},e),!!(o&&o[i]||s&&s[i]||e.includeFallback&&je&&je[i])}term(i,...e){let{primary:r,secondary:o}=this.getTranslationData(this.lang()),s;if(r&&r[i])s=r[i];else if(o&&o[i])s=o[i];else if(je&&je[i])s=je[i];else return console.error(`No translation found for: ${String(i)}`),String(i);return typeof s=="function"?s(...e):s}date(i,e){return i=new Date(i),new Intl.DateTimeFormat(this.lang(),e).format(i)}number(i,e){return i=Number(i),isNaN(i)?"":new Intl.NumberFormat(this.lang(),e).format(i)}relativeTime(i,e,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(i,e)}};var Xn={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,i)=>`Go to slide ${t} of ${i}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};ir(Xn);var Qn=Xn;var W=class extends oo{};ir(Qn);var se=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return u`
      <span
        part="base"
        class=${L({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?u`
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
    `}};se.styles=[P,qn];se.dependencies={"sl-icon-button":lt};a([p({reflect:true})],se.prototype,"variant",2);a([p({reflect:true})],se.prototype,"size",2);a([p({type:Boolean,reflect:true})],se.prototype,"pill",2);a([p({type:Boolean})],se.prototype,"removable",2);var Zn=y`
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
`;function bc(t,i){return {top:Math.round(t.getBoundingClientRect().top-i.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-i.getBoundingClientRect().left)}}function rr(t,i,e="vertical",r="smooth"){let o=bc(t,i),s=o.top+i.scrollTop,n=o.left+i.scrollLeft,c=i.scrollLeft,l=i.scrollLeft+i.offsetWidth,h=i.scrollTop,m=i.scrollTop+i.offsetHeight;(e==="horizontal"||e==="both")&&(n<c?i.scrollTo({left:n,behavior:r}):n+t.clientWidth>l&&i.scrollTo({left:n-i.offsetWidth+t.clientWidth,behavior:r})),(e==="vertical"||e==="both")&&(s<h?i.scrollTo({top:s,behavior:r}):s+t.clientHeight>m&&i.scrollTo({top:s-i.offsetHeight+t.clientHeight,behavior:r}));}var Jn=y`
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
`;var ne=Math.min,$t=Math.max,sr=Math.round,nr=Math.floor,Jt=t=>({x:t,y:t}),vc={left:"right",right:"left",bottom:"top",top:"bottom"},yc={start:"end",end:"start"};function no(t,i,e){return $t(t,ne(i,e))}function Ue(t,i){return typeof t=="function"?t(i):t}function me(t){return t.split("-")[0]}function qe(t){return t.split("-")[1]}function ns(t){return t==="x"?"y":"x"}function ao(t){return t==="y"?"height":"width"}function fe(t){return ["top","bottom"].includes(me(t))?"y":"x"}function lo(t){return ns(fe(t))}function ta(t,i,e){e===void 0&&(e=false);let r=qe(t),o=lo(t),s=ao(o),n=o==="x"?r===(e?"end":"start")?"right":"left":r==="start"?"bottom":"top";return i.reference[s]>i.floating[s]&&(n=or(n)),[n,or(n)]}function ea(t){let i=or(t);return [so(t),i,so(i)]}function so(t){return t.replace(/start|end/g,i=>yc[i])}function xc(t,i,e){let r=["left","right"],o=["right","left"],s=["top","bottom"],n=["bottom","top"];switch(t){case "top":case "bottom":return e?i?o:r:i?r:o;case "left":case "right":return i?s:n;default:return []}}function ia(t,i,e,r){let o=qe(t),s=xc(me(t),e==="start",r);return o&&(s=s.map(n=>n+"-"+o),i&&(s=s.concat(s.map(so)))),s}function or(t){return t.replace(/left|right|bottom|top/g,i=>vc[i])}function _c(t){return {top:0,right:0,bottom:0,left:0,...t}}function as(t){return typeof t!="number"?_c(t):{top:t,right:t,bottom:t,left:t}}function Ke(t){let{x:i,y:e,width:r,height:o}=t;return {width:r,height:o,top:e,left:i,right:i+r,bottom:e+o,x:i,y:e}}function ra(t,i,e){let{reference:r,floating:o}=t,s=fe(i),n=lo(i),c=ao(n),l=me(i),h=s==="y",m=r.x+r.width/2-o.width/2,d=r.y+r.height/2-o.height/2,f=r[c]/2-o[c]/2,g;switch(l){case "top":g={x:m,y:r.y-o.height};break;case "bottom":g={x:m,y:r.y+r.height};break;case "right":g={x:r.x+r.width,y:d};break;case "left":g={x:r.x-o.width,y:d};break;default:g={x:r.x,y:r.y};}switch(qe(i)){case "start":g[n]-=f*(e&&h?-1:1);break;case "end":g[n]+=f*(e&&h?-1:1);break}return g}var oa=async(t,i,e)=>{let{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:n}=e,c=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(i)),h=await n.getElementRects({reference:t,floating:i,strategy:o}),{x:m,y:d}=ra(h,r,l),f=r,g={},b=0;for(let x=0;x<c.length;x++){let{name:T,fn:A}=c[x],{x:S,y:O,data:_,reset:C}=await A({x:m,y:d,initialPlacement:r,placement:f,strategy:o,middlewareData:g,rects:h,platform:n,elements:{reference:t,floating:i}});m=S??m,d=O??d,g={...g,[T]:{...g[T],..._}},C&&b<=50&&(b++,typeof C=="object"&&(C.placement&&(f=C.placement),C.rects&&(h=C.rects===true?await n.getElementRects({reference:t,floating:i,strategy:o}):C.rects),{x:m,y:d}=ra(h,f,l)),x=-1);}return {x:m,y:d,placement:f,strategy:o,middlewareData:g}};async function co(t,i){var e;i===void 0&&(i={});let{x:r,y:o,platform:s,rects:n,elements:c,strategy:l}=t,{boundary:h="clippingAncestors",rootBoundary:m="viewport",elementContext:d="floating",altBoundary:f=false,padding:g=0}=Ue(i,t),b=as(g),T=c[f?d==="floating"?"reference":"floating":d],A=Ke(await s.getClippingRect({element:(e=await(s.isElement==null?void 0:s.isElement(T)))==null||e?T:T.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:h,rootBoundary:m,strategy:l})),S=d==="floating"?{x:r,y:o,width:n.floating.width,height:n.floating.height}:n.reference,O=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),_=await(s.isElement==null?void 0:s.isElement(O))?await(s.getScale==null?void 0:s.getScale(O))||{x:1,y:1}:{x:1,y:1},C=Ke(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:S,offsetParent:O,strategy:l}):S);return {top:(A.top-C.top+b.top)/_.y,bottom:(C.bottom-A.bottom+b.bottom)/_.y,left:(A.left-C.left+b.left)/_.x,right:(C.right-A.right+b.right)/_.x}}var sa=t=>({name:"arrow",options:t,async fn(i){let{x:e,y:r,placement:o,rects:s,platform:n,elements:c,middlewareData:l}=i,{element:h,padding:m=0}=Ue(t,i)||{};if(h==null)return {};let d=as(m),f={x:e,y:r},g=lo(o),b=ao(g),x=await n.getDimensions(h),T=g==="y",A=T?"top":"left",S=T?"bottom":"right",O=T?"clientHeight":"clientWidth",_=s.reference[b]+s.reference[g]-f[g]-s.floating[b],C=f[g]-s.reference[g],D=await(n.getOffsetParent==null?void 0:n.getOffsetParent(h)),F=D?D[O]:0;(!F||!await(n.isElement==null?void 0:n.isElement(D)))&&(F=c.floating[O]||s.floating[b]);let U=_/2-C/2,M=F/2-x[b]/2-1,z=ne(d[A],M),pt=ne(d[S],M),st=z,_t=F-x[b]-pt,Ct=F/2-x[b]/2+U,wt=no(st,Ct,_t),ye=!l.arrow&&qe(o)!=null&&Ct!==wt&&s.reference[b]/2-(Ct<st?z:pt)-x[b]/2<0,ce=ye?Ct<st?Ct-st:Ct-_t:0;return {[g]:f[g]+ce,data:{[g]:wt,centerOffset:Ct-wt-ce,...ye&&{alignmentOffset:ce}},reset:ye}}});var na=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(i){var e,r;let{placement:o,middlewareData:s,rects:n,initialPlacement:c,platform:l,elements:h}=i,{mainAxis:m=true,crossAxis:d=true,fallbackPlacements:f,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=true,...T}=Ue(t,i);if((e=s.arrow)!=null&&e.alignmentOffset)return {};let A=me(o),S=fe(c),O=me(c)===c,_=await(l.isRTL==null?void 0:l.isRTL(h.floating)),C=f||(O||!x?[or(c)]:ea(c)),D=b!=="none";!f&&D&&C.push(...ia(c,x,b,_));let F=[c,...C],U=await co(i,T),M=[],z=((r=s.flip)==null?void 0:r.overflows)||[];if(m&&M.push(U[A]),d){let wt=ta(o,n,_);M.push(U[wt[0]],U[wt[1]]);}if(z=[...z,{placement:o,overflows:M}],!M.every(wt=>wt<=0)){var pt,st;let wt=(((pt=s.flip)==null?void 0:pt.index)||0)+1,ye=F[wt];if(ye){var _t;let xe=d==="alignment"?S!==fe(ye):false,re=((_t=z[0])==null?void 0:_t.overflows[0])>0;if(!xe||re)return {data:{index:wt,overflows:z},reset:{placement:ye}}}let ce=(st=z.filter(xe=>xe.overflows[0]<=0).sort((xe,re)=>xe.overflows[1]-re.overflows[1])[0])==null?void 0:st.placement;if(!ce)switch(g){case "bestFit":{var Ct;let xe=(Ct=z.filter(re=>{if(D){let _e=fe(re.placement);return _e===S||_e==="y"}return  true}).map(re=>[re.placement,re.overflows.filter(_e=>_e>0).reduce((_e,Ol)=>_e+Ol,0)]).sort((re,_e)=>re[1]-_e[1])[0])==null?void 0:Ct[0];xe&&(ce=xe);break}case "initialPlacement":ce=c;break}if(o!==ce)return {reset:{placement:ce}}}return {}}}};async function wc(t,i){let{placement:e,platform:r,elements:o}=t,s=await(r.isRTL==null?void 0:r.isRTL(o.floating)),n=me(e),c=qe(e),l=fe(e)==="y",h=["left","top"].includes(n)?-1:1,m=s&&l?-1:1,d=Ue(i,t),{mainAxis:f,crossAxis:g,alignmentAxis:b}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return c&&typeof b=="number"&&(g=c==="end"?b*-1:b),l?{x:g*m,y:f*h}:{x:f*h,y:g*m}}var aa=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(i){var e,r;let{x:o,y:s,placement:n,middlewareData:c}=i,l=await wc(i,t);return n===((e=c.offset)==null?void 0:e.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:o+l.x,y:s+l.y,data:{...l,placement:n}}}}},la=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(i){let{x:e,y:r,placement:o}=i,{mainAxis:s=true,crossAxis:n=false,limiter:c={fn:T=>{let{x:A,y:S}=T;return {x:A,y:S}}},...l}=Ue(t,i),h={x:e,y:r},m=await co(i,l),d=fe(me(o)),f=ns(d),g=h[f],b=h[d];if(s){let T=f==="y"?"top":"left",A=f==="y"?"bottom":"right",S=g+m[T],O=g-m[A];g=no(S,g,O);}if(n){let T=d==="y"?"top":"left",A=d==="y"?"bottom":"right",S=b+m[T],O=b-m[A];b=no(S,b,O);}let x=c.fn({...i,[f]:g,[d]:b});return {...x,data:{x:x.x-e,y:x.y-r,enabled:{[f]:s,[d]:n}}}}}};var ca=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(i){var e,r;let{placement:o,rects:s,platform:n,elements:c}=i,{apply:l=()=>{},...h}=Ue(t,i),m=await co(i,h),d=me(o),f=qe(o),g=fe(o)==="y",{width:b,height:x}=s.floating,T,A;d==="top"||d==="bottom"?(T=d,A=f===(await(n.isRTL==null?void 0:n.isRTL(c.floating))?"start":"end")?"left":"right"):(A=d,T=f==="end"?"top":"bottom");let S=x-m.top-m.bottom,O=b-m.left-m.right,_=ne(x-m[T],S),C=ne(b-m[A],O),D=!i.middlewareData.shift,F=_,U=C;if((e=i.middlewareData.shift)!=null&&e.enabled.x&&(U=O),(r=i.middlewareData.shift)!=null&&r.enabled.y&&(F=S),D&&!f){let z=$t(m.left,0),pt=$t(m.right,0),st=$t(m.top,0),_t=$t(m.bottom,0);g?U=b-2*(z!==0||pt!==0?z+pt:$t(m.left,m.right)):F=x-2*(st!==0||_t!==0?st+_t:$t(m.top,m.bottom));}await l({...i,availableWidth:U,availableHeight:F});let M=await n.getDimensions(c.floating);return b!==M.width||x!==M.height?{reset:{rects:true}}:{}}}};function po(){return typeof window<"u"}function Ge(t){return da(t)?(t.nodeName||"").toLowerCase():"#document"}function It(t){var i;return (t==null||(i=t.ownerDocument)==null?void 0:i.defaultView)||window}function te(t){var i;return (i=(da(t)?t.ownerDocument:t.document)||window.document)==null?void 0:i.documentElement}function da(t){return po()?t instanceof Node||t instanceof It(t).Node:false}function Wt(t){return po()?t instanceof Element||t instanceof It(t).Element:false}function ee(t){return po()?t instanceof HTMLElement||t instanceof It(t).HTMLElement:false}function pa(t){return !po()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof It(t).ShadowRoot}function wi(t){let{overflow:i,overflowX:e,overflowY:r,display:o}=Nt(t);return /auto|scroll|overlay|hidden|clip/.test(i+r+e)&&!["inline","contents"].includes(o)}function ha(t){return ["table","td","th"].includes(Ge(t))}function ar(t){return [":popover-open",":modal"].some(i=>{try{return t.matches(i)}catch{return  false}})}function Si(t){let i=ho(),e=Wt(t)?Nt(t):t;return ["transform","translate","scale","rotate","perspective"].some(r=>e[r]?e[r]!=="none":false)||(e.containerType?e.containerType!=="normal":false)||!i&&(e.backdropFilter?e.backdropFilter!=="none":false)||!i&&(e.filter?e.filter!=="none":false)||["transform","translate","scale","rotate","perspective","filter"].some(r=>(e.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(e.contain||"").includes(r))}function ua(t){let i=ge(t);for(;ee(i)&&!Ye(i);){if(Si(i))return i;if(ar(i))return null;i=ge(i);}return null}function ho(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}function Ye(t){return ["html","body","#document"].includes(Ge(t))}function Nt(t){return It(t).getComputedStyle(t)}function lr(t){return Wt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ge(t){if(Ge(t)==="html")return t;let i=t.assignedSlot||t.parentNode||pa(t)&&t.host||te(t);return pa(i)?i.host:i}function ma(t){let i=ge(t);return Ye(i)?t.ownerDocument?t.ownerDocument.body:t.body:ee(i)&&wi(i)?i:ma(i)}function _i(t,i,e){var r;i===void 0&&(i=[]),e===void 0&&(e=true);let o=ma(t),s=o===((r=t.ownerDocument)==null?void 0:r.body),n=It(o);if(s){let c=uo(n);return i.concat(n,n.visualViewport||[],wi(o)?o:[],c&&e?_i(c):[])}return i.concat(o,_i(o,[],e))}function uo(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function ba(t){let i=Nt(t),e=parseFloat(i.width)||0,r=parseFloat(i.height)||0,o=ee(t),s=o?t.offsetWidth:e,n=o?t.offsetHeight:r,c=sr(e)!==s||sr(r)!==n;return c&&(e=s,r=n),{width:e,height:r,$:c}}function cs(t){return Wt(t)?t:t.contextElement}function Ci(t){let i=cs(t);if(!ee(i))return Jt(1);let e=i.getBoundingClientRect(),{width:r,height:o,$:s}=ba(i),n=(s?sr(e.width):e.width)/r,c=(s?sr(e.height):e.height)/o;return (!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}var Sc=Jt(0);function va(t){let i=It(t);return !ho()||!i.visualViewport?Sc:{x:i.visualViewport.offsetLeft,y:i.visualViewport.offsetTop}}function Cc(t,i,e){return i===void 0&&(i=false),!e||i&&e!==It(t)?false:i}function Xe(t,i,e,r){i===void 0&&(i=false),e===void 0&&(e=false);let o=t.getBoundingClientRect(),s=cs(t),n=Jt(1);i&&(r?Wt(r)&&(n=Ci(r)):n=Ci(t));let c=Cc(s,e,r)?va(s):Jt(0),l=(o.left+c.x)/n.x,h=(o.top+c.y)/n.y,m=o.width/n.x,d=o.height/n.y;if(s){let f=It(s),g=r&&Wt(r)?It(r):r,b=f,x=uo(b);for(;x&&r&&g!==b;){let T=Ci(x),A=x.getBoundingClientRect(),S=Nt(x),O=A.left+(x.clientLeft+parseFloat(S.paddingLeft))*T.x,_=A.top+(x.clientTop+parseFloat(S.paddingTop))*T.y;l*=T.x,h*=T.y,m*=T.x,d*=T.y,l+=O,h+=_,b=It(x),x=uo(b);}}return Ke({width:m,height:d,x:l,y:h})}function ps(t,i){let e=lr(t).scrollLeft;return i?i.left+e:Xe(te(t)).left+e}function ya(t,i,e){e===void 0&&(e=false);let r=t.getBoundingClientRect(),o=r.left+i.scrollLeft-(e?0:ps(t,r)),s=r.top+i.scrollTop;return {x:o,y:s}}function kc(t){let{elements:i,rect:e,offsetParent:r,strategy:o}=t,s=o==="fixed",n=te(r),c=i?ar(i.floating):false;if(r===n||c&&s)return e;let l={scrollLeft:0,scrollTop:0},h=Jt(1),m=Jt(0),d=ee(r);if((d||!d&&!s)&&((Ge(r)!=="body"||wi(n))&&(l=lr(r)),ee(r))){let g=Xe(r);h=Ci(r),m.x=g.x+r.clientLeft,m.y=g.y+r.clientTop;}let f=n&&!d&&!s?ya(n,l,true):Jt(0);return {width:e.width*h.x,height:e.height*h.y,x:e.x*h.x-l.scrollLeft*h.x+m.x+f.x,y:e.y*h.y-l.scrollTop*h.y+m.y+f.y}}function $c(t){return Array.from(t.getClientRects())}function Ac(t){let i=te(t),e=lr(t),r=t.ownerDocument.body,o=$t(i.scrollWidth,i.clientWidth,r.scrollWidth,r.clientWidth),s=$t(i.scrollHeight,i.clientHeight,r.scrollHeight,r.clientHeight),n=-e.scrollLeft+ps(t),c=-e.scrollTop;return Nt(r).direction==="rtl"&&(n+=$t(i.clientWidth,r.clientWidth)-o),{width:o,height:s,x:n,y:c}}function Ec(t,i){let e=It(t),r=te(t),o=e.visualViewport,s=r.clientWidth,n=r.clientHeight,c=0,l=0;if(o){s=o.width,n=o.height;let h=ho();(!h||h&&i==="fixed")&&(c=o.offsetLeft,l=o.offsetTop);}return {width:s,height:n,x:c,y:l}}function Oc(t,i){let e=Xe(t,true,i==="fixed"),r=e.top+t.clientTop,o=e.left+t.clientLeft,s=ee(t)?Ci(t):Jt(1),n=t.clientWidth*s.x,c=t.clientHeight*s.y,l=o*s.x,h=r*s.y;return {width:n,height:c,x:l,y:h}}function fa(t,i,e){let r;if(i==="viewport")r=Ec(t,e);else if(i==="document")r=Ac(te(t));else if(Wt(i))r=Oc(i,e);else {let o=va(t);r={x:i.x-o.x,y:i.y-o.y,width:i.width,height:i.height};}return Ke(r)}function xa(t,i){let e=ge(t);return e===i||!Wt(e)||Ye(e)?false:Nt(e).position==="fixed"||xa(e,i)}function Tc(t,i){let e=i.get(t);if(e)return e;let r=_i(t,[],false).filter(c=>Wt(c)&&Ge(c)!=="body"),o=null,s=Nt(t).position==="fixed",n=s?ge(t):t;for(;Wt(n)&&!Ye(n);){let c=Nt(n),l=Si(n);!l&&c.position==="fixed"&&(o=null),(s?!l&&!o:!l&&c.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||wi(n)&&!l&&xa(t,n))?r=r.filter(m=>m!==n):o=c,n=ge(n);}return i.set(t,r),r}function Ic(t){let{element:i,boundary:e,rootBoundary:r,strategy:o}=t,n=[...e==="clippingAncestors"?ar(i)?[]:Tc(i,this._c):[].concat(e),r],c=n[0],l=n.reduce((h,m)=>{let d=fa(i,m,o);return h.top=$t(d.top,h.top),h.right=ne(d.right,h.right),h.bottom=ne(d.bottom,h.bottom),h.left=$t(d.left,h.left),h},fa(i,c,o));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Rc(t){let{width:i,height:e}=ba(t);return {width:i,height:e}}function Lc(t,i,e){let r=ee(i),o=te(i),s=e==="fixed",n=Xe(t,true,s,i),c={scrollLeft:0,scrollTop:0},l=Jt(0);function h(){l.x=ps(o);}if(r||!r&&!s)if((Ge(i)!=="body"||wi(o))&&(c=lr(i)),r){let g=Xe(i,true,s,i);l.x=g.x+i.clientLeft,l.y=g.y+i.clientTop;}else o&&h();s&&!r&&o&&h();let m=o&&!r&&!s?ya(o,c):Jt(0),d=n.left+c.scrollLeft-l.x-m.x,f=n.top+c.scrollTop-l.y-m.y;return {x:d,y:f,width:n.width,height:n.height}}function ls(t){return Nt(t).position==="static"}function ga(t,i){if(!ee(t)||Nt(t).position==="fixed")return null;if(i)return i(t);let e=t.offsetParent;return te(t)===e&&(e=e.ownerDocument.body),e}function _a(t,i){let e=It(t);if(ar(t))return e;if(!ee(t)){let o=ge(t);for(;o&&!Ye(o);){if(Wt(o)&&!ls(o))return o;o=ge(o);}return e}let r=ga(t,i);for(;r&&ha(r)&&ls(r);)r=ga(r,i);return r&&Ye(r)&&ls(r)&&!Si(r)?e:r||ua(t)||e}var Vc=async function(t){let i=this.getOffsetParent||_a,e=this.getDimensions,r=await e(t.floating);return {reference:Lc(t.reference,await i(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Pc(t){return Nt(t).direction==="rtl"}var cr={convertOffsetParentRelativeRectToViewportRelativeRect:kc,getDocumentElement:te,getClippingRect:Ic,getOffsetParent:_a,getElementRects:Vc,getClientRects:$c,getDimensions:Rc,getScale:Ci,isElement:Wt,isRTL:Pc};function wa(t,i){return t.x===i.x&&t.y===i.y&&t.width===i.width&&t.height===i.height}function zc(t,i){let e=null,r,o=te(t);function s(){var c;clearTimeout(r),(c=e)==null||c.disconnect(),e=null;}function n(c,l){c===void 0&&(c=false),l===void 0&&(l=1),s();let h=t.getBoundingClientRect(),{left:m,top:d,width:f,height:g}=h;if(c||i(),!f||!g)return;let b=nr(d),x=nr(o.clientWidth-(m+f)),T=nr(o.clientHeight-(d+g)),A=nr(m),O={rootMargin:-b+"px "+-x+"px "+-T+"px "+-A+"px",threshold:$t(0,ne(1,l))||1},_=true;function C(D){let F=D[0].intersectionRatio;if(F!==l){if(!_)return n();F?n(false,F):r=setTimeout(()=>{n(false,1e-7);},1e3);}F===1&&!wa(h,t.getBoundingClientRect())&&n(),_=false;}try{e=new IntersectionObserver(C,{...O,root:o.ownerDocument});}catch{e=new IntersectionObserver(C,O);}e.observe(t);}return n(true),s}function Sa(t,i,e,r){r===void 0&&(r={});let{ancestorScroll:o=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=false}=r,h=cs(t),m=o||s?[...h?_i(h):[],..._i(i)]:[];m.forEach(A=>{o&&A.addEventListener("scroll",e,{passive:true}),s&&A.addEventListener("resize",e);});let d=h&&c?zc(h,e):null,f=-1,g=null;n&&(g=new ResizeObserver(A=>{let[S]=A;S&&S.target===h&&g&&(g.unobserve(i),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var O;(O=g)==null||O.observe(i);})),e();}),h&&!l&&g.observe(h),g.observe(i));let b,x=l?Xe(t):null;l&&T();function T(){let A=Xe(t);x&&!wa(x,A)&&e(),x=A,b=requestAnimationFrame(T);}return e(),()=>{var A;m.forEach(S=>{o&&S.removeEventListener("scroll",e),s&&S.removeEventListener("resize",e);}),d?.(),(A=g)==null||A.disconnect(),g=null,l&&cancelAnimationFrame(b);}}var Ca=aa;var ka=la,$a=na,ds=ca;var Aa=sa;var Ea=(t,i,e)=>{let r=new Map,o={platform:cr,...e},s={...o.platform,_c:r};return oa(t,i,{...o,platform:s})};function Oa(t){return Dc(t)}function hs(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Dc(t){for(let i=t;i;i=hs(i))if(i instanceof Element&&getComputedStyle(i).display==="none")return null;for(let i=hs(t);i;i=hs(i)){if(!(i instanceof Element))continue;let e=getComputedStyle(i);if(e.display!=="contents"&&(e.position!=="static"||Si(e)||i.tagName==="BODY"))return i}return null}function Mc(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var X=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),i=this.popup.getBoundingClientRect(),e=this.placement.includes("top")||this.placement.includes("bottom"),r=0,o=0,s=0,n=0,c=0,l=0,h=0,m=0;e?t.top<i.top?(r=t.left,o=t.bottom,s=t.right,n=t.bottom,c=i.left,l=i.top,h=i.right,m=i.top):(r=i.left,o=i.bottom,s=i.right,n=i.bottom,c=t.left,l=t.top,h=t.right,m=t.top):t.left<i.left?(r=t.right,o=t.top,s=i.left,n=i.top,c=t.right,l=t.bottom,h=i.left,m=i.bottom):(r=i.right,o=i.top,s=t.left,n=t.top,c=i.right,l=i.bottom,h=t.left,m=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${m}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||Mc(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Sa(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Ca({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(ds({apply:({rects:e})=>{let r=this.sync==="width"||this.sync==="both",o=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${e.reference.width}px`:"",this.popup.style.height=o?`${e.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push($a({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(ka({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(ds({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Aa({element:this.arrowEl,padding:this.arrowPadding}));let i=this.strategy==="absolute"?e=>cr.getOffsetParent(e,Oa):cr.getOffsetParent;Ea(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:ue(St({},cr),{getOffsetParent:i})}).then(({x:e,y:r,middlewareData:o,placement:s})=>{let n=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${e}px`,top:`${r}px`}),this.arrow){let l=o.arrow.x,h=o.arrow.y,m="",d="",f="",g="";if(this.arrowPlacement==="start"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=n?"":b,g=n?b:"",f=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",m=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",m=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:m,right:d,bottom:f,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return u`
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
        ${this.arrow?u`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};X.styles=[P,Jn];a([$(".popup")],X.prototype,"popup",2);a([$(".popup__arrow")],X.prototype,"arrowEl",2);a([p()],X.prototype,"anchor",2);a([p({type:Boolean,reflect:true})],X.prototype,"active",2);a([p({reflect:true})],X.prototype,"placement",2);a([p({reflect:true})],X.prototype,"strategy",2);a([p({type:Number})],X.prototype,"distance",2);a([p({type:Number})],X.prototype,"skidding",2);a([p({type:Boolean})],X.prototype,"arrow",2);a([p({attribute:"arrow-placement"})],X.prototype,"arrowPlacement",2);a([p({attribute:"arrow-padding",type:Number})],X.prototype,"arrowPadding",2);a([p({type:Boolean})],X.prototype,"flip",2);a([p({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(i=>i.trim()).filter(i=>i!==""),toAttribute:t=>t.join(" ")}})],X.prototype,"flipFallbackPlacements",2);a([p({attribute:"flip-fallback-strategy"})],X.prototype,"flipFallbackStrategy",2);a([p({type:Object})],X.prototype,"flipBoundary",2);a([p({attribute:"flip-padding",type:Number})],X.prototype,"flipPadding",2);a([p({type:Boolean})],X.prototype,"shift",2);a([p({type:Object})],X.prototype,"shiftBoundary",2);a([p({attribute:"shift-padding",type:Number})],X.prototype,"shiftPadding",2);a([p({attribute:"auto-size"})],X.prototype,"autoSize",2);a([p()],X.prototype,"sync",2);a([p({type:Object})],X.prototype,"autoSizeBoundary",2);a([p({attribute:"auto-size-padding",type:Number})],X.prototype,"autoSizePadding",2);a([p({attribute:"hover-bridge",type:Boolean})],X.prototype,"hoverBridge",2);var Ia=new Map,Hc=new WeakMap;function Fc(t){return t??{keyframes:[],options:{duration:0}}}function Ta(t,i){return i.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function jt(t,i){Ia.set(t,Fc(i));}function Ut(t,i,e){let r=Hc.get(t);if(r?.[i])return Ta(r[i],e.dir);let o=Ia.get(i);return o?Ta(o,e.dir):{keyframes:[],options:{duration:0}}}function be(t,i){return new Promise(e=>{function r(o){o.target===t&&(t.removeEventListener(i,r),e());}t.addEventListener(i,r);})}function qt(t,i,e){return new Promise(r=>{if(e?.duration===1/0)throw new Error("Promise-based animations must be finite.");let o=t.animate(i,ue(St({},e),{duration:Bc()?0:e.duration}));o.addEventListener("cancel",r,{once:true}),o.addEventListener("finish",r,{once:true});})}function Bc(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Kt(t){return Promise.all(t.getAnimations().map(i=>new Promise(e=>{i.cancel(),requestAnimationFrame(e);})))}function ki(t,i){return t.map(e=>ue(St({},e),{height:e.height==="auto"?`${i}px`:e.height}))}var N=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new at(this,"help-text","label"),this.localize=new W(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>u`
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
        @sl-remove=${i=>this.handleTagRemove(i,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{let i=t.composedPath();this&&!i.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let i=t.target,e=i.closest(".select__clear")!==null,r=i.closest("sl-icon-button")!==null;if(!(e||r)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let o=this.getAllOptions(),s=o.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>o.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=o.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=o.length-1),this.setCurrentOption(o[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of o)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let i=t.composedPath();this&&!i.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let e=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="sl-icon-button");this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let e=t.target.closest("sl-option"),r=this.value;e&&!e.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==r&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),i=this.valueHasChanged?this.value:this.defaultValue,e=Array.isArray(i)?i:[i],r=[];t.forEach(o=>r.push(o.value)),this.setSelectedOptions(t.filter(o=>e.includes(o.value)));}handleTagRemove(t,i){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(i,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(e=>{e.current=false,e.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let i=this.getAllOptions(),e=Array.isArray(t)?t:[t];i.forEach(r=>r.selected=false),e.length&&e.forEach(r=>r.selected=true),this.selectionChanged();}toggleOptionSelection(t,i){i===true||i===false?t.selected=i:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,i,e;let r=this.getAllOptions();this.selectedOptions=r.filter(s=>s.selected);let o=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(e=(i=s?.getTextLabel)==null?void 0:i.call(s))!=null?e:"";}this.valueHasChanged=o,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,i)=>{if(i<this.maxOptionsVisible||this.maxOptionsVisible<=0){let e=this.getTag(t,i);return u`<div @sl-remove=${r=>this.handleTagRemove(r,t)}>
          ${typeof e=="string"?Ot(e):e}
        </div>`}else if(i===this.maxOptionsVisible)return u`<sl-tag size=${this.size}>+${this.selectedOptions.length-i}</sl-tag>`;return u``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,i,e){if(super.attributeChangedCallback(t,i,e),t==="value"){let r=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=r;}}handleValueChange(){if(!this.valueHasChanged){let e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e;}let t=this.getAllOptions(),i=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(e=>i.includes(e.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Kt(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:i}=Ut(this,"select.show",{dir:this.localize.dir()});await qt(this.popup.popup,t,i),this.currentOption&&rr(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Kt(this);let{keyframes:t,options:i}=Ut(this,"select.hide",{dir:this.localize.dir()});await qt(this.popup.popup,t,i),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,be(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,be(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!i,o=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return u`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":r})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${e?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${L({select:true,"select--standard":true,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":s,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
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

              ${this.multiple?u`<div part="tags" class="select__tags">${this.tags}</div>`:""}

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

              ${o?u`
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
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};N.styles=[P,Tt,Zn];N.dependencies={"sl-icon":q,"sl-popup":X,"sl-tag":se};a([$(".select")],N.prototype,"popup",2);a([$(".select__combobox")],N.prototype,"combobox",2);a([$(".select__display-input")],N.prototype,"displayInput",2);a([$(".select__value-input")],N.prototype,"valueInput",2);a([$(".select__listbox")],N.prototype,"listbox",2);a([k()],N.prototype,"hasFocus",2);a([k()],N.prototype,"displayLabel",2);a([k()],N.prototype,"currentOption",2);a([k()],N.prototype,"selectedOptions",2);a([k()],N.prototype,"valueHasChanged",2);a([p()],N.prototype,"name",2);a([k()],N.prototype,"value",1);a([p({attribute:"value"})],N.prototype,"defaultValue",2);a([p({reflect:true})],N.prototype,"size",2);a([p()],N.prototype,"placeholder",2);a([p({type:Boolean,reflect:true})],N.prototype,"multiple",2);a([p({attribute:"max-options-visible",type:Number})],N.prototype,"maxOptionsVisible",2);a([p({type:Boolean,reflect:true})],N.prototype,"disabled",2);a([p({type:Boolean})],N.prototype,"clearable",2);a([p({type:Boolean,reflect:true})],N.prototype,"open",2);a([p({type:Boolean})],N.prototype,"hoist",2);a([p({type:Boolean,reflect:true})],N.prototype,"filled",2);a([p({type:Boolean,reflect:true})],N.prototype,"pill",2);a([p()],N.prototype,"label",2);a([p({reflect:true})],N.prototype,"placement",2);a([p({attribute:"help-text"})],N.prototype,"helpText",2);a([p({reflect:true})],N.prototype,"form",2);a([p({type:Boolean,reflect:true})],N.prototype,"required",2);a([p()],N.prototype,"getTag",2);a([E("disabled",{waitUntilFirstUpdate:true})],N.prototype,"handleDisabledChange",1);a([E(["defaultValue","value"],{waitUntilFirstUpdate:true})],N.prototype,"handleValueChange",1);a([E("open",{waitUntilFirstUpdate:true})],N.prototype,"handleOpenChange",1);jt("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});jt("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});N.define("sl-select");var Ra=y`
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
`;var Mt=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,i="";return [...t].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("slot")||(i+=e.textContent)),e.nodeType===Node.TEXT_NODE&&(i+=e.textContent);}),i.trim()}render(){return u`
      <div
        part="base"
        class=${L({option:true,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Mt.styles=[P,Ra];Mt.dependencies={"sl-icon":q};a([$(".option__label")],Mt.prototype,"defaultSlot",2);a([k()],Mt.prototype,"current",2);a([k()],Mt.prototype,"selected",2);a([k()],Mt.prototype,"hasHover",2);a([p({reflect:true})],Mt.prototype,"value",2);a([p({type:Boolean,reflect:true})],Mt.prototype,"disabled",2);a([E("disabled")],Mt.prototype,"handleDisabledChange",1);a([E("selected")],Mt.prototype,"handleSelectedChange",1);a([E("value")],Mt.prototype,"handleValueChange",1);Mt.define("sl-option");var mo=y`
    :host {
        --auto-theme-color: var(--sl-color-primary-500);
        --auto-text-color: var(--sl-color-gray-700);
        --auto-gray-color: var(--sl-color-gray-500);
        --auto-bgcolor: var(--sl-color-neutral-0);
        --auto-line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 4);
        --auto-font-size: var(--sl-font-size-medium);
        --auto-spacing: var(--sl-spacing-medium); /* 用于内边距和外边距 */
        --auto-border-color: var(--sl-color-neutral-300);
        --auto-border: 1px solid var(--auto-border-color);
        --auto-border-radius: var(--sl-border-radius-medium);
        --auto-shadow: var(--sl-shadow-medium);
        --auto-workspace-color: var(--sl-color-gray-100);
        --auto-icon-size: calc(1.5 * var(--sl-font-size-medium));
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
`;exports.AutoFieldSelect=class pr extends R{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}_renderItem(e){let r=this.options.renderItem;return typeof r=="string"?u`${Ot(r.replace(/\{(.+?)\}/g,(o,s)=>e[s]))}`:typeof r=="function"?u`${Ot(r(e))}`:e.label||e.value}renderInput(){let e=this.options.select.map(r=>{let o={};return typeof r=="object"?Object.assign(o,r):typeof r=="string"&&r.startsWith("-")?Object.assign(o,{type:"divider"}):Object.assign(o,{label:r}),o});return u`
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
                placeholder="${w(this.options.placeholder)}"
                .maxOptionsVisible=${this.options.maxOptionsVisible}
                help-text="${w(this.options.help)}"
                .placement=${this.options.placement}
                @sl-input=${this.onFieldInput.bind(this)}
            >
                ${this.renderBeforeActions()}
                ${e.map(r=>r.type==="divider"?u`<sl-divider></sl-divider>`:u`<sl-option value="${r[this.valueKey]||r.label}" ?disabled=${!this.options.enable}>
                        <auto-flex class="item" gap="1em" align="center" grow="sl-icon + *,:first-child:not(sl-icon)" style="text-align:left;">
                            ${B(r.icon,()=>u`<sl-icon name="${r.icon}"></sl-icon>`)}
                            ${this._renderItem(r)}
                        </auto-flex>
                    </sl-option>`)}
                ${this.renderAfterActions()}
            </sl-select>
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect.styles=[R.styles,mo,y`
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
        `],exports.AutoFieldSelect=v([I("auto-field-select")],exports.AutoFieldSelect);var La=y`
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
`;var tt=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this),this.hasSlotController=new at(this,"help-text","label"),this.localize=new W(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let i=this.input.offsetWidth,e=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),o=this.localize.dir()==="rtl",s=i*t;if(o){let n=`${i-s}px + ${t} * ${r}`;this.output.style.translate=`calc((${n} - ${e/2}px - ${r} / 2))`;}else {let n=`${s}px - ${t} * ${r}`;this.output.style.translate=`calc(${n} - ${e/2}px + ${r} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!i;return u`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--medium":true,"form-control--has-label":e,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${e?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${L({range:true,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
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
              name=${w(this.name)}
              ?disabled=${this.disabled}
              min=${w(this.min)}
              max=${w(this.max)}
              step=${w(this.step)}
              .value=${kt(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?u`
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
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};tt.styles=[P,Tt,La];a([$(".range__control")],tt.prototype,"input",2);a([$(".range__tooltip")],tt.prototype,"output",2);a([k()],tt.prototype,"hasFocus",2);a([k()],tt.prototype,"hasTooltip",2);a([p()],tt.prototype,"title",2);a([p()],tt.prototype,"name",2);a([p({type:Number})],tt.prototype,"value",2);a([p()],tt.prototype,"label",2);a([p({attribute:"help-text"})],tt.prototype,"helpText",2);a([p({type:Boolean,reflect:true})],tt.prototype,"disabled",2);a([p({type:Number})],tt.prototype,"min",2);a([p({type:Number})],tt.prototype,"max",2);a([p({type:Number})],tt.prototype,"step",2);a([p()],tt.prototype,"tooltip",2);a([p({attribute:false})],tt.prototype,"tooltipFormatter",2);a([p({reflect:true})],tt.prototype,"form",2);a([Ft()],tt.prototype,"defaultValue",2);a([Ce({passive:true})],tt.prototype,"handleThumbDragStart",1);a([E("value",{waitUntilFirstUpdate:true})],tt.prototype,"handleValueChange",1);a([E("disabled",{waitUntilFirstUpdate:true})],tt.prototype,"handleDisabledChange",1);a([E("hasTooltip",{waitUntilFirstUpdate:true})],tt.prototype,"syncRange",1);tt.define("sl-range");exports.AutoFieldRabge=class dr extends R{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top"}}renderInput(){return u`
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
        `}};exports.AutoFieldRabge.styles=[R.styles,y`
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
        `],exports.AutoFieldRabge=v([I("auto-field-range")],exports.AutoFieldRabge);var Va=y`
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
`;function ct(t,i,e){let r=o=>Object.is(o,-0)?0:o;return t<i?r(i):t>e?r(e):r(t)}var xt=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let i=this.localize.dir()==="rtl",{left:e,right:r,width:o}=this.rating.getBoundingClientRect(),s=i?this.roundToPrecision((r-t)/o*this.max,this.precision):this.roundToPrecision((t-e)/o*this.max,this.precision);return ct(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let i=this.localize.dir()==="ltr",e=this.localize.dir()==="rtl",r=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||i&&t.key==="ArrowLeft"||e&&t.key==="ArrowRight"){let o=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-o),t.preventDefault();}if(t.key==="ArrowUp"||i&&t.key==="ArrowRight"||e&&t.key==="ArrowLeft"){let o=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+o),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==r&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,i=.5){let e=1/i;return Math.ceil(t*e)/e}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",i=Array.from(Array(this.max).keys()),e=0;return this.disabled||this.readonly?e=this.value:e=this.isHovering?this.hoverValue:this.value,u`
      <div
        part="base"
        class=${L({rating:true,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
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
          ${i.map(r=>e>r&&e<r+1?u`
                <span
                  class=${L({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1})}
                  role="presentation"
                >
                  <div
                    style=${J({clipPath:t?`inset(0 ${(e-r)*100}% 0 0)`:`inset(0 0 0 ${(e-r)*100}%)`})}
                  >
                    ${Ot(this.getSymbol(r+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${J({clipPath:t?`inset(0 0 0 ${100-(e-r)*100}%)`:`inset(0 ${100-(e-r)*100}% 0 0)`})}
                  >
                    ${Ot(this.getSymbol(r+1))}
                  </div>
                </span>
              `:u`
              <span
                class=${L({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1,"rating__symbol--active":e>=r+1})}
                role="presentation"
              >
                ${Ot(this.getSymbol(r+1))}
              </span>
            `)}
        </span>
      </div>
    `}};xt.styles=[P,Va];xt.dependencies={"sl-icon":q};a([$(".rating")],xt.prototype,"rating",2);a([k()],xt.prototype,"hoverValue",2);a([k()],xt.prototype,"isHovering",2);a([p()],xt.prototype,"label",2);a([p({type:Number})],xt.prototype,"value",2);a([p({type:Number})],xt.prototype,"max",2);a([p({type:Number})],xt.prototype,"precision",2);a([p({type:Boolean,reflect:true})],xt.prototype,"readonly",2);a([p({type:Boolean,reflect:true})],xt.prototype,"disabled",2);a([p()],xt.prototype,"getSymbol",2);a([Ce({passive:true})],xt.prototype,"handleTouchMove",1);a([E("hoverValue")],xt.prototype,"handleHoverValueChange",1);a([E("isHovering")],xt.prototype,"handleIsHoveringChange",1);xt.define("sl-rating");exports.AutoFieldRating=class fo extends R{getInitialOptions(){return {max:5,precision:1}}renderInput(){return u`
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
        `}renderView(){return u`<sl-rating slot="value" name="${this.name}" data-path=${this.path} value=${this.value} max=${this.options.max} readonly> </sl-rating> `}};exports.AutoFieldRating=v([I("auto-field-rating")],exports.AutoFieldRating);var Pa=y`
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
`;var us=class extends V{render(){return u` <slot></slot> `}};us.styles=[P,Pa];var za=y`
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
`;var H=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new at(this,"help-text","label"),this.localize=new W(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let i=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!i&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,i,e="none"){this.input.setSelectionRange(t,i,e);}setRangeText(t,i,e,r="preserve"){let o=i??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,o,s,r),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!i,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return u`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${e?"false":"true"}
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
              name=${w(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${w(this.placeholder)}
              minlength=${w(this.minlength)}
              maxlength=${w(this.maxlength)}
              min=${w(this.min)}
              max=${w(this.max)}
              step=${w(this.step)}
              .value=${kt(this.value)}
              autocapitalize=${w(this.autocapitalize)}
              autocomplete=${w(this.autocomplete)}
              autocorrect=${w(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${w(this.pattern)}
              enterkeyhint=${w(this.enterkeyhint)}
              inputmode=${w(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${s?u`
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
            ${this.passwordToggle&&!this.disabled?u`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?u`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:u`
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
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};H.styles=[P,Tt,za];H.dependencies={"sl-icon":q};a([$(".input__control")],H.prototype,"input",2);a([k()],H.prototype,"hasFocus",2);a([p()],H.prototype,"title",2);a([p({reflect:true})],H.prototype,"type",2);a([p()],H.prototype,"name",2);a([p()],H.prototype,"value",2);a([Ft()],H.prototype,"defaultValue",2);a([p({reflect:true})],H.prototype,"size",2);a([p({type:Boolean,reflect:true})],H.prototype,"filled",2);a([p({type:Boolean,reflect:true})],H.prototype,"pill",2);a([p()],H.prototype,"label",2);a([p({attribute:"help-text"})],H.prototype,"helpText",2);a([p({type:Boolean})],H.prototype,"clearable",2);a([p({type:Boolean,reflect:true})],H.prototype,"disabled",2);a([p()],H.prototype,"placeholder",2);a([p({type:Boolean,reflect:true})],H.prototype,"readonly",2);a([p({attribute:"password-toggle",type:Boolean})],H.prototype,"passwordToggle",2);a([p({attribute:"password-visible",type:Boolean})],H.prototype,"passwordVisible",2);a([p({attribute:"no-spin-buttons",type:Boolean})],H.prototype,"noSpinButtons",2);a([p({reflect:true})],H.prototype,"form",2);a([p({type:Boolean,reflect:true})],H.prototype,"required",2);a([p()],H.prototype,"pattern",2);a([p({type:Number})],H.prototype,"minlength",2);a([p({type:Number})],H.prototype,"maxlength",2);a([p()],H.prototype,"min",2);a([p()],H.prototype,"max",2);a([p()],H.prototype,"step",2);a([p()],H.prototype,"autocapitalize",2);a([p()],H.prototype,"autocorrect",2);a([p()],H.prototype,"autocomplete",2);a([p({type:Boolean})],H.prototype,"autofocus",2);a([p()],H.prototype,"enterkeyhint",2);a([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],H.prototype,"spellcheck",2);a([p()],H.prototype,"inputmode",2);a([E("disabled",{waitUntilFirstUpdate:true})],H.prototype,"handleDisabledChange",1);a([E("step",{waitUntilFirstUpdate:true})],H.prototype,"handleStepChange",1);a([E("value",{waitUntilFirstUpdate:true})],H.prototype,"handleValueChange",1);function $i(t,i){function e(o){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,c=s.left+n.scrollX,l=s.top+n.scrollY,h=o.pageX-c,m=o.pageY-l;i?.onMove&&i.onMove(h,m);}function r(){document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",r),i?.onStop&&i.onStop();}document.addEventListener("pointermove",e,{passive:true}),document.addEventListener("pointerup",r),i?.initialEvent instanceof PointerEvent&&e(i.initialEvent);}var Da=y`
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
`;function*Ha(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*wn(Ha(t.shadowRoot.activeElement))));}function Fa(){return [...Ha()].pop()}var Ma=new WeakMap;function Ba(t){let i=Ma.get(t);return i||(i=window.getComputedStyle(t,null),Ma.set(t,i)),i}function Wc(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let i=Ba(t);return i.visibility!=="hidden"&&i.display!=="none"}function Nc(t){let i=Ba(t),{overflowY:e,overflowX:r}=i;return e==="scroll"||r==="scroll"?true:e!=="auto"||r!=="auto"?false:t.scrollHeight>t.clientHeight&&e==="auto"||t.scrollWidth>t.clientWidth&&r==="auto"}function jc(t){let i=t.tagName.toLowerCase(),e=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(i==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${n}:checked`);return c?c===t:s.querySelector(n)===t}return Wc(t)?(i==="audio"||i==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(i)?true:Nc(t):false}function Wa(t){var i,e;let r=qc(t),o=(i=r[0])!=null?i:null,s=(e=r[r.length-1])!=null?e:null;return {start:o,end:s}}function Uc(t,i){var e;return ((e=t.getRootNode({composed:true}))==null?void 0:e.host)!==i}function qc(t){let i=new WeakMap,e=[];function r(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||i.has(o))return;i.set(o,true),!e.includes(o)&&jc(o)&&e.push(o),o instanceof HTMLSlotElement&&Uc(o,t)&&o.assignedElements({flatten:true}).forEach(s=>{r(s);}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&r(o.shadowRoot);}for(let s of o.children)r(s);}return r(t),e.sort((o,s)=>{let n=Number(o.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var dt=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var i;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((i=document.activeElement)==null?void 0:i.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let e=(r,o)=>{if(!r)return null;let s=r.closest(o);if(s)return s;let n=r.getRootNode();return n instanceof ShadowRoot?e(n.host,o):null};setTimeout(()=>{var r;let o=((r=this.containingElement)==null?void 0:r.getRootNode())instanceof ShadowRoot?Fa():document.activeElement;(!this.containingElement||e(o,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let i=t.composedPath();this.containingElement&&!i.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let i=t.target;!this.stayOpenOnSelect&&i.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let i=this.getMenu();if(i){let e=i.getAllItems(),r=e[0],o=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),e.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(i.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(i.setCurrentItem(o),o.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let i=this.trigger.assignedElements({flatten:true}).find(r=>Wa(r).start),e;if(i){switch(i.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":e=i.button;break;default:e=i;}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,be(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,be(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Kt(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:i}=Ut(this,"dropdown.show",{dir:this.localize.dir()});await qt(this.popup.popup,t,i),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Kt(this);let{keyframes:t,options:i}=Ut(this,"dropdown.hide",{dir:this.localize.dir()});await qt(this.popup.popup,t,i),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return u`
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
        sync=${w(this.sync?this.sync:void 0)}
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
    `}};dt.styles=[P,Da];dt.dependencies={"sl-popup":X};a([$(".dropdown")],dt.prototype,"popup",2);a([$(".dropdown__trigger")],dt.prototype,"trigger",2);a([$(".dropdown__panel")],dt.prototype,"panel",2);a([p({type:Boolean,reflect:true})],dt.prototype,"open",2);a([p({reflect:true})],dt.prototype,"placement",2);a([p({type:Boolean,reflect:true})],dt.prototype,"disabled",2);a([p({attribute:"stay-open-on-select",type:Boolean,reflect:true})],dt.prototype,"stayOpenOnSelect",2);a([p({attribute:false})],dt.prototype,"containingElement",2);a([p({type:Number})],dt.prototype,"distance",2);a([p({type:Number})],dt.prototype,"skidding",2);a([p({type:Boolean})],dt.prototype,"hoist",2);a([p({reflect:true})],dt.prototype,"sync",2);a([E("open",{waitUntilFirstUpdate:true})],dt.prototype,"handleOpenChange",1);jt("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});jt("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Na=y`
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
`;var ja=y`
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
`;var ve=class extends V{constructor(){super(...arguments),this.localize=new W(this);}render(){return u`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};ve.styles=[P,ja];var G=class extends V{constructor(){super(...arguments),this.formControlController=new mt(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new at(this,"[default]","prefix","suffix"),this.localize=new W(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:bi}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),i=t?vi`a`:vi`button`;return Te`
      <${i}
        part="base"
        class=${L({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${w(t?void 0:this.disabled)}
        type=${w(t?void 0:this.type)}
        title=${this.title}
        name=${w(t?void 0:this.name)}
        value=${w(t?void 0:this.value)}
        href=${w(t&&!this.disabled?this.href:void 0)}
        target=${w(t?this.target:void 0)}
        download=${w(t?this.download:void 0)}
        rel=${w(t?this.rel:void 0)}
        role=${w(t?void 0:"button")}
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
        ${this.caret?Te` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Te`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${i}>
    `}};G.styles=[P,Kr];G.dependencies={"sl-icon":q,"sl-spinner":ve};a([$(".button")],G.prototype,"button",2);a([k()],G.prototype,"hasFocus",2);a([k()],G.prototype,"invalid",2);a([p()],G.prototype,"title",2);a([p({reflect:true})],G.prototype,"variant",2);a([p({reflect:true})],G.prototype,"size",2);a([p({type:Boolean,reflect:true})],G.prototype,"caret",2);a([p({type:Boolean,reflect:true})],G.prototype,"disabled",2);a([p({type:Boolean,reflect:true})],G.prototype,"loading",2);a([p({type:Boolean,reflect:true})],G.prototype,"outline",2);a([p({type:Boolean,reflect:true})],G.prototype,"pill",2);a([p({type:Boolean,reflect:true})],G.prototype,"circle",2);a([p()],G.prototype,"type",2);a([p()],G.prototype,"name",2);a([p()],G.prototype,"value",2);a([p()],G.prototype,"href",2);a([p()],G.prototype,"target",2);a([p()],G.prototype,"rel",2);a([p()],G.prototype,"download",2);a([p()],G.prototype,"form",2);a([p({attribute:"formaction"})],G.prototype,"formAction",2);a([p({attribute:"formenctype"})],G.prototype,"formEnctype",2);a([p({attribute:"formmethod"})],G.prototype,"formMethod",2);a([p({attribute:"formnovalidate",type:Boolean})],G.prototype,"formNoValidate",2);a([p({attribute:"formtarget"})],G.prototype,"formTarget",2);a([E("disabled",{waitUntilFirstUpdate:true})],G.prototype,"handleDisabledChange",1);function ht(t,i){Kc(t)&&(t="100%");let e=Gc(t);return t=i===360?t:Math.min(i,Math.max(0,parseFloat(t))),e&&(t=parseInt(String(t*i),10)/100),Math.abs(t-i)<1e-6?1:(i===360?t=(t<0?t%i+i:t%i)/parseFloat(String(i)):t=t%i/parseFloat(String(i)),t)}function hr(t){return Math.min(1,Math.max(0,t))}function Kc(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function Gc(t){return typeof t=="string"&&t.indexOf("%")!==-1}function go(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function ur(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Re(t){return t.length===1?"0"+t:String(t)}function Ua(t,i,e){return {r:ht(t,255)*255,g:ht(i,255)*255,b:ht(e,255)*255}}function fs(t,i,e){t=ht(t,255),i=ht(i,255),e=ht(e,255);let r=Math.max(t,i,e),o=Math.min(t,i,e),s=0,n=0,c=(r+o)/2;if(r===o)n=0,s=0;else {let l=r-o;switch(n=c>.5?l/(2-r-o):l/(r+o),r){case t:s=(i-e)/l+(i<e?6:0);break;case i:s=(e-t)/l+2;break;case e:s=(t-i)/l+4;break;}s/=6;}return {h:s,s:n,l:c}}function ms(t,i,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+(i-t)*(6*e):e<1/2?i:e<2/3?t+(i-t)*(2/3-e)*6:t}function qa(t,i,e){let r,o,s;if(t=ht(t,360),i=ht(i,100),e=ht(e,100),i===0)o=e,s=e,r=e;else {let n=e<.5?e*(1+i):e+i-e*i,c=2*e-n;r=ms(c,n,t+1/3),o=ms(c,n,t),s=ms(c,n,t-1/3);}return {r:r*255,g:o*255,b:s*255}}function gs(t,i,e){t=ht(t,255),i=ht(i,255),e=ht(e,255);let r=Math.max(t,i,e),o=Math.min(t,i,e),s=0,n=r,c=r-o,l=r===0?0:c/r;if(r===o)s=0;else {switch(r){case t:s=(i-e)/c+(i<e?6:0);break;case i:s=(e-t)/c+2;break;case e:s=(t-i)/c+4;break;}s/=6;}return {h:s,s:l,v:n}}function Ka(t,i,e){t=ht(t,360)*6,i=ht(i,100),e=ht(e,100);let r=Math.floor(t),o=t-r,s=e*(1-i),n=e*(1-o*i),c=e*(1-(1-o)*i),l=r%6,h=[e,n,s,s,c,e][l],m=[c,e,e,n,s,s][l],d=[s,s,c,e,e,n][l];return {r:h*255,g:m*255,b:d*255}}function bs(t,i,e,r){let o=[Re(Math.round(t).toString(16)),Re(Math.round(i).toString(16)),Re(Math.round(e).toString(16))];return r&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function Ga(t,i,e,r,o){let s=[Re(Math.round(t).toString(16)),Re(Math.round(i).toString(16)),Re(Math.round(e).toString(16)),Re(Yc(r))];return o&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function Ya(t,i,e,r){let o=t/100,s=i/100,n=e/100,c=r/100,l=255*(1-o)*(1-c),h=255*(1-s)*(1-c),m=255*(1-n)*(1-c);return {r:l,g:h,b:m}}function vs(t,i,e){let r=1-t/255,o=1-i/255,s=1-e/255,n=Math.min(r,o,s);return n===1?(r=0,o=0,s=0):(r=(r-n)/(1-n)*100,o=(o-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(r),m:Math.round(o),y:Math.round(s),k:Math.round(n)}}function Yc(t){return Math.round(parseFloat(t)*255).toString(16)}function ys(t){return Rt(t)/255}function Rt(t){return parseInt(t,16)}function Xa(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var mr={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Qa(t){let i={r:0,g:0,b:0},e=1,r=null,o=null,s=null,n=false,c=false;return typeof t=="string"&&(t=Zc(t)),typeof t=="object"&&(Ht(t.r)&&Ht(t.g)&&Ht(t.b)?(i=Ua(t.r,t.g,t.b),n=true,c=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Ht(t.h)&&Ht(t.s)&&Ht(t.v)?(r=ur(t.s),o=ur(t.v),i=Ka(t.h,r,o),n=true,c="hsv"):Ht(t.h)&&Ht(t.s)&&Ht(t.l)?(r=ur(t.s),s=ur(t.l),i=qa(t.h,r,s),n=true,c="hsl"):Ht(t.c)&&Ht(t.m)&&Ht(t.y)&&Ht(t.k)&&(i=Ya(t.c,t.m,t.y,t.k),n=true,c="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(e=t.a)),e=go(e),{ok:n,format:t.format||c,r:Math.min(255,Math.max(i.r,0)),g:Math.min(255,Math.max(i.g,0)),b:Math.min(255,Math.max(i.b,0)),a:e}}var Xc="[-\\+]?\\d+%?",Qc="[-\\+]?\\d*\\.\\d+%?",Le="(?:"+Qc+")|(?:"+Xc+")",xs="[\\s|\\(]+("+Le+")[,|\\s]+("+Le+")[,|\\s]+("+Le+")\\s*\\)?",bo="[\\s|\\(]+("+Le+")[,|\\s]+("+Le+")[,|\\s]+("+Le+")[,|\\s]+("+Le+")\\s*\\)?",Gt={CSS_UNIT:new RegExp(Le),rgb:new RegExp("rgb"+xs),rgba:new RegExp("rgba"+bo),hsl:new RegExp("hsl"+xs),hsla:new RegExp("hsla"+bo),hsv:new RegExp("hsv"+xs),hsva:new RegExp("hsva"+bo),cmyk:new RegExp("cmyk"+bo),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Zc(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let i=false;if(mr[t])t=mr[t],i=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let e=Gt.rgb.exec(t);return e?{r:e[1],g:e[2],b:e[3]}:(e=Gt.rgba.exec(t),e?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=Gt.hsl.exec(t),e?{h:e[1],s:e[2],l:e[3]}:(e=Gt.hsla.exec(t),e?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=Gt.hsv.exec(t),e?{h:e[1],s:e[2],v:e[3]}:(e=Gt.hsva.exec(t),e?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=Gt.cmyk.exec(t),e?{c:e[1],m:e[2],y:e[3],k:e[4]}:(e=Gt.hex8.exec(t),e?{r:Rt(e[1]),g:Rt(e[2]),b:Rt(e[3]),a:ys(e[4]),format:i?"name":"hex8"}:(e=Gt.hex6.exec(t),e?{r:Rt(e[1]),g:Rt(e[2]),b:Rt(e[3]),format:i?"name":"hex"}:(e=Gt.hex4.exec(t),e?{r:Rt(e[1]+e[1]),g:Rt(e[2]+e[2]),b:Rt(e[3]+e[3]),a:ys(e[4]+e[4]),format:i?"name":"hex8"}:(e=Gt.hex3.exec(t),e?{r:Rt(e[1]+e[1]),g:Rt(e[2]+e[2]),b:Rt(e[3]+e[3]),format:i?"name":"hex"}:false))))))))))}function Ht(t){return typeof t=="number"?!Number.isNaN(t):Gt.CSS_UNIT.test(t)}var fr=class t{constructor(i="",e={}){if(i instanceof t)return i;typeof i=="number"&&(i=Xa(i)),this.originalInput=i;let r=Qa(i);this.originalInput=i,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??r.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let i=this.toRgb();return (i.r*299+i.g*587+i.b*114)/1e3}getLuminance(){let i=this.toRgb(),e,r,o,s=i.r/255,n=i.g/255,c=i.b/255;return s<=.03928?e=s/12.92:e=Math.pow((s+.055)/1.055,2.4),n<=.03928?r=n/12.92:r=Math.pow((n+.055)/1.055,2.4),c<=.03928?o=c/12.92:o=Math.pow((c+.055)/1.055,2.4),.2126*e+.7152*r+.0722*o}getAlpha(){return this.a}setAlpha(i){return this.a=go(i),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:i}=this.toHsl();return i===0}toHsv(){let i=gs(this.r,this.g,this.b);return {h:i.h*360,s:i.s,v:i.v,a:this.a}}toHsvString(){let i=gs(this.r,this.g,this.b),e=Math.round(i.h*360),r=Math.round(i.s*100),o=Math.round(i.v*100);return this.a===1?`hsv(${e}, ${r}%, ${o}%)`:`hsva(${e}, ${r}%, ${o}%, ${this.roundA})`}toHsl(){let i=fs(this.r,this.g,this.b);return {h:i.h*360,s:i.s,l:i.l,a:this.a}}toHslString(){let i=fs(this.r,this.g,this.b),e=Math.round(i.h*360),r=Math.round(i.s*100),o=Math.round(i.l*100);return this.a===1?`hsl(${e}, ${r}%, ${o}%)`:`hsla(${e}, ${r}%, ${o}%, ${this.roundA})`}toHex(i=false){return bs(this.r,this.g,this.b,i)}toHexString(i=false){return "#"+this.toHex(i)}toHex8(i=false){return Ga(this.r,this.g,this.b,this.a,i)}toHex8String(i=false){return "#"+this.toHex8(i)}toHexShortString(i=false){return this.a===1?this.toHexString(i):this.toHex8String(i)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let i=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return this.a===1?`rgb(${i}, ${e}, ${r})`:`rgba(${i}, ${e}, ${r}, ${this.roundA})`}toPercentageRgb(){let i=e=>`${Math.round(ht(e,255)*100)}%`;return {r:i(this.r),g:i(this.g),b:i(this.b),a:this.a}}toPercentageRgbString(){let i=e=>Math.round(ht(e,255)*100);return this.a===1?`rgb(${i(this.r)}%, ${i(this.g)}%, ${i(this.b)}%)`:`rgba(${i(this.r)}%, ${i(this.g)}%, ${i(this.b)}%, ${this.roundA})`}toCmyk(){return {...vs(this.r,this.g,this.b)}}toCmykString(){let{c:i,m:e,y:r,k:o}=vs(this.r,this.g,this.b);return `cmyk(${i}, ${e}, ${r}, ${o})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let i="#"+bs(this.r,this.g,this.b,false);for(let[e,r]of Object.entries(mr))if(i===r)return e;return  false}toString(i){let e=!!i;i=i??this.format;let r=false,o=this.a<1&&this.a>=0;return !e&&o&&(i.startsWith("hex")||i==="name")?i==="name"&&this.a===0?this.toName():this.toRgbString():(i==="rgb"&&(r=this.toRgbString()),i==="prgb"&&(r=this.toPercentageRgbString()),(i==="hex"||i==="hex6")&&(r=this.toHexString()),i==="hex3"&&(r=this.toHexString(true)),i==="hex4"&&(r=this.toHex8String(true)),i==="hex8"&&(r=this.toHex8String()),i==="name"&&(r=this.toName()),i==="hsl"&&(r=this.toHslString()),i==="hsv"&&(r=this.toHsvString()),i==="cmyk"&&(r=this.toCmykString()),r||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(i=10){let e=this.toHsl();return e.l+=i/100,e.l=hr(e.l),new t(e)}brighten(i=10){let e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(i/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(i/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(i/100)))),new t(e)}darken(i=10){let e=this.toHsl();return e.l-=i/100,e.l=hr(e.l),new t(e)}tint(i=10){return this.mix("white",i)}shade(i=10){return this.mix("black",i)}desaturate(i=10){let e=this.toHsl();return e.s-=i/100,e.s=hr(e.s),new t(e)}saturate(i=10){let e=this.toHsl();return e.s+=i/100,e.s=hr(e.s),new t(e)}greyscale(){return this.desaturate(100)}spin(i){let e=this.toHsl(),r=(e.h+i)%360;return e.h=r<0?360+r:r,new t(e)}mix(i,e=50){let r=this.toRgb(),o=new t(i).toRgb(),s=e/100,n={r:(o.r-r.r)*s+r.r,g:(o.g-r.g)*s+r.g,b:(o.b-r.b)*s+r.b,a:(o.a-r.a)*s+r.a};return new t(n)}analogous(i=6,e=30){let r=this.toHsl(),o=360/e,s=[this];for(r.h=(r.h-(o*i>>1)+720)%360;--i;)r.h=(r.h+o)%360,s.push(new t(r));return s}complement(){let i=this.toHsl();return i.h=(i.h+180)%360,new t(i)}monochromatic(i=6){let e=this.toHsv(),{h:r}=e,{s:o}=e,{v:s}=e,n=[],c=1/i;for(;i--;)n.push(new t({h:r,s:o,v:s})),s=(s+c)%1;return n}splitcomplement(){let i=this.toHsl(),{h:e}=i;return [this,new t({h:(e+72)%360,s:i.s,l:i.l}),new t({h:(e+216)%360,s:i.s,l:i.l})]}onBackground(i){let e=this.toRgb(),r=new t(i).toRgb(),o=e.a+r.a*(1-e.a);return new t({r:(e.r*e.a+r.r*r.a*(1-e.a))/o,g:(e.g*e.a+r.g*r.a*(1-e.a))/o,b:(e.b*e.a+r.b*r.a*(1-e.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(i){let e=this.toHsl(),{h:r}=e,o=[this],s=360/i;for(let n=1;n<i;n++)o.push(new t({h:(r+n*s)%360,s:e.s,l:e.l}));return o}equals(i){let e=new t(i);return this.format==="cmyk"||e.format==="cmyk"?this.toCmykString()===e.toCmykString():this.toRgbString()===e.toRgbString()}};var Za="EyeDropper"in window,j=class extends V{constructor(){super(),this.formControlController=new mt(this),this.isSafeValue=false,this.localize=new W(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],i=(t.indexOf(this.format)+1)%t.length;this.format=t[i],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let i=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),e=i.querySelector(".color-picker__slider-handle"),{width:r}=i.getBoundingClientRect(),o=this.value,s=this.value;e.focus(),t.preventDefault(),$i(i,{onMove:n=>{this.alpha=ct(n/r*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let i=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),e=i.querySelector(".color-picker__slider-handle"),{width:r}=i.getBoundingClientRect(),o=this.value,s=this.value;e.focus(),t.preventDefault(),$i(i,{onMove:n=>{this.hue=ct(n/r*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let i=this.shadowRoot.querySelector(".color-picker__grid"),e=i.querySelector(".color-picker__grid-handle"),{width:r,height:o}=i.getBoundingClientRect(),s=this.value,n=this.value;e.focus(),t.preventDefault(),this.isDraggingGridHandle=true,$i(i,{onMove:(c,l)=>{this.saturation=ct(c/r*100,0,100),this.brightness=ct(100-l/o*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let i=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=ct(this.alpha-i,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=ct(this.alpha+i,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let i=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=ct(this.hue-i,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=ct(this.hue+i,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let i=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=ct(this.saturation-i,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=ct(this.saturation+i,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=ct(this.brightness+i,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=ct(this.brightness-i,0,100),this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let i=t.target,e=this.value;t.stopPropagation(),this.input.value?(this.setColor(i.value),i.value=this.value):this.value="",this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let i=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==i&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let i=new fr(t);if(!i.isValid)return null;let e=i.toHsl(),r={h:e.h,s:e.s*100,l:e.l*100,a:e.a},o=i.toRgb(),s=i.toHexString(),n=i.toHex8String(),c=i.toHsv(),l={h:c.h,s:c.s*100,v:c.v*100,a:c.a};return {hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:o.r,g:o.g,b:o.b,string:this.setLetterCase(`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`)},rgba:{r:o.r,g:o.g,b:o.b,a:o.a,string:this.setLetterCase(`rgba(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)}, ${o.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let i=this.parseColor(t);return i===null?false:(this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=this.opacity?i.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!Za)return;new EyeDropper().open().then(i=>{let e=this.value;this.setColor(i.sRGBHex),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let i=this.value;this.disabled||(this.setColor(t),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,i,e,r=100){let o=new fr(`hsva(${t}, ${i}%, ${e}%, ${r/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,i){if(this.isEmpty=!i,i||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let e=this.parseColor(i);e!==null?(this.inputValue=this.value,this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=e.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let i=this.inline?this.base:this.trigger;this.hasFocus&&(i.focus({preventScroll:true}),i.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let i=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(i===null)return "";switch(t){case "hex":return i.hex;case "hexa":return i.hexa;case "rgb":return i.rgb.string;case "rgba":return i.rgba.string;case "hsl":return i.hsl.string;case "hsla":return i.hsla.string;case "hsv":return i.hsv.string;case "hsva":return i.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,i=100-this.brightness,e=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(o=>o.trim()!==""),r=u`
      <div
        part="base"
        class=${L({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?u`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${J({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${L({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${J({top:`${i}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${w(this.disabled?void 0:"0")}
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
                style=${J({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${w(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?u`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${J({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${J({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${w(this.disabled?void 0:"0")}
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
            style=${J({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            ${this.noFormatToggle?"":u`
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
            ${Za?u`
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

        ${e.length>0?u`
              <div part="swatches" class="color-picker__swatches">
                ${e.map(o=>{let s=this.parseColor(o);return s?u`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${w(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${o}
                      @click=${()=>this.selectSwatch(o)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(s.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${J({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${o}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?r:u`
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
          class=${L({"color-dropdown__trigger":true,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":true})}
          style=${J({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${r}
      </sl-dropdown>
    `}};j.styles=[P,Na];j.dependencies={"sl-button-group":Oe,"sl-button":G,"sl-dropdown":dt,"sl-icon":q,"sl-input":H,"sl-visually-hidden":us};a([$('[part~="base"]')],j.prototype,"base",2);a([$('[part~="input"]')],j.prototype,"input",2);a([$(".color-dropdown")],j.prototype,"dropdown",2);a([$('[part~="preview"]')],j.prototype,"previewButton",2);a([$('[part~="trigger"]')],j.prototype,"trigger",2);a([k()],j.prototype,"hasFocus",2);a([k()],j.prototype,"isDraggingGridHandle",2);a([k()],j.prototype,"isEmpty",2);a([k()],j.prototype,"inputValue",2);a([k()],j.prototype,"hue",2);a([k()],j.prototype,"saturation",2);a([k()],j.prototype,"brightness",2);a([k()],j.prototype,"alpha",2);a([p()],j.prototype,"value",2);a([Ft()],j.prototype,"defaultValue",2);a([p()],j.prototype,"label",2);a([p()],j.prototype,"format",2);a([p({type:Boolean,reflect:true})],j.prototype,"inline",2);a([p({reflect:true})],j.prototype,"size",2);a([p({attribute:"no-format-toggle",type:Boolean})],j.prototype,"noFormatToggle",2);a([p()],j.prototype,"name",2);a([p({type:Boolean,reflect:true})],j.prototype,"disabled",2);a([p({type:Boolean})],j.prototype,"hoist",2);a([p({type:Boolean})],j.prototype,"opacity",2);a([p({type:Boolean})],j.prototype,"uppercase",2);a([p()],j.prototype,"swatches",2);a([p({reflect:true})],j.prototype,"form",2);a([p({type:Boolean,reflect:true})],j.prototype,"required",2);a([Ce({passive:false})],j.prototype,"handleTouchMove",1);a([E("format",{waitUntilFirstUpdate:true})],j.prototype,"handleFormatChange",1);a([E("opacity",{waitUntilFirstUpdate:true})],j.prototype,"handleOpacityChange",1);a([E("value")],j.prototype,"handleValueChange",1);j.define("sl-color-picker");var Jc=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class gr extends R{getInitialOptions(){return {format:"hex",opacity:false,inline:false,presets:Jc}}renderInput(){return u`
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
                .swatches=${this.options.presets.join(";")}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-color-picker>
        `}renderView(){return u`<span><span class="color" style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[R.styles,y`
            sl-color-picker::part(trigger) {
                border-radius: 4px;
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
        `],exports.AutoFieldColorPicker=v([I("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class br extends R{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((e,r)=>{let o={};return typeof e=="object"?Object.assign(o,e):Object.assign(o,{id:e,label:e,value:e}),o.icon&&(this.isShowIcon=true),o.$index=r,o}),this.selection=this.value;}renderInput(){return u`
            <div class="items">
                ${this.items.map(e=>this.renderCheckItemWithCard(this.renderCheckboxItem(e),e))}
            </div>
        `}renderCheckboxItem(e){return u`
            <sl-checkbox
                data-index="${e.$index}"
                data-value="${e[this.valueKey]}"
                .value="${e[this.valueKey]}"
                .checked=${this.value.includes(e[this.valueKey])}
                help-text="${e.tips}"
                @sl-change=${this._onCheckChange.bind(this)}
            >
                ${e.label}</sl-checkbox
            >
        `}_onCheckChange(e){let r=e.target.closest(".card")||e.target,o=Number(r.dataset.index),s=r.checked??!r.classList.contains("selected"),n=this.items[o];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let c=this.selection.findIndex(l=>l===n[this.valueKey]);c>-1&&this.selection.splice(c,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(e,r){if(this.options.card){let o=this.selection.includes(r[this.valueKey]);return u`<div
                class="card ${o?"selected":""}"
                data-index="${r.$index}"
                style=${J({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">${B(this.isShowIcon,()=>u`<sl-icon class="icon" name="${r.icon||""}"></sl-icon>`)} ${e}</div>
            </div>`}else return e}};exports.AutoFieldCheckboxGroup.styles=[R.styles,y`
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
                stroke-width: 1;
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
                    &:hover {
                        outline: 1px solid var(--sl-color-primary-500);
                    }
                    sl-icon.icon {
                        flex-shrink: 0;
                        color: var(--sl-color-gray-500);
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
                        max-height: 2.5em;
                        line-height: 120%;
                        overflow: hidden;
                    }
                    sl-checkbox::part(control) {
                        display: none;
                    }
                }
                &.card.selected {
                    & > .body {
                        border: 1px solid var(--sl-color-primary-500);
                        background-color: var(--sl-color-primary-50);
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
        `],exports.AutoFieldCheckboxGroup=v([I("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class vr extends R{constructor(){super(...arguments);this.parts=[];}getInitialOptions(){return {template:"0000",delimiter:"",caseType:"both",includeDelimiter:true,onlyNumber:false}}_isValidChar(e){return this.options.chars?new RegExp(this.options.chars).test(e):true}_onKeyDown(e){let r=e.key;r.length===1&&(this._isValidChar(r)||e.preventDefault(),e.stopPropagation());}_onPartInput(e){let o=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,c)=>(n+=c.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),s=0;this.parts.forEach((n,c)=>{this.options.delimiter.includes(n)||(this.parts[c]=o[s++]);}),this.onFieldChange(),this._isLastInput(e);}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((e,r)=>this.options.delimiter.includes(r)?e:`${e}${r}`,"")}_isLastInput(e){let r=e.target;if(r.value.length>=1){r.blur();let o=r.nextElementSibling||r.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(e){e.preventDefault();let r=e.clipboardData?.getData("text/plain")||"",o=this._parseParts(r),s=c=>{if(c){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let c of o)if(!this.options.delimiter.includes(c)&&(n.value=c,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value);}_parseParts(e){let r=this.options.delimiter,o=this.options.template,s=0;return Array.from(o).map(n=>{if(r.includes(n))return e[s]===n&&s++,n;{let c=e[s++]||n;return this.options.caseType==="upper"?c.toUpperCase():this.options.caseType==="lower"?c.toLowerCase():c}})}_onPartFocus(e){e.target.select();}renderPart(e){return u`<sl-input
            maxLength="1"
            .value=${e}
            noSpinButtons
            autocorrect="off"
            autocomplete="off"
            spellcheck="false"
            @paste=${r=>this._onPaste(r)}
            @sl-focus=${this._onPartFocus.bind(this)}
            @keydown=${this._onKeyDown.bind(this)}
            @sl-input=${this._onPartInput.bind(this)}
        ></sl-input>`}renderInput(){return u`
            <auto-flex grow="none" align="center" gap="0.5em" wrap>
                ${et(this.parts,e=>this.options.delimiter.includes(e)?u`${e}`:this.renderPart(e))}
            </auto-flex>
        `}};exports.AutoFieldParts.styles=[R.styles,y`
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
                background-color: var(--sl-color-gray-100);
            }
        `],exports.AutoFieldParts=v([I("auto-field-parts")],exports.AutoFieldParts);var Ja=y`
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
`;var vo=class extends V{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let i=["menuitem","menuitemcheckbox"],e=t.composedPath(),r=e.find(c=>{var l;return i.includes(((l=c?.getAttribute)==null?void 0:l.call(c,"role"))||"")});if(!r||e.find(c=>{var l;return ((l=c?.getAttribute)==null?void 0:l.call(c,"role"))==="menu"})!==this)return;let n=r;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let i=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),i?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let i=this.getAllItems(),e=this.getCurrentItem(),r=e?i.indexOf(e):0;i.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?r++:t.key==="ArrowUp"?r--:t.key==="Home"?r=0:t.key==="End"&&(r=i.length-1),r<0&&(r=i.length-1),r>i.length-1&&(r=0),this.setCurrentItem(i[r]),i[r].focus());}}handleMouseDown(t){let i=t.target;this.isMenuItem(i)&&this.setCurrentItem(i);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var i;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((i=t.getAttribute("role"))!=null?i:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1");});}render(){return u`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};vo.styles=[P,Ja];a([$("slot")],vo.prototype,"defaultSlot",2);vo.define("sl-menu");var tl=y`
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
`;var yr=(t,i)=>{let e=t._$AN;if(e===void 0)return  false;for(let r of e)r._$AO?.(i,false),yr(r,i);return  true},yo=t=>{let i,e;do{if((i=t._$AM)===void 0)break;e=i._$AN,e.delete(t),t=i;}while(e?.size===0)},el=t=>{for(let i;i=t._$AM;t=i){let e=i._$AN;if(e===void 0)i._$AN=e=new Set;else if(e.has(t))break;e.add(t),ip(i);}};function tp(t){this._$AN!==void 0?(yo(this),this._$AM=t,el(this)):this._$AM=t;}function ep(t,i=false,e=0){let r=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(i)if(Array.isArray(r))for(let s=e;s<r.length;s++)yr(r[s],false),yo(r[s]);else r!=null&&(yr(r,false),yo(r));else yr(this,t);}var ip=t=>{t.type==vt.CHILD&&(t._$AP??=ep,t._$AQ??=tp);},xo=class extends Et{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,e,r){super._$AT(i,e,r),el(this),this.isConnected=i._$AU;}_$AO(i,e=true){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),e&&(yr(this,i),yo(this));}setValue(i){if(Br(this._$Ct))this._$Ct._$AI(i,this);else {let e=[...this._$Ct._$AH];e[this._$Ci]=i,this._$Ct._$AI(e,this,0);}}disconnected(){}reconnected(){}};var il=()=>new ws,ws=class{},_s=new WeakMap,rl=Dt(class extends xo{render(t){return Y}update(t,[i]){let e=i!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=i,this.ht=t.options?.host,this.rt(this.ct=t.element)),Y}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let i=this.ht??globalThis,e=_s.get(i);e===void 0&&(e=new WeakMap,_s.set(i,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?_s.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var ol=class{constructor(t,i){this.popupRef=il(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=e=>{switch(e.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(e);break;}},this.handleClick=e=>{var r;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&(e.target.tagName==="sl-menu-item"||(r=e.target.role)!=null&&r.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=e=>{e.stopPropagation();},this.handlePopupReposition=()=>{let e=this.host.renderRoot.querySelector("slot[name='submenu']"),r=e?.assignedElements({flatten:true}).filter(h=>h.localName==="sl-menu")[0],o=getComputedStyle(this.host).direction==="rtl";if(!r)return;let{left:s,top:n,width:c,height:l}=r.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${o?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${o?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`);},(this.host=t).addController(this),this.hasSlotController=i;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let i=this.host.renderRoot.querySelector("slot[name='submenu']");if(!i){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let e=null;for(let r of i.assignedElements())if(e=r.querySelectorAll("sl-menu-item, [role^='menuitem']"),e.length!==0)break;if(!(!e||e.length===0)){e[0].setAttribute("tabindex","0");for(let r=1;r!==e.length;++r)e[r].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?e[0]instanceof HTMLElement&&e[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{e[0]instanceof HTMLElement&&e[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let i=this.host.parentElement.computedStyleMap(),r=["padding-top","border-top-width","margin-top"].reduce((o,s)=>{var n;let c=(n=i.get(s))!=null?n:new CSSUnitValue(0,"px"),h=(c instanceof CSSUnitValue?c:new CSSUnitValue(0,"px")).to("px");return o-h.value},0);this.skidding=r;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?u`
      <sl-popup
        ${rl(this.popupRef)}
        placement=${t?"left-start":"right-start"}
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
    `:u` <slot name="submenu" hidden></slot> `}};var Lt=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new at(this,"submenu"),this.submenuController=new ol(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return zn(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",i=this.submenuController.isExpanded();return u`
      <div
        id="anchor"
        part="base"
        class=${L({"menu-item":true,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":i})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!i}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${t?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?u` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};Lt.styles=[P,tl];Lt.dependencies={"sl-icon":q,"sl-popup":X,"sl-spinner":ve};a([$("slot:not([name])")],Lt.prototype,"defaultSlot",2);a([$(".menu-item")],Lt.prototype,"menuItem",2);a([p()],Lt.prototype,"type",2);a([p({type:Boolean,reflect:true})],Lt.prototype,"checked",2);a([p()],Lt.prototype,"value",2);a([p({type:Boolean,reflect:true})],Lt.prototype,"loading",2);a([p({type:Boolean,reflect:true})],Lt.prototype,"disabled",2);a([E("checked")],Lt.prototype,"handleCheckedChange",1);a([E("disabled")],Lt.prototype,"handleDisabledChange",1);a([E("type")],Lt.prototype,"handleTypeChange",1);Lt.define("sl-menu-item");var sl=y`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;var Ss=()=>null,Vt=class extends V{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new W(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=Ss,this.snapThreshold=12;}toSnapFunction(t){let i=t.split(" ");return ({pos:e,size:r,snapThreshold:o,isRtl:s,vertical:n})=>{let c=e,l=Number.POSITIVE_INFINITY;return i.forEach(h=>{let m;if(h.startsWith("repeat(")){let f=t.substring(7,t.length-1),g=f.endsWith("%"),b=Number.parseFloat(f),x=g?r*(b/100):b;m=Math.round((s&&!n?r-e:e)/x)*x;}else h.endsWith("%")?m=r*(Number.parseFloat(h)/100):m=Number.parseFloat(h);s&&!n&&(m=r-m);let d=Math.abs(e-m);d<=o&&d<l&&(c=m,l=d);}),c}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=Ss;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:i}=this.getBoundingClientRect();this.size=this.vertical?i:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let i=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),$i(this,{onMove:(e,r)=>{var o;let s=this.vertical?r:e;this.primary==="end"&&(s=this.size-s),s=(o=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:i,vertical:this.vertical}))!=null?o:s,this.position=ct(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let i=this.position,e=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(i-=e),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(i+=e),t.key==="Home"&&(i=this.primary==="end"?100:0),t.key==="End"&&(i=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)i=this.positionBeforeCollapsing,this.isCollapsed=false;else {let r=this.position;i=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=r;});}this.position=ct(i,0,100);}}handleResize(t){let{width:i,height:e}=t[0].contentRect;this.size=this.vertical?e:i,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",i=this.vertical?"gridTemplateColumns":"gridTemplateRows",e=this.localize.dir()==="rtl",r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,o="auto";return this.primary==="end"?e&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${r}`:e&&!this.vertical?this.style[t]=`${o} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${o}`,this.style[i]="",u`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${w(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};Vt.styles=[P,sl];a([$(".divider")],Vt.prototype,"divider",2);a([p({type:Number,reflect:true})],Vt.prototype,"position",2);a([p({attribute:"position-in-pixels",type:Number})],Vt.prototype,"positionInPixels",2);a([p({type:Boolean,reflect:true})],Vt.prototype,"vertical",2);a([p({type:Boolean,reflect:true})],Vt.prototype,"disabled",2);a([p()],Vt.prototype,"primary",2);a([p({reflect:true})],Vt.prototype,"snap",1);a([p({type:Number,attribute:"snap-threshold"})],Vt.prototype,"snapThreshold",2);a([E("position")],Vt.prototype,"handlePositionChange",1);a([E("positionInPixels")],Vt.prototype,"handlePositionInPixelsChange",1);a([E("vertical")],Vt.prototype,"handleVerticalChange",1);Vt.define("sl-split-panel");se.define("sl-tag");exports.AutoFieldList=class Qe extends R{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.items=[];this.scrollbar=new Ie(this);this.scrollbars=[];this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu,.results")?.forEach(r=>{this.scrollbars.push(this.scrollbar.create(r,{width:"5px"}));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}connectedCallback(){if(super.connectedCallback(),this.options){this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let e=this.options.select;e&&(this.items=e,this.items.forEach(r=>{this.isItemSelected(r)&&this.selection.push(r[this.valueKey]);})),this.setPresetActions();}this.style.height="auto";}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.valueKey]:this.value.includes(e[this.valueKey])}_addSecectItem(e){this.selection.findIndex(o=>o[this.valueKey]===e[this.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(e[this.valueKey]));}_removeSelectItem(e){for(let r=this.selection.length-1;r>=0;r--)this.selection[r]===e&&this.selection.splice(r,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(e){let r=e.detail.item,o=r.dataset.index,s=this.items[o];s&&(r.checked?this._addSecectItem(s):this._removeSelectItem(s[this.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.length}`,this.onFieldChange());}_renderWithSplitPanel(e){return this.options.showResults?u`<sl-split-panel position="60"> ${e} ${this.renderResults()} </sl-split-panel>`:e}_renderItem(e){let r=this.options.renderItem;return typeof r=="string"?u`${Ot(r.replace(/\{(.+?)\}/g,(o,s)=>e[s]))}`:typeof r=="function"?u`${Ot(r(e))}`:e.label}_onClickPresetAction(e){e==="all"?this.selection=this.items.map(r=>r[this.valueKey]):e==="reverse"?this.selection=this.items.filter(r=>!this.selection.includes(r[this.valueKey])).map(r=>r[this.valueKey]):e==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let e=[{id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")}],r=o=>{for(let s=e.length-1;s>=0;s--)if(e[s].id===o.id){let n=o.onClick;o.onClick=()=>{e[s].onClick(),n&&n.call(this,this.getInputValue());},e.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(o=>{r(o);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(o=>{r(o);}),e.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...e));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(e){let r=this.options.labelKey;if(r){if(r in e)return e[r]}else return e.label}renderResults(){return u`<div
            slot="end"
            class="results mark-err"
            no-padding
            style="${J({maxHeight:this.options.height})}"
        >
            ${et(this.selection,e=>u`<div class="item">
                    <span>${e}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(e)}></sl-icon-button>
                </div>`)}
        </div>`}_renderList(){let e=Array.isArray(this.value)?this.value:[this.value];return u`${this._renderWithSplitPanel(u` <sl-menu
            slot="start"
            class="mark-err"
            style=${J({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}
        >
            ${et(this.items,(r,o)=>{let s=e.includes(r[this.valueKey]);return u`<sl-menu-item type="checkbox" data-index=${String(o)} .checked=${s}>
                    ${B(r.icon,()=>u`<sl-icon slot="prefix" name="${r.icon}"></sl-icon>`)}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(r)} </auto-flex>
                </sl-menu-item>`})}
        </sl-menu>`)} `}_renderHeader(){return u`${B(this.beforeActions.length>0,()=>u`<div class="header">${this.renderBeforeActions()}</div>`)}`}_renderFooter(){return u`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.items.length} </span>
        </div>`}renderInput(){return u` ${this._renderHeader()} ${this._renderList()} ${this._renderFooter()} `}};exports.AutoFieldList.styles=[R.styles,Ie.styles,y`
            sl-menu-item[checked] {
                background-color: var(--sl-color-primary-100);
            }
            .header {
                padding: 4px 0px;
                padding-bottom: 8px;
            }
            .footer {
                padding: 4px 0px;
                padding-top: 8px;
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
            sl-menu {
                border: 0px;
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
            sl-split-panel {
                border: var(--auto-border);
            }
            .results > .ss-wrapper > .ss-content {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                padding: 4px;
                box-sizing: border-box;
                overflow-x: hidden;
                font-size: var(--auto-font-size);
                & > .item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-radius: 4px;
                    padding: 4px;
                    border: var(--auto-border);
                    background-color: var(--sl-color-gray-50);
                    margin-bottom: 4px;
                    box-shadow: 1px 1px 1px var(--sl-color-gray-200);
                    &:hover {
                        background-color: var(--sl-color-gray-100);
                    }
                    & > :first-child {
                        flex-grow: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        `],v([k()],exports.AutoFieldList.prototype,"selectedTips",2),v([$("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=v([I("auto-field-list")],exports.AutoFieldList);var nl=y`
  :host {
    display: inline-block;
  }
`;var al=null,_o=class{};_o.render=function(t,i){al(t,i);};self.QrCreator=_o;(function(t){function i(c,l,h,m){var d={},f=t(h,l);f.u(c),f.J(),m=m||0;var g=f.h(),b=f.h()+2*m;return d.text=c,d.level=l,d.version=h,d.O=b,d.a=function(x,T){return x-=m,T-=m,0>x||x>=g||0>T||T>=g?false:f.a(x,T)},d}function e(c,l,h,m,d,f,g,b,x,T){function A(S,O,_,C,D,F,U){S?(c.lineTo(O+F,_+U),c.arcTo(O,_,C,D,f)):c.lineTo(O,_);}g?c.moveTo(l+f,h):c.moveTo(l,h),A(b,m,h,m,d,-f,0),A(x,m,d,l,d,0,-f),A(T,l,d,l,h,f,0),A(g,l,h,m,h,0,f);}function r(c,l,h,m,d,f,g,b,x,T){function A(S,O,_,C){c.moveTo(S+_,O),c.lineTo(S,O),c.lineTo(S,O+C),c.arcTo(S,O,S+_,O,f);}g&&A(l,h,f,f),b&&A(m,h,-f,f),x&&A(m,d,-f,-f),T&&A(l,d,f,-f);}function o(c,l){var h=l.fill;if(typeof h=="string")c.fillStyle=h;else {var m=h.type,d=h.colorStops;if(h=h.position.map(g=>Math.round(g*l.size)),m==="linear-gradient")var f=c.createLinearGradient.apply(c,h);else if(m==="radial-gradient")f=c.createRadialGradient.apply(c,h);else throw Error("Unsupported fill");d.forEach(([g,b])=>{f.addColorStop(g,b);}),c.fillStyle=f;}}function s(c,l){t:{var h=l.text,m=l.v,d=l.N,f=l.K,g=l.P;for(d=Math.max(1,d||1),f=Math.min(40,f||40);d<=f;d+=1)try{var b=i(h,m,d,g);break t}catch{}b=void 0;}if(!b)return null;for(h=c.getContext("2d"),l.background&&(h.fillStyle=l.background,h.fillRect(l.left,l.top,l.size,l.size)),m=b.O,f=l.size/m,h.beginPath(),g=0;g<m;g+=1)for(d=0;d<m;d+=1){var x=h,T=l.left+d*f,A=l.top+g*f,S=g,O=d,_=b.a,C=T+f,D=A+f,F=S-1,U=S+1,M=O-1,z=O+1,pt=Math.floor(Math.min(.5,Math.max(0,l.R))*f),st=_(S,O),_t=_(F,M),Ct=_(F,O);F=_(F,z);var wt=_(S,z);z=_(U,z),O=_(U,O),U=_(U,M),S=_(S,M),T=Math.round(T),A=Math.round(A),C=Math.round(C),D=Math.round(D),st?e(x,T,A,C,D,pt,!Ct&&!S,!Ct&&!wt,!O&&!wt,!O&&!S):r(x,T,A,C,D,pt,Ct&&S&&_t,Ct&&wt&&F,O&&wt&&z,O&&S&&U);}return o(h,l),h.fill(),c}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};al=function(c,l){var h={};Object.assign(h,n,c),h.N=h.minVersion,h.K=h.maxVersion,h.v=h.ecLevel,h.left=h.left,h.top=h.top,h.size=h.size,h.fill=h.fill,h.background=h.background,h.text=h.text,h.R=h.radius,h.P=h.quiet,l instanceof HTMLCanvasElement?((l.width!==h.size||l.height!==h.size)&&(l.width=h.size,l.height=h.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,h)):(c=document.createElement("canvas"),c.width=h.size,c.height=h.size,h=s(c,h),l.appendChild(h));};})(function(){function t(l){var h=e.s(l);return {S:function(){return 4},b:function(){return h.length},write:function(m){for(var d=0;d<h.length;d+=1)m.put(h[d],8);}}}function i(){var l=[],h=0,m={B:function(){return l},c:function(d){return (l[Math.floor(d/8)]>>>7-d%8&1)==1},put:function(d,f){for(var g=0;g<f;g+=1)m.m((d>>>f-g-1&1)==1);},f:function(){return h},m:function(d){var f=Math.floor(h/8);l.length<=f&&l.push(0),d&&(l[f]|=128>>>h%8),h+=1;}};return m}function e(l,h){function m(S,O){for(var _=-1;7>=_;_+=1)if(!(-1>=S+_||b<=S+_))for(var C=-1;7>=C;C+=1) -1>=O+C||b<=O+C||(g[S+_][O+C]=0<=_&&6>=_&&(C==0||C==6)||0<=C&&6>=C&&(_==0||_==6)||2<=_&&4>=_&&2<=C&&4>=C);}function d(S,O){for(var _=b=4*l+17,C=Array(_),D=0;D<_;D+=1){C[D]=Array(_);for(var F=0;F<_;F+=1)C[D][F]=null;}for(g=C,m(0,0),m(b-7,0),m(0,b-7),_=s.G(l),C=0;C<_.length;C+=1)for(D=0;D<_.length;D+=1){F=_[C];var U=_[D];if(g[F][U]==null)for(var M=-2;2>=M;M+=1)for(var z=-2;2>=z;z+=1)g[F+M][U+z]=M==-2||M==2||z==-2||z==2||M==0&&z==0;}for(_=8;_<b-8;_+=1)g[_][6]==null&&(g[_][6]=_%2==0);for(_=8;_<b-8;_+=1)g[6][_]==null&&(g[6][_]=_%2==0);for(_=s.w(f<<3|O),C=0;15>C;C+=1)D=!S&&(_>>C&1)==1,g[6>C?C:8>C?C+1:b-15+C][8]=D,g[8][8>C?b-C-1:9>C?15-C:14-C]=D;if(g[b-8][8]=!S,7<=l){for(_=s.A(l),C=0;18>C;C+=1)D=!S&&(_>>C&1)==1,g[Math.floor(C/3)][C%3+b-8-3]=D;for(C=0;18>C;C+=1)D=!S&&(_>>C&1)==1,g[C%3+b-8-3][Math.floor(C/3)]=D;}if(x==null){for(S=c.I(l,f),_=i(),C=0;C<T.length;C+=1)D=T[C],_.put(4,4),_.put(D.b(),s.f(4,l)),D.write(_);for(C=D=0;C<S.length;C+=1)D+=S[C].j;if(_.f()>8*D)throw Error("code length overflow. ("+_.f()+">"+8*D+")");for(_.f()+4<=8*D&&_.put(0,4);_.f()%8!=0;)_.m(false);for(;!(_.f()>=8*D)&&(_.put(236,8),!(_.f()>=8*D));)_.put(17,8);var pt=0;for(D=C=0,F=Array(S.length),U=Array(S.length),M=0;M<S.length;M+=1){var st=S[M].j,_t=S[M].o-st;for(C=Math.max(C,st),D=Math.max(D,_t),F[M]=Array(st),z=0;z<F[M].length;z+=1)F[M][z]=255&_.B()[z+pt];for(pt+=st,z=s.C(_t),st=r(F[M],z.b()-1).l(z),U[M]=Array(z.b()-1),z=0;z<U[M].length;z+=1)_t=z+st.b()-U[M].length,U[M][z]=0<=_t?st.c(_t):0;}for(z=_=0;z<S.length;z+=1)_+=S[z].o;for(_=Array(_),z=pt=0;z<C;z+=1)for(M=0;M<S.length;M+=1)z<F[M].length&&(_[pt]=F[M][z],pt+=1);for(z=0;z<D;z+=1)for(M=0;M<S.length;M+=1)z<U[M].length&&(_[pt]=U[M][z],pt+=1);x=_;}for(S=x,_=-1,C=b-1,D=7,F=0,O=s.F(O),U=b-1;0<U;U-=2)for(U==6&&--U;;){for(M=0;2>M;M+=1)g[C][U-M]==null&&(z=false,F<S.length&&(z=(S[F]>>>D&1)==1),O(C,U-M)&&(z=!z),g[C][U-M]=z,--D,D==-1&&(F+=1,D=7));if(C+=_,0>C||b<=C){C-=_,_=-_;break}}}var f=o[h],g=null,b=0,x=null,T=[],A={u:function(S){S=t(S),T.push(S),x=null;},a:function(S,O){if(0>S||b<=S||0>O||b<=O)throw Error(S+","+O);return g[S][O]},h:function(){return b},J:function(){for(var S=0,O=0,_=0;8>_;_+=1){d(true,_);var C=s.D(A);(_==0||S>C)&&(S=C,O=_);}d(false,O);}};return A}function r(l,h){if(typeof l.length>"u")throw Error(l.length+"/"+h);var m=function(){for(var f=0;f<l.length&&l[f]==0;)f+=1;for(var g=Array(l.length-f+h),b=0;b<l.length-f;b+=1)g[b]=l[b+f];return g}(),d={c:function(f){return m[f]},b:function(){return m.length},multiply:function(f){for(var g=Array(d.b()+f.b()-1),b=0;b<d.b();b+=1)for(var x=0;x<f.b();x+=1)g[b+x]^=n.i(n.g(d.c(b))+n.g(f.c(x)));return r(g,0)},l:function(f){if(0>d.b()-f.b())return d;for(var g=n.g(d.c(0))-n.g(f.c(0)),b=Array(d.b()),x=0;x<d.b();x+=1)b[x]=d.c(x);for(x=0;x<f.b();x+=1)b[x]^=n.i(n.g(f.c(x))+g);return r(b,0).l(f)}};return d}e.s=function(l){for(var h=[],m=0;m<l.length;m++){var d=l.charCodeAt(m);128>d?h.push(d):2048>d?h.push(192|d>>6,128|d&63):55296>d||57344<=d?h.push(224|d>>12,128|d>>6&63,128|d&63):(m++,d=65536+((d&1023)<<10|l.charCodeAt(m)&1023),h.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63));}return h};var o={L:1,M:0,Q:3,H:2},s=function(){function l(d){for(var f=0;d!=0;)f+=1,d>>>=1;return f}var h=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],m={w:function(d){for(var f=d<<10;0<=l(f)-l(1335);)f^=1335<<l(f)-l(1335);return (d<<10|f)^21522},A:function(d){for(var f=d<<12;0<=l(f)-l(7973);)f^=7973<<l(f)-l(7973);return d<<12|f},G:function(d){return h[d-1]},F:function(d){switch(d){case 0:return function(f,g){return (f+g)%2==0};case 1:return function(f){return f%2==0};case 2:return function(f,g){return g%3==0};case 3:return function(f,g){return (f+g)%3==0};case 4:return function(f,g){return (Math.floor(f/2)+Math.floor(g/3))%2==0};case 5:return function(f,g){return f*g%2+f*g%3==0};case 6:return function(f,g){return (f*g%2+f*g%3)%2==0};case 7:return function(f,g){return (f*g%3+(f+g)%2)%2==0};default:throw Error("bad maskPattern:"+d)}},C:function(d){for(var f=r([1],0),g=0;g<d;g+=1)f=f.multiply(r([1,n.i(g)],0));return f},f:function(d,f){if(d!=4||1>f||40<f)throw Error("mode: "+d+"; type: "+f);return 10>f?8:16},D:function(d){for(var f=d.h(),g=0,b=0;b<f;b+=1)for(var x=0;x<f;x+=1){for(var T=0,A=d.a(b,x),S=-1;1>=S;S+=1)if(!(0>b+S||f<=b+S))for(var O=-1;1>=O;O+=1)0>x+O||f<=x+O||(S!=0||O!=0)&&A==d.a(b+S,x+O)&&(T+=1);5<T&&(g+=3+T-5);}for(b=0;b<f-1;b+=1)for(x=0;x<f-1;x+=1)T=0,d.a(b,x)&&(T+=1),d.a(b+1,x)&&(T+=1),d.a(b,x+1)&&(T+=1),d.a(b+1,x+1)&&(T+=1),(T==0||T==4)&&(g+=3);for(b=0;b<f;b+=1)for(x=0;x<f-6;x+=1)d.a(b,x)&&!d.a(b,x+1)&&d.a(b,x+2)&&d.a(b,x+3)&&d.a(b,x+4)&&!d.a(b,x+5)&&d.a(b,x+6)&&(g+=40);for(x=0;x<f;x+=1)for(b=0;b<f-6;b+=1)d.a(b,x)&&!d.a(b+1,x)&&d.a(b+2,x)&&d.a(b+3,x)&&d.a(b+4,x)&&!d.a(b+5,x)&&d.a(b+6,x)&&(g+=40);for(x=T=0;x<f;x+=1)for(b=0;b<f;b+=1)d.a(b,x)&&(T+=1);return g+=Math.abs(100*T/f/f-50)/5*10}};return m}(),n=function(){for(var l=Array(256),h=Array(256),m=0;8>m;m+=1)l[m]=1<<m;for(m=8;256>m;m+=1)l[m]=l[m-4]^l[m-5]^l[m-6]^l[m-8];for(m=0;255>m;m+=1)h[l[m]]=m;return {g:function(d){if(1>d)throw Error("glog("+d+")");return h[d]},i:function(d){for(;0>d;)d+=255;for(;256<=d;)d-=255;return l[d]}}}(),c=function(){function l(d,f){switch(f){case o.L:return h[4*(d-1)];case o.M:return h[4*(d-1)+1];case o.Q:return h[4*(d-1)+2];case o.H:return h[4*(d-1)+3]}}var h=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],m={I:function(d,f){var g=l(d,f);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+d+"/errorCorrectLevel:"+f);d=g.length/3,f=[];for(var b=0;b<d;b+=1)for(var x=g[3*b],T=g[3*b+1],A=g[3*b+2],S=0;S<x;S+=1){var O=A,_={};_.o=T,_.j=O,f.push(_);}return f}};return m}();return e}());var ll=QrCreator;var Yt=class extends V{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&ll.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return u`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${J({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Yt.styles=[P,nl];a([$("canvas")],Yt.prototype,"canvas",2);a([p()],Yt.prototype,"value",2);a([p()],Yt.prototype,"label",2);a([p({type:Number})],Yt.prototype,"size",2);a([p()],Yt.prototype,"fill",2);a([p()],Yt.prototype,"background",2);a([p({type:Number})],Yt.prototype,"radius",2);a([p({attribute:"error-correction"})],Yt.prototype,"errorCorrection",2);a([E(["background","errorCorrection","fill","radius","size","value"])],Yt.prototype,"generate",1);Yt.define("sl-qr-code");exports.AutoFieldQRCode=class wo extends R{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return u`
            <sl-qr-code
                slot="value"
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                .placeholder=${this.options.placeholder}
                title="${w(this.options.tips)}"
                fill=${this.options.fill}
                background=${this.options.background}
                radius=${this.options.radius}
                error-correction=${this.options.errorCorrection}
                size=${parseInt(String(this.options.size))}
            ></sl-qr-code>
        `}};exports.AutoFieldQRCode=v([I("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class Ze extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let e=this.options.url,[r,o]=e.split("?"),s=new URLSearchParams(o);return s.set("t",Date.now().toString()),`${r}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return u`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,y`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
        `],v([$("img")],exports.AutoFieldCaptcha.prototype,"img",2),v([k()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=v([I("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class Je extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let e=this.stepCount,r=()=>{let o=Math.ceil(e*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",o.toString()),this.requestUpdate()),e--,e<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(r,this.step);};r();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let e=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(e)?Number(e[0]):Number(e),this.step=Array.isArray(e)?Number(e[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles],v([k()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),v([k()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=v([I("auto-field-verifycode")],exports.AutoFieldVerifyCode);var cl=y`
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
`;var it=class Cs extends V{constructor(){super(...arguments),this.localize=new W(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(i){return i instanceof Element&&i.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await Kt(this.childrenContainer);let{keyframes:i,options:e}=Ut(this,"tree-item.collapse",{dir:this.localize.dir()});await qt(this.childrenContainer,ki(i,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let i=this.parentElement;return !!i&&Cs.isTreeItem(i)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(i){i.has("selected")&&!i.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await Kt(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:i,options:e}=Ut(this,"tree-item.expand",{dir:this.localize.dir()});await qt(this.childrenContainer,ki(i,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:i=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(e=>Cs.isTreeItem(e)&&(i||!e.disabled)):[]}render(){let i=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return u`
      <div
        part="base"
        class="${L({"tree-item":true,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":e,"tree-item--rtl":this.localize.dir()==="rtl"})}"
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
            class=${L({"tree-item__expand-button":true,"tree-item__expand-button--visible":e})}
            aria-hidden="true"
          >
            ${B(this.loading,()=>u` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${i?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${i?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${B(this.selectable,()=>u`
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
                ?checked="${kt(this.selected)}"
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
    `}};it.styles=[P,cl];it.dependencies={"sl-checkbox":rt,"sl-icon":q,"sl-spinner":ve};a([k()],it.prototype,"indeterminate",2);a([k()],it.prototype,"isLeaf",2);a([k()],it.prototype,"loading",2);a([k()],it.prototype,"selectable",2);a([p({type:Boolean,reflect:true})],it.prototype,"expanded",2);a([p({type:Boolean,reflect:true})],it.prototype,"selected",2);a([p({type:Boolean,reflect:true})],it.prototype,"disabled",2);a([p({type:Boolean,reflect:true})],it.prototype,"lazy",2);a([$("slot:not([name])")],it.prototype,"defaultSlot",2);a([$("slot[name=children]")],it.prototype,"childrenSlot",2);a([$(".tree-item__item")],it.prototype,"itemElement",2);a([$(".tree-item__children")],it.prototype,"childrenContainer",2);a([$(".tree-item__expand-button slot")],it.prototype,"expandButtonSlot",2);a([E("loading",{waitUntilFirstUpdate:true})],it.prototype,"handleLoadingChange",1);a([E("disabled")],it.prototype,"handleDisabledChange",1);a([E("selected")],it.prototype,"handleSelectedChange",1);a([E("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandedChange",1);a([E("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandAnimation",1);a([E("lazy",{waitUntilFirstUpdate:true})],it.prototype,"handleLazyChange",1);var ti=it;jt("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});jt("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var pl=y`
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
`;function dl(t,i=false){function e(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let c=n.every(h=>h.selected),l=n.every(h=>!h.selected&&!h.indeterminate);s.selected=c,s.indeterminate=!c&&!l;}}function r(s){let n=s.parentElement;ti.isTreeItem(n)&&(e(n),r(n));}function o(s){for(let n of s.getChildrenItems())n.selected=i?s.selected||n.selected:!n.disabled&&s.selected,o(n);i&&e(s);}o(t),r(t);}var Ve=class extends V{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new W(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(i=>!!this.querySelector(`[slot="${i}-icon"]`)).forEach(i=>{let e=t.querySelector(`[slot="${i}-icon"]`),r=this.getExpandButtonIcon(i);r&&(e===null?t.append(r):e.hasAttribute("data-default")&&e.replaceWith(r));});},this.handleTreeChanged=t=>{for(let i of t){let e=[...i.addedNodes].filter(ti.isTreeItem),r=[...i.removedNodes].filter(ti.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let i=t.relatedTarget;(!i||!this.contains(i))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let i=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),ti.isTreeItem(i)&&!i.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=i,this.tabIndex=-1,i.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let e=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(e){let r=e.cloneNode(true);return [r,...r.querySelectorAll("[id]")].forEach(o=>o.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${t}-icon`,r}return null}selectItem(t){let i=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),dl(t);else if(this.selection==="single"||t.isLeaf){let r=this.getAllTreeItems();for(let o of r)o.selected=o===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let e=this.selectedItems;(i.length!==e.length||e.some(r=>!i.includes(r)))&&Promise.all(e.map(r=>r.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:e}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(o=>{var s;return ["input","textarea"].includes((s=o?.tagName)==null?void 0:s.toLowerCase())}))return;let i=this.getFocusableItems(),e=this.localize.dir()==="ltr",r=this.localize.dir()==="rtl";if(i.length>0){t.preventDefault();let o=i.findIndex(l=>l.matches(":focus")),s=i[o],n=l=>{let h=i[ct(l,0,i.length-1)];this.focusItem(h);},c=l=>{s.expanded=l;};t.key==="ArrowDown"?n(o+1):t.key==="ArrowUp"?n(o-1):e&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(o+1):c(true):e&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(o-1):c(false):t.key==="Home"?n(0):t.key==="End"?n(i.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let i=t.target,e=i.closest("sl-tree-item"),r=t.composedPath().some(o=>{var s;return (s=o?.classList)==null?void 0:s.contains("tree-item__expand-button")});!e||e.disabled||i!==this.clickTarget||(r?e.expanded=!e.expanded:this.selectItem(e));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",i=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let e of i)e.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>dl(e,true)));}get selectedItems(){let t=this.getAllTreeItems(),i=e=>e.selected;return t.filter(i)}getFocusableItems(){let t=this.getAllTreeItems(),i=new Set;return t.filter(e=>{var r;if(e.disabled)return  false;let o=(r=e.parentElement)==null?void 0:r.closest("[role=treeitem]");return o&&(!o.expanded||o.loading||i.has(o))&&i.add(e),!i.has(e)})}render(){return u`
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
    `}};Ve.styles=[P,pl];a([$("slot:not([name])")],Ve.prototype,"defaultSlot",2);a([$("slot[name=expand-icon]")],Ve.prototype,"expandedIconSlot",2);a([$("slot[name=collapse-icon]")],Ve.prototype,"collapsedIconSlot",2);a([p()],Ve.prototype,"selection",2);a([E("selection")],Ve.prototype,"handleSelectionChange",1);Ve.define("sl-tree");ti.define("sl-tree-item");exports.AutoFieldTreeSelect=class Pe extends R{constructor(){super(...arguments);this.nodes={};this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}connectedCallback(){if(super.connectedCallback(),this.options){this.idKey=this.options.idKey,this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let e=this.options.items;e&&(this.nodes=e,this._forEachTree((r,o,s,n)=>{s<1&&r.expanded===void 0&&(r.expanded=true),this.isItemSelected(r)&&(r.selected=true,this.selection.push({id:r[this.idKey],value:r[this.valueKey],path:n.join("/")}));}));}}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.valueKey]:this.value.includes(e[this.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e){let r=(s,n,c,l)=>{let h=[...l,s[this.labelKey]];if(e(s,n,c,h),s.children){let m=c+1;s.children.forEach(d=>{r(d,s,m,[...h]);});}};(Array.isArray(this.nodes)?this.nodes:[this.nodes]).forEach(s=>{r(s,void 0,0,[]);});}onSelectionChange(e){let r=Array.from(e.detail.selection);r&&(this.selection=r.map(o=>({id:o.dataset.id,value:o.dataset.value,path:o.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(e,r,o){let s=r.includes(e[this.valueKey]),n=[...o,e[this.labelKey]];return u`<sl-tree-item
            data-id=${String(e[this.idKey])}
            data-value=${String(e[this.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${e.expanded}
        >
            ${B(e.icon,()=>u`<sl-icon name="${e.icon}"></sl-icon>`)} ${e.label}
            ${Array.isArray(e.children)?u`${e.children.map(c=>this._renderNode(c,r,n))}`:""}</sl-tree-item
        >`}_renderNodes(e){let r=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(o=>this._renderNode(o,r,[])):this._renderNode(e,r,[])}renderTree(){return u`
            <sl-tree
                name="${this.name}"
                data-path=${this.path}
                size=${this.context.size}
                selection="${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
                @sl-selection-change=${this.onSelectionChange.bind(this)}
                >${this._renderNodes(this.nodes)}</sl-tree
            >
        `}renderInput(){return u` ${this.renderTree()} `}};exports.AutoFieldTreeSelect.styles=[R.styles,y`
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTreeSelect=v([I("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class ei extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(e){let r=e.target.dataset.id;for(let o=0;o<this.selection.length;o++)if(String(this.selection[o].id)===r){this.selection.splice(o,1),this.onFieldChange(),this.requestUpdate();break}e.stopPropagation();}getShowItemValue(e,r,o){if(r===o)return e}getSelectedTagValue(e){if(this.options.showAsPath)return u`${e.path}`;{let o=e.path.split("/");return o[o.length-1]}}renderSelectedTags(){let e=this.selection;return u`<span class="tags"
            >${et(e,r=>u`<sl-tag data-id="${r.id}" title=${r.path} @sl-remove=${this._onRemoveSelection.bind(this)} @click=${o=>o.stopPropagation()} removable
                    >${this.getSelectedTagValue(r)}</sl-tag
                >`)}</span
        >`}renderSelection(){return u` <div class="selection" slot="trigger">
            ${B(this.selection.length===0&&this.options.placeholder,()=>u`<span class="placeholder">${this.options.placeholder}</span>`)} ${this.renderSelectedTags()}
            <span class="suffix">
                <sl-icon library="system" class="chevron ${L({active:this.active})}" name="chevron-down" aria-hidden="true"> </sl-icon>
            </span>
        </div>`}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}renderInput(){return u`
            <sl-dropdown size="${this.context.size}" @sl-show="${this._onShowPopup.bind(this)}" @sl-after-hide="${this._onHidePopup.bind(this)}" sync="width" hoist>
                ${this.renderSelection()}
                <div>${this.renderTree()}</div>
            </sl-dropdown>
        `}};exports.AutoFieldTreeDropdown.styles=[R.styles,exports.AutoFieldTreeSelect.styles,y`
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
        `],v([k()],exports.AutoFieldTreeDropdown.prototype,"active",2),v([$("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=v([I("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);function hl(t){if(t)if(t.type==="checkbox"){if(t.value==="on")return t.checked;if(t.value.startsWith("[")&&t.value.endsWith("]"))try{let i=JSON.parse(t.value);return t.checked?i[0]:i[1]}catch{return t.checked}else return t.checked?t.value:null}else return t.value}var At=class extends R{constructor(){super(...arguments);this.active=false;}static{this.styles=[R.styles,y`
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
                color: var(--auto-text-color);
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color); 
                overflow-y: auto;
                overflow-x: hidden;
                &>.dropdown{
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
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
                    border-radius: var(--auto-border-radius);
                }
            }            
            sl-icon.chevron{
                transition: all 0.2s ease-in;
                &.active{
                    transform: rotate(-180deg);
                }
            }
        `];}getInitialOptions(){return {dropdown:true}}_isEmpty(){return Array.isArray(this.value)?this.value.length===0:this.value.trim()===""}_renderSelection(){return u`<div class="selection" slot="trigger">                    
                    ${B(this.options.icon,()=>u`<span class='icon'><sl-icon name="${this.options.icon}"></sl-icon></span>`)}
                    ${B(this._isEmpty()&&this.options.placeholder,()=>u`<span class='placeholder'>${this.options.placeholder}</span>`,()=>u`<span class="select-value">
                    ${this.renderSelection()}
                </span>`)}
                <span class='suffix'>
                    <sl-icon 
                        library="system" 
                        class="chevron ${L({active:this.active})}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>
            </div>       `}_renderContent(){return u`<div class="popoup-container ${w(this.options.dropdown?"dropdown":void 0)}">
            ${this.renderDropdown()}
        </div>`}renderDropdown(){}renderSelection(e){return u`    
        ${this.options.renderSelection?this.options.renderSelection(e||this.value,u):e||this.value}
            `}renderInput(){return this.options.dropdown?u`
            <div class="content">
                ${this.renderBeforeActions(false)}
                <span class="dropdown">
                    <sl-dropdown          
                        size="${this.context.size}"
                        @sl-show="${()=>{this.active=true;}}"
                        @sl-after-hide="${()=>{this.active=false;}}"
                        sync="width"
                        distance="2"
                    >
                    ${this._renderSelection()}
                    ${this._renderContent()}
                </sl-dropdown>
            </span>
            ${this.renderAfterActions(false)}
            </div>
            `:u`${this._renderContent()}`}};v([k()],At.prototype,"active",2);exports.AutoFieldCustom=class Ai extends At{constructor(){super(...arguments);this.selection=[];}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{placeholder:"\u8BF7\u9009\u62E9",dropdown:true,inputSelectors:"input,textarea"})}connectedCallback(){super.connectedCallback(),this._onFieldInput();}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this.onFieldInput),this.removeEventListener("change",this.onFieldInput);}}),this.addEventListener("input",this.onFieldInput),this.addEventListener("change",this.onFieldInput);}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(o=>hl(o))}renderDropdown(){let e=this.value.map(r=>kt(r));return u`<div class="container">${this.options.renderContent(e,u)}</div>`}};exports.AutoFieldCustom.styles=[At.styles],v([$(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=v([I("auto-field-custom")],exports.AutoFieldCustom);function So(t,i){let e=t.width,r=t.height,o=t.widget,s;try{s=document.createElement(`auto-field-${o||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=t,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),i?.styles&&Object.assign(s.style,i.styles),i?.attrs){for(let n in i.attrs)s.setAttribute(n,String(i.attrs[n]));s.parent=i.parent;}return e&&(s.style.width=String(e)),r&&(s.style.height=String(r)),i?.classs&&(typeof i.classs=="string"?s.classList.add(i.classs):typeof i.classs=="object"&&Object.entries(i.classs).forEach(([n,c])=>{c?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class Ei extends At{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange(),this._updateSelection();};this._isFirst=true;}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{children:[]})}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("change",this._handleChildrenChange),this.shadow.removeEventListener("input",this._handleChildrenChange);}_updateSelection(){this.selection&&setTimeout(()=>{let e=this.toState(this.getInputValue()),r=super.renderSelection(e);this._isFirst&&(li(Y,this.selection),this._isFirst=false),li(Y,this.selection,{isConnected:true}),li(r,this.selection,{isConnected:true});});}_onChildrenChange(){this.options.children.length>0&&(this.shadow.addEventListener("change",this._handleChildrenChange),this.shadow.addEventListener("input",this._handleChildrenChange));}renderSelection(){return setTimeout(()=>this._updateSelection()),u``}getInputValue(){let e=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),r=[];return e.forEach(o=>{if(o.tagName.startsWith("AUTO-FIELD-")){let s=o.getInputValue();s===""&&(s=o.value),r.push(s);}}),r}renderDropdown(){return u`
            <div class="children">
                ${et(this.options.children,e=>u`${So(e,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[At.styles,y`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `],v([$(".selection>.select-value")],exports.AutoFieldCombine.prototype,"selection",2),exports.AutoFieldCombine=v([I("auto-field-combine")],exports.AutoFieldCombine);var rp=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"];exports.AutoFieldIcons=class ii extends At{constructor(){super(...arguments);this.active=false;this.selected=[];this.icons=[];}getInitialOptions(){return {icons:[],size:"24px",multiple:false,dropdown:false,builtIn:true}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&rp.forEach(e=>{this.icons.includes(e)||this.icons.push(e);}),this.selected=Array.isArray(this.value)?this.value:this.value.split(",");}renderView(){return this.renderIcons(this.selected)}_isSelected(e){return this.options.multiple?this.selected.includes(e):this.selected[0]===e}_onClickIcon(e){if(!this.context.viewonly)if(this.options.multiple){let r=this.selected.findIndex(o=>o===e);r>-1?this.selected.splice(r,1):this.selected.push(e),this.onFieldInput();}else this.selected.length===0?this.selected.push(e):this.selected[0]=e,this.onFieldInput();}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(e,r=true){return u`<div class="icons" style="font-size:${this.options.size}">
            ${et(e,o=>{if(o!=="")return u`<span class="icon ${r&&this._isSelected(o)?"selected":void 0}" title="${o}" @click=${()=>this._onClickIcon(o)}
                    ><sl-icon name="${o}" size="${this.options.size}"></sl-icon
                ></span>`})}
        </div>`}renderSelection(){return this.renderIcons(this.selected,false)}renderDropdown(){return this.renderIcons(this.icons)}};exports.AutoFieldIcons.styles=[R.styles,At.styles,y`
            sl-dropdown {
                width: 100%;
                & > .icons {
                    padding: 0.5em;
                    box-sizing: border-box;
                    background-color: var(--sl-input-background-color);
                    border: var(--auto-border);
                }
            }
            sl-icon::part(svg) {
                stroke-width: 1;
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
        `],v([k()],exports.AutoFieldIcons.prototype,"active",2),v([k()],exports.AutoFieldIcons.prototype,"selected",2),exports.AutoFieldIcons=v([I("auto-field-icons")],exports.AutoFieldIcons);exports.AutoFieldCascader=class ae extends At{constructor(){super(...arguments);this.scrollbar=new Ie(this);this.active=false;this.data={};this.level=3;this.selected=[];this.focusItems=[];this.scrollbars=[];}getInitialOptions(){let e=Object.assign(super.getInitialOptions(),{idKey:"id",rootKey:"$root",labelKey:"label",maxLevel:3,childrenKey:"children",select:{}});return e.valueKey||(e.valueKey=e.idKey),e.idKey||(e.idKey=e.labelKey),e}connectedCallback(){super.connectedCallback();let e=typeof this.options.select=="object"&&this.options.childrenKey in this.options.select;e&&(this.options.rootKey=this.options.select[this.options.idKey]),this.data=e||Array.isArray(this.options.select)?this._normalizeData(this.options.select):this.options.select,this.selected=this._parseValues(this.value),this.focusItems=Array.from({length:this.options.maxLevel-1}).fill(null);}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu")?.forEach(r=>{this.scrollbars.push(this.scrollbar.create(r));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}_normalizeData(e){let r={},o=(s,n=false)=>{let c=s[this.options.idKey]||(n?"$root":void 0);if(!c)return;let l=s[this.options.childrenKey||"children"];l&&Array.isArray(l)&&l.length>0?(r[c]=l,l.forEach(h=>{o(h);})):r[c]=[];};return Array.isArray(e)?r.$root=e.reduce((s,n)=>(s.push(n),o(n),s),[]):o(e,true),r}_clearFocusItems(e){for(let r=e;r<=this.options.maxLevel;r++)Array.from(this.shadow.querySelectorAll(`[data-level='${r}']`)).forEach(s=>{s.classList.remove("focused");});}_onSelectItem(e){let r=e.detail.item;if(Number(r.dataset.level)!==this.options.maxLevel)return;let s=[],n=(l,h)=>{let m=this.data[h].findIndex(d=>String(d[this.options.idKey])===String(l));if(m>-1)return [this.data[h][m][this.options.labelKey],this.data[h][m][this.options.valueKey]]},c=this.options.rootKey;for(let l=0;l<this.focusItems.length;l++){let h=this.focusItems[l],m=n(h,c);if(!m)return;s.push([h,...m]),c=h;}this.selected=s,this.onFieldChange();}_getSelectedValue(e){let r=[],o=(n,c)=>{let l=this.data[c].findIndex(h=>String(h[this.options.idKey])===String(n));if(l>-1)return this.data[c][l][this.options.valueKey]},s=this.options.rootKey;for(let n=0;n<e.length;n++){let c=this.focusItems[n],l=o(c,s);if(!l)return;r.push(l),s=c;}return r}getInputValue(){let e=this.selected.map(r=>r[2]);return typeof this.value=="string"?e.join(this.options.delimiter||""):e}async _loadItem(e,r,o){let s;if(Array.isArray(this.data[r])&&this.data[r].length>0){e.dataset.lazy="done",this.requestUpdate();return}try{e.dataset.lazy="loading";let n=await this.options.onLoad(r);Array.isArray(n)&&(this.data[r]=n,n.forEach(c=>{c.lazy===void 0&&o<this.options.maxLevel&&(c.lazy=!0),this.data[c[this.options.idKey]]=[];}),this.requestUpdate());}catch(n){e.dataset.lazy="true",s=n;}finally{s||(e.dataset.lazy="done");}}_onItemMouseOverr(e){let r=e.target,o=r.dataset.id,s=Number(r.dataset.level);if(this.focusItems[s-1]===o)return;this._clearFocusItems(s),r.classList.add("focused"),r.dataset.lazy==="idle"&&this._loadItem(r,o,s),this.focusItems[s-1]=o,this.focusItems.forEach((c,l)=>{l>s-1&&(this.focusItems[l]=null);}),this.focusItems=[...this.focusItems];}_renderLevel(e,r=1,o){if(e)return u`<sl-menu class="level" @sl-select=${r===this.options.maxLevel?this._onSelectItem.bind(this):null}>
            ${et(e,s=>{let n=s[this.options.idKey],c=this.selected[r-1]?.[0]===s[this.options.idKey],l=s.lazy||Array.isArray(this.data[n])&&this.data[n].length===0;return u` <sl-menu-item
                    type="checkbox"
                    data-level=${r}
                    data-id=${s[this.options.idKey]}
                    data-pid=${w(o)}
                    data-lazy=${w(l?"idle":void 0)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${c}
                    class="${w(c?"selected":void 0)}"
                >
                    ${s[this.options.labelKey]}
                    ${B(r<this.options.maxLevel,()=>u`${B(s.lazy,()=>u`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}
                </sl-menu-item>`})}
        </sl-menu>`}_parseValues(e){let r=[],o=[];if(Array.isArray(e))r=e;else if(e&&typeof e=="string")if(this.options.delimiter&&this.options.delimiter.length>0)r=e.split(this.options.delimiter);else {let s=this.data[this.options.rootKey],n=e;for(;;){let c=s.find(l=>n.startsWith(l[this.options.valueKey]));if(c){if(r.push(c[this.options.valueKey]),n=n.substring(c[this.options.valueKey].length),s=this.data[c[this.options.idKey]],!s)break}else break}}if(r.length>0){let s=this.data[this.options.rootKey];for(let n=0;n<r.length;n++){let c=r[n],l=s.find(h=>h[this.options.valueKey]===c);if(l){if(o.push([l[this.options.idKey],l[this.options.labelKey],l[this.options.valueKey]]),s=this.data[l[this.options.idKey]],!s)break}else break}}return o}renderSelection(){return u`
            ${this.selected.map(e=>e[1]).join(this.options.delimiter||"")}
        `}renderDropdown(){let e=this.data[this.options.rootKey],r=this.focusItems;return u`<div class="levels">
            ${et(Array.from({length:this.options.maxLevel}),(o,s)=>{if(s===0)return this._renderLevel(e,s+1,this.options.rootKey);{let n=r[s-1],c=this.data[n];return c?this._renderLevel(c,s+1,n):this._renderLevel([],s+1,n)}})}
        </div>`}};exports.AutoFieldCascader.styles=[R.styles,At.styles,Ie.styles,y`
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
                background-color: var(--auto-workspace-color);
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

            .popoup-container.dropdown > .levels {
                border: none;
            }
        `],v([k()],exports.AutoFieldCascader.prototype,"active",2),v([k()],exports.AutoFieldCascader.prototype,"data",2),v([k()],exports.AutoFieldCascader.prototype,"level",2),v([k()],exports.AutoFieldCascader.prototype,"selected",2),v([k()],exports.AutoFieldCascader.prototype,"focusItems",2),exports.AutoFieldCascader=v([I("auto-field-cascader")],exports.AutoFieldCascader);exports.AutoFieldDateRange=class Oi extends R{getInitialOptions(){return {icon:"date",delimiter:",",includeTime:false}}_onInputChange(i){let e=i.type;this.context.validAt==="input"&&e.includes("input")?this.onFieldInput():e.includes("change")&&this.onFieldChange();}_getDate(i){return (Array.isArray(this.value)?this.value:this.value.split(this.options.delimiter))[i]}_renderIcon(){if(this.options.icon)return u`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}_renderDate(i){return u`<sl-input
            type="${this.options.includeTime?"datetime-local":"date"}"
            .value=${this._getDate(i)}
            size=${this.context.size}
            ?disabled=${!this.options.enable}
            @sl-input=${this._onInputChange.bind(this)}
            @sl-change=${this._onInputChange.bind(this)}
            ?filled=${this.options.filled}
            ?pill=${this.options.pill}
            ?clearable=${this.options.clearable}
            ?required=${this.options.required}
            >${this._renderIcon()}</sl-input
        >`}renderInput(){return u`
            <div class="dates">
                ${this._renderDate(0)}
                <span class="sp">-</span>
                ${this._renderDate(1)}
            </div>
        `}getInputValue(){let i=Array.from(this.inputs||[]).map(e=>e.value);return Array.isArray(this.value)?i:i.join(this.options.delimiter)}};exports.AutoFieldDateRange.styles=[R.styles,y`
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
        `],v([rn("sl-input")],exports.AutoFieldDateRange.prototype,"inputs",2),exports.AutoFieldDateRange=v([I("auto-field-date-range")],exports.AutoFieldDateRange);var ul=y`
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
`;var op=0,Xt=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.attrId=++op,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=false,this.closable=false,this.disabled=false,this.tabIndex=0;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab");}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close");}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0;}render(){return this.id=this.id.length>0?this.id:this.componentId,u`
      <div
        part="base"
        class=${L({tab:true,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?u`
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
    `}};Xt.styles=[P,ul];Xt.dependencies={"sl-icon-button":lt};a([$(".tab")],Xt.prototype,"tab",2);a([p({reflect:true})],Xt.prototype,"panel",2);a([p({type:Boolean,reflect:true})],Xt.prototype,"active",2);a([p({type:Boolean,reflect:true})],Xt.prototype,"closable",2);a([p({type:Boolean,reflect:true})],Xt.prototype,"disabled",2);a([p({type:Number,reflect:true})],Xt.prototype,"tabIndex",2);a([E("active")],Xt.prototype,"handleActiveChange",1);a([E("disabled")],Xt.prototype,"handleDisabledChange",1);Xt.define("sl-tab");var ml=y`
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
`;var fl=y`
  :host {
    display: contents;
  }
`;var xr=class extends V{constructor(){super(...arguments),this.observedElements=[],this.disabled=false;}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}});}),this.disabled||this.startObserver();}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver();}handleSlotChange(){this.disabled||this.startObserver();}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let i=t.assignedElements({flatten:true});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],i.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e);});}}stopObserver(){this.resizeObserver.disconnect();}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver();}render(){return u` <slot @slotchange=${this.handleSlotChange}></slot> `}};xr.styles=[P,fl];a([p({type:Boolean,reflect:true})],xr.prototype,"disabled",2);a([E("disabled",{waitUntilFirstUpdate:true})],xr.prototype,"handleDisabledChange",1);var gt=class extends V{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new W(this),this.hasScrollControls=false,this.shouldHideScrollStartButton=false,this.shouldHideScrollEndButton=false,this.placement="top",this.activation="auto",this.noScrollControls=false,this.fixedScrollControls=false,this.scrollOffset=1;}connectedCallback(){let t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls();}),this.mutationObserver=new MutationObserver(i=>{let e=i.filter(({target:r})=>{if(r===this)return  true;if(r.closest("sl-tab-group")!==this)return  false;let o=r.tagName.toLowerCase();return o==="sl-tab"||o==="sl-tab-panel"});if(e.length!==0){if(e.some(r=>!["aria-labelledby","aria-controls"].includes(r.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(r=>r.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(r=>r.attributeName==="active")){let o=e.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="sl-tab").map(s=>s.target).find(s=>s.active);o&&this.setActiveTab(o);}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:true,attributeFilter:["active","disabled","name","panel"],childList:true,subtree:true}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((e,r)=>{var o;e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((o=this.getActiveTab())!=null?o:this.tabs[0],{emitEvents:false}),r.unobserve(e[0].target));}).observe(this.tabGroup);});});}disconnectedCallback(){var t,i;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect(),this.nav&&((i=this.resizeObserver)==null||i.unobserve(this.nav));}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return [...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let e=t.target.closest("sl-tab");e?.closest("sl-tab-group")===this&&e!==null&&this.setActiveTab(e,{scrollBehavior:"smooth"});}handleKeyDown(t){let e=t.target.closest("sl-tab");if(e?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&e!==null&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){let o=this.tabs.find(c=>c.matches(":focus")),s=this.localize.dir()==="rtl",n=null;if(o?.tagName.toLowerCase()==="sl-tab"){if(t.key==="Home")n=this.focusableTabs[0];else if(t.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){let c=this.tabs.findIndex(l=>l===o);n=this.findNextFocusableTab(c,"backward");}else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){let c=this.tabs.findIndex(l=>l===o);n=this.findNextFocusableTab(c,"forward");}if(!n)return;n.tabIndex=0,n.focus({preventScroll:true}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(c=>{c.tabIndex=c===n?0:-1;}),["top","bottom"].includes(this.placement)&&rr(n,this.nav,"horizontal"),t.preventDefault();}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"});}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"});}setActiveTab(t,i){if(i=St({emitEvents:true,scrollBehavior:"auto"},i),t!==this.activeTab&&!t.disabled){let e=this.activeTab;this.activeTab=t,this.tabs.forEach(r=>{r.active=r===this.activeTab,r.tabIndex=r===this.activeTab?0:-1;}),this.panels.forEach(r=>{var o;return r.active=r.name===((o=this.activeTab)==null?void 0:o.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&rr(this.activeTab,this.nav,"horizontal",i.scrollBehavior),i.emitEvents&&(e&&this.emit("sl-tab-hide",{detail:{name:e.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}));}}setAriaLabels(){this.tabs.forEach(t=>{let i=this.panels.find(e=>e.name===t.panel);i&&(t.setAttribute("aria-controls",i.getAttribute("id")),i.setAttribute("aria-labelledby",t.getAttribute("id")));});}repositionIndicator(){let t=this.getActiveTab();if(!t)return;let i=t.clientWidth,e=t.clientHeight,r=this.localize.dir()==="rtl",o=this.getAllTabs(),n=o.slice(0,o.indexOf(t)).reduce((c,l)=>({left:c.left+l.clientWidth,top:c.top+l.clientHeight}),{left:0,top:0});switch(this.placement){case "top":case "bottom":this.indicator.style.width=`${i}px`,this.indicator.style.height="auto",this.indicator.style.translate=r?`${ -1*n.left}px`:`${n.left}px`;break;case "start":case "end":this.indicator.style.width="auto",this.indicator.style.height=`${e}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls());}findNextFocusableTab(t,i){let e=null,r=i==="forward"?1:-1,o=t+r;for(;t<this.tabs.length;){if(e=this.tabs[o]||null,e===null){i==="forward"?e=this.focusableTabs[0]:e=this.focusableTabs[this.focusableTabs.length-1];break}if(!e.disabled)break;o+=r;}return e}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd());}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=false:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons();}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none";}show(t){let i=this.tabs.find(e=>e.panel===t);i&&this.setActiveTab(i,{scrollBehavior:"smooth"});}render(){let t=this.localize.dir()==="rtl";return u`
      <div
        part="base"
        class=${L({"tab-group":true,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?u`
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

          ${this.hasScrollControls?u`
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
    `}};gt.styles=[P,ml];gt.dependencies={"sl-icon-button":lt,"sl-resize-observer":xr};a([$(".tab-group")],gt.prototype,"tabGroup",2);a([$(".tab-group__body")],gt.prototype,"body",2);a([$(".tab-group__nav")],gt.prototype,"nav",2);a([$(".tab-group__indicator")],gt.prototype,"indicator",2);a([k()],gt.prototype,"hasScrollControls",2);a([k()],gt.prototype,"shouldHideScrollStartButton",2);a([k()],gt.prototype,"shouldHideScrollEndButton",2);a([p()],gt.prototype,"placement",2);a([p()],gt.prototype,"activation",2);a([p({attribute:"no-scroll-controls",type:Boolean})],gt.prototype,"noScrollControls",2);a([p({attribute:"fixed-scroll-controls",type:Boolean})],gt.prototype,"fixedScrollControls",2);a([Ce({passive:true})],gt.prototype,"updateScrollButtons",1);a([E("noScrollControls",{waitUntilFirstUpdate:true})],gt.prototype,"updateScrollControls",1);a([E("placement",{waitUntilFirstUpdate:true})],gt.prototype,"syncIndicator",1);gt.define("sl-tab-group");var sp=(t,i)=>{let e=0;return function(...r){window.clearTimeout(e),e=window.setTimeout(()=>{t.call(this,...r);},i);}},gl=(t,i,e)=>{let r=t[i];t[i]=function(...o){r.call(this,...o),e.call(this,r,...o);};};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){let i=new Set,e=new WeakMap,r=s=>{for(let n of s.changedTouches)i.add(n.identifier);},o=s=>{for(let n of s.changedTouches)i.delete(n.identifier);};document.addEventListener("touchstart",r,true),document.addEventListener("touchend",o,true),document.addEventListener("touchcancel",o,true),gl(EventTarget.prototype,"addEventListener",function(s,n){if(n!=="scrollend")return;let c=sp(()=>{i.size?c():this.dispatchEvent(new Event("scrollend"));},100);s.call(this,"scroll",c,{passive:true}),e.set(this,c);}),gl(EventTarget.prototype,"removeEventListener",function(s,n){if(n!=="scrollend")return;let c=e.get(this);c&&s.call(this,"scroll",c,{passive:true});});}})();var bl=y`
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
`;var np=0,Ti=class extends V{constructor(){super(...arguments),this.attrId=++np,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=false;}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel");}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true");}render(){return u`
      <slot
        part="base"
        class=${L({"tab-panel":true,"tab-panel--active":this.active})}
      ></slot>
    `}};Ti.styles=[P,bl];a([p({reflect:true})],Ti.prototype,"name",2);a([p({type:Boolean,reflect:true})],Ti.prototype,"active",2);a([E("active")],Ti.prototype,"handleActiveChange",1);Ti.define("sl-tab-panel");q.define("sl-icon");var Co=y`
    ${mo}
    :host {
        display: flex;
        position: relative;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        font-family: 'Microsoft YaHei', 华文细黑, 微软雅黑, 'MicrosoftJhengHei', STHeiti, MingLiu;
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
            & > * {
                width: 100%;
                box-sizing: border-box;
                display: inline-block;
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
`;var ko=y`
    /* 自定义滚动条样式 */
    .scrollbar {
        /* Firefox - 默认隐藏 */
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        transition: scrollbar-color 0.3s ease;
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
`;var ie=class extends ut{constructor(){super();this.forms=[];di();}static{this.styles=[Co,ko,y`
            :host {
                display: block;
                width: 100%;
            }
        `];}firstUpdated(){this.forms=this.getForms(),this.forms.length===0&&setTimeout(()=>{this.forms=this.getForms();});}getForms(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}bind(e){this.store=e,this.forms&&this.forms.forEach(r=>{r.bind&&r.bind(e);});}getFormInfo(e,r){let o=e.getAttribute("icon")||e.dataset.icon,s=e.getAttribute("label")||e.dataset.label,n=e.getAttribute("title")||e.dataset.title,c=e.getAttribute("name")||e.dataset.name||"",l=this.active?this.active.split(",").includes(c):r===0;return {icon:o,label:s,title:n,name:c,active:l}}renderGroups(){}render(){return u`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `}};v([$("slot")],ie.prototype,"slotElement",2),v([p()],ie.prototype,"active",2),v([k()],ie.prototype,"forms",2);exports.AutoFormTabs=class ri extends ie{constructor(){super(...arguments);this.direction="top";this.hideLabel=false;}_getPlacement(){return this.direction==="left"?"start":this.direction==="right"?"end":this.direction}renderGroups(){return u`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${()=>this.dispatchEvent(new CustomEvent("tab-change"))}"
            >
                ${this.forms.map((e,r)=>{if(e.tagName!=="AUTO-FORM")return;let o=this.getFormInfo(e,r);return e.bind&&e.bind(this.store),e.setAttribute("border","none"),u`
                        <sl-tab
                            ?active=${o.active}
                            slot="nav"
                            title="${w(o.title||o.label)}"
                            panel="${r}"
                        >
                            ${o.icon?u`<sl-icon name="${o.icon}"></sl-icon>`:""}
                            ${B(!this.hideLabel&&o.label,()=>u`<span class="label">${o.label}</span>`)}
                        </sl-tab>
                    `})}
                ${this.forms.map((e,r)=>u`<sl-tab-panel name="${r}" class="scrollbar"
                            >${e}</sl-tab-panel
                        >`)}
            </sl-tab-group>
        `}};exports.AutoFormTabs.styles=[ie.styles,y`
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
                font-size: calc(1.5 * var(--auto-font-size));
            }
            sl-tab sl-icon {
                &::part(svg) {
                    stroke-width: 1;
                }
            }
            sl-tab-group::part(tabs) {
                border: none;
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
        `],v([p({type:String,reflect:true})],exports.AutoFormTabs.prototype,"direction",2),v([p({type:Boolean,reflect:true})],exports.AutoFormTabs.prototype,"hideLabel",2),exports.AutoFormTabs=v([I("auto-form-tabs")],exports.AutoFormTabs);var vl=y`
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
`;var Qt=class extends V{constructor(){super(...arguments),this.localize=new W(this),this.open=false,this.disabled=false;}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=true),this.detailsObserver=new MutationObserver(t=>{for(let i of t)i.type==="attributes"&&i.attributeName==="open"&&(this.details.open?this.show():this.hide());}),this.detailsObserver.observe(this.details,{attributes:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect();}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus());}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show());}async handleOpenChange(){if(this.open){if(this.details.open=true,this.emit("sl-show",{cancelable:true}).defaultPrevented){this.open=false,this.details.open=false;return}await Kt(this.body);let{keyframes:i,options:e}=Ut(this,"details.show",{dir:this.localize.dir()});await qt(this.body,ki(i,this.body.scrollHeight),e),this.body.style.height="auto",this.emit("sl-after-show");}else {if(this.emit("sl-hide",{cancelable:true}).defaultPrevented){this.details.open=true,this.open=true;return}await Kt(this.body);let{keyframes:i,options:e}=Ut(this,"details.hide",{dir:this.localize.dir()});await qt(this.body,ki(i,this.body.scrollHeight),e),this.body.style.height="auto",this.details.open=false,this.emit("sl-after-hide");}}async show(){if(!(this.open||this.disabled))return this.open=true,be(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=false,be(this,"sl-after-hide")}render(){let t=this.localize.dir()==="rtl";return u`
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
    `}};Qt.styles=[P,vl];Qt.dependencies={"sl-icon":q};a([$(".details")],Qt.prototype,"details",2);a([$(".details__header")],Qt.prototype,"header",2);a([$(".details__body")],Qt.prototype,"body",2);a([$(".details__expand-icon-slot")],Qt.prototype,"expandIconSlot",2);a([p({type:Boolean,reflect:true})],Qt.prototype,"open",2);a([p()],Qt.prototype,"summary",2);a([p({type:Boolean,reflect:true})],Qt.prototype,"disabled",2);a([E("open",{waitUntilFirstUpdate:true})],Qt.prototype,"handleOpenChange",1);jt("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});jt("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});Qt.define("sl-details");var yl=y`
    :host {
        display: flex;
        position: relative;
        flex-direction: column; /* 组件只使用column布局 */
        box-sizing: border-box;
        width: 100%;
        --auto-icon-size: 1.5em;
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
        background-color: var(--sl-color-neutral-50, #f8fafc);
        transition: background-color 0.2s ease;
        border-bottom: 1px solid var(--sl-color-neutral-200, #e2e8f0);
        box-sizing: border-box;
    }
    .header:hover {
        background-color: var(--sl-color-neutral-50, #f1f5f9);
    }
    .header.active {
        background-color: var(--sl-color-neutral-50, #f1f5f9);
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
            color: var(--auto-theme-color);
            border-radius: 50%;
            background-color: var(--sl-color-neutral-200, #e2e8f0);
        }
        &.action:active {
            background-color: var(--sl-color-neutral-100);
        }
    }
    sl-icon-button sl-icon::part(svg) {
        stroke-width: 1;
    }
    .icon::part(svg) {
        stroke-width: 1;
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
        max-height: 0;
        padding: 0 15px;
        overflow: hidden;
        background-color: var(--sl-color-neutral-0, #ffffff);
        border-bottom: 1px solid var(--sl-color-neutral-200, #e2e8f0);
        visibility: hidden;
        flex-direction: column;
        box-sizing: border-box;
        transition: max-height 0.3s ease-out, padding 0.2s ease, opacity 0.2s ease,
            visibility 0s 0.3s; /* 延迟visibility变化，确保在动画完成后才隐藏 */
    }
    .content.active {
        max-height: 2000px;
        padding: 15px;
        transition: max-height 2s ease-out, padding 0.3s ease, visibility 0s; /* 立即改变visibility */
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
    ${ko}
`;exports.AutoCollapse=class le extends ut{constructor(){super(...arguments);this.active="";this.accordion=false;this.panels=[];this._activeArray=[];}firstUpdated(){this.panels=this.getPanels();}connectedCallback(){super.connectedCallback(),di(),this._activeArray=this.active?this.active.split(","):[];}getPanels(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}updated(e){e.has("active")&&typeof this.active=="string"&&(this._activeArray=this.active?this.active.split(","):[]),super.updated(e);}togglePanel(e){let r=this._activeArray.indexOf(e);if(r===-1)this.accordion?this._activeArray=[e]:this._activeArray=[...this._activeArray,e];else {let o=[...this._activeArray];o.splice(r,1),this._activeArray=o;}this.active=this._activeArray.join(","),this.dispatchEvent(new CustomEvent("change",{detail:{active:this.active}}));}isPanelActive(e){return this._activeArray.includes(e)}_onActionClick(e,r){let o=new CustomEvent("action-click",{detail:{name:e},composed:true,bubbles:true});r.stopPropagation(),this.dispatchEvent(o);}_renderHeaderActions(e){let r=(e.getAttribute("data-actions")||"").split(",");if(r.length>0)return et(r,o=>{let[s,n]=o.split(":");return u`<sl-icon
                    part="action"
                    class="icon action"
                    name=${s}
                    title=${n}
                    @click=${c=>{this._onActionClick(s,c);}}
                ></sl-icon>`})}_renderHeader(e){let r=e.getAttribute("name")||e.dataset.name||"",o=e.getAttribute("label")||e.dataset.label||"",s=e.getAttribute("icon")||e.dataset.icon||"",n=this.isPanelActive(r);return u`
            <div
                part="header"
                class="header ${L({active:n})}"
                @click=${()=>this.togglePanel(r)}
            >
                ${s?u`<sl-icon name="${s}" class="icon"></sl-icon>`:""}
                <div part="label" class="label">${o}</div>
                ${this._renderHeaderActions(e)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `}renderPanels(){return this.panels.map(e=>{let r=e.getAttribute("name")||e.dataset.name||"",o=this.isPanelActive(r),s=J({padding:this.padding});return u`
                ${this._renderHeader(e)}
                <div
                    part="content"
                    class="content scrollbar ${L({active:o})}"
                    style=${s}
                >
                    ${e}
                </div>
            `})}_onSlotChange(){let e=this.getPanels();if(e.length>0){let r=this.panels.map(s=>s.getAttribute("name")||s.dataset.name).filter(s=>!!s),o=e.filter(s=>!r.includes(s.getAttribute("name")||s.dataset.name));this.panels.push(...o),this.requestUpdate();}}render(){return u`
            ${this.renderPanels()}
            <slot @slotchange=${this._onSlotChange.bind(this)} style="display:none;"></slot>
        `}};exports.AutoCollapse.styles=[yl],v([p({type:String,reflect:true})],exports.AutoCollapse.prototype,"active",2),v([p({type:String,reflect:true})],exports.AutoCollapse.prototype,"padding",2),v([p({type:Boolean,reflect:true})],exports.AutoCollapse.prototype,"accordion",2),v([k()],exports.AutoCollapse.prototype,"panels",2),v([k()],exports.AutoCollapse.prototype,"_activeArray",2),exports.AutoCollapse=v([I("auto-collapse")],exports.AutoCollapse);exports.AutoFormCollapse=class ze extends ie{constructor(){super(...arguments);this.active="";this.accordion=false;}renderGroups(){return u`
            <auto-collapse
                style="flex-grow:1;min-height:0"
                active=${w(this.active)}
                padding=${w(this.padding)}
                ?accordion=${this.accordion}
            >
                ${this.forms.map(e=>{if(e.tagName==="AUTO-FORM")return e.bind&&e.bind(this.store),e.setAttribute("border","none"),e})}
            </auto-collapse>
        `}};exports.AutoFormCollapse.styles=[ie.styles,y`
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
                    stroke-width: 1;
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
                    font-size: var(--auto-font-size);
                }
            }
            :host {
                display: flex;
                flex-direction: column;
            }
        `],v([p({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"active",2),v([p({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"padding",2),v([p({type:Boolean,reflect:true})],exports.AutoFormCollapse.prototype,"accordion",2),exports.AutoFormCollapse=v([I("auto-form-collapse")],exports.AutoFormCollapse);var xl=y`
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

`;exports.AutoFlex=class Pt extends ut{constructor(){super(...arguments);this.classes=new Ee(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let e=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=e,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(r=>{r.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(r=>{r.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(e,r,o){super.attributeChangedCallback(e,r,o),this.updateStyles();}render(){return u` <slot></slot> `}};exports.AutoFlex.styles=xl,v([p({type:String})],exports.AutoFlex.prototype,"direction",2),v([p({type:String})],exports.AutoFlex.prototype,"gap",2),v([p({type:Boolean})],exports.AutoFlex.prototype,"wrap",2),v([p({type:String})],exports.AutoFlex.prototype,"align",2),v([p({type:String})],exports.AutoFlex.prototype,"justify",2),v([p({type:String})],exports.AutoFlex.prototype,"border",2),v([p({type:String})],exports.AutoFlex.prototype,"grow",2),v([p({type:String})],exports.AutoFlex.prototype,"shrink",2),v([p({type:Boolean,reflect:true})],exports.AutoFlex.prototype,"fit",2),exports.AutoFlex=v([I("auto-flex")],exports.AutoFlex);G.define("sl-button");H.define("sl-input");var _l=y`
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
`;var _r=class extends V{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};_r.styles=[P,_l];a([p({type:Boolean,reflect:true})],_r.prototype,"vertical",2);a([E("vertical")],_r.prototype,"handleVerticalChange",1);_r.define("sl-divider");dt.define("sl-dropdown");ve.define("sl-spinner");lt.define("sl-icon-button");function Es(t,i){return t.length>i.length?false:t.every((e,r)=>e===i[r])}(t=>typeof De<"u"?De:typeof Proxy<"u"?new Proxy(t,{get:(i,e)=>(typeof De<"u"?De:i)[e]}):t)(function(t){if(typeof De<"u")return De.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var ot=class ot extends ut{constructor(){super(...arguments);this.classs=new Ee(this);this.theme=new fi(this);this.seq=++ot.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this._loading=false;}static{this.seq=0;}static{this.styles=Co;}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}connectedCallback(){super.connectedCallback(),di();}attributeChangedCallback(e,r,o){super.attributeChangedCallback(e,r,o),["group","sort","advanced","path"].includes(e)&&setTimeout(()=>this._load());}_initialContext(){Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit});}_isValid(){if(this.path){let e=this.store.schemas.errors||{};return Object.keys(e).some(r=>Es(this.path.split("."),r.split(".")))}else return Object.keys(this.store.schemas.errors).length>0}_load(e=true){if(this.store&&!this._loading)try{this._initialContext();let r=this.path?this.store.schemas.find(this.path):Object.values(this.store.schemas.store.state),o=s=>{if(!this.group||["default","general"].includes(this.group)&&s.group===void 0||["","*"].includes(this.group))return !0;let n=(s.group||"").split(","),c=this.group.split(",");return n.some(l=>c.includes(l))};this.schemas=Object.values(r).filter(s=>!(!o(s)||this.advanced===!1&&s.advanced)).sort((s,n)=>(s.order||0)-(n.order||0)),e&&this.requestUpdate();}finally{this._loading=false;}}bind(e){this.store=e,this._load();}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(r=>{r.tagName.startsWith("auto-field")&&(r.invalidTips=void 0);}),this.requestUpdate();}_renderFields(){return u` ${this.schemas.map(e=>u`${So(e,{attrs:{size:this.size}})}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),u`
            <div class="actions header"></div>
            <div class="fields">${this._renderFields()}</div>
            <div class="actions footer"></div>
        `}reset(){this.store?.reset(),this._initialContext(),gi(this,"dirty",false),gi(this,"invalid",false);}submit(e){if(typeof e=="function"){let r=this.store?.schemas.getValues()||{},o=this.store?.schemas.errors;e(r,o);}}};v([Xo({context:Fr})],ot.prototype,"context",2),v([p({type:Boolean,reflect:true})],ot.prototype,"validAtInit",2),v([p({type:String,reflect:true})],ot.prototype,"group",2),v([p({type:String,reflect:true})],ot.prototype,"icon",2),v([p({type:String,reflect:true})],ot.prototype,"path",2),v([p({type:Boolean,reflect:true})],ot.prototype,"compact",2),v([p({type:Boolean,reflect:true})],ot.prototype,"advanced",2),v([p({type:String,reflect:true})],ot.prototype,"validAt",2),v([p({type:String,reflect:true})],ot.prototype,"border",2),v([p({type:String})],ot.prototype,"size",2),v([p({type:String,reflect:true})],ot.prototype,"labelPos",2),v([p({type:String,reflect:true})],ot.prototype,"labelWidth",2),v([p({type:Boolean,reflect:true})],ot.prototype,"dark",2),v([p({type:Boolean,reflect:true})],ot.prototype,"readonly",2),v([p({type:Boolean,reflect:true})],ot.prototype,"viewonly",2),v([p({type:String,reflect:true})],ot.prototype,"viewAlign",2),v([p({type:String,reflect:true})],ot.prototype,"layout",2),v([p({type:String,reflect:true})],ot.prototype,"icons",2);var Ts=ot;customElements.get("auto-form")||customElements.define("auto-form",Ts);/*! Bundled license information:

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
*/exports.AutoField=R;exports.AutoForm=Ts;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map