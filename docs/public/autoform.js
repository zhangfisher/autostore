var AutoForm=(function(exports){'use strict';var Ea=Object.defineProperty;var Aa=Object.getOwnPropertyDescriptor;var x=(t,e,i,o)=>{for(var r=o>1?void 0:o?Aa(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&Ea(e,i,r),r};var Zi=globalThis,Ki=Zi.trustedTypes,Wr=Ki?Ki.createPolicy("lit-html",{createHTML:t=>t}):void 0,Yo="$lit$",Jt=`lit$${Math.random().toFixed(9).slice(2)}$`,Xo="?"+Jt,Ta=`<${Xo}>`,Ee=Zi.document===void 0?{createTreeWalker:()=>({})}:document,li=()=>Ee.createComment(""),ci=t=>t===null||typeof t!="object"&&typeof t!="function",Qo=Array.isArray,Qr=t=>Qo(t)||typeof t?.[Symbol.iterator]=="function",Go=`[ 	
\f\r]`,ai=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jr=/-->/g,Kr=/>/g,$e=RegExp(`>|${Go}(?:([^\\s"'>=/]+)(${Go}*=${Go}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gr=/'/g,Yr=/"/g,Jr=/^(?:script|style|textarea|title)$/i,Jo=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),f=Jo(1),rt=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Xr=new WeakMap,Se=Ee.createTreeWalker(Ee,129);function es(t,e){if(!Qo(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wr!==void 0?Wr.createHTML(e):e}var is=(t,e)=>{let i=t.length-1,o=[],r,s=e===2?"<svg>":e===3?"<math>":"",n=ai;for(let c=0;c<i;c++){let l=t[c],p,m,d=-1,u=0;for(;u<l.length&&(n.lastIndex=u,m=n.exec(l),m!==null);)u=n.lastIndex,n===ai?m[1]==="!--"?n=jr:m[1]!==void 0?n=Kr:m[2]!==void 0?(Jr.test(m[2])&&(r=RegExp("</"+m[2],"g")),n=$e):m[3]!==void 0&&(n=$e):n===$e?m[0]===">"?(n=r??ai,d=-1):m[1]===void 0?d=-2:(d=n.lastIndex-m[2].length,p=m[1],n=m[3]===void 0?$e:m[3]==='"'?Yr:Gr):n===Yr||n===Gr?n=$e:n===jr||n===Kr?n=ai:(n=$e,r=void 0);let g=n===$e&&t[c+1].startsWith("/>")?" ":"";s+=n===ai?l+Ta:d>=0?(o.push(p),l.slice(0,d)+Yo+l.slice(d)+Jt+g):l+Jt+(d===-2?c:g);}return [es(t,s+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},hi=class t{constructor({strings:e,_$litType$:i},o){let r;this.parts=[];let s=0,n=0,c=e.length-1,l=this.parts,[p,m]=is(e,i);if(this.el=t.createElement(p,o),Se.currentNode=this.el.content,i===2||i===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes);}for(;(r=Se.nextNode())!==null&&l.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(Yo)){let u=m[n++],g=r.getAttribute(d).split(Jt),b=/([.?@])?(.*)/.exec(u);l.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?Yi:b[1]==="?"?Xi:b[1]==="@"?Qi:Te}),r.removeAttribute(d);}else d.startsWith(Jt)&&(l.push({type:6,index:s}),r.removeAttribute(d));if(Jr.test(r.tagName)){let d=r.textContent.split(Jt),u=d.length-1;if(u>0){r.textContent=Ki?Ki.emptyScript:"";for(let g=0;g<u;g++)r.append(d[g],li()),Se.nextNode(),l.push({type:2,index:++s});r.append(d[u],li());}}}else if(r.nodeType===8)if(r.data===Xo)l.push({type:2,index:s});else {let d=-1;for(;(d=r.data.indexOf(Jt,d+1))!==-1;)l.push({type:7,index:s}),d+=Jt.length-1;}s++;}}static createElement(e,i){let o=Ee.createElement("template");return o.innerHTML=e,o}};function Ae(t,e,i=t,o){if(e===rt)return e;let r=o!==void 0?i._$Co?.[o]:i._$Cl,s=ci(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(false),s===void 0?r=void 0:(r=new s(t),r._$AT(t,i,o)),o!==void 0?(i._$Co??=[])[o]=r:i._$Cl=r),r!==void 0&&(e=Ae(t,r._$AS(t,e.values),r,o)),e}var Gi=class{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:i},parts:o}=this._$AD,r=(e?.creationScope??Ee).importNode(i,true);Se.currentNode=r;let s=Se.nextNode(),n=0,c=0,l=o[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new qe(s,s.nextSibling,this,e):l.type===1?p=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(p=new Ji(s,this,e)),this._$AV.push(p),l=o[++c];}n!==l?.index&&(s=Se.nextNode(),n++);}return Se.currentNode=Ee,r}p(e){let i=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,i),i+=o.strings.length-2):o._$AI(e[i])),i++;}},qe=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,i,o,r){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??true;}get parentNode(){let e=this._$AA.parentNode,i=this._$AM;return i!==void 0&&e?.nodeType===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=Ae(this,e,i),ci(e)?e===Y||e==null||e===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==rt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Qr(e)?this.k(e):this._(e);}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e));}_(e){this._$AH!==Y&&ci(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ee.createTextNode(e)),this._$AH=e;}$(e){let{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=hi.createElement(es(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(i);else {let s=new Gi(r,this),n=s.u(this.options);s.p(i),this.T(n),this._$AH=s;}}_$AC(e){let i=Xr.get(e.strings);return i===void 0&&Xr.set(e.strings,i=new hi(e)),i}k(e){Qo(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,o,r=0;for(let s of e)r===i.length?i.push(o=new t(this.O(li()),this.O(li()),this,this.options)):o=i[r],o._$AI(s),r++;r<i.length&&(this._$AR(o&&o._$AB.nextSibling,r),i.length=r);}_$AR(e=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);e&&e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o;}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e));}},Te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,o,r,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=i,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Y;}_$AI(e,i=this,o,r){let s=this.strings,n=false;if(s===void 0)e=Ae(this,e,i,0),n=!ci(e)||e!==this._$AH&&e!==rt,n&&(this._$AH=e);else {let c=e,l,p;for(e=s[0],l=0;l<s.length-1;l++)p=Ae(this,c[o+l],i,l),p===rt&&(p=this._$AH[l]),n||=!ci(p)||p!==this._$AH[l],p===Y?e=Y:e!==Y&&(e+=(p??"")+s[l+1]),this._$AH[l]=p;}n&&!r&&this.j(e);}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"");}},Yi=class extends Te{constructor(){super(...arguments),this.type=3;}j(e){this.element[this.name]=e===Y?void 0:e;}},Xi=class extends Te{constructor(){super(...arguments),this.type=4;}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Y);}},Qi=class extends Te{constructor(e,i,o,r,s){super(e,i,o,r,s),this.type=5;}_$AI(e,i=this){if((e=Ae(this,e,i,0)??Y)===rt)return;let o=this._$AH,r=e===Y&&o!==Y||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==Y&&(o===Y||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e;}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e);}},Ji=class{constructor(e,i,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=o;}get _$AU(){return this._$AM._$AU}_$AI(e){Ae(this,e);}},os={I:qe},Ia=Zi.litHtmlPolyfillSupport;Ia?.(hi,qe),(Zi.litHtmlVersions??=[]).push("3.3.0");var rs=(t,e,i)=>{let o=i?.renderBefore??e,r=o._$litPart$;if(r===void 0){let s=i?.renderBefore??null;o._$litPart$=r=new qe(e.insertBefore(li(),s),s,void 0,i??{});}return r._$AI(t),r};var C=t=>t??Y;var ss=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(e){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=e;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var Gt=function(t,e,i,o,r){if(typeof e=="function"?t!==e||true:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(t,i),i},ut=function(t,e,i,o){if(typeof e=="function"?t!==e||true:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return i==="m"?o:i==="a"?o.call(t):o?o.value:e.get(t)},We,to,eo,di,Zo,pi,io,Ie,ui,pe,oo,ns,as=t=>typeof t=="boolean"?t:t?.capture??false;var za=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(e,i,o){if(i==null)return;let r=as(o)?this.__captureEventListeners:this.__eventListeners,s=r.get(e);if(s===void 0)s=new Map,r.set(e,s);else if(s.has(i))return;let n=typeof o=="object"&&o?o:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(e,i,o)),s.set(i,n??{});}removeEventListener(e,i,o){if(i==null)return;let r=as(o)?this.__captureEventListeners:this.__eventListeners,s=r.get(e);s!==void 0&&(s.delete(i),s.size||r.delete(e));}dispatchEvent(e){let i=[this],o=this.__eventTargetParent;if(e.composed)for(;o;)i.push(o),o=o.__eventTargetParent;else for(;o&&o!==this.__host;)i.push(o),o=o.__eventTargetParent;let r=false,s=false,n=0,c=null,l=null,p=null,m=e.stopPropagation,d=e.stopImmediatePropagation;Object.defineProperties(e,{target:{get(){return c??l},...X},srcElement:{get(){return e.target},...X},currentTarget:{get(){return p},...X},eventPhase:{get(){return n},...X},composedPath:{value:()=>i,...X},stopPropagation:{value:()=>{r=true,m.call(e);},...X},stopImmediatePropagation:{value:()=>{s=true,d.call(e);},...X}});let u=($,w,S)=>{typeof $=="function"?$(e):typeof $?.handleEvent=="function"&&$.handleEvent(e),w.once&&S.delete($);},g=()=>(p=null,n=0,!e.defaultPrevented),b=i.slice().reverse();c=!this.__host||!e.composed?this:null;let v=$=>{for(l=this;l.__host&&$.includes(l.__host);)l=l.__host;};for(let $ of b){!c&&(!l||l===$.__host)&&v(b.slice(b.indexOf($))),p=$,n=$===e.target?2:1;let w=$.__captureEventListeners.get(e.type);if(w){for(let[S,y]of w)if(u(S,y,w),s)return g()}if(r)return g()}let E=e.bubbles?i:[this];l=null;for(let $ of E){!c&&(!l||$===l.__host)&&v(E.slice(0,E.indexOf($)+1)),p=$,n=$===e.target?2:3;let w=$.__eventListeners.get(e.type);if(w){for(let[S,y]of w)if(u(S,y,w),s)return g()}if(r)return g()}return g()}},tr=za;var X={__proto__:null};X.enumerable=true;Object.freeze(X);var er=(pe=class{constructor(e,i={}){if(We.set(this,false),to.set(this,false),eo.set(this,false),di.set(this,false),Zo.set(this,Date.now()),pi.set(this,false),io.set(this,void 0),Ie.set(this,void 0),ui.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof i!="object"||!i)throw new Error('The "options" argument must be an object');let{bubbles:o,cancelable:r,composed:s}=i;Gt(this,We,!!r),Gt(this,to,!!o),Gt(this,eo,!!s),Gt(this,io,`${e}`),Gt(this,Ie,null),Gt(this,ui,false);}initEvent(e,i,o){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){Gt(this,di,true);}get target(){return ut(this,Ie,"f")}get currentTarget(){return ut(this,Ie,"f")}get srcElement(){return ut(this,Ie,"f")}get type(){return ut(this,io,"f")}get cancelable(){return ut(this,We,"f")}get defaultPrevented(){return ut(this,We,"f")&&ut(this,di,"f")}get timeStamp(){return ut(this,Zo,"f")}composedPath(){return ut(this,ui,"f")?[ut(this,Ie,"f")]:[]}get returnValue(){return !ut(this,We,"f")||!ut(this,di,"f")}get bubbles(){return ut(this,to,"f")}get composed(){return ut(this,eo,"f")}get eventPhase(){return ut(this,ui,"f")?pe.AT_TARGET:pe.NONE}get cancelBubble(){return ut(this,pi,"f")}set cancelBubble(e){e&&Gt(this,pi,true);}stopPropagation(){Gt(this,pi,true);}get isTrusted(){return  false}},We=new WeakMap,to=new WeakMap,eo=new WeakMap,di=new WeakMap,Zo=new WeakMap,pi=new WeakMap,io=new WeakMap,Ie=new WeakMap,ui=new WeakMap,pe.NONE=0,pe.CAPTURING_PHASE=1,pe.AT_TARGET=2,pe.BUBBLING_PHASE=3,pe);Object.defineProperties(er.prototype,{initEvent:X,stopImmediatePropagation:X,preventDefault:X,target:X,currentTarget:X,srcElement:X,type:X,cancelable:X,defaultPrevented:X,timeStamp:X,composedPath:X,returnValue:X,bubbles:X,composed:X,eventPhase:X,cancelBubble:X,stopPropagation:X,isTrusted:X});var ls=(ns=class extends er{constructor(e,i={}){super(e,i),oo.set(this,void 0),Gt(this,oo,i?.detail??null);}initCustomEvent(e,i,o,r){throw new Error("Method not implemented.")}get detail(){return ut(this,oo,"f")}},oo=new WeakMap,ns);Object.defineProperties(ls.prototype,{detail:X});var ir=er,or=ls;globalThis.Event??=ir;globalThis.CustomEvent??=or;var cs=new WeakMap,mi=t=>{let e=cs.get(t);return e===void 0&&cs.set(t,e=new Map),e},Ra=class extends tr{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(mi(this)).map(([e,i])=>({name:e,value:i}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(e,i){mi(this).set(e,String(i));}removeAttribute(e){mi(this).delete(e);}toggleAttribute(e,i){if(this.hasAttribute(e)){if(i===void 0||!i)return this.removeAttribute(e),false}else return i===void 0||i?(this.setAttribute(e,""),true):false;return  true}hasAttribute(e){return mi(this).has(e)}attachShadow(e){let i={host:this};return this.__shadowRootMode=e.mode,e&&e.mode==="open"&&(this.__shadowRoot=i),i}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let e=new ss(this);return this.__internals=e,e}getAttribute(e){return mi(this).get(e)??null}};var Oa=class extends Ra{},rr=Oa;globalThis.litServerRoot??=Object.defineProperty(new rr,"localName",{get(){return "lit-server-root"}});var Ma=class{constructor(){this.__definitions=new Map;}define(e,i){if(this.__definitions.has(e))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${e}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${e}" has already been used with this registry`);i.__localName=e,this.__definitions.set(e,{ctor:i,observedAttributes:i.observedAttributes??[]});}get(e){return this.__definitions.get(e)?.ctor}},La=Ma;var hs=new La;var fi=globalThis,ro=fi.ShadowRoot&&(fi.ShadyCSS===void 0||fi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,sr=Symbol(),ds=new WeakMap,gi=class{constructor(e,i,o){if(this._$cssResult$=true,o!==sr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i;}get styleSheet(){let e=this.o,i=this.t;if(ro&&e===void 0){let o=i!==void 0&&i.length===1;o&&(e=ds.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&ds.set(i,e));}return e}toString(){return this.cssText}},ps=t=>new gi(typeof t=="string"?t:t+"",void 0,sr),_=(t,...e)=>{let i=t.length===1?t[0]:e.reduce((o,r,s)=>o+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new gi(i,t,sr)},us=(t,e)=>{if(ro)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of e){let o=document.createElement("style"),r=fi.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o);}},nr=ro||fi.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(let o of e.cssRules)i+=o.cssText;return ps(i)})(t):t;var{is:Pa,defineProperty:Va,getOwnPropertyDescriptor:Da,getOwnPropertyNames:Ha,getOwnPropertySymbols:Fa,getPrototypeOf:Na}=Object,vi=globalThis;vi.customElements??=hs;var ms=vi.trustedTypes,Ba=ms?ms.emptyScript:"",Ua=vi.reactiveElementPolyfillSupport,bi=(t,e)=>t,ue={toAttribute(t,e){switch(e){case Boolean:t=t?Ba:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch{i=null;}}return i}},so=(t,e)=>!Pa(t,e),fs={attribute:true,type:String,converter:ue,reflect:false,useDefault:false,hasChanged:so};Symbol.metadata??=Symbol("metadata"),vi.litPropertyMetadata??=new WeakMap;var Zt=class extends(globalThis.HTMLElement??rr){static addInitializer(e){this._$Ei(),(this.l??=[]).push(e);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=fs){if(i.state&&(i.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=true),this.elementProperties.set(e,i),!i.noAccessor){let o=Symbol(),r=this.getPropertyDescriptor(e,o,i);r!==void 0&&Va(this.prototype,e,r);}}static getPropertyDescriptor(e,i,o){let{get:r,set:s}=Da(this.prototype,e)??{get(){return this[i]},set(n){this[i]=n;}};return {get:r,set(n){let c=r?.call(this);s?.call(this,n),this.requestUpdate(e,c,o);},configurable:true,enumerable:true}}static getPropertyOptions(e){return this.elementProperties.get(e)??fs}static _$Ei(){if(this.hasOwnProperty(bi("elementProperties")))return;let e=Na(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties);}static finalize(){if(this.hasOwnProperty(bi("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(bi("properties"))){let i=this.properties,o=[...Ha(i),...Fa(i)];for(let r of o)this.createProperty(r,i[r]);}let e=this[Symbol.metadata];if(e!==null){let i=litPropertyMetadata.get(e);if(i!==void 0)for(let[o,r]of i)this.elementProperties.set(o,r);}this._$Eh=new Map;for(let[i,o]of this.elementProperties){let r=this._$Eu(i,o);r!==void 0&&this._$Eh.set(r,i);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(e){let i=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let r of o)i.unshift(nr(r));}else e!==void 0&&i.push(nr(e));return i}static _$Eu(e,i){let o=i.attribute;return o===false?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this));}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.();}removeController(e){this._$EO?.delete(e);}_$E_(){let e=new Map,i=this.constructor.elementProperties;for(let o of i.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e);}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return us(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(e=>e.hostConnected?.());}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.());}attributeChangedCallback(e,i,o){this._$AK(e,o);}_$ET(e,i){let o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===true){let s=(o.converter?.toAttribute!==void 0?o.converter:ue).toAttribute(i,o.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null;}}_$AK(e,i){let o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let s=o.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ue;this._$Em=r,this[r]=n.fromAttribute(i,s.type)??this._$Ej?.get(r)??null,this._$Em=null;}}requestUpdate(e,i,o){if(e!==void 0){let r=this.constructor,s=this[e];if(o??=r.getPropertyOptions(e),!((o.hasChanged??so)(s,i)||o.useDefault&&o.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,i,o);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(e,i,{useDefault:o,reflect:r,wrapped:s},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??i??this[e]),s!==true||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(i=void 0),this._$AL.set(e,i)),r===true&&this._$Em!==e&&(this._$Eq??=new Set).add(e));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(i){Promise.reject(i);}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0;}let o=this.constructor.elementProperties;if(o.size>0)for(let[r,s]of o){let{wrapped:n}=s,c=this[r];n!==true||this._$AL.has(r)||c===void 0||this.C(r,void 0,s,c);}}let e=false,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(i)):this._$EM();}catch(o){throw e=false,this._$EM(),o}e&&this._$AE(i);}willUpdate(e){}_$AE(e){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(e)),this.updated(e);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return  true}update(e){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM();}updated(e){}firstUpdated(e){}};Zt.elementStyles=[],Zt.shadowRootOptions={mode:"open"},Zt[bi("elementProperties")]=new Map,Zt[bi("finalized")]=new Map,Ua?.({ReactiveElement:Zt}),(vi.reactiveElementVersions??=[]).push("2.1.0");var ar=globalThis,wt=class extends Zt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=rs(i,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return rt}};wt._$litElement$=true,wt.finalized=true,ar.litElementHydrateSupport?.({LitElement:wt});var qa=ar.litElementPolyfillSupport;qa?.({LitElement:wt});(ar.litElementVersions??=[]).push("4.2.0");var z=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};var Wa={attribute:true,type:String,converter:ue,reflect:false,hasChanged:so},ja=(t=Wa,e,i)=>{let{kind:o,metadata:r}=i,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),o==="setter"&&((t=Object.create(t)).wrapped=true),s.set(i.name,t),o==="accessor"){let{name:n}=i;return {set(c){let l=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,l,t);},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(o==="setter"){let{name:n}=i;return function(c){let l=this[n];e.call(this,c),this.requestUpdate(n,l,t);}}throw Error("Unsupported decorator location: "+o)};function h(t){return (e,i)=>typeof i=="object"?ja(t,e,i):((o,r,s)=>{let n=r.hasOwnProperty(s);return r.constructor.createProperty(s,o),n?Object.getOwnPropertyDescriptor(r,s):void 0})(t,e,i)}function T(t){return h({...t,state:true,attribute:false})}function je(t){return (e,i)=>{let o=typeof e=="function"?e:e[i];Object.assign(o,t);}}var me=(t,e,i)=>(i.configurable=true,i.enumerable=true,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);function A(t,e){return (i,o,r)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return me(i,o,{get(){return s(this)}})}}function gs(t){return (e,i)=>{let{slot:o,selector:r}=t??{},s="slot"+(o?`[name=${o}]`:":not([name])");return me(e,i,{get(){let n=this.renderRoot?.querySelector(s),c=n?.assignedElements(t)??[];return r===void 0?c:c.filter(l=>l.matches(r))}})}}function fe(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function bs(t,e){return fe(t)?Object.assign({},t,e):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},e)}var Ka=".";function vs(t,e,i){if(!e||e.length===0)return t;let o=Array.isArray(e)?e:e.split(Ka),r,s=t;for(let n=0;n<o.length;n++){let c=o[n];if(c in s)r=s[c];else return i;s=r;}return r}function no(t,e,i,o){if(!e||!t)return t;let r=e;if(r.length===0)return typeof t=="object"&&Object.assign(t,i),t;{let s=t,n=[],c=(l,p,m)=>{l[p]=m;};for(let l=0;l<r.length;l++){let p=r[l];if(n.push(p),s)if(Array.isArray(s)){let m=parseInt(p,10);if(Number.isNaN(m)||m<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===r.length-1?c(s,m,i):s=s[m];}else s instanceof Map||s instanceof WeakMap?l===r.length-1?s.set(p,i):(s.has(p)||s.set(p,{}),s=s.get(p)):typeof s=="object"&&p in s?l===r.length-1?c(s,p,i):s=s[p]:(s[p]=l===r.length-1?i:{},s=s[p]);else s[p]=l===r.length-1?i:{},s=s[p];}}return t}function Ga(t){if(t==null)return "";let e=typeof t;if(e==="boolean")return String(t);if(Array.isArray(e))return t.split(",").map(i=>i.trim());if(e==="object")try{return JSON.stringify(t)}catch{return "{} "}return String(t)}function ys(t,e){if(!e)return t;let i=e.datatype||"any";if(i==="any")return t;if(i==="string")return Ga(t);if(i==="number")return Number(t);if(typeof t=="string"){if(i==="boolean")return t.toLowerCase()==="true";if(i==="array")return t.split(",").map(o=>o.trim());if(i==="object")try{return JSON.parse(t)}catch{return {}}}return i==="boolean"?!!t:t}var ge=class extends Event{constructor(e,i,o,r){super("context-request",{bubbles:true,composed:true}),this.context=e,this.contextTarget=i,this.callback=o,this.subscribe=r??false;}};var Ke=class{constructor(e,i,o,r){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=e,i.context!==void 0){let s=i;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=i,this.callback=o,this.subscribe=r??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new ge(this.context,this.host,this.t,this.subscribe));}};var ao=class{get value(){return this.o}set value(e){this.setValue(e);}setValue(e,i=false){let o=i||!Object.is(e,this.o);this.o=e,o&&this.updateObservers();}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[i,{disposer:o}]of this.subscriptions)i(this.o,o);},e!==void 0&&(this.value=e);}addCallback(e,i,o){if(!o)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e);},consumerHost:i});let{disposer:r}=this.subscriptions.get(e);e(this.value,r);}clearCallbacks(){this.subscriptions.clear();}};var lr=class extends Event{constructor(e,i){super("context-provider",{bubbles:true,composed:true}),this.context=e,this.contextTarget=i;}},Ge=class extends ao{constructor(e,i,o){super(i.context!==void 0?i.initialValue:o),this.onContextRequest=r=>{if(r.context!==this.context)return;let s=r.contextTarget??r.composedPath()[0];s!==this.host&&(r.stopPropagation(),this.addCallback(r.callback,s,r.subscribe));},this.onProviderRequest=r=>{if(r.context!==this.context||(r.contextTarget??r.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:c}]of this.subscriptions)s.has(n)||(s.add(n),c.dispatchEvent(new ge(this.context,c,n,true)));r.stopPropagation();},this.host=e,i.context!==void 0?this.context=i.context:this.context=i,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new lr(this.context,this.host));}};function cr({context:t}){return (e,i)=>{let o=new WeakMap;if(typeof i=="object")return {get(){return e.get.call(this)},set(r){return o.get(this).setValue(r),e.set.call(this,r)},init(r){return o.set(this,new Ge(this,{context:t,initialValue:r})),r}};{e.constructor.addInitializer(n=>{o.set(n,new Ge(n,{context:t}));});let r=Object.getOwnPropertyDescriptor(e,i),s;if(r===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(c){o.get(this).setValue(c),n.set(this,c);},configurable:true,enumerable:true};}else {let n=r.set;s={...r,set(c){o.get(this).setValue(c),n?.call(this,c);}};}return void Object.defineProperty(e,i,s)}}}function hr({context:t,subscribe:e}){return (i,o)=>{typeof o=="object"?o.addInitializer(function(){new Ke(this,{context:t,callback:r=>{i.set.call(this,r);},subscribe:e});}):i.constructor.addInitializer(r=>{new Ke(r,{context:t,callback:s=>{r[o]=s;},subscribe:e});});}}var lo="autoform";var xs=_`
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
            padding: calc(var(--auto-spacing) * 0.5);      
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
    :host(.grid){ 
        & > .autofield{ 
            padding: var(--auto-spacing);        
        }
    } 
    :host(.grid.compact){ 
        & > .autofield{ 
            padding: calc(var(--auto-spacing) * 0.5);        
        }
    } 
    :host(.compact){ 
        & > .autofield{ 
            padding: calc(var(--auto-spacing) * 0.3);        
        }
    }
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
   
`;var mt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},zt=t=>(...e)=>({_$litDirective$:t,values:e}),_t=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,o){this._$Ct=e,this._$AM=i,this._$Ci=o;}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};var{I:Xa}=os;var _s=(t,e)=>t?._$litType$!==void 0;var co=t=>t.strings===void 0,ws=()=>document.createComment(""),Ye=(t,e,i)=>{let o=t._$AA.parentNode,r=e===void 0?t._$AB:e._$AA;if(i===void 0){let s=o.insertBefore(ws(),r),n=o.insertBefore(ws(),r);i=new Xa(s,n,t,t.options);}else {let s=i._$AB.nextSibling,n=i._$AM,c=n!==t;if(c){let l;i._$AQ?.(t),i._$AM=t,i._$AP!==void 0&&(l=t._$AU)!==n._$AU&&i._$AP(l);}if(s!==r||c){let l=i._$AA;for(;l!==s;){let p=l.nextSibling;o.insertBefore(l,r),l=p;}}}return i},be=(t,e,i=t)=>(t._$AI(e,i),t),Qa={},ho=(t,e=Qa)=>t._$AH=e,ks=t=>t._$AH,po=t=>{t._$AP?.(false,true);let e=t._$AA,i=t._$AB.nextSibling;for(;e!==i;){let o=e.nextSibling;e.remove(),e=o;}};var Cs=(t,e,i)=>{let o=new Map;for(let r=e;r<=i;r++)o.set(t[r],r);return o},Rt=zt(class extends _t{constructor(t){if(super(t),t.type!==mt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let o;i===void 0?i=e:e!==void 0&&(o=e);let r=[],s=[],n=0;for(let c of t)r[n]=o?o(c,n):n,s[n]=i(c,n),n++;return {values:s,keys:r}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,o]){let r=ks(t),{values:s,keys:n}=this.dt(e,i,o);if(!Array.isArray(r))return this.ut=n,s;let c=this.ut??=[],l=[],p,m,d=0,u=r.length-1,g=0,b=s.length-1;for(;d<=u&&g<=b;)if(r[d]===null)d++;else if(r[u]===null)u--;else if(c[d]===n[g])l[g]=be(r[d],s[g]),d++,g++;else if(c[u]===n[b])l[b]=be(r[u],s[b]),u--,b--;else if(c[d]===n[b])l[b]=be(r[d],s[b]),Ye(t,l[b+1],r[d]),d++,b--;else if(c[u]===n[g])l[g]=be(r[u],s[g]),Ye(t,r[d],r[u]),u--,g++;else if(p===void 0&&(p=Cs(n,g,b),m=Cs(c,d,u)),p.has(c[d]))if(p.has(c[u])){let v=m.get(n[g]),E=v!==void 0?r[v]:null;if(E===null){let $=Ye(t,r[d]);be($,s[g]),l[g]=$;}else l[g]=be(E,s[g]),Ye(t,r[d],E),r[v]=null;g++;}else po(r[u]),u--;else po(r[d]),d++;for(;g<=b;){let v=Ye(t,l[b+1]);be(v,s[g]),l[g++]=v;}for(;d<=u;){let v=r[d++];v!==null&&po(v);}return this.ut=n,ho(t,l),rt}});var Xe=class{constructor(e){this.host=e,e.addController(this);}hostConnected(){let e=this.host;e.hasAttribute("dark")&&(e.classList.add("sl-theme-dark"),e.style.color="var(--sl-color-neutral-900,white)",e.shadowRoot.ownerDocument.style=e.style.color);}_toDark(){let e=this.host;e.classList.add("sl-theme-dark"),e.style.color="var(--sl-color-neutral-900,white)";}_toLight(){let e=this.host;e.classList.remove("sl-theme-dark"),e.style.color="var(--sl-color-neutral-1000)";}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,grid:this.host.grid,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext(),this.host.dark?this._toDark():this._toLight();}};var $s="important",Ja=" !"+$s,J=zt(class extends _t{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{let o=t[i];return o==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){let{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?i.removeProperty(o):i[o]=null);for(let o in e){let r=e[o];if(r!=null){this.ft.add(o);let s=typeof r=="string"&&r.endsWith(Ja);o.includes("-")||s?i.setProperty(o,s?r.slice(0,-11):r,s?$s:""):i[o]=r;}}return rt}});function st(t,e,i){return t?e(t):i?.(t)}var ve=class{constructor(e,...i){this.initialClasses=[];this.host=e,e.addController(this),this.initialClasses=i;}_forEachClasss(e,i){e&&e.forEach(o=>{typeof o=="string"?(i(o,true),this.host.classList.add(o)):Object.entries(o).forEach(([r,s])=>{i(r,s);});});}add(...e){this.host&&e&&this._forEachClasss(e,i=>{this.host.classList.add(i);});}remove(...e){this.host&&e&&this._forEachClasss(e,i=>{this.host.classList.remove(i);});}toggle(...e){this.host&&this._forEachClasss(e,i=>{this.host.classList.toggle(i);});}use(...e){this.host&&this._forEachClasss(e,(i,o)=>{o?this.host.classList.add(i):this.host.classList.remove(i);});}has(e){return this.host.classList.contains(e)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var yi=class extends _t{constructor(e){if(super(e),this.it=Y,e.type!==mt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Y||e==null)return this._t=void 0,this.it=e;if(e===rt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let i=[e];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};yi.directiveName="unsafeHTML",yi.resultType=1;var Pt=zt(yi);function Ss(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var R=class extends wt{constructor(){super(...arguments);this.theme=new Xe(this);this.classs=new ve(this);this.options=Ss();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];}static{this.styles=xs;}get shadow(){return this.shadowRoot}getFieldOptions(){return Object.entries(this.schema||{}).reduce((i,[o,r])=>(fe(r)?i[o]=r.value:i[o]=r,i),Object.assign({},Ss(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(i=true){return f`${this.renderBeforeActions(i)}
                ${this.renderAfterActions(i)}`}_onClickAction(i){if(i.onClick&&typeof i.onClick=="function")return o=>{i.onClick?.call(this,this.getInputValue(),{action:i,options:this.options,event:o,update:r=>{no(this.context.store.state,this.options.path,r);}});}}renderBeforeActions(i){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return f`<div class="actions before" part="before-actions" slot="${C(i?"prefix":void 0)}">
            ${Rt(this.beforeActions,o=>this.renderActionWidget(o))}</div>`}renderAfterActions(i){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return f`<div class="actions after" part="after-actions"  slot="${C(i?"suffix":void 0)}">
            ${Rt(this.afterActions,o=>this.renderActionWidget(o))}</div>`}renderActionWidget(i){if(typeof i!="object")return;let o=i.type||"button";if(o!=="dropdown"){if(o==="button")return f`
            <sl-button class='action-widget' 
                title=${C(i.tips)}
                variant=${C(i.variant)}
                size=${i.size||this.context.size} 
                @click=${this._onClickAction.call(this,i)}>
                ${st(i.icon,()=>f`<sl-icon name=${C(i.icon)}></sl-icon>`)}
                ${i.label}
            </sl-button>
        `;if(o==="image")return f`
            <sl-button title="${C(i.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this,i)}>                
                <img src="${C(i.url)}"/>
            </sl-button>
        `}}renderOption(i,o){let r=this.schema[i];if(r)return r.loading?f`<sl-spinner></sl-spinner>`:f`${o?o(r.value):r.value}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(i){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,i):i}toState(i){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,i):i}toInput(i){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,i):i}getOptionValue(i,o){if(this.schema&&i in this.schema){let r=this.schema[i];return r===void 0?o:fe(r)?r.value:r}else return o}getOption(i){if(this.schema&&i in this.schema){let o=this.schema[i];return fe(o)?o:bs(o)}}getInputValue(){if(!this.input)return "";let i=this.options.datatype||"string",o=this.input.value;return i==="number"?o=Number(o):i==="boolean"&&(o=!!o),o}_renderRequiredOption(){return this.renderOption("required",i=>i?f`<span style='color:red;padding:2px;'>*</span>`:"")}renderHelp(){if(this.getOptionValue("help"))return f`<span class="help">
            <sl-icon name="help"></sl-icon>
            ${C(this.getOptionValue("help"))}
        </span>`}renderLabel(){let i=this.context,o=this.options.labelPos||i.labelPos;if(o==="none")return f``;{let r={};return (i.labelWidth&&o==="left"||i.viewonly)&&(r.width=i.labelWidth),f`<div class="label" part="field-label" style="${C(J(r))}">
            <span class="title">${this.getLabel()}${this._renderRequiredOption()}</span>            
        </div>`}}renderInput(){return f``}isShowError(){return this.context.showInitialError?!!this.invalidMessage:this.dirty?!!this.invalidMessage:false}renderError(){return this.isShowError()?f`<div class="error">
            ${this.invalidMessage}
        </div>`:f``}onFieldChange(){this._updateFieldValue();}onFieldInput(){this._updateFieldValue();}_handleSchemaChange(){let i=this.context;if(i?.store&&this.schema){let o=this.options.path.join("_$_");this._subscribers.push(i.store.schemas.store.watch(`${o}.**`,r=>{let{reply:s,type:n,value:c,flags:l}=r;if(s||i.form.seq===l)return;(n==="batch"?c:[r]).forEach(m=>{let d=m.path.slice(1);no(this.schema,d,m.value),this.options[d[0]]=m.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let i=this.value;if(this.options.toView&&this.options.toView)try{i=this.options.toView.call(this,this.value);}catch(o){console.error(`Error while toView<${this.path}>: ${o.message}`);}return f`${Pt(String(i))}`}_handleStateChange(){let i=this.context;i?.store&&this.schema&&this._subscribers.push(i.store.watch(this.options.path.join("."),o=>{this.value=this.toInput(o.value);},{operates:"write"}));}getStateValue(){return this.toInput(vs(this.context.store.state,this.options.path))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let i=this.context;i?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.options.path.join("."),this.name=this.options.name||this.path,this.path in i.store.schemas.errors&&(this.invalidMessage=i.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(o=>o.position==="before"),this.afterActions=this.options.actions.filter(o=>o.position!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(i=>i.off());}getLabelPos(){return this.options.labelPos||this.context.labelPos}getHelpPos(){return this.options.helpPos||this.context.helpPos}_updateFieldValue(){if(!this.schema)return;let i=this.options.path,o=this.toState(this.getInputValue()),r=this.context;r.dirty=true,this.dirty=true;try{this.context.store.update(n=>{let c=ys(o,this.schema);no(n,i,c),this.invalidMessage=void 0;},{flags:r.form.seq}),this.dispatchEvent(new CustomEvent("change",{detail:{value:o}}));}catch(s){this.invalidMessage=s.message;}}renderValue(){return f`
            ${this.renderInput()}
            ${this.renderHelp()}                    
            ${this.renderError()} 
        `}render(){let i=this.context;return this.classs.use(i.size,{grid:i.grid,error:this.isShowError(),"left-label":i.labelPos==="left"||i.viewonly,"top-label":i.labelPos==="top"&&!i.viewonly,disable:this.options.enable===false,readonly:i.readonly,viewonly:i.viewonly,compact:i.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${i.viewAlign}`]:true}),f`           
            <div class="autofield">
                ${this.options.divider?f`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${st(i.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>                            
            </div>
        `}};x([h({type:Object})],R.prototype,"schema",2),x([T()],R.prototype,"value",2),x([T()],R.prototype,"invalidMessage",2),x([T()],R.prototype,"labelPos",2),x([T()],R.prototype,"dirty",2),x([gs({slot:"value",flatten:true})],R.prototype,"_field",2),x([A(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],R.prototype,"input",2),x([hr({context:lo}),h({attribute:false})],R.prototype,"context",2);exports.AutoFieldInput=class Q extends R{getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return f`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderInput(){return f`
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
                @sl-input=${this.onFieldInput.bind(this)}
                spellcheck=${C(this.options.spellcheck)}
            >
            ${this.getPrefix()}${this.getSuffix()}${this.renderActions()}</sl-input>
        `}};exports.AutoFieldInput.styles=[R.styles,_`
            .actions{
                margin-right:0px;
                display:flex;
                flex-direction:row;
                align-items:center; 
            }
            .actions > sl-button{
                margin:0px;            
            }
            .actions.after > sl-button::part(base){
                border-right:none;
                border-radius: 0px;

            }
            .actions.before{
                margin-left: 0px;
            }
            .actions.before > sl-button::part(base){
                border-left:none;
                border-radius: 0px;
            } 
    `],exports.AutoFieldInput=x([z("auto-field-input")],exports.AutoFieldInput);var Es=_`
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
`;var Vt=(t="value")=>(e,i)=>{let o=e.constructor,r=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(s,n,c){var l;let p=o.getPropertyOptions(t),m=typeof p.attribute=="string"?p.attribute:t;if(s===m){let d=p.converter||ue,g=(typeof d=="function"?d:(l=d?.fromAttribute)!=null?l:ue.fromAttribute)(c,p.type);this[t]!==g&&(this[i]=g);}r.call(this,s,n,c);};};var kt=_`
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
`;var Is=Object.defineProperty,Za=Object.defineProperties,tl=Object.getOwnPropertyDescriptor,el=Object.getOwnPropertyDescriptors,As=Object.getOwnPropertySymbols,il=Object.prototype.hasOwnProperty,ol=Object.prototype.propertyIsEnumerable,dr=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),pr=t=>{throw TypeError(t)},Ts=(t,e,i)=>e in t?Is(t,e,{enumerable:true,configurable:true,writable:true,value:i}):t[e]=i,Ct=(t,e)=>{for(var i in e||(e={}))il.call(e,i)&&Ts(t,i,e[i]);if(As)for(var i of As(e))ol.call(e,i)&&Ts(t,i,e[i]);return t},te=(t,e)=>Za(t,el(e)),a=(t,e,i,o)=>{for(var r=o>1?void 0:o?tl(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&Is(e,i,r),r},zs=(t,e,i)=>e.has(t)||pr("Cannot "+i),Rs=(t,e,i)=>(zs(t,e,"read from private field"),e.get(t)),Os=(t,e,i)=>e.has(t)?pr("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Ms=(t,e,i,o)=>(zs(t,e,"write to private field"),e.set(t,i),i),rl=function(t,e){this[0]=t,this[1]=e;},Ls=t=>{var e=t[dr("asyncIterator")],i=false,o,r={};return e==null?(e=t[dr("iterator")](),o=s=>r[s]=n=>e[s](n)):(e=e.call(t),o=s=>r[s]=n=>{if(i){if(i=false,s==="throw")throw n;return n}return i=true,{done:false,value:new rl(new Promise(c=>{var l=e[s](n);l instanceof Object||pr("Object expected"),c(l);}),1)}}),r[dr("iterator")]=()=>r,o("next"),"throw"in e?o("throw"):r.throw=s=>{throw s},"return"in e&&o("return"),r};var xi=new WeakMap,wi=new WeakMap,_i=new WeakMap,ur=new WeakSet,uo=new WeakMap,dt=class{constructor(t,e){this.handleFormData=i=>{let o=this.options.disabled(this.host),r=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof r=="string"&&r.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(c=>{i.formData.append(r,c.toString());}):i.formData.append(r,s.toString()));},this.handleFormSubmit=i=>{var o;let r=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=xi.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!r&&!s(this.host)&&(i.preventDefault(),i.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),uo.set(this.host,[]);},this.handleInteraction=i=>{let o=uo.get(this.host);o.includes(i.type)||o.push(i.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let i=this.form.querySelectorAll("*");for(let o of i)if(typeof o.checkValidity=="function"&&!o.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let i=this.form.querySelectorAll("*");for(let o of i)if(typeof o.reportValidity=="function"&&!o.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=Ct({form:i=>{let o=i.form;if(o){let s=i.getRootNode().querySelector(`#${o}`);if(s)return s}return i.closest("form")},name:i=>i.name,value:i=>i.value,defaultValue:i=>i.defaultValue,disabled:i=>{var o;return (o=i.disabled)!=null?o:false},reportValidity:i=>typeof i.reportValidity=="function"?i.reportValidity():true,checkValidity:i=>typeof i.checkValidity=="function"?i.checkValidity():true,setValue:(i,o)=>i.value=o,assumeInteractionOn:["sl-input"]},e);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),uo.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction);});}hostDisconnected(){this.detachForm(),uo.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,xi.has(this.form)?xi.get(this.form).add(this.host):xi.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),wi.has(this.form)||(wi.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),_i.has(this.form)||(_i.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=xi.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),wi.has(this.form)&&(this.form.reportValidity=wi.get(this.form),wi.delete(this.form)),_i.has(this.form)&&(this.form.checkValidity=_i.get(this.form),_i.delete(this.form)),this.form=void 0));}setUserInteracted(t,e){e?ur.add(t):ur.delete(t),t.requestUpdate();}doAction(t,e){if(this.form){let i=document.createElement("button");i.type=t,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",e&&(i.name=e.name,i.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{e.hasAttribute(o)&&i.setAttribute(o,e.getAttribute(o));})),this.form.append(i),i.click(),i.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let e=this.host,i=!!ur.has(e),o=!!e.required;e.toggleAttribute("data-required",o),e.toggleAttribute("data-optional",!o),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&i),e.toggleAttribute("data-user-valid",t&&i);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let e=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault();}},Qe=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),Ps=Object.freeze(te(Ct({},Qe),{valid:false,valueMissing:true})),Vs=Object.freeze(te(Ct({},Qe),{valid:false,customError:true}));var nt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=i=>{let o=i.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=e;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!e.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function Ds(t){if(!t)return "";let e=t.assignedNodes({flatten:true}),i="";return [...e].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(i+=o.textContent);}),i}var mr="";function Hs(t){mr=t;}function Fs(t=""){if(!mr){let e=[...document.getElementsByTagName("script")],i=e.find(o=>o.hasAttribute("data-shoelace"));if(i)Hs(i.getAttribute("data-shoelace"));else {let o=e.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),r="";o&&(r=o.getAttribute("src")),Hs(r.split("/").slice(0,-1).join("/"));}}return mr.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var sl={name:"default",resolver:t=>Fs(`assets/icons/${t}.svg`)},Ns=sl;var Bs={caret:`
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
  `},nl={name:"system",resolver:t=>t in Bs?`data:image/svg+xml,${encodeURIComponent(Bs[t])}`:""},Us=nl;var mo=[Ns,Us],fo=[];function fr(t){fo.push(t);}function gr(t){fo=fo.filter(e=>e!==t);}function go(t){return mo.find(e=>e.name===t)}function br(t,e){qs(t),mo.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),fo.forEach(i=>{i.library===t&&i.setIcon();});}function qs(t){mo=mo.filter(e=>e.name!==t);}var Ws=_`
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
`;function I(t,e){let i=Ct({waitUntilFirstUpdate:false},e);return (o,r)=>{let{update:s}=o,n=Array.isArray(t)?t:[t];o.update=function(c){n.forEach(l=>{let p=l;if(c.has(p)){let m=c.get(p),d=this[p];m!==d&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[r](m,d);}}),s.call(this,c);};}}var P=_`
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
`;var bo,O=class extends wt{constructor(){super(),Os(this,bo,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e);});}emit(t,e){let i=new CustomEvent(t,Ct({bubbles:true,cancelable:false,composed:true,detail:{}},e));return this.dispatchEvent(i),i}static define(t,e=this,i={}){let o=customElements.get(t);if(!o){try{customElements.define(t,e,i);}catch{customElements.define(t,class extends e{},i);}return}let r=" (unknown version)",s=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in o&&o.version&&(s=" v"+o.version),!(r&&s&&r===s)&&console.warn(`Attempted to register <${t}>${r}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,e,i){Rs(this,bo)||(this.constructor.elementProperties.forEach((o,r)=>{o.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r]);}),Ms(this,bo,true)),super.attributeChangedCallback(t,e,i);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&this[i]==null&&(this[i]=e);});}};bo=new WeakMap;O.version="2.20.1";O.dependencies={};a([h()],O.prototype,"dir",2);a([h()],O.prototype,"lang",2);var ki=Symbol(),vo=Symbol(),vr,yr=new Map,W=class extends O{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,e){var i;let o;if(e?.spriteSheet)return this.svg=f`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?ki:vo}catch{return vo}try{let r=document.createElement("div");r.innerHTML=await o.text();let s=r.firstElementChild;if(((i=s?.tagName)==null?void 0:i.toLowerCase())!=="svg")return ki;vr||(vr=new DOMParser);let c=vr.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return c?(c.part.add("svg"),document.adoptNode(c)):ki}catch{return ki}}connectedCallback(){super.connectedCallback(),fr(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),gr(this);}getIconSource(){let t=go(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:e,fromLibrary:i}=this.getIconSource(),o=i?go(this.library):void 0;if(!e){this.svg=null;return}let r=yr.get(e);if(r||(r=this.resolveIcon(e,o),yr.set(e,r)),!this.initialRender)return;let s=await r;if(s===vo&&yr.delete(e),e===this.getIconSource().url){if(_s(s)){if(this.svg=s,o){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n);}return}switch(s){case vo:case ki:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=o?.mutator)==null||t.call(o,this.svg),this.emit("sl-load");}}}render(){return this.svg}};W.styles=[P,Ws];a([T()],W.prototype,"svg",2);a([h({reflect:true})],W.prototype,"name",2);a([h()],W.prototype,"src",2);a([h()],W.prototype,"label",2);a([h({reflect:true})],W.prototype,"library",2);a([I("label")],W.prototype,"handleLabelChange",1);a([I(["name","src","library"])],W.prototype,"setIcon",1);var L=zt(class extends _t{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let i=t.element.classList;for(let o of this.st)o in e||(i.remove(o),this.st.delete(o));for(let o in e){let r=!!e[o];r===this.st.has(o)||this.nt?.has(o)||(r?(i.add(o),this.st.add(o)):(i.remove(o),this.st.delete(o)));}return rt}});var Ot=zt(class extends _t{constructor(t){if(super(t),t.type!==mt.PROPERTY&&t.type!==mt.ATTRIBUTE&&t.type!==mt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!co(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===rt||e===Y)return e;let i=t.element,o=t.name;if(t.type===mt.PROPERTY){if(e===i[o])return rt}else if(t.type===mt.BOOLEAN_ATTRIBUTE){if(!!e===i.hasAttribute(o))return rt}else if(t.type===mt.ATTRIBUTE&&i.getAttribute(o)===e+"")return rt;return ho(t),e}});var it=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?true:!!t;return f`
      <div
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
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
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};it.styles=[P,kt,Es];it.dependencies={"sl-icon":W};a([A('input[type="checkbox"]')],it.prototype,"input",2);a([T()],it.prototype,"hasFocus",2);a([h()],it.prototype,"title",2);a([h()],it.prototype,"name",2);a([h()],it.prototype,"value",2);a([h({reflect:true})],it.prototype,"size",2);a([h({type:Boolean,reflect:true})],it.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],it.prototype,"checked",2);a([h({type:Boolean,reflect:true})],it.prototype,"indeterminate",2);a([Vt("checked")],it.prototype,"defaultChecked",2);a([h({reflect:true})],it.prototype,"form",2);a([h({type:Boolean,reflect:true})],it.prototype,"required",2);a([h({attribute:"help-text"})],it.prototype,"helpText",2);a([I("disabled",{waitUntilFirstUpdate:true})],it.prototype,"handleDisabledChange",1);a([I(["checked","indeterminate"],{waitUntilFirstUpdate:true})],it.prototype,"handleStateChange",1);it.define("sl-checkbox");exports.AutoFieldCheckbox=class Ci extends R{renderInput(){return f`        
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
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){return this.options.checkLabel?this.options.checkLabel:typeof this.value=="boolean"?"":this.options.switchValues[this.value===this.options.switchValues[0]?0:1]}renderView(){return f`        
        <sl-checkbox 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-checkbox> 
        `}};exports.AutoFieldCheckbox.styles=[R.styles,_`
            sl-checkbox.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=x([z("auto-field-checkbox")],exports.AutoFieldCheckbox);var js=_`
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
`;var Ut=class extends O{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return f`
      <span
        part="base"
        class=${L({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?f` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Ut.styles=[P,js];Ut.dependencies={"sl-icon":W};a([T()],Ut.prototype,"checked",2);a([T()],Ut.prototype,"hasFocus",2);a([h()],Ut.prototype,"value",2);a([h({reflect:true})],Ut.prototype,"size",2);a([h({type:Boolean,reflect:true})],Ut.prototype,"disabled",2);a([I("checked")],Ut.prototype,"handleCheckedChange",1);a([I("disabled",{waitUntilFirstUpdate:true})],Ut.prototype,"handleDisabledChange",1);Ut.define("sl-radio");var Ks=_`
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
`;var Gs=_`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var ye=class extends O{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let e=$i(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let e=$i(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let e=$i(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let e=$i(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(e=>{let i=t.indexOf(e),o=$i(e);o&&(o.toggleAttribute("data-sl-button-group__button",true),o.toggleAttribute("data-sl-button-group__button--first",i===0),o.toggleAttribute("data-sl-button-group__button--inner",i>0&&i<t.length-1),o.toggleAttribute("data-sl-button-group__button--last",i===t.length-1),o.toggleAttribute("data-sl-button-group__button--radio",o.tagName.toLowerCase()==="sl-radio-button"));});}render(){return f`
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
    `}};ye.styles=[P,Gs];a([A("slot")],ye.prototype,"defaultSlot",2);a([T()],ye.prototype,"disableRole",2);a([h()],ye.prototype,"label",2);function $i(t){var e;let i="sl-button, sl-radio-button";return (e=t.closest(i))!=null?e:t.querySelector(i)}var pt=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this),this.hasSlotController=new nt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Vs:t?Ps:Qe}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let e=t.target.closest("sl-radio, sl-radio-button"),i=this.getAllRadios(),o=this.value;!e||e.disabled||(this.value=e.value,i.forEach(r=>r.checked=r===e),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let i=this.getAllRadios().filter(c=>!c.disabled),o=(e=i.find(c=>c.checked))!=null?e:i[0],r=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=i.indexOf(o)+r;n<0&&(n=i.length-1),n>i.length-1&&(n=0),this.getAllRadios().forEach(c=>{c.checked=false,this.hasButtonGroup||c.setAttribute("tabindex","-1");}),this.value=i[n].value,i[n].checked=true,this.hasButtonGroup?i[n].shadowRoot.querySelector("button").focus():(i[n].setAttribute("tabindex","0"),i[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,e;let i=this.getAllRadios();if(await Promise.all(i.map(async o=>{await o.updateComplete,o.checked=o.value===this.value,o.size=this.size;})),this.hasButtonGroup=i.some(o=>o.tagName.toLowerCase()==="sl-radio-button"),i.length>0&&!i.some(o=>o.checked))if(this.hasButtonGroup){let o=(t=i[0].shadowRoot)==null?void 0:t.querySelector("button");o&&o.setAttribute("tabindex","0");}else i[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let o=(e=this.shadowRoot)==null?void 0:e.querySelector("sl-button-group");o&&(o.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,e=this.customValidityMessage!=="";return t||e?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let e=this.getAllRadios(),i=e.find(s=>s.checked),o=e.find(s=>!s.disabled),r=i||o;r&&r.focus(t);}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,o=this.helpText?true:!!e,r=f`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return f`
      <fieldset
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":i,"form-control--has-help-text":o})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
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
    `}};pt.styles=[P,kt,Ks];pt.dependencies={"sl-button-group":ye};a([A("slot:not([name])")],pt.prototype,"defaultSlot",2);a([A(".radio-group__validation-input")],pt.prototype,"validationInput",2);a([T()],pt.prototype,"hasButtonGroup",2);a([T()],pt.prototype,"errorMessage",2);a([T()],pt.prototype,"defaultValue",2);a([h()],pt.prototype,"label",2);a([h({attribute:"help-text"})],pt.prototype,"helpText",2);a([h()],pt.prototype,"name",2);a([h({reflect:true})],pt.prototype,"value",2);a([h({reflect:true})],pt.prototype,"size",2);a([h({reflect:true})],pt.prototype,"form",2);a([h({type:Boolean,reflect:true})],pt.prototype,"required",2);a([I("size",{waitUntilFirstUpdate:true})],pt.prototype,"handleSizeChange",1);a([I("value")],pt.prototype,"handleValueChange",1);pt.define("sl-radio-group");exports.AutoFieldRadio=class Si extends R{getInitialOptions(){return {card:false,select:[]}}renderOptionItemWithCard(e,i){if(this.options.card){let o=i.value||i.label,r=this.value===o;return f`<div class="card"
                style=${J({width:this.options.itemWidth})}
                >
                    <div class="body ${r?"selected":""}">
                        <sl-icon  class="icon" name="settings"></sl-icon>
                        ${e}                    
                    </div>
            </div>`}else return e}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(e){let i=e.value||e.label;return f`<sl-radio 
            value="${i}"
            style=${J({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
        >${e.label}<br/><span class="memo">${e.memo}</span></sl-radio>`}renderInput(){let e=this.options.select.map(i=>{let o={};return typeof i=="object"?Object.assign(o,i):Object.assign(o,{label:i}),o});return f`              
            <sl-radio-group 
                class="value"
                name=${this.name} 
                value="${this.value}"            
                size="${this.context.size}"            
                @sl-change=${this.onRadioChange.bind(this)}
            >
            ${e.map(i=>this.renderOptionItemWithCard(this.renderOptionItem(i),i))}
            </sl-radio-group> 
        `}};exports.AutoFieldRadio.styles=[R.styles,_`
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
    `],exports.AutoFieldRadio=x([z("auto-field-radio")],exports.AutoFieldRadio);var Ys=_`
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
`;var q=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i);}setRangeText(t,e,i,o="preserve"){let r=e??this.input.selectionStart,s=i??this.input.selectionEnd;this.input.setRangeText(t,r,s,o),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,o=this.helpText?true:!!e;return f`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
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
    `}};q.styles=[P,kt,Ys];a([A(".textarea__control")],q.prototype,"input",2);a([A(".textarea__size-adjuster")],q.prototype,"sizeAdjuster",2);a([T()],q.prototype,"hasFocus",2);a([h()],q.prototype,"title",2);a([h()],q.prototype,"name",2);a([h()],q.prototype,"value",2);a([h({reflect:true})],q.prototype,"size",2);a([h({type:Boolean,reflect:true})],q.prototype,"filled",2);a([h()],q.prototype,"label",2);a([h({attribute:"help-text"})],q.prototype,"helpText",2);a([h()],q.prototype,"placeholder",2);a([h({type:Number})],q.prototype,"rows",2);a([h()],q.prototype,"resize",2);a([h({type:Boolean,reflect:true})],q.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],q.prototype,"readonly",2);a([h({reflect:true})],q.prototype,"form",2);a([h({type:Boolean,reflect:true})],q.prototype,"required",2);a([h({type:Number})],q.prototype,"minlength",2);a([h({type:Number})],q.prototype,"maxlength",2);a([h()],q.prototype,"autocapitalize",2);a([h()],q.prototype,"autocorrect",2);a([h()],q.prototype,"autocomplete",2);a([h({type:Boolean})],q.prototype,"autofocus",2);a([h()],q.prototype,"enterkeyhint",2);a([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],q.prototype,"spellcheck",2);a([h()],q.prototype,"inputmode",2);a([Vt()],q.prototype,"defaultValue",2);a([I("disabled",{waitUntilFirstUpdate:true})],q.prototype,"handleDisabledChange",1);a([I("rows",{waitUntilFirstUpdate:true})],q.prototype,"handleRowsChange",1);a([I("value",{waitUntilFirstUpdate:true})],q.prototype,"handleValueChange",1);q.define("sl-textarea");exports.AutoFieldTextArea=class yo extends R{renderInput(){return f`              
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
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea=x([z("auto-field-textarea")],exports.AutoFieldTextArea);var Xs=_`
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
`;var ft=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?true:!!t;return f`
      <div
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
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
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ft.styles=[P,kt,Xs];a([A('input[type="checkbox"]')],ft.prototype,"input",2);a([T()],ft.prototype,"hasFocus",2);a([h()],ft.prototype,"title",2);a([h()],ft.prototype,"name",2);a([h()],ft.prototype,"value",2);a([h({reflect:true})],ft.prototype,"size",2);a([h({type:Boolean,reflect:true})],ft.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],ft.prototype,"checked",2);a([Vt("checked")],ft.prototype,"defaultChecked",2);a([h({reflect:true})],ft.prototype,"form",2);a([h({type:Boolean,reflect:true})],ft.prototype,"required",2);a([h({attribute:"help-text"})],ft.prototype,"helpText",2);a([I("checked",{waitUntilFirstUpdate:true})],ft.prototype,"handleCheckedChange",1);a([I("disabled",{waitUntilFirstUpdate:true})],ft.prototype,"handleDisabledChange",1);ft.define("sl-switch");exports.AutoFieldSwitch=class Ei extends R{renderInput(){return f`              
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
        `}getCheckLabel(){return this.options.checkLabel?this.options.checkLabel:typeof this.value=="boolean"?"":this.options.switchValues[this.value===this.options.switchValues[0]?0:1]}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return f`        
        <sl-switch 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-switch> 
        `}};exports.AutoFieldSwitch.styles=[R.styles,_`
            sl-switch.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=x([z("auto-field-switch")],exports.AutoFieldSwitch);var xo=_`
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
`;var Qs=_`
  ${xo}

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
`;var Zs=Symbol.for(""),al=t=>{if(t?.r===Zs)return t?._$litStatic$};var Je=(t,...e)=>({_$litStatic$:e.reduce((i,o,r)=>i+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[r+1],t[0]),r:Zs}),Js=new Map,xr=t=>(e,...i)=>{let o=i.length,r,s,n=[],c=[],l,p=0,m=false;for(;p<o;){for(l=e[p];p<o&&(s=i[p],(r=al(s))!==void 0);)l+=r+e[++p],m=true;p!==o&&c.push(s),n.push(l),p++;}if(p===o&&n.push(e[o]),m){let d=n.join("$$lit$$");(e=Js.get(d))===void 0&&(n.raw=n,Js.set(d,e=n)),i=c;}return t(e,...i)},xe=xr(f);var Dt=class extends O{constructor(){super(...arguments),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return xe`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${L({button:true,"button--default":true,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":true,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
    `}};Dt.styles=[P,Qs];a([A(".button")],Dt.prototype,"input",2);a([A(".hidden-input")],Dt.prototype,"hiddenInput",2);a([T()],Dt.prototype,"hasFocus",2);a([h({type:Boolean,reflect:true})],Dt.prototype,"checked",2);a([h()],Dt.prototype,"value",2);a([h({type:Boolean,reflect:true})],Dt.prototype,"disabled",2);a([h({reflect:true})],Dt.prototype,"size",2);a([h({type:Boolean,reflect:true})],Dt.prototype,"pill",2);a([I("disabled",{waitUntilFirstUpdate:true})],Dt.prototype,"handleDisabledChange",1);Dt.define("sl-radio-button");exports.AutoFieldRadioButton=class Ai extends R{renderInput(){let e=this.getOptionValue("select",[]).map((i,o)=>{let r={};return typeof i=="object"?Object.assign(r,i):Object.assign(r,{label:i,value:o+1}),r});return f`              
        <sl-radio-group 
            name=${this.name} 
            data-path=${this.path} 
            value="${this.value}"            
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
        ${e.map(i=>f`<sl-radio-button
            value="${i.value}"
            ?disabled =${this.options.enable}
        >${i.label}</sl-radio-button>`)}
        </sl-radio-group> 
        `}};exports.AutoFieldRadioButton.styles=[R.styles,_`
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
    `],exports.AutoFieldRadioButton=x([z("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class wo extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=x([z("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class _o extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=x([z("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class ko extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=x([z("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldEmail=class Co extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}};exports.AutoFieldEmail=x([z("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class $o extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=x([z("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class So extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=x([z("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class Eo extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=x([z("auto-field-phone")],exports.AutoFieldPhone);var Ao=class{constructor(e,i){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=e,this.options={...this.options,...i},e.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(e){let i=e.target;if(this.isPreviewActive){this.closePreview();return}i.matches(this.options.selector)&&(e.preventDefault(),e.stopPropagation(),this.originalImage=i,this.showPreview(this.originalImage));}showPreview(e){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let i=this.options.overlayColor,o=this.hexToRgb(i);this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=e.src,this.previewImage.alt=e.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let r=e.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${r.top}px`,this.previewImage.style.left=`${r.left}px`,this.previewImage.style.width=`${r.width}px`,this.previewImage.style.height=`${r.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",d=>{d.stopPropagation();}),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:c,height:l}=this.calculateAspectRatioFit(e.naturalWidth,e.naturalHeight,s*.9,n*.9),p=(n-l)/2,m=(s-c)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${p}px`,this.previewImage.style.left=`${m}px`,this.previewImage.style.width=`${c}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let e=window.innerWidth,i=window.innerHeight,{width:o,height:r}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,e*.9,i*.9),s=(i-r)/2,n=(e-o)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${o}px`,this.previewImage.style.height=`${r}px`);});}handleKeydown(e){e.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let e=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${e.top}px`,this.previewImage.style.left=`${e.left}px`,this.previewImage.style.width=`${e.width}px`,this.previewImage.style.height=`${e.height}px`;});let i=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${i.r}, ${i.g}, ${i.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(e,i,o,r){if(e<=o&&i<=r)return {width:e,height:i};let s=Math.min(o/e,r/i);return {width:e*s,height:i*s}}hexToRgb(e){e=e.replace(/^#/,""),e.length===3&&(e=e.split("").map(s=>s+s).join(""));let i=parseInt(e.substring(0,2),16),o=parseInt(e.substring(2,4),16),r=parseInt(e.substring(4,6),16);return {r:isNaN(i)?0:i,g:isNaN(o)?0:o,b:isNaN(r)?0:r}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var ll=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],cl=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function hl(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return ll.includes(`.${o}`)}function dl(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return cl.includes(`.${o}`)}exports.AutoFieldUpload=class Ze extends R{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new Ao(this);}retryUpload(i){this.startUpload(i.file,i.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto"}}_getDefaultFileLabel(i){return typeof i=="string"?i:i.title||i.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(i=>i!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(i){let o=i.target;if(!o.files||o.files.length===0)return;Array.from(o.files).forEach(s=>this.uploadFile(s)),o.value="";}handleDragOver(i){i.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(i){i.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(i){if(i.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!i.dataTransfer?.files)return;let r=Array.from(i.dataTransfer.files);if(!this.options?.multiple&&r.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=r.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(c=>c==="*"?true:c.startsWith(".")?n.name.toLowerCase().endsWith(c.toLowerCase()):n.type.startsWith(c)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}r.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(i){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let o={id:this.generateId(),file:i,progress:0,status:"uploading",value:{url:i.name}};return this.files.push(o),this.startUpload(i,o.id)}_updateFileRecord(i,o){let r=this.files.findIndex(s=>s.id===i);r!==-1&&(this.files=[...this.files.slice(0,r),{...this.files[r],...o},...this.files.slice(r+1)]);}_getResponseError(i){let o="\u4E0A\u4F20\u5931\u8D25";try{let r=JSON.parse(i.responseText);o=r.message||r.error||o;}catch{switch(i.status){case 400:o="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:o="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:o="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:o="\u6587\u4EF6\u592A\u5927";break;case 415:o="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:o="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:o="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:o=`\u4E0A\u4F20\u5931\u8D25 (${i.status})`;}}return new Error(o)}_defaultFileResolver(i){if(typeof i=="string")return i;if(typeof i=="object"){if(!i.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return i}}_parseUploadResponse(i){let o={};try{Object.assign(o,JSON.parse(i));}catch{o=i;}return typeof this.options.onResolve=="function"&&(o=this.options.onResolve(o)),o}async startUpload(i,o){let r=this.files.findIndex(n=>n.id===o);if(r===-1)return;let s=this.files[r];return new Promise((n,c)=>{let l=new XMLHttpRequest,p=new FormData;p.append(this.options.fileFieldName,i),l.upload.onprogress=m=>{if(m.lengthComputable){let d=Math.round(m.loaded/m.total*100);this._updateFileRecord(o,{progress:d});}},l.onload=()=>{if(this.files.findIndex(d=>d.id===o)!==-1)if(l.status>=200&&l.status<300){this._updateFileRecord(o,{status:"done"});try{let d=this._parseUploadResponse(l.responseText);this._updateFileRecord(o,{value:d}),s.status="done",this.onFieldChange(),n();}catch{let d=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(o,d),c(d);}}else {let d=this._getResponseError(l);this.handleUploadError(o,d),c(d);}},l.onerror=()=>{if(this.files.findIndex(u=>u.id===o)===-1)return;let d=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(o,d),c(d);},l.ontimeout=()=>{if(this.files.findIndex(u=>u.id===o)===-1)return;let d=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(o,d),c(d);},l.open("POST",this.options.url),this._updateFileRecord(o,{progress:0,status:"uploading"}),l.send(p);})}handleUploadError(i,o){this._updateFileRecord(i,{error:o.message,status:"error"});}deleteFile(i){let o=this.files.findIndex(c=>c.id===i);if(o===-1)return;let r=this.files[o],s=r.status==="uploading"||r.status==="error",n=()=>{this.files=[...this.files.slice(0,o),...this.files.slice(o+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,r.value)).then(()=>{n(),this.onFieldChange();}).catch(c=>{alert(c.message);}):(n(),this.onFieldChange());}getInputValue(){return this.options.multiple?this.files.map(i=>i.value):this.files.length>0?this.files[0].value:void 0}getStateValue(){let i=super.getStateValue();return Array.isArray(i)||(i=[i]),this.files=i.map((o,r)=>{let s={id:String(r),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof o=="string"?s.value=o:typeof o=="object"&&(s.value=Object.assign({},s.value,o)),s}),i}renderProgressbar(i,o){if(i.status!=="uploading")return;let r=o==="hori"?`width:${i.progress}%;`:`height:${i.progress}%;top:${100-i.progress}%`;return f`<span 
            class="uploading progressbar ${L({hori:o==="hori",vert:o==="vert"})}"
            style="${r}"
        >
            <span class="value">${i.progress}%</span>
        </span>
        `}renderFileContent(i){if(i.error)return;let o=typeof i.value=="string"?i.value:i.value.url,r;if(hl(o))r=f`
                <img class="content" src="${o}"/>
            `;else if(dl(o))r=f`
                <video class="content" src="${o}"></video>
            `;else {let s=o.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,r=f`<div class="content">${s}</div>`;}return r}renderFilePreview(i){let o=!!i.error,r=typeof this.options.preview=="boolean"?"80px":this.options.preview;return f`
            <div class="file preview ${L({error:o})}"
                title=${i.error||this.options.onFileLabel(i.value)}
                style="${J({width:r,height:r})}"
            >   ${this.renderFileContent(i)}
                ${this.renderProgressbar(i,"vert")}
                ${st(i.status==="error",()=>f`<div class="error" title="${i.error}">
                        <span>上传出错</span>
                        <span>
                            <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(i.id)}></sl-icon>    
                            <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(i)}></sl-icon>
                        </span>
                    </div>`,()=>{if(!this.context.viewonly)return f`<sl-icon name="remove" @click=${()=>this.deleteFile(i.id)}></sl-icon>`})}                               
            </div> 
        `}renderFile(i){let o=!!i.error;return f`
            <magic-flex class="file default ${L({error:o})}" wrap align="center" gap="0.5rem"
                title=${C(i.error)}
            > 
                ${this.renderProgressbar(i,"hori")}
                <span class="label">${this.options.onFileLabel(i.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(i.id)}></sl-icon>
                ${st(i.status==="error",()=>f`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(i)}></sl-icon>`)}                               
            </magic-flex> 
        `}renderFiels(){return f`<magic-flex class="files" grow='none' gap="0.5rem" wrap>
            ${st(this.files.length>0,()=>Rt(this.files,i=>this.options.preview?this.renderFilePreview(i):this.renderFile(i)),()=>f`<span class='placeholder'>${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </magic-flex>`}renderInput(){return f`
            <magic-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${st(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>f`<div class="indicator"
                            @click=${this.handleUploadClick}
                            @dragover=${this.handleDragOver}
                            @dragleave=${this.handleDragLeave}
                            @drop=${this.handleDrop}>
                            ${this.options.tips}
                        </div>`)}                
                <magic-flex class="actions" align="center" grow=".actions.after" gap="0.5rem" >
                    ${st(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>f`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}                    
                    ${this.renderActions(false)}  
                </magic-flex>
            </magic-flex>
        `}renderView(){return this.renderFiels()}};exports.AutoFieldUpload.styles=[R.styles,_`
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
 
        `],x([T()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=x([z("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class To extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=x([z("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class Ti extends R{getInitialOptions(){return {size:"medium"}}_onPartFocus(e){e.target.select();}_getIpBits(){let e=this.value?.split(".");return [parseInt(e[0]||"0"),parseInt(e[1]||"0"),parseInt(e[2]||"0"),parseInt(e[3]||"0")]}_onIpChange(e,i){this.onFieldChange(),this._isLastInput(i);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(i=>i.value).join(".")}_isLastInput(e){let i=e.target;if(i.value.length>=3){i.blur();let o=i.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(e){e.preventDefault();let i=e.target,o=e.clipboardData?.getData("text/plain")||"",r=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=o.match(r);if(!s)return;let n=[],c=i;for(let l=0;l<4&&c;l++)c.tagName==="SL-INPUT"&&n.push(c),c=c.nextElementSibling?.nextElementSibling;for(let l=0;l<Math.min(4,n.length);l++)n[l].value=s[l+1],n[l].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let l=n[Math.min(3,n.length-1)];l.focus(),l.select();}}renderInput(){return f`
            <magic-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((e,i)=>f`
                    <sl-input 
                        value="${e}" 
                        name=${this.name} 
                        data-path = ${this.path}
                        defaultValue='0' 
                        size=${this.context.size}
                        maxLength="3"
                        minLength="1"
                        max="255"
                        min="0"
                        @sl-input=${o=>this._onIpChange(i,o)}
                        @sl-change=${o=>this._onIpChange(i,o)} 
                        @sl-focus=${this._onPartFocus.bind(this)}
                        @paste=${o=>this._onPaste(o)}
                    ></sl-input>
                    ${i<3?f`<span class="dot">.</span>`:""}                    
                `)} 
            </magic-flex>
        `}};exports.AutoFieldIpAddress.styles=[R.styles,_` 
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
    `],exports.AutoFieldIpAddress=x([z("auto-field-ipaddress")],exports.AutoFieldIpAddress);var tn=_`
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
`;var en=_`
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
`;var $t=class extends O{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,e=t?Je`a`:Je`button`;return xe`
      <${e}
        part="base"
        class=${L({"icon-button":true,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
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
      </${e}>
    `}};$t.styles=[P,en];$t.dependencies={"sl-icon":W};a([A(".icon-button")],$t.prototype,"button",2);a([T()],$t.prototype,"hasFocus",2);a([h()],$t.prototype,"name",2);a([h()],$t.prototype,"library",2);a([h()],$t.prototype,"src",2);a([h()],$t.prototype,"href",2);a([h()],$t.prototype,"target",2);a([h()],$t.prototype,"download",2);a([h()],$t.prototype,"label",2);a([h({type:Boolean,reflect:true})],$t.prototype,"disabled",2);var wr=new Set,ti=new Map,ze,_r="ltr",kr="en",on=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(on){let t=new MutationObserver(rn);_r=document.documentElement.dir||"ltr",kr=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function Ii(...t){t.map(e=>{let i=e.$code.toLowerCase();ti.has(i)?ti.set(i,Object.assign(Object.assign({},ti.get(i)),e)):ti.set(i,e),ze||(ze=e);}),rn();}function rn(){on&&(_r=document.documentElement.dir||"ltr",kr=document.documentElement.lang||navigator.language),[...wr.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var Io=class{constructor(e){this.host=e,this.host.addController(this);}hostConnected(){wr.add(this.host);}hostDisconnected(){wr.delete(this.host);}dir(){return `${this.host.dir||_r}`.toLowerCase()}lang(){return `${this.host.lang||kr}`.toLowerCase()}getTranslationData(e){var i,o;let r=new Intl.Locale(e.replace(/_/g,"-")),s=r?.language.toLowerCase(),n=(o=(i=r?.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&o!==void 0?o:"",c=ti.get(`${s}-${n}`),l=ti.get(s);return {locale:r,language:s,region:n,primary:c,secondary:l}}exists(e,i){var o;let{primary:r,secondary:s}=this.getTranslationData((o=i.lang)!==null&&o!==void 0?o:this.lang());return i=Object.assign({includeFallback:false},i),!!(r&&r[e]||s&&s[e]||i.includeFallback&&ze&&ze[e])}term(e,...i){let{primary:o,secondary:r}=this.getTranslationData(this.lang()),s;if(o&&o[e])s=o[e];else if(r&&r[e])s=r[e];else if(ze&&ze[e])s=ze[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...i):s}date(e,i){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),i).format(e)}number(e,i){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),i).format(e)}relativeTime(e,i,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,i)}};var sn={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Ii(sn);var nn=sn;var G=class extends Io{};Ii(nn);var Yt=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return f`
      <span
        part="base"
        class=${L({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
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
    `}};Yt.styles=[P,tn];Yt.dependencies={"sl-icon-button":$t};a([h({reflect:true})],Yt.prototype,"variant",2);a([h({reflect:true})],Yt.prototype,"size",2);a([h({type:Boolean,reflect:true})],Yt.prototype,"pill",2);a([h({type:Boolean})],Yt.prototype,"removable",2);var an=_`
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
`;function pl(t,e){return {top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function ln(t,e,i="vertical",o="smooth"){let r=pl(t,e),s=r.top+e.scrollTop,n=r.left+e.scrollLeft,c=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,p=e.scrollTop,m=e.scrollTop+e.offsetHeight;(i==="horizontal"||i==="both")&&(n<c?e.scrollTo({left:n,behavior:o}):n+t.clientWidth>l&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:o})),(i==="vertical"||i==="both")&&(s<p?e.scrollTo({top:s,behavior:o}):s+t.clientHeight>m&&e.scrollTo({top:s-e.offsetHeight+t.clientHeight,behavior:o}));}var cn=_`
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
`;var Xt=Math.min,xt=Math.max,Ri=Math.round,Oi=Math.floor,qt=t=>({x:t,y:t}),ul={left:"right",right:"left",bottom:"top",top:"bottom"},ml={start:"end",end:"start"};function Ro(t,e,i){return xt(t,Xt(e,i))}function Re(t,e){return typeof t=="function"?t(e):t}function ee(t){return t.split("-")[0]}function Oe(t){return t.split("-")[1]}function Cr(t){return t==="x"?"y":"x"}function Oo(t){return t==="y"?"height":"width"}function ie(t){return ["top","bottom"].includes(ee(t))?"y":"x"}function Mo(t){return Cr(ie(t))}function hn(t,e,i){i===void 0&&(i=false);let o=Oe(t),r=Mo(t),s=Oo(r),n=r==="x"?o===(i?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(n=zi(n)),[n,zi(n)]}function dn(t){let e=zi(t);return [zo(t),e,zo(e)]}function zo(t){return t.replace(/start|end/g,e=>ml[e])}function fl(t,e,i){let o=["left","right"],r=["right","left"],s=["top","bottom"],n=["bottom","top"];switch(t){case "top":case "bottom":return i?e?r:o:e?o:r;case "left":case "right":return e?s:n;default:return []}}function pn(t,e,i,o){let r=Oe(t),s=fl(ee(t),i==="start",o);return r&&(s=s.map(n=>n+"-"+r),e&&(s=s.concat(s.map(zo)))),s}function zi(t){return t.replace(/left|right|bottom|top/g,e=>ul[e])}function gl(t){return {top:0,right:0,bottom:0,left:0,...t}}function $r(t){return typeof t!="number"?gl(t):{top:t,right:t,bottom:t,left:t}}function Me(t){let{x:e,y:i,width:o,height:r}=t;return {width:o,height:r,top:i,left:e,right:e+o,bottom:i+r,x:e,y:i}}function un(t,e,i){let{reference:o,floating:r}=t,s=ie(e),n=Mo(e),c=Oo(n),l=ee(e),p=s==="y",m=o.x+o.width/2-r.width/2,d=o.y+o.height/2-r.height/2,u=o[c]/2-r[c]/2,g;switch(l){case "top":g={x:m,y:o.y-r.height};break;case "bottom":g={x:m,y:o.y+o.height};break;case "right":g={x:o.x+o.width,y:d};break;case "left":g={x:o.x-r.width,y:d};break;default:g={x:o.x,y:o.y};}switch(Oe(e)){case "start":g[n]-=u*(i&&p?-1:1);break;case "end":g[n]+=u*(i&&p?-1:1);break}return g}var mn=async(t,e,i)=>{let{placement:o="bottom",strategy:r="absolute",middleware:s=[],platform:n}=i,c=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e)),p=await n.getElementRects({reference:t,floating:e,strategy:r}),{x:m,y:d}=un(p,o,l),u=o,g={},b=0;for(let v=0;v<c.length;v++){let{name:E,fn:$}=c[v],{x:w,y:S,data:y,reset:k}=await $({x:m,y:d,initialPlacement:o,placement:u,strategy:r,middlewareData:g,rects:p,platform:n,elements:{reference:t,floating:e}});m=w??m,d=S??d,g={...g,[E]:{...g[E],...y}},k&&b<=50&&(b++,typeof k=="object"&&(k.placement&&(u=k.placement),k.rects&&(p=k.rects===true?await n.getElementRects({reference:t,floating:e,strategy:r}):k.rects),{x:m,y:d}=un(p,u,l)),v=-1);}return {x:m,y:d,placement:u,strategy:r,middlewareData:g}};async function Lo(t,e){var i;e===void 0&&(e={});let{x:o,y:r,platform:s,rects:n,elements:c,strategy:l}=t,{boundary:p="clippingAncestors",rootBoundary:m="viewport",elementContext:d="floating",altBoundary:u=false,padding:g=0}=Re(e,t),b=$r(g),E=c[u?d==="floating"?"reference":"floating":d],$=Me(await s.getClippingRect({element:(i=await(s.isElement==null?void 0:s.isElement(E)))==null||i?E:E.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:m,strategy:l})),w=d==="floating"?{x:o,y:r,width:n.floating.width,height:n.floating.height}:n.reference,S=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),y=await(s.isElement==null?void 0:s.isElement(S))?await(s.getScale==null?void 0:s.getScale(S))||{x:1,y:1}:{x:1,y:1},k=Me(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:w,offsetParent:S,strategy:l}):w);return {top:($.top-k.top+b.top)/y.y,bottom:(k.bottom-$.bottom+b.bottom)/y.y,left:($.left-k.left+b.left)/y.x,right:(k.right-$.right+b.right)/y.x}}var fn=t=>({name:"arrow",options:t,async fn(e){let{x:i,y:o,placement:r,rects:s,platform:n,elements:c,middlewareData:l}=e,{element:p,padding:m=0}=Re(t,e)||{};if(p==null)return {};let d=$r(m),u={x:i,y:o},g=Mo(r),b=Oo(g),v=await n.getDimensions(p),E=g==="y",$=E?"top":"left",w=E?"bottom":"right",S=E?"clientHeight":"clientWidth",y=s.reference[b]+s.reference[g]-u[g]-s.floating[b],k=u[g]-s.reference[g],V=await(n.getOffsetParent==null?void 0:n.getOffsetParent(p)),F=V?V[S]:0;(!F||!await(n.isElement==null?void 0:n.isElement(V)))&&(F=c.floating[S]||s.floating[b]);let U=y/2-k/2,D=F/2-v[b]/2-1,M=Xt(d[$],D),lt=Xt(d[w],D),ot=M,bt=F-v[b]-lt,yt=F/2-v[b]/2+U,vt=Ro(ot,yt,bt),ce=!l.arrow&&Oe(r)!=null&&yt!==vt&&s.reference[b]/2-(yt<ot?M:lt)-v[b]/2<0,Qt=ce?yt<ot?yt-ot:yt-bt:0;return {[g]:u[g]+Qt,data:{[g]:vt,centerOffset:yt-vt-Qt,...ce&&{alignmentOffset:Qt}},reset:ce}}});var gn=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var i,o;let{placement:r,middlewareData:s,rects:n,initialPlacement:c,platform:l,elements:p}=e,{mainAxis:m=true,crossAxis:d=true,fallbackPlacements:u,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=true,...E}=Re(t,e);if((i=s.arrow)!=null&&i.alignmentOffset)return {};let $=ee(r),w=ie(c),S=ee(c)===c,y=await(l.isRTL==null?void 0:l.isRTL(p.floating)),k=u||(S||!v?[zi(c)]:dn(c)),V=b!=="none";!u&&V&&k.push(...pn(c,v,b,y));let F=[c,...k],U=await Lo(e,E),D=[],M=((o=s.flip)==null?void 0:o.overflows)||[];if(m&&D.push(U[$]),d){let vt=hn(r,n,y);D.push(U[vt[0]],U[vt[1]]);}if(M=[...M,{placement:r,overflows:D}],!D.every(vt=>vt<=0)){var lt,ot;let vt=(((lt=s.flip)==null?void 0:lt.index)||0)+1,ce=F[vt];if(ce){var bt;let he=d==="alignment"?w!==ie(ce):false,Kt=((bt=M[0])==null?void 0:bt.overflows[0])>0;if(!he||Kt)return {data:{index:vt,overflows:M},reset:{placement:ce}}}let Qt=(ot=M.filter(he=>he.overflows[0]<=0).sort((he,Kt)=>he.overflows[1]-Kt.overflows[1])[0])==null?void 0:ot.placement;if(!Qt)switch(g){case "bestFit":{var yt;let he=(yt=M.filter(Kt=>{if(V){let de=ie(Kt.placement);return de===w||de==="y"}return  true}).map(Kt=>[Kt.placement,Kt.overflows.filter(de=>de>0).reduce((de,Sa)=>de+Sa,0)]).sort((Kt,de)=>Kt[1]-de[1])[0])==null?void 0:yt[0];he&&(Qt=he);break}case "initialPlacement":Qt=c;break}if(r!==Qt)return {reset:{placement:Qt}}}return {}}}};async function bl(t,e){let{placement:i,platform:o,elements:r}=t,s=await(o.isRTL==null?void 0:o.isRTL(r.floating)),n=ee(i),c=Oe(i),l=ie(i)==="y",p=["left","top"].includes(n)?-1:1,m=s&&l?-1:1,d=Re(e,t),{mainAxis:u,crossAxis:g,alignmentAxis:b}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return c&&typeof b=="number"&&(g=c==="end"?b*-1:b),l?{x:g*m,y:u*p}:{x:u*p,y:g*m}}var bn=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var i,o;let{x:r,y:s,placement:n,middlewareData:c}=e,l=await bl(e,t);return n===((i=c.offset)==null?void 0:i.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:r+l.x,y:s+l.y,data:{...l,placement:n}}}}},vn=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:i,y:o,placement:r}=e,{mainAxis:s=true,crossAxis:n=false,limiter:c={fn:E=>{let{x:$,y:w}=E;return {x:$,y:w}}},...l}=Re(t,e),p={x:i,y:o},m=await Lo(e,l),d=ie(ee(r)),u=Cr(d),g=p[u],b=p[d];if(s){let E=u==="y"?"top":"left",$=u==="y"?"bottom":"right",w=g+m[E],S=g-m[$];g=Ro(w,g,S);}if(n){let E=d==="y"?"top":"left",$=d==="y"?"bottom":"right",w=b+m[E],S=b-m[$];b=Ro(w,b,S);}let v=c.fn({...e,[u]:g,[d]:b});return {...v,data:{x:v.x-i,y:v.y-o,enabled:{[u]:s,[d]:n}}}}}};var yn=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var i,o;let{placement:r,rects:s,platform:n,elements:c}=e,{apply:l=()=>{},...p}=Re(t,e),m=await Lo(e,p),d=ee(r),u=Oe(r),g=ie(r)==="y",{width:b,height:v}=s.floating,E,$;d==="top"||d==="bottom"?(E=d,$=u===(await(n.isRTL==null?void 0:n.isRTL(c.floating))?"start":"end")?"left":"right"):($=d,E=u==="end"?"top":"bottom");let w=v-m.top-m.bottom,S=b-m.left-m.right,y=Xt(v-m[E],w),k=Xt(b-m[$],S),V=!e.middlewareData.shift,F=y,U=k;if((i=e.middlewareData.shift)!=null&&i.enabled.x&&(U=S),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(F=w),V&&!u){let M=xt(m.left,0),lt=xt(m.right,0),ot=xt(m.top,0),bt=xt(m.bottom,0);g?U=b-2*(M!==0||lt!==0?M+lt:xt(m.left,m.right)):F=v-2*(ot!==0||bt!==0?ot+bt:xt(m.top,m.bottom));}await l({...e,availableWidth:U,availableHeight:F});let D=await n.getDimensions(c.floating);return b!==D.width||v!==D.height?{reset:{rects:true}}:{}}}};function Po(){return typeof window<"u"}function Le(t){return wn(t)?(t.nodeName||"").toLowerCase():"#document"}function St(t){var e;return (t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Wt(t){var e;return (e=(wn(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function wn(t){return Po()?t instanceof Node||t instanceof St(t).Node:false}function Ht(t){return Po()?t instanceof Element||t instanceof St(t).Element:false}function jt(t){return Po()?t instanceof HTMLElement||t instanceof St(t).HTMLElement:false}function xn(t){return !Po()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof St(t).ShadowRoot}function ii(t){let{overflow:e,overflowX:i,overflowY:o,display:r}=Ft(t);return /auto|scroll|overlay|hidden|clip/.test(e+o+i)&&!["inline","contents"].includes(r)}function _n(t){return ["table","td","th"].includes(Le(t))}function Mi(t){return [":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return  false}})}function oi(t){let e=Vo(),i=Ht(t)?Ft(t):t;return ["transform","translate","scale","rotate","perspective"].some(o=>i[o]?i[o]!=="none":false)||(i.containerType?i.containerType!=="normal":false)||!e&&(i.backdropFilter?i.backdropFilter!=="none":false)||!e&&(i.filter?i.filter!=="none":false)||["transform","translate","scale","rotate","perspective","filter"].some(o=>(i.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(i.contain||"").includes(o))}function kn(t){let e=oe(t);for(;jt(e)&&!Pe(e);){if(oi(e))return e;if(Mi(e))return null;e=oe(e);}return null}function Vo(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}function Pe(t){return ["html","body","#document"].includes(Le(t))}function Ft(t){return St(t).getComputedStyle(t)}function Li(t){return Ht(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function oe(t){if(Le(t)==="html")return t;let e=t.assignedSlot||t.parentNode||xn(t)&&t.host||Wt(t);return xn(e)?e.host:e}function Cn(t){let e=oe(t);return Pe(e)?t.ownerDocument?t.ownerDocument.body:t.body:jt(e)&&ii(e)?e:Cn(e)}function ei(t,e,i){var o;e===void 0&&(e=[]),i===void 0&&(i=true);let r=Cn(t),s=r===((o=t.ownerDocument)==null?void 0:o.body),n=St(r);if(s){let c=Do(n);return e.concat(n,n.visualViewport||[],ii(r)?r:[],c&&i?ei(c):[])}return e.concat(r,ei(r,[],i))}function Do(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function En(t){let e=Ft(t),i=parseFloat(e.width)||0,o=parseFloat(e.height)||0,r=jt(t),s=r?t.offsetWidth:i,n=r?t.offsetHeight:o,c=Ri(i)!==s||Ri(o)!==n;return c&&(i=s,o=n),{width:i,height:o,$:c}}function Er(t){return Ht(t)?t:t.contextElement}function ri(t){let e=Er(t);if(!jt(e))return qt(1);let i=e.getBoundingClientRect(),{width:o,height:r,$:s}=En(e),n=(s?Ri(i.width):i.width)/o,c=(s?Ri(i.height):i.height)/r;return (!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}var vl=qt(0);function An(t){let e=St(t);return !Vo()||!e.visualViewport?vl:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function yl(t,e,i){return e===void 0&&(e=false),!i||e&&i!==St(t)?false:e}function Ve(t,e,i,o){e===void 0&&(e=false),i===void 0&&(i=false);let r=t.getBoundingClientRect(),s=Er(t),n=qt(1);e&&(o?Ht(o)&&(n=ri(o)):n=ri(t));let c=yl(s,i,o)?An(s):qt(0),l=(r.left+c.x)/n.x,p=(r.top+c.y)/n.y,m=r.width/n.x,d=r.height/n.y;if(s){let u=St(s),g=o&&Ht(o)?St(o):o,b=u,v=Do(b);for(;v&&o&&g!==b;){let E=ri(v),$=v.getBoundingClientRect(),w=Ft(v),S=$.left+(v.clientLeft+parseFloat(w.paddingLeft))*E.x,y=$.top+(v.clientTop+parseFloat(w.paddingTop))*E.y;l*=E.x,p*=E.y,m*=E.x,d*=E.y,l+=S,p+=y,b=St(v),v=Do(b);}}return Me({width:m,height:d,x:l,y:p})}function Ar(t,e){let i=Li(t).scrollLeft;return e?e.left+i:Ve(Wt(t)).left+i}function Tn(t,e,i){i===void 0&&(i=false);let o=t.getBoundingClientRect(),r=o.left+e.scrollLeft-(i?0:Ar(t,o)),s=o.top+e.scrollTop;return {x:r,y:s}}function xl(t){let{elements:e,rect:i,offsetParent:o,strategy:r}=t,s=r==="fixed",n=Wt(o),c=e?Mi(e.floating):false;if(o===n||c&&s)return i;let l={scrollLeft:0,scrollTop:0},p=qt(1),m=qt(0),d=jt(o);if((d||!d&&!s)&&((Le(o)!=="body"||ii(n))&&(l=Li(o)),jt(o))){let g=Ve(o);p=ri(o),m.x=g.x+o.clientLeft,m.y=g.y+o.clientTop;}let u=n&&!d&&!s?Tn(n,l,true):qt(0);return {width:i.width*p.x,height:i.height*p.y,x:i.x*p.x-l.scrollLeft*p.x+m.x+u.x,y:i.y*p.y-l.scrollTop*p.y+m.y+u.y}}function wl(t){return Array.from(t.getClientRects())}function _l(t){let e=Wt(t),i=Li(t),o=t.ownerDocument.body,r=xt(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),s=xt(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),n=-i.scrollLeft+Ar(t),c=-i.scrollTop;return Ft(o).direction==="rtl"&&(n+=xt(e.clientWidth,o.clientWidth)-r),{width:r,height:s,x:n,y:c}}function kl(t,e){let i=St(t),o=Wt(t),r=i.visualViewport,s=o.clientWidth,n=o.clientHeight,c=0,l=0;if(r){s=r.width,n=r.height;let p=Vo();(!p||p&&e==="fixed")&&(c=r.offsetLeft,l=r.offsetTop);}return {width:s,height:n,x:c,y:l}}function Cl(t,e){let i=Ve(t,true,e==="fixed"),o=i.top+t.clientTop,r=i.left+t.clientLeft,s=jt(t)?ri(t):qt(1),n=t.clientWidth*s.x,c=t.clientHeight*s.y,l=r*s.x,p=o*s.y;return {width:n,height:c,x:l,y:p}}function $n(t,e,i){let o;if(e==="viewport")o=kl(t,i);else if(e==="document")o=_l(Wt(t));else if(Ht(e))o=Cl(e,i);else {let r=An(t);o={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height};}return Me(o)}function In(t,e){let i=oe(t);return i===e||!Ht(i)||Pe(i)?false:Ft(i).position==="fixed"||In(i,e)}function $l(t,e){let i=e.get(t);if(i)return i;let o=ei(t,[],false).filter(c=>Ht(c)&&Le(c)!=="body"),r=null,s=Ft(t).position==="fixed",n=s?oe(t):t;for(;Ht(n)&&!Pe(n);){let c=Ft(n),l=oi(n);!l&&c.position==="fixed"&&(r=null),(s?!l&&!r:!l&&c.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||ii(n)&&!l&&In(t,n))?o=o.filter(m=>m!==n):r=c,n=oe(n);}return e.set(t,o),o}function Sl(t){let{element:e,boundary:i,rootBoundary:o,strategy:r}=t,n=[...i==="clippingAncestors"?Mi(e)?[]:$l(e,this._c):[].concat(i),o],c=n[0],l=n.reduce((p,m)=>{let d=$n(e,m,r);return p.top=xt(d.top,p.top),p.right=Xt(d.right,p.right),p.bottom=Xt(d.bottom,p.bottom),p.left=xt(d.left,p.left),p},$n(e,c,r));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function El(t){let{width:e,height:i}=En(t);return {width:e,height:i}}function Al(t,e,i){let o=jt(e),r=Wt(e),s=i==="fixed",n=Ve(t,true,s,e),c={scrollLeft:0,scrollTop:0},l=qt(0);function p(){l.x=Ar(r);}if(o||!o&&!s)if((Le(e)!=="body"||ii(r))&&(c=Li(e)),o){let g=Ve(e,true,s,e);l.x=g.x+e.clientLeft,l.y=g.y+e.clientTop;}else r&&p();s&&!o&&r&&p();let m=r&&!o&&!s?Tn(r,c):qt(0),d=n.left+c.scrollLeft-l.x-m.x,u=n.top+c.scrollTop-l.y-m.y;return {x:d,y:u,width:n.width,height:n.height}}function Sr(t){return Ft(t).position==="static"}function Sn(t,e){if(!jt(t)||Ft(t).position==="fixed")return null;if(e)return e(t);let i=t.offsetParent;return Wt(t)===i&&(i=i.ownerDocument.body),i}function zn(t,e){let i=St(t);if(Mi(t))return i;if(!jt(t)){let r=oe(t);for(;r&&!Pe(r);){if(Ht(r)&&!Sr(r))return r;r=oe(r);}return i}let o=Sn(t,e);for(;o&&_n(o)&&Sr(o);)o=Sn(o,e);return o&&Pe(o)&&Sr(o)&&!oi(o)?i:o||kn(t)||i}var Tl=async function(t){let e=this.getOffsetParent||zn,i=this.getDimensions,o=await i(t.floating);return {reference:Al(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Il(t){return Ft(t).direction==="rtl"}var Pi={convertOffsetParentRelativeRectToViewportRelativeRect:xl,getDocumentElement:Wt,getClippingRect:Sl,getOffsetParent:zn,getElementRects:Tl,getClientRects:wl,getDimensions:El,getScale:ri,isElement:Ht,isRTL:Il};function Rn(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function zl(t,e){let i=null,o,r=Wt(t);function s(){var c;clearTimeout(o),(c=i)==null||c.disconnect(),i=null;}function n(c,l){c===void 0&&(c=false),l===void 0&&(l=1),s();let p=t.getBoundingClientRect(),{left:m,top:d,width:u,height:g}=p;if(c||e(),!u||!g)return;let b=Oi(d),v=Oi(r.clientWidth-(m+u)),E=Oi(r.clientHeight-(d+g)),$=Oi(m),S={rootMargin:-b+"px "+-v+"px "+-E+"px "+-$+"px",threshold:xt(0,Xt(1,l))||1},y=true;function k(V){let F=V[0].intersectionRatio;if(F!==l){if(!y)return n();F?n(false,F):o=setTimeout(()=>{n(false,1e-7);},1e3);}F===1&&!Rn(p,t.getBoundingClientRect())&&n(),y=false;}try{i=new IntersectionObserver(k,{...S,root:r.ownerDocument});}catch{i=new IntersectionObserver(k,S);}i.observe(t);}return n(true),s}function On(t,e,i,o){o===void 0&&(o={});let{ancestorScroll:r=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=false}=o,p=Er(t),m=r||s?[...p?ei(p):[],...ei(e)]:[];m.forEach($=>{r&&$.addEventListener("scroll",i,{passive:true}),s&&$.addEventListener("resize",i);});let d=p&&c?zl(p,i):null,u=-1,g=null;n&&(g=new ResizeObserver($=>{let[w]=$;w&&w.target===p&&g&&(g.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var S;(S=g)==null||S.observe(e);})),i();}),p&&!l&&g.observe(p),g.observe(e));let b,v=l?Ve(t):null;l&&E();function E(){let $=Ve(t);v&&!Rn(v,$)&&i(),v=$,b=requestAnimationFrame(E);}return i(),()=>{var $;m.forEach(w=>{r&&w.removeEventListener("scroll",i),s&&w.removeEventListener("resize",i);}),d?.(),($=g)==null||$.disconnect(),g=null,l&&cancelAnimationFrame(b);}}var Mn=bn;var Ln=vn,Pn=gn,Tr=yn;var Vn=fn;var Dn=(t,e,i)=>{let o=new Map,r={platform:Pi,...i},s={...r.platform,_c:o};return mn(t,e,{...r,platform:s})};function Hn(t){return Rl(t)}function Ir(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Rl(t){for(let e=t;e;e=Ir(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Ir(t);e;e=Ir(e)){if(!(e instanceof Element))continue;let i=getComputedStyle(e);if(i.display!=="contents"&&(i.position!=="static"||oi(i)||e.tagName==="BODY"))return e}return null}function Ol(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var K=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),o=0,r=0,s=0,n=0,c=0,l=0,p=0,m=0;i?t.top<e.top?(o=t.left,r=t.bottom,s=t.right,n=t.bottom,c=e.left,l=e.top,p=e.right,m=e.top):(o=e.left,r=e.bottom,s=e.right,n=e.bottom,c=t.left,l=t.top,p=t.right,m=t.top):t.left<e.left?(o=t.right,r=t.top,s=e.left,n=e.top,c=t.right,l=t.bottom,p=e.left,m=e.bottom):(o=e.right,r=e.top,s=t.left,n=t.top,c=e.right,l=e.bottom,p=t.left,m=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${m}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||Ol(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=On(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Mn({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Tr({apply:({rects:i})=>{let o=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=r?`${i.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Pn({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Ln({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Tr({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Vn({element:this.arrowEl,padding:this.arrowPadding}));let e=this.strategy==="absolute"?i=>Pi.getOffsetParent(i,Hn):Pi.getOffsetParent;Dn(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:te(Ct({},Pi),{getOffsetParent:e})}).then(({x:i,y:o,middlewareData:r,placement:s})=>{let n=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){let l=r.arrow.x,p=r.arrow.y,m="",d="",u="",g="";if(this.arrowPlacement==="start"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=n?"":b,g=n?b:"",u=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",m=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",m=typeof p=="number"?`${p}px`:"");Object.assign(this.arrowEl.style,{top:m,right:d,bottom:u,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return f`
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
        ${this.arrow?f`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};K.styles=[P,cn];a([A(".popup")],K.prototype,"popup",2);a([A(".popup__arrow")],K.prototype,"arrowEl",2);a([h()],K.prototype,"anchor",2);a([h({type:Boolean,reflect:true})],K.prototype,"active",2);a([h({reflect:true})],K.prototype,"placement",2);a([h({reflect:true})],K.prototype,"strategy",2);a([h({type:Number})],K.prototype,"distance",2);a([h({type:Number})],K.prototype,"skidding",2);a([h({type:Boolean})],K.prototype,"arrow",2);a([h({attribute:"arrow-placement"})],K.prototype,"arrowPlacement",2);a([h({attribute:"arrow-padding",type:Number})],K.prototype,"arrowPadding",2);a([h({type:Boolean})],K.prototype,"flip",2);a([h({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],K.prototype,"flipFallbackPlacements",2);a([h({attribute:"flip-fallback-strategy"})],K.prototype,"flipFallbackStrategy",2);a([h({type:Object})],K.prototype,"flipBoundary",2);a([h({attribute:"flip-padding",type:Number})],K.prototype,"flipPadding",2);a([h({type:Boolean})],K.prototype,"shift",2);a([h({type:Object})],K.prototype,"shiftBoundary",2);a([h({attribute:"shift-padding",type:Number})],K.prototype,"shiftPadding",2);a([h({attribute:"auto-size"})],K.prototype,"autoSize",2);a([h()],K.prototype,"sync",2);a([h({type:Object})],K.prototype,"autoSizeBoundary",2);a([h({attribute:"auto-size-padding",type:Number})],K.prototype,"autoSizePadding",2);a([h({attribute:"hover-bridge",type:Boolean})],K.prototype,"hoverBridge",2);var Nn=new Map,Ml=new WeakMap;function Ll(t){return t??{keyframes:[],options:{duration:0}}}function Fn(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function re(t,e){Nn.set(t,Ll(e));}function se(t,e,i){let o=Ml.get(t);if(o?.[e])return Fn(o[e],i.dir);let r=Nn.get(e);return r?Fn(r,i.dir):{keyframes:[],options:{duration:0}}}function si(t,e){return new Promise(i=>{function o(r){r.target===t&&(t.removeEventListener(e,o),i());}t.addEventListener(e,o);})}function ne(t,e,i){return new Promise(o=>{if(i?.duration===1/0)throw new Error("Promise-based animations must be finite.");let r=t.animate(e,te(Ct({},i),{duration:Pl()?0:i.duration}));r.addEventListener("cancel",o,{once:true}),r.addEventListener("finish",o,{once:true});})}function Pl(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ae(t){return Promise.all(t.getAnimations().map(e=>new Promise(i=>{e.cancel(),requestAnimationFrame(i);})))}function zr(t,e){return t.map(i=>te(Ct({},i),{height:i.height==="auto"?`${e}px`:i.height}))}var N=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>f`
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
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let e=t.target,i=e.closest(".select__clear")!==null,o=e.closest("sl-icon-button")!==null;if(!(i||o)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let r=this.getAllOptions(),s=r.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>r.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=r.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=r.length-1),this.setCurrentOption(r[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let r=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of r)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let i=t.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="sl-icon-button");this.disabled||i||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let i=t.target.closest("sl-option"),o=this.value;i&&!i.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(i):this.setSelectedOptions(i),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),e=this.valueHasChanged?this.value:this.defaultValue,i=Array.isArray(e)?e:[e],o=[];t.forEach(r=>o.push(r.value)),this.setSelectedOptions(t.filter(r=>i.includes(r.value)));}handleTagRemove(t,e){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(e,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(i=>{i.current=false,i.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let e=this.getAllOptions(),i=Array.isArray(t)?t:[t];e.forEach(o=>o.selected=false),i.length&&i.forEach(o=>o.selected=true),this.selectionChanged();}toggleOptionSelection(t,e){e===true||e===false?t.selected=e:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,e,i;let o=this.getAllOptions();this.selectedOptions=o.filter(s=>s.selected);let r=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(i=(e=s?.getTextLabel)==null?void 0:e.call(s))!=null?i:"";}this.valueHasChanged=r,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let i=this.getTag(t,e);return f`<div @sl-remove=${o=>this.handleTagRemove(o,t)}>
          ${typeof i=="string"?Pt(i):i}
        </div>`}else if(e===this.maxOptionsVisible)return f`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return f``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,e,i){if(super.attributeChangedCallback(t,e,i),t==="value"){let o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o;}}handleValueChange(){if(!this.valueHasChanged){let i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i;}let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(i=>e.includes(i.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await ae(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:e}=se(this,"select.show",{dir:this.localize.dir()});await ne(this.popup.popup,t,e),this.currentOption&&ln(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await ae(this);let{keyframes:t,options:e}=se(this,"select.hide",{dir:this.localize.dir()});await ne(this.popup.popup,t,e),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,si(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,si(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,o=this.helpText?true:!!e,r=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return f`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
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

              ${r?f`
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
    `}};N.styles=[P,kt,an];N.dependencies={"sl-icon":W,"sl-popup":K,"sl-tag":Yt};a([A(".select")],N.prototype,"popup",2);a([A(".select__combobox")],N.prototype,"combobox",2);a([A(".select__display-input")],N.prototype,"displayInput",2);a([A(".select__value-input")],N.prototype,"valueInput",2);a([A(".select__listbox")],N.prototype,"listbox",2);a([T()],N.prototype,"hasFocus",2);a([T()],N.prototype,"displayLabel",2);a([T()],N.prototype,"currentOption",2);a([T()],N.prototype,"selectedOptions",2);a([T()],N.prototype,"valueHasChanged",2);a([h()],N.prototype,"name",2);a([T()],N.prototype,"value",1);a([h({attribute:"value"})],N.prototype,"defaultValue",2);a([h({reflect:true})],N.prototype,"size",2);a([h()],N.prototype,"placeholder",2);a([h({type:Boolean,reflect:true})],N.prototype,"multiple",2);a([h({attribute:"max-options-visible",type:Number})],N.prototype,"maxOptionsVisible",2);a([h({type:Boolean,reflect:true})],N.prototype,"disabled",2);a([h({type:Boolean})],N.prototype,"clearable",2);a([h({type:Boolean,reflect:true})],N.prototype,"open",2);a([h({type:Boolean})],N.prototype,"hoist",2);a([h({type:Boolean,reflect:true})],N.prototype,"filled",2);a([h({type:Boolean,reflect:true})],N.prototype,"pill",2);a([h()],N.prototype,"label",2);a([h({reflect:true})],N.prototype,"placement",2);a([h({attribute:"help-text"})],N.prototype,"helpText",2);a([h({reflect:true})],N.prototype,"form",2);a([h({type:Boolean,reflect:true})],N.prototype,"required",2);a([h()],N.prototype,"getTag",2);a([I("disabled",{waitUntilFirstUpdate:true})],N.prototype,"handleDisabledChange",1);a([I(["defaultValue","value"],{waitUntilFirstUpdate:true})],N.prototype,"handleValueChange",1);a([I("open",{waitUntilFirstUpdate:true})],N.prototype,"handleOpenChange",1);re("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});re("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});N.define("sl-select");var Bn=_`
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
`;var Mt=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,e="";return [...t].forEach(i=>{i.nodeType===Node.ELEMENT_NODE&&(i.hasAttribute("slot")||(e+=i.textContent)),i.nodeType===Node.TEXT_NODE&&(e+=i.textContent);}),e.trim()}render(){return f`
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
    `}};Mt.styles=[P,Bn];Mt.dependencies={"sl-icon":W};a([A(".option__label")],Mt.prototype,"defaultSlot",2);a([T()],Mt.prototype,"current",2);a([T()],Mt.prototype,"selected",2);a([T()],Mt.prototype,"hasHover",2);a([h({reflect:true})],Mt.prototype,"value",2);a([h({type:Boolean,reflect:true})],Mt.prototype,"disabled",2);a([I("disabled")],Mt.prototype,"handleDisabledChange",1);a([I("selected")],Mt.prototype,"handleSelectedChange",1);a([I("value")],Mt.prototype,"handleValueChange",1);Mt.define("sl-option");exports.AutoFieldSelect=class Ho extends R{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}renderInput(){let i=this.options.select.map(o=>{let r={};return typeof o=="object"?Object.assign(r,o):typeof o=="string"&&o.startsWith("-")?Object.assign(r,{type:"divider"}):Object.assign(r,{label:o}),r});return f`              
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
            ${i.map(o=>o.type==="divider"?f`<sl-divider></sl-divider>`:f`<sl-option 
                    value="${o[this.valueKey]||o.label}"
                    ?disabled=${!this.options.enable}
                >${o[this.labelKey]}</sl-option>`)}
        ${this.renderBeforeActions()}
        ${this.renderAfterActions()}
        </sl-select> 
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect=x([z("auto-field-select")],exports.AutoFieldSelect);var Un=_`
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
`;var Z=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let e=this.input.offsetWidth,i=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),r=this.localize.dir()==="rtl",s=e*t;if(r){let n=`${e-s}px + ${t} * ${o}`;this.output.style.translate=`calc((${n} - ${i/2}px - ${o} / 2))`;}else {let n=`${s}px - ${t} * ${o}`;this.output.style.translate=`calc(${n} - ${i/2}px + ${o} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,o=this.helpText?true:!!e;return f`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--medium":true,"form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
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
    `}};Z.styles=[P,kt,Un];a([A(".range__control")],Z.prototype,"input",2);a([A(".range__tooltip")],Z.prototype,"output",2);a([T()],Z.prototype,"hasFocus",2);a([T()],Z.prototype,"hasTooltip",2);a([h()],Z.prototype,"title",2);a([h()],Z.prototype,"name",2);a([h({type:Number})],Z.prototype,"value",2);a([h()],Z.prototype,"label",2);a([h({attribute:"help-text"})],Z.prototype,"helpText",2);a([h({type:Boolean,reflect:true})],Z.prototype,"disabled",2);a([h({type:Number})],Z.prototype,"min",2);a([h({type:Number})],Z.prototype,"max",2);a([h({type:Number})],Z.prototype,"step",2);a([h()],Z.prototype,"tooltip",2);a([h({attribute:false})],Z.prototype,"tooltipFormatter",2);a([h({reflect:true})],Z.prototype,"form",2);a([Vt()],Z.prototype,"defaultValue",2);a([je({passive:true})],Z.prototype,"handleThumbDragStart",1);a([I("value",{waitUntilFirstUpdate:true})],Z.prototype,"handleValueChange",1);a([I("disabled",{waitUntilFirstUpdate:true})],Z.prototype,"handleDisabledChange",1);a([I("hasTooltip",{waitUntilFirstUpdate:true})],Z.prototype,"syncRange",1);Z.define("sl-range");exports.AutoFieldRabge=class Vi extends R{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top",tooltipFormatter:void 0,format:void 0}}renderInput(){return f`       
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
       
  
        `}renderScales(){return f`
            <span class="begin"></span>
            <span class="value"></span>
            <span class="end"></span>
        `}};exports.AutoFieldRabge.styles=[R.styles,_`
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
        `],exports.AutoFieldRabge=x([z("auto-field-range")],exports.AutoFieldRabge);var qn=_`
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
`;function at(t,e,i){let o=r=>Object.is(r,-0)?0:r;return t<e?o(e):t>i?o(i):o(t)}var gt=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let e=this.localize.dir()==="rtl",{left:i,right:o,width:r}=this.rating.getBoundingClientRect(),s=e?this.roundToPrecision((o-t)/r*this.max,this.precision):this.roundToPrecision((t-i)/r*this.max,this.precision);return at(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let e=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl",o=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||e&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight"){let r=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-r),t.preventDefault();}if(t.key==="ArrowUp"||e&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft"){let r=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+r),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==o&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,e=.5){let i=1/e;return Math.ceil(t*i)/i}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",e=Array.from(Array(this.max).keys()),i=0;return this.disabled||this.readonly?i=this.value:i=this.isHovering?this.hoverValue:this.value,f`
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
          ${e.map(o=>i>o&&i<o+1?f`
                <span
                  class=${L({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===o+1})}
                  role="presentation"
                >
                  <div
                    style=${J({clipPath:t?`inset(0 ${(i-o)*100}% 0 0)`:`inset(0 0 0 ${(i-o)*100}%)`})}
                  >
                    ${Pt(this.getSymbol(o+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${J({clipPath:t?`inset(0 0 0 ${100-(i-o)*100}%)`:`inset(0 ${100-(i-o)*100}% 0 0)`})}
                  >
                    ${Pt(this.getSymbol(o+1))}
                  </div>
                </span>
              `:f`
              <span
                class=${L({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===o+1,"rating__symbol--active":i>=o+1})}
                role="presentation"
              >
                ${Pt(this.getSymbol(o+1))}
              </span>
            `)}
        </span>
      </div>
    `}};gt.styles=[P,qn];gt.dependencies={"sl-icon":W};a([A(".rating")],gt.prototype,"rating",2);a([T()],gt.prototype,"hoverValue",2);a([T()],gt.prototype,"isHovering",2);a([h()],gt.prototype,"label",2);a([h({type:Number})],gt.prototype,"value",2);a([h({type:Number})],gt.prototype,"max",2);a([h({type:Number})],gt.prototype,"precision",2);a([h({type:Boolean,reflect:true})],gt.prototype,"readonly",2);a([h({type:Boolean,reflect:true})],gt.prototype,"disabled",2);a([h()],gt.prototype,"getSymbol",2);a([je({passive:true})],gt.prototype,"handleTouchMove",1);a([I("hoverValue")],gt.prototype,"handleHoverValueChange",1);a([I("isHovering")],gt.prototype,"handleIsHoveringChange",1);gt.define("sl-rating");exports.AutoFieldRating=class Fo extends R{renderInput(){return f`              
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
        `}renderView(){return f`<sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value=${this.value}  
            readonly
        > </sl-rating> `}};exports.AutoFieldRating=x([z("auto-field-rating")],exports.AutoFieldRating);var Wn=_`
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
`;var Rr=class extends O{render(){return f` <slot></slot> `}};Rr.styles=[P,Wn];var jn=_`
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
`;var H=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i);}setRangeText(t,e,i,o="preserve"){let r=e??this.input.selectionStart,s=i??this.input.selectionEnd;this.input.setRangeText(t,r,s,o),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,o=this.helpText?true:!!e,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return f`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
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
    `}};H.styles=[P,kt,jn];H.dependencies={"sl-icon":W};a([A(".input__control")],H.prototype,"input",2);a([T()],H.prototype,"hasFocus",2);a([h()],H.prototype,"title",2);a([h({reflect:true})],H.prototype,"type",2);a([h()],H.prototype,"name",2);a([h()],H.prototype,"value",2);a([Vt()],H.prototype,"defaultValue",2);a([h({reflect:true})],H.prototype,"size",2);a([h({type:Boolean,reflect:true})],H.prototype,"filled",2);a([h({type:Boolean,reflect:true})],H.prototype,"pill",2);a([h()],H.prototype,"label",2);a([h({attribute:"help-text"})],H.prototype,"helpText",2);a([h({type:Boolean})],H.prototype,"clearable",2);a([h({type:Boolean,reflect:true})],H.prototype,"disabled",2);a([h()],H.prototype,"placeholder",2);a([h({type:Boolean,reflect:true})],H.prototype,"readonly",2);a([h({attribute:"password-toggle",type:Boolean})],H.prototype,"passwordToggle",2);a([h({attribute:"password-visible",type:Boolean})],H.prototype,"passwordVisible",2);a([h({attribute:"no-spin-buttons",type:Boolean})],H.prototype,"noSpinButtons",2);a([h({reflect:true})],H.prototype,"form",2);a([h({type:Boolean,reflect:true})],H.prototype,"required",2);a([h()],H.prototype,"pattern",2);a([h({type:Number})],H.prototype,"minlength",2);a([h({type:Number})],H.prototype,"maxlength",2);a([h()],H.prototype,"min",2);a([h()],H.prototype,"max",2);a([h()],H.prototype,"step",2);a([h()],H.prototype,"autocapitalize",2);a([h()],H.prototype,"autocorrect",2);a([h()],H.prototype,"autocomplete",2);a([h({type:Boolean})],H.prototype,"autofocus",2);a([h()],H.prototype,"enterkeyhint",2);a([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],H.prototype,"spellcheck",2);a([h()],H.prototype,"inputmode",2);a([I("disabled",{waitUntilFirstUpdate:true})],H.prototype,"handleDisabledChange",1);a([I("step",{waitUntilFirstUpdate:true})],H.prototype,"handleStepChange",1);a([I("value",{waitUntilFirstUpdate:true})],H.prototype,"handleValueChange",1);function ni(t,e){function i(r){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,c=s.left+n.scrollX,l=s.top+n.scrollY,p=r.pageX-c,m=r.pageY-l;e?.onMove&&e.onMove(p,m);}function o(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",o),e?.onStop&&e.onStop();}document.addEventListener("pointermove",i,{passive:true}),document.addEventListener("pointerup",o),e?.initialEvent instanceof PointerEvent&&i(e.initialEvent);}var Kn=_`
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
`;function*Yn(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Ls(Yn(t.shadowRoot.activeElement))));}function Xn(){return [...Yn()].pop()}var Gn=new WeakMap;function Qn(t){let e=Gn.get(t);return e||(e=window.getComputedStyle(t,null),Gn.set(t,e)),e}function Vl(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let e=Qn(t);return e.visibility!=="hidden"&&e.display!=="none"}function Dl(t){let e=Qn(t),{overflowY:i,overflowX:o}=e;return i==="scroll"||o==="scroll"?true:i!=="auto"||o!=="auto"?false:t.scrollHeight>t.clientHeight&&i==="auto"||t.scrollWidth>t.clientWidth&&o==="auto"}function Hl(t){let e=t.tagName.toLowerCase(),i=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(e==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${n}:checked`);return c?c===t:s.querySelector(n)===t}return Vl(t)?(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?true:Dl(t):false}function Jn(t){var e,i;let o=Nl(t),r=(e=o[0])!=null?e:null,s=(i=o[o.length-1])!=null?i:null;return {start:r,end:s}}function Fl(t,e){var i;return ((i=t.getRootNode({composed:true}))==null?void 0:i.host)!==e}function Nl(t){let e=new WeakMap,i=[];function o(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]")||e.has(r))return;e.set(r,true),!i.includes(r)&&Hl(r)&&i.push(r),r instanceof HTMLSlotElement&&Fl(r,t)&&r.assignedElements({flatten:true}).forEach(s=>{o(s);}),r.shadowRoot!==null&&r.shadowRoot.mode==="open"&&o(r.shadowRoot);}for(let s of r.children)o(s);}return o(t),i.sort((r,s)=>{let n=Number(r.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var ct=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let i=(o,r)=>{if(!o)return null;let s=o.closest(r);if(s)return s;let n=o.getRootNode();return n instanceof ShadowRoot?i(n.host,r):null};setTimeout(()=>{var o;let r=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?Xn():document.activeElement;(!this.containingElement||i(r,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let e=this.getMenu();if(e){let i=e.getAllItems(),o=i[0],r=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),i.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(o),o.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(r),r.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let e=this.trigger.assignedElements({flatten:true}).find(o=>Jn(o).start),i;if(e){switch(e.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":i=e.button;break;default:i=e;}i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,si(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,si(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await ae(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:e}=se(this,"dropdown.show",{dir:this.localize.dir()});await ne(this.popup.popup,t,e),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await ae(this);let{keyframes:t,options:e}=se(this,"dropdown.hide",{dir:this.localize.dir()});await ne(this.popup.popup,t,e),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return f`
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
    `}};ct.styles=[P,Kn];ct.dependencies={"sl-popup":K};a([A(".dropdown")],ct.prototype,"popup",2);a([A(".dropdown__trigger")],ct.prototype,"trigger",2);a([A(".dropdown__panel")],ct.prototype,"panel",2);a([h({type:Boolean,reflect:true})],ct.prototype,"open",2);a([h({reflect:true})],ct.prototype,"placement",2);a([h({type:Boolean,reflect:true})],ct.prototype,"disabled",2);a([h({attribute:"stay-open-on-select",type:Boolean,reflect:true})],ct.prototype,"stayOpenOnSelect",2);a([h({attribute:false})],ct.prototype,"containingElement",2);a([h({type:Number})],ct.prototype,"distance",2);a([h({type:Number})],ct.prototype,"skidding",2);a([h({type:Boolean})],ct.prototype,"hoist",2);a([h({reflect:true})],ct.prototype,"sync",2);a([I("open",{waitUntilFirstUpdate:true})],ct.prototype,"handleOpenChange",1);re("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});re("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Zn=_`
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
`;var ta=_`
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
`;var le=class extends O{constructor(){super(...arguments),this.localize=new G(this);}render(){return f`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};le.styles=[P,ta];var j=class extends O{constructor(){super(...arguments),this.formControlController=new dt(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.localize=new G(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:Qe}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),e=t?Je`a`:Je`button`;return xe`
      <${e}
        part="base"
        class=${L({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
      </${e}>
    `}};j.styles=[P,xo];j.dependencies={"sl-icon":W,"sl-spinner":le};a([A(".button")],j.prototype,"button",2);a([T()],j.prototype,"hasFocus",2);a([T()],j.prototype,"invalid",2);a([h()],j.prototype,"title",2);a([h({reflect:true})],j.prototype,"variant",2);a([h({reflect:true})],j.prototype,"size",2);a([h({type:Boolean,reflect:true})],j.prototype,"caret",2);a([h({type:Boolean,reflect:true})],j.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],j.prototype,"loading",2);a([h({type:Boolean,reflect:true})],j.prototype,"outline",2);a([h({type:Boolean,reflect:true})],j.prototype,"pill",2);a([h({type:Boolean,reflect:true})],j.prototype,"circle",2);a([h()],j.prototype,"type",2);a([h()],j.prototype,"name",2);a([h()],j.prototype,"value",2);a([h()],j.prototype,"href",2);a([h()],j.prototype,"target",2);a([h()],j.prototype,"rel",2);a([h()],j.prototype,"download",2);a([h()],j.prototype,"form",2);a([h({attribute:"formaction"})],j.prototype,"formAction",2);a([h({attribute:"formenctype"})],j.prototype,"formEnctype",2);a([h({attribute:"formmethod"})],j.prototype,"formMethod",2);a([h({attribute:"formnovalidate",type:Boolean})],j.prototype,"formNoValidate",2);a([h({attribute:"formtarget"})],j.prototype,"formTarget",2);a([I("disabled",{waitUntilFirstUpdate:true})],j.prototype,"handleDisabledChange",1);function ht(t,e){Bl(t)&&(t="100%");let i=Ul(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),i&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function Di(t){return Math.min(1,Math.max(0,t))}function Bl(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function Ul(t){return typeof t=="string"&&t.indexOf("%")!==-1}function No(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Hi(t){return Number(t)<=1?`${Number(t)*100}%`:t}function we(t){return t.length===1?"0"+t:String(t)}function ea(t,e,i){return {r:ht(t,255)*255,g:ht(e,255)*255,b:ht(i,255)*255}}function Mr(t,e,i){t=ht(t,255),e=ht(e,255),i=ht(i,255);let o=Math.max(t,e,i),r=Math.min(t,e,i),s=0,n=0,c=(o+r)/2;if(o===r)n=0,s=0;else {let l=o-r;switch(n=c>.5?l/(2-o-r):l/(o+r),o){case t:s=(e-i)/l+(e<i?6:0);break;case e:s=(i-t)/l+2;break;case i:s=(t-e)/l+4;break;}s/=6;}return {h:s,s:n,l:c}}function Or(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+(e-t)*(6*i):i<1/2?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function ia(t,e,i){let o,r,s;if(t=ht(t,360),e=ht(e,100),i=ht(i,100),e===0)r=i,s=i,o=i;else {let n=i<.5?i*(1+e):i+e-i*e,c=2*i-n;o=Or(c,n,t+1/3),r=Or(c,n,t),s=Or(c,n,t-1/3);}return {r:o*255,g:r*255,b:s*255}}function Lr(t,e,i){t=ht(t,255),e=ht(e,255),i=ht(i,255);let o=Math.max(t,e,i),r=Math.min(t,e,i),s=0,n=o,c=o-r,l=o===0?0:c/o;if(o===r)s=0;else {switch(o){case t:s=(e-i)/c+(e<i?6:0);break;case e:s=(i-t)/c+2;break;case i:s=(t-e)/c+4;break;}s/=6;}return {h:s,s:l,v:n}}function oa(t,e,i){t=ht(t,360)*6,e=ht(e,100),i=ht(i,100);let o=Math.floor(t),r=t-o,s=i*(1-e),n=i*(1-r*e),c=i*(1-(1-r)*e),l=o%6,p=[i,n,s,s,c,i][l],m=[c,i,i,n,s,s][l],d=[s,s,c,i,i,n][l];return {r:p*255,g:m*255,b:d*255}}function Pr(t,e,i,o){let r=[we(Math.round(t).toString(16)),we(Math.round(e).toString(16)),we(Math.round(i).toString(16))];return o&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function ra(t,e,i,o,r){let s=[we(Math.round(t).toString(16)),we(Math.round(e).toString(16)),we(Math.round(i).toString(16)),we(ql(o))];return r&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function sa(t,e,i,o){let r=t/100,s=e/100,n=i/100,c=o/100,l=255*(1-r)*(1-c),p=255*(1-s)*(1-c),m=255*(1-n)*(1-c);return {r:l,g:p,b:m}}function Vr(t,e,i){let o=1-t/255,r=1-e/255,s=1-i/255,n=Math.min(o,r,s);return n===1?(o=0,r=0,s=0):(o=(o-n)/(1-n)*100,r=(r-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(o),m:Math.round(r),y:Math.round(s),k:Math.round(n)}}function ql(t){return Math.round(parseFloat(t)*255).toString(16)}function Dr(t){return Et(t)/255}function Et(t){return parseInt(t,16)}function na(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var Fi={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function aa(t){let e={r:0,g:0,b:0},i=1,o=null,r=null,s=null,n=false,c=false;return typeof t=="string"&&(t=Kl(t)),typeof t=="object"&&(Lt(t.r)&&Lt(t.g)&&Lt(t.b)?(e=ea(t.r,t.g,t.b),n=true,c=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Lt(t.h)&&Lt(t.s)&&Lt(t.v)?(o=Hi(t.s),r=Hi(t.v),e=oa(t.h,o,r),n=true,c="hsv"):Lt(t.h)&&Lt(t.s)&&Lt(t.l)?(o=Hi(t.s),s=Hi(t.l),e=ia(t.h,o,s),n=true,c="hsl"):Lt(t.c)&&Lt(t.m)&&Lt(t.y)&&Lt(t.k)&&(e=sa(t.c,t.m,t.y,t.k),n=true,c="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(i=t.a)),i=No(i),{ok:n,format:t.format||c,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:i}}var Wl="[-\\+]?\\d+%?",jl="[-\\+]?\\d*\\.\\d+%?",_e="(?:"+jl+")|(?:"+Wl+")",Hr="[\\s|\\(]+("+_e+")[,|\\s]+("+_e+")[,|\\s]+("+_e+")\\s*\\)?",Bo="[\\s|\\(]+("+_e+")[,|\\s]+("+_e+")[,|\\s]+("+_e+")[,|\\s]+("+_e+")\\s*\\)?",Nt={CSS_UNIT:new RegExp(_e),rgb:new RegExp("rgb"+Hr),rgba:new RegExp("rgba"+Bo),hsl:new RegExp("hsl"+Hr),hsla:new RegExp("hsla"+Bo),hsv:new RegExp("hsv"+Hr),hsva:new RegExp("hsva"+Bo),cmyk:new RegExp("cmyk"+Bo),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Kl(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let e=false;if(Fi[t])t=Fi[t],e=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let i=Nt.rgb.exec(t);return i?{r:i[1],g:i[2],b:i[3]}:(i=Nt.rgba.exec(t),i?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=Nt.hsl.exec(t),i?{h:i[1],s:i[2],l:i[3]}:(i=Nt.hsla.exec(t),i?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=Nt.hsv.exec(t),i?{h:i[1],s:i[2],v:i[3]}:(i=Nt.hsva.exec(t),i?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=Nt.cmyk.exec(t),i?{c:i[1],m:i[2],y:i[3],k:i[4]}:(i=Nt.hex8.exec(t),i?{r:Et(i[1]),g:Et(i[2]),b:Et(i[3]),a:Dr(i[4]),format:e?"name":"hex8"}:(i=Nt.hex6.exec(t),i?{r:Et(i[1]),g:Et(i[2]),b:Et(i[3]),format:e?"name":"hex"}:(i=Nt.hex4.exec(t),i?{r:Et(i[1]+i[1]),g:Et(i[2]+i[2]),b:Et(i[3]+i[3]),a:Dr(i[4]+i[4]),format:e?"name":"hex8"}:(i=Nt.hex3.exec(t),i?{r:Et(i[1]+i[1]),g:Et(i[2]+i[2]),b:Et(i[3]+i[3]),format:e?"name":"hex"}:false))))))))))}function Lt(t){return typeof t=="number"?!Number.isNaN(t):Nt.CSS_UNIT.test(t)}var Ni=class t{constructor(e="",i={}){if(e instanceof t)return e;typeof e=="number"&&(e=na(e)),this.originalInput=e;let o=aa(e);this.originalInput=e,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=i.format??o.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let e=this.toRgb();return (e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){let e=this.toRgb(),i,o,r,s=e.r/255,n=e.g/255,c=e.b/255;return s<=.03928?i=s/12.92:i=Math.pow((s+.055)/1.055,2.4),n<=.03928?o=n/12.92:o=Math.pow((n+.055)/1.055,2.4),c<=.03928?r=c/12.92:r=Math.pow((c+.055)/1.055,2.4),.2126*i+.7152*o+.0722*r}getAlpha(){return this.a}setAlpha(e){return this.a=No(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:e}=this.toHsl();return e===0}toHsv(){let e=Lr(this.r,this.g,this.b);return {h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){let e=Lr(this.r,this.g,this.b),i=Math.round(e.h*360),o=Math.round(e.s*100),r=Math.round(e.v*100);return this.a===1?`hsv(${i}, ${o}%, ${r}%)`:`hsva(${i}, ${o}%, ${r}%, ${this.roundA})`}toHsl(){let e=Mr(this.r,this.g,this.b);return {h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){let e=Mr(this.r,this.g,this.b),i=Math.round(e.h*360),o=Math.round(e.s*100),r=Math.round(e.l*100);return this.a===1?`hsl(${i}, ${o}%, ${r}%)`:`hsla(${i}, ${o}%, ${r}%, ${this.roundA})`}toHex(e=false){return Pr(this.r,this.g,this.b,e)}toHexString(e=false){return "#"+this.toHex(e)}toHex8(e=false){return ra(this.r,this.g,this.b,this.a,e)}toHex8String(e=false){return "#"+this.toHex8(e)}toHexShortString(e=false){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let e=Math.round(this.r),i=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${e}, ${i}, ${o})`:`rgba(${e}, ${i}, ${o}, ${this.roundA})`}toPercentageRgb(){let e=i=>`${Math.round(ht(i,255)*100)}%`;return {r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){let e=i=>Math.round(ht(i,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return {...Vr(this.r,this.g,this.b)}}toCmykString(){let{c:e,m:i,y:o,k:r}=Vr(this.r,this.g,this.b);return `cmyk(${e}, ${i}, ${o}, ${r})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let e="#"+Pr(this.r,this.g,this.b,false);for(let[i,o]of Object.entries(Fi))if(e===o)return i;return  false}toString(e){let i=!!e;e=e??this.format;let o=false,r=this.a<1&&this.a>=0;return !i&&r&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(o=this.toRgbString()),e==="prgb"&&(o=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(o=this.toHexString()),e==="hex3"&&(o=this.toHexString(true)),e==="hex4"&&(o=this.toHex8String(true)),e==="hex8"&&(o=this.toHex8String()),e==="name"&&(o=this.toName()),e==="hsl"&&(o=this.toHslString()),e==="hsv"&&(o=this.toHsvString()),e==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(e=10){let i=this.toHsl();return i.l+=e/100,i.l=Di(i.l),new t(i)}brighten(e=10){let i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(255*-(e/100)))),i.g=Math.max(0,Math.min(255,i.g-Math.round(255*-(e/100)))),i.b=Math.max(0,Math.min(255,i.b-Math.round(255*-(e/100)))),new t(i)}darken(e=10){let i=this.toHsl();return i.l-=e/100,i.l=Di(i.l),new t(i)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){let i=this.toHsl();return i.s-=e/100,i.s=Di(i.s),new t(i)}saturate(e=10){let i=this.toHsl();return i.s+=e/100,i.s=Di(i.s),new t(i)}greyscale(){return this.desaturate(100)}spin(e){let i=this.toHsl(),o=(i.h+e)%360;return i.h=o<0?360+o:o,new t(i)}mix(e,i=50){let o=this.toRgb(),r=new t(e).toRgb(),s=i/100,n={r:(r.r-o.r)*s+o.r,g:(r.g-o.g)*s+o.g,b:(r.b-o.b)*s+o.b,a:(r.a-o.a)*s+o.a};return new t(n)}analogous(e=6,i=30){let o=this.toHsl(),r=360/i,s=[this];for(o.h=(o.h-(r*e>>1)+720)%360;--e;)o.h=(o.h+r)%360,s.push(new t(o));return s}complement(){let e=this.toHsl();return e.h=(e.h+180)%360,new t(e)}monochromatic(e=6){let i=this.toHsv(),{h:o}=i,{s:r}=i,{v:s}=i,n=[],c=1/e;for(;e--;)n.push(new t({h:o,s:r,v:s})),s=(s+c)%1;return n}splitcomplement(){let e=this.toHsl(),{h:i}=e;return [this,new t({h:(i+72)%360,s:e.s,l:e.l}),new t({h:(i+216)%360,s:e.s,l:e.l})]}onBackground(e){let i=this.toRgb(),o=new t(e).toRgb(),r=i.a+o.a*(1-i.a);return new t({r:(i.r*i.a+o.r*o.a*(1-i.a))/r,g:(i.g*i.a+o.g*o.a*(1-i.a))/r,b:(i.b*i.a+o.b*o.a*(1-i.a))/r,a:r})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){let i=this.toHsl(),{h:o}=i,r=[this],s=360/e;for(let n=1;n<e;n++)r.push(new t({h:(o+n*s)%360,s:i.s,l:i.l}));return r}equals(e){let i=new t(e);return this.format==="cmyk"||i.format==="cmyk"?this.toCmykString()===i.toCmykString():this.toRgbString()===i.toRgbString()}};var la="EyeDropper"in window,B=class extends O{constructor(){super(),this.formControlController=new dt(this),this.isSafeValue=false,this.localize=new G(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),i=e.querySelector(".color-picker__slider-handle"),{width:o}=e.getBoundingClientRect(),r=this.value,s=this.value;i.focus(),t.preventDefault(),ni(e,{onMove:n=>{this.alpha=at(n/o*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==r&&(r=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),i=e.querySelector(".color-picker__slider-handle"),{width:o}=e.getBoundingClientRect(),r=this.value,s=this.value;i.focus(),t.preventDefault(),ni(e,{onMove:n=>{this.hue=at(n/o*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==r&&(r=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let e=this.shadowRoot.querySelector(".color-picker__grid"),i=e.querySelector(".color-picker__grid-handle"),{width:o,height:r}=e.getBoundingClientRect(),s=this.value,n=this.value;i.focus(),t.preventDefault(),this.isDraggingGridHandle=true,ni(e,{onMove:(c,l)=>{this.saturation=at(c/o*100,0,100),this.brightness=at(100-l/r*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=at(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=at(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=at(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=at(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=at(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=at(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=at(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=at(this.brightness-e,0,100),this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let e=t.target,i=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let e=new Ni(t);if(!e.isValid)return null;let i=e.toHsl(),o={h:i.h,s:i.s*100,l:i.l*100,a:i.a},r=e.toRgb(),s=e.toHexString(),n=e.toHex8String(),c=e.toHsv(),l={h:c.h,s:c.s*100,v:c.v*100,a:c.a};return {hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:r.r,g:r.g,b:r.b,string:this.setLetterCase(`rgb(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)})`)},rgba:{r:r.r,g:r.g,b:r.b,a:r.a,string:this.setLetterCase(`rgba(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)}, ${r.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let e=this.parseColor(t);return e===null?false:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!la)return;new EyeDropper().open().then(e=>{let i=this.value;this.setColor(e.sRGBHex),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,e,i,o=100){let r=new Ni(`hsva(${t}, ${e}%, ${i}%, ${o/100})`);return r.isValid?r.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let i=this.parseColor(e);i!==null?(this.inputValue=this.value,this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=i.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let e=this.inline?this.base:this.trigger;this.hasFocus&&(e.focus({preventScroll:true}),e.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return "";switch(t){case "hex":return e.hex;case "hexa":return e.hexa;case "rgb":return e.rgb.string;case "rgba":return e.rgba.string;case "hsl":return e.hsl.string;case "hsla":return e.hsla.string;case "hsv":return e.hsv.string;case "hsva":return e.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,e=100-this.brightness,i=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(r=>r.trim()!==""),o=f`
      <div
        part="base"
        class=${L({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
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
          style=${J({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${L({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${J({top:`${e}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
                style=${J({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
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

            ${this.opacity?f`
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
            ${la?f`
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

        ${i.length>0?f`
              <div part="swatches" class="color-picker__swatches">
                ${i.map(r=>{let s=this.parseColor(r);return s?f`
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
                        style=${J({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${r}"`,this),"")})}
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
          class=${L({"color-dropdown__trigger":true,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":true})}
          style=${J({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${o}
      </sl-dropdown>
    `}};B.styles=[P,Zn];B.dependencies={"sl-button-group":ye,"sl-button":j,"sl-dropdown":ct,"sl-icon":W,"sl-input":H,"sl-visually-hidden":Rr};a([A('[part~="base"]')],B.prototype,"base",2);a([A('[part~="input"]')],B.prototype,"input",2);a([A(".color-dropdown")],B.prototype,"dropdown",2);a([A('[part~="preview"]')],B.prototype,"previewButton",2);a([A('[part~="trigger"]')],B.prototype,"trigger",2);a([T()],B.prototype,"hasFocus",2);a([T()],B.prototype,"isDraggingGridHandle",2);a([T()],B.prototype,"isEmpty",2);a([T()],B.prototype,"inputValue",2);a([T()],B.prototype,"hue",2);a([T()],B.prototype,"saturation",2);a([T()],B.prototype,"brightness",2);a([T()],B.prototype,"alpha",2);a([h()],B.prototype,"value",2);a([Vt()],B.prototype,"defaultValue",2);a([h()],B.prototype,"label",2);a([h()],B.prototype,"format",2);a([h({type:Boolean,reflect:true})],B.prototype,"inline",2);a([h({reflect:true})],B.prototype,"size",2);a([h({attribute:"no-format-toggle",type:Boolean})],B.prototype,"noFormatToggle",2);a([h()],B.prototype,"name",2);a([h({type:Boolean,reflect:true})],B.prototype,"disabled",2);a([h({type:Boolean})],B.prototype,"hoist",2);a([h({type:Boolean})],B.prototype,"opacity",2);a([h({type:Boolean})],B.prototype,"uppercase",2);a([h()],B.prototype,"swatches",2);a([h({reflect:true})],B.prototype,"form",2);a([h({type:Boolean,reflect:true})],B.prototype,"required",2);a([je({passive:false})],B.prototype,"handleTouchMove",1);a([I("format",{waitUntilFirstUpdate:true})],B.prototype,"handleFormatChange",1);a([I("opacity",{waitUntilFirstUpdate:true})],B.prototype,"handleOpacityChange",1);a([I("value")],B.prototype,"handleValueChange",1);B.define("sl-color-picker");var Gl=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class Bi extends R{getInitialOptions(){return {format:"hex",opacity:false,inline:false,presets:Gl}}renderInput(){return f`
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
        `}renderView(){return f`<span><span class="color" style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[R.styles,_`
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
    `],exports.AutoFieldColorPicker=x([z("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class Ui extends R{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((i,o)=>{let r={};return typeof i=="object"?Object.assign(r,i):Object.assign(r,{id:i,label:i,value:i}),r.icon&&(this.isShowIcon=true),r.$index=o,r}),this.selection=this.value;}renderInput(){return f`
            <div class="items">        
                ${this.items.map(i=>this.renderCheckItemWithCard(this.renderCheckboxItem(i),i))} </div>
        `}renderCheckboxItem(i){return f`              
            <sl-checkbox      
                data-index="${i.$index}"
                data-value="${i[this.valueKey]}"
                .value="${i[this.valueKey]}" 
                .checked=${this.value.includes(i[this.valueKey])} 
                help-text="${i.memo}"
                @sl-change=${this._onCheckChange.bind(this)}
            > ${i.label}</sl-checkbox> 
        `}_onCheckChange(i){let o=i.target.closest(".card")||i.target,r=Number(o.dataset.index),s=o.checked??!o.classList.contains("selected"),n=this.items[r];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let c=this.selection.findIndex(l=>l===n[this.valueKey]);c>-1&&this.selection.splice(c,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(i,o){if(this.options.card){let r=this.selection.includes(o[this.valueKey]);return f`<div class="card ${r?"selected":""}"
                data-index ="${o.$index}"
                style=${J({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">
                    ${st(this.isShowIcon,()=>f`<sl-icon  class="icon" name="${o.icon||""}"></sl-icon>`)}                    
                    ${i}                    
                </div>
            </div>`}else return i}};exports.AutoFieldCheckboxGroup.styles=[R.styles,_`
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
    `],exports.AutoFieldCheckboxGroup=x([z("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class qi extends R{constructor(){super(...arguments);this.delimiter="";this.template="0000";this.parts=[];this.result="";}getInitialOptions(){return {template:"0000",delimiter:""}}_onPartChange(i){let r=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,c)=>(n+=c.value,n),""),s=0;this.result=Array.from(this.template).map(n=>n===this.delimiter?n:r[s++]).join(""),this.onFieldChange(),this._isLastInput(i);}getInputValue(){return this.result}_isLastInput(i){let o=i.target;if(o.value.length>=1){o.blur();let r=o.nextElementSibling||o.nextElementSibling?.nextElementSibling;r&&(r.focus(),r.select());}}_onPaste(i){i.preventDefault();let r=(i.clipboardData?.getData("text/plain")||"").split(""),s=c=>{if(c){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let c of r)if(c!==this.options.delimiter&&(n.value=c,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.delimiter=this.options.delimiter,this.template=this.options.template,this.parts=this.template.split(this.delimiter),this.value.split(this.delimiter).forEach((i,o)=>{this.parts[o]=i;});}_onPartFocus(i){i.target.select();}renderPart(i){let o=i.split("");return f`            
        ${Rt(o,r=>f`<sl-input        
                maxLength = "1"
                .value=${r} 
                noSpinButtons
                autocorrect="off"
                autocomplete="off"
                spellcheck="false"
                @paste=${s=>this._onPaste(s)}
                @sl-focus=${this._onPartFocus.bind(this)}
                @sl-input=${this._onPartChange.bind(this)}></sl-input>`)}`}renderInput(){return f`
            <magic-flex grow="none" align="center" gap="0.5em">
                ${Rt(this.parts,(i,o)=>f`                    
                        ${this.renderPart(i)}
                        ${st(o<this.parts.length-1,()=>f`${this.delimiter}`)}
                        `)}
            </magic-flex>
        `}};exports.AutoFieldParts.styles=[R.styles,_`
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
        `],exports.AutoFieldParts=x([z("auto-field-parts")],exports.AutoFieldParts);var ca=_`
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
`;var Uo=class extends O{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let e=["menuitem","menuitemcheckbox"],i=t.composedPath(),o=i.find(c=>{var l;return e.includes(((l=c?.getAttribute)==null?void 0:l.call(c,"role"))||"")});if(!o||i.find(c=>{var l;return ((l=c?.getAttribute)==null?void 0:l.call(c,"role"))==="menu"})!==this)return;let n=o;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),e?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let e=this.getAllItems(),i=this.getCurrentItem(),o=i?e.indexOf(i):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?o++:t.key==="ArrowUp"?o--:t.key==="Home"?o=0:t.key==="End"&&(o=e.length-1),o<0&&(o=e.length-1),o>e.length-1&&(o=0),this.setCurrentItem(e[o]),e[o].focus());}}handleMouseDown(t){let e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var e;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((e=t.getAttribute("role"))!=null?e:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(i=>{i.setAttribute("tabindex",i===t?"0":"-1");});}render(){return f`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Uo.styles=[P,ca];a([A("slot")],Uo.prototype,"defaultSlot",2);Uo.define("sl-menu");var ha=_`
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
`;var Wi=(t,e)=>{let i=t._$AN;if(i===void 0)return  false;for(let o of i)o._$AO?.(e,false),Wi(o,e);return  true},qo=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e;}while(i?.size===0)},da=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),Ql(e);}};function Yl(t){this._$AN!==void 0?(qo(this),this._$AM=t,da(this)):this._$AM=t;}function Xl(t,e=false,i=0){let o=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(o))for(let s=i;s<o.length;s++)Wi(o[s],false),qo(o[s]);else o!=null&&(Wi(o,false),qo(o));else Wi(this,t);}var Ql=t=>{t.type==mt.CHILD&&(t._$AP??=Xl,t._$AQ??=Yl);},Wo=class extends _t{constructor(){super(...arguments),this._$AN=void 0;}_$AT(e,i,o){super._$AT(e,i,o),da(this),this.isConnected=e._$AU;}_$AO(e,i=true){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),i&&(Wi(this,e),qo(this));}setValue(e){if(co(this._$Ct))this._$Ct._$AI(e,this);else {let i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}};var pa=()=>new Nr,Nr=class{},Fr=new WeakMap,ua=zt(class extends Wo{render(t){return Y}update(t,[e]){let i=e!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),Y}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let e=this.ht??globalThis,i=Fr.get(e);i===void 0&&(i=new WeakMap,Fr.set(e,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?Fr.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var ma=class{constructor(t,e){this.popupRef=pa(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=i=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${i.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${i.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=i=>{switch(i.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":i.target!==this.host&&(i.preventDefault(),i.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(i);break;}},this.handleClick=i=>{var o;i.target===this.host?(i.preventDefault(),i.stopPropagation()):i.target instanceof Element&&(i.target.tagName==="sl-menu-item"||(o=i.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=i=>{i.relatedTarget&&i.relatedTarget instanceof Element&&this.host.contains(i.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=i=>{i.stopPropagation();},this.handlePopupReposition=()=>{let i=this.host.renderRoot.querySelector("slot[name='submenu']"),o=i?.assignedElements({flatten:true}).filter(p=>p.localName==="sl-menu")[0],r=getComputedStyle(this.host).direction==="rtl";if(!o)return;let{left:s,top:n,width:c,height:l}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${r?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${r?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`);},(this.host=t).addController(this),this.hasSlotController=e;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let i=null;for(let o of e.assignedElements())if(i=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),i.length!==0)break;if(!(!i||i.length===0)){i[0].setAttribute("tabindex","0");for(let o=1;o!==i.length;++o)i[o].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?i[0]instanceof HTMLElement&&i[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{i[0]instanceof HTMLElement&&i[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let e=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((r,s)=>{var n;let c=(n=e.get(s))!=null?n:new CSSUnitValue(0,"px"),p=(c instanceof CSSUnitValue?c:new CSSUnitValue(0,"px")).to("px");return r-p.value},0);this.skidding=o;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?f`
      <sl-popup
        ${ua(this.popupRef)}
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
    `:f` <slot name="submenu" hidden></slot> `}};var At=class extends O{constructor(){super(...arguments),this.localize=new G(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new nt(this,"submenu"),this.submenuController=new ma(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return Ds(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",e=this.submenuController.isExpanded();return f`
      <div
        id="anchor"
        part="base"
        class=${L({"menu-item":true,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!e}"
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
        ${this.loading?f` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};At.styles=[P,ha];At.dependencies={"sl-icon":W,"sl-popup":K,"sl-spinner":le};a([A("slot:not([name])")],At.prototype,"defaultSlot",2);a([A(".menu-item")],At.prototype,"menuItem",2);a([h()],At.prototype,"type",2);a([h({type:Boolean,reflect:true})],At.prototype,"checked",2);a([h()],At.prototype,"value",2);a([h({type:Boolean,reflect:true})],At.prototype,"loading",2);a([h({type:Boolean,reflect:true})],At.prototype,"disabled",2);a([I("checked")],At.prototype,"handleCheckedChange",1);a([I("disabled")],At.prototype,"handleDisabledChange",1);a([I("type")],At.prototype,"handleTypeChange",1);At.define("sl-menu-item");var fa=_`
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
`;var Br=()=>null,Tt=class extends O{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new G(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=Br,this.snapThreshold=12;}toSnapFunction(t){let e=t.split(" ");return ({pos:i,size:o,snapThreshold:r,isRtl:s,vertical:n})=>{let c=i,l=Number.POSITIVE_INFINITY;return e.forEach(p=>{let m;if(p.startsWith("repeat(")){let u=t.substring(7,t.length-1),g=u.endsWith("%"),b=Number.parseFloat(u),v=g?o*(b/100):b;m=Math.round((s&&!n?o-i:i)/v)*v;}else p.endsWith("%")?m=o*(Number.parseFloat(p)/100):m=Number.parseFloat(p);s&&!n&&(m=o-m);let d=Math.abs(i-m);d<=r&&d<l&&(c=m,l=d);}),c}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=Br;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:e}=this.getBoundingClientRect();this.size=this.vertical?e:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let e=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),ni(this,{onMove:(i,o)=>{var r;let s=this.vertical?o:i;this.primary==="end"&&(s=this.size-s),s=(r=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:e,vertical:this.vertical}))!=null?r:s,this.position=at(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let e=this.position,i=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(e-=i),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(e+=i),t.key==="Home"&&(e=this.primary==="end"?100:0),t.key==="End"&&(e=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)e=this.positionBeforeCollapsing,this.isCollapsed=false;else {let o=this.position;e=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=o;});}this.position=at(e,0,100);}}handleResize(t){let{width:e,height:i}=t[0].contentRect;this.size=this.vertical?i:e,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",e=this.vertical?"gridTemplateColumns":"gridTemplateRows",i=this.localize.dir()==="rtl",o=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,r="auto";return this.primary==="end"?i&&!this.vertical?this.style[t]=`${o} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${o}`:i&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${r}`,this.style[e]="",f`
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
    `}};Tt.styles=[P,fa];a([A(".divider")],Tt.prototype,"divider",2);a([h({type:Number,reflect:true})],Tt.prototype,"position",2);a([h({attribute:"position-in-pixels",type:Number})],Tt.prototype,"positionInPixels",2);a([h({type:Boolean,reflect:true})],Tt.prototype,"vertical",2);a([h({type:Boolean,reflect:true})],Tt.prototype,"disabled",2);a([h()],Tt.prototype,"primary",2);a([h({reflect:true})],Tt.prototype,"snap",1);a([h({type:Number,attribute:"snap-threshold"})],Tt.prototype,"snapThreshold",2);a([I("position")],Tt.prototype,"handlePositionChange",1);a([I("positionInPixels")],Tt.prototype,"handlePositionInPixelsChange",1);a([I("vertical")],Tt.prototype,"handleVerticalChange",1);Tt.define("sl-split-panel");Yt.define("sl-tag");exports.AutoFieldList=class De extends R{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.items=[];this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}connectedCallback(){if(super.connectedCallback(),this.options){this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let i=this.options.select;i&&(this.items=i,this.items.forEach(o=>{this.isItemSelected(o)&&this.selection.push(o[this.valueKey]);})),this.setPresetActions();}}isItemSelected(i){return this.value===void 0?false:this.options.multiple===false?this.value===i[this.valueKey]:this.value.includes(i[this.valueKey])}_addSecectItem(i){this.selection.findIndex(r=>r[this.valueKey]===i[this.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(i[this.valueKey]));}_removeSelectItem(i){for(let o=this.selection.length-1;o>=0;o--)this.selection[o]===i&&this.selection.splice(o,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(i){let o=i.detail.item,r=o.dataset.index,s=this.items[r];s&&(o.checked?this._addSecectItem(s):this._removeSelectItem(s[this.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.length}`,this.onFieldChange());}renderList(){let i=Array.isArray(this.value)?this.value:[this.value],o=this.options.itemTemplate;return f`
        <div class="items" >
            <div class="header">
                ${this.renderBeforeActions()}
            </div>
            <!-- 渲染列表项 -->
            ${this._renderWithSplitPanel(f`
                <sl-menu slot="start" class="mark-err" style=${J({maxHeight:this.options.height})}
                    @sl-select=${this._onSelectItem.bind(this)}>
                    ${Rt(this.items,(r,s)=>{let n=i.includes(r[this.valueKey]);return f`<sl-menu-item 
                    type="checkbox"                
                    data-index=${String(s)} 
                    .checked=${n}
                >                
                <auto-box no-border no-padding flex="row" grow="first" style="width:100%;">
                        ${this._getItemLabel(r,o)}
                        </auto-box>
                </sl-menu-item>`})}
                </sl-menu>                            
                `)} 
            <div class="footer">

            ${this.renderAfterActions()}            
                <span class="detail">
                ${this.selection.length}/${this.items.length}
                </span>
            </div>
        </div>
        `}_renderWithSplitPanel(i){return this.options.showResults?f`<sl-split-panel position="60">
                ${i}
                ${this.renderResults()}
            </sl-split-panel>`:i}_getItemLabel(i,o){return o?f`${Pt(o.replace(/\{(.+?)\}/g,(r,s)=>i[s]))}`:i.label}_onClickPresetAction(i){i==="all"?this.selection=this.items.map(o=>o[this.valueKey]):i==="reverse"?this.selection=this.items.filter(o=>!this.selection.includes(o[this.valueKey])).map(o=>o[this.valueKey]):i==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let i=[{id:"all",label:"\u5168\u9009",size:"small",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",size:"small",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",size:"small",onClick:()=>this._onClickPresetAction("clear")}],o=r=>{for(let s=i.length-1;s>=0;s--)if(i[s].id===r.id){let n=r.onClick;r.onClick=()=>{i[s].onClick(),n&&n.call(this,this.getInputValue());},i.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(r=>{o(r);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(r=>{o(r);}),i.length>0&&(this.afterActions||(this.afterActions=[]),this.afterActions.push(...i));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(i){let o=this.options.labelKey;if(o){if(o in i)return i[o]}else return i.label}renderResults(){return f`<div slot="end" 
            class="results mark-err" 
            no-padding 
            style="${J({maxHeight:this.options.height})}">
            ${Rt(this.selection,i=>f`<div class="item" >
                    <span>${i}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(i)}></sl-icon-button>
                </div>`)}
        </div>`}renderInput(){return f`<div class="list">   
                ${this.renderList()}       
        </div>`}};exports.AutoFieldList.styles=[R.styles,_`
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
                    flex-grow        : 1;
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
                    background-color: var(--sl-color-gray-100);
                    margin-bottom: 4px; 
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
            
        `],x([T()],exports.AutoFieldList.prototype,"selectedTips",2),x([A("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=x([z("auto-field-list")],exports.AutoFieldList);var ga=_`
  :host {
    display: inline-block;
  }
`;var ba=null,jo=class{};jo.render=function(t,e){ba(t,e);};self.QrCreator=jo;(function(t){function e(c,l,p,m){var d={},u=t(p,l);u.u(c),u.J(),m=m||0;var g=u.h(),b=u.h()+2*m;return d.text=c,d.level=l,d.version=p,d.O=b,d.a=function(v,E){return v-=m,E-=m,0>v||v>=g||0>E||E>=g?false:u.a(v,E)},d}function i(c,l,p,m,d,u,g,b,v,E){function $(w,S,y,k,V,F,U){w?(c.lineTo(S+F,y+U),c.arcTo(S,y,k,V,u)):c.lineTo(S,y);}g?c.moveTo(l+u,p):c.moveTo(l,p),$(b,m,p,m,d,-u,0),$(v,m,d,l,d,0,-u),$(E,l,d,l,p,u,0),$(g,l,p,m,p,0,u);}function o(c,l,p,m,d,u,g,b,v,E){function $(w,S,y,k){c.moveTo(w+y,S),c.lineTo(w,S),c.lineTo(w,S+k),c.arcTo(w,S,w+y,S,u);}g&&$(l,p,u,u),b&&$(m,p,-u,u),v&&$(m,d,-u,-u),E&&$(l,d,u,-u);}function r(c,l){var p=l.fill;if(typeof p=="string")c.fillStyle=p;else {var m=p.type,d=p.colorStops;if(p=p.position.map(g=>Math.round(g*l.size)),m==="linear-gradient")var u=c.createLinearGradient.apply(c,p);else if(m==="radial-gradient")u=c.createRadialGradient.apply(c,p);else throw Error("Unsupported fill");d.forEach(([g,b])=>{u.addColorStop(g,b);}),c.fillStyle=u;}}function s(c,l){t:{var p=l.text,m=l.v,d=l.N,u=l.K,g=l.P;for(d=Math.max(1,d||1),u=Math.min(40,u||40);d<=u;d+=1)try{var b=e(p,m,d,g);break t}catch{}b=void 0;}if(!b)return null;for(p=c.getContext("2d"),l.background&&(p.fillStyle=l.background,p.fillRect(l.left,l.top,l.size,l.size)),m=b.O,u=l.size/m,p.beginPath(),g=0;g<m;g+=1)for(d=0;d<m;d+=1){var v=p,E=l.left+d*u,$=l.top+g*u,w=g,S=d,y=b.a,k=E+u,V=$+u,F=w-1,U=w+1,D=S-1,M=S+1,lt=Math.floor(Math.min(.5,Math.max(0,l.R))*u),ot=y(w,S),bt=y(F,D),yt=y(F,S);F=y(F,M);var vt=y(w,M);M=y(U,M),S=y(U,S),U=y(U,D),w=y(w,D),E=Math.round(E),$=Math.round($),k=Math.round(k),V=Math.round(V),ot?i(v,E,$,k,V,lt,!yt&&!w,!yt&&!vt,!S&&!vt,!S&&!w):o(v,E,$,k,V,lt,yt&&w&&bt,yt&&vt&&F,S&&vt&&M,S&&w&&U);}return r(p,l),p.fill(),c}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};ba=function(c,l){var p={};Object.assign(p,n,c),p.N=p.minVersion,p.K=p.maxVersion,p.v=p.ecLevel,p.left=p.left,p.top=p.top,p.size=p.size,p.fill=p.fill,p.background=p.background,p.text=p.text,p.R=p.radius,p.P=p.quiet,l instanceof HTMLCanvasElement?((l.width!==p.size||l.height!==p.size)&&(l.width=p.size,l.height=p.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,p)):(c=document.createElement("canvas"),c.width=p.size,c.height=p.size,p=s(c,p),l.appendChild(p));};})(function(){function t(l){var p=i.s(l);return {S:function(){return 4},b:function(){return p.length},write:function(m){for(var d=0;d<p.length;d+=1)m.put(p[d],8);}}}function e(){var l=[],p=0,m={B:function(){return l},c:function(d){return (l[Math.floor(d/8)]>>>7-d%8&1)==1},put:function(d,u){for(var g=0;g<u;g+=1)m.m((d>>>u-g-1&1)==1);},f:function(){return p},m:function(d){var u=Math.floor(p/8);l.length<=u&&l.push(0),d&&(l[u]|=128>>>p%8),p+=1;}};return m}function i(l,p){function m(w,S){for(var y=-1;7>=y;y+=1)if(!(-1>=w+y||b<=w+y))for(var k=-1;7>=k;k+=1) -1>=S+k||b<=S+k||(g[w+y][S+k]=0<=y&&6>=y&&(k==0||k==6)||0<=k&&6>=k&&(y==0||y==6)||2<=y&&4>=y&&2<=k&&4>=k);}function d(w,S){for(var y=b=4*l+17,k=Array(y),V=0;V<y;V+=1){k[V]=Array(y);for(var F=0;F<y;F+=1)k[V][F]=null;}for(g=k,m(0,0),m(b-7,0),m(0,b-7),y=s.G(l),k=0;k<y.length;k+=1)for(V=0;V<y.length;V+=1){F=y[k];var U=y[V];if(g[F][U]==null)for(var D=-2;2>=D;D+=1)for(var M=-2;2>=M;M+=1)g[F+D][U+M]=D==-2||D==2||M==-2||M==2||D==0&&M==0;}for(y=8;y<b-8;y+=1)g[y][6]==null&&(g[y][6]=y%2==0);for(y=8;y<b-8;y+=1)g[6][y]==null&&(g[6][y]=y%2==0);for(y=s.w(u<<3|S),k=0;15>k;k+=1)V=!w&&(y>>k&1)==1,g[6>k?k:8>k?k+1:b-15+k][8]=V,g[8][8>k?b-k-1:9>k?15-k:14-k]=V;if(g[b-8][8]=!w,7<=l){for(y=s.A(l),k=0;18>k;k+=1)V=!w&&(y>>k&1)==1,g[Math.floor(k/3)][k%3+b-8-3]=V;for(k=0;18>k;k+=1)V=!w&&(y>>k&1)==1,g[k%3+b-8-3][Math.floor(k/3)]=V;}if(v==null){for(w=c.I(l,u),y=e(),k=0;k<E.length;k+=1)V=E[k],y.put(4,4),y.put(V.b(),s.f(4,l)),V.write(y);for(k=V=0;k<w.length;k+=1)V+=w[k].j;if(y.f()>8*V)throw Error("code length overflow. ("+y.f()+">"+8*V+")");for(y.f()+4<=8*V&&y.put(0,4);y.f()%8!=0;)y.m(false);for(;!(y.f()>=8*V)&&(y.put(236,8),!(y.f()>=8*V));)y.put(17,8);var lt=0;for(V=k=0,F=Array(w.length),U=Array(w.length),D=0;D<w.length;D+=1){var ot=w[D].j,bt=w[D].o-ot;for(k=Math.max(k,ot),V=Math.max(V,bt),F[D]=Array(ot),M=0;M<F[D].length;M+=1)F[D][M]=255&y.B()[M+lt];for(lt+=ot,M=s.C(bt),ot=o(F[D],M.b()-1).l(M),U[D]=Array(M.b()-1),M=0;M<U[D].length;M+=1)bt=M+ot.b()-U[D].length,U[D][M]=0<=bt?ot.c(bt):0;}for(M=y=0;M<w.length;M+=1)y+=w[M].o;for(y=Array(y),M=lt=0;M<k;M+=1)for(D=0;D<w.length;D+=1)M<F[D].length&&(y[lt]=F[D][M],lt+=1);for(M=0;M<V;M+=1)for(D=0;D<w.length;D+=1)M<U[D].length&&(y[lt]=U[D][M],lt+=1);v=y;}for(w=v,y=-1,k=b-1,V=7,F=0,S=s.F(S),U=b-1;0<U;U-=2)for(U==6&&--U;;){for(D=0;2>D;D+=1)g[k][U-D]==null&&(M=false,F<w.length&&(M=(w[F]>>>V&1)==1),S(k,U-D)&&(M=!M),g[k][U-D]=M,--V,V==-1&&(F+=1,V=7));if(k+=y,0>k||b<=k){k-=y,y=-y;break}}}var u=r[p],g=null,b=0,v=null,E=[],$={u:function(w){w=t(w),E.push(w),v=null;},a:function(w,S){if(0>w||b<=w||0>S||b<=S)throw Error(w+","+S);return g[w][S]},h:function(){return b},J:function(){for(var w=0,S=0,y=0;8>y;y+=1){d(true,y);var k=s.D($);(y==0||w>k)&&(w=k,S=y);}d(false,S);}};return $}function o(l,p){if(typeof l.length>"u")throw Error(l.length+"/"+p);var m=function(){for(var u=0;u<l.length&&l[u]==0;)u+=1;for(var g=Array(l.length-u+p),b=0;b<l.length-u;b+=1)g[b]=l[b+u];return g}(),d={c:function(u){return m[u]},b:function(){return m.length},multiply:function(u){for(var g=Array(d.b()+u.b()-1),b=0;b<d.b();b+=1)for(var v=0;v<u.b();v+=1)g[b+v]^=n.i(n.g(d.c(b))+n.g(u.c(v)));return o(g,0)},l:function(u){if(0>d.b()-u.b())return d;for(var g=n.g(d.c(0))-n.g(u.c(0)),b=Array(d.b()),v=0;v<d.b();v+=1)b[v]=d.c(v);for(v=0;v<u.b();v+=1)b[v]^=n.i(n.g(u.c(v))+g);return o(b,0).l(u)}};return d}i.s=function(l){for(var p=[],m=0;m<l.length;m++){var d=l.charCodeAt(m);128>d?p.push(d):2048>d?p.push(192|d>>6,128|d&63):55296>d||57344<=d?p.push(224|d>>12,128|d>>6&63,128|d&63):(m++,d=65536+((d&1023)<<10|l.charCodeAt(m)&1023),p.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63));}return p};var r={L:1,M:0,Q:3,H:2},s=function(){function l(d){for(var u=0;d!=0;)u+=1,d>>>=1;return u}var p=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],m={w:function(d){for(var u=d<<10;0<=l(u)-l(1335);)u^=1335<<l(u)-l(1335);return (d<<10|u)^21522},A:function(d){for(var u=d<<12;0<=l(u)-l(7973);)u^=7973<<l(u)-l(7973);return d<<12|u},G:function(d){return p[d-1]},F:function(d){switch(d){case 0:return function(u,g){return (u+g)%2==0};case 1:return function(u){return u%2==0};case 2:return function(u,g){return g%3==0};case 3:return function(u,g){return (u+g)%3==0};case 4:return function(u,g){return (Math.floor(u/2)+Math.floor(g/3))%2==0};case 5:return function(u,g){return u*g%2+u*g%3==0};case 6:return function(u,g){return (u*g%2+u*g%3)%2==0};case 7:return function(u,g){return (u*g%3+(u+g)%2)%2==0};default:throw Error("bad maskPattern:"+d)}},C:function(d){for(var u=o([1],0),g=0;g<d;g+=1)u=u.multiply(o([1,n.i(g)],0));return u},f:function(d,u){if(d!=4||1>u||40<u)throw Error("mode: "+d+"; type: "+u);return 10>u?8:16},D:function(d){for(var u=d.h(),g=0,b=0;b<u;b+=1)for(var v=0;v<u;v+=1){for(var E=0,$=d.a(b,v),w=-1;1>=w;w+=1)if(!(0>b+w||u<=b+w))for(var S=-1;1>=S;S+=1)0>v+S||u<=v+S||(w!=0||S!=0)&&$==d.a(b+w,v+S)&&(E+=1);5<E&&(g+=3+E-5);}for(b=0;b<u-1;b+=1)for(v=0;v<u-1;v+=1)E=0,d.a(b,v)&&(E+=1),d.a(b+1,v)&&(E+=1),d.a(b,v+1)&&(E+=1),d.a(b+1,v+1)&&(E+=1),(E==0||E==4)&&(g+=3);for(b=0;b<u;b+=1)for(v=0;v<u-6;v+=1)d.a(b,v)&&!d.a(b,v+1)&&d.a(b,v+2)&&d.a(b,v+3)&&d.a(b,v+4)&&!d.a(b,v+5)&&d.a(b,v+6)&&(g+=40);for(v=0;v<u;v+=1)for(b=0;b<u-6;b+=1)d.a(b,v)&&!d.a(b+1,v)&&d.a(b+2,v)&&d.a(b+3,v)&&d.a(b+4,v)&&!d.a(b+5,v)&&d.a(b+6,v)&&(g+=40);for(v=E=0;v<u;v+=1)for(b=0;b<u;b+=1)d.a(b,v)&&(E+=1);return g+=Math.abs(100*E/u/u-50)/5*10}};return m}(),n=function(){for(var l=Array(256),p=Array(256),m=0;8>m;m+=1)l[m]=1<<m;for(m=8;256>m;m+=1)l[m]=l[m-4]^l[m-5]^l[m-6]^l[m-8];for(m=0;255>m;m+=1)p[l[m]]=m;return {g:function(d){if(1>d)throw Error("glog("+d+")");return p[d]},i:function(d){for(;0>d;)d+=255;for(;256<=d;)d-=255;return l[d]}}}(),c=function(){function l(d,u){switch(u){case r.L:return p[4*(d-1)];case r.M:return p[4*(d-1)+1];case r.Q:return p[4*(d-1)+2];case r.H:return p[4*(d-1)+3]}}var p=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],m={I:function(d,u){var g=l(d,u);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+d+"/errorCorrectLevel:"+u);d=g.length/3,u=[];for(var b=0;b<d;b+=1)for(var v=g[3*b],E=g[3*b+1],$=g[3*b+2],w=0;w<v;w+=1){var S=$,y={};y.o=E,y.j=S,u.push(y);}return u}};return m}();return i}());var va=QrCreator;var Bt=class extends O{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&va.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return f`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${J({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Bt.styles=[P,ga];a([A("canvas")],Bt.prototype,"canvas",2);a([h()],Bt.prototype,"value",2);a([h()],Bt.prototype,"label",2);a([h({type:Number})],Bt.prototype,"size",2);a([h()],Bt.prototype,"fill",2);a([h()],Bt.prototype,"background",2);a([h({type:Number})],Bt.prototype,"radius",2);a([h({attribute:"error-correction"})],Bt.prototype,"errorCorrection",2);a([I(["background","errorCorrection","fill","radius","size","value"])],Bt.prototype,"generate",1);Bt.define("sl-qr-code");exports.AutoFieldQRCode=class Ko extends R{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return f`              
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
        `}};exports.AutoFieldQRCode=x([z("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class He extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let i=this.options.url,[o,r]=i.split("?"),s=new URLSearchParams(r);return s.set("t",Date.now().toString()),`${o}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return f`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,_`
            sl-button.action-widget.image::part(label){
                padding: 0px;
            }
        `],x([A("img")],exports.AutoFieldCaptcha.prototype,"img",2),x([T()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=x([z("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class Fe extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let i=this.stepCount,o=()=>{let r=Math.ceil(i*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",r.toString()),this.requestUpdate()),i--,i<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(o,this.step);};o();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let i=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(i)?Number(i[0]):Number(i),this.step=Array.isArray(i)?Number(i[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u8BD5");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles,_`
            
        `],x([T()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),x([T()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=x([z("auto-field-verifycode")],exports.AutoFieldVerifyCode);var ya=_`
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
`;var et=class Ur extends O{constructor(){super(...arguments),this.localize=new G(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await ae(this.childrenContainer);let{keyframes:e,options:i}=se(this,"tree-item.collapse",{dir:this.localize.dir()});await ne(this.childrenContainer,zr(e,this.childrenContainer.scrollHeight),i),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let e=this.parentElement;return !!e&&Ur.isTreeItem(e)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await ae(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:e,options:i}=se(this,"tree-item.expand",{dir:this.localize.dir()});await ne(this.childrenContainer,zr(e,this.childrenContainer.scrollHeight),i),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:e=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(i=>Ur.isTreeItem(i)&&(e||!i.disabled)):[]}render(){let e=this.localize.dir()==="rtl",i=!this.loading&&(!this.isLeaf||this.lazy);return f`
      <div
        part="base"
        class="${L({"tree-item":true,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":i,"tree-item--rtl":this.localize.dir()==="rtl"})}"
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
            class=${L({"tree-item__expand-button":true,"tree-item__expand-button--visible":i})}
            aria-hidden="true"
          >
            ${st(this.loading,()=>f` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${st(this.selectable,()=>f`
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
    `}};et.styles=[P,ya];et.dependencies={"sl-checkbox":it,"sl-icon":W,"sl-spinner":le};a([T()],et.prototype,"indeterminate",2);a([T()],et.prototype,"isLeaf",2);a([T()],et.prototype,"loading",2);a([T()],et.prototype,"selectable",2);a([h({type:Boolean,reflect:true})],et.prototype,"expanded",2);a([h({type:Boolean,reflect:true})],et.prototype,"selected",2);a([h({type:Boolean,reflect:true})],et.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],et.prototype,"lazy",2);a([A("slot:not([name])")],et.prototype,"defaultSlot",2);a([A("slot[name=children]")],et.prototype,"childrenSlot",2);a([A(".tree-item__item")],et.prototype,"itemElement",2);a([A(".tree-item__children")],et.prototype,"childrenContainer",2);a([A(".tree-item__expand-button slot")],et.prototype,"expandButtonSlot",2);a([I("loading",{waitUntilFirstUpdate:true})],et.prototype,"handleLoadingChange",1);a([I("disabled")],et.prototype,"handleDisabledChange",1);a([I("selected")],et.prototype,"handleSelectedChange",1);a([I("expanded",{waitUntilFirstUpdate:true})],et.prototype,"handleExpandedChange",1);a([I("expanded",{waitUntilFirstUpdate:true})],et.prototype,"handleExpandAnimation",1);a([I("lazy",{waitUntilFirstUpdate:true})],et.prototype,"handleLazyChange",1);var Ne=et;re("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});re("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var xa=_`
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
`;function wa(t,e=false){function i(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let c=n.every(p=>p.selected),l=n.every(p=>!p.selected&&!p.indeterminate);s.selected=c,s.indeterminate=!c&&!l;}}function o(s){let n=s.parentElement;Ne.isTreeItem(n)&&(i(n),o(n));}function r(s){for(let n of s.getChildrenItems())n.selected=e?s.selected||n.selected:!n.disabled&&s.selected,r(n);e&&i(s);}r(t),o(t);}var ke=class extends O{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new G(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{let i=t.querySelector(`[slot="${e}-icon"]`),o=this.getExpandButtonIcon(e);o&&(i===null?t.append(o):i.hasAttribute("data-default")&&i.replaceWith(o));});},this.handleTreeChanged=t=>{for(let e of t){let i=[...e.addedNodes].filter(Ne.isTreeItem),o=[...e.removedNodes].filter(Ne.isTreeItem);i.forEach(this.initTreeItem),this.lastFocusedItem&&o.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),Ne.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let i=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(i){let o=i.cloneNode(true);return [o,...o.querySelectorAll("[id]")].forEach(r=>r.removeAttribute("id")),o.setAttribute("data-default",""),o.slot=`${t}-icon`,o}return null}selectItem(t){let e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),wa(t);else if(this.selection==="single"||t.isLeaf){let o=this.getAllTreeItems();for(let r of o)r.selected=r===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let i=this.selectedItems;(e.length!==i.length||i.some(o=>!e.includes(o)))&&Promise.all(i.map(o=>o.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:i}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(r=>{var s;return ["input","textarea"].includes((s=r?.tagName)==null?void 0:s.toLowerCase())}))return;let e=this.getFocusableItems(),i=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();let r=e.findIndex(l=>l.matches(":focus")),s=e[r],n=l=>{let p=e[at(l,0,e.length-1)];this.focusItem(p);},c=l=>{s.expanded=l;};t.key==="ArrowDown"?n(r+1):t.key==="ArrowUp"?n(r-1):i&&t.key==="ArrowRight"||o&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(r+1):c(true):i&&t.key==="ArrowLeft"||o&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(r-1):c(false):t.key==="Home"?n(0):t.key==="End"?n(e.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let e=t.target,i=e.closest("sl-tree-item"),o=t.composedPath().some(r=>{var s;return (s=r?.classList)==null?void 0:s.contains("tree-item__expand-button")});!i||i.disabled||e!==this.clickTarget||(o?i.expanded=!i.expanded:this.selectItem(i));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let i of e)i.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(i=>wa(i,true)));}get selectedItems(){let t=this.getAllTreeItems(),e=i=>i.selected;return t.filter(e)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(i=>{var o;if(i.disabled)return  false;let r=(o=i.parentElement)==null?void 0:o.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||e.has(r))&&e.add(i),!e.has(i)})}render(){return f`
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
    `}};ke.styles=[P,xa];a([A("slot:not([name])")],ke.prototype,"defaultSlot",2);a([A("slot[name=expand-icon]")],ke.prototype,"expandedIconSlot",2);a([A("slot[name=collapse-icon]")],ke.prototype,"collapsedIconSlot",2);a([h()],ke.prototype,"selection",2);a([I("selection")],ke.prototype,"handleSelectionChange",1);ke.define("sl-tree");Ne.define("sl-tree-item");exports.AutoFieldTreeSelect=class Ce extends R{constructor(){super(...arguments);this.nodes={};this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}connectedCallback(){if(super.connectedCallback(),this.options){this.idKey=this.options.idKey,this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let i=this.options.items;i&&(this.nodes=i,this._forEachTree((o,r,s,n)=>{s<1&&o.expanded===void 0&&(o.expanded=true),this.isItemSelected(o)&&(o.selected=true,this.selection.push({id:o[this.idKey],value:o[this.valueKey],path:n.join("/")}));}));}}isItemSelected(i){return this.value===void 0?false:this.options.multiple===false?this.value===i[this.valueKey]:this.value.includes(i[this.valueKey])}getStateValue(){let i=super.getStateValue();return this.options.multiple?Array.isArray(i)?i:[i]:i}_forEachTree(i){let o=(s,n,c,l)=>{let p=[...l,s[this.labelKey]];if(i(s,n,c,p),s.children){let m=c+1;s.children.forEach(d=>{o(d,s,m,[...p]);});}};(Array.isArray(this.nodes)?this.nodes:[this.nodes]).forEach(s=>{o(s,void 0,0,[]);});}_renderNode(i,o,r){let s=o.includes(i[this.valueKey]),n=[...r,i[this.labelKey]];return f`<sl-tree-item 
            data-id=${String(i[this.idKey])}
            data-value=${String(i[this.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${i.expanded}
        >${i.label}        
        ${Array.isArray(i.children)?f`${i.children.map(c=>this._renderNode(c,o,n))}`:""}</sl-tree-item>`}_renderNodes(i){let o=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(i)?i.map(r=>this._renderNode(r,o,[])):this._renderNode(i,o,[])}onSelectionChange(i){let o=Array.from(i.detail.selection);o&&(this.selection=o.map(r=>({id:r.dataset.id,value:r.dataset.value,path:r.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(i=>i.value):this.selection.length>0?this.selection[0].value:void 0}renderTree(){return f`
        <sl-tree 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}   
            size=${this.context.size}
            selection = "${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
            @sl-selection-change=${this.onSelectionChange.bind(this)}
        >${this._renderNodes(this.nodes)}</sl-tree> 
        `}renderInput(){return f`              
            ${this.renderTree()}
        `}};exports.AutoFieldTreeSelect.styles=[R.styles,_`
            sl-tree{
                padding: 0.2em;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
            }
    `],exports.AutoFieldTreeSelect=x([z("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class Be extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(i){let o=i.target.dataset.id;for(let r=0;r<this.selection.length;r++)if(String(this.selection[r].id)===o){this.selection.splice(r,1),this.onFieldChange(),this.requestUpdate();break}i.stopPropagation();}getShowItemValue(i,o,r){if(o===r)return i}getSelectedTagValue(i){if(this.options.showAsPath)return f`${i.path}`;{let r=i.path.split("/");return r[r.length-1]}}renderSelectedTags(){let i=this.selection;return f`<span class="tags">${Rt(i,o=>f`<sl-tag 
                    data-id="${o.id}" 
                    title=${o.path}
                    @sl-remove=${this._onRemoveSelection.bind(this)}
                    @click=${r=>r.stopPropagation()}
                    removable
                    >${this.getSelectedTagValue(o)}</sl-tag>`)}</span>`}renderSelection(){return f`    
            <div class="selection" slot="trigger">              
                ${st(this.selection.length===0&&this.options.placeholder,()=>f`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderSelectedTags()}
                <span class='suffix'>
                    <sl-icon library="system" class="chevron ${L({active:this.active})}" 
                        name="chevron-down" aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}renderInput(){return f`             
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
        `}};exports.AutoFieldTreeDropdown.styles=[R.styles,exports.AutoFieldTreeSelect.styles,_`
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
        `],x([T()],exports.AutoFieldTreeDropdown.prototype,"active",2),x([A("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=x([z("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);exports.AutoFieldCustom=class Ue extends R{constructor(){super(...arguments);this.selection=[];this.active=false;this.content=null;}getInitialOptions(){return {placeholder:"\u8BF7\u9009\u62E9"}}connectedCallback(){super.connectedCallback(),this.content=this.ownerDocument.querySelector(this.options.content),this.customValue=this.value,this._onCustomInput();}disconnectedCallback(){super.disconnectedCallback(),this.content&&(this.content.style.display="none",this.ownerDocument.body.appendChild(this.content));}_onShowPopup(){this.content&&(this.container?.appendChild(this.content),this.content.style.display="block"),this.active=true;}_onHidePopup(){this.active=false;}_onCustomInput(){this.content?.addEventListener("auto-input",i=>{this.customValue=i.detail.value,this.onFieldInput();});}getInputValue(){return this.customValue}renderCustomValue(){return f`<span class="custom-value">${Pt(this.options.toRender?this.options.toRender(this.customValue):this.customValue)}</span>`}renderSelection(){return f`    
            <div class="selection" slot="trigger">              
                ${st(!this.customValue&&this.options.placeholder,()=>f`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderCustomValue()}
                <span class='suffix'>
                    <sl-icon library="system" 
                        class="chevron ${L({active:this.active})}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}renderCustom(){return f`<div class="container">
            
        </div>`}renderInput(){return f`
            <sl-dropdown          
                size="${this.context.size}"    
                @sl-show="${this._onShowPopup.bind(this)}" 
                @sl-after-hide="${this._onHidePopup.bind(this)}" 
                sync="width"
            >
            ${this.renderSelection()}  
            ${this.renderCustom()}      
        </sl-dropdown> 
        `}};exports.AutoFieldCustom.styles=[R.styles,_`
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
        `],x([T()],exports.AutoFieldCustom.prototype,"active",2),x([A(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=x([z("auto-field-custom")],exports.AutoFieldCustom);j.define("sl-button");H.define("sl-input");var _a=_`
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
`;var ji=class extends O{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};ji.styles=[P,_a];a([h({type:Boolean,reflect:true})],ji.prototype,"vertical",2);a([I("vertical")],ji.prototype,"handleVerticalChange",1);ji.define("sl-divider");ct.define("sl-dropdown");le.define("sl-spinner");W.define("sl-icon");var ka=_`
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

`;var It=class extends wt{constructor(){super(...arguments);this.classes=new ve(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let i=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=i,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(o=>{o.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(o=>{o.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(i,o,r){super.attributeChangedCallback(i,o,r),this.updateStyles();}render(){return f` 
            <slot ></slot> 
        `}};It.styles=ka,x([h({type:String})],It.prototype,"direction",2),x([h({type:String})],It.prototype,"gap",2),x([h({type:Boolean})],It.prototype,"wrap",2),x([h({type:String})],It.prototype,"align",2),x([h({type:String})],It.prototype,"justify",2),x([h({type:String})],It.prototype,"border",2),x([h({type:String})],It.prototype,"grow",2),x([h({type:String})],It.prototype,"shrink",2),x([h({type:Boolean,reflect:true})],It.prototype,"fit",2),It=x([z("magic-flex")],It);var Ca=_`
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
    
}`;var $a=_`
    ${Ca}
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
    :host(.auto-layout){
        & > .fields{
            & > * {
                width: 100%;
                box-sizing: border-box;                 
                display: inline-block;
            }    
        }
    }
    :host(.row-layout){
        display: flex;
        flex-direction: row;
    }
    :host(.col-layout){
        display: flex;
        flex-direction: column;
    }
    :host(.grid){
        border: 1px solid var(--sl-input-border-color);
        border-left: none;
        .fields > :last-child{
            border-bottom:none;
        }            
        & > .fields {
            & > * {
                border-bottom: 1px solid var(--sl-input-border-color);
                border-left: 1px solid var(--sl-input-border-color);
            }
        }
    }
    
`;var qr={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>'};exports.AutoForm=class tt extends wt{constructor(){super(...arguments);this.classs=new ve(this);this.theme=new Xe(this);this.context={};this.schemas=[];this.showInitialError=false;this.compact=false;this.seq=++exports.AutoForm.seq;this.advanced=true;this.grid=true;this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this.iconLibrary="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg";}registerIcons(i,o){br("default",{resolver:i,...o||{}});}connectedCallback(){super.connectedCallback(),this.registerIcons(i=>i in qr?`data:image/svg+xml,${encodeURIComponent(qr[i])}`:this.iconLibrary.replace("{name}",i));}_load(){let i=this.store.schemas.store.state;this.schemas=Object.values(i).filter(o=>this.group?o.group===this.group:(this.advanced===false&&o.advanced===true,true)).sort((o,r)=>(o.order||0)-(r.order||0));}bind(i){this.store=i,Object.assign(this.context,{store:i,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,grid:this.grid,dark:this.dark,dirty:false,invalide:Object.keys(i.schemas.errors).length>0,showInitialError:this.showInitialError}),this._load(),this.requestUpdate();}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(o=>{o.tagName.startsWith("auto-field")&&(o.invalidMessage=void 0);}),this.requestUpdate();}_renderWidget(i){let o=i.width,r=i.widget,s;try{s=document.createElement(`auto-field-${r||"input"}`);}catch{s=document.createElement("auto-field-input");}return s.schema=i,s.setAttribute("grid",String(this.grid)),s.setAttribute("part","field"),o&&(s.style.width=o),s}_renderFields(){return f`            
                ${this.schemas.map(i=>f`${this._renderWidget(i)}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,grid:this.grid,[`${this.layout}-layout`]:true,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact}),f`            
            <div class="actions header" > 
            </div>
            <div class="fields">
                ${this._renderFields()}
            </div>
            <div class="actions footer" >

            </div>
        `}reset(){this.store?.reset();}submit(i){if(typeof i=="function"){let o=this.store?.schemas.getValues()||{},r=this.store?.schemas.errors;i(o,r);}}};exports.AutoForm.seq=0,exports.AutoForm.styles=$a,x([cr({context:lo})],exports.AutoForm.prototype,"context",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"showInitialError",2),x([h({type:String})],exports.AutoForm.prototype,"group",2),x([h({type:String})],exports.AutoForm.prototype,"fields",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"compact",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"advanced",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"grid",2),x([h({type:String})],exports.AutoForm.prototype,"size",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"labelPos",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"labelWidth",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"dark",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"readonly",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"viewonly",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"viewAlign",2),x([h({type:String})],exports.AutoForm.prototype,"layout",2),x([h({type:String})],exports.AutoForm.prototype,"iconLibrary",2),exports.AutoForm=x([z("auto-form")],exports.AutoForm);/*! Bundled license information:

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
*/exports.AutoField=R;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map