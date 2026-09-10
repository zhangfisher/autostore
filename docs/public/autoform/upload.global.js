if(typeof window.AutoFormCore==='undefined'){throw new Error('[autoform] AutoFormCore 未初始化：请先加载 core.global.js，再加载 widget 产物（见 ADR-0005 IIFE 双 script 用法）');}
var __core = window.AutoFormCore;
var __af_ns0 = __core.lit;
var __af_ns1 = __core.litDecorators;
var __af_ns2 = __core.litDirectivesClassMap;
var __af_ns3 = __core.litDirectivesIfDefined;
var __af_ns4 = __core.litDirectivesRepeat;
var __af_ns5 = __core.litDirectivesStyleMap;
var __af_ns6 = __core.litDirectivesUnsafeHTML;
var __af_ns7 = __core.litDirectivesWhen;
var __af_ns8 = __core.litContext;
var __af_ns9 = __core.Field;
var __af_ns10 = __core.FieldDropdown;
var __af_ns11 = __core.UtilsTag;
var __af_ns12 = __core.ControllersAsyncState;
var __af_ns13 = __core.Controllers;
var __af_ns14 = __core.UtilsRenderWidget;
var __af_ns15 = __core.UtilsGetInputValue;
var __af_ns16 = __core.FormVars;
var __af_ns17 = __core.AutoStoreNS;
"use strict";var AutoFormWidgets=AutoFormWidgets||{};AutoFormWidgets.Upload=(()=>{var K=Object.create;var v=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty;var u=(o,s)=>()=>(s||o((s={exports:{}}).exports,s),s.exports),ee=(o,s)=>{for(var e in s)v(o,e,{get:s[e],enumerable:!0})},_=(o,s,e,t)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of Q(s))!Z.call(o,r)&&r!==e&&v(o,r,{get:()=>s[r],enumerable:!(t=w(s,r))||t.enumerable});return o};var c=(o,s,e)=>(e=o!=null?K(Y(o)):{},_(s||!o||!o.__esModule?v(e,"default",{value:o,enumerable:!0}):e,o)),te=o=>_(v({},"__esModule",{value:!0}),o),y=(o,s,e,t)=>{for(var r=t>1?void 0:t?w(s,e):s,i=o.length-1,l;i>=0;i--)(l=o[i])&&(r=(t?l(s,e,r):l(r))||r);return t&&r&&v(s,e,r),r};var R=u((le,$)=>{$.exports=__af_ns13});var E=u((pe,U)=>{U.exports=__af_ns9});var I=u((de,k)=>{k.exports=__af_ns11});var T=u((ue,L)=>{L.exports=__af_ns0});var C=u((ce,D)=>{D.exports=__af_ns1});var M=u((he,j)=>{j.exports=__af_ns2});var O=u((fe,N)=>{N.exports=__af_ns3});var S=u((ge,P)=>{P.exports=__af_ns4});var A=u((ve,z)=>{z.exports=__af_ns5});var V=u((me,H)=>{H.exports=__af_ns7});var ne={};ee(ne,{AutoFieldUpload:()=>h});var q=c(R(),1),x=c(E(),1),W=c(I(),1),a=c(T(),1),J=c(C(),1),m=c(M(),1),X=c(O(),1),B=c(S(),1),G=c(A(),1),g=c(V(),1);var re=[".png",".jpg",".jpeg",".gif",".webp",".svg",".bmp",".ico",".apng",".avif"],oe=[".mp4",".webm",".ogg",".ogv",".mov",".avi",".wmv",".flv",".mkv",".m4v",".3gp",".mpeg",".mpg",".ts",".m2ts",".hevc",".rm",".rmvb",".vob",".asf"];function ie(o){if(!o||typeof o!="string")return!1;let t=o.split("?")[0].split("/").pop().split(".").pop();return re.includes(`.${t}`)}function se(o){if(!o||typeof o!="string")return!1;let t=o.split("?")[0].split("/").pop().split(".").pop();return oe.includes(`.${t}`)}var h=class extends x.AutoField{constructor(){super(...arguments);this.files=[];this.fileInputRef=null;this._imagePreview=new q.ImagePreview(this)}retryUpload(e){this.startUpload(e.file,e.id)}getInitialOptions(){return{fileTypes:[],url:"",multiple:!0,fileFieldName:"files",preview:!0,tips:"\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6\u4E0A\u4F20",onResolve:this._defaultFileResolver.bind(this),onFileLabel:this._getDefaultFileLabel.bind(this),selector:"auto",onlyFileUrl:!0}}_getDefaultFileLabel(e){return typeof e=="string"?e:e.title||e.url.split("/").slice(-1)[0]}_createUploadInput(){this.fileInputRef=document.createElement("input"),this.fileInputRef.type="file",this.fileInputRef.multiple=!!this.options?.multiple,this.options.fileTypes.length>0&&(this.fileInputRef.accept=this.options.fileTypes.filter(e=>e!=="*").join(",")),this.fileInputRef.style.display="none",this.fileInputRef.addEventListener("change",this.handleFileInputChange.bind(this)),this.renderRoot.appendChild(this.fileInputRef)}firstUpdated(){this._createUploadInput()}handleFileInputChange(e){let t=e.target;if(!t.files||t.files.length===0)return;Array.from(t.files).forEach(i=>this.uploadFile(i)),t.value=""}handleDragOver(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.add("dragover")}handleDragLeave(e){e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover")}handleDrop(e){if(e.preventDefault(),this.renderRoot.querySelector(".upload")?.classList.remove("dragover"),!e.dataTransfer?.files)return;let r=Array.from(e.dataTransfer.files);if(!this.options?.multiple&&r.length>1){alert("\u53EA\u80FD\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");return}if(this.options?.fileTypes&&this.options.fileTypes.length>0){let i=r.filter(l=>this.options?.fileTypes?!this.options.fileTypes.some(p=>p==="*"?!0:p.startsWith(".")?l.name.toLowerCase().endsWith(p.toLowerCase()):l.type.startsWith(p)):!1);if(i.length>0){alert(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${i.map(l=>l.name).join(", ")}`);return}}r.forEach(i=>this.uploadFile(i))}handleUploadClick(){this.fileInputRef?.click()}generateId(){return Math.random().toString(36).substring(2,9)}async uploadFile(e){if(!this.options?.url)throw new Error("Upload URL is not configured");this.options?.multiple||(this.files=[]);let t={id:this.generateId(),file:e,progress:0,status:"uploading",value:{url:e.name}};return this.files.push(t),this.startUpload(e,t.id)}_updateFileRecord(e,t){let r=this.files.findIndex(i=>i.id===e);r!==-1&&(this.files=[...this.files.slice(0,r),{...this.files[r],...t},...this.files.slice(r+1)])}_getResponseError(e){let t="\u4E0A\u4F20\u5931\u8D25";try{let r=JSON.parse(e.responseText);t=r.message||r.error||t}catch{switch(e.status){case 400:t="\u8BF7\u6C42\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u4E0A\u4F20\u53C2\u6570";break;case 401:t="\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55";break;case 403:t="\u65E0\u6743\u9650\u4E0A\u4F20\u6587\u4EF6";break;case 413:t="\u6587\u4EF6\u592A\u5927";break;case 415:t="\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B";break;case 500:t="\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;case 503:t="\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";break;default:t=`\u4E0A\u4F20\u5931\u8D25 (${e.status})`}}return new Error(t)}_defaultFileResolver(e){if(typeof e=="string")return e;if(typeof e=="object"){if(!e.url)throw new Error("\u4E0A\u4F20\u54CD\u5E94\u7F3A\u5C11\u5FC5\u8981\u7684url\u5B57\u6BB5");return e}}_parseUploadResponse(e){let t={};try{Object.assign(t,JSON.parse(e))}catch{t=e}return typeof this.options.onResolve=="function"&&(t=this.options.onResolve(t)),t}async startUpload(e,t){let r=this.files.findIndex(l=>l.id===t);if(r===-1)return;let i=this.files[r];return new Promise((l,p)=>{let d=new XMLHttpRequest,F=new FormData;F.append(this.options.fileFieldName,e),d.upload.onprogress=f=>{if(f.lengthComputable){let n=Math.round(f.loaded/f.total*100);this._updateFileRecord(t,{progress:n})}},d.onload=()=>{if(this.files.findIndex(n=>n.id===t)!==-1)if(d.status>=200&&d.status<300){this._updateFileRecord(t,{status:"done"});try{let n=this._parseUploadResponse(d.responseText);this._updateFileRecord(t,{value:n}),i.status="done",this.onFieldChange(),l()}catch{let n=new Error("\u89E3\u6790\u4E0A\u4F20\u54CD\u5E94\u5931\u8D25");this.handleUploadError(t,n),p(n)}}else{let n=this._getResponseError(d);this.handleUploadError(t,n),p(n)}},d.onerror=()=>{if(this.files.findIndex(b=>b.id===t)===-1)return;let n=new Error("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");this.handleUploadError(t,n),p(n)},d.ontimeout=()=>{if(this.files.findIndex(b=>b.id===t)===-1)return;let n=new Error("\u4E0A\u4F20\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");this.handleUploadError(t,n),p(n)},d.open("POST",this.options.url),this._updateFileRecord(t,{progress:0,status:"uploading"}),d.send(F)})}handleUploadError(e,t){this._updateFileRecord(e,{error:t.message,status:"error"})}deleteFile(e){let t=this.files.findIndex(p=>p.id===e);if(t===-1)return;let r=this.files[t],i=r.status==="uploading"||r.status==="error",l=()=>{this.files=[...this.files.slice(0,t),...this.files.slice(t+1)]};i?l():typeof this.options.onRemove=="function"?Promise.resolve(this.options.onRemove.call(this,r.value)).then(()=>{l(),this.onFieldChange()}).catch(p=>{alert(p.message)}):(l(),this.onFieldChange())}getInputValue(){if(this.options.multiple){let e=this.files.map(t=>t.value);return this.options.onlyFileUrl?e.map(t=>typeof t=="object"?t.url:t):e}else{let e=this.files.length>0?this.files[0].value:void 0;if(e)return this.options.onlyFileUrl&&typeof e=="object"?e.url:e}}getStateValue(){let e=super.getStateValue();return Array.isArray(e)||(e=[e]),this.files=e.map((t,r)=>{let i={id:String(r),file:void 0,progress:0,status:"done",error:void 0,value:void 0};return typeof t=="string"?i.value=t:typeof t=="object"&&(i.value=Object.assign({},i.value,t)),i}),e}renderProgressbar(e,t){if(e.status!=="uploading")return;let r=t==="hori"?`width:${e.progress}%;`:`height:${e.progress}%;top:${100-e.progress}%`;return a.html`<span
            class="uploading progressbar ${(0,m.classMap)({hori:t==="hori",vert:t==="vert"})}"
            style="${r}"
        >
            <span class="value">${e.progress}%</span>
        </span> `}renderFileContent(e){if(e.error)return;let t=typeof e.value=="string"?e.value:e.value.url,r;if(ie(t))r=a.html` <img class="content" src="${t}" /> `;else if(se(t))r=a.html` <video class="content" src="${t}"></video> `;else{let i=t.split("?")[0].split(".").slice(-1)[0];i=i.length===0?"FILE":`.${i.toUpperCase()}`,r=a.html`<div class="content">${i}</div>`}return r}renderFilePreview(e){let t=!!e.error,r=typeof this.options.preview=="boolean"?"80px":this.options.preview;return a.html`
            <div
                class="file preview ${(0,m.classMap)({error:t})}"
                title=${e.error||this.options.onFileLabel(e.value)}
                style="${(0,G.styleMap)({width:r,height:r})}"
            >
                ${this.renderFileContent(e)} ${this.renderProgressbar(e,"vert")}
                ${(0,g.when)(e.status==="error",()=>a.html`<div class="error" title="${e.error}">
                            <span>上传出错</span>
                            <span>
                                <sl-icon name="remove" title="取消上传" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                                <sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>
                            </span>
                        </div>`,()=>{if(!this.context.viewonly)return a.html`<sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>`})}
            </div>
        `}renderFile(e){let t=!!e.error;return a.html`
            <auto-flex class="file default ${(0,m.classMap)({error:t})}" wrap align="center" gap="0.5rem" title=${(0,X.ifDefined)(e.error)}>
                ${this.renderProgressbar(e,"hori")}
                <span class="label">${this.options.onFileLabel(e.value)}</span>
                <sl-icon name="remove" @click=${()=>this.deleteFile(e.id)}></sl-icon>
                ${(0,g.when)(e.status==="error",()=>a.html`<sl-icon name="refresh" title="重新上传" @click=${()=>this.retryUpload(e)}></sl-icon>`)}
            </auto-flex>
        `}renderFiels(){return a.html`<auto-flex class="files" grow="none" gap="0.5rem" wrap>
            ${(0,g.when)(this.files.length>0,()=>(0,B.repeat)(this.files,e=>this.options.preview?this.renderFilePreview(e):this.renderFile(e)),()=>a.html`<span class="placeholder">${this.options.placeholder||"\u6682\u65E0\u6587\u4EF6"}</span>`)}
        </auto-flex>`}renderInput(){return a.html`
            <auto-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${(0,g.when)(this.options.selector==="rectangle"||this.options.selector==="auto"&&this.options.multiple,()=>a.html`<div
                        class="indicator"
                        @click=${this.handleUploadClick}
                        @dragover=${this.handleDragOver}
                        @dragleave=${this.handleDragLeave}
                        @drop=${this.handleDrop}
                    >
                        ${this.options.tips}
                    </div>`)}
                <auto-flex class="actions" align="center" grow=".actions.after" gap="0.5rem">
                    ${(0,g.when)(this.options.selector==="button"||this.options.selector==="auto"&&!this.options.multiple,()=>a.html`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`)}
                    ${this.renderActions(!1)}
                </auto-flex>
            </auto-flex>
        `}renderView(){return this.renderFiels()}};h.styles=[x.AutoField.styles,a.css`
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
        `],y([(0,J.state)()],h.prototype,"files",2),h=y([(0,W.tag)("auto-field-upload")],h);return te(ne);})();
//# sourceMappingURL=upload.global.js.map
