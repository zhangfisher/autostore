"use strict";(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[1904],{37047:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(65192),K={}},80710:function(te,b,e){e.r(b),e.d(b,{demos:function(){return h}});var V=e(24325),l=e.n(V),K=e(29008),k=e.n(K),B=e(28633),_=e.n(B),D=e(70958),W=e.n(D),p=e(92379),M=e(63408),y=e(29355),C=e(3543),I=e(20927),h={"docs-exmaples-get-repos-demo-0":{component:p.memo(p.lazy(W()(k()().mark(function v(){var r,n,s,m,u,f,g,S,N,E,R,O,L,j,$;return k()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=F.sent,n=r.computed,s=r.createStore,F.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return m=F.sent,u=m.Input,f=m.Box,g=m.Button,F.next=13,Promise.resolve().then(e.bind(e,20927));case 13:return S=F.sent,N=S.api,E=s({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:n(function(){var Y=W()(k()().mark(function Z(H,Q){var q,X,se;return k()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=_()(H,1),X=q[0],se=Q.abortSignal,de.next=4,new Promise(function(Ie,he){se.addEventListener("abort",function(){he("cancelled")}),N.getProjects(X).then(function(Me){Ie(Me)}).catch(function(Me){he(Me)})});case 4:case"end":return de.stop()}},Z)}));return function(Z,H){return Y.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),R=E.state,O=E.bind,L=E.$,j=E.useState,$=E.useAsyncState,F.abrupt("return",{default:function(){var Z=j("user.repo"),H=_()(Z,1),Q=H[0],q=$("user.projects");return p.createElement("div",null,p.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),p.createElement(u,l()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:Q},O("user.repo"))),p.createElement(g,{onClick:function(){return R.user.projects.run()}},"\u91CD\u8BD5"),p.createElement(g,{onClick:function(){return R.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),p.createElement(f,null,p.createElement("table",{className:"projects-list"},p.createElement("thead",null,p.createElement("tr",null,p.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),p.createElement("td",null,p.createElement("b",null,"\u8BF4\u660E")),p.createElement("td",null,p.createElement("b",null,"\u661F")))),p.createElement("tbody",null,q.loading?p.createElement("tr",null,p.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):q.error?p.createElement("tr",null,p.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",q.error)):q.value&&q.value.map(function(X,se){return p.createElement("tr",{key:se},p.createElement("td",null,p.createElement("a",{href:X.url,target:"__blank"},X.name)),p.createElement("td",null,X.description),p.createElement("td",null,X.stars))})))))}});case 17:case"end":return F.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
import { Input,Box, Button,Loading,JsonView,RichLabel } from "x-react-components"
import { api } from "autostore-docs"
 
const {state,bind,$,useState,useAsyncState} = createStore({
  user:{
    repo:"https://api.github.com/users/zhangfisher/repos",
    projects:computed<Project[]>(async ([repoUrl],{abortSignal})=>{
        await new Promise((resolve,reject)=>{
          abortSignal.addEventListener("abort",()=>{
            reject("cancelled")
          })
          api.getProjects(repoUrl).then(projects=>{
            resolve(projects)
          }).catch(e=>{
            reject(e)
          })
        })        
     },
     ["./repo"],
     {
      scope:"depends" 
     })
  }
})

export default ()=>{
  const [ repo ] = useState("user.repo") 
  const projects = useAsyncState("user.projects") 
  return <div>
      <h3>\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868</h3>
      <Input label="\u4ED3\u5E93\u5730\u5740\uFF1A" value={repo} {...bind("user.repo")}/>
      <Button onClick={()=>state.user.projects.run()}>\u91CD\u8BD5</Button> 
      <Button onClick={()=>state.user.repo = "https://api.github.com/users/zhangfisher/repos"}>\u6062\u590D</Button>    
      <Box>
        <table className="projects-list">
            <thead><tr><td colSpan="3">\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01</td></tr>
            <tr><td><b>\u9879\u76EE\u540D\u79F0</b></td><td><b>\u8BF4\u660E</b></td><td><b>\u661F</b></td></tr></thead>                    
            <tbody>
            {
                projects.loading ? 
                (<tr><td colSpan={3}>\u6B63\u5728\u52A0\u8F7D...:</td></tr>)
                :
                (
                    projects.error? (<tr><td colSpan={2}>\u52A0\u8F7D\u9519\u8BEF:{projects.error}</td></tr>)
                    : (
                      projects.value && projects.value.map((project,index)=>{
                            return <tr key={index}>
                              <td><a href={project.url} target="__blank">{project.name}</a></td>
                              <td>{project.description}</td>
                              <td>{project.stars}</td>
                              </tr>
                        })
                    )
                )
            }
            </tbody>
        </table>
      </Box>
  </div>

}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C,"autostore-docs":I},renderOpts:{compile:function(){var v=W()(k()().mark(function n(){var s,m=arguments;return k()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(6484).then(e.bind(e,56484));case 2:return f.abrupt("return",(s=f.sent).default.apply(s,m));case 3:case"end":return f.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}}}},52838:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(88938),K={}},16545:function(te,b,e){e.r(b),e.d(b,{demos:function(){return I}});var V=e(24325),l=e.n(V),K=e(28633),k=e.n(K),B=e(29008),_=e.n(B),D=e(70958),W=e.n(D),p=e(92379),M=e(97085),y=e(29355),C=e(3543),I={"docs-guide-computed-async-demo-0":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R;return _()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=L.sent,r=v.delay,n=v.createStore,s=v.computed,L.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return m=L.sent,u=m.Input,f=m.ColorBlock,g=n({user:{firstName:"Zhang",lastName:"Fisher",fullName:s(function(){var j=W()(_()().mark(function $(w){return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,r(1e3);case 2:return Y.abrupt("return",w.firstName+" "+w.lastName);case 3:case"end":return Y.stop()}},$)}));return function($){return j.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),S=g.useAsyncState,N=g.useState,E=g.state,R=g.bind,L.abrupt("return",{default:function(){var $=N("user.firstName"),w=k()($,1),F=w[0],Y=N("user.lastName"),Z=k()(Y,1),H=Z[0],Q=S("user.fullName");return p.createElement(p.Fragment,null,p.createElement(u,l()({label:"firstName",value:F},R("user.firstName"))),p.createElement(u,l()({label:"lastName",value:H},R("user.lastName"))),p.createElement(f,{name:"FullName",loading:Q.loading},Q.value))}});case 13:case"end":return L.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
import { Input,ColorBlock } from "x-react-components"

const { useAsyncState,useState,state, bind } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      await delay(1000)       // \u6A21\u62DF\u5F02\u6B65\u8BA1\u7B97
      return user.firstName+' '+user.lastName  
    },["user.firstName","./lastName"],{ // \u6307\u5B9A\u4F9D\u8D56
      initial:"ZhangFisher"
    }) 
  }
},{
  id:"async-base", 
  debug:true // \u6253\u5F00Redux devtools
})

export default ()=>{ 
  const [firstName] = useState("user.firstName") 
  const [lastName] = useState("user.lastName") 
  const fullName = useAsyncState("user.fullName")  
  return <>
    <Input label="firstName" value={firstName} {...bind('user.firstName')} />
    <Input label="lastName" value={lastName} {...bind('user.lastName')} />
    <ColorBlock name="FullName" loading={fullName.loading}>{fullName.value}</ColorBlock>
    </>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-1":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g;return _()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=N.sent,r=v.useStore,n=v.computed,s=v.delay,N.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return m=N.sent,u=m.ColorBlock,f=m.Button,g=m.JsonView,N.abrupt("return",{default:function(){var R=r({firstName:"Zhang",lastName:"Fisher",fullName:n(function(){var w=W()(_()().mark(function F(Y){return _()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,s();case 2:if(!Y.triggerError){H.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return H.abrupt("return",Y.firstName+" "+Y.lastName);case 5:case"end":return H.stop()}},F)}));return function(F){return w.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),O=R.state,L=R.$,j=R.useAsyncState,$=j("fullName");return p.createElement("div",null,p.createElement(u,{name:"FirstName"},L("firstName")),p.createElement(u,{name:"FirstName"},L("lastName")),p.createElement(u,{name:"FullName",loading:$.loading},$.loading?"\u6B63\u5728\u8BA1\u7B97...":$.error?"ERROR:".concat($.error):$.value),p.createElement("div",null,p.createElement(f,{onClick:function(){O.triggerError=!1,O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName"),p.createElement(f,{onClick:function(){O.triggerError=!1,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName")),p.createElement("div",null,p.createElement(f,{onClick:function(){O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName with Error"),p.createElement(f,{onClick:function(){O.triggerError=!0,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),p.createElement("div",null,"state.fullName=",p.createElement(g,null,JSON.stringify($))))}});case 13:case"end":return N.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
import { ColorBlock,Button,JsonView } from "x-react-components"
 

export default ()=>{
  const {state,$,useAsyncState } =  useStore({
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: computed(async (user)=>{
        await delay() 
        // \u6A21\u62DF\u4EA7\u751F\u9519\u8BEF
        if(user.triggerError) throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519")
        return user.firstName+' '+user.lastName  
      },["firstName","lastName"]), 
      triggerError:false
  })

  const fullName = useAsyncState("fullName") 

  return (<div>
    <ColorBlock name="FirstName">{$("firstName")}</ColorBlock>
    <ColorBlock name="FirstName">{$("lastName")}</ColorBlock> 
    <ColorBlock name="FullName" loading={fullName.loading}>
    {
        fullName.loading ? '\u6B63\u5728\u8BA1\u7B97...' : (
          fullName.error ? \`ERROR:\${fullName.error}\`: 
            fullName.value
        )
    }
    </ColorBlock>      
    <div>
        <Button onClick={()=>{
          state.triggerError = false
          state.firstName=state.firstName+'\u{1F525}'
        }}>Change FirstName</Button>
        <Button onClick={()=>{
          state.triggerError = false
          state.lastName=state.lastName+'\u2764\uFE0F'
        }}>Change LastName</Button>
    </div>
    <div>
        <Button onClick={()=>{
          state.firstName=state.firstName+'\u{1F525}'
        }}>Change FirstName with Error</Button>
        <Button onClick={()=>{
          state.triggerError = true
          state.lastName=state.lastName+'\u2764\uFE0F'
        }}>Change LastName with Error</Button>
    </div>
    <div>
      state.fullName=
      <JsonView>{JSON.stringify(fullName)}</JsonView>
    </div>
  </div>
  )
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-2":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R,O,L,j,$;return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=F.sent,r=v.delay,n=v.createStore,s=v.computed,m=v.ObserverScopeRef,F.next=9,Promise.resolve().then(e.bind(e,3543));case 9:return u=F.sent,f=u.JsonView,g=u.Button,S=u.Input,N=u.Loading,E=n({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:s(function(){var Y=W()(_()().mark(function Z(H,Q){var q,X,se,ue,de;return _()().wrap(function(he){for(;;)switch(he.prev=he.next){case 0:return q=k()(H,2),X=q[0],se=q[1],ue=Q.getProgressbar,de=ue(),he.abrupt("return",new Promise(function(){var Me=W()(_()().mark(function Fe(Ge){var $e;return _()().wrap(function(Le){for(;;)switch(Le.prev=Le.next){case 0:$e=1;case 1:if(!($e<=100)){Le.next=8;break}return Le.next=4,r(20);case 4:de.value($e);case 5:$e++,Le.next=1;break;case 8:de.end(),Ge(X*se);case 10:case"end":return Le.stop()}},Fe)}));return function(Fe){return Me.apply(this,arguments)}}()));case 4:case"end":return he.stop()}},Z)}));return function(Z,H){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:m.Depends})}}),R=E.useState,O=E.state,L=E.$,j=E.bind,$=E.useAsyncState,F.abrupt("return",{default:function(){var Z=R("order.count"),H=k()(Z,1),Q=H[0],q=$("order.total");return p.createElement("div",null,p.createElement("table",{className:"table table-bordered table-striped"},p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4E66\u540D")),p.createElement("td",null,O.order.bookName)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4EF7\u683C")),p.createElement("td",null,O.order.price)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u6570\u91CF")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},p.createElement(g,{onClick:function(){return O.order.count--}},"-"),p.createElement(S,l()({value:Q},j("order.count"))),p.createElement(g,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),p.createElement("tfoot",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u603B\u4EF7")),p.createElement("td",null,q.loading?p.createElement(N,null):null,q.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(q.progress,"%"):q.error?"ERROR:".concat(q.error):q.value)))),p.createElement("div",null,p.createElement(f,null,JSON.stringify(O.order.total))))}});case 16:case"end":return F.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
import { JsonView,Button,Input,Loading } from "x-react-components"

 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price],{getProgressbar})=>{
      const progressbar = getProgressbar()
      return new Promise(async (resolve)=>{
        for(let i=1;i<=100;i++){
          await delay(20)
          progressbar.value(i)
        }
        progressbar.end()
        resolve(count*price)
      }) 
    },
    ["order.count","order.price"],
    {scope:ObserverScopeRef.Depends}) 
  }
}  )

export default ()=>{
  const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>\u4E66\u540D</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>\u4EF7\u683C</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>\u6570\u91CF</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          \u8C03\u8282\u6570\u91CF
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>\u603B\u4EF7</b></td><td>
          {total.loading ? <Loading/> : null }
         {
        total.loading ? \`\u6B63\u5728\u8BA1\u7B97......\${total.progress}%\`  
        : (
          total.error ? \`ERROR:\${total.error}\`: total.value
        )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-3":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R,O,L,j,$,w;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=Y.sent,r=v.createStore,n=v.computed,s=v.ObserverScopeRef,m=v.delay,Y.next=9,Promise.resolve().then(e.bind(e,3543));case 9:return u=Y.sent,f=u.Input,g=u.Button,S=u.Loading,N=u.JsonView,E=u.RichLabel,R=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Z=W()(_()().mark(function H(Q){var q,X,se;return _()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=k()(Q,2),X=q[0],se=q[1],de.next=3,m(5e3);case 3:return de.abrupt("return",X*se);case 4:case"end":return de.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:s.Depends})}}),O=R.useState,L=R.state,j=R.$,$=R.bind,w=R.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=k()(H,1),q=Q[0],X=w("order.total");return p.createElement("div",null,p.createElement("table",{className:"table table-bordered table-striped"},p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4E66\u540D")),p.createElement("td",null,L.order.bookName)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4EF7\u683C")),p.createElement("td",null,L.order.price)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u6570\u91CF")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},p.createElement(g,{onClick:function(){return L.order.count--}},"-"),p.createElement(f,l()({value:q},$("order.count"))),p.createElement(g,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),p.createElement("tfoot",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u603B\u4EF7")),p.createElement("td",null,X.loading?p.createElement(S,null):null,X.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(X.timeout,"ms"):X.error?p.createElement(E,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),p.createElement("div",null,p.createElement(N,null,JSON.stringify(L.order.total))))}});case 17:case"end":return Y.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{
        await delay(5000)    // \u6A21\u62DF\u957F\u65F6\u95F4\u8BA1\u7B97
        return count*price
    },
    ["order.count","order.price"], // \u6307\u5B9A\u4F9D\u8D56
    {
      timeout:1000 ,   // \u6307\u5B9A\u8D85\u65F6\u65F6\u95F4\u4E3A1\u79D2
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>\u4E66\u540D</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>\u4EF7\u683C</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>\u6570\u91CF</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          \u8C03\u8282\u6570\u91CF
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>\u603B\u4EF7</b></td><td>
          {total.loading ? <Loading/> : null }
         {
        total.loading ? \`\u6B63\u5728\u8BA1\u7B97......\${total.timeout}ms\`  
        : (
          total.error ? <RichLabel text={\`ERROR: {\${total.error}}\`} color="red"/> : null
        )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-4":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R,O,L,j,$,w;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=Y.sent,r=v.createStore,n=v.computed,s=v.ObserverScopeRef,m=v.delay,Y.next=9,Promise.resolve().then(e.bind(e,3543));case 9:return u=Y.sent,f=u.Input,g=u.Button,S=u.Loading,N=u.JsonView,E=u.RichLabel,R=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Z=W()(_()().mark(function H(Q){var q,X,se;return _()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=k()(Q,2),X=q[0],se=q[1],de.next=3,m(6e3);case 3:return de.abrupt("return",X*se);case 4:case"end":return de.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:s.Depends})}}),O=R.useState,L=R.state,j=R.$,$=R.bind,w=R.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=k()(H,1),q=Q[0],X=w("order.total");return p.createElement("div",null,p.createElement("table",{className:"table table-bordered table-striped"},p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4E66\u540D")),p.createElement("td",null,L.order.bookName)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4EF7\u683C")),p.createElement("td",null,L.order.price)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u6570\u91CF")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},p.createElement(g,{onClick:function(){return L.order.count--}},"-"),p.createElement(f,l()({value:q},$("order.count"))),p.createElement(g,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),p.createElement("tfoot",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u603B\u4EF7")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?p.createElement(S,null):null,X.loading?p.createElement(E,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(X.timeout,"}\u79D2"),color:"red"}):X.error?p.createElement(E,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),p.createElement("div",null,p.createElement(N,null,JSON.stringify(L.order.total))))}});case 17:case"end":return Y.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{
        await delay(6000)    // \u6A21\u62DF\u957F\u65F6\u95F4\u8BA1\u7B97
        return count*price
    },
    ["order.count","order.price"], // \u6307\u5B9A\u4F9D\u8D56
    {
      timeout:[5*1000,5] ,   // \u6307\u5B9A\u8D85\u65F6\u65F6\u95F4\u4E3A5\u79D2\uFF0C\u6BCF\u79D2\u66F4\u65B0\u4E00\u6B21
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>\u4E66\u540D</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>\u4EF7\u683C</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>\u6570\u91CF</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          \u8C03\u8282\u6570\u91CF
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>\u603B\u4EF7</b></td>
        <td style={{display:"flex",alignItems:'center'}}>
          {total.loading ? <Loading/> : null }
         {
          total.loading ? <RichLabel text={\`\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{\${total.timeout}}\u79D2\`} color="red"/> 
          : (
            total.error ? <RichLabel text={\`ERROR: {\${total.error}}\`} color="red"/> : null
          )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-5":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R,O,L,j,$,w;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=Y.sent,r=v.createStore,n=v.computed,s=v.ObserverScopeRef,m=v.delay,Y.next=9,Promise.resolve().then(e.bind(e,3543));case 9:return u=Y.sent,f=u.Input,g=u.Button,S=u.Loading,N=u.JsonView,E=u.RichLabel,R=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Z=W()(_()().mark(function H(Q){var q,X,se;return _()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=k()(Q,2),X=q[0],se=q[1],de.next=3,m();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return de.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:s.Depends})}}),O=R.useState,L=R.state,j=R.$,$=R.bind,w=R.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=k()(H,1),q=Q[0],X=w("order.total");return p.createElement("div",null,p.createElement("table",{className:"table table-bordered table-striped"},p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4E66\u540D")),p.createElement("td",null,L.order.bookName)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4EF7\u683C")),p.createElement("td",null,L.order.price)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u6570\u91CF")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},p.createElement(g,{onClick:function(){return L.order.count--}},"-"),p.createElement(f,l()({value:q},$("order.count"))),p.createElement(g,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),p.createElement("tfoot",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u603B\u4EF7")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?p.createElement(S,null):null,X.loading?p.createElement(E,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):X.error&&p.createElement(E,{text:"\u51FA\u9519: {".concat(X.error,"}"),color:"red"}),X.retry>0&&p.createElement(E,{text:"\u91CD\u8BD5: {".concat(X.retry,"}"),color:"red"}))))),p.createElement("div",null,p.createElement(N,null,JSON.stringify(L.order.total))))}});case 17:case"end":return Y.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{        
        await delay()
        throw new Error("\u8BA1\u7B97\u51FA\u9519")
    },
    ["order.count","order.price"], // \u6307\u5B9A\u4F9D\u8D56
    {
       retry:[5,1000] ,// \u91CD\u8BD55\u6B21\uFF0C\u6BCF\u6B21\u95F4\u96941\u79D2
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>\u4E66\u540D</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>\u4EF7\u683C</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>\u6570\u91CF</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          \u8C03\u8282\u6570\u91CF
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>\u603B\u4EF7</b></td>
        <td style={{display:"flex",alignItems:'center'}}>
          {total.loading ? <Loading/> : null }
         {
          total.loading ? <RichLabel text={\`\u6B63\u5728\u8BA1\u7B97......\`} color="red"/> 
          : (
            total.error && <RichLabel text={\`\u51FA\u9519: {\${total.error}}\`} color="red"/> 
          )}
          {total.retry >0 && <RichLabel text={\`\u91CD\u8BD5: {\${total.retry}}\`} color="red"/> }
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-6":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R,O,L,j,$;return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=F.sent,r=v.createStore,n=v.computed,s=v.ObserverScopeRef,F.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return m=F.sent,u=m.Input,f=m.Button,g=m.Loading,S=m.JsonView,N=m.RichLabel,E=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Y=W()(_()().mark(function Z(H,Q){var q,X,se,ue;return _()().wrap(function(Ie){for(;;)switch(Ie.prev=Ie.next){case 0:return q=k()(H,2),X=q[0],se=q[1],ue=Q.abortSignal,Ie.abrupt("return",new Promise(function(he,Me){var Fe=setTimeout(function(){he(X*se)},1e6);ue.addEventListener("abort",function(){clearTimeout(Fe),Me("cancelled")})}));case 3:case"end":return Ie.stop()}},Z)}));return function(Z,H){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:s.Depends})}}),R=E.useState,O=E.state,L=E.$,j=E.bind,$=E.useAsyncState,F.abrupt("return",{default:function(){var Z=R("order.count"),H=k()(Z,1),Q=H[0],q=$("order.total");return p.createElement("div",null,p.createElement("table",{className:"table table-bordered table-striped"},p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4E66\u540D")),p.createElement("td",null,O.order.bookName)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u4EF7\u683C")),p.createElement("td",null,O.order.price)),p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u6570\u91CF")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},p.createElement(f,{onClick:function(){return O.order.count--}},"-"),p.createElement(u,l()({value:Q},j("order.count"))),p.createElement(f,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),p.createElement("tfoot",null,p.createElement("tr",null,p.createElement("td",null,p.createElement("b",null,"\u603B\u4EF7")),p.createElement("td",{style:{display:"flex",alignItems:"center"}},q.loading?p.createElement(g,null):null,q.loading?p.createElement(N,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):q.error&&p.createElement(N,{text:"\u51FA\u9519: {".concat(q.error,"}"),color:"red"}),q.loading&&p.createElement(f,{onClick:function(){return q.cancel()}},"\u53D6\u6D88"))))),p.createElement("div",null,p.createElement(S,null,JSON.stringify(O.order.total))))}});case 16:case"end":return F.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price],{abortSignal})=>{        
        return new Promise<number>((resolve,reject)=>{
					const tmId = setTimeout(()=>{
						resolve(count*price)  // \u6A21\u62DF\u8017\u65F6\u5E72\u6D3B
					},1000 *1000)
					abortSignal.addEventListener("abort",()=>{
            clearTimeout(tmId)
						reject("cancelled")
					})
				})	
    },
    ["order.count","order.price"], // \u6307\u5B9A\u4F9D\u8D56
    {
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>\u4E66\u540D</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>\u4EF7\u683C</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>\u6570\u91CF</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button onClick={()=>state.order.count++}>+</Button>
          \u8C03\u8282\u6570\u91CF
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>\u603B\u4EF7</b></td>
        <td style={{display:"flex",alignItems:'center'}}>
          {total.loading ? <Loading/> : null }
         {
          total.loading ? <RichLabel text={\`\u6B63\u5728\u8BA1\u7B97......\`} color="red"/> 
          : (
            total.error && <RichLabel text={\`\u51FA\u9519: {\${total.error}}\`} color="red"/> 
          )}
          { total.loading && <Button onClick={()=>total.cancel()}>\u53D6\u6D88</Button>}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-7":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g;return _()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=N.sent,r=v.createStore,N.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return n=N.sent,s=n.ColorBlock,m=n.Button,u=r({bookName:"ZhangFisher",price:100,count:3,total:function(){var E=W()(_()().mark(function O(L){return _()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",L.price*L.count);case 1:case"end":return $.stop()}},O)}));function R(O){return E.apply(this,arguments)}return R}()}),f=u.state,g=u.$,N.abrupt("return",{default:function(){return p.createElement("div",null,p.createElement(s,{name:"\u4E66\u540D"},g("bookName")),p.createElement(s,{name:"\u4EF7\u683C"},g("price")),p.createElement(s,{name:"\u6570\u91CF"},p.createElement(m,{onClick:function(){return f.count--}},"-"),g("count"),p.createElement(m,{onClick:function(){return f.count++}},"+")),p.createElement(s,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},g("total.value",{errorBoundary:function(O){var L=O.error;return p.createElement(p.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",L.message)}})),p.createElement(s,{name:"state.total"},String(f.total)))}});case 11:case"end":return N.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
import { ColorBlock,Input, Button,Loading,JsonView,RichLabel } from "x-react-components"

const { state,$ } = createStore({
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
}   
)

export default ()=>{
  return (<div>
    <ColorBlock name="\u4E66\u540D">{$('bookName')}</ColorBlock>
    <ColorBlock name="\u4EF7\u683C">{$('price')}</ColorBlock>
    <ColorBlock name="\u6570\u91CF">
      <Button onClick={()=>state.count--}>-</Button>
      {$('count')}
      <Button onClick={()=>state.count++}>+</Button>
    </ColorBlock>
    <ColorBlock name="\u603B\u4EF7" comment='\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97'>{$('total.value',{
      errorBoundary:(({error})=><>\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A{error.message}</>)
    })}</ColorBlock>
    <ColorBlock name="state.total">{String(state.total)}</ColorBlock>
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},57770:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),K=e(28633),k=e.n(K),B=e(70958),_=e.n(B),D=e(92379),W=e(91376),p=e(29355),M=e(3543),y={"docs-guide-computed-create-demo-0":{component:D.memo(D.lazy(_()(l()().mark(function C(){var I,h,v,r,n,s,m;return l()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=f.sent,h=I.createStore,v=I.computed,f.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return r=f.sent,n=r.ColorBlock,s=r.Button,m=h({order:{price:100,count:3,total1:function(S){return S.price*S.count},total2:v(function(g){return g.price*g.count})}}),f.abrupt("return",{default:function(){var S=m.useState(),N=k()(S,2),E=N[0],R=N[1];return D.createElement("div",null,D.createElement(n,{name:"Price"},E.order.price),D.createElement(n,{name:"Count"},E.order.count),D.createElement(n,{name:"Total 1"},E.order.total1),D.createElement(n,{name:"Total 2"},E.order.total2),D.createElement(s,{onClick:function(){return R(function(L){return L.order.count++})}},"Count++"))}});case 12:case"end":return f.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
import { ColorBlock,Button } from "x-react-components";

const store = createStore({
  order:{
    price:100,
    count:3,
    // 1. \u5FEB\u901F\u521B\u5EFA\uFF0C\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56
    total1:(order)=>order.price * order.count,
    // 2. \u4F7F\u7528computed\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027,\u5E76\u6307\u5B9A\u521B\u5EFA
    total2:computed((order)=>order.price * order.count),
  }
})

export default ()=>{
  const [state,setState] = store.useState()
  return <div> 
    <ColorBlock name="Price">{state.order.price}</ColorBlock>
    <ColorBlock name="Count">{state.order.count}</ColorBlock>
    <ColorBlock name="Total 1">{state.order.total1}</ColorBlock>
    <ColorBlock name="Total 2">{state.order.total2}</ColorBlock>
    <Button onClick={()=>setState((state)=>state.order.count++)}>Count++</Button>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}}}},87962:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(27952),K={}},93458:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(87537),D=e(29355),W=e(3543),p={"docs-guide-computed-getter-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s,m,u,f;return l()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=S.sent,C=y.createStore,I=y.computed,h=y.delay,S.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return v=S.sent,r=v.ColorBlock,n=v.Button,s=C({order:{price:100,count:3,total:I(function(){var N=k()(l()().mark(function E(R){return l()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,h(1e3);case 2:return L.abrupt("return",R.price*R.count);case 3:case"end":return L.stop()}},E)}));return function(E){return N.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),m=s.state,u=s.$,f=s.computedObjects,S.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",f.get("total")),B.createElement("div",null,B.createElement(r,{name:"price"},u("order.price")),B.createElement(r,{name:"count"},u("order.count")),B.createElement(r,{name:"Total"},u(function(E){var R=E.value,O=E.loading;return B.createElement("div",null,O?"\u8BA1\u7B97\u4E2D...":R+1e3)},"order.total")),B.createElement(n,{onClick:function(){return m.order.count++}},"Count++"),B.createElement(n,{onClick:function(){return f.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return S.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
import { ColorBlock,Button } from "x-react-components";

const { state , $, computedObjects } = createStore({
  order:{
    price:100,
    count:3,
    total:computed(async (order)=>{
      await delay(1000)
      return order.price * order.count
    },['./price','./count']
    ,{id:"total"})
  }
})

export default ()=>{ 
  console.log("computedObjects.get('total')=",computedObjects.get('total'))
  return <div>
      <ColorBlock name="price">{$('order.price')}</ColorBlock>
      <ColorBlock name="count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$(({value,loading})=>{
        return <div>
          {loading ? "\u8BA1\u7B97\u4E2D..." : value+1000 }
        </div>
      },"order.total")}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
      <Button onClick={()=>computedObjects.get('total').run()}>\u624B\u52A8\u6267\u884C</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},77642:function(te,b,e){e.r(b),e.d(b,{demos:function(){return v}});var V=e(12027),l=e.n(V),K=e(34180),k=e.n(K),B=e(28633),_=e.n(B),D=e(29008),W=e.n(D),p=e(70958),M=e.n(p),y=e(92379),C=e(78116),I=e(29355),h=e(3543),v={"docs-guide-computed-objects-demo-0":{component:y.memo(y.lazy(M()(W()().mark(function r(){var n,s,m,u,f,g,S,N,E;return W()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=O.sent,s=n.createStore,m=n.computed,O.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return u=O.sent,f=u.Divider,g=u.ColorBlock,S=u.Button,N=0,E=s({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(j){return j.firstName+j.lastName+"".concat(++N)},fullName2:m(function(){var L=M()(W()().mark(function j($){return W()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.abrupt("return",$.firstName+$.lastName+"".concat(++N));case 1:case"end":return F.stop()}},j)}));return function(j){return L.apply(this,arguments)}}(),["./firstName","./lastName"])}}),O.abrupt("return",{default:function(){var j=E.useState(),$=_()(j,1),w=$[0];return y.createElement("div",null,y.createElement(g,{name:"FirstName"},w.user.firstName),y.createElement(g,{name:"lastName"},w.user.lastName),y.createElement(g,{name:"FullName",value:w.user.fullName}),y.createElement(g,{name:"FullName2",value:w.user.fullName2.value}),y.createElement(f,null),y.createElement("div",null,"typeof(store.computedObjects)==",k()(E.computedObjects)),y.createElement("div",null,"store.computedObjects instanceof Map=",String(E.computedObjects instanceof Map)),y.createElement("div",null,"store.computedObjects.size=",E.computedObjects.size),y.createElement("div",null,"store.computedObjects.size=",E.computedObjects.size),y.createElement("div",null,"store.computedObjects.keys()=",l()(E.computedObjects.keys()).join(" , ")),y.createElement(S,{onClick:function(){return E.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),y.createElement(S,{onClick:function(){return E.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),y.createElement(S,{onClick:function(){return E.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return O.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
import { Divider,ColorBlock,Button } from "x-react-components"

let count=0
const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName + \`\${++count}\`
    },
    fullName2: computed(async (user)=>{
      return user.firstName+user.lastName  + \`\${++count}\`
    },["./firstName","./lastName"]) 
  }
} )

export default ()=>{
  const [state] = store.useState()

  return (<div>
    <ColorBlock name="FirstName">{state.user.firstName}</ColorBlock>
    <ColorBlock name="lastName">{state.user.lastName}</ColorBlock>
    <ColorBlock name="FullName"  value={state.user.fullName}/>
    <ColorBlock name="FullName2"  value={state.user.fullName2.value}/>
    <Divider/>
    <div>typeof(store.computedObjects)=={typeof(store.computedObjects)}</div>
    <div>store.computedObjects instanceof Map={String(store.computedObjects instanceof Map)}</div>
    <div>store.computedObjects.size={store.computedObjects.size}</div>
    <div>store.computedObjects.size={store.computedObjects.size}</div>
    <div>store.computedObjects.keys()={[...store.computedObjects.keys()].join(" , ")}</div>
    <Button onClick={()=>store.computedObjects.get("user.fullName").run()}>\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570</Button>
    <Button onClick={()=>store.computedObjects.get("user.fullName2").run()}>\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570</Button>
    <Button onClick={()=>store.state.user.fullName2.run()}>\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570</Button>
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":I,"x-react-components":h},renderOpts:{compile:function(){var r=M()(W()().mark(function s(){var m,u=arguments;return W()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(m=g.sent).default.apply(m,u));case 3:case"end":return g.stop()}},s)}));function n(){return r.apply(this,arguments)}return n}()}}}},65972:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(40471),K={}},35694:function(te,b,e){e.r(b),e.d(b,{demos:function(){return I}});var V=e(24325),l=e.n(V),K=e(28633),k=e.n(K),B=e(29008),_=e.n(B),D=e(70958),W=e.n(D),p=e(92379),M=e(71413),y=e(29355),C=e(3543),I={"docs-guide-computed-run-demo-0":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E;return _()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.createStore,n=v.computed,s=v.delay,O.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return m=O.sent,u=m.Divider,f=m.ColorBlock,g=m.Button,S=0,N={book:{name:"Zhang",count:4,price:100,total1:n(function(){var L=W()(_()().mark(function j($){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,s();case 2:return F.abrupt("return",$.count*$.price);case 3:case"end":return F.stop()}},j)}));return function(j){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:n(function(){var L=W()(_()().mark(function j($){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,s();case 2:return F.abrupt("return",$.count*$.price);case 3:case"end":return F.stop()}},j)}));return function(j){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:n(function(){var L=W()(_()().mark(function j($){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,s();case 2:return F.abrupt("return",$.count*$.price);case 3:case"end":return F.stop()}},j)}));return function(j){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:n(function(){var L=W()(_()().mark(function j($){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,s();case 2:return F.abrupt("return",$.price/$.count);case 3:case"end":return F.stop()}},j)}));return function(j){return L.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:n(function(){var L=W()(_()().mark(function j($){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,s();case 2:return F.abrupt("return",$.price/$.count);case 3:case"end":return F.stop()}},j)}));return function(j){return L.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:n(function(){var L=W()(_()().mark(function j($){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,s();case 2:return F.abrupt("return",$.price/$.count);case 3:case"end":return F.stop()}},j)}));return function(j){return L.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},E=r(N),O.abrupt("return",{default:function(){var j=E.useState(),$=k()(j,1),w=$[0];return p.createElement("div",null,p.createElement(u,{title:"Total Group"}),p.createElement(f,{name:"Total1",loading:w.book.total1.loading},w.book.total1.loading?"\u8BA1\u7B97\u4E2D...":w.book.total1.value),p.createElement(f,{name:"Total2",loading:w.book.total2.loading},w.book.total2.loading?"\u8BA1\u7B97\u4E2D...":w.book.total2.value),p.createElement(f,{name:"Total3",loading:w.book.total3.loading},w.book.total3.loading?"\u8BA1\u7B97\u4E2D...":w.book.total3.value),p.createElement(g,{onClick:function(){return E.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),p.createElement(u,{title:"Average Group"}),p.createElement(f,{name:"Average1",loading:w.book.average1.loading}," ",w.book.average1.loading?"\u8BA1\u7B97\u4E2D...":w.book.average1.value),p.createElement(f,{name:"Average2",loading:w.book.average2.loading}," ",w.book.average2.loading?"\u8BA1\u7B97\u4E2D...":w.book.average2.value),p.createElement(f,{name:"Average3",loading:w.book.average3.loading}," ",w.book.average3.loading?"\u8BA1\u7B97\u4E2D...":w.book.average3.value),p.createElement(g,{onClick:function(){return E.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Input } from "x-react-components" 

let count=0
const state = {
  book:{
    name:"Zhang",
    count:4,
    price: 100,
    total1: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    total2: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    total3: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    average1: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}),
    average2: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}),
    average3: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}) 
  }
} 

const store = createStore(state)

export default ()=>{
  const [state] = store.useState()

  return (<div> 
    <Divider title="Total Group"/>
    <ColorBlock name="Total1" 
      loading={state.book.total1.loading}>{state.book.total1.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total1.value}
    </ColorBlock> 
    <ColorBlock name="Total2" 
      loading={state.book.total2.loading}>{state.book.total2.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total2.value}
    </ColorBlock> 
    <ColorBlock name="Total3" 
      loading={state.book.total3.loading}>{state.book.total3.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total3.value}
    </ColorBlock> 
    <Button onClick={()=>store.computedObjects.runGroup("total")}>\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570</Button> 
    <Divider title="Average Group"/>
    <ColorBlock name="Average1" loading={state.book.average1.loading } > {state.book.average1.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average1.value}</ColorBlock> 
    <ColorBlock name="Average2" loading={state.book.average2.loading } > {state.book.average2.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average2.value}</ColorBlock> 
    <ColorBlock name="Average3" loading={state.book.average3.loading } > {state.book.average3.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average3.value}</ColorBlock> 
    <Button onClick={()=>store.computedObjects.runGroup("average")}>\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570</Button> 
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-run-demo-1":{component:p.memo(p.lazy(W()(_()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R,O,L,j;return _()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=w.sent,r=v.createStore,n=v.computed,s=v.delay,w.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return m=w.sent,u=m.Divider,f=m.ColorBlock,g=m.Button,S=m.Input,N=0,E={book:{name:"Zhang",count:4,price:100,total1:n(function(){var F=W()(_()().mark(function Y(Z){return _()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,s();case 2:return Q.abrupt("return",Z.count*Z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return F.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:n(function(){var F=W()(_()().mark(function Y(Z){return _()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,s();case 2:return Q.abrupt("return",Z.count*Z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return F.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:n(function(){var F=W()(_()().mark(function Y(Z){return _()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,s();case 2:return Q.abrupt("return",Z.count*Z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return F.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},R=r(E),O=R.useState,L=R.computedObjects,j=R.bind,w.abrupt("return",{default:function(){var Y=O(),Z=k()(Y,1),H=Z[0];return p.createElement("div",null,p.createElement(f,{name:"BookName"},H.book.name),p.createElement(f,{name:"count"},p.createElement("div",{style:{display:"flex",alignItems:"center"}},p.createElement(g,{onClick:function(){return H.book.count--}},"-"),p.createElement(S,l()({value:H.book.count},j("book.count"))),p.createElement(g,{onClick:function(){return H.book.count++}},"+"))),p.createElement(f,{name:"price"}," ",p.createElement(S,l()({value:H.book.price},j("book.price")))),p.createElement(u,{title:"Total Group"}),p.createElement("table",{className:"table table-bordered"},p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",null,"Total1 ="),p.createElement("td",null,H.book.total1.loading?"\u8BA1\u7B97\u4E2D...":H.book.total1.value),p.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),p.createElement("tr",null,p.createElement("td",null,"Total2 ="),p.createElement("td",null,H.book.total2.loading?"\u8BA1\u7B97\u4E2D...":H.book.total2.value),p.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",p.createElement("input",{type:"checkbox",checked:L.get("book/total2")}),")")),p.createElement("tr",null,p.createElement("td",null,"Total3 ="),p.createElement("td",null,H.book.total3.loading?"\u8BA1\u7B97\u4E2D...":H.book.total3.value),p.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),p.createElement(g,{onClick:function(){return L.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return w.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Input } from "x-react-components"

let count=0
const state = {
  book:{
    name:"Zhang",
    count:4,
    price: 100,
    total1: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },['book.count','book.price'],{async:true,group:"total"}),
    total2: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },['book.count','book.price'],{async:true,group:"total",initial:100,enable:false}),
    total3: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"})
  }
} 

const {useState,computedObjects,bind } = createStore(state)

export default ()=>{
  const [state] = useState()
  
  return (<div> 
    <ColorBlock name="BookName">{state.book.name}</ColorBlock>
    <ColorBlock name="count">
      <div style={{display:"flex",alignItems:"center"}}>
        <Button onClick={()=>state.book.count--}>-</Button>
        <Input value={state.book.count} {...bind("book.count")}/>
        <Button onClick={()=>state.book.count++}>+</Button>
      </div>
    </ColorBlock>
    <ColorBlock name="price"> <Input value={state.book.price} {...bind("book.price")}/></ColorBlock>
    <Divider title="Total Group"/>
    <table className="table table-bordered">
      <tbody>
        <tr>
          <td>Total1 =</td>
          <td>{state.book.total1.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total1.value}</td>
          <td>\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97</td>
        </tr>
        <tr>
          <td>Total2 =</td>
          <td>{state.book.total2.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total2.value}</td>
          <td>\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(<input type="checkbox" checked={computedObjects.get("book/total2")}/>)</td>
        </tr>        
        <tr>
          <td>Total3 =</td>
          <td>{state.book.total3.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total3.value}</td>
          <td>\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97</td>
        </tr>
      </tbody>
    </table> 
    <Button onClick={()=>computedObjects.runGroup("total")}>\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570</Button> 
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(_()().mark(function r(){var n,s=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},68177:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(56424),D=e(29355),W=e(3543),p={"docs-guide-computed-scope-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.ObserverScopeRef,I=y.useStore,n.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return h=n.sent,v=h.ColorBlock,n.abrupt("return",{default:function(){var m=I({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}},{scope:function(){return C.Current}}),u=m.state;return B.createElement("div",null,B.createElement(v,{name:"FullName"},u.user.fullName))}});case 10:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components" 

export default ()=>{

  const { state } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){
        // scope\u6307\u5411user\u5BF9\u8C61  
        return scope.firstName+scope.lastName 
      }
    }},{
    // \u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u4E0A\u4E0B\u6587\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u6709\u7684\u5F53\u524D\u5BF9\u8C61
    scope: ()=>ObserverScopeRef.Current
  })
  return <div> 
    <ColorBlock name="FullName">{state.user.fullName}</ColorBlock>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-1":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,I=y.ObserverScopeRef,n.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return h=n.sent,v=h.ColorBlock,n.abrupt("return",{default:function(){var m=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.user.firstName+g.user.lastName}}},{scope:I.Root}),u=m.state;return B.createElement("div",null,B.createElement(v,{name:"FullName"},u.user.fullName))}});case 10:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components" 

export default ()=>{
  
  const { state } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){ 
        // scope\u6307\u5411root\u5BF9\u8C61  
        return scope.user.firstName+scope.user.lastName 
      }
    }},{
    scope: ObserverScopeRef.Root
  })
  return <div> 
    <ColorBlock name='FullName'>{state.user.fullName}</ColorBlock>
  </div> 
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-2":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n;return l()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=m.sent,C=y.createStore,I=y.ObserverScopeRef,m.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return h=m.sent,v=h.ColorBlock,r=C({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(f){return f.user.firstName+f.user.lastName}}}},{scope:I.Parent}),n=r.state,m.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(v,{name:"FullName"},n.parent.user.fullName))}});case 11:case"end":return m.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components" 

const { state } = createStore({
  parent:{
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){
        // scope\u6307\u5411user\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\uFF0C\u5373parent
        return scope.user.firstName+scope.user.lastName
      }
    }
  }
} ,{
  // \u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u4E0A\u4E0B\u6587\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u6709\u7684\u5F53\u524D\u5BF9\u8C61
  scope: ObserverScopeRef.Parent,
})

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.parent.user.fullName}</ColorBlock>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-3":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=s.sent,C=y.createStore,s.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=s.sent,h=I.ColorBlock,v=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(u){return u},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),r=v.state,s.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(h,{name:"FullName"},r.user.fullName))}});case 10:case"end":return s.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components" 

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // this\u6307\u5411user.address.city
      return scope
    },
    address:{
      city:"Quanzhou",
    }
  }
},{
  scope: 'user.address.city'
})

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.user.fullName}</ColorBlock>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-4":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=s.sent,C=y.createStore,s.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=s.sent,h=I.ColorBlock,v=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(u){return u},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),r=v.state,s.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(h,{name:"FullName"},r.user.fullName))}});case 10:case"end":return s.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components" 

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // this\u6307\u5411user.address['main.city']
      return scope
    },
    address:{
      'main.city':"Quanzhou",
    }
  }
},{
  scope: ['user','address','main.city']
})

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.user.fullName}</ColorBlock>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-5":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.createStore,I=y.computed,h=y.ObserverScopeRef,u.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return v=u.sent,r=v.ColorBlock,n=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:I(function(){var f=k()(l()().mark(function g(S){return l()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.abrupt("return",S[0]+S[1]);case 1:case"end":return E.stop()}},g)}));return function(g){return f.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:h.Depends})}}),s=n.state,u.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(r,{name:"FullName"},s.user.fullName.value))}});case 12:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components" 

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (deps)=>{ 
      return deps[0] + deps[1]
    },      
      ['user.firstName','user.lastName'],  // \u58F0\u660E\u4F9D\u8D56
    {      
      async:true,
      scope:ObserverScopeRef.Depends
    }) 
  }
} )

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.user.fullName.value}</ColorBlock>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},21170:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),K=e(28633),k=e.n(K),B=e(70958),_=e.n(B),D=e(92379),W=e(30901),p=e(29355),M=e(3543),y={"docs-guide-computed-sync-demo-0":{component:D.memo(D.lazy(_()(l()().mark(function C(){var I,h,v,r,n,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=u.sent,h=I.createStore,u.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return v=u.sent,r=v.ColorBlock,n=v.Button,s=h({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}}),u.abrupt("return",{default:function(){var g=s.useState(),S=k()(g,2),N=S[0],E=S[1];return D.createElement("div",null,D.createElement(r,{name:"First Name"},N.user.firstName),D.createElement(r,{name:"Last Name"},N.user.lastName),D.createElement(r,{name:"Full Name"},N.user.fullName),D.createElement(n,{onClick:function(){return E(function(O){return O.user.firstName="\u2764\uFE0F"+O.user.firstName})}},"Change First Name"),D.createElement(n,{onClick:function(){return E(function(O){return O.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return u.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button } from "x-react-components"

const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName
    } 
  }
})

export default ()=>{
  const [state,setState] = store.useState()
  return <div>
    <ColorBlock name="First Name">{state.user.firstName}</ColorBlock>
    <ColorBlock name="Last Name">{state.user.lastName}</ColorBlock>
    <ColorBlock name="Full Name">{state.user.fullName}</ColorBlock>
    <Button onClick={()=>setState((state)=>state.user.firstName= '\u2764\uFE0F'+state.user.firstName)}>Change First Name</Button>
    <Button onClick={()=>setState((state)=>state.user.lastName+='\u2600\uFE0F')}>Change Last Name</Button>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}},"docs-guide-computed-sync-demo-1":{component:D.memo(D.lazy(_()(l()().mark(function C(){var I,h,v,r,n;return l()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=m.sent,h=I.createStore,m.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return v=m.sent,r=v.Button,n=h({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(f){return f.price*f.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(f){return f.price*f.count}}],total:function(f){return f.books.reduce(function(g,S){return g+S.total},0)}}),m.abrupt("return",{default:function(){var f=n.useState(),g=k()(f,2),S=g[0],N=g[1];return D.createElement("table",{className:"table table-bordered table-hover"},D.createElement("thead",null,D.createElement("tr",null,D.createElement("th",null,"\u4E66\u540D"),D.createElement("th",null,"\u4F5C\u8005"),D.createElement("th",null,"\u5355\u4EF7"),D.createElement("th",null,"\u6570\u91CF"),D.createElement("th",null,"\u5C0F\u8BA1"))),D.createElement("tbody",null,S.books.map(function(E,R){return D.createElement("tr",{key:R},D.createElement("td",null,E.name),D.createElement("td",null,E.author),D.createElement("td",null,E.price),D.createElement("td",null,D.createElement(r,{onClick:function(){return n.state.books[R].count--}},"-"),E.count,D.createElement(r,{onClick:function(){return n.state.books[R].count++}},"+")),D.createElement("td",null,E.total))}),D.createElement("tr",null,D.createElement("td",{colSpan:4},"\u603B\u8BA1"),D.createElement("td",null,S.total))))}});case 10:case"end":return m.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
import{ Button } from "x-react-components"

const store = createStore({
  books:[
    {name:'\u5F20\u4E09',price:18,author:'tom',count:2,total:(book)=>book.price*book.count},
    {name:'\u674E\u56DB',price:19,author:'jack',count:3,total:(book)=>book.price*book.count}
  ],
  total:(state)=>state.books.reduce((total,book)=>total+book.total,0)
})

export default ()=>{
  const [state,setState] = store.useState()
  return <table className="table table-bordered table-hover">
    <thead>
      <tr>
        <th>\u4E66\u540D</th>
        <th>\u4F5C\u8005</th>
        <th>\u5355\u4EF7</th>
        <th>\u6570\u91CF</th>
        <th>\u5C0F\u8BA1</th>
      </tr>
    </thead>
    <tbody>
      {state.books.map((book,index)=>{
        return <tr key={index}>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td>{book.price}</td>
          <td>
            <Button onClick={()=>store.state.books[index].count--}>-</Button>
            {book.count}
            <Button onClick={()=>store.state.books[index].count++}>+</Button>
          </td>
          <td>{book.total}</td>
        </tr>
      })}
      <tr>
        <td colSpan={4}>\u603B\u8BA1</td>
        <td>{state.total}</td>
        </tr>
    </tbody>
  </table>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}}}},5723:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return I}});var l=e(29008),K=e.n(l),k=e(28633),B=e.n(k),_=e(70958),D=e.n(_),W=e(92379),p=e(20410),M=e(29355),y=e(3543),C=e(53225),I={"docs-guide-debug-circular-dependency-demo-0":{component:W.memo(W.lazy(D()(K()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E;return K()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.useStore,n=v.computed,O.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return s=O.sent,m=s.ColorBlock,u=s.Button,f=s.JsonView,O.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return g=O.sent,S=g.useState,O.next=17,Promise.resolve().then(e.bind(e,53225));case 17:return N=O.sent,E=N.installCycleDetectExtend,E({onDetected:function(j){return console.error("\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56:",j),"disable"}}),O.abrupt("return",{default:function(){var j=S(null),$=B()(j,2),w=$[0],F=$[1],Y=r({x:1,a:n(function(){var q=D()(K()().mark(function X(se){return K()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return de.abrupt("return",se.b.value+se.x);case 1:case"end":return de.stop()}},X)}));return function(X){return q.apply(this,arguments)}}(),["b","x"]),b:n(function(){var q=D()(K()().mark(function X(se){return K()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return de.abrupt("return",se.a.value+ +se.x);case 1:case"end":return de.stop()}},X)}));return function(X){return q.apply(this,arguments)}}(),["a","x"])},{debug:!0}),Z=Y.useState(),H=B()(Z,1),Q=H[0];return W.createElement("div",null,W.createElement(m,{name:"x"},W.createElement(u,{onClick:function(){return Y.state.x--}},"-"),Y.$("x"),W.createElement(u,{onClick:function(){return Y.state.x++}},"+")),W.createElement("div",{style:{color:"red"}},w),W.createElement(f,{data:Q}))}});case 21:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-debug-circular-dependency-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed } from '@autostorejs/react';
import { Box,ColorBlock,Button,JsonView } from "x-react-components"
import { useState,useRef } from "react"
import { installCycleDetectExtend }  from '@autostorejs/devtools'
 
installCycleDetectExtend({
  onDetected:(paths)=>{
    console.error("\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56:",paths)
    return 'disable'
  }  
})

export default ()=>{  
  const [error, setError] = useState(null);
  
  let store  = useStore({ 
      x:1,
      a: computed(async (scope:any)=>{
        return scope.b.value + scope.x
      },['b','x']),
      b: computed(async (scope:any)=>{
        return scope.a.value + + scope.x
      },['a','x'])
    },{
      debug:true
    }) 
  const [ data ] = store.useState()
  return <div>
    <ColorBlock name="x">
        <Button onClick={()=>store.state.x--}>-</Button>
        {store.$('x')}
        <Button onClick={()=>store.state.x++}>+</Button>
    </ColorBlock>
    <div style={{color:'red'}}>{error}</div>
    <JsonView data={data}/>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"@autostorejs/devtools":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7531\u4E8Ea,b\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u5185\u90E8\u4F1A\u5FFD\u7565a,b\u7684\u8BA1\u7B97\uFF0C\u5BFC\u81F4a,b\u7684\u503C\u4E3A\u65E0\u6CD5\u8BA1\u7B97\u3002",title:"\u6253\u5F00\u63A7\u5236\u53F0\u89C2\u5BDF\u4FE1\u606F"},context:{"@autostorejs/react":M,"x-react-components":y,react:V||(V=e.t(W,2)),"@autostorejs/devtools":C},renderOpts:{compile:function(){var h=D()(K()().mark(function r(){var n,s=arguments;return K()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},13219:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(28633),l=e.n(V),K=e(29008),k=e.n(K),B=e(70958),_=e.n(B),D=e(92379),W=e(44465),p=e(29355),M=e(3543),y={"docs-guide-debug-dev-tools-demo-0":{component:D.memo(D.lazy(_()(k()().mark(function C(){var I,h,v,r,n,s,m,u,f,g;return k()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=N.sent,h=I.createStore,v=I.computed,N.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return r=N.sent,n=r.Button,s=r.ColorBlock,m=h({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(R){return R.firstName+R.lastName},salary:v(function(){var E=_()(k()().mark(function R(O){return k()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",O.age*10);case 1:case"end":return j.stop()}},R)}));return function(R){return E.apply(this,arguments)}}(),["age"])},{debug:!0,id:"user"}),u=m.state,f=m.useState,g=m.$,N.abrupt("return",{default:function(){var R=f("age"),O=l()(R,2),L=O[0],j=O[1],$=f("salary"),w=l()($,2),F=w[0],Y=w[1],Z=f(function(X){return X.lastName},function(X,se){return se.lastName=X}),H=l()(Z,2),Q=H[0],q=H[1];return D.createElement("div",null,D.createElement(s,null,"Fullname :",u.firstName," ",Q),D.createElement(s,null,"Age :",L),D.createElement(s,null,"Salary: ",g("salary")),D.createElement(n,{onClick:function(){return j(L+1)}},"Age++"),D.createElement(n,{onClick:function(){return q(Q+".")}},"Change lastName"))}});case 12:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-debug-dev-tools-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"
const { state,useState,$ } = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18,
  fullName:(user)=>user.firstName+user.lastName,
  salary:computed(async (user)=>{
    return user.age * 10
  },['age'])
},{
  debug:true,  // \u914D\u7F6E\u8C03\u8BD5\u6A21\u5F0F
  id:"user"   // \u914D\u7F6Eid\u4FBF\u4EE5\u5728devTools\u4E2D\u663E\u793A
})
 

export default () => {
  const [age,setAge] = useState('age') 
  const [salary,setSalary] = useState('salary') 
  const [lastName,setLastName] = useState((state)=>state.lastName,(name,user)=>user.lastName=name) 

  return <div>    
      <ColorBlock>Fullname :{state.firstName}{' '}{lastName}</ColorBlock>
      <ColorBlock>Age :{age}</ColorBlock>
      <ColorBlock>Salary: {$('salary')}</ColorBlock>
      <Button onClick={()=>setAge(age+1)}>Age++</Button> 
      <Button onClick={()=>setLastName(lastName+'.')}>Change lastName</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(k()().mark(function h(){var v,r=arguments;return k()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}}}},30395:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return M}});var l=e(29008),K=e.n(l),k=e(70958),B=e.n(k),_=e(92379),D=e(67040),W=e(29355),p=e(3543),M={"docs-guide-debug-log-demo-0":{component:_.memo(_.lazy(B()(K()().mark(function y(){var C,I,h,v,r,n,s,m,u,f;return K()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=S.sent,I=C.useStore,h=C.computed,S.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return v=S.sent,r=v.Box,n=v.Button,s=v.ColorBlock,S.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return m=S.sent,u=m.useRef,f=function(E){return E.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},S.abrupt("return",{default:function(){var E=u(),R=I({price:100,count:2,total:h(function(j){return j.price*j.count})},{debug:!0,log:function($){var w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"info",F=typeof $=="function"?$():$ instanceof Error?$.message:$;E.current&&E.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        <b>[`.concat(w,"]</b> - ").concat(f(F),"</p>"))}}),O=R.state,L=R.$;return _.createElement("div",null,_.createElement(s,{name:"Price"},L("price")),_.createElement(s,{name:"Count"},_.createElement(n,{onClick:function(){return O.count--}},"-"),L("count"),_.createElement(n,{onClick:function(){return O.count++}},"+")),_.createElement(s,{name:"Total"},L("total")),_.createElement(n,{onClick:function(){return E.current.innerHTML=""}},"Clear"),_.createElement(r,{ref:E}))}});case 17:case"end":return S.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-log-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,delay } from "@autostorejs/react"
import { Box,Button,ColorBlock } from "x-react-components"
import { useRef } from "react"
    // \u8F6C\u4E49HTML\u7279\u6B8A\u5B57\u7B26
const escapeHtml = (str: string) => str.replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/"/g, "&quot;")
                                        .replace(/'/g, "&#039;");
export default ()=>{
  const ref = useRef()
  const { state, $ } = useStore({
    price:100,
    count:2,
    total:computed((scope)=>scope.price*scope.count)
  },{
      debug:true,  // \u5F00\u542F\u8C03\u8BD5\u6A21\u5F0F
      log:(info,level='info')=>{
        const message = typeof(info)==='function' ? info() : (info instanceof Error ? info.message : info)
        ref.current && ref.current.insertAdjacentHTML("beforeend",
        \`<p style='margin:2px;'}>
        <b>[\${level}]</b> - \${escapeHtml(message)}</p>\`)
      }
  })
 
  return <div> 
      <ColorBlock name="Price">{$('price')}</ColorBlock>
      <ColorBlock name="Count">
        <Button onClick={()=>state.count--}>-</Button>
        {$('count')}
        <Button onClick={()=>state.count++}>+</Button>
      </ColorBlock>
      <ColorBlock name="Total">{$('total')}</ColorBlock> 
      <Button onClick={()=>ref.current.innerHTML=''}>Clear</Button>
    <Box ref={ref}>
    </Box>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u8C03\u8282count\u503C\uFF0C\u67E5\u770B\u65E5\u5FD7\u8F93\u51FA",title:"\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA"},context:{"@autostorejs/react":W,"x-react-components":p,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(K()().mark(function I(){var h,v=arguments;return K()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},I)}));function C(){return y.apply(this,arguments)}return C}()}}}},1982:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return M}});var l=e(29008),K=e.n(l),k=e(70958),B=e.n(k),_=e(92379),D=e(67039),W=e(29355),p=e(3543),M={"docs-guide-debug-trace-demo-0":{component:_.memo(_.lazy(B()(K()().mark(function y(){var C,I,h,v,r,n,s,m,u,f;return K()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=S.sent,I=C.createStore,S.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return h=S.sent,v=h.Box,S.next=10,Promise.resolve().then(e.t.bind(e,92379,19));case 10:return r=S.sent,n=r.useRef,s=r.useEffect,m=I({a:1,b:2,c:function(E){return E.a+E.b}}),u=m.state,f=m.trace,S.abrupt("return",{default:function(){var E=n();return s(function(){var R=f(function(){u.a=10,u.b=20});R.start().then(function(O){O.forEach(function(L){E.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(L.type," ").concat(L.path.join("."),"</p>"))})})},[]),_.createElement(v,{ref:E})}});case 15:case"end":return S.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"


const { state,trace } = createStore({
  a:1,
  b:2,
  c:(scope)=>scope.a+scope.b
})

export default ()=>{

  const ref = useRef()

  useEffect(()=>{
    const tracker = trace(()=>{
      state.a = 10
      state.b = 20
    })   
    tracker.start().then(ops=>{
      ops.forEach(operate=>{
        ref.current.insertAdjacentHTML("beforeend",\`<p style='margin:2px;'}>
        \${operate.type} \${operate.path.join('.')}</p>\`)
      })
    })
  },[])

  return <Box ref={ref}/> 
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":W,"x-react-components":p,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(K()().mark(function I(){var h,v=arguments;return K()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},I)}));function C(){return y.apply(this,arguments)}return C}()}},"docs-guide-debug-trace-demo-1":{component:_.memo(_.lazy(B()(K()().mark(function y(){var C,I,h,v,r,n,s,m,u,f,g,S;return K()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=E.sent,I=C.createStore,h=C.computed,v=C.delay,E.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return r=E.sent,n=r.Box,E.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return s=E.sent,m=s.useRef,u=s.useEffect,f=I({a:1,b:2,c:h(function(){var R=B()(K()().mark(function O(L){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",L.a+L.b);case 1:case"end":return $.stop()}},O)}));return function(O){return R.apply(this,arguments)}}(),["a","b"])}),g=f.state,S=f.trace,E.abrupt("return",{default:function(){var O=m();return u(function(){var L=S(B()(K()().mark(function j(){return K()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return g.a=10,w.next=3,v();case 3:g.b=20;case 4:case"end":return w.stop()}},j)})));L.start().then(function(j){j.forEach(function($){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat($.type," ").concat($.path.join("."),"</p>"))})})},[]),_.createElement(n,{ref:O})}});case 17:case"end":return E.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"

const { state, trace } = createStore({
  a:1,
  b:2,
  c:computed(async (scope)=>scope.a+scope.b,["a","b"])
})
 
export default ()=>{

  const ref = useRef()

  useEffect(()=>{
    const tracker = trace(async ()=>{      
      state.a = 10
      await delay()
      state.b = 20
    })   
    tracker.start().then(ops=>{
      ops.forEach(operate=>{
        ref.current.insertAdjacentHTML("beforeend",\`<p style='margin:2px;'}>
        \${operate.type} \${operate.path.join('.')}</p>\`)
      })
    })
  },[])

  return <Box ref={ref}/> 
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"c\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4F9D\u8D56\u4E8Ea\u548Cb\uFF0C\u5F53a\u6216b\u53D8\u5316\u65F6\uFF0Cc\u4F1A\u91CD\u65B0\u8BA1\u7B97",title:"\u5F02\u6B65\u8DDF\u8E2A"},context:{"@autostorejs/react":W,"x-react-components":p,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(K()().mark(function I(){var h,v=arguments;return K()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},I)}));function C(){return y.apply(this,arguments)}return C}()}},"docs-guide-debug-trace-demo-2":{component:_.memo(_.lazy(B()(K()().mark(function y(){var C,I,h,v,r,n,s,m,u,f,g,S;return K()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=E.sent,I=C.createStore,h=C.computed,v=C.delay,E.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return r=E.sent,n=r.Box,E.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return s=E.sent,m=s.useRef,u=s.useEffect,f=I({a:1,b:2,c:h(function(){var R=B()(K()().mark(function O(L){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",L.a+L.b);case 1:case"end":return $.stop()}},O)}));return function(O){return R.apply(this,arguments)}}(),["a","b"]),d:h(function(){var R=B()(K()().mark(function O(L){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",L.c.value+1);case 1:case"end":return $.stop()}},O)}));return function(O){return R.apply(this,arguments)}}(),["c"])}),g=f.state,S=f.trace,E.abrupt("return",{default:function(){var O=m();return u(function(){var L=S(B()(K()().mark(function j(){return K()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return g.a=10,w.next=3,v();case 3:g.b=20;case 4:case"end":return w.stop()}},j)})));L.start().then(function(j){j.forEach(function($){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat($.type," ").concat($.path.join("."),"</p>"))})})},[]),_.createElement(n,{ref:O})}});case 17:case"end":return E.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"

const { state, trace } = createStore({
  a:1,
  b:2,
  c:computed(async (scope)=>scope.a+scope.b,["a","b"]),
  d:computed(async (scope)=>scope.c.value+1,["c"])
})
 
export default ()=>{

  const ref = useRef()

  useEffect(()=>{
    const tracker = trace(async ()=>{      
      state.a = 10
      await delay()
      state.b = 20
    })   
    tracker.start().then(ops=>{
      ops.forEach(operate=>{
        ref.current.insertAdjacentHTML("beforeend",\`<p style='margin:2px;'}>
        \${operate.type} \${operate.path.join('.')}</p>\`)
      })
    })
  },[])

  return <Box ref={ref}/> 
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":W,"x-react-components":p,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(K()().mark(function I(){var h,v=arguments;return K()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},I)}));function C(){return y.apply(this,arguments)}return C}()}},"docs-guide-debug-trace-demo-3":{component:_.memo(_.lazy(B()(K()().mark(function y(){var C,I,h,v,r,n,s,m,u,f,g,S;return K()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=E.sent,I=C.createStore,h=C.computed,v=C.delay,E.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return r=E.sent,n=r.Box,E.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return s=E.sent,m=s.useRef,u=s.useEffect,f=I({a:1,b:2,c:h(function(){var R=B()(K()().mark(function O(L){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",L.a+L.b);case 1:case"end":return $.stop()}},O)}));return function(O){return R.apply(this,arguments)}}(),["a","b"]),d:h(function(){var R=B()(K()().mark(function O(L){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",L.c.value+1);case 1:case"end":return $.stop()}},O)}));return function(O){return R.apply(this,arguments)}}(),["c"])}),g=f.state,S=f.trace,E.abrupt("return",{default:function(){var O=m();return u(function(){var L=S(B()(K()().mark(function j(){return K()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return g.a=10,w.next=3,v();case 3:g.b=20;case 4:case"end":return w.stop()}},j)})));L.start(function(j){if(j.type=="set"&&j.path.length===2&&j.path[0]==="d"&&j.path[1]==="value")return!0}).then(function(j){j.forEach(function($){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat($.type," ").concat($.path.join("."),"</p>"))})})},[]),_.createElement(n,{ref:O})}});case 17:case"end":return E.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"

const { state, trace } = createStore({
  a:1,
  b:2,
  c:computed(async (scope)=>scope.a+scope.b,["a","b"]),
  d:computed(async (scope)=>scope.c.value+1,["c"])
})
 
export default ()=>{

  const ref = useRef()

  useEffect(()=>{
    const tracker = trace(async ()=>{      
      state.a = 10
      await delay()
      state.b = 20
    })   
    tracker.start((op)=>{        
        // \u9884\u671F\u6574\u4E2A\u6267\u884C\u6D41\u7A0B\u4F1A\u4FEE\u6539d\u7684\u503C\uFF0C\u56E0\u6B64\u5E94\u8BE5\u5728d\u7684set value\u4E0A\u505C\u6B62
        if(op.type=='set' && op.path.length===2 && op.path[0] === 'd' && op.path[1] === 'value'){
            return true   
        }
    }).then(ops=>{
      ops.forEach(operate=>{
        ref.current.insertAdjacentHTML("beforeend",\`<p style='margin:2px;'}>
        \${operate.type} \${operate.path.join('.')}</p>\`)
      })
    })
  },[])

  return <Box ref={ref}/> 
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":W,"x-react-components":p,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(K()().mark(function I(){var h,v=arguments;return K()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},I)}));function C(){return y.apply(this,arguments)}return C}()}}}},62518:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(16142),K={}},79489:function(te,b,e){e.r(b),e.d(b,{demos:function(){return I}});var V=e(29008),l=e.n(V),K=e(24325),k=e.n(K),B=e(28633),_=e.n(B),D=e(70958),W=e.n(D),p=e(92379),M=e(69580),y=e(29355),C=e(3543),I={"docs-guide-form-bind-demo-0":{component:p.memo(p.lazy(W()(l()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E;return l()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.createStore,O.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return n=O.sent,s=n.ColorBlock,m=n.Button,u=n.Input,f=r({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(j){return j.firstName+j.lastName}}}),g=f.state,S=f.$,N=f.bind,E=f.useState,O.abrupt("return",{default:function(){var j=E("user.firstName"),$=_()(j,2),w=$[0],F=$[1],Y=E("user.lastName"),Z=_()(Y,2),H=Z[0],Q=Z[1],q=E("user.vip"),X=_()(q,2),se=X[0],ue=X[1];return p.createElement("div",null,p.createElement(u,k()(k()({label:"First Name"},N("user.firstName")),{},{value:w})),p.createElement(u,k()(k()({label:"last Name"},N("user.lastName")),{},{value:H})),p.createElement(u,k()(k()({type:"checkbox",label:"VIP"},N("user.vip")),{},{value:se})),p.createElement(s,{name:"First Name"},S("user.firstName")),p.createElement(s,{name:"Last Name"},S("user.lastName")),p.createElement(s,{name:"Full Name"},S("user.fullName")),p.createElement(s,{name:"VIP"},S("user.vip")),p.createElement(m,{onClick:function(){F("Zhang"),Q("Fisher")}},"Reset"))}});case 12:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind, useState } = createStore({
 user:{
   firstName:"Zhang",
   lastName:"Fisher",
   vip:false,
   fullName: (user)=>{
     return user.firstName+user.lastName
   } 
 }
})

export default ()=>{
 const [firstName,setFirstName] = useState("user.firstName")
 const [lastName,setLastName] = useState("user.lastName")
 const [vip,setVip ] = useState("user.vip")
 return <div>    
   <Input label="First Name" {...bind("user.firstName")} value={firstName}/>
   <Input label="last Name" {...bind("user.lastName")} value={lastName}/>
   <Input type="checkbox" label="VIP" {...bind("user.vip")} value={vip}/>
   <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
   <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
   <ColorBlock name="Full Name">{$('user.fullName')}</ColorBlock>
   <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
   <Button onClick={()=>{
     setFirstName("Zhang")
     setLastName("Fisher")
   }}>Reset</Button>
 </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(l()().mark(function r(){var n,s=arguments;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},31183:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),K=e(24325),k=e.n(K),B=e(70958),_=e.n(B),D=e(92379),W=e(32026),p=e(29355),M=e(3543),y={"docs-guide-form-use-bindings-demo-0":{component:D.memo(D.lazy(_()(l()().mark(function C(){var I,h,v,r,n,s,m;return l()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=f.sent,h=I.useStore,f.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return v=f.sent,r=v.Layout,n=v.ColorBlock,s=v.Button,m=v.Input,f.abrupt("return",{default:function(){var S=h({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),N=S.state,E=S.$,R=S.useBindings,O=R();return D.createElement(r,null,D.createElement("div",null,D.createElement(m,k()({label:"First Name"},O.user.firstName)),D.createElement(m,k()({label:"last Name"},O.user.lastName)),D.createElement(m,k()({label:"Age"},O.user.age)),D.createElement(m,k()({type:"checkbox",label:"VIP"},O.user.vip)),D.createElement(s,{onClick:function(){N.user.firstName="Zhang",N.user.lastName="Fisher",N.user.age=18,N.user.vip=!1}},"Reset")),D.createElement("div",null,D.createElement(n,{name:"First Name"},E("user.firstName")),D.createElement(n,{name:"Last Name"},E("user.lastName")),D.createElement(n,{name:"Age"},E("user.age")),D.createElement(n,{name:"VIP"},E("user.vip"))))}});case 12:case"end":return f.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { Layout,ColorBlock,Button,Input } from "x-react-components"
 
export default ()=>{

  const { state, $, useBindings } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }
  })

  const bindings = useBindings()

  return <Layout>
      <div>    
        <Input label="First Name" {...bindings.user.firstName}/>
        <Input label="last Name" {...bindings.user.lastName} />
        <Input label="Age" {...bindings.user.age}/>
        <Input type="checkbox" label="VIP" {...bindings.user.vip} />
        <Button onClick={()=>{
          state.user.firstName= "Zhang"
          state.user.lastName = "Fisher"
          state.user.age = 18
          state.user.vip = false
        }}>Reset</Button>
      </div>
      <div>    
        <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
        <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
        <ColorBlock name="Age">{$('user.age')}</ColorBlock>        
        <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
      </div>    
    </Layout>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}}}},19025:function(te,b,e){e.r(b),e.d(b,{demos:function(){return I}});var V=e(28633),l=e.n(V),K=e(29008),k=e.n(K),B=e(24325),_=e.n(B),D=e(70958),W=e.n(D),p=e(92379),M=e(25061),y=e(29355),C=e(3543),I={"docs-guide-form-use-field-demo-0":{component:p.memo(p.lazy(W()(k()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R;return k()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=L.sent,r=v.createStore,L.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return n=L.sent,s=n.ColorBlock,m=n.Button,u=n.Input,f=r({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),g=f.state,S=f.$,N=f.bind,E=f.useState,R=f.useField,L.abrupt("return",{default:function(){var $=R("user.firstName"),w=R("user.lastName"),F=R("user.vip"),Y=R("user.job");return p.createElement("div",null,p.createElement(u,_()({label:"First Name"},$)),p.createElement(u,_()({label:"last Name"},w)),p.createElement(u,_()({type:"checkbox",label:"VIP"},F)),p.createElement(s,{name:"Job"},p.createElement("select",_()({id:"job"},Y),p.createElement("option",{value:"1"},"Engineer"),p.createElement("option",{value:"2"},"Doctor"),p.createElement("option",{value:"3"},"Teacher"))),p.createElement(s,{name:"First Name"},S("user.firstName")),p.createElement(s,{name:"Last Name"},S("user.lastName")),p.createElement(s,{name:"VIP"},S("user.vip")),p.createElement(s,{name:"Job"},S("user.job")),p.createElement(m,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return L.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind, useState,useField } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    vip:false, 
    job:"unknown"
  }
})

export default ()=>{
  const bindFirstName = useField("user.firstName")
  const bindLastName = useField("user.lastName")
  const bindVip = useField("user.vip")
  const bindJob = useField("user.job")
  return <div>    
    <Input label="First Name" {...bindFirstName}/>
    <Input label="last Name" {...bindLastName} />
    <Input type="checkbox" label="VIP" {...bindVip}/>
    <ColorBlock name="Job">    
      <select id="job" {...bindJob}>
        <option value="1">Engineer</option>
        <option value="2">Doctor</option>
        <option value="3">Teacher</option>
      </select>
    </ColorBlock>
    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <ColorBlock name="Job">{$('user.job')}</ColorBlock>
    <Button onClick={()=>{
      setFirstName("Zhang")
      setLastName("Fisher")
    }}>Reset</Button>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useField"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(k()().mark(function r(){var n,s=arguments;return k()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-form-use-field-demo-1":{component:p.memo(p.lazy(W()(k()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E,R;return k()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=L.sent,r=v.createStore,L.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return n=L.sent,s=n.ColorBlock,m=n.Button,u=n.Input,f=r({user:{firstName:"Zhang",lastName:"Fisher"}}),g=f.state,S=f.$,N=f.bind,E=f.useState,R=f.useField,L.abrupt("return",{default:function(){var $=R(function(w){return w.user.firstName+" "+w.user.lastName},function(w,F){var Y=w.split(/\s+/),Z=l()(Y,2),H=Z[0],Q=Z[1];F.user.firstName=H,F.user.lastName=Q});return p.createElement("div",null,p.createElement(u,_()({label:"FullName"},$)),p.createElement(s,{name:"First Name"},S("user.firstName")),p.createElement(s,{name:"Last Name"},S("user.lastName")),p.createElement(m,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return L.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind, useState,useField } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher" 
  }
})

export default ()=>{ 
  const bindFullName = useField(
    (state)=>state.user.firstName+" "+state.user.lastName,
    // \u89E3\u6790\u8F93\u5165\u7684\u503C
    (value,state)=>{
      const [firstName,lastName] = value.split(/\\s+/)
      state.user.firstName = firstName
      state.user.lastName = lastName
    })
  return <div>    
    <Input label="FullName" {...bindFullName}/>
    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>            
    <Button onClick={()=>{
      state.user.firstName= "Zhang"
      state.user.lastName = "Fisher"
    }}>Reset</Button>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(k()().mark(function r(){var n,s=arguments;return k()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-form-use-field-demo-2":{component:p.memo(p.lazy(W()(k()().mark(function h(){var v,r,n,s,m,u,f,g,S,N,E;return k()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.createStore,O.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return n=O.sent,s=n.ColorBlock,m=n.Button,u=n.Input,f=r({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),g=f.state,S=f.$,N=f.bind,E=f.useField,O.abrupt("return",{default:function(){var j=E("user");return p.createElement("div",null,p.createElement(u,_()({label:"First Name"},j.firstName)),p.createElement(u,_()({label:"last Name"},j.lastName)),p.createElement(u,_()({label:"Age"},j.age)),p.createElement(u,_()({type:"checkbox",label:"VIP"},j.vip)),p.createElement(s,{name:"First Name"},S("user.firstName")),p.createElement(s,{name:"Last Name"},S("user.lastName")),p.createElement(s,{name:"Age"},S("user.age")),p.createElement(s,{name:"VIP"},S("user.vip")),p.createElement(m,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher",g.user.age=18,g.user.vip=!1}},"Reset"))}});case 12:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind,useField } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }
})

export default ()=>{
  
  const bindUser = useField("user")

  return <div>    
    <Input label="First Name" {...bindUser.firstName}/>
    <Input label="last Name" {...bindUser.lastName} />
    <Input label="Age" {...bindUser.age}/>
    <Input type="checkbox" label="VIP" {...bindUser.vip} />

    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="Age">{$('user.age')}</ColorBlock>        
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <Button onClick={()=>{
      state.user.firstName= "Zhang"
      state.user.lastName = "Fisher"
      state.user.age = 18
      state.user.vip = false
    }}>Reset</Button>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(k()().mark(function r(){var n,s=arguments;return k()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-form-use-field-demo-3":{component:p.memo(p.lazy(W()(k()().mark(function h(){var v,r,n,s,m,u;return k()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=g.sent,r=v.useStore,g.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return n=g.sent,s=n.ColorBlock,m=n.Button,u=n.Input,g.abrupt("return",{default:function(){var N=r({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),E=N.state,R=N.$,O=N.bind,L=N.useField,j=L();return p.createElement("div",null,p.createElement(u,_()({label:"First Name"},j.firstName)),p.createElement(u,_()({label:"last Name"},j.lastName)),p.createElement(u,_()({label:"Age"},j.age)),p.createElement(u,_()({type:"checkbox",label:"VIP"},j.vip)),p.createElement(s,{name:"First Name"},R("firstName")),p.createElement(s,{name:"Last Name"},R("lastName")),p.createElement(s,{name:"Age"},R("age")),p.createElement(s,{name:"VIP"},R("vip")),p.createElement(m,{onClick:function(){E.firstName="Zhang",E.lastName="Fisher",E.age=18,E.vip=!1}},"Reset"))}});case 11:case"end":return g.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

 
export default ()=>{

  const { state, $, bind,useField } = useStore({
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
  })

  const bindUser = useField()

  return <div>    
    <Input label="First Name" {...bindUser.firstName}/>
    <Input label="last Name" {...bindUser.lastName} />
    <Input label="Age" {...bindUser.age}/>
    <Input type="checkbox" label="VIP" {...bindUser.vip} />

    <ColorBlock name="First Name">{$('firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('lastName')}</ColorBlock>        
    <ColorBlock name="Age">{$('age')}</ColorBlock>        
    <ColorBlock name="VIP">{$('vip')}</ColorBlock>    
    <Button onClick={()=>{
      state.firstName= "Zhang"
      state.lastName = "Fisher"
      state.age = 18
      state.vip = false
    }}>Reset</Button>
  </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=W()(k()().mark(function r(){var n,s=arguments;return k()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,s));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},23293:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),K=e(28633),k=e.n(K),B=e(70958),_=e.n(B),D=e(92379),W=e(70803),p=e(29355),M=e(3543),y={"docs-guide-form-use-form-demo-0":{component:D.memo(D.lazy(_()(l()().mark(function C(){var I,h,v,r,n,s,m,u,f,g;return l()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=N.sent,h=I.useStore,N.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return v=N.sent,r=v.TextArea,n=v.Layout,s=v.Button,m=v.Input,u=v.CheckBox,f=v.JsonView,g=v.Select,N.abrupt("return",{default:function(){var R=h({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),O=R.state,L=R.$,j=R.useForm,$=R.useState,w=$(),F=k()(w,1),Y=F[0],Z=j(),H=Z.Form;return D.createElement(n,null,D.createElement("div",null,D.createElement(H,null,D.createElement(m,{name:"user.firstName",label:"First Name"}),D.createElement(m,{name:"user.lastName",label:"lastName"}),D.createElement(m,{name:"user.age",label:"Age"}),D.createElement(g,{name:"user.job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),D.createElement(r,{name:"user.resume",label:"Resume"}),D.createElement(u,{name:"user.vip",label:"VIP"})),D.createElement(s,{onClick:function(){O.user.firstName="Zhang",O.user.lastName="Fisher",O.user.age=18,O.user.vip=!1}},"Reset")),D.createElement("div",null,D.createElement(f,{data:Y})))}});case 15:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { TextArea,Layout,ColorBlock,Button,Input,Box,CheckBox,JsonView,Select } from "x-react-components"
 
export default ()=>{

  const { state, $, useForm,useState } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false,
      job:1,
      resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"
    }
  })

  const [ user ] = useState()

  const { Form } = useForm()

  return <Layout>
      <div>     
        <Form>
          <Input name="user.firstName" label="First Name"/>
          <Input name="user.lastName" label="lastName"/>
          <Input name="user.age" label="Age"/>
          <Select name="user.job" label="Job" items={[
              { title:"Engineer", value:1 },
              { title:"Doctor", value:2 },
              { title:"Teacher", value:3 }
          ]}/>
          <TextArea name="user.resume" label="Resume"/>
          <CheckBox name="user.vip" label="VIP"/>
        </Form>
        <Button onClick={()=>{
          state.user.firstName= "Zhang"
          state.user.lastName = "Fisher"
          state.user.age = 18
          state.user.vip = false
        }}>Reset</Button>
      </div>
      <div>    
        <JsonView data={user} />
      </div>    
    </Layout>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}},"docs-guide-form-use-form-demo-1":{component:D.memo(D.lazy(_()(l()().mark(function C(){var I,h,v,r,n,s,m,u,f,g,S;return l()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=E.sent,h=I.useStore,E.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return v=E.sent,r=v.TextArea,n=v.Layout,s=v.ColorBlock,m=v.Button,u=v.Input,f=v.CheckBox,g=v.JsonView,S=v.Select,E.abrupt("return",{default:function(){var O=h({user:{firstName:"Zh",lastName:"Fi",age:"18n",email:"",vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),L=O.state,j=O.$,$=O.useForm,w=O.useState,F=w(),Y=k()(F,1),Z=Y[0],H=$({validate:function(ue,de){if(ue=="user.firstName")return de.length>3;if(ue=="user.lastName")return de.length>3;if(ue=="user.age")return!isNaN(parseFloat(de))&&isFinite(de)&&parseInt(de)>0}}),Q=H.Form,q=H.valid,X=H.dirty;return D.createElement(n,null,D.createElement("div",null,D.createElement(s,{name:"\u6709\u6548"},String(q)),D.createElement(s,{name:"\u810F"},String(X)),D.createElement(Q,null,D.createElement(u,{name:"user.firstName",label:"First Name","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),D.createElement(u,{name:"user.lastName",label:"lastName","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),D.createElement(u,{name:"user.age",label:"Age","data-error-tips":"\u5FC5\u987B\u662F\u5927\u4E8E0\u7684\u6570\u5B57"}),D.createElement(u,{name:"user.email",label:"Email",type:"email","data-error-tips":"\u5FC5\u987B\u8F93\u5165\u6709\u6548\u7684Email"}),D.createElement(S,{name:"job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),D.createElement(r,{name:"user.resume",label:"Resume","data-error-tips":"\u4E0D\u80FD\u5927\u4E8E20\u4E2A\u5B57\u7B26"}),D.createElement(f,{name:"user.vip",label:"VIP"})),D.createElement(m,{onClick:function(){L.user.firstName="Zhang",L.user.lastName="Fisher",L.user.age=18,L.user.vip=!1}},"Reset")),D.createElement("div",null,D.createElement(g,{data:Z})))}});case 16:case"end":return E.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { TextArea,Layout,ColorBlock,Button,Input,Box,CheckBox,JsonView,Select } from "x-react-components"
 
export default ()=>{

  const { state, $, useForm,useState } = useStore({
    user:{
      firstName:"Zh",
      lastName:"Fi",
      age:'18n',
      email:"",
      vip:false,
      job:1,
      resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"
    }
  })

  const [ user ] = useState()

  const { Form,valid,dirty } = useForm({
    validate:(name,value)=>{
      if(name=="user.firstName"){
        return value.length>3
      }else if(name=="user.lastName"){
        return value.length>3
      }else if(name=="user.age"){
        return !isNaN(parseFloat(value)) && isFinite(value) && parseInt(value)>0
      }
    },
  })

  return <Layout>
      <div>            
        <ColorBlock name="\u6709\u6548">{String(valid)}</ColorBlock>
        <ColorBlock name="\u810F">{String(dirty)}</ColorBlock>
        <Form>
          <Input name="user.firstName" label="First Name" 
                data-error-tips="\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3" />
          <Input name="user.lastName" label="lastName" 
                data-error-tips= "\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3" />
          <Input name="user.age" label="Age"  
                data-error-tips= "\u5FC5\u987B\u662F\u5927\u4E8E0\u7684\u6570\u5B57" />
          <Input name="user.email" label="Email"  type="email"
                data-error-tips= "\u5FC5\u987B\u8F93\u5165\u6709\u6548\u7684Email" />
          <Select name="job" label="Job" items={[
              { title:"Engineer", value:1 },
              { title:"Doctor", value:2 },
              { title:"Teacher", value:3 }
          ]}/>
          <TextArea name="user.resume" label="Resume"
              data-error-tips="\u4E0D\u80FD\u5927\u4E8E20\u4E2A\u5B57\u7B26" />
          <CheckBox name="user.vip" label="VIP"/>
        </Form>
        <Button onClick={()=>{
          state.user.firstName= "Zhang"
          state.user.lastName = "Fisher"
          state.user.age = 18
          state.user.vip = false
        }}>Reset</Button>
      </div>
      <div>    
        <JsonView data={user} />
      </div>    
    </Layout>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u65E0\u6548\u7684\u6570\u636E\u770B\u770B\u4F1A\u53D1\u751F\u4EC0\u4E48",title:"\u8868\u5355\u8F93\u5165\u6821\u9A8C"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}}}},34389:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(80916),K={}},32665:function(te,b,e){e.r(b),e.d(b,{demos:function(){return v}});var V=e(24325),l=e.n(V),K=e(12027),k=e.n(K),B=e(29008),_=e.n(B),D=e(28633),W=e.n(D),p=e(70958),M=e.n(p),y=e(92379),C=e(71371),I=e(29355),h=e(3543),v={"docs-guide-intro-get-started-demo-0":{component:y.memo(y.lazy(M()(_()().mark(function r(){var n,s,m,u,f,g,S,N,E,R,O,L;return _()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=$.sent,s=n.createStore,$.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return m=$.sent,u=m.ColorBlock,f=m.Button,g=m.Divider,S=m.Layout,N=m.JsonView,E=s({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:39.9,count:1,total:function(F){return F.price*F.count}}],total:function(F){return F.orders.reduce(function(Y,Z){return Y+Z.total},0)}}),R=E.state,O=E.$,L=E.useState,$.abrupt("return",{default:function(){var F=L(),Y=W()(F,1),Z=Y[0];return y.createElement(S,null,y.createElement("div",null,y.createElement(u,{name:"\u4E66\u540D"},O("orders.0.book")),y.createElement(u,{name:"\u5355\u4EF7"},O("orders.0.price")),y.createElement(u,{name:"\u6570\u91CF"},y.createElement(f,{onClick:function(){return R.orders[0].count--}},"-"),O("orders.0.count"),y.createElement(f,{onClick:function(){return R.orders[0].count++}},"+")),y.createElement(u,{name:"\u5C0F\u8BA1"},O("orders.0.total")),y.createElement(g,null),y.createElement(u,{name:"\u603B\u8BA1"},O("total"))),y.createElement("div",null,y.createElement(N,{data:Z})))}});case 14:case"end":return $.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import {  ColorBlock,Button,Divider,Layout,JsonView } from "x-react-components"

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore\u6700\u4F73\u5B9E\u8DF5',
      price: 39.9,
      count: 1,
      // \u5C0F\u8BA1
      total: (scope)=>scope.price*scope.count
    }
  ],
  // \u603B\u8BA1
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
export default ()=>{
  const [orders] = useState()
  return <Layout>
    <div>
      <ColorBlock name="\u4E66\u540D">{$('orders.0.book')}</ColorBlock>
      <ColorBlock name="\u5355\u4EF7">{$('orders.0.price')}</ColorBlock>
      <ColorBlock name="\u6570\u91CF">
        <Button onClick={()=>state.orders[0].count--}>-</Button>
        {$('orders.0.count')}
        <Button onClick={()=>state.orders[0].count++}>+</Button>
      </ColorBlock>
      <ColorBlock name="\u5C0F\u8BA1">{$('orders.0.total')}</ColorBlock>
      <Divider/>
      <ColorBlock name="\u603B\u8BA1">{$('total')}</ColorBlock>
    </div>
    <div>
      <JsonView data={orders}/>
    </div>
  </Layout>  
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":I,"x-react-components":h},renderOpts:{compile:function(){var r=M()(_()().mark(function s(){var m,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(m=g.sent).default.apply(m,u));case 3:case"end":return g.stop()}},s)}));function n(){return r.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-1":{component:y.memo(y.lazy(M()(_()().mark(function r(){var n,s,m,u,f,g,S,N,E,R,O;return _()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=j.sent,s=n.createStore,m=n.delay,u=n.computed,j.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return f=j.sent,g=f.Button,S=f.Table,N=s({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(w){return Math.floor(w.price*w.count)}}],discount:u(function(){var $=M()(_()().mark(function w(F){return _()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,m(2e3);case 2:return Z.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return Z.stop()}},w)}));return function(w){return $.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:u(function(){var $=M()(_()().mark(function w(F){return _()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.abrupt("return",(F.orders.reduce(function(H,Q){return H+Q.total},0)*F.discount.value).toFixed(2));case 1:case"end":return Z.stop()}},w)}));return function(w){return $.apply(this,arguments)}}(),["discount"])}),E=N.state,R=N.$,O=N.useState,j.abrupt("return",{default:function(){var w=O(),F=W()(w,1),Y=F[0];return y.createElement("div",null,y.createElement(S,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(k()(Y.orders.map(function(Z,H){return[Z.book,"\uFFE5".concat(Z.price),function(){return y.createElement("div",null,y.createElement(g,{onClick:function(){return Z.count--}},"-"),Z.count,y.createElement(g,{onClick:function(){return Z.count++}},"+"))},"\uFFE5".concat(Z.total)]})),[["\u6298\u6263",null,null,function(){return y.createElement(y.Fragment,null,R("discount"))}],["\u603B\u8BA1",null,null,function(){return y.createElement(y.Fragment,null,"\uFFE5",R("total"))}]])}))}});case 13:case"end":return j.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
import {  ColorBlock,Button,Divider,Layout,JsonView,Table } from "x-react-components"

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore\u6700\u4F73\u5B9E\u8DF5',
      price: 10,
      count: 1,
      // \u5C0F\u8BA1
      total: (scope)=> Math.floor(scope.price*scope.count)
    }
  ],
  //  \u6298\u6263 \uFF1A\u5411\u540E\u53F0\u8BF7\u6C42\u6298\u6263
  discount: computed(async (scope)=>{
    // \u5982await fetch(\`/api/discount?userId=1&total=\${scope.total}....\`) 
    await delay(2000)
    return  (0.5 + Math.random()).toFixed(2)
  },['orders.*.total'],{
    initial:0.9
  }),
  // \u603B\u8BA1
  total: computed(async (scope)=>{ 
    return (scope.orders.reduce((acc,cur)=>acc+cur.total,0)*scope.discount.value).toFixed(2)
  },['discount'])  

});
export default ()=>{
  const [cashDesk] = useState()
  return <div>
    <Table 
        title="\u4E66\u5E97\u8BA2\u5355"
        cols={['<\u4E66\u540D','\u5355\u4EF7','\u6570\u91CF','\u5C0F\u8BA1']}
        rows={
          [
            ...cashDesk.orders.map((order,index)=>[
                order.book,
                \`\uFFE5\${order.price}\`,
                ()=>(<div>
                  <Button onClick={()=>order.count--}>-</Button>
                  {order.count}
                  <Button onClick={()=>order.count++}>+</Button>
                </div>),
                \`\uFFE5\${order.total}\`
            ]),
            ['\u6298\u6263',null,null,()=><>{$('discount')}</>],
            ['\u603B\u8BA1',null,null,()=><>\uFFE5{$('total')}</>]
          ]
        }         
    /> 
  </div>  
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":I,"x-react-components":h},renderOpts:{compile:function(){var r=M()(_()().mark(function s(){var m,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(m=g.sent).default.apply(m,u));case 3:case"end":return g.stop()}},s)}));function n(){return r.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-2":{component:y.memo(y.lazy(M()(_()().mark(function r(){var n,s,m,u,f,g,S,N,E,R,O,L;return _()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=$.sent,s=n.createStore,m=n.delay,u=n.computed,$.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return f=$.sent,g=f.Button,S=f.Loading,N=f.Table,E=s({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(F){return Math.floor(F.price*F.count)}}],discount:u(function(){var w=M()(_()().mark(function F(Y){return _()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,m(2e3);case 2:return H.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return H.stop()}},F)}));return function(F){return w.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:u(function(){var w=M()(_()().mark(function F(Y){return _()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,m(2e3);case 2:return H.abrupt("return",(Y.orders.reduce(function(Q,q){return Q+q.total},0)*Y.discount.value).toFixed(2));case 3:case"end":return H.stop()}},F)}));return function(F){return w.apply(this,arguments)}}(),["discount"])}),R=E.state,O=E.$,L=E.useState,$.abrupt("return",{default:function(){var F=L(),Y=W()(F,1),Z=Y[0];return y.createElement("div",null,y.createElement(N,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(k()(Z.orders.map(function(H,Q){return[H.book,"\uFFE5".concat(H.price),function(){return y.createElement("div",null,y.createElement(g,{onClick:function(){return H.count--}},"-"),H.count,y.createElement(g,{onClick:function(){return H.count++}},"+"))},"\uFFE5".concat(H.total)]})),[["\u6298\u6263",null,null,function(){return y.createElement(y.Fragment,null,Z.discount.loading?y.createElement(S,null):Z.discount.value)}],["\u603B\u8BA1",null,null,function(){return y.createElement(y.Fragment,null,Z.total.loading?y.createElement(S,null):Z.total.value)}]])}))}});case 14:case"end":return $.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
import {  ColorBlock,Button,Divider,Loading,Layout,JsonView,Table } from "x-react-components"

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore\u6700\u4F73\u5B9E\u8DF5',
      price: 10,
      count: 1,
      // \u5C0F\u8BA1
      total: (scope)=> Math.floor(scope.price*scope.count)
    }
  ],
  //  \u6298\u6263 \uFF1A\u5411\u540E\u53F0\u8BF7\u6C42\u6298\u6263
  discount: computed(async (scope)=>{
    // \u5982await fetch(\`/api/discount?userId=1&total=\${scope.total}....\`) 
    await delay(2000)
    return  (0.5 + Math.random()).toFixed(2)
  },['orders.*.total'],{
    initial:0.9
  }),
  // \u603B\u8BA1
  total: computed(async (scope)=>{ 
    await delay(2000)
    return (scope.orders.reduce((acc,cur)=>acc+cur.total,0)*scope.discount.value).toFixed(2)
  },['discount'])  

});
export default ()=>{
  const [cashDesk] = useState()
  return <div>
    <Table 
        title="\u4E66\u5E97\u8BA2\u5355"
        cols={['<\u4E66\u540D','\u5355\u4EF7','\u6570\u91CF','\u5C0F\u8BA1']}
        rows={
          [
            ...cashDesk.orders.map((order,index)=>[
                order.book,
                \`\uFFE5\${order.price}\`,
                ()=>(<div>
                  <Button onClick={()=>order.count--}>-</Button>
                  {order.count}
                  <Button onClick={()=>order.count++}>+</Button>
                </div>),
                \`\uFFE5\${order.total}\`
            ]),
            ['\u6298\u6263',null,null,()=><>{
                cashDesk.discount.loading ? <Loading/> : cashDesk.discount.value
            }</>],
            ['\u603B\u8BA1',null,null,()=>{
              return <>{
                cashDesk.total.loading ? <Loading/> : cashDesk.total.value
              }</>
            }]
          ]
        }         
    /> 
  </div>  
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":I,"x-react-components":h},renderOpts:{compile:function(){var r=M()(_()().mark(function s(){var m,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(m=g.sent).default.apply(m,u));case 3:case"end":return g.stop()}},s)}));function n(){return r.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-3":{component:y.memo(y.lazy(M()(_()().mark(function r(){var n,s,m,u,f,g,S,N,E,R,O,L,j,$,w;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=Y.sent,s=n.createStore,m=n.delay,u=n.computed,f=n.useStore,Y.next=9,Promise.resolve().then(e.bind(e,3543));case 9:return g=Y.sent,S=g.Input,N=g.Button,E=g.Loading,R=g.Table,O=function(H){return Math.floor(H.price*H.count)},L=s({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:O}],discount:u(function(){var Z=M()(_()().mark(function H(Q){return _()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,m(2e3);case 2:return X.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return X.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:u(function(){var Z=M()(_()().mark(function H(Q){return _()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,m(2e3);case 2:return X.abrupt("return",(Q.orders.reduce(function(se,ue){return se+ue.total},0)*Q.discount.value).toFixed(2));case 3:case"end":return X.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["discount"])}),j=L.state,$=L.$,w=L.useState,Y.abrupt("return",{default:function(){var H=w(),Q=W()(H,1),q=Q[0],X=f({book:"\u7CBE\u901AAutoStore",price:10,count:1}),se=X.state,ue=X.useForm,de=ue();return y.createElement("div",null,y.createElement(R,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(k()(q.orders.map(function(Ie,he){return[Ie.book,"\uFFE5".concat(Ie.price),function(){return y.createElement("div",null,y.createElement(N,{onClick:function(){return Ie.count--}},"-"),Ie.count,y.createElement(N,{onClick:function(){return Ie.count++}},"+"))},"\uFFE5".concat(Ie.total)]})),[["\u6298\u6263",null,null,function(){return y.createElement(y.Fragment,null,q.discount.loading?y.createElement(E,null):q.discount.value)}],["\u603B\u8BA1",null,null,function(){return y.createElement(y.Fragment,null,q.total.loading?y.createElement(E,null):q.total.value)}]])},y.createElement("form",de,y.createElement("h5",null,"\u65B0\u589E\u8BA2\u5355"),y.createElement(S,{name:"book"}),y.createElement(S,{name:"price"}),y.createElement(S,{name:"count"}),y.createElement(N,{onClick:function(){j.orders.push(l()(l()({},se),{},{total:O}))}},"Add"))))}});case 17:case"end":return Y.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed,useStore } from '@autostorejs/react';
import {Input, ColorBlock,Button,Divider,Loading,Layout,JsonView,Table } from "x-react-components"


const calcOrderTotal = (scope)=> Math.floor(scope.price*scope.count)

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore\u6700\u4F73\u5B9E\u8DF5',
      price: 10,
      count: 1,
      // \u5C0F\u8BA1
      total: calcOrderTotal
    }
  ],
  //  \u6298\u6263 \uFF1A\u5411\u540E\u53F0\u8BF7\u6C42\u6298\u6263
  discount: computed(async (scope)=>{
    // \u5982await fetch(\`/api/discount?userId=1&total=\${scope.total}....\`) 
    await delay(2000)
    return  (0.5 + Math.random()).toFixed(2)
  },['orders.*.total'],{
    initial:0.9
  }),
  // \u603B\u8BA1
  total: computed(async (scope)=>{ 
    await delay(2000)
    return (scope.orders.reduce((acc,cur)=>acc+cur.total,0)*scope.discount.value).toFixed(2)
  },['discount'])  

});
export default ()=>{
  const [cashDesk] = useState()

  const { state:newOrder,useForm } = useStore({
      book:'\u7CBE\u901AAutoStore',
      price:10,
      count:1 
  })
  const newOrderFrom = useForm()

  return (<div>
    <Table 
        title="\u4E66\u5E97\u8BA2\u5355"
        cols={['<\u4E66\u540D','\u5355\u4EF7','\u6570\u91CF','\u5C0F\u8BA1']}
        rows={[
            ...cashDesk.orders.map((order,index)=>[
                order.book,
                \`\uFFE5\${order.price}\`,
                ()=>(<div>
                  <Button onClick={()=>order.count--}>-</Button>
                  {order.count}
                  <Button onClick={()=>order.count++}>+</Button>
                </div>),
                \`\uFFE5\${order.total}\`
            ]),
            ['\u6298\u6263',null,null,()=><>{
                cashDesk.discount.loading ? <Loading/> : cashDesk.discount.value
            }</>],
            ['\u603B\u8BA1',null,null,()=>{
              return <>{
                cashDesk.total.loading ? <Loading/> : cashDesk.total.value
              }</>
            }]
        ]}         
    >
      <form {...newOrderFrom}>
          <h5>\u65B0\u589E\u8BA2\u5355</h5>
          <Input name='book'></Input>
          <Input name='price'></Input>
          <Input name='count'></Input>
          <Button onClick={()=>{
            state.orders.push({
              ...newOrder,
              total:calcOrderTotal
            })
          }}>Add</Button>
      </form>
    </Table> 
  </div>)  
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":I,"x-react-components":h},renderOpts:{compile:function(){var r=M()(_()().mark(function s(){var m,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(m=g.sent).default.apply(m,u));case 3:case"end":return g.stop()}},s)}));function n(){return r.apply(this,arguments)}return n}()}}}},71379:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(67409),K={}},6208:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(34040),K={}},61242:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(34934),K={}},26916:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(8468),D=e(29355),W=e(3543),p={"docs-guide-signal-about-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.createStore,u.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=u.sent,h=I.Button,v=I.ColorBlock,r=C({age:18}),n=r.state,s=r.$,u.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(v,null,"Age+Signal :",s("age")),B.createElement(v,null,"Age :",n.age),B.createElement(h,{onClick:function(){return n.age=n.age+1}},"+Age"))}});case 11:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state , $ } = createStore({
  age:18
})

export default () => {

  return <div>
      {/* \u5F15\u5165Signal\u673A\u5236\uFF0C\u53EF\u4EE5\u5C40\u90E8\u66F4\u65B0Age */}
      <ColorBlock>Age+Signal :{$('age')}</ColorBlock>
      {/* \u5F53\u76F4\u63A5\u66F4\u65B0Age\u65F6\uFF0C\u4EC5\u5728\u7EC4\u4EF6\u5F53\u91CD\u65B0\u6E32\u67D3\u65F6\u66F4\u65B0 */}
      <ColorBlock>Age :{state.age}</ColorBlock>
      <Button onClick={()=>state.age=state.age+1}>+Age</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},74496:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(36518),K={}},82301:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(30399),D=e(29355),W=e(3543),p={"docs-guide-signal-computed-render-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=n.sent,h=I.Button,v=I.ColorBlock,n.abrupt("return",{default:function(){var m=C({user:{age:18}}),u=m.state,f=m.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},f(function(g){var S=g.value;return B.createElement("div",null,S)},function(g){return g.user.age})),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
        // \u6E32\u67D3\u51FD\u6570
        ({value})=>{
          return <div>{value}</div>
        },
        // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
        (scope)=>{
          return  scope.user.age
        })
      }</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-computed-render-demo-1":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=s.sent,C=y.useStore,I=y.computed,s.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return h=s.sent,v=h.Button,r=h.ColorBlock,s.abrupt("return",{default:function(){var u=C({user:{age:18}}),f=u.state,g=u.$;return B.createElement("div",null,B.createElement(r,{name:"Age"},g(function(S){var N=S.value;return B.createElement("div",null,N)},I(function(S){return S.user.age}))),B.createElement(v,{onClick:function(){return f.user.age++}},"+Age"))}});case 11:case"end":return s.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
          // \u6E32\u67D3\u51FD\u6570
          ({value})=>{
            return <div>{value}</div>
          },
          // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
          computed((scope)=>{
            return  scope.user.age
          })
        )
      }</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-computed-render-demo-2":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.useStore,I=y.delay,h=y.computed,u.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return v=u.sent,r=v.Button,n=v.ColorBlock,s=v.Loading,u.abrupt("return",{default:function(){var g=C({order:{price:10,count:1}}),S=g.state,N=g.$;return B.createElement("div",null,B.createElement(n,{name:"Price"},N("order.price")),B.createElement(n,{name:"Count"},N("order.count")),B.createElement(n,{name:"Total"},N(function(E){var R=E.value,O=E.loading;return B.createElement("div",null,O?B.createElement(s,{title:"\u8BA1\u7B97\u4E2D..."}):R,"\u{1F4B8}\u{1F4B8}")},h(function(){var E=k()(l()().mark(function R(O){return l()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,I(1e3);case 2:return j.abrupt("return",O.order.price*O.order.count);case 3:case"end":return j.stop()}},R)}));return function(R){return E.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),B.createElement(r,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock,Loading } from "x-react-components"

export default () => {
  const { state, $ } = useStore({
    order:{
      price:10,
      count:1 
    }  
  })
  return <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$(
        // \u6E32\u67D3\u51FD\u6570
        ({value,loading})=>{ 
          return <div>
            {loading ? <Loading title="\u8BA1\u7B97\u4E2D..."/> : value }\u{1F4B8}\u{1F4B8}
          </div>
        },
        // \u5F02\u6B65computed
        computed(async (scope)=>{
          await delay(1000)
          return  scope.order.price * scope.order.count
        },['order.price','order.count'],{initial:10})
      )}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},27516:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(8809),D=e(29355),W=e(3543),p={"docs-guide-signal-custom-render-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=n.sent,h=I.Button,v=I.ColorBlock,n.abrupt("return",{default:function(){var m=C({user:{age:18}}),u=m.state,f=m.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},f(function(g){var S=g.value;return B.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},B.createElement("span",{style:{flexGrow:1}},S),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
* title: \u4FE1\u53F7\u7EC4\u4EF6
* description: \`$\`\u662F\`signal\`\u7684\u7B80\u5199    
*/
import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
        // \u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570
        ({value})=>{
          return <div style={{position:'relative',display:'flex',alignItems:'center',color:'red',background:"white"}}>
            <span style={{flexGrow:1}}>{value}</span>
            <Button onClick={()=>state.user.age++}>+Age</Button>
          </div>
        },
        // \u72B6\u6001\u6570\u636E\u7684\u8DEF\u5F84
        "user.age"
      )}</ColorBlock> 
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-custom-render-demo-1":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n;return l()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=m.sent,C=y.useStore,I=y.delay,h=y.computed,m.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return v=m.sent,r=v.Button,n=v.ColorBlock,m.abrupt("return",{default:function(){var f=C({order:{price:100,count:1,total:h(function(){var R=k()(l()().mark(function O(L){return l()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,I();case 2:return $.abrupt("return",L.price*L.count);case 3:case"end":return $.stop()}},O)}));return function(O){return R.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),g=f.state,S=f.$,N=f.useAsyncState,E=N("order.total");return B.createElement("div",null,B.createElement(n,{name:"Price"},S("order.price")),B.createElement(n,{name:"Count"},S("order.count")),B.createElement(n,{name:"Total",loading:E.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total.value")),B.createElement(n,{name:"Total",loading:E.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total")),B.createElement(r,{onClick:function(){return g.order.count++}},"+Count"))}});case 12:case"end":return m.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

 
export default () => {
    const { state , $,useAsyncState } = useStore({
    order:{
      price: 100,
      count: 1,
      total: computed(async (order)=>{
        await delay()
        return order.price * order.count
      },['order.price','order.count'],{initial:100})
    }
  })
  const total = useAsyncState("order.total")
  return <div> 
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total" loading={total.loading} comment="\u5EF6\u8FDF\u66F4\u65B0">{$('order.total.value')}</ColorBlock>
      <ColorBlock name="Total" loading={total.loading}  comment="\u5EF6\u8FDF\u66F4\u65B0">{$('order.total')}</ColorBlock>
      <Button onClick={()=>state.order.count++}>+Count</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-custom-render-demo-2":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s,m,u;return l()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=g.sent,C=y.createStore,I=y.computed,h=y.delay,g.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return v=g.sent,r=v.Button,n=v.ColorBlock,s=C({order:{price:100,count:1,total:I(function(){var S=k()(l()().mark(function N(E){return l()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,h(2e3);case 2:return O.abrupt("return",E.price*E.count);case 3:case"end":return O.stop()}},N)}));return function(N){return S.apply(this,arguments)}}(),["./price","./count"])}}),m=s.state,u=s.$,g.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(n,{name:"Price"},u("order.price")),B.createElement(n,{name:"Count"},u("order.count")),B.createElement(n,{name:"Total"},u(function(N){var E=N.value,R=N.loading;return B.createElement(B.Fragment,null,R&&B.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!R&&B.createElement("span",null,E,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),B.createElement(r,{onClick:function(){return m.order.count++}},"Count++"))}});case 13:case"end":return g.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state ,$ } = createStore({
  order:{
    price:100,
    count:1,
    total:computed(async (order)=>{
      await delay(2000)
      return order.price * order.count
    },["./price","./count"])
  }
})

export default () => {

  return <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$(({value,loading})=>{
        return <>
            {loading && <span>\u6B63\u5728\u8BA1\u7B97...\u23F3</span>}
            {!loading && <span>{value}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}</span>}
        </>
      },"order.total")}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},9379:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(95687),K={}},83557:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(13539),D=e(29355),W=e(3543),p={"docs-guide-signal-state-render-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=n.sent,h=I.Button,v=I.ColorBlock,n.abrupt("return",{default:function(){var m=C({user:{age:18}}),u=m.state,f=m.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},f("user.age")),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
* title: \u4FE1\u53F7\u7EC4\u4EF6
* description: \`$\`\u662F\`signal\`\u7684\u7B80\u5199 
*/
import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$('user.age')}</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-state-render-demo-1":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s,m;return l()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=f.sent,C=y.createStore,f.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=f.sent,h=I.Button,v=I.ColorBlock,r=C({user:{firstName:"\u5F20",lastName:"\u4E09"}}),n=r.state,s=r.signal,m=r.$,f.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(v,{name:"FirstName"},m("user.firstName")),B.createElement(v,{name:"LastName"},m("user.lastName")),B.createElement(v,null,"FullName :",m(function(S){return S.user.firstName+" "+S.user.lastName})),B.createElement(v,null,"FullName :",m(function(S){return B.createElement("span",{style:{color:"yellow"}},S.user.firstName," - ",S.user.lastName)})),B.createElement(h,{onClick:function(){return n.user.firstName=n.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),B.createElement(h,{onClick:function(){return n.user.lastName=n.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return f.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state ,signal, $ } = createStore({
  user:{
    firstName:"\u5F20",
    lastName:"\u4E09"
  }
})

export default () => {
  return <div>
      <ColorBlock name="FirstName">{$('user.firstName')}</ColorBlock>
      <ColorBlock name="LastName">{$('user.lastName')}</ColorBlock>
      <ColorBlock>FullName :{$(state=>state.user.firstName + ' ' + state.user.lastName)}</ColorBlock>
      <ColorBlock>FullName :{$(state=><span style={{color:'yellow'}}>{state.user.firstName} - {state.user.lastName}</span>)}</ColorBlock>
      <Button onClick={()=>state.user.firstName=state.user.firstName+'\u2764\uFE0F'}>Change FirstName</Button>
      <Button onClick={()=>state.user.lastName=state.user.lastName+'\u2708\uFE0F'}>Change LastName</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-state-render-demo-2":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s,m,u;return l()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=g.sent,C=y.createStore,I=y.delay,h=y.computed,g.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return v=g.sent,r=v.Button,n=v.ColorBlock,s=C({order:{price:100,count:1,total:h(function(){var S=k()(l()().mark(function N(E){return l()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,I(1e3);case 2:return O.abrupt("return",E.price*E.count);case 3:case"end":return O.stop()}},N)}));return function(N){return S.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),m=s.state,u=s.$,g.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(n,{name:"Price"},u("order.price")),B.createElement(n,{name:"Count"},u("order.count")),B.createElement(n,{name:"Total"},u("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),B.createElement(n,{name:"Total"},u("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),B.createElement(r,{onClick:function(){return m.order.count++}},"+Count"))}});case 13:case"end":return g.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
* title: \u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6
* description: \`order.total\`\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
*/
import { createStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state, $ } = createStore({
  order:{
    price: 100,
    count: 1,
    total: computed(async (order)=>{
      await delay(1000)
      return order.price * order.count
    },['order.price','order.count'],{initial:100})
  }
})

export default () => {

  return <div> 
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$('order.total.value')}&nbsp;&nbsp;-&nbsp;&nbsp;\u5EF6\u8FDF\u66F4\u65B0</ColorBlock>
      <ColorBlock name="Total">{$('order.total')}&nbsp;&nbsp;-&nbsp;&nbsp;\u5EF6\u8FDF\u66F4\u65B0</ColorBlock>
      <Button onClick={()=>state.order.count++}>+Count</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},76875:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(43310),D=e(29355),W=e(3543),p={"docs-guide-signal-watch-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=n.sent,h=I.Button,v=I.ColorBlock,n.abrupt("return",{default:function(){var m=C({user:{age:18}}),u=m.state,f=m.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},f(function(g){var S=g.value;return B.createElement("div",null,S)},function(g){return g.user.age})),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
        // \u6E32\u67D3\u51FD\u6570
        ({value})=>{
          return <div>{value}</div>
        },
        // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
        (scope)=>{
          return  scope.user.age
        })
      }</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-watch-demo-1":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=s.sent,C=y.useStore,I=y.computed,s.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return h=s.sent,v=h.Button,r=h.ColorBlock,s.abrupt("return",{default:function(){var u=C({user:{age:18}}),f=u.state,g=u.$;return B.createElement("div",null,B.createElement(r,{name:"Age"},g(function(S){var N=S.value;return B.createElement("div",null,N)},I(function(S){return S.user.age}))),B.createElement(v,{onClick:function(){return f.user.age++}},"+Age"))}});case 11:case"end":return s.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
          // \u6E32\u67D3\u51FD\u6570
          ({value})=>{
            return <div>{value}</div>
          },
          // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
          computed((scope)=>{
            return  scope.user.age
          })
        )
      }</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}},"docs-guide-signal-watch-demo-2":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.useStore,I=y.delay,h=y.computed,u.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return v=u.sent,r=v.Button,n=v.ColorBlock,s=v.Loading,u.abrupt("return",{default:function(){var g=C({order:{price:10,count:1}}),S=g.state,N=g.$;return B.createElement("div",null,B.createElement(n,{name:"Price"},N("order.price")),B.createElement(n,{name:"Count"},N("order.count")),B.createElement(n,{name:"Total"},N(function(E){var R=E.value,O=E.loading;return B.createElement("div",null,O?B.createElement(s,{title:"\u8BA1\u7B97\u4E2D..."}):R,"\u{1F4B8}\u{1F4B8}")},h(function(){var E=k()(l()().mark(function R(O){return l()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,I(1e3);case 2:return j.abrupt("return",O.order.price*O.order.count);case 3:case"end":return j.stop()}},R)}));return function(R){return E.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),B.createElement(r,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock,Loading } from "x-react-components"

export default () => {
  const { state, $ } = useStore({
    order:{
      price:10,
      count:1 
    }  
  })
  return <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$(
        // \u6E32\u67D3\u51FD\u6570
        ({value,loading})=>{ 
          return <div>
            {loading ? <Loading title="\u8BA1\u7B97\u4E2D..."/> : value }\u{1F4B8}\u{1F4B8}
          </div>
        },
        // \u5F02\u6B65computed
        computed(async (scope)=>{
          await delay(1000)
          return  scope.order.price * scope.order.count
        },['order.price','order.count'],{initial:10})
      )}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},8451:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(36586),K={}},90266:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(75697),K={}},69109:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return C}});var l=e(29008),K=e.n(l),k=e(28633),B=e.n(k),_=e(70958),D=e.n(_),W=e(92379),p=e(76933),M=e(3543),y=e(29355),C={"docs-guide-store-render-demo-0":{component:W.memo(W.lazy(D()(K()().mark(function I(){var h,v,r,n,s,m,u,f,g,S,N,E;return K()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return h=O.sent,v=h.default,r=h.createContext,n=h.useContext,s=h.useState,O.next=9,Promise.resolve().then(e.bind(e,3543));case 9:return m=O.sent,u=m.ColorBlock,f=m.Button,g=m.Divider,S=r({firstName:"Zhang",lastName:"Fisher",age:18}),N=v.memo(function(L){var j=n(S);return v.createElement(u,{name:"\u5B50\u7EC4\u4EF6:".concat(L.name)},v.createElement("span",null,"Hello :",j.firstName," ",j.lastName))}),E=0,O.abrupt("return",{default:function(){var j=s({firstName:"Zhang",lastName:"Fisher",age:18}),$=B()(j,2),w=$[0],F=$[1];return v.createElement(S.Provider,{value:w},v.createElement(g,{title:"\u6839\u7EC4\u4EF6"}),v.createElement(u,{name:"FullName"},w.firstName," ",w.lastName),v.createElement(u,{name:"Age"},"Age :",w.age),v.createElement(g,{title:"\u5B50\u7EC4\u4EF6"}),v.createElement(N,{name:"A"}),v.createElement(N,{name:"B"}),v.createElement(f,{onClick:function(){F({firstName:"Zhang",lastName:"Fisher",age:++E})}},"+Age"))}});case 17:case"end":return O.stop()}},I)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
import { ColorBlock,Button,Divider } from "x-react-components"

const ctx = createContext({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
})

const Child = React.memo((props)=>{
    const context=useContext(ctx)
    return <ColorBlock name={\`\u5B50\u7EC4\u4EF6:\${props.name}\`}>
      <span>Hello :{context.firstName}{' '}{context.lastName}</span> 
    </ColorBlock>
})
let count:number = 0
export default ()=>{
  const [user,setUser] = useState({
    firstName:"Zhang",
    lastName:"Fisher",
    age:18
  })
  return <ctx.Provider value={user}>
      <Divider title="\u6839\u7EC4\u4EF6"/>
      <ColorBlock name={'FullName'}>{user.firstName}{' '}{user.lastName}</ColorBlock>
      <ColorBlock name={'Age'}>Age :{user.age}</ColorBlock>
      <Divider title="\u5B50\u7EC4\u4EF6"/>
      <Child name="A"/>
      <Child name="B"/>
      <Button onClick={()=>{
        setUser({firstName:"Zhang",lastName:"Fisher",age:++count})
      }}>+Age</Button>
    </ctx.Provider>
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{react:V||(V=e.t(W,2)),"x-react-components":M},renderOpts:{compile:function(){var I=D()(K()().mark(function v(){var r,n=arguments;return K()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,e.e(6484).then(e.bind(e,56484));case 2:return m.abrupt("return",(r=m.sent).default.apply(r,n));case 3:case"end":return m.stop()}},v)}));function h(){return I.apply(this,arguments)}return h}()}},"docs-guide-store-render-demo-1":{component:W.memo(W.lazy(D()(K()().mark(function I(){var h,v,r,n,s,m,u,f,g,S,N,E;return K()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return h=O.sent,v=h.createStore,O.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return r=O.sent,n=r.default,O.next=10,Promise.resolve().then(e.bind(e,3543));case 10:return s=O.sent,m=s.ColorBlock,u=s.Button,f=s.Divider,g=v({firstName:"Zhang",lastName:"Fisher",age:18}),S=n.memo(function(L){var j=g.useState("firstName"),$=B()(j,1),w=$[0];return n.createElement(m,{name:"\u5B50\u7EC4\u4EF6:FirstName"},w)}),N=n.memo(function(L){var j=g.useState("lastName"),$=B()(j,1),w=$[0];return n.createElement(m,{name:"\u5B50\u7EC4\u4EF6:lastName"},w)}),E=0,O.abrupt("return",{default:function(){var j=g.useState("age"),$=B()(j,1),w=$[0];return n.createElement(n.Fragment,null,n.createElement(f,{title:"\u6839\u7EC4\u4EF6"}),n.createElement(m,{name:"FullName"},"Hello :",g.state.firstName," ",g.state.lastName),n.createElement(m,{name:"Age"},w),n.createElement(f,{title:"\u5B50\u7EC4\u4EF6"}),n.createElement(S,null),n.createElement(N,null),n.createElement(u,{onClick:function(){return g.state.age=g.state.age+1}},"+Age"),n.createElement(u,{onClick:function(){return g.state.firstName=g.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return O.stop()}},I)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import React from "react"
import { ColorBlock,Button,Divider } from "x-react-components"


const store = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
})

const FirstName = React.memo((props)=>{
    const [firstName] = store.useState('firstName') 
    return <ColorBlock name={\`\u5B50\u7EC4\u4EF6:FirstName\`}>
      {firstName} 
    </ColorBlock>
})
const LastName = React.memo((props)=>{
    const [lastName] = store.useState('lastName') 
    return <ColorBlock name={\`\u5B50\u7EC4\u4EF6:lastName\`}>
      {lastName}
    </ColorBlock>
})
let count=0

export default ()=>{ 
    const [age] = store.useState('age') 

  return <>
      <Divider title="\u6839\u7EC4\u4EF6"/>
      <ColorBlock name="FullName">Hello :{store.state.firstName}{' '}{store.state.lastName}</ColorBlock>
      <ColorBlock name="Age">{age}</ColorBlock>      
      <Divider title="\u5B50\u7EC4\u4EF6"/>
      <FirstName/>
      <LastName/>
      <Button onClick={()=>store.state.age=store.state.age+1}>+Age</Button>
      <Button onClick={()=>store.state.firstName=store.state.firstName+"."}>Change FirstName</Button>
    </>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,react:V||(V=e.t(W,2)),"x-react-components":M},renderOpts:{compile:function(){var I=D()(K()().mark(function v(){var r,n=arguments;return K()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,e.e(6484).then(e.bind(e,56484));case 2:return m.abrupt("return",(r=m.sent).default.apply(r,n));case 3:case"end":return m.stop()}},v)}));function h(){return I.apply(this,arguments)}return h}()}},"docs-guide-store-render-demo-2":{component:W.memo(W.lazy(D()(K()().mark(function I(){var h,v,r,n,s,m,u,f,g,S,N,E,R,O;return K()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return h=j.sent,v=h.createStore,j.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return r=j.sent,n=r.default,j.next=10,Promise.resolve().then(e.bind(e,3543));case 10:return s=j.sent,m=s.ColorBlock,u=s.Button,f=s.Divider,g=v({firstName:"Zhang",lastName:"Fisher",age:18}),S=g.state,N=g.$,E=function(){return n.createElement(m,{name:"\u5B50\u7EC4\u4EF6:FirstName"},N("firstName"))},R=function(){return n.createElement(m,{name:"\u5B50\u7EC4\u4EF6:LastName"},N("lastName"))},O=0,j.abrupt("return",{default:function(){return n.createElement(n.Fragment,null,n.createElement(f,{title:"\u6839\u7EC4\u4EF6"}),n.createElement(m,{name:"FullName"},N("firstName")," ",N("lastName")),n.createElement(m,{name:"Age"},N("age")," - ",++O),n.createElement(f,{title:"\u5B50\u7EC4\u4EF6"}),n.createElement(E,null),n.createElement(R,null),n.createElement(u,{onClick:function(){return S.age=S.age+1}},"+Age"),n.createElement(u,{onClick:function(){return S.firstName=S.firstName+"."}},"Change FirstName"),n.createElement(u,{onClick:function(){return S.lastName=S.lastName+"*"}},"Change LastName"))}});case 19:case"end":return j.stop()}},I)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import React,{createContext,useContext,useState} from "react"
import { ColorBlock,Button,Divider } from "x-react-components"
 
const {state,$ } = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
})

const FirstName = ()=>{
    return <ColorBlock name={\`\u5B50\u7EC4\u4EF6:FirstName\`}>{$('firstName')}</ColorBlock>
}
const LastName = ()=>{
    return <ColorBlock name={\`\u5B50\u7EC4\u4EF6:LastName\`}>{$('lastName')}</ColorBlock>
}

let count=0
export default ()=>{ 
  return <>
      <Divider title="\u6839\u7EC4\u4EF6"/>
      <ColorBlock name="FullName">{$('firstName')}{' '}{$('lastName')}</ColorBlock>
      <ColorBlock name="Age">{$('age')}{' - '}{++count}</ColorBlock>
      <Divider title="\u5B50\u7EC4\u4EF6"/>
      <FirstName/>
      <LastName/>      
      <Button onClick={()=>state.age=state.age+1}>+Age</Button>
      <Button onClick={()=>state.firstName=state.firstName+"."}>Change FirstName</Button>
      <Button onClick={()=>state.lastName=state.lastName+"*"}>Change LastName</Button>
    </>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,react:V||(V=e.t(W,2)),"x-react-components":M},renderOpts:{compile:function(){var I=D()(K()().mark(function v(){var r,n=arguments;return K()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,e.e(6484).then(e.bind(e,56484));case 2:return m.abrupt("return",(r=m.sent).default.apply(r,n));case 3:case"end":return m.stop()}},v)}));function h(){return I.apply(this,arguments)}return h}()}}}},18634:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(28633),l=e.n(V),K=e(29008),k=e.n(K),B=e(70958),_=e.n(B),D=e(92379),W=e(26437),p=e(29355),M=e(3543),y={"docs-guide-store-state-demo-0":{component:D.memo(D.lazy(_()(k()().mark(function C(){var I,h,v,r,n,s,m,u,f,g;return k()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=N.sent,h=I.createStore,v=I.computed,N.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return r=N.sent,n=r.Button,s=r.ColorBlock,m=h({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(R){return R.firstName+R.lastName},salary:v(function(){var E=_()(k()().mark(function R(O){return k()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",O.age*10);case 1:case"end":return j.stop()}},R)}));return function(R){return E.apply(this,arguments)}}(),["age"])}),u=m.state,f=m.useState,g=m.$,globalThis.state=u,N.abrupt("return",{default:function(){var R=f("age"),O=l()(R,2),L=O[0],j=O[1],$=f("salary"),w=l()($,2),F=w[0],Y=w[1],Z=f(function(X){return X.lastName},function(X,se){return se.lastName=X}),H=l()(Z,2),Q=H[0],q=H[1];return D.createElement("div",null,D.createElement(s,null,"Fullname :",u.firstName," ",Q),D.createElement(s,null,"Age :",L),D.createElement(s,null,"Salary: ",g("salary")),D.createElement(n,{onClick:function(){return j(L+1)}},"+Age"),D.createElement(n,{onClick:function(){return q(Q+".")}},"Change lastName"))}});case 13:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"
const { state,useState,$ } = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18,
  fullName:(user)=>user.firstName+user.lastName,
  salary:computed(async (user)=>{
    return user.age * 10
  },['age'])
})

globalThis.state = state

export default () => {
  const [age,setAge] = useState('age') 
  const [salary,setSalary] = useState('salary') 
  const [lastName,setLastName] = useState((state)=>state.lastName,(name,user)=>user.lastName=name) 

  return <div>    
      <ColorBlock>Fullname :{state.firstName}{' '}{lastName}</ColorBlock>
      <ColorBlock>Age :{age}</ColorBlock>
      <ColorBlock>Salary: {$('salary')}</ColorBlock>
      <Button onClick={()=>setAge(age+1)}>+Age</Button> 
      <Button onClick={()=>setLastName(lastName+'.')}>Change lastName</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(k()().mark(function h(){var v,r=arguments;return k()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}},"docs-guide-store-state-demo-1":{component:D.memo(D.lazy(_()(k()().mark(function C(){var I,h,v,r,n,s,m,u,f,g;return k()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=N.sent,h=I.createStore,N.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return v=N.sent,r=v.ColorBlock,N.next=10,Promise.resolve().then(e.bind(e,3543));case 10:return n=N.sent,s=n.Button,m=h({firstName:"Zhang",lastName:"Fisher",fullName:function(R){return R.firstName+R.lastName}}),u=m.useState,f=m.state,g=m.$,N.abrupt("return",{default:function(){var R=u(function(Z){return Z.firstName},function(Z,H){return H.firstName=Z}),O=l()(R,2),L=O[0],j=O[1],$=u(function(Z){return Z.fullName},function(Z,H){var Q=l()(Z,2),q=Q[0],X=Q[1];H.firstName=q,H.lastName=X}),w=l()($,2),F=w[0],Y=w[1];return D.createElement("div",null,D.createElement(r,{name:"FullName",value:F}),D.createElement(s,{onClick:function(){return j("<".concat(L,">"))}},"Change FirstName"),D.createElement(s,{onClick:function(){return Y(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock } from "x-react-components"
import { Button } from "x-react-components"

 
const { useState,state,$ } = createStore( {
  firstName:"Zhang",
  lastName:"Fisher",
  fullName:(state)=>state.firstName+state.lastName,
})


export default () => { 
  const [firstName,setFirstName] = useState((state)=>state.firstName,(value,state)=>state.firstName=value)
  const [fullName,setFullName] = useState<string,[string,string]>(
      (state)=>state.fullName,       // getter
      ([first,last],state)=>{        // \u53EF\u9009,setter
        state.firstName=first
        state.lastName=last
      }
  )
  return <div>
      <ColorBlock name="FullName" value={fullName}></ColorBlock>
      <Button onClick={()=>setFirstName(\`<\${firstName}>\`)}>Change FirstName</Button>
      <Button onClick={()=>setFullName(["Hello","Voerkai18n"])}>Change FullName</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(k()().mark(function h(){var v,r=arguments;return k()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}},"docs-guide-store-state-demo-2":{component:D.memo(D.lazy(_()(k()().mark(function C(){var I,h,v,r,n,s,m,u;return k()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=g.sent,h=I.createStore,g.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return v=g.sent,r=v.Button,n=v.ColorBlock,s=h({age:18}),m=s.state,u=s.$,g.abrupt("return",{default:function(){return D.createElement("div",null,D.createElement(n,null,"Age+Signal :",u("age")),D.createElement(n,null,"Age :",m.age),D.createElement(r,{onClick:function(){return m.age=m.age+1}},"+Age"))}});case 11:case"end":return g.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state , $ } = createStore({
  age:18
})

export default () => {

  return <div>
      {/* \u5F15\u5165Signal\u673A\u5236\uFF0C\u53EF\u4EE5\u5C40\u90E8\u66F4\u65B0Age */}
      <ColorBlock>Age+Signal :{$('age')}</ColorBlock>
      {/* \u5F53\u76F4\u63A5\u66F4\u65B0Age\u65F6\uFF0C\u4EC5\u5728\u7EC4\u4EF6\u5F53\u91CD\u65B0\u6E32\u67D3\u65F6\u66F4\u65B0 */}
      <ColorBlock>Age :{state.age}</ColorBlock>
      <Button onClick={()=>state.age=state.age+1}>+Age</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(k()().mark(function h(){var v,r=arguments;return k()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}}}},2385:function(te,b,e){e.r(b),e.d(b,{demos:function(){return p}});var V=e(29008),l=e.n(V),K=e(70958),k=e.n(K),B=e(92379),_=e(46574),D=e(29355),W=e(3543),p={"docs-guide-store-demo-0":{component:B.memo(B.lazy(k()(l()().mark(function M(){var y,C,I,h,v,r,n,s,m;return l()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=f.sent,C=y.useStore,f.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return I=f.sent,h=I.Button,v=I.ColorBlock,f.abrupt("return",{default:function(){var S=C({count:18}),N=S.state,E=S.$;return B.createElement("div",null,B.createElement(v,{name:"Count"},E("count")),B.createElement(h,{onClick:function(){return N.count++}},"Count++"))}});case 11:case"end":return f.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"
 

export default () => {
  const { state,$ } = useStore({
    count:18
  }) 

  return <div>    
      <ColorBlock name="Count">{$('count')}</ColorBlock>
      <Button onClick={()=>state.count++}>Count++</Button>
    </div>
} 

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var M=k()(l()().mark(function C(){var I,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(I=r.sent).default.apply(I,h));case 3:case"end":return r.stop()}},C)}));function y(){return M.apply(this,arguments)}return y}()}}}},78845:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(88015),K={}},60746:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(89809),K={}},63522:function(te,b,e){e.r(b),e.d(b,{demos:function(){return v}});var V=e(29008),l=e.n(V),K=e(12027),k=e.n(K),B=e(34180),_=e.n(B),D=e(24325),W=e.n(D),p=e(70958),M=e.n(p),y=e(92379),C=e(32453),I=e(29355),h=e(3543),v={"docs-guide-watch-objects-demo-0":{component:y.memo(y.lazy(M()(l()().mark(function r(){var n,s,m,u,f,g,S,N,E,R,O,L,j,$;return l()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=F.sent,s=n.createStore,m=n.watch,F.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return u=F.sent,f=u.Divider,g=u.ColorBlock,S=u.Button,N=u.Box,E=u.Input,R=s({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(Z){return Z.firstName+" "+Z.lastName},dirty:m(function(Y,Z){var H=Y.path,Q=Y.value;return Z.cache[H.join(".")]=!0,!0},function(Y){return["firstName","lastName"].includes(Y[Y.length-1])},{initial:!1})}}),O=R.state,L=R.useBindings,j=R.watchObjects,$=R.$,F.abrupt("return",{default:function(){var Z=L("user");return y.createElement("div",null,y.createElement(E,W()({label:"FirstName"},Z.firstName)),y.createElement(E,W()({label:"lastName"},Z.lastName)),y.createElement(f,null),y.createElement(N,null,y.createElement(g,{name:"FullName"},$("user.fullName")),y.createElement(g,{name:"Dirty"},$("user.dirty")),y.createElement(S,{onClick:function(){O.user.firstName="Zhang",O.user.lastName="Fisher",j.get("user.dirty").reset()}},"Reset")),y.createElement(N,null,y.createElement("div",null,"typeof(store.watchObjects)==",_()(j)),y.createElement("div",null,"store.watchObjects.size=",j.size),y.createElement("div",null,"store.watchObjects.size=",j.size),y.createElement("div",null,"store.watchObjects.keys()=",k()(j.keys()).join(" , "))))}});case 15:case"end":return F.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Box,Input } from "x-react-components"

 const { state,useBindings,watchObjects,$  } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:(user)=>{
      return user.firstName + " " + user.lastName
    }, 
    dirty:watch(({path,value},watchObj)=>{   
            //watchObj.cache\u662F\u4E00\u4E2A{...}\u5BF9\u8C61 
            watchObj.cache[path.join(".")] = true
            return true
        },
        (path)=>{
          // \u5728\u672C\u4F8B\u4E2D\uFF0C\u53EA\u6709firstName\u548ClastName\u4F1A\u89E6\u53D1dirty
          return ['firstName','lastName'].includes(path[path.length-1])
        },
        {initial:false})
  }
} )

export default ()=>{
  const bindings = useBindings('user')
  return (<div>
    <Input label="FirstName" {...bindings.firstName}/>
    <Input label="lastName" {...bindings.lastName}/> 
    <Divider/>
    <Box>
      <ColorBlock name="FullName">{$('user.fullName')}</ColorBlock>
      <ColorBlock name="Dirty">{$('user.dirty')}</ColorBlock>
      <Button onClick={()=>{
          state.user.firstName = "Zhang"
          state.user.lastName = "Fisher"
          // \u91CD\u7F6Edirty
          watchObjects.get("user.dirty").reset()
      }}>Reset</Button>
    </Box>
    <Box>
    <div>typeof(store.watchObjects)=={typeof(watchObjects)}</div>
    <div>store.watchObjects.size={watchObjects.size}</div>
    <div>store.watchObjects.size={watchObjects.size}</div>
    <div>store.watchObjects.keys()={[...watchObjects.keys()].join(" , ")}</div>
    </Box> 
  </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7F16\u8F91firstName\u6216lastName,\u4F1A\u89E6\u53D1dirty\u7684\u53D8\u5316",title:"\u4F7F\u7528watch\u529F\u80FD\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF"},context:{"@autostorejs/react":I,"x-react-components":h},renderOpts:{compile:function(){var r=M()(l()().mark(function s(){var m,u=arguments;return l()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(m=g.sent).default.apply(m,u));case 3:case"end":return g.stop()}},s)}));function n(){return r.apply(this,arguments)}return n}()}}}},66495:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),K=e(28633),k=e.n(K),B=e(70958),_=e.n(B),D=e(92379),W=e(30264),p=e(29355),M=e(3543),y={"docs-guide-watch-state-demo-0":{component:D.memo(D.lazy(_()(l()().mark(function C(){var I,h,v,r,n,s,m,u,f;return l()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return I=S.sent,h=I.createStore,v=I.watch,S.next=7,Promise.resolve().then(e.bind(e,3543));case 7:return r=S.sent,n=r.Input,s=r.Button,m=h({orders:[{name:"AutoStore\u5B9E\u6218\u6307\u5357",price:100,count:1,total:function(E){return E.price*E.count}},{name:"\u6DF1\u5165\u6D45\u51FAAutoStore",price:98,count:1,total:function(E){return E.price*E.count}}],total:v(function(N){return u.orders.reduce(function(E,R){return E+R.count*R.price},0)},function(N){return N[N.length-1]==="count"},{initial:198})}),u=m.state,f=m.useState,S.abrupt("return",{default:function(){var E=f(),R=k()(E,1),O=R[0];return D.createElement("table",{className:"table"},D.createElement("thead",null,D.createElement("tr",null,D.createElement("th",null,"Name"),D.createElement("th",null,"Price"),D.createElement("th",null,"Count"),D.createElement("th",null,"Total"))),D.createElement("tbody",null,O.orders.map(function(L,j){return D.createElement("tr",{key:j},D.createElement("td",null,L.name),D.createElement("td",null,L.price),D.createElement("td",null,D.createElement(s,{onClick:function(){return L.count--}},"-"),D.createElement(n,{value:L.count,style:{display:"inline-flex"}}),D.createElement(s,{onClick:function(){return L.count++}},"+")),D.createElement("td",null,L.total))}),D.createElement("tr",null,D.createElement("td",{colSpan:3},"Total"),D.createElement("td",null,u.total))))}});case 12:case"end":return S.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-watch-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
import { Divider,Input,Button } from "x-react-components"

const { state,useState } = createStore({
  orders:[
    { name:"AutoStore\u5B9E\u6218\u6307\u5357",
      price:100,
      count:1,
      total:(book)=>book.price*book.count
    },
    { name:"\u6DF1\u5165\u6D45\u51FAAutoStore",
      price:98,
      count:1,
      total:(book)=>book.price*book.count
    }
  ],    
  total: watch<true>((count)=>{
     return state.orders.reduce((total,book)=>total+book.count*book.price,0)
    },
    // \u5F53price\u6216count\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1\u4FA6\u542C\u5668\u51FD\u6570\u7684\u6267\u884C
    (path:string[])=>{
        return path[path.length-1]==='count'
      },{    
      initial:198         // total\u7684\u521D\u59CB\u503C
    })
})
 
export default ()=>{ 
  const [ bookshop ] = useState()
  return (<table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Count</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {bookshop.orders.map((book,index)=>
          <tr key={index}>
            <td>{book.name}</td>
            <td>{book.price}</td>
            <td>
              <Button onClick={()=>book.count--}>-</Button>
              <Input value={book.count} style={{display:"inline-flex"}}/>
              <Button onClick={()=>book.count++}>+</Button>
            </td>
            <td>{book.total}</td>
          </tr>
        )}
        <tr>
          <td colSpan={3}>Total</td>
          <td>{state.total}</td>
        </tr>
        </tbody>
    </table>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":p,"x-react-components":M},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.e(6484).then(e.bind(e,56484));case 2:return s.abrupt("return",(v=s.sent).default.apply(v,r));case 3:case"end":return s.stop()}},h)}));function I(){return C.apply(this,arguments)}return I}()}}}},3902:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return h}});var l=e(24325),K=e.n(l),k=e(29008),B=e.n(k),_=e(28633),D=e.n(_),W=e(70958),p=e.n(W),M=e(92379),y=e(95601),C=e(29355),I=e(3543),h={"docs-guide-watch-store-demo-0":{component:M.memo(M.lazy(p()(B()().mark(function v(){var r,n,s,m,u,f,g,S,N,E,R,O,L,j,$,w,F;return B()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=Z.sent,n=r.createStore,s=r.computed,m=r.useStore,Z.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return u=Z.sent,f=u.Box,g=u.Button,S=u.ColorBlock,N=u.Layout,E=u.CheckBox,Z.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return R=Z.sent,O=R.useEffect,L=R.useRef,j=n({order:{price:10,count:2,total:s(function(H){return H.price*H.count})}}),$=j.state,w=j.watch,F=j.$,Z.abrupt("return",{default:function(){var Q=L(),q=m({operates:"*"}),X=q.useState("operates"),se=D()(X,2),ue=se[0],de=se[1];return O(function(){var Ie=w(function(he){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(he.type," ").concat(he.path.join("."),"</p>"))},{operates:ue});return function(){return Ie.off()}},[ue]),M.createElement(N,{style:{maxHeight:"400px"}},M.createElement("div",null,M.createElement(S,{name:"Price"},F("order.price")),M.createElement(S,{name:"Count"},M.createElement(g,{onClick:function(){$.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),F("order.count"),M.createElement(g,{onClick:function(){$.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),M.createElement(S,{name:"Total"},F("order.total")),M.createElement(f,null,M.createElement(E,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:ue==="*",onChange:function(he){de(he.target.checked?"*":"read")}}),M.createElement(E,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:ue==="write",onChange:function(he){de(he.target.checked?"write":"*")}}),M.createElement(E,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:ue==="read",onChange:function(he){de(he.target.checked?"read":"*")}})),M.createElement(g,{onClick:function(){Q.current.innerHTML=""}},"Clear")),M.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return Z.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
import { Box,Button,ColorBlock,Layout,CheckBox } from "x-react-components"
import { useState,useEffect,useRef } from "react" 

const { state,watch,$ } = createStore({
  order:{
    price:10,
    count:2,
    total:computed((order)=>{    
      return order.price*order.count
    })
  } 
})


export default ()=>{
  const ref = useRef()

  const op = useStore({
    operates:'*'
  })
  const [ops,setOps] = op.useState('operates')

  useEffect(()=>{
    const watcher = watch((operate)=>{      
        ref.current.insertAdjacentHTML("beforeend",\`<p style='margin:2px;'}>\${operate.type} \${operate.path.join('.')}</p>\`)
      },{
        operates:ops
      })
    return ()=>watcher.off()
  },[ops])  

  return (<Layout style={{maxHeight:'400px'}}>
    <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">
        <Button onClick={()=>{
          state.order.count--
          ref.current.insertAdjacentHTML("beforeend",\`----------\`)
        }}>-</Button>
        {$('order.count')}
        <Button onClick={()=>{
            state.order.count++
            ref.current.insertAdjacentHTML("beforeend",\`----------\`)
        }}>+</Button>
      </ColorBlock>
      <ColorBlock name="Total">{$('order.total')}</ColorBlock>
      <Box>        
            <CheckBox id="watch-all" label="\u76D1\u542C\u6240\u6709\u64CD\u4F5C" checked={ops==='*'} onChange={(e)=>{
              setOps(e.target.checked ? '*' : 'read')
            }}/>  
            <CheckBox id="watch-write" label="\u53EA\u76D1\u542C\u5199\u64CD\u4F5C" checked={ops==='write'} onChange={(e)=>{   
              setOps(e.target.checked ?    'write' : '*')
            }}/>  
            <CheckBox id="watch-read" label="\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C" checked={ops==='read'} onChange={(e)=>{
              setOps(e.target.checked ? 'read' : '*')
            }}/> 
      </Box>
      <Button onClick={()=>{
        ref.current.innerHTML = ''
      }}>Clear</Button>
    </div>
    <div ref={ref} style={{      
        overflowY:'auto',        
      }}>
    </div>
  </Layout>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":I,react:V||(V=e.t(M,2))},renderOpts:{compile:function(){var v=p()(B()().mark(function n(){var s,m=arguments;return B()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(6484).then(e.bind(e,56484));case 2:return f.abrupt("return",(s=f.sent).default.apply(s,m));case 3:case"end":return f.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}},"docs-guide-watch-store-demo-1":{component:M.memo(M.lazy(p()(B()().mark(function v(){var r,n,s,m,u,f,g,S,N,E,R,O,L,j,$,w,F;return B()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=Z.sent,n=r.createStore,s=r.computed,m=r.useStore,Z.next=8,Promise.resolve().then(e.bind(e,3543));case 8:return u=Z.sent,f=u.Box,g=u.Button,S=u.ColorBlock,N=u.Layout,E=u.CheckBox,Z.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return R=Z.sent,O=R.useEffect,L=R.useRef,j=n({order:{price:10,count:2,total:s(function(H){return H.price*H.count})}}),$=j.state,w=j.watch,F=j.$,Z.abrupt("return",{default:function(){var Q=L(),q=m({operates:"*"}),X=q.useState("operates"),se=D()(X,2),ue=se[0],de=se[1];return O(function(){var Ie=w("order.total",function(he){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(he.type," ").concat(he.path.join("."),"</p>"))},{operates:ue});return function(){return Ie.off()}},[ue]),M.createElement(N,{style:{maxHeight:"400px"}},M.createElement("div",null,M.createElement(S,{name:"Price"},F("order.price")),M.createElement(S,{name:"Count"},M.createElement(g,{onClick:function(){$.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),F("order.count"),M.createElement(g,{onClick:function(){$.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),M.createElement(S,{name:"Total"},F("order.total")),M.createElement(f,null,M.createElement(E,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:ue==="*",onChange:function(he){de(he.target.checked?"*":"read")}}),M.createElement(E,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:ue==="write",onChange:function(he){de(he.target.checked?"write":"*")}}),M.createElement(E,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:ue==="read",onChange:function(he){de(he.target.checked?"read":"*")}})),M.createElement(g,{onClick:function(){Q.current.innerHTML=""}},"Clear")),M.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return Z.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
import { Box,Button,ColorBlock,Layout,CheckBox } from "x-react-components"
import { useState,useEffect,useRef } from "react" 

const { state,watch,$ } = createStore({
  order:{
    price:10,
    count:2,
    total:computed((order)=>{    
      return order.price*order.count
    })
  } 
})


export default ()=>{
  const ref = useRef()

  const op = useStore({
    operates:'*'
  })
  const [ops,setOps] = op.useState('operates')

  useEffect(()=>{
    const watcher = watch("order.total",(operate)=>{      
        ref.current.insertAdjacentHTML("beforeend",\`<p style='margin:2px;'}>\${operate.type} \${operate.path.join('.')}</p>\`)
      },{
        operates:ops
      })
    return ()=>watcher.off()
  },[ops])  

  return (<Layout style={{maxHeight:'400px'}}>
    <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">
        <Button onClick={()=>{
          state.order.count--
          ref.current.insertAdjacentHTML("beforeend",\`----------\`)
        }}>-</Button>
        {$('order.count')}
        <Button onClick={()=>{
            state.order.count++
            ref.current.insertAdjacentHTML("beforeend",\`----------\`)
        }}>+</Button>
      </ColorBlock>
      <ColorBlock name="Total">{$('order.total')}</ColorBlock>
      <Box>        
            <CheckBox id="watch-all" label="\u76D1\u542C\u6240\u6709\u64CD\u4F5C" checked={ops==='*'} onChange={(e)=>{
              setOps(e.target.checked ? '*' : 'read')
            }}/>  
            <CheckBox id="watch-write" label="\u53EA\u76D1\u542C\u5199\u64CD\u4F5C" checked={ops==='write'} onChange={(e)=>{   
              setOps(e.target.checked ?    'write' : '*')
            }}/>  
            <CheckBox id="watch-read" label="\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C" checked={ops==='read'} onChange={(e)=>{
              setOps(e.target.checked ? 'read' : '*')
            }}/> 
      </Box>
      <Button onClick={()=>{
        ref.current.innerHTML = ''
      }}>Clear</Button>
    </div>
    <div ref={ref} style={{      
        overflowY:'auto',        
      }}>
    </div>
  </Layout>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":C,"x-react-components":I,react:V||(V=e.t(M,2))},renderOpts:{compile:function(){var v=p()(B()().mark(function n(){var s,m=arguments;return B()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(6484).then(e.bind(e,56484));case 2:return f.abrupt("return",(s=f.sent).default.apply(s,m));case 3:case"end":return f.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}},"docs-guide-watch-store-demo-2":{component:M.memo(M.lazy(p()(B()().mark(function v(){var r,n,s,m,u,f,g,S,N,E,R,O,L,j,$;return B()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=F.sent,n=r.createStore,F.next=6,Promise.resolve().then(e.bind(e,3543));case 6:return s=F.sent,m=s.Button,u=s.Layout,f=s.Input,F.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return g=F.sent,S=g.useEffect,N=g.useRef,E=n({order:{price:10,count:2,books:["AutoStore\u5B9E\u6218\u6307\u5357","\u6DF1\u5165\u6D45\u51FAAutoStore","AutoStore\u6700\u4F73\u5B9E\u8DF5"]}}),R=E.state,O=E.watch,L=E.$,j=E.useState,$=E.useBindings,F.abrupt("return",{default:function(){var Z=N(),H=N();S(function(){var q=O("order.books",function(X){Z.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          `.concat(X.type," ").concat(X.path.join("."),"[").concat(X.indexs[0],`]
        </p>`))},{operates:["insert","remove","update"]});return function(){return q.off()}},[]);var Q=$("order.books");return M.createElement(u,{style:{maxHeight:"400px"}},M.createElement("div",null,R.order.books.map(function(q,X){return M.createElement(f,K()({key:X},Q[X]))}),M.createElement(f,{ref:H,actions:["+"],placeholder:"\u8BF7\u8F93\u5165\u4E66\u540D",onAction:function(X,se){String(se).length>0&&(R.order.books.push(se),H.current.value="")}}),M.createElement(m,{onClick:function(){Z.current.innerHTML=""}},"Clear")),M.createElement("div",{ref:Z,style:{overflowY:"auto"}}))}});case 17:case"end":return F.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
import { Box,Button,ColorBlock,Layout,CheckBox ,Input} from "x-react-components"
import { useEffect,useRef } from "react" 

const { state,watch,$,useState,useBindings } = createStore({
  order:{
    price:10,
    count:2,
    books:[
      "AutoStore\u5B9E\u6218\u6307\u5357",
      "\u6DF1\u5165\u6D45\u51FAAutoStore",
      "AutoStore\u6700\u4F73\u5B9E\u8DF5"
    ]
  } 
})


export default ()=>{
  const ref = useRef()
  const inputRef = useRef() 
 
  useEffect(()=>{
    const watcher = watch("order.books",(operate)=>{      
        ref.current.insertAdjacentHTML("beforeend",\`<p style='margin:2px;'}>
          \${operate.type} \${operate.path.join('.')}[\${operate.indexs[0]}]
        </p>\`)
      },{
        operates:['insert','remove','update']
      })
    return ()=>watcher.off()
  },[])  

  const bindBooks = useBindings('order.books')


  return (<Layout style={{maxHeight:'400px'}}>
    <div>
        {
          state.order.books.map((book,index)=>{
            return <Input key={index} {...bindBooks[index]} />
          })
        }
        <Input ref={inputRef} actions={["+"]} 
          placeholder="\u8BF7\u8F93\u5165\u4E66\u540D"
        onAction={(id,val)=>{
          if(String(val).length>0){
            state.order.books.push(val)
            inputRef.current.value=''
          }
        }}/>       
        <Button onClick={()=>{
          ref.current.innerHTML = ''
        }}>Clear</Button> 
    </div>
    <div ref={ref} style={{      
        overflowY:'auto',        
      }}>
    </div>
  </Layout>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":C,"x-react-components":I,react:V||(V=e.t(M,2))},renderOpts:{compile:function(){var v=p()(B()().mark(function n(){var s,m=arguments;return B()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(6484).then(e.bind(e,56484));case 2:return f.abrupt("return",(s=f.sent).default.apply(s,m));case 3:case"end":return f.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}}}},7226:function(te,b,e){e.r(b),e.d(b,{demos:function(){return K}});var V=e(92379),l=e(2415),K={}},20927:function(te,b,e){e.r(b),e.d(b,{Author:function(){return h},Counter:function(){return M},getProjects:function(){return m},useOneEffect:function(){return f}});var V=e(28633),l=e.n(V),K=e(92379),k=e(29355),B=e(3543),_=e(651),D=(0,k.createStore)({root:{count:1}}),W=D.state,p=D.$,M=function(){var S=(0,K.useState)(1),N=l()(S,2),E=N[0],R=N[1];return(0,_.jsxs)(B.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[E,(0,_.jsxs)(B.ColorBlock,{children:["Count:",E]}),(0,_.jsxs)(B.ColorBlock,{children:["Count:",p("root.count")]}),(0,_.jsx)(B.Button,{onClick:function(){return R(E+1)},children:"State +1"}),(0,_.jsx)(B.Button,{onClick:function(){return W.root.count++},children:"Signal +1"})]})},y=(0,k.createStore)({firstName:"Zhang",lastName:"Fisher"}),C=y.state,I=y.$,h=function(){var S=(0,K.useState)(1),N=l()(S,2),E=N[0],R=N[1];return(0,_.jsxs)(B.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[E,(0,_.jsxs)(B.ColorBlock,{children:["Count:",E]}),(0,_.jsx)(B.ColorBlock,{children:I(function(O){return O.firstName+" "+O.lastName})}),(0,_.jsx)(B.Button,{onClick:function(){return R(E+1)},children:"State +1"}),(0,_.jsx)(B.Button,{onClick:function(){return C.lastName=C.lastName+"."},children:"Update lastName"})]})},v=e(29008),r=e.n(v),n=e(70958),s=e.n(n);function m(g){return u.apply(this,arguments)}function u(){return u=s()(r()().mark(function g(S){var N,E,R;return r()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,fetch(S);case 2:if(N=L.sent,!N.ok){L.next=11;break}return L.next=6,N.json();case 6:return E=L.sent,R=E.map(function(j){return{name:j.name,url:j.html_url,description:j.description,stars:j.stargazers_count}}),L.abrupt("return",R);case 11:throw new Error("".concat(N.status," - ").concat(N.statusText));case 12:case"end":return L.stop()}},g)})),u.apply(this,arguments)}function f(g){var S=(0,K.useRef)(!1);(0,K.useEffect)(function(){if(!S.current)return S.current=!0,g()})}},3543:function(te,b,e){e.r(b),e.d(b,{Box:function(){return K},Button:function(){return W},Card:function(){return y},CheckBox:function(){return Q},Color:function(){return Je},ColorBlock:function(){return u},Divider:function(){return r},ErrorBoundary:function(){return $e},Field:function(){return v},Input:function(){return O},JsonView:function(){return Z},Layout:function(){return g},List:function(){return we},Loading:function(){return B},Radio:function(){return lt},RichLabel:function(){return w},Select:function(){return X},Star:function(){return We},Table:function(){return Le},TextArea:function(){return Ze},ValidResult:function(){return h}});var V=e(92379),l=e(651),K=(0,V.forwardRef)(function(le,A){var ae=le.title,oe=le.enable,re=oe===void 0?!0:oe,ie=le.visible,ve=ie===void 0?!0:ie;return(0,l.jsxs)("div",{ref:A,style:{display:ve?"flex":"none",position:"relative",flexDirection:"column",padding:"16px",margin:"16px 8px 8px 8px",boxSizing:"border-box",border:"1px solid #ccc"},children:[(0,l.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:re?"#999":"gray"},children:ae||""}),le.children]})}),k=e(97106),B=function(A){var ae=A.size,oe=ae===void 0?20:ae,re=A.visible,ie=re===void 0?!0:re,ve=A.color,fe=A.tips,ge=fe===void 0?"loading...":fe;return(0,l.jsxs)("span",{title:ge,style:{display:ie?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,l.jsx)(k.Z1,{width:oe,height:oe,color:ve}),A.title?(0,l.jsx)("span",{style:{marginLeft:"4px"},children:A.title}):null]})},_=e(94039),D=(0,_.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(A){return A.visible!==!1?A.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #ccc",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555",fontSize:"0.8em","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"x-button"}),W=function(A){var ae=A.loading,oe=A.timeout,re=oe===void 0?0:oe,ie=A.progress,ve=ie===void 0?0:ie,fe=A.cancel,ge=A.onClick;return(0,l.jsxs)("div",{className:D.className+(A.className?" "+A.className:""),style:D.getStyle(A),onClick:ge,children:[ae?(0,l.jsx)(B,{}):null,(0,l.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:A.children}),re>0?(0,l.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:re}):"",ve>0?(0,l.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[ve,"%"]}):"",A.error?(0,l.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:A.error}):"",A.loading&&typeof fe=="function"?(0,l.jsx)("button",{onClick:fe,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},p=(0,_.zo)({border:"1px solid #e1e1e1",background:function(A){return A.enable!==!1?"white":"gray"},margin:"8px",display:function(A){return A.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"x-card"}),M=(0,_.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555",borderRadius:"6px 6px 0 0"},{className:"x-card-header"}),y=function(A){var ae=A.title,oe=A.enable,re=oe===void 0?!0:oe,ie=A.actions,ve=ie===void 0?[]:ie,fe=Array.isArray(A.children)?A.children:[A.children];return(0,l.jsxs)("div",{className:p.className,style:p.getStyle(A),children:[(0,l.jsxs)("div",{className:M.className,style:M.getStyle(A),children:[(0,l.jsx)("span",{style:{flexGrow:1,color:re?"#222":"gray"},children:ae}),(0,l.jsx)("span",{style:{},children:ve.map(function(ge,_e){return(0,l.jsx)(W,{onClick:ge.onClick,children:ge.title})})})]}),(0,l.jsx)("div",{style:{padding:"12px"},children:fe.map(function(ge,_e){return fe.length>1&&_e===fe.length-1&&ge.classList&&ge.classList.contains("footer")?(0,l.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:ge},_e):ge})})]})},C=e(24325),I=e.n(C),h=function(A){var ae=A.validate,oe=A.help;if(ae!==void 0){var re=typeof ae!="boolean",ie=re?ae==null?void 0:ae.result:ae,ve=re?ae==null?void 0:ae.loading:!1,fe=re?ae==null?void 0:ae.error:oe;return(0,l.jsxs)("span",{style:{color:"red",display:ve||!ie?"flex":"none"},children:[(0,l.jsx)(B,{visible:ve,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!ve&&(ie?"":fe)]})}},v=function(A){var ae=A.enable,oe=ae===void 0?!0:ae,re=A.visible,ie=re===void 0?!0:re,ve=A.label,fe=ve===void 0?"":ve,ge=A.children,_e=ge===void 0?"":ge,Se=A.memo,De=A.labelWidth,je=De===void 0?"128px":De;return(0,l.jsxs)("div",{className:"field",style:{position:"relative",display:ie===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,l.jsxs)("label",{className:"field-label",style:{minWidth:je,fontWeight:"bold",color:oe===!1?"gray":"inherit"},children:[fe,":"]}),(0,l.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:oe===!1?"gray":"inherit"},children:[typeof _e=="function"?"":_e,Se&&(0,l.jsx)("span",{style:{color:"gray"},children:Se})]}),(0,l.jsx)(h,I()({},A))]})},r=function(A){var ae=A.title,oe=A.visible,re=oe===void 0?!0:oe;return(0,l.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:re?"flex":"none"},children:(0,l.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:ae})})},n=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],s=0;function m(){return s++,s>=n.length-1&&(s=0),n[s]}var u=function(A){var ae=(0,V.useRef)(0),oe=A.name,re=A.value,ie=re===void 0?"":re,ve=A.loading,fe=ve===void 0?!1:ve,ge=A.comment,_e=A.inline,Se=m(),De="white";return(0,V.useEffect)(function(){ae.current++}),(0,l.jsxs)("div",{style:I()(I()({backgroundColor:Se,padding:"6px",color:De,display:_e?"inline-flex ":"flex"},A.style),{},{alignItems:"center"}),children:[(0,l.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[oe?(0,l.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:oe}):null,oe?(0,l.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,l.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(ie),A.children]})]}),ge?(0,l.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:ge}):null,fe?(0,l.jsx)(B,{color:"white"}):null,(0,l.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:ae.current})]})},f=(0,_.zo)({display:function(A){return A.visible===!1?"none":"flex"},position:"relative",flexDirection:function(A){return A.direction||"row"},padding:"4px",margin:"4px",boxSizing:"border-box",alignItems:"stretch","&>*":{flex:1,boxSizing:"border-box",position:"relative",borderLeft:"1px solid #ccc",borderTop:"1px solid #ccc",borderBottom:function(A){return A.direction==="column"?"none":"1px solid #ccc"},borderRight:function(A){return A.direction==="column"?"1px solid #ccc":"none"},padding:"8px"},"&>:last-child":{borderRight:"1px solid #ccc",borderBottom:"1px solid #ccc"},"&+.x-layout":{borderTop:"none",marginTop:"-12px","&>*":{borderTop:"none",paddingTop:"12px"}}},{className:"x-layout"}),g=function(A){return(0,l.jsx)("div",{className:f.className,style:f.getStyle(A,A.style),children:A.children})},S=e(19317),N=e.n(S),E=["id","enable","style","value","actions"],R=(0,_.zo)({display:function(A){return A.inline?"inline-flex":"flex"},alignItems:"center","& input":{border:function(A){return A.validate===!1?"1px solid red":"1px solid #ccc"},borderRadius:"4px",background:function(A){return A.enable===!1?"gray":"white"},display:function(A){return A.visible===!1?"none":"flex"},margin:"4px",padding:"8px",flexGrow:1,textAlign:function(A){return A.center?"center":"left"},"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"},"&.invalid":{border:"1px solid red",color:"red"},width:function(A){return A.width?"".concat(A.width,"px"):"auto"}},"& label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&.invalid>label":{color:"red"},"& .error":{display:"none","&.invalid":{display:"block",color:"red"}},"& .x-input-wrapper":{display:"flex",alignItems:"center","& > input ~ .x-input-action":{borderRadius:"0px",marginLeft:0,marginRight:0,borderLeft:"none",paddingLeft:"1.2em",paddingRight:"1.2em"},"& > input + .x-input-action":{marginLeft:"-8px",borderLeft:function(A){return A.validate===!1?"1px solid red":"1px solid #ccc"}},"& > input ~ .x-input-action:last-child":{borderTopRightRadius:"4px",borderBottomRightRadius:"4px"}}},{className:"x-input"}),O=function(A){var ae=A.id,oe=ae===void 0?Math.random().toString(36).slice(2):ae,re=A.enable,ie=re===void 0?!0:re,ve=A.style,fe=ve===void 0?{}:ve,ge=A.value,_e=A.actions,Se=N()(A,E),De=A.label||A.name||A.id,je=(0,V.useRef)(null);return(0,l.jsxs)("div",{className:R.className,style:R.getStyle(A,fe),"data-field-name":A.name,children:[De?(0,l.jsx)("label",{htmlFor:oe,children:De}):null,(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,l.jsxs)("div",{className:"x-input-wrapper",children:[(0,l.jsx)("input",I()({ref:je,id:oe,value:ge,readOnly:!ie},Se)),_e==null?void 0:_e.map(function(Pe,Ue){return(0,l.jsx)(W,{className:"x-input-action",onClick:function(at){var Ce;(Ce=A.onAction)===null||Ce===void 0||Ce.call(A,Pe,je.current.value,at)},children:Pe},Ue)})]}),(0,l.jsx)("span",{className:"error","data-validate-field":A.name})]})]})},L=e(28633),j=e.n(L);function $(le){return le.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var w=function(A){var ae=A.text,oe=A.color,re=oe===void 0?"#ff6c00":oe,ie=A.rules,ve=typeof re=="string"?{default:re}:Object.assign({default:""},re),fe=$(ae||String(A.children));return ie?Object.entries(ie).forEach(function(ge){var _e=j()(ge,2),Se=_e[0],De=_e[1];fe=fe.replace(De,function(je){var Pe=Se.includes(":")?Se:"color:".concat(Se,";");return"<span style='".concat(Pe,"'>").concat(je,"</span>")})}):fe=fe.replace(/\{\s?(.*?)\s?\}/gm,function(ge,_e){return"<span style='color: ".concat(_e in ve?ve[_e]:ve.default,"'>").concat(_e,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,l.jsx)("div",{className:A.className,style:I()({display:A.inline?"inline-block":"block",boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},A.style),children:(0,l.jsx)("span",{dangerouslySetInnerHTML:{__html:fe}})})},F=e(97072),Y=(0,_.zo)({padding:"8px",boxSizing:"border-box",border:function(A){return A.border===!0?"1px solid #ccc":"none"},position:"relative","& .json-container ":{fontFamily:"menlo, consolas, monospace",fontStyle:"normal",fontWeight:"bold",fontSize:"0.9rem",transition:"background-color 400ms",backgroundColor:"white",position:"relative",maxHeight:" 400px",overflowX:"hidden",overflowY:"auto",lineHeight:"calc(100% + 2px)",width:"100%",display:"block",background:"transparent"},"& .json-link":{textDecoration:"none",borderBottom:"1px solid",outline:"none",color:"purple","&:hover":{backgroundColor:"transparent",outline:"none",color:"blueviolet"}},"& .json-lines":{whiteSpace:"normal",paddingInlineStart:"3em",margin:"0px","--colorGraphite":"#303030","--colorCharcoal":"#222222","--colorTar":"#161616","& > li":{whiteSpace:"pre",textIndent:"0.7em",lineHeight:"1.5em",padding:"0px",transition:"all 400ms","&::marker":{fontFamily:"system-ui, sans-serif",fontWeight:"normal",color:"dimgray"}}},"& .json-key, .json-string, .json-number, .json-boolean, .json-null, .json-mark, a.json-link, ol.json-lines >li":{transition:"all 400ms"},"& .json-key.highlight:after":{position:"absolute",content:"' '",width:"1000px",height:"100%",top:"0px",left:"-2em",display:"inline-block",backgroundColor:"#caf9cc",zIndex:-1},"& .json-container":{position:"relative",maxHeight:"500px",overflowX:"hidden",overflowY:"auto"},"& .json-key":{color:"brown",position:"relative",backgroundColor:"transparent"},"& .json-string":{color:"olive"},"& .json-number":{color:"navy"},"& .json-boolean":{color:"teal"},"& .json-null":{color:"dimgray"},"& .json-mark":{color:"black"},"& a.json-link":{color:"purple"},"& a.json-link:visited":{color:"slategray"},"& a.json-link:hover":{color:"blueviolet"},"& a.json-link:active":{color:"slategray"},"& ol.json-lines >li::marker":{color:"dimgray"},"& ol.json-lines >li:nth-child(odd)":{backgroundColor:"gainsboro"},"& ol.json-lines >li:nth-child(even)":{backgroundColor:"whitesmoke"},"& ol.json-lines >li:hover":{backgroundColor:"lemonchiffon"}},{className:"x-json-view"}),Z=function(A){var ae=A.data||String(A.children),oe=(0,V.useRef)(null);return(0,V.useEffect)(function(){if(oe.current){oe.current.innerHTML=F.W.toHtml(typeof ae=="string"?JSON.parse(ae):ae,{trailingCommas:!1,linksNewTab:!0});var re=A.highlightKeys;if(re){var ie=oe.current.querySelectorAll("span.json-key");ie.forEach(function(ve){var fe=ve.innerText.trim();re.includes(fe)&&ve.classList.add("highlight")})}}},[ae]),(0,l.jsxs)("pre",{className:Y.className,style:Y.getStyle(A),children:[(0,l.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:"gray"},children:A.title||""}),(0,l.jsx)("span",{ref:oe,className:"json-container"})]})},H=(0,_.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-checkbox"}),Q=function(A){var ae=A.id,oe=ae===void 0?Math.random().toString(36).slice(2):ae,re=A.labelPos,ie=re===void 0?"right":re,ve=A.label||A.name||A.id;return(0,l.jsxs)("div",{className:H.className,style:H.getStyle(A),children:[ie==="left"?(0,l.jsx)("label",{htmlFor:oe,children:ve}):null,(0,l.jsx)("input",I()(I()({},A),{},{id:oe,checked:A.checked,value:A.value,type:"checkbox"})),ie==="right"?(0,l.jsx)("label",{htmlFor:oe,children:ve}):null]})},q=(0,_.zo)({display:"flex",alignItems:"center",cursor:"pointer","&>label":{userSelect:"none",fontSize:"14px",cursor:"pointer",width:"100px",flexShrink:0},"&>select":{margin:"4px",padding:"8px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-select"}),X=function(A){var ae=A.items,oe=ae===void 0?[]:ae,re=A.label||A.name||A.id;return(0,l.jsxs)("div",{className:q.className,style:q.getStyle(A),children:[re?(0,l.jsx)("label",{children:re}):null,(0,l.jsx)("select",I()(I()({},A),{},{value:A.value,children:oe.map(function(ie){return(0,l.jsx)("option",{value:ie.value,children:ie.title},ie.value)})}))]})},se=e(93949),ue=e.n(se),de=e(6270),Ie=e.n(de),he=e(77701),Me=e.n(he),Fe=e(28249),Ge=e.n(Fe),$e=function(le){Me()(ae,le);var A=Ge()(ae);function ae(oe){var re;return ue()(this,ae),re=A.call(this,oe),re.state={error:void 0},re}return Ie()(ae,[{key:"render",value:function(){return this.state.error?(0,l.jsx)(K,{children:this.state.error}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(re){return{error:re.stack}}}]),ae}(V.Component),Ke=(0,_.zo)({width:"100%",marginBottom:"1rem",color:"#212529",backgroundColor:"white",borderCollapse:"collapse",border:"1px solid #dee2e6","& th":{backgroundColor:"#f7f7f7"},"& th,td":{padding:".5rem",verticalAlign:"top",border:"1px solid #dee2e6"},"& td":{padding:".5rem",border:"1px solid #dee2e6",verticalAlign:"middle"},"& tfoot":{backgroundColor:"#f7f7f7",padding:".75rem"}},{className:"x-table"}),Le=function(A){var ae,oe=A.cols.map(function(re){var ie=typeof re=="string"?{name:re,align:"center"}:re;return ie.name.startsWith("<")&&(ie.align="left",ie.name=ie.name.substring(1)),ie.name.startsWith(">")&&(ie.align="right",ie.name=ie.name.substring(1)),ie});return(0,l.jsxs)("table",{className:Ke.className,style:Ke.getStyle(A),children:[(0,l.jsxs)("thead",{children:[A.title?(0,l.jsx)("tr",{children:(0,l.jsx)("th",{colSpan:oe.length,children:A.title})}):null,(0,l.jsx)("tr",{children:oe==null?void 0:oe.map(function(re,ie){return(0,l.jsx)("th",{style:{width:re.width?re.width:void 0,textAlign:re.align?re.align:void 0},children:re.name},ie)})})]}),(0,l.jsx)("tbody",{children:(ae=A.rows)===null||ae===void 0?void 0:ae.map(function(re,ie){return(0,l.jsx)("tr",{children:re.map(function(ve,fe){var ge=1;if(ve!=null){for(var _e=fe+1;_e<re.length&&re[_e]==null;_e++)ge++;return(0,l.jsx)("td",{colSpan:ge>1?ge:void 0,style:{textAlign:oe[fe].align},children:typeof ve=="function"?ve():String(ve)},fe)}})},ie)})}),A.children?(0,l.jsx)("tfoot",{children:(0,l.jsx)("tr",{children:(0,l.jsx)("td",{colSpan:oe.length,children:A.children})})}):null]})},ze=(0,_.zo)({padding:"0px",display:"flex","&>label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&>textarea":{margin:"4px",padding:"8px",minHeight:"80px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-textArea"}),Ze=function(A){var ae=A.id,oe=ae===void 0?Math.random().toString(36).slice(2):ae,re=A.label||A.name||A.id;return(0,l.jsxs)("div",{className:ze.className,style:ze.getStyle(A),children:[(0,l.jsx)("label",{htmlFor:oe,children:re}),(0,l.jsx)("textarea",I()(I()({},A),{},{id:oe}))]})},We=function(A){var ae=A.max,oe=ae===void 0?5:ae,re=A.value,ie=re===void 0?1:re,ve=Array.from({length:oe}),fe=(0,V.useRef)(null),ge=(0,V.useState)(ie),_e=j()(ge,2),Se=_e[0],De=_e[1];return(0,l.jsx)("div",{ref:fe,style:{display:"flex",flexDirection:"row",fontSize:"1.2em"},children:ve.map(function(je,Pe){return(0,l.jsxs)("span",{style:{cursor:"pointer",padding:"4px",color:Pe<Se?"#ffe70c":"#ccc"},onClick:function(){De(Pe===Se-1?Pe:Pe+1);var tt=new InputEvent("input",{bubbles:!0,cancelable:!0,data:String(Se)});fe.current.dispatchEvent(tt)},children:[(0,l.jsx)("svg",{viewBox:"64 64 896 896",focusable:"false","data-icon":"star",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:(0,l.jsx)("path",{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"})}),"   "]},Pe)})})},ut=(0,_.zo)({listStyle:"'\u03BF'",margin:0,paddingLeft:"1em","&>li":{cursor:"pointer","&:hover":{background:"#f9f9f9",borderRadius:"4px"}}},{className:"x-list"}),we=function(A){return(0,l.jsxs)(K,{title:A.title,children:[A.description&&(0,l.jsx)(w,{text:A.description}),(0,l.jsx)("ul",{className:ut.className,style:ut.getStyle(),children:A.items&&A.items.map(function(ae,oe){return Array.isArray(ae)?(0,l.jsx)("li",{children:(0,l.jsx)(w,{text:ae[0],color:ae[1]})},oe):(0,l.jsx)("li",{children:(0,l.jsx)(w,{text:ae,color:"red"})},oe)})})]})},Te=(0,_.zo)({padding:"4px",margin:"4px",display:function(A){return A.inline===!1?"flex":"inline-flex"},alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer",marginRight:"4px"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-radio"}),lt=function(A){var ae=A.id,oe=ae===void 0?Math.random().toString(36).slice(2):ae,re=A.label||A.name||A.id;return(0,l.jsxs)("div",{className:Te.className,style:Te.getStyle(A),children:[(0,l.jsx)("input",I()(I()({},A),{},{id:oe,checked:A.checked,value:A.value,type:"radio"})),(0,l.jsx)("label",{htmlFor:oe,children:re})]})},et=["id","enable","style","value","actions"],dt=(0,_.zo)({display:function(A){return A.inline===!1?"flex":"inline-flex"},alignItems:"center","& input":{border:function(A){return A.validate===!1?"1px solid red":"1px solid #ccc"},borderRadius:"4px",background:function(A){return A.enable===!1?"gray":"white"},display:function(A){return A.visible===!1?"none":"flex"},margin:"4px",flexGrow:1,textAlign:function(A){return A.center?"center":"left"},"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"},"&.invalid":{border:"1px solid red",color:"red"},width:function(A){return A.width?"".concat(A.width,"px"):"2em"},height:function(A){return A.height?"".concat(A.height,"px"):"2em"},cursor:"pointer"},"& label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&.invalid>label":{color:"red"},"& .error":{display:"none","&.invalid":{display:"block",color:"red"}},"& .x-color-wrapper":{display:"flex",alignItems:"center","& > input ~ .x-color-action":{borderRadius:"0px",marginLeft:0,marginRight:0,borderLeft:"none",paddingLeft:"1.2em",paddingRight:"1.2em"},"& > input + .x-color-action":{marginLeft:"-8px",borderLeft:function(A){return A.validate===!1?"1px solid red":"1px solid #ccc"}},"& > input ~ .x-color-action:last-child":{borderTopRightRadius:"4px",borderBottomRightRadius:"4px"}}},{className:"x-color"}),Je=function(A){var ae=A.id,oe=ae===void 0?Math.random().toString(36).slice(2):ae,re=A.enable,ie=re===void 0?!0:re,ve=A.style,fe=ve===void 0?{}:ve,ge=A.value,_e=A.actions,Se=N()(A,et),De=A.label||A.name||A.id,je=(0,V.useRef)(null);return(0,l.jsxs)("div",{className:dt.className,style:dt.getStyle(A,fe),"data-field-name":A.name,children:[De?(0,l.jsx)("label",{htmlFor:oe,children:De}):null,(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,l.jsxs)("div",{className:"x-color-wrapper",children:[(0,l.jsx)("input",I()(I()({ref:je,id:oe,value:ge,readOnly:!ie},Se),{},{type:"color"})),_e==null?void 0:_e.map(function(Pe,Ue){return(0,l.jsx)(W,{className:"x-color-action",onClick:function(at){var Ce;(Ce=A.onAction)===null||Ce===void 0||Ce.call(A,Pe,je.current.value,at)},children:Pe},Ue)})]}),(0,l.jsx)("span",{className:"error","data-validate-field":A.name})]})]})}},29355:function(te,b,e){e.r(b),e.d(b,{ASYNC_COMPUTED_VALUE:function(){return Ie},AbortError:function(){return w},AsyncComputedObject:function(){return St},AutoStore:function(){return Mt},AutoStoreError:function(){return $},BATCH_UPDATE_EVENT:function(){return de},ComputedObject:function(){return mt},ComputedObjects:function(){return bt},CyleDependError:function(){return Y},EventEmitter:function(){return ft},FAKE_BINDINGS:function(){return ht},InvalidComputedArgumentsError:function(){return Z},InvalidDependsError:function(){return Q},InvalidScopeError:function(){return H},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return X},OBSERVER_DESCRIPTOR_FLAG:function(){return se},ObserverObject:function(){return vt},ObserverScopeRef:function(){return Qe},PATH_DELIMITER:function(){return ue},ReactAutoStore:function(){return rt},SKIP_PROXY_FLAG:function(){return q},SyncComputedObject:function(){return Ct},TimeoutError:function(){return F},WatchObject:function(){return Pt},WatchObjects:function(){return Nt},calcDependPaths:function(){return ve},computed:function(){return Ge},createBindingsState:function(){return Tt},createFakeObjectBindings:function(){return gt},createFieldBinding:function(){return Ve},createStore:function(){return ia},createUseField:function(){return Lt},createUseFields:function(){return Ft},defineExtend:function(){return Gt},delay:function(){return De},forEachObject:function(){return _e},getComputedId:function(){return fe},getDepends:function(){return Ue},getId:function(){return re},getMapVal:function(){return Je},getSnap:function(){return Se},getSnapshot:function(){return st},getVal:function(){return le},isAbsolutePath:function(){return $e},isAsyncComputedValue:function(){return Te},isEq:function(){return ze},isEventMatched:function(){return Dt},isFunction:function(){return ct},isMap:function(){return Ze},isObserverDescriptor:function(){return Ke},isObserverDescriptorBuilder:function(){return et},isPathEq:function(){return We},isPathMatched:function(){return ut},isPlainObject:function(){return we},isPrimitive:function(){return Et},isPromise:function(){return lt},isProxy:function(){return dt},isRaw:function(){return Le},joinValuePath:function(){return oe},markRaw:function(){return A},noRepeat:function(){return je},normalizeDeps:function(){return Me},pathIsExists:function(){return tt},pathStartsWith:function(){return Pe},setVal:function(){return ae},updateObjectVal:function(){return ge},useForm:function(){return Pa},useStore:function(){return Aa},watch:function(){return Bt}});var V=e(6270),l=e.n(V),K=e(93949),k=e.n(K),B=e(28810),_=e.n(B),D=e(77701),W=e.n(D),p=e(28249),M=e.n(p),y=e(29861),C=e.n(y),I=e(92379),h=e(29008),v=e.n(h),r=e(70958),n=e.n(r),s=e(12027),m=e.n(s),u=e(34180),f=e.n(u),g=e(14582),S=e.n(g),N=e(48510),E=e.n(N),R=e(30790),O=e.n(R),L=e(5672),j=e.n(L),$=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o)}(j()(Error)),w=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o)}($),F=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o)}($),Y=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o)}($),Z=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o)}($),H=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o)}($),Q=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o)}($),q=Symbol("skip-proxy"),X=Symbol("observer-descriptor-builder"),se=Symbol("observer-descriptor"),ue=".",de="__batch_update__",Ie=Symbol("AsyncComputedValue");function he(a){return a.constructor.name==="AsyncFunction"}function Me(a){return a?a.map(function(t){return Array.isArray(t)?t:typeof t=="string"?["/","./","../"].some(function(o){return t.startsWith(o)})?t:t.includes(ue)?t.split(ue):t.split("."):[]}):[]}function Fe(){return{async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0,objectify:!0}}function Ge(){var a=arguments[0];if(typeof a!="function")throw new Error("computed getter must be a function");var t=[],o=Object.assign({},Fe());if(arguments.length===1)t=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))o.depends=arguments[1];else if(f()(arguments[1])==="object")Object.assign(o,arguments[1]),o.depends=Me(o.depends);else throw new Z;else arguments.length>=3&&(t=Me(arguments[1]),Object.assign(o,arguments[2]),o.depends=t);o.async=o.async===!0||he(a)||arguments.length>=2&&Array.isArray(arguments[1]);var i=function(){return C()({type:"computed",getter:a,options:o},se,!0)};return i[X]=!0,i}function $e(a){return a?a.some(function(t){return typeof t=="string"?t.startsWith("./")||t.startsWith("../")||t.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(t):!0}):!1}function Ke(a){return f()(a)==="object"&&a.hasOwnProperty("type")&&typeof a.type=="string"&&a.hasOwnProperty("getter")&&typeof a.getter=="function"&&a.hasOwnProperty("options")&&f()(a.options)==="object"}function Le(a){try{return a[q]===!0}catch(t){}return!1}function ze(a,t){if(a===t)return!0;if(a===null||t===null||f()(a)!==f()(t))return!1;if(f()(a)==="object"){if(Array.isArray(a)&&Array.isArray(t))return a.length!==t.length?!1:a.every(function(i,d){return ze(i,t[d])});if(!Array.isArray(a)&&!Array.isArray(t)){var o=Object.keys(a);return o.length!==Object.keys(t).length?!1:o.every(function(i){return ze(a[i],t[i])})}else return!1}return!1}function Ze(a){return toString.call(a)==="[object Map]"}function We(a,t){return!a||!t||a.length!==t.length?!1:a.every(function(o,i){return o===t[i]})}function ut(a,t){var o=We(a,t);return o?!0:a.length!==t.length?!1:a.every(function(i,d){return i==="*"?!0:i===t[d]})}function we(a){return a==null||f()(a)!=="object"?!1:Object.prototype.toString.call(a)==="[object Object]"}function Te(a){return a&&f()(a)==="object"&&a.hasOwnProperty(Ie)}function lt(a){try{return!!a&&(f()(a)==="object"||typeof a=="function")&&typeof a.then=="function"&&typeof a.catch=="function"&&(a instanceof Promise||Object.prototype.toString.call(a)==="[object Promise]")}catch(t){return!1}}function et(a){return typeof a=="function"&&a[X]===!0}function dt(a){return f()(a)==="object"&&a!==null&&!("__isProxy"in a)}function Je(a,t){var o=a.get(t);if(o!==void 0)return o;var i=a.get(Number(t)||t);if(i!==void 0)return i}function le(a,t,o){if(!t||t.length===0)return a;for(var i,d=a,c=0;c<t.length;c++){var x=t[c];if(Ze(d))i=Je(d,x);else if(x in d)i=d[x];else{if(o!==void 0)return o;throw new Error("invalid state path: ".concat(t.join(".")))}d=i}return i}function A(a){try{a[q]=!0}catch(t){}return a}function ae(a,t,o,i){for(var d=a,c=t.length-1,x=0;x<t.length;x++){var P=t[x],T=Ze(d);if(x===c){if(i===!0){var z=T?Je(d,P):d[P];Te(z)&&(d=z,P="value")}T?d.set(P,o):d[P]=o;return}var G=T?Je(d,P):d[P];d=G}}function oe(a){return(a||["ROOT"]).map(function(t){return Array.isArray(t)?t.join("."):t}).join(ue)}function re(){return Math.random().toString(36).slice(2)}function ie(a,t,o){var i=a&&!a[0].startsWith("#");if(Array.isArray(t))return t;if(t==="self")return i?a:void 0;if(t==="root")return i?[]:void 0;if(t==="parent")return i?a.slice(0,-2):void 0;if(t==="current")return i?a.slice(0,-1):void 0;if(typeof t=="string")return t.startsWith("./")?i?[].concat(m()(a.slice(0,-1)),m()(t.slice(2).split(ue))):void 0:t.startsWith("../")?i?ie(a.slice(0,-1),t.slice(3),!0):void 0:t.startsWith("/")?t.replace(/^(\/)*/,"").split(ue):i&&o?[].concat(m()(a.slice(0,-1)),m()(t.split(ue))):t.split(ue)}function ve(a,t){return t?t.map(function(o){return ie(a,o)}).filter(function(o){return o!==void 0}):[]}function fe(a,t){var o="";return t.id?o=t.id:o=oe(a),o}function ge(a,t,o){var i=a,d=t.length-1;t.forEach(function(c,x){var P=Ze(i);if(x===d){var T=P?i.get(c):i[c];f()(T)==="object"&&Object.assign(T,o);return}P?(i.has(c)||i.set(c,{}),i=i.get(c)):(c in i||(i[c]={}),i=i[c])})}function _e(a,t){function o(i,d){for(var c in i){var x=i[c];typeof t=="function"&&t({value:x,key:c,parent:i,path:d.concat(c)}),f()(x)==="object"&&o(x,d.concat(c))}}o(a,[])}function Se(a){return a}function De(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(t){setTimeout(t,a)})}function je(a){var t=new Map;return a.forEach(function(o){var i=o.join(".");t.set(i,o)}),Array.from(t.values())}function Pe(a,t){return a.length>t.length?!1:a.every(function(o,i){return o===t[i]})}function Ue(a,t,o){var i=[];return typeof a=="function"?i=t.collectDependencies(function(){return a(t.state)}):typeof a=="string"?i=[a.split(ue)]:Array.isArray(a)?i=[m()(a)]:i=[],o!=="none"&&i.forEach(function(d){var c=t.peep(function(x){return le(x,d)});Te(c)&&d.push(o==="all"?"*":"value")}),i}function tt(a,t){if(!t||t.length===0)return!1;for(var o,i=a,d=0;d<t.length;d++){var c=t[d],x=!1;if(Ze(i)){if(x=i.has(c),!x)return!1;o=Je(i,c)}else{if(x=c in i,!x)return!1;o=i[c]}i=o}return!0}var at=e(24325),Ce=e.n(at);function st(a,t){if(Array.isArray(a)){for(var o=m()(a),i=0;i<o.length;i++)o[i]=st(o[i],t);return o}else if(f()(a)==="object"){if(!t&&Te(a))return a.value;var d=Ce()({},a);for(var c in d)d[c]=st(d[c],t);return d}return a}function Et(a){return a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean"}function Gt(a){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof a=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(a)}function ct(a){return a?typeof a=="function":!1}var bt=function(a){W()(o,a);var t=M()(o);function o(i){var d;return k()(this,o),d=t.call(this),d.store=i,d}return l()(o,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(d){this.store.options.enableComputed=d}},{key:"create",value:function(){var d=Ke(arguments[0])?arguments[0]:Ge.apply(void 0,arguments)();if(d.options.async&&!$e(d.options.depends))throw new Q("The scope of the dynamic computed object must be the root state object or an absolute path");var c=d.options.scope;if(c===void 0)d.options.scope="ROOT";else if(!$e([c]))throw new H("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(d)}},{key:"runGroup",value:function(){var i=n()(v()().mark(function c(x,P,T){return v()().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return G.next=2,this.run(function(U){return U.group===x},P,T);case 2:return G.abrupt("return",G.sent);case 3:case"end":return G.stop()}},c,this)}));function d(c,x,P){return i.apply(this,arguments)}return d}()},{key:"run",value:function(){var i=n()(v()().mark(function c(){var x=arguments,P=this,T,z,G,U,J=arguments;return v()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:if(J.length!==0){ee.next=2;break}return ee.abrupt("return",Promise.all(m()(this.values()).map(function(ce){return ce.run()})));case 2:return typeof J[0]=="function"?T=J[0]:typeof J[0]=="string"&&(T=function(me){return me.id===x[0]}),z=Object.assign({},J[1]),G=Object.assign({wait:!1,timeout:0},J[2]),U={},ee.abrupt("return",new Promise(function(ce,me){if(G.wait){var pe;z.onDone=function(xe){var ye=xe.id;if(U[ye]=!0,Object.values(U).every(function(Be){return Be}))return clearTimeout(pe),!0},G.timeout>0&&(pe=setTimeout(function(){me(new F)},G.timeout))}Promise.all(m()(P.values()).filter(function(xe){return T(xe)?(U[xe.id]=!1,!0):!1}).map(function(xe){return xe.run(z)})),G.wait||ce()}));case 7:case"end":return ee.stop()}},c,this)}));function d(){return i.apply(this,arguments)}return d}()},{key:"enableGroup",value:function(){var i=n()(v()().mark(function c(x){var P,T,z;return v()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:P=S()(this.values());try{for(P.s();!(T=P.n()).done;)z=T.value,z.options.enable=x}catch(J){P.e(J)}finally{P.f()}case 2:case"end":return U.stop()}},c,this)}));function d(c){return i.apply(this,arguments)}return d}()},{key:"delete",value:function(d){var c;return(c=this.get(d))===null||c===void 0||c.detach(),E()(O()(o.prototype),"delete",this).call(this,d)}},{key:"find",value:function(d){if(d){var c=Array.isArray(d)?d:d.split(ue),x=S()(this.values()),P;try{for(x.s();!(P=x.n()).done;){var T=P.value;if(We(T.path,c))return T}}catch(z){x.e(z)}finally{x.f()}}}}]),o}(j()(Map)),zt=e(69075);function Zt(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",o=typeof a=="function"?a():a instanceof Error?a.stack:a;try{var i;(i=console)[t].apply(i,["[AutoStore<".concat(this.id,">]")].concat(m()(Array.isArray(o)?o:[o])))}catch(d){}}function nt(a,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ue,i=[];try{return typeof t=="function"&&(t=t.call(a,a)),i=Array.isArray(t)?t:typeof t=="string"?t.split(o):[],i.length>0?le(a,i):a}catch(d){return a}}var Qe=function(a){return a.Root="ROOT",a.Current="CURRENT",a.Parent="PARENT",a.Depends="DEPENDS",a.Self="SELF",a}({});function Jt(a,t,o){var i=t===void 0?o:t;if(typeof i=="function")try{i=i.call(a.store,a)}catch(d){}return i===void 0?o===void 0?Qe.Current:o:i}function it(a,t,o,i){var d=a.store.state,c=a.store.options;if(typeof c.getRootScope=="function"){var x=c.getRootScope(a,{observerType:t,valuePath:o==null?void 0:o.path});x!==void 0&&(d=x)}var P=o||{},T=P.path,z=P.parentPath,G=Jt(a,i.scope,c.scope),U=d;try{if(G===Qe.Current)U=nt(d,z);else if(G===Qe.Parent)U=nt(d,T.slice(0,T.length-2<0?0:T.length-2));else if(G===Qe.Root)U=d;else if(G===Qe.Depends){var J;U=(J=a.depends)===null||J===void 0?void 0:J.map(function(ne){return nt(d,ne)})}else typeof G=="string"?G.startsWith("@")?U=it(a,t,o,Ce()(Ce()({},i),{},{scope:it(a,t,Ce()(Ce()({},o),{},{path:G.slice(1).split(ue)}),Ce()(Ce()({},i),{},{scope:G.slice(1)}))})):U=nt(d,ie(a.path,G)):Array.isArray(G)&&(U=nt(d,G))}catch(ne){c.log("Error while getting computed scope ".concat(a.toString(),": ").concat(ne.message),"error")}return U}var vt=function(){function a(t,o,i){k()(this,a),C()(this,"_path",void 0),C()(this,"_id",""),C()(this,"_initial",void 0),C()(this,"_value",void 0),C()(this,"_associated",!1),C()(this,"_attached",!1),C()(this,"_getter",void 0),C()(this,"_depends",[]),C()(this,"_options",void 0),C()(this,"_subscribers",[]),C()(this,"_strPath",void 0),this.store=t,this.descriptor=o,this.context=i,this._associated=i!==void 0,this._getter=o.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},o.options),this._id=this._options.id||(this._associated?oe(i==null?void 0:i.path):re()),this._path=(i==null?void 0:i.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=ve(this._path,this._options.depends),this._onObserverCreated(),this._onInitial()}return l()(a,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(o){this._options.enable=o}},{key:"group",get:function(){return this._options.group},set:function(o){this._options.group=o}},{key:"initial",get:function(){return this._initial},set:function(o){this._initial=o}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(o){this._depends=o}},{key:"getter",get:function(){return this._getter},set:function(o){this._getter=o}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(ue)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?le(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(o){this._associated?ae(this.store.state,this._path,o):(this._value=o,this.store._notify({type:"set",path:this.path,value:o}))}},{key:"_onObserverCreated",value:function(){typeof this.store.options.onObserverCreated=="function"&&this.store.options.onObserverCreated(this)}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"onInitOptions",value:function(o){}},{key:"update",value:function(o,i){var d=this;this.store.update(function(){d.value=o},i)}},{key:"silentUpdate",value:function(o){this.update(o,{silent:!0})}},{key:"watch",value:function(o,i){var d=this;return this.store.watch(this.getValueWatchPath(),function(c){o.call(d,c)},i)}},{key:"getValueWatchPath",value:function(){return this.path.join(ue)}},{key:"emitStoreEvent",value:function(o,i){var d=this;setTimeout(function(){d.store.emit(o,i)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(o){}},{key:"attach",value:function(){var o=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(o.toString()," subscribed to ").concat(o.depends.map(function(i){return i.join(ue)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(o){return o.off()}),this._attached=!1)}},{key:"run",value:function(){}}]),a}(),mt=function(a){W()(o,a);var t=M()(o);function o(i,d,c){var x;return k()(this,o),x=t.call(this,i,d,c),x.store=i,x.descriptor=d,x.context=c,d.options.depends=ve(x.path,x.options.depends),x}return l()(o,[{key:"toString",value:function(){return"ComputedObject<".concat(oe(this.path),">")}},{key:"isDisable",value:function(d){return!this.store.options.enableComputed||!this.enable&&d!==!0||d===!1}},{key:"run",value:function(d){throw new Error("Method not implemented.")}}]),o}(vt),Ct=function(a){W()(o,a);var t=M()(o);function o(){return k()(this,o),t.apply(this,arguments)}return l()(o,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(d){var c=this,x=Object.assign({first:!1,operate:void 0},d),P=x.first,T=x.operate;if(!P&&this.isDisable(d==null?void 0:d.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!P&&this.store.log(function(){return"Run sync computed for : ".concat(c.toString())});var z=d?Object.assign({},this.options,d):this.options,G=it(this,"computed",this.context,z),U=z.initial;try{U=this.getter.call(this,G,{operate:T,first:P}),P&&(this.initial=U),this.store.peep(function(){c.value=U}),!P&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:U,computedObject:this})}catch(J){throw!P&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:J,computedObject:this}),J}}},{key:"collectDependencies",value:function(){var d=[],c=this.store.watch(function(x){d.push(x.path)},{operates:["get"]});this.run({first:!0}),c.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&d.push.apply(d,m()(ve(this.path,this.options.depends))),this.depends=je(d),this.attach()}},{key:"onDependsChange",value:function(d){this.run({operate:d})}}]),o}(mt);function Ht(a,t,o,i,d){return o==="push"?function(){for(var c=t.length,x=arguments.length,P=new Array(x),T=0;T<x;T++)P[T]=arguments[T];var z=i.apply(t,P);if(t.length>c){var G=Array.from({length:t.length-c},function(U,J){return J+c});a({type:"insert",path:d,indexs:G,value:P,oldValue:void 0,parentPath:d,parent:t})}return z}:o==="pop"?function(){var c=t.length,x=i.apply(t);return t.length===c-1&&a({type:"remove",path:d,indexs:[c-1],value:[x],oldValue:void 0,parentPath:d,parent:t}),x}:o==="splice"?function(c,x){for(var P=arguments.length,T=new Array(P>2?P-2:0),z=2;z<P;z++)T[z-2]=arguments[z];var G=i.apply(t,[c,x].concat(T));if(G.length>0){var U=Array.from({length:G.length},function(ne,ee){return c+ee});a({type:"remove",path:d,indexs:U,value:G,oldValue:void 0,parentPath:d,parent:t})}if(T.length>0){var J=Array.from({length:T.length},function(ne,ee){return c+ee});a({type:"insert",path:d,indexs:J,value:T,oldValue:void 0,parentPath:d,parent:t})}return G}:o==="unshift"?function(){for(var c=t.length,x=arguments.length,P=new Array(x),T=0;T<x;T++)P[T]=arguments[T];var z=i.apply(t,P);if(t.length>c){var G=Array.from({length:t.length-c},function(U,J){return J});a({type:"insert",path:d,indexs:G,value:P,oldValue:void 0,parentPath:d,parent:t})}return z}:o==="shift"?function(){var c=t.length,x=i.apply(t);return t.length===c-1&&a({type:"remove",path:d,indexs:[0],value:[x],oldValue:void 0,parentPath:d,parent:t}),x}:o==="fill"?function(c,x,P){var T=i.apply(t,[c,x,P]),z=x!=null?x:0,G=P!=null?P:t.length,U=Array.from({length:G-z},function(ne,ee){return ee+z}),J=Array.from({length:G-z},function(){return c});return a({type:"update",path:d,indexs:U,value:J,oldValue:void 0,parentPath:d,parent:t}),T}:o==="concat"?function(){for(var c=t.length,x=arguments.length,P=new Array(x),T=0;T<x;T++)P[T]=arguments[T];var z=i.apply(t,P),G=Array.from({length:P.length},function(U,J){return c+J});return a({type:"insert",path:d,indexs:G,value:P,oldValue:void 0,parentPath:d,parent:t}),z}:i}var It=Symbol("__NOTIFY__");function Ot(a,t,o,i,d){if(Le(a)||f()(a)!=="object"||a===null)return a;if(o.has(a))return o.get(a);var c=new Proxy(a,{get:function(P,T,z){var G=Reflect.get(P,T,z);if(typeof T!="string")return G;var U=[].concat(m()(t),[String(T)]);if(typeof G=="function"||!Object.hasOwn(P,T))if(typeof G=="function"){if(Array.isArray(P))return Ht(d.notify,P,T,G,t);if(!Le(G)&&Object.hasOwn(P,T)){var J=U.join(".");try{if(i.has(J)){var ne=[].concat(m()(i.keys()),[J]);throw i.clear(),new Y('Find circular dependency at <"'.concat(U,'">, steps: ').concat(ne.join(" <- ")))}return i.set(J,!0),d.createComputedObject(U,G,t,P)}finally{i.delete(J)}}else return G}else return G;return d.notify({type:"get",path:U,indexs:[],value:G,oldValue:void 0,parentPath:t,parent:P}),Ot(G,U,o,i,d)},set:function(P,T,z,G){var U=Reflect.get(P,T,G),J=Reflect.set(P,T,z,G);if(T===It)return!0;if(J&&T!==It&&z!==U)if(Array.isArray(P))d.notify({type:"update",path:t,indexs:[Number(T)],value:z,oldValue:U,parentPath:t,parent:P});else{var ne=[].concat(m()(t),[String(T)]);d.notify({type:"set",path:ne,indexs:[],value:z,oldValue:U,parentPath:t,parent:P})}return J},deleteProperty:function(P,T){var z=P[T],G=[].concat(m()(t),[String(T)]),U=Reflect.deleteProperty(P,T);return U&&T!==It&&d.notify({type:"delete",path:G,indexs:[],value:z,oldValue:void 0,parentPath:t,parent:P}),U}});return o.set(a,c),c}function Yt(a,t){var o=new Map,i=new WeakMap;return Ot(a,[],i,o,t)}var Xt=e(28633),Oe=e.n(Xt),Qt=e(75396),qt=e.n(Qt),ea=e(21206);function ta(a){return a instanceof Error?a:new Error(a)}var St=function(a){W()(o,a);var t=M()(o);function o(){var i;k()(this,o);for(var d=arguments.length,c=new Array(d),x=0;x<d;x++)c[x]=arguments[x];return i=t.call.apply(t,[this].concat(c)),C()(_()(i),"_isRunning",!1),C()(_()(i),"_defaultAbortController",null),C()(_()(i),"_userAbortController",void 0),C()(_()(i),"_firstRun",!1),i}return l()(o,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return E()(O()(o.prototype),"value",this)},set:function(d){qt()(O()(o.prototype),"value",d,this,!0)}},{key:"running",get:function(){return this._isRunning}},{key:"onInitOptions",value:function(d){d.reentry||(d.reentry=this.store.options.reentry)}},{key:"onInitial",value:function(){var d=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(d.options.immediate===!0||d.options.immediate==="auto"&&d.options.initial===void 0)&&d.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var d=this;return Object.assign(C()(C()(C()(C()(C()(C()(C()(C()(C()({},Ie,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",A(function(c){return d.store.computedObjects.run(d.id,Object.assign({},c))})),"cancel",A(function(){d.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(d){var c=this,x=this.strPath,P=Object.keys(d).length;if(this.associated)this.store.update(function(z){ge(z,c.path,d)},{batch:P>1?x:!1});else{Object.assign(this.value,d);var T=P>1;Object.entries(d).forEach(function(z){var G=Oe()(z,2),U=G[0],J=G[1],ne={type:"set",path:[c.strPath,U],value:J,parent:c.value};T&&(ne.reply=!0),c.store.operates.emit("".concat(c.strPath,".").concat(U),ne)}),T&&this.store.operates.emit(x,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var i=n()(v()().mark(function c(x){var P=this,T,z,G,U,J;return v()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:if(T=x!=null?x:{},z=T.first,!this.isDisable(x==null?void 0:x.enable)){ee.next=4;break}return this.store.log(function(){return"Async computed <".concat(P.toString(),"> is disabled")},"warn"),ee.abrupt("return");case 4:if(this._firstRun=!0,!z&&this.store.log(function(){return"Run async computed for : ".concat(P.toString())}),G=x?Object.assign({first:z},this.options,x):this.options,U=it(this,"computed",this.context,G),J=G.reentry,!(this._isRunning&&!J)){ee.next=13;break}return this.store.log(function(){return"Async computed: ".concat(P.toString()," is over maximum reentry count")},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),ee.abrupt("return");case 13:return this._isRunning=!0,ee.prev=14,ee.next=17,this.executeGetter(U,G);case 17:return ee.abrupt("return",ee.sent);case 18:return ee.prev=18,this._isRunning=!1,ee.finish(18);case 21:case"end":return ee.stop()}},c,this,[[14,,18,21]])}));function d(c){return i.apply(this,arguments)}return d}()},{key:"createComputeProgressbar",value:function(d){var c=this,x=Object.assign({},d),P=x.max,T=P===void 0?100:P,z=x.min,G=z===void 0?0:z,U=x.value,J=U===void 0?0:U;return this.updateComputedValue({progress:J}),{value:function(ee){ee>T&&(ee=T),ee<G&&(ee=G),c.updateComputedValue({progress:ee})},end:function(){this.value(T)}}}},{key:"getAbortController",value:function(d){if(d&&typeof d.abortController=="function"){var c=d.abortController();c&&c instanceof AbortController&&(this._userAbortController=c)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(d,c,x){var P=this,T=x.timeout,z=Array.isArray(T)?T:[T,0],G=Oe()(z,2),U=G[0],J=U===void 0?0:U,ne=G[1],ee=ne===void 0?0:ne,ce,me;return J>0&&(c.timeout=ee>1?ee:J,me=setTimeout(function(){d.hasTimeout=!0,d.hasError=!0,d.error="TIMEOUT",typeof d.timeoutCallback=="function"&&d.timeoutCallback(),clearInterval(ce),P.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},J),ee>1&&(ce=setInterval(function(){P.updateComputedValue({timeout:ee--}),ee===0&&clearInterval(ce)},J/(ee+1)))),{clear:function(){clearTimeout(me),clearInterval(ce)},enable:J>0}}},{key:"executeGetter",value:function(){var i=n()(v()().mark(function c(x,P){var T,z,G,U,J,ne,ee,ce,me,pe,xe,ye,Be,Ee,Ne,ke;return v()().wrap(function(be){for(;;)switch(be.prev=be.next){case 0:T=P.retry,z=T===void 0?[0,0]:T,G=Array.isArray(z)?z:[Number(z),0],U=Oe()(G,2),J=U[0],ne=U[1],ce=this.getAbortController(P),me={onTimeout:function(Xe){return ee=Xe},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Xe){return Xe},cancel:ce.abort,extras:P.extras,operate:P.operate,first:P.first,abortSignal:ce.signal},pe={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:ee},ce.signal.addEventListener("abort",function(){return pe.hasAbort=!0}),xe={clear:function(){},enable:!1},Be=function(Xe){return Object.assign(pe,Xe)},Ee=0;case 9:if(!(Ee<J+1)){be.next=46;break}if(Ne={},be.prev=11,ke={loading:!0},pe.hasError&&(ke.error=null),J>0&&(ke.retry=Ee>0?J-Ee+1:0),Ee>0&&Be({error:null,hasError:!1,hasTimeout:!1}),xe=this.setTimeoutControl(pe,ke,P),this.updateComputedValue(ke),!pe.hasAbort){be.next=20;break}throw new w;case 20:return be.next=22,this.getter.call(this,x,me);case 22:if(ye=be.sent,!pe.hasAbort){be.next=25;break}throw new w;case 25:pe.hasTimeout||(Ne.value=ye,xe.enable&&(Ne.timeout=0)),be.next=33;break;case 28:be.prev=28,be.t0=be.catch(11),pe.hasError=!0,pe.error=be.t0,pe.hasTimeout||(Ne.error=ta(be.t0).message);case 33:return be.prev=33,xe.clear(),Ee===J&&(pe.hasTimeout&&(Ne.error=pe.error),J>0&&(Ne.retry=0)),Ne.loading=!1,this.updateComputedValue(Ne),be.finish(33);case 39:if(!pe.hasError){be.next=43;break}if(!(J>0&&ne>0&&Ee<J)){be.next=43;break}return be.next=43,(0,ea.g)(ne);case 43:Ee++,be.next=9;break;case 46:pe.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):pe.hasError||pe.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:pe.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:ye,computedObject:this}),this.onDoneCallback(P,pe.error,pe.hasAbort,pe.hasTimeout,x,ye);case 48:case"end":return be.stop()}},c,this,[[11,28,33,39]])}));function d(c,x){return i.apply(this,arguments)}return d}()},{key:"onDoneCallback",value:function(d,c,x,P,T,z){typeof d.onDone=="function"&&d.onDone.call(this,{id:this.id,path:this.path,value:z,error:c,abort:x,timeout:P,scope:T})}},{key:"onDependsChange",value:function(d){var c=this;this.store.log(function(){return"AsyncComputed<".concat(c.id,"> is running by depends ").concat(d.type,"/").concat(d.path.join(".")," operate ")}),this.run({operate:d,first:!this._firstRun})}},{key:"getValueWatchPath",value:function(){var d=this.path.join(ue);return["".concat(d,".*"),d]}},{key:"getDepends",value:function(){var d=this,c=E()(O()(o.prototype),"getDepends",this).call(this);return c.map(function(x){if(x.length===0)return x;var P=S()(d.store.computedObjects.values()),T;try{for(P.s();!(T=P.n()).done;){var z=T.value;if(We(z.path,x)&&z.async)return["".concat(x,".value")]}}catch(G){P.e(G)}finally{P.f()}return x})}}]),o}(mt);function Bt(){var a=arguments[0],t=typeof arguments[1]=="function"?arguments[1]:function(){return!0},o=f()(arguments[1])==="object"?arguments[1]:arguments[2],i=Object.assign({depends:[],enable:!0,objectify:!0,filter:t},o),d=function(){return{type:"watch",getter:a,options:i}};return d[X]=!0,d}var Nt=function(a){W()(o,a);var t=M()(o);function o(i){var d;return k()(this,o),d=t.call(this),C()(_()(d),"_watcher",{off:function(){}}),C()(_()(d),"_enable",!0),d.store=i,d}return l()(o,[{key:"enable",get:function(){return this._enable},set:function(d){this._enable=d}},{key:"set",value:function(d,c){return E()(O()(o.prototype),"size",this)===0&&this.createWacher(),E()(O()(o.prototype),"set",this).call(this,d,c)}},{key:"createWacher",value:function(){var d=this;this._watcher=this.store.watch("**",function(c){var x=c.path,P=c.value;if(d._enable){var T=x[0].startsWith("#")?P:le(d.store.state,x),z=S()(d.values()),G;try{for(z.s();!(G=z.n()).done;){var U=G.value;U.isMatched(x,T)&&U.run(x,T)}}catch(J){z.e(J)}finally{z.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off();var d=S()(this.values()),c;try{for(d.s();!(c=d.n()).done;){var x=c.value;x.reset()}}catch(P){d.e(P)}finally{d.f()}this.createWacher()}},{key:"create",value:function(){var d=Ke(arguments[0])?arguments[0]:Bt.apply(void 0,arguments)();return this.store._createWatch(d)}},{key:"enableGroup",value:function(d){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,x=S()(this.values()),P;try{for(x.s();!(P=x.n()).done;){var T=P.value;T.options.group===d&&(T.options.enable=c)}}catch(z){x.e(z)}finally{x.f()}}}]),o}(j()(Map)),Pt=function(a){W()(o,a);var t=M()(o);function o(i,d,c){var x;if(k()(this,o),x=t.call(this,i,d,c),C()(_()(x),"_cache",void 0),x.store=i,x.context=c,typeof x.options.filter!="function")throw new Error("watch options.filter must be a function");return x}return l()(o,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(d,c){return ze(d,this.path)?!1:this.filter(d,c)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(d,c){if(!this.enable){this.store.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var x,P=(x=this.getter)===null||x===void 0?void 0:x.call(this,{path:d,value:c},this);this.value=P,this.emitStoreEvent("watch:done",{value:P,watchObject:this})}catch(T){this.emitStoreEvent("watch:error",{error:T,watchObject:this})}}}]),o}(vt),At=ue;function Dt(a,t){if(!t||t==="**")return!0;var o=a.split(At),i=t.split(At);if(o.length!==i.length)return!1;for(var d=0;d<i.length;d++)if(i[d]!=="*"&&i[d]!==o[d])return!1;return!0}var ft=function(){function a(){k()(this,a),C()(this,"_listeners",new Map)}return l()(a,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var o=this,i=arguments[0],d=arguments[1],c=arguments[2],x=d;return i==="**"?this.addHandler("*",x,c):String(i).includes("*")?(x=function(T,z){Dt(z,i)&&d(T,z)},this.addHandler("*",x,c)):this.addHandler(i,x,c),{off:function(){return o.off(i,x)}}}},{key:"addHandler",value:function(o,i,d){var c=this._listeners.get(o);c?d?c.unshift(i):c.push(i):this._listeners.set(o,[i])}},{key:"once",value:function(o,i){var d=this,c=function x(P,T){try{i(P,T)}finally{d.off(T,x)}};return this.on(o,c)}},{key:"off",value:function(o,i){String(o).includes("*")&&(o="*");var d=this._listeners.get(o);d&&(i?d.splice(d.indexOf(i)>>>0,1):this._listeners.set(o,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(o){return this.on("**",o)}},{key:"wait",value:function(){var o=this,i=f()(arguments[0]),d=i==="string"?arguments[0]:void 0,c=arguments[1]||0,x=i==="function"?i:void 0,P;return new Promise(function(T,z){var G;d?G=o.once(d,function(U){clearTimeout(P),T(U)}):typeof x=="function"&&(G=o.onAny(function(U,J){var ne=x(J,U);ne!==!1&&(G.off(),clearTimeout(P),T(U))})),c>0&&(P=setTimeout(function(){G.off(),z(new Error("timeout"))},c))})}},{key:"emit",value:function(o,i){var d=this._listeners.get("*");d&&d.slice().map(function(c){c(i,o)}),d=this._listeners.get(o),d&&d.slice().map(function(c){c(i,o)})}}]),a}();function aa(a){var t;return et(a)?t=a():typeof a=="function"&&(t={type:"computed",getter:a,options:Object.assign({},Fe(),{async:he(a)})}),t}function jt(a,t){if(t==="*")return!0;if(t==="write"){if(a.type==="get")return}else if(t==="read"){if(a.type!=="get")return}else if(Array.isArray(t)&&t.length>0&&!t.includes(a.type))return;return!0}var Mt=function(a){W()(o,a);var t=M()(o);function o(i,d){var c;return k()(this,o),c=t.call(this),C()(_()(c),"_data",void 0),C()(_()(c),"computedObjects",void 0),C()(_()(c),"watchObjects",void 0),C()(_()(c),"_operates",new ft),C()(_()(c),"_options",void 0),C()(_()(c),"_silenting",!1),C()(_()(c),"_batching",!1),C()(_()(c),"_batchOperates",[]),C()(_()(c),"_peeping",!1),c._options=(0,zt.w)({id:re(),debug:!1,lazy:!1,enableComputed:!0,reentry:!0,log:Zt},d),c.computedObjects=new bt(_()(c)),c.watchObjects=new Nt(_()(c)),c.subscribeCallbacks(),c._data=Yt(i,{notify:c._notify.bind(_()(c)),createComputedObject:c.createObserverObject.bind(_()(c))}),c.getSnap=c.getSnap.bind(_()(c)),c.watch=c.watch.bind(_()(c)),c.update=c.update.bind(_()(c)),c.peep=c.peep.bind(_()(c)),c.silentUpdate=c.silentUpdate.bind(_()(c)),c.batchUpdate=c.batchUpdate.bind(_()(c)),c.collectDependencies=c.collectDependencies.bind(_()(c)),c.trace=c.trace.bind(_()(c)),c.installExtends(),c._options.lazy||_e(c._data),c._options.debug&&f()(globalThis.__AUTOSTORE_DEVTOOLS__)==="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(_()(c)),c.emit("load",_()(c)),c}return l()(o,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(d,c){this._options.debug&&this.options.log.call(this,d,c)}},{key:"installExtends",value:function(){var d=this,c=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(c)&&c.forEach(function(x){return typeof x=="function"&&x(d)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(d){this._peeping&&d.type==="get"||(this._batching&&this._batchOperates.push(d),!this._silenting&&this.operates.emit(d.path.join(ue),d))}},{key:"watch",value:function(){var d=this,c=typeof arguments[0]=="function"||arguments[0]==="*",x=c?arguments[0]:arguments[1],P=function(Ne,ke){return function(Re){if(jt(Re,Ne)&&!(typeof ke=="function"&&!ke(Re)))try{if(d._peeping=!0,Re.type==="batch"){var be=Re.value.filter(function(Ye){return jt(Ye,Ne)});be.length>0&&(Re.value=be)}x(Re)}finally{d._peeping=!1}}};if(c){var T=Object.assign({once:!1,operates:"write"},arguments[1]),z=T.operates,G=T.filter,U=P(z,G);return this.operates.onAny(U)}else{var J=arguments[0],ne=Array.isArray(J)?J.map(function(Ee){return typeof Ee=="string"?Ee:Ee.join(ue)}):[J],ee=Object.assign({once:!1,operates:"write"},arguments[2]),ce=ee.once,me=ee.operates,pe=ee.filter,xe=ce?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),ye=[],Be=P(me,pe);return ne.forEach(function(Ee){ye.push(xe.call(d,Ee,Be))}),{off:function(){return ye.forEach(function(Ne){return Ne.off()})}}}}},{key:"createObserverObject",value:function(d,c,x,P){var T=aa(c),z={path:d,value:c,parentPath:x,parent:P};if(T){if(T.type==="computed"){var G=this._createComputed(T,z);return G==null?void 0:G.initial}else if(T.type==="watch"){var U=this._createWatch(T,z);return U==null?void 0:U.initial}}else return c}},{key:"_createComputed",value:function(d,c){var x;return d.options.async?x=new St(this,d,c):x=new Ct(this,d,c),x&&(x.silentUpdate(x.initial),x.options.objectify&&this.computedObjects.set(x.id,x),this.emit("computed:created",x)),x}},{key:"_createWatch",value:function(d,c){var x=new Pt(this,d,c);return this.watchObjects.set(x.id,x),this.emit("watch:created",x),x}},{key:"silentUpdate",value:function(d){this.update(d,{silent:!0})}},{key:"batchUpdate",value:function(d){this.update(d,{batch:!0})}},{key:"update",value:function(d,c){var x=Object.assign({},c),P=x.batch,T=P===void 0?!1:P,z=x.reply,G=z===void 0?!0:z,U=x.silent,J=U===void 0?!1:U,ne=x.peep,ee=ne===void 0?!1:ne;if(typeof d=="function"){J&&(this._silenting=!0),T&&(this._batching=!0,this._silenting=!0),ee&&(this._peeping=!0);try{var ce=d(this.state);if(T&&lt(ce))throw new Error("Batch update method can't be async function")}finally{this._silenting=!1,this._batching=!1,this._peeping=!1,this.replyBatchOperates(G,T)}}else throw new Error("update method must provide a function argument")}},{key:"replyBatchOperates",value:function(d,c){var x=this;if(this._batchOperates.length>0){var P=m()(this._batchOperates);this._batchOperates=[],d&&P.forEach(function(z){z.reply=!0,x._notify(z)});try{var T=c===!0?de:String(c);this.operates.emit(T,{type:"batch",path:[T],value:P})}finally{this._batchOperates=[]}}}},{key:"peep",value:function(){var d=arguments,c=this,x=typeof arguments[0]=="function"?function(){return d[0](c.state)}:function(){return le(c.state,Array.isArray(d[0])?d[0]:d[0].split(ue))};this._peeping=!0;try{return x()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(d){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",x=[],P=this.watch(function(T){x.push(T.path)},{operates:c});try{d()}finally{P.off()}return je(x)}},{key:"trace",value:function(d){var c=this,x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",P;return{stop:function(){return P&&P.off()},start:function(){var T=n()(v()().mark(function G(U){var J;return v()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return J=[],ee.abrupt("return",new Promise(function(ce){P=c.watch(function(me){J.push(me),U&&U(me)&&(P.off(),ce(J))},{operates:x}),Promise.resolve(d()).finally(function(){typeof U!="function"&&(P.off(),ce(J))})}));case 2:case"end":return ee.stop()}},G)}));function z(G){return T.apply(this,arguments)}return z}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(d){var c=Object.assign({reserveAsync:!0},d),x=c.reserveAsync,P=c.entry;return st(P?le(this._data,P):this._data,x)}}]),o}(ft);function He(a,t,o,i){if(!t)return a.state;var d;try{typeof t=="function"?d=t(a.state):Array.isArray(t)?d=le(a.state,t):d=le(a.state,t.split(ue)),o&&Te(d)&&(d=d.value)}catch(c){if(i)return i(c)}return d}function na(a){return function(){var t=arguments,o=t.length>=1&&(Array.isArray(t[0])||typeof t[0]=="string"||typeof t[0]=="function")?t[0]:void 0,i=t.length===2&&typeof t[1]=="function"?t[1]:void 0,d=t.length===2&&(typeof o=="string"||Array.isArray(o))&&typeof t[1]=="boolean"?t[1]:!1,c=(0,I.useState)(function(){return He(a,o,d!==!0)}),x=Oe()(c,2),P=x[0],T=x[1],z=a.useDeps(o,d===!0?"all":"value");(0,I.useEffect)(function(){var U;return z.length===0?U=a.watch(function(J){var ne=J.reply;ne||T(Ce()({},a.state))}):U=a.watch(z,function(){var J=He(a,o);T(we(J)?Ce()({},J):Array.isArray(J)?m()(J):J)}),function(){return U.off()}},[z]);var G=(0,I.useCallback)(function(U){o?typeof o=="string"?a.update(function(J){return ae(J,o.split(ue),U)}):Array.isArray(o)?a.update(function(J){return ae(J,o,U)}):typeof o=="function"&&i&&a.update(function(J){return i(U,J)}):typeof U=="function"&&a.update(function(J){return U(J)},{batch:!0})},[o]);return[P,G]}}function ra(a){return function(t){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",i=(0,I.useState)(function(){if(Array.isArray(t)){var x=[];return t.forEach(function(P){x.push.apply(x,m()(Ue(P,a,o)))}),x}else return Ue(t,a,o)}),d=Oe()(i,1),c=d[0];return je(c)}}var Ae=e(651);function oa(a,t,o){var i=o.errorBoundary||a.options.signalErrorBoundary;return I.memo(function(){var d=a.useDeps(t),c=(0,I.useState)(null),x=Oe()(c,2),P=x[0],T=x[1],z=(0,I.useState)(function(){return He(a,t,!0,T)}),G=Oe()(z,2),U=G[0],J=G[1];return(0,I.useEffect)(function(){var ne=a.watch(d,function(){J(He(a,t,!0,T))});return function(){return ne.off()}},[d]),(0,Ae.jsx)(Ae.Fragment,{children:P?(0,Ae.jsx)(i,{error:P}):typeof U=="boolean"?String(U):U})},function(){return!0})}function ua(a,t,o,i){var d=i.errorBoundary||a.options.signalErrorBoundary;return I.memo(function(){var c=(0,I.useState)(null),x=Oe()(c,2),P=x[0],T=x[1],z=(0,I.useState)(function(){return He(a,o,!1,T)}),G=Oe()(z,2),U=G[0],J=G[1],ne=Te(U),ee=(0,I.useMemo)(function(){return ne?U:{value:U}},[U]),ce=a.useDeps(o,"none");return(0,I.useEffect)(function(){var me=ne?"".concat(Array.isArray(o)?o.join(ue):o,".*"):ce,pe=a.watch(me,function(xe){var ye=xe.path,Be=xe.value;J(ne?Ce()(Ce()({},U),{},C()({},ye[ye.length-1],Be)):He(a,o,!1,T))});return function(){return pe.off()}},[ce]),(0,Ae.jsx)(Ae.Fragment,{children:P?(0,Ae.jsx)(d,{error:P}):t(ee)})},function(){return!0})}function la(a,t,o,i){var d=i.errorBoundary||a.options.signalErrorBoundary;return I.memo(function(){var c=(0,I.useState)(null),x=Oe()(c,2),P=x[0],T=x[1],z=et(o)?o():o,G=(0,I.useState)(function(){try{if(Ke(z)){if(z.options.objectify=!1,z.type==="computed")return a.computedObjects.create(z);if(z.type==="watch")return a.watchObjects.create(z)}else{var pe=Ge(z),xe=pe();return xe.options.objectify=!1,a.computedObjects.create(xe)}}catch(ye){return T(ye),null}}),U=Oe()(G,1),J=U[0],ne=(0,I.useState)(function(){return J?J.async?J.value:{value:J.value}:{value:""}}),ee=Oe()(ne,2),ce=ee[0],me=ee[1];return(0,I.useEffect)(function(){var pe={off:function(){}};return J&&(pe=J.watch(function(xe){if(!xe.reply)try{if(J.type==="computed")if(J.async){var ye=J;(We(xe.path,ye.path)||We(xe.path.slice(0,-1),ye.path))&&me(Ce()({},ye.value))}else me({value:J.value});else J.type==="watch"&&me({value:J.value})}catch(Be){T(Be)}},{operates:"write"})),function(){return pe.off()}},[z]),(0,Ae.jsx)(Ae.Fragment,{children:P?(0,Ae.jsx)(d,{error:P}):t(ce)})},function(){return!0})}function da(a){return function(){var t=arguments,o=t.length>=1&&(typeof t[0]=="string"||typeof t[0]=="function")&&(!t[1]||we(t[1]))?t[0]:void 0,i=t.length>=2&&typeof t[0]=="function"&&(typeof t[1]=="string"||Array.isArray(t[1])||typeof t[1]=="function")?t[0]:void 0,d=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,c=t.length>=2&&typeof t[0]=="function"&&typeof t[1]=="string"?t[1]:void 0,x=Object.assign({},t.length>1&&we(t[t.length-1])?t[t.length-1]:void 0),P=o?oa(a,o,x):c?ua(a,i,c,x):d?la(a,i,d,x):function(){return(0,Ae.jsx)(Ae.Fragment,{})};return(0,Ae.jsx)(P,{})}}function xt(a){return typeof a=="number"||typeof a=="string"&&!isNaN(parseFloat(a))}function Rt(a){var t=a;if(a){a.persist&&a.persist();var o=a.currentTarget;if(o&&a.type){var i=o.tagName.toLowerCase(),d=o.type;if(i==="input")if(d==="checkbox")t=o.checked;else if(o.type==="radio"){for(var c=o.dataset.fieldName,x=document.querySelectorAll(`input[type="radio"][name='`.concat(c,"']")),P=0;P<x.length;P++)x[P].checked=!1;t=o.value,o.checked=!0}else t=o.value;else t=o.value}else a.nativeEvent&&a.target&&(t=a.target.value)}return typeof t=="string"&&(xt(t)?t=Number(t):t==="true"||t==="false"?t=t==="true":(t.startsWith("'")&&t.endsWith("'")||t.startsWith('"')&&t.endsWith('"'))&&(t=t.slice(1,t.length-1))),t}function sa(a){return function(){var t=arguments,o=t.length>=1&&typeof t[0]=="string"?t[0]:void 0;if(!o)throw new Error("Input bind must have at least one argument");var i={};return i.onChange=function(d){var c=Rt(d);ae(a.state,o.split(ue),c)},i}}function Ve(a,t,o,i,d,c,x){var P=function(G){if(x.type==="radio")return d===G;if(x.type==="checkbox")return!!i},T=x.name?x.name:Array.isArray(t)?t.join(ue):t||"";return new Proxy({value:i,onChange:function(G){var U=Rt(G);ct(x.toState)&&(U=x.toState(U,{path:t,part:o})),ct(c)?c({value:U,path:t,part:o},a.state):t&&a.update(function(J){return ae(J,t,U)})},name:T,checked:P(i)},{get:function(G,U,J){if(xt(U)&&x.type==="radio"&&x.values){var ne=Number(U);return Ve(a,t,ne,x.values[ne],i,c,x)}return Reflect.get(G,U,J)}})}function Lt(a){return function(){var t=arguments,o=Array.isArray(t[0])&&t[0].length>1,i=t.length>=1&&typeof t[0]=="string"?t[0].split(ue):void 0,d=t.length>=2&&typeof t[0]=="function"?t[0]:void 0,c=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,x=o?t[0]:[i||d],P=(0,I.useState)(function(){return t.length>=2&&we(t[1])?t[1]:t.length===3&&we(t[2])?t[2]:{}}),T=Oe()(P,1),z=T[0],G=(0,I.useState)(function(){return x.map(function(ye,Be){if(typeof ye=="function")return Ve(a,void 0,Be,ye(a.state),void 0,c,z);var Ee=He(a,ye,!0);return Ve(a,Array.isArray(ye)?ye:ye.split(ue),Be,Ee,void 0,c,z)})}),U=Oe()(G,2),J=U[0],ne=U[1],ee=(0,I.useState)(function(){var ye=x.map(function(Ee){return Ue(Ee,a,"value")}),Be=je(ye.reduce(function(Ee,Ne){return Ne&&Ee.push.apply(Ee,m()(Ne)),Ee},[]));return[ye,Be]}),ce=Oe()(ee,1),me=Oe()(ce[0],2),pe=me[0],xe=me[1];return xe.length===0||t.length===0?{}:((0,I.useEffect)(function(){var ye;return ye=a.watch(xe,function(Be){var Ee=Be.path,Ne=Be.value;pe.forEach(function(ke,Re){if(ke.some(function(Xe){return We(Xe,Ee)})){var be=x[Re];if(typeof be=="function"){var Ye=be(a.state);J[Re]=Ve(a,void 0,Re,Ye,void 0,c,z),ne(m()(J))}else J[Re]=Ve(a,Ee,Re,Ne,void 0,c,z),ne(m()(J))}})}),function(){return ye.off()}},[xe]),o?J:J[0])}}function ca(a){var t=arguments;return function(){var o=t[0],i=t[1],d=t[2];(0,I.useEffect)(function(){var c=a.watch(o,i,d);return function(){return c.off()}},[])}}var ht=Symbol("FAKE_BINDINGS");function gt(a,t){var o={};return t instanceof Map?t.forEach(function(i,d){o[d]=ht}):Object.entries(t).forEach(function(i){var d=Oe()(i,1),c=d[0];o[c]=ht}),o}function $t(a,t,o,i,d){var c=Array.isArray(d.entry)?d.entry:d.entry.split(ue);if(f()(a)!=="object"||a===null)return a;var x=t.length===0?"__ROOT__":t.join(".");if(o.has(x))return o.get(x);var P=a;(Array.isArray(a)||we(a))&&(P=gt(i,a));var T=new Proxy(P,{get:function(G,U,J){if(typeof U!="string")return Reflect.get(G,U,J);var ne=[].concat(m()(c),m()(t),[String(U)]),ee=[].concat(m()(t),[String(U)]).join(ue),ce=le(i.state,ne);if(Et(ce)){var me=ee in d?d[ee]:{};return Ve(i,ne,0,ce,void 0,void 0,me)}else if(Te(ce)){var pe=ee in d?d[ee]:{};return Ve(i,[].concat(m()(ne),["value"]),0,ce,void 0,void 0,pe)}else return $t(ce,ne,o,i,d)}});return o.set(x,T),T}function Tt(a,t){var o=new Map;return $t({},[],o,a,t)}function kt(a){return Array.isArray(a)?a:a.split(ue)}function Ft(a){return function(t){var o=Object.assign({entry:[]},t),i=(0,I.useState)(function(){return a.getSnap({entry:kt(o.entry)})}),d=Oe()(i,2),c=d[0],x=d[1],P=(0,I.useState)(function(){return Tt(a,o)}),T=Oe()(P,1),z=T[0];return(0,I.useSyncExternalStore)(function(G){var U=kt(o.entry),J=a.watch(function(ne){if(!ne.reply){var ee=ne.type=="batch"?ne.value:[ne];ee.forEach(function(ce){var me=ce.path,pe=ce.value;if(Pe(U,me)){var xe=me.slice(U.length);ae(c,xe,pe),ae(z,[].concat(m()(xe),["value"]),pe)}}),x(Ce()({},c)),G()}},{operates:"write"});return function(){J.off()}},function(){return c}),z}}var rt=function(a){W()(o,a);var t=M()(o);function o(i,d){var c;return k()(this,o),c=t.call(this,i,Object.assign({signalErrorBoundary:function(){return(0,Ae.jsx)(Ae.Fragment,{children:"ERROR"})}},d)),C()(_()(c),"useState",void 0),C()(_()(c),"useAsyncState",void 0),C()(_()(c),"useDeps",void 0),C()(_()(c),"$",void 0),C()(_()(c),"signal",void 0),C()(_()(c),"useWatch",void 0),C()(_()(c),"bind",void 0),C()(_()(c),"useField",void 0),C()(_()(c),"useFields",void 0),C()(_()(c),"useReactive",void 0),C()(_()(c),"useAsyncReactive",void 0),c.signal=c.$=da(_()(c)).bind(_()(c)),c.useState=na(_()(c)).bind(_()(c)),c.useAsyncState=function(x){return c.useState(x,!0)[0]},c.useDeps=ra(_()(c)).bind(_()(c)),c.useWatch=ca(_()(c)).bind(_()(c)),c.bind=sa(_()(c)).bind(_()(c)),c.useField=Lt(_()(c)).bind(_()(c)),c.useFields=Ft(_()(c)).bind(_()(c)),c.useReactive=c.useState,c.useAsyncReactive=c.useAsyncState.bind(_()(c)),c}return l()(o)}(Mt);function ia(a,t){return new rt(a,t)}function Wt(a,t){if(a)try{if(a.classList){var o;(o=a.classList).remove.apply(o,m()(t.split(/\s+/)))}}catch(i){}}function Da(a,t){if(t){var o=a.getAttribute("style")||"";o.endsWith(";")||(o+=";"),t.endsWith(";")||(t=t+=";"),t.split(";").forEach(function(i){var d=i.split(":"),c=_slicedToArray(d,2),x=c[0],P=c[1];a.style[x]=P})}}function ja(a,t){t&&(t.endsWith(";")||(t=t+=";"),t.split(";").forEach(function(o){var i=o.split(":"),d=_slicedToArray(i,2),c=d[0],x=d[1];a.style[c]=""}))}function pa(a,t){var o=a.indexOf(t);o>=0&&a.splice(o,1)}function Ma(a,t,o){if(t){var i=function(c,x){o==="style"?insertStyle(a,x):addClass(a,x)};_typeof(t)==="object"?Object.entries(t).forEach(function(d){var c=_slicedToArray(d,2),x=c[0],P=c[1],T=x.toLocaleUpperCase()==="ROOT"?a:a.querySelector(x);i(T,P)}):typeof t=="string"&&i(a,t)}}function Ra(a,t,o){if(t){var i=function(c,x){o==="style"?removeStyle(a,x):removeClass(a,x)};_typeof(t)==="object"?Object.entries(t).forEach(function(d){var c=_slicedToArray(d,2),x=c[0],P=c[1],T=x.toLocaleUpperCase()==="ROOT"?a:a.querySelector(x);i(T,P)}):typeof t=="string"&&i(a,t)}}function ot(a){return["input","textarea","select"].includes(a.tagName.toLowerCase())}function va(a){return a.tagName.toLowerCase()==="input"}function ma(a){return a.tagName.toLowerCase()==="select"}var wt=Symbol("empty"),qe="invalid",Ia="data-invalid-tips",fa="data-field-part",La="data-validate-field",$a={ROOT:"color:red;border:1px solid red;",input:"color:red;border:1px solid red;"};function xa(a){var t=a.querySelectorAll(":scope input[name],input[name][value=''],textarea[name],textarea[name][value=''],select[name],select[name][value=''],[data-field-name]"),o=Array.from(t).filter(function(i){return i.nodeType&&i.nodeType===1});return o}function ha(a,t){var o=t?t(a):xa(a);return o.reduce(function(i,d){var c=d.getAttribute("name")||d.getAttribute("data-field-name");if(c){var x=Array.from(ot(d)?[d]:d.querySelectorAll("input,textarea,select"));if(x.forEach(function(P){P.setAttribute("name",c)}),i[c]||(i[c]=[]),i[c].length>0&&ot(d)&&i[c].some(function(P){return!ot(P.el)&&P.inputs.findIndex(function(T){return T===d})>=0}))return i;i[c].push({path:c,el:d,inputs:x,invalidTips:d.getAttribute(Ia)})}return i},{})}function ga(a,t,o,i,d){if(!o)return t;if(Array.isArray(i))i[parseInt(o)]=t;else if(f()(i)==="object")i[o]=t;else{if(typeof i=="string")return i.replace(new RegExp(o),function(c,x){return c.replace(x,t)});if(typeof i=="boolean")return!!t;if(typeof i=="number")return parseFloat(t)}return t}function _a(a,t,o,i,d){var c=d.toState||ga,x=t.dataset.fieldPart,P=o.split(ue),T=t.dataset.typeof,z=a.peep(function(U){return le(U,P)}),G=c(o,i,x,z,t);a.update(function(U){ae(U,o.split(ue),G)},{peep:!0})}function Ut(a){return typeof a=="boolean"}function pt(a){return a==null?!0:Array.isArray(a)?a.length===0:f()(a)==="object"?Object.keys(a).length===0:typeof a=="string"?a.trim()==="":!1}function ya(a){return a==null?!1:typeof a=="boolean"||typeof a=="number"||typeof a=="string"||_typeof(a)==="symbol"?!0:Array.isArray(a)?a.every(ya):!!React.isValidElement(a)}function Kt(a){var t,o=a.dataset.typeof;if(va(a))if(a.type==="checkbox")if(pt(a.value))t=a.checked;else{var i=String(a.value).split(","),d=Oe()(i,2),c=d[0],x=d[1];t=a.checked?c:x}else if(a.type==="radio"){var P=a.name,T=document.querySelectorAll('input[type="radio"][name="'.concat(P,'"]'));if(T.length>1){var z=Array.from(T).findIndex(function(U){return U.checked});t=z>=0?T[z].value:null}else t=T[0].checked}else t=a.value;else if(ma(a))if(a.multiple){var G=a.selectedOptions;t=Array.from(G).map(function(U){return U.value})}else t=a.value;else t=a.value;if(o){if(o==="boolean")t=t==="true";else if(o==="number")t=parseFloat(t);else if(o==="object")try{t=JSON.parse(t)}catch(U){}}return t}function Ea(a,t){if(a.type==="checkbox")if(pt(a.value))a.checked=t;else{var o=String(a.value).split(","),i=Oe()(o,2),d=i[0],c=i[1];a.checked=d==t}else if(a.type==="radio"){var x=a.name,P=document.querySelectorAll('input[type="radio"][name="'.concat(x,'"]')),T=S()(P),z;try{for(T.s();!(z=T.n()).done;){var G=z.value,U=G.dataset.typeof;U?U==="boolean"?G.checked=G.value===String(t):U==="number"?G.checked=parseFloat(G.value)===t:G.checked=G.value==t:G.checked=G.value==t}}catch(J){T.e(J)}finally{T.f()}}else a.value=t}function ba(a,t,o){if(!o)return t;if(Array.isArray(t)&&xt(o))return t[o];if(f()(t)==="object")return t[o];if(typeof t=="string"){var i=t.match(new RegExp(o));if(i)return i.length===1?i[0]:i[1]}return t}function Vt(a,t,o,i){var d=o.fromState||ba,c=!1;return a.inputs.forEach(function(x){if(i){if(x.type==="checkbox")pt(x.value)&&!Ut(t)&&(x.value="".concat(t,","));else if(x.type==="radio"&&Ut(t)){var P,T=(P=o.ref)===null||P===void 0?void 0:P.current;if(T){var z=T.querySelectorAll(':scope input[type="radio"][name="'.concat(x.name,'"]'));if(z.length>1){var G=Array.from(z).findIndex(function(ee){return ee.value==="true"});x.value=String(G<0)}}}x.dataset.typeof=Array.isArray(t)?"array":f()(t)}var U=x.dataset.fieldPart,J=Kt(x),ne=d(a.path,t,U);(i||J!==ne)&&(Ea(x,ne),c=!0)}),c}function _t(a){var t;return ot(a)?[a]:(t=a.querySelectorAll("input,textarea,select"),Array.from(t))}function yt(a,t){if(a)try{a.classList&&t.split(/\s+/).forEach(function(o){a.classList.add(o)})}catch(o){}}var Ca=function(){function a(t,o){k()(this,a),C()(this,"_onInvalid",void 0),C()(this,"_invalids",[]),this.store=t,this.formCtx=o,this._onInvalid=this.onInvalid.bind(this),this.attach()}return l()(a,[{key:"form",get:function(){return this.formCtx.formRef.current}},{key:"options",get:function(){return this.formCtx.options}},{key:"fields",get:function(){return this.formCtx.fields}},{key:"attach",value:function(){this.form.addEventListener("invalid",this._onInvalid,!0)}},{key:"detach",value:function(){this.form.removeEventListener("invalid",this._onInvalid,!0),this._invalids=[]}},{key:"onInvalid",value:function(o){var i=o.target}},{key:"setValid",value:function(o){this.formCtx.setValid(o)}},{key:"updateInvalids",value:function(o,i){i?pa(this._invalids,o):this._invalids.includes(o)||this._invalids.push(o),this.setValid(this._invalids.length===0)}},{key:"validateAll",value:function(){for(var o=this,i=0,d=Object.values(this.fields);i<d.length;i++){var c=d[i];c.forEach(function(x){o.validate(x.el)})}}},{key:"validate",value:function(o){var i=this.options.validate,d=i&&ct(i),c=this.getFieldName(o);if(c){var x={path:c,value:!0,error:null},P=_t(o),T=S()(P),z;try{for(T.s();!(z=T.n()).done;){var G=z.value;G&&G.checkValidity&&!G.checkValidity()?(x.value=!1,x.error=G.validationMessage):(x.value=!0,x.error=null),this.updateInvalids(c,x.value),this.report(o,x)}}catch(xe){T.e(xe)}finally{T.f()}if(d){var U=_t(o),J=S()(U),ne;try{for(J.s();!(ne=J.n()).done;){var ee=ne.value,ce=ee.value,me=ee.getAttribute(fa),pe=i(c,ce,me,o);typeof pe=="boolean"?(x.value=pe,x.error=o.dataset.errorTips||"ERROR"):typeof pe=="string"&&(x.value=!1,x.error=pe),this.updateInvalids(c,x.value),ee&&ee.setCustomValidity&&this.options.customReport&&ee.setCustomValidity(x.error||""),this.report(o,x)}}catch(xe){J.e(xe)}finally{J.f()}}return x}}},{key:"getFieldName",value:function(o){return o.getAttribute("name")||o.getAttribute("data-field-name")}},{key:"getFieldRelElements",value:function(o){var i=this.getFieldName(o);if(!i)return[];var d=[];return this.fields[i]&&this.fields[i].forEach(function(c){d.push(c.el),d.push.apply(d,m()(c.inputs))}),d}},{key:"getReportElements",value:function(o,i){if(!o)return[];var d=this.getFieldName(o),c=this.form.querySelectorAll("[data-validate-field='".concat(d,"']"));return c&&c.forEach(function(x){yt(x,qe)}),c}},{key:"toggleReport",value:function(o,i){i.value?this.hideReport(o,i):this.showReport(o,i)}},{key:"showReport",value:function(o,i){var d=this.getReportElements(o,i),c=i.error||o.dataset.invalidTips||"ERROR";d&&c&&d.forEach(function(P){P.innerHTML=c,P.style.display="block",yt(P,qe)});var x=this.getFieldRelElements(o);x.forEach(function(P){yt(P,qe)})}},{key:"hideReport",value:function(o,i){var d=this.getReportElements(o,i);d&&d.forEach(function(x){x.classList.contains(qe)&&(x.style.display="none"),Wt(x,qe)});var c=this.getFieldRelElements(o);c.forEach(function(x){Wt(x,qe)})}},{key:"report",value:function(o,i){var d=this.options.customReport!==!1;if(d)this.toggleReport(o,i);else{var c=_t(o);c.forEach(function(x){x.reportValidity()})}}},{key:"reportAll",value:function(){this.form.reportValidity()}}]),a}();function Oa(a){return a===!0}function Sa(a,t,o){var i=o.entry,d=i===void 0?[]:i,c=a.getSnap({entry:d});Object.entries(t).forEach(function(x){var P=Oe()(x,2),T=P[0],z=P[1],G=[].concat(m()(d),m()(T.split(ue))),U=le(c,G,wt);U!==wt&&z.forEach(function(J){J.initial=U,Vt(J,U,o,!0)})})}function Ba(a,t){var o=t.current,i=t.current.options;return function(d){var c=(0,I.useRef)(!1),x=(0,I.useCallback)(function(){var P=i.ref.current;if(P){var T=!0;if(o.fields=ha(P,i.findFields),pt(o.fields)){a.log("No fields found in the autoform","warn");return}o.validator=new Ca(a,o),Sa(a,o.fields,i),Oa(i.validAtInit)||o.validator.validateAll(),c.current=!0,o.setValid(T),o.setDirty(!1)}},[]);return(0,I.useEffect)(function(){var P=i.ref.current;if(P){var T=i.entry,z=T===void 0?[]:T;!c.current&&P&&x();var G=a.watch(function(J){var ne=J.path,ee=J.value;if(Pe(z,ne)){var ce=ne.join(ue);if(ce in o.fields){var me=o.fields[ce];me&&me.forEach(function(pe){Vt(pe,ee,o.options)&&o.validator.validate(pe.el)})}}}),U=function(ne){var ee,ce=ne.target,me=ce.name;if(me){var pe=Kt(ce);(ee=o.validator.validate(ce))!==null&&ee!==void 0&&ee.value&&(_a(a,ce,me,pe,o.options),o.setDirty())}};return P.addEventListener("input",U),function(){G.off(),P.removeEventListener("input",U),c.current=!1}}},[]),(0,Ae.jsx)("form",Ce()(Ce()({},d),{},{ref:i.ref,children:d.children}))}}function Na(a,t){var o=t.current,i=t.current.options;return I.memo(function(d){var c=d.render,x=d.name,P=(0,I.useRef)(null),T=a.useReactive(d.name,!0),z=Oe()(T,1),G=z[0];(0,I.useEffect)(function(){},[]);var U={value:G,onChange:function(ne,ee){var ce=ne.target;if(typeof ee=="function")a.batchUpdate(function(pe){ee(pe)});else if(typeof x=="string"&&!ot(ce)){var me=new CustomEvent("input",{detail:{value:ee}});ce.dispatchEvent(me)}}};return(0,Ae.jsx)(Ae.Fragment,{children:c(U)})},function(){return!0})}function Pa(){var a=(0,I.useRef)(null),t=(0,I.useRef)(null),o=(0,I.useRef)(null),i=(0,I.useRef)(null),d=(0,I.useRef)(null),c=arguments[1]||{};c.ref||(c.ref=o),d.current||(d.current=arguments[0]instanceof rt?arguments[0]:new rt(arguments[0],arguments[1]));var x=(0,I.useState)(!0),P=Oe()(x,2),T=P[0],z=P[1],G=(0,I.useState)(!1),U=Oe()(G,2),J=U[0],ne=U[1],ee=d.current;return a.current||(i.current={options:c,setDirty:function(){var me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return ne(me)},setValid:z,state:le(ee.state,c.entry||[]),formRef:o},a.current=Ba(ee,i),t.current=Na(ee,i)),(0,I.useEffect)(function(){return function(){var ce;a.current=null,t.current=null,i.current=null,(ce=d.current)===null||ce===void 0||ce.destroy(),d.current=null}},[]),Ce()(Ce()({},ee),{},{state:ee.state,Form:a.current,Field:t.current,valid:T,dirty:J})}function Aa(a,t){var o=(0,I.useRef)();return o.current||(o.current=new rt(a,t)),(0,I.useEffect)(function(){return function(){var i;(i=o.current)===null||i===void 0||i.destroy(),o.current=void 0}},[]),o.current}},88970:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(65192);const l=[]},92460:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(63408);const l=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},68271:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(88938);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
  order:{
    price:10,
    count:1,
    total:computed((scope)=>{
      return scope.price*scope.count
    })
  }
}
`,paraId:7,tocIndex:2},{value:"\u6B64\u65F6\u7684",paraId:8,tocIndex:2},{value:"total",paraId:8,tocIndex:2},{value:"\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u51FD\u6570,",paraId:8,tocIndex:2},{value:"typeof(state.total)==='function'",paraId:8,tocIndex:2},{value:"\u3002",paraId:8,tocIndex:2},{value:`const { state } = createStore({
  order:{
    price:10,
    count:1,
    total:computed((scope)=>{
      return scope.price*scope.count
    })
  }
})
`,paraId:9,tocIndex:2},{value:"\u8FD0\u884C",paraId:10,tocIndex:2},{value:"createStore",paraId:10,tocIndex:2},{value:"\u540E\u4F1A\u626B\u63CF\u6574\u4E2A\u5BF9\u8C61\uFF0C\u5982\u679C\u53D1\u73B0",paraId:10,tocIndex:2},{value:"computed",paraId:10,tocIndex:2},{value:"\u58F0\u660E\uFF0C\u5219\uFF1A",paraId:10,tocIndex:2},{value:"createStore",paraId:11,tocIndex:2},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C",paraId:11,tocIndex:2},{value:"computed",paraId:11,tocIndex:2},{value:"\u51FD\u6570\u521B\u5EFA\u4E00\u4E2A",paraId:11,tocIndex:2},{value:"SyncComputedObject",paraId:11,tocIndex:2},{value:"\u5BF9\u8C61,\u4FDD\u5B58\u5728",paraId:11,tocIndex:2},{value:"store.comnutedObjects",paraId:11,tocIndex:2},{value:"\u91CC\u9762\u3002",paraId:11,tocIndex:2},{value:"\u8FD0\u884C\u4E00\u6B21\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u6536\u96C6\u4F9D\u8D56\uFF0C\u7136\u540E\u5C06\u8FD4\u56DE\u503C\u5199\u5165",paraId:11,tocIndex:2},{value:"state.total",paraId:11,tocIndex:2},{value:",\u6B64\u65F6",paraId:11,tocIndex:2},{value:"typeof(state.total)==='number'",paraId:11,tocIndex:2},{value:"\u3002",paraId:11,tocIndex:2},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:12,tocIndex:3},{value:`const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
}
`,paraId:13,tocIndex:3},{value:"\u6B64\u65F6\u7684",paraId:14,tocIndex:3},{value:"total",paraId:14,tocIndex:3},{value:"\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u51FD\u6570,",paraId:14,tocIndex:3},{value:"typeof(state.total)==='function'",paraId:14,tocIndex:3},{value:"\u3002",paraId:14,tocIndex:3},{value:`const { state } = createStore({
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
})
`,paraId:15,tocIndex:3},{value:"\u8FD0\u884C",paraId:16,tocIndex:3},{value:"createStore",paraId:16,tocIndex:3},{value:"\u540E\u4F1A\u626B\u63CF\u6574\u4E2A\u5BF9\u8C61\uFF0C\u5982\u679C\u53D1\u73B0",paraId:16,tocIndex:3},{value:"computed",paraId:16,tocIndex:3},{value:"\u58F0\u660E\uFF0C\u5219\uFF1A",paraId:16,tocIndex:3},{value:"\u6839\u636E",paraId:17,tocIndex:3},{value:"computed",paraId:17,tocIndex:3},{value:"\u58F0\u660E\u7ED3\u5408\u72B6\u6001\u4E0A\u4E0B\u6587\u521B\u5EFA\u4E00\u4E2A",paraId:17,tocIndex:3},{value:"AsyncComputedObject",paraId:17,tocIndex:3},{value:"\u5BF9\u8C61,\u4FDD\u5B58\u5728",paraId:17,tocIndex:3},{value:"store.comnutedObjects",paraId:17,tocIndex:3},{value:"\u91CC\u9762\u3002",paraId:17,tocIndex:3},{value:"\u5C06",paraId:17,tocIndex:3},{value:"state.total",paraId:17,tocIndex:3},{value:"\u66FF\u6362\u6210",paraId:17,tocIndex:3},{value:"AsyncComputedValue",paraId:17,tocIndex:3},{value:"\u3002",paraId:17,tocIndex:3},{value:`state.total={
  value:10,
  loading:true,
  error:null,
  timeout:0,
  retry:0
  progress,
  run,
  cancel  
}
`,paraId:18,tocIndex:3},{value:"\u66F4\u591A\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:19,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:20,tocIndex:3},{value:"\u3002",paraId:19,tocIndex:3}]},16512:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(97085);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
const store = createStore({
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
})
`,paraId:2,tocIndex:1},{value:"computed",paraId:3,tocIndex:1},{value:"\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:`function computed<Value = any, Scope = any>(
  getter: AsyncComputedGetter<Value,Scope>,
  depends: ComputedDepends,
  options?: ComputedOptions<Value,Scope>
):ComputedDescriptorBuilder<Value,Scope>;
`,paraId:4,tocIndex:1},{value:"\u53C2\u6570\u8BF4\u660E\uFF1A",paraId:5,tocIndex:1},{value:"\u53C2\u6570",paraId:6,tocIndex:1},{value:"\u7C7B\u578B",paraId:6,tocIndex:1},{value:"\u8BF4\u660E",paraId:6,tocIndex:1},{value:"getter",paraId:6,tocIndex:1},{value:"AsyncComputedGetter",paraId:6,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:1},{value:"depends",paraId:6,tocIndex:1},{value:"ComputedDepends",paraId:6,tocIndex:1},{value:"\u58F0\u660E\u4F9D\u8D56",paraId:6,tocIndex:1},{value:"options",paraId:6,tocIndex:1},{value:"ComputedOptions",paraId:6,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F8\u5173\u53C2\u6570",paraId:6,tocIndex:1},{value:"getter",paraId:7,tocIndex:2},{value:"\u53C2\u6570\uFF08\u5373\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF09,\u5176\u8FD4\u56DE\u503C\u5C06\u66F4\u65B0\u5230\u72B6\u6001\u4E2D\u7684",paraId:7,tocIndex:2},{value:"computed",paraId:7,tocIndex:2},{value:"\u58F0\u660E\u7684\u8DEF\u5F84\u4E0A\uFF0C\u8BE6\u89C1",paraId:7,tocIndex:2},{value:"\u4ECB\u7ECD",paraId:8,tocIndex:2},{value:"\u3002",paraId:7,tocIndex:2},{value:"depends",paraId:9,tocIndex:3},{value:"\uFF1A\u4F9D\u8D56\u6536\u96C6\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u5982\u4F55\u6307\u5B9A\u4F9D\u8D56\u8BE6\u89C1",paraId:9,tocIndex:3},{value:"\u4F9D\u8D56\u6536\u96C6",paraId:10,tocIndex:3},{value:"\u3002",paraId:9,tocIndex:3},{value:"options",paraId:9,tocIndex:3},{value:"\uFF1A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\uFF0C\u8BE6\u89C1",paraId:9,tocIndex:3},{value:"\u9009\u9879",paraId:11,tocIndex:3},{value:"\u3002",paraId:9,tocIndex:3},{value:"options",paraId:12,tocIndex:4},{value:"\u53C2\u6570\u662F\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"ComputedOptions",paraId:12,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002\u8BE6\u89C1",paraId:12,tocIndex:4},{value:"\u8BA1\u7B97\u53C2\u6570",paraId:13,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u521B\u5EFA\u4E0E\u540C\u6B65\u8BA1\u7B97\u4E00\u6837\u5747\u662F\u4F7F\u7528",paraId:14,tocIndex:5},{value:"computed",paraId:14,tocIndex:5},{value:"\u6765\u58F0\u660E\uFF0C\u4F46\u662F\u6700\u91CD\u8981\u7684\u4E00\u70B9\u662F",paraId:14,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97\u9700\u8981\u663E\u5F0F\u6307\u5B9A\u4F9D\u8D56",paraId:14,tocIndex:5},{value:"\u3002",paraId:14,tocIndex:5},{value:"\u4EE5\u4E0A",paraId:15},{value:"fullName",paraId:15},{value:"\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u624B\u52A8\u6307\u5B9A\u5176\u4F9D\u8D56\u4E8E",paraId:15},{value:"user.firstName",paraId:15},{value:"\u548C",paraId:15},{value:"./lastName",paraId:15},{value:"(\u76F8\u5BF9\u8DEF\u5F84)\u3002",paraId:15},{value:"\u4F9D\u8D56\u53EF\u4EE5\u4F7F\u7528\u7EDD\u5BF9\u8DEF\u5F84\u6216\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4F7F\u7528",paraId:15},{value:".",paraId:15},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u5272\u7B26\uFF0C",paraId:15},{value:"./",paraId:15},{value:"\u6307\u7684\u662F\u5F53\u524D\u5BF9\u8C61\uFF0C",paraId:15},{value:"../",paraId:15},{value:"\u6307\u7684\u662F\u7236\u5BF9\u8C61,\u8BE6\u89C1",paraId:15},{value:"\u4F9D\u8D56\u6536\u96C6",paraId:16},{value:"\u3002",paraId:15},{value:"\u5F53\u5728\u8F93\u5165\u6846\u67B6\u4E2D\u4FEE\u6539",paraId:15},{value:"firstName",paraId:15},{value:"\u6216",paraId:15},{value:"lastName",paraId:15},{value:"\u65F6\uFF0C",paraId:15},{value:"fullName",paraId:15},{value:"\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:15},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u7ED3\u679C\u4FDD\u5B58\u5728",paraId:15},{value:"state.user.fullName.value",paraId:15},{value:"\u4E2D\u3002",paraId:15},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u6B63\u5728\u8BA1\u7B97\u65F6\uFF0C",paraId:15},{value:"state.user.fullName.loading",paraId:15},{value:"\u4E3A",paraId:15},{value:"true",paraId:15},{value:"\u3002\u8BA1\u7B97\u5B8C\u6210\u540E\uFF0C",paraId:15},{value:"state.user.fullName.loading",paraId:15},{value:"\u4E3A",paraId:15},{value:"false",paraId:15},{value:"\u3002",paraId:15},{value:"\u5173\u4E8E",paraId:15},{value:"...bind('user.firstName')",paraId:15},{value:"\u7684\u7528\u6CD5\u8BE6\u89C1",paraId:15},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:17},{value:"\u3002",paraId:15},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u52A0\u8F7D\u72B6\u6001\u4FDD\u5B58\u5728",paraId:18,tocIndex:8},{value:"AsyncComputedValue",paraId:18,tocIndex:8},{value:"\u5BF9\u8C61\u7684",paraId:18,tocIndex:8},{value:"loading",paraId:18,tocIndex:8},{value:"\u5C5E\u6027\u4E2D\uFF0C\u5F53",paraId:18,tocIndex:8},{value:"loading",paraId:18,tocIndex:8},{value:"\u4E3A",paraId:18,tocIndex:8},{value:"true",paraId:18,tocIndex:8},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u6B63\u5728\u8FDB\u884C\u4E2D\u3002",paraId:18,tocIndex:8},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u52A0\u8F7D\u72B6\u6001\u7684\u4F8B\u5B50\uFF1A",paraId:19,tocIndex:8},{value:"useAsyncState",paraId:20},{value:"\u7528\u6765\u8FD4\u56DE\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:20},{value:"\u5F53",paraId:20},{value:"fullName.loading",paraId:20},{value:"\u4E3A",paraId:20},{value:"true",paraId:20},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u6B63\u5728\u8FDB\u884C\u4E2D\u3002",paraId:20},{value:"\u5F53",paraId:20},{value:"fullName.error",paraId:20},{value:"\u4E0D\u4E3A",paraId:20},{value:"null",paraId:20},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u51FA\u9519\u3002",paraId:20},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5141\u8BB8\u63A7\u5236\u8BA1\u7B97\u7684\u8FDB\u5EA6\uFF0C\u6267\u884C\u8FDB\u5EA6\u4FDD\u5B58\u5728",paraId:21,tocIndex:9},{value:"AsyncComputedValue",paraId:21,tocIndex:9},{value:"\u5BF9\u8C61\u7684",paraId:21,tocIndex:9},{value:"progress",paraId:21,tocIndex:9},{value:"\u5C5E\u6027\u4E2D\uFF0C\u5F53",paraId:21,tocIndex:9},{value:"progress",paraId:21,tocIndex:9},{value:"\u4E3A",paraId:21,tocIndex:9},{value:"0-100",paraId:21,tocIndex:9},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u3002\u5F00\u53D1\u8005\u53EF\u4EE5\u6839\u636E\u8FDB\u5EA6\u503C\u6765\u5C55\u793A\u8FDB\u5EA6\u6761\u7B49\u3002",paraId:21,tocIndex:9},{value:"\u4F7F\u7528\u65B9\u6CD5\u5982\u4E0B\uFF1A",paraId:22,tocIndex:9},{value:"\u5728\u8BA1\u7B97\u51FD\u6570\u4E2D\uFF0C\u53EF\u4EE5\u901A\u8FC7",paraId:23},{value:"getProgressbar",paraId:23},{value:"\u51FD\u6570\u83B7\u53D6\u4E00\u4E2A\u8FDB\u5EA6\u6761\u5BF9\u8C61\u3002",paraId:23},{value:"\u8FDB\u5EA6\u6761\u5BF9\u8C61\u6709\u4E24\u4E2A\u65B9\u6CD5\uFF1A",paraId:23},{value:"value",paraId:23},{value:"\u548C",paraId:23},{value:"end",paraId:23},{value:"\uFF0C",paraId:23},{value:"value",paraId:23},{value:"\u7528\u6765\u8BBE\u7F6E\u8FDB\u5EA6\u503C\uFF0C",paraId:23},{value:"end",paraId:23},{value:"\u7528\u6765\u7ED3\u675F\u8FDB\u5EA6\u6761\u3002",paraId:23},{value:"\u5728\u521B\u5EFA",paraId:24,tocIndex:10},{value:"computed",paraId:24,tocIndex:10},{value:"\u65F6\u53EF\u4EE5\u6307\u5B9A\u8D85\u65F6\u53C2\u6570(\u5355\u4F4D\u4E3A",paraId:24,tocIndex:10},{value:"ms",paraId:24,tocIndex:10},{value:")\uFF0C\u5B9E\u73B0",paraId:24,tocIndex:10},{value:"\u8D85\u65F6\u5904\u7406",paraId:24,tocIndex:10},{value:"\u548C",paraId:24,tocIndex:10},{value:"\u5012\u8BA1\u65F6",paraId:24,tocIndex:10},{value:"\u529F\u80FD\u3002\u57FA\u672C\u8FC7\u7A0B\u662F\u8FD9\u6837\u7684\u3002",paraId:24,tocIndex:10},{value:"\u6307\u5B9A",paraId:25,tocIndex:10},{value:"options.timeout=\u8D85\u65F6\u65F6\u95F4",paraId:25,tocIndex:10},{value:"\u5F53\u5F02\u6B65\u8BA1\u7B97\u5F00\u59CB\u65F6\uFF0C\u4F1A\u542F\u52A8\u4E00\u4E2A\u5B9A\u65F6\u5668\u65F6\uFF0C\u5E76\u66F4\u65B0",paraId:25,tocIndex:10},{value:"AsyncComputedValue",paraId:25,tocIndex:10},{value:"\u5BF9\u8C61\u7684",paraId:25,tocIndex:10},{value:"timeout",paraId:25,tocIndex:10},{value:"\u5C5E\u6027\u3002",paraId:25,tocIndex:10},{value:"\u5F53\u8D85\u65F6\u89E6\u53D1\u65F6\u4F1A\u89E6\u53D1",paraId:25,tocIndex:10},{value:"TIMEOUT",paraId:25,tocIndex:10},{value:"\u9519\u8BEF\uFF0C\u5C06\u9519\u8BEF\u66F4\u65B0\u5230",paraId:25,tocIndex:10},{value:"AsyncComputedValue.error",paraId:25,tocIndex:10},{value:"\u5C5E\u6027\u4E2D\u3002",paraId:25,tocIndex:10},{value:"\u5728",paraId:26,tocIndex:11},{value:"\u8D85\u65F6",paraId:26,tocIndex:11},{value:"\u529F\u80FD\u4E2D\u4E0D\u4F1A\u81EA\u52A8\u66F4\u65B0",paraId:26,tocIndex:11},{value:"timeout",paraId:26,tocIndex:11},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u901A\u8FC7",paraId:26,tocIndex:11},{value:"timeout=[\u8D85\u65F6\u65F6\u95F4,\u95F4\u9694\u66F4\u65B0\u65F6\u957F]",paraId:26,tocIndex:11},{value:"\u6765\u542F\u7528\u5012\u8BA1\u65F6\u529F\u80FD\u3002",paraId:26,tocIndex:11},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:27,tocIndex:11},{value:"\u6307\u5B9A",paraId:28,tocIndex:11},{value:"options.timoeut=[\u8D85\u65F6\u65F6\u95F4,\u95F4\u9694\u66F4\u65B0\u65F6\u957F]",paraId:28,tocIndex:11},{value:"\u5F53\u5F02\u6B65\u8BA1\u7B97\u5F00\u59CB\u65F6\uFF0C\u4F1A\u542F\u52A8\u4E00\u4E2A\u5B9A\u65F6\u5668\uFF0C\u66F4\u65B0",paraId:28,tocIndex:11},{value:"AsyncComputedValue",paraId:28,tocIndex:11},{value:"\u5BF9\u8C61\u7684",paraId:28,tocIndex:11},{value:"timeout",paraId:28,tocIndex:11},{value:"\u5C5E\u6027\u3002",paraId:28,tocIndex:11},{value:"\u7136\u540E\u6BCF\u9694",paraId:28,tocIndex:11},{value:"\u95F4\u9694\u66F4\u65B0\u65F6\u957F",paraId:28,tocIndex:11},{value:"\u5C31\u66F4\u65B0\u4E00\u6B21",paraId:28,tocIndex:11},{value:"AsyncComputedValue.timoeut",paraId:28,tocIndex:11},{value:"\u5F53\u8D85\u65F6\u89E6\u53D1\u65F6\u4F1A\u89E6\u53D1",paraId:28,tocIndex:11},{value:"TIMEOUT",paraId:28,tocIndex:11},{value:"\u9519\u8BEF\uFF0C\u5C06\u9519\u8BEF\u66F4\u65B0\u5230",paraId:28,tocIndex:11},{value:"AsyncComputedValue.error",paraId:28,tocIndex:11},{value:"\u5C5E\u6027\u4E2D\u3002",paraId:28,tocIndex:11},{value:"\u4F8B\u5982\uFF1A",paraId:29,tocIndex:11},{value:"options.timoeut=[5*1000,5]",paraId:29,tocIndex:11},{value:"\u4EE3\u8868\u8D85\u65F6\u65F6\u95F4\u4E3A5\u79D2\uFF0C\u6BCF1000ms\u66F4\u65B0\u4E00\u6B21",paraId:29,tocIndex:11},{value:"timeout",paraId:29,tocIndex:11},{value:"\u5C5E\u6027\uFF0C\u5012\u8BA1\u65F6",paraId:29,tocIndex:11},{value:"5",paraId:29,tocIndex:11},{value:"\u6B21\u3002",paraId:29,tocIndex:11},{value:"\u5728\u521B\u5EFA",paraId:30,tocIndex:12},{value:"computed",paraId:30,tocIndex:12},{value:"\u65F6\u53EF\u4EE5\u6307\u5B9A\u91CD\u8BD5\u53C2\u6570\uFF0C\u5B9E\u73B0",paraId:30,tocIndex:12},{value:"\u51FA\u9519\u91CD\u8BD5\u6267\u884C",paraId:30,tocIndex:12},{value:"\u7684\u529F\u80FD\u3002\u57FA\u672C\u8FC7\u7A0B\u662F\u8FD9\u6837\u7684\u3002",paraId:30,tocIndex:12},{value:"\u6307\u5B9A",paraId:31,tocIndex:12},{value:"options.retry=[\u91CD\u8BD5\u6B21\u6570,\u91CD\u8BD5\u95F4\u9694ms]",paraId:31,tocIndex:12},{value:"\u5F53\u5F00\u59CB\u6267\u884C\u5F02\u6B65\u8BA1\u7B97\u524D\uFF0C\u4F1A\u66F4\u65B0",paraId:31,tocIndex:12},{value:"AsyncComputedValue.retry",paraId:31,tocIndex:12},{value:"\u5C5E\u6027\u3002",paraId:31,tocIndex:12},{value:"\u5F53\u6267\u884C\u51FA\u9519\u65F6\uFF0C\u4F1A\u540C\u6B65\u66F4\u65B0",paraId:31,tocIndex:12},{value:"AsyncComputedValue.retry",paraId:31,tocIndex:12},{value:"\u5C5E\u6027\u4E3A\u91CD\u8BD5\u6B21\u6570\u3002",paraId:31,tocIndex:12},{value:"\u8BF4\u660E",paraId:32},{value:"\u91CD\u8BD5\u6B21\u6570\u4E3A",paraId:33},{value:"0",paraId:33},{value:"\u65F6\uFF0C\u4E0D\u4F1A\u518D\u6B21\u91CD\u8BD5\u3002\u91CD\u8BD5\u6B21\u6570\u4E3A",paraId:33},{value:"N",paraId:33},{value:"\u65F6\uFF0C\u5B9E\u9645\u4F1A\u6267\u884C",paraId:33},{value:"N+1",paraId:33},{value:"\u6B21\u3002",paraId:33},{value:"\u91CD\u8BD5\u671F\u95F4",paraId:33},{value:"error",paraId:33},{value:"\u4F1A\u66F4\u65B0\u4E3A\u6700\u540E\u4E00\u6B21\u9519\u8BEF\u4FE1\u606F\u3002",paraId:33},{value:"\u5728\u521B\u5EFA",paraId:34,tocIndex:13},{value:"computed",paraId:34,tocIndex:13},{value:"\u65F6\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:34,tocIndex:13},{value:"abortSignal",paraId:34,tocIndex:13},{value:"\u53C2\u6570\uFF0C\u8BE5\u53C2\u6570\u8FD4\u56DE\u4E00\u4E2A",paraId:34,tocIndex:13},{value:"AbortSignal",paraId:34,tocIndex:13},{value:"\uFF0C\u7528\u6765\u53D6\u6D88\u8BA1\u7B97\u64CD\u4F5C\u3002",paraId:34,tocIndex:13},{value:"\u57FA\u672C\u64CD\u4F5C\u65B9\u6CD5\u662F\uFF1A",paraId:35,tocIndex:13},{value:"\u5728",paraId:36,tocIndex:13},{value:"computed",paraId:36,tocIndex:13},{value:"\u4E2D\u4F20\u5165",paraId:36,tocIndex:13},{value:"abortSignal",paraId:36,tocIndex:13},{value:"\u53C2\u6570\uFF0C\u8BE5\u53C2\u6570\u662F\u4E00\u4E2A",paraId:36,tocIndex:13},{value:"AbortSignal",paraId:36,tocIndex:13},{value:"\uFF0C\u53EF\u7528\u6765\u8BA2\u9605",paraId:36,tocIndex:13},{value:"abort",paraId:36,tocIndex:13},{value:"\u4FE1\u53F7\u6216\u8005\u4F20\u9012\u7ED9",paraId:36,tocIndex:13},{value:"fetch",paraId:36,tocIndex:13},{value:"\u6216",paraId:36,tocIndex:13},{value:"axios",paraId:36,tocIndex:13},{value:"\u7B49\u3002",paraId:36,tocIndex:13},{value:"\u53D6\u6D88\u65F6\u53EF\u4EE5\u8C03\u7528",paraId:37,tocIndex:13},{value:"AsyncComputedObject.cancel()",paraId:37,tocIndex:13},{value:"\u65B9\u6CD5\u6765\u89E6\u53D1\u4E00\u4E2A",paraId:37,tocIndex:13},{value:"AbortSignal",paraId:37,tocIndex:13},{value:"\u4FE1\u53F7\u3002\u5982\u4E0B\u4F8B\u4E2D\u8C03\u7528",paraId:37,tocIndex:13},{value:"state.order.total.cancel()",paraId:37,tocIndex:13},{value:"\u6CE8\u610F",paraId:38},{value:"\uFF1A",paraId:38},{value:"abortSignal",paraId:39},{value:"\u53C2\u6570\u662F\u4E00\u4E2A",paraId:39},{value:"AbortSignal",paraId:39},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u7528\u6765\u8BA2\u9605",paraId:39},{value:"abort",paraId:39},{value:"\u4FE1\u53F7\u6216\u8005\u4F20\u9012\u7ED9",paraId:39},{value:"fetch",paraId:39},{value:"\u6216",paraId:39},{value:"axios",paraId:39},{value:"\u7B49\u3002",paraId:39},{value:"\u9700\u8981\u6CE8\u610F\u7684",paraId:39},{value:"\uFF0C\u5982\u679C\u60F3\u8BA9\u8BA1\u7B97\u51FD\u6570\u662F\u53EF\u53D6\u6D88\u7684\uFF0C\u5219\u5F53\u8C03\u7528",paraId:39},{value:"AsyncComputedObject.cancel()",paraId:39},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u5E94\u8BE5\u5728\u63A5\u6536\u5230",paraId:39},{value:"abortSignal",paraId:39},{value:"\u4FE1\u53F7\u65F6\uFF0C\u4E3B\u52A8\u7ED3\u675F\u9000\u51FA\u8BA1\u7B97\u51FD\u6570\u3002\u5982\u679C\u8BA1\u7B97\u51FD\u6570\u6CA1\u6709\u8BA2\u9605",paraId:39},{value:"abort",paraId:39},{value:"\u4FE1\u53F7\uFF0C\u8C03\u7528",paraId:39},{value:"AsyncComputedObject.cancel()",paraId:39},{value:"\u662F\u4E0D\u4F1A\u751F\u6548\u7684\u3002",paraId:39},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u6BCF\u5F53\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\u5747\u4F1A\u6267\u884C\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5728\u8FDE\u7EED\u53D8\u5316\u65F6\u5C31\u4F1A\u91CD\u590D\u6267\u884C\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:40,tocIndex:14},{value:"\u5728\u58F0\u660E\u65F6\uFF0C\u5141\u8BB8\u6307\u5B9A",paraId:41,tocIndex:14},{value:"options.reentry=false",paraId:41,tocIndex:14},{value:"\u6765\u9632\u6B62\u91CD\u5165\uFF0C\u5982\u679C\u91CD\u5165\u5219\u53EA\u4F1A\u5728\u63A7\u5236\u53F0\u663E\u793A\u4E00\u4E2A\u8B66\u544A\u3002",paraId:41,tocIndex:14},{value:"\u5927\u90E8\u4EFD\u60C5\u51B5\u4E0B\uFF0C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u5E94\u8BE5\u4F7F\u7528",paraId:42,tocIndex:15},{value:"computed",paraId:42,tocIndex:15},{value:"\u8FDB\u884C\u58F0\u660E\uFF0C\u4F46\u4E5F\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\u3002",paraId:42,tocIndex:15},{value:`const order = {
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
} 
`,paraId:43,tocIndex:15},{value:"\u4E0A\u8FF0\u7B80\u5355\u7684\u5F02\u6B65\u58F0\u660E\u65B9\u5F0F\u7B49\u6548\u4E8E\u4EE5\u4E0B\u65B9\u5F0F\uFF1A",paraId:44,tocIndex:15},{value:`import { createStore,computed} from "@autostorejs/react"

const store = createStore({
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:computed(async (order)=>{
      return order.price*order.count
    },[]) // \u4F9D\u8D56\u662F\u7A7A\u7684
}
 )
`,paraId:45,tocIndex:15},{value:"\u5F53\u4E0D\u4F7F\u7528",paraId:46,tocIndex:15},{value:"computed",paraId:46,tocIndex:15},{value:"\u8FDB\u884C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u58F0\u660E\u65F6\uFF0C\u9700\u8981\u6CE8\u610F\u4EE5\u4E0B\u51E0\u70B9\uFF1A",paraId:46,tocIndex:15},{value:"\u9ED8\u8BA4",paraId:47,tocIndex:15},{value:"scope",paraId:47,tocIndex:15},{value:"\u6307\u5411\u7684\u662F",paraId:47,tocIndex:15},{value:"current",paraId:47,tocIndex:15},{value:"\uFF0C\u5373",paraId:47,tocIndex:15},{value:"total",paraId:47,tocIndex:15},{value:"\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:47,tocIndex:15},{value:"\u5176\u4F9D\u8D56\u662F\u7A7A\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\uFF0C\u4E5F\u4E0D\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002\u4E5F\u5C31\u662F\u8BF4\u4E0A\u4F8B\u4E2D\u7684",paraId:47,tocIndex:15},{value:"price",paraId:47,tocIndex:15},{value:"\u548C",paraId:47,tocIndex:15},{value:"count",paraId:47,tocIndex:15},{value:"\u53D8\u5316\u65F6\uFF0C",paraId:47,tocIndex:15},{value:"total",paraId:47,tocIndex:15},{value:"\u4E0D\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002\u4F46\u662F\u5728\u4F1A\u5728\u7B2C\u4E00\u6B21\u8BBF\u95EE\u65F6\u81EA\u52A8\u8BA1\u7B97\u4E00\u6B21\u3002",paraId:47,tocIndex:15},{value:"\u5982\u679C\u9700\u8981\u91CD\u65B0\u8BA1\u7B97\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C",paraId:47,tocIndex:15},{value:"total.run()",paraId:47,tocIndex:15},{value:"\u6216",paraId:47,tocIndex:15},{value:"store.computedObjects.get(id).run()",paraId:47,tocIndex:15},{value:"\u3002",paraId:47,tocIndex:15},{value:"\u7279\u522B\u6CE8\u610F",paraId:48,tocIndex:15},{value:"\uFF1A",paraId:48,tocIndex:15},{value:"\u7531\u4E8E\u5728\u4E0D\u540C\u7684\u6784\u5EFA\u73AF\u5883\u4E0B\uFF0C\u6BD4\u5982\u4F7F\u7528babel\u8F6C\u7801\u4E3A",paraId:49,tocIndex:15},{value:"es5",paraId:49,tocIndex:15},{value:"\u65F6\uFF0C\u53EF\u80FD\u4F1A\u5C06\u5F02\u6B65\u51FD\u6570\u8F6C\u7801\u4E3A\u540C\u6B65\u51FD\u6570\uFF0C\u5BFC\u81F4\u65E0\u6CD5\u8BC6\u522B\u4E3A\u5F02\u6B65\u51FD\u6570\u800C\u51FA\u73B0\u95EE\u9898\u3002",paraId:49,tocIndex:15},{value:"\u770B\u770B\u4EE5\u4E0B\u4F8B\u5B50\uFF1A",paraId:50,tocIndex:15},{value:"\u4E0A\u4F8B\u4E3A\u4EC0\u4E48\u4E0D\u80FD\u6B63\u786E\u8BA1\u7B97\u51FA",paraId:51},{value:"total",paraId:51},{value:"\u7684\u503C\uFF1F",paraId:51},{value:"\u53EF\u4EE5\u770B\u5230\u4E0A\u8FF0\u4F8B\u5B50\u4E2D",paraId:52},{value:"state.total",paraId:52},{value:"\u7684\u503C\u662F",paraId:52},{value:"[object Promise]",paraId:52},{value:`\u3002
\u8FD9\u662F\u56E0\u4E3A\u5728\u672C\u7AD9\u4F7F\u7528\u7684\u6784\u5EFA\u5DE5\u5177`,paraId:52},{value:"webpack",paraId:52},{value:"\u4F7F\u7528",paraId:52},{value:"babel",paraId:52},{value:"\u8FDB\u884C\u8F6C\u7801\uFF0C\u4EE5\u4E0A\u7684\u5F02\u6B65\u51FD\u6570\u88AB\u8F6C\u7801\u4E3A\u540C\u6B65\u51FD\u6570\uFF0C\u7C7B\u4F3C\u8FD9\u6837\u7684\u5F62\u5F0F\uFF1A",paraId:52},{value:`total(_x15) {
  return _total.apply(this, arguments);
}
`,paraId:53},{value:"\u8FD9\u5BFC\u81F4",paraId:54},{value:"AutoStore",paraId:54},{value:"\u4E0D\u80FD\u5C06\u5176\u8BC6\u522B\u4E3A\u5F02\u6B65\u51FD\u6570\uFF0C\u4E5F\u5C31\u4E0D\u80FD\u76F8\u5E94\u5730\u521B\u5EFA\u5F02\u6B65",paraId:54},{value:"AsyncComputedObject",paraId:54},{value:"\uFF0C\u800C\u53EA\u662F\u5C06\u5176\u5F53\u4F5C\u4E00\u4E2A\u666E\u901A\u7684\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:54},{value:"\u89E3\u51B3\u65B9\u6CD5\u662F\u663E\u5F0F\u6307\u5B9A",paraId:55},{value:"computed(async ()=>{...},[...],{async:true})",paraId:55},{value:"\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u6B63\u786E\u8BC6\u522B\u4E3A\u5F02\u6B65\u51FD\u6570\u3002",paraId:55},{value:"\u5F53\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A",paraId:56,tocIndex:16},{value:"Promise",paraId:56,tocIndex:16},{value:"\u65F6\u7684\u95EE\u9898",paraId:56,tocIndex:16},{value:"computed",paraId:57,tocIndex:16},{value:"\u5185\u90E8\u4F7F\u7528",paraId:57,tocIndex:16},{value:"isAsync",paraId:57,tocIndex:16},{value:"\u6765\u5224\u65AD\u4F20\u5165\u7684",paraId:57,tocIndex:16},{value:"getter",paraId:57,tocIndex:16},{value:`\u51FD\u6570\u662F\u5426\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u4EE5\u91C7\u53D6\u4E0D\u540C\u7684\u5904\u7406\u903B\u8F91\u3002
\u4F46\u662F\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u8FD9\u4E2A\u5224\u65AD\u53EF\u80FD\u4E0D\u6B63\u786E\u3002
\u6BD4\u5982\u5728\u8FDB\u884C`,paraId:57,tocIndex:16},{value:"babel",paraId:57,tocIndex:16},{value:"\u5C06\u4EE3\u7801\u8F6C\u8BD1\u5230",paraId:57,tocIndex:16},{value:"es5",paraId:57,tocIndex:16},{value:"\u7B49\u4F4E\u7248\u672C\u4EE3\u7801\u65F6\uFF0C\u5F02\u6B65\u51FD\u6570\u53EF\u80FD\u4F1A\u88AB\u8F6C\u8BD1\u4E3A\u540C\u6B65\u51FD\u6570\uFF0C\u6B64\u65F6\u9700\u8981\u4E5F\u663E\u5F0F\u6307\u5B9A",paraId:57,tocIndex:16},{value:"options.async=true",paraId:57,tocIndex:16},{value:"\u3002",paraId:57,tocIndex:16},{value:`const store = createStore({
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      return user.firstName+user.lastName
    },["user.firstName","user.lastName"],{
      async:true
    })
  })
`,paraId:58,tocIndex:16}]},40053:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(91376);const l=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
// \u540C\u6B65\u8BA1\u7B97\u5C5E\u6027
function computed<Value = any, Scope = any >(
    getter: ComputedGetter<Value,Scope>,  // \u8BA1\u7B97\u51FD\u6570
    options?: SyncComputedOptions<Value,Scope>
):Value;
// \u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
function computed<Value = any, Scope = any>(
   getter: AsyncComputedGetter<Value,Scope>, // \u8BA1\u7B97\u51FD\u6570
   depends: ComputedDepends,       // \u6307\u5B9A\u4F9D\u8D56
   options?: ComputedOptions<Value,Scope>
): ComputedDescriptorBuilder<Value,Scope>;
`,paraId:1,tocIndex:0},{value:"\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:2,tocIndex:1},{value:"\u4F7F\u7528",paraId:3,tocIndex:2},{value:"computed(<getter>,<options>)",paraId:3,tocIndex:2},{value:"\u51FD\u6570\u58F0\u660E\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:3,tocIndex:2},{value:`const store = createStore({
  order:{
    price:100,
    count:3,
    // 1. \u5FEB\u901F\u521B\u5EFA\uFF0C\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56
    total1:(order)=>order.price * order.count,
    // 2. \u4F7F\u7528computed\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027,\u5E76\u6307\u5B9A\u521B\u5EFA
    total2:computed((order)=>order.price * order.count),
  }
})
`,paraId:4,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u793A\u4F8B\uFF1A",paraId:5,tocIndex:2},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:6},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027",paraId:7},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u4F1A\u5728\u521D\u59CB\u5316\u65F6\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5728\u4F9D\u8D56\u53D8\u5316\u65F6\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:8},{value:"\u4F7F\u7528",paraId:9,tocIndex:3},{value:"computed(<getter>,<depends>,<options>)",paraId:9,tocIndex:3},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:9,tocIndex:3},{value:`const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    // 1.\u5FEB\u901F\u521B\u5EFA\uFF0C\u65E0\u4F9D\u8D56
    fullName:async (user)=>user.firstName+user.lastName
    // 2.\u4F7F\u7528computed\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027,\u4F9D\u8D56\u548C\u9009\u9879
    fullName:computed(async (user\uFF0Cargs)=>{
      user.firstName+user.lastName,
    },
    ['./firstName','./lastName'],
    {...options....})
  }
})


`,paraId:10,tocIndex:3},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:11,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",paraId:12,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u9700\u8981\u901A\u8FC7",paraId:13},{value:"computed",paraId:13},{value:"\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56\u3002",paraId:13},{value:"\u4E5F\u53EF\u4EE5\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\uFF0C\u800C\u662F\u4F7F\u7528",paraId:14,tocIndex:4},{value:"store.computedObjects.create",paraId:14,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:14,tocIndex:4},{value:"create",paraId:15,tocIndex:4},{value:"\u65B9\u6CD5\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:15,tocIndex:4},{value:`// \u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5BF9\u8C61
create<Value = any, Scope = any>(
  getter: ComputedGetter<Value,Scope>,
  options?: SyncComputedOptions<Value,Scope>
):SyncComputedObject<Value,Scope>
// \u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61
create<Value = any, Scope = any>(
  getter: AsyncComputedGetter<Value,Scope>,
  depends: ComputedDepends,options?: ComputedOptions<Value,Scope>
): AsyncComputedObject<Value,Scope>    
// \u4F7F\u7528\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61
create<Value = any, Scope = any>(
  descriptor:ComputedDescriptor<Value,Scope>
): AsyncComputedObject<Value,Scope> | SyncComputedObject<Value,Scope>    
   
`,paraId:16,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u7684\u4E09\u79CD\u65B9\u6CD5\uFF1A",paraId:17,tocIndex:4},{value:`import { createStore } from '@autostorejs/react';

const store = createStore({
  order:{
    price:100,
    count:3,
  }
})

// \u7B80\u5355\u7684\u540C\u6B65\u8BA1\u7B97
const totalObj = store.computedObjects.create((order)=>order.price * order.count)


`,paraId:18,tocIndex:5},{value:`import { createStore } from '@autostorejs/react'; 

const store = createStore({
  order:{
    price:100,
    count:3,
  }
})

// \u7B80\u5355\u7684\u5F02\u6B65\u8BA1\u7B97
store.computedObjects.create(async (order)=>order.price * order.count,
  ['order.price','order.count'] //  \u2705 \u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56
  ['./price','./count']  // \u274C \u4E0D\u652F\u6301\u76F8\u5BF9\u4F9D\u8D56
)
`,paraId:19,tocIndex:6},{value:"\u4E0A\u8FF0\u4E24\u79CD\u65B9\u5F0F\u5185\u90E8\u4E5F\u662F\u4F7F\u7528",paraId:20,tocIndex:7},{value:"computed",paraId:20,tocIndex:7},{value:"\u6765\u521B\u5EFA\u7684\uFF0C\u5176\u7B49\u6548\u4E8E:",paraId:20,tocIndex:7},{value:`
// \u540C\u6B65\u8BA1\u7B97
const totalObj = store.computedObjects.create(computed((order)=>order.price * order.count))

//  \u5F02\u6B65\u8BA1\u7B97
store.computedObjects.create(computed(async (order)=>order.price * order.count,
  ['order.price','order.count'] //  \u2705 \u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56
  ['./price','./count']  // \u274C \u4E0D\u652F\u6301\u76F8\u5BF9\u4F9D\u8D56
))
`,paraId:21,tocIndex:7},{value:"\u4F7F\u7528",paraId:22,tocIndex:7},{value:"computed",paraId:22,tocIndex:7},{value:"\u53EF\u4EE5\u8FDB\u884C\u66F4\u591A\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982",paraId:22,tocIndex:7},{value:"options",paraId:22,tocIndex:7},{value:"\u7B49\u3002",paraId:22,tocIndex:7},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:23,tocIndex:8},{value:"\uFF1A",paraId:23,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"PARENT",paraId:24,tocIndex:8},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:24,tocIndex:8},{value:"associated=true",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:24,tocIndex:8},{value:"obj.value",paraId:24,tocIndex:8},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:24,tocIndex:8},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:25,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:26,tocIndex:8},{value:"\u4F7F\u7528",paraId:27},{value:"computed(<getter>,<depends>,<options>)",paraId:27},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:27},{value:"getter",paraId:28},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:28},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:29},{value:"depends",paraId:28},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:28},{value:"\u4F9D\u8D56",paraId:30},{value:"options",paraId:28},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:28},{value:"\u9009\u9879",paraId:31}]},18624:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(27952);const l=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
`,paraId:2,tocIndex:1},{value:"\u4F9D\u8D56\u8DEF\u5F84\u662F\u4E00\u4E2A",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:".",paraId:3,tocIndex:1},{value:"\u4F5C\u4E3A\u5206\u5272\u7B26\u7684\u5B57\u7B26\u4E32",paraId:3,tocIndex:1},{value:"\u6216\u8005",paraId:3,tocIndex:1},{value:"string[]",paraId:3,tocIndex:1},{value:"\u6570\u7EC4\u3002",paraId:3,tocIndex:1},{value:`
const state = {
  user:{
    name:"Zhang",
    age:18,
    address:[
      {
        city:"Shanghai",
        street:"Nanjing Road"
      },
    ],
    tags:["A","B","C"]
  }
}

// \u5B57\u7B26\u4E32\u8DEF\u5F84

user
user.name
user.address.0.city  // \u6570\u7EC4\u7D22\u5F15
user.age
user.tags.1          // \u6570\u7EC4\u7D22\u5F15

// \u7B49\u6548\u7684\u6570\u7EC4\u8DEF\u5F84

["user"]
["user","name"]
["user","address",0,"city"]
["user","age"]
["user","tags",1]


`,paraId:4,tocIndex:1},{value:"Q",paraId:5},{value:": \u4E3A\u4EC0\u4E48\u6709",paraId:5},{value:"\u5B57\u7B26\u4E32\u8DEF\u5F84",paraId:5},{value:"\u548C",paraId:5},{value:"\u6570\u7EC4\u8DEF\u5F84",paraId:5},{value:"\u7684\u533A\u522B\uFF1F",paraId:5},{value:"A",paraId:5},{value:": \u4E24\u8005\u662F\u7B49\u6548\u7684\uFF0C\u76F8\u8F83\u800C\u8A00\uFF0C",paraId:5},{value:"\u4F7F\u7528",paraId:5},{value:".",paraId:5},{value:"\u4F5C\u4E3A\u5206\u5272\u7B26\u7684\u5B57\u7B26\u4E32",paraId:5},{value:"\u66F4\u52A0\u53CB\u597D\u65B9\u4FBF\uFF0C\u4F46\u7F3A\u70B9\u662F\u5F53\u72B6\u6001\u6570\u636E\u7684\u952E\u540D\u79F0\u5305\u542B",paraId:5},{value:".",paraId:5},{value:"\u5B57\u7B26\u65F6\u4F1A\u4EA7\u751F\u5C90\u4E49\u3002\u800C",paraId:5},{value:"\u6570\u7EC4\u8DEF\u5F84",paraId:5},{value:"\u66F4\u52A0\u7CBE\u51C6\uFF0C\u4E0D\u4F1A\u4EA7\u751F\u5C90\u4E49\u3002",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u7C7B\u578B\u5B9A\u4E49\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:"type ComputedDepend = 'CURRENT' | 'ROOT' | 'PARENT' \n  | `/${string}` | `./${string}` | `../${string}` | string | string[] \n\n",paraId:7,tocIndex:2},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u58F0\u660E\u5305\u62EC",paraId:8,tocIndex:2},{value:"\u7EDD\u5BF9\u8DEF\u5F84",paraId:8,tocIndex:2},{value:"\u548C",paraId:8,tocIndex:2},{value:"\u76F8\u5BF9\u8DEF\u5F84",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u4F9D\u8D56\u7C7B\u578B",paraId:9,tocIndex:2},{value:"\u8BF4\u660E",paraId:9,tocIndex:2},{value:"\u793A\u4F8B",paraId:9,tocIndex:2},{value:"CURRENT",paraId:9,tocIndex:2},{value:"\u5F53\u524D\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"computed",paraId:9,tocIndex:2},{value:"\u6240\u5728\u72B6\u6001\u7684\u5BF9\u8C61\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"ROOT",paraId:9,tocIndex:2},{value:"\u6839\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"\u7B49\u6548\u4E8E",paraId:9,tocIndex:2},{value:"/",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7236\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"computed",paraId:9,tocIndex:2},{value:"\u6240\u5728\u72B6\u6001\u7684\u5BF9\u8C61\u8DEF\u5F84\u7684\u7236\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"/${string}",paraId:9,tocIndex:2},{value:"\u7EDD\u5BF9\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"eg. ",paraId:9,tocIndex:2},{value:"/user/name",paraId:9,tocIndex:2},{value:"./${string}",paraId:9,tocIndex:2},{value:"\u76F8\u5BF9",paraId:9,tocIndex:2},{value:"CURRENT",paraId:9,tocIndex:2},{value:"\u7684\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"eg. ",paraId:9,tocIndex:2},{value:"./name",paraId:9,tocIndex:2},{value:"../${string}",paraId:9,tocIndex:2},{value:"\u76F8\u5BF9",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7684\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"eg. ",paraId:9,tocIndex:2},{value:"../name",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"../../a/bc",paraId:9,tocIndex:2},{value:"string",paraId:9,tocIndex:2},{value:"\u7EDD\u5BF9\u5B57\u7B26\u4E32\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"\u7B49\u6548\u4E8E",paraId:9,tocIndex:2},{value:"/user.name",paraId:9,tocIndex:2},{value:"\u91CD\u70B9\u7406\u89E3\u4E00\u4E0B",paraId:10,tocIndex:2},{value:"\u76F8\u5BF9\u8DEF\u5F84",paraId:10,tocIndex:2},{value:"\u7684\u6982\u5FF5\uFF1A",paraId:10,tocIndex:2},{value:"\u76F8\u5BF9\u8DEF\u5F84",paraId:11,tocIndex:2},{value:"\u7684\u76F8\u5BF9\u6307\u7684\u662F",paraId:11,tocIndex:2},{value:"computed",paraId:11,tocIndex:2},{value:"\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\uFF0C\u4F8B\u5982\uFF1A",paraId:11,tocIndex:2},{value:"\u76F8\u5BF9\u5F53\u524D\u5BF9\u8C61",paraId:12,tocIndex:2},{value:"CURRENT",paraId:13,tocIndex:2},{value:"\u8FD9\u91CC\u7684\u5F53\u524D\u6307\u7684\u662F",paraId:13,tocIndex:2},{value:"computed",paraId:13,tocIndex:2},{value:"\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\uFF0C\u5373",paraId:13,tocIndex:2},{value:"total",paraId:13,tocIndex:2},{value:"\u6240\u5728\u7684\u5BF9\u8C61\u662F",paraId:13,tocIndex:2},{value:"order",paraId:13,tocIndex:2},{value:"\u5BF9\u8C61\u3002",paraId:13,tocIndex:2},{value:`const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },[
      './price',
      './count'
    ])
  }
}
`,paraId:14,tocIndex:2},{value:"\u76F8\u5BF9\u7236\u5BF9\u8C61",paraId:15,tocIndex:2},{value:"\u5373",paraId:16,tocIndex:2},{value:"total",paraId:16,tocIndex:2},{value:"\u6240\u5728\u7684\u5BF9\u8C61\u662F",paraId:16,tocIndex:2},{value:"order",paraId:16,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C",paraId:16,tocIndex:2},{value:"..",paraId:16,tocIndex:2},{value:"\u8868\u793A\u7236\u5BF9\u8C61\uFF0C\u6307\u5411\u7684\u5C31\u662F\u6839\u5BF9\u8C61.",paraId:16,tocIndex:2},{value:`const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },[
      '../order.price',
      '../order.count'
    ])
  }
}
`,paraId:17,tocIndex:2},{value:"\u76F8\u5BF9\u7684\u662F",paraId:18},{value:"computed",paraId:18},{value:"\u51FD\u6570\u58F0\u660E\u7684\u72B6\u6001\u6240\u5728\u7684\u5BF9\u8C61\uFF0C\u4E0A\u4F8B\u4E2D\u7684",paraId:18},{value:"total",paraId:18},{value:"\u6240\u5728\u7684\u5BF9\u8C61\u662F",paraId:18},{value:"order",paraId:18},{value:"\u800C\u4E0D\u662F",paraId:18},{value:"total",paraId:18},{value:"\u3002",paraId:18},{value:"\u5728\u6307\u5B9A\u4F9D\u8D56\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:19,tocIndex:3},{value:"*",paraId:19,tocIndex:3},{value:"\u901A\u914D\u7B26\u6765\u5339\u914D\u8DEF\u5F84\u4E2D\u4EFB\u610F\u5B57\u7B26\uFF0C\u5982:",paraId:19,tocIndex:3},{value:"\u2705 ",paraId:20,tocIndex:3},{value:"orders.*.total",paraId:20,tocIndex:3},{value:" \u5339\u914D",paraId:20,tocIndex:3},{value:"orders",paraId:20,tocIndex:3},{value:"\u7684\u4EFB\u610F\u5BF9\u8C61\u7684",paraId:20,tocIndex:3},{value:"total",paraId:20,tocIndex:3},{value:"\u5C5E\u6027\u3002",paraId:20,tocIndex:3},{value:"\u2705 ",paraId:20,tocIndex:3},{value:"orders.*",paraId:20,tocIndex:3},{value:" \u5339\u914D",paraId:20,tocIndex:3},{value:"orders",paraId:20,tocIndex:3},{value:"\u4E0B\u7684\u4EFB\u610F\u6210\u5458\u3002",paraId:20,tocIndex:3},{value:"\u2705 ",paraId:20,tocIndex:3},{value:"orders.*.address.*.city",paraId:20,tocIndex:3},{value:" \u5339\u914D",paraId:20,tocIndex:3},{value:"orders",paraId:20,tocIndex:3},{value:"\u7684\u4EFB\u610F\u5BF9\u8C61\u7684",paraId:20,tocIndex:3},{value:"address",paraId:20,tocIndex:3},{value:"\u7684\u4EFB\u610F\u5BF9\u8C61\u7684",paraId:20,tocIndex:3},{value:"city",paraId:20,tocIndex:3},{value:"\u5C5E\u6027\u3002",paraId:20,tocIndex:3},{value:"\u5728\u5FEB\u901F\u5165\u95E8\u7684\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u5C31\u4F7F\u7528",paraId:21},{value:"orders.*.total",paraId:21},{value:"\u6765\u5339\u914D",paraId:21},{value:"orders",paraId:21},{value:"\u6570\u7EC4\u6210\u5458\u4E2D\u7684",paraId:21},{value:"total",paraId:21},{value:"\u5C5E\u6027\u3002",paraId:21},{value:"\u5F53\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002\u56E0\u6B64\u5FC5\u7136\u6709\u4EBA\u4E00\u4E2A\u6536\u96C6\u4F9D\u8D56\u7684\u8FC7\u7A0B\uFF0C\u7531\u4E8E\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u6536\u96C6\u65B9\u5F0F\u4E0D\u540C\uFF0C\u56E0\u6B64\u5206\u522B\u4ECB\u7ECD\u3002",paraId:22,tocIndex:4},{value:"\u5728\u540C\u6B65\u5C5E\u6027\u7684\u521D\u59CB\u5316\u4E2D\uFF0C\u4F1A\u81EA\u52A8\u5B8C\u6210\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u539F\u7406\u5982\u4E0B\uFF1A",paraId:23,tocIndex:5},{value:"\u6267\u884C\u540C\u6B65\u8BA1\u7B97\u51FD\u6570",paraId:24,tocIndex:5},{value:"Getter",paraId:24,tocIndex:5},{value:"\u524D\uFF0C\u5148\u8C03\u7528",paraId:24,tocIndex:5},{value:"store.watch",paraId:24,tocIndex:5},{value:"\u51FD\u6570\u6765\u4FA6\u542C\u5BF9\u72B6\u6001\u7684\u6240\u6709\u8BFB\u5199\u4E8B\u4EF6\u3002",paraId:24,tocIndex:5},{value:"\u7136\u540E\u81EA\u52A8\u6267\u884C\u4E00\u6B21\u8BA1\u7B97\u51FD\u6570",paraId:24,tocIndex:5},{value:"Getter",paraId:24,tocIndex:5},{value:"\uFF0C\u8FD9\u6837\u4FA6\u542C\u51FD\u6570\u5C31\u53EF\u4EE5\u4FA6\u542C\u5230",paraId:24,tocIndex:5},{value:"Getter",paraId:24,tocIndex:5},{value:"\u51FD\u6570\u7528\u5230\u4E86\u54EA\u4E9B\u72B6\u6001\uFF0C\u5373\u4F9D\u8D56\u4E86\u54EA\u4E9B\u72B6\u6001\uFF0C\u5C06\u4E4B\u8BB0\u5F55\u4E0B\u6765\u5373\u53EF,\u4ECE\u800C\u5B8C\u6210\u4F9D\u8D56\u7684\u6536\u96C6\u5DE5\u4F5C\u3002",paraId:24,tocIndex:5},{value:"\u6700\u540E\u53D6\u6D88",paraId:24,tocIndex:5},{value:"store.watch",paraId:24,tocIndex:5},{value:"\u4FA6\u542C\u3002",paraId:24,tocIndex:5},{value:"\u7279\u6B8A\u6CE8\u610F\u7684\u662F\uFF0C\u5FC5\u987B",paraId:25,tocIndex:5},{value:"\u4FDD\u8BC1\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u662F\u5E42\u7B49\u7684",paraId:25,tocIndex:5},{value:`\uFF0C \u5373\u591A\u6B21\u8C03\u7528\u7ED3\u679C\u662F\u4E00\u6837\u7684\u3002\u624D\u53EF\u4EE5\u4FDD\u8BC1\u4F9D\u8D56\u6536\u96C6\u7684\u51C6\u786E\u6027\u3002
\u901A\u4FD7\u7684\u8BB2\uFF0C\u5C31\u662F\u8BA1\u7B97\u51FD\u6570\u7684\u6267\u884C\u5FC5\u987B\u80FD\u6536\u96C6\u5230\u76F8\u540C\u7684\u4F9D\u8D56\u3002`,paraId:25,tocIndex:5},{value:"\u5982\u4E0B\u793A\u4F8B\u5C31\u65E0\u6CD5\u4FDD\u8BC1\u6B63\u786E\u6536\u96C6\u4F9D\u8D56\u3002",paraId:26,tocIndex:5},{value:`const state = {
  order:{
    price:10,
    count:1,
    total:computed((scope)=>{
      if(a===1){
        return scope.count
      }
      return scope.price*scope.count
    } )
  }
}
`,paraId:27,tocIndex:5},{value:"\u4EE5\u4E0A\u793A\u4F8B\u5728\u7B2C\u4E00\u6B21\u6267\u884C\u65F6\u6536\u96C6\u4F9D\u8D56\uFF0C\u5982\u679C",paraId:28,tocIndex:5},{value:"a=1",paraId:28,tocIndex:5},{value:"\uFF0C\u8FD4\u56DE",paraId:28,tocIndex:5},{value:"scope.count",paraId:28,tocIndex:5},{value:"\uFF0C\u5C31\u53EA\u80FD\u6536\u96C6\u5230",paraId:28,tocIndex:5},{value:"scope.count",paraId:28,tocIndex:5},{value:"\u7684\u4F9D\u8D56\uFF0C\u800C\u4E0D\u4F1A\u6536\u96C6\u5230",paraId:28,tocIndex:5},{value:"scope.price",paraId:28,tocIndex:5},{value:"\u7684\u4F9D\u8D56\u3002\u8FD9\u6837\u5728",paraId:28,tocIndex:5},{value:"scope.price",paraId:28,tocIndex:5},{value:"\u53D8\u5316\u65F6\uFF0C\u5C31\u65E0\u6CD5\u89E6\u53D1",paraId:28,tocIndex:5},{value:"total",paraId:28,tocIndex:5},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:28,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u6536\u96C6\u65E0\u6CD5\u50CF\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u90A3\u6837\u81EA\u52A8\u5B8C\u6210\uFF0C\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:29,tocIndex:6},{value:`const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
}
`,paraId:30,tocIndex:6},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:31,tocIndex:6},{value:"./price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"./count",paraId:31,tocIndex:6},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:31,tocIndex:6},{value:"price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"count",paraId:31,tocIndex:6},{value:"\u5C5E\u6027\u3002",paraId:31,tocIndex:6},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:31,tocIndex:6},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:31,tocIndex:6}]},96989:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(87537);const l=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},68105:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(78116);const l=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"store.computedObjects",paraId:0,tocIndex:0},{value:"\u6765\u7BA1\u7406",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A",paraId:1,tocIndex:0},{value:"Map",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u662F\u4E00\u4E2A\u7C7B\uFF0C\u67E5\u770BAPI\u6587\u6863\u53EF\u4EE5\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\u3002",paraId:3}]},66256:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(40471);const l=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u652F\u6301",paraId:0,tocIndex:0},{value:"ComputedOptions",paraId:0,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u53C2\u6570\u6765\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`// \u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
function computed<Value = any, Scope = any>(
    getter: AsyncComputedGetter<Value,Scope>,
    depends: ComputedDepends,
    options?: ComputedOptions<Value,Scope>
): ComputedDescriptorBuilder<Value,Scope>;
// \u540C\u6B65\u8BA1\u7B97\u5C5E\u6027
function computed<Value = any, Scope = any >(
    getter: ComputedGetter<Value,Scope>,
    options?: SyncComputedOptions<Value,Scope>
): ComputedDescriptorBuilder<Value,Scope>;

`,paraId:2,tocIndex:0},{value:"ComputedOptions",paraId:3,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:"computed",paraId:4,tocIndex:0},{value:"\u652F\u6301\u4EE5\u4E0B\u8BA1\u7B97\u914D\u7F6E\u53C2\u6570\uFF1A",paraId:4,tocIndex:0},{value:"\u7C7B\u578B",paraId:5,tocIndex:1},{value:"\uFF1A",paraId:5,tocIndex:1},{value:"string",paraId:5,tocIndex:1},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61",paraId:6,tocIndex:1},{value:"ComputedObject",paraId:6,tocIndex:1},{value:"\u65F6\u552F\u4E00\u6807\u8BC6\uFF0C\u5982\u679C\u672A\u6307\u5B9A",paraId:6,tocIndex:1},{value:"\u4F7F\u7528",paraId:7,tocIndex:1},{value:"computed",paraId:7,tocIndex:1},{value:"\u6240\u5728\u7684\u8DEF\u5F84\u540D\u4F5C\u4E3A\u6807\u8BC6\uFF0C\u5982",paraId:7,tocIndex:1},{value:"user.fullName",paraId:7,tocIndex:1},{value:"\u3002",paraId:7,tocIndex:1},{value:"\u52A8\u6001\u521B\u5EFA\u7684",paraId:7,tocIndex:1},{value:"ComputedObject",paraId:7,tocIndex:1},{value:"\u4F1A\u81EA\u52A8\u751F\u6210\u4E00\u4E2A\u552F\u4E00\u6807\u8BC6\u3002",paraId:7,tocIndex:1},{value:"\u5F53\u7136\uFF0C\u60A8\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:8,tocIndex:1},{value:"id",paraId:8,tocIndex:1},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u552F\u4E00\u6807\u8BC6\u3002",paraId:8,tocIndex:1},{value:"\u7C7B\u578B",paraId:9,tocIndex:2},{value:"\uFF1A",paraId:9,tocIndex:2},{value:"boolean | 'auto'",paraId:9,tocIndex:2},{value:"\u9ED8\u8BA4\u503C",paraId:9,tocIndex:2},{value:"\uFF1A",paraId:9,tocIndex:2},{value:"'auto'",paraId:9,tocIndex:2},{value:"\u9488\u5BF9\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u662F\u5426\u5728\u521D\u59CB\u5316\u65F6\u7ACB\u523B\u8FD0\u884C\u4E00\u6B21\u8BA1\u7B97\u51FD\u6570",paraId:10,tocIndex:2},{value:"getter",paraId:10,tocIndex:2},{value:".\u53D6\u503C\u5982\u4E0B\uFF1A",paraId:10,tocIndex:2},{value:"\u503C",paraId:11,tocIndex:2},{value:"\u8BF4\u660E",paraId:11,tocIndex:2},{value:"true",paraId:11,tocIndex:2},{value:"\u5728\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u65F6\u9A6C\u4E0A\u6267\u884C\u4E00\u6B21",paraId:11,tocIndex:2},{value:"false",paraId:11,tocIndex:2},{value:"\u5728\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u65F6\u4E0D\u9A6C\u4E0A\u6267\u884C\u4E00\u6B21\uFF0C\u540E\u7EED\u4EC5\u5728\u4F9D\u8D56\u53D8\u5316\u65F6\u6267\u884C",paraId:11,tocIndex:2},{value:"auto",paraId:11,tocIndex:2},{value:"\u5F53",paraId:11,tocIndex:2},{value:"initial==undefined",paraId:11,tocIndex:2},{value:"\u65F6\u4F1A\u9A6C\u4E0A\u6267\u884C\u4E00\u6B21\uFF0C\u5176\u4ED6\u503C\u5219\u4E0D\u9A6C\u4E0A\u6267\u884C\u4E00\u6B21",paraId:11,tocIndex:2},{value:"\u7C7B\u578B",paraId:12,tocIndex:3},{value:"\uFF1A\u53EF\u4EE5\u901A\u8FC7\u6CDB\u578B\u53C2\u6570\u6307\u5B9A",paraId:12,tocIndex:3},{value:"Value",paraId:12,tocIndex:3},{value:"\u9ED8\u8BA4\u503C",paraId:12,tocIndex:3},{value:"\uFF1Aundefined",paraId:12,tocIndex:3},{value:"\u4F5C\u4E3A\u8BA1\u7B97\u5C5E\u6027\u7684\u521D\u59CB\u503C\u3002",paraId:13,tocIndex:3},{value:"\u7C7B\u578B",paraId:14,tocIndex:4},{value:"\uFF1A",paraId:14,tocIndex:4},{value:"ComputedScope",paraId:14,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:14,tocIndex:4},{value:": ",paraId:14,tocIndex:4},{value:"Current",paraId:14,tocIndex:4},{value:"\u6307\u5B9A\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u679C\u672A\u6307\u5B9A\uFF0C\u5219\u9ED8\u8BA4\u4E3A",paraId:15,tocIndex:4},{value:"Current",paraId:15,tocIndex:4},{value:"\u3002\u8BE6\u89C1",paraId:15,tocIndex:4},{value:"ComputedScope",paraId:16,tocIndex:4},{value:"\u3002",paraId:15,tocIndex:4},{value:"\u7C7B\u578B",paraId:17,tocIndex:5},{value:"\uFF1A",paraId:17,tocIndex:5},{value:"boolean",paraId:17,tocIndex:5},{value:"\u9ED8\u8BA4\u503C",paraId:17,tocIndex:5},{value:"\uFF1A",paraId:17,tocIndex:5},{value:"true",paraId:17,tocIndex:5},{value:"\u8BA1\u7B97\u5F00\u5173\uFF0C\u5F53",paraId:18,tocIndex:5},{value:"enable=false",paraId:18,tocIndex:5},{value:`\u65F6\u4E0D\u4F1A\u6267\u884C\u8BA1\u7B97\u3002
\u4E5F\u53EF\u4EE5\u901A\u8FC7`,paraId:18,tocIndex:5},{value:"store.computedObjects.get(<id>).enable=<true/false>",paraId:18,tocIndex:5},{value:"\u6765\u7EDF\u4E00\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u5F00\u5173\u3002",paraId:18,tocIndex:5},{value:"\u7C7B\u578B",paraId:19,tocIndex:6},{value:"\uFF1A",paraId:19,tocIndex:6},{value:"boolean",paraId:19,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:19,tocIndex:6},{value:"\uFF1A",paraId:19,tocIndex:6},{value:"undefined",paraId:19,tocIndex:6},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:20,tocIndex:6},{value:"computed",paraId:20,tocIndex:6},{value:"\u51FD\u6570\u4F1A\u901A\u8FC7",paraId:20,tocIndex:6},{value:'typeof(fn)=="async function"',paraId:20,tocIndex:6},{value:`\u6765\u5224\u65AD\u662F\u5426\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570,\u4EE5\u51B3\u5B9A\u5982\u4F55\u521B\u5EFA\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002
\u4F46\u662F\u5728\u8FD4\u56DE`,paraId:20,tocIndex:6},{value:"Promise",paraId:20,tocIndex:6},{value:"\u6216\u8005",paraId:20,tocIndex:6},{value:"Babel",paraId:20,tocIndex:6},{value:"\u8F6C\u7801\u7B49\u60C5\u51B5\u4E0B\uFF0C\u5224\u65AD\u4F1A\u5931\u6548\u65F6\uFF0C\u9700\u8981\u624B\u52A8\u6307\u5B9A",paraId:20,tocIndex:6},{value:"async=true",paraId:20,tocIndex:6},{value:"\u7C7B\u578B",paraId:21,tocIndex:7},{value:"\uFF1A",paraId:21,tocIndex:7},{value:"ComputedDepends",paraId:21,tocIndex:7},{value:"\u5FC5\u586B\u4F9D\u8D56\u9879\uFF0C\u7528\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u6307\u5B9A\u7684\u4F9D\u8D56\u9879\u3002\u8BE6\u89C1",paraId:22,tocIndex:7},{value:"ComputedDepends",paraId:23,tocIndex:7},{value:"\u3002",paraId:22,tocIndex:7},{value:"\u7C7B\u578B",paraId:24,tocIndex:8},{value:"\uFF1A",paraId:24,tocIndex:8},{value:"string",paraId:24,tocIndex:8},{value:"\u7528\u4E8E\u5C06\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u4FBF\u4E8E\u7BA1\u7406\u3002\u6BD4\u5982\u53EF\u4EE5\u901A\u8FC7",paraId:25,tocIndex:8},{value:'store.computedObjects.runGroup("a"])',paraId:25,tocIndex:8},{value:"\u6765\u8FD0\u884C\u6307\u5B9A\u5206\u7EC4\u7684\u8BA1\u7B97\u51FD\u6570\u3002",paraId:25,tocIndex:8},{value:"\u53C2\u8003",paraId:26,tocIndex:8},{value:"\u624B\u5DE5\u8FD0\u884C",paraId:27,tocIndex:8},{value:"\u3002",paraId:26,tocIndex:8},{value:"\u7C7B\u578B",paraId:28,tocIndex:9},{value:"\uFF1A",paraId:28,tocIndex:9},{value:"boolean",paraId:28,tocIndex:9},{value:"\u9ED8\u8BA4\u503C",paraId:28,tocIndex:9},{value:"\uFF1A",paraId:28,tocIndex:9},{value:"true",paraId:28,tocIndex:9},{value:"\u662F\u5426\u5C06\u521B\u5EFA\u7684",paraId:29,tocIndex:9},{value:"computedObject",paraId:29,tocIndex:9},{value:"\u5BF9\u8C61\u4FDD\u5B58\u5230",paraId:29,tocIndex:9},{value:"store.computedObjects",paraId:29,tocIndex:9},{value:`\u4E2D\u3002
\u5C06`,paraId:29,tocIndex:9},{value:"objectify=false",paraId:29,tocIndex:9},{value:",\u5728",paraId:29,tocIndex:9},{value:"React",paraId:29,tocIndex:9},{value:"\u7EC4\u4EF6\u4E2D\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4E0D\u5C06\u8BA1\u7B97\u5C5E\u6027\u4FDD\u5B58\u5230",paraId:29,tocIndex:9},{value:"store.computedObjects",paraId:29,tocIndex:9},{value:"\u4E2D\u3002\u4EE5\u4FBF\u5728\u7EC4\u4EF6\u9500\u6BC1\u65F6\u81EA\u52A8\u91CA\u653E\u3002",paraId:29,tocIndex:9},{value:"\u7C7B\u578B",paraId:30,tocIndex:10},{value:"\uFF1A",paraId:30,tocIndex:10},{value:"number | [number,number]",paraId:30,tocIndex:10},{value:"\u9ED8\u8BA4\u503C",paraId:30,tocIndex:10},{value:"\uFF1A",paraId:30,tocIndex:10},{value:"0",paraId:30,tocIndex:10},{value:"\u7528\u6765\u63A7\u5236\u5F02\u6B65\u51FD\u6570\u6267\u884C\u7684\u8D85\u65F6\u3002",paraId:31,tocIndex:10},{value:"\u6307\u5B9A\u8D85\u65F6\u65F6\u95F4\uFF0C\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u8D85\u8FC7\u6307\u5B9A\u65F6\u95F4\u540E\uFF0C\u4F1A\u89E6\u53D1\u8D85\u65F6\u9519\u8BEF\u3002",paraId:32,tocIndex:10},{value:"\u5982\u679C",paraId:32,tocIndex:10},{value:"timeout=[\u8D85\u65F6\u65F6\u95F4,\u5012\u8BA1\u65F6\u95F4\u9694]",paraId:32,tocIndex:10},{value:"\uFF0C \u4F8B\u5982\uFF1A[1000,10]\u8868\u793A",paraId:32,tocIndex:10},{value:"1000ms",paraId:32,tocIndex:10},{value:"\u8D85\u65F6,\u6BCF\u9694100ms\u66F4\u65B0\u4E00\u4E0B",paraId:32,tocIndex:10},{value:"timeout",paraId:32,tocIndex:10},{value:"\u503C\uFF0C\u5B9E\u73B0\u5012\u8BA1\u65F6\u7684\u6548\u679C\u3002",paraId:32,tocIndex:10},{value:"\u8BE6\u89C1",paraId:33,tocIndex:10},{value:"\u8D85\u65F6\u5904\u7406",paraId:34,tocIndex:10},{value:"\u3002",paraId:33,tocIndex:10},{value:"\u7C7B\u578B",paraId:35,tocIndex:11},{value:"\uFF1A",paraId:35,tocIndex:11},{value:"boolean",paraId:35,tocIndex:11},{value:"\u9ED8\u8BA4\u503C",paraId:35,tocIndex:11},{value:"\uFF1A",paraId:35,tocIndex:11},{value:"false",paraId:35,tocIndex:11},{value:"\u8BA1\u7B97\u51FD\u6570\u4E0D\u53EF\u91CD\u5165\uFF0C\u5373\u540C\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u4E0D\u4F1A\u518D\u6B21\u6267\u884C.",paraId:36,tocIndex:11},{value:"\u7C7B\u578B",paraId:37,tocIndex:12},{value:"\uFF1A",paraId:37,tocIndex:12},{value:"()=>AbortController | undefine",paraId:37,tocIndex:12},{value:"\u63D0\u4F9B\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684",paraId:38,tocIndex:12},{value:"AbortController",paraId:38,tocIndex:12},{value:"\u7528\u6765\u66FF\u4EE3\u9ED8\u8BA4\u7684",paraId:38,tocIndex:12},{value:"AbortController",paraId:38,tocIndex:12},{value:"\uFF0C\u7528\u6765\u4F20\u9012\u7ED9\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u4EE5\u4FBF\u53EF\u4EE5\u53D6\u6D88\u5F02\u6B65\u8BA1\u7B97.",paraId:38,tocIndex:12},{value:"\u8BE6\u89C1",paraId:39,tocIndex:12},{value:"\u5F02\u6B65\u8BA1\u7B97-\u53D6\u6D88",paraId:40,tocIndex:12},{value:"\u3002",paraId:39,tocIndex:12},{value:"\u7C7B\u578B",paraId:41,tocIndex:13},{value:"\uFF1A",paraId:41,tocIndex:13},{value:"number",paraId:41,tocIndex:13},{value:"\u9ED8\u8BA4\u503C",paraId:41,tocIndex:13},{value:"\uFF1A",paraId:41,tocIndex:13},{value:"0",paraId:41,tocIndex:13},{value:"\u7528\u6765\u63A7\u5236\u5F02\u6B65\u8BA1\u7B97\u5931\u8D25\u540E\u91CD\u8BD5\u6B21\u6570\u3002",paraId:42,tocIndex:13},{value:"\u9ED8\u8BA4",paraId:43,tocIndex:13},{value:"retry=0",paraId:43,tocIndex:13},{value:"\u4EE3\u8868\u4E0D\u542F\u7528\u91CD\u8BD5\u63A7\u5236\u3002",paraId:43,tocIndex:13},{value:"retry=3",paraId:43,tocIndex:13},{value:"\u8868\u793A\u6700\u591A\u91CD\u8BD5",paraId:43,tocIndex:13},{value:"3",paraId:43,tocIndex:13},{value:"\u6B21,\u91CD\u8BD5\u95F4\u9694\u4E3A",paraId:43,tocIndex:13},{value:"0",paraId:43,tocIndex:13},{value:"\uFF0C\u52A0\u4E0A\u7B2C",paraId:43,tocIndex:13},{value:"1",paraId:43,tocIndex:13},{value:"\u6B21\u6267\u884C\uFF0C\u603B\u5171\u6267\u884C",paraId:43,tocIndex:13},{value:"4",paraId:43,tocIndex:13},{value:"\u6B21",paraId:43,tocIndex:13},{value:"retry=[3,1000]",paraId:43,tocIndex:13},{value:"\u8868\u793A\u6700\u591A\u91CD\u8BD5",paraId:43,tocIndex:13},{value:"3",paraId:43,tocIndex:13},{value:"\u6B21\uFF0C\u91CD\u8BD5\u95F4\u9694\u4E3A",paraId:43,tocIndex:13},{value:"1000ms",paraId:43,tocIndex:13},{value:"\uFF0C\u52A0\u4E0A\u7B2C",paraId:43,tocIndex:13},{value:"1",paraId:43,tocIndex:13},{value:"\u6B21\u6267\u884C\uFF0C\u603B\u5171\u6267\u884C",paraId:43,tocIndex:13},{value:"4",paraId:43,tocIndex:13},{value:"\u6B21",paraId:43,tocIndex:13},{value:"\u91CD\u8BD5\u6570\u636E\u53EF\u4EE5\u901A\u8FC7",paraId:43,tocIndex:13},{value:"AsyncComputedValue.retry",paraId:43,tocIndex:13},{value:"\u83B7\u53D6",paraId:43,tocIndex:13},{value:"\u5F53\u9996\u6B21\u6267\u884C\u5931\u8D25\u65F6\u89E6\u53D1\u91CD\u8BD5\uFF0C\u6B64\u65F6",paraId:43,tocIndex:13},{value:"AsyncComputedValue.retry=3",paraId:43,tocIndex:13},{value:"\uFF0C\u7136\u540E\u6BCF\u6B21\u91CD\u8BD5",paraId:43,tocIndex:13},{value:"-1",paraId:43,tocIndex:13},{value:"\uFF0C\u76F4\u5230\u4E3A",paraId:43,tocIndex:13},{value:"0",paraId:43,tocIndex:13},{value:"\u65F6\u505C\u6B62\u91CD\u8BD5",paraId:43,tocIndex:13},{value:"\u8BE6\u89C1",paraId:44,tocIndex:13},{value:"\u91CD\u8BD5\u5904\u7406",paraId:45,tocIndex:13},{value:"\u3002",paraId:44,tocIndex:13},{value:"\u7C7B\u578B",paraId:46,tocIndex:14},{value:"\uFF1A",paraId:46,tocIndex:14},{value:"any",paraId:46,tocIndex:14},{value:"\u989D\u5916\u53C2\u6570\uFF0C\u7528\u4E8E\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570\u3002\u5728\u8BA1\u7B97\u51FD\u6570\u4E2D\u53EF\u4EE5\u901A\u8FC7",paraId:47,tocIndex:14},{value:"extras",paraId:47,tocIndex:14},{value:"\u53C2\u6570\u83B7\u53D6\u3002",paraId:47,tocIndex:14},{value:`import { createStore,computed } from '@autostorejs/react';
const store = createStore({
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user,{extras})=>{
      // \u901A\u8FC7extras\u83B7\u53D6\u989D\u5916\u53C2\u6570
      return user.firstName+user.lastName + \`\${count}\`
    },["./firstName","./lastName"],{extras:{count:0}})
  }
})
`,paraId:48,tocIndex:14},{value:"\u7C7B\u578B",paraId:49,tocIndex:15},{value:"\uFF1A",paraId:49,tocIndex:15},{value:"(error:Error)=>void",paraId:49,tocIndex:15},{value:"\u5F53\u6267\u884C\u8BA1\u7B97",paraId:50,tocIndex:15},{value:"getter",paraId:50,tocIndex:15},{value:"\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03",paraId:50,tocIndex:15},{value:"\u7C7B\u578B",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:"(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void",paraId:51,tocIndex:16},{value:"\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u5B8C\u6210\u65F6\u7684\u56DE\u8C03",paraId:52,tocIndex:16}]},13699:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(71413);const l=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:0,tocIndex:0},{value:"\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:1,tocIndex:0},{value:"ComputedObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:0},{value:"ComputedObject",paraId:2,tocIndex:0},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:2,tocIndex:0},{value:"store.computedObjects",paraId:2,tocIndex:0},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:2,tocIndex:0},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"store.computedObjects.get(<id>).run()",paraId:3,tocIndex:1},{value:"\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:`import { createStore,computed } from '@autostorejs/react';
const store = createStore({
  order:{
    price:100,
    count:4,
    total: computed(async (state)=>{
      return state.price*state.count
    },["./price","./count"]),
    total2: computed(async (state)=>{
      return state.price*state.count
    },["./price","./count"],{id:"x"})
  }
})
// \u83B7\u53D6\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u7136\u540E\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570
store.computedObjects.get("order.total").run()
store.computedObjects.get("x").run()

`,paraId:4,tocIndex:1},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u5E94\u7684",paraId:5,tocIndex:1},{value:"ComputedObject",paraId:5,tocIndex:1},{value:",",paraId:5,tocIndex:1},{value:"id",paraId:5,tocIndex:1},{value:"\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u8DEF\u5F84\u540D\uFF0C\u5982",paraId:5,tocIndex:1},{value:"user.fullName",paraId:5,tocIndex:1},{value:"\u3002\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"id",paraId:5,tocIndex:1},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u552F\u4E00\u6807\u8BC6\u3002",paraId:5,tocIndex:1},{value:"\u901A\u8FC7",paraId:5,tocIndex:1},{value:"store.computedObjects.get(<id>)",paraId:5,tocIndex:1},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u7136\u540E\u8C03\u7528",paraId:5,tocIndex:1},{value:"run",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:5,tocIndex:1},{value:"\u901A\u8FC7",paraId:6,tocIndex:2},{value:"computedObject.run(args:RuntimeComputedOptions)",paraId:6,tocIndex:2},{value:"\u65B9\u6CD5\u7528\u6765\u91CD\u65B0\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:6,tocIndex:2},{value:"run",paraId:7,tocIndex:2},{value:"\u51FD\u6570\u7684\u53C2\u6570\u5982\u4E0B\uFF1A",paraId:7,tocIndex:2},{value:`export type RuntimeComputedOptions = ComputedOptions & {
    first?  : boolean            // \u5F53\u7B2C\u4E00\u6B21\u8FD0\u884C\u65F6\u4E3Atrue
    operate?: StateOperate       // \u53D8\u5316\u7684\u4F9D\u8D56\u4FE1\u606F
} 
`,paraId:8,tocIndex:2},{value:"\u5F53\u624B\u52A8\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u65F6\uFF0C\u5141\u8BB8\u4F20\u5165",paraId:9,tocIndex:2},{value:"RuntimeComputedOptions",paraId:9,tocIndex:2},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u8986\u76D6\u9ED8\u8BA4\u7684\u8BA1\u7B97\u53C2\u6570\u3002",paraId:9,tocIndex:2},{value:"first",paraId:9,tocIndex:2},{value:"\u53C2\u6570\u7528\u6765\u6807\u8BC6\u662F\u5426\u4E3A\u7B2C\u4E00\u6B21\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002\u4E00\u822C\u624B\u5DE5\u8FD0\u884C\u65F6\u4E0D\u8981\u6307\u5B9A",paraId:9,tocIndex:2},{value:"operate",paraId:9,tocIndex:2},{value:"\u53C2\u6570\u7528\u6765\u6307\u5B9A\u53D8\u5316\u7684\u4F9D\u8D56\u4FE1\u606F\uFF0C\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u503C\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u4F20\u5165\u6B64\u53C2\u6570\uFF0C\u6B64\u53C2\u6570\u5305\u542B\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u4FE1\u606F\u3002\u800C\u5F53\u624B\u5DE5\u6267\u884C\u65F6\uFF0C\u4E0D\u9700\u8981\u6307\u5B9A\u6B64\u53C2\u6570\u3002",paraId:9,tocIndex:2},{value:"ComputedOptions",paraId:9,tocIndex:2},{value:"\u7684\u914D\u7F6E\u53C2\u6570\u53EF\u4EE5\u53C2\u8003",paraId:9,tocIndex:2},{value:"\u8BA1\u7B97\u53C2\u6570",paraId:10,tocIndex:2},{value:"\u3002",paraId:9,tocIndex:2},{value:"ComputedObjects",paraId:11,tocIndex:3},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:`\u65B9\u6CD5\uFF0C\u7528\u6765\u6267\u884C\u5206\u7EC4\u8BA1\u7B97\u3002
\u5F53\u4F7F\u7528`,paraId:11,tocIndex:3},{value:"computed",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"group",paraId:11,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:11,tocIndex:3},{value:"computed",paraId:12,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"enable",paraId:12,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:12,tocIndex:4},{value:"enable=false",paraId:12,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:12,tocIndex:4},{value:"enable=true",paraId:12,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:13,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:14,tocIndex:4},{value:"enable",paraId:14,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:14,tocIndex:4}]},21526:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(56424);const l=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
  Root    = 'root',                   // \u6307\u5411State\u6839\u5BF9\u8C61
  Current = 'current',                // \u6307\u5411\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61
  Parent  = 'parent',                 // \u6307\u5411\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61
  Depends = 'depends'                 // \u6307\u5411\u5F02\u6B65\u8BA1\u7B97\u7684\u4F9D\u8D56\u6570\u7EC4\uFF0C\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548
  Self    = 'self'                    // \u6307\u5411\u81EA\u8EAB\uFF0C\u9ED8\u8BA4\u503C   
}

// \u6307\u5B9AStore\u4E2D\u8BA1\u7B97\u51FD\u6570\u7684\u4E0A\u4E0B\u6587,\u5982\u679C\u662F\u5B57\u7B26\u4E32\u4EE3\u8868\u662F\u5F53\u524D\u5BF9\u8C61\u7684\u6307\u5B9A\u952E\uFF0C\u5982\u679C\u662Fstring[]\uFF0C\u5219\u4EE3\u8868\u662F\u5F53\u524DStore\u5BF9\u8C61\u7684\u5B8C\u6574\u8DEF\u5F84
export type ComputedScope  =  ObserverScopeRef | string | string[] | ((state:any)=>string | string[] | ObserverScopeRef)
 
const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope\u6307\u5411user
    },["user.firstName","user.lastName"])
  }
} )

`,paraId:2,tocIndex:0},{value:"scope",paraId:3,tocIndex:0},{value:"\u53C2\u6570\u7684\u7C7B\u578B\u662F",paraId:3,tocIndex:0},{value:"ComputedScope",paraId:3,tocIndex:0},{value:"\uFF0C\u53EF\u4EE5\u662F",paraId:3,tocIndex:0},{value:"ObserverScopeRef",paraId:3,tocIndex:0},{value:"\u679A\u4E3E\u503C\uFF0C\u4E5F\u53EF\u4EE5\u662F\u5B57\u7B26\u4E32\u6216\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u51FD\u6570\u3002",paraId:3,tocIndex:0},{value:"scope",paraId:3,tocIndex:0},{value:"\u53C2\u6570\u7684\u9ED8\u8BA4\u503C\u662F",paraId:3,tocIndex:0},{value:"ObserverScopeRef.Current",paraId:3,tocIndex:0},{value:"\uFF0C\u5373\u6307\u5411\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:3,tocIndex:0},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B",paraId:4,tocIndex:1},{value:"computed",paraId:4,tocIndex:1},{value:"\u7684\u8BA1\u7B97\u51FD\u6570",paraId:4,tocIndex:1},{value:"Getter",paraId:4,tocIndex:1},{value:"\u53EF\u4EE5\u6307\u5B9A",paraId:4,tocIndex:1},{value:"scope",paraId:4,tocIndex:1},{value:"\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:"\u9ED8\u8BA4\u503C",paraId:5,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:6,tocIndex:1},{value:"scope",paraId:6,tocIndex:1},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002\u5982\u4E0A\u4F8B\u4E2D\uFF0C",paraId:6,tocIndex:1},{value:"scope",paraId:6,tocIndex:1},{value:"\u6307\u5411",paraId:6,tocIndex:1},{value:"fullName",paraId:6,tocIndex:1},{value:"\u6240\u5728\u7684",paraId:6,tocIndex:1},{value:"user",paraId:6,tocIndex:1},{value:"\u5BF9\u8C61\u3002",paraId:6,tocIndex:1},{value:"\u5168\u5C40\u6307\u5B9A",paraId:7,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u521B\u5EFA",paraId:8,tocIndex:1},{value:"Store",paraId:8,tocIndex:1},{value:"\u65F6\uFF0C\u901A\u8FC7",paraId:8,tocIndex:1},{value:"scope",paraId:8,tocIndex:1},{value:"\u53C2\u6570\u6765\u5168\u5C40\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4",paraId:8,tocIndex:1},{value:"scope",paraId:8,tocIndex:1},{value:"\uFF0C\u5982\u4E0B\uFF1A",paraId:8,tocIndex:1},{value:`const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope\u6307\u5411root
      return scope.user.firstName+scope.user.lastName
    })
  }
},{
  scope: ObserverScopeRef.Root  // \u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4scope\u6307\u5411\u72B6\u6001\u6839
} )

`,paraId:9,tocIndex:1},{value:"\u5C40\u90E8\u6307\u5B9A",paraId:10,tocIndex:1},{value:"\u4E5F\u53EF\u4EE5\u5C40\u90E8\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:11,tocIndex:1},{value:"scope",paraId:11,tocIndex:1},{value:"\uFF0C\u5982\u4E0B\uFF1A",paraId:11,tocIndex:1},{value:`const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope\u6307\u5411root
      return scope.user.firstName+scope.user.lastName
    },{
      scope: ObserverScopeRef.Root   // \u4EC5\u6307\u5B9A\u5F53\u524D\u8BA1\u7B97\u5C5E\u6027\u7684scope
    })
  }
} )
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},49497:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(30901);const l=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
const state = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName
    } 
  }
})
`,paraId:2,tocIndex:2},{value:"fullName",paraId:3,tocIndex:2},{value:"\u662F\u4E00\u4E2A\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4F9D\u8D56\u4E8E",paraId:3,tocIndex:2},{value:"firstName",paraId:3,tocIndex:2},{value:"\u548C",paraId:3,tocIndex:2},{value:"lastName",paraId:3,tocIndex:2},{value:"\uFF0C\u5F53",paraId:3,tocIndex:2},{value:"firstName",paraId:3,tocIndex:2},{value:"\u6216",paraId:3,tocIndex:2},{value:"lastName",paraId:3,tocIndex:2},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97",paraId:3,tocIndex:2},{value:"fullName",paraId:3,tocIndex:2},{value:"\u7684\u503C\u3002",paraId:3,tocIndex:2},{value:"fullName",paraId:3,tocIndex:2},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570(\u5373",paraId:3,tocIndex:2},{value:"\u4F5C\u7528\u57DF",paraId:3,tocIndex:2},{value:")\u662F\u7531",paraId:3,tocIndex:2},{value:"createStore",paraId:3,tocIndex:2},{value:"\u65F6\u6307\u5B9A\u7684",paraId:3,tocIndex:2},{value:"scope",paraId:3,tocIndex:2},{value:"\u6307\u5B9A\u7684,\u9ED8\u8BA4\u6307\u5B9A\u7684",paraId:3,tocIndex:2},{value:"ObserverScopeRef.Current",paraId:3,tocIndex:2},{value:"\u3002\u56E0\u6B64\uFF0C",paraId:3,tocIndex:2},{value:"fullName",paraId:3,tocIndex:2},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F",paraId:3,tocIndex:2},{value:"user",paraId:3,tocIndex:2},{value:"\u5BF9\u8C61\u3002",paraId:3,tocIndex:2},{value:"\u5982\u679C\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u662F\u4E00\u4E2A\u666E\u901A\u51FD\u6570\u800C\u4E0D\u662F\u7BAD\u5934\u51FD\u6570\uFF0C\u90A3\u4E48",paraId:3,tocIndex:2},{value:"this",paraId:3,tocIndex:2},{value:"\u6307\u5411\u662F\u6839\u636E\u5F53\u524D\u8BA1\u7B97\u5C5E\u6027\u521B\u5EFA\u7684",paraId:3,tocIndex:2},{value:"computedObject",paraId:3,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u8BE6\u89C1",paraId:3,tocIndex:2},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:4,tocIndex:2},{value:"\u3002",paraId:3,tocIndex:2},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u6536\u96C6\u662F\u81EA\u52A8\u7684\uFF0C\u65E0\u9700\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002",paraId:3,tocIndex:2},{value:"computed",paraId:5},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u6807\u51C6\u65B9\u5F0F\u662F",paraId:6,tocIndex:3},{value:"computed(<getter>,<options>)",paraId:6,tocIndex:3},{value:"\u51FD\u6570\uFF0C\u901A\u8FC7\u4E3A",paraId:6,tocIndex:3},{value:"computed",paraId:6,tocIndex:3},{value:"\u6307\u5B9A",paraId:6,tocIndex:3},{value:"options",paraId:6,tocIndex:3},{value:"\u6765\u8FDB\u884C\u4E00\u4E9B\u66F4\u7075\u6D3B\u7684\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:6,tocIndex:3},{value:`const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:computed<string>((state)=>{
      return state.user.firstName+state.user.lastName
    },{ 
      scope:ObserverScopeRef.Root               // \u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570
    }) 
  }
} 
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},37089:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(20410);const l=[{value:`\u5728\u590D\u6742\u7684\u72B6\u6001\u4E2D\uFF0C\u6709\u65F6\u4F1A\u4E0D\u7ECF\u610F\u95F4\u4F1A\u4EA7\u751F\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u8FD9\u662F\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u4E2D\u7684\u4E00\u4E2A\u5E38\u89C1\u95EE\u9898\u3002
`,paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u76F8\u5E94\u7684",paraId:0,tocIndex:0},{value:"\u5FAA\u73AF\u4F9D\u8D56\u68C0\u6D4B",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"\u8C03\u8BD5\u8DDF\u8E2A\u80FD\u529B",paraId:0,tocIndex:0},{value:"\u529F\u80FD,\u5E2E\u52A9\u5F00\u53D1\u8005\u53D1\u73B0\u548C\u89E3\u51B3\u5FAA\u73AF\u4F9D\u8D56\u95EE\u9898\u3002",paraId:0,tocIndex:0},{value:"\u6784\u5EFA",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u65F6\u5982\u679C\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u4F1A\u629B\u51FA\u5F02\u5E38\uFF0C\u5F00\u53D1\u8005\u53EF\u4EE5\u901A\u8FC7\u5F02\u5E38\u4FE1\u606F\u5FEB\u901F\u5B9A\u4F4D\u95EE\u9898\u3002",paraId:1,tocIndex:1},{value:"\u4EE5\u4E0B\u793A\u4F8B\u4E2D\u5C31\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u6784\u5EFA",paraId:2,tocIndex:1},{value:"store",paraId:2,tocIndex:1},{value:"\u65F6\u4F1A\u629B\u51FA\u5F02\u5E38\u3002",paraId:2,tocIndex:1},{value:`/**
 * title: \u5FAA\u73AF\u4F9D\u8D56
 * description: \u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\u65F6\u4F1A\u629B\u51FA\u5F02\u5E38
 * defaultShowCode: true 
 */
import { useStore } from '@autostorejs/react';
import { Box } from "x-react-components"
import { useState,useRef } from "react"
 
export default ()=>{  
  const [error, setError] = useState(null);
  
  const ref = useRef(false)
  try{
    store = useStore({ 
      a: 1,
      b: (scope:any)=>scope.h + 1,
      c: (scope:any)=>scope.b + 1,
      d: (scope:any)=>scope.c + 1,
      e: (scope:any)=>scope.d + 1,
      f: (scope:any)=>scope.e + 1,
      g: (scope:any)=>scope.f + 1,
      h: (scope:any)=>scope.g + 1,
    });
  }catch(e){
      if(!ref.current){
        setError(e.message)
        ref.current=true
      }
  }
  return <div style={{color:'red'}}>{error}</div>
}

`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u5FAA\u73AF\u4F9D\u8D56\u5C31\u6BD4\u8F83\u9EBB\u70E6\uFF0C\u65E0\u6CD5\u50CF\u540C\u6B65\u5FAA\u73AF\u4E00\u6837\u6784\u5EFA\u65F6\u81EA\u52A8\u68C0\u6D4B\u3002\u56E0\u4E3A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u51FD\u6570\u662F\u5F02\u6B65\u7684\uFF0C\u5F88\u5BB9\u6613\u5728\u591A\u4E2A\u5F02\u6B65\u8BA1\u7B97\u65F6\u5F62\u6210\u5F88\u590D\u6742\u7684\u5FAA\u73AF\u8C03\u7528\u94FE\u3002",paraId:4,tocIndex:2},{value:"AutoStore",paraId:5,tocIndex:2},{value:"\u63D0\u4F9B\u4E86",paraId:5,tocIndex:2},{value:"cycleDetect",paraId:5,tocIndex:2},{value:`\u6269\u5C55\uFF0C\u7528\u6765\u5E2E\u52A9\u68C0\u6D4B\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u5FAA\u73AF\u4F9D\u8D56\u3002\u4F46\u662F\u7531\u4E8E\u8FDB\u884C\u5FAA\u73AF\u4F9D\u8D56\u68C0\u6D4B\u9700\u8981\u4E00\u5B9A\u7684\u6210\u672C\u5F00\u6D88\uFF0C
\u6240\u4EE5\u8BE5\u529F\u80FD\u662F\u4F5C\u4E3A\u4E00\u4E2A\u6269\u5C55\uFF0C\u9700\u8981\u624B\u52A8\u5B89\u88C5\u3002`,paraId:5,tocIndex:2},{value:` import { installCycleDetectExtend }  from '@autostorejs/devtools'
 
installCycleDetectExtend({
  onDetected:(paths)=>{
    console.error("\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56:",paths)
    return 'disable'
  }  
})

`,paraId:6,tocIndex:3},{value:"\u5728\u63A7\u5236\u53F0\u53EF\u4EE5\u53D1\u73B0",paraId:7},{value:"\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56: a->b->a.loading->a.timeout->a.retry->a.error->a.value->a.progress->b.loading->b.timeout->b.retry->b.error->b.value->b.progress->x",paraId:7},{value:"\u7684\u4FE1\u606F\uFF0C\u8FD9\u662F\u5FAA\u73AF\u4F9D\u8D56\u7684\u8DEF\u5F84\u3002",paraId:7},{value:"onDetected",paraId:7},{value:"\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE",paraId:7},{value:"disable",paraId:7},{value:"\u4EE3\u8868\u5F53\u68C0\u6D4B\u5230\u5FAA\u73AF\u4F9D\u8D56\u540E\uFF0C\u4F1A\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u907F\u514D\u5FAA\u73AF\u4F9D\u8D56\u5BFC\u81F4\u7684\u95EE\u9898\u3002",paraId:7},{value:"\u5F02\u6B65\u5FAA\u73AF\u4F9D\u8D56\u68C0\u6D4B\u6BD4\u8F83\u590D\u6742\uFF0C\u7279\u522B\u662F\u5728\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u4E2D\uFF0C\u5F88\u5BB9\u6613\u5F62\u6210\u5F88\u590D\u6742\u7684\u5FAA\u73AF\u8C03\u7528\u94FE\u3002",paraId:8,tocIndex:6},{value:"\u5FAA\u73AF\u4F9D\u8D56\u68C0\u6D4B\u7684\u57FA\u672C\u539F\u7406\u5982\u4E0B\uFF1A",paraId:9,tocIndex:6},{value:"\u5B89\u88C5",paraId:10,tocIndex:6},{value:"cycleDetect",paraId:10,tocIndex:6},{value:"\u6269\u5C55\u540E\uFF0C\u4F1A\u5BF9\u6BCF\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:10,tocIndex:6},{value:"run",paraId:10,tocIndex:6},{value:"\u51FD\u6570\u8FDB\u884C\u5305\u88C5\u3002",paraId:10,tocIndex:6},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7B2C\u4E00\u6B21\u8FD0\u884C\u65F6\uFF0C\u6267\u884C",paraId:10,tocIndex:6},{value:"store.wath",paraId:10,tocIndex:6},{value:"\u8BB0\u5F55\u4FA6\u542C\u6240\u6709\u7684",paraId:10,tocIndex:6},{value:"get",paraId:10,tocIndex:6},{value:"\u8BFB\u64CD\u4F5C\u4E8B\u4EF6\u3002\u5982\u679C\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u5C31\u4F1A\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:10,tocIndex:6},{value:"run",paraId:10,tocIndex:6},{value:"\u51FD\u6570\uFF0C\u4ECE\u800C\u53EF\u4EE5\u6536\u96C6\u5230\u5927\u91CF\u7684",paraId:10,tocIndex:6},{value:"get",paraId:10,tocIndex:6},{value:"\u4E8B\u4EF6\u3002",paraId:10,tocIndex:6},{value:"\u5F53\u4FA6\u542C\u5230\u6307\u5B9A",paraId:10,tocIndex:6},{value:"maxOperates",paraId:10,tocIndex:6},{value:"\u6570\u91CF\u7684",paraId:10,tocIndex:6},{value:"get",paraId:10,tocIndex:6},{value:"\u4E8B\u4EF6\u540E,\u8FDB\u884C\u5206\u6790\uFF0C\u627E\u51FA\u4E8B\u4EF6\u5217\u8868\u4E2D\u7684\u5FAA\u73AF\u4F9D\u8D56\u8DEF\u5F84\u5373\u53EF\u3002",paraId:10,tocIndex:6},{value:"\u7136\u540E\u6267\u884C",paraId:10,tocIndex:6},{value:"onDetected",paraId:10,tocIndex:6},{value:`\u56DE\u8C03\u51FD\u6570\uFF0C\u7531\u5F00\u53D1\u8005\u51B3\u5B9A\u5982\u4F55\u5904\u7406\uFF1A
`,paraId:10,tocIndex:6},{value:"return 'disable'",paraId:11,tocIndex:6},{value:"\uFF1A \u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:11,tocIndex:6},{value:"return 'ignore'",paraId:11,tocIndex:6},{value:":  \u4EE3\u8868\u5FFD\u7565",paraId:11,tocIndex:6},{value:"\u5176\u4ED6\u4F1A\u89E6\u53D1\u9519\u8BEF",paraId:11,tocIndex:6},{value:"installCycleDetectExtend",paraId:12,tocIndex:7},{value:"\u5177\u6709\u4EE5\u4E0B\u914D\u7F6E\u53C2\u6570\uFF1A",paraId:12,tocIndex:7},{value:"\u53C2\u6570",paraId:13,tocIndex:7},{value:"\u7C7B\u578B",paraId:13,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:13,tocIndex:7},{value:"\u8BF4\u660E",paraId:13,tocIndex:7},{value:"maxOperates",paraId:13,tocIndex:7},{value:"number",paraId:13,tocIndex:7},{value:"200",paraId:13,tocIndex:7},{value:"\u6700\u5927\u64CD\u4F5C\u6570\uFF0C\u4ECE\u5F00\u59CB\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u540E\uFF0C\u5F53\u6536\u96C6\u5230\u6B64\u6570\u91CF\u7684\u64CD\u4F5C\u4E8B\u4EF6\u540E\u5F00\u5982\u5206\u6790\u3002",paraId:13,tocIndex:7},{value:"onDetected",paraId:13,tocIndex:7},{value:"(paths:string)=>'disable' | 'ignore' | void",paraId:13,tocIndex:7},{value:"-",paraId:13,tocIndex:7},{value:"\u5F53\u68C0\u6D4B\u5230\u5FAA\u73AF\u4F9D\u8D56\u65F6\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"disable",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"ignore",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u5FFD\u7565,\u5176\u4ED6\u89E6\u53D1\u9519\u8BEF\u3002",paraId:13,tocIndex:7}]},67745:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(44465);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u9996\u5148\u9700\u8981\u5B89\u88C5",paraId:1,tocIndex:2},{value:"@autostorejs/devtools",paraId:1,tocIndex:2},{value:"\u548C",paraId:1,tocIndex:2},{value:"Redux DevTools Extension",paraId:1,tocIndex:2},{value:"\u3002",paraId:1,tocIndex:2},{value:`npm install  @autostorejs/devtools
`,paraId:2},{value:`yarn add @autostorejs/devtools
`,paraId:3},{value:`pnpm add @autostorejs/devtools
`,paraId:4},{value:"\u5728\u4F60\u7684\u9879\u76EE\u7684\u6700\u5F00\u59CB\u5904\u5BFC\u5165",paraId:5,tocIndex:3},{value:"@autostorejs/devtools",paraId:5,tocIndex:3},{value:"\u3002",paraId:5,tocIndex:3},{value:`//main.ts | app.ts | index.ts

import \`@autostorejs/devtools\`

`,paraId:6,tocIndex:3},{value:"\u7136\u540E\u5728\u521B\u5EFA",paraId:7,tocIndex:3},{value:"AutoStore",paraId:7,tocIndex:3},{value:"\u65F6,\u6307\u5B9A",paraId:7,tocIndex:3},{value:"debug=true",paraId:7,tocIndex:3},{value:"\u542F\u7528",paraId:8},{value:"debug=true",paraId:8},{value:"\u540E\uFF0C",paraId:8},{value:"AutoStore",paraId:8},{value:"\u4F1A\u81EA\u52A8\u8FDE\u63A5\u5230",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u3002",paraId:8},{value:"\u6BCF\u4E2A",paraId:8},{value:"Store",paraId:8},{value:"\u5747\u5177\u6709\u4E00\u4E2A",paraId:8},{value:"id",paraId:8},{value:"\uFF0C\u5982\u679C\u6CA1\u6709\u4F20\u5165\u5219\u4F1A\u968F\u673A\u751F\u6210\u3002\u5728\u4F7F\u7528",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A",paraId:8},{value:"store",paraId:8},{value:"\u53D6\u4E2A\u6709\u610F\u4E49\u7684\u540D\u79F0\u3002",paraId:8},{value:"\u73B0\u5728\uFF0C\u4F60\u53EF\u4EE5\u6253\u5F00",paraId:9,tocIndex:4},{value:"Redux DevTools Extension",paraId:9,tocIndex:4},{value:"\u67E5\u770B",paraId:9,tocIndex:4},{value:"AutoStore",paraId:9,tocIndex:4},{value:"\u7684\u72B6\u6001\u4E86\u3002",paraId:9,tocIndex:4},{value:"\u5355\u51FB\u4EE5\u4E0A\u793A\u4F8B\u4E2D\u7684",paraId:10},{value:"Age++",paraId:10},{value:"\u548C",paraId:10},{value:"Change lastName",paraId:10},{value:"\u6309\u94AE\uFF0C\u7136\u540E\u67E5\u770B",paraId:10},{value:"Redux DevTools Extension",paraId:10},{value:"\u4E2D\u7684\u72B6\u6001\u53D8\u5316\u3002",paraId:10},{value:"\u5728\u63A7\u5236\u53F0\u4F60\u8FD8\u53EF\u4EE5\u770B\u5230\u66F4\u591A\u7684\u8C03\u8BD5\u4FE1\u606F\u3002",paraId:10}]},23417:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(67040);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u65E5\u5FD7\u529F\u80FD\uFF0C\u7528\u4E8E\u8BB0\u5F55",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u4E0E\u8BCA\u65AD\u3002",paraId:0,tocIndex:0},{value:"\u5F53\u521B\u5EFA",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u65F6\u8BBE\u7F6E",paraId:1,tocIndex:1},{value:"debug",paraId:1,tocIndex:1},{value:"\u4E3A",paraId:1,tocIndex:1},{value:"true",paraId:1,tocIndex:1},{value:"\u65F6\uFF0C",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u4F1A\u8BB0\u5F55\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6,\u6253\u5370\u5728\u63A7\u5236\u53F0\u4E2D\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`import { createStore } from "@autostorejs/react"

const store = createStore({
  //....
},{
  id:"user",
  debug:true   // \u5F00\u542F\u8C03\u8BD5\u6A21\u5F0F  
})
`,paraId:2,tocIndex:1},{value:"\u63A7\u5236\u53F0\u8F93\u51FA\u6837\u5F0F\u5982\u4E0B:",paraId:3,tocIndex:1},{value:"\u5F53\u5E94\u7528\u5177\u6709\u591A\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A\u6BCF\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u8BBE\u7F6E\u4E0D\u540C\u7684",paraId:4},{value:"id",paraId:4},{value:"\uFF0C\u4EE5\u4FBF\u533A\u5206\u4E0D\u540C\u7684",paraId:4},{value:"AutoStore",paraId:4},{value:"\u3002",paraId:4},{value:"\u5982\u679C\u5BF9\u9ED8\u8BA4\u7684\u65E5\u5FD7\u8F93\u51FA\u4E0D\u6EE1\u610F\u6216\u8005\u60F3\u5C06",paraId:5,tocIndex:2},{value:"AutoStore",paraId:5,tocIndex:2},{value:"\u7684\u65E5\u5FD7\u4FE1\u606F\u8F6C\u53D1\u81F3\u60A8\u81EA\u5DF1\u7684\u65E5\u5FD7\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E",paraId:5,tocIndex:2},{value:"options.log",paraId:5,tocIndex:2},{value:"\u51FD\u6570\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA\u3002",paraId:5,tocIndex:2},{value:"options.log",paraId:6},{value:"\u7684\u7C7B\u578B\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:6},{value:`type LogMessageArgs = string | Error | (()=>string)
type LogLevel = 'log' | 'error' | 'warn'
function log(this:AutoStore<any>,message: LogMessageArgs,level:LogLevel='log'){
`,paraId:7}]},24972:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(67039);const l=[{value:"\u7531\u4E8E\u72B6\u6001\u4E4B\u95F4\u53EF\u80FD\u5B58\u5728\u590D\u6742\u7684\u4F9D\u8D56\u8BA1\u7B97\u5173\u7CFB\uFF0C\u4E3A\u4E86\u66F4\u597D\u7684\u8C03\u8BD5\u72B6\u6001\u7684\u53D8\u5316\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"trace",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u5E2E\u52A9\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u64CD\u4F5C\u3002",paraId:0,tocIndex:0},{value:"trace",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type StateTracker= {
    stop:()=>void,
    start(isStop?:(operate:StateOperate)=>boolean):Promise<StateOperate[]>
}
function trace(fn: ()=>any,operates?:WatchListenerOptions['operates']):StateTracker 
`,paraId:2,tocIndex:0},{value:`import { createStore } from "@autostorejs/react"

const { state, trace } = createStore({
  a:1,
  b:2,
  c:(scope)=>scope.a+scope.b
})

// \u521B\u5EFA\u8DDF\u8E2A\u5668
tracker = trace(()=>{
  state.a = 1
  state.b = 2
})     
// \u5F00\u59CB\u8DDF\u8E2A\uFF0C\u7ED3\u675F\u540E\u8FD4\u56DE\u64CD\u4F5C\u5217\u8868
const operates = await tracker.start()    

`,paraId:3,tocIndex:1},{value:"\u5B9E\u9645\u8FD0\u884C\u6548\u679C\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:"\u5982\u679C\u8981\u8DDF\u8E2A\u7684\u662F\u5F02\u6B65\u51FD\u6570\uFF0C\u5219\u4F1A\u590D\u6742\u4E00\u4E9B\uFF0C\u5982\u4E0B\u4F8B\uFF1A",paraId:5,tocIndex:2},{value:"\u770B\u8D77\u6765\u597D\u50CF\u6CA1\u4EC0\u4E48\u95EE\u9898\uFF0C\u4F46\u662F\u5B9E\u9645\u60C5\u51B5\u4F1A\u6BD4\u8F83\u590D\u6742,\u518D\u770B\u4EE5\u4E0B\u793A\u4F8B\uFF1A",paraId:6},{value:"\u4ECE\u4E0A\u4F8B\u4E2D\u6211\u4EEC\u53EF\u4EE5\u770B\u5230",paraId:7},{value:"\u64CD\u4F5C\u65E5\u5FD7\u4E2D\u6CA1\u6709\u770B\u5230\u5BF9",paraId:7},{value:"d",paraId:7},{value:"\u7684\u64CD\u4F5C",paraId:7},{value:"\u3002",paraId:7},{value:"\u8FD9\u662F\u56E0\u4E3A",paraId:8},{value:"d",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:8},{value:"d",paraId:8},{value:"\u7684\u8BA1\u7B97\u662F\u5728",paraId:8},{value:"c",paraId:8},{value:`\u7684\u8BA1\u7B97\u5B8C\u6210\u540E\u624D\u4F1A\u5F00\u59CB\u7684\uFF0C
\u5BF9`,paraId:8},{value:"d",paraId:8},{value:"\u7684\u8BA1\u7B97\u662F\u5728\u8DDF\u8E2A\u51FD\u6570\u7684\u6267\u884C\u540E\u7684\u4E0B\u4E00\u6B21\u5F02\u6B65\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\u8FDB\u884C\u7684\uFF0C\u800C\u6B64\u65F6\u8DDF\u8E2A\u51FD\u6570\u5DF2\u7ECF\u6267\u884C\u5B8C\u6BD5\u4E86\uFF0C\u6240\u4EE5\u5C31\u65E0\u6CD5\u8DDF\u8E2A\u5230\u5BF9",paraId:8},{value:"d",paraId:8},{value:"\u7684\u64CD\u4F5C\u3002",paraId:8},{value:"\u663E\u7136\uFF0C\u6211\u4EEC\u9884\u671F\u662F\u5728",paraId:9},{value:"state.b = 20",paraId:9},{value:"\u4E4B\u540E\uFF0C\u80FD\u8DDF\u8E2A\u5230\u5176\u6D3E\u751F\u7684\u4E00\u7CFB\u5217\u64CD\u4F5C\u65E5\u5FD7\u7684\u3002",paraId:9},{value:"\u56E0\u6B64\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u9700\u8981\u4E3A",paraId:10},{value:"start()",paraId:10},{value:"\u63D0\u4F9B\u4E00\u4E2A\u9884\u671F\u7684\u7ED3\u675F\u51FD\u6570\uFF0C\u6765\u5224\u65AD\u662F\u5426\u505C\u6B62\u8DDF\u8E2A\uFF0C\u5982\u4E0B\uFF1A",paraId:10},{value:"\u5982\u679C\u56E0\u4E3A\u67D0\u4E9B\u539F\u56E0\uFF0C\u6211\u4EEC\u65E0\u6CD5\u63A5\u6536",paraId:11},{value:"set d.value",paraId:11},{value:"\u7684\u64CD\u4F5C\uFF0C\u53EF\u4EE5\u8C03\u7528",paraId:11},{value:"tracker.stop()",paraId:11},{value:"\u65B9\u6CD5\u6765\u505C\u6B62\u8DDF\u8E2A\u3002",paraId:11},{value:"trace",paraId:12},{value:"\u65B9\u6CD5\u4EC5\u5728\u5F00\u53D1\u65F6\u8FDB\u884C\u8C03\u5EA6\u4F7F\u7528\u3002",paraId:12}]},9548:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(16142);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useBindings",paraId:2,tocIndex:0}]},75922:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(69580);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},4824:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(32026);const l=[{value:"\u5982\u679C\u8981\u5BF9\u6DF1\u5C42\u5D4C\u5957\u7684\u5BF9\u8C61\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useBindings",paraId:0,tocIndex:0},{value:".",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1}]},69167:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(25061);const l=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useField",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useField(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useField",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
  const { state, $, bind,useField } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }  
  })

  const bindUser = useField()

  return <div>    
    <Input label="First Name" {...bindUser.user.firstName}/>      // \u274C \u4E0D\u652F\u6301
    <Input label="last Name" {...bindUser.user.lastName} />       // \u274C \u4E0D\u652F\u6301
    <Input label="Age" {...bindUser.user.age}/>                   // \u274C \u4E0D\u652F\u6301
    <Input type="checkbox" label="VIP" {...bindUser.user.vip} />  // \u274C \u4E0D\u652F\u6301
  </div>
}
`,paraId:6}]},11472:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(70803);const l=[{value:"useFrom",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u5B8C\u6574\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u4F7F\u5F97\u6536\u96C6\u6570\u636E\u53D8\u5F97\u66F4\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"useFrom",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type UseFormResult={
    ref: React.RefObject<HTMLFormElement>  
}
type UseFormOptions={
    debounce?:number            // \u542F\u7528\u9632\u6296
    validate?:(path:string,value:any,input:HTMLElement)=>boolean | {result:boolean,message?:string,style?:string}  
}

interface UseFormType {
    (options?:UseFormOptions): UseFormResult
    (entry?: string | string[],options?:UseFormOptions): UseFormResult
}

`,paraId:2,tocIndex:0},{value:"useForm",paraId:3,tocIndex:1},{value:"\u7684\u5DE5\u4F5C\u539F\u7406\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"Form",paraId:4},{value:"useForm",paraId:5,tocIndex:2},{value:"\u8FD4\u56DE\u4E00\u4E2A",paraId:5,tocIndex:2},{value:"Form",paraId:5,tocIndex:2},{value:"\u7EC4\u4EF6\uFF0C\u8BE5\u7EC4\u4EF6\u662F\u5BF9\u6807\u51C6",paraId:5,tocIndex:2},{value:"form",paraId:5,tocIndex:2},{value:"\u7684\u5C01\u88C5\u3002",paraId:5,tocIndex:2},{value:"useForm",paraId:6,tocIndex:3},{value:"\u5185\u90E8\u7684",paraId:6,tocIndex:3},{value:"useEffect",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u521D\u59CB\u5316\u8868\u5355.",paraId:6,tocIndex:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\uFF0C\u8C03\u7528",paraId:7,tocIndex:3},{value:"querySelectorAll('input,textarea,select')",paraId:7,tocIndex:3},{value:"\u83B7\u53D6\u5230\u6240\u6709\u8868\u5355\u5185\u90E8\u7684",paraId:7,tocIndex:3},{value:"input",paraId:7,tocIndex:3},{value:",",paraId:7,tocIndex:3},{value:"textarea",paraId:7,tocIndex:3},{value:",",paraId:7,tocIndex:3},{value:"select",paraId:7,tocIndex:3},{value:`\u5143\u7D20
,\u4F9D\u6B21\u904D\u5386\u8FD9\u4E9B\u5143\u7D20\uFF0C\u6839\u636E`,paraId:7,tocIndex:3},{value:"name",paraId:7,tocIndex:3},{value:"\u5C5E\u6027\uFF0C\u4ECE",paraId:7,tocIndex:3},{value:"state",paraId:7,tocIndex:3},{value:"\u4E2D\u83B7\u53D6\u5BF9\u5E94\u7684\u503C\uFF0C\u5E76\u8BBE\u7F6E\u5230\u8868\u5355\u5143\u7D20\u4E0A,\u5B8C\u6210\u8868\u5355\u5B57\u6BB5\u7684\u521D\u59CB\u5316\u3002",paraId:7,tocIndex:3},{value:"\u8981\u5B9E\u73B0\u53CC\u5411\u7ED1\u5B9A\uFF0C\u6211\u4EEC\u9700\u8981\uFF1A",paraId:8,tocIndex:4},{value:"\u76D1\u542C\u8868\u5355\u5143\u7D20\u7684",paraId:9,tocIndex:4},{value:"change",paraId:9,tocIndex:4},{value:"\u4E8B\u4EF6",paraId:9,tocIndex:4},{value:"\u7531\u4E8E\u8868\u5355\u4E8B\u4EF6",paraId:10,tocIndex:4},{value:"onchange",paraId:10,tocIndex:4},{value:"\u4F1A\u5192\u6CE1\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EA\u9700\u8981\u5728",paraId:10,tocIndex:4},{value:"form",paraId:10,tocIndex:4},{value:"\u5143\u7D20\u4E0A\u76D1\u542C",paraId:10,tocIndex:4},{value:"change",paraId:10,tocIndex:4},{value:"\u4E8B\u4EF6\u5373\u53EF\u3002",paraId:10,tocIndex:4},{value:"\u6240\u4EE5\u901A\u8FC7",paraId:11,tocIndex:4},{value:"form.addEventListener('input',onChange)",paraId:11,tocIndex:4},{value:"\u5C31\u53EF\u4EE5\u5728\u8868\u5355\u5143\u7D20\u53D8\u5316\u65F6\u89E6\u53D1\u6355\u83B7\u5230",paraId:11,tocIndex:4},{value:"onChange",paraId:11,tocIndex:4},{value:"\u4E8B\u4EF6\u3002",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:12,tocIndex:4},{value:"onChange",paraId:12,tocIndex:4},{value:"\u4E8B\u4EF6\u4E2D\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:12,tocIndex:4},{value:"event.target",paraId:12,tocIndex:4},{value:"\u83B7\u53D6\u5230\u8868\u5355\u5143\u7D20.",paraId:12,tocIndex:4},{value:"\u6700\u540E\u5C06\u8868\u5355\u5143\u7D20\u7684\u503C\u66F4\u65B0\u5230",paraId:13,tocIndex:4},{value:"state[event.target.name]",paraId:13,tocIndex:4},{value:"\u3002",paraId:13,tocIndex:4},{value:"\u76D1\u542C",paraId:14,tocIndex:4},{value:"state",paraId:14,tocIndex:4},{value:"\u7684\u53D8\u5316",paraId:14,tocIndex:4},{value:"\u4F7F\u7528",paraId:15,tocIndex:4},{value:"store.watch",paraId:15,tocIndex:4},{value:"\u76D1\u542C",paraId:15,tocIndex:4},{value:"state",paraId:15,tocIndex:4},{value:"\u7684\u53D8\u5316\uFF0C\u5F53",paraId:15,tocIndex:4},{value:"state",paraId:15,tocIndex:4},{value:"\u53D8\u5316\u65F6\uFF0C\u5C06\u6570\u636E\u66F4\u65B0\u5230",paraId:15,tocIndex:4},{value:"name=<path>",paraId:15,tocIndex:4},{value:"\u7684\u8868\u5355\u5143\u7D20\u4E0A\u5373\u53EF\u3002",paraId:15,tocIndex:4},{value:"useForm",paraId:16,tocIndex:5},{value:"\u8FD4\u56DE\u4E00\u4E2A",paraId:16,tocIndex:5},{value:"Form",paraId:16,tocIndex:5},{value:"\u7EC4\u4EF6\uFF0C\u8BE5\u7EC4\u4EF6\u662F\u5BF9\u6807\u51C6",paraId:16,tocIndex:5},{value:"form",paraId:16,tocIndex:5},{value:"\u5143\u7D20\u7684\u5C01\u88C5\u3002",paraId:16,tocIndex:5},{value:`const { state, useForm } = useStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }  
})

const { Form } = useForm()
<Form>
  <input name="user.firstName" />
  <input name="user.lastName" />
  <input name="user.age" />
  <input name="user.vip" />
</Form>
`,paraId:17,tocIndex:5},{value:"\u5C31\u8FD9\u4E48\u7B80\u5355\uFF0C\u8F7B\u677E\u5B9E\u73B0",paraId:18,tocIndex:5},{value:"\u8868\u5355",paraId:18,tocIndex:5},{value:"\u4E0E",paraId:18,tocIndex:5},{value:"store.state",paraId:18,tocIndex:5},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u4E86\u3002",paraId:18,tocIndex:5},{value:"\u914D\u7F6E",paraId:19},{value:"input",paraId:19},{value:"\u5143\u7D20\u7684",paraId:19},{value:"name=<\u72B6\u6001\u6570\u636E\u8DEF\u5F84>",paraId:19},{value:"\u5373\u53EF\u3002",paraId:19},{value:"\u4EE5\u4E0B\u662F\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:20},{value:"\u53EF\u4EE5\u7ED1\u5B9A\u8868\u5355\u65F6\u6307\u5B9A",paraId:21,tocIndex:6},{value:"validate",paraId:21,tocIndex:6},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u5BF9\u8F93\u5165\u8FDB\u884C\u6821\u9A8C\uFF0C\u5E76\u5728\u51FA\u9519\u65F6\u5E94\u7528\u6837\u5F0F\u3002",paraId:21,tocIndex:6},{value:"validate",paraId:22,tocIndex:6},{value:"\u51FD\u6570\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:22,tocIndex:6},{value:`{
  validate?:(path:string,value:any,input:HTMLElement)=>boolean | {
      value:boolean,      // \u662F\u5426\u6709\u6548
      message?:string,       // \u51FA\u9519\u63D0\u793A\u4FE1\u606F
      // \u4F5C\u7528\u4E8E\u8F93\u5165\u63A7\u4EF6\u7684\u6837\u5F0F
      style?:string | ((path:string,value:any,input:HTMLElement)=>string) 
  } 
}
`,paraId:23,tocIndex:6},{value:"\u53C2\u6570",paraId:24,tocIndex:6},{value:"\u8BF4\u660E",paraId:24,tocIndex:6},{value:"path",paraId:24,tocIndex:6},{value:"\u8868\u5355\u5143\u7D20\u7684",paraId:24,tocIndex:6},{value:"name",paraId:24,tocIndex:6},{value:"\u5C5E\u6027\uFF0C\u5373\u72B6\u6001\u8DEF\u5F84",paraId:24,tocIndex:6},{value:"value",paraId:24,tocIndex:6},{value:"\u8868\u5355\u5143\u7D20\u7684\u503C",paraId:24,tocIndex:6},{value:"input",paraId:24,tocIndex:6},{value:"\u8868\u5355\u5143\u7D20\u672C\u8EAB",paraId:24,tocIndex:6},{value:"\u5728",paraId:25,tocIndex:7},{value:"validate",paraId:25,tocIndex:7},{value:"\u51FD\u6570\u4E2D\u8FD4\u56DE",paraId:25,tocIndex:7},{value:"false",paraId:25,tocIndex:7},{value:"\u8868\u793A\u6821\u9A8C\u5931\u8D25\uFF0C\u8FD4\u56DE",paraId:25,tocIndex:7},{value:"true",paraId:25,tocIndex:7},{value:"\u8868\u793A\u6821\u9A8C\u6210\u529F\u3002",paraId:25,tocIndex:7},{value:`
\u5F53\u6821\u9A8C\u5931\u8D25\u65F6\uFF0C\u4F1A\u81EA\u52A8\u5728`,paraId:25,tocIndex:7},{value:"input",paraId:25,tocIndex:7},{value:"\u5143\u7D20\u7684\u6837\u5F0F\u8BBE\u7F6E\u4E3A:",paraId:25,tocIndex:7},{value:"\u6DFB\u52A0\u4E00\u4E2A",paraId:26,tocIndex:7},{value:"invalid",paraId:26,tocIndex:7},{value:"\u7684\u7C7B\u540D,\u60A8\u53EF\u4EE5\u81EA\u884C\u63A7\u5236\u6837\u5F0F.",paraId:26,tocIndex:7},{value:"\u6DFB\u52A0",paraId:26,tocIndex:7},{value:"{borderColor:'red',color:'red'}",paraId:26,tocIndex:7},{value:"\u7684\u5185\u8054\u6837\u5F0F",paraId:26,tocIndex:7},{value:"\u5982\u679C\u9ED8\u8BA4\u7684\u6821\u9A8C\u884C\u4E3A\u548C\u6837\u5F0F\u4E0D\u6EE1\u8DB3\u8981\u6C42\uFF0C\u53EF\u4EE5\u5728",paraId:27,tocIndex:9},{value:"validate",paraId:27,tocIndex:9},{value:"\u51FD\u6570\u4E2D\u8FD4\u56DE",paraId:27,tocIndex:9},{value:"{value,message,style}",paraId:27,tocIndex:9},{value:"\u8FDB\u884C\u66F4\u591A\u7684\u6821\u9A8C\u63A7\u5236.",paraId:27,tocIndex:9},{value:"\u53C2\u6570",paraId:28,tocIndex:9},{value:"\u8BF4\u660E",paraId:28,tocIndex:9},{value:"value",paraId:28,tocIndex:9},{value:"\u6821\u9A8C\u7ED3\u679C\uFF0C",paraId:28,tocIndex:9},{value:"true",paraId:28,tocIndex:9},{value:"\u8868\u793A\u6821\u9A8C\u6210\u529F\uFF0C",paraId:28,tocIndex:9},{value:"false",paraId:28,tocIndex:9},{value:"\u8868\u793A\u6821\u9A8C\u5931\u8D25",paraId:28,tocIndex:9},{value:"message",paraId:28,tocIndex:9},{value:"\u6821\u9A8C\u5931\u8D25\u65F6\u7684\u63D0\u793A\u4FE1\u606F",paraId:28,tocIndex:9},{value:"style",paraId:28,tocIndex:9},{value:"\u6821\u9A8C\u5931\u8D25\u65F6\u7684\u6837\u5F0F\uFF0C\u5B57\u7B26\u4E32\u6216\u51FD\u6570",paraId:28,tocIndex:9},{value:"(path:string,value:any,input:HTMLElement)=>string",paraId:28,tocIndex:9},{value:"\u53EF\u4EE5\u8FD4\u56DE",paraId:29,tocIndex:9},{value:"message",paraId:29,tocIndex:9},{value:"\u6765\u63A7\u5236\u6821\u9A8C\u5931\u8D25\u65F6\u7684\u63D0\u793A\u4FE1\u606F\u3002\u95EE\u9898\u662F\uFF0C\u5C06",paraId:29,tocIndex:9},{value:"\u9519\u8BEF\u63D0\u793A\u4FE1\u606F\u663E\u793A\u5728\u54EA\u91CC\u5462",paraId:29,tocIndex:9},{value:"\uFF1F",paraId:29,tocIndex:9},{value:"\u663E\u7136\uFF0C\u5728\u4E0D\u540C\u5E94\u7528\u573A\u666F\u4E2D\uFF0C\u63D0\u793A\u4FE1\u606F\u7684\u663E\u793A\u4F4D\u7F6E\u662F\u4E0D\u540C\u7684\uFF0C\u8FD9\u5B8C\u5168\u662F\u7531\u5E94\u7528\u51B3\u5B9A\u7684\u3002",paraId:30,tocIndex:9},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u9519\u8BEF\u63D0\u793A\u4FE1\u606F\u663E\u793A\u5728",paraId:31,tocIndex:9},{value:"input",paraId:31,tocIndex:9},{value:"\u5143\u7D20\u7684\u4E0B\u4E00\u4E2A\u5144\u5F1F\u8282\u70B9\u5143\u7D20\u4E2D\u3002",paraId:31,tocIndex:9},{value:"\u6240\u4EE5",paraId:32,tocIndex:9},{value:"useForm",paraId:32,tocIndex:9},{value:"\u5E76\u6CA1\u6709\u63D0\u4F9B\u9ED8\u8BA4\u7684\u63D0\u793A\u4FE1\u606F\u663E\u793A\u4F4D\u7F6E\u3002",paraId:32,tocIndex:9},{value:`/**
 * title: \u8868\u5355\u8F93\u5165\u6821\u9A8C
 * description: \u8F93\u5165\u65E0\u6548\u7684\u6570\u636E\u770B\u770B\u4F1A\u53D1\u751F\u4EC0\u4E48
 */
import { useStore } from '@autostorejs/react';
import { Star,TextArea,Layout,ColorBlock,Button,Input,Box,CheckBox,JsonView,Select } from "x-react-components"
 
export default ()=>{

  const { state, $, useForm,useState } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:'18n',
      vip:false,
      job:1,
      stars:3,
      resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"
    }
  })

  const [ user ] = useState()

  const userform = useForm({
    validate:(name,value)=>{
      if(name=="user.firstName"){
        return value.length>3
      }else if(name=="user.lastName"){
        return value.length>3
      }else if(name=="user.age"){
        return !isNaN(parseFloat(value)) && isFinite(value) && parseInt(value)>0
      }
    },
  })

  return <Layout>
      <div>    
     
        <form {...userform}>
          <Input name="user.firstName" label="First Name" 
                data-validate-message = "\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"/>
          <Input name="user.lastName" label="lastName" 
                data-validate-message = "\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"/>
          <Input name="user.age" label="Age"  
                data-validate-message ="Age\u5FC5\u987B\u662F\u5927\u4E8E0\u7684\u6570\u5B57"/>
          <Select name="job" label="Job" items={[
              { title:"Engineer", value:1 },
              { title:"Doctor", value:2 },
              { title:"Teacher", value:3 }
          ]}/>
          <TextArea name="user.resume" label="Resume"/>
          <CheckBox name="user.vip" label="VIP"/>
          <Star name="stars"/>
        </form>
        <Button onClick={()=>{
          store.batchUpdate(()=>{
            state.user.firstName= "Zhang"
            state.user.lastName = "Fisher"
            state.user.age = 18
            state.user.vip = false
          })
          {/* state.user.firstName= "Zhang"
          state.user.lastName = "Fisher"
          state.user.age = 18
          state.user.vip = false */}
        }}>Reset</Button>
      </div>
      <div>    
        <JsonView data={user} />
      </div>    
    </Layout>
}

`,paraId:33,tocIndex:9},{value:"Reset",paraId:4}]},57359:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(80916);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u6B3E\u73B0\u4EE3\u5316\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u5E93\uFF0C\u63D0\u4F9B\u4E86\u5F3A\u5927\u7684\u72B6\u6001\u7BA1\u7406\u80FD\u529B\uFF0C\u652F\u6301",paraId:0,tocIndex:0},{value:"\u54CD\u5E94\u5F0F",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8868\u5355\u53CC\u5411\u7ED1\u5B9A",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:0,tocIndex:0},{value:"\u7B49\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:"\u4E3B\u8981\u7279\u6027\uFF1A",paraId:1,tocIndex:0},{value:"\u54CD\u5E94\u5F0F\u6838\u5FC3",paraId:2,tocIndex:0},{value:"\uFF1A\u57FA\u4E8E",paraId:2,tocIndex:0},{value:"Proxy",paraId:2,tocIndex:0},{value:"\u5B9E\u73B0\uFF0C\u6570\u636E\u53D8\u5316\u81EA\u52A8\u89E6\u53D1\u89C6\u56FE\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u5C31\u5730\u8BA1\u7B97\u5C5E\u6027",paraId:2,tocIndex:0},{value:"\uFF1A\u72EC\u6709\u7684\u5C31\u5730\u8BA1\u7B97\u7279\u6027\uFF0C\u53EF\u4EE5\u5728\u72B6\u6001\u6811\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u58F0\u660E",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\uFF0C\u8BA1\u7B97\u7ED3\u679C\u539F\u5730\u5199\u5165\u3002",paraId:2,tocIndex:0},{value:"\u4F9D\u8D56\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"\uFF1A\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\u7684\u4F9D\u8D56\uFF0C\u53EA\u6709\u4F9D\u8D56\u53D8\u5316\u65F6\u624D\u4F1A\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:2,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u63A7\u5236\u80FD\u529B\uFF0C\u652F\u6301",paraId:2,tocIndex:0},{value:"\u8D85\u65F6\u3001\u91CD\u8BD5\u3001\u53D6\u6D88\u3001\u5012\u8BA1\u65F6\u3001\u8FDB\u5EA6",paraId:2,tocIndex:0},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:2,tocIndex:0},{value:"\u72B6\u6001\u53D8\u66F4\u76D1\u542C",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u76D1\u542C",paraId:2,tocIndex:0},{value:"get/set/delete/insert/update",paraId:2,tocIndex:0},{value:"\u7B49\u72B6\u6001\u5BF9\u8C61\u548C\u6570\u7EC4\u7684\u64CD\u4F5C\u76D1\u542C\u3002",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"signal",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u673A\u5236\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u7EC6\u7C92\u5EA6\u7684\u7EC4\u4EF6\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u4E0E\u8BCA\u65AD",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"chrome",paraId:2,tocIndex:0},{value:"\u7684",paraId:2,tocIndex:0},{value:"Redux DevTools Extension",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u5DE5\u5177\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u72B6\u6001\u53D8\u5316\u3002",paraId:2,tocIndex:0},{value:"\u5D4C\u5957\u72B6\u6001",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301\u4EFB\u610F\u6DF1\u5EA6\u7684\u5D4C\u5957\u72B6\u6001\uFF0C\u65E0\u9700\u62C5\u5FC3\u72B6\u6001\u7BA1\u7406\u7684\u590D\u6742\u6027\u3002",paraId:2,tocIndex:0},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u800C\u7B80\u6D01\u7684\u53CC\u5411\u8868\u5355\u7ED1\u5B9A\uFF0C\u6570\u636E\u6536\u96C6\u7B80\u5355\u5FEB\u901F\u3002",paraId:2,tocIndex:0},{value:"\u5FAA\u73AF\u4F9D\u8D56",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u5E2E\u52A9\u68C0\u6D4B\u5FAA\u73AF\u4F9D\u8D56\u51CF\u5C11\u6545\u969C\u3002",paraId:2,tocIndex:0},{value:"Typescript",paraId:2,tocIndex:0},{value:": \u5B8C\u5168\u652F\u6301Typescript\uFF0C\u63D0\u4F9B\u5B8C\u6574\u7684\u7C7B\u578B\u63A8\u65AD\u548C\u63D0\u793A",paraId:2,tocIndex:0},{value:"\u5355\u5143\u6D4B\u8BD5",paraId:2,tocIndex:0},{value:"\uFF1A\u63D0\u4F9B\u5B8C\u6574\u7684\u5355\u5143\u6D4B\u8BD5\u8986\u76D6\u7387\uFF0C\u4FDD\u8BC1\u4EE3\u7801\u8D28\u91CF\u3002",paraId:2,tocIndex:0}]},57105:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(71371);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u529F\u80FD\u5F3A\u5927\uFF0C\u6613\u4E8E\u4F7F\u7528\u3002\u4EE5\u4E0B\u901A\u8FC7\u6784\u5EFA\u4E00\u4E2A\u7B80\u5355\u4E66\u5E97\u5546\u57CE\u7684\u4F8B\u5B50\u6765\u5C55\u793A\u5982\u4F55\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\uFF0C\u4F53\u9A8C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u6781\u81F4\u4F18\u96C5\u548C\u5F3A\u5927\u7684\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:`npm install  @autostorejs/react
npm install @autostorejs/devtools
`,paraId:1},{value:`yarn add @autostorejs/react
yarn add @autostorejs/devtools
`,paraId:2},{value:`pnpm add @autostorejs/react
pnpm add @autostorejs/devtools
`,paraId:3},{value:"\u5B89\u88C5",paraId:4},{value:"@autostorejs/devtools",paraId:4},{value:"\u53EF\u4EE5\u8BA9\u5F00\u53D1\u8005\u4F7F\u7528",paraId:4},{value:"chrome",paraId:4},{value:"\u7684",paraId:4},{value:"Redux DevTools Extension",paraId:4},{value:"\u6765\u8C03\u8BD5",paraId:4},{value:"AutoStore",paraId:4},{value:"\u7684\u72B6\u6001\u3002",paraId:4},{value:"\u4F7F\u7528",paraId:5,tocIndex:2},{value:"createStore",paraId:5,tocIndex:2},{value:"\u6765\u521B\u5EFA\u4E00\u4E2A",paraId:5,tocIndex:2},{value:"Store",paraId:5,tocIndex:2},{value:"\u3002",paraId:5,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore\u6700\u4F73\u5B9E\u8DF5',
      price: 39.9,
      count: 1 
    }
  ] 
});
`,paraId:6,tocIndex:2},{value:"\u901A\u8FC7",paraId:7,tocIndex:2},{value:"store.state",paraId:7,tocIndex:2},{value:"\u53EF\u4EE5\u8BBF\u95EE\u72B6\u6001\u6811\uFF0C\u81EA\u52A8\u8FDB\u884C\u7C7B\u578B\u63A8\u65AD\u3002",paraId:7,tocIndex:2},{value:"\u63A5\u4E0B\u4E3A\uFF0C\u6211\u4EEC\u9700\u8981\u8BA1\u7B97\u8BA2\u5355\u7684",paraId:8,tocIndex:3},{value:"\u5C0F\u7ED3",paraId:8,tocIndex:3},{value:"\u548C",paraId:8,tocIndex:3},{value:"\u603B\u8BA1",paraId:8,tocIndex:3},{value:"\uFF0C\u53EA\u9700\u8981\u4F7F\u7528\u540C\u6B65\u8BA1\u7B97\u5373\u53EF\u3002",paraId:8,tocIndex:3},{value:`import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore\u6700\u4F73\u5B9E\u8DF5',
      price: 39.9,
      count: 1,
      // \u5C0F\u8BA1
      total: (scope)=>scope.price*scope.count
    }
  ],
  // \u603B\u8BA1
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
`,paraId:9,tocIndex:3},{value:"total",paraId:10,tocIndex:3},{value:"\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u503C\u662F",paraId:10,tocIndex:3},{value:"orders",paraId:10,tocIndex:3},{value:"\u7684",paraId:10,tocIndex:3},{value:"total",paraId:10,tocIndex:3},{value:"\u7684\u548C\uFF0C\u5728\u521B\u5EFA\u65F6\u4F1A\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\uFF0C\u5F53",paraId:10,tocIndex:3},{value:"price",paraId:10,tocIndex:3},{value:"\u6216",paraId:10,tocIndex:3},{value:"count",paraId:10,tocIndex:3},{value:"\u53D8\u5316\u65F6\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:10,tocIndex:3},{value:"\u8FD0\u884C\u6548\u679C\u5982\u4E0B\uFF1A",paraId:11,tocIndex:3},{value:"\u4F7F\u7528",paraId:12},{value:"$('\u72B6\u6001\u8DEF\u5F84')",paraId:12},{value:"\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002\u8BE6\u89C1",paraId:12},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:13},{value:"\u3002",paraId:12},{value:"\u63A5\u4E0B\u6211\u4EEC\u4E3A\u8BA2\u5355\u589E\u52A0\u4E00\u4E2A",paraId:14,tocIndex:4},{value:"\u6298\u6263(discount)",paraId:14,tocIndex:4},{value:"\u5B57\u6BB5\u3002",paraId:14,tocIndex:4},{value:"\u8BA2\u5355\u7684\u6298\u6263\u662F\u52A8\u6001\u7684\uFF0C\u5176\u8BA1\u7B97\u5F88\u590D\u6742\uFF0C\u7531\u540E\u53F0\u7684\u4E1A\u52A1\u903B\u8F91\u51B3\u5B9A\uFF0C\u53EF\u80FD\u4F1A\u6839\u636E\u8BA2\u5355\u7684\u6570\u91CF\u3001\u79CD\u7C7B\u3001\u65F6\u95F4\u3001\u7528\u6237\u662F\u5426\u662FVIP\u7B49\u6765\u51B3\u5B9A\uFF0C\u56E0\u6B64\u6211\u4EEC\u8BBE\u8BA1",paraId:15,tocIndex:4},{value:"\u6298\u6263(discount)",paraId:15,tocIndex:4},{value:"\u5B57\u6BB5\u4E3A\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:15,tocIndex:4},{value:`import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore\u6700\u4F73\u5B9E\u8DF5',
      price: 39.9,
      count: 1,
      // \u5C0F\u8BA1
      total: (scope)=>scope.price*scope.count
    }
  ],
  //  \u6298\u6263\uFF1A \u5411\u540E\u53F0\u8BF7\u6C42\u6298\u6263
  discount: computed(async (scope)=>{ 
    // \u5982await fetch(\`/api/discount?userId=1&total=\${scope.total}....\`) 
    await delay(2000)
    return  (0.5 + Math.random()).toFixed(2)
  },['orders.*.total'],{async:true,initial:0.9}),
  // \u603B\u8BA1
  total: computed(async (scope)=>{ 
    return scope.orders.reduce((acc,cur)=>acc+cur.total,0)*scope.discount.value
  },['discount'],{async:true})  

});
`,paraId:16,tocIndex:4},{value:"\u6CE8\u610F\uFF1A ",paraId:17,tocIndex:4},{value:"discount",paraId:17,tocIndex:4},{value:"\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u8BA1\u7B97\u51FD\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u5176\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:17,tocIndex:4},{value:"store.state.discount",paraId:17,tocIndex:4},{value:"\uFF0C\u8FD9\u5C31\u662F",paraId:17,tocIndex:4},{value:"AutoStore",paraId:17,tocIndex:4},{value:"\u4E0E\u5176\u4ED6\u72B6\u6001\u5E93\u6700\u5927\u4E0D\u540C\u4E4B\u5904\uFF0C\u5373",paraId:17,tocIndex:4},{value:"\u539F\u5730\u8BA1\u7B97",paraId:17,tocIndex:4},{value:"\u3002",paraId:17,tocIndex:4},{value:"\u8FD0\u884C\u6548\u679C\u5982\u4E0B\uFF1A",paraId:18,tocIndex:4},{value:"\u5728\u4EE5\u4E0A\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u58F0\u660E\u4E86\u4E24\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",paraId:19},{value:"discount",paraId:19},{value:"\u548C",paraId:19},{value:"total",paraId:19},{value:"discount",paraId:20},{value:"\u4F9D\u8D56",paraId:20},{value:"orders.*.total",paraId:20},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:20},{value:"orders",paraId:20},{value:"\u6570\u7EC4\u4E2D\u7684",paraId:20},{value:"total",paraId:20},{value:"\u5C5E\u6027\u3002\u5F53\u8BA2\u5355\u7684\u6570\u91CF\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1",paraId:20},{value:"discount",paraId:20},{value:"\u7684\u8BA1\u7B97\u51FD\u6570\uFF0C\u8BA1\u7B97\u51FD\u6570\u4F1A\u5411\u540E\u53F0\u8BF7\u6C42\u6298\u6263\uFF0C\u7136\u540E\u8FD4\u56DE\u65B0\u7684\u6298\u6263\u503C\u3002(\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u6A21\u62DF\u8BF7\u6C42\u6298\u6263\u7684\u8FC7\u7A0B\uFF0C\u4F7F\u7528\u4E86",paraId:20},{value:"delay",paraId:20},{value:"\u51FD\u6570\uFF0C\u5B9E\u9645\u9879\u76EE\u4E2D\uFF0C\u6211\u4EEC\u53EF\u80FD\u4F1A\u4F7F\u7528",paraId:20},{value:"fetch",paraId:20},{value:"\u6216",paraId:20},{value:"axios",paraId:20},{value:"\u7B49\u6765\u8BF7\u6C42\u6298\u6263)\u3002",paraId:20},{value:"total",paraId:21},{value:"\u5219\u4F9D\u8D56",paraId:21},{value:"discount",paraId:21},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:21},{value:"discount",paraId:21},{value:"\u7684\u503C\u3002\u5F53",paraId:21},{value:"discount",paraId:21},{value:"\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1",paraId:21},{value:"total",paraId:21},{value:"\u7684\u8BA1\u7B97\u51FD\u6570\uFF0C\u91CD\u65B0\u8BA1\u7B97\u603B\u8BA1\u3002",paraId:21},{value:"\u5728\u4E0A\u4E00\u6B65\u4E2D\uFF0C\u5F53\u6211\u4EEC\u8C03\u8282\u8BA2\u5355\u6570\u91CF",paraId:22,tocIndex:5},{value:"count",paraId:22,tocIndex:5},{value:"\u65F6\uFF0C\u9700\u8981",paraId:22,tocIndex:5},{value:"2000ms",paraId:22,tocIndex:5},{value:"\u624D\u53EF\u4EE5\u770B\u5230",paraId:22,tocIndex:5},{value:"discount",paraId:22,tocIndex:5},{value:"\u548C",paraId:22,tocIndex:5},{value:"total",paraId:22,tocIndex:5},{value:"\u7684\u53D8\u5316\u3002\u671F\u95F4\u754C\u9762\u6CA1\u6709\u4EFB\u4F55\u53D8\u5316\uFF0C\u663E\u7136\u8FD9\u662F\u4E0D\u53CB\u597D\u7684\uFF0C\u6211\u4EEC\u9700\u8981\u5728\u8BF7\u6C42\u6298\u6263\u65F6\uFF0C\u663E\u793A\u4E00\u4E2A",paraId:22,tocIndex:5},{value:"loading",paraId:22,tocIndex:5},{value:"\u72B6\u6001\uFF0C\u544A\u8BC9\u7528\u6237\u6B63\u5728\u8BF7\u6C42\u6298\u6263\u3002\u5F53\u6298\u6263\u8BF7\u6C42\u5B8C\u6210\u65F6\uFF0C\u518D\u663E\u793A\u6298\u6263\u503C\u3002",paraId:22,tocIndex:5},{value:"\u8FD9\u65F6\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5F00\u59CB\u5F15\u5165",paraId:23,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:23,tocIndex:5},{value:"\u7684\u5404\u79CD\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:23,tocIndex:5},{value:"\u8BA9\u6211\u4EEC\u5148\u5728\u8BA1\u7B97\u65F6\uFF0C\u663E\u793A",paraId:24,tocIndex:5},{value:"loading",paraId:24,tocIndex:5},{value:"\u72B6\u6001\u3002",paraId:24,tocIndex:5},{value:"\u8C03\u8282\u8BA2\u5355\u6570\u91CF\u65F6\uFF0C\u53EF\u4EE5\u770B\u5230",paraId:25},{value:"discount",paraId:25},{value:"\u548C",paraId:25},{value:"total",paraId:25},{value:"\u7684\u53D8\u5316\uFF0C\u540C\u65F6\u663E\u793A\u4E86",paraId:25},{value:"loading",paraId:25},{value:"\u72B6\u6001\u3002\u5F53\u6298\u6263\u8BF7\u6C42\u5B8C\u6210\u65F6\uFF0C",paraId:25},{value:"loading",paraId:25},{value:"\u72B6\u6001\u6D88\u5931\uFF0C\u663E\u793A\u6298\u6263\u503C\u3002",paraId:25},{value:"\u4E00\u5207\u90FD\u5982\u9884\u671F\u5DE5\u4F5C\u3002\u5F53\u7136\uFF0C\u5B9E\u9645\u9879\u76EE\u53EA\u663E\u793A",paraId:26},{value:"loading",paraId:26},{value:"\u72B6\u6001\u662F\u4E0D\u591F\u7684\uFF0C\u4E00\u822C\u6211\u4EEC\u8FD8\u9700\u8981\u589E\u52A0\u4EE5\u4E0B\u529F\u80FD\uFF1A",paraId:26},{value:"\u8D85\u65F6\u5904\u7406",paraId:27},{value:"\uFF1A\u5411\u670D\u52A1\u5668\u8BF7\u6C42\u6298\u6263\u53EF\u80FD\u4F1A\u51FA\u9519\u3002",paraId:27},{value:"\u5012\u8BA1\u65F6",paraId:27},{value:": \u53EF\u80FD\u6211\u4EEC\u60F3\u663E\u793A\u4E00\u4E2A\u5012\u8BA1\u65F6\uFF0C\u544A\u8BC9\u7528\u6237\u8FD8\u6709\u591A\u4E45\u8BF7\u6C42\u5B8C\u6210\u3002",paraId:27},{value:"\u91CD\u8BD5\u673A\u5236",paraId:27},{value:"\uFF1A\u5982\u679C\u8BF7\u6C42\u6298\u6263\u5931\u8D25\uFF0C\u6211\u4EEC\u53EF\u80FD\u4F1A\u91CD\u8BD5\u8BF7\u6C42\u3002",paraId:27},{value:"\u9519\u8BEF\u5904\u7406",paraId:27},{value:"\uFF1A\u5982\u679C\u8BF7\u6C42\u6298\u6263\u5931\u8D25\uFF0C\u6211\u4EEC\u9700\u8981\u663E\u793A\u9519\u8BEF\u4FE1\u606F\u3002",paraId:27},{value:"\u53EF\u53D6\u6D88",paraId:27},{value:"\uFF1A\u5982\u679C\u7528\u6237\u53D6\u6D88\u4E86\u8BA2\u5355\uFF0C\u6211\u4EEC\u9700\u8981\u53D6\u6D88\u8BF7\u6C42\u3002",paraId:27},{value:"\u5904\u7406\u8FDB\u5EA6",paraId:27},{value:"\uFF1A\u53EF\u80FD\u6211\u4EEC\u60F3\u63D0\u4F9B\u4E00\u4E2A\u8BF7\u6C42\u8FDB\u5EA6",paraId:27},{value:"0-100%",paraId:27},{value:"\uFF0C\u544A\u8BC9\u7528\u6237\u8BF7\u6C42\u8FDB\u5EA6\u3002",paraId:27},{value:"\u6240\u6709\u8FD9\u4E9B\u529F\u80FD",paraId:28},{value:"AutoStore",paraId:28},{value:"\u5747\u4E3A\u4F60\u51C6\u5907\u597D\u4E86\uFF0C\u5F00\u7BB1\u5373\u53EF\uFF0C\u7B80\u5355\u5FEB\u6377\uFF0C\u8BE6\u89C1",paraId:28},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:29},{value:"\u4EE5\u4E0A\u6211\u4EEC\u53EA\u6709\u4E00\u6761\u8BA2\u5355\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u589E\u52A0\u591A\u6761\u8BA2\u5355\uFF0C\u770B\u770B",paraId:30,tocIndex:6},{value:"AutoStore",paraId:30,tocIndex:6},{value:"\u662F\u5982\u4F55\u5904\u7406\u591A\u6761\u8BA2\u5355\u7684\u3002",paraId:30,tocIndex:6},{value:"\u9996\u5148\u6211\u4EEC\u5C06\u8BA2\u5355\u5C0F\u8BA1\u63D0\u53D6\u51FA\u6765\u4EE5\u4FBF\u590D\u7528",paraId:31},{value:"calcOrderTotal = (scope)=> Math.floor(scope.price*scope.count)",paraId:31},{value:"\u63A5\u4E0B\u6765\u6211\u4EEC\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684",paraId:31},{value:"Store",paraId:31},{value:"\u7528\u6765\u4FDD\u5B58\u7528\u6237\u7684\u8F93\u5165, \u7136\u540E\u4F7F\u7528",paraId:31},{value:"useForm",paraId:31},{value:"\u5C06\u8F93\u5165\u8868\u5355\u4E0E",paraId:31},{value:"Store",paraId:31},{value:"\u53CC\u5411\u7ED1\u5B9A\u3002\u5982\u4E0B\uFF1A",paraId:31},{value:`    const newOrderFrom = useForm()
    <form {...newOrderFrom}>
        <h5>\u65B0\u589E\u8BA2\u5355</h5>
        <Input name='book'></Input>
        <Input name='price'></Input>
        <Input name='count'></Input>
        <Button onClick={()=>{
          state.orders.push({
            ...newOrder,
            total:calcOrderTotal
          })
        }}>Add</Button>
    </form>
`,paraId:32},{value:"\u5C06store\u4E0E\u8868\u5355\u4E4B\u95F4\u8FDB\u884C\u53CC\u5411\u8868\u5355\u975E\u5E38\u7B80\u5355\uFF0C\u53EA\u9700\u8981",paraId:33},{value:"2",paraId:33},{value:"\u6B65\u5373\u53EF\u3002",paraId:33},{value:"Step 1\uFF1A  \u5728\u8868\u5355\u5143\u7D20\u4E0A",paraId:34},{value:"{...newOrderFrom}",paraId:34},{value:"\uFF0C\u5373\u53EF\u5C06\u8868\u5355\u5143\u7D20\u4E0Estore\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:34},{value:"Step 2: \u5728",paraId:34},{value:"input",paraId:34},{value:"\u8F93\u5165\u7EC4\u4EF6\u4E2D\u6307\u5B9A\u72B6\u6001\u7684",paraId:34},{value:"name",paraId:34},{value:"\u5C5E\u6027,\u8BA9",paraId:34},{value:"name",paraId:34},{value:"\u7B49\u4E8E\u72B6\u6001\u8DEF\u5F84\u540D\u79F0\u5373\u53EF\u3002",paraId:34},{value:"\u7136\u540E\uFF0C\u5F53\u8FDB\u884C\u8F93\u5165\u65F6\u5C31\u4F1A\u81EA\u52A8\u540C\u6B65\u5230",paraId:35},{value:"store",paraId:35},{value:"\u4E2D\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:35},{value:"\u5355\u51FB",paraId:36},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:37},{value:"\u67E5\u770B\u66F4\u591A\u5185\u5BB9.",paraId:36},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"createStore",paraId:38,tocIndex:7},{value:"\u6216",paraId:38,tocIndex:7},{value:"useStore",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4EFB\u610F\u5D4C\u5957\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u5BF9\u8C61\u3002",paraId:38,tocIndex:7},{value:"\u5728\u7EC4\u4EF6\u4E2D\u4F7F\u7528",paraId:38,tocIndex:7},{value:"useState",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u8BBF\u95EE\u72B6\u6001\u6570\u636E\uFF0C\u5E76\u5728\u72B6\u6001\u53D8\u5316\u65F6\u81EA\u52A8\u91CD\u65B0\u6E32\u67D3\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"$('\u72B6\u6001\u8DEF\u5F84')",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5C06\u6E32\u67D3\u66F4\u65B0\u9650\u5236\u5728\u8F83\u7EC6\u7684\u8303\u56F4\u5185\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"computed",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u503C\u662F\u6839\u636E\u5176\u4ED6\u72B6\u6001\u8BA1\u7B97\u800C\u6765\uFF0C\u5F53\u4F9D\u8D56\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:38,tocIndex:7},{value:"\u5F02\u6B65\u8BA1\u7B97\u652F\u6301",paraId:38,tocIndex:7},{value:"loading",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"error",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"timeout",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"retry",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"cancel",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"progress",paraId:38,tocIndex:7},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:38,tocIndex:7},{value:"useForm",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u5C06\u8868\u5355\u5143\u7D20\u4E0E",paraId:38,tocIndex:7},{value:"store",paraId:38,tocIndex:7},{value:"\u53CC\u5411\u7ED1\u5B9A\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:38,tocIndex:7}]},22231:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(67409);const l=[]},96827:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(34040);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5171\u5305\u62EC\u4E09\u4E2A\u5305\uFF1A",paraId:0,tocIndex:0},{value:"autostore",paraId:1,tocIndex:0},{value:": \u6838\u5FC3\u5305",paraId:1,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:": \u9762\u5411",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u5F00\u53D1\u8005",paraId:1,tocIndex:0},{value:"@autostorejs/devtools",paraId:1,tocIndex:0},{value:": \u4F7F\u7528",paraId:1,tocIndex:0},{value:"Redux DevTools",paraId:1,tocIndex:0},{value:"\u8C03\u8BD5",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"autostore",paraId:2,tocIndex:1},{value:"\u662F\u6838\u5FC3\u5305\uFF0C\u63D0\u4F9B\u4E86",paraId:2,tocIndex:1},{value:"AutoStore",paraId:2,tocIndex:1},{value:"\u7684\u6838\u5FC3\u529F\u80FD\u3002",paraId:2,tocIndex:1},{value:"\u5982\u679C\u4F60\u662F",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u7B49\u5176\u4ED6\u6846\u67B6\u7684\u5F00\u53D1\u8005\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528",paraId:3,tocIndex:1},{value:"autostore",paraId:3,tocIndex:1},{value:"\u3002",paraId:3,tocIndex:1},{value:"\u8BE5\u5305\u4F7F\u7528",paraId:4,tocIndex:1},{value:"new AutoStore",paraId:4,tocIndex:1},{value:"\u6765\u521B\u5EFA",paraId:4,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5B9E\u4F8B\u3002",paraId:4,tocIndex:1},{value:`npm install  autostore
`,paraId:5},{value:`yarn add autostore
`,paraId:6},{value:`pnpm add autostore
`,paraId:7},{value:"\u5982\u679C\u60A8\u662F",paraId:8},{value:"React",paraId:8},{value:"\u5F00\u53D1\u8005\uFF0C\u53EA\u9700\u8981\u5B89\u88C5",paraId:8},{value:"@autostorejs/react",paraId:8},{value:"\u5373\u53EF\u3002",paraId:8},{value:"@autostorejs/react",paraId:9},{value:"\u5DF2\u7ECF\u96C6\u6210\u4E86",paraId:9},{value:"autostore",paraId:9},{value:"\u5305\u7684\u6240\u6709\u529F\u80FD\uFF0C",paraId:9},{value:"\u4E0D\u9700\u8981\u989D\u5916\u5B89\u88C5",paraId:9},{value:"autostore",paraId:9},{value:"\u3002",paraId:9},{value:`npm install  @autostorejs/react
`,paraId:10},{value:`yarn add @autostorejs/react
`,paraId:11},{value:`pnpm add @autostorejs/react
`,paraId:12},{value:"@autostorejs/devtools",paraId:13,tocIndex:3},{value:"\u662F",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u8C03\u8BD5\u5DE5\u5177\u5305\uFF0C\u57FA\u4E8E",paraId:13,tocIndex:3},{value:"chrome",paraId:13,tocIndex:3},{value:"\u7684",paraId:13,tocIndex:3},{value:"Redux DevTools Extension",paraId:13,tocIndex:3},{value:"\u6765\u8C03\u8BD5",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u72B6\u6001\u3002",paraId:13,tocIndex:3},{value:`npm install  @autostorejs/devtools
`,paraId:14},{value:`yarn add @autostorejs/devtools
`,paraId:15},{value:`pnpm add @autostorejs/devtools
`,paraId:16},{value:"\u76EE\u524D\u8FD8\u6CA1\u6709\u5B9E\u73B0\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5C01\u88C5",paraId:17,tocIndex:4},{value:"autostore",paraId:17,tocIndex:4},{value:"\u5B9E\u73B0",paraId:17,tocIndex:4},{value:"Vue",paraId:17,tocIndex:4},{value:"\u7684\u96C6\u6210\u3002",paraId:17,tocIndex:4},{value:"@autostorejs/react",paraId:18,tocIndex:4},{value:"\u4E5F\u4EC5\u662F",paraId:18,tocIndex:4},{value:"autostore",paraId:18,tocIndex:4},{value:"\u7684\u5C01\u88C5\uFF0C\u4EE3\u7801\u91CF\u5F88\u5C11\uFF0C\u6709\u5174\u8DA3\u7684\u540C\u5B66\u53EF\u4EE5\u5C1D\u8BD5\u4E00\u4E0B\u3002",paraId:18,tocIndex:4}]},91821:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(34934);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u529F\u80FD\u5F3A\u5927\uFF0CAPI\u8BBE\u8BA1\u4F18\u96C5\uFF0C\u6587\u6863\u793A\u4F8B\u4E5F\u5F88\u9F50\u5168\uFF0C\u8BA4\u771F\u9605\u8BFB\u5B98\u7F51\u6587\u6863\u53EF\u4EE5\u89E3\u51B3\u5927\u591A\u6570\u95EE\u9898\u3002",paraId:0,tocIndex:0},{value:"\u2753\u4E5F\u6B22\u8FCE\u5927\u5BB6\u63D0",paraId:1,tocIndex:0},{value:"issue",paraId:1,tocIndex:0},{value:"\u6765\u53CD\u9988\u95EE\u9898\u3002",paraId:1,tocIndex:0},{value:"\u{1F31F}\u5982\u679C\u4F60\u89C9\u5F97",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u597D\u7528\uFF0C\u6B22\u8FCE\u7ED9\u4E2A",paraId:1,tocIndex:0},{value:"star",paraId:1,tocIndex:0},{value:"\u{1F4E6}\u5982\u679C\u4F60\u6709\u597D\u7684\u5EFA\u8BAE\u6216\u8005\u9700\u6C42\uFF0C\u6B22\u8FCE\u63D0",paraId:1,tocIndex:0},{value:"PR",paraId:1,tocIndex:0},{value:"\u4E5F\u6B22\u8FCE\u5927\u5BB6\u52A0\u5165",paraId:2,tocIndex:0},{value:"AutoStore",paraId:2,tocIndex:0},{value:"\u7684\u5FAE\u4FE1\u4EA4\u6D41\u7FA4\uFF0C\u4E00\u8D77\u8BA8\u8BBA\u95EE\u9898\uFF0C\u5206\u4EAB\u7ECF\u9A8C\u3002",paraId:2,tocIndex:0},{value:"\u52A0\u5165\u65B9\u5F0F\uFF1A",paraId:3,tocIndex:0},{value:"\u626B\u63CF\u4E0A\u65B9\u4E8C\u7EF4\u7801\uFF0C\u5907\u6CE8",paraId:4,tocIndex:0},{value:"AutoStore",paraId:4,tocIndex:0},{value:"\u5373\u53EF\u52A0\u5165\u3002",paraId:4,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u6574\u7406\u4E86\u4E00\u4E9B\u5E38\u89C1\u95EE\u9898\uFF0C\u5E0C\u671B\u80FD\u5E2E\u52A9\u4F60\u66F4\u597D\u7684\u4F7F\u7528",paraId:5,tocIndex:0},{value:"AutoStore",paraId:5,tocIndex:0},{value:"\u3002",paraId:5,tocIndex:0}]},70228:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(8468);const l=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
`,paraId:4,tocIndex:1},{value:"\u56E0\u6B64",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u5C31\u6709\u4E86",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u6982\u5FF5\uFF0C\u901A\u8FC7",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u8C03\u5EA6\u6765\u5B9E\u73B0\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4F46\u662F",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u8C03\u5EA6\u903B\u8F91\u5F88\u590D\u6742\uFF0C\u5B98\u65B9\u641E\u8FD9\u73A9\u610F\u6298\u817E\u4E86\u6709\u4E00\u5E74\u3002",paraId:5,tocIndex:1},{value:"\u7136\u540E\u5C31\u662F\u4E00\u5806\u7684",paraId:5,tocIndex:1},{value:"React.memo",paraId:5,tocIndex:1},{value:"\u7684\u4F18\u5316\u624B\u6BB5\uFF0C\u4F46\u662F\u5E94\u7528\u590D\u6742\u65F6\uFF0C\u9A7E\u9A6D\u8D77\u6765\u4E5F\u6709",paraId:5,tocIndex:1},{value:"\u6BD4\u8F83\u5927\u7684\u5FC3\u667A\u8D1F\u62C5",paraId:5,tocIndex:1},{value:"\u3002",paraId:5,tocIndex:1},{value:"\u56E0\u6B64\uFF0C\u5B98\u65B9\u53C8\u641E\u4E86\u4E2A",paraId:5,tocIndex:1},{value:"React Compiler",paraId:5,tocIndex:1},{value:"\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4E3A\u4EE3\u7801\u81EA\u52A8\u6DFB\u52A0",paraId:5,tocIndex:1},{value:"React.memo",paraId:5,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u4F46\u8FD9\u73A9\u610F\u4ECE\u63D0\u51FA\u5230\u73B0\u5728\u600E\u4E48\u4E5F\u6709\u4E24\u5E74\u4E86\uFF0C\u8FD8\u5728\u5B9E\u9A8C\u9636\u6BB5\u3002\u4F30\u8BA1\u4E5F\u662F\u4E0D\u592A\u597D\u641E\u3002",paraId:5,tocIndex:1},{value:"\u7531\u4E8E",paraId:6,tocIndex:1},{value:"Virtual DOM",paraId:6,tocIndex:1},{value:"\u7684\u7279\u6027\uFF0C\u65E0\u8BBA\u662F",paraId:6,tocIndex:1},{value:"React",paraId:6,tocIndex:1},{value:"\u8FD8\u662F",paraId:6,tocIndex:1},{value:"Vue",paraId:6,tocIndex:1},{value:"\uFF0C\u672C\u8D28\u4E0A\u90FD\u662F\u5728",paraId:6,tocIndex:1},{value:"Virtual DOM",paraId:6,tocIndex:1},{value:"\u4E0A\u8FDB\u884C",paraId:6,tocIndex:1},{value:"diff",paraId:6,tocIndex:1},{value:"\u7B97\u6CD5\uFF0C\u7136\u540E\u518D\u8FDB\u884C",paraId:6,tocIndex:1},{value:"patch",paraId:6,tocIndex:1},{value:"\u64CD\u4F5C\uFF0C\u5DEE\u522B\u5C31\u662F",paraId:6,tocIndex:1},{value:"diff",paraId:6,tocIndex:1},{value:"\u7B97\u6CD5\u7684\u5B9E\u73B0\u65B9\u5F0F\u4E0D\u540C\u3002",paraId:6,tocIndex:1},{value:"\u4F46\u662F\u65E0\u8BBA\u600E\u4E48\u6574\uFF0C \u5728",paraId:7,tocIndex:1},{value:"Virtual DOM",paraId:7,tocIndex:1},{value:"\u7684",paraId:7,tocIndex:1},{value:"diff",paraId:7,tocIndex:1},{value:"\u7B97\u6CD5\u52A0\u6301\u4E0B\uFF0C\u5C06",paraId:7,tocIndex:1},{value:"\u72B6\u6001\u7684\u53D8\u5316",paraId:7,tocIndex:1},{value:"\u603B\u662F\u96BE\u4EE5\u7CBE\u51C6\u5730\u4E0E",paraId:7,tocIndex:1},{value:"DOM",paraId:7,tocIndex:1},{value:"\u5BF9\u5E94\u5339\u914D\u3002",paraId:7,tocIndex:1},{value:"\u901A\u4FD7\u8BF4\uFF0C\u5C31\u662F\u5F53",paraId:8,tocIndex:1},{value:"state.xxx",paraId:8,tocIndex:1},{value:"\u66F4\u65B0\u65F6\uFF0C\u4E0D\u662F\u76F4\u63A5\u627E\u5230\u4F7F\u7528",paraId:8,tocIndex:1},{value:"state.xxx",paraId:8,tocIndex:1},{value:"\u7684",paraId:8,tocIndex:1},{value:"DOM",paraId:8,tocIndex:1},{value:"\u8FDB\u884C\u7CBE\u51C6\u66F4\u65B0\uFF0C\u800C\u662F\u901A\u8FC7",paraId:8,tocIndex:1},{value:"Virtual DOM",paraId:8,tocIndex:1},{value:"\u7684",paraId:8,tocIndex:1},{value:"diff",paraId:8,tocIndex:1},{value:"\u7B97\u6CD5\u6BD4\u8F83\u7B97\u51FA\u9700\u8981\u66F4\u65B0\u7684",paraId:8,tocIndex:1},{value:"DOM",paraId:8,tocIndex:1},{value:"\u5143\u7D20\uFF0C\u7136\u540E\u518D\u8FDB\u884C",paraId:8,tocIndex:1},{value:"patch",paraId:8,tocIndex:1},{value:"\u64CD\u4F5C\u3002",paraId:8,tocIndex:1},{value:"\u95EE\u9898\u662F\uFF0C\u8FD9\u79CD",paraId:9,tocIndex:1},{value:"diff",paraId:9,tocIndex:1},{value:"\u7B97\u6CD5\u6BD4\u8F83\u590D\u6742\uFF0C\u9700\u8981\u8FDB\u884C\u5404\u5904\u4F18\u5316\uFF0C\u5BF9\u5F00\u53D1\u8005\u4E5F\u6709\u4E00\u5B9A\u7684\u5FC3\u667A\u8D1F\u62C5\uFF0C\u6BD4\u5982\u5728\u5728\u5927\u578B",paraId:9,tocIndex:1},{value:"React",paraId:9,tocIndex:1},{value:"\u5E94\u7528\u4E2D\u5BF9",paraId:9,tocIndex:1},{value:"React.memo",paraId:9,tocIndex:1},{value:"\u7684\u4F7F\u7528,\u6216\u8005\u5728",paraId:9,tocIndex:1},{value:"Vue",paraId:9,tocIndex:1},{value:"\u4E2D\u7684\u6A21\u677F\u4F18\u5316\u7B49\u7B49\u3002",paraId:9,tocIndex:1},{value:"Q: ",paraId:10},{value:"\u4E3A\u4EC0\u4E48\u8BF4\u5728\u5927\u578B\u5E94\u7528\u4E2D\u4F7F\u7528",paraId:10},{value:"React.memo",paraId:10},{value:"\u662F\u4E00\u79CD\u5FC3\u667A\u8D1F\u62C5\uFF1F",paraId:10},{value:"A: \u5B9E\u9645\u4E0A",paraId:10},{value:"React.memo",paraId:10},{value:"\u7684\u903B\u8F91\u672C\u8EAB\u5F88\u7B80\u5355\uFF0C\u65E0\u8BBA\u8001\u624B\u6216\u5C0F\u767D\u5747\u53EF\u4EE5\u8F7B\u677E\u638C\u63E1\u3002\u4F46\u662F\u5728\u5927\u578B\u5E94\u7528\u4E2D\uFF0C\u4E00\u65B9\u9762\u7EC4\u4EF6\u7684\u5D4C\u5957\u5C42\u7EA7\u5F88\u6DF1\uFF0C\u7EC4\u4EF6\u4E4B\u95F4\u7684\u4F9D\u8D56\u5173\u7CFB\u5F88\u590D\u6742\uFF0C\u53E6\u5916\u4E00\u65B9\u9762\uFF0C\u7EC4\u4EF6\u6570\u91CF\u6210\u767E\u4E0A\u5343\u3002\u5982\u679C\u90FD\u8981\u4F7F\u7528",paraId:10},{value:"React.memo",paraId:10},{value:"\u6765\u4F18\u5316\u6E32\u67D3\uFF0C\u5C31\u662F\u4E00\u79CD\u5F88\u5927\u7684\u5FC3\u667A\u8D1F\u62C5\u3002\u5982\u679C\u91C7\u7528\u540E\u671F\u4F18\u5316\uFF0C\u5219\u95EE\u9898\u66F4\u52A0\u4E25\u91CD\uFF0C\u5F80\u5F80\u9700\u8981\u4F7F\u7528\u4E00\u4E9B\u6027\u80FD\u5206\u6790\u5DE5\u5177\u624D\u53EF\u4EE5\u8FDB\u884C\u9488\u5BF9\u6027\u7684\u4F18\u5316\u3002\u7B80\u5355\u5730\u8BF4\uFF0C\u5F53\u5E94\u7528\u590D\u6742\u540E\uFF0C",paraId:10},{value:"React.memo",paraId:10},{value:"\u624D\u4F1A\u6210\u4E3A\u8D1F\u62C5\u3002",paraId:10},{value:"\u56E0\u6B64\u6846\u67B6\u7684\u6700\u6838\u5FC3\u7684\u95EE\u9898\u5C31\u662F",paraId:11},{value:"\u80FD\u6839\u636E",paraId:11},{value:"\u72B6\u6001\u7684\u53D8\u5316",paraId:11},{value:"\u5FEB\u901F\u627E\u5230\u4F9D\u8D56\u4E8E\u8BE5\u72B6\u6001\u7684",paraId:11},{value:"DOM",paraId:11},{value:"\u7684\u8FDB\u884C\u91CD\u65B0\u6E32\u67D3",paraId:11},{value:"\uFF0C\u5373\u6240\u8C13\u7684",paraId:11},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:11},{value:"\u3002",paraId:11},{value:"\u5373\u7136\u57FA\u4E8E",paraId:12},{value:"Virtual DOM",paraId:12},{value:"\u7684",paraId:12},{value:"diff",paraId:12},{value:"\u7B97\u6CD5\u5728\u89E3\u51B3\u7EC6\u7C92\u5EA6\u66F4\u65B0\u65B9\u9762\u5B58\u5728\u95EE\u9898\uFF0C\u90A3\u4E48\u662F\u5426\u53EF\u4EE5\u4E0D\u8FDB\u884C",paraId:12},{value:"diff",paraId:12},{value:"\u7B97\u6CD5\uFF0C\u76F4\u63A5\u627E\u5230",paraId:12},{value:"state.xxx",paraId:12},{value:"\u5BF9\u5E94\u7684",paraId:12},{value:"DOM",paraId:12},{value:"\u8FDB\u884C\u66F4\u65B0\u5462\uFF1F",paraId:12},{value:"\u65B9\u6CD5\u662F\u6709\u7684\uFF0C\u5C31\u662F\u524D\u7AEF\u6700\u7EA2\u7684",paraId:13},{value:"signal",paraId:13},{value:"\u7684\u6982\u5FF5\u3002",paraId:13},{value:"\u4E8B\u5B9E\u4E0A",paraId:14},{value:"signal",paraId:14},{value:"\u6982\u5FF5\u5F88\u65E9\u5C31\u6709\u4E86\uFF0C\u4F46\u662F\u81EA\u51FA\u4E86",paraId:14},{value:"Svelte",paraId:14},{value:"\u4E4B\u7C7B\u7684\u6846\u67B6\uFF0C\u5B83\u4E0D\u4F7F\u7528",paraId:14},{value:"Virtual DOM",paraId:14},{value:"\uFF0C\u4E0D\u9700\u8981",paraId:14},{value:"diff",paraId:14},{value:"\u7B97\u6CD5\uFF0C\u800C\u662F\u5F15\u5165",paraId:14},{value:"signal",paraId:14},{value:"\u6982\u5FF5\uFF0C\u53EF\u4EE5\u5728",paraId:14},{value:"\u4FE1\u53F7\u89E6\u53D1\u65F6\u53EA\u66F4\u65B0\u53D8\u5316\u7684\u90E8\u5206\uFF0C\u771F\u6B63\u7684\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:14},{value:"\uFF0C\u5E76\u4E14\u6027\u80FD\u4E5F\u975E\u5E38\u597D\u3002",paraId:14},{value:"\u8FD9\u4E00\u4E0B\u5B50\u5C31\u628A",paraId:15},{value:"React",paraId:15},{value:"\u548C",paraId:15},{value:"Vue",paraId:15},{value:"\u4E4B\u7C7B\u7684",paraId:15},{value:"Virtual DOM",paraId:15},{value:"\u73A9\u5BB6\u4EEC\u7ED9\u6253\u8499\u4E86\uFF0C\u4E00\u65F6\u95F4",paraId:15},{value:"signal",paraId:15},{value:`\u6210\u4E86\u524D\u7AEF\u5F00\u53D1\u7684\u65B0\u5BA0\u3002
\u6240\u6709\u7684\u524D\u7AEF\u6846\u67B6\u5747\u5728`,paraId:15},{value:"signal",paraId:15},{value:"\u9760\u62E2\uFF0C",paraId:15},{value:"Svelte",paraId:15},{value:"\u548C",paraId:15},{value:"solidjs",paraId:15},{value:"\u6210\u4E86",paraId:15},{value:"signal",paraId:15},{value:"\u6D41\u6D3E\u7684\u4EE3\u8868\uFF0C\u5C31\u8FDE",paraId:15},{value:"Vue",paraId:15},{value:"\u4E5F\u4E0D\u80FD\u514D\u4FD7\uFF0C",paraId:15},{value:"Vue Vapor",paraId:15},{value:"\u5C31\u662F",paraId:15},{value:"Vue",paraId:15},{value:"\u7684",paraId:15},{value:"signal",paraId:15},{value:"\u5B9E\u73B0\uFF08\u8FD8\u6CA1\u6709\u53D1\u5E03\uFF09\u3002",paraId:15},{value:"\u90A3\u4E48\u4EC0\u4E48\u662F\u4FE1\u53F7\uFF1F",paraId:16},{value:"\u5F15\u7528\u5361\u9882\u8001\u5E08\u5173\u4E8E",paraId:17},{value:"signal",paraId:17},{value:"\u7684\u4E00\u7BC7\u6587\u7AE0",paraId:17},{value:"Signal:\u66F4\u591A\u524D\u7AEF\u6846\u67B6\u7684\u9009\u62E9",paraId:17},{value:"\u3002",paraId:17},{value:"\u5361\u9882\u8001\u5E08\u8BF4",paraId:18},{value:"signal\u7684\u672C\u8D28\uFF0C\u662F\u5C06\u5BF9\u72B6\u6001\u7684\u5F15\u7528\u4EE5\u53CA\u5BF9\u72B6\u6001\u503C\u7684\u83B7\u53D6\u5206\u79BB\u5F00\u3002",paraId:18},{value:"\u5927\u795E\u5C31\u662F\u5927\u795E\uFF0C\u4E00\u53E5\u8BDD\u5C31\u628A",paraId:19},{value:"signal",paraId:19},{value:"\u7684\u672C\u8D28\u8BF4\u6E05\u695A\u4E86\u3002\u4F46\u662F\u4E5F\u628A\u6211\u7B49\u666E\u901A\u4EBA\u7ED9\u8BF4\u61F5\u903C\u4E86\uFF0C\u8FD9\u4E2A\u6982\u5FF5\u903C\u683C\u592A\u9AD8\u592A\u62BD\u8C61\u4E86\uFF0C\u679C\u7136\u662F\u5927\u795E\u554A\u3002",paraId:19},{value:"\u4E0B\u9762\u6211\u4EEC\u6309\u51E1\u4EBA\u7684\u601D\u7EF4\u6765\u7406\u4E00\u7406",paraId:20},{value:"signal",paraId:20},{value:"\uFF0C\u6784\u5EFA\u4E00\u5957",paraId:20},{value:"signal",paraId:20},{value:"\u673A\u5236\u7684\u57FA\u672C\u6D41\u7A0B\u539F\u7406\u5982\u4E0B\uFF1A",paraId:20},{value:"\u7B2C1\u6B65\uFF1A \u8BA9\u72B6\u6001\u6570\u636E\u53EF\u89C2\u5BDF",paraId:21},{value:"\u8BA9\u72B6\u6001\u6570\u636E\u53D8\u6210",paraId:22},{value:"\u54CD\u5E94\u5F0F",paraId:22},{value:"\u6216\u8005",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:22},{value:"\uFF0C\u529E\u6CD5\u5C31\u662F\u4F7F\u7528",paraId:22},{value:"Proxy",paraId:22},{value:"\u6216\u8005",paraId:22},{value:"Object.defineProperty",paraId:22},{value:"\u7B49\u65B9\u6CD5\uFF0C\u5C06\u72B6\u6001\u6570\u636E\u53D8\u6210\u4E00\u4E2A",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:22},{value:"\u5BF9\u8C61\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u666E\u901A\u7684\u6570\u636E\u5BF9\u8C61\u3002",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:23},{value:"\u5BF9\u8C61\u7684\u4F5C\u7528\u5C31\u662F",paraId:23},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE",paraId:23},{value:"\uFF0C\u5F53\u72B6\u6001\u53D1\u751F\u8BFB\u5199\u53D8\u5316\u65F6\uFF0C\u5C31\u53EF\u4EE5\u6536\u96C6\u4F9D\u8D56\u4FE1\u606F\u3002",paraId:23},{value:"\u8BA9\u6570\u636E\u53EF\u89C2\u5BDF\u6709\u591A\u79CD\u65B9\u6CD5\uFF0C\u6BD4\u5982",paraId:24},{value:"mobx",paraId:24},{value:"\u5C31\u4E0D\u662F\u4F7F\u7528",paraId:24},{value:"Proxy",paraId:24},{value:"\uFF0C\u800C\u662F\u4F7F\u7528",paraId:24},{value:"Class",paraId:24},{value:"\u7684",paraId:24},{value:"get",paraId:24},{value:"\u5C5E\u6027\u6765\u5B9E\u73B0\u7684\u3002\u751A\u81F3\u4F60\u4E5F\u53EF\u4EE5\u7528\u81EA\u5DF1\u7684\u4E00\u5957",paraId:24},{value:"API",paraId:24},{value:"\u6765\u5B9E\u73B0\u3002\u53EA\u4E0D\u8FC7\u73B0\u5728\u666E\u904D\u4F7F\u7528",paraId:24},{value:"Proxy",paraId:24},{value:"\u5B9E\u73B0\u3002\u6838\u5FC3\u539F\u7406\u5C31\u662F\u8981",paraId:24},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE\uFF0C\u4ECE\u800C\u6536\u96C6\u4F9D\u8D56\u4FE1\u606F",paraId:24},{value:"\u3002",paraId:24},{value:"\u8BA9\u72B6\u6001\u6570\u636E\u53EF\u89C2\u5BDF\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u611F\u77E5\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u8FD9\u6837\u624D\u80FD\u8FDB\u884C\u4E0B\u4E00\u6B65\u7684\u54CD\u5E94\u3002\u611F\u77E5\u7684\u9897\u7C92\u5EA6\u8D8A\u7EC6\uFF0C\u5C31\u8D8A\u80FD\u5B9E\u73B0\u7EC6\u7C92\u5EA6\u66F4\u65B0\u3002",paraId:25},{value:"\u7B2C2\u6B65\uFF1A\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:26},{value:"\u7531\u4E8E\u53EF\u4EE5\u901A\u8FC7",paraId:27},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE",paraId:27},{value:"\uFF0C\u56E0\u6B64\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u77E5\u9053\u4EC0\u4E48\u65F6\u5019\u8BFB\u5199\u72B6\u6001\u4E86\uFF0C\u90A3\u4E48\u6211\u4EEC\u5C31\u53EF\u4EE5\u5728\u8BFB\u5199\u72B6\u6001\u65F6\uFF0C\u53D1\u5E03\u4E00\u4E2A",paraId:27},{value:"\u4FE1\u53F7",paraId:27},{value:"\uFF0C\u901A\u77E5\u8BA2\u9605\u8005\uFF0C\u72B6\u6001\u53D1\u751F\u4E86\u53D8\u5316\u3002",paraId:27},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u5C31\u9700\u8981\u4E00\u4E2A",paraId:28},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:28},{value:"\u7684\u673A\u5236\uFF0C\u6765\u767B\u8BB0\u4EC0\u4E48\u4FE1\u53F7\u53D1\u751F\u4E86\u53D8\u5316\uFF0C\u4EE5\u53CA\u8C01\u8BA2\u9605\u4E86\u8FD9\u4E2A\u4FE1\u53F7\u3002",paraId:28},{value:"\u60A8\u53EF\u4EE5\u4F7F\u7528\u7C7B\u4F3C",paraId:29},{value:"mitt",paraId:29},{value:"\u3001",paraId:29},{value:"EventEmitter",paraId:29},{value:"\u4E4B\u7C7B\u7684\u5E93\u6765\u6784\u5EFA",paraId:29},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:29},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u5199\u4E00\u4E2A\u3002",paraId:29},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:30},{value:"\u6700\u6838\u5FC3\u7684\u4E8B\u5B9E\u4E0A\u5C31\u662F\u4E00\u4E2A\u8BA2\u9605\u8868\uFF0C\u8BB0\u5F55\u4E86\u8C01\u8BA2\u9605\u4E86\u4EC0\u4E48\u4FE1\u53F7\uFF0C\u5728\u524D\u7AEF\u5C31\u662F\u54EA\u4E2ADOM\u6E32\u67D3\u51FD\u6570\uFF0C\u4F9D\u8D56\u4E8E\u54EA\u4E2A\u4FE1\u53F7\uFF08\u72B6\u6001\u53D8\u5316\uFF09\u3002",paraId:30},{value:"\u5EFA\u7ACB\u4E00\u4E2A\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u5EFA\u7ACB",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\u4E0E",paraId:31},{value:"\u72B6\u6001\u6570\u636E",paraId:31},{value:"\u4E4B\u95F4\u7684\u6620\u5C04\u5173\u7CFB\uFF0C\u5F53\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6839\u636E\u6B64\u6765\u67E5\u8BE2\u5230\u4F9D\u8D56\u4E8E\u8BE5\u72B6\u6001\u6570\u636E\u7684",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\uFF0C\u7136\u540E\u6267\u884C\u8FD9\u4E9B",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\uFF0C\u4ECE\u800C\u5B9E\u73B0",paraId:31},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:31},{value:"\u3002",paraId:31},{value:"\u7B2C3\u6B65\uFF1A\u6E32\u67D3\u51FD\u6570",paraId:32},{value:"\u63A5\u4E0B\u6765\u6211\u4EEC\u7F16\u5199",paraId:33},{value:"DOM",paraId:33},{value:"\u7684\u6E32\u67D3\u51FD\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:33},{value:`  function render() {
      element.textContent = countSignal.value.toString();
  }
`,paraId:34},{value:"\u5728\u6B64\u6E32\u67D3\u51FD\u6570\u4E2D\uFF1A",paraId:35},{value:"\u6211\u4EEC\u76F4\u63A5\u66F4\u65B0",paraId:36},{value:"DOM",paraId:36},{value:"\u5143\u7D20\uFF0C\u6CA1\u6709\u4EFB\u4F55\u7684",paraId:36},{value:"diff",paraId:36},{value:"\u7B97\u6CD5\uFF0C\u4E5F\u6CA1\u6709\u4EFB\u4F55\u7684",paraId:36},{value:"Virtual DOM",paraId:36},{value:"\u3002",paraId:36},{value:"\u51FD\u6570\u4F7F\u7528\u8BBF\u95EE\u72B6\u6001\u6570\u636E",paraId:36},{value:"count",paraId:36},{value:"\u6765\u66F4\u65B0",paraId:36},{value:"DOM",paraId:36},{value:"\u5143\u7D20\uFF0C\u7531\u4E8E\u72B6\u6001\u662F",paraId:36},{value:"\u53EF\u89C2\u5BDF\u7684",paraId:36},{value:"\uFF0C\u56E0\u6B64\u5F53\u6267\u884C",paraId:36},{value:"countSignal.value",paraId:36},{value:"\u65F6\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u62E6\u622A\u5230\u5BF9",paraId:36},{value:"count",paraId:36},{value:"\u7684\u8BBF\u95EE\uFF0C\u4E5F\u5C31\u662F\u8BF4\u6211\u4EEC\u6536\u96C6\u5230\u4E86\u8BE5",paraId:36},{value:"DOM",paraId:36},{value:"\u5143\u7D20\u4F9D\u8D56\u4E8E",paraId:36},{value:"count",paraId:36},{value:"\u72B6\u6001\u6570\u636E\u3002",paraId:36},{value:"\u6709\u4E86\u8FD9\u4E2A",paraId:36},{value:"DOM Render",paraId:36},{value:"\u548C",paraId:36},{value:"\u72B6\u6001\u6570\u636E",paraId:36},{value:"\u7684\u4F9D\u8D56\u5173\u7CFB\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5728",paraId:36},{value:"signal",paraId:36},{value:"\u7684\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u4E2D\u767B\u8BB0\u8FD9\u4E2A\u4F9D\u8D56\u5173\u7CFB.",paraId:36},{value:"\u6536\u96C6\u4F9D\u8D56\u7684\u4F5C\u7528\u5C31\u662F\u5EFA\u7ACB\u6E32\u67D3\u51FD\u6570\u4E0E\u72B6\u6001\u4E4B\u95F4\u7684\u5173\u7CFB\u3002",paraId:37},{value:"\u7B2C4\u6B65\uFF1A\u6CE8\u518C\u6E32\u67D3\u51FD\u6570",paraId:38},{value:"\u6700\u540E\u6211\u4EEC\u5C06",paraId:39},{value:"render",paraId:39},{value:"\u51FD\u6570\u6CE8\u518C\u5230",paraId:39},{value:"signal",paraId:39},{value:"\u7684\u8BA2\u9605\u8005\u5217\u8868\u4E2D\uFF0C\u5F53",paraId:39},{value:"count",paraId:39},{value:"\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u901A\u77E5",paraId:39},{value:"render",paraId:39},{value:"\u51FD\u6570\uFF0C\u4ECE\u800C\u66F4\u65B0",paraId:39},{value:"DOM",paraId:39},{value:"\u5143\u7D20\u3002",paraId:39},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u7B80\u5355\u7684",paraId:40,tocIndex:2},{value:"signal",paraId:40,tocIndex:2},{value:"\u7684\u793A\u4F8B\uFF0C\u6211\u4EEC\u521B\u5EFA\u4E00\u4E2A",paraId:40,tocIndex:2},{value:"signal",paraId:40,tocIndex:2},{value:"\u5BF9\u8C61",paraId:40,tocIndex:2},{value:"countSignal",paraId:40,tocIndex:2},{value:"\uFF0C\u5E76\u4E14\u521B\u5EFA\u4E00\u4E2A",paraId:40,tocIndex:2},{value:"DOM",paraId:40,tocIndex:2},{value:"\u5143\u7D20",paraId:40,tocIndex:2},{value:"countElement",paraId:40,tocIndex:2},{value:"\uFF0C\u5F53",paraId:40,tocIndex:2},{value:"countSignal",paraId:40,tocIndex:2},{value:"\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6211\u4EEC\u66F4\u65B0",paraId:40,tocIndex:2},{value:"countElement",paraId:40,tocIndex:2},{value:"\u7684",paraId:40,tocIndex:2},{value:"textContent",paraId:40,tocIndex:2},{value:"\u3002",paraId:40,tocIndex:2},{value:`        class Signal<T> {
          private _value: T;
          private _subscribers: Array<(value: T) => void> = [];
          constructor(initialValue: T) {
              this._value = initialValue;
          }
          get value(): T {
              return this._value;
          }
          set value(newValue: T) {
              if (this._value !== newValue) {
                  this._value = newValue;
                  this.notifySubscribers();
              }
          }
          subscribe(callback: (value: T) => void): () => void {
              this._subscribers.push(callback);
              return () => {
                  this._subscribers = this._subscribers.filter(subscriber => subscriber !== callback);
              };
          }

          private notifySubscribers() {
              this._subscribers.forEach(callback => callback(this._value));
          }
      }

      const countSignal = new Signal<number>(0);
      const countElement = document.getElementById('count')!;
      const incrementButton = document.getElementById('increment')!;

      function render() {
          countElement.textContent = countSignal.value.toString();
      }
      function increment() {
          countSignal.value += 1;
      }
      countSignal.subscribe(render);
      incrementButton.addEventListener('click', increment);
      render(); 
`,paraId:41},{value:`<h1>\u8BA1\u6570\u5668: <span id="count">0</span></h1>
<button id="increment">\u589E\u52A0</button>
`,paraId:42},{value:"\u90A3\u4E48\u6211\u4EEC\u5982\u4F55\u5728",paraId:43,tocIndex:3},{value:"React",paraId:43,tocIndex:3},{value:"\u4E2D\u4F7F\u7528",paraId:43,tocIndex:3},{value:"signal",paraId:43,tocIndex:3},{value:"\u5462\uFF1F",paraId:43,tocIndex:3},{value:"\u4ECE\u4E0A\u9762\u6211\u4EEC\u53EF\u4EE5\u77E5\u9053\uFF0C",paraId:44,tocIndex:3},{value:"signal",paraId:44,tocIndex:3},{value:"\u9A71\u52A8\u7684\u524D\u7AEF\u6846\u67B6\u662F\u5B8C\u5168\u4E0D\u9700\u8981",paraId:44,tocIndex:3},{value:"Virtual DOM",paraId:44,tocIndex:3},{value:"\u7684\u3002",paraId:44,tocIndex:3},{value:"\u800C\u672C\u8D28\u4E0A",paraId:45,tocIndex:3},{value:"React",paraId:45,tocIndex:3},{value:"\u5E76\u4E0D\u662F\u4E00\u4E2A",paraId:45,tocIndex:3},{value:"Signal",paraId:45,tocIndex:3},{value:"\u6846\u67B6\uFF0C\u5176\u6E32\u67D3\u8C03\u5EA6\u662F\u57FA\u4E8E",paraId:45,tocIndex:3},{value:"Virtual DOM",paraId:45,tocIndex:3},{value:"\u3001",paraId:45,tocIndex:3},{value:"fiber",paraId:45,tocIndex:3},{value:"\u548C",paraId:45,tocIndex:3},{value:"diff",paraId:45,tocIndex:3},{value:"\u7B97\u6CD5\u7684\u3002",paraId:45,tocIndex:3},{value:"\u56E0\u6B64\uFF0C",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u5E76\u4E0D\u652F\u6301",paraId:46,tocIndex:3},{value:"signal",paraId:46,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u9664\u6392\u672A\u6765",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u50CF",paraId:46,tocIndex:3},{value:"Vue",paraId:46,tocIndex:3},{value:"\u4E00\u6837\u5347\u7EA7",paraId:46,tocIndex:3},{value:"Vue Vapor mode",paraId:46,tocIndex:3},{value:"\u8FDB\u884C\u91CD\u5927\u5347\u7EA7\uFF0C\u629B\u5F03",paraId:46,tocIndex:3},{value:"Virtual DOM",paraId:46,tocIndex:3},{value:"\uFF0C\u5426\u5219\u5728",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u5728\u4E2D\u662F\u4E0D\u80FD\u771F\u6B63\u4F7F\u7528\u5982\u540C",paraId:46,tocIndex:3},{value:"solidjs",paraId:46,tocIndex:3},{value:"\u548C",paraId:46,tocIndex:3},{value:"Svelte",paraId:46,tocIndex:3},{value:"\u7684",paraId:46,tocIndex:3},{value:"signal",paraId:46,tocIndex:3},{value:"\u6982\u5FF5\u7684\u3002",paraId:46,tocIndex:3},{value:"\u4F46\u662F\u65E0\u8BBA\u662F",paraId:47,tocIndex:3},{value:"Virtual DOM",paraId:47,tocIndex:3},{value:"\u8FD8\u662F",paraId:47,tocIndex:3},{value:"signal",paraId:47,tocIndex:3},{value:"\uFF0C\u6838\u5FC3\u5747\u662F\u4E3A\u4E86\u89E3\u51B3",paraId:47,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:47,tocIndex:3},{value:"\u7684\u95EE\u9898\uFF0C\u4ECE\u800C\u63D0\u9AD8\u6E32\u67D3\u6027\u80FD\u3002",paraId:47,tocIndex:3},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7ED3\u5408",paraId:48,tocIndex:3},{value:"React",paraId:48,tocIndex:3},{value:"\u7684",paraId:48,tocIndex:3},{value:"React.memo",paraId:48,tocIndex:3},{value:"\u548C",paraId:48,tocIndex:3},{value:"useMemo",paraId:48,tocIndex:3},{value:"\u7B49\u65B9\u6CD5\u6765\u6A21\u62DF",paraId:48,tocIndex:3},{value:"signal",paraId:48,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u5B9E\u73B0",paraId:48,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:48,tocIndex:3},{value:"\u3002",paraId:48,tocIndex:3},{value:"\u8FD9\u6837\u6211\u4EEC\u5C31\u6709\u4E86",paraId:49,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:49,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u5176\u672C\u8D28\u4E0A\u662F\u4F7F\u7528",paraId:49,tocIndex:3},{value:"React.memo",paraId:49,tocIndex:3},{value:"\u5305\u88F9\u7684",paraId:49,tocIndex:3},{value:"ReactNode",paraId:49,tocIndex:3},{value:"\u7EC4\u4EF6\uFF0C\u5C06\u6E32\u67D3\u66F4\u65B0\u9650\u5236\u5728\u8F83\u7EC6\u7684\u8303\u56F4\u5185\u3002",paraId:49,tocIndex:3},{value:"\u6838\u5FC3\u662F\u4E00\u5957\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u5206\u53D1\u673A\u5236\uFF0C\u7528\u6765\u611F\u77E5\u72B6\u6001\u53D8\u5316\uFF0C\u7136\u540E\u901A\u8FC7\u4E8B\u4EF6\u5206\u53D1\u53D8\u5316\u3002",paraId:50,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6\u672C\u8D28\u4E0A\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u7684\u662FReact\u7EC4\u4EF6\uFF0C\u4F46\u4F7F\u7528",paraId:50,tocIndex:3},{value:"React.memo(()=>{.....},()=>true)",paraId:50,tocIndex:3},{value:"\u8FDB\u884C\u5305\u88C5\uFF0C",paraId:50,tocIndex:3},{value:"diff",paraId:50,tocIndex:3},{value:"\u603B\u662F\u8FD4\u56DE",paraId:50,tocIndex:3},{value:"true",paraId:50,tocIndex:3},{value:",\u7528\u6765\u9694\u79BB",paraId:50,tocIndex:3},{value:"DOM",paraId:50,tocIndex:3},{value:"\u6E32\u67D3\u8303\u56F4\u3002",paraId:50,tocIndex:3},{value:"\u7136\u540E\u5728\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u4F1A\u4ECE\u72B6\u6001\u5206\u53D1\u4E2D\u8BA2\u9605\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\u91CD\u65B0\u6E32\u67D3\u8BE5\u7EC4\u4EF6\u3002",paraId:50,tocIndex:3},{value:"\u7531\u4E8E",paraId:50,tocIndex:3},{value:"diff",paraId:50,tocIndex:3},{value:"\u603B\u662F\u8FD4\u56DE",paraId:50,tocIndex:3},{value:"true",paraId:50,tocIndex:3},{value:"\uFF0C\u56E0\u6B64\u91CD\u65B0\u6E32\u67D3\u5C31\u88AB\u7EA6\u675F\u5728\u4E86\u8BE5\u7EC4\u4EF6\u5185\u90E8\uFF0C\u4E0D\u4F1A\u5F15\u8D77\u8FDE\u9501\u53CD\u5E94\uFF0C\u4ECE\u800C\u5B9E\u73B0\u4E86",paraId:50,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:50,tocIndex:3},{value:"\u3002",paraId:50,tocIndex:3},{value:"\u4EE5\u4E0B\u662F",paraId:51,tocIndex:3},{value:"AutoStore",paraId:51,tocIndex:3},{value:"\u4E2D\u7684",paraId:51,tocIndex:3},{value:"signal",paraId:51,tocIndex:3},{value:"\u7684\u4E00\u4E2A\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:51,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6\u4EC5\u4EC5\u662F\u6A21\u62DF",paraId:52},{value:"signal",paraId:52},{value:"\u5B9E\u73B0\u4E86",paraId:52},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:52},{value:"\uFF0C\u5176\u672C\u8D28\u4E0A\u662F\u4F7F\u7528",paraId:52},{value:"React.memo",paraId:52},{value:"\u5305\u88F9\u7684",paraId:52},{value:"ReactNode",paraId:52},{value:"\u7EC4\u4EF6\u3002",paraId:52},{value:"\u521B\u5EFA",paraId:52},{value:"$",paraId:52},{value:"\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C",paraId:52},{value:"$",paraId:52},{value:"\u662F",paraId:52},{value:"signal",paraId:52},{value:"\u7684\u5FEB\u6377\u540D\u79F0\u3002\u56E0\u6B64\u4E0A\u9762\u7684",paraId:52},{value:"{$('age')}",paraId:52},{value:"\u7B49\u4EF7\u4E8E",paraId:52},{value:'{signal("age")}',paraId:52},{value:"\u3002",paraId:52},{value:"\u66F4\u591A\u7684",paraId:52},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:52},{value:"\u7684\u7528\u6CD5\u8BF7\u53C2\u8003",paraId:52},{value:"signal",paraId:53},{value:"\u3002",paraId:52},{value:"\u7531\u4E8E",paraId:54,tocIndex:5},{value:"React",paraId:54,tocIndex:5},{value:"\u6C89\u91CD\u7684\u5386\u53F2\u5305\u88B1\uFF0C\u5728\u53EF\u4EE5\u9884\u89C1\u7684\u672A\u6765\uFF0C",paraId:54,tocIndex:5},{value:"React",paraId:54,tocIndex:5},{value:"\u5E94\u8BE5\u4E0D\u4F1A\u652F\u6301\u771F\u6B63\u610F\u4E49\u4E0A\u7684",paraId:54,tocIndex:5},{value:"signal",paraId:54,tocIndex:5},{value:"\u3002",paraId:54,tocIndex:5},{value:"\u5728\u5361\u9882\u8001\u5E08`\u7684",paraId:55,tocIndex:5},{value:"Signal:\u66F4\u591A\u524D\u7AEF\u6846\u67B6\u7684\u9009\u62E9",paraId:55,tocIndex:5},{value:"\u4E2D\u4E5F\u63D0\u5230\uFF0C",paraId:55,tocIndex:5},{value:"React\u56E2\u961F\u6210\u5458\u5BF9\u6B64\u7684\u89C2\u70B9\u662F\uFF1A",paraId:56,tocIndex:5},{value:"\u6709\u53EF\u80FD\u5F15\u5165\u7C7B\u4F3C",paraId:57,tocIndex:5},{value:"Signal",paraId:57,tocIndex:5},{value:"\u7684\u539F\u8BED",paraId:57,tocIndex:5},{value:"Signal",paraId:57,tocIndex:5},{value:"\u6027\u80FD\u786E\u5B9E\u597D\uFF0C\u4F46\u4E0D\u592A\u7B26\u5408",paraId:57,tocIndex:5},{value:"React",paraId:57,tocIndex:5},{value:"\u7684\u7406\u5FF5",paraId:57,tocIndex:5},{value:"\u800C",paraId:58,tocIndex:5},{value:"AutoStore",paraId:58,tocIndex:5},{value:"\u6240\u652F\u6301\u7684",paraId:58,tocIndex:5},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:58,tocIndex:5},{value:"\u7684\u6982\u5FF5\uFF0C\u53EF\u4EE5\u89C6\u4E3A\u6A21\u62DF",paraId:58,tocIndex:5},{value:"signal",paraId:58,tocIndex:5},{value:"\u6216\u8005\u7C7B\u4F3C",paraId:58,tocIndex:5},{value:"Signal",paraId:58,tocIndex:5},{value:"\u7684\u539F\u8BED\uFF0C\u4F7F\u5F97\u6211\u4EEC\u53EF\u4EE5\u5728",paraId:58,tocIndex:5},{value:"React",paraId:58,tocIndex:5},{value:"\u4E2D\u5B9E\u73B0",paraId:58,tocIndex:5},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:58,tocIndex:5},{value:"\uFF0C\u800C\u4E0D\u7528\u518D\u53BB\u7EA0\u7ED3",paraId:58,tocIndex:5},{value:"React.memo",paraId:58,tocIndex:5},{value:"\u7684\u4F7F\u7528\u3002",paraId:58,tocIndex:5},{value:"\u81EA",paraId:59},{value:"React 19",paraId:59},{value:"\u5F00\u59CB,",paraId:59},{value:"React",paraId:59},{value:"\u5B98\u65B9\u63A8\u51FA",paraId:59},{value:"Compiler",paraId:59},{value:"\uFF0C\u5E2E\u52A9\u7528\u6237\u89E3\u51B3",paraId:59},{value:"React.memo",paraId:59},{value:"\u7684\u95EE\u9898\uFF0C\u51CF\u5C11\u7528\u6237\u7684\u5FC3\u667A\u8D1F\u62C5\u3002\u4F46\u662F\u5176\u5E76\u4E0D\u662F\u4E3A\u5173\u4E8E\u51B3\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u95EE\u9898\uFF0C\u800C\u662F\u4F18\u5316\u63D0\u9AD8",paraId:59},{value:"React",paraId:59},{value:`\u7684\u6027\u80FD\u3002
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},47738:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(36518);const l=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
\u652F\u6301\u591A\u79CD\u65B9\u5F0F\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u7684\u51FD\u6570`,paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u5C01\u88C5\u5355\u4E2A\u72B6\u6001\u6570\u636E
    (selector: string,options?:SignalComponentOptions):React.ReactNode
    // \u5C01\u88C5\u7EC4\u5408\u591A\u4E2A\u72B6\u6001\u6570\u636E
    (selector: (state:ComputedState<State>)=>React.ReactNode,options?:SignalComponentOptions):React.ReactNode
    // \u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570
    <Value=any>(render:SignalComponentRender,path:string | string[],options?:SignalComponentOptions):React.ReactNode
    // \u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570,\u4E14\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027
    <Value=any, Scope=any >(render:SignalComponentRender,getter:AsyncComputedGetter<Value,Scope>,options?:SignalComponentOptions):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:ComputedGetter<Value,Scope>,options?:SignalComponentOptions):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>,options?:SignalComponentOptions):React.ReactNode;
}
}
`,paraId:1,tocIndex:0},{value:"AutoStore",paraId:2,tocIndex:0},{value:"\u652F\u6301\u975E\u5E38\u7075\u6D3B\u7684\u4FE1\u53F7\u7EC4\u4EF6\u521B\u5EFA\u65B9\u5F0F\u3002",paraId:2,tocIndex:0},{value:"\u5373\u5C06\u5355\u4E2A\u72B6\u6001\u6570\u636E\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u8FD9\u662F\u6700\u7B80\u5355\u7684\u4FE1\u53F7\u7EC4\u4EF6\u521B\u5EFA\u65B9\u5F0F\u3002",paraId:3,tocIndex:1},{value:"\u5373\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:4,tocIndex:2},{value:"\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u5BF9\u72B6\u6001\u6570\u636E\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\u3002",paraId:5,tocIndex:3},{value:"\u4E0D\u9700\u8981\u9884\u5148\u5728",paraId:6,tocIndex:4},{value:"State",paraId:6,tocIndex:4},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\uFF0C\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\uFF08",paraId:6,tocIndex:4},{value:"computedObject",paraId:6,tocIndex:4},{value:"\uFF09\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:6,tocIndex:4},{value:"\u7531\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\uFF08",paraId:7,tocIndex:4},{value:"computedObject",paraId:7,tocIndex:4},{value:"\uFF09\u652F\u6301\u4E30\u5BCC\u7279\u6027\uFF0C\u7279\u522B\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u652F\u6301",paraId:7,tocIndex:4},{value:"retry",paraId:7,tocIndex:4},{value:"\u3001",paraId:7,tocIndex:4},{value:"timeout",paraId:7,tocIndex:4},{value:"\u3001",paraId:7,tocIndex:4},{value:"loading",paraId:7,tocIndex:4},{value:"\u3001",paraId:7,tocIndex:4},{value:"error",paraId:7,tocIndex:4},{value:"\u7B49\u5C5E\u6027\uFF0C\u56E0\u6B64\u53EF\u4EE5\u8BA9\u4FE1\u53F7\u7EC4\u4EF6\u5177\u6709\u66F4\u52A0\u4E30\u5BCC\u7684\u8868\u73B0\u529B\u529F\u80FD\u3002",paraId:7,tocIndex:4},{value:"\u4F7F\u7528",paraId:7,tocIndex:4},{value:"$(render,ObserverDescriptorBuilder)",paraId:7,tocIndex:4},{value:"\u65B9\u5F0F\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\uFF08",paraId:7,tocIndex:4},{value:"computedObject",paraId:7,tocIndex:4},{value:"\uFF09\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002\u521B\u5EFA\u51FD\u6570\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:7,tocIndex:4},{value:`<Value=any, Scope=any >(render:SignalComponentRender,getter:AsyncComputedGetter<Value,Scope>,options?:SignalComponentOptions):React.ReactNode
<Value=any, Scope=any >(render:SignalComponentRender,getter:ComputedGetter<Value,Scope>,options?:SignalComponentOptions):React.ReactNode
<Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>,options?:SignalComponentOptions):React.ReactNode;
}
`,paraId:8,tocIndex:4},{value:"\u9605\u8BFB\u524D\u6587\u4E8E",paraId:9},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:10},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:9},{value:"\u5373\u5C06\u76D1\u542C\u5C5E\u6027\u5BF9\u8C61\uFF08",paraId:11,tocIndex:5},{value:"watchObject",paraId:11,tocIndex:5},{value:"\uFF09\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:11,tocIndex:5},{value:"watch",paraId:12},{value:"\u548C",paraId:12},{value:"computed",paraId:12},{value:"\u5747\u662F",paraId:12},{value:"AutoStore",paraId:12},{value:"\u4E2D\u7684",paraId:12},{value:"ObserverObject",paraId:12},{value:`\u7684\u5B50\u7C7B\uFF0C\u4F46\u662F\u529F\u80FD\u662F\u4E0D\u4E00\u6837\u7684\u3002
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},99300:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(30399);const l=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
\u4F46\u662F\u524D\u63D0\u662F\u9700\u8981\u5728\u72B6\u6001\u4E2D\u9884\u5148\u58F0\u660E`,paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8BA1\u7B97\u5C5E\u6027\u3002\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`import { createStore } from '@autostorejs/react';
const store = createStore({
  order:{
    price:100,
    count:3,
    // \u7B80\u5355\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027
    total:(order)=>order.price * order.count
    // \u4F7F\u7528computed\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027
    totalAsync:computed(async (order)=>{
      await delay(1000)
      return order.price * order.count
    },['./price','./count'],{initial:100})
  }
})

// \u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6
const { state , $ } = store
()=>{
  return <>
    // \u7B80\u5355\u5730\u5C01\u88C5\u4E00\u4E2A\u72B6\u6001\u6570\u636E\u4E3A\u4FE1\u53F7\u7EC4\u4EF6
    {$('order.price')}
    // \u5C01\u88C5\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\u4E3A\u4FE1\u53F7\u7EC4\u4EF6
    {$('order.total')}
    {$('order.total.value')}
    // \u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570
    {$(({value})=>{....},'order.total')}
  </>
}
`,paraId:2,tocIndex:1},{value:"\u4EE5\u4E0A\u65B9\u6CD5\u7684\u524D\u63D0\u662F\u9700\u8981\u5728",paraId:3,tocIndex:1},{value:"State",paraId:3,tocIndex:1},{value:"\u4E2D\u9884\u5148\u58F0\u660E",paraId:3,tocIndex:1},{value:"computed",paraId:3,tocIndex:1},{value:"\u8BA1\u7B97\u5C5E\u6027\uFF0C\u7136\u540E\u6307\u5B9A\u72B6\u6001\u6570\u636E\u7684\u8DEF\u5F84\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:3,tocIndex:1},{value:"\u8FD9\u79CD\u65B9\u6CD5\u5728\u7EC4\u4EF6\u4E2D\u4F7F\u7528\u65F6\uFF0C\u4F1A\u6709\u4E00\u5B9A\u7684\u5C40\u9650\u6027\uFF0C\u56E0\u6B64\u6211\u4EEC\u63D0\u4F9B\u4E86\u4E00\u79CD\u66F4\u52A0\u7075\u6D3B\u7684\u65B9\u5F0F\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5373",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6",paraId:4,tocIndex:1},{value:"\u3002",paraId:4,tocIndex:1},{value:"\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:5,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
    <Value=any, Scope=any >(
        render:SignalComponentRender,
        getter:AsyncComputedGetter<Value,Scope>,
        options?:SignalComponentOptions
    ):React.ReactNode
    <Value=any, Scope=any >(
        render:SignalComponentRender,
        getter:ComputedGetter<Value,Scope>,
        options?:SignalComponentOptions
    ):React.ReactNode
    <Value=any, Scope=any >(
        render:SignalComponentRender,
        builder: ObserverDescriptorBuilder<string,Value,Scope>,
        options?:SignalComponentOptions
    ):React.ReactNode;
}
`,paraId:6,tocIndex:1},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:7,tocIndex:1},{value:"\u5F53\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u81EA\u52A8\u91CD\u65B0\u672C\u6E32\u67D3\u51FD\u6570\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:8,tocIndex:1},{value:"ReactNode",paraId:8,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:8,tocIndex:1},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u7C7B\u578B\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:9,tocIndex:1},{value:`type AsyncComputedValue<Value = any,ExtAttrs extends Dict = {}> ={
    value   : Value;                // \u72B6\u6001\u6570\u636E
    // \u4EE5\u4E0A\u5C5E\u6027\u4EC5\u5728\u76EE\u6807\u72B6\u6001\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\u6709\u6548
    loading : boolean;          
    progress: number;                // \u8FDB\u5EA6\u503C    
    timeout : number ;               // \u8D85\u65F6\u65F6\u95F4\uFF0C\u5355\u4F4Dms\uFF0C\u5F53\u542F\u7528\u8D85\u65F6\u65F6\u8FDB\u884C\u5012\u8BA1\u65F6
    error   : any;                   // \u6267\u884C\u51FA\u9519\u65F6\u7684\u9519\u8BEF\u4FE1\u606F
    retry   : number                 // \u91CD\u8BD5\u6B21\u6570\uFF0C\u5F53\u6267\u884C\u91CD\u8BD5\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u8FDB\u884C\u5012\u8BA1\u65F6\uFF0C\u6BCF\u6B21\u91CD\u8BD5-1\uFF0C\u76F4\u5230\u4E3A0\u65F6\u505C\u6B62\u91CD\u8BD5
    run     : (options?:RuntimeComputedOptions) => {};        // \u91CD\u65B0\u6267\u884C\u4EFB\u52A1
    cancel  : ()=>void                                        // \u4E2D\u6B62\u6B63\u5728\u6267\u884C\u7684\u5F02\u6B65\u8BA1\u7B97
  } & ExtAttrs

type SignalComponentRender<Value=any> =(value:AsyncComputedValue<Value>)=>React.ReactNode

`,paraId:10,tocIndex:1},{value:"\u53EF\u89C2\u5BDF\u5BF9\u8C61\u6784\u5EFA\u51FD\u6570",paraId:11,tocIndex:1},{value:"\u53EF\u89C2\u5BDF\u5BF9\u8C61",paraId:12,tocIndex:1},{value:" \u5305\u62EC",paraId:12,tocIndex:1},{value:"computed",paraId:12,tocIndex:1},{value:"\u548C",paraId:12,tocIndex:1},{value:"watch",paraId:12,tocIndex:1},{value:"\u4E24\u79CD\uFF0C\u56E0\u6B64\u5728\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u4E5F\u652F\u6301\u4F20\u5165\u4E00\u4E2A",paraId:12,tocIndex:1},{value:"ObserverDescriptorBuilder",paraId:12,tocIndex:1},{value:"\u6784\u5EFA\u51FD\u6570\uFF0C\u7528\u4E8E\u521B\u5EFA\u4E00\u4E2A\u53EF\u89C2\u5BDF\u5BF9\u8C61\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:12,tocIndex:1},{value:"\u2708\uFE0F\u901A\u4FD7\u5730\u8BF4\uFF0C\u5C31\u662F\u901A\u8FC7",paraId:13},{value:"builder",paraId:13},{value:"\u51FD\u6570\u521B\u5EFA\u4E00\u4E2A",paraId:13},{value:"computed",paraId:13},{value:"\u6216",paraId:13},{value:"watch",paraId:13},{value:"\u5BF9\u8C61\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:13},{value:"\u5728\u524D\u6587\u4E2D\u5173\u4E8E",paraId:14},{value:"computed",paraId:14},{value:"\u548C",paraId:14},{value:"watch",paraId:14},{value:"\u7AE0\u8282\u4E2D\uFF0C\u6211\u4EEC\u5DF2\u7ECF\u4ECB\u7ECD\u4E86\u5982\u4F55\u521B\u5EFA\u4E00\u4E2A",paraId:14},{value:"computed",paraId:14},{value:"\u6216",paraId:14},{value:"watch",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u8FD9\u91CC\u4E0D\u518D\u8D58\u8FF0\u3002",paraId:14},{value:"\u6211\u4EEC\u5148\u4ECE\u4E00\u4E2A\u7B80\u5355\u7684\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u6765\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:15,tocIndex:2},{value:`$(
    // \u6E32\u67D3\u51FD\u6570
    ({value})=>{
      return <div>{value}</div>
    },
    // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
    (scope)=>{
      return  scope.user.age
    }
) 
`,paraId:16,tocIndex:2},{value:"\u4EE5\u4E0A\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u521B\u5EFA\u4E86\u4E00\u4E2A\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u63D0\u4F9B\u4E86\u4E00\u4E2A\u6E32\u67D3\u51FD\u6570\u548C\u4E00\u4E2A",paraId:17,tocIndex:2},{value:"computed getter",paraId:17,tocIndex:2},{value:"\u51FD\u6570\uFF0C\u5F53",paraId:17,tocIndex:2},{value:"getter",paraId:17,tocIndex:2},{value:"\u51FD\u6570\u8FD4\u56DE\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u6E32\u67D3\u51FD\u6570\u3002",paraId:17,tocIndex:2},{value:"\u5728\u521B\u5EFA\u4FE1\u606F\u7EC4\u4EF6\u65F6\uFF0C\u4F1A",paraId:17,tocIndex:2},{value:"computed getter",paraId:17,tocIndex:2},{value:"\u51FD\u6570\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2A",paraId:17,tocIndex:2},{value:"computedObject",paraId:17,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:17,tocIndex:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u7684\u662F\u4E00\u4E2A\u540C\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u6E32\u67D3\u51FD\u6570\u3002\u5176\u5DE5\u4F5C\u539F\u7406\u4E0E",paraId:18},{value:"computed",paraId:18},{value:"\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:18},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u540C\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:19},{value:"\u4EE5\u4E0A\u7684\u4FE1\u53F7\u7EC4\u4EF6\u5747\u662F\u57FA\u4E8E",paraId:20},{value:"State",paraId:20},{value:"\u4E2D\u5DF2\u7ECF\u58F0\u660E\u7684",paraId:20},{value:"computed",paraId:20},{value:"\u8BA1\u7B97\u5C5E\u6027\u521B\u5EFA\u7684\u3002\u4E5F\u652F\u6301",paraId:20},{value:"\u52A8\u6001\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6",paraId:20},{value:"\u3002",paraId:20},{value:"\u5BF9\u4E8E\u540C\u6B65\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:21,tocIndex:3},{value:"computed",paraId:21,tocIndex:3},{value:"\u51FD\u6570\u5C01\u88C5\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u4EE5\u4E0A\u4F8B\u529F\u80FD\u662F\u4E00\u6837\u7684\uFF0C\u5DEE\u522B\u5728\u4E8E\u5F53\u4F7F\u7528",paraId:21,tocIndex:3},{value:"computed",paraId:21,tocIndex:3},{value:"\u65F6\uFF0C\u53EF\u4EE5\u914D\u7F6E",paraId:21,tocIndex:3},{value:"computed",paraId:21,tocIndex:3},{value:"\u53C2\u6570\u3002",paraId:21,tocIndex:3},{value:`$(
    // \u6E32\u67D3\u51FD\u6570
    ({value})=>{
      return <div>{value}</div>
    },
    // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
    computed((scope)=>{
      return  scope.user.age
    })
) 
`,paraId:22,tocIndex:3},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u540C\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:23,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u4F46\u662F\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u521B\u5EFA\u65B9\u5F0F\u4E0E\u540C\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u6709\u6240\u4E0D\u540C\u3002",paraId:24,tocIndex:4},{value:`<Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},20398:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(8809);const l=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
    <Value=any>(
      render:SignalComponentRender,    // \u6E32\u67D3\u51FD\u6570
      path:string | string[],           // \u72B6\u6001\u6570\u636E\u8DEF\u5F84,
      options?:SignalComponentOptions
    ):React.ReactNode 
}
`,paraId:2,tocIndex:1},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4F7F\u7528",paraId:3,tocIndex:2},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:2},{value:"\u5C06",paraId:3,tocIndex:2},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:2},{value:"\uFF0C\u4F46\u662F\u7F3A\u5C11\u66F4\u591A\u7684\u63A7\u5236\uFF0C\u6B64\u65F6\u4E5F\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u3002",paraId:3,tocIndex:2},{value:`<Value=any>(render:SignalComponentRender,path:string | string[]):React.ReactNode
`,paraId:4,tocIndex:2},{value:"\u5C06",paraId:5,tocIndex:2},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:2},{value:"\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u65B9\u5F0F\u5982\u4E0B\uFF1A",paraId:5,tocIndex:2},{value:`$(
    // \u6E32\u67D3\u51FD\u6570
    ({value})=>{
      return <div>{value}</div>
    },
    // \u72B6\u6001\u6570\u636E\u7684\u8DEF\u5F84
    'user.age'
  )
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},67082:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(95687);const l=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},11344:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(13539);const l=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    (selector: (state:ComputedState<State>)=>React.ReactNode):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},73497:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(43310);const l=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
\u800C\u76D1\u542C\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06`,paraId:1,tocIndex:1},{value:"watchObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"watchObject",paraId:1,tocIndex:1},{value:"\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:1,tocIndex:1},{value:"\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
    <Value=any, Scope=any >(render:SignalComponentRender,getter:AsyncComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:ComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
}
`,paraId:3,tocIndex:1},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:4,tocIndex:1},{value:"\u5F53\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u81EA\u52A8\u91CD\u65B0\u672C\u6E32\u67D3\u51FD\u6570\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:5,tocIndex:1},{value:"ReactNode",paraId:5,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u7C7B\u578B\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:6,tocIndex:1},{value:`type AsyncComputedValue<Value = any,ExtAttrs extends Dict = {}> ={
    value   : Value;                // \u72B6\u6001\u6570\u636E
    // \u4EE5\u4E0A\u5C5E\u6027\u4EC5\u5728\u76EE\u6807\u72B6\u6001\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\u6709\u6548
    loading : boolean;          
    progress: number;                // \u8FDB\u5EA6\u503C    
    timeout : number ;               // \u8D85\u65F6\u65F6\u95F4\uFF0C\u5355\u4F4Dms\uFF0C\u5F53\u542F\u7528\u8D85\u65F6\u65F6\u8FDB\u884C\u5012\u8BA1\u65F6
    error   : any;
    retry   : number                 // \u91CD\u8BD5\u6B21\u6570\uFF0C\u5F53\u6267\u884C\u91CD\u8BD5\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u8FDB\u884C\u5012\u8BA1\u65F6\uFF0C\u6BCF\u6B21\u91CD\u8BD5-1\uFF0C\u76F4\u5230\u4E3A0\u65F6\u505C\u6B62\u91CD\u8BD5
    run     : (options?:RuntimeComputedOptions) => {};        // \u91CD\u65B0\u6267\u884C\u4EFB\u52A1
    cancel  : ()=>void                                        // \u4E2D\u6B62\u6B63\u5728\u6267\u884C\u7684\u5F02\u6B65\u8BA1\u7B97
  } & ExtAttrs

type SignalComponentRender<Value=any> =(value:AsyncComputedValue<Value>)=>React.ReactNode

`,paraId:7,tocIndex:1},{value:"\u53EF\u89C2\u5BDF\u5BF9\u8C61\u6784\u5EFA\u51FD\u6570",paraId:8,tocIndex:1},{value:"\u53EF\u89C2\u5BDF\u5BF9\u8C61",paraId:9,tocIndex:1},{value:" \u5305\u62EC",paraId:9,tocIndex:1},{value:"computed",paraId:9,tocIndex:1},{value:"\u548C",paraId:9,tocIndex:1},{value:"watch",paraId:9,tocIndex:1},{value:"\u4E24\u79CD\uFF0C\u56E0\u6B64\u5728\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u4E5F\u652F\u6301\u4F20\u5165\u4E00\u4E2A",paraId:9,tocIndex:1},{value:"ObserverDescriptorBuilder",paraId:9,tocIndex:1},{value:"\u6784\u5EFA\u51FD\u6570\uFF0C\u7528\u4E8E\u521B\u5EFA\u4E00\u4E2A\u53EF\u89C2\u5BDF\u5BF9\u8C61\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:1},{value:"\u2708\uFE0F\u901A\u4FD7\u5730\u8BF4\uFF0C\u5C31\u662F\u901A\u8FC7",paraId:10},{value:"builder",paraId:10},{value:"\u51FD\u6570\u521B\u5EFA\u4E00\u4E2A",paraId:10},{value:"computed",paraId:10},{value:"\u6216",paraId:10},{value:"watch",paraId:10},{value:"\u5BF9\u8C61\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:10},{value:"\u5728\u524D\u6587\u4E2D\u5173\u4E8E",paraId:11},{value:"computed",paraId:11},{value:"\u548C",paraId:11},{value:"watch",paraId:11},{value:"\u7AE0\u8282\u4E2D\uFF0C\u6211\u4EEC\u5DF2\u7ECF\u4ECB\u7ECD\u4E86\u5982\u4F55\u521B\u5EFA\u4E00\u4E2A",paraId:11},{value:"computed",paraId:11},{value:"\u6216",paraId:11},{value:"watch",paraId:11},{value:"\u5BF9\u8C61\uFF0C\u8FD9\u91CC\u4E0D\u518D\u8D58\u8FF0\u3002",paraId:11},{value:"\u6211\u4EEC\u5148\u4ECE\u4E00\u4E2A\u7B80\u5355\u7684\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u6765\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:12,tocIndex:2},{value:`$(
    // \u6E32\u67D3\u51FD\u6570
    ({value})=>{
      return <div>{value}</div>
    },
    // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
    (scope)=>{
      return  scope.user.age
    }
) 
`,paraId:13,tocIndex:2},{value:"\u4EE5\u4E0A\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u521B\u5EFA\u4E86\u4E00\u4E2A\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u63D0\u4F9B\u4E86\u4E00\u4E2A\u6E32\u67D3\u51FD\u6570\u548C\u4E00\u4E2A",paraId:14,tocIndex:2},{value:"computed getter",paraId:14,tocIndex:2},{value:"\u51FD\u6570\uFF0C\u5F53",paraId:14,tocIndex:2},{value:"getter",paraId:14,tocIndex:2},{value:"\u51FD\u6570\u8FD4\u56DE\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u6E32\u67D3\u51FD\u6570\u3002",paraId:14,tocIndex:2},{value:"\u5728\u521B\u5EFA\u4FE1\u606F\u7EC4\u4EF6\u65F6\uFF0C\u4F1A",paraId:14,tocIndex:2},{value:"computed getter",paraId:14,tocIndex:2},{value:"\u51FD\u6570\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2A",paraId:14,tocIndex:2},{value:"computedObject",paraId:14,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:14,tocIndex:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u7684\u662F\u4E00\u4E2A\u540C\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u6E32\u67D3\u51FD\u6570\u3002\u5176\u5DE5\u4F5C\u539F\u7406\u4E0E",paraId:15},{value:"computed",paraId:15},{value:"\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:15},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u540C\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:16},{value:"\u4EE5\u4E0A\u7684\u4FE1\u53F7\u7EC4\u4EF6\u5747\u662F\u57FA\u4E8E",paraId:17},{value:"State",paraId:17},{value:"\u4E2D\u5DF2\u7ECF\u58F0\u660E\u7684",paraId:17},{value:"computed",paraId:17},{value:"\u8BA1\u7B97\u5C5E\u6027\u521B\u5EFA\u7684\u3002\u4E5F\u652F\u6301",paraId:17},{value:"\u52A8\u6001\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u7136\u540E\u518D\u57FA\u4E8E\u6B64\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6",paraId:17},{value:"\u3002",paraId:17},{value:"\u5BF9\u4E8E\u540C\u6B65\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:18,tocIndex:3},{value:"computed",paraId:18,tocIndex:3},{value:"\u51FD\u6570\u5C01\u88C5\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u4EE5\u4E0A\u4F8B\u529F\u80FD\u662F\u4E00\u6837\u7684\uFF0C\u5DEE\u522B\u5728\u4E8E\u5F53\u4F7F\u7528",paraId:18,tocIndex:3},{value:"computed",paraId:18,tocIndex:3},{value:"\u65F6\uFF0C\u53EF\u4EE5\u914D\u7F6E",paraId:18,tocIndex:3},{value:"computed",paraId:18,tocIndex:3},{value:"\u53C2\u6570\u3002",paraId:18,tocIndex:3},{value:`$(
    // \u6E32\u67D3\u51FD\u6570
    ({value})=>{
      return <div>{value}</div>
    },
    // \u540C\u6B65computed getter\u83B7\u53D6\u72B6\u6001\u6570\u636E
    computed((scope)=>{
      return  scope.user.age
    })
) 
`,paraId:19,tocIndex:3},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u540C\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:20,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u4F46\u662F\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u521B\u5EFA\u65B9\u5F0F\u4E0E\u540C\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u6709\u6240\u4E0D\u540C\u3002",paraId:21,tocIndex:4},{value:`<Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},18302:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(36586);const l=[]},87175:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(75697);const l=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF0C\u5C31\u662F\u4E00\u4E2A\u4E8B\u4EF6\u5206\u53D1\u5668\uFF0C\u5C31\u5982\u4F55",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u3001",paraId:6,tocIndex:3},{value:"eventemitter2",paraId:6,tocIndex:3},{value:"\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},23409:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(76933);const l=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},91445:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(26437);const l=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},93236:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(46574);const l=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
  initial: State,
  options?:AutoStoreOptions<State>
):AutoStore<State>
`,paraId:4,tocIndex:0},{value:"\u793A\u4F8B",paraId:5,tocIndex:0},{value:`
const store = createStore({
  price:100,
  count:2,
  total:(scope)=>{
    return scope.price * scope.count
  }
})

const { state, $, watch  } = store

`,paraId:6,tocIndex:0},{value:"\u521B\u5EFA\u597D",paraId:7,tocIndex:0},{value:"store",paraId:7,tocIndex:0},{value:"\u5BF9\u8C61\u540E\uFF0C\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:0},{value:"store.state",paraId:7,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u8BBF\u95EE\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:0},{value:"\u8BBF\u95EE\u72B6\u6001\u6570\u636E",paraId:8,tocIndex:0},{value:": ",paraId:8,tocIndex:0},{value:"store.state.price",paraId:8,tocIndex:0},{value:"\u4FEE\u6539\u72B6\u6001\u6570\u636E",paraId:9,tocIndex:0},{value:": ",paraId:9,tocIndex:0},{value:"store.state.price = 200",paraId:9,tocIndex:0},{value:"\uFF0C\u8FD9\u6837\u4F1A\u89E6\u53D1",paraId:9,tocIndex:0},{value:"total",paraId:9,tocIndex:0},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u56E0\u4E3A\u5176\u4F9D\u8D56\u4E8E",paraId:9,tocIndex:0},{value:"price",paraId:9,tocIndex:0},{value:"\u548C",paraId:9,tocIndex:0},{value:"count",paraId:9,tocIndex:0},{value:"\u3002",paraId:9,tocIndex:0},{value:"\u76D1\u542C\u72B6\u6001\u6570\u636E\u53D8\u5316",paraId:10,tocIndex:0},{value:": ",paraId:10,tocIndex:0},{value:'watch("count",callback)',paraId:10,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u56DE\u8C03\u51FD\u6570\u3002",paraId:10,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:11,tocIndex:0},{value:": ",paraId:11,tocIndex:0},{value:"$('total')",paraId:11,tocIndex:0},{value:"\u7528\u6765\u521B\u5EFA",paraId:11,tocIndex:0},{value:"React",paraId:11,tocIndex:0},{value:"\u7EC4\u4EF6\uFF0C\u8BE5\u7EC4\u4EF6\u4F1A\u5728",paraId:11,tocIndex:0},{value:"total",paraId:11,tocIndex:0},{value:"\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u91CD\u65B0\u6E32\u67D3\uFF0C\u4ECE\u800C\u5B9E\u73B0\u6700\u7EC6\u7C92\u5EA6\u7684\u7EC4\u4EF6\u66F4\u65B0\u3002",paraId:11,tocIndex:0},{value:"\u4E00\u822C\u4F7F\u7528",paraId:12,tocIndex:1},{value:"createStore",paraId:12,tocIndex:1},{value:"\u521B\u5EFA\u5168\u5C40\u72B6\u6001\u5BF9\u8C61\uFF0C\u5982\u679C\u9700\u8981\u5728\u7EC4\u4EF6\u4E2D\u4F7F\u7528\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:12,tocIndex:1},{value:"useStore",paraId:12,tocIndex:1},{value:"\u6765\u83B7\u521B\u5EFA\u3002",paraId:12,tocIndex:1},{value:"createStore",paraId:13,tocIndex:2},{value:"\u65B9\u6CD5\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u914D\u7F6E\uFF0C\u7528\u6765\u914D\u7F6E",paraId:13,tocIndex:2},{value:"Store",paraId:13,tocIndex:2},{value:"\u7684\u884C\u4E3A\u3002",paraId:13,tocIndex:2},{value:`
export type AutoStoreOptions<State extends Dict> = {
    /**
     * \u63D0\u4F9B\u4E00\u4E2Aid\uFF0C\u7528\u4E8E\u6807\u8BC6\u5F53\u524Dstore
     */
    id?:string

    /**
     * \u662F\u5426\u542F\u7528\u8C03\u8BD5\u6A21\u5F0F
     * @description
     * 
     * \u8C03\u8BD5\u6A21\u5F0F\u4E0B\u4F1A\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u4E00\u4E9B\u65E5\u5FD7\u4FE1\u606F
     * 
     */
    debug?:boolean 

    /**
     *  \u662F\u5426\u9A6C\u4E0A\u521B\u5EFA\u52A8\u6001\u5BF9\u8C61
     * 
     * 
     * @description
     * 
     * \u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u51FD\u6570\u4EC5\u5728\u7B2C\u4E00\u6B21\u8BFB\u53D6\u65F6\u6267\u884C,
     * \u5982\u679Clazy=true\u65F6\uFF0C\u5219\u5EF6\u8FDF\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61
     * 
     * @default true
     * 
    */
    lazy?: boolean 
    /**
      * \u662F\u5426\u542F\u7528\u8BA1\u7B97
      * 
      * @description
      * 
      * \u5F53enableComputed=false\u65F6\uFF0C\u4F1A\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4F46\u4E0D\u4F1A\u6267\u884C\u8BA1\u7B97\u51FD\u6570
      * \u53EF\u4EE5\u901A\u8FC7enableComputed\u65B9\u6CD5\u542F\u7528
      * 
      * \u76F8\u5F53\u4E8E\u5168\u5C40\u8BA1\u7B97\u603B\u5F00\u5173
      * 
      *       
      * 
    */
    enableComputed?:boolean
    
    /**
     * \u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u6839scope
     * 
     * @description
     * 
     * \u8BA1\u7B97\u51FD\u6570\u5728\u83B7\u53D6scope\u65F6\u8C03\u7528\uFF0C\u5141\u8BB8\u4FEE\u6539\u5176\u6839scope
     * 
     * \u9ED8\u8BA4\u6307\u5411\u7684\u662F\u5F53\u524D\u6839\u5BF9\u8C61\uFF0C\u6B64\u5904\u53EF\u4EE5\u4FEE\u6539\u5176\u6307\u5411
     * 
     * \u6BD4\u5982,return  state.fields\uFF0C\u4EE3\u8868\u8BA1\u7B97\u51FD\u6570\u7684\u6839\u6307\u5411state.fields
     * \u8FD9\u6837\u5728\u6307\u5B9A\u4F9D\u8D56\u65F6\uFF0C\u5982depends="count"\uFF0C\u5219\u4F1A\u81EA\u52A8\u8F6C\u6362\u4E3Astate.fields.count
     * 
     */
    getRootScope?:(state:State,options:{computedType:ObserverType, valuePath:string[] | undefined}) => any

    /**
     * 
     * \u4E3A\u6240\u6709\u52A8\u6001\u503C\u5BF9\u8C61\u63D0\u4F9B\u9ED8\u8BA4\u7684scope\u53C2\u6570
     *    
     * @description
     * \u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u6240\u6709computedObject,watchObject\u7684scope\u53C2\u6570\u5747\u4E3ACURRENT
     * \u53EF\u4EE5\u901A\u8FC7\u6B64\u53C2\u6570\u6765\u4E3A\u6240\u6709\u7684computedObject,watchObject\u63D0\u4F9B\u9ED8\u8BA4\u7684scope\u53C2\u6570
     * \u6BD4\u5982\u8BA9\u6240\u6709\u7684computedObject,watchObject\u7684\u9ED8\u8BA4scope\u53C2\u6570\u5747\u4E3AROOT 
     * 
     */
    scope?: ComputedScope
    /**
     * \u5F53\u542F\u7528debug=true\u65F6\u7528\u6765\u8F93\u51FA\u65E5\u5FD7\u4FE1\u606F
     * 
     * @param message 
     * @param level 
     * @returns 
     */
    log?:(message:any,level?:'log' | 'error' | 'warn')=>void  
    
    /**
     * 
     * \u5F53\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u8C03\u7528
     * 
     * @description
     * 
     * \u5141\u8BB8\u5728\u6B64\u5BF9\u8BA1\u7B97\u5BF9\u8C61\u8FDB\u884C\u4E00\u4E9B\u5904\u7406\uFF0C\u6BD4\u5982\u91CD\u65B0\u5C01\u88C5getter\u51FD\u6570\uFF0C\u6216\u8005\u76F4\u63A5\u4FEE\u6539ComputedOptions
     * 
     * @example
     * 
     * createStore({...},{
     *  onCreateComputed(computedObject){
     *      const oldGetter = computedObject.getter
     *      computedObject.getter = function(){
     *          do something
     *          return oldGetter.call(this,...arguments) 
     *      }
     *  }
     * })  
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedCreated?:(this:AutoStore<State>,computedObject:ComputedObject)=> void
    
    /**
     * \u5F53\u6BCF\u4E00\u6B21\u8BA1\u7B97\u5B8C\u6210\u540E\u8C03\u7528
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedDone?:(this:AutoStore<State>,args:{id:string,path:string[],value:any,computedObject:ComputedObject})=> void

    /**
     * \u5F53\u8BA1\u7B97\u51FA\u9519\u65F6\u8C03\u7528
     * @param this 
     * @param error 
     * @param computedObject 
     * @returns 
     */    
    onComputedError?:(this:AutoStore<State>,args:{id:string,path:string[],error:Error,computedObject:ComputedObject})=> void
    /**
     * \u5F53\u6BCF\u4E00\u6B21\u8BA1\u7B97\u5BF9\u8C61\u88AB\u53D6\u6D88\u65F6\u8C03\u7528
     * \u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u6709\u6548
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedCancel?:(this:AutoStore<State>,args:{id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject<any>})=> void

}
`,paraId:14,tocIndex:2}]},13158:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(88015);const l=[{value:"\u6839\u636E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684",paraId:0,tocIndex:0},{value:"\u57FA\u672C\u539F\u7406",paraId:1,tocIndex:0},{value:"\uFF0C\u5176\u5185\u7F6E\u4E86\u4E00\u4E2A\u72B6\u6001\u53D8\u5316\u4E8B\u4EF6\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:`\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002
\u901A\u8FC7\u4FA6\u542C\u4E8B\u4EF6\u5C31\u53EF\u4EE5\u4F7F\u7528`,paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:3,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.useWatch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"store",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:3,tocIndex:0}]},61040:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(89809);const l=[{value:"useWatch",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u7528\u6765\u4FA6\u542C",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\uFF0C\u672C\u8D28\u4E0A\u662F\u5BF9",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u7684\u5C01\u88C5\u3002",paraId:0,tocIndex:0},{value:"useWatch",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export interface UseWatchType {
    <Value>(selector: string,listener:WatchListener<Value>,options?:WatchListenerOptions): void
    <Value>(selector: string[],listener:WatchListener<Value>,options?:WatchListenerOptions): void  
}
`,paraId:2,tocIndex:0},{value:"\u4F7F\u7528\u65B9\u6CD5\u4E0E",paraId:3,tocIndex:0},{value:"store.watch",paraId:3,tocIndex:0},{value:"\u4E00\u81F4\uFF0C\u53EA\u662F",paraId:3,tocIndex:0},{value:"useWatch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\u4F1A\u5728\u7EC4\u4EF6\u9500\u6BC1\u65F6\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:3,tocIndex:0},{value:"\u5B9E\u8D28\u4E0A",paraId:4,tocIndex:0},{value:"useWatch",paraId:4,tocIndex:0},{value:"\u51FD\u6570\u662F\u5BF9",paraId:4,tocIndex:0},{value:"store.watch",paraId:4,tocIndex:0},{value:"\u7684\u5C01\u88C5\uFF0C\u5176\u5185\u90E8\u5B9E\u73B0\u5982\u4E0B\uFF1A",paraId:4,tocIndex:0},{value:`()=>{        
      const deps = arguments[0]
      const listener = arguments[1]
      const options = arguments[2] as WatchListenerOptions
      useEffect(() => { 
          const watcher = store.watch(deps,listener,options)
          return ()=>watcher.off()
      },[])        
  } 
`,paraId:5,tocIndex:0}]},54834:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(32453);const l=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6240\u6709\u5728\u72B6\u6001\u4E2D\u76F4\u63A5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u58F0\u660E\u7684\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u5E94",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:"\u4EE5\u4E0B\u662F\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF\u7684\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:2,tocIndex:0},{value:"\u540C",paraId:3,tocIndex:2},{value:"computed",paraId:3,tocIndex:2},{value:"\u4E00\u6837\uFF0C\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E",paraId:3,tocIndex:2},{value:"watch",paraId:3,tocIndex:2},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:3,tocIndex:2},{value:"store.watchObjects.create",paraId:3,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61",paraId:3,tocIndex:2},{value:"create",paraId:4,tocIndex:2},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:2},{value:`  create<Value=any,DependValue=any>(
    getter:WatchGetter<Value,DependValue>,
    filter?:WatchDependFilter<DependValue>,
    options?:Omit<WatchOptions<Value>,'filter'>
):WatchObject<Value>   
`,paraId:5,tocIndex:2},{value:"\u793A\u4F8B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';

const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher"
  }
})

// \u540C\u6B65\u8BA1\u7B97\u5C5E\u6027
const obj = store.computedObject.create((user)=>user.firstName+user.lastName)
// \u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
const obj = store.computedObject.create(
  async (user)=>user.firstName+user.lastName,  // \u8BA1\u7B97\u51FD\u6570
  ['./firstName','./lastName'],                // \u274C \u4E0D\u652F\u6301\u76F8\u5BF9\u4F9D\u8D56
  ['user.firstName','user.lastName'],          // \u2705 \u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56
  {...options....}                             // \u53C2\u6570
)

`,paraId:7,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u76D1\u542C\u5BF9\u8C61\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684",paraId:9,tocIndex:2},{value:"associated=false",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u76D1\u542C\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:9,tocIndex:2},{value:"obj.value",paraId:9,tocIndex:2},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:9,tocIndex:2},{value:"\u540C",paraId:10,tocIndex:3},{value:"ComputedObject",paraId:10,tocIndex:3},{value:"\u4E00\u6837\uFF0C",paraId:10,tocIndex:3},{value:"WatchObject",paraId:10,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u624B\u52A8\u6267\u884C\uFF0C\u901A\u8FC7",paraId:10,tocIndex:3},{value:'store.watchObjects.get("<id>").run()',paraId:10,tocIndex:3},{value:"\u6765\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:10,tocIndex:3}]},27121:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(30264);const l=[{value:"@autostorejs/react",paraId:0,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:0,tocIndex:1},{value:"watch",paraId:0,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:0,tocIndex:1},{value:"state",paraId:0,tocIndex:1},{value:"\u4E2D\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5BF9\u8C61,\u7136\u540E\u76D1\u542C\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E\u6240\u5728\u8DEF\u5F84\u3002",paraId:0,tocIndex:1},{value:"watch",paraId:1,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:"\u5728\u72B6\u6001\u4E2D\u7684\u4EFB\u610F\u4F4D\u7F6E\uFF0C\u4F7F\u7528",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u6765\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5668\u5BF9\u8C61\u3002",paraId:2,tocIndex:1},{value:"\u5728",paraId:2,tocIndex:1},{value:"createStore",paraId:2,tocIndex:1},{value:"\u6267\u884C\u540E\uFF0C\u4F1A\u626B\u63CF\u72B6\u6001\u6570\u636E\uFF0C\u5982\u679C\u53D1\u73B0\u4E00\u4E2A\u503C\u662F",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:",\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u76D1\u542C",paraId:2,tocIndex:1},{value:"State",paraId:2,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:1},{value:"\u521B\u5EFA\u7684",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4F1A\u4FDD\u5B58\u5728",paraId:2,tocIndex:1},{value:"Store",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"watchObjects",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4E2D",paraId:2,tocIndex:1},{value:"\u5F53\u6240\u76D1\u542C\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u8C03\u7528",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"getter",paraId:2,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8FD4\u56DE\u7ED3\u679C\u5199\u5165\u5230\u58F0\u660E",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:1},{value:"watch",paraId:3,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:2},{value:`// \u76D1\u542Cfilter\u8FC7\u6EE4\u540E\u7684
function watch<Value=any, DependValue=any>(
  getter:WatchGetter<Value,DependValue>,
  filter?:WatchDependFilter<DependValue>,
  options?:Omit<WatchOptions<Value>,'filter'>
):WatchDescriptorBuilder<Value>
// \u76D1\u542C\u5168\u90E8
function watch<Value=any, DependValue=any>(
  getter:WatchGetter<Value,DependValue>,
  options?:Omit<WatchOptions<Value>,'filter'>
):WatchDescriptorBuilder<Value>
`,paraId:4,tocIndex:2},{value:"watch",paraId:5,tocIndex:2},{value:"\u51FD\u6570\u57FA\u672C\u4F7F\u7528\u5982\u4E0B\uFF1A",paraId:5,tocIndex:2},{value:"\u5728\u4EE5\u4E0A\u4F8B\u5B50\u4E2D\uFF1A",paraId:6},{value:"watch",paraId:7},{value:"\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F",paraId:7},{value:"getter",paraId:7},{value:"\u51FD\u6570\uFF0C\u8D1F\u8D23\u5728\u4F9D\u8D56\u53D8\u5316\u65F6\u8BA1\u7B97\u65B0\u503C\u3002",paraId:7},{value:"getter",paraId:7},{value:"\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:7},{value:"watch",paraId:7},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:7},{value:"watch",paraId:8},{value:"\u51FD\u6570\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u8FC7\u6EE4\u51FD\u6570\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\u4F1A\u8C03\u7528\u6B64\u65B9\u6CD5\uFF0C\u5982\u679C\u8FD4\u56DE",paraId:8},{value:"true",paraId:8},{value:"\u624D\u4F1A\u6267\u884C",paraId:8},{value:"getter",paraId:8},{value:"initial",paraId:9},{value:"\u5C5E\u6027\u7528\u6765\u914D\u7F6E",paraId:9},{value:"watch",paraId:9},{value:"\u51FD\u6570\u6240\u5728\u4F4D\u7F6E\u7684",paraId:9},{value:"total",paraId:9},{value:"\u7684\u521D\u59CB\u503C\u3002",paraId:9},{value:"watch",paraId:10,tocIndex:3},{value:"\u7684",paraId:10,tocIndex:3},{value:"getter",paraId:10,tocIndex:3},{value:"\u53C2\u6570\u53EA\u80FD\u662F\u4E00\u4E2A",paraId:10,tocIndex:3},{value:"\u540C\u6B65\u51FD\u6570",paraId:10,tocIndex:3},{value:"\uFF0C\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:10,tocIndex:3},{value:`type WatchGetter<Value=any,DependValue= any> = (
    // \u4F20\u5165\u53D1\u751F\u53D8\u5316\u7684\u8DEF\u5F84\u548C\u503C
    scope: {path:string[],value:DependValue},
    // \u521B\u5EFA\u7684watchObject\u5BF9\u8C61
    watchObject : WatchObject<Value>
)=>Exclude<any,Promise<any>> | undefined

`,paraId:11,tocIndex:3},{value:"watch",paraId:12,tocIndex:4},{value:"\u652F\u6301\u4EE5\u4E0B\u53C2\u6570",paraId:12,tocIndex:4},{value:`interface WatchOptions<Value=any> extends ObserverOptions<Value>  { 
    async?  : false                        
    filter : WatchDependFilter<Value>     
}
`,paraId:13,tocIndex:4},{value:"initial",paraId:14,tocIndex:4},{value:"\uFF1A \u7528\u6765\u6307\u5B9A\u4E00\u4E2A\u9ED8\u8BA4\u503C",paraId:14,tocIndex:4},{value:"id",paraId:14,tocIndex:4},{value:"\uFF1A \u7528\u6765\u6307\u5B9A\u4E00\u4E2A\u552F\u4E00\u7684\u6807\u8BC6\uFF0C\u540C\u65F6\u4F5C\u4E3A\u521B\u5EFA\u7684",paraId:14,tocIndex:4},{value:"WatchObject",paraId:14,tocIndex:4},{value:"\u7684",paraId:14,tocIndex:4},{value:"key",paraId:14,tocIndex:4},{value:"\uFF0C\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"store.watchObjects.get(<id>)",paraId:14,tocIndex:4},{value:"\u6765\u8BBF\u95EE\u3002",paraId:14,tocIndex:4},{value:"computed",paraId:15,tocIndex:5},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u4E00\u822C\u662F\u786E\u5B9A\u7684\uFF0C\u800C",paraId:15,tocIndex:5},{value:"watch",paraId:15,tocIndex:5},{value:"\u51FD\u6570\u7684\u4F9D\u8D56\u53EF\u4EE5\u662F\u52A8\u6001\u7684\u3002\u8FD9\u6BD4\u8F83\u9002\u5408\u4E00\u4E9B\u9700\u8981\u52A8\u6001\u4FA6\u542C\u7684\u573A\u666F\u3002",paraId:15,tocIndex:5},{value:"\u6BD4\u5982\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u52A8\u6001\u4FA6\u542C",paraId:16,tocIndex:5},{value:"orders[].count",paraId:16,tocIndex:5},{value:"\u7684\u53D8\u5316\u6765\u8BA1\u7B97",paraId:16,tocIndex:5},{value:"total",paraId:16,tocIndex:5},{value:"\u3002\u800C",paraId:16,tocIndex:5},{value:"computed",paraId:16,tocIndex:5},{value:"\u51FD\u6570\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\uFF0C\u4E00\u65E6\u58F0\u660E\u5C31\u4E0D\u4F1A\u53D8\u5316\u3002",paraId:16,tocIndex:5},{value:"\u4EE5\u4E0B\u662F\u8868\u5355",paraId:17,tocIndex:5},{value:"validate",paraId:17,tocIndex:5},{value:"\u68C0\u6D4B\u7684\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:17,tocIndex:5},{value:`const store = createStore({
      a:{
          validate:true
      },
      b:{
          validate:true
      },            
      c:{
          validate:true,
          c1:{
              validate:true
          }
      },
      validate:watch<boolean,boolean>(({path,value},watchObj)=>{   
          if(typeof(value) === 'boolean'){
              const srcKey = path.join('.')
              if(value){
                  delete watchObj.cache[srcKey]
              }else{
                  watchObj.cache[srcKey] = value
              }
          }
          // \u7531\u4E8Ecache\u91CC\u9762\u53EA\u8BB0\u5F55validate=false\u7684\u503C\uFF0C\u6240\u4EE5\u5982\u679Ccache\u4E0D\u4E3A\u7A7A\u5219\u4EE3\u8868\u6709\u5B57\u6BB5\u7684validate=false
          return Object.keys(watchObj.cache).length==0

      },
      (path)=>path[path.length-1]=='validate', // \u53EA\u4FA6\u542Cvalidate\u5B57\u6BB5\u7684\u503C\u53D8\u5316
      {initial:true,id:"x"})
  })  
`,paraId:18,tocIndex:5},{value:"\u8BF4\u660E\uFF1A",paraId:19,tocIndex:5},{value:"\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5B9E\u73B0\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u6765\u8868\u5355\u6574\u4E2A\u8868\u5355\u7684\u6709\u6548\uFF0C\u5F53\u72B6\u6001\u4E2D\u4EFB\u610F\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u7684",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u90FD\u4E3A",paraId:20,tocIndex:5},{value:"false",paraId:20,tocIndex:5},{value:"\u65F6\uFF0C\u5219",paraId:20,tocIndex:5},{value:"validate=false",paraId:20,tocIndex:5},{value:"\uFF0C\u5426\u5219\u4E3A",paraId:20,tocIndex:5},{value:"true",paraId:20,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5},{value:"\u73B0\u5728\u95EE\u9898\u662F",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u53EF\u80FD\u662F\u5728\u4E00\u4E2A\u590D\u6742\u7684\u5D4C\u5957\u5BF9\u8C61\u4E2D\uFF0C\u5E76\u4E14\u53EF\u80FD\u662F\u52A8\u6001\u7684\u3002\u8FD9\u65F6\u5019\uFF0C\u6211\u4EEC\u65E0\u6CD5\u4F7F\u7528",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u6765\u8FDB\u884C\u8BA1\u7B97\uFF0C\u56E0\u4E3A",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\u3002",paraId:20,tocIndex:5},{value:"\u6B64\u65F6\u5C31\u662F\u4F7F\u7528",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\u7684\u65F6\u5019\u4E86\uFF0C\u6211\u4EEC\u58F0\u660E\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u76D1\u542C\u6240\u6709\u8DEF\u5F84\u4E2D\u7684",paraId:20,tocIndex:5},{value:"path[path.length-1]=='validate'",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u7684\u53D8\u5316\u5373\u53EF\u3002",paraId:20,tocIndex:5},{value:"\u5173\u4E8E",paraId:20,tocIndex:5},{value:"WatchObject",paraId:20,tocIndex:5},{value:"\u7684\u4ECB\u7ECD\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:20,tocIndex:5},{value:"\u76D1\u542C\u5BF9\u8C61",paraId:21,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5}]},13199:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(95601);const l=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"watch",paraId:1,tocIndex:1},{value:"\u65B9\u6CD5\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`// \u76D1\u542C\u5168\u90E8
watch(listener:WatchListener,options?:WatchListenerOptions):Watcher
// \u53EA\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84
watch(paths:'*' | string | (string|string[])[],listener:WatchListener,options?:WatchListenerOptions):Watcher
`,paraId:2,tocIndex:1},{value:"\u8FD4\u56DE",paraId:3,tocIndex:1},{value:"Watcher",paraId:3,tocIndex:1},{value:"\u7C7B\u578B\uFF0C\u7528\u4E8E\u53D6\u6D88\u76D1\u542C\u3002",paraId:3,tocIndex:1},{value:`type Watcher = { off:()=>void }
`,paraId:4,tocIndex:1},{value:"WatchListener",paraId:5,tocIndex:2},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u6765\u5904\u7406\u76D1\u89C6\u5230\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5176\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:5,tocIndex:2},{value:`type WatchListener<Value=any,Parent=any> = (operate:StateOperate<Value,Parent>)=>void

type StateOperate<Value=any,Parent=any> = {
    type       : StateOperateType,
    path       : string[],
    value      : Value,
    indexs?    : number[],                
    oldValue?  : Value,
    parentPath?: string[],
    parent?    : Parent,    
    reply?     : boolean               
} 
`,paraId:6,tocIndex:2},{value:"\u5F53\u4FA6\u542C\u5230\u6570\u636E\u53D8\u5316\u65F6\uFF0C",paraId:7,tocIndex:2},{value:"watch",paraId:7,tocIndex:2},{value:"\u4F1A\u8C03\u7528",paraId:7,tocIndex:2},{value:"WatchListener",paraId:7,tocIndex:2},{value:"\u51FD\u6570\uFF0C\u5E76\u4F20\u5165\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"StateOperate",paraId:7,tocIndex:2},{value:"\u5BF9\u8C61\u3002",paraId:7,tocIndex:2},{value:"StateOperate",paraId:7,tocIndex:2},{value:"\u5BF9\u8C61\u5305\u62EC\u4E86\u53D8\u5316\u7684\u7C7B\u578B",paraId:7,tocIndex:2},{value:"type",paraId:7,tocIndex:2},{value:"\uFF0C",paraId:7,tocIndex:2},{value:"path",paraId:7,tocIndex:2},{value:"\uFF0C",paraId:7,tocIndex:2},{value:"value",paraId:7,tocIndex:2},{value:"\u7B49\u4FE1\u606F\u3002",paraId:7,tocIndex:2},{value:"StateOperate",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\u7684\u5C5E\u6027\u5982\u4E0B\uFF1A",paraId:8,tocIndex:2},{value:"\u5C5E\u6027",paraId:9,tocIndex:2},{value:"\u7C7B\u578B",paraId:9,tocIndex:2},{value:"\u8BF4\u660E",paraId:9,tocIndex:2},{value:"type",paraId:9,tocIndex:2},{value:"string",paraId:9,tocIndex:2},{value:"\u72B6\u6001\u64CD\u4F5C\u7C7B\u578B\uFF0C\u53D6\u503C",paraId:9,tocIndex:2},{value:"get",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"set",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"delete",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"insert",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"update",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"remove",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"batch",paraId:9,tocIndex:2},{value:"path",paraId:9,tocIndex:2},{value:"string[]",paraId:9,tocIndex:2},{value:"\u72B6\u6001\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"value",paraId:9,tocIndex:2},{value:"any",paraId:9,tocIndex:2},{value:"\u503C",paraId:9,tocIndex:2},{value:"indexs",paraId:9,tocIndex:2},{value:"number[]",paraId:9,tocIndex:2},{value:"\u6570\u7EC4\u64CD\u4F5C\u65F6\u7684\u7D22\u5F15",paraId:9,tocIndex:2},{value:"oldValue",paraId:9,tocIndex:2},{value:"any",paraId:9,tocIndex:2},{value:"\u65E7\u503C",paraId:9,tocIndex:2},{value:"parentPath",paraId:9,tocIndex:2},{value:"string[]",paraId:9,tocIndex:2},{value:"\u7236\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"parent",paraId:9,tocIndex:2},{value:"any",paraId:9,tocIndex:2},{value:"\u7236\u503C",paraId:9,tocIndex:2},{value:"reply",paraId:9,tocIndex:2},{value:"boolean",paraId:9,tocIndex:2},{value:"\u6279\u91CF\u64CD\u4F5C\u65F6\u662F\u5426\u56DE\u653E",paraId:9,tocIndex:2},{value:"watch",paraId:10,tocIndex:2},{value:"\u80FD\u72B6\u6001\u7684\u8BFB\u5199\u64CD\u4F5C,\u5305\u62EC",paraId:10,tocIndex:2},{value:"get",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"set",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"delete",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"insert",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"update",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"remove",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"batch",paraId:10,tocIndex:2},{value:"\u7B49\u64CD\u4F5C\u8FDB\u884C\u76D1\u542C\u3002",paraId:10,tocIndex:2},{value:"get",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"set",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"delete",paraId:10,tocIndex:2},{value:"\u9002\u4E8E\u5BF9\u8C61\u7684\u503C\u7684\u8BFB\u5199",paraId:10,tocIndex:2},{value:"insert",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"update",paraId:10,tocIndex:2},{value:",",paraId:10,tocIndex:2},{value:"remove",paraId:10,tocIndex:2},{value:"\u9002\u4E8E\u6570\u7EC4\u7684\u64CD\u4F5C",paraId:10,tocIndex:2},{value:"batch",paraId:10,tocIndex:2},{value:"\u9002\u4E8E\u6279\u91CF\u64CD\u4F5C,\u5F53\u4F7F\u7528",paraId:10,tocIndex:2},{value:"batchUpdate",paraId:10,tocIndex:2},{value:"\u4F1A\u89E6\u53D1\u6B64\u7C7B\u578B\u7684\u64CD\u4F5C\u4E8B\u4EF6\uFF0C\u8BE6\u89C1",paraId:10,tocIndex:2},{value:"\u6279\u91CF\u64CD\u4F5C",paraId:11,tocIndex:2},{value:"reply",paraId:10,tocIndex:2},{value:"\u53C2\u6570\u7528\u4E8E\u6807\u8BC6\u8BE5\u64CD\u4F5C\u662F\u5426\u662F\u5728\u6279\u91CF\u66F4\u65B0\u65F6\u7684\u4E8B\u4EF6\u56DE\u653E\u3002",paraId:10,tocIndex:2},{value:"\u76D1\u542C\u51FD\u6570\u53EA\u80FD\u662F\u4E00\u4E2A\u540C\u6B65\u51FD\u6570",paraId:12},{value:`type WatchListenerOptions = {
    once?    : boolean                                        
    operates?: '*' | 'read' | 'write' | StateOperateType[]     // \u53EA\u4FA6\u542C\u7684\u64CD\u4F5C\u7C7B\u578B
    filter?  : (args:StateOperate)=>boolean                // \u8FC7\u6EE4\u5668
}
`,paraId:13,tocIndex:3},{value:"\u5C5E\u6027",paraId:14,tocIndex:3},{value:"\u7C7B\u578B",paraId:14,tocIndex:3},{value:"\u8BF4\u660E",paraId:14,tocIndex:3},{value:"once",paraId:14,tocIndex:3},{value:"boolean",paraId:14,tocIndex:3},{value:"\u662F\u5426\u53EA\u76D1\u542C\u4E00\u6B21",paraId:14,tocIndex:3},{value:"operates",paraId:14,tocIndex:3},{value:"'*'| 'read' | 'write' | StateOperateType[]",paraId:14,tocIndex:3},{value:"\u53EA\u4FA6\u542C\u7684\u64CD\u4F5C\u7C7B\u578B",paraId:14,tocIndex:3},{value:"filter",paraId:14,tocIndex:3},{value:"(args:StateOperate)=>boolean",paraId:14,tocIndex:3},{value:"\u8FC7\u6EE4\u5668\u51FD\u6570\uFF0C\u8FD4\u56DE",paraId:14,tocIndex:3},{value:"true",paraId:14,tocIndex:3},{value:"\u5219\u6267\u884C\u76D1\u542C\u51FD\u6570\uFF0C\u5426\u5219\u4E0D\u6267\u884C",paraId:14,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570\u6700\u91CD\u8981\u7684\u53C2\u6570\u662F",paraId:15,tocIndex:3},{value:"operates",paraId:15,tocIndex:3},{value:"\uFF0C\u7528\u6765\u914D\u7F6E\u8981\u76D1\u542C\u7684\u64CD\u4F5C\u7C7B\u578B\uFF0C\u53EF\u4EE5\u662F",paraId:15,tocIndex:3},{value:"'*'",paraId:15,tocIndex:3},{value:"\uFF0C",paraId:15,tocIndex:3},{value:"'read'",paraId:15,tocIndex:3},{value:"\uFF0C",paraId:15,tocIndex:3},{value:"'write'",paraId:15,tocIndex:3},{value:"\uFF0C\u6216\u8005\u4E00\u4E2A\u64CD\u4F5C\u7C7B\u578B\u6570\u7EC4\u3002",paraId:15,tocIndex:3},{value:"\u9ED8\u8BA4",paraId:15,tocIndex:3},{value:"operates='write'",paraId:15,tocIndex:3},{value:"\uFF0C\u5373\u76D1\u542C\u6240\u6709\u5199\u64CD\u4F5C\u3002",paraId:15,tocIndex:3},{value:"operates='get",paraId:15,tocIndex:3},{value:"\u4EE3\u8868\u76D1\u542C\u6240\u6709\u8BFB\u64CD\u4F5C\u3002",paraId:15,tocIndex:3},{value:"operates='*'",paraId:15,tocIndex:3},{value:"\u4EE3\u8868\u76D1\u542C\u6240\u6709\u8BFB\u5199\u5220\u9664\u64CD\u4F5C\u3002",paraId:15,tocIndex:3},{value:"operates",paraId:15,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u64CD\u4F5C\u7C7B\u578B\u6570\u7EC4\uFF0C\u6BD4\u5982",paraId:15,tocIndex:3},{value:"['set','delete']",paraId:15,tocIndex:3},{value:"\uFF0C\u4EE3\u8868\u76D1\u542C",paraId:15,tocIndex:3},{value:"set",paraId:15,tocIndex:3},{value:"\u548C",paraId:15,tocIndex:3},{value:"delete",paraId:15,tocIndex:3},{value:"\u64CD\u4F5C\u3002",paraId:15,tocIndex:3},{value:"once",paraId:15,tocIndex:3},{value:"\u5C5E\u6027\u7528\u6765\u914D\u7F6E\u662F\u5426\u53EA\u76D1\u542C\u4E00\u6B21\u3002",paraId:15,tocIndex:3},{value:"filter",paraId:15,tocIndex:3},{value:"\u51FD\u6570\u7528\u6765\u8FC7\u6EE4\u76D1\u542C\u7684\u64CD\u4F5C\uFF0C\u8FD4\u56DE",paraId:15,tocIndex:3},{value:"true",paraId:15,tocIndex:3},{value:"\u5219\u6267\u884C\u76D1\u542C\u51FD\u6570\uFF0C\u5426\u5219\u4E0D\u6267\u884C\u3002",paraId:15,tocIndex:3},{value:"\u793A\u4F8B\uFF1A",paraId:16,tocIndex:3},{value:`store.watch((operate)=>{
    ....
},{
  operates:'write'
})
`,paraId:17,tocIndex:3},{value:"\u4F7F\u7528",paraId:18,tocIndex:4},{value:"watch(listener,options?)",paraId:18,tocIndex:4},{value:"\u65B9\u6CD5\u7528\u6765\u5168\u5C40\u76D1\u542C",paraId:18,tocIndex:4},{value:"State",paraId:18,tocIndex:4},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5BF9\u72B6\u6001\u7684\u4EFB\u4F55\u64CD\u4F5C\u5747\u4F1A\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:18,tocIndex:4},{value:"\u9664\u4E86\u5168\u5C40\u76D1\u542C\u5916\uFF0C\u8FD8\u53EF\u4EE5\u4F7F\u7528",paraId:19,tocIndex:5},{value:"watch(paths,listener,options?)",paraId:19,tocIndex:5},{value:"\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:19,tocIndex:5},{value:"\u4E5F\u53EF\u4EE5\u4E00\u6B21\u76D1\u542C\u591A\u4E2A\u8DEF\u5F84\uFF0C\u6BD4\u5982",paraId:20},{value:"watch(['order.price','order.count'],listener)",paraId:20},{value:"\u3002",paraId:20},{value:"watch",paraId:21,tocIndex:7},{value:"\u4E5F\u53EF\u4EE5\u652F\u6301\u6570\u7EC4\u7684\u76D1\u542C\uFF0C\u6BD4\u5982",paraId:21,tocIndex:7},{value:"watch('order.books',listener)",paraId:21,tocIndex:7},{value:"\uFF0C\u5F53",paraId:21,tocIndex:7},{value:"order.books",paraId:21,tocIndex:7},{value:"\u6570\u7EC4\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:21,tocIndex:7},{value:"\u533A\u522B\u4E8E\u666E\u901A\u5BF9\u7684\u662F\u76D1\u542C\u4E8B\u4EF6#\uFE0F\u20E3",paraId:22,tocIndex:7},{value:"\u6570\u7EC4\u7684\u76D1\u542C\u4E8B\u4EF6\u6709",paraId:23,tocIndex:7},{value:"insert",paraId:23,tocIndex:7},{value:",",paraId:23,tocIndex:7},{value:"update",paraId:23,tocIndex:7},{value:",",paraId:23,tocIndex:7},{value:"remove",paraId:23,tocIndex:7},{value:"\u4E09\u79CD\u3002",paraId:23,tocIndex:7},{value:"\u5BF9\u6570\u7EC4\u6210\u5458\u7684\u64CD\u4F5C\u53C2\u6570\u4F1A\u591A\u4E00\u4E2A",paraId:23,tocIndex:7},{value:"indexs",paraId:23,tocIndex:7},{value:"\u5C5E\u6027\uFF0C\u7528\u6765\u6807\u8BC6\u6570\u7EC4\u7684\u7D22\u5F15\u3002",paraId:23,tocIndex:7},{value:"get",paraId:23,tocIndex:7},{value:"\u64CD\u4F5C\u4E8B\u4EF6\u4E5F\u9002\u7528\u4E8E\u6570\u7EC4",paraId:23,tocIndex:7},{value:"\u57FA\u4E8E",paraId:24,tocIndex:9},{value:"watch",paraId:24,tocIndex:9},{value:"\u5F3A\u5927\u7684\u529F\u80FD\uFF0C\u5185\u90E8\u5C31\u662F\u7528\u6765\u8FDB\u884C\u4F9D\u8D56\u6536\u96C6\u7684\u3002",paraId:24,tocIndex:9},{value:"\u4EE5\u4E0B\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u5728\u521D\u59CB\u5316\u65F6\u7684\u4F9D\u8D56\u6536\u96C6\u7684\u4EE3\u7801\uFF1A",paraId:25,tocIndex:9},{value:`function collectDependencies(){
      let dependencies:string[][] = []       
      // 1. \u4FA6\u542C\u6240\u6709\u7684get\u64CD\u4F5C
      const watcher = this.store.watch((event)=>{      
          // \u5C06\u4F9D\u8D56\u8DEF\u5F84\u4FDD\u5B58\u8D77\u6765
          dependencies.push(event.path)            
      },{operates:['get']})   
      // 2. \u8FD0\u884C\u4E00\u6B21\u540C\u6B65\u8BA1\u7B97\u7684getter\u51FD\u6570
      this.run({first:true})   
      // 3. \u4F9D\u8D56\u6536\u96C6\u5B8C\u6210\u540E\u5C31\u7ED3\u675F\u76D1\u542C
      watcher.off() 
      // .......
      return dependencies
}  
`,paraId:26,tocIndex:9},{value:"store.watch",paraId:27},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:27},{value:"State",paraId:27},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u5B9E\u73B0\u4E5F\u662F\u57FA\u4E8E",paraId:27},{value:"watch",paraId:27},{value:"\u65B9\u6CD5\u3002",paraId:27}]},29605:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(2415);const l=[]}}]);
