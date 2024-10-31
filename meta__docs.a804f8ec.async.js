"use strict";(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[1904],{37047:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(65192),w={}},80710:function(te,b,e){e.r(b),e.d(b,{demos:function(){return h}});var V=e(24325),l=e.n(V),w=e(29008),T=e.n(w),B=e(28633),_=e.n(B),A=e(70958),U=e.n(A),i=e(92379),j=e(63408),y=e(29355),C=e(48611),m=e(20927),h={"docs-exmaples-get-repos-demo-0":{component:i.memo(i.lazy(U()(T()().mark(function v(){var r,n,d,I,u,x,g,S,N,E,M,O,R,D,L;return T()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=F.sent,n=r.computed,d=r.createStore,F.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return I=F.sent,u=I.Input,x=I.Box,g=I.Button,F.next=13,Promise.resolve().then(e.bind(e,20927));case 13:return S=F.sent,N=S.api,E=d({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:n(function(){var Y=U()(T()().mark(function Z(H,Q){var q,X,se;return T()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return q=_()(H,1),X=q[0],se=Q.abortSignal,le.next=4,new Promise(function(me,he){se.addEventListener("abort",function(){he("cancelled")}),N.getProjects(X).then(function(Ae){me(Ae)}).catch(function(Ae){he(Ae)})});case 4:case"end":return le.stop()}},Z)}));return function(Z,H){return Y.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),M=E.state,O=E.bind,R=E.$,D=E.useState,L=E.useAsyncState,F.abrupt("return",{default:function(){var Z=D("user.repo"),H=_()(Z,1),Q=H[0],q=L("user.projects");return i.createElement("div",null,i.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),i.createElement(u,l()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:Q},O("user.repo"))),i.createElement(g,{onClick:function(){return M.user.projects.run()}},"\u91CD\u8BD5"),i.createElement(g,{onClick:function(){return M.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),i.createElement(x,null,i.createElement("table",{className:"projects-list"},i.createElement("thead",null,i.createElement("tr",null,i.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),i.createElement("td",null,i.createElement("b",null,"\u8BF4\u660E")),i.createElement("td",null,i.createElement("b",null,"\u661F")))),i.createElement("tbody",null,q.loading?i.createElement("tr",null,i.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):q.error?i.createElement("tr",null,i.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",q.error)):q.value&&q.value.map(function(X,se){return i.createElement("tr",{key:se},i.createElement("td",null,i.createElement("a",{href:X.url,target:"__blank"},X.name)),i.createElement("td",null,X.description),i.createElement("td",null,X.stars))})))))}});case 17:case"end":return F.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C,"autostore-docs":m},renderOpts:{compile:function(){var v=U()(T()().mark(function n(){var d,I=arguments;return T()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(6484).then(e.bind(e,56484));case 2:return x.abrupt("return",(d=x.sent).default.apply(d,I));case 3:case"end":return x.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}}}},52838:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(88938),w={}},16545:function(te,b,e){e.r(b),e.d(b,{demos:function(){return m}});var V=e(24325),l=e.n(V),w=e(28633),T=e.n(w),B=e(29008),_=e.n(B),A=e(70958),U=e.n(A),i=e(92379),j=e(97085),y=e(29355),C=e(48611),m={"docs-guide-computed-async-demo-0":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M;return _()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=R.sent,r=v.delay,n=v.createStore,d=v.computed,R.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=R.sent,u=I.Input,x=I.ColorBlock,g=n({user:{firstName:"Zhang",lastName:"Fisher",fullName:d(function(){var D=U()(_()().mark(function L(W){return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,r(1e3);case 2:return Y.abrupt("return",W.firstName+" "+W.lastName);case 3:case"end":return Y.stop()}},L)}));return function(L){return D.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),S=g.useAsyncState,N=g.useState,E=g.state,M=g.bind,R.abrupt("return",{default:function(){var L=N("user.firstName"),W=T()(L,1),F=W[0],Y=N("user.lastName"),Z=T()(Y,1),H=Z[0],Q=S("user.fullName");return i.createElement(i.Fragment,null,i.createElement(u,l()({label:"firstName",value:F},M("user.firstName"))),i.createElement(u,l()({label:"lastName",value:H},M("user.lastName"))),i.createElement(x,{name:"FullName",loading:Q.loading},Q.value))}});case 13:case"end":return R.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-1":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g;return _()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=N.sent,r=v.useStore,n=v.computed,d=v.delay,N.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=N.sent,u=I.ColorBlock,x=I.Button,g=I.JsonView,N.abrupt("return",{default:function(){var M=r({firstName:"Zhang",lastName:"Fisher",fullName:n(function(){var W=U()(_()().mark(function F(Y){return _()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,d();case 2:if(!Y.triggerError){H.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return H.abrupt("return",Y.firstName+" "+Y.lastName);case 5:case"end":return H.stop()}},F)}));return function(F){return W.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),O=M.state,R=M.$,D=M.useAsyncState,L=D("fullName");return i.createElement("div",null,i.createElement(u,{name:"FirstName"},R("firstName")),i.createElement(u,{name:"FirstName"},R("lastName")),i.createElement(u,{name:"FullName",loading:L.loading},L.loading?"\u6B63\u5728\u8BA1\u7B97...":L.error?"ERROR:".concat(L.error):L.value),i.createElement("div",null,i.createElement(x,{onClick:function(){O.triggerError=!1,O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName"),i.createElement(x,{onClick:function(){O.triggerError=!1,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName")),i.createElement("div",null,i.createElement(x,{onClick:function(){O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName with Error"),i.createElement(x,{onClick:function(){O.triggerError=!0,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),i.createElement("div",null,"state.fullName=",i.createElement(g,null,JSON.stringify(L))))}});case 13:case"end":return N.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-2":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M,O,R,D,L;return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=F.sent,r=v.delay,n=v.createStore,d=v.computed,I=v.ObserverScopeRef,F.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return u=F.sent,x=u.JsonView,g=u.Button,S=u.Input,N=u.Loading,E=n({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:d(function(){var Y=U()(_()().mark(function Z(H,Q){var q,X,se,oe,le;return _()().wrap(function(he){for(;;)switch(he.prev=he.next){case 0:return q=T()(H,2),X=q[0],se=q[1],oe=Q.getProgressbar,le=oe(),he.abrupt("return",new Promise(function(){var Ae=U()(_()().mark(function Fe(ze){var Le;return _()().wrap(function(Me){for(;;)switch(Me.prev=Me.next){case 0:Le=1;case 1:if(!(Le<=100)){Me.next=8;break}return Me.next=4,r(20);case 4:le.value(Le);case 5:Le++,Me.next=1;break;case 8:le.end(),ze(X*se);case 10:case"end":return Me.stop()}},Fe)}));return function(Fe){return Ae.apply(this,arguments)}}()));case 4:case"end":return he.stop()}},Z)}));return function(Z,H){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:I.Depends})}}),M=E.useState,O=E.state,R=E.$,D=E.bind,L=E.useAsyncState,F.abrupt("return",{default:function(){var Z=M("order.count"),H=T()(Z,1),Q=H[0],q=L("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,O.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,O.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(g,{onClick:function(){return O.order.count--}},"-"),i.createElement(S,l()({value:Q},D("order.count"))),i.createElement(g,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",null,q.loading?i.createElement(N,null):null,q.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(q.progress,"%"):q.error?"ERROR:".concat(q.error):q.value)))),i.createElement("div",null,i.createElement(x,null,JSON.stringify(O.order.total))))}});case 16:case"end":return F.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-3":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M,O,R,D,L,W;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=Y.sent,r=v.createStore,n=v.computed,d=v.ObserverScopeRef,I=v.delay,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return u=Y.sent,x=u.Input,g=u.Button,S=u.Loading,N=u.JsonView,E=u.RichLabel,M=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Z=U()(_()().mark(function H(Q){var q,X,se;return _()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return q=T()(Q,2),X=q[0],se=q[1],le.next=3,I(5e3);case 3:return le.abrupt("return",X*se);case 4:case"end":return le.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:d.Depends})}}),O=M.useState,R=M.state,D=M.$,L=M.bind,W=M.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=T()(H,1),q=Q[0],X=W("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,R.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,R.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(g,{onClick:function(){return R.order.count--}},"-"),i.createElement(x,l()({value:q},L("order.count"))),i.createElement(g,{onClick:function(){return R.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",null,X.loading?i.createElement(S,null):null,X.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(X.timeout,"ms"):X.error?i.createElement(E,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),i.createElement("div",null,i.createElement(N,null,JSON.stringify(R.order.total))))}});case 17:case"end":return Y.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-4":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M,O,R,D,L,W;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=Y.sent,r=v.createStore,n=v.computed,d=v.ObserverScopeRef,I=v.delay,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return u=Y.sent,x=u.Input,g=u.Button,S=u.Loading,N=u.JsonView,E=u.RichLabel,M=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Z=U()(_()().mark(function H(Q){var q,X,se;return _()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return q=T()(Q,2),X=q[0],se=q[1],le.next=3,I(6e3);case 3:return le.abrupt("return",X*se);case 4:case"end":return le.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:d.Depends})}}),O=M.useState,R=M.state,D=M.$,L=M.bind,W=M.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=T()(H,1),q=Q[0],X=W("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,R.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,R.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(g,{onClick:function(){return R.order.count--}},"-"),i.createElement(x,l()({value:q},L("order.count"))),i.createElement(g,{onClick:function(){return R.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?i.createElement(S,null):null,X.loading?i.createElement(E,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(X.timeout,"}\u79D2"),color:"red"}):X.error?i.createElement(E,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),i.createElement("div",null,i.createElement(N,null,JSON.stringify(R.order.total))))}});case 17:case"end":return Y.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-5":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M,O,R,D,L,W;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=Y.sent,r=v.createStore,n=v.computed,d=v.ObserverScopeRef,I=v.delay,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return u=Y.sent,x=u.Input,g=u.Button,S=u.Loading,N=u.JsonView,E=u.RichLabel,M=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Z=U()(_()().mark(function H(Q){var q,X,se;return _()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return q=T()(Q,2),X=q[0],se=q[1],le.next=3,I();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return le.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:d.Depends})}}),O=M.useState,R=M.state,D=M.$,L=M.bind,W=M.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=T()(H,1),q=Q[0],X=W("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,R.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,R.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(g,{onClick:function(){return R.order.count--}},"-"),i.createElement(x,l()({value:q},L("order.count"))),i.createElement(g,{onClick:function(){return R.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?i.createElement(S,null):null,X.loading?i.createElement(E,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):X.error&&i.createElement(E,{text:"\u51FA\u9519: {".concat(X.error,"}"),color:"red"}),X.retry>0&&i.createElement(E,{text:"\u91CD\u8BD5: {".concat(X.retry,"}"),color:"red"}))))),i.createElement("div",null,i.createElement(N,null,JSON.stringify(R.order.total))))}});case 17:case"end":return Y.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-6":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M,O,R,D,L;return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=F.sent,r=v.createStore,n=v.computed,d=v.ObserverScopeRef,F.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=F.sent,u=I.Input,x=I.Button,g=I.Loading,S=I.JsonView,N=I.RichLabel,E=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Y=U()(_()().mark(function Z(H,Q){var q,X,se,oe;return _()().wrap(function(me){for(;;)switch(me.prev=me.next){case 0:return q=T()(H,2),X=q[0],se=q[1],oe=Q.abortSignal,me.abrupt("return",new Promise(function(he,Ae){var Fe=setTimeout(function(){he(X*se)},1e6);oe.addEventListener("abort",function(){clearTimeout(Fe),Ae("cancelled")})}));case 3:case"end":return me.stop()}},Z)}));return function(Z,H){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:d.Depends})}}),M=E.useState,O=E.state,R=E.$,D=E.bind,L=E.useAsyncState,F.abrupt("return",{default:function(){var Z=M("order.count"),H=T()(Z,1),Q=H[0],q=L("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,O.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,O.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(x,{onClick:function(){return O.order.count--}},"-"),i.createElement(u,l()({value:Q},D("order.count"))),i.createElement(x,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},q.loading?i.createElement(g,null):null,q.loading?i.createElement(N,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):q.error&&i.createElement(N,{text:"\u51FA\u9519: {".concat(q.error,"}"),color:"red"}),q.loading&&i.createElement(x,{onClick:function(){return q.cancel()}},"\u53D6\u6D88"))))),i.createElement("div",null,i.createElement(S,null,JSON.stringify(O.order.total))))}});case 16:case"end":return F.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-async-demo-7":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g;return _()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=N.sent,r=v.createStore,N.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return n=N.sent,d=n.ColorBlock,I=n.Button,u=r({bookName:"ZhangFisher",price:100,count:3,total:function(){var E=U()(_()().mark(function O(R){return _()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",R.price*R.count);case 1:case"end":return L.stop()}},O)}));function M(O){return E.apply(this,arguments)}return M}()}),x=u.state,g=u.$,N.abrupt("return",{default:function(){return i.createElement("div",null,i.createElement(d,{name:"\u4E66\u540D"},g("bookName")),i.createElement(d,{name:"\u4EF7\u683C"},g("price")),i.createElement(d,{name:"\u6570\u91CF"},i.createElement(I,{onClick:function(){return x.count--}},"-"),g("count"),i.createElement(I,{onClick:function(){return x.count++}},"+")),i.createElement(d,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},g("total.value",{errorBoundary:function(O){var R=O.error;return i.createElement(i.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",R.message)}})),i.createElement(d,{name:"state.total"},String(x.total)))}});case 11:case"end":return N.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},57770:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),w=e(28633),T=e.n(w),B=e(70958),_=e.n(B),A=e(92379),U=e(91376),i=e(29355),j=e(48611),y={"docs-guide-computed-create-demo-0":{component:A.memo(A.lazy(_()(l()().mark(function C(){var m,h,v,r,n,d,I;return l()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=x.sent,h=m.createStore,v=m.computed,x.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return r=x.sent,n=r.ColorBlock,d=r.Button,I=h({order:{price:100,count:3,total1:function(S){return S.price*S.count},total2:v(function(g){return g.price*g.count})}}),x.abrupt("return",{default:function(){var S=I.useState(),N=T()(S,2),E=N[0],M=N[1];return A.createElement("div",null,A.createElement(n,{name:"Price"},E.order.price),A.createElement(n,{name:"Count"},E.order.count),A.createElement(n,{name:"Total 1"},E.order.total1),A.createElement(n,{name:"Total 2"},E.order.total2),A.createElement(d,{onClick:function(){return M(function(R){return R.order.count++})}},"Count++"))}});case 12:case"end":return x.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}}}},87962:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(27952),w={}},93458:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(87537),A=e(29355),U=e(48611),i={"docs-guide-computed-getter-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d,I,u,x;return l()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=S.sent,C=y.createStore,m=y.computed,h=y.delay,S.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=S.sent,r=v.ColorBlock,n=v.Button,d=C({order:{price:100,count:3,total:m(function(){var N=T()(l()().mark(function E(M){return l()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,h(1e3);case 2:return R.abrupt("return",M.price*M.count);case 3:case"end":return R.stop()}},E)}));return function(E){return N.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),I=d.state,u=d.$,x=d.computedObjects,S.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",x.get("total")),B.createElement("div",null,B.createElement(r,{name:"price"},u("order.price")),B.createElement(r,{name:"count"},u("order.count")),B.createElement(r,{name:"Total"},u(function(E){var M=E.value,O=E.loading;return B.createElement("div",null,O?"\u8BA1\u7B97\u4E2D...":M+1e3)},"order.total")),B.createElement(n,{onClick:function(){return I.order.count++}},"Count++"),B.createElement(n,{onClick:function(){return x.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return S.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},77642:function(te,b,e){e.r(b),e.d(b,{demos:function(){return v}});var V=e(12027),l=e.n(V),w=e(34180),T=e.n(w),B=e(28633),_=e.n(B),A=e(29008),U=e.n(A),i=e(70958),j=e.n(i),y=e(92379),C=e(78116),m=e(29355),h=e(48611),v={"docs-guide-computed-objects-demo-0":{component:y.memo(y.lazy(j()(U()().mark(function r(){var n,d,I,u,x,g,S,N,E;return U()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=O.sent,d=n.createStore,I=n.computed,O.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return u=O.sent,x=u.Divider,g=u.ColorBlock,S=u.Button,N=0,E=d({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(D){return D.firstName+D.lastName+"".concat(++N)},fullName2:I(function(){var R=j()(U()().mark(function D(L){return U()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.abrupt("return",L.firstName+L.lastName+"".concat(++N));case 1:case"end":return F.stop()}},D)}));return function(D){return R.apply(this,arguments)}}(),["./firstName","./lastName"])}}),O.abrupt("return",{default:function(){var D=E.useState(),L=_()(D,1),W=L[0];return y.createElement("div",null,y.createElement(g,{name:"FirstName"},W.user.firstName),y.createElement(g,{name:"lastName"},W.user.lastName),y.createElement(g,{name:"FullName",value:W.user.fullName}),y.createElement(g,{name:"FullName2",value:W.user.fullName2.value}),y.createElement(x,null),y.createElement("div",null,"typeof(store.computedObjects)==",T()(E.computedObjects)),y.createElement("div",null,"store.computedObjects instanceof Map=",String(E.computedObjects instanceof Map)),y.createElement("div",null,"store.computedObjects.size=",E.computedObjects.size),y.createElement("div",null,"store.computedObjects.size=",E.computedObjects.size),y.createElement("div",null,"store.computedObjects.keys()=",l()(E.computedObjects.keys()).join(" , ")),y.createElement(S,{onClick:function(){return E.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),y.createElement(S,{onClick:function(){return E.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),y.createElement(S,{onClick:function(){return E.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return O.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":m,"x-react-components":h},renderOpts:{compile:function(){var r=j()(U()().mark(function d(){var I,u=arguments;return U()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(I=g.sent).default.apply(I,u));case 3:case"end":return g.stop()}},d)}));function n(){return r.apply(this,arguments)}return n}()}}}},65972:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(40471),w={}},35694:function(te,b,e){e.r(b),e.d(b,{demos:function(){return m}});var V=e(24325),l=e.n(V),w=e(28633),T=e.n(w),B=e(29008),_=e.n(B),A=e(70958),U=e.n(A),i=e(92379),j=e(71413),y=e(29355),C=e(48611),m={"docs-guide-computed-run-demo-0":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E;return _()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.createStore,n=v.computed,d=v.delay,O.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=O.sent,u=I.Divider,x=I.ColorBlock,g=I.Button,S=0,N={book:{name:"Zhang",count:4,price:100,total1:n(function(){var R=U()(_()().mark(function D(L){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,d();case 2:return F.abrupt("return",L.count*L.price);case 3:case"end":return F.stop()}},D)}));return function(D){return R.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:n(function(){var R=U()(_()().mark(function D(L){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,d();case 2:return F.abrupt("return",L.count*L.price);case 3:case"end":return F.stop()}},D)}));return function(D){return R.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:n(function(){var R=U()(_()().mark(function D(L){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,d();case 2:return F.abrupt("return",L.count*L.price);case 3:case"end":return F.stop()}},D)}));return function(D){return R.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:n(function(){var R=U()(_()().mark(function D(L){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,d();case 2:return F.abrupt("return",L.price/L.count);case 3:case"end":return F.stop()}},D)}));return function(D){return R.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:n(function(){var R=U()(_()().mark(function D(L){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,d();case 2:return F.abrupt("return",L.price/L.count);case 3:case"end":return F.stop()}},D)}));return function(D){return R.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:n(function(){var R=U()(_()().mark(function D(L){return _()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,d();case 2:return F.abrupt("return",L.price/L.count);case 3:case"end":return F.stop()}},D)}));return function(D){return R.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},E=r(N),O.abrupt("return",{default:function(){var D=E.useState(),L=T()(D,1),W=L[0];return i.createElement("div",null,i.createElement(u,{title:"Total Group"}),i.createElement(x,{name:"Total1",loading:W.book.total1.loading},W.book.total1.loading?"\u8BA1\u7B97\u4E2D...":W.book.total1.value),i.createElement(x,{name:"Total2",loading:W.book.total2.loading},W.book.total2.loading?"\u8BA1\u7B97\u4E2D...":W.book.total2.value),i.createElement(x,{name:"Total3",loading:W.book.total3.loading},W.book.total3.loading?"\u8BA1\u7B97\u4E2D...":W.book.total3.value),i.createElement(g,{onClick:function(){return E.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),i.createElement(u,{title:"Average Group"}),i.createElement(x,{name:"Average1",loading:W.book.average1.loading}," ",W.book.average1.loading?"\u8BA1\u7B97\u4E2D...":W.book.average1.value),i.createElement(x,{name:"Average2",loading:W.book.average2.loading}," ",W.book.average2.loading?"\u8BA1\u7B97\u4E2D...":W.book.average2.value),i.createElement(x,{name:"Average3",loading:W.book.average3.loading}," ",W.book.average3.loading?"\u8BA1\u7B97\u4E2D...":W.book.average3.value),i.createElement(g,{onClick:function(){return E.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-computed-run-demo-1":{component:i.memo(i.lazy(U()(_()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M,O,R,D;return _()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=W.sent,r=v.createStore,n=v.computed,d=v.delay,W.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=W.sent,u=I.Divider,x=I.ColorBlock,g=I.Button,S=I.Input,N=0,E={book:{name:"Zhang",count:4,price:100,total1:n(function(){var F=U()(_()().mark(function Y(Z){return _()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,d();case 2:return Q.abrupt("return",Z.count*Z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return F.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:n(function(){var F=U()(_()().mark(function Y(Z){return _()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,d();case 2:return Q.abrupt("return",Z.count*Z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return F.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:n(function(){var F=U()(_()().mark(function Y(Z){return _()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,d();case 2:return Q.abrupt("return",Z.count*Z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return F.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},M=r(E),O=M.useState,R=M.computedObjects,D=M.bind,W.abrupt("return",{default:function(){var Y=O(),Z=T()(Y,1),H=Z[0];return i.createElement("div",null,i.createElement(x,{name:"BookName"},H.book.name),i.createElement(x,{name:"count"},i.createElement("div",{style:{display:"flex",alignItems:"center"}},i.createElement(g,{onClick:function(){return H.book.count--}},"-"),i.createElement(S,l()({value:H.book.count},D("book.count"))),i.createElement(g,{onClick:function(){return H.book.count++}},"+"))),i.createElement(x,{name:"price"}," ",i.createElement(S,l()({value:H.book.price},D("book.price")))),i.createElement(u,{title:"Total Group"}),i.createElement("table",{className:"table table-bordered"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,"Total1 ="),i.createElement("td",null,H.book.total1.loading?"\u8BA1\u7B97\u4E2D...":H.book.total1.value),i.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),i.createElement("tr",null,i.createElement("td",null,"Total2 ="),i.createElement("td",null,H.book.total2.loading?"\u8BA1\u7B97\u4E2D...":H.book.total2.value),i.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",i.createElement("input",{type:"checkbox",checked:R.get("book/total2")}),")")),i.createElement("tr",null,i.createElement("td",null,"Total3 ="),i.createElement("td",null,H.book.total3.loading?"\u8BA1\u7B97\u4E2D...":H.book.total3.value),i.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),i.createElement(g,{onClick:function(){return R.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return W.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(_()().mark(function r(){var n,d=arguments;return _()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},68177:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(56424),A=e(29355),U=e(48611),i={"docs-guide-computed-scope-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.ObserverScopeRef,m=y.useStore,n.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return h=n.sent,v=h.ColorBlock,n.abrupt("return",{default:function(){var I=m({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}},{scope:function(){return C.Current}}),u=I.state;return B.createElement("div",null,B.createElement(v,{name:"FullName"},u.user.fullName))}});case 10:case"end":return n.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-1":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,m=y.ObserverScopeRef,n.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return h=n.sent,v=h.ColorBlock,n.abrupt("return",{default:function(){var I=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.user.firstName+g.user.lastName}}},{scope:m.Root}),u=I.state;return B.createElement("div",null,B.createElement(v,{name:"FullName"},u.user.fullName))}});case 10:case"end":return n.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-2":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n;return l()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=I.sent,C=y.createStore,m=y.ObserverScopeRef,I.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return h=I.sent,v=h.ColorBlock,r=C({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(x){return x.user.firstName+x.user.lastName}}}},{scope:m.Parent}),n=r.state,I.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(v,{name:"FullName"},n.parent.user.fullName))}});case 11:case"end":return I.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-3":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=d.sent,C=y.createStore,d.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=d.sent,h=m.ColorBlock,v=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(u){return u},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),r=v.state,d.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(h,{name:"FullName"},r.user.fullName))}});case 10:case"end":return d.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-4":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=d.sent,C=y.createStore,d.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=d.sent,h=m.ColorBlock,v=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(u){return u},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),r=v.state,d.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(h,{name:"FullName"},r.user.fullName))}});case 10:case"end":return d.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-computed-scope-demo-5":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.createStore,m=y.computed,h=y.ObserverScopeRef,u.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=u.sent,r=v.ColorBlock,n=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:m(function(){var x=T()(l()().mark(function g(S){return l()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.abrupt("return",S[0]+S[1]);case 1:case"end":return E.stop()}},g)}));return function(g){return x.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:h.Depends})}}),d=n.state,u.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(r,{name:"FullName"},d.user.fullName.value))}});case 12:case"end":return u.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},21170:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),w=e(28633),T=e.n(w),B=e(70958),_=e.n(B),A=e(92379),U=e(30901),i=e(29355),j=e(48611),y={"docs-guide-computed-sync-demo-0":{component:A.memo(A.lazy(_()(l()().mark(function C(){var m,h,v,r,n,d;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=u.sent,h=m.createStore,u.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=u.sent,r=v.ColorBlock,n=v.Button,d=h({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}}),u.abrupt("return",{default:function(){var g=d.useState(),S=T()(g,2),N=S[0],E=S[1];return A.createElement("div",null,A.createElement(r,{name:"First Name"},N.user.firstName),A.createElement(r,{name:"Last Name"},N.user.lastName),A.createElement(r,{name:"Full Name"},N.user.fullName),A.createElement(n,{onClick:function(){return E(function(O){return O.user.firstName="\u2764\uFE0F"+O.user.firstName})}},"Change First Name"),A.createElement(n,{onClick:function(){return E(function(O){return O.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return u.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}},"docs-guide-computed-sync-demo-1":{component:A.memo(A.lazy(_()(l()().mark(function C(){var m,h,v,r,n;return l()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=I.sent,h=m.createStore,I.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=I.sent,r=v.Button,n=h({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(x){return x.price*x.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(x){return x.price*x.count}}],total:function(x){return x.books.reduce(function(g,S){return g+S.total},0)}}),I.abrupt("return",{default:function(){var x=n.useState(),g=T()(x,2),S=g[0],N=g[1];return A.createElement("table",{className:"table table-bordered table-hover"},A.createElement("thead",null,A.createElement("tr",null,A.createElement("th",null,"\u4E66\u540D"),A.createElement("th",null,"\u4F5C\u8005"),A.createElement("th",null,"\u5355\u4EF7"),A.createElement("th",null,"\u6570\u91CF"),A.createElement("th",null,"\u5C0F\u8BA1"))),A.createElement("tbody",null,S.books.map(function(E,M){return A.createElement("tr",{key:M},A.createElement("td",null,E.name),A.createElement("td",null,E.author),A.createElement("td",null,E.price),A.createElement("td",null,A.createElement(r,{onClick:function(){return n.state.books[M].count--}},"-"),E.count,A.createElement(r,{onClick:function(){return n.state.books[M].count++}},"+")),A.createElement("td",null,E.total))}),A.createElement("tr",null,A.createElement("td",{colSpan:4},"\u603B\u8BA1"),A.createElement("td",null,S.total))))}});case 10:case"end":return I.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}}}},5723:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return m}});var l=e(29008),w=e.n(l),T=e(28633),B=e.n(T),_=e(70958),A=e.n(_),U=e(92379),i=e(20410),j=e(29355),y=e(48611),C=e(53225),m={"docs-guide-debug-circular-dependency-demo-0":{component:U.memo(U.lazy(A()(w()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E;return w()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.useStore,n=v.computed,O.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return d=O.sent,I=d.ColorBlock,u=d.Button,x=d.JsonView,O.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return g=O.sent,S=g.useState,O.next=17,Promise.resolve().then(e.bind(e,53225));case 17:return N=O.sent,E=N.installCycleDetectExtend,E({onDetected:function(D){return console.error("\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56:",D),"disable"}}),O.abrupt("return",{default:function(){var D=S(null),L=B()(D,2),W=L[0],F=L[1],Y=r({x:1,a:n(function(){var q=A()(w()().mark(function X(se){return w()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return le.abrupt("return",se.b.value+se.x);case 1:case"end":return le.stop()}},X)}));return function(X){return q.apply(this,arguments)}}(),["b","x"]),b:n(function(){var q=A()(w()().mark(function X(se){return w()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return le.abrupt("return",se.a.value+ +se.x);case 1:case"end":return le.stop()}},X)}));return function(X){return q.apply(this,arguments)}}(),["a","x"])},{debug:!0}),Z=Y.useState(),H=B()(Z,1),Q=H[0];return U.createElement("div",null,U.createElement(I,{name:"x"},U.createElement(u,{onClick:function(){return Y.state.x--}},"-"),Y.$("x"),U.createElement(u,{onClick:function(){return Y.state.x++}},"+")),U.createElement("div",{style:{color:"red"}},W),U.createElement(x,{data:Q}))}});case 21:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-debug-circular-dependency-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"@autostorejs/devtools":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7531\u4E8Ea,b\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u5185\u90E8\u4F1A\u5FFD\u7565a,b\u7684\u8BA1\u7B97\uFF0C\u5BFC\u81F4a,b\u7684\u503C\u4E3A\u65E0\u6CD5\u8BA1\u7B97\u3002",title:"\u6253\u5F00\u63A7\u5236\u53F0\u89C2\u5BDF\u4FE1\u606F"},context:{"@autostorejs/react":j,"x-react-components":y,react:V||(V=e.t(U,2)),"@autostorejs/devtools":C},renderOpts:{compile:function(){var h=A()(w()().mark(function r(){var n,d=arguments;return w()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},13219:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(28633),l=e.n(V),w=e(29008),T=e.n(w),B=e(70958),_=e.n(B),A=e(92379),U=e(44465),i=e(29355),j=e(48611),y={"docs-guide-debug-dev-tools-demo-0":{component:A.memo(A.lazy(_()(T()().mark(function C(){var m,h,v,r,n,d,I,u,x,g;return T()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=N.sent,h=m.createStore,v=m.computed,N.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return r=N.sent,n=r.Button,d=r.ColorBlock,I=h({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(M){return M.firstName+M.lastName},salary:v(function(){var E=_()(T()().mark(function M(O){return T()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.abrupt("return",O.age*10);case 1:case"end":return D.stop()}},M)}));return function(M){return E.apply(this,arguments)}}(),["age"])},{debug:!0,id:"user"}),u=I.state,x=I.useState,g=I.$,N.abrupt("return",{default:function(){var M=x("age"),O=l()(M,2),R=O[0],D=O[1],L=x("salary"),W=l()(L,2),F=W[0],Y=W[1],Z=x(function(X){return X.lastName},function(X,se){return se.lastName=X}),H=l()(Z,2),Q=H[0],q=H[1];return A.createElement("div",null,A.createElement(d,null,"Fullname :",u.firstName," ",Q),A.createElement(d,null,"Age :",R),A.createElement(d,null,"Salary: ",g("salary")),A.createElement(n,{onClick:function(){return D(R+1)}},"Age++"),A.createElement(n,{onClick:function(){return q(Q+".")}},"Change lastName"))}});case 12:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-debug-dev-tools-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(T()().mark(function h(){var v,r=arguments;return T()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}}}},30395:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return j}});var l=e(29008),w=e.n(l),T=e(70958),B=e.n(T),_=e(92379),A=e(67040),U=e(29355),i=e(48611),j={"docs-guide-debug-log-demo-0":{component:_.memo(_.lazy(B()(w()().mark(function y(){var C,m,h,v,r,n,d,I,u,x;return w()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=S.sent,m=C.useStore,h=C.computed,S.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return v=S.sent,r=v.Box,n=v.Button,d=v.ColorBlock,S.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return I=S.sent,u=I.useRef,x=function(E){return E.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},S.abrupt("return",{default:function(){var E=u(),M=m({price:100,count:2,total:h(function(D){return D.price*D.count})},{debug:!0,log:function(L){var W=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"info",F=typeof L=="function"?L():L instanceof Error?L.message:L;E.current&&E.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        <b>[`.concat(W,"]</b> - ").concat(x(F),"</p>"))}}),O=M.state,R=M.$;return _.createElement("div",null,_.createElement(d,{name:"Price"},R("price")),_.createElement(d,{name:"Count"},_.createElement(n,{onClick:function(){return O.count--}},"-"),R("count"),_.createElement(n,{onClick:function(){return O.count++}},"+")),_.createElement(d,{name:"Total"},R("total")),_.createElement(n,{onClick:function(){return E.current.innerHTML=""}},"Clear"),_.createElement(r,{ref:E}))}});case 17:case"end":return S.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-log-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u8C03\u8282count\u503C\uFF0C\u67E5\u770B\u65E5\u5FD7\u8F93\u51FA",title:"\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA"},context:{"@autostorejs/react":U,"x-react-components":i,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(w()().mark(function m(){var h,v=arguments;return w()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},m)}));function C(){return y.apply(this,arguments)}return C}()}}}},1982:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return j}});var l=e(29008),w=e.n(l),T=e(70958),B=e.n(T),_=e(92379),A=e(67039),U=e(29355),i=e(48611),j={"docs-guide-debug-trace-demo-0":{component:_.memo(_.lazy(B()(w()().mark(function y(){var C,m,h,v,r,n,d,I,u,x;return w()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=S.sent,m=C.createStore,S.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return h=S.sent,v=h.Box,S.next=10,Promise.resolve().then(e.t.bind(e,92379,19));case 10:return r=S.sent,n=r.useRef,d=r.useEffect,I=m({a:1,b:2,c:function(E){return E.a+E.b}}),u=I.state,x=I.trace,S.abrupt("return",{default:function(){var E=n();return d(function(){var M=x(function(){u.a=10,u.b=20});M.start().then(function(O){O.forEach(function(R){E.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(R.type," ").concat(R.path.join("."),"</p>"))})})},[]),_.createElement(v,{ref:E})}});case 15:case"end":return S.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":U,"x-react-components":i,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(w()().mark(function m(){var h,v=arguments;return w()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},m)}));function C(){return y.apply(this,arguments)}return C}()}},"docs-guide-debug-trace-demo-1":{component:_.memo(_.lazy(B()(w()().mark(function y(){var C,m,h,v,r,n,d,I,u,x,g,S;return w()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=E.sent,m=C.createStore,h=C.computed,v=C.delay,E.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return r=E.sent,n=r.Box,E.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return d=E.sent,I=d.useRef,u=d.useEffect,x=m({a:1,b:2,c:h(function(){var M=B()(w()().mark(function O(R){return w()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",R.a+R.b);case 1:case"end":return L.stop()}},O)}));return function(O){return M.apply(this,arguments)}}(),["a","b"])}),g=x.state,S=x.trace,E.abrupt("return",{default:function(){var O=I();return u(function(){var R=S(B()(w()().mark(function D(){return w()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return g.a=10,W.next=3,v();case 3:g.b=20;case 4:case"end":return W.stop()}},D)})));R.start().then(function(D){D.forEach(function(L){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(L.type," ").concat(L.path.join("."),"</p>"))})})},[]),_.createElement(n,{ref:O})}});case 17:case"end":return E.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"c\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4F9D\u8D56\u4E8Ea\u548Cb\uFF0C\u5F53a\u6216b\u53D8\u5316\u65F6\uFF0Cc\u4F1A\u91CD\u65B0\u8BA1\u7B97",title:"\u5F02\u6B65\u8DDF\u8E2A"},context:{"@autostorejs/react":U,"x-react-components":i,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(w()().mark(function m(){var h,v=arguments;return w()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},m)}));function C(){return y.apply(this,arguments)}return C}()}},"docs-guide-debug-trace-demo-2":{component:_.memo(_.lazy(B()(w()().mark(function y(){var C,m,h,v,r,n,d,I,u,x,g,S;return w()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=E.sent,m=C.createStore,h=C.computed,v=C.delay,E.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return r=E.sent,n=r.Box,E.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return d=E.sent,I=d.useRef,u=d.useEffect,x=m({a:1,b:2,c:h(function(){var M=B()(w()().mark(function O(R){return w()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",R.a+R.b);case 1:case"end":return L.stop()}},O)}));return function(O){return M.apply(this,arguments)}}(),["a","b"]),d:h(function(){var M=B()(w()().mark(function O(R){return w()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",R.c.value+1);case 1:case"end":return L.stop()}},O)}));return function(O){return M.apply(this,arguments)}}(),["c"])}),g=x.state,S=x.trace,E.abrupt("return",{default:function(){var O=I();return u(function(){var R=S(B()(w()().mark(function D(){return w()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return g.a=10,W.next=3,v();case 3:g.b=20;case 4:case"end":return W.stop()}},D)})));R.start().then(function(D){D.forEach(function(L){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(L.type," ").concat(L.path.join("."),"</p>"))})})},[]),_.createElement(n,{ref:O})}});case 17:case"end":return E.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":U,"x-react-components":i,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(w()().mark(function m(){var h,v=arguments;return w()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},m)}));function C(){return y.apply(this,arguments)}return C}()}},"docs-guide-debug-trace-demo-3":{component:_.memo(_.lazy(B()(w()().mark(function y(){var C,m,h,v,r,n,d,I,u,x,g,S;return w()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return C=E.sent,m=C.createStore,h=C.computed,v=C.delay,E.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return r=E.sent,n=r.Box,E.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return d=E.sent,I=d.useRef,u=d.useEffect,x=m({a:1,b:2,c:h(function(){var M=B()(w()().mark(function O(R){return w()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",R.a+R.b);case 1:case"end":return L.stop()}},O)}));return function(O){return M.apply(this,arguments)}}(),["a","b"]),d:h(function(){var M=B()(w()().mark(function O(R){return w()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",R.c.value+1);case 1:case"end":return L.stop()}},O)}));return function(O){return M.apply(this,arguments)}}(),["c"])}),g=x.state,S=x.trace,E.abrupt("return",{default:function(){var O=I();return u(function(){var R=S(B()(w()().mark(function D(){return w()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return g.a=10,W.next=3,v();case 3:g.b=20;case 4:case"end":return W.stop()}},D)})));R.start(function(D){if(D.type=="set"&&D.path.length===2&&D.path[0]==="d"&&D.path[1]==="value")return!0}).then(function(D){D.forEach(function(L){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(L.type," ").concat(L.path.join("."),"</p>"))})})},[]),_.createElement(n,{ref:O})}});case 17:case"end":return E.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":U,"x-react-components":i,react:V||(V=e.t(_,2))},renderOpts:{compile:function(){var y=B()(w()().mark(function m(){var h,v=arguments;return w()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(6484).then(e.bind(e,56484));case 2:return n.abrupt("return",(h=n.sent).default.apply(h,v));case 3:case"end":return n.stop()}},m)}));function C(){return y.apply(this,arguments)}return C}()}}}},62518:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(16142),w={}},79489:function(te,b,e){e.r(b),e.d(b,{demos:function(){return m}});var V=e(29008),l=e.n(V),w=e(24325),T=e.n(w),B=e(28633),_=e.n(B),A=e(70958),U=e.n(A),i=e(92379),j=e(69580),y=e(29355),C=e(48611),m={"docs-guide-form-bind-demo-0":{component:i.memo(i.lazy(U()(l()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E;return l()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.createStore,O.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return n=O.sent,d=n.ColorBlock,I=n.Button,u=n.Input,x=r({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(D){return D.firstName+D.lastName}}}),g=x.state,S=x.$,N=x.bind,E=x.useState,O.abrupt("return",{default:function(){var D=E("user.firstName"),L=_()(D,2),W=L[0],F=L[1],Y=E("user.lastName"),Z=_()(Y,2),H=Z[0],Q=Z[1],q=E("user.vip"),X=_()(q,2),se=X[0],oe=X[1];return i.createElement("div",null,i.createElement(u,T()(T()({label:"First Name"},N("user.firstName")),{},{value:W})),i.createElement(u,T()(T()({label:"last Name"},N("user.lastName")),{},{value:H})),i.createElement(u,T()(T()({type:"checkbox",label:"VIP"},N("user.vip")),{},{value:se})),i.createElement(d,{name:"First Name"},S("user.firstName")),i.createElement(d,{name:"Last Name"},S("user.lastName")),i.createElement(d,{name:"Full Name"},S("user.fullName")),i.createElement(d,{name:"VIP"},S("user.vip")),i.createElement(I,{onClick:function(){F("Zhang"),Q("Fisher")}},"Reset"))}});case 12:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(l()().mark(function r(){var n,d=arguments;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},31183:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),w=e(24325),T=e.n(w),B=e(70958),_=e.n(B),A=e(92379),U=e(32026),i=e(29355),j=e(48611),y={"docs-guide-form-use-bindings-demo-0":{component:A.memo(A.lazy(_()(l()().mark(function C(){var m,h,v,r,n,d,I;return l()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=x.sent,h=m.useStore,x.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=x.sent,r=v.Layout,n=v.ColorBlock,d=v.Button,I=v.Input,x.abrupt("return",{default:function(){var S=h({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),N=S.state,E=S.$,M=S.useBindings,O=M();return A.createElement(r,null,A.createElement("div",null,A.createElement(I,T()({label:"First Name"},O.user.firstName)),A.createElement(I,T()({label:"last Name"},O.user.lastName)),A.createElement(I,T()({label:"Age"},O.user.age)),A.createElement(I,T()({type:"checkbox",label:"VIP"},O.user.vip)),A.createElement(d,{onClick:function(){N.user.firstName="Zhang",N.user.lastName="Fisher",N.user.age=18,N.user.vip=!1}},"Reset")),A.createElement("div",null,A.createElement(n,{name:"First Name"},E("user.firstName")),A.createElement(n,{name:"Last Name"},E("user.lastName")),A.createElement(n,{name:"Age"},E("user.age")),A.createElement(n,{name:"VIP"},E("user.vip"))))}});case 12:case"end":return x.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}}}},19025:function(te,b,e){e.r(b),e.d(b,{demos:function(){return m}});var V=e(28633),l=e.n(V),w=e(29008),T=e.n(w),B=e(24325),_=e.n(B),A=e(70958),U=e.n(A),i=e(92379),j=e(25061),y=e(29355),C=e(48611),m={"docs-guide-form-use-field-demo-0":{component:i.memo(i.lazy(U()(T()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M;return T()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=R.sent,r=v.createStore,R.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return n=R.sent,d=n.ColorBlock,I=n.Button,u=n.Input,x=r({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),g=x.state,S=x.$,N=x.bind,E=x.useState,M=x.useField,R.abrupt("return",{default:function(){var L=M("user.firstName"),W=M("user.lastName"),F=M("user.vip"),Y=M("user.job");return i.createElement("div",null,i.createElement(u,_()({label:"First Name"},L)),i.createElement(u,_()({label:"last Name"},W)),i.createElement(u,_()({type:"checkbox",label:"VIP"},F)),i.createElement(d,{name:"Job"},i.createElement("select",_()({id:"job"},Y),i.createElement("option",{value:"1"},"Engineer"),i.createElement("option",{value:"2"},"Doctor"),i.createElement("option",{value:"3"},"Teacher"))),i.createElement(d,{name:"First Name"},S("user.firstName")),i.createElement(d,{name:"Last Name"},S("user.lastName")),i.createElement(d,{name:"VIP"},S("user.vip")),i.createElement(d,{name:"Job"},S("user.job")),i.createElement(I,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return R.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useField"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(T()().mark(function r(){var n,d=arguments;return T()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-form-use-field-demo-1":{component:i.memo(i.lazy(U()(T()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E,M;return T()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=R.sent,r=v.createStore,R.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return n=R.sent,d=n.ColorBlock,I=n.Button,u=n.Input,x=r({user:{firstName:"Zhang",lastName:"Fisher"}}),g=x.state,S=x.$,N=x.bind,E=x.useState,M=x.useField,R.abrupt("return",{default:function(){var L=M(function(W){return W.user.firstName+" "+W.user.lastName},function(W,F){var Y=W.split(/\s+/),Z=l()(Y,2),H=Z[0],Q=Z[1];F.user.firstName=H,F.user.lastName=Q});return i.createElement("div",null,i.createElement(u,_()({label:"FullName"},L)),i.createElement(d,{name:"First Name"},S("user.firstName")),i.createElement(d,{name:"Last Name"},S("user.lastName")),i.createElement(I,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return R.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(T()().mark(function r(){var n,d=arguments;return T()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-form-use-field-demo-2":{component:i.memo(i.lazy(U()(T()().mark(function h(){var v,r,n,d,I,u,x,g,S,N,E;return T()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=O.sent,r=v.createStore,O.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return n=O.sent,d=n.ColorBlock,I=n.Button,u=n.Input,x=r({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),g=x.state,S=x.$,N=x.bind,E=x.useField,O.abrupt("return",{default:function(){var D=E("user");return i.createElement("div",null,i.createElement(u,_()({label:"First Name"},D.firstName)),i.createElement(u,_()({label:"last Name"},D.lastName)),i.createElement(u,_()({label:"Age"},D.age)),i.createElement(u,_()({type:"checkbox",label:"VIP"},D.vip)),i.createElement(d,{name:"First Name"},S("user.firstName")),i.createElement(d,{name:"Last Name"},S("user.lastName")),i.createElement(d,{name:"Age"},S("user.age")),i.createElement(d,{name:"VIP"},S("user.vip")),i.createElement(I,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher",g.user.age=18,g.user.vip=!1}},"Reset"))}});case 12:case"end":return O.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(T()().mark(function r(){var n,d=arguments;return T()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}},"docs-guide-form-use-field-demo-3":{component:i.memo(i.lazy(U()(T()().mark(function h(){var v,r,n,d,I,u;return T()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return v=g.sent,r=v.useStore,g.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return n=g.sent,d=n.ColorBlock,I=n.Button,u=n.Input,g.abrupt("return",{default:function(){var N=r({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),E=N.state,M=N.$,O=N.bind,R=N.useField,D=R();return i.createElement("div",null,i.createElement(u,_()({label:"First Name"},D.firstName)),i.createElement(u,_()({label:"last Name"},D.lastName)),i.createElement(u,_()({label:"Age"},D.age)),i.createElement(u,_()({type:"checkbox",label:"VIP"},D.vip)),i.createElement(d,{name:"First Name"},M("firstName")),i.createElement(d,{name:"Last Name"},M("lastName")),i.createElement(d,{name:"Age"},M("age")),i.createElement(d,{name:"VIP"},M("vip")),i.createElement(I,{onClick:function(){E.firstName="Zhang",E.lastName="Fisher",E.age=18,E.vip=!1}},"Reset"))}});case 11:case"end":return g.stop()}},h)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":y,"x-react-components":C},renderOpts:{compile:function(){var h=U()(T()().mark(function r(){var n,d=arguments;return T()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(6484).then(e.bind(e,56484));case 2:return u.abrupt("return",(n=u.sent).default.apply(n,d));case 3:case"end":return u.stop()}},r)}));function v(){return h.apply(this,arguments)}return v}()}}}},23293:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),w=e(28633),T=e.n(w),B=e(70958),_=e.n(B),A=e(92379),U=e(70803),i=e(29355),j=e(48611),y={"docs-guide-form-use-form-demo-0":{component:A.memo(A.lazy(_()(l()().mark(function C(){var m,h,v,r,n,d,I,u,x,g;return l()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=N.sent,h=m.useStore,N.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=N.sent,r=v.TextArea,n=v.Layout,d=v.Button,I=v.Input,u=v.CheckBox,x=v.JsonView,g=v.Select,N.abrupt("return",{default:function(){var M=h({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),O=M.state,R=M.$,D=M.useForm,L=M.useState,W=L(),F=T()(W,1),Y=F[0],Z=D(),H=Z.Form;return A.createElement(n,null,A.createElement("div",null,A.createElement(H,null,A.createElement(I,{name:"user.firstName",label:"First Name"}),A.createElement(I,{name:"user.lastName",label:"lastName"}),A.createElement(I,{name:"user.age",label:"Age"}),A.createElement(g,{name:"user.job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),A.createElement(r,{name:"user.resume",label:"Resume"}),A.createElement(u,{name:"user.vip",label:"VIP"})),A.createElement(d,{onClick:function(){O.user.firstName="Zhang",O.user.lastName="Fisher",O.user.age=18,O.user.vip=!1}},"Reset")),A.createElement("div",null,A.createElement(x,{data:Y})))}});case 15:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}},"docs-guide-form-use-form-demo-1":{component:A.memo(A.lazy(_()(l()().mark(function C(){var m,h,v,r,n,d,I,u,x,g,S;return l()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=E.sent,h=m.useStore,E.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=E.sent,r=v.TextArea,n=v.Layout,d=v.ColorBlock,I=v.Button,u=v.Input,x=v.CheckBox,g=v.JsonView,S=v.Select,E.abrupt("return",{default:function(){var O=h({user:{firstName:"Zh",lastName:"Fi",age:"18n",email:"",vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),R=O.state,D=O.$,L=O.useForm,W=O.useState,F=W(),Y=T()(F,1),Z=Y[0],H=L({validate:function(oe,le){if(oe=="user.firstName")return le.length>3;if(oe=="user.lastName")return le.length>3;if(oe=="user.age")return!isNaN(parseFloat(le))&&isFinite(le)&&parseInt(le)>0}}),Q=H.Form,q=H.valid,X=H.dirty;return A.createElement(n,null,A.createElement("div",null,A.createElement(d,{name:"\u6709\u6548"},String(q)),A.createElement(d,{name:"\u810F"},String(X)),A.createElement(Q,null,A.createElement(u,{name:"user.firstName",label:"First Name","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),A.createElement(u,{name:"user.lastName",label:"lastName","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),A.createElement(u,{name:"user.age",label:"Age","data-error-tips":"\u5FC5\u987B\u662F\u5927\u4E8E0\u7684\u6570\u5B57"}),A.createElement(u,{name:"user.email",label:"Email",type:"email","data-error-tips":"\u5FC5\u987B\u8F93\u5165\u6709\u6548\u7684Email"}),A.createElement(S,{name:"job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),A.createElement(r,{name:"user.resume",label:"Resume","data-error-tips":"\u4E0D\u80FD\u5927\u4E8E20\u4E2A\u5B57\u7B26"}),A.createElement(x,{name:"user.vip",label:"VIP"})),A.createElement(I,{onClick:function(){R.user.firstName="Zhang",R.user.lastName="Fisher",R.user.age=18,R.user.vip=!1}},"Reset")),A.createElement("div",null,A.createElement(g,{data:Z})))}});case 16:case"end":return E.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u65E0\u6548\u7684\u6570\u636E\u770B\u770B\u4F1A\u53D1\u751F\u4EC0\u4E48",title:"\u8868\u5355\u8F93\u5165\u6821\u9A8C"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}}}},34389:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(80916),w={}},32665:function(te,b,e){e.r(b),e.d(b,{demos:function(){return v}});var V=e(24325),l=e.n(V),w=e(12027),T=e.n(w),B=e(29008),_=e.n(B),A=e(28633),U=e.n(A),i=e(70958),j=e.n(i),y=e(92379),C=e(71371),m=e(29355),h=e(48611),v={"docs-guide-intro-get-started-demo-0":{component:y.memo(y.lazy(j()(_()().mark(function r(){var n,d,I,u,x,g,S,N,E,M,O,R;return _()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=L.sent,d=n.createStore,L.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=L.sent,u=I.ColorBlock,x=I.Button,g=I.Divider,S=I.Layout,N=I.JsonView,E=d({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:39.9,count:1,total:function(F){return F.price*F.count}}],total:function(F){return F.orders.reduce(function(Y,Z){return Y+Z.total},0)}}),M=E.state,O=E.$,R=E.useState,L.abrupt("return",{default:function(){var F=R(),Y=U()(F,1),Z=Y[0];return y.createElement(S,null,y.createElement("div",null,y.createElement(u,{name:"\u4E66\u540D"},O("orders.0.book")),y.createElement(u,{name:"\u5355\u4EF7"},O("orders.0.price")),y.createElement(u,{name:"\u6570\u91CF"},y.createElement(x,{onClick:function(){return M.orders[0].count--}},"-"),O("orders.0.count"),y.createElement(x,{onClick:function(){return M.orders[0].count++}},"+")),y.createElement(u,{name:"\u5C0F\u8BA1"},O("orders.0.total")),y.createElement(g,null),y.createElement(u,{name:"\u603B\u8BA1"},O("total"))),y.createElement("div",null,y.createElement(N,{data:Z})))}});case 14:case"end":return L.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":m,"x-react-components":h},renderOpts:{compile:function(){var r=j()(_()().mark(function d(){var I,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(I=g.sent).default.apply(I,u));case 3:case"end":return g.stop()}},d)}));function n(){return r.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-1":{component:y.memo(y.lazy(j()(_()().mark(function r(){var n,d,I,u,x,g,S,N,E,M,O;return _()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=D.sent,d=n.createStore,I=n.delay,u=n.computed,D.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return x=D.sent,g=x.Button,S=x.Table,N=d({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(W){return Math.floor(W.price*W.count)}}],discount:u(function(){var L=j()(_()().mark(function W(F){return _()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,I(2e3);case 2:return Z.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return Z.stop()}},W)}));return function(W){return L.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:u(function(){var L=j()(_()().mark(function W(F){return _()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.abrupt("return",(F.orders.reduce(function(H,Q){return H+Q.total},0)*F.discount.value).toFixed(2));case 1:case"end":return Z.stop()}},W)}));return function(W){return L.apply(this,arguments)}}(),["discount"])}),E=N.state,M=N.$,O=N.useState,D.abrupt("return",{default:function(){var W=O(),F=U()(W,1),Y=F[0];return y.createElement("div",null,y.createElement(S,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(T()(Y.orders.map(function(Z,H){return[Z.book,"\uFFE5".concat(Z.price),function(){return y.createElement("div",null,y.createElement(g,{onClick:function(){return Z.count--}},"-"),Z.count,y.createElement(g,{onClick:function(){return Z.count++}},"+"))},"\uFFE5".concat(Z.total)]})),[["\u6298\u6263",null,null,function(){return y.createElement(y.Fragment,null,M("discount"))}],["\u603B\u8BA1",null,null,function(){return y.createElement(y.Fragment,null,"\uFFE5",M("total"))}]])}))}});case 13:case"end":return D.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":m,"x-react-components":h},renderOpts:{compile:function(){var r=j()(_()().mark(function d(){var I,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(I=g.sent).default.apply(I,u));case 3:case"end":return g.stop()}},d)}));function n(){return r.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-2":{component:y.memo(y.lazy(j()(_()().mark(function r(){var n,d,I,u,x,g,S,N,E,M,O,R;return _()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=L.sent,d=n.createStore,I=n.delay,u=n.computed,L.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return x=L.sent,g=x.Button,S=x.Loading,N=x.Table,E=d({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(F){return Math.floor(F.price*F.count)}}],discount:u(function(){var W=j()(_()().mark(function F(Y){return _()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,I(2e3);case 2:return H.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return H.stop()}},F)}));return function(F){return W.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:u(function(){var W=j()(_()().mark(function F(Y){return _()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,I(2e3);case 2:return H.abrupt("return",(Y.orders.reduce(function(Q,q){return Q+q.total},0)*Y.discount.value).toFixed(2));case 3:case"end":return H.stop()}},F)}));return function(F){return W.apply(this,arguments)}}(),["discount"])}),M=E.state,O=E.$,R=E.useState,L.abrupt("return",{default:function(){var F=R(),Y=U()(F,1),Z=Y[0];return y.createElement("div",null,y.createElement(N,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(T()(Z.orders.map(function(H,Q){return[H.book,"\uFFE5".concat(H.price),function(){return y.createElement("div",null,y.createElement(g,{onClick:function(){return H.count--}},"-"),H.count,y.createElement(g,{onClick:function(){return H.count++}},"+"))},"\uFFE5".concat(H.total)]})),[["\u6298\u6263",null,null,function(){return y.createElement(y.Fragment,null,Z.discount.loading?y.createElement(S,null):Z.discount.value)}],["\u603B\u8BA1",null,null,function(){return y.createElement(y.Fragment,null,Z.total.loading?y.createElement(S,null):Z.total.value)}]])}))}});case 14:case"end":return L.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":m,"x-react-components":h},renderOpts:{compile:function(){var r=j()(_()().mark(function d(){var I,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(I=g.sent).default.apply(I,u));case 3:case"end":return g.stop()}},d)}));function n(){return r.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-3":{component:y.memo(y.lazy(j()(_()().mark(function r(){var n,d,I,u,x,g,S,N,E,M,O,R,D,L,W;return _()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=Y.sent,d=n.createStore,I=n.delay,u=n.computed,x=n.useStore,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return g=Y.sent,S=g.Input,N=g.Button,E=g.Loading,M=g.Table,O=function(H){return Math.floor(H.price*H.count)},R=d({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:O}],discount:u(function(){var Z=j()(_()().mark(function H(Q){return _()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,I(2e3);case 2:return X.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return X.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:u(function(){var Z=j()(_()().mark(function H(Q){return _()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,I(2e3);case 2:return X.abrupt("return",(Q.orders.reduce(function(se,oe){return se+oe.total},0)*Q.discount.value).toFixed(2));case 3:case"end":return X.stop()}},H)}));return function(H){return Z.apply(this,arguments)}}(),["discount"])}),D=R.state,L=R.$,W=R.useState,Y.abrupt("return",{default:function(){var H=W(),Q=U()(H,1),q=Q[0],X=x({book:"\u7CBE\u901AAutoStore",price:10,count:1}),se=X.state,oe=X.useForm,le=oe();return y.createElement("div",null,y.createElement(M,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(T()(q.orders.map(function(me,he){return[me.book,"\uFFE5".concat(me.price),function(){return y.createElement("div",null,y.createElement(N,{onClick:function(){return me.count--}},"-"),me.count,y.createElement(N,{onClick:function(){return me.count++}},"+"))},"\uFFE5".concat(me.total)]})),[["\u6298\u6263",null,null,function(){return y.createElement(y.Fragment,null,q.discount.loading?y.createElement(E,null):q.discount.value)}],["\u603B\u8BA1",null,null,function(){return y.createElement(y.Fragment,null,q.total.loading?y.createElement(E,null):q.total.value)}]])},y.createElement("form",le,y.createElement("h5",null,"\u65B0\u589E\u8BA2\u5355"),y.createElement(S,{name:"book"}),y.createElement(S,{name:"price"}),y.createElement(S,{name:"count"}),y.createElement(N,{onClick:function(){D.orders.push(l()(l()({},se),{},{total:O}))}},"Add"))))}});case 17:case"end":return Y.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed,useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":m,"x-react-components":h},renderOpts:{compile:function(){var r=j()(_()().mark(function d(){var I,u=arguments;return _()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(I=g.sent).default.apply(I,u));case 3:case"end":return g.stop()}},d)}));function n(){return r.apply(this,arguments)}return n}()}}}},71379:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(67409),w={}},6208:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(34040),w={}},61242:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(34934),w={}},26916:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(8468),A=e(29355),U=e(48611),i={"docs-guide-signal-about-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.createStore,u.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=u.sent,h=m.Button,v=m.ColorBlock,r=C({age:18}),n=r.state,d=r.$,u.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(v,null,"Age+Signal :",d("age")),B.createElement(v,null,"Age :",n.age),B.createElement(h,{onClick:function(){return n.age=n.age+1}},"+Age"))}});case 11:case"end":return u.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},74496:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(36518),w={}},82301:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(30399),A=e(29355),U=e(48611),i={"docs-guide-signal-computed-render-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=n.sent,h=m.Button,v=m.ColorBlock,n.abrupt("return",{default:function(){var I=C({user:{age:18}}),u=I.state,x=I.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},x(function(g){var S=g.value;return B.createElement("div",null,S)},function(g){return g.user.age})),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-computed-render-demo-1":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=d.sent,C=y.useStore,m=y.computed,d.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return h=d.sent,v=h.Button,r=h.ColorBlock,d.abrupt("return",{default:function(){var u=C({user:{age:18}}),x=u.state,g=u.$;return B.createElement("div",null,B.createElement(r,{name:"Age"},g(function(S){var N=S.value;return B.createElement("div",null,N)},m(function(S){return S.user.age}))),B.createElement(v,{onClick:function(){return x.user.age++}},"+Age"))}});case 11:case"end":return d.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-computed-render-demo-2":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.useStore,m=y.delay,h=y.computed,u.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=u.sent,r=v.Button,n=v.ColorBlock,d=v.Loading,u.abrupt("return",{default:function(){var g=C({order:{price:10,count:1}}),S=g.state,N=g.$;return B.createElement("div",null,B.createElement(n,{name:"Price"},N("order.price")),B.createElement(n,{name:"Count"},N("order.count")),B.createElement(n,{name:"Total"},N(function(E){var M=E.value,O=E.loading;return B.createElement("div",null,O?B.createElement(d,{title:"\u8BA1\u7B97\u4E2D..."}):M,"\u{1F4B8}\u{1F4B8}")},h(function(){var E=T()(l()().mark(function M(O){return l()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.next=2,m(1e3);case 2:return D.abrupt("return",O.order.price*O.order.count);case 3:case"end":return D.stop()}},M)}));return function(M){return E.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),B.createElement(r,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return u.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},27516:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(8809),A=e(29355),U=e(48611),i={"docs-guide-signal-custom-render-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=n.sent,h=m.Button,v=m.ColorBlock,n.abrupt("return",{default:function(){var I=C({user:{age:18}}),u=I.state,x=I.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},x(function(g){var S=g.value;return B.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},B.createElement("span",{style:{flexGrow:1}},S),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return n.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-custom-render-demo-1":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n;return l()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=I.sent,C=y.useStore,m=y.delay,h=y.computed,I.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=I.sent,r=v.Button,n=v.ColorBlock,I.abrupt("return",{default:function(){var x=C({order:{price:100,count:1,total:h(function(){var M=T()(l()().mark(function O(R){return l()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,m();case 2:return L.abrupt("return",R.price*R.count);case 3:case"end":return L.stop()}},O)}));return function(O){return M.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),g=x.state,S=x.$,N=x.useAsyncState,E=N("order.total");return B.createElement("div",null,B.createElement(n,{name:"Price"},S("order.price")),B.createElement(n,{name:"Count"},S("order.count")),B.createElement(n,{name:"Total",loading:E.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total.value")),B.createElement(n,{name:"Total",loading:E.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total")),B.createElement(r,{onClick:function(){return g.order.count++}},"+Count"))}});case 12:case"end":return I.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-custom-render-demo-2":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d,I,u;return l()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=g.sent,C=y.createStore,m=y.computed,h=y.delay,g.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=g.sent,r=v.Button,n=v.ColorBlock,d=C({order:{price:100,count:1,total:m(function(){var S=T()(l()().mark(function N(E){return l()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,h(2e3);case 2:return O.abrupt("return",E.price*E.count);case 3:case"end":return O.stop()}},N)}));return function(N){return S.apply(this,arguments)}}(),["./price","./count"])}}),I=d.state,u=d.$,g.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(n,{name:"Price"},u("order.price")),B.createElement(n,{name:"Count"},u("order.count")),B.createElement(n,{name:"Total"},u(function(N){var E=N.value,M=N.loading;return B.createElement(B.Fragment,null,M&&B.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!M&&B.createElement("span",null,E,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),B.createElement(r,{onClick:function(){return I.order.count++}},"Count++"))}});case 13:case"end":return g.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},9379:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(95687),w={}},83557:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(13539),A=e(29355),U=e(48611),i={"docs-guide-signal-state-render-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=n.sent,h=m.Button,v=m.ColorBlock,n.abrupt("return",{default:function(){var I=C({user:{age:18}}),u=I.state,x=I.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},x("user.age")),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-state-render-demo-1":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d,I;return l()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=x.sent,C=y.createStore,x.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=x.sent,h=m.Button,v=m.ColorBlock,r=C({user:{firstName:"\u5F20",lastName:"\u4E09"}}),n=r.state,d=r.signal,I=r.$,x.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(v,{name:"FirstName"},I("user.firstName")),B.createElement(v,{name:"LastName"},I("user.lastName")),B.createElement(v,null,"FullName :",I(function(S){return S.user.firstName+" "+S.user.lastName})),B.createElement(v,null,"FullName :",I(function(S){return B.createElement("span",{style:{color:"yellow"}},S.user.firstName," - ",S.user.lastName)})),B.createElement(h,{onClick:function(){return n.user.firstName=n.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),B.createElement(h,{onClick:function(){return n.user.lastName=n.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return x.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-state-render-demo-2":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d,I,u;return l()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=g.sent,C=y.createStore,m=y.delay,h=y.computed,g.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=g.sent,r=v.Button,n=v.ColorBlock,d=C({order:{price:100,count:1,total:h(function(){var S=T()(l()().mark(function N(E){return l()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,m(1e3);case 2:return O.abrupt("return",E.price*E.count);case 3:case"end":return O.stop()}},N)}));return function(N){return S.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),I=d.state,u=d.$,g.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(n,{name:"Price"},u("order.price")),B.createElement(n,{name:"Count"},u("order.count")),B.createElement(n,{name:"Total"},u("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),B.createElement(n,{name:"Total"},u("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),B.createElement(r,{onClick:function(){return I.order.count++}},"+Count"))}});case 13:case"end":return g.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},76875:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(43310),A=e(29355),U=e(48611),i={"docs-guide-signal-watch-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v;return l()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=n.sent,C=y.useStore,n.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=n.sent,h=m.Button,v=m.ColorBlock,n.abrupt("return",{default:function(){var I=C({user:{age:18}}),u=I.state,x=I.$;return B.createElement("div",null,B.createElement(v,{name:"Age"},x(function(g){var S=g.value;return B.createElement("div",null,S)},function(g){return g.user.age})),B.createElement(h,{onClick:function(){return u.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-watch-demo-1":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=d.sent,C=y.useStore,m=y.computed,d.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return h=d.sent,v=h.Button,r=h.ColorBlock,d.abrupt("return",{default:function(){var u=C({user:{age:18}}),x=u.state,g=u.$;return B.createElement("div",null,B.createElement(r,{name:"Age"},g(function(S){var N=S.value;return B.createElement("div",null,N)},m(function(S){return S.user.age}))),B.createElement(v,{onClick:function(){return x.user.age++}},"+Age"))}});case 11:case"end":return d.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}},"docs-guide-signal-watch-demo-2":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=u.sent,C=y.useStore,m=y.delay,h=y.computed,u.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=u.sent,r=v.Button,n=v.ColorBlock,d=v.Loading,u.abrupt("return",{default:function(){var g=C({order:{price:10,count:1}}),S=g.state,N=g.$;return B.createElement("div",null,B.createElement(n,{name:"Price"},N("order.price")),B.createElement(n,{name:"Count"},N("order.count")),B.createElement(n,{name:"Total"},N(function(E){var M=E.value,O=E.loading;return B.createElement("div",null,O?B.createElement(d,{title:"\u8BA1\u7B97\u4E2D..."}):M,"\u{1F4B8}\u{1F4B8}")},h(function(){var E=T()(l()().mark(function M(O){return l()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.next=2,m(1e3);case 2:return D.abrupt("return",O.order.price*O.order.count);case 3:case"end":return D.stop()}},M)}));return function(M){return E.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),B.createElement(r,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return u.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},8451:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(36586),w={}},90266:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(75697),w={}},69109:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return C}});var l=e(29008),w=e.n(l),T=e(28633),B=e.n(T),_=e(70958),A=e.n(_),U=e(92379),i=e(76933),j=e(48611),y=e(29355),C={"docs-guide-store-render-demo-0":{component:U.memo(U.lazy(A()(w()().mark(function m(){var h,v,r,n,d,I,u,x,g,S,N,E;return w()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return h=O.sent,v=h.default,r=h.createContext,n=h.useContext,d=h.useState,O.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return I=O.sent,u=I.ColorBlock,x=I.Button,g=I.Divider,S=r({firstName:"Zhang",lastName:"Fisher",age:18}),N=v.memo(function(R){var D=n(S);return v.createElement(u,{name:"\u5B50\u7EC4\u4EF6:".concat(R.name)},v.createElement("span",null,"Hello :",D.firstName," ",D.lastName))}),E=0,O.abrupt("return",{default:function(){var D=d({firstName:"Zhang",lastName:"Fisher",age:18}),L=B()(D,2),W=L[0],F=L[1];return v.createElement(S.Provider,{value:W},v.createElement(g,{title:"\u6839\u7EC4\u4EF6"}),v.createElement(u,{name:"FullName"},W.firstName," ",W.lastName),v.createElement(u,{name:"Age"},"Age :",W.age),v.createElement(g,{title:"\u5B50\u7EC4\u4EF6"}),v.createElement(N,{name:"A"}),v.createElement(N,{name:"B"}),v.createElement(x,{onClick:function(){F({firstName:"Zhang",lastName:"Fisher",age:++E})}},"+Age"))}});case 17:case"end":return O.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{react:V||(V=e.t(U,2)),"x-react-components":j},renderOpts:{compile:function(){var m=A()(w()().mark(function v(){var r,n=arguments;return w()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(6484).then(e.bind(e,56484));case 2:return I.abrupt("return",(r=I.sent).default.apply(r,n));case 3:case"end":return I.stop()}},v)}));function h(){return m.apply(this,arguments)}return h}()}},"docs-guide-store-render-demo-1":{component:U.memo(U.lazy(A()(w()().mark(function m(){var h,v,r,n,d,I,u,x,g,S,N,E;return w()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return h=O.sent,v=h.createStore,O.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return r=O.sent,n=r.default,O.next=10,Promise.resolve().then(e.bind(e,48611));case 10:return d=O.sent,I=d.ColorBlock,u=d.Button,x=d.Divider,g=v({firstName:"Zhang",lastName:"Fisher",age:18}),S=n.memo(function(R){var D=g.useState("firstName"),L=B()(D,1),W=L[0];return n.createElement(I,{name:"\u5B50\u7EC4\u4EF6:FirstName"},W)}),N=n.memo(function(R){var D=g.useState("lastName"),L=B()(D,1),W=L[0];return n.createElement(I,{name:"\u5B50\u7EC4\u4EF6:lastName"},W)}),E=0,O.abrupt("return",{default:function(){var D=g.useState("age"),L=B()(D,1),W=L[0];return n.createElement(n.Fragment,null,n.createElement(x,{title:"\u6839\u7EC4\u4EF6"}),n.createElement(I,{name:"FullName"},"Hello :",g.state.firstName," ",g.state.lastName),n.createElement(I,{name:"Age"},W),n.createElement(x,{title:"\u5B50\u7EC4\u4EF6"}),n.createElement(S,null),n.createElement(N,null),n.createElement(u,{onClick:function(){return g.state.age=g.state.age+1}},"+Age"),n.createElement(u,{onClick:function(){return g.state.firstName=g.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return O.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,react:V||(V=e.t(U,2)),"x-react-components":j},renderOpts:{compile:function(){var m=A()(w()().mark(function v(){var r,n=arguments;return w()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(6484).then(e.bind(e,56484));case 2:return I.abrupt("return",(r=I.sent).default.apply(r,n));case 3:case"end":return I.stop()}},v)}));function h(){return m.apply(this,arguments)}return h}()}},"docs-guide-store-render-demo-2":{component:U.memo(U.lazy(A()(w()().mark(function m(){var h,v,r,n,d,I,u,x,g,S,N,E,M,O;return w()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return h=D.sent,v=h.createStore,D.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return r=D.sent,n=r.default,D.next=10,Promise.resolve().then(e.bind(e,48611));case 10:return d=D.sent,I=d.ColorBlock,u=d.Button,x=d.Divider,g=v({firstName:"Zhang",lastName:"Fisher",age:18}),S=g.state,N=g.$,E=function(){return n.createElement(I,{name:"\u5B50\u7EC4\u4EF6:FirstName"},N("firstName"))},M=function(){return n.createElement(I,{name:"\u5B50\u7EC4\u4EF6:LastName"},N("lastName"))},O=0,D.abrupt("return",{default:function(){return n.createElement(n.Fragment,null,n.createElement(x,{title:"\u6839\u7EC4\u4EF6"}),n.createElement(I,{name:"FullName"},N("firstName")," ",N("lastName")),n.createElement(I,{name:"Age"},N("age")," - ",++O),n.createElement(x,{title:"\u5B50\u7EC4\u4EF6"}),n.createElement(E,null),n.createElement(M,null),n.createElement(u,{onClick:function(){return S.age=S.age+1}},"+Age"),n.createElement(u,{onClick:function(){return S.firstName=S.firstName+"."}},"Change FirstName"),n.createElement(u,{onClick:function(){return S.lastName=S.lastName+"*"}},"Change LastName"))}});case 19:case"end":return D.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,react:V||(V=e.t(U,2)),"x-react-components":j},renderOpts:{compile:function(){var m=A()(w()().mark(function v(){var r,n=arguments;return w()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(6484).then(e.bind(e,56484));case 2:return I.abrupt("return",(r=I.sent).default.apply(r,n));case 3:case"end":return I.stop()}},v)}));function h(){return m.apply(this,arguments)}return h}()}}}},18634:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(28633),l=e.n(V),w=e(29008),T=e.n(w),B=e(70958),_=e.n(B),A=e(92379),U=e(26437),i=e(29355),j=e(48611),y={"docs-guide-store-state-demo-0":{component:A.memo(A.lazy(_()(T()().mark(function C(){var m,h,v,r,n,d,I,u,x,g;return T()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=N.sent,h=m.createStore,v=m.computed,N.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return r=N.sent,n=r.Button,d=r.ColorBlock,I=h({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(M){return M.firstName+M.lastName},salary:v(function(){var E=_()(T()().mark(function M(O){return T()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.abrupt("return",O.age*10);case 1:case"end":return D.stop()}},M)}));return function(M){return E.apply(this,arguments)}}(),["age"])}),u=I.state,x=I.useState,g=I.$,globalThis.state=u,N.abrupt("return",{default:function(){var M=x("age"),O=l()(M,2),R=O[0],D=O[1],L=x("salary"),W=l()(L,2),F=W[0],Y=W[1],Z=x(function(X){return X.lastName},function(X,se){return se.lastName=X}),H=l()(Z,2),Q=H[0],q=H[1];return A.createElement("div",null,A.createElement(d,null,"Fullname :",u.firstName," ",Q),A.createElement(d,null,"Age :",R),A.createElement(d,null,"Salary: ",g("salary")),A.createElement(n,{onClick:function(){return D(R+1)}},"+Age"),A.createElement(n,{onClick:function(){return q(Q+".")}},"Change lastName"))}});case 13:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(T()().mark(function h(){var v,r=arguments;return T()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}},"docs-guide-store-state-demo-1":{component:A.memo(A.lazy(_()(T()().mark(function C(){var m,h,v,r,n,d,I,u,x,g;return T()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=N.sent,h=m.createStore,N.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=N.sent,r=v.ColorBlock,N.next=10,Promise.resolve().then(e.bind(e,48611));case 10:return n=N.sent,d=n.Button,I=h({firstName:"Zhang",lastName:"Fisher",fullName:function(M){return M.firstName+M.lastName}}),u=I.useState,x=I.state,g=I.$,N.abrupt("return",{default:function(){var M=u(function(Z){return Z.firstName},function(Z,H){return H.firstName=Z}),O=l()(M,2),R=O[0],D=O[1],L=u(function(Z){return Z.fullName},function(Z,H){var Q=l()(Z,2),q=Q[0],X=Q[1];H.firstName=q,H.lastName=X}),W=l()(L,2),F=W[0],Y=W[1];return A.createElement("div",null,A.createElement(r,{name:"FullName",value:F}),A.createElement(d,{onClick:function(){return D("<".concat(R,">"))}},"Change FirstName"),A.createElement(d,{onClick:function(){return Y(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return N.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(T()().mark(function h(){var v,r=arguments;return T()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}},"docs-guide-store-state-demo-2":{component:A.memo(A.lazy(_()(T()().mark(function C(){var m,h,v,r,n,d,I,u;return T()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=g.sent,h=m.createStore,g.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=g.sent,r=v.Button,n=v.ColorBlock,d=h({age:18}),I=d.state,u=d.$,g.abrupt("return",{default:function(){return A.createElement("div",null,A.createElement(n,null,"Age+Signal :",u("age")),A.createElement(n,null,"Age :",I.age),A.createElement(r,{onClick:function(){return I.age=I.age+1}},"+Age"))}});case 11:case"end":return g.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(T()().mark(function h(){var v,r=arguments;return T()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}}}},2385:function(te,b,e){e.r(b),e.d(b,{demos:function(){return i}});var V=e(29008),l=e.n(V),w=e(70958),T=e.n(w),B=e(92379),_=e(46574),A=e(29355),U=e(48611),i={"docs-guide-store-demo-0":{component:B.memo(B.lazy(T()(l()().mark(function j(){var y,C,m,h,v,r,n,d,I;return l()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return y=x.sent,C=y.useStore,x.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=x.sent,h=m.Button,v=m.ColorBlock,x.abrupt("return",{default:function(){var S=C({count:18}),N=S.state,E=S.$;return B.createElement("div",null,B.createElement(v,{name:"Count"},E("count")),B.createElement(h,{onClick:function(){return N.count++}},"Count++"))}});case 11:case"end":return x.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":U},renderOpts:{compile:function(){var j=T()(l()().mark(function C(){var m,h=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(6484).then(e.bind(e,56484));case 2:return r.abrupt("return",(m=r.sent).default.apply(m,h));case 3:case"end":return r.stop()}},C)}));function y(){return j.apply(this,arguments)}return y}()}}}},78845:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(88015),w={}},60746:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(89809),w={}},63522:function(te,b,e){e.r(b),e.d(b,{demos:function(){return v}});var V=e(29008),l=e.n(V),w=e(12027),T=e.n(w),B=e(34180),_=e.n(B),A=e(24325),U=e.n(A),i=e(70958),j=e.n(i),y=e(92379),C=e(32453),m=e(29355),h=e(48611),v={"docs-guide-watch-objects-demo-0":{component:y.memo(y.lazy(j()(l()().mark(function r(){var n,d,I,u,x,g,S,N,E,M,O,R,D,L;return l()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return n=F.sent,d=n.createStore,I=n.watch,F.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return u=F.sent,x=u.Divider,g=u.ColorBlock,S=u.Button,N=u.Box,E=u.Input,M=d({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(Z){return Z.firstName+" "+Z.lastName},dirty:I(function(Y,Z){var H=Y.path,Q=Y.value;return Z.cache[H.join(".")]=!0,!0},function(Y){return["firstName","lastName"].includes(Y[Y.length-1])},{initial:!1})}}),O=M.state,R=M.useBindings,D=M.watchObjects,L=M.$,F.abrupt("return",{default:function(){var Z=R("user");return y.createElement("div",null,y.createElement(E,U()({label:"FirstName"},Z.firstName)),y.createElement(E,U()({label:"lastName"},Z.lastName)),y.createElement(x,null),y.createElement(N,null,y.createElement(g,{name:"FullName"},L("user.fullName")),y.createElement(g,{name:"Dirty"},L("user.dirty")),y.createElement(S,{onClick:function(){O.user.firstName="Zhang",O.user.lastName="Fisher",D.get("user.dirty").reset()}},"Reset")),y.createElement(N,null,y.createElement("div",null,"typeof(store.watchObjects)==",_()(D)),y.createElement("div",null,"store.watchObjects.size=",D.size),y.createElement("div",null,"store.watchObjects.size=",D.size),y.createElement("div",null,"store.watchObjects.keys()=",T()(D.keys()).join(" , "))))}});case 15:case"end":return F.stop()}},r)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7F16\u8F91firstName\u6216lastName,\u4F1A\u89E6\u53D1dirty\u7684\u53D8\u5316",title:"\u4F7F\u7528watch\u529F\u80FD\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF"},context:{"@autostorejs/react":m,"x-react-components":h},renderOpts:{compile:function(){var r=j()(l()().mark(function d(){var I,u=arguments;return l()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(6484).then(e.bind(e,56484));case 2:return g.abrupt("return",(I=g.sent).default.apply(I,u));case 3:case"end":return g.stop()}},d)}));function n(){return r.apply(this,arguments)}return n}()}}}},66495:function(te,b,e){e.r(b),e.d(b,{demos:function(){return y}});var V=e(29008),l=e.n(V),w=e(28633),T=e.n(w),B=e(70958),_=e.n(B),A=e(92379),U=e(30264),i=e(29355),j=e(48611),y={"docs-guide-watch-state-demo-0":{component:A.memo(A.lazy(_()(l()().mark(function C(){var m,h,v,r,n,d,I,u,x;return l()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return m=S.sent,h=m.createStore,v=m.watch,S.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return r=S.sent,n=r.Input,d=r.Button,I=h({orders:[{name:"AutoStore\u5B9E\u6218\u6307\u5357",price:100,count:1,total:function(E){return E.price*E.count}},{name:"\u6DF1\u5165\u6D45\u51FAAutoStore",price:98,count:1,total:function(E){return E.price*E.count}}],total:v(function(N){return u.orders.reduce(function(E,M){return E+M.count*M.price},0)},function(N){return N[N.length-1]==="count"},{initial:198})}),u=I.state,x=I.useState,S.abrupt("return",{default:function(){var E=x(),M=T()(E,1),O=M[0];return A.createElement("table",{className:"table"},A.createElement("thead",null,A.createElement("tr",null,A.createElement("th",null,"Name"),A.createElement("th",null,"Price"),A.createElement("th",null,"Count"),A.createElement("th",null,"Total"))),A.createElement("tbody",null,O.orders.map(function(R,D){return A.createElement("tr",{key:D},A.createElement("td",null,R.name),A.createElement("td",null,R.price),A.createElement("td",null,A.createElement(d,{onClick:function(){return R.count--}},"-"),A.createElement(n,{value:R.count,style:{display:"inline-flex"}}),A.createElement(d,{onClick:function(){return R.count++}},"+")),A.createElement("td",null,R.total))}),A.createElement("tr",null,A.createElement("td",{colSpan:3},"Total"),A.createElement("td",null,u.total))))}});case 12:case"end":return S.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-watch-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var C=_()(l()().mark(function h(){var v,r=arguments;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,e.e(6484).then(e.bind(e,56484));case 2:return d.abrupt("return",(v=d.sent).default.apply(v,r));case 3:case"end":return d.stop()}},h)}));function m(){return C.apply(this,arguments)}return m}()}}}},3902:function(te,b,e){var V;e.r(b),e.d(b,{demos:function(){return h}});var l=e(24325),w=e.n(l),T=e(29008),B=e.n(T),_=e(28633),A=e.n(_),U=e(70958),i=e.n(U),j=e(92379),y=e(95601),C=e(29355),m=e(48611),h={"docs-guide-watch-store-demo-0":{component:j.memo(j.lazy(i()(B()().mark(function v(){var r,n,d,I,u,x,g,S,N,E,M,O,R,D,L,W,F;return B()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=Z.sent,n=r.createStore,d=r.computed,I=r.useStore,Z.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return u=Z.sent,x=u.Box,g=u.Button,S=u.ColorBlock,N=u.Layout,E=u.CheckBox,Z.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return M=Z.sent,O=M.useEffect,R=M.useRef,D=n({order:{price:10,count:2,total:d(function(H){return H.price*H.count})}}),L=D.state,W=D.watch,F=D.$,Z.abrupt("return",{default:function(){var Q=R(),q=I({operates:"*"}),X=q.useState("operates"),se=A()(X,2),oe=se[0],le=se[1];return O(function(){var me=W(function(he){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(he.type," ").concat(he.path.join("."),"</p>"))},{operates:oe});return function(){return me.off()}},[oe]),j.createElement(N,{style:{maxHeight:"400px"}},j.createElement("div",null,j.createElement(S,{name:"Price"},F("order.price")),j.createElement(S,{name:"Count"},j.createElement(g,{onClick:function(){L.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),F("order.count"),j.createElement(g,{onClick:function(){L.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),j.createElement(S,{name:"Total"},F("order.total")),j.createElement(x,null,j.createElement(E,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:oe==="*",onChange:function(he){le(he.target.checked?"*":"read")}}),j.createElement(E,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:oe==="write",onChange:function(he){le(he.target.checked?"write":"*")}}),j.createElement(E,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:oe==="read",onChange:function(he){le(he.target.checked?"read":"*")}})),j.createElement(g,{onClick:function(){Q.current.innerHTML=""}},"Clear")),j.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return Z.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":m,react:V||(V=e.t(j,2))},renderOpts:{compile:function(){var v=i()(B()().mark(function n(){var d,I=arguments;return B()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(6484).then(e.bind(e,56484));case 2:return x.abrupt("return",(d=x.sent).default.apply(d,I));case 3:case"end":return x.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}},"docs-guide-watch-store-demo-1":{component:j.memo(j.lazy(i()(B()().mark(function v(){var r,n,d,I,u,x,g,S,N,E,M,O,R,D,L,W,F;return B()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=Z.sent,n=r.createStore,d=r.computed,I=r.useStore,Z.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return u=Z.sent,x=u.Box,g=u.Button,S=u.ColorBlock,N=u.Layout,E=u.CheckBox,Z.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return M=Z.sent,O=M.useEffect,R=M.useRef,D=n({order:{price:10,count:2,total:d(function(H){return H.price*H.count})}}),L=D.state,W=D.watch,F=D.$,Z.abrupt("return",{default:function(){var Q=R(),q=I({operates:"*"}),X=q.useState("operates"),se=A()(X,2),oe=se[0],le=se[1];return O(function(){var me=W("order.total",function(he){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(he.type," ").concat(he.path.join("."),"</p>"))},{operates:oe});return function(){return me.off()}},[oe]),j.createElement(N,{style:{maxHeight:"400px"}},j.createElement("div",null,j.createElement(S,{name:"Price"},F("order.price")),j.createElement(S,{name:"Count"},j.createElement(g,{onClick:function(){L.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),F("order.count"),j.createElement(g,{onClick:function(){L.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),j.createElement(S,{name:"Total"},F("order.total")),j.createElement(x,null,j.createElement(E,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:oe==="*",onChange:function(he){le(he.target.checked?"*":"read")}}),j.createElement(E,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:oe==="write",onChange:function(he){le(he.target.checked?"write":"*")}}),j.createElement(E,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:oe==="read",onChange:function(he){le(he.target.checked?"read":"*")}})),j.createElement(g,{onClick:function(){Q.current.innerHTML=""}},"Clear")),j.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return Z.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":C,"x-react-components":m,react:V||(V=e.t(j,2))},renderOpts:{compile:function(){var v=i()(B()().mark(function n(){var d,I=arguments;return B()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(6484).then(e.bind(e,56484));case 2:return x.abrupt("return",(d=x.sent).default.apply(d,I));case 3:case"end":return x.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}},"docs-guide-watch-store-demo-2":{component:j.memo(j.lazy(i()(B()().mark(function v(){var r,n,d,I,u,x,g,S,N,E,M,O,R,D,L;return B()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,Promise.resolve().then(e.bind(e,29355));case 2:return r=F.sent,n=r.createStore,F.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return d=F.sent,I=d.Button,u=d.Layout,x=d.Input,F.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return g=F.sent,S=g.useEffect,N=g.useRef,E=n({order:{price:10,count:2,books:["AutoStore\u5B9E\u6218\u6307\u5357","\u6DF1\u5165\u6D45\u51FAAutoStore","AutoStore\u6700\u4F73\u5B9E\u8DF5"]}}),M=E.state,O=E.watch,R=E.$,D=E.useState,L=E.useBindings,F.abrupt("return",{default:function(){var Z=N(),H=N();S(function(){var q=O("order.books",function(X){Z.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          `.concat(X.type," ").concat(X.path.join("."),"[").concat(X.indexs[0],`]
        </p>`))},{operates:["insert","remove","update"]});return function(){return q.off()}},[]);var Q=L("order.books");return j.createElement(u,{style:{maxHeight:"400px"}},j.createElement("div",null,M.order.books.map(function(q,X){return j.createElement(x,w()({key:X},Q[X]))}),j.createElement(x,{ref:H,actions:["+"],placeholder:"\u8BF7\u8F93\u5165\u4E66\u540D",onAction:function(X,se){String(se).length>0&&(M.order.books.push(se),H.current.value="")}}),j.createElement(I,{onClick:function(){Z.current.innerHTML=""}},"Clear")),j.createElement("div",{ref:Z,style:{overflowY:"auto"}}))}});case 17:case"end":return F.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":C,"x-react-components":m,react:V||(V=e.t(j,2))},renderOpts:{compile:function(){var v=i()(B()().mark(function n(){var d,I=arguments;return B()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(6484).then(e.bind(e,56484));case 2:return x.abrupt("return",(d=x.sent).default.apply(d,I));case 3:case"end":return x.stop()}},n)}));function r(){return v.apply(this,arguments)}return r}()}}}},7226:function(te,b,e){e.r(b),e.d(b,{demos:function(){return w}});var V=e(92379),l=e(2415),w={}},20927:function(te,b,e){e.r(b),e.d(b,{Author:function(){return h},Counter:function(){return j},getProjects:function(){return I},useOneEffect:function(){return x}});var V=e(28633),l=e.n(V),w=e(92379),T=e(29355),B=e(48611),_=e(651),A=(0,T.createStore)({root:{count:1}}),U=A.state,i=A.$,j=function(){var S=(0,w.useState)(1),N=l()(S,2),E=N[0],M=N[1];return(0,_.jsxs)(B.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[E,(0,_.jsxs)(B.ColorBlock,{children:["Count:",E]}),(0,_.jsxs)(B.ColorBlock,{children:["Count:",i("root.count")]}),(0,_.jsx)(B.Button,{onClick:function(){return M(E+1)},children:"State +1"}),(0,_.jsx)(B.Button,{onClick:function(){return U.root.count++},children:"Signal +1"})]})},y=(0,T.createStore)({firstName:"Zhang",lastName:"Fisher"}),C=y.state,m=y.$,h=function(){var S=(0,w.useState)(1),N=l()(S,2),E=N[0],M=N[1];return(0,_.jsxs)(B.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[E,(0,_.jsxs)(B.ColorBlock,{children:["Count:",E]}),(0,_.jsx)(B.ColorBlock,{children:m(function(O){return O.firstName+" "+O.lastName})}),(0,_.jsx)(B.Button,{onClick:function(){return M(E+1)},children:"State +1"}),(0,_.jsx)(B.Button,{onClick:function(){return C.lastName=C.lastName+"."},children:"Update lastName"})]})},v=e(29008),r=e.n(v),n=e(70958),d=e.n(n);function I(g){return u.apply(this,arguments)}function u(){return u=d()(r()().mark(function g(S){var N,E,M;return r()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,fetch(S);case 2:if(N=R.sent,!N.ok){R.next=11;break}return R.next=6,N.json();case 6:return E=R.sent,M=E.map(function(D){return{name:D.name,url:D.html_url,description:D.description,stars:D.stargazers_count}}),R.abrupt("return",M);case 11:throw new Error("".concat(N.status," - ").concat(N.statusText));case 12:case"end":return R.stop()}},g)})),u.apply(this,arguments)}function x(g){var S=(0,w.useRef)(!1);(0,w.useEffect)(function(){if(!S.current)return S.current=!0,g()})}},48611:function(te,b,e){e.r(b),e.d(b,{Box:function(){return w},Button:function(){return U},Card:function(){return y},CheckBox:function(){return Q},ColorBlock:function(){return u},Divider:function(){return r},ErrorBoundary:function(){return Le},Field:function(){return v},Input:function(){return O},JsonView:function(){return Z},Layout:function(){return g},List:function(){return Ue},Loading:function(){return B},Radio:function(){return rt},RichLabel:function(){return W},Select:function(){return X},Star:function(){return We},Table:function(){return Me},TextArea:function(){return Je},ValidResult:function(){return h}});var V=e(92379),l=e(651),w=(0,V.forwardRef)(function(pe,k){var ne=pe.title,ae=pe.enable,ue=ae===void 0?!0:ae,de=pe.visible,ve=de===void 0?!0:de;return(0,l.jsxs)("div",{ref:k,style:{display:ve?"flex":"none",position:"relative",flexDirection:"column",padding:"16px",margin:"16px 8px 8px 8px",boxSizing:"border-box",border:"1px solid #ccc"},children:[(0,l.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:ue?"#999":"gray"},children:ne||""}),pe.children]})}),T=e(97106),B=function(k){var ne=k.size,ae=ne===void 0?20:ne,ue=k.visible,de=ue===void 0?!0:ue,ve=k.color,fe=k.tips,ge=fe===void 0?"loading...":fe;return(0,l.jsxs)("span",{title:ge,style:{display:de?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,l.jsx)(T.Z1,{width:ae,height:ae,color:ve}),k.title?(0,l.jsx)("span",{style:{marginLeft:"4px"},children:k.title}):null]})},_=e(94039),A=(0,_.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(k){return k.visible!==!1?k.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #ccc",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555",fontSize:"0.8em","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"x-button"}),U=function(k){var ne=k.loading,ae=k.timeout,ue=ae===void 0?0:ae,de=k.progress,ve=de===void 0?0:de,fe=k.cancel,ge=k.onClick;return(0,l.jsxs)("div",{className:A.className+(k.className?" "+k.className:""),style:A.getStyle(k),onClick:ge,children:[ne?(0,l.jsx)(B,{}):null,(0,l.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:k.children}),ue>0?(0,l.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:ue}):"",ve>0?(0,l.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[ve,"%"]}):"",k.error?(0,l.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:k.error}):"",k.loading&&typeof fe=="function"?(0,l.jsx)("button",{onClick:fe,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},i=(0,_.zo)({border:"1px solid #e1e1e1",background:function(k){return k.enable!==!1?"white":"gray"},margin:"8px",display:function(k){return k.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"x-card"}),j=(0,_.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555",borderRadius:"6px 6px 0 0"},{className:"x-card-header"}),y=function(k){var ne=k.title,ae=k.enable,ue=ae===void 0?!0:ae,de=k.actions,ve=de===void 0?[]:de,fe=Array.isArray(k.children)?k.children:[k.children];return(0,l.jsxs)("div",{className:i.className,style:i.getStyle(k),children:[(0,l.jsxs)("div",{className:j.className,style:j.getStyle(k),children:[(0,l.jsx)("span",{style:{flexGrow:1,color:ue?"#222":"gray"},children:ne}),(0,l.jsx)("span",{style:{},children:ve.map(function(ge,_e){return(0,l.jsx)(U,{onClick:ge.onClick,children:ge.title})})})]}),(0,l.jsx)("div",{style:{padding:"12px"},children:fe.map(function(ge,_e){return fe.length>1&&_e===fe.length-1&&ge.classList&&ge.classList.contains("footer")?(0,l.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:ge},_e):ge})})]})},C=e(24325),m=e.n(C),h=function(k){var ne=k.validate,ae=k.help;if(ne!==void 0){var ue=typeof ne!="boolean",de=ue?ne==null?void 0:ne.result:ne,ve=ue?ne==null?void 0:ne.loading:!1,fe=ue?ne==null?void 0:ne.error:ae;return(0,l.jsxs)("span",{style:{color:"red",display:ve||!de?"flex":"none"},children:[(0,l.jsx)(B,{visible:ve,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!ve&&(de?"":fe)]})}},v=function(k){var ne=k.enable,ae=ne===void 0?!0:ne,ue=k.visible,de=ue===void 0?!0:ue,ve=k.label,fe=ve===void 0?"":ve,ge=k.children,_e=ge===void 0?"":ge,Pe=k.memo,De=k.labelWidth,Te=De===void 0?"128px":De;return(0,l.jsxs)("div",{className:"field",style:{position:"relative",display:de===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,l.jsxs)("label",{className:"field-label",style:{minWidth:Te,fontWeight:"bold",color:ae===!1?"gray":"inherit"},children:[fe,":"]}),(0,l.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:ae===!1?"gray":"inherit"},children:[typeof _e=="function"?"":_e,Pe&&(0,l.jsx)("span",{style:{color:"gray"},children:Pe})]}),(0,l.jsx)(h,m()({},k))]})},r=function(k){var ne=k.title,ae=k.visible,ue=ae===void 0?!0:ae;return(0,l.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:ue?"flex":"none"},children:(0,l.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:ne})})},n=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],d=0;function I(){return d++,d>=n.length-1&&(d=0),n[d]}var u=function(k){var ne=(0,V.useRef)(0),ae=k.name,ue=k.value,de=ue===void 0?"":ue,ve=k.loading,fe=ve===void 0?!1:ve,ge=k.comment,_e=k.inline,Pe=I(),De="white";return(0,V.useEffect)(function(){ne.current++}),(0,l.jsxs)("div",{style:m()(m()({backgroundColor:Pe,padding:"6px",color:De,display:_e?"inline-flex ":"flex"},k.style),{},{alignItems:"center"}),children:[(0,l.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[ae?(0,l.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:ae}):null,ae?(0,l.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,l.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(de),k.children]})]}),ge?(0,l.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:ge}):null,fe?(0,l.jsx)(B,{color:"white"}):null,(0,l.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:ne.current})]})},x=(0,_.zo)({display:function(k){return k.visible===!1?"none":"flex"},position:"relative",flexDirection:function(k){return k.direction||"row"},padding:"4px",margin:"4px",boxSizing:"border-box",alignItems:"stretch","&>*":{flex:1,boxSizing:"border-box",position:"relative",borderLeft:"1px solid #ccc",borderTop:"1px solid #ccc",borderBottom:function(k){return k.direction==="column"?"none":"1px solid #ccc"},borderRight:function(k){return k.direction==="column"?"1px solid #ccc":"none"},padding:"8px"},"&>:last-child":{borderRight:"1px solid #ccc",borderBottom:"1px solid #ccc"},"&+.x-layout":{borderTop:"none",marginTop:"-12px","&>*":{borderTop:"none",paddingTop:"12px"}}},{className:"x-layout"}),g=function(k){return(0,l.jsx)("div",{className:x.className,style:x.getStyle(k,k.style),children:k.children})},S=e(19317),N=e.n(S),E=["id","enable","style","value","actions"],M=(0,_.zo)({display:function(k){return k.inline?"inline-flex":"flex"},alignItems:"center","& input":{border:function(k){return k.validate===!1?"1px solid red":"1px solid #ccc"},borderRadius:"4px",background:function(k){return k.enable===!1?"gray":"white"},display:function(k){return k.visible===!1?"none":"flex"},margin:"4px",padding:"8px",flexGrow:1,textAlign:function(k){return k.center?"center":"left"},"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"},"&.invalid":{border:"1px solid red",color:"red"},width:function(k){return k.width?"".concat(k.width,"px"):"auto"}},"& label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&.invalid>label":{color:"red"},"& .error":{display:"none","&.invalid":{display:"block",color:"red"}},"& .x-input-wrapper":{display:"flex",alignItems:"center","& > input ~ .x-input-action":{borderRadius:"0px",marginLeft:0,marginRight:0,borderLeft:"none",paddingLeft:"1.2em",paddingRight:"1.2em"},"& > input + .x-input-action":{marginLeft:"-8px",borderLeft:function(k){return k.validate===!1?"1px solid red":"1px solid #ccc"}},"& > input ~ .x-input-action:last-child":{borderTopRightRadius:"4px",borderBottomRightRadius:"4px"}}},{className:"x-input"}),O=function(k){var ne=k.id,ae=ne===void 0?Math.random().toString(36).slice(2):ne,ue=k.enable,de=ue===void 0?!0:ue,ve=k.style,fe=ve===void 0?{}:ve,ge=k.value,_e=k.actions,Pe=N()(k,E),De=k.label||k.name||k.id,Te=(0,V.useRef)(null);return(0,l.jsxs)("div",{className:M.className,style:M.getStyle(k,fe),"data-field-name":k.name,children:[De?(0,l.jsx)("label",{htmlFor:ae,children:De}):null,(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,l.jsxs)("div",{className:"x-input-wrapper",children:[(0,l.jsx)("input",m()({ref:Te,id:ae,value:ge,readOnly:!de},Pe)),_e==null?void 0:_e.map(function(Re,ot){return(0,l.jsx)(U,{className:"x-input-action",onClick:function(et){var Ve;(Ve=k.onAction)===null||Ve===void 0||Ve.call(k,Re,Te.current.value,et)},children:Re},ot)})]}),(0,l.jsx)("span",{className:"error","data-validate-field":k.name})]})]})},R=e(28633),D=e.n(R);function L(pe){return pe.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var W=function(k){var ne=k.text,ae=k.color,ue=ae===void 0?"#ff6c00":ae,de=k.rules,ve=typeof ue=="string"?{default:ue}:Object.assign({default:""},ue),fe=L(ne||String(k.children));return de?Object.entries(de).forEach(function(ge){var _e=D()(ge,2),Pe=_e[0],De=_e[1];fe=fe.replace(De,function(Te){var Re=Pe.includes(":")?Pe:"color:".concat(Pe,";");return"<span style='".concat(Re,"'>").concat(Te,"</span>")})}):fe=fe.replace(/\{\s?(.*?)\s?\}/gm,function(ge,_e){return"<span style='color: ".concat(_e in ve?ve[_e]:ve.default,"'>").concat(_e,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,l.jsx)("div",{className:k.className,style:m()({display:k.inline?"inline-block":"block",boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},k.style),children:(0,l.jsx)("span",{dangerouslySetInnerHTML:{__html:fe}})})},F=e(97072),Y=(0,_.zo)({padding:"8px",boxSizing:"border-box",border:function(k){return k.border===!0?"1px solid #ccc":"none"},position:"relative","& .json-container ":{fontFamily:"menlo, consolas, monospace",fontStyle:"normal",fontWeight:"bold",fontSize:"0.9rem",transition:"background-color 400ms",backgroundColor:"white",position:"relative",maxHeight:" 400px",overflowX:"hidden",overflowY:"auto",lineHeight:"calc(100% + 2px)",width:"100%",display:"block",background:"transparent"},"& .json-link":{textDecoration:"none",borderBottom:"1px solid",outline:"none",color:"purple","&:hover":{backgroundColor:"transparent",outline:"none",color:"blueviolet"}},"& .json-lines":{whiteSpace:"normal",paddingInlineStart:"3em",margin:"0px","--colorGraphite":"#303030","--colorCharcoal":"#222222","--colorTar":"#161616","& > li":{whiteSpace:"pre",textIndent:"0.7em",lineHeight:"1.5em",padding:"0px",transition:"all 400ms","&::marker":{fontFamily:"system-ui, sans-serif",fontWeight:"normal",color:"dimgray"}}},"& .json-key, .json-string, .json-number, .json-boolean, .json-null, .json-mark, a.json-link, ol.json-lines >li":{transition:"all 400ms"},"& .json-key.highlight:after":{position:"absolute",content:"' '",width:"1000px",height:"100%",top:"0px",left:"-2em",display:"inline-block",backgroundColor:"#caf9cc",zIndex:-1},"& .json-container":{position:"relative",maxHeight:"500px",overflowX:"hidden",overflowY:"auto"},"& .json-key":{color:"brown",position:"relative",backgroundColor:"transparent"},"& .json-string":{color:"olive"},"& .json-number":{color:"navy"},"& .json-boolean":{color:"teal"},"& .json-null":{color:"dimgray"},"& .json-mark":{color:"black"},"& a.json-link":{color:"purple"},"& a.json-link:visited":{color:"slategray"},"& a.json-link:hover":{color:"blueviolet"},"& a.json-link:active":{color:"slategray"},"& ol.json-lines >li::marker":{color:"dimgray"},"& ol.json-lines >li:nth-child(odd)":{backgroundColor:"gainsboro"},"& ol.json-lines >li:nth-child(even)":{backgroundColor:"whitesmoke"},"& ol.json-lines >li:hover":{backgroundColor:"lemonchiffon"}},{className:"x-json-view"}),Z=function(k){var ne=k.data||String(k.children),ae=(0,V.useRef)(null);return(0,V.useEffect)(function(){if(ae.current){ae.current.innerHTML=F.W.toHtml(typeof ne=="string"?JSON.parse(ne):ne,{trailingCommas:!1,linksNewTab:!0});var ue=k.highlightKeys;if(ue){var de=ae.current.querySelectorAll("span.json-key");de.forEach(function(ve){var fe=ve.innerText.trim();ue.includes(fe)&&ve.classList.add("highlight")})}}},[ne]),(0,l.jsxs)("pre",{className:Y.className,style:Y.getStyle(k),children:[(0,l.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:"gray"},children:k.title||""}),(0,l.jsx)("span",{ref:ae,className:"json-container"})]})},H=(0,_.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-checkbox"}),Q=function(k){var ne=k.id,ae=ne===void 0?Math.random().toString(36).slice(2):ne,ue=k.labelPos,de=ue===void 0?"right":ue,ve=k.label||k.name||k.id;return(0,l.jsxs)("div",{className:H.className,style:H.getStyle(k),children:[de==="left"?(0,l.jsx)("label",{htmlFor:ae,children:ve}):null,(0,l.jsx)("input",m()(m()({},k),{},{id:ae,checked:k.checked,value:k.value,type:"checkbox"})),de==="right"?(0,l.jsx)("label",{htmlFor:ae,children:ve}):null]})},q=(0,_.zo)({display:"flex",alignItems:"center",cursor:"pointer","&>label":{userSelect:"none",fontSize:"14px",cursor:"pointer",width:"100px",flexShrink:0},"&>select":{margin:"4px",padding:"8px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-select"}),X=function(k){var ne=k.items,ae=ne===void 0?[]:ne,ue=k.label||k.name||k.id;return(0,l.jsxs)("div",{className:q.className,style:q.getStyle(k),children:[ue?(0,l.jsx)("label",{children:ue}):null,(0,l.jsx)("select",m()(m()({},k),{},{value:k.value,children:ae.map(function(de){return(0,l.jsx)("option",{value:de.value,children:de.title},de.value)})}))]})},se=e(93949),oe=e.n(se),le=e(6270),me=e.n(le),he=e(77701),Ae=e.n(he),Fe=e(28249),ze=e.n(Fe),Le=function(pe){Ae()(ne,pe);var k=ze()(ne);function ne(ae){var ue;return oe()(this,ne),ue=k.call(this,ae),ue.state={error:void 0},ue}return me()(ne,[{key:"render",value:function(){return this.state.error?(0,l.jsx)(w,{children:this.state.error}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(ue){return{error:ue.stack}}}]),ne}(V.Component),Ke=(0,_.zo)({width:"100%",marginBottom:"1rem",color:"#212529",backgroundColor:"white",borderCollapse:"collapse",border:"1px solid #dee2e6","& th":{backgroundColor:"#f7f7f7"},"& th,td":{padding:".5rem",verticalAlign:"top",border:"1px solid #dee2e6"},"& td":{padding:".5rem",border:"1px solid #dee2e6",verticalAlign:"middle"},"& tfoot":{backgroundColor:"#f7f7f7",padding:".75rem"}},{className:"x-table"}),Me=function(k){var ne,ae=k.cols.map(function(ue){var de=typeof ue=="string"?{name:ue,align:"center"}:ue;return de.name.startsWith("<")&&(de.align="left",de.name=de.name.substring(1)),de.name.startsWith(">")&&(de.align="right",de.name=de.name.substring(1)),de});return(0,l.jsxs)("table",{className:Ke.className,style:Ke.getStyle(k),children:[(0,l.jsxs)("thead",{children:[k.title?(0,l.jsx)("tr",{children:(0,l.jsx)("th",{colSpan:ae.length,children:k.title})}):null,(0,l.jsx)("tr",{children:ae==null?void 0:ae.map(function(ue,de){return(0,l.jsx)("th",{style:{width:ue.width?ue.width:void 0,textAlign:ue.align?ue.align:void 0},children:ue.name},de)})})]}),(0,l.jsx)("tbody",{children:(ne=k.rows)===null||ne===void 0?void 0:ne.map(function(ue,de){return(0,l.jsx)("tr",{children:ue.map(function(ve,fe){var ge=1;if(ve!=null){for(var _e=fe+1;_e<ue.length&&ue[_e]==null;_e++)ge++;return(0,l.jsx)("td",{colSpan:ge>1?ge:void 0,style:{textAlign:ae[fe].align},children:typeof ve=="function"?ve():String(ve)},fe)}})},de)})}),k.children?(0,l.jsx)("tfoot",{children:(0,l.jsx)("tr",{children:(0,l.jsx)("td",{colSpan:ae.length,children:k.children})})}):null]})},Ze=(0,_.zo)({padding:"0px",display:"flex","&>label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&>textarea":{margin:"4px",padding:"8px",minHeight:"80px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-textArea"}),Je=function(k){var ne=k.id,ae=ne===void 0?Math.random().toString(36).slice(2):ne,ue=k.label||k.name||k.id;return(0,l.jsxs)("div",{className:Ze.className,style:Ze.getStyle(k),children:[(0,l.jsx)("label",{htmlFor:ae,children:ue}),(0,l.jsx)("textarea",m()(m()({},k),{},{id:ae}))]})},We=function(k){var ne=k.max,ae=ne===void 0?5:ne,ue=k.value,de=ue===void 0?1:ue,ve=Array.from({length:ae}),fe=(0,V.useRef)(null),ge=(0,V.useState)(de),_e=D()(ge,2),Pe=_e[0],De=_e[1];return(0,l.jsx)("div",{ref:fe,style:{display:"flex",flexDirection:"row",fontSize:"1.2em"},children:ve.map(function(Te,Re){return(0,l.jsxs)("span",{style:{cursor:"pointer",padding:"4px",color:Re<Pe?"#ffe70c":"#ccc"},onClick:function(){De(Re===Pe-1?Re:Re+1);var we=new InputEvent("input",{bubbles:!0,cancelable:!0,data:String(Pe)});fe.current.dispatchEvent(we)},children:[(0,l.jsx)("svg",{viewBox:"64 64 896 896",focusable:"false","data-icon":"star",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:(0,l.jsx)("path",{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"})}),"   "]},Re)})})},nt=(0,_.zo)({listStyle:"'\u03BF'",margin:0,paddingLeft:"1em","&>li":{cursor:"pointer","&:hover":{background:"#f9f9f9",borderRadius:"4px"}}},{className:"x-list"}),Ue=function(k){return(0,l.jsxs)(w,{title:k.title,children:[k.description&&(0,l.jsx)(W,{text:k.description}),(0,l.jsx)("ul",{className:nt.className,style:nt.getStyle(),children:k.items&&k.items.map(function(ne,ae){return Array.isArray(ne)?(0,l.jsx)("li",{children:(0,l.jsx)(W,{text:ne[0],color:ne[1]})},ae):(0,l.jsx)("li",{children:(0,l.jsx)(W,{text:ne,color:"red"})},ae)})})]})},$e=(0,_.zo)({padding:"4px",margin:"4px",display:function(k){return k.inline===!1?"flex":"inline-flex"},alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer",marginRight:"4px"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-radio"}),rt=function(k){var ne=k.id,ae=ne===void 0?Math.random().toString(36).slice(2):ne,ue=k.label||k.name||k.id;return(0,l.jsxs)("div",{className:$e.className,style:$e.getStyle(k),children:[(0,l.jsx)("input",m()(m()({},k),{},{id:ae,checked:k.checked,value:k.value,type:"radio"})),(0,l.jsx)("label",{htmlFor:ae,children:ue})]})}},29355:function(te,b,e){e.r(b),e.d(b,{ASYNC_COMPUTED_VALUE:function(){return me},AbortError:function(){return W},AsyncComputedObject:function(){return Ct},AutoStore:function(){return Dt},AutoStoreError:function(){return L},BATCH_UPDATE_EVENT:function(){return le},ComputedObject:function(){return it},ComputedObjects:function(){return yt},CyleDependError:function(){return Y},EventEmitter:function(){return vt},FAKE_BINDINGS:function(){return mt},InvalidComputedArgumentsError:function(){return Z},InvalidDependsError:function(){return Q},InvalidScopeError:function(){return H},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return X},OBSERVER_DESCRIPTOR_FLAG:function(){return se},ObserverObject:function(){return ct},ObserverScopeRef:function(){return Qe},PATH_DELIMITER:function(){return oe},ReactAutoStore:function(){return at},SKIP_PROXY_FLAG:function(){return q},SyncComputedObject:function(){return Et},TimeoutError:function(){return F},WatchObject:function(){return Bt},WatchObjects:function(){return St},calcDependPaths:function(){return _e},computed:function(){return ze},createBindingsState:function(){return Lt},createFakeObjectBindings:function(){return ft},createFieldBinding:function(){return Ge},createStore:function(){return ia},createUseField:function(){return Mt},createUseFields:function(){return Tt},defineExtend:function(){return Gt},delay:function(){return ot},forEachObject:function(){return Te},getComputedId:function(){return Pe},getDepends:function(){return Ve},getId:function(){return fe},getMapVal:function(){return ne},getSnap:function(){return Re},getSnapshot:function(){return ut},getVal:function(){return ae},isAbsolutePath:function(){return Le},isAsyncComputedValue:function(){return $e},isEq:function(){return Ze},isEventMatched:function(){return Pt},isFunction:function(){return lt},isMap:function(){return Je},isObserverDescriptor:function(){return Ke},isObserverDescriptorBuilder:function(){return pe},isPathEq:function(){return We},isPathMatched:function(){return nt},isPlainObject:function(){return Ue},isPrimitive:function(){return _t},isPromise:function(){return rt},isProxy:function(){return k},isRaw:function(){return Me},joinValuePath:function(){return ve},markRaw:function(){return ue},noRepeat:function(){return we},normalizeDeps:function(){return Ae},pathIsExists:function(){return wt},pathStartsWith:function(){return et},setVal:function(){return de},updateObjectVal:function(){return De},useForm:function(){return Pa},useStore:function(){return Aa},watch:function(){return Ot}});var V=e(6270),l=e.n(V),w=e(93949),T=e.n(w),B=e(28810),_=e.n(B),A=e(77701),U=e.n(A),i=e(28249),j=e.n(i),y=e(29861),C=e.n(y),m=e(92379),h=e(29008),v=e.n(h),r=e(70958),n=e.n(r),d=e(12027),I=e.n(d),u=e(34180),x=e.n(u),g=e(14582),S=e.n(g),N=e(48510),E=e.n(N),M=e(30790),O=e.n(M),R=e(5672),D=e.n(R),L=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o)}(D()(Error)),W=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o)}(L),F=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o)}(L),Y=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o)}(L),Z=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o)}(L),H=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o)}(L),Q=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o)}(L),q=Symbol("skip-proxy"),X=Symbol("observer-descriptor-builder"),se=Symbol("observer-descriptor"),oe=".",le="__batch_update__",me=Symbol("AsyncComputedValue");function he(a){return a.constructor.name==="AsyncFunction"}function Ae(a){return a?a.map(function(t){return Array.isArray(t)?t:typeof t=="string"?["/","./","../"].some(function(o){return t.startsWith(o)})?t:t.includes(oe)?t.split(oe):t.split("."):[]}):[]}function Fe(){return{async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0,objectify:!0}}function ze(){var a=arguments[0];if(typeof a!="function")throw new Error("computed getter must be a function");var t=[],o=Object.assign({},Fe());if(arguments.length===1)t=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))o.depends=arguments[1];else if(x()(arguments[1])==="object")Object.assign(o,arguments[1]),o.depends=Ae(o.depends);else throw new Z;else arguments.length>=3&&(t=Ae(arguments[1]),Object.assign(o,arguments[2]),o.depends=t);o.async=o.async===!0||he(a)||arguments.length>=2&&Array.isArray(arguments[1]);var p=function(){return C()({type:"computed",getter:a,options:o},se,!0)};return p[X]=!0,p}function Le(a){return a?a.some(function(t){return typeof t=="string"?t.startsWith("./")||t.startsWith("../")||t.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(t):!0}):!1}function Ke(a){return x()(a)==="object"&&a.hasOwnProperty("type")&&typeof a.type=="string"&&a.hasOwnProperty("getter")&&typeof a.getter=="function"&&a.hasOwnProperty("options")&&x()(a.options)==="object"}function Me(a){try{return a[q]===!0}catch(t){}return!1}function Ze(a,t){if(a===t)return!0;if(a===null||t===null||x()(a)!==x()(t))return!1;if(x()(a)==="object"){if(Array.isArray(a)&&Array.isArray(t))return a.length!==t.length?!1:a.every(function(p,s){return Ze(p,t[s])});if(!Array.isArray(a)&&!Array.isArray(t)){var o=Object.keys(a);return o.length!==Object.keys(t).length?!1:o.every(function(p){return Ze(a[p],t[p])})}else return!1}return!1}function Je(a){return toString.call(a)==="[object Map]"}function We(a,t){return!a||!t||a.length!==t.length?!1:a.every(function(o,p){return o===t[p]})}function nt(a,t){var o=We(a,t);return o?!0:a.length!==t.length?!1:a.every(function(p,s){return p==="*"?!0:p===t[s]})}function Ue(a){return a==null||x()(a)!=="object"?!1:Object.prototype.toString.call(a)==="[object Object]"}function $e(a){return a&&x()(a)==="object"&&a.hasOwnProperty(me)}function rt(a){try{return!!a&&(x()(a)==="object"||typeof a=="function")&&typeof a.then=="function"&&typeof a.catch=="function"&&(a instanceof Promise||Object.prototype.toString.call(a)==="[object Promise]")}catch(t){return!1}}function pe(a){return typeof a=="function"&&a[X]===!0}function k(a){return x()(a)==="object"&&a!==null&&!("__isProxy"in a)}function ne(a,t){var o=a.get(t);if(o!==void 0)return o;var p=a.get(Number(t)||t);if(p!==void 0)return p}function ae(a,t,o){if(!t||t.length===0)return a;for(var p,s=a,c=0;c<t.length;c++){var f=t[c];if(Je(s))p=ne(s,f);else if(f in s)p=s[f];else{if(o!==void 0)return o;throw new Error("invalid state path: ".concat(t.join(".")))}s=p}return p}function ue(a){try{a[q]=!0}catch(t){}return a}function de(a,t,o,p){for(var s=a,c=t.length-1,f=0;f<t.length;f++){var P=t[f],$=Je(s);if(f===c){if(p===!0){var z=$?ne(s,P):s[P];$e(z)&&(s=z,P="value")}$?s.set(P,o):s[P]=o;return}var G=$?ne(s,P):s[P];s=G}}function ve(a){return(a||["ROOT"]).map(function(t){return Array.isArray(t)?t.join("."):t}).join(oe)}function fe(){return Math.random().toString(36).slice(2)}function ge(a,t,o){var p=a&&!a[0].startsWith("#");if(Array.isArray(t))return t;if(t==="self")return p?a:void 0;if(t==="root")return p?[]:void 0;if(t==="parent")return p?a.slice(0,-2):void 0;if(t==="current")return p?a.slice(0,-1):void 0;if(typeof t=="string")return t.startsWith("./")?p?[].concat(I()(a.slice(0,-1)),I()(t.slice(2).split(oe))):void 0:t.startsWith("../")?p?ge(a.slice(0,-1),t.slice(3),!0):void 0:t.startsWith("/")?t.replace(/^(\/)*/,"").split(oe):p&&o?[].concat(I()(a.slice(0,-1)),I()(t.split(oe))):t.split(oe)}function _e(a,t){return t?t.map(function(o){return ge(a,o)}).filter(function(o){return o!==void 0}):[]}function Pe(a,t){var o="";return t.id?o=t.id:o=ve(a),o}function De(a,t,o){var p=a,s=t.length-1;t.forEach(function(c,f){var P=Je(p);if(f===s){var $=P?p.get(c):p[c];x()($)==="object"&&Object.assign($,o);return}P?(p.has(c)||p.set(c,{}),p=p.get(c)):(c in p||(p[c]={}),p=p[c])})}function Te(a,t){function o(p,s){for(var c in p){var f=p[c];typeof t=="function"&&t({value:f,key:c,parent:p,path:s.concat(c)}),x()(f)==="object"&&o(f,s.concat(c))}}o(a,[])}function Re(a){return a}function ot(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(t){setTimeout(t,a)})}function we(a){var t=new Map;return a.forEach(function(o){var p=o.join(".");t.set(p,o)}),Array.from(t.values())}function et(a,t){return a.length>t.length?!1:a.every(function(o,p){return o===t[p]})}function Ve(a,t,o){var p=[];return typeof a=="function"?p=t.collectDependencies(function(){return a(t.state)}):typeof a=="string"?p=[a.split(oe)]:Array.isArray(a)?p=[I()(a)]:p=[],o!=="none"&&p.forEach(function(s){var c=t.peep(function(f){return ae(f,s)});$e(c)&&s.push(o==="all"?"*":"value")}),p}function wt(a,t){if(!t||t.length===0)return!1;for(var o,p=a,s=0;s<t.length;s++){var c=t[s],f=!1;if(Je(p)){if(f=p.has(c),!f)return!1;o=ne(p,c)}else{if(f=c in p,!f)return!1;o=p[c]}p=o}return!0}var Vt=e(24325),Be=e.n(Vt);function ut(a,t){if(Array.isArray(a)){for(var o=I()(a),p=0;p<o.length;p++)o[p]=ut(o[p],t);return o}else if(x()(a)==="object"){if(!t&&$e(a))return a.value;var s=Be()({},a);for(var c in s)s[c]=ut(s[c],t);return s}return a}function _t(a){return a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean"}function Gt(a){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof a=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(a)}function lt(a){return a?typeof a=="function":!1}var yt=function(a){U()(o,a);var t=j()(o);function o(p){var s;return T()(this,o),s=t.call(this),s.store=p,s}return l()(o,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(s){this.store.options.enableComputed=s}},{key:"create",value:function(){var s=Ke(arguments[0])?arguments[0]:ze.apply(void 0,arguments)();if(s.options.async&&!Le(s.options.depends))throw new Q("The scope of the dynamic computed object must be the root state object or an absolute path");var c=s.options.scope;if(c===void 0)s.options.scope="ROOT";else if(!Le([c]))throw new H("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(s)}},{key:"runGroup",value:function(){var p=n()(v()().mark(function c(f,P,$){return v()().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return G.next=2,this.run(function(K){return K.group===f},P,$);case 2:return G.abrupt("return",G.sent);case 3:case"end":return G.stop()}},c,this)}));function s(c,f,P){return p.apply(this,arguments)}return s}()},{key:"run",value:function(){var p=n()(v()().mark(function c(){var f=arguments,P=this,$,z,G,K,J=arguments;return v()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:if(J.length!==0){ee.next=2;break}return ee.abrupt("return",Promise.all(I()(this.values()).map(function(ce){return ce.run()})));case 2:return typeof J[0]=="function"?$=J[0]:typeof J[0]=="string"&&($=function(Ie){return Ie.id===f[0]}),z=Object.assign({},J[1]),G=Object.assign({wait:!1,timeout:0},J[2]),K={},ee.abrupt("return",new Promise(function(ce,Ie){if(G.wait){var ie;z.onDone=function(xe){var ye=xe.id;if(K[ye]=!0,Object.values(K).every(function(Oe){return Oe}))return clearTimeout(ie),!0},G.timeout>0&&(ie=setTimeout(function(){Ie(new F)},G.timeout))}Promise.all(I()(P.values()).filter(function(xe){return $(xe)?(K[xe.id]=!1,!0):!1}).map(function(xe){return xe.run(z)})),G.wait||ce()}));case 7:case"end":return ee.stop()}},c,this)}));function s(){return p.apply(this,arguments)}return s}()},{key:"enableGroup",value:function(){var p=n()(v()().mark(function c(f){var P,$,z;return v()().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:P=S()(this.values());try{for(P.s();!($=P.n()).done;)z=$.value,z.options.enable=f}catch(J){P.e(J)}finally{P.f()}case 2:case"end":return K.stop()}},c,this)}));function s(c){return p.apply(this,arguments)}return s}()},{key:"delete",value:function(s){var c;return(c=this.get(s))===null||c===void 0||c.detach(),E()(O()(o.prototype),"delete",this).call(this,s)}},{key:"find",value:function(s){if(s){var c=Array.isArray(s)?s:s.split(oe),f=S()(this.values()),P;try{for(f.s();!(P=f.n()).done;){var $=P.value;if(We($.path,c))return $}}catch(z){f.e(z)}finally{f.f()}}}}]),o}(D()(Map)),zt=e(69075);function Zt(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",o=typeof a=="function"?a():a instanceof Error?a.stack:a;try{var p;(p=console)[t].apply(p,["[AutoStore<".concat(this.id,">]")].concat(I()(Array.isArray(o)?o:[o])))}catch(s){}}function tt(a,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:oe,p=[];try{return typeof t=="function"&&(t=t.call(a,a)),p=Array.isArray(t)?t:typeof t=="string"?t.split(o):[],p.length>0?ae(a,p):a}catch(s){return a}}var Qe=function(a){return a.Root="ROOT",a.Current="CURRENT",a.Parent="PARENT",a.Depends="DEPENDS",a.Self="SELF",a}({});function Jt(a,t,o){var p=t===void 0?o:t;if(typeof p=="function")try{p=p.call(a.store,a)}catch(s){}return p===void 0?o===void 0?Qe.Current:o:p}function dt(a,t,o,p){var s=a.store.state,c=a.store.options;if(typeof c.getRootScope=="function"){var f=c.getRootScope(a,{observerType:t,valuePath:o==null?void 0:o.path});f!==void 0&&(s=f)}var P=o||{},$=P.path,z=P.parentPath,G=Jt(a,p.scope,c.scope),K=s;try{if(G===Qe.Current)K=tt(s,z);else if(G===Qe.Parent)K=tt(s,$.slice(0,$.length-2<0?0:$.length-2));else if(G===Qe.Root)K=s;else if(G===Qe.Depends){var J;K=(J=a.depends)===null||J===void 0?void 0:J.map(function(re){return tt(s,re)})}else typeof G=="string"?G.startsWith("@")?K=dt(a,t,o,Be()(Be()({},p),{},{scope:dt(a,t,Be()(Be()({},o),{},{path:G.slice(1).split(oe)}),Be()(Be()({},p),{},{scope:G.slice(1)}))})):K=tt(s,ge(a.path,G)):Array.isArray(G)&&(K=tt(s,G))}catch(re){c.log("Error while getting computed scope ".concat(a.toString(),": ").concat(re.message),"error")}return K}var ct=function(){function a(t,o,p){T()(this,a),C()(this,"_path",void 0),C()(this,"_id",""),C()(this,"_initial",void 0),C()(this,"_value",void 0),C()(this,"_associated",!1),C()(this,"_attached",!1),C()(this,"_getter",void 0),C()(this,"_depends",[]),C()(this,"_options",void 0),C()(this,"_subscribers",[]),C()(this,"_strPath",void 0),this.store=t,this.descriptor=o,this.context=p,this._associated=p!==void 0,this._getter=o.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},o.options),this._id=this._options.id||(this._associated?ve(p==null?void 0:p.path):fe()),this._path=(p==null?void 0:p.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=_e(this._path,this._options.depends),this._onObserverCreated(),this._onInitial()}return l()(a,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(o){this._options.enable=o}},{key:"group",get:function(){return this._options.group},set:function(o){this._options.group=o}},{key:"initial",get:function(){return this._initial},set:function(o){this._initial=o}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(o){this._depends=o}},{key:"getter",get:function(){return this._getter},set:function(o){this._getter=o}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(oe)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?ae(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(o){this._associated?de(this.store.state,this._path,o):(this._value=o,this.store._notify({type:"set",path:this.path,value:o}))}},{key:"_onObserverCreated",value:function(){typeof this.store.options.onObserverCreated=="function"&&this.store.options.onObserverCreated(this)}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"onInitOptions",value:function(o){}},{key:"update",value:function(o,p){var s=this;this.store.update(function(){s.value=o},p)}},{key:"silentUpdate",value:function(o){this.update(o,{silent:!0})}},{key:"watch",value:function(o,p){var s=this;return this.store.watch(this.getValueWatchPath(),function(c){o.call(s,c)},p)}},{key:"getValueWatchPath",value:function(){return this.path.join(oe)}},{key:"emitStoreEvent",value:function(o,p){var s=this;setTimeout(function(){s.store.emit(o,p)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(o){}},{key:"attach",value:function(){var o=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(o.toString()," subscribed to ").concat(o.depends.map(function(p){return p.join(oe)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(o){return o.off()}),this._attached=!1)}},{key:"run",value:function(){}}]),a}(),it=function(a){U()(o,a);var t=j()(o);function o(p,s,c){var f;return T()(this,o),f=t.call(this,p,s,c),f.store=p,f.descriptor=s,f.context=c,s.options.depends=_e(f.path,f.options.depends),f}return l()(o,[{key:"toString",value:function(){return"ComputedObject<".concat(ve(this.path),">")}},{key:"isDisable",value:function(s){return!this.store.options.enableComputed||!this.enable&&s!==!0||s===!1}},{key:"run",value:function(s){throw new Error("Method not implemented.")}}]),o}(ct),Et=function(a){U()(o,a);var t=j()(o);function o(){return T()(this,o),t.apply(this,arguments)}return l()(o,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(s){var c=this,f=Object.assign({first:!1,operate:void 0},s),P=f.first,$=f.operate;if(!P&&this.isDisable(s==null?void 0:s.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!P&&this.store.log(function(){return"Run sync computed for : ".concat(c.toString())});var z=s?Object.assign({},this.options,s):this.options,G=dt(this,"computed",this.context,z),K=z.initial;try{K=this.getter.call(this,G,{operate:$,first:P}),P&&(this.initial=K),this.store.peep(function(){c.value=K}),!P&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:K,computedObject:this})}catch(J){throw!P&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:J,computedObject:this}),J}}},{key:"collectDependencies",value:function(){var s=[],c=this.store.watch(function(f){s.push(f.path)},{operates:["get"]});this.run({first:!0}),c.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&s.push.apply(s,I()(_e(this.path,this.options.depends))),this.depends=we(s),this.attach()}},{key:"onDependsChange",value:function(s){this.run({operate:s})}}]),o}(it);function Ht(a,t,o,p,s){return o==="push"?function(){for(var c=t.length,f=arguments.length,P=new Array(f),$=0;$<f;$++)P[$]=arguments[$];var z=p.apply(t,P);if(t.length>c){var G=Array.from({length:t.length-c},function(K,J){return J+c});a({type:"insert",path:s,indexs:G,value:P,oldValue:void 0,parentPath:s,parent:t})}return z}:o==="pop"?function(){var c=t.length,f=p.apply(t);return t.length===c-1&&a({type:"remove",path:s,indexs:[c-1],value:[f],oldValue:void 0,parentPath:s,parent:t}),f}:o==="splice"?function(c,f){for(var P=arguments.length,$=new Array(P>2?P-2:0),z=2;z<P;z++)$[z-2]=arguments[z];var G=p.apply(t,[c,f].concat($));if(G.length>0){var K=Array.from({length:G.length},function(re,ee){return c+ee});a({type:"remove",path:s,indexs:K,value:G,oldValue:void 0,parentPath:s,parent:t})}if($.length>0){var J=Array.from({length:$.length},function(re,ee){return c+ee});a({type:"insert",path:s,indexs:J,value:$,oldValue:void 0,parentPath:s,parent:t})}return G}:o==="unshift"?function(){for(var c=t.length,f=arguments.length,P=new Array(f),$=0;$<f;$++)P[$]=arguments[$];var z=p.apply(t,P);if(t.length>c){var G=Array.from({length:t.length-c},function(K,J){return J});a({type:"insert",path:s,indexs:G,value:P,oldValue:void 0,parentPath:s,parent:t})}return z}:o==="shift"?function(){var c=t.length,f=p.apply(t);return t.length===c-1&&a({type:"remove",path:s,indexs:[0],value:[f],oldValue:void 0,parentPath:s,parent:t}),f}:o==="fill"?function(c,f,P){var $=p.apply(t,[c,f,P]),z=f!=null?f:0,G=P!=null?P:t.length,K=Array.from({length:G-z},function(re,ee){return ee+z}),J=Array.from({length:G-z},function(){return c});return a({type:"update",path:s,indexs:K,value:J,oldValue:void 0,parentPath:s,parent:t}),$}:o==="concat"?function(){for(var c=t.length,f=arguments.length,P=new Array(f),$=0;$<f;$++)P[$]=arguments[$];var z=p.apply(t,P),G=Array.from({length:P.length},function(K,J){return c+J});return a({type:"insert",path:s,indexs:G,value:P,oldValue:void 0,parentPath:s,parent:t}),z}:p}var pt=Symbol("__NOTIFY__");function bt(a,t,o,p,s){if(Me(a)||x()(a)!=="object"||a===null)return a;if(o.has(a))return o.get(a);var c=new Proxy(a,{get:function(P,$,z){var G=Reflect.get(P,$,z);if(typeof $!="string")return G;var K=[].concat(I()(t),[String($)]);if(typeof G=="function"||!Object.hasOwn(P,$))if(typeof G=="function"){if(Array.isArray(P))return Ht(s.notify,P,$,G,t);if(!Me(G)&&Object.hasOwn(P,$)){var J=K.join(".");try{if(p.has(J)){var re=[].concat(I()(p.keys()),[J]);throw p.clear(),new Y('Find circular dependency at <"'.concat(K,'">, steps: ').concat(re.join(" <- ")))}return p.set(J,!0),s.createComputedObject(K,G,t,P)}finally{p.delete(J)}}else return G}else return G;return s.notify({type:"get",path:K,indexs:[],value:G,oldValue:void 0,parentPath:t,parent:P}),bt(G,K,o,p,s)},set:function(P,$,z,G){var K=Reflect.get(P,$,G),J=Reflect.set(P,$,z,G);if($===pt)return!0;if(J&&$!==pt&&z!==K)if(Array.isArray(P))s.notify({type:"update",path:t,indexs:[Number($)],value:z,oldValue:K,parentPath:t,parent:P});else{var re=[].concat(I()(t),[String($)]);s.notify({type:"set",path:re,indexs:[],value:z,oldValue:K,parentPath:t,parent:P})}return J},deleteProperty:function(P,$){var z=P[$],G=[].concat(I()(t),[String($)]),K=Reflect.deleteProperty(P,$);return K&&$!==pt&&s.notify({type:"delete",path:G,indexs:[],value:z,oldValue:void 0,parentPath:t,parent:P}),K}});return o.set(a,c),c}function Yt(a,t){var o=new Map,p=new WeakMap;return bt(a,[],p,o,t)}var Xt=e(28633),Ce=e.n(Xt),Qt=e(75396),qt=e.n(Qt),ea=e(21206);function ta(a){return a instanceof Error?a:new Error(a)}var Ct=function(a){U()(o,a);var t=j()(o);function o(){var p;T()(this,o);for(var s=arguments.length,c=new Array(s),f=0;f<s;f++)c[f]=arguments[f];return p=t.call.apply(t,[this].concat(c)),C()(_()(p),"_isRunning",!1),C()(_()(p),"_defaultAbortController",null),C()(_()(p),"_userAbortController",void 0),C()(_()(p),"_firstRun",!1),p}return l()(o,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return E()(O()(o.prototype),"value",this)},set:function(s){qt()(O()(o.prototype),"value",s,this,!0)}},{key:"running",get:function(){return this._isRunning}},{key:"onInitOptions",value:function(s){s.reentry||(s.reentry=this.store.options.reentry)}},{key:"onInitial",value:function(){var s=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(s.options.immediate===!0||s.options.immediate==="auto"&&s.options.initial===void 0)&&s.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var s=this;return Object.assign(C()(C()(C()(C()(C()(C()(C()(C()(C()({},me,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",ue(function(c){return s.store.computedObjects.run(s.id,Object.assign({},c))})),"cancel",ue(function(){s.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(s){var c=this,f=this.strPath,P=Object.keys(s).length;if(this.associated)this.store.update(function(z){De(z,c.path,s)},{batch:P>1?f:!1});else{Object.assign(this.value,s);var $=P>1;Object.entries(s).forEach(function(z){var G=Ce()(z,2),K=G[0],J=G[1],re={type:"set",path:[c.strPath,K],value:J,parent:c.value};$&&(re.reply=!0),c.store.operates.emit("".concat(c.strPath,".").concat(K),re)}),$&&this.store.operates.emit(f,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var p=n()(v()().mark(function c(f){var P=this,$,z,G,K,J;return v()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:if($=f!=null?f:{},z=$.first,!this.isDisable(f==null?void 0:f.enable)){ee.next=4;break}return this.store.log(function(){return"Async computed <".concat(P.toString(),"> is disabled")},"warn"),ee.abrupt("return");case 4:if(this._firstRun=!0,!z&&this.store.log(function(){return"Run async computed for : ".concat(P.toString())}),G=f?Object.assign({first:z},this.options,f):this.options,K=dt(this,"computed",this.context,G),J=G.reentry,!(this._isRunning&&!J)){ee.next=13;break}return this.store.log(function(){return"Async computed: ".concat(P.toString()," is over maximum reentry count")},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),ee.abrupt("return");case 13:return this._isRunning=!0,ee.prev=14,ee.next=17,this.executeGetter(K,G);case 17:return ee.abrupt("return",ee.sent);case 18:return ee.prev=18,this._isRunning=!1,ee.finish(18);case 21:case"end":return ee.stop()}},c,this,[[14,,18,21]])}));function s(c){return p.apply(this,arguments)}return s}()},{key:"createComputeProgressbar",value:function(s){var c=this,f=Object.assign({},s),P=f.max,$=P===void 0?100:P,z=f.min,G=z===void 0?0:z,K=f.value,J=K===void 0?0:K;return this.updateComputedValue({progress:J}),{value:function(ee){ee>$&&(ee=$),ee<G&&(ee=G),c.updateComputedValue({progress:ee})},end:function(){this.value($)}}}},{key:"getAbortController",value:function(s){if(s&&typeof s.abortController=="function"){var c=s.abortController();c&&c instanceof AbortController&&(this._userAbortController=c)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(s,c,f){var P=this,$=f.timeout,z=Array.isArray($)?$:[$,0],G=Ce()(z,2),K=G[0],J=K===void 0?0:K,re=G[1],ee=re===void 0?0:re,ce,Ie;return J>0&&(c.timeout=ee>1?ee:J,Ie=setTimeout(function(){s.hasTimeout=!0,s.hasError=!0,s.error="TIMEOUT",typeof s.timeoutCallback=="function"&&s.timeoutCallback(),clearInterval(ce),P.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},J),ee>1&&(ce=setInterval(function(){P.updateComputedValue({timeout:ee--}),ee===0&&clearInterval(ce)},J/(ee+1)))),{clear:function(){clearTimeout(Ie),clearInterval(ce)},enable:J>0}}},{key:"executeGetter",value:function(){var p=n()(v()().mark(function c(f,P){var $,z,G,K,J,re,ee,ce,Ie,ie,xe,ye,Oe,Ee,Se,ke;return v()().wrap(function(be){for(;;)switch(be.prev=be.next){case 0:$=P.retry,z=$===void 0?[0,0]:$,G=Array.isArray(z)?z:[Number(z),0],K=Ce()(G,2),J=K[0],re=K[1],ce=this.getAbortController(P),Ie={onTimeout:function(Xe){return ee=Xe},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Xe){return Xe},cancel:ce.abort,extras:P.extras,operate:P.operate,first:P.first,abortSignal:ce.signal},ie={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:ee},ce.signal.addEventListener("abort",function(){return ie.hasAbort=!0}),xe={clear:function(){},enable:!1},Oe=function(Xe){return Object.assign(ie,Xe)},Ee=0;case 9:if(!(Ee<J+1)){be.next=46;break}if(Se={},be.prev=11,ke={loading:!0},ie.hasError&&(ke.error=null),J>0&&(ke.retry=Ee>0?J-Ee+1:0),Ee>0&&Oe({error:null,hasError:!1,hasTimeout:!1}),xe=this.setTimeoutControl(ie,ke,P),this.updateComputedValue(ke),!ie.hasAbort){be.next=20;break}throw new W;case 20:return be.next=22,this.getter.call(this,f,Ie);case 22:if(ye=be.sent,!ie.hasAbort){be.next=25;break}throw new W;case 25:ie.hasTimeout||(Se.value=ye,xe.enable&&(Se.timeout=0)),be.next=33;break;case 28:be.prev=28,be.t0=be.catch(11),ie.hasError=!0,ie.error=be.t0,ie.hasTimeout||(Se.error=ta(be.t0).message);case 33:return be.prev=33,xe.clear(),Ee===J&&(ie.hasTimeout&&(Se.error=ie.error),J>0&&(Se.retry=0)),Se.loading=!1,this.updateComputedValue(Se),be.finish(33);case 39:if(!ie.hasError){be.next=43;break}if(!(J>0&&re>0&&Ee<J)){be.next=43;break}return be.next=43,(0,ea.g)(re);case 43:Ee++,be.next=9;break;case 46:ie.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):ie.hasError||ie.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:ie.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:ye,computedObject:this}),this.onDoneCallback(P,ie.error,ie.hasAbort,ie.hasTimeout,f,ye);case 48:case"end":return be.stop()}},c,this,[[11,28,33,39]])}));function s(c,f){return p.apply(this,arguments)}return s}()},{key:"onDoneCallback",value:function(s,c,f,P,$,z){typeof s.onDone=="function"&&s.onDone.call(this,{id:this.id,path:this.path,value:z,error:c,abort:f,timeout:P,scope:$})}},{key:"onDependsChange",value:function(s){var c=this;this.store.log(function(){return"AsyncComputed<".concat(c.id,"> is running by depends ").concat(s.type,"/").concat(s.path.join(".")," operate ")}),this.run({operate:s,first:!this._firstRun})}},{key:"getValueWatchPath",value:function(){var s=this.path.join(oe);return["".concat(s,".*"),s]}},{key:"getDepends",value:function(){var s=this,c=E()(O()(o.prototype),"getDepends",this).call(this);return c.map(function(f){if(f.length===0)return f;var P=S()(s.store.computedObjects.values()),$;try{for(P.s();!($=P.n()).done;){var z=$.value;if(We(z.path,f)&&z.async)return["".concat(f,".value")]}}catch(G){P.e(G)}finally{P.f()}return f})}}]),o}(it);function Ot(){var a=arguments[0],t=typeof arguments[1]=="function"?arguments[1]:function(){return!0},o=x()(arguments[1])==="object"?arguments[1]:arguments[2],p=Object.assign({depends:[],enable:!0,objectify:!0,filter:t},o),s=function(){return{type:"watch",getter:a,options:p}};return s[X]=!0,s}var St=function(a){U()(o,a);var t=j()(o);function o(p){var s;return T()(this,o),s=t.call(this),C()(_()(s),"_watcher",{off:function(){}}),C()(_()(s),"_enable",!0),s.store=p,s}return l()(o,[{key:"enable",get:function(){return this._enable},set:function(s){this._enable=s}},{key:"set",value:function(s,c){return E()(O()(o.prototype),"size",this)===0&&this.createWacher(),E()(O()(o.prototype),"set",this).call(this,s,c)}},{key:"createWacher",value:function(){var s=this;this._watcher=this.store.watch("**",function(c){var f=c.path,P=c.value;if(s._enable){var $=f[0].startsWith("#")?P:ae(s.store.state,f),z=S()(s.values()),G;try{for(z.s();!(G=z.n()).done;){var K=G.value;K.isMatched(f,$)&&K.run(f,$)}}catch(J){z.e(J)}finally{z.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off();var s=S()(this.values()),c;try{for(s.s();!(c=s.n()).done;){var f=c.value;f.reset()}}catch(P){s.e(P)}finally{s.f()}this.createWacher()}},{key:"create",value:function(){var s=Ke(arguments[0])?arguments[0]:Ot.apply(void 0,arguments)();return this.store._createWatch(s)}},{key:"enableGroup",value:function(s){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,f=S()(this.values()),P;try{for(f.s();!(P=f.n()).done;){var $=P.value;$.options.group===s&&($.options.enable=c)}}catch(z){f.e(z)}finally{f.f()}}}]),o}(D()(Map)),Bt=function(a){U()(o,a);var t=j()(o);function o(p,s,c){var f;if(T()(this,o),f=t.call(this,p,s,c),C()(_()(f),"_cache",void 0),f.store=p,f.context=c,typeof f.options.filter!="function")throw new Error("watch options.filter must be a function");return f}return l()(o,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(s,c){return Ze(s,this.path)?!1:this.filter(s,c)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(s,c){if(!this.enable){this.store.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var f,P=(f=this.getter)===null||f===void 0?void 0:f.call(this,{path:s,value:c},this);this.value=P,this.emitStoreEvent("watch:done",{value:P,watchObject:this})}catch($){this.emitStoreEvent("watch:error",{error:$,watchObject:this})}}}]),o}(ct),Nt=oe;function Pt(a,t){if(!t||t==="**")return!0;var o=a.split(Nt),p=t.split(Nt);if(o.length!==p.length)return!1;for(var s=0;s<p.length;s++)if(p[s]!=="*"&&p[s]!==o[s])return!1;return!0}var vt=function(){function a(){T()(this,a),C()(this,"_listeners",new Map)}return l()(a,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var o=this,p=arguments[0],s=arguments[1],c=arguments[2],f=s;return p==="**"?this.addHandler("*",f,c):String(p).includes("*")?(f=function($,z){Pt(z,p)&&s($,z)},this.addHandler("*",f,c)):this.addHandler(p,f,c),{off:function(){return o.off(p,f)}}}},{key:"addHandler",value:function(o,p,s){var c=this._listeners.get(o);c?s?c.unshift(p):c.push(p):this._listeners.set(o,[p])}},{key:"once",value:function(o,p){var s=this,c=function f(P,$){try{p(P,$)}finally{s.off($,f)}};return this.on(o,c)}},{key:"off",value:function(o,p){String(o).includes("*")&&(o="*");var s=this._listeners.get(o);s&&(p?s.splice(s.indexOf(p)>>>0,1):this._listeners.set(o,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(o){return this.on("**",o)}},{key:"wait",value:function(){var o=this,p=x()(arguments[0]),s=p==="string"?arguments[0]:void 0,c=arguments[1]||0,f=p==="function"?p:void 0,P;return new Promise(function($,z){var G;s?G=o.once(s,function(K){clearTimeout(P),$(K)}):typeof f=="function"&&(G=o.onAny(function(K,J){var re=f(J,K);re!==!1&&(G.off(),clearTimeout(P),$(K))})),c>0&&(P=setTimeout(function(){G.off(),z(new Error("timeout"))},c))})}},{key:"emit",value:function(o,p){var s=this._listeners.get("*");s&&s.slice().map(function(c){c(p,o)}),s=this._listeners.get(o),s&&s.slice().map(function(c){c(p,o)})}}]),a}();function aa(a){var t;return pe(a)?t=a():typeof a=="function"&&(t={type:"computed",getter:a,options:Object.assign({},Fe(),{async:he(a)})}),t}function At(a,t){if(t==="*")return!0;if(t==="write"){if(a.type==="get")return}else if(t==="read"){if(a.type!=="get")return}else if(Array.isArray(t)&&t.length>0&&!t.includes(a.type))return;return!0}var Dt=function(a){U()(o,a);var t=j()(o);function o(p,s){var c;return T()(this,o),c=t.call(this),C()(_()(c),"_data",void 0),C()(_()(c),"computedObjects",void 0),C()(_()(c),"watchObjects",void 0),C()(_()(c),"_operates",new vt),C()(_()(c),"_options",void 0),C()(_()(c),"_silenting",!1),C()(_()(c),"_batching",!1),C()(_()(c),"_batchOperates",[]),C()(_()(c),"_peeping",!1),c._options=(0,zt.w)({id:fe(),debug:!1,lazy:!1,enableComputed:!0,reentry:!0,log:Zt},s),c.computedObjects=new yt(_()(c)),c.watchObjects=new St(_()(c)),c.subscribeCallbacks(),c._data=Yt(p,{notify:c._notify.bind(_()(c)),createComputedObject:c.createObserverObject.bind(_()(c))}),c.getSnap=c.getSnap.bind(_()(c)),c.watch=c.watch.bind(_()(c)),c.update=c.update.bind(_()(c)),c.peep=c.peep.bind(_()(c)),c.silentUpdate=c.silentUpdate.bind(_()(c)),c.batchUpdate=c.batchUpdate.bind(_()(c)),c.collectDependencies=c.collectDependencies.bind(_()(c)),c.trace=c.trace.bind(_()(c)),c.installExtends(),c._options.lazy||Te(c._data),c._options.debug&&x()(globalThis.__AUTOSTORE_DEVTOOLS__)==="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(_()(c)),c.emit("load",_()(c)),c}return l()(o,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(s,c){this._options.debug&&this.options.log.call(this,s,c)}},{key:"installExtends",value:function(){var s=this,c=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(c)&&c.forEach(function(f){return typeof f=="function"&&f(s)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(s){this._peeping&&s.type==="get"||(this._batching&&this._batchOperates.push(s),!this._silenting&&this.operates.emit(s.path.join(oe),s))}},{key:"watch",value:function(){var s=this,c=typeof arguments[0]=="function"||arguments[0]==="*",f=c?arguments[0]:arguments[1],P=function(Se,ke){return function(je){if(At(je,Se)&&!(typeof ke=="function"&&!ke(je)))try{if(s._peeping=!0,je.type==="batch"){var be=je.value.filter(function(Ye){return At(Ye,Se)});be.length>0&&(je.value=be)}f(je)}finally{s._peeping=!1}}};if(c){var $=Object.assign({once:!1,operates:"write"},arguments[1]),z=$.operates,G=$.filter,K=P(z,G);return this.operates.onAny(K)}else{var J=arguments[0],re=Array.isArray(J)?J.map(function(Ee){return typeof Ee=="string"?Ee:Ee.join(oe)}):[J],ee=Object.assign({once:!1,operates:"write"},arguments[2]),ce=ee.once,Ie=ee.operates,ie=ee.filter,xe=ce?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),ye=[],Oe=P(Ie,ie);return re.forEach(function(Ee){ye.push(xe.call(s,Ee,Oe))}),{off:function(){return ye.forEach(function(Se){return Se.off()})}}}}},{key:"createObserverObject",value:function(s,c,f,P){var $=aa(c),z={path:s,value:c,parentPath:f,parent:P};if($){if($.type==="computed"){var G=this._createComputed($,z);return G==null?void 0:G.initial}else if($.type==="watch"){var K=this._createWatch($,z);return K==null?void 0:K.initial}}else return c}},{key:"_createComputed",value:function(s,c){var f;return s.options.async?f=new Ct(this,s,c):f=new Et(this,s,c),f&&(f.silentUpdate(f.initial),f.options.objectify&&this.computedObjects.set(f.id,f),this.emit("computed:created",f)),f}},{key:"_createWatch",value:function(s,c){var f=new Bt(this,s,c);return this.watchObjects.set(f.id,f),this.emit("watch:created",f),f}},{key:"silentUpdate",value:function(s){this.update(s,{silent:!0})}},{key:"batchUpdate",value:function(s){this.update(s,{batch:!0})}},{key:"update",value:function(s,c){var f=Object.assign({},c),P=f.batch,$=P===void 0?!1:P,z=f.reply,G=z===void 0?!0:z,K=f.silent,J=K===void 0?!1:K,re=f.peep,ee=re===void 0?!1:re;if(typeof s=="function"){J&&(this._silenting=!0),$&&(this._batching=!0,this._silenting=!0),ee&&(this._peeping=!0);try{var ce=s(this.state);if($&&rt(ce))throw new Error("Batch update method can't be async function")}finally{this._silenting=!1,this._batching=!1,this._peeping=!1,this.replyBatchOperates(G,$)}}else throw new Error("update method must provide a function argument")}},{key:"replyBatchOperates",value:function(s,c){var f=this;if(this._batchOperates.length>0){var P=I()(this._batchOperates);this._batchOperates=[],s&&P.forEach(function(z){z.reply=!0,f._notify(z)});try{var $=c===!0?le:String(c);this.operates.emit($,{type:"batch",path:[$],value:P})}finally{this._batchOperates=[]}}}},{key:"peep",value:function(){var s=arguments,c=this,f=typeof arguments[0]=="function"?function(){return s[0](c.state)}:function(){return ae(c.state,Array.isArray(s[0])?s[0]:s[0].split(oe))};this._peeping=!0;try{return f()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(s){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",f=[],P=this.watch(function($){f.push($.path)},{operates:c});try{s()}finally{P.off()}return we(f)}},{key:"trace",value:function(s){var c=this,f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",P;return{stop:function(){return P&&P.off()},start:function(){var $=n()(v()().mark(function G(K){var J;return v()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return J=[],ee.abrupt("return",new Promise(function(ce){P=c.watch(function(Ie){J.push(Ie),K&&K(Ie)&&(P.off(),ce(J))},{operates:f}),Promise.resolve(s()).finally(function(){typeof K!="function"&&(P.off(),ce(J))})}));case 2:case"end":return ee.stop()}},G)}));function z(G){return $.apply(this,arguments)}return z}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(s){var c=Object.assign({reserveAsync:!0},s),f=c.reserveAsync,P=c.entry;return ut(P?ae(this._data,P):this._data,f)}}]),o}(vt);function He(a,t,o,p){if(!t)return a.state;var s;try{typeof t=="function"?s=t(a.state):Array.isArray(t)?s=ae(a.state,t):s=ae(a.state,t.split(oe)),o&&$e(s)&&(s=s.value)}catch(c){if(p)return p(c)}return s}function na(a){return function(){var t=arguments,o=t.length>=1&&(Array.isArray(t[0])||typeof t[0]=="string"||typeof t[0]=="function")?t[0]:void 0,p=t.length===2&&typeof t[1]=="function"?t[1]:void 0,s=t.length===2&&(typeof o=="string"||Array.isArray(o))&&typeof t[1]=="boolean"?t[1]:!1,c=(0,m.useState)(function(){return He(a,o,s!==!0)}),f=Ce()(c,2),P=f[0],$=f[1],z=a.useDeps(o,s===!0?"all":"value");(0,m.useEffect)(function(){var K;return z.length===0?K=a.watch(function(J){var re=J.reply;re||$(Be()({},a.state))}):K=a.watch(z,function(){var J=He(a,o);$(Ue(J)?Be()({},J):Array.isArray(J)?I()(J):J)}),function(){return K.off()}},[z]);var G=(0,m.useCallback)(function(K){o?typeof o=="string"?a.update(function(J){return de(J,o.split(oe),K)}):Array.isArray(o)?a.update(function(J){return de(J,o,K)}):typeof o=="function"&&p&&a.update(function(J){return p(K,J)}):typeof K=="function"&&a.update(function(J){return K(J)},{batch:!0})},[o]);return[P,G]}}function ra(a){return function(t){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",p=(0,m.useState)(function(){if(Array.isArray(t)){var f=[];return t.forEach(function(P){f.push.apply(f,I()(Ve(P,a,o)))}),f}else return Ve(t,a,o)}),s=Ce()(p,1),c=s[0];return we(c)}}var Ne=e(651);function oa(a,t,o){var p=o.errorBoundary||a.options.signalErrorBoundary;return m.memo(function(){var s=a.useDeps(t),c=(0,m.useState)(null),f=Ce()(c,2),P=f[0],$=f[1],z=(0,m.useState)(function(){return He(a,t,!0,$)}),G=Ce()(z,2),K=G[0],J=G[1];return(0,m.useEffect)(function(){var re=a.watch(s,function(){J(He(a,t,!0,$))});return function(){return re.off()}},[s]),(0,Ne.jsx)(Ne.Fragment,{children:P?(0,Ne.jsx)(p,{error:P}):typeof K=="boolean"?String(K):K})},function(){return!0})}function ua(a,t,o,p){var s=p.errorBoundary||a.options.signalErrorBoundary;return m.memo(function(){var c=(0,m.useState)(null),f=Ce()(c,2),P=f[0],$=f[1],z=(0,m.useState)(function(){return He(a,o,!1,$)}),G=Ce()(z,2),K=G[0],J=G[1],re=$e(K),ee=(0,m.useMemo)(function(){return re?K:{value:K}},[K]),ce=a.useDeps(o,"none");return(0,m.useEffect)(function(){var Ie=re?"".concat(Array.isArray(o)?o.join(oe):o,".*"):ce,ie=a.watch(Ie,function(xe){var ye=xe.path,Oe=xe.value;J(re?Be()(Be()({},K),{},C()({},ye[ye.length-1],Oe)):He(a,o,!1,$))});return function(){return ie.off()}},[ce]),(0,Ne.jsx)(Ne.Fragment,{children:P?(0,Ne.jsx)(s,{error:P}):t(ee)})},function(){return!0})}function la(a,t,o,p){var s=p.errorBoundary||a.options.signalErrorBoundary;return m.memo(function(){var c=(0,m.useState)(null),f=Ce()(c,2),P=f[0],$=f[1],z=pe(o)?o():o,G=(0,m.useState)(function(){try{if(Ke(z)){if(z.options.objectify=!1,z.type==="computed")return a.computedObjects.create(z);if(z.type==="watch")return a.watchObjects.create(z)}else{var ie=ze(z),xe=ie();return xe.options.objectify=!1,a.computedObjects.create(xe)}}catch(ye){return $(ye),null}}),K=Ce()(G,1),J=K[0],re=(0,m.useState)(function(){return J?J.async?J.value:{value:J.value}:{value:""}}),ee=Ce()(re,2),ce=ee[0],Ie=ee[1];return(0,m.useEffect)(function(){var ie={off:function(){}};return J&&(ie=J.watch(function(xe){if(!xe.reply)try{if(J.type==="computed")if(J.async){var ye=J;(We(xe.path,ye.path)||We(xe.path.slice(0,-1),ye.path))&&Ie(Be()({},ye.value))}else Ie({value:J.value});else J.type==="watch"&&Ie({value:J.value})}catch(Oe){$(Oe)}},{operates:"write"})),function(){return ie.off()}},[z]),(0,Ne.jsx)(Ne.Fragment,{children:P?(0,Ne.jsx)(s,{error:P}):t(ce)})},function(){return!0})}function da(a){return function(){var t=arguments,o=t.length>=1&&(typeof t[0]=="string"||typeof t[0]=="function")&&(!t[1]||Ue(t[1]))?t[0]:void 0,p=t.length>=2&&typeof t[0]=="function"&&(typeof t[1]=="string"||Array.isArray(t[1])||typeof t[1]=="function")?t[0]:void 0,s=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,c=t.length>=2&&typeof t[0]=="function"&&typeof t[1]=="string"?t[1]:void 0,f=Object.assign({},t.length>1&&Ue(t[t.length-1])?t[t.length-1]:void 0),P=o?oa(a,o,f):c?ua(a,p,c,f):s?la(a,p,s,f):function(){return(0,Ne.jsx)(Ne.Fragment,{})};return(0,Ne.jsx)(P,{})}}function It(a){return typeof a=="number"||typeof a=="string"&&!isNaN(parseFloat(a))}function jt(a){var t=a;if(a){a.persist&&a.persist();var o=a.currentTarget;if(o&&a.type){var p=o.tagName.toLowerCase(),s=o.type;if(p==="input")if(s==="checkbox")t=o.checked;else if(o.type==="radio"){for(var c=o.dataset.fieldName,f=document.querySelectorAll(`input[type="radio"][name='`.concat(c,"']")),P=0;P<f.length;P++)f[P].checked=!1;t=o.value,o.checked=!0}else t=o.value;else t=o.value}else a.nativeEvent&&a.target&&(t=a.target.value)}return typeof t=="string"&&(It(t)?t=Number(t):t==="true"||t==="false"?t=t==="true":(t.startsWith("'")&&t.endsWith("'")||t.startsWith('"')&&t.endsWith('"'))&&(t=t.slice(1,t.length-1))),t}function sa(a){return function(){var t=arguments,o=t.length>=1&&typeof t[0]=="string"?t[0]:void 0;if(!o)throw new Error("Input bind must have at least one argument");var p={};return p.onChange=function(s){var c=jt(s);de(a.state,o.split(oe),c)},p}}function Ge(a,t,o,p,s,c,f){var P=function(G){if(f.type==="radio")return s===G;if(f.type==="checkbox")return!!p},$=f.name?f.name:Array.isArray(t)?t.join(oe):t||"";return new Proxy({value:p,onChange:function(G){var K=jt(G);lt(f.toState)&&(K=f.toState(K,{path:t,part:o})),lt(c)?c({value:K,path:t,part:o},a.state):t&&a.update(function(J){return de(J,t,K)})},name:$,checked:P(p)},{get:function(G,K,J){if(It(K)&&f.type==="radio"&&f.values){var re=Number(K);return Ge(a,t,re,f.values[re],p,c,f)}return Reflect.get(G,K,J)}})}function Mt(a){return function(){var t=arguments,o=Array.isArray(t[0])&&t[0].length>1,p=t.length>=1&&typeof t[0]=="string"?t[0].split(oe):void 0,s=t.length>=2&&typeof t[0]=="function"?t[0]:void 0,c=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,f=o?t[0]:[p||s],P=(0,m.useState)(function(){return t.length>=2&&Ue(t[1])?t[1]:t.length===3&&Ue(t[2])?t[2]:{}}),$=Ce()(P,1),z=$[0],G=(0,m.useState)(function(){return f.map(function(ye,Oe){if(typeof ye=="function")return Ge(a,void 0,Oe,ye(a.state),void 0,c,z);var Ee=He(a,ye,!0);return Ge(a,Array.isArray(ye)?ye:ye.split(oe),Oe,Ee,void 0,c,z)})}),K=Ce()(G,2),J=K[0],re=K[1],ee=(0,m.useState)(function(){var ye=f.map(function(Ee){return Ve(Ee,a,"value")}),Oe=we(ye.reduce(function(Ee,Se){return Se&&Ee.push.apply(Ee,I()(Se)),Ee},[]));return[ye,Oe]}),ce=Ce()(ee,1),Ie=Ce()(ce[0],2),ie=Ie[0],xe=Ie[1];return xe.length===0||t.length===0?{}:((0,m.useEffect)(function(){var ye;return ye=a.watch(xe,function(Oe){var Ee=Oe.path,Se=Oe.value;ie.forEach(function(ke,je){if(ke.some(function(Xe){return We(Xe,Ee)})){var be=f[je];if(typeof be=="function"){var Ye=be(a.state);J[je]=Ge(a,void 0,je,Ye,void 0,c,z),re(I()(J))}else J[je]=Ge(a,Ee,je,Se,void 0,c,z),re(I()(J))}})}),function(){return ye.off()}},[xe]),o?J:J[0])}}function ca(a){var t=arguments;return function(){var o=t[0],p=t[1],s=t[2];(0,m.useEffect)(function(){var c=a.watch(o,p,s);return function(){return c.off()}},[])}}var mt=Symbol("FAKE_BINDINGS");function ft(a,t){var o={};return t instanceof Map?t.forEach(function(p,s){o[s]=mt}):Object.entries(t).forEach(function(p){var s=Ce()(p,1),c=s[0];o[c]=mt}),o}function Rt(a,t,o,p,s){var c=Array.isArray(s.entry)?s.entry:s.entry.split(oe);if(x()(a)!=="object"||a===null)return a;var f=t.length===0?"__ROOT__":t.join(".");if(o.has(f))return o.get(f);var P=a;(Array.isArray(a)||Ue(a))&&(P=ft(p,a));var $=new Proxy(P,{get:function(G,K,J){if(typeof K!="string")return Reflect.get(G,K,J);var re=[].concat(I()(c),I()(t),[String(K)]),ee=[].concat(I()(t),[String(K)]).join(oe),ce=ae(p.state,re);if(_t(ce)){var Ie=ee in s?s[ee]:{};return Ge(p,re,0,ce,void 0,void 0,Ie)}else if($e(ce)){var ie=ee in s?s[ee]:{};return Ge(p,[].concat(I()(re),["value"]),0,ce,void 0,void 0,ie)}else return Rt(ce,re,o,p,s)}});return o.set(f,$),$}function Lt(a,t){var o=new Map;return Rt({},[],o,a,t)}function $t(a){return Array.isArray(a)?a:a.split(oe)}function Tt(a){return function(t){var o=Object.assign({entry:[]},t),p=(0,m.useState)(function(){return a.getSnap({entry:$t(o.entry)})}),s=Ce()(p,2),c=s[0],f=s[1],P=(0,m.useState)(function(){return Lt(a,o)}),$=Ce()(P,1),z=$[0];return(0,m.useSyncExternalStore)(function(G){var K=$t(o.entry),J=a.watch(function(re){if(!re.reply){var ee=re.type=="batch"?re.value:[re];ee.forEach(function(ce){var Ie=ce.path,ie=ce.value;if(et(K,Ie)){var xe=Ie.slice(K.length);de(c,xe,ie),de(z,[].concat(I()(xe),["value"]),ie)}}),f(Be()({},c)),G()}},{operates:"write"});return function(){J.off()}},function(){return c}),z}}var at=function(a){U()(o,a);var t=j()(o);function o(p,s){var c;return T()(this,o),c=t.call(this,p,Object.assign({signalErrorBoundary:function(){return(0,Ne.jsx)(Ne.Fragment,{children:"ERROR"})}},s)),C()(_()(c),"useState",void 0),C()(_()(c),"useAsyncState",void 0),C()(_()(c),"useDeps",void 0),C()(_()(c),"$",void 0),C()(_()(c),"signal",void 0),C()(_()(c),"useWatch",void 0),C()(_()(c),"bind",void 0),C()(_()(c),"useField",void 0),C()(_()(c),"useFields",void 0),C()(_()(c),"useReactive",void 0),C()(_()(c),"useAsyncReactive",void 0),c.signal=c.$=da(_()(c)).bind(_()(c)),c.useState=na(_()(c)).bind(_()(c)),c.useAsyncState=function(f){return c.useState(f,!0)[0]},c.useDeps=ra(_()(c)).bind(_()(c)),c.useWatch=ca(_()(c)).bind(_()(c)),c.bind=sa(_()(c)).bind(_()(c)),c.useField=Mt(_()(c)).bind(_()(c)),c.useFields=Tt(_()(c)).bind(_()(c)),c.useReactive=c.useState,c.useAsyncReactive=c.useAsyncState.bind(_()(c)),c}return l()(o)}(Dt);function ia(a,t){return new at(a,t)}function kt(a,t){if(a)try{if(a.classList){var o;(o=a.classList).remove.apply(o,I()(t.split(/\s+/)))}}catch(p){}}function Da(a,t){if(t){var o=a.getAttribute("style")||"";o.endsWith(";")||(o+=";"),t.endsWith(";")||(t=t+=";"),t.split(";").forEach(function(p){var s=p.split(":"),c=_slicedToArray(s,2),f=c[0],P=c[1];a.style[f]=P})}}function ja(a,t){t&&(t.endsWith(";")||(t=t+=";"),t.split(";").forEach(function(o){var p=o.split(":"),s=_slicedToArray(p,2),c=s[0],f=s[1];a.style[c]=""}))}function pa(a,t){var o=a.indexOf(t);o>=0&&a.splice(o,1)}function Ma(a,t,o){if(t){var p=function(c,f){o==="style"?insertStyle(a,f):addClass(a,f)};_typeof(t)==="object"?Object.entries(t).forEach(function(s){var c=_slicedToArray(s,2),f=c[0],P=c[1],$=f.toLocaleUpperCase()==="ROOT"?a:a.querySelector(f);p($,P)}):typeof t=="string"&&p(a,t)}}function Ra(a,t,o){if(t){var p=function(c,f){o==="style"?removeStyle(a,f):removeClass(a,f)};_typeof(t)==="object"?Object.entries(t).forEach(function(s){var c=_slicedToArray(s,2),f=c[0],P=c[1],$=f.toLocaleUpperCase()==="ROOT"?a:a.querySelector(f);p($,P)}):typeof t=="string"&&p(a,t)}}function xt(a){return["input","textarea","select"].includes(a.tagName.toLowerCase())}function va(a){return a.tagName.toLowerCase()==="input"}function Ia(a){return a.tagName.toLowerCase()==="select"}var Ft=Symbol("empty"),qe="invalid",ma="data-invalid-tips",fa="data-field-part",La="data-validate-field",$a={ROOT:"color:red;border:1px solid red;",input:"color:red;border:1px solid red;"};function xa(a){var t=a.querySelectorAll(":scope input[name],input[name][value=''],textarea[name],textarea[name][value=''],select[name],select[name][value=''],[data-field-name]"),o=Array.from(t).filter(function(p){return p.nodeType&&p.nodeType===1});return o}function ha(a,t){var o=t?t(a):xa(a),p={};return o.reduce(function(s,c){var f=c.getAttribute("name")||c.getAttribute("data-field-name");if(f){var P=Array.from(xt(c)?[c]:c.querySelectorAll("input,textarea,select"));P.forEach(function($){$.setAttribute("name",f)}),s[f]||(s[f]=[]),s[f].push({path:f,el:c,inputs:P,invalidTips:c.getAttribute(ma)})}return s},{})}function ga(a,t,o,p,s){if(!o)return t;if(Array.isArray(p))p[parseInt(o)]=t;else if(x()(p)==="object")p[o]=t;else{if(typeof p=="string")return p.replace(new RegExp(o),function(c,f){return c.replace(f,t)});if(typeof p=="boolean")return!!t;if(typeof p=="number")return parseFloat(t)}return t}function _a(a,t,o,p,s){var c=s.toState||ga,f=t.dataset.fieldPart,P=o.split(oe),$=t.dataset.typeof,z=a.peep(function(K){return ae(K,P)}),G=c(o,p,f,z,t);a.update(function(K){de(K,o.split(oe),G)},{peep:!0})}function Wt(a){return typeof a=="boolean"}function st(a){return a==null?!0:Array.isArray(a)?a.length===0:x()(a)==="object"?Object.keys(a).length===0:typeof a=="string"?a.trim()==="":!1}function ya(a){return a==null?!1:typeof a=="boolean"||typeof a=="number"||typeof a=="string"||_typeof(a)==="symbol"?!0:Array.isArray(a)?a.every(ya):!!React.isValidElement(a)}function Ut(a){var t,o=a.dataset.typeof;if(va(a))if(a.type==="checkbox")if(st(a.value))t=a.checked;else{var p=String(a.value).split(","),s=Ce()(p,2),c=s[0],f=s[1];t=a.checked?c:f}else if(a.type==="radio"){var P=a.name,$=document.querySelectorAll('input[type="radio"][name="'.concat(P,'"]'));if($.length>1){var z=Array.from($).findIndex(function(K){return K.checked});t=z>=0?$[z].value:null}else t=$[0].checked}else t=a.value;else if(Ia(a))if(a.multiple){var G=a.selectedOptions;t=Array.from(G).map(function(K){return K.value})}else t=a.value;else t=a.value;if(o){if(o==="boolean")t=t==="true";else if(o==="number")t=parseFloat(t);else if(o==="object")try{t=JSON.parse(t)}catch(K){}}return t}function Ea(a,t){if(a.type==="checkbox")if(st(a.value))a.checked=t;else{var o=String(a.value).split(","),p=Ce()(o,2),s=p[0],c=p[1];a.checked=s==t}else if(a.type==="radio"){var f=a.name,P=document.querySelectorAll('input[type="radio"][name="'.concat(f,'"]')),$=S()(P),z;try{for($.s();!(z=$.n()).done;){var G=z.value,K=G.dataset.typeof;K?K==="boolean"?G.checked=G.value===String(t):K==="number"?G.checked=parseFloat(G.value)===t:G.checked=G.value==t:G.checked=G.value==t}}catch(J){$.e(J)}finally{$.f()}}else a.value=t}function ba(a,t,o){if(!o)return t;if(Array.isArray(t)&&It(o))return t[o];if(x()(t)==="object")return t[o];if(typeof t=="string"){var p=t.match(new RegExp(o));if(p)return p.length===1?p[0]:p[1]}return t}function Kt(a,t,o,p){var s=o.fromState||ba,c=!1;return a.inputs.forEach(function(f){if(p){if(f.type==="checkbox")st(f.value)&&!Wt(t)&&(f.value="".concat(t,","));else if(f.type==="radio"&&Wt(t)){var P,$=(P=o.ref)===null||P===void 0?void 0:P.current;if($){var z=$.querySelectorAll(':scope input[type="radio"][name="'.concat(f.name,'"]'));if(z.length>1){var G=Array.from(z).findIndex(function(ee){return ee.value==="true"});f.value=String(G<0)}}}f.dataset.typeof=Array.isArray(t)?"array":x()(t)}var K=f.dataset.fieldPart,J=Ut(f),re=s(a.path,t,K);(p||J!==re)&&(Ea(f,re),c=!0)}),c}function ht(a){var t;return xt(a)?[a]:(t=a.querySelectorAll("input,textarea,select"),Array.from(t))}function gt(a,t){if(a)try{a.classList&&t.split(/\s+/).forEach(function(o){a.classList.add(o)})}catch(o){}}var Ca=function(){function a(t,o){T()(this,a),C()(this,"_onInvalid",void 0),C()(this,"_invalids",[]),this.store=t,this.formCtx=o,this._onInvalid=this.onInvalid.bind(this),this.attach()}return l()(a,[{key:"form",get:function(){return this.formCtx.formRef.current}},{key:"options",get:function(){return this.formCtx.options}},{key:"fields",get:function(){return this.formCtx.fields}},{key:"attach",value:function(){this.form.addEventListener("invalid",this._onInvalid,!0)}},{key:"detach",value:function(){this.form.removeEventListener("invalid",this._onInvalid,!0),this._invalids=[]}},{key:"onInvalid",value:function(o){var p=o.target}},{key:"setValid",value:function(o){this.formCtx.setValid(o)}},{key:"updateInvalids",value:function(o,p){p?pa(this._invalids,o):this._invalids.includes(o)||this._invalids.push(o),this.setValid(this._invalids.length===0)}},{key:"validateAll",value:function(){for(var o=this,p=0,s=Object.values(this.fields);p<s.length;p++){var c=s[p];c.forEach(function(f){o.validate(f.el)})}}},{key:"validate",value:function(o){var p=this.options.validate,s=p&&lt(p),c=this.getFieldName(o);if(c){var f={path:c,value:!0,error:null},P=ht(o),$=S()(P),z;try{for($.s();!(z=$.n()).done;){var G=z.value;G&&G.checkValidity&&!G.checkValidity()?(f.value=!1,f.error=G.validationMessage):(f.value=!0,f.error=null),this.updateInvalids(c,f.value),this.report(o,f)}}catch(xe){$.e(xe)}finally{$.f()}if(s){var K=ht(o),J=S()(K),re;try{for(J.s();!(re=J.n()).done;){var ee=re.value,ce=ee.value,Ie=ee.getAttribute(fa),ie=p(c,ce,Ie,o);typeof ie=="boolean"?(f.value=ie,f.error=o.dataset.errorTips||"ERROR"):typeof ie=="string"&&(f.value=!1,f.error=ie),this.updateInvalids(c,f.value),ee&&ee.setCustomValidity&&this.options.customReport&&ee.setCustomValidity(f.error||""),this.report(o,f)}}catch(xe){J.e(xe)}finally{J.f()}}return f}}},{key:"getFieldName",value:function(o){return o.getAttribute("name")||o.getAttribute("data-field-name")}},{key:"getFieldRelElements",value:function(o){var p=this.getFieldName(o);if(!p)return[];var s=[];return this.fields[p]&&this.fields[p].forEach(function(c){s.push(c.el),s.push.apply(s,I()(c.inputs))}),s}},{key:"getReportElements",value:function(o,p){if(!o)return[];var s=this.getFieldName(o),c=this.form.querySelectorAll("[data-validate-field='".concat(s,"']"));return c&&c.forEach(function(f){gt(f,qe)}),c}},{key:"toggleReport",value:function(o,p){p.value?this.hideReport(o,p):this.showReport(o,p)}},{key:"showReport",value:function(o,p){var s=this.getReportElements(o,p),c=p.error||o.dataset.invalidTips||"ERROR";s&&c&&s.forEach(function(P){P.innerHTML=c,P.style.display="block",gt(P,qe)});var f=this.getFieldRelElements(o);f.forEach(function(P){gt(P,qe)})}},{key:"hideReport",value:function(o,p){var s=this.getReportElements(o,p);s&&s.forEach(function(f){f.classList.contains(qe)&&(f.style.display="none"),kt(f,qe)});var c=this.getFieldRelElements(o);c.forEach(function(f){kt(f,qe)})}},{key:"report",value:function(o,p){var s=this.options.customReport!==!1;if(s)this.toggleReport(o,p);else{var c=ht(o);c.forEach(function(f){f.reportValidity()})}}},{key:"reportAll",value:function(){this.form.reportValidity()}}]),a}();function Oa(a){return a===!0}function Sa(a,t,o){var p=o.entry,s=p===void 0?[]:p,c=a.getSnap({entry:s});Object.entries(t).forEach(function(f){var P=Ce()(f,2),$=P[0],z=P[1],G=[].concat(I()(s),I()($.split(oe))),K=ae(c,G,Ft);K!==Ft&&z.forEach(function(J){J.initial=K,Kt(J,K,o,!0)})})}function Ba(a,t){var o=t.current,p=t.current.options;return function(s){var c=(0,m.useRef)(!1),f=(0,m.useCallback)(function(){var P=p.ref.current;if(P){var $=!0;if(o.fields=ha(P,p.findFields),st(o.fields)){a.log("No fields found in the autoform","warn");return}o.validator=new Ca(a,o),Sa(a,o.fields,p),Oa(p.validAtInit)||o.validator.validateAll(),c.current=!0,o.setValid($),o.setDirty(!1)}},[]);return(0,m.useEffect)(function(){var P=p.ref.current;if(P){var $=p.entry,z=$===void 0?[]:$;!c.current&&P&&f();var G=a.watch(function(J){var re=J.path,ee=J.value;if(et(z,re)){var ce=re.join(oe);if(ce in o.fields){var Ie=o.fields[ce];Ie&&Ie.forEach(function(ie){Kt(ie,ee,o.options)&&o.validator.validate(ie.el)})}}}),K=function(re){var ee,ce=re.target,Ie=ce.name;if(Ie){var ie=Ut(ce);(ee=o.validator.validate(ce))!==null&&ee!==void 0&&ee.value&&(_a(a,ce,Ie,ie,o.options),o.setDirty())}};return P.addEventListener("input",K),function(){G.off(),P.removeEventListener("input",K),c.current=!1}}},[]),(0,Ne.jsx)("form",Be()(Be()({},s),{},{ref:p.ref,children:s.children}))}}function Na(a,t){var o=t.current,p=t.current.options;return m.memo(function(s){var c=s.render,f=s.name,P=(0,m.useRef)(null),$=a.useReactive(s.name,!0),z=Ce()($,1),G=z[0];(0,m.useEffect)(function(){},[]);var K={value:G,onChange:function(re,ee){var ce=re.target;if(typeof ee=="function")a.batchUpdate(function(ie){ee(ie)});else if(typeof f=="string"&&!xt(ce)){var Ie=new CustomEvent("input",{detail:{value:ee}});ce.dispatchEvent(Ie)}}};return(0,Ne.jsx)(Ne.Fragment,{children:c(K)})},function(){return!0})}function Pa(){var a=(0,m.useRef)(null),t=(0,m.useRef)(null),o=(0,m.useRef)(null),p=(0,m.useRef)(null),s=(0,m.useRef)(null),c=arguments[1]||{};c.ref||(c.ref=o),s.current||(s.current=arguments[0]instanceof at?arguments[0]:new at(arguments[0],arguments[1]));var f=(0,m.useState)(!0),P=Ce()(f,2),$=P[0],z=P[1],G=(0,m.useState)(!1),K=Ce()(G,2),J=K[0],re=K[1],ee=s.current;return a.current||(p.current={options:c,setDirty:function(){var Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return re(Ie)},setValid:z,state:ae(ee.state,c.entry||[]),formRef:o},a.current=Ba(ee,p),t.current=Na(ee,p)),(0,m.useEffect)(function(){return function(){var ce;a.current=null,t.current=null,p.current=null,(ce=s.current)===null||ce===void 0||ce.destroy(),s.current=null}},[]),Be()(Be()({},ee),{},{state:ee.state,Form:a.current,Field:t.current,valid:$,dirty:J})}function Aa(a,t){var o=(0,m.useRef)();return o.current||(o.current=new at(a,t)),(0,m.useEffect)(function(){return function(){var p;(p=o.current)===null||p===void 0||p.destroy(),o.current=void 0}},[]),o.current}},88970:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(65192);const l=[]},92460:function(te,b,e){e.r(b),e.d(b,{texts:function(){return l}});var V=e(63408);const l=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
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
