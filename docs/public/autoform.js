var AutoForm=(function(exports){'use strict';var oa=Object.defineProperty;var ra=Object.getOwnPropertyDescriptor;var $e=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(o,e)=>(typeof require<"u"?require:o)[e]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var y=(t,o,e,r)=>{for(var i=r>1?void 0:r?ra(o,e):o,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(r?n(o,e,i):n(i))||i);return r&&i&&oa(o,e,i),i};var pr=globalThis,ir=pr.trustedTypes,ps=ir?ir.createPolicy("lit-html",{createHTML:t=>t}):void 0,ai="$lit$",Jt=`lit$${Math.random().toFixed(9).slice(2)}$`,ci="?"+Jt,ia=`<${ci}>`,Oe=pr.document===void 0?{createTreeWalker:()=>({})}:document,go=()=>Oe.createComment(""),bo=t=>t===null||typeof t!="object"&&typeof t!="function",pi=Array.isArray,gs=t=>pi(t)||typeof t?.[Symbol.iterator]=="function",li=`[ 	
\f\r]`,fo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,hs=/-->/g,us=/>/g,Ee=RegExp(`>|${li}(?:([^\\s"'>=/]+)(${li}*=${li}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ds=/'/g,ms=/"/g,bs=/^(?:script|style|textarea|title)$/i,hi=t=>(o,...e)=>({_$litType$:t,strings:o,values:e}),d=hi(1),st=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),fs=new WeakMap,Ae=Oe.createTreeWalker(Oe,129);function xs(t,o){if(!pi(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ps!==void 0?ps.createHTML(o):o}var ws=(t,o)=>{let e=t.length-1,r=[],i,s=o===2?"<svg>":o===3?"<math>":"",n=fo;for(let c=0;c<e;c++){let a=t[c],u,f,p=-1,m=0;for(;m<a.length&&(n.lastIndex=m,f=n.exec(a),f!==null);)m=n.lastIndex,n===fo?f[1]==="!--"?n=hs:f[1]!==void 0?n=us:f[2]!==void 0?(bs.test(f[2])&&(i=RegExp("</"+f[2],"g")),n=Ee):f[3]!==void 0&&(n=Ee):n===Ee?f[0]===">"?(n=i??fo,p=-1):f[1]===void 0?p=-2:(p=n.lastIndex-f[2].length,u=f[1],n=f[3]===void 0?Ee:f[3]==='"'?ms:ds):n===ms||n===ds?n=Ee:n===hs||n===us?n=fo:(n=Ee,i=void 0);let g=n===Ee&&t[c+1].startsWith("/>")?" ":"";s+=n===fo?a+ia:p>=0?(r.push(u),a.slice(0,p)+ai+a.slice(p)+Jt+g):a+Jt+(p===-2?c:g);}return [xs(t,s+(t[e]||"<?>")+(o===2?"</svg>":o===3?"</math>":"")),r]},vo=class t{constructor({strings:o,_$litType$:e},r){let i;this.parts=[];let s=0,n=0,c=o.length-1,a=this.parts,[u,f]=ws(o,e);if(this.el=t.createElement(u,r),Ae.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes);}for(;(i=Ae.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(ai)){let m=f[n++],g=i.getAttribute(p).split(Jt),b=/([.?@])?(.*)/.exec(m);a.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?nr:b[1]==="?"?lr:b[1]==="@"?ar:Ie}),i.removeAttribute(p);}else p.startsWith(Jt)&&(a.push({type:6,index:s}),i.removeAttribute(p));if(bs.test(i.tagName)){let p=i.textContent.split(Jt),m=p.length-1;if(m>0){i.textContent=ir?ir.emptyScript:"";for(let g=0;g<m;g++)i.append(p[g],go()),Ae.nextNode(),a.push({type:2,index:++s});i.append(p[m],go());}}}else if(i.nodeType===8)if(i.data===ci)a.push({type:2,index:s});else {let p=-1;for(;(p=i.data.indexOf(Jt,p+1))!==-1;)a.push({type:7,index:s}),p+=Jt.length-1;}s++;}}static createElement(o,e){let r=Oe.createElement("template");return r.innerHTML=o,r}};function Te(t,o,e=t,r){if(o===st)return o;let i=r!==void 0?e._$Co?.[r]:e._$Cl,s=bo(o)?void 0:o._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(false),s===void 0?i=void 0:(i=new s(t),i._$AT(t,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(o=Te(t,i._$AS(t,o.values),i,r)),o}var sr=class{constructor(o,e){this._$AV=[],this._$AN=void 0,this._$AD=o,this._$AM=e;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(o){let{el:{content:e},parts:r}=this._$AD,i=(o?.creationScope??Oe).importNode(e,true);Ae.currentNode=i;let s=Ae.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let u;a.type===2?u=new Ge(s,s.nextSibling,this,o):a.type===1?u=new a.ctor(s,a.name,a.strings,this,o):a.type===6&&(u=new cr(s,this,o)),this._$AV.push(u),a=r[++c];}n!==a?.index&&(s=Ae.nextNode(),n++);}return Ae.currentNode=Oe,i}p(o){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(o,r,e),e+=r.strings.length-2):r._$AI(o[e])),e++;}},Ge=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(o,e,r,i){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=o,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??true;}get parentNode(){let o=this._$AA.parentNode,e=this._$AM;return e!==void 0&&o?.nodeType===11&&(o=e.parentNode),o}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(o,e=this){o=Te(this,o,e),bo(o)?o===Q||o==null||o===""?(this._$AH!==Q&&this._$AR(),this._$AH=Q):o!==this._$AH&&o!==st&&this._(o):o._$litType$!==void 0?this.$(o):o.nodeType!==void 0?this.T(o):gs(o)?this.k(o):this._(o);}O(o){return this._$AA.parentNode.insertBefore(o,this._$AB)}T(o){this._$AH!==o&&(this._$AR(),this._$AH=this.O(o));}_(o){this._$AH!==Q&&bo(this._$AH)?this._$AA.nextSibling.data=o:this.T(Oe.createTextNode(o)),this._$AH=o;}$(o){let{values:e,_$litType$:r}=o,i=typeof r=="number"?this._$AC(o):(r.el===void 0&&(r.el=vo.createElement(xs(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else {let s=new sr(i,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s;}}_$AC(o){let e=fs.get(o.strings);return e===void 0&&fs.set(o.strings,e=new vo(o)),e}k(o){pi(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let s of o)i===e.length?e.push(r=new t(this.O(go()),this.O(go()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i);}_$AR(o=this._$AA.nextSibling,e){for(this._$AP?.(false,true,e);o&&o!==this._$AB;){let r=o.nextSibling;o.remove(),o=r;}}setConnected(o){this._$AM===void 0&&(this._$Cv=o,this._$AP?.(o));}},Ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(o,e,r,i,s){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=o,this.name=e,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Q;}_$AI(o,e=this,r,i){let s=this.strings,n=false;if(s===void 0)o=Te(this,o,e,0),n=!bo(o)||o!==this._$AH&&o!==st,n&&(this._$AH=o);else {let c=o,a,u;for(o=s[0],a=0;a<s.length-1;a++)u=Te(this,c[r+a],e,a),u===st&&(u=this._$AH[a]),n||=!bo(u)||u!==this._$AH[a],u===Q?o=Q:o!==Q&&(o+=(u??"")+s[a+1]),this._$AH[a]=u;}n&&!i&&this.j(o);}j(o){o===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,o??"");}},nr=class extends Ie{constructor(){super(...arguments),this.type=3;}j(o){this.element[this.name]=o===Q?void 0:o;}},lr=class extends Ie{constructor(){super(...arguments),this.type=4;}j(o){this.element.toggleAttribute(this.name,!!o&&o!==Q);}},ar=class extends Ie{constructor(o,e,r,i,s){super(o,e,r,i,s),this.type=5;}_$AI(o,e=this){if((o=Te(this,o,e,0)??Q)===st)return;let r=this._$AH,i=o===Q&&r!==Q||o.capture!==r.capture||o.once!==r.once||o.passive!==r.passive,s=o!==Q&&(r===Q||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,o),this._$AH=o;}handleEvent(o){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,o):this._$AH.handleEvent(o);}},cr=class{constructor(o,e,r){this.element=o,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r;}get _$AU(){return this._$AM._$AU}_$AI(o){Te(this,o);}},_s={I:Ge},sa=pr.litHtmlPolyfillSupport;sa?.(vo,Ge),(pr.litHtmlVersions??=[]).push("3.3.0");var Cs=(t,o,e)=>{let r=e?.renderBefore??o,i=r._$litPart$;if(i===void 0){let s=e?.renderBefore??null;r._$litPart$=i=new Ge(o.insertBefore(go(),s),s,void 0,e??{});}return i._$AI(t),i};var C=t=>t??Q;var Ss=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(o){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=o;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var Yt=function(t,o,e,r,i){if(typeof o=="function"?t!==o||true:!o.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return o.set(t,e),e},dt=function(t,o,e,r){if(typeof o=="function"?t!==o||true:!o.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?r:e==="a"?r.call(t):r?r.value:o.get(t)},Ye,hr,ur,yo,ui,xo,dr,Re,wo,de,mr,ks,$s=t=>typeof t=="boolean"?t:t?.capture??false;var na=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(o,e,r){if(e==null)return;let i=$s(r)?this.__captureEventListeners:this.__eventListeners,s=i.get(o);if(s===void 0)s=new Map,i.set(o,s);else if(s.has(e))return;let n=typeof r=="object"&&r?r:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(o,e,r)),s.set(e,n??{});}removeEventListener(o,e,r){if(e==null)return;let i=$s(r)?this.__captureEventListeners:this.__eventListeners,s=i.get(o);s!==void 0&&(s.delete(e),s.size||i.delete(o));}dispatchEvent(o){let e=[this],r=this.__eventTargetParent;if(o.composed)for(;r;)e.push(r),r=r.__eventTargetParent;else for(;r&&r!==this.__host;)e.push(r),r=r.__eventTargetParent;let i=false,s=false,n=0,c=null,a=null,u=null,f=o.stopPropagation,p=o.stopImmediatePropagation;Object.defineProperties(o,{target:{get(){return c??a},...Z},srcElement:{get(){return o.target},...Z},currentTarget:{get(){return u},...Z},eventPhase:{get(){return n},...Z},composedPath:{value:()=>e,...Z},stopPropagation:{value:()=>{i=true,f.call(o);},...Z},stopImmediatePropagation:{value:()=>{s=true,p.call(o);},...Z}});let m=(k,_,$)=>{typeof k=="function"?k(o):typeof k?.handleEvent=="function"&&k.handleEvent(o),_.once&&$.delete(k);},g=()=>(u=null,n=0,!o.defaultPrevented),b=e.slice().reverse();c=!this.__host||!o.composed?this:null;let v=k=>{for(a=this;a.__host&&k.includes(a.__host);)a=a.__host;};for(let k of b){!c&&(!a||a===k.__host)&&v(b.slice(b.indexOf(k))),u=k,n=k===o.target?2:1;let _=k.__captureEventListeners.get(o.type);if(_){for(let[$,x]of _)if(m($,x,_),s)return g()}if(i)return g()}let A=o.bubbles?e:[this];a=null;for(let k of A){!c&&(!a||k===a.__host)&&v(A.slice(0,A.indexOf(k)+1)),u=k,n=k===o.target?2:3;let _=k.__eventListeners.get(o.type);if(_){for(let[$,x]of _)if(m($,x,_),s)return g()}if(i)return g()}return g()}},di=na;var Z={__proto__:null};Z.enumerable=true;Object.freeze(Z);var mi=(de=class{constructor(o,e={}){if(Ye.set(this,false),hr.set(this,false),ur.set(this,false),yo.set(this,false),ui.set(this,Date.now()),xo.set(this,false),dr.set(this,void 0),Re.set(this,void 0),wo.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof e!="object"||!e)throw new Error('The "options" argument must be an object');let{bubbles:r,cancelable:i,composed:s}=e;Yt(this,Ye,!!i),Yt(this,hr,!!r),Yt(this,ur,!!s),Yt(this,dr,`${o}`),Yt(this,Re,null),Yt(this,wo,false);}initEvent(o,e,r){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){Yt(this,yo,true);}get target(){return dt(this,Re,"f")}get currentTarget(){return dt(this,Re,"f")}get srcElement(){return dt(this,Re,"f")}get type(){return dt(this,dr,"f")}get cancelable(){return dt(this,Ye,"f")}get defaultPrevented(){return dt(this,Ye,"f")&&dt(this,yo,"f")}get timeStamp(){return dt(this,ui,"f")}composedPath(){return dt(this,wo,"f")?[dt(this,Re,"f")]:[]}get returnValue(){return !dt(this,Ye,"f")||!dt(this,yo,"f")}get bubbles(){return dt(this,hr,"f")}get composed(){return dt(this,ur,"f")}get eventPhase(){return dt(this,wo,"f")?de.AT_TARGET:de.NONE}get cancelBubble(){return dt(this,xo,"f")}set cancelBubble(o){o&&Yt(this,xo,true);}stopPropagation(){Yt(this,xo,true);}get isTrusted(){return  false}},Ye=new WeakMap,hr=new WeakMap,ur=new WeakMap,yo=new WeakMap,ui=new WeakMap,xo=new WeakMap,dr=new WeakMap,Re=new WeakMap,wo=new WeakMap,de.NONE=0,de.CAPTURING_PHASE=1,de.AT_TARGET=2,de.BUBBLING_PHASE=3,de);Object.defineProperties(mi.prototype,{initEvent:Z,stopImmediatePropagation:Z,preventDefault:Z,target:Z,currentTarget:Z,srcElement:Z,type:Z,cancelable:Z,defaultPrevented:Z,timeStamp:Z,composedPath:Z,returnValue:Z,bubbles:Z,composed:Z,eventPhase:Z,cancelBubble:Z,stopPropagation:Z,isTrusted:Z});var Es=(ks=class extends mi{constructor(o,e={}){super(o,e),mr.set(this,void 0),Yt(this,mr,e?.detail??null);}initCustomEvent(o,e,r,i){throw new Error("Method not implemented.")}get detail(){return dt(this,mr,"f")}},mr=new WeakMap,ks);Object.defineProperties(Es.prototype,{detail:Z});var fi=mi,gi=Es;globalThis.Event??=fi;globalThis.CustomEvent??=gi;var As=new WeakMap,_o=t=>{let o=As.get(t);return o===void 0&&As.set(t,o=new Map),o},la=class extends di{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(_o(this)).map(([o,e])=>({name:o,value:e}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(o,e){_o(this).set(o,String(e));}removeAttribute(o){_o(this).delete(o);}toggleAttribute(o,e){if(this.hasAttribute(o)){if(e===void 0||!e)return this.removeAttribute(o),false}else return e===void 0||e?(this.setAttribute(o,""),true):false;return  true}hasAttribute(o){return _o(this).has(o)}attachShadow(o){let e={host:this};return this.__shadowRootMode=o.mode,o&&o.mode==="open"&&(this.__shadowRoot=e),e}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let o=new Ss(this);return this.__internals=o,o}getAttribute(o){return _o(this).get(o)??null}};var aa=class extends la{},bi=aa;globalThis.litServerRoot??=Object.defineProperty(new bi,"localName",{get(){return "lit-server-root"}});var ca=class{constructor(){this.__definitions=new Map;}define(o,e){if(this.__definitions.has(o))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${o}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${o}" has already been used with this registry`);e.__localName=o,this.__definitions.set(o,{ctor:e,observedAttributes:e.observedAttributes??[]});}get(o){return this.__definitions.get(o)?.ctor}},pa=ca;var Os=new pa;var Co=globalThis,fr=Co.ShadowRoot&&(Co.ShadyCSS===void 0||Co.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,vi=Symbol(),Ts=new WeakMap,So=class{constructor(o,e,r){if(this._$cssResult$=true,r!==vi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=e;}get styleSheet(){let o=this.o,e=this.t;if(fr&&o===void 0){let r=e!==void 0&&e.length===1;r&&(o=Ts.get(e)),o===void 0&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),r&&Ts.set(e,o));}return o}toString(){return this.cssText}},Is=t=>new So(typeof t=="string"?t:t+"",void 0,vi),w=(t,...o)=>{let e=t.length===1?t[0]:o.reduce((r,i,s)=>r+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new So(e,t,vi)},Rs=(t,o)=>{if(fr)t.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of o){let r=document.createElement("style"),i=Co.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,t.appendChild(r);}},yi=fr||Co.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(o=>{let e="";for(let r of o.cssRules)e+=r.cssText;return Is(e)})(t):t;var{is:ha,defineProperty:ua,getOwnPropertyDescriptor:da,getOwnPropertyNames:ma,getOwnPropertySymbols:fa,getPrototypeOf:ga}=Object,$o=globalThis;$o.customElements??=Os;var Vs=$o.trustedTypes,ba=Vs?Vs.emptyScript:"",va=$o.reactiveElementPolyfillSupport,ko=(t,o)=>t,me={toAttribute(t,o){switch(o){case Boolean:t=t?ba:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,o){let e=t;switch(o){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t);}catch{e=null;}}return e}},gr=(t,o)=>!ha(t,o),zs={attribute:true,type:String,converter:me,reflect:false,useDefault:false,hasChanged:gr};Symbol.metadata??=Symbol("metadata"),$o.litPropertyMetadata??=new WeakMap;var te=class extends(globalThis.HTMLElement??bi){static addInitializer(o){this._$Ei(),(this.l??=[]).push(o);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(o,e=zs){if(e.state&&(e.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(o)&&((e=Object.create(e)).wrapped=true),this.elementProperties.set(o,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(o,r,e);i!==void 0&&ua(this.prototype,o,i);}}static getPropertyDescriptor(o,e,r){let{get:i,set:s}=da(this.prototype,o)??{get(){return this[e]},set(n){this[e]=n;}};return {get:i,set(n){let c=i?.call(this);s?.call(this,n),this.requestUpdate(o,c,r);},configurable:true,enumerable:true}}static getPropertyOptions(o){return this.elementProperties.get(o)??zs}static _$Ei(){if(this.hasOwnProperty(ko("elementProperties")))return;let o=ga(this);o.finalize(),o.l!==void 0&&(this.l=[...o.l]),this.elementProperties=new Map(o.elementProperties);}static finalize(){if(this.hasOwnProperty(ko("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(ko("properties"))){let e=this.properties,r=[...ma(e),...fa(e)];for(let i of r)this.createProperty(i,e[i]);}let o=this[Symbol.metadata];if(o!==null){let e=litPropertyMetadata.get(o);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i);}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(o){let e=[];if(Array.isArray(o)){let r=new Set(o.flat(1/0).reverse());for(let i of r)e.unshift(yi(i));}else o!==void 0&&e.push(yi(o));return e}static _$Eu(o,e){let r=e.attribute;return r===false?void 0:typeof r=="string"?r:typeof o=="string"?o.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(o=>this.enableUpdating=o),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(o=>o(this));}addController(o){(this._$EO??=new Set).add(o),this.renderRoot!==void 0&&this.isConnected&&o.hostConnected?.();}removeController(o){this._$EO?.delete(o);}_$E_(){let o=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(o.set(r,this[r]),delete this[r]);o.size>0&&(this._$Ep=o);}createRenderRoot(){let o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Rs(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(o=>o.hostConnected?.());}enableUpdating(o){}disconnectedCallback(){this._$EO?.forEach(o=>o.hostDisconnected?.());}attributeChangedCallback(o,e,r){this._$AK(o,r);}_$ET(o,e){let r=this.constructor.elementProperties.get(o),i=this.constructor._$Eu(o,r);if(i!==void 0&&r.reflect===true){let s=(r.converter?.toAttribute!==void 0?r.converter:me).toAttribute(e,r.type);this._$Em=o,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null;}}_$AK(o,e){let r=this.constructor,i=r._$Eh.get(o);if(i!==void 0&&this._$Em!==i){let s=r.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:me;this._$Em=i,this[i]=n.fromAttribute(e,s.type)??this._$Ej?.get(i)??null,this._$Em=null;}}requestUpdate(o,e,r){if(o!==void 0){let i=this.constructor,s=this[o];if(r??=i.getPropertyOptions(o),!((r.hasChanged??gr)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(o)&&!this.hasAttribute(i._$Eu(o,r))))return;this.C(o,e,r);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(o,e,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??=new Map).has(o)&&(this._$Ej.set(o,n??e??this[o]),s!==true||n!==void 0)||(this._$AL.has(o)||(this.hasUpdated||r||(e=void 0),this._$AL.set(o,e)),i===true&&this._$Em!==o&&(this._$Eq??=new Set).add(o));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(e){Promise.reject(e);}let o=this.scheduleUpdate();return o!=null&&await o,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0;}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,s]of r){let{wrapped:n}=s,c=this[i];n!==true||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c);}}let o=false,e=this._$AL;try{o=this.shouldUpdate(e),o?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM();}catch(r){throw o=false,this._$EM(),r}o&&this._$AE(e);}willUpdate(o){}_$AE(o){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(o)),this.updated(o);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(o){return  true}update(o){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM();}updated(o){}firstUpdated(o){}};te.elementStyles=[],te.shadowRootOptions={mode:"open"},te[ko("elementProperties")]=new Map,te[ko("finalized")]=new Map,va?.({ReactiveElement:te}),($o.reactiveElementVersions??=[]).push("2.1.0");var xi=globalThis,St=class extends te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let o=super.createRenderRoot();return this.renderOptions.renderBefore??=o.firstChild,o}update(o){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this._$Do=Cs(e,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return st}};St._$litElement$=true,St.finalized=true,xi.litElementHydrateSupport?.({LitElement:St});var ya=xi.litElementPolyfillSupport;ya?.({LitElement:St});(xi.litElementVersions??=[]).push("4.2.0");var R=t=>(o,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,o);}):customElements.define(t,o);};var xa={attribute:true,type:String,converter:me,reflect:false,hasChanged:gr},wa=(t=xa,o,e)=>{let{kind:r,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=true),s.set(e.name,t),r==="accessor"){let{name:n}=e;return {set(c){let a=o.get.call(this);o.set.call(this,c),this.requestUpdate(n,a,t);},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(r==="setter"){let{name:n}=e;return function(c){let a=this[n];o.call(this,c),this.requestUpdate(n,a,t);}}throw Error("Unsupported decorator location: "+r)};function h(t){return (o,e)=>typeof e=="object"?wa(t,o,e):((r,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,r),n?Object.getOwnPropertyDescriptor(i,s):void 0})(t,o,e)}function E(t){return h({...t,state:true,attribute:false})}function Xe(t){return (o,e)=>{let r=typeof o=="function"?o:o[e];Object.assign(r,t);}}var fe=(t,o,e)=>(e.configurable=true,e.enumerable=true,Reflect.decorate&&typeof o!="object"&&Object.defineProperty(t,o,e),e);function O(t,o){return (e,r,i)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return fe(e,r,{get(){return s(this)}})}}function Ps(t){return (o,e)=>{let{slot:r,selector:i}=t??{},s="slot"+(r?`[name=${r}]`:":not([name])");return fe(o,e,{get(){let n=this.renderRoot?.querySelector(s),c=n?.assignedElements(t)??[];return i===void 0?c:c.filter(a=>a.matches(i))}})}}function ge(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function Ls(t,o){return ge(t)?Object.assign({},t,o):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},o)}var _a=".";function Ms(t,o,e){if(!o||o.length===0)return t;let r=Array.isArray(o)?o:o.split(_a),i,s=t;for(let n=0;n<r.length;n++){let c=r[n];if(c in s)i=s[c];else return e;s=i;}return i}function br(t,o,e,r){if(!o||!t)return t;let i=o;if(i.length===0)return typeof t=="object"&&Object.assign(t,e),t;{let s=t,n=[],c=(a,u,f)=>{a[u]=f;};for(let a=0;a<i.length;a++){let u=i[a];if(n.push(u),s)if(Array.isArray(s)){let f=parseInt(u,10);if(Number.isNaN(f)||f<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);a===i.length-1?c(s,f,e):s=s[f];}else s instanceof Map||s instanceof WeakMap?a===i.length-1?s.set(u,e):(s.has(u)||s.set(u,{}),s=s.get(u)):typeof s=="object"&&u in s?a===i.length-1?c(s,u,e):s=s[u]:(s[u]=a===i.length-1?e:{},s=s[u]);else s[u]=a===i.length-1?e:{},s=s[u];}}return t}function Ca(t){if(t==null)return "";let o=typeof t;if(o==="boolean")return String(t);if(Array.isArray(t))return t.join(",");if(o==="object")try{return JSON.stringify(t)}catch{return "{}"}return String(t)}function Ds(t,o){if(!o)return t;let e=o.datatype||"any";if(e==="any")return t;if(e==="string")return Ca(t);if(e==="number")return Number(t);if(Array.isArray(t))return [...t];if(typeof t=="object")return {...t};if(typeof t=="string"){if(e==="boolean")return t.toLowerCase()==="true";if(e==="array")return t.split(",").map(r=>r.trim());if(e==="object")try{return JSON.parse(t)}catch{return {}}}return e==="boolean"?!!t:t}function Hs(t,o,e){return t?e(o):o}var be=class extends Event{constructor(o,e,r,i){super("context-request",{bubbles:true,composed:true}),this.context=o,this.contextTarget=e,this.callback=r,this.subscribe=i??false;}};var Qe=class{constructor(o,e,r,i){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=o,e.context!==void 0){let s=e;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=e,this.callback=r,this.subscribe=i??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new be(this.context,this.host,this.t,this.subscribe));}};var vr=class{get value(){return this.o}set value(o){this.setValue(o);}setValue(o,e=false){let r=e||!Object.is(o,this.o);this.o=o,r&&this.updateObservers();}constructor(o){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:r}]of this.subscriptions)e(this.o,r);},o!==void 0&&(this.value=o);}addCallback(o,e,r){if(!r)return void o(this.value);this.subscriptions.has(o)||this.subscriptions.set(o,{disposer:()=>{this.subscriptions.delete(o);},consumerHost:e});let{disposer:i}=this.subscriptions.get(o);o(this.value,i);}clearCallbacks(){this.subscriptions.clear();}};var wi=class extends Event{constructor(o,e){super("context-provider",{bubbles:true,composed:true}),this.context=o,this.contextTarget=e;}},Ze=class extends vr{constructor(o,e,r){super(e.context!==void 0?e.initialValue:r),this.onContextRequest=i=>{if(i.context!==this.context)return;let s=i.contextTarget??i.composedPath()[0];s!==this.host&&(i.stopPropagation(),this.addCallback(i.callback,s,i.subscribe));},this.onProviderRequest=i=>{if(i.context!==this.context||(i.contextTarget??i.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:c}]of this.subscriptions)s.has(n)||(s.add(n),c.dispatchEvent(new be(this.context,c,n,true)));i.stopPropagation();},this.host=o,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new wi(this.context,this.host));}};function _i({context:t}){return (o,e)=>{let r=new WeakMap;if(typeof e=="object")return {get(){return o.get.call(this)},set(i){return r.get(this).setValue(i),o.set.call(this,i)},init(i){return r.set(this,new Ze(this,{context:t,initialValue:i})),i}};{o.constructor.addInitializer(n=>{r.set(n,new Ze(n,{context:t}));});let i=Object.getOwnPropertyDescriptor(o,e),s;if(i===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(c){r.get(this).setValue(c),n.set(this,c);},configurable:true,enumerable:true};}else {let n=i.set;s={...i,set(c){r.get(this).setValue(c),n?.call(this,c);}};}return void Object.defineProperty(o,e,s)}}}function Ci({context:t,subscribe:o}){return (e,r)=>{typeof r=="object"?r.addInitializer(function(){new Qe(this,{context:t,callback:i=>{e.set.call(this,i);},subscribe:o});}):e.constructor.addInitializer(i=>{new Qe(i,{context:t,callback:s=>{i[r]=s;},subscribe:o});});}}var yr="autoform";var Fs=w`
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
            background-color: var(--auto-bgcolor);
            box-sizing: border-box;
            padding-right: 0px;
            &>.label{
                display: flex;   
                color: var(--auto-text-color);   
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
        sl-textarea::part(base){
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

`;var mt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Pt=t=>(...o)=>({_$litDirective$:t,values:o}),kt=class{constructor(o){}get _$AU(){return this._$AM._$AU}_$AT(o,e,r){this._$Ct=o,this._$AM=e,this._$Ci=r;}_$AS(o,e){return this.update(o,e)}update(o,e){return this.render(...e)}};var{I:ka}=_s;var Ws=(t,o)=>t?._$litType$!==void 0;var xr=t=>t.strings===void 0,Bs=()=>document.createComment(""),Je=(t,o,e)=>{let r=t._$AA.parentNode,i=o===void 0?t._$AB:o._$AA;if(e===void 0){let s=r.insertBefore(Bs(),i),n=r.insertBefore(Bs(),i);e=new ka(s,n,t,t.options);}else {let s=e._$AB.nextSibling,n=e._$AM,c=n!==t;if(c){let a;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(a=t._$AU)!==n._$AU&&e._$AP(a);}if(s!==i||c){let a=e._$AA;for(;a!==s;){let u=a.nextSibling;r.insertBefore(a,i),a=u;}}}return e},ve=(t,o,e=t)=>(t._$AI(o,e),t),$a={},wr=(t,o=$a)=>t._$AH=o,js=t=>t._$AH,_r=t=>{t._$AP?.(false,true);let o=t._$AA,e=t._$AB.nextSibling;for(;o!==e;){let r=o.nextSibling;o.remove(),o=r;}};var Ns=(t,o,e)=>{let r=new Map;for(let i=o;i<=e;i++)r.set(t[i],i);return r},ft=Pt(class extends kt{constructor(t){if(super(t),t.type!==mt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,o,e){let r;e===void 0?e=o:o!==void 0&&(r=o);let i=[],s=[],n=0;for(let c of t)i[n]=r?r(c,n):n,s[n]=e(c,n),n++;return {values:s,keys:i}}render(t,o,e){return this.dt(t,o,e).values}update(t,[o,e,r]){let i=js(t),{values:s,keys:n}=this.dt(o,e,r);if(!Array.isArray(i))return this.ut=n,s;let c=this.ut??=[],a=[],u,f,p=0,m=i.length-1,g=0,b=s.length-1;for(;p<=m&&g<=b;)if(i[p]===null)p++;else if(i[m]===null)m--;else if(c[p]===n[g])a[g]=ve(i[p],s[g]),p++,g++;else if(c[m]===n[b])a[b]=ve(i[m],s[b]),m--,b--;else if(c[p]===n[b])a[b]=ve(i[p],s[b]),Je(t,a[b+1],i[p]),p++,b--;else if(c[m]===n[g])a[g]=ve(i[m],s[g]),Je(t,i[p],i[m]),m--,g++;else if(u===void 0&&(u=Ns(n,g,b),f=Ns(c,p,m)),u.has(c[p]))if(u.has(c[m])){let v=f.get(n[g]),A=v!==void 0?i[v]:null;if(A===null){let k=Je(t,i[p]);ve(k,s[g]),a[g]=k;}else a[g]=ve(A,s[g]),Je(t,i[p],A),i[v]=null;g++;}else _r(i[m]),m--;else _r(i[p]),p++;for(;g<=b;){let v=Je(t,a[b+1]);ve(v,s[g]),a[g++]=v;}for(;p<=m;){let v=i[p++];v!==null&&_r(v);}return this.ut=n,wr(t,a),st}});var to=class{constructor(o){this.host=o,o.addController(this);}hostConnected(){let o=this.host;o.hasAttribute("dark")&&(o.classList.add("sl-theme-dark"),o.style.color="var(--sl-color-neutral-900,white)",o.shadowRoot.ownerDocument.style=o.style.color);}_toDark(){let o=this.host;o.classList.add("sl-theme-dark"),o.style.color="var(--sl-color-neutral-900,white)";}_toLight(){let o=this.host;o.classList.remove("sl-theme-dark"),o.style.color="var(--sl-color-neutral-1000)";}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext(),this.host.dark?this._toDark():this._toLight();}};var Us="important",Ea=" !"+Us,J=Pt(class extends kt{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((o,e)=>{let r=t[e];return r==null?o:o+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[o]){let{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(o)),this.render(o);for(let r of this.ft)o[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(let r in o){let i=o[r];if(i!=null){this.ft.add(r);let s=typeof i=="string"&&i.endsWith(Ea);r.includes("-")||s?e.setProperty(r,s?i.slice(0,-11):i,s?Us:""):e[r]=i;}}return st}});function K(t,o,e){return t?o(t):e?.(t)}var ye=class{constructor(o,...e){this.initialClasses=[];this.host=o,o.addController(this),this.initialClasses=e;}_forEachClasss(o,e){o&&o.forEach(r=>{typeof r=="string"?(e(r,true),this.host.classList.add(r)):Object.entries(r).forEach(([i,s])=>{e(i,s);});});}add(...o){this.host&&o&&this._forEachClasss(o,e=>{this.host.classList.add(e);});}remove(...o){this.host&&o&&this._forEachClasss(o,e=>{this.host.classList.remove(e);});}toggle(...o){this.host&&this._forEachClasss(o,e=>{this.host.classList.toggle(e);});}use(...o){this.host&&this._forEachClasss(o,(e,r)=>{r?this.host.classList.add(e):this.host.classList.remove(e);});}has(o){return this.host.classList.contains(o)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var Eo=class extends kt{constructor(o){if(super(o),this.it=Q,o.type!==mt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(o){if(o===Q||o==null)return this._t=void 0,this.it=o;if(o===st)return o;if(typeof o!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(o===this.it)return this._t;this.it=o;let e=[o];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Eo.directiveName="unsafeHTML",Eo.resultType=1;var $t=Pt(Eo);function qs(t,o){o&&Object.entries(o).forEach(([e,r])=>{(e==="root"?[t]:Array.from(t.querySelectorAll(e))).forEach(s=>{typeof r=="string"?s.style.cssText=r:typeof r=="object"&&Object.assign(s.style,r);});});}function eo(t,o,e){e?t.classList.add(o):t.classList.remove(o);}function Ks(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var T=class extends St{constructor(){super(...arguments);this.theme=new to(this);this.classs=new ye(this);this.options=Ks();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this._updateFieldValue();}static{this.styles=Fs;}get shadow(){return this.shadowRoot}getFieldOptions(){return Object.entries(this.schema||{}).reduce((e,[r,i])=>(ge(i)?e[r]=i.value:e[r]=i,e),Object.assign({},Ks(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(e=true){return d`${this.renderBeforeActions(e)}
                ${this.renderAfterActions(e)}`}_onClickAction(e,r){return i=>{typeof r=="function"&&r(i),e.onClick&&typeof e.onClick=="function"&&e.onClick?.call(this,this.getInputValue(),{action:e,options:this.options,event:i,update:s=>{br(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(e){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return d`<div class="actions before" part="before-actions" slot="${C(e?"prefix":void 0)}">
            ${ft(this.beforeActions,r=>this.renderActionWidget(r))}</div>`}renderAfterActions(e){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return d`<div class="actions after" part="after-actions"  slot="${C(e?"suffix":void 0)}">
            ${ft(this.afterActions,r=>this.renderActionWidget(r))}</div>`}_renderDropdownAction(e){return d`
        <sl-dropdown class='action-widget'  hoist
            title=${C(e.tips)}
            placement=${e.pos==="before"?"bottom-start":"bottom-end"}
        >
            <sl-button slot="trigger" ?caret=${e.caret}>
                ${K(e.icon,()=>d`<sl-icon name=${C(e.icon)}></sl-icon>`)}
                ${e.label}
            </sl-button>
            <sl-menu>   
                ${ft(e.items||[],r=>r==="-"?d`<sl-divider></sl-divider>`:(typeof r=="string"&&(r={label:r}),d`<sl-menu-item  @click=${this._onClickAction.call(this,r,()=>{e.syncMenu&&(e.label=r.label,e.icon=r.icon,e.tips=r.tips,this.requestUpdate());})}>
                    ${K(r.icon,()=>d`<sl-icon name=${C(r.icon)} slot="prefix"></sl-icon>`)}
                ${r.label}</sl-menu-item>`))}
            </sl-menu>
        </sl-dropdown>
        `}_renderButtonAction(e){return d`
        <sl-button class='action-widget' 
            title=${C(e.tips)}
            variant=${C(e.variant)}
            size=${e.size||this.context.size} 
            @click=${this._onClickAction.call(this,e)}>
            ${K(e.icon,()=>d`<sl-icon name=${C(e.icon)}></sl-icon>`)}
            ${e.label}
        </sl-button>
    `}_renderImageAction(e){return d`
        <sl-button title="${C(e.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this,e)}>                
            <img src="${C(e.url)}"/>
        </sl-button>
    `}renderActionWidget(e){if(typeof e!="object")return;let r=e.type||"button";if(r==="dropdown")return this._renderDropdownAction(e);if(r==="button")return this._renderButtonAction(e);if(r==="image")return this._renderImageAction(e)}renderOption(e,r){let i=this.schema[e];if(i)return i.loading?d`<sl-spinner></sl-spinner>`:d`${r?r(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(e){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,e):e}toState(e){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,e):e}toInput(e){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,e):e}getOptionValue(e,r){if(this.schema&&e in this.schema){let i=this.schema[e];return i===void 0?r:ge(i)?i.value:i}else return r}getOption(e){if(this.schema&&e in this.schema){let r=this.schema[e];return ge(r)?r:Ls(r)}}getInputValue(){if(!this.input)return "";let e=this.input.value;if(typeof this.options.toState!="function"){let r=this.options.datatype||"string";r==="number"?e=Number(e):r==="boolean"&&(e=!!e);}return e}_renderRequiredOption(){return this.renderOption("required",e=>e?d`<span style='color:red;'>*</span>`:"")}renderHelp(e=false){let r=this.options.help;if(!r)return;let i=r.match(/\(([^)]+)\)[^)]*$/),s=i?i[1]:null,n=s?r.replace(`(${s})`,""):r;return d`<span class="help" part="field-help" title="${C(e?n:void 0)}">
            ${Hs(!!s,d`
                <sl-icon name="help"></sl-icon>
                ${K(!e,()=>d`${n}`)}
            `,c=>d`<a target="_blank" href="${s}">${c}</a>`)} 
        </span>`}renderLabel(){let e=this.context,r=this.options.labelPos||e.labelPos;if(r==="none")return d``;{let i={};return (e.labelWidth&&r==="left"||e.viewonly)&&(i.width=e.labelWidth),d`<div class="label" part="field-label" style="${C(J(i))}">
            <span class="title">
                ${this.getLabel()}
                ${K(r==="left"||e.viewonly,()=>this.renderHelp(true))}
                ${this._renderRequiredOption()}
            </span>     
            ${K(r==="top"&&!e.viewonly,()=>this.renderHelp())}
        </div>`}}renderInput(){return d``}isShowError(){return this.context.validAtInit?!!this.invalidMessage:this.dirty?!!this.invalidMessage:false}renderError(){return this.isShowError()?d`<div class="error">
            ${this.invalidMessage}
        </div>`:d``}_handleSchemaChange(){let e=this.context;if(e?.store&&this.schema){let r=this.getPath().join("_$_");this._subscribers.push(e.store.schemas.store.watch(`${r}.**`,i=>{let{reply:s,type:n,value:c,flags:a}=i;if(s||e.form.seq===a)return;(n==="batch"?c:[i]).forEach(f=>{let p=f.path.slice(1);br(this.schema,p,f.value),this.options[p[0]]=f.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let e=this.value;if(this.options.toView&&this.options.toView)try{e=this.options.toView.call(this,this.value);}catch(r){console.error(`Error while toView<${this.path}>: ${r.message}`);}return d`${$t(String(e))}`}_handleStateChange(){let e=this.context;e?.store&&this.schema&&this._subscribers.push(e.store.watch(this.getPath().join("."),r=>{this.value=this.toInput(r.value);},{operates:"write"}));}getStateValue(){return this.toInput(Ms(this.context.store.state,this.getPath()))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let e=this.context;e?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.getPath().join("."),this.name=this.options.name||this.path,this.path in e.store.schemas.errors&&(this.invalidMessage=e.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(r=>r.pos==="before"),this.afterActions=this.options.actions.filter(r=>r.pos!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(e=>e.off());}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFormClasss(){this.context.form&&(eo(this.context.form,"dirty",this.dirty),eo(this.context.form,"invalid",!!this.invalidMessage));}_updateFieldValue(){if(!this.schema)return;let e=this.getPath(),r=this.toState(this.getInputValue()),i=this.context;i.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let c=Ds(r,this.schema);br(n,e,c),this.invalidMessage=void 0;},{flags:i.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:r,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidMessage=s.message;}finally{this._updateFormClasss();}}renderValue(){return d`
            ${this.renderInput()}
            ${K(this.context.viewonly,()=>this.renderHelp())}         
            ${this.renderError()} 
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(){this.options.styles&&qs(this.shadow,this.options.styles);}render(){let e=this.context,r=this.options.labelPos?this.options.labelPos:e.labelPos;return this.classs.use(e.size,{[`${e.border}-border`]:true,error:this.isShowError(),"left-label":r==="left"||e.viewonly,"top-label":r==="top"&&!e.viewonly,disable:this.options.enable===false,readonly:e.readonly,viewonly:e.viewonly,compact:this.compact===void 0?e.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${e.viewAlign}`]:true,[`${e.layout}-layout`]:true}),d`           
            <div class="autofield">
                ${this.options.divider?d`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${K(e.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>                            
            </div>
        `}};y([h({type:Object})],T.prototype,"schema",2),y([E()],T.prototype,"value",2),y([E()],T.prototype,"invalidMessage",2),y([E()],T.prototype,"labelPos",2),y([E()],T.prototype,"dirty",2),y([h({type:Boolean,reflect:true})],T.prototype,"noreactive",2),y([h({type:Boolean,reflect:true})],T.prototype,"compact",2),y([Ps({slot:"value",flatten:true})],T.prototype,"_field",2),y([O(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],T.prototype,"input",2),y([Ci({context:yr}),h({attribute:false})],T.prototype,"context",2);exports.AutoFieldInput=class X extends T{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return d`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=i=>i.map(s=>typeof s=="string"?s:s.value||s.label),r=(i,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let c=e(s),a=-1;c.some((p,m)=>{if(n&&this.value.startsWith(p)||!n&&this.value.endsWith(p))return n?(this._prefix=p,this.value=this.value.substring(p.length)):(this._suffix=p,this.value=this.value.substring(0,this.value.length-p.length)),a=m,true});let u=a===-1?"?":typeof s[a]=="string"?s[a]:s[a].label,f={type:s.length===1?"button":"dropdown",label:u,caret:!n};f.type==="dropdown"?f.items=s.map(p=>(p==="-"||(p=typeof p=="string"?{label:p}:p,p.onClick=()=>{n?this._prefix=p.value??p.label:this._suffix=p.value??p.label,this.onFieldChange();}),p)):typeof s[0]=="string"?f.label=s[0]:Object.assign(f,s[0]),f.syncMenu=true,f.pos=n?"before":"after",n?i.splice(0,0,f):i.push(f);}};this.options.prefix&&r(this.beforeActions,this.options.prefix),this.options.suffix&&r(this.afterActions,this.options.suffix,false);}onInputChange(e){let r=e.type;this.context.validAt==="input"&&r.includes("input")?this.onFieldInput():r.includes("change")&&this.onFieldChange();}renderInput(){return d`
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
        `}toState(e){let r=super.toState(e);return typeof r=="string"&&(this._prefix&&(r=this._prefix+r),this._suffix&&(r=r+this._suffix)),r}toInput(e){let r=super.toInput(e);return typeof r=="string"&&(this._prefix&&r.startsWith(this._prefix)&&(r=r.substring(this._prefix.length)),this._suffix&&r.endsWith(this._suffix)&&(r=r.substring(0,r.length-this._suffix.length))),r}};exports.AutoFieldInput.styles=[T.styles,w`
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
    `],exports.AutoFieldInput=y([R("auto-field-input")],exports.AutoFieldInput);var Gs=w`
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
`;var Dt=(t="value")=>(o,e)=>{let r=o.constructor,i=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(s,n,c){var a;let u=r.getPropertyOptions(t),f=typeof u.attribute=="string"?u.attribute:t;if(s===f){let p=u.converter||me,g=(typeof p=="function"?p:(a=p?.fromAttribute)!=null?a:me.fromAttribute)(c,u.type);this[t]!==g&&(this[e]=g);}i.call(this,s,n,c);};};var Et=w`
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
`;var Qs=Object.defineProperty,Aa=Object.defineProperties,Oa=Object.getOwnPropertyDescriptor,Ta=Object.getOwnPropertyDescriptors,Ys=Object.getOwnPropertySymbols,Ia=Object.prototype.hasOwnProperty,Ra=Object.prototype.propertyIsEnumerable,Si=(t,o)=>(o=Symbol[t])?o:Symbol.for("Symbol."+t),ki=t=>{throw TypeError(t)},Xs=(t,o,e)=>o in t?Qs(t,o,{enumerable:true,configurable:true,writable:true,value:e}):t[o]=e,At=(t,o)=>{for(var e in o||(o={}))Ia.call(o,e)&&Xs(t,e,o[e]);if(Ys)for(var e of Ys(o))Ra.call(o,e)&&Xs(t,e,o[e]);return t},ee=(t,o)=>Aa(t,Ta(o)),l=(t,o,e,r)=>{for(var i=r>1?void 0:r?Oa(o,e):o,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(r?n(o,e,i):n(i))||i);return r&&i&&Qs(o,e,i),i},Zs=(t,o,e)=>o.has(t)||ki("Cannot "+e),Js=(t,o,e)=>(Zs(t,o,"read from private field"),o.get(t)),tn=(t,o,e)=>o.has(t)?ki("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(t):o.set(t,e),en=(t,o,e,r)=>(Zs(t,o,"write to private field"),o.set(t,e),e),Va=function(t,o){this[0]=t,this[1]=o;},on=t=>{var o=t[Si("asyncIterator")],e=false,r,i={};return o==null?(o=t[Si("iterator")](),r=s=>i[s]=n=>o[s](n)):(o=o.call(t),r=s=>i[s]=n=>{if(e){if(e=false,s==="throw")throw n;return n}return e=true,{done:false,value:new Va(new Promise(c=>{var a=o[s](n);a instanceof Object||ki("Object expected"),c(a);}),1)}}),i[Si("iterator")]=()=>i,r("next"),"throw"in o?r("throw"):i.throw=s=>{throw s},"return"in o&&r("return"),i};var Ao=new WeakMap,Oo=new WeakMap,To=new WeakMap,$i=new WeakSet,Cr=new WeakMap,ht=class{constructor(t,o){this.handleFormData=e=>{let r=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!n&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(c=>{e.formData.append(i,c.toString());}):e.formData.append(i,s.toString()));},this.handleFormSubmit=e=>{var r;let i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=Ao.get(this.form))==null||r.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),Cr.set(this.host,[]);},this.handleInteraction=e=>{let r=Cr.get(this.host);r.includes(e.type)||r.push(e.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let r of e)if(typeof r.checkValidity=="function"&&!r.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let r of e)if(typeof r.reportValidity=="function"&&!r.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=At({form:e=>{let r=e.form;if(r){let s=e.getRootNode().querySelector(`#${r}`);if(s)return s}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var r;return (r=e.disabled)!=null?r:false},reportValidity:e=>typeof e.reportValidity=="function"?e.reportValidity():true,checkValidity:e=>typeof e.checkValidity=="function"?e.checkValidity():true,setValue:(e,r)=>e.value=r,assumeInteractionOn:["sl-input"]},o);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),Cr.set(this.host,[]),this.options.assumeInteractionOn.forEach(o=>{this.host.addEventListener(o,this.handleInteraction);});}hostDisconnected(){this.detachForm(),Cr.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,Ao.has(this.form)?Ao.get(this.form).add(this.host):Ao.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Oo.has(this.form)||(Oo.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),To.has(this.form)||(To.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=Ao.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Oo.has(this.form)&&(this.form.reportValidity=Oo.get(this.form),Oo.delete(this.form)),To.has(this.form)&&(this.form.checkValidity=To.get(this.form),To.delete(this.form)),this.form=void 0));}setUserInteracted(t,o){o?$i.add(t):$i.delete(t),t.requestUpdate();}doAction(t,o){if(this.form){let e=document.createElement("button");e.type=t,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",o&&(e.name=o.name,e.value=o.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{o.hasAttribute(r)&&e.setAttribute(r,o.getAttribute(r));})),this.form.append(e),e.click(),e.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let o=this.host,e=!!$i.has(o),r=!!o.required;o.toggleAttribute("data-required",r),o.toggleAttribute("data-optional",!r),o.toggleAttribute("data-invalid",!t),o.toggleAttribute("data-valid",t),o.toggleAttribute("data-user-invalid",!t&&e),o.toggleAttribute("data-user-valid",t&&e);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let o=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||o.preventDefault(),this.host.dispatchEvent(o)||t?.preventDefault();}},oo=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),rn=Object.freeze(ee(At({},oo),{valid:false,valueMissing:true})),sn=Object.freeze(ee(At({},oo),{valid:false,customError:true}));var nt=class{constructor(t,...o){this.slotNames=[],this.handleSlotChange=e=>{let r=e.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=o;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let o=t;if(o.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!o.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function nn(t){if(!t)return "";let o=t.assignedNodes({flatten:true}),e="";return [...o].forEach(r=>{r.nodeType===Node.TEXT_NODE&&(e+=r.textContent);}),e}var Ei="";function ln(t){Ei=t;}function an(t=""){if(!Ei){let o=[...document.getElementsByTagName("script")],e=o.find(r=>r.hasAttribute("data-shoelace"));if(e)ln(e.getAttribute("data-shoelace"));else {let r=o.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),i="";r&&(i=r.getAttribute("src")),ln(i.split("/").slice(0,-1).join("/"));}}return Ei.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var za={name:"default",resolver:t=>an(`assets/icons/${t}.svg`)},cn=za;var pn={caret:`
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
  `},Pa={name:"system",resolver:t=>t in pn?`data:image/svg+xml,${encodeURIComponent(pn[t])}`:""},hn=Pa;var Sr=[cn,hn],kr=[];function Ai(t){kr.push(t);}function Oi(t){kr=kr.filter(o=>o!==t);}function $r(t){return Sr.find(o=>o.name===t)}function Ti(t,o){un(t),Sr.push({name:t,resolver:o.resolver,mutator:o.mutator,spriteSheet:o.spriteSheet}),kr.forEach(e=>{e.library===t&&e.setIcon();});}function un(t){Sr=Sr.filter(o=>o.name!==t);}var dn=w`
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
`;function I(t,o){let e=At({waitUntilFirstUpdate:false},o);return (r,i)=>{let{update:s}=r,n=Array.isArray(t)?t:[t];r.update=function(c){n.forEach(a=>{let u=a;if(c.has(u)){let f=c.get(u),p=this[u];f!==p&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[i](f,p);}}),s.call(this,c);};}}var L=w`
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
`;var Er,V=class extends St{constructor(){super(),tn(this,Er,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,o])=>{this.constructor.define(t,o);});}emit(t,o){let e=new CustomEvent(t,At({bubbles:true,cancelable:false,composed:true,detail:{}},o));return this.dispatchEvent(e),e}static define(t,o=this,e={}){let r=customElements.get(t);if(!r){try{customElements.define(t,o,e);}catch{customElements.define(t,class extends o{},e);}return}let i=" (unknown version)",s=i;"version"in o&&o.version&&(i=" v"+o.version),"version"in r&&r.version&&(s=" v"+r.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,o,e){Js(this,Er)||(this.constructor.elementProperties.forEach((r,i)=>{r.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i]);}),en(this,Er,true)),super.attributeChangedCallback(t,o,e);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((o,e)=>{t.has(e)&&this[e]==null&&(this[e]=o);});}};Er=new WeakMap;V.version="2.20.1";V.dependencies={};l([h()],V.prototype,"dir",2);l([h()],V.prototype,"lang",2);var Io=Symbol(),Ar=Symbol(),Ii,Ri=new Map,U=class extends V{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,o){var e;let r;if(o?.spriteSheet)return this.svg=d`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Io:Ar}catch{return Ar}try{let i=document.createElement("div");i.innerHTML=await r.text();let s=i.firstElementChild;if(((e=s?.tagName)==null?void 0:e.toLowerCase())!=="svg")return Io;Ii||(Ii=new DOMParser);let c=Ii.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return c?(c.part.add("svg"),document.adoptNode(c)):Io}catch{return Io}}connectedCallback(){super.connectedCallback(),Ai(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),Oi(this);}getIconSource(){let t=$r(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:o,fromLibrary:e}=this.getIconSource(),r=e?$r(this.library):void 0;if(!o){this.svg=null;return}let i=Ri.get(o);if(i||(i=this.resolveIcon(o,r),Ri.set(o,i)),!this.initialRender)return;let s=await i;if(s===Ar&&Ri.delete(o),o===this.getIconSource().url){if(Ws(s)){if(this.svg=s,r){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof r.mutator=="function"&&n&&r.mutator(n);}return}switch(s){case Ar:case Io:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=r?.mutator)==null||t.call(r,this.svg),this.emit("sl-load");}}}render(){return this.svg}};U.styles=[L,dn];l([E()],U.prototype,"svg",2);l([h({reflect:true})],U.prototype,"name",2);l([h()],U.prototype,"src",2);l([h()],U.prototype,"label",2);l([h({reflect:true})],U.prototype,"library",2);l([I("label")],U.prototype,"handleLabelChange",1);l([I(["name","src","library"])],U.prototype,"setIcon",1);var z=Pt(class extends kt{constructor(t){if(super(t),t.type!==mt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(o=>t[o]).join(" ")+" "}update(t,[o]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in o)o[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(o)}let e=t.element.classList;for(let r of this.st)r in o||(e.remove(r),this.st.delete(r));for(let r in o){let i=!!o[r];i===this.st.has(r)||this.nt?.has(r)||(i?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)));}return st}});var _t=Pt(class extends kt{constructor(t){if(super(t),t.type!==mt.PROPERTY&&t.type!==mt.ATTRIBUTE&&t.type!==mt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!xr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[o]){if(o===st||o===Q)return o;let e=t.element,r=t.name;if(t.type===mt.PROPERTY){if(o===e[r])return st}else if(t.type===mt.BOOLEAN_ATTRIBUTE){if(!!o===e.hasAttribute(r))return st}else if(t.type===mt.ATTRIBUTE&&e.getAttribute(r)===o+"")return st;return wr(t),o}});var rt=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,o)=>t.checked=o}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),o=this.helpText?true:!!t;return d`
      <div
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":o})}
      >
        <label
          part="base"
          class=${z({checkbox:true,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${C(this.value)}
            .indeterminate=${_t(this.indeterminate)}
            .checked=${_t(this.checked)}
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
          aria-hidden=${o?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};rt.styles=[L,Et,Gs];rt.dependencies={"sl-icon":U};l([O('input[type="checkbox"]')],rt.prototype,"input",2);l([E()],rt.prototype,"hasFocus",2);l([h()],rt.prototype,"title",2);l([h()],rt.prototype,"name",2);l([h()],rt.prototype,"value",2);l([h({reflect:true})],rt.prototype,"size",2);l([h({type:Boolean,reflect:true})],rt.prototype,"disabled",2);l([h({type:Boolean,reflect:true})],rt.prototype,"checked",2);l([h({type:Boolean,reflect:true})],rt.prototype,"indeterminate",2);l([Dt("checked")],rt.prototype,"defaultChecked",2);l([h({reflect:true})],rt.prototype,"form",2);l([h({type:Boolean,reflect:true})],rt.prototype,"required",2);l([h({attribute:"help-text"})],rt.prototype,"helpText",2);l([I("disabled",{waitUntilFirstUpdate:true})],rt.prototype,"handleDisabledChange",1);l([I(["checked","indeterminate"],{waitUntilFirstUpdate:true})],rt.prototype,"handleStateChange",1);rt.define("sl-checkbox");exports.AutoFieldCheckbox=class Ro extends T{renderInput(){return d`        
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
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let o=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof o=="boolean"?"":o}}renderView(){return d`        
        <sl-checkbox 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-checkbox> 
        `}};exports.AutoFieldCheckbox.styles=[T.styles,w`
            sl-checkbox.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=y([R("auto-field-checkbox")],exports.AutoFieldCheckbox);var mn=w`
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
`;var Nt=class extends V{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return d`
      <span
        part="base"
        class=${z({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?d` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Nt.styles=[L,mn];Nt.dependencies={"sl-icon":U};l([E()],Nt.prototype,"checked",2);l([E()],Nt.prototype,"hasFocus",2);l([h()],Nt.prototype,"value",2);l([h({reflect:true})],Nt.prototype,"size",2);l([h({type:Boolean,reflect:true})],Nt.prototype,"disabled",2);l([I("checked")],Nt.prototype,"handleCheckedChange",1);l([I("disabled",{waitUntilFirstUpdate:true})],Nt.prototype,"handleDisabledChange",1);Nt.define("sl-radio");var fn=w`
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
`;var gn=w`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var xe=class extends V{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let o=Vo(t.target);o?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let o=Vo(t.target);o?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let o=Vo(t.target);o?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let o=Vo(t.target);o?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(o=>{let e=t.indexOf(o),r=Vo(o);r&&(r.toggleAttribute("data-sl-button-group__button",true),r.toggleAttribute("data-sl-button-group__button--first",e===0),r.toggleAttribute("data-sl-button-group__button--inner",e>0&&e<t.length-1),r.toggleAttribute("data-sl-button-group__button--last",e===t.length-1),r.toggleAttribute("data-sl-button-group__button--radio",r.tagName.toLowerCase()==="sl-radio-button"));});}render(){return d`
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
    `}};xe.styles=[L,gn];l([O("slot")],xe.prototype,"defaultSlot",2);l([E()],xe.prototype,"disableRole",2);l([h()],xe.prototype,"label",2);function Vo(t){var o;let e="sl-button, sl-radio-button";return (o=t.closest(e))!=null?o:t.querySelector(e)}var ut=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this),this.hasSlotController=new nt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?sn:t?rn:oo}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let o=t.target.closest("sl-radio, sl-radio-button"),e=this.getAllRadios(),r=this.value;!o||o.disabled||(this.value=o.value,e.forEach(i=>i.checked=i===o),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var o;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let e=this.getAllRadios().filter(c=>!c.disabled),r=(o=e.find(c=>c.checked))!=null?o:e[0],i=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=e.indexOf(r)+i;n<0&&(n=e.length-1),n>e.length-1&&(n=0),this.getAllRadios().forEach(c=>{c.checked=false,this.hasButtonGroup||c.setAttribute("tabindex","-1");}),this.value=e[n].value,e[n].checked=true,this.hasButtonGroup?e[n].shadowRoot.querySelector("button").focus():(e[n].setAttribute("tabindex","0"),e[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,o;let e=this.getAllRadios();if(await Promise.all(e.map(async r=>{await r.updateComplete,r.checked=r.value===this.value,r.size=this.size;})),this.hasButtonGroup=e.some(r=>r.tagName.toLowerCase()==="sl-radio-button"),e.length>0&&!e.some(r=>r.checked))if(this.hasButtonGroup){let r=(t=e[0].shadowRoot)==null?void 0:t.querySelector("button");r&&r.setAttribute("tabindex","0");}else e[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let r=(o=this.shadowRoot)==null?void 0:o.querySelector("sl-button-group");r&&(r.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(o=>o.checked=o.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,o=this.customValidityMessage!=="";return t||o?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let o=this.getAllRadios(),e=o.find(s=>s.checked),r=o.find(s=>!s.disabled),i=e||r;i&&i.focus(t);}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o,i=d`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return d`
      <fieldset
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":e,"form-control--has-help-text":r})}
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

          ${this.hasButtonGroup?d`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${i}
                </sl-button-group>
              `:i}
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
    `}};ut.styles=[L,Et,fn];ut.dependencies={"sl-button-group":xe};l([O("slot:not([name])")],ut.prototype,"defaultSlot",2);l([O(".radio-group__validation-input")],ut.prototype,"validationInput",2);l([E()],ut.prototype,"hasButtonGroup",2);l([E()],ut.prototype,"errorMessage",2);l([E()],ut.prototype,"defaultValue",2);l([h()],ut.prototype,"label",2);l([h({attribute:"help-text"})],ut.prototype,"helpText",2);l([h()],ut.prototype,"name",2);l([h({reflect:true})],ut.prototype,"value",2);l([h({reflect:true})],ut.prototype,"size",2);l([h({reflect:true})],ut.prototype,"form",2);l([h({type:Boolean,reflect:true})],ut.prototype,"required",2);l([I("size",{waitUntilFirstUpdate:true})],ut.prototype,"handleSizeChange",1);l([I("value")],ut.prototype,"handleValueChange",1);ut.define("sl-radio-group");exports.AutoFieldRadio=class zo extends T{getInitialOptions(){return {card:false,select:[],valueKey:"value"}}renderOptionItemWithCard(o,e){if(this.options.card){let r=e[this.options.valueKey]||e.label,i=this.value===r;return d`<div class="card"
                style=${J({width:this.options.itemWidth})}
                >
                    <div class="body ${i?"selected":""}">
                        <sl-icon  class="icon" name="settings"></sl-icon>
                        ${o}                    
                    </div>
            </div>`}else return o}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(o){let e=o[this.options.valueKey]||o.label;return d`<sl-radio 
            value="${e}"
            style=${J({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
        >${o.label}<br/><span class="memo">${o.tips}</span></sl-radio>`}renderInput(){let o=this.options.select.map(e=>{let r={};return typeof e=="object"?Object.assign(r,e):Object.assign(r,{label:e}),r});return d`              
            <sl-radio-group 
                class="value"
                name=${this.name} 
                value="${this.value}"            
                size="${this.context.size}"            
                @sl-change=${this.onRadioChange.bind(this)}
            >
            ${o.map(e=>this.renderOptionItemWithCard(this.renderOptionItem(e),e))}
            </sl-radio-group> 
        `}};exports.AutoFieldRadio.styles=[T.styles,w`
        sl-radio-group::part(form-control-input) {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.2em;
        }         
        sl-icon::part(svg){
            stroke-width: 1; 
        }
        sl-radio{            
            position: relative;
            & .memo{
                color: var(--sl-color-gray-500);
                font-size: 0.8em;
                max-height: 2.8em; 
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
    `],exports.AutoFieldRadio=y([R("auto-field-radio")],exports.AutoFieldRadio);var bn=w`
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
`;var N=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,o,e="none"){this.input.setSelectionRange(t,o,e);}setRangeText(t,o,e,r="preserve"){let i=o??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o;return d`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":r})}
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
            class=${z({textarea:true,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${C(this.name)}
              .value=${_t(this.value)}
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
    `}};N.styles=[L,Et,bn];l([O(".textarea__control")],N.prototype,"input",2);l([O(".textarea__size-adjuster")],N.prototype,"sizeAdjuster",2);l([E()],N.prototype,"hasFocus",2);l([h()],N.prototype,"title",2);l([h()],N.prototype,"name",2);l([h()],N.prototype,"value",2);l([h({reflect:true})],N.prototype,"size",2);l([h({type:Boolean,reflect:true})],N.prototype,"filled",2);l([h()],N.prototype,"label",2);l([h({attribute:"help-text"})],N.prototype,"helpText",2);l([h()],N.prototype,"placeholder",2);l([h({type:Number})],N.prototype,"rows",2);l([h()],N.prototype,"resize",2);l([h({type:Boolean,reflect:true})],N.prototype,"disabled",2);l([h({type:Boolean,reflect:true})],N.prototype,"readonly",2);l([h({reflect:true})],N.prototype,"form",2);l([h({type:Boolean,reflect:true})],N.prototype,"required",2);l([h({type:Number})],N.prototype,"minlength",2);l([h({type:Number})],N.prototype,"maxlength",2);l([h()],N.prototype,"autocapitalize",2);l([h()],N.prototype,"autocorrect",2);l([h()],N.prototype,"autocomplete",2);l([h({type:Boolean})],N.prototype,"autofocus",2);l([h()],N.prototype,"enterkeyhint",2);l([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],N.prototype,"spellcheck",2);l([h()],N.prototype,"inputmode",2);l([Dt()],N.prototype,"defaultValue",2);l([I("disabled",{waitUntilFirstUpdate:true})],N.prototype,"handleDisabledChange",1);l([I("rows",{waitUntilFirstUpdate:true})],N.prototype,"handleRowsChange",1);l([I("value",{waitUntilFirstUpdate:true})],N.prototype,"handleValueChange",1);N.define("sl-textarea");exports.AutoFieldTextArea=class Or extends T{renderInput(){return d`              
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
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea=y([R("auto-field-textarea")],exports.AutoFieldTextArea);var vn=w`
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
`;var gt=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,o)=>t.checked=o}),this.hasSlotController=new nt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),o=this.helpText?true:!!t;return d`
      <div
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":o})}
      >
        <label
          part="base"
          class=${z({switch:true,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${C(this.value)}
            .checked=${_t(this.checked)}
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
          aria-hidden=${o?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};gt.styles=[L,Et,vn];l([O('input[type="checkbox"]')],gt.prototype,"input",2);l([E()],gt.prototype,"hasFocus",2);l([h()],gt.prototype,"title",2);l([h()],gt.prototype,"name",2);l([h()],gt.prototype,"value",2);l([h({reflect:true})],gt.prototype,"size",2);l([h({type:Boolean,reflect:true})],gt.prototype,"disabled",2);l([h({type:Boolean,reflect:true})],gt.prototype,"checked",2);l([Dt("checked")],gt.prototype,"defaultChecked",2);l([h({reflect:true})],gt.prototype,"form",2);l([h({type:Boolean,reflect:true})],gt.prototype,"required",2);l([h({attribute:"help-text"})],gt.prototype,"helpText",2);l([I("checked",{waitUntilFirstUpdate:true})],gt.prototype,"handleCheckedChange",1);l([I("disabled",{waitUntilFirstUpdate:true})],gt.prototype,"handleDisabledChange",1);gt.define("sl-switch");exports.AutoFieldSwitch=class Po extends T{renderInput(){return d`              
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
        `}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let o=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof o=="boolean"?"":o}}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return d`        
        <sl-switch 	
            class="viewonly"
            ?checked=${this._isChecked()}           
        >${this.getCheckLabel()}</sl-switch> 
        `}};exports.AutoFieldSwitch.styles=[T.styles,w`
            sl-switch.viewonly{
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=y([R("auto-field-switch")],exports.AutoFieldSwitch);var Tr=w`
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
`;var yn=w`
  ${Tr}

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
`;var wn=Symbol.for(""),La=t=>{if(t?.r===wn)return t?._$litStatic$};var ro=(t,...o)=>({_$litStatic$:o.reduce((e,r,i)=>e+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1],t[0]),r:wn}),xn=new Map,Vi=t=>(o,...e)=>{let r=e.length,i,s,n=[],c=[],a,u=0,f=false;for(;u<r;){for(a=o[u];u<r&&(s=e[u],(i=La(s))!==void 0);)a+=i+o[++u],f=true;u!==r&&c.push(s),n.push(a),u++;}if(u===r&&n.push(o[r]),f){let p=n.join("$$lit$$");(o=xn.get(p))===void 0&&(n.raw=n,xn.set(p,o=n)),e=c;}return t(o,...e)},we=Vi(d);var Ht=class extends V{constructor(){super(...arguments),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return we`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${z({button:true,"button--default":true,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":true,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
    `}};Ht.styles=[L,yn];l([O(".button")],Ht.prototype,"input",2);l([O(".hidden-input")],Ht.prototype,"hiddenInput",2);l([E()],Ht.prototype,"hasFocus",2);l([h({type:Boolean,reflect:true})],Ht.prototype,"checked",2);l([h()],Ht.prototype,"value",2);l([h({type:Boolean,reflect:true})],Ht.prototype,"disabled",2);l([h({reflect:true})],Ht.prototype,"size",2);l([h({type:Boolean,reflect:true})],Ht.prototype,"pill",2);l([I("disabled",{waitUntilFirstUpdate:true})],Ht.prototype,"handleDisabledChange",1);Ht.define("sl-radio-button");exports.AutoFieldRadioButton=class Lo extends T{getInitialOptions(){return {valueKey:"value"}}renderRadioItem(o){let e=o[this.options.valueKey];return d`<sl-radio-button
            value="${e}"
            ?pill=${this.options.pill}
            ?disabled =${!this.options.enable}
        >${o.label}</sl-radio-button>`}renderInput(){let o=this.getOptionValue("select",[]).map((e,r)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{label:e,value:r+1}),i});return d`              
        <sl-radio-group 
            name=${this.name} 
            data-path=${this.path} 
            value="${this.value}"            
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
        ${o.map(e=>this.renderRadioItem(e))}
        </sl-radio-group> 
        `}};exports.AutoFieldRadioButton.styles=[T.styles,w`
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
    `],exports.AutoFieldRadioButton=y([R("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class Ir extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=y([R("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class Rr extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=y([R("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class Vr extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=y([R("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class zr extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=y([R("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class Pr extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();let o=this.context.store.schemas.getValidator(this.path);(!o||typeof o.validate!="function")&&this.context.store.schemas.addValidator(this.path,{validate:e=>this._isEmail(e),message:"\u65E0\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740",onFail:"throw-pass"});}_isEmail(o){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(o)}};exports.AutoFieldEmail=y([R("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class Lr extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=y([R("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class Mr extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=y([R("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class Dr extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=y([R("auto-field-phone")],exports.AutoFieldPhone);var Hr=class{constructor(o,e){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=o,this.options={...this.options,...e},o.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(o){let e=o.target;if(this.isPreviewActive){this.closePreview();return}e.matches(this.options.selector)&&(o.preventDefault(),o.stopPropagation(),this.originalImage=e,this.showPreview(this.originalImage));}showPreview(o){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let e=this.options.overlayColor,r=this.hexToRgb(e);this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=o.src,this.previewImage.alt=o.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let i=o.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",p=>{p.stopPropagation();}),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:c,height:a}=this.calculateAspectRatioFit(o.naturalWidth,o.naturalHeight,s*.9,n*.9),u=(n-a)/2,f=(s-c)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${u}px`,this.previewImage.style.left=`${f}px`,this.previewImage.style.width=`${c}px`,this.previewImage.style.height=`${a}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let o=window.innerWidth,e=window.innerHeight,{width:r,height:i}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,o*.9,e*.9),s=(e-i)/2,n=(o-r)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${r}px`,this.previewImage.style.height=`${i}px`);});}handleKeydown(o){o.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let o=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${o.top}px`,this.previewImage.style.left=`${o.left}px`,this.previewImage.style.width=`${o.width}px`,this.previewImage.style.height=`${o.height}px`;});let e=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${e.r}, ${e.g}, ${e.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(o,e,r,i){if(o<=r&&e<=i)return {width:o,height:e};let s=Math.min(r/o,i/e);return {width:o*s,height:e*s}}hexToRgb(o){o=o.replace(/^#/,""),o.length===3&&(o=o.split("").map(s=>s+s).join(""));let e=parseInt(o.substring(0,2),16),r=parseInt(o.substring(2,4),16),i=parseInt(o.substring(4,6),16);return {r:isNaN(e)?0:e,g:isNaN(r)?0:r,b:isNaN(i)?0:i}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var Ma=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],Da=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function Ha(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return Ma.includes(`.${r}`)}function Fa(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return Da.includes(`.${r}`)}exports.AutoFieldUpload=class io extends T{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new Hr(this);}retryUpload(e){this.startUpload(e.file,e.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:true}}_getDefaultFileLabel(e){return typeof e=="string"?e:e.title||e.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(e=>e!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(e){let r=e.target;if(!r.files||r.files.length===0)return;Array.from(r.files).forEach(s=>this.uploadFile(s)),r.value="";}handleDragOver(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(e){if(e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!e.dataTransfer?.files)return;let i=Array.from(e.dataTransfer.files);if(!this.options?.multiple&&i.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=i.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(c=>c==="*"?true:c.startsWith(".")?n.name.toLowerCase().endsWith(c.toLowerCase()):n.type.startsWith(c)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}i.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(e){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let r={id:this.generateId(),file:e,progress:0,status:"uploading",value:{url:e.name}};return this.files.push(r),this.startUpload(e,r.id)}_updateFileRecord(e,r){let i=this.files.findIndex(s=>s.id===e);i!==-1&&(this.files=[...this.files.slice(0,i),{...this.files[i],...r},...this.files.slice(i+1)]);}_getResponseError(e){let r="\u4E0A\u4F20\u5931\u8D25";try{let i=JSON.parse(e.responseText);r=i.message||i.error||r;}catch{switch(e.status){case 400:r="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:r="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:r="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:r="\u6587\u4EF6\u592A\u5927";break;case 415:r="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:r="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:r="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:r=`\u4E0A\u4F20\u5931\u8D25 (${e.status})`;}}return new Error(r)}_defaultFileResolver(e){if(typeof e=="string")return e;if(typeof e=="object"){if(!e.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return e}}_parseUploadResponse(e){let r={};try{Object.assign(r,JSON.parse(e));}catch{r=e;}return typeof this.options.onResolve=="function"&&(r=this.options.onResolve(r)),r}async startUpload(e,r){let i=this.files.findIndex(n=>n.id===r);if(i===-1)return;let s=this.files[i];return new Promise((n,c)=>{let a=new XMLHttpRequest,u=new FormData;u.append(this.options.fileFieldName,e),a.upload.onprogress=f=>{if(f.lengthComputable){let p=Math.round(f.loaded/f.total*100);this._updateFileRecord(r,{progress:p});}},a.onload=()=>{if(this.files.findIndex(p=>p.id===r)!==-1)if(a.status>=200&&a.status<300){this._updateFileRecord(r,{status:"done"});try{let p=this._parseUploadResponse(a.responseText);this._updateFileRecord(r,{value:p}),s.status="done",this.onFieldChange(),n();}catch{let p=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(r,p),c(p);}}else {let p=this._getResponseError(a);this.handleUploadError(r,p),c(p);}},a.onerror=()=>{if(this.files.findIndex(m=>m.id===r)===-1)return;let p=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(r,p),c(p);},a.ontimeout=()=>{if(this.files.findIndex(m=>m.id===r)===-1)return;let p=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(r,p),c(p);},a.open("POST",this.options.url),this._updateFileRecord(r,{progress:0,status:"uploading"}),a.send(u);})}handleUploadError(e,r){this._updateFileRecord(e,{error:r.message,status:"error"});}deleteFile(e){let r=this.files.findIndex(c=>c.id===e);if(r===-1)return;let i=this.files[r],s=i.status==="uploading"||i.status==="error",n=()=>{this.files=[...this.files.slice(0,r),...this.files.slice(r+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,i.value)).then(()=>{n(),this.onFieldChange();}).catch(c=>{alert(c.message);}):(n(),this.onFieldChange());}getInputValue(){if(this.options.multiple){let e=this.files.map(r=>r.value);return this.options.onlyFileUrl?e.map(r=>typeof r=="object"?r.url:r):e}else {let e=this.files.length>0?this.files[0].value:void 0;if(e)return this.options.onlyFileUrl&&typeof e=="object"?e.url:e}}getStateValue(){let e=super.getStateValue();return Array.isArray(e)||(e=[e]),this.files=e.map((r,i)=>{let s={id:String(i),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof r=="string"?s.value=r:typeof r=="object"&&(s.value=Object.assign({},s.value,r)),s}),e}renderProgressbar(e,r){if(e.status!=="uploading")return;let i=r==="hori"?`width:${e.progress}%;`:`height:${e.progress}%;top:${100-e.progress}%`;return d`<span 
            class="uploading progressbar ${z({hori:r==="hori",vert:r==="vert"})}"
            style="${i}"
        >
            <span class="value">${e.progress}%</span>
        </span>
        `}renderFileContent(e){if(e.error)return;let r=typeof e.value=="string"?e.value:e.value.url,i;if(Ha(r))i=d`
                <img class="content" src="${r}"/>
            `;else if(Fa(r))i=d`
                <video class="content" src="${r}"></video>
            `;else {let s=r.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,i=d`<div class="content">${s}</div>`;}return i}renderFilePreview(e){let r=!!e.error,i=typeof this.options.preview=="boolean"?"80px":this.options.preview;return d`
            <div class="file preview ${z({error:r})}"
                title=${e.error||this.options.onFileLabel(e.value)}
                style="${J({width:i,height:i})}"
            >   ${this.renderFileContent(e)}
                ${this.renderProgressbar(e,"vert")}
                ${K(e.status==="error",()=>d`<div class="error" title="${e.error}">
                        <span>上传出错</span>
                        <span>
                            <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(e.id)}></sl-icon>    
                            <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>
                        </span>
                    </div>`,()=>{if(!this.context.viewonly)return d`<sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>`})}                               
            </div> 
        `}renderFile(e){let r=!!e.error;return d`
            <magic-flex class="file default ${z({error:r})}" wrap align="center" gap="0.5rem"
                title=${C(e.error)}
            > 
                ${this.renderProgressbar(e,"hori")}
                <span class="label">${this.options.onFileLabel(e.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                ${K(e.status==="error",()=>d`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>`)}                               
            </magic-flex> 
        `}renderFiels(){return d`<magic-flex class="files" grow='none' gap="0.5rem" wrap>
            ${K(this.files.length>0,()=>ft(this.files,e=>this.options.preview?this.renderFilePreview(e):this.renderFile(e)),()=>d`<span class='placeholder'>${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </magic-flex>`}renderInput(){return d`
            <magic-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${K(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>d`<div class="indicator"
                            @click=${this.handleUploadClick}
                            @dragover=${this.handleDragOver}
                            @dragleave=${this.handleDragLeave}
                            @drop=${this.handleDrop}>
                            ${this.options.tips}
                        </div>`)}                
                <magic-flex class="actions" align="center" grow=".actions.after" gap="0.5rem" >
                    ${K(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>d`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}                    
                    ${this.renderActions(false)}  
                </magic-flex>
            </magic-flex>
        `}renderView(){return this.renderFiels()}};exports.AutoFieldUpload.styles=[T.styles,w`
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
 
        `],y([E()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=y([R("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class Fr extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=y([R("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class Mo extends T{getInitialOptions(){return {size:"medium"}}_onPartFocus(o){o.target.select();}_getIpBits(){let o=this.value?.split(".");return [parseInt(o[0]||"0"),parseInt(o[1]||"0"),parseInt(o[2]||"0"),parseInt(o[3]||"0")]}_onIpChange(o,e){this.onFieldChange(),this._isLastInput(e);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(e=>e.value).join(".")}_isLastInput(o){let e=o.target;if(e.value.length>=3){e.blur();let r=e.nextElementSibling?.nextElementSibling;r&&(r.focus(),r.select());}}_onPaste(o){o.preventDefault();let e=o.target,r=o.clipboardData?.getData("text/plain")||"",i=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=r.match(i);if(!s)return;let n=[],c=e;for(let a=0;a<4&&c;a++)c.tagName==="SL-INPUT"&&n.push(c),c=c.nextElementSibling?.nextElementSibling;for(let a=0;a<Math.min(4,n.length);a++)n[a].value=s[a+1],n[a].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let a=n[Math.min(3,n.length-1)];a.focus(),a.select();}}renderInput(){return d`
            <magic-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((o,e)=>d`
                    <sl-input 
                        value="${o}" 
                        name=${this.name} 
                        data-path = ${this.path}
                        defaultValue='0' 
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
                    ${e<3?d`<span class="dot">.</span>`:""}                    
                `)} 
            </magic-flex>
        `}};exports.AutoFieldIpAddress.styles=[T.styles,w` 
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
    `],exports.AutoFieldIpAddress=y([R("auto-field-ipaddress")],exports.AutoFieldIpAddress);var _n=w`
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
`;var Cn=w`
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
`;var xt=class extends V{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,o=t?ro`a`:ro`button`;return we`
      <${o}
        part="base"
        class=${z({"icon-button":true,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
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
      </${o}>
    `}};xt.styles=[L,Cn];xt.dependencies={"sl-icon":U};l([O(".icon-button")],xt.prototype,"button",2);l([E()],xt.prototype,"hasFocus",2);l([h()],xt.prototype,"name",2);l([h()],xt.prototype,"library",2);l([h()],xt.prototype,"src",2);l([h()],xt.prototype,"href",2);l([h()],xt.prototype,"target",2);l([h()],xt.prototype,"download",2);l([h()],xt.prototype,"label",2);l([h({type:Boolean,reflect:true})],xt.prototype,"disabled",2);var zi=new Set,so=new Map,Ve,Pi="ltr",Li="en",Sn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Sn){let t=new MutationObserver(kn);Pi=document.documentElement.dir||"ltr",Li=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function Do(...t){t.map(o=>{let e=o.$code.toLowerCase();so.has(e)?so.set(e,Object.assign(Object.assign({},so.get(e)),o)):so.set(e,o),Ve||(Ve=o);}),kn();}function kn(){Sn&&(Pi=document.documentElement.dir||"ltr",Li=document.documentElement.lang||navigator.language),[...zi.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var Br=class{constructor(o){this.host=o,this.host.addController(this);}hostConnected(){zi.add(this.host);}hostDisconnected(){zi.delete(this.host);}dir(){return `${this.host.dir||Pi}`.toLowerCase()}lang(){return `${this.host.lang||Li}`.toLowerCase()}getTranslationData(o){var e,r;let i=new Intl.Locale(o.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(r=(e=i?.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&r!==void 0?r:"",c=so.get(`${s}-${n}`),a=so.get(s);return {locale:i,language:s,region:n,primary:c,secondary:a}}exists(o,e){var r;let{primary:i,secondary:s}=this.getTranslationData((r=e.lang)!==null&&r!==void 0?r:this.lang());return e=Object.assign({includeFallback:false},e),!!(i&&i[o]||s&&s[o]||e.includeFallback&&Ve&&Ve[o])}term(o,...e){let{primary:r,secondary:i}=this.getTranslationData(this.lang()),s;if(r&&r[o])s=r[o];else if(i&&i[o])s=i[o];else if(Ve&&Ve[o])s=Ve[o];else return console.error(`No translation found for: ${String(o)}`),String(o);return typeof s=="function"?s(...e):s}date(o,e){return o=new Date(o),new Intl.DateTimeFormat(this.lang(),e).format(o)}number(o,e){return o=Number(o),isNaN(o)?"":new Intl.NumberFormat(this.lang(),e).format(o)}relativeTime(o,e,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(o,e)}};var $n={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,o)=>`Go to slide ${t} of ${o}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Do($n);var En=$n;var Y=class extends Br{};Do(En);var Xt=class extends V{constructor(){super(...arguments),this.localize=new Y(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return d`
      <span
        part="base"
        class=${z({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
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
    `}};Xt.styles=[L,_n];Xt.dependencies={"sl-icon-button":xt};l([h({reflect:true})],Xt.prototype,"variant",2);l([h({reflect:true})],Xt.prototype,"size",2);l([h({type:Boolean,reflect:true})],Xt.prototype,"pill",2);l([h({type:Boolean})],Xt.prototype,"removable",2);var An=w`
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
`;function Ba(t,o){return {top:Math.round(t.getBoundingClientRect().top-o.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-o.getBoundingClientRect().left)}}function On(t,o,e="vertical",r="smooth"){let i=Ba(t,o),s=i.top+o.scrollTop,n=i.left+o.scrollLeft,c=o.scrollLeft,a=o.scrollLeft+o.offsetWidth,u=o.scrollTop,f=o.scrollTop+o.offsetHeight;(e==="horizontal"||e==="both")&&(n<c?o.scrollTo({left:n,behavior:r}):n+t.clientWidth>a&&o.scrollTo({left:n-o.offsetWidth+t.clientWidth,behavior:r})),(e==="vertical"||e==="both")&&(s<u?o.scrollTo({top:s,behavior:r}):s+t.clientHeight>f&&o.scrollTo({top:s-o.offsetHeight+t.clientHeight,behavior:r}));}var Tn=w`
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
`;var Qt=Math.min,Ct=Math.max,Fo=Math.round,Bo=Math.floor,Ut=t=>({x:t,y:t}),Wa={left:"right",right:"left",bottom:"top",top:"bottom"},ja={start:"end",end:"start"};function jr(t,o,e){return Ct(t,Qt(o,e))}function ze(t,o){return typeof t=="function"?t(o):t}function oe(t){return t.split("-")[0]}function Pe(t){return t.split("-")[1]}function Mi(t){return t==="x"?"y":"x"}function Nr(t){return t==="y"?"height":"width"}function re(t){return ["top","bottom"].includes(oe(t))?"y":"x"}function Ur(t){return Mi(re(t))}function In(t,o,e){e===void 0&&(e=false);let r=Pe(t),i=Ur(t),s=Nr(i),n=i==="x"?r===(e?"end":"start")?"right":"left":r==="start"?"bottom":"top";return o.reference[s]>o.floating[s]&&(n=Ho(n)),[n,Ho(n)]}function Rn(t){let o=Ho(t);return [Wr(t),o,Wr(o)]}function Wr(t){return t.replace(/start|end/g,o=>ja[o])}function Na(t,o,e){let r=["left","right"],i=["right","left"],s=["top","bottom"],n=["bottom","top"];switch(t){case "top":case "bottom":return e?o?i:r:o?r:i;case "left":case "right":return o?s:n;default:return []}}function Vn(t,o,e,r){let i=Pe(t),s=Na(oe(t),e==="start",r);return i&&(s=s.map(n=>n+"-"+i),o&&(s=s.concat(s.map(Wr)))),s}function Ho(t){return t.replace(/left|right|bottom|top/g,o=>Wa[o])}function Ua(t){return {top:0,right:0,bottom:0,left:0,...t}}function Di(t){return typeof t!="number"?Ua(t):{top:t,right:t,bottom:t,left:t}}function Le(t){let{x:o,y:e,width:r,height:i}=t;return {width:r,height:i,top:e,left:o,right:o+r,bottom:e+i,x:o,y:e}}function zn(t,o,e){let{reference:r,floating:i}=t,s=re(o),n=Ur(o),c=Nr(n),a=oe(o),u=s==="y",f=r.x+r.width/2-i.width/2,p=r.y+r.height/2-i.height/2,m=r[c]/2-i[c]/2,g;switch(a){case "top":g={x:f,y:r.y-i.height};break;case "bottom":g={x:f,y:r.y+r.height};break;case "right":g={x:r.x+r.width,y:p};break;case "left":g={x:r.x-i.width,y:p};break;default:g={x:r.x,y:r.y};}switch(Pe(o)){case "start":g[n]-=m*(e&&u?-1:1);break;case "end":g[n]+=m*(e&&u?-1:1);break}return g}var Pn=async(t,o,e)=>{let{placement:r="bottom",strategy:i="absolute",middleware:s=[],platform:n}=e,c=s.filter(Boolean),a=await(n.isRTL==null?void 0:n.isRTL(o)),u=await n.getElementRects({reference:t,floating:o,strategy:i}),{x:f,y:p}=zn(u,r,a),m=r,g={},b=0;for(let v=0;v<c.length;v++){let{name:A,fn:k}=c[v],{x:_,y:$,data:x,reset:S}=await k({x:f,y:p,initialPlacement:r,placement:m,strategy:i,middlewareData:g,rects:u,platform:n,elements:{reference:t,floating:o}});f=_??f,p=$??p,g={...g,[A]:{...g[A],...x}},S&&b<=50&&(b++,typeof S=="object"&&(S.placement&&(m=S.placement),S.rects&&(u=S.rects===true?await n.getElementRects({reference:t,floating:o,strategy:i}):S.rects),{x:f,y:p}=zn(u,m,a)),v=-1);}return {x:f,y:p,placement:m,strategy:i,middlewareData:g}};async function qr(t,o){var e;o===void 0&&(o={});let{x:r,y:i,platform:s,rects:n,elements:c,strategy:a}=t,{boundary:u="clippingAncestors",rootBoundary:f="viewport",elementContext:p="floating",altBoundary:m=false,padding:g=0}=ze(o,t),b=Di(g),A=c[m?p==="floating"?"reference":"floating":p],k=Le(await s.getClippingRect({element:(e=await(s.isElement==null?void 0:s.isElement(A)))==null||e?A:A.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:u,rootBoundary:f,strategy:a})),_=p==="floating"?{x:r,y:i,width:n.floating.width,height:n.floating.height}:n.reference,$=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),x=await(s.isElement==null?void 0:s.isElement($))?await(s.getScale==null?void 0:s.getScale($))||{x:1,y:1}:{x:1,y:1},S=Le(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:_,offsetParent:$,strategy:a}):_);return {top:(k.top-S.top+b.top)/x.y,bottom:(S.bottom-k.bottom+b.bottom)/x.y,left:(k.left-S.left+b.left)/x.x,right:(S.right-k.right+b.right)/x.x}}var Ln=t=>({name:"arrow",options:t,async fn(o){let{x:e,y:r,placement:i,rects:s,platform:n,elements:c,middlewareData:a}=o,{element:u,padding:f=0}=ze(t,o)||{};if(u==null)return {};let p=Di(f),m={x:e,y:r},g=Ur(i),b=Nr(g),v=await n.getDimensions(u),A=g==="y",k=A?"top":"left",_=A?"bottom":"right",$=A?"clientHeight":"clientWidth",x=s.reference[b]+s.reference[g]-m[g]-s.floating[b],S=m[g]-s.reference[g],M=await(n.getOffsetParent==null?void 0:n.getOffsetParent(u)),F=M?M[$]:0;(!F||!await(n.isElement==null?void 0:n.isElement(M)))&&(F=c.floating[$]||s.floating[b]);let j=x/2-S/2,D=F/2-v[b]/2-1,P=Qt(p[k],D),at=Qt(p[_],D),it=P,vt=F-v[b]-at,wt=F/2-v[b]/2+j,yt=jr(it,wt,vt),pe=!a.arrow&&Pe(i)!=null&&wt!==yt&&s.reference[b]/2-(wt<it?P:at)-v[b]/2<0,Zt=pe?wt<it?wt-it:wt-vt:0;return {[g]:m[g]+Zt,data:{[g]:yt,centerOffset:wt-yt-Zt,...pe&&{alignmentOffset:Zt}},reset:pe}}});var Mn=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(o){var e,r;let{placement:i,middlewareData:s,rects:n,initialPlacement:c,platform:a,elements:u}=o,{mainAxis:f=true,crossAxis:p=true,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=true,...A}=ze(t,o);if((e=s.arrow)!=null&&e.alignmentOffset)return {};let k=oe(i),_=re(c),$=oe(c)===c,x=await(a.isRTL==null?void 0:a.isRTL(u.floating)),S=m||($||!v?[Ho(c)]:Rn(c)),M=b!=="none";!m&&M&&S.push(...Vn(c,v,b,x));let F=[c,...S],j=await qr(o,A),D=[],P=((r=s.flip)==null?void 0:r.overflows)||[];if(f&&D.push(j[k]),p){let yt=In(i,n,x);D.push(j[yt[0]],j[yt[1]]);}if(P=[...P,{placement:i,overflows:D}],!D.every(yt=>yt<=0)){var at,it;let yt=(((at=s.flip)==null?void 0:at.index)||0)+1,pe=F[yt];if(pe){var vt;let he=p==="alignment"?_!==re(pe):false,Gt=((vt=P[0])==null?void 0:vt.overflows[0])>0;if(!he||Gt)return {data:{index:yt,overflows:P},reset:{placement:pe}}}let Zt=(it=P.filter(he=>he.overflows[0]<=0).sort((he,Gt)=>he.overflows[1]-Gt.overflows[1])[0])==null?void 0:it.placement;if(!Zt)switch(g){case "bestFit":{var wt;let he=(wt=P.filter(Gt=>{if(M){let ue=re(Gt.placement);return ue===_||ue==="y"}return  true}).map(Gt=>[Gt.placement,Gt.overflows.filter(ue=>ue>0).reduce((ue,ea)=>ue+ea,0)]).sort((Gt,ue)=>Gt[1]-ue[1])[0])==null?void 0:wt[0];he&&(Zt=he);break}case "initialPlacement":Zt=c;break}if(i!==Zt)return {reset:{placement:Zt}}}return {}}}};async function qa(t,o){let{placement:e,platform:r,elements:i}=t,s=await(r.isRTL==null?void 0:r.isRTL(i.floating)),n=oe(e),c=Pe(e),a=re(e)==="y",u=["left","top"].includes(n)?-1:1,f=s&&a?-1:1,p=ze(o,t),{mainAxis:m,crossAxis:g,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return c&&typeof b=="number"&&(g=c==="end"?b*-1:b),a?{x:g*f,y:m*u}:{x:m*u,y:g*f}}var Dn=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(o){var e,r;let{x:i,y:s,placement:n,middlewareData:c}=o,a=await qa(o,t);return n===((e=c.offset)==null?void 0:e.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:i+a.x,y:s+a.y,data:{...a,placement:n}}}}},Hn=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(o){let{x:e,y:r,placement:i}=o,{mainAxis:s=true,crossAxis:n=false,limiter:c={fn:A=>{let{x:k,y:_}=A;return {x:k,y:_}}},...a}=ze(t,o),u={x:e,y:r},f=await qr(o,a),p=re(oe(i)),m=Mi(p),g=u[m],b=u[p];if(s){let A=m==="y"?"top":"left",k=m==="y"?"bottom":"right",_=g+f[A],$=g-f[k];g=jr(_,g,$);}if(n){let A=p==="y"?"top":"left",k=p==="y"?"bottom":"right",_=b+f[A],$=b-f[k];b=jr(_,b,$);}let v=c.fn({...o,[m]:g,[p]:b});return {...v,data:{x:v.x-e,y:v.y-r,enabled:{[m]:s,[p]:n}}}}}};var Fn=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(o){var e,r;let{placement:i,rects:s,platform:n,elements:c}=o,{apply:a=()=>{},...u}=ze(t,o),f=await qr(o,u),p=oe(i),m=Pe(i),g=re(i)==="y",{width:b,height:v}=s.floating,A,k;p==="top"||p==="bottom"?(A=p,k=m===(await(n.isRTL==null?void 0:n.isRTL(c.floating))?"start":"end")?"left":"right"):(k=p,A=m==="end"?"top":"bottom");let _=v-f.top-f.bottom,$=b-f.left-f.right,x=Qt(v-f[A],_),S=Qt(b-f[k],$),M=!o.middlewareData.shift,F=x,j=S;if((e=o.middlewareData.shift)!=null&&e.enabled.x&&(j=$),(r=o.middlewareData.shift)!=null&&r.enabled.y&&(F=_),M&&!m){let P=Ct(f.left,0),at=Ct(f.right,0),it=Ct(f.top,0),vt=Ct(f.bottom,0);g?j=b-2*(P!==0||at!==0?P+at:Ct(f.left,f.right)):F=v-2*(it!==0||vt!==0?it+vt:Ct(f.top,f.bottom));}await a({...o,availableWidth:j,availableHeight:F});let D=await n.getDimensions(c.floating);return b!==D.width||v!==D.height?{reset:{rects:true}}:{}}}};function Kr(){return typeof window<"u"}function Me(t){return Wn(t)?(t.nodeName||"").toLowerCase():"#document"}function Ot(t){var o;return (t==null||(o=t.ownerDocument)==null?void 0:o.defaultView)||window}function qt(t){var o;return (o=(Wn(t)?t.ownerDocument:t.document)||window.document)==null?void 0:o.documentElement}function Wn(t){return Kr()?t instanceof Node||t instanceof Ot(t).Node:false}function Ft(t){return Kr()?t instanceof Element||t instanceof Ot(t).Element:false}function Kt(t){return Kr()?t instanceof HTMLElement||t instanceof Ot(t).HTMLElement:false}function Bn(t){return !Kr()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof Ot(t).ShadowRoot}function lo(t){let{overflow:o,overflowX:e,overflowY:r,display:i}=Bt(t);return /auto|scroll|overlay|hidden|clip/.test(o+r+e)&&!["inline","contents"].includes(i)}function jn(t){return ["table","td","th"].includes(Me(t))}function Wo(t){return [":popover-open",":modal"].some(o=>{try{return t.matches(o)}catch{return  false}})}function ao(t){let o=Gr(),e=Ft(t)?Bt(t):t;return ["transform","translate","scale","rotate","perspective"].some(r=>e[r]?e[r]!=="none":false)||(e.containerType?e.containerType!=="normal":false)||!o&&(e.backdropFilter?e.backdropFilter!=="none":false)||!o&&(e.filter?e.filter!=="none":false)||["transform","translate","scale","rotate","perspective","filter"].some(r=>(e.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(e.contain||"").includes(r))}function Nn(t){let o=ie(t);for(;Kt(o)&&!De(o);){if(ao(o))return o;if(Wo(o))return null;o=ie(o);}return null}function Gr(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}function De(t){return ["html","body","#document"].includes(Me(t))}function Bt(t){return Ot(t).getComputedStyle(t)}function jo(t){return Ft(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ie(t){if(Me(t)==="html")return t;let o=t.assignedSlot||t.parentNode||Bn(t)&&t.host||qt(t);return Bn(o)?o.host:o}function Un(t){let o=ie(t);return De(o)?t.ownerDocument?t.ownerDocument.body:t.body:Kt(o)&&lo(o)?o:Un(o)}function no(t,o,e){var r;o===void 0&&(o=[]),e===void 0&&(e=true);let i=Un(t),s=i===((r=t.ownerDocument)==null?void 0:r.body),n=Ot(i);if(s){let c=Yr(n);return o.concat(n,n.visualViewport||[],lo(i)?i:[],c&&e?no(c):[])}return o.concat(i,no(i,[],e))}function Yr(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Gn(t){let o=Bt(t),e=parseFloat(o.width)||0,r=parseFloat(o.height)||0,i=Kt(t),s=i?t.offsetWidth:e,n=i?t.offsetHeight:r,c=Fo(e)!==s||Fo(r)!==n;return c&&(e=s,r=n),{width:e,height:r,$:c}}function Fi(t){return Ft(t)?t:t.contextElement}function co(t){let o=Fi(t);if(!Kt(o))return Ut(1);let e=o.getBoundingClientRect(),{width:r,height:i,$:s}=Gn(o),n=(s?Fo(e.width):e.width)/r,c=(s?Fo(e.height):e.height)/i;return (!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}var Ka=Ut(0);function Yn(t){let o=Ot(t);return !Gr()||!o.visualViewport?Ka:{x:o.visualViewport.offsetLeft,y:o.visualViewport.offsetTop}}function Ga(t,o,e){return o===void 0&&(o=false),!e||o&&e!==Ot(t)?false:o}function He(t,o,e,r){o===void 0&&(o=false),e===void 0&&(e=false);let i=t.getBoundingClientRect(),s=Fi(t),n=Ut(1);o&&(r?Ft(r)&&(n=co(r)):n=co(t));let c=Ga(s,e,r)?Yn(s):Ut(0),a=(i.left+c.x)/n.x,u=(i.top+c.y)/n.y,f=i.width/n.x,p=i.height/n.y;if(s){let m=Ot(s),g=r&&Ft(r)?Ot(r):r,b=m,v=Yr(b);for(;v&&r&&g!==b;){let A=co(v),k=v.getBoundingClientRect(),_=Bt(v),$=k.left+(v.clientLeft+parseFloat(_.paddingLeft))*A.x,x=k.top+(v.clientTop+parseFloat(_.paddingTop))*A.y;a*=A.x,u*=A.y,f*=A.x,p*=A.y,a+=$,u+=x,b=Ot(v),v=Yr(b);}}return Le({width:f,height:p,x:a,y:u})}function Bi(t,o){let e=jo(t).scrollLeft;return o?o.left+e:He(qt(t)).left+e}function Xn(t,o,e){e===void 0&&(e=false);let r=t.getBoundingClientRect(),i=r.left+o.scrollLeft-(e?0:Bi(t,r)),s=r.top+o.scrollTop;return {x:i,y:s}}function Ya(t){let{elements:o,rect:e,offsetParent:r,strategy:i}=t,s=i==="fixed",n=qt(r),c=o?Wo(o.floating):false;if(r===n||c&&s)return e;let a={scrollLeft:0,scrollTop:0},u=Ut(1),f=Ut(0),p=Kt(r);if((p||!p&&!s)&&((Me(r)!=="body"||lo(n))&&(a=jo(r)),Kt(r))){let g=He(r);u=co(r),f.x=g.x+r.clientLeft,f.y=g.y+r.clientTop;}let m=n&&!p&&!s?Xn(n,a,true):Ut(0);return {width:e.width*u.x,height:e.height*u.y,x:e.x*u.x-a.scrollLeft*u.x+f.x+m.x,y:e.y*u.y-a.scrollTop*u.y+f.y+m.y}}function Xa(t){return Array.from(t.getClientRects())}function Qa(t){let o=qt(t),e=jo(t),r=t.ownerDocument.body,i=Ct(o.scrollWidth,o.clientWidth,r.scrollWidth,r.clientWidth),s=Ct(o.scrollHeight,o.clientHeight,r.scrollHeight,r.clientHeight),n=-e.scrollLeft+Bi(t),c=-e.scrollTop;return Bt(r).direction==="rtl"&&(n+=Ct(o.clientWidth,r.clientWidth)-i),{width:i,height:s,x:n,y:c}}function Za(t,o){let e=Ot(t),r=qt(t),i=e.visualViewport,s=r.clientWidth,n=r.clientHeight,c=0,a=0;if(i){s=i.width,n=i.height;let u=Gr();(!u||u&&o==="fixed")&&(c=i.offsetLeft,a=i.offsetTop);}return {width:s,height:n,x:c,y:a}}function Ja(t,o){let e=He(t,true,o==="fixed"),r=e.top+t.clientTop,i=e.left+t.clientLeft,s=Kt(t)?co(t):Ut(1),n=t.clientWidth*s.x,c=t.clientHeight*s.y,a=i*s.x,u=r*s.y;return {width:n,height:c,x:a,y:u}}function qn(t,o,e){let r;if(o==="viewport")r=Za(t,e);else if(o==="document")r=Qa(qt(t));else if(Ft(o))r=Ja(o,e);else {let i=Yn(t);r={x:o.x-i.x,y:o.y-i.y,width:o.width,height:o.height};}return Le(r)}function Qn(t,o){let e=ie(t);return e===o||!Ft(e)||De(e)?false:Bt(e).position==="fixed"||Qn(e,o)}function tc(t,o){let e=o.get(t);if(e)return e;let r=no(t,[],false).filter(c=>Ft(c)&&Me(c)!=="body"),i=null,s=Bt(t).position==="fixed",n=s?ie(t):t;for(;Ft(n)&&!De(n);){let c=Bt(n),a=ao(n);!a&&c.position==="fixed"&&(i=null),(s?!a&&!i:!a&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||lo(n)&&!a&&Qn(t,n))?r=r.filter(f=>f!==n):i=c,n=ie(n);}return o.set(t,r),r}function ec(t){let{element:o,boundary:e,rootBoundary:r,strategy:i}=t,n=[...e==="clippingAncestors"?Wo(o)?[]:tc(o,this._c):[].concat(e),r],c=n[0],a=n.reduce((u,f)=>{let p=qn(o,f,i);return u.top=Ct(p.top,u.top),u.right=Qt(p.right,u.right),u.bottom=Qt(p.bottom,u.bottom),u.left=Ct(p.left,u.left),u},qn(o,c,i));return {width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function oc(t){let{width:o,height:e}=Gn(t);return {width:o,height:e}}function rc(t,o,e){let r=Kt(o),i=qt(o),s=e==="fixed",n=He(t,true,s,o),c={scrollLeft:0,scrollTop:0},a=Ut(0);function u(){a.x=Bi(i);}if(r||!r&&!s)if((Me(o)!=="body"||lo(i))&&(c=jo(o)),r){let g=He(o,true,s,o);a.x=g.x+o.clientLeft,a.y=g.y+o.clientTop;}else i&&u();s&&!r&&i&&u();let f=i&&!r&&!s?Xn(i,c):Ut(0),p=n.left+c.scrollLeft-a.x-f.x,m=n.top+c.scrollTop-a.y-f.y;return {x:p,y:m,width:n.width,height:n.height}}function Hi(t){return Bt(t).position==="static"}function Kn(t,o){if(!Kt(t)||Bt(t).position==="fixed")return null;if(o)return o(t);let e=t.offsetParent;return qt(t)===e&&(e=e.ownerDocument.body),e}function Zn(t,o){let e=Ot(t);if(Wo(t))return e;if(!Kt(t)){let i=ie(t);for(;i&&!De(i);){if(Ft(i)&&!Hi(i))return i;i=ie(i);}return e}let r=Kn(t,o);for(;r&&jn(r)&&Hi(r);)r=Kn(r,o);return r&&De(r)&&Hi(r)&&!ao(r)?e:r||Nn(t)||e}var ic=async function(t){let o=this.getOffsetParent||Zn,e=this.getDimensions,r=await e(t.floating);return {reference:rc(t.reference,await o(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function sc(t){return Bt(t).direction==="rtl"}var No={convertOffsetParentRelativeRectToViewportRelativeRect:Ya,getDocumentElement:qt,getClippingRect:ec,getOffsetParent:Zn,getElementRects:ic,getClientRects:Xa,getDimensions:oc,getScale:co,isElement:Ft,isRTL:sc};function Jn(t,o){return t.x===o.x&&t.y===o.y&&t.width===o.width&&t.height===o.height}function nc(t,o){let e=null,r,i=qt(t);function s(){var c;clearTimeout(r),(c=e)==null||c.disconnect(),e=null;}function n(c,a){c===void 0&&(c=false),a===void 0&&(a=1),s();let u=t.getBoundingClientRect(),{left:f,top:p,width:m,height:g}=u;if(c||o(),!m||!g)return;let b=Bo(p),v=Bo(i.clientWidth-(f+m)),A=Bo(i.clientHeight-(p+g)),k=Bo(f),$={rootMargin:-b+"px "+-v+"px "+-A+"px "+-k+"px",threshold:Ct(0,Qt(1,a))||1},x=true;function S(M){let F=M[0].intersectionRatio;if(F!==a){if(!x)return n();F?n(false,F):r=setTimeout(()=>{n(false,1e-7);},1e3);}F===1&&!Jn(u,t.getBoundingClientRect())&&n(),x=false;}try{e=new IntersectionObserver(S,{...$,root:i.ownerDocument});}catch{e=new IntersectionObserver(S,$);}e.observe(t);}return n(true),s}function tl(t,o,e,r){r===void 0&&(r={});let{ancestorScroll:i=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=false}=r,u=Fi(t),f=i||s?[...u?no(u):[],...no(o)]:[];f.forEach(k=>{i&&k.addEventListener("scroll",e,{passive:true}),s&&k.addEventListener("resize",e);});let p=u&&c?nc(u,e):null,m=-1,g=null;n&&(g=new ResizeObserver(k=>{let[_]=k;_&&_.target===u&&g&&(g.unobserve(o),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var $;($=g)==null||$.observe(o);})),e();}),u&&!a&&g.observe(u),g.observe(o));let b,v=a?He(t):null;a&&A();function A(){let k=He(t);v&&!Jn(v,k)&&e(),v=k,b=requestAnimationFrame(A);}return e(),()=>{var k;f.forEach(_=>{i&&_.removeEventListener("scroll",e),s&&_.removeEventListener("resize",e);}),p?.(),(k=g)==null||k.disconnect(),g=null,a&&cancelAnimationFrame(b);}}var el=Dn;var ol=Hn,rl=Mn,Wi=Fn;var il=Ln;var sl=(t,o,e)=>{let r=new Map,i={platform:No,...e},s={...i.platform,_c:r};return Pn(t,o,{...i,platform:s})};function nl(t){return lc(t)}function ji(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function lc(t){for(let o=t;o;o=ji(o))if(o instanceof Element&&getComputedStyle(o).display==="none")return null;for(let o=ji(t);o;o=ji(o)){if(!(o instanceof Element))continue;let e=getComputedStyle(o);if(e.display!=="contents"&&(e.position!=="static"||ao(e)||o.tagName==="BODY"))return o}return null}function ac(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var G=class extends V{constructor(){super(...arguments),this.localize=new Y(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),o=this.popup.getBoundingClientRect(),e=this.placement.includes("top")||this.placement.includes("bottom"),r=0,i=0,s=0,n=0,c=0,a=0,u=0,f=0;e?t.top<o.top?(r=t.left,i=t.bottom,s=t.right,n=t.bottom,c=o.left,a=o.top,u=o.right,f=o.top):(r=o.left,i=o.bottom,s=o.right,n=o.bottom,c=t.left,a=t.top,u=t.right,f=t.top):t.left<o.left?(r=t.right,i=t.top,s=o.left,n=o.top,c=t.right,a=t.bottom,u=o.left,f=o.bottom):(r=o.right,i=o.top,s=t.left,n=t.top,c=o.right,a=o.bottom,u=t.left,f=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${f}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||ac(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=tl(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[el({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Wi({apply:({rects:e})=>{let r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(rl({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(ol({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Wi({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(il({element:this.arrowEl,padding:this.arrowPadding}));let o=this.strategy==="absolute"?e=>No.getOffsetParent(e,nl):No.getOffsetParent;sl(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:ee(At({},No),{getOffsetParent:o})}).then(({x:e,y:r,middlewareData:i,placement:s})=>{let n=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${e}px`,top:`${r}px`}),this.arrow){let a=i.arrow.x,u=i.arrow.y,f="",p="",m="",g="";if(this.arrowPlacement==="start"){let b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":b,g=n?b:"",m=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof a=="number"?"calc(50% - var(--arrow-size-diagonal))":"",f=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof a=="number"?`${a}px`:"",f=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:f,right:p,bottom:m,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return d`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${z({"popup-hover-bridge":true,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${z({popup:true,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?d`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};G.styles=[L,Tn];l([O(".popup")],G.prototype,"popup",2);l([O(".popup__arrow")],G.prototype,"arrowEl",2);l([h()],G.prototype,"anchor",2);l([h({type:Boolean,reflect:true})],G.prototype,"active",2);l([h({reflect:true})],G.prototype,"placement",2);l([h({reflect:true})],G.prototype,"strategy",2);l([h({type:Number})],G.prototype,"distance",2);l([h({type:Number})],G.prototype,"skidding",2);l([h({type:Boolean})],G.prototype,"arrow",2);l([h({attribute:"arrow-placement"})],G.prototype,"arrowPlacement",2);l([h({attribute:"arrow-padding",type:Number})],G.prototype,"arrowPadding",2);l([h({type:Boolean})],G.prototype,"flip",2);l([h({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(o=>o.trim()).filter(o=>o!==""),toAttribute:t=>t.join(" ")}})],G.prototype,"flipFallbackPlacements",2);l([h({attribute:"flip-fallback-strategy"})],G.prototype,"flipFallbackStrategy",2);l([h({type:Object})],G.prototype,"flipBoundary",2);l([h({attribute:"flip-padding",type:Number})],G.prototype,"flipPadding",2);l([h({type:Boolean})],G.prototype,"shift",2);l([h({type:Object})],G.prototype,"shiftBoundary",2);l([h({attribute:"shift-padding",type:Number})],G.prototype,"shiftPadding",2);l([h({attribute:"auto-size"})],G.prototype,"autoSize",2);l([h()],G.prototype,"sync",2);l([h({type:Object})],G.prototype,"autoSizeBoundary",2);l([h({attribute:"auto-size-padding",type:Number})],G.prototype,"autoSizePadding",2);l([h({attribute:"hover-bridge",type:Boolean})],G.prototype,"hoverBridge",2);var al=new Map,cc=new WeakMap;function pc(t){return t??{keyframes:[],options:{duration:0}}}function ll(t,o){return o.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function se(t,o){al.set(t,pc(o));}function ne(t,o,e){let r=cc.get(t);if(r?.[o])return ll(r[o],e.dir);let i=al.get(o);return i?ll(i,e.dir):{keyframes:[],options:{duration:0}}}function po(t,o){return new Promise(e=>{function r(i){i.target===t&&(t.removeEventListener(o,r),e());}t.addEventListener(o,r);})}function le(t,o,e){return new Promise(r=>{if(e?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=t.animate(o,ee(At({},e),{duration:hc()?0:e.duration}));i.addEventListener("cancel",r,{once:true}),i.addEventListener("finish",r,{once:true});})}function hc(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ae(t){return Promise.all(t.getAnimations().map(o=>new Promise(e=>{o.cancel(),requestAnimationFrame(e);})))}function Ni(t,o){return t.map(e=>ee(At({},e),{height:e.height==="auto"?`${o}px`:e.height}))}var B=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new Y(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>d`
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
        @sl-remove=${o=>this.handleTagRemove(o,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{let o=t.composedPath();this&&!o.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let o=t.target,e=o.closest(".select__clear")!==null,r=o.closest("sl-icon-button")!==null;if(!(e||r)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let i=this.getAllOptions(),s=i.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>i.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=i.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let i=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of i)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let o=t.composedPath();this&&!o.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let e=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="sl-icon-button");this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let e=t.target.closest("sl-option"),r=this.value;e&&!e.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==r&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),o=this.valueHasChanged?this.value:this.defaultValue,e=Array.isArray(o)?o:[o],r=[];t.forEach(i=>r.push(i.value)),this.setSelectedOptions(t.filter(i=>e.includes(i.value)));}handleTagRemove(t,o){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(o,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(e=>{e.current=false,e.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let o=this.getAllOptions(),e=Array.isArray(t)?t:[t];o.forEach(r=>r.selected=false),e.length&&e.forEach(r=>r.selected=true),this.selectionChanged();}toggleOptionSelection(t,o){o===true||o===false?t.selected=o:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,o,e;let r=this.getAllOptions();this.selectedOptions=r.filter(s=>s.selected);let i=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(e=(o=s?.getTextLabel)==null?void 0:o.call(s))!=null?e:"";}this.valueHasChanged=i,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,o)=>{if(o<this.maxOptionsVisible||this.maxOptionsVisible<=0){let e=this.getTag(t,o);return d`<div @sl-remove=${r=>this.handleTagRemove(r,t)}>
          ${typeof e=="string"?$t(e):e}
        </div>`}else if(o===this.maxOptionsVisible)return d`<sl-tag size=${this.size}>+${this.selectedOptions.length-o}</sl-tag>`;return d``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,o,e){if(super.attributeChangedCallback(t,o,e),t==="value"){let r=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=r;}}handleValueChange(){if(!this.valueHasChanged){let e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e;}let t=this.getAllOptions(),o=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(e=>o.includes(e.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await ae(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:o}=ne(this,"select.show",{dir:this.localize.dir()});await le(this.popup.popup,t,o),this.currentOption&&On(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await ae(this);let{keyframes:t,options:o}=ne(this,"select.hide",{dir:this.localize.dir()});await le(this.popup.popup,t,o),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,po(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,po(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o,i=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return d`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":r})}
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
            class=${z({select:true,"select--standard":true,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":s,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
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

              ${i?d`
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
    `}};B.styles=[L,Et,An];B.dependencies={"sl-icon":U,"sl-popup":G,"sl-tag":Xt};l([O(".select")],B.prototype,"popup",2);l([O(".select__combobox")],B.prototype,"combobox",2);l([O(".select__display-input")],B.prototype,"displayInput",2);l([O(".select__value-input")],B.prototype,"valueInput",2);l([O(".select__listbox")],B.prototype,"listbox",2);l([E()],B.prototype,"hasFocus",2);l([E()],B.prototype,"displayLabel",2);l([E()],B.prototype,"currentOption",2);l([E()],B.prototype,"selectedOptions",2);l([E()],B.prototype,"valueHasChanged",2);l([h()],B.prototype,"name",2);l([E()],B.prototype,"value",1);l([h({attribute:"value"})],B.prototype,"defaultValue",2);l([h({reflect:true})],B.prototype,"size",2);l([h()],B.prototype,"placeholder",2);l([h({type:Boolean,reflect:true})],B.prototype,"multiple",2);l([h({attribute:"max-options-visible",type:Number})],B.prototype,"maxOptionsVisible",2);l([h({type:Boolean,reflect:true})],B.prototype,"disabled",2);l([h({type:Boolean})],B.prototype,"clearable",2);l([h({type:Boolean,reflect:true})],B.prototype,"open",2);l([h({type:Boolean})],B.prototype,"hoist",2);l([h({type:Boolean,reflect:true})],B.prototype,"filled",2);l([h({type:Boolean,reflect:true})],B.prototype,"pill",2);l([h()],B.prototype,"label",2);l([h({reflect:true})],B.prototype,"placement",2);l([h({attribute:"help-text"})],B.prototype,"helpText",2);l([h({reflect:true})],B.prototype,"form",2);l([h({type:Boolean,reflect:true})],B.prototype,"required",2);l([h()],B.prototype,"getTag",2);l([I("disabled",{waitUntilFirstUpdate:true})],B.prototype,"handleDisabledChange",1);l([I(["defaultValue","value"],{waitUntilFirstUpdate:true})],B.prototype,"handleValueChange",1);l([I("open",{waitUntilFirstUpdate:true})],B.prototype,"handleOpenChange",1);se("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});se("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});B.define("sl-select");var cl=w`
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
`;var Lt=class extends V{constructor(){super(...arguments),this.localize=new Y(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,o="";return [...t].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("slot")||(o+=e.textContent)),e.nodeType===Node.TEXT_NODE&&(o+=e.textContent);}),o.trim()}render(){return d`
      <div
        part="base"
        class=${z({option:true,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Lt.styles=[L,cl];Lt.dependencies={"sl-icon":U};l([O(".option__label")],Lt.prototype,"defaultSlot",2);l([E()],Lt.prototype,"current",2);l([E()],Lt.prototype,"selected",2);l([E()],Lt.prototype,"hasHover",2);l([h({reflect:true})],Lt.prototype,"value",2);l([h({type:Boolean,reflect:true})],Lt.prototype,"disabled",2);l([I("disabled")],Lt.prototype,"handleDisabledChange",1);l([I("selected")],Lt.prototype,"handleSelectedChange",1);l([I("value")],Lt.prototype,"handleValueChange",1);Lt.define("sl-option");var Xr=w`
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
    
}`;exports.AutoFieldSelect=class Uo extends T{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}_renderItem(e){let r=this.options.renderItem;return typeof r=="string"?d`${$t(r.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof r=="function"?d`${$t(r(e))}`:e.label||e.value}renderInput(){let e=this.options.select.map(r=>{let i={};return typeof r=="object"?Object.assign(i,r):typeof r=="string"&&r.startsWith("-")?Object.assign(i,{type:"divider"}):Object.assign(i,{label:r}),i});return d`              
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
            ${this.renderBeforeActions()}
            ${e.map(r=>r.type==="divider"?d`<sl-divider></sl-divider>`:d`<sl-option 
                    value="${r[this.valueKey]||r.label}"
                    ?disabled=${!this.options.enable}
                >                    
                <magic-flex class='item' gap="1em" align="center" 
                    grow="sl-icon + *,:first-child:not(sl-icon)"
                    style="text-align:left;"
                >
                    ${K(r.icon,()=>d`<sl-icon  name="${r.icon}"></sl-icon>`)}     
                    ${this._renderItem(r)}
                </magic-flex> 
                </sl-option>`)} 
        ${this.renderAfterActions()}
        </sl-select> 
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect.styles=[T.styles,Xr,w`
        .actions.before{ 
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
        
        .actions.after{ 
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
        sl-select::part(listbox){
            padding:0;
        }
    `],exports.AutoFieldSelect=y([R("auto-field-select")],exports.AutoFieldSelect);var pl=w`
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
`;var et=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new Y(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let o=this.input.offsetWidth,e=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",s=o*t;if(i){let n=`${o-s}px + ${t} * ${r}`;this.output.style.translate=`calc((${n} - ${e/2}px - ${r} / 2))`;}else {let n=`${s}px - ${t} * ${r}`;this.output.style.translate=`calc(${n} - ${e/2}px + ${r} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o;return d`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--medium":true,"form-control--has-label":e,"form-control--has-help-text":r})}
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
            class=${z({range:true,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
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
              .value=${_t(this.value.toString())}
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
    `}};et.styles=[L,Et,pl];l([O(".range__control")],et.prototype,"input",2);l([O(".range__tooltip")],et.prototype,"output",2);l([E()],et.prototype,"hasFocus",2);l([E()],et.prototype,"hasTooltip",2);l([h()],et.prototype,"title",2);l([h()],et.prototype,"name",2);l([h({type:Number})],et.prototype,"value",2);l([h()],et.prototype,"label",2);l([h({attribute:"help-text"})],et.prototype,"helpText",2);l([h({type:Boolean,reflect:true})],et.prototype,"disabled",2);l([h({type:Number})],et.prototype,"min",2);l([h({type:Number})],et.prototype,"max",2);l([h({type:Number})],et.prototype,"step",2);l([h()],et.prototype,"tooltip",2);l([h({attribute:false})],et.prototype,"tooltipFormatter",2);l([h({reflect:true})],et.prototype,"form",2);l([Dt()],et.prototype,"defaultValue",2);l([Xe({passive:true})],et.prototype,"handleThumbDragStart",1);l([I("value",{waitUntilFirstUpdate:true})],et.prototype,"handleValueChange",1);l([I("disabled",{waitUntilFirstUpdate:true})],et.prototype,"handleDisabledChange",1);l([I("hasTooltip",{waitUntilFirstUpdate:true})],et.prototype,"syncRange",1);et.define("sl-range");exports.AutoFieldRabge=class qo extends T{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top"}}renderInput(){return d`       
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
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
        </sl-range>
        </div> 
       
  
        `}};exports.AutoFieldRabge.styles=[T.styles,w`
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
                    padding: 0 1em;
                    padding-left:0.1em;
                }
                & :last-child{
                    flex-grow: 1;
                }
            }
        `],exports.AutoFieldRabge=y([R("auto-field-range")],exports.AutoFieldRabge);var hl=w`
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
`;function lt(t,o,e){let r=i=>Object.is(i,-0)?0:i;return t<o?r(o):t>e?r(e):r(t)}var bt=class extends V{constructor(){super(...arguments),this.localize=new Y(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let o=this.localize.dir()==="rtl",{left:e,right:r,width:i}=this.rating.getBoundingClientRect(),s=o?this.roundToPrecision((r-t)/i*this.max,this.precision):this.roundToPrecision((t-e)/i*this.max,this.precision);return lt(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let o=this.localize.dir()==="ltr",e=this.localize.dir()==="rtl",r=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||o&&t.key==="ArrowLeft"||e&&t.key==="ArrowRight"){let i=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-i),t.preventDefault();}if(t.key==="ArrowUp"||o&&t.key==="ArrowRight"||e&&t.key==="ArrowLeft"){let i=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+i),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==r&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,o=.5){let e=1/o;return Math.ceil(t*e)/e}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",o=Array.from(Array(this.max).keys()),e=0;return this.disabled||this.readonly?e=this.value:e=this.isHovering?this.hoverValue:this.value,d`
      <div
        part="base"
        class=${z({rating:true,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
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
          ${o.map(r=>e>r&&e<r+1?d`
                <span
                  class=${z({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1})}
                  role="presentation"
                >
                  <div
                    style=${J({clipPath:t?`inset(0 ${(e-r)*100}% 0 0)`:`inset(0 0 0 ${(e-r)*100}%)`})}
                  >
                    ${$t(this.getSymbol(r+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${J({clipPath:t?`inset(0 0 0 ${100-(e-r)*100}%)`:`inset(0 ${100-(e-r)*100}% 0 0)`})}
                  >
                    ${$t(this.getSymbol(r+1))}
                  </div>
                </span>
              `:d`
              <span
                class=${z({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1,"rating__symbol--active":e>=r+1})}
                role="presentation"
              >
                ${$t(this.getSymbol(r+1))}
              </span>
            `)}
        </span>
      </div>
    `}};bt.styles=[L,hl];bt.dependencies={"sl-icon":U};l([O(".rating")],bt.prototype,"rating",2);l([E()],bt.prototype,"hoverValue",2);l([E()],bt.prototype,"isHovering",2);l([h()],bt.prototype,"label",2);l([h({type:Number})],bt.prototype,"value",2);l([h({type:Number})],bt.prototype,"max",2);l([h({type:Number})],bt.prototype,"precision",2);l([h({type:Boolean,reflect:true})],bt.prototype,"readonly",2);l([h({type:Boolean,reflect:true})],bt.prototype,"disabled",2);l([h()],bt.prototype,"getSymbol",2);l([Xe({passive:true})],bt.prototype,"handleTouchMove",1);l([I("hoverValue")],bt.prototype,"handleHoverValueChange",1);l([I("isHovering")],bt.prototype,"handleIsHoveringChange",1);bt.define("sl-rating");exports.AutoFieldRating=class Qr extends T{getInitialOptions(){return {max:5,precision:1}}renderInput(){return d`              
        <sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value=${this.value} 
            max=${this.options.max}
            precision=${this.options.precision}
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
            max=${this.options.max}
            readonly
        > </sl-rating> `}};exports.AutoFieldRating=y([R("auto-field-rating")],exports.AutoFieldRating);var ul=w`
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
`;var Ui=class extends V{render(){return d` <slot></slot> `}};Ui.styles=[L,ul];var dl=w`
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
`;var H=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new nt(this,"help-text","label"),this.localize=new Y(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let o=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!o&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,o,e="none"){this.input.setSelectionRange(t,o,e);}setRangeText(t,o,e,r="preserve"){let i=o??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,r),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return d`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":r})}
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
            class=${z({input:true,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
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
              .value=${_t(this.value)}
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
    `}};H.styles=[L,Et,dl];H.dependencies={"sl-icon":U};l([O(".input__control")],H.prototype,"input",2);l([E()],H.prototype,"hasFocus",2);l([h()],H.prototype,"title",2);l([h({reflect:true})],H.prototype,"type",2);l([h()],H.prototype,"name",2);l([h()],H.prototype,"value",2);l([Dt()],H.prototype,"defaultValue",2);l([h({reflect:true})],H.prototype,"size",2);l([h({type:Boolean,reflect:true})],H.prototype,"filled",2);l([h({type:Boolean,reflect:true})],H.prototype,"pill",2);l([h()],H.prototype,"label",2);l([h({attribute:"help-text"})],H.prototype,"helpText",2);l([h({type:Boolean})],H.prototype,"clearable",2);l([h({type:Boolean,reflect:true})],H.prototype,"disabled",2);l([h()],H.prototype,"placeholder",2);l([h({type:Boolean,reflect:true})],H.prototype,"readonly",2);l([h({attribute:"password-toggle",type:Boolean})],H.prototype,"passwordToggle",2);l([h({attribute:"password-visible",type:Boolean})],H.prototype,"passwordVisible",2);l([h({attribute:"no-spin-buttons",type:Boolean})],H.prototype,"noSpinButtons",2);l([h({reflect:true})],H.prototype,"form",2);l([h({type:Boolean,reflect:true})],H.prototype,"required",2);l([h()],H.prototype,"pattern",2);l([h({type:Number})],H.prototype,"minlength",2);l([h({type:Number})],H.prototype,"maxlength",2);l([h()],H.prototype,"min",2);l([h()],H.prototype,"max",2);l([h()],H.prototype,"step",2);l([h()],H.prototype,"autocapitalize",2);l([h()],H.prototype,"autocorrect",2);l([h()],H.prototype,"autocomplete",2);l([h({type:Boolean})],H.prototype,"autofocus",2);l([h()],H.prototype,"enterkeyhint",2);l([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],H.prototype,"spellcheck",2);l([h()],H.prototype,"inputmode",2);l([I("disabled",{waitUntilFirstUpdate:true})],H.prototype,"handleDisabledChange",1);l([I("step",{waitUntilFirstUpdate:true})],H.prototype,"handleStepChange",1);l([I("value",{waitUntilFirstUpdate:true})],H.prototype,"handleValueChange",1);function ho(t,o){function e(i){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,c=s.left+n.scrollX,a=s.top+n.scrollY,u=i.pageX-c,f=i.pageY-a;o?.onMove&&o.onMove(u,f);}function r(){document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",r),o?.onStop&&o.onStop();}document.addEventListener("pointermove",e,{passive:true}),document.addEventListener("pointerup",r),o?.initialEvent instanceof PointerEvent&&e(o.initialEvent);}var ml=w`
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
`;function*gl(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*on(gl(t.shadowRoot.activeElement))));}function bl(){return [...gl()].pop()}var fl=new WeakMap;function vl(t){let o=fl.get(t);return o||(o=window.getComputedStyle(t,null),fl.set(t,o)),o}function uc(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let o=vl(t);return o.visibility!=="hidden"&&o.display!=="none"}function dc(t){let o=vl(t),{overflowY:e,overflowX:r}=o;return e==="scroll"||r==="scroll"?true:e!=="auto"||r!=="auto"?false:t.scrollHeight>t.clientHeight&&e==="auto"||t.scrollWidth>t.clientWidth&&r==="auto"}function mc(t){let o=t.tagName.toLowerCase(),e=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(o==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${n}:checked`);return c?c===t:s.querySelector(n)===t}return uc(t)?(o==="audio"||o==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(o)?true:dc(t):false}function yl(t){var o,e;let r=gc(t),i=(o=r[0])!=null?o:null,s=(e=r[r.length-1])!=null?e:null;return {start:i,end:s}}function fc(t,o){var e;return ((e=t.getRootNode({composed:true}))==null?void 0:e.host)!==o}function gc(t){let o=new WeakMap,e=[];function r(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||o.has(i))return;o.set(i,true),!e.includes(i)&&mc(i)&&e.push(i),i instanceof HTMLSlotElement&&fc(i,t)&&i.assignedElements({flatten:true}).forEach(s=>{r(s);}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&r(i.shadowRoot);}for(let s of i.children)r(s);}return r(t),e.sort((i,s)=>{let n=Number(i.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var ct=class extends V{constructor(){super(...arguments),this.localize=new Y(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var o;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((o=document.activeElement)==null?void 0:o.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let e=(r,i)=>{if(!r)return null;let s=r.closest(i);if(s)return s;let n=r.getRootNode();return n instanceof ShadowRoot?e(n.host,i):null};setTimeout(()=>{var r;let i=((r=this.containingElement)==null?void 0:r.getRootNode())instanceof ShadowRoot?bl():document.activeElement;(!this.containingElement||e(i,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let o=t.composedPath();this.containingElement&&!o.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let o=t.target;!this.stayOpenOnSelect&&o.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let o=this.getMenu();if(o){let e=o.getAllItems(),r=e[0],i=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),e.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(o.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(o.setCurrentItem(i),i.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let o=this.trigger.assignedElements({flatten:true}).find(r=>yl(r).start),e;if(o){switch(o.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":e=o.button;break;default:e=o;}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,po(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,po(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await ae(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:o}=ne(this,"dropdown.show",{dir:this.localize.dir()});await le(this.popup.popup,t,o),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await ae(this);let{keyframes:t,options:o}=ne(this,"dropdown.hide",{dir:this.localize.dir()});await le(this.popup.popup,t,o),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return d`
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
        class=${z({dropdown:true,"dropdown--open":this.open})}
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
    `}};ct.styles=[L,ml];ct.dependencies={"sl-popup":G};l([O(".dropdown")],ct.prototype,"popup",2);l([O(".dropdown__trigger")],ct.prototype,"trigger",2);l([O(".dropdown__panel")],ct.prototype,"panel",2);l([h({type:Boolean,reflect:true})],ct.prototype,"open",2);l([h({reflect:true})],ct.prototype,"placement",2);l([h({type:Boolean,reflect:true})],ct.prototype,"disabled",2);l([h({attribute:"stay-open-on-select",type:Boolean,reflect:true})],ct.prototype,"stayOpenOnSelect",2);l([h({attribute:false})],ct.prototype,"containingElement",2);l([h({type:Number})],ct.prototype,"distance",2);l([h({type:Number})],ct.prototype,"skidding",2);l([h({type:Boolean})],ct.prototype,"hoist",2);l([h({reflect:true})],ct.prototype,"sync",2);l([I("open",{waitUntilFirstUpdate:true})],ct.prototype,"handleOpenChange",1);se("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});se("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var xl=w`
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
`;var wl=w`
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
`;var ce=class extends V{constructor(){super(...arguments),this.localize=new Y(this);}render(){return d`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};ce.styles=[L,wl];var q=class extends V{constructor(){super(...arguments),this.formControlController=new ht(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new nt(this,"[default]","prefix","suffix"),this.localize=new Y(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:oo}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),o=t?ro`a`:ro`button`;return we`
      <${o}
        part="base"
        class=${z({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
        ${this.caret?we` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?we`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${o}>
    `}};q.styles=[L,Tr];q.dependencies={"sl-icon":U,"sl-spinner":ce};l([O(".button")],q.prototype,"button",2);l([E()],q.prototype,"hasFocus",2);l([E()],q.prototype,"invalid",2);l([h()],q.prototype,"title",2);l([h({reflect:true})],q.prototype,"variant",2);l([h({reflect:true})],q.prototype,"size",2);l([h({type:Boolean,reflect:true})],q.prototype,"caret",2);l([h({type:Boolean,reflect:true})],q.prototype,"disabled",2);l([h({type:Boolean,reflect:true})],q.prototype,"loading",2);l([h({type:Boolean,reflect:true})],q.prototype,"outline",2);l([h({type:Boolean,reflect:true})],q.prototype,"pill",2);l([h({type:Boolean,reflect:true})],q.prototype,"circle",2);l([h()],q.prototype,"type",2);l([h()],q.prototype,"name",2);l([h()],q.prototype,"value",2);l([h()],q.prototype,"href",2);l([h()],q.prototype,"target",2);l([h()],q.prototype,"rel",2);l([h()],q.prototype,"download",2);l([h()],q.prototype,"form",2);l([h({attribute:"formaction"})],q.prototype,"formAction",2);l([h({attribute:"formenctype"})],q.prototype,"formEnctype",2);l([h({attribute:"formmethod"})],q.prototype,"formMethod",2);l([h({attribute:"formnovalidate",type:Boolean})],q.prototype,"formNoValidate",2);l([h({attribute:"formtarget"})],q.prototype,"formTarget",2);l([I("disabled",{waitUntilFirstUpdate:true})],q.prototype,"handleDisabledChange",1);function pt(t,o){bc(t)&&(t="100%");let e=vc(t);return t=o===360?t:Math.min(o,Math.max(0,parseFloat(t))),e&&(t=parseInt(String(t*o),10)/100),Math.abs(t-o)<1e-6?1:(o===360?t=(t<0?t%o+o:t%o)/parseFloat(String(o)):t=t%o/parseFloat(String(o)),t)}function Ko(t){return Math.min(1,Math.max(0,t))}function bc(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function vc(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Zr(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Go(t){return Number(t)<=1?`${Number(t)*100}%`:t}function _e(t){return t.length===1?"0"+t:String(t)}function _l(t,o,e){return {r:pt(t,255)*255,g:pt(o,255)*255,b:pt(e,255)*255}}function Ki(t,o,e){t=pt(t,255),o=pt(o,255),e=pt(e,255);let r=Math.max(t,o,e),i=Math.min(t,o,e),s=0,n=0,c=(r+i)/2;if(r===i)n=0,s=0;else {let a=r-i;switch(n=c>.5?a/(2-r-i):a/(r+i),r){case t:s=(o-e)/a+(o<e?6:0);break;case o:s=(e-t)/a+2;break;case e:s=(t-o)/a+4;break;}s/=6;}return {h:s,s:n,l:c}}function qi(t,o,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+(o-t)*(6*e):e<1/2?o:e<2/3?t+(o-t)*(2/3-e)*6:t}function Cl(t,o,e){let r,i,s;if(t=pt(t,360),o=pt(o,100),e=pt(e,100),o===0)i=e,s=e,r=e;else {let n=e<.5?e*(1+o):e+o-e*o,c=2*e-n;r=qi(c,n,t+1/3),i=qi(c,n,t),s=qi(c,n,t-1/3);}return {r:r*255,g:i*255,b:s*255}}function Gi(t,o,e){t=pt(t,255),o=pt(o,255),e=pt(e,255);let r=Math.max(t,o,e),i=Math.min(t,o,e),s=0,n=r,c=r-i,a=r===0?0:c/r;if(r===i)s=0;else {switch(r){case t:s=(o-e)/c+(o<e?6:0);break;case o:s=(e-t)/c+2;break;case e:s=(t-o)/c+4;break;}s/=6;}return {h:s,s:a,v:n}}function Sl(t,o,e){t=pt(t,360)*6,o=pt(o,100),e=pt(e,100);let r=Math.floor(t),i=t-r,s=e*(1-o),n=e*(1-i*o),c=e*(1-(1-i)*o),a=r%6,u=[e,n,s,s,c,e][a],f=[c,e,e,n,s,s][a],p=[s,s,c,e,e,n][a];return {r:u*255,g:f*255,b:p*255}}function Yi(t,o,e,r){let i=[_e(Math.round(t).toString(16)),_e(Math.round(o).toString(16)),_e(Math.round(e).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function kl(t,o,e,r,i){let s=[_e(Math.round(t).toString(16)),_e(Math.round(o).toString(16)),_e(Math.round(e).toString(16)),_e(yc(r))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function $l(t,o,e,r){let i=t/100,s=o/100,n=e/100,c=r/100,a=255*(1-i)*(1-c),u=255*(1-s)*(1-c),f=255*(1-n)*(1-c);return {r:a,g:u,b:f}}function Xi(t,o,e){let r=1-t/255,i=1-o/255,s=1-e/255,n=Math.min(r,i,s);return n===1?(r=0,i=0,s=0):(r=(r-n)/(1-n)*100,i=(i-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(r),m:Math.round(i),y:Math.round(s),k:Math.round(n)}}function yc(t){return Math.round(parseFloat(t)*255).toString(16)}function Qi(t){return Tt(t)/255}function Tt(t){return parseInt(t,16)}function El(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var Yo={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Al(t){let o={r:0,g:0,b:0},e=1,r=null,i=null,s=null,n=false,c=false;return typeof t=="string"&&(t=_c(t)),typeof t=="object"&&(Mt(t.r)&&Mt(t.g)&&Mt(t.b)?(o=_l(t.r,t.g,t.b),n=true,c=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Mt(t.h)&&Mt(t.s)&&Mt(t.v)?(r=Go(t.s),i=Go(t.v),o=Sl(t.h,r,i),n=true,c="hsv"):Mt(t.h)&&Mt(t.s)&&Mt(t.l)?(r=Go(t.s),s=Go(t.l),o=Cl(t.h,r,s),n=true,c="hsl"):Mt(t.c)&&Mt(t.m)&&Mt(t.y)&&Mt(t.k)&&(o=$l(t.c,t.m,t.y,t.k),n=true,c="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(e=t.a)),e=Zr(e),{ok:n,format:t.format||c,r:Math.min(255,Math.max(o.r,0)),g:Math.min(255,Math.max(o.g,0)),b:Math.min(255,Math.max(o.b,0)),a:e}}var xc="[-\\+]?\\d+%?",wc="[-\\+]?\\d*\\.\\d+%?",Ce="(?:"+wc+")|(?:"+xc+")",Zi="[\\s|\\(]+("+Ce+")[,|\\s]+("+Ce+")[,|\\s]+("+Ce+")\\s*\\)?",Jr="[\\s|\\(]+("+Ce+")[,|\\s]+("+Ce+")[,|\\s]+("+Ce+")[,|\\s]+("+Ce+")\\s*\\)?",Wt={CSS_UNIT:new RegExp(Ce),rgb:new RegExp("rgb"+Zi),rgba:new RegExp("rgba"+Jr),hsl:new RegExp("hsl"+Zi),hsla:new RegExp("hsla"+Jr),hsv:new RegExp("hsv"+Zi),hsva:new RegExp("hsva"+Jr),cmyk:new RegExp("cmyk"+Jr),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function _c(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let o=false;if(Yo[t])t=Yo[t],o=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let e=Wt.rgb.exec(t);return e?{r:e[1],g:e[2],b:e[3]}:(e=Wt.rgba.exec(t),e?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=Wt.hsl.exec(t),e?{h:e[1],s:e[2],l:e[3]}:(e=Wt.hsla.exec(t),e?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=Wt.hsv.exec(t),e?{h:e[1],s:e[2],v:e[3]}:(e=Wt.hsva.exec(t),e?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=Wt.cmyk.exec(t),e?{c:e[1],m:e[2],y:e[3],k:e[4]}:(e=Wt.hex8.exec(t),e?{r:Tt(e[1]),g:Tt(e[2]),b:Tt(e[3]),a:Qi(e[4]),format:o?"name":"hex8"}:(e=Wt.hex6.exec(t),e?{r:Tt(e[1]),g:Tt(e[2]),b:Tt(e[3]),format:o?"name":"hex"}:(e=Wt.hex4.exec(t),e?{r:Tt(e[1]+e[1]),g:Tt(e[2]+e[2]),b:Tt(e[3]+e[3]),a:Qi(e[4]+e[4]),format:o?"name":"hex8"}:(e=Wt.hex3.exec(t),e?{r:Tt(e[1]+e[1]),g:Tt(e[2]+e[2]),b:Tt(e[3]+e[3]),format:o?"name":"hex"}:false))))))))))}function Mt(t){return typeof t=="number"?!Number.isNaN(t):Wt.CSS_UNIT.test(t)}var Xo=class t{constructor(o="",e={}){if(o instanceof t)return o;typeof o=="number"&&(o=El(o)),this.originalInput=o;let r=Al(o);this.originalInput=o,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??r.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let o=this.toRgb();return (o.r*299+o.g*587+o.b*114)/1e3}getLuminance(){let o=this.toRgb(),e,r,i,s=o.r/255,n=o.g/255,c=o.b/255;return s<=.03928?e=s/12.92:e=Math.pow((s+.055)/1.055,2.4),n<=.03928?r=n/12.92:r=Math.pow((n+.055)/1.055,2.4),c<=.03928?i=c/12.92:i=Math.pow((c+.055)/1.055,2.4),.2126*e+.7152*r+.0722*i}getAlpha(){return this.a}setAlpha(o){return this.a=Zr(o),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:o}=this.toHsl();return o===0}toHsv(){let o=Gi(this.r,this.g,this.b);return {h:o.h*360,s:o.s,v:o.v,a:this.a}}toHsvString(){let o=Gi(this.r,this.g,this.b),e=Math.round(o.h*360),r=Math.round(o.s*100),i=Math.round(o.v*100);return this.a===1?`hsv(${e}, ${r}%, ${i}%)`:`hsva(${e}, ${r}%, ${i}%, ${this.roundA})`}toHsl(){let o=Ki(this.r,this.g,this.b);return {h:o.h*360,s:o.s,l:o.l,a:this.a}}toHslString(){let o=Ki(this.r,this.g,this.b),e=Math.round(o.h*360),r=Math.round(o.s*100),i=Math.round(o.l*100);return this.a===1?`hsl(${e}, ${r}%, ${i}%)`:`hsla(${e}, ${r}%, ${i}%, ${this.roundA})`}toHex(o=false){return Yi(this.r,this.g,this.b,o)}toHexString(o=false){return "#"+this.toHex(o)}toHex8(o=false){return kl(this.r,this.g,this.b,this.a,o)}toHex8String(o=false){return "#"+this.toHex8(o)}toHexShortString(o=false){return this.a===1?this.toHexString(o):this.toHex8String(o)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let o=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return this.a===1?`rgb(${o}, ${e}, ${r})`:`rgba(${o}, ${e}, ${r}, ${this.roundA})`}toPercentageRgb(){let o=e=>`${Math.round(pt(e,255)*100)}%`;return {r:o(this.r),g:o(this.g),b:o(this.b),a:this.a}}toPercentageRgbString(){let o=e=>Math.round(pt(e,255)*100);return this.a===1?`rgb(${o(this.r)}%, ${o(this.g)}%, ${o(this.b)}%)`:`rgba(${o(this.r)}%, ${o(this.g)}%, ${o(this.b)}%, ${this.roundA})`}toCmyk(){return {...Xi(this.r,this.g,this.b)}}toCmykString(){let{c:o,m:e,y:r,k:i}=Xi(this.r,this.g,this.b);return `cmyk(${o}, ${e}, ${r}, ${i})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let o="#"+Yi(this.r,this.g,this.b,false);for(let[e,r]of Object.entries(Yo))if(o===r)return e;return  false}toString(o){let e=!!o;o=o??this.format;let r=false,i=this.a<1&&this.a>=0;return !e&&i&&(o.startsWith("hex")||o==="name")?o==="name"&&this.a===0?this.toName():this.toRgbString():(o==="rgb"&&(r=this.toRgbString()),o==="prgb"&&(r=this.toPercentageRgbString()),(o==="hex"||o==="hex6")&&(r=this.toHexString()),o==="hex3"&&(r=this.toHexString(true)),o==="hex4"&&(r=this.toHex8String(true)),o==="hex8"&&(r=this.toHex8String()),o==="name"&&(r=this.toName()),o==="hsl"&&(r=this.toHslString()),o==="hsv"&&(r=this.toHsvString()),o==="cmyk"&&(r=this.toCmykString()),r||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(o=10){let e=this.toHsl();return e.l+=o/100,e.l=Ko(e.l),new t(e)}brighten(o=10){let e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(o/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(o/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(o/100)))),new t(e)}darken(o=10){let e=this.toHsl();return e.l-=o/100,e.l=Ko(e.l),new t(e)}tint(o=10){return this.mix("white",o)}shade(o=10){return this.mix("black",o)}desaturate(o=10){let e=this.toHsl();return e.s-=o/100,e.s=Ko(e.s),new t(e)}saturate(o=10){let e=this.toHsl();return e.s+=o/100,e.s=Ko(e.s),new t(e)}greyscale(){return this.desaturate(100)}spin(o){let e=this.toHsl(),r=(e.h+o)%360;return e.h=r<0?360+r:r,new t(e)}mix(o,e=50){let r=this.toRgb(),i=new t(o).toRgb(),s=e/100,n={r:(i.r-r.r)*s+r.r,g:(i.g-r.g)*s+r.g,b:(i.b-r.b)*s+r.b,a:(i.a-r.a)*s+r.a};return new t(n)}analogous(o=6,e=30){let r=this.toHsl(),i=360/e,s=[this];for(r.h=(r.h-(i*o>>1)+720)%360;--o;)r.h=(r.h+i)%360,s.push(new t(r));return s}complement(){let o=this.toHsl();return o.h=(o.h+180)%360,new t(o)}monochromatic(o=6){let e=this.toHsv(),{h:r}=e,{s:i}=e,{v:s}=e,n=[],c=1/o;for(;o--;)n.push(new t({h:r,s:i,v:s})),s=(s+c)%1;return n}splitcomplement(){let o=this.toHsl(),{h:e}=o;return [this,new t({h:(e+72)%360,s:o.s,l:o.l}),new t({h:(e+216)%360,s:o.s,l:o.l})]}onBackground(o){let e=this.toRgb(),r=new t(o).toRgb(),i=e.a+r.a*(1-e.a);return new t({r:(e.r*e.a+r.r*r.a*(1-e.a))/i,g:(e.g*e.a+r.g*r.a*(1-e.a))/i,b:(e.b*e.a+r.b*r.a*(1-e.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(o){let e=this.toHsl(),{h:r}=e,i=[this],s=360/o;for(let n=1;n<o;n++)i.push(new t({h:(r+n*s)%360,s:e.s,l:e.l}));return i}equals(o){let e=new t(o);return this.format==="cmyk"||e.format==="cmyk"?this.toCmykString()===e.toCmykString():this.toRgbString()===e.toRgbString()}};var Ol="EyeDropper"in window,W=class extends V{constructor(){super(),this.formControlController=new ht(this),this.isSafeValue=false,this.localize=new Y(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],o=(t.indexOf(this.format)+1)%t.length;this.format=t[o],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let o=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),e=o.querySelector(".color-picker__slider-handle"),{width:r}=o.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),ho(o,{onMove:n=>{this.alpha=lt(n/r*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let o=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),e=o.querySelector(".color-picker__slider-handle"),{width:r}=o.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),ho(o,{onMove:n=>{this.hue=lt(n/r*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let o=this.shadowRoot.querySelector(".color-picker__grid"),e=o.querySelector(".color-picker__grid-handle"),{width:r,height:i}=o.getBoundingClientRect(),s=this.value,n=this.value;e.focus(),t.preventDefault(),this.isDraggingGridHandle=true,ho(o,{onMove:(c,a)=>{this.saturation=lt(c/r*100,0,100),this.brightness=lt(100-a/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let o=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=lt(this.alpha-o,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=lt(this.alpha+o,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let o=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=lt(this.hue-o,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=lt(this.hue+o,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let o=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=lt(this.saturation-o,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=lt(this.saturation+o,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=lt(this.brightness+o,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=lt(this.brightness-o,0,100),this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let o=t.target,e=this.value;t.stopPropagation(),this.input.value?(this.setColor(o.value),o.value=this.value):this.value="",this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let o=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let o=new Xo(t);if(!o.isValid)return null;let e=o.toHsl(),r={h:e.h,s:e.s*100,l:e.l*100,a:e.a},i=o.toRgb(),s=o.toHexString(),n=o.toHex8String(),c=o.toHsv(),a={h:c.h,s:c.s*100,v:c.v*100,a:c.a};return {hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:a.h,s:a.s,v:a.v,string:this.setLetterCase(`hsv(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.v)}%)`)},hsva:{h:a.h,s:a.s,v:a.v,a:a.a,string:this.setLetterCase(`hsva(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.v)}%, ${a.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let o=this.parseColor(t);return o===null?false:(this.hue=o.hsva.h,this.saturation=o.hsva.s,this.brightness=o.hsva.v,this.alpha=this.opacity?o.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!Ol)return;new EyeDropper().open().then(o=>{let e=this.value;this.setColor(o.sRGBHex),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let o=this.value;this.disabled||(this.setColor(t),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,o,e,r=100){let i=new Xo(`hsva(${t}, ${o}%, ${e}%, ${r/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,o){if(this.isEmpty=!o,o||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let e=this.parseColor(o);e!==null?(this.inputValue=this.value,this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=e.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let o=this.inline?this.base:this.trigger;this.hasFocus&&(o.focus({preventScroll:true}),o.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let o=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(o===null)return "";switch(t){case "hex":return o.hex;case "hexa":return o.hexa;case "rgb":return o.rgb.string;case "rgba":return o.rgba.string;case "hsl":return o.hsl.string;case "hsla":return o.hsla.string;case "hsv":return o.hsv.string;case "hsva":return o.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,o=100-this.brightness,e=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),r=d`
      <div
        part="base"
        class=${z({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
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
            class=${z({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${J({top:`${o}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            ${Ol?d`
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

        ${e.length>0?d`
              <div part="swatches" class="color-picker__swatches">
                ${e.map(i=>{let s=this.parseColor(i);return s?d`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${C(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${i}
                      @click=${()=>this.selectSwatch(i)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(s.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${J({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${i}"`,this),"")})}
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
          class=${z({"color-dropdown__trigger":true,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":true})}
          style=${J({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${r}
      </sl-dropdown>
    `}};W.styles=[L,xl];W.dependencies={"sl-button-group":xe,"sl-button":q,"sl-dropdown":ct,"sl-icon":U,"sl-input":H,"sl-visually-hidden":Ui};l([O('[part~="base"]')],W.prototype,"base",2);l([O('[part~="input"]')],W.prototype,"input",2);l([O(".color-dropdown")],W.prototype,"dropdown",2);l([O('[part~="preview"]')],W.prototype,"previewButton",2);l([O('[part~="trigger"]')],W.prototype,"trigger",2);l([E()],W.prototype,"hasFocus",2);l([E()],W.prototype,"isDraggingGridHandle",2);l([E()],W.prototype,"isEmpty",2);l([E()],W.prototype,"inputValue",2);l([E()],W.prototype,"hue",2);l([E()],W.prototype,"saturation",2);l([E()],W.prototype,"brightness",2);l([E()],W.prototype,"alpha",2);l([h()],W.prototype,"value",2);l([Dt()],W.prototype,"defaultValue",2);l([h()],W.prototype,"label",2);l([h()],W.prototype,"format",2);l([h({type:Boolean,reflect:true})],W.prototype,"inline",2);l([h({reflect:true})],W.prototype,"size",2);l([h({attribute:"no-format-toggle",type:Boolean})],W.prototype,"noFormatToggle",2);l([h()],W.prototype,"name",2);l([h({type:Boolean,reflect:true})],W.prototype,"disabled",2);l([h({type:Boolean})],W.prototype,"hoist",2);l([h({type:Boolean})],W.prototype,"opacity",2);l([h({type:Boolean})],W.prototype,"uppercase",2);l([h()],W.prototype,"swatches",2);l([h({reflect:true})],W.prototype,"form",2);l([h({type:Boolean,reflect:true})],W.prototype,"required",2);l([Xe({passive:false})],W.prototype,"handleTouchMove",1);l([I("format",{waitUntilFirstUpdate:true})],W.prototype,"handleFormatChange",1);l([I("opacity",{waitUntilFirstUpdate:true})],W.prototype,"handleOpacityChange",1);l([I("value")],W.prototype,"handleValueChange",1);W.define("sl-color-picker");var Cc=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class Qo extends T{getInitialOptions(){return {format:"hex",opacity:false,inline:false,presets:Cc}}renderInput(){return d`
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
        `}renderView(){return d`<span><span class="color" style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[T.styles,w`
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
    `],exports.AutoFieldColorPicker=y([R("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class Zo extends T{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((e,r)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{id:e,label:e,value:e}),i.icon&&(this.isShowIcon=true),i.$index=r,i}),this.selection=this.value;}renderInput(){return d`
            <div class="items">        
                ${this.items.map(e=>this.renderCheckItemWithCard(this.renderCheckboxItem(e),e))} </div>
        `}renderCheckboxItem(e){return d`              
            <sl-checkbox      
                data-index="${e.$index}"
                data-value="${e[this.valueKey]}"
                .value="${e[this.valueKey]}" 
                .checked=${this.value.includes(e[this.valueKey])} 
                help-text="${e.tips}"
                @sl-change=${this._onCheckChange.bind(this)}
            > ${e.label}</sl-checkbox> 
        `}_onCheckChange(e){let r=e.target.closest(".card")||e.target,i=Number(r.dataset.index),s=r.checked??!r.classList.contains("selected"),n=this.items[i];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let c=this.selection.findIndex(a=>a===n[this.valueKey]);c>-1&&this.selection.splice(c,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(e,r){if(this.options.card){let i=this.selection.includes(r[this.valueKey]);return d`<div class="card ${i?"selected":""}"
                data-index ="${r.$index}"
                style=${J({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">
                    ${K(this.isShowIcon,()=>d`<sl-icon  class="icon" name="${r.icon||""}"></sl-icon>`)}                    
                    ${e}                    
                </div>
            </div>`}else return e}};exports.AutoFieldCheckboxGroup.styles=[T.styles,w`
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
        sl-icon::part(svg){
            stroke-width: 1; 
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
                    font-size: calc(2 * var(--auto-font-size));
                }
                sl-checkbox::part(label){
                    margin-left: 0px;                    
                    font-size: var(--auto-font-size);
                }
                sl-checkbox::part(form-control-help-text){
                    max-height: 2.5em; 
                    line-height:120%;
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
    `],exports.AutoFieldCheckboxGroup=y([R("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class Jo extends T{constructor(){super(...arguments);this.parts=[];}getInitialOptions(){return {template:"0000",delimiter:"",caseType:"both",includeDelimiter:true,onlyNumber:false}}_isValidChar(e){return this.options.chars?new RegExp(this.options.chars).test(e):true}_onKeyDown(e){let r=e.key;r.length===1&&(this._isValidChar(r)||e.preventDefault(),e.stopPropagation());}_onPartInput(e){let i=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,c)=>(n+=c.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),s=0;this.parts.forEach((n,c)=>{this.options.delimiter.includes(n)||(this.parts[c]=i[s++]);}),this.onFieldChange(),this._isLastInput(e);}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((e,r)=>this.options.delimiter.includes(r)?e:`${e}${r}`,"")}_isLastInput(e){let r=e.target;if(r.value.length>=1){r.blur();let i=r.nextElementSibling||r.nextElementSibling?.nextElementSibling;i&&(i.focus(),i.select());}}_onPaste(e){e.preventDefault();let r=e.clipboardData?.getData("text/plain")||"",i=this._parseParts(r),s=c=>{if(c){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let c of i)if(!this.options.delimiter.includes(c)&&(n.value=c,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value);}_parseParts(e){let r=this.options.delimiter,i=this.options.template,s=0;return Array.from(i).map(n=>{if(r.includes(n))return e[s]===n&&s++,n;{let c=e[s++]||n;return this.options.caseType==="upper"?c.toUpperCase():this.options.caseType==="lower"?c.toLowerCase():c}})}_onPartFocus(e){e.target.select();}renderPart(e){return d`<sl-input        
            maxLength = "1"
            .value=${e} 
            noSpinButtons
            autocorrect="off"
            autocomplete="off"
            spellcheck="false"
            @paste=${r=>this._onPaste(r)}
            @sl-focus=${this._onPartFocus.bind(this)}
            @keydown=${this._onKeyDown.bind(this)}
            @sl-input=${this._onPartInput.bind(this)}></sl-input>`}renderInput(){return d`
            <magic-flex grow="none" align="center" gap="0.5em" wrap>
                ${ft(this.parts,e=>this.options.delimiter.includes(e)?d`${e}`:this.renderPart(e))}
            </magic-flex>
        `}};exports.AutoFieldParts.styles=[T.styles,w`
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
            sl-input::part(input){
                text-align: center;
            }
            sl-input::part(input)::selection{
                background: none;
            }
            sl-input::part(input):focus{
                background-color: var(--sl-color-gray-100);
            }
        `],exports.AutoFieldParts=y([R("auto-field-parts")],exports.AutoFieldParts);var Tl=w`
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
`;var ti=class extends V{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let o=["menuitem","menuitemcheckbox"],e=t.composedPath(),r=e.find(c=>{var a;return o.includes(((a=c?.getAttribute)==null?void 0:a.call(c,"role"))||"")});if(!r||e.find(c=>{var a;return ((a=c?.getAttribute)==null?void 0:a.call(c,"role"))==="menu"})!==this)return;let n=r;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let o=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),o?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let o=this.getAllItems(),e=this.getCurrentItem(),r=e?o.indexOf(e):0;o.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?r++:t.key==="ArrowUp"?r--:t.key==="Home"?r=0:t.key==="End"&&(r=o.length-1),r<0&&(r=o.length-1),r>o.length-1&&(r=0),this.setCurrentItem(o[r]),o[r].focus());}}handleMouseDown(t){let o=t.target;this.isMenuItem(o)&&this.setCurrentItem(o);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var o;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((o=t.getAttribute("role"))!=null?o:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1");});}render(){return d`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};ti.styles=[L,Tl];l([O("slot")],ti.prototype,"defaultSlot",2);ti.define("sl-menu");var Il=w`
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
`;var tr=(t,o)=>{let e=t._$AN;if(e===void 0)return  false;for(let r of e)r._$AO?.(o,false),tr(r,o);return  true},ei=t=>{let o,e;do{if((o=t._$AM)===void 0)break;e=o._$AN,e.delete(t),t=o;}while(e?.size===0)},Rl=t=>{for(let o;o=t._$AM;t=o){let e=o._$AN;if(e===void 0)o._$AN=e=new Set;else if(e.has(t))break;e.add(t),$c(o);}};function Sc(t){this._$AN!==void 0?(ei(this),this._$AM=t,Rl(this)):this._$AM=t;}function kc(t,o=false,e=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(o)if(Array.isArray(r))for(let s=e;s<r.length;s++)tr(r[s],false),ei(r[s]);else r!=null&&(tr(r,false),ei(r));else tr(this,t);}var $c=t=>{t.type==mt.CHILD&&(t._$AP??=kc,t._$AQ??=Sc);},oi=class extends kt{constructor(){super(...arguments),this._$AN=void 0;}_$AT(o,e,r){super._$AT(o,e,r),Rl(this),this.isConnected=o._$AU;}_$AO(o,e=true){o!==this.isConnected&&(this.isConnected=o,o?this.reconnected?.():this.disconnected?.()),e&&(tr(this,o),ei(this));}setValue(o){if(xr(this._$Ct))this._$Ct._$AI(o,this);else {let e=[...this._$Ct._$AH];e[this._$Ci]=o,this._$Ct._$AI(e,this,0);}}disconnected(){}reconnected(){}};var Vl=()=>new ts,ts=class{},Ji=new WeakMap,zl=Pt(class extends oi{render(t){return Q}update(t,[o]){let e=o!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=o,this.ht=t.options?.host,this.rt(this.ct=t.element)),Q}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let o=this.ht??globalThis,e=Ji.get(o);e===void 0&&(e=new WeakMap,Ji.set(o,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?Ji.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var Pl=class{constructor(t,o){this.popupRef=Vl(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=e=>{switch(e.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(e);break;}},this.handleClick=e=>{var r;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&(e.target.tagName==="sl-menu-item"||(r=e.target.role)!=null&&r.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=e=>{e.stopPropagation();},this.handlePopupReposition=()=>{let e=this.host.renderRoot.querySelector("slot[name='submenu']"),r=e?.assignedElements({flatten:true}).filter(u=>u.localName==="sl-menu")[0],i=getComputedStyle(this.host).direction==="rtl";if(!r)return;let{left:s,top:n,width:c,height:a}=r.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${i?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${i?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+a}px`);},(this.host=t).addController(this),this.hasSlotController=o;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let o=this.host.renderRoot.querySelector("slot[name='submenu']");if(!o){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let e=null;for(let r of o.assignedElements())if(e=r.querySelectorAll("sl-menu-item, [role^='menuitem']"),e.length!==0)break;if(!(!e||e.length===0)){e[0].setAttribute("tabindex","0");for(let r=1;r!==e.length;++r)e[r].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?e[0]instanceof HTMLElement&&e[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{e[0]instanceof HTMLElement&&e[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let o=this.host.parentElement.computedStyleMap(),r=["padding-top","border-top-width","margin-top"].reduce((i,s)=>{var n;let c=(n=o.get(s))!=null?n:new CSSUnitValue(0,"px"),u=(c instanceof CSSUnitValue?c:new CSSUnitValue(0,"px")).to("px");return i-u.value},0);this.skidding=r;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?d`
      <sl-popup
        ${zl(this.popupRef)}
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
    `:d` <slot name="submenu" hidden></slot> `}};var It=class extends V{constructor(){super(...arguments),this.localize=new Y(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new nt(this,"submenu"),this.submenuController=new Pl(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return nn(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",o=this.submenuController.isExpanded();return d`
      <div
        id="anchor"
        part="base"
        class=${z({"menu-item":true,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":o})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!o}"
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
    `}};It.styles=[L,Il];It.dependencies={"sl-icon":U,"sl-popup":G,"sl-spinner":ce};l([O("slot:not([name])")],It.prototype,"defaultSlot",2);l([O(".menu-item")],It.prototype,"menuItem",2);l([h()],It.prototype,"type",2);l([h({type:Boolean,reflect:true})],It.prototype,"checked",2);l([h()],It.prototype,"value",2);l([h({type:Boolean,reflect:true})],It.prototype,"loading",2);l([h({type:Boolean,reflect:true})],It.prototype,"disabled",2);l([I("checked")],It.prototype,"handleCheckedChange",1);l([I("disabled")],It.prototype,"handleDisabledChange",1);l([I("type")],It.prototype,"handleTypeChange",1);It.define("sl-menu-item");var Ll=w`
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
`;var es=()=>null,Rt=class extends V{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new Y(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=es,this.snapThreshold=12;}toSnapFunction(t){let o=t.split(" ");return ({pos:e,size:r,snapThreshold:i,isRtl:s,vertical:n})=>{let c=e,a=Number.POSITIVE_INFINITY;return o.forEach(u=>{let f;if(u.startsWith("repeat(")){let m=t.substring(7,t.length-1),g=m.endsWith("%"),b=Number.parseFloat(m),v=g?r*(b/100):b;f=Math.round((s&&!n?r-e:e)/v)*v;}else u.endsWith("%")?f=r*(Number.parseFloat(u)/100):f=Number.parseFloat(u);s&&!n&&(f=r-f);let p=Math.abs(e-f);p<=i&&p<a&&(c=f,a=p);}),c}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=es;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:o}=this.getBoundingClientRect();this.size=this.vertical?o:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let o=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),ho(this,{onMove:(e,r)=>{var i;let s=this.vertical?r:e;this.primary==="end"&&(s=this.size-s),s=(i=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:o,vertical:this.vertical}))!=null?i:s,this.position=lt(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let o=this.position,e=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(o-=e),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(o+=e),t.key==="Home"&&(o=this.primary==="end"?100:0),t.key==="End"&&(o=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)o=this.positionBeforeCollapsing,this.isCollapsed=false;else {let r=this.position;o=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=r;});}this.position=lt(o,0,100);}}handleResize(t){let{width:o,height:e}=t[0].contentRect;this.size=this.vertical?e:o,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",o=this.vertical?"gridTemplateColumns":"gridTemplateRows",e=this.localize.dir()==="rtl",r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i="auto";return this.primary==="end"?e&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${r}`:e&&!this.vertical?this.style[t]=`${i} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${i}`,this.style[o]="",d`
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
    `}};Rt.styles=[L,Ll];l([O(".divider")],Rt.prototype,"divider",2);l([h({type:Number,reflect:true})],Rt.prototype,"position",2);l([h({attribute:"position-in-pixels",type:Number})],Rt.prototype,"positionInPixels",2);l([h({type:Boolean,reflect:true})],Rt.prototype,"vertical",2);l([h({type:Boolean,reflect:true})],Rt.prototype,"disabled",2);l([h()],Rt.prototype,"primary",2);l([h({reflect:true})],Rt.prototype,"snap",1);l([h({type:Number,attribute:"snap-threshold"})],Rt.prototype,"snapThreshold",2);l([I("position")],Rt.prototype,"handlePositionChange",1);l([I("positionInPixels")],Rt.prototype,"handlePositionInPixelsChange",1);l([I("vertical")],Rt.prototype,"handleVerticalChange",1);Rt.define("sl-split-panel");Xt.define("sl-tag");exports.AutoFieldList=class Fe extends T{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.items=[];this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}connectedCallback(){if(super.connectedCallback(),this.options){this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let e=this.options.select;e&&(this.items=e,this.items.forEach(r=>{this.isItemSelected(r)&&this.selection.push(r[this.valueKey]);})),this.setPresetActions();}this.style.height="auto";}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.valueKey]:this.value.includes(e[this.valueKey])}_addSecectItem(e){this.selection.findIndex(i=>i[this.valueKey]===e[this.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(e[this.valueKey]));}_removeSelectItem(e){for(let r=this.selection.length-1;r>=0;r--)this.selection[r]===e&&this.selection.splice(r,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(e){let r=e.detail.item,i=r.dataset.index,s=this.items[i];s&&(r.checked?this._addSecectItem(s):this._removeSelectItem(s[this.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.length}`,this.onFieldChange());}_renderWithSplitPanel(e){return this.options.showResults?d`<sl-split-panel position="60">
                ${e}
                ${this.renderResults()}
            </sl-split-panel>`:e}_renderItem(e){let r=this.options.renderItem;return typeof r=="string"?d`${$t(r.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof r=="function"?d`${$t(r(e))}`:e.label}_onClickPresetAction(e){e==="all"?this.selection=this.items.map(r=>r[this.valueKey]):e==="reverse"?this.selection=this.items.filter(r=>!this.selection.includes(r[this.valueKey])).map(r=>r[this.valueKey]):e==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let e=[{id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")}],r=i=>{for(let s=e.length-1;s>=0;s--)if(e[s].id===i.id){let n=i.onClick;i.onClick=()=>{e[s].onClick(),n&&n.call(this,this.getInputValue());},e.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(i=>{r(i);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(i=>{r(i);}),e.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...e));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(e){let r=this.options.labelKey;if(r){if(r in e)return e[r]}else return e.label}renderResults(){return d`<div slot="end" 
            class="results mark-err" 
            no-padding 
            style="${J({maxHeight:this.options.height})}">
            ${ft(this.selection,e=>d`<div class="item" >
                    <span>${e}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(e)}></sl-icon-button>
                </div>`)}
        </div>`}_renderList(){let e=Array.isArray(this.value)?this.value:[this.value];return d`${this._renderWithSplitPanel(d`
            <sl-menu slot="start" class="mark-err" style=${J({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}>
            ${ft(this.items,(r,i)=>{let s=e.includes(r[this.valueKey]);return d`<sl-menu-item 
                        type="checkbox"                
                        data-index=${String(i)} 
                        .checked=${s}
                    >                
                        ${K(r.icon,()=>d`<sl-icon slot="prefix" name="${r.icon}"></sl-icon>`)}
                        <magic-flex no-border no-padding flex="row" style="width:100%;">
                            ${this._renderItem(r)}
                        </magic-flex>
                    </sl-menu-item>`})}
            </sl-menu>`)} `}_renderHeader(){return d`${K(this.beforeActions.length>0,()=>d`<div class="header">
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
        `}};exports.AutoFieldList.styles=[T.styles,w`
            sl-menu-item[checked]{
                background-color: var(--sl-color-primary-100);                
            } 
            .header{
                padding:4px  0px ;
                padding-bottom:8px;
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
                    padding: 0px 1em;
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
            
        `],y([E()],exports.AutoFieldList.prototype,"selectedTips",2),y([O("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=y([R("auto-field-list")],exports.AutoFieldList);var Ml=w`
  :host {
    display: inline-block;
  }
`;var Dl=null,ri=class{};ri.render=function(t,o){Dl(t,o);};self.QrCreator=ri;(function(t){function o(c,a,u,f){var p={},m=t(u,a);m.u(c),m.J(),f=f||0;var g=m.h(),b=m.h()+2*f;return p.text=c,p.level=a,p.version=u,p.O=b,p.a=function(v,A){return v-=f,A-=f,0>v||v>=g||0>A||A>=g?false:m.a(v,A)},p}function e(c,a,u,f,p,m,g,b,v,A){function k(_,$,x,S,M,F,j){_?(c.lineTo($+F,x+j),c.arcTo($,x,S,M,m)):c.lineTo($,x);}g?c.moveTo(a+m,u):c.moveTo(a,u),k(b,f,u,f,p,-m,0),k(v,f,p,a,p,0,-m),k(A,a,p,a,u,m,0),k(g,a,u,f,u,0,m);}function r(c,a,u,f,p,m,g,b,v,A){function k(_,$,x,S){c.moveTo(_+x,$),c.lineTo(_,$),c.lineTo(_,$+S),c.arcTo(_,$,_+x,$,m);}g&&k(a,u,m,m),b&&k(f,u,-m,m),v&&k(f,p,-m,-m),A&&k(a,p,m,-m);}function i(c,a){var u=a.fill;if(typeof u=="string")c.fillStyle=u;else {var f=u.type,p=u.colorStops;if(u=u.position.map(g=>Math.round(g*a.size)),f==="linear-gradient")var m=c.createLinearGradient.apply(c,u);else if(f==="radial-gradient")m=c.createRadialGradient.apply(c,u);else throw Error("Unsupported fill");p.forEach(([g,b])=>{m.addColorStop(g,b);}),c.fillStyle=m;}}function s(c,a){t:{var u=a.text,f=a.v,p=a.N,m=a.K,g=a.P;for(p=Math.max(1,p||1),m=Math.min(40,m||40);p<=m;p+=1)try{var b=o(u,f,p,g);break t}catch{}b=void 0;}if(!b)return null;for(u=c.getContext("2d"),a.background&&(u.fillStyle=a.background,u.fillRect(a.left,a.top,a.size,a.size)),f=b.O,m=a.size/f,u.beginPath(),g=0;g<f;g+=1)for(p=0;p<f;p+=1){var v=u,A=a.left+p*m,k=a.top+g*m,_=g,$=p,x=b.a,S=A+m,M=k+m,F=_-1,j=_+1,D=$-1,P=$+1,at=Math.floor(Math.min(.5,Math.max(0,a.R))*m),it=x(_,$),vt=x(F,D),wt=x(F,$);F=x(F,P);var yt=x(_,P);P=x(j,P),$=x(j,$),j=x(j,D),_=x(_,D),A=Math.round(A),k=Math.round(k),S=Math.round(S),M=Math.round(M),it?e(v,A,k,S,M,at,!wt&&!_,!wt&&!yt,!$&&!yt,!$&&!_):r(v,A,k,S,M,at,wt&&_&&vt,wt&&yt&&F,$&&yt&&P,$&&_&&j);}return i(u,a),u.fill(),c}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Dl=function(c,a){var u={};Object.assign(u,n,c),u.N=u.minVersion,u.K=u.maxVersion,u.v=u.ecLevel,u.left=u.left,u.top=u.top,u.size=u.size,u.fill=u.fill,u.background=u.background,u.text=u.text,u.R=u.radius,u.P=u.quiet,a instanceof HTMLCanvasElement?((a.width!==u.size||a.height!==u.size)&&(a.width=u.size,a.height=u.size),a.getContext("2d").clearRect(0,0,a.width,a.height),s(a,u)):(c=document.createElement("canvas"),c.width=u.size,c.height=u.size,u=s(c,u),a.appendChild(u));};})(function(){function t(a){var u=e.s(a);return {S:function(){return 4},b:function(){return u.length},write:function(f){for(var p=0;p<u.length;p+=1)f.put(u[p],8);}}}function o(){var a=[],u=0,f={B:function(){return a},c:function(p){return (a[Math.floor(p/8)]>>>7-p%8&1)==1},put:function(p,m){for(var g=0;g<m;g+=1)f.m((p>>>m-g-1&1)==1);},f:function(){return u},m:function(p){var m=Math.floor(u/8);a.length<=m&&a.push(0),p&&(a[m]|=128>>>u%8),u+=1;}};return f}function e(a,u){function f(_,$){for(var x=-1;7>=x;x+=1)if(!(-1>=_+x||b<=_+x))for(var S=-1;7>=S;S+=1) -1>=$+S||b<=$+S||(g[_+x][$+S]=0<=x&&6>=x&&(S==0||S==6)||0<=S&&6>=S&&(x==0||x==6)||2<=x&&4>=x&&2<=S&&4>=S);}function p(_,$){for(var x=b=4*a+17,S=Array(x),M=0;M<x;M+=1){S[M]=Array(x);for(var F=0;F<x;F+=1)S[M][F]=null;}for(g=S,f(0,0),f(b-7,0),f(0,b-7),x=s.G(a),S=0;S<x.length;S+=1)for(M=0;M<x.length;M+=1){F=x[S];var j=x[M];if(g[F][j]==null)for(var D=-2;2>=D;D+=1)for(var P=-2;2>=P;P+=1)g[F+D][j+P]=D==-2||D==2||P==-2||P==2||D==0&&P==0;}for(x=8;x<b-8;x+=1)g[x][6]==null&&(g[x][6]=x%2==0);for(x=8;x<b-8;x+=1)g[6][x]==null&&(g[6][x]=x%2==0);for(x=s.w(m<<3|$),S=0;15>S;S+=1)M=!_&&(x>>S&1)==1,g[6>S?S:8>S?S+1:b-15+S][8]=M,g[8][8>S?b-S-1:9>S?15-S:14-S]=M;if(g[b-8][8]=!_,7<=a){for(x=s.A(a),S=0;18>S;S+=1)M=!_&&(x>>S&1)==1,g[Math.floor(S/3)][S%3+b-8-3]=M;for(S=0;18>S;S+=1)M=!_&&(x>>S&1)==1,g[S%3+b-8-3][Math.floor(S/3)]=M;}if(v==null){for(_=c.I(a,m),x=o(),S=0;S<A.length;S+=1)M=A[S],x.put(4,4),x.put(M.b(),s.f(4,a)),M.write(x);for(S=M=0;S<_.length;S+=1)M+=_[S].j;if(x.f()>8*M)throw Error("code length overflow. ("+x.f()+">"+8*M+")");for(x.f()+4<=8*M&&x.put(0,4);x.f()%8!=0;)x.m(false);for(;!(x.f()>=8*M)&&(x.put(236,8),!(x.f()>=8*M));)x.put(17,8);var at=0;for(M=S=0,F=Array(_.length),j=Array(_.length),D=0;D<_.length;D+=1){var it=_[D].j,vt=_[D].o-it;for(S=Math.max(S,it),M=Math.max(M,vt),F[D]=Array(it),P=0;P<F[D].length;P+=1)F[D][P]=255&x.B()[P+at];for(at+=it,P=s.C(vt),it=r(F[D],P.b()-1).l(P),j[D]=Array(P.b()-1),P=0;P<j[D].length;P+=1)vt=P+it.b()-j[D].length,j[D][P]=0<=vt?it.c(vt):0;}for(P=x=0;P<_.length;P+=1)x+=_[P].o;for(x=Array(x),P=at=0;P<S;P+=1)for(D=0;D<_.length;D+=1)P<F[D].length&&(x[at]=F[D][P],at+=1);for(P=0;P<M;P+=1)for(D=0;D<_.length;D+=1)P<j[D].length&&(x[at]=j[D][P],at+=1);v=x;}for(_=v,x=-1,S=b-1,M=7,F=0,$=s.F($),j=b-1;0<j;j-=2)for(j==6&&--j;;){for(D=0;2>D;D+=1)g[S][j-D]==null&&(P=false,F<_.length&&(P=(_[F]>>>M&1)==1),$(S,j-D)&&(P=!P),g[S][j-D]=P,--M,M==-1&&(F+=1,M=7));if(S+=x,0>S||b<=S){S-=x,x=-x;break}}}var m=i[u],g=null,b=0,v=null,A=[],k={u:function(_){_=t(_),A.push(_),v=null;},a:function(_,$){if(0>_||b<=_||0>$||b<=$)throw Error(_+","+$);return g[_][$]},h:function(){return b},J:function(){for(var _=0,$=0,x=0;8>x;x+=1){p(true,x);var S=s.D(k);(x==0||_>S)&&(_=S,$=x);}p(false,$);}};return k}function r(a,u){if(typeof a.length>"u")throw Error(a.length+"/"+u);var f=function(){for(var m=0;m<a.length&&a[m]==0;)m+=1;for(var g=Array(a.length-m+u),b=0;b<a.length-m;b+=1)g[b]=a[b+m];return g}(),p={c:function(m){return f[m]},b:function(){return f.length},multiply:function(m){for(var g=Array(p.b()+m.b()-1),b=0;b<p.b();b+=1)for(var v=0;v<m.b();v+=1)g[b+v]^=n.i(n.g(p.c(b))+n.g(m.c(v)));return r(g,0)},l:function(m){if(0>p.b()-m.b())return p;for(var g=n.g(p.c(0))-n.g(m.c(0)),b=Array(p.b()),v=0;v<p.b();v+=1)b[v]=p.c(v);for(v=0;v<m.b();v+=1)b[v]^=n.i(n.g(m.c(v))+g);return r(b,0).l(m)}};return p}e.s=function(a){for(var u=[],f=0;f<a.length;f++){var p=a.charCodeAt(f);128>p?u.push(p):2048>p?u.push(192|p>>6,128|p&63):55296>p||57344<=p?u.push(224|p>>12,128|p>>6&63,128|p&63):(f++,p=65536+((p&1023)<<10|a.charCodeAt(f)&1023),u.push(240|p>>18,128|p>>12&63,128|p>>6&63,128|p&63));}return u};var i={L:1,M:0,Q:3,H:2},s=function(){function a(p){for(var m=0;p!=0;)m+=1,p>>>=1;return m}var u=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],f={w:function(p){for(var m=p<<10;0<=a(m)-a(1335);)m^=1335<<a(m)-a(1335);return (p<<10|m)^21522},A:function(p){for(var m=p<<12;0<=a(m)-a(7973);)m^=7973<<a(m)-a(7973);return p<<12|m},G:function(p){return u[p-1]},F:function(p){switch(p){case 0:return function(m,g){return (m+g)%2==0};case 1:return function(m){return m%2==0};case 2:return function(m,g){return g%3==0};case 3:return function(m,g){return (m+g)%3==0};case 4:return function(m,g){return (Math.floor(m/2)+Math.floor(g/3))%2==0};case 5:return function(m,g){return m*g%2+m*g%3==0};case 6:return function(m,g){return (m*g%2+m*g%3)%2==0};case 7:return function(m,g){return (m*g%3+(m+g)%2)%2==0};default:throw Error("bad maskPattern:"+p)}},C:function(p){for(var m=r([1],0),g=0;g<p;g+=1)m=m.multiply(r([1,n.i(g)],0));return m},f:function(p,m){if(p!=4||1>m||40<m)throw Error("mode: "+p+"; type: "+m);return 10>m?8:16},D:function(p){for(var m=p.h(),g=0,b=0;b<m;b+=1)for(var v=0;v<m;v+=1){for(var A=0,k=p.a(b,v),_=-1;1>=_;_+=1)if(!(0>b+_||m<=b+_))for(var $=-1;1>=$;$+=1)0>v+$||m<=v+$||(_!=0||$!=0)&&k==p.a(b+_,v+$)&&(A+=1);5<A&&(g+=3+A-5);}for(b=0;b<m-1;b+=1)for(v=0;v<m-1;v+=1)A=0,p.a(b,v)&&(A+=1),p.a(b+1,v)&&(A+=1),p.a(b,v+1)&&(A+=1),p.a(b+1,v+1)&&(A+=1),(A==0||A==4)&&(g+=3);for(b=0;b<m;b+=1)for(v=0;v<m-6;v+=1)p.a(b,v)&&!p.a(b,v+1)&&p.a(b,v+2)&&p.a(b,v+3)&&p.a(b,v+4)&&!p.a(b,v+5)&&p.a(b,v+6)&&(g+=40);for(v=0;v<m;v+=1)for(b=0;b<m-6;b+=1)p.a(b,v)&&!p.a(b+1,v)&&p.a(b+2,v)&&p.a(b+3,v)&&p.a(b+4,v)&&!p.a(b+5,v)&&p.a(b+6,v)&&(g+=40);for(v=A=0;v<m;v+=1)for(b=0;b<m;b+=1)p.a(b,v)&&(A+=1);return g+=Math.abs(100*A/m/m-50)/5*10}};return f}(),n=function(){for(var a=Array(256),u=Array(256),f=0;8>f;f+=1)a[f]=1<<f;for(f=8;256>f;f+=1)a[f]=a[f-4]^a[f-5]^a[f-6]^a[f-8];for(f=0;255>f;f+=1)u[a[f]]=f;return {g:function(p){if(1>p)throw Error("glog("+p+")");return u[p]},i:function(p){for(;0>p;)p+=255;for(;256<=p;)p-=255;return a[p]}}}(),c=function(){function a(p,m){switch(m){case i.L:return u[4*(p-1)];case i.M:return u[4*(p-1)+1];case i.Q:return u[4*(p-1)+2];case i.H:return u[4*(p-1)+3]}}var u=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],f={I:function(p,m){var g=a(p,m);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+p+"/errorCorrectLevel:"+m);p=g.length/3,m=[];for(var b=0;b<p;b+=1)for(var v=g[3*b],A=g[3*b+1],k=g[3*b+2],_=0;_<v;_+=1){var $=k,x={};x.o=A,x.j=$,m.push(x);}return m}};return f}();return e}());var Hl=QrCreator;var jt=class extends V{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&Hl.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return d`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${J({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};jt.styles=[L,Ml];l([O("canvas")],jt.prototype,"canvas",2);l([h()],jt.prototype,"value",2);l([h()],jt.prototype,"label",2);l([h({type:Number})],jt.prototype,"size",2);l([h()],jt.prototype,"fill",2);l([h()],jt.prototype,"background",2);l([h({type:Number})],jt.prototype,"radius",2);l([h({attribute:"error-correction"})],jt.prototype,"errorCorrection",2);l([I(["background","errorCorrection","fill","radius","size","value"])],jt.prototype,"generate",1);jt.define("sl-qr-code");exports.AutoFieldQRCode=class ii extends T{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return d`              
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
        `}};exports.AutoFieldQRCode=y([R("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class Be extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let e=this.options.url,[r,i]=e.split("?"),s=new URLSearchParams(i);return s.set("t",Date.now().toString()),`${r}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return d`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,w`
            sl-button.action-widget.image::part(label){
                padding: 0px;
            }
        `],y([O("img")],exports.AutoFieldCaptcha.prototype,"img",2),y([E()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=y([R("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class We extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let e=this.stepCount,r=()=>{let i=Math.ceil(e*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",i.toString()),this.requestUpdate()),e--,e<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(r,this.step);};r();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let e=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(e)?Number(e[0]):Number(e),this.step=Array.isArray(e)?Number(e[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles],y([E()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),y([E()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=y([R("auto-field-verifycode")],exports.AutoFieldVerifyCode);var Fl=w`
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
`;var ot=class os extends V{constructor(){super(...arguments),this.localize=new Y(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(o){return o instanceof Element&&o.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await ae(this.childrenContainer);let{keyframes:o,options:e}=ne(this,"tree-item.collapse",{dir:this.localize.dir()});await le(this.childrenContainer,Ni(o,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let o=this.parentElement;return !!o&&os.isTreeItem(o)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(o){o.has("selected")&&!o.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await ae(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:o,options:e}=ne(this,"tree-item.expand",{dir:this.localize.dir()});await le(this.childrenContainer,Ni(o,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:o=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(e=>os.isTreeItem(e)&&(o||!e.disabled)):[]}render(){let o=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return d`
      <div
        part="base"
        class="${z({"tree-item":true,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":e,"tree-item--rtl":this.localize.dir()==="rtl"})}"
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
            class=${z({"tree-item__expand-button":true,"tree-item__expand-button--visible":e})}
            aria-hidden="true"
          >
            ${K(this.loading,()=>d` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${o?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${o?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${K(this.selectable,()=>d`
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
                ?checked="${_t(this.selected)}"
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
    `}};ot.styles=[L,Fl];ot.dependencies={"sl-checkbox":rt,"sl-icon":U,"sl-spinner":ce};l([E()],ot.prototype,"indeterminate",2);l([E()],ot.prototype,"isLeaf",2);l([E()],ot.prototype,"loading",2);l([E()],ot.prototype,"selectable",2);l([h({type:Boolean,reflect:true})],ot.prototype,"expanded",2);l([h({type:Boolean,reflect:true})],ot.prototype,"selected",2);l([h({type:Boolean,reflect:true})],ot.prototype,"disabled",2);l([h({type:Boolean,reflect:true})],ot.prototype,"lazy",2);l([O("slot:not([name])")],ot.prototype,"defaultSlot",2);l([O("slot[name=children]")],ot.prototype,"childrenSlot",2);l([O(".tree-item__item")],ot.prototype,"itemElement",2);l([O(".tree-item__children")],ot.prototype,"childrenContainer",2);l([O(".tree-item__expand-button slot")],ot.prototype,"expandButtonSlot",2);l([I("loading",{waitUntilFirstUpdate:true})],ot.prototype,"handleLoadingChange",1);l([I("disabled")],ot.prototype,"handleDisabledChange",1);l([I("selected")],ot.prototype,"handleSelectedChange",1);l([I("expanded",{waitUntilFirstUpdate:true})],ot.prototype,"handleExpandedChange",1);l([I("expanded",{waitUntilFirstUpdate:true})],ot.prototype,"handleExpandAnimation",1);l([I("lazy",{waitUntilFirstUpdate:true})],ot.prototype,"handleLazyChange",1);var je=ot;se("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});se("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var Bl=w`
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
`;function Wl(t,o=false){function e(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let c=n.every(u=>u.selected),a=n.every(u=>!u.selected&&!u.indeterminate);s.selected=c,s.indeterminate=!c&&!a;}}function r(s){let n=s.parentElement;je.isTreeItem(n)&&(e(n),r(n));}function i(s){for(let n of s.getChildrenItems())n.selected=o?s.selected||n.selected:!n.disabled&&s.selected,i(n);o&&e(s);}i(t),r(t);}var Se=class extends V{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new Y(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(o=>!!this.querySelector(`[slot="${o}-icon"]`)).forEach(o=>{let e=t.querySelector(`[slot="${o}-icon"]`),r=this.getExpandButtonIcon(o);r&&(e===null?t.append(r):e.hasAttribute("data-default")&&e.replaceWith(r));});},this.handleTreeChanged=t=>{for(let o of t){let e=[...o.addedNodes].filter(je.isTreeItem),r=[...o.removedNodes].filter(je.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let o=t.relatedTarget;(!o||!this.contains(o))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let o=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),je.isTreeItem(o)&&!o.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=o,this.tabIndex=-1,o.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let e=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(e){let r=e.cloneNode(true);return [r,...r.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${t}-icon`,r}return null}selectItem(t){let o=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),Wl(t);else if(this.selection==="single"||t.isLeaf){let r=this.getAllTreeItems();for(let i of r)i.selected=i===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let e=this.selectedItems;(o.length!==e.length||e.some(r=>!o.includes(r)))&&Promise.all(e.map(r=>r.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:e}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(i=>{var s;return ["input","textarea"].includes((s=i?.tagName)==null?void 0:s.toLowerCase())}))return;let o=this.getFocusableItems(),e=this.localize.dir()==="ltr",r=this.localize.dir()==="rtl";if(o.length>0){t.preventDefault();let i=o.findIndex(a=>a.matches(":focus")),s=o[i],n=a=>{let u=o[lt(a,0,o.length-1)];this.focusItem(u);},c=a=>{s.expanded=a;};t.key==="ArrowDown"?n(i+1):t.key==="ArrowUp"?n(i-1):e&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(i+1):c(true):e&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(i-1):c(false):t.key==="Home"?n(0):t.key==="End"?n(o.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let o=t.target,e=o.closest("sl-tree-item"),r=t.composedPath().some(i=>{var s;return (s=i?.classList)==null?void 0:s.contains("tree-item__expand-button")});!e||e.disabled||o!==this.clickTarget||(r?e.expanded=!e.expanded:this.selectItem(e));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",o=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let e of o)e.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>Wl(e,true)));}get selectedItems(){let t=this.getAllTreeItems(),o=e=>e.selected;return t.filter(o)}getFocusableItems(){let t=this.getAllTreeItems(),o=new Set;return t.filter(e=>{var r;if(e.disabled)return  false;let i=(r=e.parentElement)==null?void 0:r.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||o.has(i))&&o.add(e),!o.has(e)})}render(){return d`
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
    `}};Se.styles=[L,Bl];l([O("slot:not([name])")],Se.prototype,"defaultSlot",2);l([O("slot[name=expand-icon]")],Se.prototype,"expandedIconSlot",2);l([O("slot[name=collapse-icon]")],Se.prototype,"collapsedIconSlot",2);l([h()],Se.prototype,"selection",2);l([I("selection")],Se.prototype,"handleSelectionChange",1);Se.define("sl-tree");je.define("sl-tree-item");exports.AutoFieldTreeSelect=class ke extends T{constructor(){super(...arguments);this.nodes={};this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}connectedCallback(){if(super.connectedCallback(),this.options){this.idKey=this.options.idKey,this.valueKey=this.options.valueKey,this.labelKey=this.options.labelKey;let e=this.options.items;e&&(this.nodes=e,this._forEachTree((r,i,s,n)=>{s<1&&r.expanded===void 0&&(r.expanded=true),this.isItemSelected(r)&&(r.selected=true,this.selection.push({id:r[this.idKey],value:r[this.valueKey],path:n.join("/")}));}));}}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.valueKey]:this.value.includes(e[this.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e){let r=(s,n,c,a)=>{let u=[...a,s[this.labelKey]];if(e(s,n,c,u),s.children){let f=c+1;s.children.forEach(p=>{r(p,s,f,[...u]);});}};(Array.isArray(this.nodes)?this.nodes:[this.nodes]).forEach(s=>{r(s,void 0,0,[]);});}_renderNode(e,r,i){let s=r.includes(e[this.valueKey]),n=[...i,e[this.labelKey]];return d`<sl-tree-item 
            data-id=${String(e[this.idKey])}
            data-value=${String(e[this.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${e.expanded}
        >${e.label}        
        ${Array.isArray(e.children)?d`${e.children.map(c=>this._renderNode(c,r,n))}`:""}</sl-tree-item>`}_renderNodes(e){let r=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(i=>this._renderNode(i,r,[])):this._renderNode(e,r,[])}onSelectionChange(e){let r=Array.from(e.detail.selection);r&&(this.selection=r.map(i=>({id:i.dataset.id,value:i.dataset.value,path:i.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}renderTree(){return d`
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
        `}};exports.AutoFieldTreeSelect.styles=[T.styles,w`
            sl-tree{
                padding: 0.2em;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
            }
    `],exports.AutoFieldTreeSelect=y([R("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class Ne extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(e){let r=e.target.dataset.id;for(let i=0;i<this.selection.length;i++)if(String(this.selection[i].id)===r){this.selection.splice(i,1),this.onFieldChange(),this.requestUpdate();break}e.stopPropagation();}getShowItemValue(e,r,i){if(r===i)return e}getSelectedTagValue(e){if(this.options.showAsPath)return d`${e.path}`;{let i=e.path.split("/");return i[i.length-1]}}renderSelectedTags(){let e=this.selection;return d`<span class="tags">${ft(e,r=>d`<sl-tag 
                    data-id="${r.id}" 
                    title=${r.path}
                    @sl-remove=${this._onRemoveSelection.bind(this)}
                    @click=${i=>i.stopPropagation()}
                    removable
                    >${this.getSelectedTagValue(r)}</sl-tag>`)}</span>`}renderSelection(){return d`    
            <div class="selection" slot="trigger">              
                ${K(this.selection.length===0&&this.options.placeholder,()=>d`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderSelectedTags()}
                <span class='suffix'>
                    <sl-icon library="system" class="chevron ${z({active:this.active})}" 
                        name="chevron-down" aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}renderInput(){return d`             
        <sl-dropdown          
            size="${this.context.size}"    
            @sl-show="${this._onShowPopup.bind(this)}" 
            @sl-after-hide="${this._onHidePopup.bind(this)}" 
            sync="width"
            hoist
        >
            ${this.renderSelection()}
            <div>
                ${this.renderTree()}            
            </div>
        </sl-dropdown> 
        `}};exports.AutoFieldTreeDropdown.styles=[T.styles,exports.AutoFieldTreeSelect.styles,w`
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
        `],y([E()],exports.AutoFieldTreeDropdown.prototype,"active",2),y([O("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=y([R("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);function jl(t){if(t)if(t.type==="checkbox"){if(t.value==="on")return t.checked;if(t.value.startsWith("[")&&t.value.endsWith("]"))try{let o=JSON.parse(t.value);return t.checked?o[0]:o[1]}catch{return t.checked}else return t.checked?t.value:null}else return t.value}exports.AutoFieldCustom=class Ue extends T{constructor(){super(...arguments);this.selection=[];this.active=false;}getInitialOptions(){return {placeholder:"\u8BF7\u9009\u62E9",dropdown:false,inputSelectors:"input,textarea"}}connectedCallback(){super.connectedCallback(),this._onFieldInput();}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this.onFieldInput),this.removeEventListener("change",this.onFieldInput);}}),this.addEventListener("input",this.onFieldInput),this.addEventListener("change",this.onFieldInput);}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(i=>jl(i))}renderSelection(){return d`    
            <div class="selection" slot="trigger">              
                ${K(!this.value&&this.options.placeholder,()=>d`<span class='placeholder'>${this.options.placeholder}</span>`)}
                <span class="custom-value">
                ${this.options.renderSelection?this.options.renderSelection(this.value,d):this.value}
                </span>
                <span class='suffix'>
                    <sl-icon 
                        library="system" 
                        class="chevron ${z({active:this.active})}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`}renderContent(){let e=this.value.map(r=>_t(r));return d`<div class="container">
            ${this.options.renderContent(e,d)}
        </div>`}renderInput(){return this.options.dropdown?d`
                <sl-dropdown          
                    size="${this.context.size}"
                    @sl-show="${this._onShowPopup.bind(this)}"
                    @sl-after-hide="${this._onHidePopup.bind(this)}"
                    sync="width"
                >
                ${this.renderSelection()}
                ${this.renderContent()}
            </sl-dropdown> 
            `:d`${this.renderContent()}`}};exports.AutoFieldCustom.styles=[T.styles,w`
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
                    display: flex;
                    align-items: center;
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
        `],y([E()],exports.AutoFieldCustom.prototype,"active",2),y([O(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=y([R("auto-field-custom")],exports.AutoFieldCustom);function si(t,o){let e=t.width,r=t.height,i=t.widget,s;try{s=document.createElement(`auto-field-${i||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=t,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),o?.styles&&Object.assign(s.style,o.styles),o?.attrs){for(let n in o.attrs)s.setAttribute(n,String(o.attrs[n]));s.parent=o.parent;}return e&&(s.style.width=String(e)),r&&(s.style.height=String(r)),o?.classs&&(typeof o.classs=="string"?s.classList.add(o.classs):typeof o.classs=="object"&&Object.entries(o.classs).forEach(([n,c])=>{c?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class er extends T{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange();};}getInitialOptions(){return {children:[]}}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("field-change",this._handleChildrenChange);}_onChildrenChange(){this.options.children.length>0&&this.shadow.addEventListener("field-change",this._handleChildrenChange);}getInputValue(){let e=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),r=[];return e.forEach(i=>{if(i.tagName.startsWith("AUTO-FIELD-")){let s=i.getInputValue();s===""&&(s=i.value),r.push(s);}}),r}renderInput(){return d`
            <div class="children">
                ${ft(this.options.children,e=>d`${si(e,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[T.styles,w`
            .value > .children{
                display: flex;
                flex-wrap: wrap;
            }
        `],exports.AutoFieldCombine=y([R("auto-field-combine")],exports.AutoFieldCombine);var Ec=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"];exports.AutoFieldIcons=class qe extends T{constructor(){super(...arguments);this.active=false;this.selected=[];this.icons=[];}getInitialOptions(){return {icons:[],size:"24px",multiple:false,dropdown:false,builtIn:true}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&Ec.forEach(e=>{this.icons.includes(e)||this.icons.push(e);}),this.selected=Array.isArray(this.value)?this.value:[this.value];}renderView(){return this.renderIcons(this.selected)}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}_isSelected(e){return this.options.multiple?this.selected.includes(e):this.selected[0]===e}_onClickIcon(e){if(this.options.multiple){let r=this.selected.findIndex(i=>i===e);r>-1?this.selected.splice(r,1):this.selected.push(e),this.onFieldInput();}else this.selected.length===0?this.selected.push(e):this.selected[0]=e,this.onFieldInput();}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(e,r=true){return d`<div class="icons" style="font-size:${this.options.size}">
                ${ft(e,i=>{if(i!=="")return d`<span 
                class="icon ${r&&this._isSelected(i)?"selected":void 0}"
                title="${i}"
                @click=${()=>this._onClickIcon(i)}
            ><sl-icon name="${i}" size="${this.options.size}"></sl-icon></span>`})}</div>`}renderSelection(){return d`<div class="selection" slot="trigger">              
        ${K(this.selected.length===0&&this.options.placeholder,()=>d`<span class='placeholder'>${this.options.placeholder}</span>`)}
        ${this.renderIcons(this.selected,false)}
        <span class='suffix'>
            <sl-icon 
                library="system" 
                class="chevron ${z({active:this.active})}" 
                name="chevron-down" 
                aria-hidden="true">
            </sl-icon>
        </span>  
    </div>`}renderInput(){return this.options.dropdown?d`
                <sl-dropdown          
                    size="${this.context.size}"
                    @sl-show="${this._onShowPopup.bind(this)}"
                    @sl-after-hide="${this._onHidePopup.bind(this)}"
                    sync="width"
                >
                ${this.renderSelection()}
                ${this.renderIcons(this.icons)}
            </sl-dropdown> 
            `:d`${this.renderIcons(this.icons)}`}};exports.AutoFieldIcons.styles=[T.styles,w`
        sl-dropdown{
            width: 100%;                
            & >.icons{
                padding: 0.5em;
                box-sizing: border-box;                
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
            }
        } 
        sl-icon::part(svg){
            stroke-width: 1;
        }
        .icons{
            display:flex;
            flex-wrap: wrap;
            gap: 0.5em;
            &>.icon{
                cursor: pointer;
                display: inline-flex;
                &:hover{
                    color: var(--auto-theme-color);
                }
                &.selected{
                    color: var(--auto-theme-color);
                }
            }            
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
                &>.icons{
                    flex-grow: 1; 
                    display: flex;
                    align-items: center;
                }
                &>.suffix{
                    cursor: pointer;
                    padding-left: 0.5em;
                    padding-right: 0.5em;
                }
            } 
    `],y([E()],exports.AutoFieldIcons.prototype,"active",2),y([E()],exports.AutoFieldIcons.prototype,"selected",2),exports.AutoFieldIcons=y([R("auto-field-icons")],exports.AutoFieldIcons);q.define("sl-button");H.define("sl-input");var Nl=w`
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
`;var or=class extends V{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};or.styles=[L,Nl];l([h({type:Boolean,reflect:true})],or.prototype,"vertical",2);l([I("vertical")],or.prototype,"handleVerticalChange",1);or.define("sl-divider");ct.define("sl-dropdown");ce.define("sl-spinner");U.define("sl-icon");xt.define("sl-icon-button");function ls(t,o){return t.length>o.length?false:t.every((e,r)=>e===o[r])}(t=>typeof $e<"u"?$e:typeof Proxy<"u"?new Proxy(t,{get:(o,e)=>(typeof $e<"u"?$e:o)[e]}):t)(function(t){if(typeof $e<"u")return $e.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var Jl=w`
    ${Xr}
    :host{
        display: flex;
        position: relative;
        flex-direction:column;
        width:100%;         
        font-family:"Microsoft YaHei",华文细黑,微软雅黑,"MicrosoftJhengHei",STHeiti,MingLiu;
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
`;var cs={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>'};var ta=w`
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

`;var zt=class extends St{constructor(){super(...arguments);this.classes=new ye(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let e=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=e,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(r=>{r.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(r=>{r.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(e,r,i){super.attributeChangedCallback(e,r,i),this.updateStyles();}render(){return d` 
            <slot ></slot> 
        `}};zt.styles=ta,y([h({type:String})],zt.prototype,"direction",2),y([h({type:String})],zt.prototype,"gap",2),y([h({type:Boolean})],zt.prototype,"wrap",2),y([h({type:String})],zt.prototype,"align",2),y([h({type:String})],zt.prototype,"justify",2),y([h({type:String})],zt.prototype,"border",2),y([h({type:String})],zt.prototype,"grow",2),y([h({type:String})],zt.prototype,"shrink",2),y([h({type:Boolean,reflect:true})],zt.prototype,"fit",2),zt=y([R("magic-flex")],zt);exports.AutoForm=class tt extends St{constructor(){super(...arguments);this.classs=new ye(this);this.theme=new to(this);this.seq=++exports.AutoForm.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this._loading=false;this.iconLibrary="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg";}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}registerIcons(e,r){Ti("default",{resolver:e,...r||{}});}connectedCallback(){super.connectedCallback(),this.registerIcons(e=>e in cs?`data:image/svg+xml,${encodeURIComponent(cs[e])}`:this.iconLibrary.replace("{name}",e));}attributeChangedCallback(e,r,i){super.attributeChangedCallback(e,r,i),["group","sort","advanced","path"].includes(e)&&setTimeout(()=>this._load());}_initialContext(){Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit});}_isValid(){if(this.path){let e=this.store.schemas.errors||{};return Object.keys(e).some(r=>ls(this.path.split("."),r.split(".")))}else return Object.keys(this.store.schemas.errors).length>0}_load(e=true){if(this.store&&!this._loading)try{this._initialContext();let r=this.path?this.store.schemas.find(this.path):Object.values(this.store.schemas.store.state),i=s=>{if(!this.group||["","*"].includes(this.group))return !0;let n=(s.group||"").split(","),c=this.group.split(",");return n.some(a=>c.includes(a))};this.schemas=Object.values(r).filter(s=>!(!i(s)||this.advanced===!1&&s.advanced)).sort((s,n)=>(s.order||0)-(n.order||0)),e&&this.requestUpdate();}finally{this._loading=false;}}bind(e){this.store=e,this._load();}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(r=>{r.tagName.startsWith("auto-field")&&(r.invalidMessage=void 0);}),this.requestUpdate();}_renderFields(){return d`            
                ${this.schemas.map(e=>d`${si(e)}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),d`            
            <div class="actions header"></div>
            <div class="fields">
                ${this._renderFields()}
            </div>
            <div class="actions footer"></div>
        `}reset(){this.store?.reset(),this._initialContext(),eo(this,"dirty",false),eo(this,"invalid",false);}submit(e){if(typeof e=="function"){let r=this.store?.schemas.getValues()||{},i=this.store?.schemas.errors;e(r,i);}}};exports.AutoForm.seq=0,exports.AutoForm.styles=Jl,y([_i({context:yr})],exports.AutoForm.prototype,"context",2),y([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"validAtInit",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"group",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"path",2),y([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"compact",2),y([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"advanced",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"validAt",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"border",2),y([h({type:String})],exports.AutoForm.prototype,"size",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"labelPos",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"labelWidth",2),y([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"dark",2),y([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"readonly",2),y([h({type:Boolean,reflect:true})],exports.AutoForm.prototype,"viewonly",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"viewAlign",2),y([h({type:String,reflect:true})],exports.AutoForm.prototype,"layout",2),y([h({type:String})],exports.AutoForm.prototype,"iconLibrary",2),exports.AutoForm=y([R("auto-form")],exports.AutoForm);/*! Bundled license information:

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
*/exports.AutoField=T;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map