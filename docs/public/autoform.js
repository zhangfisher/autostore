var AutoForm=(function(exports){'use strict';var tl=Object.defineProperty;var el=Object.getOwnPropertyDescriptor;var $e=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,i)=>(typeof require<"u"?require:e)[i]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var x=(t,e,i,r)=>{for(var o=r>1?void 0:r?el(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(o=(r?n(e,i,o):n(o))||o);return r&&o&&tl(e,i,o),o};var ar=globalThis,er=ar.trustedTypes,ls=er?er.createPolicy("lit-html",{createHTML:t=>t}):void 0,so="$lit$",Jt=`lit$${Math.random().toFixed(9).slice(2)}$`,no="?"+Jt,il=`<${no}>`,Oe=ar.document===void 0?{createTreeWalker:()=>({})}:document,mi=()=>Oe.createComment(""),fi=t=>t===null||typeof t!="object"&&typeof t!="function",ao=Array.isArray,ms=t=>ao(t)||typeof t?.[Symbol.iterator]=="function",oo=`[ 	
\f\r]`,di=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cs=/-->/g,ps=/>/g,Ee=RegExp(`>|${oo}(?:([^\\s"'>=/]+)(${oo}*=${oo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hs=/'/g,us=/"/g,fs=/^(?:script|style|textarea|title)$/i,lo=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),d=lo(1),st=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),ds=new WeakMap,Ae=Oe.createTreeWalker(Oe,129);function vs(t,e){if(!ao(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ls!==void 0?ls.createHTML(e):e}var ys=(t,e)=>{let i=t.length-1,r=[],o,s=e===2?"<svg>":e===3?"<math>":"",n=di;for(let c=0;c<i;c++){let l=t[c],u,f,p=-1,m=0;for(;m<l.length&&(n.lastIndex=m,f=n.exec(l),f!==null);)m=n.lastIndex,n===di?f[1]==="!--"?n=cs:f[1]!==void 0?n=ps:f[2]!==void 0?(fs.test(f[2])&&(o=RegExp("</"+f[2],"g")),n=Ee):f[3]!==void 0&&(n=Ee):n===Ee?f[0]===">"?(n=o??di,p=-1):f[1]===void 0?p=-2:(p=n.lastIndex-f[2].length,u=f[1],n=f[3]===void 0?Ee:f[3]==='"'?us:hs):n===us||n===hs?n=Ee:n===cs||n===ps?n=di:(n=Ee,o=void 0);let g=n===Ee&&t[c+1].startsWith("/>")?" ":"";s+=n===di?l+il:p>=0?(r.push(u),l.slice(0,p)+so+l.slice(p)+Jt+g):l+Jt+(p===-2?c:g);}return [vs(t,s+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},gi=class t{constructor({strings:e,_$litType$:i},r){let o;this.parts=[];let s=0,n=0,c=e.length-1,l=this.parts,[u,f]=ys(e,i);if(this.el=t.createElement(u,r),Ae.currentNode=this.el.content,i===2||i===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes);}for(;(o=Ae.nextNode())!==null&&l.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(so)){let m=f[n++],g=o.getAttribute(p).split(Jt),b=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?rr:b[1]==="?"?or:b[1]==="@"?sr:Re}),o.removeAttribute(p);}else p.startsWith(Jt)&&(l.push({type:6,index:s}),o.removeAttribute(p));if(fs.test(o.tagName)){let p=o.textContent.split(Jt),m=p.length-1;if(m>0){o.textContent=er?er.emptyScript:"";for(let g=0;g<m;g++)o.append(p[g],mi()),Ae.nextNode(),l.push({type:2,index:++s});o.append(p[m],mi());}}}else if(o.nodeType===8)if(o.data===no)l.push({type:2,index:s});else {let p=-1;for(;(p=o.data.indexOf(Jt,p+1))!==-1;)l.push({type:7,index:s}),p+=Jt.length-1;}s++;}}static createElement(e,i){let r=Oe.createElement("template");return r.innerHTML=e,r}};function Te(t,e,i=t,r){if(e===st)return e;let o=r!==void 0?i._$Co?.[r]:i._$Cl,s=fi(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(false),s===void 0?o=void 0:(o=new s(t),o._$AT(t,i,r)),r!==void 0?(i._$Co??=[])[r]=o:i._$Cl=o),o!==void 0&&(e=Te(t,o._$AS(t,e.values),o,r)),e}var ir=class{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:i},parts:r}=this._$AD,o=(e?.creationScope??Oe).importNode(i,true);Ae.currentNode=o;let s=Ae.nextNode(),n=0,c=0,l=r[0];for(;l!==void 0;){if(n===l.index){let u;l.type===2?u=new Ke(s,s.nextSibling,this,e):l.type===1?u=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(u=new nr(s,this,e)),this._$AV.push(u),l=r[++c];}n!==l?.index&&(s=Ae.nextNode(),n++);}return Ae.currentNode=Oe,o}p(e){let i=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,i),i+=r.strings.length-2):r._$AI(e[i])),i++;}},Ke=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,i,r,o){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??true;}get parentNode(){let e=this._$AA.parentNode,i=this._$AM;return i!==void 0&&e?.nodeType===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=Te(this,e,i),fi(e)?e===X||e==null||e===""?(this._$AH!==X&&this._$AR(),this._$AH=X):e!==this._$AH&&e!==st&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ms(e)?this.k(e):this._(e);}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e));}_(e){this._$AH!==X&&fi(this._$AH)?this._$AA.nextSibling.data=e:this.T(Oe.createTextNode(e)),this._$AH=e;}$(e){let{values:i,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=gi.createElement(vs(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(i);else {let s=new ir(o,this),n=s.u(this.options);s.p(i),this.T(n),this._$AH=s;}}_$AC(e){let i=ds.get(e.strings);return i===void 0&&ds.set(e.strings,i=new gi(e)),i}k(e){ao(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,r,o=0;for(let s of e)o===i.length?i.push(r=new t(this.O(mi()),this.O(mi()),this,this.options)):r=i[o],r._$AI(s),o++;o<i.length&&(this._$AR(r&&r._$AB.nextSibling,o),i.length=o);}_$AR(e=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);e&&e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r;}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e));}},Re=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,r,o,s){this.type=1,this._$AH=X,this._$AN=void 0,this.element=e,this.name=i,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=X;}_$AI(e,i=this,r,o){let s=this.strings,n=false;if(s===void 0)e=Te(this,e,i,0),n=!fi(e)||e!==this._$AH&&e!==st,n&&(this._$AH=e);else {let c=e,l,u;for(e=s[0],l=0;l<s.length-1;l++)u=Te(this,c[r+l],i,l),u===st&&(u=this._$AH[l]),n||=!fi(u)||u!==this._$AH[l],u===X?e=X:e!==X&&(e+=(u??"")+s[l+1]),this._$AH[l]=u;}n&&!o&&this.j(e);}j(e){e===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"");}},rr=class extends Re{constructor(){super(...arguments),this.type=3;}j(e){this.element[this.name]=e===X?void 0:e;}},or=class extends Re{constructor(){super(...arguments),this.type=4;}j(e){this.element.toggleAttribute(this.name,!!e&&e!==X);}},sr=class extends Re{constructor(e,i,r,o,s){super(e,i,r,o,s),this.type=5;}_$AI(e,i=this){if((e=Te(this,e,i,0)??X)===st)return;let r=this._$AH,o=e===X&&r!==X||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==X&&(r===X||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e;}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e);}},nr=class{constructor(e,i,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r;}get _$AU(){return this._$AM._$AU}_$AI(e){Te(this,e);}},xs={I:Ke},rl=ar.litHtmlPolyfillSupport;rl?.(gi,Ke),(ar.litHtmlVersions??=[]).push("3.3.0");var _s=(t,e,i)=>{let r=i?.renderBefore??e,o=r._$litPart$;if(o===void 0){let s=i?.renderBefore??null;r._$litPart$=o=new Ke(e.insertBefore(mi(),s),s,void 0,i??{});}return o._$AI(t),o};var C=t=>t??X;var ws=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(e){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=e;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var Yt=function(t,e,i,r,o){if(typeof e=="function"?t!==e||true:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(t,i),i},dt=function(t,e,i,r){if(typeof e=="function"?t!==e||true:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return i==="m"?r:i==="a"?r.call(t):r?r.value:e.get(t)},Ge,lr,cr,bi,co,vi,pr,Ie,yi,de,hr,Cs,Ss=t=>typeof t=="boolean"?t:t?.capture??false;var ol=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(e,i,r){if(i==null)return;let o=Ss(r)?this.__captureEventListeners:this.__eventListeners,s=o.get(e);if(s===void 0)s=new Map,o.set(e,s);else if(s.has(i))return;let n=typeof r=="object"&&r?r:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(e,i,r)),s.set(i,n??{});}removeEventListener(e,i,r){if(i==null)return;let o=Ss(r)?this.__captureEventListeners:this.__eventListeners,s=o.get(e);s!==void 0&&(s.delete(i),s.size||o.delete(e));}dispatchEvent(e){let i=[this],r=this.__eventTargetParent;if(e.composed)for(;r;)i.push(r),r=r.__eventTargetParent;else for(;r&&r!==this.__host;)i.push(r),r=r.__eventTargetParent;let o=false,s=false,n=0,c=null,l=null,u=null,f=e.stopPropagation,p=e.stopImmediatePropagation;Object.defineProperties(e,{target:{get(){return c??l},...Q},srcElement:{get(){return e.target},...Q},currentTarget:{get(){return u},...Q},eventPhase:{get(){return n},...Q},composedPath:{value:()=>i,...Q},stopPropagation:{value:()=>{o=true,f.call(e);},...Q},stopImmediatePropagation:{value:()=>{s=true,p.call(e);},...Q}});let m=(k,w,$)=>{typeof k=="function"?k(e):typeof k?.handleEvent=="function"&&k.handleEvent(e),w.once&&$.delete(k);},g=()=>(u=null,n=0,!e.defaultPrevented),b=i.slice().reverse();c=!this.__host||!e.composed?this:null;let v=k=>{for(l=this;l.__host&&k.includes(l.__host);)l=l.__host;};for(let k of b){!c&&(!l||l===k.__host)&&v(b.slice(b.indexOf(k))),u=k,n=k===e.target?2:1;let w=k.__captureEventListeners.get(e.type);if(w){for(let[$,y]of w)if(m($,y,w),s)return g()}if(o)return g()}let E=e.bubbles?i:[this];l=null;for(let k of E){!c&&(!l||k===l.__host)&&v(E.slice(0,E.indexOf(k)+1)),u=k,n=k===e.target?2:3;let w=k.__eventListeners.get(e.type);if(w){for(let[$,y]of w)if(m($,y,w),s)return g()}if(o)return g()}return g()}},po=ol;var Q={__proto__:null};Q.enumerable=true;Object.freeze(Q);var ho=(de=class{constructor(e,i={}){if(Ge.set(this,false),lr.set(this,false),cr.set(this,false),bi.set(this,false),co.set(this,Date.now()),vi.set(this,false),pr.set(this,void 0),Ie.set(this,void 0),yi.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof i!="object"||!i)throw new Error('The "options" argument must be an object');let{bubbles:r,cancelable:o,composed:s}=i;Yt(this,Ge,!!o),Yt(this,lr,!!r),Yt(this,cr,!!s),Yt(this,pr,`${e}`),Yt(this,Ie,null),Yt(this,yi,false);}initEvent(e,i,r){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){Yt(this,bi,true);}get target(){return dt(this,Ie,"f")}get currentTarget(){return dt(this,Ie,"f")}get srcElement(){return dt(this,Ie,"f")}get type(){return dt(this,pr,"f")}get cancelable(){return dt(this,Ge,"f")}get defaultPrevented(){return dt(this,Ge,"f")&&dt(this,bi,"f")}get timeStamp(){return dt(this,co,"f")}composedPath(){return dt(this,yi,"f")?[dt(this,Ie,"f")]:[]}get returnValue(){return !dt(this,Ge,"f")||!dt(this,bi,"f")}get bubbles(){return dt(this,lr,"f")}get composed(){return dt(this,cr,"f")}get eventPhase(){return dt(this,yi,"f")?de.AT_TARGET:de.NONE}get cancelBubble(){return dt(this,vi,"f")}set cancelBubble(e){e&&Yt(this,vi,true);}stopPropagation(){Yt(this,vi,true);}get isTrusted(){return  false}},Ge=new WeakMap,lr=new WeakMap,cr=new WeakMap,bi=new WeakMap,co=new WeakMap,vi=new WeakMap,pr=new WeakMap,Ie=new WeakMap,yi=new WeakMap,de.NONE=0,de.CAPTURING_PHASE=1,de.AT_TARGET=2,de.BUBBLING_PHASE=3,de);Object.defineProperties(ho.prototype,{initEvent:Q,stopImmediatePropagation:Q,preventDefault:Q,target:Q,currentTarget:Q,srcElement:Q,type:Q,cancelable:Q,defaultPrevented:Q,timeStamp:Q,composedPath:Q,returnValue:Q,bubbles:Q,composed:Q,eventPhase:Q,cancelBubble:Q,stopPropagation:Q,isTrusted:Q});var ks=(Cs=class extends ho{constructor(e,i={}){super(e,i),hr.set(this,void 0),Yt(this,hr,i?.detail??null);}initCustomEvent(e,i,r,o){throw new Error("Method not implemented.")}get detail(){return dt(this,hr,"f")}},hr=new WeakMap,Cs);Object.defineProperties(ks.prototype,{detail:Q});var uo=ho,mo=ks;globalThis.Event??=uo;globalThis.CustomEvent??=mo;var $s=new WeakMap,xi=t=>{let e=$s.get(t);return e===void 0&&$s.set(t,e=new Map),e},sl=class extends po{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(xi(this)).map(([e,i])=>({name:e,value:i}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(e,i){xi(this).set(e,String(i));}removeAttribute(e){xi(this).delete(e);}toggleAttribute(e,i){if(this.hasAttribute(e)){if(i===void 0||!i)return this.removeAttribute(e),false}else return i===void 0||i?(this.setAttribute(e,""),true):false;return  true}hasAttribute(e){return xi(this).has(e)}attachShadow(e){let i={host:this};return this.__shadowRootMode=e.mode,e&&e.mode==="open"&&(this.__shadowRoot=i),i}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let e=new ws(this);return this.__internals=e,e}getAttribute(e){return xi(this).get(e)??null}};var nl=class extends sl{},fo=nl;globalThis.litServerRoot??=Object.defineProperty(new fo,"localName",{get(){return "lit-server-root"}});var al=class{constructor(){this.__definitions=new Map;}define(e,i){if(this.__definitions.has(e))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${e}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${e}" has already been used with this registry`);i.__localName=e,this.__definitions.set(e,{ctor:i,observedAttributes:i.observedAttributes??[]});}get(e){return this.__definitions.get(e)?.ctor}},ll=al;var Es=new ll;var _i=globalThis,ur=_i.ShadowRoot&&(_i.ShadyCSS===void 0||_i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,go=Symbol(),As=new WeakMap,wi=class{constructor(e,i,r){if(this._$cssResult$=true,r!==go)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i;}get styleSheet(){let e=this.o,i=this.t;if(ur&&e===void 0){let r=i!==void 0&&i.length===1;r&&(e=As.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&As.set(i,e));}return e}toString(){return this.cssText}},Os=t=>new wi(typeof t=="string"?t:t+"",void 0,go),_=(t,...e)=>{let i=t.length===1?t[0]:e.reduce((r,o,s)=>r+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new wi(i,t,go)},Ts=(t,e)=>{if(ur)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of e){let r=document.createElement("style"),o=_i.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=i.cssText,t.appendChild(r);}},bo=ur||_i.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(let r of e.cssRules)i+=r.cssText;return Os(i)})(t):t;var{is:cl,defineProperty:pl,getOwnPropertyDescriptor:hl,getOwnPropertyNames:ul,getOwnPropertySymbols:dl,getPrototypeOf:ml}=Object,Si=globalThis;Si.customElements??=Es;var Rs=Si.trustedTypes,fl=Rs?Rs.emptyScript:"",gl=Si.reactiveElementPolyfillSupport,Ci=(t,e)=>t,me={toAttribute(t,e){switch(e){case Boolean:t=t?fl:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch{i=null;}}return i}},dr=(t,e)=>!cl(t,e),Is={attribute:true,type:String,converter:me,reflect:false,useDefault:false,hasChanged:dr};Symbol.metadata??=Symbol("metadata"),Si.litPropertyMetadata??=new WeakMap;var te=class extends(globalThis.HTMLElement??fo){static addInitializer(e){this._$Ei(),(this.l??=[]).push(e);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Is){if(i.state&&(i.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=true),this.elementProperties.set(e,i),!i.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(e,r,i);o!==void 0&&pl(this.prototype,e,o);}}static getPropertyDescriptor(e,i,r){let{get:o,set:s}=hl(this.prototype,e)??{get(){return this[i]},set(n){this[i]=n;}};return {get:o,set(n){let c=o?.call(this);s?.call(this,n),this.requestUpdate(e,c,r);},configurable:true,enumerable:true}}static getPropertyOptions(e){return this.elementProperties.get(e)??Is}static _$Ei(){if(this.hasOwnProperty(Ci("elementProperties")))return;let e=ml(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties);}static finalize(){if(this.hasOwnProperty(Ci("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(Ci("properties"))){let i=this.properties,r=[...ul(i),...dl(i)];for(let o of r)this.createProperty(o,i[o]);}let e=this[Symbol.metadata];if(e!==null){let i=litPropertyMetadata.get(e);if(i!==void 0)for(let[r,o]of i)this.elementProperties.set(r,o);}this._$Eh=new Map;for(let[i,r]of this.elementProperties){let o=this._$Eu(i,r);o!==void 0&&this._$Eh.set(o,i);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(e){let i=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let o of r)i.unshift(bo(o));}else e!==void 0&&i.push(bo(e));return i}static _$Eu(e,i){let r=i.attribute;return r===false?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this));}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.();}removeController(e){this._$EO?.delete(e);}_$E_(){let e=new Map,i=this.constructor.elementProperties;for(let r of i.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e);}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ts(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(e=>e.hostConnected?.());}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.());}attributeChangedCallback(e,i,r){this._$AK(e,r);}_$ET(e,i){let r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===true){let s=(r.converter?.toAttribute!==void 0?r.converter:me).toAttribute(i,r.type);this._$Em=e,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null;}}_$AK(e,i){let r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let s=r.getPropertyOptions(o),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:me;this._$Em=o,this[o]=n.fromAttribute(i,s.type)??this._$Ej?.get(o)??null,this._$Em=null;}}requestUpdate(e,i,r){if(e!==void 0){let o=this.constructor,s=this[e];if(r??=o.getPropertyOptions(e),!((r.hasChanged??dr)(s,i)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,i,r);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(e,i,{useDefault:r,reflect:o,wrapped:s},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??i??this[e]),s!==true||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(i=void 0),this._$AL.set(e,i)),o===true&&this._$Em!==e&&(this._$Eq??=new Set).add(e));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(i){Promise.reject(i);}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0;}let r=this.constructor.elementProperties;if(r.size>0)for(let[o,s]of r){let{wrapped:n}=s,c=this[o];n!==true||this._$AL.has(o)||c===void 0||this.C(o,void 0,s,c);}}let e=false,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(i)):this._$EM();}catch(r){throw e=false,this._$EM(),r}e&&this._$AE(i);}willUpdate(e){}_$AE(e){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(e)),this.updated(e);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return  true}update(e){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM();}updated(e){}firstUpdated(e){}};te.elementStyles=[],te.shadowRootOptions={mode:"open"},te[Ci("elementProperties")]=new Map,te[Ci("finalized")]=new Map,gl?.({ReactiveElement:te}),(Si.reactiveElementVersions??=[]).push("2.1.0");var vo=globalThis,wt=class extends te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=_s(i,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return st}};wt._$litElement$=true,wt.finalized=true,vo.litElementHydrateSupport?.({LitElement:wt});var bl=vo.litElementPolyfillSupport;bl?.({LitElement:wt});(vo.litElementVersions??=[]).push("4.2.0");var I=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};var vl={attribute:true,type:String,converter:me,reflect:false,hasChanged:dr},yl=(t=vl,e,i)=>{let{kind:r,metadata:o}=i,s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=true),s.set(i.name,t),r==="accessor"){let{name:n}=i;return {set(c){let l=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,l,t);},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(r==="setter"){let{name:n}=i;return function(c){let l=this[n];e.call(this,c),this.requestUpdate(n,l,t);}}throw Error("Unsupported decorator location: "+r)};function h(t){return (e,i)=>typeof i=="object"?yl(t,e,i):((r,o,s)=>{let n=o.hasOwnProperty(s);return o.constructor.createProperty(s,r),n?Object.getOwnPropertyDescriptor(o,s):void 0})(t,e,i)}function O(t){return h({...t,state:true,attribute:false})}function Ye(t){return (e,i)=>{let r=typeof e=="function"?e:e[i];Object.assign(r,t);}}var fe=(t,e,i)=>(i.configurable=true,i.enumerable=true,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);function A(t,e){return (i,r,o)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return fe(i,r,{get(){return s(this)}})}}function Vs(t){return (e,i)=>{let{slot:r,selector:o}=t??{},s="slot"+(r?`[name=${r}]`:":not([name])");return fe(e,i,{get(){let n=this.renderRoot?.querySelector(s),c=n?.assignedElements(t)??[];return o===void 0?c:c.filter(l=>l.matches(o))}})}}function ge(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function Ps(t,e){return ge(t)?Object.assign({},t,e):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},e)}var xl=".";function Ls(t,e,i){if(!e||e.length===0)return t;let r=Array.isArray(e)?e:e.split(xl),o,s=t;for(let n=0;n<r.length;n++){let c=r[n];if(c in s)o=s[c];else return i;s=o;}return o}function mr(t,e,i,r){if(!e||!t)return t;let o=e;if(o.length===0)return typeof t=="object"&&Object.assign(t,i),t;{let s=t,n=[],c=(l,u,f)=>{l[u]=f;};for(let l=0;l<o.length;l++){let u=o[l];if(n.push(u),s)if(Array.isArray(s)){let f=parseInt(u,10);if(Number.isNaN(f)||f<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===o.length-1?c(s,f,i):s=s[f];}else s instanceof Map||s instanceof WeakMap?l===o.length-1?s.set(u,i):(s.has(u)||s.set(u,{}),s=s.get(u)):typeof s=="object"&&u in s?l===o.length-1?c(s,u,i):s=s[u]:(s[u]=l===o.length-1?i:{},s=s[u]);else s[u]=l===o.length-1?i:{},s=s[u];}}return t}function _l(t){if(t==null)return "";let e=typeof t;if(e==="boolean")return String(t);if(Array.isArray(e))return t.split(",").map(i=>i.trim());if(e==="object")try{return JSON.stringify(t)}catch{return "{} "}return String(t)}function Ds(t,e){if(!e)return t;let i=e.datatype||"any";if(i==="any")return t;if(i==="string")return _l(t);if(i==="number")return Number(t);if(typeof t=="string"){if(i==="boolean")return t.toLowerCase()==="true";if(i==="array")return t.split(",").map(r=>r.trim());if(i==="object")try{return JSON.parse(t)}catch{return {}}}return i==="boolean"?!!t:t}function Ms(t,e,i){return t?i(e):e}var be=class extends Event{constructor(e,i,r,o){super("context-request",{bubbles:true,composed:true}),this.context=e,this.contextTarget=i,this.callback=r,this.subscribe=o??false;}};var Xe=class{constructor(e,i,r,o){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=e,i.context!==void 0){let s=i;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=i,this.callback=r,this.subscribe=o??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new be(this.context,this.host,this.t,this.subscribe));}};var fr=class{get value(){return this.o}set value(e){this.setValue(e);}setValue(e,i=false){let r=i||!Object.is(e,this.o);this.o=e,r&&this.updateObservers();}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[i,{disposer:r}]of this.subscriptions)i(this.o,r);},e!==void 0&&(this.value=e);}addCallback(e,i,r){if(!r)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e);},consumerHost:i});let{disposer:o}=this.subscriptions.get(e);e(this.value,o);}clearCallbacks(){this.subscriptions.clear();}};var yo=class extends Event{constructor(e,i){super("context-provider",{bubbles:true,composed:true}),this.context=e,this.contextTarget=i;}},Qe=class extends fr{constructor(e,i,r){super(i.context!==void 0?i.initialValue:r),this.onContextRequest=o=>{if(o.context!==this.context)return;let s=o.contextTarget??o.composedPath()[0];s!==this.host&&(o.stopPropagation(),this.addCallback(o.callback,s,o.subscribe));},this.onProviderRequest=o=>{if(o.context!==this.context||(o.contextTarget??o.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:c}]of this.subscriptions)s.has(n)||(s.add(n),c.dispatchEvent(new be(this.context,c,n,true)));o.stopPropagation();},this.host=e,i.context!==void 0?this.context=i.context:this.context=i,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new yo(this.context,this.host));}};function xo({context:t}){return (e,i)=>{let r=new WeakMap;if(typeof i=="object")return {get(){return e.get.call(this)},set(o){return r.get(this).setValue(o),e.set.call(this,o)},init(o){return r.set(this,new Qe(this,{context:t,initialValue:o})),o}};{e.constructor.addInitializer(n=>{r.set(n,new Qe(n,{context:t}));});let o=Object.getOwnPropertyDescriptor(e,i),s;if(o===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(c){r.get(this).setValue(c),n.set(this,c);},configurable:true,enumerable:true};}else {let n=o.set;s={...o,set(c){r.get(this).setValue(c),n?.call(this,c);}};}return void Object.defineProperty(e,i,s)}}}function _o({context:t,subscribe:e}){return (i,r)=>{typeof r=="object"?r.addInitializer(function(){new Xe(this,{context:t,callback:o=>{i.set.call(this,o);},subscribe:e});}):i.constructor.addInitializer(o=>{new Xe(o,{context:t,callback:s=>{o[r]=s;},subscribe:e});});}}var gr="autoform";var zs=_`
    :host{
        display: flex;
        position: relative;  
        box-sizing: border-box;
        display: block;
        & > .autofield{
            display: flex;
            position: relative;
            flex-direction:column;      
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

`;var mt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Vt=t=>(...e)=>({_$litDirective$:t,values:e}),Ct=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,r){this._$Ct=e,this._$AM=i,this._$Ci=r;}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};var{I:Cl}=xs;var Bs=(t,e)=>t?._$litType$!==void 0;var br=t=>t.strings===void 0,Hs=()=>document.createComment(""),Ze=(t,e,i)=>{let r=t._$AA.parentNode,o=e===void 0?t._$AB:e._$AA;if(i===void 0){let s=r.insertBefore(Hs(),o),n=r.insertBefore(Hs(),o);i=new Cl(s,n,t,t.options);}else {let s=i._$AB.nextSibling,n=i._$AM,c=n!==t;if(c){let l;i._$AQ?.(t),i._$AM=t,i._$AP!==void 0&&(l=t._$AU)!==n._$AU&&i._$AP(l);}if(s!==o||c){let l=i._$AA;for(;l!==s;){let u=l.nextSibling;r.insertBefore(l,o),l=u;}}}return i},ve=(t,e,i=t)=>(t._$AI(e,i),t),Sl={},vr=(t,e=Sl)=>t._$AH=e,Fs=t=>t._$AH,yr=t=>{t._$AP?.(false,true);let e=t._$AA,i=t._$AB.nextSibling;for(;e!==i;){let r=e.nextSibling;e.remove(),e=r;}};var Ws=(t,e,i)=>{let r=new Map;for(let o=e;o<=i;o++)r.set(t[o],o);return r},yt=Vt(class extends Ct{constructor(t){if(super(t),t.type!==mt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let r;i===void 0?i=e:e!==void 0&&(r=e);let o=[],s=[],n=0;for(let c of t)o[n]=r?r(c,n):n,s[n]=i(c,n),n++;return {values:s,keys:o}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,r]){let o=Fs(t),{values:s,keys:n}=this.dt(e,i,r);if(!Array.isArray(o))return this.ut=n,s;let c=this.ut??=[],l=[],u,f,p=0,m=o.length-1,g=0,b=s.length-1;for(;p<=m&&g<=b;)if(o[p]===null)p++;else if(o[m]===null)m--;else if(c[p]===n[g])l[g]=ve(o[p],s[g]),p++,g++;else if(c[m]===n[b])l[b]=ve(o[m],s[b]),m--,b--;else if(c[p]===n[b])l[b]=ve(o[p],s[b]),Ze(t,l[b+1],o[p]),p++,b--;else if(c[m]===n[g])l[g]=ve(o[m],s[g]),Ze(t,o[p],o[m]),m--,g++;else if(u===void 0&&(u=Ws(n,g,b),f=Ws(c,p,m)),u.has(c[p]))if(u.has(c[m])){let v=f.get(n[g]),E=v!==void 0?o[v]:null;if(E===null){let k=Ze(t,o[p]);ve(k,s[g]),l[g]=k;}else l[g]=ve(E,s[g]),Ze(t,o[p],E),o[v]=null;g++;}else yr(o[m]),m--;else yr(o[p]),p++;for(;g<=b;){let v=Ze(t,l[b+1]);ve(v,s[g]),l[g++]=v;}for(;p<=m;){let v=o[p++];v!==null&&yr(v);}return this.ut=n,vr(t,l),st}});var Je=class{constructor(e){this.host=e,e.addController(this);}hostConnected(){let e=this.host;e.hasAttribute("dark")&&(e.classList.add("sl-theme-dark"),e.style.color="var(--sl-color-neutral-900,white)",e.shadowRoot.ownerDocument.style=e.style.color);}_toDark(){let e=this.host;e.classList.add("sl-theme-dark"),e.style.color="var(--sl-color-neutral-900,white)";}_toLight(){let e=this.host;e.classList.remove("sl-theme-dark"),e.style.color="var(--sl-color-neutral-1000)";}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext(),this.host.dark?this._toDark():this._toLight();}};var Ns="important",kl=" !"+Ns,J=Vt(class extends Ct{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{let r=t[i];return r==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){let{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?i.removeProperty(r):i[r]=null);for(let r in e){let o=e[r];if(o!=null){this.ft.add(r);let s=typeof o=="string"&&o.endsWith(kl);r.includes("-")||s?i.setProperty(r,s?o.slice(0,-11):o,s?Ns:""):i[r]=o;}}return st}});function Z(t,e,i){return t?e(t):i?.(t)}var ye=class{constructor(e,...i){this.initialClasses=[];this.host=e,e.addController(this),this.initialClasses=i;}_forEachClasss(e,i){e&&e.forEach(r=>{typeof r=="string"?(i(r,true),this.host.classList.add(r)):Object.entries(r).forEach(([o,s])=>{i(o,s);});});}add(...e){this.host&&e&&this._forEachClasss(e,i=>{this.host.classList.add(i);});}remove(...e){this.host&&e&&this._forEachClasss(e,i=>{this.host.classList.remove(i);});}toggle(...e){this.host&&this._forEachClasss(e,i=>{this.host.classList.toggle(i);});}use(...e){this.host&&this._forEachClasss(e,(i,r)=>{r?this.host.classList.add(i):this.host.classList.remove(i);});}has(e){return this.host.classList.contains(e)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var ki=class extends Ct{constructor(e){if(super(e),this.it=X,e.type!==mt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===X||e==null)return this._t=void 0,this.it=e;if(e===st)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let i=[e];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};ki.directiveName="unsafeHTML",ki.resultType=1;var Mt=Vt(ki);function js(t,e){e&&Object.entries(e).forEach(([i,r])=>{(i==="root"?[t]:Array.from(t.querySelectorAll(i))).forEach(s=>{typeof r=="string"?s.style.cssText=r:typeof r=="object"&&Object.assign(s.style,r);});});}function ti(t,e,i){i?t.classList.add(e):t.classList.remove(e);}function Us(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var R=class extends wt{constructor(){super(...arguments);this.theme=new Je(this);this.classs=new ye(this);this.options=Us();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];}static{this.styles=zs;}get shadow(){return this.shadowRoot}getFieldOptions(){return Object.entries(this.schema||{}).reduce((i,[r,o])=>(ge(o)?i[r]=o.value:i[r]=o,i),Object.assign({},Us(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(i=true){return d`${this.renderBeforeActions(i)}
                ${this.renderAfterActions(i)}`}_onClickAction(i,r){return o=>{typeof r=="function"&&r(o),i.onClick&&typeof i.onClick=="function"&&i.onClick?.call(this,this.getInputValue(),{action:i,options:this.options,event:o,update:s=>{mr(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(i){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return d`<div class="actions before" part="before-actions" slot="${C(i?"prefix":void 0)}">
            ${yt(this.beforeActions,r=>this.renderActionWidget(r))}</div>`}renderAfterActions(i){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return d`<div class="actions after" part="after-actions"  slot="${C(i?"suffix":void 0)}">
            ${yt(this.afterActions,r=>this.renderActionWidget(r))}</div>`}_renderDropdownAction(i){return d`
        <sl-dropdown class='action-widget'  hoist
            title=${C(i.tips)}
            placement=${i.pos==="before"?"bottom-start":"bottom-end"}
        >
            <sl-button slot="trigger" ?caret=${i.caret}>
                ${Z(i.icon,()=>d`<sl-icon name=${C(i.icon)}></sl-icon>`)}
                ${i.label}
            </sl-button>
            <sl-menu>   
                ${yt(i.items||[],r=>r==="-"?d`<sl-divider></sl-divider>`:(typeof r=="string"&&(r={label:r}),d`<sl-menu-item  @click=${this._onClickAction.call(this,r,()=>{i.syncMenu&&(i.label=r.label,i.icon=r.icon,i.tips=r.tips,this.requestUpdate());})}>
                    ${Z(r.icon,()=>d`<sl-icon name=${C(r.icon)} slot="prefix"></sl-icon>`)}
                ${r.label}</sl-menu-item>`))}
            </sl-menu>
        </sl-dropdown>
        `}_renderButtonAction(i){return d`
        <sl-button class='action-widget' 
            title=${C(i.tips)}
            variant=${C(i.variant)}
            size=${i.size||this.context.size} 
            @click=${this._onClickAction.call(this,i)}>
            ${Z(i.icon,()=>d`<sl-icon name=${C(i.icon)}></sl-icon>`)}
            ${i.label}
        </sl-button>
    `}_renderImageAction(i){return d`
        <sl-button title="${C(i.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this,i)}>                
            <img src="${C(i.url)}"/>
        </sl-button>
    `}renderActionWidget(i){if(typeof i!="object")return;let r=i.type||"button";if(r==="dropdown")return this._renderDropdownAction(i);if(r==="button")return this._renderButtonAction(i);if(r==="image")return this._renderImageAction(i)}renderOption(i,r){let o=this.schema[i];if(o)return o.loading?d`<sl-spinner></sl-spinner>`:d`${r?r(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(i){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,i):i}toState(i){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,i):i}toInput(i){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,i):i}getOptionValue(i,r){if(this.schema&&i in this.schema){let o=this.schema[i];return o===void 0?r:ge(o)?o.value:o}else return r}getOption(i){if(this.schema&&i in this.schema){let r=this.schema[i];return ge(r)?r:Ps(r)}}getInputValue(){if(!this.input)return "";let i=this.input.value;if(typeof this.options.toState!="function"){let r=this.options.datatype||"string";r==="number"?i=Number(i):r==="boolean"&&(i=!!i);}return i}_renderRequiredOption(){return this.renderOption("required",i=>i?d`<span style='color:red;'>*</span>`:"")}renderHelp(i=false){let r=this.options.help;if(!r)return;let o=r.match(/\(([^)]+)\)[^)]*$/),s=o?o[1]:null,n=s?r.replace(`(${s})`,""):r;return d`<span class="help" part="field-help" title="${C(i?n:void 0)}">
            ${Ms(!!s,d`
                <sl-icon name="help"></sl-icon>
                ${Z(!i,()=>d`${n}`)}
            `,c=>d`<a target="_blank" href="${s}">${c}</a>`)} 
        </span>`}renderLabel(){let i=this.context,r=this.options.labelPos||i.labelPos;if(r==="none")return d``;{let o={};return (i.labelWidth&&r==="left"||i.viewonly)&&(o.width=i.labelWidth),d`<div class="label" part="field-label" style="${C(J(o))}">
            <span class="title">
                ${this.getLabel()}
                ${Z(r==="left"||i.viewonly,()=>this.renderHelp(true))}
                ${this._renderRequiredOption()}
            </span>     
            ${Z(r==="top"&&!i.viewonly,()=>this.renderHelp())}
        </div>`}}renderInput(){return d``}isShowError(){return this.context.validAtInit?!!this.invalidMessage:this.dirty?!!this.invalidMessage:false}renderError(){return this.isShowError()?d`<div class="error">
            ${this.invalidMessage}
        </div>`:d``}onFieldChange(){this._updateFieldValue();}onFieldInput(){this._updateFieldValue();}_handleSchemaChange(){let i=this.context;if(i?.store&&this.schema){let r=this.getPath().join("_$_");this._subscribers.push(i.store.schemas.store.watch(`${r}.**`,o=>{let{reply:s,type:n,value:c,flags:l}=o;if(s||i.form.seq===l)return;(n==="batch"?c:[o]).forEach(f=>{let p=f.path.slice(1);mr(this.schema,p,f.value),this.options[p[0]]=f.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let i=this.value;if(this.options.toView&&this.options.toView)try{i=this.options.toView.call(this,this.value);}catch(r){console.error(`Error while toView<${this.path}>: ${r.message}`);}return d`${Mt(String(i))}`}_handleStateChange(){let i=this.context;i?.store&&this.schema&&this._subscribers.push(i.store.watch(this.getPath().join("."),r=>{this.value=this.toInput(r.value);},{operates:"write"}));}getStateValue(){return this.toInput(Ls(this.context.store.state,this.getPath()))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let i=this.context;i?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.getPath().join("."),this.name=this.options.name||this.path,this.path in i.store.schemas.errors&&(this.invalidMessage=i.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(r=>r.pos==="before"),this.afterActions=this.options.actions.filter(r=>r.pos!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(i=>i.off());}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFormClasss(){this.context.form&&(ti(this.context.form,"dirty",this.dirty),ti(this.context.form,"invalid",!!this.invalidMessage));}_updateFieldValue(){if(!this.schema)return;let i=this.getPath(),r=this.toState(this.getInputValue()),o=this.context;o.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let c=Ds(r,this.schema);mr(n,i,c),this.invalidMessage=void 0;},{flags:o.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:r,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidMessage=s.message;}finally{this._updateFormClasss();}}renderValue(){return d`
            ${this.renderInput()}
            ${Z(this.context.viewonly,()=>this.renderHelp())}         
            ${this.renderError()} 
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(){this.options.styles&&js(this.shadow,this.options.styles);}render(){let i=this.context,r=this.options.labelPos?this.options.labelPos:i.labelPos;return this.classs.use(i.size,{[`${i.border}-border`]:true,error:this.isShowError(),"left-label":r==="left"||i.viewonly,"top-label":r==="top"&&!i.viewonly,disable:this.options.enable===false,readonly:i.readonly,viewonly:i.viewonly,compact:this.compact===void 0?i.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${i.viewAlign}`]:true,[`${i.layout}-layout`]:true}),d`           
            <div class="autofield">
                ${this.options.divider?d`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${Z(i.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>                            
            </div>
        `}};x([h({type:Object})],R.prototype,"schema",2),x([O()],R.prototype,"value",2),x([O()],R.prototype,"invalidMessage",2),x([O()],R.prototype,"labelPos",2),x([O()],R.prototype,"dirty",2),x([h({type:Boolean,reflect:true})],R.prototype,"noreactive",2),x([h({type:Boolean,reflect:true})],R.prototype,"compact",2),x([Vs({slot:"value",flatten:true})],R.prototype,"_field",2),x([A(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],R.prototype,"input",2),x([_o({context:gr}),h({attribute:false})],R.prototype,"context",2);exports.AutoFieldInput=class Y extends R{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return d`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let i=o=>o.map(s=>typeof s=="string"?s:s.value||s.label),r=(o,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let c=i(s),l=-1;c.some((p,m)=>{if(n&&this.value.startsWith(p)||!n&&this.value.endsWith(p))return n?(this._prefix=p,this.value=this.value.substring(p.length)):(this._suffix=p,this.value=this.value.substring(0,this.value.length-p.length)),l=m,true});let u=l===-1?"?":typeof s[l]=="string"?s[l]:s[l].label,f={type:s.length===1?"button":"dropdown",label:u,caret:!n};f.type==="dropdown"?f.items=s.map(p=>(p==="-"||(p=typeof p=="string"?{label:p}:p,p.onClick=()=>{n?this._prefix=p.value??p.label:this._suffix=p.value??p.label,this.onFieldChange();}),p)):typeof s[0]=="string"?f.label=s[0]:Object.assign(f,s[0]),f.syncMenu=true,f.pos=n?"before":"after",n?o.splice(0,0,f):o.push(f);}};this.options.prefix&&r(this.beforeActions,this.options.prefix),this.options.suffix&&r(this.afterActions,this.options.suffix,false);}onInputChange(i){let r=i.type;this.context.validAt==="input"&&r.includes("input")?this.onFieldInput():r.includes("change")&&this.onFieldChange();}renderInput(){return d`
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
                max=${C(this.options.max)}
                min=${C(this.options.min)}
                ?disabled=${!this.options.enable}                
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                spellcheck=${C(this.options.spellcheck)}
            >
            ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input>
        `}toState(i){let r=super.toState(i);return typeof r=="string"&&(this._prefix&&(r=this._prefix+r),this._suffix&&(r=r+this._suffix)),r}toInput(i){let r=super.toInput(i);return typeof r=="string"&&(this._prefix&&r.startsWith(this._prefix)&&(r=r.substring(this._prefix.length)),this._suffix&&r.endsWith(this._suffix)&&(r=r.substring(0,r.length-this._suffix.length))),r}};exports.AutoFieldInput.styles=[R.styles,_`
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
    `],exports.AutoFieldInput=x([I("auto-field-input")],exports.AutoFieldInput);var qs=_`
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
`;var zt=(t="value")=>(e,i)=>{let r=e.constructor,o=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(s,n,c){var l;let u=r.getPropertyOptions(t),f=typeof u.attribute=="string"?u.attribute:t;if(s===f){let p=u.converter||me,g=(typeof p=="function"?p:(l=p?.fromAttribute)!=null?l:me.fromAttribute)(c,u.type);this[t]!==g&&(this[i]=g);}o.call(this,s,n,c);};};var St=_`
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
`;var Ys=Object.defineProperty,$l=Object.defineProperties,El=Object.getOwnPropertyDescriptor,Al=Object.getOwnPropertyDescriptors,Ks=Object.getOwnPropertySymbols,Ol=Object.prototype.hasOwnProperty,Tl=Object.prototype.propertyIsEnumerable,wo=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Co=t=>{throw TypeError(t)},Gs=(t,e,i)=>e in t?Ys(t,e,{enumerable:true,configurable:true,writable:true,value:i}):t[e]=i,kt=(t,e)=>{for(var i in e||(e={}))Ol.call(e,i)&&Gs(t,i,e[i]);if(Ks)for(var i of Ks(e))Tl.call(e,i)&&Gs(t,i,e[i]);return t},ee=(t,e)=>$l(t,Al(e)),a=(t,e,i,r)=>{for(var o=r>1?void 0:r?El(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(o=(r?n(e,i,o):n(o))||o);return r&&o&&Ys(e,i,o),o},Xs=(t,e,i)=>e.has(t)||Co("Cannot "+i),Qs=(t,e,i)=>(Xs(t,e,"read from private field"),e.get(t)),Zs=(t,e,i)=>e.has(t)?Co("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Js=(t,e,i,r)=>(Xs(t,e,"write to private field"),e.set(t,i),i),Rl=function(t,e){this[0]=t,this[1]=e;},tn=t=>{var e=t[wo("asyncIterator")],i=false,r,o={};return e==null?(e=t[wo("iterator")](),r=s=>o[s]=n=>e[s](n)):(e=e.call(t),r=s=>o[s]=n=>{if(i){if(i=false,s==="throw")throw n;return n}return i=true,{done:false,value:new Rl(new Promise(c=>{var l=e[s](n);l instanceof Object||Co("Object expected"),c(l);}),1)}}),o[wo("iterator")]=()=>o,r("next"),"throw"in e?r("throw"):o.throw=s=>{throw s},"return"in e&&r("return"),o};var $i=new WeakMap,Ei=new WeakMap,Ai=new WeakMap,So=new WeakSet,xr=new WeakMap,ht=class{constructor(t,e){this.handleFormData=i=>{let r=this.options.disabled(this.host),o=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!n&&typeof o=="string"&&o.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(c=>{i.formData.append(o,c.toString());}):i.formData.append(o,s.toString()));},this.handleFormSubmit=i=>{var r;let o=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=$i.get(this.form))==null||r.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!o&&!s(this.host)&&(i.preventDefault(),i.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),xr.set(this.host,[]);},this.handleInteraction=i=>{let r=xr.get(this.host);r.includes(i.type)||r.push(i.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let i=this.form.querySelectorAll("*");for(let r of i)if(typeof r.checkValidity=="function"&&!r.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let i=this.form.querySelectorAll("*");for(let r of i)if(typeof r.reportValidity=="function"&&!r.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=kt({form:i=>{let r=i.form;if(r){let s=i.getRootNode().querySelector(`#${r}`);if(s)return s}return i.closest("form")},name:i=>i.name,value:i=>i.value,defaultValue:i=>i.defaultValue,disabled:i=>{var r;return (r=i.disabled)!=null?r:false},reportValidity:i=>typeof i.reportValidity=="function"?i.reportValidity():true,checkValidity:i=>typeof i.checkValidity=="function"?i.checkValidity():true,setValue:(i,r)=>i.value=r,assumeInteractionOn:["sl-input"]},e);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),xr.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction);});}hostDisconnected(){this.detachForm(),xr.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,$i.has(this.form)?$i.get(this.form).add(this.host):$i.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Ei.has(this.form)||(Ei.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Ai.has(this.form)||(Ai.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=$i.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Ei.has(this.form)&&(this.form.reportValidity=Ei.get(this.form),Ei.delete(this.form)),Ai.has(this.form)&&(this.form.checkValidity=Ai.get(this.form),Ai.delete(this.form)),this.form=void 0));}setUserInteracted(t,e){e?So.add(t):So.delete(t),t.requestUpdate();}doAction(t,e){if(this.form){let i=document.createElement("button");i.type=t,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",e&&(i.name=e.name,i.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&i.setAttribute(r,e.getAttribute(r));})),this.form.append(i),i.click(),i.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let e=this.host,i=!!So.has(e),r=!!e.required;e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&i),e.toggleAttribute("data-user-valid",t&&i);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let e=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault();}},ei=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),en=Object.freeze(ee(kt({},ei),{valid:false,valueMissing:true})),rn=Object.freeze(ee(kt({},ei),{valid:false,customError:true}));var nt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=i=>{let r=i.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=e;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!e.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function on(t){if(!t)return "";let e=t.assignedNodes({flatten:true}),i="";return [...e].forEach(r=>{r.nodeType===Node.TEXT_NODE&&(i+=r.textContent);}),i}var ko="";function sn(t){ko=t;}function nn(t=""){if(!ko){let e=[...document.getElementsByTagName("script")],i=e.find(r=>r.hasAttribute("data-shoelace"));if(i)sn(i.getAttribute("data-shoelace"));else {let r=e.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),o="";r&&(o=r.getAttribute("src")),sn(o.split("/").slice(0,-1).join("/"));}}return ko.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var Il={name:"default",resolver:t=>nn(`assets/icons/${t}.svg`)},an=Il;var ln={caret:`
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
  `},Vl={name:"system",resolver:t=>t in ln?`data:image/svg+xml,${encodeURIComponent(ln[t])}`:""},cn=Vl;var _r=[an,cn],wr=[];function $o(t){wr.push(t);}function Eo(t){wr=wr.filter(e=>e!==t);}function Cr(t){return _r.find(e=>e.name===t)}function Ao(t,e){pn(t),_r.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),wr.forEach(i=>{i.library===t&&i.setIcon();});}function pn(t){_r=_r.filter(e=>e.name!==t);}var hn=_`
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
`;function T(t,e){let i=kt({waitUntilFirstUpdate:false},e);return (r,o)=>{let{update:s}=r,n=Array.isArray(t)?t:[t];r.update=function(c){n.forEach(l=>{let u=l;if(c.has(u)){let f=c.get(u),p=this[u];f!==p&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[o](f,p);}}),s.call(this,c);};}}var D=_`
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
`;var Sr,V=class extends wt{constructor(){super(),Zs(this,Sr,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e);});}emit(t,e){let i=new CustomEvent(t,kt({bubbles:true,cancelable:false,composed:true,detail:{}},e));return this.dispatchEvent(i),i}static define(t,e=this,i={}){let r=customElements.get(t);if(!r){try{customElements.define(t,e,i);}catch{customElements.define(t,class extends e{},i);}return}let o=" (unknown version)",s=o;"version"in e&&e.version&&(o=" v"+e.version),"version"in r&&r.version&&(s=" v"+r.version),!(o&&s&&o===s)&&console.warn(`Attempted to register <${t}>${o}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,e,i){Qs(this,Sr)||(this.constructor.elementProperties.forEach((r,o)=>{r.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o]);}),Js(this,Sr,true)),super.attributeChangedCallback(t,e,i);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&this[i]==null&&(this[i]=e);});}};Sr=new WeakMap;V.version="2.20.1";V.dependencies={};a([h()],V.prototype,"dir",2);a([h()],V.prototype,"lang",2);var Oi=Symbol(),kr=Symbol(),Oo,To=new Map,U=class extends V{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,e){var i;let r;if(e?.spriteSheet)return this.svg=d`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Oi:kr}catch{return kr}try{let o=document.createElement("div");o.innerHTML=await r.text();let s=o.firstElementChild;if(((i=s?.tagName)==null?void 0:i.toLowerCase())!=="svg")return Oi;Oo||(Oo=new DOMParser);let c=Oo.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return c?(c.part.add("svg"),document.adoptNode(c)):Oi}catch{return Oi}}connectedCallback(){super.connectedCallback(),$o(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),Eo(this);}getIconSource(){let t=Cr(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:e,fromLibrary:i}=this.getIconSource(),r=i?Cr(this.library):void 0;if(!e){this.svg=null;return}let o=To.get(e);if(o||(o=this.resolveIcon(e,r),To.set(e,o)),!this.initialRender)return;let s=await o;if(s===kr&&To.delete(e),e===this.getIconSource().url){if(Bs(s)){if(this.svg=s,r){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof r.mutator=="function"&&n&&r.mutator(n);}return}switch(s){case kr:case Oi:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=r?.mutator)==null||t.call(r,this.svg),this.emit("sl-load");}}}render(){return this.svg}};U.styles=[D,hn];a([O()],U.prototype,"svg",2);a([h({reflect:true})],U.prototype,"name",2);a([h()],U.prototype,"src",2);a([h()],U.prototype,"label",2);a([h({reflect:true})],U.prototype,"library",2);a([T("label")],U.prototype,"handleLabelChange",1);a([T(["name","src","library"])],U.prototype,"setIcon",1);var L=Vt(class extends Ct{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let i=t.element.classList;for(let r of this.st)r in e||(i.remove(r),this.st.delete(r));for(let r in e){let o=!!e[r];o===this.st.has(r)||this.nt?.has(r)||(o?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)));}return st}});var Pt=Vt(class extends Ct{constructor(t){if(super(t),t.type!==mt.PROPERTY&&t.type!==mt.ATTRIBUTE&&t.type!==mt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!br(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===st||e===X)return e;let i=t.element,r=t.name;if(t.type===mt.PROPERTY){if(e===i[r])return st}else if(t.type===mt.BOOLEAN_ATTRIBUTE){if(!!e===i.hasAttribute(r))return st}else if(t.type===mt.ATTRIBUTE&&i.getAttribute(r)===e+"")return st;return vr(t),e}});var rt=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?true:!!t;return d`
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
            .indeterminate=${Pt(this.indeterminate)}
            .checked=${Pt(this.checked)}
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
    `}};rt.styles=[D,St,qs];rt.dependencies={"sl-icon":U};a([A('input[type="checkbox"]')],rt.prototype,"input",2);a([O()],rt.prototype,"hasFocus",2);a([h()],rt.prototype,"title",2);a([h()],rt.prototype,"name",2);a([h()],rt.prototype,"value",2);a([h({reflect:true})],rt.prototype,"size",2);a([h({type:Boolean,reflect:true})],rt.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],rt.prototype,"checked",2);a([h({type:Boolean,reflect:true})],rt.prototype,"indeterminate",2);a([zt("checked")],rt.prototype,"defaultChecked",2);a([h({reflect:true})],rt.prototype,"form",2);a([h({type:Boolean,reflect:true})],rt.prototype,"required",2);a([h({attribute:"help-text"})],rt.prototype,"helpText",2);a([T("disabled",{waitUntilFirstUpdate:true})],rt.prototype,"handleDisabledChange",1);a([T(["checked","indeterminate"],{waitUntilFirstUpdate:true})],rt.prototype,"handleStateChange",1);rt.define("sl-checkbox");exports.AutoFieldCheckbox=class Ti extends R{renderInput(){return d`        
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
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let e=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof e=="boolean"?"":e}}renderView(){return d`        
        <sl-checkbox 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-checkbox> 
        `}};exports.AutoFieldCheckbox.styles=[R.styles,_`
            sl-checkbox.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=x([I("auto-field-checkbox")],exports.AutoFieldCheckbox);var un=_`
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
`;var jt=class extends V{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return d`
      <span
        part="base"
        class=${L({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?d` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};jt.styles=[D,un];jt.dependencies={"sl-icon":U};a([O()],jt.prototype,"checked",2);a([O()],jt.prototype,"hasFocus",2);a([h()],jt.prototype,"value",2);a([h({reflect:true})],jt.prototype,"size",2);a([h({type:Boolean,reflect:true})],jt.prototype,"disabled",2);a([T("checked")],jt.prototype,"handleCheckedChange",1);a([T("disabled",{waitUntilFirstUpdate:true})],jt.prototype,"handleDisabledChange",1);jt.define("sl-radio");var dn=_`
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
`;var mn=_`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var xe=class extends V{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let e=Ri(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let e=Ri(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let e=Ri(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let e=Ri(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(e=>{let i=t.indexOf(e),r=Ri(e);r&&(r.toggleAttribute("data-sl-button-group__button",true),r.toggleAttribute("data-sl-button-group__button--first",i===0),r.toggleAttribute("data-sl-button-group__button--inner",i>0&&i<t.length-1),r.toggleAttribute("data-sl-button-group__button--last",i===t.length-1),r.toggleAttribute("data-sl-button-group__button--radio",r.tagName.toLowerCase()==="sl-radio-button"));});}render(){return d`
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
    `}};xe.styles=[D,mn];a([A("slot")],xe.prototype,"defaultSlot",2);a([O()],xe.prototype,"disableRole",2);a([h()],xe.prototype,"label",2);function Ri(t){var e;let i="sl-button, sl-radio-button";return (e=t.closest(i))!=null?e:t.querySelector(i)}var ut=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this),this.hasSlotController=new nt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?rn:t?en:ei}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let e=t.target.closest("sl-radio, sl-radio-button"),i=this.getAllRadios(),r=this.value;!e||e.disabled||(this.value=e.value,i.forEach(o=>o.checked=o===e),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let i=this.getAllRadios().filter(c=>!c.disabled),r=(e=i.find(c=>c.checked))!=null?e:i[0],o=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=i.indexOf(r)+o;n<0&&(n=i.length-1),n>i.length-1&&(n=0),this.getAllRadios().forEach(c=>{c.checked=false,this.hasButtonGroup||c.setAttribute("tabindex","-1");}),this.value=i[n].value,i[n].checked=true,this.hasButtonGroup?i[n].shadowRoot.querySelector("button").focus():(i[n].setAttribute("tabindex","0"),i[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,e;let i=this.getAllRadios();if(await Promise.all(i.map(async r=>{await r.updateComplete,r.checked=r.value===this.value,r.size=this.size;})),this.hasButtonGroup=i.some(r=>r.tagName.toLowerCase()==="sl-radio-button"),i.length>0&&!i.some(r=>r.checked))if(this.hasButtonGroup){let r=(t=i[0].shadowRoot)==null?void 0:t.querySelector("button");r&&r.setAttribute("tabindex","0");}else i[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let r=(e=this.shadowRoot)==null?void 0:e.querySelector("sl-button-group");r&&(r.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,e=this.customValidityMessage!=="";return t||e?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let e=this.getAllRadios(),i=e.find(s=>s.checked),r=e.find(s=>!s.disabled),o=i||r;o&&o.focus(t);}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,r=this.helpText?true:!!e,o=d`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return d`
      <fieldset
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":i,"form-control--has-help-text":r})}
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

          ${this.hasButtonGroup?d`
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
    `}};ut.styles=[D,St,dn];ut.dependencies={"sl-button-group":xe};a([A("slot:not([name])")],ut.prototype,"defaultSlot",2);a([A(".radio-group__validation-input")],ut.prototype,"validationInput",2);a([O()],ut.prototype,"hasButtonGroup",2);a([O()],ut.prototype,"errorMessage",2);a([O()],ut.prototype,"defaultValue",2);a([h()],ut.prototype,"label",2);a([h({attribute:"help-text"})],ut.prototype,"helpText",2);a([h()],ut.prototype,"name",2);a([h({reflect:true})],ut.prototype,"value",2);a([h({reflect:true})],ut.prototype,"size",2);a([h({reflect:true})],ut.prototype,"form",2);a([h({type:Boolean,reflect:true})],ut.prototype,"required",2);a([T("size",{waitUntilFirstUpdate:true})],ut.prototype,"handleSizeChange",1);a([T("value")],ut.prototype,"handleValueChange",1);ut.define("sl-radio-group");exports.AutoFieldRadio=class Ii extends R{getInitialOptions(){return {card:false,select:[]}}renderOptionItemWithCard(e,i){if(this.options.card){let r=i.value||i.label,o=this.value===r;return d`<div class="card"
                style=${J({width:this.options.itemWidth})}
                >
                    <div class="body ${o?"selected":""}">
                        <sl-icon  class="icon" name="settings"></sl-icon>
                        ${e}                    
                    </div>
            </div>`}else return e}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(e){let i=e.value||e.label;return d`<sl-radio 
            value="${i}"
            style=${J({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
        >${e.label}<br/><span class="memo">${e.memo}</span></sl-radio>`}renderInput(){let e=this.options.select.map(i=>{let r={};return typeof i=="object"?Object.assign(r,i):Object.assign(r,{label:i}),r});return d`              
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
    `],exports.AutoFieldRadio=x([I("auto-field-radio")],exports.AutoFieldRadio);var fn=_`
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
`;var j=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i);}setRangeText(t,e,i,r="preserve"){let o=e??this.input.selectionStart,s=i??this.input.selectionEnd;this.input.setRangeText(t,o,s,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,r=this.helpText?true:!!e;return d`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":r})}
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
              .value=${Pt(this.value)}
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
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};j.styles=[D,St,fn];a([A(".textarea__control")],j.prototype,"input",2);a([A(".textarea__size-adjuster")],j.prototype,"sizeAdjuster",2);a([O()],j.prototype,"hasFocus",2);a([h()],j.prototype,"title",2);a([h()],j.prototype,"name",2);a([h()],j.prototype,"value",2);a([h({reflect:true})],j.prototype,"size",2);a([h({type:Boolean,reflect:true})],j.prototype,"filled",2);a([h()],j.prototype,"label",2);a([h({attribute:"help-text"})],j.prototype,"helpText",2);a([h()],j.prototype,"placeholder",2);a([h({type:Number})],j.prototype,"rows",2);a([h()],j.prototype,"resize",2);a([h({type:Boolean,reflect:true})],j.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],j.prototype,"readonly",2);a([h({reflect:true})],j.prototype,"form",2);a([h({type:Boolean,reflect:true})],j.prototype,"required",2);a([h({type:Number})],j.prototype,"minlength",2);a([h({type:Number})],j.prototype,"maxlength",2);a([h()],j.prototype,"autocapitalize",2);a([h()],j.prototype,"autocorrect",2);a([h()],j.prototype,"autocomplete",2);a([h({type:Boolean})],j.prototype,"autofocus",2);a([h()],j.prototype,"enterkeyhint",2);a([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],j.prototype,"spellcheck",2);a([h()],j.prototype,"inputmode",2);a([zt()],j.prototype,"defaultValue",2);a([T("disabled",{waitUntilFirstUpdate:true})],j.prototype,"handleDisabledChange",1);a([T("rows",{waitUntilFirstUpdate:true})],j.prototype,"handleRowsChange",1);a([T("value",{waitUntilFirstUpdate:true})],j.prototype,"handleValueChange",1);j.define("sl-textarea");exports.AutoFieldTextArea=class $r extends R{renderInput(){return d`              
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
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea=x([I("auto-field-textarea")],exports.AutoFieldTextArea);var gn=_`
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
`;var ft=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?true:!!t;return d`
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
            .checked=${Pt(this.checked)}
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
    `}};ft.styles=[D,St,gn];a([A('input[type="checkbox"]')],ft.prototype,"input",2);a([O()],ft.prototype,"hasFocus",2);a([h()],ft.prototype,"title",2);a([h()],ft.prototype,"name",2);a([h()],ft.prototype,"value",2);a([h({reflect:true})],ft.prototype,"size",2);a([h({type:Boolean,reflect:true})],ft.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],ft.prototype,"checked",2);a([zt("checked")],ft.prototype,"defaultChecked",2);a([h({reflect:true})],ft.prototype,"form",2);a([h({type:Boolean,reflect:true})],ft.prototype,"required",2);a([h({attribute:"help-text"})],ft.prototype,"helpText",2);a([T("checked",{waitUntilFirstUpdate:true})],ft.prototype,"handleCheckedChange",1);a([T("disabled",{waitUntilFirstUpdate:true})],ft.prototype,"handleDisabledChange",1);ft.define("sl-switch");exports.AutoFieldSwitch=class Vi extends R{renderInput(){return d`              
        <sl-switch 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value="${this.options.switchValues[0]}"   
            .checked =${this._isChecked()}                
            ?disabled=${!this.options.enable}
            size="${C(this.context.size)}"    
            placeholder="${C(this.options.placeholder)}"
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.getCheckLabel()}</sl-switch> 
        `}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let e=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof e=="boolean"?"":e}}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return d`        
        <sl-switch 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-switch> 
        `}};exports.AutoFieldSwitch.styles=[R.styles,_`
            sl-switch.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=x([I("auto-field-switch")],exports.AutoFieldSwitch);var Er=_`
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
`;var bn=_`
  ${Er}

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
`;var yn=Symbol.for(""),Pl=t=>{if(t?.r===yn)return t?._$litStatic$};var ii=(t,...e)=>({_$litStatic$:e.reduce((i,r,o)=>i+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[o+1],t[0]),r:yn}),vn=new Map,Ro=t=>(e,...i)=>{let r=i.length,o,s,n=[],c=[],l,u=0,f=false;for(;u<r;){for(l=e[u];u<r&&(s=i[u],(o=Pl(s))!==void 0);)l+=o+e[++u],f=true;u!==r&&c.push(s),n.push(l),u++;}if(u===r&&n.push(e[r]),f){let p=n.join("$$lit$$");(e=vn.get(p))===void 0&&(n.raw=n,vn.set(p,e=n)),i=c;}return t(e,...i)},_e=Ro(d);var Ht=class extends V{constructor(){super(...arguments),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return _e`
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
    `}};Ht.styles=[D,bn];a([A(".button")],Ht.prototype,"input",2);a([A(".hidden-input")],Ht.prototype,"hiddenInput",2);a([O()],Ht.prototype,"hasFocus",2);a([h({type:Boolean,reflect:true})],Ht.prototype,"checked",2);a([h()],Ht.prototype,"value",2);a([h({type:Boolean,reflect:true})],Ht.prototype,"disabled",2);a([h({reflect:true})],Ht.prototype,"size",2);a([h({type:Boolean,reflect:true})],Ht.prototype,"pill",2);a([T("disabled",{waitUntilFirstUpdate:true})],Ht.prototype,"handleDisabledChange",1);Ht.define("sl-radio-button");exports.AutoFieldRadioButton=class Pi extends R{renderInput(){let e=this.getOptionValue("select",[]).map((i,r)=>{let o={};return typeof i=="object"?Object.assign(o,i):Object.assign(o,{label:i,value:r+1}),o});return d`              
        <sl-radio-group 
            name=${this.name} 
            data-path=${this.path} 
            value="${this.value}"            
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
        ${e.map(i=>d`<sl-radio-button
            value="${i.value}"
            ?disabled =${!this.options.enable}
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
    `],exports.AutoFieldRadioButton=x([I("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class Ar extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=x([I("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class Or extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=x([I("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class Tr extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=x([I("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class Rr extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=x([I("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class Ir extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();let e=this.context.store.schemas.getValidator(this.path);(!e||typeof e.validate!="function")&&this.context.store.schemas.addValidator(this.path,{validate:i=>this._isEmail(i),message:"\u65E0\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740",onFail:"throw-pass"});}_isEmail(e){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}};exports.AutoFieldEmail=x([I("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class Vr extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=x([I("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class Pr extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=x([I("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class Lr extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=x([I("auto-field-phone")],exports.AutoFieldPhone);var Dr=class{constructor(e,i){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=e,this.options={...this.options,...i},e.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(e){let i=e.target;if(this.isPreviewActive){this.closePreview();return}i.matches(this.options.selector)&&(e.preventDefault(),e.stopPropagation(),this.originalImage=i,this.showPreview(this.originalImage));}showPreview(e){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let i=this.options.overlayColor,r=this.hexToRgb(i);this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=e.src,this.previewImage.alt=e.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let o=e.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${o.top}px`,this.previewImage.style.left=`${o.left}px`,this.previewImage.style.width=`${o.width}px`,this.previewImage.style.height=`${o.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",p=>{p.stopPropagation();}),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:c,height:l}=this.calculateAspectRatioFit(e.naturalWidth,e.naturalHeight,s*.9,n*.9),u=(n-l)/2,f=(s-c)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${u}px`,this.previewImage.style.left=`${f}px`,this.previewImage.style.width=`${c}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let e=window.innerWidth,i=window.innerHeight,{width:r,height:o}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,e*.9,i*.9),s=(i-o)/2,n=(e-r)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${r}px`,this.previewImage.style.height=`${o}px`);});}handleKeydown(e){e.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let e=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${e.top}px`,this.previewImage.style.left=`${e.left}px`,this.previewImage.style.width=`${e.width}px`,this.previewImage.style.height=`${e.height}px`;});let i=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${i.r}, ${i.g}, ${i.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(e,i,r,o){if(e<=r&&i<=o)return {width:e,height:i};let s=Math.min(r/e,o/i);return {width:e*s,height:i*s}}hexToRgb(e){e=e.replace(/^#/,""),e.length===3&&(e=e.split("").map(s=>s+s).join(""));let i=parseInt(e.substring(0,2),16),r=parseInt(e.substring(2,4),16),o=parseInt(e.substring(4,6),16);return {r:isNaN(i)?0:i,g:isNaN(r)?0:r,b:isNaN(o)?0:o}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var Ll=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],Dl=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function Ml(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return Ll.includes(`.${r}`)}function zl(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return Dl.includes(`.${r}`)}exports.AutoFieldUpload=class ri extends R{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new Dr(this);}retryUpload(i){this.startUpload(i.file,i.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto"}}_getDefaultFileLabel(i){return typeof i=="string"?i:i.title||i.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(i=>i!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(i){let r=i.target;if(!r.files||r.files.length===0)return;Array.from(r.files).forEach(s=>this.uploadFile(s)),r.value="";}handleDragOver(i){i.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(i){i.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(i){if(i.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!i.dataTransfer?.files)return;let o=Array.from(i.dataTransfer.files);if(!this.options?.multiple&&o.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=o.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(c=>c==="*"?true:c.startsWith(".")?n.name.toLowerCase().endsWith(c.toLowerCase()):n.type.startsWith(c)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}o.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(i){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let r={id:this.generateId(),file:i,progress:0,status:"uploading",value:{url:i.name}};return this.files.push(r),this.startUpload(i,r.id)}_updateFileRecord(i,r){let o=this.files.findIndex(s=>s.id===i);o!==-1&&(this.files=[...this.files.slice(0,o),{...this.files[o],...r},...this.files.slice(o+1)]);}_getResponseError(i){let r="\u4E0A\u4F20\u5931\u8D25";try{let o=JSON.parse(i.responseText);r=o.message||o.error||r;}catch{switch(i.status){case 400:r="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:r="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:r="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:r="\u6587\u4EF6\u592A\u5927";break;case 415:r="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:r="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:r="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:r=`\u4E0A\u4F20\u5931\u8D25 (${i.status})`;}}return new Error(r)}_defaultFileResolver(i){if(typeof i=="string")return i;if(typeof i=="object"){if(!i.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return i}}_parseUploadResponse(i){let r={};try{Object.assign(r,JSON.parse(i));}catch{r=i;}return typeof this.options.onResolve=="function"&&(r=this.options.onResolve(r)),r}async startUpload(i,r){let o=this.files.findIndex(n=>n.id===r);if(o===-1)return;let s=this.files[o];return new Promise((n,c)=>{let l=new XMLHttpRequest,u=new FormData;u.append(this.options.fileFieldName,i),l.upload.onprogress=f=>{if(f.lengthComputable){let p=Math.round(f.loaded/f.total*100);this._updateFileRecord(r,{progress:p});}},l.onload=()=>{if(this.files.findIndex(p=>p.id===r)!==-1)if(l.status>=200&&l.status<300){this._updateFileRecord(r,{status:"done"});try{let p=this._parseUploadResponse(l.responseText);this._updateFileRecord(r,{value:p}),s.status="done",this.onFieldChange(),n();}catch{let p=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(r,p),c(p);}}else {let p=this._getResponseError(l);this.handleUploadError(r,p),c(p);}},l.onerror=()=>{if(this.files.findIndex(m=>m.id===r)===-1)return;let p=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(r,p),c(p);},l.ontimeout=()=>{if(this.files.findIndex(m=>m.id===r)===-1)return;let p=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(r,p),c(p);},l.open("POST",this.options.url),this._updateFileRecord(r,{progress:0,status:"uploading"}),l.send(u);})}handleUploadError(i,r){this._updateFileRecord(i,{error:r.message,status:"error"});}deleteFile(i){let r=this.files.findIndex(c=>c.id===i);if(r===-1)return;let o=this.files[r],s=o.status==="uploading"||o.status==="error",n=()=>{this.files=[...this.files.slice(0,r),...this.files.slice(r+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,o.value)).then(()=>{n(),this.onFieldChange();}).catch(c=>{alert(c.message);}):(n(),this.onFieldChange());}getInputValue(){return this.options.multiple?this.files.map(i=>i.value):this.files.length>0?this.files[0].value:void 0}getStateValue(){let i=super.getStateValue();return Array.isArray(i)||(i=[i]),this.files=i.map((r,o)=>{let s={id:String(o),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof r=="string"?s.value=r:typeof r=="object"&&(s.value=Object.assign({},s.value,r)),s}),i}renderProgressbar(i,r){if(i.status!=="uploading")return;let o=r==="hori"?`width:${i.progress}%;`:`height:${i.progress}%;top:${100-i.progress}%`;return d`<span 
            class="uploading progressbar ${L({hori:r==="hori",vert:r==="vert"})}"
            style="${o}"
        >
            <span class="value">${i.progress}%</span>
        </span>
        `}renderFileContent(i){if(i.error)return;let r=typeof i.value=="string"?i.value:i.value.url,o;if(Ml(r))o=d`
                <img class="content" src="${r}"/>
            `;else if(zl(r))o=d`
                <video class="content" src="${r}"></video>
            `;else {let s=r.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,o=d`<div class="content">${s}</div>`;}return o}renderFilePreview(i){let r=!!i.error,o=typeof this.options.preview=="boolean"?"80px":this.options.preview;return d`
            <div class="file preview ${L({error:r})}"
                title=${i.error||this.options.onFileLabel(i.value)}
                style="${J({width:o,height:o})}"
            >   ${this.renderFileContent(i)}
                ${this.renderProgressbar(i,"vert")}
                ${Z(i.status==="error",()=>d`<div class="error" title="${i.error}">
                        <span>上传出错</span>
                        <span>
                            <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(i.id)}></sl-icon>    
                            <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(i)}></sl-icon>
                        </span>
                    </div>`,()=>{if(!this.context.viewonly)return d`<sl-icon name="remove" @click=${()=>this.deleteFile(i.id)}></sl-icon>`})}                               
            </div> 
        `}renderFile(i){let r=!!i.error;return d`
            <magic-flex class="file default ${L({error:r})}" wrap align="center" gap="0.5rem"
                title=${C(i.error)}
            > 
                ${this.renderProgressbar(i,"hori")}
                <span class="label">${this.options.onFileLabel(i.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(i.id)}></sl-icon>
                ${Z(i.status==="error",()=>d`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(i)}></sl-icon>`)}                               
            </magic-flex> 
        `}renderFiels(){return d`<magic-flex class="files" grow='none' gap="0.5rem" wrap>
            ${Z(this.files.length>0,()=>yt(this.files,i=>this.options.preview?this.renderFilePreview(i):this.renderFile(i)),()=>d`<span class='placeholder'>${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </magic-flex>`}renderInput(){return d`
            <magic-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${Z(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>d`<div class="indicator"
                            @click=${this.handleUploadClick}
                            @dragover=${this.handleDragOver}
                            @dragleave=${this.handleDragLeave}
                            @drop=${this.handleDrop}>
                            ${this.options.tips}
                        </div>`)}                
                <magic-flex class="actions" align="center" grow=".actions.after" gap="0.5rem" >
                    ${Z(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>d`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}                    
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
 
        `],x([O()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=x([I("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class Mr extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=x([I("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class Li extends R{getInitialOptions(){return {size:"medium"}}_onPartFocus(e){e.target.select();}_getIpBits(){let e=this.value?.split(".");return [parseInt(e[0]||"0"),parseInt(e[1]||"0"),parseInt(e[2]||"0"),parseInt(e[3]||"0")]}_onIpChange(e,i){this.onFieldChange(),this._isLastInput(i);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(i=>i.value).join(".")}_isLastInput(e){let i=e.target;if(i.value.length>=3){i.blur();let r=i.nextElementSibling?.nextElementSibling;r&&(r.focus(),r.select());}}_onPaste(e){e.preventDefault();let i=e.target,r=e.clipboardData?.getData("text/plain")||"",o=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=r.match(o);if(!s)return;let n=[],c=i;for(let l=0;l<4&&c;l++)c.tagName==="SL-INPUT"&&n.push(c),c=c.nextElementSibling?.nextElementSibling;for(let l=0;l<Math.min(4,n.length);l++)n[l].value=s[l+1],n[l].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let l=n[Math.min(3,n.length-1)];l.focus(),l.select();}}renderInput(){return d`
            <magic-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((e,i)=>d`
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
                        @sl-input=${r=>this._onIpChange(i,r)}
                        @sl-change=${r=>this._onIpChange(i,r)} 
                        @sl-focus=${this._onPartFocus.bind(this)}
                        @paste=${r=>this._onPaste(r)}
                    ></sl-input>
                    ${i<3?d`<span class="dot">.</span>`:""}                    
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
    `],exports.AutoFieldIpAddress=x([I("auto-field-ipaddress")],exports.AutoFieldIpAddress);var xn=_`
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
`;var _n=_`
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
`;var $t=class extends V{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,e=t?ii`a`:ii`button`;return _e`
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
    `}};$t.styles=[D,_n];$t.dependencies={"sl-icon":U};a([A(".icon-button")],$t.prototype,"button",2);a([O()],$t.prototype,"hasFocus",2);a([h()],$t.prototype,"name",2);a([h()],$t.prototype,"library",2);a([h()],$t.prototype,"src",2);a([h()],$t.prototype,"href",2);a([h()],$t.prototype,"target",2);a([h()],$t.prototype,"download",2);a([h()],$t.prototype,"label",2);a([h({type:Boolean,reflect:true})],$t.prototype,"disabled",2);var Io=new Set,oi=new Map,Ve,Vo="ltr",Po="en",wn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(wn){let t=new MutationObserver(Cn);Vo=document.documentElement.dir||"ltr",Po=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function Di(...t){t.map(e=>{let i=e.$code.toLowerCase();oi.has(i)?oi.set(i,Object.assign(Object.assign({},oi.get(i)),e)):oi.set(i,e),Ve||(Ve=e);}),Cn();}function Cn(){wn&&(Vo=document.documentElement.dir||"ltr",Po=document.documentElement.lang||navigator.language),[...Io.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var zr=class{constructor(e){this.host=e,this.host.addController(this);}hostConnected(){Io.add(this.host);}hostDisconnected(){Io.delete(this.host);}dir(){return `${this.host.dir||Vo}`.toLowerCase()}lang(){return `${this.host.lang||Po}`.toLowerCase()}getTranslationData(e){var i,r;let o=new Intl.Locale(e.replace(/_/g,"-")),s=o?.language.toLowerCase(),n=(r=(i=o?.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&r!==void 0?r:"",c=oi.get(`${s}-${n}`),l=oi.get(s);return {locale:o,language:s,region:n,primary:c,secondary:l}}exists(e,i){var r;let{primary:o,secondary:s}=this.getTranslationData((r=i.lang)!==null&&r!==void 0?r:this.lang());return i=Object.assign({includeFallback:false},i),!!(o&&o[e]||s&&s[e]||i.includeFallback&&Ve&&Ve[e])}term(e,...i){let{primary:r,secondary:o}=this.getTranslationData(this.lang()),s;if(r&&r[e])s=r[e];else if(o&&o[e])s=o[e];else if(Ve&&Ve[e])s=Ve[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...i):s}date(e,i){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),i).format(e)}number(e,i){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),i).format(e)}relativeTime(e,i,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,i)}};var Sn={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Di(Sn);var kn=Sn;var G=class extends zr{};Di(kn);var Xt=class extends V{constructor(){super(...arguments),this.localize=new G(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return d`
      <span
        part="base"
        class=${L({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?d`
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
    `}};Xt.styles=[D,xn];Xt.dependencies={"sl-icon-button":$t};a([h({reflect:true})],Xt.prototype,"variant",2);a([h({reflect:true})],Xt.prototype,"size",2);a([h({type:Boolean,reflect:true})],Xt.prototype,"pill",2);a([h({type:Boolean})],Xt.prototype,"removable",2);var $n=_`
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
`;function Hl(t,e){return {top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function En(t,e,i="vertical",r="smooth"){let o=Hl(t,e),s=o.top+e.scrollTop,n=o.left+e.scrollLeft,c=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,u=e.scrollTop,f=e.scrollTop+e.offsetHeight;(i==="horizontal"||i==="both")&&(n<c?e.scrollTo({left:n,behavior:r}):n+t.clientWidth>l&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:r})),(i==="vertical"||i==="both")&&(s<u?e.scrollTo({top:s,behavior:r}):s+t.clientHeight>f&&e.scrollTo({top:s-e.offsetHeight+t.clientHeight,behavior:r}));}var An=_`
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
`;var Qt=Math.min,_t=Math.max,zi=Math.round,Hi=Math.floor,Ut=t=>({x:t,y:t}),Bl={left:"right",right:"left",bottom:"top",top:"bottom"},Fl={start:"end",end:"start"};function Br(t,e,i){return _t(t,Qt(e,i))}function Pe(t,e){return typeof t=="function"?t(e):t}function ie(t){return t.split("-")[0]}function Le(t){return t.split("-")[1]}function Lo(t){return t==="x"?"y":"x"}function Fr(t){return t==="y"?"height":"width"}function re(t){return ["top","bottom"].includes(ie(t))?"y":"x"}function Wr(t){return Lo(re(t))}function On(t,e,i){i===void 0&&(i=false);let r=Le(t),o=Wr(t),s=Fr(o),n=o==="x"?r===(i?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(n=Mi(n)),[n,Mi(n)]}function Tn(t){let e=Mi(t);return [Hr(t),e,Hr(e)]}function Hr(t){return t.replace(/start|end/g,e=>Fl[e])}function Wl(t,e,i){let r=["left","right"],o=["right","left"],s=["top","bottom"],n=["bottom","top"];switch(t){case "top":case "bottom":return i?e?o:r:e?r:o;case "left":case "right":return e?s:n;default:return []}}function Rn(t,e,i,r){let o=Le(t),s=Wl(ie(t),i==="start",r);return o&&(s=s.map(n=>n+"-"+o),e&&(s=s.concat(s.map(Hr)))),s}function Mi(t){return t.replace(/left|right|bottom|top/g,e=>Bl[e])}function Nl(t){return {top:0,right:0,bottom:0,left:0,...t}}function Do(t){return typeof t!="number"?Nl(t):{top:t,right:t,bottom:t,left:t}}function De(t){let{x:e,y:i,width:r,height:o}=t;return {width:r,height:o,top:i,left:e,right:e+r,bottom:i+o,x:e,y:i}}function In(t,e,i){let{reference:r,floating:o}=t,s=re(e),n=Wr(e),c=Fr(n),l=ie(e),u=s==="y",f=r.x+r.width/2-o.width/2,p=r.y+r.height/2-o.height/2,m=r[c]/2-o[c]/2,g;switch(l){case "top":g={x:f,y:r.y-o.height};break;case "bottom":g={x:f,y:r.y+r.height};break;case "right":g={x:r.x+r.width,y:p};break;case "left":g={x:r.x-o.width,y:p};break;default:g={x:r.x,y:r.y};}switch(Le(e)){case "start":g[n]-=m*(i&&u?-1:1);break;case "end":g[n]+=m*(i&&u?-1:1);break}return g}var Vn=async(t,e,i)=>{let{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:n}=i,c=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e)),u=await n.getElementRects({reference:t,floating:e,strategy:o}),{x:f,y:p}=In(u,r,l),m=r,g={},b=0;for(let v=0;v<c.length;v++){let{name:E,fn:k}=c[v],{x:w,y:$,data:y,reset:S}=await k({x:f,y:p,initialPlacement:r,placement:m,strategy:o,middlewareData:g,rects:u,platform:n,elements:{reference:t,floating:e}});f=w??f,p=$??p,g={...g,[E]:{...g[E],...y}},S&&b<=50&&(b++,typeof S=="object"&&(S.placement&&(m=S.placement),S.rects&&(u=S.rects===true?await n.getElementRects({reference:t,floating:e,strategy:o}):S.rects),{x:f,y:p}=In(u,m,l)),v=-1);}return {x:f,y:p,placement:m,strategy:o,middlewareData:g}};async function Nr(t,e){var i;e===void 0&&(e={});let{x:r,y:o,platform:s,rects:n,elements:c,strategy:l}=t,{boundary:u="clippingAncestors",rootBoundary:f="viewport",elementContext:p="floating",altBoundary:m=false,padding:g=0}=Pe(e,t),b=Do(g),E=c[m?p==="floating"?"reference":"floating":p],k=De(await s.getClippingRect({element:(i=await(s.isElement==null?void 0:s.isElement(E)))==null||i?E:E.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:u,rootBoundary:f,strategy:l})),w=p==="floating"?{x:r,y:o,width:n.floating.width,height:n.floating.height}:n.reference,$=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),y=await(s.isElement==null?void 0:s.isElement($))?await(s.getScale==null?void 0:s.getScale($))||{x:1,y:1}:{x:1,y:1},S=De(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:w,offsetParent:$,strategy:l}):w);return {top:(k.top-S.top+b.top)/y.y,bottom:(S.bottom-k.bottom+b.bottom)/y.y,left:(k.left-S.left+b.left)/y.x,right:(S.right-k.right+b.right)/y.x}}var Pn=t=>({name:"arrow",options:t,async fn(e){let{x:i,y:r,placement:o,rects:s,platform:n,elements:c,middlewareData:l}=e,{element:u,padding:f=0}=Pe(t,e)||{};if(u==null)return {};let p=Do(f),m={x:i,y:r},g=Wr(o),b=Fr(g),v=await n.getDimensions(u),E=g==="y",k=E?"top":"left",w=E?"bottom":"right",$=E?"clientHeight":"clientWidth",y=s.reference[b]+s.reference[g]-m[g]-s.floating[b],S=m[g]-s.reference[g],M=await(n.getOffsetParent==null?void 0:n.getOffsetParent(u)),B=M?M[$]:0;(!B||!await(n.isElement==null?void 0:n.isElement(M)))&&(B=c.floating[$]||s.floating[b]);let N=y/2-S/2,z=B/2-v[b]/2-1,P=Qt(p[k],z),lt=Qt(p[w],z),ot=P,bt=B-v[b]-lt,xt=B/2-v[b]/2+N,vt=Br(ot,xt,bt),pe=!l.arrow&&Le(o)!=null&&xt!==vt&&s.reference[b]/2-(xt<ot?P:lt)-v[b]/2<0,Zt=pe?xt<ot?xt-ot:xt-bt:0;return {[g]:m[g]+Zt,data:{[g]:vt,centerOffset:xt-vt-Zt,...pe&&{alignmentOffset:Zt}},reset:pe}}});var Ln=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var i,r;let{placement:o,middlewareData:s,rects:n,initialPlacement:c,platform:l,elements:u}=e,{mainAxis:f=true,crossAxis:p=true,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=true,...E}=Pe(t,e);if((i=s.arrow)!=null&&i.alignmentOffset)return {};let k=ie(o),w=re(c),$=ie(c)===c,y=await(l.isRTL==null?void 0:l.isRTL(u.floating)),S=m||($||!v?[Mi(c)]:Tn(c)),M=b!=="none";!m&&M&&S.push(...Rn(c,v,b,y));let B=[c,...S],N=await Nr(e,E),z=[],P=((r=s.flip)==null?void 0:r.overflows)||[];if(f&&z.push(N[k]),p){let vt=On(o,n,y);z.push(N[vt[0]],N[vt[1]]);}if(P=[...P,{placement:o,overflows:z}],!z.every(vt=>vt<=0)){var lt,ot;let vt=(((lt=s.flip)==null?void 0:lt.index)||0)+1,pe=B[vt];if(pe){var bt;let he=p==="alignment"?w!==re(pe):false,Gt=((bt=P[0])==null?void 0:bt.overflows[0])>0;if(!he||Gt)return {data:{index:vt,overflows:P},reset:{placement:pe}}}let Zt=(ot=P.filter(he=>he.overflows[0]<=0).sort((he,Gt)=>he.overflows[1]-Gt.overflows[1])[0])==null?void 0:ot.placement;if(!Zt)switch(g){case "bestFit":{var xt;let he=(xt=P.filter(Gt=>{if(M){let ue=re(Gt.placement);return ue===w||ue==="y"}return  true}).map(Gt=>[Gt.placement,Gt.overflows.filter(ue=>ue>0).reduce((ue,Ja)=>ue+Ja,0)]).sort((Gt,ue)=>Gt[1]-ue[1])[0])==null?void 0:xt[0];he&&(Zt=he);break}case "initialPlacement":Zt=c;break}if(o!==Zt)return {reset:{placement:Zt}}}return {}}}};async function jl(t,e){let{placement:i,platform:r,elements:o}=t,s=await(r.isRTL==null?void 0:r.isRTL(o.floating)),n=ie(i),c=Le(i),l=re(i)==="y",u=["left","top"].includes(n)?-1:1,f=s&&l?-1:1,p=Pe(e,t),{mainAxis:m,crossAxis:g,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return c&&typeof b=="number"&&(g=c==="end"?b*-1:b),l?{x:g*f,y:m*u}:{x:m*u,y:g*f}}var Dn=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var i,r;let{x:o,y:s,placement:n,middlewareData:c}=e,l=await jl(e,t);return n===((i=c.offset)==null?void 0:i.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:o+l.x,y:s+l.y,data:{...l,placement:n}}}}},Mn=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:i,y:r,placement:o}=e,{mainAxis:s=true,crossAxis:n=false,limiter:c={fn:E=>{let{x:k,y:w}=E;return {x:k,y:w}}},...l}=Pe(t,e),u={x:i,y:r},f=await Nr(e,l),p=re(ie(o)),m=Lo(p),g=u[m],b=u[p];if(s){let E=m==="y"?"top":"left",k=m==="y"?"bottom":"right",w=g+f[E],$=g-f[k];g=Br(w,g,$);}if(n){let E=p==="y"?"top":"left",k=p==="y"?"bottom":"right",w=b+f[E],$=b-f[k];b=Br(w,b,$);}let v=c.fn({...e,[m]:g,[p]:b});return {...v,data:{x:v.x-i,y:v.y-r,enabled:{[m]:s,[p]:n}}}}}};var zn=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var i,r;let{placement:o,rects:s,platform:n,elements:c}=e,{apply:l=()=>{},...u}=Pe(t,e),f=await Nr(e,u),p=ie(o),m=Le(o),g=re(o)==="y",{width:b,height:v}=s.floating,E,k;p==="top"||p==="bottom"?(E=p,k=m===(await(n.isRTL==null?void 0:n.isRTL(c.floating))?"start":"end")?"left":"right"):(k=p,E=m==="end"?"top":"bottom");let w=v-f.top-f.bottom,$=b-f.left-f.right,y=Qt(v-f[E],w),S=Qt(b-f[k],$),M=!e.middlewareData.shift,B=y,N=S;if((i=e.middlewareData.shift)!=null&&i.enabled.x&&(N=$),(r=e.middlewareData.shift)!=null&&r.enabled.y&&(B=w),M&&!m){let P=_t(f.left,0),lt=_t(f.right,0),ot=_t(f.top,0),bt=_t(f.bottom,0);g?N=b-2*(P!==0||lt!==0?P+lt:_t(f.left,f.right)):B=v-2*(ot!==0||bt!==0?ot+bt:_t(f.top,f.bottom));}await l({...e,availableWidth:N,availableHeight:B});let z=await n.getDimensions(c.floating);return b!==z.width||v!==z.height?{reset:{rects:true}}:{}}}};function jr(){return typeof window<"u"}function Me(t){return Bn(t)?(t.nodeName||"").toLowerCase():"#document"}function Et(t){var e;return (t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function qt(t){var e;return (e=(Bn(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Bn(t){return jr()?t instanceof Node||t instanceof Et(t).Node:false}function Bt(t){return jr()?t instanceof Element||t instanceof Et(t).Element:false}function Kt(t){return jr()?t instanceof HTMLElement||t instanceof Et(t).HTMLElement:false}function Hn(t){return !jr()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof Et(t).ShadowRoot}function ni(t){let{overflow:e,overflowX:i,overflowY:r,display:o}=Ft(t);return /auto|scroll|overlay|hidden|clip/.test(e+r+i)&&!["inline","contents"].includes(o)}function Fn(t){return ["table","td","th"].includes(Me(t))}function Bi(t){return [":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return  false}})}function ai(t){let e=Ur(),i=Bt(t)?Ft(t):t;return ["transform","translate","scale","rotate","perspective"].some(r=>i[r]?i[r]!=="none":false)||(i.containerType?i.containerType!=="normal":false)||!e&&(i.backdropFilter?i.backdropFilter!=="none":false)||!e&&(i.filter?i.filter!=="none":false)||["transform","translate","scale","rotate","perspective","filter"].some(r=>(i.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(i.contain||"").includes(r))}function Wn(t){let e=oe(t);for(;Kt(e)&&!ze(e);){if(ai(e))return e;if(Bi(e))return null;e=oe(e);}return null}function Ur(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}function ze(t){return ["html","body","#document"].includes(Me(t))}function Ft(t){return Et(t).getComputedStyle(t)}function Fi(t){return Bt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function oe(t){if(Me(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Hn(t)&&t.host||qt(t);return Hn(e)?e.host:e}function Nn(t){let e=oe(t);return ze(e)?t.ownerDocument?t.ownerDocument.body:t.body:Kt(e)&&ni(e)?e:Nn(e)}function si(t,e,i){var r;e===void 0&&(e=[]),i===void 0&&(i=true);let o=Nn(t),s=o===((r=t.ownerDocument)==null?void 0:r.body),n=Et(o);if(s){let c=qr(n);return e.concat(n,n.visualViewport||[],ni(o)?o:[],c&&i?si(c):[])}return e.concat(o,si(o,[],i))}function qr(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function qn(t){let e=Ft(t),i=parseFloat(e.width)||0,r=parseFloat(e.height)||0,o=Kt(t),s=o?t.offsetWidth:i,n=o?t.offsetHeight:r,c=zi(i)!==s||zi(r)!==n;return c&&(i=s,r=n),{width:i,height:r,$:c}}function zo(t){return Bt(t)?t:t.contextElement}function li(t){let e=zo(t);if(!Kt(e))return Ut(1);let i=e.getBoundingClientRect(),{width:r,height:o,$:s}=qn(e),n=(s?zi(i.width):i.width)/r,c=(s?zi(i.height):i.height)/o;return (!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}var Ul=Ut(0);function Kn(t){let e=Et(t);return !Ur()||!e.visualViewport?Ul:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ql(t,e,i){return e===void 0&&(e=false),!i||e&&i!==Et(t)?false:e}function He(t,e,i,r){e===void 0&&(e=false),i===void 0&&(i=false);let o=t.getBoundingClientRect(),s=zo(t),n=Ut(1);e&&(r?Bt(r)&&(n=li(r)):n=li(t));let c=ql(s,i,r)?Kn(s):Ut(0),l=(o.left+c.x)/n.x,u=(o.top+c.y)/n.y,f=o.width/n.x,p=o.height/n.y;if(s){let m=Et(s),g=r&&Bt(r)?Et(r):r,b=m,v=qr(b);for(;v&&r&&g!==b;){let E=li(v),k=v.getBoundingClientRect(),w=Ft(v),$=k.left+(v.clientLeft+parseFloat(w.paddingLeft))*E.x,y=k.top+(v.clientTop+parseFloat(w.paddingTop))*E.y;l*=E.x,u*=E.y,f*=E.x,p*=E.y,l+=$,u+=y,b=Et(v),v=qr(b);}}return De({width:f,height:p,x:l,y:u})}function Ho(t,e){let i=Fi(t).scrollLeft;return e?e.left+i:He(qt(t)).left+i}function Gn(t,e,i){i===void 0&&(i=false);let r=t.getBoundingClientRect(),o=r.left+e.scrollLeft-(i?0:Ho(t,r)),s=r.top+e.scrollTop;return {x:o,y:s}}function Kl(t){let{elements:e,rect:i,offsetParent:r,strategy:o}=t,s=o==="fixed",n=qt(r),c=e?Bi(e.floating):false;if(r===n||c&&s)return i;let l={scrollLeft:0,scrollTop:0},u=Ut(1),f=Ut(0),p=Kt(r);if((p||!p&&!s)&&((Me(r)!=="body"||ni(n))&&(l=Fi(r)),Kt(r))){let g=He(r);u=li(r),f.x=g.x+r.clientLeft,f.y=g.y+r.clientTop;}let m=n&&!p&&!s?Gn(n,l,true):Ut(0);return {width:i.width*u.x,height:i.height*u.y,x:i.x*u.x-l.scrollLeft*u.x+f.x+m.x,y:i.y*u.y-l.scrollTop*u.y+f.y+m.y}}function Gl(t){return Array.from(t.getClientRects())}function Yl(t){let e=qt(t),i=Fi(t),r=t.ownerDocument.body,o=_t(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),s=_t(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),n=-i.scrollLeft+Ho(t),c=-i.scrollTop;return Ft(r).direction==="rtl"&&(n+=_t(e.clientWidth,r.clientWidth)-o),{width:o,height:s,x:n,y:c}}function Xl(t,e){let i=Et(t),r=qt(t),o=i.visualViewport,s=r.clientWidth,n=r.clientHeight,c=0,l=0;if(o){s=o.width,n=o.height;let u=Ur();(!u||u&&e==="fixed")&&(c=o.offsetLeft,l=o.offsetTop);}return {width:s,height:n,x:c,y:l}}function Ql(t,e){let i=He(t,true,e==="fixed"),r=i.top+t.clientTop,o=i.left+t.clientLeft,s=Kt(t)?li(t):Ut(1),n=t.clientWidth*s.x,c=t.clientHeight*s.y,l=o*s.x,u=r*s.y;return {width:n,height:c,x:l,y:u}}function jn(t,e,i){let r;if(e==="viewport")r=Xl(t,i);else if(e==="document")r=Yl(qt(t));else if(Bt(e))r=Ql(e,i);else {let o=Kn(t);r={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height};}return De(r)}function Yn(t,e){let i=oe(t);return i===e||!Bt(i)||ze(i)?false:Ft(i).position==="fixed"||Yn(i,e)}function Zl(t,e){let i=e.get(t);if(i)return i;let r=si(t,[],false).filter(c=>Bt(c)&&Me(c)!=="body"),o=null,s=Ft(t).position==="fixed",n=s?oe(t):t;for(;Bt(n)&&!ze(n);){let c=Ft(n),l=ai(n);!l&&c.position==="fixed"&&(o=null),(s?!l&&!o:!l&&c.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||ni(n)&&!l&&Yn(t,n))?r=r.filter(f=>f!==n):o=c,n=oe(n);}return e.set(t,r),r}function Jl(t){let{element:e,boundary:i,rootBoundary:r,strategy:o}=t,n=[...i==="clippingAncestors"?Bi(e)?[]:Zl(e,this._c):[].concat(i),r],c=n[0],l=n.reduce((u,f)=>{let p=jn(e,f,o);return u.top=_t(p.top,u.top),u.right=Qt(p.right,u.right),u.bottom=Qt(p.bottom,u.bottom),u.left=_t(p.left,u.left),u},jn(e,c,o));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function tc(t){let{width:e,height:i}=qn(t);return {width:e,height:i}}function ec(t,e,i){let r=Kt(e),o=qt(e),s=i==="fixed",n=He(t,true,s,e),c={scrollLeft:0,scrollTop:0},l=Ut(0);function u(){l.x=Ho(o);}if(r||!r&&!s)if((Me(e)!=="body"||ni(o))&&(c=Fi(e)),r){let g=He(e,true,s,e);l.x=g.x+e.clientLeft,l.y=g.y+e.clientTop;}else o&&u();s&&!r&&o&&u();let f=o&&!r&&!s?Gn(o,c):Ut(0),p=n.left+c.scrollLeft-l.x-f.x,m=n.top+c.scrollTop-l.y-f.y;return {x:p,y:m,width:n.width,height:n.height}}function Mo(t){return Ft(t).position==="static"}function Un(t,e){if(!Kt(t)||Ft(t).position==="fixed")return null;if(e)return e(t);let i=t.offsetParent;return qt(t)===i&&(i=i.ownerDocument.body),i}function Xn(t,e){let i=Et(t);if(Bi(t))return i;if(!Kt(t)){let o=oe(t);for(;o&&!ze(o);){if(Bt(o)&&!Mo(o))return o;o=oe(o);}return i}let r=Un(t,e);for(;r&&Fn(r)&&Mo(r);)r=Un(r,e);return r&&ze(r)&&Mo(r)&&!ai(r)?i:r||Wn(t)||i}var ic=async function(t){let e=this.getOffsetParent||Xn,i=this.getDimensions,r=await i(t.floating);return {reference:ec(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function rc(t){return Ft(t).direction==="rtl"}var Wi={convertOffsetParentRelativeRectToViewportRelativeRect:Kl,getDocumentElement:qt,getClippingRect:Jl,getOffsetParent:Xn,getElementRects:ic,getClientRects:Gl,getDimensions:tc,getScale:li,isElement:Bt,isRTL:rc};function Qn(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function oc(t,e){let i=null,r,o=qt(t);function s(){var c;clearTimeout(r),(c=i)==null||c.disconnect(),i=null;}function n(c,l){c===void 0&&(c=false),l===void 0&&(l=1),s();let u=t.getBoundingClientRect(),{left:f,top:p,width:m,height:g}=u;if(c||e(),!m||!g)return;let b=Hi(p),v=Hi(o.clientWidth-(f+m)),E=Hi(o.clientHeight-(p+g)),k=Hi(f),$={rootMargin:-b+"px "+-v+"px "+-E+"px "+-k+"px",threshold:_t(0,Qt(1,l))||1},y=true;function S(M){let B=M[0].intersectionRatio;if(B!==l){if(!y)return n();B?n(false,B):r=setTimeout(()=>{n(false,1e-7);},1e3);}B===1&&!Qn(u,t.getBoundingClientRect())&&n(),y=false;}try{i=new IntersectionObserver(S,{...$,root:o.ownerDocument});}catch{i=new IntersectionObserver(S,$);}i.observe(t);}return n(true),s}function Zn(t,e,i,r){r===void 0&&(r={});let{ancestorScroll:o=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=false}=r,u=zo(t),f=o||s?[...u?si(u):[],...si(e)]:[];f.forEach(k=>{o&&k.addEventListener("scroll",i,{passive:true}),s&&k.addEventListener("resize",i);});let p=u&&c?oc(u,i):null,m=-1,g=null;n&&(g=new ResizeObserver(k=>{let[w]=k;w&&w.target===u&&g&&(g.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var $;($=g)==null||$.observe(e);})),i();}),u&&!l&&g.observe(u),g.observe(e));let b,v=l?He(t):null;l&&E();function E(){let k=He(t);v&&!Qn(v,k)&&i(),v=k,b=requestAnimationFrame(E);}return i(),()=>{var k;f.forEach(w=>{o&&w.removeEventListener("scroll",i),s&&w.removeEventListener("resize",i);}),p?.(),(k=g)==null||k.disconnect(),g=null,l&&cancelAnimationFrame(b);}}var Jn=Dn;var ta=Mn,ea=Ln,Bo=zn;var ia=Pn;var ra=(t,e,i)=>{let r=new Map,o={platform:Wi,...i},s={...o.platform,_c:r};return Vn(t,e,{...o,platform:s})};function oa(t){return sc(t)}function Fo(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function sc(t){for(let e=t;e;e=Fo(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Fo(t);e;e=Fo(e)){if(!(e instanceof Element))continue;let i=getComputedStyle(e);if(i.display!=="contents"&&(i.position!=="static"||ai(i)||e.tagName==="BODY"))return e}return null}function nc(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var K=class extends V{constructor(){super(...arguments),this.localize=new G(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),r=0,o=0,s=0,n=0,c=0,l=0,u=0,f=0;i?t.top<e.top?(r=t.left,o=t.bottom,s=t.right,n=t.bottom,c=e.left,l=e.top,u=e.right,f=e.top):(r=e.left,o=e.bottom,s=e.right,n=e.bottom,c=t.left,l=t.top,u=t.right,f=t.top):t.left<e.left?(r=t.right,o=t.top,s=e.left,n=e.top,c=t.right,l=t.bottom,u=e.left,f=e.bottom):(r=e.right,o=e.top,s=t.left,n=t.top,c=e.right,l=e.bottom,u=t.left,f=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${f}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||nc(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Zn(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Jn({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Bo({apply:({rects:i})=>{let r=this.sync==="width"||this.sync==="both",o=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${i.reference.width}px`:"",this.popup.style.height=o?`${i.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(ea({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(ta({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Bo({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(ia({element:this.arrowEl,padding:this.arrowPadding}));let e=this.strategy==="absolute"?i=>Wi.getOffsetParent(i,oa):Wi.getOffsetParent;ra(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:ee(kt({},Wi),{getOffsetParent:e})}).then(({x:i,y:r,middlewareData:o,placement:s})=>{let n=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${i}px`,top:`${r}px`}),this.arrow){let l=o.arrow.x,u=o.arrow.y,f="",p="",m="",g="";if(this.arrowPlacement==="start"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":b,g=n?b:"",m=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",f=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",f=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:f,right:p,bottom:m,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return d`
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
        ${this.arrow?d`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};K.styles=[D,An];a([A(".popup")],K.prototype,"popup",2);a([A(".popup__arrow")],K.prototype,"arrowEl",2);a([h()],K.prototype,"anchor",2);a([h({type:Boolean,reflect:true})],K.prototype,"active",2);a([h({reflect:true})],K.prototype,"placement",2);a([h({reflect:true})],K.prototype,"strategy",2);a([h({type:Number})],K.prototype,"distance",2);a([h({type:Number})],K.prototype,"skidding",2);a([h({type:Boolean})],K.prototype,"arrow",2);a([h({attribute:"arrow-placement"})],K.prototype,"arrowPlacement",2);a([h({attribute:"arrow-padding",type:Number})],K.prototype,"arrowPadding",2);a([h({type:Boolean})],K.prototype,"flip",2);a([h({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],K.prototype,"flipFallbackPlacements",2);a([h({attribute:"flip-fallback-strategy"})],K.prototype,"flipFallbackStrategy",2);a([h({type:Object})],K.prototype,"flipBoundary",2);a([h({attribute:"flip-padding",type:Number})],K.prototype,"flipPadding",2);a([h({type:Boolean})],K.prototype,"shift",2);a([h({type:Object})],K.prototype,"shiftBoundary",2);a([h({attribute:"shift-padding",type:Number})],K.prototype,"shiftPadding",2);a([h({attribute:"auto-size"})],K.prototype,"autoSize",2);a([h()],K.prototype,"sync",2);a([h({type:Object})],K.prototype,"autoSizeBoundary",2);a([h({attribute:"auto-size-padding",type:Number})],K.prototype,"autoSizePadding",2);a([h({attribute:"hover-bridge",type:Boolean})],K.prototype,"hoverBridge",2);var na=new Map,ac=new WeakMap;function lc(t){return t??{keyframes:[],options:{duration:0}}}function sa(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function se(t,e){na.set(t,lc(e));}function ne(t,e,i){let r=ac.get(t);if(r?.[e])return sa(r[e],i.dir);let o=na.get(e);return o?sa(o,i.dir):{keyframes:[],options:{duration:0}}}function ci(t,e){return new Promise(i=>{function r(o){o.target===t&&(t.removeEventListener(e,r),i());}t.addEventListener(e,r);})}function ae(t,e,i){return new Promise(r=>{if(i?.duration===1/0)throw new Error("Promise-based animations must be finite.");let o=t.animate(e,ee(kt({},i),{duration:cc()?0:i.duration}));o.addEventListener("cancel",r,{once:true}),o.addEventListener("finish",r,{once:true});})}function cc(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function le(t){return Promise.all(t.getAnimations().map(e=>new Promise(i=>{e.cancel(),requestAnimationFrame(i);})))}function Wo(t,e){return t.map(i=>ee(kt({},i),{height:i.height==="auto"?`${e}px`:i.height}))}var F=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>d`
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
    `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let e=t.target,i=e.closest(".select__clear")!==null,r=e.closest("sl-icon-button")!==null;if(!(i||r)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let o=this.getAllOptions(),s=o.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>o.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=o.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=o.length-1),this.setCurrentOption(o[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of o)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let i=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="sl-icon-button");this.disabled||i||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let i=t.target.closest("sl-option"),r=this.value;i&&!i.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(i):this.setSelectedOptions(i),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==r&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),e=this.valueHasChanged?this.value:this.defaultValue,i=Array.isArray(e)?e:[e],r=[];t.forEach(o=>r.push(o.value)),this.setSelectedOptions(t.filter(o=>i.includes(o.value)));}handleTagRemove(t,e){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(e,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(i=>{i.current=false,i.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let e=this.getAllOptions(),i=Array.isArray(t)?t:[t];e.forEach(r=>r.selected=false),i.length&&i.forEach(r=>r.selected=true),this.selectionChanged();}toggleOptionSelection(t,e){e===true||e===false?t.selected=e:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,e,i;let r=this.getAllOptions();this.selectedOptions=r.filter(s=>s.selected);let o=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(i=(e=s?.getTextLabel)==null?void 0:e.call(s))!=null?i:"";}this.valueHasChanged=o,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let i=this.getTag(t,e);return d`<div @sl-remove=${r=>this.handleTagRemove(r,t)}>
          ${typeof i=="string"?Mt(i):i}
        </div>`}else if(e===this.maxOptionsVisible)return d`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return d``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,e,i){if(super.attributeChangedCallback(t,e,i),t==="value"){let r=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=r;}}handleValueChange(){if(!this.valueHasChanged){let i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i;}let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(i=>e.includes(i.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await le(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:e}=ne(this,"select.show",{dir:this.localize.dir()});await ae(this.popup.popup,t,e),this.currentOption&&En(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await le(this);let{keyframes:t,options:e}=ne(this,"select.hide",{dir:this.localize.dir()});await ae(this.popup.popup,t,e),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,ci(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,ci(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,r=this.helpText?true:!!e,o=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return d`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":r})}
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

              ${this.multiple?d`<div part="tags" class="select__tags">${this.tags}</div>`:""}

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

              ${o?d`
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
    `}};F.styles=[D,St,$n];F.dependencies={"sl-icon":U,"sl-popup":K,"sl-tag":Xt};a([A(".select")],F.prototype,"popup",2);a([A(".select__combobox")],F.prototype,"combobox",2);a([A(".select__display-input")],F.prototype,"displayInput",2);a([A(".select__value-input")],F.prototype,"valueInput",2);a([A(".select__listbox")],F.prototype,"listbox",2);a([O()],F.prototype,"hasFocus",2);a([O()],F.prototype,"displayLabel",2);a([O()],F.prototype,"currentOption",2);a([O()],F.prototype,"selectedOptions",2);a([O()],F.prototype,"valueHasChanged",2);a([h()],F.prototype,"name",2);a([O()],F.prototype,"value",1);a([h({attribute:"value"})],F.prototype,"defaultValue",2);a([h({reflect:true})],F.prototype,"size",2);a([h()],F.prototype,"placeholder",2);a([h({type:Boolean,reflect:true})],F.prototype,"multiple",2);a([h({attribute:"max-options-visible",type:Number})],F.prototype,"maxOptionsVisible",2);a([h({type:Boolean,reflect:true})],F.prototype,"disabled",2);a([h({type:Boolean})],F.prototype,"clearable",2);a([h({type:Boolean,reflect:true})],F.prototype,"open",2);a([h({type:Boolean})],F.prototype,"hoist",2);a([h({type:Boolean,reflect:true})],F.prototype,"filled",2);a([h({type:Boolean,reflect:true})],F.prototype,"pill",2);a([h()],F.prototype,"label",2);a([h({reflect:true})],F.prototype,"placement",2);a([h({attribute:"help-text"})],F.prototype,"helpText",2);a([h({reflect:true})],F.prototype,"form",2);a([h({type:Boolean,reflect:true})],F.prototype,"required",2);a([h()],F.prototype,"getTag",2);a([T("disabled",{waitUntilFirstUpdate:true})],F.prototype,"handleDisabledChange",1);a([T(["defaultValue","value"],{waitUntilFirstUpdate:true})],F.prototype,"handleValueChange",1);a([T("open",{waitUntilFirstUpdate:true})],F.prototype,"handleOpenChange",1);se("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});se("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});F.define("sl-select");var aa=_`
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
`;var Lt=class extends V{constructor(){super(...arguments),this.localize=new G(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,e="";return [...t].forEach(i=>{i.nodeType===Node.ELEMENT_NODE&&(i.hasAttribute("slot")||(e+=i.textContent)),i.nodeType===Node.TEXT_NODE&&(e+=i.textContent);}),e.trim()}render(){return d`
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
    `}};Lt.styles=[D,aa];Lt.dependencies={"sl-icon":U};a([A(".option__label")],Lt.prototype,"defaultSlot",2);a([O()],Lt.prototype,"current",2);a([O()],Lt.prototype,"selected",2);a([O()],Lt.prototype,"hasHover",2);a([h({reflect:true})],Lt.prototype,"value",2);a([h({type:Boolean,reflect:true})],Lt.prototype,"disabled",2);a([T("disabled")],Lt.prototype,"handleDisabledChange",1);a([T("selected")],Lt.prototype,"handleSelectedChange",1);a([T("value")],Lt.prototype,"handleValueChange",1);Lt.define("sl-option");exports.AutoFieldSelect=class Kr extends R{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}renderInput(){let i=this.options.select.map(r=>{let o={};return typeof r=="object"?Object.assign(o,r):typeof r=="string"&&r.startsWith("-")?Object.assign(o,{type:"divider"}):Object.assign(o,{label:r}),o});return d`              
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
            ${i.map(r=>r.type==="divider"?d`<sl-divider></sl-divider>`:d`<sl-option 
                    value="${r[this.valueKey]||r.label}"
                    ?disabled=${!this.options.enable}
                >${r[this.labelKey]}</sl-option>`)}
        ${this.renderBeforeActions()}
        ${this.renderAfterActions()}
        </sl-select> 
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect=x([I("auto-field-select")],exports.AutoFieldSelect);var la=_`
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
`;var et=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let e=this.input.offsetWidth,i=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),o=this.localize.dir()==="rtl",s=e*t;if(o){let n=`${e-s}px + ${t} * ${r}`;this.output.style.translate=`calc((${n} - ${i/2}px - ${r} / 2))`;}else {let n=`${s}px - ${t} * ${r}`;this.output.style.translate=`calc(${n} - ${i/2}px + ${r} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,r=this.helpText?true:!!e;return d`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--medium":true,"form-control--has-label":i,"form-control--has-help-text":r})}
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
              .value=${Pt(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?d`
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
    `}};et.styles=[D,St,la];a([A(".range__control")],et.prototype,"input",2);a([A(".range__tooltip")],et.prototype,"output",2);a([O()],et.prototype,"hasFocus",2);a([O()],et.prototype,"hasTooltip",2);a([h()],et.prototype,"title",2);a([h()],et.prototype,"name",2);a([h({type:Number})],et.prototype,"value",2);a([h()],et.prototype,"label",2);a([h({attribute:"help-text"})],et.prototype,"helpText",2);a([h({type:Boolean,reflect:true})],et.prototype,"disabled",2);a([h({type:Number})],et.prototype,"min",2);a([h({type:Number})],et.prototype,"max",2);a([h({type:Number})],et.prototype,"step",2);a([h()],et.prototype,"tooltip",2);a([h({attribute:false})],et.prototype,"tooltipFormatter",2);a([h({reflect:true})],et.prototype,"form",2);a([zt()],et.prototype,"defaultValue",2);a([Ye({passive:true})],et.prototype,"handleThumbDragStart",1);a([T("value",{waitUntilFirstUpdate:true})],et.prototype,"handleValueChange",1);a([T("disabled",{waitUntilFirstUpdate:true})],et.prototype,"handleDisabledChange",1);a([T("hasTooltip",{waitUntilFirstUpdate:true})],et.prototype,"syncRange",1);et.define("sl-range");exports.AutoFieldRabge=class Ni extends R{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top",tooltipFormatter:void 0,format:void 0}}renderInput(){return d`       
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
        `],exports.AutoFieldRabge=x([I("auto-field-range")],exports.AutoFieldRabge);var ca=_`
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
`;function at(t,e,i){let r=o=>Object.is(o,-0)?0:o;return t<e?r(e):t>i?r(i):r(t)}var gt=class extends V{constructor(){super(...arguments),this.localize=new G(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let e=this.localize.dir()==="rtl",{left:i,right:r,width:o}=this.rating.getBoundingClientRect(),s=e?this.roundToPrecision((r-t)/o*this.max,this.precision):this.roundToPrecision((t-i)/o*this.max,this.precision);return at(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let e=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl",r=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||e&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight"){let o=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-o),t.preventDefault();}if(t.key==="ArrowUp"||e&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft"){let o=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+o),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==r&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,e=.5){let i=1/e;return Math.ceil(t*i)/i}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",e=Array.from(Array(this.max).keys()),i=0;return this.disabled||this.readonly?i=this.value:i=this.isHovering?this.hoverValue:this.value,d`
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
          ${e.map(r=>i>r&&i<r+1?d`
                <span
                  class=${L({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===r+1})}
                  role="presentation"
                >
                  <div
                    style=${J({clipPath:t?`inset(0 ${(i-r)*100}% 0 0)`:`inset(0 0 0 ${(i-r)*100}%)`})}
                  >
                    ${Mt(this.getSymbol(r+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${J({clipPath:t?`inset(0 0 0 ${100-(i-r)*100}%)`:`inset(0 ${100-(i-r)*100}% 0 0)`})}
                  >
                    ${Mt(this.getSymbol(r+1))}
                  </div>
                </span>
              `:d`
              <span
                class=${L({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===r+1,"rating__symbol--active":i>=r+1})}
                role="presentation"
              >
                ${Mt(this.getSymbol(r+1))}
              </span>
            `)}
        </span>
      </div>
    `}};gt.styles=[D,ca];gt.dependencies={"sl-icon":U};a([A(".rating")],gt.prototype,"rating",2);a([O()],gt.prototype,"hoverValue",2);a([O()],gt.prototype,"isHovering",2);a([h()],gt.prototype,"label",2);a([h({type:Number})],gt.prototype,"value",2);a([h({type:Number})],gt.prototype,"max",2);a([h({type:Number})],gt.prototype,"precision",2);a([h({type:Boolean,reflect:true})],gt.prototype,"readonly",2);a([h({type:Boolean,reflect:true})],gt.prototype,"disabled",2);a([h()],gt.prototype,"getSymbol",2);a([Ye({passive:true})],gt.prototype,"handleTouchMove",1);a([T("hoverValue")],gt.prototype,"handleHoverValueChange",1);a([T("isHovering")],gt.prototype,"handleIsHoveringChange",1);gt.define("sl-rating");exports.AutoFieldRating=class Gr extends R{renderInput(){return d`              
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
        `}renderView(){return d`<sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value=${this.value}  
            readonly
        > </sl-rating> `}};exports.AutoFieldRating=x([I("auto-field-rating")],exports.AutoFieldRating);var pa=_`
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
`;var No=class extends V{render(){return d` <slot></slot> `}};No.styles=[D,pa];var ha=_`
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
`;var H=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new G(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i);}setRangeText(t,e,i,r="preserve"){let o=e??this.input.selectionStart,s=i??this.input.selectionEnd;this.input.setRangeText(t,o,s,r),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=this.label?true:!!t,r=this.helpText?true:!!e,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return d`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":r})}
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
              .value=${Pt(this.value)}
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

            ${s?d`
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
            ${this.passwordToggle&&!this.disabled?d`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?d`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:d`
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
    `}};H.styles=[D,St,ha];H.dependencies={"sl-icon":U};a([A(".input__control")],H.prototype,"input",2);a([O()],H.prototype,"hasFocus",2);a([h()],H.prototype,"title",2);a([h({reflect:true})],H.prototype,"type",2);a([h()],H.prototype,"name",2);a([h()],H.prototype,"value",2);a([zt()],H.prototype,"defaultValue",2);a([h({reflect:true})],H.prototype,"size",2);a([h({type:Boolean,reflect:true})],H.prototype,"filled",2);a([h({type:Boolean,reflect:true})],H.prototype,"pill",2);a([h()],H.prototype,"label",2);a([h({attribute:"help-text"})],H.prototype,"helpText",2);a([h({type:Boolean})],H.prototype,"clearable",2);a([h({type:Boolean,reflect:true})],H.prototype,"disabled",2);a([h()],H.prototype,"placeholder",2);a([h({type:Boolean,reflect:true})],H.prototype,"readonly",2);a([h({attribute:"password-toggle",type:Boolean})],H.prototype,"passwordToggle",2);a([h({attribute:"password-visible",type:Boolean})],H.prototype,"passwordVisible",2);a([h({attribute:"no-spin-buttons",type:Boolean})],H.prototype,"noSpinButtons",2);a([h({reflect:true})],H.prototype,"form",2);a([h({type:Boolean,reflect:true})],H.prototype,"required",2);a([h()],H.prototype,"pattern",2);a([h({type:Number})],H.prototype,"minlength",2);a([h({type:Number})],H.prototype,"maxlength",2);a([h()],H.prototype,"min",2);a([h()],H.prototype,"max",2);a([h()],H.prototype,"step",2);a([h()],H.prototype,"autocapitalize",2);a([h()],H.prototype,"autocorrect",2);a([h()],H.prototype,"autocomplete",2);a([h({type:Boolean})],H.prototype,"autofocus",2);a([h()],H.prototype,"enterkeyhint",2);a([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],H.prototype,"spellcheck",2);a([h()],H.prototype,"inputmode",2);a([T("disabled",{waitUntilFirstUpdate:true})],H.prototype,"handleDisabledChange",1);a([T("step",{waitUntilFirstUpdate:true})],H.prototype,"handleStepChange",1);a([T("value",{waitUntilFirstUpdate:true})],H.prototype,"handleValueChange",1);function pi(t,e){function i(o){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,c=s.left+n.scrollX,l=s.top+n.scrollY,u=o.pageX-c,f=o.pageY-l;e?.onMove&&e.onMove(u,f);}function r(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",r),e?.onStop&&e.onStop();}document.addEventListener("pointermove",i,{passive:true}),document.addEventListener("pointerup",r),e?.initialEvent instanceof PointerEvent&&i(e.initialEvent);}var ua=_`
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
`;function*ma(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*tn(ma(t.shadowRoot.activeElement))));}function fa(){return [...ma()].pop()}var da=new WeakMap;function ga(t){let e=da.get(t);return e||(e=window.getComputedStyle(t,null),da.set(t,e)),e}function pc(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let e=ga(t);return e.visibility!=="hidden"&&e.display!=="none"}function hc(t){let e=ga(t),{overflowY:i,overflowX:r}=e;return i==="scroll"||r==="scroll"?true:i!=="auto"||r!=="auto"?false:t.scrollHeight>t.clientHeight&&i==="auto"||t.scrollWidth>t.clientWidth&&r==="auto"}function uc(t){let e=t.tagName.toLowerCase(),i=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(e==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${n}:checked`);return c?c===t:s.querySelector(n)===t}return pc(t)?(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?true:hc(t):false}function ba(t){var e,i;let r=mc(t),o=(e=r[0])!=null?e:null,s=(i=r[r.length-1])!=null?i:null;return {start:o,end:s}}function dc(t,e){var i;return ((i=t.getRootNode({composed:true}))==null?void 0:i.host)!==e}function mc(t){let e=new WeakMap,i=[];function r(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||e.has(o))return;e.set(o,true),!i.includes(o)&&uc(o)&&i.push(o),o instanceof HTMLSlotElement&&dc(o,t)&&o.assignedElements({flatten:true}).forEach(s=>{r(s);}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&r(o.shadowRoot);}for(let s of o.children)r(s);}return r(t),i.sort((o,s)=>{let n=Number(o.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var ct=class extends V{constructor(){super(...arguments),this.localize=new G(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let i=(r,o)=>{if(!r)return null;let s=r.closest(o);if(s)return s;let n=r.getRootNode();return n instanceof ShadowRoot?i(n.host,o):null};setTimeout(()=>{var r;let o=((r=this.containingElement)==null?void 0:r.getRootNode())instanceof ShadowRoot?fa():document.activeElement;(!this.containingElement||i(o,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let e=this.getMenu();if(e){let i=e.getAllItems(),r=i[0],o=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),i.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(o),o.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let e=this.trigger.assignedElements({flatten:true}).find(r=>ba(r).start),i;if(e){switch(e.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":i=e.button;break;default:i=e;}i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,ci(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,ci(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await le(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:e}=ne(this,"dropdown.show",{dir:this.localize.dir()});await ae(this.popup.popup,t,e),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await le(this);let{keyframes:t,options:e}=ne(this,"dropdown.hide",{dir:this.localize.dir()});await ae(this.popup.popup,t,e),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return d`
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
    `}};ct.styles=[D,ua];ct.dependencies={"sl-popup":K};a([A(".dropdown")],ct.prototype,"popup",2);a([A(".dropdown__trigger")],ct.prototype,"trigger",2);a([A(".dropdown__panel")],ct.prototype,"panel",2);a([h({type:Boolean,reflect:true})],ct.prototype,"open",2);a([h({reflect:true})],ct.prototype,"placement",2);a([h({type:Boolean,reflect:true})],ct.prototype,"disabled",2);a([h({attribute:"stay-open-on-select",type:Boolean,reflect:true})],ct.prototype,"stayOpenOnSelect",2);a([h({attribute:false})],ct.prototype,"containingElement",2);a([h({type:Number})],ct.prototype,"distance",2);a([h({type:Number})],ct.prototype,"skidding",2);a([h({type:Boolean})],ct.prototype,"hoist",2);a([h({reflect:true})],ct.prototype,"sync",2);a([T("open",{waitUntilFirstUpdate:true})],ct.prototype,"handleOpenChange",1);se("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});se("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var va=_`
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
`;var ya=_`
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
`;var ce=class extends V{constructor(){super(...arguments),this.localize=new G(this);}render(){return d`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};ce.styles=[D,ya];var q=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.localize=new G(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:ei}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),e=t?ii`a`:ii`button`;return _e`
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
        ${this.caret?_e` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?_e`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};q.styles=[D,Er];q.dependencies={"sl-icon":U,"sl-spinner":ce};a([A(".button")],q.prototype,"button",2);a([O()],q.prototype,"hasFocus",2);a([O()],q.prototype,"invalid",2);a([h()],q.prototype,"title",2);a([h({reflect:true})],q.prototype,"variant",2);a([h({reflect:true})],q.prototype,"size",2);a([h({type:Boolean,reflect:true})],q.prototype,"caret",2);a([h({type:Boolean,reflect:true})],q.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],q.prototype,"loading",2);a([h({type:Boolean,reflect:true})],q.prototype,"outline",2);a([h({type:Boolean,reflect:true})],q.prototype,"pill",2);a([h({type:Boolean,reflect:true})],q.prototype,"circle",2);a([h()],q.prototype,"type",2);a([h()],q.prototype,"name",2);a([h()],q.prototype,"value",2);a([h()],q.prototype,"href",2);a([h()],q.prototype,"target",2);a([h()],q.prototype,"rel",2);a([h()],q.prototype,"download",2);a([h()],q.prototype,"form",2);a([h({attribute:"formaction"})],q.prototype,"formAction",2);a([h({attribute:"formenctype"})],q.prototype,"formEnctype",2);a([h({attribute:"formmethod"})],q.prototype,"formMethod",2);a([h({attribute:"formnovalidate",type:Boolean})],q.prototype,"formNoValidate",2);a([h({attribute:"formtarget"})],q.prototype,"formTarget",2);a([T("disabled",{waitUntilFirstUpdate:true})],q.prototype,"handleDisabledChange",1);function pt(t,e){fc(t)&&(t="100%");let i=gc(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),i&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function ji(t){return Math.min(1,Math.max(0,t))}function fc(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function gc(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Yr(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Ui(t){return Number(t)<=1?`${Number(t)*100}%`:t}function we(t){return t.length===1?"0"+t:String(t)}function xa(t,e,i){return {r:pt(t,255)*255,g:pt(e,255)*255,b:pt(i,255)*255}}function Uo(t,e,i){t=pt(t,255),e=pt(e,255),i=pt(i,255);let r=Math.max(t,e,i),o=Math.min(t,e,i),s=0,n=0,c=(r+o)/2;if(r===o)n=0,s=0;else {let l=r-o;switch(n=c>.5?l/(2-r-o):l/(r+o),r){case t:s=(e-i)/l+(e<i?6:0);break;case e:s=(i-t)/l+2;break;case i:s=(t-e)/l+4;break;}s/=6;}return {h:s,s:n,l:c}}function jo(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+(e-t)*(6*i):i<1/2?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function _a(t,e,i){let r,o,s;if(t=pt(t,360),e=pt(e,100),i=pt(i,100),e===0)o=i,s=i,r=i;else {let n=i<.5?i*(1+e):i+e-i*e,c=2*i-n;r=jo(c,n,t+1/3),o=jo(c,n,t),s=jo(c,n,t-1/3);}return {r:r*255,g:o*255,b:s*255}}function qo(t,e,i){t=pt(t,255),e=pt(e,255),i=pt(i,255);let r=Math.max(t,e,i),o=Math.min(t,e,i),s=0,n=r,c=r-o,l=r===0?0:c/r;if(r===o)s=0;else {switch(r){case t:s=(e-i)/c+(e<i?6:0);break;case e:s=(i-t)/c+2;break;case i:s=(t-e)/c+4;break;}s/=6;}return {h:s,s:l,v:n}}function wa(t,e,i){t=pt(t,360)*6,e=pt(e,100),i=pt(i,100);let r=Math.floor(t),o=t-r,s=i*(1-e),n=i*(1-o*e),c=i*(1-(1-o)*e),l=r%6,u=[i,n,s,s,c,i][l],f=[c,i,i,n,s,s][l],p=[s,s,c,i,i,n][l];return {r:u*255,g:f*255,b:p*255}}function Ko(t,e,i,r){let o=[we(Math.round(t).toString(16)),we(Math.round(e).toString(16)),we(Math.round(i).toString(16))];return r&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function Ca(t,e,i,r,o){let s=[we(Math.round(t).toString(16)),we(Math.round(e).toString(16)),we(Math.round(i).toString(16)),we(bc(r))];return o&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function Sa(t,e,i,r){let o=t/100,s=e/100,n=i/100,c=r/100,l=255*(1-o)*(1-c),u=255*(1-s)*(1-c),f=255*(1-n)*(1-c);return {r:l,g:u,b:f}}function Go(t,e,i){let r=1-t/255,o=1-e/255,s=1-i/255,n=Math.min(r,o,s);return n===1?(r=0,o=0,s=0):(r=(r-n)/(1-n)*100,o=(o-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(r),m:Math.round(o),y:Math.round(s),k:Math.round(n)}}function bc(t){return Math.round(parseFloat(t)*255).toString(16)}function Yo(t){return At(t)/255}function At(t){return parseInt(t,16)}function ka(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var qi={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function $a(t){let e={r:0,g:0,b:0},i=1,r=null,o=null,s=null,n=false,c=false;return typeof t=="string"&&(t=xc(t)),typeof t=="object"&&(Dt(t.r)&&Dt(t.g)&&Dt(t.b)?(e=xa(t.r,t.g,t.b),n=true,c=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Dt(t.h)&&Dt(t.s)&&Dt(t.v)?(r=Ui(t.s),o=Ui(t.v),e=wa(t.h,r,o),n=true,c="hsv"):Dt(t.h)&&Dt(t.s)&&Dt(t.l)?(r=Ui(t.s),s=Ui(t.l),e=_a(t.h,r,s),n=true,c="hsl"):Dt(t.c)&&Dt(t.m)&&Dt(t.y)&&Dt(t.k)&&(e=Sa(t.c,t.m,t.y,t.k),n=true,c="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(i=t.a)),i=Yr(i),{ok:n,format:t.format||c,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:i}}var vc="[-\\+]?\\d+%?",yc="[-\\+]?\\d*\\.\\d+%?",Ce="(?:"+yc+")|(?:"+vc+")",Xo="[\\s|\\(]+("+Ce+")[,|\\s]+("+Ce+")[,|\\s]+("+Ce+")\\s*\\)?",Xr="[\\s|\\(]+("+Ce+")[,|\\s]+("+Ce+")[,|\\s]+("+Ce+")[,|\\s]+("+Ce+")\\s*\\)?",Wt={CSS_UNIT:new RegExp(Ce),rgb:new RegExp("rgb"+Xo),rgba:new RegExp("rgba"+Xr),hsl:new RegExp("hsl"+Xo),hsla:new RegExp("hsla"+Xr),hsv:new RegExp("hsv"+Xo),hsva:new RegExp("hsva"+Xr),cmyk:new RegExp("cmyk"+Xr),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function xc(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let e=false;if(qi[t])t=qi[t],e=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let i=Wt.rgb.exec(t);return i?{r:i[1],g:i[2],b:i[3]}:(i=Wt.rgba.exec(t),i?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=Wt.hsl.exec(t),i?{h:i[1],s:i[2],l:i[3]}:(i=Wt.hsla.exec(t),i?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=Wt.hsv.exec(t),i?{h:i[1],s:i[2],v:i[3]}:(i=Wt.hsva.exec(t),i?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=Wt.cmyk.exec(t),i?{c:i[1],m:i[2],y:i[3],k:i[4]}:(i=Wt.hex8.exec(t),i?{r:At(i[1]),g:At(i[2]),b:At(i[3]),a:Yo(i[4]),format:e?"name":"hex8"}:(i=Wt.hex6.exec(t),i?{r:At(i[1]),g:At(i[2]),b:At(i[3]),format:e?"name":"hex"}:(i=Wt.hex4.exec(t),i?{r:At(i[1]+i[1]),g:At(i[2]+i[2]),b:At(i[3]+i[3]),a:Yo(i[4]+i[4]),format:e?"name":"hex8"}:(i=Wt.hex3.exec(t),i?{r:At(i[1]+i[1]),g:At(i[2]+i[2]),b:At(i[3]+i[3]),format:e?"name":"hex"}:false))))))))))}function Dt(t){return typeof t=="number"?!Number.isNaN(t):Wt.CSS_UNIT.test(t)}var Ki=class t{constructor(e="",i={}){if(e instanceof t)return e;typeof e=="number"&&(e=ka(e)),this.originalInput=e;let r=$a(e);this.originalInput=e,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=i.format??r.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let e=this.toRgb();return (e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){let e=this.toRgb(),i,r,o,s=e.r/255,n=e.g/255,c=e.b/255;return s<=.03928?i=s/12.92:i=Math.pow((s+.055)/1.055,2.4),n<=.03928?r=n/12.92:r=Math.pow((n+.055)/1.055,2.4),c<=.03928?o=c/12.92:o=Math.pow((c+.055)/1.055,2.4),.2126*i+.7152*r+.0722*o}getAlpha(){return this.a}setAlpha(e){return this.a=Yr(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:e}=this.toHsl();return e===0}toHsv(){let e=qo(this.r,this.g,this.b);return {h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){let e=qo(this.r,this.g,this.b),i=Math.round(e.h*360),r=Math.round(e.s*100),o=Math.round(e.v*100);return this.a===1?`hsv(${i}, ${r}%, ${o}%)`:`hsva(${i}, ${r}%, ${o}%, ${this.roundA})`}toHsl(){let e=Uo(this.r,this.g,this.b);return {h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){let e=Uo(this.r,this.g,this.b),i=Math.round(e.h*360),r=Math.round(e.s*100),o=Math.round(e.l*100);return this.a===1?`hsl(${i}, ${r}%, ${o}%)`:`hsla(${i}, ${r}%, ${o}%, ${this.roundA})`}toHex(e=false){return Ko(this.r,this.g,this.b,e)}toHexString(e=false){return "#"+this.toHex(e)}toHex8(e=false){return Ca(this.r,this.g,this.b,this.a,e)}toHex8String(e=false){return "#"+this.toHex8(e)}toHexShortString(e=false){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let e=Math.round(this.r),i=Math.round(this.g),r=Math.round(this.b);return this.a===1?`rgb(${e}, ${i}, ${r})`:`rgba(${e}, ${i}, ${r}, ${this.roundA})`}toPercentageRgb(){let e=i=>`${Math.round(pt(i,255)*100)}%`;return {r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){let e=i=>Math.round(pt(i,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return {...Go(this.r,this.g,this.b)}}toCmykString(){let{c:e,m:i,y:r,k:o}=Go(this.r,this.g,this.b);return `cmyk(${e}, ${i}, ${r}, ${o})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let e="#"+Ko(this.r,this.g,this.b,false);for(let[i,r]of Object.entries(qi))if(e===r)return i;return  false}toString(e){let i=!!e;e=e??this.format;let r=false,o=this.a<1&&this.a>=0;return !i&&o&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(r=this.toRgbString()),e==="prgb"&&(r=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(r=this.toHexString()),e==="hex3"&&(r=this.toHexString(true)),e==="hex4"&&(r=this.toHex8String(true)),e==="hex8"&&(r=this.toHex8String()),e==="name"&&(r=this.toName()),e==="hsl"&&(r=this.toHslString()),e==="hsv"&&(r=this.toHsvString()),e==="cmyk"&&(r=this.toCmykString()),r||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(e=10){let i=this.toHsl();return i.l+=e/100,i.l=ji(i.l),new t(i)}brighten(e=10){let i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(255*-(e/100)))),i.g=Math.max(0,Math.min(255,i.g-Math.round(255*-(e/100)))),i.b=Math.max(0,Math.min(255,i.b-Math.round(255*-(e/100)))),new t(i)}darken(e=10){let i=this.toHsl();return i.l-=e/100,i.l=ji(i.l),new t(i)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){let i=this.toHsl();return i.s-=e/100,i.s=ji(i.s),new t(i)}saturate(e=10){let i=this.toHsl();return i.s+=e/100,i.s=ji(i.s),new t(i)}greyscale(){return this.desaturate(100)}spin(e){let i=this.toHsl(),r=(i.h+e)%360;return i.h=r<0?360+r:r,new t(i)}mix(e,i=50){let r=this.toRgb(),o=new t(e).toRgb(),s=i/100,n={r:(o.r-r.r)*s+r.r,g:(o.g-r.g)*s+r.g,b:(o.b-r.b)*s+r.b,a:(o.a-r.a)*s+r.a};return new t(n)}analogous(e=6,i=30){let r=this.toHsl(),o=360/i,s=[this];for(r.h=(r.h-(o*e>>1)+720)%360;--e;)r.h=(r.h+o)%360,s.push(new t(r));return s}complement(){let e=this.toHsl();return e.h=(e.h+180)%360,new t(e)}monochromatic(e=6){let i=this.toHsv(),{h:r}=i,{s:o}=i,{v:s}=i,n=[],c=1/e;for(;e--;)n.push(new t({h:r,s:o,v:s})),s=(s+c)%1;return n}splitcomplement(){let e=this.toHsl(),{h:i}=e;return [this,new t({h:(i+72)%360,s:e.s,l:e.l}),new t({h:(i+216)%360,s:e.s,l:e.l})]}onBackground(e){let i=this.toRgb(),r=new t(e).toRgb(),o=i.a+r.a*(1-i.a);return new t({r:(i.r*i.a+r.r*r.a*(1-i.a))/o,g:(i.g*i.a+r.g*r.a*(1-i.a))/o,b:(i.b*i.a+r.b*r.a*(1-i.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){let i=this.toHsl(),{h:r}=i,o=[this],s=360/e;for(let n=1;n<e;n++)o.push(new t({h:(r+n*s)%360,s:i.s,l:i.l}));return o}equals(e){let i=new t(e);return this.format==="cmyk"||i.format==="cmyk"?this.toCmykString()===i.toCmykString():this.toRgbString()===i.toRgbString()}};var Ea="EyeDropper"in window,W=class extends V{constructor(){super(),this.formControlController=new ht(this),this.isSafeValue=false,this.localize=new G(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),i=e.querySelector(".color-picker__slider-handle"),{width:r}=e.getBoundingClientRect(),o=this.value,s=this.value;i.focus(),t.preventDefault(),pi(e,{onMove:n=>{this.alpha=at(n/r*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),i=e.querySelector(".color-picker__slider-handle"),{width:r}=e.getBoundingClientRect(),o=this.value,s=this.value;i.focus(),t.preventDefault(),pi(e,{onMove:n=>{this.hue=at(n/r*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let e=this.shadowRoot.querySelector(".color-picker__grid"),i=e.querySelector(".color-picker__grid-handle"),{width:r,height:o}=e.getBoundingClientRect(),s=this.value,n=this.value;i.focus(),t.preventDefault(),this.isDraggingGridHandle=true,pi(e,{onMove:(c,l)=>{this.saturation=at(c/r*100,0,100),this.brightness=at(100-l/o*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=at(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=at(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=at(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=at(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=at(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=at(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=at(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=at(this.brightness-e,0,100),this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let e=t.target,i=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let e=new Ki(t);if(!e.isValid)return null;let i=e.toHsl(),r={h:i.h,s:i.s*100,l:i.l*100,a:i.a},o=e.toRgb(),s=e.toHexString(),n=e.toHex8String(),c=e.toHsv(),l={h:c.h,s:c.s*100,v:c.v*100,a:c.a};return {hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:o.r,g:o.g,b:o.b,string:this.setLetterCase(`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`)},rgba:{r:o.r,g:o.g,b:o.b,a:o.a,string:this.setLetterCase(`rgba(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)}, ${o.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let e=this.parseColor(t);return e===null?false:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!Ea)return;new EyeDropper().open().then(e=>{let i=this.value;this.setColor(e.sRGBHex),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,e,i,r=100){let o=new Ki(`hsva(${t}, ${e}%, ${i}%, ${r/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let i=this.parseColor(e);i!==null?(this.inputValue=this.value,this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=i.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let e=this.inline?this.base:this.trigger;this.hasFocus&&(e.focus({preventScroll:true}),e.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return "";switch(t){case "hex":return e.hex;case "hexa":return e.hexa;case "rgb":return e.rgb.string;case "rgba":return e.rgba.string;case "hsl":return e.hsl.string;case "hsla":return e.hsla.string;case "hsv":return e.hsv.string;case "hsva":return e.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,e=100-this.brightness,i=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(o=>o.trim()!==""),r=d`
      <div
        part="base"
        class=${L({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?d`
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

            ${this.opacity?d`
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
            ${this.noFormatToggle?"":d`
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
            ${Ea?d`
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

        ${i.length>0?d`
              <div part="swatches" class="color-picker__swatches">
                ${i.map(o=>{let s=this.parseColor(o);return s?d`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${C(this.disabled?void 0:"0")}
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
    `;return this.inline?r:d`
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
    `}};W.styles=[D,va];W.dependencies={"sl-button-group":xe,"sl-button":q,"sl-dropdown":ct,"sl-icon":U,"sl-input":H,"sl-visually-hidden":No};a([A('[part~="base"]')],W.prototype,"base",2);a([A('[part~="input"]')],W.prototype,"input",2);a([A(".color-dropdown")],W.prototype,"dropdown",2);a([A('[part~="preview"]')],W.prototype,"previewButton",2);a([A('[part~="trigger"]')],W.prototype,"trigger",2);a([O()],W.prototype,"hasFocus",2);a([O()],W.prototype,"isDraggingGridHandle",2);a([O()],W.prototype,"isEmpty",2);a([O()],W.prototype,"inputValue",2);a([O()],W.prototype,"hue",2);a([O()],W.prototype,"saturation",2);a([O()],W.prototype,"brightness",2);a([O()],W.prototype,"alpha",2);a([h()],W.prototype,"value",2);a([zt()],W.prototype,"defaultValue",2);a([h()],W.prototype,"label",2);a([h()],W.prototype,"format",2);a([h({type:Boolean,reflect:true})],W.prototype,"inline",2);a([h({reflect:true})],W.prototype,"size",2);a([h({attribute:"no-format-toggle",type:Boolean})],W.prototype,"noFormatToggle",2);a([h()],W.prototype,"name",2);a([h({type:Boolean,reflect:true})],W.prototype,"disabled",2);a([h({type:Boolean})],W.prototype,"hoist",2);a([h({type:Boolean})],W.prototype,"opacity",2);a([h({type:Boolean})],W.prototype,"uppercase",2);a([h()],W.prototype,"swatches",2);a([h({reflect:true})],W.prototype,"form",2);a([h({type:Boolean,reflect:true})],W.prototype,"required",2);a([Ye({passive:false})],W.prototype,"handleTouchMove",1);a([T("format",{waitUntilFirstUpdate:true})],W.prototype,"handleFormatChange",1);a([T("opacity",{waitUntilFirstUpdate:true})],W.prototype,"handleOpacityChange",1);a([T("value")],W.prototype,"handleValueChange",1);W.define("sl-color-picker");var _c=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class Gi extends R{getInitialOptions(){return {format:"hex",opacity:false,inline:false,presets:_c}}renderInput(){return d`
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
        `}renderView(){return d`<span><span class="color" style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[R.styles,_`
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
    `],exports.AutoFieldColorPicker=x([I("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class Yi extends R{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((i,r)=>{let o={};return typeof i=="object"?Object.assign(o,i):Object.assign(o,{id:i,label:i,value:i}),o.icon&&(this.isShowIcon=true),o.$index=r,o}),this.selection=this.value;}renderInput(){return d`
            <div class="items">        
                ${this.items.map(i=>this.renderCheckItemWithCard(this.renderCheckboxItem(i),i))} </div>
        `}renderCheckboxItem(i){return d`              
            <sl-checkbox      
                data-index="${i.$index}"
                data-value="${i[this.valueKey]}"
                .value="${i[this.valueKey]}" 
                .checked=${this.value.includes(i[this.valueKey])} 
                help-text="${i.memo}"
                @sl-change=${this._onCheckChange.bind(this)}
            > ${i.label}</sl-checkbox> 
        `}_onCheckChange(i){let r=i.target.closest(".card")||i.target,o=Number(r.dataset.index),s=r.checked??!r.classList.contains("selected"),n=this.items[o];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let c=this.selection.findIndex(l=>l===n[this.valueKey]);c>-1&&this.selection.splice(c,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(i,r){if(this.options.card){let o=this.selection.includes(r[this.valueKey]);return d`<div class="card ${o?"selected":""}"
                data-index ="${r.$index}"
                style=${J({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">
                    ${Z(this.isShowIcon,()=>d`<sl-icon  class="icon" name="${r.icon||""}"></sl-icon>`)}                    
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
    `],exports.AutoFieldCheckboxGroup=x([I("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class Xi extends R{constructor(){super(...arguments);this.delimiter="";this.template="0000";this.parts=[];this.result="";}getInitialOptions(){return {template:"0000",delimiter:""}}_onPartChange(i){let o=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,c)=>(n+=c.value,n),""),s=0;this.result=Array.from(this.template).map(n=>n===this.delimiter?n:o[s++]).join(""),this.onFieldChange(),this._isLastInput(i);}getInputValue(){return this.result}_isLastInput(i){let r=i.target;if(r.value.length>=1){r.blur();let o=r.nextElementSibling||r.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(i){i.preventDefault();let o=(i.clipboardData?.getData("text/plain")||"").split(""),s=c=>{if(c){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let c of o)if(c!==this.options.delimiter&&(n.value=c,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.delimiter=this.options.delimiter,this.template=this.options.template,this.parts=this.template.split(this.delimiter),this.value.split(this.delimiter).forEach((i,r)=>{this.parts[r]=i;});}_onPartFocus(i){i.target.select();}renderPart(i){let r=i.split("");return d`            
        ${yt(r,o=>d`<sl-input        
                maxLength = "1"
                .value=${o} 
                noSpinButtons
                autocorrect="off"
                autocomplete="off"
                spellcheck="false"
                @paste=${s=>this._onPaste(s)}
                @sl-focus=${this._onPartFocus.bind(this)}
                @sl-input=${this._onPartChange.bind(this)}></sl-input>`)}`}renderInput(){return d`
            <magic-flex grow="none" align="center" gap="0.5em">
                ${yt(this.parts,(i,r)=>d`                    
                        ${this.renderPart(i)}
                        ${Z(r<this.parts.length-1,()=>d`${this.delimiter}`)}
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
        `],exports.AutoFieldParts=x([I("auto-field-parts")],exports.AutoFieldParts);var Aa=_`
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
`;var Qr=class extends V{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let e=["menuitem","menuitemcheckbox"],i=t.composedPath(),r=i.find(c=>{var l;return e.includes(((l=c?.getAttribute)==null?void 0:l.call(c,"role"))||"")});if(!r||i.find(c=>{var l;return ((l=c?.getAttribute)==null?void 0:l.call(c,"role"))==="menu"})!==this)return;let n=r;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),e?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let e=this.getAllItems(),i=this.getCurrentItem(),r=i?e.indexOf(i):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?r++:t.key==="ArrowUp"?r--:t.key==="Home"?r=0:t.key==="End"&&(r=e.length-1),r<0&&(r=e.length-1),r>e.length-1&&(r=0),this.setCurrentItem(e[r]),e[r].focus());}}handleMouseDown(t){let e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var e;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((e=t.getAttribute("role"))!=null?e:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(i=>{i.setAttribute("tabindex",i===t?"0":"-1");});}render(){return d`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Qr.styles=[D,Aa];a([A("slot")],Qr.prototype,"defaultSlot",2);Qr.define("sl-menu");var Oa=_`
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
`;var Qi=(t,e)=>{let i=t._$AN;if(i===void 0)return  false;for(let r of i)r._$AO?.(e,false),Qi(r,e);return  true},Zr=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e;}while(i?.size===0)},Ta=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),Sc(e);}};function wc(t){this._$AN!==void 0?(Zr(this),this._$AM=t,Ta(this)):this._$AM=t;}function Cc(t,e=false,i=0){let r=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(r))for(let s=i;s<r.length;s++)Qi(r[s],false),Zr(r[s]);else r!=null&&(Qi(r,false),Zr(r));else Qi(this,t);}var Sc=t=>{t.type==mt.CHILD&&(t._$AP??=Cc,t._$AQ??=wc);},Jr=class extends Ct{constructor(){super(...arguments),this._$AN=void 0;}_$AT(e,i,r){super._$AT(e,i,r),Ta(this),this.isConnected=e._$AU;}_$AO(e,i=true){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),i&&(Qi(this,e),Zr(this));}setValue(e){if(br(this._$Ct))this._$Ct._$AI(e,this);else {let i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}};var Ra=()=>new Zo,Zo=class{},Qo=new WeakMap,Ia=Vt(class extends Jr{render(t){return X}update(t,[e]){let i=e!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),X}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let e=this.ht??globalThis,i=Qo.get(e);i===void 0&&(i=new WeakMap,Qo.set(e,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?Qo.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var Va=class{constructor(t,e){this.popupRef=Ra(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=i=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${i.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${i.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=i=>{switch(i.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":i.target!==this.host&&(i.preventDefault(),i.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(i);break;}},this.handleClick=i=>{var r;i.target===this.host?(i.preventDefault(),i.stopPropagation()):i.target instanceof Element&&(i.target.tagName==="sl-menu-item"||(r=i.target.role)!=null&&r.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=i=>{i.relatedTarget&&i.relatedTarget instanceof Element&&this.host.contains(i.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=i=>{i.stopPropagation();},this.handlePopupReposition=()=>{let i=this.host.renderRoot.querySelector("slot[name='submenu']"),r=i?.assignedElements({flatten:true}).filter(u=>u.localName==="sl-menu")[0],o=getComputedStyle(this.host).direction==="rtl";if(!r)return;let{left:s,top:n,width:c,height:l}=r.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${o?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${o?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`);},(this.host=t).addController(this),this.hasSlotController=e;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let i=null;for(let r of e.assignedElements())if(i=r.querySelectorAll("sl-menu-item, [role^='menuitem']"),i.length!==0)break;if(!(!i||i.length===0)){i[0].setAttribute("tabindex","0");for(let r=1;r!==i.length;++r)i[r].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?i[0]instanceof HTMLElement&&i[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{i[0]instanceof HTMLElement&&i[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let e=this.host.parentElement.computedStyleMap(),r=["padding-top","border-top-width","margin-top"].reduce((o,s)=>{var n;let c=(n=e.get(s))!=null?n:new CSSUnitValue(0,"px"),u=(c instanceof CSSUnitValue?c:new CSSUnitValue(0,"px")).to("px");return o-u.value},0);this.skidding=r;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?d`
      <sl-popup
        ${Ia(this.popupRef)}
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
    `:d` <slot name="submenu" hidden></slot> `}};var Ot=class extends V{constructor(){super(...arguments),this.localize=new G(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new nt(this,"submenu"),this.submenuController=new Va(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return on(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",e=this.submenuController.isExpanded();return d`
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
        ${this.loading?d` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};Ot.styles=[D,Oa];Ot.dependencies={"sl-icon":U,"sl-popup":K,"sl-spinner":ce};a([A("slot:not([name])")],Ot.prototype,"defaultSlot",2);a([A(".menu-item")],Ot.prototype,"menuItem",2);a([h()],Ot.prototype,"type",2);a([h({type:Boolean,reflect:true})],Ot.prototype,"checked",2);a([h()],Ot.prototype,"value",2);a([h({type:Boolean,reflect:true})],Ot.prototype,"loading",2);a([h({type:Boolean,reflect:true})],Ot.prototype,"disabled",2);a([T("checked")],Ot.prototype,"handleCheckedChange",1);a([T("disabled")],Ot.prototype,"handleDisabledChange",1);a([T("type")],Ot.prototype,"handleTypeChange",1);Ot.define("sl-menu-item");var Pa=_`
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
`;var Jo=()=>null,Tt=class extends V{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new G(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=Jo,this.snapThreshold=12;}toSnapFunction(t){let e=t.split(" ");return ({pos:i,size:r,snapThreshold:o,isRtl:s,vertical:n})=>{let c=i,l=Number.POSITIVE_INFINITY;return e.forEach(u=>{let f;if(u.startsWith("repeat(")){let m=t.substring(7,t.length-1),g=m.endsWith("%"),b=Number.parseFloat(m),v=g?r*(b/100):b;f=Math.round((s&&!n?r-i:i)/v)*v;}else u.endsWith("%")?f=r*(Number.parseFloat(u)/100):f=Number.parseFloat(u);s&&!n&&(f=r-f);let p=Math.abs(i-f);p<=o&&p<l&&(c=f,l=p);}),c}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=Jo;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:e}=this.getBoundingClientRect();this.size=this.vertical?e:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let e=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),pi(this,{onMove:(i,r)=>{var o;let s=this.vertical?r:i;this.primary==="end"&&(s=this.size-s),s=(o=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:e,vertical:this.vertical}))!=null?o:s,this.position=at(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let e=this.position,i=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(e-=i),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(e+=i),t.key==="Home"&&(e=this.primary==="end"?100:0),t.key==="End"&&(e=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)e=this.positionBeforeCollapsing,this.isCollapsed=false;else {let r=this.position;e=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=r;});}this.position=at(e,0,100);}}handleResize(t){let{width:e,height:i}=t[0].contentRect;this.size=this.vertical?i:e,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",e=this.vertical?"gridTemplateColumns":"gridTemplateRows",i=this.localize.dir()==="rtl",r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,o="auto";return this.primary==="end"?i&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${r}`:i&&!this.vertical?this.style[t]=`${o} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${o}`,this.style[e]="",d`
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
    `}};Tt.styles=[D,Pa];a([A(".divider")],Tt.prototype,"divider",2);a([h({type:Number,reflect:true})],Tt.prototype,"position",2);a([h({attribute:"position-in-pixels",type:Number})],Tt.prototype,"positionInPixels",2);a([h({type:Boolean,reflect:true})],Tt.prototype,"vertical",2);a([h({type:Boolean,reflect:true})],Tt.prototype,"disabled",2);a([h()],Tt.prototype,"primary",2);a([h({reflect:true})],Tt.prototype,"snap",1);a([h({type:Number,attribute:"snap-threshold"})],Tt.prototype,"snapThreshold",2);a([T("position")],Tt.prototype,"handlePositionChange",1);a([T("positionInPixels")],Tt.prototype,"handlePositionInPixelsChange",1);a([T("vertical")],Tt.prototype,"handleVerticalChange",1);Tt.define("sl-split-panel");Xt.define("sl-tag");exports.AutoFieldList=class Be extends R{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.items=[];this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}connectedCallback(){if(super.connectedCallback(),this.options){this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let i=this.options.select;i&&(this.items=i,this.items.forEach(r=>{this.isItemSelected(r)&&this.selection.push(r[this.valueKey]);})),this.setPresetActions();}this.style.height="auto";}isItemSelected(i){return this.value===void 0?false:this.options.multiple===false?this.value===i[this.valueKey]:this.value.includes(i[this.valueKey])}_addSecectItem(i){this.selection.findIndex(o=>o[this.valueKey]===i[this.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(i[this.valueKey]));}_removeSelectItem(i){for(let r=this.selection.length-1;r>=0;r--)this.selection[r]===i&&this.selection.splice(r,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(i){let r=i.detail.item,o=r.dataset.index,s=this.items[o];s&&(r.checked?this._addSecectItem(s):this._removeSelectItem(s[this.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.length}`,this.onFieldChange());}_renderWithSplitPanel(i){return this.options.showResults?d`<sl-split-panel position="60">
                ${i}
                ${this.renderResults()}
            </sl-split-panel>`:i}_getItemLabel(i,r){return r?d`${Mt(r.replace(/\{(.+?)\}/g,(o,s)=>i[s]))}`:i.label}_onClickPresetAction(i){i==="all"?this.selection=this.items.map(r=>r[this.valueKey]):i==="reverse"?this.selection=this.items.filter(r=>!this.selection.includes(r[this.valueKey])).map(r=>r[this.valueKey]):i==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let i=[{id:"all",label:"\u5168\u9009",size:"small",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",size:"small",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",size:"small",onClick:()=>this._onClickPresetAction("clear")}],r=o=>{for(let s=i.length-1;s>=0;s--)if(i[s].id===o.id){let n=o.onClick;o.onClick=()=>{i[s].onClick(),n&&n.call(this,this.getInputValue());},i.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(o=>{r(o);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(o=>{r(o);}),i.length>0&&(this.afterActions||(this.afterActions=[]),this.afterActions.push(...i));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(i){let r=this.options.labelKey;if(r){if(r in i)return i[r]}else return i.label}renderResults(){return d`<div slot="end" 
            class="results mark-err" 
            no-padding 
            style="${J({maxHeight:this.options.height})}">
            ${yt(this.selection,i=>d`<div class="item" >
                    <span>${i}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(i)}></sl-icon-button>
                </div>`)}
        </div>`}_renderList(){let i=Array.isArray(this.value)?this.value:[this.value],r=this.options.itemTemplate;return d`${this._renderWithSplitPanel(d`
            <sl-menu slot="start" class="mark-err" style=${J({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}>
            ${yt(this.items,(o,s)=>{let n=i.includes(o[this.valueKey]);return d`<sl-menu-item 
                        type="checkbox"                
                        data-index=${String(s)} 
                        .checked=${n}
                    >                
                        <auto-box no-border no-padding flex="row" grow="first" style="width:100%;">
                            ${this._getItemLabel(o,r)}
                        </auto-box>
                    </sl-menu-item>`})}
            </sl-menu>`)} `}_renderHeader(){return d`${Z(this.beforeActions.length>0,()=>d`<div class="header">
                ${this.renderBeforeActions()}
            </div>`)}`}_renderFooter(){return d`<div class="footer">
            ${this.renderAfterActions()}            
            <span class="detail">
                ${this.selection.length}/${this.items.length}
            </span>
        </div>`}renderInput(){return d`
            ${this._renderHeader()}            
            ${this._renderList()}
            ${this._renderFooter()}
        `}};exports.AutoFieldList.styles=[R.styles,_`
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
            
        `],x([O()],exports.AutoFieldList.prototype,"selectedTips",2),x([A("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=x([I("auto-field-list")],exports.AutoFieldList);var La=_`
  :host {
    display: inline-block;
  }
`;var Da=null,to=class{};to.render=function(t,e){Da(t,e);};self.QrCreator=to;(function(t){function e(c,l,u,f){var p={},m=t(u,l);m.u(c),m.J(),f=f||0;var g=m.h(),b=m.h()+2*f;return p.text=c,p.level=l,p.version=u,p.O=b,p.a=function(v,E){return v-=f,E-=f,0>v||v>=g||0>E||E>=g?false:m.a(v,E)},p}function i(c,l,u,f,p,m,g,b,v,E){function k(w,$,y,S,M,B,N){w?(c.lineTo($+B,y+N),c.arcTo($,y,S,M,m)):c.lineTo($,y);}g?c.moveTo(l+m,u):c.moveTo(l,u),k(b,f,u,f,p,-m,0),k(v,f,p,l,p,0,-m),k(E,l,p,l,u,m,0),k(g,l,u,f,u,0,m);}function r(c,l,u,f,p,m,g,b,v,E){function k(w,$,y,S){c.moveTo(w+y,$),c.lineTo(w,$),c.lineTo(w,$+S),c.arcTo(w,$,w+y,$,m);}g&&k(l,u,m,m),b&&k(f,u,-m,m),v&&k(f,p,-m,-m),E&&k(l,p,m,-m);}function o(c,l){var u=l.fill;if(typeof u=="string")c.fillStyle=u;else {var f=u.type,p=u.colorStops;if(u=u.position.map(g=>Math.round(g*l.size)),f==="linear-gradient")var m=c.createLinearGradient.apply(c,u);else if(f==="radial-gradient")m=c.createRadialGradient.apply(c,u);else throw Error("Unsupported fill");p.forEach(([g,b])=>{m.addColorStop(g,b);}),c.fillStyle=m;}}function s(c,l){t:{var u=l.text,f=l.v,p=l.N,m=l.K,g=l.P;for(p=Math.max(1,p||1),m=Math.min(40,m||40);p<=m;p+=1)try{var b=e(u,f,p,g);break t}catch{}b=void 0;}if(!b)return null;for(u=c.getContext("2d"),l.background&&(u.fillStyle=l.background,u.fillRect(l.left,l.top,l.size,l.size)),f=b.O,m=l.size/f,u.beginPath(),g=0;g<f;g+=1)for(p=0;p<f;p+=1){var v=u,E=l.left+p*m,k=l.top+g*m,w=g,$=p,y=b.a,S=E+m,M=k+m,B=w-1,N=w+1,z=$-1,P=$+1,lt=Math.floor(Math.min(.5,Math.max(0,l.R))*m),ot=y(w,$),bt=y(B,z),xt=y(B,$);B=y(B,P);var vt=y(w,P);P=y(N,P),$=y(N,$),N=y(N,z),w=y(w,z),E=Math.round(E),k=Math.round(k),S=Math.round(S),M=Math.round(M),ot?i(v,E,k,S,M,lt,!xt&&!w,!xt&&!vt,!$&&!vt,!$&&!w):r(v,E,k,S,M,lt,xt&&w&&bt,xt&&vt&&B,$&&vt&&P,$&&w&&N);}return o(u,l),u.fill(),c}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Da=function(c,l){var u={};Object.assign(u,n,c),u.N=u.minVersion,u.K=u.maxVersion,u.v=u.ecLevel,u.left=u.left,u.top=u.top,u.size=u.size,u.fill=u.fill,u.background=u.background,u.text=u.text,u.R=u.radius,u.P=u.quiet,l instanceof HTMLCanvasElement?((l.width!==u.size||l.height!==u.size)&&(l.width=u.size,l.height=u.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,u)):(c=document.createElement("canvas"),c.width=u.size,c.height=u.size,u=s(c,u),l.appendChild(u));};})(function(){function t(l){var u=i.s(l);return {S:function(){return 4},b:function(){return u.length},write:function(f){for(var p=0;p<u.length;p+=1)f.put(u[p],8);}}}function e(){var l=[],u=0,f={B:function(){return l},c:function(p){return (l[Math.floor(p/8)]>>>7-p%8&1)==1},put:function(p,m){for(var g=0;g<m;g+=1)f.m((p>>>m-g-1&1)==1);},f:function(){return u},m:function(p){var m=Math.floor(u/8);l.length<=m&&l.push(0),p&&(l[m]|=128>>>u%8),u+=1;}};return f}function i(l,u){function f(w,$){for(var y=-1;7>=y;y+=1)if(!(-1>=w+y||b<=w+y))for(var S=-1;7>=S;S+=1) -1>=$+S||b<=$+S||(g[w+y][$+S]=0<=y&&6>=y&&(S==0||S==6)||0<=S&&6>=S&&(y==0||y==6)||2<=y&&4>=y&&2<=S&&4>=S);}function p(w,$){for(var y=b=4*l+17,S=Array(y),M=0;M<y;M+=1){S[M]=Array(y);for(var B=0;B<y;B+=1)S[M][B]=null;}for(g=S,f(0,0),f(b-7,0),f(0,b-7),y=s.G(l),S=0;S<y.length;S+=1)for(M=0;M<y.length;M+=1){B=y[S];var N=y[M];if(g[B][N]==null)for(var z=-2;2>=z;z+=1)for(var P=-2;2>=P;P+=1)g[B+z][N+P]=z==-2||z==2||P==-2||P==2||z==0&&P==0;}for(y=8;y<b-8;y+=1)g[y][6]==null&&(g[y][6]=y%2==0);for(y=8;y<b-8;y+=1)g[6][y]==null&&(g[6][y]=y%2==0);for(y=s.w(m<<3|$),S=0;15>S;S+=1)M=!w&&(y>>S&1)==1,g[6>S?S:8>S?S+1:b-15+S][8]=M,g[8][8>S?b-S-1:9>S?15-S:14-S]=M;if(g[b-8][8]=!w,7<=l){for(y=s.A(l),S=0;18>S;S+=1)M=!w&&(y>>S&1)==1,g[Math.floor(S/3)][S%3+b-8-3]=M;for(S=0;18>S;S+=1)M=!w&&(y>>S&1)==1,g[S%3+b-8-3][Math.floor(S/3)]=M;}if(v==null){for(w=c.I(l,m),y=e(),S=0;S<E.length;S+=1)M=E[S],y.put(4,4),y.put(M.b(),s.f(4,l)),M.write(y);for(S=M=0;S<w.length;S+=1)M+=w[S].j;if(y.f()>8*M)throw Error("code length overflow. ("+y.f()+">"+8*M+")");for(y.f()+4<=8*M&&y.put(0,4);y.f()%8!=0;)y.m(false);for(;!(y.f()>=8*M)&&(y.put(236,8),!(y.f()>=8*M));)y.put(17,8);var lt=0;for(M=S=0,B=Array(w.length),N=Array(w.length),z=0;z<w.length;z+=1){var ot=w[z].j,bt=w[z].o-ot;for(S=Math.max(S,ot),M=Math.max(M,bt),B[z]=Array(ot),P=0;P<B[z].length;P+=1)B[z][P]=255&y.B()[P+lt];for(lt+=ot,P=s.C(bt),ot=r(B[z],P.b()-1).l(P),N[z]=Array(P.b()-1),P=0;P<N[z].length;P+=1)bt=P+ot.b()-N[z].length,N[z][P]=0<=bt?ot.c(bt):0;}for(P=y=0;P<w.length;P+=1)y+=w[P].o;for(y=Array(y),P=lt=0;P<S;P+=1)for(z=0;z<w.length;z+=1)P<B[z].length&&(y[lt]=B[z][P],lt+=1);for(P=0;P<M;P+=1)for(z=0;z<w.length;z+=1)P<N[z].length&&(y[lt]=N[z][P],lt+=1);v=y;}for(w=v,y=-1,S=b-1,M=7,B=0,$=s.F($),N=b-1;0<N;N-=2)for(N==6&&--N;;){for(z=0;2>z;z+=1)g[S][N-z]==null&&(P=false,B<w.length&&(P=(w[B]>>>M&1)==1),$(S,N-z)&&(P=!P),g[S][N-z]=P,--M,M==-1&&(B+=1,M=7));if(S+=y,0>S||b<=S){S-=y,y=-y;break}}}var m=o[u],g=null,b=0,v=null,E=[],k={u:function(w){w=t(w),E.push(w),v=null;},a:function(w,$){if(0>w||b<=w||0>$||b<=$)throw Error(w+","+$);return g[w][$]},h:function(){return b},J:function(){for(var w=0,$=0,y=0;8>y;y+=1){p(true,y);var S=s.D(k);(y==0||w>S)&&(w=S,$=y);}p(false,$);}};return k}function r(l,u){if(typeof l.length>"u")throw Error(l.length+"/"+u);var f=function(){for(var m=0;m<l.length&&l[m]==0;)m+=1;for(var g=Array(l.length-m+u),b=0;b<l.length-m;b+=1)g[b]=l[b+m];return g}(),p={c:function(m){return f[m]},b:function(){return f.length},multiply:function(m){for(var g=Array(p.b()+m.b()-1),b=0;b<p.b();b+=1)for(var v=0;v<m.b();v+=1)g[b+v]^=n.i(n.g(p.c(b))+n.g(m.c(v)));return r(g,0)},l:function(m){if(0>p.b()-m.b())return p;for(var g=n.g(p.c(0))-n.g(m.c(0)),b=Array(p.b()),v=0;v<p.b();v+=1)b[v]=p.c(v);for(v=0;v<m.b();v+=1)b[v]^=n.i(n.g(m.c(v))+g);return r(b,0).l(m)}};return p}i.s=function(l){for(var u=[],f=0;f<l.length;f++){var p=l.charCodeAt(f);128>p?u.push(p):2048>p?u.push(192|p>>6,128|p&63):55296>p||57344<=p?u.push(224|p>>12,128|p>>6&63,128|p&63):(f++,p=65536+((p&1023)<<10|l.charCodeAt(f)&1023),u.push(240|p>>18,128|p>>12&63,128|p>>6&63,128|p&63));}return u};var o={L:1,M:0,Q:3,H:2},s=function(){function l(p){for(var m=0;p!=0;)m+=1,p>>>=1;return m}var u=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],f={w:function(p){for(var m=p<<10;0<=l(m)-l(1335);)m^=1335<<l(m)-l(1335);return (p<<10|m)^21522},A:function(p){for(var m=p<<12;0<=l(m)-l(7973);)m^=7973<<l(m)-l(7973);return p<<12|m},G:function(p){return u[p-1]},F:function(p){switch(p){case 0:return function(m,g){return (m+g)%2==0};case 1:return function(m){return m%2==0};case 2:return function(m,g){return g%3==0};case 3:return function(m,g){return (m+g)%3==0};case 4:return function(m,g){return (Math.floor(m/2)+Math.floor(g/3))%2==0};case 5:return function(m,g){return m*g%2+m*g%3==0};case 6:return function(m,g){return (m*g%2+m*g%3)%2==0};case 7:return function(m,g){return (m*g%3+(m+g)%2)%2==0};default:throw Error("bad maskPattern:"+p)}},C:function(p){for(var m=r([1],0),g=0;g<p;g+=1)m=m.multiply(r([1,n.i(g)],0));return m},f:function(p,m){if(p!=4||1>m||40<m)throw Error("mode: "+p+"; type: "+m);return 10>m?8:16},D:function(p){for(var m=p.h(),g=0,b=0;b<m;b+=1)for(var v=0;v<m;v+=1){for(var E=0,k=p.a(b,v),w=-1;1>=w;w+=1)if(!(0>b+w||m<=b+w))for(var $=-1;1>=$;$+=1)0>v+$||m<=v+$||(w!=0||$!=0)&&k==p.a(b+w,v+$)&&(E+=1);5<E&&(g+=3+E-5);}for(b=0;b<m-1;b+=1)for(v=0;v<m-1;v+=1)E=0,p.a(b,v)&&(E+=1),p.a(b+1,v)&&(E+=1),p.a(b,v+1)&&(E+=1),p.a(b+1,v+1)&&(E+=1),(E==0||E==4)&&(g+=3);for(b=0;b<m;b+=1)for(v=0;v<m-6;v+=1)p.a(b,v)&&!p.a(b,v+1)&&p.a(b,v+2)&&p.a(b,v+3)&&p.a(b,v+4)&&!p.a(b,v+5)&&p.a(b,v+6)&&(g+=40);for(v=0;v<m;v+=1)for(b=0;b<m-6;b+=1)p.a(b,v)&&!p.a(b+1,v)&&p.a(b+2,v)&&p.a(b+3,v)&&p.a(b+4,v)&&!p.a(b+5,v)&&p.a(b+6,v)&&(g+=40);for(v=E=0;v<m;v+=1)for(b=0;b<m;b+=1)p.a(b,v)&&(E+=1);return g+=Math.abs(100*E/m/m-50)/5*10}};return f}(),n=function(){for(var l=Array(256),u=Array(256),f=0;8>f;f+=1)l[f]=1<<f;for(f=8;256>f;f+=1)l[f]=l[f-4]^l[f-5]^l[f-6]^l[f-8];for(f=0;255>f;f+=1)u[l[f]]=f;return {g:function(p){if(1>p)throw Error("glog("+p+")");return u[p]},i:function(p){for(;0>p;)p+=255;for(;256<=p;)p-=255;return l[p]}}}(),c=function(){function l(p,m){switch(m){case o.L:return u[4*(p-1)];case o.M:return u[4*(p-1)+1];case o.Q:return u[4*(p-1)+2];case o.H:return u[4*(p-1)+3]}}var u=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],f={I:function(p,m){var g=l(p,m);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+p+"/errorCorrectLevel:"+m);p=g.length/3,m=[];for(var b=0;b<p;b+=1)for(var v=g[3*b],E=g[3*b+1],k=g[3*b+2],w=0;w<v;w+=1){var $=k,y={};y.o=E,y.j=$,m.push(y);}return m}};return f}();return i}());var Ma=QrCreator;var Nt=class extends V{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&Ma.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return d`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${J({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Nt.styles=[D,La];a([A("canvas")],Nt.prototype,"canvas",2);a([h()],Nt.prototype,"value",2);a([h()],Nt.prototype,"label",2);a([h({type:Number})],Nt.prototype,"size",2);a([h()],Nt.prototype,"fill",2);a([h()],Nt.prototype,"background",2);a([h({type:Number})],Nt.prototype,"radius",2);a([h({attribute:"error-correction"})],Nt.prototype,"errorCorrection",2);a([T(["background","errorCorrection","fill","radius","size","value"])],Nt.prototype,"generate",1);Nt.define("sl-qr-code");exports.AutoFieldQRCode=class eo extends R{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return d`              
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
        `}};exports.AutoFieldQRCode=x([I("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class Fe extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let i=this.options.url,[r,o]=i.split("?"),s=new URLSearchParams(o);return s.set("t",Date.now().toString()),`${r}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return d`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,_`
            sl-button.action-widget.image::part(label){
                padding: 0px;
            }
        `],x([A("img")],exports.AutoFieldCaptcha.prototype,"img",2),x([O()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=x([I("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class We extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let i=this.stepCount,r=()=>{let o=Math.ceil(i*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",o.toString()),this.requestUpdate()),i--,i<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(r,this.step);};r();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let i=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(i)?Number(i[0]):Number(i),this.step=Array.isArray(i)?Number(i[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u8BD5");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles,_`
            
        `],x([O()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),x([O()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=x([I("auto-field-verifycode")],exports.AutoFieldVerifyCode);var za=_`
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
`;var it=class ts extends V{constructor(){super(...arguments),this.localize=new G(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await le(this.childrenContainer);let{keyframes:e,options:i}=ne(this,"tree-item.collapse",{dir:this.localize.dir()});await ae(this.childrenContainer,Wo(e,this.childrenContainer.scrollHeight),i),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let e=this.parentElement;return !!e&&ts.isTreeItem(e)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await le(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:e,options:i}=ne(this,"tree-item.expand",{dir:this.localize.dir()});await ae(this.childrenContainer,Wo(e,this.childrenContainer.scrollHeight),i),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:e=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(i=>ts.isTreeItem(i)&&(e||!i.disabled)):[]}render(){let e=this.localize.dir()==="rtl",i=!this.loading&&(!this.isLeaf||this.lazy);return d`
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
            ${Z(this.loading,()=>d` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${Z(this.selectable,()=>d`
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
                ?checked="${Pt(this.selected)}"
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
    `}};it.styles=[D,za];it.dependencies={"sl-checkbox":rt,"sl-icon":U,"sl-spinner":ce};a([O()],it.prototype,"indeterminate",2);a([O()],it.prototype,"isLeaf",2);a([O()],it.prototype,"loading",2);a([O()],it.prototype,"selectable",2);a([h({type:Boolean,reflect:true})],it.prototype,"expanded",2);a([h({type:Boolean,reflect:true})],it.prototype,"selected",2);a([h({type:Boolean,reflect:true})],it.prototype,"disabled",2);a([h({type:Boolean,reflect:true})],it.prototype,"lazy",2);a([A("slot:not([name])")],it.prototype,"defaultSlot",2);a([A("slot[name=children]")],it.prototype,"childrenSlot",2);a([A(".tree-item__item")],it.prototype,"itemElement",2);a([A(".tree-item__children")],it.prototype,"childrenContainer",2);a([A(".tree-item__expand-button slot")],it.prototype,"expandButtonSlot",2);a([T("loading",{waitUntilFirstUpdate:true})],it.prototype,"handleLoadingChange",1);a([T("disabled")],it.prototype,"handleDisabledChange",1);a([T("selected")],it.prototype,"handleSelectedChange",1);a([T("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandedChange",1);a([T("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandAnimation",1);a([T("lazy",{waitUntilFirstUpdate:true})],it.prototype,"handleLazyChange",1);var Ne=it;se("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});se("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var Ha=_`
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
`;function Ba(t,e=false){function i(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let c=n.every(u=>u.selected),l=n.every(u=>!u.selected&&!u.indeterminate);s.selected=c,s.indeterminate=!c&&!l;}}function r(s){let n=s.parentElement;Ne.isTreeItem(n)&&(i(n),r(n));}function o(s){for(let n of s.getChildrenItems())n.selected=e?s.selected||n.selected:!n.disabled&&s.selected,o(n);e&&i(s);}o(t),r(t);}var Se=class extends V{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new G(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{let i=t.querySelector(`[slot="${e}-icon"]`),r=this.getExpandButtonIcon(e);r&&(i===null?t.append(r):i.hasAttribute("data-default")&&i.replaceWith(r));});},this.handleTreeChanged=t=>{for(let e of t){let i=[...e.addedNodes].filter(Ne.isTreeItem),r=[...e.removedNodes].filter(Ne.isTreeItem);i.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),Ne.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let i=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(i){let r=i.cloneNode(true);return [r,...r.querySelectorAll("[id]")].forEach(o=>o.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${t}-icon`,r}return null}selectItem(t){let e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),Ba(t);else if(this.selection==="single"||t.isLeaf){let r=this.getAllTreeItems();for(let o of r)o.selected=o===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let i=this.selectedItems;(e.length!==i.length||i.some(r=>!e.includes(r)))&&Promise.all(i.map(r=>r.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:i}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(o=>{var s;return ["input","textarea"].includes((s=o?.tagName)==null?void 0:s.toLowerCase())}))return;let e=this.getFocusableItems(),i=this.localize.dir()==="ltr",r=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();let o=e.findIndex(l=>l.matches(":focus")),s=e[o],n=l=>{let u=e[at(l,0,e.length-1)];this.focusItem(u);},c=l=>{s.expanded=l;};t.key==="ArrowDown"?n(o+1):t.key==="ArrowUp"?n(o-1):i&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(o+1):c(true):i&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(o-1):c(false):t.key==="Home"?n(0):t.key==="End"?n(e.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let e=t.target,i=e.closest("sl-tree-item"),r=t.composedPath().some(o=>{var s;return (s=o?.classList)==null?void 0:s.contains("tree-item__expand-button")});!i||i.disabled||e!==this.clickTarget||(r?i.expanded=!i.expanded:this.selectItem(i));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let i of e)i.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(i=>Ba(i,true)));}get selectedItems(){let t=this.getAllTreeItems(),e=i=>i.selected;return t.filter(e)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(i=>{var r;if(i.disabled)return  false;let o=(r=i.parentElement)==null?void 0:r.closest("[role=treeitem]");return o&&(!o.expanded||o.loading||e.has(o))&&e.add(i),!e.has(i)})}render(){return d`
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
    `}};Se.styles=[D,Ha];a([A("slot:not([name])")],Se.prototype,"defaultSlot",2);a([A("slot[name=expand-icon]")],Se.prototype,"expandedIconSlot",2);a([A("slot[name=collapse-icon]")],Se.prototype,"collapsedIconSlot",2);a([h()],Se.prototype,"selection",2);a([T("selection")],Se.prototype,"handleSelectionChange",1);Se.define("sl-tree");Ne.define("sl-tree-item");exports.AutoFieldTreeSelect=class ke extends R{constructor(){super(...arguments);this.nodes={};this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}connectedCallback(){if(super.connectedCallback(),this.options){this.idKey=this.options.idKey,this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let i=this.options.items;i&&(this.nodes=i,this._forEachTree((r,o,s,n)=>{s<1&&r.expanded===void 0&&(r.expanded=true),this.isItemSelected(r)&&(r.selected=true,this.selection.push({id:r[this.idKey],value:r[this.valueKey],path:n.join("/")}));}));}}isItemSelected(i){return this.value===void 0?false:this.options.multiple===false?this.value===i[this.valueKey]:this.value.includes(i[this.valueKey])}getStateValue(){let i=super.getStateValue();return this.options.multiple?Array.isArray(i)?i:[i]:i}_forEachTree(i){let r=(s,n,c,l)=>{let u=[...l,s[this.labelKey]];if(i(s,n,c,u),s.children){let f=c+1;s.children.forEach(p=>{r(p,s,f,[...u]);});}};(Array.isArray(this.nodes)?this.nodes:[this.nodes]).forEach(s=>{r(s,void 0,0,[]);});}_renderNode(i,r,o){let s=r.includes(i[this.valueKey]),n=[...o,i[this.labelKey]];return d`<sl-tree-item 
            data-id=${String(i[this.idKey])}
            data-value=${String(i[this.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${i.expanded}
        >${i.label}        
        ${Array.isArray(i.children)?d`${i.children.map(c=>this._renderNode(c,r,n))}`:""}</sl-tree-item>`}_renderNodes(i){let r=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(i)?i.map(o=>this._renderNode(o,r,[])):this._renderNode(i,r,[])}onSelectionChange(i){let r=Array.from(i.detail.selection);r&&(this.selection=r.map(o=>({id:o.dataset.id,value:o.dataset.value,path:o.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(i=>i.value):this.selection.length>0?this.selection[0].value:void 0}renderTree(){return d`
        <sl-tree 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}   
            size=${this.context.size}
            selection = "${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
            @sl-selection-change=${this.onSelectionChange.bind(this)}
        >${this._renderNodes(this.nodes)}</sl-tree> 
        `}renderInput(){return d`              
            ${this.renderTree()}
        `}};exports.AutoFieldTreeSelect.styles=[R.styles,_`
            sl-tree{
                padding: 0.2em;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
            }
    `],exports.AutoFieldTreeSelect=x([I("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class je extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(i){let r=i.target.dataset.id;for(let o=0;o<this.selection.length;o++)if(String(this.selection[o].id)===r){this.selection.splice(o,1),this.onFieldChange(),this.requestUpdate();break}i.stopPropagation();}getShowItemValue(i,r,o){if(r===o)return i}getSelectedTagValue(i){if(this.options.showAsPath)return d`${i.path}`;{let o=i.path.split("/");return o[o.length-1]}}renderSelectedTags(){let i=this.selection;return d`<span class="tags">${yt(i,r=>d`<sl-tag 
                    data-id="${r.id}" 
                    title=${r.path}
                    @sl-remove=${this._onRemoveSelection.bind(this)}
                    @click=${o=>o.stopPropagation()}
                    removable
                    >${this.getSelectedTagValue(r)}</sl-tag>`)}</span>`}renderSelection(){return d`    
            <div class="selection" slot="trigger">              
                ${Z(this.selection.length===0&&this.options.placeholder,()=>d`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderSelectedTags()}
                <span class='suffix'>
                    <sl-icon library="system" class="chevron ${L({active:this.active})}" 
                        name="chevron-down" aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}renderInput(){return d`             
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
        `],x([O()],exports.AutoFieldTreeDropdown.prototype,"active",2),x([A("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=x([I("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);exports.AutoFieldCustom=class Ue extends R{constructor(){super(...arguments);this.selection=[];this.active=false;this.content=null;}getInitialOptions(){return {placeholder:"\u8BF7\u9009\u62E9",dropdown:false}}connectedCallback(){super.connectedCallback(),this.content=this.ownerDocument.querySelector(this.options.content),this.customValue=this.value,this._onCustomInput();}disconnectedCallback(){super.disconnectedCallback(),this.content&&(this.content.style.display="none",this.ownerDocument.body.appendChild(this.content));}_onShowPopup(){this.content&&(this.container?.appendChild(this.content),this.content.style.display="block"),this.active=true;}_onHidePopup(){this.active=false;}_onCustomInput(){this.content?.addEventListener("auto-input",i=>{this.customValue=i.detail.value,this.onFieldInput();});}firstUpdated(){if(this.content&&!this.options.dropdown){let i=this.shadow.querySelector(".value");i&&i.appendChild(this.content),this.content.style.display="block";}}getInputValue(){return this.customValue}renderCustomValue(){return d`<span class="custom-value">${Mt(this.options.toRender?this.options.toRender(this.customValue):this.customValue)}</span>`}renderSelection(){return d`    
            <div class="selection" slot="trigger">              
                ${Z(!this.customValue&&this.options.placeholder,()=>d`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderCustomValue()}
                <span class='suffix'>
                    <sl-icon library="system" 
                        class="chevron ${L({active:this.active})}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}renderCustom(){return d`<div class="container"></div>`}renderInput(){return this.options.dropdown?d`
                <sl-dropdown          
                    size="${this.context.size}"    
                    @sl-show="${this._onShowPopup.bind(this)}" 
                    @sl-after-hide="${this._onHidePopup.bind(this)}" 
                    sync="width"
                >
                ${this.renderSelection()}  
                ${this.renderCustom()}      
            </sl-dropdown> 
            `:d``}};exports.AutoFieldCustom.styles=[R.styles,_`
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
        `],x([O()],exports.AutoFieldCustom.prototype,"active",2),x([A(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=x([I("auto-field-custom")],exports.AutoFieldCustom);function io(t,e){let i=t.width,r=t.height,o=t.widget,s;try{s=document.createElement(`auto-field-${o||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=t,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),e?.styles&&Object.assign(s.style,e.styles),e?.attrs){for(let n in e.attrs)s.setAttribute(n,String(e.attrs[n]));s.parent=e.parent;}return i&&(s.style.width=String(i)),r&&(s.style.height=String(r)),e?.classs&&(typeof e.classs=="string"?s.classList.add(e.classs):typeof e.classs=="object"&&Object.entries(e.classs).forEach(([n,c])=>{c?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class Zi extends R{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange();};}getInitialOptions(){return {children:[]}}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("field-change",this._handleChildrenChange);}_onChildrenChange(){this.options.children.length>0&&this.shadow.addEventListener("field-change",this._handleChildrenChange);}getInputValue(){let i=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),r=[];return i.forEach(o=>{if(o.tagName.startsWith("AUTO-FIELD-")){let s=o.getInputValue();s===""&&(s=o.value),r.push(s);}}),r}renderInput(){return d`
            <div class="children">
                ${yt(this.options.children,i=>d`${io(i,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[R.styles,_`
            .value > .children{
                display: flex;
                flex-wrap: wrap;
            }
        `],exports.AutoFieldCombine=x([I("auto-field-combine")],exports.AutoFieldCombine);q.define("sl-button");H.define("sl-input");var Fa=_`
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
`;var Ji=class extends V{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};Ji.styles=[D,Fa];a([h({type:Boolean,reflect:true})],Ji.prototype,"vertical",2);a([T("vertical")],Ji.prototype,"handleVerticalChange",1);Ji.define("sl-divider");ct.define("sl-dropdown");ce.define("sl-spinner");U.define("sl-icon");function ss(t,e){return t.length>e.length?false:t.every((i,r)=>i===e[r])}(t=>typeof $e<"u"?$e:typeof Proxy<"u"?new Proxy(t,{get:(e,i)=>(typeof $e<"u"?$e:e)[i]}):t)(function(t){if(typeof $e<"u")return $e.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var Xa=_`
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

`;var It=class extends wt{constructor(){super(...arguments);this.classes=new ye(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let i=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=i,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(r=>{r.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(r=>{r.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(i,r,o){super.attributeChangedCallback(i,r,o),this.updateStyles();}render(){return d` 
            <slot ></slot> 
        `}};It.styles=Xa,x([h({type:String})],It.prototype,"direction",2),x([h({type:String})],It.prototype,"gap",2),x([h({type:Boolean})],It.prototype,"wrap",2),x([h({type:String})],It.prototype,"align",2),x([h({type:String})],It.prototype,"justify",2),x([h({type:String})],It.prototype,"border",2),x([h({type:String})],It.prototype,"grow",2),x([h({type:String})],It.prototype,"shrink",2),x([h({type:Boolean,reflect:true})],It.prototype,"fit",2),It=x([I("magic-flex")],It);var Qa=_`
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
    
}`;var Za=_`
    ${Qa}
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
    
`;var as={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>'};exports.AutoForm=class tt extends wt{constructor(){super(...arguments);this.classs=new ye(this);this.theme=new Je(this);this.seq=++exports.AutoForm.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this._loading=false;this.iconLibrary="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg";}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}registerIcons(i,r){Ao("default",{resolver:i,...r||{}});}connectedCallback(){super.connectedCallback(),this.registerIcons(i=>i in as?`data:image/svg+xml,${encodeURIComponent(as[i])}`:this.iconLibrary.replace("{name}",i));}attributeChangedCallback(i,r,o){super.attributeChangedCallback(i,r,o),["group","sort","advanced","path"].includes(i)&&setTimeout(()=>this._load());}_initialContext(){Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit});}_isValid(){if(this.path){let i=this.store.schemas.errors||{};return Object.keys(i).some(r=>ss(this.path.split("."),r.split(".")))}else return Object.keys(this.store.schemas.errors).length>0}_load(i=true){if(this.store&&!this._loading)try{this._initialContext();let r=this.path?this.store.schemas.find(this.path):Object.values(this.store.schemas.store.state),o=s=>{if(!this.group||["","*"].includes(this.group))return !0;let n=(s.group||"").split(","),c=this.group.split(",");return n.some(l=>c.includes(l))};this.schemas=Object.values(r).filter(s=>!(!o(s)||this.advanced===!1&&s.advanced)).sort((s,n)=>(s.order||0)-(n.order||0)),i&&this.requestUpdate();}finally{this._loading=false;}}bind(i){this.store=i,this._load();}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(r=>{r.tagName.startsWith("auto-field")&&(r.invalidMessage=void 0);}),this.requestUpdate();}_renderFields(){return d`            
                ${this.schemas.map(i=>d`${io(i)}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),d`            
            <div class="actions header"></div>
            <div class="fields">
                ${this._renderFields()}
            </div>
            <div class="actions footer"></div>
        `}reset(){this.store?.reset(),this._initialContext(),ti(this,"dirty",false),ti(this,"invalid",false);}submit(i){if(typeof i=="function"){let r=this.store?.schemas.getValues()||{},o=this.store?.schemas.errors;i(r,o);}}};exports.AutoForm.seq=0,exports.AutoForm.styles=Za,x([xo({context:gr})],exports.AutoForm.prototype,"context",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"validAtInit",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"group",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"path",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"compact",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"advanced",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"validAt",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"border",2),x([h({type:String})],exports.AutoForm.prototype,"size",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"labelPos",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"labelWidth",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"dark",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"readonly",2),x([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"viewonly",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"viewAlign",2),x([h({type:String,reflect:true})],exports.AutoForm.prototype,"layout",2),x([h({type:String})],exports.AutoForm.prototype,"iconLibrary",2),exports.AutoForm=x([I("auto-form")],exports.AutoForm);/*! Bundled license information:

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