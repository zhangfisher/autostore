(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[904],{1801:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(77643),U={}},44887:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return d}});var k=e(24325),n=e.n(k),U=e(29008),D=e.n(U),E=e(28633),x=e.n(E),P=e(70958),A=e.n(P),u=e(92379),j=e(61668),C=e(44970),y=e(19644),c=e(77101),d={"docs-exmaples-get-repos-demo-0":{component:u.memo(u.lazy(A()(D()().mark(function l(){var a,r,o,v,t,_,g,N,b,B,R,O,L,W,z;return D()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return ae.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=ae.sent,r=a.computed,o=a.createStore,ae.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return v=ae.sent,t=v.Input,_=v.Box,g=v.Button,ae.next=13,Promise.resolve().then(e.bind(e,77101));case 13:return N=ae.sent,b=N.api,B=o({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:r(function(){var X=A()(D()().mark(function M(V,q){var w,Z,J;return D()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return w=x()(V,1),Z=w[0],J=q.abortSignal,oe.next=4,new Promise(function(ve,F){J.addEventListener("abort",function(){F("cancelled")}),b.getProjects(Z).then(function(K){ve(K)}).catch(function(K){F(K)})});case 4:case"end":return oe.stop()}},M)}));return function(M,V){return X.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),R=B.state,O=B.bind,L=B.$,W=B.useState,z=B.useAsyncState,ae.abrupt("return",{default:function(){var M=W("user.repo"),V=x()(M,1),q=V[0],w=z("user.projects");return u.createElement("div",null,u.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),u.createElement(t,n()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:q},O("user.repo"))),u.createElement(g,{onClick:function(){return R.user.projects.run()}},"\u91CD\u8BD5"),u.createElement(g,{onClick:function(){return R.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),u.createElement(_,null,u.createElement("table",{className:"projects-list"},u.createElement("thead",null,u.createElement("tr",null,u.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),u.createElement("td",null,u.createElement("b",null,"\u8BF4\u660E")),u.createElement("td",null,u.createElement("b",null,"\u661F")))),u.createElement("tbody",null,w.loading?u.createElement("tr",null,u.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):w.error?u.createElement("tr",null,u.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",w.error)):w.value&&w.value.map(function(Z,J){return u.createElement("tr",{key:J},u.createElement("td",null,u.createElement("a",{href:Z.url,target:"__blank"},Z.name)),u.createElement("td",null,Z.description),u.createElement("td",null,Z.stars))})))))}});case 17:case"end":return ae.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y,"autostore-docs":c},renderOpts:{compile:function(){var l=A()(D()().mark(function r(){var o,v=arguments;return D()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,e.e(39).then(e.bind(e,39039));case 2:return _.abrupt("return",(o=_.sent).default.apply(o,v));case 3:case"end":return _.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}}}},16960:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(28627),U={}},87524:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return c}});var k=e(24325),n=e.n(k),U=e(28633),D=e.n(U),E=e(29008),x=e.n(E),P=e(70958),A=e.n(P),u=e(92379),j=e(46267),C=e(44970),y=e(19644),c={"docs-guide-computed-async-demo-0":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R;return x()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.delay,r=l.createStore,o=l.computed,L.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return v=L.sent,t=v.Input,_=v.ColorBlock,g=r({user:{firstName:"Zhang",lastName:"Fisher",fullName:o(function(){var W=A()(x()().mark(function z(ne){return x()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,a(1e3);case 2:return X.abrupt("return",ne.firstName+" "+ne.lastName);case 3:case"end":return X.stop()}},z)}));return function(z){return W.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),N=g.useAsyncState,b=g.useState,B=g.state,R=g.bind,L.abrupt("return",{default:function(){var z=b("user.firstName"),ne=D()(z,1),ae=ne[0],X=b("user.lastName"),M=D()(X,1),V=M[0],q=N("user.fullName");return u.createElement(u.Fragment,null,u.createElement(t,n()({label:"firstName",value:ae},R("user.firstName"))),u.createElement(t,n()({label:"lastName",value:V},R("user.lastName"))),u.createElement(_,{name:"FullName",loading:q.loading},q.value))}});case 13:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-1":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g;return x()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=b.sent,a=l.useStore,r=l.computed,o=l.delay,b.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return v=b.sent,t=v.ColorBlock,_=v.Button,g=v.JsonView,b.abrupt("return",{default:function(){var R=a({firstName:"Zhang",lastName:"Fisher",fullName:r(function(){var ne=A()(x()().mark(function ae(X){return x()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,o();case 2:if(!X.triggerError){V.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return V.abrupt("return",X.firstName+" "+X.lastName);case 5:case"end":return V.stop()}},ae)}));return function(ae){return ne.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),O=R.state,L=R.$,W=R.useAsyncState,z=W("fullName");return u.createElement("div",null,u.createElement(t,{name:"FirstName"},L("firstName")),u.createElement(t,{name:"FirstName"},L("lastName")),u.createElement(t,{name:"FullName",loading:z.loading},z.loading?"\u6B63\u5728\u8BA1\u7B97...":z.error?"ERROR:".concat(z.error):z.value),u.createElement("div",null,u.createElement(_,{onClick:function(){O.triggerError=!1,O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName"),u.createElement(_,{onClick:function(){O.triggerError=!1,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName")),u.createElement("div",null,u.createElement(_,{onClick:function(){O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName with Error"),u.createElement(_,{onClick:function(){O.triggerError=!0,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),u.createElement("div",null,"state.fullName=",u.createElement(g,null,JSON.stringify(z))))}});case 13:case"end":return b.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-2":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R,O,L,W,z;return x()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return ae.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=ae.sent,a=l.delay,r=l.createStore,o=l.computed,v=l.ObserverScopeRef,ae.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=ae.sent,_=t.JsonView,g=t.Button,N=t.Input,b=t.Loading,B=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:o(function(){var X=A()(x()().mark(function M(V,q){var w,Z,J,se,oe;return x()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return w=D()(V,2),Z=w[0],J=w[1],se=q.getProgressbar,oe=se(),F.abrupt("return",new Promise(function(){var K=A()(x()().mark(function H(le){var de;return x()().wrap(function(ie){for(;;)switch(ie.prev=ie.next){case 0:de=1;case 1:if(!(de<=100)){ie.next=8;break}return ie.next=4,a(20);case 4:oe.value(de);case 5:de++,ie.next=1;break;case 8:oe.end(),le(Z*J);case 10:case"end":return ie.stop()}},H)}));return function(H){return K.apply(this,arguments)}}()));case 4:case"end":return F.stop()}},M)}));return function(M,V){return X.apply(this,arguments)}}(),["order.count","order.price"],{scope:v.Depends})}}),R=B.useState,O=B.state,L=B.$,W=B.bind,z=B.useAsyncState,ae.abrupt("return",{default:function(){var M=R("order.count"),V=D()(M,1),q=V[0],w=z("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,O.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,O.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(g,{onClick:function(){return O.order.count--}},"-"),u.createElement(N,n()({value:q},W("order.count"))),u.createElement(g,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",null,w.loading?u.createElement(b,null):null,w.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(w.progress,"%"):w.error?"ERROR:".concat(w.error):w.value)))),u.createElement("div",null,u.createElement(_,null,JSON.stringify(O.order.total))))}});case 16:case"end":return ae.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-3":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R,O,L,W,z,ne;return x()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=X.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,v=l.delay,X.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=X.sent,_=t.Input,g=t.Button,N=t.Loading,b=t.JsonView,B=t.RichLabel,R=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var M=A()(x()().mark(function V(q){var w,Z,J;return x()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return w=D()(q,2),Z=w[0],J=w[1],oe.next=3,v(5e3);case 3:return oe.abrupt("return",Z*J);case 4:case"end":return oe.stop()}},V)}));return function(V){return M.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:o.Depends})}}),O=R.useState,L=R.state,W=R.$,z=R.bind,ne=R.useAsyncState,X.abrupt("return",{default:function(){var V=O("order.count"),q=D()(V,1),w=q[0],Z=ne("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,L.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,L.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(g,{onClick:function(){return L.order.count--}},"-"),u.createElement(_,n()({value:w},z("order.count"))),u.createElement(g,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",null,Z.loading?u.createElement(N,null):null,Z.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(Z.timeout,"ms"):Z.error?u.createElement(B,{text:"ERROR: {".concat(Z.error,"}"),color:"red"}):null)))),u.createElement("div",null,u.createElement(b,null,JSON.stringify(L.order.total))))}});case 17:case"end":return X.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-4":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R,O,L,W,z,ne;return x()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=X.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,v=l.delay,X.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=X.sent,_=t.Input,g=t.Button,N=t.Loading,b=t.JsonView,B=t.RichLabel,R=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var M=A()(x()().mark(function V(q){var w,Z,J;return x()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return w=D()(q,2),Z=w[0],J=w[1],oe.next=3,v(6e3);case 3:return oe.abrupt("return",Z*J);case 4:case"end":return oe.stop()}},V)}));return function(V){return M.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:o.Depends})}}),O=R.useState,L=R.state,W=R.$,z=R.bind,ne=R.useAsyncState,X.abrupt("return",{default:function(){var V=O("order.count"),q=D()(V,1),w=q[0],Z=ne("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,L.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,L.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(g,{onClick:function(){return L.order.count--}},"-"),u.createElement(_,n()({value:w},z("order.count"))),u.createElement(g,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},Z.loading?u.createElement(N,null):null,Z.loading?u.createElement(B,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(Z.timeout,"}\u79D2"),color:"red"}):Z.error?u.createElement(B,{text:"ERROR: {".concat(Z.error,"}"),color:"red"}):null)))),u.createElement("div",null,u.createElement(b,null,JSON.stringify(L.order.total))))}});case 17:case"end":return X.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-5":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R,O,L,W,z,ne;return x()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=X.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,v=l.delay,X.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=X.sent,_=t.Input,g=t.Button,N=t.Loading,b=t.JsonView,B=t.RichLabel,R=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var M=A()(x()().mark(function V(q){var w,Z,J;return x()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return w=D()(q,2),Z=w[0],J=w[1],oe.next=3,v();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return oe.stop()}},V)}));return function(V){return M.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:o.Depends})}}),O=R.useState,L=R.state,W=R.$,z=R.bind,ne=R.useAsyncState,X.abrupt("return",{default:function(){var V=O("order.count"),q=D()(V,1),w=q[0],Z=ne("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,L.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,L.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(g,{onClick:function(){return L.order.count--}},"-"),u.createElement(_,n()({value:w},z("order.count"))),u.createElement(g,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},Z.loading?u.createElement(N,null):null,Z.loading?u.createElement(B,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):Z.error&&u.createElement(B,{text:"\u51FA\u9519: {".concat(Z.error,"}"),color:"red"}),Z.retry>0&&u.createElement(B,{text:"\u91CD\u8BD5: {".concat(Z.retry,"}"),color:"red"}))))),u.createElement("div",null,u.createElement(b,null,JSON.stringify(L.order.total))))}});case 17:case"end":return X.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-6":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R,O,L,W,z;return x()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return ae.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=ae.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,ae.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return v=ae.sent,t=v.Input,_=v.Button,g=v.Loading,N=v.JsonView,b=v.RichLabel,B=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var X=A()(x()().mark(function M(V,q){var w,Z,J,se;return x()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return w=D()(V,2),Z=w[0],J=w[1],se=q.abortSignal,ve.abrupt("return",new Promise(function(F,K){var H=setTimeout(function(){F(Z*J)},1e6);se.addEventListener("abort",function(){clearTimeout(H),K("cancelled")})}));case 3:case"end":return ve.stop()}},M)}));return function(M,V){return X.apply(this,arguments)}}(),["order.count","order.price"],{scope:o.Depends})}}),R=B.useState,O=B.state,L=B.$,W=B.bind,z=B.useAsyncState,ae.abrupt("return",{default:function(){var M=R("order.count"),V=D()(M,1),q=V[0],w=z("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,O.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,O.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(_,{onClick:function(){return O.order.count--}},"-"),u.createElement(t,n()({value:q},W("order.count"))),u.createElement(_,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},w.loading?u.createElement(g,null):null,w.loading?u.createElement(b,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):w.error&&u.createElement(b,{text:"\u51FA\u9519: {".concat(w.error,"}"),color:"red"}),w.loading&&u.createElement(_,{onClick:function(){return w.cancel()}},"\u53D6\u6D88"))))),u.createElement("div",null,u.createElement(N,null,JSON.stringify(O.order.total))))}});case 16:case"end":return ae.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-7":{component:u.memo(u.lazy(A()(x()().mark(function d(){var l,a,r,o,v,t,_,g;return x()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=b.sent,a=l.createStore,b.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=b.sent,o=r.ColorBlock,v=r.Button,t=a({bookName:"ZhangFisher",price:100,count:3,total:function(){var B=A()(x()().mark(function O(L){return x()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.abrupt("return",L.price*L.count);case 1:case"end":return z.stop()}},O)}));function R(O){return B.apply(this,arguments)}return R}()}),_=t.state,g=t.$,b.abrupt("return",{default:function(){return u.createElement("div",null,u.createElement(o,{name:"\u4E66\u540D"},g("bookName")),u.createElement(o,{name:"\u4EF7\u683C"},g("price")),u.createElement(o,{name:"\u6570\u91CF"},u.createElement(v,{onClick:function(){return _.count--}},"-"),g("count"),u.createElement(v,{onClick:function(){return _.count++}},"+")),u.createElement(o,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},g("total.value",{errorBoundary:function(O){var L=O.error;return u.createElement(u.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",L.message)}})),u.createElement(o,{name:"state.total"},String(_.total)))}});case 11:case"end":return b.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(x()().mark(function a(){var r,o=arguments;return x()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},60409:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return C}});var k=e(29008),n=e.n(k),U=e(28633),D=e.n(U),E=e(70958),x=e.n(E),P=e(92379),A=e(25231),u=e(44970),j=e(19644),C={"docs-guide-computed-create-demo-0":{component:P.memo(P.lazy(x()(n()().mark(function y(){var c,d,l,a,r,o,v;return n()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=_.sent,d=c.createStore,l=c.computed,_.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return a=_.sent,r=a.ColorBlock,o=a.Button,v=d({order:{price:100,count:3,total1:function(N){return N.price*N.count},total2:l(function(g){return g.price*g.count})}}),_.abrupt("return",{default:function(){var N=v.useState(),b=D()(N,2),B=b[0],R=b[1];return P.createElement("div",null,P.createElement(r,{name:"Price"},B.order.price),P.createElement(r,{name:"Count"},B.order.count),P.createElement(r,{name:"Total 1"},B.order.total1),P.createElement(r,{name:"Total 2"},B.order.total2),P.createElement(o,{onClick:function(){return R(function(L){return L.order.count++})}},"Count++"))}});case 12:case"end":return _.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(n()().mark(function d(){var l,a=arguments;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}}}},71252:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(83717),U={}},87755:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(76938),P=e(44970),A=e(19644),u={"docs-guide-computed-getter-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o,v,t,_;return n()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=N.sent,y=C.createStore,c=C.computed,d=C.delay,N.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=N.sent,a=l.ColorBlock,r=l.Button,o=y({order:{price:100,count:3,total:c(function(){var b=D()(n()().mark(function B(R){return n()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,d(1e3);case 2:return L.abrupt("return",R.price*R.count);case 3:case"end":return L.stop()}},B)}));return function(B){return b.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),v=o.state,t=o.$,_=o.computedObjects,N.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",_.get("total")),E.createElement("div",null,E.createElement(a,{name:"price"},t("order.price")),E.createElement(a,{name:"count"},t("order.count")),E.createElement(a,{name:"Total"},t(function(B){var R=B.value,O=B.loading;return E.createElement("div",null,O?"\u8BA1\u7B97\u4E2D...":R+1e3)},"order.total")),E.createElement(r,{onClick:function(){return v.order.count++}},"Count++"),E.createElement(r,{onClick:function(){return _.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return N.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},18731:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return l}});var k=e(12027),n=e.n(k),U=e(34180),D=e.n(U),E=e(28633),x=e.n(E),P=e(29008),A=e.n(P),u=e(70958),j=e.n(u),C=e(92379),y=e(87480),c=e(44970),d=e(19644),l={"docs-guide-computed-objects-demo-0":{component:C.memo(C.lazy(j()(A()().mark(function a(){var r,o,v,t,_,g,N,b,B;return A()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return r=O.sent,o=r.createStore,v=r.computed,O.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return t=O.sent,_=t.Divider,g=t.ColorBlock,N=t.Button,b=0,B=o({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(W){return W.firstName+W.lastName+"".concat(++b)},fullName2:v(function(){var L=j()(A()().mark(function W(z){return A()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return ae.abrupt("return",z.firstName+z.lastName+"".concat(++b));case 1:case"end":return ae.stop()}},W)}));return function(W){return L.apply(this,arguments)}}(),["./firstName","./lastName"])}}),O.abrupt("return",{default:function(){var W=B.useState(),z=x()(W,1),ne=z[0];return C.createElement("div",null,C.createElement(g,{name:"FirstName"},ne.user.firstName),C.createElement(g,{name:"lastName"},ne.user.lastName),C.createElement(g,{name:"FullName",value:ne.user.fullName}),C.createElement(g,{name:"FullName2",value:ne.user.fullName2.value}),C.createElement(_,null),C.createElement("div",null,"typeof(store.computedObjects)==",D()(B.computedObjects)),C.createElement("div",null,"store.computedObjects instanceof Map=",String(B.computedObjects instanceof Map)),C.createElement("div",null,"store.computedObjects.size=",B.computedObjects.size),C.createElement("div",null,"store.computedObjects.size=",B.computedObjects.size),C.createElement("div",null,"store.computedObjects.keys()=",n()(B.computedObjects.keys()).join(" , ")),C.createElement(N,{onClick:function(){return B.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),C.createElement(N,{onClick:function(){return B.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),C.createElement(N,{onClick:function(){return B.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return O.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":c,"x-react-components":d},renderOpts:{compile:function(){var a=j()(A()().mark(function o(){var v,t=arguments;return A()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(39).then(e.bind(e,39039));case 2:return g.abrupt("return",(v=g.sent).default.apply(v,t));case 3:case"end":return g.stop()}},o)}));function r(){return a.apply(this,arguments)}return r}()}}}},87336:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(15968),U={}},58217:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(49613),U={}},87237:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(87975),P=e(44970),A=e(19644),u={"docs-guide-computed-scope-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l;return n()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,y=C.ObserverScopeRef,c=C.useStore,r.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var v=c({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}},{scope:function(){return y.Current}}),t=v.state;return E.createElement("div",null,E.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-1":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l;return n()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,y=C.useStore,c=C.ObserverScopeRef,r.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.user.firstName+g.user.lastName}}},{scope:c.Root}),t=v.state;return E.createElement("div",null,E.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-2":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r;return n()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=v.sent,y=C.createStore,c=C.ObserverScopeRef,v.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=v.sent,l=d.ColorBlock,a=y({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(_){return _.user.firstName+_.user.lastName}}}},{scope:c.Parent}),r=a.state,v.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(l,{name:"FullName"},r.parent.user.fullName))}});case 11:case"end":return v.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-3":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,y=C.createStore,o.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=o.sent,d=c.ColorBlock,l=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),a=l.state,o.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-4":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,y=C.createStore,o.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=o.sent,d=c.ColorBlock,l=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),a=l.state,o.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-5":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,y=C.createStore,c=C.computed,d=C.ObserverScopeRef,t.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=t.sent,a=l.ColorBlock,r=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:c(function(){var _=D()(n()().mark(function g(N){return n()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.abrupt("return",N[0]+N[1]);case 1:case"end":return B.stop()}},g)}));return function(g){return _.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:d.Depends})}}),o=r.state,t.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(a,{name:"FullName"},o.user.fullName.value))}});case 12:case"end":return t.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},46369:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return C}});var k=e(29008),n=e.n(k),U=e(28633),D=e.n(U),E=e(70958),x=e.n(E),P=e(92379),A=e(48120),u=e(44970),j=e(19644),C={"docs-guide-computed-sync-demo-0":{component:P.memo(P.lazy(x()(n()().mark(function y(){var c,d,l,a,r,o;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=t.sent,d=c.createStore,t.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=t.sent,a=l.ColorBlock,r=l.Button,o=d({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}}),t.abrupt("return",{default:function(){var g=o.useState(),N=D()(g,2),b=N[0],B=N[1];return P.createElement("div",null,P.createElement(a,{name:"First Name"},b.user.firstName),P.createElement(a,{name:"Last Name"},b.user.lastName),P.createElement(a,{name:"Full Name"},b.user.fullName),P.createElement(r,{onClick:function(){return B(function(O){return O.user.firstName="\u2764\uFE0F"+O.user.firstName})}},"Change First Name"),P.createElement(r,{onClick:function(){return B(function(O){return O.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return t.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(n()().mark(function d(){var l,a=arguments;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}},"docs-guide-computed-sync-demo-1":{component:P.memo(P.lazy(x()(n()().mark(function y(){var c,d,l,a,r;return n()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=v.sent,d=c.createStore,v.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=v.sent,a=l.Button,r=d({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(_){return _.price*_.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(_){return _.price*_.count}}],total:function(_){return _.books.reduce(function(g,N){return g+N.total},0)}}),v.abrupt("return",{default:function(){var _=r.useState(),g=D()(_,2),N=g[0],b=g[1];return P.createElement("table",{className:"table table-bordered table-hover"},P.createElement("thead",null,P.createElement("tr",null,P.createElement("th",null,"\u4E66\u540D"),P.createElement("th",null,"\u4F5C\u8005"),P.createElement("th",null,"\u5355\u4EF7"),P.createElement("th",null,"\u6570\u91CF"),P.createElement("th",null,"\u5C0F\u8BA1"))),P.createElement("tbody",null,N.books.map(function(B,R){return P.createElement("tr",{key:R},P.createElement("td",null,B.name),P.createElement("td",null,B.author),P.createElement("td",null,B.price),P.createElement("td",null,P.createElement(a,{onClick:function(){return r.state.books[R].count--}},"-"),B.count,P.createElement(a,{onClick:function(){return r.state.books[R].count++}},"+")),P.createElement("td",null,B.total))}),P.createElement("tr",null,P.createElement("td",{colSpan:4},"\u603B\u8BA1"),P.createElement("td",null,N.total))))}});case 10:case"end":return v.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(n()().mark(function d(){var l,a=arguments;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}}}},21037:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(93359),U={}},31996:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(76233),U={}},15274:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return c}});var k=e(29008),n=e.n(k),U=e(24325),D=e.n(U),E=e(28633),x=e.n(E),P=e(70958),A=e.n(P),u=e(92379),j=e(97820),C=e(44970),y=e(19644),c={"docs-guide-form-bind-demo-0":{component:u.memo(u.lazy(A()(n()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B;return n()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=O.sent,a=l.createStore,O.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=O.sent,o=r.ColorBlock,v=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(W){return W.firstName+W.lastName}}}),g=_.state,N=_.$,b=_.bind,B=_.useState,O.abrupt("return",{default:function(){var W=B("user.firstName"),z=x()(W,2),ne=z[0],ae=z[1],X=B("user.lastName"),M=x()(X,2),V=M[0],q=M[1],w=B("user.vip"),Z=x()(w,2),J=Z[0],se=Z[1];return u.createElement("div",null,u.createElement(t,D()(D()({label:"First Name"},b("user.firstName")),{},{value:ne})),u.createElement(t,D()(D()({label:"last Name"},b("user.lastName")),{},{value:V})),u.createElement(t,D()(D()({type:"checkbox",label:"VIP"},b("user.vip")),{},{value:J})),u.createElement(o,{name:"First Name"},N("user.firstName")),u.createElement(o,{name:"Last Name"},N("user.lastName")),u.createElement(o,{name:"Full Name"},N("user.fullName")),u.createElement(o,{name:"VIP"},N("user.vip")),u.createElement(v,{onClick:function(){ae("Zhang"),q("Fisher")}},"Reset"))}});case 12:case"end":return O.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(n()().mark(function a(){var r,o=arguments;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},95668:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return C}});var k=e(29008),n=e.n(k),U=e(24325),D=e.n(U),E=e(70958),x=e.n(E),P=e(92379),A=e(36339),u=e(44970),j=e(19644),C={"docs-guide-form-bindings-demo-0":{component:P.memo(P.lazy(x()(n()().mark(function y(){var c,d,l,a,r,o;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=t.sent,d=c.useStore,t.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=t.sent,a=l.ColorBlock,r=l.Button,o=l.Input,t.abrupt("return",{default:function(){var g=d({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),N=g.state,b=g.$,B=g.useFormBindings,R=B();return P.createElement("div",null,P.createElement(o,D()({label:"First Name"},R.user.firstName)),P.createElement(o,D()({label:"last Name"},R.user.lastName)),P.createElement(o,D()({label:"Age"},R.user.age)),P.createElement(o,D()({type:"checkbox",label:"VIP"},R.user.vip)),P.createElement(a,{name:"First Name"},b("user.firstName")),P.createElement(a,{name:"Last Name"},b("user.lastName")),P.createElement(a,{name:"Age"},b("user.age")),P.createElement(a,{name:"VIP"},b("user.vip")),P.createElement(r,{onClick:function(){N.user.firstName="Zhang",N.user.lastName="Fisher",N.user.age=18,N.user.vip=!1}},"Reset"))}});case 11:case"end":return t.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-form-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"
 
export default ()=>{

  const { state, $, useFormBindings } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }
  })

  const bindings = useFormBindings()

  return <div>    
    <Input label="First Name" {...bindings.user.firstName}/>
    <Input label="last Name" {...bindings.user.lastName} />
    <Input label="Age" {...bindings.user.age}/>
    <Input type="checkbox" label="VIP" {...bindings.user.vip} />
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(n()().mark(function d(){var l,a=arguments;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}}}},72433:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return c}});var k=e(28633),n=e.n(k),U=e(29008),D=e.n(U),E=e(24325),x=e.n(E),P=e(70958),A=e.n(P),u=e(92379),j=e(45889),C=e(44970),y=e(19644),c={"docs-guide-form-use-input-demo-0":{component:u.memo(u.lazy(A()(D()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R;return D()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.createStore,L.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=L.sent,o=r.ColorBlock,v=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),g=_.state,N=_.$,b=_.bind,B=_.useState,R=_.useInput,L.abrupt("return",{default:function(){var z=R("user.firstName"),ne=R("user.lastName"),ae=R("user.vip"),X=R("user.job");return u.createElement("div",null,u.createElement(t,x()({label:"First Name"},z)),u.createElement(t,x()({label:"last Name"},ne)),u.createElement(t,x()({type:"checkbox",label:"VIP"},ae)),u.createElement(o,{name:"Job"},u.createElement("select",x()({id:"job"},X),u.createElement("option",{value:"1"},"Engineer"),u.createElement("option",{value:"2"},"Doctor"),u.createElement("option",{value:"3"},"Teacher"))),u.createElement(o,{name:"First Name"},N("user.firstName")),u.createElement(o,{name:"Last Name"},N("user.lastName")),u.createElement(o,{name:"VIP"},N("user.vip")),u.createElement(o,{name:"Job"},N("user.job")),u.createElement(v,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useInput"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(D()().mark(function a(){var r,o=arguments;return D()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-1":{component:u.memo(u.lazy(A()(D()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B,R;return D()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.createStore,L.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=L.sent,o=r.ColorBlock,v=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher"}}),g=_.state,N=_.$,b=_.bind,B=_.useState,R=_.useInput,L.abrupt("return",{default:function(){var z=R(function(ne){return ne.user.firstName+" "+ne.user.lastName},function(ne,ae){var X=ne.split(/\s+/),M=n()(X,2),V=M[0],q=M[1];ae.user.firstName=V,ae.user.lastName=q});return u.createElement("div",null,u.createElement(t,x()({label:"FullName"},z)),u.createElement(o,{name:"First Name"},N("user.firstName")),u.createElement(o,{name:"Last Name"},N("user.lastName")),u.createElement(v,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(D()().mark(function a(){var r,o=arguments;return D()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-2":{component:u.memo(u.lazy(A()(D()().mark(function d(){var l,a,r,o,v,t,_,g,N,b,B;return D()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=O.sent,a=l.createStore,O.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=O.sent,o=r.ColorBlock,v=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),g=_.state,N=_.$,b=_.bind,B=_.useInput,O.abrupt("return",{default:function(){var W=B("user");return u.createElement("div",null,u.createElement(t,x()({label:"First Name"},W.firstName)),u.createElement(t,x()({label:"last Name"},W.lastName)),u.createElement(t,x()({label:"Age"},W.age)),u.createElement(t,x()({type:"checkbox",label:"VIP"},W.vip)),u.createElement(o,{name:"First Name"},N("user.firstName")),u.createElement(o,{name:"Last Name"},N("user.lastName")),u.createElement(o,{name:"Age"},N("user.age")),u.createElement(o,{name:"VIP"},N("user.vip")),u.createElement(v,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher",g.user.age=18,g.user.vip=!1}},"Reset"))}});case 12:case"end":return O.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(D()().mark(function a(){var r,o=arguments;return D()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-3":{component:u.memo(u.lazy(A()(D()().mark(function d(){var l,a,r,o,v,t;return D()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=g.sent,a=l.useStore,g.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=g.sent,o=r.ColorBlock,v=r.Button,t=r.Input,g.abrupt("return",{default:function(){var b=a({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),B=b.state,R=b.$,O=b.bind,L=b.useInput,W=L();return u.createElement("div",null,u.createElement(t,x()({label:"First Name"},W.firstName)),u.createElement(t,x()({label:"last Name"},W.lastName)),u.createElement(t,x()({label:"Age"},W.age)),u.createElement(t,x()({type:"checkbox",label:"VIP"},W.vip)),u.createElement(o,{name:"First Name"},R("firstName")),u.createElement(o,{name:"Last Name"},R("lastName")),u.createElement(o,{name:"Age"},R("age")),u.createElement(o,{name:"VIP"},R("vip")),u.createElement(v,{onClick:function(){B.firstName="Zhang",B.lastName="Fisher",B.age=18,B.vip=!1}},"Reset"))}});case 11:case"end":return g.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":y},renderOpts:{compile:function(){var d=A()(D()().mark(function a(){var r,o=arguments;return D()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},50090:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(9159),U={}},91775:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(61077),U={}},74905:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(47315),U={}},41344:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(26916),U={}},10117:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(3694),U={}},31837:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(4180),P=e(44970),A=e(19644),u={"docs-guide-signal-about-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,y=C.createStore,t.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=t.sent,d=c.Button,l=c.ColorBlock,a=y({age:18}),r=a.state,o=a.$,t.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(l,null,"Age+Signal :",o("age")),E.createElement(l,null,"Age :",r.age),E.createElement(d,{onClick:function(){return r.age=r.age+1}},"+Age"))}});case 11:case"end":return t.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},11296:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(75690),U={}},14787:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(8767),P=e(44970),A=e(19644),u={"docs-guide-signal-computed-render-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l;return n()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,y=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=r.sent,d=c.Button,l=c.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),t=v.state,_=v.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_(function(g){var N=g.value;return E.createElement("div",null,N)},function(g){return g.user.age})),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-computed-render-demo-1":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,y=C.useStore,c=C.computed,o.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=o.sent,l=d.Button,a=d.ColorBlock,o.abrupt("return",{default:function(){var t=y({user:{age:18}}),_=t.state,g=t.$;return E.createElement("div",null,E.createElement(a,{name:"Age"},g(function(N){var b=N.value;return E.createElement("div",null,b)},c(function(N){return N.user.age}))),E.createElement(l,{onClick:function(){return _.user.age++}},"+Age"))}});case 11:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-computed-render-demo-2":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,y=C.useStore,c=C.delay,d=C.computed,t.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,o=l.Loading,t.abrupt("return",{default:function(){var g=y({order:{price:10,count:1}}),N=g.state,b=g.$;return E.createElement("div",null,E.createElement(r,{name:"Price"},b("order.price")),E.createElement(r,{name:"Count"},b("order.count")),E.createElement(r,{name:"Total"},b(function(B){var R=B.value,O=B.loading;return E.createElement("div",null,O?E.createElement(o,{title:"\u8BA1\u7B97\u4E2D..."}):R,"\u{1F4B8}\u{1F4B8}")},d(function(){var B=D()(n()().mark(function R(O){return n()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.next=2,c(1e3);case 2:return W.abrupt("return",O.order.price*O.order.count);case 3:case"end":return W.stop()}},R)}));return function(R){return B.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),E.createElement(a,{onClick:function(){return N.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},14727:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(63518),P=e(44970),A=e(19644),u={"docs-guide-signal-custom-render-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l;return n()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,y=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=r.sent,d=c.Button,l=c.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),t=v.state,_=v.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_(function(g){var N=g.value;return E.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},E.createElement("span",{style:{flexGrow:1}},N),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-custom-render-demo-1":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r;return n()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=v.sent,y=C.useStore,c=C.delay,d=C.computed,v.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=v.sent,a=l.Button,r=l.ColorBlock,v.abrupt("return",{default:function(){var _=y({order:{price:100,count:1,total:d(function(){var R=D()(n()().mark(function O(L){return n()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.next=2,c();case 2:return z.abrupt("return",L.price*L.count);case 3:case"end":return z.stop()}},O)}));return function(O){return R.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),g=_.state,N=_.$,b=_.useAsyncState,B=b("order.total");return E.createElement("div",null,E.createElement(r,{name:"Price"},N("order.price")),E.createElement(r,{name:"Count"},N("order.count")),E.createElement(r,{name:"Total",loading:B.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},N("order.total.value")),E.createElement(r,{name:"Total",loading:B.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},N("order.total")),E.createElement(a,{onClick:function(){return g.order.count++}},"+Count"))}});case 12:case"end":return v.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-custom-render-demo-2":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o,v,t;return n()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=g.sent,y=C.createStore,c=C.computed,d=C.delay,g.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=g.sent,a=l.Button,r=l.ColorBlock,o=y({order:{price:100,count:1,total:c(function(){var N=D()(n()().mark(function b(B){return n()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,d(2e3);case 2:return O.abrupt("return",B.price*B.count);case 3:case"end":return O.stop()}},b)}));return function(b){return N.apply(this,arguments)}}(),["./price","./count"])}}),v=o.state,t=o.$,g.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(r,{name:"Price"},t("order.price")),E.createElement(r,{name:"Count"},t("order.count")),E.createElement(r,{name:"Total"},t(function(b){var B=b.value,R=b.loading;return E.createElement(E.Fragment,null,R&&E.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!R&&E.createElement("span",null,B,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),E.createElement(a,{onClick:function(){return v.order.count++}},"Count++"))}});case 13:case"end":return g.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},67317:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(35371),U={}},5619:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(33358),P=e(44970),A=e(19644),u={"docs-guide-signal-state-render-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l;return n()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,y=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=r.sent,d=c.Button,l=c.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),t=v.state,_=v.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_("user.age")),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-state-render-demo-1":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o,v;return n()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=_.sent,y=C.createStore,_.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=_.sent,d=c.Button,l=c.ColorBlock,a=y({user:{firstName:"\u5F20",lastName:"\u4E09"}}),r=a.state,o=a.signal,v=a.$,_.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(l,{name:"FirstName"},v("user.firstName")),E.createElement(l,{name:"LastName"},v("user.lastName")),E.createElement(l,null,"FullName :",v(function(N){return N.user.firstName+" "+N.user.lastName})),E.createElement(d,{onClick:function(){return r.user.firstName=r.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),E.createElement(d,{onClick:function(){return r.user.lastName=r.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return _.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
      <Button onClick={()=>state.user.firstName=state.user.firstName+'\u2764\uFE0F'}>Change FirstName</Button>
      <Button onClick={()=>state.user.lastName=state.user.lastName+'\u2708\uFE0F'}>Change LastName</Button>
    </div>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-state-render-demo-2":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o,v,t;return n()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=g.sent,y=C.createStore,c=C.delay,d=C.computed,g.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=g.sent,a=l.Button,r=l.ColorBlock,o=y({order:{price:100,count:1,total:d(function(){var N=D()(n()().mark(function b(B){return n()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,c(1e3);case 2:return O.abrupt("return",B.price*B.count);case 3:case"end":return O.stop()}},b)}));return function(b){return N.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),v=o.state,t=o.$,g.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(r,{name:"Price"},t("order.price")),E.createElement(r,{name:"Count"},t("order.count")),E.createElement(r,{name:"Total"},t("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),E.createElement(r,{name:"Total"},t("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),E.createElement(a,{onClick:function(){return v.order.count++}},"+Count"))}});case 13:case"end":return g.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},22234:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(23841),P=e(44970),A=e(19644),u={"docs-guide-signal-watch-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l;return n()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,y=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=r.sent,d=c.Button,l=c.ColorBlock,r.abrupt("return",{default:function(){var v=y({user:{age:18}}),t=v.state,_=v.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_(function(g){var N=g.value;return E.createElement("div",null,N)},function(g){return g.user.age})),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-watch-demo-1":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,y=C.useStore,c=C.computed,o.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=o.sent,l=d.Button,a=d.ColorBlock,o.abrupt("return",{default:function(){var t=y({user:{age:18}}),_=t.state,g=t.$;return E.createElement("div",null,E.createElement(a,{name:"Age"},g(function(N){var b=N.value;return E.createElement("div",null,b)},c(function(N){return N.user.age}))),E.createElement(l,{onClick:function(){return _.user.age++}},"+Age"))}});case 11:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}},"docs-guide-signal-watch-demo-2":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,y=C.useStore,c=C.delay,d=C.computed,t.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,o=l.Loading,t.abrupt("return",{default:function(){var g=y({order:{price:10,count:1}}),N=g.state,b=g.$;return E.createElement("div",null,E.createElement(r,{name:"Price"},b("order.price")),E.createElement(r,{name:"Count"},b("order.count")),E.createElement(r,{name:"Total"},b(function(B){var R=B.value,O=B.loading;return E.createElement("div",null,O?E.createElement(o,{title:"\u8BA1\u7B97\u4E2D..."}):R,"\u{1F4B8}\u{1F4B8}")},d(function(){var B=D()(n()().mark(function R(O){return n()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.next=2,c(1e3);case 2:return W.abrupt("return",O.order.price*O.order.count);case 3:case"end":return W.stop()}},R)}));return function(R){return B.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),E.createElement(a,{onClick:function(){return N.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},16645:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(81897),U={}},77680:function(Y,i,e){"use strict";var k;e.r(i),e.d(i,{demos:function(){return y}});var n=e(29008),U=e.n(n),D=e(28633),E=e.n(D),x=e(70958),P=e.n(x),A=e(92379),u=e(94451),j=e(19644),C=e(44970),y={"docs-guide-store-render-demo-0":{component:A.memo(A.lazy(P()(U()().mark(function c(){var d,l,a,r,o,v,t,_,g,N,b,B;return U()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return d=O.sent,l=d.default,a=d.createContext,r=d.useContext,o=d.useState,O.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return v=O.sent,t=v.ColorBlock,_=v.Button,g=v.Divider,N=a({firstName:"Zhang",lastName:"Fisher",age:18}),b=l.memo(function(L){var W=r(N);return l.createElement(t,{name:"\u5B50\u7EC4\u4EF6:".concat(L.name)},l.createElement("span",null,"Hello :",W.firstName," ",W.lastName))}),B=0,O.abrupt("return",{default:function(){var W=o({firstName:"Zhang",lastName:"Fisher",age:18}),z=E()(W,2),ne=z[0],ae=z[1];return l.createElement(N.Provider,{value:ne},l.createElement(g,{title:"\u6839\u7EC4\u4EF6"}),l.createElement(t,{name:"FullName"},ne.firstName," ",ne.lastName),l.createElement(t,{name:"Age"},"Age :",ne.age),l.createElement(g,{title:"\u5B50\u7EC4\u4EF6"}),l.createElement(b,{name:"A"}),l.createElement(b,{name:"B"}),l.createElement(_,{onClick:function(){ae({firstName:"Zhang",lastName:"Fisher",age:++B})}},"+Age"))}});case 17:case"end":return O.stop()}},c)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{react:k||(k=e.t(A,2)),"x-react-components":j},renderOpts:{compile:function(){var c=P()(U()().mark(function l(){var a,r=arguments;return U()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(39).then(e.bind(e,39039));case 2:return v.abrupt("return",(a=v.sent).default.apply(a,r));case 3:case"end":return v.stop()}},l)}));function d(){return c.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-1":{component:A.memo(A.lazy(P()(U()().mark(function c(){var d,l,a,r,o,v,t,_,g,N,b,B;return U()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=O.sent,l=d.createStore,O.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=O.sent,r=a.default,O.next=10,Promise.resolve().then(e.bind(e,19644));case 10:return o=O.sent,v=o.ColorBlock,t=o.Button,_=o.Divider,g=l({firstName:"Zhang",lastName:"Fisher",age:18}),N=r.memo(function(L){var W=g.useState("firstName"),z=E()(W,1),ne=z[0];return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:FirstName"},ne)}),b=r.memo(function(L){var W=g.useState("lastName"),z=E()(W,1),ne=z[0];return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:lastName"},ne)}),B=0,O.abrupt("return",{default:function(){var W=g.useState("age"),z=E()(W,1),ne=z[0];return r.createElement(r.Fragment,null,r.createElement(_,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(v,{name:"FullName"},"Hello :",g.state.firstName," ",g.state.lastName),r.createElement(v,{name:"Age"},ne),r.createElement(_,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(N,null),r.createElement(b,null),r.createElement(t,{onClick:function(){return g.state.age=g.state.age+1}},"+Age"),r.createElement(t,{onClick:function(){return g.state.firstName=g.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return O.stop()}},c)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,react:k||(k=e.t(A,2)),"x-react-components":j},renderOpts:{compile:function(){var c=P()(U()().mark(function l(){var a,r=arguments;return U()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(39).then(e.bind(e,39039));case 2:return v.abrupt("return",(a=v.sent).default.apply(a,r));case 3:case"end":return v.stop()}},l)}));function d(){return c.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-2":{component:A.memo(A.lazy(P()(U()().mark(function c(){var d,l,a,r,o,v,t,_,g,N,b,B,R,O;return U()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=W.sent,l=d.createStore,W.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=W.sent,r=a.default,W.next=10,Promise.resolve().then(e.bind(e,19644));case 10:return o=W.sent,v=o.ColorBlock,t=o.Button,_=o.Divider,g=l({firstName:"Zhang",lastName:"Fisher",age:18}),N=g.state,b=g.$,B=function(){return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:FirstName"},b("firstName"))},R=function(){return r.createElement(v,{name:"\u5B50\u7EC4\u4EF6:LastName"},b("lastName"))},O=0,W.abrupt("return",{default:function(){return r.createElement(r.Fragment,null,r.createElement(_,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(v,{name:"FullName"},b("firstName")," ",b("lastName")),r.createElement(v,{name:"Age"},b("age")," - ",++O),r.createElement(_,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(B,null),r.createElement(R,null),r.createElement(t,{onClick:function(){return N.age=N.age+1}},"+Age"),r.createElement(t,{onClick:function(){return N.firstName=N.firstName+"."}},"Change FirstName"),r.createElement(t,{onClick:function(){return N.lastName=N.lastName+"*"}},"Change LastName"))}});case 19:case"end":return W.stop()}},c)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,react:k||(k=e.t(A,2)),"x-react-components":j},renderOpts:{compile:function(){var c=P()(U()().mark(function l(){var a,r=arguments;return U()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(39).then(e.bind(e,39039));case 2:return v.abrupt("return",(a=v.sent).default.apply(a,r));case 3:case"end":return v.stop()}},l)}));function d(){return c.apply(this,arguments)}return d}()}}}},33788:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return C}});var k=e(28633),n=e.n(k),U=e(29008),D=e.n(U),E=e(70958),x=e.n(E),P=e(92379),A=e(61786),u=e(44970),j=e(19644),C={"docs-guide-store-state-demo-0":{component:P.memo(P.lazy(x()(D()().mark(function y(){var c,d,l,a,r,o,v,t,_,g;return D()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=b.sent,d=c.createStore,l=c.computed,b.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return a=b.sent,r=a.Button,o=a.ColorBlock,v=d({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(R){return R.firstName+R.lastName},salary:l(function(){var B=x()(D()().mark(function R(O){return D()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.abrupt("return",O.age*10);case 1:case"end":return W.stop()}},R)}));return function(R){return B.apply(this,arguments)}}(),["age"])}),t=v.state,_=v.useState,g=v.$,globalThis.state=t,b.abrupt("return",{default:function(){var R=_("age"),O=n()(R,2),L=O[0],W=O[1],z=_("salary"),ne=n()(z,2),ae=ne[0],X=ne[1],M=_(function(Z){return Z.lastName},function(Z,J){return J.lastName=Z}),V=n()(M,2),q=V[0],w=V[1];return P.createElement("div",null,P.createElement(o,null,"Fullname :",t.firstName," ",q),P.createElement(o,null,"Age :",L),P.createElement(o,null,"Salary: ",g("salary")),P.createElement(r,{onClick:function(){return W(L+1)}},"+Age"),P.createElement(r,{onClick:function(){return w(q+".")}},"Change lastName"))}});case 13:case"end":return b.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(D()().mark(function d(){var l,a=arguments;return D()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}},"docs-guide-store-state-demo-1":{component:P.memo(P.lazy(x()(D()().mark(function y(){var c,d,l,a,r,o,v,t,_,g;return D()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=b.sent,d=c.createStore,b.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=b.sent,a=l.ColorBlock,b.next=10,Promise.resolve().then(e.bind(e,19644));case 10:return r=b.sent,o=r.Button,v=d({firstName:"Zhang",lastName:"Fisher",fullName:function(R){return R.firstName+R.lastName}}),t=v.useState,_=v.state,g=v.$,b.abrupt("return",{default:function(){var R=t(function(M){return M.firstName},function(M,V){return V.firstName=M}),O=n()(R,2),L=O[0],W=O[1],z=t(function(M){return M.fullName},function(M,V){var q=n()(M,2),w=q[0],Z=q[1];V.firstName=w,V.lastName=Z}),ne=n()(z,2),ae=ne[0],X=ne[1];return P.createElement("div",null,P.createElement(a,{name:"FullName",value:ae}),P.createElement(o,{onClick:function(){return W("<".concat(L,">"))}},"Change FirstName"),P.createElement(o,{onClick:function(){return X(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return b.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(D()().mark(function d(){var l,a=arguments;return D()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}},"docs-guide-store-state-demo-2":{component:P.memo(P.lazy(x()(D()().mark(function y(){var c,d,l,a,r,o,v,t;return D()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=g.sent,d=c.createStore,g.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=g.sent,a=l.Button,r=l.ColorBlock,o=d({age:18}),v=o.state,t=o.$,g.abrupt("return",{default:function(){return P.createElement("div",null,P.createElement(r,null,"Age+Signal :",t("age")),P.createElement(r,null,"Age :",v.age),P.createElement(a,{onClick:function(){return v.age=v.age+1}},"+Age"))}});case 11:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(D()().mark(function d(){var l,a=arguments;return D()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}}}},85244:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return u}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(92379),x=e(34450),P=e(44970),A=e(19644),u={"docs-guide-store-demo-0":{component:E.memo(E.lazy(D()(n()().mark(function j(){var C,y,c,d,l,a,r,o,v;return n()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=_.sent,y=C.useStore,_.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return c=_.sent,d=c.Button,l=c.ColorBlock,_.abrupt("return",{default:function(){var N=y({count:18}),b=N.state,B=N.$;return E.createElement("div",null,E.createElement(l,{name:"Count"},B("count")),E.createElement(d,{onClick:function(){return b.count++}},"Count++"))}});case 11:case"end":return _.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":A},renderOpts:{compile:function(){var j=D()(n()().mark(function y(){var c,d=arguments;return n()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(c=a.sent).default.apply(c,d));case 3:case"end":return a.stop()}},y)}));function C(){return j.apply(this,arguments)}return C}()}}}},35860:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(89073),U={}},45988:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return C}});var k=e(29008),n=e.n(k),U=e(28633),D=e.n(U),E=e(70958),x=e.n(E),P=e(92379),A=e(26826),u=e(44970),j=e(19644),C={"docs-guide-watch-objects-demo-0":{component:P.memo(P.lazy(x()(n()().mark(function y(){var c,d,l,a,r,o,v,t,_;return n()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return v=function(B){return l(function(R,O){var L=O.state;return L.price*R},function(R){return R[R.length-1]==="count"},{initial:2,group:B})},N.next=3,Promise.resolve().then(e.bind(e,44970));case 3:return c=N.sent,d=c.createStore,l=c.watch,N.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return a=N.sent,r=a.ColorBlock,o=a.Divider,t={bookName:"zhang",price:2,count:1,total1:v("a"),total2:v("a"),total3:v("b"),total4:v("b"),total5:v("b")},_=d({state:t}),globalThis.Store=_,N.abrupt("return",{default:function(){var B=_.useState(),R=D()(B,2),O=R[0],L=R[1];return typeof O.total1=="function"&&console.warn("state.total1 is function"),P.createElement("div",null,P.createElement("div",null,"bookName=",O.bookName),P.createElement("div",null,"price=",O.price),P.createElement("div",null,"count=",P.createElement("button",{onClick:function(){return L(function(z){return z.count=z.count-1})}},"-"),P.createElement("input",{value:O.count,onChange:_.sync(function(W){return W.count})}),P.createElement("button",{onClick:function(){return L(function(z){return z.count=z.count+1})}},"+")),P.createElement(o,{name:"A Group"}),P.createElement(r,{name:"Total-1",value:O.total1}),P.createElement(r,{name:"Total-2",value:O.total2}),P.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("a",!0)}},"Enable A Group"),P.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("a",!1)}},"Disable A Group"),P.createElement("div",null,"\u5F53\u7981\u7528A Group\u65F6\uFF0C\u4FEE\u6539count\u65F6\u4E0D\u4F1A\u5BFC\u81F4total\u53D8\u5316\uFF0C\u56E0\u4E3A\u8BE5\u7EC4\u88AB\u7981\u6B62\u6267\u884C\u4E86"),P.createElement(o,{name:"B Group"}),P.createElement(r,{name:"Total-3",value:O.total3}),P.createElement(r,{name:"Total-4",value:O.total4}),P.createElement(r,{name:"Total-5",value:O.total5}),P.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("b",!0)}},"Enable B Group"),P.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("b",!1)}},"Disable B Group"))}});case 15:case"end":return N.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,watch } from "@autostorejs/react" 
import { useEffect,useState } from "react"
import { ColorBlock,Divider } from "x-react-components"

function createTotalWatch(group){
  return watch((count,{state})=>{ 
      return state.price * count
    },(valuePath:string[])=>{
      return valuePath[valuePath.length-1]==='count'
    },{
      initial:2,
      group
    }) 
}


const user = {
    bookName:"zhang",
    price:2,
    count:1,
    total1: createTotalWatch("a"),
    total2: createTotalWatch("a"),
    total3: createTotalWatch("b"),
    total4: createTotalWatch("b"),
    total5: createTotalWatch("b")
  } 

const store = createStore({state:user})

globalThis.Store = store

export default ()=>{
  const [state,setState]=store.useState()
  if(typeof(state.total1)==='function'){
   console.warn("state.total1 is function")
   
  }
  return  (<div>
      <div>bookName={state.bookName}</div>
      <div>price={state.price}</div>
      <div>count=
        <button onClick={()=>setState(book=>book.count=book.count-1)}>-</button>
        <input value={state.count} onChange={store.sync(to=>to.count)}/>
        <button onClick={()=>setState(book=>book.count=book.count+1)}>+</button>
      </div>
      <Divider name="A Group"/>
      <ColorBlock name="Total-1" value={state.total1}/>
      <ColorBlock name="Total-2" value={state.total2}/>
      <button onClick={()=>store.watchObjects.enableGroup("a",true)}>Enable A Group</button>
      <button onClick={()=>store.watchObjects.enableGroup("a",false)}>Disable A Group</button>
      <div>\u5F53\u7981\u7528A Group\u65F6\uFF0C\u4FEE\u6539count\u65F6\u4E0D\u4F1A\u5BFC\u81F4total\u53D8\u5316\uFF0C\u56E0\u4E3A\u8BE5\u7EC4\u88AB\u7981\u6B62\u6267\u884C\u4E86</div>
      <Divider name="B Group"/>
      <ColorBlock name="Total-3" value={state.total3}/>
      <ColorBlock name="Total-4" value={state.total4}/>
      <ColorBlock name="Total-5" value={state.total5}/>      
      <button onClick={()=>store.watchObjects.enableGroup("b",true)}>Enable B Group</button>
      <button onClick={()=>store.watchObjects.enableGroup("b",false)}>Disable B Group</button>
    </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":j},renderOpts:{compile:function(){var y=x()(n()().mark(function d(){var l,a=arguments;return n()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}}}},81824:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(56081),U={}},32804:function(Y,i,e){"use strict";var k;e.r(i),e.d(i,{demos:function(){return C}});var n=e(29008),U=e.n(n),D=e(28633),E=e.n(D),x=e(70958),P=e.n(x),A=e(92379),u=e(42380),j=e(44970),C={"docs-guide-watch-demo-0":{component:A.memo(A.lazy(P()(U()().mark(function y(){var c,d,l,a,r;return U()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=v.sent,d=c.createStore,l=c.watch,a={orders:[{bookName:"SpeedForm Quick-Start",price:100,count:1,total:function(_){return _.price*_.count}},{bookName:"Helux",price:98,count:1,total:function(_){return _.price*_.count}}],total:l(function(t){return r.state.orders.reduce(function(_,g){return _+g.count*g.price},0)},function(t){return t[t.length-1]==="count"},{initial:198})},r=d({state:a},{singleton:!1}),v.abrupt("return",{default:function(){var _=r.useState(),g=E()(_,1),N=g[0];return A.createElement("table",null,A.createElement("thead",null,A.createElement("tr",null,A.createElement("th",null,"BookName"),A.createElement("th",null,"Price"),A.createElement("th",null,"Count"),A.createElement("th",null,"Total"))),A.createElement("tbody",null,N.orders.map(function(b,B){return A.createElement("tr",{key:B},A.createElement("td",null,b.bookName),A.createElement("td",null,b.price),A.createElement("td",null,A.createElement("input",{value:b.count,onChange:r.sync(function(R){return R.orders[B].count})})),A.createElement("td",null,b.total))}),A.createElement("tr",null,A.createElement("td",{colSpan:3},"Total"),A.createElement("td",null,N.total))))}});case 8:case"end":return v.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
import { Divider,Field } from "x-react-components"

const book = {
  orders:[
    { bookName:"SpeedForm Quick-Start",
      price:100,
      count:1,
      total:(book)=>book.price*book.count
    },
    { bookName:"Helux",
      price:98,
      count:1,
      total:(book)=>book.price*book.count
    }
  ],  
  total: watch<true>((count)=>{
     return store.state.orders.reduce((total,book)=>total+book.count*book.price,0)
  },
  // \u5F53price\u6216count\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1\u4FA6\u542C\u5668\u51FD\u6570\u7684\u6267\u884C
  (path:string[])=>{
      return path[path.length-1]==='count'
    },{    
    initial:198         // total\u7684\u521D\u59CB\u503C
  })
}

const store = createStore({state:book},{singleton:false})
 
export default ()=>{
  const [state] = store.useState()
  return (<table>
      <thead>
        <tr>
          <th>BookName</th>
          <th>Price</th>
          <th>Count</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {state.orders.map((book,index)=>
          <tr key={index}>
            <td>{book.bookName}</td>
            <td>{book.price}</td>
            <td><input value={book.count} onChange={store.sync(to=>to.orders[index].count)}/></td>
            <td>{book.total}</td>
          </tr>
        )}
        <tr>
          <td colSpan={3}>Total</td>
          <td>{state.total}</td>
        </tr>
        </tbody>
    </table>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j},renderOpts:{compile:function(){var y=P()(U()().mark(function d(){var l,a=arguments;return U()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}},"docs-guide-watch-demo-1":{component:A.memo(A.lazy(P()(U()().mark(function y(){var c,d,l,a,r,o,v,t,_;return U()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=N.sent,d=c.createStore,l=c.computed,a=c.ObserverScopeRef,N.next=8,Promise.resolve().then(e.t.bind(e,92379,19));case 8:return r=N.sent,o=r.useEffect,v=r.useState,t={user:{firstName:"zhang",lastName:"fisher",fullName:l(function(){var b=P()(U()().mark(function B(R){var O,L,W;return U()().wrap(function(ne){for(;;)switch(ne.prev=ne.next){case 0:return O=E()(R,2),L=O[0],W=O[1],ne.abrupt("return",L+W);case 2:case"end":return ne.stop()}},B)}));return function(B){return b.apply(this,arguments)}}(),["user/firstName","user/lastName"],{scope:a.Depends})}},_=d({state:t}),N.abrupt("return",{default:function(){var B=_.useState(),R=E()(B,1),O=R[0],L=v(""),W=E()(L,2),z=W[0],ne=W[1];return o(function(){var ae=_.watch(function(X){ne(X.map(function(M){return M.join("/")}).join(","))},["user/firstName","user/lastName"]);return ae},[]),A.createElement("div",null,A.createElement("div",null,"watch: ",z),A.createElement("div",null,"firstName=",A.createElement("input",{value:O.user.firstName,onChange:_.sync(function(ae){return ae.user.firstName})})),A.createElement("div",null,"lastName=",A.createElement("input",{value:O.user.lastName,onChange:_.sync(function(ae){return ae.user.lastName})})),A.createElement("div",null,"fullName=",O.user.fullName.result))}});case 14:case"end":return N.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef } from "@autostorejs/react" 
import { useEffect,useState } from "react"
const user = {
  user:{
    firstName:"zhang",
    lastName:"fisher",
    fullName: computed(async ([first,last])=>{ 
      return first + last
    },[
      "user/firstName",
      "user/lastName"
    ],{   
      scope:ObserverScopeRef.Depends
    }) 
  } 
}

const store = createStore({state:user})


export default ()=>{
  const [state]=store.useState()
  const [watchKey,setWatchKey] = useState('')
  useEffect(()=>{
    const unwatch = store.watch((valuePaths:string[])=>{
      setWatchKey(valuePaths.map(p=>p.join("/")).join(","))
    },[
      "user/firstName",
      "user/lastName"
    ])
    return unwatch
  },[])

  return  (<div>
      <div>watch: {watchKey}</div>
      <div>firstName=<input value={state.user.firstName} onChange={store.sync(to=>to.user.firstName)}/></div>
      <div>lastName=<input value={state.user.lastName} onChange={store.sync(to=>to.user.lastName)}/></div>
      <div>fullName={state.user.fullName.result}</div> 
    </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":j,react:k||(k=e.t(A,2))},renderOpts:{compile:function(){var y=P()(U()().mark(function d(){var l,a=arguments;return U()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}},"docs-guide-watch-demo-2":{component:A.memo(A.lazy(P()(U()().mark(function y(){var c,d,l,a,r,o,v,t;return U()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return c=g.sent,d=c.createStore,l=c.computed,a=c.ObserverScopeRef,g.next=8,Promise.resolve().then(e.t.bind(e,92379,19));case 8:return r=g.sent,o=r.useState,v={user:{firstName:"zhang",lastName:"fisher",fullName:l(function(){var N=P()(U()().mark(function b(B){var R,O,L;return U()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return R=E()(B,2),O=R[0],L=R[1],z.abrupt("return",O+L);case 2:case"end":return z.stop()}},b)}));return function(b){return N.apply(this,arguments)}}(),["user/firstName","user/lastName"],{scope:a.Depends})}},t=d({state:v}),g.abrupt("return",{default:function(){var b=t.useState(),B=E()(b,1),R=B[0],O=o(""),L=E()(O,2),W=L[0],z=L[1],ne=o("user/firstName"),ae=E()(ne,2),X=ae[0],M=ae[1],V=o(""),q=E()(V,2),w=q[0],Z=q[1];return t.useWatch(function(J,se){return z(se.join("/")),Z(J),J},X,{id:"use1"}),A.createElement("div",null,A.createElement("div",null,"watch for: ",X),A.createElement("div",null,"Watch value:",w),A.createElement("div",null,"firstName=",A.createElement("input",{value:R.user.firstName,onChange:t.sync(function(J){return J.user.firstName})})),A.createElement("div",null,"lastName=",A.createElement("input",{value:R.user.lastName,onChange:t.sync(function(J){return J.user.lastName})})),A.createElement("div",null,"fullName=",R.user.fullName.result),A.createElement("button",{onClick:function(){return M("user/firstName")}},"watch firstName"),A.createElement("button",{onClick:function(){return M("user/lastName")}},"watch lastName"))}});case 13:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef } from "@autostorejs/react" 
import { useEffect,useState } from "react"
const user = {
  user:{
    firstName:"zhang",
    lastName:"fisher",
    fullName: computed(async ([first,last])=>{ 
      return first + last
    },[
      "user/firstName",
      "user/lastName"
    ],{   
      scope:ObserverScopeRef.Depends
    }) 
  } 
}

const store = createStore({state:user})


export default ()=>{
  const [state]=store.useState()
  const [watchKey,setWatchKey] = useState('')
  const [watchPath,setWatchPath]=useState("user/firstName")
  const [watchValue,setWatchValue]=useState("")

  store.useWatch((value,path)=>{
      setWatchKey(path.join("/"))
      setWatchValue(value)
      return value
  },watchPath,{id:"use1"}) 



  return  (<div>
      <div>watch for: {watchPath}</div>
      <div>Watch value:{watchValue}</div>
      <div>firstName=<input value={state.user.firstName} onChange={store.sync(to=>to.user.firstName)}/></div>
      <div>lastName=<input value={state.user.lastName} onChange={store.sync(to=>to.user.lastName)}/></div>
      <div>fullName={state.user.fullName.result}</div> 
      <button onClick={()=>setWatchPath("user/firstName")}>watch firstName</button>
      <button onClick={()=>setWatchPath("user/lastName")}>watch lastName</button>      
    </div>)
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":j,react:k||(k=e.t(A,2))},renderOpts:{compile:function(){var y=P()(U()().mark(function d(){var l,a=arguments;return U()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function c(){return y.apply(this,arguments)}return c}()}}}},45618:function(Y,i,e){"use strict";e.r(i),e.d(i,{demos:function(){return U}});var k=e(92379),n=e(43112),U={}},77101:function(Y,i,e){"use strict";e.r(i),e.d(i,{Author:function(){return d},Counter:function(){return j},getProjects:function(){return v}});var k=e(28633),n=e.n(k),U=e(92379),D=e(44970),E=e(19644),x=e(651),P=(0,D.createStore)({root:{count:1}}),A=P.state,u=P.$,j=function(){var g=(0,U.useState)(1),N=n()(g,2),b=N[0],B=N[1];return(0,x.jsxs)(E.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[b,(0,x.jsxs)(E.ColorBlock,{children:["Count:",b]}),(0,x.jsxs)(E.ColorBlock,{children:["Count:",u("root.count")]}),(0,x.jsx)(E.Button,{onClick:function(){return B(b+1)},children:"State +1"}),(0,x.jsx)(E.Button,{onClick:function(){return A.root.count++},children:"Signal +1"})]})},C=(0,D.createStore)({firstName:"Zhang",lastName:"Fisher"}),y=C.state,c=C.$,d=function(){var g=(0,U.useState)(1),N=n()(g,2),b=N[0],B=N[1];return(0,x.jsxs)(E.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[b,(0,x.jsxs)(E.ColorBlock,{children:["Count:",b]}),(0,x.jsx)(E.ColorBlock,{children:c(function(R){return R.firstName+" "+R.lastName})}),(0,x.jsx)(E.Button,{onClick:function(){return B(b+1)},children:"State +1"}),(0,x.jsx)(E.Button,{onClick:function(){return y.lastName=y.lastName+"."},children:"Update lastName"})]})},l=e(29008),a=e.n(l),r=e(70958),o=e.n(r);function v(_){return t.apply(this,arguments)}function t(){return t=o()(a()().mark(function _(g){var N,b,B;return a()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,fetch(g);case 2:if(N=O.sent,!N.ok){O.next=11;break}return O.next=6,N.json();case 6:return b=O.sent,B=b.map(function(L){return{name:L.name,url:L.html_url,description:L.description,stars:L.stargazers_count}}),O.abrupt("return",B);case 11:throw new Error("".concat(N.status," - ").concat(N.statusText));case 12:case"end":return O.stop()}},_)})),t.apply(this,arguments)}},19644:function(Y,i,e){"use strict";e.r(i),e.d(i,{Box:function(){return U},Button:function(){return A},Card:function(){return C},Col:function(){return _},ColorBlock:function(){return t},Divider:function(){return a},Field:function(){return l},Input:function(){return O},JsonView:function(){return ae},Loading:function(){return E},RichLabel:function(){return z},Row:function(){return g},ValidResult:function(){return d}});var k=e(92379),n=e(651),U=function(M){var V=M.title,q=M.enable,w=q===void 0?!0:q,Z=M.visible,J=Z===void 0?!0:Z;return(0,n.jsxs)("div",{style:{display:J?"flex":"none",position:"relative",flexDirection:"column",padding:"8px",margin:"16px 4px 4px 4px",boxSizing:"border-box",border:"1px solid #bbb"},children:[(0,n.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:w?"#bbb":"gray"},children:V||""}),M.children]})},D=e(97106),E=function(M){var V=M.size,q=V===void 0?20:V,w=M.visible,Z=w===void 0?!0:w,J=M.color,se=M.tips,oe=se===void 0?"loading...":se;return(0,n.jsxs)("span",{title:oe,style:{display:Z?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,n.jsx)(D.Z1,{width:q,height:q,color:J}),M.title?(0,n.jsx)("span",{style:{marginLeft:"4px"},children:M.title}):null]})},x=e(94039),P=(0,x.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(M){return M.visible!==!1?M.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #eee",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"speed-button"}),A=function(M){var V=M.loading,q=M.timeout,w=q===void 0?0:q,Z=M.progress,J=Z===void 0?0:Z,se=M.cancel,oe=M.onClick;return(0,n.jsxs)("div",{className:P.className,style:P.getStyle(M),onClick:oe,children:[V?(0,n.jsx)(E,{}):null,(0,n.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:M.children}),w>0?(0,n.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:w}):"",J>0?(0,n.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[J,"%"]}):"",M.error?(0,n.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:M.error}):"",M.loading&&typeof se=="function"?(0,n.jsx)("button",{onClick:se,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},u=(0,x.zo)({border:"1px solid #e1e1e1",background:function(M){return M.enable!==!1?"white":"gray"},margin:"8px",display:function(M){return M.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"card"}),j=(0,x.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555"},{className:"card-header"}),C=function(M){var V=M.title,q=M.enable,w=q===void 0?!0:q,Z=M.buttons,J=Z===void 0?[]:Z,se=Array.isArray(M.children)?M.children:[M.children];return(0,n.jsxs)("div",{className:u.className,style:u.getStyle(M),children:[(0,n.jsxs)("div",{className:j.className,style:j.getStyle(M),children:[(0,n.jsx)("span",{style:{flexGrow:1,color:w?"#222":"gray"},children:V}),(0,n.jsx)("span",{style:{},children:J.map(function(oe,ve){return(0,n.jsx)("span",{className:"button",style:{padding:"4px",margin:"4px",cursor:"pointer"},onClick:oe.onClick,children:oe.title},ve)})})]}),(0,n.jsx)("div",{style:{padding:"12px"},children:se.map(function(oe,ve){return se.length>1&&ve==se.length-1&&oe.classList&&oe.classList.contains("footer")?(0,n.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:oe},ve):oe})})]})},y=e(24325),c=e.n(y),d=function(M){var V=M.validate,q=M.help;if(V!=null){var w=typeof V!="boolean",Z=w?V==null?void 0:V.result:V,J=w?V==null?void 0:V.loading:!1,se=w?V==null?void 0:V.error:q;return(0,n.jsxs)("span",{style:{color:"red",display:J||!Z?"flex":"none"},children:[(0,n.jsx)(E,{visible:J,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!J&&(Z?"":se)]})}},l=function(M){var V=M.enable,q=V===void 0?!0:V,w=M.visible,Z=w===void 0?!0:w,J=M.label,se=J===void 0?"":J,oe=M.children,ve=oe===void 0?"":oe,F=M.memo;return(0,n.jsxs)("div",{className:"field",style:{position:"relative",display:Z===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,n.jsxs)("label",{className:"field-label",style:{minWidth:"160px",fontWeight:"bold",color:q===!1?"gray":"inherit"},children:[se,":"]}),(0,n.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:q===!1?"gray":"inherit"},children:[typeof ve=="function"?"":ve,F&&(0,n.jsx)("span",{style:{color:"gray"},children:F})]}),(0,n.jsx)(d,c()({},M))]})},a=function(M){var V=M.title,q=M.visible,w=q===void 0?!0:q;return(0,n.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:w?"flex":"none"},children:(0,n.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:V})})},r=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],o=0;function v(){return o++,o>=r.length&&(o=0),r[o]}var t=function(M){var V=(0,k.useRef)(0),q=M.name,w=M.value,Z=w===void 0?"":w,J=M.loading,se=J===void 0?!1:J,oe=M.comment,ve=v(),F="white";return(0,k.useEffect)(function(){V.current++}),(0,n.jsxs)("div",{style:c()(c()({backgroundColor:ve,padding:"6px",color:F,display:"flex"},M.style),{},{alignItems:"center"}),children:[(0,n.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[q?(0,n.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:q}):null,q?(0,n.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,n.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(Z),M.children]})]}),oe?(0,n.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:oe}):null,se?(0,n.jsx)(E,{color:"white"}):null,(0,n.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:V.current})]})},_=function(M){var V=M.visible,q=V===void 0?!0:V,w=M.border,Z=w===void 0?!0:w,J=M.padding,se=J===void 0?"8px":J,oe=M.margin,ve=oe===void 0?"0px":oe,F=M.grow,K=F===void 0?1:F;return(0,n.jsx)("div",{className:"layout-col",style:{display:q?"flex":"none",position:"relative",flexDirection:"column",padding:se,flexGrow:K,margin:ve,boxSizing:"border-box",border:Z?"1px solid #eee":"none"},children:M.children})},g=function(M){var V=M.visible,q=V===void 0?!0:V,w=M.border,Z=w===void 0?!0:w,J=M.padding,se=J===void 0?"8px":J,oe=M.grow,ve=oe===void 0?1:oe;return(0,n.jsx)("div",{className:"layout-row",style:{display:q?"flex":"none",position:"relative",flexDirection:"row",flexGrow:ve,padding:se,margin:"4px",boxSizing:"border-box",border:Z?"1px solid #eee":"none"},children:M.children})},N=e(19317),b=e.n(N),B=["id","enable","value"],R=(0,x.zo)({border:function(M){return M.validate===!1?"1px solid red":"1px solid #bbb"},borderRadius:"4px",background:function(M){return M.enable===!1?"gray":"white"},display:function(M){return M.visible===!1?"none":"block"},margin:"4px",padding:"8px",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}},{className:"xc-input"}),O=function(M){var V=M.id,q=V===void 0?Math.random().toString(36).slice(2):V,w=M.enable,Z=w===void 0?!0:w,J=M.value,se=b()(M,B),oe={color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"};return(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[M.label?(0,n.jsx)("label",{htmlFor:q,style:oe,children:M.label}):null,(0,n.jsx)("input",c()(c()({id:q,value:J,readOnly:!Z},se),{},{className:R.className,style:R.getStyle(M)})),(0,n.jsx)("form",{})]})},L=e(28633),W=e.n(L),z=function(M){var V=M.text,q=M.color,w=q===void 0?"#ff6c00":q,Z=M.rules,J=typeof w=="string"?{default:w}:Object.assign({default:""},w),se=V;return Z?Object.entries(Z).forEach(function(oe){var ve=W()(oe,2),F=ve[0],K=ve[1];se=se.replace(K,function(H){var le=F.includes(":")?F:"color:".concat(F,";");return"<span style='".concat(le,"'>").concat(H,"</span>")})}):se=V.replace(/\{\s?(.*?)\s?\}/gm,function(oe,ve){return"<span style='color: ".concat(ve in J?J[ve]:J.default,"'>").concat(ve,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,n.jsx)("div",{style:c()({boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},M.style),children:(0,n.jsx)("span",{dangerouslySetInnerHTML:{__html:se}})})},ne=function(M){return M.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},ae=function(M){var V=ne(String(M.children));return(0,n.jsx)(z,{text:V,rules:{"color:green;":/true|false/g,"color:#222;padding:4px;":/\"(.*?)\"/g,"color:#bd0081;padding:4px;":/(?!=\:\s*)[\d\.]+/g,"color:#888;padding:4px;":/(null|defined)/g,"color:#918213;paddingRight:4px;":/^\{|\}$/g},style:{}})}},99640:function(Y,i,e){"use strict";e.d(i,{eg:function(){return oe},_L:function(){return z},WE:function(){return rt},M1:function(){return At},CD:function(){return W},up:function(){return se},Xr:function(){return Je},BG:function(){return tt},e2:function(){return ae},vp:function(){return Qe},FM:function(){return X},y1:function(){return V},MI:function(){return M},Q6:function(){return w},kF:function(){return Z},Rn:function(){return Ze},fR:function(){return Le},f7:function(){return J},QI:function(){return q},X3:function(){return at},W5:function(){return ne},RY:function(){return lt},LG:function(){return ut},Rh:function(){return Fe},Fl:function(){return H},Ws:function(){return xt},gw:function(){return pt},b0:function(){return et},tl:function(){return ct},if:function(){return vt},zv:function(){return $e},ux:function(){return ye},kM:function(){return it},vM:function(){return Ve},Jy:function(){return he},O5:function(){return le},Jq:function(){return pe},vo:function(){return ie},c6:function(){return st},_N:function(){return ge},iI:function(){return de},vb:function(){return _e},PH:function(){return Ee},J_:function(){return xe},PO:function(){return be},pt:function(){return ht},tI:function(){return ue},RM:function(){return Be},_R:function(){return ee},UQ:function(){return Re},Xl:function(){return Ce},DH:function(){return ze},KZ:function(){return F},Ql:function(){return It},ZW:function(){return mt},Y6:function(){return Ne},EG:function(){return qe},YP:function(){return ot}});var k=e(29008),n=e.n(k),U=e(70958),D=e.n(U),E=e(12027),x=e.n(E),P=e(34180),A=e.n(P),u=e(93949),j=e.n(u),C=e(6270),y=e.n(C),c=e(28810),d=e.n(c),l=e(77701),a=e.n(l),r=e(28249),o=e.n(r),v=e(29861),t=e.n(v),_=e(14582),g=e.n(_),N=e(48510),b=e.n(N),B=e(30790),R=e.n(B),O=e(5672),L=e.n(O),W=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f)}(L()(Error)),z=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f)}(W),ne=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f)}(W),ae=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f)}(W),X=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f)}(W),M=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f)}(W),V=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f)}(W),q=Symbol("skip-proxy"),w=Symbol("observer-descriptor-builder"),Z=Symbol("observer-descriptor"),J=".",se="__batch_update__",oe=Symbol("AsyncComputedValue");function ve(I){return I.constructor.name==="AsyncFunction"}function F(I){return I?I.map(function(p){return Array.isArray(p)?p:typeof p=="string"?["/","./","../"].some(function(f){return p.startsWith(f)})?p:p.includes(J)?p.split(J):p.split("."):[]}):[]}function K(){return{objectify:!0,async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0}}function H(){var I=arguments[0];if(typeof I!="function")throw new Error("computed getter must be a function");var p=[],f=Object.assign({},K());if(arguments.length===1)p=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))f.depends=arguments[1];else if(A()(arguments[1])==="object")Object.assign(f,arguments[1]),f.depends=F(f.depends);else throw new X;else arguments.length>=3&&(p=F(arguments[1]),Object.assign(f,arguments[2]),f.depends=p);f.async=f.async===!0||ve(I)||arguments.length>=2&&Array.isArray(arguments[1]);var m=function(){return t()({type:"computed",getter:I,options:f},Z,!0)};return m[w]=!0,m}function le(I){return I?I.some(function(p){return typeof p=="string"?p.startsWith("./")||p.startsWith("../")||p.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(p):!0}):!1}function de(I){return A()(I)==="object"&&I.hasOwnProperty("type")&&typeof I.type=="string"&&I.hasOwnProperty("getter")&&typeof I.getter=="function"&&I.hasOwnProperty("options")&&A()(I.options)==="object"}function ee(I){try{return I[q]===!0}catch(p){}return!1}function ie(I,p){if(I===p)return!0;if(I===null||p===null||A()(I)!==A()(p))return!1;if(A()(I)==="object"){if(Array.isArray(I)&&Array.isArray(p))return I.length!==p.length?!1:I.every(function(m,s){return ie(m,p[s])});if(!Array.isArray(I)&&!Array.isArray(p)){var f=Object.keys(I);return f.length!==Object.keys(p).length?!1:f.every(function(m){return ie(I[m],p[m])})}else return!1}return!1}function ge(I){return toString.call(I)==="[object Map]"}function Ee(I,p){return!I||!p||I.length!==p.length?!1:I.every(function(f,m){return f===p[m]})}function xe(I,p){var f=Ee(I,p);return f?!0:I.length!==p.length?!1:I.every(function(m,s){return m==="*"?!0:m===p[s]})}function be(I){return I==null||A()(I)!=="object"?!1:Object.prototype.toString.call(I)==="[object Object]"}function pe(I){return I&&A()(I)==="object"&&I.hasOwnProperty(oe)}function ue(I){try{return!!I&&(A()(I)==="object"||typeof I=="function")&&typeof I.then=="function"&&typeof I.catch=="function"&&(I instanceof Promise||Object.prototype.toString.call(I)==="[object Promise]")}catch(p){return!1}}function _e(I){return typeof I=="function"&&I[w]===!0}function Be(I){return A()(I)==="object"&&I!==null&&!("__isProxy"in I)}function ye(I,p){var f=I.get(p);if(f!==void 0)return f;var m=I.get(Number(p)||p);if(m!==void 0)return m}function he(I,p){if(!p||p.length===0)return I;var f,m=I;return p.forEach(function(s){if(ge(m))f=ye(m,s);else if(s in m)f=m[s];else throw new Error("invalid state path: ".concat(p.join(".")));m=f}),f}function Ce(I){try{I[q]=!0}catch(p){}return I}function Ne(I,p,f,m){var s=I,h=p.length-1;p.forEach(function(S,$){var T=ge(s);if($===h){if(m===!0){var Q=T?ye(s,S):s[S];pe(Q)&&(s=Q,S="value")}T?s.set(S,f):s[S]=f;return}var G=T?ye(s,S):s[S];s=G})}function Re(I){return(I||["ROOT"]).map(function(p){return Array.isArray(p)?p.join("."):p}).join(J)}function $e(){return Math.random().toString(36).slice(2)}function Ge(I,p,f){var m=I&&!I[0].startsWith("#");if(Array.isArray(p))return p;if(p==="self")return m?I:void 0;if(p==="root")return m?[]:void 0;if(p==="parent")return m?I.slice(0,-2):void 0;if(p==="current")return m?I.slice(0,-1):void 0;if(typeof p=="string")return p.startsWith("./")?m?[].concat(x()(I.slice(0,-1)),x()(p.slice(2).split(J))):void 0:p.startsWith("../")?m?Ge(I.slice(0,-1),p.slice(3),!0):void 0:p.startsWith("/")?p.replace(/^(\/)*/,"").split(J):m&&f?[].concat(x()(I.slice(0,-1)),x()(p.split(J))):p.split(J)}function Fe(I,p){return p?p.map(function(f){return Ge(I,f)}).filter(function(f){return f!==void 0}):[]}function ct(I,p){var f="";return p.id?f=p.id:f=Re(I),f}function qe(I,p,f){var m=I,s=p.length-1;p.forEach(function(h,S){var $=ge(m);if(S===s){var T=$?m.get(h):m[h];A()(T)==="object"&&Object.assign(T,f);return}$?(m.has(h)||m.set(h,{}),m=m.get(h)):(h in m||(m[h]={}),m=m[h])})}function et(I,p){function f(m,s){for(var h in m){var S=m[h];typeof p=="function"&&p({value:S,key:h,parent:m,path:s.concat(h)}),A()(S)==="object"&&f(S,s.concat(h))}}f(I,[])}function it(I){return I}function pt(){var I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(p){setTimeout(p,I)})}function ze(I){var p=new Map;return I.forEach(function(f){var m=f.join(".");p.set(m,f)}),Array.from(p.values())}function mt(I,p){return I.length>p.length?!1:I.every(function(f,m){return f===p[m]})}function vt(I,p){var f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"none",m=[];return typeof I=="function"?m=p.collectDependencies(function(){return I(p.state)}):typeof I=="string"?m=[I.split(J)]:Array.isArray(I)?m=[x()(I)]:m=[],f!=="none"&&m.forEach(function(s){var h=p.peep(function(S){return he(S,s)});pe(h)&&s.push(f==="all"?"*":"value")}),m}function It(I,p){if(!p||p.length===0)return!1;for(var f,m=I,s=0;s<p.length;s++){var h=p[s],S=!1;if(ge(m)){if(S=m.has(h),!S)return!1;f=ye(m,h)}else{if(S=h in m,!S)return!1;f=m[h]}m=f}return!0}var ft=e(24325),Te=e.n(ft);function Ve(I,p){if(Array.isArray(I)){for(var f=x()(I),m=0;m<f.length;m++)f[m]=Ve(f[m],p);return f}else if(A()(I)==="object"){if(!p&&pe(I))return I.value;var s=Te()({},I);for(var h in s)s[h]=Ve(s[h],p);return s}return I}function ht(I){return I==null||typeof I=="string"||typeof I=="number"||typeof I=="boolean"}function xt(I){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof I=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(I)}var tt=function(I){a()(f,I);var p=o()(f);function f(m){var s;return j()(this,f),s=p.call(this),s.store=m,s}return y()(f,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(s){this.store.options.enableComputed=s}},{key:"create",value:function(){var s=de(arguments[0])?arguments[0]:H.apply(void 0,arguments)();if(s.options.async&&!le(s.options.depends))throw new V("The scope of the dynamic computed object must be the root state object or an absolute path");var h=s.options.scope;if(h===void 0)s.options.scope="ROOT";else if(!le([h]))throw new M("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(s)}},{key:"runGroup",value:function(){var m=D()(n()().mark(function h(S,$,T){return n()().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return G.next=2,this.run(function(te){return te.group==S},$,T);case 2:return G.abrupt("return",G.sent);case 3:case"end":return G.stop()}},h,this)}));function s(h,S,$){return m.apply(this,arguments)}return s}()},{key:"run",value:function(){var m=D()(n()().mark(function h(){var S=arguments,$=this,T,Q,G,te,re=arguments;return n()().wrap(function(ce){for(;;)switch(ce.prev=ce.next){case 0:if(re.length!=0){ce.next=2;break}return ce.abrupt("return",Promise.all(x()(this.values()).map(function(me){return me.run()})));case 2:return typeof re[0]=="function"?T=re[0]:typeof re[0]=="string"&&(T=function(Pe){return Pe.id==S[0]}),Q=Object.assign({},re[1]),G=Object.assign({wait:!1,timeout:0},re[2]),te={},ce.abrupt("return",new Promise(function(me,Pe){if(G.wait){var fe;Q.onDone=function(Ae){var Me=Ae.id;if(te[Me]=!0,Object.values(te).every(function(ke){return ke}))return clearTimeout(fe),!0},G.timeout>0&&(fe=setTimeout(function(){Pe(new ne)},G.timeout))}Promise.all(x()($.values()).filter(function(Ae){return T(Ae)?(te[Ae.id]=!1,!0):!1}).map(function(Ae){return Ae.run(Q)})),G.wait||me()}));case 7:case"end":return ce.stop()}},h,this)}));function s(){return m.apply(this,arguments)}return s}()},{key:"enableGroup",value:function(){var m=D()(n()().mark(function h(S){var $,T,Q;return n()().wrap(function(te){for(;;)switch(te.prev=te.next){case 0:$=g()(this.values());try{for($.s();!(T=$.n()).done;)Q=T.value,Q.options.enable=S}catch(re){$.e(re)}finally{$.f()}case 2:case"end":return te.stop()}},h,this)}));function s(h){return m.apply(this,arguments)}return s}()},{key:"delete",value:function(s){var h;return(h=this.get(s))===null||h===void 0||h.detach(),b()(R()(f.prototype),"delete",this).call(this,s)}},{key:"find",value:function(s){if(s){var h=Array.isArray(s)?s:s.split(J),S=g()(this.values()),$;try{for(S.s();!($=S.n()).done;){var T=$.value;if(Ee(T.path,h))return T}}catch(Q){S.e(Q)}finally{S.f()}}}}]),f}(L()(Map)),gt=e(69075);function _t(I){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",f=typeof I=="function"?I():I instanceof Error?I.stack:I;try{var m;(m=console)[p].apply(m,["[AutoStore] "].concat(x()(Array.isArray(f)?f:[f])))}catch(s){}}function Ue(I,p){var f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:J,m=[];try{return typeof p=="function"&&(p=p.call(I,I)),m=Array.isArray(p)?p:typeof p=="string"?p.split(f):[],m.length>0?he(I,m):I}catch(s){return I}}var Le=function(I){return I.Root="ROOT",I.Current="CURRENT",I.Parent="PARENT",I.Depends="DEPENDS",I.Self="SELF",I}({});function yt(I,p,f){var m=p==null?f:p;if(typeof m=="function")try{m=m.call(I.store,I)}catch(s){}return m==null?f==null?Le.Current:f:m}function we(I,p,f,m){var s=I.store.state,h=I.store.options;if(typeof h.getRootScope=="function"){var S=h.getRootScope(I,{observerType:p,valuePath:f==null?void 0:f.path});S!==void 0&&(s=S)}var $=f||{},T=$.path,Q=$.parentPath,G=yt(I,m.scope,h.scope),te=s;try{if(G===Le.Current)te=Ue(s,Q);else if(G===Le.Parent)te=Ue(s,T.slice(0,T.length-2<0?0:T.length-2));else if(G===Le.Root)te=s;else if(G===Le.Depends){var re;te=(re=I.depends)===null||re===void 0?void 0:re.map(function(Ie){return Ue(s,Ie)})}else typeof G=="string"?G.startsWith("@")?te=we(I,p,f,Te()(Te()({},m),{},{scope:we(I,p,Te()(Te()({},f),{},{path:G.slice(1).split(J)}),Te()(Te()({},m),{},{scope:G.slice(1)}))})):te=Ue(s,Ge(I.path,G)):Array.isArray(G)&&(te=Ue(s,G))}catch(Ie){h.log("Error while getting computed scope ".concat(I.toString(),": ").concat(Ie.message),"error")}return te}var Ze=function(){function I(p,f,m){j()(this,I),t()(this,"_path",void 0),t()(this,"_id",""),t()(this,"_initial",void 0),t()(this,"_value",void 0),t()(this,"_associated",!1),t()(this,"_attached",!1),t()(this,"_getter",void 0),t()(this,"_depends",[]),t()(this,"_options",void 0),t()(this,"_subscribers",[]),t()(this,"_strPath",void 0),this.store=p,this.descriptor=f,this.context=m,this._associated=m!==void 0,this._getter=f.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},f.options),this._id=this._options.id||(this._associated?Re(m==null?void 0:m.path):$e()),this._path=(m==null?void 0:m.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this._depends=Fe(this._path,this._options.depends),this._onInitial()}return y()(I,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(f){this._options.enable=f}},{key:"group",get:function(){return this._options.group},set:function(f){this._options.group=f}},{key:"initial",get:function(){return this._initial},set:function(f){this._initial=f}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(f){this._depends=f}},{key:"getter",get:function(){return this._getter},set:function(f){this._getter=f}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(J)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?he(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(f){this._associated?Ne(this.store.state,this._path,f):(this._value=f,this.store._notify({type:"set",path:this.path,value:f}))}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"update",value:function(f,m){var s=this;this.store.update(function(){s.value=f},m)}},{key:"silentUpdate",value:function(f){this.update(f,{silent:!0})}},{key:"watch",value:function(f,m){var s=this;return this.store.watch(this.getValueWatchPath(),function(h){f.call(s,h)},m)}},{key:"getValueWatchPath",value:function(){return this.path.join(J)}},{key:"emitStoreEvent",value:function(f,m){var s=this;setTimeout(function(){s.store.emit(f,m)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(f){}},{key:"attach",value:function(){var f=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(f.toString()," subscribed to ").concat(f.depends.map(function(m){return m.join(J)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(f){return f.off()}),this._attached=!1)}}]),I}(),Je=function(I){a()(f,I);var p=o()(f);function f(m,s,h){var S;return j()(this,f),S=p.call(this,m,s,h),S.store=m,S.descriptor=s,S.context=h,s.options.depends=Fe(S.path,S.options.depends),S}return y()(f,[{key:"toString",value:function(){return"ComputedObject<".concat(Re(this.path),">")}},{key:"isDisable",value:function(s){return!this.store.options.enableComputed||!this.enable&&s!==!0||s===!1}},{key:"run",value:function(s){throw new Error("Method not implemented.")}}]),f}(Ze),at=function(I){a()(f,I);var p=o()(f);function f(){return j()(this,f),p.apply(this,arguments)}return y()(f,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(s){var h=this,S=Object.assign({first:!1,changed:void 0},s),$=S.first,T=S.changed;if(!$&&this.isDisable(s==null?void 0:s.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!$&&this.store.log(function(){return"Run sync computed for : ".concat(h.toString())});var Q=s?Object.assign({},this.options,s):this.options,G=we(this,"computed",this.context,Q),te=Q.initial;try{te=this.getter.call(this,G,{changed:T,first:$}),$&&(this.initial=te),this.store.peep(function(){h.value=te}),!$&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:te,computedObject:this})}catch(re){throw!$&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:re,computedObject:this}),re}}},{key:"collectDependencies",value:function(){var s=[],h=this.store.watch(function(S){s.push(S.path)},{operates:["get"]});this.run({first:!0}),h.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&s.push.apply(s,x()(Fe(this.path,this.options.depends))),this.depends=ze(s),this.attach()}},{key:"onDependsChange",value:function(s){this.run({changed:s})}}]),f}(Je);function Et(I,p,f,m,s){return f==="push"?function(){for(var h=p.length,S=arguments.length,$=new Array(S),T=0;T<S;T++)$[T]=arguments[T];var Q=m.apply(p,$);if(p.length>h){var G=Array.from({length:p.length-h},function(te,re){return re+h});I({type:"insert",path:s,indexs:G,value:$,oldValue:void 0,parentPath:s,parent:p})}return Q}:f==="pop"?function(){var h=p.length,S=m.apply(p);return p.length==h-1&&I({type:"remove",path:s,indexs:[h-1],value:[S],oldValue:void 0,parentPath:s,parent:p}),S}:f==="splice"?function(h,S){for(var $=arguments.length,T=new Array($>2?$-2:0),Q=2;Q<$;Q++)T[Q-2]=arguments[Q];var G=m.apply(p,[h,S].concat(T));if(G.length>0){var te=Array.from({length:G.length},function(Ie,ce){return h+ce});I({type:"remove",path:s,indexs:te,value:G,oldValue:void 0,parentPath:s,parent:p})}if(T.length>0){var re=Array.from({length:T.length},function(Ie,ce){return h+ce});I({type:"insert",path:s,indexs:re,value:T,oldValue:void 0,parentPath:s,parent:p})}return G}:f==="unshift"?function(){for(var h=p.length,S=arguments.length,$=new Array(S),T=0;T<S;T++)$[T]=arguments[T];var Q=m.apply(p,$);if(p.length>h){var G=Array.from({length:p.length-h},function(te,re){return re});I({type:"insert",path:s,indexs:G,value:$,oldValue:void 0,parentPath:s,parent:p})}return Q}:f==="shift"?function(){var h=p.length,S=m.apply(p);return p.length==h-1&&I({type:"remove",path:s,indexs:[0],value:[S],oldValue:void 0,parentPath:s,parent:p}),S}:f==="fill"?function(h,S,$){var T=m.apply(p,[h,S,$]),Q=S!=null?S:0,G=$!=null?$:p.length,te=Array.from({length:G-Q},function(Ie,ce){return ce+Q}),re=Array.from({length:G-Q},function(){return h});return I({type:"update",path:s,indexs:te,value:re,oldValue:void 0,parentPath:s,parent:p}),T}:f==="concat"?function(){for(var h=p.length,S=arguments.length,$=new Array(S),T=0;T<S;T++)$[T]=arguments[T];var Q=m.apply(p,$),G=Array.from({length:$.length},function(te,re){return h+re});return I({type:"insert",path:s,indexs:G,value:$,oldValue:void 0,parentPath:s,parent:p}),Q}:m}var He=Symbol("__NOTIFY__");function nt(I,p,f,m,s){if(ee(I)||A()(I)!=="object"||I===null)return I;if(f.has(I))return f.get(I);var h=new Proxy(I,{get:function($,T,Q){var G=Reflect.get($,T,Q);if(typeof T!="string")return G;var te=[].concat(x()(p),[String(T)]);if(typeof G=="function"||!Object.hasOwn($,T))if(typeof G=="function"){if(Array.isArray($))return Et(s.notify,$,T,G,p);if(!ee(G)&&Object.hasOwn($,T)){var re=te.join(".");try{if(m.has(re)){var Ie=[].concat(x()(m.keys()),[re]);throw m.clear(),new ae('The computed property "'.concat(re,'" has a circular dependency, steps: ').concat(Ie.join(" <- ")))}return m.set(re,!0),s.createComputedObject(te,G,p,$)}finally{m.delete(re)}}else return G}else return G;return s.notify({type:"get",path:te,indexs:[],value:G,oldValue:void 0,parentPath:p,parent:$}),nt(G,te,f,m,s)},set:function($,T,Q,G){var te=Reflect.get($,T,G),re=Reflect.set($,T,Q,G);if(T===He)return!0;if(re&&T!==He&&Q!==te)if(Array.isArray($))s.notify({type:"update",path:p,indexs:[Number(T)],value:Q,oldValue:te,parentPath:p,parent:$});else{var Ie=[].concat(x()(p),[String(T)]);s.notify({type:"set",path:Ie,indexs:[],value:Q,oldValue:te,parentPath:p,parent:$})}return re},deleteProperty:function($,T){var Q=$[T],G=[].concat(x()(p),[String(T)]),te=Reflect.deleteProperty($,T);return te&&T!==He&&s.notify({type:"delete",path:G,indexs:[],value:Q,oldValue:void 0,parentPath:p,parent:$}),te}});return f.set(I,h),h}function bt(I,p){var f=new Map,m=new WeakMap;return nt(I,[],m,f,p)}var Ct=e(28633),Xe=e.n(Ct),Ot=e(75396),Nt=e.n(Ot),St=e(21206);function Bt(I){return I instanceof Error?I:new Error(I)}var rt=function(I){a()(f,I);var p=o()(f);function f(){var m;j()(this,f);for(var s=arguments.length,h=new Array(s),S=0;S<s;S++)h[S]=arguments[S];return m=p.call.apply(p,[this].concat(h)),t()(d()(m),"_isComputedRunning",!1),t()(d()(m),"_defaultAbortController",null),t()(d()(m),"_userAbortController",void 0),m}return y()(f,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return b()(R()(f.prototype),"value",this)},set:function(s){Nt()(R()(f.prototype),"value",s,this,!0)}},{key:"onInitial",value:function(){var s=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(s.options.immediate===!0||s.options.immediate==="auto"&&s.options.initial===void 0)&&s.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var s=this;return Object.assign(t()(t()(t()(t()(t()(t()(t()(t()(t()({},oe,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",Ce(function(h){return s.store.computedObjects.run(s.id,Object.assign({},h))})),"cancel",Ce(function(){s.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(s){var h=this,S=this.strPath,$=Object.keys(s).length;if(this.associated)this.store.update(function(Q){qe(Q,h.path,s)},{batch:$>1?S:!1});else{Object.assign(this.value,s);var T=$>1;Object.entries(s).forEach(function(Q){var G=Xe()(Q,2),te=G[0],re=G[1],Ie={type:"set",path:[h.strPath,te],value:re,parent:h.value};T&&(Ie.reply=!0),h.store.operates.emit("".concat(h.strPath,".").concat(te),Ie)}),T&&this.store.operates.emit(S,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var m=D()(n()().mark(function h(S){var $=this,T,Q,G,te,re,Ie;return n()().wrap(function(me){for(;;)switch(me.prev=me.next){case 0:if(T=S!=null?S:{},Q=T.first,G=Q===void 0?!1:Q,!this.isDisable(S==null?void 0:S.enable)){me.next=4;break}return this.store.log(function(){return"Async computed <".concat($.toString(),"> is disabled")},"warn"),me.abrupt("return");case 4:if(!G&&this.store.log(function(){return"Run async computed for : ".concat($.toString())}),te=S?Object.assign({},this.options,S):this.options,re=we(this,"computed",this.context,te),Ie=te.noReentry,!(Ie&&this._isComputedRunning)){me.next=12;break}return this.store.log(function(){return"Reentry async computed: ".concat($.toString())},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),me.abrupt("return");case 12:return this._isComputedRunning=!0,me.prev=13,me.next=16,this.executeGetter(re,te);case 16:return me.abrupt("return",me.sent);case 17:return me.prev=17,this._isComputedRunning=!1,me.finish(17);case 20:case"end":return me.stop()}},h,this,[[13,,17,20]])}));function s(h){return m.apply(this,arguments)}return s}()},{key:"createComputeProgressbar",value:function(s){var h=this,S=Object.assign({},s),$=S.max,T=$===void 0?100:$,Q=S.min,G=Q===void 0?0:Q,te=S.value,re=te===void 0?0:te;return this.updateComputedValue({progress:re}),{value:function(ce){ce>T&&(ce=T),ce<G&&(ce=G),h.updateComputedValue({progress:ce})},end:function(){this.value(T)}}}},{key:"onDoneCallback",value:function(s,h,S,$,T,Q){typeof s.onDone=="function"&&s.onDone.call(this,{id:this.id,path:this.path,value:Q,error:h,abort:S,timeout:$,scope:T})}},{key:"getAbortController",value:function(s){if(s&&typeof s.abortController=="function"){var h=s.abortController();h&&h instanceof AbortController&&(this._userAbortController=h)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(s,h,S){var $=this,T=S.timeout,Q=Array.isArray(T)?T:[T,0],G=Xe()(Q,2),te=G[0],re=te===void 0?0:te,Ie=G[1],ce=Ie===void 0?0:Ie,me,Pe;return re>0&&(h.timeout=ce>1?ce:re,Pe=setTimeout(function(){s.hasTimeout=!0,s.hasError=!0,s.error="TIMEOUT",typeof s.timeoutCallback=="function"&&s.timeoutCallback(),clearInterval(me),$.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},re),ce>1&&(me=setInterval(function(){$.updateComputedValue({timeout:ce--}),ce===0&&clearInterval(me)},re/(ce+1)))),{clear:function(){clearTimeout(Pe),clearInterval(me)},enable:re>0}}},{key:"executeGetter",value:function(){var m=D()(n()().mark(function h(S,$){var T,Q,G,te,re,Ie,ce,me,Pe,fe,Ae,Me,ke,De,Se,je;return n()().wrap(function(Oe){for(;;)switch(Oe.prev=Oe.next){case 0:T=$.retry,Q=T===void 0?[0,0]:T,G=Array.isArray(Q)?Q:[Number(Q),0],te=Xe()(G,2),re=te[0],Ie=te[1],me=this.getAbortController($),Pe={onTimeout:function(Ke){return ce=Ke},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Ke){return Ke},cancel:me.abort,extras:$.extras,changed:$.changed,abortSignal:me.signal},fe={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:ce},me.signal.addEventListener("abort",function(){return fe.hasAbort=!0}),Ae={clear:function(){},enable:!1},ke=function(Ke){return Object.assign(fe,Ke)},De=0;case 9:if(!(De<re+1)){Oe.next=46;break}if(Se={},Oe.prev=11,je={loading:!0},fe.hasError&&(je.error=null),re>0&&(je.retry=De>0?re-De+1:0),De>0&&ke({error:null,hasError:!1,hasTimeout:!1}),Ae=this.setTimeoutControl(fe,je,$),this.updateComputedValue(je),!fe.hasAbort){Oe.next=20;break}throw new z;case 20:return Oe.next=22,this.getter.call(this,S,Pe);case 22:if(Me=Oe.sent,!fe.hasAbort){Oe.next=25;break}throw new z;case 25:fe.hasTimeout||(Se.value=Me,Ae.enable&&(Se.timeout=0)),Oe.next=33;break;case 28:Oe.prev=28,Oe.t0=Oe.catch(11),fe.hasError=!0,fe.error=Oe.t0,fe.hasTimeout||(Se.error=Bt(Oe.t0).message);case 33:return Oe.prev=33,Ae.clear(),De===re&&(fe.hasTimeout&&(Se.error=fe.error),re>0&&(Se.retry=0)),Se.loading=!1,this.updateComputedValue(Se),Oe.finish(33);case 39:if(!fe.hasError){Oe.next=43;break}if(!(re>0&&Ie>0&&De<re)){Oe.next=43;break}return Oe.next=43,(0,St.g)(Ie);case 43:De++,Oe.next=9;break;case 46:fe.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):fe.hasError||fe.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:fe.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:Me,computedObject:this}),this.onDoneCallback($,fe.error,fe.hasAbort,fe.hasTimeout,S,Me);case 48:case"end":return Oe.stop()}},h,this,[[11,28,33,39]])}));function s(h,S){return m.apply(this,arguments)}return s}()},{key:"onDependsChange",value:function(s){var h=this;this.store.log(function(){return"AsyncComputed<".concat(h.id,"> is running by depends ").concat(s.type,"/").concat(s.path.join(".")," changed ")}),this.run({changed:s})}},{key:"getValueWatchPath",value:function(){var s=this.path.join(J);return["".concat(s,".*"),s]}},{key:"getDepends",value:function(){var s=this,h=b()(R()(f.prototype),"getDepends",this).call(this);return h.map(function(S){if(S.length===0)return S;var $=g()(s.store.computedObjects.values()),T;try{for($.s();!(T=$.n()).done;){var Q=T.value;if(Ee(Q.path,S)&&Q.async)return["".concat(S,".value")]}}catch(G){$.e(G)}finally{$.f()}return S})}}]),f}(Je);function ot(){var I=arguments[0],p=typeof arguments[1]=="function"?arguments[1]:function(){return!0},f=A()(arguments[1])==="object"?arguments[1]:arguments[2],m=Object.assign({depends:[],enable:!0,objectify:!0,filter:p},f),s=function(){return{type:"watch",getter:I,options:m}};return s[w]=!0,s}var ut=function(I){a()(f,I);var p=o()(f);function f(m){var s;return j()(this,f),s=p.call(this),t()(d()(s),"_watcher",{off:function(){}}),t()(d()(s),"_enable",!0),s.store=m,s}return y()(f,[{key:"enable",get:function(){return this._enable},set:function(s){this._enable=s}},{key:"set",value:function(s,h){return b()(R()(f.prototype),"size",this)==0&&this.createWacher(),b()(R()(f.prototype),"set",this).call(this,s,h)}},{key:"createWacher",value:function(){var s=this;this._watcher=this.store.watch("**",function(h){var S=h.path;if(s._enable){var $=he(s.store.state,S),T=g()(s.values()),Q;try{for(T.s();!(Q=T.n()).done;){var G=Q.value;G.isMatched(S,$)&&G.run(S,$)}}catch(te){T.e(te)}finally{T.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off(),this.createWacher()}},{key:"create",value:function(s,h,S){var $=ot(s,h,S),T=$();return this.store._createWatch(T)}},{key:"enableGroup",value:function(s){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,S=g()(this.values()),$;try{for(S.s();!($=S.n()).done;){var T=$.value;T.options.group==s&&(T.options.enable=h)}}catch(Q){S.e(Q)}finally{S.f()}}}]),f}(L()(Map)),lt=function(I){a()(f,I);var p=o()(f);function f(m,s,h){var S;if(j()(this,f),S=p.call(this,m,s,h),t()(d()(S),"_cache",void 0),S.store=m,S.context=h,typeof S.options.filter!="function")throw new Error("watch options.filter must be a function");return S}return y()(f,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(s,h){return ie(s,this.path)?!1:this.filter(s,h)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(s,h){if(!this.enable){this.store.options.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var S,$=(S=this.getter)===null||S===void 0?void 0:S.call(this,{path:s,value:h},this);this.value=$,this.emitStoreEvent("watch:done",{value:$,watchObject:this})}catch(T){this.emitStoreEvent("watch:error",{error:T,watchObject:this})}}}]),f}(Ze),dt=J;function st(I,p){if(!p||p==="**")return!0;var f=I.split(dt),m=p.split(dt);if(f.length!==m.length)return!1;for(var s=0;s<m.length;s++)if(m[s]!=="*"&&m[s]!==f[s])return!1;return!0}var Qe=function(){function I(){j()(this,I),t()(this,"_listeners",new Map)}return y()(I,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var f=this,m=arguments[0],s=arguments[1],h=arguments[2],S=s;return m==="**"?this.addHandler("*",S,h):String(m).includes("*")?(S=function(T,Q){st(Q,m)&&s(T,Q)},this.addHandler("*",S,h)):this.addHandler(m,S,h),{off:function(){return f.off(m,S)}}}},{key:"addHandler",value:function(f,m,s){var h=this._listeners.get(f);h?s?h.unshift(m):h.push(m):this._listeners.set(f,[m])}},{key:"once",value:function(f,m){var s=this,h=function S($,T){try{m($,T)}finally{s.off(T,S)}};return this.on(f,h)}},{key:"off",value:function(f,m){String(f).includes("*")&&(f="*");var s=this._listeners.get(f);s&&(m?s.splice(s.indexOf(m)>>>0,1):this._listeners.set(f,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(f){return this.on("**",f)}},{key:"wait",value:function(){var f=this,m=A()(arguments[0]),s=m==="string"?arguments[0]:void 0,h=arguments[1]||0,S=m==="function"?m:void 0,$;return new Promise(function(T,Q){var G;s?G=f.once(s,function(te){clearTimeout($),T(te)}):typeof S=="function"&&(G=f.onAny(function(te,re){var Ie=S(re,te);Ie!==!1&&(G.off(),clearTimeout($),T(te))})),h>0&&($=setTimeout(function(){G.off(),Q(new Error("timeout"))},h))})}},{key:"emit",value:function(f,m){var s=this._listeners.get("*");s&&s.slice().map(function(h){h(m,f)}),s=this._listeners.get(f),s&&s.slice().map(function(h){h(m,f)})}}]),I}();function Pt(I){var p;return _e(I)?p=I():typeof I=="function"&&(p={type:"computed",getter:I,options:Object.assign({},K(),{async:ve(I)})}),p}var At=function(I){a()(f,I);var p=o()(f);function f(m,s){var h;return j()(this,f),h=p.call(this),t()(d()(h),"_data",void 0),t()(d()(h),"computedObjects",void 0),t()(d()(h),"watchObjects",void 0),t()(d()(h),"_operates",new Qe),t()(d()(h),"_options",void 0),t()(d()(h),"_silenting",!1),t()(d()(h),"_batching",!1),t()(d()(h),"_batchOperates",[]),t()(d()(h),"_peeping",!1),h._options=(0,gt.w)({id:$e(),debug:!1,lazy:!1,enableComputed:!0,log:_t},s),h.computedObjects=new tt(d()(h)),h.watchObjects=new ut(d()(h)),h.subscribeCallbacks(),h._data=bt(m,{notify:h._notify.bind(d()(h)),createComputedObject:h.createObserverObject.bind(d()(h))}),h._options.lazy||et(h._data),h._options.debug&&A()(globalThis.__AUTO_STORES__)=="object"&&globalThis.__AUTO_STORES__.add(d()(h)),h.getSnap=h.getSnap.bind(d()(h)),h.watch=h.watch.bind(d()(h)),h.update=h.update.bind(d()(h)),h.peep=h.peep.bind(d()(h)),h.silentUpdate=h.silentUpdate.bind(d()(h)),h.batchUpdate=h.batchUpdate.bind(d()(h)),h.collectDependencies=h.collectDependencies.bind(d()(h)),h.trace=h.trace.bind(d()(h)),h.installExtends(),h.emit("load",d()(h)),h}return y()(f,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(s,h){this._options.debug&&this.options.log(s,h)}},{key:"installExtends",value:function(){var s=this,h=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(h)&&h.forEach(function(S){return typeof S=="function"&&S(s)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(s){this._peeping&&s.type=="get"||(this._batching&&this._batchOperates.push(s),!this._silenting&&this.operates.emit(s.path.join(J),s))}},{key:"watch",value:function(){var s=this,h=typeof arguments[0]=="function"||arguments[0]==="*",S=h?arguments[0]:arguments[1],$=function(Se,je){return function(We){if(Se!=="*"){if(Se==="write"){if(We.type==="get")return}else if(Se==="read"){if(We.type!=="get")return}else if(Array.isArray(Se)&&Se.length>0&&!Se.includes(We.type))return}typeof je=="function"&&!je(We)||S.call(s,We)}};if(h){var T=Object.assign({once:!1,operates:"write"},arguments[1]),Q=T.operates,G=T.filter,te=$(Q,G);return this.operates.onAny(te)}else{var re=arguments[0],Ie=Array.isArray(re)?re.map(function(De){return typeof De=="string"?De:De.join(J)}):[re],ce=Object.assign({once:!1,operates:"write"},arguments[2]),me=ce.once,Pe=ce.operates,fe=ce.filter,Ae=me?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),Me=[],ke=$(Pe,fe);return Ie.forEach(function(De){Me.push(Ae.call(s,De,ke))}),{off:function(){return Me.forEach(function(Se){return Se.off()})}}}}},{key:"createObserverObject",value:function(s,h,S,$){var T=Pt(h),Q={path:s,value:h,parentPath:S,parent:$};if(T){if(T.type==="computed"){var G=this._createComputed(T,Q);return G==null?void 0:G.initial}else if(T.type==="watch"){var te=this._createWatch(T,Q);return te==null?void 0:te.initial}}else return h}},{key:"_createComputed",value:function(s,h){var S;return s.options.async?S=new rt(this,s,h):S=new at(this,s,h),S&&(S.silentUpdate(S.initial),S.options.objectify&&this.computedObjects.set(S.id,S),this.emit("computed:created",S)),S}},{key:"_createWatch",value:function(s,h){var S=new lt(this,s,h);return s.options.objectify&&this.watchObjects.set(S.id,S),this.emit("watch:created",S),S}},{key:"silentUpdate",value:function(s){this.update(s,{silent:!0})}},{key:"batchUpdate",value:function(s){this.update(s,{batch:!0})}},{key:"update",value:function(s,h){var S=this,$=Object.assign({},h),T=$.batch,Q=T===void 0?!1:T,G=$.reply,te=G===void 0?!0:G,re=$.silent,Ie=re===void 0?!1:re,ce=$.peep,me=ce===void 0?!1:ce;if(typeof s=="function"){Ie&&(this._silenting=!0),Q&&(this._batching=!0,this._silenting=!0),me&&(this._peeping=!0);try{var Pe=s(this.state);if(Q&&ue(Pe))throw new Error("Batch update method can't be async function")}finally{if(this._silenting=!1,this._batching=!1,this._peeping=!1,this._batchOperates.length>0){var fe=x()(this._batchOperates);this._batchOperates=[],te&&fe.forEach(function(Me){Me.reply=!0,S._notify(Me)});try{var Ae=Q===!0?se:String(Q);this.operates.emit(Ae,{type:"batch",path:[Ae],value:fe})}finally{this._batchOperates=[]}}}}else throw new Error("update method must provide a function argument")}},{key:"peep",value:function(){var s=arguments,h=this,S=typeof arguments[0]=="function"?function(){return s[0](h.state)}:function(){return he(h.state,Array.isArray(s[0])?s[0]:s[0].split(J))};this._peeping=!0;try{return S()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(s){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",S=[],$=this.watch(function(T){S.push(T.path)},{operates:h});try{s()}finally{$.off()}return ze(S)}},{key:"trace",value:function(s,h){var S=this,$;return{stop:function(){return $&&$.off()},start:function(){var T=D()(n()().mark(function G(te){var re;return n()().wrap(function(ce){for(;;)switch(ce.prev=ce.next){case 0:return re=[],ce.abrupt("return",new Promise(function(me){$=S.watch(function(Pe){re.push(Pe),te&&te(Pe)&&($.off(),me(re))},{operates:h}),Promise.resolve(s()).finally(function(){typeof te!="function"&&($.off(),me(re))})}));case 2:case"end":return ce.stop()}},G)}));function Q(G){return T.apply(this,arguments)}return Q}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(s){var h=Object.assign({reserveAsync:!0},s),S=h.reserveAsync,$=h.entry;return Ve($?he(this._data,$):this._data,S)}}]),f}(Qe)},11933:function(Y,i,e){"use strict";e.r(i);var k=e(86714),n=e.n(k),U={};for(var D in k)D!=="default"&&(U[D]=function(E){return k[E]}.bind(0,D));e.d(i,U)},86714:function(){},77283:function(Y,i,e){"use strict";e.d(i,{o:function(){return U}});var k=e(80007),n=e(92379);function U(D,E){var x=(0,n.useRef)();return x.current||(x.current=new k.n(D,E)),x.current}},44970:function(Y,i,e){"use strict";e.r(i),e.d(i,{ASYNC_COMPUTED_VALUE:function(){return x.eg},AbortError:function(){return x._L},AsyncComputedObject:function(){return x.WE},AutoStore:function(){return x.M1},AutoStoreError:function(){return x.CD},BATCH_UPDATE_EVENT:function(){return x.up},ComputedObject:function(){return x.Xr},ComputedObjects:function(){return x.BG},CyleDependError:function(){return x.e2},EventEmitter:function(){return x.vp},InvalidComputedArgumentsError:function(){return x.FM},InvalidDependsError:function(){return x.y1},InvalidScopeError:function(){return x.MI},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return x.Q6},OBSERVER_DESCRIPTOR_FLAG:function(){return x.kF},ObserverObject:function(){return x.Rn},ObserverScopeRef:function(){return x.fR},PATH_DELIMITER:function(){return x.f7},ReactAutoStore:function(){return k.n},SKIP_PROXY_FLAG:function(){return x.QI},SyncComputedObject:function(){return x.X3},TimeoutError:function(){return x.W5},WatchObject:function(){return x.RY},WatchObjects:function(){return x.LG},calcDependPaths:function(){return x.Rh},computed:function(){return x.Fl},createStore:function(){return k.M},defineExtend:function(){return x.Ws},delay:function(){return x.gw},forEachObject:function(){return x.b0},getComputedId:function(){return x.tl},getDepends:function(){return x.if},getId:function(){return x.zv},getMapVal:function(){return x.ux},getSnap:function(){return x.kM},getSnapshot:function(){return x.vM},getVal:function(){return x.Jy},isAbsolutePath:function(){return x.O5},isAsyncComputedValue:function(){return x.Jq},isEq:function(){return x.vo},isEventMatched:function(){return x.c6},isMap:function(){return x._N},isObserverDescriptor:function(){return x.iI},isObserverDescriptorBuilder:function(){return x.vb},isPathEq:function(){return x.PH},isPathMatched:function(){return x.J_},isPlainObject:function(){return x.PO},isPrimitive:function(){return x.pt},isPromise:function(){return x.tI},isProxy:function(){return x.RM},isRaw:function(){return x._R},joinValuePath:function(){return x.UQ},markRaw:function(){return x.Xl},noRepeat:function(){return x.DH},normalizeDeps:function(){return x.KZ},pathIsExists:function(){return x.Ql},pathStartsWith:function(){return x.ZW},setVal:function(){return x.Y6},updateObjectVal:function(){return x.EG},useStore:function(){return E.o},watch:function(){return x.YP}});var k=e(80007),n=e(11933),U={};for(var D in n)["default","ReactAutoStore","createStore"].indexOf(D)<0&&(U[D]=function(P){return n[P]}.bind(0,D));e.d(i,U);var E=e(77283),x=e(99640)},80007:function(Y,i,e){"use strict";e.d(i,{n:function(){return oe},M:function(){return ve}});var k=e(6270),n=e.n(k),U=e(93949),D=e.n(U),E=e(28810),x=e.n(E),P=e(77701),A=e.n(P),u=e(28249),j=e.n(u),C=e(29861),y=e.n(C),c=e(99640),d=e(12027),l=e.n(d),a=e(24325),r=e.n(a),o=e(28633),v=e.n(o),t=e(92379);function _(F,K,H,le){if(!K)return F.state;var de;try{typeof K=="function"?de=K(F.state):Array.isArray(K)?de=(0,c.Jy)(F.state,K):de=(0,c.Jy)(F.state,K.split(c.f7)),H&&(0,c.Jq)(de)&&(de=de.value)}catch(ee){if(le)return le(ee)}return de}function g(F){return function(){var K=arguments,H=K.length>=1&&(Array.isArray(K[0])||typeof K[0]=="string"||typeof K[0]=="function")?K[0]:void 0,le=K.length===2&&typeof K[1]=="function"?K[1]:void 0,de=K.length===2&&(typeof H=="string"||Array.isArray(H))&&typeof K[1]=="boolean"?K[1]:!1,ee=(0,t.useState)(function(){return _(F,H,de!==!0)}),ie=v()(ee,2),ge=ie[0],Ee=ie[1],xe=F.useDeps(H,de===!0?"all":"value");(0,t.useEffect)(function(){var pe;return xe.length===0?pe=F.watch(function(){Ee(r()({},F.state))}):pe=F.watch(xe,function(){var ue=_(F,H);Ee((0,c.PO)(ue)?r()({},ue):Array.isArray(ue)?l()(ue):ue)}),function(){return pe.off()}},[xe]);var be=(0,t.useCallback)(function(pe){H?typeof H=="string"?F.update(function(ue){return(0,c.Y6)(ue,H.split(c.f7),pe)}):Array.isArray(H)?F.update(function(ue){return(0,c.Y6)(ue,H,pe)}):typeof H=="function"&&le&&F.update(function(ue){return le(pe,ue)}):typeof pe=="function"&&F.update(function(ue){return pe(ue)},{batch:!0})},[H]);return[ge,be]}}function N(F){return function(K){var H=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",le=(0,t.useState)(function(){return(0,c.if)(K,F,H)}),de=v()(le,1),ee=de[0];return ee}}var b=e(651);function B(F,K,H){var le=H.errorBoundary||F.options.signalErrorBoundary;return t.memo(function(){var de=F.useDeps(K),ee=(0,t.useState)(null),ie=v()(ee,2),ge=ie[0],Ee=ie[1],xe=(0,t.useState)(function(){return _(F,K,!0,Ee)}),be=v()(xe,2),pe=be[0],ue=be[1];return(0,t.useEffect)(function(){var _e=F.watch(de,function(){ue(_(F,K,!0,Ee))});return function(){return _e.off()}},[de]),(0,b.jsx)(b.Fragment,{children:ge?(0,b.jsx)(le,{error:ge}):String(pe)})},function(){return!0})}function R(F,K,H,le){var de=le.errorBoundary||F.options.signalErrorBoundary;return t.memo(function(){var ee=(0,t.useState)(null),ie=v()(ee,2),ge=ie[0],Ee=ie[1],xe=(0,t.useState)(function(){return _(F,H,!1,Ee)}),be=v()(xe,2),pe=be[0],ue=be[1],_e=(0,c.Jq)(pe),Be=(0,t.useMemo)(function(){return _e?pe:{value:pe}},[pe]),ye=F.useDeps(H,"none");return(0,t.useEffect)(function(){var he=_e?"".concat(Array.isArray(H)?H.join(c.f7):H,".*"):ye,Ce=F.watch(he,function(Ne){var Re=Ne.path,$e=Ne.value;ue(_e?r()(r()({},pe),{},y()({},Re[Re.length-1],$e)):_(F,H,!1,Ee))});return function(){return Ce.off()}},[ye]),(0,b.jsx)(b.Fragment,{children:ge?(0,b.jsx)(de,{error:ge}):K(Be)})},function(){return!0})}function O(F,K,H,le){var de=le.errorBoundary||F.options.signalErrorBoundary;return t.memo(function(){var ee=(0,t.useState)(null),ie=v()(ee,2),ge=ie[0],Ee=ie[1],xe=(0,c.vb)(H)?H():H,be=(0,t.useState)(function(){try{if((0,c.iI)(xe)){if(xe.options.objectify=!1,xe.type==="computed")return F.computedObjects.create(xe);if(xe.type==="watch")return F.watchObjects.create(xe)}else{var Ce=(0,c.Fl)(xe),Ne=Ce();return Ne.options.objectify=!1,F.computedObjects.create(Ne)}}catch(Re){return Ee(Re),null}}),pe=v()(be,1),ue=pe[0],_e=(0,t.useState)(function(){return ue?ue.async?ue.value:{value:ue.value}:{value:""}}),Be=v()(_e,2),ye=Be[0],he=Be[1];return(0,t.useEffect)(function(){var Ce={off:function(){}};return ue&&(Ce=ue.watch(function(Ne){if(!Ne.reply)try{if(ue.type==="computed")if(ue.async){var Re=ue;((0,c.PH)(Ne.path,Re.path)||(0,c.PH)(Ne.path.slice(0,-1),Re.path))&&he(r()({},Re.value))}else he({value:ue.value});else ue.type==="watch"&&he({value:ue.value})}catch($e){Ee($e)}},{operates:"write"})),function(){return Ce.off()}},[xe]),(0,b.jsx)(b.Fragment,{children:ge?(0,b.jsx)(de,{error:ge}):K(ye)})},function(){return!0})}function L(F){return function(){var K=arguments,H=K.length>=1&&(typeof K[0]=="string"||typeof K[0]=="function")&&(!K[1]||(0,c.PO)(K[1]))?K[0]:void 0,le=K.length>=2&&typeof K[0]=="function"&&(typeof K[1]=="string"||Array.isArray(K[1])||typeof K[1]=="function")?K[0]:void 0,de=K.length>=2&&typeof K[1]=="function"?K[1]:void 0,ee=K.length>=2&&typeof K[0]=="function"&&(typeof K[1]=="string"||Array.isArray(K[1]))?K[1]:void 0,ie=Object.assign({},K.length>1&&(0,c.PO)(K[K.length-1])?K[K.length-1]:void 0),ge=H?B(F,H,ie):ee?R(F,le,ee,ie):de?O(F,le,de,ie):function(){return(0,b.jsx)(b.Fragment,{})};return(0,b.jsx)(ge,{})}}function W(F){var K=F;if(F){F.persist&&F.persist();var H=F.currentTarget;H&&F.type?H.tagName==="INPUT"&&H.type==="checkbox"?K=H.checked:K=H.value:F.nativeEvent&&F.target&&(K=F.target.value)}return K}function z(F){return function(){var K=arguments,H=K.length>=1&&typeof K[0]=="string"?K[0]:void 0;if(!H)throw new Error("Input bind must have at least one argument");var le={};return le.onChange=function(de){var ee=W(de);(0,c.Y6)(F.state,H.split(c.f7),ee)},le}}function ne(F){return function(){var K=arguments,H=K.length>=1?Array.isArray(K[0])?K[0]:typeof K[0]=="string"?K[0].split(c.f7):void 0:void 0,le=K.length>=2&&typeof K[0]=="function"?K[0]:void 0,de=K.length>=2&&typeof K[1]=="function"?K[1]:void 0,ee=(0,t.useCallback)(function(ue,_e){return{value:_e,onChange:function(ye){var he=W(ye);ue?F.update(function(Ce){return(0,c.Y6)(Ce,Array.isArray(ue)?ue:ue.split(c.f7),he)}):de(he,F.state)}}},[]),ie=(0,t.useCallback)(function(ue,_e){var Be={};return Object.entries(_e).forEach(function(ye){var he=v()(ye,2),Ce=he[0],Ne=he[1];if((0,c.pt)(Ne)){var Re=ue?[].concat(l()(ue),[Ce]):[Ce];Be[Ce]=ee(Re,Ne)}}),Be},[]),ge=(0,t.useState)(function(){if(typeof le=="function")return ee(void 0,le(F.state));var ue=H?_(F,H,!0):F.state;if((0,c.PO)(ue))return ie(H,ue);if(typeof H=="string")return ee(H,ue);if(Array.isArray(H))return ee(H.join(c.f7),ue)}),Ee=v()(ge,2),xe=Ee[0],be=Ee[1],pe=F.useDeps(H||le);return(0,t.useEffect)(function(){var ue;if(pe.length===0||K.length===0)ue=F.watch(function(ye){var he=ye.path,Ce=ye.value;he.length===1&&(0,c.pt)(Ce)&&be(r()(r()({},xe),{},y()({},he[0],ee(he[0],Ce))))});else if(pe.length>0){var _e=H?_(F,H,!0):void 0,Be=(0,c.PO)(_e);H&&Be&&pe.length===1&&pe[0].push("*"),ue=F.watch(pe,function(ye){var he=ye.path,Ce=ye.value;if(typeof le=="function"){var Ne=le(F.state);be(ee(void 0,Ne))}else be(Be?r()(r()({},xe),{},y()({},he[he.length-1],ee(he,Ce))):ee(he,Ce))})}return function(){return ue.off()}},[pe]),xe}}function ae(F){var K=arguments;return function(){var H=K[0],le=K[1],de=K[2];(0,t.useEffect)(function(){var ee=F.watch(H,le,de);return function(){return ee.off()}},[])}}var X=e(34180),M=e.n(X),V=Symbol("FAKE_BINDINGS");function q(F,K){var H={};return K instanceof Map?K.forEach(function(le,de){H[de]=V}):Object.entries(K).forEach(function(le){var de=v()(le,1),ee=de[0];H[ee]=V}),H}function w(F,K,H){return{value:H,onChange:function(de){var ee=W(de);F.update(function(ie){return(0,c.Y6)(ie,K,ee)})}}}function Z(F,K,H,le,de){if(M()(F)!=="object"||F===null)return F;var ee=K.length===0?"__ROOT__":K.join(".");if(H.has(ee))return H.get(ee);var ie=F;(Array.isArray(F)||(0,c.PO)(F))&&(ie=q(le,F));var ge=new Proxy(ie,{get:function(xe,be,pe){if(typeof be!="string")return Reflect.get(xe,be,pe);var ue=[].concat(l()(de),l()(K),[String(be)]),_e=(0,c.Jy)(le.state,ue);return(0,c.pt)(_e)?w(le,ue,_e):(0,c.Jq)(_e)?w(le,[].concat(l()(ue),["value"]),_e):Z(_e,ue,H,le,de)}});return H.set(ee,ge),ge}function J(F,K){var H=new Map;return Z({},[],H,F,K)}function se(F){return function(){var K=arguments,H=K.length>0?typeof K[0]=="string"?K[0].split(c.f7):Array.isArray(K[0])?K[0]:[]:[],le=(0,t.useState)(function(){return F.getSnap({entry:H})}),de=v()(le,2),ee=de[0],ie=de[1],ge=(0,t.useState)(function(){return J(F,H)}),Ee=v()(ge,1),xe=Ee[0];return(0,t.useSyncExternalStore)(function(be){var pe=F.watch(function(ue){var _e=ue.path,Be=ue.value;if((0,c.ZW)(H,_e)){var ye=_e.slice(H.length);(0,c.Y6)(ee,ye,Be),(0,c.Y6)(xe,[].concat(l()(ye),["value"]),Be),ie(r()({},ee)),be()}});return function(){pe.off()}},function(){return ee}),xe}}var oe=function(F){A()(H,F);var K=j()(H);function H(le,de){var ee;return D()(this,H),ee=K.call(this,le,Object.assign({signalErrorBoundary:function(){return(0,b.jsx)(b.Fragment,{children:"ERROR"})}},de)),y()(x()(ee),"useState",void 0),y()(x()(ee),"useAsyncState",void 0),y()(x()(ee),"useDeps",void 0),y()(x()(ee),"$",void 0),y()(x()(ee),"signal",void 0),y()(x()(ee),"bind",void 0),y()(x()(ee),"useInput",void 0),y()(x()(ee),"useWatch",void 0),y()(x()(ee),"useFormBindings",void 0),ee.signal=ee.$=L(x()(ee)).bind(x()(ee)),ee.useState=g(x()(ee)).bind(x()(ee)),ee.useAsyncState=function(ie){return ee.useState(ie,!0)[0]},ee.useDeps=N(x()(ee)).bind(x()(ee)),ee.useInput=ne(x()(ee)).bind(x()(ee)),ee.bind=z(x()(ee)).bind(x()(ee)),ee.useWatch=ae(x()(ee)).bind(x()(ee)),ee.useFormBindings=se(x()(ee)).bind(x()(ee)),ee}return n()(H)}(c.M1);function ve(F,K){return new oe(F,K)}},60358:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(77643);const n=[]},19962:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(61668);const n=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},63611:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(28627);const n=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
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
`,paraId:9,tocIndex:2},{value:"\u7ECF\u8FC7",paraId:10,tocIndex:2},{value:"createStore",paraId:10,tocIndex:2},{value:"\u540E\uFF0C",paraId:10,tocIndex:2},{value:"state.total",paraId:10,tocIndex:2},{value:"\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u6570\u503C\uFF0C\u4E14",paraId:10,tocIndex:2},{value:"typeof(state.total)==='number'",paraId:10,tocIndex:2},{value:"\u3002",paraId:10,tocIndex:2},{value:"createStore",paraId:11,tocIndex:2},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C",paraId:11,tocIndex:2},{value:"computed",paraId:11,tocIndex:2},{value:"\u51FD\u6570\u521B\u5EFA\u4E00\u4E2A",paraId:11,tocIndex:2},{value:"SyncComputedObject",paraId:11,tocIndex:2},{value:"\u5BF9\u8C61,\u4FDD\u5B58\u5728",paraId:11,tocIndex:2},{value:"store.comnutedObjects",paraId:11,tocIndex:2},{value:"\u91CC\u9762\u3002",paraId:11,tocIndex:2},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:12,tocIndex:3},{value:`const state = {
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
`,paraId:15,tocIndex:3},{value:"\u7ECF\u8FC7",paraId:16,tocIndex:3},{value:"createStore",paraId:16,tocIndex:3},{value:"\u540E\uFF0C",paraId:16,tocIndex:3},{value:"state.total",paraId:16,tocIndex:3},{value:"\u5C31\u662F\u4E00\u4E2A",paraId:16,tocIndex:3},{value:"AsyncComputedValue",paraId:16,tocIndex:3},{value:"\uFF0C\u4E14",paraId:16,tocIndex:3},{value:"typeof(state.total)==='object",paraId:16,tocIndex:3},{value:"\u3002",paraId:16,tocIndex:3},{value:`state.total={
  value:10,
  loading:true,
  error:null,
  timeout:0,
  retry:0
  progress,
  run,
  cancel  
}
`,paraId:17,tocIndex:3},{value:"createStore",paraId:18,tocIndex:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C",paraId:18,tocIndex:3},{value:"computed",paraId:18,tocIndex:3},{value:"\u51FD\u6570\u521B\u5EFA\u4E00\u4E2A",paraId:18,tocIndex:3},{value:"AsyncComputedObject",paraId:18,tocIndex:3},{value:"\u5BF9\u8C61,\u4FDD\u5B58\u5728",paraId:18,tocIndex:3},{value:"store.comnutedObjects",paraId:18,tocIndex:3},{value:"\u91CC\u9762\u3002",paraId:18,tocIndex:3}]},58524:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(46267);const n=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
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
`,paraId:4,tocIndex:1},{value:"\u53C2\u6570\u8BF4\u660E\uFF1A",paraId:5,tocIndex:1},{value:"\u53C2\u6570",paraId:6,tocIndex:1},{value:"\u7C7B\u578B",paraId:6,tocIndex:1},{value:"\u8BF4\u660E",paraId:6,tocIndex:1},{value:"getter",paraId:6,tocIndex:1},{value:"AsyncComputedGetter",paraId:6,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:1},{value:"depends",paraId:6,tocIndex:1},{value:"ComputedDepends",paraId:6,tocIndex:1},{value:"\u58F0\u660E\u4F9D\u8D56",paraId:6,tocIndex:1},{value:"options",paraId:6,tocIndex:1},{value:"ComputedOptions",paraId:6,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F8\u5173\u53C2\u6570",paraId:6,tocIndex:1},{value:"getter",paraId:7,tocIndex:2},{value:"\u53C2\u6570\uFF08\u5373\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF09,\u5176\u8FD4\u56DE\u503C\u5C06\u66F4\u65B0\u5230\u72B6\u6001\u4E2D\u7684",paraId:7,tocIndex:2},{value:"computed",paraId:7,tocIndex:2},{value:"\u58F0\u660E\u7684\u8DEF\u5F84\u4E0A\uFF0C\u8BE6\u89C1",paraId:7,tocIndex:2},{value:"\u4ECB\u7ECD",paraId:8,tocIndex:2},{value:"\u3002",paraId:7,tocIndex:2},{value:"depends",paraId:9,tocIndex:3},{value:"\uFF1A\u4F9D\u8D56\u6536\u96C6\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u5982\u4F55\u6307\u5B9A\u4F9D\u8D56\u8BE6\u89C1",paraId:9,tocIndex:3},{value:"\u4F9D\u8D56\u6536\u96C6",paraId:10,tocIndex:3},{value:"\u3002",paraId:9,tocIndex:3},{value:"options",paraId:9,tocIndex:3},{value:"\uFF1A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\uFF0C\u8BE6\u89C1",paraId:9,tocIndex:3},{value:"\u9009\u9879",paraId:11,tocIndex:3},{value:"\u3002",paraId:9,tocIndex:3},{value:"options",paraId:12,tocIndex:4},{value:"\u53C2\u6570\u662F\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"ComputedOptions",paraId:12,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002\u8BE6\u89C1",paraId:12,tocIndex:4},{value:"\u8BA1\u7B97\u53C2\u6570",paraId:13,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u521B\u5EFA\u4E0E\u540C\u6B65\u8BA1\u7B97\u4E00\u6837\u5747\u662F\u4F7F\u7528",paraId:14,tocIndex:5},{value:"computed",paraId:14,tocIndex:5},{value:"\u6765\u58F0\u660E\uFF0C\u4F46\u662F\u6700\u91CD\u8981\u7684\u4E00\u70B9\u662F",paraId:14,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97\u9700\u8981\u663E\u5F0F\u6307\u5B9A\u4F9D\u8D56",paraId:14,tocIndex:5},{value:"\u3002",paraId:14,tocIndex:5},{value:"\u4EE5\u4E0A",paraId:15},{value:"fullName",paraId:15},{value:"\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u624B\u52A8\u6307\u5B9A\u5176\u4F9D\u8D56\u4E8E",paraId:15},{value:"user.firstName",paraId:15},{value:"\u548C",paraId:15},{value:"./lastName",paraId:15},{value:"(\u76F8\u5BF9\u8DEF\u5F84)\u3002",paraId:15},{value:"\u4F9D\u8D56\u53EF\u4EE5\u4F7F\u7528\u7EDD\u5BF9\u8DEF\u5F84\u6216\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4F7F\u7528",paraId:15},{value:".",paraId:15},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u5272\u7B26\uFF0C",paraId:15},{value:"./",paraId:15},{value:"\u6307\u7684\u662F\u5F53\u524D\u5BF9\u8C61\uFF0C",paraId:15},{value:"../",paraId:15},{value:"\u6307\u7684\u662F\u7236\u5BF9\u8C61,\u8BE6\u89C1",paraId:15},{value:"\u4F9D\u8D56\u6536\u96C6",paraId:16},{value:"\u3002",paraId:15},{value:"\u5F53\u5728\u8F93\u5165\u6846\u67B6\u4E2D\u4FEE\u6539",paraId:15},{value:"firstName",paraId:15},{value:"\u6216",paraId:15},{value:"lastName",paraId:15},{value:"\u65F6\uFF0C",paraId:15},{value:"fullName",paraId:15},{value:"\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:15},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u7ED3\u679C\u4FDD\u5B58\u5728",paraId:15},{value:"state.user.fullName.value",paraId:15},{value:"\u4E2D\u3002",paraId:15},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u6B63\u5728\u8BA1\u7B97\u65F6\uFF0C",paraId:15},{value:"state.user.fullName.loading",paraId:15},{value:"\u4E3A",paraId:15},{value:"true",paraId:15},{value:"\u3002\u8BA1\u7B97\u5B8C\u6210\u540E\uFF0C",paraId:15},{value:"state.user.fullName.loading",paraId:15},{value:"\u4E3A",paraId:15},{value:"false",paraId:15},{value:"\u3002",paraId:15},{value:"\u5173\u4E8E",paraId:15},{value:"...bind('user.firstName')",paraId:15},{value:"\u7684\u7528\u6CD5\u8BE6\u89C1",paraId:15},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:17},{value:"\u3002",paraId:15},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u52A0\u8F7D\u72B6\u6001\u4FDD\u5B58\u5728",paraId:18,tocIndex:8},{value:"AsyncComputedValue",paraId:18,tocIndex:8},{value:"\u5BF9\u8C61\u7684",paraId:18,tocIndex:8},{value:"loading",paraId:18,tocIndex:8},{value:"\u5C5E\u6027\u4E2D\uFF0C\u5F53",paraId:18,tocIndex:8},{value:"loading",paraId:18,tocIndex:8},{value:"\u4E3A",paraId:18,tocIndex:8},{value:"true",paraId:18,tocIndex:8},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u6B63\u5728\u8FDB\u884C\u4E2D\u3002",paraId:18,tocIndex:8},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u52A0\u8F7D\u72B6\u6001\u7684\u4F8B\u5B50\uFF1A",paraId:19,tocIndex:8},{value:"useAsyncState",paraId:20},{value:"\u7528\u6765\u8FD4\u56DE\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:20},{value:"\u5F53",paraId:20},{value:"fullName.loading",paraId:20},{value:"\u4E3A",paraId:20},{value:"true",paraId:20},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u6B63\u5728\u8FDB\u884C\u4E2D\u3002",paraId:20},{value:"\u5F53",paraId:20},{value:"fullName.error",paraId:20},{value:"\u4E0D\u4E3A",paraId:20},{value:"null",paraId:20},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u51FA\u9519\u3002",paraId:20},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5141\u8BB8\u63A7\u5236\u8BA1\u7B97\u7684\u8FDB\u5EA6\uFF0C\u6267\u884C\u8FDB\u5EA6\u4FDD\u5B58\u5728",paraId:21,tocIndex:9},{value:"AsyncComputedObject",paraId:21,tocIndex:9},{value:"\u5BF9\u8C61\u7684",paraId:21,tocIndex:9},{value:"progress",paraId:21,tocIndex:9},{value:"\u5C5E\u6027\u4E2D\uFF0C\u5F53",paraId:21,tocIndex:9},{value:"progress",paraId:21,tocIndex:9},{value:"\u4E3A",paraId:21,tocIndex:9},{value:"0-100",paraId:21,tocIndex:9},{value:"\u65F6\uFF0C\u4EE3\u8868\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u3002\u5F00\u53D1\u8005\u53EF\u4EE5\u6839\u636E\u8FDB\u5EA6\u503C\u6765\u5C55\u793A\u8FDB\u5EA6\u6761\u7B49\u3002",paraId:21,tocIndex:9},{value:"\u4F7F\u7528\u65B9\u6CD5\u5982\u4E0B\uFF1A",paraId:22,tocIndex:9},{value:"\u5728\u8BA1\u7B97\u51FD\u6570\u4E2D\uFF0C\u53EF\u4EE5\u901A\u8FC7",paraId:23},{value:"getProgressbar",paraId:23},{value:"\u51FD\u6570\u83B7\u53D6\u4E00\u4E2A\u8FDB\u5EA6\u6761\u5BF9\u8C61\u3002",paraId:23},{value:"\u8FDB\u5EA6\u6761\u5BF9\u8C61\u6709\u4E24\u4E2A\u65B9\u6CD5\uFF1A",paraId:23},{value:"value",paraId:23},{value:"\u548C",paraId:23},{value:"end",paraId:23},{value:"\uFF0C",paraId:23},{value:"value",paraId:23},{value:"\u7528\u6765\u8BBE\u7F6E\u8FDB\u5EA6\u503C\uFF0C",paraId:23},{value:"end",paraId:23},{value:"\u7528\u6765\u7ED3\u675F\u8FDB\u5EA6\u6761\u3002",paraId:23},{value:"\u5728\u521B\u5EFA",paraId:24,tocIndex:10},{value:"computed",paraId:24,tocIndex:10},{value:"\u65F6\u53EF\u4EE5\u6307\u5B9A\u8D85\u65F6\u53C2\u6570(\u5355\u4F4D\u4E3A",paraId:24,tocIndex:10},{value:"ms",paraId:24,tocIndex:10},{value:")\uFF0C\u5B9E\u73B0",paraId:24,tocIndex:10},{value:"\u8D85\u65F6\u5904\u7406",paraId:24,tocIndex:10},{value:"\u548C",paraId:24,tocIndex:10},{value:"\u5012\u8BA1\u65F6",paraId:24,tocIndex:10},{value:"\u529F\u80FD\u3002\u57FA\u672C\u8FC7\u7A0B\u662F\u8FD9\u6837\u7684\u3002",paraId:24,tocIndex:10},{value:"\u6307\u5B9A",paraId:25,tocIndex:10},{value:"options.timeout=\u8D85\u65F6\u65F6\u95F4",paraId:25,tocIndex:10},{value:"\u5F53\u5F02\u6B65\u8BA1\u7B97\u5F00\u59CB\u65F6\uFF0C\u4F1A\u542F\u52A8\u4E00\u4E2A\u5B9A\u65F6\u5668\u65F6\uFF0C\u5E76\u66F4\u65B0",paraId:25,tocIndex:10},{value:"AsyncComputedValue",paraId:25,tocIndex:10},{value:"\u5BF9\u8C61\u7684",paraId:25,tocIndex:10},{value:"timeout",paraId:25,tocIndex:10},{value:"\u5C5E\u6027\u3002",paraId:25,tocIndex:10},{value:"\u5F53\u8D85\u65F6\u89E6\u53D1\u65F6\u4F1A\u89E6\u53D1",paraId:25,tocIndex:10},{value:"TIMEOUT",paraId:25,tocIndex:10},{value:"\u9519\u8BEF\uFF0C\u5C06\u9519\u8BEF\u66F4\u65B0\u5230",paraId:25,tocIndex:10},{value:"AsyncComputedValue.error",paraId:25,tocIndex:10},{value:"\u5C5E\u6027\u4E2D\u3002",paraId:25,tocIndex:10},{value:"\u5728",paraId:26,tocIndex:11},{value:"\u8D85\u65F6",paraId:26,tocIndex:11},{value:"\u529F\u80FD\u4E2D\u4E0D\u4F1A\u81EA\u52A8\u66F4\u65B0",paraId:26,tocIndex:11},{value:"timeout",paraId:26,tocIndex:11},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u901A\u8FC7",paraId:26,tocIndex:11},{value:"timeout=[\u8D85\u65F6\u65F6\u95F4,\u95F4\u9694\u66F4\u65B0\u65F6\u957F]",paraId:26,tocIndex:11},{value:"\u6765\u542F\u7528\u5012\u8BA1\u65F6\u529F\u80FD\u3002",paraId:26,tocIndex:11},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:27,tocIndex:11},{value:"\u6307\u5B9A",paraId:28,tocIndex:11},{value:"options.timoeut=[\u8D85\u65F6\u65F6\u95F4,\u95F4\u9694\u66F4\u65B0\u65F6\u957F]",paraId:28,tocIndex:11},{value:"\u5F53\u5F02\u6B65\u8BA1\u7B97\u5F00\u59CB\u65F6\uFF0C\u4F1A\u542F\u52A8\u4E00\u4E2A\u5B9A\u65F6\u5668\uFF0C\u66F4\u65B0",paraId:28,tocIndex:11},{value:"AsyncComputedValue",paraId:28,tocIndex:11},{value:"\u5BF9\u8C61\u7684",paraId:28,tocIndex:11},{value:"timeout",paraId:28,tocIndex:11},{value:"\u5C5E\u6027\u3002",paraId:28,tocIndex:11},{value:"\u7136\u540E\u6BCF\u9694",paraId:28,tocIndex:11},{value:"\u95F4\u9694\u66F4\u65B0\u65F6\u957F",paraId:28,tocIndex:11},{value:"\u5C31\u66F4\u65B0\u4E00\u6B21",paraId:28,tocIndex:11},{value:"AsyncComputedValue.timoeut",paraId:28,tocIndex:11},{value:"\u5F53\u8D85\u65F6\u89E6\u53D1\u65F6\u4F1A\u89E6\u53D1",paraId:28,tocIndex:11},{value:"TIMEOUT",paraId:28,tocIndex:11},{value:"\u9519\u8BEF\uFF0C\u5C06\u9519\u8BEF\u66F4\u65B0\u5230",paraId:28,tocIndex:11},{value:"AsyncComputedValue.error",paraId:28,tocIndex:11},{value:"\u5C5E\u6027\u4E2D\u3002",paraId:28,tocIndex:11},{value:"\u4F8B\u5982\uFF1A",paraId:29,tocIndex:11},{value:"options.timoeut=[5*1000,5]",paraId:29,tocIndex:11},{value:"\u4EE3\u8868\u8D85\u65F6\u65F6\u95F4\u4E3A5\u79D2\uFF0C\u6BCF1000ms\u66F4\u65B0\u4E00\u6B21",paraId:29,tocIndex:11},{value:"timeout",paraId:29,tocIndex:11},{value:"\u5C5E\u6027\uFF0C\u5012\u8BA1\u65F6",paraId:29,tocIndex:11},{value:"5",paraId:29,tocIndex:11},{value:"\u6B21\u3002",paraId:29,tocIndex:11},{value:"\u5728\u521B\u5EFA",paraId:30,tocIndex:12},{value:"computed",paraId:30,tocIndex:12},{value:"\u65F6\u53EF\u4EE5\u6307\u5B9A\u91CD\u8BD5\u53C2\u6570\uFF0C\u5B9E\u73B0",paraId:30,tocIndex:12},{value:"\u51FA\u9519\u91CD\u8BD5\u6267\u884C",paraId:30,tocIndex:12},{value:"\u7684\u529F\u80FD\u3002\u57FA\u672C\u8FC7\u7A0B\u662F\u8FD9\u6837\u7684\u3002",paraId:30,tocIndex:12},{value:"\u6307\u5B9A",paraId:31,tocIndex:12},{value:"options.retry=[\u91CD\u8BD5\u6B21\u6570,\u91CD\u8BD5\u95F4\u9694ms]",paraId:31,tocIndex:12},{value:"\u5F53\u5F00\u59CB\u6267\u884C\u5F02\u6B65\u8BA1\u7B97\u524D\uFF0C\u4F1A\u66F4\u65B0",paraId:31,tocIndex:12},{value:"AsyncComputedValue.retry",paraId:31,tocIndex:12},{value:"\u5C5E\u6027\u3002",paraId:31,tocIndex:12},{value:"\u5F53\u6267\u884C\u51FA\u9519\u65F6\uFF0C\u4F1A\u540C\u6B65\u66F4\u65B0",paraId:31,tocIndex:12},{value:"AsyncComputedValue.retry",paraId:31,tocIndex:12},{value:"\u5C5E\u6027\u4E3A\u91CD\u8BD5\u6B21\u6570\u3002",paraId:31,tocIndex:12},{value:"\u8BF4\u660E",paraId:32},{value:"\u91CD\u8BD5\u6B21\u6570\u4E3A",paraId:33},{value:"0",paraId:33},{value:"\u65F6\uFF0C\u4E0D\u4F1A\u518D\u6B21\u91CD\u8BD5\u3002\u91CD\u8BD5\u6B21\u6570\u4E3A",paraId:33},{value:"N",paraId:33},{value:"\u65F6\uFF0C\u5B9E\u9645\u4F1A\u6267\u884C",paraId:33},{value:"N+1",paraId:33},{value:"\u6B21\u3002",paraId:33},{value:"\u91CD\u8BD5\u671F\u95F4",paraId:33},{value:"error",paraId:33},{value:"\u4F1A\u66F4\u65B0\u4E3A\u6700\u540E\u4E00\u6B21\u9519\u8BEF\u4FE1\u606F\u3002",paraId:33},{value:"\u5728\u521B\u5EFA",paraId:34,tocIndex:13},{value:"computed",paraId:34,tocIndex:13},{value:"\u65F6\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:34,tocIndex:13},{value:"abortSignal",paraId:34,tocIndex:13},{value:"\u53C2\u6570\uFF0C\u8BE5\u53C2\u6570\u8FD4\u56DE\u4E00\u4E2A",paraId:34,tocIndex:13},{value:"AbortSignal",paraId:34,tocIndex:13},{value:"\uFF0C\u7528\u6765\u53D6\u6D88\u8BA1\u7B97\u64CD\u4F5C\u3002",paraId:34,tocIndex:13},{value:"\u57FA\u672C\u64CD\u4F5C\u65B9\u6CD5\u662F\uFF1A",paraId:35,tocIndex:13},{value:"\u5728",paraId:36,tocIndex:13},{value:"computed",paraId:36,tocIndex:13},{value:"\u4E2D\u4F20\u5165",paraId:36,tocIndex:13},{value:"abortSignal",paraId:36,tocIndex:13},{value:"\u53C2\u6570\uFF0C\u8BE5\u53C2\u6570\u662F\u4E00\u4E2A",paraId:36,tocIndex:13},{value:"AbortSignal",paraId:36,tocIndex:13},{value:"\uFF0C\u53EF\u7528\u6765\u8BA2\u9605",paraId:36,tocIndex:13},{value:"abort",paraId:36,tocIndex:13},{value:"\u4FE1\u53F7\u6216\u8005\u4F20\u9012\u7ED9",paraId:36,tocIndex:13},{value:"fetch",paraId:36,tocIndex:13},{value:"\u6216",paraId:36,tocIndex:13},{value:"axios",paraId:36,tocIndex:13},{value:"\u7B49\u3002",paraId:36,tocIndex:13},{value:"\u53D6\u6D88\u65F6\u53EF\u4EE5\u8C03\u7528",paraId:37,tocIndex:13},{value:"AsyncComputedObject.cancel()",paraId:37,tocIndex:13},{value:"\u65B9\u6CD5\u6765\u89E6\u53D1\u4E00\u4E2A",paraId:37,tocIndex:13},{value:"AbortSignal",paraId:37,tocIndex:13},{value:"\u4FE1\u53F7\u3002\u5982\u4E0B\u4F8B\u4E2D\u8C03\u7528",paraId:37,tocIndex:13},{value:"state.order.total.cancel()",paraId:37,tocIndex:13},{value:"\u6CE8\u610F",paraId:38},{value:"\uFF1A",paraId:38},{value:"abortSignal",paraId:39},{value:"\u53C2\u6570\u662F\u4E00\u4E2A",paraId:39},{value:"AbortSignal",paraId:39},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u7528\u6765\u8BA2\u9605",paraId:39},{value:"abort",paraId:39},{value:"\u4FE1\u53F7\u6216\u8005\u4F20\u9012\u7ED9",paraId:39},{value:"fetch",paraId:39},{value:"\u6216",paraId:39},{value:"axios",paraId:39},{value:"\u7B49\u3002",paraId:39},{value:"\u9700\u8981\u6CE8\u610F\u7684",paraId:39},{value:"\uFF0C\u5982\u679C\u60F3\u8BA9\u8BA1\u7B97\u51FD\u6570\u662F\u53EF\u53D6\u6D88\u7684\uFF0C\u5219\u5F53\u8C03\u7528",paraId:39},{value:"AsyncComputedObject.cancel()",paraId:39},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u5E94\u8BE5\u5728\u63A5\u6536\u5230",paraId:39},{value:"abortSignal",paraId:39},{value:"\u4FE1\u53F7\u65F6\uFF0C\u4E3B\u52A8\u7ED3\u675F\u9000\u51FA\u8BA1\u7B97\u51FD\u6570\u3002\u5982\u679C\u8BA1\u7B97\u51FD\u6570\u6CA1\u6709\u8BA2\u9605",paraId:39},{value:"abort",paraId:39},{value:"\u4FE1\u53F7\uFF0C\u8C03\u7528",paraId:39},{value:"AsyncComputedObject.cancel()",paraId:39},{value:"\u662F\u4E0D\u4F1A\u751F\u6548\u7684\u3002",paraId:39},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u6BCF\u5F53\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\u5747\u4F1A\u6267\u884C\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5728\u8FDE\u7EED\u53D8\u5316\u65F6\u5C31\u4F1A\u91CD\u590D\u6267\u884C\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:40,tocIndex:14},{value:"\u5728\u58F0\u660E\u65F6\uFF0C\u5141\u8BB8\u6307\u5B9A",paraId:41,tocIndex:14},{value:"options.noReentry=true",paraId:41,tocIndex:14},{value:"\u6765\u9632\u6B62\u91CD\u5165\uFF0C\u5982\u679C\u91CD\u5165\u5219\u53EA\u4F1A\u5728\u63A7\u5236\u53F0\u663E\u793A\u4E00\u4E2A\u8B66\u544A\u3002",paraId:41,tocIndex:14},{value:"\u5927\u90E8\u4EFD\u60C5\u51B5\u4E0B\uFF0C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u5E94\u8BE5\u4F7F\u7528",paraId:42,tocIndex:15},{value:"computed",paraId:42,tocIndex:15},{value:"\u8FDB\u884C\u58F0\u660E\uFF0C\u4F46\u4E5F\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\u3002",paraId:42,tocIndex:15},{value:`const order = {
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
`,paraId:58,tocIndex:16}]},77614:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(25231);const n=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
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


`,paraId:10,tocIndex:3},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:11,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",paraId:12,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u9700\u8981\u901A\u8FC7",paraId:13},{value:"computed",paraId:13},{value:"\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56\u3002",paraId:13},{value:"\u4E5F\u53EF\u4EE5\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E\uFF0C\u800C\u662F\u4F7F\u7528",paraId:14,tocIndex:4},{value:"store.computedObject.create",paraId:14,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:14,tocIndex:4},{value:`import { createStore } from '@autostorejs/react';

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

`,paraId:15,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:16,tocIndex:4},{value:"\uFF1A",paraId:16,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:17,tocIndex:4},{value:"./",paraId:17,tocIndex:4},{value:"\u3001",paraId:17,tocIndex:4},{value:"./",paraId:17,tocIndex:4},{value:"\u3001",paraId:17,tocIndex:4},{value:"PARENT",paraId:17,tocIndex:4},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:17,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:17,tocIndex:4},{value:"associated=true",paraId:17,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:17,tocIndex:4},{value:"obj.value",paraId:17,tocIndex:4},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:17,tocIndex:4},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:18,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:19,tocIndex:4},{value:"\u4F7F\u7528",paraId:20},{value:"computed(<getter>,<depends>,<options>)",paraId:20},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:20},{value:"getter",paraId:21},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:21},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:22},{value:"depends",paraId:21},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:21},{value:"\u4F9D\u8D56",paraId:23},{value:"options",paraId:21},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:21},{value:"\u9009\u9879",paraId:24}]},68258:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(83717);const n=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
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


`,paraId:4,tocIndex:1},{value:"Q",paraId:5},{value:": \u4E3A\u4EC0\u4E48\u6709",paraId:5},{value:"\u5B57\u7B26\u4E32\u8DEF\u5F84",paraId:5},{value:"\u548C",paraId:5},{value:"\u6570\u7EC4\u8DEF\u5F84",paraId:5},{value:"\u7684\u533A\u522B\uFF1F",paraId:5},{value:"A",paraId:5},{value:": \u4E24\u8005\u662F\u7B49\u6548\u7684\uFF0C\u76F8\u8F83\u800C\u8A00\uFF0C",paraId:5},{value:"\u4F7F\u7528",paraId:5},{value:".",paraId:5},{value:"\u4F5C\u4E3A\u5206\u5272\u7B26\u7684\u5B57\u7B26\u4E32",paraId:5},{value:"\u66F4\u52A0\u53CB\u597D\u65B9\u4FBF\uFF0C\u4F46\u7F3A\u70B9\u662F\u5F53\u72B6\u6001\u6570\u636E\u7684\u952E\u540D\u79F0\u5305\u542B",paraId:5},{value:".",paraId:5},{value:"\u5B57\u7B26\u65F6\u4F1A\u4EA7\u751F\u5C90\u4E49\u3002\u800C",paraId:5},{value:"\u6570\u7EC4\u8DEF\u5F84",paraId:5},{value:"\u66F4\u52A0\u7CBE\u51C6\uFF0C\u4E0D\u4F1A\u4EA7\u751F\u5C90\u4E49\u3002",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u7C7B\u578B\u5B9A\u4E49\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:"type ComputedDepend = 'CURRENT' | 'ROOT' | 'PARENT' \n  | `/${string}` | `./${string}` | `../${string}` | string | string[] \n\n",paraId:7,tocIndex:2},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u58F0\u660E\u5305\u62EC",paraId:8,tocIndex:2},{value:"\u7EDD\u5BF9\u8DEF\u5F84",paraId:8,tocIndex:2},{value:"\u548C",paraId:8,tocIndex:2},{value:"\u76F8\u5BF9\u8DEF\u5F84",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u4F9D\u8D56\u7C7B\u578B",paraId:9,tocIndex:2},{value:"\u8BF4\u660E",paraId:9,tocIndex:2},{value:"\u793A\u4F8B",paraId:9,tocIndex:2},{value:"CURRENT",paraId:9,tocIndex:2},{value:"\u5F53\u524D\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"computed",paraId:9,tocIndex:2},{value:"\u6240\u5728\u72B6\u6001\u7684\u5BF9\u8C61\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"ROOT",paraId:9,tocIndex:2},{value:"\u6839\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"\u7B49\u6548\u4E8E",paraId:9,tocIndex:2},{value:"/",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7236\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"computed",paraId:9,tocIndex:2},{value:"\u6240\u5728\u72B6\u6001\u7684\u5BF9\u8C61\u8DEF\u5F84\u7684\u7236\u5BF9\u8C61",paraId:9,tocIndex:2},{value:"/${string}",paraId:9,tocIndex:2},{value:"\u7EDD\u5BF9\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"eg. ",paraId:9,tocIndex:2},{value:"/user/name",paraId:9,tocIndex:2},{value:"./${string}",paraId:9,tocIndex:2},{value:"\u76F8\u5BF9",paraId:9,tocIndex:2},{value:"CURRENT",paraId:9,tocIndex:2},{value:"\u7684\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"eg. ",paraId:9,tocIndex:2},{value:"./name",paraId:9,tocIndex:2},{value:"../${string}",paraId:9,tocIndex:2},{value:"\u76F8\u5BF9",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7684\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"eg. ",paraId:9,tocIndex:2},{value:"../name",paraId:9,tocIndex:2},{value:",",paraId:9,tocIndex:2},{value:"../../a/bc",paraId:9,tocIndex:2},{value:"string",paraId:9,tocIndex:2},{value:"\u7EDD\u5BF9\u5B57\u7B26\u4E32\u8DEF\u5F84",paraId:9,tocIndex:2},{value:"\u7B49\u6548\u4E8E",paraId:9,tocIndex:2},{value:"/user.name",paraId:9,tocIndex:2},{value:"\u91CD\u70B9\u7406\u89E3\u4E00\u4E0B",paraId:10,tocIndex:2},{value:"\u76F8\u5BF9\u8DEF\u5F84",paraId:10,tocIndex:2},{value:"\u7684\u6982\u5FF5\uFF1A",paraId:10,tocIndex:2},{value:"\u76F8\u5BF9\u8DEF\u5F84",paraId:11,tocIndex:2},{value:"\u7684\u76F8\u5BF9\u6307\u7684\u662F",paraId:11,tocIndex:2},{value:"computed",paraId:11,tocIndex:2},{value:"\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\uFF0C\u4F8B\u5982\uFF1A",paraId:11,tocIndex:2},{value:"\u76F8\u5BF9\u5F53\u524D\u5BF9\u8C61",paraId:12,tocIndex:2},{value:"\uFF0C\u8FD9\u91CC\u7684\u5F53\u524D\u6307\u7684\u662F",paraId:12,tocIndex:2},{value:"computed",paraId:12,tocIndex:2},{value:"\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\uFF0C\u5373",paraId:12,tocIndex:2},{value:"total",paraId:12,tocIndex:2},{value:"\u6240\u5728\u7684\u5BF9\u8C61\u662F",paraId:12,tocIndex:2},{value:"order",paraId:12,tocIndex:2},{value:"\u5BF9\u8C61\u3002",paraId:12,tocIndex:2},{value:`const state = {
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
`,paraId:13,tocIndex:2},{value:"\u76F8\u5BF9\u7236\u5BF9\u8C61",paraId:14,tocIndex:2},{value:"\uFF0C\u5373",paraId:14,tocIndex:2},{value:"total",paraId:14,tocIndex:2},{value:"\u6240\u5728\u7684\u5BF9\u8C61\u662F",paraId:14,tocIndex:2},{value:"order",paraId:14,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C",paraId:14,tocIndex:2},{value:"..",paraId:14,tocIndex:2},{value:"\u8868\u793A\u7236\u5BF9\u8C61\uFF0C\u6307\u5411\u7684\u5C31\u662F\u6839\u5BF9\u8C61.",paraId:14,tocIndex:2},{value:`const state = {
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
`,paraId:15,tocIndex:2},{value:"\u76F8\u5BF9\u7684\u662F",paraId:16},{value:"computed",paraId:16},{value:"\u51FD\u6570\u58F0\u660E\u7684\u72B6\u6001\u6240\u5728\u7684\u5BF9\u8C61\uFF0C\u4E0A\u4F8B\u4E2D\u7684",paraId:16},{value:"total",paraId:16},{value:"\u6240\u5728\u7684\u5BF9\u8C61\u662F",paraId:16},{value:"order",paraId:16},{value:"\u800C\u4E0D\u662F",paraId:16},{value:"total",paraId:16},{value:"\u3002",paraId:16},{value:"\u5F53\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002\u56E0\u6B64\u5FC5\u7136\u6709\u4EBA\u4E00\u4E2A\u6536\u96C6\u4F9D\u8D56\u7684\u8FC7\u7A0B\uFF0C\u7531\u4E8E\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u6536\u96C6\u65B9\u5F0F\u4E0D\u540C\uFF0C\u56E0\u6B64\u5206\u522B\u4ECB\u7ECD\u3002",paraId:17,tocIndex:3},{value:"\u5728\u540C\u6B65\u5C5E\u6027\u7684\u521D\u59CB\u5316\u4E2D\uFF0C\u4F1A\u81EA\u52A8\u5B8C\u6210\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u539F\u7406\u5982\u4E0B\uFF1A",paraId:18,tocIndex:4},{value:"\u6267\u884C\u540C\u6B65\u8BA1\u7B97\u51FD\u6570",paraId:19,tocIndex:4},{value:"Getter",paraId:19,tocIndex:4},{value:"\u524D\uFF0C\u5148\u8C03\u7528",paraId:19,tocIndex:4},{value:"store.watch",paraId:19,tocIndex:4},{value:"\u51FD\u6570\u6765\u4FA6\u542C\u5BF9\u72B6\u6001\u7684\u6240\u6709\u8BFB\u5199\u4E8B\u4EF6\u3002",paraId:19,tocIndex:4},{value:"\u7136\u540E\u81EA\u52A8\u6267\u884C\u4E00\u6B21\u8BA1\u7B97\u51FD\u6570",paraId:19,tocIndex:4},{value:"Getter",paraId:19,tocIndex:4},{value:"\uFF0C\u8FD9\u6837\u4FA6\u542C\u51FD\u6570\u5C31\u53EF\u4EE5\u4FA6\u542C\u5230",paraId:19,tocIndex:4},{value:"Getter",paraId:19,tocIndex:4},{value:"\u51FD\u6570\u7528\u5230\u4E86\u54EA\u4E9B\u72B6\u6001\uFF0C\u5373\u4F9D\u8D56\u4E86\u54EA\u4E9B\u72B6\u6001\uFF0C\u5C06\u4E4B\u8BB0\u5F55\u4E0B\u6765\u5373\u53EF,\u4ECE\u800C\u5B8C\u6210\u4F9D\u8D56\u7684\u6536\u96C6\u5DE5\u4F5C\u3002",paraId:19,tocIndex:4},{value:"\u6700\u540E\u53D6\u6D88",paraId:19,tocIndex:4},{value:"store.watch",paraId:19,tocIndex:4},{value:"\u4FA6\u542C\u3002",paraId:19,tocIndex:4},{value:"\u7279\u6B8A\u6CE8\u610F\u7684\u662F\uFF0C\u5FC5\u987B",paraId:20,tocIndex:4},{value:"\u4FDD\u8BC1\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u662F\u5E42\u7B49\u7684",paraId:20,tocIndex:4},{value:`\uFF0C \u5373\u591A\u6B21\u8C03\u7528\u7ED3\u679C\u662F\u4E00\u6837\u7684\u3002\u624D\u53EF\u4EE5\u4FDD\u8BC1\u4F9D\u8D56\u6536\u96C6\u7684\u51C6\u786E\u6027\u3002
\u901A\u4FD7\u7684\u8BB2\uFF0C\u5C31\u662F\u8BA1\u7B97\u51FD\u6570\u7684\u6267\u884C\u5FC5\u987B\u80FD\u6536\u96C6\u5230\u76F8\u540C\u7684\u4F9D\u8D56\u3002`,paraId:20,tocIndex:4},{value:"\u5982\u4E0B\u793A\u4F8B\u5C31\u65E0\u6CD5\u4FDD\u8BC1\u6B63\u786E\u6536\u96C6\u4F9D\u8D56\u3002",paraId:21,tocIndex:4},{value:`const state = {
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
`,paraId:22,tocIndex:4},{value:"\u4EE5\u4E0A\u793A\u4F8B\u5728\u7B2C\u4E00\u6B21\u6267\u884C\u65F6\u6536\u96C6\u4F9D\u8D56\uFF0C\u5982\u679C",paraId:23,tocIndex:4},{value:"a=1",paraId:23,tocIndex:4},{value:"\uFF0C\u8FD4\u56DE",paraId:23,tocIndex:4},{value:"scope.count",paraId:23,tocIndex:4},{value:"\uFF0C\u5C31\u53EA\u80FD\u6536\u96C6\u5230",paraId:23,tocIndex:4},{value:"scope.count",paraId:23,tocIndex:4},{value:"\u7684\u4F9D\u8D56\uFF0C\u800C\u4E0D\u4F1A\u6536\u96C6\u5230",paraId:23,tocIndex:4},{value:"scope.price",paraId:23,tocIndex:4},{value:"\u7684\u4F9D\u8D56\u3002\u8FD9\u6837\u5728",paraId:23,tocIndex:4},{value:"scope.price",paraId:23,tocIndex:4},{value:"\u53D8\u5316\u65F6\uFF0C\u5C31\u65E0\u6CD5\u89E6\u53D1",paraId:23,tocIndex:4},{value:"total",paraId:23,tocIndex:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:23,tocIndex:4},{value:"\u5F88\u4E0D\u5E78\uFF0C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u6536\u96C6\u65E0\u6CD5\u50CF\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u90A3\u6837\u81EA\u52A8\u5B8C\u6210\uFF0C\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:24,tocIndex:5},{value:`const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
}
`,paraId:25,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:26,tocIndex:5},{value:"./price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"./count",paraId:26,tocIndex:5},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:26,tocIndex:5},{value:"price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"count",paraId:26,tocIndex:5},{value:"\u5C5E\u6027\u3002",paraId:26,tocIndex:5},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:26,tocIndex:5},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:26,tocIndex:5}]},94957:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(76938);const n=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},15467:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(87480);const n=[{value:"\u5F53\u4F7F\u7528",paraId:0},{value:"computed",paraId:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0},{value:"store.computedObjects",paraId:0},{value:"\u6765\u7BA1\u7406",paraId:0},{value:"store",paraId:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0},{value:"\u901A\u8FC7",paraId:1},{value:"store.computedObjects",paraId:1},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1},{value:"store.computedObjects",paraId:1},{value:"\u662F\u4E00\u4E2A",paraId:1},{value:"Map",paraId:1},{value:"\u5BF9\u8C61\u3002",paraId:1},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3}]},33989:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(15968);const n=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:1},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: AsyncComputedGetter<R>,depends?:ComputedDepends,options?: ComputedOptions<R,ExtraAttrs>): ComputedDescriptor<R & ExtraAttrs>;
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: ComputedGetter<R>, options?: ComputedOptions<R,ExtraAttrs>): R
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: any,depends?:any, options?: ComputedOptions<R,ExtraAttrs>):any {
`,paraId:2,tocIndex:1},{value:"getter",paraId:3,tocIndex:2},{value:"\u53C2\u6570\u662F\u4E00\u4E2A\u540C\u6B65\u6216\u5F02\u6B65\u7684\u8BA1\u7B97\u51FD\u6570\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:3,tocIndex:2},{value:`export type ComputedGetter<R,Scope=any> = (scopeDraft: Scope) => Exclude<R,Promise<any>>
export type AsyncComputedGetter<R,Scope=any> = (scopeDraft:Scope,options:Required<ComputedParams>) => Promise<R>
`,paraId:4,tocIndex:2},{value:"getter",paraId:5,tocIndex:2},{value:"\u51FD\u6570\u7684",paraId:5,tocIndex:2},{value:"this",paraId:5,tocIndex:2},{value:"\u9ED8\u8BA4\u6307\u5411\u6839\u72B6\u6001\u5BF9\u8C61\uFF0C\u4F46\u662F\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:2},{value:"options.context",paraId:5,tocIndex:2},{value:"\u6765\u91CD\u65B0\u6307\u5B9A\u3002",paraId:5,tocIndex:2},{value:"getter",paraId:5,tocIndex:2},{value:"\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u5165\u53C2",paraId:5,tocIndex:2},{value:"scopeDraft",paraId:5,tocIndex:2},{value:"\uFF0C\u5373",paraId:5,tocIndex:2},{value:"\u4F5C\u7528\u57DF",paraId:5,tocIndex:2},{value:"\uFF0C\u9ED8\u8BA4\u6307\u5411\u5F53\u524D\u72B6\u6001\u5BF9\u8C61\uFF0C\u4F46\u662F\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:2},{value:"options.scope",paraId:5,tocIndex:2},{value:"\u6765\u91CD\u65B0\u6307\u5B9A\u3002",paraId:5,tocIndex:2},{value:"computed",paraId:6,tocIndex:3},{value:"\u652F\u6301\u4EE5\u4E0B\u8BA1\u7B97\u914D\u7F6E\u53C2\u6570\uFF1A",paraId:6,tocIndex:3},{value:`
export interface ComputedOptions<Value=any,Extras extends Dict={}> {
  // \u8BA1\u7B97\u51FD\u6570\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u5982\u679C\u672A\u6307\u5B9A\uFF0C\u5219\u81EA\u52A8\u751F\u6210\u4E00\u4E2A\u552F\u4E00\u6807\u8BC6
  id?:string | ((path:string[])=>string)                         
  context?: ComputedContext             // \u8BA1\u7B97\u51FD\u6570\u7684this
  scope?  : ComputedScope               // \u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570
  // \u521D\u59CB\u503C
  initial?: Value
  // \u5F02\u6B65\u8BA1\u7B97,\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u901A\u8FC7typeof(fn)=="async function"\u6765\u5224\u65AD\u662F\u5426\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570
  // \u4F46\u662F\u5728\u8FD4\u56DEPromise\u6216\u8005Babel\u8F6C\u7801\u7B49\u60C5\u51B5\u4E0B\uFF0C\u5224\u65AD\u53EF\u80FD\u5931\u6548\u65F6\uFF0C\u9700\u8981\u624B\u52A8\u6307\u5B9Aasync=true
  async?:boolean
  /**
   * \u6307\u5B9A\u8D85\u65F6\u65F6\u95F4\uFF0C\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u8D85\u8FC7\u6307\u5B9A\u65F6\u95F4\u540E\uFF0C\u4F1A\u81EA\u52A8\u8BBE\u7F6Eloading\u4E3Afalse
   * \u5982\u679Ctimeout\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u5219\u7B2C\u4E00\u4E2A\u503C\u8868\u793A\u8D85\u65F6\u65F6\u95F4\uFF0C\u7B2C\u4E8C\u4E2A\u503C\u8868\u793A\u8D85\u65F6\u671F\u7684\u5012\u8BA1\u65F6\u95F4\u9694
   * \u4F8B\u5982\uFF1A[1000,10]\u8868\u793A1000ms\u4EE3\u88681s\u540E\u8D85\u65F6\u5E76\u7F6Eloading=false
   * 10\u4EE3\u8868setInterval(1000/100), \u6BCF\u6B21\u6267\u884C\u65F6-1\uFF0C\u76F4\u5230\u4E3A0\u65F6\u505C\u6B62
   * \u8FD9\u6837\u5C31\u53EF\u4EE5\u901A\u8FC7\u7ED1\u5B9Atimeout\u503C\u6765\u5B9E\u73B0\u5012\u8BA1\u65F6\u7684\u6548\u679C
   * \u5982\u679C\u8981\u5B9E\u73B060\u79D2\u5012\u8BA1\u65F6\uFF0C\u53EF\u4EE5\u8FD9\u6837\u5199\uFF1A[60*1000,60],\u8FD9\u6837value.timeout\u5C31\u4F1A\u4ECE60\u5F00\u59CB\u9012\u51CF
   */
  timeout?:number  | [number,number]
  // \u662F\u5426\u7ACB\u523B\u8BA1\u7B97\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u5728\u521B\u5EFA\u65F6\u9A6C\u4E0A\u8FDB\u884C\u8BA1\u7B97\uFF0C=false,\u5219\u53EA\u6709\u5728\u4F9D\u8D56\u53D8\u5316\u65F6\u624D\u4F1A\u6267\u884C\uFF0C\u6216\u8005\u624B\u52A8\u8C03\u7528run\u65B9\u6CD5
  immediate?:boolean                     
  /**
   *  \u8BA1\u7B97\u51FD\u6570\u4E0D\u53EF\u91CD\u5165\uFF0C\u5373\u540C\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u4E0D\u4F1A\u518D\u6B21\u6267\u884C   
   *  \u5982\u679C\u91CD\u5165\u65F6\uFF0C\u5219\u5728debug=true\u65F6\u4F1A\u5728\u63A7\u5236\u53F0\u6253\u5370\u51FA\u8B66\u544A\u4FE1\u606F
   */
  noReentry?:boolean
  /**
   * \u63D0\u4F9B\u4E00\u4E2A\u5F02\u6B65\u4FE1\u53F7\uFF0C\u7528\u6765\u4F20\u9012\u7ED9\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u4EE5\u4FBF\u53EF\u4EE5\u53D6\u6D88\u5F02\u6B65\u8BA1\u7B97
   */
  abortSignal?:()=>AbortSignal | null | void | undefined
  /**
   * \u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u51FA\u9519\u65F6\u7684\u91CD\u8BD5\u6B21\u6570
   * 
   * retry:3  \u8868\u793A\u6700\u591A\u91CD\u8BD53\u6B21,\u91CD\u8BD5\u95F4\u9694\u4E3A0\uFF0C\u52A0\u4E0A\u7B2C1\u6B21\u6267\u884C\uFF0C\u603B\u5171\u6267\u884C4\u6B21
   * retry:[3,1000] \u8868\u793A\u6700\u591A\u91CD\u8BD53\u6B21\uFF0C\u91CD\u8BD5\u95F4\u9694\u4E3A1000ms\uFF0C\u52A0\u4E0A\u7B2C1\u6B21\u6267\u884C\uFF0C\u603B\u5171\u6267\u884C4\u6B21
   * 
   * \u91CD\u8BD5\u6570\u636E\u53EF\u4EE5\u901A\u8FC7AsyncComputedObject.retry\u83B7\u53D6
   * \u5F53\u9996\u6B21\u6267\u884C\u5931\u8D25\u65F6\u89E6\u53D1\u91CD\u8BD5\uFF0C\u6B64\u65F6AsyncComputedObject.retry=3\uFF0C\u7136\u540E\u6BCF\u6B21\u91CD\u8BD5-1\uFF0C\u76F4\u5230\u4E3A0\u65F6\u505C\u6B62\u91CD\u8BD5
   * \u53EF\u4EE5\u5728UI\u4E2D\u901A\u8FC7AsyncComputedObject.retry\u6765\u5B9E\u65F6\u663E\u793A\u91CD\u8BD5\u6B21\u6570
   * 
   */
  retry?:number | [number,number]
  /**
   * \u5F53\u6267\u884C\u8BA1\u7B97getter\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03
   */
  onError?:(e:Error)=>void              
  /**
   * \u6307\u5B9A\u8BA1\u7B97\u7ED3\u679C\u66F4\u65B0\u5230\u54EA\u91CC
   * 
   * self: \u9ED8\u8BA4\uFF0C\u539F\u5730\u66FF\u6362\uFF0C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u4F1A\u5C06\u8BA1\u7B97\u51FD\u6570\u8F6C\u6362\u6210\u4E00AsyncComputedObject\u5BF9\u8C61\uFF0C\u6B64\u5BF9\u8C61\u5305\u542Bvalue,loading,error\u7B49\u5C5E\u6027
   * root: \u66F4\u65B0\u5230\u6839\u5BF9\u8C61\u4E2D
   * parent: \u66F4\u65B0\u5230\u7236\u5BF9\u8C61\u4E2D
   * current: \u66F4\u65B0\u5230\u5F53\u524D\u5BF9\u8C61\u4E2D
   * none: \u4E0D\u66F4\u65B0\u5230\u4EFB\u4F55\u5BF9\u8C61\u4E2D
   * {String} \u5F53\u524D\u5BF9\u8C61\u7684\u6307\u5B9A\u952E
   * {Array} \u4ECE\u6839\u5BF9\u8C61\u5F00\u59CB\u7684\u5B8C\u6574\u8DEF\u5F84
   * 
   */
  toComputedResult?: 'self' | 'root' | 'parent' | 'current' | 'none' | string[] | string 
  /**
   * \u4E3A\u8BE5\u8BA1\u7B97\u51FD\u6570\u6307\u5B9A\u4E00\u4E2A\u5206\u7EC4\u540D
   * 
   * \u6B64\u5C5E\u6027\u7528\u6765\u5C06\u8BA1\u7B97\u51FD\u6570\u5206\u7EC4\uFF0C\u6BD4\u5982\u4E00\u4E2Astore\u4E2D\u5177\u6709\u76F8\u540Cgroup\u7684\u8BA1\u7B97\u51FD\u6570
   * 
   * \u7136\u540E\u5C31\u53EF\u4EE5\u542F\u7528/\u5173\u95ED/\u8FD0\u884C\u6307\u5B9A\u5206\u7EC4\u7684\u8BA1\u7B97\u51FD\u6570
   * 
   * \u5728\u8868\u5355\u4E2D\u901A\u8FC7\u4E3A\u6240\u6709validate\u6307\u5B9A\u7EDF\u4E00\u7684\u5206\u7EC4\u540D\u79F0\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u7EDF\u4E00\u63A7\u5236\u8868\u5355\u7684\u9A8C\u8BC1\u662F\u5426\u8BA1\u7B97
   * 
   * store.computedObjects.runGroup("a"])
   * 
   */
  group?:string
  /**
   * \u8BA1\u7B97\u5F00\u5173
   * \u5F53=false\u65F6\u4E0D\u4F1A\u6267\u884C\u8BA1\u7B97
   */

  enable?:boolean
  /**
   * \u989D\u5916\u5408\u5E76\u5230\u8BA1\u7B97\u7ED3\u679CAsyncComputedObject\u4E2D\u7684\u5C5E\u6027
   */
  extras?:Extras
};

`,paraId:7,tocIndex:3}]},51289:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(49613);const n=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:1,tocIndex:1},{value:"ComputedObject",paraId:1,tocIndex:1},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:1,tocIndex:1},{value:"store.computedObjects",paraId:1,tocIndex:1},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:1,tocIndex:1},{value:`export interface ComputedObject<T=Dict> {
  mutate:IMutateWitness<T> 
  run:(throwError?:boolean)=>Promise<any> | any
  async:boolean               // \u662F\u5426\u662F\u5F02\u6B65\u5C5E\u6027
  options:ComputedOptions     // \u5F02\u6B65\u53C2\u6570
}
export class ComputedObjects<T=Dict> extends Map<string,ComputedObject<T>>{  
  async runGroup(group:string)        // \u624B\u52A8\u8FD0\u884C\u6307\u5B9A\u7EC4\u7684\u8BA1\u7B97\u51FD\u6570
  enableGroup(value:boolean)          // \u542F\u7528\u6216\u7981\u7528\u6307\u5B9A\u7EC4\u7684\u8BA1\u7B97\u51FD\u6570
}
`,paraId:2,tocIndex:1},{value:"ComputedObject",paraId:3,tocIndex:1},{value:"\u662F\u4E00\u4E2A\u666E\u901A\u7684",paraId:3,tocIndex:1},{value:"{}",paraId:3,tocIndex:1},{value:",\u91CC\u9762\u4FDD\u5B58\u4E86\u6240\u6709",paraId:3,tocIndex:1},{value:"ComputedOptions",paraId:3,tocIndex:1},{value:"\uFF0C\u56E0\u6B64\u901A\u8FC7",paraId:3,tocIndex:1},{value:"ComputedObject",paraId:3,tocIndex:1},{value:"\u5B9E\u4F8B\u53EF\u4EE5\u8BFB\u53D6\u5230\u8BA1\u7B97\u51FD\u6570\u7684\u6240\u6709\u5C5E\u6027\u3002",paraId:3,tocIndex:1},{value:"ComputedObject",paraId:3,tocIndex:1},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:3,tocIndex:1},{value:"run",paraId:3,tocIndex:1},{value:"\u65B9\u6CD5\u7528\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:"ComputedObjects",paraId:3,tocIndex:1},{value:"\u662F\u4E00\u4E2A",paraId:3,tocIndex:1},{value:"Map",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\uFF0C\u5176\u4E2D\u7684",paraId:3,tocIndex:1},{value:"key",paraId:3,tocIndex:1},{value:"\u662F\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:3,tocIndex:1},{value:"valuePath",paraId:3,tocIndex:1},{value:"\uFF0C",paraId:3,tocIndex:1},{value:"value",paraId:3,tocIndex:1},{value:"\u662F\u7684",paraId:3,tocIndex:1},{value:"ComputedObject",paraId:3,tocIndex:1},{value:"\u3002",paraId:3,tocIndex:1},{value:"\u5728\u4F7F\u7528",paraId:3,tocIndex:1},{value:"computed(getter,deps,options)",paraId:3,tocIndex:1},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C",paraId:3,tocIndex:1},{value:"options",paraId:3,tocIndex:1},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:3,tocIndex:1},{value:"ComputedObject.options",paraId:3,tocIndex:1},{value:"\u8BFB\u53D6\u548C\u4FEE\u6539\uFF0C\u6BD4\u5982\u53EF\u4EE5\u901A\u8FC7",paraId:3,tocIndex:1},{value:"ComputedObject.options.enable=false",paraId:3,tocIndex:1},{value:"\u6765\u7981\u7528\u8BA1\u7B97\u3002",paraId:3,tocIndex:1},{value:"ComputedObjects",paraId:4,tocIndex:3},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:4,tocIndex:3},{value:"runGroup",paraId:4,tocIndex:3},{value:`\u65B9\u6CD5\uFF0C\u7528\u6765\u6267\u884C\u5206\u7EC4\u8BA1\u7B97\u3002
\u5F53\u4F7F\u7528`,paraId:4,tocIndex:3},{value:"computed",paraId:4,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:4,tocIndex:3},{value:"group",paraId:4,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:4,tocIndex:3},{value:"runGroup",paraId:4,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:4,tocIndex:3},{value:`import { createStore,computed } from '@autostorejs/react';
import { Divider,ColorBlock } from "x-react-components"
import { delay } from "autostore-docs"

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

    // Q: \u4E3A\u4EC0\u4E48\u6B64\u5904\u8981\u6307\u5B9Aasync=true?
    // A: \u56E0\u6B64\u672C\u7AD9\u4F7F\u7528webpack/babel\u8FDB\u884C\u8F6C\u7801\uFF0C\u56E0\u6B64\u65E0\u6CD5\u81EA\u52A8\u8BC6\u522Basync\u51FD\u6570\uFF0C\u56E0\u6B64\u9700\u8981\u624B\u52A8\u6307\u5B9Aasync=true
  }
} 

const store = createStore(state)

export default ()=>{
  const [state] = store.useState()

  return (<div>
    <div>BookName ={state.book.name}</div>
    <div>count = <input value={state.book.count} onChange={store.sync(["book","count"])}/></div>
    <div>price = <input value={state.book.price} onChange={store.sync(["book","price"])}/></div>
    <Divider title="Total Group"/>
    <div>Total1 ={state.book.total1.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total1.result}</div> 
    <div>Total2 ={state.book.total2.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total2.result}</div> 
    <div>Total3 ={state.book.total3.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total3.result}</div> 
    <button onClick={()=>store.computedObjects.runGroup("total")}>\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570</button> 
    <Divider title="Average Group"/>
    <div>Average1 ={state.book.average1.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average1.result}</div> 
    <div>Average2 ={state.book.average2.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average2.result}</div> 
    <div>Average3 ={state.book.average3.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average3.result}</div> 
    <button onClick={()=>store.computedObjects.runGroup("average")}>\u6267\u884C\u7EC4average\u8BA1\u7B97\u51FD\u6570</button> 
  </div>)
}


`,paraId:5,tocIndex:3},{value:"\u4EE5\u4E0A\u6211\u4EEC\u5C06\u6240\u6709\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u5747\u8BBE\u4E3A",paraId:6,tocIndex:3},{value:"[]",paraId:6,tocIndex:3},{value:"\uFF0C\u4E5F\u5C31\u662F\u65E0\u4F9D\u8D56\uFF0C\u56E0\u6B64\u5F53",paraId:6,tocIndex:3},{value:"book.price",paraId:6,tocIndex:3},{value:",",paraId:6,tocIndex:3},{value:"book.count",paraId:6,tocIndex:3},{value:"\u7684\u503C\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"Total Group",paraId:6,tocIndex:3},{value:"\u548C",paraId:6,tocIndex:3},{value:"Average Group",paraId:6,tocIndex:3},{value:"\u7684\u8BA1\u7B97\u5C5E\u6027\u5E76\u4E0D\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\uFF0C\u6B64\u65F6\u5C31\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u3002",paraId:6,tocIndex:3},{value:"Q",paraId:7},{value:": \u4E3A\u4EC0\u4E48\u6B64\u5904\u8981\u6307\u5B9A",paraId:7},{value:"async=true",paraId:7},{value:"?",paraId:7},{value:"A",paraId:7},{value:": \u56E0\u6B64\u672C\u7AD9\u4F7F\u7528",paraId:7},{value:"webpack/babel",paraId:7},{value:"\u8FDB\u884C\u8F6C\u7801\uFF0C\u5F02\u6B65\u51FD\u6570\u4F1A\u88AB\u8F6C\u7801\u4E3A\u540C\u6B65\u51FD\u6570\uFF0C\u5BFC\u81F4\u65E0\u6CD5\u81EA\u52A8\u8BC6\u522B",paraId:7},{value:"async",paraId:7},{value:"\u51FD\u6570\uFF0C\u56E0\u6B64\u9700\u8981\u624B\u52A8\u6307\u5B9A",paraId:7},{value:"async=true",paraId:7},{value:"computed",paraId:8,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:8,tocIndex:4},{value:"enable",paraId:8,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:8,tocIndex:4},{value:"enable=false",paraId:8,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:8,tocIndex:4},{value:"enable=true",paraId:8,tocIndex:4},{value:"\u3002",paraId:8,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:9,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:10,tocIndex:4},{value:"computed",paraId:10,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:10,tocIndex:4},{value:"enable",paraId:10,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:10,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:10,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:10,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:10,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:10,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:10,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:10,tocIndex:4},{value:`import { createStore,computed } from '@autostorejs/react';
import { Divider,ColorBlock } from "x-react-components"
import { delay } from "autostore-docs"

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
    <div>BookName ={state.book.name}</div>
    <div>count = <input value={state.book.count} onChange={store.sync(["book","count"])}/></div>
    <div>price = <input value={state.book.price} onChange={store.sync(["book","price"])}/></div>
    <Divider title="Total Group"/>
    <table>
      <tbody>
        <tr>
          <td>Total1 =</td>
          <td>{state.book.total1.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total1.result}</td>
          <td>\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97</td>
        </tr>
        <tr>
          <td>Total2 =</td>
          <td>{state.book.total2.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total2.result}</td>
          <td>\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(<input type="checkbox" checked={store.computedObjects.get("book/total2")} onChange={(e)=>{
            console.log("ff=,",e.target,store.computedObjects.get("book/total2"))
          }} />)</td>
        </tr>        
        <tr>
          <td>Total3 =</td>
          <td>{state.book.total3.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.total3.result}</td>
          <td>\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97</td>
        </tr>
      </tbody>
    </table> 
    <button onClick={()=>store.computedObjects.runGroup("total")}>\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570</button> 
    <Divider title="Average Group"/>
    <div>Average1 ={state.book.average1.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average1.result}</div> 
    <div>Average2 ={state.book.average2.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average2.result}</div> 
    <div>Average3 ={state.book.average3.loading ? '\u8BA1\u7B97\u4E2D...' : state.book.average3.result}</div> 
    <button onClick={()=>store.computedObjects.runGroup("average")}>\u6267\u884C\u7EC4average\u8BA1\u7B97\u51FD\u6570</button> 
  </div>)
}


`,paraId:11,tocIndex:4},{value:"\u5F53\u5728\u72B6\u6001\u4E2D\u4F7F\u7528",paraId:12,tocIndex:5},{value:"computed",paraId:12,tocIndex:5},{value:"\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u5728\u6267\u884C",paraId:12,tocIndex:5},{value:"createStore",paraId:12,tocIndex:5},{value:"\u540E\uFF0C\u4F1A\u6839\u636E\u58F0\u660E\uFF1A",paraId:12,tocIndex:5},{value:"\u521B\u5EFA\u4E00\u4E2A",paraId:13,tocIndex:5},{value:"AsyncComputedObject",paraId:13,tocIndex:5},{value:"\u5B9E\u4F8B,\u9ED8\u8BA4\u4F1A\u4FDD\u5B58\u5728",paraId:13,tocIndex:5},{value:"store.computedObjects",paraId:13,tocIndex:5},{value:"\u4E2D\u3002\u5982\u679C\u914D\u7F6E",paraId:13,tocIndex:5},{value:"options.objectify=false",paraId:13,tocIndex:5},{value:"\u5219\u4E0D\u4F1A\u4FDD\u5B58\u3002",paraId:13,tocIndex:5},{value:"\u72B6\u6001\u4E2D\u7684\u539F\u4F4D\u7F6E\u4F1A\u88AB\u66FF\u6362\u6210\u4E00\u4E2A\u7C7B\u578B\u4E3A",paraId:13,tocIndex:5},{value:"AsyncComputedValue",paraId:13,tocIndex:5},{value:"\u7684\u5BF9\u8C61",paraId:13,tocIndex:5},{value:"\u539F\u5730\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:14,tocIndex:5},{value:"AsyncComputedValue",paraId:15,tocIndex:5},{value:"\u5BF9\u8C61\u7C7B\u578B\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:15,tocIndex:5},{value:`export type AsyncComputedValue<Result= any,ExtAttrs extends Dict = {}> ={
  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
  loading? : boolean;               
  // \u8FDB\u5EA6\u503C    
  progress?: number;                
  // \u8D85\u65F6\u65F6\u95F4\uFF0C\u5355\u4F4Dms\uFF0C\u5F53\u542F\u7528\u8D85\u65F6\u65F6\u8FDB\u884C\u5012\u8BA1\u65F6
  timeout? : number ;               
  // \u6267\u884C\u51FA\u9519\u65F6\u7684\u9519\u8BEF\u4FE1\u606F
  error?   : any;        
  // \u91CD\u8BD5\u6B21\u6570\uFF0C\u5F53\u6267\u884C\u91CD\u8BD5\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u8FDB\u884C\u5012\u8BA1\u65F6\uFF0C\u6BCF\u6B21\u91CD\u8BD5-1\uFF0C\u76F4\u5230\u4E3A0\u65F6\u505C\u6B62\u91CD\u8BD5           
  retry?   : number                 
  // \u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4FDD\u5B58\u5230\u6B64\u5904
  value   : Result;                
  // \u91CD\u65B0\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570
  run  : (options?:RuntimeComputedOptions) => {};    
  // \u4E2D\u6B62\u6B63\u5728\u6267\u884C\u7684\u5F02\u6B65\u8BA1\u7B97
  cancel  : ()=>void                                        
} & ExtAttrs                        // \u989D\u5916\u7684\u5C5E\u6027
`,paraId:16,tocIndex:5},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u4F8B\u5B50\uFF0C",paraId:17,tocIndex:5},{value:"state.user.fullName",paraId:17,tocIndex:5},{value:"\u662F\u4E00\u4E2A",paraId:17,tocIndex:5},{value:"AsyncComputedValue",paraId:17,tocIndex:5},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u3002",paraId:17,tocIndex:5},{value:`
const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: async (user)=>{
      // await some async code
      return user.firstName+user.lastName
    } 
  }
}  
const store = createStore(state)

// \u7ECFcreateStore\u5904\u7406\u540E\u7684fullName\u662F\u4E00\u4E2AAsyncComputedValue\u5BF9\u8C61
store.state.user.fullName=={
  loading:false,          // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
  error:null,             // \u8BA1\u7B97\u9519\u8BEF\u4FE1\u606F
  timout:0,               // \u8D85\u65F6\u8BA1\u7B97\u76F8\u5173
  retry:0,                // \u91CD\u8BD5\u6B21\u6570
  value:"ZhangFisher",    // \u8BA1\u7B97\u7ED3\u679C
  progress:0,             // \u8BA1\u7B97\u8FDB\u5EA6
  run:()=>{},             // \u91CD\u65B0\u6267\u884C\u8BA1\u7B97
  cancel: ()=>void 
}
`,paraId:18,tocIndex:5}]},48248:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(87975);const n=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
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
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},92205:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(48120);const n=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
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
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},35603:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(93359);const n=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0}]},80870:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(76233);const n=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useFormBindings",paraId:2,tocIndex:0}]},94226:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(97820);const n=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},63653:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(36339);const n=[{value:"useFormBindings",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u7EC8\u6781\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u7ED1\u5B9A\u5728\u4E00\u8D77\uFF0C\u4EE3\u7801\u66F4\u52A0\u7B80\u6D01\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useFormBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useFormBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1},{value:"\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:2,tocIndex:2},{value:"useFormBindings",paraId:2,tocIndex:2},{value:"\u6765\u6536\u96C6\u8868\u5355\u6570\u636E\uFF0C\u901A\u8FC7",paraId:2,tocIndex:2},{value:"ref",paraId:2,tocIndex:2},{value:"\u5C5E\u6027\u7ED1\u5B9A\u5230",paraId:2,tocIndex:2},{value:"form",paraId:2,tocIndex:2},{value:"\u5143\u7D20\u4E0A\uFF0C\u7136\u540E\u901A\u8FC7",paraId:2,tocIndex:2},{value:"bindings.ref",paraId:2,tocIndex:2},{value:"\u6765\u83B7\u53D6",paraId:2,tocIndex:2},{value:"form",paraId:2,tocIndex:2},{value:"\u5143\u7D20\u7684\u5F15\u7528\u3002",paraId:2,tocIndex:2},{value:"useFormBindings",paraId:3,tocIndex:2},{value:"\u4F1A\u4FA6\u542C\u8868\u5355\u7684",paraId:3,tocIndex:2},{value:"change",paraId:3,tocIndex:2},{value:"\u4E8B\u4EF6\uFF0C\u7136\u540E\u81EA\u52A8\u540C\u6B65\u8868\u5355\u6570\u636E\u5230\u72B6\u6001\u4E2D\u3002",paraId:3,tocIndex:2},{value:`import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input,Card } from "x-react-components"
 
export default ()=>{

  const { state, $, useFormBindings } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }
  })

  const bindings = useFormBindings()

  return <div>    
    <Card title="\u7528\u6237\u8868\u5355">
    <form ref={bindings.ref}>
      <Input name="user.firstname" label="First Name" />
      <Input name="user.lastname" label="last Name"  />
      <Input name="age" label="Age" />
      <Input type="checkbox" label="VIP"/>
    </form>
    </Card>
    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="Age">{$('user.age')}</ColorBlock>        
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <div></div>    
  </div>
}

`,paraId:4,tocIndex:2}]},13927:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(45889);const n=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useInput",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useInput(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useInput",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
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
`,paraId:6}]},86231:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(9159);const n=[]},26021:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(61077);const n=[]},27067:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(47315);const n=[]},72997:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(26916);const n=[{value:`npm install  @autostorejs/react
`,paraId:0},{value:`yarn add @autostorejs/react
`,paraId:1},{value:`pnpm add @autostorejs/react
`,paraId:2}]},42516:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(3694);const n=[]},679:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(4180);const n=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
`,paraId:4,tocIndex:1},{value:"\u56E0\u6B64",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u5C31\u6709\u4E86",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u6982\u5FF5\uFF0C\u901A\u8FC7",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u8C03\u5EA6\u6765\u5B9E\u73B0\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4F46\u662F",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u8C03\u5EA6\u903B\u8F91\u5F88\u590D\u6742\uFF0C\u5B98\u65B9\u641E\u8FD9\u73A9\u610F\u6298\u817E\u4E86\u6709\u4E00\u5E74\u3002",paraId:5,tocIndex:1},{value:"\u7136\u540E\u5C31\u662F\u4E00\u5806\u7684",paraId:5,tocIndex:1},{value:"React.memo",paraId:5,tocIndex:1},{value:"\u7684\u4F18\u5316\u624B\u6BB5\uFF0C\u4F46\u662F\u5E94\u7528\u590D\u6742\u65F6\uFF0C\u9A7E\u9A6D\u8D77\u6765\u4E5F\u6709",paraId:5,tocIndex:1},{value:"\u6BD4\u8F83\u5927\u7684\u5FC3\u667A\u8D1F\u62C5",paraId:5,tocIndex:1},{value:"\u3002",paraId:5,tocIndex:1},{value:"\u56E0\u6B64\uFF0C\u5B98\u65B9\u53C8\u641E\u4E86\u4E2A",paraId:5,tocIndex:1},{value:"React Compiler",paraId:5,tocIndex:1},{value:"\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4E3A\u4EE3\u7801\u81EA\u52A8\u6DFB\u52A0",paraId:5,tocIndex:1},{value:"React.memo",paraId:5,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u4F46\u8FD9\u73A9\u610F\u4ECE\u63D0\u51FA\u5230\u73B0\u5728\u600E\u4E48\u4E5F\u6709\u4E24\u5E74\u4E86\uFF0C\u8FD8\u5728\u5B9E\u9A8C\u9636\u6BB5\u3002\u4F30\u8BA1\u4E5F\u662F\u4E0D\u592A\u597D\u641E\u3002",paraId:5,tocIndex:1},{value:"\u7531\u4E8E",paraId:6,tocIndex:1},{value:"Virtual DOM",paraId:6,tocIndex:1},{value:"\u7684\u7279\u6027\uFF0C\u65E0\u8BBA\u662F",paraId:6,tocIndex:1},{value:"React",paraId:6,tocIndex:1},{value:"\u8FD8\u662F",paraId:6,tocIndex:1},{value:"Vue",paraId:6,tocIndex:1},{value:"\uFF0C\u672C\u8D28\u4E0A\u90FD\u662F\u5728",paraId:6,tocIndex:1},{value:"Virtual DOM",paraId:6,tocIndex:1},{value:"\u4E0A\u8FDB\u884C",paraId:6,tocIndex:1},{value:"diff",paraId:6,tocIndex:1},{value:"\u7B97\u6CD5\uFF0C\u7136\u540E\u518D\u8FDB\u884C",paraId:6,tocIndex:1},{value:"patch",paraId:6,tocIndex:1},{value:"\u64CD\u4F5C\uFF0C\u5DEE\u522B\u5C31\u662F",paraId:6,tocIndex:1},{value:"diff",paraId:6,tocIndex:1},{value:"\u7B97\u6CD5\u7684\u5B9E\u73B0\u65B9\u5F0F\u4E0D\u540C\u3002",paraId:6,tocIndex:1},{value:"\u4F46\u662F\u65E0\u8BBA\u600E\u4E48\u6574\uFF0C \u5728",paraId:7,tocIndex:1},{value:"Virtual DOM",paraId:7,tocIndex:1},{value:"\u7684",paraId:7,tocIndex:1},{value:"diff",paraId:7,tocIndex:1},{value:"\u7B97\u6CD5\u52A0\u6301\u4E0B\uFF0C\u5C06",paraId:7,tocIndex:1},{value:"\u72B6\u6001\u7684\u53D8\u5316",paraId:7,tocIndex:1},{value:"\u603B\u662F\u96BE\u4EE5\u7CBE\u51C6\u5730\u4E0E",paraId:7,tocIndex:1},{value:"DOM",paraId:7,tocIndex:1},{value:"\u5BF9\u5E94\u5339\u914D\u3002",paraId:7,tocIndex:1},{value:"\u901A\u4FD7\u8BF4\uFF0C\u5C31\u662F\u5F53",paraId:8,tocIndex:1},{value:"state.xxx",paraId:8,tocIndex:1},{value:"\u66F4\u65B0\u65F6\uFF0C\u4E0D\u662F\u76F4\u63A5\u627E\u5230\u4F7F\u7528",paraId:8,tocIndex:1},{value:"state.xxx",paraId:8,tocIndex:1},{value:"\u7684",paraId:8,tocIndex:1},{value:"DOM",paraId:8,tocIndex:1},{value:"\u8FDB\u884C\u7CBE\u51C6\u66F4\u65B0\uFF0C\u800C\u662F\u901A\u8FC7",paraId:8,tocIndex:1},{value:"Virtual DOM",paraId:8,tocIndex:1},{value:"\u7684",paraId:8,tocIndex:1},{value:"diff",paraId:8,tocIndex:1},{value:"\u7B97\u6CD5\u6BD4\u8F83\u7B97\u51FA\u9700\u8981\u66F4\u65B0\u7684",paraId:8,tocIndex:1},{value:"DOM",paraId:8,tocIndex:1},{value:"\u5143\u7D20\uFF0C\u7136\u540E\u518D\u8FDB\u884C",paraId:8,tocIndex:1},{value:"patch",paraId:8,tocIndex:1},{value:"\u64CD\u4F5C\u3002",paraId:8,tocIndex:1},{value:"\u95EE\u9898\u662F\uFF0C\u8FD9\u79CD",paraId:9,tocIndex:1},{value:"diff",paraId:9,tocIndex:1},{value:"\u7B97\u6CD5\u6BD4\u8F83\u590D\u6742\uFF0C\u9700\u8981\u8FDB\u884C\u5404\u5904\u4F18\u5316\uFF0C\u5BF9\u5F00\u53D1\u8005\u4E5F\u6709\u4E00\u5B9A\u7684\u5FC3\u667A\u8D1F\u62C5\uFF0C\u6BD4\u5982\u5728\u5728\u5927\u578B",paraId:9,tocIndex:1},{value:"React",paraId:9,tocIndex:1},{value:"\u5E94\u7528\u4E2D\u5BF9",paraId:9,tocIndex:1},{value:"React.memo",paraId:9,tocIndex:1},{value:"\u7684\u4F7F\u7528,\u6216\u8005\u5728",paraId:9,tocIndex:1},{value:"Vue",paraId:9,tocIndex:1},{value:"\u4E2D\u7684\u6A21\u677F\u4F18\u5316\u7B49\u7B49\u3002",paraId:9,tocIndex:1},{value:"Q: ",paraId:10},{value:"\u4E3A\u4EC0\u4E48\u8BF4\u5728\u5927\u578B\u5E94\u7528\u4E2D\u4F7F\u7528",paraId:10},{value:"React.memo",paraId:10},{value:"\u662F\u4E00\u79CD\u5FC3\u667A\u8D1F\u62C5\uFF1F",paraId:10},{value:"A: \u5B9E\u9645\u4E0A",paraId:10},{value:"React.memo",paraId:10},{value:"\u7684\u903B\u8F91\u672C\u8EAB\u5F88\u7B80\u5355\uFF0C\u65E0\u8BBA\u8001\u624B\u6216\u5C0F\u767D\u5747\u53EF\u4EE5\u8F7B\u677E\u638C\u63E1\u3002\u4F46\u662F\u5728\u5927\u578B\u5E94\u7528\u4E2D\uFF0C\u4E00\u65B9\u9762\u7EC4\u4EF6\u7684\u5D4C\u5957\u5C42\u7EA7\u5F88\u6DF1\uFF0C\u7EC4\u4EF6\u4E4B\u95F4\u7684\u4F9D\u8D56\u5173\u7CFB\u5F88\u590D\u6742\uFF0C\u53E6\u5916\u4E00\u65B9\u9762\uFF0C\u7EC4\u4EF6\u6570\u91CF\u6210\u767E\u4E0A\u5343\u3002\u5982\u679C\u90FD\u8981\u4F7F\u7528",paraId:10},{value:"React.memo",paraId:10},{value:"\u6765\u4F18\u5316\u6E32\u67D3\uFF0C\u5C31\u662F\u4E00\u79CD\u5F88\u5927\u7684\u5FC3\u667A\u8D1F\u62C5\u3002\u5982\u679C\u91C7\u7528\u540E\u671F\u4F18\u5316\uFF0C\u5219\u95EE\u9898\u66F4\u52A0\u4E25\u91CD\uFF0C\u5F80\u5F80\u9700\u8981\u4F7F\u7528\u4E00\u4E9B\u6027\u80FD\u5206\u6790\u5DE5\u5177\u624D\u53EF\u4EE5\u8FDB\u884C\u9488\u5BF9\u6027\u7684\u4F18\u5316\u3002\u7B80\u5355\u5730\u8BF4\uFF0C\u5F53\u5E94\u7528\u590D\u6742\u540E\uFF0C",paraId:10},{value:"React.memo",paraId:10},{value:"\u624D\u4F1A\u6210\u4E3A\u8D1F\u62C5\u3002",paraId:10},{value:"\u56E0\u6B64\u6846\u67B6\u7684\u6700\u6838\u5FC3\u7684\u95EE\u9898\u5C31\u662F",paraId:11},{value:"\u80FD\u6839\u636E",paraId:11},{value:"\u72B6\u6001\u7684\u53D8\u5316",paraId:11},{value:"\u5FEB\u901F\u627E\u5230\u4F9D\u8D56\u4E8E\u8BE5\u72B6\u6001\u7684",paraId:11},{value:"DOM",paraId:11},{value:"\u7684\u8FDB\u884C\u91CD\u65B0\u6E32\u67D3",paraId:11},{value:"\uFF0C\u5373\u6240\u8C13\u7684",paraId:11},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:11},{value:"\u3002",paraId:11},{value:"\u5373\u7136\u57FA\u4E8E",paraId:12},{value:"Virtual DOM",paraId:12},{value:"\u7684",paraId:12},{value:"diff",paraId:12},{value:"\u7B97\u6CD5\u5728\u89E3\u51B3\u7EC6\u7C92\u5EA6\u66F4\u65B0\u65B9\u9762\u5B58\u5728\u95EE\u9898\uFF0C\u90A3\u4E48\u662F\u5426\u53EF\u4EE5\u4E0D\u8FDB\u884C",paraId:12},{value:"diff",paraId:12},{value:"\u7B97\u6CD5\uFF0C\u76F4\u63A5\u627E\u5230",paraId:12},{value:"state.xxx",paraId:12},{value:"\u5BF9\u5E94\u7684",paraId:12},{value:"DOM",paraId:12},{value:"\u8FDB\u884C\u66F4\u65B0\u5462\uFF1F",paraId:12},{value:"\u65B9\u6CD5\u662F\u6709\u7684\uFF0C\u5C31\u662F\u524D\u7AEF\u6700\u7EA2\u7684",paraId:13},{value:"signal",paraId:13},{value:"\u7684\u6982\u5FF5\u3002",paraId:13},{value:"\u4E8B\u5B9E\u4E0A",paraId:14},{value:"signal",paraId:14},{value:"\u6982\u5FF5\u5F88\u65E9\u5C31\u6709\u4E86\uFF0C\u4F46\u662F\u81EA\u51FA\u4E86",paraId:14},{value:"Svelte",paraId:14},{value:"\u4E4B\u7C7B\u7684\u6846\u67B6\uFF0C\u5B83\u4E0D\u4F7F\u7528",paraId:14},{value:"Virtual DOM",paraId:14},{value:"\uFF0C\u4E0D\u9700\u8981",paraId:14},{value:"diff",paraId:14},{value:"\u7B97\u6CD5\uFF0C\u800C\u662F\u5F15\u5165",paraId:14},{value:"signal",paraId:14},{value:"\u6982\u5FF5\uFF0C\u53EF\u4EE5\u5728",paraId:14},{value:"\u4FE1\u53F7\u89E6\u53D1\u65F6\u53EA\u66F4\u65B0\u53D8\u5316\u7684\u90E8\u5206\uFF0C\u771F\u6B63\u7684\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:14},{value:"\uFF0C\u5E76\u4E14\u6027\u80FD\u4E5F\u975E\u5E38\u597D\u3002",paraId:14},{value:"\u8FD9\u4E00\u4E0B\u5B50\u5C31\u628A",paraId:15},{value:"React",paraId:15},{value:"\u548C",paraId:15},{value:"Vue",paraId:15},{value:"\u4E4B\u7C7B\u7684",paraId:15},{value:"Virtual DOM",paraId:15},{value:"\u73A9\u5BB6\u4EEC\u7ED9\u6253\u8499\u4E86\uFF0C\u4E00\u65F6\u95F4",paraId:15},{value:"signal",paraId:15},{value:`\u6210\u4E86\u524D\u7AEF\u5F00\u53D1\u7684\u65B0\u5BA0\u3002
\u6240\u6709\u7684\u524D\u7AEF\u6846\u67B6\u5747\u5728`,paraId:15},{value:"signal",paraId:15},{value:"\u9760\u62E2\uFF0C",paraId:15},{value:"Svelte",paraId:15},{value:"\u548C",paraId:15},{value:"solidjs",paraId:15},{value:"\u6210\u4E86",paraId:15},{value:"signal",paraId:15},{value:"\u6D41\u6D3E\u7684\u4EE3\u8868\uFF0C\u5C31\u8FDE",paraId:15},{value:"Vue",paraId:15},{value:"\u4E5F\u4E0D\u80FD\u514D\u4FD7\uFF0C",paraId:15},{value:"Vue Vapor",paraId:15},{value:"\u5C31\u662F",paraId:15},{value:"Vue",paraId:15},{value:"\u7684",paraId:15},{value:"signal",paraId:15},{value:"\u5B9E\u73B0\uFF08\u8FD8\u6CA1\u6709\u53D1\u5E03\uFF09\u3002",paraId:15},{value:"\u90A3\u4E48\u4EC0\u4E48\u662F\u4FE1\u53F7\uFF1F",paraId:16},{value:"\u5F15\u7528\u5361\u9882\u8001\u5E08\u5173\u4E8E",paraId:17},{value:"signal",paraId:17},{value:"\u7684\u4E00\u7BC7\u6587\u7AE0",paraId:17},{value:"Signal:\u66F4\u591A\u524D\u7AEF\u6846\u67B6\u7684\u9009\u62E9",paraId:17},{value:"\u3002",paraId:17},{value:"\u5361\u9882\u8001\u5E08\u8BF4",paraId:18},{value:"signal\u7684\u672C\u8D28\uFF0C\u662F\u5C06\u5BF9\u72B6\u6001\u7684\u5F15\u7528\u4EE5\u53CA\u5BF9\u72B6\u6001\u503C\u7684\u83B7\u53D6\u5206\u79BB\u5F00\u3002",paraId:18},{value:"\u5927\u795E\u5C31\u662F\u5927\u795E\uFF0C\u4E00\u53E5\u8BDD\u5C31\u628A",paraId:19},{value:"signal",paraId:19},{value:"\u7684\u672C\u8D28\u8BF4\u6E05\u695A\u4E86\u3002\u4F46\u662F\u4E5F\u628A\u6211\u7B49\u666E\u901A\u4EBA\u7ED9\u8BF4\u61F5\u903C\u4E86\uFF0C\u8FD9\u4E2A\u6982\u5FF5\u903C\u683C\u592A\u9AD8\u592A\u62BD\u8C61\u4E86\uFF0C\u679C\u7136\u662F\u5927\u795E\u554A\u3002",paraId:19},{value:"\u4E0B\u9762\u6211\u4EEC\u6309\u51E1\u4EBA\u7684\u601D\u7EF4\u6765\u7406\u4E00\u7406",paraId:20},{value:"signal",paraId:20},{value:"\uFF0C\u6784\u5EFA\u4E00\u5957",paraId:20},{value:"signal",paraId:20},{value:"\u673A\u5236\u7684\u57FA\u672C\u6D41\u7A0B\u539F\u7406\u5982\u4E0B\uFF1A",paraId:20},{value:"\u7B2C1\u6B65\uFF1A \u8BA9\u72B6\u6001\u6570\u636E\u53EF\u89C2\u5BDF",paraId:21},{value:"\u8BA9\u72B6\u6001\u6570\u636E\u53D8\u6210",paraId:22},{value:"\u54CD\u5E94\u5F0F",paraId:22},{value:"\u6216\u8005",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:22},{value:"\uFF0C\u529E\u6CD5\u5C31\u662F\u4F7F\u7528",paraId:22},{value:"Proxy",paraId:22},{value:"\u6216\u8005",paraId:22},{value:"Object.defineProperty",paraId:22},{value:"\u7B49\u65B9\u6CD5\uFF0C\u5C06\u72B6\u6001\u6570\u636E\u53D8\u6210\u4E00\u4E2A",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:22},{value:"\u5BF9\u8C61\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u666E\u901A\u7684\u6570\u636E\u5BF9\u8C61\u3002",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:23},{value:"\u5BF9\u8C61\u7684\u4F5C\u7528\u5C31\u662F",paraId:23},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE",paraId:23},{value:"\uFF0C\u5F53\u72B6\u6001\u53D1\u751F\u8BFB\u5199\u53D8\u5316\u65F6\uFF0C\u5C31\u53EF\u4EE5\u6536\u96C6\u4F9D\u8D56\u4FE1\u606F\u3002",paraId:23},{value:"\u8BA9\u6570\u636E\u53EF\u89C2\u5BDF\u6709\u591A\u79CD\u65B9\u6CD5\uFF0C\u6BD4\u5982",paraId:24},{value:"mobx",paraId:24},{value:"\u5C31\u4E0D\u662F\u4F7F\u7528",paraId:24},{value:"Proxy",paraId:24},{value:"\uFF0C\u800C\u662F\u4F7F\u7528",paraId:24},{value:"Class",paraId:24},{value:"\u7684",paraId:24},{value:"get",paraId:24},{value:"\u5C5E\u6027\u6765\u5B9E\u73B0\u7684\u3002\u751A\u81F3\u4F60\u4E5F\u53EF\u4EE5\u7528\u81EA\u5DF1\u7684\u4E00\u5957",paraId:24},{value:"API",paraId:24},{value:"\u6765\u5B9E\u73B0\u3002\u53EA\u4E0D\u8FC7\u73B0\u5728\u666E\u904D\u4F7F\u7528",paraId:24},{value:"Proxy",paraId:24},{value:"\u5B9E\u73B0\u3002\u6838\u5FC3\u539F\u7406\u5C31\u662F\u8981",paraId:24},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE\uFF0C\u4ECE\u800C\u6536\u96C6\u4F9D\u8D56\u4FE1\u606F",paraId:24},{value:"\u3002",paraId:24},{value:"\u8BA9\u72B6\u6001\u6570\u636E\u53EF\u89C2\u5BDF\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u611F\u77E5\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u8FD9\u6837\u624D\u80FD\u8FDB\u884C\u4E0B\u4E00\u6B65\u7684\u54CD\u5E94\u3002\u611F\u77E5\u7684\u9897\u7C92\u5EA6\u8D8A\u7EC6\uFF0C\u5C31\u8D8A\u80FD\u5B9E\u73B0\u7EC6\u7C92\u5EA6\u66F4\u65B0\u3002",paraId:25},{value:"\u7B2C2\u6B65\uFF1A\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:26},{value:"\u7531\u4E8E\u53EF\u4EE5\u901A\u8FC7",paraId:27},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE",paraId:27},{value:"\uFF0C\u56E0\u6B64\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u77E5\u9053\u4EC0\u4E48\u65F6\u5019\u8BFB\u5199\u72B6\u6001\u4E86\uFF0C\u90A3\u4E48\u6211\u4EEC\u5C31\u53EF\u4EE5\u5728\u8BFB\u5199\u72B6\u6001\u65F6\uFF0C\u53D1\u5E03\u4E00\u4E2A",paraId:27},{value:"\u4FE1\u53F7",paraId:27},{value:"\uFF0C\u901A\u77E5\u8BA2\u9605\u8005\uFF0C\u72B6\u6001\u53D1\u751F\u4E86\u53D8\u5316\u3002",paraId:27},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u5C31\u9700\u8981\u4E00\u4E2A",paraId:28},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:28},{value:"\u7684\u673A\u5236\uFF0C\u6765\u767B\u8BB0\u4EC0\u4E48\u4FE1\u53F7\u53D1\u751F\u4E86\u53D8\u5316\uFF0C\u4EE5\u53CA\u8C01\u8BA2\u9605\u4E86\u8FD9\u4E2A\u4FE1\u53F7\u3002",paraId:28},{value:"\u60A8\u53EF\u4EE5\u4F7F\u7528\u7C7B\u4F3C",paraId:29},{value:"mitt",paraId:29},{value:"\u3001",paraId:29},{value:"EventEmitter",paraId:29},{value:"\u4E4B\u7C7B\u7684\u5E93\u6765\u6784\u5EFA",paraId:29},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:29},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u5199\u4E00\u4E2A\u3002",paraId:29},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:30},{value:"\u6700\u6838\u5FC3\u7684\u4E8B\u5B9E\u4E0A\u5C31\u662F\u4E00\u4E2A\u8BA2\u9605\u8868\uFF0C\u8BB0\u5F55\u4E86\u8C01\u8BA2\u9605\u4E86\u4EC0\u4E48\u4FE1\u53F7\uFF0C\u5728\u524D\u7AEF\u5C31\u662F\u54EA\u4E2ADOM\u6E32\u67D3\u51FD\u6570\uFF0C\u4F9D\u8D56\u4E8E\u54EA\u4E2A\u4FE1\u53F7\uFF08\u72B6\u6001\u53D8\u5316\uFF09\u3002",paraId:30},{value:"\u5EFA\u7ACB\u4E00\u4E2A\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u5EFA\u7ACB",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\u4E0E",paraId:31},{value:"\u72B6\u6001\u6570\u636E",paraId:31},{value:"\u4E4B\u95F4\u7684\u6620\u5C04\u5173\u7CFB\uFF0C\u5F53\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6839\u636E\u4E9B\u6765\u67E5\u8BE2\u5230\u4F9D\u8D56\u4E8E\u8BE5\u72B6\u6001\u6570\u636E\u7684",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\uFF0C\u7136\u540E\u6267\u884C\u8FD9\u4E9B",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\uFF0C\u4ECE\u800C\u5B9E\u73B0",paraId:31},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:31},{value:"\u3002",paraId:31},{value:"\u7B2C3\u6B65\uFF1A\u6E32\u67D3\u51FD\u6570",paraId:32},{value:"\u63A5\u4E0B\u6765\u6211\u4EEC\u7F16\u5199",paraId:33},{value:"DOM",paraId:33},{value:"\u7684\u6E32\u67D3\u51FD\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:33},{value:`  function render() {
      element.textContent = countSignal.value.toString();
  }
`,paraId:34},{value:"\u5728\u6B64\u6E32\u67D3\u51FD\u6570\u4E2D\uFF1A",paraId:35},{value:"\u6211\u4EEC\u76F4\u63A5\u66F4\u65B0",paraId:36},{value:"DOM",paraId:36},{value:"\u5143\u7D20\uFF0C\u6CA1\u6709\u4EFB\u4F55\u7684",paraId:36},{value:"diff",paraId:36},{value:"\u7B97\u6CD5\uFF0C\u4E5F\u6CA1\u6709\u4EFB\u4F55\u7684",paraId:36},{value:"Virtual DOM",paraId:36},{value:"\u3002",paraId:36},{value:"\u51FD\u6570\u4F7F\u7528\u8BBF\u95EE\u72B6\u6001\u6570\u636E",paraId:36},{value:"count",paraId:36},{value:"\u6765\u66F4\u65B0",paraId:36},{value:"DOM",paraId:36},{value:"\u5143\u7D20\uFF0C\u7531\u4E8E\u72B6\u6001\u662F",paraId:36},{value:"\u53EF\u89C2\u5BDF\u7684",paraId:36},{value:"\uFF0C\u56E0\u6B64\u5F53\u6267\u884C",paraId:36},{value:"countSignal.value",paraId:36},{value:"\u65F6\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u62E6\u622A\u5230\u5BF9",paraId:36},{value:"count",paraId:36},{value:"\u7684\u8BBF\u95EE\uFF0C\u4E5F\u5C31\u662F\u8BF4\u6211\u4EEC\u6536\u96C6\u5230\u4E86\u8BE5",paraId:36},{value:"DOM",paraId:36},{value:"\u5143\u7D20\u4F9D\u8D56\u4E8E",paraId:36},{value:"count",paraId:36},{value:"\u72B6\u6001\u6570\u636E\u3002",paraId:36},{value:"\u6709\u4E86\u8FD9\u4E2A",paraId:36},{value:"DOM Render",paraId:36},{value:"\u548C",paraId:36},{value:"\u72B6\u6001\u6570\u636E",paraId:36},{value:"\u7684\u4F9D\u8D56\u5173\u7CFB\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5728",paraId:36},{value:"signal",paraId:36},{value:"\u7684\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u4E2D\u767B\u8BB0\u8FD9\u4E2A\u4F9D\u8D56\u5173\u7CFB.",paraId:36},{value:"\u6536\u96C6\u4F9D\u8D56\u7684\u4F5C\u7528\u5C31\u662F\u5EFA\u7ACB\u6E32\u67D3\u51FD\u6570\u4E0E\u72B6\u6001\u4E4B\u95F4\u7684\u5173\u7CFB\u3002",paraId:37},{value:"\u7B2C3\u6B65\uFF1A\u6CE8\u518C\u6E32\u67D3\u51FD\u6570",paraId:38},{value:"\u6700\u540E\u6211\u4EEC\u5C06",paraId:39},{value:"render",paraId:39},{value:"\u51FD\u6570\u6CE8\u518C\u5230",paraId:39},{value:"signal",paraId:39},{value:"\u7684\u8BA2\u9605\u8005\u5217\u8868\u4E2D\uFF0C\u5F53",paraId:39},{value:"count",paraId:39},{value:"\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u901A\u77E5",paraId:39},{value:"render",paraId:39},{value:"\u51FD\u6570\uFF0C\u4ECE\u800C\u66F4\u65B0",paraId:39},{value:"DOM",paraId:39},{value:"\u5143\u7D20\u3002",paraId:39},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u7B80\u5355\u7684",paraId:40,tocIndex:2},{value:"signal",paraId:40,tocIndex:2},{value:"\u7684\u793A\u4F8B\uFF0C\u6211\u4EEC\u521B\u5EFA\u4E00\u4E2A",paraId:40,tocIndex:2},{value:"signal",paraId:40,tocIndex:2},{value:"\u5BF9\u8C61",paraId:40,tocIndex:2},{value:"countSignal",paraId:40,tocIndex:2},{value:"\uFF0C\u5E76\u4E14\u521B\u5EFA\u4E00\u4E2A",paraId:40,tocIndex:2},{value:"DOM",paraId:40,tocIndex:2},{value:"\u5143\u7D20",paraId:40,tocIndex:2},{value:"countElement",paraId:40,tocIndex:2},{value:"\uFF0C\u5F53",paraId:40,tocIndex:2},{value:"countSignal",paraId:40,tocIndex:2},{value:"\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6211\u4EEC\u66F4\u65B0",paraId:40,tocIndex:2},{value:"countElement",paraId:40,tocIndex:2},{value:"\u7684",paraId:40,tocIndex:2},{value:"textContent",paraId:40,tocIndex:2},{value:"\u3002",paraId:40,tocIndex:2},{value:`        class Signal<T> {
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
`,paraId:42},{value:"\u90A3\u4E48\u6211\u4EEC\u5982\u4F55\u5728",paraId:43,tocIndex:3},{value:"React",paraId:43,tocIndex:3},{value:"\u4E2D\u4F7F\u7528",paraId:43,tocIndex:3},{value:"signal",paraId:43,tocIndex:3},{value:"\u5462\uFF1F",paraId:43,tocIndex:3},{value:"\u4ECE\u4E0A\u9762\u6211\u4EEC\u53EF\u4EE5\u77E5\u9053\uFF0C",paraId:44,tocIndex:3},{value:"signal",paraId:44,tocIndex:3},{value:"\u9A71\u52A8\u7684\u524D\u7AEF\u6846\u67B6\u662F\u5B8C\u5168\u4E0D\u9700\u8981",paraId:44,tocIndex:3},{value:"Virtual DOM",paraId:44,tocIndex:3},{value:"\u7684\u3002",paraId:44,tocIndex:3},{value:"\u800C\u672C\u8D28\u4E0A",paraId:45,tocIndex:3},{value:"React",paraId:45,tocIndex:3},{value:"\u5E76\u4E0D\u662F\u4E00\u4E2A",paraId:45,tocIndex:3},{value:"Signal",paraId:45,tocIndex:3},{value:"\u6846\u67B6\uFF0C\u5176\u6E32\u67D3\u8C03\u5EA6\u662F\u57FA\u4E8E",paraId:45,tocIndex:3},{value:"Virtual DOM",paraId:45,tocIndex:3},{value:"\u3001",paraId:45,tocIndex:3},{value:"fiber",paraId:45,tocIndex:3},{value:"\u548C",paraId:45,tocIndex:3},{value:"diff",paraId:45,tocIndex:3},{value:"\u7B97\u6CD5\u7684\u3002",paraId:45,tocIndex:3},{value:"\u56E0\u6B64\uFF0C",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u5E76\u4E0D\u652F\u6301",paraId:46,tocIndex:3},{value:"signal",paraId:46,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u9664\u6392\u672A\u6765",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u50CF",paraId:46,tocIndex:3},{value:"Vue",paraId:46,tocIndex:3},{value:"\u4E00\u6837\u5347\u7EA7",paraId:46,tocIndex:3},{value:"Vue Vapor mode",paraId:46,tocIndex:3},{value:"\u8FDB\u884C\u91CD\u5927\u5347\u7EA7\uFF0C\u629B\u5F03",paraId:46,tocIndex:3},{value:"Virtual DOM",paraId:46,tocIndex:3},{value:"\uFF0C\u5426\u5219\u5728",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u5728\u4E2D\u662F\u4E0D\u80FD\u771F\u6B63\u4F7F\u7528\u5982\u540C",paraId:46,tocIndex:3},{value:"solidjs",paraId:46,tocIndex:3},{value:"\u548C",paraId:46,tocIndex:3},{value:"Svelte",paraId:46,tocIndex:3},{value:"\u7684",paraId:46,tocIndex:3},{value:"signal",paraId:46,tocIndex:3},{value:"\u6982\u5FF5\u7684\u3002",paraId:46,tocIndex:3},{value:"\u4F46\u662F\u65E0\u8BBA\u662F",paraId:47,tocIndex:3},{value:"Virtual DOM",paraId:47,tocIndex:3},{value:"\u8FD8\u662F",paraId:47,tocIndex:3},{value:"signal",paraId:47,tocIndex:3},{value:"\uFF0C\u6838\u5FC3\u5747\u662F\u4E3A\u5173\u4E8E\u51B3",paraId:47,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:47,tocIndex:3},{value:"\u7684\u95EE\u9898\uFF0C\u4ECE\u800C\u63D0\u9AD8\u6E32\u67D3\u95EE\u9898\u3002",paraId:47,tocIndex:3},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7ED3\u5408",paraId:48,tocIndex:3},{value:"React",paraId:48,tocIndex:3},{value:"\u7684",paraId:48,tocIndex:3},{value:"React.memo",paraId:48,tocIndex:3},{value:"\u548C",paraId:48,tocIndex:3},{value:"useMemo",paraId:48,tocIndex:3},{value:"\u7B49\u65B9\u6CD5\u6765\u6A21\u62DF",paraId:48,tocIndex:3},{value:"signal",paraId:48,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u5B9E\u73B0",paraId:48,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:48,tocIndex:3},{value:"\u3002",paraId:48,tocIndex:3},{value:"\u8FD9\u6837\u6211\u4EEC\u5C31\u6709\u4E86",paraId:49,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:49,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u5176\u672C\u8D28\u4E0A\u662F\u4F7F\u7528",paraId:49,tocIndex:3},{value:"React.memo",paraId:49,tocIndex:3},{value:"\u5305\u88F9\u7684",paraId:49,tocIndex:3},{value:"ReactNode",paraId:49,tocIndex:3},{value:"\u7EC4\u4EF6\uFF0C\u5C06\u6E32\u67D3\u66F4\u65B0\u9650\u5236\u5728\u8F83\u7EC6\u7684\u8303\u56F4\u5185\u3002",paraId:49,tocIndex:3},{value:"\u6838\u5FC3\u662F\u4E00\u5957\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u5206\u53D1\u673A\u5236\uFF0C\u7528\u6765\u611F\u77E5\u72B6\u6001\u53D8\u5316\uFF0C\u7136\u540E\u901A\u8FC7\u4E8B\u4EF6\u5206\u53D1\u53D8\u5316\u3002",paraId:50,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6\u672C\u8D28\u4E0A\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u7684\u662FReact\u7EC4\u4EF6\uFF0C\u4F46\u4F7F\u7528",paraId:50,tocIndex:3},{value:"React.memo(()=>{.....},()=>true)",paraId:50,tocIndex:3},{value:"\u8FDB\u884C\u5305\u88C5\uFF0C",paraId:50,tocIndex:3},{value:"diff",paraId:50,tocIndex:3},{value:"\u603B\u662F\u8FD4\u56DE",paraId:50,tocIndex:3},{value:"true",paraId:50,tocIndex:3},{value:",\u7528\u6765\u9694\u79BB",paraId:50,tocIndex:3},{value:"DOM",paraId:50,tocIndex:3},{value:"\u6E32\u67D3\u8303\u56F4\u3002",paraId:50,tocIndex:3},{value:"\u7136\u540E\u5728\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u4F1A\u4ECE\u72B6\u6001\u5206\u53D1\u4E2D\u8BA2\u9605\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\u91CD\u65B0\u6E32\u67D3\u8BE5\u7EC4\u4EF6\u3002",paraId:50,tocIndex:3},{value:"\u7531\u4E8E",paraId:50,tocIndex:3},{value:"diff",paraId:50,tocIndex:3},{value:"\u603B\u662F\u8FD4\u56DE",paraId:50,tocIndex:3},{value:"true",paraId:50,tocIndex:3},{value:"\uFF0C\u56E0\u6B64\u91CD\u65B0\u6E32\u67D3\u5C31\u88AB\u7EA6\u675F\u5728\u4E86\u8BE5\u7EC4\u4EF6\u5185\u90E8\uFF0C\u4E0D\u4F1A\u5F15\u8D77\u8FDE\u9501\u53CD\u5E94\uFF0C\u4ECE\u800C\u5B9E\u73B0\u4E86",paraId:50,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:50,tocIndex:3},{value:"\u3002",paraId:50,tocIndex:3},{value:"\u4EE5\u4E0B\u662F",paraId:51,tocIndex:3},{value:"AutoStore",paraId:51,tocIndex:3},{value:"\u4E2D\u7684",paraId:51,tocIndex:3},{value:"signal",paraId:51,tocIndex:3},{value:"\u7684\u4E00\u4E2A\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:51,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6\u4EC5\u4EC5\u662F\u6A21\u62DF",paraId:52},{value:"signal",paraId:52},{value:"\u5B9E\u73B0\u4E86",paraId:52},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:52},{value:"\uFF0C\u5176\u672C\u8D28\u4E0A\u662F\u4F7F\u7528",paraId:52},{value:"React.memo",paraId:52},{value:"\u5305\u88F9\u7684",paraId:52},{value:"ReactNode",paraId:52},{value:"\u7EC4\u4EF6\u3002",paraId:52},{value:"\u521B\u5EFA",paraId:52},{value:"$",paraId:52},{value:"\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C",paraId:52},{value:"$",paraId:52},{value:"\u662F",paraId:52},{value:"signal",paraId:52},{value:"\u7684\u5FEB\u6377\u540D\u79F0\u3002\u56E0\u6B64\u4E0A\u9762\u7684",paraId:52},{value:"{$('age')}",paraId:52},{value:"\u7B49\u4EF7\u4E8E",paraId:52},{value:'{signal("age")}',paraId:52},{value:"\u3002",paraId:52},{value:"\u66F4\u591A\u7684",paraId:52},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:52},{value:"\u7684\u7528\u6CD5\u8BF7\u53C2\u8003",paraId:52},{value:"signal",paraId:53},{value:"\u3002",paraId:52},{value:"\u7531\u4E8E",paraId:54,tocIndex:5},{value:"React",paraId:54,tocIndex:5},{value:"\u6C89\u91CD\u7684\u5386\u53F2\u5305\u88B1\uFF0C\u5728\u53EF\u4EE5\u9884\u89C1\u7684\u672A\u6765\uFF0C",paraId:54,tocIndex:5},{value:"React",paraId:54,tocIndex:5},{value:"\u5E94\u8BE5\u4E0D\u4F1A\u652F\u6301\u771F\u6B63\u610F\u4E49\u4E0A\u7684",paraId:54,tocIndex:5},{value:"signal",paraId:54,tocIndex:5},{value:"\u3002",paraId:54,tocIndex:5},{value:"\u5728\u5361\u9882\u8001\u5E08`\u7684",paraId:55,tocIndex:5},{value:"Signal:\u66F4\u591A\u524D\u7AEF\u6846\u67B6\u7684\u9009\u62E9",paraId:55,tocIndex:5},{value:"\u4E2D\u4E5F\u63D0\u5230\uFF0C",paraId:55,tocIndex:5},{value:"React\u56E2\u961F\u6210\u5458\u5BF9\u6B64\u7684\u89C2\u70B9\u662F\uFF1A",paraId:56,tocIndex:5},{value:"\u6709\u53EF\u80FD\u5F15\u5165\u7C7B\u4F3C",paraId:57,tocIndex:5},{value:"Signal",paraId:57,tocIndex:5},{value:"\u7684\u539F\u8BED",paraId:57,tocIndex:5},{value:"Signal",paraId:57,tocIndex:5},{value:"\u6027\u80FD\u786E\u5B9E\u597D\uFF0C\u4F46\u4E0D\u592A\u7B26\u5408",paraId:57,tocIndex:5},{value:"React",paraId:57,tocIndex:5},{value:"\u7684\u7406\u5FF5",paraId:57,tocIndex:5},{value:"\u800C",paraId:58,tocIndex:5},{value:"AutoStore",paraId:58,tocIndex:5},{value:"\u6240\u652F\u6301\u7684",paraId:58,tocIndex:5},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:58,tocIndex:5},{value:"\u7684\u6982\u5FF5\uFF0C\u53EF\u4EE5\u89C6\u4E3A\u6A21\u62DF",paraId:58,tocIndex:5},{value:"signal",paraId:58,tocIndex:5},{value:"\u6216\u8005\u7C7B\u4F3C",paraId:58,tocIndex:5},{value:"Signal",paraId:58,tocIndex:5},{value:"\u7684\u539F\u8BED\uFF0C\u4F7F\u5F97\u6211\u4EEC\u53EF\u4EE5\u5728",paraId:58,tocIndex:5},{value:"React",paraId:58,tocIndex:5},{value:"\u4E2D\u5B9E\u73B0",paraId:58,tocIndex:5},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:58,tocIndex:5},{value:"\uFF0C\u800C\u4E0D\u7528\u518D\u53BB\u7EA0\u7ED3",paraId:58,tocIndex:5},{value:"React.memo",paraId:58,tocIndex:5},{value:"\u7684\u4F7F\u7528\u3002",paraId:58,tocIndex:5},{value:"\u81EA",paraId:59},{value:"React 19",paraId:59},{value:"\u5F00\u59CB,",paraId:59},{value:"React",paraId:59},{value:"\u5B98\u65B9\u63A8\u51FA",paraId:59},{value:"Compiler",paraId:59},{value:"\uFF0C\u5E2E\u52A9\u7528\u6237\u89E3\u51B3",paraId:59},{value:"React.memo",paraId:59},{value:"\u7684\u95EE\u9898\uFF0C\u51CF\u5C11\u7528\u6237\u7684\u5FC3\u667A\u8D1F\u62C5\u3002\u4F46\u662F\u5176\u5E76\u4E0D\u662F\u4E3A\u5173\u4E8E\u51B3\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u95EE\u9898\uFF0C\u800C\u662F\u4F18\u5316\u63D0\u9AD8",paraId:59},{value:"React",paraId:59},{value:`\u7684\u6027\u80FD\u3002
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},86761:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(75690);const n=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
\u652F\u6301\u591A\u79CD\u65B9\u5F0F\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u7684\u51FD\u6570`,paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u5C01\u88C5\u5355\u4E2A\u72B6\u6001\u6570\u636E
    (selector: string,options?:SignalComponentOptions):React.ReactNode
    // \u5C01\u88C5\u7EC4\u5408\u591A\u4E2A\u72B6\u6001\u6570\u636E
    <Value=any>(selector: (state:ComputedState<State>)=>Value,options?:SignalComponentOptions):React.ReactNode
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
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},47864:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(8767);const n=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},57143:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(63518);const n=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
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
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},82919:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(35371);const n=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},89615:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(33358);const n=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},56126:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(23841);const n=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
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
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},32465:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(81897);const n=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF08\u57FA\u4E8E",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u5C01\u88C5\uFF09\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},80814:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(94451);const n=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},60726:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(61786);const n=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},37445:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(34450);const n=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
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
`,paraId:14,tocIndex:2}]},1451:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(89073);const n=[{value:"watch",paraId:0},{value:"\u51FD\u6570\u4E0E",paraId:0},{value:"computed",paraId:0},{value:"\u51FD\u6570\u529F\u80FD\u7684\u533A\u522B\u5982\u4E0B\uFF1A",paraId:0},{value:"computed",paraId:1},{value:"\u51FD\u6570\u662F\u7528\u6765\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u7684\uFF0C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u662F\u7528\u6765\u4FA6\u542C",paraId:1},{value:"State",paraId:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u7684\u3002",paraId:1},{value:"computed",paraId:1},{value:"\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:1},{value:"State",paraId:1},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\uFF0C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:1},{value:"computed",paraId:1},{value:"\u51FD\u6570\u7684\u521B\u5EFA\u7684\u8BA1\u7B97\u5C5E\u6027\u662F\u57FA\u4E8E\u4F9D\u8D56\u6536\u96C6\u7684\uFF0C\u800C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u662F\u57FA\u4E8E\u4FA6\u542C\u7684,\u6BCF\u5F53",paraId:1},{value:"State",paraId:1},{value:"\u72B6\u6001\u53D8\u5316\u65F6\u5747\u4F1A\u8C03\u7528",paraId:1},{value:"watchOptions.on",paraId:1},{value:"\u8FC7\u6EE4\u51FD\u6570\u6765\u5339\u914D\u4FA6\u542C\u51FD\u6570\uFF0C\u56E0\u6B64\u7406\u8BBA\u4E0A\uFF0C",paraId:1},{value:"computed",paraId:1},{value:"\u51FD\u6570\u7684\u6027\u80FD\u66F4\u597D\uFF0C\u800C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u6027\u80FD\u4F1A\u5DEE\u4E9B\u3002",paraId:1},{value:"watch",paraId:1},{value:"\u53EA\u80FD\u662F\u540C\u6B65\u4FA6\u542C\u51FD\u6570\uFF0C\u800C",paraId:1},{value:"computed",paraId:1},{value:"\u53EF\u4EE5\u662F\u5F02\u6B65\u51FD\u6570\u3002",paraId:1}]},65365:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(26826);const n=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6BCF\u4E00\u4E2A\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u5305\u88C5\u7684\u8BA1\u7B97\u51FD\u6570\u5747\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:`export interface WatchObject extends WatchOptions>{ 
    path:string[]
    run:(fromPath:string[])=>void
    listener:(...args:any[])=>any
}
`,paraId:2,tocIndex:0},{value:"\u6240\u6709\u521B\u5EFA\u7684",paraId:3,tocIndex:0},{value:"WatchObject",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:3,tocIndex:0},{value:"Store.watchObjects",paraId:3,tocIndex:0},{value:` class WatchObjects extends Map{
    enable:boolean
    reset(){}
    enableGroup(groupName:string,value:boolean=true){}
 }

`,paraId:4,tocIndex:0}]},39668:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(56081);const n=[{value:"\u5927\u90E8\u4EFD\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u5E94\u8BE5\u4F7F\u7528",paraId:0},{value:"computed",paraId:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\uFF0C\u800C\u4E0D\u662F\u4F7F\u7528",paraId:0},{value:"watch",paraId:0},{value:"\u51FD\u6570\u6765\u4FA6\u542C",paraId:0},{value:"State",paraId:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002\u4F46\u662F\u5728\u4E00\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u53EF\u80FD\u9700\u8981\u4F7F\u7528",paraId:0},{value:"watch",paraId:0},{value:"\u51FD\u6570\uFF0C\u4E3B\u8981\u5728\u4E8E\uFF1A",paraId:0},{value:"\u52A8\u6001\u4F9D\u8D56",paraId:1},{value:"computed",paraId:2},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u4E00\u822C\u662F\u786E\u5B9A\u7684\uFF0C\u800C",paraId:2},{value:"watch",paraId:2},{value:"\u51FD\u6570\u7684\u4F9D\u8D56\u662F\u52A8\u6001\u7684\u3002\u8FD9\u6BD4\u8F83\u9002\u5408\u4E00\u4E9B\u9700\u8981\u52A8\u6001\u4FA6\u542C\u7684\u573A\u666F\uFF0C\u6BD4\u5982\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u52A8\u6001\u4FA6\u542C",paraId:2},{value:"orders[].count",paraId:2},{value:"\u7684\u53D8\u5316\u6765\u8BA1\u7B97",paraId:2},{value:"total",paraId:2},{value:"\u3002\u800C",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\uFF0C\u4E00\u65E6\u58F0\u660E\u5C31\u4E0D\u4F1A\u53D8\u5316\u3002",paraId:2},{value:"\u591A\u5B57\u6BB5\u590D\u5408\u8BA1\u7B97",paraId:3},{value:"\u5F53\u67D0\u4E2A\u5B57\u6BB5\u9700\u8981\u8FDB\u884C\u590D\u5408\u8BA1\u7B97\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528",paraId:4},{value:"watch",paraId:4},{value:"\u51FD\u6570\u6765\u5B9E\u73B0\u3002\u6BD4\u5982\u5728",paraId:4},{value:"SpeedForm",paraId:4},{value:"\u5B9E\u73B0\u8868\u5355\u7684",paraId:4},{value:"validate",paraId:4},{value:"\u548C",paraId:4},{value:"dirty",paraId:4},{value:"\u5C5E\u6027\u7684\u8BA1\u7B97\u65F6\uFF0C\u5C31\u662F\u4F7F\u7528",paraId:4},{value:"watch",paraId:4},{value:"\u5B9E\u73B0\u3002",paraId:4},{value:"\u6BD4\u5982\u8FD9\u662F\u8868\u5355",paraId:5},{value:"validate",paraId:5},{value:"\u68C0\u6D4B\u7684\u5B9E\u73B0\u4EE3\u7801\uFF1A",paraId:5},{value:`export function validate<T=any>(options?:ValidateOptions){
    const { entry  } = Object.assign({},options)
    return watch<boolean,boolean>((value,{ fromPath,selfPath,getCache})=>{        
        // \u53EA\u4FA6\u542Centry\u4E0B\u7684\u6240\u6709\u5B57\u6BB5
        if(!isIncludePath(entry ? entry : selfPath,fromPath)) return   
        const selfCache = getCache()  // \u5F97\u5230\u7684\u662F\u4E00\u4E2ADict\u7528\u6765\u4FDD\u5B58\u6240\u6709\u5B57\u6BB5\u7684validate\u5C5E\u6027\u503C
        // validate\u5C5E\u6027\u662F\u4E00\u4E2Aboolean
        if(typeof(value)=='boolean'){
            const srcKey = fromPath.join(OBJECT_PATH_DELIMITER)
            if(value){
                delete selfCache[srcKey]
            }else{
                selfCache[srcKey] = value
            }
        }
        // \u7531\u4E8Ecache\u91CC\u9762\u53EA\u8BB0\u5F55validate=false\u7684\u503C\uFF0C\u6240\u4EE5\u5982\u679Ccache\u4E0D\u4E3A\u7A7A\u5219\u4EE3\u8868\u6709\u5B57\u6BB5\u7684validate=false
        return Object.keys(selfCache).length==0
    },(path)=>isValidateField(path),{
        initial:true
    })
}
 
`,paraId:6},{value:"*",paraId:7},{value:"\u57FA\u672C\u903B\u8F91\uFF1A",paraId:7},{value:"\u4EE5\u4E0A",paraId:8},{value:"validate",paraId:8},{value:"\u4F20\u5165\u4E00\u4E2A\u5165\u53E3\u53C2\u6570",paraId:8},{value:"entry",paraId:8},{value:",\u7528\u6765\u9650\u5B9A\u6821\u9A8C\u8303\u56F4\uFF0C\u7136\u540E\u521B\u5EFA\u4E00\u4E2A",paraId:8},{value:"watch",paraId:8},{value:"\u5BF9\u8C61\u3002",paraId:8},{value:"(path)=>isValidateField(path)",paraId:8},{value:"\u7528\u6765\u5224\u65AD\u53D1\u751F\u53D8\u5316\u7684\u8DEF\u5F84\u662F\u5426\u5305\u542B\u7684",paraId:8},{value:"validate",paraId:8},{value:"\u5B57\u6BB5\uFF0C\u5982\u679C\u662F\u5426\u5219\u4F1A\u6267\u884C",paraId:8},{value:"watch",paraId:8},{value:"\u76D1\u542C\u51FD\u6570\u3002",paraId:8},{value:"\u5728",paraId:8},{value:"watch",paraId:8},{value:`\u76D1\u542C\u51FD\u6570\u5185\uFF0C
`,paraId:8},{value:"value",paraId:9},{value:"\uFF1A\u53D8\u5316\u7684\u503C",paraId:9},{value:"fromPath",paraId:10},{value:"\uFF1A\u6307\u7684\u662F\u54EA\u91CC\u53D1\u751F\u53D8\u5316\u7684\u8DEF\u5F84",paraId:10},{value:"getCache",paraId:11},{value:"\uFF1A\u7528\u6765\u83B7\u53D6\u5F53\u524D",paraId:11},{value:"watch",paraId:11},{value:"\u7684",paraId:11},{value:"cache",paraId:11},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4FDD\u5B58\u6821\u9A8C\u503C\u3002",paraId:11},{value:"\u5728",paraId:12},{value:"cache",paraId:12},{value:"\u91CC\u9762\u6211\u4EEC\u4FDD\u5B58\u4ECE\u6821\u9A8C\u8303\u56F4\u5185\u6240\u6709",paraId:12},{value:"value=false",paraId:12},{value:"\uFF0C\u5982\u679C",paraId:12},{value:"Object.keys(selfCache).length==0",paraId:12},{value:"\u5C31\u4EE3\u8868\u5728\u8BE5\u6821\u9A8C\u8303\u56F4\u5185\u6240\u6709\u5B57\u6BB5\u5747\u6709\u6548\u3002",paraId:12}]},68414:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(42380);const n=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u529F\u80FD\uFF0C\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:1,tocIndex:0},{value:"watch",paraId:1,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:1,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:2,tocIndex:0},{value:"State",paraId:2,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:2,tocIndex:0},{value:"store.watch",paraId:2,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:2,tocIndex:0},{value:"State",paraId:2,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:2,tocIndex:0},{value:"store.useWatch",paraId:2,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:2,tocIndex:0},{value:"store",paraId:2,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:2,tocIndex:0},{value:"@autostorejs/react",paraId:3,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:3,tocIndex:1},{value:"watch",paraId:3,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:3,tocIndex:1},{value:"state",paraId:3,tocIndex:1},{value:"\u58F0\u660E\u6765\u4FA6\u542C",paraId:3,tocIndex:1},{value:"State",paraId:3,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:1},{value:"watch",paraId:4,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:"watch",paraId:5,tocIndex:1},{value:"\u53EF\u4EE5\u7528\u6765\u4FA6\u542C\u6574\u4E2A",paraId:5,tocIndex:1},{value:"store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u53D8\u5316\uFF0C\u5F53\u4FA6\u542C\u5230\u53D8\u5316\u65F6\u4F1A\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:5,tocIndex:1},{value:"\u4FA6\u542C\u5668\u51FD\u6570\u53EA\u80FD\u662F\u4E00\u4E2A\u540C\u6B65\u51FD\u6570\u3002",paraId:5,tocIndex:1},{value:"\u4FA6\u542C\u5668\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:5,tocIndex:1},{value:"watch",paraId:5,tocIndex:1},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:5,tocIndex:1},{value:"watch",paraId:6,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`function watch<Value = any,Result=Value>(
  listener:WatchListener<Value,Result>,
  on:WatchOptions['on'],
  options?:WatchOptions<Result>):WatchDescriptor<Value,Result>

  
export interface WatchOptions<R=any>{ 
    // \u6307\u5B9A\u989D\u5916\u7684\u8FC7\u6EE4\u6761\u4EF6\uFF0C\u5982\u679C\u8FD4\u56DEtrue\uFF0C\u624D\u4F1A\u89E6\u53D1listener\u7684\u6267\u884C
    // \u6B64\u51FD\u6570\u4F1A\u5728\u8868\u5355\u4E2D\u7684\u6BCF\u4E00\u4E2A\u503C\u53D1\u751F\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u5982\u679C\u8FD4\u56DEtrue\uFF0C\u5219\u4F1A\u89E6\u53D1listener\u7684\u6267\u884C  
    // \u7531\u4E8E\u6B64\u51FD\u6570\u4F1A\u5728\u8868\u5355\u4E2D\u7684\u6BCF\u4E00\u4E2A\u503C\u53D1\u751F\u53D8\u5316\u65F6\u5747\u4F1A\u6267\u884C\uFF0C\u6240\u4EE5\u6B64\u51FD\u6570\u5E94\u8BE5\u5C3D\u91CF\u7B80\u5355\uFF0C\u4E0D\u8981\u6709\u590D\u6742\u7684\u903B\u8F91      
    // \u5982\u679C\u5927\u91CF\u7684\u8868\u5355\u5B57\u6BB5\u5747\u9700\u8981\u76D1\u542C\uFF0C\u5219\u53EF\u80FD\u4F1A\u6709\u6027\u80FD\u95EE\u9898
    // \u4E00\u822C\u5728\u52A8\u6001\u4F9D\u8D56\u65F6\u4F7F\u7528
    on?:(path:string[],value:any)=>boolean 
    initial?:R,  
    /**
     * \u7528\u6765\u5BF9\u8868\u5355\u5185\u7684watch\u8FDB\u884C\u5206\u7EC4\uFF0C\u4EE5\u4FBF\u80FD\u6309\u7EC4\u8FDB\u884Cenable\u6216disable\u6216\u5176\u4ED6\u64CD\u4F5C
     */  
    group?:string
    /**
     *  \u542F\u7528\u6216\u7981\u7528watch\uFF0C\u9ED8\u8BA4\u4E3Atrue
     */
    enable?:boolean
}
 
`,paraId:7,tocIndex:2},{value:"watch",paraId:8,tocIndex:2},{value:"\u51FD\u6570\u57FA\u672C\u4F7F\u7528\u5982\u4E0B\uFF1A",paraId:8,tocIndex:2},{value:"\u6CE8\u610F\uFF1A\u4E8B\u5B9E\u4E0A\u4EE5\u4E0A\u793A\u4F8B\u66F4\u9002\u5408\u4F7F\u7528",paraId:9},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:9},{value:"\u7279\u6027\u6765\u5B9E\u73B0\uFF0C\u793A\u4F8B\u4EC5\u4EC5\u662F\u6F14\u793A\u5176\u53EF\u4EE5\u4FA6\u542C\u52A8\u6001\u4F9D\u8D56\u5C5E\u6027\u7684\u7279\u6027",paraId:9},{value:"\u5728\u4EE5\u4E0A\u4F8B\u5B50\u4E2D\uFF1A",paraId:10},{value:"watch",paraId:11},{value:"\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:11},{value:"State",paraId:11},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:11},{value:"watch",paraId:11},{value:"\u51FD\u6570\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u7528\u6765\u914D\u7F6E",paraId:11},{value:"watch",paraId:11},{value:"\u51FD\u6570\u7684\u884C\u4E3A\u3002",paraId:11},{value:"on",paraId:11},{value:"\u5C5E\u6027\u7528\u6765\u914D\u7F6E",paraId:11},{value:"watch",paraId:11},{value:"\u51FD\u6570\u7684\u89E6\u53D1\u6761\u4EF6\uFF0C\u4F20\u5165\u7684\u662F\u53D1\u751F\u53D8\u5316\u7684\u503C\u6240\u5728\u7684\u8DEF\u5F84\u3002",paraId:11},{value:"initial",paraId:11},{value:"\u5C5E\u6027\u7528\u6765\u914D\u7F6E",paraId:11},{value:"watch",paraId:11},{value:"\u51FD\u6570\u6240\u5728\u4F4D\u7F6E\u7684",paraId:11},{value:"total",paraId:11},{value:"\u7684\u521D\u59CB\u503C\u3002",paraId:11},{value:"``",paraId:11},{value:"watch",paraId:12,tocIndex:3},{value:"\u7684\u4FA6\u542C\u51FD\u6570\u53EA\u80FD\u662F\u4E00\u4E2A",paraId:12,tocIndex:3},{value:"\u540C\u6B65\u51FD\u6570",paraId:12,tocIndex:3},{value:"\uFF0C\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:12,tocIndex:3},{value:` type WatchListener<Value=any, Result= Value> = (value:Value,options:WatchListenerOptions<Result>)=>(Exclude<Result,Promise<any>> | undefined)

type WatchListenerOptions<Result=any> = {
  getSelfValue:()=>Result ,     // \u8FD4\u56DE\u5F53\u524Dwatch\u6240\u5728\u4F4D\u7F6E\u7684\u5F53\u524D\u503C
  selfPath:string[] ,           // \u8FD4\u56DE\u5F53\u524Dwatch\u6240\u5728\u4F4D\u7F6E\u7684\u8DEF\u5F84
  fromPath:string[],         // \u8FD4\u56DE\u53D1\u751F\u53D8\u5316\u7684\u503C\u6240\u5728\u7684\u8DEF\u5F84
  getCache:()=>Dict             // \u8FD4\u56DE\u5F53\u524Dwatch\u6240\u5728\u4F4D\u7F6E\u7684\u7F13\u5B58\u5BF9\u8C61
}
`,paraId:13,tocIndex:3},{value:"\u5F53",paraId:14,tocIndex:3},{value:"State",paraId:14,tocIndex:3},{value:"\u4E2D\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u8C03\u7528",paraId:14,tocIndex:3},{value:"watch",paraId:14,tocIndex:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\u51FD\u6570\uFF0C\u5982\u679C\u8FD4\u56DE",paraId:14,tocIndex:3},{value:"true",paraId:14,tocIndex:3},{value:"\uFF0C\u5219\u4F1A\u8C03\u7528\u6267\u884C\u4FA6\u542C\u51FD\u6570\u3002",paraId:14,tocIndex:3},{value:"\u4FA6\u542C\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u5165\u53C2\u662F",paraId:14,tocIndex:3},{value:"value",paraId:14,tocIndex:3},{value:"\uFF0C\u6307\u7684\u662F\u53D1\u751F\u53D8\u5316\u7684\u65B0\u503C\u3002\u663E\u7136\uFF0C\u5982\u679C",paraId:14,tocIndex:3},{value:"watch",paraId:14,tocIndex:3},{value:"\u51FD\u6570\u7684\u4F9D\u8D56\u8303\u56F4\u5F88\u5E7F\uFF0C\u5219",paraId:14,tocIndex:3},{value:"value",paraId:14,tocIndex:3},{value:"\u7C7B\u578B\u4E5F\u53EF\u80FD\u662F\u4E0D\u56FA\u5B9A\u7684\u3002",paraId:14,tocIndex:3},{value:"getSelfValue",paraId:14,tocIndex:3},{value:"\u53C2\u6570\u7528\u6765\u8BFB\u53D6\u5F53\u524D",paraId:14,tocIndex:3},{value:"watch",paraId:14,tocIndex:3},{value:"\u6240\u5728\u4F4D\u7F6E\u7684\u5F53\u524D\u503C\u3002",paraId:14,tocIndex:3},{value:"selfPath",paraId:14,tocIndex:3},{value:"\u53C2\u6570\u7528\u6765\u8BFB\u53D6\u5F53\u524D",paraId:14,tocIndex:3},{value:"watch",paraId:14,tocIndex:3},{value:"\u6240\u5728\u4F4D\u7F6E\u7684\u8DEF\u5F84\u3002",paraId:14,tocIndex:3},{value:"fromPath",paraId:14,tocIndex:3},{value:"\u53C2\u6570\u7528\u6765\u8BFB\u53D6\u53D1\u751F\u53D8\u5316\u7684\u503C\u6240\u5728\u7684\u8DEF\u5F84\u3002",paraId:14,tocIndex:3},{value:"getCache",paraId:14,tocIndex:3},{value:"\u53C2\u6570\u7528\u6765\u8BFB\u53D6\u5F53\u524D",paraId:14,tocIndex:3},{value:"watch",paraId:14,tocIndex:3},{value:"\u6240\u5728\u4F4D\u7F6E\u7684\u7F13\u5B58\u5BF9\u8C61\uFF0C\u4F9B\u4FDD\u5B58\u4E00\u4E9B\u4E34\u65F6\u503C\u3002",paraId:14,tocIndex:3},{value:"\u4FA6\u542C\u51FD\u6570\u7684",paraId:15,tocIndex:4},{value:"getCache",paraId:15,tocIndex:4},{value:"\u53C2\u6570\u7528\u6765\u83B7\u53D6\u4E00\u4E2A\u4EC5\u4F9B\u5F53\u524D\u4FA6\u542C\u51FD\u6570\u4F7F\u7528\u7F13\u5B58\u5BF9\u8C61",paraId:15,tocIndex:4},{value:"{}",paraId:15,tocIndex:4},{value:"\uFF0C\u4F9B\u4FDD\u5B58\u4E00\u4E9B\u4E34\u65F6\u503C\u3002",paraId:15,tocIndex:4},{value:"\u4E0B\u9762\u4E3E\u4E2A\u4F8B\u5B50\u6765\u8BF4\u660E\u5176\u7528\u9014\u3002",paraId:16,tocIndex:4},{value:"\u5728",paraId:17,tocIndex:4},{value:"SpeedForm",paraId:17,tocIndex:4},{value:"\u4E2D\uFF0C\u6BCF\u4E00\u4E2A\u5B57\u6BB5\u5747\u6709\u4E00\u4E2A",paraId:17,tocIndex:4},{value:"validate",paraId:17,tocIndex:4},{value:"\u7528\u6765\u58F0\u660E\u5176\u9A8C\u8BC1\u7ED3\u679C\uFF0C\u800C\u6574\u4E2A\u8868\u5355\u6839\u5BF9\u8C61\u4E5F\u6709\u4E00\u4E2A",paraId:17,tocIndex:4},{value:"validate",paraId:17,tocIndex:4},{value:"\u7528\u6765\u8868\u793A\u8868\u5355\u662F\u5426\u6709\u6548\u3002\u5F53\u67D0\u4E2A\u5B57\u6BB5\u7684",paraId:17,tocIndex:4},{value:"validate",paraId:17,tocIndex:4},{value:"\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6211\u4EEC\u9700\u8981\u91CD\u65B0\u8BA1\u7B97\u6574\u4E2A\u8868\u5355\u7684",paraId:17,tocIndex:4},{value:"validate",paraId:17,tocIndex:4},{value:"\u3002",paraId:17,tocIndex:4},{value:"\u9700\u8981\u4F7F\u7528",paraId:18,tocIndex:4},{value:"\u52A8\u6001\u4F9D\u8D56",paraId:18,tocIndex:4},{value:"\uFF0C\u5373\u4FA6\u542C\u8868\u5355\u4E2D\u7684\u6240\u6709",paraId:18,tocIndex:4},{value:"validate",paraId:18,tocIndex:4},{value:"\u7684\u503C\u3002\u6CE8\uFF1A\u5982\u7531\u4E8E\u4E00\u4E2A\u8868\u5355\u5B57\u6BB5\u53EF\u80FD\u5F88\u591A\u6216\u8005\u662F\u52A8\u6001\u751F\u6210\u7684\uFF0C\u6240\u4EE5\u5176\u4F9D\u8D56\u662F\u52A8\u6001\u7684\u3002",paraId:18,tocIndex:4},{value:"\u9700\u8981\u4F7F\u7528",paraId:18,tocIndex:4},{value:"\u7F13\u5B58\u5BF9\u8C61",paraId:18,tocIndex:4},{value:"\uFF0C\u7528\u6765\u8BB0\u4F4F\u8868\u5355\u7F16\u8F91\u8FC7\u7A0B\u4E2D\u6240\u6709\u5B57\u6BB5\u7684",paraId:18,tocIndex:4},{value:"validate",paraId:18,tocIndex:4},{value:"\u503C\uFF0C\u4EE5\u4FBF\u773C\u540E\u8BA1\u7B97\u6574\u4E2A\u8868\u5355\u7684\u9A8C\u8BC1\u7ED3\u679C\u3002",paraId:18,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528",paraId:19,tocIndex:4},{value:"watch",paraId:19,tocIndex:4},{value:"\u51FD\u6570\u6765\u5B9E\u73B0\u3002",paraId:19,tocIndex:4},{value:`const formState={
    validate:watch((value,{getCache,srcPath})=>{
      const cache = getCache()
      // \u5728cache\u4E2D\u4FDD\u5B58\u5B57\u6BB5\u7684validate\u503C
      cache[srcPath.join('.')]=value
      // \u6574\u4E2A\u8868\u5355\u7684validate\u503C\u662F\u7531\u6240\u6709\u5B57\u6BB5\u7684\u9A8C\u8BC1\u503C\u8FDB\u884C\u8BA1\u7B97\u800C\u6765\u7684
      return Object.values(cache).every(validate=>validate)
    },
    // \u52A8\u6001\u4F9D\u8D56
    (path)=>path[path.length-1]==='validate',
    // \u6307\u5B9A\u521D\u59CB\u503C
    {initial:true}
    )  
}
`,paraId:20,tocIndex:4},{value:"\u5728\u8FDB\u884C\u8868\u5355\u9A8C\u8BC1\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528",paraId:21,tocIndex:4},{value:"formState.validate",paraId:21,tocIndex:4},{value:"\u6765\u83B7\u53D6\u6574\u4E2A\u8868\u5355\u7684\u9A8C\u8BC1\u7ED3\u679C\u3002",paraId:21,tocIndex:4},{value:"\u9664\u4E86\u53EF\u4EE5\u5728",paraId:22,tocIndex:5},{value:"State",paraId:22,tocIndex:5},{value:"\u4E2D\u58F0\u660E",paraId:22,tocIndex:5},{value:"watch",paraId:22,tocIndex:5},{value:"\u51FD\u6570\u5916\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u5728",paraId:22,tocIndex:5},{value:"Store",paraId:22,tocIndex:5},{value:"\u5BF9\u8C61\u4E2D\u58F0\u660E",paraId:22,tocIndex:5},{value:"watch",paraId:22,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:22,tocIndex:5},{value:"State",paraId:22,tocIndex:5},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:22,tocIndex:5},{value:"\u5728\u7EC4\u4EF6\u5185\u4FA6\u542C\u53EF\u4EE5\u4F7F\u7528",paraId:23,tocIndex:6},{value:"store.useWatch",paraId:23,tocIndex:6},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:23,tocIndex:6},{value:"store",paraId:23,tocIndex:6},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:23,tocIndex:6}]},36109:function(Y,i,e){"use strict";e.r(i),e.d(i,{texts:function(){return n}});var k=e(43112);const n=[]}}]);
