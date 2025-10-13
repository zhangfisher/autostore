var AutoForm=(function(exports){'use strict';var Kl=Object.defineProperty;var Gl=Object.getOwnPropertyDescriptor;var Be=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(r,e)=>(typeof require<"u"?require:r)[e]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var v=(t,r,e,o)=>{for(var i=o>1?void 0:o?Gl(r,e):r,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(o?n(r,e,i):n(i))||i);return o&&i&&Kl(r,e,i),i};function Bs(t){let r=t.trim();if(r.startsWith("#")&&(r=r.slice(1)),r.length===3?r=r.replace(/(.)/g,"$1$1"):r.length===4&&(r=r.replace(/(.)/g,"$1$1")),r.length>6&&(r=r.slice(0,6)),!/^[0-9a-f]{6}$/i.test(r))throw new Error("Invalid hex color");let e=parseInt(r,16),o=e>>16&255,i=e>>8&255,s=e&255;return [o,i,s]}function Yl(t){let r=Bs(t);return (r[0]*2126+r[1]*7152+r[2]*722)/1e4<128}function Xl(t){let[r,e,o]=Array.isArray(t)?t:Bs(t),i=r/255,s=e/255,n=o/255,c=Math.max(i,s,n),a=Math.min(i,s,n),h=c-a,m=0,d=0,f=(c+a)/2;return h!==0&&(c===i?m=((s-n)/h+(s<n?6:0))/6:c===s?m=((n-i)/h+2)/6:m=((i-s)/h+4)/6),h!==0&&(d=h/(1-Math.abs(2*f-1))),[Math.round(m*360),Math.round(d*100),Math.round(f*100)]}function Hs(t){let[r,e,o]=t,i=r/360,s=e/100,n=o/100,c=(1-Math.abs(2*n-1))*s,a=c*(1-Math.abs(i*6%2-1)),h=n-c/2,m=0,d=0,f=0;0<=i&&i<1/6?(m=c,d=a,f=0):1/6<=i&&i<2/6?(m=a,d=c,f=0):2/6<=i&&i<3/6?(m=0,d=c,f=a):3/6<=i&&i<4/6?(m=0,d=a,f=c):4/6<=i&&i<5/6?(m=a,d=0,f=c):(m=c,d=0,f=a);let g=b=>Math.round((b+h)*255).toString(16).padStart(2,"0");return `#${g(m)}${g(d)}${g(f)}`}function Ql(t){let{color:r,range:e,dark:o,count:i}=Object.assign({range:[5,98],count:5},t),s=Xl(r),n=o??Yl(r),c=Array.from({length:2*i+1});c[i]=r;let a=Math.abs(s[2]-e[0]),h=a/i,m=s[2];for(let d=i-1;d>=0;d--)m=m+(n?-1:1)*h,m<0&&(m=0),m>100&&(m=100),c[d]=Hs([s[0],s[1],m]);m=s[2],a=Math.abs(s[2]-e[1]),h=a/i;for(let d=i+1;d<i*2+1;d++)m=m+(n?1:-1)*h,m<0&&(m=0),m>100&&(m=100),c[d]=Hs([s[0],s[1],m]);return {colors:c,dark:n}}function We(t,r){let e=Object.assign({levels:[5,1,2,3,4,5],range:[10,98],count:5},typeof r=="string"?{color:r}:r),{colors:o,dark:i}=Ql(e),s={};o.reduce((c,a,h)=>(s[`${t}${h}`]=a,c),{});let n=`--t-${t.split("-")[4]}`;return e.levels&&(s[`${n}-color`]=`var(${t}${e.levels[0]})`,s[`${n}-bgcolor`]=`var(${t}${e.levels[1]})`,e.levels.slice(2).forEach((c,a)=>{s[`${n}-bgcolor-${a+1}`]=`var(${t}${c})`;})),{vars:s,colors:o,dark:i}}function Ri(t=10){return Math.random().toString(36).substring(2,t+2)}function Ws(t,r){if(globalThis.document==null)return;let{id:e,mode:o,location:i="head"}=Object.assign({mode:"default"},r),s=document.head.querySelector(`#${e}`),n=e||Ri();return s?(o=="replace"?s.innerHTML=t:o=="append"&&(s.innerHTML+=t),n):(s=document.createElement("style"),s.innerHTML=t,s.id=n,r?.el?r.el.appendChild(s):i=="head"?document.head.appendChild(s):document.body.appendChild(s),s)}function Zl(t){let r=Object.assign({name:Ri(),variants:{}},t),e=Object.assign({prefix:"--t-color-theme-",range:[10,100],levels:[10,1,2,3,4,5]},typeof r.theme=="string"?{color:r.theme}:r.theme),o=r.selector||":root,:host",{vars:i,dark:s}=We("--t-color-theme-",e);r.variants.primary&&We("--t-color-primary-",r.variants.primary),r.variants.danger&&We("--t-color-danger-",r.variants.danger),r.variants.success&&We("--t-color-success-",r.variants.success),r.variants.warning&&We("--t-color-warning-",r.variants.warning),r.variants.info&&We("--t-color-info-",r.variants.info);let n=`${o}[data-theme=${r.name}]{
        ${`color-schema: ${s?"dark":"light"}`};
        ${Object.entries(i).map(([c,a])=>`${c}:${a}`).join(`;
`)}}`;return Ws(n,{id:`theme-${r.name||Ri()}`,mode:"replace"}),n}var zi=class{root;constructor(){this.root=document.documentElement,document.addEventListener("DOMContentLoaded",this._onDomContentLoaded.bind(this));}get size(){return this.root.dataset.size||"medium"}set size(r){this.root.dataset.size=r;}get spacing(){return this.root.dataset.spacing||"medium"}set spacing(r){this.root.dataset.spacing=String(r);}get radius(){return this.root.dataset.radius||"medium"}set radius(r){this.root.dataset.radius=r;}get theme(){return this.root.dataset.theme||"light"}set theme(r){this.root.dataset.theme=r;}_onDomContentLoaded(){this.root=document.documentElement;}createVariant(r,e){let{vars:o}=We(`--t-color-${r}-`,e),i=`${this.theme==="light"?":root,:host":`:host,
:root[data-theme=${this.theme}]`}{${Object.entries(o).map(([s,n])=>`${s}: ${n};`).join(`
`)}`;Ws(i,{id:`t-${this.theme}-${r}`,mode:"replace"});}create(r){Zl(r);}},Jl=new zi;globalThis.ThemePro=Jl;var zo=globalThis,Eo=zo.trustedTypes,js=Eo?Eo.createPolicy("lit-html",{createHTML:t=>t}):void 0,Vi="$lit$",he=`lit$${Math.random().toFixed(9).slice(2)}$`,Pi="?"+he,tc=`<${Pi}>`,Ue=zo.document===void 0?{createTreeWalker:()=>({})}:document,Dr=()=>Ue.createComment(""),Mr=t=>t===null||typeof t!="object"&&typeof t!="function",Di=Array.isArray,Ys=t=>Di(t)||typeof t?.[Symbol.iterator]=="function",Li=`[ 	
\f\r]`,Pr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ns=/-->/g,Us=/>/g,je=RegExp(`>|${Li}(?:([^\\s"'>=/]+)(${Li}*=${Li}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qs=/'/g,Ks=/"/g,Xs=/^(?:script|style|textarea|title)$/i,Mi=t=>(r,...e)=>({_$litType$:t,strings:r,values:e}),u=Mi(1),at=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Gs=new WeakMap,Ne=Ue.createTreeWalker(Ue,129);function Js(t,r){if(!Di(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return js!==void 0?js.createHTML(r):r}var tn=(t,r)=>{let e=t.length-1,o=[],i,s=r===2?"<svg>":r===3?"<math>":"",n=Pr;for(let c=0;c<e;c++){let a=t[c],h,m,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,m=n.exec(a),m!==null);)f=n.lastIndex,n===Pr?m[1]==="!--"?n=Ns:m[1]!==void 0?n=Us:m[2]!==void 0?(Xs.test(m[2])&&(i=RegExp("</"+m[2],"g")),n=je):m[3]!==void 0&&(n=je):n===je?m[0]===">"?(n=i??Pr,d=-1):m[1]===void 0?d=-2:(d=n.lastIndex-m[2].length,h=m[1],n=m[3]===void 0?je:m[3]==='"'?Ks:qs):n===Ks||n===qs?n=je:n===Ns||n===Us?n=Pr:(n=je,i=void 0);let g=n===je&&t[c+1].startsWith("/>")?" ":"";s+=n===Pr?a+tc:d>=0?(o.push(h),a.slice(0,d)+Vi+a.slice(d)+he+g):a+he+(d===-2?c:g);}return [Js(t,s+(t[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),o]},Fr=class t{constructor({strings:r,_$litType$:e},o){let i;this.parts=[];let s=0,n=0,c=r.length-1,a=this.parts,[h,m]=tn(r,e);if(this.el=t.createElement(h,o),Ne.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes);}for(;(i=Ne.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Vi)){let f=m[n++],g=i.getAttribute(d).split(he),b=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?Oo:b[1]==="?"?To:b[1]==="@"?Io:Ke}),i.removeAttribute(d);}else d.startsWith(he)&&(a.push({type:6,index:s}),i.removeAttribute(d));if(Xs.test(i.tagName)){let d=i.textContent.split(he),f=d.length-1;if(f>0){i.textContent=Eo?Eo.emptyScript:"";for(let g=0;g<f;g++)i.append(d[g],Dr()),Ne.nextNode(),a.push({type:2,index:++s});i.append(d[f],Dr());}}}else if(i.nodeType===8)if(i.data===Pi)a.push({type:2,index:s});else {let d=-1;for(;(d=i.data.indexOf(he,d+1))!==-1;)a.push({type:7,index:s}),d+=he.length-1;}s++;}}static createElement(r,e){let o=Ue.createElement("template");return o.innerHTML=r,o}};function qe(t,r,e=t,o){if(r===at)return r;let i=o!==void 0?e._$Co?.[o]:e._$Cl,s=Mr(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(false),s===void 0?i=void 0:(i=new s(t),i._$AT(t,e,o)),o!==void 0?(e._$Co??=[])[o]=i:e._$Cl=i),i!==void 0&&(r=qe(t,i._$AS(t,r.values),i,o)),r}var Ao=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:o}=this._$AD,i=(r?.creationScope??Ue).importNode(e,true);Ne.currentNode=i;let s=Ne.nextNode(),n=0,c=0,a=o[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new hr(s,s.nextSibling,this,r):a.type===1?h=new a.ctor(s,a.name,a.strings,this,r):a.type===6&&(h=new Ro(s,this,r)),this._$AV.push(h),a=o[++c];}n!==a?.index&&(s=Ne.nextNode(),n++);}return Ne.currentNode=Ue,i}p(r){let e=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(r,o,e),e+=o.strings.length-2):o._$AI(r[e])),e++;}},hr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,o,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??true;}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=qe(this,r,e),Mr(r)?r===Y||r==null||r===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):r!==this._$AH&&r!==at&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Ys(r)?this.k(r):this._(r);}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r));}_(r){this._$AH!==Y&&Mr(this._$AH)?this._$AA.nextSibling.data=r:this.T(Ue.createTextNode(r)),this._$AH=r;}$(r){let{values:e,_$litType$:o}=r,i=typeof o=="number"?this._$AC(r):(o.el===void 0&&(o.el=Fr.createElement(Js(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else {let s=new Ao(i,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s;}}_$AC(r){let e=Gs.get(r.strings);return e===void 0&&Gs.set(r.strings,e=new Fr(r)),e}k(r){Di(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,o,i=0;for(let s of r)i===e.length?e.push(o=new t(this.O(Dr()),this.O(Dr()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i);}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(false,true,e);r!==this._$AB;){let o=r.nextSibling;r.remove(),r=o;}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r));}},Ke=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,o,i,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Y;}_$AI(r,e=this,o,i){let s=this.strings,n=false;if(s===void 0)r=qe(this,r,e,0),n=!Mr(r)||r!==this._$AH&&r!==at,n&&(this._$AH=r);else {let c=r,a,h;for(r=s[0],a=0;a<s.length-1;a++)h=qe(this,c[o+a],e,a),h===at&&(h=this._$AH[a]),n||=!Mr(h)||h!==this._$AH[a],h===Y?r=Y:r!==Y&&(r+=(h??"")+s[a+1]),this._$AH[a]=h;}n&&!i&&this.j(r);}j(r){r===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"");}},Oo=class extends Ke{constructor(){super(...arguments),this.type=3;}j(r){this.element[this.name]=r===Y?void 0:r;}},To=class extends Ke{constructor(){super(...arguments),this.type=4;}j(r){this.element.toggleAttribute(this.name,!!r&&r!==Y);}},Io=class extends Ke{constructor(r,e,o,i,s){super(r,e,o,i,s),this.type=5;}_$AI(r,e=this){if((r=qe(this,r,e,0)??Y)===at)return;let o=this._$AH,i=r===Y&&o!==Y||r.capture!==o.capture||r.once!==o.once||r.passive!==o.passive,s=r!==Y&&(o===Y||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,r),this._$AH=r;}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r);}},Ro=class{constructor(r,e,o){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o;}get _$AU(){return this._$AM._$AU}_$AI(r){qe(this,r);}},en={I:hr},ec=zo.litHtmlPolyfillSupport;ec?.(Fr,hr),(zo.litHtmlVersions??=[]).push("3.3.1");var ur=(t,r,e)=>{let o=e?.renderBefore??r,i=o._$litPart$;if(i===void 0){let s=e?.renderBefore??null;o._$litPart$=i=new hr(r.insertBefore(Dr(),s),s,void 0,e??{});}return i._$AI(t),i};var w=t=>t??Y;var rn=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(r){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=r;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var ne=function(t,r,e,o,i){if(typeof r=="function"?t!==r||true:!r.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r.set(t,e),e},vt=function(t,r,e,o){if(typeof r=="function"?t!==r||!o:!r.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?o:e==="a"?o.call(t):o?o.value:r.get(t)},mr,Lo,Vo,Hr,Fi,Br,Po,Ge,Wr,we,Do,on,sn=t=>typeof t=="boolean"?t:t?.capture??false;var Hi=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(r,e,o){if(e==null)return;let i=sn(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);if(s===void 0)s=new Map,i.set(r,s);else if(s.has(e))return;let n=typeof o=="object"&&o?o:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(r,e,o)),s.set(e,n??{});}removeEventListener(r,e,o){if(e==null)return;let i=sn(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);s!==void 0&&(s.delete(e),s.size||i.delete(r));}dispatchEvent(r){let e=[this],o=this.__eventTargetParent;if(r.composed)for(;o;)e.push(o),o=o.__eventTargetParent;else for(;o&&o!==this.__host;)e.push(o),o=o.__eventTargetParent;let i=false,s=false,n=0,c=null,a=null,h=null,m=r.stopPropagation,d=r.stopImmediatePropagation;Object.defineProperties(r,{target:{get(){return c??a},...Z},srcElement:{get(){return r.target},...Z},currentTarget:{get(){return h},...Z},eventPhase:{get(){return n},...Z},composedPath:{value:()=>e,...Z},stopPropagation:{value:()=>{i=true,m.call(r);},...Z},stopImmediatePropagation:{value:()=>{s=true,d.call(r);},...Z}});let f=(E,S,O)=>{typeof E=="function"?E(r):typeof E?.handleEvent=="function"&&E.handleEvent(r),S.once&&O.delete(E);},g=()=>(h=null,n=0,!r.defaultPrevented),b=e.slice().reverse();c=!this.__host||!r.composed?this:null;let x=E=>{for(a=this;a.__host&&E.includes(a.__host);)a=a.__host;};for(let E of b){!c&&(!a||a===E.__host)&&x(b.slice(b.indexOf(E))),h=E,n=E===r.target?2:1;let S=E.__captureEventListeners.get(r.type);if(S){for(let[O,_]of S)if(f(O,_,S),s)return g()}if(i)return g()}let I=r.bubbles?e:[this];a=null;for(let E of I){!c&&(!a||E===a.__host)&&x(I.slice(0,I.indexOf(E)+1)),h=E,n=E===r.target?2:3;let S=E.__eventListeners.get(r.type);if(S){for(let[O,_]of S)if(f(O,_,S),s)return g()}if(i)return g()}return g()}},Bi=Hi;var Z={__proto__:null};Z.enumerable=true;Object.freeze(Z);var Wi=(we=class{constructor(r,e={}){if(mr.set(this,false),Lo.set(this,false),Vo.set(this,false),Hr.set(this,false),Fi.set(this,Date.now()),Br.set(this,false),Po.set(this,void 0),Ge.set(this,void 0),Wr.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof e!="object"||!e)throw new Error('The "options" argument must be an object');let{bubbles:o,cancelable:i,composed:s}=e;ne(this,mr,!!i),ne(this,Lo,!!o),ne(this,Vo,!!s),ne(this,Po,`${r}`),ne(this,Ge,null),ne(this,Wr,false);}initEvent(r,e,o){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){ne(this,Hr,true);}get target(){return vt(this,Ge,"f")}get currentTarget(){return vt(this,Ge,"f")}get srcElement(){return vt(this,Ge,"f")}get type(){return vt(this,Po,"f")}get cancelable(){return vt(this,mr,"f")}get defaultPrevented(){return vt(this,mr,"f")&&vt(this,Hr,"f")}get timeStamp(){return vt(this,Fi,"f")}composedPath(){return vt(this,Wr,"f")?[vt(this,Ge,"f")]:[]}get returnValue(){return !vt(this,mr,"f")||!vt(this,Hr,"f")}get bubbles(){return vt(this,Lo,"f")}get composed(){return vt(this,Vo,"f")}get eventPhase(){return vt(this,Wr,"f")?we.AT_TARGET:we.NONE}get cancelBubble(){return vt(this,Br,"f")}set cancelBubble(r){r&&ne(this,Br,true);}stopPropagation(){ne(this,Br,true);}get isTrusted(){return  false}},mr=new WeakMap,Lo=new WeakMap,Vo=new WeakMap,Hr=new WeakMap,Fi=new WeakMap,Br=new WeakMap,Po=new WeakMap,Ge=new WeakMap,Wr=new WeakMap,we.NONE=0,we.CAPTURING_PHASE=1,we.AT_TARGET=2,we.BUBBLING_PHASE=3,we);Object.defineProperties(Wi.prototype,{initEvent:Z,stopImmediatePropagation:Z,preventDefault:Z,target:Z,currentTarget:Z,srcElement:Z,type:Z,cancelable:Z,defaultPrevented:Z,timeStamp:Z,composedPath:Z,returnValue:Z,bubbles:Z,composed:Z,eventPhase:Z,cancelBubble:Z,stopPropagation:Z,isTrusted:Z});var nn=(on=class extends Wi{constructor(r,e={}){super(r,e),Do.set(this,void 0),ne(this,Do,e?.detail??null);}initCustomEvent(r,e,o,i){throw new Error("Method not implemented.")}get detail(){return vt(this,Do,"f")}},Do=new WeakMap,on);Object.defineProperties(nn.prototype,{detail:Z});var ji=Wi,Ni=nn;globalThis.Event??=ji;globalThis.CustomEvent??=Ni;var an=new WeakMap,jr=t=>{let r=an.get(t);return r===void 0&&an.set(t,r=new Map),r},rc=class extends Bi{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(jr(this)).map(([r,e])=>({name:r,value:e}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(r,e){jr(this).set(r,String(e));}removeAttribute(r){jr(this).delete(r);}toggleAttribute(r,e){if(this.hasAttribute(r)){if(e===void 0||!e)return this.removeAttribute(r),false}else return e===void 0||e?(this.setAttribute(r,""),true):false;return  true}hasAttribute(r){return jr(this).has(r)}attachShadow(r){let e={host:this};return this.__shadowRootMode=r.mode,r&&r.mode==="open"&&(this.__shadowRoot=e),e}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let r=new rn(this);return this.__internals=r,r}getAttribute(r){return jr(this).get(r)??null}};var oc=class extends rc{},qi=oc;globalThis.litServerRoot??=Object.defineProperty(new qi,"localName",{get(){return "lit-server-root"}});function ic(){let t,r;return {promise:new Promise((o,i)=>{t=o,r=i;}),resolve:t,reject:r}}var Ui=class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map;}define(r,e){if(this.__definitions.has(r))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${r}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${r}" has already been used with this registry`);if(this.__reverseDefinitions.has(e))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(e)}`);e.__localName=r,this.__definitions.set(r,{ctor:e,observedAttributes:e.observedAttributes??[]}),this.__reverseDefinitions.set(e,r),this.__pendingWhenDefineds.get(r)?.resolve(e),this.__pendingWhenDefineds.delete(r);}get(r){return this.__definitions.get(r)?.ctor}getName(r){return this.__reverseDefinitions.get(r)??null}upgrade(r){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(r){let e=this.__definitions.get(r);if(e)return e.ctor;let o=this.__pendingWhenDefineds.get(r);return o||(o=ic(),this.__pendingWhenDefineds.set(r,o)),o.promise}},sc=Ui;var ln=new sc;var Nr=globalThis,Mo=Nr.ShadowRoot&&(Nr.ShadyCSS===void 0||Nr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ki=Symbol(),cn=new WeakMap,Ur=class{constructor(r,e,o){if(this._$cssResult$=true,o!==Ki)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e;}get styleSheet(){let r=this.o,e=this.t;if(Mo&&r===void 0){let o=e!==void 0&&e.length===1;o&&(r=cn.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),o&&cn.set(e,r));}return r}toString(){return this.cssText}},pn=t=>new Ur(typeof t=="string"?t:t+"",void 0,Ki),y=(t,...r)=>{let e=t.length===1?t[0]:r.reduce(((o,i,s)=>o+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new Ur(e,t,Ki)},dn=(t,r)=>{if(Mo)t.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of r){let o=document.createElement("style"),i=Nr.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,t.appendChild(o);}},Gi=Mo||Nr.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(r=>{let e="";for(let o of r.cssRules)e+=o.cssText;return pn(e)})(t):t;var{is:nc,defineProperty:ac,getOwnPropertyDescriptor:lc,getOwnPropertyNames:cc,getOwnPropertySymbols:pc,getPrototypeOf:dc}=Object,Kr=globalThis;Kr.customElements??=ln;var hn=Kr.trustedTypes,hc=hn?hn.emptyScript:"",uc=Kr.reactiveElementPolyfillSupport,qr=(t,r)=>t,Se={toAttribute(t,r){switch(r){case Boolean:t=t?hc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);}return t},fromAttribute(t,r){let e=t;switch(r){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t);}catch{e=null;}}return e}},Fo=(t,r)=>!nc(t,r),un={attribute:true,type:String,converter:Se,reflect:false,useDefault:false,hasChanged:Fo};Symbol.metadata??=Symbol("metadata"),Kr.litPropertyMetadata??=new WeakMap;var ue=class extends(globalThis.HTMLElement??qi){static addInitializer(r){this._$Ei(),(this.l??=[]).push(r);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=un){if(e.state&&(e.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=true),this.elementProperties.set(r,e),!e.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(r,o,e);i!==void 0&&ac(this.prototype,r,i);}}static getPropertyDescriptor(r,e,o){let{get:i,set:s}=lc(this.prototype,r)??{get(){return this[e]},set(n){this[e]=n;}};return {get:i,set(n){let c=i?.call(this);s?.call(this,n),this.requestUpdate(r,c,o);},configurable:true,enumerable:true}}static getPropertyOptions(r){return this.elementProperties.get(r)??un}static _$Ei(){if(this.hasOwnProperty(qr("elementProperties")))return;let r=dc(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties);}static finalize(){if(this.hasOwnProperty(qr("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(qr("properties"))){let e=this.properties,o=[...cc(e),...pc(e)];for(let i of o)this.createProperty(i,e[i]);}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[o,i]of e)this.elementProperties.set(o,i);}this._$Eh=new Map;for(let[e,o]of this.elementProperties){let i=this._$Eu(e,o);i!==void 0&&this._$Eh.set(i,e);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let o=new Set(r.flat(1/0).reverse());for(let i of o)e.unshift(Gi(i));}else r!==void 0&&e.push(Gi(r));return e}static _$Eu(r,e){let o=e.attribute;return o===false?void 0:typeof o=="string"?o:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((r=>this.enableUpdating=r)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((r=>r(this)));}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.();}removeController(r){this._$EO?.delete(r);}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let o of e.keys())this.hasOwnProperty(o)&&(r.set(o,this[o]),delete this[o]);r.size>0&&(this._$Ep=r);}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dn(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((r=>r.hostConnected?.()));}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach((r=>r.hostDisconnected?.()));}attributeChangedCallback(r,e,o){this._$AK(r,o);}_$ET(r,e){let o=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,o);if(i!==void 0&&o.reflect===true){let s=(o.converter?.toAttribute!==void 0?o.converter:Se).toAttribute(e,o.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null;}}_$AK(r,e){let o=this.constructor,i=o._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=o.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Se;this._$Em=i;let c=n.fromAttribute(e,s.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null;}}requestUpdate(r,e,o){if(r!==void 0){let i=this.constructor,s=this[r];if(o??=i.getPropertyOptions(r),!((o.hasChanged??Fo)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(i._$Eu(r,o))))return;this.C(r,e,o);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(r,e,{useDefault:o,reflect:i,wrapped:s},n){o&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??e??this[r]),s!==true||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||o||(e=void 0),this._$AL.set(r,e)),i===true&&this._$Em!==r&&(this._$Eq??=new Set).add(r));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(e){Promise.reject(e);}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0;}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,s]of o){let{wrapped:n}=s,c=this[i];n!==true||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c);}}let r=false,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(e)):this._$EM();}catch(o){throw r=false,this._$EM(),o}r&&this._$AE(e);}willUpdate(r){}_$AE(r){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(r)),this.updated(r);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return  true}update(r){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM();}updated(r){}firstUpdated(r){}};ue.elementStyles=[],ue.shadowRootOptions={mode:"open"},ue[qr("elementProperties")]=new Map,ue[qr("finalized")]=new Map,uc?.({ReactiveElement:ue}),(Kr.reactiveElementVersions??=[]).push("2.1.1");var Yi=globalThis,lt=class extends ue{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=ur(e,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return at}};lt._$litElement$=true,lt.finalized=true,Yi.litElementHydrateSupport?.({LitElement:lt});var mc=Yi.litElementPolyfillSupport;mc?.({LitElement:lt});(Yi.litElementVersions??=[]).push("4.2.1");var mn=t=>(r,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(t,r);})):customElements.define(t,r);};var fc={attribute:true,type:String,converter:Se,reflect:false,hasChanged:Fo},gc=(t=fc,r,e)=>{let{kind:o,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),o==="setter"&&((t=Object.create(t)).wrapped=true),s.set(e.name,t),o==="accessor"){let{name:n}=e;return {set(c){let a=r.get.call(this);r.set.call(this,c),this.requestUpdate(n,a,t);},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(o==="setter"){let{name:n}=e;return function(c){let a=this[n];r.call(this,c),this.requestUpdate(n,a,t);}}throw Error("Unsupported decorator location: "+o)};function p(t){return (r,e)=>typeof e=="object"?gc(t,r,e):((o,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,o),n?Object.getOwnPropertyDescriptor(i,s):void 0})(t,r,e)}function k(t){return p({...t,state:true,attribute:false})}function Ce(t){return (r,e)=>{let o=typeof r=="function"?r:r[e];Object.assign(o,t);}}var me=(t,r,e)=>(e.configurable=true,e.enumerable=true,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(t,r,e),e);function $(t,r){return (e,o,i)=>{let s=n=>n.renderRoot?.querySelector(t)??null;return me(e,o,{get(){return s(this)}})}}var bc;function fn(t){return (r,e)=>me(r,e,{get(){return (this.renderRoot??(bc??=document.createDocumentFragment())).querySelectorAll(t)}})}function gn(t){return (r,e)=>{let{slot:o,selector:i}=t??{},s="slot"+(o?`[name=${o}]`:":not([name])");return me(r,e,{get(){let n=this.renderRoot?.querySelector(s),c=n?.assignedElements(t)??[];return i===void 0?c:c.filter((a=>a.matches(i)))}})}}function ke(t){return t&&typeof t=="object"&&t.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function bn(t,r){return ke(t)?Object.assign({},t,r):Object.assign({value:t,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},r)}function vn(t,r,e){if(!r||r.length===0)return t;let o=Array.isArray(r)?r:r.split("."),i,s=t;for(let n=0;n<o.length;n++){let c=o[n];if(c in s)i=s[c];else return e;s=i;}return i}function Ho(t,r,e,o){if(!r||!t)return t;let i=r;if(i.length===0)return typeof t=="object"&&Object.assign(t,e),t;{let s=t,n=[],c=(a,h,m)=>{a[h]=m;};for(let a=0;a<i.length;a++){let h=i[a];if(n.push(h),s)if(Array.isArray(s)){let m=parseInt(h,10);if(Number.isNaN(m)||m<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);a===i.length-1?c(s,m,e):s=s[m];}else s instanceof Map||s instanceof WeakMap?a===i.length-1?s.set(h,e):(s.has(h)||s.set(h,{}),s=s.get(h)):typeof s=="object"&&h in s?a===i.length-1?c(s,h,e):s=s[h]:(s[h]=a===i.length-1?e:{},s=s[h]);else s[h]=a===i.length-1?e:{},s=s[h];}}return t}function vc(t){if(t==null)return "";let r=typeof t;if(r==="boolean")return String(t);if(Array.isArray(t))return t.join(",");if(r==="object")try{return JSON.stringify(t)}catch{return "{}"}return String(t)}function yn(t,r){if(!r)return t;let e=r.datatype||"any";if(e==="any")return t;if(e==="string")return vc(t);if(e==="number")return Number(t);if(Array.isArray(t))return [...t];if(typeof t=="object")return {...t};if(typeof t=="string"){if(e==="boolean")return t.toLowerCase()==="true";if(e==="array")return t.split(",").map(o=>o.trim());if(e==="object")try{return JSON.parse(t)}catch{return {}}}return e==="boolean"?!!t:t}function xn(t,r,e){return t?e(r):r}var Xi="";function _n(t){Xi=t;}function wn(t=""){if(!Xi){let r=[...document.getElementsByTagName("script")],e=r.find(o=>o.hasAttribute("data-shoelace"));if(e)_n(e.getAttribute("data-shoelace"));else {let o=r.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),i="";o&&(i=o.getAttribute("src")),_n(i.split("/").slice(0,-1).join("/"));}}return Xi.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var yc={name:"default",resolver:t=>wn(`assets/icons/${t}.svg`)},Sn=yc;var Cn={caret:`
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
  `},xc={name:"system",resolver:t=>t in Cn?`data:image/svg+xml,${encodeURIComponent(Cn[t])}`:""},kn=xc;var Bo=[Sn,kn],Wo=[];function Qi(t){Wo.push(t);}function Zi(t){Wo=Wo.filter(r=>r!==t);}function fr(t){return Bo.find(r=>r.name===t)}function Ji(t,r){$n(t),Bo.push({name:t,resolver:r.resolver,mutator:r.mutator,spriteSheet:r.spriteSheet}),Wo.forEach(e=>{e.library===t&&e.setIcon();});}function $n(t){Bo=Bo.filter(r=>r.name!==t);}var On=Object.defineProperty,_c=Object.defineProperties,wc=Object.getOwnPropertyDescriptor,Sc=Object.getOwnPropertyDescriptors,En=Object.getOwnPropertySymbols,Cc=Object.prototype.hasOwnProperty,kc=Object.prototype.propertyIsEnumerable,ts=(t,r)=>(r=Symbol[t])?r:Symbol.for("Symbol."+t),es=t=>{throw TypeError(t)},An=(t,r,e)=>r in t?On(t,r,{enumerable:true,configurable:true,writable:true,value:e}):t[r]=e,St=(t,r)=>{for(var e in r||(r={}))Cc.call(r,e)&&An(t,e,r[e]);if(En)for(var e of En(r))kc.call(r,e)&&An(t,e,r[e]);return t},fe=(t,r)=>_c(t,Sc(r)),l=(t,r,e,o)=>{for(var i=o>1?void 0:o?wc(r,e):r,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(o?n(r,e,i):n(i))||i);return o&&i&&On(r,e,i),i},Tn=(t,r,e)=>r.has(t)||es("Cannot "+e),In=(t,r,e)=>(Tn(t,r,"read from private field"),r.get(t)),Rn=(t,r,e)=>r.has(t)?es("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(t):r.set(t,e),zn=(t,r,e,o)=>(Tn(t,r,"write to private field"),r.set(t,e),e),$c=function(t,r){this[0]=t,this[1]=r;},Ln=t=>{var r=t[ts("asyncIterator")],e=false,o,i={};return r==null?(r=t[ts("iterator")](),o=s=>i[s]=n=>r[s](n)):(r=r.call(t),o=s=>i[s]=n=>{if(e){if(e=false,s==="throw")throw n;return n}return e=true,{done:false,value:new $c(new Promise(c=>{var a=r[s](n);a instanceof Object||es("Object expected"),c(a);}),1)}}),i[ts("iterator")]=()=>i,o("next"),"throw"in r?o("throw"):i.throw=s=>{throw s},"return"in r&&o("return"),i};var Pn="https://unpkg.com/lucide-static@latest/icons/{name}.svg",rs={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>',bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>'},Vn=t=>t in rs?`data:image/svg+xml,${encodeURIComponent(rs[t])}`:Pn.replace("{name}",t),Ec=t=>{t&&t.setAttribute("stroke-width","1");};function gr(t="https://unpkg.com/lucide-static@latest/icons/{name}.svg",r){if(!t.includes("{name}"))throw new Error('icon url must include "{name}"');Pn=t,fr("default").resolver!==Vn&&Ji("default",{resolver:Vn,mutator:Ec});}function Ac(t){t=t.replace(/^#/,"");let r=parseInt(t.substring(0,2),16)/255,e=parseInt(t.substring(2,4),16)/255,o=parseInt(t.substring(4,6),16)/255,i=Math.max(r,e,o),s=Math.min(r,e,o),n=0,c=0,a=(i+s)/2;if(i!==s){let h=i-s;switch(c=a>.5?h/(2-i-s):h/(i+s),i){case r:n=(e-o)/h+(e<o?6:0);break;case e:n=(o-r)/h+2;break;case o:n=(r-e)/h+4;break}n/=6;}return {h:Math.round(n*360),s:Math.round(c*100),l:Math.round(a*100)}}function Oc(t,r,e){r/=100,e/=100;let o=(1-Math.abs(2*e-1))*r,i=o*(1-Math.abs(t/60%2-1)),s=e-o/2,n=0,c=0,a=0;0<=t&&t<60?(n=o,c=i,a=0):60<=t&&t<120?(n=i,c=o,a=0):120<=t&&t<180?(n=0,c=o,a=i):180<=t&&t<240?(n=0,c=i,a=o):240<=t&&t<300?(n=i,c=0,a=o):300<=t&&t<360&&(n=o,c=0,a=i),n=Math.round((n+s)*255),c=Math.round((c+s)*255),a=Math.round((a+s)*255);let h=m=>{let d=m.toString(16);return d.length===1?"0"+d:d};return `#${h(n)}${h(c)}${h(a)}`}function Dn(t){let r=Ac(t),e={50:{hDiff:3.3,sFactor:.74,lFactor:.44},100:{hDiff:3.7,sFactor:.82,lFactor:.59},200:{hDiff:3,sFactor:.88,lFactor:.65},300:{hDiff:3.4,sFactor:.94,lFactor:.76},400:{hDiff:2.4,sFactor:.94,lFactor:.93},500:{hDiff:0,sFactor:1,lFactor:1},600:{hDiff:-1,sFactor:1.14,lFactor:1.2},700:{hDiff:-1,sFactor:1.16,lFactor:1.48},800:{hDiff:-0.9,sFactor:1.16,lFactor:1.73},900:{hDiff:-1.2,sFactor:1.16,lFactor:1.89},950:{hDiff:-13.7,sFactor:1.16,lFactor:2}},o={};for(let[i,s]of Object.entries(e)){let n=Math.max(0,Math.min(360,r.h+s.hDiff)),c=Math.max(0,Math.min(100,r.s*s.sFactor)),a=Math.max(0,Math.min(100,r.l*s.lFactor));o[`--sl-color-primary-${i}`]=Oc(n,c,a);}return o}function Tc(t){if(!t.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){console.error("Invalid color format. Please provide a valid hex color (e.g., #3B82F6)");return}try{let r=Dn(t),e=document.getElementById("auto-styles");e||(e=document.createElement("style"),e.id="auto-styles",document.head.appendChild(e));let o=`:root {
`;Object.entries(r).forEach(([s,n])=>{o+=`  ${s}: ${n};
`;}),o+="}",e.textContent=o;let i=document.body;return r["--sl-color-primary-500"]&&i.style.setProperty("--sl-color-primary-500",r["--sl-color-primary-500"]),console.log("Primary color changed successfully"),r}catch(r){console.error("Failed to change theme color:",r);}}globalThis.changePrimaryColor=Tc;var $e=class extends Event{constructor(r,e,o,i){super("context-request",{bubbles:true,composed:true}),this.context=r,this.contextTarget=e,this.callback=o,this.subscribe=i??false;}};var br=class{constructor(r,e,o,i){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=r,e.context!==void 0){let s=e;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=e,this.callback=o,this.subscribe=i??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new $e(this.context,this.host,this.t,this.subscribe));}};var jo=class{get value(){return this.o}set value(r){this.setValue(r);}setValue(r,e=false){let o=e||!Object.is(r,this.o);this.o=r,o&&this.updateObservers();}constructor(r){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:o}]of this.subscriptions)e(this.o,o);},r!==void 0&&(this.value=r);}addCallback(r,e,o){if(!o)return void r(this.value);this.subscriptions.has(r)||this.subscriptions.set(r,{disposer:()=>{this.subscriptions.delete(r);},consumerHost:e});let{disposer:i}=this.subscriptions.get(r);r(this.value,i);}clearCallbacks(){this.subscriptions.clear();}};var os=class extends Event{constructor(r,e){super("context-provider",{bubbles:true,composed:true}),this.context=r,this.contextTarget=e;}},vr=class extends jo{constructor(r,e,o){super(e.context!==void 0?e.initialValue:o),this.onContextRequest=i=>{if(i.context!==this.context)return;let s=i.contextTarget??i.composedPath()[0];s!==this.host&&(i.stopPropagation(),this.addCallback(i.callback,s,i.subscribe));},this.onProviderRequest=i=>{if(i.context!==this.context||(i.contextTarget??i.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:c}]of this.subscriptions)s.has(n)||(s.add(n),c.dispatchEvent(new $e(this.context,c,n,true)));i.stopPropagation();},this.host=r,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new os(this.context,this.host));}};function is({context:t}){return (r,e)=>{let o=new WeakMap;if(typeof e=="object")return {get(){return r.get.call(this)},set(i){return o.get(this).setValue(i),r.set.call(this,i)},init(i){return o.set(this,new vr(this,{context:t,initialValue:i})),i}};{r.constructor.addInitializer((n=>{o.set(n,new vr(n,{context:t}));}));let i=Object.getOwnPropertyDescriptor(r,e),s;if(i===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(c){o.get(this).setValue(c),n.set(this,c);},configurable:true,enumerable:true};}else {let n=i.set;s={...i,set(c){o.get(this).setValue(c),n?.call(this,c);}};}return void Object.defineProperty(r,e,s)}}}function ss({context:t,subscribe:r}){return (e,o)=>{typeof o=="object"?o.addInitializer((function(){new br(this,{context:t,callback:i=>{e.set.call(this,i);},subscribe:r});})):e.constructor.addInitializer((i=>{new br(i,{context:t,callback:s=>{i[o]=s;},subscribe:r});}));}}var No="autoform";var Uo=y`
    
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
    ${Uo}
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
`;var yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Pt=t=>(...r)=>({_$litDirective$:t,values:r}),At=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,o){this._$Ct=r,this._$AM=e,this._$Ci=o;}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var{I:Rc}=en;var Hn=(t,r)=>t?._$litType$!==void 0;var qo=t=>t.strings===void 0,Fn=()=>document.createComment(""),yr=(t,r,e)=>{let o=t._$AA.parentNode,i=r===void 0?t._$AB:r._$AA;if(e===void 0){let s=o.insertBefore(Fn(),i),n=o.insertBefore(Fn(),i);e=new Rc(s,n,t,t.options);}else {let s=e._$AB.nextSibling,n=e._$AM,c=n!==t;if(c){let a;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(a=t._$AU)!==n._$AU&&e._$AP(a);}if(s!==i||c){let a=e._$AA;for(;a!==s;){let h=a.nextSibling;o.insertBefore(a,i),a=h;}}}return e},Ee=(t,r,e=t)=>(t._$AI(r,e),t),zc={},Ko=(t,r=zc)=>t._$AH=r,Bn=t=>t._$AH,Go=t=>{t._$AR(),t._$AA.remove();};var Wn=(t,r,e)=>{let o=new Map;for(let i=r;i<=e;i++)o.set(t[i],i);return o},tt=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,r,e){let o;e===void 0?e=r:r!==void 0&&(o=r);let i=[],s=[],n=0;for(let c of t)i[n]=o?o(c,n):n,s[n]=e(c,n),n++;return {values:s,keys:i}}render(t,r,e){return this.dt(t,r,e).values}update(t,[r,e,o]){let i=Bn(t),{values:s,keys:n}=this.dt(r,e,o);if(!Array.isArray(i))return this.ut=n,s;let c=this.ut??=[],a=[],h,m,d=0,f=i.length-1,g=0,b=s.length-1;for(;d<=f&&g<=b;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(c[d]===n[g])a[g]=Ee(i[d],s[g]),d++,g++;else if(c[f]===n[b])a[b]=Ee(i[f],s[b]),f--,b--;else if(c[d]===n[b])a[b]=Ee(i[d],s[b]),yr(t,a[b+1],i[d]),d++,b--;else if(c[f]===n[g])a[g]=Ee(i[f],s[g]),yr(t,i[d],i[f]),f--,g++;else if(h===void 0&&(h=Wn(n,g,b),m=Wn(c,d,f)),h.has(c[d]))if(h.has(c[f])){let x=m.get(n[g]),I=x!==void 0?i[x]:null;if(I===null){let E=yr(t,i[d]);Ee(E,s[g]),a[g]=E;}else a[g]=Ee(I,s[g]),yr(t,i[d],I),i[x]=null;g++;}else Go(i[f]),f--;else Go(i[d]),d++;for(;g<=b;){let x=yr(t,a[b+1]);Ee(x,s[g]),a[g++]=x;}for(;d<=f;){let x=i[d++];x!==null&&Go(x);}return this.ut=n,Ko(t,a),at}});var xr=class{constructor(r){this.host=r,r.addController(this);}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext();}};var jn="important",Lc=" !"+jn,J=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((r,e)=>{let o=t[e];return o==null?r:r+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(t,[r]){let{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(r)),this.render(r);for(let o of this.ft)r[o]==null&&(this.ft.delete(o),o.includes("-")?e.removeProperty(o):e[o]=null);for(let o in r){let i=r[o];if(i!=null){this.ft.add(o);let s=typeof i=="string"&&i.endsWith(Lc);o.includes("-")||s?e.setProperty(o,s?i.slice(0,-11):i,s?jn:""):e[o]=i;}}return at}});function B(t,r,e){return t?r(t):e?.(t)}var Ae=class{constructor(r,...e){this.initialClasses=[];this.host=r,r.addController(this),this.initialClasses=e;}_forEachClasss(r,e){r&&r.forEach(o=>{typeof o=="string"?(e(o,true),this.host.classList.add(o)):Object.entries(o).forEach(([i,s])=>{e(i,s);});});}add(...r){this.host&&r&&this._forEachClasss(r,e=>{this.host.classList.add(e);});}remove(...r){this.host&&r&&this._forEachClasss(r,e=>{this.host.classList.remove(e);});}toggle(...r){this.host&&this._forEachClasss(r,e=>{this.host.classList.toggle(e);});}use(...r){this.host&&this._forEachClasss(r,(e,o)=>{o?this.host.classList.add(e):this.host.classList.remove(e);});}has(r){return this.host.classList.contains(r)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var Gr=class extends At{constructor(r){if(super(r),this.it=Y,r.type!==yt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===Y||r==null)return this._t=void 0,this.it=r;if(r===at)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Gr.directiveName="unsafeHTML",Gr.resultType=1;var Ot=Pt(Gr);function Nn(t,r){r&&Object.entries(r).forEach(([e,o])=>{(e==="root"?[t]:Array.from(t.querySelectorAll(e))).forEach(s=>{typeof o=="string"?s.style.cssText=o:typeof o=="object"&&Object.assign(s.style,o);});});}function _r(t,r,e){e?t.classList.add(r):t.classList.remove(r);}function Un(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var R=class extends lt{constructor(){super(...arguments);this.theme=new xr(this);this.classs=new Ae(this);this.options=Un();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this._updateFieldValue();}static{this.styles=Mn;}get shadow(){return this.shadowRoot}getFieldOptions(){return Object.entries(this.schema||{}).reduce((e,[o,i])=>(ke(i)?e[o]=i.value:e[o]=i,e),Object.assign({},Un(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(e=true){return u`${this.renderBeforeActions(e)} ${this.renderAfterActions(e)}`}_onClickAction(e,o){return i=>{typeof o=="function"&&o(i),e.onClick&&typeof e.onClick=="function"&&e.onClick?.call(this,this.getInputValue(),{action:e,options:this.options,event:i,update:s=>{Ho(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(e){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return u`<div
                class="actions before"
                part="before-actions"
                slot="${w(e?"prefix":void 0)}"
            >
                ${tt(this.beforeActions,o=>this.renderActionWidget(o))}
            </div>`}renderAfterActions(e){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return u`<div
                class="actions after"
                part="after-actions"
                slot="${w(e?"suffix":void 0)}"
            >
                ${tt(this.afterActions,o=>this.renderActionWidget(o))}
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
                    ${tt(e.items||[],o=>o==="-"?u`<sl-divider></sl-divider>`:(typeof o=="string"&&(o={label:o}),u`<sl-menu-item
                            @click=${this._onClickAction.call(this,o,()=>{e.syncMenu&&(e.label=o.label,e.icon=o.icon,e.tips=o.tips,this.requestUpdate());})}
                        >
                            ${B(o.icon,()=>u`<sl-icon
                                        name=${w(o.icon)}
                                        slot="prefix"
                                    ></sl-icon>`)}
                            ${o.label}</sl-menu-item
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
        `}renderActionWidget(e){if(typeof e!="object")return;let o=e.type||"button";if(o==="dropdown")return this._renderDropdownAction(e);if(o==="button")return this._renderButtonAction(e);if(o==="image")return this._renderImageAction(e)}renderOption(e,o){let i=this.schema[e];if(i)return i.loading?u`<sl-spinner></sl-spinner>`:u`${o?o(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(e){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,e):e}toState(e){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,e):e}toInput(e){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,e):e}getOptionValue(e,o){if(this.schema&&e in this.schema){let i=this.schema[e];return i===void 0?o:ke(i)?i.value:i}else return o}getOption(e){if(this.schema&&e in this.schema){let o=this.schema[e];return ke(o)?o:bn(o)}}getInputValue(){if(!this.input)return "";let e=this.input.value;if(typeof this.options.toState!="function"){let o=this.options.datatype||"string";o==="number"?e=Number(e):o==="boolean"&&(e=!!e);}return e}_renderRequiredOption(){return this.renderOption("required",e=>e?u`<span style="color:red;">*</span>`:"")}renderHelp(e=false){let o=this.options.help;if(!o)return;let i=o.match(/\(([^)]+)\)[^)]*$/),s=i?i[1]:null,n=s?o.replace(`(${s})`,""):o;return u`<span
            class="help"
            part="field-help"
            title="${w(e?n:void 0)}"
        >
            ${xn(!!s,u`
                    <sl-icon name="help"></sl-icon>
                    ${B(!e,()=>u`${n}`)}
                `,c=>u`<a target="_blank" href="${s}">${c}</a>`)}
        </span>`}renderLabel(){let e=this.context,o=this.options.labelPos||e.labelPos;if(o==="none")return u``;{let i={};return (e.labelWidth&&o==="left"||e.viewonly)&&(i.width=e.labelWidth),u`<div class="label" part="field-label" style="${w(J(i))}">
                <span class="title">
                    ${this.getLabel()}
                    ${B(o==="left"||e.viewonly,()=>this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${B(o==="top"&&!e.viewonly,()=>this.renderHelp())}
            </div>`}}renderInput(){return u``}isShowError(){return this.context.validAtInit?!!this.invalidTips:this.dirty?!!this.invalidTips:false}renderError(){return this.isShowError()?u`<div class="error">${this.invalidTips}</div>`:u``}_handleSchemaChange(){let e=this.context;if(e?.store&&this.schema){let o=this.getPath().join("_$_");this._subscribers.push(e.store.schemas.store.watch(`${o}.**`,i=>{let{reply:s,type:n,value:c,flags:a}=i;if(s||e.form.seq===a)return;(n==="batch"?c:[i]).forEach(m=>{let d=m.path.slice(1);Ho(this.schema,d,m.value),this.options[d[0]]=m.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let e=this.value;if(this.options.toView&&this.options.toView)try{e=this.options.toView.call(this,this.value);}catch(o){console.error(`Error while toView<${this.path}>: ${o.message}`);}return u`${Ot(String(e))}`}_handleStateChange(){let e=this.context;e?.store&&this.schema&&this._subscribers.push(e.store.watch(this.getPath().join("."),o=>{this.value=this.toInput(o.value);},{operates:"write"}));}getStateValue(){return this.toInput(vn(this.context.store.state,this.getPath()))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let e=this.context;e?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.getPath().join("."),this.name=this.options.name||this.path,this.path in e.store.schemas.errors&&(this.invalidTips=e.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(o=>o.pos==="before"),this.afterActions=this.options.actions.filter(o=>o.pos!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(e=>e.off());}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFormClasss(){this.context.form&&(_r(this.context.form,"dirty",this.dirty),_r(this.context.form,"invalid",!!this.invalidTips));}_updateFieldValue(){if(!this.schema)return;let e=this.getPath(),o=this.toState(this.getInputValue()),i=this.context;i.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let c=yn(o,this.schema);Ho(n,e,c),this.invalidTips=void 0;},{flags:i.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:o,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidTips=s.message;}finally{this._updateFormClasss();}}renderValue(){return u`
            ${this.renderInput()} ${B(this.context.viewonly,()=>this.renderHelp())}
            ${this.renderError()}
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(){this.options.styles&&Nn(this.shadow,this.options.styles);}render(){let e=this.context,o=this.options.labelPos?this.options.labelPos:e.labelPos;return this.classs.use(e.size,{[`${e.border}-border`]:true,error:this.isShowError(),"left-label":o==="left"||e.viewonly,"top-label":o==="top"&&!e.viewonly,disable:this.options.enable===false,readonly:e.readonly,viewonly:e.viewonly,compact:this.compact===void 0?e.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${e.viewAlign}`]:true,[`${e.layout}-layout`]:true}),u`
            <div class="autofield">
                ${this.options.divider?u`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${B(e.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>
            </div>
        `}};v([p({type:Object})],R.prototype,"schema",2),v([k()],R.prototype,"value",2),v([k()],R.prototype,"invalidTips",2),v([k()],R.prototype,"labelPos",2),v([k()],R.prototype,"dirty",2),v([p({type:Boolean,reflect:true})],R.prototype,"noreactive",2),v([p({type:Boolean,reflect:true})],R.prototype,"compact",2),v([gn({slot:"value",flatten:true})],R.prototype,"_field",2),v([$(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],R.prototype,"input",2),v([ss({context:No}),p({attribute:false})],R.prototype,"context",2);function T(t){return r=>customElements.get(t)?r:mn(t)(r)}exports.AutoFieldInput=class Q extends R{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return u`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let e=i=>i.map(s=>typeof s=="string"?s:s.value||s.label),o=(i,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let c=e(s),a=-1;c.some((d,f)=>{if(n&&this.value.startsWith(d)||!n&&this.value.endsWith(d))return n?(this._prefix=d,this.value=this.value.substring(d.length)):(this._suffix=d,this.value=this.value.substring(0,this.value.length-d.length)),a=f,true});let h=a===-1?"?":typeof s[a]=="string"?s[a]:s[a].label,m={type:s.length===1?"button":"dropdown",label:h,caret:!n};m.type==="dropdown"?m.items=s.map(d=>(d==="-"||(d=typeof d=="string"?{label:d}:d,d.onClick=()=>{n?this._prefix=d.value??d.label:this._suffix=d.value??d.label,this.onFieldChange();}),d)):typeof s[0]=="string"?m.label=s[0]:Object.assign(m,s[0]),m.syncMenu=true,m.pos=n?"before":"after",n?i.splice(0,0,m):i.push(m);}};this.options.prefix&&o(this.beforeActions,this.options.prefix),this.options.suffix&&o(this.afterActions,this.options.suffix,false);}onInputChange(e){let o=e.type;this.context.validAt==="input"&&o.includes("input")?this.onFieldInput():o.includes("change")&&this.onFieldChange();}renderInput(){return u`
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
        `}toState(e){let o=super.toState(e);return typeof o=="string"&&(this._prefix&&(o=this._prefix+o),this._suffix&&(o=o+this._suffix)),o}toInput(e){let o=super.toInput(e);return typeof o=="string"&&(this._prefix&&o.startsWith(this._prefix)&&(o=o.substring(this._prefix.length)),this._suffix&&o.endsWith(this._suffix)&&(o=o.substring(0,o.length-this._suffix.length))),o}};exports.AutoFieldInput.styles=[R.styles,y`
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
`;var Ht=(t="value")=>(r,e)=>{let o=r.constructor,i=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(s,n,c){var a;let h=o.getPropertyOptions(t),m=typeof h.attribute=="string"?h.attribute:t;if(s===m){let d=h.converter||Se,g=(typeof d=="function"?d:(a=d?.fromAttribute)!=null?a:Se.fromAttribute)(c,h.type);this[t]!==g&&(this[e]=g);}i.call(this,s,n,c);};};var Tt=y`
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
`;var Yr=new WeakMap,Xr=new WeakMap,Qr=new WeakMap,ns=new WeakSet,Yo=new WeakMap,ft=class{constructor(t,r){this.handleFormData=e=>{let o=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(c=>{e.formData.append(i,c.toString());}):e.formData.append(i,s.toString()));},this.handleFormSubmit=e=>{var o;let i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=Yr.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),Yo.set(this.host,[]);},this.handleInteraction=e=>{let o=Yo.get(this.host);o.includes(e.type)||o.push(e.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let o of e)if(typeof o.checkValidity=="function"&&!o.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll("*");for(let o of e)if(typeof o.reportValidity=="function"&&!o.reportValidity())return  false}return  true},(this.host=t).addController(this),this.options=St({form:e=>{let o=e.form;if(o){let s=e.getRootNode().querySelector(`#${o}`);if(s)return s}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var o;return (o=e.disabled)!=null?o:false},reportValidity:e=>typeof e.reportValidity=="function"?e.reportValidity():true,checkValidity:e=>typeof e.checkValidity=="function"?e.checkValidity():true,setValue:(e,o)=>e.value=o,assumeInteractionOn:["sl-input"]},r);}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),Yo.set(this.host,[]),this.options.assumeInteractionOn.forEach(r=>{this.host.addEventListener(r,this.handleInteraction);});}hostDisconnected(){this.detachForm(),Yo.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction);});}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(t){t?(this.form=t,Yr.has(this.form)?Yr.get(this.form).add(this.host):Yr.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Xr.has(this.form)||(Xr.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Qr.has(this.form)||(Qr.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let t=Yr.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Xr.has(this.form)&&(this.form.reportValidity=Xr.get(this.form),Xr.delete(this.form)),Qr.has(this.form)&&(this.form.checkValidity=Qr.get(this.form),Qr.delete(this.form)),this.form=void 0));}setUserInteracted(t,r){r?ns.add(t):ns.delete(t),t.requestUpdate();}doAction(t,r){if(this.form){let e=document.createElement("button");e.type=t,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",r&&(e.name=r.name,e.value=r.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{r.hasAttribute(o)&&e.setAttribute(o,r.getAttribute(o));})),this.form.append(e),e.click(),e.remove();}}getForm(){var t;return (t=this.form)!=null?t:null}reset(t){this.doAction("reset",t);}submit(t){this.doAction("submit",t);}setValidity(t){let r=this.host,e=!!ns.has(r),o=!!r.required;r.toggleAttribute("data-required",o),r.toggleAttribute("data-optional",!o),r.toggleAttribute("data-invalid",!t),r.toggleAttribute("data-valid",t),r.toggleAttribute("data-user-invalid",!t&&e),r.toggleAttribute("data-user-valid",t&&e);}updateValidity(){let t=this.host;this.setValidity(t.validity.valid);}emitInvalidEvent(t){let r=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});t||r.preventDefault(),this.host.dispatchEvent(r)||t?.preventDefault();}},wr=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),Kn=Object.freeze(fe(St({},wr),{valid:false,valueMissing:true})),Gn=Object.freeze(fe(St({},wr),{valid:false,customError:true}));var ct=class{constructor(t,...r){this.slotNames=[],this.handleSlotChange=e=>{let o=e.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate();},(this.host=t).addController(this),this.slotNames=r;}hasDefaultSlot(){return [...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return  true;if(t.nodeType===t.ELEMENT_NODE){let r=t;if(r.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!r.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function Yn(t){if(!t)return "";let r=t.assignedNodes({flatten:true}),e="";return [...r].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(e+=o.textContent);}),e}var Xn=y`
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
`;function A(t,r){let e=St({waitUntilFirstUpdate:false},r);return (o,i)=>{let{update:s}=o,n=Array.isArray(t)?t:[t];o.update=function(c){n.forEach(a=>{let h=a;if(c.has(h)){let m=c.get(h),d=this[h];m!==d&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[i](m,d);}}),s.call(this,c);};}}var V=y`
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
`;var Xo,L=class extends lt{constructor(){super(),Rn(this,Xo,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,r])=>{this.constructor.define(t,r);});}emit(t,r){let e=new CustomEvent(t,St({bubbles:true,cancelable:false,composed:true,detail:{}},r));return this.dispatchEvent(e),e}static define(t,r=this,e={}){let o=customElements.get(t);if(!o){try{customElements.define(t,r,e);}catch{customElements.define(t,class extends r{},e);}return}let i=" (unknown version)",s=i;"version"in r&&r.version&&(i=" v"+r.version),"version"in o&&o.version&&(s=" v"+o.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${s} has already been registered.`);}attributeChangedCallback(t,r,e){In(this,Xo)||(this.constructor.elementProperties.forEach((o,i)=>{o.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i]);}),zn(this,Xo,true)),super.attributeChangedCallback(t,r,e);}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((r,e)=>{t.has(e)&&this[e]==null&&(this[e]=r);});}};Xo=new WeakMap;L.version="2.20.1";L.dependencies={};l([p()],L.prototype,"dir",2);l([p()],L.prototype,"lang",2);var Zr=Symbol(),Qo=Symbol(),as,ls=new Map,q=class extends L{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(t,r){var e;let o;if(r?.spriteSheet)return this.svg=u`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?Zr:Qo}catch{return Qo}try{let i=document.createElement("div");i.innerHTML=await o.text();let s=i.firstElementChild;if(((e=s?.tagName)==null?void 0:e.toLowerCase())!=="svg")return Zr;as||(as=new DOMParser);let c=as.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return c?(c.part.add("svg"),document.adoptNode(c)):Zr}catch{return Zr}}connectedCallback(){super.connectedCallback(),Qi(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),Zi(this);}getIconSource(){let t=fr(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var t;let{url:r,fromLibrary:e}=this.getIconSource(),o=e?fr(this.library):void 0;if(!r){this.svg=null;return}let i=ls.get(r);if(i||(i=this.resolveIcon(r,o),ls.set(r,i)),!this.initialRender)return;let s=await i;if(s===Qo&&ls.delete(r),r===this.getIconSource().url){if(Hn(s)){if(this.svg=s,o){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n);}return}switch(s){case Qo:case Zr:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(t=o?.mutator)==null||t.call(o,this.svg),this.emit("sl-load");}}}render(){return this.svg}};q.styles=[V,Xn];l([k()],q.prototype,"svg",2);l([p({reflect:true})],q.prototype,"name",2);l([p()],q.prototype,"src",2);l([p()],q.prototype,"label",2);l([p({reflect:true})],q.prototype,"library",2);l([A("label")],q.prototype,"handleLabelChange",1);l([A(["name","src","library"])],q.prototype,"setIcon",1);var z=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((r=>t[r])).join(" ")+" "}update(t,[r]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in r)r[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(r)}let e=t.element.classList;for(let o of this.st)o in r||(e.remove(o),this.st.delete(o));for(let o in r){let i=!!r[o];i===this.st.has(o)||this.nt?.has(o)||(i?(e.add(o),this.st.add(o)):(e.remove(o),this.st.delete(o)));}return at}});var Ct=Pt(class extends At{constructor(t){if(super(t),t.type!==yt.PROPERTY&&t.type!==yt.ATTRIBUTE&&t.type!==yt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!qo(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[r]){if(r===at||r===Y)return r;let e=t.element,o=t.name;if(t.type===yt.PROPERTY){if(r===e[o])return at}else if(t.type===yt.BOOLEAN_ATTRIBUTE){if(!!r===e.hasAttribute(o))return at}else if(t.type===yt.ATTRIBUTE&&e.getAttribute(o)===r+"")return at;return Ko(t),r}});var it=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,r)=>t.checked=r}),this.hasSlotController=new ct(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),r=this.helpText?true:!!t;return u`
      <div
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":r})}
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
          aria-hidden=${r?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};it.styles=[V,Tt,qn];it.dependencies={"sl-icon":q};l([$('input[type="checkbox"]')],it.prototype,"input",2);l([k()],it.prototype,"hasFocus",2);l([p()],it.prototype,"title",2);l([p()],it.prototype,"name",2);l([p()],it.prototype,"value",2);l([p({reflect:true})],it.prototype,"size",2);l([p({type:Boolean,reflect:true})],it.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],it.prototype,"checked",2);l([p({type:Boolean,reflect:true})],it.prototype,"indeterminate",2);l([Ht("checked")],it.prototype,"defaultChecked",2);l([p({reflect:true})],it.prototype,"form",2);l([p({type:Boolean,reflect:true})],it.prototype,"required",2);l([p({attribute:"help-text"})],it.prototype,"helpText",2);l([A("disabled",{waitUntilFirstUpdate:true})],it.prototype,"handleDisabledChange",1);l([A(["checked","indeterminate"],{waitUntilFirstUpdate:true})],it.prototype,"handleStateChange",1);it.define("sl-checkbox");exports.AutoFieldCheckbox=class Jr extends R{renderInput(){return u`
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
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let r=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof r=="boolean"?"":r}}renderView(){return u` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `}};exports.AutoFieldCheckbox.styles=[R.styles,y`
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
`;var Oe=class extends L{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(t){let r=to(t.target);r?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(t){let r=to(t.target);r?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(t){let r=to(t.target);r?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(t){let r=to(t.target);r?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:true})];t.forEach(r=>{let e=t.indexOf(r),o=to(r);o&&(o.toggleAttribute("data-sl-button-group__button",true),o.toggleAttribute("data-sl-button-group__button--first",e===0),o.toggleAttribute("data-sl-button-group__button--inner",e>0&&e<t.length-1),o.toggleAttribute("data-sl-button-group__button--last",e===t.length-1),o.toggleAttribute("data-sl-button-group__button--radio",o.tagName.toLowerCase()==="sl-radio-button"));});}render(){return u`
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
    `}};Oe.styles=[V,Jn];l([$("slot")],Oe.prototype,"defaultSlot",2);l([k()],Oe.prototype,"disableRole",2);l([p()],Oe.prototype,"label",2);function to(t){var r;let e="sl-button, sl-radio-button";return (r=t.closest(e))!=null?r:t.querySelector(e)}var gt=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this),this.hasSlotController=new ct(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Gn:t?Kn:wr}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let r=t.target.closest("sl-radio, sl-radio-button"),e=this.getAllRadios(),o=this.value;!r||r.disabled||(this.value=r.value,e.forEach(i=>i.checked=i===r),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(t){var r;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let e=this.getAllRadios().filter(c=>!c.disabled),o=(r=e.find(c=>c.checked))!=null?r:e[0],i=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=e.indexOf(o)+i;n<0&&(n=e.length-1),n>e.length-1&&(n=0),this.getAllRadios().forEach(c=>{c.checked=false,this.hasButtonGroup||c.setAttribute("tabindex","-1");}),this.value=e[n].value,e[n].checked=true,this.hasButtonGroup?e[n].shadowRoot.querySelector("button").focus():(e[n].setAttribute("tabindex","0"),e[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}async syncRadioElements(){var t,r;let e=this.getAllRadios();if(await Promise.all(e.map(async o=>{await o.updateComplete,o.checked=o.value===this.value,o.size=this.size;})),this.hasButtonGroup=e.some(o=>o.tagName.toLowerCase()==="sl-radio-button"),e.length>0&&!e.some(o=>o.checked))if(this.hasButtonGroup){let o=(t=e[0].shadowRoot)==null?void 0:t.querySelector("button");o&&o.setAttribute("tabindex","0");}else e[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let o=(r=this.shadowRoot)==null?void 0:r.querySelector("sl-button-group");o&&(o.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(r=>r.checked=r.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let t=this.required&&!this.value,r=this.customValidityMessage!=="";return t||r?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){let r=this.getAllRadios(),e=r.find(s=>s.checked),o=r.find(s=>!s.disabled),i=e||o;i&&i.focus(t);}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r,i=u`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return u`
      <fieldset
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":e,"form-control--has-help-text":o})}
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};gt.styles=[V,Tt,Zn];gt.dependencies={"sl-button-group":Oe};l([$("slot:not([name])")],gt.prototype,"defaultSlot",2);l([$(".radio-group__validation-input")],gt.prototype,"validationInput",2);l([k()],gt.prototype,"hasButtonGroup",2);l([k()],gt.prototype,"errorMessage",2);l([k()],gt.prototype,"defaultValue",2);l([p()],gt.prototype,"label",2);l([p({attribute:"help-text"})],gt.prototype,"helpText",2);l([p()],gt.prototype,"name",2);l([p({reflect:true})],gt.prototype,"value",2);l([p({reflect:true})],gt.prototype,"size",2);l([p({reflect:true})],gt.prototype,"form",2);l([p({type:Boolean,reflect:true})],gt.prototype,"required",2);l([A("size",{waitUntilFirstUpdate:true})],gt.prototype,"handleSizeChange",1);l([A("value")],gt.prototype,"handleValueChange",1);gt.define("sl-radio-group");exports.AutoFieldRadio=class eo extends R{getInitialOptions(){return {card:false,select:[],valueKey:"value"}}renderOptionItemWithCard(r,e){if(this.options.card){let o=e[this.options.valueKey]||e.label,i=this.value===o;return u`<div
                class="card"
                style=${J({width:this.options.itemWidth})}
            >
                <div class="body ${i?"selected":""}">
                    <sl-icon class="icon" name="settings"></sl-icon>
                    ${r}
                </div>
            </div>`}else return r}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(r){let e=r[this.options.valueKey]||r.label;return u`<sl-radio
            value="${e}"
            style=${J({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
            >${r.label}<br /><span class="memo">${r.tips}</span></sl-radio
        >`}renderInput(){let r=this.options.select.map(e=>{let o={};return typeof e=="object"?Object.assign(o,e):Object.assign(o,{label:e}),o});return u`
            <sl-radio-group class="value" name=${this.name} value="${this.value}" size="${this.context.size}" @sl-change=${this.onRadioChange.bind(this)}>
                ${r.map(e=>this.renderOptionItemWithCard(this.renderOptionItem(e),e))}
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
`;var K=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ct(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,r,e="none"){this.input.setSelectionRange(t,r,e);}setRangeText(t,r,e,o="preserve"){let i=r??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,o),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r;return u`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":o})}
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};K.styles=[V,Tt,ta];l([$(".textarea__control")],K.prototype,"input",2);l([$(".textarea__size-adjuster")],K.prototype,"sizeAdjuster",2);l([k()],K.prototype,"hasFocus",2);l([p()],K.prototype,"title",2);l([p()],K.prototype,"name",2);l([p()],K.prototype,"value",2);l([p({reflect:true})],K.prototype,"size",2);l([p({type:Boolean,reflect:true})],K.prototype,"filled",2);l([p()],K.prototype,"label",2);l([p({attribute:"help-text"})],K.prototype,"helpText",2);l([p()],K.prototype,"placeholder",2);l([p({type:Number})],K.prototype,"rows",2);l([p()],K.prototype,"resize",2);l([p({type:Boolean,reflect:true})],K.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],K.prototype,"readonly",2);l([p({reflect:true})],K.prototype,"form",2);l([p({type:Boolean,reflect:true})],K.prototype,"required",2);l([p({type:Number})],K.prototype,"minlength",2);l([p({type:Number})],K.prototype,"maxlength",2);l([p()],K.prototype,"autocapitalize",2);l([p()],K.prototype,"autocorrect",2);l([p()],K.prototype,"autocomplete",2);l([p({type:Boolean})],K.prototype,"autofocus",2);l([p()],K.prototype,"enterkeyhint",2);l([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],K.prototype,"spellcheck",2);l([p()],K.prototype,"inputmode",2);l([Ht()],K.prototype,"defaultValue",2);l([A("disabled",{waitUntilFirstUpdate:true})],K.prototype,"handleDisabledChange",1);l([A("rows",{waitUntilFirstUpdate:true})],K.prototype,"handleRowsChange",1);l([A("value",{waitUntilFirstUpdate:true})],K.prototype,"handleValueChange",1);K.define("sl-textarea");exports.AutoFieldTextArea=class ro extends R{renderInput(){return u`
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
`;var xt=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,r)=>t.checked=r}),this.hasSlotController=new ct(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(t){this.input.focus(t);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("help-text"),r=this.helpText?true:!!t;return u`
      <div
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":r})}
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
          aria-hidden=${r?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};xt.styles=[V,Tt,ea];l([$('input[type="checkbox"]')],xt.prototype,"input",2);l([k()],xt.prototype,"hasFocus",2);l([p()],xt.prototype,"title",2);l([p()],xt.prototype,"name",2);l([p()],xt.prototype,"value",2);l([p({reflect:true})],xt.prototype,"size",2);l([p({type:Boolean,reflect:true})],xt.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],xt.prototype,"checked",2);l([Ht("checked")],xt.prototype,"defaultChecked",2);l([p({reflect:true})],xt.prototype,"form",2);l([p({type:Boolean,reflect:true})],xt.prototype,"required",2);l([p({attribute:"help-text"})],xt.prototype,"helpText",2);l([A("checked",{waitUntilFirstUpdate:true})],xt.prototype,"handleCheckedChange",1);l([A("disabled",{waitUntilFirstUpdate:true})],xt.prototype,"handleDisabledChange",1);xt.define("sl-switch");exports.AutoFieldSwitch=class oo extends R{renderInput(){return u`
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
        `}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let r=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof r=="boolean"?"":r}}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return u` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `}};exports.AutoFieldSwitch.styles=[R.styles,y`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=v([T("auto-field-switch")],exports.AutoFieldSwitch);var Zo=y`
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
`;var ra=y`
  ${Zo}

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
`;var ia=Symbol.for(""),Vc=t=>{if(t?.r===ia)return t?._$litStatic$};var Sr=(t,...r)=>({_$litStatic$:r.reduce(((e,o,i)=>e+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[i+1]),t[0]),r:ia}),oa=new Map,cs=t=>(r,...e)=>{let o=e.length,i,s,n=[],c=[],a,h=0,m=false;for(;h<o;){for(a=r[h];h<o&&(s=e[h],(i=Vc(s))!==void 0);)a+=i+r[++h],m=true;h!==o&&c.push(s),n.push(a),h++;}if(h===o&&n.push(r[o]),m){let d=n.join("$$lit$$");(r=oa.get(d))===void 0&&(n.raw=n,oa.set(d,r=n)),e=c;}return t(r,...e)},Te=cs(u);var Bt=class extends L{constructor(){super(...arguments),this.hasSlotController=new ct(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(t){this.input.focus(t);}blur(){this.input.blur();}render(){return Te`
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
    `}};Bt.styles=[V,ra];l([$(".button")],Bt.prototype,"input",2);l([$(".hidden-input")],Bt.prototype,"hiddenInput",2);l([k()],Bt.prototype,"hasFocus",2);l([p({type:Boolean,reflect:true})],Bt.prototype,"checked",2);l([p()],Bt.prototype,"value",2);l([p({type:Boolean,reflect:true})],Bt.prototype,"disabled",2);l([p({reflect:true})],Bt.prototype,"size",2);l([p({type:Boolean,reflect:true})],Bt.prototype,"pill",2);l([A("disabled",{waitUntilFirstUpdate:true})],Bt.prototype,"handleDisabledChange",1);Bt.define("sl-radio-button");exports.AutoFieldRadioButton=class io extends R{getInitialOptions(){return {valueKey:"value"}}renderRadioItem(r){let e=r[this.options.valueKey];return u`<sl-radio-button value="${e}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${r.label}</sl-radio-button>`}renderInput(){let r=this.getOptionValue("select",[]).map((e,o)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{label:e,value:o+1}),i});return u`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${r.map(e=>this.renderRadioItem(e))}
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
        `],exports.AutoFieldRadioButton=v([T("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class Jo extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=v([T("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class ti extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=v([T("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class ei extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=v([T("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class ri extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=v([T("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class oi extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();let r=this.context.store.schemas.getValidator(this.path);(!r||typeof r.validate!="function")&&this.context.store.schemas.addValidator(this.path,{validate:e=>this._isEmail(e),message:"\u65E0\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740",onFail:"throw-pass"});}_isEmail(r){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(r)}};exports.AutoFieldEmail=v([T("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class ii extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=v([T("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class si extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=v([T("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class ni extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=v([T("auto-field-phone")],exports.AutoFieldPhone);var ai=class{constructor(r,e){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=r,this.options={...this.options,...e},r.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(r){let e=r.target;if(this.isPreviewActive){this.closePreview();return}e.matches(this.options.selector)&&(r.preventDefault(),r.stopPropagation(),this.originalImage=e,this.showPreview(this.originalImage));}showPreview(r){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let e=this.options.overlayColor,o=this.hexToRgb(e);this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=r.src,this.previewImage.alt=r.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let i=r.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",this.closePreview.bind(this)),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:c,height:a}=this.calculateAspectRatioFit(r.naturalWidth,r.naturalHeight,s*.9,n*.9),h=(n-a)/2,m=(s-c)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${h}px`,this.previewImage.style.left=`${m}px`,this.previewImage.style.width=`${c}px`,this.previewImage.style.height=`${a}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let r=window.innerWidth,e=window.innerHeight,{width:o,height:i}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,r*.9,e*.9),s=(e-i)/2,n=(r-o)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${o}px`,this.previewImage.style.height=`${i}px`);});}handleKeydown(r){r.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let r=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${r.top}px`,this.previewImage.style.left=`${r.left}px`,this.previewImage.style.width=`${r.width}px`,this.previewImage.style.height=`${r.height}px`;});let e=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${e.r}, ${e.g}, ${e.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(r,e,o,i){if(r<=o&&e<=i)return {width:r,height:e};let s=Math.min(o/r,i/e);return {width:r*s,height:e*s}}hexToRgb(r){r=r.replace(/^#/,""),r.length===3&&(r=r.split("").map(s=>s+s).join(""));let e=parseInt(r.substring(0,2),16),o=parseInt(r.substring(2,4),16),i=parseInt(r.substring(4,6),16);return {r:isNaN(e)?0:e,g:isNaN(o)?0:o,b:isNaN(i)?0:i}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var ps=class{constructor(r,e){for(this.options=Object.assign({width:"8px"},e),this.target=r,this.content=r.firstElementChild,this.direction=window.getComputedStyle(this.target).direction,this.scrollRatio=1,this.bar=null,this.wrapper=document.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=document.createElement("div"),this.el.setAttribute("class","ss-content"),this.direction==="rtl"&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",'<div class="ss-scroll">'),this.bar=this.target.lastChild,this.bar.style.width=this.options.width,this.mB=this.moveBar.bind(this),this.dragDealer(this.bar),this.moveBar(),window.addEventListener("resize",this.mB),this.el.addEventListener("scroll",this.mB),this.el.addEventListener("mouseenter",this.mB),this.target.classList.add("ss-container");let o=window.getComputedStyle(r);o.height==="0px"&&o["max-height"]!=="0px"&&(r.style.height=o["max-height"]);}dragDealer(r){let e,o=n=>{let c=n.pageY-e;e=n.pageY,this.requestAnimationFrame(()=>{this.el&&(this.el.scrollTop+=c/this.scrollRatio);});},i=()=>{r.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",i);},s=n=>(e=n.pageY,r.classList.add("ss-grabbed"),document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i),false);r.mouseDownHandler=s,r.addEventListener("mousedown",s);}requestAnimationFrame(r){window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,0);}moveBar(){if(!this.el||!this.target)return;let r=this.el.scrollHeight,e=this.el.clientHeight;this.scrollRatio=e/r;let i=this.direction==="rtl"&&this.bar?this.target.clientWidth-this.bar.clientWidth+18:this.bar?(this.target.clientWidth-this.bar.clientWidth)*-1:0;this.requestAnimationFrame(()=>{this.scrollRatio>=1?this.bar?.classList.add("ss-hidden"):(this.bar?.classList.remove("ss-hidden"),this.bar&&(this.bar.style.cssText="height:"+Math.max(this.scrollRatio*100,10)+"%; top:"+this.el.scrollTop/r*100+"%;right:"+i+"px;"));});}destroy(){if(window.removeEventListener("resize",this.mB),this.el&&(this.el.removeEventListener("scroll",this.mB),this.el.removeEventListener("mouseenter",this.mB)),this.bar?.mouseDownHandler&&(this.bar.removeEventListener("mousedown",this.bar.mouseDownHandler),delete this.bar.mouseDownHandler),this.target){this.target.classList.remove("ss-container");try{this.content&&this.wrapper&&this.target.insertBefore(this.content,this.wrapper),this.wrapper&&this.target.removeChild(this.wrapper);}catch(r){console.error("Error restoring DOM structure during scrollbar destroy:",r);}if(this.bar){try{this.target.removeChild(this.bar);}catch(r){console.error("Error removing scrollbar during destroy:",r);}this.bar=null;}}this.target=null,this.content=null,this.wrapper=null,this.el=null,this.mB=null;}},Ye=class{constructor(r){this._scrollbars=[];this.host=r,r.addController(this);}static{this.styles=y`
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
    `;}create(r,e){let o=new ps(r,e);return this._scrollbars.push(o),o}hostConnected(){}hostUpdate(){}hostDisconnected(){for(let r of this._scrollbars)r.destroy();this._scrollbars=[];}};var Pc=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],Dc=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function Mc(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return Pc.includes(`.${o}`)}function Fc(t){if(!t||typeof t!="string")return  false;let o=t.split("?")[0].split("/").pop().split(".").pop();return Dc.includes(`.${o}`)}exports.AutoFieldUpload=class Cr extends R{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new ai(this);}retryUpload(e){this.startUpload(e.file,e.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:true}}_getDefaultFileLabel(e){return typeof e=="string"?e:e.title||e.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(e=>e!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(e){let o=e.target;if(!o.files||o.files.length===0)return;Array.from(o.files).forEach(s=>this.uploadFile(s)),o.value="";}handleDragOver(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(e){if(e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!e.dataTransfer?.files)return;let i=Array.from(e.dataTransfer.files);if(!this.options?.multiple&&i.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=i.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(c=>c==="*"?true:c.startsWith(".")?n.name.toLowerCase().endsWith(c.toLowerCase()):n.type.startsWith(c)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}i.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(e){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let o={id:this.generateId(),file:e,progress:0,status:"uploading",value:{url:e.name}};return this.files.push(o),this.startUpload(e,o.id)}_updateFileRecord(e,o){let i=this.files.findIndex(s=>s.id===e);i!==-1&&(this.files=[...this.files.slice(0,i),{...this.files[i],...o},...this.files.slice(i+1)]);}_getResponseError(e){let o="\u4E0A\u4F20\u5931\u8D25";try{let i=JSON.parse(e.responseText);o=i.message||i.error||o;}catch{switch(e.status){case 400:o="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:o="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:o="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:o="\u6587\u4EF6\u592A\u5927";break;case 415:o="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:o="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:o="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:o=`\u4E0A\u4F20\u5931\u8D25 (${e.status})`;}}return new Error(o)}_defaultFileResolver(e){if(typeof e=="string")return e;if(typeof e=="object"){if(!e.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return e}}_parseUploadResponse(e){let o={};try{Object.assign(o,JSON.parse(e));}catch{o=e;}return typeof this.options.onResolve=="function"&&(o=this.options.onResolve(o)),o}async startUpload(e,o){let i=this.files.findIndex(n=>n.id===o);if(i===-1)return;let s=this.files[i];return new Promise((n,c)=>{let a=new XMLHttpRequest,h=new FormData;h.append(this.options.fileFieldName,e),a.upload.onprogress=m=>{if(m.lengthComputable){let d=Math.round(m.loaded/m.total*100);this._updateFileRecord(o,{progress:d});}},a.onload=()=>{if(this.files.findIndex(d=>d.id===o)!==-1)if(a.status>=200&&a.status<300){this._updateFileRecord(o,{status:"done"});try{let d=this._parseUploadResponse(a.responseText);this._updateFileRecord(o,{value:d}),s.status="done",this.onFieldChange(),n();}catch{let d=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(o,d),c(d);}}else {let d=this._getResponseError(a);this.handleUploadError(o,d),c(d);}},a.onerror=()=>{if(this.files.findIndex(f=>f.id===o)===-1)return;let d=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(o,d),c(d);},a.ontimeout=()=>{if(this.files.findIndex(f=>f.id===o)===-1)return;let d=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(o,d),c(d);},a.open("POST",this.options.url),this._updateFileRecord(o,{progress:0,status:"uploading"}),a.send(h);})}handleUploadError(e,o){this._updateFileRecord(e,{error:o.message,status:"error"});}deleteFile(e){let o=this.files.findIndex(c=>c.id===e);if(o===-1)return;let i=this.files[o],s=i.status==="uploading"||i.status==="error",n=()=>{this.files=[...this.files.slice(0,o),...this.files.slice(o+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,i.value)).then(()=>{n(),this.onFieldChange();}).catch(c=>{alert(c.message);}):(n(),this.onFieldChange());}getInputValue(){if(this.options.multiple){let e=this.files.map(o=>o.value);return this.options.onlyFileUrl?e.map(o=>typeof o=="object"?o.url:o):e}else {let e=this.files.length>0?this.files[0].value:void 0;if(e)return this.options.onlyFileUrl&&typeof e=="object"?e.url:e}}getStateValue(){let e=super.getStateValue();return Array.isArray(e)||(e=[e]),this.files=e.map((o,i)=>{let s={id:String(i),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof o=="string"?s.value=o:typeof o=="object"&&(s.value=Object.assign({},s.value,o)),s}),e}renderProgressbar(e,o){if(e.status!=="uploading")return;let i=o==="hori"?`width:${e.progress}%;`:`height:${e.progress}%;top:${100-e.progress}%`;return u`<span
            class="uploading progressbar ${z({hori:o==="hori",vert:o==="vert"})}"
            style="${i}"
        >
            <span class="value">${e.progress}%</span>
        </span> `}renderFileContent(e){if(e.error)return;let o=typeof e.value=="string"?e.value:e.value.url,i;if(Mc(o))i=u` <img class="content" src="${o}" /> `;else if(Fc(o))i=u` <video class="content" src="${o}"></video> `;else {let s=o.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,i=u`<div class="content">${s}</div>`;}return i}renderFilePreview(e){let o=!!e.error,i=typeof this.options.preview=="boolean"?"80px":this.options.preview;return u`
            <div
                class="file preview ${z({error:o})}"
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
        `}renderFile(e){let o=!!e.error;return u`
            <auto-flex class="file default ${z({error:o})}" wrap align="center" gap="0.5rem" title=${w(e.error)}>
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
        `],v([k()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=v([T("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class li extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=v([T("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class so extends R{getInitialOptions(){return {size:"medium"}}_onPartFocus(r){r.target.select();}_getIpBits(){let r=this.value?.split(".");return [parseInt(r[0]||"0"),parseInt(r[1]||"0"),parseInt(r[2]||"0"),parseInt(r[3]||"0")]}_onIpChange(r,e){this.onFieldChange(),this._isLastInput(e);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(e=>e.value).join(".")}_isLastInput(r){let e=r.target;if(e.value.length>=3){e.blur();let o=e.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(r){r.preventDefault();let e=r.target,o=r.clipboardData?.getData("text/plain")||"",i=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=o.match(i);if(!s)return;let n=[],c=e;for(let a=0;a<4&&c;a++)c.tagName==="SL-INPUT"&&n.push(c),c=c.nextElementSibling?.nextElementSibling;for(let a=0;a<Math.min(4,n.length);a++)n[a].value=s[a+1],n[a].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let a=n[Math.min(3,n.length-1)];a.focus(),a.select();}}renderInput(){return u`
            <auto-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((r,e)=>u`
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
`;var pt=class extends L{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation());}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}render(){let t=!!this.href,r=t?Sr`a`:Sr`button`;return Te`
      <${r}
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
      </${r}>
    `}};pt.styles=[V,na];pt.dependencies={"sl-icon":q};l([$(".icon-button")],pt.prototype,"button",2);l([k()],pt.prototype,"hasFocus",2);l([p()],pt.prototype,"name",2);l([p()],pt.prototype,"library",2);l([p()],pt.prototype,"src",2);l([p()],pt.prototype,"href",2);l([p()],pt.prototype,"target",2);l([p()],pt.prototype,"download",2);l([p()],pt.prototype,"label",2);l([p({type:Boolean,reflect:true})],pt.prototype,"disabled",2);var ds=new Set,kr=new Map,Xe,hs="ltr",us="en",aa=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(aa){let t=new MutationObserver(la);hs=document.documentElement.dir||"ltr",us=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function no(...t){t.map(r=>{let e=r.$code.toLowerCase();kr.has(e)?kr.set(e,Object.assign(Object.assign({},kr.get(e)),r)):kr.set(e,r),Xe||(Xe=r);}),la();}function la(){aa&&(hs=document.documentElement.dir||"ltr",us=document.documentElement.lang||navigator.language),[...ds.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate();});}var ci=class{constructor(r){this.host=r,this.host.addController(this);}hostConnected(){ds.add(this.host);}hostDisconnected(){ds.delete(this.host);}dir(){return `${this.host.dir||hs}`.toLowerCase()}lang(){return `${this.host.lang||us}`.toLowerCase()}getTranslationData(r){var e,o;let i=new Intl.Locale(r.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(o=(e=i?.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&o!==void 0?o:"",c=kr.get(`${s}-${n}`),a=kr.get(s);return {locale:i,language:s,region:n,primary:c,secondary:a}}exists(r,e){var o;let{primary:i,secondary:s}=this.getTranslationData((o=e.lang)!==null&&o!==void 0?o:this.lang());return e=Object.assign({includeFallback:false},e),!!(i&&i[r]||s&&s[r]||e.includeFallback&&Xe&&Xe[r])}term(r,...e){let{primary:o,secondary:i}=this.getTranslationData(this.lang()),s;if(o&&o[r])s=o[r];else if(i&&i[r])s=i[r];else if(Xe&&Xe[r])s=Xe[r];else return console.error(`No translation found for: ${String(r)}`),String(r);return typeof s=="function"?s(...e):s}date(r,e){return r=new Date(r),new Intl.DateTimeFormat(this.lang(),e).format(r)}number(r,e){return r=Number(r),isNaN(r)?"":new Intl.NumberFormat(this.lang(),e).format(r)}relativeTime(r,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(r,e)}};var ca={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,r)=>`Go to slide ${t} of ${r}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};no(ca);var pa=ca;var W=class extends ci{};no(pa);var ae=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return u`
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
`;function Hc(t,r){return {top:Math.round(t.getBoundingClientRect().top-r.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-r.getBoundingClientRect().left)}}function ao(t,r,e="vertical",o="smooth"){let i=Hc(t,r),s=i.top+r.scrollTop,n=i.left+r.scrollLeft,c=r.scrollLeft,a=r.scrollLeft+r.offsetWidth,h=r.scrollTop,m=r.scrollTop+r.offsetHeight;(e==="horizontal"||e==="both")&&(n<c?r.scrollTo({left:n,behavior:o}):n+t.clientWidth>a&&r.scrollTo({left:n-r.offsetWidth+t.clientWidth,behavior:o})),(e==="vertical"||e==="both")&&(s<h?r.scrollTo({top:s,behavior:o}):s+t.clientHeight>m&&r.scrollTo({top:s-r.offsetHeight+t.clientHeight,behavior:o}));}var ha=y`
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
`;var le=Math.min,kt=Math.max,co=Math.round,po=Math.floor,ee=t=>({x:t,y:t}),Bc={left:"right",right:"left",bottom:"top",top:"bottom"},Wc={start:"end",end:"start"};function di(t,r,e){return kt(t,le(r,e))}function Qe(t,r){return typeof t=="function"?t(r):t}function ge(t){return t.split("-")[0]}function Ze(t){return t.split("-")[1]}function ms(t){return t==="x"?"y":"x"}function hi(t){return t==="y"?"height":"width"}var jc=new Set(["top","bottom"]);function ce(t){return jc.has(ge(t))?"y":"x"}function ui(t){return ms(ce(t))}function fa(t,r,e){e===void 0&&(e=false);let o=Ze(t),i=ui(t),s=hi(i),n=i==="x"?o===(e?"end":"start")?"right":"left":o==="start"?"bottom":"top";return r.reference[s]>r.floating[s]&&(n=lo(n)),[n,lo(n)]}function ga(t){let r=lo(t);return [pi(t),r,pi(r)]}function pi(t){return t.replace(/start|end/g,r=>Wc[r])}var ua=["left","right"],ma=["right","left"],Nc=["top","bottom"],Uc=["bottom","top"];function qc(t,r,e){switch(t){case "top":case "bottom":return e?r?ma:ua:r?ua:ma;case "left":case "right":return r?Nc:Uc;default:return []}}function ba(t,r,e,o){let i=Ze(t),s=qc(ge(t),e==="start",o);return i&&(s=s.map(n=>n+"-"+i),r&&(s=s.concat(s.map(pi)))),s}function lo(t){return t.replace(/left|right|bottom|top/g,r=>Bc[r])}function Kc(t){return {top:0,right:0,bottom:0,left:0,...t}}function fs(t){return typeof t!="number"?Kc(t):{top:t,right:t,bottom:t,left:t}}function Je(t){let{x:r,y:e,width:o,height:i}=t;return {width:o,height:i,top:e,left:r,right:r+o,bottom:e+i,x:r,y:e}}function va(t,r,e){let{reference:o,floating:i}=t,s=ce(r),n=ui(r),c=hi(n),a=ge(r),h=s==="y",m=o.x+o.width/2-i.width/2,d=o.y+o.height/2-i.height/2,f=o[c]/2-i[c]/2,g;switch(a){case "top":g={x:m,y:o.y-i.height};break;case "bottom":g={x:m,y:o.y+o.height};break;case "right":g={x:o.x+o.width,y:d};break;case "left":g={x:o.x-i.width,y:d};break;default:g={x:o.x,y:o.y};}switch(Ze(r)){case "start":g[n]-=f*(e&&h?-1:1);break;case "end":g[n]+=f*(e&&h?-1:1);break}return g}var ya=async(t,r,e)=>{let{placement:o="bottom",strategy:i="absolute",middleware:s=[],platform:n}=e,c=s.filter(Boolean),a=await(n.isRTL==null?void 0:n.isRTL(r)),h=await n.getElementRects({reference:t,floating:r,strategy:i}),{x:m,y:d}=va(h,o,a),f=o,g={},b=0;for(let x=0;x<c.length;x++){let{name:I,fn:E}=c[x],{x:S,y:O,data:_,reset:C}=await E({x:m,y:d,initialPlacement:o,placement:f,strategy:i,middlewareData:g,rects:h,platform:n,elements:{reference:t,floating:r}});m=S??m,d=O??d,g={...g,[I]:{...g[I],..._}},C&&b<=50&&(b++,typeof C=="object"&&(C.placement&&(f=C.placement),C.rects&&(h=C.rects===true?await n.getElementRects({reference:t,floating:r,strategy:i}):C.rects),{x:m,y:d}=va(h,f,a)),x=-1);}return {x:m,y:d,placement:f,strategy:i,middlewareData:g}};async function mi(t,r){var e;r===void 0&&(r={});let{x:o,y:i,platform:s,rects:n,elements:c,strategy:a}=t,{boundary:h="clippingAncestors",rootBoundary:m="viewport",elementContext:d="floating",altBoundary:f=false,padding:g=0}=Qe(r,t),b=fs(g),I=c[f?d==="floating"?"reference":"floating":d],E=Je(await s.getClippingRect({element:(e=await(s.isElement==null?void 0:s.isElement(I)))==null||e?I:I.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:h,rootBoundary:m,strategy:a})),S=d==="floating"?{x:o,y:i,width:n.floating.width,height:n.floating.height}:n.reference,O=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),_=await(s.isElement==null?void 0:s.isElement(O))?await(s.getScale==null?void 0:s.getScale(O))||{x:1,y:1}:{x:1,y:1},C=Je(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:S,offsetParent:O,strategy:a}):S);return {top:(E.top-C.top+b.top)/_.y,bottom:(C.bottom-E.bottom+b.bottom)/_.y,left:(E.left-C.left+b.left)/_.x,right:(C.right-E.right+b.right)/_.x}}var xa=t=>({name:"arrow",options:t,async fn(r){let{x:e,y:o,placement:i,rects:s,platform:n,elements:c,middlewareData:a}=r,{element:h,padding:m=0}=Qe(t,r)||{};if(h==null)return {};let d=fs(m),f={x:e,y:o},g=ui(i),b=hi(g),x=await n.getDimensions(h),I=g==="y",E=I?"top":"left",S=I?"bottom":"right",O=I?"clientHeight":"clientWidth",_=s.reference[b]+s.reference[g]-f[g]-s.floating[b],C=f[g]-s.reference[g],D=await(n.getOffsetParent==null?void 0:n.getOffsetParent(h)),H=D?D[O]:0;(!H||!await(n.isElement==null?void 0:n.isElement(D)))&&(H=c.floating[O]||s.floating[b]);let U=_/2-C/2,M=H/2-x[b]/2-1,P=le(d[E],M),ht=le(d[S],M),st=P,wt=H-x[b]-ht,nt=H/2-x[b]/2+U,Ft=di(st,nt,wt),se=!a.arrow&&Ze(i)!=null&&nt!==Ft&&s.reference[b]/2-(nt<st?P:ht)-x[b]/2<0,Zt=se?nt<st?nt-st:nt-wt:0;return {[g]:f[g]+Zt,data:{[g]:Ft,centerOffset:nt-Ft-Zt,...se&&{alignmentOffset:Zt}},reset:se}}});var _a=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(r){var e,o;let{placement:i,middlewareData:s,rects:n,initialPlacement:c,platform:a,elements:h}=r,{mainAxis:m=true,crossAxis:d=true,fallbackPlacements:f,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=true,...I}=Qe(t,r);if((e=s.arrow)!=null&&e.alignmentOffset)return {};let E=ge(i),S=ce(c),O=ge(c)===c,_=await(a.isRTL==null?void 0:a.isRTL(h.floating)),C=f||(O||!x?[lo(c)]:ga(c)),D=b!=="none";!f&&D&&C.push(...ba(c,x,b,_));let H=[c,...C],U=await mi(r,I),M=[],P=((o=s.flip)==null?void 0:o.overflows)||[];if(m&&M.push(U[E]),d){let nt=fa(i,n,_);M.push(U[nt[0]],U[nt[1]]);}if(P=[...P,{placement:i,overflows:M}],!M.every(nt=>nt<=0)){var ht,st;let nt=(((ht=s.flip)==null?void 0:ht.index)||0)+1,Ft=H[nt];if(Ft&&(!(d==="alignment"?S!==ce(Ft):false)||P.every(Jt=>ce(Jt.placement)===S?Jt.overflows[0]>0:true)))return {data:{index:nt,overflows:P},reset:{placement:Ft}};let se=(st=P.filter(Zt=>Zt.overflows[0]<=0).sort((Zt,Jt)=>Zt.overflows[1]-Jt.overflows[1])[0])==null?void 0:st.placement;if(!se)switch(g){case "bestFit":{var wt;let Zt=(wt=P.filter(Jt=>{if(D){let _e=ce(Jt.placement);return _e===S||_e==="y"}return  true}).map(Jt=>[Jt.placement,Jt.overflows.filter(_e=>_e>0).reduce((_e,ql)=>_e+ql,0)]).sort((Jt,_e)=>Jt[1]-_e[1])[0])==null?void 0:wt[0];Zt&&(se=Zt);break}case "initialPlacement":se=c;break}if(i!==se)return {reset:{placement:se}}}return {}}}};var Gc=new Set(["left","top"]);async function Yc(t,r){let{placement:e,platform:o,elements:i}=t,s=await(o.isRTL==null?void 0:o.isRTL(i.floating)),n=ge(e),c=Ze(e),a=ce(e)==="y",h=Gc.has(n)?-1:1,m=s&&a?-1:1,d=Qe(r,t),{mainAxis:f,crossAxis:g,alignmentAxis:b}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return c&&typeof b=="number"&&(g=c==="end"?b*-1:b),a?{x:g*m,y:f*h}:{x:f*h,y:g*m}}var wa=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(r){var e,o;let{x:i,y:s,placement:n,middlewareData:c}=r,a=await Yc(r,t);return n===((e=c.offset)==null?void 0:e.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:i+a.x,y:s+a.y,data:{...a,placement:n}}}}},Sa=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(r){let{x:e,y:o,placement:i}=r,{mainAxis:s=true,crossAxis:n=false,limiter:c={fn:I=>{let{x:E,y:S}=I;return {x:E,y:S}}},...a}=Qe(t,r),h={x:e,y:o},m=await mi(r,a),d=ce(ge(i)),f=ms(d),g=h[f],b=h[d];if(s){let I=f==="y"?"top":"left",E=f==="y"?"bottom":"right",S=g+m[I],O=g-m[E];g=di(S,g,O);}if(n){let I=d==="y"?"top":"left",E=d==="y"?"bottom":"right",S=b+m[I],O=b-m[E];b=di(S,b,O);}let x=c.fn({...r,[f]:g,[d]:b});return {...x,data:{x:x.x-e,y:x.y-o,enabled:{[f]:s,[d]:n}}}}}};var Ca=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(r){var e,o;let{placement:i,rects:s,platform:n,elements:c}=r,{apply:a=()=>{},...h}=Qe(t,r),m=await mi(r,h),d=ge(i),f=Ze(i),g=ce(i)==="y",{width:b,height:x}=s.floating,I,E;d==="top"||d==="bottom"?(I=d,E=f===(await(n.isRTL==null?void 0:n.isRTL(c.floating))?"start":"end")?"left":"right"):(E=d,I=f==="end"?"top":"bottom");let S=x-m.top-m.bottom,O=b-m.left-m.right,_=le(x-m[I],S),C=le(b-m[E],O),D=!r.middlewareData.shift,H=_,U=C;if((e=r.middlewareData.shift)!=null&&e.enabled.x&&(U=O),(o=r.middlewareData.shift)!=null&&o.enabled.y&&(H=S),D&&!f){let P=kt(m.left,0),ht=kt(m.right,0),st=kt(m.top,0),wt=kt(m.bottom,0);g?U=b-2*(P!==0||ht!==0?P+ht:kt(m.left,m.right)):H=x-2*(st!==0||wt!==0?st+wt:kt(m.top,m.bottom));}await a({...r,availableWidth:U,availableHeight:H});let M=await n.getDimensions(c.floating);return b!==M.width||x!==M.height?{reset:{rects:true}}:{}}}};function fi(){return typeof window<"u"}function tr(t){return $a(t)?(t.nodeName||"").toLowerCase():"#document"}function It(t){var r;return (t==null||(r=t.ownerDocument)==null?void 0:r.defaultView)||window}function re(t){var r;return (r=($a(t)?t.ownerDocument:t.document)||window.document)==null?void 0:r.documentElement}function $a(t){return fi()?t instanceof Node||t instanceof It(t).Node:false}function Wt(t){return fi()?t instanceof Element||t instanceof It(t).Element:false}function oe(t){return fi()?t instanceof HTMLElement||t instanceof It(t).HTMLElement:false}function ka(t){return !fi()||typeof ShadowRoot>"u"?false:t instanceof ShadowRoot||t instanceof It(t).ShadowRoot}var Xc=new Set(["inline","contents"]);function Er(t){let{overflow:r,overflowX:e,overflowY:o,display:i}=jt(t);return /auto|scroll|overlay|hidden|clip/.test(r+o+e)&&!Xc.has(i)}var Qc=new Set(["table","td","th"]);function Ea(t){return Qc.has(tr(t))}var Zc=[":popover-open",":modal"];function ho(t){return Zc.some(r=>{try{return t.matches(r)}catch{return  false}})}var Jc=["transform","translate","scale","rotate","perspective"],tp=["transform","translate","scale","rotate","perspective","filter"],ep=["paint","layout","strict","content"];function Ar(t){let r=gi(),e=Wt(t)?jt(t):t;return Jc.some(o=>e[o]?e[o]!=="none":false)||(e.containerType?e.containerType!=="normal":false)||!r&&(e.backdropFilter?e.backdropFilter!=="none":false)||!r&&(e.filter?e.filter!=="none":false)||tp.some(o=>(e.willChange||"").includes(o))||ep.some(o=>(e.contain||"").includes(o))}function Aa(t){let r=be(t);for(;oe(r)&&!er(r);){if(Ar(r))return r;if(ho(r))return null;r=be(r);}return null}function gi(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}var rp=new Set(["html","body","#document"]);function er(t){return rp.has(tr(t))}function jt(t){return It(t).getComputedStyle(t)}function uo(t){return Wt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function be(t){if(tr(t)==="html")return t;let r=t.assignedSlot||t.parentNode||ka(t)&&t.host||re(t);return ka(r)?r.host:r}function Oa(t){let r=be(t);return er(r)?t.ownerDocument?t.ownerDocument.body:t.body:oe(r)&&Er(r)?r:Oa(r)}function $r(t,r,e){var o;r===void 0&&(r=[]),e===void 0&&(e=true);let i=Oa(t),s=i===((o=t.ownerDocument)==null?void 0:o.body),n=It(i);if(s){let c=bi(n);return r.concat(n,n.visualViewport||[],Er(i)?i:[],c&&e?$r(c):[])}return r.concat(i,$r(i,[],e))}function bi(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function za(t){let r=jt(t),e=parseFloat(r.width)||0,o=parseFloat(r.height)||0,i=oe(t),s=i?t.offsetWidth:e,n=i?t.offsetHeight:o,c=co(e)!==s||co(o)!==n;return c&&(e=s,o=n),{width:e,height:o,$:c}}function bs(t){return Wt(t)?t:t.contextElement}function Or(t){let r=bs(t);if(!oe(r))return ee(1);let e=r.getBoundingClientRect(),{width:o,height:i,$:s}=za(r),n=(s?co(e.width):e.width)/o,c=(s?co(e.height):e.height)/i;return (!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}var op=ee(0);function La(t){let r=It(t);return !gi()||!r.visualViewport?op:{x:r.visualViewport.offsetLeft,y:r.visualViewport.offsetTop}}function ip(t,r,e){return r===void 0&&(r=false),!e||r&&e!==It(t)?false:r}function rr(t,r,e,o){r===void 0&&(r=false),e===void 0&&(e=false);let i=t.getBoundingClientRect(),s=bs(t),n=ee(1);r&&(o?Wt(o)&&(n=Or(o)):n=Or(t));let c=ip(s,e,o)?La(s):ee(0),a=(i.left+c.x)/n.x,h=(i.top+c.y)/n.y,m=i.width/n.x,d=i.height/n.y;if(s){let f=It(s),g=o&&Wt(o)?It(o):o,b=f,x=bi(b);for(;x&&o&&g!==b;){let I=Or(x),E=x.getBoundingClientRect(),S=jt(x),O=E.left+(x.clientLeft+parseFloat(S.paddingLeft))*I.x,_=E.top+(x.clientTop+parseFloat(S.paddingTop))*I.y;a*=I.x,h*=I.y,m*=I.x,d*=I.y,a+=O,h+=_,b=It(x),x=bi(b);}}return Je({width:m,height:d,x:a,y:h})}function vi(t,r){let e=uo(t).scrollLeft;return r?r.left+e:rr(re(t)).left+e}function Va(t,r){let e=t.getBoundingClientRect(),o=e.left+r.scrollLeft-vi(t,e),i=e.top+r.scrollTop;return {x:o,y:i}}function sp(t){let{elements:r,rect:e,offsetParent:o,strategy:i}=t,s=i==="fixed",n=re(o),c=r?ho(r.floating):false;if(o===n||c&&s)return e;let a={scrollLeft:0,scrollTop:0},h=ee(1),m=ee(0),d=oe(o);if((d||!d&&!s)&&((tr(o)!=="body"||Er(n))&&(a=uo(o)),oe(o))){let g=rr(o);h=Or(o),m.x=g.x+o.clientLeft,m.y=g.y+o.clientTop;}let f=n&&!d&&!s?Va(n,a):ee(0);return {width:e.width*h.x,height:e.height*h.y,x:e.x*h.x-a.scrollLeft*h.x+m.x+f.x,y:e.y*h.y-a.scrollTop*h.y+m.y+f.y}}function np(t){return Array.from(t.getClientRects())}function ap(t){let r=re(t),e=uo(t),o=t.ownerDocument.body,i=kt(r.scrollWidth,r.clientWidth,o.scrollWidth,o.clientWidth),s=kt(r.scrollHeight,r.clientHeight,o.scrollHeight,o.clientHeight),n=-e.scrollLeft+vi(t),c=-e.scrollTop;return jt(o).direction==="rtl"&&(n+=kt(r.clientWidth,o.clientWidth)-i),{width:i,height:s,x:n,y:c}}var Ta=25;function lp(t,r){let e=It(t),o=re(t),i=e.visualViewport,s=o.clientWidth,n=o.clientHeight,c=0,a=0;if(i){s=i.width,n=i.height;let m=gi();(!m||m&&r==="fixed")&&(c=i.offsetLeft,a=i.offsetTop);}let h=vi(o);if(h<=0){let m=o.ownerDocument,d=m.body,f=getComputedStyle(d),g=m.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(o.clientWidth-d.clientWidth-g);b<=Ta&&(s-=b);}else h<=Ta&&(s+=h);return {width:s,height:n,x:c,y:a}}var cp=new Set(["absolute","fixed"]);function pp(t,r){let e=rr(t,true,r==="fixed"),o=e.top+t.clientTop,i=e.left+t.clientLeft,s=oe(t)?Or(t):ee(1),n=t.clientWidth*s.x,c=t.clientHeight*s.y,a=i*s.x,h=o*s.y;return {width:n,height:c,x:a,y:h}}function Ia(t,r,e){let o;if(r==="viewport")o=lp(t,e);else if(r==="document")o=ap(re(t));else if(Wt(r))o=pp(r,e);else {let i=La(t);o={x:r.x-i.x,y:r.y-i.y,width:r.width,height:r.height};}return Je(o)}function Pa(t,r){let e=be(t);return e===r||!Wt(e)||er(e)?false:jt(e).position==="fixed"||Pa(e,r)}function dp(t,r){let e=r.get(t);if(e)return e;let o=$r(t,[],false).filter(c=>Wt(c)&&tr(c)!=="body"),i=null,s=jt(t).position==="fixed",n=s?be(t):t;for(;Wt(n)&&!er(n);){let c=jt(n),a=Ar(n);!a&&c.position==="fixed"&&(i=null),(s?!a&&!i:!a&&c.position==="static"&&!!i&&cp.has(i.position)||Er(n)&&!a&&Pa(t,n))?o=o.filter(m=>m!==n):i=c,n=be(n);}return r.set(t,o),o}function hp(t){let{element:r,boundary:e,rootBoundary:o,strategy:i}=t,n=[...e==="clippingAncestors"?ho(r)?[]:dp(r,this._c):[].concat(e),o],c=n[0],a=n.reduce((h,m)=>{let d=Ia(r,m,i);return h.top=kt(d.top,h.top),h.right=le(d.right,h.right),h.bottom=le(d.bottom,h.bottom),h.left=kt(d.left,h.left),h},Ia(r,c,i));return {width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function up(t){let{width:r,height:e}=za(t);return {width:r,height:e}}function mp(t,r,e){let o=oe(r),i=re(r),s=e==="fixed",n=rr(t,true,s,r),c={scrollLeft:0,scrollTop:0},a=ee(0);function h(){a.x=vi(i);}if(o||!o&&!s)if((tr(r)!=="body"||Er(i))&&(c=uo(r)),o){let g=rr(r,true,s,r);a.x=g.x+r.clientLeft,a.y=g.y+r.clientTop;}else i&&h();s&&!o&&i&&h();let m=i&&!o&&!s?Va(i,c):ee(0),d=n.left+c.scrollLeft-a.x-m.x,f=n.top+c.scrollTop-a.y-m.y;return {x:d,y:f,width:n.width,height:n.height}}function gs(t){return jt(t).position==="static"}function Ra(t,r){if(!oe(t)||jt(t).position==="fixed")return null;if(r)return r(t);let e=t.offsetParent;return re(t)===e&&(e=e.ownerDocument.body),e}function Da(t,r){let e=It(t);if(ho(t))return e;if(!oe(t)){let i=be(t);for(;i&&!er(i);){if(Wt(i)&&!gs(i))return i;i=be(i);}return e}let o=Ra(t,r);for(;o&&Ea(o)&&gs(o);)o=Ra(o,r);return o&&er(o)&&gs(o)&&!Ar(o)?e:o||Aa(t)||e}var fp=async function(t){let r=this.getOffsetParent||Da,e=this.getDimensions,o=await e(t.floating);return {reference:mp(t.reference,await r(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function gp(t){return jt(t).direction==="rtl"}var mo={convertOffsetParentRelativeRectToViewportRelativeRect:sp,getDocumentElement:re,getClippingRect:hp,getOffsetParent:Da,getElementRects:fp,getClientRects:np,getDimensions:up,getScale:Or,isElement:Wt,isRTL:gp};function Ma(t,r){return t.x===r.x&&t.y===r.y&&t.width===r.width&&t.height===r.height}function bp(t,r){let e=null,o,i=re(t);function s(){var c;clearTimeout(o),(c=e)==null||c.disconnect(),e=null;}function n(c,a){c===void 0&&(c=false),a===void 0&&(a=1),s();let h=t.getBoundingClientRect(),{left:m,top:d,width:f,height:g}=h;if(c||r(),!f||!g)return;let b=po(d),x=po(i.clientWidth-(m+f)),I=po(i.clientHeight-(d+g)),E=po(m),O={rootMargin:-b+"px "+-x+"px "+-I+"px "+-E+"px",threshold:kt(0,le(1,a))||1},_=true;function C(D){let H=D[0].intersectionRatio;if(H!==a){if(!_)return n();H?n(false,H):o=setTimeout(()=>{n(false,1e-7);},1e3);}H===1&&!Ma(h,t.getBoundingClientRect())&&n(),_=false;}try{e=new IntersectionObserver(C,{...O,root:i.ownerDocument});}catch{e=new IntersectionObserver(C,O);}e.observe(t);}return n(true),s}function Fa(t,r,e,o){o===void 0&&(o={});let{ancestorScroll:i=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=false}=o,h=bs(t),m=i||s?[...h?$r(h):[],...$r(r)]:[];m.forEach(E=>{i&&E.addEventListener("scroll",e,{passive:true}),s&&E.addEventListener("resize",e);});let d=h&&c?bp(h,e):null,f=-1,g=null;n&&(g=new ResizeObserver(E=>{let[S]=E;S&&S.target===h&&g&&(g.unobserve(r),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var O;(O=g)==null||O.observe(r);})),e();}),h&&!a&&g.observe(h),g.observe(r));let b,x=a?rr(t):null;a&&I();function I(){let E=rr(t);x&&!Ma(x,E)&&e(),x=E,b=requestAnimationFrame(I);}return e(),()=>{var E;m.forEach(S=>{i&&S.removeEventListener("scroll",e),s&&S.removeEventListener("resize",e);}),d?.(),(E=g)==null||E.disconnect(),g=null,a&&cancelAnimationFrame(b);}}var Ha=wa;var Ba=Sa,Wa=_a,vs=Ca;var ja=xa;var Na=(t,r,e)=>{let o=new Map,i={platform:mo,...e},s={...i.platform,_c:o};return ya(t,r,{...i,platform:s})};function Ua(t){return vp(t)}function ys(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function vp(t){for(let r=t;r;r=ys(r))if(r instanceof Element&&getComputedStyle(r).display==="none")return null;for(let r=ys(t);r;r=ys(r)){if(!(r instanceof Element))continue;let e=getComputedStyle(r);if(e.display!=="contents"&&(e.position!=="static"||Ar(e)||r.tagName==="BODY"))return r}return null}function yp(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:true)}var X=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),r=this.popup.getBoundingClientRect(),e=this.placement.includes("top")||this.placement.includes("bottom"),o=0,i=0,s=0,n=0,c=0,a=0,h=0,m=0;e?t.top<r.top?(o=t.left,i=t.bottom,s=t.right,n=t.bottom,c=r.left,a=r.top,h=r.right,m=r.top):(o=r.left,i=r.bottom,s=r.right,n=r.bottom,c=t.left,a=t.top,h=t.right,m=t.top):t.left<r.left?(o=t.right,i=t.top,s=r.left,n=r.top,c=t.right,a=t.bottom,h=r.left,m=r.bottom):(o=r.right,i=r.top,s=t.left,n=t.top,c=r.right,a=r.bottom,h=t.left,m=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${m}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor);}else this.anchor instanceof Element||yp(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Fa(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t();})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Ha({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(vs({apply:({rects:e})=>{let o=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Wa({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Ba({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(vs({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(ja({element:this.arrowEl,padding:this.arrowPadding}));let r=this.strategy==="absolute"?e=>mo.getOffsetParent(e,Ua):mo.getOffsetParent;Na(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:fe(St({},mo),{getOffsetParent:r})}).then(({x:e,y:o,middlewareData:i,placement:s})=>{let n=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${e}px`,top:`${o}px`}),this.arrow){let a=i.arrow.x,h=i.arrow.y,m="",d="",f="",g="";if(this.arrowPlacement==="start"){let b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=n?"":b,g=n?b:"",f=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof a=="number"?"calc(50% - var(--arrow-size-diagonal))":"",m=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof a=="number"?`${a}px`:"",m=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:m,right:d,bottom:f,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return u`
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
    `}};X.styles=[V,ha];l([$(".popup")],X.prototype,"popup",2);l([$(".popup__arrow")],X.prototype,"arrowEl",2);l([p()],X.prototype,"anchor",2);l([p({type:Boolean,reflect:true})],X.prototype,"active",2);l([p({reflect:true})],X.prototype,"placement",2);l([p({reflect:true})],X.prototype,"strategy",2);l([p({type:Number})],X.prototype,"distance",2);l([p({type:Number})],X.prototype,"skidding",2);l([p({type:Boolean})],X.prototype,"arrow",2);l([p({attribute:"arrow-placement"})],X.prototype,"arrowPlacement",2);l([p({attribute:"arrow-padding",type:Number})],X.prototype,"arrowPadding",2);l([p({type:Boolean})],X.prototype,"flip",2);l([p({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(r=>r.trim()).filter(r=>r!==""),toAttribute:t=>t.join(" ")}})],X.prototype,"flipFallbackPlacements",2);l([p({attribute:"flip-fallback-strategy"})],X.prototype,"flipFallbackStrategy",2);l([p({type:Object})],X.prototype,"flipBoundary",2);l([p({attribute:"flip-padding",type:Number})],X.prototype,"flipPadding",2);l([p({type:Boolean})],X.prototype,"shift",2);l([p({type:Object})],X.prototype,"shiftBoundary",2);l([p({attribute:"shift-padding",type:Number})],X.prototype,"shiftPadding",2);l([p({attribute:"auto-size"})],X.prototype,"autoSize",2);l([p()],X.prototype,"sync",2);l([p({type:Object})],X.prototype,"autoSizeBoundary",2);l([p({attribute:"auto-size-padding",type:Number})],X.prototype,"autoSizePadding",2);l([p({attribute:"hover-bridge",type:Boolean})],X.prototype,"hoverBridge",2);var Ka=new Map,xp=new WeakMap;function _p(t){return t??{keyframes:[],options:{duration:0}}}function qa(t,r){return r.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Nt(t,r){Ka.set(t,_p(r));}function Ut(t,r,e){let o=xp.get(t);if(o?.[r])return qa(o[r],e.dir);let i=Ka.get(r);return i?qa(i,e.dir):{keyframes:[],options:{duration:0}}}function ve(t,r){return new Promise(e=>{function o(i){i.target===t&&(t.removeEventListener(r,o),e());}t.addEventListener(r,o);})}function qt(t,r,e){return new Promise(o=>{if(e?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=t.animate(r,fe(St({},e),{duration:wp()?0:e.duration}));i.addEventListener("cancel",o,{once:true}),i.addEventListener("finish",o,{once:true});})}function wp(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Kt(t){return Promise.all(t.getAnimations().map(r=>new Promise(e=>{r.cancel(),requestAnimationFrame(e);})))}function Tr(t,r){return t.map(e=>fe(St({},e),{height:e.height==="auto"?`${r}px`:e.height}))}var j=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ct(this,"help-text","label"),this.localize=new W(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=t=>u`
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
    `,this.handleDocumentFocusIn=t=>{let r=t.composedPath();this&&!r.includes(this)&&this.hide();},this.handleDocumentKeyDown=t=>{let r=t.target,e=r.closest(".select__clear")!==null,o=r.closest("sl-icon-button")!==null;if(!(e||o)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let i=this.getAllOptions(),s=i.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>i.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=i.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n]);}if(t.key&&t.key.length===1||t.key==="Backspace"){let i=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show();}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of i)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let r=t.composedPath();this&&!r.includes(this)&&this.hide();};}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=true,this._value=t);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(t){let e=t.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="sl-icon-button");this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t));}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault();}handleOptionClick(t){let e=t.target.closest("sl-option"),o=this.value;e&&!e.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),r=this.valueHasChanged?this.value:this.defaultValue,e=Array.isArray(r)?r:[r],o=[];t.forEach(i=>o.push(i.value)),this.setSelectedOptions(t.filter(i=>e.includes(i.value)));}handleTagRemove(t,r){t.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(r,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(e=>{e.current=false,e.tabIndex=-1;}),t&&(this.currentOption=t,t.current=true,t.tabIndex=0,t.focus());}setSelectedOptions(t){let r=this.getAllOptions(),e=Array.isArray(t)?t:[t];r.forEach(o=>o.selected=false),e.length&&e.forEach(o=>o.selected=true),this.selectionChanged();}toggleOptionSelection(t,r){r===true||r===false?t.selected=r:t.selected=!t.selected,this.selectionChanged();}selectionChanged(){var t,r,e;let o=this.getAllOptions();this.selectedOptions=o.filter(s=>s.selected);let i=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(e=(r=s?.getTextLabel)==null?void 0:r.call(s))!=null?e:"";}this.valueHasChanged=i,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((t,r)=>{if(r<this.maxOptionsVisible||this.maxOptionsVisible<=0){let e=this.getTag(t,r);return u`<div @sl-remove=${o=>this.handleTagRemove(o,t)}>
          ${typeof e=="string"?Ot(e):e}
        </div>`}else if(r===this.maxOptionsVisible)return u`<sl-tag size=${this.size}>+${this.selectedOptions.length-r}</sl-tag>`;return u``})}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(t,r,e){if(super.attributeChangedCallback(t,r,e),t==="value"){let o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o;}}handleValueChange(){if(!this.valueHasChanged){let e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e;}let t=this.getAllOptions(),r=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(e=>r.includes(e.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Kt(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:t,options:r}=Ut(this,"select.show",{dir:this.localize.dir()});await qt(this.popup.popup,t,r),this.currentOption&&ao(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Kt(this);let{keyframes:t,options:r}=Ut(this,"select.hide",{dir:this.localize.dir()});await qt(this.popup.popup,t,r),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,ve(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,ve(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity();}focus(t){this.displayInput.focus(t);}blur(){this.displayInput.blur();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r,i=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return u`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":o})}
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
          aria-hidden=${o?"false":"true"}
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
`;var Dt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let t=this.childNodes,r="";return [...t].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("slot")||(r+=e.textContent)),e.nodeType===Node.TEXT_NODE&&(r+=e.textContent);}),r.trim()}render(){return u`
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
`;var xs="__AS_ASYNC_COMPUTED_VALUE__";function _i(t){return toString.call(t)==="[object Map]"}function Ie(t){return t&&typeof t=="object"&&t.hasOwnProperty(xs)}function Ss(t,r){let e=t.get(r);if(e!==void 0)return e;let o=t.get(Number(r)||r);if(o!==void 0)return o}function ye(t,r,e){if(!r||r.length===0)return t;let o=Array.isArray(r)?r:r.split("."),i,s=t;for(let n=0;n<o.length;n++){let c=o[n];if(_i(s))i=Ss(s,c);else if(c in s)i=s[c];else return e;s=i;}return i}function ks(t,r){return t.length>r.length?false:t.every((e,o)=>e===r[o])}(t=>typeof Be<"u"?Be:typeof Proxy<"u"?new Proxy(t,{get:(r,e)=>(typeof Be<"u"?Be:r)[e]}):t)(function(t){if(typeof Be<"u")return Be.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var ze=class{constructor(r,e,o){this.path=e;this.handle=o;this._loading=false;this._ready=false;this.host=r,r.addController(this);}get loading(){return this._loading}get value(){return this._value}load(){let r=this.host.schema,e=ye(r,this.path);Ie(e)?e.loading?(this._loading=true,this._value=this.handle(void 0)):(this._ready=e.value!==void 0,this._value=this.handle(e.value),this._loading=false):(this._ready=true,this._value=this.handle(e),this._loading=false);}render(r){return u`
            ${B(this.loading,()=>u`<auto-loading></auto-loading>`,()=>r(this._value))}
        `}hostUpdate(){this._ready||this.load();}hostUpdated(){}};exports.AutoFieldSelect=class fo extends R{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";this.items=new ze(this,"select",e=>e?e.map(o=>{let i={};return typeof o=="object"?Object.assign(i,o):typeof o=="string"&&o.startsWith("-")?Object.assign(i,{type:"divider"}):Object.assign(i,{label:o}),i}):[]);}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}_renderItem(e){let o=this.options.renderItem;return typeof o=="string"?u`${Ot(o.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof o=="function"?u`${Ot(o(e))}`:e.label||e.value}_onDropdownMenu(){}renderInput(){return u`
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
        `],exports.AutoFieldSelect=v([T("auto-field-select")],exports.AutoFieldSelect);var rl=y`
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
`;var et=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this),this.hasSlotController=new ct(this,"help-text","label"),this.localize=new W(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`);}syncTooltip(t){if(this.output!==null){let r=this.input.offsetWidth,e=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",s=r*t;if(i){let n=`${r-s}px + ${t} * ${o}`;this.output.style.translate=`calc((${n} - ${e/2}px - ${o} / 2))`;}else {let n=`${s}px - ${t} * ${o}`;this.output.style.translate=`calc(${n} - ${e/2}px + ${o} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t));}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}focus(t){this.input.focus(t);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r;return u`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--medium":true,"form-control--has-label":e,"form-control--has-help-text":o})}
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};et.styles=[V,Tt,rl];l([$(".range__control")],et.prototype,"input",2);l([$(".range__tooltip")],et.prototype,"output",2);l([k()],et.prototype,"hasFocus",2);l([k()],et.prototype,"hasTooltip",2);l([p()],et.prototype,"title",2);l([p()],et.prototype,"name",2);l([p({type:Number})],et.prototype,"value",2);l([p()],et.prototype,"label",2);l([p({attribute:"help-text"})],et.prototype,"helpText",2);l([p({type:Boolean,reflect:true})],et.prototype,"disabled",2);l([p({type:Number})],et.prototype,"min",2);l([p({type:Number})],et.prototype,"max",2);l([p({type:Number})],et.prototype,"step",2);l([p()],et.prototype,"tooltip",2);l([p({attribute:false})],et.prototype,"tooltipFormatter",2);l([p({reflect:true})],et.prototype,"form",2);l([Ht()],et.prototype,"defaultValue",2);l([Ce({passive:true})],et.prototype,"handleThumbDragStart",1);l([A("value",{waitUntilFirstUpdate:true})],et.prototype,"handleValueChange",1);l([A("disabled",{waitUntilFirstUpdate:true})],et.prototype,"handleDisabledChange",1);l([A("hasTooltip",{waitUntilFirstUpdate:true})],et.prototype,"syncRange",1);et.define("sl-range");exports.AutoFieldRabge=class go extends R{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top"}}renderInput(){return u`
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
        `],exports.AutoFieldRabge=v([T("auto-field-range")],exports.AutoFieldRabge);var ol=y`
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
`;function dt(t,r,e){let o=i=>Object.is(i,-0)?0:i;return t<r?o(r):t>e?o(e):o(t)}var _t=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let r=this.localize.dir()==="rtl",{left:e,right:o,width:i}=this.rating.getBoundingClientRect(),s=r?this.roundToPrecision((o-t)/i*this.max,this.precision):this.roundToPrecision((t-e)/i*this.max,this.precision);return dt(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"));}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=false);}handleKeyDown(t){let r=this.localize.dir()==="ltr",e=this.localize.dir()==="rtl",o=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||r&&t.key==="ArrowLeft"||e&&t.key==="ArrowRight"){let i=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-i),t.preventDefault();}if(t.key==="ArrowUp"||r&&t.key==="ArrowRight"||e&&t.key==="ArrowLeft"){let i=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+i),t.preventDefault();}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==o&&this.emit("sl-change");}}handleMouseEnter(t){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(t);}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(t){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault();}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t);}handleTouchEnd(t){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault();}roundToPrecision(t,r=.5){let e=1/r;return Math.ceil(t*e)/e}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(t){this.rating.focus(t);}blur(){this.rating.blur();}render(){let t=this.localize.dir()==="rtl",r=Array.from(Array(this.max).keys()),e=0;return this.disabled||this.readonly?e=this.value:e=this.isHovering?this.hoverValue:this.value,u`
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
          ${r.map(o=>e>o&&e<o+1?u`
                <span
                  class=${z({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===o+1})}
                  role="presentation"
                >
                  <div
                    style=${J({clipPath:t?`inset(0 ${(e-o)*100}% 0 0)`:`inset(0 0 0 ${(e-o)*100}%)`})}
                  >
                    ${Ot(this.getSymbol(o+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${J({clipPath:t?`inset(0 0 0 ${100-(e-o)*100}%)`:`inset(0 ${100-(e-o)*100}% 0 0)`})}
                  >
                    ${Ot(this.getSymbol(o+1))}
                  </div>
                </span>
              `:u`
              <span
                class=${z({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(e)===o+1,"rating__symbol--active":e>=o+1})}
                role="presentation"
              >
                ${Ot(this.getSymbol(o+1))}
              </span>
            `)}
        </span>
      </div>
    `}};_t.styles=[V,ol];_t.dependencies={"sl-icon":q};l([$(".rating")],_t.prototype,"rating",2);l([k()],_t.prototype,"hoverValue",2);l([k()],_t.prototype,"isHovering",2);l([p()],_t.prototype,"label",2);l([p({type:Number})],_t.prototype,"value",2);l([p({type:Number})],_t.prototype,"max",2);l([p({type:Number})],_t.prototype,"precision",2);l([p({type:Boolean,reflect:true})],_t.prototype,"readonly",2);l([p({type:Boolean,reflect:true})],_t.prototype,"disabled",2);l([p()],_t.prototype,"getSymbol",2);l([Ce({passive:true})],_t.prototype,"handleTouchMove",1);l([A("hoverValue")],_t.prototype,"handleHoverValueChange",1);l([A("isHovering")],_t.prototype,"handleIsHoveringChange",1);_t.define("sl-rating");exports.AutoFieldRating=class wi extends R{getInitialOptions(){return {max:5,precision:1}}renderInput(){return u`
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
`;var F=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ct(this,"help-text","label"),this.localize=new W(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value;}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleKeyDown(t){let r=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!r&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(t){this.input.focus(t);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(t,r,e="none"){this.input.setSelectionRange(t,r,e);}setRangeText(t,r,e,o="preserve"){let i=r??this.input.selectionStart,s=e??this.input.selectionEnd;this.input.setRangeText(t,i,s,o),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),e=this.label?true:!!t,o=this.helpText?true:!!r,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return u`
      <div
        part="form-control"
        class=${z({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":o})}
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
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};F.styles=[V,Tt,sl];F.dependencies={"sl-icon":q};l([$(".input__control")],F.prototype,"input",2);l([k()],F.prototype,"hasFocus",2);l([p()],F.prototype,"title",2);l([p({reflect:true})],F.prototype,"type",2);l([p()],F.prototype,"name",2);l([p()],F.prototype,"value",2);l([Ht()],F.prototype,"defaultValue",2);l([p({reflect:true})],F.prototype,"size",2);l([p({type:Boolean,reflect:true})],F.prototype,"filled",2);l([p({type:Boolean,reflect:true})],F.prototype,"pill",2);l([p()],F.prototype,"label",2);l([p({attribute:"help-text"})],F.prototype,"helpText",2);l([p({type:Boolean})],F.prototype,"clearable",2);l([p({type:Boolean,reflect:true})],F.prototype,"disabled",2);l([p()],F.prototype,"placeholder",2);l([p({type:Boolean,reflect:true})],F.prototype,"readonly",2);l([p({attribute:"password-toggle",type:Boolean})],F.prototype,"passwordToggle",2);l([p({attribute:"password-visible",type:Boolean})],F.prototype,"passwordVisible",2);l([p({attribute:"no-spin-buttons",type:Boolean})],F.prototype,"noSpinButtons",2);l([p({reflect:true})],F.prototype,"form",2);l([p({type:Boolean,reflect:true})],F.prototype,"required",2);l([p()],F.prototype,"pattern",2);l([p({type:Number})],F.prototype,"minlength",2);l([p({type:Number})],F.prototype,"maxlength",2);l([p()],F.prototype,"min",2);l([p()],F.prototype,"max",2);l([p()],F.prototype,"step",2);l([p()],F.prototype,"autocapitalize",2);l([p()],F.prototype,"autocorrect",2);l([p()],F.prototype,"autocomplete",2);l([p({type:Boolean})],F.prototype,"autofocus",2);l([p()],F.prototype,"enterkeyhint",2);l([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],F.prototype,"spellcheck",2);l([p()],F.prototype,"inputmode",2);l([A("disabled",{waitUntilFirstUpdate:true})],F.prototype,"handleDisabledChange",1);l([A("step",{waitUntilFirstUpdate:true})],F.prototype,"handleStepChange",1);l([A("value",{waitUntilFirstUpdate:true})],F.prototype,"handleValueChange",1);function Ir(t,r){function e(i){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,c=s.left+n.scrollX,a=s.top+n.scrollY,h=i.pageX-c,m=i.pageY-a;r?.onMove&&r.onMove(h,m);}function o(){document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",o),r?.onStop&&r.onStop();}document.addEventListener("pointermove",e,{passive:true}),document.addEventListener("pointerup",o),r?.initialEvent instanceof PointerEvent&&e(r.initialEvent);}var nl=y`
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
`;function*ll(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Ln(ll(t.shadowRoot.activeElement))));}function cl(){return [...ll()].pop()}var al=new WeakMap;function pl(t){let r=al.get(t);return r||(r=window.getComputedStyle(t,null),al.set(t,r)),r}function Hp(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let r=pl(t);return r.visibility!=="hidden"&&r.display!=="none"}function Bp(t){let r=pl(t),{overflowY:e,overflowX:o}=r;return e==="scroll"||o==="scroll"?true:e!=="auto"||o!=="auto"?false:t.scrollHeight>t.clientHeight&&e==="auto"||t.scrollWidth>t.clientWidth&&o==="auto"}function Wp(t){let r=t.tagName.toLowerCase(),e=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return  false;if(r==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${n}:checked`);return c?c===t:s.querySelector(n)===t}return Hp(t)?(r==="audio"||r==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(r)?true:Bp(t):false}function dl(t){var r,e;let o=Np(t),i=(r=o[0])!=null?r:null,s=(e=o[o.length-1])!=null?e:null;return {start:i,end:s}}function jp(t,r){var e;return ((e=t.getRootNode({composed:true}))==null?void 0:e.host)!==r}function Np(t){let r=new WeakMap,e=[];function o(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||r.has(i))return;r.set(i,true),!e.includes(i)&&Wp(i)&&e.push(i),i instanceof HTMLSlotElement&&jp(i,t)&&i.assignedElements({flatten:true}).forEach(s=>{o(s);}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&o(i.shadowRoot);}for(let s of i.children)o(s);}return o(t),e.sort((i,s)=>{let n=Number(i.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var ut=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=t=>{var r;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((r=document.activeElement)==null?void 0:r.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let e=(o,i)=>{if(!o)return null;let s=o.closest(i);if(s)return s;let n=o.getRootNode();return n instanceof ShadowRoot?e(n.host,i):null};setTimeout(()=>{var o;let i=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?cl():document.activeElement;(!this.containingElement||e(i,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=t=>{let r=t.composedPath();this.containingElement&&!r.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=t=>{let r=t.target;!this.stayOpenOnSelect&&r.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:true})[0];typeof t?.focus=="function"&&t.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let r=this.getMenu();if(r){let e=r.getAllItems(),o=e[0],i=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),e.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(r.setCurrentItem(o),o.focus()),(t.key==="ArrowUp"||t.key==="End")&&(r.setCurrentItem(i),i.focus());}));}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let r=this.trigger.assignedElements({flatten:true}).find(o=>dl(o).start),e;if(r){switch(r.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":e=r.button;break;default:e=r;}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,ve(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,ve(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Kt(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:t,options:r}=Ut(this,"dropdown.show",{dir:this.localize.dir()});await qt(this.popup.popup,t,r),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Kt(this);let{keyframes:t,options:r}=Ut(this,"dropdown.hide",{dir:this.localize.dir()});await qt(this.popup.popup,t,r),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return u`
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
    `}};xe.styles=[V,ul];var G=class extends L{constructor(){super(...arguments),this.formControlController=new ft(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new ct(this,"[default]","prefix","suffix"),this.localize=new W(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:wr}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(t){this.button.focus(t);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity());}render(){let t=this.isLink(),r=t?Sr`a`:Sr`button`;return Te`
      <${r}
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
      </${r}>
    `}};G.styles=[V,Zo];G.dependencies={"sl-icon":q,"sl-spinner":xe};l([$(".button")],G.prototype,"button",2);l([k()],G.prototype,"hasFocus",2);l([k()],G.prototype,"invalid",2);l([p()],G.prototype,"title",2);l([p({reflect:true})],G.prototype,"variant",2);l([p({reflect:true})],G.prototype,"size",2);l([p({type:Boolean,reflect:true})],G.prototype,"caret",2);l([p({type:Boolean,reflect:true})],G.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],G.prototype,"loading",2);l([p({type:Boolean,reflect:true})],G.prototype,"outline",2);l([p({type:Boolean,reflect:true})],G.prototype,"pill",2);l([p({type:Boolean,reflect:true})],G.prototype,"circle",2);l([p()],G.prototype,"type",2);l([p()],G.prototype,"name",2);l([p()],G.prototype,"value",2);l([p()],G.prototype,"href",2);l([p()],G.prototype,"target",2);l([p()],G.prototype,"rel",2);l([p()],G.prototype,"download",2);l([p()],G.prototype,"form",2);l([p({attribute:"formaction"})],G.prototype,"formAction",2);l([p({attribute:"formenctype"})],G.prototype,"formEnctype",2);l([p({attribute:"formmethod"})],G.prototype,"formMethod",2);l([p({attribute:"formnovalidate",type:Boolean})],G.prototype,"formNoValidate",2);l([p({attribute:"formtarget"})],G.prototype,"formTarget",2);l([A("disabled",{waitUntilFirstUpdate:true})],G.prototype,"handleDisabledChange",1);function mt(t,r){Up(t)&&(t="100%");let e=qp(t);return t=r===360?t:Math.min(r,Math.max(0,parseFloat(t))),e&&(t=parseInt(String(t*r),10)/100),Math.abs(t-r)<1e-6?1:(r===360?t=(t<0?t%r+r:t%r)/parseFloat(String(r)):t=t%r/parseFloat(String(r)),t)}function bo(t){return Math.min(1,Math.max(0,t))}function Up(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function qp(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Si(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function vo(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Le(t){return t.length===1?"0"+t:String(t)}function ml(t,r,e){return {r:mt(t,255)*255,g:mt(r,255)*255,b:mt(e,255)*255}}function Os(t,r,e){t=mt(t,255),r=mt(r,255),e=mt(e,255);let o=Math.max(t,r,e),i=Math.min(t,r,e),s=0,n=0,c=(o+i)/2;if(o===i)n=0,s=0;else {let a=o-i;switch(n=c>.5?a/(2-o-i):a/(o+i),o){case t:s=(r-e)/a+(r<e?6:0);break;case r:s=(e-t)/a+2;break;case e:s=(t-r)/a+4;break;}s/=6;}return {h:s,s:n,l:c}}function As(t,r,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+(r-t)*(6*e):e<1/2?r:e<2/3?t+(r-t)*(2/3-e)*6:t}function fl(t,r,e){let o,i,s;if(t=mt(t,360),r=mt(r,100),e=mt(e,100),r===0)i=e,s=e,o=e;else {let n=e<.5?e*(1+r):e+r-e*r,c=2*e-n;o=As(c,n,t+1/3),i=As(c,n,t),s=As(c,n,t-1/3);}return {r:o*255,g:i*255,b:s*255}}function Ts(t,r,e){t=mt(t,255),r=mt(r,255),e=mt(e,255);let o=Math.max(t,r,e),i=Math.min(t,r,e),s=0,n=o,c=o-i,a=o===0?0:c/o;if(o===i)s=0;else {switch(o){case t:s=(r-e)/c+(r<e?6:0);break;case r:s=(e-t)/c+2;break;case e:s=(t-r)/c+4;break;}s/=6;}return {h:s,s:a,v:n}}function gl(t,r,e){t=mt(t,360)*6,r=mt(r,100),e=mt(e,100);let o=Math.floor(t),i=t-o,s=e*(1-r),n=e*(1-i*r),c=e*(1-(1-i)*r),a=o%6,h=[e,n,s,s,c,e][a],m=[c,e,e,n,s,s][a],d=[s,s,c,e,e,n][a];return {r:h*255,g:m*255,b:d*255}}function Is(t,r,e,o){let i=[Le(Math.round(t).toString(16)),Le(Math.round(r).toString(16)),Le(Math.round(e).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function bl(t,r,e,o,i){let s=[Le(Math.round(t).toString(16)),Le(Math.round(r).toString(16)),Le(Math.round(e).toString(16)),Le(Kp(o))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function vl(t,r,e,o){let i=t/100,s=r/100,n=e/100,c=o/100,a=255*(1-i)*(1-c),h=255*(1-s)*(1-c),m=255*(1-n)*(1-c);return {r:a,g:h,b:m}}function Rs(t,r,e){let o=1-t/255,i=1-r/255,s=1-e/255,n=Math.min(o,i,s);return n===1?(o=0,i=0,s=0):(o=(o-n)/(1-n)*100,i=(i-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(o),m:Math.round(i),y:Math.round(s),k:Math.round(n)}}function Kp(t){return Math.round(parseFloat(t)*255).toString(16)}function zs(t){return Rt(t)/255}function Rt(t){return parseInt(t,16)}function yl(t){return {r:t>>16,g:(t&65280)>>8,b:t&255}}var yo={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function xl(t){let r={r:0,g:0,b:0},e=1,o=null,i=null,s=null,n=false,c=false;return typeof t=="string"&&(t=Xp(t)),typeof t=="object"&&(Mt(t.r)&&Mt(t.g)&&Mt(t.b)?(r=ml(t.r,t.g,t.b),n=true,c=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Mt(t.h)&&Mt(t.s)&&Mt(t.v)?(o=vo(t.s),i=vo(t.v),r=gl(t.h,o,i),n=true,c="hsv"):Mt(t.h)&&Mt(t.s)&&Mt(t.l)?(o=vo(t.s),s=vo(t.l),r=fl(t.h,o,s),n=true,c="hsl"):Mt(t.c)&&Mt(t.m)&&Mt(t.y)&&Mt(t.k)&&(r=vl(t.c,t.m,t.y,t.k),n=true,c="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(e=t.a)),e=Si(e),{ok:n,format:t.format||c,r:Math.min(255,Math.max(r.r,0)),g:Math.min(255,Math.max(r.g,0)),b:Math.min(255,Math.max(r.b,0)),a:e}}var Gp="[-\\+]?\\d+%?",Yp="[-\\+]?\\d*\\.\\d+%?",Ve="(?:"+Yp+")|(?:"+Gp+")",Ls="[\\s|\\(]+("+Ve+")[,|\\s]+("+Ve+")[,|\\s]+("+Ve+")\\s*\\)?",Ci="[\\s|\\(]+("+Ve+")[,|\\s]+("+Ve+")[,|\\s]+("+Ve+")[,|\\s]+("+Ve+")\\s*\\)?",Gt={CSS_UNIT:new RegExp(Ve),rgb:new RegExp("rgb"+Ls),rgba:new RegExp("rgba"+Ci),hsl:new RegExp("hsl"+Ls),hsla:new RegExp("hsla"+Ci),hsv:new RegExp("hsv"+Ls),hsva:new RegExp("hsva"+Ci),cmyk:new RegExp("cmyk"+Ci),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Xp(t){if(t=t.trim().toLowerCase(),t.length===0)return  false;let r=false;if(yo[t])t=yo[t],r=true;else if(t==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let e=Gt.rgb.exec(t);return e?{r:e[1],g:e[2],b:e[3]}:(e=Gt.rgba.exec(t),e?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=Gt.hsl.exec(t),e?{h:e[1],s:e[2],l:e[3]}:(e=Gt.hsla.exec(t),e?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=Gt.hsv.exec(t),e?{h:e[1],s:e[2],v:e[3]}:(e=Gt.hsva.exec(t),e?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=Gt.cmyk.exec(t),e?{c:e[1],m:e[2],y:e[3],k:e[4]}:(e=Gt.hex8.exec(t),e?{r:Rt(e[1]),g:Rt(e[2]),b:Rt(e[3]),a:zs(e[4]),format:r?"name":"hex8"}:(e=Gt.hex6.exec(t),e?{r:Rt(e[1]),g:Rt(e[2]),b:Rt(e[3]),format:r?"name":"hex"}:(e=Gt.hex4.exec(t),e?{r:Rt(e[1]+e[1]),g:Rt(e[2]+e[2]),b:Rt(e[3]+e[3]),a:zs(e[4]+e[4]),format:r?"name":"hex8"}:(e=Gt.hex3.exec(t),e?{r:Rt(e[1]+e[1]),g:Rt(e[2]+e[2]),b:Rt(e[3]+e[3]),format:r?"name":"hex"}:false))))))))))}function Mt(t){return typeof t=="number"?!Number.isNaN(t):Gt.CSS_UNIT.test(t)}var xo=class t{constructor(r="",e={}){if(r instanceof t)return r;typeof r=="number"&&(r=yl(r)),this.originalInput=r;let o=xl(r);this.originalInput=r,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??o.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let r=this.toRgb();return (r.r*299+r.g*587+r.b*114)/1e3}getLuminance(){let r=this.toRgb(),e,o,i,s=r.r/255,n=r.g/255,c=r.b/255;return s<=.03928?e=s/12.92:e=Math.pow((s+.055)/1.055,2.4),n<=.03928?o=n/12.92:o=Math.pow((n+.055)/1.055,2.4),c<=.03928?i=c/12.92:i=Math.pow((c+.055)/1.055,2.4),.2126*e+.7152*o+.0722*i}getAlpha(){return this.a}setAlpha(r){return this.a=Si(r),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:r}=this.toHsl();return r===0}toHsv(){let r=Ts(this.r,this.g,this.b);return {h:r.h*360,s:r.s,v:r.v,a:this.a}}toHsvString(){let r=Ts(this.r,this.g,this.b),e=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.v*100);return this.a===1?`hsv(${e}, ${o}%, ${i}%)`:`hsva(${e}, ${o}%, ${i}%, ${this.roundA})`}toHsl(){let r=Os(this.r,this.g,this.b);return {h:r.h*360,s:r.s,l:r.l,a:this.a}}toHslString(){let r=Os(this.r,this.g,this.b),e=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.l*100);return this.a===1?`hsl(${e}, ${o}%, ${i}%)`:`hsla(${e}, ${o}%, ${i}%, ${this.roundA})`}toHex(r=false){return Is(this.r,this.g,this.b,r)}toHexString(r=false){return "#"+this.toHex(r)}toHex8(r=false){return bl(this.r,this.g,this.b,this.a,r)}toHex8String(r=false){return "#"+this.toHex8(r)}toHexShortString(r=false){return this.a===1?this.toHexString(r):this.toHex8String(r)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let r=Math.round(this.r),e=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${r}, ${e}, ${o})`:`rgba(${r}, ${e}, ${o}, ${this.roundA})`}toPercentageRgb(){let r=e=>`${Math.round(mt(e,255)*100)}%`;return {r:r(this.r),g:r(this.g),b:r(this.b),a:this.a}}toPercentageRgbString(){let r=e=>Math.round(mt(e,255)*100);return this.a===1?`rgb(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%)`:`rgba(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%, ${this.roundA})`}toCmyk(){return {...Rs(this.r,this.g,this.b)}}toCmykString(){let{c:r,m:e,y:o,k:i}=Rs(this.r,this.g,this.b);return `cmyk(${r}, ${e}, ${o}, ${i})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let r="#"+Is(this.r,this.g,this.b,false);for(let[e,o]of Object.entries(yo))if(r===o)return e;return  false}toString(r){let e=!!r;r=r??this.format;let o=false,i=this.a<1&&this.a>=0;return !e&&i&&(r.startsWith("hex")||r==="name")?r==="name"&&this.a===0?this.toName():this.toRgbString():(r==="rgb"&&(o=this.toRgbString()),r==="prgb"&&(o=this.toPercentageRgbString()),(r==="hex"||r==="hex6")&&(o=this.toHexString()),r==="hex3"&&(o=this.toHexString(true)),r==="hex4"&&(o=this.toHex8String(true)),r==="hex8"&&(o=this.toHex8String()),r==="name"&&(o=this.toName()),r==="hsl"&&(o=this.toHslString()),r==="hsv"&&(o=this.toHsvString()),r==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(r=10){let e=this.toHsl();return e.l+=r/100,e.l=bo(e.l),new t(e)}brighten(r=10){let e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(r/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(r/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(r/100)))),new t(e)}darken(r=10){let e=this.toHsl();return e.l-=r/100,e.l=bo(e.l),new t(e)}tint(r=10){return this.mix("white",r)}shade(r=10){return this.mix("black",r)}desaturate(r=10){let e=this.toHsl();return e.s-=r/100,e.s=bo(e.s),new t(e)}saturate(r=10){let e=this.toHsl();return e.s+=r/100,e.s=bo(e.s),new t(e)}greyscale(){return this.desaturate(100)}spin(r){let e=this.toHsl(),o=(e.h+r)%360;return e.h=o<0?360+o:o,new t(e)}mix(r,e=50){let o=this.toRgb(),i=new t(r).toRgb(),s=e/100,n={r:(i.r-o.r)*s+o.r,g:(i.g-o.g)*s+o.g,b:(i.b-o.b)*s+o.b,a:(i.a-o.a)*s+o.a};return new t(n)}analogous(r=6,e=30){let o=this.toHsl(),i=360/e,s=[this];for(o.h=(o.h-(i*r>>1)+720)%360;--r;)o.h=(o.h+i)%360,s.push(new t(o));return s}complement(){let r=this.toHsl();return r.h=(r.h+180)%360,new t(r)}monochromatic(r=6){let e=this.toHsv(),{h:o}=e,{s:i}=e,{v:s}=e,n=[],c=1/r;for(;r--;)n.push(new t({h:o,s:i,v:s})),s=(s+c)%1;return n}splitcomplement(){let r=this.toHsl(),{h:e}=r;return [this,new t({h:(e+72)%360,s:r.s,l:r.l}),new t({h:(e+216)%360,s:r.s,l:r.l})]}onBackground(r){let e=this.toRgb(),o=new t(r).toRgb(),i=e.a+o.a*(1-e.a);return new t({r:(e.r*e.a+o.r*o.a*(1-e.a))/i,g:(e.g*e.a+o.g*o.a*(1-e.a))/i,b:(e.b*e.a+o.b*o.a*(1-e.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(r){let e=this.toHsl(),{h:o}=e,i=[this],s=360/r;for(let n=1;n<r;n++)i.push(new t({h:(o+n*s)%360,s:e.s,l:e.l}));return i}equals(r){let e=new t(r);return this.format==="cmyk"||e.format==="cmyk"?this.toCmykString()===e.toCmykString():this.toRgbString()===e.toRgbString()}};var _l="EyeDropper"in window,N=class extends L{constructor(){super(),this.formControlController=new ft(this),this.isSafeValue=false,this.localize=new W(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],r=(t.indexOf(this.format)+1)%t.length;this.format=t[r],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(t){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),e=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),Ir(r,{onMove:n=>{this.alpha=dt(n/o*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleHueDrag(t){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),e=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;e.focus(),t.preventDefault(),Ir(r,{onMove:n=>{this.hue=dt(n/o*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:t});}handleGridDrag(t){let r=this.shadowRoot.querySelector(".color-picker__grid"),e=r.querySelector(".color-picker__grid-handle"),{width:o,height:i}=r.getBoundingClientRect(),s=this.value,n=this.value;e.focus(),t.preventDefault(),this.isDraggingGridHandle=true,Ir(r,{onMove:(c,a)=>{this.saturation=dt(c/o*100,0,100),this.brightness=dt(100-a/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:t});}handleAlphaKeyDown(t){let r=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=dt(this.alpha-r,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=dt(this.alpha+r,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(t){let r=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=dt(this.hue-r,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=dt(this.hue+r,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(t){let r=t.shiftKey?10:1,e=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=dt(this.saturation-r,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=dt(this.saturation+r,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=dt(this.brightness+r,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=dt(this.brightness-r,0,100),this.syncValues()),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(t){let r=t.target,e=this.value;t.stopPropagation(),this.input.value?(this.setColor(r.value),r.value=this.value):this.value="",this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation();}handleInputKeyDown(t){if(t.key==="Enter"){let r=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(t){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(t);}handleTouchMove(t){t.preventDefault();}parseColor(t){let r=new xo(t);if(!r.isValid)return null;let e=r.toHsl(),o={h:e.h,s:e.s*100,l:e.l*100,a:e.a},i=r.toRgb(),s=r.toHexString(),n=r.toHex8String(),c=r.toHsv(),a={h:c.h,s:c.s*100,v:c.v*100,a:c.a};return {hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},hsv:{h:a.h,s:a.s,v:a.v,string:this.setLetterCase(`hsv(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.v)}%)`)},hsva:{h:a.h,s:a.s,v:a.v,a:a.a,string:this.setLetterCase(`hsva(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.v)}%, ${a.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let r=this.parseColor(t);return r===null?false:(this.hue=r.hsva.h,this.saturation=r.hsva.s,this.brightness=r.hsva.v,this.alpha=this.opacity?r.hsva.a*100:100,this.syncValues(),true)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!_l)return;new EyeDropper().open().then(r=>{let e=this.value;this.setColor(r.sRGBHex),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(t){let r=this.value;this.disabled||(this.setColor(t),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(t,r,e,o=100){let i=new xo(`hsva(${t}, ${r}%, ${e}%, ${o/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(t,r){if(this.isEmpty=!r,r||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let e=this.parseColor(r);e!==null?(this.inputValue=this.value,this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=e.hsva.a*100,this.syncValues()):this.inputValue=t??"";}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t);}blur(){var t;let r=this.inline?this.base:this.trigger;this.hasFocus&&(r.focus({preventScroll:true}),r.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide();}getFormattedValue(t="hex"){let r=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(r===null)return "";switch(t){case "hex":return r.hex;case "hexa":return r.hexa;case "rgb":return r.rgb.string;case "rgba":return r.rgba.string;case "hsl":return r.hsl.string;case "hsla":return r.hsla.string;case "hsv":return r.hsv.string;case "hsva":return r.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity();}render(){let t=this.saturation,r=100-this.brightness,e=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),o=u`
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
            style=${J({top:`${r}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
          class=${z({"color-dropdown__trigger":true,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":true})}
          style=${J({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${o}
      </sl-dropdown>
    `}};N.styles=[V,hl];N.dependencies={"sl-button-group":Oe,"sl-button":G,"sl-dropdown":ut,"sl-icon":q,"sl-input":F,"sl-visually-hidden":Es};l([$('[part~="base"]')],N.prototype,"base",2);l([$('[part~="input"]')],N.prototype,"input",2);l([$(".color-dropdown")],N.prototype,"dropdown",2);l([$('[part~="preview"]')],N.prototype,"previewButton",2);l([$('[part~="trigger"]')],N.prototype,"trigger",2);l([k()],N.prototype,"hasFocus",2);l([k()],N.prototype,"isDraggingGridHandle",2);l([k()],N.prototype,"isEmpty",2);l([k()],N.prototype,"inputValue",2);l([k()],N.prototype,"hue",2);l([k()],N.prototype,"saturation",2);l([k()],N.prototype,"brightness",2);l([k()],N.prototype,"alpha",2);l([p()],N.prototype,"value",2);l([Ht()],N.prototype,"defaultValue",2);l([p()],N.prototype,"label",2);l([p()],N.prototype,"format",2);l([p({type:Boolean,reflect:true})],N.prototype,"inline",2);l([p({reflect:true})],N.prototype,"size",2);l([p({attribute:"no-format-toggle",type:Boolean})],N.prototype,"noFormatToggle",2);l([p()],N.prototype,"name",2);l([p({type:Boolean,reflect:true})],N.prototype,"disabled",2);l([p({type:Boolean})],N.prototype,"hoist",2);l([p({type:Boolean})],N.prototype,"opacity",2);l([p({type:Boolean})],N.prototype,"uppercase",2);l([p()],N.prototype,"swatches",2);l([p({reflect:true})],N.prototype,"form",2);l([p({type:Boolean,reflect:true})],N.prototype,"required",2);l([Ce({passive:false})],N.prototype,"handleTouchMove",1);l([A("format",{waitUntilFirstUpdate:true})],N.prototype,"handleFormatChange",1);l([A("opacity",{waitUntilFirstUpdate:true})],N.prototype,"handleOpacityChange",1);l([A("value")],N.prototype,"handleValueChange",1);N.define("sl-color-picker");var Qp=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class _o extends R{getInitialOptions(){return {format:"hex",opacity:false,inline:false,swatches:Qp}}renderInput(){return u`
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
        `}_onClickPresetColor(r){this.input.value=r.target.dataset.color,this.onFieldInput();}_renderColors(){if(this.options.presets)return u`${tt(this.options.presets,r=>u`<span
                data-color="${r}"
                    @click=${this._onClickPresetColor}
                    class="preset-color${this.value===r?" selected":""}" style="background-color:${r};"></span>`)}`}renderView(){return u`<span><span class="color"   style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[R.styles,y`
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
        `],exports.AutoFieldColorPicker=v([T("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class wo extends R{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((e,o)=>{let i={};return typeof e=="object"?Object.assign(i,e):Object.assign(i,{id:e,label:e,value:e}),i.icon&&(this.isShowIcon=true),i.$index=o,i}),this.selection=this.value;}renderInput(){return u`
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
        `}_onCheckChange(e){let o=e.target.closest(".card")||e.target,i=Number(o.dataset.index),s=o.checked??!o.classList.contains("selected"),n=this.items[i];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let c=this.selection.findIndex(a=>a===n[this.valueKey]);c>-1&&this.selection.splice(c,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(e,o){if(this.options.card){let i=this.selection.includes(o[this.valueKey]);return u`<div
                class="card ${i?"selected":""}"
                data-index="${o.$index}"
                style=${J({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">${B(this.isShowIcon,()=>u`<sl-icon class="icon" name="${o.icon||""}"></sl-icon>`)} ${e}</div>
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
        `],exports.AutoFieldCheckboxGroup=v([T("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class So extends R{constructor(){super(...arguments);this.parts=[];}getInitialOptions(){return {template:"0000",delimiter:"",caseType:"both",includeDelimiter:true,onlyNumber:false}}_isValidChar(e){return this.options.chars?new RegExp(this.options.chars).test(e):true}_onKeyDown(e){let o=e.key;o.length===1&&(this._isValidChar(o)||e.preventDefault(),e.stopPropagation());}_onPartInput(e){let i=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,c)=>(n+=c.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),s=0;this.parts.forEach((n,c)=>{this.options.delimiter.includes(n)||(this.parts[c]=i[s++]);}),this.onFieldChange(),this._isLastInput(e);}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((e,o)=>this.options.delimiter.includes(o)?e:`${e}${o}`,"")}_isLastInput(e){let o=e.target;if(o.value.length>=1){o.blur();let i=o.nextElementSibling||o.nextElementSibling?.nextElementSibling;i&&(i.focus(),i.select());}}_onPaste(e){e.preventDefault();let o=e.clipboardData?.getData("text/plain")||"",i=this._parseParts(o),s=c=>{if(c){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let c of i)if(!this.options.delimiter.includes(c)&&(n.value=c,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value);}_parseParts(e){let o=this.options.delimiter,i=this.options.template,s=0;return Array.from(i).map(n=>{if(o.includes(n))return e[s]===n&&s++,n;{let c=e[s++]||n;return this.options.caseType==="upper"?c.toUpperCase():this.options.caseType==="lower"?c.toLowerCase():c}})}_onPartFocus(e){e.target.select();}renderPart(e){return u`<sl-input
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
`;var ki=class extends L{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(t){let r=["menuitem","menuitemcheckbox"],e=t.composedPath(),o=e.find(c=>{var a;return r.includes(((a=c?.getAttribute)==null?void 0:a.call(c,"role"))||"")});if(!o||e.find(c=>{var a;return ((a=c?.getAttribute)==null?void 0:a.call(c,"role"))==="menu"})!==this)return;let n=o;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let r=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),r?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let r=this.getAllItems(),e=this.getCurrentItem(),o=e?r.indexOf(e):0;r.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?o++:t.key==="ArrowUp"?o--:t.key==="Home"?o=0:t.key==="End"&&(o=r.length-1),o<0&&(o=r.length-1),o>r.length-1&&(o=0),this.setCurrentItem(r[o]),r[o].focus());}}handleMouseDown(t){let r=t.target;this.isMenuItem(r)&&this.setCurrentItem(r);}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0]);}isMenuItem(t){var r;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((r=t.getAttribute("role"))!=null?r:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1");});}render(){return u`
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
`;var Co=(t,r)=>{let e=t._$AN;if(e===void 0)return  false;for(let o of e)o._$AO?.(r,false),Co(o,r);return  true},$i=t=>{let r,e;do{if((r=t._$AM)===void 0)break;e=r._$AN,e.delete(t),t=r;}while(e?.size===0)},Cl=t=>{for(let r;r=t._$AM;t=r){let e=r._$AN;if(e===void 0)r._$AN=e=new Set;else if(e.has(t))break;e.add(t),td(r);}};function Zp(t){this._$AN!==void 0?($i(this),this._$AM=t,Cl(this)):this._$AM=t;}function Jp(t,r=false,e=0){let o=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(r)if(Array.isArray(o))for(let s=e;s<o.length;s++)Co(o[s],false),$i(o[s]);else o!=null&&(Co(o,false),$i(o));else Co(this,t);}var td=t=>{t.type==yt.CHILD&&(t._$AP??=Jp,t._$AQ??=Zp);},Ei=class extends At{constructor(){super(...arguments),this._$AN=void 0;}_$AT(r,e,o){super._$AT(r,e,o),Cl(this),this.isConnected=r._$AU;}_$AO(r,e=true){r!==this.isConnected&&(this.isConnected=r,r?this.reconnected?.():this.disconnected?.()),e&&(Co(this,r),$i(this));}setValue(r){if(qo(this._$Ct))this._$Ct._$AI(r,this);else {let e=[...this._$Ct._$AH];e[this._$Ci]=r,this._$Ct._$AI(e,this,0);}}disconnected(){}reconnected(){}};var kl=()=>new Ps,Ps=class{},Vs=new WeakMap,$l=Pt(class extends Ei{render(t){return Y}update(t,[r]){let e=r!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=r,this.ht=t.options?.host,this.rt(this.ct=t.element)),Y}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let r=this.ht??globalThis,e=Vs.get(r);e===void 0&&(e=new WeakMap,Vs.set(r,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,t),t!==void 0&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return typeof this.G=="function"?Vs.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var El=class{constructor(t,r){this.popupRef=kl(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=e=>{switch(e.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(e);break;}},this.handleClick=e=>{var o;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&(e.target.tagName==="sl-menu-item"||(o=e.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=e=>{e.stopPropagation();},this.handlePopupReposition=()=>{let e=this.host.renderRoot.querySelector("slot[name='submenu']"),o=e?.assignedElements({flatten:true}).filter(h=>h.localName==="sl-menu")[0],i=getComputedStyle(this.host).direction==="rtl";if(!o)return;let{left:s,top:n,width:c,height:a}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${i?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${i?s+c:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+a}px`);},(this.host=t).addController(this),this.hasSlotController=r;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(t){let r=this.host.renderRoot.querySelector("slot[name='submenu']");if(!r){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let e=null;for(let o of r.assignedElements())if(e=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),e.length!==0)break;if(!(!e||e.length===0)){e[0].setAttribute("tabindex","0");for(let o=1;o!==e.length;++o)e[o].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?e[0]instanceof HTMLElement&&e[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{e[0]instanceof HTMLElement&&e[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate());}enableSubmenu(t=true){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let r=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((i,s)=>{var n;let c=(n=r.get(s))!=null?n:new CSSUnitValue(0,"px"),h=(c instanceof CSSUnitValue?c:new CSSUnitValue(0,"px")).to("px");return i-h.value},0);this.skidding=o;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let t=getComputedStyle(this.host).direction==="rtl";return this.isConnected?u`
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
    `:u` <slot name="submenu" hidden></slot> `}};var zt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new ct(this,"submenu"),this.submenuController=new El(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleMouseOver=t=>{this.focus(),t.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return Yn(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",r=this.submenuController.isExpanded();return u`
      <div
        id="anchor"
        part="base"
        class=${z({"menu-item":true,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":r})}
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
`;var Ds=()=>null,Lt=class extends L{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new W(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=Ds,this.snapThreshold=12;}toSnapFunction(t){let r=t.split(" ");return ({pos:e,size:o,snapThreshold:i,isRtl:s,vertical:n})=>{let c=e,a=Number.POSITIVE_INFINITY;return r.forEach(h=>{let m;if(h.startsWith("repeat(")){let f=t.substring(7,t.length-1),g=f.endsWith("%"),b=Number.parseFloat(f),x=g?o*(b/100):b;m=Math.round((s&&!n?o-e:e)/x)*x;}else h.endsWith("%")?m=o*(Number.parseFloat(h)/100):m=Number.parseFloat(h);s&&!n&&(m=o-m);let d=Math.abs(e-m);d<=i&&d<a&&(c=m,a=d);}),c}}set snap(t){this.snapValue=t??"",t?this.snapFunction=typeof t=="string"?this.toSnapFunction(t):t:this.snapFunction=Ds;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this);}detectSize(){let{width:t,height:r}=this.getBoundingClientRect();this.size=this.vertical?r:t;}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){let r=this.localize.dir()==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),Ir(this,{onMove:(e,o)=>{var i;let s=this.vertical?o:e;this.primary==="end"&&(s=this.size-s),s=(i=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:r,vertical:this.vertical}))!=null?i:s,this.position=dt(this.pixelsToPercentage(s),0,100);},initialEvent:t}));}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let r=this.position,e=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&!this.vertical||t.key==="ArrowUp"&&this.vertical)&&(r-=e),(t.key==="ArrowRight"&&!this.vertical||t.key==="ArrowDown"&&this.vertical)&&(r+=e),t.key==="Home"&&(r=this.primary==="end"?100:0),t.key==="End"&&(r=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)r=this.positionBeforeCollapsing,this.isCollapsed=false;else {let o=this.position;r=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=o;});}this.position=dt(r,0,100);}}handleResize(t){let{width:r,height:e}=t[0].contentRect;this.size=this.vertical?e:r,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let t=this.vertical?"gridTemplateRows":"gridTemplateColumns",r=this.vertical?"gridTemplateColumns":"gridTemplateRows",e=this.localize.dir()==="rtl",o=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i="auto";return this.primary==="end"?e&&!this.vertical?this.style[t]=`${o} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${o}`:e&&!this.vertical?this.style[t]=`${i} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${i}`,this.style[r]="",u`
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
`;exports.AutoFieldList=class sr extends R{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.scrollbar=new Ye(this);this.scrollbars=[];this.items=new ze(this,"select",e=>e?(e.forEach(o=>{this.isItemSelected(o)&&this.selection.push(o[this.options.valueKey]);}),e):[]);this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu,.results")?.forEach(o=>{this.scrollbars.push(this.scrollbar.create(o,{width:"5px"}));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}connectedCallback(){super.connectedCallback(),this.options&&this.setPresetActions(),this.style.height="auto";}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}_addSecectItem(e){this.selection.findIndex(i=>i[this.options.valueKey]===e[this.options.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(e[this.options.valueKey]));}_removeSelectItem(e){for(let o=this.selection.length-1;o>=0;o--)this.selection[o]===e&&this.selection.splice(o,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(e){let o=e.detail.item,i=o.dataset.index,s=this.items.value[i];s&&(o.checked?this._addSecectItem(s):this._removeSelectItem(s[this.options.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.value.length}`,this.onFieldChange());}_renderWithSplitPanel(e){return this.options.showResults&&this.options.multiple?u`<sl-split-panel 
            style="height:${this.options.height||"15em"}"
            position="60"> ${e} ${this.renderResults()} </sl-split-panel>`:e}_renderItem(e){let o=this.options.renderItem;return typeof o=="string"?u`${Ot(o.replace(/\{(.+?)\}/g,(i,s)=>e[s]))}`:typeof o=="function"?u`${Ot(o(e))}`:e.label}_onClickPresetAction(e){e==="all"?this.selection=this.items.value.map(o=>o[this.options.valueKey]):e==="reverse"?this.selection=this.items.value.filter(o=>!this.selection.includes(o[this.options.valueKey])).map(o=>o[this.options.valueKey]):e==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let e=[];this.options.multiple&&e.push({id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")});let o=i=>{for(let s=e.length-1;s>=0;s--)if(e[s].id===i.id){let n=i.onClick;i.onClick=()=>{e[s].onClick(),n&&n.call(this,this.getInputValue());},e.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(i=>{o(i);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(i=>{o(i);}),e.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...e));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(e){let o=this.options.labelKey;if(o){if(o in e)return e[o]}else return e.label}renderResults(){return u`<div
            slot="end"
            class="results mark-err scrollbar"
            no-padding
            style="${J({maxHeight:this.options.height})}"
        >
            ${tt(this.selection,e=>{let o=this.items.value.filter(s=>s[this.options.valueKey]===e)[0];if(!o)return;let i=o&&o.label||e;return u`<div class="item" title="${o.value}">
                    <span>${i}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(o)}></sl-icon-button>
                </div>`})}
        </div>`}_renderList(){let e=Array.isArray(this.value)?this.value:[this.value];return u`${this._renderWithSplitPanel(u` <sl-menu
            slot="start"
            class="scrollbar mark-err ${z({multiple:this.options.multiple})}"
            style=${J({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}
        >

            ${tt(this.items.value,(o,i)=>{let s=e.includes(o[this.options.valueKey]);return u`<sl-menu-item type="checkbox" 
                    data-index=${String(i)} .checked=${s}>
                    ${B(o.icon,()=>u`<sl-icon slot="prefix" name="${o.icon}"></sl-icon>`)}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(o)} </auto-flex>
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
`;var Tl=null,Ai=class{};Ai.render=function(t,r){Tl(t,r);};self.QrCreator=Ai;(function(t){function r(c,a,h,m){var d={},f=t(h,a);f.u(c),f.J(),m=m||0;var g=f.h(),b=f.h()+2*m;return d.text=c,d.level=a,d.version=h,d.O=b,d.a=function(x,I){return x-=m,I-=m,0>x||x>=g||0>I||I>=g?false:f.a(x,I)},d}function e(c,a,h,m,d,f,g,b,x,I){function E(S,O,_,C,D,H,U){S?(c.lineTo(O+H,_+U),c.arcTo(O,_,C,D,f)):c.lineTo(O,_);}g?c.moveTo(a+f,h):c.moveTo(a,h),E(b,m,h,m,d,-f,0),E(x,m,d,a,d,0,-f),E(I,a,d,a,h,f,0),E(g,a,h,m,h,0,f);}function o(c,a,h,m,d,f,g,b,x,I){function E(S,O,_,C){c.moveTo(S+_,O),c.lineTo(S,O),c.lineTo(S,O+C),c.arcTo(S,O,S+_,O,f);}g&&E(a,h,f,f),b&&E(m,h,-f,f),x&&E(m,d,-f,-f),I&&E(a,d,f,-f);}function i(c,a){var h=a.fill;if(typeof h=="string")c.fillStyle=h;else {var m=h.type,d=h.colorStops;if(h=h.position.map(g=>Math.round(g*a.size)),m==="linear-gradient")var f=c.createLinearGradient.apply(c,h);else if(m==="radial-gradient")f=c.createRadialGradient.apply(c,h);else throw Error("Unsupported fill");d.forEach(([g,b])=>{f.addColorStop(g,b);}),c.fillStyle=f;}}function s(c,a){t:{var h=a.text,m=a.v,d=a.N,f=a.K,g=a.P;for(d=Math.max(1,d||1),f=Math.min(40,f||40);d<=f;d+=1)try{var b=r(h,m,d,g);break t}catch{}b=void 0;}if(!b)return null;for(h=c.getContext("2d"),a.background&&(h.fillStyle=a.background,h.fillRect(a.left,a.top,a.size,a.size)),m=b.O,f=a.size/m,h.beginPath(),g=0;g<m;g+=1)for(d=0;d<m;d+=1){var x=h,I=a.left+d*f,E=a.top+g*f,S=g,O=d,_=b.a,C=I+f,D=E+f,H=S-1,U=S+1,M=O-1,P=O+1,ht=Math.floor(Math.min(.5,Math.max(0,a.R))*f),st=_(S,O),wt=_(H,M),nt=_(H,O);H=_(H,P);var Ft=_(S,P);P=_(U,P),O=_(U,O),U=_(U,M),S=_(S,M),I=Math.round(I),E=Math.round(E),C=Math.round(C),D=Math.round(D),st?e(x,I,E,C,D,ht,!nt&&!S,!nt&&!Ft,!O&&!Ft,!O&&!S):o(x,I,E,C,D,ht,nt&&S&&wt,nt&&Ft&&H,O&&Ft&&P,O&&S&&U);}return i(h,a),h.fill(),c}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Tl=function(c,a){var h={};Object.assign(h,n,c),h.N=h.minVersion,h.K=h.maxVersion,h.v=h.ecLevel,h.left=h.left,h.top=h.top,h.size=h.size,h.fill=h.fill,h.background=h.background,h.text=h.text,h.R=h.radius,h.P=h.quiet,a instanceof HTMLCanvasElement?((a.width!==h.size||a.height!==h.size)&&(a.width=h.size,a.height=h.size),a.getContext("2d").clearRect(0,0,a.width,a.height),s(a,h)):(c=document.createElement("canvas"),c.width=h.size,c.height=h.size,h=s(c,h),a.appendChild(h));};})((function(){function t(a){var h=e.s(a);return {S:function(){return 4},b:function(){return h.length},write:function(m){for(var d=0;d<h.length;d+=1)m.put(h[d],8);}}}function r(){var a=[],h=0,m={B:function(){return a},c:function(d){return (a[Math.floor(d/8)]>>>7-d%8&1)==1},put:function(d,f){for(var g=0;g<f;g+=1)m.m((d>>>f-g-1&1)==1);},f:function(){return h},m:function(d){var f=Math.floor(h/8);a.length<=f&&a.push(0),d&&(a[f]|=128>>>h%8),h+=1;}};return m}function e(a,h){function m(S,O){for(var _=-1;7>=_;_+=1)if(!(-1>=S+_||b<=S+_))for(var C=-1;7>=C;C+=1) -1>=O+C||b<=O+C||(g[S+_][O+C]=0<=_&&6>=_&&(C==0||C==6)||0<=C&&6>=C&&(_==0||_==6)||2<=_&&4>=_&&2<=C&&4>=C);}function d(S,O){for(var _=b=4*a+17,C=Array(_),D=0;D<_;D+=1){C[D]=Array(_);for(var H=0;H<_;H+=1)C[D][H]=null;}for(g=C,m(0,0),m(b-7,0),m(0,b-7),_=s.G(a),C=0;C<_.length;C+=1)for(D=0;D<_.length;D+=1){H=_[C];var U=_[D];if(g[H][U]==null)for(var M=-2;2>=M;M+=1)for(var P=-2;2>=P;P+=1)g[H+M][U+P]=M==-2||M==2||P==-2||P==2||M==0&&P==0;}for(_=8;_<b-8;_+=1)g[_][6]==null&&(g[_][6]=_%2==0);for(_=8;_<b-8;_+=1)g[6][_]==null&&(g[6][_]=_%2==0);for(_=s.w(f<<3|O),C=0;15>C;C+=1)D=!S&&(_>>C&1)==1,g[6>C?C:8>C?C+1:b-15+C][8]=D,g[8][8>C?b-C-1:9>C?15-C:14-C]=D;if(g[b-8][8]=!S,7<=a){for(_=s.A(a),C=0;18>C;C+=1)D=!S&&(_>>C&1)==1,g[Math.floor(C/3)][C%3+b-8-3]=D;for(C=0;18>C;C+=1)D=!S&&(_>>C&1)==1,g[C%3+b-8-3][Math.floor(C/3)]=D;}if(x==null){for(S=c.I(a,f),_=r(),C=0;C<I.length;C+=1)D=I[C],_.put(4,4),_.put(D.b(),s.f(4,a)),D.write(_);for(C=D=0;C<S.length;C+=1)D+=S[C].j;if(_.f()>8*D)throw Error("code length overflow. ("+_.f()+">"+8*D+")");for(_.f()+4<=8*D&&_.put(0,4);_.f()%8!=0;)_.m(false);for(;!(_.f()>=8*D)&&(_.put(236,8),!(_.f()>=8*D));)_.put(17,8);var ht=0;for(D=C=0,H=Array(S.length),U=Array(S.length),M=0;M<S.length;M+=1){var st=S[M].j,wt=S[M].o-st;for(C=Math.max(C,st),D=Math.max(D,wt),H[M]=Array(st),P=0;P<H[M].length;P+=1)H[M][P]=255&_.B()[P+ht];for(ht+=st,P=s.C(wt),st=o(H[M],P.b()-1).l(P),U[M]=Array(P.b()-1),P=0;P<U[M].length;P+=1)wt=P+st.b()-U[M].length,U[M][P]=0<=wt?st.c(wt):0;}for(P=_=0;P<S.length;P+=1)_+=S[P].o;for(_=Array(_),P=ht=0;P<C;P+=1)for(M=0;M<S.length;M+=1)P<H[M].length&&(_[ht]=H[M][P],ht+=1);for(P=0;P<D;P+=1)for(M=0;M<S.length;M+=1)P<U[M].length&&(_[ht]=U[M][P],ht+=1);x=_;}for(S=x,_=-1,C=b-1,D=7,H=0,O=s.F(O),U=b-1;0<U;U-=2)for(U==6&&--U;;){for(M=0;2>M;M+=1)g[C][U-M]==null&&(P=false,H<S.length&&(P=(S[H]>>>D&1)==1),O(C,U-M)&&(P=!P),g[C][U-M]=P,--D,D==-1&&(H+=1,D=7));if(C+=_,0>C||b<=C){C-=_,_=-_;break}}}var f=i[h],g=null,b=0,x=null,I=[],E={u:function(S){S=t(S),I.push(S),x=null;},a:function(S,O){if(0>S||b<=S||0>O||b<=O)throw Error(S+","+O);return g[S][O]},h:function(){return b},J:function(){for(var S=0,O=0,_=0;8>_;_+=1){d(true,_);var C=s.D(E);(_==0||S>C)&&(S=C,O=_);}d(false,O);}};return E}function o(a,h){if(typeof a.length>"u")throw Error(a.length+"/"+h);var m=(function(){for(var f=0;f<a.length&&a[f]==0;)f+=1;for(var g=Array(a.length-f+h),b=0;b<a.length-f;b+=1)g[b]=a[b+f];return g})(),d={c:function(f){return m[f]},b:function(){return m.length},multiply:function(f){for(var g=Array(d.b()+f.b()-1),b=0;b<d.b();b+=1)for(var x=0;x<f.b();x+=1)g[b+x]^=n.i(n.g(d.c(b))+n.g(f.c(x)));return o(g,0)},l:function(f){if(0>d.b()-f.b())return d;for(var g=n.g(d.c(0))-n.g(f.c(0)),b=Array(d.b()),x=0;x<d.b();x+=1)b[x]=d.c(x);for(x=0;x<f.b();x+=1)b[x]^=n.i(n.g(f.c(x))+g);return o(b,0).l(f)}};return d}e.s=function(a){for(var h=[],m=0;m<a.length;m++){var d=a.charCodeAt(m);128>d?h.push(d):2048>d?h.push(192|d>>6,128|d&63):55296>d||57344<=d?h.push(224|d>>12,128|d>>6&63,128|d&63):(m++,d=65536+((d&1023)<<10|a.charCodeAt(m)&1023),h.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63));}return h};var i={L:1,M:0,Q:3,H:2},s=(function(){function a(d){for(var f=0;d!=0;)f+=1,d>>>=1;return f}var h=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],m={w:function(d){for(var f=d<<10;0<=a(f)-a(1335);)f^=1335<<a(f)-a(1335);return (d<<10|f)^21522},A:function(d){for(var f=d<<12;0<=a(f)-a(7973);)f^=7973<<a(f)-a(7973);return d<<12|f},G:function(d){return h[d-1]},F:function(d){switch(d){case 0:return function(f,g){return (f+g)%2==0};case 1:return function(f){return f%2==0};case 2:return function(f,g){return g%3==0};case 3:return function(f,g){return (f+g)%3==0};case 4:return function(f,g){return (Math.floor(f/2)+Math.floor(g/3))%2==0};case 5:return function(f,g){return f*g%2+f*g%3==0};case 6:return function(f,g){return (f*g%2+f*g%3)%2==0};case 7:return function(f,g){return (f*g%3+(f+g)%2)%2==0};default:throw Error("bad maskPattern:"+d)}},C:function(d){for(var f=o([1],0),g=0;g<d;g+=1)f=f.multiply(o([1,n.i(g)],0));return f},f:function(d,f){if(d!=4||1>f||40<f)throw Error("mode: "+d+"; type: "+f);return 10>f?8:16},D:function(d){for(var f=d.h(),g=0,b=0;b<f;b+=1)for(var x=0;x<f;x+=1){for(var I=0,E=d.a(b,x),S=-1;1>=S;S+=1)if(!(0>b+S||f<=b+S))for(var O=-1;1>=O;O+=1)0>x+O||f<=x+O||(S!=0||O!=0)&&E==d.a(b+S,x+O)&&(I+=1);5<I&&(g+=3+I-5);}for(b=0;b<f-1;b+=1)for(x=0;x<f-1;x+=1)I=0,d.a(b,x)&&(I+=1),d.a(b+1,x)&&(I+=1),d.a(b,x+1)&&(I+=1),d.a(b+1,x+1)&&(I+=1),(I==0||I==4)&&(g+=3);for(b=0;b<f;b+=1)for(x=0;x<f-6;x+=1)d.a(b,x)&&!d.a(b,x+1)&&d.a(b,x+2)&&d.a(b,x+3)&&d.a(b,x+4)&&!d.a(b,x+5)&&d.a(b,x+6)&&(g+=40);for(x=0;x<f;x+=1)for(b=0;b<f-6;b+=1)d.a(b,x)&&!d.a(b+1,x)&&d.a(b+2,x)&&d.a(b+3,x)&&d.a(b+4,x)&&!d.a(b+5,x)&&d.a(b+6,x)&&(g+=40);for(x=I=0;x<f;x+=1)for(b=0;b<f;b+=1)d.a(b,x)&&(I+=1);return g+=Math.abs(100*I/f/f-50)/5*10}};return m})(),n=(function(){for(var a=Array(256),h=Array(256),m=0;8>m;m+=1)a[m]=1<<m;for(m=8;256>m;m+=1)a[m]=a[m-4]^a[m-5]^a[m-6]^a[m-8];for(m=0;255>m;m+=1)h[a[m]]=m;return {g:function(d){if(1>d)throw Error("glog("+d+")");return h[d]},i:function(d){for(;0>d;)d+=255;for(;256<=d;)d-=255;return a[d]}}})(),c=(function(){function a(d,f){switch(f){case i.L:return h[4*(d-1)];case i.M:return h[4*(d-1)+1];case i.Q:return h[4*(d-1)+2];case i.H:return h[4*(d-1)+3]}}var h=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],m={I:function(d,f){var g=a(d,f);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+d+"/errorCorrectLevel:"+f);d=g.length/3,f=[];for(var b=0;b<d;b+=1)for(var x=g[3*b],I=g[3*b+1],E=g[3*b+2],S=0;S<x;S+=1){var O=E,_={};_.o=I,_.j=O,f.push(_);}return f}};return m})();return e})());var Il=QrCreator;var Yt=class extends L{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&Il.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var t;return u`
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
        `}};exports.AutoFieldQRCode=v([T("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class nr extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let e=this.options.url,[o,i]=e.split("?"),s=new URLSearchParams(i);return s.set("t",Date.now().toString()),`${o}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return u`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,y`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
        `],v([$("img")],exports.AutoFieldCaptcha.prototype,"img",2),v([k()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=v([T("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class ar extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let e=this.stepCount,o=()=>{let i=Math.ceil(e*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",i.toString()),this.requestUpdate()),e--,e<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(o,this.step);};o();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let e=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(e)?Number(e[0]):Number(e),this.step=Array.isArray(e)?Number(e[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles],v([k()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),v([k()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=v([T("auto-field-verifycode")],exports.AutoFieldVerifyCode);var Rl=y`
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
`;var rt=class Ms extends L{constructor(){super(...arguments),this.localize=new W(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(r){return r instanceof Element&&r.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await Kt(this.childrenContainer);let{keyframes:r,options:e}=Ut(this,"tree-item.collapse",{dir:this.localize.dir()});await qt(this.childrenContainer,Tr(r,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let r=this.parentElement;return !!r&&Ms.isTreeItem(r)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(r){r.has("selected")&&!r.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await Kt(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:r,options:e}=Ut(this,"tree-item.expand",{dir:this.localize.dir()});await qt(this.childrenContainer,Tr(r,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:r=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(e=>Ms.isTreeItem(e)&&(r||!e.disabled)):[]}render(){let r=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return u`
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
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
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
    `}};rt.styles=[V,Rl];rt.dependencies={"sl-checkbox":it,"sl-icon":q,"sl-spinner":xe};l([k()],rt.prototype,"indeterminate",2);l([k()],rt.prototype,"isLeaf",2);l([k()],rt.prototype,"loading",2);l([k()],rt.prototype,"selectable",2);l([p({type:Boolean,reflect:true})],rt.prototype,"expanded",2);l([p({type:Boolean,reflect:true})],rt.prototype,"selected",2);l([p({type:Boolean,reflect:true})],rt.prototype,"disabled",2);l([p({type:Boolean,reflect:true})],rt.prototype,"lazy",2);l([$("slot:not([name])")],rt.prototype,"defaultSlot",2);l([$("slot[name=children]")],rt.prototype,"childrenSlot",2);l([$(".tree-item__item")],rt.prototype,"itemElement",2);l([$(".tree-item__children")],rt.prototype,"childrenContainer",2);l([$(".tree-item__expand-button slot")],rt.prototype,"expandButtonSlot",2);l([A("loading",{waitUntilFirstUpdate:true})],rt.prototype,"handleLoadingChange",1);l([A("disabled")],rt.prototype,"handleDisabledChange",1);l([A("selected")],rt.prototype,"handleSelectedChange",1);l([A("expanded",{waitUntilFirstUpdate:true})],rt.prototype,"handleExpandedChange",1);l([A("expanded",{waitUntilFirstUpdate:true})],rt.prototype,"handleExpandAnimation",1);l([A("lazy",{waitUntilFirstUpdate:true})],rt.prototype,"handleLazyChange",1);var lr=rt;Nt("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Nt("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var zl=y`
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
`;function Ll(t,r=false){function e(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let c=n.every(h=>h.selected),a=n.every(h=>!h.selected&&!h.indeterminate);s.selected=c,s.indeterminate=!c&&!a;}}function o(s){let n=s.parentElement;lr.isTreeItem(n)&&(e(n),o(n));}function i(s){for(let n of s.getChildrenItems())n.selected=r?s.selected||n.selected:!n.disabled&&s.selected,i(n);r&&e(s);}i(t),o(t);}var De=class extends L{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new W(this),this.initTreeItem=t=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(r=>!!this.querySelector(`[slot="${r}-icon"]`)).forEach(r=>{let e=t.querySelector(`[slot="${r}-icon"]`),o=this.getExpandButtonIcon(r);o&&(e===null?t.append(o):e.hasAttribute("data-default")&&e.replaceWith(o));});},this.handleTreeChanged=t=>{for(let r of t){let e=[...r.addedNodes].filter(lr.isTreeItem),o=[...r.removedNodes].filter(lr.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&o.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=t=>{let r=t.relatedTarget;(!r||!this.contains(r))&&(this.tabIndex=0);},this.handleFocusIn=t=>{let r=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),lr.isTreeItem(r)&&!r.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=r,this.tabIndex=-1,r.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect();}getExpandButtonIcon(t){let e=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(e){let o=e.cloneNode(true);return [o,...o.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),o.setAttribute("data-default",""),o.slot=`${t}-icon`,o}return null}selectItem(t){let r=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=true),Ll(t);else if(this.selection==="single"||t.isLeaf){let o=this.getAllTreeItems();for(let i of o)i.selected=i===t;}else this.selection==="leaf"&&(t.expanded=!t.expanded);let e=this.selectedItems;(r.length!==e.length||e.some(o=>!r.includes(o)))&&Promise.all(e.map(o=>o.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:e}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(t){t?.focus();}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(i=>{var s;return ["input","textarea"].includes((s=i?.tagName)==null?void 0:s.toLowerCase())}))return;let r=this.getFocusableItems(),e=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(r.length>0){t.preventDefault();let i=r.findIndex(a=>a.matches(":focus")),s=r[i],n=a=>{let h=r[dt(a,0,r.length-1)];this.focusItem(h);},c=a=>{s.expanded=a;};t.key==="ArrowDown"?n(i+1):t.key==="ArrowUp"?n(i-1):e&&t.key==="ArrowRight"||o&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(i+1):c(true):e&&t.key==="ArrowLeft"||o&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(i-1):c(false):t.key==="Home"?n(0):t.key==="End"?n(r.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(t){let r=t.target,e=r.closest("sl-tree-item"),o=t.composedPath().some(i=>{var s;return (s=i?.classList)==null?void 0:s.contains("tree-item__expand-button")});!e||e.disabled||r!==this.clickTarget||(o?e.expanded=!e.expanded:this.selectItem(e));}handleMouseDown(t){this.clickTarget=t.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let t=this.selection==="multiple",r=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let e of r)e.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>Ll(e,true)));}get selectedItems(){let t=this.getAllTreeItems(),r=e=>e.selected;return t.filter(r)}getFocusableItems(){let t=this.getAllTreeItems(),r=new Set;return t.filter(e=>{var o;if(e.disabled)return  false;let i=(o=e.parentElement)==null?void 0:o.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||r.has(i))&&r.add(e),!r.has(e)})}render(){return u`
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
    `}};De.styles=[V,zl];l([$("slot:not([name])")],De.prototype,"defaultSlot",2);l([$("slot[name=expand-icon]")],De.prototype,"expandedIconSlot",2);l([$("slot[name=collapse-icon]")],De.prototype,"collapsedIconSlot",2);l([p()],De.prototype,"selection",2);l([A("selection")],De.prototype,"handleSelectionChange",1);De.define("sl-tree");lr.define("sl-tree-item");exports.AutoFieldTreeSelect=class Me extends R{constructor(){super(...arguments);this.nodes=new ze(this,"items",e=>e?(this._forEachTree(e,(o,i,s,n)=>{this.isItemSelected(o)&&(o.selected=true,this.selection.push({id:o[this.options.idKey],value:o[this.options.valueKey],path:n.join("/")}));}),e):[]);this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,defaultExpandLevel:2,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}isItemSelected(e){return this.value===void 0?false:this.options.multiple===false?this.value===e[this.options.valueKey]:this.value.includes(e[this.options.valueKey])}getStateValue(){let e=super.getStateValue();return this.options.multiple?Array.isArray(e)?e:[e]:e}_forEachTree(e,o){let i=(s,n,c,a)=>{let h=[...a,s[this.options.labelKey]];if(this.options.defaultExpandLevel>0&&c<this.options.defaultExpandLevel-1&&s.expanded===void 0&&(s.expanded=true),o(s,n,c,h),s.children){let m=c+1;s.children.forEach(d=>{i(d,s,m,[...h]);});}};(Array.isArray(e)?e:[e]).forEach(s=>{i(s,void 0,0,[]);});}onSelectionChange(e){let o=Array.from(e.detail.selection);o&&(this.selection=o.map(i=>({id:i.dataset.id,value:i.dataset.value,path:i.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(e=>e.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(e,o,i){let s=o.includes(e[this.options.valueKey]),n=[...i,e[this.options.labelKey]];return u`<sl-tree-item
            data-id=${String(e[this.options.idKey])}
            data-value=${String(e[this.options.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${e.expanded}
        >
            ${B(e.icon,()=>u`<sl-icon name="${e.icon}"></sl-icon>`)} ${e.label}
            ${Array.isArray(e.children)?u`${e.children.map(c=>this._renderNode(c,o,n))}`:""}</sl-tree-item
        >`}_renderNodes(e){let o=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(e)?e.map(i=>this._renderNode(i,o,[])):this._renderNode(e,o,[])}renderTree(){return u`
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
        `],exports.AutoFieldTreeSelect=v([T("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class cr extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(e){let o=e.target.dataset.id;for(let i=0;i<this.selection.length;i++)if(String(this.selection[i].id)===o){this.selection.splice(i,1),this.onFieldChange(),this.requestUpdate();break}e.stopPropagation();}getShowItemValue(e,o,i){if(o===i)return e}getSelectedTagValue(e){if(this.options.showAsPath)return u`${e.path}`;{let i=e.path.split("/");return i[i.length-1]}}renderSelectedTags(){let e=this.selection;return u`<span class="tags"
            >${tt(e,o=>u`<sl-tag data-id="${o.id}" title=${o.path} @sl-remove=${this._onRemoveSelection.bind(this)} @click=${i=>i.stopPropagation()} removable
                    >${this.getSelectedTagValue(o)}</sl-tag
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
        `],v([k()],exports.AutoFieldTreeDropdown.prototype,"active",2),v([$("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=v([T("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);function Vl(t){if(t)if(t.type==="checkbox"){if(t.value==="on")return t.checked;if(t.value.startsWith("[")&&t.value.endsWith("]"))try{let r=JSON.parse(t.value);return t.checked?r[0]:r[1]}catch{return t.checked}else return t.checked?t.value:null}else return t.value}var Et=class extends R{constructor(){super(...arguments);this.active=false;}static{this.styles=[R.styles,y`
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
            `:u`${this._renderContent()}`}};v([k()],Et.prototype,"active",2);exports.AutoFieldCustom=class Rr extends Et{constructor(){super(...arguments);this.selection=[];}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{placeholder:"\u8BF7\u9009\u62E9",dropdown:true,inputSelectors:"input,textarea"})}connectedCallback(){super.connectedCallback(),this._onFieldInput();}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this.onFieldInput),this.removeEventListener("change",this.onFieldInput);}}),this.addEventListener("input",this.onFieldInput),this.addEventListener("change",this.onFieldInput);}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(i=>Vl(i))}renderDropdown(){let e=this.value.map(o=>Ct(o));return u`<div class="container">${this.options.renderContent(e,u)}</div>`}};exports.AutoFieldCustom.styles=[Et.styles],v([$(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=v([T("auto-field-custom")],exports.AutoFieldCustom);function Ti(t,r){let e=t.width,o=t.height,i=t.widget,s;try{s=document.createElement(`auto-field-${i||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=t,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),r?.styles&&Object.assign(s.style,r.styles),r?.attrs){for(let n in r.attrs)s.setAttribute(n,String(r.attrs[n]));s.parent=r.parent;}return e&&(s.style.width=String(e)),o&&(s.style.height=String(o)),r?.classs&&(typeof r.classs=="string"?s.classList.add(r.classs):typeof r.classs=="object"&&Object.entries(r.classs).forEach(([n,c])=>{c?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class zr extends Et{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange(),this._updateSelection();};this._isFirst=true;}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{children:[]})}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("change",this._handleChildrenChange),this.shadow.removeEventListener("input",this._handleChildrenChange);}_updateSelection(){this.selection&&setTimeout(()=>{let e=this.toState(this.getInputValue()),o=super.renderSelection(e);this._isFirst&&(ur(Y,this.selection),this._isFirst=false),ur(Y,this.selection,{isConnected:true}),ur(o,this.selection,{isConnected:true});});}_onChildrenChange(){this.options.children.length>0&&(this.shadow.addEventListener("change",this._handleChildrenChange),this.shadow.addEventListener("input",this._handleChildrenChange));}renderSelection(){return setTimeout(()=>this._updateSelection()),u``}getInputValue(){let e=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),o=[];return e.forEach(i=>{if(i.tagName.startsWith("AUTO-FIELD-")){let s=i.getInputValue();s===""&&(s=i.value),o.push(s);}}),o}renderDropdown(){return u`
            <div class="children">
                ${tt(this.options.children,e=>u`${Ti(e,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[Et.styles,y`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `],v([$(".selection>.select-value")],exports.AutoFieldCombine.prototype,"selection",2),exports.AutoFieldCombine=v([T("auto-field-combine")],exports.AutoFieldCombine);var ed=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"];exports.AutoFieldIcons=class pr extends Et{constructor(){super(...arguments);this.active=false;this.selected=[];this.icons=[];}getInitialOptions(){return {icons:[],size:"24px",multiple:false,dropdown:false,builtIn:true}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&ed.forEach(e=>{this.icons.includes(e)||this.icons.push(e);}),this.selected=Array.isArray(this.value)?this.value:this.value.split(",");}renderView(){return this.renderIcons(this.selected)}_isSelected(e){return this.options.multiple?this.selected.includes(e):this.selected[0]===e}_onClickIcon(e){if(!this.context.viewonly)if(this.options.multiple){let o=this.selected.findIndex(i=>i===e);o>-1?this.selected.splice(o,1):this.selected.push(e),this.onFieldInput();}else this.selected.length===0?this.selected.push(e):this.selected[0]=e,this.onFieldInput();}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(e,o=true){return u`<div class="icons" style="font-size:${this.options.size}">
            ${tt(e,i=>{if(i!=="")return u`<span class="icon ${o&&this._isSelected(i)?"selected":void 0}" title="${i}" @click=${()=>this._onClickIcon(i)}
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
        `],v([k()],exports.AutoFieldIcons.prototype,"active",2),v([k()],exports.AutoFieldIcons.prototype,"selected",2),exports.AutoFieldIcons=v([T("auto-field-icons")],exports.AutoFieldIcons);exports.AutoFieldCascader=class pe extends Et{constructor(){super(...arguments);this.scrollbar=new Ye(this);this.active=false;this.data={};this.level=3;this.selected=[];this.focusItems=[];this.scrollbars=[];}getInitialOptions(){let e=Object.assign(super.getInitialOptions(),{idKey:"id",rootKey:"$root",labelKey:"label",maxLevel:3,childrenKey:"children",select:{}});return e.valueKey||(e.valueKey=e.idKey),e.idKey||(e.idKey=e.labelKey),e}connectedCallback(){super.connectedCallback();let e=typeof this.options.select=="object"&&this.options.childrenKey in this.options.select;e&&(this.options.rootKey=this.options.select[this.options.idKey]),this.data=e||Array.isArray(this.options.select)?this._normalizeData(this.options.select):this.options.select,this.selected=this._parseValues(this.value),this.focusItems=Array.from({length:this.options.maxLevel-1}).fill(null);}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu")?.forEach(o=>{this.scrollbars.push(this.scrollbar.create(o));});}_destoryScrollbars(){this.scrollbars?.forEach(e=>{e.destroy();});}_normalizeData(e){let o={},i=(s,n=false)=>{let c=s[this.options.idKey]||(n?"$root":void 0);if(!c)return;let a=s[this.options.childrenKey||"children"];a&&Array.isArray(a)&&a.length>0?(o[c]=a,a.forEach(h=>{i(h);})):o[c]=[];};return Array.isArray(e)?o.$root=e.reduce((s,n)=>(s.push(n),i(n),s),[]):i(e,true),o}_clearFocusItems(e){for(let o=e;o<=this.options.maxLevel;o++)Array.from(this.shadow.querySelectorAll(`[data-level='${o}']`)).forEach(s=>{s.classList.remove("focused");});}_onSelectItem(e){let o=e.detail.item;if(Number(o.dataset.level)!==this.options.maxLevel)return;let s=[],n=(a,h)=>{let m=this.data[h].findIndex(d=>String(d[this.options.idKey])===String(a));if(m>-1)return [this.data[h][m][this.options.labelKey],this.data[h][m][this.options.valueKey]]},c=this.options.rootKey;for(let a=0;a<this.focusItems.length;a++){let h=this.focusItems[a],m=n(h,c);if(!m)return;s.push([h,...m]),c=h;}this.selected=s,this.onFieldChange();}_getSelectedValue(e){let o=[],i=(n,c)=>{let a=this.data[c].findIndex(h=>String(h[this.options.idKey])===String(n));if(a>-1)return this.data[c][a][this.options.valueKey]},s=this.options.rootKey;for(let n=0;n<e.length;n++){let c=this.focusItems[n],a=i(c,s);if(!a)return;o.push(a),s=c;}return o}getInputValue(){let e=this.selected.map(o=>o[2]);return typeof this.value=="string"?e.join(this.options.delimiter||""):e}async _loadItem(e,o,i){let s;if(Array.isArray(this.data[o])&&this.data[o].length>0){e.dataset.lazy="done",this.requestUpdate();return}try{e.dataset.lazy="loading";let n=await this.options.onLoad(o);Array.isArray(n)&&(this.data[o]=n,n.forEach(c=>{c.lazy===void 0&&i<this.options.maxLevel&&(c.lazy=!0),this.data[c[this.options.idKey]]=[];}),this.requestUpdate());}catch(n){e.dataset.lazy="true",s=n;}finally{s||(e.dataset.lazy="done");}}_onItemMouseOverr(e){let o=e.target,i=o.dataset.id,s=Number(o.dataset.level);if(this.focusItems[s-1]===i)return;this._clearFocusItems(s),o.classList.add("focused"),o.dataset.lazy==="idle"&&this._loadItem(o,i,s),this.focusItems[s-1]=i,this.focusItems.forEach((c,a)=>{a>s-1&&(this.focusItems[a]=null);}),this.focusItems=[...this.focusItems];}_renderLevel(e,o=1,i){if(e)return u`<sl-menu class="level" @sl-select=${o===this.options.maxLevel?this._onSelectItem.bind(this):null}>
            ${tt(e,s=>{let n=s[this.options.idKey],c=this.selected[o-1]?.[0]===s[this.options.idKey],a=s.lazy||Array.isArray(this.data[n])&&this.data[n].length===0;return u` <sl-menu-item
                    type="checkbox"
                    data-level=${o}
                    data-id=${s[this.options.idKey]}
                    data-pid=${w(i)}
                    data-lazy=${w(a?"idle":void 0)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${c}
                    class="${w(c?"selected":void 0)}"
                >
                    ${s[this.options.labelKey]}
                    ${B(o<this.options.maxLevel,()=>u`${B(s.lazy,()=>u`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}
                </sl-menu-item>`})}
        </sl-menu>`}_parseValues(e){let o=[],i=[];if(Array.isArray(e))o=e;else if(e&&typeof e=="string")if(this.options.delimiter&&this.options.delimiter.length>0)o=e.split(this.options.delimiter);else {let s=this.data[this.options.rootKey],n=e;for(;;){let c=s.find(a=>n.startsWith(a[this.options.valueKey]));if(c){if(o.push(c[this.options.valueKey]),n=n.substring(c[this.options.valueKey].length),s=this.data[c[this.options.idKey]],!s)break}else break}}if(o.length>0){let s=this.data[this.options.rootKey];for(let n=0;n<o.length;n++){let c=o[n],a=s.find(h=>h[this.options.valueKey]===c);if(a){if(i.push([a[this.options.idKey],a[this.options.labelKey],a[this.options.valueKey]]),s=this.data[a[this.options.idKey]],!s)break}else break}}return i}renderSelection(){return u`
            ${this.selected.map(e=>e[1]).join(this.options.delimiter||"")}
        `}renderDropdown(){let e=this.data[this.options.rootKey],o=this.focusItems;return u`<div class="levels">
            ${tt(Array.from({length:this.options.maxLevel}),(i,s)=>{if(s===0)return this._renderLevel(e,s+1,this.options.rootKey);{let n=o[s-1],c=this.data[n];return c?this._renderLevel(c,s+1,n):this._renderLevel([],s+1,n)}})}
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
        `],v([k()],exports.AutoFieldCascader.prototype,"active",2),v([k()],exports.AutoFieldCascader.prototype,"data",2),v([k()],exports.AutoFieldCascader.prototype,"level",2),v([k()],exports.AutoFieldCascader.prototype,"selected",2),v([k()],exports.AutoFieldCascader.prototype,"focusItems",2),exports.AutoFieldCascader=v([T("auto-field-cascader")],exports.AutoFieldCascader);exports.AutoFieldDateRange=class Lr extends R{getInitialOptions(){return {icon:"date",delimiter:",",includeTime:false}}_onInputChange(r){let e=r.type;this.context.validAt==="input"&&e.includes("input")?this.onFieldInput():e.includes("change")&&this.onFieldChange();}_getDate(r){return (Array.isArray(this.value)?this.value:this.value.split(this.options.delimiter))[r]}_renderIcon(){if(this.options.icon)return u`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}_renderDate(r){return u`<sl-input
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
        >`}renderInput(){return u`
            <div class="dates">
                ${this._renderDate(0)}
                <span class="sp">-</span>
                ${this._renderDate(1)}
            </div>
        `}getInputValue(){let r=Array.from(this.inputs||[]).map(e=>e.value);return Array.isArray(this.value)?r:r.join(this.options.delimiter)}};exports.AutoFieldDateRange.styles=[R.styles,y`
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
`;var rd=0,Xt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.attrId=++rd,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=false,this.closable=false,this.disabled=false,this.tabIndex=0;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab");}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close");}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0;}render(){return this.id=this.id.length>0?this.id:this.componentId,u`
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
`;var ko=class extends L{constructor(){super(...arguments),this.observedElements=[],this.disabled=false;}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}});}),this.disabled||this.startObserver();}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver();}handleSlotChange(){this.disabled||this.startObserver();}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let r=t.assignedElements({flatten:true});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],r.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e);});}}stopObserver(){this.resizeObserver.disconnect();}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver();}render(){return u` <slot @slotchange=${this.handleSlotChange}></slot> `}};ko.styles=[V,Ml];l([p({type:Boolean,reflect:true})],ko.prototype,"disabled",2);l([A("disabled",{waitUntilFirstUpdate:true})],ko.prototype,"handleDisabledChange",1);var bt=class extends L{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new W(this),this.hasScrollControls=false,this.shouldHideScrollStartButton=false,this.shouldHideScrollEndButton=false,this.placement="top",this.activation="auto",this.noScrollControls=false,this.fixedScrollControls=false,this.scrollOffset=1;}connectedCallback(){let t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls();}),this.mutationObserver=new MutationObserver(r=>{let e=r.filter(({target:o})=>{if(o===this)return  true;if(o.closest("sl-tab-group")!==this)return  false;let i=o.tagName.toLowerCase();return i==="sl-tab"||i==="sl-tab-panel"});if(e.length!==0){if(e.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(o=>o.attributeName==="active")){let i=e.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="sl-tab").map(s=>s.target).find(s=>s.active);i&&this.setActiveTab(i);}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:true,attributeFilter:["active","disabled","name","panel"],childList:true,subtree:true}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((e,o)=>{var i;e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((i=this.getActiveTab())!=null?i:this.tabs[0],{emitEvents:false}),o.unobserve(e[0].target));}).observe(this.tabGroup);});});}disconnectedCallback(){var t,r;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect(),this.nav&&((r=this.resizeObserver)==null||r.unobserve(this.nav));}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return [...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let e=t.target.closest("sl-tab");e?.closest("sl-tab-group")===this&&e!==null&&this.setActiveTab(e,{scrollBehavior:"smooth"});}handleKeyDown(t){let e=t.target.closest("sl-tab");if(e?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&e!==null&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){let i=this.tabs.find(c=>c.matches(":focus")),s=this.localize.dir()==="rtl",n=null;if(i?.tagName.toLowerCase()==="sl-tab"){if(t.key==="Home")n=this.focusableTabs[0];else if(t.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){let c=this.tabs.findIndex(a=>a===i);n=this.findNextFocusableTab(c,"backward");}else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){let c=this.tabs.findIndex(a=>a===i);n=this.findNextFocusableTab(c,"forward");}if(!n)return;n.tabIndex=0,n.focus({preventScroll:true}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(c=>{c.tabIndex=c===n?0:-1;}),["top","bottom"].includes(this.placement)&&ao(n,this.nav,"horizontal"),t.preventDefault();}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"});}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"});}setActiveTab(t,r){if(r=St({emitEvents:true,scrollBehavior:"auto"},r),t!==this.activeTab&&!t.disabled){let e=this.activeTab;this.activeTab=t,this.tabs.forEach(o=>{o.active=o===this.activeTab,o.tabIndex=o===this.activeTab?0:-1;}),this.panels.forEach(o=>{var i;return o.active=o.name===((i=this.activeTab)==null?void 0:i.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&ao(this.activeTab,this.nav,"horizontal",r.scrollBehavior),r.emitEvents&&(e&&this.emit("sl-tab-hide",{detail:{name:e.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}));}}setAriaLabels(){this.tabs.forEach(t=>{let r=this.panels.find(e=>e.name===t.panel);r&&(t.setAttribute("aria-controls",r.getAttribute("id")),r.setAttribute("aria-labelledby",t.getAttribute("id")));});}repositionIndicator(){let t=this.getActiveTab();if(!t)return;let r=t.clientWidth,e=t.clientHeight,o=this.localize.dir()==="rtl",i=this.getAllTabs(),n=i.slice(0,i.indexOf(t)).reduce((c,a)=>({left:c.left+a.clientWidth,top:c.top+a.clientHeight}),{left:0,top:0});switch(this.placement){case "top":case "bottom":this.indicator.style.width=`${r}px`,this.indicator.style.height="auto",this.indicator.style.translate=o?`${ -1*n.left}px`:`${n.left}px`;break;case "start":case "end":this.indicator.style.width="auto",this.indicator.style.height=`${e}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls());}findNextFocusableTab(t,r){let e=null,o=r==="forward"?1:-1,i=t+o;for(;t<this.tabs.length;){if(e=this.tabs[i]||null,e===null){r==="forward"?e=this.focusableTabs[0]:e=this.focusableTabs[this.focusableTabs.length-1];break}if(!e.disabled)break;i+=o;}return e}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd());}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=false:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons();}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none";}show(t){let r=this.tabs.find(e=>e.panel===t);r&&this.setActiveTab(r,{scrollBehavior:"smooth"});}render(){let t=this.localize.dir()==="rtl";return u`
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
    `}};bt.styles=[V,Dl];bt.dependencies={"sl-icon-button":pt,"sl-resize-observer":ko};l([$(".tab-group")],bt.prototype,"tabGroup",2);l([$(".tab-group__body")],bt.prototype,"body",2);l([$(".tab-group__nav")],bt.prototype,"nav",2);l([$(".tab-group__indicator")],bt.prototype,"indicator",2);l([k()],bt.prototype,"hasScrollControls",2);l([k()],bt.prototype,"shouldHideScrollStartButton",2);l([k()],bt.prototype,"shouldHideScrollEndButton",2);l([p()],bt.prototype,"placement",2);l([p()],bt.prototype,"activation",2);l([p({attribute:"no-scroll-controls",type:Boolean})],bt.prototype,"noScrollControls",2);l([p({attribute:"fixed-scroll-controls",type:Boolean})],bt.prototype,"fixedScrollControls",2);l([Ce({passive:true})],bt.prototype,"updateScrollButtons",1);l([A("noScrollControls",{waitUntilFirstUpdate:true})],bt.prototype,"updateScrollControls",1);l([A("placement",{waitUntilFirstUpdate:true})],bt.prototype,"syncIndicator",1);bt.define("sl-tab-group");var od=(t,r)=>{let e=0;return function(...o){window.clearTimeout(e),e=window.setTimeout(()=>{t.call(this,...o);},r);}},Fl=(t,r,e)=>{let o=t[r];t[r]=function(...i){o.call(this,...i),e.call(this,o,...i);};};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){let r=new Set,e=new WeakMap,o=s=>{for(let n of s.changedTouches)r.add(n.identifier);},i=s=>{for(let n of s.changedTouches)r.delete(n.identifier);};document.addEventListener("touchstart",o,true),document.addEventListener("touchend",i,true),document.addEventListener("touchcancel",i,true),Fl(EventTarget.prototype,"addEventListener",function(s,n){if(n!=="scrollend")return;let c=od(()=>{r.size?c():this.dispatchEvent(new Event("scrollend"));},100);s.call(this,"scroll",c,{passive:true}),e.set(this,c);}),Fl(EventTarget.prototype,"removeEventListener",function(s,n){if(n!=="scrollend")return;let c=e.get(this);c&&s.call(this,"scroll",c,{passive:true});});}})();var Hl=y`
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
`;var id=0,Vr=class extends L{constructor(){super(...arguments),this.attrId=++id,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=false;}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel");}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true");}render(){return u`
      <slot
        part="base"
        class=${z({"tab-panel":true,"tab-panel--active":this.active})}
      ></slot>
    `}};Vr.styles=[V,Hl];l([p({reflect:true})],Vr.prototype,"name",2);l([p({type:Boolean,reflect:true})],Vr.prototype,"active",2);l([A("active")],Vr.prototype,"handleActiveChange",1);Vr.define("sl-tab-panel");q.define("sl-icon");var Bl=y`
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
`;var ie=class extends lt{constructor(){super();this.forms=[];gr();}static{this.styles=[Ii,Pe,y`
            :host {
                display: block;
                width: 100%;
                background-color: var(--auto-bgcolor);
                    font: var(--auto-font);
            }
        `];}firstUpdated(){this.forms=this.getForms(),this.forms.length===0&&setTimeout(()=>{this.forms=this.getForms();});}getForms(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}bind(e){this.store=e,this.forms&&this.forms.forEach(o=>{o.bind&&o.bind(e);});}getFormInfo(e,o){let i=e.getAttribute("icon")||e.dataset.icon,s=e.getAttribute("label")||e.dataset.label,n=e.getAttribute("title")||e.dataset.title,c=e.getAttribute("name")||e.dataset.name||"",a=this.active?this.active.split(",").includes(c):o===0;return {icon:i,label:s,title:n,name:c,active:a}}renderGroups(){}render(){return u`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `}};v([$("slot")],ie.prototype,"slotElement",2),v([p()],ie.prototype,"active",2),v([k()],ie.prototype,"forms",2);exports.AutoFormTabs=class dr extends ie{constructor(){super(...arguments);this.direction="top";this.hideLabel=false;}_getPlacement(){return this.direction==="left"?"start":this.direction==="right"?"end":this.direction}renderGroups(){return u`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${()=>this.dispatchEvent(new CustomEvent("tab-change"))}"
            >
                ${this.forms.map((e,o)=>{if(e.tagName!=="AUTO-FORM")return;let i=this.getFormInfo(e,o);return e.bind&&e.bind(this.store),e.setAttribute("border","none"),u`
                        <sl-tab
                            ?active=${i.active}
                            slot="nav"
                            title="${w(i.title||i.label)}"
                            panel="${o}"
                        >
                            ${i.icon?u`<sl-icon name="${i.icon}"></sl-icon>`:""}
                            ${B(!this.hideLabel&&i.label,()=>u`<span class="label">${i.label}</span>`)}
                        </sl-tab>
                    `})}
                ${this.forms.map((e,o)=>u`<sl-tab-panel name="${o}" class="scrollbar"
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
`;var Qt=class extends L{constructor(){super(...arguments),this.localize=new W(this),this.open=false,this.disabled=false;}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=true),this.detailsObserver=new MutationObserver(t=>{for(let r of t)r.type==="attributes"&&r.attributeName==="open"&&(this.details.open?this.show():this.hide());}),this.detailsObserver.observe(this.details,{attributes:true});}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect();}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus());}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show());}async handleOpenChange(){if(this.open){if(this.details.open=true,this.emit("sl-show",{cancelable:true}).defaultPrevented){this.open=false,this.details.open=false;return}await Kt(this.body);let{keyframes:r,options:e}=Ut(this,"details.show",{dir:this.localize.dir()});await qt(this.body,Tr(r,this.body.scrollHeight),e),this.body.style.height="auto",this.emit("sl-after-show");}else {if(this.emit("sl-hide",{cancelable:true}).defaultPrevented){this.details.open=true,this.open=true;return}await Kt(this.body);let{keyframes:r,options:e}=Ut(this,"details.hide",{dir:this.localize.dir()});await qt(this.body,Tr(r,this.body.scrollHeight),e),this.body.style.height="auto",this.details.open=false,this.emit("sl-after-hide");}}async show(){if(!(this.open||this.disabled))return this.open=true,ve(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=false,ve(this,"sl-after-hide")}render(){let t=this.localize.dir()==="rtl";return u`
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
    ${Uo}
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
`;exports.AutoCollapse=class de extends lt{constructor(){super(...arguments);this.active="";this.accordion=false;this.panels=[];this._activeArray=[];}firstUpdated(){this.panels=this.getPanels();}connectedCallback(){super.connectedCallback(),gr(),this._activeArray=this.active?this.active.split(","):[];}getPanels(){let e=this.shadowRoot.querySelector("slot");return e?e.assignedElements({flatten:true}):[]}updated(e){e.has("active")&&typeof this.active=="string"&&(this._activeArray=this.active?this.active.split(","):[]),super.updated(e);}togglePanel(e){let o=this._activeArray.indexOf(e);if(o===-1)this.accordion?this._activeArray=[e]:this._activeArray=[...this._activeArray,e];else {let i=[...this._activeArray];i.splice(o,1),this._activeArray=i;}this.active=this._activeArray.join(","),this.dispatchEvent(new CustomEvent("change",{detail:{active:this.active}}));}isPanelActive(e){return this._activeArray.includes(e)}_onActionClick(e,o){let i=new CustomEvent("action-click",{detail:{name:e},composed:true,bubbles:true});o.stopPropagation(),this.dispatchEvent(i);}_renderHeaderActions(e){let o=(e.getAttribute("data-actions")||"").split(",");if(o.length>0)return tt(o,i=>{let[s,n]=i.split(":");return u`<sl-icon
                    part="action"
                    class="icon action"
                    name=${s}
                    title=${n}
                    @click=${c=>{this._onActionClick(s,c);}}
                ></sl-icon>`})}_renderHeader(e){let o=e.getAttribute("name")||e.dataset.name||"",i=e.getAttribute("label")||e.dataset.label||"",s=e.getAttribute("icon")||e.dataset.icon||"",n=this.isPanelActive(o);return u`
            <div
                part="header"
                class="header ${z({active:n})}"
                @click=${()=>this.togglePanel(o)}
            >
                ${s?u`<sl-icon name="${s}" class="icon"></sl-icon>`:""}
                <div part="label" class="label">${i}</div>
                ${this._renderHeaderActions(e)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `}renderPanels(){return this.panels.map(e=>{let o=e.getAttribute("name")||e.dataset.name||"",i=this.isPanelActive(o),s=J({padding:this.padding});return u`
                ${this._renderHeader(e)}
                <div
                    part="content"
                    class="content scrollbar ${z({active:i})}"
                    style=${s}
                >
                    ${e}
                </div>
            `})}_onSlotChange(){let e=this.getPanels();if(e.length>0){let o=this.panels.map(s=>s.getAttribute("name")||s.dataset.name).filter(s=>!!s),i=e.filter(s=>!o.includes(s.getAttribute("name")||s.dataset.name));this.panels.push(...i),this.requestUpdate();}}render(){return u`
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

`;exports.AutoFlex=class Vt extends lt{constructor(){super(...arguments);this.classes=new Ae(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let e=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=e,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(o=>{o.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(o=>{o.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(e,o,i){super.attributeChangedCallback(e,o,i),this.updateStyles();}render(){return u` <slot></slot> `}};exports.AutoFlex.styles=Nl,v([p({type:String})],exports.AutoFlex.prototype,"direction",2),v([p({type:String})],exports.AutoFlex.prototype,"gap",2),v([p({type:Boolean})],exports.AutoFlex.prototype,"wrap",2),v([p({type:String})],exports.AutoFlex.prototype,"align",2),v([p({type:String})],exports.AutoFlex.prototype,"justify",2),v([p({type:String})],exports.AutoFlex.prototype,"border",2),v([p({type:String})],exports.AutoFlex.prototype,"grow",2),v([p({type:String})],exports.AutoFlex.prototype,"shrink",2),v([p({type:Boolean,reflect:true})],exports.AutoFlex.prototype,"fit",2),exports.AutoFlex=v([T("auto-flex")],exports.AutoFlex);exports.AutoLoading=class He extends lt{constructor(){super(...arguments);this.tips="Loading";this.hide=false;this.size="2em";}render(){return this.hide?u``:u`  
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
`;var $o=class extends L{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};$o.styles=[V,Ul];l([p({type:Boolean,reflect:true})],$o.prototype,"vertical",2);l([A("vertical")],$o.prototype,"handleVerticalChange",1);$o.define("sl-divider");ut.define("sl-dropdown");xe.define("sl-spinner");pt.define("sl-icon-button");var ot=class ot extends lt{constructor(){super(...arguments);this.classs=new Ae(this);this.ctxController=new xr(this);this.seq=++ot.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this._loading=false;}static{this.seq=0;}static{this.styles=Ii;}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}connectedCallback(){super.connectedCallback(),this.bind(this.store),gr();}shouldUpdate(e){return e.has("store")&&this.bind(this.store),true}attributeChangedCallback(e,o,i){super.attributeChangedCallback(e,o,i),["group","sort","advanced","path"].includes(e)?setTimeout(()=>this._load()):e==="store"&&this.bind(i);}_initialContext(){Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit});}_isValid(){if(this.path){let e=this.store.schemas.errors||{};return Object.keys(e).some(o=>ks(this.path.split("."),o.split(".")))}else return Object.keys(this.store.schemas.errors).length>0}_load(e=true){if(this.store&&!this._loading)try{this._initialContext();let o=this.path?this.store.schemas.find(this.path):Object.values(this.store.schemas.store.state),i=s=>{if(!this.group||["default","general"].includes(this.group)&&s.group===void 0||["","*"].includes(this.group))return !0;let n=(s.group||"").split(","),c=this.group.split(",");return n.some(a=>c.includes(a))};this.schemas=Object.values(o).filter(s=>!(!i(s)||this.advanced===!1&&s.advanced)).sort((s,n)=>(s.order||0)-(n.order||0)),e&&this.requestUpdate();}finally{this._loading=false;}}bind(e){e&&(this.store=e,this._load(true));}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(o=>{o.tagName.startsWith("auto-field")&&(o.invalidTips=void 0);}),this.requestUpdate();}_renderFields(){return u` ${this.schemas.map(e=>u`${Ti(e,{attrs:{size:this.size}})}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),u`
            <div class="actions header"></div>
            <div class="fields">${this._renderFields()}</div>
            <div class="actions footer"></div>
        `}reset(){this.store?.reset(),this._initialContext(),_r(this,"dirty",false),_r(this,"invalid",false);}submit(e){if(typeof e=="function"){let o=this.store?.schemas.getValues()||{},i=this.store?.schemas.errors;e(o,i);}}};v([is({context:No})],ot.prototype,"context",2),v([p({type:Object})],ot.prototype,"store",2),v([p({type:Boolean,reflect:true})],ot.prototype,"validAtInit",2),v([p({type:String,reflect:true})],ot.prototype,"group",2),v([p({type:String,reflect:true})],ot.prototype,"icon",2),v([p({type:String,reflect:true})],ot.prototype,"path",2),v([p({type:Boolean,reflect:true})],ot.prototype,"compact",2),v([p({type:Boolean,reflect:true})],ot.prototype,"advanced",2),v([p({type:String,reflect:true})],ot.prototype,"validAt",2),v([p({type:String,reflect:true})],ot.prototype,"border",2),v([p({type:String})],ot.prototype,"size",2),v([p({type:String,reflect:true})],ot.prototype,"labelPos",2),v([p({type:String,reflect:true})],ot.prototype,"labelWidth",2),v([p({type:Boolean,reflect:true})],ot.prototype,"dark",2),v([p({type:Boolean,reflect:true})],ot.prototype,"readonly",2),v([p({type:Boolean,reflect:true})],ot.prototype,"viewonly",2),v([p({type:String,reflect:true})],ot.prototype,"viewAlign",2),v([p({type:String,reflect:true})],ot.prototype,"layout",2),v([p({type:String,reflect:true})],ot.prototype,"icons",2);var Fs=ot;customElements.get("auto-form")||customElements.define("auto-form",Fs);/*! Bundled license information:

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