var AutoForm=(function(exports){'use strict';var $p=Object.defineProperty;var Ep=Object.getOwnPropertyDescriptor;var Mt=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(r,e)=>(typeof require<"u"?require:r)[e]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var y=(t,r,e,o)=>{for(var i=o>1?void 0:o?Ep(r,e):r,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(o?n(r,e,i):n(i))||i);return o&&i&&$p(r,e,i),i};var li=globalThis,Bn=t=>t,ri=li.trustedTypes,Hn=ri?ri.createPolicy("lit-html",{createHTML:t=>t}):void 0,Is="$lit$",xe=`lit$${Math.random().toFixed(9).slice(2)}$`,Ms="?"+xe,Op=`<${Ms}>`,rr=li.document===void 0?{createTreeWalker:()=>({})}:document,ao=()=>rr.createComment(""),lo=t=>t===null||typeof t!="object"&&typeof t!="function",Ps=Array.isArray,Gn=t=>Ps(t)||typeof t?.[Symbol.iterator]=="function",Rs=`[ 	
\f\r]`,no=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nn=/-->/g,Un=/>/g,tr=RegExp(`>|${Rs}(?:([^\\s"'>=/]+)(${Rs}*=${Rs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wn=/'/g,qn=/"/g,Yn=/^(?:script|style|textarea|title)$/i,Ls=t=>(r,...e)=>({_$litType$:t,strings:r,values:e}),f=Ls(1),pt=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Kn=new WeakMap,er=rr.createTreeWalker(rr,129);function Zn(t,r){if(!Ps(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Hn!==void 0?Hn.createHTML(r):r}var Qn=(t,r)=>{let e=t.length-1,o=[],i,s=r===2?"<svg>":r===3?"<math>":"",n=no;for(let a=0;a<e;a++){let l=t[a],c,d,u=-1,m=0;for(;m<l.length&&(n.lastIndex=m,d=n.exec(l),d!==null);)m=n.lastIndex,n===no?d[1]==="!--"?n=Nn:d[1]!==void 0?n=Un:d[2]!==void 0?(Yn.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=tr):d[3]!==void 0&&(n=tr):n===tr?d[0]===">"?(n=i??no,u=-1):d[1]===void 0?u=-2:(u=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?tr:d[3]==='"'?qn:Wn):n===qn||n===Wn?n=tr:n===Nn||n===Un?n=no:(n=tr,i=void 0);let g=n===tr&&t[a+1].startsWith("/>")?" ":"";s+=n===no?l+Op:u>=0?(o.push(c),l.slice(0,u)+Is+l.slice(u)+xe+g):l+xe+(u===-2?a:g);}return [Zn(t,s+(t[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),o]},co=class t{constructor({strings:r,_$litType$:e},o){let i;this.parts=[];let s=0,n=0,a=r.length-1,l=this.parts,[c,d]=Qn(r,e);if(this.el=t.createElement(c,o),er.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes);}for(;(i=er.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(Is)){let m=d[n++],g=i.getAttribute(u).split(xe),b=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?ii:b[1]==="?"?si:b[1]==="@"?ni:ir}),i.removeAttribute(u);}else u.startsWith(xe)&&(l.push({type:6,index:s}),i.removeAttribute(u));if(Yn.test(i.tagName)){let u=i.textContent.split(xe),m=u.length-1;if(m>0){i.textContent=ri?ri.emptyScript:"";for(let g=0;g<m;g++)i.append(u[g],ao()),er.nextNode(),l.push({type:2,index:++s});i.append(u[m],ao());}}}else if(i.nodeType===8)if(i.data===Ms)l.push({type:2,index:s});else {let u=-1;for(;(u=i.data.indexOf(xe,u+1))!==-1;)l.push({type:7,index:s}),u+=xe.length-1;}s++;}}static createElement(r,e){let o=rr.createElement("template");return o.innerHTML=r,o}};function or(t,r,e=t,o){if(r===pt)return r;let i=o!==void 0?e._$Co?.[o]:e._$Cl,s=lo(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(false),s===void 0?i=void 0:(i=new s(t),i._$AT(t,e,o)),o!==void 0?(e._$Co??=[])[o]=i:e._$Cl=i),i!==void 0&&(r=or(t,i._$AS(t,r.values),i,o)),r}var oi=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:o}=this._$AD,i=(r?.creationScope??rr).importNode(e,true);er.currentNode=i;let s=er.nextNode(),n=0,a=0,l=o[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new Cr(s,s.nextSibling,this,r):l.type===1?c=new l.ctor(s,l.name,l.strings,this,r):l.type===6&&(c=new ai(s,this,r)),this._$AV.push(c),l=o[++a];}n!==l?.index&&(s=er.nextNode(),n++);}return er.currentNode=rr,i}p(r){let e=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(r,o,e),e+=o.strings.length-2):o._$AI(r[e])),e++;}},Cr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,o,i){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??true;}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=or(this,r,e),lo(r)?r===X||r==null||r===""?(this._$AH!==X&&this._$AR(),this._$AH=X):r!==this._$AH&&r!==pt&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Gn(r)?this.k(r):this._(r);}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r));}_(r){this._$AH!==X&&lo(this._$AH)?this._$AA.nextSibling.data=r:this.T(rr.createTextNode(r)),this._$AH=r;}$(r){let{values:e,_$litType$:o}=r,i=typeof o=="number"?this._$AC(r):(o.el===void 0&&(o.el=co.createElement(Zn(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else {let s=new oi(i,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s;}}_$AC(r){let e=Kn.get(r.strings);return e===void 0&&Kn.set(r.strings,e=new co(r)),e}k(r){Ps(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,o,i=0;for(let s of r)i===e.length?e.push(o=new t(this.O(ao()),this.O(ao()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i);}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(false,true,e);r!==this._$AB;){let o=Bn(r).nextSibling;Bn(r).remove(),r=o;}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r));}},ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,o,i,s){this.type=1,this._$AH=X,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=X;}_$AI(r,e=this,o,i){let s=this.strings,n=false;if(s===void 0)r=or(this,r,e,0),n=!lo(r)||r!==this._$AH&&r!==pt,n&&(this._$AH=r);else {let a=r,l,c;for(r=s[0],l=0;l<s.length-1;l++)c=or(this,a[o+l],e,l),c===pt&&(c=this._$AH[l]),n||=!lo(c)||c!==this._$AH[l],c===X?r=X:r!==X&&(r+=(c??"")+s[l+1]),this._$AH[l]=c;}n&&!i&&this.j(r);}j(r){r===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"");}},ii=class extends ir{constructor(){super(...arguments),this.type=3;}j(r){this.element[this.name]=r===X?void 0:r;}},si=class extends ir{constructor(){super(...arguments),this.type=4;}j(r){this.element.toggleAttribute(this.name,!!r&&r!==X);}},ni=class extends ir{constructor(r,e,o,i,s){super(r,e,o,i,s),this.type=5;}_$AI(r,e=this){if((r=or(this,r,e,0)??X)===pt)return;let o=this._$AH,i=r===X&&o!==X||r.capture!==o.capture||r.once!==o.once||r.passive!==o.passive,s=r!==X&&(o===X||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,r),this._$AH=r;}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r);}},ai=class{constructor(r,e,o){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o;}get _$AU(){return this._$AM._$AU}_$AI(r){or(this,r);}},ta={I:Cr},Tp=li.litHtmlPolyfillSupport;Tp?.(co,Cr),(li.litHtmlVersions??=[]).push("3.3.2");var kr=(t,r,e)=>{let o=e?.renderBefore??r,i=o._$litPart$;if(i===void 0){let s=e?.renderBefore??null;o._$litPart$=i=new Cr(r.insertBefore(ao(),s),s,void 0,e??{});}return i._$AI(t),i};var w=t=>t??X;var ea=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(r){this.ariaActiveDescendantElement=null,this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColIndexText="",this.ariaColSpan="",this.ariaControlsElements=null,this.ariaCurrent="",this.ariaDescribedByElements=null,this.ariaDescription="",this.ariaDetailsElements=null,this.ariaDisabled="",this.ariaErrorMessageElements=null,this.ariaExpanded="",this.ariaFlowToElements=null,this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLabelledByElements=null,this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaOwnsElements=null,this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRelevant="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowIndexText="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=r;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var fe=function(t,r,e,o,i){if(typeof r=="function"?t!==r||true:!r.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r.set(t,e),e},wt=function(t,r,e,o){if(typeof r=="function"?t!==r||!o:!r.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?o:e==="a"?o.call(t):o?o.value:r.get(t)},Ar,ci,pi,po,zs,uo,ui,sr,ho,Ie,hi,ra,oa=t=>typeof t=="boolean"?t:t?.capture??false;var Vs=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(r,e,o){if(e==null)return;let i=oa(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);if(s===void 0)s=new Map,i.set(r,s);else if(s.has(e))return;let n=typeof o=="object"&&o?o:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(r,e,o)),s.set(e,n??{});}removeEventListener(r,e,o){if(e==null)return;let i=oa(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);s!==void 0&&(s.delete(e),s.size||i.delete(r));}dispatchEvent(r){let e=[this],o=this.__eventTargetParent;if(r.composed)for(;o;)e.push(o),o=o.__eventTargetParent;else for(;o&&o!==this.__host;)e.push(o),o=o.__eventTargetParent;let i=false,s=false,n=0,a=null,l=null,c=null,d=r.stopPropagation,u=r.stopImmediatePropagation;Object.defineProperties(r,{target:{get(){return a??l},...Q},srcElement:{get(){return r.target},...Q},currentTarget:{get(){return c},...Q},eventPhase:{get(){return n},...Q},composedPath:{value:()=>e,...Q},stopPropagation:{value:()=>{i=true,d.call(r);},...Q},stopImmediatePropagation:{value:()=>{s=true,u.call(r);},...Q}});let m=(C,S,T)=>{typeof C=="function"?C(r):typeof C?.handleEvent=="function"&&C.handleEvent(r),S.once&&T.delete(C);},g=()=>(c=null,n=0,!r.defaultPrevented),b=e.slice().reverse();a=!this.__host||!r.composed?this:null;let v=C=>{for(l=this;l.__host&&C.includes(l.__host);)l=l.__host;};for(let C of b){!a&&(!l||l===C.__host)&&v(b.slice(b.indexOf(C))),c=C,n=C===r.target?2:1;let S=C.__captureEventListeners.get(r.type);if(S){for(let[T,_]of S)if(m(T,_,S),s)return g()}if(i)return g()}let k=r.bubbles?e:[this];l=null;for(let C of k){!a&&(!l||C===l.__host)&&v(k.slice(0,k.indexOf(C)+1)),c=C,n=C===r.target?2:3;let S=C.__eventListeners.get(r.type);if(S){for(let[T,_]of S)if(m(T,_,S),s)return g()}if(i)return g()}return g()}},Ds=Vs;var Q={__proto__:null};Q.enumerable=true;Object.freeze(Q);var Fs=(Ie=class{constructor(r,e={}){if(Ar.set(this,false),ci.set(this,false),pi.set(this,false),po.set(this,false),zs.set(this,Date.now()),uo.set(this,false),ui.set(this,void 0),sr.set(this,void 0),ho.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof e!="object"||!e)throw new Error('The "options" argument must be an object');let{bubbles:o,cancelable:i,composed:s}=e;fe(this,Ar,!!i),fe(this,ci,!!o),fe(this,pi,!!s),fe(this,ui,`${r}`),fe(this,sr,null),fe(this,ho,false);}initEvent(r,e,o){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){fe(this,po,true);}get target(){return wt(this,sr,"f")}get currentTarget(){return wt(this,sr,"f")}get srcElement(){return wt(this,sr,"f")}get type(){return wt(this,ui,"f")}get cancelable(){return wt(this,Ar,"f")}get defaultPrevented(){return wt(this,Ar,"f")&&wt(this,po,"f")}get timeStamp(){return wt(this,zs,"f")}composedPath(){return wt(this,ho,"f")?[wt(this,sr,"f")]:[]}get returnValue(){return !wt(this,Ar,"f")||!wt(this,po,"f")}get bubbles(){return wt(this,ci,"f")}get composed(){return wt(this,pi,"f")}get eventPhase(){return wt(this,ho,"f")?Ie.AT_TARGET:Ie.NONE}get cancelBubble(){return wt(this,uo,"f")}set cancelBubble(r){r&&fe(this,uo,true);}stopPropagation(){fe(this,uo,true);}get isTrusted(){return  false}},Ar=new WeakMap,ci=new WeakMap,pi=new WeakMap,po=new WeakMap,zs=new WeakMap,uo=new WeakMap,ui=new WeakMap,sr=new WeakMap,ho=new WeakMap,Ie.NONE=0,Ie.CAPTURING_PHASE=1,Ie.AT_TARGET=2,Ie.BUBBLING_PHASE=3,Ie);Object.defineProperties(Fs.prototype,{initEvent:Q,stopImmediatePropagation:Q,preventDefault:Q,target:Q,currentTarget:Q,srcElement:Q,type:Q,cancelable:Q,defaultPrevented:Q,timeStamp:Q,composedPath:Q,returnValue:Q,bubbles:Q,composed:Q,eventPhase:Q,cancelBubble:Q,stopPropagation:Q,isTrusted:Q});var ia=(ra=class extends Fs{constructor(r,e={}){super(r,e),hi.set(this,void 0),fe(this,hi,e?.detail??null);}initCustomEvent(r,e,o,i){throw new Error("Method not implemented.")}get detail(){return wt(this,hi,"f")}},hi=new WeakMap,ra);Object.defineProperties(ia.prototype,{detail:Q});var js=Fs,Bs=ia;var Pt;(Pt=class{constructor(){this.STYLE_RULE=1,this.CHARSET_RULE=2,this.IMPORT_RULE=3,this.MEDIA_RULE=4,this.FONT_FACE_RULE=5,this.PAGE_RULE=6,this.NAMESPACE_RULE=10,this.KEYFRAMES_RULE=7,this.KEYFRAME_RULE=8,this.SUPPORTS_RULE=12,this.COUNTER_STYLE_RULE=11,this.FONT_FEATURE_VALUES_RULE=14,this.__parentStyleSheet=null,this.cssText="";}get parentRule(){return null}get parentStyleSheet(){return this.__parentStyleSheet}get type(){return 0}},Pt.STYLE_RULE=1,Pt.CHARSET_RULE=2,Pt.IMPORT_RULE=3,Pt.MEDIA_RULE=4,Pt.FONT_FACE_RULE=5,Pt.PAGE_RULE=6,Pt.NAMESPACE_RULE=10,Pt.KEYFRAMES_RULE=7,Pt.KEYFRAME_RULE=8,Pt.SUPPORTS_RULE=12,Pt.COUNTER_STYLE_RULE=11,Pt.FONT_FEATURE_VALUES_RULE=14,Pt);globalThis.Event??=js;globalThis.CustomEvent??=Bs;var sa=new WeakMap,fo=t=>{let r=sa.get(t);return r===void 0&&sa.set(t,r=new Map),r},Rp=class extends Ds{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(fo(this)).map(([r,e])=>({name:r,value:e}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(r,e){fo(this).set(r,String(e));}removeAttribute(r){fo(this).delete(r);}toggleAttribute(r,e){if(this.hasAttribute(r)){if(e===void 0||!e)return this.removeAttribute(r),false}else return e===void 0||e?(this.setAttribute(r,""),true):false;return  true}hasAttribute(r){return fo(this).has(r)}attachShadow(r){let e={host:this};return this.__shadowRootMode=r.mode,r&&r.mode==="open"&&(this.__shadowRoot=e),e}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let r=new ea(this);return this.__internals=r,r}getAttribute(r){return fo(this).get(r)??null}};var Ip=class extends Rp{},Ns=Ip;globalThis.litServerRoot??=Object.defineProperty(new Ns,"localName",{get(){return "lit-server-root"}});function Mp(){let t,r;return {promise:new Promise((o,i)=>{t=o,r=i;}),resolve:t,reject:r}}var Hs=class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map;}define(r,e){if(this.__definitions.has(r))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${r}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${r}" has already been used with this registry`);if(this.__reverseDefinitions.has(e))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(e)}`);e.__localName=r,this.__definitions.set(r,{ctor:e,observedAttributes:e.observedAttributes??[]}),this.__reverseDefinitions.set(e,r),this.__pendingWhenDefineds.get(r)?.resolve(e),this.__pendingWhenDefineds.delete(r);}get(r){return this.__definitions.get(r)?.ctor}getName(r){return this.__reverseDefinitions.get(r)??null}upgrade(r){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(r){let e=this.__definitions.get(r);if(e)return e.ctor;let o=this.__pendingWhenDefineds.get(r);return o||(o=Mp(),this.__pendingWhenDefineds.set(r,o)),o.promise}},Pp=Hs;var na=new Pp;var mo=globalThis,di=mo.ShadowRoot&&(mo.ShadyCSS===void 0||mo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Us=Symbol(),aa=new WeakMap,go=class{constructor(r,e,o){if(this._$cssResult$=true,o!==Us)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e;}get styleSheet(){let r=this.o,e=this.t;if(di&&r===void 0){let o=e!==void 0&&e.length===1;o&&(r=aa.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),o&&aa.set(e,r));}return r}toString(){return this.cssText}},la=t=>new go(typeof t=="string"?t:t+"",void 0,Us),x=(t,...r)=>{let e=t.length===1?t[0]:r.reduce((o,i,s)=>o+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new go(e,t,Us)},ca=(t,r)=>{if(di)t.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let o=document.createElement("style"),i=mo.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,t.appendChild(o);}},Ws=di||mo.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(r=>{let e="";for(let o of r.cssRules)e+=o.cssText;return la(e)})(t):t;var{is:Lp,defineProperty:zp,getOwnPropertyDescriptor:Vp,getOwnPropertyNames:Dp,getOwnPropertySymbols:Fp,getPrototypeOf:jp}=Object,vo=globalThis;vo.customElements??=na;var pa=vo.trustedTypes,Bp=pa?pa.emptyScript:"",Hp=vo.reactiveElementPolyfillSupport,bo=(t,r)=>t,Me={toAttribute(t,r){switch(r){case Boolean:t=t?Bp:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,r){let e=t;switch(r){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t);}catch{e=null;}}return e}},fi=(t,r)=>!Lp(t,r),ua={attribute:true,type:String,converter:Me,reflect:false,useDefault:false,hasChanged:fi};Symbol.metadata??=Symbol("metadata"),vo.litPropertyMetadata??=new WeakMap;var _e=class extends(globalThis.HTMLElement??Ns){static addInitializer(r){this._$Ei(),(this.l??=[]).push(r);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=ua){if(e.state&&(e.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=true),this.elementProperties.set(r,e),!e.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(r,o,e);i!==void 0&&zp(this.prototype,r,i);}}static getPropertyDescriptor(r,e,o){let{get:i,set:s}=Vp(this.prototype,r)??{get(){return this[e]},set(n){this[e]=n;}};return {get:i,set(n){let a=i?.call(this);s?.call(this,n),this.requestUpdate(r,a,o);},configurable:true,enumerable:true}}static getPropertyOptions(r){return this.elementProperties.get(r)??ua}static _$Ei(){if(this.hasOwnProperty(bo("elementProperties")))return;let r=jp(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties);}static finalize(){if(this.hasOwnProperty(bo("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(bo("properties"))){let e=this.properties,o=[...Dp(e),...Fp(e)];for(let i of o)this.createProperty(i,e[i]);}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[o,i]of e)this.elementProperties.set(o,i);}this._$Eh=new Map;for(let[e,o]of this.elementProperties){let i=this._$Eu(e,o);i!==void 0&&this._$Eh.set(i,e);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let o=new Set(r.flat(1/0).reverse());for(let i of o)e.unshift(Ws(i));}else r!==void 0&&e.push(Ws(r));return e}static _$Eu(r,e){let o=e.attribute;return o===false?void 0:typeof o=="string"?o:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this));}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.();}removeController(r){this._$EO?.delete(r);}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let o of e.keys())this.hasOwnProperty(o)&&(r.set(o,this[o]),delete this[o]);r.size>0&&(this._$Ep=r);}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ca(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(r=>r.hostConnected?.());}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.());}attributeChangedCallback(r,e,o){this._$AK(r,o);}_$ET(r,e){let o=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,o);if(i!==void 0&&o.reflect===true){let s=(o.converter?.toAttribute!==void 0?o.converter:Me).toAttribute(e,o.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null;}}_$AK(r,e){let o=this.constructor,i=o._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=o.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Me;this._$Em=i;let a=n.fromAttribute(e,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null;}}requestUpdate(r,e,o,i=false,s){if(r!==void 0){let n=this.constructor;if(i===false&&(s=this[r]),o??=n.getPropertyOptions(r),!((o.hasChanged??fi)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(n._$Eu(r,o))))return;this.C(r,e,o);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(r,e,{useDefault:o,reflect:i,wrapped:s},n){o&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??e??this[r]),s!==true||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||o||(e=void 0),this._$AL.set(r,e)),i===true&&this._$Em!==r&&(this._$Eq??=new Set).add(r));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(e){Promise.reject(e);}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0;}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,s]of o){let{wrapped:n}=s,a=this[i];n!==true||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a);}}let r=false,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM();}catch(o){throw r=false,this._$EM(),o}r&&this._$AE(e);}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(r)),this.updated(r);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return  true}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM();}updated(r){}firstUpdated(r){}};_e.elementStyles=[],_e.shadowRootOptions={mode:"open"},_e[bo("elementProperties")]=new Map,_e[bo("finalized")]=new Map,Hp?.({ReactiveElement:_e}),(vo.reactiveElementVersions??=[]).push("2.1.2");var qs=globalThis,ut=class extends _e{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=kr(e,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return pt}};ut._$litElement$=true,ut.finalized=true,qs.litElementHydrateSupport?.({LitElement:ut});var Np=qs.litElementPolyfillSupport;Np?.({LitElement:ut});(qs.litElementVersions??=[]).push("4.2.2");var ha=t=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,r);}):customElements.define(t,r);};var Up={attribute:true,type:String,converter:Me,reflect:false,hasChanged:fi},Wp=(t=Up,r,e)=>{let{kind:o,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),o==="setter"&&((t=Object.create(t)).wrapped=true),s.set(e.name,t),o==="accessor"){let{name:n}=e;return {set(a){let l=r.get.call(this);r.set.call(this,a),this.requestUpdate(n,l,t,true,a);},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(o==="setter"){let{name:n}=e;return function(a){let l=this[n];r.call(this,a),this.requestUpdate(n,l,t,true,a);}}throw Error("Unsupported decorator location: "+o)};function h(t){return (r,e)=>typeof e=="object"?Wp(t,r,e):((o,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,o),n?Object.getOwnPropertyDescriptor(i,s):void 0})(t,r,e)}function $(t){return h({...t,state:true,attribute:false})}function Pe(t){return (r,e)=>{let o=typeof r=="function"?r:r[e];Object.assign(o,t);}}var we=(t,r,e)=>(e.configurable=true,e.enumerable=true,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(t,r,e),e);function E(t,r){return (e,o,i)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return we(e,o,{get(){return s(this)}})}}var qp;function da(t){return (r,e)=>we(r,e,{get(){return (this.renderRoot??(qp??=document.createDocumentFragment())).querySelectorAll(t)}})}function fa(t){return (r,e)=>{let{slot:o,selector:i}=t??{},s="slot"+(o?`[name=${o}]`:":not([name])");return we(r,e,{get(){let n=this.renderRoot?.querySelector(s),a=n?.assignedElements(t)??[];return i===void 0?a:a.filter(l=>l.matches(i))}})}}function Le(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function ma(t,r){return Le(t)?Object.assign({},t,r):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},r)}function ga(t,r,e){if(!r||r.length===0)return t;let o=Array.isArray(r)?r:r.split("."),i,s=t;for(let n=0;n<o.length;n++){let a=o[n];if(a in s)i=s[a];else return e;s=i;}return i}function mi(t,r,e,o){if(!r||!t)return t;let i=r;if(i.length===0)return typeof t=="object"&&Object.assign(t,e),t;{let s=t,n=[],a=(l,c,d)=>{l[c]=d;};for(let l=0;l<i.length;l++){let c=i[l];if(n.push(c),s)if(Array.isArray(s)){let d=parseInt(c,10);if(Number.isNaN(d)||d<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===i.length-1?a(s,d,e):s=s[d];}else s instanceof Map||s instanceof WeakMap?l===i.length-1?s.set(c,e):(s.has(c)||s.set(c,{}),s=s.get(c)):typeof s=="object"&&c in s?l===i.length-1?a(s,c,e):s=s[c]:(s[c]=l===i.length-1?e:{},s=s[c]);else s[c]=l===i.length-1?e:{},s=s[c];}}return t}function Kp(t){if(t==null)return "";let r=typeof t;if(r==="boolean")return String(t);if(Array.isArray(t))return t.join(",");if(r==="object")try{return JSON.stringify(t)}catch{return "{}"}return String(t)}function ba(t,r){if(!r)return t;let e=r.datatype||"any";if(e==="any")return t;if(e==="string")return Kp(t);if(e==="number")return Number(t);if(Array.isArray(t))return [...t];if(typeof t=="object")return {...t};if(typeof t=="string"){if(e==="boolean")return t.toLowerCase()==="true";if(e==="array")return t.split(",").map(o=>o.trim());if(e==="object")try{return JSON.parse(t)}catch{return {}}}return e==="boolean"?!!t:t}function va(t,r,e){return t?e(r):r}var Ks="";function ya(t){Ks=t;}function xa(t=""){if(!Ks){let r=[...document.getElementsByTagName("script")],e=r.find(o=>o.hasAttribute("data-shoelace"));if(e)ya(e.getAttribute("data-shoelace"));else {let o=r.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),i="";o&&(i=o.getAttribute("src")),ya(i.split("/").slice(0,-1).join("/"));}}return Ks.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var Gp={name:"default",resolver:t=>xa(`assets/icons/${t}.svg`)},_a=Gp;var wa={caret:`
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
  `},Yp={name:"system",resolver:t=>t in wa?`data:image/svg+xml,${encodeURIComponent(wa[t])}`:""},Sa=Yp;var gi=[_a,Sa],bi=[];function Gs(t){bi.push(t);}function Ys(t){bi=bi.filter(r=>r!==t);}function $r(t){return gi.find(r=>r.name===t)}function Xs(t,r){Ca(t),gi.push({name:t,resolver:r.resolver,mutator:r.mutator,spriteSheet:r.spriteSheet}),bi.forEach(e=>{e.library===t&&e.setIcon();});}function Ca(t){gi=gi.filter(r=>r.name!==t);}var $a=Object.defineProperty,Xp=Object.defineProperties,Jp=Object.getOwnPropertyDescriptor,Zp=Object.getOwnPropertyDescriptors,ka=Object.getOwnPropertySymbols,Qp=Object.prototype.hasOwnProperty,tu=Object.prototype.propertyIsEnumerable,Js=(t,r)=>(r=Symbol[t])?r:Symbol.for("Symbol."+t),Zs=t=>{throw TypeError(t)},Aa=(t,r,e)=>r in t?$a(t,r,{enumerable:true,configurable:true,writable:true,value:e}):t[r]=e,$t=(t,r)=>{for(var e in r||(r={}))Qp.call(r,e)&&Aa(t,e,r[e]);if(ka)for(var e of ka(r))tu.call(r,e)&&Aa(t,e,r[e]);return t},Se=(t,r)=>Xp(t,Zp(r)),p=(t,r,e,o)=>{for(var i=o>1?void 0:o?Jp(r,e):r,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(o?n(r,e,i):n(i))||i);return o&&i&&$a(r,e,i),i},Ea=(t,r,e)=>r.has(t)||Zs("Cannot "+e),Oa=(t,r,e)=>(Ea(t,r,"read from private field"),r.get(t)),Ta=(t,r,e)=>r.has(t)?Zs("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(t):r.set(t,e),Ra=(t,r,e,o)=>(Ea(t,r,"write to private field"),r.set(t,e),e),eu=function(t,r){this[0]=t,this[1]=r;},Ia=t=>{var r=t[Js("asyncIterator")],e=false,o,i={};return r==null?(r=t[Js("iterator")](),o=s=>i[s]=n=>r[s](n)):(r=r.call(t),o=s=>i[s]=n=>{if(e){if(e=false,s==="throw")throw n;return n}return e=true,{done:false,value:new eu(new Promise(a=>{var l=r[s](n);l instanceof Object||Zs("Object expected"),a(l);}),1)}}),i[Js("iterator")]=()=>i,o("next"),"throw"in r?o("throw"):i.throw=s=>{throw s},"return"in r&&o("return"),i};var Pa="https://unpkg.com/lucide-static@latest/icons/{name}.svg",Qs={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>',bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>'},Ma=t=>t in Qs?`data:image/svg+xml,${encodeURIComponent(Qs[t])}`:Pa.replace("{name}",t),ru=t=>{t&&t.setAttribute("stroke-width","1");};function Er(t="https://unpkg.com/lucide-static@latest/icons/{name}.svg",r){if(!t.includes("{name}"))throw new Error('icon url must include "{name}"');Pa=t,$r("default").resolver!==Ma&&Xs("default",{resolver:Ma,mutator:ru});}function ou(t){t=t.replace(/^#/,"");let r=parseInt(t.substring(0,2),16)/255,e=parseInt(t.substring(2,4),16)/255,o=parseInt(t.substring(4,6),16)/255,i=Math.max(r,e,o),s=Math.min(r,e,o),n=0,a=0,l=(i+s)/2;if(i!==s){let c=i-s;switch(a=l>.5?c/(2-i-s):c/(i+s),i){case r:n=(e-o)/c+(e<o?6:0);break;case e:n=(o-r)/c+2;break;case o:n=(r-e)/c+4;break}n/=6;}return {h:Math.round(n*360),s:Math.round(a*100),l:Math.round(l*100)}}function iu(t,r,e){r/=100,e/=100;let o=(1-Math.abs(2*e-1))*r,i=o*(1-Math.abs(t/60%2-1)),s=e-o/2,n=0,a=0,l=0;0<=t&&t<60?(n=o,a=i,l=0):60<=t&&t<120?(n=i,a=o,l=0):120<=t&&t<180?(n=0,a=o,l=i):180<=t&&t<240?(n=0,a=i,l=o):240<=t&&t<300?(n=i,a=0,l=o):300<=t&&t<360&&(n=o,a=0,l=i),n=Math.round((n+s)*255),a=Math.round((a+s)*255),l=Math.round((l+s)*255);let c=d=>{let u=d.toString(16);return u.length===1?"0"+u:u};return `#${c(n)}${c(a)}${c(l)}`}function La(t){let r=ou(t),e={50:{hDiff:3.3,sFactor:.74,lFactor:.44},100:{hDiff:3.7,sFactor:.82,lFactor:.59},200:{hDiff:3,sFactor:.88,lFactor:.65},300:{hDiff:3.4,sFactor:.94,lFactor:.76},400:{hDiff:2.4,sFactor:.94,lFactor:.93},500:{hDiff:0,sFactor:1,lFactor:1},600:{hDiff:-1,sFactor:1.14,lFactor:1.2},700:{hDiff:-1,sFactor:1.16,lFactor:1.48},800:{hDiff:-0.9,sFactor:1.16,lFactor:1.73},900:{hDiff:-1.2,sFactor:1.16,lFactor:1.89},950:{hDiff:-13.7,sFactor:1.16,lFactor:2}},o={};for(let[i,s]of Object.entries(e)){let n=Math.max(0,Math.min(360,r.h+s.hDiff)),a=Math.max(0,Math.min(100,r.s*s.sFactor)),l=Math.max(0,Math.min(100,r.l*s.lFactor));o[`--sl-color-primary-${i}`]=iu(n,a,l);}return o}function su(t){if(!t.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){console.error("Invalid color format. Please provide a valid hex color (e.g., #3B82F6)");return}try{let r=La(t),e=document.getElementById("auto-styles");e||(e=document.createElement("style"),e.id="auto-styles",document.head.appendChild(e));let o=`:root {
`;Object.entries(r).forEach(([s,n])=>{o+=`  ${s}: ${n};
`;}),o+="}",e.textContent=o;let i=document.body;return r["--sl-color-primary-500"]&&i.style.setProperty("--sl-color-primary-500",r["--sl-color-primary-500"]),console.log("Primary color changed successfully"),r}catch(r){console.error("Failed to change theme color:",r);}}globalThis.changePrimaryColor=su;var ze=class extends Event{constructor(r,e,o,i){super("context-request",{bubbles:true,composed:true}),this.context=r,this.contextTarget=e,this.callback=o,this.subscribe=i??false;}};var Or=class{constructor(r,e,o,i){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=r,e.context!==void 0){let s=e;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=e,this.callback=o,this.subscribe=i??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new ze(this.context,this.host,this.t,this.subscribe));}};var vi=class{get value(){return this.o}set value(r){this.setValue(r);}setValue(r,e=false){let o=e||!Object.is(r,this.o);this.o=r,o&&this.updateObservers();}constructor(r){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:o}]of this.subscriptions)e(this.o,o);},r!==void 0&&(this.value=r);}addCallback(r,e,o){if(!o)return void r(this.value);this.subscriptions.has(r)||this.subscriptions.set(r,{disposer:()=>{this.subscriptions.delete(r);},consumerHost:e});let{disposer:i}=this.subscriptions.get(r);r(this.value,i);}clearCallbacks(){this.subscriptions.clear();}};var tn=class extends Event{constructor(r,e){super("context-provider",{bubbles:true,composed:true}),this.context=r,this.contextTarget=e;}},Tr=class extends vi{constructor(r,e,o){super(e.context!==void 0?e.initialValue:o),this.onContextRequest=i=>{if(i.context!==this.context)return;let s=i.contextTarget??i.composedPath()[0];s!==this.host&&(i.stopPropagation(),this.addCallback(i.callback,s,i.subscribe));},this.onProviderRequest=i=>{if(i.context!==this.context||(i.contextTarget??i.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:a}]of this.subscriptions)s.has(n)||(s.add(n),a.dispatchEvent(new ze(this.context,a,n,true)));i.stopPropagation();},this.host=r,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new tn(this.context,this.host));}};function en({context:t}){return (r,e)=>{let o=new WeakMap;if(typeof e=="object")return {get(){return r.get.call(this)},set(i){return o.get(this).setValue(i),r.set.call(this,i)},init(i){return o.set(this,new Tr(this,{context:t,initialValue:i})),i}};{r.constructor.addInitializer((n=>{o.set(n,new Tr(n,{context:t}));}));let i=Object.getOwnPropertyDescriptor(r,e),s;if(i===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(a){o.get(this).setValue(a),n.set(this,a);},configurable:true,enumerable:true};}else {let n=i.set;s={...i,set(a){o.get(this).setValue(a),n?.call(this,a);}};}return void Object.defineProperty(r,e,s)}}}function rn({context:t,subscribe:r}){return (e,o)=>{typeof o=="object"?o.addInitializer((function(){new Or(this,{context:t,callback:i=>{e.set.call(this,i);},subscribe:r});})):e.constructor.addInitializer((i=>{new Or(i,{context:t,callback:s=>{i[o]=s;},subscribe:r});}));}}var yi="autoform";var xi=x`
    
    sl-input::part(input),
    sl-popup::part(display-input){        
        color: var(--auto-color);
    }  
 
    sl-input::part(input)::placeholder{
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
        --sl-color-primary-50: color-mix(in srgb, var(--t-color-primary-5) 20%, transparent);
    }
    

`;var za=x`
    ${xi}
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
`;var St={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Nt=t=>(...r)=>({_$litDirective$:t,values:r}),Lt=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,o){this._$Ct=r,this._$AM=e,this._$Ci=o;}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var{I:au}=ta,Va=t=>t;var Fa=(t,r)=>t?._$litType$!==void 0;var _i=t=>t.strings===void 0,Da=()=>document.createComment(""),Rr=(t,r,e)=>{let o=t._$AA.parentNode,i=r===void 0?t._$AB:r._$AA;if(e===void 0){let s=o.insertBefore(Da(),i),n=o.insertBefore(Da(),i);e=new au(s,n,t,t.options);}else {let s=e._$AB.nextSibling,n=e._$AM,a=n!==t;if(a){let l;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(l=t._$AU)!==n._$AU&&e._$AP(l);}if(s!==i||a){let l=e._$AA;for(;l!==s;){let c=Va(l).nextSibling;Va(o).insertBefore(l,i),l=c;}}}return e},Ve=(t,r,e=t)=>(t._$AI(r,e),t),lu={},wi=(t,r=lu)=>t._$AH=r,ja=t=>t._$AH,Si=t=>{t._$AR(),t._$AA.remove();};var Ba=(t,r,e)=>{let o=new Map;for(let i=r;i<=e;i++)o.set(t[i],i);return o},rt=Nt(class extends Lt{constructor(t){if(super(t),t.type!==St.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,r,e){let o;e===void 0?e=r:r!==void 0&&(o=r);let i=[],s=[],n=0;for(let a of t)i[n]=o?o(a,n):n,s[n]=e(a,n),n++;return {values:s,keys:i}}render(t,r,e){return this.dt(t,r,e).values}update(t,[r,e,o]){let i=ja(t),{values:s,keys:n}=this.dt(r,e,o);if(!Array.isArray(i))return this.ut=n,s;let a=this.ut??=[],l=[],c,d,u=0,m=i.length-1,g=0,b=s.length-1;for(;u<=m&&g<=b;)if(i[u]===null)u++;else if(i[m]===null)m--;else if(a[u]===n[g])l[g]=Ve(i[u],s[g]),u++,g++;else if(a[m]===n[b])l[b]=Ve(i[m],s[b]),m--,b--;else if(a[u]===n[b])l[b]=Ve(i[u],s[b]),Rr(t,l[b+1],i[u]),u++,b--;else if(a[m]===n[g])l[g]=Ve(i[m],s[g]),Rr(t,i[u],i[m]),m--,g++;else if(c===void 0&&(c=Ba(n,g,b),d=Ba(a,u,m)),c.has(a[u]))if(c.has(a[m])){let v=d.get(n[g]),k=v!==void 0?i[v]:null;if(k===null){let C=Rr(t,i[u]);Ve(C,s[g]),l[g]=C;}else l[g]=Ve(k,s[g]),Rr(t,i[u],k),i[v]=null;g++;}else Si(i[m]),m--;else Si(i[u]),u++;for(;g<=b;){let v=Rr(t,l[b+1]);Ve(v,s[g]),l[g++]=v;}for(;u<=m;){let v=i[u++];v!==null&&Si(v);}return this.ut=n,wi(t,l),pt}});var Ir=class{constructor(r){this.host=r,r.addController(this);}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext();}};var Ha="important",cu=" !"+Ha,tt=Nt(class extends Lt{constructor(t){if(super(t),t.type!==St.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((r,e)=>{let o=t[e];return o==null?r:r+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[r]){let{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(r)),this.render(r);for(let o of this.ft)r[o]==null&&(this.ft.delete(o),o.includes("-")?e.removeProperty(o):e[o]=null);for(let o in r){let i=r[o];if(i!=null){this.ft.add(o);let s=typeof i=="string"&&i.endsWith(cu);o.includes("-")||s?e.setProperty(o,s?i.slice(0,-11):i,s?Ha:""):e[o]=i;}}return pt}});function B(t,r,e){return t?r(t):e?.(t)}var De=class{constructor(r,...e){this.initialClasses=[];this.host=r,r.addController(this),this.initialClasses=e;}_forEachClasss(r,e){r&&r.forEach(o=>{typeof o=="string"?(e(o,true),this.host.classList.add(o)):Object.entries(o).forEach(([i,s])=>{e(i,s);});});}add(...r){this.host&&r&&this._forEachClasss(r,e=>{this.host.classList.add(e);});}remove(...r){this.host&&r&&this._forEachClasss(r,e=>{this.host.classList.remove(e);});}toggle(...r){this.host&&this._forEachClasss(r,e=>{this.host.classList.toggle(e);});}use(...r){this.host&&this._forEachClasss(r,(e,o)=>{o?this.host.classList.add(e):this.host.classList.remove(e);});}has(r){return this.host.classList.contains(r)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var yo=class extends Lt{constructor(r){if(super(r),this.it=X,r.type!==St.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===X||r==null)return this._t=void 0,this.it=r;if(r===pt)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};yo.directiveName="unsafeHTML",yo.resultType=1;var zt=Nt(yo);function Na(t,r){r&&Object.entries(r).forEach(([e,o])=>{(e==="root"?[t]:Array.from(t.querySelectorAll(e))).forEach(s=>{typeof o=="string"?s.style.cssText=o:typeof o=="object"&&Object.assign(s.style,o);});});}function Mr(t,r,e){e?t.classList.add(r):t.classList.remove(r);}function Ua(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var I=class extends ut{constructor(){super(...arguments);this.theme=new Ir(this);this.classs=new De(this);this.options=Ua();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this._updateFieldValue();}static{this.styles=za;}get shadow(){return this.shadowRoot}getFieldOptions(){let e=this.schema||{};return Object.entries(e).reduce((o,[i,s])=>(Le(s)?o[i]=s.value:o[i]=s,o),Object.assign({},Ua(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(e=true){return f`${this.renderBeforeActions(e)} ${this.renderAfterActions(e)}`}_onClickAction(e,o){return i=>{typeof o=="function"&&o(i),e.onClick&&typeof e.onClick=="function"&&e.onClick?.call(this,this.getInputValue(),{action:e,options:this.options,event:i,update:s=>{mi(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(e){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return f`<div
                class="actions before"
                part="before-actions"
                slot="${w(e?"prefix":void 0)}"
            >
                ${rt(this.beforeActions,o=>this.renderActionWidget(o))}
            </div>`}renderAfterActions(e){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return f`<div
                class="actions after"
                part="after-actions"
                slot="${w(e?"suffix":void 0)}"
            >
                ${rt(this.afterActions,o=>this.renderActionWidget(o))}
            </div>`}_renderDropdownAction(e){return f`
            <sl-dropdown
                class="action-widget"
                hoist
                title=${w(e.tips)}
                placement=${e.pos==="before"?"bottom-start":"bottom-end"}
            >
                <sl-button slot="trigger" ?caret=${e.caret}>
                    ${B(e.icon,()=>f`<sl-icon name=${w(e.icon)}></sl-icon>`)}
                    ${e.label}
                </sl-button>
                <sl-menu>
                    ${rt(e.items||[],o=>o==="-"?f`<sl-divider></sl-divider>`:(typeof o=="string"&&(o={label:o}),f`<sl-menu-item
                            @click=${this._onClickAction.call(this,o,()=>{e.syncMenu&&(e.label=o.label,e.icon=o.icon,e.tips=o.tips,this.requestUpdate());})}
                        >
                            ${B(o.icon,()=>f`<sl-icon
                                        name=${w(o.icon)}
                                        slot="prefix"
                                    ></sl-icon>`)}
                            ${o.label}</sl-menu-item
                        >`))}
                </sl-menu>
            </sl-dropdown>
        `}_renderButtonAction(e){return f`
            <sl-button
                class="action-widget"
                title=${w(e.tips)}
                variant=${w(e.variant)}
                size=${e.size||this.context.size}
                @click=${this._onClickAction.call(this,e)}
            >
                ${B(e.icon,()=>f`<sl-icon name=${w(e.icon)}></sl-icon>`)}
                ${e.label}
            </sl-button>
        `}_renderImageAction(e){return f`
            <sl-button
                title="${w(e.tips)}"
                variant="text"
                class="action-widget image"
                @click=${this._onClickAction.call(this,e)}
            >
                <img src="${w(e.url)}" />
            </sl-button>
        `}renderActionWidget(e){if(typeof e!="object")return;let o=e.type||"button";if(o==="dropdown")return this._renderDropdownAction(e);if(o==="button")return this._renderButtonAction(e);if(o==="image")return this._renderImageAction(e)}renderOption(e,o){let i=this.schema[e];if(i)return i.loading?f`<sl-spinner></sl-spinner>`:f`${o?o(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(e){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,e):e}toState(e){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,e):e}toInput(e){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,e):e}getOptionValue(e,o){if(this.schema&&e in this.schema){let i=this.schema[e];return i===void 0?o:Le(i)?i.value:i}else return o}getOption(e){if(this.schema&&e in this.schema){let o=this.schema[e];return Le(o)?o:ma(o)}}getInputValue(){if(!this.input)return "";let e=this.input.value;if(typeof this.options.toState!="function"){let o=this.options.datatype||"string";o==="number"?e=Number(e):o==="boolean"&&(e=!!e);}return e}_renderRequiredOption(){return this.renderOption("required",e=>e?f`<span style="color:red;">*</span>`:"")}renderHelp(e=false){let o=this.options.help;if(!o)return;let i=o.match(/\(([^)]+)\)[^)]*$/),s=i?i[1]:null,n=s?o.replace(`(${s})`,""):o;return f`<span
            class="help"
            part="field-help"
            title="${w(e?n:void 0)}"
        >
            ${va(!!s,f`
                    <sl-icon name="help"></sl-icon>
                    ${B(!e,()=>f`${n}`)}
                `,a=>f`<a target="_blank" href="${s}">${a}</a>`)}
        </span>`}renderLabel(){let e=this.context,o=this.options.labelPos||e.labelPos;if(o==="none")return f``;{let i={};return (e.labelWidth&&o==="left"||e.viewonly)&&(i.width=e.labelWidth),f`<div class="label" part="field-label" style="${w(tt(i))}">
                <span class="title">
                    ${this.getLabel()}
                    ${B(o==="left"||e.viewonly,()=>this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${B(o==="top"&&!e.viewonly,()=>this.renderHelp())}
            </div>`}}renderInput(){return f``}isShowError(){return this.context.validAtInit?!!this.invalidTips:this.dirty?!!this.invalidTips:false}renderError(){return this.isShowError()?f`<div class="error">${this.invalidTips}</div>`:f``}_handleSchemaChange(){let e=this.context;if(e?.store&&this.schema){let o=this.getPath();if(!o||!Array.isArray(o)||o.length===0)return;let i=o.join("_$_");this._subscribers.push(e.store.watch(`${i}.**`,s=>{let{reply:n,type:a,value:l,flags:c}=s;if(n||e.form.seq===c)return;(a==="batch"?l:[s]).forEach(u=>{let m=u.path.slice(1);mi(this.schema,m,u.value),this.options[m[0]]=u.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let e=this.value;if(this.options.toView&&this.options.toView)try{e=this.options.toView.call(this,this.value);}catch(o){console.error(`Error while toView<${this.path}>: ${o.message}`);}return f`${zt(String(e))}`}_handleStateChange(){let e=this.context;if(e?.store&&this.schema){let o=this.getPath();if(!o||!Array.isArray(o)||o.length===0)return;this._subscribers.push(e.store.watch(o.join("."),i=>{this.value=this.toInput(i.value);},{operates:"write"}));}}getStateValue(){let e=this.getPath();return !e||!Array.isArray(e)||e.length===0?this.value:this.toInput(ga(this.context.store.state,e))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let e=this.context;if(e?.store&&this.schema){this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange();let o=this.getPath();o&&Array.isArray(o)&&o.length>0?this.path=o.join("."):this.path="",this.name=this.options.name||this.path,this.path in e.store.configManager.errors&&(this.invalidTips=e.store.configManager.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(i=>i.pos==="before"),this.afterActions=this.options.actions.filter(i=>i.pos!=="before"));}}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(e=>{e.off();});}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFormClasss(){this.context.form&&(Mr(this.context.form,"dirty",this.dirty),Mr(this.context.form,"invalid",!!this.invalidTips));}_updateFieldValue(){if(!this.schema)return;let e=this.getPath(),o=this.toState(this.getInputValue()),i=this.context;i.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let a=ba(o,this.schema);mi(n,e,a),this.invalidTips=void 0;},{flags:i.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:o,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidTips=s.message;}finally{this._updateFormClasss();}}renderValue(){return f`
            ${this.renderInput()} ${B(this.context.viewonly,()=>this.renderHelp())}
            ${this.renderError()}
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(e){this.options.styles&&(e.has("schema")&&this.schema&&this.updateOptions(),Na(this.shadow,this.options.styles));}render(){let e=this.context,o=this.options.labelPos?this.options.labelPos:e.labelPos;return this.classs.use(e.size,{[`${e.border}-border`]:true,error:this.isShowError(),"left-label":o==="left"||e.viewonly,"top-label":o==="top"&&!e.viewonly,disable:this.options.enable===false,readonly:e.readonly,viewonly:e.viewonly,compact:this.compact===void 0?e.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${e.viewAlign}`]:true,[`${e.layout}-layout`]:true}),f`
            <div class="autofield">
                ${this.options.divider?f`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${B(e.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>
            </div>
        `}};y([h({type:Object})],I.prototype,"schema",2),y([$()],I.prototype,"value",2),y([$()],I.prototype,"invalidTips",2),y([$()],I.prototype,"labelPos",2),y([$()],I.prototype,"dirty",2),y([h({type:Boolean,reflect:true})],I.prototype,"noreactive",2),y([h({type:Boolean,reflect:true})],I.prototype,"compact",2),y([fa({slot:"value",flatten:true})],I.prototype,"_field",2),y([E(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],I.prototype,"input",2),y([rn({context:yi}),h({attribute:false})],I.prototype,"context",2);function R(t){return r=>customElements.get(t)?r:ha(t)(r)}exports.AutoFieldInput=class Z extends I{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return f`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=i=>i.map(s=>typeof s=="string"?s:s.value||s.label),o=(i,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let a=e(s),l=-1;a.some((u,m)=>{if(n&&this.value.startsWith(u)||!n&&this.value.endsWith(u))return n?(this._prefix=u,this.value=this.value.substring(u.length)):(this._suffix=u,this.value=this.value.substring(0,this.value.length-u.length)),l=m,true});let c=l===-1?"?":typeof s[l]=="string"?s[l]:s[l].label,d={type:s.length===1?"button":"dropdown",label:c,caret:!n};d.type==="dropdown"?d.items=s.map(u=>(u==="-"||(u=typeof u=="string"?{label:u}:u,u.onClick=()=>{n?this._prefix=u.value??u.label:this._suffix=u.value??u.label,this.onFieldChange();}),u)):typeof s[0]=="string"?d.label=s[0]:Object.assign(d,s[0]),d.syncMenu=true,d.pos=n?"before":"after",n?i.splice(0,0,d):i.push(d);}};this.options.prefix&&o(this.beforeActions,this.options.prefix),this.options.suffix&&o(this.afterActions,this.options.suffix,false);}onInputChange(e){let o=e.type;this.context.validAt==="input"&&o.includes("input")?this.onFieldInput():o.includes("change")&&this.onFieldChange();}renderInput(){return f`
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
        `}toState(e){let o=super.toState(e);return typeof o=="string"&&(this._prefix&&(o=this._prefix+o),this._suffix&&(o=o+this._suffix)),o}toInput(e){let o=super.toInput(e);return typeof o=="string"&&(this._prefix&&o.startsWith(this._prefix)&&(o=o.substring(this._prefix.length)),this._suffix&&o.endsWith(this._suffix)&&(o=o.substring(0,o.length-this._suffix.length))),o}};exports.AutoFieldInput.styles=[I.styles,x`
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
        `],exports.AutoFieldInput=y([R("auto-field-input")],exports.AutoFieldInput);var Wa=x`
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
`;var Kt=(t="value")=>(r,e)=>{let o=r.constructor,i=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(s,n,a){var l;let c=o.getPropertyOptions(t),d=typeof c.attribute=="string"?c.attribute:t;if(s===d){let u=c.converter||Me,g=(typeof u=="function"?u:(l=u?.fromAttribute)!=null?l:Me.fromAttribute)(a,c.type);this[t]!==g&&(this[e]=g);}i.call(this,s,n,a);};};var Vt=x`
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
`;var xo=new WeakMap,_o=new WeakMap,wo=new WeakMap,on=new WeakSet,Ci=new WeakMap,yt=class{constructor(t,r){this.handleFormData=e=>{let o=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(a=>{e.formData.append(i,a.toString());}):e.formData.append(i,s.toString()));},this.handleFormSubmit=e=>{var o;let i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=xo.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),Ci.set(this.host,[]);},this.handleInteraction=e=>{let o=Ci.get(this.host);o.includes(e.type)||o.push(e.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let o of e)if(typeof o.checkValidity=="function"&&!o.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let o of e)if(typeof o.reportValidity=="function"&&!o.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=$t({form:e=>{let o=e.form;if(o){let s=e.getRootNode().querySelector(`#${o}`);if(s)return s}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var o;return (o=e.disabled)!=null?o:false},reportValidity:e=>typeof e.reportValidity=="function"?e.reportValidity():true,checkValidity:e=>typeof e.checkValidity=="function"?e.checkValidity():true,setValue:(e,o)=>e.value=o,assumeInteractionOn:["sl-input"]},r);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),Ci.set(this.host,[]),this.options.assumeInteractionOn.forEach(r=>{this.host.addEventListener(r,this.handleInteraction);});}hostDisconnected(){this.detachForm(),Ci.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,xo.has(this.form)?xo.get(this.form).add(this.host):xo.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),_o.has(this.form)||(_o.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),wo.has(this.form)||(wo.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=xo.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),_o.has(this.form)&&(this.form.reportValidity=_o.get(this.form),_o.delete(this.form)),wo.has(this.form)&&(this.form.checkValidity=wo.get(this.form),wo.delete(this.form)),this.form=void 0));}setUserInteracted(t,r){r?on.add(t):on.delete(t),t.requestUpdate();}doAction(t,r){if(this.form){let e=document.createElement("button");e.type=t,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",r&&(e.name=r.name,e.value=r.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{r.hasAttribute(o)&&e.setAttribute(o,r.getAttribute(o));})),this.form.append(e),e.click(),e.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let r=this.host,e=!!on.has(r),o=!!r.required;r.toggleAttribute("data-required",o),r.toggleAttribute("data-optional",!o),r.toggleAttribute("data-invalid",!t),r.toggleAttribute("data-valid",t),r.toggleAttribute("data-user-invalid",!t&&e),r.toggleAttribute("data-user-valid",t&&e);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let r=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||r.preventDefault(),this.host.dispatchEvent(r)||t?.preventDefault();}},Pr=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),qa=Object.freeze(Se($t({},Pr),{valid:false,valueMissing:true})),Ka=Object.freeze(Se($t({},Pr),{valid:false,customError:true}));var ht=class{constructor(t,...r){this.slotNames=[],this.handleSlotChange=e=>{let o=e.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=r;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let r=t;if(r.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!r.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function Ga(t){if(!t)return "";let r=t.assignedNodes({flatten:true}),e="";return [...r].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(e+=o.textContent);}),e}var Ya=x`
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
`;function O(t,r){let e=$t({waitUntilFirstUpdate:false},r);return (o,i)=>{let{update:s}=o,n=Array.isArray(t)?t:[t];o.update=function(a){n.forEach(l=>{let c=l;if(a.has(c)){let d=a.get(c),u=this[c];d!==u&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[i](d,u);}}),s.call(this,a);};}}var L=x`
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
`;var ki,P=class extends ut{constructor(){super(),Ta(this,ki,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,r])=>{this.constructor.define(t,r);});}emit(t,r){let e=new CustomEvent(t,$t({bubbles:true,cancelable:false,composed:true,detail:{}},r));return this.dispatchEvent(e),e}static define(t,r=this,e={}){let o=customElements.get(t);if(!o){try{customElements.define(t,r,e);}catch{customElements.define(t,class extends r{},e);}return}let i=" (unknown version)",s=i;"version"in r&&r.version&&(i=" v"+r.version),"version"in o&&o.version&&(s=" v"+o.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,r,e){Oa(this,ki)||(this.constructor.elementProperties.forEach((o,i)=>{o.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i]);}),Ra(this,ki,true)),super.attributeChangedCallback(t,r,e);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((r,e)=>{t.has(e)&&this[e]==null&&(this[e]=r);});}};ki=new WeakMap;P.version="2.20.1";P.dependencies={};p([h()],P.prototype,"dir",2);p([h()],P.prototype,"lang",2);var So=Symbol(),Ai=Symbol(),sn,nn=new Map,q=class extends P{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,r){var e;let o;if(r?.spriteSheet)return this.svg=f`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?So:Ai}catch{return Ai}try{let i=document.createElement("div");i.innerHTML=await o.text();let s=i.firstElementChild;if(((e=s?.tagName)==null?void 0:e.toLowerCase())!=="svg")return So;sn||(sn=new DOMParser);let a=sn.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):So}catch{return So}}connectedCallback(){super.connectedCallback(),Gs(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),Ys(this);}getIconSource(){let t=$r(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:r,fromLibrary:e}=this.getIconSource(),o=e?$r(this.library):void 0;if(!r){this.svg=null;return}let i=nn.get(r);if(i||(i=this.resolveIcon(r,o),nn.set(r,i)),!this.initialRender)return;let s=await i;if(s===Ai&&nn.delete(r),r===this.getIconSource().url){if(Fa(s)){if(this.svg=s,o){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n);}return}switch(s){case Ai:case So:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=o?.mutator)==null||t.call(o,this.svg),this.emit("sl-load");}}}render(){return this.svg}};q.styles=[L,Ya];p([$()],q.prototype,"svg",2);p([h({reflect:true})],q.prototype,"name",2);p([h()],q.prototype,"src",2);p([h()],q.prototype,"label",2);p([h({reflect:true})],q.prototype,"library",2);p([O("label")],q.prototype,"handleLabelChange",1);p([O(["name","src","library"])],q.prototype,"setIcon",1);var M=Nt(class extends Lt{constructor(t){if(super(t),t.type!==St.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(r=>t[r]).join(" ")+" "}update(t,[r]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in r)r[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(r)}let e=t.element.classList;for(let o of this.st)o in r||(e.remove(o),this.st.delete(o));for(let o in r){let i=!!r[o];i===this.st.has(o)||this.nt?.has(o)||(i?(e.add(o),this.st.add(o)):(e.remove(o),this.st.delete(o)));}return pt}});var Ot=Nt(class extends Lt{constructor(t){if(super(t),t.type!==St.PROPERTY&&t.type!==St.ATTRIBUTE&&t.type!==St.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_i(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[r]){if(r===pt||r===X)return r;let e=t.element,o=t.name;if(t.type===St.PROPERTY){if(r===e[o])return pt}else if(t.type===St.BOOLEAN_ATTRIBUTE){if(!!r===e.hasAttribute(o))return pt}else if(t.type===St.ATTRIBUTE&&e.getAttribute(o)===r+"")return pt;return wi(t),r}});var at=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,r)=>t.checked=r}),this.hasSlotController=new ht(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),r=this.helpText?true:!!t;return f`
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
            value=${w(this.value)}
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
          aria-hidden=${r?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};at.styles=[L,Vt,Wa];at.dependencies={"sl-icon":q};p([E('input[type="checkbox"]')],at.prototype,"input",2);p([$()],at.prototype,"hasFocus",2);p([h()],at.prototype,"title",2);p([h()],at.prototype,"name",2);p([h()],at.prototype,"value",2);p([h({reflect:true})],at.prototype,"size",2);p([h({type:Boolean,reflect:true})],at.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],at.prototype,"checked",2);p([h({type:Boolean,reflect:true})],at.prototype,"indeterminate",2);p([Kt("checked")],at.prototype,"defaultChecked",2);p([h({reflect:true})],at.prototype,"form",2);p([h({type:Boolean,reflect:true})],at.prototype,"required",2);p([h({attribute:"help-text"})],at.prototype,"helpText",2);p([O("disabled",{waitUntilFirstUpdate:true})],at.prototype,"handleDisabledChange",1);p([O(["checked","indeterminate"],{waitUntilFirstUpdate:true})],at.prototype,"handleStateChange",1);at.define("sl-checkbox");exports.AutoFieldCheckbox=class Co extends I{renderInput(){return f`
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
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let r=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof r=="boolean"?"":r}}renderView(){return f` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `}};exports.AutoFieldCheckbox.styles=[I.styles,x`
            sl-checkbox.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=y([R("auto-field-checkbox")],exports.AutoFieldCheckbox);var Xa=x`
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
`;var le=class extends P{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return f`
      <span
        part="base"
        class=${M({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?f` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};le.styles=[L,Xa];le.dependencies={"sl-icon":q};p([$()],le.prototype,"checked",2);p([$()],le.prototype,"hasFocus",2);p([h()],le.prototype,"value",2);p([h({reflect:true})],le.prototype,"size",2);p([h({type:Boolean,reflect:true})],le.prototype,"disabled",2);p([O("checked")],le.prototype,"handleCheckedChange",1);p([O("disabled",{waitUntilFirstUpdate:true})],le.prototype,"handleDisabledChange",1);le.define("sl-radio");var Ja=x`
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
`;var Za=x`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var Fe=class extends P{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let r=ko(t.target);r?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let r=ko(t.target);r?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let r=ko(t.target);r?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let r=ko(t.target);r?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(r=>{let e=t.indexOf(r),o=ko(r);o&&(o.toggleAttribute("data-sl-button-group__button",true),o.toggleAttribute("data-sl-button-group__button--first",e===0),o.toggleAttribute("data-sl-button-group__button--inner",e>0&&e<t.length-1),o.toggleAttribute("data-sl-button-group__button--last",e===t.length-1),o.toggleAttribute("data-sl-button-group__button--radio",o.tagName.toLowerCase()==="sl-radio-button"));});}render(){return f`
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
    `}};Fe.styles=[L,Za];p([E("slot")],Fe.prototype,"defaultSlot",2);p([$()],Fe.prototype,"disableRole",2);p([h()],Fe.prototype,"label",2);function ko(t){var r;let e="sl-button, sl-radio-button";return (r=t.closest(e))!=null?r:t.querySelector(e)}var xt=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this),this.hasSlotController=new ht(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Ka:t?qa:Pr}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let r=t.target.closest("sl-radio, sl-radio-button"),e=this.getAllRadios(),o=this.value;!r||r.disabled||(this.value=r.value,e.forEach(i=>i.checked=i===r),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var r;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let e=this.getAllRadios().filter(a=>!a.disabled),o=(r=e.find(a=>a.checked))!=null?r:e[0],i=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=e.indexOf(o)+i;n<0&&(n=e.length-1),n>e.length-1&&(n=0),this.getAllRadios().forEach(a=>{a.checked=false,this.hasButtonGroup||a.setAttribute("tabindex","-1");}),this.value=e[n].value,e[n].checked=true,this.hasButtonGroup?e[n].shadowRoot.querySelector("button").focus():(e[n].setAttribute("tabindex","0"),e[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,r;let e=this.getAllRadios();if(await Promise.all(e.map(async o=>{await o.updateComplete,o.checked=o.value===this.value,o.size=this.size;})),this.hasButtonGroup=e.some(o=>o.tagName.toLowerCase()==="sl-radio-button"),e.length>0&&!e.some(o=>o.checked))if(this.hasButtonGroup){let o=(t=e[0].shadowRoot)==null?void 0:t.querySelector("button");o&&o.setAttribute("tabindex","0");}else e[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let o=(r=this.shadowRoot)==null?void 0:r.querySelector("sl-button-group");o&&(o.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(r=>r.checked=r.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,r=this.customValidityMessage!=="";return t||r?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let r=this.getAllRadios(),e=r.find(s=>s.checked),o=r.find(s=>!s.disabled),i=e||o;i&&i.focus(t);}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r,i=f`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return f`
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
    `}};xt.styles=[L,Vt,Ja];xt.dependencies={"sl-button-group":Fe};p([E("slot:not([name])")],xt.prototype,"defaultSlot",2);p([E(".radio-group__validation-input")],xt.prototype,"validationInput",2);p([$()],xt.prototype,"hasButtonGroup",2);p([$()],xt.prototype,"errorMessage",2);p([$()],xt.prototype,"defaultValue",2);p([h()],xt.prototype,"label",2);p([h({attribute:"help-text"})],xt.prototype,"helpText",2);p([h()],xt.prototype,"name",2);p([h({reflect:true})],xt.prototype,"value",2);p([h({reflect:true})],xt.prototype,"size",2);p([h({reflect:true})],xt.prototype,"form",2);p([h({type:Boolean,reflect:true})],xt.prototype,"required",2);p([O("size",{waitUntilFirstUpdate:true})],xt.prototype,"handleSizeChange",1);p([O("value")],xt.prototype,"handleValueChange",1);xt.define("sl-radio-group");exports.AutoFieldRadio=class Ao extends I{getInitialOptions(){return {card:false,select:[],valueKey:"value"}}renderOptionItemWithCard(r,e){if(this.options.card){let o=e[this.options.valueKey]||e.label,i=this.value===o;return f`<div
                class="card"
                style=${tt({width:this.options.itemWidth})}
            >
                <div class="body ${i?"selected":""}">
                    <sl-icon class="icon" name="settings"></sl-icon>
                    ${r}
                </div>
            </div>`}else return r}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(r){let e=r[this.options.valueKey]||r.label;return f`<sl-radio
            value="${e}"
            style=${tt({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
            >${r.label}<br /><span class="memo">${r.tips}</span></sl-radio
        >`}renderInput(){let r=this.options.select.map(e=>{let o={};return typeof e=="object"?Object.assign(o,e):Object.assign(o,{label:e}),o});return f`
            <sl-radio-group class="value" name=${this.name} value="${this.value}" size="${this.context.size}" @sl-change=${this.onRadioChange.bind(this)}>
                ${r.map(e=>this.renderOptionItemWithCard(this.renderOptionItem(e),e))}
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
        `],exports.AutoFieldRadio=y([R("auto-field-radio")],exports.AutoFieldRadio);var Qa=x`
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
`;var K=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ht(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,r,e="none"){this.input.setSelectionRange(t,r,e);}setRangeText(t,r,e,o="preserve"){let i=r??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,o),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r;return f`
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
              name=${w(this.name)}
              .value=${Ot(this.value)}
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};K.styles=[L,Vt,Qa];p([E(".textarea__control")],K.prototype,"input",2);p([E(".textarea__size-adjuster")],K.prototype,"sizeAdjuster",2);p([$()],K.prototype,"hasFocus",2);p([h()],K.prototype,"title",2);p([h()],K.prototype,"name",2);p([h()],K.prototype,"value",2);p([h({reflect:true})],K.prototype,"size",2);p([h({type:Boolean,reflect:true})],K.prototype,"filled",2);p([h()],K.prototype,"label",2);p([h({attribute:"help-text"})],K.prototype,"helpText",2);p([h()],K.prototype,"placeholder",2);p([h({type:Number})],K.prototype,"rows",2);p([h()],K.prototype,"resize",2);p([h({type:Boolean,reflect:true})],K.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],K.prototype,"readonly",2);p([h({reflect:true})],K.prototype,"form",2);p([h({type:Boolean,reflect:true})],K.prototype,"required",2);p([h({type:Number})],K.prototype,"minlength",2);p([h({type:Number})],K.prototype,"maxlength",2);p([h()],K.prototype,"autocapitalize",2);p([h()],K.prototype,"autocorrect",2);p([h()],K.prototype,"autocomplete",2);p([h({type:Boolean})],K.prototype,"autofocus",2);p([h()],K.prototype,"enterkeyhint",2);p([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],K.prototype,"spellcheck",2);p([h()],K.prototype,"inputmode",2);p([Kt()],K.prototype,"defaultValue",2);p([O("disabled",{waitUntilFirstUpdate:true})],K.prototype,"handleDisabledChange",1);p([O("rows",{waitUntilFirstUpdate:true})],K.prototype,"handleRowsChange",1);p([O("value",{waitUntilFirstUpdate:true})],K.prototype,"handleValueChange",1);K.define("sl-textarea");exports.AutoFieldTextArea=class $o extends I{renderInput(){return f`
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
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea.styles=[I.styles,x`
            sl-textarea::part(textarea) {
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTextArea=y([R("auto-field-textarea")],exports.AutoFieldTextArea);var tl=x`
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
`;var Ct=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,r)=>t.checked=r}),this.hasSlotController=new ht(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),r=this.helpText?true:!!t;return f`
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
            value=${w(this.value)}
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
          aria-hidden=${r?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Ct.styles=[L,Vt,tl];p([E('input[type="checkbox"]')],Ct.prototype,"input",2);p([$()],Ct.prototype,"hasFocus",2);p([h()],Ct.prototype,"title",2);p([h()],Ct.prototype,"name",2);p([h()],Ct.prototype,"value",2);p([h({reflect:true})],Ct.prototype,"size",2);p([h({type:Boolean,reflect:true})],Ct.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],Ct.prototype,"checked",2);p([Kt("checked")],Ct.prototype,"defaultChecked",2);p([h({reflect:true})],Ct.prototype,"form",2);p([h({type:Boolean,reflect:true})],Ct.prototype,"required",2);p([h({attribute:"help-text"})],Ct.prototype,"helpText",2);p([O("checked",{waitUntilFirstUpdate:true})],Ct.prototype,"handleCheckedChange",1);p([O("disabled",{waitUntilFirstUpdate:true})],Ct.prototype,"handleDisabledChange",1);Ct.define("sl-switch");exports.AutoFieldSwitch=class Eo extends I{renderInput(){return f`
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
        `}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let r=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof r=="boolean"?"":r}}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return f` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `}};exports.AutoFieldSwitch.styles=[I.styles,x`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=y([R("auto-field-switch")],exports.AutoFieldSwitch);var $i=x`
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
`;var el=x`
  ${$i}

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
`;var ol=Symbol.for(""),pu=t=>{if(t?.r===ol)return t?._$litStatic$};var Lr=(t,...r)=>({_$litStatic$:r.reduce((e,o,i)=>e+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[i+1],t[0]),r:ol}),rl=new Map,an=t=>(r,...e)=>{let o=e.length,i,s,n=[],a=[],l,c=0,d=false;for(;c<o;){for(l=r[c];c<o&&(s=e[c],(i=pu(s))!==void 0);)l+=i+r[++c],d=true;c!==o&&a.push(s),n.push(l),c++;}if(c===o&&n.push(r[o]),d){let u=n.join("$$lit$$");(r=rl.get(u))===void 0&&(n.raw=n,rl.set(u,r=n)),e=a;}return t(r,...e)},je=an(f);var Gt=class extends P{constructor(){super(...arguments),this.hasSlotController=new ht(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return je`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${M({button:true,"button--default":true,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":true,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
    `}};Gt.styles=[L,el];p([E(".button")],Gt.prototype,"input",2);p([E(".hidden-input")],Gt.prototype,"hiddenInput",2);p([$()],Gt.prototype,"hasFocus",2);p([h({type:Boolean,reflect:true})],Gt.prototype,"checked",2);p([h()],Gt.prototype,"value",2);p([h({type:Boolean,reflect:true})],Gt.prototype,"disabled",2);p([h({reflect:true})],Gt.prototype,"size",2);p([h({type:Boolean,reflect:true})],Gt.prototype,"pill",2);p([O("disabled",{waitUntilFirstUpdate:true})],Gt.prototype,"handleDisabledChange",1);Gt.define("sl-radio-button");exports.AutoFieldRadioButton=class Oo extends I{getInitialOptions(){return {valueKey:"value"}}renderRadioItem(r){let e=r[this.options.valueKey];return f`<sl-radio-button value="${e}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${r.label}</sl-radio-button>`}renderInput(){let r=this.getOptionValue("select",[]).map((e,o)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{label:e,value:o+1}),i});return f`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${r.map(e=>this.renderRadioItem(e))}
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
        `],exports.AutoFieldRadioButton=y([R("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class Ei extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=y([R("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class Oi extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=y([R("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class Ti extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=y([R("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class Ri extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=y([R("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class Ii extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();}};exports.AutoFieldEmail=y([R("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class Mi extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=y([R("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class Pi extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=y([R("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class Li extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=y([R("auto-field-phone")],exports.AutoFieldPhone);var zi=class{constructor(r,e){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=r,this.options={...this.options,...e},r.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(r){let e=r.target;if(this.isPreviewActive){this.closePreview();return}e.matches(this.options.selector)&&(r.preventDefault(),r.stopPropagation(),this.originalImage=e,this.showPreview(this.originalImage));}showPreview(r){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let e=this.options.overlayColor,o=this.hexToRgb(e);this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=r.src,this.previewImage.alt=r.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let i=r.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",this.closePreview.bind(this)),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:a,height:l}=this.calculateAspectRatioFit(r.naturalWidth,r.naturalHeight,s*.9,n*.9),c=(n-l)/2,d=(s-a)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${c}px`,this.previewImage.style.left=`${d}px`,this.previewImage.style.width=`${a}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let r=window.innerWidth,e=window.innerHeight,{width:o,height:i}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,r*.9,e*.9),s=(e-i)/2,n=(r-o)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${o}px`,this.previewImage.style.height=`${i}px`);});}handleKeydown(r){r.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let r=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${r.top}px`,this.previewImage.style.left=`${r.left}px`,this.previewImage.style.width=`${r.width}px`,this.previewImage.style.height=`${r.height}px`;});let e=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${e.r}, ${e.g}, ${e.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(r,e,o,i){if(r<=o&&e<=i)return {width:r,height:e};let s=Math.min(o/r,i/e);return {width:r*s,height:e*s}}hexToRgb(r){r=r.replace(/^#/,""),r.length===3&&(r=r.split("").map(s=>s+s).join(""));let e=parseInt(r.substring(0,2),16),o=parseInt(r.substring(2,4),16),i=parseInt(r.substring(4,6),16);return {r:isNaN(e)?0:e,g:isNaN(o)?0:o,b:isNaN(i)?0:i}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var ln=class{constructor(r,e){for(this.options=Object.assign({width:"8px"},e),this.target=r,this.content=r.firstElementChild,this.direction=window.getComputedStyle(this.target).direction,this.scrollRatio=1,this.bar=null,this.wrapper=document.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=document.createElement("div"),this.el.setAttribute("class","ss-content"),this.direction==="rtl"&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",'<div class="ss-scroll">'),this.bar=this.target.lastChild,this.bar.style.width=this.options.width,this.mB=this.moveBar.bind(this),this.dragDealer(this.bar),this.moveBar(),window.addEventListener("resize",this.mB),this.el.addEventListener("scroll",this.mB),this.el.addEventListener("mouseenter",this.mB),this.target.classList.add("ss-container");let o=window.getComputedStyle(r);o.height==="0px"&&o["max-height"]!=="0px"&&(r.style.height=o["max-height"]);}dragDealer(r){let e,o=n=>{let a=n.pageY-e;e=n.pageY,this.requestAnimationFrame(()=>{this.el&&(this.el.scrollTop+=a/this.scrollRatio);});},i=()=>{r.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",i);},s=n=>(e=n.pageY,r.classList.add("ss-grabbed"),document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i),false);r.mouseDownHandler=s,r.addEventListener("mousedown",s);}requestAnimationFrame(r){window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,0);}moveBar(){if(!this.el||!this.target)return;let r=this.el.scrollHeight,e=this.el.clientHeight;this.scrollRatio=e/r;let i=this.direction==="rtl"&&this.bar?this.target.clientWidth-this.bar.clientWidth+18:this.bar?(this.target.clientWidth-this.bar.clientWidth)*-1:0;this.requestAnimationFrame(()=>{this.scrollRatio>=1?this.bar?.classList.add("ss-hidden"):(this.bar?.classList.remove("ss-hidden"),this.bar&&(this.bar.style.cssText="height:"+Math.max(this.scrollRatio*100,10)+"%; top:"+this.el.scrollTop/r*100+"%;right:"+i+"px;"));});}destroy(){if(window.removeEventListener("resize",this.mB),this.el&&(this.el.removeEventListener("scroll",this.mB),this.el.removeEventListener("mouseenter",this.mB)),this.bar?.mouseDownHandler&&(this.bar.removeEventListener("mousedown",this.bar.mouseDownHandler),delete this.bar.mouseDownHandler),this.target){this.target.classList.remove("ss-container");try{this.content&&this.wrapper&&this.target.insertBefore(this.content,this.wrapper),this.wrapper&&this.target.removeChild(this.wrapper);}catch(r){console.error("Error restoring DOM structure during scrollbar destroy:",r);}if(this.bar){try{this.target.removeChild(this.bar);}catch(r){console.error("Error removing scrollbar during destroy:",r);}this.bar=null;}}this.target=null,this.content=null,this.wrapper=null,this.el=null,this.mB=null;}},nr=class{constructor(r){this._scrollbars=[];this.host=r,r.addController(this);}static{this.styles=x`
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
    `;}create(r,e){let o=new ln(r,e);return this._scrollbars.push(o),o}hostConnected(){}hostUpdate(){}hostDisconnected(){for(let r of this._scrollbars)r.destroy();this._scrollbars=[];}};var uu=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],hu=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function du(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return uu.includes(`.${o}`)}function fu(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return hu.includes(`.${o}`)}exports.AutoFieldUpload=class zr extends I{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new zi(this);}retryUpload(e){this.startUpload(e.file,e.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:true}}_getDefaultFileLabel(e){return typeof e=="string"?e:e.title||e.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(e=>e!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(e){let o=e.target;if(!o.files||o.files.length===0)return;Array.from(o.files).forEach(s=>this.uploadFile(s)),o.value="";}handleDragOver(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(e){if(e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!e.dataTransfer?.files)return;let i=Array.from(e.dataTransfer.files);if(!this.options?.multiple&&i.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=i.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(a=>a==="*"?true:a.startsWith(".")?n.name.toLowerCase().endsWith(a.toLowerCase()):n.type.startsWith(a)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}i.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(e){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let o={id:this.generateId(),file:e,progress:0,status:"uploading",value:{url:e.name}};return this.files.push(o),this.startUpload(e,o.id)}_updateFileRecord(e,o){let i=this.files.findIndex(s=>s.id===e);i!==-1&&(this.files=[...this.files.slice(0,i),{...this.files[i],...o},...this.files.slice(i+1)]);}_getResponseError(e){let o="\u4E0A\u4F20\u5931\u8D25";try{let i=JSON.parse(e.responseText);o=i.message||i.error||o;}catch{switch(e.status){case 400:o="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:o="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:o="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:o="\u6587\u4EF6\u592A\u5927";break;case 415:o="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:o="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:o="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:o=`\u4E0A\u4F20\u5931\u8D25 (${e.status})`;}}return new Error(o)}_defaultFileResolver(e){if(typeof e=="string")return e;if(typeof e=="object"){if(!e.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return e}}_parseUploadResponse(e){let o={};try{Object.assign(o,JSON.parse(e));}catch{o=e;}return typeof this.options.onResolve=="function"&&(o=this.options.onResolve(o)),o}async startUpload(e,o){let i=this.files.findIndex(n=>n.id===o);if(i===-1)return;let s=this.files[i];return new Promise((n,a)=>{let l=new XMLHttpRequest,c=new FormData;c.append(this.options.fileFieldName,e),l.upload.onprogress=d=>{if(d.lengthComputable){let u=Math.round(d.loaded/d.total*100);this._updateFileRecord(o,{progress:u});}},l.onload=()=>{if(this.files.findIndex(u=>u.id===o)!==-1)if(l.status>=200&&l.status<300){this._updateFileRecord(o,{status:"done"});try{let u=this._parseUploadResponse(l.responseText);this._updateFileRecord(o,{value:u}),s.status="done",this.onFieldChange(),n();}catch{let u=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(o,u),a(u);}}else {let u=this._getResponseError(l);this.handleUploadError(o,u),a(u);}},l.onerror=()=>{if(this.files.findIndex(m=>m.id===o)===-1)return;let u=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(o,u),a(u);},l.ontimeout=()=>{if(this.files.findIndex(m=>m.id===o)===-1)return;let u=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(o,u),a(u);},l.open("POST",this.options.url),this._updateFileRecord(o,{progress:0,status:"uploading"}),l.send(c);})}handleUploadError(e,o){this._updateFileRecord(e,{error:o.message,status:"error"});}deleteFile(e){let o=this.files.findIndex(a=>a.id===e);if(o===-1)return;let i=this.files[o],s=i.status==="uploading"||i.status==="error",n=()=>{this.files=[...this.files.slice(0,o),...this.files.slice(o+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,i.value)).then(()=>{n(),this.onFieldChange();}).catch(a=>{alert(a.message);}):(n(),this.onFieldChange());}getInputValue(){if(this.options.multiple){let e=this.files.map(o=>o.value);return this.options.onlyFileUrl?e.map(o=>typeof o=="object"?o.url:o):e}else {let e=this.files.length>0?this.files[0].value:void 0;if(e)return this.options.onlyFileUrl&&typeof e=="object"?e.url:e}}getStateValue(){let e=super.getStateValue();return Array.isArray(e)||(e=[e]),this.files=e.map((o,i)=>{let s={id:String(i),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof o=="string"?s.value=o:typeof o=="object"&&(s.value=Object.assign({},s.value,o)),s}),e}renderProgressbar(e,o){if(e.status!=="uploading")return;let i=o==="hori"?`width:${e.progress}%;`:`height:${e.progress}%;top:${100-e.progress}%`;return f`<span
            class="uploading progressbar ${M({hori:o==="hori",vert:o==="vert"})}"
            style="${i}"
        >
            <span class="value">${e.progress}%</span>
        </span> `}renderFileContent(e){if(e.error)return;let o=typeof e.value=="string"?e.value:e.value.url,i;if(du(o))i=f` <img class="content" src="${o}" /> `;else if(fu(o))i=f` <video class="content" src="${o}"></video> `;else {let s=o.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,i=f`<div class="content">${s}</div>`;}return i}renderFilePreview(e){let o=!!e.error,i=typeof this.options.preview=="boolean"?"80px":this.options.preview;return f`
            <div
                class="file preview ${M({error:o})}"
                title=${e.error||this.options.onFileLabel(e.value)}
                style="${tt({width:i,height:i})}"
            >
                ${this.renderFileContent(e)} ${this.renderProgressbar(e,"vert")}
                ${B(e.status==="error",()=>f`<div class="error" title="${e.error}">
                            <span>上传出错</span>
                            <span>
                                <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                                <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>
                            </span>
                        </div>`,()=>{if(!this.context.viewonly)return f`<sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>`})}
            </div>
        `}renderFile(e){let o=!!e.error;return f`
            <auto-flex class="file default ${M({error:o})}" wrap align="center" gap="0.5rem" title=${w(e.error)}>
                ${this.renderProgressbar(e,"hori")}
                <span class="label">${this.options.onFileLabel(e.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                ${B(e.status==="error",()=>f`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>`)}
            </auto-flex>
        `}renderFiels(){return f`<auto-flex class="files" grow="none" gap="0.5rem" wrap>
            ${B(this.files.length>0,()=>rt(this.files,e=>this.options.preview?this.renderFilePreview(e):this.renderFile(e)),()=>f`<span class="placeholder">${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </auto-flex>`}renderInput(){return f`
            <auto-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${B(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>f`<div
                        class="indicator"
                        @click=${this.handleUploadClick}
                        @dragover=${this.handleDragOver}
                        @dragleave=${this.handleDragLeave}
                        @drop=${this.handleDrop}
                    >
                        ${this.options.tips}
                    </div>`)}
                <auto-flex class="actions" align="center" grow=".actions.after" gap="0.5rem">
                    ${B(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>f`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}
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
        `],y([$()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=y([R("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class Vi extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=y([R("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class To extends I{getInitialOptions(){return {size:"medium"}}_onPartFocus(r){r.target.select();}_getIpBits(){let r=this.value?.split(".");return [parseInt(r[0]||"0"),parseInt(r[1]||"0"),parseInt(r[2]||"0"),parseInt(r[3]||"0")]}_onIpChange(r,e){this.onFieldChange(),this._isLastInput(e);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(e=>e.value).join(".")}_isLastInput(r){let e=r.target;if(e.value.length>=3){e.blur();let o=e.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(r){r.preventDefault();let e=r.target,o=r.clipboardData?.getData("text/plain")||"",i=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=o.match(i);if(!s)return;let n=[],a=e;for(let l=0;l<4&&a;l++)a.tagName==="SL-INPUT"&&n.push(a),a=a.nextElementSibling?.nextElementSibling;for(let l=0;l<Math.min(4,n.length);l++)n[l].value=s[l+1],n[l].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let l=n[Math.min(3,n.length-1)];l.focus(),l.select();}}renderInput(){return f`
            <auto-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((r,e)=>f`
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
                            @sl-input=${o=>this._onIpChange(e,o)}
                            @sl-change=${o=>this._onIpChange(e,o)}
                            @sl-focus=${this._onPartFocus.bind(this)}
                            @paste=${o=>this._onPaste(o)}
                        ></sl-input>
                        ${e<3?f`<span class="dot">.</span>`:""}
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
        `],exports.AutoFieldIpAddress=y([R("auto-field-ipaddress")],exports.AutoFieldIpAddress);var il=x`
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
`;var sl=x`
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
`;var dt=class extends P{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,r=t?Lr`a`:Lr`button`;return je`
      <${r}
        part="base"
        class=${M({"icon-button":true,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
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
      </${r}>
    `}};dt.styles=[L,sl];dt.dependencies={"sl-icon":q};p([E(".icon-button")],dt.prototype,"button",2);p([$()],dt.prototype,"hasFocus",2);p([h()],dt.prototype,"name",2);p([h()],dt.prototype,"library",2);p([h()],dt.prototype,"src",2);p([h()],dt.prototype,"href",2);p([h()],dt.prototype,"target",2);p([h()],dt.prototype,"download",2);p([h()],dt.prototype,"label",2);p([h({type:Boolean,reflect:true})],dt.prototype,"disabled",2);var cn=new Set,Vr=new Map,ar,pn="ltr",un="en",nl=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(nl){let t=new MutationObserver(al);pn=document.documentElement.dir||"ltr",un=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function Ro(...t){t.map(r=>{let e=r.$code.toLowerCase();Vr.has(e)?Vr.set(e,Object.assign(Object.assign({},Vr.get(e)),r)):Vr.set(e,r),ar||(ar=r);}),al();}function al(){nl&&(pn=document.documentElement.dir||"ltr",un=document.documentElement.lang||navigator.language),[...cn.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var Di=class{constructor(r){this.host=r,this.host.addController(this);}hostConnected(){cn.add(this.host);}hostDisconnected(){cn.delete(this.host);}dir(){return `${this.host.dir||pn}`.toLowerCase()}lang(){return `${this.host.lang||un}`.toLowerCase()}getTranslationData(r){var e,o;let i=new Intl.Locale(r.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(o=(e=i?.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&o!==void 0?o:"",a=Vr.get(`${s}-${n}`),l=Vr.get(s);return {locale:i,language:s,region:n,primary:a,secondary:l}}exists(r,e){var o;let{primary:i,secondary:s}=this.getTranslationData((o=e.lang)!==null&&o!==void 0?o:this.lang());return e=Object.assign({includeFallback:false},e),!!(i&&i[r]||s&&s[r]||e.includeFallback&&ar&&ar[r])}term(r,...e){let{primary:o,secondary:i}=this.getTranslationData(this.lang()),s;if(o&&o[r])s=o[r];else if(i&&i[r])s=i[r];else if(ar&&ar[r])s=ar[r];else return console.error(`No translation found for: ${String(r)}`),String(r);return typeof s=="function"?s(...e):s}date(r,e){return r=new Date(r),new Intl.DateTimeFormat(this.lang(),e).format(r)}number(r,e){return r=Number(r),isNaN(r)?"":new Intl.NumberFormat(this.lang(),e).format(r)}relativeTime(r,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(r,e)}};var ll={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,r)=>`Go to slide ${t} of ${r}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Ro(ll);var cl=ll;var H=class extends Di{};Ro(cl);var me=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return f`
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
    `}};me.styles=[L,il];me.dependencies={"sl-icon-button":dt};p([h({reflect:true})],me.prototype,"variant",2);p([h({reflect:true})],me.prototype,"size",2);p([h({type:Boolean,reflect:true})],me.prototype,"pill",2);p([h({type:Boolean})],me.prototype,"removable",2);var pl=x`
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
`;function mu(t,r){return {top:Math.round(t.getBoundingClientRect().top-r.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-r.getBoundingClientRect().left)}}function Io(t,r,e="vertical",o="smooth"){let i=mu(t,r),s=i.top+r.scrollTop,n=i.left+r.scrollLeft,a=r.scrollLeft,l=r.scrollLeft+r.offsetWidth,c=r.scrollTop,d=r.scrollTop+r.offsetHeight;(e==="horizontal"||e==="both")&&(n<a?r.scrollTo({left:n,behavior:o}):n+t.clientWidth>l&&r.scrollTo({left:n-r.offsetWidth+t.clientWidth,behavior:o})),(e==="vertical"||e==="both")&&(s<c?r.scrollTo({top:s,behavior:o}):s+t.clientHeight>d&&r.scrollTo({top:s-r.offsetHeight+t.clientHeight,behavior:o}));}var ul=x`
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
`;var ge=Math.min,Tt=Math.max,Po=Math.round,Lo=Math.floor,ce=t=>({x:t,y:t}),gu={left:"right",right:"left",bottom:"top",top:"bottom"},bu={start:"end",end:"start"};function ji(t,r,e){return Tt(t,ge(r,e))}function lr(t,r){return typeof t=="function"?t(r):t}function Ce(t){return t.split("-")[0]}function cr(t){return t.split("-")[1]}function hn(t){return t==="x"?"y":"x"}function Bi(t){return t==="y"?"height":"width"}var vu=new Set(["top","bottom"]);function be(t){return vu.has(Ce(t))?"y":"x"}function Hi(t){return hn(be(t))}function fl(t,r,e){e===void 0&&(e=false);let o=cr(t),i=Hi(t),s=Bi(i),n=i==="x"?o===(e?"end":"start")?"right":"left":o==="start"?"bottom":"top";return r.reference[s]>r.floating[s]&&(n=Mo(n)),[n,Mo(n)]}function ml(t){let r=Mo(t);return [Fi(t),r,Fi(r)]}function Fi(t){return t.replace(/start|end/g,r=>bu[r])}var hl=["left","right"],dl=["right","left"],yu=["top","bottom"],xu=["bottom","top"];function _u(t,r,e){switch(t){case "top":case "bottom":return e?r?dl:hl:r?hl:dl;case "left":case "right":return r?yu:xu;default:return []}}function gl(t,r,e,o){let i=cr(t),s=_u(Ce(t),e==="start",o);return i&&(s=s.map(n=>n+"-"+i),r&&(s=s.concat(s.map(Fi)))),s}function Mo(t){return t.replace(/left|right|bottom|top/g,r=>gu[r])}function wu(t){return {top:0,right:0,bottom:0,left:0,...t}}function dn(t){return typeof t!="number"?wu(t):{top:t,right:t,bottom:t,left:t}}function pr(t){let{x:r,y:e,width:o,height:i}=t;return {width:o,height:i,top:e,left:r,right:r+o,bottom:e+i,x:r,y:e}}function bl(t,r,e){let{reference:o,floating:i}=t,s=be(r),n=Hi(r),a=Bi(n),l=Ce(r),c=s==="y",d=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,m=o[a]/2-i[a]/2,g;switch(l){case "top":g={x:d,y:o.y-i.height};break;case "bottom":g={x:d,y:o.y+o.height};break;case "right":g={x:o.x+o.width,y:u};break;case "left":g={x:o.x-i.width,y:u};break;default:g={x:o.x,y:o.y};}switch(cr(r)){case "start":g[n]-=m*(e&&c?-1:1);break;case "end":g[n]+=m*(e&&c?-1:1);break}return g}var vl=async(t,r,e)=>{let{placement:o="bottom",strategy:i="absolute",middleware:s=[],platform:n}=e,a=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(r)),c=await n.getElementRects({reference:t,floating:r,strategy:i}),{x:d,y:u}=bl(c,o,l),m=o,g={},b=0;for(let v=0;v<a.length;v++){let{name:k,fn:C}=a[v],{x:S,y:T,data:_,reset:A}=await C({x:d,y:u,initialPlacement:o,placement:m,strategy:i,middlewareData:g,rects:c,platform:n,elements:{reference:t,floating:r}});d=S??d,u=T??u,g={...g,[k]:{...g[k],..._}},A&&b<=50&&(b++,typeof A=="object"&&(A.placement&&(m=A.placement),A.rects&&(c=A.rects===true?await n.getElementRects({reference:t,floating:r,strategy:i}):A.rects),{x:d,y:u}=bl(c,m,l)),v=-1);}return {x:d,y:u,placement:m,strategy:i,middlewareData:g}};async function Ni(t,r){var e;r===void 0&&(r={});let{x:o,y:i,platform:s,rects:n,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:m=false,padding:g=0}=lr(r,t),b=dn(g),k=a[m?u==="floating"?"reference":"floating":u],C=pr(await s.getClippingRect({element:(e=await(s.isElement==null?void 0:s.isElement(k)))==null||e?k:k.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:c,rootBoundary:d,strategy:l})),S=u==="floating"?{x:o,y:i,width:n.floating.width,height:n.floating.height}:n.reference,T=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),_=await(s.isElement==null?void 0:s.isElement(T))?await(s.getScale==null?void 0:s.getScale(T))||{x:1,y:1}:{x:1,y:1},A=pr(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:S,offsetParent:T,strategy:l}):S);return {top:(C.top-A.top+b.top)/_.y,bottom:(A.bottom-C.bottom+b.bottom)/_.y,left:(C.left-A.left+b.left)/_.x,right:(A.right-C.right+b.right)/_.x}}var yl=t=>({name:"arrow",options:t,async fn(r){let{x:e,y:o,placement:i,rects:s,platform:n,elements:a,middlewareData:l}=r,{element:c,padding:d=0}=lr(t,r)||{};if(c==null)return {};let u=dn(d),m={x:e,y:o},g=Hi(i),b=Bi(g),v=await n.getDimensions(c),k=g==="y",C=k?"top":"left",S=k?"bottom":"right",T=k?"clientHeight":"clientWidth",_=s.reference[b]+s.reference[g]-m[g]-s.floating[b],A=m[g]-s.reference[g],V=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c)),j=V?V[T]:0;(!j||!await(n.isElement==null?void 0:n.isElement(V)))&&(j=a.floating[T]||s.floating[b]);let W=_/2-A/2,D=j/2-v[b]/2-1,z=ge(u[C],D),mt=ge(u[S],D),lt=z,At=j-v[b]-mt,ct=j/2-v[b]/2+W,qt=ji(lt,ct,At),de=!l.arrow&&cr(i)!=null&&ct!==qt&&s.reference[b]/2-(ct<lt?z:mt)-v[b]/2<0,ne=de?ct<lt?ct-lt:ct-At:0;return {[g]:m[g]+ne,data:{[g]:qt,centerOffset:ct-qt-ne,...de&&{alignmentOffset:ne}},reset:de}}});var xl=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(r){var e,o;let{placement:i,middlewareData:s,rects:n,initialPlacement:a,platform:l,elements:c}=r,{mainAxis:d=true,crossAxis:u=true,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=true,...k}=lr(t,r);if((e=s.arrow)!=null&&e.alignmentOffset)return {};let C=Ce(i),S=be(a),T=Ce(a)===a,_=await(l.isRTL==null?void 0:l.isRTL(c.floating)),A=m||(T||!v?[Mo(a)]:ml(a)),V=b!=="none";!m&&V&&A.push(...gl(a,v,b,_));let j=[a,...A],W=await Ni(r,k),D=[],z=((o=s.flip)==null?void 0:o.overflows)||[];if(d&&D.push(W[C]),u){let ct=fl(i,n,_);D.push(W[ct[0]],W[ct[1]]);}if(z=[...z,{placement:i,overflows:D}],!D.every(ct=>ct<=0)){var mt,lt;let ct=(((mt=s.flip)==null?void 0:mt.index)||0)+1,qt=j[ct];if(qt&&(!(u==="alignment"?S!==be(qt):false)||z.every(ae=>be(ae.placement)===S?ae.overflows[0]>0:true)))return {data:{index:ct,overflows:z},reset:{placement:qt}};let de=(lt=z.filter(ne=>ne.overflows[0]<=0).sort((ne,ae)=>ne.overflows[1]-ae.overflows[1])[0])==null?void 0:lt.placement;if(!de)switch(g){case "bestFit":{var At;let ne=(At=z.filter(ae=>{if(V){let Re=be(ae.placement);return Re===S||Re==="y"}return  true}).map(ae=>[ae.placement,ae.overflows.filter(Re=>Re>0).reduce((Re,Ap)=>Re+Ap,0)]).sort((ae,Re)=>ae[1]-Re[1])[0])==null?void 0:At[0];ne&&(de=ne);break}case "initialPlacement":de=a;break}if(i!==de)return {reset:{placement:de}}}return {}}}};var Su=new Set(["left","top"]);async function Cu(t,r){let{placement:e,platform:o,elements:i}=t,s=await(o.isRTL==null?void 0:o.isRTL(i.floating)),n=Ce(e),a=cr(e),l=be(e)==="y",c=Su.has(n)?-1:1,d=s&&l?-1:1,u=lr(r,t),{mainAxis:m,crossAxis:g,alignmentAxis:b}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return a&&typeof b=="number"&&(g=a==="end"?b*-1:b),l?{x:g*d,y:m*c}:{x:m*c,y:g*d}}var _l=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(r){var e,o;let{x:i,y:s,placement:n,middlewareData:a}=r,l=await Cu(r,t);return n===((e=a.offset)==null?void 0:e.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:i+l.x,y:s+l.y,data:{...l,placement:n}}}}},wl=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(r){let{x:e,y:o,placement:i}=r,{mainAxis:s=true,crossAxis:n=false,limiter:a={fn:k=>{let{x:C,y:S}=k;return {x:C,y:S}}},...l}=lr(t,r),c={x:e,y:o},d=await Ni(r,l),u=be(Ce(i)),m=hn(u),g=c[m],b=c[u];if(s){let k=m==="y"?"top":"left",C=m==="y"?"bottom":"right",S=g+d[k],T=g-d[C];g=ji(S,g,T);}if(n){let k=u==="y"?"top":"left",C=u==="y"?"bottom":"right",S=b+d[k],T=b-d[C];b=ji(S,b,T);}let v=a.fn({...r,[m]:g,[u]:b});return {...v,data:{x:v.x-e,y:v.y-o,enabled:{[m]:s,[u]:n}}}}}};var Sl=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(r){var e,o;let{placement:i,rects:s,platform:n,elements:a}=r,{apply:l=()=>{},...c}=lr(t,r),d=await Ni(r,c),u=Ce(i),m=cr(i),g=be(i)==="y",{width:b,height:v}=s.floating,k,C;u==="top"||u==="bottom"?(k=u,C=m===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(C=u,k=m==="end"?"top":"bottom");let S=v-d.top-d.bottom,T=b-d.left-d.right,_=ge(v-d[k],S),A=ge(b-d[C],T),V=!r.middlewareData.shift,j=_,W=A;if((e=r.middlewareData.shift)!=null&&e.enabled.x&&(W=T),(o=r.middlewareData.shift)!=null&&o.enabled.y&&(j=S),V&&!m){let z=Tt(d.left,0),mt=Tt(d.right,0),lt=Tt(d.top,0),At=Tt(d.bottom,0);g?W=b-2*(z!==0||mt!==0?z+mt:Tt(d.left,d.right)):j=v-2*(lt!==0||At!==0?lt+At:Tt(d.top,d.bottom));}await l({...r,availableWidth:W,availableHeight:j});let D=await n.getDimensions(a.floating);return b!==D.width||v!==D.height?{reset:{rects:true}}:{}}}};function Ui(){return typeof window<"u"}function ur(t){return kl(t)?(t.nodeName||"").toLowerCase():"#document"}function Dt(t){var r;return (t==null||(r=t.ownerDocument)==null?void 0:r.defaultView)||window}function pe(t){var r;return (r=(kl(t)?t.ownerDocument:t.document)||window.document)==null?void 0:r.documentElement}function kl(t){return Ui()?t instanceof Node||t instanceof Dt(t).Node:false}function Yt(t){return Ui()?t instanceof Element||t instanceof Dt(t).Element:false}function ue(t){return Ui()?t instanceof HTMLElement||t instanceof Dt(t).HTMLElement:false}function Cl(t){return !Ui()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof Dt(t).ShadowRoot}var ku=new Set(["inline","contents"]);function Fr(t){let{overflow:r,overflowX:e,overflowY:o,display:i}=Xt(t);return /auto|scroll|overlay|hidden|clip/.test(r+o+e)&&!ku.has(i)}var Au=new Set(["table","td","th"]);function Al(t){return Au.has(ur(t))}var $u=[":popover-open",":modal"];function zo(t){return $u.some(r=>{try{return t.matches(r)}catch{return  false}})}var Eu=["transform","translate","scale","rotate","perspective"],Ou=["transform","translate","scale","rotate","perspective","filter"],Tu=["paint","layout","strict","content"];function jr(t){let r=Wi(),e=Yt(t)?Xt(t):t;return Eu.some(o=>e[o]?e[o]!=="none":false)||(e.containerType?e.containerType!=="normal":false)||!r&&(e.backdropFilter?e.backdropFilter!=="none":false)||!r&&(e.filter?e.filter!=="none":false)||Ou.some(o=>(e.willChange||"").includes(o))||Tu.some(o=>(e.contain||"").includes(o))}function $l(t){let r=ke(t);for(;ue(r)&&!hr(r);){if(jr(r))return r;if(zo(r))return null;r=ke(r);}return null}function Wi(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}var Ru=new Set(["html","body","#document"]);function hr(t){return Ru.has(ur(t))}function Xt(t){return Dt(t).getComputedStyle(t)}function Vo(t){return Yt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ke(t){if(ur(t)==="html")return t;let r=t.assignedSlot||t.parentNode||Cl(t)&&t.host||pe(t);return Cl(r)?r.host:r}function El(t){let r=ke(t);return hr(r)?t.ownerDocument?t.ownerDocument.body:t.body:ue(r)&&Fr(r)?r:El(r)}function Dr(t,r,e){var o;r===void 0&&(r=[]),e===void 0&&(e=true);let i=El(t),s=i===((o=t.ownerDocument)==null?void 0:o.body),n=Dt(i);if(s){let a=qi(n);return r.concat(n,n.visualViewport||[],Fr(i)?i:[],a&&e?Dr(a):[])}return r.concat(i,Dr(i,[],e))}function qi(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Il(t){let r=Xt(t),e=parseFloat(r.width)||0,o=parseFloat(r.height)||0,i=ue(t),s=i?t.offsetWidth:e,n=i?t.offsetHeight:o,a=Po(e)!==s||Po(o)!==n;return a&&(e=s,o=n),{width:e,height:o,$:a}}function mn(t){return Yt(t)?t:t.contextElement}function Br(t){let r=mn(t);if(!ue(r))return ce(1);let e=r.getBoundingClientRect(),{width:o,height:i,$:s}=Il(r),n=(s?Po(e.width):e.width)/o,a=(s?Po(e.height):e.height)/i;return (!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}var Iu=ce(0);function Ml(t){let r=Dt(t);return !Wi()||!r.visualViewport?Iu:{x:r.visualViewport.offsetLeft,y:r.visualViewport.offsetTop}}function Mu(t,r,e){return r===void 0&&(r=false),!e||r&&e!==Dt(t)?false:r}function dr(t,r,e,o){r===void 0&&(r=false),e===void 0&&(e=false);let i=t.getBoundingClientRect(),s=mn(t),n=ce(1);r&&(o?Yt(o)&&(n=Br(o)):n=Br(t));let a=Mu(s,e,o)?Ml(s):ce(0),l=(i.left+a.x)/n.x,c=(i.top+a.y)/n.y,d=i.width/n.x,u=i.height/n.y;if(s){let m=Dt(s),g=o&&Yt(o)?Dt(o):o,b=m,v=qi(b);for(;v&&o&&g!==b;){let k=Br(v),C=v.getBoundingClientRect(),S=Xt(v),T=C.left+(v.clientLeft+parseFloat(S.paddingLeft))*k.x,_=C.top+(v.clientTop+parseFloat(S.paddingTop))*k.y;l*=k.x,c*=k.y,d*=k.x,u*=k.y,l+=T,c+=_,b=Dt(v),v=qi(b);}}return pr({width:d,height:u,x:l,y:c})}function Ki(t,r){let e=Vo(t).scrollLeft;return r?r.left+e:dr(pe(t)).left+e}function Pl(t,r){let e=t.getBoundingClientRect(),o=e.left+r.scrollLeft-Ki(t,e),i=e.top+r.scrollTop;return {x:o,y:i}}function Pu(t){let{elements:r,rect:e,offsetParent:o,strategy:i}=t,s=i==="fixed",n=pe(o),a=r?zo(r.floating):false;if(o===n||a&&s)return e;let l={scrollLeft:0,scrollTop:0},c=ce(1),d=ce(0),u=ue(o);if((u||!u&&!s)&&((ur(o)!=="body"||Fr(n))&&(l=Vo(o)),ue(o))){let g=dr(o);c=Br(o),d.x=g.x+o.clientLeft,d.y=g.y+o.clientTop;}let m=n&&!u&&!s?Pl(n,l):ce(0);return {width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-l.scrollLeft*c.x+d.x+m.x,y:e.y*c.y-l.scrollTop*c.y+d.y+m.y}}function Lu(t){return Array.from(t.getClientRects())}function zu(t){let r=pe(t),e=Vo(t),o=t.ownerDocument.body,i=Tt(r.scrollWidth,r.clientWidth,o.scrollWidth,o.clientWidth),s=Tt(r.scrollHeight,r.clientHeight,o.scrollHeight,o.clientHeight),n=-e.scrollLeft+Ki(t),a=-e.scrollTop;return Xt(o).direction==="rtl"&&(n+=Tt(r.clientWidth,o.clientWidth)-i),{width:i,height:s,x:n,y:a}}var Ol=25;function Vu(t,r){let e=Dt(t),o=pe(t),i=e.visualViewport,s=o.clientWidth,n=o.clientHeight,a=0,l=0;if(i){s=i.width,n=i.height;let d=Wi();(!d||d&&r==="fixed")&&(a=i.offsetLeft,l=i.offsetTop);}let c=Ki(o);if(c<=0){let d=o.ownerDocument,u=d.body,m=getComputedStyle(u),g=d.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,b=Math.abs(o.clientWidth-u.clientWidth-g);b<=Ol&&(s-=b);}else c<=Ol&&(s+=c);return {width:s,height:n,x:a,y:l}}var Du=new Set(["absolute","fixed"]);function Fu(t,r){let e=dr(t,true,r==="fixed"),o=e.top+t.clientTop,i=e.left+t.clientLeft,s=ue(t)?Br(t):ce(1),n=t.clientWidth*s.x,a=t.clientHeight*s.y,l=i*s.x,c=o*s.y;return {width:n,height:a,x:l,y:c}}function Tl(t,r,e){let o;if(r==="viewport")o=Vu(t,e);else if(r==="document")o=zu(pe(t));else if(Yt(r))o=Fu(r,e);else {let i=Ml(t);o={x:r.x-i.x,y:r.y-i.y,width:r.width,height:r.height};}return pr(o)}function Ll(t,r){let e=ke(t);return e===r||!Yt(e)||hr(e)?false:Xt(e).position==="fixed"||Ll(e,r)}function ju(t,r){let e=r.get(t);if(e)return e;let o=Dr(t,[],false).filter(a=>Yt(a)&&ur(a)!=="body"),i=null,s=Xt(t).position==="fixed",n=s?ke(t):t;for(;Yt(n)&&!hr(n);){let a=Xt(n),l=jr(n);!l&&a.position==="fixed"&&(i=null),(s?!l&&!i:!l&&a.position==="static"&&!!i&&Du.has(i.position)||Fr(n)&&!l&&Ll(t,n))?o=o.filter(d=>d!==n):i=a,n=ke(n);}return r.set(t,o),o}function Bu(t){let{element:r,boundary:e,rootBoundary:o,strategy:i}=t,n=[...e==="clippingAncestors"?zo(r)?[]:ju(r,this._c):[].concat(e),o],a=n[0],l=n.reduce((c,d)=>{let u=Tl(r,d,i);return c.top=Tt(u.top,c.top),c.right=ge(u.right,c.right),c.bottom=ge(u.bottom,c.bottom),c.left=Tt(u.left,c.left),c},Tl(r,a,i));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Hu(t){let{width:r,height:e}=Il(t);return {width:r,height:e}}function Nu(t,r,e){let o=ue(r),i=pe(r),s=e==="fixed",n=dr(t,true,s,r),a={scrollLeft:0,scrollTop:0},l=ce(0);function c(){l.x=Ki(i);}if(o||!o&&!s)if((ur(r)!=="body"||Fr(i))&&(a=Vo(r)),o){let g=dr(r,true,s,r);l.x=g.x+r.clientLeft,l.y=g.y+r.clientTop;}else i&&c();s&&!o&&i&&c();let d=i&&!o&&!s?Pl(i,a):ce(0),u=n.left+a.scrollLeft-l.x-d.x,m=n.top+a.scrollTop-l.y-d.y;return {x:u,y:m,width:n.width,height:n.height}}function fn(t){return Xt(t).position==="static"}function Rl(t,r){if(!ue(t)||Xt(t).position==="fixed")return null;if(r)return r(t);let e=t.offsetParent;return pe(t)===e&&(e=e.ownerDocument.body),e}function zl(t,r){let e=Dt(t);if(zo(t))return e;if(!ue(t)){let i=ke(t);for(;i&&!hr(i);){if(Yt(i)&&!fn(i))return i;i=ke(i);}return e}let o=Rl(t,r);for(;o&&Al(o)&&fn(o);)o=Rl(o,r);return o&&hr(o)&&fn(o)&&!jr(o)?e:o||$l(t)||e}var Uu=async function(t){let r=this.getOffsetParent||zl,e=this.getDimensions,o=await e(t.floating);return {reference:Nu(t.reference,await r(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Wu(t){return Xt(t).direction==="rtl"}var Do={convertOffsetParentRelativeRectToViewportRelativeRect:Pu,getDocumentElement:pe,getClippingRect:Bu,getOffsetParent:zl,getElementRects:Uu,getClientRects:Lu,getDimensions:Hu,getScale:Br,isElement:Yt,isRTL:Wu};function Vl(t,r){return t.x===r.x&&t.y===r.y&&t.width===r.width&&t.height===r.height}function qu(t,r){let e=null,o,i=pe(t);function s(){var a;clearTimeout(o),(a=e)==null||a.disconnect(),e=null;}function n(a,l){a===void 0&&(a=false),l===void 0&&(l=1),s();let c=t.getBoundingClientRect(),{left:d,top:u,width:m,height:g}=c;if(a||r(),!m||!g)return;let b=Lo(u),v=Lo(i.clientWidth-(d+m)),k=Lo(i.clientHeight-(u+g)),C=Lo(d),T={rootMargin:-b+"px "+-v+"px "+-k+"px "+-C+"px",threshold:Tt(0,ge(1,l))||1},_=true;function A(V){let j=V[0].intersectionRatio;if(j!==l){if(!_)return n();j?n(false,j):o=setTimeout(()=>{n(false,1e-7);},1e3);}j===1&&!Vl(c,t.getBoundingClientRect())&&n(),_=false;}try{e=new IntersectionObserver(A,{...T,root:i.ownerDocument});}catch{e=new IntersectionObserver(A,T);}e.observe(t);}return n(true),s}function Dl(t,r,e,o){o===void 0&&(o={});let{ancestorScroll:i=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=false}=o,c=mn(t),d=i||s?[...c?Dr(c):[],...Dr(r)]:[];d.forEach(C=>{i&&C.addEventListener("scroll",e,{passive:true}),s&&C.addEventListener("resize",e);});let u=c&&a?qu(c,e):null,m=-1,g=null;n&&(g=new ResizeObserver(C=>{let[S]=C;S&&S.target===c&&g&&(g.unobserve(r),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var T;(T=g)==null||T.observe(r);})),e();}),c&&!l&&g.observe(c),g.observe(r));let b,v=l?dr(t):null;l&&k();function k(){let C=dr(t);v&&!Vl(v,C)&&e(),v=C,b=requestAnimationFrame(k);}return e(),()=>{var C;d.forEach(S=>{i&&S.removeEventListener("scroll",e),s&&S.removeEventListener("resize",e);}),u?.(),(C=g)==null||C.disconnect(),g=null,l&&cancelAnimationFrame(b);}}var Fl=_l;var jl=wl,Bl=xl,gn=Sl;var Hl=yl;var Nl=(t,r,e)=>{let o=new Map,i={platform:Do,...e},s={...i.platform,_c:o};return vl(t,r,{...i,platform:s})};function Ul(t){return Ku(t)}function bn(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Ku(t){for(let r=t;r;r=bn(r))if(r instanceof Element&&getComputedStyle(r).display==="none")return null;for(let r=bn(t);r;r=bn(r)){if(!(r instanceof Element))continue;let e=getComputedStyle(r);if(e.display!=="contents"&&(e.position!=="static"||jr(e)||r.tagName==="BODY"))return r}return null}function Gu(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var J=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),r=this.popup.getBoundingClientRect(),e=this.placement.includes("top")||this.placement.includes("bottom"),o=0,i=0,s=0,n=0,a=0,l=0,c=0,d=0;e?t.top<r.top?(o=t.left,i=t.bottom,s=t.right,n=t.bottom,a=r.left,l=r.top,c=r.right,d=r.top):(o=r.left,i=r.bottom,s=r.right,n=r.bottom,a=t.left,l=t.top,c=t.right,d=t.top):t.left<r.left?(o=t.right,i=t.top,s=r.left,n=r.top,a=t.right,l=t.bottom,c=r.left,d=r.bottom):(o=r.right,i=r.top,s=t.left,n=t.top,a=r.right,l=r.bottom,c=t.left,d=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${d}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||Gu(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Dl(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Fl({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(gn({apply:({rects:e})=>{let o=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Bl({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(jl({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(gn({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Hl({element:this.arrowEl,padding:this.arrowPadding}));let r=this.strategy==="absolute"?e=>Do.getOffsetParent(e,Ul):Do.getOffsetParent;Nl(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Se($t({},Do),{getOffsetParent:r})}).then(({x:e,y:o,middlewareData:i,placement:s})=>{let n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${e}px`,top:`${o}px`}),this.arrow){let l=i.arrow.x,c=i.arrow.y,d="",u="",m="",g="";if(this.arrowPlacement==="start"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",u=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=n?"":b,g=n?b:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",d=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",d=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:d,right:u,bottom:m,left:g,[a]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return f`
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
    `}};J.styles=[L,ul];p([E(".popup")],J.prototype,"popup",2);p([E(".popup__arrow")],J.prototype,"arrowEl",2);p([h()],J.prototype,"anchor",2);p([h({type:Boolean,reflect:true})],J.prototype,"active",2);p([h({reflect:true})],J.prototype,"placement",2);p([h({reflect:true})],J.prototype,"strategy",2);p([h({type:Number})],J.prototype,"distance",2);p([h({type:Number})],J.prototype,"skidding",2);p([h({type:Boolean})],J.prototype,"arrow",2);p([h({attribute:"arrow-placement"})],J.prototype,"arrowPlacement",2);p([h({attribute:"arrow-padding",type:Number})],J.prototype,"arrowPadding",2);p([h({type:Boolean})],J.prototype,"flip",2);p([h({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(r=>r.trim()).filter(r=>r!==""),toAttribute:t=>t.join(" ")}})],J.prototype,"flipFallbackPlacements",2);p([h({attribute:"flip-fallback-strategy"})],J.prototype,"flipFallbackStrategy",2);p([h({type:Object})],J.prototype,"flipBoundary",2);p([h({attribute:"flip-padding",type:Number})],J.prototype,"flipPadding",2);p([h({type:Boolean})],J.prototype,"shift",2);p([h({type:Object})],J.prototype,"shiftBoundary",2);p([h({attribute:"shift-padding",type:Number})],J.prototype,"shiftPadding",2);p([h({attribute:"auto-size"})],J.prototype,"autoSize",2);p([h()],J.prototype,"sync",2);p([h({type:Object})],J.prototype,"autoSizeBoundary",2);p([h({attribute:"auto-size-padding",type:Number})],J.prototype,"autoSizePadding",2);p([h({attribute:"hover-bridge",type:Boolean})],J.prototype,"hoverBridge",2);var ql=new Map,Yu=new WeakMap;function Xu(t){return t??{keyframes:[],options:{duration:0}}}function Wl(t,r){return r.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Jt(t,r){ql.set(t,Xu(r));}function Zt(t,r,e){let o=Yu.get(t);if(o?.[r])return Wl(o[r],e.dir);let i=ql.get(r);return i?Wl(i,e.dir):{keyframes:[],options:{duration:0}}}function Ae(t,r){return new Promise(e=>{function o(i){i.target===t&&(t.removeEventListener(r,o),e());}t.addEventListener(r,o);})}function Qt(t,r,e){return new Promise(o=>{if(e?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=t.animate(r,Se($t({},e),{duration:Ju()?0:e.duration}));i.addEventListener("cancel",o,{once:true}),i.addEventListener("finish",o,{once:true});})}function Ju(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function te(t){return Promise.all(t.getAnimations().map(r=>new Promise(e=>{r.cancel(),requestAnimationFrame(e);})))}function Hr(t,r){return t.map(e=>Se($t({},e),{height:e.height==="auto"?`${r}px`:e.height}))}var N=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ht(this,"help-text","label"),this.localize=new H(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>f`
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
        @sl-remove=${r=>this.handleTagRemove(r,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{let r=t.composedPath();this&&!r.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let r=t.target,e=r.closest(".select__clear")!==null,o=r.closest("sl-icon-button")!==null;if(!(e||o)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let i=this.getAllOptions(),s=i.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>i.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=i.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let i=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of i)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let r=t.composedPath();this&&!r.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let e=t.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="sl-icon-button");this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let e=t.target.closest("sl-option"),o=this.value;e&&!e.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),r=this.valueHasChanged?this.value:this.defaultValue,e=Array.isArray(r)?r:[r],o=[];t.forEach(i=>o.push(i.value)),this.setSelectedOptions(t.filter(i=>e.includes(i.value)));}handleTagRemove(t,r){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(r,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(e=>{e.current=false,e.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let r=this.getAllOptions(),e=Array.isArray(t)?t:[t];r.forEach(o=>o.selected=false),e.length&&e.forEach(o=>o.selected=true),this.selectionChanged();}toggleOptionSelection(t,r){r===true||r===false?t.selected=r:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,r,e;let o=this.getAllOptions();this.selectedOptions=o.filter(s=>s.selected);let i=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(e=(r=s?.getTextLabel)==null?void 0:r.call(s))!=null?e:"";}this.valueHasChanged=i,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,r)=>{if(r<this.maxOptionsVisible||this.maxOptionsVisible<=0){let e=this.getTag(t,r);return f`<div @sl-remove=${o=>this.handleTagRemove(o,t)}>
          ${typeof e=="string"?zt(e):e}
        </div>`}else if(r===this.maxOptionsVisible)return f`<sl-tag size=${this.size}>+${this.selectedOptions.length-r}</sl-tag>`;return f``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,r,e){if(super.attributeChangedCallback(t,r,e),t==="value"){let o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o;}}handleValueChange(){if(!this.valueHasChanged){let e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e;}let t=this.getAllOptions(),r=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(e=>r.includes(e.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await te(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:r}=Zt(this,"select.show",{dir:this.localize.dir()});await Qt(this.popup.popup,t,r),this.currentOption&&Io(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await te(this);let{keyframes:t,options:r}=Zt(this,"select.hide",{dir:this.localize.dir()});await Qt(this.popup.popup,t,r),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,Ae(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,Ae(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r,i=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return f`
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
    `}};N.styles=[L,Vt,pl];N.dependencies={"sl-icon":q,"sl-popup":J,"sl-tag":me};p([E(".select")],N.prototype,"popup",2);p([E(".select__combobox")],N.prototype,"combobox",2);p([E(".select__display-input")],N.prototype,"displayInput",2);p([E(".select__value-input")],N.prototype,"valueInput",2);p([E(".select__listbox")],N.prototype,"listbox",2);p([$()],N.prototype,"hasFocus",2);p([$()],N.prototype,"displayLabel",2);p([$()],N.prototype,"currentOption",2);p([$()],N.prototype,"selectedOptions",2);p([$()],N.prototype,"valueHasChanged",2);p([h()],N.prototype,"name",2);p([$()],N.prototype,"value",1);p([h({attribute:"value"})],N.prototype,"defaultValue",2);p([h({reflect:true})],N.prototype,"size",2);p([h()],N.prototype,"placeholder",2);p([h({type:Boolean,reflect:true})],N.prototype,"multiple",2);p([h({attribute:"max-options-visible",type:Number})],N.prototype,"maxOptionsVisible",2);p([h({type:Boolean,reflect:true})],N.prototype,"disabled",2);p([h({type:Boolean})],N.prototype,"clearable",2);p([h({type:Boolean,reflect:true})],N.prototype,"open",2);p([h({type:Boolean})],N.prototype,"hoist",2);p([h({type:Boolean,reflect:true})],N.prototype,"filled",2);p([h({type:Boolean,reflect:true})],N.prototype,"pill",2);p([h()],N.prototype,"label",2);p([h({reflect:true})],N.prototype,"placement",2);p([h({attribute:"help-text"})],N.prototype,"helpText",2);p([h({reflect:true})],N.prototype,"form",2);p([h({type:Boolean,reflect:true})],N.prototype,"required",2);p([h()],N.prototype,"getTag",2);p([O("disabled",{waitUntilFirstUpdate:true})],N.prototype,"handleDisabledChange",1);p([O(["defaultValue","value"],{waitUntilFirstUpdate:true})],N.prototype,"handleValueChange",1);p([O("open",{waitUntilFirstUpdate:true})],N.prototype,"handleOpenChange",1);Jt("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Jt("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});N.define("sl-select");var Kl=x`
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
`;var Ut=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,r="";return [...t].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("slot")||(r+=e.textContent)),e.nodeType===Node.TEXT_NODE&&(r+=e.textContent);}),r.trim()}render(){return f`
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
    `}};Ut.styles=[L,Kl];Ut.dependencies={"sl-icon":q};p([E(".option__label")],Ut.prototype,"defaultSlot",2);p([$()],Ut.prototype,"current",2);p([$()],Ut.prototype,"selected",2);p([$()],Ut.prototype,"hasHover",2);p([h({reflect:true})],Ut.prototype,"value",2);p([h({type:Boolean,reflect:true})],Ut.prototype,"disabled",2);p([O("disabled")],Ut.prototype,"handleDisabledChange",1);p([O("selected")],Ut.prototype,"handleSelectedChange",1);p([O("value")],Ut.prototype,"handleValueChange",1);Ut.define("sl-option");var Gl=x`
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
        --auto-workspace-color: var(--sl-color-neutral-50);
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
`;function Zu(t,...r){let e=t.valueOf(),o={},i=[...r];try{if(i.length===0)return e;if(i.length===1){let s=i[0];if(s==null)return e;Array.isArray(s)?i=s:typeof s=="object"&&(o=s,i=[]);}return e=e.replace(/\{\s*([a-zA-Z\d]*)\s*\}/g,(s,n)=>{let a;return n&&o.hasOwnProperty(n)?a=o[n]:!n&&i.length>0&&(a=i.shift()),a==null?"":(typeof a=="function"&&(a=a()),String(a))}),e}catch{return e}}String.prototype.params=function(){return Zu(this,...arguments)};var $e=class extends Error{},Fo=class extends $e{},Nr=class extends $e{},Gi=class extends $e{},Yi=class extends $e{},jo=class extends $e{},Xi=class extends $e{},Ji=class extends $e{};var Zi="__AS_SKIP_PROXY__",ee="__OBSERVER_TYPE__",Yl="__AS_OBSERVER_DESCRIPTOR_BUILDER__",Qi="__AS_OBSERVER_DESCRIPTOR__";var Xl="__batch_update__",Jl="__AS_ASYNC_COMPUTED_VALUE__";var Ur="AutoStoreConfigManager";function ts(t){return t.constructor.name==="AsyncFunction"}function Bo(t){return t?t.map(r=>Array.isArray(r)?r:typeof r=="string"?["/","./","../"].some(e=>r.startsWith(e))?r:r.includes(".")?r.split("."):r.split("."):[]):[]}function Wr(){return {async:false,enable:true,depends:[],immediate:"auto",extras:void 0}}function es(){let t=arguments[0];if(typeof t!="function")throw new Error("computed getter must be a function");let r=[],e=Object.assign({},Wr());if(arguments.length===1)r=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))e.depends=arguments[1];else if(typeof arguments[1]=="object")Object.assign(e,arguments[1]),e.depends=Bo(e.depends);else throw new Yi;else arguments.length>=3&&(r=Bo(arguments[1]),Object.assign(e,arguments[2]),e.depends=r);e.async=e.async===true||ts(t)||arguments.length>=2&&Array.isArray(arguments[1]);let o=()=>{let i={type:e.async?"async":"sync",getter:t,options:e,[Qi]:true};return e.async&&(i.liteAsync=true),i};return o[Yl]=true,o[ee]=e.async?"async":"sync",o}function vn(t){return t?t.some(r=>typeof r=="string"?r.startsWith("./")||r.startsWith("../")||r.startsWith("@")?false:!["CURRENT","SELF","PARENT"].includes(r):true):false}function rs(t){return typeof t=="object"&&t.hasOwnProperty("type")&&typeof t.type=="string"&&t.hasOwnProperty("getter")&&typeof t.getter=="function"&&t.hasOwnProperty("options")&&typeof t.options=="object"}function fr(t){try{return t[Zi]===!0}catch{}return  false}function os(t,r){if(t===r)return  true;if(t===null||r===null||typeof t!=typeof r)return  false;if(typeof t=="object"){if(Array.isArray(t)&&Array.isArray(r))return t.length!==r.length?false:t.every((e,o)=>os(e,r[o]));if(!Array.isArray(t)&&!Array.isArray(r)){let e=Object.keys(t);return e.length!==Object.keys(r).length?false:e.every(o=>os(t[o],r[o]))}else return  false}return  false}function qr(t){return toString.call(t)==="[object Map]"}function is(t,r){let e=o=>!!(o.startsWith("./")||o.startsWith("../")||["CURRENT","SELF","PARENT"].includes(o));if(typeof t=="string")if(e(t)){if(!r)return [t];if(t==="SELF")return r;if(t==="CURRENT"||t==="PARENT")return r.slice(0,-1);if(t.startsWith("./")){let o=t.slice(2),i=r.slice(0,-1);return o===""?i:[...i,...o.split(".")]}if(t.startsWith("../")){let o=t.slice(3),i=r.length>=2?r.slice(0,-2):void 0;return i===void 0?void 0:o.startsWith("../")?is(o,i):o===""?i:[...i,...o.split(".")]}return [t]}else return t.split(".");if(t.length>0&&e(t[0])){if(!r)return t;let o=t[0],i=t.slice(1),s=is(o,r);return s===void 0?void 0:[...s,...i]}return t}function Kr(t,r){return !t||!r||t.length!==r.length?false:t.every((e,o)=>e===r[o])}function ss(t){return Array.isArray(t)?t:t.split(".")}function Zl(t,r){let e=ss(t),o=Array.isArray(r)?r:r===""?[]:r.split(".");return o.length===0||Kr(e,o)?true:(o[o.length-1]==="**"&&(o[o.length-1]="*",o.splice(o.length-1,0,...Array.from({length:e.length-o.length}).fill("*"))),e.length!==o.length?false:o.every((s,n)=>s==="*"||s==="**"?true:s===e[n]))}function Ql(t){return t==null||typeof t!="object"?false:Object.prototype.toString.call(t)==="[object Object]"}function Be(t){return t&&typeof t=="object"&&(t.hasOwnProperty(Jl)||"value"in t&&"loading"in t&&"retry"in t)}function tc(t){try{return !!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"&&typeof t.catch=="function"&&(t instanceof Promise||Object.prototype.toString.call(t)==="[object Promise]")}catch{return  false}}function ec(t){return typeof t=="function"&&t[ee]}function yn(t,r){let e=t.get(r);if(e!==void 0)return e;let o=t.get(Number(r)||r);if(o!==void 0)return o}function Qu(t){let r="";for(let e=0;e<t.length;e++)t[e]==="\\"&&e+1<t.length?(r+=t[e+1],e++):r+=t[e];return r}function xn(t,r="."){return t.replace(/\\/g,"\\\\").replace(new RegExp(`\\${r}`,"g"),`\\${r}`)}function He(t,r="."){let e=[],o="";for(let i=0;i<t.length;i++){let s=t[i];s==="\\"&&i+1<t.length?(o+=s,o+=t[i+1],i++):s===r?(e.push(o),o=""):o+=s;}return e.push(o),e.map(Qu)}function et(t,r,e){if(!r||r.length===0)return t;let o=Array.isArray(r)?r:He(r),i,s=t;for(let n=0;n<o.length;n++){let a=o[n];if(qr(s))i=yn(s,a);else if(a in s)i=s[a];else return e;s=i;}return i}function gt(t){try{["object","function"].includes(typeof t)&&(t[Zi]=!0);}catch{}return t}function Ee(t,r,e,o){if(!r||!t)return t;let i=r;if(i.length===0)return typeof t=="object"&&Object.assign(t,e),t;{let s=t,n=[],a=(l,c,d)=>{l[c]=d;};for(let l=0;l<i.length;l++){let c=i[l];if(n.push(c),s)if(Array.isArray(s)){let d=parseInt(c,10);if(Number.isNaN(d)||d<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===i.length-1?a(s,d,e):s=s[d];}else s instanceof Map||s instanceof WeakMap?l===i.length-1?s.set(c,e):(s.has(c)||s.set(c,{}),s=s.get(c)):typeof s=="object"&&c in s?l===i.length-1?a(s,c,e):s=s[c]:(s[c]=l===i.length-1?e:{},s=s[c]);else s[c]=l===i.length-1?e:{},s=s[c];}}return t}function Ne(t){return (t||["ROOT"]).map(r=>Array.isArray(r)?r.map(e=>xn(e)).join("."):xn(r)).join(".")}function ns(){return Math.random().toString(36).slice(2)}function Ho(t,r,e){let o=t&&!t[0].startsWith("#");if(Array.isArray(r))return r;if(r==="self")return o?t:void 0;if(r==="root")return o?[]:void 0;if(r==="parent")return o?t.slice(0,-2):void 0;if(r==="current")return o?t.slice(0,-1):void 0;if(typeof r=="string")return r.startsWith("./")?o?[...t.slice(0,-1),...r.slice(2).split(".")]:void 0:r.startsWith("../")?o?Ho(t.slice(0,-1),r.slice(3),true):void 0:r.startsWith("/")?r.replace(/^(\/)*/,"").split("."):o&&e?[...t.slice(0,-1),...r.split(".")]:r.split(".")}function Gr(t,r){return r?r.map(e=>Ho(t,e)).filter(e=>e!==void 0):[]}function as(t,r){function e(o,i){for(let s in o){let n=o[s];typeof r=="function"&&r({value:n,key:s,parent:o,path:i.concat(s)}),typeof n=="object"&&!fr(n)&&e(n,i.concat(s));}}e(t,[]);}function ls(t){return typeof t=="object"?JSON.parse(JSON.stringify(t)):t}function cs(t){let r=new Map;return t.forEach(e=>{let o=e.join(".");r.set(o,e);}),Array.from(r.values())}function No(t,r){return t.length>r.length?false:t.every((e,o)=>e===r[o])}function Et(t){return t?typeof t=="function":false}function ps(t,r){let{reserveAsync:e,includeFunc:o}=Object.assign({reserveAsync:false},r);if(Array.isArray(t)){let i=[...t];for(let s=0;s<i.length;s++)i[s]=ps(i[s],r);return i}else if(typeof t=="object"){if(!e&&Be(t))return t.value;{let i={...t};for(let s in i)i[s]=ps(i[s],r);return i}}return o&&Et(t)?`\`\`\`${t.toString()}\`\`\``:t}function rc(t){return typeof t=="function"&&t[ee]==="schema"}var oc="__WITH_SCHEMA_VALUE__";function ic(t,r){return Object.assign({validate:"throw"},r,{[oc]:true,value:t})}function th(t){return t&&typeof t=="object"&&t[oc]===true}function sc(t){return th(t)?[t.value,t]:[t,void 0]}function nc(t,r,e,o){try{let i=t.emit(r,e);return o(i)}catch(i){t.logger.error(`Error while emit store event ${r}: ${i.message}`);return}}function ac(t,r,e,o,i){return nc(t,"observer/initial",{path:r,value:e,parentPath:o,parent:i},s=>!s.some(n=>n===!1))}function lc(t,r,e){try{t.emit(r,e);}catch(o){t.logger.error(`Error while emit store event ${r}: ${o.message}`);}}function st(t,r,e,o=false){o?setTimeout(()=>{lc(t,r,e);},0):lc(t,r,e);}function cc(t){return t instanceof Error?t:new Error(t)}var us=class extends Map{constructor(e){super();this.store=e;}get enable(){return this.store.options.enableComputed}set enable(e){this.store.options.enableComputed=e;}create(){let e=rs(arguments[0])?arguments[0]:es(...arguments)(),o=!!e.options.anchor;if(o){let s=e.options.anchor.path;if(!s||s.length===0)throw new jo("When anchor is provided, anchor.path is required to resolve relative paths");e.options.anchor.parentPath||(e.options.anchor.parentPath=s.slice(0,-1));}if(e.options.async){let s=e.options.depends,n=Array.isArray(s)&&s.length>0&&!vn(s);if(!o&&n)throw new Xi("The depends of the dynamic computed object must be absolute paths, or provide an anchor to enable relative paths")}let i=e.options.scope;if(o)i==="ROOT"&&(e.options.scope="ROOT");else if(i===void 0||i==="ROOT")e.options.scope="ROOT";else if(!vn([i]))throw new jo("The scope of the dynamic computed object must be the root state object or an absolute path, or provide an anchor to enable relative paths");return this.store.createObserverObject(e)}async runGroup(e,o,i){return await this.run(s=>s.group===e,o,i)}async run(){if(arguments.length===0)return Promise.all([...this.values()].map(n=>n.run()));let e;typeof arguments[0]=="function"?e=arguments[0]:typeof arguments[0]=="string"&&(e=n=>n.id===arguments[0]);let o=Object.assign({},arguments[1]),i=Object.assign({wait:false,timeout:0},arguments[2]),s={};return new Promise((n,a)=>{if(i.wait){let l;o.onDone=({id:c})=>{if(s[c]=true,Object.values(s).every(d=>d))return clearTimeout(l),true},i.timeout>0&&(l=setTimeout(()=>{a(new Nr);},i.timeout));}Promise.all([...this.values()].filter(l=>e(l)?(s[l.id]=false,true):false).map(l=>l.run(o))),i.wait||n();})}async enableGroup(e){for(let o of this.values())o.options.enable=e;}delete(e){let o=this.get(e);return o?(o.destroy(),true):Map.prototype.delete.call(this,e)}find(e){if(!e)return;let o=ss(e);for(let i of this.values())if(Kr(i.path,o))return i}};function pc(t,r,e,o,i){return e==="push"?(...s)=>{let n=r.length,a=o.apply(r,s);if(r.length>n){let l=Array.from({length:r.length-n},(c,d)=>d+n);t({type:"insert",path:i,indexs:l,value:s,oldValue:void 0,parentPath:i,parent:r});}return a}:e==="pop"?()=>{let s=r.length,n=o.apply(r);return r.length===s-1&&t({type:"remove",path:i,indexs:[s-1],value:[n],oldValue:void 0,parentPath:i,parent:r}),n}:e==="splice"?(s,n,...a)=>{let l=n===void 0&&a.length===0?o.apply(r,[s]):o.apply(r,[s,n,...a]);if(l.length>0||n===void 0){let c=n===void 0?[]:Array.from({length:l.length},(d,u)=>s+u);t({type:"remove",path:i,indexs:c,value:l,oldValue:void 0,parentPath:i,parent:r});}if(a.length>0){let c=Array.from({length:a.length},(d,u)=>s+u);t({type:"insert",path:i,indexs:c,value:a,oldValue:void 0,parentPath:i,parent:r});}return l}:e==="unshift"?(...s)=>{let n=r.length,a=o.apply(r,s);if(r.length>n){let l=Array.from({length:r.length-n},(c,d)=>d);t({type:"insert",path:i,indexs:l,value:s,oldValue:void 0,parentPath:i,parent:r});}return a}:e==="shift"?()=>{let s=r.length,n=o.apply(r);return r.length===s-1&&t({type:"remove",path:i,indexs:[0],value:[n],oldValue:void 0,parentPath:i,parent:r}),n}:e==="fill"?(s,n,a)=>{let l=o.apply(r,[s,n,a]),c=n??0,d=a??r.length,u=Array.from({length:d-c},(g,b)=>b+c),m=Array.from({length:d-c},()=>s);return t({type:"update",path:i,indexs:u,value:m,oldValue:void 0,parentPath:i,parent:r}),l}:e==="concat"?(...s)=>{let n=r.length,a=o.apply(r,s),l=Array.from({length:s.length},(c,d)=>n+d);return t({type:"insert",path:i,indexs:l,value:s,oldValue:void 0,parentPath:i,parent:r}),a}:o}function uc(t){return typeof t=="number"||typeof t=="string"&&!Number.isNaN(parseInt(t))}var _n=Symbol("__NOTIFY__");function eh(t){if(this.options.validators){let r=t.join(this.options.delimiter||".");if(this.options.validators[r])return this.options.validators[r];let e=Object.keys(this.options.validators);for(let o of e)if(Zl(t,o))return this.options.validators[o]}return this.options.validate}function rh(t,r,e,o,i){let s=i?.onInvalid||this._updateValidateBehavior;if(s==="none")return  true;let n=eh.call(this,r);if(typeof n!="function")return  true;let a=true,l,c=r.join("."),d=(this.options.configKey&&this.options.configKey.trim().length>0?`${this.options.configKey.trim()}/${c}`:c).replaceAll("/",".");try{if(n.call(this,e,o,r)===!1)throw new Ji;this.configManager&&(delete this.configManager.errors[d],d in this.configManager.state&&(this.configManager.state[d].errorMessage=null)),this.errors&&delete this.errors[c];}catch(u){l=u;let m=n.getErrorMessage?.(u)||u.message||u.stack;if(this.configManager){let b=this.configManager?.errors;b&&(b[d]=m),d in this.configManager.state&&(this.configManager.state[d].errorMessage=m);}this.errors[c]=m;let g=s||u.onInvalid||n.onInvalid||this.options.onInvalid||"throw";if(g==="pass")a=true;else if(g==="ignore")a=false;else if(g==="throw-pass")a=u;else throw a=false,u}finally{this.emit("validate",{path:r,newValue:e,oldValue:o,error:l});}return a}function hc(t,r,e,o,i){if(fr(t)||typeof t!="object"||t===null)return t;if(e.has(t))return e.get(t);let s=new Proxy(t,{get:(n,a,l)=>{let c=Reflect.get(n,a,l);if(typeof a!="string")return c;let d=[...r,String(a)];if(typeof c=="function"||!Object.hasOwn(n,a))if(typeof c=="function"){if(Array.isArray(n)&&!uc(a))return pc(i.notify,n,a,c,r);if(!fr(c)&&Object.hasOwn(n,a)){if(!ac(this,d,c,r,n))return gt(c),c;let m=d.join(".");try{if(o.has(m)){let b=[...o.keys(),m];throw o.clear(),new Gi(`Find circular dependency at <"${m}">, steps: ${b.join(" -> ")}`)}o.set(m,!0);let g=i.createObserverObject(d,c,r,n);return typeof g!="function"&&Reflect.set(n,a,g,l),g}finally{o.delete(m);}}else return c}else return c;return i.notify({type:"get",path:d,indexs:[],value:c,oldValue:void 0,parentPath:r,parent:n}),hc.call(this,c,d,e,o,i)},set:(n,a,l,c)=>{let d=Reflect.get(n,a,c),u=[...r,String(a)],[m,g]=sc(l),b=rh.call(this,s,u,m,d,g);if(b){let v=Reflect.set(n,a,m,c);if(a===_n)return  true;let k=u.join("."),C=this.options.configKey,S=C&&C.length>0?`${this.options.configKey}.${k}`:k;if(v&&this.configManager&&this.configurabled.has(k)&&setTimeout(()=>{this.configManager?.onUpdate(this,S,m);},0),v&&!g?.slient&&a!==_n&&m!==d&&i.notify({type:Array.isArray(n)?"update":"set",path:u,indexs:[],value:m,oldValue:d,parentPath:r,parent:n}),b instanceof Error)throw b;return v}else return  true},deleteProperty:(n,a)=>{let l=n[a],c=[...r,String(a)],d=Reflect.deleteProperty(n,a);return d&&a!==_n&&i.notify({type:"delete",path:c,indexs:[],value:l,oldValue:void 0,parentPath:r,parent:n}),d}});return e.set(t,s),s}function dc(t,r){let e=new Map,o=new WeakMap;return hc.call(this,t,[],o,e,r)}function hs(){let t=arguments[0],r=typeof arguments[1]=="function"?arguments[1]:()=>true,e=typeof arguments[1]=="object"?arguments[1]:arguments[2],o=Object.assign({depends:[],enable:true,objectify:true,filter:r},e),i=()=>({type:"watch",getter:t,options:o});return i[ee]=true,i}var ds=class extends Map{constructor(e){super();this.store=e;this._watcher={off:()=>{}};this._enable=true;}get enable(){return this._enable}set enable(e){this._enable=e;}set(e,o){return super.size===0&&this.createWacher(),super.set(e,o)}delete(e){let o=this.get(e);return o?(o.destroy(),true):Map.prototype.delete.call(this,e)}createWacher(){this._watcher=this.store.watch("**",({path:e,value:o})=>{if(!this._enable)return;let i=e[0].startsWith("#")?o:et(this.store.state,e);for(let s of this.values())s.isMatched(e,i)&&s.run(e,i);});}reset(){this._watcher?.off();for(let e of this.values())e.reset();this.createWacher();}create(){let e=rs(arguments[0])?arguments[0]:hs(...arguments)();return this.store.createObserverObject(e)}enableGroup(e,o=true){for(let i of this.values())i.options.group===e&&(i.options.enable=o);}};function fc(t){let r;return ec(t)?r=t():typeof t=="function"&&(r={type:"sync",getter:t,options:Object.assign({},Wr(),{async:ts(t)})}),r}function wn(t,r){if(r==="*")return  true;if(r==="write"){if(t.type==="get")return}else if(r==="read"){if(t.type!=="get")return}else if(Array.isArray(r)&&r.length>0&&!r.includes(t.type))return;return  true}var oh=Object.defineProperty,ih=(t,r,e)=>r in t?oh(t,r,{enumerable:true,configurable:true,writable:true,value:e}):t[r]=e,Yr=(t,r,e)=>ih(t,typeof r!="symbol"?r+"":r,e);function mc(t,r){let e=t.length,o=r.length;if(e!==o&&(o===0||r[o-1]!=="**"))return  false;if(o>0&&r[o-1]==="**"){for(let i=0;i<o-1;i++)if(r[i]!=="*"&&r[i]!==t[i])return  false;return  true}for(let i=0;i<e;i++)if(r[i]!=="*"&&r[i]!==t[i])return  false;return  true}function sh(t,r){let e=[];for(let o=t.length-1;o>=0;o--)r(t[o])&&(e.push(o),t.splice(o,1));return e.reverse()}function Sn(t){return t&&typeof t=="function"}var nh=Symbol.for("__expandable__");function ah(t){return t&&t[nh]}function lh(t){for(let r=0;r<t.length;r++){let e=t[r];Array.isArray(e)&&ah(e)&&(t.splice(r,1,...e),r+=e.length-1);}return t}function ch(t,r){return t.catch(e=>(r&&r(e),Promise.resolve(e)))}function ph(t){return t.map(r=>r.status==="fulfilled"?r.value:r.reason)}function uh(t,r){let e=t;for(let o of r)if(e&&o in e)e=e[o];else return;return e}function gc(t,r,e){for(let[o,i]of Object.entries(t)){if(o.startsWith("__")||!i)continue;let s=[...r,o];e(s,i),gc(i,s,e);}}function hh(t,r,e){let o=uh(t,r);if(!o)return [];let i=[];return gc(o,r,(s,n)=>{i.push({node:n,type:s.join(e)});}),i}function dh(t){let r={},e={};return typeof t[0]=="object"?(Object.assign(r,t[0]),e=typeof t[1]=="boolean"?{retain:t[1]}:t[1]&&typeof t[1]=="object"?t[1]:{}):(r.type=t[0],r.payload=t[1],e=typeof t[2]=="boolean"?{retain:t[2]}:t[2]&&typeof t[2]=="object"?t[2]:{}),[r,e]}var Cn=class{constructor(t){Yr(this,"__FastLiteEvent__",true),Yr(this,"listeners",{__listeners:[]}),Yr(this,"_options"),Yr(this,"_delimiter","/"),Yr(this,"retainedMessages",new Map),Yr(this,"listenerCount",0),this._options=Object.assign({id:Math.random().toString(36).substring(2),delimiter:"/",ignoreErrors:true,expandEmitResults:true},this._initOptions(t)),this._delimiter=this._options.delimiter;}get options(){return this._options}get id(){return this._options.id}get title(){return this._options.title||this.id||"FastLiteEvent"}_initOptions(t){return t}_addListener(t,r,e){let o=0;return [this._forEachNodes(t,i=>{let s=[r,e.count,0,e.tag,e.flags];i.__listeners.push(s),o=i.__listeners.length-1,this.listenerCount++;}),o]}_forEachNodes(t,r){if(t.length===0)return;let e=this.listeners;for(let o=0;o<t.length;o++){let i=t[o];if(i in e||(e[i]={__listeners:[]}),o===t.length-1){let s=e[i];return r(s,e),s}else e=e[i];}}_removeListener(t,r,e){e&&sh(t.__listeners,o=>{o=Array.isArray(o)?o[0]:o;let i=o===e;return i&&this.listenerCount--,i});}on(t,r,e){if(t.length===0)throw new Error("event cannot be empty");let o=Object.assign({count:0,flags:0},e),i=t.split(this._delimiter),[s,n]=this._addListener(i,r,o),a=()=>s&&this._removeListener(s,i,r);return this._emitRetainMessage(t,s,n),{off:a,listener:r,[Symbol.dispose](){a();}}}once(t,r,e){return this.on(t,r,Object.assign({},e,{count:1}))}onAny(t,r){return this.on("**",t,r)}off(){let t=arguments,r=Sn(t[0])?void 0:t[0],e=Sn(t[0])?t[0]:t[1],o=r?r.split(this._delimiter):[],i=r?r.includes("*"):false;if(r&&!i)this._traverseToPath(this.listeners,o,s=>{e?this._removeListener(s,o,e):r&&(s.__listeners=[]);});else {let s=i?[]:o;this._traverseListeners(this.listeners,s,(n,a)=>{(e!==void 0||i&&mc(n,o))&&(e?this._removeListener(a,o,e):a.__listeners=[]);});}}offAll(t){if(t){let r=t.split(this._delimiter),e=0;this._traverseListeners(this.listeners,r,(o,i)=>{e+=i.__listeners.length,i.__listeners=[];}),this.listenerCount-=e,this._removeRetainedEvents(t);}else {let r=0;this._traverseListeners(this.listeners,[],(e,o)=>{r+=o.__listeners.length;}),this.listenerCount-=r,this.retainedMessages.clear(),this.listeners={__listeners:[]};}}_removeRetainedEvents(t){t||this.retainedMessages.clear(),t?.endsWith(this._delimiter)&&(t+=this._delimiter),this.retainedMessages.delete(t);for(let r of this.retainedMessages.keys())r.startsWith(t)&&this.retainedMessages.delete(r);}clear(t){this.offAll(t),this._removeRetainedEvents(t);}_emitRetainMessage(t,r,e){let o=[];if(t.includes("*")){let i=t.split(this._delimiter);this.retainedMessages.forEach((s,n)=>{let a=n.split(this._delimiter);mc(a,i)&&o.push(s);});}else this.retainedMessages.has(t)&&o.push(this.retainedMessages.get(t));r&&o.forEach(i=>{this._executeListeners([r],i,{},s=>s[0]===r.__listeners[e][0]);});}_traverseToPath(t,r,e,o=0,i){if(o>=r.length){e(t);return}let s=r[o];if(i===true){this._traverseToPath(t,r,e,o+1,true);return}"*"in t&&this._traverseToPath(t["*"],r,e,o+1),"**"in t&&this._traverseToPath(t["**"],r,e,o+1,true),s in t&&this._traverseToPath(t[s],r,e,o+1);}_traverseListeners(t,r,e){let o=t;r&&r.length>0&&this._traverseToPath(t,r,s=>{o=s;});let i=(s,n,a)=>{n(a,s);for(let[l,c]of Object.entries(s))l.startsWith("__")||c&&i(c,n,[...a,l]);};i(o,e,[]);}_onListenerError(t,r,e,o){if(o instanceof Error&&(o._emitter=`${t.name||"anonymous"}:${r.type}`),this._options.ignoreErrors)return o;throw o}_executeListener(t,r,e,o=false){let i=t[0];try{let s=((e?.flags||0)&1)>0,n=i.call(this,s?r.payload:r,e);return o&&n&&n instanceof Promise&&(n=ch(n,a=>this._onListenerError(i,r,e,a))),n}catch(s){return this._onListenerError(i,r,e,s)}}_executeListeners(t,r,e,o){if(!t||t.length===0)return [];let i=[];for(let s of t){let n=0;for(let a of s.__listeners)(!o||o(a,s))&&i.push([a,n,s.__listeners]),n++;}return this._decListenerExecCount(i),i.map(s=>this._executeListener(s[0],r,e,true))}_decListenerExecCount(t){for(let r=t.length-1;r>=0;r--){let e=t[r][0];e[2]++,e[1]>0&&e[1]<=e[2]&&(t[r][2].splice(t[r][1],1),this.listenerCount--);}}getListeners(t){let r=[],e=t.split(this._delimiter);this._traverseToPath(this.listeners,e,i=>{r.push(i);});let o=[];return r.map(i=>{o.push(...i.__listeners);}),o}clearRetainMessages(t){t?this.retainedMessages.delete(t):this.retainedMessages.clear();}emit(){let[t,r]=dh(arguments),e=t.type.split(this._delimiter);r.retain&&this.retainedMessages.set(t.type,t);let o=(l,c)=>{let d=this._options.transform;if(!Sn(d))return [l,c];let u=d.call(this,l);return u===l?[l,c]:[{...l,payload:u},{...c,rawEventType:l.type,flags:(c.flags||0)|1}]},i=[],s=[];this._traverseToPath(this.listeners,e,l=>{s.push(l);});let[n,a]=o(t,r);if(i.push(...this._executeListeners(s,n,a)),r.broadcast){let l=hh(this.listeners,e,this._delimiter);for(let{node:c,type:d}of l){if(!c.__listeners||c.__listeners.length===0)continue;let u,m;if(r.broadcast===true)u={...t,type:d},m=r;else {let v=r.broadcast.call(this,d,t,r);if(!v)continue;Array.isArray(v)?[u,m]=v:(u=v,m=r);}let[g,b]=o(u,m);i.push(...this._executeListeners([c],g,b));}}return this._options.expandEmitResults&&lh(i),i}broadcast(t,r,e,o){let i=o?{broadcast:e??true,retain:true}:{broadcast:e??true};return this.emit(t,r,i)}async emitAsync(){let t=await Promise.allSettled(this.emit.apply(this,arguments));return ph(t)}};function bc(t,r){let e=Object.keys(t),o=Object.values(t),i=r?.disabledGlobals||["alert","window","document"];if(i&&i.length>0){let s=new Set(e),n=i.filter(a=>!s.has(a));n.length>0&&(e.push(...n),o.push(...Array.from({length:n.length}).fill(void 0)));}return (s,n)=>{try{let a=[...e,...Object.keys(n||{})],l=[...o,...Object.values(n||{})];return new Function(...a,`return ${s}`)(...l)}catch(a){if(r?.onError){let l=r.onError(a,s);if(l!==void 0)return l}throw a}}}function mh(t){Ql(t)&&as(t,({value:r,key:e,parent:o})=>{Et(r)&&(e==="validate"||e.startsWith("on")||e.startsWith("render")||e.startsWith("to"))&&(o[e]=gt(r));});}function gh(t){let r={getter:t[0],options:Object.assign({onInvalid:void 0},t[1])};return mh(r.options),r}function fs(t,r){let e=gh([t,r]),o=t;typeof o=="object"&&gt(o),e.options.datatype=Array.isArray(o)?"array":typeof o,e.options.errorMessage||(e.options.errorMessage="{error}");let i=()=>({type:"schema",getter:()=>o,options:e.options});return i[ee]="schema",i}var vc=fs;function ms(t){return t!=null&&typeof t[Symbol.iterator]=="function"&&typeof t!="string"}function yc(t,r=false){if(typeof t=="number")return  true;if(typeof t!="string"||r)return  false;try{if(t.includes(".")){let e=parseFloat(t);return t.endsWith(".")?!isNaN(e)&&String(e).length===t.length-1:!isNaN(e)&&String(e).length===t.length}else {let e=parseInt(t);return !isNaN(e)&&String(e).length===t.length}}catch{return  false}}function Oe(t){if(typeof t!="object"||t===null)return  false;var r=Object.getPrototypeOf(t);if(r===null)return  true;for(var e=r;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return r===e}function Xr(t){if(yc(t)||typeof t=="boolean"||typeof t=="function"||t instanceof Error)return  false;if(t==null||t==null||Array.isArray(t)&&t.length==0||Oe(t)&&Object.keys(t).length==0||typeof t=="string"&&t.trim()=="")return  true;try{if(ms(t)&&t.size==0)return !0}catch{}return  false}function xc(t,...r){if(r.length===0)return t;let e=r.map((o,i)=>{let s=Object.entries(o||{});return s.some(([n,a])=>a===void 0)?s.reduce((n,[a,l])=>(l!==void 0&&(n[a]=l),n),{}):o});return Object.assign(t,...e)}function _c(t,{empty:r,delimiter:e=","}){let o=t;try{return typeof o=="function"&&(o=o.call(this,o)),Xr(o)&&(o=r||""),Array.isArray(o)?o.map(i=>String(i)).join(e):Oe(o)?Object.entries(o).reduce((i,[s,n])=>(i.push(`${s}=${String(n)}`),i),[]).join(e):ms(o)&&typeof o!="string"?[...o].map(i=>String(i)).join(e):o instanceof Error?o.message:String(o)}catch{return String(o)}}var bh=/\{(\<(.*?)\>)?\s*([^\{\}\>\<]*)(?<!\s)\s*(\<(.*?)\>)?\}/gm;function kn(t,r,e){let o,i=xc({empty:null,delimiter:",",forEach:null},e);typeof r=="function"&&(r=r.call(t)),Array.isArray(r)&&r.length===1&&(Oe(r[0])||Array.isArray(r[0]))&&(r=r[0]),["boolean","string","number"].includes(typeof r)?o=[r]:r instanceof Map?o=[...r.entries()].reduce((n,a)=>(n[a[0]]=a[1],n),{}):Symbol.iterator in r?o=[...r]:Oe(r)?o=r:r instanceof Error?o=[`Error:${r.message}`]:o=[r];let s=0;return t.replaceAll(bh,function(){let n=arguments[2]||"",a=arguments[3]||"",l=arguments[5]||"",c="",d=false;if(Array.isArray(o)){let u=s>=o.length;c=u?"":_c.call(t,o[s],i),d=Xr(c)||u,s++;}else if(Oe(o)){let u=a in o;c=u?_c.call(t,o[a],i):"",d=Xr(c)||!u;}if(typeof i.forEach=="function"){let u=i.forEach(a,c,n,l);u!==void 0&&(Array.isArray(u)&&u.length===3?(n=u[0],c=u[1],l=u[2]):Xr(u)||(c=String(u)),d=Xr(c));}return d&&(i.empty==null?(c="",n="",l=""):c=i.empty),`${n}${c}${l}`})}function wc(){let t=new Date,r=t.getFullYear(),e=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0"),i=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0"),n=String(t.getSeconds()).padStart(2,"0"),a=String(t.getMilliseconds()).padStart(3,"0");return `${r}/${e}/${o} ${i}:${s}:${n} ${a}`}var Sc=["DEBUG","INFO","WARN","ERROR"],vh=["\x1B[2m","","\x1B[1m\x1B[33m","\x1B[1m\x1B[31m"];function An(t){let{debug:r,template:e,vars:o,colorized:i}=Object.assign({debug:false,template:"[{level}] {time} - {message}",colorized:true},t);function s(n,a){return (l,...c)=>{let d=r?0:Sc.findIndex(k=>k.toLowerCase()===n);d<0&&(d=0),d>3&&(d=3);let u=i?vh[d]:"",m=typeof l=="function"?l():l instanceof Error?l.message:l,g=kn(m instanceof Error?m.message:m,c,{forEach:(k,C)=>{if(i)return `\x1B[36m ${C} \x1B[0m${u}`}}),b=Sc[d].padEnd(5),v=kn(e,{message:g,time:wc(),level:b,...o});n==="debug"&&(v=`${u}${v}\x1B[0m`),n==="warn"&&(v=`${u}${v}\x1B[0m`),n==="error"&&(v=`${u}${v}\x1B[0m`),a(v);}}return {debug:s("debug",console.debug),info:s("info",console.info),warn:s("warn",console.warn),error:s("error",console.error)}}function yh(t,r,e){if(typeof r=="string"){let o=0,i;for(;(i=t.indexOf(r,o))>-1;){let s=typeof e=="function"?e(r):e,n=t.length;t=t.substring(0,i)+s+t.substring(i+r.length),o=i+s.length+t.length-n;}}else {let o;if(!r.global||!r.multiline)throw new Error("The search parameter must be enabled '/gm' option");for(;(o=r.exec(t))!==null;){o.index===r.lastIndex&&r.lastIndex++;let i=t.length,s=o[0].length,n=typeof e=="function"?e(o[0],...o):e;t=t.substring(0,o.index)+n+t.substring(o.index+s),r.lastIndex+=t.length-i;}}return t}String.prototype.replaceAll||(String.prototype.replaceAll=function(t,r){return yh(this,t,r)});(t=>typeof Mt<"u"?Mt:typeof Proxy<"u"?new Proxy(t,{get:(r,e)=>(typeof Mt<"u"?Mt:r)[e]}):t)(function(t){if(typeof Mt<"u")return Mt.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});function Cc(t){if(t.options.cascadeDestroy===false)return;let r=a=>(a.options.cascadeDestroy??t.options.cascadeDestroy??true)===true,e=(a,l)=>a.associated&&No(l,a.path)?true:(a.depends??[]).some(c=>No(l,c)),o=[],i,s=()=>{i=void 0;let a=o;o=[];let l=c=>a.some(d=>e(c,d));for(let c of t.computedObjects.values())c.destroyed||!r(c)||!l(c)||t.computedObjects.delete(c.id);for(let c of t.watchObjects.values())c.destroyed||!r(c)||!l(c)||t.watchObjects.delete(c.id);},n=t.watch("**",a=>{a.type==="delete"&&(o.push(a.path),i===void 0&&(i=setTimeout(s,0)));},{});t.once("unload",()=>{n.off(),i!==void 0&&clearTimeout(i),i=void 0,o=[];});}function xh(t,r,e){let o=e?._getRefStore||(()=>{let i=r.options.refStore||t.options.refStore;if(i)return new WeakRef(i)});if(typeof o=="function"){let i=o();i&&(r.refStateContext=_h(i,r));}}function _h(t,r){let e=null;function o(i,s){let n=t.deref(),a=Array.isArray(n)?n:[n],l=(i?.startsWith("@")?i:`@/${i||""}`).substring(1),[c,d]=l.split("/"),u=a.length===1&&c===""?a[0]:a.find(m=>m&&m.id===c);if(u&&a.length>0){let{runArgs:m,reactive:g=true}=s||{};if(g&&(e||(e=new Map),u&&!e.has(l))){let b=u.watch(d,()=>{r.run(m);});e.set(l,b);}return et(u.state,d)}}return {ref:o,off:()=>{e&&(e.forEach(i=>i.off()),e.clear(),e=null);}}}function kc(t){let r=[];r.push(t.on("observer/*/created",({observer:e,context:o})=>{xh(t,e,o?.value);})),r.push(t.on("observer/*/destroyed",e=>{e.refStateContext?.off();})),r.push(t.on("observer/*/run",({observer:e,args:o})=>{e.refStateContext&&(o.ref||(o.ref=e.refStateContext.ref));})),t.once("unload",()=>{try{r.forEach(e=>e.off());}finally{r.splice(0,r.length);}});}function Jr(t,r,e="."){let o=[];try{return typeof r=="function"&&(r=r.call(t,t)),o=Array.isArray(r)?r:typeof r=="string"?He(r,e):[],o.length>0?et(t,o):t}catch{return t}}function wh(t,r,e){let o=r===void 0?e:r;if(typeof o=="function")try{o=o.call(t.store,t);}catch{}return o===void 0?e===void 0?"CURRENT":e:o}function Ue(t,r,e,o){let i=t.store.state,s=t.store.options;if(typeof s.getRootScope=="function"){let d=s.getRootScope(t,{observerType:r,valuePath:e?.path});d!==void 0&&(i=d);}let{path:n,parentPath:a}=e||{},l=wh(t,o.scope,s.scope),c=i;try{l==="CURRENT"?c=Jr(i,a):l==="PARENT"?c=Jr(i,n.slice(0,n.length-2<0?0:n.length-2)):l==="ROOT"?c=i:l==="DEPENDS"?c=t.depends?.map(d=>Jr(i,d)):typeof l=="string"?l.startsWith("@")?c=Ue(t,r,e,{...o,scope:Ue(t,r,{...e,path:l.slice(1).split(s.delimiter)},{...o,scope:l.slice(1)})}):c=Jr(i,Ho(t.path,l)):Array.isArray(l)&&(c=Jr(i,l));}catch(d){t.store.logger.error(`Error while getting computed scope ${t.toString()}: ${d.message}`,"error");}return c}var Zr=class{constructor(r,e,o){this.descriptor=e;this.context=o;this._id="";this._associated=false;this._attached=false;this._destroyed=false;this._depends=[];this._subscribers=[];this._running=false;this.store=r,this._associated=o!==void 0,this._getter=e.getter,this._options=Object.assign({enable:true,group:"",depends:[],throwError:true},e.options),this._id=this._options.id||(this._associated?Ne(o?.path):ns());let i=o||this._options.anchor;this.context=i,this._path=i?.path||[`#${this._id}`],this._path||(this._path=[`#${this._id}`]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=Gr(this._path,this._options.depends),st(this.store,`observer/${this.id}/created`,{context:i,observer:this}),this._onInitial();}get type(){return this.descriptor.type}get options(){return this._options}get id(){return this._id}get associated(){return this._associated}get async(){return this._options.async}get running(){return this._running}get enable(){return this._options.enable}set enable(r){this._options.enable=r;}set group(r){this._options.group=r;}get group(){return this._options.group}get initial(){return this._initial}set initial(r){this._initial=r;}get path(){return this._path}get attached(){return this._attached}get destroyed(){return this._destroyed}get depends(){return this._depends}set depends(r){this._depends=r;}get getter(){return this._getter}set getter(r){this._getter=r;}get strPath(){return this._strPath||(this._strPath=this._path.join(this.store.options.delimiter)),this._strPath}get error(){return this._error}set error(r){this._error=r;}toString(){return `ObserverObject<${this.strPath}>`}get value(){return this._associated?et(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)}set value(r){if(this._associated)Ee(this.store.state,this._path,r);else {let e=this._value;r!==e&&(this._value=r,this.store.emit(`observer/${this.id}/updated`,{type:"set",path:this.path,value:r,oldValue:e}));}}_onInitial(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:true}),this.onInitial();}onInitial(){}onInitOptions(r){}update(r,e){this.store.update(()=>{this.value=r;},e);}silentUpdate(r){this.update(r,{silent:true});}watch(r,e){let o;return this._associated?o=this.store.watch(this.getValueWatchPath(),i=>{r.call(this,i);},e):o=this.store.on(`observer/${this.id}/updated`,i=>{r.call(this,i);}),this._subscribers.push(o),o}getValueWatchPath(){return this.path.join(this.store.options.delimiter)}getDepends(){return this.depends}onDependsChange(r){}attach(){!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.logger.debug(()=>`${this.toString()} subscribed to ${this.depends.map(r=>r.join(this.store.options.delimiter)).join(",")}`),this._attached=true);}detach(){this._attached&&(this._subscribers.forEach(r=>{r.off();}),this._attached=false,this._subscribers=[],this.store.watchObjects.delete(this.id));}destroy(){this._destroyed||(this._destroyed=true,this.onDestroy(),this.detach(),this.store.off(`observer:set:${this.id}`),Map.prototype.delete.call(this.store.computedObjects,this.id),Map.prototype.delete.call(this.store.watchObjects,this.id),st(this.store,`observer/${this.id}/destroyed`,this));}onDestroy(){}get shadowStore(){return this._shadowStore||(this._shadowStore=Et(this.store.options.getShadowStore)?this.store.options.getShadowStore()||this.store:this.store),this._shadowStore}run(...r){}reset(){}};var We=class extends Zr{constructor(e,o,i){super(e,o,i);this.descriptor=o;o.options.depends=Gr(this.path,this.options.depends),this.silentUpdate(this.initial);}toString(){return `ComputedObject<${Ne(this.path)}>`}getValue(){return this.value}_reportComputedStatus(e,o){if(!this[`_${e}`]){let s=(this.options.reports||{})[e];(typeof s=="string"||Array.isArray(s)&&s.length>0)&&(this[`_${e}`]=is(s,this.path));}Array.isArray(this[`_${e}`])&&this.store.update(i=>{Ee(i,this[`_${e}`],o);});}isDisable(e){return !this.store.options.enableComputed||!this.enable&&e!==true||e===false}run(e){throw new Error("Method not implemented.")}};var gs=class extends We{constructor(){super(...arguments);this._firstRun=false;this.lite=true;}get async(){return  true}onInitial(){this.initial=this.options.initial,this.attach(),setTimeout(()=>{(this.options.immediate===true||this.options.immediate==="auto"&&this.options.initial===void 0)&&this.run({first:true});},0);}async run(e){let{first:o}=e??{};if(this.isDisable(e?.enable)){this.store.logger.warn(()=>`Async computed <${this.toString()}> is disabled`);return}this.error=void 0,this._firstRun=true,o||this.store.logger.debug(()=>`Run async computed for : ${this.toString()}`);let i=e?Object.assign({first:o},this.options,e):this.options,s=Ue(this,"sync",this.context,i),{reentry:n}=i;if(this._running&&!n){this.store.logger.warn(()=>`Async computed: ${this.toString()} is running, can't reentry`),st(this.store,`observer/${this.id}/cancel`,{reason:"reentry",observer:this});return}this._running=true;try{return await this.executeGetter(s,i)}finally{this._running=false;}}async executeGetter(e,o){let i={getSnap:a=>ls(a),extras:o.extras,operate:o.operate,first:o.first};this.error=void 0;let s,n;try{this._reportComputedStatus("loading",!0),st(this.store,`observer/${this.id}/run`,{args:i,scope:e,observer:this}),n=await this.getter.call(this,e,i),o.raw&&gt(n),this.store.peep(()=>{this.value=n;}),this._reportComputedStatus("error",void 0);}catch(a){s=a,this._reportComputedStatus("error",a.message);}finally{this._reportComputedStatus("loading",false);}s?(this.error=s,st(this.store,`observer/${this.id}/error`,{error:s,observer:this})):st(this.store,`observer/${this.id}/done`,{value:n,observer:this}),this.onDoneCallback(o,n,e,n);}onDoneCallback(e,o,i,s){typeof e.onDone=="function"&&e.onDone.call(this,{id:this.id,path:this.path,timeout:false,abort:false,value:s,error:o,scope:i});}onDependsChange(e){this.store.logger.debug(()=>`AsyncComputed<${this.id}> is running by depends ${e.type}/${e.path.join(".")} operate `),this.run({operate:e,first:!this._firstRun});}};var bs=class extends We{get async(){return  false}onInitial(){this.collectDependencies();}run(r){let{first:e,operate:o}=Object.assign({first:false,operate:void 0},r);if(this.error=void 0,!e&&this.isDisable(r?.enable)){this.store.logger.warn(`Sync computed <${this.toString()}> is disabled`);return}e||this.store.logger.debug(`Run sync computed for : ${this.toString()}`);let i=r?Object.assign({},this.options,r):this.options,s=Ue(this,"sync",this.context,i);this.error=void 0;let n=i.initial;try{let a={operate:o,first:e};st(this.store,`observer/${this.id}/run`,{args:a,scope:s,observer:this}),n=this.getter.call(this,s,a),i.raw&&gt(n);}catch(a){this.error=a;}this.onDone(e,n,i);}onDone(r,e,o){let i=e;if(this.error&&Et(o.onError)){let s=o.onError(this.error);s!==void 0&&(i=s);}if(r&&(this.initial=i),this.error||this.store.peep(()=>{o.raw&&gt(i),this.value=i;}),!r)if(this.error){if(st(this.store,`observer/${this.id}/error`,{error:this.error,observer:this}),this.options.throwError)throw this.error}else st(this.store,`observer/${this.id}/done`,{value:i,observer:this});}collectDependencies(){let r=[],e=this.shadowStore.watch(o=>{r.push(o.path);},{operates:["get"]});this.run({first:true}),e.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&r.push(...Gr(this.path,this.options.depends)),this.depends=cs(r),this.attach();}onDependsChange(r){this.run({operate:r});}};var vs=class extends Zr{constructor(e,o,i){super(e,o,i);this.store=e;if(typeof this.options.filter!="function")throw new Error("watch options.filter must be a function")}get filter(){return this.options.filter}get cache(){return this._cache||(this._cache={}),this._cache}toString(){return `WatchObject<${this.id}>`}onInitial(){}isMatched(e,o){return os(e,this.path)?false:this.filter(e,o)}reset(){this._cache={},this.value=this.initial;}run(e,o){if(!this.enable){this.store.logger.debug(`WatchObject <${this.toString()}> is disabled`);return}try{let i={path:e,value:o};st(this.store,`observer/${this.id}/run`,{args:i,observer:this,scope:void 0});let s=this.getter?.call(this,i,this);this.options.raw&&gt(s),this.value=s,st(this.store,`observer/${this.id}/done`,{value:s,observer:this});}catch(i){st(this.store,`observer/${this.id}/error`,{error:i,observer:this});}}};var Ac={sync:(t,r,e)=>{let o=new bs(t,r,e);return t.computedObjects.set(o.id,o),o},async:(t,r,e)=>{let o=new gs(t,r,e);return t.computedObjects.set(o.id,o),o},watch:(t,r,e)=>{let o=new vs(t,r,e);return t.watchObjects.set(o.id,o),o},schema:(t,r,e)=>{if(t.options.configManager){let{path:o,value:i}=e,s=t.configManager.add(t,o,i);return t.configurabled.add(Ne(o)),{initial:s}}else return {initial:r.getter()}}};function $c(t){return typeof t=="string"&&t.startsWith("```")&&t.endsWith("```")}function Ec(t,r){return t.computedObjects.find(r)}function Oc(t,r){return (...e)=>{try{return t.call(this,...e)}catch(o){return this.logger.error(o),r}}}var ys=Symbol("autostore.broadcast");function Tc(t){if(t==null||typeof t!="object"||t instanceof Set)return  false;if(Array.isArray(t)||t instanceof Map)return  true;let r=Object.getPrototypeOf(t);return r===null||r===Object.prototype}function Sh(t){let r=t.type;return r==="set"||r==="delete"?Tc(t.value):r==="update"?(!t.indexs||t.indexs.length===0)&&Tc(t.value):false}function Ch(t,r,e){return !r||r<=0?[t]:r===1?[t,`${t}${e}*`]:[`${t}${e}**`]}var mr=class t extends Cn{constructor(e,o){super(Object.assign({id:ns(),debug:false,enableComputed:true,reentry:true,lazy:false,enableValueExpr:true,shadow:false,cascadeDestroy:true,resetable:false,plugins:[]},o,{delimiter:"/",transform:i=>i.payload}));this.__AUTO_STORE__=true;this._operates=new Cn({delimiter:".",transform:e=>e.payload});this._silenting=false;this._batching=false;this._batchOperates=[];this._updateFlags=0;this._peeping=false;this._subscribers=[];this._createSandbox(),this._createConfigManager(),this.computedObjects=new us(this),this.watchObjects=new ds(this),this._subscribeHooks(),this._installPlugins(),this._data=dc.call(this,e||{},{notify:this._notify.bind(this),createObserverObject:this.handleReactiveObject.bind(this)}),this.getSnap=this.getSnap.bind(this),this.watch=this.watch.bind(this),this.update=this.update.bind(this),this.peep=this.peep.bind(this),this.silentUpdate=this.silentUpdate.bind(this),this.batchUpdate=this.batchUpdate.bind(this),this.collectDependencies=this.collectDependencies.bind(this),this._enableReset(),this.options.lazy||as(this._data,this._onFirstEachState.bind(this)),this._options.debug&&typeof globalThis.__AUTOSTORE_DEVTOOLS__=="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(this),this.emit("load",this);}static{this.observers=Ac;}get id(){return this.options.id}get state(){return this._data}get plugins(){return this.options.plugins}get operates(){return this._operates}get configurabled(){return this._configurabled||(this._configurabled=new Set),this._configurabled}get errors(){return this._errors||(this._errors={}),this._errors}get options(){return super.options}get silenting(){return this._silenting}get delimiter(){return "."}get batching(){return this._batching}get peeping(){return this._peeping}get configManager(){return this._configManager}get configKey(){return this.options.configKey===void 0?this.id:this.options.configKey}get logger(){return this._logger||(this._logger=this.options.logger||An({debug:this.options.debug})),this._logger}get resetable(){return this.options.resetable??false}set resetable(e){if(e){if(this._resetWatcher)return;this._enableReset();}else this._resetWatcher&&(this._resetWatcher.off(),this._resetWatcher=void 0),this.updatedState={};this.options.resetable=e;}_enableReset(){this.updatedState={},this._resetWatcher=this.watch(({path:e,oldValue:o,type:i})=>{if(e.length===0||i==="batch")return;let s=e.join(this.delimiter||".");!s.startsWith("#")&&this.updatedState&&!(s in this.updatedState)&&(this.updatedState[s]=o);});}_createSandbox(){if(this.options.enableValueExpr){let e=Et(this.options.sandbox?.create)?this.options.sandbox.create:bc;this._safeEval=e({computed:es,watch:hs,configurable:vc,schema:fs},{onError:(o,i)=>(this.logger.error(o),i)});}}_installPlugins(){let e=this.options.plugins;e.push(Cc),e.push(kc);let o=globalThis.__AUTOSTORE_PLUGINS__;Array.isArray(o)&&e.push(...o),e.forEach(i=>{try{typeof i=="function"&&i(this);}catch(s){this.logger.error(`Error while installing the plugin<${i.name}>:{}`,s.message);}});}_createConfigManager(){let e=this.options.configManager;this.options.configKey===void 0&&(this.options.configKey=this.id),e&&typeof e=="object"&&"add"in e?this._configManager=e:globalThis[Ur]&&e!==false&&(this._configManager=globalThis[Ur]);}_onFirstEachState({value:e,path:o}){if(typeof e=="string"){if(this.options.enableValueExpr===false||!Et(this._safeEval))return;let i=e.trim();if($c(i)){if(i.length<=6)return;this.update(s=>{let n=i.slice(3,i.length-3).trim();if(!n)return;let a=this._safeEval?.(n,this.options.sandbox?.context||{});Ee(s,o,a);});}}}_subscribeHooks(){Object.entries({"observer/initial":"onObserverInitial","observer/*/created":"onObserverCreated","observer/*/run":"onObserverRun","observer/*/done":"onObserverDone","observer/*/cancel":"onObserverCancel","observer/*/error":"onObserverError","observer/*/destroyed":"onObserverDestroyed"}).forEach(([o,i])=>{let s=this.options?.[i];if(s==null)return;let n=(Array.isArray(s)?s:[s]).filter(a=>typeof a=="function");this._subscribers.push(...n.map(a=>this.on(o,Oc.call(this,a))));});}_notify(e){if(this._peeping&&e.type==="get"||(this._batching&&this._batchOperates.push(e),this._silenting))return;e.flags=this._updateFlags;let o=e.path.join(this.delimiter);Sh(e)?this._broadcastOperate(o,e):this.operates.emit(o,e);}_broadcastOperate(e,o){let i=new Set;this.computedObjects.forEach(c=>i.add(c.path.join(this.delimiter))),this.watchObjects.forEach(c=>i.add(c.path.join(this.delimiter)));let s=o.path,n=o.type,a=n==="delete"?void 0:o.value,l=n==="delete"?o.value:o.oldValue;this.operates.broadcast(e,o,(c,d)=>{if(i.has(c))return null;let u=c.split(this.delimiter),m=u.slice(s.length);if(m.length===0)return null;if(m.some(b=>b==="*"||b==="**"))return {...d,type:c,payload:{...o,path:s,broadcast:true}};let g=this._peeping;this._peeping=true;try{let b=a!=null&&et(a,m,ys)!==ys,v=l!=null&&et(l,m,ys)!==ys;if(!b&&!v)return null;let k=b?et(a,m):void 0,C=v?et(l,m):void 0;if(b&&v&&k===C||typeof k=="function"||typeof C=="function")return null;let S={...o,type:b?"set":"delete",path:u,value:k,oldValue:C,parentPath:u.slice(0,-1),parent:b?et(a,m.slice(0,-1)):et(l,m.slice(0,-1)),indexs:[],broadcast:!0};return {...d,type:c,payload:S}}finally{this._peeping=g;}});}watch(){let e=typeof arguments[0]=="function"||["*","**"].includes(arguments[0])||Array.isArray(arguments[0])&&arguments[0].length===0,o=typeof arguments[0]=="function"?arguments[0]:arguments[1],i=arguments.length>=2&&typeof arguments[arguments.length-1]=="object"?arguments[arguments.length-1]:void 0,s=(n,a)=>l=>{if(wn(l,n)&&!(typeof a=="function"&&!a(l)))try{if(this._peeping=!0,l.type==="batch"){let c=l.value.filter(d=>wn(d,n));if(c.length>0)l.value=c;else return}o(l);}finally{this._peeping=false;}};if(e){let{operates:n,filter:a}=Object.assign({once:false,operates:"write"},i),l=s(n,a);return this.operates.onAny(l)}else {let n=arguments[0],a=Array.isArray(n)?n.map(C=>typeof C=="string"?C:C.join(this.delimiter)):[n],{once:l,operates:c,filter:d,depth:u}=Object.assign({once:false,operates:"write"},i),m=l?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),g=[],b=s(c,d),v=l||!u||u<=0?0:u,k=new Set;return a.forEach(C=>{Ch(C,v,this.delimiter).forEach(S=>k.add(S));}),k.forEach(C=>{g.push(m.call(this,C,b));}),{off:()=>g.forEach(C=>{C.off();})}}}handleReactiveObject(e,o,i,s){let n=fc(o),a={path:e,value:o,parentPath:i,parent:s},l=this.createObserverObject(n,a);return l?l.initial:o}reset(e){if(!this.resetable||!this.updatedState){this.logger.warn("Resetable \u672A\u542F\u7528\uFF0C\u8BF7\u5148\u6267\u884C store.resetable = true");return}let o=this.updatedState,i=this.delimiter||".",s=e?`${e}${i}`:"";this.batchUpdate(n=>{for(let[a,l]of Object.entries(o))e&&!a.startsWith(s)||Ee(n,He(a,i),l);}),this.updatedState={},this.emit("reset",e);}createObserverObject(e,o){if(e){let i=t.observers[e.type];if(i)return i(this,e,o)}}silentUpdate(e){this.update(e,{silent:true});}batchUpdate(e){this.update(e,{batch:true,onInvalid:"pass"});}update(e,o){let{batch:i=false,reply:s=true,silent:n=false,peep:a=false,flags:l=0,onInvalid:c}=o||{};if(typeof e=="function"){this._updateFlags=l,this._updateValidateBehavior=c,n&&(this._silenting=true),i&&(this._batching=true,this._silenting=true),a&&(this._peeping=true);try{let d=e(this.state);if(i&&tc(d))throw new Error("Batch update method can't be async function")}finally{this._silenting=false,this._batching=false,this._peeping=false,this._updateFlags=0,this._updateValidateBehavior=void 0,this.replyBatchOperates(s,i);}}else throw new Error("update method must provide a function argument")}replyBatchOperates(e,o){if(this._batchOperates.length>0){let i=[...this._batchOperates];this._batchOperates=[],e&&i.forEach(s=>{s.reply=true,this._notify(s);});try{let s=o===!0?Xl:String(o);this.operates.emit(s,{type:"batch",path:[s],value:i});}finally{this._batchOperates=[];}}}peep(){let e=typeof arguments[0]=="function"?()=>arguments[0](this.state):()=>et(this.state,Array.isArray(arguments[0])?arguments[0]:He(arguments[0],this.delimiter));this._peeping=true;try{return e()}finally{this._peeping=false;}}collectDependencies(e,o="*"){let i=[],s=this.watch(n=>{i.push(n.path);},{operates:o});try{e();}finally{s.off();}return cs(i)}destroy(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this._resetWatcher?.off(),this._resetWatcher=void 0,this._subscribers.forEach(e=>e.off()),this._configManager?.remove?.(this),this.emit("unload",this);}getSnap(e){let{reserveAsync:o,entry:i,includeFunc:s}=Object.assign({reserveAsync:true},e);return ps(i?et(this._data,i):this._data,{reserveAsync:o,includeFunc:s})}get(e,o){let{defaultValue:i,timeout:s=0,waitAsyncDone:n=false}=Object.assign({},o),a=Array.isArray(e)?e:He(e,this.delimiter),l=et(this.state,a,i),c=Ec(this,e);return c?c.async&&c.running&&n?new Promise((d,u)=>{let m,g;s>0&&(m=setTimeout(()=>{g?.off(),u(new Nr);},s)),g=c.watch(()=>{clearTimeout(m),g?.off(),d(c.getValue());},{once:true});}):c.getValue():l}toString(){return `AutoStore<${this.id}>`}};var xs=class extends mr{constructor(e,o){let i=Object.assign({global:true,configManager:false,autoload:true,autosave:true,scope:"ROOT"},o);super({},i);this.source=e;this.dirtyValues={};this._reseting=false;this._loadingCount=0;if(i.global!==false){let s=i.global===true?Ur:i.global;return globalThis[s]===void 0&&(globalThis[s]=this),i.autoload&&this.load().catch(()=>{}),globalThis[s]=this,this}i.autoload&&this.load().catch(()=>{});}get fields(){return this.state}get size(){return Object.keys(this.fields).length}async load(){let e=await this.source.load();this._loadingCount++;let o=false;try{this.update(i=>{Object.entries(e).forEach(([s,n])=>{let a=i[s];a?(a.value=n,o=!0):i[s]={value:n};});},{silent:!0}),o&&await new Promise(i=>setTimeout(i,0));}finally{this._loadingCount--,this.dirtyValues={};}}async save(e){let o=e?this._getValues():this.dirtyValues;Object.keys(o).length>0&&(await this.source.save?.(o),this.dirtyValues={});}_getValues(){return Object.entries(this.state).reduce((e,[o,i])=>(e[o]=i.value,e),{})}async reset(){if(!this._reseting){this._reseting=true;try{this.dirtyValues={},Object.values(this.state).forEach(e=>{try{let o=e.default;o!==void 0&&(e.value=ic(gt(o),{slient:!0,onInvalid:"none"}));}catch{}}),await new Promise(e=>setTimeout(e,0));}finally{typeof this.source.reset=="function"&&this.source.reset.call(this),this._reseting=false,this.dirtyValues={};}}}onUpdate(e,o,i){if(!(this._loadingCount>0||this._reseting))try{this.dirtyValues[o]=i,this.options.autosave&&Promise.resolve(this.source.save?.(this.dirtyValues)).then(()=>{this.dirtyValues={};});}finally{this._notify({type:"set",path:[o,"value"],value:i});}}remove(e){let o=e.options.delimiter;e.configurabled.forEach(i=>{let n=[...i.split(o)];e.options.configKey&&n.splice(0,0,e.options.configKey);let a=n.join(".");delete this.state[a],delete this.dirtyValues[a];});}add(e,o,i){this.operates.options.delimiter=e.options.delimiter;let s=rc(i)?i():i,n=Array.isArray(o)?o:o.split("."),a=n.join(e.options.delimiter),l=[...n];e.options.configKey&&l.splice(0,0,e.options.configKey);let c=s.getter();s.options.default===void 0&&(s.options.default=c),s.options.value=c,e.options.defaultSchema&&Object.keys(e.options.defaultSchema).forEach(u=>{let m=e.options.defaultSchema[u];s.options[u]===void 0&&(s.options[u]=m);}),s.options.onInvalid===void 0&&(s.options.onInvalid="throw"),this._installValidator(a,s,e);let d=this.peep(u=>et(u,[l.join("."),"value"]));return this._handleRefState(s.options,e),this.state[Ne(l)]=s.options,d!==void 0&&(s.options.value=d),this._createValueProxy(s,e,n),d||c}_handleRefState(e,o){Object.values(e).forEach(i=>{Et(i)&&!fr(i)&&(i._getRefStore=()=>new WeakRef(o));});}_installValidator(e,o,i){if(Et(o.options.validate)){let s=o.options.errorMessage;o.options.validate.getErrorMessage=a=>typeof s=="string"?s.params({...o.options,error:a.message,errorStack:a.stack,path:e}):a.message;let n=o.options.onInvalid;n!==void 0&&(o.options.validate.onInvalid=n),i.options.validators||(i.options.validators={}),i.options.validators[e]=o.options.validate;}else i.options.validators&&delete i.options.validators[e];}_createValueProxy(e,o,i){let s=this;return Object.defineProperty(e.options,"value",gt({get(){let n=et(o.state,i);return s._notify({type:"get",path:[...i,"value"],value:n}),n},set(n){o.update(a=>{Ee(a,i,n);}),s._notify({type:"set",path:[...i,"value"],value:n});}}))}getConfigValue(e){return this.peep(o=>et(o,[...e,"value"]))}};var qe=class{constructor(r,e,o){this.path=e;this.handle=o;this._loading=false;this._ready=false;this.host=r,r.addController(this);}get loading(){return this._loading}get value(){return this._value}load(){let r=this.host.schema,e=et(r,this.path);Be(e)?e.loading?(this._loading=true,this._value=this.handle(void 0)):(this._ready=e.value!==void 0,this._value=this.handle(e.value),this._loading=false):(this._ready=true,this._value=this.handle(e),this._loading=false);}render(r){return f`
            ${B(this.loading,()=>f`<auto-loading></auto-loading>`,()=>r(this._value))}
        `}hostUpdate(){this._ready||this.load();}hostUpdated(){}};exports.AutoFieldSelect=class Uo extends I{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";this.items=new qe(this,"select",e=>!e||!Array.isArray(e)?[]:e.map(o=>{let i={};return typeof o=="object"?Object.assign(i,o):typeof o=="string"&&o.startsWith("-")?Object.assign(i,{type:"divider"}):Object.assign(i,{label:o}),i}));}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}_renderItem(e){let o=this.options.renderItem;return typeof o=="string"?f`${zt(o.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof o=="function"?f`${zt(o(e))}`:e.label||e.value}_onDropdownMenu(){}renderInput(){return f`
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
                @sl-show=${this._onDropdownMenu.bind(this)}
                hoist
            >
                
                ${B(this.items.loading,()=>f`<auto-loading></auto-loading>`,()=>f`${this.renderBeforeActions()}
                ${this.items.value.map(e=>e.type==="divider"?f`<sl-divider></sl-divider>`:f`<sl-option value="${e[this.valueKey]||e.label}" ?disabled=${!this.options.enable}>
                            <auto-flex class="item" gap="1em" align="center" grow="sl-icon + *,:first-child:not(sl-icon)" style="text-align:left;">
                                ${B(e.icon,()=>f`<sl-icon name="${e.icon}"></sl-icon>`)}
                                ${this._renderItem(e)}
                            </auto-flex>
                        </sl-option>`)}
                    ${this.renderAfterActions()}`)}
                
            </sl-select>
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect.styles=[I.styles,Gl,x`
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
        `],exports.AutoFieldSelect=y([R("auto-field-select")],exports.AutoFieldSelect);var Rc=x`
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
`;var ot=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this),this.hasSlotController=new ht(this,"help-text","label"),this.localize=new H(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let r=this.input.offsetWidth,e=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",s=r*t;if(i){let n=`${r-s}px + ${t} * ${o}`;this.output.style.translate=`calc((${n} - ${e/2}px - ${o} / 2))`;}else {let n=`${s}px - ${t} * ${o}`;this.output.style.translate=`calc(${n} - ${e/2}px + ${o} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r;return f`
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
              name=${w(this.name)}
              ?disabled=${this.disabled}
              min=${w(this.min)}
              max=${w(this.max)}
              step=${w(this.step)}
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
    `}};ot.styles=[L,Vt,Rc];p([E(".range__control")],ot.prototype,"input",2);p([E(".range__tooltip")],ot.prototype,"output",2);p([$()],ot.prototype,"hasFocus",2);p([$()],ot.prototype,"hasTooltip",2);p([h()],ot.prototype,"title",2);p([h()],ot.prototype,"name",2);p([h({type:Number})],ot.prototype,"value",2);p([h()],ot.prototype,"label",2);p([h({attribute:"help-text"})],ot.prototype,"helpText",2);p([h({type:Boolean,reflect:true})],ot.prototype,"disabled",2);p([h({type:Number})],ot.prototype,"min",2);p([h({type:Number})],ot.prototype,"max",2);p([h({type:Number})],ot.prototype,"step",2);p([h()],ot.prototype,"tooltip",2);p([h({attribute:false})],ot.prototype,"tooltipFormatter",2);p([h({reflect:true})],ot.prototype,"form",2);p([Kt()],ot.prototype,"defaultValue",2);p([Pe({passive:true})],ot.prototype,"handleThumbDragStart",1);p([O("value",{waitUntilFirstUpdate:true})],ot.prototype,"handleValueChange",1);p([O("disabled",{waitUntilFirstUpdate:true})],ot.prototype,"handleDisabledChange",1);p([O("hasTooltip",{waitUntilFirstUpdate:true})],ot.prototype,"syncRange",1);ot.define("sl-range");exports.AutoFieldRabge=class Wo extends I{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top"}}renderInput(){return f`
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
        `],exports.AutoFieldRabge=y([R("auto-field-range")],exports.AutoFieldRabge);var Ic=x`
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
`;function ft(t,r,e){let o=i=>Object.is(i,-0)?0:i;return t<r?o(r):t>e?o(e):o(t)}var kt=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let r=this.localize.dir()==="rtl",{left:e,right:o,width:i}=this.rating.getBoundingClientRect(),s=r?this.roundToPrecision((o-t)/i*this.max,this.precision):this.roundToPrecision((t-e)/i*this.max,this.precision);return ft(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let r=this.localize.dir()==="ltr",e=this.localize.dir()==="rtl",o=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||r&&t.key==="ArrowLeft"||e&&t.key==="ArrowRight"){let i=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-i),t.preventDefault();}if(t.key==="ArrowUp"||r&&t.key==="ArrowRight"||e&&t.key==="ArrowLeft"){let i=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+i),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==o&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,r=.5){let e=1/r;return Math.ceil(t*e)/e}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",r=Array.from(Array(this.max).keys()),e=0;return this.disabled||this.readonly?e=this.value:e=this.isHovering?this.hoverValue:this.value,f`
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
          ${r.map(o=>e>o&&e<o+1?f`
                <span
                  class=${M({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===o+1})}
                  role="presentation"
                >
                  <div
                    style=${tt({clipPath:t?`inset(0 ${(e-o)*100}% 0 0)`:`inset(0 0 0 ${(e-o)*100}%)`})}
                  >
                    ${zt(this.getSymbol(o+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${tt({clipPath:t?`inset(0 0 0 ${100-(e-o)*100}%)`:`inset(0 ${100-(e-o)*100}% 0 0)`})}
                  >
                    ${zt(this.getSymbol(o+1))}
                  </div>
                </span>
              `:f`
              <span
                class=${M({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===o+1,"rating__symbol--active":e>=o+1})}
                role="presentation"
              >
                ${zt(this.getSymbol(o+1))}
              </span>
            `)}
        </span>
      </div>
    `}};kt.styles=[L,Ic];kt.dependencies={"sl-icon":q};p([E(".rating")],kt.prototype,"rating",2);p([$()],kt.prototype,"hoverValue",2);p([$()],kt.prototype,"isHovering",2);p([h()],kt.prototype,"label",2);p([h({type:Number})],kt.prototype,"value",2);p([h({type:Number})],kt.prototype,"max",2);p([h({type:Number})],kt.prototype,"precision",2);p([h({type:Boolean,reflect:true})],kt.prototype,"readonly",2);p([h({type:Boolean,reflect:true})],kt.prototype,"disabled",2);p([h()],kt.prototype,"getSymbol",2);p([Pe({passive:true})],kt.prototype,"handleTouchMove",1);p([O("hoverValue")],kt.prototype,"handleHoverValueChange",1);p([O("isHovering")],kt.prototype,"handleIsHoveringChange",1);kt.define("sl-rating");exports.AutoFieldRating=class _s extends I{getInitialOptions(){return {max:5,precision:1}}renderInput(){return f`
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
        `}renderView(){return f`<sl-rating slot="value" name="${this.name}" data-path=${this.path} value=${this.value} max=${this.options.max} readonly> </sl-rating> `}};exports.AutoFieldRating=y([R("auto-field-rating")],exports.AutoFieldRating);var Mc=x`
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
`;var $n=class extends P{render(){return f` <slot></slot> `}};$n.styles=[L,Mc];var Pc=x`
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
`;var F=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ht(this,"help-text","label"),this.localize=new H(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let r=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!r&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,r,e="none"){this.input.setSelectionRange(t,r,e);}setRangeText(t,r,e,o="preserve"){let i=r??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,o),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return f`
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
              .value=${Ot(this.value)}
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
    `}};F.styles=[L,Vt,Pc];F.dependencies={"sl-icon":q};p([E(".input__control")],F.prototype,"input",2);p([$()],F.prototype,"hasFocus",2);p([h()],F.prototype,"title",2);p([h({reflect:true})],F.prototype,"type",2);p([h()],F.prototype,"name",2);p([h()],F.prototype,"value",2);p([Kt()],F.prototype,"defaultValue",2);p([h({reflect:true})],F.prototype,"size",2);p([h({type:Boolean,reflect:true})],F.prototype,"filled",2);p([h({type:Boolean,reflect:true})],F.prototype,"pill",2);p([h()],F.prototype,"label",2);p([h({attribute:"help-text"})],F.prototype,"helpText",2);p([h({type:Boolean})],F.prototype,"clearable",2);p([h({type:Boolean,reflect:true})],F.prototype,"disabled",2);p([h()],F.prototype,"placeholder",2);p([h({type:Boolean,reflect:true})],F.prototype,"readonly",2);p([h({attribute:"password-toggle",type:Boolean})],F.prototype,"passwordToggle",2);p([h({attribute:"password-visible",type:Boolean})],F.prototype,"passwordVisible",2);p([h({attribute:"no-spin-buttons",type:Boolean})],F.prototype,"noSpinButtons",2);p([h({reflect:true})],F.prototype,"form",2);p([h({type:Boolean,reflect:true})],F.prototype,"required",2);p([h()],F.prototype,"pattern",2);p([h({type:Number})],F.prototype,"minlength",2);p([h({type:Number})],F.prototype,"maxlength",2);p([h()],F.prototype,"min",2);p([h()],F.prototype,"max",2);p([h()],F.prototype,"step",2);p([h()],F.prototype,"autocapitalize",2);p([h()],F.prototype,"autocorrect",2);p([h()],F.prototype,"autocomplete",2);p([h({type:Boolean})],F.prototype,"autofocus",2);p([h()],F.prototype,"enterkeyhint",2);p([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],F.prototype,"spellcheck",2);p([h()],F.prototype,"inputmode",2);p([O("disabled",{waitUntilFirstUpdate:true})],F.prototype,"handleDisabledChange",1);p([O("step",{waitUntilFirstUpdate:true})],F.prototype,"handleStepChange",1);p([O("value",{waitUntilFirstUpdate:true})],F.prototype,"handleValueChange",1);function Qr(t,r){function e(i){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,a=s.left+n.scrollX,l=s.top+n.scrollY,c=i.pageX-a,d=i.pageY-l;r?.onMove&&r.onMove(c,d);}function o(){document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",o),r?.onStop&&r.onStop();}document.addEventListener("pointermove",e,{passive:true}),document.addEventListener("pointerup",o),r?.initialEvent instanceof PointerEvent&&e(r.initialEvent);}var Lc=x`
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
`;function*Vc(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Ia(Vc(t.shadowRoot.activeElement))));}function Dc(){return [...Vc()].pop()}var zc=new WeakMap;function Fc(t){let r=zc.get(t);return r||(r=window.getComputedStyle(t,null),zc.set(t,r)),r}function kh(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let r=Fc(t);return r.visibility!=="hidden"&&r.display!=="none"}function Ah(t){let r=Fc(t),{overflowY:e,overflowX:o}=r;return e==="scroll"||o==="scroll"?true:e!=="auto"||o!=="auto"?false:t.scrollHeight>t.clientHeight&&e==="auto"||t.scrollWidth>t.clientWidth&&o==="auto"}function $h(t){let r=t.tagName.toLowerCase(),e=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(r==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,a=s.querySelector(`${n}:checked`);return a?a===t:s.querySelector(n)===t}return kh(t)?(r==="audio"||r==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(r)?true:Ah(t):false}function jc(t){var r,e;let o=Oh(t),i=(r=o[0])!=null?r:null,s=(e=o[o.length-1])!=null?e:null;return {start:i,end:s}}function Eh(t,r){var e;return ((e=t.getRootNode({composed:true}))==null?void 0:e.host)!==r}function Oh(t){let r=new WeakMap,e=[];function o(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||r.has(i))return;r.set(i,true),!e.includes(i)&&$h(i)&&e.push(i),i instanceof HTMLSlotElement&&Eh(i,t)&&i.assignedElements({flatten:true}).forEach(s=>{o(s);}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&o(i.shadowRoot);}for(let s of i.children)o(s);}return o(t),e.sort((i,s)=>{let n=Number(i.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var bt=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var r;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((r=document.activeElement)==null?void 0:r.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let e=(o,i)=>{if(!o)return null;let s=o.closest(i);if(s)return s;let n=o.getRootNode();return n instanceof ShadowRoot?e(n.host,i):null};setTimeout(()=>{var o;let i=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?Dc():document.activeElement;(!this.containingElement||e(i,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let r=t.composedPath();this.containingElement&&!r.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let r=t.target;!this.stayOpenOnSelect&&r.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let r=this.getMenu();if(r){let e=r.getAllItems(),o=e[0],i=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),e.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(r.setCurrentItem(o),o.focus()),(t.key==="ArrowUp"||t.key==="End")&&(r.setCurrentItem(i),i.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let r=this.trigger.assignedElements({flatten:true}).find(o=>jc(o).start),e;if(r){switch(r.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":e=r.button;break;default:e=r;}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,Ae(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,Ae(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await te(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:r}=Zt(this,"dropdown.show",{dir:this.localize.dir()});await Qt(this.popup.popup,t,r),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await te(this);let{keyframes:t,options:r}=Zt(this,"dropdown.hide",{dir:this.localize.dir()});await Qt(this.popup.popup,t,r),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return f`
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
    `}};bt.styles=[L,Lc];bt.dependencies={"sl-popup":J};p([E(".dropdown")],bt.prototype,"popup",2);p([E(".dropdown__trigger")],bt.prototype,"trigger",2);p([E(".dropdown__panel")],bt.prototype,"panel",2);p([h({type:Boolean,reflect:true})],bt.prototype,"open",2);p([h({reflect:true})],bt.prototype,"placement",2);p([h({type:Boolean,reflect:true})],bt.prototype,"disabled",2);p([h({attribute:"stay-open-on-select",type:Boolean,reflect:true})],bt.prototype,"stayOpenOnSelect",2);p([h({attribute:false})],bt.prototype,"containingElement",2);p([h({type:Number})],bt.prototype,"distance",2);p([h({type:Number})],bt.prototype,"skidding",2);p([h({type:Boolean})],bt.prototype,"hoist",2);p([h({reflect:true})],bt.prototype,"sync",2);p([O("open",{waitUntilFirstUpdate:true})],bt.prototype,"handleOpenChange",1);Jt("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Jt("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Bc=x`
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
`;var Hc=x`
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
`;var Te=class extends P{constructor(){super(...arguments),this.localize=new H(this);}render(){return f`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Te.styles=[L,Hc];var Y=class extends P{constructor(){super(...arguments),this.formControlController=new yt(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new ht(this,"[default]","prefix","suffix"),this.localize=new H(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:Pr}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),r=t?Lr`a`:Lr`button`;return je`
      <${r}
        part="base"
        class=${M({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
        ${this.caret?je` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?je`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${r}>
    `}};Y.styles=[L,$i];Y.dependencies={"sl-icon":q,"sl-spinner":Te};p([E(".button")],Y.prototype,"button",2);p([$()],Y.prototype,"hasFocus",2);p([$()],Y.prototype,"invalid",2);p([h()],Y.prototype,"title",2);p([h({reflect:true})],Y.prototype,"variant",2);p([h({reflect:true})],Y.prototype,"size",2);p([h({type:Boolean,reflect:true})],Y.prototype,"caret",2);p([h({type:Boolean,reflect:true})],Y.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],Y.prototype,"loading",2);p([h({type:Boolean,reflect:true})],Y.prototype,"outline",2);p([h({type:Boolean,reflect:true})],Y.prototype,"pill",2);p([h({type:Boolean,reflect:true})],Y.prototype,"circle",2);p([h()],Y.prototype,"type",2);p([h()],Y.prototype,"name",2);p([h()],Y.prototype,"value",2);p([h()],Y.prototype,"href",2);p([h()],Y.prototype,"target",2);p([h()],Y.prototype,"rel",2);p([h()],Y.prototype,"download",2);p([h()],Y.prototype,"form",2);p([h({attribute:"formaction"})],Y.prototype,"formAction",2);p([h({attribute:"formenctype"})],Y.prototype,"formEnctype",2);p([h({attribute:"formmethod"})],Y.prototype,"formMethod",2);p([h({attribute:"formnovalidate",type:Boolean})],Y.prototype,"formNoValidate",2);p([h({attribute:"formtarget"})],Y.prototype,"formTarget",2);p([O("disabled",{waitUntilFirstUpdate:true})],Y.prototype,"handleDisabledChange",1);function vt(t,r){Th(t)&&(t="100%");let e=Rh(t);return t=r===360?t:Math.min(r,Math.max(0,parseFloat(t))),e&&(t=parseInt(String(t*r),10)/100),Math.abs(t-r)<1e-6?1:(r===360?t=(t<0?t%r+r:t%r)/parseFloat(String(r)):t=t%r/parseFloat(String(r)),t)}function qo(t){return Math.min(1,Math.max(0,t))}function Th(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function Rh(t){return typeof t=="string"&&t.indexOf("%")!==-1}function ws(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Ko(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Ke(t){return t.length===1?"0"+t:String(t)}function Nc(t,r,e){return {r:vt(t,255)*255,g:vt(r,255)*255,b:vt(e,255)*255}}function On(t,r,e){t=vt(t,255),r=vt(r,255),e=vt(e,255);let o=Math.max(t,r,e),i=Math.min(t,r,e),s=0,n=0,a=(o+i)/2;if(o===i)n=0,s=0;else {let l=o-i;switch(n=a>.5?l/(2-o-i):l/(o+i),o){case t:s=(r-e)/l+(r<e?6:0);break;case r:s=(e-t)/l+2;break;case e:s=(t-r)/l+4;break;}s/=6;}return {h:s,s:n,l:a}}function En(t,r,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+(r-t)*(6*e):e<1/2?r:e<2/3?t+(r-t)*(2/3-e)*6:t}function Uc(t,r,e){let o,i,s;if(t=vt(t,360),r=vt(r,100),e=vt(e,100),r===0)i=e,s=e,o=e;else {let n=e<.5?e*(1+r):e+r-e*r,a=2*e-n;o=En(a,n,t+1/3),i=En(a,n,t),s=En(a,n,t-1/3);}return {r:o*255,g:i*255,b:s*255}}function Tn(t,r,e){t=vt(t,255),r=vt(r,255),e=vt(e,255);let o=Math.max(t,r,e),i=Math.min(t,r,e),s=0,n=o,a=o-i,l=o===0?0:a/o;if(o===i)s=0;else {switch(o){case t:s=(r-e)/a+(r<e?6:0);break;case r:s=(e-t)/a+2;break;case e:s=(t-r)/a+4;break;}s/=6;}return {h:s,s:l,v:n}}function Wc(t,r,e){t=vt(t,360)*6,r=vt(r,100),e=vt(e,100);let o=Math.floor(t),i=t-o,s=e*(1-r),n=e*(1-i*r),a=e*(1-(1-i)*r),l=o%6,c=[e,n,s,s,a,e][l],d=[a,e,e,n,s,s][l],u=[s,s,a,e,e,n][l];return {r:c*255,g:d*255,b:u*255}}function Rn(t,r,e,o){let i=[Ke(Math.round(t).toString(16)),Ke(Math.round(r).toString(16)),Ke(Math.round(e).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function qc(t,r,e,o,i){let s=[Ke(Math.round(t).toString(16)),Ke(Math.round(r).toString(16)),Ke(Math.round(e).toString(16)),Ke(Ih(o))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function Kc(t,r,e,o){let i=t/100,s=r/100,n=e/100,a=o/100,l=255*(1-i)*(1-a),c=255*(1-s)*(1-a),d=255*(1-n)*(1-a);return {r:l,g:c,b:d}}function In(t,r,e){let o=1-t/255,i=1-r/255,s=1-e/255,n=Math.min(o,i,s);return n===1?(o=0,i=0,s=0):(o=(o-n)/(1-n)*100,i=(i-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(o),m:Math.round(i),y:Math.round(s),k:Math.round(n)}}function Ih(t){return Math.round(parseFloat(t)*255).toString(16)}function Mn(t){return Ft(t)/255}function Ft(t){return parseInt(t,16)}function Gc(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var Go={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Yc(t){let r={r:0,g:0,b:0},e=1,o=null,i=null,s=null,n=false,a=false;return typeof t=="string"&&(t=Lh(t)),typeof t=="object"&&(Wt(t.r)&&Wt(t.g)&&Wt(t.b)?(r=Nc(t.r,t.g,t.b),n=true,a=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Wt(t.h)&&Wt(t.s)&&Wt(t.v)?(o=Ko(t.s),i=Ko(t.v),r=Wc(t.h,o,i),n=true,a="hsv"):Wt(t.h)&&Wt(t.s)&&Wt(t.l)?(o=Ko(t.s),s=Ko(t.l),r=Uc(t.h,o,s),n=true,a="hsl"):Wt(t.c)&&Wt(t.m)&&Wt(t.y)&&Wt(t.k)&&(r=Kc(t.c,t.m,t.y,t.k),n=true,a="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(e=t.a)),e=ws(e),{ok:n,format:t.format||a,r:Math.min(255,Math.max(r.r,0)),g:Math.min(255,Math.max(r.g,0)),b:Math.min(255,Math.max(r.b,0)),a:e}}var Mh="[-\\+]?\\d+%?",Ph="[-\\+]?\\d*\\.\\d+%?",Ge="(?:"+Ph+")|(?:"+Mh+")",Pn="[\\s|\\(]+("+Ge+")[,|\\s]+("+Ge+")[,|\\s]+("+Ge+")\\s*\\)?",Ss="[\\s|\\(]+("+Ge+")[,|\\s]+("+Ge+")[,|\\s]+("+Ge+")[,|\\s]+("+Ge+")\\s*\\)?",re={CSS_UNIT:new RegExp(Ge),rgb:new RegExp("rgb"+Pn),rgba:new RegExp("rgba"+Ss),hsl:new RegExp("hsl"+Pn),hsla:new RegExp("hsla"+Ss),hsv:new RegExp("hsv"+Pn),hsva:new RegExp("hsva"+Ss),cmyk:new RegExp("cmyk"+Ss),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Lh(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let r=false;if(Go[t])t=Go[t],r=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let e=re.rgb.exec(t);return e?{r:e[1],g:e[2],b:e[3]}:(e=re.rgba.exec(t),e?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=re.hsl.exec(t),e?{h:e[1],s:e[2],l:e[3]}:(e=re.hsla.exec(t),e?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=re.hsv.exec(t),e?{h:e[1],s:e[2],v:e[3]}:(e=re.hsva.exec(t),e?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=re.cmyk.exec(t),e?{c:e[1],m:e[2],y:e[3],k:e[4]}:(e=re.hex8.exec(t),e?{r:Ft(e[1]),g:Ft(e[2]),b:Ft(e[3]),a:Mn(e[4]),format:r?"name":"hex8"}:(e=re.hex6.exec(t),e?{r:Ft(e[1]),g:Ft(e[2]),b:Ft(e[3]),format:r?"name":"hex"}:(e=re.hex4.exec(t),e?{r:Ft(e[1]+e[1]),g:Ft(e[2]+e[2]),b:Ft(e[3]+e[3]),a:Mn(e[4]+e[4]),format:r?"name":"hex8"}:(e=re.hex3.exec(t),e?{r:Ft(e[1]+e[1]),g:Ft(e[2]+e[2]),b:Ft(e[3]+e[3]),format:r?"name":"hex"}:false))))))))))}function Wt(t){return typeof t=="number"?!Number.isNaN(t):re.CSS_UNIT.test(t)}var Yo=class t{constructor(r="",e={}){if(r instanceof t)return r;typeof r=="number"&&(r=Gc(r)),this.originalInput=r;let o=Yc(r);this.originalInput=r,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??o.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let r=this.toRgb();return (r.r*299+r.g*587+r.b*114)/1e3}getLuminance(){let r=this.toRgb(),e,o,i,s=r.r/255,n=r.g/255,a=r.b/255;return s<=.03928?e=s/12.92:e=Math.pow((s+.055)/1.055,2.4),n<=.03928?o=n/12.92:o=Math.pow((n+.055)/1.055,2.4),a<=.03928?i=a/12.92:i=Math.pow((a+.055)/1.055,2.4),.2126*e+.7152*o+.0722*i}getAlpha(){return this.a}setAlpha(r){return this.a=ws(r),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:r}=this.toHsl();return r===0}toHsv(){let r=Tn(this.r,this.g,this.b);return {h:r.h*360,s:r.s,v:r.v,a:this.a}}toHsvString(){let r=Tn(this.r,this.g,this.b),e=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.v*100);return this.a===1?`hsv(${e}, ${o}%, ${i}%)`:`hsva(${e}, ${o}%, ${i}%, ${this.roundA})`}toHsl(){let r=On(this.r,this.g,this.b);return {h:r.h*360,s:r.s,l:r.l,a:this.a}}toHslString(){let r=On(this.r,this.g,this.b),e=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.l*100);return this.a===1?`hsl(${e}, ${o}%, ${i}%)`:`hsla(${e}, ${o}%, ${i}%, ${this.roundA})`}toHex(r=false){return Rn(this.r,this.g,this.b,r)}toHexString(r=false){return "#"+this.toHex(r)}toHex8(r=false){return qc(this.r,this.g,this.b,this.a,r)}toHex8String(r=false){return "#"+this.toHex8(r)}toHexShortString(r=false){return this.a===1?this.toHexString(r):this.toHex8String(r)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let r=Math.round(this.r),e=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${r}, ${e}, ${o})`:`rgba(${r}, ${e}, ${o}, ${this.roundA})`}toPercentageRgb(){let r=e=>`${Math.round(vt(e,255)*100)}%`;return {r:r(this.r),g:r(this.g),b:r(this.b),a:this.a}}toPercentageRgbString(){let r=e=>Math.round(vt(e,255)*100);return this.a===1?`rgb(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%)`:`rgba(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%, ${this.roundA})`}toCmyk(){return {...In(this.r,this.g,this.b)}}toCmykString(){let{c:r,m:e,y:o,k:i}=In(this.r,this.g,this.b);return `cmyk(${r}, ${e}, ${o}, ${i})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let r="#"+Rn(this.r,this.g,this.b,false);for(let[e,o]of Object.entries(Go))if(r===o)return e;return  false}toString(r){let e=!!r;r=r??this.format;let o=false,i=this.a<1&&this.a>=0;return !e&&i&&(r.startsWith("hex")||r==="name")?r==="name"&&this.a===0?this.toName():this.toRgbString():(r==="rgb"&&(o=this.toRgbString()),r==="prgb"&&(o=this.toPercentageRgbString()),(r==="hex"||r==="hex6")&&(o=this.toHexString()),r==="hex3"&&(o=this.toHexString(true)),r==="hex4"&&(o=this.toHex8String(true)),r==="hex8"&&(o=this.toHex8String()),r==="name"&&(o=this.toName()),r==="hsl"&&(o=this.toHslString()),r==="hsv"&&(o=this.toHsvString()),r==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(r=10){let e=this.toHsl();return e.l+=r/100,e.l=qo(e.l),new t(e)}brighten(r=10){let e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(r/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(r/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(r/100)))),new t(e)}darken(r=10){let e=this.toHsl();return e.l-=r/100,e.l=qo(e.l),new t(e)}tint(r=10){return this.mix("white",r)}shade(r=10){return this.mix("black",r)}desaturate(r=10){let e=this.toHsl();return e.s-=r/100,e.s=qo(e.s),new t(e)}saturate(r=10){let e=this.toHsl();return e.s+=r/100,e.s=qo(e.s),new t(e)}greyscale(){return this.desaturate(100)}spin(r){let e=this.toHsl(),o=(e.h+r)%360;return e.h=o<0?360+o:o,new t(e)}mix(r,e=50){let o=this.toRgb(),i=new t(r).toRgb(),s=e/100,n={r:(i.r-o.r)*s+o.r,g:(i.g-o.g)*s+o.g,b:(i.b-o.b)*s+o.b,a:(i.a-o.a)*s+o.a};return new t(n)}analogous(r=6,e=30){let o=this.toHsl(),i=360/e,s=[this];for(o.h=(o.h-(i*r>>1)+720)%360;--r;)o.h=(o.h+i)%360,s.push(new t(o));return s}complement(){let r=this.toHsl();return r.h=(r.h+180)%360,new t(r)}monochromatic(r=6){let e=this.toHsv(),{h:o}=e,{s:i}=e,{v:s}=e,n=[],a=1/r;for(;r--;)n.push(new t({h:o,s:i,v:s})),s=(s+a)%1;return n}splitcomplement(){let r=this.toHsl(),{h:e}=r;return [this,new t({h:(e+72)%360,s:r.s,l:r.l}),new t({h:(e+216)%360,s:r.s,l:r.l})]}onBackground(r){let e=this.toRgb(),o=new t(r).toRgb(),i=e.a+o.a*(1-e.a);return new t({r:(e.r*e.a+o.r*o.a*(1-e.a))/i,g:(e.g*e.a+o.g*o.a*(1-e.a))/i,b:(e.b*e.a+o.b*o.a*(1-e.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(r){let e=this.toHsl(),{h:o}=e,i=[this],s=360/r;for(let n=1;n<r;n++)i.push(new t({h:(o+n*s)%360,s:e.s,l:e.l}));return i}equals(r){let e=new t(r);return this.format==="cmyk"||e.format==="cmyk"?this.toCmykString()===e.toCmykString():this.toRgbString()===e.toRgbString()}};var Xc="EyeDropper"in window,U=class extends P{constructor(){super(),this.formControlController=new yt(this),this.isSafeValue=false,this.localize=new H(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],r=(t.indexOf(this.format)+1)%t.length;this.format=t[r],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),e=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),Qr(r,{onMove:n=>{this.alpha=ft(n/o*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),e=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),Qr(r,{onMove:n=>{this.hue=ft(n/o*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let r=this.shadowRoot.querySelector(".color-picker__grid"),e=r.querySelector(".color-picker__grid-handle"),{width:o,height:i}=r.getBoundingClientRect(),s=this.value,n=this.value;e.focus(),t.preventDefault(),this.isDraggingGridHandle=true,Qr(r,{onMove:(a,l)=>{this.saturation=ft(a/o*100,0,100),this.brightness=ft(100-l/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let r=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=ft(this.alpha-r,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=ft(this.alpha+r,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let r=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=ft(this.hue-r,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=ft(this.hue+r,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let r=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=ft(this.saturation-r,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=ft(this.saturation+r,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=ft(this.brightness+r,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=ft(this.brightness-r,0,100),this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let r=t.target,e=this.value;t.stopPropagation(),this.input.value?(this.setColor(r.value),r.value=this.value):this.value="",this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let r=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let r=new Yo(t);if(!r.isValid)return null;let e=r.toHsl(),o={h:e.h,s:e.s*100,l:e.l*100,a:e.a},i=r.toRgb(),s=r.toHexString(),n=r.toHex8String(),a=r.toHsv(),l={h:a.h,s:a.s*100,v:a.v*100,a:a.a};return {hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let r=this.parseColor(t);return r===null?false:(this.hue=r.hsva.h,this.saturation=r.hsva.s,this.brightness=r.hsva.v,this.alpha=this.opacity?r.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!Xc)return;new EyeDropper().open().then(r=>{let e=this.value;this.setColor(r.sRGBHex),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let r=this.value;this.disabled||(this.setColor(t),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,r,e,o=100){let i=new Yo(`hsva(${t}, ${r}%, ${e}%, ${o/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,r){if(this.isEmpty=!r,r||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let e=this.parseColor(r);e!==null?(this.inputValue=this.value,this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=e.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let r=this.inline?this.base:this.trigger;this.hasFocus&&(r.focus({preventScroll:true}),r.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let r=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(r===null)return "";switch(t){case "hex":return r.hex;case "hexa":return r.hexa;case "rgb":return r.rgb.string;case "rgba":return r.rgba.string;case "hsl":return r.hsl.string;case "hsla":return r.hsla.string;case "hsv":return r.hsv.string;case "hsva":return r.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,r=100-this.brightness,e=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),o=f`
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
          style=${tt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${M({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${tt({top:`${r}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
                style=${tt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
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

            ${this.opacity?f`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${tt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${tt({left:`${this.alpha}%`})}
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
            style=${tt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            ${Xc?f`
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

        ${e.length>0?f`
              <div part="swatches" class="color-picker__swatches">
                ${e.map(i=>{let s=this.parseColor(i);return s?f`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${w(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${i}
                      @click=${()=>this.selectSwatch(i)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(s.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${tt({backgroundColor:s.hexa})}
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
          style=${tt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${o}
      </sl-dropdown>
    `}};U.styles=[L,Bc];U.dependencies={"sl-button-group":Fe,"sl-button":Y,"sl-dropdown":bt,"sl-icon":q,"sl-input":F,"sl-visually-hidden":$n};p([E('[part~="base"]')],U.prototype,"base",2);p([E('[part~="input"]')],U.prototype,"input",2);p([E(".color-dropdown")],U.prototype,"dropdown",2);p([E('[part~="preview"]')],U.prototype,"previewButton",2);p([E('[part~="trigger"]')],U.prototype,"trigger",2);p([$()],U.prototype,"hasFocus",2);p([$()],U.prototype,"isDraggingGridHandle",2);p([$()],U.prototype,"isEmpty",2);p([$()],U.prototype,"inputValue",2);p([$()],U.prototype,"hue",2);p([$()],U.prototype,"saturation",2);p([$()],U.prototype,"brightness",2);p([$()],U.prototype,"alpha",2);p([h()],U.prototype,"value",2);p([Kt()],U.prototype,"defaultValue",2);p([h()],U.prototype,"label",2);p([h()],U.prototype,"format",2);p([h({type:Boolean,reflect:true})],U.prototype,"inline",2);p([h({reflect:true})],U.prototype,"size",2);p([h({attribute:"no-format-toggle",type:Boolean})],U.prototype,"noFormatToggle",2);p([h()],U.prototype,"name",2);p([h({type:Boolean,reflect:true})],U.prototype,"disabled",2);p([h({type:Boolean})],U.prototype,"hoist",2);p([h({type:Boolean})],U.prototype,"opacity",2);p([h({type:Boolean})],U.prototype,"uppercase",2);p([h()],U.prototype,"swatches",2);p([h({reflect:true})],U.prototype,"form",2);p([h({type:Boolean,reflect:true})],U.prototype,"required",2);p([Pe({passive:false})],U.prototype,"handleTouchMove",1);p([O("format",{waitUntilFirstUpdate:true})],U.prototype,"handleFormatChange",1);p([O("opacity",{waitUntilFirstUpdate:true})],U.prototype,"handleOpacityChange",1);p([O("value")],U.prototype,"handleValueChange",1);U.define("sl-color-picker");var zh=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class Xo extends I{getInitialOptions(){return {format:"hex",opacity:false,inline:false,swatches:zh}}renderInput(){return f`
            ${this._renderColors()}
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
        `}_onClickPresetColor(r){this.input.value=r.target.dataset.color,this.onFieldInput();}_renderColors(){if(this.options.presets)return f`${rt(this.options.presets,r=>f`<span
                data-color="${r}"
                    @click=${this._onClickPresetColor}
                    class="preset-color${this.value===r?" selected":""}" style="background-color:${r};"></span>`)}`}renderView(){return f`<span><span class="color"   style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[I.styles,x`
            sl-color-picker::part(trigger) {
                border-radius: 4px;
            }
            .value{
                display:flex;
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
                border: 3px solid #ffffff;
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
        `],exports.AutoFieldColorPicker=y([R("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class Jo extends I{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((e,o)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{id:e,label:e,value:e}),i.icon&&(this.isShowIcon=true),i.$index=o,i}),this.selection=this.value;}renderInput(){return f`
            <div class="items">
                ${this.items.map(e=>this.renderCheckItemWithCard(this.renderCheckboxItem(e),e))}
            </div>
        `}renderCheckboxItem(e){return f`
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
        `}_onCheckChange(e){let o=e.target.closest(".card")||e.target,i=Number(o.dataset.index),s=o.checked??!o.classList.contains("selected"),n=this.items[i];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let a=this.selection.findIndex(l=>l===n[this.valueKey]);a>-1&&this.selection.splice(a,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(e,o){if(this.options.card){let i=this.selection.includes(o[this.valueKey]);return f`<div
                class="card ${i?"selected":""}"
                data-index="${o.$index}"
                style=${tt({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">${B(this.isShowIcon,()=>f`<sl-icon class="icon" name="${o.icon||""}"></sl-icon>`)} ${e}</div>
            </div>`}else return e}};exports.AutoFieldCheckboxGroup.styles=[I.styles,x`
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
                        background: color-mix(in srgb, var(--t-color-primary-5) 20%, transparent);
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
        `],exports.AutoFieldCheckboxGroup=y([R("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class Zo extends I{constructor(){super(...arguments);this.parts=[];}getInitialOptions(){return {template:"0000",delimiter:"",caseType:"both",includeDelimiter:true,onlyNumber:false}}_isValidChar(e){return this.options.chars?new RegExp(this.options.chars).test(e):true}_onKeyDown(e){let o=e.key;o.length===1&&(this._isValidChar(o)||e.preventDefault(),e.stopPropagation());}_onPartInput(e){let i=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,a)=>(n+=a.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),s=0;this.parts.forEach((n,a)=>{this.options.delimiter.includes(n)||(this.parts[a]=i[s++]);}),this.onFieldChange(),this._isLastInput(e);}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((e,o)=>this.options.delimiter.includes(o)?e:`${e}${o}`,"")}_isLastInput(e){let o=e.target;if(o.value.length>=1){o.blur();let i=o.nextElementSibling||o.nextElementSibling?.nextElementSibling;i&&(i.focus(),i.select());}}_onPaste(e){e.preventDefault();let o=e.clipboardData?.getData("text/plain")||"",i=this._parseParts(o),s=a=>{if(a){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let a of i)if(!this.options.delimiter.includes(a)&&(n.value=a,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value);}_parseParts(e){let o=this.options.delimiter,i=this.options.template,s=0;return Array.from(i).map(n=>{if(o.includes(n))return e[s]===n&&s++,n;{let a=e[s++]||n;return this.options.caseType==="upper"?a.toUpperCase():this.options.caseType==="lower"?a.toLowerCase():a}})}_onPartFocus(e){e.target.select();}renderPart(e){return f`<sl-input
            maxLength="1"
            .value=${e}
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
                ${rt(this.parts,e=>this.options.delimiter.includes(e)?f`${e}`:this.renderPart(e))}
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
                background-color: var(--t-color-theme--1);
            }
        `],exports.AutoFieldParts=y([R("auto-field-parts")],exports.AutoFieldParts);var Jc=x`
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
`;var Cs=class extends P{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let r=["menuitem","menuitemcheckbox"],e=t.composedPath(),o=e.find(a=>{var l;return r.includes(((l=a?.getAttribute)==null?void 0:l.call(a,"role"))||"")});if(!o||e.find(a=>{var l;return ((l=a?.getAttribute)==null?void 0:l.call(a,"role"))==="menu"})!==this)return;let n=o;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let r=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),r?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let r=this.getAllItems(),e=this.getCurrentItem(),o=e?r.indexOf(e):0;r.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?o++:t.key==="ArrowUp"?o--:t.key==="Home"?o=0:t.key==="End"&&(o=r.length-1),o<0&&(o=r.length-1),o>r.length-1&&(o=0),this.setCurrentItem(r[o]),r[o].focus());}}handleMouseDown(t){let r=t.target;this.isMenuItem(r)&&this.setCurrentItem(r);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var r;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((r=t.getAttribute("role"))!=null?r:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1");});}render(){return f`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Cs.styles=[L,Jc];p([E("slot")],Cs.prototype,"defaultSlot",2);Cs.define("sl-menu");var Zc=x`
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
`;var Qo=(t,r)=>{let e=t._$AN;if(e===void 0)return  false;for(let o of e)o._$AO?.(r,false),Qo(o,r);return  true},ks=t=>{let r,e;do{if((r=t._$AM)===void 0)break;e=r._$AN,e.delete(t),t=r;}while(e?.size===0)},Qc=t=>{for(let r;r=t._$AM;t=r){let e=r._$AN;if(e===void 0)r._$AN=e=new Set;else if(e.has(t))break;e.add(t),Fh(r);}};function Vh(t){this._$AN!==void 0?(ks(this),this._$AM=t,Qc(this)):this._$AM=t;}function Dh(t,r=false,e=0){let o=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(r)if(Array.isArray(o))for(let s=e;s<o.length;s++)Qo(o[s],false),ks(o[s]);else o!=null&&(Qo(o,false),ks(o));else Qo(this,t);}var Fh=t=>{t.type==St.CHILD&&(t._$AP??=Dh,t._$AQ??=Vh);},As=class extends Lt{constructor(){super(...arguments),this._$AN=void 0;}_$AT(r,e,o){super._$AT(r,e,o),Qc(this),this.isConnected=r._$AU;}_$AO(r,e=true){r!==this.isConnected&&(this.isConnected=r,r?this.reconnected?.():this.disconnected?.()),e&&(Qo(this,r),ks(this));}setValue(r){if(_i(this._$Ct))this._$Ct._$AI(r,this);else {let e=[...this._$Ct._$AH];e[this._$Ci]=r,this._$Ct._$AI(e,this,0);}}disconnected(){}reconnected(){}};var tp=()=>new zn,zn=class{},Ln=new WeakMap,ep=Nt(class extends As{render(t){return X}update(t,[r]){let e=r!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=r,this.ht=t.options?.host,this.rt(this.ct=t.element)),X}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let r=this.ht??globalThis,e=Ln.get(r);e===void 0&&(e=new WeakMap,Ln.set(r,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?Ln.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var rp=class{constructor(t,r){this.popupRef=tp(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=e=>{switch(e.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(e);break;}},this.handleClick=e=>{var o;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&(e.target.tagName==="sl-menu-item"||(o=e.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=e=>{e.stopPropagation();},this.handlePopupReposition=()=>{let e=this.host.renderRoot.querySelector("slot[name='submenu']"),o=e?.assignedElements({flatten:true}).filter(c=>c.localName==="sl-menu")[0],i=getComputedStyle(this.host).direction==="rtl";if(!o)return;let{left:s,top:n,width:a,height:l}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${i?s+a:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${i?s+a:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`);},(this.host=t).addController(this),this.hasSlotController=r;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let r=this.host.renderRoot.querySelector("slot[name='submenu']");if(!r){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let e=null;for(let o of r.assignedElements())if(e=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),e.length!==0)break;if(!(!e||e.length===0)){e[0].setAttribute("tabindex","0");for(let o=1;o!==e.length;++o)e[o].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?e[0]instanceof HTMLElement&&e[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{e[0]instanceof HTMLElement&&e[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let r=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((i,s)=>{var n;let a=(n=r.get(s))!=null?n:new CSSUnitValue(0,"px"),c=(a instanceof CSSUnitValue?a:new CSSUnitValue(0,"px")).to("px");return i-c.value},0);this.skidding=o;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?f`
      <sl-popup
        ${ep(this.popupRef)}
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
    `:f` <slot name="submenu" hidden></slot> `}};var jt=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new ht(this,"submenu"),this.submenuController=new rp(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return Ga(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",r=this.submenuController.isExpanded();return f`
      <div
        id="anchor"
        part="base"
        class=${M({"menu-item":true,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":r})}
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
          <sl-icon name=${t?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?f` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};jt.styles=[L,Zc];jt.dependencies={"sl-icon":q,"sl-popup":J,"sl-spinner":Te};p([E("slot:not([name])")],jt.prototype,"defaultSlot",2);p([E(".menu-item")],jt.prototype,"menuItem",2);p([h()],jt.prototype,"type",2);p([h({type:Boolean,reflect:true})],jt.prototype,"checked",2);p([h()],jt.prototype,"value",2);p([h({type:Boolean,reflect:true})],jt.prototype,"loading",2);p([h({type:Boolean,reflect:true})],jt.prototype,"disabled",2);p([O("checked")],jt.prototype,"handleCheckedChange",1);p([O("disabled")],jt.prototype,"handleDisabledChange",1);p([O("type")],jt.prototype,"handleTypeChange",1);jt.define("sl-menu-item");var op=x`
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
`;var Vn=()=>null,Bt=class extends P{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new H(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=Vn,this.snapThreshold=12;}toSnapFunction(t){let r=t.split(" ");return ({pos:e,size:o,snapThreshold:i,isRtl:s,vertical:n})=>{let a=e,l=Number.POSITIVE_INFINITY;return r.forEach(c=>{let d;if(c.startsWith("repeat(")){let m=t.substring(7,t.length-1),g=m.endsWith("%"),b=Number.parseFloat(m),v=g?o*(b/100):b;d=Math.round((s&&!n?o-e:e)/v)*v;}else c.endsWith("%")?d=o*(Number.parseFloat(c)/100):d=Number.parseFloat(c);s&&!n&&(d=o-d);let u=Math.abs(e-d);u<=i&&u<l&&(a=d,l=u);}),a}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=Vn;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:r}=this.getBoundingClientRect();this.size=this.vertical?r:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let r=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),Qr(this,{onMove:(e,o)=>{var i;let s=this.vertical?o:e;this.primary==="end"&&(s=this.size-s),s=(i=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:r,vertical:this.vertical}))!=null?i:s,this.position=ft(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let r=this.position,e=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(r-=e),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(r+=e),t.key==="Home"&&(r=this.primary==="end"?100:0),t.key==="End"&&(r=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)r=this.positionBeforeCollapsing,this.isCollapsed=false;else {let o=this.position;r=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=o;});}this.position=ft(r,0,100);}}handleResize(t){let{width:r,height:e}=t[0].contentRect;this.size=this.vertical?e:r,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",r=this.vertical?"gridTemplateColumns":"gridTemplateRows",e=this.localize.dir()==="rtl",o=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i="auto";return this.primary==="end"?e&&!this.vertical?this.style[t]=`${o} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${o}`:e&&!this.vertical?this.style[t]=`${i} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${i}`,this.style[r]="",f`
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
    `}};Bt.styles=[L,op];p([E(".divider")],Bt.prototype,"divider",2);p([h({type:Number,reflect:true})],Bt.prototype,"position",2);p([h({attribute:"position-in-pixels",type:Number})],Bt.prototype,"positionInPixels",2);p([h({type:Boolean,reflect:true})],Bt.prototype,"vertical",2);p([h({type:Boolean,reflect:true})],Bt.prototype,"disabled",2);p([h()],Bt.prototype,"primary",2);p([h({reflect:true})],Bt.prototype,"snap",1);p([h({type:Number,attribute:"snap-threshold"})],Bt.prototype,"snapThreshold",2);p([O("position")],Bt.prototype,"handlePositionChange",1);p([O("positionInPixels")],Bt.prototype,"handlePositionInPixelsChange",1);p([O("vertical")],Bt.prototype,"handleVerticalChange",1);Bt.define("sl-split-panel");me.define("sl-tag");var Ye=x`
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
`;exports.AutoFieldList=class br extends I{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.scrollbar=new nr(this);this.scrollbars=[];this.items=new qe(this,"select",e=>e?(e.forEach(o=>{this.isItemSelected(o)&&this.selection.push(o[this.options.valueKey]);}),e):[]);this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu,.results")?.forEach(o=>{this.scrollbars.push(this.scrollbar.create(o,{width:"5px"}));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}connectedCallback(){super.connectedCallback(),this.options&&this.setPresetActions(),this.style.height="auto";}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}_addSecectItem(e){this.selection.findIndex(i=>i[this.options.valueKey]===e[this.options.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(e[this.options.valueKey]));}_removeSelectItem(e){for(let o=this.selection.length-1;o>=0;o--)this.selection[o]===e&&this.selection.splice(o,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(e){let o=e.detail.item,i=o.dataset.index,s=this.items.value[i];s&&(o.checked?this._addSecectItem(s):this._removeSelectItem(s[this.options.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.value.length}`,this.onFieldChange());}_renderWithSplitPanel(e){return this.options.showResults&&this.options.multiple?f`<sl-split-panel 
            style="height:${this.options.height||"15em"}"
            position="60"> ${e} ${this.renderResults()} </sl-split-panel>`:e}_renderItem(e){let o=this.options.renderItem;return typeof o=="string"?f`${zt(o.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof o=="function"?f`${zt(o(e))}`:e.label}_onClickPresetAction(e){e==="all"?this.selection=this.items.value.map(o=>o[this.options.valueKey]):e==="reverse"?this.selection=this.items.value.filter(o=>!this.selection.includes(o[this.options.valueKey])).map(o=>o[this.options.valueKey]):e==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let e=[];this.options.multiple&&e.push({id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")});let o=i=>{for(let s=e.length-1;s>=0;s--)if(e[s].id===i.id){let n=i.onClick;i.onClick=()=>{e[s].onClick(),n&&n.call(this,this.getInputValue());},e.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(i=>{o(i);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(i=>{o(i);}),e.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...e));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(e){let o=this.options.labelKey;if(o){if(o in e)return e[o]}else return e.label}renderResults(){return f`<div
            slot="end"
            class="results mark-err scrollbar"
            no-padding
            style="${tt({maxHeight:this.options.height})}"
        >
            ${rt(this.selection,e=>{let o=this.items.value.filter(s=>s[this.options.valueKey]===e)[0];if(!o)return;let i=o&&o.label||e;return f`<div class="item" title="${o.value}">
                    <span>${i}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(o)}></sl-icon-button>
                </div>`})}
        </div>`}_renderList(){let e=Array.isArray(this.value)?this.value:[this.value];return f`${this._renderWithSplitPanel(f` <sl-menu
            slot="start"
            class="scrollbar mark-err ${M({multiple:this.options.multiple})}"
            style=${tt({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}
        >
            ${rt(this.items.value,(o,i)=>{let s=e.includes(o[this.options.valueKey]);return f`<sl-menu-item type="checkbox" 
                    data-index=${String(i)} .checked=${s}>
                    ${B(o.icon,()=>f`<sl-icon slot="prefix" name="${o.icon}"></sl-icon>`)}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(o)} </auto-flex>
                </sl-menu-item>`})}
        </sl-menu>`)} `}_renderHeader(){return f`${B(this.beforeActions.length>0,()=>f`<div class="header">${this.renderBeforeActions()}</div>`)}`}_renderFooter(){if(!(!this.options.multiple&&this.afterActions.length===0))return f`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.items.value.length} </span>
        </div>`}renderInput(){return f`
            ${B(this.items.loading,()=>f`<auto-loading></auto-loading>`,()=>f`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`)}
            
        `}};exports.AutoFieldList.styles=[I.styles,x`
            ${Ye}
            sl-menu-item[checked] {
                background-color: color-mix(in srgb, var(--auto-theme-color) 10%, transparent);
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
            sl-menu.multiple {
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
                border-radius: var(--auto-border-radius);
            }
            .results   {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                padding: calc(0.5 * var(--auto-padding));
                box-sizing: border-box;
                overflow-x: hidden;
                gap: 0.2rem;
                font-size: var(--auto-font-size);
                & > .item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-radius: var(--auto-border-radius);
                    padding: calc(0.2 * var(--auto-padding));
                    border: var(--auto-border);  
                    &:hover {
                        background-color: color-mix(in srgb, var(--auto-theme-color) 20%, transparent);
                    }
                    & > :first-child {
                        flex-grow: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        `],y([$()],exports.AutoFieldList.prototype,"selectedTips",2),y([E("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=y([R("auto-field-list")],exports.AutoFieldList);var ip=x`
  :host {
    display: inline-block;
  }
`;var sp=null,$s=class{};$s.render=function(t,r){sp(t,r);};self.QrCreator=$s;(function(t){function r(a,l,c,d){var u={},m=t(c,l);m.u(a),m.J(),d=d||0;var g=m.h(),b=m.h()+2*d;return u.text=a,u.level=l,u.version=c,u.O=b,u.a=function(v,k){return v-=d,k-=d,0>v||v>=g||0>k||k>=g?false:m.a(v,k)},u}function e(a,l,c,d,u,m,g,b,v,k){function C(S,T,_,A,V,j,W){S?(a.lineTo(T+j,_+W),a.arcTo(T,_,A,V,m)):a.lineTo(T,_);}g?a.moveTo(l+m,c):a.moveTo(l,c),C(b,d,c,d,u,-m,0),C(v,d,u,l,u,0,-m),C(k,l,u,l,c,m,0),C(g,l,c,d,c,0,m);}function o(a,l,c,d,u,m,g,b,v,k){function C(S,T,_,A){a.moveTo(S+_,T),a.lineTo(S,T),a.lineTo(S,T+A),a.arcTo(S,T,S+_,T,m);}g&&C(l,c,m,m),b&&C(d,c,-m,m),v&&C(d,u,-m,-m),k&&C(l,u,m,-m);}function i(a,l){var c=l.fill;if(typeof c=="string")a.fillStyle=c;else {var d=c.type,u=c.colorStops;if(c=c.position.map(g=>Math.round(g*l.size)),d==="linear-gradient")var m=a.createLinearGradient.apply(a,c);else if(d==="radial-gradient")m=a.createRadialGradient.apply(a,c);else throw Error("Unsupported fill");u.forEach(([g,b])=>{m.addColorStop(g,b);}),a.fillStyle=m;}}function s(a,l){t:{var c=l.text,d=l.v,u=l.N,m=l.K,g=l.P;for(u=Math.max(1,u||1),m=Math.min(40,m||40);u<=m;u+=1)try{var b=r(c,d,u,g);break t}catch{}b=void 0;}if(!b)return null;for(c=a.getContext("2d"),l.background&&(c.fillStyle=l.background,c.fillRect(l.left,l.top,l.size,l.size)),d=b.O,m=l.size/d,c.beginPath(),g=0;g<d;g+=1)for(u=0;u<d;u+=1){var v=c,k=l.left+u*m,C=l.top+g*m,S=g,T=u,_=b.a,A=k+m,V=C+m,j=S-1,W=S+1,D=T-1,z=T+1,mt=Math.floor(Math.min(.5,Math.max(0,l.R))*m),lt=_(S,T),At=_(j,D),ct=_(j,T);j=_(j,z);var qt=_(S,z);z=_(W,z),T=_(W,T),W=_(W,D),S=_(S,D),k=Math.round(k),C=Math.round(C),A=Math.round(A),V=Math.round(V),lt?e(v,k,C,A,V,mt,!ct&&!S,!ct&&!qt,!T&&!qt,!T&&!S):o(v,k,C,A,V,mt,ct&&S&&At,ct&&qt&&j,T&&qt&&z,T&&S&&W);}return i(c,l),c.fill(),a}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};sp=function(a,l){var c={};Object.assign(c,n,a),c.N=c.minVersion,c.K=c.maxVersion,c.v=c.ecLevel,c.left=c.left,c.top=c.top,c.size=c.size,c.fill=c.fill,c.background=c.background,c.text=c.text,c.R=c.radius,c.P=c.quiet,l instanceof HTMLCanvasElement?((l.width!==c.size||l.height!==c.size)&&(l.width=c.size,l.height=c.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,c)):(a=document.createElement("canvas"),a.width=c.size,a.height=c.size,c=s(a,c),l.appendChild(c));};})((function(){function t(l){var c=e.s(l);return {S:function(){return 4},b:function(){return c.length},write:function(d){for(var u=0;u<c.length;u+=1)d.put(c[u],8);}}}function r(){var l=[],c=0,d={B:function(){return l},c:function(u){return (l[Math.floor(u/8)]>>>7-u%8&1)==1},put:function(u,m){for(var g=0;g<m;g+=1)d.m((u>>>m-g-1&1)==1);},f:function(){return c},m:function(u){var m=Math.floor(c/8);l.length<=m&&l.push(0),u&&(l[m]|=128>>>c%8),c+=1;}};return d}function e(l,c){function d(S,T){for(var _=-1;7>=_;_+=1)if(!(-1>=S+_||b<=S+_))for(var A=-1;7>=A;A+=1) -1>=T+A||b<=T+A||(g[S+_][T+A]=0<=_&&6>=_&&(A==0||A==6)||0<=A&&6>=A&&(_==0||_==6)||2<=_&&4>=_&&2<=A&&4>=A);}function u(S,T){for(var _=b=4*l+17,A=Array(_),V=0;V<_;V+=1){A[V]=Array(_);for(var j=0;j<_;j+=1)A[V][j]=null;}for(g=A,d(0,0),d(b-7,0),d(0,b-7),_=s.G(l),A=0;A<_.length;A+=1)for(V=0;V<_.length;V+=1){j=_[A];var W=_[V];if(g[j][W]==null)for(var D=-2;2>=D;D+=1)for(var z=-2;2>=z;z+=1)g[j+D][W+z]=D==-2||D==2||z==-2||z==2||D==0&&z==0;}for(_=8;_<b-8;_+=1)g[_][6]==null&&(g[_][6]=_%2==0);for(_=8;_<b-8;_+=1)g[6][_]==null&&(g[6][_]=_%2==0);for(_=s.w(m<<3|T),A=0;15>A;A+=1)V=!S&&(_>>A&1)==1,g[6>A?A:8>A?A+1:b-15+A][8]=V,g[8][8>A?b-A-1:9>A?15-A:14-A]=V;if(g[b-8][8]=!S,7<=l){for(_=s.A(l),A=0;18>A;A+=1)V=!S&&(_>>A&1)==1,g[Math.floor(A/3)][A%3+b-8-3]=V;for(A=0;18>A;A+=1)V=!S&&(_>>A&1)==1,g[A%3+b-8-3][Math.floor(A/3)]=V;}if(v==null){for(S=a.I(l,m),_=r(),A=0;A<k.length;A+=1)V=k[A],_.put(4,4),_.put(V.b(),s.f(4,l)),V.write(_);for(A=V=0;A<S.length;A+=1)V+=S[A].j;if(_.f()>8*V)throw Error("code length overflow. ("+_.f()+">"+8*V+")");for(_.f()+4<=8*V&&_.put(0,4);_.f()%8!=0;)_.m(false);for(;!(_.f()>=8*V)&&(_.put(236,8),!(_.f()>=8*V));)_.put(17,8);var mt=0;for(V=A=0,j=Array(S.length),W=Array(S.length),D=0;D<S.length;D+=1){var lt=S[D].j,At=S[D].o-lt;for(A=Math.max(A,lt),V=Math.max(V,At),j[D]=Array(lt),z=0;z<j[D].length;z+=1)j[D][z]=255&_.B()[z+mt];for(mt+=lt,z=s.C(At),lt=o(j[D],z.b()-1).l(z),W[D]=Array(z.b()-1),z=0;z<W[D].length;z+=1)At=z+lt.b()-W[D].length,W[D][z]=0<=At?lt.c(At):0;}for(z=_=0;z<S.length;z+=1)_+=S[z].o;for(_=Array(_),z=mt=0;z<A;z+=1)for(D=0;D<S.length;D+=1)z<j[D].length&&(_[mt]=j[D][z],mt+=1);for(z=0;z<V;z+=1)for(D=0;D<S.length;D+=1)z<W[D].length&&(_[mt]=W[D][z],mt+=1);v=_;}for(S=v,_=-1,A=b-1,V=7,j=0,T=s.F(T),W=b-1;0<W;W-=2)for(W==6&&--W;;){for(D=0;2>D;D+=1)g[A][W-D]==null&&(z=false,j<S.length&&(z=(S[j]>>>V&1)==1),T(A,W-D)&&(z=!z),g[A][W-D]=z,--V,V==-1&&(j+=1,V=7));if(A+=_,0>A||b<=A){A-=_,_=-_;break}}}var m=i[c],g=null,b=0,v=null,k=[],C={u:function(S){S=t(S),k.push(S),v=null;},a:function(S,T){if(0>S||b<=S||0>T||b<=T)throw Error(S+","+T);return g[S][T]},h:function(){return b},J:function(){for(var S=0,T=0,_=0;8>_;_+=1){u(true,_);var A=s.D(C);(_==0||S>A)&&(S=A,T=_);}u(false,T);}};return C}function o(l,c){if(typeof l.length>"u")throw Error(l.length+"/"+c);var d=(function(){for(var m=0;m<l.length&&l[m]==0;)m+=1;for(var g=Array(l.length-m+c),b=0;b<l.length-m;b+=1)g[b]=l[b+m];return g})(),u={c:function(m){return d[m]},b:function(){return d.length},multiply:function(m){for(var g=Array(u.b()+m.b()-1),b=0;b<u.b();b+=1)for(var v=0;v<m.b();v+=1)g[b+v]^=n.i(n.g(u.c(b))+n.g(m.c(v)));return o(g,0)},l:function(m){if(0>u.b()-m.b())return u;for(var g=n.g(u.c(0))-n.g(m.c(0)),b=Array(u.b()),v=0;v<u.b();v+=1)b[v]=u.c(v);for(v=0;v<m.b();v+=1)b[v]^=n.i(n.g(m.c(v))+g);return o(b,0).l(m)}};return u}e.s=function(l){for(var c=[],d=0;d<l.length;d++){var u=l.charCodeAt(d);128>u?c.push(u):2048>u?c.push(192|u>>6,128|u&63):55296>u||57344<=u?c.push(224|u>>12,128|u>>6&63,128|u&63):(d++,u=65536+((u&1023)<<10|l.charCodeAt(d)&1023),c.push(240|u>>18,128|u>>12&63,128|u>>6&63,128|u&63));}return c};var i={L:1,M:0,Q:3,H:2},s=(function(){function l(u){for(var m=0;u!=0;)m+=1,u>>>=1;return m}var c=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],d={w:function(u){for(var m=u<<10;0<=l(m)-l(1335);)m^=1335<<l(m)-l(1335);return (u<<10|m)^21522},A:function(u){for(var m=u<<12;0<=l(m)-l(7973);)m^=7973<<l(m)-l(7973);return u<<12|m},G:function(u){return c[u-1]},F:function(u){switch(u){case 0:return function(m,g){return (m+g)%2==0};case 1:return function(m){return m%2==0};case 2:return function(m,g){return g%3==0};case 3:return function(m,g){return (m+g)%3==0};case 4:return function(m,g){return (Math.floor(m/2)+Math.floor(g/3))%2==0};case 5:return function(m,g){return m*g%2+m*g%3==0};case 6:return function(m,g){return (m*g%2+m*g%3)%2==0};case 7:return function(m,g){return (m*g%3+(m+g)%2)%2==0};default:throw Error("bad maskPattern:"+u)}},C:function(u){for(var m=o([1],0),g=0;g<u;g+=1)m=m.multiply(o([1,n.i(g)],0));return m},f:function(u,m){if(u!=4||1>m||40<m)throw Error("mode: "+u+"; type: "+m);return 10>m?8:16},D:function(u){for(var m=u.h(),g=0,b=0;b<m;b+=1)for(var v=0;v<m;v+=1){for(var k=0,C=u.a(b,v),S=-1;1>=S;S+=1)if(!(0>b+S||m<=b+S))for(var T=-1;1>=T;T+=1)0>v+T||m<=v+T||(S!=0||T!=0)&&C==u.a(b+S,v+T)&&(k+=1);5<k&&(g+=3+k-5);}for(b=0;b<m-1;b+=1)for(v=0;v<m-1;v+=1)k=0,u.a(b,v)&&(k+=1),u.a(b+1,v)&&(k+=1),u.a(b,v+1)&&(k+=1),u.a(b+1,v+1)&&(k+=1),(k==0||k==4)&&(g+=3);for(b=0;b<m;b+=1)for(v=0;v<m-6;v+=1)u.a(b,v)&&!u.a(b,v+1)&&u.a(b,v+2)&&u.a(b,v+3)&&u.a(b,v+4)&&!u.a(b,v+5)&&u.a(b,v+6)&&(g+=40);for(v=0;v<m;v+=1)for(b=0;b<m-6;b+=1)u.a(b,v)&&!u.a(b+1,v)&&u.a(b+2,v)&&u.a(b+3,v)&&u.a(b+4,v)&&!u.a(b+5,v)&&u.a(b+6,v)&&(g+=40);for(v=k=0;v<m;v+=1)for(b=0;b<m;b+=1)u.a(b,v)&&(k+=1);return g+=Math.abs(100*k/m/m-50)/5*10}};return d})(),n=(function(){for(var l=Array(256),c=Array(256),d=0;8>d;d+=1)l[d]=1<<d;for(d=8;256>d;d+=1)l[d]=l[d-4]^l[d-5]^l[d-6]^l[d-8];for(d=0;255>d;d+=1)c[l[d]]=d;return {g:function(u){if(1>u)throw Error("glog("+u+")");return c[u]},i:function(u){for(;0>u;)u+=255;for(;256<=u;)u-=255;return l[u]}}})(),a=(function(){function l(u,m){switch(m){case i.L:return c[4*(u-1)];case i.M:return c[4*(u-1)+1];case i.Q:return c[4*(u-1)+2];case i.H:return c[4*(u-1)+3]}}var c=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],d={I:function(u,m){var g=l(u,m);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+u+"/errorCorrectLevel:"+m);u=g.length/3,m=[];for(var b=0;b<u;b+=1)for(var v=g[3*b],k=g[3*b+1],C=g[3*b+2],S=0;S<v;S+=1){var T=C,_={};_.o=k,_.j=T,m.push(_);}return m}};return d})();return e})());var np=QrCreator;var oe=class extends P{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&np.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return f`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${tt({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};oe.styles=[L,ip];p([E("canvas")],oe.prototype,"canvas",2);p([h()],oe.prototype,"value",2);p([h()],oe.prototype,"label",2);p([h({type:Number})],oe.prototype,"size",2);p([h()],oe.prototype,"fill",2);p([h()],oe.prototype,"background",2);p([h({type:Number})],oe.prototype,"radius",2);p([h({attribute:"error-correction"})],oe.prototype,"errorCorrection",2);p([O(["background","errorCorrection","fill","radius","size","value"])],oe.prototype,"generate",1);oe.define("sl-qr-code");exports.AutoFieldQRCode=class Es extends I{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return f`
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
        `}};exports.AutoFieldQRCode=y([R("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class vr extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let e=this.options.url,[o,i]=e.split("?"),s=new URLSearchParams(i);return s.set("t",Date.now().toString()),`${o}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return f`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,x`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
        `],y([E("img")],exports.AutoFieldCaptcha.prototype,"img",2),y([$()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=y([R("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class yr extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let e=this.stepCount,o=()=>{let i=Math.ceil(e*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",i.toString()),this.requestUpdate()),e--,e<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(o,this.step);};o();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let e=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(e)?Number(e[0]):Number(e),this.step=Array.isArray(e)?Number(e[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles],y([$()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),y([$()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=y([R("auto-field-verifycode")],exports.AutoFieldVerifyCode);var ap=x`
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
`;var nt=class Dn extends P{constructor(){super(...arguments),this.localize=new H(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(r){return r instanceof Element&&r.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await te(this.childrenContainer);let{keyframes:r,options:e}=Zt(this,"tree-item.collapse",{dir:this.localize.dir()});await Qt(this.childrenContainer,Hr(r,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let r=this.parentElement;return !!r&&Dn.isTreeItem(r)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(r){r.has("selected")&&!r.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await te(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:r,options:e}=Zt(this,"tree-item.expand",{dir:this.localize.dir()});await Qt(this.childrenContainer,Hr(r,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:r=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(e=>Dn.isTreeItem(e)&&(r||!e.disabled)):[]}render(){let r=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return f`
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
            ${B(this.loading,()=>f` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${B(this.selectable,()=>f`
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
    `}};nt.styles=[L,ap];nt.dependencies={"sl-checkbox":at,"sl-icon":q,"sl-spinner":Te};p([$()],nt.prototype,"indeterminate",2);p([$()],nt.prototype,"isLeaf",2);p([$()],nt.prototype,"loading",2);p([$()],nt.prototype,"selectable",2);p([h({type:Boolean,reflect:true})],nt.prototype,"expanded",2);p([h({type:Boolean,reflect:true})],nt.prototype,"selected",2);p([h({type:Boolean,reflect:true})],nt.prototype,"disabled",2);p([h({type:Boolean,reflect:true})],nt.prototype,"lazy",2);p([E("slot:not([name])")],nt.prototype,"defaultSlot",2);p([E("slot[name=children]")],nt.prototype,"childrenSlot",2);p([E(".tree-item__item")],nt.prototype,"itemElement",2);p([E(".tree-item__children")],nt.prototype,"childrenContainer",2);p([E(".tree-item__expand-button slot")],nt.prototype,"expandButtonSlot",2);p([O("loading",{waitUntilFirstUpdate:true})],nt.prototype,"handleLoadingChange",1);p([O("disabled")],nt.prototype,"handleDisabledChange",1);p([O("selected")],nt.prototype,"handleSelectedChange",1);p([O("expanded",{waitUntilFirstUpdate:true})],nt.prototype,"handleExpandedChange",1);p([O("expanded",{waitUntilFirstUpdate:true})],nt.prototype,"handleExpandAnimation",1);p([O("lazy",{waitUntilFirstUpdate:true})],nt.prototype,"handleLazyChange",1);var xr=nt;Jt("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Jt("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var lp=x`
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
`;function cp(t,r=false){function e(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let a=n.every(c=>c.selected),l=n.every(c=>!c.selected&&!c.indeterminate);s.selected=a,s.indeterminate=!a&&!l;}}function o(s){let n=s.parentElement;xr.isTreeItem(n)&&(e(n),o(n));}function i(s){for(let n of s.getChildrenItems())n.selected=r?s.selected||n.selected:!n.disabled&&s.selected,i(n);r&&e(s);}i(t),o(t);}var Xe=class extends P{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new H(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(r=>!!this.querySelector(`[slot="${r}-icon"]`)).forEach(r=>{let e=t.querySelector(`[slot="${r}-icon"]`),o=this.getExpandButtonIcon(r);o&&(e===null?t.append(o):e.hasAttribute("data-default")&&e.replaceWith(o));});},this.handleTreeChanged=t=>{for(let r of t){let e=[...r.addedNodes].filter(xr.isTreeItem),o=[...r.removedNodes].filter(xr.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&o.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let r=t.relatedTarget;(!r||!this.contains(r))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let r=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),xr.isTreeItem(r)&&!r.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=r,this.tabIndex=-1,r.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let e=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(e){let o=e.cloneNode(true);return [o,...o.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),o.setAttribute("data-default",""),o.slot=`${t}-icon`,o}return null}selectItem(t){let r=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),cp(t);else if(this.selection==="single"||t.isLeaf){let o=this.getAllTreeItems();for(let i of o)i.selected=i===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let e=this.selectedItems;(r.length!==e.length||e.some(o=>!r.includes(o)))&&Promise.all(e.map(o=>o.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:e}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(i=>{var s;return ["input","textarea"].includes((s=i?.tagName)==null?void 0:s.toLowerCase())}))return;let r=this.getFocusableItems(),e=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(r.length>0){t.preventDefault();let i=r.findIndex(l=>l.matches(":focus")),s=r[i],n=l=>{let c=r[ft(l,0,r.length-1)];this.focusItem(c);},a=l=>{s.expanded=l;};t.key==="ArrowDown"?n(i+1):t.key==="ArrowUp"?n(i-1):e&&t.key==="ArrowRight"||o&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(i+1):a(true):e&&t.key==="ArrowLeft"||o&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(i-1):a(false):t.key==="Home"?n(0):t.key==="End"?n(r.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let r=t.target,e=r.closest("sl-tree-item"),o=t.composedPath().some(i=>{var s;return (s=i?.classList)==null?void 0:s.contains("tree-item__expand-button")});!e||e.disabled||r!==this.clickTarget||(o?e.expanded=!e.expanded:this.selectItem(e));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",r=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let e of r)e.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>cp(e,true)));}get selectedItems(){let t=this.getAllTreeItems(),r=e=>e.selected;return t.filter(r)}getFocusableItems(){let t=this.getAllTreeItems(),r=new Set;return t.filter(e=>{var o;if(e.disabled)return  false;let i=(o=e.parentElement)==null?void 0:o.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||r.has(i))&&r.add(e),!r.has(e)})}render(){return f`
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
    `}};Xe.styles=[L,lp];p([E("slot:not([name])")],Xe.prototype,"defaultSlot",2);p([E("slot[name=expand-icon]")],Xe.prototype,"expandedIconSlot",2);p([E("slot[name=collapse-icon]")],Xe.prototype,"collapsedIconSlot",2);p([h()],Xe.prototype,"selection",2);p([O("selection")],Xe.prototype,"handleSelectionChange",1);Xe.define("sl-tree");xr.define("sl-tree-item");exports.AutoFieldTreeSelect=class Je extends I{constructor(){super(...arguments);this.nodes=new qe(this,"items",e=>e?(this._forEachTree(e,(o,i,s,n)=>{this.isItemSelected(o)&&(o.selected=true,this.selection.push({id:o[this.options.idKey],value:o[this.options.valueKey],path:n.join("/")}));}),e):[]);this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,defaultExpandLevel:2,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e,o){let i=(s,n,a,l)=>{let c=[...l,s[this.options.labelKey]];if(this.options.defaultExpandLevel>0&&a<this.options.defaultExpandLevel-1&&s.expanded===void 0&&(s.expanded=true),o(s,n,a,c),s.children){let d=a+1;s.children.forEach(u=>{i(u,s,d,[...c]);});}};(Array.isArray(e)?e:[e]).forEach(s=>{i(s,void 0,0,[]);});}onSelectionChange(e){let o=Array.from(e.detail.selection);o&&(this.selection=o.map(i=>({id:i.dataset.id,value:i.dataset.value,path:i.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(e,o,i){let s=o.includes(e[this.options.valueKey]),n=[...i,e[this.options.labelKey]];return f`<sl-tree-item
            data-id=${String(e[this.options.idKey])}
            data-value=${String(e[this.options.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${e.expanded}
        >
            ${B(e.icon,()=>f`<sl-icon name="${e.icon}"></sl-icon>`)} ${e.label}
            ${Array.isArray(e.children)?f`${e.children.map(a=>this._renderNode(a,o,n))}`:""}</sl-tree-item
        >`}_renderNodes(e){let o=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(i=>this._renderNode(i,o,[])):this._renderNode(e,o,[])}renderTree(){return f`
            ${this.nodes.render(e=>f`<sl-tree
                    class="scrollbar"
                    name="${this.name}"
                    data-path=${this.path}
                    size=${this.context.size}
                    selection="${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
                    @sl-selection-change=${this.onSelectionChange.bind(this)}
                    style="max-height:${this.options.height||"18em"};overflow:auto;"
                    >${this._renderNodes(e)}</sl-tree
                >`)}
            
        `}renderInput(){return f` ${this.renderTree()} `}};exports.AutoFieldTreeSelect.styles=[I.styles,x`
            ${Ye}
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTreeSelect=y([R("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class _r extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(e){let o=e.target.dataset.id;for(let i=0;i<this.selection.length;i++)if(String(this.selection[i].id)===o){this.selection.splice(i,1),this.onFieldChange(),this.requestUpdate();break}e.stopPropagation();}getShowItemValue(e,o,i){if(o===i)return e}getSelectedTagValue(e){if(this.options.showAsPath)return f`${e.path}`;{let i=e.path.split("/");return i[i.length-1]}}renderSelectedTags(){let e=this.selection;return f`<span class="tags"
            >${rt(e,o=>f`<sl-tag data-id="${o.id}" title=${o.path} @sl-remove=${this._onRemoveSelection.bind(this)} @click=${i=>i.stopPropagation()} removable
                    >${this.getSelectedTagValue(o)}</sl-tag
                >`)}</span
        >`}renderSelection(){return f` <div class="selection" slot="trigger">
            ${B(this.selection.length===0&&this.options.placeholder,()=>f`<span class="placeholder">${this.options.placeholder}</span>`)} ${this.renderSelectedTags()}
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
        `],y([$()],exports.AutoFieldTreeDropdown.prototype,"active",2),y([E("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=y([R("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);function pp(t){if(t)if(t.type==="checkbox"){if(t.value==="on")return t.checked;if(t.value.startsWith("[")&&t.value.endsWith("]"))try{let r=JSON.parse(t.value);return t.checked?r[0]:r[1]}catch{return t.checked}else return t.checked?t.value:null}else return t.value}var Rt=class extends I{constructor(){super(...arguments);this.active=false;}static{this.styles=[I.styles,x`
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
                    ${B(this.options.icon,()=>f`<span class='icon'><sl-icon name="${this.options.icon}"></sl-icon></span>`)}
                    ${B(this._isEmpty()&&this.options.placeholder,()=>f`<span class='placeholder'>${this.options.placeholder}</span>`,()=>f`<span class="select-value">
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
            </div>       `}_renderContent(){return f`<div class="popoup-container ${w(this.options.dropdown?"dropdown":void 0)}">
            ${this.renderDropdown()}
        </div>`}renderDropdown(){}renderSelection(e){return f`    
        ${this.options.renderSelection?this.options.renderSelection(e||this.value,f):e||this.value}
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
                    >
                    ${this._renderSelection()}
                    ${this._renderContent()}
                </sl-dropdown>
            </span>
            ${this.renderAfterActions(false)}
            </div>
            `:f`${this._renderContent()}`}};y([$()],Rt.prototype,"active",2);exports.AutoFieldCustom=class to extends Rt{constructor(){super(...arguments);this.selection=[];}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{placeholder:"\u8BF7\u9009\u62E9",dropdown:true,inputSelectors:"input,textarea"})}connectedCallback(){super.connectedCallback(),this._onFieldInput();}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this.onFieldInput),this.removeEventListener("change",this.onFieldInput);}}),this.addEventListener("input",this.onFieldInput),this.addEventListener("change",this.onFieldInput);}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(i=>pp(i))}renderDropdown(){let e=this.value.map(o=>Ot(o));return f`<div class="container">${this.options.renderContent(e,f)}</div>`}};exports.AutoFieldCustom.styles=[Rt.styles],y([E(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=y([R("auto-field-custom")],exports.AutoFieldCustom);function up(t,r){let e=t.width,o=t.height,i=t.widget,s;try{s=document.createElement(`auto-field-${i||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=t,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),r?.styles&&Object.assign(s.style,r.styles),r?.attrs){for(let n in r.attrs)s.setAttribute(n,String(r.attrs[n]));s.parent=r.parent;}return e&&(s.style.width=String(e)),o&&(s.style.height=String(o)),r?.classs&&(typeof r.classs=="string"?s.classList.add(r.classs):typeof r.classs=="object"&&Object.entries(r.classs).forEach(([n,a])=>{a?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class eo extends Rt{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange(),this._updateSelection();};this._isFirst=true;}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{children:[]})}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("change",this._handleChildrenChange),this.shadow.removeEventListener("input",this._handleChildrenChange);}_updateSelection(){this.selection&&setTimeout(()=>{let e=this.toState(this.getInputValue()),o=super.renderSelection(e);this._isFirst&&(kr(X,this.selection),this._isFirst=false),kr(X,this.selection,{isConnected:true}),kr(o,this.selection,{isConnected:true});});}_onChildrenChange(){this.options.children.length>0&&(this.shadow.addEventListener("change",this._handleChildrenChange),this.shadow.addEventListener("input",this._handleChildrenChange));}renderSelection(){return setTimeout(()=>this._updateSelection()),f``}getInputValue(){let e=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),o=[];return e.forEach(i=>{if(i.tagName.startsWith("AUTO-FIELD-")){let s=i.getInputValue();s===""&&(s=i.value),o.push(s);}}),o}renderDropdown(){return f`
            <div class="children">
                ${rt(this.options.children,e=>f`${up(e,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[Rt.styles,x`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `],y([E(".selection>.select-value")],exports.AutoFieldCombine.prototype,"selection",2),exports.AutoFieldCombine=y([R("auto-field-combine")],exports.AutoFieldCombine);var jh=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"];exports.AutoFieldIcons=class wr extends Rt{constructor(){super(...arguments);this.active=false;this.selected=[];this.icons=[];}getInitialOptions(){return {icons:[],size:"24px",multiple:false,dropdown:false,builtIn:true}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&jh.forEach(e=>{this.icons.includes(e)||this.icons.push(e);}),this.selected=Array.isArray(this.value)?this.value:this.value.split(",");}renderView(){return this.renderIcons(this.selected)}_isSelected(e){return this.options.multiple?this.selected.includes(e):this.selected[0]===e}_onClickIcon(e){if(!this.context.viewonly)if(this.options.multiple){let o=this.selected.findIndex(i=>i===e);o>-1?this.selected.splice(o,1):this.selected.push(e),this.onFieldInput();}else this.selected.length===0?this.selected.push(e):this.selected[0]=e,this.onFieldInput();}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(e,o=true){return f`<div class="icons" style="font-size:${this.options.size}">
            ${rt(e,i=>{if(i!=="")return f`<span class="icon ${o&&this._isSelected(i)?"selected":void 0}" title="${i}" @click=${()=>this._onClickIcon(i)}
                    ><sl-icon name="${i}" size="${this.options.size}"></sl-icon
                ></span>`})}
        </div>`}renderSelection(){return this.renderIcons(this.selected,false)}renderDropdown(){return this.renderIcons(this.icons)}};exports.AutoFieldIcons.styles=[I.styles,Rt.styles,x`
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
        `],y([$()],exports.AutoFieldIcons.prototype,"active",2),y([$()],exports.AutoFieldIcons.prototype,"selected",2),exports.AutoFieldIcons=y([R("auto-field-icons")],exports.AutoFieldIcons);exports.AutoFieldCascader=class ve extends Rt{constructor(){super(...arguments);this.scrollbar=new nr(this);this.active=false;this.data={};this.level=3;this.selected=[];this.focusItems=[];this.scrollbars=[];}getInitialOptions(){let e=Object.assign(super.getInitialOptions(),{idKey:"id",rootKey:"$root",labelKey:"label",maxLevel:3,childrenKey:"children",select:{}});return e.valueKey||(e.valueKey=e.idKey),e.idKey||(e.idKey=e.labelKey),e}connectedCallback(){super.connectedCallback();let e=typeof this.options.select=="object"&&this.options.childrenKey in this.options.select;e&&(this.options.rootKey=this.options.select[this.options.idKey]),this.data=e||Array.isArray(this.options.select)?this._normalizeData(this.options.select):this.options.select,this.selected=this._parseValues(this.value),this.focusItems=Array.from({length:this.options.maxLevel-1}).fill(null);}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu")?.forEach(o=>{this.scrollbars.push(this.scrollbar.create(o));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}_normalizeData(e){let o={},i=(s,n=false)=>{let a=s[this.options.idKey]||(n?"$root":void 0);if(!a)return;let l=s[this.options.childrenKey||"children"];l&&Array.isArray(l)&&l.length>0?(o[a]=l,l.forEach(c=>{i(c);})):o[a]=[];};return Array.isArray(e)?o.$root=e.reduce((s,n)=>(s.push(n),i(n),s),[]):i(e,true),o}_clearFocusItems(e){for(let o=e;o<=this.options.maxLevel;o++)Array.from(this.shadow.querySelectorAll(`[data-level='${o}']`)).forEach(s=>{s.classList.remove("focused");});}_onSelectItem(e){let o=e.detail.item;if(Number(o.dataset.level)!==this.options.maxLevel)return;let s=[],n=(l,c)=>{let d=this.data[c].findIndex(u=>String(u[this.options.idKey])===String(l));if(d>-1)return [this.data[c][d][this.options.labelKey],this.data[c][d][this.options.valueKey]]},a=this.options.rootKey;for(let l=0;l<this.focusItems.length;l++){let c=this.focusItems[l],d=n(c,a);if(!d)return;s.push([c,...d]),a=c;}this.selected=s,this.onFieldChange();}_getSelectedValue(e){let o=[],i=(n,a)=>{let l=this.data[a].findIndex(c=>String(c[this.options.idKey])===String(n));if(l>-1)return this.data[a][l][this.options.valueKey]},s=this.options.rootKey;for(let n=0;n<e.length;n++){let a=this.focusItems[n],l=i(a,s);if(!l)return;o.push(l),s=a;}return o}getInputValue(){let e=this.selected.map(o=>o[2]);return typeof this.value=="string"?e.join(this.options.delimiter||""):e}async _loadItem(e,o,i){let s;if(Array.isArray(this.data[o])&&this.data[o].length>0){e.dataset.lazy="done",this.requestUpdate();return}try{e.dataset.lazy="loading";let n=await this.options.onLoad(o);Array.isArray(n)&&(this.data[o]=n,n.forEach(a=>{a.lazy===void 0&&i<this.options.maxLevel&&(a.lazy=!0),this.data[a[this.options.idKey]]=[];}),this.requestUpdate());}catch(n){e.dataset.lazy="true",s=n;}finally{s||(e.dataset.lazy="done");}}_onItemMouseOverr(e){let o=e.target,i=o.dataset.id,s=Number(o.dataset.level);if(this.focusItems[s-1]===i)return;this._clearFocusItems(s),o.classList.add("focused"),o.dataset.lazy==="idle"&&this._loadItem(o,i,s),this.focusItems[s-1]=i,this.focusItems.forEach((a,l)=>{l>s-1&&(this.focusItems[l]=null);}),this.focusItems=[...this.focusItems];}_renderLevel(e,o=1,i){if(e)return f`<sl-menu class="level" @sl-select=${o===this.options.maxLevel?this._onSelectItem.bind(this):null}>
            ${rt(e,s=>{let n=s[this.options.idKey],a=this.selected[o-1]?.[0]===s[this.options.idKey],l=s.lazy||Array.isArray(this.data[n])&&this.data[n].length===0;return f` <sl-menu-item
                    type="checkbox"
                    data-level=${o}
                    data-id=${s[this.options.idKey]}
                    data-pid=${w(i)}
                    data-lazy=${w(l?"idle":void 0)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${a}
                    class="${w(a?"selected":void 0)}"
                >
                    ${s[this.options.labelKey]}
                    ${B(o<this.options.maxLevel,()=>f`${B(s.lazy,()=>f`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}
                </sl-menu-item>`})}
        </sl-menu>`}_parseValues(e){let o=[],i=[];if(Array.isArray(e))o=e;else if(e&&typeof e=="string")if(this.options.delimiter&&this.options.delimiter.length>0)o=e.split(this.options.delimiter);else {let s=this.data[this.options.rootKey],n=e;for(;;){let a=s.find(l=>n.startsWith(l[this.options.valueKey]));if(a){if(o.push(a[this.options.valueKey]),n=n.substring(a[this.options.valueKey].length),s=this.data[a[this.options.idKey]],!s)break}else break}}if(o.length>0){let s=this.data[this.options.rootKey];for(let n=0;n<o.length;n++){let a=o[n],l=s.find(c=>c[this.options.valueKey]===a);if(l){if(i.push([l[this.options.idKey],l[this.options.labelKey],l[this.options.valueKey]]),s=this.data[l[this.options.idKey]],!s)break}else break}}return i}renderSelection(){return f`
            ${this.selected.map(e=>e[1]).join(this.options.delimiter||"")}
        `}renderDropdown(){let e=this.data[this.options.rootKey],o=this.focusItems;return f`<div class="levels">
            ${rt(Array.from({length:this.options.maxLevel}),(i,s)=>{if(s===0)return this._renderLevel(e,s+1,this.options.rootKey);{let n=o[s-1],a=this.data[n];return a?this._renderLevel(a,s+1,n):this._renderLevel([],s+1,n)}})}
        </div>`}};exports.AutoFieldCascader.styles=[I.styles,Rt.styles,nr.styles,x`
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
        `],y([$()],exports.AutoFieldCascader.prototype,"active",2),y([$()],exports.AutoFieldCascader.prototype,"data",2),y([$()],exports.AutoFieldCascader.prototype,"level",2),y([$()],exports.AutoFieldCascader.prototype,"selected",2),y([$()],exports.AutoFieldCascader.prototype,"focusItems",2),exports.AutoFieldCascader=y([R("auto-field-cascader")],exports.AutoFieldCascader);exports.AutoFieldDateRange=class ro extends I{getInitialOptions(){return {icon:"date",delimiter:",",includeTime:false}}_onInputChange(r){let e=r.type;this.context.validAt==="input"&&e.includes("input")?this.onFieldInput():e.includes("change")&&this.onFieldChange();}_getDate(r){return (Array.isArray(this.value)?this.value:this.value.split(this.options.delimiter))[r]}_renderIcon(){if(this.options.icon)return f`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}_renderDate(r){return f`<sl-input
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
        `}getInputValue(){let r=Array.from(this.inputs||[]).map(e=>e.value);return Array.isArray(this.value)?r:r.join(this.options.delimiter)}};exports.AutoFieldDateRange.styles=[I.styles,x`
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
        `],y([da("sl-input")],exports.AutoFieldDateRange.prototype,"inputs",2),exports.AutoFieldDateRange=y([R("auto-field-date-range")],exports.AutoFieldDateRange);var hp=x`
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
`;var Bh=0,ie=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.attrId=++Bh,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=false,this.closable=false,this.disabled=false,this.tabIndex=0;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab");}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close");}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0;}render(){return this.id=this.id.length>0?this.id:this.componentId,f`
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
    `}};ie.styles=[L,hp];ie.dependencies={"sl-icon-button":dt};p([E(".tab")],ie.prototype,"tab",2);p([h({reflect:true})],ie.prototype,"panel",2);p([h({type:Boolean,reflect:true})],ie.prototype,"active",2);p([h({type:Boolean,reflect:true})],ie.prototype,"closable",2);p([h({type:Boolean,reflect:true})],ie.prototype,"disabled",2);p([h({type:Number,reflect:true})],ie.prototype,"tabIndex",2);p([O("active")],ie.prototype,"handleActiveChange",1);p([O("disabled")],ie.prototype,"handleDisabledChange",1);ie.define("sl-tab");var dp=x`
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
`;var fp=x`
  :host {
    display: contents;
  }
`;var ti=class extends P{constructor(){super(...arguments),this.observedElements=[],this.disabled=false;}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}});}),this.disabled||this.startObserver();}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver();}handleSlotChange(){this.disabled||this.startObserver();}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let r=t.assignedElements({flatten:true});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],r.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e);});}}stopObserver(){this.resizeObserver.disconnect();}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver();}render(){return f` <slot @slotchange=${this.handleSlotChange}></slot> `}};ti.styles=[L,fp];p([h({type:Boolean,reflect:true})],ti.prototype,"disabled",2);p([O("disabled",{waitUntilFirstUpdate:true})],ti.prototype,"handleDisabledChange",1);var _t=class extends P{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new H(this),this.hasScrollControls=false,this.shouldHideScrollStartButton=false,this.shouldHideScrollEndButton=false,this.placement="top",this.activation="auto",this.noScrollControls=false,this.fixedScrollControls=false,this.scrollOffset=1;}connectedCallback(){let t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls();}),this.mutationObserver=new MutationObserver(r=>{let e=r.filter(({target:o})=>{if(o===this)return  true;if(o.closest("sl-tab-group")!==this)return  false;let i=o.tagName.toLowerCase();return i==="sl-tab"||i==="sl-tab-panel"});if(e.length!==0){if(e.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(o=>o.attributeName==="active")){let i=e.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="sl-tab").map(s=>s.target).find(s=>s.active);i&&this.setActiveTab(i);}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:true,attributeFilter:["active","disabled","name","panel"],childList:true,subtree:true}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((e,o)=>{var i;e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((i=this.getActiveTab())!=null?i:this.tabs[0],{emitEvents:false}),o.unobserve(e[0].target));}).observe(this.tabGroup);});});}disconnectedCallback(){var t,r;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect(),this.nav&&((r=this.resizeObserver)==null||r.unobserve(this.nav));}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return [...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let e=t.target.closest("sl-tab");e?.closest("sl-tab-group")===this&&e!==null&&this.setActiveTab(e,{scrollBehavior:"smooth"});}handleKeyDown(t){let e=t.target.closest("sl-tab");if(e?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&e!==null&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){let i=this.tabs.find(a=>a.matches(":focus")),s=this.localize.dir()==="rtl",n=null;if(i?.tagName.toLowerCase()==="sl-tab"){if(t.key==="Home")n=this.focusableTabs[0];else if(t.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){let a=this.tabs.findIndex(l=>l===i);n=this.findNextFocusableTab(a,"backward");}else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){let a=this.tabs.findIndex(l=>l===i);n=this.findNextFocusableTab(a,"forward");}if(!n)return;n.tabIndex=0,n.focus({preventScroll:true}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(a=>{a.tabIndex=a===n?0:-1;}),["top","bottom"].includes(this.placement)&&Io(n,this.nav,"horizontal"),t.preventDefault();}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"});}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"});}setActiveTab(t,r){if(r=$t({emitEvents:true,scrollBehavior:"auto"},r),t!==this.activeTab&&!t.disabled){let e=this.activeTab;this.activeTab=t,this.tabs.forEach(o=>{o.active=o===this.activeTab,o.tabIndex=o===this.activeTab?0:-1;}),this.panels.forEach(o=>{var i;return o.active=o.name===((i=this.activeTab)==null?void 0:i.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Io(this.activeTab,this.nav,"horizontal",r.scrollBehavior),r.emitEvents&&(e&&this.emit("sl-tab-hide",{detail:{name:e.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}));}}setAriaLabels(){this.tabs.forEach(t=>{let r=this.panels.find(e=>e.name===t.panel);r&&(t.setAttribute("aria-controls",r.getAttribute("id")),r.setAttribute("aria-labelledby",t.getAttribute("id")));});}repositionIndicator(){let t=this.getActiveTab();if(!t)return;let r=t.clientWidth,e=t.clientHeight,o=this.localize.dir()==="rtl",i=this.getAllTabs(),n=i.slice(0,i.indexOf(t)).reduce((a,l)=>({left:a.left+l.clientWidth,top:a.top+l.clientHeight}),{left:0,top:0});switch(this.placement){case "top":case "bottom":this.indicator.style.width=`${r}px`,this.indicator.style.height="auto",this.indicator.style.translate=o?`${ -1*n.left}px`:`${n.left}px`;break;case "start":case "end":this.indicator.style.width="auto",this.indicator.style.height=`${e}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls());}findNextFocusableTab(t,r){let e=null,o=r==="forward"?1:-1,i=t+o;for(;t<this.tabs.length;){if(e=this.tabs[i]||null,e===null){r==="forward"?e=this.focusableTabs[0]:e=this.focusableTabs[this.focusableTabs.length-1];break}if(!e.disabled)break;i+=o;}return e}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd());}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=false:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons();}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none";}show(t){let r=this.tabs.find(e=>e.panel===t);r&&this.setActiveTab(r,{scrollBehavior:"smooth"});}render(){let t=this.localize.dir()==="rtl";return f`
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

          ${this.hasScrollControls?f`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${M({"tab-group__scroll-button":true,"tab-group__scroll-button--end":true,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
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
    `}};_t.styles=[L,dp];_t.dependencies={"sl-icon-button":dt,"sl-resize-observer":ti};p([E(".tab-group")],_t.prototype,"tabGroup",2);p([E(".tab-group__body")],_t.prototype,"body",2);p([E(".tab-group__nav")],_t.prototype,"nav",2);p([E(".tab-group__indicator")],_t.prototype,"indicator",2);p([$()],_t.prototype,"hasScrollControls",2);p([$()],_t.prototype,"shouldHideScrollStartButton",2);p([$()],_t.prototype,"shouldHideScrollEndButton",2);p([h()],_t.prototype,"placement",2);p([h()],_t.prototype,"activation",2);p([h({attribute:"no-scroll-controls",type:Boolean})],_t.prototype,"noScrollControls",2);p([h({attribute:"fixed-scroll-controls",type:Boolean})],_t.prototype,"fixedScrollControls",2);p([Pe({passive:true})],_t.prototype,"updateScrollButtons",1);p([O("noScrollControls",{waitUntilFirstUpdate:true})],_t.prototype,"updateScrollControls",1);p([O("placement",{waitUntilFirstUpdate:true})],_t.prototype,"syncIndicator",1);_t.define("sl-tab-group");var Hh=(t,r)=>{let e=0;return function(...o){window.clearTimeout(e),e=window.setTimeout(()=>{t.call(this,...o);},r);}},mp=(t,r,e)=>{let o=t[r];t[r]=function(...i){o.call(this,...i),e.call(this,o,...i);};};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){let r=new Set,e=new WeakMap,o=s=>{for(let n of s.changedTouches)r.add(n.identifier);},i=s=>{for(let n of s.changedTouches)r.delete(n.identifier);};document.addEventListener("touchstart",o,true),document.addEventListener("touchend",i,true),document.addEventListener("touchcancel",i,true),mp(EventTarget.prototype,"addEventListener",function(s,n){if(n!=="scrollend")return;let a=Hh(()=>{r.size?a():this.dispatchEvent(new Event("scrollend"));},100);s.call(this,"scroll",a,{passive:true}),e.set(this,a);}),mp(EventTarget.prototype,"removeEventListener",function(s,n){if(n!=="scrollend")return;let a=e.get(this);a&&s.call(this,"scroll",a,{passive:true});});}})();var gp=x`
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
`;var Nh=0,oo=class extends P{constructor(){super(...arguments),this.attrId=++Nh,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=false;}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel");}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true");}render(){return f`
      <slot
        part="base"
        class=${M({"tab-panel":true,"tab-panel--active":this.active})}
      ></slot>
    `}};oo.styles=[L,gp];p([h({reflect:true})],oo.prototype,"name",2);p([h({type:Boolean,reflect:true})],oo.prototype,"active",2);p([O("active")],oo.prototype,"handleActiveChange",1);oo.define("sl-tab-panel");q.define("sl-icon");var bp=x`
:root,
:host,
.sl-theme-light {
    color-scheme: light;
    --sl-color-gray-50: var(--t-color-gray-0);
    --sl-color-gray-100: var(--t-color-gray-1);
    --sl-color-gray-200: var(--t-color-gray-2);
    --sl-color-gray-300: var(--t-color-gray-3);
    --sl-color-gray-400: var(--t-color-gray-4);
    --sl-color-gray-500: var(--t-color-gray-5);
    --sl-color-gray-600: var(--t-color-gray-6);
    --sl-color-gray-700: var(--t-color-gray-7);
    --sl-color-gray-800: var(--t-color-gray-8);
    --sl-color-gray-900: var(--t-color-gray-9);
    --sl-color-gray-950: var(--t-color-gray-10);

    --sl-color-red-50: var(--t-color-red-0);
    --sl-color-red-100: var(--t-color-red-1);
    --sl-color-red-200: var(--t-color-red-2);
    --sl-color-red-300: var(--t-color-red-3);
    --sl-color-red-400: var(--t-color-red-4);
    --sl-color-red-500: var(--t-color-red-5);
    --sl-color-red-600: var(--t-color-red-6);
    --sl-color-red-700: var(--t-color-red-7);
    --sl-color-red-800: var(--t-color-red-8);
    --sl-color-red-900: var(--t-color-red-9);
    --sl-color-red-950: var(--t-color-red-10);

    --sl-color-orange-50: var(--t-color-orange-0);
    --sl-color-orange-100: var(--t-color-orange-1);
    --sl-color-orange-200: var(--t-color-orange-2);
    --sl-color-orange-300: var(--t-color-orange-3);
    --sl-color-orange-400: var(--t-color-orange-4);
    --sl-color-orange-500: var(--t-color-orange-5);
    --sl-color-orange-600: var(--t-color-orange-6);
    --sl-color-orange-700: var(--t-color-orange-7);
    --sl-color-orange-800: var(--t-color-orange-8);
    --sl-color-orange-900: var(--t-color-orange-9);
    --sl-color-orange-950: var(--t-color-orange-10);

    --sl-color-amber-50: var(--t-color-amber-0);
    --sl-color-amber-100: var(--t-color-amber-1);
    --sl-color-amber-200: var(--t-color-amber-2);
    --sl-color-amber-300: var(--t-color-amber-3);
    --sl-color-amber-400: var(--t-color-amber-4);
    --sl-color-amber-500: var(--t-color-amber-5);
    --sl-color-amber-600: var(--t-color-amber-6);
    --sl-color-amber-700: var(--t-color-amber-7);
    --sl-color-amber-800: var(--t-color-amber-8);
    --sl-color-amber-900: var(--t-color-amber-9);
    --sl-color-amber-950: var(--t-color-amber-10);

    --sl-color-yellow-50: var(--t-color-yellow-0);
    --sl-color-yellow-100: var(--t-color-yellow-1);
    --sl-color-yellow-200: var(--t-color-yellow-2);
    --sl-color-yellow-300: var(--t-color-yellow-3);
    --sl-color-yellow-400: var(--t-color-yellow-4);
    --sl-color-yellow-500: var(--t-color-yellow-5);
    --sl-color-yellow-600: var(--t-color-yellow-6);
    --sl-color-yellow-700: var(--t-color-yellow-7);
    --sl-color-yellow-800: var(--t-color-yellow-8);
    --sl-color-yellow-900: var(--t-color-yellow-9);
    --sl-color-yellow-950: var(--t-color-yellow-10);

    --sl-color-lime-50: var(--t-color-lime-0);
    --sl-color-lime-100: var(--t-color-lime-1);
    --sl-color-lime-200: var(--t-color-lime-2);
    --sl-color-lime-300: var(--t-color-lime-3);
    --sl-color-lime-400: var(--t-color-lime-4);
    --sl-color-lime-500: var(--t-color-lime-5);
    --sl-color-lime-600: var(--t-color-lime-6);
    --sl-color-lime-700: var(--t-color-lime-7);
    --sl-color-lime-800: var(--t-color-lime-8);
    --sl-color-lime-900: var(--t-color-lime-9);
    --sl-color-lime-950: var(--t-color-lime-10);

    --sl-color-green-50: var(--t-color-green-0);
    --sl-color-green-100: var(--t-color-green-1);
    --sl-color-green-200: var(--t-color-green-2);
    --sl-color-green-300: var(--t-color-green-3);
    --sl-color-green-400: var(--t-color-green-4);
    --sl-color-green-500: var(--t-color-green-5);
    --sl-color-green-600: var(--t-color-green-6);
    --sl-color-green-700: var(--t-color-green-7);
    --sl-color-green-800: var(--t-color-green-8);
    --sl-color-green-900: var(--t-color-green-9);
    --sl-color-green-950: var(--t-color-green-10);

    --sl-color-emerald-50: var(--t-color-emerald-0);
    --sl-color-emerald-100: var(--t-color-emerald-1);
    --sl-color-emerald-200: var(--t-color-emerald-2);
    --sl-color-emerald-300: var(--t-color-emerald-3);
    --sl-color-emerald-400: var(--t-color-emerald-4);
    --sl-color-emerald-500: var(--t-color-emerald-5);
    --sl-color-emerald-600: var(--t-color-emerald-6);
    --sl-color-emerald-700: var(--t-color-emerald-7);
    --sl-color-emerald-800: var(--t-color-emerald-8);
    --sl-color-emerald-900: var(--t-color-emerald-9);
    --sl-color-emerald-950: var(--t-color-emerald-10);

    --sl-color-teal-50: var(--t-color-teal-0);
    --sl-color-teal-100: var(--t-color-teal-1);
    --sl-color-teal-200: var(--t-color-teal-2);
    --sl-color-teal-300: var(--t-color-teal-3);
    --sl-color-teal-400: var(--t-color-teal-4);
    --sl-color-teal-500: var(--t-color-teal-5);
    --sl-color-teal-600: var(--t-color-teal-6);
    --sl-color-teal-700: var(--t-color-teal-7);
    --sl-color-teal-800: var(--t-color-teal-8);
    --sl-color-teal-900: var(--t-color-teal-9);
    --sl-color-teal-950: var(--t-color-teal-10);

    --sl-color-cyan-50: var(--t-color-cyan-0);
    --sl-color-cyan-100: var(--t-color-cyan-1);
    --sl-color-cyan-200: var(--t-color-cyan-2);
    --sl-color-cyan-300: var(--t-color-cyan-3);
    --sl-color-cyan-400: var(--t-color-cyan-4);
    --sl-color-cyan-500: var(--t-color-cyan-5);
    --sl-color-cyan-600: var(--t-color-cyan-6);
    --sl-color-cyan-700: var(--t-color-cyan-7);
    --sl-color-cyan-800: var(--t-color-cyan-8);
    --sl-color-cyan-900: var(--t-color-cyan-9);
    --sl-color-cyan-950: var(--t-color-cyan-10);

    --sl-color-sky-50: var(--t-color-sky-0);
    --sl-color-sky-100: var(--t-color-sky-1);
    --sl-color-sky-200: var(--t-color-sky-2);
    --sl-color-sky-300: var(--t-color-sky-3);
    --sl-color-sky-400: var(--t-color-sky-4);
    --sl-color-sky-500: var(--t-color-sky-5);
    --sl-color-sky-600: var(--t-color-sky-6);
    --sl-color-sky-700: var(--t-color-sky-7);
    --sl-color-sky-800: var(--t-color-sky-8);
    --sl-color-sky-900: var(--t-color-sky-9);
    --sl-color-sky-950: var(--t-color-sky-10);

    --sl-color-blue-50: var(--t-color-blue-0);
    --sl-color-blue-100: var(--t-color-blue-1);
    --sl-color-blue-200: var(--t-color-blue-2);
    --sl-color-blue-300: var(--t-color-blue-3);
    --sl-color-blue-400: var(--t-color-blue-4);
    --sl-color-blue-500: var(--t-color-blue-5);
    --sl-color-blue-600: var(--t-color-blue-6);
    --sl-color-blue-700: var(--t-color-blue-7);
    --sl-color-blue-800: var(--t-color-blue-8);
    --sl-color-blue-900: var(--t-color-blue-9);
    --sl-color-blue-950: var(--t-color-blue-10);

    --sl-color-indigo-50: var(--t-color-indigo-0);
    --sl-color-indigo-100: var(--t-color-indigo-1);
    --sl-color-indigo-200: var(--t-color-indigo-2);
    --sl-color-indigo-300: var(--t-color-indigo-3);
    --sl-color-indigo-400: var(--t-color-indigo-4);
    --sl-color-indigo-500: var(--t-color-indigo-5);
    --sl-color-indigo-600: var(--t-color-indigo-6);
    --sl-color-indigo-700: var(--t-color-indigo-7);
    --sl-color-indigo-800: var(--t-color-indigo-8);
    --sl-color-indigo-900: var(--t-color-indigo-9);
    --sl-color-indigo-950: var(--t-color-indigo-10);

    --sl-color-violet-50: var(--t-color-violet-0);
    --sl-color-violet-100: var(--t-color-violet-1);
    --sl-color-violet-200: var(--t-color-violet-2);
    --sl-color-violet-300: var(--t-color-violet-3);
    --sl-color-violet-400: var(--t-color-violet-4);
    --sl-color-violet-500: var(--t-color-violet-5);
    --sl-color-violet-600: var(--t-color-violet-6);
    --sl-color-violet-700: var(--t-color-violet-7);
    --sl-color-violet-800: var(--t-color-violet-8);
    --sl-color-violet-900: var(--t-color-violet-9);
    --sl-color-violet-950: var(--t-color-violet-10);

    --sl-color-purple-50: var(--t-color-purple-0);
    --sl-color-purple-100: var(--t-color-purple-1);
    --sl-color-purple-200: var(--t-color-purple-2);
    --sl-color-purple-300: var(--t-color-purple-3);
    --sl-color-purple-400: var(--t-color-purple-4);
    --sl-color-purple-500: var(--t-color-purple-5);
    --sl-color-purple-600: var(--t-color-purple-6);
    --sl-color-purple-700: var(--t-color-purple-7);
    --sl-color-purple-800: var(--t-color-purple-8);
    --sl-color-purple-900: var(--t-color-purple-9);
    --sl-color-purple-950: var(--t-color-purple-10);

    --sl-color-fuchsia-50: var(--t-color-fuchsia-0);
    --sl-color-fuchsia-100: var(--t-color-fuchsia-1);
    --sl-color-fuchsia-200: var(--t-color-fuchsia-2);
    --sl-color-fuchsia-300: var(--t-color-fuchsia-3);
    --sl-color-fuchsia-400: var(--t-color-fuchsia-4);
    --sl-color-fuchsia-500: var(--t-color-fuchsia-5);
    --sl-color-fuchsia-600: var(--t-color-fuchsia-6);
    --sl-color-fuchsia-700: var(--t-color-fuchsia-7);
    --sl-color-fuchsia-800: var(--t-color-fuchsia-8);
    --sl-color-fuchsia-900: var(--t-color-fuchsia-9);
    --sl-color-fuchsia-950: var(--t-color-fuchsia-10);

    --sl-color-pink-50: var(--t-color-pink-0);
    --sl-color-pink-100: var(--t-color-pink-1);
    --sl-color-pink-200: var(--t-color-pink-2);
    --sl-color-pink-300: var(--t-color-pink-3);
    --sl-color-pink-400: var(--t-color-pink-4);
    --sl-color-pink-500: var(--t-color-pink-5);
    --sl-color-pink-600: var(--t-color-pink-6);
    --sl-color-pink-700: var(--t-color-pink-7);
    --sl-color-pink-800: var(--t-color-pink-8);
    --sl-color-pink-900: var(--t-color-pink-9);
    --sl-color-pink-950: var(--t-color-pink-10);

    --sl-color-rose-50: var(--t-color-rose-0);
    --sl-color-rose-100: var(--t-color-rose-1);
    --sl-color-rose-200: var(--t-color-rose-2);
    --sl-color-rose-300: var(--t-color-rose-3);
    --sl-color-rose-400: var(--t-color-rose-4);
    --sl-color-rose-500: var(--t-color-rose-5);
    --sl-color-rose-600: var(--t-color-rose-6);
    --sl-color-rose-700: var(--t-color-rose-7);
    --sl-color-rose-800: var(--t-color-rose-8);
    --sl-color-rose-900: var(--t-color-rose-9);
    --sl-color-rose-950: var(--t-color-rose-10);

    --sl-color-primary-50: var(--t-color-primary-0);
    --sl-color-primary-100: var(--t-color-primary-1);
    --sl-color-primary-200: var(--t-color-primary-2);
    --sl-color-primary-300: var(--t-color-primary-3);
    --sl-color-primary-400: var(--t-color-primary-4);
    --sl-color-primary-500: var(--t-color-primary-5);
    --sl-color-primary-600: var(--t-color-primary-6);
    --sl-color-primary-700: var(--t-color-primary-7);
    --sl-color-primary-800: var(--t-color-primary-8);
    --sl-color-primary-900: var(--t-color-primary-9);
    --sl-color-primary-950: var(--t-color-primary-10);

    --sl-color-success-50: var(--t-color-success-0);
    --sl-color-success-100: var(--t-color-success-1);
    --sl-color-success-200: var(--t-color-success-2);
    --sl-color-success-300: var(--t-color-success-3);
    --sl-color-success-400: var(--t-color-success-4);
    --sl-color-success-500: var(--t-color-success-5);
    --sl-color-success-600: var(--t-color-success-6);
    --sl-color-success-700: var(--t-color-success-7);
    --sl-color-success-800: var(--t-color-success-8);
    --sl-color-success-900: var(--t-color-success-9);
    --sl-color-success-950: var(--t-color-success-10);

    --sl-color-warning-50: var(--sl-color-amber-50);
    --sl-color-warning-100: var(--t-color-warning-1);
    --sl-color-warning-200: var(--t-color-warning-2);
    --sl-color-warning-300: var(--t-color-warning-3);
    --sl-color-warning-400: var(--t-color-warning-4);
    --sl-color-warning-500: var(--t-color-warning-5);
    --sl-color-warning-600: var(--t-color-warning-6);
    --sl-color-warning-700: var(--t-color-warning-7);
    --sl-color-warning-800: var(--t-color-warning-8);
    --sl-color-warning-900: var(--t-color-warning-9);
    --sl-color-warning-950: var(--sl-color-amber-950);

    --sl-color-danger-50: var(--t-color-danger-0);
    --sl-color-danger-100: var(--t-color-danger-1);
    --sl-color-danger-200: var(--t-color-danger-2);
    --sl-color-danger-300: var(--t-color-danger-3);
    --sl-color-danger-400: var(--t-color-danger-4);
    --sl-color-danger-500: var(--t-color-danger-5);
    --sl-color-danger-600: var(--t-color-danger-6);
    --sl-color-danger-700: var(--t-color-danger-7);
    --sl-color-danger-800: var(--t-color-danger-8);
    --sl-color-danger-900: var(--t-color-danger-9);
    --sl-color-danger-950: var(--t-color-danger-10);

    --sl-color-neutral-50: var(--t-color-theme-0);
    --sl-color-neutral-100: var(--t-color-theme-1);
    --sl-color-neutral-200: var(--t-color-theme-2);
    --sl-color-neutral-300: var(--t-color-theme-3);
    --sl-color-neutral-400: var(--t-color-theme-4);
    --sl-color-neutral-500: var(--t-color-theme-5);
    --sl-color-neutral-600: var(--t-color-theme-6);
    --sl-color-neutral-700: var(--t-color-theme-7);
    --sl-color-neutral-800: var(--t-color-theme-8);
    --sl-color-neutral-900: var(--t-color-theme-9);
    --sl-color-neutral-950: var(--t-color-theme-10);

    --sl-color-neutral-0: var(--t-color-theme-0);
    --sl-color-neutral-1000: var(--t-color-theme-10);

    --sl-border-radius-small: var(--t-border-radius-small);
    --sl-border-radius-medium: var(--t-border-radius-medium);
    --sl-border-radius-large: var(--t-border-radius-large);
    --sl-border-radius-x-large: var(--t-border-radius-x-large);

    --sl-border-radius-circle: var(--t-border-radius-circle);
    --sl-border-radius-pill: var(--t-border-radius-pill);

    --sl-shadow-x-small: var(--t-shadow-x-small);
    --sl-shadow-small: var(--t-shadow-small);
    --sl-shadow-medium: var(--t-shadow-medium);
    --sl-shadow-large: var(--t-shadow-large);
    --sl-shadow-x-large: var(--t-shadow-x-large);

    --sl-spacing-3x-small: 0.125rem;
    --sl-spacing-2x-small: 0.25rem;
    --sl-spacing-x-small: var(--t-spacing-x-small);
    --sl-spacing-small: var(--t-spacing-small);
    --sl-spacing-medium: var(--t-spacing-medium);
    --sl-spacing-large: var(--t-spacing-large);
    --sl-spacing-x-large: var(--t-spacing-x-large);
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
    --sl-font-size-x-small: var(--t-font-size-x-small);
    --sl-font-size-small: var(--t-font-size-small);
    --sl-font-size-medium: var(--t-font-size-medium);
    --sl-font-size-large: var(--t-font-size-large);
    --sl-font-size-x-large: var(--t-font-size-x-large);
    --sl-font-size-2x-large: 2.25rem;
    --sl-font-size-3x-large: 3rem;
    --sl-font-size-4x-large: 4.5rem;

    --sl-font-weight-light: var(--t-font-weight-small);
    --sl-font-weight-normal: var(--t-font-weight-medium);
    --sl-font-weight-semibold: var(--t-font-weight-large);
    --sl-font-weight-bold: var(--t-font-weight-x-large);

    --sl-letter-spacing-denser: -0.03em;
    --sl-letter-spacing-dense: -0.015em;
    --sl-letter-spacing-normal: normal;
    --sl-letter-spacing-loose: 0.075em;
    --sl-letter-spacing-looser: 0.15em;

    --sl-line-height-denser: var(--sl-line-height-x-small);
    --sl-line-height-dense: var(--sl-line-height-small);
    --sl-line-height-normal: var(--t-line-height-medium);
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
    --sl-input-placeholder-color: var(--auto-theme-color);
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
`;var Os=x`    
    ${bp}
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
`;var he=class extends ut{constructor(){super();this.forms=[];Er();}static{this.styles=[Os,Ye,x`
            :host {
                display: block;
                width: 100%;
                background-color: var(--auto-bgcolor);
                    font: var(--auto-font);
            }
        `];}firstUpdated(){this.forms=this.getForms(),this.forms.length===0&&setTimeout(()=>{this.forms=this.getForms();});}getForms(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}bind(e){this.store=e,this.forms&&this.forms.forEach(o=>{o.bind&&o.bind(e);});}getFormInfo(e,o){let i=e.getAttribute("icon")||e.dataset.icon,s=e.getAttribute("label")||e.dataset.label,n=e.getAttribute("title")||e.dataset.title,a=e.getAttribute("name")||e.dataset.name||"",l=this.active?this.active.split(",").includes(a):o===0;return {icon:i,label:s,title:n,name:a,active:l}}renderGroups(){}render(){return f`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `}};y([E("slot")],he.prototype,"slotElement",2),y([h()],he.prototype,"active",2),y([$()],he.prototype,"forms",2);exports.AutoFormTabs=class Sr extends he{constructor(){super(...arguments);this.direction="top";this.hideLabel=false;}_getPlacement(){return this.direction==="left"?"start":this.direction==="right"?"end":this.direction}renderGroups(){return f`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${()=>this.dispatchEvent(new CustomEvent("tab-change"))}"
            >
                ${this.forms.map((e,o)=>{if(e.tagName!=="AUTO-FORM")return;let i=this.getFormInfo(e,o);return e.bind&&e.bind(this.store),e.setAttribute("border","none"),f`
                        <sl-tab
                            ?active=${i.active}
                            slot="nav"
                            title="${w(i.title||i.label)}"
                            panel="${o}"
                        >
                            ${i.icon?f`<sl-icon name="${i.icon}"></sl-icon>`:""}
                            ${B(!this.hideLabel&&i.label,()=>f`<span class="label">${i.label}</span>`)}
                        </sl-tab>
                    `})}
                ${this.forms.map((e,o)=>f`<sl-tab-panel name="${o}" class="scrollbar"
                            >${e}</sl-tab-panel
                        >`)}
            </sl-tab-group>
        `}};exports.AutoFormTabs.styles=[he.styles,x`
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
                background-color: var(--auto-title-bgcolor);
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
        `],y([h({type:String,reflect:true})],exports.AutoFormTabs.prototype,"direction",2),y([h({type:Boolean,reflect:true})],exports.AutoFormTabs.prototype,"hideLabel",2),exports.AutoFormTabs=y([R("auto-form-tabs")],exports.AutoFormTabs);var vp=x`
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
`;var se=class extends P{constructor(){super(...arguments),this.localize=new H(this),this.open=false,this.disabled=false;}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=true),this.detailsObserver=new MutationObserver(t=>{for(let r of t)r.type==="attributes"&&r.attributeName==="open"&&(this.details.open?this.show():this.hide());}),this.detailsObserver.observe(this.details,{attributes:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect();}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus());}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show());}async handleOpenChange(){if(this.open){if(this.details.open=true,this.emit("sl-show",{cancelable:true}).defaultPrevented){this.open=false,this.details.open=false;return}await te(this.body);let{keyframes:r,options:e}=Zt(this,"details.show",{dir:this.localize.dir()});await Qt(this.body,Hr(r,this.body.scrollHeight),e),this.body.style.height="auto",this.emit("sl-after-show");}else {if(this.emit("sl-hide",{cancelable:true}).defaultPrevented){this.details.open=true,this.open=true;return}await te(this.body);let{keyframes:r,options:e}=Zt(this,"details.hide",{dir:this.localize.dir()});await Qt(this.body,Hr(r,this.body.scrollHeight),e),this.body.style.height="auto",this.details.open=false,this.emit("sl-after-hide");}}async show(){if(!(this.open||this.disabled))return this.open=true,Ae(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=false,Ae(this,"sl-after-hide")}render(){let t=this.localize.dir()==="rtl";return f`
      <details
        part="base"
        class=${M({details:true,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
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
    `}};se.styles=[L,vp];se.dependencies={"sl-icon":q};p([E(".details")],se.prototype,"details",2);p([E(".details__header")],se.prototype,"header",2);p([E(".details__body")],se.prototype,"body",2);p([E(".details__expand-icon-slot")],se.prototype,"expandIconSlot",2);p([h({type:Boolean,reflect:true})],se.prototype,"open",2);p([h()],se.prototype,"summary",2);p([h({type:Boolean,reflect:true})],se.prototype,"disabled",2);p([O("open",{waitUntilFirstUpdate:true})],se.prototype,"handleOpenChange",1);Jt("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Jt("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});se.define("sl-details");var yp=x`
    ${xi}
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
        background-color: var(--auto-title-bgcolor);
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
        max-height: 0;
        padding: 0 15px;
        overflow: hidden;
        background-color: var(--auto-panel-bgcolor);
        border-bottom: var(--auto-border);
        visibility: hidden;
        flex-direction: column;
        box-sizing: border-box;
        color: var(--auto-color);
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
    ${Ye}
`;exports.AutoCollapse=class ye extends ut{constructor(){super(...arguments);this.active="";this.accordion=false;this.panels=[];this._activeArray=[];}firstUpdated(){this.panels=this.getPanels();}connectedCallback(){super.connectedCallback(),Er(),this._activeArray=this.active?this.active.split(","):[];}getPanels(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}updated(e){e.has("active")&&typeof this.active=="string"&&(this._activeArray=this.active?this.active.split(","):[]),super.updated(e);}togglePanel(e){let o=this._activeArray.indexOf(e);if(o===-1)this.accordion?this._activeArray=[e]:this._activeArray=[...this._activeArray,e];else {let i=[...this._activeArray];i.splice(o,1),this._activeArray=i;}this.active=this._activeArray.join(","),this.dispatchEvent(new CustomEvent("change",{detail:{active:this.active}}));}isPanelActive(e){return this._activeArray.includes(e)}_onActionClick(e,o){let i=new CustomEvent("action-click",{detail:{name:e},composed:true,bubbles:true});o.stopPropagation(),this.dispatchEvent(i);}_renderHeaderActions(e){let o=(e.getAttribute("data-actions")||"").split(",");if(o.length>0)return rt(o,i=>{let[s,n]=i.split(":");return f`<sl-icon
                    part="action"
                    class="icon action"
                    name=${s}
                    title=${n}
                    @click=${a=>{this._onActionClick(s,a);}}
                ></sl-icon>`})}_renderHeader(e){let o=e.getAttribute("name")||e.dataset.name||"",i=e.getAttribute("label")||e.dataset.label||"",s=e.getAttribute("icon")||e.dataset.icon||"",n=this.isPanelActive(o);return f`
            <div
                part="header"
                class="header ${M({active:n})}"
                @click=${()=>this.togglePanel(o)}
            >
                ${s?f`<sl-icon name="${s}" class="icon"></sl-icon>`:""}
                <div part="label" class="label">${i}</div>
                ${this._renderHeaderActions(e)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `}renderPanels(){return this.panels.map(e=>{let o=e.getAttribute("name")||e.dataset.name||"",i=this.isPanelActive(o),s=tt({padding:this.padding});return f`
                ${this._renderHeader(e)}
                <div
                    part="content"
                    class="content scrollbar ${M({active:i})}"
                    style=${s}
                >
                    ${e}
                </div>
            `})}_onSlotChange(){let e=this.getPanels();if(e.length>0){let o=this.panels.map(s=>s.getAttribute("name")||s.dataset.name).filter(s=>!!s),i=e.filter(s=>!o.includes(s.getAttribute("name")||s.dataset.name));this.panels.push(...i),this.requestUpdate();}}render(){return f`
            ${this.renderPanels()}
            <slot @slotchange=${this._onSlotChange.bind(this)} style="display:none;"></slot>
        `}};exports.AutoCollapse.styles=[yp],y([h({type:String,reflect:true})],exports.AutoCollapse.prototype,"active",2),y([h({type:String,reflect:true})],exports.AutoCollapse.prototype,"padding",2),y([h({type:Boolean,reflect:true})],exports.AutoCollapse.prototype,"accordion",2),y([$()],exports.AutoCollapse.prototype,"panels",2),y([$()],exports.AutoCollapse.prototype,"_activeArray",2),exports.AutoCollapse=y([R("auto-collapse")],exports.AutoCollapse);exports.AutoFormCollapse=class Ze extends he{constructor(){super(...arguments);this.active="";this.accordion=false;}renderGroups(){return f`
            <auto-collapse
                style="flex-grow:1;min-height:0"
                active=${w(this.active)}
                padding=${w(this.padding)}
                ?accordion=${this.accordion}
            >
                ${this.forms.map(e=>{if(e.tagName==="AUTO-FORM")return e.bind&&e.bind(this.store),e.setAttribute("border","none"),e})}
            </auto-collapse>
        `}};exports.AutoFormCollapse.styles=[he.styles,x`
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
        `],y([h({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"active",2),y([h({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"padding",2),y([h({type:Boolean,reflect:true})],exports.AutoFormCollapse.prototype,"accordion",2),exports.AutoFormCollapse=y([R("auto-form-collapse")],exports.AutoFormCollapse);var xp=x`
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

`;exports.AutoFlex=class Ht extends ut{constructor(){super(...arguments);this.classes=new De(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let e=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=e,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(o=>{o.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(o=>{o.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(e,o,i){super.attributeChangedCallback(e,o,i),this.updateStyles();}render(){return f` <slot></slot> `}};exports.AutoFlex.styles=xp,y([h({type:String})],exports.AutoFlex.prototype,"direction",2),y([h({type:String})],exports.AutoFlex.prototype,"gap",2),y([h({type:Boolean})],exports.AutoFlex.prototype,"wrap",2),y([h({type:String})],exports.AutoFlex.prototype,"align",2),y([h({type:String})],exports.AutoFlex.prototype,"justify",2),y([h({type:String})],exports.AutoFlex.prototype,"border",2),y([h({type:String})],exports.AutoFlex.prototype,"grow",2),y([h({type:String})],exports.AutoFlex.prototype,"shrink",2),y([h({type:Boolean,reflect:true})],exports.AutoFlex.prototype,"fit",2),exports.AutoFlex=y([R("auto-flex")],exports.AutoFlex);exports.AutoLoading=class Qe extends ut{constructor(){super(...arguments);this.tips="Loading";this.hide=false;this.size="2em";}render(){return this.hide?f``:f`  
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
    `,y([h({type:String})],exports.AutoLoading.prototype,"tips",2),y([h({type:Boolean})],exports.AutoLoading.prototype,"hide",2),y([h({type:String})],exports.AutoLoading.prototype,"size",2),exports.AutoLoading=y([R("auto-loading")],exports.AutoLoading);Y.define("sl-button");F.define("sl-input");var _p=x`
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
`;var ei=class extends P{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};ei.styles=[L,_p];p([h({type:Boolean,reflect:true})],ei.prototype,"vertical",2);p([O("vertical")],ei.prototype,"handleVerticalChange",1);ei.define("sl-divider");bt.define("sl-dropdown");Te.define("sl-spinner");dt.define("sl-icon-button");var Ts=class{constructor(r){this.store=r;}getFullPath(r){let e=this.store.options.configKey||"";return e?`${e}.${r.join(".")}`:r.join(".")}getSchema(r){let e=this.getFullPath(r);return this.store.configManager?.state[e]?.options}getAllSchemas(){console.log("[SchemaAccessor] \u5F00\u59CB\u83B7\u53D6 schemas"),console.log("[SchemaAccessor] store.id:",this.store.id),console.log("[SchemaAccessor] store.configKey:",this.store.configKey),console.log("[SchemaAccessor] store.options.configKey:",this.store.options.configKey);let r=this.store.configManager;if(!r)return console.warn("[SchemaAccessor] configManager \u4E0D\u5B58\u5728\uFF01"),{};let e=this.store.configKey||"",o=e?`${e}.`:"";console.log("[SchemaAccessor] \u5B9E\u9645 configKey:",e),console.log("[SchemaAccessor] keyPrefix:",o),console.log("[SchemaAccessor] configManager.state keys:",Object.keys(r.state));let i={};return Object.entries(r.state).forEach(([s,n])=>{if(s.startsWith(o)){let a=s.substring(o.length);i[a]=n?.options,console.log(`[SchemaAccessor] \u2705 \u5339\u914D: ${s} \u2192 ${a}`);}}),console.log("[SchemaAccessor] \u6700\u7EC8 schemas:",i),i}getFieldValue(r){return et(this.store.state,r)}setFieldValue(r,e){let o=this.getFullPath(r),i=this.store.configManager?.state[o];i&&i.value!==void 0&&(i.value=e);}hasSchema(r){return !!this.getSchema(r)}getFieldError(r){let e=this.getFullPath(r);return this.store.configManager?.errors[e]}};var it=class it extends ut{constructor(){super(...arguments);this.classs=new De(this);this.ctxController=new Ir(this);this.seq=++it.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";}static{this.seq=0;}static{this.styles=Os;}get activeStore(){return this.internalStore||this.store}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}connectedCallback(){if(super.connectedCallback(),this.state&&!this.store)this._initializeInternalStore();else if(this.store)this._validateExternalStore(),this._initializeWithStore(this.store);else {console.warn("[AutoForm] \u65E2\u6CA1\u6709 .state \u4E5F\u6CA1\u6709 .store \u5C5E\u6027\uFF0C\u65E0\u6CD5\u521D\u59CB\u5316");return}Er();}_initializeInternalStore(){console.log("[AutoForm] \u4F7F\u7528\u6807\u51C6\u6A21\u5F0F\uFF1A\u5185\u90E8\u521B\u5EFA AutoStore + ConfigManager"),this.internalConfigManager=new xs({load:()=>({})}),this.internalStore=new mr(this.state,{configManager:this.internalConfigManager,configKey:""}),this._initializeWithStore(this.internalStore);}_validateExternalStore(){if(!this.store){console.error("[AutoForm] .store \u5C5E\u6027\u4E0D\u5B58\u5728");return}if(!this.store.configManager)throw console.error("[AutoForm] \u4F7F\u7528 .store \u5C5E\u6027\u65F6\uFF0Cstore \u5FC5\u987B\u6709 configManager\uFF01\u8BF7\u521B\u5EFA ConfigManager \u5E76\u4F20\u5165\uFF1Anew AutoStore(state, { configManager }) \u6216\u4F7F\u7528\u63A8\u8350\u7684 .state \u5C5E\u6027\u8BA9 AutoForm \u81EA\u52A8\u521B\u5EFA\u3002"),new Error("AutoForm requires store to have a configManager when using .store property")}_initializeWithStore(e){this.schemaAccessor=new Ts(e),this._initialContext(),this._loadSchemas();}shouldUpdate(e){return e.has("state")?(this.internalConfigManager&&this.internalConfigManager.remove(this.internalStore),this._initializeInternalStore()):e.has("store")&&this.store&&(this._validateExternalStore(),this._initializeWithStore(this.store)),true}_initialContext(){Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit});}_isValid(){let e=this.store?.configManager;if(!e)return  false;if(this.path){let o=e.errors||{},i=this.path.split(".");return Object.keys(o).some(s=>No(i,s.split(".")))}else return Object.keys(e.errors||{}).length>0}_loadSchemas(){if(!this.schemaAccessor){console.warn("[AutoForm] schemaAccessor not initialized");return}let e=this.schemaAccessor.getAllSchemas();console.log("[AutoForm] Loaded schemas:",e);let o=Object.entries(e).map(([i,s])=>({...s,path:i.split(".")}));console.log("[AutoForm] Schema array count:",o.length),o=o.filter(i=>this._matchesGroup(i)),o=o.filter(i=>this._matchesAdvanced(i)),o=o.filter(i=>this._matchesPath(i)),o.sort((i,s)=>(i.order||0)-(s.order||0)),console.log("[AutoForm] Final schemas count:",o.length),this.schemas=o,this.requestUpdate();}_matchesGroup(e){if(!this.group)return  true;let o=(e.group||"").split(","),i=this.group.split(",");return o.some(s=>i.includes(s))}_matchesAdvanced(e){return !(this.advanced===false&&e.advanced)}_matchesPath(e){if(!this.path)return  true;let o=e.path||[];return this.path.split(",").map(s=>s.trim().split(".")).some(s=>o.length<s.length?false:s.every((n,a)=>o[a]===n))}bind(e){if(e){if(!e.configManager){console.error("[AutoForm] bind() \u65B9\u6CD5\u7684 store \u5FC5\u987B\u6709 configManager");return}this.store=e,this._initializeWithStore(e);}}clearErrors(){this.activeStore?.configManager&&this.activeStore?.update(()=>{}),Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(i=>{i.tagName.startsWith("auto-field")&&(i.invalidTips=void 0);}),this.requestUpdate();}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),f`
            <div class="actions header"></div>
            <div class="fields">
				${rt(this.schemas,(e,o)=>`field-${o}`,e=>this._renderField(e))}
            </div>
            <div class="actions footer"></div>
        `}_renderField(e){let i=`auto-field-${e.widget||"input"}`;return f`
			<${i}
				.schema=${e}
				part="field"
				exportparts="field-value,field-label,field-help"
				size=${this.size}
			></${i}>
		`}reset(){this.activeStore?.reset(),this._initialContext(),Mr(this,"dirty",false),Mr(this,"invalid",false);}submit(e){if(typeof e=="function"){let o=this.activeStore?.configManager,i=this.activeStore?.options.configKey||"",s=i?`${i}.`:"",n=o?Object.entries(o.state).reduce((l,[c,d])=>{let u=c.substring(s.length);return l[u]=d.value,l},{}):{},a=o?o.errors:{};e(n,a);}}};y([en({context:yi})],it.prototype,"context",2),y([$()],it.prototype,"schemas",2),y([h({type:Object})],it.prototype,"store",2),y([h({type:Object})],it.prototype,"state",2),y([h({type:Boolean,reflect:true})],it.prototype,"validAtInit",2),y([h({type:String,reflect:true})],it.prototype,"group",2),y([h({type:String,reflect:true})],it.prototype,"icon",2),y([h({type:String,reflect:true})],it.prototype,"path",2),y([h({type:Boolean,reflect:true})],it.prototype,"compact",2),y([h({type:Boolean,reflect:true})],it.prototype,"advanced",2),y([h({type:String,reflect:true})],it.prototype,"validAt",2),y([h({type:String,reflect:true})],it.prototype,"border",2),y([h({type:String})],it.prototype,"size",2),y([h({type:String,reflect:true})],it.prototype,"labelPos",2),y([h({type:String,reflect:true})],it.prototype,"labelWidth",2),y([h({type:Boolean,reflect:true})],it.prototype,"dark",2),y([h({type:Boolean,reflect:true})],it.prototype,"readonly",2),y([h({type:Boolean,reflect:true})],it.prototype,"viewonly",2),y([h({type:String,reflect:true})],it.prototype,"viewAlign",2),y([h({type:String,reflect:true})],it.prototype,"layout",2),y([h({type:String,reflect:true})],it.prototype,"icons",2);var Fn=it;customElements.get("auto-form")||customElements.define("auto-form",Fn);var Uh=Object.defineProperty,It=(t,r)=>Uh(t,"name",{value:r,configurable:true}),io=(t=>typeof Mt<"u"?Mt:typeof Proxy<"u"?new Proxy(t,{get:(r,e)=>(typeof Mt<"u"?Mt:r)[e]}):t)(function(t){if(typeof Mt<"u")return Mt.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});function wp(t){globalThis.__AUTOSTORE_PLUGINS__||(globalThis.__AUTOSTORE_PLUGINS__=[]),globalThis.__AUTOSTORE_PLUGINS__.push(t);}It(wp,"installPlugin");async function Sp(t){return new Promise((r,e)=>setTimeout(r,t))}It(Sp,"t");(t=>typeof io<"u"?io:typeof Proxy<"u"?new Proxy(t,{get:It((r,e)=>(typeof io<"u"?io:r)[e],"get")}):t)(function(t){if(typeof io<"u")return io.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});function Cp(t,r,e){let o=t,i=r.length-1;r.forEach((s,n)=>{let a=qr(o);if(n===i){let l=a?o.get(s):o[s];typeof l=="object"&&Object.assign(l,e);return}a?(o.has(s)||o.set(s,{}),o=o.get(s)):(s in o||(o[s]={}),o=o[s]);});}It(Cp,"updateObjectVal");var Wh=class extends We{static{It(this,"AsyncProComputedObject");}_isRunning=false;_defaultAbortController=null;_userAbortController;_firstRun=false;lite=false;get async(){return  true}get value(){return super.value}set value(t){super.value=t;}get running(){return this._isRunning}onInitOptions(t){t.reentry===void 0&&(t.reentry=this.store.options.reentry);}onInitial(){this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(()=>{(this.options.immediate===true||this.options.immediate==="auto"&&this.options.initial===void 0)&&this.run({first:true});},0);}onDestroy(){try{this._isRunning&&this.getAbortController().abort();}catch{}}createAsyncComputedValue(){return Object.assign({loading:false,timeout:0,retry:0,error:null,value:this.options.initial,progress:0,run:gt(t=>this.store.computedObjects.run(this.id,Object.assign({},t))),cancel:gt(()=>{this.getAbortController().abort();})})}updateComputedValue(t){let r=this.strPath,e=Object.keys(t).length;if(this.associated)this.store.update(o=>{Cp(o,this.path,t);},{batch:e>1?r:false});else {Object.assign(this.value,t);let o=e>1,i=[];Object.entries(t).forEach(([s,n])=>{let a={type:"set",path:[...this.path,s],value:n,parent:this.value};o&&(a.reply=true),this.store.operates.emit(`${this.strPath}.${s}`,a),i.push(a);}),o&&this.store.operates.emit(this.strPath,{type:"batch",path:this.path,value:i});}}async run(t){let{first:r}=t??{};if(this.isDisable(t?.enable)){this.store.logger.warn(()=>`Async computed <${this.toString()}> is disabled`);return}let e=this.error!==void 0;this.error=void 0,this._firstRun=true,r||this.store.logger.info(()=>`Run async computed for : ${this.toString()}`);let o=t?Object.assign({first:r},this.options,t):this.options,i=Ue(this,"sync",this.context,o),{reentry:s}=o;if(this._isRunning&&!s){this.store.logger.warn(()=>`Async computed: ${this.toString()} is running, can't reentry`),st(this.store,`observer/${this.id}/cancel`,{reason:"reentry",observer:this});return}this._isRunning=true;try{return await this.executeGetter(i,o,e)}finally{this._isRunning=false;}}getValue(){return this.value.value}createComputeProgressbar(t){let{max:r=100,min:e=0,value:o=0}=Object.assign({},t);return this.updateComputedValue({progress:o}),{value:It(i=>{i>r&&(i=r),i<e&&(i=e),this.updateComputedValue({progress:i});},"value"),end(){this.value(r);}}}getAbortController(t){if(t&&typeof t.abortController=="function"){let r=t.abortController();r&&r instanceof AbortController&&(this._userAbortController=r);}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}setTimeoutControl(t,r,e){let{timeout:o}=e,[i,s]=Array.isArray(o)?o:[o,0],n,a;return i>0&&(r.timeout=s>1?s:i,a=setTimeout(()=>{t.hasTimeout=true,t.hasError=true,t.error="TIMEOUT",typeof t.timeoutCallback=="function"&&t.timeoutCallback(),clearInterval(n),this.updateComputedValue({loading:false,error:"TIMEOUT",timeout:0});},i),s>1&&(n=setInterval(()=>{this.updateComputedValue({timeout:s--}),s===0&&clearInterval(n);},i/(s+1)))),{clear:It(()=>{clearTimeout(a),clearInterval(n);},"clear"),enable:i>0}}async executeGetter(t,r,e=false){let{retry:o}=r,[i,s]=o?Array.isArray(o)?o:[Number(o),0]:[0,0],n,a=this.getAbortController(r),l={onTimeout:It(g=>{n=g;},"onTimeout"),getProgressbar:this.createComputeProgressbar.bind(this),getSnap:It(g=>ls(g),"getSnap"),cancel:a.abort.bind(a),extras:r.extras,operate:r.operate,first:r.first,abortSignal:a.signal},c={error:null,hasError:false,hasTimeout:false,hasAbort:false,timeoutCallback:n},d=It(()=>{c.hasAbort=true;},"abortHandler");a.signal.addEventListener("abort",d),this.error=void 0;let u={clear:It(()=>{},"clear"),enable:false},m;try{let g=It(b=>Object.assign(c,b),"updateCtx");for(let b=0;b<i+1;b++){let v={};try{let k={loading:!0};if(e&&(k.error=null),i>0&&(k.retry=b>0?i-b+1:0),b>0&&g({error:null,hasError:!1,hasTimeout:!1}),u=this.setTimeoutControl(c,k,r),this.updateComputedValue(k),c.hasAbort)throw new Fo;if(st(this.store,`observer/${this.id}/run`,{args:l,observer:this,scope:t}),m=await this.getter.call(this,t,l),c.hasAbort)throw new Fo;c.hasTimeout||(r.raw&&gt(m),v.value=m,e&&(v.error=null),u.enable&&(v.timeout=0));}catch(k){if(c.hasError=!0,c.error=k,c.hasTimeout||(v.error=cc(k).message),Et(r.onError)){let C=r.onError(k);C!==void 0&&(v.value=C);}}finally{u.clear(),b===i&&(c.hasTimeout&&(v.error=c.error),i>0&&(v.retry=0)),v.loading=!1,this.updateComputedValue(v);}c.hasError&&i>0&&s>0&&b<i&&await Sp(s);}c.hasAbort?st(this.store,`observer/${this.id}/cancel`,{reason:"abort",observer:this}):c.hasError||c.hasTimeout?(this.error=c.error,st(this.store,`observer/${this.id}/error`,{error:c.error,observer:this})):st(this.store,`observer/${this.id}/done`,{value:m,observer:this}),this.onDoneCallback(r,c.error,c.hasAbort,c.hasTimeout,t,m);}finally{a.signal.removeEventListener("abort",d);}}onDoneCallback(t,r,e,o,i,s){typeof t.onDone=="function"&&t.onDone.call(this,{id:this.id,path:this.path,value:s,error:r,abort:e,timeout:o,scope:i});}onDependsChange(t){this.store.logger.debug(()=>`AsyncComputed<${this.id}> is running by depends ${t.type}/${t.path.join(".")} operate `),this.run({operate:t,first:!this._firstRun});}getValueWatchPath(){let t=this.path.join(this.store.options.delimiter);return [`${t}.*`,t]}getDepends(){return super.getDepends().map(t=>{if(t.length===0)return t;for(let r of this.store.computedObjects.values())if(Kr(r.path,t)&&r.async)return [`${t.join(this.store.options.delimiter)}.value`];return t})}};function so(t,r,e){if(typeof t!="function")throw new Error("computed getter must be a function");let o=Object.assign({},Wr(),e,{async:true});o.depends=Bo(r);let i=It(()=>({type:"asyncpro",getter:t,options:o,[Qi]:true}),"descriptorBuilder");return i[ee]="asyncpro",i}It(so,"asyncComputed");function kp(t){let r=t.constructor.observers;r.asyncpro=(e,o,i)=>{let s=new Wh(e,o,i);return e.computedObjects.set(s.id,s),s},t.options.sandbox||(t.options.sandbox={}),t.options.sandbox.context||(t.options.sandbox.context={}),t.options.sandbox.context.asyncComputed=so;}It(kp,"asyncpro");wp(kp);var jn=class{static createAsyncComputedField(r,e,o,i,s){let n=so(o,i,s||{timeout:8e3,retry:2}),a=e.join(".");return r.configManager?.add(r,a,n),n}static subscribeToAsyncValue(r,e){r.run();let o=false,i=setInterval(()=>{!r.loading&&!o&&(r.error||(e(r.value),o=true),clearInterval(i));},100);return ()=>{clearInterval(i),r.cancel?.();}}static getAsyncState(r){return {loading:r.loading||false,progress:r.progress||0,error:r.error,value:r.value}}static createProgressiveAsyncField(r,e,o,i){let s=so(o,i,{timeout:[1e4,100],retry:[3,1e3],immediate:true}),n=e.join(".");return r.configManager?.add(r,n,s),s}};/*! Bundled license information:

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
*/exports.AsyncFieldHandler=jn;exports.AutoField=I;exports.AutoForm=Fn;exports.asyncComputed=so;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map