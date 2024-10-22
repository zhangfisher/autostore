"use strict";(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[1904],{1801:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(77643),U={}},44887:function(te,_,e){e.r(_),e.d(_,{demos:function(){return m}});var K=e(24325),d=e.n(K),U=e(29008),L=e.n(U),S=e(28633),g=e.n(S),N=e(70958),F=e.n(N),s=e(92379),M=e(61668),x=e(24668),y=e(55267),E=e(20927),m={"docs-exmaples-get-repos-demo-0":{component:s.memo(s.lazy(F()(L()().mark(function p(){var a,r,u,v,n,h,f,B,P,b,D,C,j,A,R;return L()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return a=T.sent,r=a.computed,u=a.createStore,T.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return v=T.sent,n=v.Input,h=v.Box,f=v.Button,T.next=13,Promise.resolve().then(e.bind(e,20927));case 13:return B=T.sent,P=B.api,b=u({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:r(function(){var Y=F()(L()().mark(function V(J,Q){var q,X,ae;return L()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=g()(J,1),X=q[0],ae=Q.abortSignal,de.next=4,new Promise(function(he,ge){ae.addEventListener("abort",function(){ge("cancelled")}),P.getProjects(X).then(function(Ae){he(Ae)}).catch(function(Ae){ge(Ae)})});case 4:case"end":return de.stop()}},V)}));return function(V,J){return Y.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),D=b.state,C=b.bind,j=b.$,A=b.useState,R=b.useAsyncState,T.abrupt("return",{default:function(){var V=A("user.repo"),J=g()(V,1),Q=J[0],q=R("user.projects");return s.createElement("div",null,s.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),s.createElement(n,d()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:Q},C("user.repo"))),s.createElement(f,{onClick:function(){return D.user.projects.run()}},"\u91CD\u8BD5"),s.createElement(f,{onClick:function(){return D.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),s.createElement(h,null,s.createElement("table",{className:"projects-list"},s.createElement("thead",null,s.createElement("tr",null,s.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),s.createElement("td",null,s.createElement("b",null,"\u8BF4\u660E")),s.createElement("td",null,s.createElement("b",null,"\u661F")))),s.createElement("tbody",null,q.loading?s.createElement("tr",null,s.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):q.error?s.createElement("tr",null,s.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",q.error)):q.value&&q.value.map(function(X,ae){return s.createElement("tr",{key:ae},s.createElement("td",null,s.createElement("a",{href:X.url,target:"__blank"},X.name)),s.createElement("td",null,X.description),s.createElement("td",null,X.stars))})))))}});case 17:case"end":return T.stop()}},p)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y,"autostore-docs":E},renderOpts:{compile:function(){var p=F()(L()().mark(function r(){var u,v=arguments;return L()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,e.e(9039).then(e.bind(e,39039));case 2:return h.abrupt("return",(u=h.sent).default.apply(u,v));case 3:case"end":return h.stop()}},r)}));function a(){return p.apply(this,arguments)}return a}()}}}},16960:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(28627),U={}},87524:function(te,_,e){e.r(_),e.d(_,{demos:function(){return E}});var K=e(24325),d=e.n(K),U=e(28633),L=e.n(U),S=e(29008),g=e.n(S),N=e(70958),F=e.n(N),s=e(92379),M=e(46267),x=e(24668),y=e(55267),E={"docs-guide-computed-async-demo-0":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D;return g()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=j.sent,a=p.delay,r=p.createStore,u=p.computed,j.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return v=j.sent,n=v.Input,h=v.ColorBlock,f=r({user:{firstName:"Zhang",lastName:"Fisher",fullName:u(function(){var A=F()(g()().mark(function R(W){return g()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,a(1e3);case 2:return Y.abrupt("return",W.firstName+" "+W.lastName);case 3:case"end":return Y.stop()}},R)}));return function(R){return A.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),B=f.useAsyncState,P=f.useState,b=f.state,D=f.bind,j.abrupt("return",{default:function(){var R=P("user.firstName"),W=L()(R,1),T=W[0],Y=P("user.lastName"),V=L()(Y,1),J=V[0],Q=B("user.fullName");return s.createElement(s.Fragment,null,s.createElement(n,d()({label:"firstName",value:T},D("user.firstName"))),s.createElement(n,d()({label:"lastName",value:J},D("user.lastName"))),s.createElement(h,{name:"FullName",loading:Q.loading},Q.value))}});case 13:case"end":return j.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-async-demo-1":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f;return g()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=P.sent,a=p.useStore,r=p.computed,u=p.delay,P.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return v=P.sent,n=v.ColorBlock,h=v.Button,f=v.JsonView,P.abrupt("return",{default:function(){var D=a({firstName:"Zhang",lastName:"Fisher",fullName:r(function(){var W=F()(g()().mark(function T(Y){return g()().wrap(function(J){for(;;)switch(J.prev=J.next){case 0:return J.next=2,u();case 2:if(!Y.triggerError){J.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return J.abrupt("return",Y.firstName+" "+Y.lastName);case 5:case"end":return J.stop()}},T)}));return function(T){return W.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),C=D.state,j=D.$,A=D.useAsyncState,R=A("fullName");return s.createElement("div",null,s.createElement(n,{name:"FirstName"},j("firstName")),s.createElement(n,{name:"FirstName"},j("lastName")),s.createElement(n,{name:"FullName",loading:R.loading},R.loading?"\u6B63\u5728\u8BA1\u7B97...":R.error?"ERROR:".concat(R.error):R.value),s.createElement("div",null,s.createElement(h,{onClick:function(){C.triggerError=!1,C.firstName=C.firstName+"\u{1F525}"}},"Change FirstName"),s.createElement(h,{onClick:function(){C.triggerError=!1,C.lastName=C.lastName+"\u2764\uFE0F"}},"Change LastName")),s.createElement("div",null,s.createElement(h,{onClick:function(){C.firstName=C.firstName+"\u{1F525}"}},"Change FirstName with Error"),s.createElement(h,{onClick:function(){C.triggerError=!0,C.lastName=C.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),s.createElement("div",null,"state.fullName=",s.createElement(f,null,JSON.stringify(R))))}});case 13:case"end":return P.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-async-demo-2":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D,C,j,A,R;return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=T.sent,a=p.delay,r=p.createStore,u=p.computed,v=p.ObserverScopeRef,T.next=9,Promise.resolve().then(e.bind(e,55267));case 9:return n=T.sent,h=n.JsonView,f=n.Button,B=n.Input,P=n.Loading,b=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:u(function(){var Y=F()(g()().mark(function V(J,Q){var q,X,ae,xe,de;return g()().wrap(function(ge){for(;;)switch(ge.prev=ge.next){case 0:return q=L()(J,2),X=q[0],ae=q[1],xe=Q.getProgressbar,de=xe(),ge.abrupt("return",new Promise(function(){var Ae=F()(g()().mark(function Re(Ke){var $e;return g()().wrap(function(De){for(;;)switch(De.prev=De.next){case 0:$e=1;case 1:if(!($e<=100)){De.next=8;break}return De.next=4,a(20);case 4:de.value($e);case 5:$e++,De.next=1;break;case 8:de.end(),Ke(X*ae);case 10:case"end":return De.stop()}},Re)}));return function(Re){return Ae.apply(this,arguments)}}()));case 4:case"end":return ge.stop()}},V)}));return function(V,J){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:v.Depends})}}),D=b.useState,C=b.state,j=b.$,A=b.bind,R=b.useAsyncState,T.abrupt("return",{default:function(){var V=D("order.count"),J=L()(V,1),Q=J[0],q=R("order.total");return s.createElement("div",null,s.createElement("table",{className:"table table-bordered table-striped"},s.createElement("tbody",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4E66\u540D")),s.createElement("td",null,C.order.bookName)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4EF7\u683C")),s.createElement("td",null,C.order.price)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u6570\u91CF")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},s.createElement(f,{onClick:function(){return C.order.count--}},"-"),s.createElement(B,d()({value:Q},A("order.count"))),s.createElement(f,{onClick:function(){return C.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),s.createElement("tfoot",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u603B\u4EF7")),s.createElement("td",null,q.loading?s.createElement(P,null):null,q.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(q.progress,"%"):q.error?"ERROR:".concat(q.error):q.value)))),s.createElement("div",null,s.createElement(h,null,JSON.stringify(C.order.total))))}});case 16:case"end":return T.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-async-demo-3":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D,C,j,A,R,W;return g()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=Y.sent,a=p.createStore,r=p.computed,u=p.ObserverScopeRef,v=p.delay,Y.next=9,Promise.resolve().then(e.bind(e,55267));case 9:return n=Y.sent,h=n.Input,f=n.Button,B=n.Loading,P=n.JsonView,b=n.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var V=F()(g()().mark(function J(Q){var q,X,ae;return g()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=L()(Q,2),X=q[0],ae=q[1],de.next=3,v(5e3);case 3:return de.abrupt("return",X*ae);case 4:case"end":return de.stop()}},J)}));return function(J){return V.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:u.Depends})}}),C=D.useState,j=D.state,A=D.$,R=D.bind,W=D.useAsyncState,Y.abrupt("return",{default:function(){var J=C("order.count"),Q=L()(J,1),q=Q[0],X=W("order.total");return s.createElement("div",null,s.createElement("table",{className:"table table-bordered table-striped"},s.createElement("tbody",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4E66\u540D")),s.createElement("td",null,j.order.bookName)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4EF7\u683C")),s.createElement("td",null,j.order.price)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u6570\u91CF")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},s.createElement(f,{onClick:function(){return j.order.count--}},"-"),s.createElement(h,d()({value:q},R("order.count"))),s.createElement(f,{onClick:function(){return j.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),s.createElement("tfoot",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u603B\u4EF7")),s.createElement("td",null,X.loading?s.createElement(B,null):null,X.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(X.timeout,"ms"):X.error?s.createElement(b,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),s.createElement("div",null,s.createElement(P,null,JSON.stringify(j.order.total))))}});case 17:case"end":return Y.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-async-demo-4":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D,C,j,A,R,W;return g()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=Y.sent,a=p.createStore,r=p.computed,u=p.ObserverScopeRef,v=p.delay,Y.next=9,Promise.resolve().then(e.bind(e,55267));case 9:return n=Y.sent,h=n.Input,f=n.Button,B=n.Loading,P=n.JsonView,b=n.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var V=F()(g()().mark(function J(Q){var q,X,ae;return g()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=L()(Q,2),X=q[0],ae=q[1],de.next=3,v(6e3);case 3:return de.abrupt("return",X*ae);case 4:case"end":return de.stop()}},J)}));return function(J){return V.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:u.Depends})}}),C=D.useState,j=D.state,A=D.$,R=D.bind,W=D.useAsyncState,Y.abrupt("return",{default:function(){var J=C("order.count"),Q=L()(J,1),q=Q[0],X=W("order.total");return s.createElement("div",null,s.createElement("table",{className:"table table-bordered table-striped"},s.createElement("tbody",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4E66\u540D")),s.createElement("td",null,j.order.bookName)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4EF7\u683C")),s.createElement("td",null,j.order.price)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u6570\u91CF")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},s.createElement(f,{onClick:function(){return j.order.count--}},"-"),s.createElement(h,d()({value:q},R("order.count"))),s.createElement(f,{onClick:function(){return j.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),s.createElement("tfoot",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u603B\u4EF7")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?s.createElement(B,null):null,X.loading?s.createElement(b,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(X.timeout,"}\u79D2"),color:"red"}):X.error?s.createElement(b,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),s.createElement("div",null,s.createElement(P,null,JSON.stringify(j.order.total))))}});case 17:case"end":return Y.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-async-demo-5":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D,C,j,A,R,W;return g()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=Y.sent,a=p.createStore,r=p.computed,u=p.ObserverScopeRef,v=p.delay,Y.next=9,Promise.resolve().then(e.bind(e,55267));case 9:return n=Y.sent,h=n.Input,f=n.Button,B=n.Loading,P=n.JsonView,b=n.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var V=F()(g()().mark(function J(Q){var q,X,ae;return g()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return q=L()(Q,2),X=q[0],ae=q[1],de.next=3,v();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return de.stop()}},J)}));return function(J){return V.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:u.Depends})}}),C=D.useState,j=D.state,A=D.$,R=D.bind,W=D.useAsyncState,Y.abrupt("return",{default:function(){var J=C("order.count"),Q=L()(J,1),q=Q[0],X=W("order.total");return s.createElement("div",null,s.createElement("table",{className:"table table-bordered table-striped"},s.createElement("tbody",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4E66\u540D")),s.createElement("td",null,j.order.bookName)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4EF7\u683C")),s.createElement("td",null,j.order.price)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u6570\u91CF")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},s.createElement(f,{onClick:function(){return j.order.count--}},"-"),s.createElement(h,d()({value:q},R("order.count"))),s.createElement(f,{onClick:function(){return j.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),s.createElement("tfoot",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u603B\u4EF7")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?s.createElement(B,null):null,X.loading?s.createElement(b,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):X.error&&s.createElement(b,{text:"\u51FA\u9519: {".concat(X.error,"}"),color:"red"}),X.retry>0&&s.createElement(b,{text:"\u91CD\u8BD5: {".concat(X.retry,"}"),color:"red"}))))),s.createElement("div",null,s.createElement(P,null,JSON.stringify(j.order.total))))}});case 17:case"end":return Y.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-async-demo-6":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D,C,j,A,R;return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=T.sent,a=p.createStore,r=p.computed,u=p.ObserverScopeRef,T.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return v=T.sent,n=v.Input,h=v.Button,f=v.Loading,B=v.JsonView,P=v.RichLabel,b=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var Y=F()(g()().mark(function V(J,Q){var q,X,ae,xe;return g()().wrap(function(he){for(;;)switch(he.prev=he.next){case 0:return q=L()(J,2),X=q[0],ae=q[1],xe=Q.abortSignal,he.abrupt("return",new Promise(function(ge,Ae){var Re=setTimeout(function(){ge(X*ae)},1e6);xe.addEventListener("abort",function(){clearTimeout(Re),Ae("cancelled")})}));case 3:case"end":return he.stop()}},V)}));return function(V,J){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:u.Depends})}}),D=b.useState,C=b.state,j=b.$,A=b.bind,R=b.useAsyncState,T.abrupt("return",{default:function(){var V=D("order.count"),J=L()(V,1),Q=J[0],q=R("order.total");return s.createElement("div",null,s.createElement("table",{className:"table table-bordered table-striped"},s.createElement("tbody",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4E66\u540D")),s.createElement("td",null,C.order.bookName)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u4EF7\u683C")),s.createElement("td",null,C.order.price)),s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u6570\u91CF")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},s.createElement(h,{onClick:function(){return C.order.count--}},"-"),s.createElement(n,d()({value:Q},A("order.count"))),s.createElement(h,{onClick:function(){return C.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),s.createElement("tfoot",null,s.createElement("tr",null,s.createElement("td",null,s.createElement("b",null,"\u603B\u4EF7")),s.createElement("td",{style:{display:"flex",alignItems:"center"}},q.loading?s.createElement(f,null):null,q.loading?s.createElement(P,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):q.error&&s.createElement(P,{text:"\u51FA\u9519: {".concat(q.error,"}"),color:"red"}),q.loading&&s.createElement(h,{onClick:function(){return q.cancel()}},"\u53D6\u6D88"))))),s.createElement("div",null,s.createElement(B,null,JSON.stringify(C.order.total))))}});case 16:case"end":return T.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-async-demo-7":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f;return g()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=P.sent,a=p.createStore,P.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return r=P.sent,u=r.ColorBlock,v=r.Button,n=a({bookName:"ZhangFisher",price:100,count:3,total:function(){var b=F()(g()().mark(function C(j){return g()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",j.price*j.count);case 1:case"end":return R.stop()}},C)}));function D(C){return b.apply(this,arguments)}return D}()}),h=n.state,f=n.$,P.abrupt("return",{default:function(){return s.createElement("div",null,s.createElement(u,{name:"\u4E66\u540D"},f("bookName")),s.createElement(u,{name:"\u4EF7\u683C"},f("price")),s.createElement(u,{name:"\u6570\u91CF"},s.createElement(v,{onClick:function(){return h.count--}},"-"),f("count"),s.createElement(v,{onClick:function(){return h.count++}},"+")),s.createElement(u,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},f("total.value",{errorBoundary:function(C){var j=C.error;return s.createElement(s.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",j.message)}})),s.createElement(u,{name:"state.total"},String(h.total)))}});case 11:case"end":return P.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}}}},60409:function(te,_,e){e.r(_),e.d(_,{demos:function(){return x}});var K=e(29008),d=e.n(K),U=e(28633),L=e.n(U),S=e(70958),g=e.n(S),N=e(92379),F=e(25231),s=e(24668),M=e(55267),x={"docs-guide-computed-create-demo-0":{component:N.memo(N.lazy(g()(d()().mark(function y(){var E,m,p,a,r,u,v;return d()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=h.sent,m=E.createStore,p=E.computed,h.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return a=h.sent,r=a.ColorBlock,u=a.Button,v=m({order:{price:100,count:3,total1:function(B){return B.price*B.count},total2:p(function(f){return f.price*f.count})}}),h.abrupt("return",{default:function(){var B=v.useState(),P=L()(B,2),b=P[0],D=P[1];return N.createElement("div",null,N.createElement(r,{name:"Price"},b.order.price),N.createElement(r,{name:"Count"},b.order.count),N.createElement(r,{name:"Total 1"},b.order.total1),N.createElement(r,{name:"Total 2"},b.order.total2),N.createElement(u,{onClick:function(){return D(function(j){return j.order.count++})}},"Count++"))}});case 12:case"end":return h.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(d()().mark(function m(){var p,a=arguments;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}}}},71252:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(83717),U={}},87755:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(76938),N=e(24668),F=e(55267),s={"docs-guide-computed-getter-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u,v,n,h;return d()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=B.sent,y=x.createStore,E=x.computed,m=x.delay,B.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return p=B.sent,a=p.ColorBlock,r=p.Button,u=y({order:{price:100,count:3,total:E(function(){var P=L()(d()().mark(function b(D){return d()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,m(1e3);case 2:return j.abrupt("return",D.price*D.count);case 3:case"end":return j.stop()}},b)}));return function(b){return P.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),v=u.state,n=u.$,h=u.computedObjects,B.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",h.get("total")),S.createElement("div",null,S.createElement(a,{name:"price"},n("order.price")),S.createElement(a,{name:"count"},n("order.count")),S.createElement(a,{name:"Total"},n(function(b){var D=b.value,C=b.loading;return S.createElement("div",null,C?"\u8BA1\u7B97\u4E2D...":D+1e3)},"order.total")),S.createElement(r,{onClick:function(){return v.order.count++}},"Count++"),S.createElement(r,{onClick:function(){return h.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return B.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},18731:function(te,_,e){e.r(_),e.d(_,{demos:function(){return p}});var K=e(12027),d=e.n(K),U=e(34180),L=e.n(U),S=e(28633),g=e.n(S),N=e(29008),F=e.n(N),s=e(70958),M=e.n(s),x=e(92379),y=e(87480),E=e(24668),m=e(55267),p={"docs-guide-computed-objects-demo-0":{component:x.memo(x.lazy(M()(F()().mark(function a(){var r,u,v,n,h,f,B,P,b;return F()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return r=C.sent,u=r.createStore,v=r.computed,C.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return n=C.sent,h=n.Divider,f=n.ColorBlock,B=n.Button,P=0,b=u({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(A){return A.firstName+A.lastName+"".concat(++P)},fullName2:v(function(){var j=M()(F()().mark(function A(R){return F()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.abrupt("return",R.firstName+R.lastName+"".concat(++P));case 1:case"end":return T.stop()}},A)}));return function(A){return j.apply(this,arguments)}}(),["./firstName","./lastName"])}}),C.abrupt("return",{default:function(){var A=b.useState(),R=g()(A,1),W=R[0];return x.createElement("div",null,x.createElement(f,{name:"FirstName"},W.user.firstName),x.createElement(f,{name:"lastName"},W.user.lastName),x.createElement(f,{name:"FullName",value:W.user.fullName}),x.createElement(f,{name:"FullName2",value:W.user.fullName2.value}),x.createElement(h,null),x.createElement("div",null,"typeof(store.computedObjects)==",L()(b.computedObjects)),x.createElement("div",null,"store.computedObjects instanceof Map=",String(b.computedObjects instanceof Map)),x.createElement("div",null,"store.computedObjects.size=",b.computedObjects.size),x.createElement("div",null,"store.computedObjects.size=",b.computedObjects.size),x.createElement("div",null,"store.computedObjects.keys()=",d()(b.computedObjects.keys()).join(" , ")),x.createElement(B,{onClick:function(){return b.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),x.createElement(B,{onClick:function(){return b.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),x.createElement(B,{onClick:function(){return b.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return C.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":E,"x-react-components":m},renderOpts:{compile:function(){var a=M()(F()().mark(function u(){var v,n=arguments;return F()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,n));case 3:case"end":return f.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}}}},87336:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(15968),U={}},58217:function(te,_,e){e.r(_),e.d(_,{demos:function(){return E}});var K=e(24325),d=e.n(K),U=e(28633),L=e.n(U),S=e(29008),g=e.n(S),N=e(70958),F=e.n(N),s=e(92379),M=e(49613),x=e(24668),y=e(55267),E={"docs-guide-computed-run-demo-0":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b;return g()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=C.sent,a=p.createStore,r=p.computed,u=p.delay,C.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return v=C.sent,n=v.Divider,h=v.ColorBlock,f=v.Button,B=0,P={book:{name:"Zhang",count:4,price:100,total1:r(function(){var j=F()(g()().mark(function A(R){return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,u();case 2:return T.abrupt("return",R.count*R.price);case 3:case"end":return T.stop()}},A)}));return function(A){return j.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:r(function(){var j=F()(g()().mark(function A(R){return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,u();case 2:return T.abrupt("return",R.count*R.price);case 3:case"end":return T.stop()}},A)}));return function(A){return j.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:r(function(){var j=F()(g()().mark(function A(R){return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,u();case 2:return T.abrupt("return",R.count*R.price);case 3:case"end":return T.stop()}},A)}));return function(A){return j.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:r(function(){var j=F()(g()().mark(function A(R){return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,u();case 2:return T.abrupt("return",R.price/R.count);case 3:case"end":return T.stop()}},A)}));return function(A){return j.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:r(function(){var j=F()(g()().mark(function A(R){return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,u();case 2:return T.abrupt("return",R.price/R.count);case 3:case"end":return T.stop()}},A)}));return function(A){return j.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:r(function(){var j=F()(g()().mark(function A(R){return g()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,u();case 2:return T.abrupt("return",R.price/R.count);case 3:case"end":return T.stop()}},A)}));return function(A){return j.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},b=a(P),C.abrupt("return",{default:function(){var A=b.useState(),R=L()(A,1),W=R[0];return s.createElement("div",null,s.createElement(n,{title:"Total Group"}),s.createElement(h,{name:"Total1",loading:W.book.total1.loading},W.book.total1.loading?"\u8BA1\u7B97\u4E2D...":W.book.total1.value),s.createElement(h,{name:"Total2",loading:W.book.total2.loading},W.book.total2.loading?"\u8BA1\u7B97\u4E2D...":W.book.total2.value),s.createElement(h,{name:"Total3",loading:W.book.total3.loading},W.book.total3.loading?"\u8BA1\u7B97\u4E2D...":W.book.total3.value),s.createElement(f,{onClick:function(){return b.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),s.createElement(n,{title:"Average Group"}),s.createElement(h,{name:"Average1",loading:W.book.average1.loading}," ",W.book.average1.loading?"\u8BA1\u7B97\u4E2D...":W.book.average1.value),s.createElement(h,{name:"Average2",loading:W.book.average2.loading}," ",W.book.average2.loading?"\u8BA1\u7B97\u4E2D...":W.book.average2.value),s.createElement(h,{name:"Average3",loading:W.book.average3.loading}," ",W.book.average3.loading?"\u8BA1\u7B97\u4E2D...":W.book.average3.value),s.createElement(f,{onClick:function(){return b.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return C.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-computed-run-demo-1":{component:s.memo(s.lazy(F()(g()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D,C,j,A;return g()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=W.sent,a=p.createStore,r=p.computed,u=p.delay,W.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return v=W.sent,n=v.Divider,h=v.ColorBlock,f=v.Button,B=v.Input,P=0,b={book:{name:"Zhang",count:4,price:100,total1:r(function(){var T=F()(g()().mark(function Y(V){return g()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,u();case 2:return Q.abrupt("return",V.count*V.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return T.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:r(function(){var T=F()(g()().mark(function Y(V){return g()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,u();case 2:return Q.abrupt("return",V.count*V.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return T.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:r(function(){var T=F()(g()().mark(function Y(V){return g()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,u();case 2:return Q.abrupt("return",V.count*V.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return T.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},D=a(b),C=D.useState,j=D.computedObjects,A=D.bind,W.abrupt("return",{default:function(){var Y=C(),V=L()(Y,1),J=V[0];return s.createElement("div",null,s.createElement(h,{name:"BookName"},J.book.name),s.createElement(h,{name:"count"},s.createElement("div",{style:{display:"flex",alignItems:"center"}},s.createElement(f,{onClick:function(){return J.book.count--}},"-"),s.createElement(B,d()({value:J.book.count},A("book.count"))),s.createElement(f,{onClick:function(){return J.book.count++}},"+"))),s.createElement(h,{name:"price"}," ",s.createElement(B,d()({value:J.book.price},A("book.price")))),s.createElement(n,{title:"Total Group"}),s.createElement("table",{className:"table table-bordered"},s.createElement("tbody",null,s.createElement("tr",null,s.createElement("td",null,"Total1 ="),s.createElement("td",null,J.book.total1.loading?"\u8BA1\u7B97\u4E2D...":J.book.total1.value),s.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),s.createElement("tr",null,s.createElement("td",null,"Total2 ="),s.createElement("td",null,J.book.total2.loading?"\u8BA1\u7B97\u4E2D...":J.book.total2.value),s.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",s.createElement("input",{type:"checkbox",checked:j.get("book/total2")}),")")),s.createElement("tr",null,s.createElement("td",null,"Total3 ="),s.createElement("td",null,J.book.total3.loading?"\u8BA1\u7B97\u4E2D...":J.book.total3.value),s.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),s.createElement(f,{onClick:function(){return j.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return W.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(g()().mark(function a(){var r,u=arguments;return g()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}}}},87237:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(87975),N=e(24668),F=e(55267),s={"docs-guide-computed-scope-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=r.sent,y=x.ObserverScopeRef,E=x.useStore,r.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return m=r.sent,p=m.ColorBlock,r.abrupt("return",{default:function(){var v=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(f){return f.firstName+f.lastName}}},{scope:function(){return y.Current}}),n=v.state;return S.createElement("div",null,S.createElement(p,{name:"FullName"},n.user.fullName))}});case 10:case"end":return r.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-computed-scope-demo-1":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=r.sent,y=x.useStore,E=x.ObserverScopeRef,r.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return m=r.sent,p=m.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(f){return f.user.firstName+f.user.lastName}}},{scope:E.Root}),n=v.state;return S.createElement("div",null,S.createElement(p,{name:"FullName"},n.user.fullName))}});case 10:case"end":return r.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-computed-scope-demo-2":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r;return d()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=v.sent,y=x.createStore,E=x.ObserverScopeRef,v.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return m=v.sent,p=m.ColorBlock,a=y({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(h){return h.user.firstName+h.user.lastName}}}},{scope:E.Parent}),r=a.state,v.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(p,{name:"FullName"},r.parent.user.fullName))}});case 11:case"end":return v.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-computed-scope-demo-3":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=u.sent,y=x.createStore,u.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=u.sent,m=E.ColorBlock,p=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(n){return n},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),a=p.state,u.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(m,{name:"FullName"},a.user.fullName))}});case 10:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-computed-scope-demo-4":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=u.sent,y=x.createStore,u.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=u.sent,m=E.ColorBlock,p=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(n){return n},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),a=p.state,u.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(m,{name:"FullName"},a.user.fullName))}});case 10:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-computed-scope-demo-5":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=n.sent,y=x.createStore,E=x.computed,m=x.ObserverScopeRef,n.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return p=n.sent,a=p.ColorBlock,r=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:E(function(){var h=L()(d()().mark(function f(B){return d()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.abrupt("return",B[0]+B[1]);case 1:case"end":return b.stop()}},f)}));return function(f){return h.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:m.Depends})}}),u=r.state,n.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(a,{name:"FullName"},u.user.fullName.value))}});case 12:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},46369:function(te,_,e){e.r(_),e.d(_,{demos:function(){return x}});var K=e(29008),d=e.n(K),U=e(28633),L=e.n(U),S=e(70958),g=e.n(S),N=e(92379),F=e(48120),s=e(24668),M=e(55267),x={"docs-guide-computed-sync-demo-0":{component:N.memo(N.lazy(g()(d()().mark(function y(){var E,m,p,a,r,u;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=n.sent,m=E.createStore,n.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return p=n.sent,a=p.ColorBlock,r=p.Button,u=m({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(f){return f.firstName+f.lastName}}}),n.abrupt("return",{default:function(){var f=u.useState(),B=L()(f,2),P=B[0],b=B[1];return N.createElement("div",null,N.createElement(a,{name:"First Name"},P.user.firstName),N.createElement(a,{name:"Last Name"},P.user.lastName),N.createElement(a,{name:"Full Name"},P.user.fullName),N.createElement(r,{onClick:function(){return b(function(C){return C.user.firstName="\u2764\uFE0F"+C.user.firstName})}},"Change First Name"),N.createElement(r,{onClick:function(){return b(function(C){return C.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return n.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(d()().mark(function m(){var p,a=arguments;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}},"docs-guide-computed-sync-demo-1":{component:N.memo(N.lazy(g()(d()().mark(function y(){var E,m,p,a,r;return d()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=v.sent,m=E.createStore,v.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return p=v.sent,a=p.Button,r=m({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(h){return h.price*h.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(h){return h.price*h.count}}],total:function(h){return h.books.reduce(function(f,B){return f+B.total},0)}}),v.abrupt("return",{default:function(){var h=r.useState(),f=L()(h,2),B=f[0],P=f[1];return N.createElement("table",{className:"table table-bordered table-hover"},N.createElement("thead",null,N.createElement("tr",null,N.createElement("th",null,"\u4E66\u540D"),N.createElement("th",null,"\u4F5C\u8005"),N.createElement("th",null,"\u5355\u4EF7"),N.createElement("th",null,"\u6570\u91CF"),N.createElement("th",null,"\u5C0F\u8BA1"))),N.createElement("tbody",null,B.books.map(function(b,D){return N.createElement("tr",{key:D},N.createElement("td",null,b.name),N.createElement("td",null,b.author),N.createElement("td",null,b.price),N.createElement("td",null,N.createElement(a,{onClick:function(){return r.state.books[D].count--}},"-"),b.count,N.createElement(a,{onClick:function(){return r.state.books[D].count++}},"+")),N.createElement("td",null,b.total))}),N.createElement("tr",null,N.createElement("td",{colSpan:4},"\u603B\u8BA1"),N.createElement("td",null,B.total))))}});case 10:case"end":return v.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(d()().mark(function m(){var p,a=arguments;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}}}},23522:function(te,_,e){var K;e.r(_),e.d(_,{demos:function(){return E}});var d=e(29008),U=e.n(d),L=e(28633),S=e.n(L),g=e(70958),N=e.n(g),F=e(92379),s=e(89004),M=e(24668),x=e(55267),y=e(53225),E={"docs-guide-debug-circular-dependency-demo-0":{component:F.memo(F.lazy(N()(U()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b;return U()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=C.sent,a=p.useStore,r=p.computed,C.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return u=C.sent,v=u.ColorBlock,n=u.Button,h=u.JsonView,C.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return f=C.sent,B=f.useState,C.next=17,Promise.resolve().then(e.bind(e,53225));case 17:return P=C.sent,b=P.installCycleDetectExtend,b({onDetected:function(A){return console.error("\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56:",A),"disable"}}),C.abrupt("return",{default:function(){var A=B(null),R=S()(A,2),W=R[0],T=R[1],Y=a({x:1,a:r(function(){var q=N()(U()().mark(function X(ae){return U()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return de.abrupt("return",ae.b.value+ae.x);case 1:case"end":return de.stop()}},X)}));return function(X){return q.apply(this,arguments)}}(),["b","x"]),b:r(function(){var q=N()(U()().mark(function X(ae){return U()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return de.abrupt("return",ae.a.value+ +ae.x);case 1:case"end":return de.stop()}},X)}));return function(X){return q.apply(this,arguments)}}(),["a","x"])},{debug:!0}),V=Y.useState(),J=S()(V,1),Q=J[0];return F.createElement("div",null,F.createElement(v,{name:"x"},F.createElement(n,{onClick:function(){return Y.state.x--}},"-"),Y.$("x"),F.createElement(n,{onClick:function(){return Y.state.x++}},"+")),F.createElement("div",{style:{color:"red"}},W),F.createElement(h,{data:Q}))}});case 21:case"end":return C.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-debug-circular-dependency-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"@autostorejs/devtools":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7531\u4E8Ea,b\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u5185\u90E8\u4F1A\u5FFD\u7565a,b\u7684\u8BA1\u7B97\uFF0C\u5BFC\u81F4a,b\u7684\u503C\u4E3A\u65E0\u6CD5\u8BA1\u7B97\u3002",title:"\u6253\u5F00\u63A7\u5236\u53F0\u89C2\u5BDF\u4FE1\u606F"},context:{"@autostorejs/react":M,"x-react-components":x,react:K||(K=e.t(F,2)),"@autostorejs/devtools":y},renderOpts:{compile:function(){var m=N()(U()().mark(function a(){var r,u=arguments;return U()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}}}},21037:function(te,_,e){e.r(_),e.d(_,{demos:function(){return x}});var K=e(28633),d=e.n(K),U=e(29008),L=e.n(U),S=e(70958),g=e.n(S),N=e(92379),F=e(93359),s=e(24668),M=e(55267),x={"docs-guide-debug-dev-tools-demo-0":{component:N.memo(N.lazy(g()(L()().mark(function y(){var E,m,p,a,r,u,v,n,h,f;return L()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=P.sent,m=E.createStore,p=E.computed,P.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return a=P.sent,r=a.Button,u=a.ColorBlock,v=m({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(D){return D.firstName+D.lastName},salary:p(function(){var b=g()(L()().mark(function D(C){return L()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.abrupt("return",C.age*10);case 1:case"end":return A.stop()}},D)}));return function(D){return b.apply(this,arguments)}}(),["age"])},{debug:!0,id:"user"}),n=v.state,h=v.useState,f=v.$,P.abrupt("return",{default:function(){var D=h("age"),C=d()(D,2),j=C[0],A=C[1],R=h("salary"),W=d()(R,2),T=W[0],Y=W[1],V=h(function(X){return X.lastName},function(X,ae){return ae.lastName=X}),J=d()(V,2),Q=J[0],q=J[1];return N.createElement("div",null,N.createElement(u,null,"Fullname :",n.firstName," ",Q),N.createElement(u,null,"Age :",j),N.createElement(u,null,"Salary: ",f("salary")),N.createElement(r,{onClick:function(){return A(j+1)}},"Age++"),N.createElement(r,{onClick:function(){return q(Q+".")}},"Change lastName"))}});case 12:case"end":return P.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-dev-tools-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(L()().mark(function m(){var p,a=arguments;return L()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}}}},46365:function(te,_,e){var K;e.r(_),e.d(_,{demos:function(){return M}});var d=e(29008),U=e.n(d),L=e(70958),S=e.n(L),g=e(92379),N=e(6205),F=e(24668),s=e(55267),M={"docs-guide-debug-log-demo-0":{component:g.memo(g.lazy(S()(U()().mark(function x(){var y,E,m,p,a,r,u,v,n,h;return U()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return y=B.sent,E=y.useStore,m=y.computed,B.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return p=B.sent,a=p.Box,r=p.Button,u=p.ColorBlock,B.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return v=B.sent,n=v.useRef,h=function(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},B.abrupt("return",{default:function(){var b=n(),D=E({price:100,count:2,total:m(function(A){return A.price*A.count})},{debug:!0,log:function(R){var W=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"info",T=typeof R=="function"?R():R instanceof Error?R.message:R;b.current&&b.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        <b>[`.concat(W,"]</b> - ").concat(h(T),"</p>"))}}),C=D.state,j=D.$;return g.createElement("div",null,g.createElement(u,{name:"Price"},j("price")),g.createElement(u,{name:"Count"},g.createElement(r,{onClick:function(){return C.count--}},"-"),j("count"),g.createElement(r,{onClick:function(){return C.count++}},"+")),g.createElement(u,{name:"Total"},j("total")),g.createElement(r,{onClick:function(){return b.current.innerHTML=""}},"Clear"),g.createElement(a,{ref:b}))}});case 17:case"end":return B.stop()}},x)})))),asset:{type:"BLOCK",id:"docs-guide-debug-log-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u8C03\u8282count\u503C\uFF0C\u67E5\u770B\u65E5\u5FD7\u8F93\u51FA",title:"\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA"},context:{"@autostorejs/react":F,"x-react-components":s,react:K||(K=e.t(g,2))},renderOpts:{compile:function(){var x=S()(U()().mark(function E(){var m,p=arguments;return U()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,p));case 3:case"end":return r.stop()}},E)}));function y(){return x.apply(this,arguments)}return y}()}}}},13933:function(te,_,e){var K;e.r(_),e.d(_,{demos:function(){return M}});var d=e(29008),U=e.n(d),L=e(70958),S=e.n(L),g=e(92379),N=e(42246),F=e(24668),s=e(55267),M={"docs-guide-debug-trace-demo-0":{component:g.memo(g.lazy(S()(U()().mark(function x(){var y,E,m,p,a,r,u,v,n,h;return U()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return y=B.sent,E=y.createStore,B.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return m=B.sent,p=m.Box,B.next=10,Promise.resolve().then(e.t.bind(e,92379,19));case 10:return a=B.sent,r=a.useRef,u=a.useEffect,v=E({a:1,b:2,c:function(b){return b.a+b.b}}),n=v.state,h=v.trace,B.abrupt("return",{default:function(){var b=r();return u(function(){var D=h(function(){n.a=10,n.b=20});D.start().then(function(C){C.forEach(function(j){b.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(j.type," ").concat(j.path.join("."),"</p>"))})})},[]),g.createElement(p,{ref:b})}});case 15:case"end":return B.stop()}},x)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":F,"x-react-components":s,react:K||(K=e.t(g,2))},renderOpts:{compile:function(){var x=S()(U()().mark(function E(){var m,p=arguments;return U()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,p));case 3:case"end":return r.stop()}},E)}));function y(){return x.apply(this,arguments)}return y}()}},"docs-guide-debug-trace-demo-1":{component:g.memo(g.lazy(S()(U()().mark(function x(){var y,E,m,p,a,r,u,v,n,h,f,B;return U()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return y=b.sent,E=y.createStore,m=y.computed,p=y.delay,b.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return a=b.sent,r=a.Box,b.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return u=b.sent,v=u.useRef,n=u.useEffect,h=E({a:1,b:2,c:m(function(){var D=S()(U()().mark(function C(j){return U()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",j.a+j.b);case 1:case"end":return R.stop()}},C)}));return function(C){return D.apply(this,arguments)}}(),["a","b"])}),f=h.state,B=h.trace,b.abrupt("return",{default:function(){var C=v();return n(function(){var j=B(S()(U()().mark(function A(){return U()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return f.a=10,W.next=3,p();case 3:f.b=20;case 4:case"end":return W.stop()}},A)})));j.start().then(function(A){A.forEach(function(R){C.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(R.type," ").concat(R.path.join("."),"</p>"))})})},[]),g.createElement(r,{ref:C})}});case 17:case"end":return b.stop()}},x)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"c\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4F9D\u8D56\u4E8Ea\u548Cb\uFF0C\u5F53a\u6216b\u53D8\u5316\u65F6\uFF0Cc\u4F1A\u91CD\u65B0\u8BA1\u7B97",title:"\u5F02\u6B65\u8DDF\u8E2A"},context:{"@autostorejs/react":F,"x-react-components":s,react:K||(K=e.t(g,2))},renderOpts:{compile:function(){var x=S()(U()().mark(function E(){var m,p=arguments;return U()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,p));case 3:case"end":return r.stop()}},E)}));function y(){return x.apply(this,arguments)}return y}()}},"docs-guide-debug-trace-demo-2":{component:g.memo(g.lazy(S()(U()().mark(function x(){var y,E,m,p,a,r,u,v,n,h,f,B;return U()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return y=b.sent,E=y.createStore,m=y.computed,p=y.delay,b.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return a=b.sent,r=a.Box,b.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return u=b.sent,v=u.useRef,n=u.useEffect,h=E({a:1,b:2,c:m(function(){var D=S()(U()().mark(function C(j){return U()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",j.a+j.b);case 1:case"end":return R.stop()}},C)}));return function(C){return D.apply(this,arguments)}}(),["a","b"]),d:m(function(){var D=S()(U()().mark(function C(j){return U()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",j.c.value+1);case 1:case"end":return R.stop()}},C)}));return function(C){return D.apply(this,arguments)}}(),["c"])}),f=h.state,B=h.trace,b.abrupt("return",{default:function(){var C=v();return n(function(){var j=B(S()(U()().mark(function A(){return U()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return f.a=10,W.next=3,p();case 3:f.b=20;case 4:case"end":return W.stop()}},A)})));j.start().then(function(A){A.forEach(function(R){C.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(R.type," ").concat(R.path.join("."),"</p>"))})})},[]),g.createElement(r,{ref:C})}});case 17:case"end":return b.stop()}},x)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":F,"x-react-components":s,react:K||(K=e.t(g,2))},renderOpts:{compile:function(){var x=S()(U()().mark(function E(){var m,p=arguments;return U()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,p));case 3:case"end":return r.stop()}},E)}));function y(){return x.apply(this,arguments)}return y}()}},"docs-guide-debug-trace-demo-3":{component:g.memo(g.lazy(S()(U()().mark(function x(){var y,E,m,p,a,r,u,v,n,h,f,B;return U()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return y=b.sent,E=y.createStore,m=y.computed,p=y.delay,b.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return a=b.sent,r=a.Box,b.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return u=b.sent,v=u.useRef,n=u.useEffect,h=E({a:1,b:2,c:m(function(){var D=S()(U()().mark(function C(j){return U()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",j.a+j.b);case 1:case"end":return R.stop()}},C)}));return function(C){return D.apply(this,arguments)}}(),["a","b"]),d:m(function(){var D=S()(U()().mark(function C(j){return U()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",j.c.value+1);case 1:case"end":return R.stop()}},C)}));return function(C){return D.apply(this,arguments)}}(),["c"])}),f=h.state,B=h.trace,b.abrupt("return",{default:function(){var C=v();return n(function(){var j=B(S()(U()().mark(function A(){return U()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return f.a=10,W.next=3,p();case 3:f.b=20;case 4:case"end":return W.stop()}},A)})));j.start(function(A){if(A.type=="set"&&A.path.length===2&&A.path[0]==="d"&&A.path[1]==="value")return!0}).then(function(A){A.forEach(function(R){C.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(R.type," ").concat(R.path.join("."),"</p>"))})})},[]),g.createElement(r,{ref:C})}});case 17:case"end":return b.stop()}},x)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":F,"x-react-components":s,react:K||(K=e.t(g,2))},renderOpts:{compile:function(){var x=S()(U()().mark(function E(){var m,p=arguments;return U()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,p));case 3:case"end":return r.stop()}},E)}));function y(){return x.apply(this,arguments)}return y}()}}}},31996:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(76233),U={}},15274:function(te,_,e){e.r(_),e.d(_,{demos:function(){return E}});var K=e(29008),d=e.n(K),U=e(24325),L=e.n(U),S=e(28633),g=e.n(S),N=e(70958),F=e.n(N),s=e(92379),M=e(97820),x=e(24668),y=e(55267),E={"docs-guide-form-bind-demo-0":{component:s.memo(s.lazy(F()(d()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b;return d()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=C.sent,a=p.createStore,C.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return r=C.sent,u=r.ColorBlock,v=r.Button,n=r.Input,h=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(A){return A.firstName+A.lastName}}}),f=h.state,B=h.$,P=h.bind,b=h.useState,C.abrupt("return",{default:function(){var A=b("user.firstName"),R=g()(A,2),W=R[0],T=R[1],Y=b("user.lastName"),V=g()(Y,2),J=V[0],Q=V[1],q=b("user.vip"),X=g()(q,2),ae=X[0],xe=X[1];return s.createElement("div",null,s.createElement(n,L()(L()({label:"First Name"},P("user.firstName")),{},{value:W})),s.createElement(n,L()(L()({label:"last Name"},P("user.lastName")),{},{value:J})),s.createElement(n,L()(L()({type:"checkbox",label:"VIP"},P("user.vip")),{},{value:ae})),s.createElement(u,{name:"First Name"},B("user.firstName")),s.createElement(u,{name:"Last Name"},B("user.lastName")),s.createElement(u,{name:"Full Name"},B("user.fullName")),s.createElement(u,{name:"VIP"},B("user.vip")),s.createElement(v,{onClick:function(){T("Zhang"),Q("Fisher")}},"Reset"))}});case 12:case"end":return C.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(d()().mark(function a(){var r,u=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}}}},55106:function(te,_,e){e.r(_),e.d(_,{demos:function(){return x}});var K=e(29008),d=e.n(K),U=e(24325),L=e.n(U),S=e(70958),g=e.n(S),N=e(92379),F=e(12357),s=e(24668),M=e(55267),x={"docs-guide-form-use-bindings-demo-0":{component:N.memo(N.lazy(g()(d()().mark(function y(){var E,m,p,a,r,u,v;return d()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=h.sent,m=E.useStore,h.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return p=h.sent,a=p.Layout,r=p.ColorBlock,u=p.Button,v=p.Input,h.abrupt("return",{default:function(){var B=m({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),P=B.state,b=B.$,D=B.useBindings,C=D();return N.createElement(a,null,N.createElement("div",null,N.createElement(v,L()({label:"First Name"},C.user.firstName)),N.createElement(v,L()({label:"last Name"},C.user.lastName)),N.createElement(v,L()({label:"Age"},C.user.age)),N.createElement(v,L()({type:"checkbox",label:"VIP"},C.user.vip)),N.createElement(u,{onClick:function(){P.user.firstName="Zhang",P.user.lastName="Fisher",P.user.age=18,P.user.vip=!1}},"Reset")),N.createElement("div",null,N.createElement(r,{name:"First Name"},b("user.firstName")),N.createElement(r,{name:"Last Name"},b("user.lastName")),N.createElement(r,{name:"Age"},b("user.age")),N.createElement(r,{name:"VIP"},b("user.vip"))))}});case 12:case"end":return h.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(d()().mark(function m(){var p,a=arguments;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}}}},4493:function(te,_,e){e.r(_),e.d(_,{demos:function(){return x}});var K=e(29008),d=e.n(K),U=e(28633),L=e.n(U),S=e(70958),g=e.n(S),N=e(92379),F=e(79247),s=e(24668),M=e(55267),x={"docs-guide-form-use-form-demo-0":{component:N.memo(N.lazy(g()(d()().mark(function y(){var E,m,p,a,r,u,v,n,h,f;return d()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=P.sent,m=E.useStore,P.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return p=P.sent,a=p.TextArea,r=p.Layout,u=p.Button,v=p.Input,n=p.CheckBox,h=p.JsonView,f=p.Select,P.abrupt("return",{default:function(){var D=m({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),C=D.state,j=D.$,A=D.useForm,R=D.useState,W=R(),T=L()(W,1),Y=T[0],V=A(),J=V.Form;return N.createElement(r,null,N.createElement("div",null,N.createElement(J,null,N.createElement(v,{name:"user.firstName",label:"First Name"}),N.createElement(v,{name:"user.lastName",label:"lastName"}),N.createElement(v,{name:"user.age",label:"Age"}),N.createElement(f,{name:"user.job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),N.createElement(a,{name:"user.resume",label:"Resume"}),N.createElement(n,{name:"user.vip",label:"VIP"})),N.createElement(u,{onClick:function(){C.user.firstName="Zhang",C.user.lastName="Fisher",C.user.age=18,C.user.vip=!1}},"Reset")),N.createElement("div",null,N.createElement(h,{data:Y})))}});case 15:case"end":return P.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(d()().mark(function m(){var p,a=arguments;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}},"docs-guide-form-use-form-demo-1":{component:N.memo(N.lazy(g()(d()().mark(function y(){var E,m,p,a,r,u,v,n,h,f,B;return d()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=b.sent,m=E.useStore,b.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return p=b.sent,a=p.TextArea,r=p.Layout,u=p.ColorBlock,v=p.Button,n=p.Input,h=p.CheckBox,f=p.JsonView,B=p.Select,b.abrupt("return",{default:function(){var C=m({user:{firstName:"Zh",lastName:"Fi",age:"18n",email:"",vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),j=C.state,A=C.$,R=C.useForm,W=C.useState,T=W(),Y=L()(T,1),V=Y[0],J=R({validate:function(xe,de){if(xe=="user.firstName")return de.length>3;if(xe=="user.lastName")return de.length>3;if(xe=="user.age")return!isNaN(parseFloat(de))&&isFinite(de)&&parseInt(de)>0}}),Q=J.Form,q=J.valid,X=J.dirty;return N.createElement(r,null,N.createElement("div",null,N.createElement(u,{name:"\u6709\u6548"},String(q)),N.createElement(u,{name:"\u810F"},String(X)),N.createElement(Q,null,N.createElement(n,{name:"user.firstName",label:"First Name","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),N.createElement(n,{name:"user.lastName",label:"lastName","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),N.createElement(n,{name:"user.age",label:"Age","data-error-tips":"\u5FC5\u987B\u662F\u5927\u4E8E0\u7684\u6570\u5B57"}),N.createElement(n,{name:"user.email",label:"Email",type:"email","data-error-tips":"\u5FC5\u987B\u8F93\u5165\u6709\u6548\u7684Email"}),N.createElement(B,{name:"job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),N.createElement(a,{name:"user.resume",label:"Resume","data-error-tips":"\u4E0D\u80FD\u5927\u4E8E20\u4E2A\u5B57\u7B26"}),N.createElement(h,{name:"user.vip",label:"VIP"})),N.createElement(v,{onClick:function(){j.user.firstName="Zhang",j.user.lastName="Fisher",j.user.age=18,j.user.vip=!1}},"Reset")),N.createElement("div",null,N.createElement(f,{data:V})))}});case 16:case"end":return b.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u65E0\u6548\u7684\u6570\u636E\u770B\u770B\u4F1A\u53D1\u751F\u4EC0\u4E48",title:"\u8868\u5355\u8F93\u5165\u6821\u9A8C"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(d()().mark(function m(){var p,a=arguments;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}}}},72433:function(te,_,e){e.r(_),e.d(_,{demos:function(){return E}});var K=e(28633),d=e.n(K),U=e(29008),L=e.n(U),S=e(24325),g=e.n(S),N=e(70958),F=e.n(N),s=e(92379),M=e(45889),x=e(24668),y=e(55267),E={"docs-guide-form-use-input-demo-0":{component:s.memo(s.lazy(F()(L()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D;return L()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=j.sent,a=p.createStore,j.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return r=j.sent,u=r.ColorBlock,v=r.Button,n=r.Input,h=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),f=h.state,B=h.$,P=h.bind,b=h.useState,D=h.useInput,j.abrupt("return",{default:function(){var R=D("user.firstName"),W=D("user.lastName"),T=D("user.vip"),Y=D("user.job");return s.createElement("div",null,s.createElement(n,g()({label:"First Name"},R)),s.createElement(n,g()({label:"last Name"},W)),s.createElement(n,g()({type:"checkbox",label:"VIP"},T)),s.createElement(u,{name:"Job"},s.createElement("select",g()({id:"job"},Y),s.createElement("option",{value:"1"},"Engineer"),s.createElement("option",{value:"2"},"Doctor"),s.createElement("option",{value:"3"},"Teacher"))),s.createElement(u,{name:"First Name"},B("user.firstName")),s.createElement(u,{name:"Last Name"},B("user.lastName")),s.createElement(u,{name:"VIP"},B("user.vip")),s.createElement(u,{name:"Job"},B("user.job")),s.createElement(v,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return j.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind, useState,useInput } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    vip:false, 
    job:"unknown"
  }
})

export default ()=>{
  const bindFirstName = useInput("user.firstName")
  const bindLastName = useInput("user.lastName")
  const bindVip = useInput("user.vip")
  const bindJob = useInput("user.job")
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useInput"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(L()().mark(function a(){var r,u=arguments;return L()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-form-use-input-demo-1":{component:s.memo(s.lazy(F()(L()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b,D;return L()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=j.sent,a=p.createStore,j.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return r=j.sent,u=r.ColorBlock,v=r.Button,n=r.Input,h=a({user:{firstName:"Zhang",lastName:"Fisher"}}),f=h.state,B=h.$,P=h.bind,b=h.useState,D=h.useInput,j.abrupt("return",{default:function(){var R=D(function(W){return W.user.firstName+" "+W.user.lastName},function(W,T){var Y=W.split(/\s+/),V=d()(Y,2),J=V[0],Q=V[1];T.user.firstName=J,T.user.lastName=Q});return s.createElement("div",null,s.createElement(n,g()({label:"FullName"},R)),s.createElement(u,{name:"First Name"},B("user.firstName")),s.createElement(u,{name:"Last Name"},B("user.lastName")),s.createElement(v,{onClick:function(){f.user.firstName="Zhang",f.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return j.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind, useState,useInput } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher" 
  }
})

export default ()=>{ 
  const bindFullName = useInput(
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(L()().mark(function a(){var r,u=arguments;return L()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-form-use-input-demo-2":{component:s.memo(s.lazy(F()(L()().mark(function m(){var p,a,r,u,v,n,h,f,B,P,b;return L()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=C.sent,a=p.createStore,C.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return r=C.sent,u=r.ColorBlock,v=r.Button,n=r.Input,h=a({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),f=h.state,B=h.$,P=h.bind,b=h.useInput,C.abrupt("return",{default:function(){var A=b("user");return s.createElement("div",null,s.createElement(n,g()({label:"First Name"},A.firstName)),s.createElement(n,g()({label:"last Name"},A.lastName)),s.createElement(n,g()({label:"Age"},A.age)),s.createElement(n,g()({type:"checkbox",label:"VIP"},A.vip)),s.createElement(u,{name:"First Name"},B("user.firstName")),s.createElement(u,{name:"Last Name"},B("user.lastName")),s.createElement(u,{name:"Age"},B("user.age")),s.createElement(u,{name:"VIP"},B("user.vip")),s.createElement(v,{onClick:function(){f.user.firstName="Zhang",f.user.lastName="Fisher",f.user.age=18,f.user.vip=!1}},"Reset"))}});case 12:case"end":return C.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind,useInput } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }
})

export default ()=>{
  
  const bindUser = useInput("user")

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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(L()().mark(function a(){var r,u=arguments;return L()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}},"docs-guide-form-use-input-demo-3":{component:s.memo(s.lazy(F()(L()().mark(function m(){var p,a,r,u,v,n;return L()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return p=f.sent,a=p.useStore,f.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return r=f.sent,u=r.ColorBlock,v=r.Button,n=r.Input,f.abrupt("return",{default:function(){var P=a({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),b=P.state,D=P.$,C=P.bind,j=P.useInput,A=j();return s.createElement("div",null,s.createElement(n,g()({label:"First Name"},A.firstName)),s.createElement(n,g()({label:"last Name"},A.lastName)),s.createElement(n,g()({label:"Age"},A.age)),s.createElement(n,g()({type:"checkbox",label:"VIP"},A.vip)),s.createElement(u,{name:"First Name"},D("firstName")),s.createElement(u,{name:"Last Name"},D("lastName")),s.createElement(u,{name:"Age"},D("age")),s.createElement(u,{name:"VIP"},D("vip")),s.createElement(v,{onClick:function(){b.firstName="Zhang",b.lastName="Fisher",b.age=18,b.vip=!1}},"Reset"))}});case 11:case"end":return f.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

 
export default ()=>{

  const { state, $, bind,useInput } = useStore({
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
  })

  const bindUser = useInput()

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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":x,"x-react-components":y},renderOpts:{compile:function(){var m=F()(L()().mark(function a(){var r,u=arguments;return L()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,u));case 3:case"end":return n.stop()}},a)}));function p(){return m.apply(this,arguments)}return p}()}}}},50090:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(9159),U={}},91775:function(te,_,e){e.r(_),e.d(_,{demos:function(){return p}});var K=e(24325),d=e.n(K),U=e(12027),L=e.n(U),S=e(29008),g=e.n(S),N=e(28633),F=e.n(N),s=e(70958),M=e.n(s),x=e(92379),y=e(61077),E=e(24668),m=e(55267),p={"docs-guide-intro-get-started-demo-0":{component:x.memo(x.lazy(M()(g()().mark(function a(){var r,u,v,n,h,f,B,P,b,D,C,j;return g()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return r=R.sent,u=r.createStore,R.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return v=R.sent,n=v.ColorBlock,h=v.Button,f=v.Divider,B=v.Layout,P=v.JsonView,b=u({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:39.9,count:1,total:function(T){return T.price*T.count}}],total:function(T){return T.orders.reduce(function(Y,V){return Y+V.total},0)}}),D=b.state,C=b.$,j=b.useState,R.abrupt("return",{default:function(){var T=j(),Y=F()(T,1),V=Y[0];return x.createElement(B,null,x.createElement("div",null,x.createElement(n,{name:"\u4E66\u540D"},C("orders.0.book")),x.createElement(n,{name:"\u5355\u4EF7"},C("orders.0.price")),x.createElement(n,{name:"\u6570\u91CF"},x.createElement(h,{onClick:function(){return D.orders[0].count--}},"-"),C("orders.0.count"),x.createElement(h,{onClick:function(){return D.orders[0].count++}},"+")),x.createElement(n,{name:"\u5C0F\u8BA1"},C("orders.0.total")),x.createElement(f,null),x.createElement(n,{name:"\u603B\u8BA1"},C("total"))),x.createElement("div",null,x.createElement(P,{data:V})))}});case 14:case"end":return R.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":E,"x-react-components":m},renderOpts:{compile:function(){var a=M()(g()().mark(function u(){var v,n=arguments;return g()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,n));case 3:case"end":return f.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}},"docs-guide-intro-get-started-demo-1":{component:x.memo(x.lazy(M()(g()().mark(function a(){var r,u,v,n,h,f,B,P,b,D,C;return g()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return r=A.sent,u=r.createStore,v=r.delay,n=r.computed,A.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return h=A.sent,f=h.Button,B=h.Table,P=u({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(W){return Math.floor(W.price*W.count)}}],discount:n(function(){var R=M()(g()().mark(function W(T){return g()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,v(2e3);case 2:return V.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return V.stop()}},W)}));return function(W){return R.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:n(function(){var R=M()(g()().mark(function W(T){return g()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.abrupt("return",(T.orders.reduce(function(J,Q){return J+Q.total},0)*T.discount.value).toFixed(2));case 1:case"end":return V.stop()}},W)}));return function(W){return R.apply(this,arguments)}}(),["discount"])}),b=P.state,D=P.$,C=P.useState,A.abrupt("return",{default:function(){var W=C(),T=F()(W,1),Y=T[0];return x.createElement("div",null,x.createElement(B,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(L()(Y.orders.map(function(V,J){return[V.book,"\uFFE5".concat(V.price),function(){return x.createElement("div",null,x.createElement(f,{onClick:function(){return V.count--}},"-"),V.count,x.createElement(f,{onClick:function(){return V.count++}},"+"))},"\uFFE5".concat(V.total)]})),[["\u6298\u6263",null,null,function(){return x.createElement(x.Fragment,null,D("discount"))}],["\u603B\u8BA1",null,null,function(){return x.createElement(x.Fragment,null,"\uFFE5",D("total"))}]])}))}});case 13:case"end":return A.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":E,"x-react-components":m},renderOpts:{compile:function(){var a=M()(g()().mark(function u(){var v,n=arguments;return g()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,n));case 3:case"end":return f.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}},"docs-guide-intro-get-started-demo-2":{component:x.memo(x.lazy(M()(g()().mark(function a(){var r,u,v,n,h,f,B,P,b,D,C,j;return g()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return r=R.sent,u=r.createStore,v=r.delay,n=r.computed,R.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return h=R.sent,f=h.Button,B=h.Loading,P=h.Table,b=u({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(T){return Math.floor(T.price*T.count)}}],discount:n(function(){var W=M()(g()().mark(function T(Y){return g()().wrap(function(J){for(;;)switch(J.prev=J.next){case 0:return J.next=2,v(2e3);case 2:return J.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return J.stop()}},T)}));return function(T){return W.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:n(function(){var W=M()(g()().mark(function T(Y){return g()().wrap(function(J){for(;;)switch(J.prev=J.next){case 0:return J.next=2,v(2e3);case 2:return J.abrupt("return",(Y.orders.reduce(function(Q,q){return Q+q.total},0)*Y.discount.value).toFixed(2));case 3:case"end":return J.stop()}},T)}));return function(T){return W.apply(this,arguments)}}(),["discount"])}),D=b.state,C=b.$,j=b.useState,R.abrupt("return",{default:function(){var T=j(),Y=F()(T,1),V=Y[0];return x.createElement("div",null,x.createElement(P,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(L()(V.orders.map(function(J,Q){return[J.book,"\uFFE5".concat(J.price),function(){return x.createElement("div",null,x.createElement(f,{onClick:function(){return J.count--}},"-"),J.count,x.createElement(f,{onClick:function(){return J.count++}},"+"))},"\uFFE5".concat(J.total)]})),[["\u6298\u6263",null,null,function(){return x.createElement(x.Fragment,null,V.discount.loading?x.createElement(B,null):V.discount.value)}],["\u603B\u8BA1",null,null,function(){return x.createElement(x.Fragment,null,V.total.loading?x.createElement(B,null):V.total.value)}]])}))}});case 14:case"end":return R.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":E,"x-react-components":m},renderOpts:{compile:function(){var a=M()(g()().mark(function u(){var v,n=arguments;return g()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,n));case 3:case"end":return f.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}},"docs-guide-intro-get-started-demo-3":{component:x.memo(x.lazy(M()(g()().mark(function a(){var r,u,v,n,h,f,B,P,b,D,C,j,A,R,W;return g()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return r=Y.sent,u=r.createStore,v=r.delay,n=r.computed,h=r.useStore,Y.next=9,Promise.resolve().then(e.bind(e,55267));case 9:return f=Y.sent,B=f.Input,P=f.Button,b=f.Loading,D=f.Table,C=function(J){return Math.floor(J.price*J.count)},j=u({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:C}],discount:n(function(){var V=M()(g()().mark(function J(Q){return g()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,v(2e3);case 2:return X.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return X.stop()}},J)}));return function(J){return V.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:n(function(){var V=M()(g()().mark(function J(Q){return g()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,v(2e3);case 2:return X.abrupt("return",(Q.orders.reduce(function(ae,xe){return ae+xe.total},0)*Q.discount.value).toFixed(2));case 3:case"end":return X.stop()}},J)}));return function(J){return V.apply(this,arguments)}}(),["discount"])}),A=j.state,R=j.$,W=j.useState,Y.abrupt("return",{default:function(){var J=W(),Q=F()(J,1),q=Q[0],X=h({book:"\u7CBE\u901AAutoStore",price:10,count:1}),ae=X.state,xe=X.useForm,de=xe();return x.createElement("div",null,x.createElement(D,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(L()(q.orders.map(function(he,ge){return[he.book,"\uFFE5".concat(he.price),function(){return x.createElement("div",null,x.createElement(P,{onClick:function(){return he.count--}},"-"),he.count,x.createElement(P,{onClick:function(){return he.count++}},"+"))},"\uFFE5".concat(he.total)]})),[["\u6298\u6263",null,null,function(){return x.createElement(x.Fragment,null,q.discount.loading?x.createElement(b,null):q.discount.value)}],["\u603B\u8BA1",null,null,function(){return x.createElement(x.Fragment,null,q.total.loading?x.createElement(b,null):q.total.value)}]])},x.createElement("form",de,x.createElement("h5",null,"\u65B0\u589E\u8BA2\u5355"),x.createElement(B,{name:"book"}),x.createElement(B,{name:"price"}),x.createElement(B,{name:"count"}),x.createElement(P,{onClick:function(){A.orders.push(d()(d()({},ae),{},{total:C}))}},"Add"))))}});case 17:case"end":return Y.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed,useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":E,"x-react-components":m},renderOpts:{compile:function(){var a=M()(g()().mark(function u(){var v,n=arguments;return g()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,n));case 3:case"end":return f.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}}}},74905:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(47315),U={}},41344:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(26916),U={}},10117:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(3694),U={}},31837:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(4180),N=e(24668),F=e(55267),s={"docs-guide-signal-about-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=n.sent,y=x.createStore,n.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=n.sent,m=E.Button,p=E.ColorBlock,a=y({age:18}),r=a.state,u=a.$,n.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(p,null,"Age+Signal :",u("age")),S.createElement(p,null,"Age :",r.age),S.createElement(m,{onClick:function(){return r.age=r.age+1}},"+Age"))}});case 11:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},11296:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(75690),U={}},14787:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(8767),N=e(24668),F=e(55267),s={"docs-guide-signal-computed-render-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=r.sent,y=x.useStore,r.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=r.sent,m=E.Button,p=E.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),n=v.state,h=v.$;return S.createElement("div",null,S.createElement(p,{name:"Age"},h(function(f){var B=f.value;return S.createElement("div",null,B)},function(f){return f.user.age})),S.createElement(m,{onClick:function(){return n.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-computed-render-demo-1":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=u.sent,y=x.useStore,E=x.computed,u.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return m=u.sent,p=m.Button,a=m.ColorBlock,u.abrupt("return",{default:function(){var n=y({user:{age:18}}),h=n.state,f=n.$;return S.createElement("div",null,S.createElement(a,{name:"Age"},f(function(B){var P=B.value;return S.createElement("div",null,P)},E(function(B){return B.user.age}))),S.createElement(p,{onClick:function(){return h.user.age++}},"+Age"))}});case 11:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-computed-render-demo-2":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=n.sent,y=x.useStore,E=x.delay,m=x.computed,n.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return p=n.sent,a=p.Button,r=p.ColorBlock,u=p.Loading,n.abrupt("return",{default:function(){var f=y({order:{price:10,count:1}}),B=f.state,P=f.$;return S.createElement("div",null,S.createElement(r,{name:"Price"},P("order.price")),S.createElement(r,{name:"Count"},P("order.count")),S.createElement(r,{name:"Total"},P(function(b){var D=b.value,C=b.loading;return S.createElement("div",null,C?S.createElement(u,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},m(function(){var b=L()(d()().mark(function D(C){return d()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,E(1e3);case 2:return A.abrupt("return",C.order.price*C.order.count);case 3:case"end":return A.stop()}},D)}));return function(D){return b.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),S.createElement(a,{onClick:function(){return B.order.count++}},"Count++"))}});case 13:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},14727:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(63518),N=e(24668),F=e(55267),s={"docs-guide-signal-custom-render-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=r.sent,y=x.useStore,r.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=r.sent,m=E.Button,p=E.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),n=v.state,h=v.$;return S.createElement("div",null,S.createElement(p,{name:"Age"},h(function(f){var B=f.value;return S.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},S.createElement("span",{style:{flexGrow:1}},B),S.createElement(m,{onClick:function(){return n.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return r.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-custom-render-demo-1":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r;return d()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=v.sent,y=x.useStore,E=x.delay,m=x.computed,v.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return p=v.sent,a=p.Button,r=p.ColorBlock,v.abrupt("return",{default:function(){var h=y({order:{price:100,count:1,total:m(function(){var D=L()(d()().mark(function C(j){return d()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,E();case 2:return R.abrupt("return",j.price*j.count);case 3:case"end":return R.stop()}},C)}));return function(C){return D.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),f=h.state,B=h.$,P=h.useAsyncState,b=P("order.total");return S.createElement("div",null,S.createElement(r,{name:"Price"},B("order.price")),S.createElement(r,{name:"Count"},B("order.count")),S.createElement(r,{name:"Total",loading:b.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},B("order.total.value")),S.createElement(r,{name:"Total",loading:b.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},B("order.total")),S.createElement(a,{onClick:function(){return f.order.count++}},"+Count"))}});case 12:case"end":return v.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-custom-render-demo-2":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u,v,n;return d()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=f.sent,y=x.createStore,E=x.computed,m=x.delay,f.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return p=f.sent,a=p.Button,r=p.ColorBlock,u=y({order:{price:100,count:1,total:E(function(){var B=L()(d()().mark(function P(b){return d()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,m(2e3);case 2:return C.abrupt("return",b.price*b.count);case 3:case"end":return C.stop()}},P)}));return function(P){return B.apply(this,arguments)}}(),["./price","./count"])}}),v=u.state,n=u.$,f.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(r,{name:"Price"},n("order.price")),S.createElement(r,{name:"Count"},n("order.count")),S.createElement(r,{name:"Total"},n(function(P){var b=P.value,D=P.loading;return S.createElement(S.Fragment,null,D&&S.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!D&&S.createElement("span",null,b,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),S.createElement(a,{onClick:function(){return v.order.count++}},"Count++"))}});case 13:case"end":return f.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},67317:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(35371),U={}},5619:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(33358),N=e(24668),F=e(55267),s={"docs-guide-signal-state-render-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=r.sent,y=x.useStore,r.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=r.sent,m=E.Button,p=E.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),n=v.state,h=v.$;return S.createElement("div",null,S.createElement(p,{name:"Age"},h("user.age")),S.createElement(m,{onClick:function(){return n.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-state-render-demo-1":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u,v;return d()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=h.sent,y=x.createStore,h.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=h.sent,m=E.Button,p=E.ColorBlock,a=y({user:{firstName:"\u5F20",lastName:"\u4E09"}}),r=a.state,u=a.signal,v=a.$,h.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(p,{name:"FirstName"},v("user.firstName")),S.createElement(p,{name:"LastName"},v("user.lastName")),S.createElement(p,null,"FullName :",v(function(B){return B.user.firstName+" "+B.user.lastName})),S.createElement(p,null,"FullName :",v(function(B){return S.createElement("span",{style:{color:"yellow"}},B.user.firstName," - ",B.user.lastName)})),S.createElement(m,{onClick:function(){return r.user.firstName=r.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),S.createElement(m,{onClick:function(){return r.user.lastName=r.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return h.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-state-render-demo-2":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u,v,n;return d()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=f.sent,y=x.createStore,E=x.delay,m=x.computed,f.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return p=f.sent,a=p.Button,r=p.ColorBlock,u=y({order:{price:100,count:1,total:m(function(){var B=L()(d()().mark(function P(b){return d()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,E(1e3);case 2:return C.abrupt("return",b.price*b.count);case 3:case"end":return C.stop()}},P)}));return function(P){return B.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),v=u.state,n=u.$,f.abrupt("return",{default:function(){return S.createElement("div",null,S.createElement(r,{name:"Price"},n("order.price")),S.createElement(r,{name:"Count"},n("order.count")),S.createElement(r,{name:"Total"},n("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),S.createElement(r,{name:"Total"},n("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),S.createElement(a,{onClick:function(){return v.order.count++}},"+Count"))}});case 13:case"end":return f.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},22234:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(23841),N=e(24668),F=e(55267),s={"docs-guide-signal-watch-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=r.sent,y=x.useStore,r.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=r.sent,m=E.Button,p=E.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),n=v.state,h=v.$;return S.createElement("div",null,S.createElement(p,{name:"Age"},h(function(f){var B=f.value;return S.createElement("div",null,B)},function(f){return f.user.age})),S.createElement(m,{onClick:function(){return n.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-watch-demo-1":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=u.sent,y=x.useStore,E=x.computed,u.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return m=u.sent,p=m.Button,a=m.ColorBlock,u.abrupt("return",{default:function(){var n=y({user:{age:18}}),h=n.state,f=n.$;return S.createElement("div",null,S.createElement(a,{name:"Age"},f(function(B){var P=B.value;return S.createElement("div",null,P)},E(function(B){return B.user.age}))),S.createElement(p,{onClick:function(){return h.user.age++}},"+Age"))}});case 11:case"end":return u.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}},"docs-guide-signal-watch-demo-2":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=n.sent,y=x.useStore,E=x.delay,m=x.computed,n.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return p=n.sent,a=p.Button,r=p.ColorBlock,u=p.Loading,n.abrupt("return",{default:function(){var f=y({order:{price:10,count:1}}),B=f.state,P=f.$;return S.createElement("div",null,S.createElement(r,{name:"Price"},P("order.price")),S.createElement(r,{name:"Count"},P("order.count")),S.createElement(r,{name:"Total"},P(function(b){var D=b.value,C=b.loading;return S.createElement("div",null,C?S.createElement(u,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},m(function(){var b=L()(d()().mark(function D(C){return d()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,E(1e3);case 2:return A.abrupt("return",C.order.price*C.order.count);case 3:case"end":return A.stop()}},D)}));return function(D){return b.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),S.createElement(a,{onClick:function(){return B.order.count++}},"Count++"))}});case 13:case"end":return n.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},83786:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(31363),U={}},16645:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(81897),U={}},77680:function(te,_,e){var K;e.r(_),e.d(_,{demos:function(){return y}});var d=e(29008),U=e.n(d),L=e(28633),S=e.n(L),g=e(70958),N=e.n(g),F=e(92379),s=e(94451),M=e(55267),x=e(24668),y={"docs-guide-store-render-demo-0":{component:F.memo(F.lazy(N()(U()().mark(function E(){var m,p,a,r,u,v,n,h,f,B,P,b;return U()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return m=C.sent,p=m.default,a=m.createContext,r=m.useContext,u=m.useState,C.next=9,Promise.resolve().then(e.bind(e,55267));case 9:return v=C.sent,n=v.ColorBlock,h=v.Button,f=v.Divider,B=a({firstName:"Zhang",lastName:"Fisher",age:18}),P=p.memo(function(j){var A=r(B);return p.createElement(n,{name:"\u5B50\u7EC4\u4EF6:".concat(j.name)},p.createElement("span",null,"Hello :",A.firstName," ",A.lastName))}),b=0,C.abrupt("return",{default:function(){var A=u({firstName:"Zhang",lastName:"Fisher",age:18}),R=S()(A,2),W=R[0],T=R[1];return p.createElement(B.Provider,{value:W},p.createElement(f,{title:"\u6839\u7EC4\u4EF6"}),p.createElement(n,{name:"FullName"},W.firstName," ",W.lastName),p.createElement(n,{name:"Age"},"Age :",W.age),p.createElement(f,{title:"\u5B50\u7EC4\u4EF6"}),p.createElement(P,{name:"A"}),p.createElement(P,{name:"B"}),p.createElement(h,{onClick:function(){T({firstName:"Zhang",lastName:"Fisher",age:++b})}},"+Age"))}});case 17:case"end":return C.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{react:K||(K=e.t(F,2)),"x-react-components":M},renderOpts:{compile:function(){var E=N()(U()().mark(function p(){var a,r=arguments;return U()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(9039).then(e.bind(e,39039));case 2:return v.abrupt("return",(a=v.sent).default.apply(a,r));case 3:case"end":return v.stop()}},p)}));function m(){return E.apply(this,arguments)}return m}()}},"docs-guide-store-render-demo-1":{component:F.memo(F.lazy(N()(U()().mark(function E(){var m,p,a,r,u,v,n,h,f,B,P,b;return U()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return m=C.sent,p=m.createStore,C.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=C.sent,r=a.default,C.next=10,Promise.resolve().then(e.bind(e,55267));case 10:return u=C.sent,v=u.ColorBlock,n=u.Button,h=u.Divider,f=p({firstName:"Zhang",lastName:"Fisher",age:18}),B=r.memo(function(j){var A=f.useState("firstName"),R=S()(A,1),W=R[0];return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:FirstName"},W)}),P=r.memo(function(j){var A=f.useState("lastName"),R=S()(A,1),W=R[0];return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:lastName"},W)}),b=0,C.abrupt("return",{default:function(){var A=f.useState("age"),R=S()(A,1),W=R[0];return r.createElement(r.Fragment,null,r.createElement(h,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(v,{name:"FullName"},"Hello :",f.state.firstName," ",f.state.lastName),r.createElement(v,{name:"Age"},W),r.createElement(h,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(B,null),r.createElement(P,null),r.createElement(n,{onClick:function(){return f.state.age=f.state.age+1}},"+Age"),r.createElement(n,{onClick:function(){return f.state.firstName=f.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return C.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,react:K||(K=e.t(F,2)),"x-react-components":M},renderOpts:{compile:function(){var E=N()(U()().mark(function p(){var a,r=arguments;return U()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(9039).then(e.bind(e,39039));case 2:return v.abrupt("return",(a=v.sent).default.apply(a,r));case 3:case"end":return v.stop()}},p)}));function m(){return E.apply(this,arguments)}return m}()}},"docs-guide-store-render-demo-2":{component:F.memo(F.lazy(N()(U()().mark(function E(){var m,p,a,r,u,v,n,h,f,B,P,b,D,C;return U()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return m=A.sent,p=m.createStore,A.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=A.sent,r=a.default,A.next=10,Promise.resolve().then(e.bind(e,55267));case 10:return u=A.sent,v=u.ColorBlock,n=u.Button,h=u.Divider,f=p({firstName:"Zhang",lastName:"Fisher",age:18}),B=f.state,P=f.$,b=function(){return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:FirstName"},P("firstName"))},D=function(){return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:LastName"},P("lastName"))},C=0,A.abrupt("return",{default:function(){return r.createElement(r.Fragment,null,r.createElement(h,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(v,{name:"FullName"},P("firstName")," ",P("lastName")),r.createElement(v,{name:"Age"},P("age")," - ",++C),r.createElement(h,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(b,null),r.createElement(D,null),r.createElement(n,{onClick:function(){return B.age=B.age+1}},"+Age"),r.createElement(n,{onClick:function(){return B.firstName=B.firstName+"."}},"Change FirstName"),r.createElement(n,{onClick:function(){return B.lastName=B.lastName+"*"}},"Change LastName"))}});case 19:case"end":return A.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":x,react:K||(K=e.t(F,2)),"x-react-components":M},renderOpts:{compile:function(){var E=N()(U()().mark(function p(){var a,r=arguments;return U()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(9039).then(e.bind(e,39039));case 2:return v.abrupt("return",(a=v.sent).default.apply(a,r));case 3:case"end":return v.stop()}},p)}));function m(){return E.apply(this,arguments)}return m}()}}}},33788:function(te,_,e){e.r(_),e.d(_,{demos:function(){return x}});var K=e(28633),d=e.n(K),U=e(29008),L=e.n(U),S=e(70958),g=e.n(S),N=e(92379),F=e(61786),s=e(24668),M=e(55267),x={"docs-guide-store-state-demo-0":{component:N.memo(N.lazy(g()(L()().mark(function y(){var E,m,p,a,r,u,v,n,h,f;return L()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=P.sent,m=E.createStore,p=E.computed,P.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return a=P.sent,r=a.Button,u=a.ColorBlock,v=m({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(D){return D.firstName+D.lastName},salary:p(function(){var b=g()(L()().mark(function D(C){return L()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.abrupt("return",C.age*10);case 1:case"end":return A.stop()}},D)}));return function(D){return b.apply(this,arguments)}}(),["age"])}),n=v.state,h=v.useState,f=v.$,globalThis.state=n,P.abrupt("return",{default:function(){var D=h("age"),C=d()(D,2),j=C[0],A=C[1],R=h("salary"),W=d()(R,2),T=W[0],Y=W[1],V=h(function(X){return X.lastName},function(X,ae){return ae.lastName=X}),J=d()(V,2),Q=J[0],q=J[1];return N.createElement("div",null,N.createElement(u,null,"Fullname :",n.firstName," ",Q),N.createElement(u,null,"Age :",j),N.createElement(u,null,"Salary: ",f("salary")),N.createElement(r,{onClick:function(){return A(j+1)}},"+Age"),N.createElement(r,{onClick:function(){return q(Q+".")}},"Change lastName"))}});case 13:case"end":return P.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(L()().mark(function m(){var p,a=arguments;return L()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}},"docs-guide-store-state-demo-1":{component:N.memo(N.lazy(g()(L()().mark(function y(){var E,m,p,a,r,u,v,n,h,f;return L()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=P.sent,m=E.createStore,P.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return p=P.sent,a=p.ColorBlock,P.next=10,Promise.resolve().then(e.bind(e,55267));case 10:return r=P.sent,u=r.Button,v=m({firstName:"Zhang",lastName:"Fisher",fullName:function(D){return D.firstName+D.lastName}}),n=v.useState,h=v.state,f=v.$,P.abrupt("return",{default:function(){var D=n(function(V){return V.firstName},function(V,J){return J.firstName=V}),C=d()(D,2),j=C[0],A=C[1],R=n(function(V){return V.fullName},function(V,J){var Q=d()(V,2),q=Q[0],X=Q[1];J.firstName=q,J.lastName=X}),W=d()(R,2),T=W[0],Y=W[1];return N.createElement("div",null,N.createElement(a,{name:"FullName",value:T}),N.createElement(u,{onClick:function(){return A("<".concat(j,">"))}},"Change FirstName"),N.createElement(u,{onClick:function(){return Y(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return P.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(L()().mark(function m(){var p,a=arguments;return L()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}},"docs-guide-store-state-demo-2":{component:N.memo(N.lazy(g()(L()().mark(function y(){var E,m,p,a,r,u,v,n;return L()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=f.sent,m=E.createStore,f.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return p=f.sent,a=p.Button,r=p.ColorBlock,u=m({age:18}),v=u.state,n=u.$,f.abrupt("return",{default:function(){return N.createElement("div",null,N.createElement(r,null,"Age+Signal :",n("age")),N.createElement(r,null,"Age :",v.age),N.createElement(a,{onClick:function(){return v.age=v.age+1}},"+Age"))}});case 11:case"end":return f.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(L()().mark(function m(){var p,a=arguments;return L()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}}}},85244:function(te,_,e){e.r(_),e.d(_,{demos:function(){return s}});var K=e(29008),d=e.n(K),U=e(70958),L=e.n(U),S=e(92379),g=e(34450),N=e(24668),F=e(55267),s={"docs-guide-store-demo-0":{component:S.memo(S.lazy(L()(d()().mark(function M(){var x,y,E,m,p,a,r,u,v;return d()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return x=h.sent,y=x.useStore,h.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return E=h.sent,m=E.Button,p=E.ColorBlock,h.abrupt("return",{default:function(){var B=y({count:18}),P=B.state,b=B.$;return S.createElement("div",null,S.createElement(p,{name:"Count"},b("count")),S.createElement(m,{onClick:function(){return P.count++}},"Count++"))}});case 11:case"end":return h.stop()}},M)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":N,"x-react-components":F},renderOpts:{compile:function(){var M=L()(d()().mark(function y(){var E,m=arguments;return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(E=a.sent).default.apply(E,m));case 3:case"end":return a.stop()}},y)}));function x(){return M.apply(this,arguments)}return x}()}}}},26992:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(22273),U={}},33463:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(66663),U={}},45988:function(te,_,e){e.r(_),e.d(_,{demos:function(){return p}});var K=e(29008),d=e.n(K),U=e(12027),L=e.n(U),S=e(34180),g=e.n(S),N=e(24325),F=e.n(N),s=e(70958),M=e.n(s),x=e(92379),y=e(26826),E=e(24668),m=e(55267),p={"docs-guide-watch-objects-demo-0":{component:x.memo(x.lazy(M()(d()().mark(function a(){var r,u,v,n,h,f,B,P,b,D,C,j,A,R;return d()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return r=T.sent,u=r.createStore,v=r.watch,T.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return n=T.sent,h=n.Divider,f=n.ColorBlock,B=n.Button,P=n.Box,b=n.Input,D=u({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(V){return V.firstName+" "+V.lastName},dirty:v(function(Y,V){var J=Y.path,Q=Y.value;return V.cache[J.join(".")]=!0,!0},function(Y){return["firstName","lastName"].includes(Y[Y.length-1])},{initial:!1})}}),C=D.state,j=D.useBindings,A=D.watchObjects,R=D.$,T.abrupt("return",{default:function(){var V=j("user");return x.createElement("div",null,x.createElement(b,F()({label:"FirstName"},V.firstName)),x.createElement(b,F()({label:"lastName"},V.lastName)),x.createElement(h,null),x.createElement(P,null,x.createElement(f,{name:"FullName"},R("user.fullName")),x.createElement(f,{name:"Dirty"},R("user.dirty")),x.createElement(B,{onClick:function(){C.user.firstName="Zhang",C.user.lastName="Fisher",A.get("user.dirty").reset()}},"Reset")),x.createElement(P,null,x.createElement("div",null,"typeof(store.watchObjects)==",g()(A)),x.createElement("div",null,"store.watchObjects.size=",A.size),x.createElement("div",null,"store.watchObjects.size=",A.size),x.createElement("div",null,"store.watchObjects.keys()=",L()(A.keys()).join(" , "))))}});case 15:case"end":return T.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7F16\u8F91firstName\u6216lastName,\u4F1A\u89E6\u53D1dirty\u7684\u53D8\u5316",title:"\u4F7F\u7528watch\u529F\u80FD\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF"},context:{"@autostorejs/react":E,"x-react-components":m},renderOpts:{compile:function(){var a=M()(d()().mark(function u(){var v,n=arguments;return d()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,n));case 3:case"end":return f.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}}}},54915:function(te,_,e){e.r(_),e.d(_,{demos:function(){return x}});var K=e(29008),d=e.n(K),U=e(28633),L=e.n(U),S=e(70958),g=e.n(S),N=e(92379),F=e(37686),s=e(24668),M=e(55267),x={"docs-guide-watch-state-demo-0":{component:N.memo(N.lazy(g()(d()().mark(function y(){var E,m,p,a,r,u,v,n,h;return d()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return E=B.sent,m=E.createStore,p=E.watch,B.next=7,Promise.resolve().then(e.bind(e,55267));case 7:return a=B.sent,r=a.Input,u=a.Button,v=m({orders:[{name:"AutoStore\u5B9E\u6218\u6307\u5357",price:100,count:1,total:function(b){return b.price*b.count}},{name:"\u6DF1\u5165\u6D45\u51FAAutoStore",price:98,count:1,total:function(b){return b.price*b.count}}],total:p(function(P){return n.orders.reduce(function(b,D){return b+D.count*D.price},0)},function(P){return P[P.length-1]==="count"},{initial:198})}),n=v.state,h=v.useState,B.abrupt("return",{default:function(){var b=h(),D=L()(b,1),C=D[0];return N.createElement("table",{className:"table"},N.createElement("thead",null,N.createElement("tr",null,N.createElement("th",null,"Name"),N.createElement("th",null,"Price"),N.createElement("th",null,"Count"),N.createElement("th",null,"Total"))),N.createElement("tbody",null,C.orders.map(function(j,A){return N.createElement("tr",{key:A},N.createElement("td",null,j.name),N.createElement("td",null,j.price),N.createElement("td",null,N.createElement(u,{onClick:function(){return j.count--}},"-"),N.createElement(r,{value:j.count,style:{display:"inline-flex"}}),N.createElement(u,{onClick:function(){return j.count++}},"+")),N.createElement("td",null,j.total))}),N.createElement("tr",null,N.createElement("td",{colSpan:3},"Total"),N.createElement("td",null,n.total))))}});case 12:case"end":return B.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":M},renderOpts:{compile:function(){var y=g()(d()().mark(function m(){var p,a=arguments;return d()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(9039).then(e.bind(e,39039));case 2:return u.abrupt("return",(p=u.sent).default.apply(p,a));case 3:case"end":return u.stop()}},m)}));function E(){return y.apply(this,arguments)}return E}()}}}},14097:function(te,_,e){var K;e.r(_),e.d(_,{demos:function(){return m}});var d=e(24325),U=e.n(d),L=e(29008),S=e.n(L),g=e(28633),N=e.n(g),F=e(70958),s=e.n(F),M=e(92379),x=e(73549),y=e(24668),E=e(55267),m={"docs-guide-watch-store-demo-0":{component:M.memo(M.lazy(s()(S()().mark(function p(){var a,r,u,v,n,h,f,B,P,b,D,C,j,A,R,W,T;return S()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return a=V.sent,r=a.createStore,u=a.computed,v=a.useStore,V.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return n=V.sent,h=n.Box,f=n.Button,B=n.ColorBlock,P=n.Layout,b=n.CheckBox,V.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return D=V.sent,C=D.useEffect,j=D.useRef,A=r({order:{price:10,count:2,total:u(function(J){return J.price*J.count})}}),R=A.state,W=A.watch,T=A.$,V.abrupt("return",{default:function(){var Q=j(),q=v({operates:"*"}),X=q.useState("operates"),ae=N()(X,2),xe=ae[0],de=ae[1];return C(function(){var he=W(function(ge){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(ge.type," ").concat(ge.path.join("."),"</p>"))},{operates:xe});return function(){return he.off()}},[xe]),M.createElement(P,{style:{maxHeight:"400px"}},M.createElement("div",null,M.createElement(B,{name:"Price"},T("order.price")),M.createElement(B,{name:"Count"},M.createElement(f,{onClick:function(){R.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),T("order.count"),M.createElement(f,{onClick:function(){R.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),M.createElement(B,{name:"Total"},T("order.total")),M.createElement(h,null,M.createElement(b,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:xe==="*",onChange:function(ge){de(ge.target.checked?"*":"read")}}),M.createElement(b,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:xe==="write",onChange:function(ge){de(ge.target.checked?"write":"*")}}),M.createElement(b,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:xe==="read",onChange:function(ge){de(ge.target.checked?"read":"*")}})),M.createElement(f,{onClick:function(){Q.current.innerHTML=""}},"Clear")),M.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return V.stop()}},p)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":E,react:K||(K=e.t(M,2))},renderOpts:{compile:function(){var p=s()(S()().mark(function r(){var u,v=arguments;return S()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,e.e(9039).then(e.bind(e,39039));case 2:return h.abrupt("return",(u=h.sent).default.apply(u,v));case 3:case"end":return h.stop()}},r)}));function a(){return p.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-1":{component:M.memo(M.lazy(s()(S()().mark(function p(){var a,r,u,v,n,h,f,B,P,b,D,C,j,A,R,W,T;return S()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return a=V.sent,r=a.createStore,u=a.computed,v=a.useStore,V.next=8,Promise.resolve().then(e.bind(e,55267));case 8:return n=V.sent,h=n.Box,f=n.Button,B=n.ColorBlock,P=n.Layout,b=n.CheckBox,V.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return D=V.sent,C=D.useEffect,j=D.useRef,A=r({order:{price:10,count:2,total:u(function(J){return J.price*J.count})}}),R=A.state,W=A.watch,T=A.$,V.abrupt("return",{default:function(){var Q=j(),q=v({operates:"*"}),X=q.useState("operates"),ae=N()(X,2),xe=ae[0],de=ae[1];return C(function(){var he=W("order.total",function(ge){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(ge.type," ").concat(ge.path.join("."),"</p>"))},{operates:xe});return function(){return he.off()}},[xe]),M.createElement(P,{style:{maxHeight:"400px"}},M.createElement("div",null,M.createElement(B,{name:"Price"},T("order.price")),M.createElement(B,{name:"Count"},M.createElement(f,{onClick:function(){R.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),T("order.count"),M.createElement(f,{onClick:function(){R.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),M.createElement(B,{name:"Total"},T("order.total")),M.createElement(h,null,M.createElement(b,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:xe==="*",onChange:function(ge){de(ge.target.checked?"*":"read")}}),M.createElement(b,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:xe==="write",onChange:function(ge){de(ge.target.checked?"write":"*")}}),M.createElement(b,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:xe==="read",onChange:function(ge){de(ge.target.checked?"read":"*")}})),M.createElement(f,{onClick:function(){Q.current.innerHTML=""}},"Clear")),M.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return V.stop()}},p)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":y,"x-react-components":E,react:K||(K=e.t(M,2))},renderOpts:{compile:function(){var p=s()(S()().mark(function r(){var u,v=arguments;return S()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,e.e(9039).then(e.bind(e,39039));case 2:return h.abrupt("return",(u=h.sent).default.apply(u,v));case 3:case"end":return h.stop()}},r)}));function a(){return p.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-2":{component:M.memo(M.lazy(s()(S()().mark(function p(){var a,r,u,v,n,h,f,B,P,b,D,C,j,A,R;return S()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,Promise.resolve().then(e.bind(e,24668));case 2:return a=T.sent,r=a.createStore,T.next=6,Promise.resolve().then(e.bind(e,55267));case 6:return u=T.sent,v=u.Button,n=u.Layout,h=u.Input,T.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return f=T.sent,B=f.useEffect,P=f.useRef,b=r({order:{price:10,count:2,books:["AutoStore\u5B9E\u6218\u6307\u5357","\u6DF1\u5165\u6D45\u51FAAutoStore","AutoStore\u6700\u4F73\u5B9E\u8DF5"]}}),D=b.state,C=b.watch,j=b.$,A=b.useState,R=b.useBindings,T.abrupt("return",{default:function(){var V=P(),J=P();B(function(){var q=C("order.books",function(X){V.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          `.concat(X.type," ").concat(X.path.join("."),"[").concat(X.indexs[0],`]
        </p>`))},{operates:["insert","remove","update"]});return function(){return q.off()}},[]);var Q=R("order.books");return M.createElement(n,{style:{maxHeight:"400px"}},M.createElement("div",null,D.order.books.map(function(q,X){return M.createElement(h,U()({key:X},Q[X]))}),M.createElement(h,{ref:J,actions:["+"],placeholder:"\u8BF7\u8F93\u5165\u4E66\u540D",onAction:function(X,ae){String(ae).length>0&&(D.order.books.push(ae),J.current.value="")}}),M.createElement(v,{onClick:function(){V.current.innerHTML=""}},"Clear")),M.createElement("div",{ref:V,style:{overflowY:"auto"}}))}});case 17:case"end":return T.stop()}},p)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":y,"x-react-components":E,react:K||(K=e.t(M,2))},renderOpts:{compile:function(){var p=s()(S()().mark(function r(){var u,v=arguments;return S()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,e.e(9039).then(e.bind(e,39039));case 2:return h.abrupt("return",(u=h.sent).default.apply(u,v));case 3:case"end":return h.stop()}},r)}));function a(){return p.apply(this,arguments)}return a}()}}}},45618:function(te,_,e){e.r(_),e.d(_,{demos:function(){return U}});var K=e(92379),d=e(43112),U={}},20927:function(te,_,e){e.r(_),e.d(_,{Author:function(){return m},Counter:function(){return M},getProjects:function(){return v},useOneEffect:function(){return h}});var K=e(28633),d=e.n(K),U=e(92379),L=e(24668),S=e(55267),g=e(651),N=(0,L.createStore)({root:{count:1}}),F=N.state,s=N.$,M=function(){var B=(0,U.useState)(1),P=d()(B,2),b=P[0],D=P[1];return(0,g.jsxs)(S.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[b,(0,g.jsxs)(S.ColorBlock,{children:["Count:",b]}),(0,g.jsxs)(S.ColorBlock,{children:["Count:",s("root.count")]}),(0,g.jsx)(S.Button,{onClick:function(){return D(b+1)},children:"State +1"}),(0,g.jsx)(S.Button,{onClick:function(){return F.root.count++},children:"Signal +1"})]})},x=(0,L.createStore)({firstName:"Zhang",lastName:"Fisher"}),y=x.state,E=x.$,m=function(){var B=(0,U.useState)(1),P=d()(B,2),b=P[0],D=P[1];return(0,g.jsxs)(S.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[b,(0,g.jsxs)(S.ColorBlock,{children:["Count:",b]}),(0,g.jsx)(S.ColorBlock,{children:E(function(C){return C.firstName+" "+C.lastName})}),(0,g.jsx)(S.Button,{onClick:function(){return D(b+1)},children:"State +1"}),(0,g.jsx)(S.Button,{onClick:function(){return y.lastName=y.lastName+"."},children:"Update lastName"})]})},p=e(29008),a=e.n(p),r=e(70958),u=e.n(r);function v(f){return n.apply(this,arguments)}function n(){return n=u()(a()().mark(function f(B){var P,b,D;return a()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,fetch(B);case 2:if(P=j.sent,!P.ok){j.next=11;break}return j.next=6,P.json();case 6:return b=j.sent,D=b.map(function(A){return{name:A.name,url:A.html_url,description:A.description,stars:A.stargazers_count}}),j.abrupt("return",D);case 11:throw new Error("".concat(P.status," - ").concat(P.statusText));case 12:case"end":return j.stop()}},f)})),n.apply(this,arguments)}function h(f){var B=(0,U.useRef)(!1);(0,U.useEffect)(function(){if(!B.current)return B.current=!0,f()})}},55267:function(te,_,e){e.r(_),e.d(_,{Box:function(){return U},Button:function(){return F},Card:function(){return x},CheckBox:function(){return Q},ColorBlock:function(){return n},Divider:function(){return a},ErrorBoundary:function(){return $e},Field:function(){return p},Input:function(){return C},JsonView:function(){return V},Layout:function(){return f},Loading:function(){return S},RichLabel:function(){return R},Select:function(){return X},Star:function(){return at},Table:function(){return De},TextArea:function(){return Fe},ValidResult:function(){return m}});var K=e(92379),d=e(651),U=(0,K.forwardRef)(function(fe,z){var oe=fe.title,se=fe.enable,ue=se===void 0?!0:se,ce=fe.visible,pe=ce===void 0?!0:ce;return(0,d.jsxs)("div",{ref:z,style:{display:pe?"flex":"none",position:"relative",flexDirection:"column",padding:"8px",margin:"16px 4px 4px 4px",boxSizing:"border-box",border:"1px solid #bbb"},children:[(0,d.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:ue?"#bbb":"gray"},children:oe||""}),fe.children]})}),L=e(97106),S=function(z){var oe=z.size,se=oe===void 0?20:oe,ue=z.visible,ce=ue===void 0?!0:ue,pe=z.color,_e=z.tips,me=_e===void 0?"loading...":_e;return(0,d.jsxs)("span",{title:me,style:{display:ce?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,d.jsx)(L.Z1,{width:se,height:se,color:pe}),z.title?(0,d.jsx)("span",{style:{marginLeft:"4px"},children:z.title}):null]})},g=e(94039),N=(0,g.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(z){return z.visible!==!1?z.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #eee",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555",fontSize:"0.8em","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"x-button"}),F=function(z){var oe=z.loading,se=z.timeout,ue=se===void 0?0:se,ce=z.progress,pe=ce===void 0?0:ce,_e=z.cancel,me=z.onClick;return(0,d.jsxs)("div",{className:N.className,style:N.getStyle(z),onClick:me,children:[oe?(0,d.jsx)(S,{}):null,(0,d.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:z.children}),ue>0?(0,d.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:ue}):"",pe>0?(0,d.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[pe,"%"]}):"",z.error?(0,d.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:z.error}):"",z.loading&&typeof _e=="function"?(0,d.jsx)("button",{onClick:_e,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},s=(0,g.zo)({border:"1px solid #e1e1e1",background:function(z){return z.enable!==!1?"white":"gray"},margin:"8px",display:function(z){return z.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"x-card"}),M=(0,g.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555"},{className:"x-card-header"}),x=function(z){var oe=z.title,se=z.enable,ue=se===void 0?!0:se,ce=z.actions,pe=ce===void 0?[]:ce,_e=Array.isArray(z.children)?z.children:[z.children];return(0,d.jsxs)("div",{className:s.className,style:s.getStyle(z),children:[(0,d.jsxs)("div",{className:M.className,style:M.getStyle(z),children:[(0,d.jsx)("span",{style:{flexGrow:1,color:ue?"#222":"gray"},children:oe}),(0,d.jsx)("span",{style:{},children:pe.map(function(me,ye){return(0,d.jsx)(F,{onClick:me.onClick,children:me.title})})})]}),(0,d.jsx)("div",{style:{padding:"12px"},children:_e.map(function(me,ye){return _e.length>1&&ye===_e.length-1&&me.classList&&me.classList.contains("footer")?(0,d.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:me},ye):me})})]})},y=e(24325),E=e.n(y),m=function(z){var oe=z.validate,se=z.help;if(oe!==void 0){var ue=typeof oe!="boolean",ce=ue?oe==null?void 0:oe.result:oe,pe=ue?oe==null?void 0:oe.loading:!1,_e=ue?oe==null?void 0:oe.error:se;return(0,d.jsxs)("span",{style:{color:"red",display:pe||!ce?"flex":"none"},children:[(0,d.jsx)(S,{visible:pe,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!pe&&(ce?"":_e)]})}},p=function(z){var oe=z.enable,se=oe===void 0?!0:oe,ue=z.visible,ce=ue===void 0?!0:ue,pe=z.label,_e=pe===void 0?"":pe,me=z.children,ye=me===void 0?"":me,Se=z.memo;return(0,d.jsxs)("div",{className:"field",style:{position:"relative",display:ce===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,d.jsxs)("label",{className:"field-label",style:{minWidth:"160px",fontWeight:"bold",color:se===!1?"gray":"inherit"},children:[_e,":"]}),(0,d.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:se===!1?"gray":"inherit"},children:[typeof ye=="function"?"":ye,Se&&(0,d.jsx)("span",{style:{color:"gray"},children:Se})]}),(0,d.jsx)(m,E()({},z))]})},a=function(z){var oe=z.title,se=z.visible,ue=se===void 0?!0:se;return(0,d.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:ue?"flex":"none"},children:(0,d.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:oe})})},r=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],u=0;function v(){return u++,u>=r.length-1&&(u=0),r[u]}var n=function(z){var oe=(0,K.useRef)(0),se=z.name,ue=z.value,ce=ue===void 0?"":ue,pe=z.loading,_e=pe===void 0?!1:pe,me=z.comment,ye=z.inline,Se=v(),Me="white";return(0,K.useEffect)(function(){oe.current++}),(0,d.jsxs)("div",{style:E()(E()({backgroundColor:Se,padding:"6px",color:Me,display:ye?"inline-flex ":"flex"},z.style),{},{alignItems:"center"}),children:[(0,d.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[se?(0,d.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:se}):null,se?(0,d.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,d.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(ce),z.children]})]}),me?(0,d.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:me}):null,_e?(0,d.jsx)(S,{color:"white"}):null,(0,d.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:oe.current})]})},h=(0,g.zo)({display:function(z){return z.visible===!1?"none":"flex"},position:"relative",flexDirection:function(z){return z.direction||"row"},padding:"4px",margin:"4px",boxSizing:"border-box",alignItems:"stretch","&>*":{flex:1,boxSizing:"border-box",position:"relative",borderLeft:"1px solid #eee",borderTop:"1px solid #eee",borderBottom:"1px solid #eee",padding:"8px"},"&>:last-child":{borderRight:"1px solid #eee"}},{className:"x-layout"}),f=function(z){return(0,d.jsx)("div",{className:h.className,style:h.getStyle(z,z.style),children:z.children})},B=e(19317),P=e.n(B),b=["id","enable","style","value","actions"],D=(0,g.zo)({border:function(z){return z.validate===!1?"1px solid red":"1px solid #bbb"},borderRadius:"4px",background:function(z){return z.enable===!1?"gray":"white"},display:function(z){return z.visible===!1?"none":"flex"},margin:"4px",padding:"8px",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}},{className:"x-input"}),C=function(z){var oe=z.id,se=oe===void 0?Math.random().toString(36).slice(2):oe,ue=z.enable,ce=ue===void 0?!0:ue,pe=z.style,_e=pe===void 0?{}:pe,me=z.value,ye=z.actions,Se=P()(z,b),Me=z.label||z.name||z.id,Le=(0,K.useRef)(null),je={color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"};return(0,d.jsxs)("div",{style:E()({display:"flex",alignItems:"center"},_e),children:[Me?(0,d.jsx)("label",{htmlFor:se,style:je,children:Me}):null,(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("input",E()(E()({ref:Le,id:se,value:me,readOnly:!ce},Se),{},{className:D.className,style:D.getStyle(z)})),ye==null?void 0:ye.map(function(Ve){return(0,d.jsx)("button",{onClick:function(nt){var Je;(Je=z.onAction)===null||Je===void 0||Je.call(z,Ve,Le.current.value,nt)},children:Ve},Ve)})]}),(0,d.jsx)("span",{className:"error"})]})]})},j=e(28633),A=e.n(j),R=function(z){var oe=z.text,se=z.color,ue=se===void 0?"#ff6c00":se,ce=z.rules,pe=typeof ue=="string"?{default:ue}:Object.assign({default:""},ue),_e=oe;return ce?Object.entries(ce).forEach(function(me){var ye=A()(me,2),Se=ye[0],Me=ye[1];_e=_e.replace(Me,function(Le){var je=Se.includes(":")?Se:"color:".concat(Se,";");return"<span style='".concat(je,"'>").concat(Le,"</span>")})}):_e=oe.replace(/\{\s?(.*?)\s?\}/gm,function(me,ye){return"<span style='color: ".concat(ye in pe?pe[ye]:pe.default,"'>").concat(ye,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,d.jsx)("div",{style:E()({boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},z.style),children:(0,d.jsx)("span",{dangerouslySetInnerHTML:{__html:_e}})})},W=e(48092),T=e.n(W),Y=(0,g.zo)({"&>.json-pretty":{"& .json-key":{color:"#5a5a5ac6",padding:"2px"},"& .json-string":{color:"#009817",padding:"2px"},"& .json-number":{color:"#2a00c0",padding:"2px"},"& .json-boolean":{color:"red"}}},{className:"x-json-view"}),V=function(z){var oe=z.data;return(0,d.jsx)("div",{className:Y.className,dangerouslySetInnerHTML:{__html:T()(oe)}})},J=(0,g.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-checkbox"}),Q=function(z){var oe=z.id,se=oe===void 0?Math.random().toString(36).slice(2):oe,ue=z.labelPos,ce=ue===void 0?"right":ue,pe=z.label||z.name||z.id;return(0,d.jsxs)("div",{className:J.className,style:J.getStyle(z),children:[ce==="left"?(0,d.jsx)("label",{htmlFor:se,children:pe}):null,(0,d.jsx)("input",E()(E()({},z),{},{id:se,type:"checkbox"})),ce==="right"?(0,d.jsx)("label",{htmlFor:se,children:pe}):null]})},q=(0,g.zo)({display:"flex",alignItems:"center",cursor:"pointer","&>label":{userSelect:"none",fontSize:"14px",cursor:"pointer",width:"100px",flexShrink:0},"&>select":{margin:"4px",padding:"8px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-select"}),X=function(z){var oe=z.items,se=oe===void 0?[]:oe,ue=z.label||z.name||z.id;return(0,d.jsxs)("div",{className:q.className,style:q.getStyle(z),children:[(0,d.jsx)("label",{children:ue}),(0,d.jsx)("select",E()(E()({},z),{},{value:z.value,children:se.map(function(ce){return(0,d.jsx)("option",{value:ce.value,children:ce.title},ce.value)})}))]})},ae=e(93949),xe=e.n(ae),de=e(6270),he=e.n(de),ge=e(77701),Ae=e.n(ge),Re=e(28249),Ke=e.n(Re),$e=function(fe){Ae()(oe,fe);var z=Ke()(oe);function oe(se){var ue;return xe()(this,oe),ue=z.call(this,se),ue.state={error:void 0},ue}return he()(oe,[{key:"render",value:function(){return this.state.error?(0,d.jsx)(U,{children:this.state.error}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(ue){return{error:ue.stack}}}]),oe}(K.Component),we=(0,g.zo)({width:"100%",marginBottom:"1rem",color:"#212529",backgroundColor:"white",borderCollapse:"collapse",border:"1px solid #dee2e6","& th":{backgroundColor:"#f7f7f7"},"& th,td":{padding:".5rem",verticalAlign:"top",border:"1px solid #dee2e6"},"& td":{padding:".5rem",border:"1px solid #dee2e6",verticalAlign:"middle"},"& tfoot":{backgroundColor:"#f7f7f7",padding:".75rem"}},{className:"x-table"}),De=function(z){var oe,se=z.cols.map(function(ue){var ce=typeof ue=="string"?{name:ue,align:"center"}:ue;return ce.name.startsWith("<")&&(ce.align="left",ce.name=ce.name.substring(1)),ce.name.startsWith(">")&&(ce.align="right",ce.name=ce.name.substring(1)),ce});return(0,d.jsxs)("table",{className:we.className,style:we.getStyle(z),children:[(0,d.jsxs)("thead",{children:[z.title?(0,d.jsx)("tr",{children:(0,d.jsx)("th",{colSpan:se.length,children:z.title})}):null,(0,d.jsx)("tr",{children:se==null?void 0:se.map(function(ue,ce){return(0,d.jsx)("th",{style:{width:ue.width?ue.width:void 0,textAlign:ue.align?ue.align:void 0},children:ue.name},ce)})})]}),(0,d.jsx)("tbody",{children:(oe=z.rows)===null||oe===void 0?void 0:oe.map(function(ue,ce){return(0,d.jsx)("tr",{children:ue.map(function(pe,_e){var me=1;if(pe!=null){for(var ye=_e+1;ye<ue.length&&ue[ye]==null;ye++)me++;return(0,d.jsx)("td",{colSpan:me>1?me:void 0,style:{textAlign:se[_e].align},children:typeof pe=="function"?pe():String(pe)},_e)}})},ce)})}),z.children?(0,d.jsx)("tfoot",{children:(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:se.length,children:z.children})})}):null]})},ke=(0,g.zo)({padding:"0px",display:"flex","&>label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&>textarea":{margin:"4px",padding:"8px",minHeight:"80px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-textArea"}),Fe=function(z){var oe=z.id,se=oe===void 0?Math.random().toString(36).slice(2):oe,ue=z.label||z.name||z.id;return(0,d.jsxs)("div",{className:ke.className,style:ke.getStyle(z),children:[(0,d.jsx)("label",{htmlFor:se,children:ue}),(0,d.jsx)("textarea",E()(E()({},z),{},{id:se}))]})},at=function(z){var oe=z.max,se=oe===void 0?5:oe,ue=z.value,ce=ue===void 0?1:ue,pe=Array.from({length:se}),_e=(0,K.useRef)(null),me=(0,K.useState)(ce),ye=A()(me,2),Se=ye[0],Me=ye[1];return(0,d.jsx)("div",{ref:_e,style:{display:"flex",flexDirection:"row",fontSize:"1.2em"},children:pe.map(function(Le,je){return(0,d.jsxs)("span",{style:{cursor:"pointer",padding:"4px",color:je<Se?"#ffe70c":"#ccc"},onClick:function(){Me(je===Se-1?je:je+1);var Ze=new InputEvent("input",{bubbles:!0,cancelable:!0,data:String(Se)});_e.current.dispatchEvent(Ze)},children:[(0,d.jsx)("svg",{viewBox:"64 64 896 896",focusable:"false","data-icon":"star",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:(0,d.jsx)("path",{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"})}),"   "]},je)})})}},24668:function(te,_,e){e.r(_),e.d(_,{ASYNC_COMPUTED_VALUE:function(){return de},AbortError:function(){return R},AsyncComputedObject:function(){return yt},AutoStore:function(){return St},AutoStoreError:function(){return A},BATCH_UPDATE_EVENT:function(){return xe},ComputedObject:function(){return lt},ComputedObjects:function(){return ht},CyleDependError:function(){return T},EventEmitter:function(){return st},FAKE_BINDINGS:function(){return it},InvalidComputedArgumentsError:function(){return Y},InvalidDependsError:function(){return J},InvalidScopeError:function(){return V},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return q},OBSERVER_DESCRIPTOR_FLAG:function(){return X},ObserverObject:function(){return ut},ObserverScopeRef:function(){return Ge},PATH_DELIMITER:function(){return ae},ReactAutoStore:function(){return Ye},SKIP_PROXY_FLAG:function(){return Q},SyncComputedObject:function(){return gt},TimeoutError:function(){return W},WatchObject:function(){return Ct},WatchObjects:function(){return bt},calcDependPaths:function(){return Le},computed:function(){return Re},createBindingsState:function(){return At},createFakeObjectBindings:function(){return pt},createInputBinding:function(){return It},createStore:function(){return oa},createUseBindings:function(){return Dt},createUseField:function(){return Pt},defineExtend:function(){return Ft},delay:function(){return Je},forEachObject:function(){return Ze},getComputedId:function(){return je},getDepends:function(){return ft},getId:function(){return Se},getMapVal:function(){return ce},getSnap:function(){return nt},getSnapshot:function(){return qe},getVal:function(){return pe},isAbsolutePath:function(){return Ke},isAsyncComputedValue:function(){return z},isEq:function(){return De},isEventMatched:function(){return Bt},isFunction:function(){return xt},isMap:function(){return ke},isObserverDescriptor:function(){return $e},isObserverDescriptorBuilder:function(){return se},isPathEq:function(){return Fe},isPathMatched:function(){return at},isPlainObject:function(){return fe},isPrimitive:function(){return et},isPromise:function(){return oe},isProxy:function(){return ue},isRaw:function(){return we},joinValuePath:function(){return ye},markRaw:function(){return _e},noRepeat:function(){return rt},normalizeDeps:function(){return ge},pathIsExists:function(){return Tt},pathStartsWith:function(){return ot},setVal:function(){return me},updateObjectVal:function(){return Ve},useForm:function(){return Oa},useStore:function(){return Ba},watch:function(){return Et}});var K=e(6270),d=e.n(K),U=e(93949),L=e.n(U),S=e(28810),g=e.n(S),N=e(77701),F=e.n(N),s=e(28249),M=e.n(s),x=e(29861),y=e.n(x),E=e(29008),m=e.n(E),p=e(70958),a=e.n(p),r=e(12027),u=e.n(r),v=e(34180),n=e.n(v),h=e(14582),f=e.n(h),B=e(48510),P=e.n(B),b=e(30790),D=e.n(b),C=e(5672),j=e.n(C),A=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o)}(j()(Error)),R=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o)}(A),W=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o)}(A),T=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o)}(A),Y=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o)}(A),V=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o)}(A),J=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o)}(A),Q=Symbol("skip-proxy"),q=Symbol("observer-descriptor-builder"),X=Symbol("observer-descriptor"),ae=".",xe="__batch_update__",de=Symbol("AsyncComputedValue");function he(l){return l.constructor.name==="AsyncFunction"}function ge(l){return l?l.map(function(t){return Array.isArray(t)?t:typeof t=="string"?["/","./","../"].some(function(o){return t.startsWith(o)})?t:t.includes(ae)?t.split(ae):t.split("."):[]}):[]}function Ae(){return{async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0,objectify:!0}}function Re(){var l=arguments[0];if(typeof l!="function")throw new Error("computed getter must be a function");var t=[],o=Object.assign({},Ae());if(arguments.length===1)t=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))o.depends=arguments[1];else if(n()(arguments[1])==="object")Object.assign(o,arguments[1]),o.depends=ge(o.depends);else throw new Y;else arguments.length>=3&&(t=ge(arguments[1]),Object.assign(o,arguments[2]),o.depends=t);o.async=o.async===!0||he(l)||arguments.length>=2&&Array.isArray(arguments[1]);var c=function(){return y()({type:"computed",getter:l,options:o},X,!0)};return c[q]=!0,c}function Ke(l){return l?l.some(function(t){return typeof t=="string"?t.startsWith("./")||t.startsWith("../")||t.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(t):!0}):!1}function $e(l){return n()(l)==="object"&&l.hasOwnProperty("type")&&typeof l.type=="string"&&l.hasOwnProperty("getter")&&typeof l.getter=="function"&&l.hasOwnProperty("options")&&n()(l.options)==="object"}function we(l){try{return l[Q]===!0}catch(t){}return!1}function De(l,t){if(l===t)return!0;if(l===null||t===null||n()(l)!==n()(t))return!1;if(n()(l)==="object"){if(Array.isArray(l)&&Array.isArray(t))return l.length!==t.length?!1:l.every(function(c,i){return De(c,t[i])});if(!Array.isArray(l)&&!Array.isArray(t)){var o=Object.keys(l);return o.length!==Object.keys(t).length?!1:o.every(function(c){return De(l[c],t[c])})}else return!1}return!1}function ke(l){return toString.call(l)==="[object Map]"}function Fe(l,t){return!l||!t||l.length!==t.length?!1:l.every(function(o,c){return o===t[c]})}function at(l,t){var o=Fe(l,t);return o?!0:l.length!==t.length?!1:l.every(function(c,i){return c==="*"?!0:c===t[i]})}function fe(l){return l==null||n()(l)!=="object"?!1:Object.prototype.toString.call(l)==="[object Object]"}function z(l){return l&&n()(l)==="object"&&l.hasOwnProperty(de)}function oe(l){try{return!!l&&(n()(l)==="object"||typeof l=="function")&&typeof l.then=="function"&&typeof l.catch=="function"&&(l instanceof Promise||Object.prototype.toString.call(l)==="[object Promise]")}catch(t){return!1}}function se(l){return typeof l=="function"&&l[q]===!0}function ue(l){return n()(l)==="object"&&l!==null&&!("__isProxy"in l)}function ce(l,t){var o=l.get(t);if(o!==void 0)return o;var c=l.get(Number(t)||t);if(c!==void 0)return c}function pe(l,t,o){if(!t||t.length===0)return l;for(var c,i=l,I=0;I<t.length;I++){var O=t[I];if(ke(i))c=ce(i,O);else if(O in i)c=i[O];else{if(o!==void 0)return o;throw new Error("invalid state path: ".concat(t.join(".")))}i=c}return c}function _e(l){try{l[Q]=!0}catch(t){}return l}function me(l,t,o,c){for(var i=l,I=t.length-1,O=0;O<t.length;O++){var $=t[O],k=ke(i);if(O===I){if(c===!0){var Z=k?ce(i,$):i[$];z(Z)&&(i=Z,$="value")}k?i.set($,o):i[$]=o;return}var G=k?ce(i,$):i[$];i=G}}function ye(l){return(l||["ROOT"]).map(function(t){return Array.isArray(t)?t.join("."):t}).join(ae)}function Se(){return Math.random().toString(36).slice(2)}function Me(l,t,o){var c=l&&!l[0].startsWith("#");if(Array.isArray(t))return t;if(t==="self")return c?l:void 0;if(t==="root")return c?[]:void 0;if(t==="parent")return c?l.slice(0,-2):void 0;if(t==="current")return c?l.slice(0,-1):void 0;if(typeof t=="string")return t.startsWith("./")?c?[].concat(u()(l.slice(0,-1)),u()(t.slice(2).split(ae))):void 0:t.startsWith("../")?c?Me(l.slice(0,-1),t.slice(3),!0):void 0:t.startsWith("/")?t.replace(/^(\/)*/,"").split(ae):c&&o?[].concat(u()(l.slice(0,-1)),u()(t.split(ae))):t.split(ae)}function Le(l,t){return t?t.map(function(o){return Me(l,o)}).filter(function(o){return o!==void 0}):[]}function je(l,t){var o="";return t.id?o=t.id:o=ye(l),o}function Ve(l,t,o){var c=l,i=t.length-1;t.forEach(function(I,O){var $=ke(c);if(O===i){var k=$?c.get(I):c[I];n()(k)==="object"&&Object.assign(k,o);return}$?(c.has(I)||c.set(I,{}),c=c.get(I)):(I in c||(c[I]={}),c=c[I])})}function Ze(l,t){function o(c,i){for(var I in c){var O=c[I];typeof t=="function"&&t({value:O,key:I,parent:c,path:i.concat(I)}),n()(O)==="object"&&o(O,i.concat(I))}}o(l,[])}function nt(l){return l}function Je(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(t){setTimeout(t,l)})}function rt(l){var t=new Map;return l.forEach(function(o){var c=o.join(".");t.set(c,o)}),Array.from(t.values())}function ot(l,t){return l.length>t.length?!1:l.every(function(o,c){return o===t[c]})}function ft(l,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"none",c=[];return typeof l=="function"?c=t.collectDependencies(function(){return l(t.state)}):typeof l=="string"?c=[l.split(ae)]:Array.isArray(l)?c=[u()(l)]:c=[],o!=="none"&&c.forEach(function(i){var I=t.peep(function(O){return pe(O,i)});z(I)&&i.push(o==="all"?"*":"value")}),c}function Tt(l,t){if(!t||t.length===0)return!1;for(var o,c=l,i=0;i<t.length;i++){var I=t[i],O=!1;if(ke(c)){if(O=c.has(I),!O)return!1;o=ce(c,I)}else{if(O=I in c,!O)return!1;o=c[I]}c=o}return!0}var kt=e(24325),Ce=e.n(kt);function qe(l,t){if(Array.isArray(l)){for(var o=u()(l),c=0;c<o.length;c++)o[c]=qe(o[c],t);return o}else if(n()(l)==="object"){if(!t&&z(l))return l.value;var i=Ce()({},l);for(var I in i)i[I]=qe(i[I],t);return i}return l}function et(l){return l==null||typeof l=="string"||typeof l=="number"||typeof l=="boolean"}function Ft(l){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof l=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(l)}function xt(l){return l?typeof l=="function":!1}var ht=function(l){F()(o,l);var t=M()(o);function o(c){var i;return L()(this,o),i=t.call(this),i.store=c,i}return d()(o,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(i){this.store.options.enableComputed=i}},{key:"create",value:function(){var i=$e(arguments[0])?arguments[0]:Re.apply(void 0,arguments)();if(i.options.async&&!Ke(i.options.depends))throw new J("The scope of the dynamic computed object must be the root state object or an absolute path");var I=i.options.scope;if(I===void 0)i.options.scope="ROOT";else if(!Ke([I]))throw new V("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(i)}},{key:"runGroup",value:function(){var c=a()(m()().mark(function I(O,$,k){return m()().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return G.next=2,this.run(function(H){return H.group===O},$,k);case 2:return G.abrupt("return",G.sent);case 3:case"end":return G.stop()}},I,this)}));function i(I,O,$){return c.apply(this,arguments)}return i}()},{key:"run",value:function(){var c=a()(m()().mark(function I(){var O=arguments,$=this,k,Z,G,H,w=arguments;return m()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:if(w.length!==0){ee.next=2;break}return ee.abrupt("return",Promise.all(u()(this.values()).map(function(le){return le.run()})));case 2:return typeof w[0]=="function"?k=w[0]:typeof w[0]=="string"&&(k=function(ie){return ie.id===O[0]}),Z=Object.assign({},w[1]),G=Object.assign({wait:!1,timeout:0},w[2]),H={},ee.abrupt("return",new Promise(function(le,ie){if(G.wait){var re;Z.onDone=function(ve){var be=ve.id;if(H[be]=!0,Object.values(H).every(function(Te){return Te}))return clearTimeout(re),!0},G.timeout>0&&(re=setTimeout(function(){ie(new W)},G.timeout))}Promise.all(u()($.values()).filter(function(ve){return k(ve)?(H[ve.id]=!1,!0):!1}).map(function(ve){return ve.run(Z)})),G.wait||le()}));case 7:case"end":return ee.stop()}},I,this)}));function i(){return c.apply(this,arguments)}return i}()},{key:"enableGroup",value:function(){var c=a()(m()().mark(function I(O){var $,k,Z;return m()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:$=f()(this.values());try{for($.s();!(k=$.n()).done;)Z=k.value,Z.options.enable=O}catch(w){$.e(w)}finally{$.f()}case 2:case"end":return H.stop()}},I,this)}));function i(I){return c.apply(this,arguments)}return i}()},{key:"delete",value:function(i){var I;return(I=this.get(i))===null||I===void 0||I.detach(),P()(D()(o.prototype),"delete",this).call(this,i)}},{key:"find",value:function(i){if(i){var I=Array.isArray(i)?i:i.split(ae),O=f()(this.values()),$;try{for(O.s();!($=O.n()).done;){var k=$.value;if(Fe(k.path,I))return k}}catch(Z){O.e(Z)}finally{O.f()}}}}]),o}(j()(Map)),Wt=e(69075);function Ut(l){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",o=typeof l=="function"?l():l instanceof Error?l.stack:l;try{var c;(c=console)[t].apply(c,["[AutoStore<".concat(this.id,">]")].concat(u()(Array.isArray(o)?o:[o])))}catch(i){}}function He(l,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ae,c=[];try{return typeof t=="function"&&(t=t.call(l,l)),c=Array.isArray(t)?t:typeof t=="string"?t.split(o):[],c.length>0?pe(l,c):l}catch(i){return l}}var Ge=function(l){return l.Root="ROOT",l.Current="CURRENT",l.Parent="PARENT",l.Depends="DEPENDS",l.Self="SELF",l}({});function Kt(l,t,o){var c=t===void 0?o:t;if(typeof c=="function")try{c=c.call(l.store,l)}catch(i){}return c===void 0?o===void 0?Ge.Current:o:c}function tt(l,t,o,c){var i=l.store.state,I=l.store.options;if(typeof I.getRootScope=="function"){var O=I.getRootScope(l,{observerType:t,valuePath:o==null?void 0:o.path});O!==void 0&&(i=O)}var $=o||{},k=$.path,Z=$.parentPath,G=Kt(l,c.scope,I.scope),H=i;try{if(G===Ge.Current)H=He(i,Z);else if(G===Ge.Parent)H=He(i,k.slice(0,k.length-2<0?0:k.length-2));else if(G===Ge.Root)H=i;else if(G===Ge.Depends){var w;H=(w=l.depends)===null||w===void 0?void 0:w.map(function(ne){return He(i,ne)})}else typeof G=="string"?G.startsWith("@")?H=tt(l,t,o,Ce()(Ce()({},c),{},{scope:tt(l,t,Ce()(Ce()({},o),{},{path:G.slice(1).split(ae)}),Ce()(Ce()({},c),{},{scope:G.slice(1)}))})):H=He(i,Me(l.path,G)):Array.isArray(G)&&(H=He(i,G))}catch(ne){I.log("Error while getting computed scope ".concat(l.toString(),": ").concat(ne.message),"error")}return H}var ut=function(){function l(t,o,c){L()(this,l),y()(this,"_path",void 0),y()(this,"_id",""),y()(this,"_initial",void 0),y()(this,"_value",void 0),y()(this,"_associated",!1),y()(this,"_attached",!1),y()(this,"_getter",void 0),y()(this,"_depends",[]),y()(this,"_options",void 0),y()(this,"_subscribers",[]),y()(this,"_strPath",void 0),this.store=t,this.descriptor=o,this.context=c,this._associated=c!==void 0,this._getter=o.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},o.options),this._id=this._options.id||(this._associated?ye(c==null?void 0:c.path):Se()),this._path=(c==null?void 0:c.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=Le(this._path,this._options.depends),this._onObserverCreated(),this._onInitial()}return d()(l,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(o){this._options.enable=o}},{key:"group",get:function(){return this._options.group},set:function(o){this._options.group=o}},{key:"initial",get:function(){return this._initial},set:function(o){this._initial=o}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(o){this._depends=o}},{key:"getter",get:function(){return this._getter},set:function(o){this._getter=o}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(ae)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?pe(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(o){this._associated?me(this.store.state,this._path,o):(this._value=o,this.store._notify({type:"set",path:this.path,value:o}))}},{key:"_onObserverCreated",value:function(){typeof this.store.options.onObserverCreated=="function"&&this.store.options.onObserverCreated(this)}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"onInitOptions",value:function(o){}},{key:"update",value:function(o,c){var i=this;this.store.update(function(){i.value=o},c)}},{key:"silentUpdate",value:function(o){this.update(o,{silent:!0})}},{key:"watch",value:function(o,c){var i=this;return this.store.watch(this.getValueWatchPath(),function(I){o.call(i,I)},c)}},{key:"getValueWatchPath",value:function(){return this.path.join(ae)}},{key:"emitStoreEvent",value:function(o,c){var i=this;setTimeout(function(){i.store.emit(o,c)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(o){}},{key:"attach",value:function(){var o=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(o.toString()," subscribed to ").concat(o.depends.map(function(c){return c.join(ae)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(o){return o.off()}),this._attached=!1)}},{key:"run",value:function(){}}]),l}(),lt=function(l){F()(o,l);var t=M()(o);function o(c,i,I){var O;return L()(this,o),O=t.call(this,c,i,I),O.store=c,O.descriptor=i,O.context=I,i.options.depends=Le(O.path,O.options.depends),O}return d()(o,[{key:"toString",value:function(){return"ComputedObject<".concat(ye(this.path),">")}},{key:"isDisable",value:function(i){return!this.store.options.enableComputed||!this.enable&&i!==!0||i===!1}},{key:"run",value:function(i){throw new Error("Method not implemented.")}}]),o}(ut),gt=function(l){F()(o,l);var t=M()(o);function o(){return L()(this,o),t.apply(this,arguments)}return d()(o,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(i){var I=this,O=Object.assign({first:!1,operate:void 0},i),$=O.first,k=O.operate;if(!$&&this.isDisable(i==null?void 0:i.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!$&&this.store.log(function(){return"Run sync computed for : ".concat(I.toString())});var Z=i?Object.assign({},this.options,i):this.options,G=tt(this,"computed",this.context,Z),H=Z.initial;try{H=this.getter.call(this,G,{operate:k,first:$}),$&&(this.initial=H),this.store.peep(function(){I.value=H}),!$&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:H,computedObject:this})}catch(w){throw!$&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:w,computedObject:this}),w}}},{key:"collectDependencies",value:function(){var i=[],I=this.store.watch(function(O){i.push(O.path)},{operates:["get"]});this.run({first:!0}),I.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&i.push.apply(i,u()(Le(this.path,this.options.depends))),this.depends=rt(i),this.attach()}},{key:"onDependsChange",value:function(i){this.run({operate:i})}}]),o}(lt);function wt(l,t,o,c,i){return o==="push"?function(){for(var I=t.length,O=arguments.length,$=new Array(O),k=0;k<O;k++)$[k]=arguments[k];var Z=c.apply(t,$);if(t.length>I){var G=Array.from({length:t.length-I},function(H,w){return w+I});l({type:"insert",path:i,indexs:G,value:$,oldValue:void 0,parentPath:i,parent:t})}return Z}:o==="pop"?function(){var I=t.length,O=c.apply(t);return t.length===I-1&&l({type:"remove",path:i,indexs:[I-1],value:[O],oldValue:void 0,parentPath:i,parent:t}),O}:o==="splice"?function(I,O){for(var $=arguments.length,k=new Array($>2?$-2:0),Z=2;Z<$;Z++)k[Z-2]=arguments[Z];var G=c.apply(t,[I,O].concat(k));if(G.length>0){var H=Array.from({length:G.length},function(ne,ee){return I+ee});l({type:"remove",path:i,indexs:H,value:G,oldValue:void 0,parentPath:i,parent:t})}if(k.length>0){var w=Array.from({length:k.length},function(ne,ee){return I+ee});l({type:"insert",path:i,indexs:w,value:k,oldValue:void 0,parentPath:i,parent:t})}return G}:o==="unshift"?function(){for(var I=t.length,O=arguments.length,$=new Array(O),k=0;k<O;k++)$[k]=arguments[k];var Z=c.apply(t,$);if(t.length>I){var G=Array.from({length:t.length-I},function(H,w){return w});l({type:"insert",path:i,indexs:G,value:$,oldValue:void 0,parentPath:i,parent:t})}return Z}:o==="shift"?function(){var I=t.length,O=c.apply(t);return t.length===I-1&&l({type:"remove",path:i,indexs:[0],value:[O],oldValue:void 0,parentPath:i,parent:t}),O}:o==="fill"?function(I,O,$){var k=c.apply(t,[I,O,$]),Z=O!=null?O:0,G=$!=null?$:t.length,H=Array.from({length:G-Z},function(ne,ee){return ee+Z}),w=Array.from({length:G-Z},function(){return I});return l({type:"update",path:i,indexs:H,value:w,oldValue:void 0,parentPath:i,parent:t}),k}:o==="concat"?function(){for(var I=t.length,O=arguments.length,$=new Array(O),k=0;k<O;k++)$[k]=arguments[k];var Z=c.apply(t,$),G=Array.from({length:$.length},function(H,w){return I+w});return l({type:"insert",path:i,indexs:G,value:$,oldValue:void 0,parentPath:i,parent:t}),Z}:c}var dt=Symbol("__NOTIFY__");function _t(l,t,o,c,i){if(we(l)||n()(l)!=="object"||l===null)return l;if(o.has(l))return o.get(l);var I=new Proxy(l,{get:function($,k,Z){var G=Reflect.get($,k,Z);if(typeof k!="string")return G;var H=[].concat(u()(t),[String(k)]);if(typeof G=="function"||!Object.hasOwn($,k))if(typeof G=="function"){if(Array.isArray($))return wt(i.notify,$,k,G,t);if(!we(G)&&Object.hasOwn($,k)){var w=H.join(".");try{if(c.has(w)){var ne=[].concat(u()(c.keys()),[w]);throw c.clear(),new T('Find circular dependency at <"'.concat(H,'">, steps: ').concat(ne.join(" <- ")))}return c.set(w,!0),i.createComputedObject(H,G,t,$)}finally{c.delete(w)}}else return G}else return G;return i.notify({type:"get",path:H,indexs:[],value:G,oldValue:void 0,parentPath:t,parent:$}),_t(G,H,o,c,i)},set:function($,k,Z,G){var H=Reflect.get($,k,G),w=Reflect.set($,k,Z,G);if(k===dt)return!0;if(w&&k!==dt&&Z!==H)if(Array.isArray($))i.notify({type:"update",path:t,indexs:[Number(k)],value:Z,oldValue:H,parentPath:t,parent:$});else{var ne=[].concat(u()(t),[String(k)]);i.notify({type:"set",path:ne,indexs:[],value:Z,oldValue:H,parentPath:t,parent:$})}return w},deleteProperty:function($,k){var Z=$[k],G=[].concat(u()(t),[String(k)]),H=Reflect.deleteProperty($,k);return H&&k!==dt&&i.notify({type:"delete",path:G,indexs:[],value:Z,oldValue:void 0,parentPath:t,parent:$}),H}});return o.set(l,I),I}function Vt(l,t){var o=new Map,c=new WeakMap;return _t(l,[],c,o,t)}var Gt=e(28633),Ee=e.n(Gt),zt=e(75396),Zt=e.n(zt),Jt=e(21206);function Ht(l){return l instanceof Error?l:new Error(l)}var yt=function(l){F()(o,l);var t=M()(o);function o(){var c;L()(this,o);for(var i=arguments.length,I=new Array(i),O=0;O<i;O++)I[O]=arguments[O];return c=t.call.apply(t,[this].concat(I)),y()(g()(c),"_isRunning",!1),y()(g()(c),"_defaultAbortController",null),y()(g()(c),"_userAbortController",void 0),y()(g()(c),"_firstRun",!1),c}return d()(o,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return P()(D()(o.prototype),"value",this)},set:function(i){Zt()(D()(o.prototype),"value",i,this,!0)}},{key:"running",get:function(){return this._isRunning}},{key:"onInitOptions",value:function(i){i.reentry||(i.reentry=this.store.options.reentry)}},{key:"onInitial",value:function(){var i=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(i.options.immediate===!0||i.options.immediate==="auto"&&i.options.initial===void 0)&&i.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var i=this;return Object.assign(y()(y()(y()(y()(y()(y()(y()(y()(y()({},de,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",_e(function(I){return i.store.computedObjects.run(i.id,Object.assign({},I))})),"cancel",_e(function(){i.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(i){var I=this,O=this.strPath,$=Object.keys(i).length;if(this.associated)this.store.update(function(Z){Ve(Z,I.path,i)},{batch:$>1?O:!1});else{Object.assign(this.value,i);var k=$>1;Object.entries(i).forEach(function(Z){var G=Ee()(Z,2),H=G[0],w=G[1],ne={type:"set",path:[I.strPath,H],value:w,parent:I.value};k&&(ne.reply=!0),I.store.operates.emit("".concat(I.strPath,".").concat(H),ne)}),k&&this.store.operates.emit(O,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var c=a()(m()().mark(function I(O){var $=this,k,Z,G,H,w;return m()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:if(k=O!=null?O:{},Z=k.first,!this.isDisable(O==null?void 0:O.enable)){ee.next=4;break}return this.store.log(function(){return"Async computed <".concat($.toString(),"> is disabled")},"warn"),ee.abrupt("return");case 4:if(this._firstRun=!0,!Z&&this.store.log(function(){return"Run async computed for : ".concat($.toString())}),G=O?Object.assign({first:Z},this.options,O):this.options,H=tt(this,"computed",this.context,G),w=G.reentry,!(this._isRunning&&!w)){ee.next=13;break}return this.store.log(function(){return"Async computed: ".concat($.toString()," is over maximum reentry count")},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),ee.abrupt("return");case 13:return this._isRunning=!0,ee.prev=14,ee.next=17,this.executeGetter(H,G);case 17:return ee.abrupt("return",ee.sent);case 18:return ee.prev=18,this._isRunning=!1,ee.finish(18);case 21:case"end":return ee.stop()}},I,this,[[14,,18,21]])}));function i(I){return c.apply(this,arguments)}return i}()},{key:"createComputeProgressbar",value:function(i){var I=this,O=Object.assign({},i),$=O.max,k=$===void 0?100:$,Z=O.min,G=Z===void 0?0:Z,H=O.value,w=H===void 0?0:H;return this.updateComputedValue({progress:w}),{value:function(ee){ee>k&&(ee=k),ee<G&&(ee=G),I.updateComputedValue({progress:ee})},end:function(){this.value(k)}}}},{key:"getAbortController",value:function(i){if(i&&typeof i.abortController=="function"){var I=i.abortController();I&&I instanceof AbortController&&(this._userAbortController=I)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(i,I,O){var $=this,k=O.timeout,Z=Array.isArray(k)?k:[k,0],G=Ee()(Z,2),H=G[0],w=H===void 0?0:H,ne=G[1],ee=ne===void 0?0:ne,le,ie;return w>0&&(I.timeout=ee>1?ee:w,ie=setTimeout(function(){i.hasTimeout=!0,i.hasError=!0,i.error="TIMEOUT",typeof i.timeoutCallback=="function"&&i.timeoutCallback(),clearInterval(le),$.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},w),ee>1&&(le=setInterval(function(){$.updateComputedValue({timeout:ee--}),ee===0&&clearInterval(le)},w/(ee+1)))),{clear:function(){clearTimeout(ie),clearInterval(le)},enable:w>0}}},{key:"executeGetter",value:function(){var c=a()(m()().mark(function I(O,$){var k,Z,G,H,w,ne,ee,le,ie,re,ve,be,Te,Ne,Pe,Ue;return m()().wrap(function(Oe){for(;;)switch(Oe.prev=Oe.next){case 0:k=$.retry,Z=k===void 0?[0,0]:k,G=Array.isArray(Z)?Z:[Number(Z),0],H=Ee()(G,2),w=H[0],ne=H[1],le=this.getAbortController($),ie={onTimeout:function(Qe){return ee=Qe},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Qe){return Qe},cancel:le.abort,extras:$.extras,operate:$.operate,first:$.first,abortSignal:le.signal},re={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:ee},le.signal.addEventListener("abort",function(){return re.hasAbort=!0}),ve={clear:function(){},enable:!1},Te=function(Qe){return Object.assign(re,Qe)},Ne=0;case 9:if(!(Ne<w+1)){Oe.next=46;break}if(Pe={},Oe.prev=11,Ue={loading:!0},re.hasError&&(Ue.error=null),w>0&&(Ue.retry=Ne>0?w-Ne+1:0),Ne>0&&Te({error:null,hasError:!1,hasTimeout:!1}),ve=this.setTimeoutControl(re,Ue,$),this.updateComputedValue(Ue),!re.hasAbort){Oe.next=20;break}throw new R;case 20:return Oe.next=22,this.getter.call(this,O,ie);case 22:if(be=Oe.sent,!re.hasAbort){Oe.next=25;break}throw new R;case 25:re.hasTimeout||(Pe.value=be,ve.enable&&(Pe.timeout=0)),Oe.next=33;break;case 28:Oe.prev=28,Oe.t0=Oe.catch(11),re.hasError=!0,re.error=Oe.t0,re.hasTimeout||(Pe.error=Ht(Oe.t0).message);case 33:return Oe.prev=33,ve.clear(),Ne===w&&(re.hasTimeout&&(Pe.error=re.error),w>0&&(Pe.retry=0)),Pe.loading=!1,this.updateComputedValue(Pe),Oe.finish(33);case 39:if(!re.hasError){Oe.next=43;break}if(!(w>0&&ne>0&&Ne<w)){Oe.next=43;break}return Oe.next=43,(0,Jt.g)(ne);case 43:Ne++,Oe.next=9;break;case 46:re.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):re.hasError||re.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:re.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:be,computedObject:this}),this.onDoneCallback($,re.error,re.hasAbort,re.hasTimeout,O,be);case 48:case"end":return Oe.stop()}},I,this,[[11,28,33,39]])}));function i(I,O){return c.apply(this,arguments)}return i}()},{key:"onDoneCallback",value:function(i,I,O,$,k,Z){typeof i.onDone=="function"&&i.onDone.call(this,{id:this.id,path:this.path,value:Z,error:I,abort:O,timeout:$,scope:k})}},{key:"onDependsChange",value:function(i){var I=this;this.store.log(function(){return"AsyncComputed<".concat(I.id,"> is running by depends ").concat(i.type,"/").concat(i.path.join(".")," operate ")}),this.run({operate:i,first:!this._firstRun})}},{key:"getValueWatchPath",value:function(){var i=this.path.join(ae);return["".concat(i,".*"),i]}},{key:"getDepends",value:function(){var i=this,I=P()(D()(o.prototype),"getDepends",this).call(this);return I.map(function(O){if(O.length===0)return O;var $=f()(i.store.computedObjects.values()),k;try{for($.s();!(k=$.n()).done;){var Z=k.value;if(Fe(Z.path,O)&&Z.async)return["".concat(O,".value")]}}catch(G){$.e(G)}finally{$.f()}return O})}}]),o}(lt);function Et(){var l=arguments[0],t=typeof arguments[1]=="function"?arguments[1]:function(){return!0},o=n()(arguments[1])==="object"?arguments[1]:arguments[2],c=Object.assign({depends:[],enable:!0,objectify:!0,filter:t},o),i=function(){return{type:"watch",getter:l,options:c}};return i[q]=!0,i}var bt=function(l){F()(o,l);var t=M()(o);function o(c){var i;return L()(this,o),i=t.call(this),y()(g()(i),"_watcher",{off:function(){}}),y()(g()(i),"_enable",!0),i.store=c,i}return d()(o,[{key:"enable",get:function(){return this._enable},set:function(i){this._enable=i}},{key:"set",value:function(i,I){return P()(D()(o.prototype),"size",this)===0&&this.createWacher(),P()(D()(o.prototype),"set",this).call(this,i,I)}},{key:"createWacher",value:function(){var i=this;this._watcher=this.store.watch("**",function(I){var O=I.path;if(i._enable){var $=pe(i.store.state,O),k=f()(i.values()),Z;try{for(k.s();!(Z=k.n()).done;){var G=Z.value;G.isMatched(O,$)&&G.run(O,$)}}catch(H){k.e(H)}finally{k.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off(),this.createWacher()}},{key:"create",value:function(i,I,O){var $=Et(i,I,O),k=$();return this.store._createWatch(k)}},{key:"enableGroup",value:function(i){var I=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,O=f()(this.values()),$;try{for(O.s();!($=O.n()).done;){var k=$.value;k.options.group===i&&(k.options.enable=I)}}catch(Z){O.e(Z)}finally{O.f()}}}]),o}(j()(Map)),Ct=function(l){F()(o,l);var t=M()(o);function o(c,i,I){var O;if(L()(this,o),O=t.call(this,c,i,I),y()(g()(O),"_cache",void 0),O.store=c,O.context=I,typeof O.options.filter!="function")throw new Error("watch options.filter must be a function");return O}return d()(o,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(i,I){return De(i,this.path)?!1:this.filter(i,I)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(i,I){if(!this.enable){this.store.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var O,$=(O=this.getter)===null||O===void 0?void 0:O.call(this,{path:i,value:I},this);this.value=$,this.emitStoreEvent("watch:done",{value:$,watchObject:this})}catch(k){this.emitStoreEvent("watch:error",{error:k,watchObject:this})}}}]),o}(ut),Ot=ae;function Bt(l,t){if(!t||t==="**")return!0;var o=l.split(Ot),c=t.split(Ot);if(o.length!==c.length)return!1;for(var i=0;i<c.length;i++)if(c[i]!=="*"&&c[i]!==o[i])return!1;return!0}var st=function(){function l(){L()(this,l),y()(this,"_listeners",new Map)}return d()(l,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var o=this,c=arguments[0],i=arguments[1],I=arguments[2],O=i;return c==="**"?this.addHandler("*",O,I):String(c).includes("*")?(O=function(k,Z){Bt(Z,c)&&i(k,Z)},this.addHandler("*",O,I)):this.addHandler(c,O,I),{off:function(){return o.off(c,O)}}}},{key:"addHandler",value:function(o,c,i){var I=this._listeners.get(o);I?i?I.unshift(c):I.push(c):this._listeners.set(o,[c])}},{key:"once",value:function(o,c){var i=this,I=function O($,k){try{c($,k)}finally{i.off(k,O)}};return this.on(o,I)}},{key:"off",value:function(o,c){String(o).includes("*")&&(o="*");var i=this._listeners.get(o);i&&(c?i.splice(i.indexOf(c)>>>0,1):this._listeners.set(o,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(o){return this.on("**",o)}},{key:"wait",value:function(){var o=this,c=n()(arguments[0]),i=c==="string"?arguments[0]:void 0,I=arguments[1]||0,O=c==="function"?c:void 0,$;return new Promise(function(k,Z){var G;i?G=o.once(i,function(H){clearTimeout($),k(H)}):typeof O=="function"&&(G=o.onAny(function(H,w){var ne=O(w,H);ne!==!1&&(G.off(),clearTimeout($),k(H))})),I>0&&($=setTimeout(function(){G.off(),Z(new Error("timeout"))},I))})}},{key:"emit",value:function(o,c){var i=this._listeners.get("*");i&&i.slice().map(function(I){I(c,o)}),i=this._listeners.get(o),i&&i.slice().map(function(I){I(c,o)})}}]),l}();function Yt(l){var t;return se(l)?t=l():typeof l=="function"&&(t={type:"computed",getter:l,options:Object.assign({},Ae(),{async:he(l)})}),t}var St=function(l){F()(o,l);var t=M()(o);function o(c,i){var I;return L()(this,o),I=t.call(this),y()(g()(I),"_data",void 0),y()(g()(I),"computedObjects",void 0),y()(g()(I),"watchObjects",void 0),y()(g()(I),"_operates",new st),y()(g()(I),"_options",void 0),y()(g()(I),"_silenting",!1),y()(g()(I),"_batching",!1),y()(g()(I),"_batchOperates",[]),y()(g()(I),"_peeping",!1),I._options=(0,Wt.w)({id:Se(),debug:!1,lazy:!1,enableComputed:!0,reentry:!0,log:Ut},i),I.computedObjects=new ht(g()(I)),I.watchObjects=new bt(g()(I)),I.subscribeCallbacks(),I._data=Vt(c,{notify:I._notify.bind(g()(I)),createComputedObject:I.createObserverObject.bind(g()(I))}),I.getSnap=I.getSnap.bind(g()(I)),I.watch=I.watch.bind(g()(I)),I.update=I.update.bind(g()(I)),I.peep=I.peep.bind(g()(I)),I.silentUpdate=I.silentUpdate.bind(g()(I)),I.batchUpdate=I.batchUpdate.bind(g()(I)),I.collectDependencies=I.collectDependencies.bind(g()(I)),I.trace=I.trace.bind(g()(I)),I.installExtends(),I._options.lazy||Ze(I._data),I._options.debug&&n()(globalThis.__AUTOSTORE_DEVTOOLS__)==="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(g()(I)),I.emit("load",g()(I)),I}return d()(o,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(i,I){this._options.debug&&this.options.log.call(this,i,I)}},{key:"installExtends",value:function(){var i=this,I=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(I)&&I.forEach(function(O){return typeof O=="function"&&O(i)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(i){this._peeping&&i.type==="get"||(this._batching&&this._batchOperates.push(i),!this._silenting&&this.operates.emit(i.path.join(ae),i))}},{key:"watch",value:function(){var i=this,I=typeof arguments[0]=="function"||arguments[0]==="*",O=I?arguments[0]:arguments[1],$=function(Pe,Ue){return function(ze){if(Pe!=="*"){if(Pe==="write"){if(ze.type==="get")return}else if(Pe==="read"){if(ze.type!=="get")return}else if(Array.isArray(Pe)&&Pe.length>0&&!Pe.includes(ze.type))return}if(!(typeof Ue=="function"&&!Ue(ze)))try{i._peeping=!0,O(ze)}finally{i._peeping=!1}}};if(I){var k=Object.assign({once:!1,operates:"write"},arguments[1]),Z=k.operates,G=k.filter,H=$(Z,G);return this.operates.onAny(H)}else{var w=arguments[0],ne=Array.isArray(w)?w.map(function(Ne){return typeof Ne=="string"?Ne:Ne.join(ae)}):[w],ee=Object.assign({once:!1,operates:"write"},arguments[2]),le=ee.once,ie=ee.operates,re=ee.filter,ve=le?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),be=[],Te=$(ie,re);return ne.forEach(function(Ne){be.push(ve.call(i,Ne,Te))}),{off:function(){return be.forEach(function(Pe){return Pe.off()})}}}}},{key:"createObserverObject",value:function(i,I,O,$){var k=Yt(I),Z={path:i,value:I,parentPath:O,parent:$};if(k){if(k.type==="computed"){var G=this._createComputed(k,Z);return G==null?void 0:G.initial}else if(k.type==="watch"){var H=this._createWatch(k,Z);return H==null?void 0:H.initial}}else return I}},{key:"_createComputed",value:function(i,I){var O;return i.options.async?O=new yt(this,i,I):O=new gt(this,i,I),O&&(O.silentUpdate(O.initial),O.options.objectify&&this.computedObjects.set(O.id,O),this.emit("computed:created",O)),O}},{key:"_createWatch",value:function(i,I){var O=new Ct(this,i,I);return i.options.objectify&&this.watchObjects.set(O.id,O),this.emit("watch:created",O),O}},{key:"silentUpdate",value:function(i){this.update(i,{silent:!0})}},{key:"batchUpdate",value:function(i){this.update(i,{batch:!0})}},{key:"update",value:function(i,I){var O=this,$=Object.assign({},I),k=$.batch,Z=k===void 0?!1:k,G=$.reply,H=G===void 0?!0:G,w=$.silent,ne=w===void 0?!1:w,ee=$.peep,le=ee===void 0?!1:ee;if(typeof i=="function"){ne&&(this._silenting=!0),Z&&(this._batching=!0,this._silenting=!0),le&&(this._peeping=!0);try{var ie=i(this.state);if(Z&&oe(ie))throw new Error("Batch update method can't be async function")}finally{if(this._silenting=!1,this._batching=!1,this._peeping=!1,this._batchOperates.length>0){var re=u()(this._batchOperates);this._batchOperates=[],H&&re.forEach(function(be){be.reply=!0,O._notify(be)});try{var ve=Z===!0?xe:String(Z);this.operates.emit(ve,{type:"batch",path:[ve],value:re})}finally{this._batchOperates=[]}}}}else throw new Error("update method must provide a function argument")}},{key:"peep",value:function(){var i=arguments,I=this,O=typeof arguments[0]=="function"?function(){return i[0](I.state)}:function(){return pe(I.state,Array.isArray(i[0])?i[0]:i[0].split(ae))};this._peeping=!0;try{return O()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(i){var I=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",O=[],$=this.watch(function(k){O.push(k.path)},{operates:I});try{i()}finally{$.off()}return rt(O)}},{key:"trace",value:function(i){var I=this,O=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",$;return{stop:function(){return $&&$.off()},start:function(){var k=a()(m()().mark(function G(H){var w;return m()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return w=[],ee.abrupt("return",new Promise(function(le){$=I.watch(function(ie){w.push(ie),H&&H(ie)&&($.off(),le(w))},{operates:O}),Promise.resolve(i()).finally(function(){typeof H!="function"&&($.off(),le(w))})}));case 2:case"end":return ee.stop()}},G)}));function Z(G){return k.apply(this,arguments)}return Z}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(i){var I=Object.assign({reserveAsync:!0},i),O=I.reserveAsync,$=I.entry;return qe($?pe(this._data,$):this._data,O)}}]),o}(st),Ie=e(92379);function We(l,t,o,c){if(!t)return l.state;var i;try{typeof t=="function"?i=t(l.state):Array.isArray(t)?i=pe(l.state,t):i=pe(l.state,t.split(ae)),o&&z(i)&&(i=i.value)}catch(I){if(c)return c(I)}return i}function Xt(l){return function(){var t=arguments,o=t.length>=1&&(Array.isArray(t[0])||typeof t[0]=="string"||typeof t[0]=="function")?t[0]:void 0,c=t.length===2&&typeof t[1]=="function"?t[1]:void 0,i=t.length===2&&(typeof o=="string"||Array.isArray(o))&&typeof t[1]=="boolean"?t[1]:!1,I=(0,Ie.useState)(function(){return We(l,o,i!==!0)}),O=Ee()(I,2),$=O[0],k=O[1],Z=l.useDeps(o,i===!0?"all":"value");(0,Ie.useEffect)(function(){var H;return Z.length===0?H=l.watch(function(w){var ne=w.reply;ne||k(Ce()({},l.state))}):H=l.watch(Z,function(){var w=We(l,o);k(fe(w)?Ce()({},w):Array.isArray(w)?u()(w):w)}),function(){return H.off()}},[Z]);var G=(0,Ie.useCallback)(function(H){o?typeof o=="string"?l.update(function(w){return me(w,o.split(ae),H)}):Array.isArray(o)?l.update(function(w){return me(w,o,H)}):typeof o=="function"&&c&&l.update(function(w){return c(H,w)}):typeof H=="function"&&l.update(function(w){return H(w)},{batch:!0})},[o]);return[$,G]}}function Qt(l){return function(t){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",c=(0,Ie.useState)(function(){return ft(t,l,o)}),i=Ee()(c,1),I=i[0];return I}}var Be=e(651);function qt(l,t,o){var c=o.errorBoundary||l.options.signalErrorBoundary;return Ie.memo(function(){var i=l.useDeps(t),I=(0,Ie.useState)(null),O=Ee()(I,2),$=O[0],k=O[1],Z=(0,Ie.useState)(function(){return We(l,t,!0,k)}),G=Ee()(Z,2),H=G[0],w=G[1];return(0,Ie.useEffect)(function(){var ne=l.watch(i,function(){w(We(l,t,!0,k))});return function(){return ne.off()}},[i]),(0,Be.jsx)(Be.Fragment,{children:$?(0,Be.jsx)(c,{error:$}):H})},function(){return!0})}function ea(l,t,o,c){var i=c.errorBoundary||l.options.signalErrorBoundary;return Ie.memo(function(){var I=(0,Ie.useState)(null),O=Ee()(I,2),$=O[0],k=O[1],Z=(0,Ie.useState)(function(){return We(l,o,!1,k)}),G=Ee()(Z,2),H=G[0],w=G[1],ne=z(H),ee=(0,Ie.useMemo)(function(){return ne?H:{value:H}},[H]),le=l.useDeps(o,"none");return(0,Ie.useEffect)(function(){var ie=ne?"".concat(Array.isArray(o)?o.join(ae):o,".*"):le,re=l.watch(ie,function(ve){var be=ve.path,Te=ve.value;w(ne?Ce()(Ce()({},H),{},y()({},be[be.length-1],Te)):We(l,o,!1,k))});return function(){return re.off()}},[le]),(0,Be.jsx)(Be.Fragment,{children:$?(0,Be.jsx)(i,{error:$}):t(ee)})},function(){return!0})}function ta(l,t,o,c){var i=c.errorBoundary||l.options.signalErrorBoundary;return Ie.memo(function(){var I=(0,Ie.useState)(null),O=Ee()(I,2),$=O[0],k=O[1],Z=se(o)?o():o,G=(0,Ie.useState)(function(){try{if($e(Z)){if(Z.options.objectify=!1,Z.type==="computed")return l.computedObjects.create(Z);if(Z.type==="watch")return l.watchObjects.create(Z)}else{var re=Re(Z),ve=re();return ve.options.objectify=!1,l.computedObjects.create(ve)}}catch(be){return k(be),null}}),H=Ee()(G,1),w=H[0],ne=(0,Ie.useState)(function(){return w?w.async?w.value:{value:w.value}:{value:""}}),ee=Ee()(ne,2),le=ee[0],ie=ee[1];return(0,Ie.useEffect)(function(){var re={off:function(){}};return w&&(re=w.watch(function(ve){if(!ve.reply)try{if(w.type==="computed")if(w.async){var be=w;(Fe(ve.path,be.path)||Fe(ve.path.slice(0,-1),be.path))&&ie(Ce()({},be.value))}else ie({value:w.value});else w.type==="watch"&&ie({value:w.value})}catch(Te){k(Te)}},{operates:"write"})),function(){return re.off()}},[Z]),(0,Be.jsx)(Be.Fragment,{children:$?(0,Be.jsx)(i,{error:$}):t(le)})},function(){return!0})}function aa(l){return function(){var t=arguments,o=t.length>=1&&(typeof t[0]=="string"||typeof t[0]=="function")&&(!t[1]||fe(t[1]))?t[0]:void 0,c=t.length>=2&&typeof t[0]=="function"&&(typeof t[1]=="string"||Array.isArray(t[1])||typeof t[1]=="function")?t[0]:void 0,i=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,I=t.length>=2&&typeof t[0]=="function"&&(typeof t[1]=="string"||Array.isArray(t[1]))?t[1]:void 0,O=Object.assign({},t.length>1&&fe(t[t.length-1])?t[t.length-1]:void 0),$=o?qt(l,o,O):I?ea(l,c,I,O):i?ta(l,c,i,O):function(){return(0,Be.jsx)(Be.Fragment,{})};return(0,Be.jsx)($,{})}}function ct(l){var t=l;if(l){l.persist&&l.persist();var o=l.currentTarget;o&&l.type?o.tagName==="INPUT"&&o.type==="checkbox"?t=o.checked:t=o.value:l.nativeEvent&&l.target&&(t=l.target.value)}return t}function na(l){return function(){var t=arguments,o=t.length>=1&&typeof t[0]=="string"?t[0]:void 0;if(!o)throw new Error("Input bind must have at least one argument");var c={};return c.onChange=function(i){var I=ct(i);me(l.state,o.split(ae),I)},c}}function Pt(l){return function(){var t=arguments,o=t.length>=1?Array.isArray(t[0])?t[0]:typeof t[0]=="string"?t[0].split(ae):void 0:void 0,c=t.length>=2&&typeof t[0]=="function"?t[0]:void 0,i=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,I=(0,Ie.useCallback)(function(w,ne){return{value:ne,onChange:function(le){var ie=ct(le);w?l.update(function(re){return me(re,Array.isArray(w)?w:w.split(ae),ie)}):i(ie,l.state)}}},[]),O=(0,Ie.useCallback)(function(w,ne){var ee={};return Object.entries(ne).forEach(function(le){var ie=Ee()(le,2),re=ie[0],ve=ie[1];if(et(ve)){var be=w?[].concat(u()(w),[re]):[re];ee[re]=I(be,ve)}}),ee},[]),$=(0,Ie.useState)(function(){if(typeof c=="function")return I(void 0,c(l.state));var w=o?We(l,o,!0):l.state;if(fe(w))return O(o,w);if(typeof o=="string")return I(o,w);if(Array.isArray(o))return I(o.join(ae),w)}),k=Ee()($,2),Z=k[0],G=k[1],H=l.useDeps(o||c);return(0,Ie.useEffect)(function(){var w;if(H.length===0||t.length===0)w=l.watch(function(le){var ie=le.path,re=le.value;ie.length===1&&et(re)&&G(Ce()(Ce()({},Z),{},y()({},ie[0],I(ie[0],re))))});else if(H.length>0){var ne=o?We(l,o,!0):void 0,ee=fe(ne);o&&ee&&H.length===1&&H[0].push("*"),w=l.watch(H,function(le){var ie=le.path,re=le.value;if(typeof c=="function"){var ve=c(l.state);G(I(void 0,ve))}else G(ee?Ce()(Ce()({},Z),{},y()({},ie[ie.length-1],I(ie,re))):I(ie,re))})}return function(){return w.off()}},[H]),Z}}function ra(l){var t=arguments;return function(){var o=t[0],c=t[1],i=t[2];(0,Ie.useEffect)(function(){var I=l.watch(o,c,i);return function(){return I.off()}},[])}}var it=Symbol("FAKE_BINDINGS");function pt(l,t){var o={};return t instanceof Map?t.forEach(function(c,i){o[i]=it}):Object.entries(t).forEach(function(c){var i=Ee()(c,1),I=i[0];o[I]=it}),o}function It(l,t,o){return{value:o,onChange:function(i){var I=ct(i);l.update(function(O){return me(O,t,I)})}}}function Nt(l,t,o,c,i){if(n()(l)!=="object"||l===null)return l;var I=t.length===0?"__ROOT__":t.join(".");if(o.has(I))return o.get(I);var O=l;(Array.isArray(l)||fe(l))&&(O=pt(c,l));var $=new Proxy(O,{get:function(Z,G,H){if(typeof G!="string")return Reflect.get(Z,G,H);var w=[].concat(u()(i),u()(t),[String(G)]),ne=pe(c.state,w);return et(ne)?It(c,w,ne):z(ne)?It(c,[].concat(u()(w),["value"]),ne):Nt(ne,w,o,c,i)}});return o.set(I,$),$}function At(l,t){var o=new Map;return Nt({},[],o,l,t)}function Dt(l){return function(){var t=arguments,o=t.length>0?typeof t[0]=="string"?t[0].split(ae):Array.isArray(t[0])?t[0]:[]:[],c=(0,Ie.useState)(function(){return l.getSnap({entry:o})}),i=Ee()(c,2),I=i[0],O=i[1],$=(0,Ie.useState)(function(){return At(l,o)}),k=Ee()($,1),Z=k[0];return(0,Ie.useSyncExternalStore)(function(G){var H=l.watch(function(w){var ne=w.path,ee=w.value;if(ot(o,ne)){var le=ne.slice(o.length);me(I,le,ee),me(Z,[].concat(u()(le),["value"]),ee),O(Ce()({},I)),G()}});return function(){H.off()}},function(){return I}),Z}}var Ye=function(l){F()(o,l);var t=M()(o);function o(c,i){var I;return L()(this,o),I=t.call(this,c,Object.assign({signalErrorBoundary:function(){return(0,Be.jsx)(Be.Fragment,{children:"ERROR"})}},i)),y()(g()(I),"useState",void 0),y()(g()(I),"useAsyncState",void 0),y()(g()(I),"useDeps",void 0),y()(g()(I),"$",void 0),y()(g()(I),"signal",void 0),y()(g()(I),"bind",void 0),y()(g()(I),"useField",void 0),y()(g()(I),"useWatch",void 0),y()(g()(I),"useBindings",void 0),I.signal=I.$=aa(g()(I)).bind(g()(I)),I.useState=Xt(g()(I)).bind(g()(I)),I.useAsyncState=function(O){return I.useState(O,!0)[0]},I.useDeps=Qt(g()(I)).bind(g()(I)),I.useField=Pt(g()(I)).bind(g()(I)),I.bind=na(g()(I)).bind(g()(I)),I.useWatch=ra(g()(I)).bind(g()(I)),I.useBindings=Dt(g()(I)).bind(g()(I)),I}return d()(o)}(St);function oa(l,t){return new Ye(l,t)}function ua(l,t){if(l)try{if(l.classList){var o;(o=l.classList).remove.apply(o,u()(t.split(/\s+/)))}}catch(c){}}function la(l,t){var o=l.indexOf(t);o>=0&&l.splice(o,1)}function da(l,t){if(l)try{l.classList&&t.split(/\s+/).forEach(function(o){l.classList.add(o)})}catch(o){}}function sa(l,t){if(t){var o=l.getAttribute("style")||"";o.endsWith(";")&&(o+=";"),t.endsWith(";")&&(t=t+=";"),t.split(";").forEach(function(c){o.includes(c+";")||(o+=c+";")}),l.setAttribute("style",o+t)}}function Mt(l,t,o){if(t){var c=function(I,O){o==="style"?sa(l,O):da(l,O)};n()(t)==="object"?Object.entries(t).forEach(function(i){var I=Ee()(i,2),O=I[0],$=I[1],k=O.toLocaleUpperCase()==="ROOT"?l:l.querySelector(O);c(k,$)}):typeof t=="string"&&c(l,t)}}function ca(l,t){if(t){var o=(l.getAttribute("style")||"").trim();o.endsWith(";")&&(o+=";"),t.endsWith(";")&&(t=t+=";"),t.split(";").forEach(function(c){o=o.replace(c+";","")}),l.setAttribute("style",o.replace(t,""))}}function jt(l,t,o){if(t){var c=function(I,O){o==="style"?ca(l,O):ua(l,O)};n()(t)==="object"?Object.entries(t).forEach(function(i){var I=Ee()(i,2),O=I[0],$=I[1],k=O.toLocaleUpperCase()==="ROOT"?l:l.querySelector(O);c(k,$)}):typeof t=="string"&&c(l,t)}}function Xe(l){return["input","textarea","select"].includes(l.tagName.toLowerCase())}function ia(l){var t=document.createElement("span");if(t.style.color="red",t.classList.add("error"),Xe(l))if(l.nextSibling){var o;(o=l.parentNode)===null||o===void 0||o.insertBefore(t,l.nextSibling)}else{var c;(c=l.parentNode)===null||c===void 0||c.appendChild(t)}else l.appendChild(t);return t}var Rt=Symbol("empty"),$t=".invalid",pa="data-validate-message",Ia="data-field-part";function va(l){var t=l.querySelectorAll(":scope input[name][value=''],textarea[name][value=''],select[name][value=''],.autofield"),o=Array.from(t).filter(function(c){return c.nodeType&&c.nodeType===1});return o}function ma(l,t){var o=t?t(l):va(l);return o.reduce(function(c,i){var I=i.getAttribute("name");if(I){var O=Array.from(Xe(i)?[i]:i.querySelectorAll("input[value=''],textarea[value=''],select[value='']"));c[I]={path:I,el:i,inputs:O,invalidTips:i.getAttribute(pa)},c[I].inputs.forEach(function($){$.setAttribute("name",I)})}return c},{})}function fa(l,t,o,c,i){if(!o)return t;if(Array.isArray(c))c[parseInt(o)]=t;else if(n()(c)==="object")c[o]=t;else{if(typeof c=="string")return c.replace(new RegExp(o),function(I,O){return I.replace(O,t)});if(typeof c=="boolean")return!!t;if(typeof c=="number")return parseFloat(t)}return t}function xa(l,t,o,c,i){var I=i.toState||fa,O=t.dataset.fieldPart,$=o.split(ae),k=l.peep(function(G){return pe(G,$)}),Z=I(o,c,O,k,t);l.update(function(G){me(G,o.split(ae),Z)},{peep:!0})}function ha(l){return typeof l=="number"||typeof l=="string"&&!isNaN(parseFloat(l))}function ga(l,t,o){if(!o)return t;if(Array.isArray(t)&&ha(o))return t[o];if(n()(t)==="object")return t[o];if(typeof t=="string"){var c=t.match(new RegExp(o));if(c)return c.length===1?c[0]:c[1]}return t}function Lt(l,t,o){var c=o.fromState||ga,i=!1;return l.inputs.forEach(function(I){var O=I.dataset.fieldPart,$=c(l.path,t,O),k=I.type==="checkbox"?I.checked:I.value,Z;I.type==="checkbox"?Z=!!$:Z=$||"",k!==Z&&(I.type==="checkbox"?I.checked=Z:I.value=Z,i=!0)}),i}function vt(l){var t;return Xe(l)?[l]:(t=l.querySelectorAll("input,textarea,select"),Array.from(t))}var _a=function(){function l(t,o){L()(this,l),y()(this,"_onInvalid",void 0),y()(this,"_invalids",[]),y()(this,"_onFormValid",void 0),this.store=t,this.formCtx=o,this._onInvalid=this.onInvalid.bind(this),this._onFormValid=o.setValid,this.attach()}return d()(l,[{key:"form",get:function(){return this.formCtx.formRef.current}},{key:"options",get:function(){return this.formCtx.options}},{key:"fields",get:function(){return this.formCtx.fields}},{key:"attach",value:function(){this.form.addEventListener("invalid",this._onInvalid,!0)}},{key:"detach",value:function(){this.form.removeEventListener("invalid",this._onInvalid,!0),this._invalids=[]}},{key:"onInvalid",value:function(o){var c=o.target;console.log("form invalid:",c.getAttribute("name"))}},{key:"setValid",value:function(o){this.formCtx.setValid(o)}},{key:"updateInvalids",value:function(o,c){c?la(this._invalids,o):this._invalids.includes(o)||this._invalids.push(o),this.setValid(this._invalids.length===0)}},{key:"validateAll",value:function(){for(var o=0,c=Object.values(this.fields);o<c.length;o++){var i=c[o];this.validate(i.el)}}},{key:"checkValidity",value:function(o){var c=o&&o.checkValidity&&!o.checkValidity()}},{key:"validate",value:function(o){var c=this.options.validate,i=c&&xt(c),I=o.getAttribute("name");if(I){var O={path:I,value:!0,error:null},$=vt(o),k=f()($),Z;try{for(k.s();!(Z=k.n()).done;){var G=Z.value;G&&G.checkValidity&&!G.checkValidity()?(O.value=!1,O.error=G.validationMessage):(O.value=!0,O.error=null),this.report(o,O)}}catch(ve){k.e(ve)}finally{k.f()}if(i){var H=vt(o),w=f()(H),ne;try{for(w.s();!(ne=w.n()).done;){var ee=ne.value,le=ee.value,ie=ee.getAttribute(Ia),re=c(I,le,ie,o);typeof re=="boolean"?(O.value=re,O.error=o.dataset.errorTips||"ERROR"):typeof re=="string"&&(O.value=!1,O.error=re),ee&&ee.setCustomValidity&&ee.setCustomValidity(O.error||""),this.report(o,O)}}catch(ve){w.e(ve)}finally{w.f()}}return O}}},{key:"getReportElement",value:function(o,c){if(c){var i=Xe(c),I=this.options.reportElement,O=I&&typeof I=="string",$=O?this.form.querySelector(I.replace(/\{\s*name\s*\}/,o)):i?c.nextSibling:c.querySelector($t);return(!$||$.nodeType!==1)&&($=ia(c)),$}}},{key:"toggleReport",value:function(o,c){c.value?this.hideReport(o,c):this.showReport(o,c)}},{key:"showReport",value:function(o,c){var i=this.getReportElement(c.path,o),I=c.error||o.dataset.validateMessage||"ERROR";i&&I&&(i.innerHTML=I,i.style.display="block"),Mt(o,this.options.invalidStyles,"style"),Mt(o,this.options.invalidClasss,"class")}},{key:"hideReport",value:function(o,c){jt(o,this.options.invalidStyles,"style"),jt(o,this.options.invalidClasss,"class");var i=this.getReportElement(c.path,o);i&&i.classList.contains($t)&&(i.style.display="none")}},{key:"report",value:function(o,c){var i=this.options.reportStyle||"custom";if(i==="custom"){var I=this.options.reportElement;typeof I=="function"?I(c,o):this.toggleReport(o,c)}else{var O=vt(o);O.forEach(function($){$.reportValidity()})}}},{key:"reportAll",value:function(){this.form.reportValidity()}}]),l}();function ya(l){return l==null?!0:Array.isArray(l)?l.length===0:n()(l)==="object"?Object.keys(l).length===0:typeof l=="string"?l.trim()==="":!1}function Ea(l){return l===!0}function ba(l,t){var o=t.current,c=t.current.options;return Ie.memo(function(i){var I=(0,Ie.useRef)(!1),O=(0,Ie.useCallback)(function(){var k=c.ref.current;if(k){var Z=!0,G=c.entry,H=G===void 0?[]:G,w=l.getSnap({entry:H});o.fields=ma(k,c.findFields),ya(o.fields)&&l.log("No fields found in the autoform","warn"),o.validator=new _a(l,o),Object.entries(o.fields).forEach(function(ne){var ee=Ee()(ne,2),le=ee[0],ie=ee[1],re=[].concat(u()(H),u()(le.split(ae))),ve=pe(w,re,Rt);ve!==Rt&&(ie.initial=ve,Lt(ie,ve,c))}),Ea(c.validAtInit)||o.validator.validateAll(),I.current=!0,o.setDirty(),o.setValid(Z)}},[]);(0,Ie.useEffect)(function(){var k=c.ref.current;if(k){var Z=c.entry,G=Z===void 0?[]:Z;!I.current&&k&&O();var H=l.watch(function(ne){var ee=ne.path,le=ne.value;if(ot(G,ee)){var ie=ee.join(ae);if(ie in o.fields){var re=o.fields[ie];Lt(re,le,o.options)&&o.validator.validate(re.el)}}}),w=function(ee){var le=ee.target,ie=le.name;if(ie){var re=le.type==="checkbox"?le.checked:le.value;o.validator.validate(le)&&xa(l,le,ie,re,o.options),o.setDirty()}};return k.addEventListener("input",w),function(){H.off(),k.removeEventListener("input",w)}}},[]);var $=Ie.memo(function(){return(0,Be.jsx)(Be.Fragment,{children:i.children})},function(){return!0});return(0,Be.jsx)("form",Ce()(Ce()({},i),{},{ref:c.ref,children:(0,Be.jsx)($,{})}))},function(){return!0})}function Ca(l,t){var o=t.current,c=t.current.options;return Ie.memo(function(i){var I=i.render,O=i.name,$=(0,Ie.useRef)(null),k=l.useState(i.name,!0),Z=Ee()(k,1),G=Z[0];(0,Ie.useEffect)(function(){},[]);var H={value:G,onChange:function(ne,ee){var le=ne.target;if(typeof ee=="function")l.batchUpdate(function(re){ee(re)});else if(typeof O=="string"&&!Xe(le)){var ie=new CustomEvent("input",{detail:{value:ee}});le.dispatchEvent(ie)}}};return(0,Be.jsx)(Be.Fragment,{children:I(H)})},function(){return!0})}function Oa(){var l=(0,Ie.useRef)(null),t=(0,Ie.useRef)(null),o=(0,Ie.useRef)(null),c=(0,Ie.useRef)(null),i=(0,Ie.useRef)(null),I=arguments[1]||{};I.ref||(I.ref=o),i.current===null&&(i.current=arguments[0]instanceof Ye?arguments[0]:new Ye(arguments[0],arguments[1]));var O=(0,Ie.useState)(!0),$=Ee()(O,2),k=$[0],Z=$[1],G=(0,Ie.useState)(!1),H=Ee()(G,2),w=H[0],ne=H[1],ee=i.current;return l.current||(c.current={options:I,setDirty:function(){return w===!1&&ne(!0)},setValid:Z,state:pe(ee.state,I.entry||[]),formRef:o},l.current=ba(ee,c),t.current=Ca(ee,c)),(0,Ie.useEffect)(function(){return function(){var le;l.current=null,t.current=null,o.current=null,c.current=null,(le=i.current)===null||le===void 0||le.destroy(),i.current=null}},[]),Ce()(Ce()({},ee),{},{Form:l.current,Field:t.current,valid:k,dirty:w})}function Ba(l,t){var o=(0,Ie.useRef)();return o.current||(o.current=new Ye(l,t)),(0,Ie.useEffect)(function(){return function(){var c;(c=o.current)===null||c===void 0||c.destroy(),o.current=void 0}},[]),o.current}},60358:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(77643);const d=[]},19962:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(61668);const d=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},63611:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(28627);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
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
`,paraId:18,tocIndex:3},{value:"\u66F4\u591A\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:19,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:20,tocIndex:3},{value:"\u3002",paraId:19,tocIndex:3}]},58524:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(46267);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
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
`,paraId:58,tocIndex:16}]},77614:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(25231);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
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
`,paraId:21,tocIndex:7},{value:"\u4F7F\u7528",paraId:22,tocIndex:7},{value:"computed",paraId:22,tocIndex:7},{value:"\u53EF\u4EE5\u8FDB\u884C\u66F4\u591A\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982",paraId:22,tocIndex:7},{value:"options",paraId:22,tocIndex:7},{value:"\u7B49\u3002",paraId:22,tocIndex:7},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:23,tocIndex:8},{value:"\uFF1A",paraId:23,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"PARENT",paraId:24,tocIndex:8},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:24,tocIndex:8},{value:"associated=true",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:24,tocIndex:8},{value:"obj.value",paraId:24,tocIndex:8},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:24,tocIndex:8},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:25,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:26,tocIndex:8},{value:"\u4F7F\u7528",paraId:27},{value:"computed(<getter>,<depends>,<options>)",paraId:27},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:27},{value:"getter",paraId:28},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:28},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:29},{value:"depends",paraId:28},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:28},{value:"\u4F9D\u8D56",paraId:30},{value:"options",paraId:28},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:28},{value:"\u9009\u9879",paraId:31}]},68258:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(83717);const d=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
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
`,paraId:30,tocIndex:6},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:31,tocIndex:6},{value:"./price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"./count",paraId:31,tocIndex:6},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:31,tocIndex:6},{value:"price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"count",paraId:31,tocIndex:6},{value:"\u5C5E\u6027\u3002",paraId:31,tocIndex:6},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:31,tocIndex:6},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:31,tocIndex:6}]},94957:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(76938);const d=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},15467:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(87480);const d=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"store.computedObjects",paraId:0,tocIndex:0},{value:"\u6765\u7BA1\u7406",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A",paraId:1,tocIndex:0},{value:"Map",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u662F\u4E00\u4E2A\u7C7B\uFF0C\u67E5\u770BAPI\u6587\u6863\u53EF\u4EE5\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\u3002",paraId:3}]},33989:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(15968);const d=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u652F\u6301",paraId:0,tocIndex:0},{value:"ComputedOptions",paraId:0,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u53C2\u6570\u6765\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`// \u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
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
`,paraId:48,tocIndex:14},{value:"\u7C7B\u578B",paraId:49,tocIndex:15},{value:"\uFF1A",paraId:49,tocIndex:15},{value:"(error:Error)=>void",paraId:49,tocIndex:15},{value:"\u5F53\u6267\u884C\u8BA1\u7B97",paraId:50,tocIndex:15},{value:"getter",paraId:50,tocIndex:15},{value:"\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03",paraId:50,tocIndex:15},{value:"\u7C7B\u578B",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:"(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void",paraId:51,tocIndex:16},{value:"\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u5B8C\u6210\u65F6\u7684\u56DE\u8C03",paraId:52,tocIndex:16}]},51289:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(49613);const d=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:0,tocIndex:0},{value:"\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:1,tocIndex:0},{value:"ComputedObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:0},{value:"ComputedObject",paraId:2,tocIndex:0},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:2,tocIndex:0},{value:"store.computedObjects",paraId:2,tocIndex:0},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:2,tocIndex:0},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"store.computedObjects.get(<id>).run()",paraId:3,tocIndex:1},{value:"\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:`import { createStore,computed } from '@autostorejs/react';
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
\u5F53\u4F7F\u7528`,paraId:11,tocIndex:3},{value:"computed",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"group",paraId:11,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:11,tocIndex:3},{value:"computed",paraId:12,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"enable",paraId:12,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:12,tocIndex:4},{value:"enable=false",paraId:12,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:12,tocIndex:4},{value:"enable=true",paraId:12,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:13,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:14,tocIndex:4},{value:"enable",paraId:14,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:14,tocIndex:4}]},48248:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(87975);const d=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
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
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},92205:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(48120);const d=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
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
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},80233:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(89004);const d=[{value:`\u5728\u590D\u6742\u7684\u72B6\u6001\u4E2D\uFF0C\u6709\u65F6\u4F1A\u4E0D\u7ECF\u610F\u95F4\u4F1A\u4EA7\u751F\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u8FD9\u662F\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u4E2D\u7684\u4E00\u4E2A\u5E38\u89C1\u95EE\u9898\u3002
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
`,paraId:10,tocIndex:6},{value:"return 'disable'",paraId:11,tocIndex:6},{value:"\uFF1A \u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:11,tocIndex:6},{value:"return 'ignore'",paraId:11,tocIndex:6},{value:":  \u4EE3\u8868\u5FFD\u7565",paraId:11,tocIndex:6},{value:"\u5176\u4ED6\u4F1A\u89E6\u53D1\u9519\u8BEF",paraId:11,tocIndex:6},{value:"installCycleDetectExtend",paraId:12,tocIndex:7},{value:"\u5177\u6709\u4EE5\u4E0B\u914D\u7F6E\u53C2\u6570\uFF1A",paraId:12,tocIndex:7},{value:"\u53C2\u6570",paraId:13,tocIndex:7},{value:"\u7C7B\u578B",paraId:13,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:13,tocIndex:7},{value:"\u8BF4\u660E",paraId:13,tocIndex:7},{value:"maxOperates",paraId:13,tocIndex:7},{value:"number",paraId:13,tocIndex:7},{value:"200",paraId:13,tocIndex:7},{value:"\u6700\u5927\u64CD\u4F5C\u6570\uFF0C\u4ECE\u5F00\u59CB\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u540E\uFF0C\u5F53\u6536\u96C6\u5230\u6B64\u6570\u91CF\u7684\u64CD\u4F5C\u4E8B\u4EF6\u540E\u5F00\u5982\u5206\u6790\u3002",paraId:13,tocIndex:7},{value:"onDetected",paraId:13,tocIndex:7},{value:"(paths:string)=>'disable' | 'ignore' | void",paraId:13,tocIndex:7},{value:"-",paraId:13,tocIndex:7},{value:"\u5F53\u68C0\u6D4B\u5230\u5FAA\u73AF\u4F9D\u8D56\u65F6\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"disable",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"ignore",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u5FFD\u7565,\u5176\u4ED6\u89E6\u53D1\u9519\u8BEF\u3002",paraId:13,tocIndex:7}]},35603:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(93359);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u9996\u5148\u9700\u8981\u5B89\u88C5",paraId:1,tocIndex:2},{value:"@autostorejs/devtools",paraId:1,tocIndex:2},{value:"\u548C",paraId:1,tocIndex:2},{value:"Redux DevTools Extension",paraId:1,tocIndex:2},{value:"\u3002",paraId:1,tocIndex:2},{value:`npm install  @autostorejs/devtools
`,paraId:2},{value:`yarn add @autostorejs/devtools
`,paraId:3},{value:`pnpm add @autostorejs/devtools
`,paraId:4},{value:"\u5728\u4F60\u7684\u9879\u76EE\u7684\u6700\u5F00\u59CB\u5904\u5BFC\u5165",paraId:5,tocIndex:3},{value:"@autostorejs/devtools",paraId:5,tocIndex:3},{value:"\u3002",paraId:5,tocIndex:3},{value:`//main.ts | app.ts | index.ts

import \`@autostorejs/devtools\`

`,paraId:6,tocIndex:3},{value:"\u7136\u540E\u5728\u521B\u5EFA",paraId:7,tocIndex:3},{value:"AutoStore",paraId:7,tocIndex:3},{value:"\u65F6,\u6307\u5B9A",paraId:7,tocIndex:3},{value:"debug=true",paraId:7,tocIndex:3},{value:"\u542F\u7528",paraId:8},{value:"debug=true",paraId:8},{value:"\u540E\uFF0C",paraId:8},{value:"AutoStore",paraId:8},{value:"\u4F1A\u81EA\u52A8\u8FDE\u63A5\u5230",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u3002",paraId:8},{value:"\u6BCF\u4E2A",paraId:8},{value:"Store",paraId:8},{value:"\u5747\u5177\u6709\u4E00\u4E2A",paraId:8},{value:"id",paraId:8},{value:"\uFF0C\u5982\u679C\u6CA1\u6709\u4F20\u5165\u5219\u4F1A\u968F\u673A\u751F\u6210\u3002\u5728\u4F7F\u7528",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A",paraId:8},{value:"store",paraId:8},{value:"\u53D6\u4E2A\u6709\u610F\u4E49\u7684\u540D\u79F0\u3002",paraId:8},{value:"\u73B0\u5728\uFF0C\u4F60\u53EF\u4EE5\u6253\u5F00",paraId:9,tocIndex:4},{value:"Redux DevTools Extension",paraId:9,tocIndex:4},{value:"\u67E5\u770B",paraId:9,tocIndex:4},{value:"AutoStore",paraId:9,tocIndex:4},{value:"\u7684\u72B6\u6001\u4E86\u3002",paraId:9,tocIndex:4},{value:"\u5355\u51FB\u4EE5\u4E0A\u793A\u4F8B\u4E2D\u7684",paraId:10},{value:"Age++",paraId:10},{value:"\u548C",paraId:10},{value:"Change lastName",paraId:10},{value:"\u6309\u94AE\uFF0C\u7136\u540E\u67E5\u770B",paraId:10},{value:"Redux DevTools Extension",paraId:10},{value:"\u4E2D\u7684\u72B6\u6001\u53D8\u5316\u3002",paraId:10},{value:"\u5728\u63A7\u5236\u53F0\u4F60\u8FD8\u53EF\u4EE5\u770B\u5230\u66F4\u591A\u7684\u8C03\u8BD5\u4FE1\u606F\u3002",paraId:10}]},37797:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(6205);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u65E5\u5FD7\u529F\u80FD\uFF0C\u7528\u4E8E\u8BB0\u5F55",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u4E0E\u8BCA\u65AD\u3002",paraId:0,tocIndex:0},{value:"\u5F53\u521B\u5EFA",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u65F6\u8BBE\u7F6E",paraId:1,tocIndex:1},{value:"debug",paraId:1,tocIndex:1},{value:"\u4E3A",paraId:1,tocIndex:1},{value:"true",paraId:1,tocIndex:1},{value:"\u65F6\uFF0C",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u4F1A\u8BB0\u5F55\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6,\u6253\u5370\u5728\u63A7\u5236\u53F0\u4E2D\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`import { createStore } from "@autostorejs/react"

const store = createStore({
  //....
},{
  id:"user",
  debug:true   // \u5F00\u542F\u8C03\u8BD5\u6A21\u5F0F  
})
`,paraId:2,tocIndex:1},{value:"\u63A7\u5236\u53F0\u8F93\u51FA\u6837\u5F0F\u5982\u4E0B:",paraId:3,tocIndex:1},{value:"\u5F53\u5E94\u7528\u5177\u6709\u591A\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A\u6BCF\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u8BBE\u7F6E\u4E0D\u540C\u7684",paraId:4},{value:"id",paraId:4},{value:"\uFF0C\u4EE5\u4FBF\u533A\u5206\u4E0D\u540C\u7684",paraId:4},{value:"AutoStore",paraId:4},{value:"\u3002",paraId:4},{value:"\u5982\u679C\u5BF9\u9ED8\u8BA4\u7684\u65E5\u5FD7\u8F93\u51FA\u4E0D\u6EE1\u610F\u6216\u8005\u60F3\u5C06",paraId:5,tocIndex:2},{value:"AutoStore",paraId:5,tocIndex:2},{value:"\u7684\u65E5\u5FD7\u4FE1\u606F\u8F6C\u53D1\u81F3\u60A8\u81EA\u5DF1\u7684\u65E5\u5FD7\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E",paraId:5,tocIndex:2},{value:"options.log",paraId:5,tocIndex:2},{value:"\u51FD\u6570\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA\u3002",paraId:5,tocIndex:2},{value:"options.log",paraId:6},{value:"\u7684\u7C7B\u578B\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:6},{value:`type LogMessageArgs = string | Error | (()=>string)
type LogLevel = 'log' | 'error' | 'warn'
function log(this:AutoStore<any>,message: LogMessageArgs,level:LogLevel='log'){
`,paraId:7}]},86288:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(42246);const d=[{value:"\u7531\u4E8E\u72B6\u6001\u4E4B\u95F4\u53EF\u80FD\u5B58\u5728\u590D\u6742\u7684\u4F9D\u8D56\u8BA1\u7B97\u5173\u7CFB\uFF0C\u4E3A\u4E86\u66F4\u597D\u7684\u8C03\u8BD5\u72B6\u6001\u7684\u53D8\u5316\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"trace",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u5E2E\u52A9\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u64CD\u4F5C\u3002",paraId:0,tocIndex:0},{value:"trace",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type StateTracker= {
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
\u5BF9`,paraId:8},{value:"d",paraId:8},{value:"\u7684\u8BA1\u7B97\u662F\u5728\u8DDF\u8E2A\u51FD\u6570\u7684\u6267\u884C\u540E\u7684\u4E0B\u4E00\u6B21\u5F02\u6B65\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\u8FDB\u884C\u7684\uFF0C\u800C\u6B64\u65F6\u8DDF\u8E2A\u51FD\u6570\u5DF2\u7ECF\u6267\u884C\u5B8C\u6BD5\u4E86\uFF0C\u6240\u4EE5\u5C31\u65E0\u6CD5\u8DDF\u8E2A\u5230\u5BF9",paraId:8},{value:"d",paraId:8},{value:"\u7684\u64CD\u4F5C\u3002",paraId:8},{value:"\u663E\u7136\uFF0C\u6211\u4EEC\u9884\u671F\u662F\u5728",paraId:9},{value:"state.b = 20",paraId:9},{value:"\u4E4B\u540E\uFF0C\u80FD\u8DDF\u8E2A\u5230\u5176\u6D3E\u751F\u7684\u4E00\u7CFB\u5217\u64CD\u4F5C\u65E5\u5FD7\u7684\u3002",paraId:9},{value:"\u56E0\u6B64\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u9700\u8981\u4E3A",paraId:10},{value:"start()",paraId:10},{value:"\u63D0\u4F9B\u4E00\u4E2A\u9884\u671F\u7684\u7ED3\u675F\u51FD\u6570\uFF0C\u6765\u5224\u65AD\u662F\u5426\u505C\u6B62\u8DDF\u8E2A\uFF0C\u5982\u4E0B\uFF1A",paraId:10},{value:"\u5982\u679C\u56E0\u4E3A\u67D0\u4E9B\u539F\u56E0\uFF0C\u6211\u4EEC\u65E0\u6CD5\u63A5\u6536",paraId:11},{value:"set d.value",paraId:11},{value:"\u7684\u64CD\u4F5C\uFF0C\u53EF\u4EE5\u8C03\u7528",paraId:11},{value:"tracker.stop()",paraId:11},{value:"\u65B9\u6CD5\u6765\u505C\u6B62\u8DDF\u8E2A\u3002",paraId:11},{value:"trace",paraId:12},{value:"\u65B9\u6CD5\u4EC5\u5728\u5F00\u53D1\u65F6\u8FDB\u884C\u8C03\u5EA6\u4F7F\u7528\u3002",paraId:12}]},80870:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(76233);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useBindings",paraId:2,tocIndex:0}]},94226:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(97820);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},90342:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(12357);const d=[{value:"\u5982\u679C\u8981\u5BF9\u6DF1\u5C42\u5D4C\u5957\u7684\u5BF9\u8C61\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useBindings",paraId:0,tocIndex:0},{value:".",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1}]},23249:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(79247);const d=[{value:"useFrom",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u5B8C\u6574\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u4F7F\u5F97\u6536\u96C6\u6570\u636E\u53D8\u5F97\u66F4\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"useFrom",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type UseFormResult={
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

`,paraId:33,tocIndex:9},{value:"Reset",paraId:4}]},13927:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(45889);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useInput",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useInput(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useInput",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
  const { state, $, bind,useInput } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }  
  })

  const bindUser = useInput()

  return <div>    
    <Input label="First Name" {...bindUser.user.firstName}/>      // \u274C \u4E0D\u652F\u6301
    <Input label="last Name" {...bindUser.user.lastName} />       // \u274C \u4E0D\u652F\u6301
    <Input label="Age" {...bindUser.user.age}/>                   // \u274C \u4E0D\u652F\u6301
    <Input type="checkbox" label="VIP" {...bindUser.user.vip} />  // \u274C \u4E0D\u652F\u6301
  </div>
}
`,paraId:6}]},86231:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(9159);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u6B3E\u73B0\u4EE3\u5316\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u5E93\uFF0C\u63D0\u4F9B\u4E86\u5F3A\u5927\u7684\u72B6\u6001\u7BA1\u7406\u80FD\u529B\uFF0C\u652F\u6301",paraId:0,tocIndex:0},{value:"\u54CD\u5E94\u5F0F",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8868\u5355\u53CC\u5411\u7ED1\u5B9A",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:0,tocIndex:0},{value:"\u7B49\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:"\u4E3B\u8981\u7279\u6027\uFF1A",paraId:1,tocIndex:0},{value:"\u54CD\u5E94\u5F0F\u6838\u5FC3",paraId:2,tocIndex:0},{value:"\uFF1A\u57FA\u4E8E",paraId:2,tocIndex:0},{value:"Proxy",paraId:2,tocIndex:0},{value:"\u5B9E\u73B0\uFF0C\u6570\u636E\u53D8\u5316\u81EA\u52A8\u89E6\u53D1\u89C6\u56FE\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u5C31\u5730\u8BA1\u7B97\u5C5E\u6027",paraId:2,tocIndex:0},{value:"\uFF1A\u72EC\u6709\u7684\u5C31\u5730\u8BA1\u7B97\u7279\u6027\uFF0C\u53EF\u4EE5\u5728\u72B6\u6001\u6811\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u58F0\u660E",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\uFF0C\u8BA1\u7B97\u7ED3\u679C\u539F\u5730\u5199\u5165\u3002",paraId:2,tocIndex:0},{value:"\u4F9D\u8D56\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"\uFF1A\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\u7684\u4F9D\u8D56\uFF0C\u53EA\u6709\u4F9D\u8D56\u53D8\u5316\u65F6\u624D\u4F1A\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:2,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u63A7\u5236\u80FD\u529B\uFF0C\u652F\u6301",paraId:2,tocIndex:0},{value:"\u8D85\u65F6\u3001\u91CD\u8BD5\u3001\u53D6\u6D88\u3001\u5012\u8BA1\u65F6\u3001\u8FDB\u5EA6",paraId:2,tocIndex:0},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:2,tocIndex:0},{value:"\u72B6\u6001\u53D8\u66F4\u76D1\u542C",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u76D1\u542C",paraId:2,tocIndex:0},{value:"get/set/delete/insert/update",paraId:2,tocIndex:0},{value:"\u7B49\u72B6\u6001\u5BF9\u8C61\u548C\u6570\u7EC4\u7684\u64CD\u4F5C\u76D1\u542C\u3002",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"signal",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u673A\u5236\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u7EC6\u7C92\u5EA6\u7684\u7EC4\u4EF6\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u4E0E\u8BCA\u65AD",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"chrome",paraId:2,tocIndex:0},{value:"\u7684",paraId:2,tocIndex:0},{value:"Redux DevTools Extension",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u5DE5\u5177\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u72B6\u6001\u53D8\u5316\u3002",paraId:2,tocIndex:0},{value:"\u5D4C\u5957\u72B6\u6001",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301\u4EFB\u610F\u6DF1\u5EA6\u7684\u5D4C\u5957\u72B6\u6001\uFF0C\u65E0\u9700\u62C5\u5FC3\u72B6\u6001\u7BA1\u7406\u7684\u590D\u6742\u6027\u3002",paraId:2,tocIndex:0},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u800C\u7B80\u6D01\u7684\u53CC\u5411\u8868\u5355\u7ED1\u5B9A\uFF0C\u6570\u636E\u6536\u96C6\u7B80\u5355\u5FEB\u901F\u3002",paraId:2,tocIndex:0},{value:"\u5FAA\u73AF\u4F9D\u8D56",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u5E2E\u52A9\u68C0\u6D4B\u5FAA\u73AF\u4F9D\u8D56\u51CF\u5C11\u6545\u969C\u3002",paraId:2,tocIndex:0},{value:"Typescript",paraId:2,tocIndex:0},{value:": \u5B8C\u5168\u652F\u6301Typescript\uFF0C\u63D0\u4F9B\u5B8C\u6574\u7684\u7C7B\u578B\u63A8\u65AD\u548C\u63D0\u793A",paraId:2,tocIndex:0},{value:"\u5355\u5143\u6D4B\u8BD5",paraId:2,tocIndex:0},{value:"\uFF1A\u63D0\u4F9B\u5B8C\u6574\u7684\u5355\u5143\u6D4B\u8BD5\u8986\u76D6\u7387\uFF0C\u4FDD\u8BC1\u4EE3\u7801\u8D28\u91CF\u3002",paraId:2,tocIndex:0}]},26021:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(61077);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u529F\u80FD\u5F3A\u5927\uFF0C\u6613\u4E8E\u4F7F\u7528\u3002\u4EE5\u4E0B\u901A\u8FC7\u6784\u5EFA\u4E00\u4E2A\u7B80\u5355\u4E66\u5E97\u5546\u57CE\u7684\u4F8B\u5B50\u6765\u5C55\u793A\u5982\u4F55\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\uFF0C\u4F53\u9A8C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u6781\u81F4\u4F18\u96C5\u548C\u5F3A\u5927\u7684\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:`npm install  @autostorejs/react
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
`,paraId:32},{value:"\u5C06store\u4E0E\u8868\u5355\u4E4B\u95F4\u8FDB\u884C\u53CC\u5411\u8868\u5355\u975E\u5E38\u7B80\u5355\uFF0C\u53EA\u9700\u8981",paraId:33},{value:"2",paraId:33},{value:"\u6B65\u5373\u53EF\u3002",paraId:33},{value:"Step 1\uFF1A  \u5728\u8868\u5355\u5143\u7D20\u4E0A",paraId:34},{value:"{...newOrderFrom}",paraId:34},{value:"\uFF0C\u5373\u53EF\u5C06\u8868\u5355\u5143\u7D20\u4E0Estore\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:34},{value:"Step 2: \u5728",paraId:34},{value:"input",paraId:34},{value:"\u8F93\u5165\u7EC4\u4EF6\u4E2D\u6307\u5B9A\u72B6\u6001\u7684",paraId:34},{value:"name",paraId:34},{value:"\u5C5E\u6027,\u8BA9",paraId:34},{value:"name",paraId:34},{value:"\u7B49\u4E8E\u72B6\u6001\u8DEF\u5F84\u540D\u79F0\u5373\u53EF\u3002",paraId:34},{value:"\u7136\u540E\uFF0C\u5F53\u8FDB\u884C\u8F93\u5165\u65F6\u5C31\u4F1A\u81EA\u52A8\u540C\u6B65\u5230",paraId:35},{value:"store",paraId:35},{value:"\u4E2D\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:35},{value:"\u5355\u51FB",paraId:36},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:37},{value:"\u67E5\u770B\u66F4\u591A\u5185\u5BB9.",paraId:36},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"createStore",paraId:38,tocIndex:7},{value:"\u6216",paraId:38,tocIndex:7},{value:"useStore",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4EFB\u610F\u5D4C\u5957\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u5BF9\u8C61\u3002",paraId:38,tocIndex:7},{value:"\u5728\u7EC4\u4EF6\u4E2D\u4F7F\u7528",paraId:38,tocIndex:7},{value:"useState",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u8BBF\u95EE\u72B6\u6001\u6570\u636E\uFF0C\u5E76\u5728\u72B6\u6001\u53D8\u5316\u65F6\u81EA\u52A8\u91CD\u65B0\u6E32\u67D3\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"$('\u72B6\u6001\u8DEF\u5F84')",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5C06\u6E32\u67D3\u66F4\u65B0\u9650\u5236\u5728\u8F83\u7EC6\u7684\u8303\u56F4\u5185\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"computed",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u503C\u662F\u6839\u636E\u5176\u4ED6\u72B6\u6001\u8BA1\u7B97\u800C\u6765\uFF0C\u5F53\u4F9D\u8D56\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:38,tocIndex:7},{value:"\u5F02\u6B65\u8BA1\u7B97\u652F\u6301",paraId:38,tocIndex:7},{value:"loading",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"error",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"timeout",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"retry",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"cancel",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"progress",paraId:38,tocIndex:7},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:38,tocIndex:7},{value:"useForm",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u5C06\u8868\u5355\u5143\u7D20\u4E0E",paraId:38,tocIndex:7},{value:"store",paraId:38,tocIndex:7},{value:"\u53CC\u5411\u7ED1\u5B9A\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:38,tocIndex:7}]},27067:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(47315);const d=[]},72997:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(26916);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5171\u5305\u62EC\u4E09\u4E2A\u5305\uFF1A",paraId:0,tocIndex:0},{value:"autostore",paraId:1,tocIndex:0},{value:": \u6838\u5FC3\u5305",paraId:1,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:": \u9762\u5411",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u5F00\u53D1\u8005",paraId:1,tocIndex:0},{value:"@autostorejs/devtools",paraId:1,tocIndex:0},{value:": \u4F7F\u7528",paraId:1,tocIndex:0},{value:"Redux DevTools",paraId:1,tocIndex:0},{value:"\u8C03\u8BD5",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"autostore",paraId:2,tocIndex:1},{value:"\u662F\u6838\u5FC3\u5305\uFF0C\u63D0\u4F9B\u4E86",paraId:2,tocIndex:1},{value:"AutoStore",paraId:2,tocIndex:1},{value:"\u7684\u6838\u5FC3\u529F\u80FD\u3002",paraId:2,tocIndex:1},{value:"\u5982\u679C\u4F60\u662F",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u7B49\u5176\u4ED6\u6846\u67B6\u7684\u5F00\u53D1\u8005\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528",paraId:3,tocIndex:1},{value:"autostore",paraId:3,tocIndex:1},{value:"\u3002",paraId:3,tocIndex:1},{value:"\u8BE5\u5305\u4F7F\u7528",paraId:4,tocIndex:1},{value:"new AutoStore",paraId:4,tocIndex:1},{value:"\u6765\u521B\u5EFA",paraId:4,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5B9E\u4F8B\u3002",paraId:4,tocIndex:1},{value:`npm install  autostore
`,paraId:5},{value:`yarn add autostore
`,paraId:6},{value:`pnpm add autostore
`,paraId:7},{value:"\u5982\u679C\u60A8\u662F",paraId:8},{value:"React",paraId:8},{value:"\u5F00\u53D1\u8005\uFF0C\u53EA\u9700\u8981\u5B89\u88C5",paraId:8},{value:"@autostorejs/react",paraId:8},{value:"\u5373\u53EF\u3002",paraId:8},{value:"@autostorejs/react",paraId:9},{value:"\u5DF2\u7ECF\u96C6\u6210\u4E86",paraId:9},{value:"autostore",paraId:9},{value:"\u5305\u7684\u6240\u6709\u529F\u80FD\uFF0C",paraId:9},{value:"\u4E0D\u9700\u8981\u989D\u5916\u5B89\u88C5",paraId:9},{value:"autostore",paraId:9},{value:"\u3002",paraId:9},{value:`npm install  @autostorejs/react
`,paraId:10},{value:`yarn add @autostorejs/react
`,paraId:11},{value:`pnpm add @autostorejs/react
`,paraId:12},{value:"@autostorejs/devtools",paraId:13,tocIndex:3},{value:"\u662F",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u8C03\u8BD5\u5DE5\u5177\u5305\uFF0C\u57FA\u4E8E",paraId:13,tocIndex:3},{value:"chrome",paraId:13,tocIndex:3},{value:"\u7684",paraId:13,tocIndex:3},{value:"Redux DevTools Extension",paraId:13,tocIndex:3},{value:"\u6765\u8C03\u8BD5",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u72B6\u6001\u3002",paraId:13,tocIndex:3},{value:`npm install  @autostorejs/devtools
`,paraId:14},{value:`yarn add @autostorejs/devtools
`,paraId:15},{value:`pnpm add @autostorejs/devtools
`,paraId:16},{value:"\u76EE\u524D\u8FD8\u6CA1\u6709\u5B9E\u73B0\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5C01\u88C5",paraId:17,tocIndex:4},{value:"autostore",paraId:17,tocIndex:4},{value:"\u5B9E\u73B0",paraId:17,tocIndex:4},{value:"Vue",paraId:17,tocIndex:4},{value:"\u7684\u96C6\u6210\u3002",paraId:17,tocIndex:4},{value:"@autostorejs/react",paraId:18,tocIndex:4},{value:"\u4E5F\u4EC5\u662F",paraId:18,tocIndex:4},{value:"autostore",paraId:18,tocIndex:4},{value:"\u7684\u5C01\u88C5\uFF0C\u4EE3\u7801\u91CF\u5F88\u5C11\uFF0C\u6709\u5174\u8DA3\u7684\u540C\u5B66\u53EF\u4EE5\u5C1D\u8BD5\u4E00\u4E0B\u3002",paraId:18,tocIndex:4}]},42516:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(3694);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u529F\u80FD\u5F3A\u5927\uFF0CAPI\u8BBE\u8BA1\u4F18\u96C5\uFF0C\u6587\u6863\u793A\u4F8B\u4E5F\u5F88\u9F50\u5168\uFF0C\u8BA4\u771F\u9605\u8BFB\u5B98\u7F51\u6587\u6863\u53EF\u4EE5\u89E3\u51B3\u5927\u591A\u6570\u95EE\u9898\u3002",paraId:0,tocIndex:0},{value:"\u2753\u4E5F\u6B22\u8FCE\u5927\u5BB6\u63D0",paraId:1,tocIndex:0},{value:"issue",paraId:1,tocIndex:0},{value:"\u6765\u53CD\u9988\u95EE\u9898\u3002",paraId:1,tocIndex:0},{value:"\u{1F31F}\u5982\u679C\u4F60\u89C9\u5F97",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u597D\u7528\uFF0C\u6B22\u8FCE\u7ED9\u4E2A",paraId:1,tocIndex:0},{value:"star",paraId:1,tocIndex:0},{value:"\u{1F4E6}\u5982\u679C\u4F60\u6709\u597D\u7684\u5EFA\u8BAE\u6216\u8005\u9700\u6C42\uFF0C\u6B22\u8FCE\u63D0",paraId:1,tocIndex:0},{value:"PR",paraId:1,tocIndex:0},{value:"\u4E5F\u6B22\u8FCE\u5927\u5BB6\u52A0\u5165",paraId:2,tocIndex:0},{value:"AutoStore",paraId:2,tocIndex:0},{value:"\u7684\u5FAE\u4FE1\u4EA4\u6D41\u7FA4\uFF0C\u4E00\u8D77\u8BA8\u8BBA\u95EE\u9898\uFF0C\u5206\u4EAB\u7ECF\u9A8C\u3002",paraId:2,tocIndex:0},{value:"\u52A0\u5165\u65B9\u5F0F\uFF1A",paraId:3,tocIndex:0},{value:"\u626B\u63CF\u4E0A\u65B9\u4E8C\u7EF4\u7801\uFF0C\u5907\u6CE8",paraId:4,tocIndex:0},{value:"AutoStore",paraId:4,tocIndex:0},{value:"\u5373\u53EF\u52A0\u5165\u3002",paraId:4,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u6574\u7406\u4E86\u4E00\u4E9B\u5E38\u89C1\u95EE\u9898\uFF0C\u5E0C\u671B\u80FD\u5E2E\u52A9\u4F60\u66F4\u597D\u7684\u4F7F\u7528",paraId:5,tocIndex:0},{value:"AutoStore",paraId:5,tocIndex:0},{value:"\u3002",paraId:5,tocIndex:0}]},679:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(4180);const d=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
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
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},86761:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(75690);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},47864:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(8767);const d=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},57143:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(63518);const d=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
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
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},82919:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(35371);const d=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},89615:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(33358);const d=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    (selector: (state:ComputedState<State>)=>React.ReactNode):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},56126:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(23841);const d=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
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
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},51337:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(31363);const d=[]},32465:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(81897);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF0C\u5C31\u662F\u4E00\u4E2A\u4E8B\u4EF6\u5206\u53D1\u5668\uFF0C\u5C31\u5982\u4F55",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u3001",paraId:6,tocIndex:3},{value:"eventemitter2",paraId:6,tocIndex:3},{value:"\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},80814:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(94451);const d=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},60726:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(61786);const d=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},37445:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(34450);const d=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
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
`,paraId:14,tocIndex:2}]},98041:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(22273);const d=[{value:"\u6839\u636E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684",paraId:0,tocIndex:0},{value:"\u57FA\u672C\u539F\u7406",paraId:1,tocIndex:0},{value:"\uFF0C\u5176\u5185\u7F6E\u4E86\u4E00\u4E2A\u72B6\u6001\u53D8\u5316\u4E8B\u4EF6\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:`\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002
\u901A\u8FC7\u4FA6\u542C\u4E8B\u4EF6\u5C31\u53EF\u4EE5\u4F7F\u7528`,paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:3,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.useWatch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"store",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:3,tocIndex:0}]},32982:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(66663);const d=[{value:"useWatch",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u7528\u6765\u4FA6\u542C",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\uFF0C\u672C\u8D28\u4E0A\u662F\u5BF9",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u7684\u5C01\u88C5\u3002",paraId:0,tocIndex:0},{value:"useWatch",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export interface UseWatchType {
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
`,paraId:5,tocIndex:0}]},65365:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(26826);const d=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6240\u6709\u5728\u72B6\u6001\u4E2D\u76F4\u63A5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u58F0\u660E\u7684\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u5E94",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:"\u4EE5\u4E0B\u662F\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF\u7684\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:2,tocIndex:0},{value:"\u540C",paraId:3,tocIndex:2},{value:"computed",paraId:3,tocIndex:2},{value:"\u4E00\u6837\uFF0C\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E",paraId:3,tocIndex:2},{value:"watch",paraId:3,tocIndex:2},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:3,tocIndex:2},{value:"store.watchObjects.create",paraId:3,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61",paraId:3,tocIndex:2},{value:"create",paraId:4,tocIndex:2},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:2},{value:`  create<Value=any,DependValue=any>(
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

`,paraId:7,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u76D1\u542C\u5BF9\u8C61\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684",paraId:9,tocIndex:2},{value:"associated=false",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u76D1\u542C\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:9,tocIndex:2},{value:"obj.value",paraId:9,tocIndex:2},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:9,tocIndex:2},{value:"\u540C",paraId:10,tocIndex:3},{value:"ComputedObject",paraId:10,tocIndex:3},{value:"\u4E00\u6837\uFF0C",paraId:10,tocIndex:3},{value:"WatchObject",paraId:10,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u624B\u52A8\u6267\u884C\uFF0C\u901A\u8FC7",paraId:10,tocIndex:3},{value:'store.watchObjects.get("<id>").run()',paraId:10,tocIndex:3},{value:"\u6765\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:10,tocIndex:3}]},89167:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(37686);const d=[{value:"@autostorejs/react",paraId:0,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:0,tocIndex:1},{value:"watch",paraId:0,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:0,tocIndex:1},{value:"state",paraId:0,tocIndex:1},{value:"\u4E2D\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5BF9\u8C61,\u7136\u540E\u76D1\u542C\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E\u6240\u5728\u8DEF\u5F84\u3002",paraId:0,tocIndex:1},{value:"watch",paraId:1,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:"\u5728\u72B6\u6001\u4E2D\u7684\u4EFB\u610F\u4F4D\u7F6E\uFF0C\u4F7F\u7528",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u6765\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5668\u5BF9\u8C61\u3002",paraId:2,tocIndex:1},{value:"\u5728",paraId:2,tocIndex:1},{value:"createStore",paraId:2,tocIndex:1},{value:"\u6267\u884C\u540E\uFF0C\u4F1A\u626B\u63CF\u72B6\u6001\u6570\u636E\uFF0C\u5982\u679C\u53D1\u73B0\u4E00\u4E2A\u503C\u662F",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:",\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u76D1\u542C",paraId:2,tocIndex:1},{value:"State",paraId:2,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:1},{value:"\u521B\u5EFA\u7684",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4F1A\u4FDD\u5B58\u5728",paraId:2,tocIndex:1},{value:"Store",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"watchObjects",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4E2D",paraId:2,tocIndex:1},{value:"\u5F53\u6240\u76D1\u542C\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u8C03\u7528",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"getter",paraId:2,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8FD4\u56DE\u7ED3\u679C\u5199\u5165\u5230\u58F0\u660E",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:1},{value:"watch",paraId:3,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:2},{value:`// \u76D1\u542Cfilter\u8FC7\u6EE4\u540E\u7684
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
`,paraId:18,tocIndex:5},{value:"\u8BF4\u660E\uFF1A",paraId:19,tocIndex:5},{value:"\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5B9E\u73B0\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u6765\u8868\u5355\u6574\u4E2A\u8868\u5355\u7684\u6709\u6548\uFF0C\u5F53\u72B6\u6001\u4E2D\u4EFB\u610F\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u7684",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u90FD\u4E3A",paraId:20,tocIndex:5},{value:"false",paraId:20,tocIndex:5},{value:"\u65F6\uFF0C\u5219",paraId:20,tocIndex:5},{value:"validate=false",paraId:20,tocIndex:5},{value:"\uFF0C\u5426\u5219\u4E3A",paraId:20,tocIndex:5},{value:"true",paraId:20,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5},{value:"\u73B0\u5728\u95EE\u9898\u662F",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u53EF\u80FD\u662F\u5728\u4E00\u4E2A\u590D\u6742\u7684\u5D4C\u5957\u5BF9\u8C61\u4E2D\uFF0C\u5E76\u4E14\u53EF\u80FD\u662F\u52A8\u6001\u7684\u3002\u8FD9\u65F6\u5019\uFF0C\u6211\u4EEC\u65E0\u6CD5\u4F7F\u7528",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u6765\u8FDB\u884C\u8BA1\u7B97\uFF0C\u56E0\u4E3A",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\u3002",paraId:20,tocIndex:5},{value:"\u6B64\u65F6\u5C31\u662F\u4F7F\u7528",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\u7684\u65F6\u5019\u4E86\uFF0C\u6211\u4EEC\u58F0\u660E\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u76D1\u542C\u6240\u6709\u8DEF\u5F84\u4E2D\u7684",paraId:20,tocIndex:5},{value:"path[path.length-1]=='validate'",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u7684\u53D8\u5316\u5373\u53EF\u3002",paraId:20,tocIndex:5},{value:"\u5173\u4E8E",paraId:20,tocIndex:5},{value:"WatchObject",paraId:20,tocIndex:5},{value:"\u7684\u4ECB\u7ECD\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:20,tocIndex:5},{value:"\u76D1\u542C\u5BF9\u8C61",paraId:21,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5}]},23989:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(73549);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"watch",paraId:1,tocIndex:1},{value:"\u65B9\u6CD5\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`// \u76D1\u542C\u5168\u90E8
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
`,paraId:26,tocIndex:9},{value:"store.watch",paraId:27},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:27},{value:"State",paraId:27},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u5B9E\u73B0\u4E5F\u662F\u57FA\u4E8E",paraId:27},{value:"watch",paraId:27},{value:"\u65B9\u6CD5\u3002",paraId:27}]},36109:function(te,_,e){e.r(_),e.d(_,{texts:function(){return d}});var K=e(43112);const d=[]}}]);
