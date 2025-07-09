var AutoForm=(function(exports){'use strict';var Ia=Object.defineProperty;var za=Object.getOwnPropertyDescriptor;var x=(t,i,e,o)=>{for(var r=o>1?void 0:o?za(i,e):i,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(i,e,r):n(r))||r);return o&&r&&Ia(i,e,r),r};var to=globalThis,Gi=to.trustedTypes,Kr=Gi?Gi.createPolicy("lit-html",{createHTML:t=>t}):void 0,Qo="$lit$",Jt=`lit$${Math.random().toFixed(9).slice(2)}$`,Jo="?"+Jt,Ra=`<${Jo}>`,Ee=to.document===void 0?{createTreeWalker:()=>({})}:document,li=()=>Ee.createComment(""),ci=t=>t===null||typeof t!="object"&&typeof t!="function",Zo=Array.isArray,Zr=t=>Zo(t)||typeof t?.[Symbol.iterator]=="function",Xo=`[ 	
\f\r]`,ai=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Gr=/-->/g,Yr=/>/g,$e=RegExp(`>|${Xo}(?:([^\\s"'>=/]+)(${Xo}*=${Xo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xr=/'/g,Qr=/"/g,ts=/^(?:script|style|textarea|title)$/i,tr=t=>(i,...e)=>({_$litType$:t,strings:i,values:e}),u=tr(1),st=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Jr=new WeakMap,Se=Ee.createTreeWalker(Ee,129);function os(t,i){if(!Zo(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kr!==void 0?Kr.createHTML(i):i}var rs=(t,i)=>{let e=t.length-1,o=[],r,s=i===2?"<svg>":i===3?"<math>":"",n=ai;for(let c=0;c<e;c++){let l=t[c],p,f,h=-1,m=0;for(;m<l.length&&(n.lastIndex=m,f=n.exec(l),f!==null);)m=n.lastIndex,n===ai?f[1]==="!--"?n=Gr:f[1]!==void 0?n=Yr:f[2]!==void 0?(ts.test(f[2])&&(r=RegExp("</"+f[2],"g")),n=$e):f[3]!==void 0&&(n=$e):n===$e?f[0]===">"?(n=r??ai,h=-1):f[1]===void 0?h=-2:(h=n.lastIndex-f[2].length,p=f[1],n=f[3]===void 0?$e:f[3]==='"'?Qr:Xr):n===Qr||n===Xr?n=$e:n===Gr||n===Yr?n=ai:(n=$e,r=void 0);let g=n===$e&&t[c+1].startsWith("/>")?" ":"";s+=n===ai?l+Ra:h>=0?(o.push(p),l.slice(0,h)+Qo+l.slice(h)+Jt+g):l+Jt+(h===-2?c:g);}return [os(t,s+(t[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),o]},hi=class t{constructor({strings:i,_$litType$:e},o){let r;this.parts=[];let s=0,n=0,c=i.length-1,l=this.parts,[p,f]=rs(i,e);if(this.el=t.createElement(p,o),Se.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes);}for(;(r=Se.nextNode())!==null&&l.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(Qo)){let m=f[n++],g=r.getAttribute(h).split(Jt),b=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?Xi:b[1]==="?"?Qi:b[1]==="@"?Ji:Te}),r.removeAttribute(h);}else h.startsWith(Jt)&&(l.push({type:6,index:s}),r.removeAttribute(h));if(ts.test(r.tagName)){let h=r.textContent.split(Jt),m=h.length-1;if(m>0){r.textContent=Gi?Gi.emptyScript:"";for(let g=0;g<m;g++)r.append(h[g],li()),Se.nextNode(),l.push({type:2,index:++s});r.append(h[m],li());}}}else if(r.nodeType===8)if(r.data===Jo)l.push({type:2,index:s});else {let h=-1;for(;(h=r.data.indexOf(Jt,h+1))!==-1;)l.push({type:7,index:s}),h+=Jt.length-1;}s++;}}static createElement(i,e){let o=Ee.createElement("template");return o.innerHTML=i,o}};function Ae(t,i,e=t,o){if(i===st)return i;let r=o!==void 0?e._$Co?.[o]:e._$Cl,s=ci(i)?void 0:i._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(false),s===void 0?r=void 0:(r=new s(t),r._$AT(t,e,o)),o!==void 0?(e._$Co??=[])[o]=r:e._$Cl=r),r!==void 0&&(i=Ae(t,r._$AS(t,i.values),r,o)),i}var Yi=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:o}=this._$AD,r=(i?.creationScope??Ee).importNode(e,true);Se.currentNode=r;let s=Se.nextNode(),n=0,c=0,l=o[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new qe(s,s.nextSibling,this,i):l.type===1?p=new l.ctor(s,l.name,l.strings,this,i):l.type===6&&(p=new Zi(s,this,i)),this._$AV.push(p),l=o[++c];}n!==l?.index&&(s=Se.nextNode(),n++);}return Se.currentNode=Ee,r}p(i){let e=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(i,o,e),e+=o.strings.length-2):o._$AI(i[e])),e++;}},qe=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,o,r){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??true;}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=Ae(this,i,e),ci(i)?i===Y||i==null||i===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):i!==this._$AH&&i!==st&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Zr(i)?this.k(i):this._(i);}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i));}_(i){this._$AH!==Y&&ci(this._$AH)?this._$AA.nextSibling.data=i:this.T(Ee.createTextNode(i)),this._$AH=i;}$(i){let{values:e,_$litType$:o}=i,r=typeof o=="number"?this._$AC(i):(o.el===void 0&&(o.el=hi.createElement(os(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(e);else {let s=new Yi(r,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s;}}_$AC(i){let e=Jr.get(i.strings);return e===void 0&&Jr.set(i.strings,e=new hi(i)),e}k(i){Zo(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,o,r=0;for(let s of i)r===e.length?e.push(o=new t(this.O(li()),this.O(li()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r);}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(false,true,e);i&&i!==this._$AB;){let o=i.nextSibling;i.remove(),i=o;}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i));}},Te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,o,r,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Y;}_$AI(i,e=this,o,r){let s=this.strings,n=false;if(s===void 0)i=Ae(this,i,e,0),n=!ci(i)||i!==this._$AH&&i!==st,n&&(this._$AH=i);else {let c=i,l,p;for(i=s[0],l=0;l<s.length-1;l++)p=Ae(this,c[o+l],e,l),p===st&&(p=this._$AH[l]),n||=!ci(p)||p!==this._$AH[l],p===Y?i=Y:i!==Y&&(i+=(p??"")+s[l+1]),this._$AH[l]=p;}n&&!r&&this.j(i);}j(i){i===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"");}},Xi=class extends Te{constructor(){super(...arguments),this.type=3;}j(i){this.element[this.name]=i===Y?void 0:i;}},Qi=class extends Te{constructor(){super(...arguments),this.type=4;}j(i){this.element.toggleAttribute(this.name,!!i&&i!==Y);}},Ji=class extends Te{constructor(i,e,o,r,s){super(i,e,o,r,s),this.type=5;}_$AI(i,e=this){if((i=Ae(this,i,e,0)??Y)===st)return;let o=this._$AH,r=i===Y&&o!==Y||i.capture!==o.capture||i.once!==o.once||i.passive!==o.passive,s=i!==Y&&(o===Y||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,i),this._$AH=i;}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i);}},Zi=class{constructor(i,e,o){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o;}get _$AU(){return this._$AM._$AU}_$AI(i){Ae(this,i);}},ss={I:qe},Oa=to.litHtmlPolyfillSupport;Oa?.(hi,qe),(to.litHtmlVersions??=[]).push("3.3.0");var ns=(t,i,e)=>{let o=e?.renderBefore??i,r=o._$litPart$;if(r===void 0){let s=e?.renderBefore??null;o._$litPart$=r=new qe(i.insertBefore(li(),s),s,void 0,e??{});}return r._$AI(t),r};var C=t=>t??Y;var as=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(i){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=i;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var Gt=function(t,i,e,o,r){if(typeof i=="function"?t!==i||true:!i.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return i.set(t,e),e},ut=function(t,i,e,o){if(typeof i=="function"?t!==i||true:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?o:e==="a"?o.call(t):o?o.value:i.get(t)},We,eo,io,di,er,pi,oo,Ie,ui,pe,ro,ls,cs=t=>typeof t=="boolean"?t:t?.capture??false;var La=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(i,e,o){if(e==null)return;let r=cs(o)?this.__captureEventListeners:this.__eventListeners,s=r.get(i);if(s===void 0)s=new Map,r.set(i,s);else if(s.has(e))return;let n=typeof o=="object"&&o?o:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(i,e,o)),s.set(e,n??{});}removeEventListener(i,e,o){if(e==null)return;let r=cs(o)?this.__captureEventListeners:this.__eventListeners,s=r.get(i);s!==void 0&&(s.delete(e),s.size||r.delete(i));}dispatchEvent(i){let e=[this],o=this.__eventTargetParent;if(i.composed)for(;o;)e.push(o),o=o.__eventTargetParent;else for(;o&&o!==this.__host;)e.push(o),o=o.__eventTargetParent;let r=false,s=false,n=0,c=null,l=null,p=null,f=i.stopPropagation,h=i.stopImmediatePropagation;Object.defineProperties(i,{target:{get(){return c??l},...X},srcElement:{get(){return i.target},...X},currentTarget:{get(){return p},...X},eventPhase:{get(){return n},...X},composedPath:{value:()=>e,...X},stopPropagation:{value:()=>{r=true,f.call(i);},...X},stopImmediatePropagation:{value:()=>{s=true,h.call(i);},...X}});let m=($,_,S)=>{typeof $=="function"?$(i):typeof $?.handleEvent=="function"&&$.handleEvent(i),_.once&&S.delete($);},g=()=>(p=null,n=0,!i.defaultPrevented),b=e.slice().reverse();c=!this.__host||!i.composed?this:null;let v=$=>{for(l=this;l.__host&&$.includes(l.__host);)l=l.__host;};for(let $ of b){!c&&(!l||l===$.__host)&&v(b.slice(b.indexOf($))),p=$,n=$===i.target?2:1;let _=$.__captureEventListeners.get(i.type);if(_){for(let[S,y]of _)if(m(S,y,_),s)return g()}if(r)return g()}let E=i.bubbles?e:[this];l=null;for(let $ of E){!c&&(!l||$===l.__host)&&v(E.slice(0,E.indexOf($)+1)),p=$,n=$===i.target?2:3;let _=$.__eventListeners.get(i.type);if(_){for(let[S,y]of _)if(m(S,y,_),s)return g()}if(r)return g()}return g()}},ir=La;var X={__proto__:null};X.enumerable=true;Object.freeze(X);var or=(pe=class{constructor(i,e={}){if(We.set(this,false),eo.set(this,false),io.set(this,false),di.set(this,false),er.set(this,Date.now()),pi.set(this,false),oo.set(this,void 0),Ie.set(this,void 0),ui.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof e!="object"||!e)throw new Error('The "options" argument must be an object');let{bubbles:o,cancelable:r,composed:s}=e;Gt(this,We,!!r),Gt(this,eo,!!o),Gt(this,io,!!s),Gt(this,oo,`${i}`),Gt(this,Ie,null),Gt(this,ui,false);}initEvent(i,e,o){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){Gt(this,di,true);}get target(){return ut(this,Ie,"f")}get currentTarget(){return ut(this,Ie,"f")}get srcElement(){return ut(this,Ie,"f")}get type(){return ut(this,oo,"f")}get cancelable(){return ut(this,We,"f")}get defaultPrevented(){return ut(this,We,"f")&&ut(this,di,"f")}get timeStamp(){return ut(this,er,"f")}composedPath(){return ut(this,ui,"f")?[ut(this,Ie,"f")]:[]}get returnValue(){return !ut(this,We,"f")||!ut(this,di,"f")}get bubbles(){return ut(this,eo,"f")}get composed(){return ut(this,io,"f")}get eventPhase(){return ut(this,ui,"f")?pe.AT_TARGET:pe.NONE}get cancelBubble(){return ut(this,pi,"f")}set cancelBubble(i){i&&Gt(this,pi,true);}stopPropagation(){Gt(this,pi,true);}get isTrusted(){return  false}},We=new WeakMap,eo=new WeakMap,io=new WeakMap,di=new WeakMap,er=new WeakMap,pi=new WeakMap,oo=new WeakMap,Ie=new WeakMap,ui=new WeakMap,pe.NONE=0,pe.CAPTURING_PHASE=1,pe.AT_TARGET=2,pe.BUBBLING_PHASE=3,pe);Object.defineProperties(or.prototype,{initEvent:X,stopImmediatePropagation:X,preventDefault:X,target:X,currentTarget:X,srcElement:X,type:X,cancelable:X,defaultPrevented:X,timeStamp:X,composedPath:X,returnValue:X,bubbles:X,composed:X,eventPhase:X,cancelBubble:X,stopPropagation:X,isTrusted:X});var hs=(ls=class extends or{constructor(i,e={}){super(i,e),ro.set(this,void 0),Gt(this,ro,e?.detail??null);}initCustomEvent(i,e,o,r){throw new Error("Method not implemented.")}get detail(){return ut(this,ro,"f")}},ro=new WeakMap,ls);Object.defineProperties(hs.prototype,{detail:X});var rr=or,sr=hs;globalThis.Event??=rr;globalThis.CustomEvent??=sr;var ds=new WeakMap,mi=t=>{let i=ds.get(t);return i===void 0&&ds.set(t,i=new Map),i},Ma=class extends ir{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(mi(this)).map(([i,e])=>({name:i,value:e}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(i,e){mi(this).set(i,String(e));}removeAttribute(i){mi(this).delete(i);}toggleAttribute(i,e){if(this.hasAttribute(i)){if(e===void 0||!e)return this.removeAttribute(i),false}else return e===void 0||e?(this.setAttribute(i,""),true):false;return  true}hasAttribute(i){return mi(this).has(i)}attachShadow(i){let e={host:this};return this.__shadowRootMode=i.mode,i&&i.mode==="open"&&(this.__shadowRoot=e),e}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let i=new as(this);return this.__internals=i,i}getAttribute(i){return mi(this).get(i)??null}};var Pa=class extends Ma{},nr=Pa;globalThis.litServerRoot??=Object.defineProperty(new nr,"localName",{get(){return "lit-server-root"}});var Va=class{constructor(){this.__definitions=new Map;}define(i,e){if(this.__definitions.has(i))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${i}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${i}" has already been used with this registry`);e.__localName=i,this.__definitions.set(i,{ctor:e,observedAttributes:e.observedAttributes??[]});}get(i){return this.__definitions.get(i)?.ctor}},Da=Va;var ps=new Da;var fi=globalThis,so=fi.ShadowRoot&&(fi.ShadyCSS===void 0||fi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ar=Symbol(),us=new WeakMap,gi=class{constructor(i,e,o){if(this._$cssResult$=true,o!==ar)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e;}get styleSheet(){let i=this.o,e=this.t;if(so&&i===void 0){let o=e!==void 0&&e.length===1;o&&(i=us.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),o&&us.set(e,i));}return i}toString(){return this.cssText}},ms=t=>new gi(typeof t=="string"?t:t+"",void 0,ar),w=(t,...i)=>{let e=t.length===1?t[0]:i.reduce((o,r,s)=>o+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new gi(e,t,ar)},fs=(t,i)=>{if(so)t.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let o=document.createElement("style"),r=fi.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=e.cssText,t.appendChild(o);}},lr=so||fi.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(i=>{let e="";for(let o of i.cssRules)e+=o.cssText;return ms(e)})(t):t;var{is:Ha,defineProperty:Fa,getOwnPropertyDescriptor:Na,getOwnPropertyNames:Ba,getOwnPropertySymbols:Ua,getPrototypeOf:qa}=Object,vi=globalThis;vi.customElements??=ps;var gs=vi.trustedTypes,Wa=gs?gs.emptyScript:"",ja=vi.reactiveElementPolyfillSupport,bi=(t,i)=>t,ue={toAttribute(t,i){switch(i){case Boolean:t=t?Wa:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t);}catch{e=null;}}return e}},no=(t,i)=>!Ha(t,i),bs={attribute:true,type:String,converter:ue,reflect:false,useDefault:false,hasChanged:no};Symbol.metadata??=Symbol("metadata"),vi.litPropertyMetadata??=new WeakMap;var Zt=class extends(globalThis.HTMLElement??nr){static addInitializer(i){this._$Ei(),(this.l??=[]).push(i);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=bs){if(e.state&&(e.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=true),this.elementProperties.set(i,e),!e.noAccessor){let o=Symbol(),r=this.getPropertyDescriptor(i,o,e);r!==void 0&&Fa(this.prototype,i,r);}}static getPropertyDescriptor(i,e,o){let{get:r,set:s}=Na(this.prototype,i)??{get(){return this[e]},set(n){this[e]=n;}};return {get:r,set(n){let c=r?.call(this);s?.call(this,n),this.requestUpdate(i,c,o);},configurable:true,enumerable:true}}static getPropertyOptions(i){return this.elementProperties.get(i)??bs}static _$Ei(){if(this.hasOwnProperty(bi("elementProperties")))return;let i=qa(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties);}static finalize(){if(this.hasOwnProperty(bi("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(bi("properties"))){let e=this.properties,o=[...Ba(e),...Ua(e)];for(let r of o)this.createProperty(r,e[r]);}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[o,r]of e)this.elementProperties.set(o,r);}this._$Eh=new Map;for(let[e,o]of this.elementProperties){let r=this._$Eu(e,o);r!==void 0&&this._$Eh.set(r,e);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let o=new Set(i.flat(1/0).reverse());for(let r of o)e.unshift(lr(r));}else i!==void 0&&e.push(lr(i));return e}static _$Eu(i,e){let o=e.attribute;return o===false?void 0:typeof o=="string"?o:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this));}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.();}removeController(i){this._$EO?.delete(i);}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let o of e.keys())this.hasOwnProperty(o)&&(i.set(o,this[o]),delete this[o]);i.size>0&&(this._$Ep=i);}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fs(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(i=>i.hostConnected?.());}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.());}attributeChangedCallback(i,e,o){this._$AK(i,o);}_$ET(i,e){let o=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,o);if(r!==void 0&&o.reflect===true){let s=(o.converter?.toAttribute!==void 0?o.converter:ue).toAttribute(e,o.type);this._$Em=i,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null;}}_$AK(i,e){let o=this.constructor,r=o._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let s=o.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ue;this._$Em=r,this[r]=n.fromAttribute(e,s.type)??this._$Ej?.get(r)??null,this._$Em=null;}}requestUpdate(i,e,o){if(i!==void 0){let r=this.constructor,s=this[i];if(o??=r.getPropertyOptions(i),!((o.hasChanged??no)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(r._$Eu(i,o))))return;this.C(i,e,o);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(i,e,{useDefault:o,reflect:r,wrapped:s},n){o&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,n??e??this[i]),s!==true||n!==void 0)||(this._$AL.has(i)||(this.hasUpdated||o||(e=void 0),this._$AL.set(i,e)),r===true&&this._$Em!==i&&(this._$Eq??=new Set).add(i));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(e){Promise.reject(e);}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0;}let o=this.constructor.elementProperties;if(o.size>0)for(let[r,s]of o){let{wrapped:n}=s,c=this[r];n!==true||this._$AL.has(r)||c===void 0||this.C(r,void 0,s,c);}}let i=false,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM();}catch(o){throw i=false,this._$EM(),o}i&&this._$AE(e);}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(i)),this.updated(i);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return  true}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM();}updated(i){}firstUpdated(i){}};Zt.elementStyles=[],Zt.shadowRootOptions={mode:"open"},Zt[bi("elementProperties")]=new Map,Zt[bi("finalized")]=new Map,ja?.({ReactiveElement:Zt}),(vi.reactiveElementVersions??=[]).push("2.1.0");var cr=globalThis,_t=class extends Zt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=ns(e,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return st}};_t._$litElement$=true,_t.finalized=true,cr.litElementHydrateSupport?.({LitElement:_t});var Ka=cr.litElementPolyfillSupport;Ka?.({LitElement:_t});(cr.litElementVersions??=[]).push("4.2.0");var R=t=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,i);}):customElements.define(t,i);};var Ga={attribute:true,type:String,converter:ue,reflect:false,hasChanged:no},Ya=(t=Ga,i,e)=>{let{kind:o,metadata:r}=e,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),o==="setter"&&((t=Object.create(t)).wrapped=true),s.set(e.name,t),o==="accessor"){let{name:n}=e;return {set(c){let l=i.get.call(this);i.set.call(this,c),this.requestUpdate(n,l,t);},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(o==="setter"){let{name:n}=e;return function(c){let l=this[n];i.call(this,c),this.requestUpdate(n,l,t);}}throw Error("Unsupported decorator location: "+o)};function d(t){return (i,e)=>typeof e=="object"?Ya(t,i,e):((o,r,s)=>{let n=r.hasOwnProperty(s);return r.constructor.createProperty(s,o),n?Object.getOwnPropertyDescriptor(r,s):void 0})(t,i,e)}function T(t){return d({...t,state:true,attribute:false})}function je(t){return (i,e)=>{let o=typeof i=="function"?i:i[e];Object.assign(o,t);}}var me=(t,i,e)=>(e.configurable=true,e.enumerable=true,Reflect.decorate&&typeof i!="object"&&Object.defineProperty(t,i,e),e);function A(t,i){return (e,o,r)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return me(e,o,{get(){return s(this)}})}}function vs(t){return (i,e)=>{let{slot:o,selector:r}=t??{},s="slot"+(o?`[name=${o}]`:":not([name])");return me(i,e,{get(){let n=this.renderRoot?.querySelector(s),c=n?.assignedElements(t)??[];return r===void 0?c:c.filter(l=>l.matches(r))}})}}function fe(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function ys(t,i){return fe(t)?Object.assign({},t,i):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},i)}var Xa=".";function xs(t,i,e){if(!i||i.length===0)return t;let o=Array.isArray(i)?i:i.split(Xa),r,s=t;for(let n=0;n<o.length;n++){let c=o[n];if(c in s)r=s[c];else return e;s=r;}return r}function ao(t,i,e,o){if(!i||!t)return t;let r=i;if(r.length===0)return typeof t=="object"&&Object.assign(t,e),t;{let s=t,n=[],c=(l,p,f)=>{l[p]=f;};for(let l=0;l<r.length;l++){let p=r[l];if(n.push(p),s)if(Array.isArray(s)){let f=parseInt(p,10);if(Number.isNaN(f)||f<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===r.length-1?c(s,f,e):s=s[f];}else s instanceof Map||s instanceof WeakMap?l===r.length-1?s.set(p,e):(s.has(p)||s.set(p,{}),s=s.get(p)):typeof s=="object"&&p in s?l===r.length-1?c(s,p,e):s=s[p]:(s[p]=l===r.length-1?e:{},s=s[p]);else s[p]=l===r.length-1?e:{},s=s[p];}}return t}function Qa(t){if(t==null)return "";let i=typeof t;if(i==="boolean")return String(t);if(Array.isArray(i))return t.split(",").map(e=>e.trim());if(i==="object")try{return JSON.stringify(t)}catch{return "{} "}return String(t)}function ws(t,i){if(!i)return t;let e=i.datatype||"any";if(e==="any")return t;if(e==="string")return Qa(t);if(e==="number")return Number(t);if(typeof t=="string"){if(e==="boolean")return t.toLowerCase()==="true";if(e==="array")return t.split(",").map(o=>o.trim());if(e==="object")try{return JSON.parse(t)}catch{return {}}}return e==="boolean"?!!t:t}function _s(t,i,e){return t?e(i):i}var ge=class extends Event{constructor(i,e,o,r){super("context-request",{bubbles:true,composed:true}),this.context=i,this.contextTarget=e,this.callback=o,this.subscribe=r??false;}};var Ke=class{constructor(i,e,o,r){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=i,e.context!==void 0){let s=e;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=e,this.callback=o,this.subscribe=r??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new ge(this.context,this.host,this.t,this.subscribe));}};var lo=class{get value(){return this.o}set value(i){this.setValue(i);}setValue(i,e=false){let o=e||!Object.is(i,this.o);this.o=i,o&&this.updateObservers();}constructor(i){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:o}]of this.subscriptions)e(this.o,o);},i!==void 0&&(this.value=i);}addCallback(i,e,o){if(!o)return void i(this.value);this.subscriptions.has(i)||this.subscriptions.set(i,{disposer:()=>{this.subscriptions.delete(i);},consumerHost:e});let{disposer:r}=this.subscriptions.get(i);i(this.value,r);}clearCallbacks(){this.subscriptions.clear();}};var hr=class extends Event{constructor(i,e){super("context-provider",{bubbles:true,composed:true}),this.context=i,this.contextTarget=e;}},Ge=class extends lo{constructor(i,e,o){super(e.context!==void 0?e.initialValue:o),this.onContextRequest=r=>{if(r.context!==this.context)return;let s=r.contextTarget??r.composedPath()[0];s!==this.host&&(r.stopPropagation(),this.addCallback(r.callback,s,r.subscribe));},this.onProviderRequest=r=>{if(r.context!==this.context||(r.contextTarget??r.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:c}]of this.subscriptions)s.has(n)||(s.add(n),c.dispatchEvent(new ge(this.context,c,n,true)));r.stopPropagation();},this.host=i,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new hr(this.context,this.host));}};function dr({context:t}){return (i,e)=>{let o=new WeakMap;if(typeof e=="object")return {get(){return i.get.call(this)},set(r){return o.get(this).setValue(r),i.set.call(this,r)},init(r){return o.set(this,new Ge(this,{context:t,initialValue:r})),r}};{i.constructor.addInitializer(n=>{o.set(n,new Ge(n,{context:t}));});let r=Object.getOwnPropertyDescriptor(i,e),s;if(r===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(c){o.get(this).setValue(c),n.set(this,c);},configurable:true,enumerable:true};}else {let n=r.set;s={...r,set(c){o.get(this).setValue(c),n?.call(this,c);}};}return void Object.defineProperty(i,e,s)}}}function pr({context:t,subscribe:i}){return (e,o)=>{typeof o=="object"?o.addInitializer(function(){new Ke(this,{context:t,callback:r=>{e.set.call(this,r);},subscribe:i});}):e.constructor.addInitializer(r=>{new Ke(r,{context:t,callback:s=>{r[o]=s;},subscribe:i});});}}var co="autoform";var ks=w`
    :host{
        display: flex;
        position: relative;  
        box-sizing: border-box;
        display: block;
        & > .autofield{
            display: flex;
            position: relative;
            flex-direction:column;
            background-color: var(--sl-color-neutral-0);        
            width:100%;        
            padding: calc(var(--auto-spacing) * 0.2) var(--auto-spacing);      
            box-sizing: border-box;
            padding-right: 0px;
            &>.label{
                display: flex;   
                color: var(--auto-text-color);   
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
            &>.value{
                position: relative;
            }
            
            & .help{
                display: flex;
                align-items: center;
                font-size: calc(var(--auto-font-size) * 0.9);
                color: var(--auto-gray-color);
                padding:  calc(var(--auto-spacing) * 0.3) 0px;
                font-weight: lighter;                
                & a{
                    text-decoration: none;
                    color: var(--auto-gray-color);
                    &:hover{
                        color:var(--auto-theme-color);
                    }
                }
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
    /* 隐藏 */ 
    :host(.hidden){
        display: none!important;
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
            & .help{
                display: inline;
                a{
                    text-decoration: none;
                }
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
                pointer-events: none;
            }
            & sl-textarea::part(textarea){
                color: var(--sl-color-gray-400);
                user-select: none; 
                pointer-events: none;
            }
        }
    }
    /* 网格线 */
    :host(.grid-border){ 
        & > .autofield{ 
            padding: calc(var(--auto-spacing) * 0.6) var(--auto-spacing);        
        }
    } 
    :host(.grid-border.compact){ 
        & > .autofield{ 
            padding: calc(var(--auto-spacing) * 0.3) var(--auto-spacing);        
        }
    } 
    /* 布局 */
    :host(.row-layout){
        & > .autofield{
            & > .label > .title{
                display: flex;
                align-items: center;
            }
        }
    }

    /* 紧凑模式 */
    :host(.compact){ 
        & > .autofield{ 
            padding: calc(var(--auto-spacing) * 0.3) var(--auto-spacing);        
        }
    }

    /* 浏览视图  */
    :host(.viewonly){
        & > .autofield > .value{
                display:flex;
                align-items: end;
        } 
    }
    :host(.viewonly.view-left){
        & > .autofield > .value{ 
            align-items: start;
        }
    }    
    :host(.viewonly.view-center){
        & > .autofield > .value{ 
            align-items: center;
        }
    }


    :host(.readonly){
        & > .autofield{
            &>.value:after{
                content: ' ';
                position:absolute;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
                opacity: 0; 
                user-select: none;
                z-index: 1;
            }
        }
    }

`;var mt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Rt=t=>(...i)=>({_$litDirective$:t,values:i}),kt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,o){this._$Ct=i,this._$AM=e,this._$Ci=o;}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:Za}=ss;var $s=(t,i)=>t?._$litType$!==void 0;var ho=t=>t.strings===void 0,Cs=()=>document.createComment(""),Ye=(t,i,e)=>{let o=t._$AA.parentNode,r=i===void 0?t._$AB:i._$AA;if(e===void 0){let s=o.insertBefore(Cs(),r),n=o.insertBefore(Cs(),r);e=new Za(s,n,t,t.options);}else {let s=e._$AB.nextSibling,n=e._$AM,c=n!==t;if(c){let l;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(l=t._$AU)!==n._$AU&&e._$AP(l);}if(s!==r||c){let l=e._$AA;for(;l!==s;){let p=l.nextSibling;o.insertBefore(l,r),l=p;}}}return e},be=(t,i,e=t)=>(t._$AI(i,e),t),tl={},po=(t,i=tl)=>t._$AH=i,Ss=t=>t._$AH,uo=t=>{t._$AP?.(false,true);let i=t._$AA,e=t._$AB.nextSibling;for(;i!==e;){let o=i.nextSibling;i.remove(),i=o;}};var Es=(t,i,e)=>{let o=new Map;for(let r=i;r<=e;r++)o.set(t[r],r);return o},yt=Rt(class extends kt{constructor(t){if(super(t),t.type!==mt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,i,e){let o;e===void 0?e=i:i!==void 0&&(o=i);let r=[],s=[],n=0;for(let c of t)r[n]=o?o(c,n):n,s[n]=e(c,n),n++;return {values:s,keys:r}}render(t,i,e){return this.dt(t,i,e).values}update(t,[i,e,o]){let r=Ss(t),{values:s,keys:n}=this.dt(i,e,o);if(!Array.isArray(r))return this.ut=n,s;let c=this.ut??=[],l=[],p,f,h=0,m=r.length-1,g=0,b=s.length-1;for(;h<=m&&g<=b;)if(r[h]===null)h++;else if(r[m]===null)m--;else if(c[h]===n[g])l[g]=be(r[h],s[g]),h++,g++;else if(c[m]===n[b])l[b]=be(r[m],s[b]),m--,b--;else if(c[h]===n[b])l[b]=be(r[h],s[b]),Ye(t,l[b+1],r[h]),h++,b--;else if(c[m]===n[g])l[g]=be(r[m],s[g]),Ye(t,r[h],r[m]),m--,g++;else if(p===void 0&&(p=Es(n,g,b),f=Es(c,h,m)),p.has(c[h]))if(p.has(c[m])){let v=f.get(n[g]),E=v!==void 0?r[v]:null;if(E===null){let $=Ye(t,r[h]);be($,s[g]),l[g]=$;}else l[g]=be(E,s[g]),Ye(t,r[h],E),r[v]=null;g++;}else uo(r[m]),m--;else uo(r[h]),h++;for(;g<=b;){let v=Ye(t,l[b+1]);be(v,s[g]),l[g++]=v;}for(;h<=m;){let v=r[h++];v!==null&&uo(v);}return this.ut=n,po(t,l),st}});var Xe=class{constructor(i){this.host=i,i.addController(this);}hostConnected(){let i=this.host;i.hasAttribute("dark")&&(i.classList.add("sl-theme-dark"),i.style.color="var(--sl-color-neutral-900,white)",i.shadowRoot.ownerDocument.style=i.style.color);}_toDark(){let i=this.host;i.classList.add("sl-theme-dark"),i.style.color="var(--sl-color-neutral-900,white)";}_toLight(){let i=this.host;i.classList.remove("sl-theme-dark"),i.style.color="var(--sl-color-neutral-1000)";}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext(),this.host.dark?this._toDark():this._toLight();}};var As="important",el=" !"+As,Z=Rt(class extends kt{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((i,e)=>{let o=t[e];return o==null?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[i]){let{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(i)),this.render(i);for(let o of this.ft)i[o]==null&&(this.ft.delete(o),o.includes("-")?e.removeProperty(o):e[o]=null);for(let o in i){let r=i[o];if(r!=null){this.ft.add(o);let s=typeof r=="string"&&r.endsWith(el);o.includes("-")||s?e.setProperty(o,s?r.slice(0,-11):r,s?As:""):e[o]=r;}}return st}});function Q(t,i,e){return t?i(t):e?.(t)}var ve=class{constructor(i,...e){this.initialClasses=[];this.host=i,i.addController(this),this.initialClasses=e;}_forEachClasss(i,e){i&&i.forEach(o=>{typeof o=="string"?(e(o,true),this.host.classList.add(o)):Object.entries(o).forEach(([r,s])=>{e(r,s);});});}add(...i){this.host&&i&&this._forEachClasss(i,e=>{this.host.classList.add(e);});}remove(...i){this.host&&i&&this._forEachClasss(i,e=>{this.host.classList.remove(e);});}toggle(...i){this.host&&this._forEachClasss(i,e=>{this.host.classList.toggle(e);});}use(...i){this.host&&this._forEachClasss(i,(e,o)=>{o?this.host.classList.add(e):this.host.classList.remove(e);});}has(i){return this.host.classList.contains(i)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var yi=class extends kt{constructor(i){if(super(i),this.it=Y,i.type!==mt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===Y||i==null)return this._t=void 0,this.it=i;if(i===st)return i;if(typeof i!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.it)return this._t;this.it=i;let e=[i];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};yi.directiveName="unsafeHTML",yi.resultType=1;var Pt=Rt(yi);function Ts(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var z=class extends _t{constructor(){super(...arguments);this.theme=new Xe(this);this.classs=new ve(this);this.options=Ts();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];}static{this.styles=ks;}get shadow(){return this.shadowRoot}getFieldOptions(){return Object.entries(this.schema||{}).reduce((e,[o,r])=>(fe(r)?e[o]=r.value:e[o]=r,e),Object.assign({},Ts(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(e=true){return u`${this.renderBeforeActions(e)}
                ${this.renderAfterActions(e)}`}_onClickAction(e,o){return r=>{typeof o=="function"&&o(r),e.onClick&&typeof e.onClick=="function"&&e.onClick?.call(this,this.getInputValue(),{action:e,options:this.options,event:r,update:s=>{ao(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(e){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return u`<div class="actions before" part="before-actions" slot="${C(e?"prefix":void 0)}">
            ${yt(this.beforeActions,o=>this.renderActionWidget(o))}</div>`}renderAfterActions(e){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return u`<div class="actions after" part="after-actions"  slot="${C(e?"suffix":void 0)}">
            ${yt(this.afterActions,o=>this.renderActionWidget(o))}</div>`}_renderDropdownAction(e){return u`
        <sl-dropdown class='action-widget'  hoist
            title=${C(e.tips)}
            placement=${e.pos==="before"?"bottom-start":"bottom-end"}
        >
            <sl-button slot="trigger" ?caret=${e.caret}>
                ${Q(e.icon,()=>u`<sl-icon name=${C(e.icon)}></sl-icon>`)}
                ${e.label}
            </sl-button>
            <sl-menu>   
                ${yt(e.items||[],o=>o==="-"?u`<sl-divider></sl-divider>`:(typeof o=="string"&&(o={label:o}),u`<sl-menu-item  @click=${this._onClickAction.call(this,o,()=>{e.syncMenu&&(e.label=o.label,e.icon=o.icon,e.tips=o.tips,this.requestUpdate());})}>
                        ${Q(o.icon,()=>u`<sl-icon name=${C(o.icon)} slot="prefix"></sl-icon>`)}
                    ${o.label}</sl-menu-item>`))}
            </sl-menu>
        </sl-dropdown>
        `}_renderButtonAction(e){return u`
        <sl-button class='action-widget' 
            title=${C(e.tips)}
            variant=${C(e.variant)}
            size=${e.size||this.context.size} 
            @click=${this._onClickAction.call(this,e)}>
            ${Q(e.icon,()=>u`<sl-icon name=${C(e.icon)}></sl-icon>`)}
            ${e.label}
        </sl-button>
    `}_renderImageAction(e){return u`
        <sl-button title="${C(e.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this,e)}>                
            <img src="${C(e.url)}"/>
        </sl-button>
    `}renderActionWidget(e){if(typeof e!="object")return;let o=e.type||"button";if(o==="dropdown")return this._renderDropdownAction(e);if(o==="button")return this._renderButtonAction(e);if(o==="image")return this._renderImageAction(e)}renderOption(e,o){let r=this.schema[e];if(r)return r.loading?u`<sl-spinner></sl-spinner>`:u`${o?o(r.value):r.value}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(e){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,e):e}toState(e){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,e):e}toInput(e){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,e):e}getOptionValue(e,o){if(this.schema&&e in this.schema){let r=this.schema[e];return r===void 0?o:fe(r)?r.value:r}else return o}getOption(e){if(this.schema&&e in this.schema){let o=this.schema[e];return fe(o)?o:ys(o)}}getInputValue(){if(!this.input)return "";let e=this.options.datatype||"string",o=this.input.value;return e==="number"?o=Number(o):e==="boolean"&&(o=!!o),o}_renderRequiredOption(){return this.renderOption("required",e=>e?u`<span style='color:red;padding:2px;'>*</span>`:"")}renderHelp(e=false){let o=this.options.help;if(!o)return;let r=o.match(/\(([^)]+)\)[^)]*$/),s=r?r[1]:null,n=s?o.replace(`(${s})`,""):o;return u`<span class="help" part="field-help" title="${C(e?n:void 0)}">
            ${_s(!!s,u`
                <sl-icon name="help"></sl-icon>
                ${Q(!e,()=>u`${n}`)}
            `,c=>u`<a target="_blank" href="${s}">${c}</a>`)} 
        </span>`}renderLabel(){let e=this.context,o=this.options.labelPos||e.labelPos;if(o==="none")return u``;{let r={};return (e.labelWidth&&o==="left"||e.viewonly)&&(r.width=e.labelWidth),u`<div class="label" part="field-label" style="${C(Z(r))}">
            <span class="title">
                ${this.getLabel()}
                ${Q(o==="left"||e.viewonly,()=>this.renderHelp(true))}
                ${this._renderRequiredOption()}
            </span>     
            ${Q(o==="top"&&!e.viewonly,()=>this.renderHelp())}
        </div>`}}renderInput(){return u``}isShowError(){return this.context.showInitialError?!!this.invalidMessage:this.dirty?!!this.invalidMessage:false}renderError(){return this.isShowError()?u`<div class="error">
            ${this.invalidMessage}
        </div>`:u``}onFieldChange(){this._updateFieldValue();}onFieldInput(){this._updateFieldValue();}_handleSchemaChange(){let e=this.context;if(e?.store&&this.schema){let o=this.getPath().join("_$_");this._subscribers.push(e.store.schemas.store.watch(`${o}.**`,r=>{let{reply:s,type:n,value:c,flags:l}=r;if(s||e.form.seq===l)return;(n==="batch"?c:[r]).forEach(f=>{let h=f.path.slice(1);ao(this.schema,h,f.value),this.options[h[0]]=f.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let e=this.value;if(this.options.toView&&this.options.toView)try{e=this.options.toView.call(this,this.value);}catch(o){console.error(`Error while toView<${this.path}>: ${o.message}`);}return u`${Pt(String(e))}`}_handleStateChange(){let e=this.context;e?.store&&this.schema&&this._subscribers.push(e.store.watch(this.getPath().join("."),o=>{this.value=this.toInput(o.value);},{operates:"write"}));}getStateValue(){return this.toInput(xs(this.context.store.state,this.getPath()))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let e=this.context;e?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.getPath().join("."),this.name=this.options.name||this.path,this.path in e.store.schemas.errors&&(this.invalidMessage=e.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(o=>o.pos==="before"),this.afterActions=this.options.actions.filter(o=>o.pos!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(e=>e.off());}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFieldValue(){if(!this.schema)return;let e=this.getPath(),o=this.toState(this.getInputValue()),r=this.context;r.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let c=ws(o,this.schema);ao(n,e,c),this.invalidMessage=void 0;},{flags:r.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:o,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidMessage=s.message;}}renderValue(){return u`
            ${this.renderInput()}
            ${Q(this.context.viewonly,()=>this.renderHelp())}         
            ${this.renderError()} 
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}render(){let e=this.context,o=this.options.labelPos?this.options.labelPos:e.labelPos;return this.classs.use(e.size,{[`${e.border}-border`]:true,error:this.isShowError(),"left-label":o==="left"||e.viewonly,"top-label":o==="top"&&!e.viewonly,disable:this.options.enable===false,readonly:e.readonly,viewonly:e.viewonly,compact:this.compact===void 0?e.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${e.viewAlign}`]:true,[`${e.layout}-layout`]:true}),u`           
            <div class="autofield">
                ${this.options.divider?u`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${Q(e.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>                            
            </div>
        `}};x([d({type:Object})],z.prototype,"schema",2),x([T()],z.prototype,"value",2),x([T()],z.prototype,"invalidMessage",2),x([T()],z.prototype,"labelPos",2),x([T()],z.prototype,"dirty",2),x([d({type:Boolean,reflect:true})],z.prototype,"noreactive",2),x([d({type:Boolean,reflect:true})],z.prototype,"compact",2),x([vs({slot:"value",flatten:true})],z.prototype,"_field",2),x([A(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],z.prototype,"input",2),x([pr({context:co}),d({attribute:false})],z.prototype,"context",2);exports.AutoFieldInput=class J extends z{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return u`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=r=>r.map(s=>typeof s=="string"?s:s.value||s.label),o=(r,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let c=e(s),l=-1;c.some((h,m)=>{if(n&&this.value.startsWith(h)||!n&&this.value.endsWith(h))return n?(this._prefix=h,this.value=this.value.substring(h.length)):(this._suffix=h,this.value=this.value.substring(0,this.value.length-h.length)),l=m,true});let p=l===-1?"?":typeof s[l]=="string"?s[l]:s[l].label,f={type:s.length===1?"button":"dropdown",label:p,caret:!n};f.type==="dropdown"?f.items=s.map(h=>(h==="-"||(h=typeof h=="string"?{label:h}:h,h.onClick=()=>{n?this._prefix=h.value??h.label:this._suffix=h.value??h.label,this.onFieldChange();}),h)):typeof s[0]=="string"?f.label=s[0]:Object.assign(f,s[0]),f.syncMenu=true,f.pos=n?"before":"after",n?r.splice(0,0,f):r.push(f);}};this.options.prefix&&o(this.beforeActions,this.options.prefix),this.options.suffix&&o(this.afterActions,this.options.suffix,false);}onInputChange(e){let o=e.type;this.context.validAt==="input"&&o.includes("input")?this.onFieldInput():o.includes("change")&&this.onFieldChange();}renderInput(){return u`
            <sl-input 
                slot="value" 
                type="${this.getInputType()}"
                .value=${this.value} 
                name=${this.name} 
                data-path = ${this.path}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?clearable=${this.options.clearable}
                ?required=${this.options.required}                
                size=${this.context.size} 
                placeholder=${C(this.options.placeholder)}
                pattern=${C(this.options.pattern)}
                minLength=${C(this.options.minLength)}
                maxLength=${C(this.options.maxLength)}
                ?disabled=${!this.options.enable}                
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                spellcheck=${C(this.options.spellcheck)}
            >
            ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input>
        `}toState(e){let o=super.toState(e);return typeof o=="string"&&(this._prefix&&(o=this._prefix+o),this._suffix&&(o=o+this._suffix)),o}toInput(e){let o=super.toInput(e);return typeof o=="string"&&(this._prefix&&o.startsWith(this._prefix)&&(o=o.substring(this._prefix.length)),this._suffix&&o.endsWith(this._suffix)&&(o=o.substring(0,o.length-this._suffix.length))),o}};exports.AutoFieldInput.styles=[z.styles,w`
            .actions{
                margin-right:0px;
                display:flex;
                flex-direction:row;
                align-items:center; 
            }
            .actions > sl-button{
                margin:0px;            
            }
            
            .actions.before{
                margin-left: 0px;
            }
            .actions.before  sl-button::part(base){
                border-left:none;
                border-radius: 0px;
            } 
            .actions.after  sl-button::part(base){
                border-right:none;
                border-radius: 0px;
            } 
    `],exports.AutoFieldInput=x([R("auto-field-input")],exports.AutoFieldInput);var Is=w`
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
`;var Vt=(t="value")=>(i,e)=>{let o=i.constructor,r=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(s,n,c){var l;let p=o.getPropertyOptions(t),f=typeof p.attribute=="string"?p.attribute:t;if(s===f){let h=p.converter||ue,g=(typeof h=="function"?h:(l=h?.fromAttribute)!=null?l:ue.fromAttribute)(c,p.type);this[t]!==g&&(this[e]=g);}r.call(this,s,n,c);};};var Ct=w`
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
`;var Os=Object.defineProperty,il=Object.defineProperties,ol=Object.getOwnPropertyDescriptor,rl=Object.getOwnPropertyDescriptors,zs=Object.getOwnPropertySymbols,sl=Object.prototype.hasOwnProperty,nl=Object.prototype.propertyIsEnumerable,ur=(t,i)=>(i=Symbol[t])?i:Symbol.for("Symbol."+t),mr=t=>{throw TypeError(t)},Rs=(t,i,e)=>i in t?Os(t,i,{enumerable:true,configurable:true,writable:true,value:e}):t[i]=e,$t=(t,i)=>{for(var e in i||(i={}))sl.call(i,e)&&Rs(t,e,i[e]);if(zs)for(var e of zs(i))nl.call(i,e)&&Rs(t,e,i[e]);return t},te=(t,i)=>il(t,rl(i)),a=(t,i,e,o)=>{for(var r=o>1?void 0:o?ol(i,e):i,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(i,e,r):n(r))||r);return o&&r&&Os(i,e,r),r},Ls=(t,i,e)=>i.has(t)||mr("Cannot "+e),Ms=(t,i,e)=>(Ls(t,i,"read from private field"),i.get(t)),Ps=(t,i,e)=>i.has(t)?mr("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(t):i.set(t,e),Vs=(t,i,e,o)=>(Ls(t,i,"write to private field"),i.set(t,e),e),al=function(t,i){this[0]=t,this[1]=i;},Ds=t=>{var i=t[ur("asyncIterator")],e=false,o,r={};return i==null?(i=t[ur("iterator")](),o=s=>r[s]=n=>i[s](n)):(i=i.call(t),o=s=>r[s]=n=>{if(e){if(e=false,s==="throw")throw n;return n}return e=true,{done:false,value:new al(new Promise(c=>{var l=i[s](n);l instanceof Object||mr("Object expected"),c(l);}),1)}}),r[ur("iterator")]=()=>r,o("next"),"throw"in i?o("throw"):r.throw=s=>{throw s},"return"in i&&o("return"),r};var xi=new WeakMap,wi=new WeakMap,_i=new WeakMap,fr=new WeakSet,mo=new WeakMap,dt=class{constructor(t,i){this.handleFormData=e=>{let o=this.options.disabled(this.host),r=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof r=="string"&&r.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(c=>{e.formData.append(r,c.toString());}):e.formData.append(r,s.toString()));},this.handleFormSubmit=e=>{var o;let r=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=xi.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!r&&!s(this.host)&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),mo.set(this.host,[]);},this.handleInteraction=e=>{let o=mo.get(this.host);o.includes(e.type)||o.push(e.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let o of e)if(typeof o.checkValidity=="function"&&!o.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let o of e)if(typeof o.reportValidity=="function"&&!o.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=$t({form:e=>{let o=e.form;if(o){let s=e.getRootNode().querySelector(`#${o}`);if(s)return s}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var o;return (o=e.disabled)!=null?o:false},reportValidity:e=>typeof e.reportValidity=="function"?e.reportValidity():true,checkValidity:e=>typeof e.checkValidity=="function"?e.checkValidity():true,setValue:(e,o)=>e.value=o,assumeInteractionOn:["sl-input"]},i);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),mo.set(this.host,[]),this.options.assumeInteractionOn.forEach(i=>{this.host.addEventListener(i,this.handleInteraction);});}hostDisconnected(){this.detachForm(),mo.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,xi.has(this.form)?xi.get(this.form).add(this.host):xi.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),wi.has(this.form)||(wi.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),_i.has(this.form)||(_i.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=xi.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),wi.has(this.form)&&(this.form.reportValidity=wi.get(this.form),wi.delete(this.form)),_i.has(this.form)&&(this.form.checkValidity=_i.get(this.form),_i.delete(this.form)),this.form=void 0));}setUserInteracted(t,i){i?fr.add(t):fr.delete(t),t.requestUpdate();}doAction(t,i){if(this.form){let e=document.createElement("button");e.type=t,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",i&&(e.name=i.name,e.value=i.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{i.hasAttribute(o)&&e.setAttribute(o,i.getAttribute(o));})),this.form.append(e),e.click(),e.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let i=this.host,e=!!fr.has(i),o=!!i.required;i.toggleAttribute("data-required",o),i.toggleAttribute("data-optional",!o),i.toggleAttribute("data-invalid",!t),i.toggleAttribute("data-valid",t),i.toggleAttribute("data-user-invalid",!t&&e),i.toggleAttribute("data-user-valid",t&&e);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let i=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||i.preventDefault(),this.host.dispatchEvent(i)||t?.preventDefault();}},Qe=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),Hs=Object.freeze(te($t({},Qe),{valid:false,valueMissing:true})),Fs=Object.freeze(te($t({},Qe),{valid:false,customError:true}));var nt=class{constructor(t,...i){this.slotNames=[],this.handleSlotChange=e=>{let o=e.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=i;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let i=t;if(i.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!i.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function Ns(t){if(!t)return "";let i=t.assignedNodes({flatten:true}),e="";return [...i].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(e+=o.textContent);}),e}var gr="";function Bs(t){gr=t;}function Us(t=""){if(!gr){let i=[...document.getElementsByTagName("script")],e=i.find(o=>o.hasAttribute("data-shoelace"));if(e)Bs(e.getAttribute("data-shoelace"));else {let o=i.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),r="";o&&(r=o.getAttribute("src")),Bs(r.split("/").slice(0,-1).join("/"));}}return gr.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var ll={name:"default",resolver:t=>Us(`assets/icons/${t}.svg`)},qs=ll;var Ws={caret:`
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
  `},cl={name:"system",resolver:t=>t in Ws?`data:image/svg+xml,${encodeURIComponent(Ws[t])}`:""},js=cl;var fo=[qs,js],go=[];function br(t){go.push(t);}function vr(t){go=go.filter(i=>i!==t);}function bo(t){return fo.find(i=>i.name===t)}function yr(t,i){Ks(t),fo.push({name:t,resolver:i.resolver,mutator:i.mutator,spriteSheet:i.spriteSheet}),go.forEach(e=>{e.library===t&&e.setIcon();});}function Ks(t){fo=fo.filter(i=>i.name!==t);}var Gs=w`
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
`;function I(t,i){let e=$t({waitUntilFirstUpdate:false},i);return (o,r)=>{let{update:s}=o,n=Array.isArray(t)?t:[t];o.update=function(c){n.forEach(l=>{let p=l;if(c.has(p)){let f=c.get(p),h=this[p];f!==h&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[r](f,h);}}),s.call(this,c);};}}var P=w`
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
`;var vo,O=class extends _t{constructor(){super(),Ps(this,vo,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,i])=>{this.constructor.define(t,i);});}emit(t,i){let e=new CustomEvent(t,$t({bubbles:true,cancelable:false,composed:true,detail:{}},i));return this.dispatchEvent(e),e}static define(t,i=this,e={}){let o=customElements.get(t);if(!o){try{customElements.define(t,i,e);}catch{customElements.define(t,class extends i{},e);}return}let r=" (unknown version)",s=r;"version"in i&&i.version&&(r=" v"+i.version),"version"in o&&o.version&&(s=" v"+o.version),!(r&&s&&r===s)&&console.warn(`Attempted to register <${t}>${r}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,i,e){Ms(this,vo)||(this.constructor.elementProperties.forEach((o,r)=>{o.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r]);}),Vs(this,vo,true)),super.attributeChangedCallback(t,i,e);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((i,e)=>{t.has(e)&&this[e]==null&&(this[e]=i);});}};vo=new WeakMap;O.version="2.20.1";O.dependencies={};a([d()],O.prototype,"dir",2);a([d()],O.prototype,"lang",2);var ki=Symbol(),yo=Symbol(),xr,wr=new Map,W=class extends O{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,i){var e;let o;if(i?.spriteSheet)return this.svg=u`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?ki:yo}catch{return yo}try{let r=document.createElement("div");r.innerHTML=await o.text();let s=r.firstElementChild;if(((e=s?.tagName)==null?void 0:e.toLowerCase())!=="svg")return ki;xr||(xr=new DOMParser);let c=xr.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return c?(c.part.add("svg"),document.adoptNode(c)):ki}catch{return ki}}connectedCallback(){super.connectedCallback(),br(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),vr(this);}getIconSource(){let t=bo(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:i,fromLibrary:e}=this.getIconSource(),o=e?bo(this.library):void 0;if(!i){this.svg=null;return}let r=wr.get(i);if(r||(r=this.resolveIcon(i,o),wr.set(i,r)),!this.initialRender)return;let s=await r;if(s===yo&&wr.delete(i),i===this.getIconSource().url){if($s(s)){if(this.svg=s,o){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n);}return}switch(s){case yo:case ki:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=o?.mutator)==null||t.call(o,this.svg),this.emit("sl-load");}}}render(){return this.svg}};W.styles=[P,Gs];a([T()],W.prototype,"svg",2);a([d({reflect:true})],W.prototype,"name",2);a([d()],W.prototype,"src",2);a([d()],W.prototype,"label",2);a([d({reflect:true})],W.prototype,"library",2);a([I("label")],W.prototype,"handleLabelChange",1);a([I(["name","src","library"])],W.prototype,"setIcon",1);var M=Rt(class extends kt{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(i=>t[i]).join(" ")+" "}update(t,[i]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in i)i[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(i)}let e=t.element.classList;for(let o of this.st)o in i||(e.remove(o),this.st.delete(o));for(let o in i){let r=!!i[o];r===this.st.has(o)||this.nt?.has(o)||(r?(e.add(o),this.st.add(o)):(e.remove(o),this.st.delete(o)));}return st}});var Ot=Rt(class extends kt{constructor(t){if(super(t),t.type!==mt.PROPERTY&&t.type!==mt.ATTRIBUTE&&t.type!==mt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ho(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[i]){if(i===st||i===Y)return i;let e=t.element,o=t.name;if(t.type===mt.PROPERTY){if(i===e[o])return st}else if(t.type===mt.BOOLEAN_ATTRIBUTE){if(!!i===e.hasAttribute(o))return st}else if(t.type===mt.ATTRIBUTE&&e.getAttribute(o)===i+"")return st;return po(t),i}});var ot=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,i)=>t.checked=i}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),i=this.helpText?true:!!t;return u`
      <div
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":i})}
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
            value=${C(this.value)}
            .indeterminate=${Ot(this.indeterminate)}
            .checked=${Ot(this.checked)}
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
    `}};ot.styles=[P,Ct,Is];ot.dependencies={"sl-icon":W};a([A('input[type="checkbox"]')],ot.prototype,"input",2);a([T()],ot.prototype,"hasFocus",2);a([d()],ot.prototype,"title",2);a([d()],ot.prototype,"name",2);a([d()],ot.prototype,"value",2);a([d({reflect:true})],ot.prototype,"size",2);a([d({type:Boolean,reflect:true})],ot.prototype,"disabled",2);a([d({type:Boolean,reflect:true})],ot.prototype,"checked",2);a([d({type:Boolean,reflect:true})],ot.prototype,"indeterminate",2);a([Vt("checked")],ot.prototype,"defaultChecked",2);a([d({reflect:true})],ot.prototype,"form",2);a([d({type:Boolean,reflect:true})],ot.prototype,"required",2);a([d({attribute:"help-text"})],ot.prototype,"helpText",2);a([I("disabled",{waitUntilFirstUpdate:true})],ot.prototype,"handleDisabledChange",1);a([I(["checked","indeterminate"],{waitUntilFirstUpdate:true})],ot.prototype,"handleStateChange",1);ot.define("sl-checkbox");exports.AutoFieldCheckbox=class Ci extends z{renderInput(){return u`        
        <sl-checkbox 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}            
            class="auto-input"
            ?disabled=${!this.options.enable}
            .value="${this.options.switchValues[0]}" 
            .checked=${this._isChecked()} 
            placeholder="${C(this.options.placeholder)}"
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.getCheckLabel()}</sl-checkbox> 
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){return this.options.checkLabel?this.options.checkLabel:typeof this.value=="boolean"?"":this.options.switchValues[this.value===this.options.switchValues[0]?0:1]}renderView(){return u`        
        <sl-checkbox 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-checkbox> 
        `}};exports.AutoFieldCheckbox.styles=[z.styles,w`
            sl-checkbox.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=x([R("auto-field-checkbox")],exports.AutoFieldCheckbox);var Ys=w`
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
`;var Ut=class extends O{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return u`
      <span
        part="base"
        class=${M({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?u` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Ut.styles=[P,Ys];Ut.dependencies={"sl-icon":W};a([T()],Ut.prototype,"checked",2);a([T()],Ut.prototype,"hasFocus",2);a([d()],Ut.prototype,"value",2);a([d({reflect:true})],Ut.prototype,"size",2);a([d({type:Boolean,reflect:true})],Ut.prototype,"disabled",2);a([I("checked")],Ut.prototype,"handleCheckedChange",1);a([I("disabled",{waitUntilFirstUpdate:true})],Ut.prototype,"handleDisabledChange",1);Ut.define("sl-radio");var Xs=w`
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
`;var Qs=w`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var ye=class extends O{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let i=$i(t.target);i?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let i=$i(t.target);i?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let i=$i(t.target);i?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let i=$i(t.target);i?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(i=>{let e=t.indexOf(i),o=$i(i);o&&(o.toggleAttribute("data-sl-button-group__button",true),o.toggleAttribute("data-sl-button-group__button--first",e===0),o.toggleAttribute("data-sl-button-group__button--inner",e>0&&e<t.length-1),o.toggleAttribute("data-sl-button-group__button--last",e===t.length-1),o.toggleAttribute("data-sl-button-group__button--radio",o.tagName.toLowerCase()==="sl-radio-button"));});}render(){return u`
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
    `}};ye.styles=[P,Qs];a([A("slot")],ye.prototype,"defaultSlot",2);a([T()],ye.prototype,"disableRole",2);a([d()],ye.prototype,"label",2);function $i(t){var i;let e="sl-button, sl-radio-button";return (i=t.closest(e))!=null?i:t.querySelector(e)}var pt=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this),this.hasSlotController=new nt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Fs:t?Hs:Qe}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let i=t.target.closest("sl-radio, sl-radio-button"),e=this.getAllRadios(),o=this.value;!i||i.disabled||(this.value=i.value,e.forEach(r=>r.checked=r===i),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var i;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let e=this.getAllRadios().filter(c=>!c.disabled),o=(i=e.find(c=>c.checked))!=null?i:e[0],r=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=e.indexOf(o)+r;n<0&&(n=e.length-1),n>e.length-1&&(n=0),this.getAllRadios().forEach(c=>{c.checked=false,this.hasButtonGroup||c.setAttribute("tabindex","-1");}),this.value=e[n].value,e[n].checked=true,this.hasButtonGroup?e[n].shadowRoot.querySelector("button").focus():(e[n].setAttribute("tabindex","0"),e[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,i;let e=this.getAllRadios();if(await Promise.all(e.map(async o=>{await o.updateComplete,o.checked=o.value===this.value,o.size=this.size;})),this.hasButtonGroup=e.some(o=>o.tagName.toLowerCase()==="sl-radio-button"),e.length>0&&!e.some(o=>o.checked))if(this.hasButtonGroup){let o=(t=e[0].shadowRoot)==null?void 0:t.querySelector("button");o&&o.setAttribute("tabindex","0");}else e[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let o=(i=this.shadowRoot)==null?void 0:i.querySelector("sl-button-group");o&&(o.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(i=>i.checked=i.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,i=this.customValidityMessage!=="";return t||i?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let i=this.getAllRadios(),e=i.find(s=>s.checked),o=i.find(s=>!s.disabled),r=e||o;r&&r.focus(t);}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!i,r=u`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return u`
      <fieldset
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":e,"form-control--has-help-text":o})}
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
                  ${r}
                </sl-button-group>
              `:r}
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
    `}};pt.styles=[P,Ct,Xs];pt.dependencies={"sl-button-group":ye};a([A("slot:not([name])")],pt.prototype,"defaultSlot",2);a([A(".radio-group__validation-input")],pt.prototype,"validationInput",2);a([T()],pt.prototype,"hasButtonGroup",2);a([T()],pt.prototype,"errorMessage",2);a([T()],pt.prototype,"defaultValue",2);a([d()],pt.prototype,"label",2);a([d({attribute:"help-text"})],pt.prototype,"helpText",2);a([d()],pt.prototype,"name",2);a([d({reflect:true})],pt.prototype,"value",2);a([d({reflect:true})],pt.prototype,"size",2);a([d({reflect:true})],pt.prototype,"form",2);a([d({type:Boolean,reflect:true})],pt.prototype,"required",2);a([I("size",{waitUntilFirstUpdate:true})],pt.prototype,"handleSizeChange",1);a([I("value")],pt.prototype,"handleValueChange",1);pt.define("sl-radio-group");exports.AutoFieldRadio=class Si extends z{getInitialOptions(){return {card:false,select:[]}}renderOptionItemWithCard(i,e){if(this.options.card){let o=e.value||e.label,r=this.value===o;return u`<div class="card"
                style=${Z({width:this.options.itemWidth})}
                >
                    <div class="body ${r?"selected":""}">
                        <sl-icon  class="icon" name="settings"></sl-icon>
                        ${i}                    
                    </div>
            </div>`}else return i}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(i){let e=i.value||i.label;return u`<sl-radio 
            value="${e}"
            style=${Z({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
        >${i.label}<br/><span class="memo">${i.memo}</span></sl-radio>`}renderInput(){let i=this.options.select.map(e=>{let o={};return typeof e=="object"?Object.assign(o,e):Object.assign(o,{label:e}),o});return u`              
            <sl-radio-group 
                class="value"
                name=${this.name} 
                value="${this.value}"            
                size="${this.context.size}"            
                @sl-change=${this.onRadioChange.bind(this)}
            >
            ${i.map(e=>this.renderOptionItemWithCard(this.renderOptionItem(e),e))}
            </sl-radio-group> 
        `}};exports.AutoFieldRadio.styles=[z.styles,w`
        sl-radio-group::part(form-control-input) {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.2em;
        }
        sl-radio{            
            position: relative;
            & .memo{
                color: var(--sl-color-gray-500);
                font-size: 0.8em;
                max-height: 2.2em; 
                overflow: hidden;
                display: -webkit-box;
                margin-top:2px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }            
            
        }
        sl-radio::part(label){
            margin-right: 1em;            
        }
        .card{      
            padding: calc(var(--auto-spacing) * 0.3);
            box-sizing: border-box;                                    
            &>.body{
                display: flex;
                flex-direction: row;
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
                padding: var(--auto-spacing);
                box-sizing: border-box; 
                position: relative;                          
                &:hover{
                    outline: 1px solid var(--sl-color-primary-500);
                } 
                & > sl-radio{
                    flex-grow: 1;
                }
                & sl-radio::part(control){                    
                    display: none;
                }
                & sl-radio::part(label){                    
                    padding-right: 0px;
                    margin-right: 0px;
                }
                &.selected{
                    border: 1px solid var(--sl-color-primary-500);
                    background-color: var(--sl-color-primary-50);
                }
                &.selected:before{
                    content: ' ';
                    position: absolute;
                    left: calc(100% - 24px);
                    top:0px;
                    width: 24px;
                    height:24px;
                    box-sizing: border-box;
                    border: 12px solid transparent;
                    border-top-color: var(--sl-color-primary-500);
                    border-right-color: var(--sl-color-primary-500);
                }     
                &.selected:after{
                    content: ' ';
                    position: absolute;
                    left: calc(100% - 12px);
                    top:2px;
                    width: 10px;
                    height:6px;
                    box-sizing: border-box;
                    border: 2px solid transparent;
                    border-left-color: white;
                    border-bottom-color: white;
                    transform: rotate(-45deg);
                }  
                sl-icon.icon{
                    flex-shrink: 0;
                    color: var(--sl-color-gray-500);
                    padding-top: 0px;
                    padding-left: 0px;                    
                    font-size: calc(2 * var(--auto-font-size));
                }
            }             
        }
    `],exports.AutoFieldRadio=x([R("auto-field-radio")],exports.AutoFieldRadio);var Js=w`
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
`;var q=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,i,e="none"){this.input.setSelectionRange(t,i,e);}setRangeText(t,i,e,o="preserve"){let r=i??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,r,s,o),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!i;return u`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":o})}
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
            class=${M({textarea:true,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${C(this.name)}
              .value=${Ot(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${C(this.placeholder)}
              rows=${C(this.rows)}
              minlength=${C(this.minlength)}
              maxlength=${C(this.maxlength)}
              autocapitalize=${C(this.autocapitalize)}
              autocorrect=${C(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${C(this.spellcheck)}
              enterkeyhint=${C(this.enterkeyhint)}
              inputmode=${C(this.inputmode)}
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
    `}};q.styles=[P,Ct,Js];a([A(".textarea__control")],q.prototype,"input",2);a([A(".textarea__size-adjuster")],q.prototype,"sizeAdjuster",2);a([T()],q.prototype,"hasFocus",2);a([d()],q.prototype,"title",2);a([d()],q.prototype,"name",2);a([d()],q.prototype,"value",2);a([d({reflect:true})],q.prototype,"size",2);a([d({type:Boolean,reflect:true})],q.prototype,"filled",2);a([d()],q.prototype,"label",2);a([d({attribute:"help-text"})],q.prototype,"helpText",2);a([d()],q.prototype,"placeholder",2);a([d({type:Number})],q.prototype,"rows",2);a([d()],q.prototype,"resize",2);a([d({type:Boolean,reflect:true})],q.prototype,"disabled",2);a([d({type:Boolean,reflect:true})],q.prototype,"readonly",2);a([d({reflect:true})],q.prototype,"form",2);a([d({type:Boolean,reflect:true})],q.prototype,"required",2);a([d({type:Number})],q.prototype,"minlength",2);a([d({type:Number})],q.prototype,"maxlength",2);a([d()],q.prototype,"autocapitalize",2);a([d()],q.prototype,"autocorrect",2);a([d()],q.prototype,"autocomplete",2);a([d({type:Boolean})],q.prototype,"autofocus",2);a([d()],q.prototype,"enterkeyhint",2);a([d({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],q.prototype,"spellcheck",2);a([d()],q.prototype,"inputmode",2);a([Vt()],q.prototype,"defaultValue",2);a([I("disabled",{waitUntilFirstUpdate:true})],q.prototype,"handleDisabledChange",1);a([I("rows",{waitUntilFirstUpdate:true})],q.prototype,"handleRowsChange",1);a([I("value",{waitUntilFirstUpdate:true})],q.prototype,"handleValueChange",1);q.define("sl-textarea");exports.AutoFieldTextArea=class xo extends z{renderInput(){return u`              
        <sl-textarea 
            name=${this.name} 
            data-path = ${this.path}
            value=${this.value} 
            placeholder="${C(this.options.placeholder)}"
            .minlength=${this.options.minLength}
            .maxlength=${this.options.maxLength}
            .autocorrect=${this.options.autocorrect}
            .autocomplete=${this.options.autocomplete}
            ?autofocus=${this.options.autofocus}
            ?disabled=${!this.options.enable}                
            .rows=${this.options.rows}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.value}</sl-textarea> 
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea=x([R("auto-field-textarea")],exports.AutoFieldTextArea);var Zs=w`
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
`;var ft=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,i)=>t.checked=i}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),i=this.helpText?true:!!t;return u`
      <div
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":i})}
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
            value=${C(this.value)}
            .checked=${Ot(this.checked)}
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
    `}};ft.styles=[P,Ct,Zs];a([A('input[type="checkbox"]')],ft.prototype,"input",2);a([T()],ft.prototype,"hasFocus",2);a([d()],ft.prototype,"title",2);a([d()],ft.prototype,"name",2);a([d()],ft.prototype,"value",2);a([d({reflect:true})],ft.prototype,"size",2);a([d({type:Boolean,reflect:true})],ft.prototype,"disabled",2);a([d({type:Boolean,reflect:true})],ft.prototype,"checked",2);a([Vt("checked")],ft.prototype,"defaultChecked",2);a([d({reflect:true})],ft.prototype,"form",2);a([d({type:Boolean,reflect:true})],ft.prototype,"required",2);a([d({attribute:"help-text"})],ft.prototype,"helpText",2);a([I("checked",{waitUntilFirstUpdate:true})],ft.prototype,"handleCheckedChange",1);a([I("disabled",{waitUntilFirstUpdate:true})],ft.prototype,"handleDisabledChange",1);ft.define("sl-switch");exports.AutoFieldSwitch=class Ei extends z{renderInput(){return u`              
        <sl-switch 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value="${this.options.switchValues[0]}"   
            .checked =${this._isChecked()}    
            size="${C(this.context.size)}"    
            placeholder="${C(this.options.placeholder)}"
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.getCheckLabel()}</sl-switch> 
        `}getCheckLabel(){return this.options.checkLabel?this.options.checkLabel:typeof this.value=="boolean"?"":this.options.switchValues[this.value===this.options.switchValues[0]?0:1]}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return u`        
        <sl-switch 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-switch> 
        `}};exports.AutoFieldSwitch.styles=[z.styles,w`
            sl-switch.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=x([R("auto-field-switch")],exports.AutoFieldSwitch);var wo=w`
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
`;var tn=w`
  ${wo}

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
`;var on=Symbol.for(""),hl=t=>{if(t?.r===on)return t?._$litStatic$};var Je=(t,...i)=>({_$litStatic$:i.reduce((e,o,r)=>e+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[r+1],t[0]),r:on}),en=new Map,_r=t=>(i,...e)=>{let o=e.length,r,s,n=[],c=[],l,p=0,f=false;for(;p<o;){for(l=i[p];p<o&&(s=e[p],(r=hl(s))!==void 0);)l+=r+i[++p],f=true;p!==o&&c.push(s),n.push(l),p++;}if(p===o&&n.push(i[o]),f){let h=n.join("$$lit$$");(i=en.get(h))===void 0&&(n.raw=n,en.set(h,i=n)),e=c;}return t(i,...e)},xe=_r(u);var Dt=class extends O{constructor(){super(...arguments),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return xe`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${M({button:true,"button--default":true,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":true,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${C(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Dt.styles=[P,tn];a([A(".button")],Dt.prototype,"input",2);a([A(".hidden-input")],Dt.prototype,"hiddenInput",2);a([T()],Dt.prototype,"hasFocus",2);a([d({type:Boolean,reflect:true})],Dt.prototype,"checked",2);a([d()],Dt.prototype,"value",2);a([d({type:Boolean,reflect:true})],Dt.prototype,"disabled",2);a([d({reflect:true})],Dt.prototype,"size",2);a([d({type:Boolean,reflect:true})],Dt.prototype,"pill",2);a([I("disabled",{waitUntilFirstUpdate:true})],Dt.prototype,"handleDisabledChange",1);Dt.define("sl-radio-button");exports.AutoFieldRadioButton=class Ai extends z{renderInput(){let i=this.getOptionValue("select",[]).map((e,o)=>{let r={};return typeof e=="object"?Object.assign(r,e):Object.assign(r,{label:e,value:o+1}),r});return u`              
        <sl-radio-group 
            name=${this.name} 
            data-path=${this.path} 
            value="${this.value}"            
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
        ${i.map(e=>u`<sl-radio-button
            value="${e.value}"
            ?disabled =${!this.options.enable}
        >${e.label}</sl-radio-button>`)}
        </sl-radio-group> 
        `}};exports.AutoFieldRadioButton.styles=[z.styles,w`
        sl-radio-group::part(form-control-input) {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.2em;
        }
        sl-radio{
            margin-right: 1em;
            padding: 0.2em;
        }
    `],exports.AutoFieldRadioButton=x([R("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class _o extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=x([R("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class ko extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=x([R("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class Co extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=x([R("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldEmail=class $o extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}};exports.AutoFieldEmail=x([R("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class So extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=x([R("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class Eo extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=x([R("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class Ao extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=x([R("auto-field-phone")],exports.AutoFieldPhone);var To=class{constructor(i,e){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=i,this.options={...this.options,...e},i.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(i){let e=i.target;if(this.isPreviewActive){this.closePreview();return}e.matches(this.options.selector)&&(i.preventDefault(),i.stopPropagation(),this.originalImage=e,this.showPreview(this.originalImage));}showPreview(i){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let e=this.options.overlayColor,o=this.hexToRgb(e);this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=i.src,this.previewImage.alt=i.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let r=i.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${r.top}px`,this.previewImage.style.left=`${r.left}px`,this.previewImage.style.width=`${r.width}px`,this.previewImage.style.height=`${r.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",h=>{h.stopPropagation();}),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:c,height:l}=this.calculateAspectRatioFit(i.naturalWidth,i.naturalHeight,s*.9,n*.9),p=(n-l)/2,f=(s-c)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${p}px`,this.previewImage.style.left=`${f}px`,this.previewImage.style.width=`${c}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let i=window.innerWidth,e=window.innerHeight,{width:o,height:r}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,i*.9,e*.9),s=(e-r)/2,n=(i-o)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${o}px`,this.previewImage.style.height=`${r}px`);});}handleKeydown(i){i.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let i=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`;});let e=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${e.r}, ${e.g}, ${e.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(i,e,o,r){if(i<=o&&e<=r)return {width:i,height:e};let s=Math.min(o/i,r/e);return {width:i*s,height:e*s}}hexToRgb(i){i=i.replace(/^#/,""),i.length===3&&(i=i.split("").map(s=>s+s).join(""));let e=parseInt(i.substring(0,2),16),o=parseInt(i.substring(2,4),16),r=parseInt(i.substring(4,6),16);return {r:isNaN(e)?0:e,g:isNaN(o)?0:o,b:isNaN(r)?0:r}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var dl=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],pl=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function ul(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return dl.includes(`.${o}`)}function ml(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return pl.includes(`.${o}`)}exports.AutoFieldUpload=class Ze extends z{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new To(this);}retryUpload(e){this.startUpload(e.file,e.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto"}}_getDefaultFileLabel(e){return typeof e=="string"?e:e.title||e.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(e=>e!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(e){let o=e.target;if(!o.files||o.files.length===0)return;Array.from(o.files).forEach(s=>this.uploadFile(s)),o.value="";}handleDragOver(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(e){if(e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!e.dataTransfer?.files)return;let r=Array.from(e.dataTransfer.files);if(!this.options?.multiple&&r.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=r.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(c=>c==="*"?true:c.startsWith(".")?n.name.toLowerCase().endsWith(c.toLowerCase()):n.type.startsWith(c)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}r.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(e){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let o={id:this.generateId(),file:e,progress:0,status:"uploading",value:{url:e.name}};return this.files.push(o),this.startUpload(e,o.id)}_updateFileRecord(e,o){let r=this.files.findIndex(s=>s.id===e);r!==-1&&(this.files=[...this.files.slice(0,r),{...this.files[r],...o},...this.files.slice(r+1)]);}_getResponseError(e){let o="\u4E0A\u4F20\u5931\u8D25";try{let r=JSON.parse(e.responseText);o=r.message||r.error||o;}catch{switch(e.status){case 400:o="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:o="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:o="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:o="\u6587\u4EF6\u592A\u5927";break;case 415:o="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:o="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:o="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:o=`\u4E0A\u4F20\u5931\u8D25 (${e.status})`;}}return new Error(o)}_defaultFileResolver(e){if(typeof e=="string")return e;if(typeof e=="object"){if(!e.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return e}}_parseUploadResponse(e){let o={};try{Object.assign(o,JSON.parse(e));}catch{o=e;}return typeof this.options.onResolve=="function"&&(o=this.options.onResolve(o)),o}async startUpload(e,o){let r=this.files.findIndex(n=>n.id===o);if(r===-1)return;let s=this.files[r];return new Promise((n,c)=>{let l=new XMLHttpRequest,p=new FormData;p.append(this.options.fileFieldName,e),l.upload.onprogress=f=>{if(f.lengthComputable){let h=Math.round(f.loaded/f.total*100);this._updateFileRecord(o,{progress:h});}},l.onload=()=>{if(this.files.findIndex(h=>h.id===o)!==-1)if(l.status>=200&&l.status<300){this._updateFileRecord(o,{status:"done"});try{let h=this._parseUploadResponse(l.responseText);this._updateFileRecord(o,{value:h}),s.status="done",this.onFieldChange(),n();}catch{let h=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(o,h),c(h);}}else {let h=this._getResponseError(l);this.handleUploadError(o,h),c(h);}},l.onerror=()=>{if(this.files.findIndex(m=>m.id===o)===-1)return;let h=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(o,h),c(h);},l.ontimeout=()=>{if(this.files.findIndex(m=>m.id===o)===-1)return;let h=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(o,h),c(h);},l.open("POST",this.options.url),this._updateFileRecord(o,{progress:0,status:"uploading"}),l.send(p);})}handleUploadError(e,o){this._updateFileRecord(e,{error:o.message,status:"error"});}deleteFile(e){let o=this.files.findIndex(c=>c.id===e);if(o===-1)return;let r=this.files[o],s=r.status==="uploading"||r.status==="error",n=()=>{this.files=[...this.files.slice(0,o),...this.files.slice(o+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,r.value)).then(()=>{n(),this.onFieldChange();}).catch(c=>{alert(c.message);}):(n(),this.onFieldChange());}getInputValue(){return this.options.multiple?this.files.map(e=>e.value):this.files.length>0?this.files[0].value:void 0}getStateValue(){let e=super.getStateValue();return Array.isArray(e)||(e=[e]),this.files=e.map((o,r)=>{let s={id:String(r),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof o=="string"?s.value=o:typeof o=="object"&&(s.value=Object.assign({},s.value,o)),s}),e}renderProgressbar(e,o){if(e.status!=="uploading")return;let r=o==="hori"?`width:${e.progress}%;`:`height:${e.progress}%;top:${100-e.progress}%`;return u`<span 
            class="uploading progressbar ${M({hori:o==="hori",vert:o==="vert"})}"
            style="${r}"
        >
            <span class="value">${e.progress}%</span>
        </span>
        `}renderFileContent(e){if(e.error)return;let o=typeof e.value=="string"?e.value:e.value.url,r;if(ul(o))r=u`
                <img class="content" src="${o}"/>
            `;else if(ml(o))r=u`
                <video class="content" src="${o}"></video>
            `;else {let s=o.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,r=u`<div class="content">${s}</div>`;}return r}renderFilePreview(e){let o=!!e.error,r=typeof this.options.preview=="boolean"?"80px":this.options.preview;return u`
            <div class="file preview ${M({error:o})}"
                title=${e.error||this.options.onFileLabel(e.value)}
                style="${Z({width:r,height:r})}"
            >   ${this.renderFileContent(e)}
                ${this.renderProgressbar(e,"vert")}
                ${Q(e.status==="error",()=>u`<div class="error" title="${e.error}">
                        <span>上传出错</span>
                        <span>
                            <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(e.id)}></sl-icon>    
                            <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>
                        </span>
                    </div>`,()=>{if(!this.context.viewonly)return u`<sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>`})}                               
            </div> 
        `}renderFile(e){let o=!!e.error;return u`
            <magic-flex class="file default ${M({error:o})}" wrap align="center" gap="0.5rem"
                title=${C(e.error)}
            > 
                ${this.renderProgressbar(e,"hori")}
                <span class="label">${this.options.onFileLabel(e.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                ${Q(e.status==="error",()=>u`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>`)}                               
            </magic-flex> 
        `}renderFiels(){return u`<magic-flex class="files" grow='none' gap="0.5rem" wrap>
            ${Q(this.files.length>0,()=>yt(this.files,e=>this.options.preview?this.renderFilePreview(e):this.renderFile(e)),()=>u`<span class='placeholder'>${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </magic-flex>`}renderInput(){return u`
            <magic-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${Q(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>u`<div class="indicator"
                            @click=${this.handleUploadClick}
                            @dragover=${this.handleDragOver}
                            @dragleave=${this.handleDragLeave}
                            @drop=${this.handleDrop}>
                            ${this.options.tips}
                        </div>`)}                
                <magic-flex class="actions" align="center" grow=".actions.after" gap="0.5rem" >
                    ${Q(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>u`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}                    
                    ${this.renderActions(false)}  
                </magic-flex>
            </magic-flex>
        `}renderView(){return this.renderFiels()}};exports.AutoFieldUpload.styles=[z.styles,w`
            .value { 
                  
                    & magic-flex.files{
                        position: relative;
                        padding:  0px ;
                        &>.file.default{                                
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 0.5rem;                        
                            border: var(--auto-border);
                            border-radius: var(--auto-border-radius);
                            background-color: var(--auto-workspace-color);
                            &>[name=remove]{
                                cursor: pointer;
                                &:hover{
                                    color: var(--auto-theme-color);
                                }                                
                            }
                            &.error{
                                border: 1px solid red;
                                background-color: #ff006221;  
                                border-radius: var(--auto-border-radius);
                                color:red;
                            }
                            &>sl-icon{
                                cursor: pointer;                                
                                &:hover{
                                    color: var(--auto-theme-color);
                                }
                            } 
                        } 
                        &>.file.preview{
                            position: relative;
                            display: flex;                        
                            border: var(--auto-border);
                            border-radius: var(--auto-border-radius);
                            background-color: var(--auto-workspace-color);
                            align-items: 0px;                            
                            &.error{
                                border: 1px solid red;
                                background-color: #ff006221;  
                                border-radius: var(--auto-border-radius);
                                color:red;
                                &>.error{
                                    position: absolute;
                                    top:0px;
                                    left:0px;
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    flex-direction: column;
                                    font-size: 0.8rem; 
                                    &>*{
                                        padding: 4px 0px;
                                        cursor: pointer;
                                    }
                                    &>:last-child{
                                        font-size: 1rem;
                                    }
                                }
                            }
                            &>img.content,video.content,.content{
                                width: 100%;
                                flex-grow: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: var(--auto-border-color);                            
                                &.img{
                                    object-fit: cover;
                                }
                            }
                            &>sl-icon[name=remove]{
                                width: 16px;
                                height: 16px;
                                position: absolute;
                                display: none;
                                left: calc(100% - 8px);
                                top:-8px;
                                background-color: white;                                
                                border-radius: 8px;
                                cursor: pointer;
                                color:red;
                                z-index: 9;
                                &:hover{
                                    color: var(--auto-theme-color);
                                }
                            }
                            &:hover>sl-icon[name=remove]{
                                display: block;
                            } 
                        }
                    } 
            }
            :host::part(after-actions){
                text-align:right;
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
            .placeholder{
                border-radius: var(--auto-border-radius);
                padding: 0.5rem;
                color: var(--auto-gray-color);
                width: 100%;

            }
            .uploading.progressbar{
                position: absolute;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: var(--auto-border-radius);
                color: white;                    
                display: flex;
                align-items: center; 
                justify-content: center;
                text-align: center;
                z-index: 1;
                &.hori{
                    left:0px;
                    top:0px;
                    width: 0px;
                    height:100%;
                }
                &.vert{
                    left:0px;
                    bottom:100%;                    
                    width: 100%;
                    height:0px;
                }
            }
 
        `],x([T()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=x([R("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class Io extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=x([R("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class Ti extends z{getInitialOptions(){return {size:"medium"}}_onPartFocus(i){i.target.select();}_getIpBits(){let i=this.value?.split(".");return [parseInt(i[0]||"0"),parseInt(i[1]||"0"),parseInt(i[2]||"0"),parseInt(i[3]||"0")]}_onIpChange(i,e){this.onFieldChange(),this._isLastInput(e);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(e=>e.value).join(".")}_isLastInput(i){let e=i.target;if(e.value.length>=3){e.blur();let o=e.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(i){i.preventDefault();let e=i.target,o=i.clipboardData?.getData("text/plain")||"",r=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=o.match(r);if(!s)return;let n=[],c=e;for(let l=0;l<4&&c;l++)c.tagName==="SL-INPUT"&&n.push(c),c=c.nextElementSibling?.nextElementSibling;for(let l=0;l<Math.min(4,n.length);l++)n[l].value=s[l+1],n[l].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let l=n[Math.min(3,n.length-1)];l.focus(),l.select();}}renderInput(){return u`
            <magic-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((i,e)=>u`
                    <sl-input 
                        value="${i}" 
                        name=${this.name} 
                        data-path = ${this.path}
                        defaultValue='0' 
                        size=${this.context.size}
                        maxLength="3"
                        minLength="1"
                        max="255"
                        min="0"
                        @sl-input=${o=>this._onIpChange(e,o)}
                        @sl-change=${o=>this._onIpChange(e,o)} 
                        @sl-focus=${this._onPartFocus.bind(this)}
                        @paste=${o=>this._onPaste(o)}
                    ></sl-input>
                    ${e<3?u`<span class="dot">.</span>`:""}                    
                `)} 
            </magic-flex>
        `}};exports.AutoFieldIpAddress.styles=[z.styles,w` 
            span.dot{
                width:1em;                     
                text-align: center;   
                font-weight: bold;
                margin-top: 0.8rem;                
            }
            sl-input::part(base){
                border: none;
            }
            magic-flex{
                width:15rem;
                justify-content: space-around;
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
            }
            sl-input{
                width: 3rem;
            }
            sl-input::part(input){
                text-align: center; 
                padding: 0px 2px ;
                padding-inline: 0px;
                letter-spacing: var(--sl-letter-spacing-denser);
            }
    `],exports.AutoFieldIpAddress=x([R("auto-field-ipaddress")],exports.AutoFieldIpAddress);var rn=w`
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
`;var sn=w`
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
`;var St=class extends O{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,i=t?Je`a`:Je`button`;return xe`
      <${i}
        part="base"
        class=${M({"icon-button":true,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${C(t?void 0:this.disabled)}
        type=${C(t?void 0:"button")}
        href=${C(t?this.href:void 0)}
        target=${C(t?this.target:void 0)}
        download=${C(t?this.download:void 0)}
        rel=${C(t&&this.target?"noreferrer noopener":void 0)}
        role=${C(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${C(this.name)}
          library=${C(this.library)}
          src=${C(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${i}>
    `}};St.styles=[P,sn];St.dependencies={"sl-icon":W};a([A(".icon-button")],St.prototype,"button",2);a([T()],St.prototype,"hasFocus",2);a([d()],St.prototype,"name",2);a([d()],St.prototype,"library",2);a([d()],St.prototype,"src",2);a([d()],St.prototype,"href",2);a([d()],St.prototype,"target",2);a([d()],St.prototype,"download",2);a([d()],St.prototype,"label",2);a([d({type:Boolean,reflect:true})],St.prototype,"disabled",2);var kr=new Set,ti=new Map,ze,Cr="ltr",$r="en",nn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(nn){let t=new MutationObserver(an);Cr=document.documentElement.dir||"ltr",$r=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function Ii(...t){t.map(i=>{let e=i.$code.toLowerCase();ti.has(e)?ti.set(e,Object.assign(Object.assign({},ti.get(e)),i)):ti.set(e,i),ze||(ze=i);}),an();}function an(){nn&&(Cr=document.documentElement.dir||"ltr",$r=document.documentElement.lang||navigator.language),[...kr.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var zo=class{constructor(i){this.host=i,this.host.addController(this);}hostConnected(){kr.add(this.host);}hostDisconnected(){kr.delete(this.host);}dir(){return `${this.host.dir||Cr}`.toLowerCase()}lang(){return `${this.host.lang||$r}`.toLowerCase()}getTranslationData(i){var e,o;let r=new Intl.Locale(i.replace(/_/g,"-")),s=r?.language.toLowerCase(),n=(o=(e=r?.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&o!==void 0?o:"",c=ti.get(`${s}-${n}`),l=ti.get(s);return {locale:r,language:s,region:n,primary:c,secondary:l}}exists(i,e){var o;let{primary:r,secondary:s}=this.getTranslationData((o=e.lang)!==null&&o!==void 0?o:this.lang());return e=Object.assign({includeFallback:false},e),!!(r&&r[i]||s&&s[i]||e.includeFallback&&ze&&ze[i])}term(i,...e){let{primary:o,secondary:r}=this.getTranslationData(this.lang()),s;if(o&&o[i])s=o[i];else if(r&&r[i])s=r[i];else if(ze&&ze[i])s=ze[i];else return console.error(`No translation found for: ${String(i)}`),String(i);return typeof s=="function"?s(...e):s}date(i,e){return i=new Date(i),new Intl.DateTimeFormat(this.lang(),e).format(i)}number(i,e){return i=Number(i),isNaN(i)?"":new Intl.NumberFormat(this.lang(),e).format(i)}relativeTime(i,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(i,e)}};var ln={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,i)=>`Go to slide ${t} of ${i}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Ii(ln);var cn=ln;var G=class extends zo{};Ii(cn);var Yt=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return u`
      <span
        part="base"
        class=${M({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
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
    `}};Yt.styles=[P,rn];Yt.dependencies={"sl-icon-button":St};a([d({reflect:true})],Yt.prototype,"variant",2);a([d({reflect:true})],Yt.prototype,"size",2);a([d({type:Boolean,reflect:true})],Yt.prototype,"pill",2);a([d({type:Boolean})],Yt.prototype,"removable",2);var hn=w`
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
`;function fl(t,i){return {top:Math.round(t.getBoundingClientRect().top-i.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-i.getBoundingClientRect().left)}}function dn(t,i,e="vertical",o="smooth"){let r=fl(t,i),s=r.top+i.scrollTop,n=r.left+i.scrollLeft,c=i.scrollLeft,l=i.scrollLeft+i.offsetWidth,p=i.scrollTop,f=i.scrollTop+i.offsetHeight;(e==="horizontal"||e==="both")&&(n<c?i.scrollTo({left:n,behavior:o}):n+t.clientWidth>l&&i.scrollTo({left:n-i.offsetWidth+t.clientWidth,behavior:o})),(e==="vertical"||e==="both")&&(s<p?i.scrollTo({top:s,behavior:o}):s+t.clientHeight>f&&i.scrollTo({top:s-i.offsetHeight+t.clientHeight,behavior:o}));}var pn=w`
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
`;var Xt=Math.min,wt=Math.max,Ri=Math.round,Oi=Math.floor,qt=t=>({x:t,y:t}),gl={left:"right",right:"left",bottom:"top",top:"bottom"},bl={start:"end",end:"start"};function Oo(t,i,e){return wt(t,Xt(i,e))}function Re(t,i){return typeof t=="function"?t(i):t}function ee(t){return t.split("-")[0]}function Oe(t){return t.split("-")[1]}function Sr(t){return t==="x"?"y":"x"}function Lo(t){return t==="y"?"height":"width"}function ie(t){return ["top","bottom"].includes(ee(t))?"y":"x"}function Mo(t){return Sr(ie(t))}function un(t,i,e){e===void 0&&(e=false);let o=Oe(t),r=Mo(t),s=Lo(r),n=r==="x"?o===(e?"end":"start")?"right":"left":o==="start"?"bottom":"top";return i.reference[s]>i.floating[s]&&(n=zi(n)),[n,zi(n)]}function mn(t){let i=zi(t);return [Ro(t),i,Ro(i)]}function Ro(t){return t.replace(/start|end/g,i=>bl[i])}function vl(t,i,e){let o=["left","right"],r=["right","left"],s=["top","bottom"],n=["bottom","top"];switch(t){case "top":case "bottom":return e?i?r:o:i?o:r;case "left":case "right":return i?s:n;default:return []}}function fn(t,i,e,o){let r=Oe(t),s=vl(ee(t),e==="start",o);return r&&(s=s.map(n=>n+"-"+r),i&&(s=s.concat(s.map(Ro)))),s}function zi(t){return t.replace(/left|right|bottom|top/g,i=>gl[i])}function yl(t){return {top:0,right:0,bottom:0,left:0,...t}}function Er(t){return typeof t!="number"?yl(t):{top:t,right:t,bottom:t,left:t}}function Le(t){let{x:i,y:e,width:o,height:r}=t;return {width:o,height:r,top:e,left:i,right:i+o,bottom:e+r,x:i,y:e}}function gn(t,i,e){let{reference:o,floating:r}=t,s=ie(i),n=Mo(i),c=Lo(n),l=ee(i),p=s==="y",f=o.x+o.width/2-r.width/2,h=o.y+o.height/2-r.height/2,m=o[c]/2-r[c]/2,g;switch(l){case "top":g={x:f,y:o.y-r.height};break;case "bottom":g={x:f,y:o.y+o.height};break;case "right":g={x:o.x+o.width,y:h};break;case "left":g={x:o.x-r.width,y:h};break;default:g={x:o.x,y:o.y};}switch(Oe(i)){case "start":g[n]-=m*(e&&p?-1:1);break;case "end":g[n]+=m*(e&&p?-1:1);break}return g}var bn=async(t,i,e)=>{let{placement:o="bottom",strategy:r="absolute",middleware:s=[],platform:n}=e,c=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(i)),p=await n.getElementRects({reference:t,floating:i,strategy:r}),{x:f,y:h}=gn(p,o,l),m=o,g={},b=0;for(let v=0;v<c.length;v++){let{name:E,fn:$}=c[v],{x:_,y:S,data:y,reset:k}=await $({x:f,y:h,initialPlacement:o,placement:m,strategy:r,middlewareData:g,rects:p,platform:n,elements:{reference:t,floating:i}});f=_??f,h=S??h,g={...g,[E]:{...g[E],...y}},k&&b<=50&&(b++,typeof k=="object"&&(k.placement&&(m=k.placement),k.rects&&(p=k.rects===true?await n.getElementRects({reference:t,floating:i,strategy:r}):k.rects),{x:f,y:h}=gn(p,m,l)),v=-1);}return {x:f,y:h,placement:m,strategy:r,middlewareData:g}};async function Po(t,i){var e;i===void 0&&(i={});let{x:o,y:r,platform:s,rects:n,elements:c,strategy:l}=t,{boundary:p="clippingAncestors",rootBoundary:f="viewport",elementContext:h="floating",altBoundary:m=false,padding:g=0}=Re(i,t),b=Er(g),E=c[m?h==="floating"?"reference":"floating":h],$=Le(await s.getClippingRect({element:(e=await(s.isElement==null?void 0:s.isElement(E)))==null||e?E:E.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:f,strategy:l})),_=h==="floating"?{x:o,y:r,width:n.floating.width,height:n.floating.height}:n.reference,S=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),y=await(s.isElement==null?void 0:s.isElement(S))?await(s.getScale==null?void 0:s.getScale(S))||{x:1,y:1}:{x:1,y:1},k=Le(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:_,offsetParent:S,strategy:l}):_);return {top:($.top-k.top+b.top)/y.y,bottom:(k.bottom-$.bottom+b.bottom)/y.y,left:($.left-k.left+b.left)/y.x,right:(k.right-$.right+b.right)/y.x}}var vn=t=>({name:"arrow",options:t,async fn(i){let{x:e,y:o,placement:r,rects:s,platform:n,elements:c,middlewareData:l}=i,{element:p,padding:f=0}=Re(t,i)||{};if(p==null)return {};let h=Er(f),m={x:e,y:o},g=Mo(r),b=Lo(g),v=await n.getDimensions(p),E=g==="y",$=E?"top":"left",_=E?"bottom":"right",S=E?"clientHeight":"clientWidth",y=s.reference[b]+s.reference[g]-m[g]-s.floating[b],k=m[g]-s.reference[g],V=await(n.getOffsetParent==null?void 0:n.getOffsetParent(p)),F=V?V[S]:0;(!F||!await(n.isElement==null?void 0:n.isElement(V)))&&(F=c.floating[S]||s.floating[b]);let U=y/2-k/2,D=F/2-v[b]/2-1,L=Xt(h[$],D),lt=Xt(h[_],D),rt=L,bt=F-v[b]-lt,xt=F/2-v[b]/2+U,vt=Oo(rt,xt,bt),ce=!l.arrow&&Oe(r)!=null&&xt!==vt&&s.reference[b]/2-(xt<rt?L:lt)-v[b]/2<0,Qt=ce?xt<rt?xt-rt:xt-bt:0;return {[g]:m[g]+Qt,data:{[g]:vt,centerOffset:xt-vt-Qt,...ce&&{alignmentOffset:Qt}},reset:ce}}});var yn=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(i){var e,o;let{placement:r,middlewareData:s,rects:n,initialPlacement:c,platform:l,elements:p}=i,{mainAxis:f=true,crossAxis:h=true,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=true,...E}=Re(t,i);if((e=s.arrow)!=null&&e.alignmentOffset)return {};let $=ee(r),_=ie(c),S=ee(c)===c,y=await(l.isRTL==null?void 0:l.isRTL(p.floating)),k=m||(S||!v?[zi(c)]:mn(c)),V=b!=="none";!m&&V&&k.push(...fn(c,v,b,y));let F=[c,...k],U=await Po(i,E),D=[],L=((o=s.flip)==null?void 0:o.overflows)||[];if(f&&D.push(U[$]),h){let vt=un(r,n,y);D.push(U[vt[0]],U[vt[1]]);}if(L=[...L,{placement:r,overflows:D}],!D.every(vt=>vt<=0)){var lt,rt;let vt=(((lt=s.flip)==null?void 0:lt.index)||0)+1,ce=F[vt];if(ce){var bt;let he=h==="alignment"?_!==ie(ce):false,Kt=((bt=L[0])==null?void 0:bt.overflows[0])>0;if(!he||Kt)return {data:{index:vt,overflows:L},reset:{placement:ce}}}let Qt=(rt=L.filter(he=>he.overflows[0]<=0).sort((he,Kt)=>he.overflows[1]-Kt.overflows[1])[0])==null?void 0:rt.placement;if(!Qt)switch(g){case "bestFit":{var xt;let he=(xt=L.filter(Kt=>{if(V){let de=ie(Kt.placement);return de===_||de==="y"}return  true}).map(Kt=>[Kt.placement,Kt.overflows.filter(de=>de>0).reduce((de,Ta)=>de+Ta,0)]).sort((Kt,de)=>Kt[1]-de[1])[0])==null?void 0:xt[0];he&&(Qt=he);break}case "initialPlacement":Qt=c;break}if(r!==Qt)return {reset:{placement:Qt}}}return {}}}};async function xl(t,i){let{placement:e,platform:o,elements:r}=t,s=await(o.isRTL==null?void 0:o.isRTL(r.floating)),n=ee(e),c=Oe(e),l=ie(e)==="y",p=["left","top"].includes(n)?-1:1,f=s&&l?-1:1,h=Re(i,t),{mainAxis:m,crossAxis:g,alignmentAxis:b}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:h.mainAxis||0,crossAxis:h.crossAxis||0,alignmentAxis:h.alignmentAxis};return c&&typeof b=="number"&&(g=c==="end"?b*-1:b),l?{x:g*f,y:m*p}:{x:m*p,y:g*f}}var xn=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(i){var e,o;let{x:r,y:s,placement:n,middlewareData:c}=i,l=await xl(i,t);return n===((e=c.offset)==null?void 0:e.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:r+l.x,y:s+l.y,data:{...l,placement:n}}}}},wn=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(i){let{x:e,y:o,placement:r}=i,{mainAxis:s=true,crossAxis:n=false,limiter:c={fn:E=>{let{x:$,y:_}=E;return {x:$,y:_}}},...l}=Re(t,i),p={x:e,y:o},f=await Po(i,l),h=ie(ee(r)),m=Sr(h),g=p[m],b=p[h];if(s){let E=m==="y"?"top":"left",$=m==="y"?"bottom":"right",_=g+f[E],S=g-f[$];g=Oo(_,g,S);}if(n){let E=h==="y"?"top":"left",$=h==="y"?"bottom":"right",_=b+f[E],S=b-f[$];b=Oo(_,b,S);}let v=c.fn({...i,[m]:g,[h]:b});return {...v,data:{x:v.x-e,y:v.y-o,enabled:{[m]:s,[h]:n}}}}}};var _n=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(i){var e,o;let{placement:r,rects:s,platform:n,elements:c}=i,{apply:l=()=>{},...p}=Re(t,i),f=await Po(i,p),h=ee(r),m=Oe(r),g=ie(r)==="y",{width:b,height:v}=s.floating,E,$;h==="top"||h==="bottom"?(E=h,$=m===(await(n.isRTL==null?void 0:n.isRTL(c.floating))?"start":"end")?"left":"right"):($=h,E=m==="end"?"top":"bottom");let _=v-f.top-f.bottom,S=b-f.left-f.right,y=Xt(v-f[E],_),k=Xt(b-f[$],S),V=!i.middlewareData.shift,F=y,U=k;if((e=i.middlewareData.shift)!=null&&e.enabled.x&&(U=S),(o=i.middlewareData.shift)!=null&&o.enabled.y&&(F=_),V&&!m){let L=wt(f.left,0),lt=wt(f.right,0),rt=wt(f.top,0),bt=wt(f.bottom,0);g?U=b-2*(L!==0||lt!==0?L+lt:wt(f.left,f.right)):F=v-2*(rt!==0||bt!==0?rt+bt:wt(f.top,f.bottom));}await l({...i,availableWidth:U,availableHeight:F});let D=await n.getDimensions(c.floating);return b!==D.width||v!==D.height?{reset:{rects:true}}:{}}}};function Vo(){return typeof window<"u"}function Me(t){return Cn(t)?(t.nodeName||"").toLowerCase():"#document"}function Et(t){var i;return (t==null||(i=t.ownerDocument)==null?void 0:i.defaultView)||window}function Wt(t){var i;return (i=(Cn(t)?t.ownerDocument:t.document)||window.document)==null?void 0:i.documentElement}function Cn(t){return Vo()?t instanceof Node||t instanceof Et(t).Node:false}function Ht(t){return Vo()?t instanceof Element||t instanceof Et(t).Element:false}function jt(t){return Vo()?t instanceof HTMLElement||t instanceof Et(t).HTMLElement:false}function kn(t){return !Vo()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof Et(t).ShadowRoot}function ii(t){let{overflow:i,overflowX:e,overflowY:o,display:r}=Ft(t);return /auto|scroll|overlay|hidden|clip/.test(i+o+e)&&!["inline","contents"].includes(r)}function $n(t){return ["table","td","th"].includes(Me(t))}function Li(t){return [":popover-open",":modal"].some(i=>{try{return t.matches(i)}catch{return  false}})}function oi(t){let i=Do(),e=Ht(t)?Ft(t):t;return ["transform","translate","scale","rotate","perspective"].some(o=>e[o]?e[o]!=="none":false)||(e.containerType?e.containerType!=="normal":false)||!i&&(e.backdropFilter?e.backdropFilter!=="none":false)||!i&&(e.filter?e.filter!=="none":false)||["transform","translate","scale","rotate","perspective","filter"].some(o=>(e.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(e.contain||"").includes(o))}function Sn(t){let i=oe(t);for(;jt(i)&&!Pe(i);){if(oi(i))return i;if(Li(i))return null;i=oe(i);}return null}function Do(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}function Pe(t){return ["html","body","#document"].includes(Me(t))}function Ft(t){return Et(t).getComputedStyle(t)}function Mi(t){return Ht(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function oe(t){if(Me(t)==="html")return t;let i=t.assignedSlot||t.parentNode||kn(t)&&t.host||Wt(t);return kn(i)?i.host:i}function En(t){let i=oe(t);return Pe(i)?t.ownerDocument?t.ownerDocument.body:t.body:jt(i)&&ii(i)?i:En(i)}function ei(t,i,e){var o;i===void 0&&(i=[]),e===void 0&&(e=true);let r=En(t),s=r===((o=t.ownerDocument)==null?void 0:o.body),n=Et(r);if(s){let c=Ho(n);return i.concat(n,n.visualViewport||[],ii(r)?r:[],c&&e?ei(c):[])}return i.concat(r,ei(r,[],e))}function Ho(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function In(t){let i=Ft(t),e=parseFloat(i.width)||0,o=parseFloat(i.height)||0,r=jt(t),s=r?t.offsetWidth:e,n=r?t.offsetHeight:o,c=Ri(e)!==s||Ri(o)!==n;return c&&(e=s,o=n),{width:e,height:o,$:c}}function Tr(t){return Ht(t)?t:t.contextElement}function ri(t){let i=Tr(t);if(!jt(i))return qt(1);let e=i.getBoundingClientRect(),{width:o,height:r,$:s}=In(i),n=(s?Ri(e.width):e.width)/o,c=(s?Ri(e.height):e.height)/r;return (!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}var wl=qt(0);function zn(t){let i=Et(t);return !Do()||!i.visualViewport?wl:{x:i.visualViewport.offsetLeft,y:i.visualViewport.offsetTop}}function _l(t,i,e){return i===void 0&&(i=false),!e||i&&e!==Et(t)?false:i}function Ve(t,i,e,o){i===void 0&&(i=false),e===void 0&&(e=false);let r=t.getBoundingClientRect(),s=Tr(t),n=qt(1);i&&(o?Ht(o)&&(n=ri(o)):n=ri(t));let c=_l(s,e,o)?zn(s):qt(0),l=(r.left+c.x)/n.x,p=(r.top+c.y)/n.y,f=r.width/n.x,h=r.height/n.y;if(s){let m=Et(s),g=o&&Ht(o)?Et(o):o,b=m,v=Ho(b);for(;v&&o&&g!==b;){let E=ri(v),$=v.getBoundingClientRect(),_=Ft(v),S=$.left+(v.clientLeft+parseFloat(_.paddingLeft))*E.x,y=$.top+(v.clientTop+parseFloat(_.paddingTop))*E.y;l*=E.x,p*=E.y,f*=E.x,h*=E.y,l+=S,p+=y,b=Et(v),v=Ho(b);}}return Le({width:f,height:h,x:l,y:p})}function Ir(t,i){let e=Mi(t).scrollLeft;return i?i.left+e:Ve(Wt(t)).left+e}function Rn(t,i,e){e===void 0&&(e=false);let o=t.getBoundingClientRect(),r=o.left+i.scrollLeft-(e?0:Ir(t,o)),s=o.top+i.scrollTop;return {x:r,y:s}}function kl(t){let{elements:i,rect:e,offsetParent:o,strategy:r}=t,s=r==="fixed",n=Wt(o),c=i?Li(i.floating):false;if(o===n||c&&s)return e;let l={scrollLeft:0,scrollTop:0},p=qt(1),f=qt(0),h=jt(o);if((h||!h&&!s)&&((Me(o)!=="body"||ii(n))&&(l=Mi(o)),jt(o))){let g=Ve(o);p=ri(o),f.x=g.x+o.clientLeft,f.y=g.y+o.clientTop;}let m=n&&!h&&!s?Rn(n,l,true):qt(0);return {width:e.width*p.x,height:e.height*p.y,x:e.x*p.x-l.scrollLeft*p.x+f.x+m.x,y:e.y*p.y-l.scrollTop*p.y+f.y+m.y}}function Cl(t){return Array.from(t.getClientRects())}function $l(t){let i=Wt(t),e=Mi(t),o=t.ownerDocument.body,r=wt(i.scrollWidth,i.clientWidth,o.scrollWidth,o.clientWidth),s=wt(i.scrollHeight,i.clientHeight,o.scrollHeight,o.clientHeight),n=-e.scrollLeft+Ir(t),c=-e.scrollTop;return Ft(o).direction==="rtl"&&(n+=wt(i.clientWidth,o.clientWidth)-r),{width:r,height:s,x:n,y:c}}function Sl(t,i){let e=Et(t),o=Wt(t),r=e.visualViewport,s=o.clientWidth,n=o.clientHeight,c=0,l=0;if(r){s=r.width,n=r.height;let p=Do();(!p||p&&i==="fixed")&&(c=r.offsetLeft,l=r.offsetTop);}return {width:s,height:n,x:c,y:l}}function El(t,i){let e=Ve(t,true,i==="fixed"),o=e.top+t.clientTop,r=e.left+t.clientLeft,s=jt(t)?ri(t):qt(1),n=t.clientWidth*s.x,c=t.clientHeight*s.y,l=r*s.x,p=o*s.y;return {width:n,height:c,x:l,y:p}}function An(t,i,e){let o;if(i==="viewport")o=Sl(t,e);else if(i==="document")o=$l(Wt(t));else if(Ht(i))o=El(i,e);else {let r=zn(t);o={x:i.x-r.x,y:i.y-r.y,width:i.width,height:i.height};}return Le(o)}function On(t,i){let e=oe(t);return e===i||!Ht(e)||Pe(e)?false:Ft(e).position==="fixed"||On(e,i)}function Al(t,i){let e=i.get(t);if(e)return e;let o=ei(t,[],false).filter(c=>Ht(c)&&Me(c)!=="body"),r=null,s=Ft(t).position==="fixed",n=s?oe(t):t;for(;Ht(n)&&!Pe(n);){let c=Ft(n),l=oi(n);!l&&c.position==="fixed"&&(r=null),(s?!l&&!r:!l&&c.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||ii(n)&&!l&&On(t,n))?o=o.filter(f=>f!==n):r=c,n=oe(n);}return i.set(t,o),o}function Tl(t){let{element:i,boundary:e,rootBoundary:o,strategy:r}=t,n=[...e==="clippingAncestors"?Li(i)?[]:Al(i,this._c):[].concat(e),o],c=n[0],l=n.reduce((p,f)=>{let h=An(i,f,r);return p.top=wt(h.top,p.top),p.right=Xt(h.right,p.right),p.bottom=Xt(h.bottom,p.bottom),p.left=wt(h.left,p.left),p},An(i,c,r));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Il(t){let{width:i,height:e}=In(t);return {width:i,height:e}}function zl(t,i,e){let o=jt(i),r=Wt(i),s=e==="fixed",n=Ve(t,true,s,i),c={scrollLeft:0,scrollTop:0},l=qt(0);function p(){l.x=Ir(r);}if(o||!o&&!s)if((Me(i)!=="body"||ii(r))&&(c=Mi(i)),o){let g=Ve(i,true,s,i);l.x=g.x+i.clientLeft,l.y=g.y+i.clientTop;}else r&&p();s&&!o&&r&&p();let f=r&&!o&&!s?Rn(r,c):qt(0),h=n.left+c.scrollLeft-l.x-f.x,m=n.top+c.scrollTop-l.y-f.y;return {x:h,y:m,width:n.width,height:n.height}}function Ar(t){return Ft(t).position==="static"}function Tn(t,i){if(!jt(t)||Ft(t).position==="fixed")return null;if(i)return i(t);let e=t.offsetParent;return Wt(t)===e&&(e=e.ownerDocument.body),e}function Ln(t,i){let e=Et(t);if(Li(t))return e;if(!jt(t)){let r=oe(t);for(;r&&!Pe(r);){if(Ht(r)&&!Ar(r))return r;r=oe(r);}return e}let o=Tn(t,i);for(;o&&$n(o)&&Ar(o);)o=Tn(o,i);return o&&Pe(o)&&Ar(o)&&!oi(o)?e:o||Sn(t)||e}var Rl=async function(t){let i=this.getOffsetParent||Ln,e=this.getDimensions,o=await e(t.floating);return {reference:zl(t.reference,await i(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Ol(t){return Ft(t).direction==="rtl"}var Pi={convertOffsetParentRelativeRectToViewportRelativeRect:kl,getDocumentElement:Wt,getClippingRect:Tl,getOffsetParent:Ln,getElementRects:Rl,getClientRects:Cl,getDimensions:Il,getScale:ri,isElement:Ht,isRTL:Ol};function Mn(t,i){return t.x===i.x&&t.y===i.y&&t.width===i.width&&t.height===i.height}function Ll(t,i){let e=null,o,r=Wt(t);function s(){var c;clearTimeout(o),(c=e)==null||c.disconnect(),e=null;}function n(c,l){c===void 0&&(c=false),l===void 0&&(l=1),s();let p=t.getBoundingClientRect(),{left:f,top:h,width:m,height:g}=p;if(c||i(),!m||!g)return;let b=Oi(h),v=Oi(r.clientWidth-(f+m)),E=Oi(r.clientHeight-(h+g)),$=Oi(f),S={rootMargin:-b+"px "+-v+"px "+-E+"px "+-$+"px",threshold:wt(0,Xt(1,l))||1},y=true;function k(V){let F=V[0].intersectionRatio;if(F!==l){if(!y)return n();F?n(false,F):o=setTimeout(()=>{n(false,1e-7);},1e3);}F===1&&!Mn(p,t.getBoundingClientRect())&&n(),y=false;}try{e=new IntersectionObserver(k,{...S,root:r.ownerDocument});}catch{e=new IntersectionObserver(k,S);}e.observe(t);}return n(true),s}function Pn(t,i,e,o){o===void 0&&(o={});let{ancestorScroll:r=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=false}=o,p=Tr(t),f=r||s?[...p?ei(p):[],...ei(i)]:[];f.forEach($=>{r&&$.addEventListener("scroll",e,{passive:true}),s&&$.addEventListener("resize",e);});let h=p&&c?Ll(p,e):null,m=-1,g=null;n&&(g=new ResizeObserver($=>{let[_]=$;_&&_.target===p&&g&&(g.unobserve(i),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var S;(S=g)==null||S.observe(i);})),e();}),p&&!l&&g.observe(p),g.observe(i));let b,v=l?Ve(t):null;l&&E();function E(){let $=Ve(t);v&&!Mn(v,$)&&e(),v=$,b=requestAnimationFrame(E);}return e(),()=>{var $;f.forEach(_=>{r&&_.removeEventListener("scroll",e),s&&_.removeEventListener("resize",e);}),h?.(),($=g)==null||$.disconnect(),g=null,l&&cancelAnimationFrame(b);}}var Vn=xn;var Dn=wn,Hn=yn,zr=_n;var Fn=vn;var Nn=(t,i,e)=>{let o=new Map,r={platform:Pi,...e},s={...r.platform,_c:o};return bn(t,i,{...r,platform:s})};function Bn(t){return Ml(t)}function Rr(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Ml(t){for(let i=t;i;i=Rr(i))if(i instanceof Element&&getComputedStyle(i).display==="none")return null;for(let i=Rr(t);i;i=Rr(i)){if(!(i instanceof Element))continue;let e=getComputedStyle(i);if(e.display!=="contents"&&(e.position!=="static"||oi(e)||i.tagName==="BODY"))return i}return null}function Pl(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var K=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),i=this.popup.getBoundingClientRect(),e=this.placement.includes("top")||this.placement.includes("bottom"),o=0,r=0,s=0,n=0,c=0,l=0,p=0,f=0;e?t.top<i.top?(o=t.left,r=t.bottom,s=t.right,n=t.bottom,c=i.left,l=i.top,p=i.right,f=i.top):(o=i.left,r=i.bottom,s=i.right,n=i.bottom,c=t.left,l=t.top,p=t.right,f=t.top):t.left<i.left?(o=t.right,r=t.top,s=i.left,n=i.top,c=t.right,l=t.bottom,p=i.left,f=i.bottom):(o=i.right,r=i.top,s=t.left,n=t.top,c=i.right,l=i.bottom,p=t.left,f=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${f}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||Pl(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Pn(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Vn({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(zr({apply:({rects:e})=>{let o=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${e.reference.width}px`:"",this.popup.style.height=r?`${e.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Hn({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Dn({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(zr({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Fn({element:this.arrowEl,padding:this.arrowPadding}));let i=this.strategy==="absolute"?e=>Pi.getOffsetParent(e,Bn):Pi.getOffsetParent;Nn(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:te($t({},Pi),{getOffsetParent:i})}).then(({x:e,y:o,middlewareData:r,placement:s})=>{let n=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${e}px`,top:`${o}px`}),this.arrow){let l=r.arrow.x,p=r.arrow.y,f="",h="",m="",g="";if(this.arrowPlacement==="start"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",h=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=n?"":b,g=n?b:"",m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",f=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",f=typeof p=="number"?`${p}px`:"");Object.assign(this.arrowEl.style,{top:f,right:h,bottom:m,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return u`
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
        ${this.arrow?u`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};K.styles=[P,pn];a([A(".popup")],K.prototype,"popup",2);a([A(".popup__arrow")],K.prototype,"arrowEl",2);a([d()],K.prototype,"anchor",2);a([d({type:Boolean,reflect:true})],K.prototype,"active",2);a([d({reflect:true})],K.prototype,"placement",2);a([d({reflect:true})],K.prototype,"strategy",2);a([d({type:Number})],K.prototype,"distance",2);a([d({type:Number})],K.prototype,"skidding",2);a([d({type:Boolean})],K.prototype,"arrow",2);a([d({attribute:"arrow-placement"})],K.prototype,"arrowPlacement",2);a([d({attribute:"arrow-padding",type:Number})],K.prototype,"arrowPadding",2);a([d({type:Boolean})],K.prototype,"flip",2);a([d({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(i=>i.trim()).filter(i=>i!==""),toAttribute:t=>t.join(" ")}})],K.prototype,"flipFallbackPlacements",2);a([d({attribute:"flip-fallback-strategy"})],K.prototype,"flipFallbackStrategy",2);a([d({type:Object})],K.prototype,"flipBoundary",2);a([d({attribute:"flip-padding",type:Number})],K.prototype,"flipPadding",2);a([d({type:Boolean})],K.prototype,"shift",2);a([d({type:Object})],K.prototype,"shiftBoundary",2);a([d({attribute:"shift-padding",type:Number})],K.prototype,"shiftPadding",2);a([d({attribute:"auto-size"})],K.prototype,"autoSize",2);a([d()],K.prototype,"sync",2);a([d({type:Object})],K.prototype,"autoSizeBoundary",2);a([d({attribute:"auto-size-padding",type:Number})],K.prototype,"autoSizePadding",2);a([d({attribute:"hover-bridge",type:Boolean})],K.prototype,"hoverBridge",2);var qn=new Map,Vl=new WeakMap;function Dl(t){return t??{keyframes:[],options:{duration:0}}}function Un(t,i){return i.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function re(t,i){qn.set(t,Dl(i));}function se(t,i,e){let o=Vl.get(t);if(o?.[i])return Un(o[i],e.dir);let r=qn.get(i);return r?Un(r,e.dir):{keyframes:[],options:{duration:0}}}function si(t,i){return new Promise(e=>{function o(r){r.target===t&&(t.removeEventListener(i,o),e());}t.addEventListener(i,o);})}function ne(t,i,e){return new Promise(o=>{if(e?.duration===1/0)throw new Error("Promise-based animations must be finite.");let r=t.animate(i,te($t({},e),{duration:Hl()?0:e.duration}));r.addEventListener("cancel",o,{once:true}),r.addEventListener("finish",o,{once:true});})}function Hl(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ae(t){return Promise.all(t.getAnimations().map(i=>new Promise(e=>{i.cancel(),requestAnimationFrame(e);})))}function Or(t,i){return t.map(e=>te($t({},e),{height:e.height==="auto"?`${i}px`:e.height}))}var N=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>u`
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
    `,this.handleDocumentFocusIn=t=>{let i=t.composedPath();this&&!i.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let i=t.target,e=i.closest(".select__clear")!==null,o=i.closest("sl-icon-button")!==null;if(!(e||o)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let r=this.getAllOptions(),s=r.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>r.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=r.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=r.length-1),this.setCurrentOption(r[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let r=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of r)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let i=t.composedPath();this&&!i.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let e=t.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="sl-icon-button");this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let e=t.target.closest("sl-option"),o=this.value;e&&!e.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),i=this.valueHasChanged?this.value:this.defaultValue,e=Array.isArray(i)?i:[i],o=[];t.forEach(r=>o.push(r.value)),this.setSelectedOptions(t.filter(r=>e.includes(r.value)));}handleTagRemove(t,i){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(i,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(e=>{e.current=false,e.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let i=this.getAllOptions(),e=Array.isArray(t)?t:[t];i.forEach(o=>o.selected=false),e.length&&e.forEach(o=>o.selected=true),this.selectionChanged();}toggleOptionSelection(t,i){i===true||i===false?t.selected=i:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,i,e;let o=this.getAllOptions();this.selectedOptions=o.filter(s=>s.selected);let r=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(e=(i=s?.getTextLabel)==null?void 0:i.call(s))!=null?e:"";}this.valueHasChanged=r,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,i)=>{if(i<this.maxOptionsVisible||this.maxOptionsVisible<=0){let e=this.getTag(t,i);return u`<div @sl-remove=${o=>this.handleTagRemove(o,t)}>
          ${typeof e=="string"?Pt(e):e}
        </div>`}else if(i===this.maxOptionsVisible)return u`<sl-tag size=${this.size}>+${this.selectedOptions.length-i}</sl-tag>`;return u``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,i,e){if(super.attributeChangedCallback(t,i,e),t==="value"){let o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o;}}handleValueChange(){if(!this.valueHasChanged){let e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e;}let t=this.getAllOptions(),i=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(e=>i.includes(e.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await ae(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:i}=se(this,"select.show",{dir:this.localize.dir()});await ne(this.popup.popup,t,i),this.currentOption&&dn(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await ae(this);let{keyframes:t,options:i}=se(this,"select.hide",{dir:this.localize.dir()});await ne(this.popup.popup,t,i),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,si(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,si(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!i,r=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return u`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":o})}
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

              ${r?u`
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
    `}};N.styles=[P,Ct,hn];N.dependencies={"sl-icon":W,"sl-popup":K,"sl-tag":Yt};a([A(".select")],N.prototype,"popup",2);a([A(".select__combobox")],N.prototype,"combobox",2);a([A(".select__display-input")],N.prototype,"displayInput",2);a([A(".select__value-input")],N.prototype,"valueInput",2);a([A(".select__listbox")],N.prototype,"listbox",2);a([T()],N.prototype,"hasFocus",2);a([T()],N.prototype,"displayLabel",2);a([T()],N.prototype,"currentOption",2);a([T()],N.prototype,"selectedOptions",2);a([T()],N.prototype,"valueHasChanged",2);a([d()],N.prototype,"name",2);a([T()],N.prototype,"value",1);a([d({attribute:"value"})],N.prototype,"defaultValue",2);a([d({reflect:true})],N.prototype,"size",2);a([d()],N.prototype,"placeholder",2);a([d({type:Boolean,reflect:true})],N.prototype,"multiple",2);a([d({attribute:"max-options-visible",type:Number})],N.prototype,"maxOptionsVisible",2);a([d({type:Boolean,reflect:true})],N.prototype,"disabled",2);a([d({type:Boolean})],N.prototype,"clearable",2);a([d({type:Boolean,reflect:true})],N.prototype,"open",2);a([d({type:Boolean})],N.prototype,"hoist",2);a([d({type:Boolean,reflect:true})],N.prototype,"filled",2);a([d({type:Boolean,reflect:true})],N.prototype,"pill",2);a([d()],N.prototype,"label",2);a([d({reflect:true})],N.prototype,"placement",2);a([d({attribute:"help-text"})],N.prototype,"helpText",2);a([d({reflect:true})],N.prototype,"form",2);a([d({type:Boolean,reflect:true})],N.prototype,"required",2);a([d()],N.prototype,"getTag",2);a([I("disabled",{waitUntilFirstUpdate:true})],N.prototype,"handleDisabledChange",1);a([I(["defaultValue","value"],{waitUntilFirstUpdate:true})],N.prototype,"handleValueChange",1);a([I("open",{waitUntilFirstUpdate:true})],N.prototype,"handleOpenChange",1);re("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});re("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});N.define("sl-select");var Wn=w`
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
`;var Lt=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,i="";return [...t].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("slot")||(i+=e.textContent)),e.nodeType===Node.TEXT_NODE&&(i+=e.textContent);}),i.trim()}render(){return u`
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
    `}};Lt.styles=[P,Wn];Lt.dependencies={"sl-icon":W};a([A(".option__label")],Lt.prototype,"defaultSlot",2);a([T()],Lt.prototype,"current",2);a([T()],Lt.prototype,"selected",2);a([T()],Lt.prototype,"hasHover",2);a([d({reflect:true})],Lt.prototype,"value",2);a([d({type:Boolean,reflect:true})],Lt.prototype,"disabled",2);a([I("disabled")],Lt.prototype,"handleDisabledChange",1);a([I("selected")],Lt.prototype,"handleSelectedChange",1);a([I("value")],Lt.prototype,"handleValueChange",1);Lt.define("sl-option");exports.AutoFieldSelect=class Fo extends z{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}renderInput(){let e=this.options.select.map(o=>{let r={};return typeof o=="object"?Object.assign(r,o):typeof o=="string"&&o.startsWith("-")?Object.assign(r,{type:"divider"}):Object.assign(r,{label:o}),r});return u`              
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
            placeholder="${C(this.options.placeholder)}" 
            .maxOptionsVisible=${this.options.maxOptionsVisible}  
            help-text="${C(this.options.help)}"  
            .placement=${this.options.placement}  
            @sl-input=${this.onFieldInput.bind(this)}
         >
            ${e.map(o=>o.type==="divider"?u`<sl-divider></sl-divider>`:u`<sl-option 
                    value="${o[this.valueKey]||o.label}"
                    ?disabled=${!this.options.enable}
                >${o[this.labelKey]}</sl-option>`)}
        ${this.renderBeforeActions()}
        ${this.renderAfterActions()}
        </sl-select> 
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect=x([R("auto-field-select")],exports.AutoFieldSelect);var jn=w`
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
`;var et=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let i=this.input.offsetWidth,e=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),r=this.localize.dir()==="rtl",s=i*t;if(r){let n=`${i-s}px + ${t} * ${o}`;this.output.style.translate=`calc((${n} - ${e/2}px - ${o} / 2))`;}else {let n=`${s}px - ${t} * ${o}`;this.output.style.translate=`calc(${n} - ${e/2}px + ${o} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!i;return u`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--medium":true,"form-control--has-label":e,"form-control--has-help-text":o})}
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
              name=${C(this.name)}
              ?disabled=${this.disabled}
              min=${C(this.min)}
              max=${C(this.max)}
              step=${C(this.step)}
              .value=${Ot(this.value.toString())}
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};et.styles=[P,Ct,jn];a([A(".range__control")],et.prototype,"input",2);a([A(".range__tooltip")],et.prototype,"output",2);a([T()],et.prototype,"hasFocus",2);a([T()],et.prototype,"hasTooltip",2);a([d()],et.prototype,"title",2);a([d()],et.prototype,"name",2);a([d({type:Number})],et.prototype,"value",2);a([d()],et.prototype,"label",2);a([d({attribute:"help-text"})],et.prototype,"helpText",2);a([d({type:Boolean,reflect:true})],et.prototype,"disabled",2);a([d({type:Number})],et.prototype,"min",2);a([d({type:Number})],et.prototype,"max",2);a([d({type:Number})],et.prototype,"step",2);a([d()],et.prototype,"tooltip",2);a([d({attribute:false})],et.prototype,"tooltipFormatter",2);a([d({reflect:true})],et.prototype,"form",2);a([Vt()],et.prototype,"defaultValue",2);a([je({passive:true})],et.prototype,"handleThumbDragStart",1);a([I("value",{waitUntilFirstUpdate:true})],et.prototype,"handleValueChange",1);a([I("disabled",{waitUntilFirstUpdate:true})],et.prototype,"handleDisabledChange",1);a([I("hasTooltip",{waitUntilFirstUpdate:true})],et.prototype,"syncRange",1);et.define("sl-range");exports.AutoFieldRabge=class Vi extends z{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top",tooltipFormatter:void 0,format:void 0}}renderInput(){return u`       
        <div>
            <span>${this.toView(this.value)}</span>
            <sl-range 
                slot="value" 
                name="${this.name}"
                data-path = ${this.path}
                value=${this.value} 
                .placeholder=${this.options.placeholder}
                ?disabled=${!this.options.enable}
                .max=${this.options.max}
                .min=${this.options.min}
                .step=${this.options.step}
                .tooltip=${this.options.tooltip}
                .tooltipFormatter=${this.options.tooltipFormatter}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
        </sl-range>
        </div> 
       
  
        `}};exports.AutoFieldRabge.styles=[z.styles,w`
            .scale{
                position: relative;
                display: flex;
                flex-direction: row;
            }
            .box{
                background-color: var(--auto-bgcolor);
                border: var(--auto-border);
                padding: 0.5rem;
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
            }
            sl-range{
                --track-color-active: var(--auto-theme-color);        
                box-sizing: border-box;
            }
            .value > div{
                display: flex;
                align-items: center;
                & :first-child{
                    padding: 1rem;
                    padding-left:0.1rem;
                }
                & :last-child{
                    flex-grow: 1;
                }
            }
        `],exports.AutoFieldRabge=x([R("auto-field-range")],exports.AutoFieldRabge);var Kn=w`
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
`;function at(t,i,e){let o=r=>Object.is(r,-0)?0:r;return t<i?o(i):t>e?o(e):o(t)}var gt=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let i=this.localize.dir()==="rtl",{left:e,right:o,width:r}=this.rating.getBoundingClientRect(),s=i?this.roundToPrecision((o-t)/r*this.max,this.precision):this.roundToPrecision((t-e)/r*this.max,this.precision);return at(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let i=this.localize.dir()==="ltr",e=this.localize.dir()==="rtl",o=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||i&&t.key==="ArrowLeft"||e&&t.key==="ArrowRight"){let r=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-r),t.preventDefault();}if(t.key==="ArrowUp"||i&&t.key==="ArrowRight"||e&&t.key==="ArrowLeft"){let r=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+r),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==o&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,i=.5){let e=1/i;return Math.ceil(t*e)/e}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",i=Array.from(Array(this.max).keys()),e=0;return this.disabled||this.readonly?e=this.value:e=this.isHovering?this.hoverValue:this.value,u`
      <div
        part="base"
        class=${M({rating:true,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
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
          ${i.map(o=>e>o&&e<o+1?u`
                <span
                  class=${M({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===o+1})}
                  role="presentation"
                >
                  <div
                    style=${Z({clipPath:t?`inset(0 ${(e-o)*100}% 0 0)`:`inset(0 0 0 ${(e-o)*100}%)`})}
                  >
                    ${Pt(this.getSymbol(o+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${Z({clipPath:t?`inset(0 0 0 ${100-(e-o)*100}%)`:`inset(0 ${100-(e-o)*100}% 0 0)`})}
                  >
                    ${Pt(this.getSymbol(o+1))}
                  </div>
                </span>
              `:u`
              <span
                class=${M({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===o+1,"rating__symbol--active":e>=o+1})}
                role="presentation"
              >
                ${Pt(this.getSymbol(o+1))}
              </span>
            `)}
        </span>
      </div>
    `}};gt.styles=[P,Kn];gt.dependencies={"sl-icon":W};a([A(".rating")],gt.prototype,"rating",2);a([T()],gt.prototype,"hoverValue",2);a([T()],gt.prototype,"isHovering",2);a([d()],gt.prototype,"label",2);a([d({type:Number})],gt.prototype,"value",2);a([d({type:Number})],gt.prototype,"max",2);a([d({type:Number})],gt.prototype,"precision",2);a([d({type:Boolean,reflect:true})],gt.prototype,"readonly",2);a([d({type:Boolean,reflect:true})],gt.prototype,"disabled",2);a([d()],gt.prototype,"getSymbol",2);a([je({passive:true})],gt.prototype,"handleTouchMove",1);a([I("hoverValue")],gt.prototype,"handleHoverValueChange",1);a([I("isHovering")],gt.prototype,"handleIsHoveringChange",1);gt.define("sl-rating");exports.AutoFieldRating=class No extends z{renderInput(){return u`              
        <sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value=${this.value} 
            .placeholder=${this.options.placeholder}
            ?disabled=${!this.options.enable}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > </sl-rating> 
        `}renderView(){return u`<sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value=${this.value}  
            readonly
        > </sl-rating> `}};exports.AutoFieldRating=x([R("auto-field-rating")],exports.AutoFieldRating);var Gn=w`
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
`;var Lr=class extends O{render(){return u` <slot></slot> `}};Lr.styles=[P,Gn];var Yn=w`
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
`;var H=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let i=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!i&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,i,e="none"){this.input.setSelectionRange(t,i,e);}setRangeText(t,i,e,o="preserve"){let r=i??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,r,s,o),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),i=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!i,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return u`
      <div
        part="form-control"
        class=${M({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":o})}
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
              name=${C(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${C(this.placeholder)}
              minlength=${C(this.minlength)}
              maxlength=${C(this.maxlength)}
              min=${C(this.min)}
              max=${C(this.max)}
              step=${C(this.step)}
              .value=${Ot(this.value)}
              autocapitalize=${C(this.autocapitalize)}
              autocomplete=${C(this.autocomplete)}
              autocorrect=${C(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${C(this.pattern)}
              enterkeyhint=${C(this.enterkeyhint)}
              inputmode=${C(this.inputmode)}
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};H.styles=[P,Ct,Yn];H.dependencies={"sl-icon":W};a([A(".input__control")],H.prototype,"input",2);a([T()],H.prototype,"hasFocus",2);a([d()],H.prototype,"title",2);a([d({reflect:true})],H.prototype,"type",2);a([d()],H.prototype,"name",2);a([d()],H.prototype,"value",2);a([Vt()],H.prototype,"defaultValue",2);a([d({reflect:true})],H.prototype,"size",2);a([d({type:Boolean,reflect:true})],H.prototype,"filled",2);a([d({type:Boolean,reflect:true})],H.prototype,"pill",2);a([d()],H.prototype,"label",2);a([d({attribute:"help-text"})],H.prototype,"helpText",2);a([d({type:Boolean})],H.prototype,"clearable",2);a([d({type:Boolean,reflect:true})],H.prototype,"disabled",2);a([d()],H.prototype,"placeholder",2);a([d({type:Boolean,reflect:true})],H.prototype,"readonly",2);a([d({attribute:"password-toggle",type:Boolean})],H.prototype,"passwordToggle",2);a([d({attribute:"password-visible",type:Boolean})],H.prototype,"passwordVisible",2);a([d({attribute:"no-spin-buttons",type:Boolean})],H.prototype,"noSpinButtons",2);a([d({reflect:true})],H.prototype,"form",2);a([d({type:Boolean,reflect:true})],H.prototype,"required",2);a([d()],H.prototype,"pattern",2);a([d({type:Number})],H.prototype,"minlength",2);a([d({type:Number})],H.prototype,"maxlength",2);a([d()],H.prototype,"min",2);a([d()],H.prototype,"max",2);a([d()],H.prototype,"step",2);a([d()],H.prototype,"autocapitalize",2);a([d()],H.prototype,"autocorrect",2);a([d()],H.prototype,"autocomplete",2);a([d({type:Boolean})],H.prototype,"autofocus",2);a([d()],H.prototype,"enterkeyhint",2);a([d({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],H.prototype,"spellcheck",2);a([d()],H.prototype,"inputmode",2);a([I("disabled",{waitUntilFirstUpdate:true})],H.prototype,"handleDisabledChange",1);a([I("step",{waitUntilFirstUpdate:true})],H.prototype,"handleStepChange",1);a([I("value",{waitUntilFirstUpdate:true})],H.prototype,"handleValueChange",1);function ni(t,i){function e(r){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,c=s.left+n.scrollX,l=s.top+n.scrollY,p=r.pageX-c,f=r.pageY-l;i?.onMove&&i.onMove(p,f);}function o(){document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",o),i?.onStop&&i.onStop();}document.addEventListener("pointermove",e,{passive:true}),document.addEventListener("pointerup",o),i?.initialEvent instanceof PointerEvent&&e(i.initialEvent);}var Xn=w`
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
`;function*Jn(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Ds(Jn(t.shadowRoot.activeElement))));}function Zn(){return [...Jn()].pop()}var Qn=new WeakMap;function ta(t){let i=Qn.get(t);return i||(i=window.getComputedStyle(t,null),Qn.set(t,i)),i}function Fl(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let i=ta(t);return i.visibility!=="hidden"&&i.display!=="none"}function Nl(t){let i=ta(t),{overflowY:e,overflowX:o}=i;return e==="scroll"||o==="scroll"?true:e!=="auto"||o!=="auto"?false:t.scrollHeight>t.clientHeight&&e==="auto"||t.scrollWidth>t.clientWidth&&o==="auto"}function Bl(t){let i=t.tagName.toLowerCase(),e=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(i==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${n}:checked`);return c?c===t:s.querySelector(n)===t}return Fl(t)?(i==="audio"||i==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(i)?true:Nl(t):false}function ea(t){var i,e;let o=ql(t),r=(i=o[0])!=null?i:null,s=(e=o[o.length-1])!=null?e:null;return {start:r,end:s}}function Ul(t,i){var e;return ((e=t.getRootNode({composed:true}))==null?void 0:e.host)!==i}function ql(t){let i=new WeakMap,e=[];function o(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]")||i.has(r))return;i.set(r,true),!e.includes(r)&&Bl(r)&&e.push(r),r instanceof HTMLSlotElement&&Ul(r,t)&&r.assignedElements({flatten:true}).forEach(s=>{o(s);}),r.shadowRoot!==null&&r.shadowRoot.mode==="open"&&o(r.shadowRoot);}for(let s of r.children)o(s);}return o(t),e.sort((r,s)=>{let n=Number(r.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var ct=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var i;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((i=document.activeElement)==null?void 0:i.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let e=(o,r)=>{if(!o)return null;let s=o.closest(r);if(s)return s;let n=o.getRootNode();return n instanceof ShadowRoot?e(n.host,r):null};setTimeout(()=>{var o;let r=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?Zn():document.activeElement;(!this.containingElement||e(r,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let i=t.composedPath();this.containingElement&&!i.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let i=t.target;!this.stayOpenOnSelect&&i.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let i=this.getMenu();if(i){let e=i.getAllItems(),o=e[0],r=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),e.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(i.setCurrentItem(o),o.focus()),(t.key==="ArrowUp"||t.key==="End")&&(i.setCurrentItem(r),r.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let i=this.trigger.assignedElements({flatten:true}).find(o=>ea(o).start),e;if(i){switch(i.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":e=i.button;break;default:e=i;}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,si(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,si(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await ae(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:i}=se(this,"dropdown.show",{dir:this.localize.dir()});await ne(this.popup.popup,t,i),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await ae(this);let{keyframes:t,options:i}=se(this,"dropdown.hide",{dir:this.localize.dir()});await ne(this.popup.popup,t,i),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return u`
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
        sync=${C(this.sync?this.sync:void 0)}
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
    `}};ct.styles=[P,Xn];ct.dependencies={"sl-popup":K};a([A(".dropdown")],ct.prototype,"popup",2);a([A(".dropdown__trigger")],ct.prototype,"trigger",2);a([A(".dropdown__panel")],ct.prototype,"panel",2);a([d({type:Boolean,reflect:true})],ct.prototype,"open",2);a([d({reflect:true})],ct.prototype,"placement",2);a([d({type:Boolean,reflect:true})],ct.prototype,"disabled",2);a([d({attribute:"stay-open-on-select",type:Boolean,reflect:true})],ct.prototype,"stayOpenOnSelect",2);a([d({attribute:false})],ct.prototype,"containingElement",2);a([d({type:Number})],ct.prototype,"distance",2);a([d({type:Number})],ct.prototype,"skidding",2);a([d({type:Boolean})],ct.prototype,"hoist",2);a([d({reflect:true})],ct.prototype,"sync",2);a([I("open",{waitUntilFirstUpdate:true})],ct.prototype,"handleOpenChange",1);re("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});re("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var ia=w`
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
`;var oa=w`
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
`;var le=class extends O{constructor(){super(...arguments),this.localize=new G(this);}render(){return u`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};le.styles=[P,oa];var j=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.localize=new G(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:Qe}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),i=t?Je`a`:Je`button`;return xe`
      <${i}
        part="base"
        class=${M({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${C(t?void 0:this.disabled)}
        type=${C(t?void 0:this.type)}
        title=${this.title}
        name=${C(t?void 0:this.name)}
        value=${C(t?void 0:this.value)}
        href=${C(t&&!this.disabled?this.href:void 0)}
        target=${C(t?this.target:void 0)}
        download=${C(t?this.download:void 0)}
        rel=${C(t?this.rel:void 0)}
        role=${C(t?void 0:"button")}
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
        ${this.caret?xe` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?xe`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${i}>
    `}};j.styles=[P,wo];j.dependencies={"sl-icon":W,"sl-spinner":le};a([A(".button")],j.prototype,"button",2);a([T()],j.prototype,"hasFocus",2);a([T()],j.prototype,"invalid",2);a([d()],j.prototype,"title",2);a([d({reflect:true})],j.prototype,"variant",2);a([d({reflect:true})],j.prototype,"size",2);a([d({type:Boolean,reflect:true})],j.prototype,"caret",2);a([d({type:Boolean,reflect:true})],j.prototype,"disabled",2);a([d({type:Boolean,reflect:true})],j.prototype,"loading",2);a([d({type:Boolean,reflect:true})],j.prototype,"outline",2);a([d({type:Boolean,reflect:true})],j.prototype,"pill",2);a([d({type:Boolean,reflect:true})],j.prototype,"circle",2);a([d()],j.prototype,"type",2);a([d()],j.prototype,"name",2);a([d()],j.prototype,"value",2);a([d()],j.prototype,"href",2);a([d()],j.prototype,"target",2);a([d()],j.prototype,"rel",2);a([d()],j.prototype,"download",2);a([d()],j.prototype,"form",2);a([d({attribute:"formaction"})],j.prototype,"formAction",2);a([d({attribute:"formenctype"})],j.prototype,"formEnctype",2);a([d({attribute:"formmethod"})],j.prototype,"formMethod",2);a([d({attribute:"formnovalidate",type:Boolean})],j.prototype,"formNoValidate",2);a([d({attribute:"formtarget"})],j.prototype,"formTarget",2);a([I("disabled",{waitUntilFirstUpdate:true})],j.prototype,"handleDisabledChange",1);function ht(t,i){Wl(t)&&(t="100%");let e=jl(t);return t=i===360?t:Math.min(i,Math.max(0,parseFloat(t))),e&&(t=parseInt(String(t*i),10)/100),Math.abs(t-i)<1e-6?1:(i===360?t=(t<0?t%i+i:t%i)/parseFloat(String(i)):t=t%i/parseFloat(String(i)),t)}function Di(t){return Math.min(1,Math.max(0,t))}function Wl(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function jl(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Bo(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Hi(t){return Number(t)<=1?`${Number(t)*100}%`:t}function we(t){return t.length===1?"0"+t:String(t)}function ra(t,i,e){return {r:ht(t,255)*255,g:ht(i,255)*255,b:ht(e,255)*255}}function Pr(t,i,e){t=ht(t,255),i=ht(i,255),e=ht(e,255);let o=Math.max(t,i,e),r=Math.min(t,i,e),s=0,n=0,c=(o+r)/2;if(o===r)n=0,s=0;else {let l=o-r;switch(n=c>.5?l/(2-o-r):l/(o+r),o){case t:s=(i-e)/l+(i<e?6:0);break;case i:s=(e-t)/l+2;break;case e:s=(t-i)/l+4;break;}s/=6;}return {h:s,s:n,l:c}}function Mr(t,i,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+(i-t)*(6*e):e<1/2?i:e<2/3?t+(i-t)*(2/3-e)*6:t}function sa(t,i,e){let o,r,s;if(t=ht(t,360),i=ht(i,100),e=ht(e,100),i===0)r=e,s=e,o=e;else {let n=e<.5?e*(1+i):e+i-e*i,c=2*e-n;o=Mr(c,n,t+1/3),r=Mr(c,n,t),s=Mr(c,n,t-1/3);}return {r:o*255,g:r*255,b:s*255}}function Vr(t,i,e){t=ht(t,255),i=ht(i,255),e=ht(e,255);let o=Math.max(t,i,e),r=Math.min(t,i,e),s=0,n=o,c=o-r,l=o===0?0:c/o;if(o===r)s=0;else {switch(o){case t:s=(i-e)/c+(i<e?6:0);break;case i:s=(e-t)/c+2;break;case e:s=(t-i)/c+4;break;}s/=6;}return {h:s,s:l,v:n}}function na(t,i,e){t=ht(t,360)*6,i=ht(i,100),e=ht(e,100);let o=Math.floor(t),r=t-o,s=e*(1-i),n=e*(1-r*i),c=e*(1-(1-r)*i),l=o%6,p=[e,n,s,s,c,e][l],f=[c,e,e,n,s,s][l],h=[s,s,c,e,e,n][l];return {r:p*255,g:f*255,b:h*255}}function Dr(t,i,e,o){let r=[we(Math.round(t).toString(16)),we(Math.round(i).toString(16)),we(Math.round(e).toString(16))];return o&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function aa(t,i,e,o,r){let s=[we(Math.round(t).toString(16)),we(Math.round(i).toString(16)),we(Math.round(e).toString(16)),we(Kl(o))];return r&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function la(t,i,e,o){let r=t/100,s=i/100,n=e/100,c=o/100,l=255*(1-r)*(1-c),p=255*(1-s)*(1-c),f=255*(1-n)*(1-c);return {r:l,g:p,b:f}}function Hr(t,i,e){let o=1-t/255,r=1-i/255,s=1-e/255,n=Math.min(o,r,s);return n===1?(o=0,r=0,s=0):(o=(o-n)/(1-n)*100,r=(r-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(o),m:Math.round(r),y:Math.round(s),k:Math.round(n)}}function Kl(t){return Math.round(parseFloat(t)*255).toString(16)}function Fr(t){return At(t)/255}function At(t){return parseInt(t,16)}function ca(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var Fi={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function ha(t){let i={r:0,g:0,b:0},e=1,o=null,r=null,s=null,n=false,c=false;return typeof t=="string"&&(t=Xl(t)),typeof t=="object"&&(Mt(t.r)&&Mt(t.g)&&Mt(t.b)?(i=ra(t.r,t.g,t.b),n=true,c=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Mt(t.h)&&Mt(t.s)&&Mt(t.v)?(o=Hi(t.s),r=Hi(t.v),i=na(t.h,o,r),n=true,c="hsv"):Mt(t.h)&&Mt(t.s)&&Mt(t.l)?(o=Hi(t.s),s=Hi(t.l),i=sa(t.h,o,s),n=true,c="hsl"):Mt(t.c)&&Mt(t.m)&&Mt(t.y)&&Mt(t.k)&&(i=la(t.c,t.m,t.y,t.k),n=true,c="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(e=t.a)),e=Bo(e),{ok:n,format:t.format||c,r:Math.min(255,Math.max(i.r,0)),g:Math.min(255,Math.max(i.g,0)),b:Math.min(255,Math.max(i.b,0)),a:e}}var Gl="[-\\+]?\\d+%?",Yl="[-\\+]?\\d*\\.\\d+%?",_e="(?:"+Yl+")|(?:"+Gl+")",Nr="[\\s|\\(]+("+_e+")[,|\\s]+("+_e+")[,|\\s]+("+_e+")\\s*\\)?",Uo="[\\s|\\(]+("+_e+")[,|\\s]+("+_e+")[,|\\s]+("+_e+")[,|\\s]+("+_e+")\\s*\\)?",Nt={CSS_UNIT:new RegExp(_e),rgb:new RegExp("rgb"+Nr),rgba:new RegExp("rgba"+Uo),hsl:new RegExp("hsl"+Nr),hsla:new RegExp("hsla"+Uo),hsv:new RegExp("hsv"+Nr),hsva:new RegExp("hsva"+Uo),cmyk:new RegExp("cmyk"+Uo),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Xl(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let i=false;if(Fi[t])t=Fi[t],i=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let e=Nt.rgb.exec(t);return e?{r:e[1],g:e[2],b:e[3]}:(e=Nt.rgba.exec(t),e?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=Nt.hsl.exec(t),e?{h:e[1],s:e[2],l:e[3]}:(e=Nt.hsla.exec(t),e?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=Nt.hsv.exec(t),e?{h:e[1],s:e[2],v:e[3]}:(e=Nt.hsva.exec(t),e?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=Nt.cmyk.exec(t),e?{c:e[1],m:e[2],y:e[3],k:e[4]}:(e=Nt.hex8.exec(t),e?{r:At(e[1]),g:At(e[2]),b:At(e[3]),a:Fr(e[4]),format:i?"name":"hex8"}:(e=Nt.hex6.exec(t),e?{r:At(e[1]),g:At(e[2]),b:At(e[3]),format:i?"name":"hex"}:(e=Nt.hex4.exec(t),e?{r:At(e[1]+e[1]),g:At(e[2]+e[2]),b:At(e[3]+e[3]),a:Fr(e[4]+e[4]),format:i?"name":"hex8"}:(e=Nt.hex3.exec(t),e?{r:At(e[1]+e[1]),g:At(e[2]+e[2]),b:At(e[3]+e[3]),format:i?"name":"hex"}:false))))))))))}function Mt(t){return typeof t=="number"?!Number.isNaN(t):Nt.CSS_UNIT.test(t)}var Ni=class t{constructor(i="",e={}){if(i instanceof t)return i;typeof i=="number"&&(i=ca(i)),this.originalInput=i;let o=ha(i);this.originalInput=i,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??o.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let i=this.toRgb();return (i.r*299+i.g*587+i.b*114)/1e3}getLuminance(){let i=this.toRgb(),e,o,r,s=i.r/255,n=i.g/255,c=i.b/255;return s<=.03928?e=s/12.92:e=Math.pow((s+.055)/1.055,2.4),n<=.03928?o=n/12.92:o=Math.pow((n+.055)/1.055,2.4),c<=.03928?r=c/12.92:r=Math.pow((c+.055)/1.055,2.4),.2126*e+.7152*o+.0722*r}getAlpha(){return this.a}setAlpha(i){return this.a=Bo(i),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:i}=this.toHsl();return i===0}toHsv(){let i=Vr(this.r,this.g,this.b);return {h:i.h*360,s:i.s,v:i.v,a:this.a}}toHsvString(){let i=Vr(this.r,this.g,this.b),e=Math.round(i.h*360),o=Math.round(i.s*100),r=Math.round(i.v*100);return this.a===1?`hsv(${e}, ${o}%, ${r}%)`:`hsva(${e}, ${o}%, ${r}%, ${this.roundA})`}toHsl(){let i=Pr(this.r,this.g,this.b);return {h:i.h*360,s:i.s,l:i.l,a:this.a}}toHslString(){let i=Pr(this.r,this.g,this.b),e=Math.round(i.h*360),o=Math.round(i.s*100),r=Math.round(i.l*100);return this.a===1?`hsl(${e}, ${o}%, ${r}%)`:`hsla(${e}, ${o}%, ${r}%, ${this.roundA})`}toHex(i=false){return Dr(this.r,this.g,this.b,i)}toHexString(i=false){return "#"+this.toHex(i)}toHex8(i=false){return aa(this.r,this.g,this.b,this.a,i)}toHex8String(i=false){return "#"+this.toHex8(i)}toHexShortString(i=false){return this.a===1?this.toHexString(i):this.toHex8String(i)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let i=Math.round(this.r),e=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${i}, ${e}, ${o})`:`rgba(${i}, ${e}, ${o}, ${this.roundA})`}toPercentageRgb(){let i=e=>`${Math.round(ht(e,255)*100)}%`;return {r:i(this.r),g:i(this.g),b:i(this.b),a:this.a}}toPercentageRgbString(){let i=e=>Math.round(ht(e,255)*100);return this.a===1?`rgb(${i(this.r)}%, ${i(this.g)}%, ${i(this.b)}%)`:`rgba(${i(this.r)}%, ${i(this.g)}%, ${i(this.b)}%, ${this.roundA})`}toCmyk(){return {...Hr(this.r,this.g,this.b)}}toCmykString(){let{c:i,m:e,y:o,k:r}=Hr(this.r,this.g,this.b);return `cmyk(${i}, ${e}, ${o}, ${r})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let i="#"+Dr(this.r,this.g,this.b,false);for(let[e,o]of Object.entries(Fi))if(i===o)return e;return  false}toString(i){let e=!!i;i=i??this.format;let o=false,r=this.a<1&&this.a>=0;return !e&&r&&(i.startsWith("hex")||i==="name")?i==="name"&&this.a===0?this.toName():this.toRgbString():(i==="rgb"&&(o=this.toRgbString()),i==="prgb"&&(o=this.toPercentageRgbString()),(i==="hex"||i==="hex6")&&(o=this.toHexString()),i==="hex3"&&(o=this.toHexString(true)),i==="hex4"&&(o=this.toHex8String(true)),i==="hex8"&&(o=this.toHex8String()),i==="name"&&(o=this.toName()),i==="hsl"&&(o=this.toHslString()),i==="hsv"&&(o=this.toHsvString()),i==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(i=10){let e=this.toHsl();return e.l+=i/100,e.l=Di(e.l),new t(e)}brighten(i=10){let e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(i/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(i/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(i/100)))),new t(e)}darken(i=10){let e=this.toHsl();return e.l-=i/100,e.l=Di(e.l),new t(e)}tint(i=10){return this.mix("white",i)}shade(i=10){return this.mix("black",i)}desaturate(i=10){let e=this.toHsl();return e.s-=i/100,e.s=Di(e.s),new t(e)}saturate(i=10){let e=this.toHsl();return e.s+=i/100,e.s=Di(e.s),new t(e)}greyscale(){return this.desaturate(100)}spin(i){let e=this.toHsl(),o=(e.h+i)%360;return e.h=o<0?360+o:o,new t(e)}mix(i,e=50){let o=this.toRgb(),r=new t(i).toRgb(),s=e/100,n={r:(r.r-o.r)*s+o.r,g:(r.g-o.g)*s+o.g,b:(r.b-o.b)*s+o.b,a:(r.a-o.a)*s+o.a};return new t(n)}analogous(i=6,e=30){let o=this.toHsl(),r=360/e,s=[this];for(o.h=(o.h-(r*i>>1)+720)%360;--i;)o.h=(o.h+r)%360,s.push(new t(o));return s}complement(){let i=this.toHsl();return i.h=(i.h+180)%360,new t(i)}monochromatic(i=6){let e=this.toHsv(),{h:o}=e,{s:r}=e,{v:s}=e,n=[],c=1/i;for(;i--;)n.push(new t({h:o,s:r,v:s})),s=(s+c)%1;return n}splitcomplement(){let i=this.toHsl(),{h:e}=i;return [this,new t({h:(e+72)%360,s:i.s,l:i.l}),new t({h:(e+216)%360,s:i.s,l:i.l})]}onBackground(i){let e=this.toRgb(),o=new t(i).toRgb(),r=e.a+o.a*(1-e.a);return new t({r:(e.r*e.a+o.r*o.a*(1-e.a))/r,g:(e.g*e.a+o.g*o.a*(1-e.a))/r,b:(e.b*e.a+o.b*o.a*(1-e.a))/r,a:r})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(i){let e=this.toHsl(),{h:o}=e,r=[this],s=360/i;for(let n=1;n<i;n++)r.push(new t({h:(o+n*s)%360,s:e.s,l:e.l}));return r}equals(i){let e=new t(i);return this.format==="cmyk"||e.format==="cmyk"?this.toCmykString()===e.toCmykString():this.toRgbString()===e.toRgbString()}};var da="EyeDropper"in window,B=class extends O{constructor(){super(),this.formControlController=new dt(this),this.isSafeValue=false,this.localize=new G(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],i=(t.indexOf(this.format)+1)%t.length;this.format=t[i],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let i=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),e=i.querySelector(".color-picker__slider-handle"),{width:o}=i.getBoundingClientRect(),r=this.value,s=this.value;e.focus(),t.preventDefault(),ni(i,{onMove:n=>{this.alpha=at(n/o*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==r&&(r=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let i=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),e=i.querySelector(".color-picker__slider-handle"),{width:o}=i.getBoundingClientRect(),r=this.value,s=this.value;e.focus(),t.preventDefault(),ni(i,{onMove:n=>{this.hue=at(n/o*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==r&&(r=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let i=this.shadowRoot.querySelector(".color-picker__grid"),e=i.querySelector(".color-picker__grid-handle"),{width:o,height:r}=i.getBoundingClientRect(),s=this.value,n=this.value;e.focus(),t.preventDefault(),this.isDraggingGridHandle=true,ni(i,{onMove:(c,l)=>{this.saturation=at(c/o*100,0,100),this.brightness=at(100-l/r*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let i=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=at(this.alpha-i,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=at(this.alpha+i,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let i=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=at(this.hue-i,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=at(this.hue+i,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let i=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=at(this.saturation-i,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=at(this.saturation+i,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=at(this.brightness+i,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=at(this.brightness-i,0,100),this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let i=t.target,e=this.value;t.stopPropagation(),this.input.value?(this.setColor(i.value),i.value=this.value):this.value="",this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let i=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==i&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let i=new Ni(t);if(!i.isValid)return null;let e=i.toHsl(),o={h:e.h,s:e.s*100,l:e.l*100,a:e.a},r=i.toRgb(),s=i.toHexString(),n=i.toHex8String(),c=i.toHsv(),l={h:c.h,s:c.s*100,v:c.v*100,a:c.a};return {hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:r.r,g:r.g,b:r.b,string:this.setLetterCase(`rgb(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)})`)},rgba:{r:r.r,g:r.g,b:r.b,a:r.a,string:this.setLetterCase(`rgba(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)}, ${r.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let i=this.parseColor(t);return i===null?false:(this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=this.opacity?i.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!da)return;new EyeDropper().open().then(i=>{let e=this.value;this.setColor(i.sRGBHex),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let i=this.value;this.disabled||(this.setColor(t),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,i,e,o=100){let r=new Ni(`hsva(${t}, ${i}%, ${e}%, ${o/100})`);return r.isValid?r.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,i){if(this.isEmpty=!i,i||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let e=this.parseColor(i);e!==null?(this.inputValue=this.value,this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=e.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let i=this.inline?this.base:this.trigger;this.hasFocus&&(i.focus({preventScroll:true}),i.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let i=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(i===null)return "";switch(t){case "hex":return i.hex;case "hexa":return i.hexa;case "rgb":return i.rgb.string;case "rgba":return i.rgba.string;case "hsl":return i.hsl.string;case "hsla":return i.hsla.string;case "hsv":return i.hsv.string;case "hsva":return i.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,i=100-this.brightness,e=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(r=>r.trim()!==""),o=u`
      <div
        part="base"
        class=${M({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
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
          style=${Z({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${M({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${Z({top:`${i}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${C(this.disabled?void 0:"0")}
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
                style=${Z({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${C(this.disabled?void 0:"0")}
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
                      style=${Z({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${Z({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${C(this.disabled?void 0:"0")}
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
            style=${Z({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            ${da?u`
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
                ${e.map(r=>{let s=this.parseColor(r);return s?u`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${C(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${r}
                      @click=${()=>this.selectSwatch(r)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(s.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${Z({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${r}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?o:u`
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
          style=${Z({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${o}
      </sl-dropdown>
    `}};B.styles=[P,ia];B.dependencies={"sl-button-group":ye,"sl-button":j,"sl-dropdown":ct,"sl-icon":W,"sl-input":H,"sl-visually-hidden":Lr};a([A('[part~="base"]')],B.prototype,"base",2);a([A('[part~="input"]')],B.prototype,"input",2);a([A(".color-dropdown")],B.prototype,"dropdown",2);a([A('[part~="preview"]')],B.prototype,"previewButton",2);a([A('[part~="trigger"]')],B.prototype,"trigger",2);a([T()],B.prototype,"hasFocus",2);a([T()],B.prototype,"isDraggingGridHandle",2);a([T()],B.prototype,"isEmpty",2);a([T()],B.prototype,"inputValue",2);a([T()],B.prototype,"hue",2);a([T()],B.prototype,"saturation",2);a([T()],B.prototype,"brightness",2);a([T()],B.prototype,"alpha",2);a([d()],B.prototype,"value",2);a([Vt()],B.prototype,"defaultValue",2);a([d()],B.prototype,"label",2);a([d()],B.prototype,"format",2);a([d({type:Boolean,reflect:true})],B.prototype,"inline",2);a([d({reflect:true})],B.prototype,"size",2);a([d({attribute:"no-format-toggle",type:Boolean})],B.prototype,"noFormatToggle",2);a([d()],B.prototype,"name",2);a([d({type:Boolean,reflect:true})],B.prototype,"disabled",2);a([d({type:Boolean})],B.prototype,"hoist",2);a([d({type:Boolean})],B.prototype,"opacity",2);a([d({type:Boolean})],B.prototype,"uppercase",2);a([d()],B.prototype,"swatches",2);a([d({reflect:true})],B.prototype,"form",2);a([d({type:Boolean,reflect:true})],B.prototype,"required",2);a([je({passive:false})],B.prototype,"handleTouchMove",1);a([I("format",{waitUntilFirstUpdate:true})],B.prototype,"handleFormatChange",1);a([I("opacity",{waitUntilFirstUpdate:true})],B.prototype,"handleOpacityChange",1);a([I("value")],B.prototype,"handleValueChange",1);B.define("sl-color-picker");var Ql=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class Bi extends z{getInitialOptions(){return {format:"hex",opacity:false,inline:false,presets:Ql}}renderInput(){return u`
            <sl-color-picker  
                name=${this.name} 
                data-path = ${this.path}
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
        `}renderView(){return u`<span><span class="color" style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[z.styles,w`
        sl-color-picker::part(trigger){
            border-radius: 4px;
        }
        .color{
            border: 2px solid white;            
            border-radius: 4px;
            width: 1rem;
            height: 1rem;
            outline: 1px solid #aaa; 
            margin-right: 0.5rem;
        }        
        :host(.viewonly){
            .value > span{
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        }
    `],exports.AutoFieldColorPicker=x([R("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class Ui extends z{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((e,o)=>{let r={};return typeof e=="object"?Object.assign(r,e):Object.assign(r,{id:e,label:e,value:e}),r.icon&&(this.isShowIcon=true),r.$index=o,r}),this.selection=this.value;}renderInput(){return u`
            <div class="items">        
                ${this.items.map(e=>this.renderCheckItemWithCard(this.renderCheckboxItem(e),e))} </div>
        `}renderCheckboxItem(e){return u`              
            <sl-checkbox      
                data-index="${e.$index}"
                data-value="${e[this.valueKey]}"
                .value="${e[this.valueKey]}" 
                .checked=${this.value.includes(e[this.valueKey])} 
                help-text="${e.memo}"
                @sl-change=${this._onCheckChange.bind(this)}
            > ${e.label}</sl-checkbox> 
        `}_onCheckChange(e){let o=e.target.closest(".card")||e.target,r=Number(o.dataset.index),s=o.checked??!o.classList.contains("selected"),n=this.items[r];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let c=this.selection.findIndex(l=>l===n[this.valueKey]);c>-1&&this.selection.splice(c,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(e,o){if(this.options.card){let r=this.selection.includes(o[this.valueKey]);return u`<div class="card ${r?"selected":""}"
                data-index ="${o.$index}"
                style=${Z({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">
                    ${Q(this.isShowIcon,()=>u`<sl-icon  class="icon" name="${o.icon||""}"></sl-icon>`)}                    
                    ${e}                    
                </div>
            </div>`}else return e}};exports.AutoFieldCheckboxGroup.styles=[z.styles,w`
        .items{
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.2em;
            sl-checkbox{
                padding: 0.5rem;
            }        
            sl-checkbox::part(form-control-help-text){
                max-height: 2.4rem; 
                overflow: hidden;
            }            
            sl-checkbox::part(base){
                font-size: var(--auto-font-size);
            }
        } 
        
        .card{      
            padding: calc(var(--auto-spacing) * 0.3);
            box-sizing: border-box;             
            cursor: pointer;
                
            sl-checkbox{
                padding: 0rem;
            }    
            &>.body{
                display: flex;
                flex-direction: row;
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
                padding: var(--auto-spacing);
                box-sizing: border-box; 
                position: relative;              
                &:hover{
                    outline: 1px solid var(--sl-color-primary-500);
                }
                sl-icon.icon{
                    flex-shrink: 0;
                    color: var(--sl-color-gray-500);
                    padding: 0.5em;
                    padding-top: 0px;
                    padding-left: 0px;
                    font-size: var(--auto-font-size);
                }
                sl-checkbox::part(label){
                    margin-left: 0px;                    
                    font-size: var(--auto-font-size);
                }
                sl-checkbox::part(form-control-help-text){
                    max-height: 2.4em; 
                    overflow: hidden;
                }
                sl-checkbox::part(control){
                    display: none;
                } 
            }   
            &.card.selected{
                &>.body{
                    border: 1px solid var(--sl-color-primary-500);
                    background-color: var(--sl-color-primary-50);
                    &:hover{
                        outline: 1px solid var(--sl-color-primary-500);
                    }  
                    &:before{
                        content: ' ';
                        position: absolute;
                        left: calc(100% - 24px);
                        top:0px;
                        width: 24px;
                        height:24px;
                        box-sizing: border-box;
                        border: 12px solid transparent;
                        border-top-color: var(--sl-color-primary-500);
                        border-right-color: var(--sl-color-primary-500);
                    }     
                    &:after{
                        content: ' ';
                        position: absolute;
                        left: calc(100% - 12px);
                        top:2px;
                        width: 10px;
                        height:6px;
                        box-sizing: border-box;
                        border: 2px solid transparent;
                        border-left-color: white;
                        border-bottom-color: white;
                        transform: rotate(-45deg);
                    }
                }  
            }          
        }
    `],exports.AutoFieldCheckboxGroup=x([R("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class qi extends z{constructor(){super(...arguments);this.delimiter="";this.template="0000";this.parts=[];this.result="";}getInitialOptions(){return {template:"0000",delimiter:""}}_onPartChange(e){let r=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,c)=>(n+=c.value,n),""),s=0;this.result=Array.from(this.template).map(n=>n===this.delimiter?n:r[s++]).join(""),this.onFieldChange(),this._isLastInput(e);}getInputValue(){return this.result}_isLastInput(e){let o=e.target;if(o.value.length>=1){o.blur();let r=o.nextElementSibling||o.nextElementSibling?.nextElementSibling;r&&(r.focus(),r.select());}}_onPaste(e){e.preventDefault();let r=(e.clipboardData?.getData("text/plain")||"").split(""),s=c=>{if(c){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let c of r)if(c!==this.options.delimiter&&(n.value=c,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.delimiter=this.options.delimiter,this.template=this.options.template,this.parts=this.template.split(this.delimiter),this.value.split(this.delimiter).forEach((e,o)=>{this.parts[o]=e;});}_onPartFocus(e){e.target.select();}renderPart(e){let o=e.split("");return u`            
        ${yt(o,r=>u`<sl-input        
                maxLength = "1"
                .value=${r} 
                noSpinButtons
                autocorrect="off"
                autocomplete="off"
                spellcheck="false"
                @paste=${s=>this._onPaste(s)}
                @sl-focus=${this._onPartFocus.bind(this)}
                @sl-input=${this._onPartChange.bind(this)}></sl-input>`)}`}renderInput(){return u`
            <magic-flex grow="none" align="center" gap="0.5em">
                ${yt(this.parts,(e,o)=>u`                    
                        ${this.renderPart(e)}
                        ${Q(o<this.parts.length-1,()=>u`${this.delimiter}`)}
                        `)}
            </magic-flex>
        `}};exports.AutoFieldParts.styles=[z.styles,w`
            :host > .autofield{
                &>.value{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                } 
            }
            sl-input{
                width: 3rem;
                height: 3rem;
                line-height: 3rem;
                text-align: center;                
            }
            sl-input::part(input)::selection{
                background: none;
            }
            sl-input::part(input):focus{
                background-color: var(--sl-color-gray-100);
            }
        `],exports.AutoFieldParts=x([R("auto-field-parts")],exports.AutoFieldParts);var pa=w`
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
`;var qo=class extends O{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let i=["menuitem","menuitemcheckbox"],e=t.composedPath(),o=e.find(c=>{var l;return i.includes(((l=c?.getAttribute)==null?void 0:l.call(c,"role"))||"")});if(!o||e.find(c=>{var l;return ((l=c?.getAttribute)==null?void 0:l.call(c,"role"))==="menu"})!==this)return;let n=o;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let i=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),i?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let i=this.getAllItems(),e=this.getCurrentItem(),o=e?i.indexOf(e):0;i.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?o++:t.key==="ArrowUp"?o--:t.key==="Home"?o=0:t.key==="End"&&(o=i.length-1),o<0&&(o=i.length-1),o>i.length-1&&(o=0),this.setCurrentItem(i[o]),i[o].focus());}}handleMouseDown(t){let i=t.target;this.isMenuItem(i)&&this.setCurrentItem(i);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var i;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((i=t.getAttribute("role"))!=null?i:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1");});}render(){return u`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};qo.styles=[P,pa];a([A("slot")],qo.prototype,"defaultSlot",2);qo.define("sl-menu");var ua=w`
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
`;var Wi=(t,i)=>{let e=t._$AN;if(e===void 0)return  false;for(let o of e)o._$AO?.(i,false),Wi(o,i);return  true},Wo=t=>{let i,e;do{if((i=t._$AM)===void 0)break;e=i._$AN,e.delete(t),t=i;}while(e?.size===0)},ma=t=>{for(let i;i=t._$AM;t=i){let e=i._$AN;if(e===void 0)i._$AN=e=new Set;else if(e.has(t))break;e.add(t),tc(i);}};function Jl(t){this._$AN!==void 0?(Wo(this),this._$AM=t,ma(this)):this._$AM=t;}function Zl(t,i=false,e=0){let o=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(i)if(Array.isArray(o))for(let s=e;s<o.length;s++)Wi(o[s],false),Wo(o[s]);else o!=null&&(Wi(o,false),Wo(o));else Wi(this,t);}var tc=t=>{t.type==mt.CHILD&&(t._$AP??=Zl,t._$AQ??=Jl);},jo=class extends kt{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,e,o){super._$AT(i,e,o),ma(this),this.isConnected=i._$AU;}_$AO(i,e=true){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),e&&(Wi(this,i),Wo(this));}setValue(i){if(ho(this._$Ct))this._$Ct._$AI(i,this);else {let e=[...this._$Ct._$AH];e[this._$Ci]=i,this._$Ct._$AI(e,this,0);}}disconnected(){}reconnected(){}};var fa=()=>new Ur,Ur=class{},Br=new WeakMap,ga=Rt(class extends jo{render(t){return Y}update(t,[i]){let e=i!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=i,this.ht=t.options?.host,this.rt(this.ct=t.element)),Y}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let i=this.ht??globalThis,e=Br.get(i);e===void 0&&(e=new WeakMap,Br.set(i,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?Br.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var ba=class{constructor(t,i){this.popupRef=fa(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=e=>{switch(e.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(e);break;}},this.handleClick=e=>{var o;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&(e.target.tagName==="sl-menu-item"||(o=e.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=e=>{e.stopPropagation();},this.handlePopupReposition=()=>{let e=this.host.renderRoot.querySelector("slot[name='submenu']"),o=e?.assignedElements({flatten:true}).filter(p=>p.localName==="sl-menu")[0],r=getComputedStyle(this.host).direction==="rtl";if(!o)return;let{left:s,top:n,width:c,height:l}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${r?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${r?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`);},(this.host=t).addController(this),this.hasSlotController=i;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let i=this.host.renderRoot.querySelector("slot[name='submenu']");if(!i){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let e=null;for(let o of i.assignedElements())if(e=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),e.length!==0)break;if(!(!e||e.length===0)){e[0].setAttribute("tabindex","0");for(let o=1;o!==e.length;++o)e[o].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?e[0]instanceof HTMLElement&&e[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{e[0]instanceof HTMLElement&&e[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let i=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((r,s)=>{var n;let c=(n=i.get(s))!=null?n:new CSSUnitValue(0,"px"),p=(c instanceof CSSUnitValue?c:new CSSUnitValue(0,"px")).to("px");return r-p.value},0);this.skidding=o;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?u`
      <sl-popup
        ${ga(this.popupRef)}
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
    `:u` <slot name="submenu" hidden></slot> `}};var Tt=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new nt(this,"submenu"),this.submenuController=new ba(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return Ns(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",i=this.submenuController.isExpanded();return u`
      <div
        id="anchor"
        part="base"
        class=${M({"menu-item":true,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":i})}
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
    `}};Tt.styles=[P,ua];Tt.dependencies={"sl-icon":W,"sl-popup":K,"sl-spinner":le};a([A("slot:not([name])")],Tt.prototype,"defaultSlot",2);a([A(".menu-item")],Tt.prototype,"menuItem",2);a([d()],Tt.prototype,"type",2);a([d({type:Boolean,reflect:true})],Tt.prototype,"checked",2);a([d()],Tt.prototype,"value",2);a([d({type:Boolean,reflect:true})],Tt.prototype,"loading",2);a([d({type:Boolean,reflect:true})],Tt.prototype,"disabled",2);a([I("checked")],Tt.prototype,"handleCheckedChange",1);a([I("disabled")],Tt.prototype,"handleDisabledChange",1);a([I("type")],Tt.prototype,"handleTypeChange",1);Tt.define("sl-menu-item");var va=w`
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
`;var qr=()=>null,It=class extends O{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new G(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=qr,this.snapThreshold=12;}toSnapFunction(t){let i=t.split(" ");return ({pos:e,size:o,snapThreshold:r,isRtl:s,vertical:n})=>{let c=e,l=Number.POSITIVE_INFINITY;return i.forEach(p=>{let f;if(p.startsWith("repeat(")){let m=t.substring(7,t.length-1),g=m.endsWith("%"),b=Number.parseFloat(m),v=g?o*(b/100):b;f=Math.round((s&&!n?o-e:e)/v)*v;}else p.endsWith("%")?f=o*(Number.parseFloat(p)/100):f=Number.parseFloat(p);s&&!n&&(f=o-f);let h=Math.abs(e-f);h<=r&&h<l&&(c=f,l=h);}),c}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=qr;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:i}=this.getBoundingClientRect();this.size=this.vertical?i:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let i=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),ni(this,{onMove:(e,o)=>{var r;let s=this.vertical?o:e;this.primary==="end"&&(s=this.size-s),s=(r=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:i,vertical:this.vertical}))!=null?r:s,this.position=at(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let i=this.position,e=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(i-=e),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(i+=e),t.key==="Home"&&(i=this.primary==="end"?100:0),t.key==="End"&&(i=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)i=this.positionBeforeCollapsing,this.isCollapsed=false;else {let o=this.position;i=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=o;});}this.position=at(i,0,100);}}handleResize(t){let{width:i,height:e}=t[0].contentRect;this.size=this.vertical?e:i,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",i=this.vertical?"gridTemplateColumns":"gridTemplateRows",e=this.localize.dir()==="rtl",o=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,r="auto";return this.primary==="end"?e&&!this.vertical?this.style[t]=`${o} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${o}`:e&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${r}`,this.style[i]="",u`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${C(this.disabled?void 0:"0")}
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
    `}};It.styles=[P,va];a([A(".divider")],It.prototype,"divider",2);a([d({type:Number,reflect:true})],It.prototype,"position",2);a([d({attribute:"position-in-pixels",type:Number})],It.prototype,"positionInPixels",2);a([d({type:Boolean,reflect:true})],It.prototype,"vertical",2);a([d({type:Boolean,reflect:true})],It.prototype,"disabled",2);a([d()],It.prototype,"primary",2);a([d({reflect:true})],It.prototype,"snap",1);a([d({type:Number,attribute:"snap-threshold"})],It.prototype,"snapThreshold",2);a([I("position")],It.prototype,"handlePositionChange",1);a([I("positionInPixels")],It.prototype,"handlePositionInPixelsChange",1);a([I("vertical")],It.prototype,"handleVerticalChange",1);It.define("sl-split-panel");Yt.define("sl-tag");exports.AutoFieldList=class De extends z{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.items=[];this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}connectedCallback(){if(super.connectedCallback(),this.options){this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let e=this.options.select;e&&(this.items=e,this.items.forEach(o=>{this.isItemSelected(o)&&this.selection.push(o[this.valueKey]);})),this.setPresetActions();}this.style.height="auto";}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.valueKey]:this.value.includes(e[this.valueKey])}_addSecectItem(e){this.selection.findIndex(r=>r[this.valueKey]===e[this.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(e[this.valueKey]));}_removeSelectItem(e){for(let o=this.selection.length-1;o>=0;o--)this.selection[o]===e&&this.selection.splice(o,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(e){let o=e.detail.item,r=o.dataset.index,s=this.items[r];s&&(o.checked?this._addSecectItem(s):this._removeSelectItem(s[this.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.length}`,this.onFieldChange());}_renderWithSplitPanel(e){return this.options.showResults?u`<sl-split-panel position="60">
                ${e}
                ${this.renderResults()}
            </sl-split-panel>`:e}_getItemLabel(e,o){return o?u`${Pt(o.replace(/\{(.+?)\}/g,(r,s)=>e[s]))}`:e.label}_onClickPresetAction(e){e==="all"?this.selection=this.items.map(o=>o[this.valueKey]):e==="reverse"?this.selection=this.items.filter(o=>!this.selection.includes(o[this.valueKey])).map(o=>o[this.valueKey]):e==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let e=[{id:"all",label:"\u5168\u9009",size:"small",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",size:"small",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",size:"small",onClick:()=>this._onClickPresetAction("clear")}],o=r=>{for(let s=e.length-1;s>=0;s--)if(e[s].id===r.id){let n=r.onClick;r.onClick=()=>{e[s].onClick(),n&&n.call(this,this.getInputValue());},e.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(r=>{o(r);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(r=>{o(r);}),e.length>0&&(this.afterActions||(this.afterActions=[]),this.afterActions.push(...e));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(e){let o=this.options.labelKey;if(o){if(o in e)return e[o]}else return e.label}renderResults(){return u`<div slot="end" 
            class="results mark-err" 
            no-padding 
            style="${Z({maxHeight:this.options.height})}">
            ${yt(this.selection,e=>u`<div class="item" >
                    <span>${e}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(e)}></sl-icon-button>
                </div>`)}
        </div>`}_renderList(){let e=Array.isArray(this.value)?this.value:[this.value],o=this.options.itemTemplate;return u`${this._renderWithSplitPanel(u`
            <sl-menu slot="start" class="mark-err" style=${Z({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}>
            ${yt(this.items,(r,s)=>{let n=e.includes(r[this.valueKey]);return u`<sl-menu-item 
                        type="checkbox"                
                        data-index=${String(s)} 
                        .checked=${n}
                    >                
                        <auto-box no-border no-padding flex="row" grow="first" style="width:100%;">
                            ${this._getItemLabel(r,o)}
                        </auto-box>
                    </sl-menu-item>`})}
            </sl-menu>`)} `}_renderHeader(){return u`${Q(this.beforeActions.length>0,()=>u`<div class="header">
                ${this.renderBeforeActions()}
            </div>`)}`}_renderFooter(){return u`<div class="footer">
            ${this.renderAfterActions()}            
            <span class="detail">
                ${this.selection.length}/${this.items.length}
            </span>
        </div>`}renderInput(){return u`
            ${this._renderHeader()}            
            ${this._renderList()}
            ${this._renderFooter()}
        `}};exports.AutoFieldList.styles=[z.styles,w`
            sl-menu-item[checked]{
                background-color: var(--sl-color-primary-100);                
            } 
            .footer{
                padding:4px  0px ;
                padding-top:8px;
                display: flex;
                flex-direction: row;
                align-items: center;                
                &>.detail{            
                    flex-grow : 1;
                    text-align: right;
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-400);
                }
            }
            sl-menu-item::part(label){
                display: flex;
                flex-direction: row;
                align-items: center;
                & :first-child{
                    flex-grow: 1;
                }
            }
            .results{                
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                padding: 4px;
                box-sizing: border-box;
                border: var(--auto-border);                
                overflow-x: hidden;
                & > .item{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-radius: 4px;
                    padding: 4px;
                    border: var(--auto-border);
                    background-color: var(--sl-color-gray-50);
                    margin-bottom: 4px; 
                    box-shadow: 1px 1px 1px var(--sl-color-gray-200);
                    &:hover{
                        background-color: var(--sl-color-gray-100);
                    }
                    &>:first-child{
                        flex-grow: 1;                        
                        white-space: nowrap; 
                        overflow: hidden;    
                        text-overflow: ellipsis;  
                    }
                }
            } 
            
        `],x([T()],exports.AutoFieldList.prototype,"selectedTips",2),x([A("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=x([R("auto-field-list")],exports.AutoFieldList);var ya=w`
  :host {
    display: inline-block;
  }
`;var xa=null,Ko=class{};Ko.render=function(t,i){xa(t,i);};self.QrCreator=Ko;(function(t){function i(c,l,p,f){var h={},m=t(p,l);m.u(c),m.J(),f=f||0;var g=m.h(),b=m.h()+2*f;return h.text=c,h.level=l,h.version=p,h.O=b,h.a=function(v,E){return v-=f,E-=f,0>v||v>=g||0>E||E>=g?false:m.a(v,E)},h}function e(c,l,p,f,h,m,g,b,v,E){function $(_,S,y,k,V,F,U){_?(c.lineTo(S+F,y+U),c.arcTo(S,y,k,V,m)):c.lineTo(S,y);}g?c.moveTo(l+m,p):c.moveTo(l,p),$(b,f,p,f,h,-m,0),$(v,f,h,l,h,0,-m),$(E,l,h,l,p,m,0),$(g,l,p,f,p,0,m);}function o(c,l,p,f,h,m,g,b,v,E){function $(_,S,y,k){c.moveTo(_+y,S),c.lineTo(_,S),c.lineTo(_,S+k),c.arcTo(_,S,_+y,S,m);}g&&$(l,p,m,m),b&&$(f,p,-m,m),v&&$(f,h,-m,-m),E&&$(l,h,m,-m);}function r(c,l){var p=l.fill;if(typeof p=="string")c.fillStyle=p;else {var f=p.type,h=p.colorStops;if(p=p.position.map(g=>Math.round(g*l.size)),f==="linear-gradient")var m=c.createLinearGradient.apply(c,p);else if(f==="radial-gradient")m=c.createRadialGradient.apply(c,p);else throw Error("Unsupported fill");h.forEach(([g,b])=>{m.addColorStop(g,b);}),c.fillStyle=m;}}function s(c,l){t:{var p=l.text,f=l.v,h=l.N,m=l.K,g=l.P;for(h=Math.max(1,h||1),m=Math.min(40,m||40);h<=m;h+=1)try{var b=i(p,f,h,g);break t}catch{}b=void 0;}if(!b)return null;for(p=c.getContext("2d"),l.background&&(p.fillStyle=l.background,p.fillRect(l.left,l.top,l.size,l.size)),f=b.O,m=l.size/f,p.beginPath(),g=0;g<f;g+=1)for(h=0;h<f;h+=1){var v=p,E=l.left+h*m,$=l.top+g*m,_=g,S=h,y=b.a,k=E+m,V=$+m,F=_-1,U=_+1,D=S-1,L=S+1,lt=Math.floor(Math.min(.5,Math.max(0,l.R))*m),rt=y(_,S),bt=y(F,D),xt=y(F,S);F=y(F,L);var vt=y(_,L);L=y(U,L),S=y(U,S),U=y(U,D),_=y(_,D),E=Math.round(E),$=Math.round($),k=Math.round(k),V=Math.round(V),rt?e(v,E,$,k,V,lt,!xt&&!_,!xt&&!vt,!S&&!vt,!S&&!_):o(v,E,$,k,V,lt,xt&&_&&bt,xt&&vt&&F,S&&vt&&L,S&&_&&U);}return r(p,l),p.fill(),c}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};xa=function(c,l){var p={};Object.assign(p,n,c),p.N=p.minVersion,p.K=p.maxVersion,p.v=p.ecLevel,p.left=p.left,p.top=p.top,p.size=p.size,p.fill=p.fill,p.background=p.background,p.text=p.text,p.R=p.radius,p.P=p.quiet,l instanceof HTMLCanvasElement?((l.width!==p.size||l.height!==p.size)&&(l.width=p.size,l.height=p.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,p)):(c=document.createElement("canvas"),c.width=p.size,c.height=p.size,p=s(c,p),l.appendChild(p));};})(function(){function t(l){var p=e.s(l);return {S:function(){return 4},b:function(){return p.length},write:function(f){for(var h=0;h<p.length;h+=1)f.put(p[h],8);}}}function i(){var l=[],p=0,f={B:function(){return l},c:function(h){return (l[Math.floor(h/8)]>>>7-h%8&1)==1},put:function(h,m){for(var g=0;g<m;g+=1)f.m((h>>>m-g-1&1)==1);},f:function(){return p},m:function(h){var m=Math.floor(p/8);l.length<=m&&l.push(0),h&&(l[m]|=128>>>p%8),p+=1;}};return f}function e(l,p){function f(_,S){for(var y=-1;7>=y;y+=1)if(!(-1>=_+y||b<=_+y))for(var k=-1;7>=k;k+=1) -1>=S+k||b<=S+k||(g[_+y][S+k]=0<=y&&6>=y&&(k==0||k==6)||0<=k&&6>=k&&(y==0||y==6)||2<=y&&4>=y&&2<=k&&4>=k);}function h(_,S){for(var y=b=4*l+17,k=Array(y),V=0;V<y;V+=1){k[V]=Array(y);for(var F=0;F<y;F+=1)k[V][F]=null;}for(g=k,f(0,0),f(b-7,0),f(0,b-7),y=s.G(l),k=0;k<y.length;k+=1)for(V=0;V<y.length;V+=1){F=y[k];var U=y[V];if(g[F][U]==null)for(var D=-2;2>=D;D+=1)for(var L=-2;2>=L;L+=1)g[F+D][U+L]=D==-2||D==2||L==-2||L==2||D==0&&L==0;}for(y=8;y<b-8;y+=1)g[y][6]==null&&(g[y][6]=y%2==0);for(y=8;y<b-8;y+=1)g[6][y]==null&&(g[6][y]=y%2==0);for(y=s.w(m<<3|S),k=0;15>k;k+=1)V=!_&&(y>>k&1)==1,g[6>k?k:8>k?k+1:b-15+k][8]=V,g[8][8>k?b-k-1:9>k?15-k:14-k]=V;if(g[b-8][8]=!_,7<=l){for(y=s.A(l),k=0;18>k;k+=1)V=!_&&(y>>k&1)==1,g[Math.floor(k/3)][k%3+b-8-3]=V;for(k=0;18>k;k+=1)V=!_&&(y>>k&1)==1,g[k%3+b-8-3][Math.floor(k/3)]=V;}if(v==null){for(_=c.I(l,m),y=i(),k=0;k<E.length;k+=1)V=E[k],y.put(4,4),y.put(V.b(),s.f(4,l)),V.write(y);for(k=V=0;k<_.length;k+=1)V+=_[k].j;if(y.f()>8*V)throw Error("code length overflow. ("+y.f()+">"+8*V+")");for(y.f()+4<=8*V&&y.put(0,4);y.f()%8!=0;)y.m(false);for(;!(y.f()>=8*V)&&(y.put(236,8),!(y.f()>=8*V));)y.put(17,8);var lt=0;for(V=k=0,F=Array(_.length),U=Array(_.length),D=0;D<_.length;D+=1){var rt=_[D].j,bt=_[D].o-rt;for(k=Math.max(k,rt),V=Math.max(V,bt),F[D]=Array(rt),L=0;L<F[D].length;L+=1)F[D][L]=255&y.B()[L+lt];for(lt+=rt,L=s.C(bt),rt=o(F[D],L.b()-1).l(L),U[D]=Array(L.b()-1),L=0;L<U[D].length;L+=1)bt=L+rt.b()-U[D].length,U[D][L]=0<=bt?rt.c(bt):0;}for(L=y=0;L<_.length;L+=1)y+=_[L].o;for(y=Array(y),L=lt=0;L<k;L+=1)for(D=0;D<_.length;D+=1)L<F[D].length&&(y[lt]=F[D][L],lt+=1);for(L=0;L<V;L+=1)for(D=0;D<_.length;D+=1)L<U[D].length&&(y[lt]=U[D][L],lt+=1);v=y;}for(_=v,y=-1,k=b-1,V=7,F=0,S=s.F(S),U=b-1;0<U;U-=2)for(U==6&&--U;;){for(D=0;2>D;D+=1)g[k][U-D]==null&&(L=false,F<_.length&&(L=(_[F]>>>V&1)==1),S(k,U-D)&&(L=!L),g[k][U-D]=L,--V,V==-1&&(F+=1,V=7));if(k+=y,0>k||b<=k){k-=y,y=-y;break}}}var m=r[p],g=null,b=0,v=null,E=[],$={u:function(_){_=t(_),E.push(_),v=null;},a:function(_,S){if(0>_||b<=_||0>S||b<=S)throw Error(_+","+S);return g[_][S]},h:function(){return b},J:function(){for(var _=0,S=0,y=0;8>y;y+=1){h(true,y);var k=s.D($);(y==0||_>k)&&(_=k,S=y);}h(false,S);}};return $}function o(l,p){if(typeof l.length>"u")throw Error(l.length+"/"+p);var f=function(){for(var m=0;m<l.length&&l[m]==0;)m+=1;for(var g=Array(l.length-m+p),b=0;b<l.length-m;b+=1)g[b]=l[b+m];return g}(),h={c:function(m){return f[m]},b:function(){return f.length},multiply:function(m){for(var g=Array(h.b()+m.b()-1),b=0;b<h.b();b+=1)for(var v=0;v<m.b();v+=1)g[b+v]^=n.i(n.g(h.c(b))+n.g(m.c(v)));return o(g,0)},l:function(m){if(0>h.b()-m.b())return h;for(var g=n.g(h.c(0))-n.g(m.c(0)),b=Array(h.b()),v=0;v<h.b();v+=1)b[v]=h.c(v);for(v=0;v<m.b();v+=1)b[v]^=n.i(n.g(m.c(v))+g);return o(b,0).l(m)}};return h}e.s=function(l){for(var p=[],f=0;f<l.length;f++){var h=l.charCodeAt(f);128>h?p.push(h):2048>h?p.push(192|h>>6,128|h&63):55296>h||57344<=h?p.push(224|h>>12,128|h>>6&63,128|h&63):(f++,h=65536+((h&1023)<<10|l.charCodeAt(f)&1023),p.push(240|h>>18,128|h>>12&63,128|h>>6&63,128|h&63));}return p};var r={L:1,M:0,Q:3,H:2},s=function(){function l(h){for(var m=0;h!=0;)m+=1,h>>>=1;return m}var p=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],f={w:function(h){for(var m=h<<10;0<=l(m)-l(1335);)m^=1335<<l(m)-l(1335);return (h<<10|m)^21522},A:function(h){for(var m=h<<12;0<=l(m)-l(7973);)m^=7973<<l(m)-l(7973);return h<<12|m},G:function(h){return p[h-1]},F:function(h){switch(h){case 0:return function(m,g){return (m+g)%2==0};case 1:return function(m){return m%2==0};case 2:return function(m,g){return g%3==0};case 3:return function(m,g){return (m+g)%3==0};case 4:return function(m,g){return (Math.floor(m/2)+Math.floor(g/3))%2==0};case 5:return function(m,g){return m*g%2+m*g%3==0};case 6:return function(m,g){return (m*g%2+m*g%3)%2==0};case 7:return function(m,g){return (m*g%3+(m+g)%2)%2==0};default:throw Error("bad maskPattern:"+h)}},C:function(h){for(var m=o([1],0),g=0;g<h;g+=1)m=m.multiply(o([1,n.i(g)],0));return m},f:function(h,m){if(h!=4||1>m||40<m)throw Error("mode: "+h+"; type: "+m);return 10>m?8:16},D:function(h){for(var m=h.h(),g=0,b=0;b<m;b+=1)for(var v=0;v<m;v+=1){for(var E=0,$=h.a(b,v),_=-1;1>=_;_+=1)if(!(0>b+_||m<=b+_))for(var S=-1;1>=S;S+=1)0>v+S||m<=v+S||(_!=0||S!=0)&&$==h.a(b+_,v+S)&&(E+=1);5<E&&(g+=3+E-5);}for(b=0;b<m-1;b+=1)for(v=0;v<m-1;v+=1)E=0,h.a(b,v)&&(E+=1),h.a(b+1,v)&&(E+=1),h.a(b,v+1)&&(E+=1),h.a(b+1,v+1)&&(E+=1),(E==0||E==4)&&(g+=3);for(b=0;b<m;b+=1)for(v=0;v<m-6;v+=1)h.a(b,v)&&!h.a(b,v+1)&&h.a(b,v+2)&&h.a(b,v+3)&&h.a(b,v+4)&&!h.a(b,v+5)&&h.a(b,v+6)&&(g+=40);for(v=0;v<m;v+=1)for(b=0;b<m-6;b+=1)h.a(b,v)&&!h.a(b+1,v)&&h.a(b+2,v)&&h.a(b+3,v)&&h.a(b+4,v)&&!h.a(b+5,v)&&h.a(b+6,v)&&(g+=40);for(v=E=0;v<m;v+=1)for(b=0;b<m;b+=1)h.a(b,v)&&(E+=1);return g+=Math.abs(100*E/m/m-50)/5*10}};return f}(),n=function(){for(var l=Array(256),p=Array(256),f=0;8>f;f+=1)l[f]=1<<f;for(f=8;256>f;f+=1)l[f]=l[f-4]^l[f-5]^l[f-6]^l[f-8];for(f=0;255>f;f+=1)p[l[f]]=f;return {g:function(h){if(1>h)throw Error("glog("+h+")");return p[h]},i:function(h){for(;0>h;)h+=255;for(;256<=h;)h-=255;return l[h]}}}(),c=function(){function l(h,m){switch(m){case r.L:return p[4*(h-1)];case r.M:return p[4*(h-1)+1];case r.Q:return p[4*(h-1)+2];case r.H:return p[4*(h-1)+3]}}var p=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],f={I:function(h,m){var g=l(h,m);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+h+"/errorCorrectLevel:"+m);h=g.length/3,m=[];for(var b=0;b<h;b+=1)for(var v=g[3*b],E=g[3*b+1],$=g[3*b+2],_=0;_<v;_+=1){var S=$,y={};y.o=E,y.j=S,m.push(y);}return m}};return f}();return e}());var wa=QrCreator;var Bt=class extends O{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&wa.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return u`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${Z({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Bt.styles=[P,ya];a([A("canvas")],Bt.prototype,"canvas",2);a([d()],Bt.prototype,"value",2);a([d()],Bt.prototype,"label",2);a([d({type:Number})],Bt.prototype,"size",2);a([d()],Bt.prototype,"fill",2);a([d()],Bt.prototype,"background",2);a([d({type:Number})],Bt.prototype,"radius",2);a([d({attribute:"error-correction"})],Bt.prototype,"errorCorrection",2);a([I(["background","errorCorrection","fill","radius","size","value"])],Bt.prototype,"generate",1);Bt.define("sl-qr-code");exports.AutoFieldQRCode=class Go extends z{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return u`              
        <sl-qr-code 
            slot="value" 
            name=${this.name} 
            data-path = ${this.path}
            value=${this.value} 
            .placeholder=${this.options.placeholder}
            title="${C(this.options.tips)}"
            fill=${this.options.fill}
            background=${this.options.background}
            radius=${this.options.radius}
            error-correction=${this.options.errorCorrection} 
            size=${parseInt(String(this.options.size))}
        ></sl-qr-code > 
        `}};exports.AutoFieldQRCode=x([R("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class He extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let e=this.options.url,[o,r]=e.split("?"),s=new URLSearchParams(r);return s.set("t",Date.now().toString()),`${o}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return u`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,w`
            sl-button.action-widget.image::part(label){
                padding: 0px;
            }
        `],x([A("img")],exports.AutoFieldCaptcha.prototype,"img",2),x([T()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=x([R("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class Fe extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let e=this.stepCount,o=()=>{let r=Math.ceil(e*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",r.toString()),this.requestUpdate()),e--,e<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(o,this.step);};o();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let e=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(e)?Number(e[0]):Number(e),this.step=Array.isArray(e)?Number(e[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u8BD5");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles,w`
            
        `],x([T()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),x([T()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=x([R("auto-field-verifycode")],exports.AutoFieldVerifyCode);var _a=w`
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
`;var it=class Wr extends O{constructor(){super(...arguments),this.localize=new G(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(i){return i instanceof Element&&i.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await ae(this.childrenContainer);let{keyframes:i,options:e}=se(this,"tree-item.collapse",{dir:this.localize.dir()});await ne(this.childrenContainer,Or(i,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let i=this.parentElement;return !!i&&Wr.isTreeItem(i)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(i){i.has("selected")&&!i.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await ae(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:i,options:e}=se(this,"tree-item.expand",{dir:this.localize.dir()});await ne(this.childrenContainer,Or(i,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:i=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(e=>Wr.isTreeItem(e)&&(i||!e.disabled)):[]}render(){let i=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return u`
      <div
        part="base"
        class="${M({"tree-item":true,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":e,"tree-item--rtl":this.localize.dir()==="rtl"})}"
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
            class=${M({"tree-item__expand-button":true,"tree-item__expand-button--visible":e})}
            aria-hidden="true"
          >
            ${Q(this.loading,()=>u` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${i?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${i?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${Q(this.selectable,()=>u`
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
                ?checked="${Ot(this.selected)}"
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
    `}};it.styles=[P,_a];it.dependencies={"sl-checkbox":ot,"sl-icon":W,"sl-spinner":le};a([T()],it.prototype,"indeterminate",2);a([T()],it.prototype,"isLeaf",2);a([T()],it.prototype,"loading",2);a([T()],it.prototype,"selectable",2);a([d({type:Boolean,reflect:true})],it.prototype,"expanded",2);a([d({type:Boolean,reflect:true})],it.prototype,"selected",2);a([d({type:Boolean,reflect:true})],it.prototype,"disabled",2);a([d({type:Boolean,reflect:true})],it.prototype,"lazy",2);a([A("slot:not([name])")],it.prototype,"defaultSlot",2);a([A("slot[name=children]")],it.prototype,"childrenSlot",2);a([A(".tree-item__item")],it.prototype,"itemElement",2);a([A(".tree-item__children")],it.prototype,"childrenContainer",2);a([A(".tree-item__expand-button slot")],it.prototype,"expandButtonSlot",2);a([I("loading",{waitUntilFirstUpdate:true})],it.prototype,"handleLoadingChange",1);a([I("disabled")],it.prototype,"handleDisabledChange",1);a([I("selected")],it.prototype,"handleSelectedChange",1);a([I("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandedChange",1);a([I("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandAnimation",1);a([I("lazy",{waitUntilFirstUpdate:true})],it.prototype,"handleLazyChange",1);var Ne=it;re("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});re("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var ka=w`
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
`;function Ca(t,i=false){function e(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let c=n.every(p=>p.selected),l=n.every(p=>!p.selected&&!p.indeterminate);s.selected=c,s.indeterminate=!c&&!l;}}function o(s){let n=s.parentElement;Ne.isTreeItem(n)&&(e(n),o(n));}function r(s){for(let n of s.getChildrenItems())n.selected=i?s.selected||n.selected:!n.disabled&&s.selected,r(n);i&&e(s);}r(t),o(t);}var ke=class extends O{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new G(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(i=>!!this.querySelector(`[slot="${i}-icon"]`)).forEach(i=>{let e=t.querySelector(`[slot="${i}-icon"]`),o=this.getExpandButtonIcon(i);o&&(e===null?t.append(o):e.hasAttribute("data-default")&&e.replaceWith(o));});},this.handleTreeChanged=t=>{for(let i of t){let e=[...i.addedNodes].filter(Ne.isTreeItem),o=[...i.removedNodes].filter(Ne.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&o.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let i=t.relatedTarget;(!i||!this.contains(i))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let i=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),Ne.isTreeItem(i)&&!i.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=i,this.tabIndex=-1,i.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let e=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(e){let o=e.cloneNode(true);return [o,...o.querySelectorAll("[id]")].forEach(r=>r.removeAttribute("id")),o.setAttribute("data-default",""),o.slot=`${t}-icon`,o}return null}selectItem(t){let i=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),Ca(t);else if(this.selection==="single"||t.isLeaf){let o=this.getAllTreeItems();for(let r of o)r.selected=r===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let e=this.selectedItems;(i.length!==e.length||e.some(o=>!i.includes(o)))&&Promise.all(e.map(o=>o.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:e}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(r=>{var s;return ["input","textarea"].includes((s=r?.tagName)==null?void 0:s.toLowerCase())}))return;let i=this.getFocusableItems(),e=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(i.length>0){t.preventDefault();let r=i.findIndex(l=>l.matches(":focus")),s=i[r],n=l=>{let p=i[at(l,0,i.length-1)];this.focusItem(p);},c=l=>{s.expanded=l;};t.key==="ArrowDown"?n(r+1):t.key==="ArrowUp"?n(r-1):e&&t.key==="ArrowRight"||o&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(r+1):c(true):e&&t.key==="ArrowLeft"||o&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(r-1):c(false):t.key==="Home"?n(0):t.key==="End"?n(i.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let i=t.target,e=i.closest("sl-tree-item"),o=t.composedPath().some(r=>{var s;return (s=r?.classList)==null?void 0:s.contains("tree-item__expand-button")});!e||e.disabled||i!==this.clickTarget||(o?e.expanded=!e.expanded:this.selectItem(e));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",i=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let e of i)e.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>Ca(e,true)));}get selectedItems(){let t=this.getAllTreeItems(),i=e=>e.selected;return t.filter(i)}getFocusableItems(){let t=this.getAllTreeItems(),i=new Set;return t.filter(e=>{var o;if(e.disabled)return  false;let r=(o=e.parentElement)==null?void 0:o.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||i.has(r))&&i.add(e),!i.has(e)})}render(){return u`
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
    `}};ke.styles=[P,ka];a([A("slot:not([name])")],ke.prototype,"defaultSlot",2);a([A("slot[name=expand-icon]")],ke.prototype,"expandedIconSlot",2);a([A("slot[name=collapse-icon]")],ke.prototype,"collapsedIconSlot",2);a([d()],ke.prototype,"selection",2);a([I("selection")],ke.prototype,"handleSelectionChange",1);ke.define("sl-tree");Ne.define("sl-tree-item");exports.AutoFieldTreeSelect=class Ce extends z{constructor(){super(...arguments);this.nodes={};this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}connectedCallback(){if(super.connectedCallback(),this.options){this.idKey=this.options.idKey,this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let e=this.options.items;e&&(this.nodes=e,this._forEachTree((o,r,s,n)=>{s<1&&o.expanded===void 0&&(o.expanded=true),this.isItemSelected(o)&&(o.selected=true,this.selection.push({id:o[this.idKey],value:o[this.valueKey],path:n.join("/")}));}));}}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.valueKey]:this.value.includes(e[this.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e){let o=(s,n,c,l)=>{let p=[...l,s[this.labelKey]];if(e(s,n,c,p),s.children){let f=c+1;s.children.forEach(h=>{o(h,s,f,[...p]);});}};(Array.isArray(this.nodes)?this.nodes:[this.nodes]).forEach(s=>{o(s,void 0,0,[]);});}_renderNode(e,o,r){let s=o.includes(e[this.valueKey]),n=[...r,e[this.labelKey]];return u`<sl-tree-item 
            data-id=${String(e[this.idKey])}
            data-value=${String(e[this.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${e.expanded}
        >${e.label}        
        ${Array.isArray(e.children)?u`${e.children.map(c=>this._renderNode(c,o,n))}`:""}</sl-tree-item>`}_renderNodes(e){let o=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(r=>this._renderNode(r,o,[])):this._renderNode(e,o,[])}onSelectionChange(e){let o=Array.from(e.detail.selection);o&&(this.selection=o.map(r=>({id:r.dataset.id,value:r.dataset.value,path:r.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}renderTree(){return u`
        <sl-tree 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}   
            size=${this.context.size}
            selection = "${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
            @sl-selection-change=${this.onSelectionChange.bind(this)}
        >${this._renderNodes(this.nodes)}</sl-tree> 
        `}renderInput(){return u`              
            ${this.renderTree()}
        `}};exports.AutoFieldTreeSelect.styles=[z.styles,w`
            sl-tree{
                padding: 0.2em;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
            }
    `],exports.AutoFieldTreeSelect=x([R("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class Be extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(e){let o=e.target.dataset.id;for(let r=0;r<this.selection.length;r++)if(String(this.selection[r].id)===o){this.selection.splice(r,1),this.onFieldChange(),this.requestUpdate();break}e.stopPropagation();}getShowItemValue(e,o,r){if(o===r)return e}getSelectedTagValue(e){if(this.options.showAsPath)return u`${e.path}`;{let r=e.path.split("/");return r[r.length-1]}}renderSelectedTags(){let e=this.selection;return u`<span class="tags">${yt(e,o=>u`<sl-tag 
                    data-id="${o.id}" 
                    title=${o.path}
                    @sl-remove=${this._onRemoveSelection.bind(this)}
                    @click=${r=>r.stopPropagation()}
                    removable
                    >${this.getSelectedTagValue(o)}</sl-tag>`)}</span>`}renderSelection(){return u`    
            <div class="selection" slot="trigger">              
                ${Q(this.selection.length===0&&this.options.placeholder,()=>u`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderSelectedTags()}
                <span class='suffix'>
                    <sl-icon library="system" class="chevron ${M({active:this.active})}" 
                        name="chevron-down" aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}renderInput(){return u`             
        <sl-dropdown          
            size="${this.context.size}"    
            @sl-show="${this._onShowPopup.bind(this)}" 
            @sl-after-hide="${this._onHidePopup.bind(this)}" 
            sync="width"
        >
            ${this.renderSelection()}
            <div>
                ${this.renderTree()}            
            </div>
        </sl-dropdown> 
        `}};exports.AutoFieldTreeDropdown.styles=[z.styles,exports.AutoFieldTreeSelect.styles,w`
            sl-dropdown{
                width: 100%;                
            } 
            sl-tree{ 
                background-color: var(--sl-color-neutral-0); 
            }
            .selection{
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
                max-height:12rem;
                overflow-y: auto;
                overflow-x: hidden;
                &>.tags{
                    flex-grow: 1;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                &>.suffix{
                    cursor: pointer;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                sl-tag{
                    margin-right: 0.5rem;
                    margin-top: 0.2rem;
                    margin-bottom: 0.2rem;
                }
            } 
            sl-icon.chevron{
                transition: all 0.2s ease-in;
                &.active{
                    transform: rotate(-180deg);
                }
            }
            .placeholder{
                padding-left: 0.5rem;
                color: var(--sl-input-placeholder-color);
            }
        `],x([T()],exports.AutoFieldTreeDropdown.prototype,"active",2),x([A("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=x([R("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);exports.AutoFieldCustom=class Ue extends z{constructor(){super(...arguments);this.selection=[];this.active=false;this.content=null;}getInitialOptions(){return {placeholder:"\u8BF7\u9009\u62E9",dropdown:false}}connectedCallback(){super.connectedCallback(),this.content=this.ownerDocument.querySelector(this.options.content),this.customValue=this.value,this._onCustomInput();}disconnectedCallback(){super.disconnectedCallback(),this.content&&(this.content.style.display="none",this.ownerDocument.body.appendChild(this.content));}_onShowPopup(){this.content&&(this.container?.appendChild(this.content),this.content.style.display="block"),this.active=true;}_onHidePopup(){this.active=false;}_onCustomInput(){this.content?.addEventListener("auto-input",e=>{this.customValue=e.detail.value,this.onFieldInput();});}firstUpdated(){if(this.content&&!this.options.dropdown){let e=this.shadow.querySelector(".value");e&&e.appendChild(this.content),this.content.style.display="block";}}getInputValue(){return this.customValue}renderCustomValue(){return u`<span class="custom-value">${Pt(this.options.toRender?this.options.toRender(this.customValue):this.customValue)}</span>`}renderSelection(){return u`    
            <div class="selection" slot="trigger">              
                ${Q(!this.customValue&&this.options.placeholder,()=>u`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderCustomValue()}
                <span class='suffix'>
                    <sl-icon library="system" 
                        class="chevron ${M({active:this.active})}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}renderCustom(){return u`<div class="container"></div>`}renderInput(){return this.options.dropdown?u`
                <sl-dropdown          
                    size="${this.context.size}"    
                    @sl-show="${this._onShowPopup.bind(this)}" 
                    @sl-after-hide="${this._onHidePopup.bind(this)}" 
                    sync="width"
                >
                ${this.renderSelection()}  
                ${this.renderCustom()}      
            </sl-dropdown> 
            `:u``}};exports.AutoFieldCustom.styles=[z.styles,w`
            sl-dropdown{
                width: 100%;                
            } 
            .selection{
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: var(--auto-border);
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
                min-height: var(--sl-input-height-medium);
                padding: 0px 0.5em;
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                max-height:1rem;
                overflow-y: auto;
                overflow-x: hidden;
                &>.custom-value{
                    flex-grow: 1;
                    padding-left: 0.5em;
                    padding-right: 0.5em;
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
            } 
            .container{
                min-height: 1em;
                position: relative;
                border: var(--auto-border);
                background-color: var(--sl-input-background-color);
            }            
            sl-icon.chevron{
                transition: all 0.2s ease-in;
                &.active{
                    transform: rotate(-180deg);
                }
            }
        `],x([T()],exports.AutoFieldCustom.prototype,"active",2),x([A(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=x([R("auto-field-custom")],exports.AutoFieldCustom);function Yo(t,i){let e=t.width,o=t.height,r=t.widget,s;try{s=document.createElement(`auto-field-${r||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=t,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),i?.styles&&Object.assign(s.style,i.styles),i?.attrs){for(let n in i.attrs)s.setAttribute(n,String(i.attrs[n]));s.parent=i.parent;}return e&&(s.style.width=String(e)),o&&(s.style.height=String(o)),i?.classs&&(typeof i.classs=="string"?s.classList.add(i.classs):typeof i.classs=="object"&&Object.entries(i.classs).forEach(([n,c])=>{c?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class ji extends z{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange();};}getInitialOptions(){return {children:[]}}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("field-change",this._handleChildrenChange);}_onChildrenChange(){this.options.children.length>0&&this.shadow.addEventListener("field-change",this._handleChildrenChange);}getInputValue(){let e=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),o=[];return e.forEach(r=>{if(r.tagName.startsWith("AUTO-FIELD-")){let s=r.getInputValue();s===""&&(s=r.value),o.push(s);}}),o}renderInput(){return u`
            <div class="children">
                ${yt(this.options.children,e=>u`${Yo(e,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[z.styles,w`
            .value > .children{
                display: flex;
                flex-wrap: wrap;
            }
        `],exports.AutoFieldCombine=x([R("auto-field-combine")],exports.AutoFieldCombine);j.define("sl-button");H.define("sl-input");var $a=w`
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
`;var Ki=class extends O{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};Ki.styles=[P,$a];a([d({type:Boolean,reflect:true})],Ki.prototype,"vertical",2);a([I("vertical")],Ki.prototype,"handleVerticalChange",1);Ki.define("sl-divider");ct.define("sl-dropdown");le.define("sl-spinner");W.define("sl-icon");var Sa=w`
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

`;var zt=class extends _t{constructor(){super(...arguments);this.classes=new ve(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let e=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=e,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(o=>{o.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(o=>{o.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(e,o,r){super.attributeChangedCallback(e,o,r),this.updateStyles();}render(){return u` 
            <slot ></slot> 
        `}};zt.styles=Sa,x([d({type:String})],zt.prototype,"direction",2),x([d({type:String})],zt.prototype,"gap",2),x([d({type:Boolean})],zt.prototype,"wrap",2),x([d({type:String})],zt.prototype,"align",2),x([d({type:String})],zt.prototype,"justify",2),x([d({type:String})],zt.prototype,"border",2),x([d({type:String})],zt.prototype,"grow",2),x([d({type:String})],zt.prototype,"shrink",2),x([d({type:Boolean,reflect:true})],zt.prototype,"fit",2),zt=x([R("magic-flex")],zt);var Ea=w`
:host{
    --auto-theme-color: var(--sl-color-primary-500);    
    --auto-text-color: var(--sl-color-gray-700);    
    --auto-gray-color: var(--sl-color-gray-500);    
    --auto-bgcolor: var(--sl-color-neutral-0);    
    --auto-line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 4);    
    --auto-font-size: var(--sl-font-size-medium);    
    --auto-spacing: var(--sl-spacing-medium);                    /* 用于内边距和外边距 */
    --auto-border-color: var(--sl-color-neutral-300);
    --auto-border: 1px solid var(--auto-border-color);    
    --auto-border-radius: var(--sl-border-radius-medium);
    --auto-shadow: var(--sl-shadow-medium);  
    --auto-workspace-color: var(--sl-color-gray-100);          
}
:host([size=small]){ 
    --auto-font-size: var(--sl-font-size-small);    
    --auto-spacing: var(--sl-spacing-small);                    /* 用于内边距和外边距 */
    --auto-border-radius: var(--sl-border-radius-small);
    --auto-shadow: var(--sl-shadow-small);    
    --auto-line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 4);    

}
:host([size=large]){ 
    --auto-font-size: var(--sl-font-size-large);    
    --auto-spacing: var(--sl-spacing-large);                    /* 用于内边距和外边距 */
    --auto-border-radius: var(--sl-border-radius-large);
    --auto-shadow: var(--sl-shadow-large);    
    --auto-line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 4);    
} 

auto-form.error{
    --auto-border: 1px solid red;
    --auto-text-color: red; 
    
}`;var Aa=w`
    ${Ea}
    :host{
        display: flex;
        position: relative;
        flex-direction:column;
        width:100%;         
        font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
        & > .fields{
            & > * {
                width: 100%;
                box-sizing: border-box;                 
            }
        }    
    }   
    /* 布局 */
    :host([layout=auto]){
        & > .fields{
            & > * {
                width: 100%;
                box-sizing: border-box;                 
                display: inline-block;
            }    
        }
    }
    :host([layout=row]){
        & > .fields{
            display: flex;
            flex-direction: row;
            & > * {
                width: auto;
                border-bottom: none!important; 
            }
        }
    }
    :host([layout=col]){
        & > .fields{
            display: flex;
            flex-direction: column;
        }
    }

    /* 网格线 */
    :host([border=none]){
        border: none; 
        & > .fields {
            & > * {
                border: none;
            }
        }
    }
    :host([border=outline]){
        border: 1px solid var(--sl-input-border-color); 
        & > .fields {
            & > * {
                border: none;
            }
        }
    }
    :host([border=grid]){
        border: 1px solid var(--sl-input-border-color);
        border-left: none;
        & > .fields > :last-child{
            border-bottom: none;
        }            
        & > .fields {
            & > * {
                border-bottom: 1px solid var(--sl-input-border-color);
                border-left: 1px solid var(--sl-input-border-color);
            }
        }
    }
    
`;var jr={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>'};exports.AutoForm=class tt extends _t{constructor(){super(...arguments);this.classs=new ve(this);this.theme=new Xe(this);this.context={};this.schemas=[];this.showInitialError=false;this.compact=false;this.seq=++exports.AutoForm.seq;this.advanced=true;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this.iconLibrary="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg";}registerIcons(e,o){yr("default",{resolver:e,...o||{}});}connectedCallback(){super.connectedCallback(),this.registerIcons(e=>e in jr?`data:image/svg+xml,${encodeURIComponent(jr[e])}`:this.iconLibrary.replace("{name}",e));}attributeChangedCallback(e,o,r){super.attributeChangedCallback(e,o,r),["group","sort","advanced","path"].includes(e)&&setTimeout(()=>this._load());}_load(e=true){if(!this.store)return;Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalide:Object.keys(this.store.schemas.errors).length>0,showInitialError:this.showInitialError});let o=this.path?this.store.schemas.find(this.path):Object.values(this.store.schemas.store.state),r=s=>{if(!this.group||["","*"].includes(this.group))return  true;let n=(s.group||"").split(","),c=this.group.split(",");return n.some(l=>c.includes(l))};this.schemas=Object.values(o).filter(s=>!(!r(s)||this.advanced===false&&s.advanced)).sort((s,n)=>(s.order||0)-(n.order||0)),e&&this.requestUpdate();}bind(e){this.store=e,this._load();}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(o=>{o.tagName.startsWith("auto-field")&&(o.invalidMessage=void 0);}),this.requestUpdate();}_renderFields(){return u`            
                ${this.schemas.map(e=>u`${Yo(e)}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact}),u`            
            <div class="actions header"></div>
            <div class="fields">
                ${this._renderFields()}
            </div>
            <div class="actions footer"></div>
        `}reset(){this.store?.reset();}submit(e){if(typeof e=="function"){let o=this.store?.schemas.getValues()||{},r=this.store?.schemas.errors;e(o,r);}}};exports.AutoForm.seq=0,exports.AutoForm.styles=Aa,x([dr({context:co})],exports.AutoForm.prototype,"context",2),x([d({type:Boolean,reflect:true})],exports.AutoForm.prototype,"showInitialError",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"group",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"path",2),x([d({type:Boolean,reflect:true})],exports.AutoForm.prototype,"compact",2),x([d({type:Boolean,reflect:true})],exports.AutoForm.prototype,"advanced",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"validAt",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"border",2),x([d({type:String})],exports.AutoForm.prototype,"size",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"labelPos",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"labelWidth",2),x([d({type:Boolean,reflect:true})],exports.AutoForm.prototype,"dark",2),x([d({type:Boolean,reflect:true})],exports.AutoForm.prototype,"readonly",2),x([d({type:Boolean,reflect:true})],exports.AutoForm.prototype,"viewonly",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"viewAlign",2),x([d({type:String,reflect:true})],exports.AutoForm.prototype,"layout",2),x([d({type:String})],exports.AutoForm.prototype,"iconLibrary",2),exports.AutoForm=x([R("auto-form")],exports.AutoForm);/*! Bundled license information:

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
*/exports.AutoField=z;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map