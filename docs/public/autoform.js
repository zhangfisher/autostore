var AutoForm=(function(exports){'use strict';var Kl=Object.defineProperty;var Gl=Object.getOwnPropertyDescriptor;var Be=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(o,e)=>(typeof require<"u"?require:o)[e]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var v=(t,o,e,r)=>{for(var i=r>1?void 0:r?Gl(o,e):o,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(r?n(o,e,i):n(i))||i);return r&&i&&Kl(o,e,i),i};function Bs(t){let o=t.trim();if(o.startsWith("#")&&(o=o.slice(1)),o.length===3?o=o.replace(/(.)/g,"$1$1"):o.length===4&&(o=o.replace(/(.)/g,"$1$1")),o.length>6&&(o=o.slice(0,6)),!/^[0-9a-f]{6}$/i.test(o))throw new Error("Invalid hex color");let e=parseInt(o,16),r=e>>16&255,i=e>>8&255,s=e&255;return [r,i,s]}function Yl(t){let o=Bs(t);return (o[0]*2126+o[1]*7152+o[2]*722)/1e4<128}function Xl(t){let[o,e,r]=Array.isArray(t)?t:Bs(t),i=o/255,s=e/255,n=r/255,c=Math.max(i,s,n),a=Math.min(i,s,n),h=c-a,m=0,d=0,f=(c+a)/2;return h!==0&&(c===i?m=((s-n)/h+(s<n?6:0))/6:c===s?m=((n-i)/h+2)/6:m=((i-s)/h+4)/6),h!==0&&(d=h/(1-Math.abs(2*f-1))),[Math.round(m*360),Math.round(d*100),Math.round(f*100)]}function Hs(t){let[o,e,r]=t,i=o/360,s=e/100,n=r/100,c=(1-Math.abs(2*n-1))*s,a=c*(1-Math.abs(i*6%2-1)),h=n-c/2,m=0,d=0,f=0;0<=i&&i<1/6?(m=c,d=a,f=0):1/6<=i&&i<2/6?(m=a,d=c,f=0):2/6<=i&&i<3/6?(m=0,d=c,f=a):3/6<=i&&i<4/6?(m=0,d=a,f=c):4/6<=i&&i<5/6?(m=a,d=0,f=c):(m=c,d=0,f=a);let g=b=>Math.round((b+h)*255).toString(16).padStart(2,"0");return `#${g(m)}${g(d)}${g(f)}`}function Ql(t){let{color:o,range:e,dark:r,count:i}=Object.assign({range:[5,98],count:5},t),s=Xl(o),n=r??Yl(o),c=Array.from({length:2*i+1});c[i]=o;let a=Math.abs(s[2]-e[0]),h=a/i,m=s[2];for(let d=i-1;d>=0;d--)m=m+(n?-1:1)*h,m<0&&(m=0),m>100&&(m=100),c[d]=Hs([s[0],s[1],m]);m=s[2],a=Math.abs(s[2]-e[1]),h=a/i;for(let d=i+1;d<i*2+1;d++)m=m+(n?1:-1)*h,m<0&&(m=0),m>100&&(m=100),c[d]=Hs([s[0],s[1],m]);return {colors:c,dark:n}}function We(t,o){let e=Object.assign({levels:[5,1,2,3,4,5],range:[10,98],count:5},typeof o=="string"?{color:o}:o),{colors:r,dark:i}=Ql(e),s={};r.reduce((c,a,h)=>(s[`${t}${h}`]=a,c),{});let n=`--t-${t.split("-")[4]}`;return e.levels&&(s[`${n}-color`]=`var(${t}${e.levels[0]})`,s[`${n}-bgcolor`]=`var(${t}${e.levels[1]})`,e.levels.slice(2).forEach((c,a)=>{s[`${n}-bgcolor-${a+1}`]=`var(${t}${c})`;})),{vars:s,colors:r,dark:i}}function Ri(t=10){return Math.random().toString(36).substring(2,t+2)}function Ws(t,o){if(globalThis.document==null)return;let{id:e,mode:r,location:i="head"}=Object.assign({mode:"default"},o),s=document.head.querySelector(`#${e}`),n=e||Ri();return s?(r=="replace"?s.innerHTML=t:r=="append"&&(s.innerHTML+=t),n):(s=document.createElement("style"),s.innerHTML=t,s.id=n,o?.el?o.el.appendChild(s):i=="head"?document.head.appendChild(s):document.body.appendChild(s),s)}function Zl(t){let o=Object.assign({name:Ri(),variants:{}},t),e=Object.assign({prefix:"--t-color-theme-",range:[10,100],levels:[10,1,2,3,4,5]},typeof o.theme=="string"?{color:o.theme}:o.theme),r=o.selector||":root,:host",{vars:i,dark:s}=We("--t-color-theme-",e);o.variants.primary&&We("--t-color-primary-",o.variants.primary),o.variants.danger&&We("--t-color-danger-",o.variants.danger),o.variants.success&&We("--t-color-success-",o.variants.success),o.variants.warning&&We("--t-color-warning-",o.variants.warning),o.variants.info&&We("--t-color-info-",o.variants.info);let n=`${r}[data-theme=${o.name}]{
        ${`color-schema: ${s?"dark":"light"}`};
        ${Object.entries(i).map(([c,a])=>`${c}:${a}`).join(`;
`)}}`;return Ws(n,{id:`theme-${o.name||Ri()}`,mode:"replace"}),n}var zi=class{root;constructor(){this.root=document.documentElement,document.addEventListener("DOMContentLoaded",this._onDomContentLoaded.bind(this));}get size(){return this.root.dataset.size||"medium"}set size(o){this.root.dataset.size=o;}get spacing(){return this.root.dataset.spacing||"medium"}set spacing(o){this.root.dataset.spacing=String(o);}get radius(){return this.root.dataset.radius||"medium"}set radius(o){this.root.dataset.radius=o;}get theme(){return this.root.dataset.theme||"light"}set theme(o){this.root.dataset.theme=o;}_onDomContentLoaded(){this.root=document.documentElement;}createVariant(o,e){let{vars:r}=We(`--t-color-${o}-`,e),i=`${this.theme==="light"?":root,:host":`:host,
:root[data-theme=${this.theme}]`}{${Object.entries(r).map(([s,n])=>`${s}: ${n};`).join(`
`)}`;Ws(i,{id:`t-${this.theme}-${o}`,mode:"replace"});}create(o){Zl(o);}},Jl=new zi;globalThis.ThemePro=Jl;var zr=globalThis,Er=zr.trustedTypes,js=Er?Er.createPolicy("lit-html",{createHTML:t=>t}):void 0,Vi="$lit$",he=`lit$${Math.random().toFixed(9).slice(2)}$`,Pi="?"+he,tc=`<${Pi}>`,Ue=zr.document===void 0?{createTreeWalker:()=>({})}:document,Mo=()=>Ue.createComment(""),Fo=t=>t===null||typeof t!="object"&&typeof t!="function",Di=Array.isArray,Ys=t=>Di(t)||typeof t?.[Symbol.iterator]=="function",Li=`[ 	
\f\r]`,Do=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ns=/-->/g,Us=/>/g,je=RegExp(`>|${Li}(?:([^\\s"'>=/]+)(${Li}*=${Li}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qs=/'/g,Ks=/"/g,Xs=/^(?:script|style|textarea|title)$/i,Mi=t=>(o,...e)=>({_$litType$:t,strings:o,values:e}),u=Mi(1),at=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Gs=new WeakMap,Ne=Ue.createTreeWalker(Ue,129);function Js(t,o){if(!Di(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return js!==void 0?js.createHTML(o):o}var tn=(t,o)=>{let e=t.length-1,r=[],i,s=o===2?"<svg>":o===3?"<math>":"",n=Do;for(let c=0;c<e;c++){let a=t[c],h,m,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,m=n.exec(a),m!==null);)f=n.lastIndex,n===Do?m[1]==="!--"?n=Ns:m[1]!==void 0?n=Us:m[2]!==void 0?(Xs.test(m[2])&&(i=RegExp("</"+m[2],"g")),n=je):m[3]!==void 0&&(n=je):n===je?m[0]===">"?(n=i??Do,d=-1):m[1]===void 0?d=-2:(d=n.lastIndex-m[2].length,h=m[1],n=m[3]===void 0?je:m[3]==='"'?Ks:qs):n===Ks||n===qs?n=je:n===Ns||n===Us?n=Do:(n=je,i=void 0);let g=n===je&&t[c+1].startsWith("/>")?" ":"";s+=n===Do?a+tc:d>=0?(r.push(h),a.slice(0,d)+Vi+a.slice(d)+he+g):a+he+(d===-2?c:g);}return [Js(t,s+(t[e]||"<?>")+(o===2?"</svg>":o===3?"</math>":"")),r]},Ho=class t{constructor({strings:o,_$litType$:e},r){let i;this.parts=[];let s=0,n=0,c=o.length-1,a=this.parts,[h,m]=tn(o,e);if(this.el=t.createElement(h,r),Ne.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes);}for(;(i=Ne.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Vi)){let f=m[n++],g=i.getAttribute(d).split(he),b=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?Or:b[1]==="?"?Tr:b[1]==="@"?Ir:Ke}),i.removeAttribute(d);}else d.startsWith(he)&&(a.push({type:6,index:s}),i.removeAttribute(d));if(Xs.test(i.tagName)){let d=i.textContent.split(he),f=d.length-1;if(f>0){i.textContent=Er?Er.emptyScript:"";for(let g=0;g<f;g++)i.append(d[g],Mo()),Ne.nextNode(),a.push({type:2,index:++s});i.append(d[f],Mo());}}}else if(i.nodeType===8)if(i.data===Pi)a.push({type:2,index:s});else {let d=-1;for(;(d=i.data.indexOf(he,d+1))!==-1;)a.push({type:7,index:s}),d+=he.length-1;}s++;}}static createElement(o,e){let r=Ue.createElement("template");return r.innerHTML=o,r}};function qe(t,o,e=t,r){if(o===at)return o;let i=r!==void 0?e._$Co?.[r]:e._$Cl,s=Fo(o)?void 0:o._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(false),s===void 0?i=void 0:(i=new s(t),i._$AT(t,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(o=qe(t,i._$AS(t,o.values),i,r)),o}var Ar=class{constructor(o,e){this._$AV=[],this._$AN=void 0,this._$AD=o,this._$AM=e;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(o){let{el:{content:e},parts:r}=this._$AD,i=(o?.creationScope??Ue).importNode(e,true);Ne.currentNode=i;let s=Ne.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new uo(s,s.nextSibling,this,o):a.type===1?h=new a.ctor(s,a.name,a.strings,this,o):a.type===6&&(h=new Rr(s,this,o)),this._$AV.push(h),a=r[++c];}n!==a?.index&&(s=Ne.nextNode(),n++);}return Ne.currentNode=Ue,i}p(o){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(o,r,e),e+=r.strings.length-2):r._$AI(o[e])),e++;}},uo=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(o,e,r,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=o,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??true;}get parentNode(){let o=this._$AA.parentNode,e=this._$AM;return e!==void 0&&o?.nodeType===11&&(o=e.parentNode),o}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(o,e=this){o=qe(this,o,e),Fo(o)?o===Y||o==null||o===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):o!==this._$AH&&o!==at&&this._(o):o._$litType$!==void 0?this.$(o):o.nodeType!==void 0?this.T(o):Ys(o)?this.k(o):this._(o);}O(o){return this._$AA.parentNode.insertBefore(o,this._$AB)}T(o){this._$AH!==o&&(this._$AR(),this._$AH=this.O(o));}_(o){this._$AH!==Y&&Fo(this._$AH)?this._$AA.nextSibling.data=o:this.T(Ue.createTextNode(o)),this._$AH=o;}$(o){let{values:e,_$litType$:r}=o,i=typeof r=="number"?this._$AC(o):(r.el===void 0&&(r.el=Ho.createElement(Js(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else {let s=new Ar(i,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s;}}_$AC(o){let e=Gs.get(o.strings);return e===void 0&&Gs.set(o.strings,e=new Ho(o)),e}k(o){Di(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let s of o)i===e.length?e.push(r=new t(this.O(Mo()),this.O(Mo()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i);}_$AR(o=this._$AA.nextSibling,e){for(this._$AP?.(false,true,e);o!==this._$AB;){let r=o.nextSibling;o.remove(),o=r;}}setConnected(o){this._$AM===void 0&&(this._$Cv=o,this._$AP?.(o));}},Ke=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(o,e,r,i,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=o,this.name=e,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Y;}_$AI(o,e=this,r,i){let s=this.strings,n=false;if(s===void 0)o=qe(this,o,e,0),n=!Fo(o)||o!==this._$AH&&o!==at,n&&(this._$AH=o);else {let c=o,a,h;for(o=s[0],a=0;a<s.length-1;a++)h=qe(this,c[r+a],e,a),h===at&&(h=this._$AH[a]),n||=!Fo(h)||h!==this._$AH[a],h===Y?o=Y:o!==Y&&(o+=(h??"")+s[a+1]),this._$AH[a]=h;}n&&!i&&this.j(o);}j(o){o===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,o??"");}},Or=class extends Ke{constructor(){super(...arguments),this.type=3;}j(o){this.element[this.name]=o===Y?void 0:o;}},Tr=class extends Ke{constructor(){super(...arguments),this.type=4;}j(o){this.element.toggleAttribute(this.name,!!o&&o!==Y);}},Ir=class extends Ke{constructor(o,e,r,i,s){super(o,e,r,i,s),this.type=5;}_$AI(o,e=this){if((o=qe(this,o,e,0)??Y)===at)return;let r=this._$AH,i=o===Y&&r!==Y||o.capture!==r.capture||o.once!==r.once||o.passive!==r.passive,s=o!==Y&&(r===Y||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,o),this._$AH=o;}handleEvent(o){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,o):this._$AH.handleEvent(o);}},Rr=class{constructor(o,e,r){this.element=o,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r;}get _$AU(){return this._$AM._$AU}_$AI(o){qe(this,o);}},en={I:uo},ec=zr.litHtmlPolyfillSupport;ec?.(Ho,uo),(zr.litHtmlVersions??=[]).push("3.3.1");var mo=(t,o,e)=>{let r=e?.renderBefore??o,i=r._$litPart$;if(i===void 0){let s=e?.renderBefore??null;r._$litPart$=i=new uo(o.insertBefore(Mo(),s),s,void 0,e??{});}return i._$AI(t),i};var w=t=>t??Y;var on=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(o){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=o;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var ne=function(t,o,e,r,i){if(typeof o=="function"?t!==o||true:!o.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return o.set(t,e),e},vt=function(t,o,e,r){if(typeof o=="function"?t!==o||!r:!o.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?r:e==="a"?r.call(t):r?r.value:o.get(t)},fo,Lr,Vr,Bo,Fi,Wo,Pr,Ge,jo,we,Dr,rn,sn=t=>typeof t=="boolean"?t:t?.capture??false;var Hi=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(o,e,r){if(e==null)return;let i=sn(r)?this.__captureEventListeners:this.__eventListeners,s=i.get(o);if(s===void 0)s=new Map,i.set(o,s);else if(s.has(e))return;let n=typeof r=="object"&&r?r:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(o,e,r)),s.set(e,n??{});}removeEventListener(o,e,r){if(e==null)return;let i=sn(r)?this.__captureEventListeners:this.__eventListeners,s=i.get(o);s!==void 0&&(s.delete(e),s.size||i.delete(o));}dispatchEvent(o){let e=[this],r=this.__eventTargetParent;if(o.composed)for(;r;)e.push(r),r=r.__eventTargetParent;else for(;r&&r!==this.__host;)e.push(r),r=r.__eventTargetParent;let i=false,s=false,n=0,c=null,a=null,h=null,m=o.stopPropagation,d=o.stopImmediatePropagation;Object.defineProperties(o,{target:{get(){return c??a},...Z},srcElement:{get(){return o.target},...Z},currentTarget:{get(){return h},...Z},eventPhase:{get(){return n},...Z},composedPath:{value:()=>e,...Z},stopPropagation:{value:()=>{i=true,m.call(o);},...Z},stopImmediatePropagation:{value:()=>{s=true,d.call(o);},...Z}});let f=(E,S,O)=>{typeof E=="function"?E(o):typeof E?.handleEvent=="function"&&E.handleEvent(o),S.once&&O.delete(E);},g=()=>(h=null,n=0,!o.defaultPrevented),b=e.slice().reverse();c=!this.__host||!o.composed?this:null;let x=E=>{for(a=this;a.__host&&E.includes(a.__host);)a=a.__host;};for(let E of b){!c&&(!a||a===E.__host)&&x(b.slice(b.indexOf(E))),h=E,n=E===o.target?2:1;let S=E.__captureEventListeners.get(o.type);if(S){for(let[O,_]of S)if(f(O,_,S),s)return g()}if(i)return g()}let I=o.bubbles?e:[this];a=null;for(let E of I){!c&&(!a||E===a.__host)&&x(I.slice(0,I.indexOf(E)+1)),h=E,n=E===o.target?2:3;let S=E.__eventListeners.get(o.type);if(S){for(let[O,_]of S)if(f(O,_,S),s)return g()}if(i)return g()}return g()}},Bi=Hi;var Z={__proto__:null};Z.enumerable=true;Object.freeze(Z);var Wi=(we=class{constructor(o,e={}){if(fo.set(this,false),Lr.set(this,false),Vr.set(this,false),Bo.set(this,false),Fi.set(this,Date.now()),Wo.set(this,false),Pr.set(this,void 0),Ge.set(this,void 0),jo.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof e!="object"||!e)throw new Error('The "options" argument must be an object');let{bubbles:r,cancelable:i,composed:s}=e;ne(this,fo,!!i),ne(this,Lr,!!r),ne(this,Vr,!!s),ne(this,Pr,`${o}`),ne(this,Ge,null),ne(this,jo,false);}initEvent(o,e,r){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){ne(this,Bo,true);}get target(){return vt(this,Ge,"f")}get currentTarget(){return vt(this,Ge,"f")}get srcElement(){return vt(this,Ge,"f")}get type(){return vt(this,Pr,"f")}get cancelable(){return vt(this,fo,"f")}get defaultPrevented(){return vt(this,fo,"f")&&vt(this,Bo,"f")}get timeStamp(){return vt(this,Fi,"f")}composedPath(){return vt(this,jo,"f")?[vt(this,Ge,"f")]:[]}get returnValue(){return !vt(this,fo,"f")||!vt(this,Bo,"f")}get bubbles(){return vt(this,Lr,"f")}get composed(){return vt(this,Vr,"f")}get eventPhase(){return vt(this,jo,"f")?we.AT_TARGET:we.NONE}get cancelBubble(){return vt(this,Wo,"f")}set cancelBubble(o){o&&ne(this,Wo,true);}stopPropagation(){ne(this,Wo,true);}get isTrusted(){return  false}},fo=new WeakMap,Lr=new WeakMap,Vr=new WeakMap,Bo=new WeakMap,Fi=new WeakMap,Wo=new WeakMap,Pr=new WeakMap,Ge=new WeakMap,jo=new WeakMap,we.NONE=0,we.CAPTURING_PHASE=1,we.AT_TARGET=2,we.BUBBLING_PHASE=3,we);Object.defineProperties(Wi.prototype,{initEvent:Z,stopImmediatePropagation:Z,preventDefault:Z,target:Z,currentTarget:Z,srcElement:Z,type:Z,cancelable:Z,defaultPrevented:Z,timeStamp:Z,composedPath:Z,returnValue:Z,bubbles:Z,composed:Z,eventPhase:Z,cancelBubble:Z,stopPropagation:Z,isTrusted:Z});var nn=(rn=class extends Wi{constructor(o,e={}){super(o,e),Dr.set(this,void 0),ne(this,Dr,e?.detail??null);}initCustomEvent(o,e,r,i){throw new Error("Method not implemented.")}get detail(){return vt(this,Dr,"f")}},Dr=new WeakMap,rn);Object.defineProperties(nn.prototype,{detail:Z});var ji=Wi,Ni=nn;globalThis.Event??=ji;globalThis.CustomEvent??=Ni;var an=new WeakMap,No=t=>{let o=an.get(t);return o===void 0&&an.set(t,o=new Map),o},oc=class extends Bi{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(No(this)).map(([o,e])=>({name:o,value:e}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(o,e){No(this).set(o,String(e));}removeAttribute(o){No(this).delete(o);}toggleAttribute(o,e){if(this.hasAttribute(o)){if(e===void 0||!e)return this.removeAttribute(o),false}else return e===void 0||e?(this.setAttribute(o,""),true):false;return  true}hasAttribute(o){return No(this).has(o)}attachShadow(o){let e={host:this};return this.__shadowRootMode=o.mode,o&&o.mode==="open"&&(this.__shadowRoot=e),e}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let o=new on(this);return this.__internals=o,o}getAttribute(o){return No(this).get(o)??null}};var rc=class extends oc{},qi=rc;globalThis.litServerRoot??=Object.defineProperty(new qi,"localName",{get(){return "lit-server-root"}});function ic(){let t,o;return {promise:new Promise((r,i)=>{t=r,o=i;}),resolve:t,reject:o}}var Ui=class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map;}define(o,e){if(this.__definitions.has(o))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${o}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${o}" has already been used with this registry`);if(this.__reverseDefinitions.has(e))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(e)}`);e.__localName=o,this.__definitions.set(o,{ctor:e,observedAttributes:e.observedAttributes??[]}),this.__reverseDefinitions.set(e,o),this.__pendingWhenDefineds.get(o)?.resolve(e),this.__pendingWhenDefineds.delete(o);}get(o){return this.__definitions.get(o)?.ctor}getName(o){return this.__reverseDefinitions.get(o)??null}upgrade(o){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(o){let e=this.__definitions.get(o);if(e)return e.ctor;let r=this.__pendingWhenDefineds.get(o);return r||(r=ic(),this.__pendingWhenDefineds.set(o,r)),r.promise}},sc=Ui;var ln=new sc;var Uo=globalThis,Mr=Uo.ShadowRoot&&(Uo.ShadyCSS===void 0||Uo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ki=Symbol(),cn=new WeakMap,qo=class{constructor(o,e,r){if(this._$cssResult$=true,r!==Ki)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=e;}get styleSheet(){let o=this.o,e=this.t;if(Mr&&o===void 0){let r=e!==void 0&&e.length===1;r&&(o=cn.get(e)),o===void 0&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),r&&cn.set(e,o));}return o}toString(){return this.cssText}},pn=t=>new qo(typeof t=="string"?t:t+"",void 0,Ki),y=(t,...o)=>{let e=t.length===1?t[0]:o.reduce(((r,i,s)=>r+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new qo(e,t,Ki)},dn=(t,o)=>{if(Mr)t.adoptedStyleSheets=o.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of o){let r=document.createElement("style"),i=Uo.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,t.appendChild(r);}},Gi=Mr||Uo.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(o=>{let e="";for(let r of o.cssRules)e+=r.cssText;return pn(e)})(t):t;var{is:nc,defineProperty:ac,getOwnPropertyDescriptor:lc,getOwnPropertyNames:cc,getOwnPropertySymbols:pc,getPrototypeOf:dc}=Object,Go=globalThis;Go.customElements??=ln;var hn=Go.trustedTypes,hc=hn?hn.emptyScript:"",uc=Go.reactiveElementPolyfillSupport,Ko=(t,o)=>t,Se={toAttribute(t,o){switch(o){case Boolean:t=t?hc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,o){let e=t;switch(o){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t);}catch{e=null;}}return e}},Fr=(t,o)=>!nc(t,o),un={attribute:true,type:String,converter:Se,reflect:false,useDefault:false,hasChanged:Fr};Symbol.metadata??=Symbol("metadata"),Go.litPropertyMetadata??=new WeakMap;var ue=class extends(globalThis.HTMLElement??qi){static addInitializer(o){this._$Ei(),(this.l??=[]).push(o);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(o,e=un){if(e.state&&(e.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(o)&&((e=Object.create(e)).wrapped=true),this.elementProperties.set(o,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(o,r,e);i!==void 0&&ac(this.prototype,o,i);}}static getPropertyDescriptor(o,e,r){let{get:i,set:s}=lc(this.prototype,o)??{get(){return this[e]},set(n){this[e]=n;}};return {get:i,set(n){let c=i?.call(this);s?.call(this,n),this.requestUpdate(o,c,r);},configurable:true,enumerable:true}}static getPropertyOptions(o){return this.elementProperties.get(o)??un}static _$Ei(){if(this.hasOwnProperty(Ko("elementProperties")))return;let o=dc(this);o.finalize(),o.l!==void 0&&(this.l=[...o.l]),this.elementProperties=new Map(o.elementProperties);}static finalize(){if(this.hasOwnProperty(Ko("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(Ko("properties"))){let e=this.properties,r=[...cc(e),...pc(e)];for(let i of r)this.createProperty(i,e[i]);}let o=this[Symbol.metadata];if(o!==null){let e=litPropertyMetadata.get(o);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i);}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(o){let e=[];if(Array.isArray(o)){let r=new Set(o.flat(1/0).reverse());for(let i of r)e.unshift(Gi(i));}else o!==void 0&&e.push(Gi(o));return e}static _$Eu(o,e){let r=e.attribute;return r===false?void 0:typeof r=="string"?r:typeof o=="string"?o.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((o=>this.enableUpdating=o)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((o=>o(this)));}addController(o){(this._$EO??=new Set).add(o),this.renderRoot!==void 0&&this.isConnected&&o.hostConnected?.();}removeController(o){this._$EO?.delete(o);}_$E_(){let o=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(o.set(r,this[r]),delete this[r]);o.size>0&&(this._$Ep=o);}createRenderRoot(){let o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dn(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((o=>o.hostConnected?.()));}enableUpdating(o){}disconnectedCallback(){this._$EO?.forEach((o=>o.hostDisconnected?.()));}attributeChangedCallback(o,e,r){this._$AK(o,r);}_$ET(o,e){let r=this.constructor.elementProperties.get(o),i=this.constructor._$Eu(o,r);if(i!==void 0&&r.reflect===true){let s=(r.converter?.toAttribute!==void 0?r.converter:Se).toAttribute(e,r.type);this._$Em=o,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null;}}_$AK(o,e){let r=this.constructor,i=r._$Eh.get(o);if(i!==void 0&&this._$Em!==i){let s=r.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Se;this._$Em=i;let c=n.fromAttribute(e,s.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null;}}requestUpdate(o,e,r){if(o!==void 0){let i=this.constructor,s=this[o];if(r??=i.getPropertyOptions(o),!((r.hasChanged??Fr)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(o)&&!this.hasAttribute(i._$Eu(o,r))))return;this.C(o,e,r);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(o,e,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??=new Map).has(o)&&(this._$Ej.set(o,n??e??this[o]),s!==true||n!==void 0)||(this._$AL.has(o)||(this.hasUpdated||r||(e=void 0),this._$AL.set(o,e)),i===true&&this._$Em!==o&&(this._$Eq??=new Set).add(o));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(e){Promise.reject(e);}let o=this.scheduleUpdate();return o!=null&&await o,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0;}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,s]of r){let{wrapped:n}=s,c=this[i];n!==true||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c);}}let o=false,e=this._$AL;try{o=this.shouldUpdate(e),o?(this.willUpdate(e),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(e)):this._$EM();}catch(r){throw o=false,this._$EM(),r}o&&this._$AE(e);}willUpdate(o){}_$AE(o){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(o)),this.updated(o);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(o){return  true}update(o){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM();}updated(o){}firstUpdated(o){}};ue.elementStyles=[],ue.shadowRootOptions={mode:"open"},ue[Ko("elementProperties")]=new Map,ue[Ko("finalized")]=new Map,uc?.({ReactiveElement:ue}),(Go.reactiveElementVersions??=[]).push("2.1.1");var Yi=globalThis,lt=class extends ue{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let o=super.createRenderRoot();return this.renderOptions.renderBefore??=o.firstChild,o}update(o){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this._$Do=mo(e,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return at}};lt._$litElement$=true,lt.finalized=true,Yi.litElementHydrateSupport?.({LitElement:lt});var mc=Yi.litElementPolyfillSupport;mc?.({LitElement:lt});(Yi.litElementVersions??=[]).push("4.2.1");var mn=t=>(o,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(t,o);})):customElements.define(t,o);};var fc={attribute:true,type:String,converter:Se,reflect:false,hasChanged:Fr},gc=(t=fc,o,e)=>{let{kind:r,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=true),s.set(e.name,t),r==="accessor"){let{name:n}=e;return {set(c){let a=o.get.call(this);o.set.call(this,c),this.requestUpdate(n,a,t);},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(r==="setter"){let{name:n}=e;return function(c){let a=this[n];o.call(this,c),this.requestUpdate(n,a,t);}}throw Error("Unsupported decorator location: "+r)};function p(t){return (o,e)=>typeof e=="object"?gc(t,o,e):((r,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,r),n?Object.getOwnPropertyDescriptor(i,s):void 0})(t,o,e)}function k(t){return p({...t,state:true,attribute:false})}function Ce(t){return (o,e)=>{let r=typeof o=="function"?o:o[e];Object.assign(r,t);}}var me=(t,o,e)=>(e.configurable=true,e.enumerable=true,Reflect.decorate&&typeof o!="object"&&Object.defineProperty(t,o,e),e);function $(t,o){return (e,r,i)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return me(e,r,{get(){return s(this)}})}}var bc;function fn(t){return (o,e)=>me(o,e,{get(){return (this.renderRoot??(bc??=document.createDocumentFragment())).querySelectorAll(t)}})}function gn(t){return (o,e)=>{let{slot:r,selector:i}=t??{},s="slot"+(r?`[name=${r}]`:":not([name])");return me(o,e,{get(){let n=this.renderRoot?.querySelector(s),c=n?.assignedElements(t)??[];return i===void 0?c:c.filter((a=>a.matches(i)))}})}}function ke(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function bn(t,o){return ke(t)?Object.assign({},t,o):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},o)}function vn(t,o,e){if(!o||o.length===0)return t;let r=Array.isArray(o)?o:o.split("."),i,s=t;for(let n=0;n<r.length;n++){let c=r[n];if(c in s)i=s[c];else return e;s=i;}return i}function Hr(t,o,e,r){if(!o||!t)return t;let i=o;if(i.length===0)return typeof t=="object"&&Object.assign(t,e),t;{let s=t,n=[],c=(a,h,m)=>{a[h]=m;};for(let a=0;a<i.length;a++){let h=i[a];if(n.push(h),s)if(Array.isArray(s)){let m=parseInt(h,10);if(Number.isNaN(m)||m<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);a===i.length-1?c(s,m,e):s=s[m];}else s instanceof Map||s instanceof WeakMap?a===i.length-1?s.set(h,e):(s.has(h)||s.set(h,{}),s=s.get(h)):typeof s=="object"&&h in s?a===i.length-1?c(s,h,e):s=s[h]:(s[h]=a===i.length-1?e:{},s=s[h]);else s[h]=a===i.length-1?e:{},s=s[h];}}return t}function vc(t){if(t==null)return "";let o=typeof t;if(o==="boolean")return String(t);if(Array.isArray(t))return t.join(",");if(o==="object")try{return JSON.stringify(t)}catch{return "{}"}return String(t)}function yn(t,o){if(!o)return t;let e=o.datatype||"any";if(e==="any")return t;if(e==="string")return vc(t);if(e==="number")return Number(t);if(Array.isArray(t))return [...t];if(typeof t=="object")return {...t};if(typeof t=="string"){if(e==="boolean")return t.toLowerCase()==="true";if(e==="array")return t.split(",").map(r=>r.trim());if(e==="object")try{return JSON.parse(t)}catch{return {}}}return e==="boolean"?!!t:t}function xn(t,o,e){return t?e(o):o}var Xi="";function _n(t){Xi=t;}function wn(t=""){if(!Xi){let o=[...document.getElementsByTagName("script")],e=o.find(r=>r.hasAttribute("data-shoelace"));if(e)_n(e.getAttribute("data-shoelace"));else {let r=o.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),i="";r&&(i=r.getAttribute("src")),_n(i.split("/").slice(0,-1).join("/"));}}return Xi.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var yc={name:"default",resolver:t=>wn(`assets/icons/${t}.svg`)},Sn=yc;var Cn={caret:`
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
  `},xc={name:"system",resolver:t=>t in Cn?`data:image/svg+xml,${encodeURIComponent(Cn[t])}`:""},kn=xc;var Br=[Sn,kn],Wr=[];function Qi(t){Wr.push(t);}function Zi(t){Wr=Wr.filter(o=>o!==t);}function go(t){return Br.find(o=>o.name===t)}function Ji(t,o){$n(t),Br.push({name:t,resolver:o.resolver,mutator:o.mutator,spriteSheet:o.spriteSheet}),Wr.forEach(e=>{e.library===t&&e.setIcon();});}function $n(t){Br=Br.filter(o=>o.name!==t);}var On=Object.defineProperty,_c=Object.defineProperties,wc=Object.getOwnPropertyDescriptor,Sc=Object.getOwnPropertyDescriptors,En=Object.getOwnPropertySymbols,Cc=Object.prototype.hasOwnProperty,kc=Object.prototype.propertyIsEnumerable,ts=(t,o)=>(o=Symbol[t])?o:Symbol.for("Symbol."+t),es=t=>{throw TypeError(t)},An=(t,o,e)=>o in t?On(t,o,{enumerable:true,configurable:true,writable:true,value:e}):t[o]=e,St=(t,o)=>{for(var e in o||(o={}))Cc.call(o,e)&&An(t,e,o[e]);if(En)for(var e of En(o))kc.call(o,e)&&An(t,e,o[e]);return t},fe=(t,o)=>_c(t,Sc(o)),l=(t,o,e,r)=>{for(var i=r>1?void 0:r?wc(o,e):o,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(r?n(o,e,i):n(i))||i);return r&&i&&On(o,e,i),i},Tn=(t,o,e)=>o.has(t)||es("Cannot "+e),In=(t,o,e)=>(Tn(t,o,"read from private field"),o.get(t)),Rn=(t,o,e)=>o.has(t)?es("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(t):o.set(t,e),zn=(t,o,e,r)=>(Tn(t,o,"write to private field"),o.set(t,e),e),$c=function(t,o){this[0]=t,this[1]=o;},Ln=t=>{var o=t[ts("asyncIterator")],e=false,r,i={};return o==null?(o=t[ts("iterator")](),r=s=>i[s]=n=>o[s](n)):(o=o.call(t),r=s=>i[s]=n=>{if(e){if(e=false,s==="throw")throw n;return n}return e=true,{done:false,value:new $c(new Promise(c=>{var a=o[s](n);a instanceof Object||es("Object expected"),c(a);}),1)}}),i[ts("iterator")]=()=>i,r("next"),"throw"in o?r("throw"):i.throw=s=>{throw s},"return"in o&&r("return"),i};var Pn="https://unpkg.com/lucide-static@latest/icons/{name}.svg",os={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>',bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>'},Vn=t=>t in os?`data:image/svg+xml,${encodeURIComponent(os[t])}`:Pn.replace("{name}",t),Ec=t=>{t&&t.setAttribute("stroke-width","1");};function bo(t="https://unpkg.com/lucide-static@latest/icons/{name}.svg",o){if(!t.includes("{name}"))throw new Error('icon url must include "{name}"');Pn=t,go("default").resolver!==Vn&&Ji("default",{resolver:Vn,mutator:Ec});}function Ac(t){t=t.replace(/^#/,"");let o=parseInt(t.substring(0,2),16)/255,e=parseInt(t.substring(2,4),16)/255,r=parseInt(t.substring(4,6),16)/255,i=Math.max(o,e,r),s=Math.min(o,e,r),n=0,c=0,a=(i+s)/2;if(i!==s){let h=i-s;switch(c=a>.5?h/(2-i-s):h/(i+s),i){case o:n=(e-r)/h+(e<r?6:0);break;case e:n=(r-o)/h+2;break;case r:n=(o-e)/h+4;break}n/=6;}return {h:Math.round(n*360),s:Math.round(c*100),l:Math.round(a*100)}}function Oc(t,o,e){o/=100,e/=100;let r=(1-Math.abs(2*e-1))*o,i=r*(1-Math.abs(t/60%2-1)),s=e-r/2,n=0,c=0,a=0;0<=t&&t<60?(n=r,c=i,a=0):60<=t&&t<120?(n=i,c=r,a=0):120<=t&&t<180?(n=0,c=r,a=i):180<=t&&t<240?(n=0,c=i,a=r):240<=t&&t<300?(n=i,c=0,a=r):300<=t&&t<360&&(n=r,c=0,a=i),n=Math.round((n+s)*255),c=Math.round((c+s)*255),a=Math.round((a+s)*255);let h=m=>{let d=m.toString(16);return d.length===1?"0"+d:d};return `#${h(n)}${h(c)}${h(a)}`}function Dn(t){let o=Ac(t),e={50:{hDiff:3.3,sFactor:.74,lFactor:.44},100:{hDiff:3.7,sFactor:.82,lFactor:.59},200:{hDiff:3,sFactor:.88,lFactor:.65},300:{hDiff:3.4,sFactor:.94,lFactor:.76},400:{hDiff:2.4,sFactor:.94,lFactor:.93},500:{hDiff:0,sFactor:1,lFactor:1},600:{hDiff:-1,sFactor:1.14,lFactor:1.2},700:{hDiff:-1,sFactor:1.16,lFactor:1.48},800:{hDiff:-0.9,sFactor:1.16,lFactor:1.73},900:{hDiff:-1.2,sFactor:1.16,lFactor:1.89},950:{hDiff:-13.7,sFactor:1.16,lFactor:2}},r={};for(let[i,s]of Object.entries(e)){let n=Math.max(0,Math.min(360,o.h+s.hDiff)),c=Math.max(0,Math.min(100,o.s*s.sFactor)),a=Math.max(0,Math.min(100,o.l*s.lFactor));r[`--sl-color-primary-${i}`]=Oc(n,c,a);}return r}function Tc(t){if(!t.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){console.error("Invalid color format. Please provide a valid hex color (e.g., #3B82F6)");return}try{let o=Dn(t),e=document.getElementById("auto-styles");e||(e=document.createElement("style"),e.id="auto-styles",document.head.appendChild(e));let r=`:root {
`;Object.entries(o).forEach(([s,n])=>{r+=`  ${s}: ${n};
`;}),r+="}",e.textContent=r;let i=document.body;return o["--sl-color-primary-500"]&&i.style.setProperty("--sl-color-primary-500",o["--sl-color-primary-500"]),console.log("Primary color changed successfully"),o}catch(o){console.error("Failed to change theme color:",o);}}globalThis.changePrimaryColor=Tc;var $e=class extends Event{constructor(o,e,r,i){super("context-request",{bubbles:true,composed:true}),this.context=o,this.contextTarget=e,this.callback=r,this.subscribe=i??false;}};var vo=class{constructor(o,e,r,i){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=o,e.context!==void 0){let s=e;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=e,this.callback=r,this.subscribe=i??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new $e(this.context,this.host,this.t,this.subscribe));}};var jr=class{get value(){return this.o}set value(o){this.setValue(o);}setValue(o,e=false){let r=e||!Object.is(o,this.o);this.o=o,r&&this.updateObservers();}constructor(o){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:r}]of this.subscriptions)e(this.o,r);},o!==void 0&&(this.value=o);}addCallback(o,e,r){if(!r)return void o(this.value);this.subscriptions.has(o)||this.subscriptions.set(o,{disposer:()=>{this.subscriptions.delete(o);},consumerHost:e});let{disposer:i}=this.subscriptions.get(o);o(this.value,i);}clearCallbacks(){this.subscriptions.clear();}};var rs=class extends Event{constructor(o,e){super("context-provider",{bubbles:true,composed:true}),this.context=o,this.contextTarget=e;}},yo=class extends jr{constructor(o,e,r){super(e.context!==void 0?e.initialValue:r),this.onContextRequest=i=>{if(i.context!==this.context)return;let s=i.contextTarget??i.composedPath()[0];s!==this.host&&(i.stopPropagation(),this.addCallback(i.callback,s,i.subscribe));},this.onProviderRequest=i=>{if(i.context!==this.context||(i.contextTarget??i.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:c}]of this.subscriptions)s.has(n)||(s.add(n),c.dispatchEvent(new $e(this.context,c,n,true)));i.stopPropagation();},this.host=o,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new rs(this.context,this.host));}};function is({context:t}){return (o,e)=>{let r=new WeakMap;if(typeof e=="object")return {get(){return o.get.call(this)},set(i){return r.get(this).setValue(i),o.set.call(this,i)},init(i){return r.set(this,new yo(this,{context:t,initialValue:i})),i}};{o.constructor.addInitializer((n=>{r.set(n,new yo(n,{context:t}));}));let i=Object.getOwnPropertyDescriptor(o,e),s;if(i===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(c){r.get(this).setValue(c),n.set(this,c);},configurable:true,enumerable:true};}else {let n=i.set;s={...i,set(c){r.get(this).setValue(c),n?.call(this,c);}};}return void Object.defineProperty(o,e,s)}}}function ss({context:t,subscribe:o}){return (e,r)=>{typeof r=="object"?r.addInitializer((function(){new vo(this,{context:t,callback:i=>{e.set.call(this,i);},subscribe:o});})):e.constructor.addInitializer((i=>{new vo(i,{context:t,callback:s=>{i[r]=s;},subscribe:o});}));}}var Nr="autoform";var Ur=y`
    
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
    

`;var Mn=y`
    ${Ur}
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
`;var yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Pt=t=>(...o)=>({_$litDirective$:t,values:o}),At=class{constructor(o){}get _$AU(){return this._$AM._$AU}_$AT(o,e,r){this._$Ct=o,this._$AM=e,this._$Ci=r;}_$AS(o,e){return this.update(o,e)}update(o,e){return this.render(...e)}};var{I:Rc}=en;var Hn=(t,o)=>t?._$litType$!==void 0;var qr=t=>t.strings===void 0,Fn=()=>document.createComment(""),xo=(t,o,e)=>{let r=t._$AA.parentNode,i=o===void 0?t._$AB:o._$AA;if(e===void 0){let s=r.insertBefore(Fn(),i),n=r.insertBefore(Fn(),i);e=new Rc(s,n,t,t.options);}else {let s=e._$AB.nextSibling,n=e._$AM,c=n!==t;if(c){let a;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(a=t._$AU)!==n._$AU&&e._$AP(a);}if(s!==i||c){let a=e._$AA;for(;a!==s;){let h=a.nextSibling;r.insertBefore(a,i),a=h;}}}return e},Ee=(t,o,e=t)=>(t._$AI(o,e),t),zc={},Kr=(t,o=zc)=>t._$AH=o,Bn=t=>t._$AH,Gr=t=>{t._$AR(),t._$AA.remove();};var Wn=(t,o,e)=>{let r=new Map;for(let i=o;i<=e;i++)r.set(t[i],i);return r},tt=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,o,e){let r;e===void 0?e=o:o!==void 0&&(r=o);let i=[],s=[],n=0;for(let c of t)i[n]=r?r(c,n):n,s[n]=e(c,n),n++;return {values:s,keys:i}}render(t,o,e){return this.dt(t,o,e).values}update(t,[o,e,r]){let i=Bn(t),{values:s,keys:n}=this.dt(o,e,r);if(!Array.isArray(i))return this.ut=n,s;let c=this.ut??=[],a=[],h,m,d=0,f=i.length-1,g=0,b=s.length-1;for(;d<=f&&g<=b;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(c[d]===n[g])a[g]=Ee(i[d],s[g]),d++,g++;else if(c[f]===n[b])a[b]=Ee(i[f],s[b]),f--,b--;else if(c[d]===n[b])a[b]=Ee(i[d],s[b]),xo(t,a[b+1],i[d]),d++,b--;else if(c[f]===n[g])a[g]=Ee(i[f],s[g]),xo(t,i[d],i[f]),f--,g++;else if(h===void 0&&(h=Wn(n,g,b),m=Wn(c,d,f)),h.has(c[d]))if(h.has(c[f])){let x=m.get(n[g]),I=x!==void 0?i[x]:null;if(I===null){let E=xo(t,i[d]);Ee(E,s[g]),a[g]=E;}else a[g]=Ee(I,s[g]),xo(t,i[d],I),i[x]=null;g++;}else Gr(i[f]),f--;else Gr(i[d]),d++;for(;g<=b;){let x=xo(t,a[b+1]);Ee(x,s[g]),a[g++]=x;}for(;d<=f;){let x=i[d++];x!==null&&Gr(x);}return this.ut=n,Kr(t,a),at}});var _o=class{constructor(o){this.host=o,o.addController(this);}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext();}};var jn="important",Lc=" !"+jn,J=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((o,e)=>{let r=t[e];return r==null?o:o+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(t,[o]){let{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(o)),this.render(o);for(let r of this.ft)o[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(let r in o){let i=o[r];if(i!=null){this.ft.add(r);let s=typeof i=="string"&&i.endsWith(Lc);r.includes("-")||s?e.setProperty(r,s?i.slice(0,-11):i,s?jn:""):e[r]=i;}}return at}});function B(t,o,e){return t?o(t):e?.(t)}var Ae=class{constructor(o,...e){this.initialClasses=[];this.host=o,o.addController(this),this.initialClasses=e;}_forEachClasss(o,e){o&&o.forEach(r=>{typeof r=="string"?(e(r,true),this.host.classList.add(r)):Object.entries(r).forEach(([i,s])=>{e(i,s);});});}add(...o){this.host&&o&&this._forEachClasss(o,e=>{this.host.classList.add(e);});}remove(...o){this.host&&o&&this._forEachClasss(o,e=>{this.host.classList.remove(e);});}toggle(...o){this.host&&this._forEachClasss(o,e=>{this.host.classList.toggle(e);});}use(...o){this.host&&this._forEachClasss(o,(e,r)=>{r?this.host.classList.add(e):this.host.classList.remove(e);});}has(o){return this.host.classList.contains(o)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var Yo=class extends At{constructor(o){if(super(o),this.it=Y,o.type!==yt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(o){if(o===Y||o==null)return this._t=void 0,this.it=o;if(o===at)return o;if(typeof o!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(o===this.it)return this._t;this.it=o;let e=[o];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Yo.directiveName="unsafeHTML",Yo.resultType=1;var Ot=Pt(Yo);function Nn(t,o){o&&Object.entries(o).forEach(([e,r])=>{(e==="root"?[t]:Array.from(t.querySelectorAll(e))).forEach(s=>{typeof r=="string"?s.style.cssText=r:typeof r=="object"&&Object.assign(s.style,r);});});}function wo(t,o,e){e?t.classList.add(o):t.classList.remove(o);}function Un(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var R=class extends lt{constructor(){super(...arguments);this.theme=new _o(this);this.classs=new Ae(this);this.options=Un();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this._updateFieldValue();}static{this.styles=Mn;}get shadow(){return this.shadowRoot}getFieldOptions(){return Object.entries(this.schema||{}).reduce((e,[r,i])=>(ke(i)?e[r]=i.value:e[r]=i,e),Object.assign({},Un(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(e=true){return u`${this.renderBeforeActions(e)} ${this.renderAfterActions(e)}`}_onClickAction(e,r){return i=>{typeof r=="function"&&r(i),e.onClick&&typeof e.onClick=="function"&&e.onClick?.call(this,this.getInputValue(),{action:e,options:this.options,event:i,update:s=>{Hr(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(e){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return u`<div
                class="actions before"
                part="before-actions"
                slot="${w(e?"prefix":void 0)}"
            >
                ${tt(this.beforeActions,r=>this.renderActionWidget(r))}
            </div>`}renderAfterActions(e){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return u`<div
                class="actions after"
                part="after-actions"
                slot="${w(e?"suffix":void 0)}"
            >
                ${tt(this.afterActions,r=>this.renderActionWidget(r))}
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
                    ${tt(e.items||[],r=>r==="-"?u`<sl-divider></sl-divider>`:(typeof r=="string"&&(r={label:r}),u`<sl-menu-item
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
        `}renderActionWidget(e){if(typeof e!="object")return;let r=e.type||"button";if(r==="dropdown")return this._renderDropdownAction(e);if(r==="button")return this._renderButtonAction(e);if(r==="image")return this._renderImageAction(e)}renderOption(e,r){let i=this.schema[e];if(i)return i.loading?u`<sl-spinner></sl-spinner>`:u`${r?r(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(e){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,e):e}toState(e){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,e):e}toInput(e){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,e):e}getOptionValue(e,r){if(this.schema&&e in this.schema){let i=this.schema[e];return i===void 0?r:ke(i)?i.value:i}else return r}getOption(e){if(this.schema&&e in this.schema){let r=this.schema[e];return ke(r)?r:bn(r)}}getInputValue(){if(!this.input)return "";let e=this.input.value;if(typeof this.options.toState!="function"){let r=this.options.datatype||"string";r==="number"?e=Number(e):r==="boolean"&&(e=!!e);}return e}_renderRequiredOption(){return this.renderOption("required",e=>e?u`<span style="color:red;">*</span>`:"")}renderHelp(e=false){let r=this.options.help;if(!r)return;let i=r.match(/\(([^)]+)\)[^)]*$/),s=i?i[1]:null,n=s?r.replace(`(${s})`,""):r;return u`<span
            class="help"
            part="field-help"
            title="${w(e?n:void 0)}"
        >
            ${xn(!!s,u`
                    <sl-icon name="help"></sl-icon>
                    ${B(!e,()=>u`${n}`)}
                `,c=>u`<a target="_blank" href="${s}">${c}</a>`)}
        </span>`}renderLabel(){let e=this.context,r=this.options.labelPos||e.labelPos;if(r==="none")return u``;{let i={};return (e.labelWidth&&r==="left"||e.viewonly)&&(i.width=e.labelWidth),u`<div class="label" part="field-label" style="${w(J(i))}">
                <span class="title">
                    ${this.getLabel()}
                    ${B(r==="left"||e.viewonly,()=>this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${B(r==="top"&&!e.viewonly,()=>this.renderHelp())}
            </div>`}}renderInput(){return u``}isShowError(){return this.context.validAtInit?!!this.invalidTips:this.dirty?!!this.invalidTips:false}renderError(){return this.isShowError()?u`<div class="error">${this.invalidTips}</div>`:u``}_handleSchemaChange(){let e=this.context;if(e?.store&&this.schema){let r=this.getPath().join("_$_");this._subscribers.push(e.store.schemas.store.watch(`${r}.**`,i=>{let{reply:s,type:n,value:c,flags:a}=i;if(s||e.form.seq===a)return;(n==="batch"?c:[i]).forEach(m=>{let d=m.path.slice(1);Hr(this.schema,d,m.value),this.options[d[0]]=m.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let e=this.value;if(this.options.toView&&this.options.toView)try{e=this.options.toView.call(this,this.value);}catch(r){console.error(`Error while toView<${this.path}>: ${r.message}`);}return u`${Ot(String(e))}`}_handleStateChange(){let e=this.context;e?.store&&this.schema&&this._subscribers.push(e.store.watch(this.getPath().join("."),r=>{this.value=this.toInput(r.value);},{operates:"write"}));}getStateValue(){return this.toInput(vn(this.context.store.state,this.getPath()))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let e=this.context;e?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.getPath().join("."),this.name=this.options.name||this.path,this.path in e.store.schemas.errors&&(this.invalidTips=e.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(r=>r.pos==="before"),this.afterActions=this.options.actions.filter(r=>r.pos!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(e=>e.off());}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFormClasss(){this.context.form&&(wo(this.context.form,"dirty",this.dirty),wo(this.context.form,"invalid",!!this.invalidTips));}_updateFieldValue(){if(!this.schema)return;let e=this.getPath(),r=this.toState(this.getInputValue()),i=this.context;i.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let c=yn(r,this.schema);Hr(n,e,c),this.invalidTips=void 0;},{flags:i.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:r,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidTips=s.message;}finally{this._updateFormClasss();}}renderValue(){return u`
            ${this.renderInput()} ${B(this.context.viewonly,()=>this.renderHelp())}
            ${this.renderError()}
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(){this.options.styles&&Nn(this.shadow,this.options.styles);}render(){let e=this.context,r=this.options.labelPos?this.options.labelPos:e.labelPos;return this.classs.use(e.size,{[`${e.border}-border`]:true,error:this.isShowError(),"left-label":r==="left"||e.viewonly,"top-label":r==="top"&&!e.viewonly,disable:this.options.enable===false,readonly:e.readonly,viewonly:e.viewonly,compact:this.compact===void 0?e.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${e.viewAlign}`]:true,[`${e.layout}-layout`]:true}),u`
            <div class="autofield">
                ${this.options.divider?u`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${B(e.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>
            </div>
        `}};v([p({type:Object})],R.prototype,"schema",2),v([k()],R.prototype,"value",2),v([k()],R.prototype,"invalidTips",2),v([k()],R.prototype,"labelPos",2),v([k()],R.prototype,"dirty",2),v([p({type:Boolean,reflect:true})],R.prototype,"noreactive",2),v([p({type:Boolean,reflect:true})],R.prototype,"compact",2),v([gn({slot:"value",flatten:true})],R.prototype,"_field",2),v([$(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],R.prototype,"input",2),v([ss({context:Nr}),p({attribute:false})],R.prototype,"context",2);function T(t){return o=>customElements.get(t)?o:mn(t)(o)}exports.AutoFieldInput=class Q extends R{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return u`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=i=>i.map(s=>typeof s=="string"?s:s.value||s.label),r=(i,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let c=e(s),a=-1;c.some((d,f)=>{if(n&&this.value.startsWith(d)||!n&&this.value.endsWith(d))return n?(this._prefix=d,this.value=this.value.substring(d.length)):(this._suffix=d,this.value=this.value.substring(0,this.value.length-d.length)),a=f,true});let h=a===-1?"?":typeof s[a]=="string"?s[a]:s[a].label,m={type:s.length===1?"button":"dropdown",label:h,caret:!n};m.type==="dropdown"?m.items=s.map(d=>(d==="-"||(d=typeof d=="string"?{label:d}:d,d.onClick=()=>{n?this._prefix=d.value??d.label:this._suffix=d.value??d.label,this.onFieldChange();}),d)):typeof s[0]=="string"?m.label=s[0]:Object.assign(m,s[0]),m.syncMenu=true,m.pos=n?"before":"after",n?i.splice(0,0,m):i.push(m);}};this.options.prefix&&r(this.beforeActions,this.options.prefix),this.options.suffix&&r(this.afterActions,this.options.suffix,false);}onInputChange(e){let r=e.type;this.context.validAt==="input"&&r.includes("input")?this.onFieldInput():r.includes("change")&&this.onFieldChange();}renderInput(){return u`
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
        `],exports.AutoFieldInput=v([T("auto-field-input")],exports.AutoFieldInput);var qn=y`
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
`;var Ht=(t="value")=>(o,e)=>{let r=o.constructor,i=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(s,n,c){var a;let h=r.getPropertyOptions(t),m=typeof h.attribute=="string"?h.attribute:t;if(s===m){let d=h.converter||Se,g=(typeof d=="function"?d:(a=d?.fromAttribute)!=null?a:Se.fromAttribute)(c,h.type);this[t]!==g&&(this[e]=g);}i.call(this,s,n,c);};};var Tt=y`
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
`;var Xo=new WeakMap,Qo=new WeakMap,Zo=new WeakMap,ns=new WeakSet,Yr=new WeakMap,ft=class{constructor(t,o){this.handleFormData=e=>{let r=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!n&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(c=>{e.formData.append(i,c.toString());}):e.formData.append(i,s.toString()));},this.handleFormSubmit=e=>{var r;let i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=Xo.get(this.form))==null||r.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),Yr.set(this.host,[]);},this.handleInteraction=e=>{let r=Yr.get(this.host);r.includes(e.type)||r.push(e.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let r of e)if(typeof r.checkValidity=="function"&&!r.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let r of e)if(typeof r.reportValidity=="function"&&!r.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=St({form:e=>{let r=e.form;if(r){let s=e.getRootNode().querySelector(`#${r}`);if(s)return s}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var r;return (r=e.disabled)!=null?r:false},reportValidity:e=>typeof e.reportValidity=="function"?e.reportValidity():true,checkValidity:e=>typeof e.checkValidity=="function"?e.checkValidity():true,setValue:(e,r)=>e.value=r,assumeInteractionOn:["sl-input"]},o);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),Yr.set(this.host,[]),this.options.assumeInteractionOn.forEach(o=>{this.host.addEventListener(o,this.handleInteraction);});}hostDisconnected(){this.detachForm(),Yr.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,Xo.has(this.form)?Xo.get(this.form).add(this.host):Xo.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Qo.has(this.form)||(Qo.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Zo.has(this.form)||(Zo.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=Xo.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Qo.has(this.form)&&(this.form.reportValidity=Qo.get(this.form),Qo.delete(this.form)),Zo.has(this.form)&&(this.form.checkValidity=Zo.get(this.form),Zo.delete(this.form)),this.form=void 0));}setUserInteracted(t,o){o?ns.add(t):ns.delete(t),t.requestUpdate();}doAction(t,o){if(this.form){let e=document.createElement("button");e.type=t,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",o&&(e.name=o.name,e.value=o.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{o.hasAttribute(r)&&e.setAttribute(r,o.getAttribute(r));})),this.form.append(e),e.click(),e.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let o=this.host,e=!!ns.has(o),r=!!o.required;o.toggleAttribute("data-required",r),o.toggleAttribute("data-optional",!r),o.toggleAttribute("data-invalid",!t),o.toggleAttribute("data-valid",t),o.toggleAttribute("data-user-invalid",!t&&e),o.toggleAttribute("data-user-valid",t&&e);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let o=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||o.preventDefault(),this.host.dispatchEvent(o)||t?.preventDefault();}},So=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),Kn=Object.freeze(fe(St({},So),{valid:false,valueMissing:true})),Gn=Object.freeze(fe(St({},So),{valid:false,customError:true}));var ct=class{constructor(t,...o){this.slotNames=[],this.handleSlotChange=e=>{let r=e.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=o;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let o=t;if(o.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!o.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function Yn(t){if(!t)return "";let o=t.assignedNodes({flatten:true}),e="";return [...o].forEach(r=>{r.nodeType===Node.TEXT_NODE&&(e+=r.textContent);}),e}var Xn=y`
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
`;function A(t,o){let e=St({waitUntilFirstUpdate:false},o);return (r,i)=>{let{update:s}=r,n=Array.isArray(t)?t:[t];r.update=function(c){n.forEach(a=>{let h=a;if(c.has(h)){let m=c.get(h),d=this[h];m!==d&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[i](m,d);}}),s.call(this,c);};}}var V=y`
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
`;var Xr,L=class extends lt{constructor(){super(),Rn(this,Xr,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,o])=>{this.constructor.define(t,o);});}emit(t,o){let e=new CustomEvent(t,St({bubbles:true,cancelable:false,composed:true,detail:{}},o));return this.dispatchEvent(e),e}static define(t,o=this,e={}){let r=customElements.get(t);if(!r){try{customElements.define(t,o,e);}catch{customElements.define(t,class extends o{},e);}return}let i=" (unknown version)",s=i;"version"in o&&o.version&&(i=" v"+o.version),"version"in r&&r.version&&(s=" v"+r.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,o,e){In(this,Xr)||(this.constructor.elementProperties.forEach((r,i)=>{r.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i]);}),zn(this,Xr,true)),super.attributeChangedCallback(t,o,e);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((o,e)=>{t.has(e)&&this[e]==null&&(this[e]=o);});}};Xr=new WeakMap;L.version="2.20.1";L.dependencies={};l([p()],L.prototype,"dir",2);l([p()],L.prototype,"lang",2);var Jo=Symbol(),Qr=Symbol(),as,ls=new Map,q=class extends L{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,o){var e;let r;if(o?.spriteSheet)return this.svg=u`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Jo:Qr}catch{return Qr}try{let i=document.createElement("div");i.innerHTML=await r.text();let s=i.firstElementChild;if(((e=s?.tagName)==null?void 0:e.toLowerCase())!=="svg")return Jo;as||(as=new DOMParser);let c=as.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return c?(c.part.add("svg"),document.adoptNode(c)):Jo}catch{return Jo}}connectedCallback(){super.connectedCallback(),Qi(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),Zi(this);}getIconSource(){let t=go(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:o,fromLibrary:e}=this.getIconSource(),r=e?go(this.library):void 0;if(!o){this.svg=null;return}let i=ls.get(o);if(i||(i=this.resolveIcon(o,r),ls.set(o,i)),!this.initialRender)return;let s=await i;if(s===Qr&&ls.delete(o),o===this.getIconSource().url){if(Hn(s)){if(this.svg=s,r){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof r.mutator=="function"&&n&&r.mutator(n);}return}switch(s){case Qr:case Jo:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=r?.mutator)==null||t.call(r,this.svg),this.emit("sl-load");}}}render(){return this.svg}};q.styles=[V,Xn];l([k()],q.prototype,"svg",2);l([p({reflect:true})],q.prototype,"name",2);l([p()],q.prototype,"src",2);l([p()],q.prototype,"label",2);l([p({reflect:true})],q.prototype,"library",2);l([A("label")],q.prototype,"handleLabelChange",1);l([A(["name","src","library"])],q.prototype,"setIcon",1);var z=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((o=>t[o])).join(" ")+" "}update(t,[o]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in o)o[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(o)}let e=t.element.classList;for(let r of this.st)r in o||(e.remove(r),this.st.delete(r));for(let r in o){let i=!!o[r];i===this.st.has(r)||this.nt?.has(r)||(i?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)));}return at}});var Ct=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.PROPERTY&&t.type!==yt.ATTRIBUTE&&t.type!==yt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!qr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[o]){if(o===at||o===Y)return o;let e=t.element,r=t.name;if(t.type===yt.PROPERTY){if(o===e[r])return at}else if(t.type===yt.BOOLEAN_ATTRIBUTE){if(!!o===e.hasAttribute(r))return at}else if(t.type===yt.ATTRIBUTE&&e.getAttribute(r)===o+"")return at;return Kr(t),o}});var it=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,o)=>t.checked=o}),this.hasSlotController=new ct(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),o=this.helpText?true:!!t;return u`
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
            value=${w(this.value)}
            .indeterminate=${Ct(this.indeterminate)}
            .checked=${Ct(this.checked)}
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
          aria-hidden=${o?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};it.styles=[V,Tt,qn];it.dependencies={"sl-icon":q};l([$('input[type="checkbox"]')],it.prototype,"input",2);l([k()],it.prototype,"hasFocus",2);l([p()],it.prototype,"title",2);l([p()],it.prototype,"name",2);l([p()],it.prototype,"value",2);l([p({reflect:true})],it.prototype,"size",2);l([p({type:Boolean,reflect:true})],it.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],it.prototype,"checked",2);l([p({type:Boolean,reflect:true})],it.prototype,"indeterminate",2);l([Ht("checked")],it.prototype,"defaultChecked",2);l([p({reflect:true})],it.prototype,"form",2);l([p({type:Boolean,reflect:true})],it.prototype,"required",2);l([p({attribute:"help-text"})],it.prototype,"helpText",2);l([A("disabled",{waitUntilFirstUpdate:true})],it.prototype,"handleDisabledChange",1);l([A(["checked","indeterminate"],{waitUntilFirstUpdate:true})],it.prototype,"handleStateChange",1);it.define("sl-checkbox");exports.AutoFieldCheckbox=class tr extends R{renderInput(){return u`
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
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let o=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof o=="boolean"?"":o}}renderView(){return u` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `}};exports.AutoFieldCheckbox.styles=[R.styles,y`
            sl-checkbox.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=v([T("auto-field-checkbox")],exports.AutoFieldCheckbox);var Qn=y`
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
`;var te=class extends L{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return u`
      <span
        part="base"
        class=${z({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?u` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};te.styles=[V,Qn];te.dependencies={"sl-icon":q};l([k()],te.prototype,"checked",2);l([k()],te.prototype,"hasFocus",2);l([p()],te.prototype,"value",2);l([p({reflect:true})],te.prototype,"size",2);l([p({type:Boolean,reflect:true})],te.prototype,"disabled",2);l([A("checked")],te.prototype,"handleCheckedChange",1);l([A("disabled",{waitUntilFirstUpdate:true})],te.prototype,"handleDisabledChange",1);te.define("sl-radio");var Zn=y`
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
`;var Jn=y`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var Oe=class extends L{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let o=er(t.target);o?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let o=er(t.target);o?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let o=er(t.target);o?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let o=er(t.target);o?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(o=>{let e=t.indexOf(o),r=er(o);r&&(r.toggleAttribute("data-sl-button-group__button",true),r.toggleAttribute("data-sl-button-group__button--first",e===0),r.toggleAttribute("data-sl-button-group__button--inner",e>0&&e<t.length-1),r.toggleAttribute("data-sl-button-group__button--last",e===t.length-1),r.toggleAttribute("data-sl-button-group__button--radio",r.tagName.toLowerCase()==="sl-radio-button"));});}render(){return u`
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
    `}};Oe.styles=[V,Jn];l([$("slot")],Oe.prototype,"defaultSlot",2);l([k()],Oe.prototype,"disableRole",2);l([p()],Oe.prototype,"label",2);function er(t){var o;let e="sl-button, sl-radio-button";return (o=t.closest(e))!=null?o:t.querySelector(e)}var gt=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this),this.hasSlotController=new ct(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Gn:t?Kn:So}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let o=t.target.closest("sl-radio, sl-radio-button"),e=this.getAllRadios(),r=this.value;!o||o.disabled||(this.value=o.value,e.forEach(i=>i.checked=i===o),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var o;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let e=this.getAllRadios().filter(c=>!c.disabled),r=(o=e.find(c=>c.checked))!=null?o:e[0],i=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=e.indexOf(r)+i;n<0&&(n=e.length-1),n>e.length-1&&(n=0),this.getAllRadios().forEach(c=>{c.checked=false,this.hasButtonGroup||c.setAttribute("tabindex","-1");}),this.value=e[n].value,e[n].checked=true,this.hasButtonGroup?e[n].shadowRoot.querySelector("button").focus():(e[n].setAttribute("tabindex","0"),e[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,o;let e=this.getAllRadios();if(await Promise.all(e.map(async r=>{await r.updateComplete,r.checked=r.value===this.value,r.size=this.size;})),this.hasButtonGroup=e.some(r=>r.tagName.toLowerCase()==="sl-radio-button"),e.length>0&&!e.some(r=>r.checked))if(this.hasButtonGroup){let r=(t=e[0].shadowRoot)==null?void 0:t.querySelector("button");r&&r.setAttribute("tabindex","0");}else e[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let r=(o=this.shadowRoot)==null?void 0:o.querySelector("sl-button-group");r&&(r.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(o=>o.checked=o.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,o=this.customValidityMessage!=="";return t||o?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let o=this.getAllRadios(),e=o.find(s=>s.checked),r=o.find(s=>!s.disabled),i=e||r;i&&i.focus(t);}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o,i=u`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return u`
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

          ${this.hasButtonGroup?u`
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
    `}};gt.styles=[V,Tt,Zn];gt.dependencies={"sl-button-group":Oe};l([$("slot:not([name])")],gt.prototype,"defaultSlot",2);l([$(".radio-group__validation-input")],gt.prototype,"validationInput",2);l([k()],gt.prototype,"hasButtonGroup",2);l([k()],gt.prototype,"errorMessage",2);l([k()],gt.prototype,"defaultValue",2);l([p()],gt.prototype,"label",2);l([p({attribute:"help-text"})],gt.prototype,"helpText",2);l([p()],gt.prototype,"name",2);l([p({reflect:true})],gt.prototype,"value",2);l([p({reflect:true})],gt.prototype,"size",2);l([p({reflect:true})],gt.prototype,"form",2);l([p({type:Boolean,reflect:true})],gt.prototype,"required",2);l([A("size",{waitUntilFirstUpdate:true})],gt.prototype,"handleSizeChange",1);l([A("value")],gt.prototype,"handleValueChange",1);gt.define("sl-radio-group");exports.AutoFieldRadio=class or extends R{getInitialOptions(){return {card:false,select:[],valueKey:"value"}}renderOptionItemWithCard(o,e){if(this.options.card){let r=e[this.options.valueKey]||e.label,i=this.value===r;return u`<div
                class="card"
                style=${J({width:this.options.itemWidth})}
            >
                <div class="body ${i?"selected":""}">
                    <sl-icon class="icon" name="settings"></sl-icon>
                    ${o}
                </div>
            </div>`}else return o}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(o){let e=o[this.options.valueKey]||o.label;return u`<sl-radio
            value="${e}"
            style=${J({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
            >${o.label}<br /><span class="memo">${o.tips}</span></sl-radio
        >`}renderInput(){let o=this.options.select.map(e=>{let r={};return typeof e=="object"?Object.assign(r,e):Object.assign(r,{label:e}),r});return u`
            <sl-radio-group class="value" name=${this.name} value="${this.value}" size="${this.context.size}" @sl-change=${this.onRadioChange.bind(this)}>
                ${o.map(e=>this.renderOptionItemWithCard(this.renderOptionItem(e),e))}
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
        `],exports.AutoFieldRadio=v([T("auto-field-radio")],exports.AutoFieldRadio);var ta=y`
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
`;var K=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ct(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,o,e="none"){this.input.setSelectionRange(t,o,e);}setRangeText(t,o,e,r="preserve"){let i=o??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o;return u`
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
              name=${w(this.name)}
              .value=${Ct(this.value)}
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
    `}};K.styles=[V,Tt,ta];l([$(".textarea__control")],K.prototype,"input",2);l([$(".textarea__size-adjuster")],K.prototype,"sizeAdjuster",2);l([k()],K.prototype,"hasFocus",2);l([p()],K.prototype,"title",2);l([p()],K.prototype,"name",2);l([p()],K.prototype,"value",2);l([p({reflect:true})],K.prototype,"size",2);l([p({type:Boolean,reflect:true})],K.prototype,"filled",2);l([p()],K.prototype,"label",2);l([p({attribute:"help-text"})],K.prototype,"helpText",2);l([p()],K.prototype,"placeholder",2);l([p({type:Number})],K.prototype,"rows",2);l([p()],K.prototype,"resize",2);l([p({type:Boolean,reflect:true})],K.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],K.prototype,"readonly",2);l([p({reflect:true})],K.prototype,"form",2);l([p({type:Boolean,reflect:true})],K.prototype,"required",2);l([p({type:Number})],K.prototype,"minlength",2);l([p({type:Number})],K.prototype,"maxlength",2);l([p()],K.prototype,"autocapitalize",2);l([p()],K.prototype,"autocorrect",2);l([p()],K.prototype,"autocomplete",2);l([p({type:Boolean})],K.prototype,"autofocus",2);l([p()],K.prototype,"enterkeyhint",2);l([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],K.prototype,"spellcheck",2);l([p()],K.prototype,"inputmode",2);l([Ht()],K.prototype,"defaultValue",2);l([A("disabled",{waitUntilFirstUpdate:true})],K.prototype,"handleDisabledChange",1);l([A("rows",{waitUntilFirstUpdate:true})],K.prototype,"handleRowsChange",1);l([A("value",{waitUntilFirstUpdate:true})],K.prototype,"handleValueChange",1);K.define("sl-textarea");exports.AutoFieldTextArea=class rr extends R{renderInput(){return u`
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
        `],exports.AutoFieldTextArea=v([T("auto-field-textarea")],exports.AutoFieldTextArea);var ea=y`
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
`;var xt=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,o)=>t.checked=o}),this.hasSlotController=new ct(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),o=this.helpText?true:!!t;return u`
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
            value=${w(this.value)}
            .checked=${Ct(this.checked)}
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
    `}};xt.styles=[V,Tt,ea];l([$('input[type="checkbox"]')],xt.prototype,"input",2);l([k()],xt.prototype,"hasFocus",2);l([p()],xt.prototype,"title",2);l([p()],xt.prototype,"name",2);l([p()],xt.prototype,"value",2);l([p({reflect:true})],xt.prototype,"size",2);l([p({type:Boolean,reflect:true})],xt.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],xt.prototype,"checked",2);l([Ht("checked")],xt.prototype,"defaultChecked",2);l([p({reflect:true})],xt.prototype,"form",2);l([p({type:Boolean,reflect:true})],xt.prototype,"required",2);l([p({attribute:"help-text"})],xt.prototype,"helpText",2);l([A("checked",{waitUntilFirstUpdate:true})],xt.prototype,"handleCheckedChange",1);l([A("disabled",{waitUntilFirstUpdate:true})],xt.prototype,"handleDisabledChange",1);xt.define("sl-switch");exports.AutoFieldSwitch=class ir extends R{renderInput(){return u`
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
        `}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let o=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof o=="boolean"?"":o}}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return u` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `}};exports.AutoFieldSwitch.styles=[R.styles,y`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=v([T("auto-field-switch")],exports.AutoFieldSwitch);var Zr=y`
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
`;var oa=y`
  ${Zr}

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
`;var ia=Symbol.for(""),Vc=t=>{if(t?.r===ia)return t?._$litStatic$};var Co=(t,...o)=>({_$litStatic$:o.reduce(((e,r,i)=>e+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1]),t[0]),r:ia}),ra=new Map,cs=t=>(o,...e)=>{let r=e.length,i,s,n=[],c=[],a,h=0,m=false;for(;h<r;){for(a=o[h];h<r&&(s=e[h],(i=Vc(s))!==void 0);)a+=i+o[++h],m=true;h!==r&&c.push(s),n.push(a),h++;}if(h===r&&n.push(o[r]),m){let d=n.join("$$lit$$");(o=ra.get(d))===void 0&&(n.raw=n,ra.set(d,o=n)),e=c;}return t(o,...e)},Te=cs(u);var Bt=class extends L{constructor(){super(...arguments),this.hasSlotController=new ct(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return Te`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${z({button:true,"button--default":true,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":true,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
    `}};Bt.styles=[V,oa];l([$(".button")],Bt.prototype,"input",2);l([$(".hidden-input")],Bt.prototype,"hiddenInput",2);l([k()],Bt.prototype,"hasFocus",2);l([p({type:Boolean,reflect:true})],Bt.prototype,"checked",2);l([p()],Bt.prototype,"value",2);l([p({type:Boolean,reflect:true})],Bt.prototype,"disabled",2);l([p({reflect:true})],Bt.prototype,"size",2);l([p({type:Boolean,reflect:true})],Bt.prototype,"pill",2);l([A("disabled",{waitUntilFirstUpdate:true})],Bt.prototype,"handleDisabledChange",1);Bt.define("sl-radio-button");exports.AutoFieldRadioButton=class sr extends R{getInitialOptions(){return {valueKey:"value"}}renderRadioItem(o){let e=o[this.options.valueKey];return u`<sl-radio-button value="${e}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${o.label}</sl-radio-button>`}renderInput(){let o=this.getOptionValue("select",[]).map((e,r)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{label:e,value:r+1}),i});return u`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${o.map(e=>this.renderRadioItem(e))}
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
        `],exports.AutoFieldRadioButton=v([T("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class Jr extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=v([T("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class ti extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=v([T("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class ei extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=v([T("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class oi extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=v([T("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class ri extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();let o=this.context.store.schemas.getValidator(this.path);(!o||typeof o.validate!="function")&&this.context.store.schemas.addValidator(this.path,{validate:e=>this._isEmail(e),message:"\u65E0\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740",onFail:"throw-pass"});}_isEmail(o){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(o)}};exports.AutoFieldEmail=v([T("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class ii extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=v([T("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class si extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=v([T("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class ni extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=v([T("auto-field-phone")],exports.AutoFieldPhone);var ai=class{constructor(o,e){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=o,this.options={...this.options,...e},o.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(o){let e=o.target;if(this.isPreviewActive){this.closePreview();return}e.matches(this.options.selector)&&(o.preventDefault(),o.stopPropagation(),this.originalImage=e,this.showPreview(this.originalImage));}showPreview(o){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let e=this.options.overlayColor,r=this.hexToRgb(e);this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=o.src,this.previewImage.alt=o.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let i=o.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",this.closePreview.bind(this)),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${r.r}, ${r.g}, ${r.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:c,height:a}=this.calculateAspectRatioFit(o.naturalWidth,o.naturalHeight,s*.9,n*.9),h=(n-a)/2,m=(s-c)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${h}px`,this.previewImage.style.left=`${m}px`,this.previewImage.style.width=`${c}px`,this.previewImage.style.height=`${a}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let o=window.innerWidth,e=window.innerHeight,{width:r,height:i}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,o*.9,e*.9),s=(e-i)/2,n=(o-r)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${r}px`,this.previewImage.style.height=`${i}px`);});}handleKeydown(o){o.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let o=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${o.top}px`,this.previewImage.style.left=`${o.left}px`,this.previewImage.style.width=`${o.width}px`,this.previewImage.style.height=`${o.height}px`;});let e=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${e.r}, ${e.g}, ${e.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(o,e,r,i){if(o<=r&&e<=i)return {width:o,height:e};let s=Math.min(r/o,i/e);return {width:o*s,height:e*s}}hexToRgb(o){o=o.replace(/^#/,""),o.length===3&&(o=o.split("").map(s=>s+s).join(""));let e=parseInt(o.substring(0,2),16),r=parseInt(o.substring(2,4),16),i=parseInt(o.substring(4,6),16);return {r:isNaN(e)?0:e,g:isNaN(r)?0:r,b:isNaN(i)?0:i}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var ps=class{constructor(o,e){for(this.options=Object.assign({width:"8px"},e),this.target=o,this.content=o.firstElementChild,this.direction=window.getComputedStyle(this.target).direction,this.scrollRatio=1,this.bar=null,this.wrapper=document.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=document.createElement("div"),this.el.setAttribute("class","ss-content"),this.direction==="rtl"&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",'<div class="ss-scroll">'),this.bar=this.target.lastChild,this.bar.style.width=this.options.width,this.mB=this.moveBar.bind(this),this.dragDealer(this.bar),this.moveBar(),window.addEventListener("resize",this.mB),this.el.addEventListener("scroll",this.mB),this.el.addEventListener("mouseenter",this.mB),this.target.classList.add("ss-container");let r=window.getComputedStyle(o);r.height==="0px"&&r["max-height"]!=="0px"&&(o.style.height=r["max-height"]);}dragDealer(o){let e,r=n=>{let c=n.pageY-e;e=n.pageY,this.requestAnimationFrame(()=>{this.el&&(this.el.scrollTop+=c/this.scrollRatio);});},i=()=>{o.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",i);},s=n=>(e=n.pageY,o.classList.add("ss-grabbed"),document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",r),document.addEventListener("mouseup",i),false);o.mouseDownHandler=s,o.addEventListener("mousedown",s);}requestAnimationFrame(o){window.requestAnimationFrame?window.requestAnimationFrame(o):window.setTimeout(o,0);}moveBar(){if(!this.el||!this.target)return;let o=this.el.scrollHeight,e=this.el.clientHeight;this.scrollRatio=e/o;let i=this.direction==="rtl"&&this.bar?this.target.clientWidth-this.bar.clientWidth+18:this.bar?(this.target.clientWidth-this.bar.clientWidth)*-1:0;this.requestAnimationFrame(()=>{this.scrollRatio>=1?this.bar?.classList.add("ss-hidden"):(this.bar?.classList.remove("ss-hidden"),this.bar&&(this.bar.style.cssText="height:"+Math.max(this.scrollRatio*100,10)+"%; top:"+this.el.scrollTop/o*100+"%;right:"+i+"px;"));});}destroy(){if(window.removeEventListener("resize",this.mB),this.el&&(this.el.removeEventListener("scroll",this.mB),this.el.removeEventListener("mouseenter",this.mB)),this.bar?.mouseDownHandler&&(this.bar.removeEventListener("mousedown",this.bar.mouseDownHandler),delete this.bar.mouseDownHandler),this.target){this.target.classList.remove("ss-container");try{this.content&&this.wrapper&&this.target.insertBefore(this.content,this.wrapper),this.wrapper&&this.target.removeChild(this.wrapper);}catch(o){console.error("Error restoring DOM structure during scrollbar destroy:",o);}if(this.bar){try{this.target.removeChild(this.bar);}catch(o){console.error("Error removing scrollbar during destroy:",o);}this.bar=null;}}this.target=null,this.content=null,this.wrapper=null,this.el=null,this.mB=null;}},Ye=class{constructor(o){this._scrollbars=[];this.host=o,o.addController(this);}static{this.styles=y`
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
    `;}create(o,e){let r=new ps(o,e);return this._scrollbars.push(r),r}hostConnected(){}hostUpdate(){}hostDisconnected(){for(let o of this._scrollbars)o.destroy();this._scrollbars=[];}};var Pc=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],Dc=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function Mc(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return Pc.includes(`.${r}`)}function Fc(t){if(!t||typeof t!="string")return  false;let r=t.split("?")[0].split("/").pop().split(".").pop();return Dc.includes(`.${r}`)}exports.AutoFieldUpload=class ko extends R{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new ai(this);}retryUpload(e){this.startUpload(e.file,e.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:true}}_getDefaultFileLabel(e){return typeof e=="string"?e:e.title||e.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(e=>e!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(e){let r=e.target;if(!r.files||r.files.length===0)return;Array.from(r.files).forEach(s=>this.uploadFile(s)),r.value="";}handleDragOver(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(e){if(e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!e.dataTransfer?.files)return;let i=Array.from(e.dataTransfer.files);if(!this.options?.multiple&&i.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=i.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(c=>c==="*"?true:c.startsWith(".")?n.name.toLowerCase().endsWith(c.toLowerCase()):n.type.startsWith(c)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}i.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(e){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let r={id:this.generateId(),file:e,progress:0,status:"uploading",value:{url:e.name}};return this.files.push(r),this.startUpload(e,r.id)}_updateFileRecord(e,r){let i=this.files.findIndex(s=>s.id===e);i!==-1&&(this.files=[...this.files.slice(0,i),{...this.files[i],...r},...this.files.slice(i+1)]);}_getResponseError(e){let r="\u4E0A\u4F20\u5931\u8D25";try{let i=JSON.parse(e.responseText);r=i.message||i.error||r;}catch{switch(e.status){case 400:r="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:r="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:r="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:r="\u6587\u4EF6\u592A\u5927";break;case 415:r="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:r="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:r="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:r=`\u4E0A\u4F20\u5931\u8D25 (${e.status})`;}}return new Error(r)}_defaultFileResolver(e){if(typeof e=="string")return e;if(typeof e=="object"){if(!e.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return e}}_parseUploadResponse(e){let r={};try{Object.assign(r,JSON.parse(e));}catch{r=e;}return typeof this.options.onResolve=="function"&&(r=this.options.onResolve(r)),r}async startUpload(e,r){let i=this.files.findIndex(n=>n.id===r);if(i===-1)return;let s=this.files[i];return new Promise((n,c)=>{let a=new XMLHttpRequest,h=new FormData;h.append(this.options.fileFieldName,e),a.upload.onprogress=m=>{if(m.lengthComputable){let d=Math.round(m.loaded/m.total*100);this._updateFileRecord(r,{progress:d});}},a.onload=()=>{if(this.files.findIndex(d=>d.id===r)!==-1)if(a.status>=200&&a.status<300){this._updateFileRecord(r,{status:"done"});try{let d=this._parseUploadResponse(a.responseText);this._updateFileRecord(r,{value:d}),s.status="done",this.onFieldChange(),n();}catch{let d=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(r,d),c(d);}}else {let d=this._getResponseError(a);this.handleUploadError(r,d),c(d);}},a.onerror=()=>{if(this.files.findIndex(f=>f.id===r)===-1)return;let d=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(r,d),c(d);},a.ontimeout=()=>{if(this.files.findIndex(f=>f.id===r)===-1)return;let d=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(r,d),c(d);},a.open("POST",this.options.url),this._updateFileRecord(r,{progress:0,status:"uploading"}),a.send(h);})}handleUploadError(e,r){this._updateFileRecord(e,{error:r.message,status:"error"});}deleteFile(e){let r=this.files.findIndex(c=>c.id===e);if(r===-1)return;let i=this.files[r],s=i.status==="uploading"||i.status==="error",n=()=>{this.files=[...this.files.slice(0,r),...this.files.slice(r+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,i.value)).then(()=>{n(),this.onFieldChange();}).catch(c=>{alert(c.message);}):(n(),this.onFieldChange());}getInputValue(){if(this.options.multiple){let e=this.files.map(r=>r.value);return this.options.onlyFileUrl?e.map(r=>typeof r=="object"?r.url:r):e}else {let e=this.files.length>0?this.files[0].value:void 0;if(e)return this.options.onlyFileUrl&&typeof e=="object"?e.url:e}}getStateValue(){let e=super.getStateValue();return Array.isArray(e)||(e=[e]),this.files=e.map((r,i)=>{let s={id:String(i),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof r=="string"?s.value=r:typeof r=="object"&&(s.value=Object.assign({},s.value,r)),s}),e}renderProgressbar(e,r){if(e.status!=="uploading")return;let i=r==="hori"?`width:${e.progress}%;`:`height:${e.progress}%;top:${100-e.progress}%`;return u`<span
            class="uploading progressbar ${z({hori:r==="hori",vert:r==="vert"})}"
            style="${i}"
        >
            <span class="value">${e.progress}%</span>
        </span> `}renderFileContent(e){if(e.error)return;let r=typeof e.value=="string"?e.value:e.value.url,i;if(Mc(r))i=u` <img class="content" src="${r}" /> `;else if(Fc(r))i=u` <video class="content" src="${r}"></video> `;else {let s=r.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,i=u`<div class="content">${s}</div>`;}return i}renderFilePreview(e){let r=!!e.error,i=typeof this.options.preview=="boolean"?"80px":this.options.preview;return u`
            <div
                class="file preview ${z({error:r})}"
                title=${e.error||this.options.onFileLabel(e.value)}
                style="${J({width:i,height:i})}"
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
            <auto-flex class="file default ${z({error:r})}" wrap align="center" gap="0.5rem" title=${w(e.error)}>
                ${this.renderProgressbar(e,"hori")}
                <span class="label">${this.options.onFileLabel(e.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                ${B(e.status==="error",()=>u`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>`)}
            </auto-flex>
        `}renderFiels(){return u`<auto-flex class="files" grow="none" gap="0.5rem" wrap>
            ${B(this.files.length>0,()=>tt(this.files,e=>this.options.preview?this.renderFilePreview(e):this.renderFile(e)),()=>u`<span class="placeholder">${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
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
        `],v([k()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=v([T("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class li extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=v([T("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class nr extends R{getInitialOptions(){return {size:"medium"}}_onPartFocus(o){o.target.select();}_getIpBits(){let o=this.value?.split(".");return [parseInt(o[0]||"0"),parseInt(o[1]||"0"),parseInt(o[2]||"0"),parseInt(o[3]||"0")]}_onIpChange(o,e){this.onFieldChange(),this._isLastInput(e);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(e=>e.value).join(".")}_isLastInput(o){let e=o.target;if(e.value.length>=3){e.blur();let r=e.nextElementSibling?.nextElementSibling;r&&(r.focus(),r.select());}}_onPaste(o){o.preventDefault();let e=o.target,r=o.clipboardData?.getData("text/plain")||"",i=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=r.match(i);if(!s)return;let n=[],c=e;for(let a=0;a<4&&c;a++)c.tagName==="SL-INPUT"&&n.push(c),c=c.nextElementSibling?.nextElementSibling;for(let a=0;a<Math.min(4,n.length);a++)n[a].value=s[a+1],n[a].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let a=n[Math.min(3,n.length-1)];a.focus(),a.select();}}renderInput(){return u`
            <auto-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((o,e)=>u`
                        <sl-input
                            value="${o}"
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
        `],exports.AutoFieldIpAddress=v([T("auto-field-ipaddress")],exports.AutoFieldIpAddress);var sa=y`
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
`;var na=y`
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
`;var pt=class extends L{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,o=t?Co`a`:Co`button`;return Te`
      <${o}
        part="base"
        class=${z({"icon-button":true,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
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
      </${o}>
    `}};pt.styles=[V,na];pt.dependencies={"sl-icon":q};l([$(".icon-button")],pt.prototype,"button",2);l([k()],pt.prototype,"hasFocus",2);l([p()],pt.prototype,"name",2);l([p()],pt.prototype,"library",2);l([p()],pt.prototype,"src",2);l([p()],pt.prototype,"href",2);l([p()],pt.prototype,"target",2);l([p()],pt.prototype,"download",2);l([p()],pt.prototype,"label",2);l([p({type:Boolean,reflect:true})],pt.prototype,"disabled",2);var ds=new Set,$o=new Map,Xe,hs="ltr",us="en",aa=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(aa){let t=new MutationObserver(la);hs=document.documentElement.dir||"ltr",us=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function ar(...t){t.map(o=>{let e=o.$code.toLowerCase();$o.has(e)?$o.set(e,Object.assign(Object.assign({},$o.get(e)),o)):$o.set(e,o),Xe||(Xe=o);}),la();}function la(){aa&&(hs=document.documentElement.dir||"ltr",us=document.documentElement.lang||navigator.language),[...ds.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var ci=class{constructor(o){this.host=o,this.host.addController(this);}hostConnected(){ds.add(this.host);}hostDisconnected(){ds.delete(this.host);}dir(){return `${this.host.dir||hs}`.toLowerCase()}lang(){return `${this.host.lang||us}`.toLowerCase()}getTranslationData(o){var e,r;let i=new Intl.Locale(o.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(r=(e=i?.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&r!==void 0?r:"",c=$o.get(`${s}-${n}`),a=$o.get(s);return {locale:i,language:s,region:n,primary:c,secondary:a}}exists(o,e){var r;let{primary:i,secondary:s}=this.getTranslationData((r=e.lang)!==null&&r!==void 0?r:this.lang());return e=Object.assign({includeFallback:false},e),!!(i&&i[o]||s&&s[o]||e.includeFallback&&Xe&&Xe[o])}term(o,...e){let{primary:r,secondary:i}=this.getTranslationData(this.lang()),s;if(r&&r[o])s=r[o];else if(i&&i[o])s=i[o];else if(Xe&&Xe[o])s=Xe[o];else return console.error(`No translation found for: ${String(o)}`),String(o);return typeof s=="function"?s(...e):s}date(o,e){return o=new Date(o),new Intl.DateTimeFormat(this.lang(),e).format(o)}number(o,e){return o=Number(o),isNaN(o)?"":new Intl.NumberFormat(this.lang(),e).format(o)}relativeTime(o,e,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(o,e)}};var ca={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,o)=>`Go to slide ${t} of ${o}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};ar(ca);var pa=ca;var W=class extends ci{};ar(pa);var ae=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return u`
      <span
        part="base"
        class=${z({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
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
    `}};ae.styles=[V,sa];ae.dependencies={"sl-icon-button":pt};l([p({reflect:true})],ae.prototype,"variant",2);l([p({reflect:true})],ae.prototype,"size",2);l([p({type:Boolean,reflect:true})],ae.prototype,"pill",2);l([p({type:Boolean})],ae.prototype,"removable",2);var da=y`
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
`;function Hc(t,o){return {top:Math.round(t.getBoundingClientRect().top-o.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-o.getBoundingClientRect().left)}}function lr(t,o,e="vertical",r="smooth"){let i=Hc(t,o),s=i.top+o.scrollTop,n=i.left+o.scrollLeft,c=o.scrollLeft,a=o.scrollLeft+o.offsetWidth,h=o.scrollTop,m=o.scrollTop+o.offsetHeight;(e==="horizontal"||e==="both")&&(n<c?o.scrollTo({left:n,behavior:r}):n+t.clientWidth>a&&o.scrollTo({left:n-o.offsetWidth+t.clientWidth,behavior:r})),(e==="vertical"||e==="both")&&(s<h?o.scrollTo({top:s,behavior:r}):s+t.clientHeight>m&&o.scrollTo({top:s-o.offsetHeight+t.clientHeight,behavior:r}));}var ha=y`
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
`;var le=Math.min,kt=Math.max,pr=Math.round,dr=Math.floor,ee=t=>({x:t,y:t}),Bc={left:"right",right:"left",bottom:"top",top:"bottom"},Wc={start:"end",end:"start"};function di(t,o,e){return kt(t,le(o,e))}function Qe(t,o){return typeof t=="function"?t(o):t}function ge(t){return t.split("-")[0]}function Ze(t){return t.split("-")[1]}function ms(t){return t==="x"?"y":"x"}function hi(t){return t==="y"?"height":"width"}var jc=new Set(["top","bottom"]);function ce(t){return jc.has(ge(t))?"y":"x"}function ui(t){return ms(ce(t))}function fa(t,o,e){e===void 0&&(e=false);let r=Ze(t),i=ui(t),s=hi(i),n=i==="x"?r===(e?"end":"start")?"right":"left":r==="start"?"bottom":"top";return o.reference[s]>o.floating[s]&&(n=cr(n)),[n,cr(n)]}function ga(t){let o=cr(t);return [pi(t),o,pi(o)]}function pi(t){return t.replace(/start|end/g,o=>Wc[o])}var ua=["left","right"],ma=["right","left"],Nc=["top","bottom"],Uc=["bottom","top"];function qc(t,o,e){switch(t){case "top":case "bottom":return e?o?ma:ua:o?ua:ma;case "left":case "right":return o?Nc:Uc;default:return []}}function ba(t,o,e,r){let i=Ze(t),s=qc(ge(t),e==="start",r);return i&&(s=s.map(n=>n+"-"+i),o&&(s=s.concat(s.map(pi)))),s}function cr(t){return t.replace(/left|right|bottom|top/g,o=>Bc[o])}function Kc(t){return {top:0,right:0,bottom:0,left:0,...t}}function fs(t){return typeof t!="number"?Kc(t):{top:t,right:t,bottom:t,left:t}}function Je(t){let{x:o,y:e,width:r,height:i}=t;return {width:r,height:i,top:e,left:o,right:o+r,bottom:e+i,x:o,y:e}}function va(t,o,e){let{reference:r,floating:i}=t,s=ce(o),n=ui(o),c=hi(n),a=ge(o),h=s==="y",m=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[c]/2-i[c]/2,g;switch(a){case "top":g={x:m,y:r.y-i.height};break;case "bottom":g={x:m,y:r.y+r.height};break;case "right":g={x:r.x+r.width,y:d};break;case "left":g={x:r.x-i.width,y:d};break;default:g={x:r.x,y:r.y};}switch(Ze(o)){case "start":g[n]-=f*(e&&h?-1:1);break;case "end":g[n]+=f*(e&&h?-1:1);break}return g}var ya=async(t,o,e)=>{let{placement:r="bottom",strategy:i="absolute",middleware:s=[],platform:n}=e,c=s.filter(Boolean),a=await(n.isRTL==null?void 0:n.isRTL(o)),h=await n.getElementRects({reference:t,floating:o,strategy:i}),{x:m,y:d}=va(h,r,a),f=r,g={},b=0;for(let x=0;x<c.length;x++){let{name:I,fn:E}=c[x],{x:S,y:O,data:_,reset:C}=await E({x:m,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:g,rects:h,platform:n,elements:{reference:t,floating:o}});m=S??m,d=O??d,g={...g,[I]:{...g[I],..._}},C&&b<=50&&(b++,typeof C=="object"&&(C.placement&&(f=C.placement),C.rects&&(h=C.rects===true?await n.getElementRects({reference:t,floating:o,strategy:i}):C.rects),{x:m,y:d}=va(h,f,a)),x=-1);}return {x:m,y:d,placement:f,strategy:i,middlewareData:g}};async function mi(t,o){var e;o===void 0&&(o={});let{x:r,y:i,platform:s,rects:n,elements:c,strategy:a}=t,{boundary:h="clippingAncestors",rootBoundary:m="viewport",elementContext:d="floating",altBoundary:f=false,padding:g=0}=Qe(o,t),b=fs(g),I=c[f?d==="floating"?"reference":"floating":d],E=Je(await s.getClippingRect({element:(e=await(s.isElement==null?void 0:s.isElement(I)))==null||e?I:I.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:h,rootBoundary:m,strategy:a})),S=d==="floating"?{x:r,y:i,width:n.floating.width,height:n.floating.height}:n.reference,O=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),_=await(s.isElement==null?void 0:s.isElement(O))?await(s.getScale==null?void 0:s.getScale(O))||{x:1,y:1}:{x:1,y:1},C=Je(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:S,offsetParent:O,strategy:a}):S);return {top:(E.top-C.top+b.top)/_.y,bottom:(C.bottom-E.bottom+b.bottom)/_.y,left:(E.left-C.left+b.left)/_.x,right:(C.right-E.right+b.right)/_.x}}var xa=t=>({name:"arrow",options:t,async fn(o){let{x:e,y:r,placement:i,rects:s,platform:n,elements:c,middlewareData:a}=o,{element:h,padding:m=0}=Qe(t,o)||{};if(h==null)return {};let d=fs(m),f={x:e,y:r},g=ui(i),b=hi(g),x=await n.getDimensions(h),I=g==="y",E=I?"top":"left",S=I?"bottom":"right",O=I?"clientHeight":"clientWidth",_=s.reference[b]+s.reference[g]-f[g]-s.floating[b],C=f[g]-s.reference[g],D=await(n.getOffsetParent==null?void 0:n.getOffsetParent(h)),H=D?D[O]:0;(!H||!await(n.isElement==null?void 0:n.isElement(D)))&&(H=c.floating[O]||s.floating[b]);let U=_/2-C/2,M=H/2-x[b]/2-1,P=le(d[E],M),ht=le(d[S],M),st=P,wt=H-x[b]-ht,nt=H/2-x[b]/2+U,Ft=di(st,nt,wt),se=!a.arrow&&Ze(i)!=null&&nt!==Ft&&s.reference[b]/2-(nt<st?P:ht)-x[b]/2<0,Zt=se?nt<st?nt-st:nt-wt:0;return {[g]:f[g]+Zt,data:{[g]:Ft,centerOffset:nt-Ft-Zt,...se&&{alignmentOffset:Zt}},reset:se}}});var _a=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(o){var e,r;let{placement:i,middlewareData:s,rects:n,initialPlacement:c,platform:a,elements:h}=o,{mainAxis:m=true,crossAxis:d=true,fallbackPlacements:f,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=true,...I}=Qe(t,o);if((e=s.arrow)!=null&&e.alignmentOffset)return {};let E=ge(i),S=ce(c),O=ge(c)===c,_=await(a.isRTL==null?void 0:a.isRTL(h.floating)),C=f||(O||!x?[cr(c)]:ga(c)),D=b!=="none";!f&&D&&C.push(...ba(c,x,b,_));let H=[c,...C],U=await mi(o,I),M=[],P=((r=s.flip)==null?void 0:r.overflows)||[];if(m&&M.push(U[E]),d){let nt=fa(i,n,_);M.push(U[nt[0]],U[nt[1]]);}if(P=[...P,{placement:i,overflows:M}],!M.every(nt=>nt<=0)){var ht,st;let nt=(((ht=s.flip)==null?void 0:ht.index)||0)+1,Ft=H[nt];if(Ft&&(!(d==="alignment"?S!==ce(Ft):false)||P.every(Jt=>ce(Jt.placement)===S?Jt.overflows[0]>0:true)))return {data:{index:nt,overflows:P},reset:{placement:Ft}};let se=(st=P.filter(Zt=>Zt.overflows[0]<=0).sort((Zt,Jt)=>Zt.overflows[1]-Jt.overflows[1])[0])==null?void 0:st.placement;if(!se)switch(g){case "bestFit":{var wt;let Zt=(wt=P.filter(Jt=>{if(D){let _e=ce(Jt.placement);return _e===S||_e==="y"}return  true}).map(Jt=>[Jt.placement,Jt.overflows.filter(_e=>_e>0).reduce((_e,ql)=>_e+ql,0)]).sort((Jt,_e)=>Jt[1]-_e[1])[0])==null?void 0:wt[0];Zt&&(se=Zt);break}case "initialPlacement":se=c;break}if(i!==se)return {reset:{placement:se}}}return {}}}};var Gc=new Set(["left","top"]);async function Yc(t,o){let{placement:e,platform:r,elements:i}=t,s=await(r.isRTL==null?void 0:r.isRTL(i.floating)),n=ge(e),c=Ze(e),a=ce(e)==="y",h=Gc.has(n)?-1:1,m=s&&a?-1:1,d=Qe(o,t),{mainAxis:f,crossAxis:g,alignmentAxis:b}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return c&&typeof b=="number"&&(g=c==="end"?b*-1:b),a?{x:g*m,y:f*h}:{x:f*h,y:g*m}}var wa=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(o){var e,r;let{x:i,y:s,placement:n,middlewareData:c}=o,a=await Yc(o,t);return n===((e=c.offset)==null?void 0:e.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:i+a.x,y:s+a.y,data:{...a,placement:n}}}}},Sa=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(o){let{x:e,y:r,placement:i}=o,{mainAxis:s=true,crossAxis:n=false,limiter:c={fn:I=>{let{x:E,y:S}=I;return {x:E,y:S}}},...a}=Qe(t,o),h={x:e,y:r},m=await mi(o,a),d=ce(ge(i)),f=ms(d),g=h[f],b=h[d];if(s){let I=f==="y"?"top":"left",E=f==="y"?"bottom":"right",S=g+m[I],O=g-m[E];g=di(S,g,O);}if(n){let I=d==="y"?"top":"left",E=d==="y"?"bottom":"right",S=b+m[I],O=b-m[E];b=di(S,b,O);}let x=c.fn({...o,[f]:g,[d]:b});return {...x,data:{x:x.x-e,y:x.y-r,enabled:{[f]:s,[d]:n}}}}}};var Ca=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(o){var e,r;let{placement:i,rects:s,platform:n,elements:c}=o,{apply:a=()=>{},...h}=Qe(t,o),m=await mi(o,h),d=ge(i),f=Ze(i),g=ce(i)==="y",{width:b,height:x}=s.floating,I,E;d==="top"||d==="bottom"?(I=d,E=f===(await(n.isRTL==null?void 0:n.isRTL(c.floating))?"start":"end")?"left":"right"):(E=d,I=f==="end"?"top":"bottom");let S=x-m.top-m.bottom,O=b-m.left-m.right,_=le(x-m[I],S),C=le(b-m[E],O),D=!o.middlewareData.shift,H=_,U=C;if((e=o.middlewareData.shift)!=null&&e.enabled.x&&(U=O),(r=o.middlewareData.shift)!=null&&r.enabled.y&&(H=S),D&&!f){let P=kt(m.left,0),ht=kt(m.right,0),st=kt(m.top,0),wt=kt(m.bottom,0);g?U=b-2*(P!==0||ht!==0?P+ht:kt(m.left,m.right)):H=x-2*(st!==0||wt!==0?st+wt:kt(m.top,m.bottom));}await a({...o,availableWidth:U,availableHeight:H});let M=await n.getDimensions(c.floating);return b!==M.width||x!==M.height?{reset:{rects:true}}:{}}}};function fi(){return typeof window<"u"}function to(t){return $a(t)?(t.nodeName||"").toLowerCase():"#document"}function It(t){var o;return (t==null||(o=t.ownerDocument)==null?void 0:o.defaultView)||window}function oe(t){var o;return (o=($a(t)?t.ownerDocument:t.document)||window.document)==null?void 0:o.documentElement}function $a(t){return fi()?t instanceof Node||t instanceof It(t).Node:false}function Wt(t){return fi()?t instanceof Element||t instanceof It(t).Element:false}function re(t){return fi()?t instanceof HTMLElement||t instanceof It(t).HTMLElement:false}function ka(t){return !fi()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof It(t).ShadowRoot}var Xc=new Set(["inline","contents"]);function Ao(t){let{overflow:o,overflowX:e,overflowY:r,display:i}=jt(t);return /auto|scroll|overlay|hidden|clip/.test(o+r+e)&&!Xc.has(i)}var Qc=new Set(["table","td","th"]);function Ea(t){return Qc.has(to(t))}var Zc=[":popover-open",":modal"];function hr(t){return Zc.some(o=>{try{return t.matches(o)}catch{return  false}})}var Jc=["transform","translate","scale","rotate","perspective"],tp=["transform","translate","scale","rotate","perspective","filter"],ep=["paint","layout","strict","content"];function Oo(t){let o=gi(),e=Wt(t)?jt(t):t;return Jc.some(r=>e[r]?e[r]!=="none":false)||(e.containerType?e.containerType!=="normal":false)||!o&&(e.backdropFilter?e.backdropFilter!=="none":false)||!o&&(e.filter?e.filter!=="none":false)||tp.some(r=>(e.willChange||"").includes(r))||ep.some(r=>(e.contain||"").includes(r))}function Aa(t){let o=be(t);for(;re(o)&&!eo(o);){if(Oo(o))return o;if(hr(o))return null;o=be(o);}return null}function gi(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}var op=new Set(["html","body","#document"]);function eo(t){return op.has(to(t))}function jt(t){return It(t).getComputedStyle(t)}function ur(t){return Wt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function be(t){if(to(t)==="html")return t;let o=t.assignedSlot||t.parentNode||ka(t)&&t.host||oe(t);return ka(o)?o.host:o}function Oa(t){let o=be(t);return eo(o)?t.ownerDocument?t.ownerDocument.body:t.body:re(o)&&Ao(o)?o:Oa(o)}function Eo(t,o,e){var r;o===void 0&&(o=[]),e===void 0&&(e=true);let i=Oa(t),s=i===((r=t.ownerDocument)==null?void 0:r.body),n=It(i);if(s){let c=bi(n);return o.concat(n,n.visualViewport||[],Ao(i)?i:[],c&&e?Eo(c):[])}return o.concat(i,Eo(i,[],e))}function bi(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function za(t){let o=jt(t),e=parseFloat(o.width)||0,r=parseFloat(o.height)||0,i=re(t),s=i?t.offsetWidth:e,n=i?t.offsetHeight:r,c=pr(e)!==s||pr(r)!==n;return c&&(e=s,r=n),{width:e,height:r,$:c}}function bs(t){return Wt(t)?t:t.contextElement}function To(t){let o=bs(t);if(!re(o))return ee(1);let e=o.getBoundingClientRect(),{width:r,height:i,$:s}=za(o),n=(s?pr(e.width):e.width)/r,c=(s?pr(e.height):e.height)/i;return (!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}var rp=ee(0);function La(t){let o=It(t);return !gi()||!o.visualViewport?rp:{x:o.visualViewport.offsetLeft,y:o.visualViewport.offsetTop}}function ip(t,o,e){return o===void 0&&(o=false),!e||o&&e!==It(t)?false:o}function oo(t,o,e,r){o===void 0&&(o=false),e===void 0&&(e=false);let i=t.getBoundingClientRect(),s=bs(t),n=ee(1);o&&(r?Wt(r)&&(n=To(r)):n=To(t));let c=ip(s,e,r)?La(s):ee(0),a=(i.left+c.x)/n.x,h=(i.top+c.y)/n.y,m=i.width/n.x,d=i.height/n.y;if(s){let f=It(s),g=r&&Wt(r)?It(r):r,b=f,x=bi(b);for(;x&&r&&g!==b;){let I=To(x),E=x.getBoundingClientRect(),S=jt(x),O=E.left+(x.clientLeft+parseFloat(S.paddingLeft))*I.x,_=E.top+(x.clientTop+parseFloat(S.paddingTop))*I.y;a*=I.x,h*=I.y,m*=I.x,d*=I.y,a+=O,h+=_,b=It(x),x=bi(b);}}return Je({width:m,height:d,x:a,y:h})}function vi(t,o){let e=ur(t).scrollLeft;return o?o.left+e:oo(oe(t)).left+e}function Va(t,o){let e=t.getBoundingClientRect(),r=e.left+o.scrollLeft-vi(t,e),i=e.top+o.scrollTop;return {x:r,y:i}}function sp(t){let{elements:o,rect:e,offsetParent:r,strategy:i}=t,s=i==="fixed",n=oe(r),c=o?hr(o.floating):false;if(r===n||c&&s)return e;let a={scrollLeft:0,scrollTop:0},h=ee(1),m=ee(0),d=re(r);if((d||!d&&!s)&&((to(r)!=="body"||Ao(n))&&(a=ur(r)),re(r))){let g=oo(r);h=To(r),m.x=g.x+r.clientLeft,m.y=g.y+r.clientTop;}let f=n&&!d&&!s?Va(n,a):ee(0);return {width:e.width*h.x,height:e.height*h.y,x:e.x*h.x-a.scrollLeft*h.x+m.x+f.x,y:e.y*h.y-a.scrollTop*h.y+m.y+f.y}}function np(t){return Array.from(t.getClientRects())}function ap(t){let o=oe(t),e=ur(t),r=t.ownerDocument.body,i=kt(o.scrollWidth,o.clientWidth,r.scrollWidth,r.clientWidth),s=kt(o.scrollHeight,o.clientHeight,r.scrollHeight,r.clientHeight),n=-e.scrollLeft+vi(t),c=-e.scrollTop;return jt(r).direction==="rtl"&&(n+=kt(o.clientWidth,r.clientWidth)-i),{width:i,height:s,x:n,y:c}}var Ta=25;function lp(t,o){let e=It(t),r=oe(t),i=e.visualViewport,s=r.clientWidth,n=r.clientHeight,c=0,a=0;if(i){s=i.width,n=i.height;let m=gi();(!m||m&&o==="fixed")&&(c=i.offsetLeft,a=i.offsetTop);}let h=vi(r);if(h<=0){let m=r.ownerDocument,d=m.body,f=getComputedStyle(d),g=m.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(r.clientWidth-d.clientWidth-g);b<=Ta&&(s-=b);}else h<=Ta&&(s+=h);return {width:s,height:n,x:c,y:a}}var cp=new Set(["absolute","fixed"]);function pp(t,o){let e=oo(t,true,o==="fixed"),r=e.top+t.clientTop,i=e.left+t.clientLeft,s=re(t)?To(t):ee(1),n=t.clientWidth*s.x,c=t.clientHeight*s.y,a=i*s.x,h=r*s.y;return {width:n,height:c,x:a,y:h}}function Ia(t,o,e){let r;if(o==="viewport")r=lp(t,e);else if(o==="document")r=ap(oe(t));else if(Wt(o))r=pp(o,e);else {let i=La(t);r={x:o.x-i.x,y:o.y-i.y,width:o.width,height:o.height};}return Je(r)}function Pa(t,o){let e=be(t);return e===o||!Wt(e)||eo(e)?false:jt(e).position==="fixed"||Pa(e,o)}function dp(t,o){let e=o.get(t);if(e)return e;let r=Eo(t,[],false).filter(c=>Wt(c)&&to(c)!=="body"),i=null,s=jt(t).position==="fixed",n=s?be(t):t;for(;Wt(n)&&!eo(n);){let c=jt(n),a=Oo(n);!a&&c.position==="fixed"&&(i=null),(s?!a&&!i:!a&&c.position==="static"&&!!i&&cp.has(i.position)||Ao(n)&&!a&&Pa(t,n))?r=r.filter(m=>m!==n):i=c,n=be(n);}return o.set(t,r),r}function hp(t){let{element:o,boundary:e,rootBoundary:r,strategy:i}=t,n=[...e==="clippingAncestors"?hr(o)?[]:dp(o,this._c):[].concat(e),r],c=n[0],a=n.reduce((h,m)=>{let d=Ia(o,m,i);return h.top=kt(d.top,h.top),h.right=le(d.right,h.right),h.bottom=le(d.bottom,h.bottom),h.left=kt(d.left,h.left),h},Ia(o,c,i));return {width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function up(t){let{width:o,height:e}=za(t);return {width:o,height:e}}function mp(t,o,e){let r=re(o),i=oe(o),s=e==="fixed",n=oo(t,true,s,o),c={scrollLeft:0,scrollTop:0},a=ee(0);function h(){a.x=vi(i);}if(r||!r&&!s)if((to(o)!=="body"||Ao(i))&&(c=ur(o)),r){let g=oo(o,true,s,o);a.x=g.x+o.clientLeft,a.y=g.y+o.clientTop;}else i&&h();s&&!r&&i&&h();let m=i&&!r&&!s?Va(i,c):ee(0),d=n.left+c.scrollLeft-a.x-m.x,f=n.top+c.scrollTop-a.y-m.y;return {x:d,y:f,width:n.width,height:n.height}}function gs(t){return jt(t).position==="static"}function Ra(t,o){if(!re(t)||jt(t).position==="fixed")return null;if(o)return o(t);let e=t.offsetParent;return oe(t)===e&&(e=e.ownerDocument.body),e}function Da(t,o){let e=It(t);if(hr(t))return e;if(!re(t)){let i=be(t);for(;i&&!eo(i);){if(Wt(i)&&!gs(i))return i;i=be(i);}return e}let r=Ra(t,o);for(;r&&Ea(r)&&gs(r);)r=Ra(r,o);return r&&eo(r)&&gs(r)&&!Oo(r)?e:r||Aa(t)||e}var fp=async function(t){let o=this.getOffsetParent||Da,e=this.getDimensions,r=await e(t.floating);return {reference:mp(t.reference,await o(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function gp(t){return jt(t).direction==="rtl"}var mr={convertOffsetParentRelativeRectToViewportRelativeRect:sp,getDocumentElement:oe,getClippingRect:hp,getOffsetParent:Da,getElementRects:fp,getClientRects:np,getDimensions:up,getScale:To,isElement:Wt,isRTL:gp};function Ma(t,o){return t.x===o.x&&t.y===o.y&&t.width===o.width&&t.height===o.height}function bp(t,o){let e=null,r,i=oe(t);function s(){var c;clearTimeout(r),(c=e)==null||c.disconnect(),e=null;}function n(c,a){c===void 0&&(c=false),a===void 0&&(a=1),s();let h=t.getBoundingClientRect(),{left:m,top:d,width:f,height:g}=h;if(c||o(),!f||!g)return;let b=dr(d),x=dr(i.clientWidth-(m+f)),I=dr(i.clientHeight-(d+g)),E=dr(m),O={rootMargin:-b+"px "+-x+"px "+-I+"px "+-E+"px",threshold:kt(0,le(1,a))||1},_=true;function C(D){let H=D[0].intersectionRatio;if(H!==a){if(!_)return n();H?n(false,H):r=setTimeout(()=>{n(false,1e-7);},1e3);}H===1&&!Ma(h,t.getBoundingClientRect())&&n(),_=false;}try{e=new IntersectionObserver(C,{...O,root:i.ownerDocument});}catch{e=new IntersectionObserver(C,O);}e.observe(t);}return n(true),s}function Fa(t,o,e,r){r===void 0&&(r={});let{ancestorScroll:i=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=false}=r,h=bs(t),m=i||s?[...h?Eo(h):[],...Eo(o)]:[];m.forEach(E=>{i&&E.addEventListener("scroll",e,{passive:true}),s&&E.addEventListener("resize",e);});let d=h&&c?bp(h,e):null,f=-1,g=null;n&&(g=new ResizeObserver(E=>{let[S]=E;S&&S.target===h&&g&&(g.unobserve(o),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var O;(O=g)==null||O.observe(o);})),e();}),h&&!a&&g.observe(h),g.observe(o));let b,x=a?oo(t):null;a&&I();function I(){let E=oo(t);x&&!Ma(x,E)&&e(),x=E,b=requestAnimationFrame(I);}return e(),()=>{var E;m.forEach(S=>{i&&S.removeEventListener("scroll",e),s&&S.removeEventListener("resize",e);}),d?.(),(E=g)==null||E.disconnect(),g=null,a&&cancelAnimationFrame(b);}}var Ha=wa;var Ba=Sa,Wa=_a,vs=Ca;var ja=xa;var Na=(t,o,e)=>{let r=new Map,i={platform:mr,...e},s={...i.platform,_c:r};return ya(t,o,{...i,platform:s})};function Ua(t){return vp(t)}function ys(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function vp(t){for(let o=t;o;o=ys(o))if(o instanceof Element&&getComputedStyle(o).display==="none")return null;for(let o=ys(t);o;o=ys(o)){if(!(o instanceof Element))continue;let e=getComputedStyle(o);if(e.display!=="contents"&&(e.position!=="static"||Oo(e)||o.tagName==="BODY"))return o}return null}function yp(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var X=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),o=this.popup.getBoundingClientRect(),e=this.placement.includes("top")||this.placement.includes("bottom"),r=0,i=0,s=0,n=0,c=0,a=0,h=0,m=0;e?t.top<o.top?(r=t.left,i=t.bottom,s=t.right,n=t.bottom,c=o.left,a=o.top,h=o.right,m=o.top):(r=o.left,i=o.bottom,s=o.right,n=o.bottom,c=t.left,a=t.top,h=t.right,m=t.top):t.left<o.left?(r=t.right,i=t.top,s=o.left,n=o.top,c=t.right,a=t.bottom,h=o.left,m=o.bottom):(r=o.right,i=o.top,s=t.left,n=t.top,c=o.right,a=o.bottom,h=t.left,m=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${m}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||yp(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Fa(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Ha({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(vs({apply:({rects:e})=>{let r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Wa({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Ba({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(vs({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(ja({element:this.arrowEl,padding:this.arrowPadding}));let o=this.strategy==="absolute"?e=>mr.getOffsetParent(e,Ua):mr.getOffsetParent;Na(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:fe(St({},mr),{getOffsetParent:o})}).then(({x:e,y:r,middlewareData:i,placement:s})=>{let n=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${e}px`,top:`${r}px`}),this.arrow){let a=i.arrow.x,h=i.arrow.y,m="",d="",f="",g="";if(this.arrowPlacement==="start"){let b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=n?"":b,g=n?b:"",f=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof a=="number"?"calc(50% - var(--arrow-size-diagonal))":"",m=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof a=="number"?`${a}px`:"",m=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:m,right:d,bottom:f,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return u`
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
        ${this.arrow?u`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};X.styles=[V,ha];l([$(".popup")],X.prototype,"popup",2);l([$(".popup__arrow")],X.prototype,"arrowEl",2);l([p()],X.prototype,"anchor",2);l([p({type:Boolean,reflect:true})],X.prototype,"active",2);l([p({reflect:true})],X.prototype,"placement",2);l([p({reflect:true})],X.prototype,"strategy",2);l([p({type:Number})],X.prototype,"distance",2);l([p({type:Number})],X.prototype,"skidding",2);l([p({type:Boolean})],X.prototype,"arrow",2);l([p({attribute:"arrow-placement"})],X.prototype,"arrowPlacement",2);l([p({attribute:"arrow-padding",type:Number})],X.prototype,"arrowPadding",2);l([p({type:Boolean})],X.prototype,"flip",2);l([p({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(o=>o.trim()).filter(o=>o!==""),toAttribute:t=>t.join(" ")}})],X.prototype,"flipFallbackPlacements",2);l([p({attribute:"flip-fallback-strategy"})],X.prototype,"flipFallbackStrategy",2);l([p({type:Object})],X.prototype,"flipBoundary",2);l([p({attribute:"flip-padding",type:Number})],X.prototype,"flipPadding",2);l([p({type:Boolean})],X.prototype,"shift",2);l([p({type:Object})],X.prototype,"shiftBoundary",2);l([p({attribute:"shift-padding",type:Number})],X.prototype,"shiftPadding",2);l([p({attribute:"auto-size"})],X.prototype,"autoSize",2);l([p()],X.prototype,"sync",2);l([p({type:Object})],X.prototype,"autoSizeBoundary",2);l([p({attribute:"auto-size-padding",type:Number})],X.prototype,"autoSizePadding",2);l([p({attribute:"hover-bridge",type:Boolean})],X.prototype,"hoverBridge",2);var Ka=new Map,xp=new WeakMap;function _p(t){return t??{keyframes:[],options:{duration:0}}}function qa(t,o){return o.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Nt(t,o){Ka.set(t,_p(o));}function Ut(t,o,e){let r=xp.get(t);if(r?.[o])return qa(r[o],e.dir);let i=Ka.get(o);return i?qa(i,e.dir):{keyframes:[],options:{duration:0}}}function ve(t,o){return new Promise(e=>{function r(i){i.target===t&&(t.removeEventListener(o,r),e());}t.addEventListener(o,r);})}function qt(t,o,e){return new Promise(r=>{if(e?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=t.animate(o,fe(St({},e),{duration:wp()?0:e.duration}));i.addEventListener("cancel",r,{once:true}),i.addEventListener("finish",r,{once:true});})}function wp(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Kt(t){return Promise.all(t.getAnimations().map(o=>new Promise(e=>{o.cancel(),requestAnimationFrame(e);})))}function Io(t,o){return t.map(e=>fe(St({},e),{height:e.height==="auto"?`${o}px`:e.height}))}var j=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ct(this,"help-text","label"),this.localize=new W(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>u`
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
    `,this.handleDocumentFocusIn=t=>{let o=t.composedPath();this&&!o.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let o=t.target,e=o.closest(".select__clear")!==null,r=o.closest("sl-icon-button")!==null;if(!(e||r)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let i=this.getAllOptions(),s=i.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>i.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=i.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let i=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of i)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let o=t.composedPath();this&&!o.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let e=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="sl-icon-button");this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let e=t.target.closest("sl-option"),r=this.value;e&&!e.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==r&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),o=this.valueHasChanged?this.value:this.defaultValue,e=Array.isArray(o)?o:[o],r=[];t.forEach(i=>r.push(i.value)),this.setSelectedOptions(t.filter(i=>e.includes(i.value)));}handleTagRemove(t,o){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(o,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(e=>{e.current=false,e.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let o=this.getAllOptions(),e=Array.isArray(t)?t:[t];o.forEach(r=>r.selected=false),e.length&&e.forEach(r=>r.selected=true),this.selectionChanged();}toggleOptionSelection(t,o){o===true||o===false?t.selected=o:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,o,e;let r=this.getAllOptions();this.selectedOptions=r.filter(s=>s.selected);let i=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(e=(o=s?.getTextLabel)==null?void 0:o.call(s))!=null?e:"";}this.valueHasChanged=i,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,o)=>{if(o<this.maxOptionsVisible||this.maxOptionsVisible<=0){let e=this.getTag(t,o);return u`<div @sl-remove=${r=>this.handleTagRemove(r,t)}>
          ${typeof e=="string"?Ot(e):e}
        </div>`}else if(o===this.maxOptionsVisible)return u`<sl-tag size=${this.size}>+${this.selectedOptions.length-o}</sl-tag>`;return u``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,o,e){if(super.attributeChangedCallback(t,o,e),t==="value"){let r=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=r;}}handleValueChange(){if(!this.valueHasChanged){let e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e;}let t=this.getAllOptions(),o=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(e=>o.includes(e.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Kt(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:o}=Ut(this,"select.show",{dir:this.localize.dir()});await qt(this.popup.popup,t,o),this.currentOption&&lr(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Kt(this);let{keyframes:t,options:o}=Ut(this,"select.hide",{dir:this.localize.dir()});await qt(this.popup.popup,t,o),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,ve(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,ve(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o,i=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return u`
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

              ${i?u`
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
    `}};j.styles=[V,Tt,da];j.dependencies={"sl-icon":q,"sl-popup":X,"sl-tag":ae};l([$(".select")],j.prototype,"popup",2);l([$(".select__combobox")],j.prototype,"combobox",2);l([$(".select__display-input")],j.prototype,"displayInput",2);l([$(".select__value-input")],j.prototype,"valueInput",2);l([$(".select__listbox")],j.prototype,"listbox",2);l([k()],j.prototype,"hasFocus",2);l([k()],j.prototype,"displayLabel",2);l([k()],j.prototype,"currentOption",2);l([k()],j.prototype,"selectedOptions",2);l([k()],j.prototype,"valueHasChanged",2);l([p()],j.prototype,"name",2);l([k()],j.prototype,"value",1);l([p({attribute:"value"})],j.prototype,"defaultValue",2);l([p({reflect:true})],j.prototype,"size",2);l([p()],j.prototype,"placeholder",2);l([p({type:Boolean,reflect:true})],j.prototype,"multiple",2);l([p({attribute:"max-options-visible",type:Number})],j.prototype,"maxOptionsVisible",2);l([p({type:Boolean,reflect:true})],j.prototype,"disabled",2);l([p({type:Boolean})],j.prototype,"clearable",2);l([p({type:Boolean,reflect:true})],j.prototype,"open",2);l([p({type:Boolean})],j.prototype,"hoist",2);l([p({type:Boolean,reflect:true})],j.prototype,"filled",2);l([p({type:Boolean,reflect:true})],j.prototype,"pill",2);l([p()],j.prototype,"label",2);l([p({reflect:true})],j.prototype,"placement",2);l([p({attribute:"help-text"})],j.prototype,"helpText",2);l([p({reflect:true})],j.prototype,"form",2);l([p({type:Boolean,reflect:true})],j.prototype,"required",2);l([p()],j.prototype,"getTag",2);l([A("disabled",{waitUntilFirstUpdate:true})],j.prototype,"handleDisabledChange",1);l([A(["defaultValue","value"],{waitUntilFirstUpdate:true})],j.prototype,"handleValueChange",1);l([A("open",{waitUntilFirstUpdate:true})],j.prototype,"handleOpenChange",1);Nt("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Nt("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});j.define("sl-select");var Ga=y`
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
`;var Dt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,o="";return [...t].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("slot")||(o+=e.textContent)),e.nodeType===Node.TEXT_NODE&&(o+=e.textContent);}),o.trim()}render(){return u`
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
    `}};Dt.styles=[V,Ga];Dt.dependencies={"sl-icon":q};l([$(".option__label")],Dt.prototype,"defaultSlot",2);l([k()],Dt.prototype,"current",2);l([k()],Dt.prototype,"selected",2);l([k()],Dt.prototype,"hasHover",2);l([p({reflect:true})],Dt.prototype,"value",2);l([p({type:Boolean,reflect:true})],Dt.prototype,"disabled",2);l([A("disabled")],Dt.prototype,"handleDisabledChange",1);l([A("selected")],Dt.prototype,"handleSelectedChange",1);l([A("value")],Dt.prototype,"handleValueChange",1);Dt.define("sl-option");var Ya=y`
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
`;var xs="__AS_ASYNC_COMPUTED_VALUE__";function _i(t){return toString.call(t)==="[object Map]"}function Ie(t){return t&&typeof t=="object"&&t.hasOwnProperty(xs)}function Ss(t,o){let e=t.get(o);if(e!==void 0)return e;let r=t.get(Number(o)||o);if(r!==void 0)return r}function ye(t,o,e){if(!o||o.length===0)return t;let r=Array.isArray(o)?o:o.split("."),i,s=t;for(let n=0;n<r.length;n++){let c=r[n];if(_i(s))i=Ss(s,c);else if(c in s)i=s[c];else return e;s=i;}return i}function ks(t,o){return t.length>o.length?false:t.every((e,r)=>e===o[r])}(t=>typeof Be<"u"?Be:typeof Proxy<"u"?new Proxy(t,{get:(o,e)=>(typeof Be<"u"?Be:o)[e]}):t)(function(t){if(typeof Be<"u")return Be.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var ze=class{constructor(o,e,r){this.path=e;this.handle=r;this._loading=false;this._ready=false;this.host=o,o.addController(this);}get loading(){return this._loading}get value(){return this._value}load(){let o=this.host.schema,e=ye(o,this.path);Ie(e)?e.loading?(this._loading=true,this._value=this.handle(void 0)):(this._ready=e.value!==void 0,this._value=this.handle(e.value),this._loading=false):(this._ready=true,this._value=this.handle(e),this._loading=false);}render(o){return u`
            ${B(this.loading,()=>u`<auto-loading></auto-loading>`,()=>o(this._value))}
        `}hostUpdate(){this._ready||this.load();}hostUpdated(){}};exports.AutoFieldSelect=class fr extends R{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";this.items=new ze(this,"select",e=>e?e.map(r=>{let i={};return typeof r=="object"?Object.assign(i,r):typeof r=="string"&&r.startsWith("-")?Object.assign(i,{type:"divider"}):Object.assign(i,{label:r}),i}):[]);}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}_renderItem(e){let r=this.options.renderItem;return typeof r=="string"?u`${Ot(r.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof r=="function"?u`${Ot(r(e))}`:e.label||e.value}_onDropdownMenu(){}renderInput(){return u`
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
                
                ${B(this.items.loading,()=>u`<auto-loading></auto-loading>`,()=>u`${this.renderBeforeActions()}
                ${this.items.value.map(e=>e.type==="divider"?u`<sl-divider></sl-divider>`:u`<sl-option value="${e[this.valueKey]||e.label}" ?disabled=${!this.options.enable}>
                            <auto-flex class="item" gap="1em" align="center" grow="sl-icon + *,:first-child:not(sl-icon)" style="text-align:left;">
                                ${B(e.icon,()=>u`<sl-icon name="${e.icon}"></sl-icon>`)}
                                ${this._renderItem(e)}
                            </auto-flex>
                        </sl-option>`)}
                    ${this.renderAfterActions()}`)}
                
            </sl-select>
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect.styles=[R.styles,Ya,y`
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
        `],exports.AutoFieldSelect=v([T("auto-field-select")],exports.AutoFieldSelect);var ol=y`
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
`;var et=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this),this.hasSlotController=new ct(this,"help-text","label"),this.localize=new W(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let o=this.input.offsetWidth,e=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",s=o*t;if(i){let n=`${o-s}px + ${t} * ${r}`;this.output.style.translate=`calc((${n} - ${e/2}px - ${r} / 2))`;}else {let n=`${s}px - ${t} * ${r}`;this.output.style.translate=`calc(${n} - ${e/2}px + ${r} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o;return u`
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
              name=${w(this.name)}
              ?disabled=${this.disabled}
              min=${w(this.min)}
              max=${w(this.max)}
              step=${w(this.step)}
              .value=${Ct(this.value.toString())}
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
    `}};et.styles=[V,Tt,ol];l([$(".range__control")],et.prototype,"input",2);l([$(".range__tooltip")],et.prototype,"output",2);l([k()],et.prototype,"hasFocus",2);l([k()],et.prototype,"hasTooltip",2);l([p()],et.prototype,"title",2);l([p()],et.prototype,"name",2);l([p({type:Number})],et.prototype,"value",2);l([p()],et.prototype,"label",2);l([p({attribute:"help-text"})],et.prototype,"helpText",2);l([p({type:Boolean,reflect:true})],et.prototype,"disabled",2);l([p({type:Number})],et.prototype,"min",2);l([p({type:Number})],et.prototype,"max",2);l([p({type:Number})],et.prototype,"step",2);l([p()],et.prototype,"tooltip",2);l([p({attribute:false})],et.prototype,"tooltipFormatter",2);l([p({reflect:true})],et.prototype,"form",2);l([Ht()],et.prototype,"defaultValue",2);l([Ce({passive:true})],et.prototype,"handleThumbDragStart",1);l([A("value",{waitUntilFirstUpdate:true})],et.prototype,"handleValueChange",1);l([A("disabled",{waitUntilFirstUpdate:true})],et.prototype,"handleDisabledChange",1);l([A("hasTooltip",{waitUntilFirstUpdate:true})],et.prototype,"syncRange",1);et.define("sl-range");exports.AutoFieldRabge=class gr extends R{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top"}}renderInput(){return u`
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
        `],exports.AutoFieldRabge=v([T("auto-field-range")],exports.AutoFieldRabge);var rl=y`
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
`;function dt(t,o,e){let r=i=>Object.is(i,-0)?0:i;return t<o?r(o):t>e?r(e):r(t)}var _t=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let o=this.localize.dir()==="rtl",{left:e,right:r,width:i}=this.rating.getBoundingClientRect(),s=o?this.roundToPrecision((r-t)/i*this.max,this.precision):this.roundToPrecision((t-e)/i*this.max,this.precision);return dt(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let o=this.localize.dir()==="ltr",e=this.localize.dir()==="rtl",r=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||o&&t.key==="ArrowLeft"||e&&t.key==="ArrowRight"){let i=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-i),t.preventDefault();}if(t.key==="ArrowUp"||o&&t.key==="ArrowRight"||e&&t.key==="ArrowLeft"){let i=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+i),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==r&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,o=.5){let e=1/o;return Math.ceil(t*e)/e}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",o=Array.from(Array(this.max).keys()),e=0;return this.disabled||this.readonly?e=this.value:e=this.isHovering?this.hoverValue:this.value,u`
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
          ${o.map(r=>e>r&&e<r+1?u`
                <span
                  class=${z({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1})}
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
                class=${z({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===r+1,"rating__symbol--active":e>=r+1})}
                role="presentation"
              >
                ${Ot(this.getSymbol(r+1))}
              </span>
            `)}
        </span>
      </div>
    `}};_t.styles=[V,rl];_t.dependencies={"sl-icon":q};l([$(".rating")],_t.prototype,"rating",2);l([k()],_t.prototype,"hoverValue",2);l([k()],_t.prototype,"isHovering",2);l([p()],_t.prototype,"label",2);l([p({type:Number})],_t.prototype,"value",2);l([p({type:Number})],_t.prototype,"max",2);l([p({type:Number})],_t.prototype,"precision",2);l([p({type:Boolean,reflect:true})],_t.prototype,"readonly",2);l([p({type:Boolean,reflect:true})],_t.prototype,"disabled",2);l([p()],_t.prototype,"getSymbol",2);l([Ce({passive:true})],_t.prototype,"handleTouchMove",1);l([A("hoverValue")],_t.prototype,"handleHoverValueChange",1);l([A("isHovering")],_t.prototype,"handleIsHoveringChange",1);_t.define("sl-rating");exports.AutoFieldRating=class wi extends R{getInitialOptions(){return {max:5,precision:1}}renderInput(){return u`
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
        `}renderView(){return u`<sl-rating slot="value" name="${this.name}" data-path=${this.path} value=${this.value} max=${this.options.max} readonly> </sl-rating> `}};exports.AutoFieldRating=v([T("auto-field-rating")],exports.AutoFieldRating);var il=y`
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
`;var Es=class extends L{render(){return u` <slot></slot> `}};Es.styles=[V,il];var sl=y`
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
`;var F=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ct(this,"help-text","label"),this.localize=new W(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let o=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!o&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,o,e="none"){this.input.setSelectionRange(t,o,e);}setRangeText(t,o,e,r="preserve"){let i=o??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,r),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),o=this.hasSlotController.test("help-text"),e=this.label?true:!!t,r=this.helpText?true:!!o,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return u`
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
              .value=${Ct(this.value)}
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
    `}};F.styles=[V,Tt,sl];F.dependencies={"sl-icon":q};l([$(".input__control")],F.prototype,"input",2);l([k()],F.prototype,"hasFocus",2);l([p()],F.prototype,"title",2);l([p({reflect:true})],F.prototype,"type",2);l([p()],F.prototype,"name",2);l([p()],F.prototype,"value",2);l([Ht()],F.prototype,"defaultValue",2);l([p({reflect:true})],F.prototype,"size",2);l([p({type:Boolean,reflect:true})],F.prototype,"filled",2);l([p({type:Boolean,reflect:true})],F.prototype,"pill",2);l([p()],F.prototype,"label",2);l([p({attribute:"help-text"})],F.prototype,"helpText",2);l([p({type:Boolean})],F.prototype,"clearable",2);l([p({type:Boolean,reflect:true})],F.prototype,"disabled",2);l([p()],F.prototype,"placeholder",2);l([p({type:Boolean,reflect:true})],F.prototype,"readonly",2);l([p({attribute:"password-toggle",type:Boolean})],F.prototype,"passwordToggle",2);l([p({attribute:"password-visible",type:Boolean})],F.prototype,"passwordVisible",2);l([p({attribute:"no-spin-buttons",type:Boolean})],F.prototype,"noSpinButtons",2);l([p({reflect:true})],F.prototype,"form",2);l([p({type:Boolean,reflect:true})],F.prototype,"required",2);l([p()],F.prototype,"pattern",2);l([p({type:Number})],F.prototype,"minlength",2);l([p({type:Number})],F.prototype,"maxlength",2);l([p()],F.prototype,"min",2);l([p()],F.prototype,"max",2);l([p()],F.prototype,"step",2);l([p()],F.prototype,"autocapitalize",2);l([p()],F.prototype,"autocorrect",2);l([p()],F.prototype,"autocomplete",2);l([p({type:Boolean})],F.prototype,"autofocus",2);l([p()],F.prototype,"enterkeyhint",2);l([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],F.prototype,"spellcheck",2);l([p()],F.prototype,"inputmode",2);l([A("disabled",{waitUntilFirstUpdate:true})],F.prototype,"handleDisabledChange",1);l([A("step",{waitUntilFirstUpdate:true})],F.prototype,"handleStepChange",1);l([A("value",{waitUntilFirstUpdate:true})],F.prototype,"handleValueChange",1);function Ro(t,o){function e(i){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,c=s.left+n.scrollX,a=s.top+n.scrollY,h=i.pageX-c,m=i.pageY-a;o?.onMove&&o.onMove(h,m);}function r(){document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",r),o?.onStop&&o.onStop();}document.addEventListener("pointermove",e,{passive:true}),document.addEventListener("pointerup",r),o?.initialEvent instanceof PointerEvent&&e(o.initialEvent);}var nl=y`
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
`;function*ll(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Ln(ll(t.shadowRoot.activeElement))));}function cl(){return [...ll()].pop()}var al=new WeakMap;function pl(t){let o=al.get(t);return o||(o=window.getComputedStyle(t,null),al.set(t,o)),o}function Hp(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let o=pl(t);return o.visibility!=="hidden"&&o.display!=="none"}function Bp(t){let o=pl(t),{overflowY:e,overflowX:r}=o;return e==="scroll"||r==="scroll"?true:e!=="auto"||r!=="auto"?false:t.scrollHeight>t.clientHeight&&e==="auto"||t.scrollWidth>t.clientWidth&&r==="auto"}function Wp(t){let o=t.tagName.toLowerCase(),e=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(o==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${n}:checked`);return c?c===t:s.querySelector(n)===t}return Hp(t)?(o==="audio"||o==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(o)?true:Bp(t):false}function dl(t){var o,e;let r=Np(t),i=(o=r[0])!=null?o:null,s=(e=r[r.length-1])!=null?e:null;return {start:i,end:s}}function jp(t,o){var e;return ((e=t.getRootNode({composed:true}))==null?void 0:e.host)!==o}function Np(t){let o=new WeakMap,e=[];function r(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||o.has(i))return;o.set(i,true),!e.includes(i)&&Wp(i)&&e.push(i),i instanceof HTMLSlotElement&&jp(i,t)&&i.assignedElements({flatten:true}).forEach(s=>{r(s);}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&r(i.shadowRoot);}for(let s of i.children)r(s);}return r(t),e.sort((i,s)=>{let n=Number(i.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var ut=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var o;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((o=document.activeElement)==null?void 0:o.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let e=(r,i)=>{if(!r)return null;let s=r.closest(i);if(s)return s;let n=r.getRootNode();return n instanceof ShadowRoot?e(n.host,i):null};setTimeout(()=>{var r;let i=((r=this.containingElement)==null?void 0:r.getRootNode())instanceof ShadowRoot?cl():document.activeElement;(!this.containingElement||e(i,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let o=t.composedPath();this.containingElement&&!o.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let o=t.target;!this.stayOpenOnSelect&&o.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let o=this.getMenu();if(o){let e=o.getAllItems(),r=e[0],i=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),e.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(o.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(o.setCurrentItem(i),i.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let o=this.trigger.assignedElements({flatten:true}).find(r=>dl(r).start),e;if(o){switch(o.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":e=o.button;break;default:e=o;}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,ve(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,ve(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Kt(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:o}=Ut(this,"dropdown.show",{dir:this.localize.dir()});await qt(this.popup.popup,t,o),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Kt(this);let{keyframes:t,options:o}=Ut(this,"dropdown.hide",{dir:this.localize.dir()});await qt(this.popup.popup,t,o),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return u`
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
    `}};ut.styles=[V,nl];ut.dependencies={"sl-popup":X};l([$(".dropdown")],ut.prototype,"popup",2);l([$(".dropdown__trigger")],ut.prototype,"trigger",2);l([$(".dropdown__panel")],ut.prototype,"panel",2);l([p({type:Boolean,reflect:true})],ut.prototype,"open",2);l([p({reflect:true})],ut.prototype,"placement",2);l([p({type:Boolean,reflect:true})],ut.prototype,"disabled",2);l([p({attribute:"stay-open-on-select",type:Boolean,reflect:true})],ut.prototype,"stayOpenOnSelect",2);l([p({attribute:false})],ut.prototype,"containingElement",2);l([p({type:Number})],ut.prototype,"distance",2);l([p({type:Number})],ut.prototype,"skidding",2);l([p({type:Boolean})],ut.prototype,"hoist",2);l([p({reflect:true})],ut.prototype,"sync",2);l([A("open",{waitUntilFirstUpdate:true})],ut.prototype,"handleOpenChange",1);Nt("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Nt("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var hl=y`
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
`;var ul=y`
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
`;var xe=class extends L{constructor(){super(...arguments),this.localize=new W(this);}render(){return u`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};xe.styles=[V,ul];var G=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new ct(this,"[default]","prefix","suffix"),this.localize=new W(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:So}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),o=t?Co`a`:Co`button`;return Te`
      <${o}
        part="base"
        class=${z({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
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
      </${o}>
    `}};G.styles=[V,Zr];G.dependencies={"sl-icon":q,"sl-spinner":xe};l([$(".button")],G.prototype,"button",2);l([k()],G.prototype,"hasFocus",2);l([k()],G.prototype,"invalid",2);l([p()],G.prototype,"title",2);l([p({reflect:true})],G.prototype,"variant",2);l([p({reflect:true})],G.prototype,"size",2);l([p({type:Boolean,reflect:true})],G.prototype,"caret",2);l([p({type:Boolean,reflect:true})],G.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],G.prototype,"loading",2);l([p({type:Boolean,reflect:true})],G.prototype,"outline",2);l([p({type:Boolean,reflect:true})],G.prototype,"pill",2);l([p({type:Boolean,reflect:true})],G.prototype,"circle",2);l([p()],G.prototype,"type",2);l([p()],G.prototype,"name",2);l([p()],G.prototype,"value",2);l([p()],G.prototype,"href",2);l([p()],G.prototype,"target",2);l([p()],G.prototype,"rel",2);l([p()],G.prototype,"download",2);l([p()],G.prototype,"form",2);l([p({attribute:"formaction"})],G.prototype,"formAction",2);l([p({attribute:"formenctype"})],G.prototype,"formEnctype",2);l([p({attribute:"formmethod"})],G.prototype,"formMethod",2);l([p({attribute:"formnovalidate",type:Boolean})],G.prototype,"formNoValidate",2);l([p({attribute:"formtarget"})],G.prototype,"formTarget",2);l([A("disabled",{waitUntilFirstUpdate:true})],G.prototype,"handleDisabledChange",1);function mt(t,o){Up(t)&&(t="100%");let e=qp(t);return t=o===360?t:Math.min(o,Math.max(0,parseFloat(t))),e&&(t=parseInt(String(t*o),10)/100),Math.abs(t-o)<1e-6?1:(o===360?t=(t<0?t%o+o:t%o)/parseFloat(String(o)):t=t%o/parseFloat(String(o)),t)}function br(t){return Math.min(1,Math.max(0,t))}function Up(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function qp(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Si(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function vr(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Le(t){return t.length===1?"0"+t:String(t)}function ml(t,o,e){return {r:mt(t,255)*255,g:mt(o,255)*255,b:mt(e,255)*255}}function Os(t,o,e){t=mt(t,255),o=mt(o,255),e=mt(e,255);let r=Math.max(t,o,e),i=Math.min(t,o,e),s=0,n=0,c=(r+i)/2;if(r===i)n=0,s=0;else {let a=r-i;switch(n=c>.5?a/(2-r-i):a/(r+i),r){case t:s=(o-e)/a+(o<e?6:0);break;case o:s=(e-t)/a+2;break;case e:s=(t-o)/a+4;break;}s/=6;}return {h:s,s:n,l:c}}function As(t,o,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+(o-t)*(6*e):e<1/2?o:e<2/3?t+(o-t)*(2/3-e)*6:t}function fl(t,o,e){let r,i,s;if(t=mt(t,360),o=mt(o,100),e=mt(e,100),o===0)i=e,s=e,r=e;else {let n=e<.5?e*(1+o):e+o-e*o,c=2*e-n;r=As(c,n,t+1/3),i=As(c,n,t),s=As(c,n,t-1/3);}return {r:r*255,g:i*255,b:s*255}}function Ts(t,o,e){t=mt(t,255),o=mt(o,255),e=mt(e,255);let r=Math.max(t,o,e),i=Math.min(t,o,e),s=0,n=r,c=r-i,a=r===0?0:c/r;if(r===i)s=0;else {switch(r){case t:s=(o-e)/c+(o<e?6:0);break;case o:s=(e-t)/c+2;break;case e:s=(t-o)/c+4;break;}s/=6;}return {h:s,s:a,v:n}}function gl(t,o,e){t=mt(t,360)*6,o=mt(o,100),e=mt(e,100);let r=Math.floor(t),i=t-r,s=e*(1-o),n=e*(1-i*o),c=e*(1-(1-i)*o),a=r%6,h=[e,n,s,s,c,e][a],m=[c,e,e,n,s,s][a],d=[s,s,c,e,e,n][a];return {r:h*255,g:m*255,b:d*255}}function Is(t,o,e,r){let i=[Le(Math.round(t).toString(16)),Le(Math.round(o).toString(16)),Le(Math.round(e).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function bl(t,o,e,r,i){let s=[Le(Math.round(t).toString(16)),Le(Math.round(o).toString(16)),Le(Math.round(e).toString(16)),Le(Kp(r))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function vl(t,o,e,r){let i=t/100,s=o/100,n=e/100,c=r/100,a=255*(1-i)*(1-c),h=255*(1-s)*(1-c),m=255*(1-n)*(1-c);return {r:a,g:h,b:m}}function Rs(t,o,e){let r=1-t/255,i=1-o/255,s=1-e/255,n=Math.min(r,i,s);return n===1?(r=0,i=0,s=0):(r=(r-n)/(1-n)*100,i=(i-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(r),m:Math.round(i),y:Math.round(s),k:Math.round(n)}}function Kp(t){return Math.round(parseFloat(t)*255).toString(16)}function zs(t){return Rt(t)/255}function Rt(t){return parseInt(t,16)}function yl(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var yr={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function xl(t){let o={r:0,g:0,b:0},e=1,r=null,i=null,s=null,n=false,c=false;return typeof t=="string"&&(t=Xp(t)),typeof t=="object"&&(Mt(t.r)&&Mt(t.g)&&Mt(t.b)?(o=ml(t.r,t.g,t.b),n=true,c=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Mt(t.h)&&Mt(t.s)&&Mt(t.v)?(r=vr(t.s),i=vr(t.v),o=gl(t.h,r,i),n=true,c="hsv"):Mt(t.h)&&Mt(t.s)&&Mt(t.l)?(r=vr(t.s),s=vr(t.l),o=fl(t.h,r,s),n=true,c="hsl"):Mt(t.c)&&Mt(t.m)&&Mt(t.y)&&Mt(t.k)&&(o=vl(t.c,t.m,t.y,t.k),n=true,c="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(e=t.a)),e=Si(e),{ok:n,format:t.format||c,r:Math.min(255,Math.max(o.r,0)),g:Math.min(255,Math.max(o.g,0)),b:Math.min(255,Math.max(o.b,0)),a:e}}var Gp="[-\\+]?\\d+%?",Yp="[-\\+]?\\d*\\.\\d+%?",Ve="(?:"+Yp+")|(?:"+Gp+")",Ls="[\\s|\\(]+("+Ve+")[,|\\s]+("+Ve+")[,|\\s]+("+Ve+")\\s*\\)?",Ci="[\\s|\\(]+("+Ve+")[,|\\s]+("+Ve+")[,|\\s]+("+Ve+")[,|\\s]+("+Ve+")\\s*\\)?",Gt={CSS_UNIT:new RegExp(Ve),rgb:new RegExp("rgb"+Ls),rgba:new RegExp("rgba"+Ci),hsl:new RegExp("hsl"+Ls),hsla:new RegExp("hsla"+Ci),hsv:new RegExp("hsv"+Ls),hsva:new RegExp("hsva"+Ci),cmyk:new RegExp("cmyk"+Ci),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Xp(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let o=false;if(yr[t])t=yr[t],o=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let e=Gt.rgb.exec(t);return e?{r:e[1],g:e[2],b:e[3]}:(e=Gt.rgba.exec(t),e?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=Gt.hsl.exec(t),e?{h:e[1],s:e[2],l:e[3]}:(e=Gt.hsla.exec(t),e?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=Gt.hsv.exec(t),e?{h:e[1],s:e[2],v:e[3]}:(e=Gt.hsva.exec(t),e?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=Gt.cmyk.exec(t),e?{c:e[1],m:e[2],y:e[3],k:e[4]}:(e=Gt.hex8.exec(t),e?{r:Rt(e[1]),g:Rt(e[2]),b:Rt(e[3]),a:zs(e[4]),format:o?"name":"hex8"}:(e=Gt.hex6.exec(t),e?{r:Rt(e[1]),g:Rt(e[2]),b:Rt(e[3]),format:o?"name":"hex"}:(e=Gt.hex4.exec(t),e?{r:Rt(e[1]+e[1]),g:Rt(e[2]+e[2]),b:Rt(e[3]+e[3]),a:zs(e[4]+e[4]),format:o?"name":"hex8"}:(e=Gt.hex3.exec(t),e?{r:Rt(e[1]+e[1]),g:Rt(e[2]+e[2]),b:Rt(e[3]+e[3]),format:o?"name":"hex"}:false))))))))))}function Mt(t){return typeof t=="number"?!Number.isNaN(t):Gt.CSS_UNIT.test(t)}var xr=class t{constructor(o="",e={}){if(o instanceof t)return o;typeof o=="number"&&(o=yl(o)),this.originalInput=o;let r=xl(o);this.originalInput=o,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??r.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let o=this.toRgb();return (o.r*299+o.g*587+o.b*114)/1e3}getLuminance(){let o=this.toRgb(),e,r,i,s=o.r/255,n=o.g/255,c=o.b/255;return s<=.03928?e=s/12.92:e=Math.pow((s+.055)/1.055,2.4),n<=.03928?r=n/12.92:r=Math.pow((n+.055)/1.055,2.4),c<=.03928?i=c/12.92:i=Math.pow((c+.055)/1.055,2.4),.2126*e+.7152*r+.0722*i}getAlpha(){return this.a}setAlpha(o){return this.a=Si(o),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:o}=this.toHsl();return o===0}toHsv(){let o=Ts(this.r,this.g,this.b);return {h:o.h*360,s:o.s,v:o.v,a:this.a}}toHsvString(){let o=Ts(this.r,this.g,this.b),e=Math.round(o.h*360),r=Math.round(o.s*100),i=Math.round(o.v*100);return this.a===1?`hsv(${e}, ${r}%, ${i}%)`:`hsva(${e}, ${r}%, ${i}%, ${this.roundA})`}toHsl(){let o=Os(this.r,this.g,this.b);return {h:o.h*360,s:o.s,l:o.l,a:this.a}}toHslString(){let o=Os(this.r,this.g,this.b),e=Math.round(o.h*360),r=Math.round(o.s*100),i=Math.round(o.l*100);return this.a===1?`hsl(${e}, ${r}%, ${i}%)`:`hsla(${e}, ${r}%, ${i}%, ${this.roundA})`}toHex(o=false){return Is(this.r,this.g,this.b,o)}toHexString(o=false){return "#"+this.toHex(o)}toHex8(o=false){return bl(this.r,this.g,this.b,this.a,o)}toHex8String(o=false){return "#"+this.toHex8(o)}toHexShortString(o=false){return this.a===1?this.toHexString(o):this.toHex8String(o)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let o=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return this.a===1?`rgb(${o}, ${e}, ${r})`:`rgba(${o}, ${e}, ${r}, ${this.roundA})`}toPercentageRgb(){let o=e=>`${Math.round(mt(e,255)*100)}%`;return {r:o(this.r),g:o(this.g),b:o(this.b),a:this.a}}toPercentageRgbString(){let o=e=>Math.round(mt(e,255)*100);return this.a===1?`rgb(${o(this.r)}%, ${o(this.g)}%, ${o(this.b)}%)`:`rgba(${o(this.r)}%, ${o(this.g)}%, ${o(this.b)}%, ${this.roundA})`}toCmyk(){return {...Rs(this.r,this.g,this.b)}}toCmykString(){let{c:o,m:e,y:r,k:i}=Rs(this.r,this.g,this.b);return `cmyk(${o}, ${e}, ${r}, ${i})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let o="#"+Is(this.r,this.g,this.b,false);for(let[e,r]of Object.entries(yr))if(o===r)return e;return  false}toString(o){let e=!!o;o=o??this.format;let r=false,i=this.a<1&&this.a>=0;return !e&&i&&(o.startsWith("hex")||o==="name")?o==="name"&&this.a===0?this.toName():this.toRgbString():(o==="rgb"&&(r=this.toRgbString()),o==="prgb"&&(r=this.toPercentageRgbString()),(o==="hex"||o==="hex6")&&(r=this.toHexString()),o==="hex3"&&(r=this.toHexString(true)),o==="hex4"&&(r=this.toHex8String(true)),o==="hex8"&&(r=this.toHex8String()),o==="name"&&(r=this.toName()),o==="hsl"&&(r=this.toHslString()),o==="hsv"&&(r=this.toHsvString()),o==="cmyk"&&(r=this.toCmykString()),r||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(o=10){let e=this.toHsl();return e.l+=o/100,e.l=br(e.l),new t(e)}brighten(o=10){let e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(o/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(o/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(o/100)))),new t(e)}darken(o=10){let e=this.toHsl();return e.l-=o/100,e.l=br(e.l),new t(e)}tint(o=10){return this.mix("white",o)}shade(o=10){return this.mix("black",o)}desaturate(o=10){let e=this.toHsl();return e.s-=o/100,e.s=br(e.s),new t(e)}saturate(o=10){let e=this.toHsl();return e.s+=o/100,e.s=br(e.s),new t(e)}greyscale(){return this.desaturate(100)}spin(o){let e=this.toHsl(),r=(e.h+o)%360;return e.h=r<0?360+r:r,new t(e)}mix(o,e=50){let r=this.toRgb(),i=new t(o).toRgb(),s=e/100,n={r:(i.r-r.r)*s+r.r,g:(i.g-r.g)*s+r.g,b:(i.b-r.b)*s+r.b,a:(i.a-r.a)*s+r.a};return new t(n)}analogous(o=6,e=30){let r=this.toHsl(),i=360/e,s=[this];for(r.h=(r.h-(i*o>>1)+720)%360;--o;)r.h=(r.h+i)%360,s.push(new t(r));return s}complement(){let o=this.toHsl();return o.h=(o.h+180)%360,new t(o)}monochromatic(o=6){let e=this.toHsv(),{h:r}=e,{s:i}=e,{v:s}=e,n=[],c=1/o;for(;o--;)n.push(new t({h:r,s:i,v:s})),s=(s+c)%1;return n}splitcomplement(){let o=this.toHsl(),{h:e}=o;return [this,new t({h:(e+72)%360,s:o.s,l:o.l}),new t({h:(e+216)%360,s:o.s,l:o.l})]}onBackground(o){let e=this.toRgb(),r=new t(o).toRgb(),i=e.a+r.a*(1-e.a);return new t({r:(e.r*e.a+r.r*r.a*(1-e.a))/i,g:(e.g*e.a+r.g*r.a*(1-e.a))/i,b:(e.b*e.a+r.b*r.a*(1-e.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(o){let e=this.toHsl(),{h:r}=e,i=[this],s=360/o;for(let n=1;n<o;n++)i.push(new t({h:(r+n*s)%360,s:e.s,l:e.l}));return i}equals(o){let e=new t(o);return this.format==="cmyk"||e.format==="cmyk"?this.toCmykString()===e.toCmykString():this.toRgbString()===e.toRgbString()}};var _l="EyeDropper"in window,N=class extends L{constructor(){super(),this.formControlController=new ft(this),this.isSafeValue=false,this.localize=new W(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],o=(t.indexOf(this.format)+1)%t.length;this.format=t[o],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let o=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),e=o.querySelector(".color-picker__slider-handle"),{width:r}=o.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),Ro(o,{onMove:n=>{this.alpha=dt(n/r*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let o=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),e=o.querySelector(".color-picker__slider-handle"),{width:r}=o.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),Ro(o,{onMove:n=>{this.hue=dt(n/r*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let o=this.shadowRoot.querySelector(".color-picker__grid"),e=o.querySelector(".color-picker__grid-handle"),{width:r,height:i}=o.getBoundingClientRect(),s=this.value,n=this.value;e.focus(),t.preventDefault(),this.isDraggingGridHandle=true,Ro(o,{onMove:(c,a)=>{this.saturation=dt(c/r*100,0,100),this.brightness=dt(100-a/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let o=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=dt(this.alpha-o,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=dt(this.alpha+o,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let o=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=dt(this.hue-o,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=dt(this.hue+o,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let o=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=dt(this.saturation-o,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=dt(this.saturation+o,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=dt(this.brightness+o,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=dt(this.brightness-o,0,100),this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let o=t.target,e=this.value;t.stopPropagation(),this.input.value?(this.setColor(o.value),o.value=this.value):this.value="",this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let o=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let o=new xr(t);if(!o.isValid)return null;let e=o.toHsl(),r={h:e.h,s:e.s*100,l:e.l*100,a:e.a},i=o.toRgb(),s=o.toHexString(),n=o.toHex8String(),c=o.toHsv(),a={h:c.h,s:c.s*100,v:c.v*100,a:c.a};return {hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:a.h,s:a.s,v:a.v,string:this.setLetterCase(`hsv(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.v)}%)`)},hsva:{h:a.h,s:a.s,v:a.v,a:a.a,string:this.setLetterCase(`hsva(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.v)}%, ${a.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let o=this.parseColor(t);return o===null?false:(this.hue=o.hsva.h,this.saturation=o.hsva.s,this.brightness=o.hsva.v,this.alpha=this.opacity?o.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!_l)return;new EyeDropper().open().then(o=>{let e=this.value;this.setColor(o.sRGBHex),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let o=this.value;this.disabled||(this.setColor(t),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,o,e,r=100){let i=new xr(`hsva(${t}, ${o}%, ${e}%, ${r/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,o){if(this.isEmpty=!o,o||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let e=this.parseColor(o);e!==null?(this.inputValue=this.value,this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=e.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let o=this.inline?this.base:this.trigger;this.hasFocus&&(o.focus({preventScroll:true}),o.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let o=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(o===null)return "";switch(t){case "hex":return o.hex;case "hexa":return o.hexa;case "rgb":return o.rgb.string;case "rgba":return o.rgba.string;case "hsl":return o.hsl.string;case "hsla":return o.hsla.string;case "hsv":return o.hsv.string;case "hsva":return o.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,o=100-this.brightness,e=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),r=u`
      <div
        part="base"
        class=${z({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
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
            class=${z({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${J({top:`${o}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            ${_l?u`
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
                ${e.map(i=>{let s=this.parseColor(i);return s?u`
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
                        style=${J({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${i}"`,this),"")})}
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
    `}};N.styles=[V,hl];N.dependencies={"sl-button-group":Oe,"sl-button":G,"sl-dropdown":ut,"sl-icon":q,"sl-input":F,"sl-visually-hidden":Es};l([$('[part~="base"]')],N.prototype,"base",2);l([$('[part~="input"]')],N.prototype,"input",2);l([$(".color-dropdown")],N.prototype,"dropdown",2);l([$('[part~="preview"]')],N.prototype,"previewButton",2);l([$('[part~="trigger"]')],N.prototype,"trigger",2);l([k()],N.prototype,"hasFocus",2);l([k()],N.prototype,"isDraggingGridHandle",2);l([k()],N.prototype,"isEmpty",2);l([k()],N.prototype,"inputValue",2);l([k()],N.prototype,"hue",2);l([k()],N.prototype,"saturation",2);l([k()],N.prototype,"brightness",2);l([k()],N.prototype,"alpha",2);l([p()],N.prototype,"value",2);l([Ht()],N.prototype,"defaultValue",2);l([p()],N.prototype,"label",2);l([p()],N.prototype,"format",2);l([p({type:Boolean,reflect:true})],N.prototype,"inline",2);l([p({reflect:true})],N.prototype,"size",2);l([p({attribute:"no-format-toggle",type:Boolean})],N.prototype,"noFormatToggle",2);l([p()],N.prototype,"name",2);l([p({type:Boolean,reflect:true})],N.prototype,"disabled",2);l([p({type:Boolean})],N.prototype,"hoist",2);l([p({type:Boolean})],N.prototype,"opacity",2);l([p({type:Boolean})],N.prototype,"uppercase",2);l([p()],N.prototype,"swatches",2);l([p({reflect:true})],N.prototype,"form",2);l([p({type:Boolean,reflect:true})],N.prototype,"required",2);l([Ce({passive:false})],N.prototype,"handleTouchMove",1);l([A("format",{waitUntilFirstUpdate:true})],N.prototype,"handleFormatChange",1);l([A("opacity",{waitUntilFirstUpdate:true})],N.prototype,"handleOpacityChange",1);l([A("value")],N.prototype,"handleValueChange",1);N.define("sl-color-picker");var Qp=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class _r extends R{getInitialOptions(){return {format:"hex",opacity:false,inline:false,swatches:Qp}}renderInput(){return u`
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
        `}_onClickPresetColor(o){this.input.value=o.target.dataset.color,this.onFieldInput();}_renderColors(){if(this.options.presets)return u`${tt(this.options.presets,o=>u`<span
                data-color="${o}"
                    @click=${this._onClickPresetColor}
                    class="preset-color${this.value===o?" selected":""}" style="background-color:${o};"></span>`)}`}renderView(){return u`<span><span class="color"   style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[R.styles,y`
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
        `],exports.AutoFieldColorPicker=v([T("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class wr extends R{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((e,r)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{id:e,label:e,value:e}),i.icon&&(this.isShowIcon=true),i.$index=r,i}),this.selection=this.value;}renderInput(){return u`
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
        `}_onCheckChange(e){let r=e.target.closest(".card")||e.target,i=Number(r.dataset.index),s=r.checked??!r.classList.contains("selected"),n=this.items[i];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let c=this.selection.findIndex(a=>a===n[this.valueKey]);c>-1&&this.selection.splice(c,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(e,r){if(this.options.card){let i=this.selection.includes(r[this.valueKey]);return u`<div
                class="card ${i?"selected":""}"
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
        `],exports.AutoFieldCheckboxGroup=v([T("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class Sr extends R{constructor(){super(...arguments);this.parts=[];}getInitialOptions(){return {template:"0000",delimiter:"",caseType:"both",includeDelimiter:true,onlyNumber:false}}_isValidChar(e){return this.options.chars?new RegExp(this.options.chars).test(e):true}_onKeyDown(e){let r=e.key;r.length===1&&(this._isValidChar(r)||e.preventDefault(),e.stopPropagation());}_onPartInput(e){let i=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,c)=>(n+=c.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),s=0;this.parts.forEach((n,c)=>{this.options.delimiter.includes(n)||(this.parts[c]=i[s++]);}),this.onFieldChange(),this._isLastInput(e);}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((e,r)=>this.options.delimiter.includes(r)?e:`${e}${r}`,"")}_isLastInput(e){let r=e.target;if(r.value.length>=1){r.blur();let i=r.nextElementSibling||r.nextElementSibling?.nextElementSibling;i&&(i.focus(),i.select());}}_onPaste(e){e.preventDefault();let r=e.clipboardData?.getData("text/plain")||"",i=this._parseParts(r),s=c=>{if(c){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let c of i)if(!this.options.delimiter.includes(c)&&(n.value=c,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value);}_parseParts(e){let r=this.options.delimiter,i=this.options.template,s=0;return Array.from(i).map(n=>{if(r.includes(n))return e[s]===n&&s++,n;{let c=e[s++]||n;return this.options.caseType==="upper"?c.toUpperCase():this.options.caseType==="lower"?c.toLowerCase():c}})}_onPartFocus(e){e.target.select();}renderPart(e){return u`<sl-input
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
                ${tt(this.parts,e=>this.options.delimiter.includes(e)?u`${e}`:this.renderPart(e))}
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
                background-color: var(--t-color-theme--1);
            }
        `],exports.AutoFieldParts=v([T("auto-field-parts")],exports.AutoFieldParts);var wl=y`
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
`;var ki=class extends L{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let o=["menuitem","menuitemcheckbox"],e=t.composedPath(),r=e.find(c=>{var a;return o.includes(((a=c?.getAttribute)==null?void 0:a.call(c,"role"))||"")});if(!r||e.find(c=>{var a;return ((a=c?.getAttribute)==null?void 0:a.call(c,"role"))==="menu"})!==this)return;let n=r;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let o=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),o?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let o=this.getAllItems(),e=this.getCurrentItem(),r=e?o.indexOf(e):0;o.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?r++:t.key==="ArrowUp"?r--:t.key==="Home"?r=0:t.key==="End"&&(r=o.length-1),r<0&&(r=o.length-1),r>o.length-1&&(r=0),this.setCurrentItem(o[r]),o[r].focus());}}handleMouseDown(t){let o=t.target;this.isMenuItem(o)&&this.setCurrentItem(o);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var o;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((o=t.getAttribute("role"))!=null?o:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1");});}render(){return u`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};ki.styles=[V,wl];l([$("slot")],ki.prototype,"defaultSlot",2);ki.define("sl-menu");var Sl=y`
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
`;var Cr=(t,o)=>{let e=t._$AN;if(e===void 0)return  false;for(let r of e)r._$AO?.(o,false),Cr(r,o);return  true},$i=t=>{let o,e;do{if((o=t._$AM)===void 0)break;e=o._$AN,e.delete(t),t=o;}while(e?.size===0)},Cl=t=>{for(let o;o=t._$AM;t=o){let e=o._$AN;if(e===void 0)o._$AN=e=new Set;else if(e.has(t))break;e.add(t),td(o);}};function Zp(t){this._$AN!==void 0?($i(this),this._$AM=t,Cl(this)):this._$AM=t;}function Jp(t,o=false,e=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(o)if(Array.isArray(r))for(let s=e;s<r.length;s++)Cr(r[s],false),$i(r[s]);else r!=null&&(Cr(r,false),$i(r));else Cr(this,t);}var td=t=>{t.type==yt.CHILD&&(t._$AP??=Jp,t._$AQ??=Zp);},Ei=class extends At{constructor(){super(...arguments),this._$AN=void 0;}_$AT(o,e,r){super._$AT(o,e,r),Cl(this),this.isConnected=o._$AU;}_$AO(o,e=true){o!==this.isConnected&&(this.isConnected=o,o?this.reconnected?.():this.disconnected?.()),e&&(Cr(this,o),$i(this));}setValue(o){if(qr(this._$Ct))this._$Ct._$AI(o,this);else {let e=[...this._$Ct._$AH];e[this._$Ci]=o,this._$Ct._$AI(e,this,0);}}disconnected(){}reconnected(){}};var kl=()=>new Ps,Ps=class{},Vs=new WeakMap,$l=Pt(class extends Ei{render(t){return Y}update(t,[o]){let e=o!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=o,this.ht=t.options?.host,this.rt(this.ct=t.element)),Y}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let o=this.ht??globalThis,e=Vs.get(o);e===void 0&&(e=new WeakMap,Vs.set(o,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?Vs.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var El=class{constructor(t,o){this.popupRef=kl(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=e=>{switch(e.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(e);break;}},this.handleClick=e=>{var r;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&(e.target.tagName==="sl-menu-item"||(r=e.target.role)!=null&&r.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=e=>{e.stopPropagation();},this.handlePopupReposition=()=>{let e=this.host.renderRoot.querySelector("slot[name='submenu']"),r=e?.assignedElements({flatten:true}).filter(h=>h.localName==="sl-menu")[0],i=getComputedStyle(this.host).direction==="rtl";if(!r)return;let{left:s,top:n,width:c,height:a}=r.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${i?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${i?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+a}px`);},(this.host=t).addController(this),this.hasSlotController=o;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let o=this.host.renderRoot.querySelector("slot[name='submenu']");if(!o){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let e=null;for(let r of o.assignedElements())if(e=r.querySelectorAll("sl-menu-item, [role^='menuitem']"),e.length!==0)break;if(!(!e||e.length===0)){e[0].setAttribute("tabindex","0");for(let r=1;r!==e.length;++r)e[r].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?e[0]instanceof HTMLElement&&e[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{e[0]instanceof HTMLElement&&e[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let o=this.host.parentElement.computedStyleMap(),r=["padding-top","border-top-width","margin-top"].reduce((i,s)=>{var n;let c=(n=o.get(s))!=null?n:new CSSUnitValue(0,"px"),h=(c instanceof CSSUnitValue?c:new CSSUnitValue(0,"px")).to("px");return i-h.value},0);this.skidding=r;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?u`
      <sl-popup
        ${$l(this.popupRef)}
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
    `:u` <slot name="submenu" hidden></slot> `}};var zt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new ct(this,"submenu"),this.submenuController=new El(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return Yn(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",o=this.submenuController.isExpanded();return u`
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
        ${this.loading?u` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};zt.styles=[V,Sl];zt.dependencies={"sl-icon":q,"sl-popup":X,"sl-spinner":xe};l([$("slot:not([name])")],zt.prototype,"defaultSlot",2);l([$(".menu-item")],zt.prototype,"menuItem",2);l([p()],zt.prototype,"type",2);l([p({type:Boolean,reflect:true})],zt.prototype,"checked",2);l([p()],zt.prototype,"value",2);l([p({type:Boolean,reflect:true})],zt.prototype,"loading",2);l([p({type:Boolean,reflect:true})],zt.prototype,"disabled",2);l([A("checked")],zt.prototype,"handleCheckedChange",1);l([A("disabled")],zt.prototype,"handleDisabledChange",1);l([A("type")],zt.prototype,"handleTypeChange",1);zt.define("sl-menu-item");var Al=y`
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
`;var Ds=()=>null,Lt=class extends L{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new W(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=Ds,this.snapThreshold=12;}toSnapFunction(t){let o=t.split(" ");return ({pos:e,size:r,snapThreshold:i,isRtl:s,vertical:n})=>{let c=e,a=Number.POSITIVE_INFINITY;return o.forEach(h=>{let m;if(h.startsWith("repeat(")){let f=t.substring(7,t.length-1),g=f.endsWith("%"),b=Number.parseFloat(f),x=g?r*(b/100):b;m=Math.round((s&&!n?r-e:e)/x)*x;}else h.endsWith("%")?m=r*(Number.parseFloat(h)/100):m=Number.parseFloat(h);s&&!n&&(m=r-m);let d=Math.abs(e-m);d<=i&&d<a&&(c=m,a=d);}),c}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=Ds;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:o}=this.getBoundingClientRect();this.size=this.vertical?o:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let o=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),Ro(this,{onMove:(e,r)=>{var i;let s=this.vertical?r:e;this.primary==="end"&&(s=this.size-s),s=(i=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:o,vertical:this.vertical}))!=null?i:s,this.position=dt(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let o=this.position,e=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(o-=e),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(o+=e),t.key==="Home"&&(o=this.primary==="end"?100:0),t.key==="End"&&(o=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)o=this.positionBeforeCollapsing,this.isCollapsed=false;else {let r=this.position;o=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=r;});}this.position=dt(o,0,100);}}handleResize(t){let{width:o,height:e}=t[0].contentRect;this.size=this.vertical?e:o,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",o=this.vertical?"gridTemplateColumns":"gridTemplateRows",e=this.localize.dir()==="rtl",r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i="auto";return this.primary==="end"?e&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${r}`:e&&!this.vertical?this.style[t]=`${i} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${i}`,this.style[o]="",u`
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
    `}};Lt.styles=[V,Al];l([$(".divider")],Lt.prototype,"divider",2);l([p({type:Number,reflect:true})],Lt.prototype,"position",2);l([p({attribute:"position-in-pixels",type:Number})],Lt.prototype,"positionInPixels",2);l([p({type:Boolean,reflect:true})],Lt.prototype,"vertical",2);l([p({type:Boolean,reflect:true})],Lt.prototype,"disabled",2);l([p()],Lt.prototype,"primary",2);l([p({reflect:true})],Lt.prototype,"snap",1);l([p({type:Number,attribute:"snap-threshold"})],Lt.prototype,"snapThreshold",2);l([A("position")],Lt.prototype,"handlePositionChange",1);l([A("positionInPixels")],Lt.prototype,"handlePositionInPixelsChange",1);l([A("vertical")],Lt.prototype,"handleVerticalChange",1);Lt.define("sl-split-panel");ae.define("sl-tag");var Pe=y`
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
`;exports.AutoFieldList=class so extends R{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.scrollbar=new Ye(this);this.scrollbars=[];this.items=new ze(this,"select",e=>e?(e.forEach(r=>{this.isItemSelected(r)&&this.selection.push(r[this.options.valueKey]);}),e):[]);this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu,.results")?.forEach(r=>{this.scrollbars.push(this.scrollbar.create(r,{width:"5px"}));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}connectedCallback(){super.connectedCallback(),this.options&&this.setPresetActions(),this.style.height="auto";}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}_addSecectItem(e){this.selection.findIndex(i=>i[this.options.valueKey]===e[this.options.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(e[this.options.valueKey]));}_removeSelectItem(e){for(let r=this.selection.length-1;r>=0;r--)this.selection[r]===e&&this.selection.splice(r,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(e){let r=e.detail.item,i=r.dataset.index,s=this.items.value[i];s&&(r.checked?this._addSecectItem(s):this._removeSelectItem(s[this.options.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.value.length}`,this.onFieldChange());}_renderWithSplitPanel(e){return this.options.showResults&&this.options.multiple?u`<sl-split-panel 
            style="height:${this.options.height||"15em"}"
            position="60"> ${e} ${this.renderResults()} </sl-split-panel>`:e}_renderItem(e){let r=this.options.renderItem;return typeof r=="string"?u`${Ot(r.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof r=="function"?u`${Ot(r(e))}`:e.label}_onClickPresetAction(e){e==="all"?this.selection=this.items.value.map(r=>r[this.options.valueKey]):e==="reverse"?this.selection=this.items.value.filter(r=>!this.selection.includes(r[this.options.valueKey])).map(r=>r[this.options.valueKey]):e==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let e=[];this.options.multiple&&e.push({id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")});let r=i=>{for(let s=e.length-1;s>=0;s--)if(e[s].id===i.id){let n=i.onClick;i.onClick=()=>{e[s].onClick(),n&&n.call(this,this.getInputValue());},e.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(i=>{r(i);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(i=>{r(i);}),e.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...e));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(e){let r=this.options.labelKey;if(r){if(r in e)return e[r]}else return e.label}renderResults(){return u`<div
            slot="end"
            class="results mark-err scrollbar"
            no-padding
            style="${J({maxHeight:this.options.height})}"
        >
            ${tt(this.selection,e=>{let r=this.items.value.filter(s=>s[this.options.valueKey]===e)[0];if(!r)return;let i=r&&r.label||e;return u`<div class="item" title="${r.value}">
                    <span>${i}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(r)}></sl-icon-button>
                </div>`})}
        </div>`}_renderList(){let e=Array.isArray(this.value)?this.value:[this.value];return u`${this._renderWithSplitPanel(u` <sl-menu
            slot="start"
            class="scrollbar mark-err ${z({multiple:this.options.multiple})}"
            style=${J({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}
        >

            ${tt(this.items.value,(r,i)=>{let s=e.includes(r[this.options.valueKey]);return u`<sl-menu-item type="checkbox" 
                    data-index=${String(i)} .checked=${s}>
                    ${B(r.icon,()=>u`<sl-icon slot="prefix" name="${r.icon}"></sl-icon>`)}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(r)} </auto-flex>
                </sl-menu-item>`})}
        </sl-menu>`)} `}_renderHeader(){return u`${B(this.beforeActions.length>0,()=>u`<div class="header">${this.renderBeforeActions()}</div>`)}`}_renderFooter(){if(!(!this.options.multiple&&this.afterActions.length===0))return u`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.items.value.length} </span>
        </div>`}renderInput(){return u`
            ${B(this.items.loading,()=>u`<auto-loading></auto-loading>`,()=>u`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`)}
            
        `}};exports.AutoFieldList.styles=[R.styles,y`
            ${Pe}
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
        `],v([k()],exports.AutoFieldList.prototype,"selectedTips",2),v([$("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=v([T("auto-field-list")],exports.AutoFieldList);var Ol=y`
  :host {
    display: inline-block;
  }
`;var Tl=null,Ai=class{};Ai.render=function(t,o){Tl(t,o);};self.QrCreator=Ai;(function(t){function o(c,a,h,m){var d={},f=t(h,a);f.u(c),f.J(),m=m||0;var g=f.h(),b=f.h()+2*m;return d.text=c,d.level=a,d.version=h,d.O=b,d.a=function(x,I){return x-=m,I-=m,0>x||x>=g||0>I||I>=g?false:f.a(x,I)},d}function e(c,a,h,m,d,f,g,b,x,I){function E(S,O,_,C,D,H,U){S?(c.lineTo(O+H,_+U),c.arcTo(O,_,C,D,f)):c.lineTo(O,_);}g?c.moveTo(a+f,h):c.moveTo(a,h),E(b,m,h,m,d,-f,0),E(x,m,d,a,d,0,-f),E(I,a,d,a,h,f,0),E(g,a,h,m,h,0,f);}function r(c,a,h,m,d,f,g,b,x,I){function E(S,O,_,C){c.moveTo(S+_,O),c.lineTo(S,O),c.lineTo(S,O+C),c.arcTo(S,O,S+_,O,f);}g&&E(a,h,f,f),b&&E(m,h,-f,f),x&&E(m,d,-f,-f),I&&E(a,d,f,-f);}function i(c,a){var h=a.fill;if(typeof h=="string")c.fillStyle=h;else {var m=h.type,d=h.colorStops;if(h=h.position.map(g=>Math.round(g*a.size)),m==="linear-gradient")var f=c.createLinearGradient.apply(c,h);else if(m==="radial-gradient")f=c.createRadialGradient.apply(c,h);else throw Error("Unsupported fill");d.forEach(([g,b])=>{f.addColorStop(g,b);}),c.fillStyle=f;}}function s(c,a){t:{var h=a.text,m=a.v,d=a.N,f=a.K,g=a.P;for(d=Math.max(1,d||1),f=Math.min(40,f||40);d<=f;d+=1)try{var b=o(h,m,d,g);break t}catch{}b=void 0;}if(!b)return null;for(h=c.getContext("2d"),a.background&&(h.fillStyle=a.background,h.fillRect(a.left,a.top,a.size,a.size)),m=b.O,f=a.size/m,h.beginPath(),g=0;g<m;g+=1)for(d=0;d<m;d+=1){var x=h,I=a.left+d*f,E=a.top+g*f,S=g,O=d,_=b.a,C=I+f,D=E+f,H=S-1,U=S+1,M=O-1,P=O+1,ht=Math.floor(Math.min(.5,Math.max(0,a.R))*f),st=_(S,O),wt=_(H,M),nt=_(H,O);H=_(H,P);var Ft=_(S,P);P=_(U,P),O=_(U,O),U=_(U,M),S=_(S,M),I=Math.round(I),E=Math.round(E),C=Math.round(C),D=Math.round(D),st?e(x,I,E,C,D,ht,!nt&&!S,!nt&&!Ft,!O&&!Ft,!O&&!S):r(x,I,E,C,D,ht,nt&&S&&wt,nt&&Ft&&H,O&&Ft&&P,O&&S&&U);}return i(h,a),h.fill(),c}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Tl=function(c,a){var h={};Object.assign(h,n,c),h.N=h.minVersion,h.K=h.maxVersion,h.v=h.ecLevel,h.left=h.left,h.top=h.top,h.size=h.size,h.fill=h.fill,h.background=h.background,h.text=h.text,h.R=h.radius,h.P=h.quiet,a instanceof HTMLCanvasElement?((a.width!==h.size||a.height!==h.size)&&(a.width=h.size,a.height=h.size),a.getContext("2d").clearRect(0,0,a.width,a.height),s(a,h)):(c=document.createElement("canvas"),c.width=h.size,c.height=h.size,h=s(c,h),a.appendChild(h));};})((function(){function t(a){var h=e.s(a);return {S:function(){return 4},b:function(){return h.length},write:function(m){for(var d=0;d<h.length;d+=1)m.put(h[d],8);}}}function o(){var a=[],h=0,m={B:function(){return a},c:function(d){return (a[Math.floor(d/8)]>>>7-d%8&1)==1},put:function(d,f){for(var g=0;g<f;g+=1)m.m((d>>>f-g-1&1)==1);},f:function(){return h},m:function(d){var f=Math.floor(h/8);a.length<=f&&a.push(0),d&&(a[f]|=128>>>h%8),h+=1;}};return m}function e(a,h){function m(S,O){for(var _=-1;7>=_;_+=1)if(!(-1>=S+_||b<=S+_))for(var C=-1;7>=C;C+=1) -1>=O+C||b<=O+C||(g[S+_][O+C]=0<=_&&6>=_&&(C==0||C==6)||0<=C&&6>=C&&(_==0||_==6)||2<=_&&4>=_&&2<=C&&4>=C);}function d(S,O){for(var _=b=4*a+17,C=Array(_),D=0;D<_;D+=1){C[D]=Array(_);for(var H=0;H<_;H+=1)C[D][H]=null;}for(g=C,m(0,0),m(b-7,0),m(0,b-7),_=s.G(a),C=0;C<_.length;C+=1)for(D=0;D<_.length;D+=1){H=_[C];var U=_[D];if(g[H][U]==null)for(var M=-2;2>=M;M+=1)for(var P=-2;2>=P;P+=1)g[H+M][U+P]=M==-2||M==2||P==-2||P==2||M==0&&P==0;}for(_=8;_<b-8;_+=1)g[_][6]==null&&(g[_][6]=_%2==0);for(_=8;_<b-8;_+=1)g[6][_]==null&&(g[6][_]=_%2==0);for(_=s.w(f<<3|O),C=0;15>C;C+=1)D=!S&&(_>>C&1)==1,g[6>C?C:8>C?C+1:b-15+C][8]=D,g[8][8>C?b-C-1:9>C?15-C:14-C]=D;if(g[b-8][8]=!S,7<=a){for(_=s.A(a),C=0;18>C;C+=1)D=!S&&(_>>C&1)==1,g[Math.floor(C/3)][C%3+b-8-3]=D;for(C=0;18>C;C+=1)D=!S&&(_>>C&1)==1,g[C%3+b-8-3][Math.floor(C/3)]=D;}if(x==null){for(S=c.I(a,f),_=o(),C=0;C<I.length;C+=1)D=I[C],_.put(4,4),_.put(D.b(),s.f(4,a)),D.write(_);for(C=D=0;C<S.length;C+=1)D+=S[C].j;if(_.f()>8*D)throw Error("code length overflow. ("+_.f()+">"+8*D+")");for(_.f()+4<=8*D&&_.put(0,4);_.f()%8!=0;)_.m(false);for(;!(_.f()>=8*D)&&(_.put(236,8),!(_.f()>=8*D));)_.put(17,8);var ht=0;for(D=C=0,H=Array(S.length),U=Array(S.length),M=0;M<S.length;M+=1){var st=S[M].j,wt=S[M].o-st;for(C=Math.max(C,st),D=Math.max(D,wt),H[M]=Array(st),P=0;P<H[M].length;P+=1)H[M][P]=255&_.B()[P+ht];for(ht+=st,P=s.C(wt),st=r(H[M],P.b()-1).l(P),U[M]=Array(P.b()-1),P=0;P<U[M].length;P+=1)wt=P+st.b()-U[M].length,U[M][P]=0<=wt?st.c(wt):0;}for(P=_=0;P<S.length;P+=1)_+=S[P].o;for(_=Array(_),P=ht=0;P<C;P+=1)for(M=0;M<S.length;M+=1)P<H[M].length&&(_[ht]=H[M][P],ht+=1);for(P=0;P<D;P+=1)for(M=0;M<S.length;M+=1)P<U[M].length&&(_[ht]=U[M][P],ht+=1);x=_;}for(S=x,_=-1,C=b-1,D=7,H=0,O=s.F(O),U=b-1;0<U;U-=2)for(U==6&&--U;;){for(M=0;2>M;M+=1)g[C][U-M]==null&&(P=false,H<S.length&&(P=(S[H]>>>D&1)==1),O(C,U-M)&&(P=!P),g[C][U-M]=P,--D,D==-1&&(H+=1,D=7));if(C+=_,0>C||b<=C){C-=_,_=-_;break}}}var f=i[h],g=null,b=0,x=null,I=[],E={u:function(S){S=t(S),I.push(S),x=null;},a:function(S,O){if(0>S||b<=S||0>O||b<=O)throw Error(S+","+O);return g[S][O]},h:function(){return b},J:function(){for(var S=0,O=0,_=0;8>_;_+=1){d(true,_);var C=s.D(E);(_==0||S>C)&&(S=C,O=_);}d(false,O);}};return E}function r(a,h){if(typeof a.length>"u")throw Error(a.length+"/"+h);var m=(function(){for(var f=0;f<a.length&&a[f]==0;)f+=1;for(var g=Array(a.length-f+h),b=0;b<a.length-f;b+=1)g[b]=a[b+f];return g})(),d={c:function(f){return m[f]},b:function(){return m.length},multiply:function(f){for(var g=Array(d.b()+f.b()-1),b=0;b<d.b();b+=1)for(var x=0;x<f.b();x+=1)g[b+x]^=n.i(n.g(d.c(b))+n.g(f.c(x)));return r(g,0)},l:function(f){if(0>d.b()-f.b())return d;for(var g=n.g(d.c(0))-n.g(f.c(0)),b=Array(d.b()),x=0;x<d.b();x+=1)b[x]=d.c(x);for(x=0;x<f.b();x+=1)b[x]^=n.i(n.g(f.c(x))+g);return r(b,0).l(f)}};return d}e.s=function(a){for(var h=[],m=0;m<a.length;m++){var d=a.charCodeAt(m);128>d?h.push(d):2048>d?h.push(192|d>>6,128|d&63):55296>d||57344<=d?h.push(224|d>>12,128|d>>6&63,128|d&63):(m++,d=65536+((d&1023)<<10|a.charCodeAt(m)&1023),h.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63));}return h};var i={L:1,M:0,Q:3,H:2},s=(function(){function a(d){for(var f=0;d!=0;)f+=1,d>>>=1;return f}var h=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],m={w:function(d){for(var f=d<<10;0<=a(f)-a(1335);)f^=1335<<a(f)-a(1335);return (d<<10|f)^21522},A:function(d){for(var f=d<<12;0<=a(f)-a(7973);)f^=7973<<a(f)-a(7973);return d<<12|f},G:function(d){return h[d-1]},F:function(d){switch(d){case 0:return function(f,g){return (f+g)%2==0};case 1:return function(f){return f%2==0};case 2:return function(f,g){return g%3==0};case 3:return function(f,g){return (f+g)%3==0};case 4:return function(f,g){return (Math.floor(f/2)+Math.floor(g/3))%2==0};case 5:return function(f,g){return f*g%2+f*g%3==0};case 6:return function(f,g){return (f*g%2+f*g%3)%2==0};case 7:return function(f,g){return (f*g%3+(f+g)%2)%2==0};default:throw Error("bad maskPattern:"+d)}},C:function(d){for(var f=r([1],0),g=0;g<d;g+=1)f=f.multiply(r([1,n.i(g)],0));return f},f:function(d,f){if(d!=4||1>f||40<f)throw Error("mode: "+d+"; type: "+f);return 10>f?8:16},D:function(d){for(var f=d.h(),g=0,b=0;b<f;b+=1)for(var x=0;x<f;x+=1){for(var I=0,E=d.a(b,x),S=-1;1>=S;S+=1)if(!(0>b+S||f<=b+S))for(var O=-1;1>=O;O+=1)0>x+O||f<=x+O||(S!=0||O!=0)&&E==d.a(b+S,x+O)&&(I+=1);5<I&&(g+=3+I-5);}for(b=0;b<f-1;b+=1)for(x=0;x<f-1;x+=1)I=0,d.a(b,x)&&(I+=1),d.a(b+1,x)&&(I+=1),d.a(b,x+1)&&(I+=1),d.a(b+1,x+1)&&(I+=1),(I==0||I==4)&&(g+=3);for(b=0;b<f;b+=1)for(x=0;x<f-6;x+=1)d.a(b,x)&&!d.a(b,x+1)&&d.a(b,x+2)&&d.a(b,x+3)&&d.a(b,x+4)&&!d.a(b,x+5)&&d.a(b,x+6)&&(g+=40);for(x=0;x<f;x+=1)for(b=0;b<f-6;b+=1)d.a(b,x)&&!d.a(b+1,x)&&d.a(b+2,x)&&d.a(b+3,x)&&d.a(b+4,x)&&!d.a(b+5,x)&&d.a(b+6,x)&&(g+=40);for(x=I=0;x<f;x+=1)for(b=0;b<f;b+=1)d.a(b,x)&&(I+=1);return g+=Math.abs(100*I/f/f-50)/5*10}};return m})(),n=(function(){for(var a=Array(256),h=Array(256),m=0;8>m;m+=1)a[m]=1<<m;for(m=8;256>m;m+=1)a[m]=a[m-4]^a[m-5]^a[m-6]^a[m-8];for(m=0;255>m;m+=1)h[a[m]]=m;return {g:function(d){if(1>d)throw Error("glog("+d+")");return h[d]},i:function(d){for(;0>d;)d+=255;for(;256<=d;)d-=255;return a[d]}}})(),c=(function(){function a(d,f){switch(f){case i.L:return h[4*(d-1)];case i.M:return h[4*(d-1)+1];case i.Q:return h[4*(d-1)+2];case i.H:return h[4*(d-1)+3]}}var h=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],m={I:function(d,f){var g=a(d,f);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+d+"/errorCorrectLevel:"+f);d=g.length/3,f=[];for(var b=0;b<d;b+=1)for(var x=g[3*b],I=g[3*b+1],E=g[3*b+2],S=0;S<x;S+=1){var O=E,_={};_.o=I,_.j=O,f.push(_);}return f}};return m})();return e})());var Il=QrCreator;var Yt=class extends L{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&Il.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return u`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((t=this.label)==null?void 0:t.length)>0?this.label:this.value}
        style=${J({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Yt.styles=[V,Ol];l([$("canvas")],Yt.prototype,"canvas",2);l([p()],Yt.prototype,"value",2);l([p()],Yt.prototype,"label",2);l([p({type:Number})],Yt.prototype,"size",2);l([p()],Yt.prototype,"fill",2);l([p()],Yt.prototype,"background",2);l([p({type:Number})],Yt.prototype,"radius",2);l([p({attribute:"error-correction"})],Yt.prototype,"errorCorrection",2);l([A(["background","errorCorrection","fill","radius","size","value"])],Yt.prototype,"generate",1);Yt.define("sl-qr-code");exports.AutoFieldQRCode=class Oi extends R{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return u`
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
        `}};exports.AutoFieldQRCode=v([T("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class no extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let e=this.options.url,[r,i]=e.split("?"),s=new URLSearchParams(i);return s.set("t",Date.now().toString()),`${r}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return u`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,y`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
        `],v([$("img")],exports.AutoFieldCaptcha.prototype,"img",2),v([k()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=v([T("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class ao extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let e=this.stepCount,r=()=>{let i=Math.ceil(e*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",i.toString()),this.requestUpdate()),e--,e<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(r,this.step);};r();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let e=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(e)?Number(e[0]):Number(e),this.step=Array.isArray(e)?Number(e[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles],v([k()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),v([k()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=v([T("auto-field-verifycode")],exports.AutoFieldVerifyCode);var Rl=y`
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
`;var ot=class Ms extends L{constructor(){super(...arguments),this.localize=new W(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(o){return o instanceof Element&&o.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await Kt(this.childrenContainer);let{keyframes:o,options:e}=Ut(this,"tree-item.collapse",{dir:this.localize.dir()});await qt(this.childrenContainer,Io(o,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let o=this.parentElement;return !!o&&Ms.isTreeItem(o)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(o){o.has("selected")&&!o.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await Kt(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:o,options:e}=Ut(this,"tree-item.expand",{dir:this.localize.dir()});await qt(this.childrenContainer,Io(o,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:o=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(e=>Ms.isTreeItem(e)&&(o||!e.disabled)):[]}render(){let o=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return u`
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
            ${B(this.loading,()=>u` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${o?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${o?"chevron-left":"chevron-right"}></sl-icon>
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
                ?checked="${Ct(this.selected)}"
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
    `}};ot.styles=[V,Rl];ot.dependencies={"sl-checkbox":it,"sl-icon":q,"sl-spinner":xe};l([k()],ot.prototype,"indeterminate",2);l([k()],ot.prototype,"isLeaf",2);l([k()],ot.prototype,"loading",2);l([k()],ot.prototype,"selectable",2);l([p({type:Boolean,reflect:true})],ot.prototype,"expanded",2);l([p({type:Boolean,reflect:true})],ot.prototype,"selected",2);l([p({type:Boolean,reflect:true})],ot.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],ot.prototype,"lazy",2);l([$("slot:not([name])")],ot.prototype,"defaultSlot",2);l([$("slot[name=children]")],ot.prototype,"childrenSlot",2);l([$(".tree-item__item")],ot.prototype,"itemElement",2);l([$(".tree-item__children")],ot.prototype,"childrenContainer",2);l([$(".tree-item__expand-button slot")],ot.prototype,"expandButtonSlot",2);l([A("loading",{waitUntilFirstUpdate:true})],ot.prototype,"handleLoadingChange",1);l([A("disabled")],ot.prototype,"handleDisabledChange",1);l([A("selected")],ot.prototype,"handleSelectedChange",1);l([A("expanded",{waitUntilFirstUpdate:true})],ot.prototype,"handleExpandedChange",1);l([A("expanded",{waitUntilFirstUpdate:true})],ot.prototype,"handleExpandAnimation",1);l([A("lazy",{waitUntilFirstUpdate:true})],ot.prototype,"handleLazyChange",1);var lo=ot;Nt("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Nt("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var zl=y`
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
`;function Ll(t,o=false){function e(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let c=n.every(h=>h.selected),a=n.every(h=>!h.selected&&!h.indeterminate);s.selected=c,s.indeterminate=!c&&!a;}}function r(s){let n=s.parentElement;lo.isTreeItem(n)&&(e(n),r(n));}function i(s){for(let n of s.getChildrenItems())n.selected=o?s.selected||n.selected:!n.disabled&&s.selected,i(n);o&&e(s);}i(t),r(t);}var De=class extends L{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new W(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(o=>!!this.querySelector(`[slot="${o}-icon"]`)).forEach(o=>{let e=t.querySelector(`[slot="${o}-icon"]`),r=this.getExpandButtonIcon(o);r&&(e===null?t.append(r):e.hasAttribute("data-default")&&e.replaceWith(r));});},this.handleTreeChanged=t=>{for(let o of t){let e=[...o.addedNodes].filter(lo.isTreeItem),r=[...o.removedNodes].filter(lo.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let o=t.relatedTarget;(!o||!this.contains(o))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let o=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),lo.isTreeItem(o)&&!o.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=o,this.tabIndex=-1,o.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let e=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(e){let r=e.cloneNode(true);return [r,...r.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${t}-icon`,r}return null}selectItem(t){let o=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),Ll(t);else if(this.selection==="single"||t.isLeaf){let r=this.getAllTreeItems();for(let i of r)i.selected=i===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let e=this.selectedItems;(o.length!==e.length||e.some(r=>!o.includes(r)))&&Promise.all(e.map(r=>r.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:e}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(i=>{var s;return ["input","textarea"].includes((s=i?.tagName)==null?void 0:s.toLowerCase())}))return;let o=this.getFocusableItems(),e=this.localize.dir()==="ltr",r=this.localize.dir()==="rtl";if(o.length>0){t.preventDefault();let i=o.findIndex(a=>a.matches(":focus")),s=o[i],n=a=>{let h=o[dt(a,0,o.length-1)];this.focusItem(h);},c=a=>{s.expanded=a;};t.key==="ArrowDown"?n(i+1):t.key==="ArrowUp"?n(i-1):e&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(i+1):c(true):e&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(i-1):c(false):t.key==="Home"?n(0):t.key==="End"?n(o.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let o=t.target,e=o.closest("sl-tree-item"),r=t.composedPath().some(i=>{var s;return (s=i?.classList)==null?void 0:s.contains("tree-item__expand-button")});!e||e.disabled||o!==this.clickTarget||(r?e.expanded=!e.expanded:this.selectItem(e));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",o=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let e of o)e.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>Ll(e,true)));}get selectedItems(){let t=this.getAllTreeItems(),o=e=>e.selected;return t.filter(o)}getFocusableItems(){let t=this.getAllTreeItems(),o=new Set;return t.filter(e=>{var r;if(e.disabled)return  false;let i=(r=e.parentElement)==null?void 0:r.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||o.has(i))&&o.add(e),!o.has(e)})}render(){return u`
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
    `}};De.styles=[V,zl];l([$("slot:not([name])")],De.prototype,"defaultSlot",2);l([$("slot[name=expand-icon]")],De.prototype,"expandedIconSlot",2);l([$("slot[name=collapse-icon]")],De.prototype,"collapsedIconSlot",2);l([p()],De.prototype,"selection",2);l([A("selection")],De.prototype,"handleSelectionChange",1);De.define("sl-tree");lo.define("sl-tree-item");exports.AutoFieldTreeSelect=class Me extends R{constructor(){super(...arguments);this.nodes=new ze(this,"items",e=>e?(this._forEachTree(e,(r,i,s,n)=>{this.isItemSelected(r)&&(r.selected=true,this.selection.push({id:r[this.options.idKey],value:r[this.options.valueKey],path:n.join("/")}));}),e):[]);this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,defaultExpandLevel:2,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e,r){let i=(s,n,c,a)=>{let h=[...a,s[this.options.labelKey]];if(this.options.defaultExpandLevel>0&&c<this.options.defaultExpandLevel-1&&s.expanded===void 0&&(s.expanded=true),r(s,n,c,h),s.children){let m=c+1;s.children.forEach(d=>{i(d,s,m,[...h]);});}};(Array.isArray(e)?e:[e]).forEach(s=>{i(s,void 0,0,[]);});}onSelectionChange(e){let r=Array.from(e.detail.selection);r&&(this.selection=r.map(i=>({id:i.dataset.id,value:i.dataset.value,path:i.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(e,r,i){let s=r.includes(e[this.options.valueKey]),n=[...i,e[this.options.labelKey]];return u`<sl-tree-item
            data-id=${String(e[this.options.idKey])}
            data-value=${String(e[this.options.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${e.expanded}
        >
            ${B(e.icon,()=>u`<sl-icon name="${e.icon}"></sl-icon>`)} ${e.label}
            ${Array.isArray(e.children)?u`${e.children.map(c=>this._renderNode(c,r,n))}`:""}</sl-tree-item
        >`}_renderNodes(e){let r=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(i=>this._renderNode(i,r,[])):this._renderNode(e,r,[])}renderTree(){return u`
            ${this.nodes.render(e=>u`<sl-tree
                    class="scrollbar"
                    name="${this.name}"
                    data-path=${this.path}
                    size=${this.context.size}
                    selection="${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
                    @sl-selection-change=${this.onSelectionChange.bind(this)}
                    style="max-height:${this.options.height||"18em"};overflow:auto;"
                    >${this._renderNodes(e)}</sl-tree
                >`)}
            
        `}renderInput(){return u` ${this.renderTree()} `}};exports.AutoFieldTreeSelect.styles=[R.styles,y`
            ${Pe}
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTreeSelect=v([T("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class co extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(e){let r=e.target.dataset.id;for(let i=0;i<this.selection.length;i++)if(String(this.selection[i].id)===r){this.selection.splice(i,1),this.onFieldChange(),this.requestUpdate();break}e.stopPropagation();}getShowItemValue(e,r,i){if(r===i)return e}getSelectedTagValue(e){if(this.options.showAsPath)return u`${e.path}`;{let i=e.path.split("/");return i[i.length-1]}}renderSelectedTags(){let e=this.selection;return u`<span class="tags"
            >${tt(e,r=>u`<sl-tag data-id="${r.id}" title=${r.path} @sl-remove=${this._onRemoveSelection.bind(this)} @click=${i=>i.stopPropagation()} removable
                    >${this.getSelectedTagValue(r)}</sl-tag
                >`)}</span
        >`}renderSelection(){return u` <div class="selection" slot="trigger">
            ${B(this.selection.length===0&&this.options.placeholder,()=>u`<span class="placeholder">${this.options.placeholder}</span>`)} ${this.renderSelectedTags()}
            <span class="suffix">
                <sl-icon library="system" class="chevron ${z({active:this.active})}" name="chevron-down" aria-hidden="true"> </sl-icon>
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
        `],v([k()],exports.AutoFieldTreeDropdown.prototype,"active",2),v([$("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=v([T("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);function Vl(t){if(t)if(t.type==="checkbox"){if(t.value==="on")return t.checked;if(t.value.startsWith("[")&&t.value.endsWith("]"))try{let o=JSON.parse(t.value);return t.checked?o[0]:o[1]}catch{return t.checked}else return t.checked?t.value:null}else return t.value}var Et=class extends R{constructor(){super(...arguments);this.active=false;}static{this.styles=[R.styles,y`
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
        `];}getInitialOptions(){return {dropdown:true}}_isEmpty(){return Array.isArray(this.value)?this.value.length===0:this.value.trim()===""}_renderSelection(){return u`<div class="selection" slot="trigger">                    
                    ${B(this.options.icon,()=>u`<span class='icon'><sl-icon name="${this.options.icon}"></sl-icon></span>`)}
                    ${B(this._isEmpty()&&this.options.placeholder,()=>u`<span class='placeholder'>${this.options.placeholder}</span>`,()=>u`<span class="select-value">
                    ${this.renderSelection()}
                </span>`)}
                <span class='suffix'>
                    <sl-icon 
                        library="system" 
                        class="chevron ${z({active:this.active})}" 
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
                        distance="12"
                    >
                    ${this._renderSelection()}
                    ${this._renderContent()}
                </sl-dropdown>
            </span>
            ${this.renderAfterActions(false)}
            </div>
            `:u`${this._renderContent()}`}};v([k()],Et.prototype,"active",2);exports.AutoFieldCustom=class zo extends Et{constructor(){super(...arguments);this.selection=[];}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{placeholder:"\u8BF7\u9009\u62E9",dropdown:true,inputSelectors:"input,textarea"})}connectedCallback(){super.connectedCallback(),this._onFieldInput();}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this.onFieldInput),this.removeEventListener("change",this.onFieldInput);}}),this.addEventListener("input",this.onFieldInput),this.addEventListener("change",this.onFieldInput);}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(i=>Vl(i))}renderDropdown(){let e=this.value.map(r=>Ct(r));return u`<div class="container">${this.options.renderContent(e,u)}</div>`}};exports.AutoFieldCustom.styles=[Et.styles],v([$(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=v([T("auto-field-custom")],exports.AutoFieldCustom);function Ti(t,o){let e=t.width,r=t.height,i=t.widget,s;try{s=document.createElement(`auto-field-${i||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=t,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),o?.styles&&Object.assign(s.style,o.styles),o?.attrs){for(let n in o.attrs)s.setAttribute(n,String(o.attrs[n]));s.parent=o.parent;}return e&&(s.style.width=String(e)),r&&(s.style.height=String(r)),o?.classs&&(typeof o.classs=="string"?s.classList.add(o.classs):typeof o.classs=="object"&&Object.entries(o.classs).forEach(([n,c])=>{c?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class Lo extends Et{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange(),this._updateSelection();};this._isFirst=true;}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{children:[]})}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("change",this._handleChildrenChange),this.shadow.removeEventListener("input",this._handleChildrenChange);}_updateSelection(){this.selection&&setTimeout(()=>{let e=this.toState(this.getInputValue()),r=super.renderSelection(e);this._isFirst&&(mo(Y,this.selection),this._isFirst=false),mo(Y,this.selection,{isConnected:true}),mo(r,this.selection,{isConnected:true});});}_onChildrenChange(){this.options.children.length>0&&(this.shadow.addEventListener("change",this._handleChildrenChange),this.shadow.addEventListener("input",this._handleChildrenChange));}renderSelection(){return setTimeout(()=>this._updateSelection()),u``}getInputValue(){let e=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),r=[];return e.forEach(i=>{if(i.tagName.startsWith("AUTO-FIELD-")){let s=i.getInputValue();s===""&&(s=i.value),r.push(s);}}),r}renderDropdown(){return u`
            <div class="children">
                ${tt(this.options.children,e=>u`${Ti(e,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[Et.styles,y`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `],v([$(".selection>.select-value")],exports.AutoFieldCombine.prototype,"selection",2),exports.AutoFieldCombine=v([T("auto-field-combine")],exports.AutoFieldCombine);var ed=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"];exports.AutoFieldIcons=class po extends Et{constructor(){super(...arguments);this.active=false;this.selected=[];this.icons=[];}getInitialOptions(){return {icons:[],size:"24px",multiple:false,dropdown:false,builtIn:true}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&ed.forEach(e=>{this.icons.includes(e)||this.icons.push(e);}),this.selected=Array.isArray(this.value)?this.value:this.value.split(",");}renderView(){return this.renderIcons(this.selected)}_isSelected(e){return this.options.multiple?this.selected.includes(e):this.selected[0]===e}_onClickIcon(e){if(!this.context.viewonly)if(this.options.multiple){let r=this.selected.findIndex(i=>i===e);r>-1?this.selected.splice(r,1):this.selected.push(e),this.onFieldInput();}else this.selected.length===0?this.selected.push(e):this.selected[0]=e,this.onFieldInput();}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(e,r=true){return u`<div class="icons" style="font-size:${this.options.size}">
            ${tt(e,i=>{if(i!=="")return u`<span class="icon ${r&&this._isSelected(i)?"selected":void 0}" title="${i}" @click=${()=>this._onClickIcon(i)}
                    ><sl-icon name="${i}" size="${this.options.size}"></sl-icon
                ></span>`})}
        </div>`}renderSelection(){return this.renderIcons(this.selected,false)}renderDropdown(){return this.renderIcons(this.icons)}};exports.AutoFieldIcons.styles=[R.styles,Et.styles,y`
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
        `],v([k()],exports.AutoFieldIcons.prototype,"active",2),v([k()],exports.AutoFieldIcons.prototype,"selected",2),exports.AutoFieldIcons=v([T("auto-field-icons")],exports.AutoFieldIcons);exports.AutoFieldCascader=class pe extends Et{constructor(){super(...arguments);this.scrollbar=new Ye(this);this.active=false;this.data={};this.level=3;this.selected=[];this.focusItems=[];this.scrollbars=[];}getInitialOptions(){let e=Object.assign(super.getInitialOptions(),{idKey:"id",rootKey:"$root",labelKey:"label",maxLevel:3,childrenKey:"children",select:{}});return e.valueKey||(e.valueKey=e.idKey),e.idKey||(e.idKey=e.labelKey),e}connectedCallback(){super.connectedCallback();let e=typeof this.options.select=="object"&&this.options.childrenKey in this.options.select;e&&(this.options.rootKey=this.options.select[this.options.idKey]),this.data=e||Array.isArray(this.options.select)?this._normalizeData(this.options.select):this.options.select,this.selected=this._parseValues(this.value),this.focusItems=Array.from({length:this.options.maxLevel-1}).fill(null);}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu")?.forEach(r=>{this.scrollbars.push(this.scrollbar.create(r));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}_normalizeData(e){let r={},i=(s,n=false)=>{let c=s[this.options.idKey]||(n?"$root":void 0);if(!c)return;let a=s[this.options.childrenKey||"children"];a&&Array.isArray(a)&&a.length>0?(r[c]=a,a.forEach(h=>{i(h);})):r[c]=[];};return Array.isArray(e)?r.$root=e.reduce((s,n)=>(s.push(n),i(n),s),[]):i(e,true),r}_clearFocusItems(e){for(let r=e;r<=this.options.maxLevel;r++)Array.from(this.shadow.querySelectorAll(`[data-level='${r}']`)).forEach(s=>{s.classList.remove("focused");});}_onSelectItem(e){let r=e.detail.item;if(Number(r.dataset.level)!==this.options.maxLevel)return;let s=[],n=(a,h)=>{let m=this.data[h].findIndex(d=>String(d[this.options.idKey])===String(a));if(m>-1)return [this.data[h][m][this.options.labelKey],this.data[h][m][this.options.valueKey]]},c=this.options.rootKey;for(let a=0;a<this.focusItems.length;a++){let h=this.focusItems[a],m=n(h,c);if(!m)return;s.push([h,...m]),c=h;}this.selected=s,this.onFieldChange();}_getSelectedValue(e){let r=[],i=(n,c)=>{let a=this.data[c].findIndex(h=>String(h[this.options.idKey])===String(n));if(a>-1)return this.data[c][a][this.options.valueKey]},s=this.options.rootKey;for(let n=0;n<e.length;n++){let c=this.focusItems[n],a=i(c,s);if(!a)return;r.push(a),s=c;}return r}getInputValue(){let e=this.selected.map(r=>r[2]);return typeof this.value=="string"?e.join(this.options.delimiter||""):e}async _loadItem(e,r,i){let s;if(Array.isArray(this.data[r])&&this.data[r].length>0){e.dataset.lazy="done",this.requestUpdate();return}try{e.dataset.lazy="loading";let n=await this.options.onLoad(r);Array.isArray(n)&&(this.data[r]=n,n.forEach(c=>{c.lazy===void 0&&i<this.options.maxLevel&&(c.lazy=!0),this.data[c[this.options.idKey]]=[];}),this.requestUpdate());}catch(n){e.dataset.lazy="true",s=n;}finally{s||(e.dataset.lazy="done");}}_onItemMouseOverr(e){let r=e.target,i=r.dataset.id,s=Number(r.dataset.level);if(this.focusItems[s-1]===i)return;this._clearFocusItems(s),r.classList.add("focused"),r.dataset.lazy==="idle"&&this._loadItem(r,i,s),this.focusItems[s-1]=i,this.focusItems.forEach((c,a)=>{a>s-1&&(this.focusItems[a]=null);}),this.focusItems=[...this.focusItems];}_renderLevel(e,r=1,i){if(e)return u`<sl-menu class="level" @sl-select=${r===this.options.maxLevel?this._onSelectItem.bind(this):null}>
            ${tt(e,s=>{let n=s[this.options.idKey],c=this.selected[r-1]?.[0]===s[this.options.idKey],a=s.lazy||Array.isArray(this.data[n])&&this.data[n].length===0;return u` <sl-menu-item
                    type="checkbox"
                    data-level=${r}
                    data-id=${s[this.options.idKey]}
                    data-pid=${w(i)}
                    data-lazy=${w(a?"idle":void 0)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${c}
                    class="${w(c?"selected":void 0)}"
                >
                    ${s[this.options.labelKey]}
                    ${B(r<this.options.maxLevel,()=>u`${B(s.lazy,()=>u`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}
                </sl-menu-item>`})}
        </sl-menu>`}_parseValues(e){let r=[],i=[];if(Array.isArray(e))r=e;else if(e&&typeof e=="string")if(this.options.delimiter&&this.options.delimiter.length>0)r=e.split(this.options.delimiter);else {let s=this.data[this.options.rootKey],n=e;for(;;){let c=s.find(a=>n.startsWith(a[this.options.valueKey]));if(c){if(r.push(c[this.options.valueKey]),n=n.substring(c[this.options.valueKey].length),s=this.data[c[this.options.idKey]],!s)break}else break}}if(r.length>0){let s=this.data[this.options.rootKey];for(let n=0;n<r.length;n++){let c=r[n],a=s.find(h=>h[this.options.valueKey]===c);if(a){if(i.push([a[this.options.idKey],a[this.options.labelKey],a[this.options.valueKey]]),s=this.data[a[this.options.idKey]],!s)break}else break}}return i}renderSelection(){return u`
            ${this.selected.map(e=>e[1]).join(this.options.delimiter||"")}
        `}renderDropdown(){let e=this.data[this.options.rootKey],r=this.focusItems;return u`<div class="levels">
            ${tt(Array.from({length:this.options.maxLevel}),(i,s)=>{if(s===0)return this._renderLevel(e,s+1,this.options.rootKey);{let n=r[s-1],c=this.data[n];return c?this._renderLevel(c,s+1,n):this._renderLevel([],s+1,n)}})}
        </div>`}};exports.AutoFieldCascader.styles=[R.styles,Et.styles,Ye.styles,y`
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
        `],v([k()],exports.AutoFieldCascader.prototype,"active",2),v([k()],exports.AutoFieldCascader.prototype,"data",2),v([k()],exports.AutoFieldCascader.prototype,"level",2),v([k()],exports.AutoFieldCascader.prototype,"selected",2),v([k()],exports.AutoFieldCascader.prototype,"focusItems",2),exports.AutoFieldCascader=v([T("auto-field-cascader")],exports.AutoFieldCascader);exports.AutoFieldDateRange=class Vo extends R{getInitialOptions(){return {icon:"date",delimiter:",",includeTime:false}}_onInputChange(o){let e=o.type;this.context.validAt==="input"&&e.includes("input")?this.onFieldInput():e.includes("change")&&this.onFieldChange();}_getDate(o){return (Array.isArray(this.value)?this.value:this.value.split(this.options.delimiter))[o]}_renderIcon(){if(this.options.icon)return u`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}_renderDate(o){return u`<sl-input
            type="${this.options.includeTime?"datetime-local":"date"}"
            .value=${this._getDate(o)}
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
        `}getInputValue(){let o=Array.from(this.inputs||[]).map(e=>e.value);return Array.isArray(this.value)?o:o.join(this.options.delimiter)}};exports.AutoFieldDateRange.styles=[R.styles,y`
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
        `],v([fn("sl-input")],exports.AutoFieldDateRange.prototype,"inputs",2),exports.AutoFieldDateRange=v([T("auto-field-date-range")],exports.AutoFieldDateRange);var Pl=y`
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
`;var od=0,Xt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.attrId=++od,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=false,this.closable=false,this.disabled=false,this.tabIndex=0;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab");}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close");}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0;}render(){return this.id=this.id.length>0?this.id:this.componentId,u`
      <div
        part="base"
        class=${z({tab:true,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
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
    `}};Xt.styles=[V,Pl];Xt.dependencies={"sl-icon-button":pt};l([$(".tab")],Xt.prototype,"tab",2);l([p({reflect:true})],Xt.prototype,"panel",2);l([p({type:Boolean,reflect:true})],Xt.prototype,"active",2);l([p({type:Boolean,reflect:true})],Xt.prototype,"closable",2);l([p({type:Boolean,reflect:true})],Xt.prototype,"disabled",2);l([p({type:Number,reflect:true})],Xt.prototype,"tabIndex",2);l([A("active")],Xt.prototype,"handleActiveChange",1);l([A("disabled")],Xt.prototype,"handleDisabledChange",1);Xt.define("sl-tab");var Dl=y`
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
`;var Ml=y`
  :host {
    display: contents;
  }
`;var kr=class extends L{constructor(){super(...arguments),this.observedElements=[],this.disabled=false;}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}});}),this.disabled||this.startObserver();}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver();}handleSlotChange(){this.disabled||this.startObserver();}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let o=t.assignedElements({flatten:true});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],o.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e);});}}stopObserver(){this.resizeObserver.disconnect();}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver();}render(){return u` <slot @slotchange=${this.handleSlotChange}></slot> `}};kr.styles=[V,Ml];l([p({type:Boolean,reflect:true})],kr.prototype,"disabled",2);l([A("disabled",{waitUntilFirstUpdate:true})],kr.prototype,"handleDisabledChange",1);var bt=class extends L{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new W(this),this.hasScrollControls=false,this.shouldHideScrollStartButton=false,this.shouldHideScrollEndButton=false,this.placement="top",this.activation="auto",this.noScrollControls=false,this.fixedScrollControls=false,this.scrollOffset=1;}connectedCallback(){let t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls();}),this.mutationObserver=new MutationObserver(o=>{let e=o.filter(({target:r})=>{if(r===this)return  true;if(r.closest("sl-tab-group")!==this)return  false;let i=r.tagName.toLowerCase();return i==="sl-tab"||i==="sl-tab-panel"});if(e.length!==0){if(e.some(r=>!["aria-labelledby","aria-controls"].includes(r.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(r=>r.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(r=>r.attributeName==="active")){let i=e.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="sl-tab").map(s=>s.target).find(s=>s.active);i&&this.setActiveTab(i);}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:true,attributeFilter:["active","disabled","name","panel"],childList:true,subtree:true}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((e,r)=>{var i;e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((i=this.getActiveTab())!=null?i:this.tabs[0],{emitEvents:false}),r.unobserve(e[0].target));}).observe(this.tabGroup);});});}disconnectedCallback(){var t,o;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect(),this.nav&&((o=this.resizeObserver)==null||o.unobserve(this.nav));}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return [...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let e=t.target.closest("sl-tab");e?.closest("sl-tab-group")===this&&e!==null&&this.setActiveTab(e,{scrollBehavior:"smooth"});}handleKeyDown(t){let e=t.target.closest("sl-tab");if(e?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&e!==null&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){let i=this.tabs.find(c=>c.matches(":focus")),s=this.localize.dir()==="rtl",n=null;if(i?.tagName.toLowerCase()==="sl-tab"){if(t.key==="Home")n=this.focusableTabs[0];else if(t.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){let c=this.tabs.findIndex(a=>a===i);n=this.findNextFocusableTab(c,"backward");}else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){let c=this.tabs.findIndex(a=>a===i);n=this.findNextFocusableTab(c,"forward");}if(!n)return;n.tabIndex=0,n.focus({preventScroll:true}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(c=>{c.tabIndex=c===n?0:-1;}),["top","bottom"].includes(this.placement)&&lr(n,this.nav,"horizontal"),t.preventDefault();}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"});}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"});}setActiveTab(t,o){if(o=St({emitEvents:true,scrollBehavior:"auto"},o),t!==this.activeTab&&!t.disabled){let e=this.activeTab;this.activeTab=t,this.tabs.forEach(r=>{r.active=r===this.activeTab,r.tabIndex=r===this.activeTab?0:-1;}),this.panels.forEach(r=>{var i;return r.active=r.name===((i=this.activeTab)==null?void 0:i.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&lr(this.activeTab,this.nav,"horizontal",o.scrollBehavior),o.emitEvents&&(e&&this.emit("sl-tab-hide",{detail:{name:e.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}));}}setAriaLabels(){this.tabs.forEach(t=>{let o=this.panels.find(e=>e.name===t.panel);o&&(t.setAttribute("aria-controls",o.getAttribute("id")),o.setAttribute("aria-labelledby",t.getAttribute("id")));});}repositionIndicator(){let t=this.getActiveTab();if(!t)return;let o=t.clientWidth,e=t.clientHeight,r=this.localize.dir()==="rtl",i=this.getAllTabs(),n=i.slice(0,i.indexOf(t)).reduce((c,a)=>({left:c.left+a.clientWidth,top:c.top+a.clientHeight}),{left:0,top:0});switch(this.placement){case "top":case "bottom":this.indicator.style.width=`${o}px`,this.indicator.style.height="auto",this.indicator.style.translate=r?`${ -1*n.left}px`:`${n.left}px`;break;case "start":case "end":this.indicator.style.width="auto",this.indicator.style.height=`${e}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls());}findNextFocusableTab(t,o){let e=null,r=o==="forward"?1:-1,i=t+r;for(;t<this.tabs.length;){if(e=this.tabs[i]||null,e===null){o==="forward"?e=this.focusableTabs[0]:e=this.focusableTabs[this.focusableTabs.length-1];break}if(!e.disabled)break;i+=r;}return e}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd());}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=false:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons();}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none";}show(t){let o=this.tabs.find(e=>e.panel===t);o&&this.setActiveTab(o,{scrollBehavior:"smooth"});}render(){let t=this.localize.dir()==="rtl";return u`
      <div
        part="base"
        class=${z({"tab-group":true,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?u`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${z({"tab-group__scroll-button":true,"tab-group__scroll-button--start":true,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
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
                  class=${z({"tab-group__scroll-button":true,"tab-group__scroll-button--end":true,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
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
    `}};bt.styles=[V,Dl];bt.dependencies={"sl-icon-button":pt,"sl-resize-observer":kr};l([$(".tab-group")],bt.prototype,"tabGroup",2);l([$(".tab-group__body")],bt.prototype,"body",2);l([$(".tab-group__nav")],bt.prototype,"nav",2);l([$(".tab-group__indicator")],bt.prototype,"indicator",2);l([k()],bt.prototype,"hasScrollControls",2);l([k()],bt.prototype,"shouldHideScrollStartButton",2);l([k()],bt.prototype,"shouldHideScrollEndButton",2);l([p()],bt.prototype,"placement",2);l([p()],bt.prototype,"activation",2);l([p({attribute:"no-scroll-controls",type:Boolean})],bt.prototype,"noScrollControls",2);l([p({attribute:"fixed-scroll-controls",type:Boolean})],bt.prototype,"fixedScrollControls",2);l([Ce({passive:true})],bt.prototype,"updateScrollButtons",1);l([A("noScrollControls",{waitUntilFirstUpdate:true})],bt.prototype,"updateScrollControls",1);l([A("placement",{waitUntilFirstUpdate:true})],bt.prototype,"syncIndicator",1);bt.define("sl-tab-group");var rd=(t,o)=>{let e=0;return function(...r){window.clearTimeout(e),e=window.setTimeout(()=>{t.call(this,...r);},o);}},Fl=(t,o,e)=>{let r=t[o];t[o]=function(...i){r.call(this,...i),e.call(this,r,...i);};};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){let o=new Set,e=new WeakMap,r=s=>{for(let n of s.changedTouches)o.add(n.identifier);},i=s=>{for(let n of s.changedTouches)o.delete(n.identifier);};document.addEventListener("touchstart",r,true),document.addEventListener("touchend",i,true),document.addEventListener("touchcancel",i,true),Fl(EventTarget.prototype,"addEventListener",function(s,n){if(n!=="scrollend")return;let c=rd(()=>{o.size?c():this.dispatchEvent(new Event("scrollend"));},100);s.call(this,"scroll",c,{passive:true}),e.set(this,c);}),Fl(EventTarget.prototype,"removeEventListener",function(s,n){if(n!=="scrollend")return;let c=e.get(this);c&&s.call(this,"scroll",c,{passive:true});});}})();var Hl=y`
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
`;var id=0,Po=class extends L{constructor(){super(...arguments),this.attrId=++id,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=false;}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel");}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true");}render(){return u`
      <slot
        part="base"
        class=${z({"tab-panel":true,"tab-panel--active":this.active})}
      ></slot>
    `}};Po.styles=[V,Hl];l([p({reflect:true})],Po.prototype,"name",2);l([p({type:Boolean,reflect:true})],Po.prototype,"active",2);l([A("active")],Po.prototype,"handleActiveChange",1);Po.define("sl-tab-panel");q.define("sl-icon");var Bl=y`
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
`;var Ii=y`    
    ${Bl}
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
`;var ie=class extends lt{constructor(){super();this.forms=[];bo();}static{this.styles=[Ii,Pe,y`
            :host {
                display: block;
                width: 100%;
                background-color: var(--auto-bgcolor);
                    font: var(--auto-font);
            }
        `];}firstUpdated(){this.forms=this.getForms(),this.forms.length===0&&setTimeout(()=>{this.forms=this.getForms();});}getForms(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}bind(e){this.store=e,this.forms&&this.forms.forEach(r=>{r.bind&&r.bind(e);});}getFormInfo(e,r){let i=e.getAttribute("icon")||e.dataset.icon,s=e.getAttribute("label")||e.dataset.label,n=e.getAttribute("title")||e.dataset.title,c=e.getAttribute("name")||e.dataset.name||"",a=this.active?this.active.split(",").includes(c):r===0;return {icon:i,label:s,title:n,name:c,active:a}}renderGroups(){}render(){return u`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `}};v([$("slot")],ie.prototype,"slotElement",2),v([p()],ie.prototype,"active",2),v([k()],ie.prototype,"forms",2);exports.AutoFormTabs=class ho extends ie{constructor(){super(...arguments);this.direction="top";this.hideLabel=false;}_getPlacement(){return this.direction==="left"?"start":this.direction==="right"?"end":this.direction}renderGroups(){return u`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${()=>this.dispatchEvent(new CustomEvent("tab-change"))}"
            >
                ${this.forms.map((e,r)=>{if(e.tagName!=="AUTO-FORM")return;let i=this.getFormInfo(e,r);return e.bind&&e.bind(this.store),e.setAttribute("border","none"),u`
                        <sl-tab
                            ?active=${i.active}
                            slot="nav"
                            title="${w(i.title||i.label)}"
                            panel="${r}"
                        >
                            ${i.icon?u`<sl-icon name="${i.icon}"></sl-icon>`:""}
                            ${B(!this.hideLabel&&i.label,()=>u`<span class="label">${i.label}</span>`)}
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
        `],v([p({type:String,reflect:true})],exports.AutoFormTabs.prototype,"direction",2),v([p({type:Boolean,reflect:true})],exports.AutoFormTabs.prototype,"hideLabel",2),exports.AutoFormTabs=v([T("auto-form-tabs")],exports.AutoFormTabs);var Wl=y`
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
`;var Qt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.open=false,this.disabled=false;}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=true),this.detailsObserver=new MutationObserver(t=>{for(let o of t)o.type==="attributes"&&o.attributeName==="open"&&(this.details.open?this.show():this.hide());}),this.detailsObserver.observe(this.details,{attributes:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect();}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus());}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show());}async handleOpenChange(){if(this.open){if(this.details.open=true,this.emit("sl-show",{cancelable:true}).defaultPrevented){this.open=false,this.details.open=false;return}await Kt(this.body);let{keyframes:o,options:e}=Ut(this,"details.show",{dir:this.localize.dir()});await qt(this.body,Io(o,this.body.scrollHeight),e),this.body.style.height="auto",this.emit("sl-after-show");}else {if(this.emit("sl-hide",{cancelable:true}).defaultPrevented){this.details.open=true,this.open=true;return}await Kt(this.body);let{keyframes:o,options:e}=Ut(this,"details.hide",{dir:this.localize.dir()});await qt(this.body,Io(o,this.body.scrollHeight),e),this.body.style.height="auto",this.details.open=false,this.emit("sl-after-hide");}}async show(){if(!(this.open||this.disabled))return this.open=true,ve(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=false,ve(this,"sl-after-hide")}render(){let t=this.localize.dir()==="rtl";return u`
      <details
        part="base"
        class=${z({details:true,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
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
    `}};Qt.styles=[V,Wl];Qt.dependencies={"sl-icon":q};l([$(".details")],Qt.prototype,"details",2);l([$(".details__header")],Qt.prototype,"header",2);l([$(".details__body")],Qt.prototype,"body",2);l([$(".details__expand-icon-slot")],Qt.prototype,"expandIconSlot",2);l([p({type:Boolean,reflect:true})],Qt.prototype,"open",2);l([p()],Qt.prototype,"summary",2);l([p({type:Boolean,reflect:true})],Qt.prototype,"disabled",2);l([A("open",{waitUntilFirstUpdate:true})],Qt.prototype,"handleOpenChange",1);Nt("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Nt("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});Qt.define("sl-details");var jl=y`
    ${Ur}
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
    ${Pe}
`;exports.AutoCollapse=class de extends lt{constructor(){super(...arguments);this.active="";this.accordion=false;this.panels=[];this._activeArray=[];}firstUpdated(){this.panels=this.getPanels();}connectedCallback(){super.connectedCallback(),bo(),this._activeArray=this.active?this.active.split(","):[];}getPanels(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}updated(e){e.has("active")&&typeof this.active=="string"&&(this._activeArray=this.active?this.active.split(","):[]),super.updated(e);}togglePanel(e){let r=this._activeArray.indexOf(e);if(r===-1)this.accordion?this._activeArray=[e]:this._activeArray=[...this._activeArray,e];else {let i=[...this._activeArray];i.splice(r,1),this._activeArray=i;}this.active=this._activeArray.join(","),this.dispatchEvent(new CustomEvent("change",{detail:{active:this.active}}));}isPanelActive(e){return this._activeArray.includes(e)}_onActionClick(e,r){let i=new CustomEvent("action-click",{detail:{name:e},composed:true,bubbles:true});r.stopPropagation(),this.dispatchEvent(i);}_renderHeaderActions(e){let r=(e.getAttribute("data-actions")||"").split(",");if(r.length>0)return tt(r,i=>{let[s,n]=i.split(":");return u`<sl-icon
                    part="action"
                    class="icon action"
                    name=${s}
                    title=${n}
                    @click=${c=>{this._onActionClick(s,c);}}
                ></sl-icon>`})}_renderHeader(e){let r=e.getAttribute("name")||e.dataset.name||"",i=e.getAttribute("label")||e.dataset.label||"",s=e.getAttribute("icon")||e.dataset.icon||"",n=this.isPanelActive(r);return u`
            <div
                part="header"
                class="header ${z({active:n})}"
                @click=${()=>this.togglePanel(r)}
            >
                ${s?u`<sl-icon name="${s}" class="icon"></sl-icon>`:""}
                <div part="label" class="label">${i}</div>
                ${this._renderHeaderActions(e)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `}renderPanels(){return this.panels.map(e=>{let r=e.getAttribute("name")||e.dataset.name||"",i=this.isPanelActive(r),s=J({padding:this.padding});return u`
                ${this._renderHeader(e)}
                <div
                    part="content"
                    class="content scrollbar ${z({active:i})}"
                    style=${s}
                >
                    ${e}
                </div>
            `})}_onSlotChange(){let e=this.getPanels();if(e.length>0){let r=this.panels.map(s=>s.getAttribute("name")||s.dataset.name).filter(s=>!!s),i=e.filter(s=>!r.includes(s.getAttribute("name")||s.dataset.name));this.panels.push(...i),this.requestUpdate();}}render(){return u`
            ${this.renderPanels()}
            <slot @slotchange=${this._onSlotChange.bind(this)} style="display:none;"></slot>
        `}};exports.AutoCollapse.styles=[jl],v([p({type:String,reflect:true})],exports.AutoCollapse.prototype,"active",2),v([p({type:String,reflect:true})],exports.AutoCollapse.prototype,"padding",2),v([p({type:Boolean,reflect:true})],exports.AutoCollapse.prototype,"accordion",2),v([k()],exports.AutoCollapse.prototype,"panels",2),v([k()],exports.AutoCollapse.prototype,"_activeArray",2),exports.AutoCollapse=v([T("auto-collapse")],exports.AutoCollapse);exports.AutoFormCollapse=class Fe extends ie{constructor(){super(...arguments);this.active="";this.accordion=false;}renderGroups(){return u`
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
        `],v([p({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"active",2),v([p({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"padding",2),v([p({type:Boolean,reflect:true})],exports.AutoFormCollapse.prototype,"accordion",2),exports.AutoFormCollapse=v([T("auto-form-collapse")],exports.AutoFormCollapse);var Nl=y`
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

`;exports.AutoFlex=class Vt extends lt{constructor(){super(...arguments);this.classes=new Ae(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let e=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=e,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(r=>{r.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(r=>{r.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(e,r,i){super.attributeChangedCallback(e,r,i),this.updateStyles();}render(){return u` <slot></slot> `}};exports.AutoFlex.styles=Nl,v([p({type:String})],exports.AutoFlex.prototype,"direction",2),v([p({type:String})],exports.AutoFlex.prototype,"gap",2),v([p({type:Boolean})],exports.AutoFlex.prototype,"wrap",2),v([p({type:String})],exports.AutoFlex.prototype,"align",2),v([p({type:String})],exports.AutoFlex.prototype,"justify",2),v([p({type:String})],exports.AutoFlex.prototype,"border",2),v([p({type:String})],exports.AutoFlex.prototype,"grow",2),v([p({type:String})],exports.AutoFlex.prototype,"shrink",2),v([p({type:Boolean,reflect:true})],exports.AutoFlex.prototype,"fit",2),exports.AutoFlex=v([T("auto-flex")],exports.AutoFlex);exports.AutoLoading=class He extends lt{constructor(){super(...arguments);this.tips="Loading";this.hide=false;this.size="2em";}render(){return this.hide?u``:u`  
            <sl-spinner style="font-size:${this.size};"></sl-spinner>
            <div>${this.tips}</div>
        `}};exports.AutoLoading.styles=y`    
        :host{
            display: flex;
            flex-direction: column;
            gap:0.5em;
            align-items: center;
            justify-content: center;
            height: 6em;
        }        
    `,v([p({type:String})],exports.AutoLoading.prototype,"tips",2),v([p({type:Boolean})],exports.AutoLoading.prototype,"hide",2),v([p({type:String})],exports.AutoLoading.prototype,"size",2),exports.AutoLoading=v([T("auto-loading")],exports.AutoLoading);G.define("sl-button");F.define("sl-input");var Ul=y`
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
`;var $r=class extends L{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};$r.styles=[V,Ul];l([p({type:Boolean,reflect:true})],$r.prototype,"vertical",2);l([A("vertical")],$r.prototype,"handleVerticalChange",1);$r.define("sl-divider");ut.define("sl-dropdown");xe.define("sl-spinner");pt.define("sl-icon-button");var rt=class rt extends lt{constructor(){super(...arguments);this.classs=new Ae(this);this.ctxController=new _o(this);this.seq=++rt.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this._loading=false;}static{this.seq=0;}static{this.styles=Ii;}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}connectedCallback(){super.connectedCallback(),this.bind(this.store),bo();}shouldUpdate(e){return e.has("store")&&this.bind(this.store),true}attributeChangedCallback(e,r,i){super.attributeChangedCallback(e,r,i),["group","sort","advanced","path"].includes(e)?setTimeout(()=>this._load()):e==="store"&&this.bind(i);}_initialContext(){Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit});}_isValid(){if(this.path){let e=this.store.schemas.errors||{};return Object.keys(e).some(r=>ks(this.path.split("."),r.split(".")))}else return Object.keys(this.store.schemas.errors).length>0}_load(e=true){if(this.store&&!this._loading)try{this._initialContext();let r=this.path?this.store.schemas.find(this.path):Object.values(this.store.schemas.store.state),i=s=>{if(!this.group||["default","general"].includes(this.group)&&s.group===void 0||["","*"].includes(this.group))return !0;let n=(s.group||"").split(","),c=this.group.split(",");return n.some(a=>c.includes(a))};this.schemas=Object.values(r).filter(s=>!(!i(s)||this.advanced===!1&&s.advanced)).sort((s,n)=>(s.order||0)-(n.order||0)),e&&this.requestUpdate();}finally{this._loading=false;}}bind(e){e&&(this.store=e,this._load(true));}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(r=>{r.tagName.startsWith("auto-field")&&(r.invalidTips=void 0);}),this.requestUpdate();}_renderFields(){return u` ${this.schemas.map(e=>u`${Ti(e,{attrs:{size:this.size}})}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),u`
            <div class="actions header"></div>
            <div class="fields">${this._renderFields()}</div>
            <div class="actions footer"></div>
        `}reset(){this.store?.reset(),this._initialContext(),wo(this,"dirty",false),wo(this,"invalid",false);}submit(e){if(typeof e=="function"){let r=this.store?.schemas.getValues()||{},i=this.store?.schemas.errors;e(r,i);}}};v([is({context:Nr})],rt.prototype,"context",2),v([p({type:Object})],rt.prototype,"store",2),v([p({type:Boolean,reflect:true})],rt.prototype,"validAtInit",2),v([p({type:String,reflect:true})],rt.prototype,"group",2),v([p({type:String,reflect:true})],rt.prototype,"icon",2),v([p({type:String,reflect:true})],rt.prototype,"path",2),v([p({type:Boolean,reflect:true})],rt.prototype,"compact",2),v([p({type:Boolean,reflect:true})],rt.prototype,"advanced",2),v([p({type:String,reflect:true})],rt.prototype,"validAt",2),v([p({type:String,reflect:true})],rt.prototype,"border",2),v([p({type:String})],rt.prototype,"size",2),v([p({type:String,reflect:true})],rt.prototype,"labelPos",2),v([p({type:String,reflect:true})],rt.prototype,"labelWidth",2),v([p({type:Boolean,reflect:true})],rt.prototype,"dark",2),v([p({type:Boolean,reflect:true})],rt.prototype,"readonly",2),v([p({type:Boolean,reflect:true})],rt.prototype,"viewonly",2),v([p({type:String,reflect:true})],rt.prototype,"viewAlign",2),v([p({type:String,reflect:true})],rt.prototype,"layout",2),v([p({type:String,reflect:true})],rt.prototype,"icons",2);var Fs=rt;customElements.get("auto-form")||customElements.define("auto-form",Fs);/*! Bundled license information:

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
*/exports.AutoField=R;exports.AutoForm=Fs;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map