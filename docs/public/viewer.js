(function(){var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=globalThis,n=t.ShadowRoot&&(t.ShadyCSS===void 0||t.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap,a=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(n&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=i.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(t,e))}return e}toString(){return this.cssText}},o=e=>new a(typeof e==`string`?e:e+``,void 0,r),s=(e,...t)=>new a(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,r),c=(e,r)=>{if(n)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of r){let r=document.createElement(`style`),i=t.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=n.cssText,e.appendChild(r)}},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return o(t)})(e):e,{is:u,defineProperty:d,getOwnPropertyDescriptor:f,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:ee}=Object,h=globalThis,te=h.trustedTypes,ne=te?te.emptyScript:``,re=h.reactiveElementPolyfillSupport,g=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?ne:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ie=(e,t)=>!u(e,t),ae={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ae){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=f(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ae}static _$Ei(){if(this.hasOwnProperty(g(`elementProperties`)))return;let e=ee(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g(`properties`))){let e=this.properties,t=[...p(e),...m(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(l(e))}else e!==void 0&&t.push(l(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?_:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?_:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ie)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:`open`},v[g(`elementProperties`)]=new Map,v[g(`finalized`)]=new Map,re?.({ReactiveElement:v}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var oe=globalThis,se=e=>e,y=oe.trustedTypes,ce=y?y.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,le=`$lit$`,b=`lit$${Math.random().toFixed(9).slice(2)}$`,ue=`?`+b,de=`<${ue}>`,x=document,S=()=>x.createComment(``),C=e=>e===null||typeof e!=`object`&&typeof e!=`function`,fe=Array.isArray,pe=e=>fe(e)||typeof e?.[Symbol.iterator]==`function`,me=`[ 	
\f\r]`,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ge=/>/g,T=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),_e=/'/g,ve=/"/g,ye=/^(?:script|style|textarea|title)$/i,be=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),E=be(1),D=be(2),O=Symbol.for(`lit-noChange`),k=Symbol.for(`lit-nothing`),xe=new WeakMap,A=x.createTreeWalker(x,129);function Se(e,t){if(!fe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ce===void 0?t:ce.createHTML(t)}var Ce=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=w;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===w?c[1]===`!--`?o=he:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=T):(ye.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=T):o=ge:o===T?c[0]===`>`?(o=i??w,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?T:c[3]===`"`?ve:_e):o===ve||o===_e?o=T:o===he||o===ge?o=w:(o=T,i=void 0);let d=o===T&&e[t+1].startsWith(`/>`)?` `:``;a+=o===w?n+de:l>=0?(r.push(s),n.slice(0,l)+le+n.slice(l)+b+d):n+b+(l===-2?t:d)}return[Se(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},we=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ce(t,n);if(this.el=e.createElement(l,r),A.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=A.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(le)){let t=u[o++],n=i.getAttribute(e).split(b),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ee:r[1]===`?`?De:r[1]===`@`?Oe:N}),i.removeAttribute(e)}else e.startsWith(b)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ye.test(i.tagName)){let e=i.textContent.split(b),t=e.length-1;if(t>0){i.textContent=y?y.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],S()),A.nextNode(),c.push({type:2,index:++a});i.append(e[t],S())}}}else if(i.nodeType===8){if(i.data===ue)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(b,e+1))!==-1;)c.push({type:7,index:a}),e+=b.length-1}}a++}}static createElement(e,t){let n=x.createElement(`template`);return n.innerHTML=e,n}};function j(e,t,n=e,r){if(t===O)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=C(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=j(e,i._$AS(e,t.values),i,r)),t}var Te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??x).importNode(t,!0);A.currentNode=r;let i=A.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new M(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ke(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=A.nextNode(),a++)}return A.currentNode=x,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},M=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),C(e)?e===k||e==null||e===``?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==O&&this._(e):e._$litType$===void 0?e.nodeType===void 0?pe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==k&&C(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=we.createElement(Se(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Te(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new we(e)),t}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(S()),this.O(S()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=se(e).nextSibling;se(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=k}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=j(this,e,t,0),a=!C(e)||e!==this._$AH&&e!==O,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=j(this,r[n+o],t,o),s===O&&(s=this._$AH[o]),a||=!C(s)||s!==this._$AH[o],s===k?e=k:e!==k&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ee=class extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}},De=class extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==k)}},Oe=class extends N{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=j(this,e,t,0)??k)===O)return;let n=this._$AH,r=e===k&&n!==k||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==k&&(n===k||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}},Ae={M:le,P:b,A:ue,C:1,L:Ce,R:Te,D:pe,V:j,I:M,H:N,N:De,U:Oe,B:Ee,F:ke},je=oe.litHtmlPolyfillSupport;je?.(we,M),(oe.litHtmlVersions??=[]).push(`3.3.2`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new M(t.insertBefore(S(),e),e,void 0,n??{})}return i._$AI(e),i},Ne=globalThis,P=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};P._$litElement$=!0,P.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:P});var Pe=Ne.litElementPolyfillSupport;Pe?.({LitElement:P}),(Ne.litElementVersions??=[]).push(`4.2.2`);var Fe=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Ie={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:ie},Le=(e=Ie,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function F(e){return(t,n)=>typeof n==`object`?Le(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function I(e){return F({...e,state:!0,attribute:!1})}var Re=`asv-`;function L(e){return Re+e}var ze={object:D`<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>`,array:D`<path d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3"/><path d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"/>`,string:D`<path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/>`,number:D`<rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/>`,boolean:D`<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>`,default:D`<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/>`,function:D`<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"/><path d="M9 11.2h5.7"/>`,markRaw:D`<path d="M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m15 17 5 5"/><path d="m20 17-5 5"/>`,chevron:D`<path d="m9 18 6-6-6-6"/>`,copy:D`<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,no:D`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,yes:D`<path d="M20 6 9 17l-5-5"/>`,edit:D`<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>`,trash:D`<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`},Be={"chevron-sm":D`<path d="m8.5 19 7-7-7-7"/>`},Ve={computed:D`<path d="M755.2 730.9l102.4-102.4c14.1-14.1 14.1-36.9 0-50.9-14.1-14.1-36.9-14.1-50.9 0L704.3 680 601.9 577.6c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l102.4 102.4L551 833.3c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5s18.4-3.5 25.5-10.5l102.4-102.4 102.4 102.4c7 7 16.2 10.5 25.5 10.5s18.4-3.5 25.5-10.5c14.1-14.1 14.1-36.9 0-50.9L755.2 730.9zM638.6 119.3c9.5-21-2.9-45.4-25.4-50.1-31.9-6.6-77.9-9.7-123.9 9.8-35.1 14.9-62 34.3-82.1 59.6-18.2 22.9-27.7 46.9-34 62.8-16.7 42.1-54 208.8-54.4 210.5-0.5 2.3-1.1 5.1-1.8 8.2H166.3c-20.2 0-37.1 16.5-36.7 36.7 0.4 19.6 16.3 35.3 36 35.3h134.6c-34.5 146.2-100 419.4-100.8 422.8-4.6 19.3 7.3 38.8 26.6 43.4 2.8 0.7 5.6 1 8.4 1 16.3 0 31-11.1 35-27.6 3.5-14.6 72.1-300.4 104.8-439.6h153c20.2 0 37.1-16.5 36.7-36.7-0.4-19.6-16.3-35.3-36-35.3H390.8c12.2-54.2 38.7-165.1 49.4-192.2 11.6-29.4 23.7-59.9 77.2-82.5 29.2-12.3 59.9-10 81.2-5.6 16.4 3.4 33.1-5.1 40-20.5z"/>`},He=D`
  <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">
    ${Object.entries(ze).map(([e,t])=>D`
        <symbol id="${L(e)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${t}</symbol>
      `)}
    ${Object.entries(Ve).map(([e,t])=>D`
        <symbol id="${L(e)}" viewBox="0 0 1024 1024" fill="currentColor">${t}</symbol>
      `)}
    ${Object.entries(Be).map(([e,t])=>D`
        <symbol id="${L(e)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round">${t}</symbol>
      `)}
  </svg>
`;function R(e){return D`<svg aria-hidden="true"><use href="${`#`+L(e)}"/></svg>`}var Ue=[...Object.keys(ze),...Object.keys(Ve),...Object.keys(Be)];function We(e,t){return e.replace(`{names}`,t.join(`,`))}function Ge(e){let t=typeof e?.width==`number`?e.width:24,n=typeof e?.height==`number`?e.height:24,r=[];for(let[i,a]of Object.entries(e?.icons??{})){let e=a?.body;typeof e==`string`&&e!==``&&r.push({name:i,body:e,width:typeof a.width==`number`?a.width:t,height:typeof a.height==`number`?a.height:n})}let i=new Map(r.map(e=>[e.name,e]));for(let[t,n]of Object.entries(e?.aliases??{})){let e=i.get(n?.parent??``);e&&r.push({name:t,body:typeof n.body==`string`&&n.body!==``?n.body:e.body,width:typeof n.width==`number`?n.width:e.width,height:typeof n.height==`number`?n.height:e.height})}let a=new Set(r.map(e=>e.name));return{icons:r,notFound:Array.isArray(e?.not_found)?e.not_found.filter(e=>typeof e==`string`&&!a.has(e)):[]}}var Ke=class{constructor(e,t,n=()=>``,r=e=>fetch(e)){this.registered=new Set,this.negative=new Set,this.pending=new Set,this.inflight=new Set,this.timer=null,this.getUrlTemplate=e,this.onLoaded=t,this.getModify=n,this.fetchImpl=r}has(e){return this.registered.has(e)}markRegistered(e){for(let t of e)this.registered.add(t),this.negative.delete(t),this.pending.delete(t)}request(e){for(let t of e)this.registered.has(t)||this.negative.has(t)||this.pending.has(t)||this.inflight.has(t)||this.pending.add(t);this.pending.size>0&&this.timer===null&&(this.timer=setTimeout(()=>{this.timer=null,this.flush()},0))}async flush(){let e=this.getUrlTemplate(),t=[...this.pending];if(this.pending.clear(),!e||t.length===0)return;for(let e of t)this.inflight.add(e);let n=(this.getModify()||``).trim(),r=e=>n?`${e}-${n}`:e,i=e=>n&&e.endsWith(`-${n}`)?e.slice(0,e.length-n.length-1):e;try{let n=await this.fetchImpl(We(e,t.map(r)));if(!n.ok)throw Error(`HTTP ${n.status}`);let{icons:a,notFound:o}=Ge(await n.json()),s=[];for(let e of a){let t=i(e.name);this.registered.add(t),s.push({...e,name:t})}for(let e of o){let t=i(e);this.registered.has(t)||this.negative.add(t)}for(let e of t)this.registered.has(e)||this.negative.add(e);s.length>0&&this.onLoaded(s)}catch{for(let e of t)this.negative.add(e)}finally{for(let e of t)this.inflight.delete(e)}}},qe=class e{static{this.SVG_NS=`http://www.w3.org/2000/svg`}constructor(e){this._dynamicQueue=new Map,this._host=e,this._registry=new Ke(()=>this._host.iconUrl||null,e=>{for(let t of e)this._queueDynamicSymbol(t.name,this._buildSymbol(t));this._host.requestUpdate()},()=>this._host.iconModify),this._registry.markRegistered(Ue)}has(e){return this._registry.has(e)}request(e){this._registry.request(e)}hostUpdated(){this._flushDynamicSymbols()}onSlotChange(e){let t=e.currentTarget,n=[];for(let e of t.assignedNodes())e instanceof HTMLTemplateElement?n.push(...e.content.querySelectorAll(`symbol`)):e instanceof Element&&(e.tagName.toLowerCase()===`symbol`?n.push(e):n.push(...e.querySelectorAll(`symbol`)));let r=[];for(let e of n){let t=e.id||``;t.startsWith(`asv-`)&&(t=t.slice(4)),t&&(this._queueDynamicSymbol(t,this._rebuildSymbol(t,e)),r.push(t))}this._registry.markRegistered(r),this._host.requestUpdate()}_buildSymbol(t){let n=document.createElementNS(e.SVG_NS,`symbol`);if(n.setAttribute(`id`,`asv-${t.name}`),n.setAttribute(`viewBox`,`0 0 ${t.width} ${t.height}`),n.innerHTML=t.body,n.querySelector(`[stroke]`)){n.setAttribute(`fill`,`none`),n.setAttribute(`stroke`,`currentColor`),n.setAttribute(`stroke-width`,`1.5`),n.setAttribute(`stroke-linecap`,`round`),n.setAttribute(`stroke-linejoin`,`round`);for(let e of n.querySelectorAll(`[stroke-width]`))e.removeAttribute(`stroke-width`)}return n}static{this.SVG_CAMEL_ATTRS={viewbox:`viewBox`,preserveaspectratio:`preserveAspectRatio`}}_rebuildSymbol(t,n){let r=document.createElementNS(e.SVG_NS,`symbol`);for(let t of Array.from(n.attributes)){let n=e.SVG_CAMEL_ATTRS[t.name]??t.name;n!==`id`&&r.setAttribute(n,t.value)}return r.setAttribute(`id`,`asv-${t}`),r.innerHTML=n.innerHTML,r}_queueDynamicSymbol(e,t){this._dynamicQueue.set(e,t)}_flushDynamicSymbols(){if(this._dynamicQueue.size===0)return;let e=this._host.getDynamicSprite();if(e)for(let[t,n]of this._dynamicQueue)e.querySelector(`symbol[id="asv-${t}"]`)?.remove(),e.appendChild(n),this._dynamicQueue.delete(t)}},Je=class{constructor(e){this._open=new Set,this._docClose=null,this._host=e}hostDisconnected(){this._docClose&&=(document.removeEventListener(`click`,this._docClose),null),this._open.clear()}isOpen(e){return this._open.has(e)}setOpen(e,t){t!==this._open.has(e)&&(t?(this._open.add(e),this._docClose||(this._docClose=()=>{this._open.clear(),this._docClose=null,this._host.requestUpdate()},document.addEventListener(`click`,this._docClose))):(this._open.delete(e),this._open.size===0&&this._docClose&&(document.removeEventListener(`click`,this._docClose),this._docClose=null)),this._host.requestUpdate())}},Ye=class{constructor(e){this.text=null,this.fading=!1,this._timers=[],this._host=e}hostDisconnected(){this._clearTimers()}show(e){this._clearTimers(),this.text=e,this.fading=!1,this._timers=[setTimeout(()=>{this.fading=!0,this._host.requestUpdate()},1500),setTimeout(()=>{this.text=null,this.fading=!1,this._host.requestUpdate()},1600)],this._host.requestUpdate()}_clearTimers(){this._timers.forEach(clearTimeout),this._timers=[]}};function Xe(e){let t=``;for(let n=0;n<e.length;n++)e[n]===`\\`&&n+1<e.length?(t+=e[n+1],n++):t+=e[n];return t}function Ze(e,t=`.`){return e.replace(/\\/g,`\\\\`).replace(RegExp(`\\${t}`,`g`),`\\${t}`)}function z(e,t=`.`){let n=[],r=``;for(let i=0;i<e.length;i++){let a=e[i];a===`\\`&&i+1<e.length?(r+=a,r+=e[i+1],i++):a===t?(n.push(r),r=``):r+=a}return n.push(r),n.map(Xe)}function B(e){return(e||[`ROOT`]).map(e=>Array.isArray(e)?e.map(e=>Ze(e)).join(`.`):Ze(e)).join(`.`)}var Qe=class{constructor(e){this.store=null,this._storeWatcher=null,this._observerWatcher=null,this._bindRetryCount=0,this._bindRetryTimer=null,this._cmReadyTimer=null,this._cmReadyRetries=0,this._configWatcher=null,this._ownerWatchers=[],this._cmMissingWarned=!1,this._host=e}hostDisconnected(){this.unbind(),this._bindRetryTimer&&=(clearTimeout(this._bindRetryTimer),null),this._cmReadyTimer&&=(clearTimeout(this._cmReadyTimer),null),this._bindRetryCount=0,this._cmReadyRetries=0}hostUpdated(){(!this._host.disableSchema||this._host.mode!==`view`||this._host.onlyConfigurable)&&this.store&&!this.store.configManager&&this._cmReadyRetries<20&&(this._cmReadyRetries++,this._cmReadyTimer=setTimeout(()=>{this._cmReadyTimer=null,this._host.requestUpdate(),this.store?.configManager?(this._cmReadyRetries=0,this._host.rebuildTree(),this._host.valueAlign!==`right`&&this._host.scheduleLabelWidthMeasure()):this._cmReadyRetries>=20&&this._host.onlyConfigurable&&!this._cmMissingWarned&&(this._cmMissingWarned=!0,console.warn(`[autostore-viewer] only-configurable 依赖 store 的配置管理（configManager），当前 Store 未启用`))},100))}tryBind(){if(this.unbind(),this.store){this._host.rebuildTree(),this.watch();return}if(this._host.storeId){let e=globalThis.__AUTOSTORE_INSTANCES__;if(Array.isArray(e))for(let t of e){let e=t.deref?.();if(e&&e.options?.id===this._host.storeId){this.store=e,this._host.rebuildTree(),this.watch();return}}if(this._bindRetryCount<10){this._bindRetryCount++,this._bindRetryTimer&&clearTimeout(this._bindRetryTimer),this._bindRetryTimer=setTimeout(()=>{this._bindRetryTimer=null,this.tryBind()},500);return}console.warn(`autostore-viewer: Store with id "${this._host.storeId}" not found`)}}setStore(e){let t=this.store;this.store=e,e!==t&&(this.unbind(),e&&(this._host.rebuildTree(),this.watch()),this._host.requestUpdate())}watch(){if(this.store&&(this.unbind(),this._storeWatcher=this.store.watch(`*`,e=>{this._host.onStateOperate(e)}),this._observerWatcher=this.store.on?.(`observer/*/done`,e=>{this._host.onComputedDone(e?.observer??e)}),this._host.onlyConfigurable&&this.store.configManager&&(this._configWatcher=this.store.configManager.watch(`*`,e=>{Array.isArray(e?.path)&&e.path.length===1&&(this._host.rebuildTree(),this._host.scheduleLabelWidthMeasure())})),this._ownerWatchers=[],this._host.onlyConfigurable)){let e=this.store.configManager?.owners;if(e){let t=new Set;for(let n in e){let r=e[n];r&&r!==this.store&&!t.has(r)&&(t.add(r),this._ownerWatchers.push(r.watch(`*`,e=>this._host.onStateOperate(e))))}}}}unbind(){if(this._storeWatcher&&=(this._storeWatcher.off?.(),null),this._observerWatcher&&=(this._observerWatcher.off?.(),null),this._configWatcher&&=(this._configWatcher.off?.(),null),this._ownerWatchers.length){for(let e of this._ownerWatchers)e?.off?.();this._ownerWatchers=[]}}resolveStore(e){let t=this.store;if(!t||!this._host.onlyConfigurable||e.length===0)return t;let n=t.configManager?.owners;if(!n)return t;for(let t=e.length;t>=1;t--){let r=n[B(e.slice(0,t))];if(r)return r}return t}getParent(e){let t=this.resolveStore(e);if(!t)return;let n=t.state;for(let t=0;t<e.length-1;t++)n=n?.[e[t]];return n}getStateByPath(e){let t=this.resolveStore(e)?.state;for(let n of e)t=t?.[n];return t}getSchemaByPath(e){let t=this.store?.configManager;if(!t)return;let n=this.resolveStore(e)?.options?.configKey,r=(n?`${n}.`:``)+B(e);return t.state[r]}};function $e(e,...t){let n=e.valueOf(),r={},i=[...t];try{if(i.length===0)return n;if(i.length===1){let e=i[0];if(e==null)return n;Array.isArray(e)?i=e:typeof e==`object`&&(r=e,i=[])}return n=n.replace(/\{\s*([a-zA-Z\d]*)\s*\}/g,(e,t)=>{let n;return t&&r.hasOwnProperty(t)?n=r[t]:!t&&i.length>0&&(n=i.shift()),n==null?``:(typeof n==`function`&&(n=n()),String(n))}),n}catch{return n}}var et=e((()=>{String.prototype.params=function(){return $e(this,...arguments)}})),tt=e((()=>{})),nt=e((()=>{})),rt=e((()=>{})),it=e((()=>{})),at=e((()=>{})),ot=e((()=>{})),st=e((()=>{})),ct=e((()=>{})),lt=e((()=>{})),ut=e((()=>{})),dt=e((()=>{})),ft=e((()=>{})),pt=e((()=>{})),mt=e((()=>{})),ht=e((()=>{})),gt=e((()=>{})),_t=e((()=>{})),vt=e((()=>{})),yt=e((()=>{})),bt=e((()=>{})),xt=e((()=>{})),St=e((()=>{})),Ct=e((()=>{})),wt=e((()=>{})),Tt=e((()=>{})),Et=e((()=>{})),Dt=e((()=>{})),Ot=e((()=>{})),kt=e((()=>{})),At=e((()=>{})),jt=e((()=>{})),Mt=e((()=>{})),Nt=e((()=>{})),Pt=e((()=>{})),Ft=e((()=>{})),It=e((()=>{})),Lt=e((()=>{})),Rt=e((()=>{})),zt=e((()=>{})),Bt=e((()=>{})),Vt=e((()=>{})),Ht=e((()=>{})),Ut=e((()=>{})),Wt=e((()=>{fn()})),Gt=e((()=>{}));function Kt(e,t){return!!e.computedObjects.find(t)}var qt=e((()=>{})),V=e((()=>{nt(),rt(),it(),at(),ot(),st(),ct(),lt(),ut(),dt(),ft(),pt(),gt(),mt(),_t(),vt(),yt(),ht(),bt(),xt(),St(),Ct(),wt(),Tt(),Et(),Dt(),Ot(),kt(),jt(),Mt(),Nt(),At(),Pt(),Ft(),It(),Lt(),Rt(),zt(),Bt(),Vt(),Ht(),Ut(),Wt(),Gt(),et(),qt()})),Jt=e((()=>{V()})),Yt=e((()=>{})),Xt=e((()=>{V()})),Zt=e((()=>{})),Qt=e((()=>{})),$t=e((()=>{})),en=e((()=>{})),tn=e((()=>{V()})),nn=e((()=>{})),rn=e((()=>{V()})),an=e((()=>{tn(),rn()})),on=e((()=>{})),sn=e((()=>{V()})),cn=e((()=>{})),ln=e((()=>{cn()})),un=e((()=>{sn(),ln()})),dn=e((()=>{fn(),V()})),fn=e((()=>{Jt(),V(),Xt(),an(),un(),rn()}));fn(),on(),en(),Jt(),nn(),tn(),Zt(),$t(),dn(),sn(),Xt(),et(),V(),Yt(),tt(),Qt(),ln();function pn(e){return e.startsWith(`__AS_`)}function H(e){return e==null?0:Array.isArray(e)?e.length:typeof e==`object`?Object.keys(e).filter(e=>!pn(e)).length:0}var mn=class{constructor(e){this._entryPaths=[],this._configMode=!1,this._groupCollapsed=new Map,this._host=e}get entryPaths(){return this._entryPaths}isGroupCollapsed(e){return this._groupCollapsed.get(e.name)??e.advanced===!0}toggleGroup(e){this._groupCollapsed.set(e.name,!this.isGroupCollapsed(e)),this._host.requestUpdate()}buildTree(){if(!this._host.getStore()){this._host.setTreeNodes([]),this._host.setConfigSections(null);return}if(this._host.onlyConfigurable){this._buildConfigTree();return}this._configMode=!1,this._host.setConfigSections(null);let e=this._host.entrys?this._host.entrys.split(`,`).map(e=>e.trim()).filter(Boolean).map(e=>z(e)):[];if(this._entryPaths=e.filter((t,n)=>!e.some((e,r)=>r!==n&&e.length<=t.length&&e.every((e,n)=>e===t[n]))),this._entryPaths.length>0){let e=[],t=[];for(let n of this._entryPaths){let r=this._host.getStateByPath(n);if(r===void 0){e.push(B(n));continue}let i=this.detectType(r,n);this.isExpandableType(i)?t.push(...this._buildNodes(r,n,0)):t.push({key:n[n.length-1],value:r,type:i,expanded:!1,childCount:0,path:n,children:[]})}if(e.length>0){this._host.setTreeNodes([]),this._host.setEntryInvalid(!0,e),console.warn(`[autostore-viewer] entrys 路径不存在: ${e.join(`, `)}`);return}this._host.setEntryInvalid(!1,[]),this._host.setTreeNodes(t);return}this._host.setEntryInvalid(!1,[]),this._host.setTreeNodes(this._buildNodes(this._host.getStore().state,[],0))}_buildConfigTree(){this._configMode=!0;let e=this._host.getStore(),t=e.configManager,n=t?.owners,r=n?Object.keys(n):[],i=(r.length>0?r:[...e.configurabled??[]]).map(e=>z(e)).filter(e=>e.length>0),a=i;if(this._host.entrys){let e=this._host.entrys.split(`,`).map(e=>e.trim()).filter(Boolean).map(e=>z(e));for(let t of e)this._host.getStateByPath(t)===void 0&&console.warn(`[autostore-viewer] entrys 路径不存在: ${B(t)}`);a=i.filter(t=>e.some(e=>e.length<=t.length&&e.every((e,n)=>e===t[n])))}let o=a.filter(e=>!a.some(t=>t.length<e.length&&t.every((t,n)=>t===e[n]))),s=[];for(let e of o){let t=this._buildConfigNode(e);t&&s.push(t)}this._entryPaths=o,this._host.setEntryInvalid(!1,[]);let c=t?.groups??{},l=Object.keys(c);if(l.length===0){this._host.setConfigSections(null),this._host.setTreeNodes(s);return}let u=new Map,d=[],f=[];for(let e of s){let t=this._host.getSchemaByPath(e.path);if(t?.advanced===!0){f.push(e);continue}let n=t?.group,r=typeof n==`string`?n:n?.name;if(r&&c[r]){let t=u.get(r);t||u.set(r,t=[]),t.push(e)}else d.push(e)}let p=l.map(e=>{let t=c[e]??{};return{name:e,title:typeof t.title==`string`&&t.title?t.title:e,icon:typeof t.icon==`string`&&t.icon?t.icon:void 0,order:typeof t.order==`number`?t.order:void 0,nodes:u.get(e)??[]}});p.sort((e,t)=>(e.order??1/0)-(t.order??1/0));let m=[...d.length>0?[{name:``,title:``,nodes:d}]:[],...p,...f.length>0?[{name:`__advanced__`,title:`高级选项`,nodes:f,advanced:!0}]:[]];this._host.setConfigSections(m),this._host.setTreeNodes(s)}_buildConfigNode(e){let t=this._host.getStateByPath(e);if(t===void 0)return null;let n=this.detectType(t,e);if(!this._host.showComputed&&n===`computed`)return null;let r=this.isExpandableType(n);return{key:e[e.length-1],value:t,type:n,expanded:0<this._host.expandDepth,childCount:r?H(t):0,path:e,children:r?this._buildNodes(t,e,1):[]}}syncTreeValues(e){for(let t of e){let e=this._host.getStateByPath(t.path);e!==void 0&&(t.value=e),t.children.length>0&&this.syncTreeValues(t.children)}}_buildNodes(e,t,n){if(e==null)return[];let r=[];if(Array.isArray(e)){for(let i=0;i<e.length;i++){let a=e[i],o=[...t,String(i)],s=this.detectType(a,o);if(!this._host.showComputed&&s===`computed`)continue;let c=this.isExpandableType(s),l=n<this._host.expandDepth,u={key:i,value:a,type:s,expanded:l,childCount:c?H(a):0,path:o,children:c?this._buildNodes(a,o,n+1):[]};r.push(u)}return r}if(typeof e==`object`){let i=Object.keys(e).filter(e=>!pn(e));for(let a of i){let i=e[a],o=[...t,a],s=this.detectType(i,o);if(!this._host.showComputed&&s===`computed`)continue;let c=this.isExpandableType(s),l={key:a,value:i,type:s,expanded:n<this._host.expandDepth,childCount:c?H(i):0,path:o,children:c?this._buildNodes(i,o,n+1):[]};r.push(l)}}return r}isExpandableType(e){return e===`object`||e===`array`||e===`markRaw`}isEditableNode(e){return this.isExpandableType(e.type)?!0:e.type===`string`||e.type===`number`||e.type===`boolean`||e.type===`other`}getNodeByPath(e){let t=e;if(!this._configMode&&this._entryPaths.length>0){for(let n of this._entryPaths)if(e.length>=n.length&&n.every((t,n)=>t===e[n])){t=e.slice(n.length);break}}let n=this._host.getTreeNodes(),r=null;for(let e of t){if(r=n.find(t=>String(t.key)===e)??null,!r)return null;n=r.children}return r}findNextEditableSibling(e){let t=this._host.getTreeNodes();if(e.path.length>0){let n=this.getNodeByPath(e.path.slice(0,-1));if(!n)return null;t=n.children}let n=t.indexOf(e);for(let e=n+1;e<t.length;e++)if(this.isEditableNode(t[e]))return t[e];return null}detectType(e,t){let n=this._host.getStore();return t&&n&&Kt(n,t)?`computed`:e==null?`other`:Array.isArray(e)?`array`:typeof e==`function`?e.__OBSERVER_TYPE__?`computed`:`function`:typeof e==`object`?e.__AS_SKIP_PROXY__?`markRaw`:`object`:typeof e==`string`?`string`:typeof e==`number`?`number`:typeof e==`boolean`?`boolean`:`other`}updateTreeNode(e,t){let n=r=>{for(let i of r){if(i.path.length===e.length&&i.path.every((t,n)=>t===e[n])){let n=this.detectType(t,e),r=this.isExpandableType(n);return i.value=t,i.type=n,i.childCount=r?H(t):0,r&&(i.children=this._buildNodes(t,e,0)),!0}if(i.children.length>0&&n(i.children))return!0}return!1};n(this._host.getTreeNodes())}removeTreeNode(e){let t=t=>t.length===e.length&&t.every((t,n)=>t===e[n]),n=r=>{for(let i=0;i<r.length;i++){let a=r[i];if(t(a.path))return r.splice(i,1),!0;if(a.path.length<e.length&&a.path.every((t,n)=>t===e[n])&&n(a.children))return a.childCount=Math.max(0,a.childCount-1),!0}return!1};n(this._host.getTreeNodes())}toggleExpand(e){this._host.shouldSuppressClick()||(e.expanded=!e.expanded,this._host.requestUpdate())}findLastVisible(e){let t=e[e.length-1];return this.isExpandableType(t.type)&&t.expanded&&t.children.length>0?this.findLastVisible(t.children):t}isEntryAncestorOrSelf(e){return this._entryPaths.some(t=>e.length<=t.length&&e.every((e,n)=>e===t[n]))}isPathWithinEntry(e){return this._entryPaths.some(t=>e.length>t.length&&t.every((t,n)=>t===e[n]))}},hn=class{constructor(e){this._labelWidth=`auto`,this._measureHandle=null,this._measureRetryTimer=null,this._measureRetryCount=0,this._resizeObserver=null,this._latched=!1,this._host=e}get latched(){return this._latched}latch(){this._latched=!0,this._labelWidth=``}unlatch(){this._latched=!1,this.scheduleMeasure()}hostConnected(){this._resizeObserver=new ResizeObserver(e=>{let t=this._host.getHostElement();for(let n of e)n.contentRect.height>0&&t.style.setProperty(`--viewer-height`,`${n.contentRect.height}px`);e.some(e=>e.contentRect.width>0||e.contentRect.height>0)&&(this.measure(),this.scheduleMeasure())}),this._resizeObserver.observe(this._host.getHostElement())}hostDisconnected(){this._measureHandle!==null&&(cancelAnimationFrame(this._measureHandle),this._measureHandle=null),this._measureRetryTimer&&=(clearTimeout(this._measureRetryTimer),null),this._measureRetryCount=0,this._resizeObserver?.disconnect(),this._resizeObserver=null}_isRightAlign(){return this._host.valueAlign===`right`}scheduleMeasure(){this._latched||this._measureHandle===null&&(this._measureHandle=requestAnimationFrame(()=>{this._measureHandle=null,this.measure()}))}measure(){if(this._latched||this._isRightAlign()||!this._host.getStore())return;let e=this._host.getMeasureProbe();if(!e)return;let t=[],n=(e,r)=>{for(let i of e){let e=this._host.isExpandableType(i.type),a=this._host.disableSchema?void 0:this._host.getSchema(i);t.push({key:a?.label??String(i.key),required:a?.required===!0,hint:this._host.showHint&&e?i.type===`array`?`[...]`:`{...}`:``,count:this._host.showCount&&i.childCount>0?String(i.childCount):``,depth:r}),i.children.length>0&&n(i.children,r+1)}};n(this._host.getTreeNodes(),this._host.getLabelDepthBase());let r={key:`node-key`,required:`required-mark`,hint:`collapsed-hint`,count:`child-count`},i=new Map,a=document.createDocumentFragment(),o=(e,t)=>{let n=`${e}:${t}`,o=i.get(n);return o||(o=document.createElement(`span`),o.className=r[e],o.textContent=t,a.appendChild(o),i.set(n,o)),o};for(let e of t)e.key&&o(`key`,e.key),e.required&&o(`required`,`*`),e.hint&&o(`hint`,e.hint),e.count&&o(`count`,e.count);if(t.length===0){this._labelWidth!==`auto`&&(this._labelWidth=`auto`,this._host.setKeyWidth(`auto`));return}e.appendChild(a);let s=!1,c=e=>{e.offsetWidth>0&&(s=!0);let t=getComputedStyle(e);return e.offsetWidth+parseFloat(t.marginLeft)+parseFloat(t.marginRight)},l=new Map,u=(e,t)=>{let n=`${e}:${t}`,r=l.get(n);return r===void 0&&(r=c(i.get(n)),l.set(n,r)),r},d=(parseFloat(getComputedStyle(this._host.getHostElement()).getPropertyValue(`--viewer-indent-size`))||20)-8,f=0;for(let e of t){let t=e.depth*d;e.key&&(t+=u(`key`,e.key)),e.required&&(t+=u(`required`,`*`)),e.hint&&(t+=u(`hint`,e.hint)),e.count&&(t+=u(`count`,e.count)),t>f&&(f=t)}if(e.textContent=``,!s){this._measureRetryTimer===null&&this._measureRetryCount<150&&(this._measureRetryCount++,this._measureRetryTimer=setTimeout(()=>{this._measureRetryTimer=null,this.measure()},200));return}this._measureRetryTimer&&=(clearTimeout(this._measureRetryTimer),null),this._measureRetryCount=0;let p=`${Math.min(f+16,this._host.maxKeyWidth)}px`;p!==this._labelWidth&&(this._labelWidth=p,this._host.setKeyWidth(p))}},gn=class{constructor(e){this._root=null,this._dragging=!1,this._moved=!1,this._pointerId=-1,this._startX=0,this._startWidth=0,this._sessionWidth=0,this._pendingX=null,this._moveFrame=null,this._handle=null,this._onPointerDown=e=>{if(this._dragging||this._host.valueAlign===`right`||e.button!==0)return;let t=this._handleOf(e);t&&(e.preventDefault(),this._dragging=!0,this._moved=!1,this._pointerId=e.pointerId,this._startX=e.clientX,this._startWidth=this._currentWidth(),this._sessionWidth=this._startWidth,this._handle=t,this._host.getHostElement().style.setProperty(`user-select`,`none`),t.setPointerCapture?.(e.pointerId),t.addEventListener(`pointermove`,this._onPointerMove),t.addEventListener(`pointerup`,this._onPointerUp),t.addEventListener(`pointercancel`,this._onPointerUp),t.addEventListener(`lostpointercapture`,this._onPointerUp))},this._onPointerMove=e=>{this._dragging&&e.pointerId===this._pointerId&&(this._pendingX=e.clientX,this._moveFrame===null&&(this._moveFrame=requestAnimationFrame(()=>{if(this._moveFrame=null,!this._dragging||this._pendingX===null)return;let e=this._pendingX;this._pendingX=null,this._applyX(e)})))},this._onPointerUp=e=>{this._dragging&&e.pointerId===this._pointerId&&this._finishDrag(!0)},this._onDblClick=e=>{this._handleOf(e)&&(e.preventDefault(),e.stopPropagation(),this._host.isKeyWidthLatched()&&(this._host.unlatchKeyWidth(),this._host.notifyKeyWidthChange(null,!1)))},this._host=e}attach(e){this._root=e,e.addEventListener(`pointerdown`,this._onPointerDown),e.addEventListener(`dblclick`,this._onDblClick)}_handleOf(e){let t=e.target;return t&&typeof t.closest==`function`?t.closest(`.key-resizer`):null}_currentWidth(){let e=this._host.getHostElement(),t=getComputedStyle(e).getPropertyValue(`--viewer-key-width`).trim(),n=parseFloat(t);if(t.endsWith(`px`)&&Number.isFinite(n)&&n>0)return n;let r=this._root?.querySelector?.(`.tree-node`),i=r?.querySelector(`.node-label`);if(!i)return 0;let a=parseFloat(r.style?.getPropertyValue(`--row-depth`)||``)||0,o=(parseFloat(getComputedStyle(e).getPropertyValue(`--viewer-indent-size`))||20)-8;return i.getBoundingClientRect().width+a*o}_applyX(e){let t=Math.max(40,Math.round(this._startWidth+(e-this._startX)));t!==this._sessionWidth&&(this._sessionWidth=t,this._host.setKeyWidth(`${t}px`),this._moved||(this._moved=!0,this._host.latchKeyWidth()))}_finishDrag(e){this._moveFrame!==null&&(cancelAnimationFrame(this._moveFrame),this._moveFrame=null),this._dragging&&this._pendingX!==null&&this._applyX(this._pendingX),this._pendingX=null;let t=this._handle;t&&(t.removeEventListener(`pointermove`,this._onPointerMove),t.removeEventListener(`pointerup`,this._onPointerUp),t.removeEventListener(`pointercancel`,this._onPointerUp),t.removeEventListener(`lostpointercapture`,this._onPointerUp)),this._handle=null,this._dragging=!1,this._pointerId=-1,this._host.getHostElement().style.removeProperty(`user-select`),e&&this._moved&&this._host.notifyKeyWidthChange(this._sessionWidth,!0),this._moved=!1}hostConnected(){this._root&&this.attach(this._root)}hostDisconnected(){this._dragging&&this._finishDrag(!1),this._root&&(this._root.removeEventListener(`pointerdown`,this._onPointerDown),this._root.removeEventListener(`dblclick`,this._onDblClick))}},_n=new Set([`text`,`number`,`email`,`password`,`search`,`tel`,`url`,`date`,`datetime-local`,`month`,`time`,`week`,`color`,`range`,`file`]),vn={input:[`disabled`,`readOnly`,`placeholder`,`autocomplete`,`tabIndex`,`minLength`,`maxLength`,`pattern`,`min`,`max`,`step`,`accept`,`capture`,`multiple`,`spellcheck`],textarea:[`disabled`,`readOnly`,`placeholder`,`tabIndex`,`minLength`,`maxLength`,`rows`,`cols`,`wrap`],select:[`disabled`,`tabIndex`,`size`],radio:[`disabled`,`tabIndex`],checkbox:[`disabled`,`tabIndex`]},yn=(e,t)=>{let n={};if(!e)return n;for(let r of vn[t]){let t=e[r];t!=null&&(n[r]=t)}return n};function U(e,t,n){return Array.isArray(e)?e.map(e=>{if(typeof e==`object`&&e){let r=e[t??`value`],i=e[n??`label`];return{value:r,label:String(i??r)}}return{value:e,label:String(e)}}):[]}var W=e=>{let t=Array.isArray(e?.choices)?e.choices:Array.isArray(e?.switchValues)?e.switchValues:null;if(!t||t.length!==2)return null;let n=U(t);return[n[0],n[1]]};function bn(e,t){if(!t)return``;if(typeof t.checkLabel==`string`&&t.checkLabel!==``)return t.checkLabel;if(Array.isArray(t.choices)&&t.choices.length===2){let n=W(t),r=t.choices[e===n[0].value?0:1];return typeof r==`object`&&r?String(r.label??``):``}let n=Array.isArray(t.switchValues)?t.switchValues:[!0,!1],r=e===n[0]?n[0]:n[1];return typeof r==`boolean`?``:String(r)}var G=(e,t,n,r)=>({kind:e,jsonMode:!1,multiple:!1,pair:null,choices:[],groupId:t,props:yn(n,e),...r});function K(e,t,n){let r=t?.widget;if((e.type===`object`||e.type===`array`)&&!r)return G(`textarea`,n,t,{jsonMode:!0});switch(r){case void 0:return e.type===`boolean`?G(`checkbox`,n,t):G(`input`,n,t,{inputType:e.type===`number`?`number`:`text`});case`textarea`:return G(`textarea`,n,t);case`select`:return G(`select`,n,t,{choices:U(t?.choices,t?.valueKey,t?.labelKey),multiple:t?.multiple===!0});case`radio`:return G(`radio`,n,t,{choices:U(t?.choices,t?.valueKey,t?.labelKey)});case`combobox`:return G(`input`,n,t,{inputType:`text`,choices:U(t?.choices,t?.valueKey,t?.labelKey)});case`checkbox`:return G(`checkbox`,n,t,{pair:W(t)});default:return r&&_n.has(r)?G(`input`,n,t,{inputType:r}):G(`input`,n,t,{inputType:`text`})}}function q(e,t,n,r){let i=typeof e==`string`?e:e instanceof String?e.valueOf():void 0;if(i!==void 0&&i!==``)return i.replaceAll(`{label}`,t?.label??``).replaceAll(`{value}`,String(n??``)).replaceAll(`{path}`,r.join(`.`))}function xn(e,t,n,r){if(n?.jsonMode)return typeof r?.toState==`function`?r.toState(e):JSON.parse(e);let i=n?.kind;return t===`number`&&(i===`input`||i===`textarea`)?Number(e):e}function Sn(e,t){for(let n=e.length-1;n>0;n--){let r=t(e.slice(0,n));if(typeof r?.itemValidate==`function`)return{validate:r.itemValidate,errorMessage:r.errorMessage,label:r.label}}return null}function Cn(e){let{schema:t,plan:n,valueType:r,oldValue:i,path:a}=e,o=e.raw;if(t?.required===!0&&(o===``||o==null))return q(t.errorMessage,t,o,a)??`此项必填`;let s=o;if(n?.jsonMode){if(typeof t?.toState==`function`)try{s=t.toState(o)}catch(e){return e?.message?String(e.message):`转换失败`}else{try{s=JSON.parse(o)}catch{return`无效的 JSON`}if(!(r===`array`?Array.isArray(s):typeof s==`object`&&s&&!Array.isArray(s)))return`值类型不匹配`}}else{let e=n?.kind;r===`number`&&(e===`input`||e===`textarea`)&&(s=Number(o))}let c=t?.validate;if(typeof c==`function`)try{if(c(s,i,a)===!1)return q(t?.errorMessage,t,o,a)??`值无效`}catch(e){return e?.message?String(e.message):q(t?.errorMessage,t,o,a)??`值无效`}let l=e.itemRule;if(l){let e=a.length>0?a[a.length-1]:``;try{if(l.validate(s,e)===!1)return q(l.errorMessage,{label:l.label},o,a)??`值无效`}catch(e){return e?.message?String(e.message):q(l.errorMessage,{label:l.label},o,a)??`值无效`}}return null}function wn(e,t){return typeof e?.name==`string`&&e.name!==``?e.name:B(t)}function Tn(e,t){return t==null||t===``?{prefix:``,suffix:``}:{prefix:typeof e?.prefix==`string`&&e.prefix!==``?e.prefix:``,suffix:typeof e?.suffix==`string`&&e.suffix!==``?e.suffix:``}}function En(e,t){return!e.prefix&&!e.suffix?t:E`<span class="asv-affix-row"
    >${e.prefix?E`<span class="asv-affix">${e.prefix}</span>`:k}${t}${e.suffix?E`<span class="asv-affix">${e.suffix}</span>`:k}</span
  >`}function Dn(e){let{plan:t,setValue:n,onKeydown:r,name:i}=e,a=t.props,o=a.step??(t.inputType===`number`?`any`:k);return E`<input
    class="edit-input"
    type=${t.inputType}
    name=${i??k}
    .value=${String(e.value??``)}
    ?disabled=${a.disabled}
    ?readonly=${a.readOnly}
    ?multiple=${a.multiple}
    tabindex=${a.tabIndex??k}
    placeholder=${a.placeholder??k}
    autocomplete=${a.autocomplete??k}
    pattern=${a.pattern??k}
    minlength=${a.minLength??k}
    maxlength=${a.maxLength??k}
    min=${a.min??k}
    max=${a.max??k}
    step=${o}
    accept=${a.accept??k}
    capture=${a.capture??k}
    spellcheck=${a.spellcheck===!0?`true`:a.spellcheck===!1?`false`:k}
    list=${t.choices.length>0?t.groupId:k}
    @input=${e=>n(e.target.value)}
    @keydown=${r}
    @click=${e=>e.stopPropagation()}
  />${t.choices.length>0?On(t):k}`}function On(e){return E`<datalist id=${e.groupId}>
    ${e.choices.map(e=>E`<option value=${e.label}></option>`)}
  </datalist>`}var J={toRender:Dn},{I:kn}=Ae,An=e=>e.strings===void 0,jn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Mn=e=>(...t)=>({_$litDirective$:e,values:t}),Nn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Y=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Y(e,t);return!0},X=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Pn=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Ln(t)}};function Fn(e){this._$AN===void 0?this._$AM=e:(X(this),this._$AM=e,Pn(this))}function In(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Y(r[e],!1),X(r[e]);else r!=null&&(Y(r,!1),X(r))}else Y(this,e)}}var Ln=e=>{e.type==jn.CHILD&&(e._$AP??=In,e._$AQ??=Fn)},Rn=class extends Nn{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Pn(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Y(this,e),X(this))}setValue(e){if(An(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},zn=()=>new Bn,Bn=class{},Vn=new WeakMap,Hn=Mn(class extends Rn{render(e){return k}update(e,[t]){let n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),k}rt(e){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Vn.get(t);n===void 0&&(n=new WeakMap,Vn.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G==`function`?Vn.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function Un(e){return typeof e==`string`&&/^\s*(#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|color\()/.test(e)}function Wn(e){return Un(e.value)?E`<span class="to-view-color" style=${`--swatch-color:${e.value}`} title=${String(e.value)}></span>`:null}function Gn(e){let{plan:t,setValue:n,onKeydown:r,name:i}=e,a=zn();return E`<label class="edit-color">
    <input
      class="edit-input"
      type="color"
      name=${i??k}
      .value=${typeof e.value==`string`&&e.value.startsWith(`#`)?e.value:`#000000`}
      ?disabled=${t.props.disabled}
      tabindex=${t.props.tabIndex??void 0}
      @input=${e=>{let t=e.target.value;a.value&&(a.value.textContent=t),n(t)}}
      @keydown=${r}
      @click=${e=>e.stopPropagation()}
    />
    <span class="color-hex" ${Hn(a)}>${String(e.value??``)}</span>
  </label>`}var Kn={toView:Wn,toRender:Gn};function qn(e,t,n){let r=Number(e),i=Number.isFinite(Number(t))?Number(t):0,a=Number.isFinite(Number(n))?Number(n):100;return!Number.isFinite(r)||a<=i?0:Math.min(1,Math.max(0,(r-i)/(a-i)))}function Jn(e){if(typeof e.value!=`number`||!Number.isFinite(e.value))return null;let t=qn(e.value,e.plan.props.min,e.plan.props.max);return E`<span class="to-view-range" title=${String(e.value)}>
    <span class="range-track"><span class="range-fill" style=${`width:${(t*100).toFixed(1)}%`}></span></span>
    <span class="range-value">${e.value}</span>
  </span>`}function Yn(e){let{plan:t,setValue:n,onKeydown:r,name:i}=e,a=zn();return E`<label class="edit-range">
    <input
      class="edit-input"
      type="range"
      name=${i??k}
      .value=${String(e.value??``)}
      min=${t.props.min??k}
      max=${t.props.max??k}
      step=${t.props.step??k}
      ?disabled=${t.props.disabled}
      tabindex=${t.props.tabIndex??void 0}
      @input=${e=>{let t=e.target.value;a.value&&(a.value.textContent=t),n(Number(t))}}
      @keydown=${r}
      @click=${e=>e.stopPropagation()}
    />
    <span class="range-value" ${Hn(a)}>${String(e.value??``)}</span>
  </label>`}var Xn={toView:Jn,toRender:Yn};function Zn(e,t){let n=W(t);return n?e===n[0].value:!!e}function Qn(e){let t=bn(e.value,e.schema);return E`<span class="to-view-checkbox">
    <input type="checkbox" tabindex="-1" ?checked=${Zn(e.value,e.schema)} />
    ${t?E`<span class="check-label">${t}</span>`:k}
  </span>`}function $n(e){let{plan:t,setValue:n,onKeydown:r,name:i}=e,a=!t.pair||t.pair[0].value,o=bn(e.value,e.schema);return E`<label class="edit-checkbox">
    <input
      class="edit-input"
      type="checkbox"
      name=${i??k}
      ?disabled=${t.props.disabled}
      tabindex=${t.props.tabIndex??k}
      ?checked=${e.value===a}
      @change=${e=>{let r=e.target.checked;n(t.pair?r?t.pair[0].value:t.pair[1].value:r)}}
      @keydown=${r}
      @click=${e=>e.stopPropagation()}
    />${o?E`<span class="check-label">${o}</span>`:k}
  </label>`}var er={toView:Qn,toRender:$n};function tr(e){try{return JSON.stringify(e,null,2)}catch{return``}}function nr(e){let t=e.schema?.toInput;if(typeof t==`function`)try{return String(t(e.value))}catch{}return tr(e.value)}function rr(e){let{plan:t,setValue:n,onKeydown:r,name:i}=e,a=t.props;return E`<textarea
    class="edit-input edit-textarea"
    name=${i??k}
    .value=${t.jsonMode?nr(e):String(e.value??``)}
    ?disabled=${a.disabled}
    ?readonly=${a.readOnly}
    tabindex=${a.tabIndex??k}
    placeholder=${a.placeholder??k}
    minlength=${a.minLength??k}
    maxlength=${a.maxLength??k}
    rows=${a.rows??k}
    cols=${a.cols??k}
    wrap=${a.wrap??k}
    @input=${e=>n(e.target.value)}
    @keydown=${r}
    @click=${e=>e.stopPropagation()}
  ></textarea>`}var ir={toRender:rr};function ar(e){let{plan:t,setValue:n,onKeydown:r,value:i,name:a}=e,o=t.props,s=e=>t.multiple?Array.isArray(i)&&i.some(t=>t===e):i===e;return E`<select
    class="edit-input"
    name=${a??k}
    ?multiple=${t.multiple}
    ?disabled=${o.disabled}
    tabindex=${o.tabIndex??k}
    size=${o.size??k}
    @change=${e=>{let r=e.target;if(t.multiple)n(Array.from(r.selectedOptions,e=>t.choices[Number(e.value)].value));else{let e=t.choices[r.selectedIndex];e&&n(e.value)}}}
    @keydown=${r}
    @click=${e=>e.stopPropagation()}
  >
    ${t.choices.map((e,t)=>E`<option value=${String(t)} ?selected=${s(e.value)}>${e.label}</option>`)}
  </select>`}var or={toRender:ar};function sr(e){let{plan:t,setValue:n,onKeydown:r,value:i}=e;return E`<span class="edit-radio-group">
    ${t.choices.map((e,a)=>E`<label class="edit-radio-item">
        <input
          type="radio"
          class="edit-radio"
          name=${t.groupId}
          value=${String(a)}
          ?disabled=${t.props.disabled}
          ?checked=${i===e.value}
          @change=${e=>{let r=t.choices[Number(e.target.value)];r&&n(r.value)}}
          @keydown=${r}
          @click=${e=>e.stopPropagation()}
        />${e.label}
      </label>`)}
  </span>`}var cr={toRender:sr},lr={text:J,number:J,email:J,password:J,search:J,tel:J,url:J,date:J,"datetime-local":J,month:J,time:J,week:J,color:Kn,range:Xn,file:J,combobox:J,hidden:J,image:J,checkbox:er,textarea:ir,select:or,radio:cr};function ur(e){return e?lr[e]??null:null}var dr={input:J,textarea:ir,select:or,radio:cr,checkbox:er};function fr(e){return dr[e]??J}var pr=class{constructor(e){this.editingPath=null,this.editValue=null,this.editType=null,this.editOldValue=null,this.editSchema=void 0,this.editItemRule=null,this.editPlan=null,this.editError=null,this._editSeq=0,this._focusedPath=null,this._host=e}hostUpdated(){if(this.editingPath){let e=B(this.editingPath);if(this._focusedPath!==e){this._focusedPath=e;let t=this._host.getEditInput();t?.focus(),t&&(t.type===`text`||t.type===`number`)&&t.select()}}else this._focusedPath=null}isEditing(e){let t=this.editingPath;return!!t&&t.length===e.path.length&&t.every((t,n)=>t===e.path[n])}start(e){this.editingPath&&this._host.syncNode(this.editingPath),this.editValue=e.value,this.editType=e.type,this.editingPath=[...e.path],this.editOldValue=e.value,this.editSchema=this._host.getSchemaByPath(e.path),this.editItemRule=typeof this.editSchema?.validate==`function`?null:Sn(e.path,e=>this._host.getSchemaByPath(e)),this.editError=null,this._editSeq++;let t=`asv-edit-${this._editSeq}-${Math.random().toString(36).slice(2,7)}`;this.editPlan=K(e,this.editSchema,t),this._host.requestUpdate()}exit(){let e=this.editingPath;e&&(this.editingPath=null,this.editValue=null,this.editType=null,this.editOldValue=null,this.editSchema=void 0,this.editItemRule=null,this.editPlan=null,this.editError=null,this._host.syncNode(e),this._host.requestUpdate())}onBlur(e){this.isEditing(e)&&this.exit()}setValue(e){this.editValue=e;let t=this._computeError(e);t!==this.editError&&(this.editError=t,this._host.requestUpdate()),t===null&&this._write(e)}onEditorKeydown(e){if(!(e.isComposing||e.keyCode===229)&&e.key===`Enter`){if(this.editPlan?.kind===`textarea`||this.editError!==null)return;let e=this.editingPath,t=e?this._host.findNodeByPath(e):null,n=t?this._host.findNextEditable(t):null;n&&this.start(n)}}renderEditor(e){let t=this._buildRenderContext(e),n=(ur(this.editSchema?.widget)??fr(this.editPlan.kind)).toRender(t);return E`
      <div class="edit-editor" @focusout=${t=>this._onFocusOut(t,e)}>
        ${En(Tn(this._host.getDisplaySchemaByPath(e.path),this.editOldValue),n)}
        ${this.editError?E`<div class="edit-error">${this.editError}</div>`:k}
      </div>
    `}_buildRenderContext(e){let t=this;return{value:this.editOldValue,schema:this.editSchema??{},plan:this.editPlan,node:e,name:wn(this.editSchema,e.path),setValue:e=>this.setValue(e),onKeydown:e=>this.onEditorKeydown(e),editor:{get value(){return t.editValue},get error(){return t.editError},get plan(){return t.editPlan},setValue:e=>t.setValue(e),exit:()=>t.exit(),keydown:e=>t.onEditorKeydown(e)}}}_onFocusOut(e,t){e.currentTarget instanceof HTMLElement&&e.currentTarget.contains(e.relatedTarget)||this.onBlur(t)}_computeError(e){return Cn({raw:e,schema:this.editSchema,plan:this.editPlan,valueType:this.editType,oldValue:this.editOldValue,path:this.editingPath??[],itemRule:this.editItemRule})}_convert(e){return xn(e,this.editType,this.editPlan,this.editSchema)}_write(e){let t=this._host.getStore(),n=this.editingPath;if(!t||!n)return;let r=this._host.getParent(n),i=n[n.length-1];r&&(r[i]=this._convert(e))}},mr=class{constructor(e){this._inlineErrors=new Map,this._selfWrites=new Map,this._root=null,this._onInput=e=>{if(this._host.mode!==`edit`)return;let t=e.target,n=(t instanceof Element?t.closest(`.tree-node`):null)?.dataset.path;if(!n)return;let r=this._host.getNodeByPath(z(n));if(!r||this._host.isExpandableType(r.type)||!this._host.isEditableNode(r))return;let i=this._host.getSchemaByPath(r.path),a=K(r,i??{},``),o=this._extractControlValue(e.target,a,i);if(o===void 0)return;let s=typeof i?.validate==`function`?null:Sn(r.path,e=>this._host.getSchemaByPath(e)),c=Cn({raw:o,schema:i,plan:a,valueType:r.type,oldValue:r.value,path:r.path,itemRule:s}),l=B(r.path);if(c!==null){this._inlineErrors.get(l)!==c&&(this._inlineErrors.set(l,c),this._host.requestUpdate());return}this._inlineErrors.has(l)&&(this._inlineErrors.delete(l),this._host.requestUpdate());let u=this._host.getParent(r.path);u&&(this._selfWrites.set(l,(this._selfWrites.get(l)??0)+1),queueMicrotask(()=>this._selfWrites.delete(l)),u[r.path[r.path.length-1]]=xn(o,r.type,a,i))},this._onKeydown=e=>{if(!(e instanceof KeyboardEvent)||this._host.mode!==`edit`||e.isComposing||e.keyCode===229||e.key!==`Enter`)return;let t=e.target;if(t.tagName===`TEXTAREA`||!t.classList.contains(`edit-input`))return;let n=this._host.getEditControls(),r=n[n.indexOf(t)+1];r&&(r.focus(),(r.type===`text`||r.type===`number`)&&r.select())},this._host=e}attach(e){this._root=e,e.addEventListener(`input`,this._onInput),e.addEventListener(`change`,this._onInput),e.addEventListener(`keydown`,this._onKeydown)}hostDisconnected(){this._root?.removeEventListener(`input`,this._onInput),this._root?.removeEventListener(`change`,this._onInput),this._root?.removeEventListener(`keydown`,this._onKeydown)}getInlineError(e){return this._inlineErrors.get(B(e))??null}hasInlineErrors(){return this._inlineErrors.size>0}consumeSelfWrite(e){let t=B(e),n=this._selfWrites.get(t)??0;return n!==0&&(n===1?this._selfWrites.delete(t):this._selfWrites.set(t,n-1),!0)}clearErrors(){this._inlineErrors.clear(),this._selfWrites.clear()}_extractControlValue(e,t,n){switch(t.kind){case`checkbox`:{let t=W(n),r=e.checked;return t?r?t[0].value:t[1].value:r}case`select`:{let n=e;return t.multiple?Array.from(n.selectedOptions,e=>t.choices[Number(e.value)].value):t.choices[n.selectedIndex]?.value}case`radio`:return t.choices[Number(e.value)]?.value;default:return e.value}}},hr=class{constructor(e){this._pressTimer=null,this._pressOrigin=null,this._pressDocTeardown=null,this._root=null,this._onPointerDown=e=>{if(this._host.setSuppressClick(!1),this._host.mode!==`click-edit`||e.button!==0)return;let t=e.target;if(t instanceof Element&&t.closest(`.edit-editor`))return;let n=(t instanceof Element?t.closest(`.tree-node`):null)?.dataset.path;if(!n)return;let r=this._host.getNodeByPath(z(n));if(!r||!this._host.isEditableNode(r))return;this._cancelPress(),this._pressOrigin={x:e.clientX,y:e.clientY};let i=()=>this._cancelPress(),a=e=>{this._pressOrigin&&Math.hypot(e.clientX-this._pressOrigin.x,e.clientY-this._pressOrigin.y)>6&&this._cancelPress()};document.addEventListener(`pointerup`,i),document.addEventListener(`pointermove`,a),this._pressDocTeardown=()=>{document.removeEventListener(`pointerup`,i),document.removeEventListener(`pointermove`,a)},this._pressTimer=setTimeout(()=>{this._cancelPress(),this._host.mode===`click-edit`&&(this._host.setSuppressClick(!0),this._host.startEdit(r))},1e3)},this._host=e}_cancelPress(){this._pressTimer&&=(clearTimeout(this._pressTimer),null),this._pressOrigin=null,this._pressDocTeardown&&=(this._pressDocTeardown(),null)}attach(e){this._root=e,e.addEventListener(`pointerdown`,this._onPointerDown)}hostDisconnected(){this._cancelPress(),this._root?.removeEventListener(`pointerdown`,this._onPointerDown)}},gr=s`
  color-scheme: dark;
  --viewer-bg: #1f2937;
  --viewer-text: #f9fafb;
  --viewer-border: #374151;
  --viewer-hover-bg: #374151;
  --viewer-badge-bg: #4b5563;
  --viewer-badge-text: #d1d5db;
  --viewer-muted-text: #9ca3af;
  --viewer-hint-text: #6b7280;
  --viewer-toast-bg: #e5e7eb;
  --viewer-toast-text: #1f2937;
  --viewer-menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`,_r=s`
  background: #111827;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`,vr=s`
  :host {
    --viewer-icon-size: 18px;
    --viewer-font-size: 1em;
    --viewer-bg: #ffffff;
    --viewer-text: #333333;
    --viewer-border: #e5e7eb;
    --viewer-hover-bg: #f3f4f6;
    --viewer-badge-bg: #e5e7eb;
    --viewer-badge-text: #6b7280;
    --viewer-indent-size: 20px;
    --viewer-required-color: #dc2626;
    /* 语义变量（暗色值见上方 darkVars 片段）：原硬编码色收敛于此，明暗成对翻转 */
    --viewer-muted-text: #6b7280;
    --viewer-hint-text: #9ca3af;
    --viewer-toast-bg: #1f2937;
    --viewer-toast-text: #f9fafb;
    --viewer-menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    /* key 列背景带底色（暗色模式 hover-bg 覆盖时 color-mix 结果自动跟随） */
    --viewer-grid-band-bg: color-mix(in srgb, var(--viewer-hover-bg) 20%, transparent);
    /* root-bg 根级分组行常驻底色（暗色模式同上自动跟随） */
    --viewer-root-bg: color-mix(in srgb, var(--viewer-hover-bg) 60%, transparent);
    /* 区头/区尾背景（ADR-0035）：与 root-bg 同源（hover-bg 60% 混合，接入既有背景带
       视觉语言，暗色自动跟随）；交界分割线复用 --viewer-border */
    --viewer-header-bg: color-mix(in srgb, var(--viewer-hover-bg) 60%, transparent);
    --viewer-footer-bg: color-mix(in srgb, var(--viewer-hover-bg) 60%, transparent);
    /* 折叠/展开过渡时长与缓动（ADR-0032）：设 0 即关闭动画 */
    --viewer-collapse-duration: 200ms;
    --viewer-collapse-easing: ease-out;

    /* 原生控件（checkbox/radio/range/color/input）与滚动条配色跟随组件自身主题而非宿主页面 */
    color-scheme: light;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: var(--viewer-font-size);
    color: var(--viewer-text);
    background: var(--viewer-bg);
    border: 1px solid var(--viewer-border);
    border-radius: 8px;
    /* 滚动收敛到内容区（ADR-0035）：:host 不再滚动，.tree-container 承担垂直滚动；
       :host 仅裁切圆角（高度由使用方 CSS 约束） */
    overflow: hidden;
  }

  /* ---- 区头/区尾（ADR-0035）：钉住的工具条——背景区分内容区，交界 1px 分割线 ---- */

  /* form 纵向铺满：区头/区尾 flex-shrink:0，内容区 flex:1（滚动容器） */
  .viewer-form {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    min-width: 0;
  }

  .viewer-header,
  .viewer-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    padding: 1em 12px;
  }

  .viewer-header {
    background: var(--viewer-header-bg);
    border-bottom: 1px solid var(--viewer-border);
  }

  .viewer-footer {
    background: var(--viewer-footer-bg);
    border-top: 1px solid var(--viewer-border);
  }

  /* 标题区：截断防撑破（长标题 ellipsis）；slot="title" 内容同容器承载 */
  .chrome-title {
    font-weight: 600;
    flex-shrink: 0;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 动作行：吃满剩余宽度（左组贴标题/起点，右组 margin-left:auto 推远） */
  .chrome-actions {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  .chrome-actions-group {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .chrome-actions-group.right {
    margin-left: auto;
  }

  /* ---- 提交管理（ADR-0035）：受管提交的全局遮罩 + spinner ---- */

  /* 覆盖整个组件（含区头/区尾）：半透明底（viewer-bg 60% 混合）+ 拦截指针交互
     （天然防重复提交）；z-index 压过 toast（10） */
  .submit-overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: color-mix(in srgb, var(--viewer-bg) 60%, transparent);
    color: var(--viewer-text);
    font-weight: 500;
    cursor: progress;
  }

  .submit-spinner {
    width: 1em;
    height: 1em;
    border: 2px solid color-mix(in srgb, var(--viewer-badge-text) 30%, transparent);
    border-top-color: var(--viewer-badge-text);
    border-radius: 50%;
    animation: asv-submit-spin 0.8s linear infinite;
  }

  @keyframes asv-submit-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .submit-spinner {
      animation: none;
    }
  }

  /* 滚动条：8px 现代风格，配色走主题变量（明暗模式自动跟随）；Firefox 以 thin 近似 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--viewer-badge-text) 40%, transparent);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: color-mix(in srgb, var(--viewer-badge-text) 60%, transparent);
  }

  @supports not selector(::-webkit-scrollbar) {
    * {
      scrollbar-width: thin;
      scrollbar-color: color-mix(in srgb, var(--viewer-badge-text) 40%, transparent) transparent;
    }
  }

  .tree-node {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: pointer;
    transition: background-color 0.15s ease;
    min-height: 32px;
  }

  .tree-node:hover {
    background: color-mix(in srgb, var(--viewer-hover-bg) 50%, transparent);
  }

  .node-content {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    /* 行恒满宽（hover 整行高亮），缩进在行内容上产生：depth × 步进（indent-size - 8px，
       行内左 padding 8px 由 .tree-node 统一提供）。value 全局对齐：缩进由 .node-label
       宽度反向补偿（见下），「缩进 + 标签」总宽恒定 = 全局列宽，value 起点不随深度漂移 */
    padding-left: calc(var(--row-depth, 0) * (var(--viewer-indent-size) - 8px));
  }

  .expand-icon {
    width: var(--viewer-icon-size);
    height: var(--viewer-icon-size);
    flex-shrink: 0;
    transition: transform 0.2s ease;
    margin-right: 4px;
  }

  .expand-icon.expanded {
    transform: rotate(90deg);
  }

  .type-icon {
    width: var(--viewer-icon-size);
    height: var(--viewer-icon-size);
    flex-shrink: 0;
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .expand-icon svg,
  .type-icon svg {
    width: 100%;
    height: 100%;
  }

  /* 标签区：key + 折叠提示 + 数量徽章；left 模式下吃统一列宽（由 JS 测量写入 --viewer-key-width，
     测量需求含深度补偿，见 _measureLabelWidth）。value 全局对齐：标签宽随深度反向补偿缩进，
     「缩进 + 标签」总宽恒定 = 全局列宽，value/edit 控件起点不随行深漂移；
     未测量时第二声明含未定义变量 IACVE 回落首条 auto */
  .node-label {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 6px;
    overflow: hidden;
    width: var(--viewer-key-width, auto);
    width: calc(var(--viewer-key-width) - var(--row-depth, 0) * (var(--viewer-indent-size) - 8px));
  }

  .node-key {
    font-weight: 500;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 作为 .node-label 的 flex 子项，允许收缩以吸收列宽截断 */
    min-width: 0;
  }

  /* 徽章不参与截断，超限时只截 key */
  .collapsed-hint,
  .child-count {
    flex-shrink: 0;
  }

  /* schema required 标记：label 后红色星号，列宽截断时永不被切 */
  .required-mark {
    color: var(--viewer-required-color);
    flex-shrink: 0;
    margin-left: 2px;
    margin-right: 4px;
    font-weight: 500;
  }

  /* right 模式：标签区内容自适应、value 右对齐（CSS 覆盖，JS 无需清理列宽变量） */
  :host([value-align='right']) .node-label {
    width: auto;
  }

  :host([value-align='right']) .node-value {
    text-align: right;
  }

  .child-count {
    background: var(--viewer-badge-bg);
    color: var(--viewer-badge-text);
    font-size: 0.75em;
    padding: 1px 6px;
    border-radius: 10px;
    margin-right: 6px;
    white-space: nowrap;
    font-weight: 500;
  }

  .collapsed-hint {
    color: var(--viewer-hint-text);
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    margin-right: 6px;
    white-space: nowrap;
  }

  .node-value {
    color: var(--viewer-muted-text);
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    min-width: 0;
    /* 空值时保留可交互高度：node-value 是双击进入编辑的触发区，高度为 0 将无法响应 */
    min-height: 1em;
  }

  /* 多行文本值（值含换行的字符串）：保留换行按自然段落折行；高度截断至内容可见区
     40%（--viewer-height 由列宽控制器的宿主 ResizeObserver 写入，未测量回退 200px），
     超出部分裁剪且无滚动条 */
  .node-value.multiline {
    white-space: pre-wrap;
    word-break: break-word;
    max-height: calc(var(--viewer-height, 200px) * 0.4);
    text-overflow: clip;
  }

  /* 节点工具区：hover 时显示，编辑时常驻 */
  .node-tools {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    margin-left: 4px;
    visibility: hidden;
  }

  .tree-node:hover .node-tools,
  .tree-node.editing .node-tools {
    visibility: visible;
  }

  .node-tool {
    width: var(--viewer-icon-size);
    height: var(--viewer-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    color: var(--viewer-badge-text);
  }

  .node-tool:hover {
    background: var(--viewer-hover-bg);
    color: var(--viewer-text);
  }

  .node-tool svg {
    width: 100%;
    height: 100%;
  }

  /* ---- schema.actions 节点动作（ADR-0030）---- */

  /* 动作组容器：组内紧凑间距（组间由 .node-tools 的 gap 承担）；常驻档的 visibility 覆盖目标 */
  .node-actions {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  /* show-actions='2' 常驻档：覆盖父级 node-tools 的 visibility:hidden
  （visibility 可被子元素覆盖显示，无需重排 DOM）；'1'（默认）随 hover 机制；'0' 不渲染 */
  :host([show-actions='2']) .tree-node .node-actions {
    visibility: visible;
  }

  /* 置灰态：enable=false 渲染但不可点（pointer-events 兜底点击守卫） */
  .node-tool.disabled,
  .node-tool-text.disabled {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }

  /* 仅 label 动作的文字按钮变体：小字号紧凑内边距 */
  .node-tool-text {
    height: var(--viewer-icon-size);
    display: inline-flex;
    align-items: center;
    padding: 0 6px;
    font-size: 0.75em;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    color: var(--viewer-badge-text);
  }

  .node-tool-text:hover {
    background: var(--viewer-hover-bg);
    color: var(--viewer-text);
  }

  /* image 形态：图片按图标尺寸 contain 缩放 */
  .node-tool img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 2px;
  }

  /* 动作组与内置工具组的分隔线（两组并存时由渲染条件保证，ADR-0030） */
  .tools-divider {
    width: 1px;
    height: 14px;
    background: var(--viewer-border);
    flex-shrink: 0;
  }

  /* dropdown 触发器容器：菜单面板的定位锚 */
  .node-action-menu {
    position: relative;
    display: inline-flex;
  }

  /* dropdown 触发按钮的下拉箭头（内置 chevron 旋转向下） */
  .action-caret {
    width: 10px;
    height: 10px;
    margin-left: 2px;
    display: inline-flex;
  }

  .action-caret svg {
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
  }

  /* dropdown 菜单面板：行内 absolute 右对齐（KISS，不防容器裁剪，ADR-0030） */
  .action-menu {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    min-width: 120px;
    background: var(--viewer-bg);
    border: 1px solid var(--viewer-border);
    border-radius: 6px;
    padding: 4px;
    box-shadow: var(--viewer-menu-shadow);
    z-index: 10;
  }

  .action-menu-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85em;
    color: var(--viewer-text);
    white-space: nowrap;
  }

  .action-menu-item:hover {
    background: var(--viewer-hover-bg);
  }

  /* 菜单项置灰：enable=false 同语义（ADR-0030） */
  .action-menu-item.disabled {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }

  /* 菜单项图标 16px（ADR-0033）：24 viewBox 等比缩小，尺寸越大线宽漂移越小；
     任意名图标无法逐名做粗线变体，取尺寸微调 + 接受剩余轻微变细 */
  .action-menu-item svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* items 的 "-" 分割线 */
  .action-menu-divider {
    height: 1px;
    background: var(--viewer-border);
    margin: 4px 0;
  }

  /* 行内编辑输入框 */
  .edit-input {
    font: inherit;
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    border: 1px solid var(--viewer-border);
    border-radius: 4px;
    padding: 0 4px;
    min-width: 0;
    flex-grow: 1;
    background: var(--viewer-bg);
    color: var(--viewer-text);    
    outline: none;
    padding: 6px;
  }

  .edit-input:focus {
    border-color: var(--viewer-badge-text);
  }

  input[type='checkbox'].edit-input {
    flex-grow: 0;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  /* 编辑态勾选框行：编辑容器为纵向 flex，勾选框与文案横排成行（点文案亦可切换勾选） */
  .edit-checkbox {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    min-height: 26px;
    cursor: pointer;
  }

  /* 勾选框旁文案：schema checkLabel / choices 当前项 label / switchValues 当前值 */
  .check-label {
    margin-left: 6px;
    white-space: nowrap;
  }

  /* 编辑器容器：所有编辑控件的公共宿主（统一 focusout 失焦判定）；
     纵向排列控件与错误条（错误显示在 node-value 内的控件下方） */
  .edit-editor {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    min-width: 0;
  }

  /* 值装饰（schema.prefix/suffix）：与 node-value 同款排版——继承字体/字号/颜色与行高，
     不做弱化（无透明度/缩字号），仅防装饰文本换行 */
  .asv-affix {
    white-space: nowrap;
    padding: 0px 2px;
  }

  /* 编辑态装饰不在 .node-value 内（编辑器整体替换该容器），补齐同款排版：
     与 .edit-input 一致的等宽字体与 0.9em 字号（em 基准同为行内容，查看态继承不叠加） */
  .asv-affix-row .asv-affix {
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
  }

  .asv-affix-row {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex-grow: 1;
    min-width: 0;
  }

  /* 多行编辑器：整体编辑 JSON 与 widget=textarea */
  .edit-textarea {
    min-height: 72px;
    resize: vertical;
    line-height: 1.4;
  }

  /* radio 组：行内平铺可换行；纵排容器中不随 stretch 拉满宽 */
  .edit-radio-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 12px;
    flex-grow: 1;
    min-width: 0;
    align-self: flex-start;
  }

  .edit-radio-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    white-space: nowrap;
  }

  .edit-radio {
    cursor: pointer;
  }

  /* 校验错误：控件下方红色文字，无背景 */
  .edit-error {
    color: var(--viewer-required-color);
    font-size: 0.85em;
    padding-top: 2px;
    cursor: default;
    user-select: text;
  }

  /* widget=color 默认查看渲染：相框结构（白底 + 1px 边框 + 3px 内边距，ADR-0025）——
     颜色块由 ::before 铺满 content 区域，色值经 --swatch-color 内联传入 */
  .to-view-color {
    display: inline-block;
    width: 3em;
    height: 1em;
    border: 1px solid var(--viewer-border);
    border-radius: 5px;
    background: white;
    padding: 3px;
    vertical-align: middle;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }

  .to-view-color::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: var(--swatch-color);
  }

  /* widget=color 编辑态：色板与 hex 文本横排（编辑容器为纵向 flex） */
  .edit-color {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 6px;
    min-height: 26px;
    cursor: pointer;
  }

  .edit-color input[type='color'].edit-input {
    flex-grow: 0;
    width: 36px;
    height: 26px;
    padding: 2px;
    cursor: pointer;
  }

  .color-hex {
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    white-space: nowrap;
  }

  /* widget=range 默认查看渲染：迷你滑轨（轨道 + 填充段 + 数值，ADR-0025 语言） */
  .to-view-range {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    vertical-align: middle;
  }

  .range-track {
    display: inline-block;
    width: 2.5em;
    height: 4px;
    border-radius: 2px;
    background: color-mix(in srgb, var(--viewer-text) 15%, transparent);
    overflow: hidden;
  }

  .range-fill {
    display: block;
    height: 100%;
    background: var(--viewer-badge-text);
  }

  /* widget=range 编辑态：滑块与实时数值横排（编辑容器为纵向 flex） */
  .edit-range {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 6px;
    flex-grow: 1;
    min-height: 26px;
    cursor: pointer;
  }

  .edit-range input[type='range'].edit-input {
    flex-grow: 1;
    padding: 0;
    cursor: pointer;
  }

  .range-value {
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    white-space: nowrap;
  }

  /* widget=checkbox 默认查看渲染：只读勾选框——包裹层 ::before 透明遮罩命中自身而非 input，
     点击不切换勾选且保持正常视觉（不用 disabled：不派发鼠标事件致双击进编辑失效，部分主题下灰化） */
  .to-view-checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .to-view-checkbox::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  /* —— 配置面板分组（ADR-0034）—— */

  /* 组标题条：横跨整行的区块头——不参与两列网格/列宽测量/grid 线（决策十二），
     点击折叠/展开整组（决策二）；hover 反馈与树行同机制 */
  .group-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    min-height: 32px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease;
  }

  .group-header:hover {
    background: color-mix(in srgb, var(--viewer-hover-bg) 50%, transparent);
  }

  .group-title {
    font-weight: 600;
    font-size: 0.85em;
    color: var(--viewer-badge-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  /* 组内容容器：与 .node-children 共用折叠机制（grid 0fr + inert，ADR-0032/0034 拟定一） */

  /* 子树容器（ADR-0032 full 渲染）：单行轨道 grid，折叠 = 行高 1fr→0fr 过渡收起——
     高度真实线性、无魔数（display:none 不可过渡，max-height 有展开态魔数与速度失真，
     均弃）。行内容经 .node-children-inner 单一内层包裹（grid 轨道动画要求一轨道一项）。
     lazy 模式折叠即移除 DOM 不经此规则；整树重建产出新 DOM 无前值，天然不动画 */
  .node-children,
  .group-body {
    display: grid;
    grid-template-rows: 1fr;
    transition: grid-template-rows var(--viewer-collapse-duration) var(--viewer-collapse-easing);
  }

  .node-children.collapsed,
  .group-body.collapsed {
    grid-template-rows: 0fr;
  }

  /* 行轨道内层：overflow + min-height 归零是 0fr 收起的裁切前提
     （min-height:auto 会顶住内容高度不塌缩） */
  .node-children-inner,
  .group-body-inner {
    overflow: hidden;
    min-height: 0;
  }

  /* —— 网格线（ADR-0028）：grid 属性经 :host attr 门控，非法值无选择器匹配天然等效 0 —— */

  /* grid=2 垂直线的层叠宿主：建立层叠上下文，使 z-index:-1 的伪元素线
     画在行内容（文字/控件/hover 高亮）之下——underlay 不覆盖。
     flex:1 吃满 form 剩余高度；自身不滚动——key 背景带（::before）与列宽拖拽手柄
     （.key-resizer）的绝对定位以它为包含块，滚动时恒钉住（ADR-0035 修订：
     滚动曾直接置于本元素致二者随内容滚走） */
  .tree-container {
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  /* 滚动包裹层：内容区唯一滚动容器（ADR-0035）——垂直滚动承接原 :host，
     水平维持隐藏（长值有 ellipsis）；underlay/手柄在此之外，不受滚动影响 */
  .tree-scroll {
    flex: 1;
    min-height: 0;
    overflow: hidden auto;
  }

  /* grid=1/3 水平线：仅整棵树最后可见行（.last-row，渲染期沿展开链下钻判定）无线，
     展开容器的末项后随子树行，照画底线 */
  :host([grid='1']) .tree-node:not(.last-row),
  :host([grid='3']) .tree-node:not(.last-row) {
    border-bottom: 1px solid var(--viewer-border);
  }

  /* 伪元素载体几何（key 列背景带与 grid=2/3 垂直线共用的 underlay 载体）：
     背景带默认显示，故背景未隐藏或 grid=2/3 任一成立即渲染；宽度自行左缘铺至全局
     value 起点左移 1em（锚定恒定：
     行 padding 8 + 展开图标+4 + 类型图标+6 + 全局列宽+标签右间距 6 − 1em。
     value 全局对齐后起点不随行深漂移，垂直线与各行 value 一致对齐；
     布局常量与 .tree-node/.node-content/.node-label 联动，改动须同步）；
     排除 right 对齐：该模式不测量列宽，calc 无长度可用，且 width 失效后
     shrink-to-fit 的 1px 边框会贴左残留（ADR-0028 决策五的技术修正） */
  :host(
    :not([value-align='right']):is(:not([hide-key-bg]), [grid='2'], [grid='3'])
  ) .tree-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: calc(
      8px + var(--viewer-icon-size) + 4px + var(--viewer-icon-size) + 6px +
      var(--viewer-key-width, 0px) + 6px - 1em
    );
    z-index: -1;
  }

  /* key 列背景带：默认显示（任意 grid 值含 0/1 无垂直线均显示），
     hide-key-bg 启用后隐藏；underlay 同层叠，不覆盖行内容 */
  :host(:not([hide-key-bg]):not([value-align='right'])) .tree-container::before {
    background-color: var(--viewer-grid-band-bg);
  }

  /* grid=2/3 key/value 垂直分隔线：与 value 文本保持 1em 间距（载体右缘描边） */
  :host(:is([grid='2'], [grid='3']):not([value-align='right'])) .tree-container::before {
    border-right: 1px solid var(--viewer-border);
  }

  /* 列宽拖拽手柄（ADR-0036）：宿主级单一覆盖层，锚定与背景带载体同源（同一 calc，
     布局常量与 .tree-node/.node-content/.node-label 联动，改动须同步）；7px 热区骑在
     分界线上，常态透明不遮文字（穿透可见）；right 模式无分界不渲染
     （与 ADR-0028 决策五同因）；z-index 置于行内容之上以接收指针事件 */
  .key-resizer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(
      8px + var(--viewer-icon-size) + 4px + var(--viewer-icon-size) + 6px +
      var(--viewer-key-width, 0px) + 6px - 1em - 3px
    );
    width: 7px;
    cursor: col-resize;
    touch-action: none;
    z-index: 1;
  }

  /* 拖动指示线：2px 居中细线，悬停/按压显现（热区仍为 7px，好抓取） */
  .key-resizer::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    border-radius: 1px;
  }

  .key-resizer:hover::before,
  .key-resizer:active::before {
    background-color: color-mix(in srgb, var(--viewer-border) 55%, transparent);
  }

  :host([value-align='right']) .key-resizer {
    display: none;
  }

  /* root-bg：根级分组行常驻底色（.root-group 渲染期标注，顶层且含子节点）；
     :not(:hover) 让出 hover 态——本规则特异性高于 .tree-node:hover，不排除会压掉交互反馈 */
  :host([root-bg]) .tree-node.root-group:not(:hover) {
    background-color: var(--viewer-root-bg);
  }

  /* only-configurable（ADR-0034）：组标题条即此模式下的根级分组行，
     root-bg 同样生效；:not(:hover) 让出 hover 态（与 .root-group 同策略） */
  :host([root-bg]) .group-header:not(:hover) {
    background-color: var(--viewer-root-bg);
  }

  /* 离屏宽度探针：复用真实样式类测文本自然宽，inline-block 才有布局盒 */
  .measure-probe {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    top: 0;
    left: 0;
    white-space: nowrap;
  }

  .measure-probe span {
    display: inline-block;
    width: auto;
  }

  .loading {
    padding: 16px;
    text-align: center;
    color: var(--viewer-badge-text);
  }

  /* toast：组件右上方浮层，2s 后经 .fading 淡隐（transition opacity） */
  .toast {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    padding: 4px 12px;
    border-radius: 6px;
    background: var(--viewer-toast-bg);
    color: var(--viewer-toast-text);
    font-size: 0.85em;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .toast.fading {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .toast {
      transition: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .expand-icon {
      transition: none;
    }
    .node-children,
    .group-body {
      transition: none;
    }
  }

  /* ---- 暗色主题：dark 属性强制 / 系统媒体查询跟随，共用文件头调色板片段（DRY）----
     置于文件末尾是级联要求：媒体查询无特异性加成，须以源序压过 :host 亮色默认与
     .to-view-color 白底相框（同特异性下后者源序在前）；:host([dark]) 特异性 (0,2,0)
     天然高于 :host 与 .to-view-color（各 0,1,0），系统亮色下强制生效；
     两处门控同时命中时变量值相同，先后无谓 */
  :host([dark]) {
    ${gr}
  }

  :host([dark]) .to-view-color {
    ${_r}
  }

  @media (prefers-color-scheme: dark) {
    :host {
      ${gr}
    }

    .to-view-color {
      ${_r}
    }
  }
`;function yr(e,t){if(e===null)return`null`;if(e===void 0)return`undefined`;switch(t){case`string`:return String(e);case`number`:return String(e);case`boolean`:return e?`true`:`false`;case`function`:return`ƒ()`;case`computed`:return e==null?String(e):Array.isArray(e)?`[${e.length}]`:typeof e==`object`?`{...}`:String(e);case`markRaw`:return`{...}`;case`object`:return`{...}`;case`array`:return`[${e.length}]`;default:return String(e)}}function br(e){return e.type===`computed`?`computed`:e.type===`markRaw`?`markRaw`:e.type===`function`?`function`:e.type===`array`?`array`:e.type===`object`?`object`:e.type===`string`?`string`:e.type===`number`?`number`:e.type===`boolean`?`boolean`:`default`}var xr=class extends Nn{constructor(e){if(super(e),this.it=k,e.type!==jn.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===k||e==null)return this._t=void 0,this.it=e;if(e===O)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};xr.directiveName=`unsafeHTML`,xr.resultType=1;var Sr=Mn(xr);function Cr(e){return e==null?k:typeof e==`string`?e===``?k:Sr(e):e}function wr(e,t){return t===`edit`?`full`:e}function Tr(e,t){Array.isArray(e)?e.splice(t,1):delete e[t]}function Er(e,t){return Array.isArray(e)?e.filter(e=>{if(!e||typeof e!=`object`||e.visible===!1)return!1;if(typeof e.mode==`string`&&e.mode.trim()!==``&&typeof t==`string`){let n=e.mode.split(`,`).map(e=>e.trim()).filter(Boolean);if(n.length>0&&!n.includes(t))return!1}return!0}):[]}function Dr(e,t,n,r,i){if(typeof n.onClick==`function`)try{n.onClick(e.value,{action:n,options:t,event:r,update:t=>{let n=e.path;if(!n||n.length===0||!i)return;let r=i(n);r&&(r[n[n.length-1]]=t)}})}catch(e){console.warn(`[autostore-viewer] action onClick 执行失败`,e)}}function Z(e,t){return typeof e.tooltip==`string`?e.tooltip:t===void 0?k:t}function Or(e,t){let n=t.icon;return typeof n!=`string`||n===``?k:e.hasIcon(n)?R(n):(e.requestIcons([n]),t.label?k:R(n))}function kr(e,t,n,r,i){return a=>{a.stopPropagation(),i||e.clickAction(t,n,r,a)}}function Ar(e,t,n,r){let i=typeof r.icon==`string`&&r.icon!==``,a=typeof r.label==`string`&&r.label!==``;if(!i&&!a)return k;let o=r.enable===!1,s=Or(e,r);return s===k&&a?E`<span
      class="node-tool-text ${o?`disabled`:``}"
      title=${Z(r)}
      @click=${kr(e,t,n,r,o)}
    >${r.label}</span>`:E`<span
    class="node-tool ${o?`disabled`:``}"
    title=${Z(r,r.label)}
    @click=${kr(e,t,n,r,o)}
  >${s}</span>`}function jr(e,t,n,r){if(typeof r.url!=`string`||r.url===``)return k;let i=r.enable===!1;return E`<span
    class="node-tool ${i?`disabled`:``}"
    title=${Z(r,r.label)}
    @click=${kr(e,t,n,r,i)}
  ><img src=${r.url} alt=${r.label??``} /></span>`}function Mr(e,t){return typeof t!=`string`||t===``?k:e.hasIcon(t)?R(t):(e.requestIcons([t]),k)}function Nr(e,t,n,r,i){return(Array.isArray(r.items)?r.items:[]).filter(e=>e===`-`||e&&typeof e==`object`&&e.visible!==!1).map(a=>{if(a===`-`)return E`<div class="action-menu-divider"></div>`;let o=a.enable===!1;return E`<div
        class="action-menu-item ${o?`disabled`:``}"
        @click=${s=>{s.stopPropagation(),e.setMenuOpen(i,!1),r.syncMenu===!0&&(r.label=a.label,r.icon=a.icon,r.tooltip=a.tooltip),o||e.clickAction(t,n,a,s)}}
      >${Mr(e,a.icon)}<span>${a.label??``}</span></div>`})}function Pr(e,t,n,r,i){let a=r.enable===!1,o=!a&&e.isMenuOpen(i),s=Or(e,r),c=typeof r.label==`string`&&r.label!==``,l=s===k&&c,u=E`<span
    class="${l?`node-tool-text`:`node-tool`} ${a?`disabled`:``}"
    title=${Z(r)}
    @click=${t=>{t.stopPropagation(),a||e.setMenuOpen(i,!e.isMenuOpen(i))}}
  >${s}${l?r.label:k}${r.caret===!0?E`<span class="action-caret">${R(`chevron-sm`)}</span>`:k}</span>`;return o?E`<span class="node-action-menu">
    ${u}
    <div class="action-menu" @click=${e=>e.stopPropagation()}>
      ${Nr(e,t,n,r,i)}
    </div>
  </span>`:E`<span class="node-action-menu">${u}</span>`}function Fr(e,t,n,r,i=0){return E`${n.map((n,a)=>{let o=n.type??`button`,s=`${t.menuKeyPrefix}#${i+a}`;return o===`dropdown`?Pr(e,t,r,n,s):o===`image`?jr(e,t,r,n):Ar(e,t,r,n)})}`}function Ir(e,t,n,r){return Fr(e,{path:t.path,value:t.value,menuKeyPrefix:B(t.path)},n,r)}function Lr(e,t,n,r,i=0){return Fr(e,{menuKeyPrefix:r},t,n,i)}function Rr(e,t){let n=[],r=[];for(let i of e)((i.align??t)===`left`?n:r).push(i);return{left:n,right:r}}function zr(e){let t=e.length,n=0,r=``;for(;n<t;){let i=e[n];if(i===`"`){for(r+=`"`,n++;n<t&&e[n]!==`"`;)e[n]===`\\`&&n+1<t&&(r+=e[n]),r+=e[n],n++;n<t&&(r+=`"`),n++;continue}if(i===`'`){for(r+=`"`,n++;n<t&&e[n]!==`'`;){if(e[n]===`\\`&&n+1<t){let t=e[n+1];t===`'`?r+=`'`:(r+=e[n],r+=t),n+=2;continue}e[n]===`"`?r+=`\\"`:r+=e[n],n++}r+=`"`,n++;continue}if(Vr(i)&&!(n>0&&Ur(e[n-1]))){let i=n;for(;i<t&&Hr(e[i]);)i++;let a=e.slice(n,i),o=i;for(;o<t&&Br(e[o]);)o++;if(o<t&&e[o]===`:`){r+=`"`,r+=a,r+=`"`,n=i;continue}r+=a===`true`||a===`false`||a===`null`?a:`"`+a+`"`,n=i;continue}if(i===`,`){let a=n+1;for(;a<t&&Br(e[a]);)a++;if(a<t&&(e[a]===`}`||e[a]===`]`)){n++;continue}r+=i,n++;continue}r+=i,n++}return r}function Br(e){return e===` `||e===`	`||e===`
`||e===`\r`}function Vr(e){return e>=`a`&&e<=`z`||e>=`A`&&e<=`Z`||e===`_`||e===`$`}function Hr(e){return Vr(e)||e>=`0`&&e<=`9`||e===`-`}function Ur(e){return e>=`0`&&e<=`9`||e===`.`||e===`-`||e===`+`}function Wr(e,t){if(e==null)return;if(typeof e!=`string`)return e;let n=e.trim();if(n!==``)try{return JSON.parse(zr(n))}catch(e){console.warn(`[autostore-viewer] ${t} 配置解析失败，忽略该区`,e);return}}function Gr(e,t){return typeof e!=`string`||e===``?e:e.replace(/<store\.(\w+)>/g,(e,n)=>{let r=t?.[n];return r==null?``:String(r)})}function Kr(e,t,n){let r=(t||``).trim().toUpperCase()||`GET`;return r===`GET`?{url:qr(e,n),init:{method:r}}:{url:e,init:{method:r,body:n}}}function qr(e,t){let n=Array.from(t,([e,t])=>[e,typeof t==`string`?t:t.name]),r=new URLSearchParams(n).toString();return r===``?e:e+(e.includes(`?`)?`&`:`?`)+r}function Q(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var $=class extends P{static{this.styles=vr}constructor(){super(),this.storeId=``,this.expandDepth=2,this.showCount=!0,this.showHint=!0,this.showComputed=!1,this.mode=`view`,this.renderMode=`full`,this.allowDelete=!1,this.valueAlign=`left`,this.grid=`0`,this.hideKeyBg=!1,this.rootBg=!1,this.dark=!1,this.onlyConfigurable=!1,this.entrys=``,this.maxKeyWidth=500,this.disableSchema=!1,this.showActions=`1`,this.iconUrl=`https://api.iconify.design/lucide.json?icons={names}`,this.iconModify=``,this.action=``,this.method=``,this._icons=new qe(this),this._tree=new mn(this),this._store=new Qe(this),this._labelWidth=new hn(this),this._keyResize=new gn(this),this._editable=new pr(this),this._editDelegate=new mr(this),this._pressEdit=new hr(this),this._menus=new Je(this),this._toast=new Ye(this),this._treeNodes=[],this._entryInvalid=!1,this._configSections=null,this._entryInvalidPaths=[],this._suppressNextClick=!1,this._lastVisibleNode=null,this._chromeSlots={header:!1,footer:!1,title:!1},this._submitting=!1,this.addController(this._icons),this.addController(this._store),this.addController(this._labelWidth),this.addController(this._keyResize),this.addController(this._editable),this.addController(this._editDelegate),this.addController(this._pressEdit),this.addController(this._menus),this.addController(this._toast)}firstUpdated(){this._editDelegate.attach(this.renderRoot),this._pressEdit.attach(this.renderRoot),this._keyResize.attach(this.renderRoot)}connectedCallback(){super.connectedCallback(),this._store.tryBind()}disconnectedCallback(){super.disconnectedCallback()}willUpdate(e){(e.has(`renderMode`)||e.has(`mode`))&&this.mode===`edit`&&this.renderMode===`lazy`&&console.warn(`[autostore-viewer] mode=edit 恒为 render-mode="full"，lazy 声明暂被忽略（切离 edit 后按字面生效）`),e.has(`mode`)&&(e.get(`mode`)===`edit`&&this._store.store&&(this._editDelegate.clearErrors(),this._tree.syncTreeValues(this._treeNodes),this._labelWidth.scheduleMeasure()),this.mode===`view`&&this._editable.editingPath&&this._editable.exit())}updated(e){e.has(`storeId`)&&this._store.tryBind(),e.has(`onlyConfigurable`)&&this._store.store&&this._store.watch(),(e.has(`expandDepth`)||e.has(`showComputed`)||e.has(`entrys`)||e.has(`onlyConfigurable`))&&this._store.store&&this._tree.buildTree(),this.valueAlign!==`right`&&this._store.store&&(e.has(`_treeNodes`)||e.has(`showCount`)||e.has(`showHint`)||e.has(`valueAlign`)||e.has(`maxKeyWidth`)||e.has(`disableSchema`))&&this._labelWidth.scheduleMeasure()}set store(e){this._store.setStore(e)}get store(){return this._store.store}get _effectiveRenderMode(){return wr(this.renderMode,this.mode)}getTreeNodes(){return this._treeNodes}setTreeNodes(e){this._treeNodes=e}setEntryInvalid(e,t){this._entryInvalidPaths=t,this._entryInvalid=e}setConfigSections(e){this._configSections=e}shouldSuppressClick(){return this._suppressNextClick?(this._suppressNextClick=!1,!0):!1}rebuildTree(){this._tree.buildTree()}scheduleLabelWidthMeasure(){this._labelWidth.scheduleMeasure()}onStateOperate(e){if(this._tree.entryPaths.length>0&&Array.isArray(e?.path)){if(this._tree.isEntryAncestorOrSelf(e.path)){this._tree.buildTree(),this._labelWidth.scheduleMeasure(),this.requestUpdate();return}if(!this._tree.isPathWithinEntry(e.path))return}let t=this._editable.editingPath;if(!(t&&Array.isArray(e?.path)&&e.path.length===t.length&&e.path.every((e,n)=>e===t[n]))){if(this.mode===`edit`&&e?.type===`set`&&Array.isArray(e.path)){let t=this._tree.getNodeByPath(e.path);if(t&&!this._tree.isExpandableType(t.type)&&this._tree.isEditableNode(t)&&this._editDelegate.consumeSelfWrite(e.path))return}e.type===`delete`?this._tree.removeTreeNode(e.path):e.type===`insert`||e.type===`remove`?this._tree.updateTreeNode(e.path,this._store.getStateByPath(e.path)):this._tree.updateTreeNode(e.path,e.value),this._labelWidth.scheduleMeasure(),this.requestUpdate()}}onComputedDone(e){e?.path&&(this._tree.updateTreeNode(e.path,e.value),this._labelWidth.scheduleMeasure(),this.requestUpdate())}getSchema(e){return this._store.getSchemaByPath(e.path)}isExpandableType(e){return this._tree.isExpandableType(e)}isEditableNode(e){return this._tree.isEditableNode(e)}getMeasureProbe(){return this.renderRoot.querySelector(`.measure-probe`)}getHostElement(){return this}getLabelDepthBase(){return+!!this._configSections}setKeyWidth(e){this.style.setProperty(`--viewer-key-width`,e)}latchKeyWidth(){this._labelWidth.latch()}unlatchKeyWidth(){this._labelWidth.unlatch()}isKeyWidthLatched(){return this._labelWidth.latched}notifyKeyWidthChange(e,t){this.dispatchEvent(new CustomEvent(`key-width-change`,{detail:{width:e,manual:t},bubbles:!0,composed:!0}))}getStateByPath(e){return this._store.getStateByPath(e)}getParent(e){return this._store.getParent(e)}getStore(){return this._store.store}findNextEditable(e){return this._tree.findNextEditableSibling(e)}getNodeByPath(e){return this._tree.getNodeByPath(e)}findNodeByPath(e){return this._tree.getNodeByPath(e)}getSchemaByPath(e){return this._store.getSchemaByPath(e)}getDisplaySchemaByPath(e){return this.disableSchema?void 0:this._store.getSchemaByPath(e)}syncNode(e){this._tree.updateTreeNode(e,this._store.getStateByPath(e)),this._labelWidth.scheduleMeasure()}getEditInput(){return this.renderRoot.querySelector(`.edit-input`)}getEditControls(){return Array.from(this.renderRoot.querySelectorAll(`.tree-node .edit-editor .edit-input:not(:disabled)`)).filter(e=>!e.closest(`[inert]`))}startEdit(e){this._editable.start(e)}setSuppressClick(e){this._suppressNextClick=e}getDynamicSprite(){return this.renderRoot.querySelector(`.dynamic-sprite`)}hasIcon(e){return this._icons.has(e)}requestIcons(e){this._icons.request(e)}clickAction(e,t,n,r){this.dispatchEvent(new CustomEvent(`action`,{detail:{path:e.path?B(e.path):void 0,value:e.value,action:n},bubbles:!0,composed:!0,cancelable:!0}))&&Dr(e,t,n,r,e=>this._store.getParent(e))}isMenuOpen(e){return this._menus.isOpen(e)}setMenuOpen(e,t){this._menus.setOpen(e,t)}_deleteNode(e,t){e.stopPropagation();let n=this._store.getParent(t.path);n&&Tr(n,t.path[t.path.length-1])}_showToast(e){this._toast.show(e)}_isNodeEditing(e){return this.mode===`edit`?this._tree.isExpandableType(e.type)?this._editable.isEditing(e):this._tree.isEditableNode(e):this._editable.isEditing(e)}_renderNodeValue(e,t,n){if(t&&typeof t.toView==`function`)try{return Cr(t.toView(e.value))}catch(e){console.warn(`[autostore-viewer] toView 执行失败，回落默认渲染`,e)}let r=ur(t?.widget);if(r?.toView)try{let n=r.toView(this._buildViewContext(e,t));if(n)return n}catch(e){console.warn(`[autostore-viewer] widget toView 执行失败，回落默认渲染`,e)}if(n&&typeof n.label==`string`)return n.label;let i=yr(e.value,e.type),a=Tn(t,e.value);return!a.prefix&&!a.suffix?i:E`${a.prefix?E`<span class="asv-affix">${a.prefix}</span>`:k}${i}${a.suffix?E`<span class="asv-affix">${a.suffix}</span>`:k}`}_buildViewContext(e,t){let n=t??{};return{value:e.value,schema:n,plan:K(e,n,``),node:e,setValue:()=>{},onKeydown:()=>{}}}_renderEditingValue(e,t){let n=this.mode===`edit`?this._editDelegate.getInlineError(e.path):null;if(t&&typeof t.toRender==`function`)try{return this._editorShell(e,Cr(t.toRender(e.value)),n)}catch(e){console.warn(`[autostore-viewer] toRender 执行失败，回落默认编辑器`,e)}if(this.mode===`edit`&&!this._tree.isExpandableType(e.type)){let t=this.getSchema(e),r=t??{},i=K(e,r,`asv-${B(e.path)}`),a={value:e.value,schema:r,plan:i,node:e,name:wn(t,e.path),setValue:()=>{},onKeydown:()=>{}},o=(ur(r.widget)??fr(i.kind)).toRender(a);return this._editorShell(e,o,n)}return this._editable.renderEditor(e)}_editorShell(e,t,n){let r=n?E`<div class="edit-error">${n}</div>`:k,i=En(Tn(this.getDisplaySchemaByPath(e.path),e.value),t);return this.mode===`edit`?E`<div class="edit-editor">${i}${r}</div>`:E`<div
      class="edit-editor"
      @focusout=${t=>{t.currentTarget.contains(t.relatedTarget)||this._editable.onBlur(e)}}
    >${i}${r}</div>`}_renderNode(e,t=0){let n=this._effectiveRenderMode===`full`,r=e===this._lastVisibleNode,i=e.children.length>0&&(this._tree.entryPaths.length===0?e.path.length===1:this._tree.entryPaths.some(t=>e.path.length===t.length+1&&t.every((t,n)=>e.path[n]===t))),a=this._tree.isExpandableType(e.type),o=this._isNodeEditing(e),s=this.mode!==`view`&&this._tree.isEditableNode(e),c=this.allowDelete&&e.path.length>0,l=this.getSchema(e),u=this.disableSchema?void 0:l,d=this.showActions===`0`?[]:Er(l?.actions,this.mode),f=d.length>0?E`<span class="node-actions">${Ir(this,e,d,l??void 0)}</span>`:k,p=typeof l?.icon==`string`&&l.icon!==``?l.icon:void 0,m=br(e);p&&(this._icons.has(p)?m=p:this._icons.request([p]));let ee=u?.label??e.key,h=u?.required===!0,te=typeof u?.help==`string`?u.help:void 0,ne=(Array.isArray(u?.choices)?u.choices:void 0)?.find(t=>(typeof t==`object`&&t?t:{value:t}).value===e.value),re=a?k:this._renderNodeValue(e,u,ne);return E`
      <div
        class="tree-node ${o?`editing`:``} ${r?`last-row`:``} ${i?`root-group`:``}"
        style=${t>0?`--row-depth:${t}`:k}
        data-path=${B(e.path)}
        title=${te??k}
        @click=${()=>this._tree.toggleExpand(e)}
      >
        <div class="node-content">
          ${a?E`
            <span class="expand-icon ${e.expanded?`expanded`:``}">
              ${R(`chevron`)}
            </span>
          `:E`
            <span class="expand-icon" style="visibility: hidden;">
              ${R(`chevron`)}
            </span>
          `}
          <span class="type-icon">${R(m)}</span>
          <span class="node-label">
            <span class="node-key">${ee}</span>
            ${h?E`<span class="required-mark">*</span>`:k}
            ${this.showHint&&a&&!e.expanded&&!o?E`
              <span class="collapsed-hint">${e.type===`array`?`[...]`:`{...}`}</span>
            `:k}
            ${this.showCount&&e.childCount>0&&!o?E`
              <span class="child-count">${e.childCount}</span>
            `:k}
          </span>
          ${o?this._renderEditingValue(e,u):E`
            <span
              class="node-value ${typeof e.value==`string`&&e.value.includes(`
`)?`multiline`:``}"
              @dblclick=${s?()=>this._editable.start(e):k}
            >${re}</span>
          `}
          <span class="node-tools">
            ${f}
            ${!o&&d.length>0&&c?E`<span class="tools-divider"></span>`:k}
            ${!o&&c?E`
              <span class="node-tool" title="删除" @click=${t=>{t.stopPropagation(),this._deleteNode(t,e)}}>${R(`trash`)}</span>
            `:k}
          </span>
        </div>
      </div>
      ${a&&e.children.length>0&&(e.expanded||n)?E`
        <div
          class="node-children ${e.expanded?`expanded`:`collapsed`}"
          ?inert=${!e.expanded}
        >
          <div class="node-children-inner">
            ${e.children.map(e=>this._renderNode(e,t+1))}
          </div>
        </div>
      `:k}
    `}_renderSection(e){let t=this._effectiveRenderMode===`full`,n=this._tree.isGroupCollapsed(e),r;return e.icon&&(this._icons.has(e.icon)?r=e.icon:this._icons.request([e.icon])),E`${e.title?E`
        <div class="group-header" data-group=${e.name} @click=${()=>this._tree.toggleGroup(e)}>
          <span class="expand-icon ${n?``:`expanded`}">${R(`chevron`)}</span>
          ${r?E`<span class="type-icon">${R(r)}</span>`:k}
          <span class="group-title">${e.title}</span>
          ${this.showCount&&e.nodes.length>0?E`<span class="child-count">${e.nodes.length}</span>`:k}
        </div>`:k}${e.nodes.length>0&&(!n||t)?E`
        <div class="group-body ${n?`collapsed`:``}" ?inert=${n}>
          <div class="group-body-inner">
            ${e.nodes.map(e=>this._renderNode(e,1))}
          </div>
        </div>`:k}`}_defaultHeaderActions(){let e=this._store.store,t=e?.resetable===!0;return[{label:`重置`,mode:`edit`,enable:t?void 0:!1,tooltip:t?void 0:`store 未启用 resetable，无法重置`,onClick:()=>e?.reset()},{label:`保存`,mode:`edit`,onClick:()=>{this.renderRoot.querySelector(`.viewer-form`)?.requestSubmit()}}]}_onChromeSlotChange(e,t){let n=t.currentTarget.assignedElements().length>0;this._chromeSlots[e]!==n&&(this._chromeSlots={...this._chromeSlots,[e]:n})}_renderHeader(){if(this._chromeSlots.header)return E`<div class="viewer-header">
        <slot name="header" @slotchange=${e=>this._onChromeSlotChange(`header`,e)}></slot>
      </div>`;let e=this.header===void 0?{title:`<store.title>`,actions:this._defaultHeaderActions()}:Wr(this.header,`header`);if(!e)return k;let t=Gr(e.title,this._store.store)?.trim()||void 0,n=Er(e.actions,this.mode);return!t&&n.length===0?k:E`<div class="viewer-header">
      ${t||this._chromeSlots.title?E`<div class="chrome-title"><slot name="title" @slotchange=${e=>this._onChromeSlotChange(`title`,e)}>${t??k}</slot></div>`:k}
      ${n.length>0?this._renderChromeActions(n,`header`):k}
    </div>`}_renderFooter(){if(this._chromeSlots.footer)return E`<div class="viewer-footer">
        <slot name="footer" @slotchange=${e=>this._onChromeSlotChange(`footer`,e)}></slot>
      </div>`;let e=Er(Wr(this.footer,`footer`),this.mode);return!e||e.length===0?k:E`<div class="viewer-footer">${this._renderChromeActions(e,`footer`)}</div>`}_renderChromeActions(e,t){let{left:n,right:r}=Rr(e,t===`header`?`right`:`left`);return E`<div class="chrome-actions">
      ${n.length>0?E`<span class="chrome-actions-group">${Lr(this,n,void 0,t)}</span>`:k}
      ${r.length>0?E`<span class="chrome-actions-group right">${Lr(this,r,void 0,t,n.length)}</span>`:k}
    </div>`}_renderBody(){if(!this._store.store)return E`<div class="loading">未绑定 Store</div>`;if(this._entryInvalid)return E`<div class="loading">entrys 路径不存在: ${this._entryInvalidPaths.join(`, `)}</div>`;if(this._configSections){let e=null;for(let t of this._configSections)t.nodes.length>0&&!this._tree.isGroupCollapsed(t)&&(e=this._tree.findLastVisible(t.nodes));return this._lastVisibleNode=e,E`<div class="tree-container">
        <div class="tree-scroll">
          ${this._configSections.map(e=>this._renderSection(e))}
        </div>
        <!-- 列宽拖拽手柄（ADR-0036）：宿主级覆盖层，行为见 features/key-resize.ts；
             置于滚动包裹层之外——锚定不滚动的 .tree-container，滚动时钉住（ADR-0035 修订） -->
        <div class="key-resizer" title="拖拽调节列宽，双击复位"></div>
      </div>`}return this._lastVisibleNode=this._treeNodes.length>0?this._tree.findLastVisible(this._treeNodes):null,E`<div class="tree-container">
      <div class="tree-scroll">
        ${this._treeNodes.map(e=>this._renderNode(e))}
      </div>
      <!-- 列宽拖拽手柄（ADR-0036）：宿主级覆盖层，行为见 features/key-resize.ts；
           置于滚动包裹层之外——锚定不滚动的 .tree-container，滚动时钉住（ADR-0035 修订） -->
      <div class="key-resizer" title="拖拽调节列宽，双击复位"></div>
    </div>`}async _onFormSubmit(e){if(e.preventDefault(),this._submitting)return;if(!this.action){console.warn(`[autostore-viewer] 未声明 action 属性，保存仅派发 action 事件，不执行表单提交`);return}let t=e.currentTarget;if(this._editDelegate.hasInlineErrors()){this._showToast(`表单校验未通过，请检查标红项`);return}this._submitting=!0;try{let{url:e,init:n}=Kr(this.action,this.method,new FormData(t)),r=await fetch(e,n);r.ok?this._showToast(`提交成功`):this._showToast(`提交失败（${r.status}）`),this._dispatchSubmitResult(r.ok,r.status,r)}catch{this._showToast(`提交失败（网络异常）`),this._dispatchSubmitResult(!1,0,null)}finally{this._submitting=!1}}_dispatchSubmitResult(e,t,n){this.dispatchEvent(new CustomEvent(`submit-result`,{detail:{ok:e,status:t,response:n},bubbles:!0,composed:!0}))}render(){return E`
      <!-- 动态图标 sprite：置于内置 sprite 之前，同 id 时 <use> 按文档序命中前者（自定义覆盖内置，ADR-0024） -->
      <svg class="dynamic-sprite" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true"></svg>
      <!-- 内置图标 sprite：<symbol> 定义只此一份，节点处的 iconHtml() 通过 <use> 引用 -->
      ${He}
      <slot name="icons" @slotchange=${e=>this._icons.onSlotChange(e)} style="display: none;"></slot>
      <form
        class="viewer-form"
        action=${this.action||k}
        method=${this.method||k}
        novalidate
        @submit=${this._onFormSubmit}
      >
        ${this._renderHeader()}
        ${this._renderBody()}
        ${this._renderFooter()}
        ${this._submitting?E`
          <!-- 提交遮罩（ADR-0035 提交管理）：校验通过后覆盖全局（含区头/区尾），
               半透明底 + spinner，拦截指针交互天然防重复提交 -->
          <div class="submit-overlay">
            <span class="submit-spinner"></span>
            <span>正在提交...</span>
          </div>
        `:k}
        ${this._toast.text?E`
          <div class="toast ${this._toast.fading?`fading`:``}">${this._toast.text}</div>
        `:k}
        <!-- 离屏宽度探针：复用真实样式类测量文本自然宽，见 features/label-width.ts -->
        <div class="measure-probe" aria-hidden="true"></div>
      </form>
    `}};Q([F({type:String,attribute:`store-id`})],$.prototype,`storeId`,void 0),Q([F({type:Number,attribute:`expand-depth`})],$.prototype,`expandDepth`,void 0),Q([F({type:Boolean,attribute:`show-count`})],$.prototype,`showCount`,void 0),Q([F({type:Boolean,attribute:`show-hint`})],$.prototype,`showHint`,void 0),Q([F({type:Boolean,attribute:`show-computed`})],$.prototype,`showComputed`,void 0),Q([F({type:String,attribute:`mode`})],$.prototype,`mode`,void 0),Q([F({type:String,attribute:`render-mode`})],$.prototype,`renderMode`,void 0),Q([F({type:Boolean,attribute:`allow-delete`})],$.prototype,`allowDelete`,void 0),Q([F({type:String,attribute:`value-align`,reflect:!0})],$.prototype,`valueAlign`,void 0),Q([F({type:String,reflect:!0})],$.prototype,`grid`,void 0),Q([F({type:Boolean,attribute:`hide-key-bg`,reflect:!0})],$.prototype,`hideKeyBg`,void 0),Q([F({type:Boolean,attribute:`root-bg`,reflect:!0})],$.prototype,`rootBg`,void 0),Q([F({type:Boolean,attribute:`dark`,reflect:!0})],$.prototype,`dark`,void 0),Q([F({type:Boolean,attribute:`only-configurable`})],$.prototype,`onlyConfigurable`,void 0),Q([F({type:String,attribute:`entrys`})],$.prototype,`entrys`,void 0),Q([F({type:Number,attribute:`max-key-width`})],$.prototype,`maxKeyWidth`,void 0),Q([F({type:Boolean,attribute:`disable-schema`})],$.prototype,`disableSchema`,void 0),Q([F({type:String,attribute:`show-actions`,reflect:!0})],$.prototype,`showActions`,void 0),Q([F({type:String,attribute:`icon-url`})],$.prototype,`iconUrl`,void 0),Q([F({type:String,attribute:`icon-modify`})],$.prototype,`iconModify`,void 0),Q([F({attribute:`header`})],$.prototype,`header`,void 0),Q([F({attribute:`footer`})],$.prototype,`footer`,void 0),Q([F({type:String,attribute:`action`})],$.prototype,`action`,void 0),Q([F({type:String,attribute:`method`})],$.prototype,`method`,void 0),Q([I()],$.prototype,`_treeNodes`,void 0),Q([I()],$.prototype,`_entryInvalid`,void 0),Q([I()],$.prototype,`_configSections`,void 0),Q([I()],$.prototype,`_chromeSlots`,void 0),Q([I()],$.prototype,`_submitting`,void 0),$=Q([Fe(`autostore-viewer`)],$)})();