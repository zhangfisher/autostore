var AutoForm=(function(exports){'use strict';var kc=Object.defineProperty;var $c=Object.getOwnPropertyDescriptor;var v=(e,r,t,o)=>{for(var i=o>1?void 0:o?$c(r,t):r,s=e.length-1,n;s>=0;s--)(n=e[s])&&(i=(o?n(r,t,i):n(i))||i);return o&&i&&kc(r,t,i),i};function Js(e){let r=e.trim();if(r.startsWith("#")&&(r=r.slice(1)),r.length===3?r=r.replace(/(.)/g,"$1$1"):r.length===4&&(r=r.replace(/(.)/g,"$1$1")),r.length>6&&(r=r.slice(0,6)),!/^[0-9a-f]{6}$/i.test(r))throw new Error("Invalid hex color");let t=parseInt(r,16),o=t>>16&255,i=t>>8&255,s=t&255;return [o,i,s]}function Ec(e){let r=Js(e);return (r[0]*2126+r[1]*7152+r[2]*722)/1e4<128}function Ac(e){let[r,t,o]=Array.isArray(e)?e:Js(e),i=r/255,s=t/255,n=o/255,a=Math.max(i,s,n),l=Math.min(i,s,n),d=a-l,m=0,u=0,f=(a+l)/2;return d!==0&&(a===i?m=((s-n)/d+(s<n?6:0))/6:a===s?m=((n-i)/d+2)/6:m=((i-s)/d+4)/6),d!==0&&(u=d/(1-Math.abs(2*f-1))),[Math.round(m*360),Math.round(u*100),Math.round(f*100)]}function Xs(e){let[r,t,o]=e,i=r/360,s=t/100,n=o/100,a=(1-Math.abs(2*n-1))*s,l=a*(1-Math.abs(i*6%2-1)),d=n-a/2,m=0,u=0,f=0;0<=i&&i<1/6?(m=a,u=l,f=0):1/6<=i&&i<2/6?(m=l,u=a,f=0):2/6<=i&&i<3/6?(m=0,u=a,f=l):3/6<=i&&i<4/6?(m=0,u=l,f=a):4/6<=i&&i<5/6?(m=l,u=0,f=a):(m=a,u=0,f=l);let g=b=>Math.round((b+d)*255).toString(16).padStart(2,"0");return `#${g(m)}${g(u)}${g(f)}`}function Oc(e){let{color:r,range:t,dark:o,count:i}=Object.assign({range:[5,98],count:5},e),s=Ac(r),n=o??Ec(r),a=Array.from({length:2*i+1});a[i]=r;let l=Math.abs(s[2]-t[0]),d=l/i,m=s[2];for(let u=i-1;u>=0;u--)m=m+(n?-1:1)*d,m<0&&(m=0),m>100&&(m=100),a[u]=Xs([s[0],s[1],m]);m=s[2],l=Math.abs(s[2]-t[1]),d=l/i;for(let u=i+1;u<i*2+1;u++)m=m+(n?1:-1)*d,m<0&&(m=0),m>100&&(m=100),a[u]=Xs([s[0],s[1],m]);return {colors:a,dark:n}}function Ue(e,r){let t=Object.assign({levels:[5,1,2,3,4,5],range:[10,98],count:5},typeof r=="string"?{color:r}:r),{colors:o,dark:i}=Oc(t),s={};o.reduce((a,l,d)=>(s[`${e}${d}`]=l,a),{});let n=`--t-${e.split("-")[4]}`;return t.levels&&(s[`${n}-color`]=`var(${e}${t.levels[0]})`,s[`${n}-bgcolor`]=`var(${e}${t.levels[1]})`,t.levels.slice(2).forEach((a,l)=>{s[`${n}-bgcolor-${l+1}`]=`var(${e}${a})`;})),{vars:s,colors:o,dark:i}}function Pi(e=10){return Math.random().toString(36).substring(2,e+2)}function Qs(e,r){if(globalThis.document==null)return;let{id:t,mode:o,location:i="head"}=Object.assign({mode:"default"},r),s=document.head.querySelector(`#${t}`),n=t||Pi();return s?(o=="replace"?s.innerHTML=e:o=="append"&&(s.innerHTML+=e),n):(s=document.createElement("style"),s.innerHTML=e,s.id=n,r?.el?r.el.appendChild(s):i=="head"?document.head.appendChild(s):document.body.appendChild(s),s)}function Tc(e){let r=Object.assign({name:Pi(),variants:{}},e),t=Object.assign({prefix:"--t-color-theme-",range:[10,100],levels:[10,1,2,3,4,5]},typeof r.theme=="string"?{color:r.theme}:r.theme),o=r.selector||":root,:host",{vars:i,dark:s}=Ue("--t-color-theme-",t);r.variants.primary&&Ue("--t-color-primary-",r.variants.primary),r.variants.danger&&Ue("--t-color-danger-",r.variants.danger),r.variants.success&&Ue("--t-color-success-",r.variants.success),r.variants.warning&&Ue("--t-color-warning-",r.variants.warning),r.variants.info&&Ue("--t-color-info-",r.variants.info);let n=`${o}[data-theme=${r.name}]{
        ${`color-schema: ${s?"dark":"light"}`};
        ${Object.entries(i).map(([a,l])=>`${a}:${l}`).join(`;
`)}}`;return Qs(n,{id:`theme-${r.name||Pi()}`,mode:"replace"}),n}var Di=class{root;constructor(){this.root=document.documentElement,document.addEventListener("DOMContentLoaded",this._onDomContentLoaded.bind(this));}get size(){return this.root.dataset.size||"medium"}set size(r){this.root.dataset.size=r;}get spacing(){return this.root.dataset.spacing||"medium"}set spacing(r){this.root.dataset.spacing=String(r);}get radius(){return this.root.dataset.radius||"medium"}set radius(r){this.root.dataset.radius=r;}get theme(){return this.root.dataset.theme||"light"}set theme(r){this.root.dataset.theme=r;}_onDomContentLoaded(){this.root=document.documentElement;}createVariant(r,t){let{vars:o}=Ue(`--t-color-${r}-`,t),i=`${this.theme==="light"?":root,:host":`:host,
:root[data-theme=${this.theme}]`}{${Object.entries(o).map(([s,n])=>`${s}: ${n};`).join(`
`)}`;Qs(i,{id:`t-${this.theme}-${r}`,mode:"replace"});}create(r){Tc(r);}},Rc=new Di;globalThis.ThemePro=Rc;var Do=globalThis,Zs=e=>e,Io=Do.trustedTypes,tn=Io?Io.createPolicy("lit-html",{createHTML:e=>e}):void 0,Hi="$lit$",ge=`lit$${Math.random().toFixed(9).slice(2)}$`,Bi="?"+ge,Ic=`<${Bi}>`,Ge=Do.document===void 0?{createTreeWalker:()=>({})}:document,Fr=()=>Ge.createComment(""),Hr=e=>e===null||typeof e!="object"&&typeof e!="function",ji=Array.isArray,an=e=>ji(e)||typeof e?.[Symbol.iterator]=="function",Fi=`[ 	
\f\r]`,Dr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,en=/-->/g,rn=/>/g,qe=RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),on=/'/g,sn=/"/g,ln=/^(?:script|style|textarea|title)$/i,Ni=e=>(r,...t)=>({_$litType$:e,strings:r,values:t}),h=Ni(1),ct=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),nn=new WeakMap,Ke=Ge.createTreeWalker(Ge,129);function dn(e,r){if(!ji(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return tn!==void 0?tn.createHTML(r):r}var un=(e,r)=>{let t=e.length-1,o=[],i,s=r===2?"<svg>":r===3?"<math>":"",n=Dr;for(let a=0;a<t;a++){let l=e[a],d,m,u=-1,f=0;for(;f<l.length&&(n.lastIndex=f,m=n.exec(l),m!==null);)f=n.lastIndex,n===Dr?m[1]==="!--"?n=en:m[1]!==void 0?n=rn:m[2]!==void 0?(ln.test(m[2])&&(i=RegExp("</"+m[2],"g")),n=qe):m[3]!==void 0&&(n=qe):n===qe?m[0]===">"?(n=i??Dr,u=-1):m[1]===void 0?u=-2:(u=n.lastIndex-m[2].length,d=m[1],n=m[3]===void 0?qe:m[3]==='"'?sn:on):n===sn||n===on?n=qe:n===en||n===rn?n=Dr:(n=qe,i=void 0);let g=n===qe&&e[a+1].startsWith("/>")?" ":"";s+=n===Dr?l+Ic:u>=0?(o.push(d),l.slice(0,u)+Hi+l.slice(u)+ge+g):l+ge+(u===-2?a:g);}return [dn(e,s+(e[t]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),o]},Br=class e{constructor({strings:r,_$litType$:t},o){let i;this.parts=[];let s=0,n=0,a=r.length-1,l=this.parts,[d,m]=un(r,t);if(this.el=e.createElement(d,o),Ke.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes);}for(;(i=Ke.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(Hi)){let f=m[n++],g=i.getAttribute(u).split(ge),b=/([.?@])?(.*)/.exec(f);l.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?Mo:b[1]==="?"?zo:b[1]==="@"?Vo:Xe}),i.removeAttribute(u);}else u.startsWith(ge)&&(l.push({type:6,index:s}),i.removeAttribute(u));if(ln.test(i.tagName)){let u=i.textContent.split(ge),f=u.length-1;if(f>0){i.textContent=Io?Io.emptyScript:"";for(let g=0;g<f;g++)i.append(u[g],Fr()),Ke.nextNode(),l.push({type:2,index:++s});i.append(u[f],Fr());}}}else if(i.nodeType===8)if(i.data===Bi)l.push({type:2,index:s});else {let u=-1;for(;(u=i.data.indexOf(ge,u+1))!==-1;)l.push({type:7,index:s}),u+=ge.length-1;}s++;}}static createElement(r,t){let o=Ge.createElement("template");return o.innerHTML=r,o}};function Ye(e,r,t=e,o){if(r===ct)return r;let i=o!==void 0?t._$Co?.[o]:t._$Cl,s=Hr(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(false),s===void 0?i=void 0:(i=new s(e),i._$AT(e,t,o)),o!==void 0?(t._$Co??=[])[o]=i:t._$Cl=i),i!==void 0&&(r=Ye(e,i._$AS(e,r.values),i,o)),r}var Lo=class{constructor(r,t){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=t;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:t},parts:o}=this._$AD,i=(r?.creationScope??Ge).importNode(t,true);Ke.currentNode=i;let s=Ke.nextNode(),n=0,a=0,l=o[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new mr(s,s.nextSibling,this,r):l.type===1?d=new l.ctor(s,l.name,l.strings,this,r):l.type===6&&(d=new Po(s,this,r)),this._$AV.push(d),l=o[++a];}n!==l?.index&&(s=Ke.nextNode(),n++);}return Ke.currentNode=Ge,i}p(r){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(r,o,t),t+=o.strings.length-2):o._$AI(r[t])),t++;}},mr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,t,o,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=r,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??true;}get parentNode(){let r=this._$AA.parentNode,t=this._$AM;return t!==void 0&&r?.nodeType===11&&(r=t.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,t=this){r=Ye(this,r,t),Hr(r)?r===Y||r==null||r===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):r!==this._$AH&&r!==ct&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):an(r)?this.k(r):this._(r);}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r));}_(r){this._$AH!==Y&&Hr(this._$AH)?this._$AA.nextSibling.data=r:this.T(Ge.createTextNode(r)),this._$AH=r;}$(r){let{values:t,_$litType$:o}=r,i=typeof o=="number"?this._$AC(r):(o.el===void 0&&(o.el=Br.createElement(dn(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else {let s=new Lo(i,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s;}}_$AC(r){let t=nn.get(r.strings);return t===void 0&&nn.set(r.strings,t=new Br(r)),t}k(r){ji(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,i=0;for(let s of r)i===t.length?t.push(o=new e(this.O(Fr()),this.O(Fr()),this,this.options)):o=t[i],o._$AI(s),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i);}_$AR(r=this._$AA.nextSibling,t){for(this._$AP?.(false,true,t);r!==this._$AB;){let o=Zs(r).nextSibling;Zs(r).remove(),r=o;}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r));}},Xe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,t,o,i,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=r,this.name=t,this._$AM=i,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Y;}_$AI(r,t=this,o,i){let s=this.strings,n=false;if(s===void 0)r=Ye(this,r,t,0),n=!Hr(r)||r!==this._$AH&&r!==ct,n&&(this._$AH=r);else {let a=r,l,d;for(r=s[0],l=0;l<s.length-1;l++)d=Ye(this,a[o+l],t,l),d===ct&&(d=this._$AH[l]),n||=!Hr(d)||d!==this._$AH[l],d===Y?r=Y:r!==Y&&(r+=(d??"")+s[l+1]),this._$AH[l]=d;}n&&!i&&this.j(r);}j(r){r===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"");}},Mo=class extends Xe{constructor(){super(...arguments),this.type=3;}j(r){this.element[this.name]=r===Y?void 0:r;}},zo=class extends Xe{constructor(){super(...arguments),this.type=4;}j(r){this.element.toggleAttribute(this.name,!!r&&r!==Y);}},Vo=class extends Xe{constructor(r,t,o,i,s){super(r,t,o,i,s),this.type=5;}_$AI(r,t=this){if((r=Ye(this,r,t,0)??Y)===ct)return;let o=this._$AH,i=r===Y&&o!==Y||r.capture!==o.capture||r.once!==o.once||r.passive!==o.passive,s=r!==Y&&(o===Y||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,r),this._$AH=r;}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r);}},Po=class{constructor(r,t,o){this.element=r,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o;}get _$AU(){return this._$AM._$AU}_$AI(r){Ye(this,r);}},hn={I:mr},Lc=Do.litHtmlPolyfillSupport;Lc?.(Br,mr),(Do.litHtmlVersions??=[]).push("3.3.2");var fr=(e,r,t)=>{let o=t?.renderBefore??r,i=o._$litPart$;if(i===void 0){let s=t?.renderBefore??null;o._$litPart$=i=new mr(r.insertBefore(Fr(),s),s,void 0,t??{});}return i._$AI(e),i};var w=e=>e??Y;var mn=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(r){this.ariaActiveDescendantElement=null,this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColIndexText="",this.ariaColSpan="",this.ariaControlsElements=null,this.ariaCurrent="",this.ariaDescribedByElements=null,this.ariaDescription="",this.ariaDetailsElements=null,this.ariaDisabled="",this.ariaErrorMessageElements=null,this.ariaExpanded="",this.ariaFlowToElements=null,this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLabelledByElements=null,this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaOwnsElements=null,this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRelevant="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowIndexText="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=true,this.__host=r;}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),true}reportValidity(){return  true}setFormValue(){}setValidity(){}};var pe=function(e,r,t,o,i){if(typeof r=="function"?e!==r||true:!r.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r.set(e,t),t},xt=function(e,r,t,o){if(typeof r=="function"?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?o:t==="a"?o.call(e):o?o.value:r.get(e)},gr,Fo,Ho,jr,Wi,Nr,Bo,Je,Wr,$e,jo,fn,gn=e=>typeof e=="boolean"?e:e?.capture??false;var Ui=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map;}addEventListener(r,t,o){if(t==null)return;let i=gn(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);if(s===void 0)s=new Map,i.set(r,s);else if(s.has(t))return;let n=typeof o=="object"&&o?o:{};n.signal?.addEventListener("abort",()=>this.removeEventListener(r,t,o)),s.set(t,n??{});}removeEventListener(r,t,o){if(t==null)return;let i=gn(o)?this.__captureEventListeners:this.__eventListeners,s=i.get(r);s!==void 0&&(s.delete(t),s.size||i.delete(r));}dispatchEvent(r){let t=[this],o=this.__eventTargetParent;if(r.composed)for(;o;)t.push(o),o=o.__eventTargetParent;else for(;o&&o!==this.__host;)t.push(o),o=o.__eventTargetParent;let i=false,s=false,n=0,a=null,l=null,d=null,m=r.stopPropagation,u=r.stopImmediatePropagation;Object.defineProperties(r,{target:{get(){return a??l},...Q},srcElement:{get(){return r.target},...Q},currentTarget:{get(){return d},...Q},eventPhase:{get(){return n},...Q},composedPath:{value:()=>t,...Q},stopPropagation:{value:()=>{i=true,m.call(r);},...Q},stopImmediatePropagation:{value:()=>{s=true,u.call(r);},...Q}});let f=(E,C,O)=>{typeof E=="function"?E(r):typeof E?.handleEvent=="function"&&E.handleEvent(r),C.once&&O.delete(E);},g=()=>(d=null,n=0,!r.defaultPrevented),b=t.slice().reverse();a=!this.__host||!r.composed?this:null;let x=E=>{for(l=this;l.__host&&E.includes(l.__host);)l=l.__host;};for(let E of b){!a&&(!l||l===E.__host)&&x(b.slice(b.indexOf(E))),d=E,n=E===r.target?2:1;let C=E.__captureEventListeners.get(r.type);if(C){for(let[O,_]of C)if(f(O,_,C),s)return g()}if(i)return g()}let R=r.bubbles?t:[this];l=null;for(let E of R){!a&&(!l||E===l.__host)&&x(R.slice(0,R.indexOf(E)+1)),d=E,n=E===r.target?2:3;let C=E.__eventListeners.get(r.type);if(C){for(let[O,_]of C)if(f(O,_,C),s)return g()}if(i)return g()}return g()}},qi=Ui;var Q={__proto__:null};Q.enumerable=true;Object.freeze(Q);var Ki=($e=class{constructor(r,t={}){if(gr.set(this,false),Fo.set(this,false),Ho.set(this,false),jr.set(this,false),Wi.set(this,Date.now()),Nr.set(this,false),Bo.set(this,void 0),Je.set(this,void 0),Wr.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,arguments.length===0)throw new Error("The type argument must be specified");if(typeof t!="object"||!t)throw new Error('The "options" argument must be an object');let{bubbles:o,cancelable:i,composed:s}=t;pe(this,gr,!!i),pe(this,Fo,!!o),pe(this,Ho,!!s),pe(this,Bo,`${r}`),pe(this,Je,null),pe(this,Wr,false);}initEvent(r,t,o){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation();}preventDefault(){pe(this,jr,true);}get target(){return xt(this,Je,"f")}get currentTarget(){return xt(this,Je,"f")}get srcElement(){return xt(this,Je,"f")}get type(){return xt(this,Bo,"f")}get cancelable(){return xt(this,gr,"f")}get defaultPrevented(){return xt(this,gr,"f")&&xt(this,jr,"f")}get timeStamp(){return xt(this,Wi,"f")}composedPath(){return xt(this,Wr,"f")?[xt(this,Je,"f")]:[]}get returnValue(){return !xt(this,gr,"f")||!xt(this,jr,"f")}get bubbles(){return xt(this,Fo,"f")}get composed(){return xt(this,Ho,"f")}get eventPhase(){return xt(this,Wr,"f")?$e.AT_TARGET:$e.NONE}get cancelBubble(){return xt(this,Nr,"f")}set cancelBubble(r){r&&pe(this,Nr,true);}stopPropagation(){pe(this,Nr,true);}get isTrusted(){return  false}},gr=new WeakMap,Fo=new WeakMap,Ho=new WeakMap,jr=new WeakMap,Wi=new WeakMap,Nr=new WeakMap,Bo=new WeakMap,Je=new WeakMap,Wr=new WeakMap,$e.NONE=0,$e.CAPTURING_PHASE=1,$e.AT_TARGET=2,$e.BUBBLING_PHASE=3,$e);Object.defineProperties(Ki.prototype,{initEvent:Q,stopImmediatePropagation:Q,preventDefault:Q,target:Q,currentTarget:Q,srcElement:Q,type:Q,cancelable:Q,defaultPrevented:Q,timeStamp:Q,composedPath:Q,returnValue:Q,bubbles:Q,composed:Q,eventPhase:Q,cancelBubble:Q,stopPropagation:Q,isTrusted:Q});var bn=(fn=class extends Ki{constructor(r,t={}){super(r,t),jo.set(this,void 0),pe(this,jo,t?.detail??null);}initCustomEvent(r,t,o,i){throw new Error("Method not implemented.")}get detail(){return xt(this,jo,"f")}},jo=new WeakMap,fn);Object.defineProperties(bn.prototype,{detail:Q});var Gi=Ki,Yi=bn;var Ot;(Ot=class{constructor(){this.STYLE_RULE=1,this.CHARSET_RULE=2,this.IMPORT_RULE=3,this.MEDIA_RULE=4,this.FONT_FACE_RULE=5,this.PAGE_RULE=6,this.NAMESPACE_RULE=10,this.KEYFRAMES_RULE=7,this.KEYFRAME_RULE=8,this.SUPPORTS_RULE=12,this.COUNTER_STYLE_RULE=11,this.FONT_FEATURE_VALUES_RULE=14,this.__parentStyleSheet=null,this.cssText="";}get parentRule(){return null}get parentStyleSheet(){return this.__parentStyleSheet}get type(){return 0}},Ot.STYLE_RULE=1,Ot.CHARSET_RULE=2,Ot.IMPORT_RULE=3,Ot.MEDIA_RULE=4,Ot.FONT_FACE_RULE=5,Ot.PAGE_RULE=6,Ot.NAMESPACE_RULE=10,Ot.KEYFRAMES_RULE=7,Ot.KEYFRAME_RULE=8,Ot.SUPPORTS_RULE=12,Ot.COUNTER_STYLE_RULE=11,Ot.FONT_FEATURE_VALUES_RULE=14,Ot);globalThis.Event??=Gi;globalThis.CustomEvent??=Yi;var vn=new WeakMap,Ur=e=>{let r=vn.get(e);return r===void 0&&vn.set(e,r=new Map),r},Mc=class extends qi{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null;}get attributes(){return Array.from(Ur(this)).map(([r,t])=>({name:r,value:t}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(r,t){Ur(this).set(r,String(t));}removeAttribute(r){Ur(this).delete(r);}toggleAttribute(r,t){if(this.hasAttribute(r)){if(t===void 0||!t)return this.removeAttribute(r),false}else return t===void 0||t?(this.setAttribute(r,""),true):false;return  true}hasAttribute(r){return Ur(this).has(r)}attachShadow(r){let t={host:this};return this.__shadowRootMode=r.mode,r&&r.mode==="open"&&(this.__shadowRoot=t),t}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");let r=new mn(this);return this.__internals=r,r}getAttribute(r){return Ur(this).get(r)??null}};var zc=class extends Mc{},Ji=zc;globalThis.litServerRoot??=Object.defineProperty(new Ji,"localName",{get(){return "lit-server-root"}});function Vc(){let e,r;return {promise:new Promise((o,i)=>{e=o,r=i;}),resolve:e,reject:r}}var Xi=class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map;}define(r,t){if(this.__definitions.has(r))if(process.env.NODE_ENV==="development")console.warn(`'CustomElementRegistry' already has "${r}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);else throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${r}" has already been used with this registry`);if(this.__reverseDefinitions.has(t))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(t)}`);t.__localName=r,this.__definitions.set(r,{ctor:t,observedAttributes:t.observedAttributes??[]}),this.__reverseDefinitions.set(t,r),this.__pendingWhenDefineds.get(r)?.resolve(t),this.__pendingWhenDefineds.delete(r);}get(r){return this.__definitions.get(r)?.ctor}getName(r){return this.__reverseDefinitions.get(r)??null}upgrade(r){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(r){let t=this.__definitions.get(r);if(t)return t.ctor;let o=this.__pendingWhenDefineds.get(r);return o||(o=Vc(),this.__pendingWhenDefineds.set(r,o)),o.promise}},Pc=Xi;var yn=new Pc;var qr=globalThis,No=qr.ShadowRoot&&(qr.ShadyCSS===void 0||qr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qi=Symbol(),xn=new WeakMap,Kr=class{constructor(r,t,o){if(this._$cssResult$=true,o!==Qi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=t;}get styleSheet(){let r=this.o,t=this.t;if(No&&r===void 0){let o=t!==void 0&&t.length===1;o&&(r=xn.get(t)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),o&&xn.set(t,r));}return r}toString(){return this.cssText}},_n=e=>new Kr(typeof e=="string"?e:e+"",void 0,Qi),y=(e,...r)=>{let t=e.length===1?e[0]:r.reduce((o,i,s)=>o+(n=>{if(n._$cssResult$===true)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new Kr(t,e,Qi)},wn=(e,r)=>{if(No)e.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of r){let o=document.createElement("style"),i=qr.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,e.appendChild(o);}},Zi=No||qr.CSSStyleSheet===void 0?e=>e:e=>e instanceof CSSStyleSheet?(r=>{let t="";for(let o of r.cssRules)t+=o.cssText;return _n(t)})(e):e;var{is:Dc,defineProperty:Fc,getOwnPropertyDescriptor:Hc,getOwnPropertyNames:Bc,getOwnPropertySymbols:jc,getPrototypeOf:Nc}=Object,Yr=globalThis;Yr.customElements??=yn;var Cn=Yr.trustedTypes,Wc=Cn?Cn.emptyScript:"",Uc=Yr.reactiveElementPolyfillSupport,Gr=(e,r)=>e,Ee={toAttribute(e,r){switch(r){case Boolean:e=e?Wc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e);}return e},fromAttribute(e,r){let t=e;switch(r){case Boolean:t=e!==null;break;case Number:t=e===null?null:Number(e);break;case Object:case Array:try{t=JSON.parse(e);}catch{t=null;}}return t}},Wo=(e,r)=>!Dc(e,r),Sn={attribute:true,type:String,converter:Ee,reflect:false,useDefault:false,hasChanged:Wo};Symbol.metadata??=Symbol("metadata"),Yr.litPropertyMetadata??=new WeakMap;var be=class extends(globalThis.HTMLElement??Ji){static addInitializer(r){this._$Ei(),(this.l??=[]).push(r);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,t=Sn){if(t.state&&(t.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(r)&&((t=Object.create(t)).wrapped=true),this.elementProperties.set(r,t),!t.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(r,o,t);i!==void 0&&Fc(this.prototype,r,i);}}static getPropertyDescriptor(r,t,o){let{get:i,set:s}=Hc(this.prototype,r)??{get(){return this[t]},set(n){this[t]=n;}};return {get:i,set(n){let a=i?.call(this);s?.call(this,n),this.requestUpdate(r,a,o);},configurable:true,enumerable:true}}static getPropertyOptions(r){return this.elementProperties.get(r)??Sn}static _$Ei(){if(this.hasOwnProperty(Gr("elementProperties")))return;let r=Nc(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties);}static finalize(){if(this.hasOwnProperty(Gr("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(Gr("properties"))){let t=this.properties,o=[...Bc(t),...jc(t)];for(let i of o)this.createProperty(i,t[i]);}let r=this[Symbol.metadata];if(r!==null){let t=litPropertyMetadata.get(r);if(t!==void 0)for(let[o,i]of t)this.elementProperties.set(o,i);}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(r){let t=[];if(Array.isArray(r)){let o=new Set(r.flat(1/0).reverse());for(let i of o)t.unshift(Zi(i));}else r!==void 0&&t.push(Zi(r));return t}static _$Eu(r,t){let o=t.attribute;return o===false?void 0:typeof o=="string"?o:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this));}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.();}removeController(r){this._$EO?.delete(r);}_$E_(){let r=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(r.set(o,this[o]),delete this[o]);r.size>0&&(this._$Ep=r);}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return wn(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(r=>r.hostConnected?.());}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.());}attributeChangedCallback(r,t,o){this._$AK(r,o);}_$ET(r,t){let o=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,o);if(i!==void 0&&o.reflect===true){let s=(o.converter?.toAttribute!==void 0?o.converter:Ee).toAttribute(t,o.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null;}}_$AK(r,t){let o=this.constructor,i=o._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=o.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Ee;this._$Em=i;let a=n.fromAttribute(t,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null;}}requestUpdate(r,t,o,i=false,s){if(r!==void 0){let n=this.constructor;if(i===false&&(s=this[r]),o??=n.getPropertyOptions(r),!((o.hasChanged??Wo)(s,t)||o.useDefault&&o.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(n._$Eu(r,o))))return;this.C(r,t,o);}this.isUpdatePending===false&&(this._$ES=this._$EP());}C(r,t,{useDefault:o,reflect:i,wrapped:s},n){o&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??t??this[r]),s!==true||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||o||(t=void 0),this._$AL.set(r,t)),i===true&&this._$Em!==r&&(this._$Eq??=new Set).add(r));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0;}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,s]of o){let{wrapped:n}=s,a=this[i];n!==true||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a);}}let r=false,t=this._$AL;try{r=this.shouldUpdate(t),r?(this.willUpdate(t),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(t)):this._$EM();}catch(o){throw r=false,this._$EM(),o}r&&this._$AE(t);}willUpdate(r){}_$AE(r){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(r)),this.updated(r);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return  true}update(r){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(r){}firstUpdated(r){}};be.elementStyles=[],be.shadowRootOptions={mode:"open"},be[Gr("elementProperties")]=new Map,be[Gr("finalized")]=new Map,Uc?.({ReactiveElement:be}),(Yr.reactiveElementVersions??=[]).push("2.1.2");var ts=globalThis,pt=class extends be{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=fr(t,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return ct}};pt._$litElement$=true,pt.finalized=true,ts.litElementHydrateSupport?.({LitElement:pt});var qc=ts.litElementPolyfillSupport;qc?.({LitElement:pt});(ts.litElementVersions??=[]).push("4.2.2");var kn=e=>(r,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(e,r);}):customElements.define(e,r);};var Kc={attribute:true,type:String,converter:Ee,reflect:false,hasChanged:Wo},Gc=(e=Kc,r,t)=>{let{kind:o,metadata:i}=t,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),o==="setter"&&((e=Object.create(e)).wrapped=true),s.set(t.name,e),o==="accessor"){let{name:n}=t;return {set(a){let l=r.get.call(this);r.set.call(this,a),this.requestUpdate(n,l,e,true,a);},init(a){return a!==void 0&&this.C(n,void 0,e,a),a}}}if(o==="setter"){let{name:n}=t;return function(a){let l=this[n];r.call(this,a),this.requestUpdate(n,l,e,true,a);}}throw Error("Unsupported decorator location: "+o)};function p(e){return (r,t)=>typeof t=="object"?Gc(e,r,t):((o,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,o),n?Object.getOwnPropertyDescriptor(i,s):void 0})(e,r,t)}function k(e){return p({...e,state:true,attribute:false})}function Ae(e){return (r,t)=>{let o=typeof r=="function"?r:r[t];Object.assign(o,e);}}var ve=(e,r,t)=>(t.configurable=true,t.enumerable=true,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(e,r,t),t);function $(e,r){return (t,o,i)=>{let s=n=>n.renderRoot?.querySelector(e)??null;return ve(t,o,{get(){return s(this)}})}}var Yc;function $n(e){return (r,t)=>ve(r,t,{get(){return (this.renderRoot??(Yc??=document.createDocumentFragment())).querySelectorAll(e)}})}function En(e){return (r,t)=>{let{slot:o,selector:i}=e??{},s="slot"+(o?`[name=${o}]`:":not([name])");return ve(r,t,{get(){let n=this.renderRoot?.querySelector(s),a=n?.assignedElements(e)??[];return i===void 0?a:a.filter(l=>l.matches(i))}})}}function Oe(e){return e&&typeof e=="object"&&e.hasOwnProperty("__AS_ASYNC_COMPUTED_VALUE__")}function An(e,r){return Oe(e)?Object.assign({},e,r):Object.assign({value:e,loading:false,retry:0,progress:0,timeout:0,error:null,run:()=>{},cancel:()=>{}},r)}function On(e,r,t){if(!r||r.length===0)return e;let o=Array.isArray(r)?r:r.split("."),i,s=e;for(let n=0;n<o.length;n++){let a=o[n];if(a in s)i=s[a];else return t;s=i;}return i}function Uo(e,r,t,o){if(!r||!e)return e;let i=r;if(i.length===0)return typeof e=="object"&&Object.assign(e,t),e;{let s=e,n=[],a=(l,d,m)=>{l[d]=m;};for(let l=0;l<i.length;l++){let d=i[l];if(n.push(d),s)if(Array.isArray(s)){let m=parseInt(d,10);if(Number.isNaN(m)||m<0)throw new Error(`setVal: invalid array index ${n.join(".")}`);l===i.length-1?a(s,m,t):s=s[m];}else s instanceof Map||s instanceof WeakMap?l===i.length-1?s.set(d,t):(s.has(d)||s.set(d,{}),s=s.get(d)):typeof s=="object"&&d in s?l===i.length-1?a(s,d,t):s=s[d]:(s[d]=l===i.length-1?t:{},s=s[d]);else s[d]=l===i.length-1?t:{},s=s[d];}}return e}function Xc(e){if(e==null)return "";let r=typeof e;if(r==="boolean")return String(e);if(Array.isArray(e))return e.join(",");if(r==="object")try{return JSON.stringify(e)}catch{return "{}"}return String(e)}function Tn(e,r){if(!r)return e;let t=r.datatype||"any";if(t==="any")return e;if(t==="string")return Xc(e);if(t==="number")return Number(e);if(Array.isArray(e))return [...e];if(typeof e=="object")return {...e};if(typeof e=="string"){if(t==="boolean")return e.toLowerCase()==="true";if(t==="array")return e.split(",").map(o=>o.trim());if(t==="object")try{return JSON.parse(e)}catch{return {}}}return t==="boolean"?!!e:e}function Rn(e,r,t){return e?t(r):r}var es="";function In(e){es=e;}function Ln(e=""){if(!es){let r=[...document.getElementsByTagName("script")],t=r.find(o=>o.hasAttribute("data-shoelace"));if(t)In(t.getAttribute("data-shoelace"));else {let o=r.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),i="";o&&(i=o.getAttribute("src")),In(i.split("/").slice(0,-1).join("/"));}}return es.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}var Jc={name:"default",resolver:e=>Ln(`assets/icons/${e}.svg`)},Mn=Jc;var zn={caret:`
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
  `},Qc={name:"system",resolver:e=>e in zn?`data:image/svg+xml,${encodeURIComponent(zn[e])}`:""},Vn=Qc;var qo=[Mn,Vn],Ko=[];function rs(e){Ko.push(e);}function os(e){Ko=Ko.filter(r=>r!==e);}function br(e){return qo.find(r=>r.name===e)}function is(e,r){Pn(e),qo.push({name:e,resolver:r.resolver,mutator:r.mutator,spriteSheet:r.spriteSheet}),Ko.forEach(t=>{t.library===e&&t.setIcon();});}function Pn(e){qo=qo.filter(r=>r.name!==e);}var Hn=Object.defineProperty,Zc=Object.defineProperties,tp=Object.getOwnPropertyDescriptor,ep=Object.getOwnPropertyDescriptors,Dn=Object.getOwnPropertySymbols,rp=Object.prototype.hasOwnProperty,op=Object.prototype.propertyIsEnumerable,ss=(e,r)=>(r=Symbol[e])?r:Symbol.for("Symbol."+e),ns=e=>{throw TypeError(e)},Fn=(e,r,t)=>r in e?Hn(e,r,{enumerable:true,configurable:true,writable:true,value:t}):e[r]=t,kt=(e,r)=>{for(var t in r||(r={}))rp.call(r,t)&&Fn(e,t,r[t]);if(Dn)for(var t of Dn(r))op.call(r,t)&&Fn(e,t,r[t]);return e},ye=(e,r)=>Zc(e,ep(r)),c=(e,r,t,o)=>{for(var i=o>1?void 0:o?tp(r,t):r,s=e.length-1,n;s>=0;s--)(n=e[s])&&(i=(o?n(r,t,i):n(i))||i);return o&&i&&Hn(r,t,i),i},Bn=(e,r,t)=>r.has(e)||ns("Cannot "+t),jn=(e,r,t)=>(Bn(e,r,"read from private field"),r.get(e)),Nn=(e,r,t)=>r.has(e)?ns("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,t),Wn=(e,r,t,o)=>(Bn(e,r,"write to private field"),r.set(e,t),t),ip=function(e,r){this[0]=e,this[1]=r;},Un=e=>{var r=e[ss("asyncIterator")],t=false,o,i={};return r==null?(r=e[ss("iterator")](),o=s=>i[s]=n=>r[s](n)):(r=r.call(e),o=s=>i[s]=n=>{if(t){if(t=false,s==="throw")throw n;return n}return t=true,{done:false,value:new ip(new Promise(a=>{var l=r[s](n);l instanceof Object||ns("Object expected"),a(l);}),1)}}),i[ss("iterator")]=()=>i,o("next"),"throw"in r?o("throw"):i.throw=s=>{throw s},"return"in r&&o("return"),i};var Kn="https://unpkg.com/lucide-static@latest/icons/{name}.svg",as={help:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',error:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',email:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',search:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',lock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',globe:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round""><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',date:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',time:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',phone:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',copy:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',remove:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',refresh:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',datetime:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg>',bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>'},qn=e=>e in as?`data:image/svg+xml,${encodeURIComponent(as[e])}`:Kn.replace("{name}",e),sp=e=>{e&&e.setAttribute("stroke-width","1");};function vr(e="https://unpkg.com/lucide-static@latest/icons/{name}.svg",r){if(!e.includes("{name}"))throw new Error('icon url must include "{name}"');Kn=e,br("default").resolver!==qn&&is("default",{resolver:qn,mutator:sp});}function np(e){e=e.replace(/^#/,"");let r=parseInt(e.substring(0,2),16)/255,t=parseInt(e.substring(2,4),16)/255,o=parseInt(e.substring(4,6),16)/255,i=Math.max(r,t,o),s=Math.min(r,t,o),n=0,a=0,l=(i+s)/2;if(i!==s){let d=i-s;switch(a=l>.5?d/(2-i-s):d/(i+s),i){case r:n=(t-o)/d+(t<o?6:0);break;case t:n=(o-r)/d+2;break;case o:n=(r-t)/d+4;break}n/=6;}return {h:Math.round(n*360),s:Math.round(a*100),l:Math.round(l*100)}}function ap(e,r,t){r/=100,t/=100;let o=(1-Math.abs(2*t-1))*r,i=o*(1-Math.abs(e/60%2-1)),s=t-o/2,n=0,a=0,l=0;0<=e&&e<60?(n=o,a=i,l=0):60<=e&&e<120?(n=i,a=o,l=0):120<=e&&e<180?(n=0,a=o,l=i):180<=e&&e<240?(n=0,a=i,l=o):240<=e&&e<300?(n=i,a=0,l=o):300<=e&&e<360&&(n=o,a=0,l=i),n=Math.round((n+s)*255),a=Math.round((a+s)*255),l=Math.round((l+s)*255);let d=m=>{let u=m.toString(16);return u.length===1?"0"+u:u};return `#${d(n)}${d(a)}${d(l)}`}function Gn(e){let r=np(e),t={50:{hDiff:3.3,sFactor:.74,lFactor:.44},100:{hDiff:3.7,sFactor:.82,lFactor:.59},200:{hDiff:3,sFactor:.88,lFactor:.65},300:{hDiff:3.4,sFactor:.94,lFactor:.76},400:{hDiff:2.4,sFactor:.94,lFactor:.93},500:{hDiff:0,sFactor:1,lFactor:1},600:{hDiff:-1,sFactor:1.14,lFactor:1.2},700:{hDiff:-1,sFactor:1.16,lFactor:1.48},800:{hDiff:-0.9,sFactor:1.16,lFactor:1.73},900:{hDiff:-1.2,sFactor:1.16,lFactor:1.89},950:{hDiff:-13.7,sFactor:1.16,lFactor:2}},o={};for(let[i,s]of Object.entries(t)){let n=Math.max(0,Math.min(360,r.h+s.hDiff)),a=Math.max(0,Math.min(100,r.s*s.sFactor)),l=Math.max(0,Math.min(100,r.l*s.lFactor));o[`--sl-color-primary-${i}`]=ap(n,a,l);}return o}function lp(e){if(!e.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){console.error("Invalid color format. Please provide a valid hex color (e.g., #3B82F6)");return}try{let r=Gn(e),t=document.getElementById("auto-styles");t||(t=document.createElement("style"),t.id="auto-styles",document.head.appendChild(t));let o=`:root {
`;Object.entries(r).forEach(([s,n])=>{o+=`  ${s}: ${n};
`;}),o+="}",t.textContent=o;let i=document.body;return r["--sl-color-primary-500"]&&i.style.setProperty("--sl-color-primary-500",r["--sl-color-primary-500"]),console.log("Primary color changed successfully"),r}catch(r){console.error("Failed to change theme color:",r);}}globalThis.changePrimaryColor=lp;var Te=class extends Event{constructor(r,t,o,i){super("context-request",{bubbles:true,composed:true}),this.context=r,this.contextTarget=t,this.callback=o,this.subscribe=i??false;}};var yr=class{constructor(r,t,o,i){if(this.subscribe=false,this.provided=false,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=false,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=true,this.callback&&this.callback(s,n)),this.unsubscribe=n;},this.host=r,t.context!==void 0){let s=t;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??false;}else this.context=t,this.callback=o,this.subscribe=i??false;this.host.addController(this);}hostConnected(){this.dispatchRequest();}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0);}dispatchRequest(){this.host.dispatchEvent(new Te(this.context,this.host,this.t,this.subscribe));}};var Go=class{get value(){return this.o}set value(r){this.setValue(r);}setValue(r,t=false){let o=t||!Object.is(r,this.o);this.o=r,o&&this.updateObservers();}constructor(r){this.subscriptions=new Map,this.updateObservers=()=>{for(let[t,{disposer:o}]of this.subscriptions)t(this.o,o);},r!==void 0&&(this.value=r);}addCallback(r,t,o){if(!o)return void r(this.value);this.subscriptions.has(r)||this.subscriptions.set(r,{disposer:()=>{this.subscriptions.delete(r);},consumerHost:t});let{disposer:i}=this.subscriptions.get(r);r(this.value,i);}clearCallbacks(){this.subscriptions.clear();}};var ls=class extends Event{constructor(r,t){super("context-provider",{bubbles:true,composed:true}),this.context=r,this.contextTarget=t;}},xr=class extends Go{constructor(r,t,o){super(t.context!==void 0?t.initialValue:o),this.onContextRequest=i=>{if(i.context!==this.context)return;let s=i.contextTarget??i.composedPath()[0];s!==this.host&&(i.stopPropagation(),this.addCallback(i.callback,s,i.subscribe));},this.onProviderRequest=i=>{if(i.context!==this.context||(i.contextTarget??i.composedPath()[0])===this.host)return;let s=new Set;for(let[n,{consumerHost:a}]of this.subscriptions)s.has(n)||(s.add(n),a.dispatchEvent(new Te(this.context,a,n,true)));i.stopPropagation();},this.host=r,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this);}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest);}hostConnected(){this.host.dispatchEvent(new ls(this.context,this.host));}};function cs({context:e}){return (r,t)=>{let o=new WeakMap;if(typeof t=="object")return {get(){return r.get.call(this)},set(i){return o.get(this).setValue(i),r.set.call(this,i)},init(i){return o.set(this,new xr(this,{context:e,initialValue:i})),i}};{r.constructor.addInitializer((n=>{o.set(n,new xr(n,{context:e}));}));let i=Object.getOwnPropertyDescriptor(r,t),s;if(i===void 0){let n=new WeakMap;s={get(){return n.get(this)},set(a){o.get(this).setValue(a),n.set(this,a);},configurable:true,enumerable:true};}else {let n=i.set;s={...i,set(a){o.get(this).setValue(a),n?.call(this,a);}};}return void Object.defineProperty(r,t,s)}}}function ps({context:e,subscribe:r}){return (t,o)=>{typeof o=="object"?o.addInitializer((function(){new yr(this,{context:e,callback:i=>{t.set.call(this,i);},subscribe:r});})):t.constructor.addInitializer((i=>{new yr(i,{context:e,callback:s=>{i[o]=s;},subscribe:r});}));}}var Yo="autoform";var Xo=y`
    
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
    

`;var Yn=y`
    ${Xo}
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
`;var _t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Dt=e=>(...r)=>({_$litDirective$:e,values:r}),Tt=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,t,o){this._$Ct=r,this._$AM=t,this._$Ci=o;}_$AS(r,t){return this.update(r,t)}update(r,t){return this.render(...t)}};var{I:pp}=hn,Xn=e=>e;var Qn=(e,r)=>e?._$litType$!==void 0;var Jo=e=>e.strings===void 0,Jn=()=>document.createComment(""),_r=(e,r,t)=>{let o=e._$AA.parentNode,i=r===void 0?e._$AB:r._$AA;if(t===void 0){let s=o.insertBefore(Jn(),i),n=o.insertBefore(Jn(),i);t=new pp(s,n,e,e.options);}else {let s=t._$AB.nextSibling,n=t._$AM,a=n!==e;if(a){let l;t._$AQ?.(e),t._$AM=e,t._$AP!==void 0&&(l=e._$AU)!==n._$AU&&t._$AP(l);}if(s!==i||a){let l=t._$AA;for(;l!==s;){let d=Xn(l).nextSibling;Xn(o).insertBefore(l,i),l=d;}}}return t},Re=(e,r,t=e)=>(e._$AI(r,t),e),dp={},Qo=(e,r=dp)=>e._$AH=r,Zn=e=>e._$AH,Zo=e=>{e._$AR(),e._$AA.remove();};var ta=(e,r,t)=>{let o=new Map;for(let i=r;i<=t;i++)o.set(e[i],i);return o},et=Dt(class extends Tt{constructor(e){if(super(e),e.type!==_t.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,r,t){let o;t===void 0?t=r:r!==void 0&&(o=r);let i=[],s=[],n=0;for(let a of e)i[n]=o?o(a,n):n,s[n]=t(a,n),n++;return {values:s,keys:i}}render(e,r,t){return this.dt(e,r,t).values}update(e,[r,t,o]){let i=Zn(e),{values:s,keys:n}=this.dt(r,t,o);if(!Array.isArray(i))return this.ut=n,s;let a=this.ut??=[],l=[],d,m,u=0,f=i.length-1,g=0,b=s.length-1;for(;u<=f&&g<=b;)if(i[u]===null)u++;else if(i[f]===null)f--;else if(a[u]===n[g])l[g]=Re(i[u],s[g]),u++,g++;else if(a[f]===n[b])l[b]=Re(i[f],s[b]),f--,b--;else if(a[u]===n[b])l[b]=Re(i[u],s[b]),_r(e,l[b+1],i[u]),u++,b--;else if(a[f]===n[g])l[g]=Re(i[f],s[g]),_r(e,i[u],i[f]),f--,g++;else if(d===void 0&&(d=ta(n,g,b),m=ta(a,u,f)),d.has(a[u]))if(d.has(a[f])){let x=m.get(n[g]),R=x!==void 0?i[x]:null;if(R===null){let E=_r(e,i[u]);Re(E,s[g]),l[g]=E;}else l[g]=Re(R,s[g]),_r(e,i[u],R),i[x]=null;g++;}else Zo(i[f]),f--;else Zo(i[u]),u++;for(;g<=b;){let x=_r(e,l[b+1]);Re(x,s[g]),l[g++]=x;}for(;u<=f;){let x=i[u++];x!==null&&Zo(x);}return this.ut=n,Qo(e,l),ct}});var wr=class{constructor(r){this.host=r,r.addController(this);}updateContext(){Object.assign(this.host.context,{labelPos:this.host.labelPos,labelWidth:this.host.labelWidth,readonly:this.host.readonly,viewonly:this.host.viewonly,viewAlign:this.host.viewAlign,compact:this.host.compact,border:this.host.border,group:this.host.group,layout:this.host.layout,advanced:this.host.advanced,validAt:this.host.validAt,size:this.host.size});}hostUpdate(){this.host.tagName==="AUTO-FORM"&&this.updateContext();}};var ea="important",up=" !"+ea,Z=Dt(class extends Tt{constructor(e){if(super(e),e.type!==_t.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((r,t)=>{let o=e[t];return o==null?r:r+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(e,[r]){let{style:t}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(r)),this.render(r);for(let o of this.ft)r[o]==null&&(this.ft.delete(o),o.includes("-")?t.removeProperty(o):t[o]=null);for(let o in r){let i=r[o];if(i!=null){this.ft.add(o);let s=typeof i=="string"&&i.endsWith(up);o.includes("-")||s?t.setProperty(o,s?i.slice(0,-11):i,s?ea:""):t[o]=i;}}return ct}});function B(e,r,t){return e?r(e):t?.(e)}var Ie=class{constructor(r,...t){this.initialClasses=[];this.host=r,r.addController(this),this.initialClasses=t;}_forEachClasss(r,t){r&&r.forEach(o=>{typeof o=="string"?(t(o,true),this.host.classList.add(o)):Object.entries(o).forEach(([i,s])=>{t(i,s);});});}add(...r){this.host&&r&&this._forEachClasss(r,t=>{this.host.classList.add(t);});}remove(...r){this.host&&r&&this._forEachClasss(r,t=>{this.host.classList.remove(t);});}toggle(...r){this.host&&this._forEachClasss(r,t=>{this.host.classList.toggle(t);});}use(...r){this.host&&this._forEachClasss(r,(t,o)=>{o?this.host.classList.add(t):this.host.classList.remove(t);});}has(r){return this.host.classList.contains(r)}hostConnected(){this.add(...this.initialClasses);}hostDisconnected(){this.remove(...this.initialClasses);}hostUpdate(){}};var Xr=class extends Tt{constructor(r){if(super(r),this.it=Y,r.type!==_t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===Y||r==null)return this._t=void 0,this.it=r;if(r===ct)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let t=[r];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Xr.directiveName="unsafeHTML",Xr.resultType=1;var Rt=Dt(Xr);function ra(e,r){r&&Object.entries(r).forEach(([t,o])=>{(t==="root"?[e]:Array.from(e.querySelectorAll(t))).forEach(s=>{typeof o=="string"?s.style.cssText=o:typeof o=="object"&&Object.assign(s.style,o);});});}function Cr(e,r,t){t?e.classList.add(r):e.classList.remove(r);}function oa(){return {widget:"input",name:"",path:[],visible:true,enable:true,required:false,order:0,advanced:false,actions:[]}}var I=class extends pt{constructor(){super(...arguments);this.theme=new wr(this);this.classs=new Ie(this);this.options=oa();this.value="";this.name="";this.path="";this.labelPos="top";this.dirty=false;this.noreactive=false;this.beforeActions=[];this.afterActions=[];this._subscribers=[];this.onFieldChange=()=>this._updateFieldValue();this.onFieldInput=()=>this._updateFieldValue();}static{this.styles=Yn;}get shadow(){return this.shadowRoot}getFieldOptions(){let t=this.schema||{};return Object.entries(t).reduce((o,[i,s])=>(Oe(s)?o[i]=s.value:o[i]=s,o),Object.assign({},oa(),this.getInitialOptions()))}getPrefix(){}getSuffix(){}renderActions(t=true){return h`${this.renderBeforeActions(t)} ${this.renderAfterActions(t)}`}_onClickAction(t,o){return i=>{typeof o=="function"&&o(i),t.onClick&&typeof t.onClick=="function"&&t.onClick?.call(this,this.getInputValue(),{action:t,options:this.options,event:i,update:s=>{Uo(this.context.store.state,this.options.path,s);}});}}renderBeforeActions(t){if(Array.isArray(this.beforeActions)&&this.beforeActions.length>0)return h`<div
                class="actions before"
                part="before-actions"
                slot="${w(t?"prefix":void 0)}"
            >
                ${et(this.beforeActions,o=>this.renderActionWidget(o))}
            </div>`}renderAfterActions(t){if(Array.isArray(this.afterActions)&&this.afterActions.length>0)return h`<div
                class="actions after"
                part="after-actions"
                slot="${w(t?"suffix":void 0)}"
            >
                ${et(this.afterActions,o=>this.renderActionWidget(o))}
            </div>`}_renderDropdownAction(t){return h`
            <sl-dropdown
                class="action-widget"
                hoist
                title=${w(t.tips)}
                placement=${t.pos==="before"?"bottom-start":"bottom-end"}
            >
                <sl-button slot="trigger" ?caret=${t.caret}>
                    ${B(t.icon,()=>h`<sl-icon name=${w(t.icon)}></sl-icon>`)}
                    ${t.label}
                </sl-button>
                <sl-menu>
                    ${et(t.items||[],o=>o==="-"?h`<sl-divider></sl-divider>`:(typeof o=="string"&&(o={label:o}),h`<sl-menu-item
                            @click=${this._onClickAction.call(this,o,()=>{t.syncMenu&&(t.label=o.label,t.icon=o.icon,t.tips=o.tips,this.requestUpdate());})}
                        >
                            ${B(o.icon,()=>h`<sl-icon
                                        name=${w(o.icon)}
                                        slot="prefix"
                                    ></sl-icon>`)}
                            ${o.label}</sl-menu-item
                        >`))}
                </sl-menu>
            </sl-dropdown>
        `}_renderButtonAction(t){return h`
            <sl-button
                class="action-widget"
                title=${w(t.tips)}
                variant=${w(t.variant)}
                size=${t.size||this.context.size}
                @click=${this._onClickAction.call(this,t)}
            >
                ${B(t.icon,()=>h`<sl-icon name=${w(t.icon)}></sl-icon>`)}
                ${t.label}
            </sl-button>
        `}_renderImageAction(t){return h`
            <sl-button
                title="${w(t.tips)}"
                variant="text"
                class="action-widget image"
                @click=${this._onClickAction.call(this,t)}
            >
                <img src="${w(t.url)}" />
            </sl-button>
        `}renderActionWidget(t){if(typeof t!="object")return;let o=t.type||"button";if(o==="dropdown")return this._renderDropdownAction(t);if(o==="button")return this._renderButtonAction(t);if(o==="image")return this._renderImageAction(t)}renderOption(t,o){let i=this.schema[t];if(i)return i.loading?h`<sl-spinner></sl-spinner>`:h`${o?o(this.options.required):this.options.required}</div>`}getLabel(){return this.getSchema().label||this.name}getSchema(){return this.schema}toView(t){return this.options.toView&&typeof this.options.toView=="function"?this.options.toView.call(this,t):t}toState(t){return this.options.toState&&typeof this.options.toState=="function"?this.options.toState.call(this,t):t}toInput(t){return this.options.toInput&&typeof this.options.toInput=="function"?this.options.toInput.call(this,t):t}getOptionValue(t,o){if(this.schema&&t in this.schema){let i=this.schema[t];return i===void 0?o:Oe(i)?i.value:i}else return o}getOption(t){if(this.schema&&t in this.schema){let o=this.schema[t];return Oe(o)?o:An(o)}}getInputValue(){if(!this.input)return "";let t=this.input.value;if(typeof this.options.toState!="function"){let o=this.options.datatype||"string";o==="number"?t=Number(t):o==="boolean"&&(t=!!t);}return t}_renderRequiredOption(){return this.renderOption("required",t=>t?h`<span style="color:red;">*</span>`:"")}renderHelp(t=false){let o=this.options.help;if(!o)return;let i=o.match(/\(([^)]+)\)[^)]*$/),s=i?i[1]:null,n=s?o.replace(`(${s})`,""):o;return h`<span
            class="help"
            part="field-help"
            title="${w(t?n:void 0)}"
        >
            ${Rn(!!s,h`
                    <sl-icon name="help"></sl-icon>
                    ${B(!t,()=>h`${n}`)}
                `,a=>h`<a target="_blank" href="${s}">${a}</a>`)}
        </span>`}renderLabel(){let t=this.context,o=this.options.labelPos||t.labelPos;if(o==="none")return h``;{let i={};return (t.labelWidth&&o==="left"||t.viewonly)&&(i.width=t.labelWidth),h`<div class="label" part="field-label" style="${w(Z(i))}">
                <span class="title">
                    ${this.getLabel()}
                    ${B(o==="left"||t.viewonly,()=>this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${B(o==="top"&&!t.viewonly,()=>this.renderHelp())}
            </div>`}}renderInput(){return h``}isShowError(){return this.context.validAtInit?!!this.invalidTips:this.dirty?!!this.invalidTips:false}renderError(){return this.isShowError()?h`<div class="error">${this.invalidTips}</div>`:h``}_handleSchemaChange(){let t=this.context;if(t?.store&&this.schema){let o=this.getPath().join("_$_");this._subscribers.push(t.store.schemas.store.watch(`${o}.**`,i=>{let{reply:s,type:n,value:a,flags:l}=i;if(s||t.form.seq===l)return;(n==="batch"?a:[i]).forEach(m=>{let u=m.path.slice(1);Uo(this.schema,u,m.value),this.options[u[0]]=m.value;}),this.requestUpdate();},{operates:"write"}));}}renderView(){let t=this.value;if(this.options.toView&&this.options.toView)try{t=this.options.toView.call(this,this.value);}catch(o){console.error(`Error while toView<${this.path}>: ${o.message}`);}return h`${Rt(String(t))}`}_handleStateChange(){let t=this.context;t?.store&&this.schema&&this._subscribers.push(t.store.watch(this.getPath().join("."),o=>{this.value=this.toInput(o.value);},{operates:"write"}));}getStateValue(){return this.toInput(On(this.context.store.state,this.getPath()))}connectedCallback(){super.connectedCallback(),this.updateOptions();}updateOptions(){let t=this.context;t?.store&&this.schema&&(this.options=this.getFieldOptions(),this.value=this.getStateValue(),this._handleSchemaChange(),this._handleStateChange(),this.path=this.getPath().join("."),this.name=this.options.name||this.path,this.path in t.store.schemas.errors&&(this.invalidTips=t.store.schemas.errors[this.path]),Array.isArray(this.options.actions)&&(this.beforeActions=this.options.actions.filter(o=>o.pos==="before"),this.afterActions=this.options.actions.filter(o=>o.pos!=="before")));}getInitialOptions(){return {}}disconnectedCallback(){super.disconnectedCallback(),this._subscribers.forEach(t=>{t.off();});}getLabelPos(){return this.options.labelPos||this.context.labelPos}_updateFormClasss(){this.context.form&&(Cr(this.context.form,"dirty",this.dirty),Cr(this.context.form,"invalid",!!this.invalidTips));}_updateFieldValue(){if(!this.schema)return;let t=this.getPath(),o=this.toState(this.getInputValue()),i=this.context;i.dirty=true,this.dirty=true;try{let s=this.context.store;this.noreactive||s.update(n=>{let a=Tn(o,this.schema);Uo(n,t,a),this.invalidTips=void 0;},{flags:i.form.seq}),this.dispatchEvent(new CustomEvent("field-change",{detail:{value:o,options:this.options},composed:!0,bubbles:!0}));}catch(s){this.invalidTips=s.message;}finally{this._updateFormClasss();}}renderValue(){return h`
            ${this.renderInput()} ${B(this.context.viewonly,()=>this.renderHelp())}
            ${this.renderError()}
        `}getPath(){return this.options.path&&this.options.path.length===0?this.parent?.getPath():this.options.path}updated(){this.options.styles&&ra(this.shadow,this.options.styles);}render(){let t=this.context,o=this.options.labelPos?this.options.labelPos:t.labelPos;return this.classs.use(t.size,{[`${t.border}-border`]:true,error:this.isShowError(),"left-label":o==="left"||t.viewonly,"top-label":o==="top"&&!t.viewonly,disable:this.options.enable===false,readonly:t.readonly,viewonly:t.viewonly,compact:this.compact===void 0?t.compact:this.compact,required:this.options.required===true,hidden:!this.options.visible,[`view-${t.viewAlign}`]:true,[`${t.layout}-layout`]:true}),h`
            <div class="autofield">
                ${this.options.divider?h`<sl-divider></sl-divider>`:null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${B(t.viewonly,()=>this.renderView(),()=>this.renderValue())}
                </div>
            </div>
        `}};v([p({type:Object})],I.prototype,"schema",2),v([k()],I.prototype,"value",2),v([k()],I.prototype,"invalidTips",2),v([k()],I.prototype,"labelPos",2),v([k()],I.prototype,"dirty",2),v([p({type:Boolean,reflect:true})],I.prototype,"noreactive",2),v([p({type:Boolean,reflect:true})],I.prototype,"compact",2),v([En({slot:"value",flatten:true})],I.prototype,"_field",2),v([$(".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker")],I.prototype,"input",2),v([ps({context:Yo}),p({attribute:false})],I.prototype,"context",2);function T(e){return r=>customElements.get(e)?r:kn(e)(r)}exports.AutoFieldInput=class J extends I{constructor(){super(...arguments);this._prefix="";this._suffix="";}connectedCallback(){super.connectedCallback(),this._initPrefixAndSuffix();}getInputType(){return this.options.inputType||"input"}getInitialOptions(){return {inputType:"input"}}getPrefix(){if(this.options.icon)return h`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}renderDropdown(){}_initPrefixAndSuffix(){let t=i=>i.map(s=>typeof s=="string"?s:s.value||s.label),o=(i,s,n=true)=>{if(Array.isArray(s)&&s.length>0){let a=t(s),l=-1;a.some((u,f)=>{if(n&&this.value.startsWith(u)||!n&&this.value.endsWith(u))return n?(this._prefix=u,this.value=this.value.substring(u.length)):(this._suffix=u,this.value=this.value.substring(0,this.value.length-u.length)),l=f,true});let d=l===-1?"?":typeof s[l]=="string"?s[l]:s[l].label,m={type:s.length===1?"button":"dropdown",label:d,caret:!n};m.type==="dropdown"?m.items=s.map(u=>(u==="-"||(u=typeof u=="string"?{label:u}:u,u.onClick=()=>{n?this._prefix=u.value??u.label:this._suffix=u.value??u.label,this.onFieldChange();}),u)):typeof s[0]=="string"?m.label=s[0]:Object.assign(m,s[0]),m.syncMenu=true,m.pos=n?"before":"after",n?i.splice(0,0,m):i.push(m);}};this.options.prefix&&o(this.beforeActions,this.options.prefix),this.options.suffix&&o(this.afterActions,this.options.suffix,false);}onInputChange(t){let o=t.type;this.context.validAt==="input"&&o.includes("input")?this.onFieldInput():o.includes("change")&&this.onFieldChange();}renderInput(){return h`
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
        `}toState(t){let o=super.toState(t);return typeof o=="string"&&(this._prefix&&(o=this._prefix+o),this._suffix&&(o=o+this._suffix)),o}toInput(t){let o=super.toInput(t);return typeof o=="string"&&(this._prefix&&o.startsWith(this._prefix)&&(o=o.substring(this._prefix.length)),this._suffix&&o.endsWith(this._suffix)&&(o=o.substring(0,o.length-this._suffix.length))),o}};exports.AutoFieldInput.styles=[I.styles,y`
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
        `],exports.AutoFieldInput=v([T("auto-field-input")],exports.AutoFieldInput);var ia=y`
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
`;var Nt=(e="value")=>(r,t)=>{let o=r.constructor,i=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(s,n,a){var l;let d=o.getPropertyOptions(e),m=typeof d.attribute=="string"?d.attribute:e;if(s===m){let u=d.converter||Ee,g=(typeof u=="function"?u:(l=u?.fromAttribute)!=null?l:Ee.fromAttribute)(a,d.type);this[e]!==g&&(this[t]=g);}i.call(this,s,n,a);};};var It=y`
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
`;var Jr=new WeakMap,Qr=new WeakMap,Zr=new WeakMap,ds=new WeakSet,ti=new WeakMap,bt=class{constructor(e,r){this.handleFormData=t=>{let o=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(a=>{t.formData.append(i,a.toString());}):t.formData.append(i,s.toString()));},this.handleFormSubmit=t=>{var o;let i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=Jr.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,true);})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(t.preventDefault(),t.stopImmediatePropagation());},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,false),ti.set(this.host,[]);},this.handleInteraction=t=>{let o=ti.get(this.host);o.includes(t.type)||o.push(t.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,true);},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let t=this.form.querySelectorAll("*");for(let o of t)if(typeof o.checkValidity=="function"&&!o.checkValidity())return  false}return  true},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let t=this.form.querySelectorAll("*");for(let o of t)if(typeof o.reportValidity=="function"&&!o.reportValidity())return  false}return  true},(this.host=e).addController(this),this.options=kt({form:t=>{let o=t.form;if(o){let s=t.getRootNode().querySelector(`#${o}`);if(s)return s}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var o;return (o=t.disabled)!=null?o:false},reportValidity:t=>typeof t.reportValidity=="function"?t.reportValidity():true,checkValidity:t=>typeof t.checkValidity=="function"?t.checkValidity():true,setValue:(t,o)=>t.value=o,assumeInteractionOn:["sl-input"]},r);}hostConnected(){let e=this.options.form(this.host);e&&this.attachForm(e),ti.set(this.host,[]),this.options.assumeInteractionOn.forEach(r=>{this.host.addEventListener(r,this.handleInteraction);});}hostDisconnected(){this.detachForm(),ti.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction);});}hostUpdated(){let e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid);}attachForm(e){e?(this.form=e,Jr.has(this.form)?Jr.get(this.form).add(this.host):Jr.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Qr.has(this.form)||(Qr.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Zr.has(this.form)||(Zr.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0;}detachForm(){if(!this.form)return;let e=Jr.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Qr.has(this.form)&&(this.form.reportValidity=Qr.get(this.form),Qr.delete(this.form)),Zr.has(this.form)&&(this.form.checkValidity=Zr.get(this.form),Zr.delete(this.form)),this.form=void 0));}setUserInteracted(e,r){r?ds.add(e):ds.delete(e),e.requestUpdate();}doAction(e,r){if(this.form){let t=document.createElement("button");t.type=e,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",r&&(t.name=r.name,t.value=r.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{r.hasAttribute(o)&&t.setAttribute(o,r.getAttribute(o));})),this.form.append(t),t.click(),t.remove();}}getForm(){var e;return (e=this.form)!=null?e:null}reset(e){this.doAction("reset",e);}submit(e){this.doAction("submit",e);}setValidity(e){let r=this.host,t=!!ds.has(r),o=!!r.required;r.toggleAttribute("data-required",o),r.toggleAttribute("data-optional",!o),r.toggleAttribute("data-invalid",!e),r.toggleAttribute("data-valid",e),r.toggleAttribute("data-user-invalid",!e&&t),r.toggleAttribute("data-user-valid",e&&t);}updateValidity(){let e=this.host;this.setValidity(e.validity.valid);}emitInvalidEvent(e){let r=new CustomEvent("sl-invalid",{bubbles:false,composed:false,cancelable:true,detail:{}});e||r.preventDefault(),this.host.dispatchEvent(r)||e?.preventDefault();}},Sr=Object.freeze({badInput:false,customError:false,patternMismatch:false,rangeOverflow:false,rangeUnderflow:false,stepMismatch:false,tooLong:false,tooShort:false,typeMismatch:false,valid:true,valueMissing:false}),sa=Object.freeze(ye(kt({},Sr),{valid:false,valueMissing:true})),na=Object.freeze(ye(kt({},Sr),{valid:false,customError:true}));var dt=class{constructor(e,...r){this.slotNames=[],this.handleSlotChange=t=>{let o=t.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate();},(this.host=e).addController(this),this.slotNames=r;}hasDefaultSlot(){return [...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return  true;if(e.nodeType===e.ELEMENT_NODE){let r=e;if(r.tagName.toLowerCase()==="sl-visually-hidden")return  false;if(!r.hasAttribute("slot"))return  true}return  false})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange);}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange);}};function aa(e){if(!e)return "";let r=e.assignedNodes({flatten:true}),t="";return [...r].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(t+=o.textContent);}),t}var la=y`
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
`;function A(e,r){let t=kt({waitUntilFirstUpdate:false},r);return (o,i)=>{let{update:s}=o,n=Array.isArray(e)?e:[e];o.update=function(a){n.forEach(l=>{let d=l;if(a.has(d)){let m=a.get(d),u=this[d];m!==u&&(!t.waitUntilFirstUpdate||this.hasUpdated)&&this[i](m,u);}}),s.call(this,a);};}}var z=y`
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
`;var ei,M=class extends pt{constructor(){super(),Nn(this,ei,false),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,r])=>{this.constructor.define(e,r);});}emit(e,r){let t=new CustomEvent(e,kt({bubbles:true,cancelable:false,composed:true,detail:{}},r));return this.dispatchEvent(t),t}static define(e,r=this,t={}){let o=customElements.get(e);if(!o){try{customElements.define(e,r,t);}catch{customElements.define(e,class extends r{},t);}return}let i=" (unknown version)",s=i;"version"in r&&r.version&&(i=" v"+r.version),"version"in o&&o.version&&(s=" v"+o.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${e}>${i}, but <${e}>${s} has already been registered.`);}attributeChangedCallback(e,r,t){jn(this,ei)||(this.constructor.elementProperties.forEach((o,i)=>{o.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i]);}),Wn(this,ei,true)),super.attributeChangedCallback(e,r,t);}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((r,t)=>{e.has(t)&&this[t]==null&&(this[t]=r);});}};ei=new WeakMap;M.version="2.20.1";M.dependencies={};c([p()],M.prototype,"dir",2);c([p()],M.prototype,"lang",2);var to=Symbol(),ri=Symbol(),us,hs=new Map,q=class extends M{constructor(){super(...arguments),this.initialRender=false,this.svg=null,this.label="",this.library="default";}async resolveIcon(e,r){var t;let o;if(r?.spriteSheet)return this.svg=h`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?to:ri}catch{return ri}try{let i=document.createElement("div");i.innerHTML=await o.text();let s=i.firstElementChild;if(((t=s?.tagName)==null?void 0:t.toLowerCase())!=="svg")return to;us||(us=new DOMParser);let a=us.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):to}catch{return to}}connectedCallback(){super.connectedCallback(),rs(this);}firstUpdated(){this.initialRender=true,this.setIcon();}disconnectedCallback(){super.disconnectedCallback(),os(this);}getIconSource(){let e=br(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:true}:{url:this.src,fromLibrary:false}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"));}async setIcon(){var e;let{url:r,fromLibrary:t}=this.getIconSource(),o=t?br(this.library):void 0;if(!r){this.svg=null;return}let i=hs.get(r);if(i||(i=this.resolveIcon(r,o),hs.set(r,i)),!this.initialRender)return;let s=await i;if(s===ri&&hs.delete(r),r===this.getIconSource().url){if(Qn(s)){if(this.svg=s,o){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n);}return}switch(s){case ri:case to:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(true),(e=o?.mutator)==null||e.call(o,this.svg),this.emit("sl-load");}}}render(){return this.svg}};q.styles=[z,la];c([k()],q.prototype,"svg",2);c([p({reflect:true})],q.prototype,"name",2);c([p()],q.prototype,"src",2);c([p()],q.prototype,"label",2);c([p({reflect:true})],q.prototype,"library",2);c([A("label")],q.prototype,"handleLabelChange",1);c([A(["name","src","library"])],q.prototype,"setIcon",1);var L=Dt(class extends Tt{constructor(e){if(super(e),e.type!==_t.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return " "+Object.keys(e).filter(r=>e[r]).join(" ")+" "}update(e,[r]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(let o in r)r[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(r)}let t=e.element.classList;for(let o of this.st)o in r||(t.remove(o),this.st.delete(o));for(let o in r){let i=!!r[o];i===this.st.has(o)||this.nt?.has(o)||(i?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)));}return ct}});var $t=Dt(class extends Tt{constructor(e){if(super(e),e.type!==_t.PROPERTY&&e.type!==_t.ATTRIBUTE&&e.type!==_t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Jo(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[r]){if(r===ct||r===Y)return r;let t=e.element,o=e.name;if(e.type===_t.PROPERTY){if(r===t[o])return ct}else if(e.type===_t.BOOLEAN_ATTRIBUTE){if(!!r===t.hasAttribute(o))return ct}else if(e.type===_t.ATTRIBUTE&&t.getAttribute(o)===r+"")return ct;return Qo(e),r}});var nt=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,r)=>e.checked=r}),this.hasSlotController=new dt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.indeterminate=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleClick(){this.checked=!this.checked,this.indeterminate=false,this.emit("sl-change");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity();}click(){this.input.click();}focus(e){this.input.focus(e);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("help-text"),r=this.helpText?true:!!e;return h`
      <div
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":r})}
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
            .indeterminate=${$t(this.indeterminate)}
            .checked=${$t(this.checked)}
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
            ${this.checked?h`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?h`
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
    `}};nt.styles=[z,It,ia];nt.dependencies={"sl-icon":q};c([$('input[type="checkbox"]')],nt.prototype,"input",2);c([k()],nt.prototype,"hasFocus",2);c([p()],nt.prototype,"title",2);c([p()],nt.prototype,"name",2);c([p()],nt.prototype,"value",2);c([p({reflect:true})],nt.prototype,"size",2);c([p({type:Boolean,reflect:true})],nt.prototype,"disabled",2);c([p({type:Boolean,reflect:true})],nt.prototype,"checked",2);c([p({type:Boolean,reflect:true})],nt.prototype,"indeterminate",2);c([Nt("checked")],nt.prototype,"defaultChecked",2);c([p({reflect:true})],nt.prototype,"form",2);c([p({type:Boolean,reflect:true})],nt.prototype,"required",2);c([p({attribute:"help-text"})],nt.prototype,"helpText",2);c([A("disabled",{waitUntilFirstUpdate:true})],nt.prototype,"handleDisabledChange",1);c([A(["checked","indeterminate"],{waitUntilFirstUpdate:true})],nt.prototype,"handleStateChange",1);nt.define("sl-checkbox");exports.AutoFieldCheckbox=class eo extends I{renderInput(){return h`
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
        `}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let r=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof r=="boolean"?"":r}}renderView(){return h` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `}};exports.AutoFieldCheckbox.styles=[I.styles,y`
            sl-checkbox.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldCheckbox=v([T("auto-field-checkbox")],exports.AutoFieldCheckbox);var ca=y`
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
`;var ie=class extends M{constructor(){super(),this.checked=false,this.hasFocus=false,this.size="medium",this.disabled=false,this.handleBlur=()=>{this.hasFocus=false,this.emit("sl-blur");},this.handleClick=()=>{this.disabled||(this.checked=true);},this.handleFocus=()=>{this.hasFocus=true,this.emit("sl-focus");},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus);}connectedCallback(){super.connectedCallback(),this.setInitialAttributes();}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}render(){return h`
      <span
        part="base"
        class=${L({radio:true,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?h` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};ie.styles=[z,ca];ie.dependencies={"sl-icon":q};c([k()],ie.prototype,"checked",2);c([k()],ie.prototype,"hasFocus",2);c([p()],ie.prototype,"value",2);c([p({reflect:true})],ie.prototype,"size",2);c([p({type:Boolean,reflect:true})],ie.prototype,"disabled",2);c([A("checked")],ie.prototype,"handleCheckedChange",1);c([A("disabled",{waitUntilFirstUpdate:true})],ie.prototype,"handleDisabledChange",1);ie.define("sl-radio");var pa=y`
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
`;var da=y`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var Le=class extends M{constructor(){super(...arguments),this.disableRole=false,this.label="";}handleFocus(e){let r=ro(e.target);r?.toggleAttribute("data-sl-button-group__button--focus",true);}handleBlur(e){let r=ro(e.target);r?.toggleAttribute("data-sl-button-group__button--focus",false);}handleMouseOver(e){let r=ro(e.target);r?.toggleAttribute("data-sl-button-group__button--hover",true);}handleMouseOut(e){let r=ro(e.target);r?.toggleAttribute("data-sl-button-group__button--hover",false);}handleSlotChange(){let e=[...this.defaultSlot.assignedElements({flatten:true})];e.forEach(r=>{let t=e.indexOf(r),o=ro(r);o&&(o.toggleAttribute("data-sl-button-group__button",true),o.toggleAttribute("data-sl-button-group__button--first",t===0),o.toggleAttribute("data-sl-button-group__button--inner",t>0&&t<e.length-1),o.toggleAttribute("data-sl-button-group__button--last",t===e.length-1),o.toggleAttribute("data-sl-button-group__button--radio",o.tagName.toLowerCase()==="sl-radio-button"));});}render(){return h`
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
    `}};Le.styles=[z,da];c([$("slot")],Le.prototype,"defaultSlot",2);c([k()],Le.prototype,"disableRole",2);c([p()],Le.prototype,"label",2);function ro(e){var r;let t="sl-button, sl-radio-button";return (r=e.closest(t))!=null?r:e.querySelector(t)}var vt=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this),this.hasSlotController=new dt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=false,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=false;}get validity(){let e=this.required&&!this.value;return this.customValidityMessage!==""?na:e?sa:Sr}get validationMessage(){let e=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:e?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value;}firstUpdated(){this.formControlController.updateValidity();}getAllRadios(){return [...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(e){let r=e.target.closest("sl-radio, sl-radio-button"),t=this.getAllRadios(),o=this.value;!r||r.disabled||(this.value=r.value,t.forEach(i=>i.checked=i===r),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")));}handleKeyDown(e){var r;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))return;let t=this.getAllRadios().filter(a=>!a.disabled),o=(r=t.find(a=>a.checked))!=null?r:t[0],i=e.key===" "?0:["ArrowUp","ArrowLeft"].includes(e.key)?-1:1,s=this.value,n=t.indexOf(o)+i;n<0&&(n=t.length-1),n>t.length-1&&(n=0),this.getAllRadios().forEach(a=>{a.checked=false,this.hasButtonGroup||a.setAttribute("tabindex","-1");}),this.value=t[n].value,t[n].checked=true,this.hasButtonGroup?t[n].shadowRoot.querySelector("button").focus():(t[n].setAttribute("tabindex","0"),t[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),e.preventDefault();}handleLabelClick(){this.focus();}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}async syncRadioElements(){var e,r;let t=this.getAllRadios();if(await Promise.all(t.map(async o=>{await o.updateComplete,o.checked=o.value===this.value,o.size=this.size;})),this.hasButtonGroup=t.some(o=>o.tagName.toLowerCase()==="sl-radio-button"),t.length>0&&!t.some(o=>o.checked))if(this.hasButtonGroup){let o=(e=t[0].shadowRoot)==null?void 0:e.querySelector("button");o&&o.setAttribute("tabindex","0");}else t[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let o=(r=this.shadowRoot)==null?void 0:r.querySelector("sl-button-group");o&&(o.disableRole=true);}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios());}updateCheckedRadio(){this.getAllRadios().forEach(r=>r.checked=r.value===this.value),this.formControlController.setValidity(this.validity.valid);}handleSizeChange(){this.syncRadios();}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio();}checkValidity(){let e=this.required&&!this.value,r=this.customValidityMessage!=="";return e||r?(this.formControlController.emitInvalidEvent(),false):true}getForm(){return this.formControlController.getForm()}reportValidity(){let e=this.validity.valid;return this.errorMessage=this.customValidityMessage||e?"":this.validationInput.validationMessage,this.formControlController.setValidity(e),this.validationInput.hidden=true,clearTimeout(this.validationTimeout),e||(this.validationInput.hidden=false,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=true,1e4)),e}setCustomValidity(e=""){this.customValidityMessage=e,this.errorMessage=e,this.validationInput.setCustomValidity(e),this.formControlController.updateValidity();}focus(e){let r=this.getAllRadios(),t=r.find(s=>s.checked),o=r.find(s=>!s.disabled),i=t||o;i&&i.focus(e);}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r,i=h`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return h`
      <fieldset
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":true,"form-control--has-label":t,"form-control--has-help-text":o})}
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

          ${this.hasButtonGroup?h`
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
    `}};vt.styles=[z,It,pa];vt.dependencies={"sl-button-group":Le};c([$("slot:not([name])")],vt.prototype,"defaultSlot",2);c([$(".radio-group__validation-input")],vt.prototype,"validationInput",2);c([k()],vt.prototype,"hasButtonGroup",2);c([k()],vt.prototype,"errorMessage",2);c([k()],vt.prototype,"defaultValue",2);c([p()],vt.prototype,"label",2);c([p({attribute:"help-text"})],vt.prototype,"helpText",2);c([p()],vt.prototype,"name",2);c([p({reflect:true})],vt.prototype,"value",2);c([p({reflect:true})],vt.prototype,"size",2);c([p({reflect:true})],vt.prototype,"form",2);c([p({type:Boolean,reflect:true})],vt.prototype,"required",2);c([A("size",{waitUntilFirstUpdate:true})],vt.prototype,"handleSizeChange",1);c([A("value")],vt.prototype,"handleValueChange",1);vt.define("sl-radio-group");exports.AutoFieldRadio=class oo extends I{getInitialOptions(){return {card:false,select:[],valueKey:"value"}}renderOptionItemWithCard(r,t){if(this.options.card){let o=t[this.options.valueKey]||t.label,i=this.value===o;return h`<div
                class="card"
                style=${Z({width:this.options.itemWidth})}
            >
                <div class="body ${i?"selected":""}">
                    <sl-icon class="icon" name="settings"></sl-icon>
                    ${r}
                </div>
            </div>`}else return r}onRadioChange(){this.onFieldChange(),this.options.card&&this.requestUpdate();}renderOptionItem(r){let t=r[this.options.valueKey]||r.label;return h`<sl-radio
            value="${t}"
            style=${Z({width:this.options.card===void 0?this.options.itemWidth:void 0})}
            ?disabled=${!this.options.enable}
            >${r.label}<br /><span class="memo">${r.tips}</span></sl-radio
        >`}renderInput(){let r=this.options.select.map(t=>{let o={};return typeof t=="object"?Object.assign(o,t):Object.assign(o,{label:t}),o});return h`
            <sl-radio-group class="value" name=${this.name} value="${this.value}" size="${this.context.size}" @sl-change=${this.onRadioChange.bind(this)}>
                ${r.map(t=>this.renderOptionItemWithCard(this.renderOptionItem(t),t))}
            </sl-radio-group>
        `}};exports.AutoFieldRadio.styles=[I.styles,y`
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
        `],exports.AutoFieldRadio=v([T("auto-field-radio")],exports.AutoFieldRadio);var ua=y`
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
`;var K=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new dt(this,"help-text","label"),this.hasFocus=false,this.title="",this.name="",this.value="",this.size="medium",this.filled=false,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=false,this.readonly=false,this.form="",this.required=false,this.spellcheck=true,this.defaultValue="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input);});}firstUpdated(){this.formControlController.updateValidity();}disconnectedCallback(){var e;super.disconnectedCallback(),this.input&&((e=this.resizeObserver)==null||e.unobserve(this.input));}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height="";}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleRowsChange(){this.setTextareaHeight();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight();}focus(e){this.input.focus(e);}blur(){this.input.blur();}select(){this.input.select();}scrollPosition(e){if(e){typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left);return}return {top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,r,t="none"){this.input.setSelectionRange(e,r,t);}setRangeText(e,r,t,o="preserve"){let i=r??this.input.selectionStart,s=t??this.input.selectionEnd;this.input.setRangeText(e,i,s,o),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight());}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r;return h`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":o})}
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
            class=${L({textarea:true,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${w(this.name)}
              .value=${$t(this.value)}
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
    `}};K.styles=[z,It,ua];c([$(".textarea__control")],K.prototype,"input",2);c([$(".textarea__size-adjuster")],K.prototype,"sizeAdjuster",2);c([k()],K.prototype,"hasFocus",2);c([p()],K.prototype,"title",2);c([p()],K.prototype,"name",2);c([p()],K.prototype,"value",2);c([p({reflect:true})],K.prototype,"size",2);c([p({type:Boolean,reflect:true})],K.prototype,"filled",2);c([p()],K.prototype,"label",2);c([p({attribute:"help-text"})],K.prototype,"helpText",2);c([p()],K.prototype,"placeholder",2);c([p({type:Number})],K.prototype,"rows",2);c([p()],K.prototype,"resize",2);c([p({type:Boolean,reflect:true})],K.prototype,"disabled",2);c([p({type:Boolean,reflect:true})],K.prototype,"readonly",2);c([p({reflect:true})],K.prototype,"form",2);c([p({type:Boolean,reflect:true})],K.prototype,"required",2);c([p({type:Number})],K.prototype,"minlength",2);c([p({type:Number})],K.prototype,"maxlength",2);c([p()],K.prototype,"autocapitalize",2);c([p()],K.prototype,"autocorrect",2);c([p()],K.prototype,"autocomplete",2);c([p({type:Boolean})],K.prototype,"autofocus",2);c([p()],K.prototype,"enterkeyhint",2);c([p({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],K.prototype,"spellcheck",2);c([p()],K.prototype,"inputmode",2);c([Nt()],K.prototype,"defaultValue",2);c([A("disabled",{waitUntilFirstUpdate:true})],K.prototype,"handleDisabledChange",1);c([A("rows",{waitUntilFirstUpdate:true})],K.prototype,"handleRowsChange",1);c([A("value",{waitUntilFirstUpdate:true})],K.prototype,"handleValueChange",1);K.define("sl-textarea");exports.AutoFieldTextArea=class io extends I{renderInput(){return h`
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
        `}getInitialOptions(){return {rows:3}}getInputValue(){return this.input.value}};exports.AutoFieldTextArea.styles=[I.styles,y`
            sl-textarea::part(textarea) {
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTextArea=v([T("auto-field-textarea")],exports.AutoFieldTextArea);var ha=y`
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
`;var wt=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,r)=>e.checked=r}),this.hasSlotController=new dt(this,"help-text"),this.hasFocus=false,this.title="",this.name="",this.size="medium",this.disabled=false,this.checked=false,this.defaultChecked=false,this.form="",this.required=false,this.helpText="";}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleInput(){this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleClick(){this.checked=!this.checked,this.emit("sl-change");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleKeyDown(e){e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=false,this.emit("sl-change"),this.emit("sl-input")),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=true,this.emit("sl-change"),this.emit("sl-input"));}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity();}handleDisabledChange(){this.formControlController.setValidity(true);}click(){this.input.click();}focus(e){this.input.focus(e);}blur(){this.input.blur();}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("help-text"),r=this.helpText?true:!!e;return h`
      <div
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":r})}
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
            .checked=${$t(this.checked)}
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
    `}};wt.styles=[z,It,ha];c([$('input[type="checkbox"]')],wt.prototype,"input",2);c([k()],wt.prototype,"hasFocus",2);c([p()],wt.prototype,"title",2);c([p()],wt.prototype,"name",2);c([p()],wt.prototype,"value",2);c([p({reflect:true})],wt.prototype,"size",2);c([p({type:Boolean,reflect:true})],wt.prototype,"disabled",2);c([p({type:Boolean,reflect:true})],wt.prototype,"checked",2);c([Nt("checked")],wt.prototype,"defaultChecked",2);c([p({reflect:true})],wt.prototype,"form",2);c([p({type:Boolean,reflect:true})],wt.prototype,"required",2);c([p({attribute:"help-text"})],wt.prototype,"helpText",2);c([A("checked",{waitUntilFirstUpdate:true})],wt.prototype,"handleCheckedChange",1);c([A("disabled",{waitUntilFirstUpdate:true})],wt.prototype,"handleDisabledChange",1);wt.define("sl-switch");exports.AutoFieldSwitch=class so extends I{renderInput(){return h`
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
        `}getCheckLabel(){if(this.options.checkLabel)return this.options.checkLabel;{let r=this.options.switchValues[this.value===this.options.switchValues[0]?0:1];return typeof r=="boolean"?"":r}}getInitialOptions(){return {switchValues:[true,false]}}_isChecked(){return typeof this.value=="boolean"?this.options.switchValues[this.value?0:1]:this.value===this.options.switchValues[0]}getInputValue(){return this.input.checked?this.options.switchValues[0]:this.options.switchValues[1]}renderView(){return h` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `}};exports.AutoFieldSwitch.styles=[I.styles,y`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `],exports.AutoFieldSwitch=v([T("auto-field-switch")],exports.AutoFieldSwitch);var oi=y`
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
`;var ma=y`
  ${oi}

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
`;var ga=Symbol.for(""),hp=e=>{if(e?.r===ga)return e?._$litStatic$};var kr=(e,...r)=>({_$litStatic$:r.reduce((t,o,i)=>t+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+e[i+1],e[0]),r:ga}),fa=new Map,ms=e=>(r,...t)=>{let o=t.length,i,s,n=[],a=[],l,d=0,m=false;for(;d<o;){for(l=r[d];d<o&&(s=t[d],(i=hp(s))!==void 0);)l+=i+r[++d],m=true;d!==o&&a.push(s),n.push(l),d++;}if(d===o&&n.push(r[o]),m){let u=n.join("$$lit$$");(r=fa.get(u))===void 0&&(n.raw=n,fa.set(u,r=n)),t=a;}return e(r,...t)},Me=ms(h);var Wt=class extends M{constructor(){super(...arguments),this.hasSlotController=new dt(this,"[default]","prefix","suffix"),this.hasFocus=false,this.checked=false,this.disabled=false,this.size="medium",this.pill=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.checked=true;}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}focus(e){this.input.focus(e);}blur(){this.input.blur();}render(){return Me`
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
    `}};Wt.styles=[z,ma];c([$(".button")],Wt.prototype,"input",2);c([$(".hidden-input")],Wt.prototype,"hiddenInput",2);c([k()],Wt.prototype,"hasFocus",2);c([p({type:Boolean,reflect:true})],Wt.prototype,"checked",2);c([p()],Wt.prototype,"value",2);c([p({type:Boolean,reflect:true})],Wt.prototype,"disabled",2);c([p({reflect:true})],Wt.prototype,"size",2);c([p({type:Boolean,reflect:true})],Wt.prototype,"pill",2);c([A("disabled",{waitUntilFirstUpdate:true})],Wt.prototype,"handleDisabledChange",1);Wt.define("sl-radio-button");exports.AutoFieldRadioButton=class no extends I{getInitialOptions(){return {valueKey:"value"}}renderRadioItem(r){let t=r[this.options.valueKey];return h`<sl-radio-button value="${t}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${r.label}</sl-radio-button>`}renderInput(){let r=this.getOptionValue("select",[]).map((t,o)=>{let i={};return typeof t=="object"?Object.assign(i,t):Object.assign(i,{label:t,value:o+1}),i});return h`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${r.map(t=>this.renderRadioItem(t))}
            </sl-radio-group>
        `}};exports.AutoFieldRadioButton.styles=[I.styles,y`
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
        `],exports.AutoFieldRadioButton=v([T("auto-field-radio-button")],exports.AutoFieldRadioButton);exports.AutoFieldNumber=class ii extends exports.AutoFieldInput{getInputType(){return "number"}};exports.AutoFieldNumber=v([T("auto-field-number")],exports.AutoFieldNumber);exports.AutoFieldDate=class si extends exports.AutoFieldInput{getInputType(){return "date"}getInitialOptions(){return {icon:"date"}}};exports.AutoFieldDate=v([T("auto-field-date")],exports.AutoFieldDate);exports.AutoFieldTime=class ni extends exports.AutoFieldInput{getInputType(){return "time"}getInitialOptions(){return {icon:"time"}}};exports.AutoFieldTime=v([T("auto-field-time")],exports.AutoFieldTime);exports.AutoFieldDateTime=class ai extends exports.AutoFieldInput{getInputType(){return "datetime-local"}getInitialOptions(){return {icon:"datetime"}}};exports.AutoFieldDateTime=v([T("auto-field-datetime")],exports.AutoFieldDateTime);exports.AutoFieldEmail=class li extends exports.AutoFieldInput{getInputType(){return "email"}getInitialOptions(){return {icon:"email"}}connectedCallback(){super.connectedCallback();let r=this.context.store.schemas.getValidator(this.path);(!r||typeof r.validate!="function")&&this.context.store.schemas.addValidator(this.path,{validate:t=>this._isEmail(t),message:"\u65E0\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740",onFail:"throw-pass"});}_isEmail(r){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(r)}};exports.AutoFieldEmail=v([T("auto-field-email")],exports.AutoFieldEmail);exports.AutoFieldPassword=class ci extends exports.AutoFieldInput{getInputType(){return "password"}getInitialOptions(){return {icon:"lock"}}};exports.AutoFieldPassword=v([T("auto-field-password")],exports.AutoFieldPassword);exports.AutoFieldUrl=class pi extends exports.AutoFieldInput{getInputType(){return "url"}getFieldOptions(){return this.schema?.icon||(this.schema.icon="globe"),super.getFieldOptions()}};exports.AutoFieldUrl=v([T("auto-field-url")],exports.AutoFieldUrl);exports.AutoFieldPhone=class di extends exports.AutoFieldInput{getInputType(){return "tel"}getInitialOptions(){return {icon:"phone"}}};exports.AutoFieldPhone=v([T("auto-field-phone")],exports.AutoFieldPhone);var ui=class{constructor(r,t){this.options={selector:"img",overlayColor:"#000",overlayOpacity:.8,animationDuration:300};this.overlay=null;this.previewImage=null;this.originalImage=null;this.clickHandler=null;this.resizeHandler=null;this.keydownHandler=null;this.isPreviewActive=false;this.host=r,this.options={...this.options,...t},r.addController(this),this.clickHandler=this.handleImageClick.bind(this),this.resizeHandler=this.handleResize.bind(this),this.keydownHandler=this.handleKeydown.bind(this);}hostConnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.addEventListener("click",this.clickHandler);}hostDisconnected(){this.clickHandler&&this.host.shadowRoot&&this.host.shadowRoot.removeEventListener("click",this.clickHandler),this.removePreview();}handleImageClick(r){let t=r.target;if(this.isPreviewActive){this.closePreview();return}t.matches(this.options.selector)&&(r.preventDefault(),r.stopPropagation(),this.originalImage=t,this.showPreview(this.originalImage));}showPreview(r){this.isPreviewActive&&this.removePreview(),this.overlay=document.createElement("div"),this.overlay.style.position="fixed",this.overlay.style.top="0",this.overlay.style.left="0",this.overlay.style.width="100%",this.overlay.style.height="100%";let t=this.options.overlayColor,o=this.hexToRgb(t);this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, 0)`,this.overlay.style.transition=`background-color ${this.options.animationDuration}ms ease`,this.overlay.style.zIndex="9999",this.overlay.style.display="flex",this.overlay.style.alignItems="center",this.overlay.style.justifyContent="center",this.overlay.style.cursor="pointer",this.previewImage=document.createElement("img"),this.previewImage.src=r.src,this.previewImage.alt=r.alt,this.previewImage.style.maxWidth="90%",this.previewImage.style.maxHeight="90%",this.previewImage.style.objectFit="contain",this.previewImage.style.cursor="pointer",this.previewImage.style.boxShadow="0 5px 15px rgba(0,0,0,0.3)",this.previewImage.style.transition=`all ${this.options.animationDuration}ms ease-out`;let i=r.getBoundingClientRect();this.previewImage.style.position="absolute",this.previewImage.style.top=`${i.top}px`,this.previewImage.style.left=`${i.left}px`,this.previewImage.style.width=`${i.width}px`,this.previewImage.style.height=`${i.height}px`,this.previewImage.style.transform="none",this.overlay.appendChild(this.previewImage),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",this.closePreview.bind(this)),this.previewImage.addEventListener("click",this.closePreview.bind(this)),this.overlay.offsetWidth,this.overlay.style.backgroundColor=`rgba(${o.r}, ${o.g}, ${o.b}, ${this.options.overlayOpacity})`;let s=window.innerWidth,n=window.innerHeight,{width:a,height:l}=this.calculateAspectRatioFit(r.naturalWidth,r.naturalHeight,s*.9,n*.9),d=(n-l)/2,m=(s-a)/2;requestAnimationFrame(()=>{this.previewImage.style.top=`${d}px`,this.previewImage.style.left=`${m}px`,this.previewImage.style.width=`${a}px`,this.previewImage.style.height=`${l}px`;}),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.isPreviewActive=true;}handleResize(){if(!this.isPreviewActive||!this.previewImage||!this.originalImage)return;let r=window.innerWidth,t=window.innerHeight,{width:o,height:i}=this.calculateAspectRatioFit(this.originalImage.naturalWidth,this.originalImage.naturalHeight,r*.9,t*.9),s=(t-i)/2,n=(r-o)/2;requestAnimationFrame(()=>{this.previewImage&&(this.previewImage.style.top=`${s}px`,this.previewImage.style.left=`${n}px`,this.previewImage.style.width=`${o}px`,this.previewImage.style.height=`${i}px`);});}handleKeydown(r){r.key==="Escape"&&this.isPreviewActive&&this.closePreview();}closePreview(){if(!this.overlay||!this.previewImage||!this.originalImage)return;let r=this.originalImage.getBoundingClientRect();requestAnimationFrame(()=>{this.previewImage.style.top=`${r.top}px`,this.previewImage.style.left=`${r.left}px`,this.previewImage.style.width=`${r.width}px`,this.previewImage.style.height=`${r.height}px`;});let t=this.hexToRgb(this.options.overlayColor);this.overlay.style.backgroundColor=`rgba(${t.r}, ${t.g}, ${t.b}, 0)`,setTimeout(()=>{this.removePreview();},this.options.animationDuration),this.isPreviewActive=false;}calculateAspectRatioFit(r,t,o,i){if(r<=o&&t<=i)return {width:r,height:t};let s=Math.min(o/r,i/t);return {width:r*s,height:t*s}}hexToRgb(r){r=r.replace(/^#/,""),r.length===3&&(r=r.split("").map(s=>s+s).join(""));let t=parseInt(r.substring(0,2),16),o=parseInt(r.substring(2,4),16),i=parseInt(r.substring(4,6),16);return {r:isNaN(t)?0:t,g:isNaN(o)?0:o,b:isNaN(i)?0:i}}removePreview(){this.overlay&&document.body.contains(this.overlay)&&document.body.removeChild(this.overlay),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.overlay=null,this.previewImage=null,this.originalImage=null;}};var fs=class{constructor(r,t){for(this.options=Object.assign({width:"8px"},t),this.target=r,this.content=r.firstElementChild,this.direction=window.getComputedStyle(this.target).direction,this.scrollRatio=1,this.bar=null,this.wrapper=document.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=document.createElement("div"),this.el.setAttribute("class","ss-content"),this.direction==="rtl"&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",'<div class="ss-scroll">'),this.bar=this.target.lastChild,this.bar.style.width=this.options.width,this.mB=this.moveBar.bind(this),this.dragDealer(this.bar),this.moveBar(),window.addEventListener("resize",this.mB),this.el.addEventListener("scroll",this.mB),this.el.addEventListener("mouseenter",this.mB),this.target.classList.add("ss-container");let o=window.getComputedStyle(r);o.height==="0px"&&o["max-height"]!=="0px"&&(r.style.height=o["max-height"]);}dragDealer(r){let t,o=n=>{let a=n.pageY-t;t=n.pageY,this.requestAnimationFrame(()=>{this.el&&(this.el.scrollTop+=a/this.scrollRatio);});},i=()=>{r.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",i);},s=n=>(t=n.pageY,r.classList.add("ss-grabbed"),document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i),false);r.mouseDownHandler=s,r.addEventListener("mousedown",s);}requestAnimationFrame(r){window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,0);}moveBar(){if(!this.el||!this.target)return;let r=this.el.scrollHeight,t=this.el.clientHeight;this.scrollRatio=t/r;let i=this.direction==="rtl"&&this.bar?this.target.clientWidth-this.bar.clientWidth+18:this.bar?(this.target.clientWidth-this.bar.clientWidth)*-1:0;this.requestAnimationFrame(()=>{this.scrollRatio>=1?this.bar?.classList.add("ss-hidden"):(this.bar?.classList.remove("ss-hidden"),this.bar&&(this.bar.style.cssText="height:"+Math.max(this.scrollRatio*100,10)+"%; top:"+this.el.scrollTop/r*100+"%;right:"+i+"px;"));});}destroy(){if(window.removeEventListener("resize",this.mB),this.el&&(this.el.removeEventListener("scroll",this.mB),this.el.removeEventListener("mouseenter",this.mB)),this.bar?.mouseDownHandler&&(this.bar.removeEventListener("mousedown",this.bar.mouseDownHandler),delete this.bar.mouseDownHandler),this.target){this.target.classList.remove("ss-container");try{this.content&&this.wrapper&&this.target.insertBefore(this.content,this.wrapper),this.wrapper&&this.target.removeChild(this.wrapper);}catch(r){console.error("Error restoring DOM structure during scrollbar destroy:",r);}if(this.bar){try{this.target.removeChild(this.bar);}catch(r){console.error("Error removing scrollbar during destroy:",r);}this.bar=null;}}this.target=null,this.content=null,this.wrapper=null,this.el=null,this.mB=null;}},Qe=class{constructor(r){this._scrollbars=[];this.host=r,r.addController(this);}static{this.styles=y`
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
    `;}create(r,t){let o=new fs(r,t);return this._scrollbars.push(o),o}hostConnected(){}hostUpdate(){}hostDisconnected(){for(let r of this._scrollbars)r.destroy();this._scrollbars=[];}};var mp=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],fp=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function gp(e){if(!e||typeof e!="string")return  false;let o=e.split("?")[0].split("/").pop().split(".").pop();return mp.includes(`.${o}`)}function bp(e){if(!e||typeof e!="string")return  false;let o=e.split("?")[0].split("/").pop().split(".").pop();return fp.includes(`.${o}`)}exports.AutoFieldUpload=class $r extends I{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new ui(this);}retryUpload(t){this.startUpload(t.file,t.id);}getInitialOptions(){return {fileTypes:[],url:"",multiple:true,fileFieldName:"files",preview:true,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:true}}_getDefaultFileLabel(t){return typeof t=="string"?t:t.title||t.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(t=>t!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef);}firstUpdated(){this._createUploadInput();}handleFileInputChange(t){let o=t.target;if(!o.files||o.files.length===0)return;Array.from(o.files).forEach(s=>this.uploadFile(s)),o.value="";}handleDragOver(t){t.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover");}handleDragLeave(t){t.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover");}handleDrop(t){if(t.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!t.dataTransfer?.files)return;let i=Array.from(t.dataTransfer.files);if(!this.options?.multiple&&i.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let s=i.filter(n=>this.options?.fileTypes?!this.options.fileTypes.some(a=>a==="*"?true:a.startsWith(".")?n.name.toLowerCase().endsWith(a.toLowerCase()):n.type.startsWith(a)):false);if(s.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${s.map(n=>n.name).join(", ")}`);return}}i.forEach(s=>this.uploadFile(s));}handleUploadClick(){this.fileInputRef?.click();}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(t){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let o={id:this.generateId(),file:t,progress:0,status:"uploading",value:{url:t.name}};return this.files.push(o),this.startUpload(t,o.id)}_updateFileRecord(t,o){let i=this.files.findIndex(s=>s.id===t);i!==-1&&(this.files=[...this.files.slice(0,i),{...this.files[i],...o},...this.files.slice(i+1)]);}_getResponseError(t){let o="\u4E0A\u4F20\u5931\u8D25";try{let i=JSON.parse(t.responseText);o=i.message||i.error||o;}catch{switch(t.status){case 400:o="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:o="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:o="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:o="\u6587\u4EF6\u592A\u5927";break;case 415:o="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:o="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:o="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:o=`\u4E0A\u4F20\u5931\u8D25 (${t.status})`;}}return new Error(o)}_defaultFileResolver(t){if(typeof t=="string")return t;if(typeof t=="object"){if(!t.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return t}}_parseUploadResponse(t){let o={};try{Object.assign(o,JSON.parse(t));}catch{o=t;}return typeof this.options.onResolve=="function"&&(o=this.options.onResolve(o)),o}async startUpload(t,o){let i=this.files.findIndex(n=>n.id===o);if(i===-1)return;let s=this.files[i];return new Promise((n,a)=>{let l=new XMLHttpRequest,d=new FormData;d.append(this.options.fileFieldName,t),l.upload.onprogress=m=>{if(m.lengthComputable){let u=Math.round(m.loaded/m.total*100);this._updateFileRecord(o,{progress:u});}},l.onload=()=>{if(this.files.findIndex(u=>u.id===o)!==-1)if(l.status>=200&&l.status<300){this._updateFileRecord(o,{status:"done"});try{let u=this._parseUploadResponse(l.responseText);this._updateFileRecord(o,{value:u}),s.status="done",this.onFieldChange(),n();}catch{let u=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(o,u),a(u);}}else {let u=this._getResponseError(l);this.handleUploadError(o,u),a(u);}},l.onerror=()=>{if(this.files.findIndex(f=>f.id===o)===-1)return;let u=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(o,u),a(u);},l.ontimeout=()=>{if(this.files.findIndex(f=>f.id===o)===-1)return;let u=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(o,u),a(u);},l.open("POST",this.options.url),this._updateFileRecord(o,{progress:0,status:"uploading"}),l.send(d);})}handleUploadError(t,o){this._updateFileRecord(t,{error:o.message,status:"error"});}deleteFile(t){let o=this.files.findIndex(a=>a.id===t);if(o===-1)return;let i=this.files[o],s=i.status==="uploading"||i.status==="error",n=()=>{this.files=[...this.files.slice(0,o),...this.files.slice(o+1)];};s?n():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,i.value)).then(()=>{n(),this.onFieldChange();}).catch(a=>{alert(a.message);}):(n(),this.onFieldChange());}getInputValue(){if(this.options.multiple){let t=this.files.map(o=>o.value);return this.options.onlyFileUrl?t.map(o=>typeof o=="object"?o.url:o):t}else {let t=this.files.length>0?this.files[0].value:void 0;if(t)return this.options.onlyFileUrl&&typeof t=="object"?t.url:t}}getStateValue(){let t=super.getStateValue();return Array.isArray(t)||(t=[t]),this.files=t.map((o,i)=>{let s={id:String(i),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof o=="string"?s.value=o:typeof o=="object"&&(s.value=Object.assign({},s.value,o)),s}),t}renderProgressbar(t,o){if(t.status!=="uploading")return;let i=o==="hori"?`width:${t.progress}%;`:`height:${t.progress}%;top:${100-t.progress}%`;return h`<span
            class="uploading progressbar ${L({hori:o==="hori",vert:o==="vert"})}"
            style="${i}"
        >
            <span class="value">${t.progress}%</span>
        </span> `}renderFileContent(t){if(t.error)return;let o=typeof t.value=="string"?t.value:t.value.url,i;if(gp(o))i=h` <img class="content" src="${o}" /> `;else if(bp(o))i=h` <video class="content" src="${o}"></video> `;else {let s=o.split("?")[0].split(".").slice(-1)[0];s=s.length===0?"FILE":`.${s.toUpperCase()}`,i=h`<div class="content">${s}</div>`;}return i}renderFilePreview(t){let o=!!t.error,i=typeof this.options.preview=="boolean"?"80px":this.options.preview;return h`
            <div
                class="file preview ${L({error:o})}"
                title=${t.error||this.options.onFileLabel(t.value)}
                style="${Z({width:i,height:i})}"
            >
                ${this.renderFileContent(t)} ${this.renderProgressbar(t,"vert")}
                ${B(t.status==="error",()=>h`<div class="error" title="${t.error}">
                            <span>上传出错</span>
                            <span>
                                <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(t.id)}></sl-icon>
                                <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(t)}></sl-icon>
                            </span>
                        </div>`,()=>{if(!this.context.viewonly)return h`<sl-icon name="remove" @click=${()=>this.deleteFile(t.id)}></sl-icon>`})}
            </div>
        `}renderFile(t){let o=!!t.error;return h`
            <auto-flex class="file default ${L({error:o})}" wrap align="center" gap="0.5rem" title=${w(t.error)}>
                ${this.renderProgressbar(t,"hori")}
                <span class="label">${this.options.onFileLabel(t.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(t.id)}></sl-icon>
                ${B(t.status==="error",()=>h`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(t)}></sl-icon>`)}
            </auto-flex>
        `}renderFiels(){return h`<auto-flex class="files" grow="none" gap="0.5rem" wrap>
            ${B(this.files.length>0,()=>et(this.files,t=>this.options.preview?this.renderFilePreview(t):this.renderFile(t)),()=>h`<span class="placeholder">${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </auto-flex>`}renderInput(){return h`
            <auto-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${B(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>h`<div
                        class="indicator"
                        @click=${this.handleUploadClick}
                        @dragover=${this.handleDragOver}
                        @dragleave=${this.handleDragLeave}
                        @drop=${this.handleDrop}
                    >
                        ${this.options.tips}
                    </div>`)}
                <auto-flex class="actions" align="center" grow=".actions.after" gap="0.5rem">
                    ${B(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>h`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}
                    ${this.renderActions(false)}
                </auto-flex>
            </auto-flex>
        `}renderView(){return this.renderFiels()}};exports.AutoFieldUpload.styles=[I.styles,y`
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
        `],v([k()],exports.AutoFieldUpload.prototype,"files",2),exports.AutoFieldUpload=v([T("auto-field-upload")],exports.AutoFieldUpload);exports.AutoFieldSearch=class hi extends exports.AutoFieldInput{getInputType(){return "search"}getInitialOptions(){return {icon:"search",placeholder:"Search"}}};exports.AutoFieldSearch=v([T("auto-field-search")],exports.AutoFieldSearch);exports.AutoFieldIpAddress=class ao extends I{getInitialOptions(){return {size:"medium"}}_onPartFocus(r){r.target.select();}_getIpBits(){let r=this.value?.split(".");return [parseInt(r[0]||"0"),parseInt(r[1]||"0"),parseInt(r[2]||"0"),parseInt(r[3]||"0")]}_onIpChange(r,t){this.onFieldChange(),this._isLastInput(t);}getInputValue(){return Array.from(this.shadow.querySelectorAll("sl-input")).map(t=>t.value).join(".")}_isLastInput(r){let t=r.target;if(t.value.length>=3){t.blur();let o=t.nextElementSibling?.nextElementSibling;o&&(o.focus(),o.select());}}_onPaste(r){r.preventDefault();let t=r.target,o=r.clipboardData?.getData("text/plain")||"",i=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=o.match(i);if(!s)return;let n=[],a=t;for(let l=0;l<4&&a;l++)a.tagName==="SL-INPUT"&&n.push(a),a=a.nextElementSibling?.nextElementSibling;for(let l=0;l<Math.min(4,n.length);l++)n[l].value=s[l+1],n[l].dispatchEvent(new Event("input",{bubbles:true}));if(n.length>0){let l=n[Math.min(3,n.length-1)];l.focus(),l.select();}}renderInput(){return h`
            <auto-flex flex="row" size="small" no-padding grow="none">
                ${this._getIpBits().map((r,t)=>h`
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
                            @sl-input=${o=>this._onIpChange(t,o)}
                            @sl-change=${o=>this._onIpChange(t,o)}
                            @sl-focus=${this._onPartFocus.bind(this)}
                            @paste=${o=>this._onPaste(o)}
                        ></sl-input>
                        ${t<3?h`<span class="dot">.</span>`:""}
                    `)}
            </auto-flex>
        `}};exports.AutoFieldIpAddress.styles=[I.styles,y`
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
        `],exports.AutoFieldIpAddress=v([T("auto-field-ipaddress")],exports.AutoFieldIpAddress);var ba=y`
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
`;var va=y`
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
`;var ut=class extends M{constructor(){super(...arguments),this.hasFocus=false,this.label="",this.disabled=false;}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}click(){this.button.click();}focus(e){this.button.focus(e);}blur(){this.button.blur();}render(){let e=!!this.href,r=e?kr`a`:kr`button`;return Me`
      <${r}
        part="base"
        class=${L({"icon-button":true,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${w(e?void 0:this.disabled)}
        type=${w(e?void 0:"button")}
        href=${w(e?this.href:void 0)}
        target=${w(e?this.target:void 0)}
        download=${w(e?this.download:void 0)}
        rel=${w(e&&this.target?"noreferrer noopener":void 0)}
        role=${w(e?void 0:"button")}
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
    `}};ut.styles=[z,va];ut.dependencies={"sl-icon":q};c([$(".icon-button")],ut.prototype,"button",2);c([k()],ut.prototype,"hasFocus",2);c([p()],ut.prototype,"name",2);c([p()],ut.prototype,"library",2);c([p()],ut.prototype,"src",2);c([p()],ut.prototype,"href",2);c([p()],ut.prototype,"target",2);c([p()],ut.prototype,"download",2);c([p()],ut.prototype,"label",2);c([p({type:Boolean,reflect:true})],ut.prototype,"disabled",2);var gs=new Set,Er=new Map,Ze,bs="ltr",vs="en",ya=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(ya){let e=new MutationObserver(xa);bs=document.documentElement.dir||"ltr",vs=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:true,attributeFilter:["dir","lang"]});}function lo(...e){e.map(r=>{let t=r.$code.toLowerCase();Er.has(t)?Er.set(t,Object.assign(Object.assign({},Er.get(t)),r)):Er.set(t,r),Ze||(Ze=r);}),xa();}function xa(){ya&&(bs=document.documentElement.dir||"ltr",vs=document.documentElement.lang||navigator.language),[...gs.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate();});}var mi=class{constructor(r){this.host=r,this.host.addController(this);}hostConnected(){gs.add(this.host);}hostDisconnected(){gs.delete(this.host);}dir(){return `${this.host.dir||bs}`.toLowerCase()}lang(){return `${this.host.lang||vs}`.toLowerCase()}getTranslationData(r){var t,o;let i=new Intl.Locale(r.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(o=(t=i?.region)===null||t===void 0?void 0:t.toLowerCase())!==null&&o!==void 0?o:"",a=Er.get(`${s}-${n}`),l=Er.get(s);return {locale:i,language:s,region:n,primary:a,secondary:l}}exists(r,t){var o;let{primary:i,secondary:s}=this.getTranslationData((o=t.lang)!==null&&o!==void 0?o:this.lang());return t=Object.assign({includeFallback:false},t),!!(i&&i[r]||s&&s[r]||t.includeFallback&&Ze&&Ze[r])}term(r,...t){let{primary:o,secondary:i}=this.getTranslationData(this.lang()),s;if(o&&o[r])s=o[r];else if(i&&i[r])s=i[r];else if(Ze&&Ze[r])s=Ze[r];else return console.error(`No translation found for: ${String(r)}`),String(r);return typeof s=="function"?s(...t):s}date(r,t){return r=new Date(r),new Intl.DateTimeFormat(this.lang(),t).format(r)}number(r,t){return r=Number(r),isNaN(r)?"":new Intl.NumberFormat(this.lang(),t).format(r)}relativeTime(r,t,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(r,t)}};var _a={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,r)=>`Go to slide ${e} of ${r}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};lo(_a);var wa=_a;var j=class extends mi{};lo(wa);var de=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.variant="neutral",this.size="medium",this.pill=false,this.removable=false;}handleRemoveClick(){this.emit("sl-remove");}render(){return h`
      <span
        part="base"
        class=${L({tag:true,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?h`
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
    `}};de.styles=[z,ba];de.dependencies={"sl-icon-button":ut};c([p({reflect:true})],de.prototype,"variant",2);c([p({reflect:true})],de.prototype,"size",2);c([p({type:Boolean,reflect:true})],de.prototype,"pill",2);c([p({type:Boolean})],de.prototype,"removable",2);var Ca=y`
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
`;function vp(e,r){return {top:Math.round(e.getBoundingClientRect().top-r.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-r.getBoundingClientRect().left)}}function co(e,r,t="vertical",o="smooth"){let i=vp(e,r),s=i.top+r.scrollTop,n=i.left+r.scrollLeft,a=r.scrollLeft,l=r.scrollLeft+r.offsetWidth,d=r.scrollTop,m=r.scrollTop+r.offsetHeight;(t==="horizontal"||t==="both")&&(n<a?r.scrollTo({left:n,behavior:o}):n+e.clientWidth>l&&r.scrollTo({left:n-r.offsetWidth+e.clientWidth,behavior:o})),(t==="vertical"||t==="both")&&(s<d?r.scrollTo({top:s,behavior:o}):s+e.clientHeight>m&&r.scrollTo({top:s-r.offsetHeight+e.clientHeight,behavior:o}));}var Sa=y`
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
`;var ue=Math.min,Et=Math.max,uo=Math.round,ho=Math.floor,se=e=>({x:e,y:e}),yp={left:"right",right:"left",bottom:"top",top:"bottom"},xp={start:"end",end:"start"};function gi(e,r,t){return Et(e,ue(r,t))}function tr(e,r){return typeof e=="function"?e(r):e}function xe(e){return e.split("-")[0]}function er(e){return e.split("-")[1]}function ys(e){return e==="x"?"y":"x"}function bi(e){return e==="y"?"height":"width"}var _p=new Set(["top","bottom"]);function he(e){return _p.has(xe(e))?"y":"x"}function vi(e){return ys(he(e))}function Ea(e,r,t){t===void 0&&(t=false);let o=er(e),i=vi(e),s=bi(i),n=i==="x"?o===(t?"end":"start")?"right":"left":o==="start"?"bottom":"top";return r.reference[s]>r.floating[s]&&(n=po(n)),[n,po(n)]}function Aa(e){let r=po(e);return [fi(e),r,fi(r)]}function fi(e){return e.replace(/start|end/g,r=>xp[r])}var ka=["left","right"],$a=["right","left"],wp=["top","bottom"],Cp=["bottom","top"];function Sp(e,r,t){switch(e){case "top":case "bottom":return t?r?$a:ka:r?ka:$a;case "left":case "right":return r?wp:Cp;default:return []}}function Oa(e,r,t,o){let i=er(e),s=Sp(xe(e),t==="start",o);return i&&(s=s.map(n=>n+"-"+i),r&&(s=s.concat(s.map(fi)))),s}function po(e){return e.replace(/left|right|bottom|top/g,r=>yp[r])}function kp(e){return {top:0,right:0,bottom:0,left:0,...e}}function xs(e){return typeof e!="number"?kp(e):{top:e,right:e,bottom:e,left:e}}function rr(e){let{x:r,y:t,width:o,height:i}=e;return {width:o,height:i,top:t,left:r,right:r+o,bottom:t+i,x:r,y:t}}function Ta(e,r,t){let{reference:o,floating:i}=e,s=he(r),n=vi(r),a=bi(n),l=xe(r),d=s==="y",m=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,f=o[a]/2-i[a]/2,g;switch(l){case "top":g={x:m,y:o.y-i.height};break;case "bottom":g={x:m,y:o.y+o.height};break;case "right":g={x:o.x+o.width,y:u};break;case "left":g={x:o.x-i.width,y:u};break;default:g={x:o.x,y:o.y};}switch(er(r)){case "start":g[n]-=f*(t&&d?-1:1);break;case "end":g[n]+=f*(t&&d?-1:1);break}return g}var Ra=async(e,r,t)=>{let{placement:o="bottom",strategy:i="absolute",middleware:s=[],platform:n}=t,a=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(r)),d=await n.getElementRects({reference:e,floating:r,strategy:i}),{x:m,y:u}=Ta(d,o,l),f=o,g={},b=0;for(let x=0;x<a.length;x++){let{name:R,fn:E}=a[x],{x:C,y:O,data:_,reset:S}=await E({x:m,y:u,initialPlacement:o,placement:f,strategy:i,middlewareData:g,rects:d,platform:n,elements:{reference:e,floating:r}});m=C??m,u=O??u,g={...g,[R]:{...g[R],..._}},S&&b<=50&&(b++,typeof S=="object"&&(S.placement&&(f=S.placement),S.rects&&(d=S.rects===true?await n.getElementRects({reference:e,floating:r,strategy:i}):S.rects),{x:m,y:u}=Ta(d,f,l)),x=-1);}return {x:m,y:u,placement:f,strategy:i,middlewareData:g}};async function yi(e,r){var t;r===void 0&&(r={});let{x:o,y:i,platform:s,rects:n,elements:a,strategy:l}=e,{boundary:d="clippingAncestors",rootBoundary:m="viewport",elementContext:u="floating",altBoundary:f=false,padding:g=0}=tr(r,e),b=xs(g),R=a[f?u==="floating"?"reference":"floating":u],E=rr(await s.getClippingRect({element:(t=await(s.isElement==null?void 0:s.isElement(R)))==null||t?R:R.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:d,rootBoundary:m,strategy:l})),C=u==="floating"?{x:o,y:i,width:n.floating.width,height:n.floating.height}:n.reference,O=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),_=await(s.isElement==null?void 0:s.isElement(O))?await(s.getScale==null?void 0:s.getScale(O))||{x:1,y:1}:{x:1,y:1},S=rr(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:C,offsetParent:O,strategy:l}):C);return {top:(E.top-S.top+b.top)/_.y,bottom:(S.bottom-E.bottom+b.bottom)/_.y,left:(E.left-S.left+b.left)/_.x,right:(S.right-E.right+b.right)/_.x}}var Ia=e=>({name:"arrow",options:e,async fn(r){let{x:t,y:o,placement:i,rects:s,platform:n,elements:a,middlewareData:l}=r,{element:d,padding:m=0}=tr(e,r)||{};if(d==null)return {};let u=xs(m),f={x:t,y:o},g=vi(i),b=bi(g),x=await n.getDimensions(d),R=g==="y",E=R?"top":"left",C=R?"bottom":"right",O=R?"clientHeight":"clientWidth",_=s.reference[b]+s.reference[g]-f[g]-s.floating[b],S=f[g]-s.reference[g],P=await(n.getOffsetParent==null?void 0:n.getOffsetParent(d)),H=P?P[O]:0;(!H||!await(n.isElement==null?void 0:n.isElement(P)))&&(H=a.floating[O]||s.floating[b]);let U=_/2-S/2,D=H/2-x[b]/2-1,V=ue(u[E],D),mt=ue(u[C],D),at=V,St=H-x[b]-mt,lt=H/2-x[b]/2+U,jt=gi(at,lt,St),ce=!l.arrow&&er(i)!=null&&lt!==jt&&s.reference[b]/2-(lt<at?V:mt)-x[b]/2<0,re=ce?lt<at?lt-at:lt-St:0;return {[g]:f[g]+re,data:{[g]:jt,centerOffset:lt-jt-re,...ce&&{alignmentOffset:re}},reset:ce}}});var La=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(r){var t,o;let{placement:i,middlewareData:s,rects:n,initialPlacement:a,platform:l,elements:d}=r,{mainAxis:m=true,crossAxis:u=true,fallbackPlacements:f,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=true,...R}=tr(e,r);if((t=s.arrow)!=null&&t.alignmentOffset)return {};let E=xe(i),C=he(a),O=xe(a)===a,_=await(l.isRTL==null?void 0:l.isRTL(d.floating)),S=f||(O||!x?[po(a)]:Aa(a)),P=b!=="none";!f&&P&&S.push(...Oa(a,x,b,_));let H=[a,...S],U=await yi(r,R),D=[],V=((o=s.flip)==null?void 0:o.overflows)||[];if(m&&D.push(U[E]),u){let lt=Ea(i,n,_);D.push(U[lt[0]],U[lt[1]]);}if(V=[...V,{placement:i,overflows:D}],!D.every(lt=>lt<=0)){var mt,at;let lt=(((mt=s.flip)==null?void 0:mt.index)||0)+1,jt=H[lt];if(jt&&(!(u==="alignment"?C!==he(jt):false)||V.every(oe=>he(oe.placement)===C?oe.overflows[0]>0:true)))return {data:{index:lt,overflows:V},reset:{placement:jt}};let ce=(at=V.filter(re=>re.overflows[0]<=0).sort((re,oe)=>re.overflows[1]-oe.overflows[1])[0])==null?void 0:at.placement;if(!ce)switch(g){case "bestFit":{var St;let re=(St=V.filter(oe=>{if(P){let ke=he(oe.placement);return ke===C||ke==="y"}return  true}).map(oe=>[oe.placement,oe.overflows.filter(ke=>ke>0).reduce((ke,Sc)=>ke+Sc,0)]).sort((oe,ke)=>oe[1]-ke[1])[0])==null?void 0:St[0];re&&(ce=re);break}case "initialPlacement":ce=a;break}if(i!==ce)return {reset:{placement:ce}}}return {}}}};var $p=new Set(["left","top"]);async function Ep(e,r){let{placement:t,platform:o,elements:i}=e,s=await(o.isRTL==null?void 0:o.isRTL(i.floating)),n=xe(t),a=er(t),l=he(t)==="y",d=$p.has(n)?-1:1,m=s&&l?-1:1,u=tr(r,e),{mainAxis:f,crossAxis:g,alignmentAxis:b}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return a&&typeof b=="number"&&(g=a==="end"?b*-1:b),l?{x:g*m,y:f*d}:{x:f*d,y:g*m}}var Ma=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(r){var t,o;let{x:i,y:s,placement:n,middlewareData:a}=r,l=await Ep(r,e);return n===((t=a.offset)==null?void 0:t.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:i+l.x,y:s+l.y,data:{...l,placement:n}}}}},za=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(r){let{x:t,y:o,placement:i}=r,{mainAxis:s=true,crossAxis:n=false,limiter:a={fn:R=>{let{x:E,y:C}=R;return {x:E,y:C}}},...l}=tr(e,r),d={x:t,y:o},m=await yi(r,l),u=he(xe(i)),f=ys(u),g=d[f],b=d[u];if(s){let R=f==="y"?"top":"left",E=f==="y"?"bottom":"right",C=g+m[R],O=g-m[E];g=gi(C,g,O);}if(n){let R=u==="y"?"top":"left",E=u==="y"?"bottom":"right",C=b+m[R],O=b-m[E];b=gi(C,b,O);}let x=a.fn({...r,[f]:g,[u]:b});return {...x,data:{x:x.x-t,y:x.y-o,enabled:{[f]:s,[u]:n}}}}}};var Va=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(r){var t,o;let{placement:i,rects:s,platform:n,elements:a}=r,{apply:l=()=>{},...d}=tr(e,r),m=await yi(r,d),u=xe(i),f=er(i),g=he(i)==="y",{width:b,height:x}=s.floating,R,E;u==="top"||u==="bottom"?(R=u,E=f===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(E=u,R=f==="end"?"top":"bottom");let C=x-m.top-m.bottom,O=b-m.left-m.right,_=ue(x-m[R],C),S=ue(b-m[E],O),P=!r.middlewareData.shift,H=_,U=S;if((t=r.middlewareData.shift)!=null&&t.enabled.x&&(U=O),(o=r.middlewareData.shift)!=null&&o.enabled.y&&(H=C),P&&!f){let V=Et(m.left,0),mt=Et(m.right,0),at=Et(m.top,0),St=Et(m.bottom,0);g?U=b-2*(V!==0||mt!==0?V+mt:Et(m.left,m.right)):H=x-2*(at!==0||St!==0?at+St:Et(m.top,m.bottom));}await l({...r,availableWidth:U,availableHeight:H});let D=await n.getDimensions(a.floating);return b!==D.width||x!==D.height?{reset:{rects:true}}:{}}}};function xi(){return typeof window<"u"}function or(e){return Da(e)?(e.nodeName||"").toLowerCase():"#document"}function Lt(e){var r;return (e==null||(r=e.ownerDocument)==null?void 0:r.defaultView)||window}function ne(e){var r;return (r=(Da(e)?e.ownerDocument:e.document)||window.document)==null?void 0:r.documentElement}function Da(e){return xi()?e instanceof Node||e instanceof Lt(e).Node:false}function Ut(e){return xi()?e instanceof Element||e instanceof Lt(e).Element:false}function ae(e){return xi()?e instanceof HTMLElement||e instanceof Lt(e).HTMLElement:false}function Pa(e){return !xi()||typeof ShadowRoot>"u"?false:e instanceof ShadowRoot||e instanceof Lt(e).ShadowRoot}var Ap=new Set(["inline","contents"]);function Or(e){let{overflow:r,overflowX:t,overflowY:o,display:i}=qt(e);return /auto|scroll|overlay|hidden|clip/.test(r+o+t)&&!Ap.has(i)}var Op=new Set(["table","td","th"]);function Fa(e){return Op.has(or(e))}var Tp=[":popover-open",":modal"];function mo(e){return Tp.some(r=>{try{return e.matches(r)}catch{return  false}})}var Rp=["transform","translate","scale","rotate","perspective"],Ip=["transform","translate","scale","rotate","perspective","filter"],Lp=["paint","layout","strict","content"];function Tr(e){let r=_i(),t=Ut(e)?qt(e):e;return Rp.some(o=>t[o]?t[o]!=="none":false)||(t.containerType?t.containerType!=="normal":false)||!r&&(t.backdropFilter?t.backdropFilter!=="none":false)||!r&&(t.filter?t.filter!=="none":false)||Ip.some(o=>(t.willChange||"").includes(o))||Lp.some(o=>(t.contain||"").includes(o))}function Ha(e){let r=_e(e);for(;ae(r)&&!ir(r);){if(Tr(r))return r;if(mo(r))return null;r=_e(r);}return null}function _i(){return typeof CSS>"u"||!CSS.supports?false:CSS.supports("-webkit-backdrop-filter","none")}var Mp=new Set(["html","body","#document"]);function ir(e){return Mp.has(or(e))}function qt(e){return Lt(e).getComputedStyle(e)}function fo(e){return Ut(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function _e(e){if(or(e)==="html")return e;let r=e.assignedSlot||e.parentNode||Pa(e)&&e.host||ne(e);return Pa(r)?r.host:r}function Ba(e){let r=_e(e);return ir(r)?e.ownerDocument?e.ownerDocument.body:e.body:ae(r)&&Or(r)?r:Ba(r)}function Ar(e,r,t){var o;r===void 0&&(r=[]),t===void 0&&(t=true);let i=Ba(e),s=i===((o=e.ownerDocument)==null?void 0:o.body),n=Lt(i);if(s){let a=wi(n);return r.concat(n,n.visualViewport||[],Or(i)?i:[],a&&t?Ar(a):[])}return r.concat(i,Ar(i,[],t))}function wi(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Ua(e){let r=qt(e),t=parseFloat(r.width)||0,o=parseFloat(r.height)||0,i=ae(e),s=i?e.offsetWidth:t,n=i?e.offsetHeight:o,a=uo(t)!==s||uo(o)!==n;return a&&(t=s,o=n),{width:t,height:o,$:a}}function ws(e){return Ut(e)?e:e.contextElement}function Rr(e){let r=ws(e);if(!ae(r))return se(1);let t=r.getBoundingClientRect(),{width:o,height:i,$:s}=Ua(r),n=(s?uo(t.width):t.width)/o,a=(s?uo(t.height):t.height)/i;return (!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}var zp=se(0);function qa(e){let r=Lt(e);return !_i()||!r.visualViewport?zp:{x:r.visualViewport.offsetLeft,y:r.visualViewport.offsetTop}}function Vp(e,r,t){return r===void 0&&(r=false),!t||r&&t!==Lt(e)?false:r}function sr(e,r,t,o){r===void 0&&(r=false),t===void 0&&(t=false);let i=e.getBoundingClientRect(),s=ws(e),n=se(1);r&&(o?Ut(o)&&(n=Rr(o)):n=Rr(e));let a=Vp(s,t,o)?qa(s):se(0),l=(i.left+a.x)/n.x,d=(i.top+a.y)/n.y,m=i.width/n.x,u=i.height/n.y;if(s){let f=Lt(s),g=o&&Ut(o)?Lt(o):o,b=f,x=wi(b);for(;x&&o&&g!==b;){let R=Rr(x),E=x.getBoundingClientRect(),C=qt(x),O=E.left+(x.clientLeft+parseFloat(C.paddingLeft))*R.x,_=E.top+(x.clientTop+parseFloat(C.paddingTop))*R.y;l*=R.x,d*=R.y,m*=R.x,u*=R.y,l+=O,d+=_,b=Lt(x),x=wi(b);}}return rr({width:m,height:u,x:l,y:d})}function Ci(e,r){let t=fo(e).scrollLeft;return r?r.left+t:sr(ne(e)).left+t}function Ka(e,r){let t=e.getBoundingClientRect(),o=t.left+r.scrollLeft-Ci(e,t),i=t.top+r.scrollTop;return {x:o,y:i}}function Pp(e){let{elements:r,rect:t,offsetParent:o,strategy:i}=e,s=i==="fixed",n=ne(o),a=r?mo(r.floating):false;if(o===n||a&&s)return t;let l={scrollLeft:0,scrollTop:0},d=se(1),m=se(0),u=ae(o);if((u||!u&&!s)&&((or(o)!=="body"||Or(n))&&(l=fo(o)),ae(o))){let g=sr(o);d=Rr(o),m.x=g.x+o.clientLeft,m.y=g.y+o.clientTop;}let f=n&&!u&&!s?Ka(n,l):se(0);return {width:t.width*d.x,height:t.height*d.y,x:t.x*d.x-l.scrollLeft*d.x+m.x+f.x,y:t.y*d.y-l.scrollTop*d.y+m.y+f.y}}function Dp(e){return Array.from(e.getClientRects())}function Fp(e){let r=ne(e),t=fo(e),o=e.ownerDocument.body,i=Et(r.scrollWidth,r.clientWidth,o.scrollWidth,o.clientWidth),s=Et(r.scrollHeight,r.clientHeight,o.scrollHeight,o.clientHeight),n=-t.scrollLeft+Ci(e),a=-t.scrollTop;return qt(o).direction==="rtl"&&(n+=Et(r.clientWidth,o.clientWidth)-i),{width:i,height:s,x:n,y:a}}var ja=25;function Hp(e,r){let t=Lt(e),o=ne(e),i=t.visualViewport,s=o.clientWidth,n=o.clientHeight,a=0,l=0;if(i){s=i.width,n=i.height;let m=_i();(!m||m&&r==="fixed")&&(a=i.offsetLeft,l=i.offsetTop);}let d=Ci(o);if(d<=0){let m=o.ownerDocument,u=m.body,f=getComputedStyle(u),g=m.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(o.clientWidth-u.clientWidth-g);b<=ja&&(s-=b);}else d<=ja&&(s+=d);return {width:s,height:n,x:a,y:l}}var Bp=new Set(["absolute","fixed"]);function jp(e,r){let t=sr(e,true,r==="fixed"),o=t.top+e.clientTop,i=t.left+e.clientLeft,s=ae(e)?Rr(e):se(1),n=e.clientWidth*s.x,a=e.clientHeight*s.y,l=i*s.x,d=o*s.y;return {width:n,height:a,x:l,y:d}}function Na(e,r,t){let o;if(r==="viewport")o=Hp(e,t);else if(r==="document")o=Fp(ne(e));else if(Ut(r))o=jp(r,t);else {let i=qa(e);o={x:r.x-i.x,y:r.y-i.y,width:r.width,height:r.height};}return rr(o)}function Ga(e,r){let t=_e(e);return t===r||!Ut(t)||ir(t)?false:qt(t).position==="fixed"||Ga(t,r)}function Np(e,r){let t=r.get(e);if(t)return t;let o=Ar(e,[],false).filter(a=>Ut(a)&&or(a)!=="body"),i=null,s=qt(e).position==="fixed",n=s?_e(e):e;for(;Ut(n)&&!ir(n);){let a=qt(n),l=Tr(n);!l&&a.position==="fixed"&&(i=null),(s?!l&&!i:!l&&a.position==="static"&&!!i&&Bp.has(i.position)||Or(n)&&!l&&Ga(e,n))?o=o.filter(m=>m!==n):i=a,n=_e(n);}return r.set(e,o),o}function Wp(e){let{element:r,boundary:t,rootBoundary:o,strategy:i}=e,n=[...t==="clippingAncestors"?mo(r)?[]:Np(r,this._c):[].concat(t),o],a=n[0],l=n.reduce((d,m)=>{let u=Na(r,m,i);return d.top=Et(u.top,d.top),d.right=ue(u.right,d.right),d.bottom=ue(u.bottom,d.bottom),d.left=Et(u.left,d.left),d},Na(r,a,i));return {width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Up(e){let{width:r,height:t}=Ua(e);return {width:r,height:t}}function qp(e,r,t){let o=ae(r),i=ne(r),s=t==="fixed",n=sr(e,true,s,r),a={scrollLeft:0,scrollTop:0},l=se(0);function d(){l.x=Ci(i);}if(o||!o&&!s)if((or(r)!=="body"||Or(i))&&(a=fo(r)),o){let g=sr(r,true,s,r);l.x=g.x+r.clientLeft,l.y=g.y+r.clientTop;}else i&&d();s&&!o&&i&&d();let m=i&&!o&&!s?Ka(i,a):se(0),u=n.left+a.scrollLeft-l.x-m.x,f=n.top+a.scrollTop-l.y-m.y;return {x:u,y:f,width:n.width,height:n.height}}function _s(e){return qt(e).position==="static"}function Wa(e,r){if(!ae(e)||qt(e).position==="fixed")return null;if(r)return r(e);let t=e.offsetParent;return ne(e)===t&&(t=t.ownerDocument.body),t}function Ya(e,r){let t=Lt(e);if(mo(e))return t;if(!ae(e)){let i=_e(e);for(;i&&!ir(i);){if(Ut(i)&&!_s(i))return i;i=_e(i);}return t}let o=Wa(e,r);for(;o&&Fa(o)&&_s(o);)o=Wa(o,r);return o&&ir(o)&&_s(o)&&!Tr(o)?t:o||Ha(e)||t}var Kp=async function(e){let r=this.getOffsetParent||Ya,t=this.getDimensions,o=await t(e.floating);return {reference:qp(e.reference,await r(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Gp(e){return qt(e).direction==="rtl"}var go={convertOffsetParentRelativeRectToViewportRelativeRect:Pp,getDocumentElement:ne,getClippingRect:Wp,getOffsetParent:Ya,getElementRects:Kp,getClientRects:Dp,getDimensions:Up,getScale:Rr,isElement:Ut,isRTL:Gp};function Xa(e,r){return e.x===r.x&&e.y===r.y&&e.width===r.width&&e.height===r.height}function Yp(e,r){let t=null,o,i=ne(e);function s(){var a;clearTimeout(o),(a=t)==null||a.disconnect(),t=null;}function n(a,l){a===void 0&&(a=false),l===void 0&&(l=1),s();let d=e.getBoundingClientRect(),{left:m,top:u,width:f,height:g}=d;if(a||r(),!f||!g)return;let b=ho(u),x=ho(i.clientWidth-(m+f)),R=ho(i.clientHeight-(u+g)),E=ho(m),O={rootMargin:-b+"px "+-x+"px "+-R+"px "+-E+"px",threshold:Et(0,ue(1,l))||1},_=true;function S(P){let H=P[0].intersectionRatio;if(H!==l){if(!_)return n();H?n(false,H):o=setTimeout(()=>{n(false,1e-7);},1e3);}H===1&&!Xa(d,e.getBoundingClientRect())&&n(),_=false;}try{t=new IntersectionObserver(S,{...O,root:i.ownerDocument});}catch{t=new IntersectionObserver(S,O);}t.observe(e);}return n(true),s}function Ja(e,r,t,o){o===void 0&&(o={});let{ancestorScroll:i=true,ancestorResize:s=true,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=false}=o,d=ws(e),m=i||s?[...d?Ar(d):[],...Ar(r)]:[];m.forEach(E=>{i&&E.addEventListener("scroll",t,{passive:true}),s&&E.addEventListener("resize",t);});let u=d&&a?Yp(d,t):null,f=-1,g=null;n&&(g=new ResizeObserver(E=>{let[C]=E;C&&C.target===d&&g&&(g.unobserve(r),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var O;(O=g)==null||O.observe(r);})),t();}),d&&!l&&g.observe(d),g.observe(r));let b,x=l?sr(e):null;l&&R();function R(){let E=sr(e);x&&!Xa(x,E)&&t(),x=E,b=requestAnimationFrame(R);}return t(),()=>{var E;m.forEach(C=>{i&&C.removeEventListener("scroll",t),s&&C.removeEventListener("resize",t);}),u?.(),(E=g)==null||E.disconnect(),g=null,l&&cancelAnimationFrame(b);}}var Qa=Ma;var Za=za,tl=La,Cs=Va;var el=Ia;var rl=(e,r,t)=>{let o=new Map,i={platform:go,...t},s={...i.platform,_c:o};return Ra(e,r,{...i,platform:s})};function ol(e){return Xp(e)}function Ss(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Xp(e){for(let r=e;r;r=Ss(r))if(r instanceof Element&&getComputedStyle(r).display==="none")return null;for(let r=Ss(e);r;r=Ss(r)){if(!(r instanceof Element))continue;let t=getComputedStyle(r);if(t.display!=="contents"&&(t.position!=="static"||Tr(t)||r.tagName==="BODY"))return r}return null}function Jp(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e.contextElement instanceof Element:true)}var X=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.active=false,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=false,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=false,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=false,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=false,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),r=this.popup.getBoundingClientRect(),t=this.placement.includes("top")||this.placement.includes("bottom"),o=0,i=0,s=0,n=0,a=0,l=0,d=0,m=0;t?e.top<r.top?(o=e.left,i=e.bottom,s=e.right,n=e.bottom,a=r.left,l=r.top,d=r.right,m=r.top):(o=r.left,i=r.bottom,s=r.right,n=r.bottom,a=e.left,l=e.top,d=e.right,m=e.top):e.left<r.left?(o=e.right,i=e.top,s=r.left,n=r.top,a=e.right,l=e.bottom,d=r.left,m=r.bottom):(o=r.right,i=r.top,s=e.left,n=e.top,a=r.right,l=r.bottom,d=e.left,m=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${m}px`);}};}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start();}disconnectedCallback(){super.disconnectedCallback(),this.stop();}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition());}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor);}else this.anchor instanceof Element||Jp(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:true})[0]),this.anchorEl&&this.active&&this.start();}start(){!this.anchorEl||!this.active||(this.cleanup=Ja(this.anchorEl,this.popup,()=>{this.reposition();}));}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e();})}reposition(){if(!this.active||!this.anchorEl)return;let e=[Qa({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Cs({apply:({rects:t})=>{let o=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${t.reference.width}px`:"",this.popup.style.height=i?`${t.reference.height}px`:"";}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&e.push(tl({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(Za({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(Cs({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width");}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(el({element:this.arrowEl,padding:this.arrowPadding}));let r=this.strategy==="absolute"?t=>go.getOffsetParent(t,ol):go.getOffsetParent;rl(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:ye(kt({},go),{getOffsetParent:r})}).then(({x:t,y:o,middlewareData:i,placement:s})=>{let n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${t}px`,top:`${o}px`}),this.arrow){let l=i.arrow.x,d=i.arrow.y,m="",u="",f="",g="";if(this.arrowPlacement==="start"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",u=n?b:"",g=n?"":b;}else if(this.arrowPlacement==="end"){let b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=n?"":b,g=n?b:"",f=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",m=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",m=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:m,right:u,bottom:f,left:g,[a]:"calc(var(--arrow-size-diagonal) * -1)"});}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition");}render(){return h`
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
        ${this.arrow?h`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};X.styles=[z,Sa];c([$(".popup")],X.prototype,"popup",2);c([$(".popup__arrow")],X.prototype,"arrowEl",2);c([p()],X.prototype,"anchor",2);c([p({type:Boolean,reflect:true})],X.prototype,"active",2);c([p({reflect:true})],X.prototype,"placement",2);c([p({reflect:true})],X.prototype,"strategy",2);c([p({type:Number})],X.prototype,"distance",2);c([p({type:Number})],X.prototype,"skidding",2);c([p({type:Boolean})],X.prototype,"arrow",2);c([p({attribute:"arrow-placement"})],X.prototype,"arrowPlacement",2);c([p({attribute:"arrow-padding",type:Number})],X.prototype,"arrowPadding",2);c([p({type:Boolean})],X.prototype,"flip",2);c([p({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(r=>r.trim()).filter(r=>r!==""),toAttribute:e=>e.join(" ")}})],X.prototype,"flipFallbackPlacements",2);c([p({attribute:"flip-fallback-strategy"})],X.prototype,"flipFallbackStrategy",2);c([p({type:Object})],X.prototype,"flipBoundary",2);c([p({attribute:"flip-padding",type:Number})],X.prototype,"flipPadding",2);c([p({type:Boolean})],X.prototype,"shift",2);c([p({type:Object})],X.prototype,"shiftBoundary",2);c([p({attribute:"shift-padding",type:Number})],X.prototype,"shiftPadding",2);c([p({attribute:"auto-size"})],X.prototype,"autoSize",2);c([p()],X.prototype,"sync",2);c([p({type:Object})],X.prototype,"autoSizeBoundary",2);c([p({attribute:"auto-size-padding",type:Number})],X.prototype,"autoSizePadding",2);c([p({attribute:"hover-bridge",type:Boolean})],X.prototype,"hoverBridge",2);var sl=new Map,Qp=new WeakMap;function Zp(e){return e??{keyframes:[],options:{duration:0}}}function il(e,r){return r.toLowerCase()==="rtl"?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function Kt(e,r){sl.set(e,Zp(r));}function Gt(e,r,t){let o=Qp.get(e);if(o?.[r])return il(o[r],t.dir);let i=sl.get(r);return i?il(i,t.dir):{keyframes:[],options:{duration:0}}}function we(e,r){return new Promise(t=>{function o(i){i.target===e&&(e.removeEventListener(r,o),t());}e.addEventListener(r,o);})}function Yt(e,r,t){return new Promise(o=>{if(t?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=e.animate(r,ye(kt({},t),{duration:td()?0:t.duration}));i.addEventListener("cancel",o,{once:true}),i.addEventListener("finish",o,{once:true});})}function td(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Xt(e){return Promise.all(e.getAnimations().map(r=>new Promise(t=>{r.cancel(),requestAnimationFrame(t);})))}function Ir(e,r){return e.map(t=>ye(kt({},t),{height:t.height==="auto"?`${r}px`:t.height}))}var N=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new dt(this,"help-text","label"),this.localize=new j(this),this.typeToSelectString="",this.hasFocus=false,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=false,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=false,this.maxOptionsVisible=3,this.disabled=false,this.clearable=false,this.open=false,this.hoist=false,this.filled=false,this.pill=false,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=false,this.getTag=e=>h`
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
    `,this.handleDocumentFocusIn=e=>{let r=e.composedPath();this&&!r.includes(this)&&this.hide();},this.handleDocumentKeyDown=e=>{let r=e.target,t=r.closest(".select__clear")!==null,o=r.closest("sl-icon-button")!==null;if(!(t||o)){if(e.key==="Escape"&&this.open&&!this.closeWatcher&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:true})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let i=this.getAllOptions(),s=i.indexOf(this.currentOption),n=Math.max(0,s);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(n=s+1,n>i.length-1&&(n=0)):e.key==="ArrowUp"?(n=s-1,n<0&&(n=i.length-1)):e.key==="Home"?n=0:e.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n]);}if(e.key&&e.key.length===1||e.key==="Backspace"){let i=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show();}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(let s of i)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=e=>{let r=e.composedPath();this&&!r.includes(this)&&this.hide();};}get value(){return this._value}set value(e){this.multiple?e=Array.isArray(e)?e:e.split(" "):e=Array.isArray(e)?e.join(" "):e,this._value!==e&&(this.valueHasChanged=true,this._value=e);}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange();}),this.open=false;}addOpenListeners(){var e;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:true}));});}removeOpenListeners(){var e;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(e=this.closeWatcher)==null||e.destroy();}handleFocus(){this.hasFocus=true,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus");}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleLabelClick(){this.displayInput.focus();}handleComboboxMouseDown(e){let t=e.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="sl-icon-button");this.disabled||t||(e.preventDefault(),this.displayInput.focus({preventScroll:true}),this.open=!this.open);}handleComboboxKeyDown(e){e.key!=="Tab"&&(e.stopPropagation(),this.handleDocumentKeyDown(e));}handleClearClick(e){e.stopPropagation(),this.valueHasChanged=true,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:true}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change");}));}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault();}handleOptionClick(e){let t=e.target.closest("sl-option"),o=this.value;t&&!t.disabled&&(this.valueHasChanged=true,this.multiple?this.toggleOptionSelection(t):this.setSelectedOptions(t),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:true})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:true})));}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let e=this.getAllOptions(),r=this.valueHasChanged?this.value:this.defaultValue,t=Array.isArray(r)?r:[r],o=[];e.forEach(i=>o.push(i.value)),this.setSelectedOptions(e.filter(i=>t.includes(i.value)));}handleTagRemove(e,r){e.stopPropagation(),this.valueHasChanged=true,this.disabled||(this.toggleOptionSelection(r,false),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change");}));}getAllOptions(){return [...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(e){this.getAllOptions().forEach(t=>{t.current=false,t.tabIndex=-1;}),e&&(this.currentOption=e,e.current=true,e.tabIndex=0,e.focus());}setSelectedOptions(e){let r=this.getAllOptions(),t=Array.isArray(e)?e:[e];r.forEach(o=>o.selected=false),t.length&&t.forEach(o=>o.selected=true),this.selectionChanged();}toggleOptionSelection(e,r){r===true||r===false?e.selected=r:e.selected=!e.selected,this.selectionChanged();}selectionChanged(){var e,r,t;let o=this.getAllOptions();this.selectedOptions=o.filter(s=>s.selected);let i=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else {let s=this.selectedOptions[0];this.value=(e=s?.value)!=null?e:"",this.displayLabel=(t=(r=s?.getTextLabel)==null?void 0:r.call(s))!=null?t:"";}this.valueHasChanged=i,this.updateComplete.then(()=>{this.formControlController.updateValidity();});}get tags(){return this.selectedOptions.map((e,r)=>{if(r<this.maxOptionsVisible||this.maxOptionsVisible<=0){let t=this.getTag(e,r);return h`<div @sl-remove=${o=>this.handleTagRemove(o,e)}>
          ${typeof t=="string"?Rt(t):t}
        </div>`}else if(r===this.maxOptionsVisible)return h`<sl-tag size=${this.size}>+${this.selectedOptions.length-r}</sl-tag>`;return h``})}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleDisabledChange(){this.disabled&&(this.open=false,this.handleOpenChange());}attributeChangedCallback(e,r,t){if(super.attributeChangedCallback(e,r,t),e==="value"){let o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o;}}handleValueChange(){if(!this.valueHasChanged){let t=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=t;}let e=this.getAllOptions(),r=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(e.filter(t=>r.includes(t.value)));}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Xt(this),this.listbox.hidden=false,this.popup.active=true,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption);});let{keyframes:e,options:r}=Gt(this,"select.show",{dir:this.localize.dir()});await Yt(this.popup.popup,e,r),this.currentOption&&co(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Xt(this);let{keyframes:e,options:r}=Gt(this,"select.hide",{dir:this.localize.dir()});await Yt(this.popup.popup,e,r),this.listbox.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}async show(){if(this.open||this.disabled){this.open=false;return}return this.open=true,we(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=false;return}return this.open=false,we(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(e){this.valueInput.setCustomValidity(e),this.formControlController.updateValidity();}focus(e){this.displayInput.focus(e);}blur(){this.displayInput.blur();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r,i=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return h`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":o})}
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

              ${this.multiple?h`<div part="tags" class="select__tags">${this.tags}</div>`:""}

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

              ${i?h`
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
    `}};N.styles=[z,It,Ca];N.dependencies={"sl-icon":q,"sl-popup":X,"sl-tag":de};c([$(".select")],N.prototype,"popup",2);c([$(".select__combobox")],N.prototype,"combobox",2);c([$(".select__display-input")],N.prototype,"displayInput",2);c([$(".select__value-input")],N.prototype,"valueInput",2);c([$(".select__listbox")],N.prototype,"listbox",2);c([k()],N.prototype,"hasFocus",2);c([k()],N.prototype,"displayLabel",2);c([k()],N.prototype,"currentOption",2);c([k()],N.prototype,"selectedOptions",2);c([k()],N.prototype,"valueHasChanged",2);c([p()],N.prototype,"name",2);c([k()],N.prototype,"value",1);c([p({attribute:"value"})],N.prototype,"defaultValue",2);c([p({reflect:true})],N.prototype,"size",2);c([p()],N.prototype,"placeholder",2);c([p({type:Boolean,reflect:true})],N.prototype,"multiple",2);c([p({attribute:"max-options-visible",type:Number})],N.prototype,"maxOptionsVisible",2);c([p({type:Boolean,reflect:true})],N.prototype,"disabled",2);c([p({type:Boolean})],N.prototype,"clearable",2);c([p({type:Boolean,reflect:true})],N.prototype,"open",2);c([p({type:Boolean})],N.prototype,"hoist",2);c([p({type:Boolean,reflect:true})],N.prototype,"filled",2);c([p({type:Boolean,reflect:true})],N.prototype,"pill",2);c([p()],N.prototype,"label",2);c([p({reflect:true})],N.prototype,"placement",2);c([p({attribute:"help-text"})],N.prototype,"helpText",2);c([p({reflect:true})],N.prototype,"form",2);c([p({type:Boolean,reflect:true})],N.prototype,"required",2);c([p()],N.prototype,"getTag",2);c([A("disabled",{waitUntilFirstUpdate:true})],N.prototype,"handleDisabledChange",1);c([A(["defaultValue","value"],{waitUntilFirstUpdate:true})],N.prototype,"handleValueChange",1);c([A("open",{waitUntilFirstUpdate:true})],N.prototype,"handleOpenChange",1);Kt("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Kt("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});N.define("sl-select");var nl=y`
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
`;var Ft=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.isInitialized=false,this.current=false,this.selected=false,this.hasHover=false,this.value="",this.disabled=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false");}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let e=this.closest("sl-select");e&&e.handleDefaultSlotChange();}):this.isInitialized=true;}handleMouseEnter(){this.hasHover=true;}handleMouseLeave(){this.hasHover=false;}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"));}getTextLabel(){let e=this.childNodes,r="";return [...e].forEach(t=>{t.nodeType===Node.ELEMENT_NODE&&(t.hasAttribute("slot")||(r+=t.textContent)),t.nodeType===Node.TEXT_NODE&&(r+=t.textContent);}),r.trim()}render(){return h`
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
    `}};Ft.styles=[z,nl];Ft.dependencies={"sl-icon":q};c([$(".option__label")],Ft.prototype,"defaultSlot",2);c([k()],Ft.prototype,"current",2);c([k()],Ft.prototype,"selected",2);c([k()],Ft.prototype,"hasHover",2);c([p({reflect:true})],Ft.prototype,"value",2);c([p({type:Boolean,reflect:true})],Ft.prototype,"disabled",2);c([A("disabled")],Ft.prototype,"handleDisabledChange",1);c([A("selected")],Ft.prototype,"handleSelectedChange",1);c([A("value")],Ft.prototype,"handleValueChange",1);Ft.define("sl-option");var al=y`
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
`;function ed(e,...r){let t=e.valueOf(),o={},i=[...r];try{if(i.length===0)return t;if(i.length===1){let s=i[0];if(s==null)return t;Array.isArray(s)?i=s:typeof s=="object"&&(o=s,i=[]);}return t=t.replace(/\{\s*([a-zA-Z\d]*)\s*\}/g,(s,n)=>{let a;return n&&o.hasOwnProperty(n)?a=o[n]:!n&&i.length>0&&(a=i.shift()),a==null?"":(typeof a=="function"&&(a=a()),String(a))}),t}catch{return t}}String.prototype.params=function(){return ed(this,...arguments)};var ks="__AS_ASYNC_COMPUTED_VALUE__";function ki(e){return toString.call(e)==="[object Map]"}function ze(e){return e&&typeof e=="object"&&e.hasOwnProperty(ks)}function Ts(e,r){let t=e.get(r);if(t!==void 0)return t;let o=e.get(Number(r)||r);if(o!==void 0)return o}function Ce(e,r,t){if(!r||r.length===0)return e;let o=Array.isArray(r)?r:r.split("."),i,s=e;for(let n=0;n<o.length;n++){let a=o[n];if(ki(s))i=Ts(s,a);else if(a in s)i=s[a];else return t;s=i;}return i}function dl(e,r){return e.length>r.length?false:e.every((t,o)=>t===r[o])}var vl=Object.defineProperty,ud=(e,r,t)=>r in e?vl(e,r,{enumerable:true,configurable:true,writable:true,value:t}):e[r]=t,tt=(e,r)=>vl(e,"name",{value:r,configurable:true}),Ht=(e,r,t)=>ud(e,typeof r!="symbol"?r+"":r,t);var yl=class extends Error{constructor(r){super(r);}};tt(yl,"FastEventError");var yo=yl,hd=class extends yo{};tt(hd,"TimeoutError");var xl=class extends yo{};tt(xl,"UnboundError");var md=xl,_l=class extends yo{};tt(_l,"AbortError");var bl=_l,wl=class extends yo{};tt(wl,"CancelError");var fd=wl,gd=class extends yo{};tt(gd,"QueueOverflowError");var Cl={clearRetain:Symbol.for("ClearRetain")},vo=(function(e){return e[e.Transformed=1]="Transformed",e})({});function zs(e,r,t,o){let i,s={},n={};return typeof e[0]=="object"?(Object.assign(n,e[0]),s=typeof e[1]=="boolean"?{retain:e[1]}:e[1]||{},i=e[0].meta):(n.type=e[0],n.payload=e[1],s=typeof e[2]=="boolean"?{retain:e[2]}:e[2]||{}),i=Object.assign({},r,t,s.meta,i),Object.keys(i).length===0&&(i=void 0),n.meta=i,s.executor===void 0&&(s.executor=o),[n,s]}tt(zs,"parseEmitArgs");function Sl(e){return e?typeof e=="object"&&"__FastEventScope__"in e:false}tt(Sl,"isFastEventScope");function Vs(e,r,t){let o=e[0],i=Sl(e[1])?e[1]:void 0,s=(i?e[2]:e[1])||{};return s.meta=Object.assign({},r,s?.meta),s.context=s.context!==void 0?s.context:t,[o,i,s]}tt(Vs,"parseScopeArgs");function $i(e,r){return Object.defineProperty(e,"name",{value:r||"anonymous",configurable:true}),e}tt($i,"renameFn");function ot(e){return e&&typeof e=="function"}tt(ot,"isFunction");var kl=class $l{constructor(r){Ht(this,"__FastEventScope__",true),Ht(this,"_options",{}),Ht(this,"types",{events:void 0,meta:void 0,context:void 0,message:void 0,listeners:void 0,anyListener:void 0}),Ht(this,"prefix",""),Ht(this,"emitter"),this._options=Object.assign({},this._initOptions(r));}get context(){return this.options.context||this}get options(){return this._options}get listeners(){return this.emitter.getListeners(this.prefix)}bind(r,t,o){this.emitter=r,this._options=Object.assign(this._options,{scope:t},o),t.length>0&&!t.endsWith(r.options.delimiter)&&(this.prefix=t+r.options.delimiter);}_initOptions(r){return r}_getScopeListener(r){let t=this.prefix;if(t.length===0)return r;r||(r=(this._options.onMessage||this.onMessage).bind(this));let o=this;return $i(function(i,s){let n=s.rawEventType||i.type;if(n.startsWith(t)){let a=((s.flags||0)&vo.Transformed)>0?i:Object.assign({},i,{type:n.substring(t.length)});return r.call(o.context,a,s)}},r.name)}_getScopeType(r){return r===void 0?void 0:this.prefix+r}_fixScopeType(r){return r.startsWith(this.prefix)?r.substring(this.prefix.length):r}on(){if(!this.emitter)throw new md;let r=[...arguments];return r[0]=this._getScopeType(r[0]),r[1]=this._getScopeListener(r[1]),this.emitter.on(...r)}once(){return this.on(arguments[0],arguments[1],Object.assign({},arguments[2],{count:1}))}onAny(){return this.on("**",...arguments)}off(){let r=arguments;typeof r[0]=="string"&&(r[0]=this._getScopeType(r[0])),this.emitter.off(...r);}offAll(){this.emitter.offAll(this.prefix.substring(0,this.prefix.length-1));}clear(){this.emitter.clear(this.prefix.substring(0,this.prefix.length-1));}emit(){if(arguments.length===2&&typeof arguments[0]=="string"&&arguments[1]===Cl.clearRetain)return this.emitter.emit(this._getScopeType(arguments[0]));let[r,t]=zs(arguments,this.emitter.options.meta,this.options.meta,this.options.executor);return this._transformMessage(r,t),r.type=this._getScopeType(r.type),this.emitter.emit(r,t)}_transformMessage(r,t){ot(this._options.transform)&&(t.rawEventType=this._getScopeType(r.type),t.flags=(t.flags||0)|vo.Transformed,r.payload=this._options.transform.call(this,r));}async emitAsync(){return (await Promise.allSettled(this.emit.apply(this,arguments))).map(r=>r.status==="fulfilled"?r.value:r.reason)}async waitFor(){let r=arguments[0],t=arguments[1],o=await this.emitter.waitFor(this._getScopeType(r),t);return Object.assign({},o,{type:this._fixScopeType(o.type)})}scope(){let[r,t,o]=Vs(arguments,this.options.meta,this.options.context),i;return t?i=t:i=new $l,i.bind(this.emitter,this.prefix+r,o),i}onMessage(r,t){}};tt(kl,"FastEventScope");var bd=kl;function Ms(e,r){if(e.length!==r.length&&e.length>0&&r[r.length-1]!=="**")return  false;let t=[...r];r.length>0&&r[r.length-1]==="**"&&t.splice(r.length-1,1,...Array.from({length:e.length-r.length+1}).fill("*"));for(let o=0;o<e.length;o++)if(t[o]!=="*"&&t[o]!==e[o])return  false;return  true}tt(Ms,"isPathMatched");function El(e,r){let t=[];for(;;){let o=e.findIndex(i=>r(i));if(o===-1){t.push(o);break}e.splice(o,1);}return t}tt(El,"removeItem");var Al=Symbol.for("__expandable__");function vd(e){return e[Al]=true,e}tt(vd,"expandable");function Ol(e){return e&&e[Al]}tt(Ol,"isExpandable");function Tl(e){for(let r=0;r<e.length;r++){let t=e[r];Array.isArray(t)&&Ol(t)&&(e.splice(r,1,...t),r+=t.length-1);}return e}tt(Tl,"expandEmitResults");function Rl(e){return e&&typeof e=="object"&&"off"in e&&"listener"in e}tt(Rl,"isSubsctiber");function Il(e,r){return e.catch(t=>(r&&r(t),Promise.resolve(t)))}tt(Il,"tryReturnError");var yd=class{constructor(r){Ht(this,"__FastEvent__",true),Ht(this,"listeners",{__listeners:[]}),Ht(this,"_options"),Ht(this,"_delimiter","/"),Ht(this,"_context"),Ht(this,"retainedMessages",new Map),Ht(this,"listenerCount",0),Ht(this,"types",{events:void 0,meta:void 0,context:void 0,message:void 0,listeners:void 0,anyListener:void 0}),this._options=Object.assign({debug:false,id:Math.random().toString(36).substring(2),delimiter:"/",context:null,ignoreErrors:true,meta:void 0,expandEmitResults:true},this._initOptions(r)),this._delimiter=this._options.delimiter,this._context=this._options.context,this._enableDevTools();}get options(){return this._options}get context(){return this.options.context||this}get meta(){return this.options.meta}get id(){return this._options.id}_initOptions(r){return r}_addListener(r,t,o){let{count:i,prepend:s}=o,n=0;return [this._forEachNodes(r,a=>{let l=[t,i,0,o.tag,o.flags];s?(a.__listeners.splice(0,0,l),n=0):(a.__listeners.push(l),n=a.__listeners.length-1),this.listenerCount++;}),n]}_enableDevTools(){this.options.debug&&globalThis.__FLEXEVENT_DEVTOOLS__&&globalThis.__FLEXEVENT_DEVTOOLS__.add(this);}_forEachNodes(r,t){if(r.length===0)return;let o=this.listeners;for(let i=0;i<r.length;i++){let s=r[i];if(s in o||(o[s]={__listeners:[]}),i===r.length-1){let n=o[s];return t(n,o),n}else o=o[s];}}_removeListener(r,t,o){o&&El(r.__listeners,i=>{i=Array.isArray(i)?i[0]:i;let s=i===o;return s&&(this.listenerCount--,ot(this._options.onRemoveListener)&&this._options.onRemoveListener(t.join(this._delimiter),o)),s});}_pipeListener(r,t){return t.forEach(o=>{r=$i(o(r),r.name);}),r}on(){let r=arguments[0],t=ot(arguments[1])?arguments[1]:(this._options.onMessage||this.onMessage).bind(this),o=Object.assign({count:0,flags:0,prepend:false},ot(arguments[1])?arguments[2]:arguments[1]);if(r.length===0)throw new Error("event type cannot be empty");if(ot(this._options.onAddListener)){let l=this._options.onAddListener(r,t,o);if(l===false)throw new fd;if(Rl(l))return l}let i=r.split(this._delimiter);if(o.pipes&&o.pipes.length>0&&(t=this._pipeListener(t,o.pipes)),ot(o.filter)||ot(o.off)){let l=t;t=$i(function(d,m){if(ot(o.off)&&o.off.call(this,d,m)){a();return}if(ot(o.filter)){if(o.filter.call(this,d,m))return l.call(this,d,m)}else return l.call(this,d,m)},t.name);}let[s,n]=this._addListener(i,t,o),a=tt(()=>s&&this._removeListener(s,i,t),"off");return this._emitRetainMessage(r,s,n),{off:a,listener:t}}once(){return ot(arguments[1])?this.on(arguments[0],arguments[1],Object.assign({},arguments[2],{count:1})):this.on(arguments[0],Object.assign({},arguments[2],{count:1}))}onAny(){return this.on("**",arguments[0],arguments[1])}onMessage(r,t){}off(){let r=arguments,t=ot(r[0])?void 0:r[0],o=ot(r[0])?r[0]:r[1],i=t?t.split(this._delimiter):[],s=t?t.includes("*"):false;if(t&&!s)this._traverseToPath(this.listeners,i,n=>{o?this._removeListener(n,i,o):t&&(n.__listeners=[]);});else {let n=s?[]:i;this._traverseListeners(this.listeners,n,(a,l)=>{(o!==void 0||s&&Ms(a,i))&&(o?this._removeListener(l,i,o):l.__listeners=[]);});}}offAll(r){if(r){let t=r.split(this._delimiter),o=0;this._traverseListeners(this.listeners,t,(i,s)=>{o+=s.__listeners.length,s.__listeners=[];}),this.listenerCount-=o,this._removeRetainedEvents(r);}else {let t=0;this._traverseListeners(this.listeners,[],(o,i)=>{t+=i.__listeners.length;}),this.listenerCount-=t,this.retainedMessages.clear(),this.listeners={__listeners:[]};}ot(this._options.onClearListeners)&&this._options.onClearListeners.call(this);}_removeRetainedEvents(r){r||this.retainedMessages.clear(),r?.endsWith(this._delimiter)&&(r+=this._delimiter),this.retainedMessages.delete(r);for(let t of this.retainedMessages.keys())t.startsWith(r)&&this.retainedMessages.delete(t);}clear(r){this.offAll(r),this._removeRetainedEvents(r);}_emitRetainMessage(r,t,o){let i=[];if(r.includes("*")){let s=r.split(this._delimiter);this.retainedMessages.forEach((n,a)=>{let l=a.split(this._delimiter);Ms(l,s)&&i.push(n);});}else this.retainedMessages.has(r)&&i.push(this.retainedMessages.get(r));t&&i.forEach(s=>{this._executeListeners([t],s,{},n=>n[0]===t.__listeners[o][0]);});}_traverseToPath(r,t,o,i=0,s){if(i>=t.length){o(r);return}let n=t[i];if(s===true){this._traverseToPath(r,t,o,i+1,true);return}"*"in r&&this._traverseToPath(r["*"],t,o,i+1),"**"in r&&this._traverseToPath(r["**"],t,o,i+1,true),n in r&&this._traverseToPath(r[n],t,o,i+1);}_traverseListeners(r,t,o){let i=r;t&&t.length>0&&this._traverseToPath(r,t,n=>{i=n;});let s=tt((n,a,l)=>{a(l,n);for(let[d,m]of Object.entries(n))d.startsWith("__")||m&&s(m,a,[...l,d]);},"traverseNodes");s(i,o,[]);}_onListenerError(r,t,o,i){if(i instanceof Error&&(i._emitter=`${r.name||"anonymous"}:${t.type}`),ot(this._options.onListenerError))try{this._options.onListenerError.call(this,i,r,t,o);}catch{}if(this._options.ignoreErrors)return i;throw i}_setListenerFlags(r,t){return !r||r===0?t:r|t}_executeListener(r,t,o,i=false){try{if(o&&o.abortSignal&&o.abortSignal.aborted)return this._onListenerError(r,t,o,new bl(r.name));let s=((o?.flags||0)&vo.Transformed)>0,n=r.call(this.context,s?t.payload:t,o);return i&&n&&n instanceof Promise&&(n=Il(n,a=>this._onListenerError(r,t,o,a))),n}catch(s){return this._onListenerError(r,t,o,s)}}_getListenerExecutor(r){if(!r)return;let t=r.executor||this._options.executor;if(ot(t))return t}_executeListeners(r,t,o,i){if(!r||r.length===0)return [];let s=r.reduce((a,l)=>a.concat(l.__listeners.filter(d=>ot(i)?i(d,l):true).map((d,m)=>[d,m,l.__listeners])),[]);ot(this._options.transform)&&(o||(o={}),o.rawEventType=t.type,t.payload=this._options.transform.call(this,t),o.flags=this._setListenerFlags(o.flags,vo.Transformed)),this._decListenerExecCount(s);let n=this._getListenerExecutor(o);if(n){let a=n(s.map(l=>l[0]),t,o,this._executeListener.bind(this));return Array.isArray(a)?a:[a]}else return s.map(a=>this._executeListener(a[0][0],t,o,true))}_decListenerExecCount(r){for(let t=r.length-1;t>=0;t--){let o=r[t][0];o[2]++,o[1]>0&&o[1]<=o[2]&&r[t][2].splice(t,1);}}getListeners(r){let t=[],o=r.split(this._delimiter);return this._traverseToPath(this.listeners,o,i=>{t.push(i);}),t[0].__listeners}emit(){if(arguments.length===2&&typeof arguments[0]=="string"&&arguments[1]===Cl.clearRetain)return this.retainedMessages.delete(arguments[0]),[];let[r,t]=zs(arguments,this.options.meta);ot(t.parseArgs)&&t.parseArgs(r,t);let o=r.type.split(this._delimiter);t.retain&&this.retainedMessages.set(r.type,r);let i=[],s=[];if(this._traverseToPath(this.listeners,o,n=>{s.push(n);}),ot(this._options.onBeforeExecuteListener)){let n=this._options.onBeforeExecuteListener.call(this,r,t);if(Array.isArray(n))return n;if(n===false)throw new bl(r.type)}return ot(this._options.transform)&&(r.payload=this._options.transform.call(this,r),t.rawEventType=r.type,t.flags=(t.flags||0)|vo.Transformed),i.push(...this._executeListeners(s,r,t)),ot(this._options.onAfterExecuteListener)&&this._options.onAfterExecuteListener.call(this,r,i,s),this._options.expandEmitResults&&Tl(i),i}async emitAsync(){return (await Promise.allSettled(this.emit.apply(this,arguments))).map(r=>r.status==="fulfilled"?r.value:r.reason)}waitFor(){let r=arguments[0],t=arguments[1];return new Promise((o,i)=>{let s,n,a=tt(l=>{clearTimeout(s),n&&n.off(),o(l);},"listener");t&&t>0&&(s=setTimeout(()=>{n&&n.off(),i(new Error("wait for event<"+r+"> is timeout"));},t)),n=this.on(r,a);})}scope(){let[r,t,o]=Vs(arguments,this.options.meta,this.options.context),i;return t?i=t:i=new bd,i.bind(this,r,o),i}};tt(yd,"FastEvent");function xd(e){return e?typeof e=="object"&&"type"in e:false}tt(xd,"isFastEventMessage");function _d(e){return e&&typeof e=="string"}tt(_d,"isString");function wd(e){return typeof e=="function"&&(e.toString().startsWith("class ")||e.prototype?.constructor===e)}tt(wd,"isClass");function Cd(e){return e?typeof e=="object"&&"__FastEvent__"in e:false}tt(Cd,"isFastEvent");var Pe=class{constructor(r,t,o){this.path=t;this.handle=o;this._loading=false;this._ready=false;this.host=r,r.addController(this);}get loading(){return this._loading}get value(){return this._value}load(){let r=this.host.schema,t=Ce(r,this.path);ze(t)?t.loading?(this._loading=true,this._value=this.handle(void 0)):(this._ready=t.value!==void 0,this._value=this.handle(t.value),this._loading=false):(this._ready=true,this._value=this.handle(t),this._loading=false);}render(r){return h`
            ${B(this.loading,()=>h`<auto-loading></auto-loading>`,()=>r(this._value))}
        `}hostUpdate(){this._ready||this.load();}hostUpdated(){}};exports.AutoFieldSelect=class xo extends I{constructor(){super(...arguments);this.valueKey="value";this.labelKey="label";this.items=new Pe(this,"select",t=>!t||!Array.isArray(t)?[]:t.map(o=>{let i={};return typeof o=="object"?Object.assign(i,o):typeof o=="string"&&o.startsWith("-")?Object.assign(i,{type:"divider"}):Object.assign(i,{label:o}),i}));}getInitialOptions(){return {valueKey:"value",labelKey:"label",select:[],multiple:false,clearable:true,maxOptionsVisible:0,placement:"top"}}_renderItem(t){let o=this.options.renderItem;return typeof o=="string"?h`${Rt(o.replace(/\{(.+?)\}/g,(i,s)=>t[s]))}`:typeof o=="function"?h`${Rt(o(t))}`:t.label||t.value}_onDropdownMenu(){}renderInput(){return h`
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
                
                ${B(this.items.loading,()=>h`<auto-loading></auto-loading>`,()=>h`${this.renderBeforeActions()}
                ${this.items.value.map(t=>t.type==="divider"?h`<sl-divider></sl-divider>`:h`<sl-option value="${t[this.valueKey]||t.label}" ?disabled=${!this.options.enable}>
                            <auto-flex class="item" gap="1em" align="center" grow="sl-icon + *,:first-child:not(sl-icon)" style="text-align:left;">
                                ${B(t.icon,()=>h`<sl-icon name="${t.icon}"></sl-icon>`)}
                                ${this._renderItem(t)}
                            </auto-flex>
                        </sl-option>`)}
                    ${this.renderAfterActions()}`)}
                
            </sl-select>
        `}getValue(){return this.options.multiple?this.value.join(" "):this.value}getInputValue(){return this.options.multiple?Array.isArray(this.input.value)?this.input.value:this.input.value.split(" "):this.input.value}};exports.AutoFieldSelect.styles=[I.styles,al,y`
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
        `],exports.AutoFieldSelect=v([T("auto-field-select")],exports.AutoFieldSelect);var Ml=y`
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
`;var rt=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this),this.hasSlotController=new dt(this,"help-text","label"),this.localize=new j(this),this.hasFocus=false,this.hasTooltip=false,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=false,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=e=>e.toString(),this.form="",this.defaultValue=0;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input);});}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this.input);}handleChange(){this.emit("sl-change");}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange();}handleBlur(){this.hasFocus=false,this.hasTooltip=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.hasTooltip=true,this.emit("sl-focus");}handleThumbDragStart(){this.hasTooltip=true;}handleThumbDragEnd(){this.hasTooltip=false;}syncProgress(e){this.input.style.setProperty("--percent",`${e*100}%`);}syncTooltip(e){if(this.output!==null){let r=this.input.offsetWidth,t=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",s=r*e;if(i){let n=`${r-s}px + ${e} * ${o}`;this.output.style.translate=`calc((${n} - ${t/2}px - ${o} / 2))`;}else {let n=`${s}px - ${e} * ${o}`;this.output.style.translate=`calc(${n} - ${t/2}px + ${o} / 2)`;}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange();}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}syncRange(){let e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(e));}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}focus(e){this.input.focus(e);}blur(){this.input.blur();}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value));}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r;return h`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--medium":true,"form-control--has-label":t,"form-control--has-help-text":o})}
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
              .value=${$t(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?h`
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
    `}};rt.styles=[z,It,Ml];c([$(".range__control")],rt.prototype,"input",2);c([$(".range__tooltip")],rt.prototype,"output",2);c([k()],rt.prototype,"hasFocus",2);c([k()],rt.prototype,"hasTooltip",2);c([p()],rt.prototype,"title",2);c([p()],rt.prototype,"name",2);c([p({type:Number})],rt.prototype,"value",2);c([p()],rt.prototype,"label",2);c([p({attribute:"help-text"})],rt.prototype,"helpText",2);c([p({type:Boolean,reflect:true})],rt.prototype,"disabled",2);c([p({type:Number})],rt.prototype,"min",2);c([p({type:Number})],rt.prototype,"max",2);c([p({type:Number})],rt.prototype,"step",2);c([p()],rt.prototype,"tooltip",2);c([p({attribute:false})],rt.prototype,"tooltipFormatter",2);c([p({reflect:true})],rt.prototype,"form",2);c([Nt()],rt.prototype,"defaultValue",2);c([Ae({passive:true})],rt.prototype,"handleThumbDragStart",1);c([A("value",{waitUntilFirstUpdate:true})],rt.prototype,"handleValueChange",1);c([A("disabled",{waitUntilFirstUpdate:true})],rt.prototype,"handleDisabledChange",1);c([A("hasTooltip",{waitUntilFirstUpdate:true})],rt.prototype,"syncRange",1);rt.define("sl-range");exports.AutoFieldRabge=class _o extends I{getInitialOptions(){return {max:100,min:0,step:1,tooltip:"top"}}renderInput(){return h`
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
        `}};exports.AutoFieldRabge.styles=[I.styles,y`
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
        `],exports.AutoFieldRabge=v([T("auto-field-range")],exports.AutoFieldRabge);var zl=y`
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
`;function ht(e,r,t){let o=i=>Object.is(i,-0)?0:i;return e<r?o(r):e>t?o(t):o(e)}var Ct=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.hoverValue=0,this.isHovering=false,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=false,this.disabled=false,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>';}getValueFromMousePosition(e){return this.getValueFromXCoordinate(e.clientX)}getValueFromTouchPosition(e){return this.getValueFromXCoordinate(e.touches[0].clientX)}getValueFromXCoordinate(e){let r=this.localize.dir()==="rtl",{left:t,right:o,width:i}=this.rating.getBoundingClientRect(),s=r?this.roundToPrecision((o-e)/i*this.max,this.precision):this.roundToPrecision((e-t)/i*this.max,this.precision);return ht(s,0,this.max)}handleClick(e){this.disabled||(this.setValue(this.getValueFromMousePosition(e)),this.emit("sl-change"));}setValue(e){this.disabled||this.readonly||(this.value=e===this.value?0:e,this.isHovering=false);}handleKeyDown(e){let r=this.localize.dir()==="ltr",t=this.localize.dir()==="rtl",o=this.value;if(!(this.disabled||this.readonly)){if(e.key==="ArrowDown"||r&&e.key==="ArrowLeft"||t&&e.key==="ArrowRight"){let i=e.shiftKey?1:this.precision;this.value=Math.max(0,this.value-i),e.preventDefault();}if(e.key==="ArrowUp"||r&&e.key==="ArrowRight"||t&&e.key==="ArrowLeft"){let i=e.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+i),e.preventDefault();}e.key==="Home"&&(this.value=0,e.preventDefault()),e.key==="End"&&(this.value=this.max,e.preventDefault()),this.value!==o&&this.emit("sl-change");}}handleMouseEnter(e){this.isHovering=true,this.hoverValue=this.getValueFromMousePosition(e);}handleMouseMove(e){this.hoverValue=this.getValueFromMousePosition(e);}handleMouseLeave(){this.isHovering=false;}handleTouchStart(e){this.isHovering=true,this.hoverValue=this.getValueFromTouchPosition(e),e.preventDefault();}handleTouchMove(e){this.hoverValue=this.getValueFromTouchPosition(e);}handleTouchEnd(e){this.isHovering=false,this.setValue(this.hoverValue),this.emit("sl-change"),e.preventDefault();}roundToPrecision(e,r=.5){let t=1/r;return Math.ceil(e*t)/t}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}});}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}});}focus(e){this.rating.focus(e);}blur(){this.rating.blur();}render(){let e=this.localize.dir()==="rtl",r=Array.from(Array(this.max).keys()),t=0;return this.disabled||this.readonly?t=this.value:t=this.isHovering?this.hoverValue:this.value,h`
      <div
        part="base"
        class=${L({rating:true,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":e})}
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
          ${r.map(o=>t>o&&t<o+1?h`
                <span
                  class=${L({rating__symbol:true,"rating__partial-symbol-container":true,"rating__symbol--hover":this.isHovering&&Math.ceil(t)===o+1})}
                  role="presentation"
                >
                  <div
                    style=${Z({clipPath:e?`inset(0 ${(t-o)*100}% 0 0)`:`inset(0 0 0 ${(t-o)*100}%)`})}
                  >
                    ${Rt(this.getSymbol(o+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${Z({clipPath:e?`inset(0 0 0 ${100-(t-o)*100}%)`:`inset(0 ${100-(t-o)*100}% 0 0)`})}
                  >
                    ${Rt(this.getSymbol(o+1))}
                  </div>
                </span>
              `:h`
              <span
                class=${L({rating__symbol:true,"rating__symbol--hover":this.isHovering&&Math.ceil(t)===o+1,"rating__symbol--active":t>=o+1})}
                role="presentation"
              >
                ${Rt(this.getSymbol(o+1))}
              </span>
            `)}
        </span>
      </div>
    `}};Ct.styles=[z,zl];Ct.dependencies={"sl-icon":q};c([$(".rating")],Ct.prototype,"rating",2);c([k()],Ct.prototype,"hoverValue",2);c([k()],Ct.prototype,"isHovering",2);c([p()],Ct.prototype,"label",2);c([p({type:Number})],Ct.prototype,"value",2);c([p({type:Number})],Ct.prototype,"max",2);c([p({type:Number})],Ct.prototype,"precision",2);c([p({type:Boolean,reflect:true})],Ct.prototype,"readonly",2);c([p({type:Boolean,reflect:true})],Ct.prototype,"disabled",2);c([p()],Ct.prototype,"getSymbol",2);c([Ae({passive:true})],Ct.prototype,"handleTouchMove",1);c([A("hoverValue")],Ct.prototype,"handleHoverValueChange",1);c([A("isHovering")],Ct.prototype,"handleIsHoveringChange",1);Ct.define("sl-rating");exports.AutoFieldRating=class Ei extends I{getInitialOptions(){return {max:5,precision:1}}renderInput(){return h`
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
        `}renderView(){return h`<sl-rating slot="value" name="${this.name}" data-path=${this.path} value=${this.value} max=${this.options.max} readonly> </sl-rating> `}};exports.AutoFieldRating=v([T("auto-field-rating")],exports.AutoFieldRating);var Vl=y`
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
`;var Ps=class extends M{render(){return h` <slot></slot> `}};Ps.styles=[z,Vl];var Pl=y`
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
`;var F=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new dt(this,"help-text","label"),this.localize=new j(this),this.hasFocus=false,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=false,this.pill=false,this.label="",this.helpText="",this.clearable=false,this.disabled=false,this.placeholder="",this.readonly=false,this.passwordToggle=false,this.passwordVisible=false,this.noSpinButtons=false,this.form="",this.required=false,this.spellcheck=true;}get valueAsDate(){var e;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((e=this.input)==null?void 0:e.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value;}get valueAsNumber(){var e;return this.__numberInput.value=this.value,((e=this.input)==null?void 0:e.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value;}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleChange(){this.value=this.input.value,this.emit("sl-change");}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus();}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input");}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleKeyDown(e){let r=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!r&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&this.formControlController.submit();});}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible;}handleDisabledChange(){this.formControlController.setValidity(this.disabled);}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity();}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity();}focus(e){this.input.focus(e);}blur(){this.input.blur();}select(){this.input.select();}setSelectionRange(e,r,t="none"){this.input.setSelectionRange(e,r,t);}setRangeText(e,r,t,o="preserve"){let i=r??this.input.selectionStart,s=t??this.input.selectionEnd;this.input.setRangeText(e,i,s,o),this.value!==this.input.value&&(this.value=this.input.value);}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker();}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value);}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value);}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.hasSlotController.test("label"),r=this.hasSlotController.test("help-text"),t=this.label?true:!!e,o=this.helpText?true:!!r,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return h`
      <div
        part="form-control"
        class=${L({"form-control":true,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":o})}
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
              .value=${$t(this.value)}
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

            ${s?h`
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
            ${this.passwordToggle&&!this.disabled?h`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?h`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:h`
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
    `}};F.styles=[z,It,Pl];F.dependencies={"sl-icon":q};c([$(".input__control")],F.prototype,"input",2);c([k()],F.prototype,"hasFocus",2);c([p()],F.prototype,"title",2);c([p({reflect:true})],F.prototype,"type",2);c([p()],F.prototype,"name",2);c([p()],F.prototype,"value",2);c([Nt()],F.prototype,"defaultValue",2);c([p({reflect:true})],F.prototype,"size",2);c([p({type:Boolean,reflect:true})],F.prototype,"filled",2);c([p({type:Boolean,reflect:true})],F.prototype,"pill",2);c([p()],F.prototype,"label",2);c([p({attribute:"help-text"})],F.prototype,"helpText",2);c([p({type:Boolean})],F.prototype,"clearable",2);c([p({type:Boolean,reflect:true})],F.prototype,"disabled",2);c([p()],F.prototype,"placeholder",2);c([p({type:Boolean,reflect:true})],F.prototype,"readonly",2);c([p({attribute:"password-toggle",type:Boolean})],F.prototype,"passwordToggle",2);c([p({attribute:"password-visible",type:Boolean})],F.prototype,"passwordVisible",2);c([p({attribute:"no-spin-buttons",type:Boolean})],F.prototype,"noSpinButtons",2);c([p({reflect:true})],F.prototype,"form",2);c([p({type:Boolean,reflect:true})],F.prototype,"required",2);c([p()],F.prototype,"pattern",2);c([p({type:Number})],F.prototype,"minlength",2);c([p({type:Number})],F.prototype,"maxlength",2);c([p()],F.prototype,"min",2);c([p()],F.prototype,"max",2);c([p()],F.prototype,"step",2);c([p()],F.prototype,"autocapitalize",2);c([p()],F.prototype,"autocorrect",2);c([p()],F.prototype,"autocomplete",2);c([p({type:Boolean})],F.prototype,"autofocus",2);c([p()],F.prototype,"enterkeyhint",2);c([p({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],F.prototype,"spellcheck",2);c([p()],F.prototype,"inputmode",2);c([A("disabled",{waitUntilFirstUpdate:true})],F.prototype,"handleDisabledChange",1);c([A("step",{waitUntilFirstUpdate:true})],F.prototype,"handleStepChange",1);c([A("value",{waitUntilFirstUpdate:true})],F.prototype,"handleValueChange",1);function Lr(e,r){function t(i){let s=e.getBoundingClientRect(),n=e.ownerDocument.defaultView,a=s.left+n.scrollX,l=s.top+n.scrollY,d=i.pageX-a,m=i.pageY-l;r?.onMove&&r.onMove(d,m);}function o(){document.removeEventListener("pointermove",t),document.removeEventListener("pointerup",o),r?.onStop&&r.onStop();}document.addEventListener("pointermove",t,{passive:true}),document.addEventListener("pointerup",o),r?.initialEvent instanceof PointerEvent&&t(r.initialEvent);}var Dl=y`
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
`;function*Hl(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*Un(Hl(e.shadowRoot.activeElement))));}function Bl(){return [...Hl()].pop()}var Fl=new WeakMap;function jl(e){let r=Fl.get(e);return r||(r=window.getComputedStyle(e,null),Fl.set(e,r)),r}function Od(e){if(typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:false,checkVisibilityCSS:true});let r=jl(e);return r.visibility!=="hidden"&&r.display!=="none"}function Td(e){let r=jl(e),{overflowY:t,overflowX:o}=r;return t==="scroll"||o==="scroll"?true:t!=="auto"||o!=="auto"?false:e.scrollHeight>e.clientHeight&&t==="auto"||e.scrollWidth>e.clientWidth&&o==="auto"}function Rd(e){let r=e.tagName.toLowerCase(),t=Number(e.getAttribute("tabindex"));if(e.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||e.hasAttribute("disabled")||e.closest("[inert]"))return  false;if(r==="input"&&e.getAttribute("type")==="radio"){let s=e.getRootNode(),n=`input[type='radio'][name="${e.getAttribute("name")}"]`,a=s.querySelector(`${n}:checked`);return a?a===e:s.querySelector(n)===e}return Od(e)?(r==="audio"||r==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(r)?true:Td(e):false}function Nl(e){var r,t;let o=Ld(e),i=(r=o[0])!=null?r:null,s=(t=o[o.length-1])!=null?t:null;return {start:i,end:s}}function Id(e,r){var t;return ((t=e.getRootNode({composed:true}))==null?void 0:t.host)!==r}function Ld(e){let r=new WeakMap,t=[];function o(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||r.has(i))return;r.set(i,true),!t.includes(i)&&Rd(i)&&t.push(i),i instanceof HTMLSlotElement&&Id(i,e)&&i.assignedElements({flatten:true}).forEach(s=>{o(s);}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&o(i.shadowRoot);}for(let s of i.children)o(s);}return o(e),t.sort((i,s)=>{let n=Number(i.getAttribute("tabindex"))||0;return (Number(s.getAttribute("tabindex"))||0)-n})}var ft=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.open=false,this.placement="bottom-start",this.disabled=false,this.stayOpenOnSelect=false,this.distance=0,this.skidding=0,this.hoist=false,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger());},this.handleDocumentKeyDown=e=>{var r;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((r=document.activeElement)==null?void 0:r.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}let t=(o,i)=>{if(!o)return null;let s=o.closest(i);if(s)return s;let n=o.getRootNode();return n instanceof ShadowRoot?t(n.host,i):null};setTimeout(()=>{var o;let i=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?Bl():document.activeElement;(!this.containingElement||t(i,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide();});}},this.handleDocumentMouseDown=e=>{let r=e.composedPath();this.containingElement&&!r.includes(this.containingElement)&&this.hide();},this.handlePanelSelect=e=>{let r=e.target;!this.stayOpenOnSelect&&r.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger());};}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this);}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=true);}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide();}focusOnTrigger(){let e=this.trigger.assignedElements({flatten:true})[0];typeof e?.focus=="function"&&e.focus();}getMenu(){return this.panel.assignedElements({flatten:true}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger());}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}let r=this.getMenu();if(r){let t=r.getAllItems(),o=t[0],i=t[t.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),t.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(r.setCurrentItem(o),o.focus()),(e.key==="ArrowUp"||e.key==="End")&&(r.setCurrentItem(i),i.focus());}));}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault();}handleTriggerSlotChange(){this.updateAccessibleTrigger();}updateAccessibleTrigger(){let r=this.trigger.assignedElements({flatten:true}).find(o=>Nl(o).start),t;if(r){switch(r.tagName.toLowerCase()){case "sl-button":case "sl-icon-button":t=r.button;break;default:t=r;}t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false");}}async show(){if(!this.open)return this.open=true,we(this,"sl-after-show")}async hide(){if(this.open)return this.open=false,we(this,"sl-after-hide")}reposition(){this.popup.reposition();}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger();}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown);}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy();}async handleOpenChange(){if(this.disabled){this.open=false;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Xt(this),this.panel.hidden=false,this.popup.active=true;let{keyframes:e,options:r}=Gt(this,"dropdown.show",{dir:this.localize.dir()});await Yt(this.popup.popup,e,r),this.emit("sl-after-show");}else {this.emit("sl-hide"),this.removeOpenListeners(),await Xt(this);let{keyframes:e,options:r}=Gt(this,"dropdown.hide",{dir:this.localize.dir()});await Yt(this.popup.popup,e,r),this.panel.hidden=true,this.popup.active=false,this.emit("sl-after-hide");}}render(){return h`
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
    `}};ft.styles=[z,Dl];ft.dependencies={"sl-popup":X};c([$(".dropdown")],ft.prototype,"popup",2);c([$(".dropdown__trigger")],ft.prototype,"trigger",2);c([$(".dropdown__panel")],ft.prototype,"panel",2);c([p({type:Boolean,reflect:true})],ft.prototype,"open",2);c([p({reflect:true})],ft.prototype,"placement",2);c([p({type:Boolean,reflect:true})],ft.prototype,"disabled",2);c([p({attribute:"stay-open-on-select",type:Boolean,reflect:true})],ft.prototype,"stayOpenOnSelect",2);c([p({attribute:false})],ft.prototype,"containingElement",2);c([p({type:Number})],ft.prototype,"distance",2);c([p({type:Number})],ft.prototype,"skidding",2);c([p({type:Boolean})],ft.prototype,"hoist",2);c([p({reflect:true})],ft.prototype,"sync",2);c([A("open",{waitUntilFirstUpdate:true})],ft.prototype,"handleOpenChange",1);Kt("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Kt("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Wl=y`
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
`;var Ul=y`
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
`;var Se=class extends M{constructor(){super(...arguments),this.localize=new j(this);}render(){return h`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Se.styles=[z,Ul];var G=class extends M{constructor(){super(...arguments),this.formControlController=new bt(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new dt(this,"[default]","prefix","suffix"),this.localize=new j(this),this.hasFocus=false,this.invalid=false,this.title="",this.variant="default",this.size="medium",this.caret=false,this.disabled=false,this.loading=false,this.outline=false,this.pill=false,this.circle=false,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener";}get validity(){return this.isButton()?this.button.validity:Sr}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity();}handleBlur(){this.hasFocus=false,this.emit("sl-blur");}handleFocus(){this.hasFocus=true,this.emit("sl-focus");}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this);}handleInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}isButton(){return !this.href}isLink(){return !!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled);}click(){this.button.click();}focus(e){this.button.focus(e);}blur(){this.button.blur();}checkValidity(){return this.isButton()?this.button.checkValidity():true}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():true}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity());}render(){let e=this.isLink(),r=e?kr`a`:kr`button`;return Me`
      <${r}
        part="base"
        class=${L({button:true,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${w(e?void 0:this.disabled)}
        type=${w(e?void 0:this.type)}
        title=${this.title}
        name=${w(e?void 0:this.name)}
        value=${w(e?void 0:this.value)}
        href=${w(e&&!this.disabled?this.href:void 0)}
        target=${w(e?this.target:void 0)}
        download=${w(e?this.download:void 0)}
        rel=${w(e?this.rel:void 0)}
        role=${w(e?void 0:"button")}
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
        ${this.caret?Me` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Me`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${r}>
    `}};G.styles=[z,oi];G.dependencies={"sl-icon":q,"sl-spinner":Se};c([$(".button")],G.prototype,"button",2);c([k()],G.prototype,"hasFocus",2);c([k()],G.prototype,"invalid",2);c([p()],G.prototype,"title",2);c([p({reflect:true})],G.prototype,"variant",2);c([p({reflect:true})],G.prototype,"size",2);c([p({type:Boolean,reflect:true})],G.prototype,"caret",2);c([p({type:Boolean,reflect:true})],G.prototype,"disabled",2);c([p({type:Boolean,reflect:true})],G.prototype,"loading",2);c([p({type:Boolean,reflect:true})],G.prototype,"outline",2);c([p({type:Boolean,reflect:true})],G.prototype,"pill",2);c([p({type:Boolean,reflect:true})],G.prototype,"circle",2);c([p()],G.prototype,"type",2);c([p()],G.prototype,"name",2);c([p()],G.prototype,"value",2);c([p()],G.prototype,"href",2);c([p()],G.prototype,"target",2);c([p()],G.prototype,"rel",2);c([p()],G.prototype,"download",2);c([p()],G.prototype,"form",2);c([p({attribute:"formaction"})],G.prototype,"formAction",2);c([p({attribute:"formenctype"})],G.prototype,"formEnctype",2);c([p({attribute:"formmethod"})],G.prototype,"formMethod",2);c([p({attribute:"formnovalidate",type:Boolean})],G.prototype,"formNoValidate",2);c([p({attribute:"formtarget"})],G.prototype,"formTarget",2);c([A("disabled",{waitUntilFirstUpdate:true})],G.prototype,"handleDisabledChange",1);function gt(e,r){Md(e)&&(e="100%");let t=zd(e);return e=r===360?e:Math.min(r,Math.max(0,parseFloat(e))),t&&(e=parseInt(String(e*r),10)/100),Math.abs(e-r)<1e-6?1:(r===360?e=(e<0?e%r+r:e%r)/parseFloat(String(r)):e=e%r/parseFloat(String(r)),e)}function wo(e){return Math.min(1,Math.max(0,e))}function Md(e){return typeof e=="string"&&e.indexOf(".")!==-1&&parseFloat(e)===1}function zd(e){return typeof e=="string"&&e.indexOf("%")!==-1}function Ai(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function Co(e){return Number(e)<=1?`${Number(e)*100}%`:e}function De(e){return e.length===1?"0"+e:String(e)}function ql(e,r,t){return {r:gt(e,255)*255,g:gt(r,255)*255,b:gt(t,255)*255}}function Fs(e,r,t){e=gt(e,255),r=gt(r,255),t=gt(t,255);let o=Math.max(e,r,t),i=Math.min(e,r,t),s=0,n=0,a=(o+i)/2;if(o===i)n=0,s=0;else {let l=o-i;switch(n=a>.5?l/(2-o-i):l/(o+i),o){case e:s=(r-t)/l+(r<t?6:0);break;case r:s=(t-e)/l+2;break;case t:s=(e-r)/l+4;break;}s/=6;}return {h:s,s:n,l:a}}function Ds(e,r,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?e+(r-e)*(6*t):t<1/2?r:t<2/3?e+(r-e)*(2/3-t)*6:e}function Kl(e,r,t){let o,i,s;if(e=gt(e,360),r=gt(r,100),t=gt(t,100),r===0)i=t,s=t,o=t;else {let n=t<.5?t*(1+r):t+r-t*r,a=2*t-n;o=Ds(a,n,e+1/3),i=Ds(a,n,e),s=Ds(a,n,e-1/3);}return {r:o*255,g:i*255,b:s*255}}function Hs(e,r,t){e=gt(e,255),r=gt(r,255),t=gt(t,255);let o=Math.max(e,r,t),i=Math.min(e,r,t),s=0,n=o,a=o-i,l=o===0?0:a/o;if(o===i)s=0;else {switch(o){case e:s=(r-t)/a+(r<t?6:0);break;case r:s=(t-e)/a+2;break;case t:s=(e-r)/a+4;break;}s/=6;}return {h:s,s:l,v:n}}function Gl(e,r,t){e=gt(e,360)*6,r=gt(r,100),t=gt(t,100);let o=Math.floor(e),i=e-o,s=t*(1-r),n=t*(1-i*r),a=t*(1-(1-i)*r),l=o%6,d=[t,n,s,s,a,t][l],m=[a,t,t,n,s,s][l],u=[s,s,a,t,t,n][l];return {r:d*255,g:m*255,b:u*255}}function Bs(e,r,t,o){let i=[De(Math.round(e).toString(16)),De(Math.round(r).toString(16)),De(Math.round(t).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function Yl(e,r,t,o,i){let s=[De(Math.round(e).toString(16)),De(Math.round(r).toString(16)),De(Math.round(t).toString(16)),De(Vd(o))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function Xl(e,r,t,o){let i=e/100,s=r/100,n=t/100,a=o/100,l=255*(1-i)*(1-a),d=255*(1-s)*(1-a),m=255*(1-n)*(1-a);return {r:l,g:d,b:m}}function js(e,r,t){let o=1-e/255,i=1-r/255,s=1-t/255,n=Math.min(o,i,s);return n===1?(o=0,i=0,s=0):(o=(o-n)/(1-n)*100,i=(i-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(o),m:Math.round(i),y:Math.round(s),k:Math.round(n)}}function Vd(e){return Math.round(parseFloat(e)*255).toString(16)}function Ns(e){return Mt(e)/255}function Mt(e){return parseInt(e,16)}function Jl(e){return {r:e>>16,g:(e&65280)>>8,b:e&255}}var So={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Ql(e){let r={r:0,g:0,b:0},t=1,o=null,i=null,s=null,n=false,a=false;return typeof e=="string"&&(e=Fd(e)),typeof e=="object"&&(Bt(e.r)&&Bt(e.g)&&Bt(e.b)?(r=ql(e.r,e.g,e.b),n=true,a=String(e.r).substr(-1)==="%"?"prgb":"rgb"):Bt(e.h)&&Bt(e.s)&&Bt(e.v)?(o=Co(e.s),i=Co(e.v),r=Gl(e.h,o,i),n=true,a="hsv"):Bt(e.h)&&Bt(e.s)&&Bt(e.l)?(o=Co(e.s),s=Co(e.l),r=Kl(e.h,o,s),n=true,a="hsl"):Bt(e.c)&&Bt(e.m)&&Bt(e.y)&&Bt(e.k)&&(r=Xl(e.c,e.m,e.y,e.k),n=true,a="cmyk"),Object.prototype.hasOwnProperty.call(e,"a")&&(t=e.a)),t=Ai(t),{ok:n,format:e.format||a,r:Math.min(255,Math.max(r.r,0)),g:Math.min(255,Math.max(r.g,0)),b:Math.min(255,Math.max(r.b,0)),a:t}}var Pd="[-\\+]?\\d+%?",Dd="[-\\+]?\\d*\\.\\d+%?",Fe="(?:"+Dd+")|(?:"+Pd+")",Ws="[\\s|\\(]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")\\s*\\)?",Oi="[\\s|\\(]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")\\s*\\)?",Qt={CSS_UNIT:new RegExp(Fe),rgb:new RegExp("rgb"+Ws),rgba:new RegExp("rgba"+Oi),hsl:new RegExp("hsl"+Ws),hsla:new RegExp("hsla"+Oi),hsv:new RegExp("hsv"+Ws),hsva:new RegExp("hsva"+Oi),cmyk:new RegExp("cmyk"+Oi),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Fd(e){if(e=e.trim().toLowerCase(),e.length===0)return  false;let r=false;if(So[e])e=So[e],r=true;else if(e==="transparent")return {r:0,g:0,b:0,a:0,format:"name"};let t=Qt.rgb.exec(e);return t?{r:t[1],g:t[2],b:t[3]}:(t=Qt.rgba.exec(e),t?{r:t[1],g:t[2],b:t[3],a:t[4]}:(t=Qt.hsl.exec(e),t?{h:t[1],s:t[2],l:t[3]}:(t=Qt.hsla.exec(e),t?{h:t[1],s:t[2],l:t[3],a:t[4]}:(t=Qt.hsv.exec(e),t?{h:t[1],s:t[2],v:t[3]}:(t=Qt.hsva.exec(e),t?{h:t[1],s:t[2],v:t[3],a:t[4]}:(t=Qt.cmyk.exec(e),t?{c:t[1],m:t[2],y:t[3],k:t[4]}:(t=Qt.hex8.exec(e),t?{r:Mt(t[1]),g:Mt(t[2]),b:Mt(t[3]),a:Ns(t[4]),format:r?"name":"hex8"}:(t=Qt.hex6.exec(e),t?{r:Mt(t[1]),g:Mt(t[2]),b:Mt(t[3]),format:r?"name":"hex"}:(t=Qt.hex4.exec(e),t?{r:Mt(t[1]+t[1]),g:Mt(t[2]+t[2]),b:Mt(t[3]+t[3]),a:Ns(t[4]+t[4]),format:r?"name":"hex8"}:(t=Qt.hex3.exec(e),t?{r:Mt(t[1]+t[1]),g:Mt(t[2]+t[2]),b:Mt(t[3]+t[3]),format:r?"name":"hex"}:false))))))))))}function Bt(e){return typeof e=="number"?!Number.isNaN(e):Qt.CSS_UNIT.test(e)}var ko=class e{constructor(r="",t={}){if(r instanceof e)return r;typeof r=="number"&&(r=Jl(r)),this.originalInput=r;let o=Ql(r);this.originalInput=r,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=t.format??o.format,this.gradientType=t.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok;}isDark(){return this.getBrightness()<128}isLight(){return !this.isDark()}getBrightness(){let r=this.toRgb();return (r.r*299+r.g*587+r.b*114)/1e3}getLuminance(){let r=this.toRgb(),t,o,i,s=r.r/255,n=r.g/255,a=r.b/255;return s<=.03928?t=s/12.92:t=Math.pow((s+.055)/1.055,2.4),n<=.03928?o=n/12.92:o=Math.pow((n+.055)/1.055,2.4),a<=.03928?i=a/12.92:i=Math.pow((a+.055)/1.055,2.4),.2126*t+.7152*o+.0722*i}getAlpha(){return this.a}setAlpha(r){return this.a=Ai(r),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:r}=this.toHsl();return r===0}toHsv(){let r=Hs(this.r,this.g,this.b);return {h:r.h*360,s:r.s,v:r.v,a:this.a}}toHsvString(){let r=Hs(this.r,this.g,this.b),t=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.v*100);return this.a===1?`hsv(${t}, ${o}%, ${i}%)`:`hsva(${t}, ${o}%, ${i}%, ${this.roundA})`}toHsl(){let r=Fs(this.r,this.g,this.b);return {h:r.h*360,s:r.s,l:r.l,a:this.a}}toHslString(){let r=Fs(this.r,this.g,this.b),t=Math.round(r.h*360),o=Math.round(r.s*100),i=Math.round(r.l*100);return this.a===1?`hsl(${t}, ${o}%, ${i}%)`:`hsla(${t}, ${o}%, ${i}%, ${this.roundA})`}toHex(r=false){return Bs(this.r,this.g,this.b,r)}toHexString(r=false){return "#"+this.toHex(r)}toHex8(r=false){return Yl(this.r,this.g,this.b,this.a,r)}toHex8String(r=false){return "#"+this.toHex8(r)}toHexShortString(r=false){return this.a===1?this.toHexString(r):this.toHex8String(r)}toRgb(){return {r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let r=Math.round(this.r),t=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${r}, ${t}, ${o})`:`rgba(${r}, ${t}, ${o}, ${this.roundA})`}toPercentageRgb(){let r=t=>`${Math.round(gt(t,255)*100)}%`;return {r:r(this.r),g:r(this.g),b:r(this.b),a:this.a}}toPercentageRgbString(){let r=t=>Math.round(gt(t,255)*100);return this.a===1?`rgb(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%)`:`rgba(${r(this.r)}%, ${r(this.g)}%, ${r(this.b)}%, ${this.roundA})`}toCmyk(){return {...js(this.r,this.g,this.b)}}toCmykString(){let{c:r,m:t,y:o,k:i}=js(this.r,this.g,this.b);return `cmyk(${r}, ${t}, ${o}, ${i})`}toName(){if(this.a===0)return "transparent";if(this.a<1)return  false;let r="#"+Bs(this.r,this.g,this.b,false);for(let[t,o]of Object.entries(So))if(r===o)return t;return  false}toString(r){let t=!!r;r=r??this.format;let o=false,i=this.a<1&&this.a>=0;return !t&&i&&(r.startsWith("hex")||r==="name")?r==="name"&&this.a===0?this.toName():this.toRgbString():(r==="rgb"&&(o=this.toRgbString()),r==="prgb"&&(o=this.toPercentageRgbString()),(r==="hex"||r==="hex6")&&(o=this.toHexString()),r==="hex3"&&(o=this.toHexString(true)),r==="hex4"&&(o=this.toHex8String(true)),r==="hex8"&&(o=this.toHex8String()),r==="name"&&(o=this.toName()),r==="hsl"&&(o=this.toHslString()),r==="hsv"&&(o=this.toHsvString()),r==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return (Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new e(this.toString())}lighten(r=10){let t=this.toHsl();return t.l+=r/100,t.l=wo(t.l),new e(t)}brighten(r=10){let t=this.toRgb();return t.r=Math.max(0,Math.min(255,t.r-Math.round(255*-(r/100)))),t.g=Math.max(0,Math.min(255,t.g-Math.round(255*-(r/100)))),t.b=Math.max(0,Math.min(255,t.b-Math.round(255*-(r/100)))),new e(t)}darken(r=10){let t=this.toHsl();return t.l-=r/100,t.l=wo(t.l),new e(t)}tint(r=10){return this.mix("white",r)}shade(r=10){return this.mix("black",r)}desaturate(r=10){let t=this.toHsl();return t.s-=r/100,t.s=wo(t.s),new e(t)}saturate(r=10){let t=this.toHsl();return t.s+=r/100,t.s=wo(t.s),new e(t)}greyscale(){return this.desaturate(100)}spin(r){let t=this.toHsl(),o=(t.h+r)%360;return t.h=o<0?360+o:o,new e(t)}mix(r,t=50){let o=this.toRgb(),i=new e(r).toRgb(),s=t/100,n={r:(i.r-o.r)*s+o.r,g:(i.g-o.g)*s+o.g,b:(i.b-o.b)*s+o.b,a:(i.a-o.a)*s+o.a};return new e(n)}analogous(r=6,t=30){let o=this.toHsl(),i=360/t,s=[this];for(o.h=(o.h-(i*r>>1)+720)%360;--r;)o.h=(o.h+i)%360,s.push(new e(o));return s}complement(){let r=this.toHsl();return r.h=(r.h+180)%360,new e(r)}monochromatic(r=6){let t=this.toHsv(),{h:o}=t,{s:i}=t,{v:s}=t,n=[],a=1/r;for(;r--;)n.push(new e({h:o,s:i,v:s})),s=(s+a)%1;return n}splitcomplement(){let r=this.toHsl(),{h:t}=r;return [this,new e({h:(t+72)%360,s:r.s,l:r.l}),new e({h:(t+216)%360,s:r.s,l:r.l})]}onBackground(r){let t=this.toRgb(),o=new e(r).toRgb(),i=t.a+o.a*(1-t.a);return new e({r:(t.r*t.a+o.r*o.a*(1-t.a))/i,g:(t.g*t.a+o.g*o.a*(1-t.a))/i,b:(t.b*t.a+o.b*o.a*(1-t.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(r){let t=this.toHsl(),{h:o}=t,i=[this],s=360/r;for(let n=1;n<r;n++)i.push(new e({h:(o+n*s)%360,s:t.s,l:t.l}));return i}equals(r){let t=new e(r);return this.format==="cmyk"||t.format==="cmyk"?this.toCmykString()===t.toCmykString():this.toRgbString()===t.toRgbString()}};var Zl="EyeDropper"in window,W=class extends M{constructor(){super(),this.formControlController=new bt(this),this.isSafeValue=false,this.localize=new j(this),this.hasFocus=false,this.isDraggingGridHandle=false,this.isEmpty=false,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=false,this.size="medium",this.noFormatToggle=false,this.name="",this.disabled=false,this.hoist=false,this.opacity=false,this.uppercase=false,this.swatches="",this.form="",this.required=false,this.handleFocusIn=()=>{this.hasFocus=true,this.emit("sl-focus");},this.handleFocusOut=()=>{this.hasFocus=false,this.emit("sl-blur");},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut);}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity();});}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied");});}handleFormatToggle(){let e=["hex","rgb","hsl","hsv"],r=(e.indexOf(this.format)+1)%e.length;this.format=e[r],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input");}handleAlphaDrag(e){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),t=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;t.focus(),e.preventDefault(),Lr(r,{onMove:n=>{this.alpha=ht(n/o*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:e});}handleHueDrag(e){let r=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),t=r.querySelector(".color-picker__slider-handle"),{width:o}=r.getBoundingClientRect(),i=this.value,s=this.value;t.focus(),e.preventDefault(),Lr(r,{onMove:n=>{this.hue=ht(n/o*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"));},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"));},initialEvent:e});}handleGridDrag(e){let r=this.shadowRoot.querySelector(".color-picker__grid"),t=r.querySelector(".color-picker__grid-handle"),{width:o,height:i}=r.getBoundingClientRect(),s=this.value,n=this.value;t.focus(),e.preventDefault(),this.isDraggingGridHandle=true,Lr(r,{onMove:(a,l)=>{this.saturation=ht(a/o*100,0,100),this.brightness=ht(100-l/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"));},onStop:()=>{this.isDraggingGridHandle=false,this.value!==s&&(s=this.value,this.emit("sl-change"));},initialEvent:e});}handleAlphaKeyDown(e){let r=e.shiftKey?10:1,t=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.alpha=ht(this.alpha-r,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.alpha=ht(this.alpha+r,0,100),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.alpha=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.alpha=100,this.syncValues()),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleHueKeyDown(e){let r=e.shiftKey?10:1,t=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.hue=ht(this.hue-r,0,360),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.hue=ht(this.hue+r,0,360),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.hue=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.hue=360,this.syncValues()),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleGridKeyDown(e){let r=e.shiftKey?10:1,t=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.saturation=ht(this.saturation-r,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.saturation=ht(this.saturation+r,0,100),this.syncValues()),e.key==="ArrowUp"&&(e.preventDefault(),this.brightness=ht(this.brightness+r,0,100),this.syncValues()),e.key==="ArrowDown"&&(e.preventDefault(),this.brightness=ht(this.brightness-r,0,100),this.syncValues()),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputChange(e){let r=e.target,t=this.value;e.stopPropagation(),this.input.value?(this.setColor(r.value),r.value=this.value):this.value="",this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}handleInputInput(e){this.formControlController.updateValidity(),e.stopPropagation();}handleInputKeyDown(e){if(e.key==="Enter"){let r=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0;}}handleInputInvalid(e){this.formControlController.setValidity(false),this.formControlController.emitInvalidEvent(e);}handleTouchMove(e){e.preventDefault();}parseColor(e){let r=new ko(e);if(!r.isValid)return null;let t=r.toHsl(),o={h:t.h,s:t.s*100,l:t.l*100,a:t.a},i=r.toRgb(),s=r.toHexString(),n=r.toHex8String(),a=r.toHsv(),l={h:a.h,s:a.s*100,v:a.v*100,a:a.a};return {hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(e){let r=this.parseColor(e);return r===null?false:(this.hue=r.hsva.h,this.saturation=r.hsva.s,this.brightness=r.hsva.v,this.alpha=this.opacity?r.hsva.a*100:100,this.syncValues(),true)}setLetterCase(e){return typeof e!="string"?"":this.uppercase?e.toUpperCase():e.toLowerCase()}async syncValues(){let e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);e!==null&&(this.format==="hsl"?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?e.hsva.string:e.hsv.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=true,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=false);}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied");}handleEyeDropper(){if(!Zl)return;new EyeDropper().open().then(r=>{let t=this.value;this.setColor(r.sRGBHex),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"));}).catch(()=>{});}selectSwatch(e){let r=this.value;this.disabled||(this.setColor(e),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")));}getHexString(e,r,t,o=100){let i=new ko(`hsva(${e}, ${r}%, ${t}%, ${o/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(e){e.stopImmediatePropagation();}handleFormatChange(){this.syncValues();}handleOpacityChange(){this.alpha=100;}handleValueChange(e,r){if(this.isEmpty=!r,r||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let t=this.parseColor(r);t!==null?(this.inputValue=this.value,this.hue=t.hsva.h,this.saturation=t.hsva.s,this.brightness=t.hsva.v,this.alpha=t.hsva.a*100,this.syncValues()):this.inputValue=e??"";}}focus(e){this.inline?this.base.focus(e):this.trigger.focus(e);}blur(){var e;let r=this.inline?this.base:this.trigger;this.hasFocus&&(r.focus({preventScroll:true}),r.blur()),(e=this.dropdown)!=null&&e.open&&this.dropdown.hide();}getFormattedValue(e="hex"){let r=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(r===null)return "";switch(e){case "hex":return r.hex;case "hexa":return r.hexa;case "rgb":return r.rgb.string;case "rgba":return r.rgba.string;case "hsl":return r.hsl.string;case "hsla":return r.hsla.string;case "hsv":return r.hsv.string;case "hsva":return r.hsva.string;default:return ""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return !this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:true}),this.disabled||this.formControlController.emitInvalidEvent(),false):this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity();}render(){let e=this.saturation,r=100-this.brightness,t=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),o=h`
      <div
        part="base"
        class=${L({"color-picker":true,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?h`
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
            class=${L({"color-picker__grid-handle":true,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${Z({top:`${r}%`,left:`${e}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
                style=${Z({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
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

            ${this.opacity?h`
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
            ${this.noFormatToggle?"":h`
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
            ${Zl?h`
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

        ${t.length>0?h`
              <div part="swatches" class="color-picker__swatches">
                ${t.map(i=>{let s=this.parseColor(i);return s?h`
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
                        style=${Z({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${i}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?o:h`
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
          style=${Z({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${o}
      </sl-dropdown>
    `}};W.styles=[z,Wl];W.dependencies={"sl-button-group":Le,"sl-button":G,"sl-dropdown":ft,"sl-icon":q,"sl-input":F,"sl-visually-hidden":Ps};c([$('[part~="base"]')],W.prototype,"base",2);c([$('[part~="input"]')],W.prototype,"input",2);c([$(".color-dropdown")],W.prototype,"dropdown",2);c([$('[part~="preview"]')],W.prototype,"previewButton",2);c([$('[part~="trigger"]')],W.prototype,"trigger",2);c([k()],W.prototype,"hasFocus",2);c([k()],W.prototype,"isDraggingGridHandle",2);c([k()],W.prototype,"isEmpty",2);c([k()],W.prototype,"inputValue",2);c([k()],W.prototype,"hue",2);c([k()],W.prototype,"saturation",2);c([k()],W.prototype,"brightness",2);c([k()],W.prototype,"alpha",2);c([p()],W.prototype,"value",2);c([Nt()],W.prototype,"defaultValue",2);c([p()],W.prototype,"label",2);c([p()],W.prototype,"format",2);c([p({type:Boolean,reflect:true})],W.prototype,"inline",2);c([p({reflect:true})],W.prototype,"size",2);c([p({attribute:"no-format-toggle",type:Boolean})],W.prototype,"noFormatToggle",2);c([p()],W.prototype,"name",2);c([p({type:Boolean,reflect:true})],W.prototype,"disabled",2);c([p({type:Boolean})],W.prototype,"hoist",2);c([p({type:Boolean})],W.prototype,"opacity",2);c([p({type:Boolean})],W.prototype,"uppercase",2);c([p()],W.prototype,"swatches",2);c([p({reflect:true})],W.prototype,"form",2);c([p({type:Boolean,reflect:true})],W.prototype,"required",2);c([Ae({passive:false})],W.prototype,"handleTouchMove",1);c([A("format",{waitUntilFirstUpdate:true})],W.prototype,"handleFormatChange",1);c([A("opacity",{waitUntilFirstUpdate:true})],W.prototype,"handleOpacityChange",1);c([A("value")],W.prototype,"handleValueChange",1);W.define("sl-color-picker");var Hd=["#ffffff","#f1f1f1","#bfbfbf","#262626","#f5222d","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96"];exports.AutoFieldColorPicker=class $o extends I{getInitialOptions(){return {format:"hex",opacity:false,inline:false,swatches:Hd}}renderInput(){return h`
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
        `}_onClickPresetColor(r){this.input.value=r.target.dataset.color,this.onFieldInput();}_renderColors(){if(this.options.presets)return h`${et(this.options.presets,r=>h`<span
                data-color="${r}"
                    @click=${this._onClickPresetColor}
                    class="preset-color${this.value===r?" selected":""}" style="background-color:${r};"></span>`)}`}renderView(){return h`<span><span class="color"   style="background-color:${this.value};"></span>${this.value}</span>`}};exports.AutoFieldColorPicker.styles=[I.styles,y`
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
        `],exports.AutoFieldColorPicker=v([T("auto-field-colorpicker")],exports.AutoFieldColorPicker);exports.AutoFieldCheckboxGroup=class Eo extends I{constructor(){super(...arguments);this.valueKey="value";this.selection=[];this.items=[];this.isShowIcon=false;}getInitialOptions(){return {valueKey:"value",card:false}}connectedCallback(){super.connectedCallback(),this.valueKey=this.options.valueKey,this.items=this.options.select.map((t,o)=>{let i={};return typeof t=="object"?Object.assign(i,t):Object.assign(i,{id:t,label:t,value:t}),i.icon&&(this.isShowIcon=true),i.$index=o,i}),this.selection=this.value;}renderInput(){return h`
            <div class="items">
                ${this.items.map(t=>this.renderCheckItemWithCard(this.renderCheckboxItem(t),t))}
            </div>
        `}renderCheckboxItem(t){return h`
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
        `}_onCheckChange(t){let o=t.target.closest(".card")||t.target,i=Number(o.dataset.index),s=o.checked??!o.classList.contains("selected"),n=this.items[i];if(n){if(s)this.selection.includes(n[this.valueKey])||this.selection.push(n[this.valueKey]);else {let a=this.selection.findIndex(l=>l===n[this.valueKey]);a>-1&&this.selection.splice(a,1);}this.onFieldChange();}}getInputValue(){return this.selection}renderCheckItemWithCard(t,o){if(this.options.card){let i=this.selection.includes(o[this.valueKey]);return h`<div
                class="card ${i?"selected":""}"
                data-index="${o.$index}"
                style=${Z({width:this.options.itemWidth})}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">${B(this.isShowIcon,()=>h`<sl-icon class="icon" name="${o.icon||""}"></sl-icon>`)} ${t}</div>
            </div>`}else return t}};exports.AutoFieldCheckboxGroup.styles=[I.styles,y`
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
        `],exports.AutoFieldCheckboxGroup=v([T("auto-field-checkbox-group")],exports.AutoFieldCheckboxGroup);exports.AutoFieldParts=class Ao extends I{constructor(){super(...arguments);this.parts=[];}getInitialOptions(){return {template:"0000",delimiter:"",caseType:"both",includeDelimiter:true,onlyNumber:false}}_isValidChar(t){return this.options.chars?new RegExp(this.options.chars).test(t):true}_onKeyDown(t){let o=t.key;o.length===1&&(this._isValidChar(o)||t.preventDefault(),t.stopPropagation());}_onPartInput(t){let i=Array.from(this.shadow.querySelectorAll("sl-input")).reduce((n,a)=>(n+=a.value,this.options.caseType==="upper"?n.toUpperCase():this.options.caseType==="lower"?n.toLowerCase():n),""),s=0;this.parts.forEach((n,a)=>{this.options.delimiter.includes(n)||(this.parts[a]=i[s++]);}),this.onFieldChange(),this._isLastInput(t);}getInputValue(){return this.options.includeDelimiter?this.parts.join(""):this.parts.reduce((t,o)=>this.options.delimiter.includes(o)?t:`${t}${o}`,"")}_isLastInput(t){let o=t.target;if(o.value.length>=1){o.blur();let i=o.nextElementSibling||o.nextElementSibling?.nextElementSibling;i&&(i.focus(),i.select());}}_onPaste(t){t.preventDefault();let o=t.clipboardData?.getData("text/plain")||"",i=this._parseParts(o),s=a=>{if(a){for(;n=n.nextElementSibling,n;)if(n.tagName==="SL-INPUT")return n}},n=this.shadow.querySelector("sl-input");if(n){for(let a of i)if(!this.options.delimiter.includes(a)&&(n.value=a,n=s(n),!n))break}}connectedCallback(){super.connectedCallback(),this.parts=this._parseParts(this.value);}_parseParts(t){let o=this.options.delimiter,i=this.options.template,s=0;return Array.from(i).map(n=>{if(o.includes(n))return t[s]===n&&s++,n;{let a=t[s++]||n;return this.options.caseType==="upper"?a.toUpperCase():this.options.caseType==="lower"?a.toLowerCase():a}})}_onPartFocus(t){t.target.select();}renderPart(t){return h`<sl-input
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
        ></sl-input>`}renderInput(){return h`
            <auto-flex grow="none" align="center" gap="0.5em" wrap>
                ${et(this.parts,t=>this.options.delimiter.includes(t)?h`${t}`:this.renderPart(t))}
            </auto-flex>
        `}};exports.AutoFieldParts.styles=[I.styles,y`
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
        `],exports.AutoFieldParts=v([T("auto-field-parts")],exports.AutoFieldParts);var tc=y`
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
`;var Ti=class extends M{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu");}handleClick(e){let r=["menuitem","menuitemcheckbox"],t=e.composedPath(),o=t.find(a=>{var l;return r.includes(((l=a?.getAttribute)==null?void 0:l.call(a,"role"))||"")});if(!o||t.find(a=>{var l;return ((l=a?.getAttribute)==null?void 0:l.call(a,"role"))==="menu"})!==this)return;let n=o;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}});}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){let r=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),r?.click();}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){let r=this.getAllItems(),t=this.getCurrentItem(),o=t?r.indexOf(t):0;r.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?o++:e.key==="ArrowUp"?o--:e.key==="Home"?o=0:e.key==="End"&&(o=r.length-1),o<0&&(o=r.length-1),o>r.length-1&&(o=0),this.setCurrentItem(r[o]),r[o].focus());}}handleMouseDown(e){let r=e.target;this.isMenuItem(r)&&this.setCurrentItem(r);}handleSlotChange(){let e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0]);}isMenuItem(e){var r;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((r=e.getAttribute("role"))!=null?r:"")}getAllItems(){return [...this.defaultSlot.assignedElements({flatten:true})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(t=>{t.setAttribute("tabindex",t===e?"0":"-1");});}render(){return h`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Ti.styles=[z,tc];c([$("slot")],Ti.prototype,"defaultSlot",2);Ti.define("sl-menu");var ec=y`
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
`;var Oo=(e,r)=>{let t=e._$AN;if(t===void 0)return  false;for(let o of t)o._$AO?.(r,false),Oo(o,r);return  true},Ri=e=>{let r,t;do{if((r=e._$AM)===void 0)break;t=r._$AN,t.delete(e),e=r;}while(t?.size===0)},rc=e=>{for(let r;r=e._$AM;e=r){let t=r._$AN;if(t===void 0)r._$AN=t=new Set;else if(t.has(e))break;t.add(e),Nd(r);}};function Bd(e){this._$AN!==void 0?(Ri(this),this._$AM=e,rc(this)):this._$AM=e;}function jd(e,r=false,t=0){let o=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(r)if(Array.isArray(o))for(let s=t;s<o.length;s++)Oo(o[s],false),Ri(o[s]);else o!=null&&(Oo(o,false),Ri(o));else Oo(this,e);}var Nd=e=>{e.type==_t.CHILD&&(e._$AP??=jd,e._$AQ??=Bd);},Ii=class extends Tt{constructor(){super(...arguments),this._$AN=void 0;}_$AT(r,t,o){super._$AT(r,t,o),rc(this),this.isConnected=r._$AU;}_$AO(r,t=true){r!==this.isConnected&&(this.isConnected=r,r?this.reconnected?.():this.disconnected?.()),t&&(Oo(this,r),Ri(this));}setValue(r){if(Jo(this._$Ct))this._$Ct._$AI(r,this);else {let t=[...this._$Ct._$AH];t[this._$Ci]=r,this._$Ct._$AI(t,this,0);}}disconnected(){}reconnected(){}};var oc=()=>new qs,qs=class{},Us=new WeakMap,ic=Dt(class extends Ii{render(e){return Y}update(e,[r]){let t=r!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=r,this.ht=e.options?.host,this.rt(this.ct=e.element)),Y}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){let r=this.ht??globalThis,t=Us.get(r);t===void 0&&(t=new WeakMap,Us.set(r,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,e),e!==void 0&&this.G.call(this.ht,e);}else this.G.value=e;}get lt(){return typeof this.G=="function"?Us.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});var sc=class{constructor(e,r){this.popupRef=oc(),this.enableSubmenuTimer=-1,this.isConnected=false,this.isPopupConnected=false,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`);},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu();},this.handleKeyDown=t=>{switch(t.key){case "Escape":case "Tab":this.disableSubmenu();break;case "ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case "ArrowRight":case "Enter":case " ":this.handleSubmenuEntry(t);break;}},this.handleClick=t=>{var o;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&(t.target.tagName==="sl-menu-item"||(o=t.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu();},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu();},this.handlePopupMouseover=t=>{t.stopPropagation();},this.handlePopupReposition=()=>{let t=this.host.renderRoot.querySelector("slot[name='submenu']"),o=t?.assignedElements({flatten:true}).filter(d=>d.localName==="sl-menu")[0],i=getComputedStyle(this.host).direction==="rtl";if(!o)return;let{left:s,top:n,width:a,height:l}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${i?s+a:s}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${i?s+a:s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`);},(this.host=e).addController(this),this.hasSlotController=r;}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners();}hostDisconnected(){this.removeListeners();}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners();}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=true),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=true);}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=false),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=false);}handleSubmenuEntry(e){let r=this.host.renderRoot.querySelector("slot[name='submenu']");if(!r){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let t=null;for(let o of r.assignedElements())if(t=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),t.length!==0)break;if(!(!t||t.length===0)){t[0].setAttribute("tabindex","0");for(let o=1;o!==t.length;++o)t[o].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?t[0]instanceof HTMLElement&&t[0].focus():(this.enableSubmenu(false),this.host.updateComplete.then(()=>{t[0]instanceof HTMLElement&&t[0].focus();}),this.host.requestUpdate()));}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate());}enableSubmenu(e=true){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(true);},this.submenuOpenDelay)):this.setSubmenuState(true);}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(false);}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;let r=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((i,s)=>{var n;let a=(n=r.get(s))!=null?n:new CSSUnitValue(0,"px"),d=(a instanceof CSSUnitValue?a:new CSSUnitValue(0,"px")).to("px");return i-d.value},0);this.skidding=o;}isExpanded(){return this.popupRef.value?this.popupRef.value.active:false}renderSubmenu(){let e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?h`
      <sl-popup
        ${ic(this.popupRef)}
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
    `:h` <slot name="submenu" hidden></slot> `}};var zt=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.type="normal",this.checked=false,this.value="",this.loading=false,this.disabled=false,this.hasSlotController=new dt(this,"submenu"),this.submenuController=new sc(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation());},this.handleMouseOver=e=>{this.focus(),e.stopPropagation();};}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver);}handleDefaultSlotChange(){let e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:true,composed:false,cancelable:false}));}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=false,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"));}getTextLabel(){return aa(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let e=this.localize.dir()==="rtl",r=this.submenuController.isExpanded();return h`
      <div
        id="anchor"
        part="base"
        class=${L({"menu-item":true,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":r})}
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
        ${this.loading?h` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};zt.styles=[z,ec];zt.dependencies={"sl-icon":q,"sl-popup":X,"sl-spinner":Se};c([$("slot:not([name])")],zt.prototype,"defaultSlot",2);c([$(".menu-item")],zt.prototype,"menuItem",2);c([p()],zt.prototype,"type",2);c([p({type:Boolean,reflect:true})],zt.prototype,"checked",2);c([p()],zt.prototype,"value",2);c([p({type:Boolean,reflect:true})],zt.prototype,"loading",2);c([p({type:Boolean,reflect:true})],zt.prototype,"disabled",2);c([A("checked")],zt.prototype,"handleCheckedChange",1);c([A("disabled")],zt.prototype,"handleDisabledChange",1);c([A("type")],zt.prototype,"handleTypeChange",1);zt.define("sl-menu-item");var nc=y`
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
`;var Ks=()=>null,Vt=class extends M{constructor(){super(...arguments),this.isCollapsed=false,this.localize=new j(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=false,this.disabled=false,this.snapValue="",this.snapFunction=Ks,this.snapThreshold=12;}toSnapFunction(e){let r=e.split(" ");return ({pos:t,size:o,snapThreshold:i,isRtl:s,vertical:n})=>{let a=t,l=Number.POSITIVE_INFINITY;return r.forEach(d=>{let m;if(d.startsWith("repeat(")){let f=e.substring(7,e.length-1),g=f.endsWith("%"),b=Number.parseFloat(f),x=g?o*(b/100):b;m=Math.round((s&&!n?o-t:t)/x)*x;}else d.endsWith("%")?m=o*(Number.parseFloat(d)/100):m=Number.parseFloat(d);s&&!n&&(m=o-m);let u=Math.abs(t-m);u<=i&&u<l&&(a=m,l=u);}),a}}set snap(e){this.snapValue=e??"",e?this.snapFunction=typeof e=="string"?this.toSnapFunction(e):e:this.snapFunction=Ks;}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position);}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this);}detectSize(){let{width:e,height:r}=this.getBoundingClientRect();this.size=this.vertical?r:e;}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){let r=this.localize.dir()==="rtl";this.disabled||(e.cancelable&&e.preventDefault(),Lr(this,{onMove:(t,o)=>{var i;let s=this.vertical?o:t;this.primary==="end"&&(s=this.size-s),s=(i=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:r,vertical:this.vertical}))!=null?i:s,this.position=ht(this.pixelsToPercentage(s),0,100);},initialEvent:e}));}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(e.key)){let r=this.position,t=(e.shiftKey?10:1)*(this.primary==="end"?-1:1);if(e.preventDefault(),(e.key==="ArrowLeft"&&!this.vertical||e.key==="ArrowUp"&&this.vertical)&&(r-=t),(e.key==="ArrowRight"&&!this.vertical||e.key==="ArrowDown"&&this.vertical)&&(r+=t),e.key==="Home"&&(r=this.primary==="end"?100:0),e.key==="End"&&(r=this.primary==="end"?0:100),e.key==="Enter")if(this.isCollapsed)r=this.positionBeforeCollapsing,this.isCollapsed=false;else {let o=this.position;r=0,requestAnimationFrame(()=>{this.isCollapsed=true,this.positionBeforeCollapsing=o;});}this.position=ht(r,0,100);}}handleResize(e){let{width:r,height:t}=e[0].contentRect;this.size=this.vertical?t:r,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels));}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=false,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition");}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels);}handleVerticalChange(){this.detectSize();}render(){let e=this.vertical?"gridTemplateRows":"gridTemplateColumns",r=this.vertical?"gridTemplateColumns":"gridTemplateRows",t=this.localize.dir()==="rtl",o=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i="auto";return this.primary==="end"?t&&!this.vertical?this.style[e]=`${o} var(--divider-width) ${i}`:this.style[e]=`${i} var(--divider-width) ${o}`:t&&!this.vertical?this.style[e]=`${i} var(--divider-width) ${o}`:this.style[e]=`${o} var(--divider-width) ${i}`,this.style[r]="",h`
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
    `}};Vt.styles=[z,nc];c([$(".divider")],Vt.prototype,"divider",2);c([p({type:Number,reflect:true})],Vt.prototype,"position",2);c([p({attribute:"position-in-pixels",type:Number})],Vt.prototype,"positionInPixels",2);c([p({type:Boolean,reflect:true})],Vt.prototype,"vertical",2);c([p({type:Boolean,reflect:true})],Vt.prototype,"disabled",2);c([p()],Vt.prototype,"primary",2);c([p({reflect:true})],Vt.prototype,"snap",1);c([p({type:Number,attribute:"snap-threshold"})],Vt.prototype,"snapThreshold",2);c([A("position")],Vt.prototype,"handlePositionChange",1);c([A("positionInPixels")],Vt.prototype,"handlePositionInPixelsChange",1);c([A("vertical")],Vt.prototype,"handleVerticalChange",1);Vt.define("sl-split-panel");de.define("sl-tag");var He=y`
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
`;exports.AutoFieldList=class ar extends I{constructor(){super(...arguments);this.selection=[];this.valueKey="id";this.labelKey="label";this.scrollbar=new Qe(this);this.scrollbars=[];this.items=new Pe(this,"select",t=>t?(t.forEach(o=>{this.isItemSelected(o)&&this.selection.push(o[this.options.valueKey]);}),t):[]);this.selectedTips="";}getInitialOptions(){return {valueKey:"value",labelKey:"label",multiple:false,maxItems:0,minItems:0,showResults:false,itemTemplate:void 0,select:[]}}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu,.results")?.forEach(o=>{this.scrollbars.push(this.scrollbar.create(o,{width:"5px"}));});}_destoryScrollbars(){this.scrollbars?.forEach(t=>{t.destroy();});}connectedCallback(){super.connectedCallback(),this.options&&this.setPresetActions(),this.style.height="auto";}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}isItemSelected(t){return this.value===void 0?false:this.options.multiple===false?this.value===t[this.options.valueKey]:this.value.includes(t[this.options.valueKey])}_addSecectItem(t){this.selection.findIndex(i=>i[this.options.valueKey]===t[this.options.valueKey])===-1&&(this.options.multiple===false&&this.selection.length>0&&this.selection.splice(0,this.selection.length),this.selection.push(t[this.options.valueKey]));}_removeSelectItem(t){for(let o=this.selection.length-1;o>=0;o--)this.selection[o]===t&&this.selection.splice(o,1);this.onFieldChange(),this.requestUpdate();}_onSelectItem(t){let o=t.detail.item,i=o.dataset.index,s=this.items.value[i];s&&(o.checked?this._addSecectItem(s):this._removeSelectItem(s[this.options.valueKey]),this.selectedTips=`${this.selection.length}/${this.items.value.length}`,this.onFieldChange());}_renderWithSplitPanel(t){return this.options.showResults&&this.options.multiple?h`<sl-split-panel 
            style="height:${this.options.height||"15em"}"
            position="60"> ${t} ${this.renderResults()} </sl-split-panel>`:t}_renderItem(t){let o=this.options.renderItem;return typeof o=="string"?h`${Rt(o.replace(/\{(.+?)\}/g,(i,s)=>t[s]))}`:typeof o=="function"?h`${Rt(o(t))}`:t.label}_onClickPresetAction(t){t==="all"?this.selection=this.items.value.map(o=>o[this.options.valueKey]):t==="reverse"?this.selection=this.items.value.filter(o=>!this.selection.includes(o[this.options.valueKey])).map(o=>o[this.options.valueKey]):t==="clear"&&(this.selection=[]),this.onFieldChange(),this.requestUpdate();}setPresetActions(){let t=[];this.options.multiple&&t.push({id:"all",label:"\u5168\u9009",onClick:()=>this._onClickPresetAction("all")},{id:"reverse",label:"\u53CD\u9009",onClick:()=>this._onClickPresetAction("reverse")},{id:"clear",label:"\u6E05\u7A7A",onClick:()=>this._onClickPresetAction("clear")});let o=i=>{for(let s=t.length-1;s>=0;s--)if(t[s].id===i.id){let n=i.onClick;i.onClick=()=>{t[s].onClick(),n&&n.call(this,this.getInputValue());},t.splice(s,1);}};this.beforeActions&&this.beforeActions.length>0&&this.beforeActions.forEach(i=>{o(i);}),this.afterActions&&this.afterActions.length>0&&this.afterActions.forEach(i=>{o(i);}),t.length>0&&(this.afterActions||(this.beforeActions=[]),this.afterActions.splice(0,0,...t));}getInputValue(){return this.options.multiple?this.selection:this.selection.length>0?this.selection[0]:void 0}getShowLabel(t){let o=this.options.labelKey;if(o){if(o in t)return t[o]}else return t.label}renderResults(){return h`<div
            slot="end"
            class="results mark-err scrollbar"
            no-padding
            style="${Z({maxHeight:this.options.height})}"
        >
            ${et(this.selection,t=>{let o=this.items.value.filter(s=>s[this.options.valueKey]===t)[0];if(!o)return;let i=o&&o.label||t;return h`<div class="item" title="${o.value}">
                    <span>${i}</span>
                    <sl-icon-button name="x" @click=${()=>this._removeSelectItem(o)}></sl-icon-button>
                </div>`})}
        </div>`}_renderList(){let t=Array.isArray(this.value)?this.value:[this.value];return h`${this._renderWithSplitPanel(h` <sl-menu
            slot="start"
            class="scrollbar mark-err ${L({multiple:this.options.multiple})}"
            style=${Z({maxHeight:this.options.height})}
            @sl-select=${this._onSelectItem.bind(this)}
        >

            ${et(this.items.value,(o,i)=>{let s=t.includes(o[this.options.valueKey]);return h`<sl-menu-item type="checkbox" 
                    data-index=${String(i)} .checked=${s}>
                    ${B(o.icon,()=>h`<sl-icon slot="prefix" name="${o.icon}"></sl-icon>`)}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(o)} </auto-flex>
                </sl-menu-item>`})}
        </sl-menu>`)} `}_renderHeader(){return h`${B(this.beforeActions.length>0,()=>h`<div class="header">${this.renderBeforeActions()}</div>`)}`}_renderFooter(){if(!(!this.options.multiple&&this.afterActions.length===0))return h`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.items.value.length} </span>
        </div>`}renderInput(){return h`
            ${B(this.items.loading,()=>h`<auto-loading></auto-loading>`,()=>h`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`)}
            
        `}};exports.AutoFieldList.styles=[I.styles,y`
            ${He}
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
        `],v([k()],exports.AutoFieldList.prototype,"selectedTips",2),v([$("sl-menu")],exports.AutoFieldList.prototype,"menu",2),exports.AutoFieldList=v([T("auto-field-list")],exports.AutoFieldList);var ac=y`
  :host {
    display: inline-block;
  }
`;var lc=null,Li=class{};Li.render=function(e,r){lc(e,r);};self.QrCreator=Li;(function(e){function r(a,l,d,m){var u={},f=e(d,l);f.u(a),f.J(),m=m||0;var g=f.h(),b=f.h()+2*m;return u.text=a,u.level=l,u.version=d,u.O=b,u.a=function(x,R){return x-=m,R-=m,0>x||x>=g||0>R||R>=g?false:f.a(x,R)},u}function t(a,l,d,m,u,f,g,b,x,R){function E(C,O,_,S,P,H,U){C?(a.lineTo(O+H,_+U),a.arcTo(O,_,S,P,f)):a.lineTo(O,_);}g?a.moveTo(l+f,d):a.moveTo(l,d),E(b,m,d,m,u,-f,0),E(x,m,u,l,u,0,-f),E(R,l,u,l,d,f,0),E(g,l,d,m,d,0,f);}function o(a,l,d,m,u,f,g,b,x,R){function E(C,O,_,S){a.moveTo(C+_,O),a.lineTo(C,O),a.lineTo(C,O+S),a.arcTo(C,O,C+_,O,f);}g&&E(l,d,f,f),b&&E(m,d,-f,f),x&&E(m,u,-f,-f),R&&E(l,u,f,-f);}function i(a,l){var d=l.fill;if(typeof d=="string")a.fillStyle=d;else {var m=d.type,u=d.colorStops;if(d=d.position.map(g=>Math.round(g*l.size)),m==="linear-gradient")var f=a.createLinearGradient.apply(a,d);else if(m==="radial-gradient")f=a.createRadialGradient.apply(a,d);else throw Error("Unsupported fill");u.forEach(([g,b])=>{f.addColorStop(g,b);}),a.fillStyle=f;}}function s(a,l){t:{var d=l.text,m=l.v,u=l.N,f=l.K,g=l.P;for(u=Math.max(1,u||1),f=Math.min(40,f||40);u<=f;u+=1)try{var b=r(d,m,u,g);break t}catch{}b=void 0;}if(!b)return null;for(d=a.getContext("2d"),l.background&&(d.fillStyle=l.background,d.fillRect(l.left,l.top,l.size,l.size)),m=b.O,f=l.size/m,d.beginPath(),g=0;g<m;g+=1)for(u=0;u<m;u+=1){var x=d,R=l.left+u*f,E=l.top+g*f,C=g,O=u,_=b.a,S=R+f,P=E+f,H=C-1,U=C+1,D=O-1,V=O+1,mt=Math.floor(Math.min(.5,Math.max(0,l.R))*f),at=_(C,O),St=_(H,D),lt=_(H,O);H=_(H,V);var jt=_(C,V);V=_(U,V),O=_(U,O),U=_(U,D),C=_(C,D),R=Math.round(R),E=Math.round(E),S=Math.round(S),P=Math.round(P),at?t(x,R,E,S,P,mt,!lt&&!C,!lt&&!jt,!O&&!jt,!O&&!C):o(x,R,E,S,P,mt,lt&&C&&St,lt&&jt&&H,O&&jt&&V,O&&C&&U);}return i(d,l),d.fill(),a}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};lc=function(a,l){var d={};Object.assign(d,n,a),d.N=d.minVersion,d.K=d.maxVersion,d.v=d.ecLevel,d.left=d.left,d.top=d.top,d.size=d.size,d.fill=d.fill,d.background=d.background,d.text=d.text,d.R=d.radius,d.P=d.quiet,l instanceof HTMLCanvasElement?((l.width!==d.size||l.height!==d.size)&&(l.width=d.size,l.height=d.size),l.getContext("2d").clearRect(0,0,l.width,l.height),s(l,d)):(a=document.createElement("canvas"),a.width=d.size,a.height=d.size,d=s(a,d),l.appendChild(d));};})((function(){function e(l){var d=t.s(l);return {S:function(){return 4},b:function(){return d.length},write:function(m){for(var u=0;u<d.length;u+=1)m.put(d[u],8);}}}function r(){var l=[],d=0,m={B:function(){return l},c:function(u){return (l[Math.floor(u/8)]>>>7-u%8&1)==1},put:function(u,f){for(var g=0;g<f;g+=1)m.m((u>>>f-g-1&1)==1);},f:function(){return d},m:function(u){var f=Math.floor(d/8);l.length<=f&&l.push(0),u&&(l[f]|=128>>>d%8),d+=1;}};return m}function t(l,d){function m(C,O){for(var _=-1;7>=_;_+=1)if(!(-1>=C+_||b<=C+_))for(var S=-1;7>=S;S+=1) -1>=O+S||b<=O+S||(g[C+_][O+S]=0<=_&&6>=_&&(S==0||S==6)||0<=S&&6>=S&&(_==0||_==6)||2<=_&&4>=_&&2<=S&&4>=S);}function u(C,O){for(var _=b=4*l+17,S=Array(_),P=0;P<_;P+=1){S[P]=Array(_);for(var H=0;H<_;H+=1)S[P][H]=null;}for(g=S,m(0,0),m(b-7,0),m(0,b-7),_=s.G(l),S=0;S<_.length;S+=1)for(P=0;P<_.length;P+=1){H=_[S];var U=_[P];if(g[H][U]==null)for(var D=-2;2>=D;D+=1)for(var V=-2;2>=V;V+=1)g[H+D][U+V]=D==-2||D==2||V==-2||V==2||D==0&&V==0;}for(_=8;_<b-8;_+=1)g[_][6]==null&&(g[_][6]=_%2==0);for(_=8;_<b-8;_+=1)g[6][_]==null&&(g[6][_]=_%2==0);for(_=s.w(f<<3|O),S=0;15>S;S+=1)P=!C&&(_>>S&1)==1,g[6>S?S:8>S?S+1:b-15+S][8]=P,g[8][8>S?b-S-1:9>S?15-S:14-S]=P;if(g[b-8][8]=!C,7<=l){for(_=s.A(l),S=0;18>S;S+=1)P=!C&&(_>>S&1)==1,g[Math.floor(S/3)][S%3+b-8-3]=P;for(S=0;18>S;S+=1)P=!C&&(_>>S&1)==1,g[S%3+b-8-3][Math.floor(S/3)]=P;}if(x==null){for(C=a.I(l,f),_=r(),S=0;S<R.length;S+=1)P=R[S],_.put(4,4),_.put(P.b(),s.f(4,l)),P.write(_);for(S=P=0;S<C.length;S+=1)P+=C[S].j;if(_.f()>8*P)throw Error("code length overflow. ("+_.f()+">"+8*P+")");for(_.f()+4<=8*P&&_.put(0,4);_.f()%8!=0;)_.m(false);for(;!(_.f()>=8*P)&&(_.put(236,8),!(_.f()>=8*P));)_.put(17,8);var mt=0;for(P=S=0,H=Array(C.length),U=Array(C.length),D=0;D<C.length;D+=1){var at=C[D].j,St=C[D].o-at;for(S=Math.max(S,at),P=Math.max(P,St),H[D]=Array(at),V=0;V<H[D].length;V+=1)H[D][V]=255&_.B()[V+mt];for(mt+=at,V=s.C(St),at=o(H[D],V.b()-1).l(V),U[D]=Array(V.b()-1),V=0;V<U[D].length;V+=1)St=V+at.b()-U[D].length,U[D][V]=0<=St?at.c(St):0;}for(V=_=0;V<C.length;V+=1)_+=C[V].o;for(_=Array(_),V=mt=0;V<S;V+=1)for(D=0;D<C.length;D+=1)V<H[D].length&&(_[mt]=H[D][V],mt+=1);for(V=0;V<P;V+=1)for(D=0;D<C.length;D+=1)V<U[D].length&&(_[mt]=U[D][V],mt+=1);x=_;}for(C=x,_=-1,S=b-1,P=7,H=0,O=s.F(O),U=b-1;0<U;U-=2)for(U==6&&--U;;){for(D=0;2>D;D+=1)g[S][U-D]==null&&(V=false,H<C.length&&(V=(C[H]>>>P&1)==1),O(S,U-D)&&(V=!V),g[S][U-D]=V,--P,P==-1&&(H+=1,P=7));if(S+=_,0>S||b<=S){S-=_,_=-_;break}}}var f=i[d],g=null,b=0,x=null,R=[],E={u:function(C){C=e(C),R.push(C),x=null;},a:function(C,O){if(0>C||b<=C||0>O||b<=O)throw Error(C+","+O);return g[C][O]},h:function(){return b},J:function(){for(var C=0,O=0,_=0;8>_;_+=1){u(true,_);var S=s.D(E);(_==0||C>S)&&(C=S,O=_);}u(false,O);}};return E}function o(l,d){if(typeof l.length>"u")throw Error(l.length+"/"+d);var m=(function(){for(var f=0;f<l.length&&l[f]==0;)f+=1;for(var g=Array(l.length-f+d),b=0;b<l.length-f;b+=1)g[b]=l[b+f];return g})(),u={c:function(f){return m[f]},b:function(){return m.length},multiply:function(f){for(var g=Array(u.b()+f.b()-1),b=0;b<u.b();b+=1)for(var x=0;x<f.b();x+=1)g[b+x]^=n.i(n.g(u.c(b))+n.g(f.c(x)));return o(g,0)},l:function(f){if(0>u.b()-f.b())return u;for(var g=n.g(u.c(0))-n.g(f.c(0)),b=Array(u.b()),x=0;x<u.b();x+=1)b[x]=u.c(x);for(x=0;x<f.b();x+=1)b[x]^=n.i(n.g(f.c(x))+g);return o(b,0).l(f)}};return u}t.s=function(l){for(var d=[],m=0;m<l.length;m++){var u=l.charCodeAt(m);128>u?d.push(u):2048>u?d.push(192|u>>6,128|u&63):55296>u||57344<=u?d.push(224|u>>12,128|u>>6&63,128|u&63):(m++,u=65536+((u&1023)<<10|l.charCodeAt(m)&1023),d.push(240|u>>18,128|u>>12&63,128|u>>6&63,128|u&63));}return d};var i={L:1,M:0,Q:3,H:2},s=(function(){function l(u){for(var f=0;u!=0;)f+=1,u>>>=1;return f}var d=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],m={w:function(u){for(var f=u<<10;0<=l(f)-l(1335);)f^=1335<<l(f)-l(1335);return (u<<10|f)^21522},A:function(u){for(var f=u<<12;0<=l(f)-l(7973);)f^=7973<<l(f)-l(7973);return u<<12|f},G:function(u){return d[u-1]},F:function(u){switch(u){case 0:return function(f,g){return (f+g)%2==0};case 1:return function(f){return f%2==0};case 2:return function(f,g){return g%3==0};case 3:return function(f,g){return (f+g)%3==0};case 4:return function(f,g){return (Math.floor(f/2)+Math.floor(g/3))%2==0};case 5:return function(f,g){return f*g%2+f*g%3==0};case 6:return function(f,g){return (f*g%2+f*g%3)%2==0};case 7:return function(f,g){return (f*g%3+(f+g)%2)%2==0};default:throw Error("bad maskPattern:"+u)}},C:function(u){for(var f=o([1],0),g=0;g<u;g+=1)f=f.multiply(o([1,n.i(g)],0));return f},f:function(u,f){if(u!=4||1>f||40<f)throw Error("mode: "+u+"; type: "+f);return 10>f?8:16},D:function(u){for(var f=u.h(),g=0,b=0;b<f;b+=1)for(var x=0;x<f;x+=1){for(var R=0,E=u.a(b,x),C=-1;1>=C;C+=1)if(!(0>b+C||f<=b+C))for(var O=-1;1>=O;O+=1)0>x+O||f<=x+O||(C!=0||O!=0)&&E==u.a(b+C,x+O)&&(R+=1);5<R&&(g+=3+R-5);}for(b=0;b<f-1;b+=1)for(x=0;x<f-1;x+=1)R=0,u.a(b,x)&&(R+=1),u.a(b+1,x)&&(R+=1),u.a(b,x+1)&&(R+=1),u.a(b+1,x+1)&&(R+=1),(R==0||R==4)&&(g+=3);for(b=0;b<f;b+=1)for(x=0;x<f-6;x+=1)u.a(b,x)&&!u.a(b,x+1)&&u.a(b,x+2)&&u.a(b,x+3)&&u.a(b,x+4)&&!u.a(b,x+5)&&u.a(b,x+6)&&(g+=40);for(x=0;x<f;x+=1)for(b=0;b<f-6;b+=1)u.a(b,x)&&!u.a(b+1,x)&&u.a(b+2,x)&&u.a(b+3,x)&&u.a(b+4,x)&&!u.a(b+5,x)&&u.a(b+6,x)&&(g+=40);for(x=R=0;x<f;x+=1)for(b=0;b<f;b+=1)u.a(b,x)&&(R+=1);return g+=Math.abs(100*R/f/f-50)/5*10}};return m})(),n=(function(){for(var l=Array(256),d=Array(256),m=0;8>m;m+=1)l[m]=1<<m;for(m=8;256>m;m+=1)l[m]=l[m-4]^l[m-5]^l[m-6]^l[m-8];for(m=0;255>m;m+=1)d[l[m]]=m;return {g:function(u){if(1>u)throw Error("glog("+u+")");return d[u]},i:function(u){for(;0>u;)u+=255;for(;256<=u;)u-=255;return l[u]}}})(),a=(function(){function l(u,f){switch(f){case i.L:return d[4*(u-1)];case i.M:return d[4*(u-1)+1];case i.Q:return d[4*(u-1)+2];case i.H:return d[4*(u-1)+3]}}var d=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],m={I:function(u,f){var g=l(u,f);if(typeof g>"u")throw Error("bad rs block @ typeNumber:"+u+"/errorCorrectLevel:"+f);u=g.length/3,f=[];for(var b=0;b<u;b+=1)for(var x=g[3*b],R=g[3*b+1],E=g[3*b+2],C=0;C<x;C+=1){var O=E,_={};_.o=R,_.j=O,f.push(_);}return f}};return m})();return t})());var cc=QrCreator;var Zt=class extends M{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H";}firstUpdated(){this.generate();}generate(){this.hasUpdated&&cc.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas);}render(){var e;return h`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((e=this.label)==null?void 0:e.length)>0?this.label:this.value}
        style=${Z({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Zt.styles=[z,ac];c([$("canvas")],Zt.prototype,"canvas",2);c([p()],Zt.prototype,"value",2);c([p()],Zt.prototype,"label",2);c([p({type:Number})],Zt.prototype,"size",2);c([p()],Zt.prototype,"fill",2);c([p()],Zt.prototype,"background",2);c([p({type:Number})],Zt.prototype,"radius",2);c([p({attribute:"error-correction"})],Zt.prototype,"errorCorrection",2);c([A(["background","errorCorrection","fill","radius","size","value"])],Zt.prototype,"generate",1);Zt.define("sl-qr-code");exports.AutoFieldQRCode=class Mi extends I{getInitialOptions(){return {fill:"black",background:"white",radius:0,errorCorrection:"L",size:64}}renderInput(){return h`
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
        `}};exports.AutoFieldQRCode=v([T("auto-field-qrcode")],exports.AutoFieldQRCode);exports.AutoFieldCaptcha=class lr extends exports.AutoFieldInput{constructor(){super(...arguments);this.loading=false;}getInitialOptions(){return {url:"",tips:"\u5355\u51FB\u5237\u65B0\u9A8C\u8BC1\u7801"}}getRefreshUrl(){let t=this.options.url,[o,i]=t.split("?"),s=new URLSearchParams(i);return s.set("t",Date.now().toString()),`${o}?${s.toString()}`}refreshCaptchaImage(){this.img&&(this.img.src=this.getRefreshUrl(),this.img.onerror=()=>{console.error("\u9A8C\u8BC1\u7801\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"),this.loading=false,this.input?.focus(),this.input?.select();},this.img.onload=()=>{this.loading=false,this.input?.focus(),this.input?.select();},this.loading=true);}connectedCallback(){super.connectedCallback(),this.afterActions.unshift({type:"image",url:this.options.url,tips:this.options.tips,onClick:this.refreshCaptchaImage.bind(this)});}renderView(){return h`${this.value}`}};exports.AutoFieldCaptcha.styles=[exports.AutoFieldInput.styles,y`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
        `],v([$("img")],exports.AutoFieldCaptcha.prototype,"img",2),v([k()],exports.AutoFieldCaptcha.prototype,"loading",2),exports.AutoFieldCaptcha=v([T("auto-field-captcha")],exports.AutoFieldCaptcha);exports.AutoFieldVerifyCode=class cr extends exports.AutoFieldInput{constructor(){super(...arguments);this.countdowning=false;this.timeout=60*1e3;this.step=1e3;this.stepCount=1e3;}sendRequest(){if(this.countdowning)return;this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=void 0),this.countdowning=true,this.options.onRequest&&typeof(this.options.onRequest==="function")&&this.options.onRequest.call(this);let t=this.stepCount,o=()=>{let i=Math.ceil(t*this.step/1e3);this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.template.replace("{timeout}",i.toString()),this.requestUpdate()),t--,t<=0?(this.afterActions&&this.afterActions.length>0&&(this.afterActions[0].label=this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),this.requestUpdate()),this.countdowning=false,this.currentTimer=void 0):this.currentTimer=window.setTimeout(o,this.step);};o();}connectedCallback(){super.connectedCallback(),this.afterActions||(this.afterActions=[]),this.afterActions.unshift({id:"send",label:this.getOptionValue("sendTips","\u53D1\u9001\u9A8C\u8BC1\u7801"),onClick:this.sendRequest.bind(this)});let t=this.getOptionValue("timeout",60*1e3);this.timeout=Array.isArray(t)?Number(t[0]):Number(t),this.step=Array.isArray(t)?Number(t[1]):1e3,this.stepCount=this.timeout/this.step,this.template=this.getOptionValue("template","{timeout}\u79D2\u540E\u91CD\u53D1");}};exports.AutoFieldVerifyCode.styles=[exports.AutoFieldInput.styles],v([k()],exports.AutoFieldVerifyCode.prototype,"countdowning",2),v([k()],exports.AutoFieldVerifyCode.prototype,"template",2),exports.AutoFieldVerifyCode=v([T("auto-field-verifycode")],exports.AutoFieldVerifyCode);var pc=y`
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
`;var it=class Gs extends M{constructor(){super(...arguments),this.localize=new j(this),this.indeterminate=false,this.isLeaf=false,this.loading=false,this.selectable=false,this.expanded=false,this.selected=false,this.disabled=false,this.lazy=false;}static isTreeItem(r){return r instanceof Element&&r.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children");}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange();}async animateCollapse(){this.emit("sl-collapse"),await Xt(this.childrenContainer);let{keyframes:r,options:t}=Gt(this,"tree-item.collapse",{dir:this.localize.dir()});await Yt(this.childrenContainer,Ir(r,this.childrenContainer.scrollHeight),t),this.childrenContainer.hidden=true,this.emit("sl-after-collapse");}isNestedItem(){let r=this.parentElement;return !!r&&Gs.isTreeItem(r)}handleChildrenSlotChange(){this.loading=false,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0;}willUpdate(r){r.has("selected")&&!r.has("indeterminate")&&(this.indeterminate=false);}async animateExpand(){this.emit("sl-expand"),await Xt(this.childrenContainer),this.childrenContainer.hidden=false;let{keyframes:r,options:t}=Gt(this,"tree-item.expand",{dir:this.localize.dir()});await Yt(this.childrenContainer,Ir(r,this.childrenContainer.scrollHeight),t),this.childrenContainer.style.height="auto",this.emit("sl-after-expand");}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand();}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false");}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false");}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false");}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=true,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse();}handleLazyChange(){this.emit("sl-lazy-change");}getChildrenItems({includeDisabled:r=true}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:true})].filter(t=>Gs.isTreeItem(t)&&(r||!t.disabled)):[]}render(){let r=this.localize.dir()==="rtl",t=!this.loading&&(!this.isLeaf||this.lazy);return h`
      <div
        part="base"
        class="${L({"tree-item":true,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":t,"tree-item--rtl":this.localize.dir()==="rtl"})}"
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
            class=${L({"tree-item__expand-button":true,"tree-item__expand-button--visible":t})}
            aria-hidden="true"
          >
            ${B(this.loading,()=>h` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${r?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${B(this.selectable,()=>h`
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
                ?checked="${$t(this.selected)}"
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
    `}};it.styles=[z,pc];it.dependencies={"sl-checkbox":nt,"sl-icon":q,"sl-spinner":Se};c([k()],it.prototype,"indeterminate",2);c([k()],it.prototype,"isLeaf",2);c([k()],it.prototype,"loading",2);c([k()],it.prototype,"selectable",2);c([p({type:Boolean,reflect:true})],it.prototype,"expanded",2);c([p({type:Boolean,reflect:true})],it.prototype,"selected",2);c([p({type:Boolean,reflect:true})],it.prototype,"disabled",2);c([p({type:Boolean,reflect:true})],it.prototype,"lazy",2);c([$("slot:not([name])")],it.prototype,"defaultSlot",2);c([$("slot[name=children]")],it.prototype,"childrenSlot",2);c([$(".tree-item__item")],it.prototype,"itemElement",2);c([$(".tree-item__children")],it.prototype,"childrenContainer",2);c([$(".tree-item__expand-button slot")],it.prototype,"expandButtonSlot",2);c([A("loading",{waitUntilFirstUpdate:true})],it.prototype,"handleLoadingChange",1);c([A("disabled")],it.prototype,"handleDisabledChange",1);c([A("selected")],it.prototype,"handleSelectedChange",1);c([A("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandedChange",1);c([A("expanded",{waitUntilFirstUpdate:true})],it.prototype,"handleExpandAnimation",1);c([A("lazy",{waitUntilFirstUpdate:true})],it.prototype,"handleLazyChange",1);var pr=it;Kt("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Kt("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var dc=y`
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
`;function uc(e,r=false){function t(s){let n=s.getChildrenItems({includeDisabled:false});if(n.length){let a=n.every(d=>d.selected),l=n.every(d=>!d.selected&&!d.indeterminate);s.selected=a,s.indeterminate=!a&&!l;}}function o(s){let n=s.parentElement;pr.isTreeItem(n)&&(t(n),o(n));}function i(s){for(let n of s.getChildrenItems())n.selected=r?s.selected||n.selected:!n.disabled&&s.selected,i(n);r&&t(s);}i(e),o(e);}var Be=class extends M{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new j(this),this.initTreeItem=e=>{e.selectable=this.selection==="multiple",["expand","collapse"].filter(r=>!!this.querySelector(`[slot="${r}-icon"]`)).forEach(r=>{let t=e.querySelector(`[slot="${r}-icon"]`),o=this.getExpandButtonIcon(r);o&&(t===null?e.append(o):t.hasAttribute("data-default")&&t.replaceWith(o));});},this.handleTreeChanged=e=>{for(let r of e){let t=[...r.addedNodes].filter(pr.isTreeItem),o=[...r.removedNodes].filter(pr.isTreeItem);t.forEach(this.initTreeItem),this.lastFocusedItem&&o.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null);}},this.handleFocusOut=e=>{let r=e.relatedTarget;(!r||!this.contains(r))&&(this.tabIndex=0);},this.handleFocusIn=e=>{let r=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),pr.isTreeItem(r)&&!r.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=r,this.tabIndex=-1,r.tabIndex=0);},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange);}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:true,subtree:true});}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect();}getExpandButtonIcon(e){let t=(e==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:true})[0];if(t){let o=t.cloneNode(true);return [o,...o.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),o.setAttribute("data-default",""),o.slot=`${e}-icon`,o}return null}selectItem(e){let r=[...this.selectedItems];if(this.selection==="multiple")e.selected=!e.selected,e.lazy&&(e.expanded=true),uc(e);else if(this.selection==="single"||e.isLeaf){let o=this.getAllTreeItems();for(let i of o)i.selected=i===e;}else this.selection==="leaf"&&(e.expanded=!e.expanded);let t=this.selectedItems;(r.length!==t.length||t.some(o=>!r.includes(o)))&&Promise.all(t.map(o=>o.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:t}});});}getAllTreeItems(){return [...this.querySelectorAll("sl-tree-item")]}focusItem(e){e?.focus();}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(i=>{var s;return ["input","textarea"].includes((s=i?.tagName)==null?void 0:s.toLowerCase())}))return;let r=this.getFocusableItems(),t=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(r.length>0){e.preventDefault();let i=r.findIndex(l=>l.matches(":focus")),s=r[i],n=l=>{let d=r[ht(l,0,r.length-1)];this.focusItem(d);},a=l=>{s.expanded=l;};e.key==="ArrowDown"?n(i+1):e.key==="ArrowUp"?n(i-1):t&&e.key==="ArrowRight"||o&&e.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?n(i+1):a(true):t&&e.key==="ArrowLeft"||o&&e.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?n(i-1):a(false):e.key==="Home"?n(0):e.key==="End"?n(r.length-1):(e.key==="Enter"||e.key===" ")&&(s.disabled||this.selectItem(s));}}handleClick(e){let r=e.target,t=r.closest("sl-tree-item"),o=e.composedPath().some(i=>{var s;return (s=i?.classList)==null?void 0:s.contains("tree-item__expand-button")});!t||t.disabled||r!==this.clickTarget||(o?t.expanded=!t.expanded:this.selectItem(t));}handleMouseDown(e){this.clickTarget=e.target;}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem);}async handleSelectionChange(){let e=this.selection==="multiple",r=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(let t of r)t.selectable=e;e&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(t=>uc(t,true)));}get selectedItems(){let e=this.getAllTreeItems(),r=t=>t.selected;return e.filter(r)}getFocusableItems(){let e=this.getAllTreeItems(),r=new Set;return e.filter(t=>{var o;if(t.disabled)return  false;let i=(o=t.parentElement)==null?void 0:o.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||r.has(i))&&r.add(t),!r.has(t)})}render(){return h`
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
    `}};Be.styles=[z,dc];c([$("slot:not([name])")],Be.prototype,"defaultSlot",2);c([$("slot[name=expand-icon]")],Be.prototype,"expandedIconSlot",2);c([$("slot[name=collapse-icon]")],Be.prototype,"collapsedIconSlot",2);c([p()],Be.prototype,"selection",2);c([A("selection")],Be.prototype,"handleSelectionChange",1);Be.define("sl-tree");pr.define("sl-tree-item");exports.AutoFieldTreeSelect=class je extends I{constructor(){super(...arguments);this.nodes=new Pe(this,"items",t=>t?(this._forEachTree(t,(o,i,s,n)=>{this.isItemSelected(o)&&(o.selected=true,this.selection.push({id:o[this.options.idKey],value:o[this.options.valueKey],path:n.join("/")}));}),t):[]);this.selection=[];this.idKey="id";this.valueKey="id";this.labelKey="label";}getInitialOptions(){return {items:[],idKey:"id",valueKey:"id",labelKey:"label",multiple:false,maxItems:0,minItems:0,defaultExpandLevel:2,onlySelectLeaf:false,showAsPath:false,onSelectionChange:()=>{}}}isItemSelected(t){return this.value===void 0?false:this.options.multiple===false?this.value===t[this.options.valueKey]:this.value.includes(t[this.options.valueKey])}getStateValue(){let t=super.getStateValue();return this.options.multiple?Array.isArray(t)?t:[t]:t}_forEachTree(t,o){let i=(s,n,a,l)=>{let d=[...l,s[this.options.labelKey]];if(this.options.defaultExpandLevel>0&&a<this.options.defaultExpandLevel-1&&s.expanded===void 0&&(s.expanded=true),o(s,n,a,d),s.children){let m=a+1;s.children.forEach(u=>{i(u,s,m,[...d]);});}};(Array.isArray(t)?t:[t]).forEach(s=>{i(s,void 0,0,[]);});}onSelectionChange(t){let o=Array.from(t.detail.selection);o&&(this.selection=o.map(i=>({id:i.dataset.id,value:i.dataset.value,path:i.dataset.path})),this.options&&typeof this.options.onSelectionChange=="function"&&this.options.onSelectionChange(this.selection),this.onFieldChange());}getInputValue(){return this.options.multiple?this.selection.map(t=>t.value):this.selection.length>0?this.selection[0].value:void 0}_renderNode(t,o,i){let s=o.includes(t[this.options.valueKey]),n=[...i,t[this.options.labelKey]];return h`<sl-tree-item
            data-id=${String(t[this.options.idKey])}
            data-value=${String(t[this.options.valueKey])}
            data-path=${n.join("/")}
            ?selected=${s}
            ?expanded=${t.expanded}
        >
            ${B(t.icon,()=>h`<sl-icon name="${t.icon}"></sl-icon>`)} ${t.label}
            ${Array.isArray(t.children)?h`${t.children.map(a=>this._renderNode(a,o,n))}`:""}</sl-tree-item
        >`}_renderNodes(t){let o=Array.isArray(this.value)?this.value:[this.value];return Array.isArray(t)?t.map(i=>this._renderNode(i,o,[])):this._renderNode(t,o,[])}renderTree(){return h`
            ${this.nodes.render(t=>h`<sl-tree
                    class="scrollbar"
                    name="${this.name}"
                    data-path=${this.path}
                    size=${this.context.size}
                    selection="${this.options.onlySelectLeaf?"leaf":this.options.multiple?"multiple":"single"}"
                    @sl-selection-change=${this.onSelectionChange.bind(this)}
                    style="max-height:${this.options.height||"18em"};overflow:auto;"
                    >${this._renderNodes(t)}</sl-tree
                >`)}
            
        `}renderInput(){return h` ${this.renderTree()} `}};exports.AutoFieldTreeSelect.styles=[I.styles,y`
            ${He}
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `],exports.AutoFieldTreeSelect=v([T("auto-field-tree-select")],exports.AutoFieldTreeSelect);exports.AutoFieldTreeDropdown=class dr extends exports.AutoFieldTreeSelect{constructor(){super(...arguments);this.active=false;}_onRemoveSelection(t){let o=t.target.dataset.id;for(let i=0;i<this.selection.length;i++)if(String(this.selection[i].id)===o){this.selection.splice(i,1),this.onFieldChange(),this.requestUpdate();break}t.stopPropagation();}getShowItemValue(t,o,i){if(o===i)return t}getSelectedTagValue(t){if(this.options.showAsPath)return h`${t.path}`;{let i=t.path.split("/");return i[i.length-1]}}renderSelectedTags(){let t=this.selection;return h`<span class="tags"
            >${et(t,o=>h`<sl-tag data-id="${o.id}" title=${o.path} @sl-remove=${this._onRemoveSelection.bind(this)} @click=${i=>i.stopPropagation()} removable
                    >${this.getSelectedTagValue(o)}</sl-tag
                >`)}</span
        >`}renderSelection(){return h` <div class="selection" slot="trigger">
            ${B(this.selection.length===0&&this.options.placeholder,()=>h`<span class="placeholder">${this.options.placeholder}</span>`)} ${this.renderSelectedTags()}
            <span class="suffix">
                <sl-icon library="system" class="chevron ${L({active:this.active})}" name="chevron-down" aria-hidden="true"> </sl-icon>
            </span>
        </div>`}_onShowPopup(){this.active=true;}_onHidePopup(){this.active=false;}renderInput(){return h`
            <sl-dropdown size="${this.context.size}" @sl-show="${this._onShowPopup.bind(this)}" @sl-after-hide="${this._onHidePopup.bind(this)}" sync="width" hoist>
                ${this.renderSelection()}
                <div>${this.renderTree()}</div>
            </sl-dropdown>
        `}};exports.AutoFieldTreeDropdown.styles=[I.styles,exports.AutoFieldTreeSelect.styles,y`
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
        `],v([k()],exports.AutoFieldTreeDropdown.prototype,"active",2),v([$("sl-tree")],exports.AutoFieldTreeDropdown.prototype,"tree",2),exports.AutoFieldTreeDropdown=v([T("auto-field-tree-dropdown")],exports.AutoFieldTreeDropdown);function hc(e){if(e)if(e.type==="checkbox"){if(e.value==="on")return e.checked;if(e.value.startsWith("[")&&e.value.endsWith("]"))try{let r=JSON.parse(e.value);return e.checked?r[0]:r[1]}catch{return e.checked}else return e.checked?e.value:null}else return e.value}var At=class extends I{constructor(){super(...arguments);this.active=false;}static{this.styles=[I.styles,y`
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
        `];}getInitialOptions(){return {dropdown:true}}_isEmpty(){return Array.isArray(this.value)?this.value.length===0:this.value.trim()===""}_renderSelection(){return h`<div class="selection" slot="trigger">                    
                    ${B(this.options.icon,()=>h`<span class='icon'><sl-icon name="${this.options.icon}"></sl-icon></span>`)}
                    ${B(this._isEmpty()&&this.options.placeholder,()=>h`<span class='placeholder'>${this.options.placeholder}</span>`,()=>h`<span class="select-value">
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
            </div>       `}_renderContent(){return h`<div class="popoup-container ${w(this.options.dropdown?"dropdown":void 0)}">
            ${this.renderDropdown()}
        </div>`}renderDropdown(){}renderSelection(t){return h`    
        ${this.options.renderSelection?this.options.renderSelection(t||this.value,h):t||this.value}
            `}renderInput(){return this.options.dropdown?h`
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
            `:h`${this._renderContent()}`}};v([k()],At.prototype,"active",2);exports.AutoFieldCustom=class Mr extends At{constructor(){super(...arguments);this.selection=[];}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{placeholder:"\u8BF7\u9009\u62E9",dropdown:true,inputSelectors:"input,textarea"})}connectedCallback(){super.connectedCallback(),this._onFieldInput();}_onFieldInput(){this._subscribers.push({off:()=>{this.removeEventListener("input",this.onFieldInput),this.removeEventListener("change",this.onFieldInput);}}),this.addEventListener("input",this.onFieldInput),this.addEventListener("change",this.onFieldInput);}getInputValue(){return Array.from(this.shadowRoot.querySelectorAll(this.options.inputSelectors)).map(i=>hc(i))}renderDropdown(){let t=this.value.map(o=>$t(o));return h`<div class="container">${this.options.renderContent(t,h)}</div>`}};exports.AutoFieldCustom.styles=[At.styles],v([$(".container")],exports.AutoFieldCustom.prototype,"container",2),exports.AutoFieldCustom=v([T("auto-field-custom")],exports.AutoFieldCustom);function zi(e,r){let t=e.width,o=e.height,i=e.widget,s;try{s=document.createElement(`auto-field-${i||"input"}`);}catch{s=document.createElement("auto-field-input");}if(s.schema=e,s.setAttribute("part","field"),s.setAttribute("exportparts","field-value, field-label,field-help"),r?.styles&&Object.assign(s.style,r.styles),r?.attrs){for(let n in r.attrs)s.setAttribute(n,String(r.attrs[n]));s.parent=r.parent;}return t&&(s.style.width=String(t)),o&&(s.style.height=String(o)),r?.classs&&(typeof r.classs=="string"?s.classList.add(r.classs):typeof r.classs=="object"&&Object.entries(r.classs).forEach(([n,a])=>{a?s.classList.add(n):s.classList.remove(n);})),s}exports.AutoFieldCombine=class zr extends At{constructor(){super(...arguments);this._handleChildrenChange=()=>{this.onFieldChange(),this._updateSelection();};this._isFirst=true;}getInitialOptions(){return Object.assign({},super.getInitialOptions(),{children:[]})}connectedCallback(){super.connectedCallback(),this._onChildrenChange();}disconnectedCallback(){this.shadow.removeEventListener("change",this._handleChildrenChange),this.shadow.removeEventListener("input",this._handleChildrenChange);}_updateSelection(){this.selection&&setTimeout(()=>{let t=this.toState(this.getInputValue()),o=super.renderSelection(t);this._isFirst&&(fr(Y,this.selection),this._isFirst=false),fr(Y,this.selection,{isConnected:true}),fr(o,this.selection,{isConnected:true});});}_onChildrenChange(){this.options.children.length>0&&(this.shadow.addEventListener("change",this._handleChildrenChange),this.shadow.addEventListener("input",this._handleChildrenChange));}renderSelection(){return setTimeout(()=>this._updateSelection()),h``}getInputValue(){let t=Array.from(this.shadowRoot?.querySelectorAll(".children > *")||[]),o=[];return t.forEach(i=>{if(i.tagName.startsWith("AUTO-FIELD-")){let s=i.getInputValue();s===""&&(s=i.value),o.push(s);}}),o}renderDropdown(){return h`
            <div class="children">
                ${et(this.options.children,t=>h`${zi(t,{parent:this,attrs:{noreactive:true,compact:true}})}`)}
            </div>
        `}_handleStateChange(){}};exports.AutoFieldCombine.styles=[At.styles,y`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `],v([$(".selection>.select-value")],exports.AutoFieldCombine.prototype,"selection",2),exports.AutoFieldCombine=v([T("auto-field-combine")],exports.AutoFieldCombine);var Wd=["help","error","email","search","lock","user","globe","date","time","phone","copy","remove","refresh","datetime"];exports.AutoFieldIcons=class ur extends At{constructor(){super(...arguments);this.active=false;this.selected=[];this.icons=[];}getInitialOptions(){return {icons:[],size:"24px",multiple:false,dropdown:false,builtIn:true}}connectedCallback(){super.connectedCallback(),this.icons=Array.isArray(this.options.icons)?this.options.icons:this.options.icons.split(","),this.options.builtIn&&Wd.forEach(t=>{this.icons.includes(t)||this.icons.push(t);}),this.selected=Array.isArray(this.value)?this.value:this.value.split(",");}renderView(){return this.renderIcons(this.selected)}_isSelected(t){return this.options.multiple?this.selected.includes(t):this.selected[0]===t}_onClickIcon(t){if(!this.context.viewonly)if(this.options.multiple){let o=this.selected.findIndex(i=>i===t);o>-1?this.selected.splice(o,1):this.selected.push(t),this.onFieldInput();}else this.selected.length===0?this.selected.push(t):this.selected[0]=t,this.onFieldInput();}getInputValue(){return this.options.multiple?this.selected:this.selected[0]}renderIcons(t,o=true){return h`<div class="icons" style="font-size:${this.options.size}">
            ${et(t,i=>{if(i!=="")return h`<span class="icon ${o&&this._isSelected(i)?"selected":void 0}" title="${i}" @click=${()=>this._onClickIcon(i)}
                    ><sl-icon name="${i}" size="${this.options.size}"></sl-icon
                ></span>`})}
        </div>`}renderSelection(){return this.renderIcons(this.selected,false)}renderDropdown(){return this.renderIcons(this.icons)}};exports.AutoFieldIcons.styles=[I.styles,At.styles,y`
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
        `],v([k()],exports.AutoFieldIcons.prototype,"active",2),v([k()],exports.AutoFieldIcons.prototype,"selected",2),exports.AutoFieldIcons=v([T("auto-field-icons")],exports.AutoFieldIcons);exports.AutoFieldCascader=class me extends At{constructor(){super(...arguments);this.scrollbar=new Qe(this);this.active=false;this.data={};this.level=3;this.selected=[];this.focusItems=[];this.scrollbars=[];}getInitialOptions(){let t=Object.assign(super.getInitialOptions(),{idKey:"id",rootKey:"$root",labelKey:"label",maxLevel:3,childrenKey:"children",select:{}});return t.valueKey||(t.valueKey=t.idKey),t.idKey||(t.idKey=t.labelKey),t}connectedCallback(){super.connectedCallback();let t=typeof this.options.select=="object"&&this.options.childrenKey in this.options.select;t&&(this.options.rootKey=this.options.select[this.options.idKey]),this.data=t||Array.isArray(this.options.select)?this._normalizeData(this.options.select):this.options.select,this.selected=this._parseValues(this.value),this.focusItems=Array.from({length:this.options.maxLevel-1}).fill(null);}firstUpdated(){this._createScrollbars();}disconnectedCallback(){super.disconnectedCallback(),this._destoryScrollbars();}_createScrollbars(){this.shadowRoot?.querySelectorAll("sl-menu")?.forEach(o=>{this.scrollbars.push(this.scrollbar.create(o));});}_destoryScrollbars(){this.scrollbars?.forEach(t=>{t.destroy();});}_normalizeData(t){let o={},i=(s,n=false)=>{let a=s[this.options.idKey]||(n?"$root":void 0);if(!a)return;let l=s[this.options.childrenKey||"children"];l&&Array.isArray(l)&&l.length>0?(o[a]=l,l.forEach(d=>{i(d);})):o[a]=[];};return Array.isArray(t)?o.$root=t.reduce((s,n)=>(s.push(n),i(n),s),[]):i(t,true),o}_clearFocusItems(t){for(let o=t;o<=this.options.maxLevel;o++)Array.from(this.shadow.querySelectorAll(`[data-level='${o}']`)).forEach(s=>{s.classList.remove("focused");});}_onSelectItem(t){let o=t.detail.item;if(Number(o.dataset.level)!==this.options.maxLevel)return;let s=[],n=(l,d)=>{let m=this.data[d].findIndex(u=>String(u[this.options.idKey])===String(l));if(m>-1)return [this.data[d][m][this.options.labelKey],this.data[d][m][this.options.valueKey]]},a=this.options.rootKey;for(let l=0;l<this.focusItems.length;l++){let d=this.focusItems[l],m=n(d,a);if(!m)return;s.push([d,...m]),a=d;}this.selected=s,this.onFieldChange();}_getSelectedValue(t){let o=[],i=(n,a)=>{let l=this.data[a].findIndex(d=>String(d[this.options.idKey])===String(n));if(l>-1)return this.data[a][l][this.options.valueKey]},s=this.options.rootKey;for(let n=0;n<t.length;n++){let a=this.focusItems[n],l=i(a,s);if(!l)return;o.push(l),s=a;}return o}getInputValue(){let t=this.selected.map(o=>o[2]);return typeof this.value=="string"?t.join(this.options.delimiter||""):t}async _loadItem(t,o,i){let s;if(Array.isArray(this.data[o])&&this.data[o].length>0){t.dataset.lazy="done",this.requestUpdate();return}try{t.dataset.lazy="loading";let n=await this.options.onLoad(o);Array.isArray(n)&&(this.data[o]=n,n.forEach(a=>{a.lazy===void 0&&i<this.options.maxLevel&&(a.lazy=!0),this.data[a[this.options.idKey]]=[];}),this.requestUpdate());}catch(n){t.dataset.lazy="true",s=n;}finally{s||(t.dataset.lazy="done");}}_onItemMouseOverr(t){let o=t.target,i=o.dataset.id,s=Number(o.dataset.level);if(this.focusItems[s-1]===i)return;this._clearFocusItems(s),o.classList.add("focused"),o.dataset.lazy==="idle"&&this._loadItem(o,i,s),this.focusItems[s-1]=i,this.focusItems.forEach((a,l)=>{l>s-1&&(this.focusItems[l]=null);}),this.focusItems=[...this.focusItems];}_renderLevel(t,o=1,i){if(t)return h`<sl-menu class="level" @sl-select=${o===this.options.maxLevel?this._onSelectItem.bind(this):null}>
            ${et(t,s=>{let n=s[this.options.idKey],a=this.selected[o-1]?.[0]===s[this.options.idKey],l=s.lazy||Array.isArray(this.data[n])&&this.data[n].length===0;return h` <sl-menu-item
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
                    ${B(o<this.options.maxLevel,()=>h`${B(s.lazy,()=>h`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}
                </sl-menu-item>`})}
        </sl-menu>`}_parseValues(t){let o=[],i=[];if(Array.isArray(t))o=t;else if(t&&typeof t=="string")if(this.options.delimiter&&this.options.delimiter.length>0)o=t.split(this.options.delimiter);else {let s=this.data[this.options.rootKey],n=t;for(;;){let a=s.find(l=>n.startsWith(l[this.options.valueKey]));if(a){if(o.push(a[this.options.valueKey]),n=n.substring(a[this.options.valueKey].length),s=this.data[a[this.options.idKey]],!s)break}else break}}if(o.length>0){let s=this.data[this.options.rootKey];for(let n=0;n<o.length;n++){let a=o[n],l=s.find(d=>d[this.options.valueKey]===a);if(l){if(i.push([l[this.options.idKey],l[this.options.labelKey],l[this.options.valueKey]]),s=this.data[l[this.options.idKey]],!s)break}else break}}return i}renderSelection(){return h`
            ${this.selected.map(t=>t[1]).join(this.options.delimiter||"")}
        `}renderDropdown(){let t=this.data[this.options.rootKey],o=this.focusItems;return h`<div class="levels">
            ${et(Array.from({length:this.options.maxLevel}),(i,s)=>{if(s===0)return this._renderLevel(t,s+1,this.options.rootKey);{let n=o[s-1],a=this.data[n];return a?this._renderLevel(a,s+1,n):this._renderLevel([],s+1,n)}})}
        </div>`}};exports.AutoFieldCascader.styles=[I.styles,At.styles,Qe.styles,y`
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
        `],v([k()],exports.AutoFieldCascader.prototype,"active",2),v([k()],exports.AutoFieldCascader.prototype,"data",2),v([k()],exports.AutoFieldCascader.prototype,"level",2),v([k()],exports.AutoFieldCascader.prototype,"selected",2),v([k()],exports.AutoFieldCascader.prototype,"focusItems",2),exports.AutoFieldCascader=v([T("auto-field-cascader")],exports.AutoFieldCascader);exports.AutoFieldDateRange=class Vr extends I{getInitialOptions(){return {icon:"date",delimiter:",",includeTime:false}}_onInputChange(r){let t=r.type;this.context.validAt==="input"&&t.includes("input")?this.onFieldInput():t.includes("change")&&this.onFieldChange();}_getDate(r){return (Array.isArray(this.value)?this.value:this.value.split(this.options.delimiter))[r]}_renderIcon(){if(this.options.icon)return h`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`}_renderDate(r){return h`<sl-input
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
        >`}renderInput(){return h`
            <div class="dates">
                ${this._renderDate(0)}
                <span class="sp">-</span>
                ${this._renderDate(1)}
            </div>
        `}getInputValue(){let r=Array.from(this.inputs||[]).map(t=>t.value);return Array.isArray(this.value)?r:r.join(this.options.delimiter)}};exports.AutoFieldDateRange.styles=[I.styles,y`
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
        `],v([$n("sl-input")],exports.AutoFieldDateRange.prototype,"inputs",2),exports.AutoFieldDateRange=v([T("auto-field-date-range")],exports.AutoFieldDateRange);var mc=y`
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
`;var Ud=0,te=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.attrId=++Ud,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=false,this.closable=false,this.disabled=false,this.tabIndex=0;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab");}handleCloseClick(e){e.stopPropagation(),this.emit("sl-close");}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false");}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0;}render(){return this.id=this.id.length>0?this.id:this.componentId,h`
      <div
        part="base"
        class=${L({tab:true,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?h`
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
    `}};te.styles=[z,mc];te.dependencies={"sl-icon-button":ut};c([$(".tab")],te.prototype,"tab",2);c([p({reflect:true})],te.prototype,"panel",2);c([p({type:Boolean,reflect:true})],te.prototype,"active",2);c([p({type:Boolean,reflect:true})],te.prototype,"closable",2);c([p({type:Boolean,reflect:true})],te.prototype,"disabled",2);c([p({type:Number,reflect:true})],te.prototype,"tabIndex",2);c([A("active")],te.prototype,"handleActiveChange",1);c([A("disabled")],te.prototype,"handleDisabledChange",1);te.define("sl-tab");var fc=y`
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
`;var gc=y`
  :host {
    display: contents;
  }
`;var To=class extends M{constructor(){super(...arguments),this.observedElements=[],this.disabled=false;}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit("sl-resize",{detail:{entries:e}});}),this.disabled||this.startObserver();}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver();}handleSlotChange(){this.disabled||this.startObserver();}startObserver(){let e=this.shadowRoot.querySelector("slot");if(e!==null){let r=e.assignedElements({flatten:true});this.observedElements.forEach(t=>this.resizeObserver.unobserve(t)),this.observedElements=[],r.forEach(t=>{this.resizeObserver.observe(t),this.observedElements.push(t);});}}stopObserver(){this.resizeObserver.disconnect();}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver();}render(){return h` <slot @slotchange=${this.handleSlotChange}></slot> `}};To.styles=[z,gc];c([p({type:Boolean,reflect:true})],To.prototype,"disabled",2);c([A("disabled",{waitUntilFirstUpdate:true})],To.prototype,"handleDisabledChange",1);var yt=class extends M{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new j(this),this.hasScrollControls=false,this.shouldHideScrollStartButton=false,this.shouldHideScrollEndButton=false,this.placement="top",this.activation="auto",this.noScrollControls=false,this.fixedScrollControls=false,this.scrollOffset=1;}connectedCallback(){let e=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls();}),this.mutationObserver=new MutationObserver(r=>{let t=r.filter(({target:o})=>{if(o===this)return  true;if(o.closest("sl-tab-group")!==this)return  false;let i=o.tagName.toLowerCase();return i==="sl-tab"||i==="sl-tab-panel"});if(t.length!==0){if(t.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels()),t.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(t.some(o=>o.attributeName==="active")){let i=t.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="sl-tab").map(s=>s.target).find(s=>s.active);i&&this.setActiveTab(i);}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:true,attributeFilter:["active","disabled","name","panel"],childList:true,subtree:true}),this.resizeObserver.observe(this.nav),e.then(()=>{new IntersectionObserver((t,o)=>{var i;t[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((i=this.getActiveTab())!=null?i:this.tabs[0],{emitEvents:false}),o.unobserve(t[0].target));}).observe(this.tabGroup);});});}disconnectedCallback(){var e,r;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect(),this.nav&&((r=this.resizeObserver)==null||r.unobserve(this.nav));}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return [...this.body.assignedElements()].filter(e=>e.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){let t=e.target.closest("sl-tab");t?.closest("sl-tab-group")===this&&t!==null&&this.setActiveTab(t,{scrollBehavior:"smooth"});}handleKeyDown(e){let t=e.target.closest("sl-tab");if(t?.closest("sl-tab-group")===this&&(["Enter"," "].includes(e.key)&&t!==null&&(this.setActiveTab(t,{scrollBehavior:"smooth"}),e.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))){let i=this.tabs.find(a=>a.matches(":focus")),s=this.localize.dir()==="rtl",n=null;if(i?.tagName.toLowerCase()==="sl-tab"){if(e.key==="Home")n=this.focusableTabs[0];else if(e.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&e.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&e.key==="ArrowUp"){let a=this.tabs.findIndex(l=>l===i);n=this.findNextFocusableTab(a,"backward");}else if(["top","bottom"].includes(this.placement)&&e.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&e.key==="ArrowDown"){let a=this.tabs.findIndex(l=>l===i);n=this.findNextFocusableTab(a,"forward");}if(!n)return;n.tabIndex=0,n.focus({preventScroll:true}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(a=>{a.tabIndex=a===n?0:-1;}),["top","bottom"].includes(this.placement)&&co(n,this.nav,"horizontal"),e.preventDefault();}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"});}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"});}setActiveTab(e,r){if(r=kt({emitEvents:true,scrollBehavior:"auto"},r),e!==this.activeTab&&!e.disabled){let t=this.activeTab;this.activeTab=e,this.tabs.forEach(o=>{o.active=o===this.activeTab,o.tabIndex=o===this.activeTab?0:-1;}),this.panels.forEach(o=>{var i;return o.active=o.name===((i=this.activeTab)==null?void 0:i.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&co(this.activeTab,this.nav,"horizontal",r.scrollBehavior),r.emitEvents&&(t&&this.emit("sl-tab-hide",{detail:{name:t.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}));}}setAriaLabels(){this.tabs.forEach(e=>{let r=this.panels.find(t=>t.name===e.panel);r&&(e.setAttribute("aria-controls",r.getAttribute("id")),r.setAttribute("aria-labelledby",e.getAttribute("id")));});}repositionIndicator(){let e=this.getActiveTab();if(!e)return;let r=e.clientWidth,t=e.clientHeight,o=this.localize.dir()==="rtl",i=this.getAllTabs(),n=i.slice(0,i.indexOf(e)).reduce((a,l)=>({left:a.left+l.clientWidth,top:a.top+l.clientHeight}),{left:0,top:0});switch(this.placement){case "top":case "bottom":this.indicator.style.width=`${r}px`,this.indicator.style.height="auto",this.indicator.style.translate=o?`${ -1*n.left}px`:`${n.left}px`;break;case "start":case "end":this.indicator.style.width="auto",this.indicator.style.height=`${t}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls());}findNextFocusableTab(e,r){let t=null,o=r==="forward"?1:-1,i=e+o;for(;e<this.tabs.length;){if(t=this.tabs[i]||null,t===null){r==="forward"?t=this.focusableTabs[0]:t=this.focusableTabs[this.focusableTabs.length-1];break}if(!t.disabled)break;i+=o;}return t}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd());}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=false:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons();}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none";}show(e){let r=this.tabs.find(t=>t.panel===e);r&&this.setActiveTab(r,{scrollBehavior:"smooth"});}render(){let e=this.localize.dir()==="rtl";return h`
      <div
        part="base"
        class=${L({"tab-group":true,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?h`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${L({"tab-group__scroll-button":true,"tab-group__scroll-button--start":true,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
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

          ${this.hasScrollControls?h`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${L({"tab-group__scroll-button":true,"tab-group__scroll-button--end":true,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
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
    `}};yt.styles=[z,fc];yt.dependencies={"sl-icon-button":ut,"sl-resize-observer":To};c([$(".tab-group")],yt.prototype,"tabGroup",2);c([$(".tab-group__body")],yt.prototype,"body",2);c([$(".tab-group__nav")],yt.prototype,"nav",2);c([$(".tab-group__indicator")],yt.prototype,"indicator",2);c([k()],yt.prototype,"hasScrollControls",2);c([k()],yt.prototype,"shouldHideScrollStartButton",2);c([k()],yt.prototype,"shouldHideScrollEndButton",2);c([p()],yt.prototype,"placement",2);c([p()],yt.prototype,"activation",2);c([p({attribute:"no-scroll-controls",type:Boolean})],yt.prototype,"noScrollControls",2);c([p({attribute:"fixed-scroll-controls",type:Boolean})],yt.prototype,"fixedScrollControls",2);c([Ae({passive:true})],yt.prototype,"updateScrollButtons",1);c([A("noScrollControls",{waitUntilFirstUpdate:true})],yt.prototype,"updateScrollControls",1);c([A("placement",{waitUntilFirstUpdate:true})],yt.prototype,"syncIndicator",1);yt.define("sl-tab-group");var qd=(e,r)=>{let t=0;return function(...o){window.clearTimeout(t),t=window.setTimeout(()=>{e.call(this,...o);},r);}},bc=(e,r,t)=>{let o=e[r];e[r]=function(...i){o.call(this,...i),t.call(this,o,...i);};};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){let r=new Set,t=new WeakMap,o=s=>{for(let n of s.changedTouches)r.add(n.identifier);},i=s=>{for(let n of s.changedTouches)r.delete(n.identifier);};document.addEventListener("touchstart",o,true),document.addEventListener("touchend",i,true),document.addEventListener("touchcancel",i,true),bc(EventTarget.prototype,"addEventListener",function(s,n){if(n!=="scrollend")return;let a=qd(()=>{r.size?a():this.dispatchEvent(new Event("scrollend"));},100);s.call(this,"scroll",a,{passive:true}),t.set(this,a);}),bc(EventTarget.prototype,"removeEventListener",function(s,n){if(n!=="scrollend")return;let a=t.get(this);a&&s.call(this,"scroll",a,{passive:true});});}})();var vc=y`
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
`;var Kd=0,Pr=class extends M{constructor(){super(...arguments),this.attrId=++Kd,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=false;}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel");}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true");}render(){return h`
      <slot
        part="base"
        class=${L({"tab-panel":true,"tab-panel--active":this.active})}
      ></slot>
    `}};Pr.styles=[z,vc];c([p({reflect:true})],Pr.prototype,"name",2);c([p({type:Boolean,reflect:true})],Pr.prototype,"active",2);c([A("active")],Pr.prototype,"handleActiveChange",1);Pr.define("sl-tab-panel");q.define("sl-icon");var yc=y`
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
`;var Vi=y`    
    ${yc}
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
`;var le=class extends pt{constructor(){super();this.forms=[];vr();}static{this.styles=[Vi,He,y`
            :host {
                display: block;
                width: 100%;
                background-color: var(--auto-bgcolor);
                    font: var(--auto-font);
            }
        `];}firstUpdated(){this.forms=this.getForms(),this.forms.length===0&&setTimeout(()=>{this.forms=this.getForms();});}getForms(){let t=this.shadowRoot.querySelector("slot");return t?t.assignedElements({flatten:true}):[]}bind(t){this.store=t,this.forms&&this.forms.forEach(o=>{o.bind&&o.bind(t);});}getFormInfo(t,o){let i=t.getAttribute("icon")||t.dataset.icon,s=t.getAttribute("label")||t.dataset.label,n=t.getAttribute("title")||t.dataset.title,a=t.getAttribute("name")||t.dataset.name||"",l=this.active?this.active.split(",").includes(a):o===0;return {icon:i,label:s,title:n,name:a,active:l}}renderGroups(){}render(){return h`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `}};v([$("slot")],le.prototype,"slotElement",2),v([p()],le.prototype,"active",2),v([k()],le.prototype,"forms",2);exports.AutoFormTabs=class hr extends le{constructor(){super(...arguments);this.direction="top";this.hideLabel=false;}_getPlacement(){return this.direction==="left"?"start":this.direction==="right"?"end":this.direction}renderGroups(){return h`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${()=>this.dispatchEvent(new CustomEvent("tab-change"))}"
            >
                ${this.forms.map((t,o)=>{if(t.tagName!=="AUTO-FORM")return;let i=this.getFormInfo(t,o);return t.bind&&t.bind(this.store),t.setAttribute("border","none"),h`
                        <sl-tab
                            ?active=${i.active}
                            slot="nav"
                            title="${w(i.title||i.label)}"
                            panel="${o}"
                        >
                            ${i.icon?h`<sl-icon name="${i.icon}"></sl-icon>`:""}
                            ${B(!this.hideLabel&&i.label,()=>h`<span class="label">${i.label}</span>`)}
                        </sl-tab>
                    `})}
                ${this.forms.map((t,o)=>h`<sl-tab-panel name="${o}" class="scrollbar"
                            >${t}</sl-tab-panel
                        >`)}
            </sl-tab-group>
        `}};exports.AutoFormTabs.styles=[le.styles,y`
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
        `],v([p({type:String,reflect:true})],exports.AutoFormTabs.prototype,"direction",2),v([p({type:Boolean,reflect:true})],exports.AutoFormTabs.prototype,"hideLabel",2),exports.AutoFormTabs=v([T("auto-form-tabs")],exports.AutoFormTabs);var xc=y`
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
`;var ee=class extends M{constructor(){super(...arguments),this.localize=new j(this),this.open=false,this.disabled=false;}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=true),this.detailsObserver=new MutationObserver(e=>{for(let r of e)r.type==="attributes"&&r.attributeName==="open"&&(this.details.open?this.show():this.hide());}),this.detailsObserver.observe(this.details,{attributes:true});}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.detailsObserver)==null||e.disconnect();}handleSummaryClick(e){e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus());}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show());}async handleOpenChange(){if(this.open){if(this.details.open=true,this.emit("sl-show",{cancelable:true}).defaultPrevented){this.open=false,this.details.open=false;return}await Xt(this.body);let{keyframes:r,options:t}=Gt(this,"details.show",{dir:this.localize.dir()});await Yt(this.body,Ir(r,this.body.scrollHeight),t),this.body.style.height="auto",this.emit("sl-after-show");}else {if(this.emit("sl-hide",{cancelable:true}).defaultPrevented){this.details.open=true,this.open=true;return}await Xt(this.body);let{keyframes:r,options:t}=Gt(this,"details.hide",{dir:this.localize.dir()});await Yt(this.body,Ir(r,this.body.scrollHeight),t),this.body.style.height="auto",this.details.open=false,this.emit("sl-after-hide");}}async show(){if(!(this.open||this.disabled))return this.open=true,we(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=false,we(this,"sl-after-hide")}render(){let e=this.localize.dir()==="rtl";return h`
      <details
        part="base"
        class=${L({details:true,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":e})}
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
    `}};ee.styles=[z,xc];ee.dependencies={"sl-icon":q};c([$(".details")],ee.prototype,"details",2);c([$(".details__header")],ee.prototype,"header",2);c([$(".details__body")],ee.prototype,"body",2);c([$(".details__expand-icon-slot")],ee.prototype,"expandIconSlot",2);c([p({type:Boolean,reflect:true})],ee.prototype,"open",2);c([p()],ee.prototype,"summary",2);c([p({type:Boolean,reflect:true})],ee.prototype,"disabled",2);c([A("open",{waitUntilFirstUpdate:true})],ee.prototype,"handleOpenChange",1);Kt("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Kt("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});ee.define("sl-details");var _c=y`
    ${Xo}
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
    ${He}
`;exports.AutoCollapse=class fe extends pt{constructor(){super(...arguments);this.active="";this.accordion=false;this.panels=[];this._activeArray=[];}firstUpdated(){this.panels=this.getPanels();}connectedCallback(){super.connectedCallback(),vr(),this._activeArray=this.active?this.active.split(","):[];}getPanels(){let t=this.shadowRoot.querySelector("slot");return t?t.assignedElements({flatten:true}):[]}updated(t){t.has("active")&&typeof this.active=="string"&&(this._activeArray=this.active?this.active.split(","):[]),super.updated(t);}togglePanel(t){let o=this._activeArray.indexOf(t);if(o===-1)this.accordion?this._activeArray=[t]:this._activeArray=[...this._activeArray,t];else {let i=[...this._activeArray];i.splice(o,1),this._activeArray=i;}this.active=this._activeArray.join(","),this.dispatchEvent(new CustomEvent("change",{detail:{active:this.active}}));}isPanelActive(t){return this._activeArray.includes(t)}_onActionClick(t,o){let i=new CustomEvent("action-click",{detail:{name:t},composed:true,bubbles:true});o.stopPropagation(),this.dispatchEvent(i);}_renderHeaderActions(t){let o=(t.getAttribute("data-actions")||"").split(",");if(o.length>0)return et(o,i=>{let[s,n]=i.split(":");return h`<sl-icon
                    part="action"
                    class="icon action"
                    name=${s}
                    title=${n}
                    @click=${a=>{this._onActionClick(s,a);}}
                ></sl-icon>`})}_renderHeader(t){let o=t.getAttribute("name")||t.dataset.name||"",i=t.getAttribute("label")||t.dataset.label||"",s=t.getAttribute("icon")||t.dataset.icon||"",n=this.isPanelActive(o);return h`
            <div
                part="header"
                class="header ${L({active:n})}"
                @click=${()=>this.togglePanel(o)}
            >
                ${s?h`<sl-icon name="${s}" class="icon"></sl-icon>`:""}
                <div part="label" class="label">${i}</div>
                ${this._renderHeaderActions(t)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `}renderPanels(){return this.panels.map(t=>{let o=t.getAttribute("name")||t.dataset.name||"",i=this.isPanelActive(o),s=Z({padding:this.padding});return h`
                ${this._renderHeader(t)}
                <div
                    part="content"
                    class="content scrollbar ${L({active:i})}"
                    style=${s}
                >
                    ${t}
                </div>
            `})}_onSlotChange(){let t=this.getPanels();if(t.length>0){let o=this.panels.map(s=>s.getAttribute("name")||s.dataset.name).filter(s=>!!s),i=t.filter(s=>!o.includes(s.getAttribute("name")||s.dataset.name));this.panels.push(...i),this.requestUpdate();}}render(){return h`
            ${this.renderPanels()}
            <slot @slotchange=${this._onSlotChange.bind(this)} style="display:none;"></slot>
        `}};exports.AutoCollapse.styles=[_c],v([p({type:String,reflect:true})],exports.AutoCollapse.prototype,"active",2),v([p({type:String,reflect:true})],exports.AutoCollapse.prototype,"padding",2),v([p({type:Boolean,reflect:true})],exports.AutoCollapse.prototype,"accordion",2),v([k()],exports.AutoCollapse.prototype,"panels",2),v([k()],exports.AutoCollapse.prototype,"_activeArray",2),exports.AutoCollapse=v([T("auto-collapse")],exports.AutoCollapse);exports.AutoFormCollapse=class Ne extends le{constructor(){super(...arguments);this.active="";this.accordion=false;}renderGroups(){return h`
            <auto-collapse
                style="flex-grow:1;min-height:0"
                active=${w(this.active)}
                padding=${w(this.padding)}
                ?accordion=${this.accordion}
            >
                ${this.forms.map(t=>{if(t.tagName==="AUTO-FORM")return t.bind&&t.bind(this.store),t.setAttribute("border","none"),t})}
            </auto-collapse>
        `}};exports.AutoFormCollapse.styles=[le.styles,y`
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
        `],v([p({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"active",2),v([p({type:String,reflect:true})],exports.AutoFormCollapse.prototype,"padding",2),v([p({type:Boolean,reflect:true})],exports.AutoFormCollapse.prototype,"accordion",2),exports.AutoFormCollapse=v([T("auto-form-collapse")],exports.AutoFormCollapse);var wc=y`
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

`;exports.AutoFlex=class Pt extends pt{constructor(){super(...arguments);this.classes=new Ie(this);this.direction="row";this.gap="0";this.align="center";this.justify="center";this.border="inline";this.fit=false;}updateStyles(){let t=String(parseInt(this.gap))===String(this.gap)?`${this.gap}px`:this.gap;this.style.gap=t,this.grow&&Array.from(this.querySelectorAll(this.grow)).forEach(o=>{o.style.flexGrow="1";}),this.shrink&&Array.from(this.querySelectorAll(this.shrink)).forEach(o=>{o.style.flexShrink="1";}),this.border==="inline"?this.classList.add("inline-border"):this.border==="full"&&this.classList.add("border");}connectedCallback(){super.connectedCallback(),this.grow||(this.grow=this.direction==="row"?":first-child":":last-child"),this.updateStyles();}attributeChangedCallback(t,o,i){super.attributeChangedCallback(t,o,i),this.updateStyles();}render(){return h` <slot></slot> `}};exports.AutoFlex.styles=wc,v([p({type:String})],exports.AutoFlex.prototype,"direction",2),v([p({type:String})],exports.AutoFlex.prototype,"gap",2),v([p({type:Boolean})],exports.AutoFlex.prototype,"wrap",2),v([p({type:String})],exports.AutoFlex.prototype,"align",2),v([p({type:String})],exports.AutoFlex.prototype,"justify",2),v([p({type:String})],exports.AutoFlex.prototype,"border",2),v([p({type:String})],exports.AutoFlex.prototype,"grow",2),v([p({type:String})],exports.AutoFlex.prototype,"shrink",2),v([p({type:Boolean,reflect:true})],exports.AutoFlex.prototype,"fit",2),exports.AutoFlex=v([T("auto-flex")],exports.AutoFlex);exports.AutoLoading=class We extends pt{constructor(){super(...arguments);this.tips="Loading";this.hide=false;this.size="2em";}render(){return this.hide?h``:h`  
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
    `,v([p({type:String})],exports.AutoLoading.prototype,"tips",2),v([p({type:Boolean})],exports.AutoLoading.prototype,"hide",2),v([p({type:String})],exports.AutoLoading.prototype,"size",2),exports.AutoLoading=v([T("auto-loading")],exports.AutoLoading);G.define("sl-button");F.define("sl-input");var Cc=y`
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
`;var Ro=class extends M{constructor(){super(...arguments),this.vertical=false;}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator");}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal");}};Ro.styles=[z,Cc];c([p({type:Boolean,reflect:true})],Ro.prototype,"vertical",2);c([A("vertical")],Ro.prototype,"handleVerticalChange",1);Ro.define("sl-divider");ft.define("sl-dropdown");Se.define("sl-spinner");ut.define("sl-icon-button");var st=class st extends pt{constructor(){super(...arguments);this.classs=new Ie(this);this.ctxController=new wr(this);this.seq=++st.seq;this.context={};this.schemas=[];this.validAtInit=false;this.compact=false;this.validAt="lost-focus";this.border="grid";this.size="medium";this.labelPos="top";this.labelWidth="7em";this.dark=false;this.readonly=false;this.viewonly=false;this.viewAlign="right";this.layout="auto";this._loading=false;}static{this.seq=0;}static{this.styles=Vi;}get dirty(){return this.context.dirty}get invalid(){return this.context.invalid}connectedCallback(){super.connectedCallback(),this.bind(this.store),vr();}shouldUpdate(t){return t.has("store")&&this.bind(this.store),true}attributeChangedCallback(t,o,i){super.attributeChangedCallback(t,o,i),["group","sort","advanced","path"].includes(t)?setTimeout(()=>this._load()):t==="store"&&this.bind(i);}_initialContext(){Object.assign(this.context,{store:this.store,form:this,labelPos:this.labelPos,labelWidth:this.labelWidth,viewAlign:this.viewAlign,border:this.border,group:this.group,advanced:this.advanced,dark:this.dark,dirty:false,invalid:this._isValid(),validAtInit:this.validAtInit});}_isValid(){if(this.path){let t=this.store.schemas.errors||{};return Object.keys(t).some(o=>dl(this.path.split("."),o.split(".")))}else return Object.keys(this.store.schemas.errors).length>0}_load(t=true){if(this.store&&!this._loading)try{this._initialContext();let o=this.path?this.store.schemas.find(this.path):Object.values(this.store.schemas.store.state),i=s=>{if(!this.group||["default","general"].includes(this.group)&&s.group===void 0||["","*"].includes(this.group))return !0;let n=(s.group||"").split(","),a=this.group.split(",");return n.some(l=>a.includes(l))};this.schemas=Object.values(o).filter(s=>!(!i(s)||this.advanced===!1&&s.advanced)).sort((s,n)=>(s.order||0)-(n.order||0)),t&&this.requestUpdate();}finally{this._loading=false;}}bind(t){t&&(this.store=t,this._load(true));}clearErrors(){this.store.schemas.errors={},Array.from(this.shadowRoot.querySelectorAll(".fields > *")).forEach(o=>{o.tagName.startsWith("auto-field")&&(o.invalidTips=void 0);}),this.requestUpdate();}_renderFields(){return h` ${this.schemas.map(t=>h`${zi(t,{attrs:{size:this.size}})}`)}`}render(){return this.classs.use(this.size,{dark:this.context.dark,[`${this.labelPos}-label`]:true,[`view-${this.viewAlign}`]:true,compact:this.compact,dirty:this.context.dirty,invalid:this.invalid}),h`
            <div class="actions header"></div>
            <div class="fields">${this._renderFields()}</div>
            <div class="actions footer"></div>
        `}reset(){this.store?.reset(),this._initialContext(),Cr(this,"dirty",false),Cr(this,"invalid",false);}submit(t){if(typeof t=="function"){let o=this.store?.schemas.getValues()||{},i=this.store?.schemas.errors;t(o,i);}}};v([cs({context:Yo})],st.prototype,"context",2),v([p({type:Object})],st.prototype,"store",2),v([p({type:Boolean,reflect:true})],st.prototype,"validAtInit",2),v([p({type:String,reflect:true})],st.prototype,"group",2),v([p({type:String,reflect:true})],st.prototype,"icon",2),v([p({type:String,reflect:true})],st.prototype,"path",2),v([p({type:Boolean,reflect:true})],st.prototype,"compact",2),v([p({type:Boolean,reflect:true})],st.prototype,"advanced",2),v([p({type:String,reflect:true})],st.prototype,"validAt",2),v([p({type:String,reflect:true})],st.prototype,"border",2),v([p({type:String})],st.prototype,"size",2),v([p({type:String,reflect:true})],st.prototype,"labelPos",2),v([p({type:String,reflect:true})],st.prototype,"labelWidth",2),v([p({type:Boolean,reflect:true})],st.prototype,"dark",2),v([p({type:Boolean,reflect:true})],st.prototype,"readonly",2),v([p({type:Boolean,reflect:true})],st.prototype,"viewonly",2),v([p({type:String,reflect:true})],st.prototype,"viewAlign",2),v([p({type:String,reflect:true})],st.prototype,"layout",2),v([p({type:String,reflect:true})],st.prototype,"icons",2);var Ys=st;customElements.get("auto-form")||customElements.define("auto-form",Ys);/*! Bundled license information:

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
*/exports.AutoField=I;exports.AutoForm=Ys;return exports;})({});//# sourceMappingURL=index.global.js.map
//# sourceMappingURL=index.global.js.map