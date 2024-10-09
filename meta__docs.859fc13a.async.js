(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[904],{1801:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(77643),K={}},44887:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return d}});var W=e(24325),u=e.n(W),K=e(29008),R=e.n(K),E=e(28633),i=e.n(E),A=e(70958),N=e.n(A),n=e(92379),T=e(61668),O=e(44970),y=e(19644),s=e(77101),d={"docs-exmaples-get-repos-demo-0":{component:n.memo(n.lazy(N()(R()().mark(function l(){var a,r,o,p,t,_,g,S,b,P,D,C,$,j,V;return R()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=U.sent,r=a.computed,o=a.createStore,U.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return p=U.sent,t=p.Input,_=p.Box,g=p.Button,U.next=13,Promise.resolve().then(e.bind(e,77101));case 13:return S=U.sent,b=S.api,P=o({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:r(function(){var H=N()(R()().mark(function M(F,Z){var J,Q,Y;return R()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return J=i()(F,1),Q=J[0],Y=Z.abortSignal,oe.next=4,new Promise(function(ve,G){Y.addEventListener("abort",function(){G("cancelled")}),b.getProjects(Q).then(function(w){ve(w)}).catch(function(w){G(w)})});case 4:case"end":return oe.stop()}},M)}));return function(M,F){return H.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),D=P.state,C=P.bind,$=P.$,j=P.useState,V=P.useAsyncState,U.abrupt("return",{default:function(){var M=j("user.repo"),F=i()(M,1),Z=F[0],J=V("user.projects");return n.createElement("div",null,n.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),n.createElement(t,u()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:Z},C("user.repo"))),n.createElement(g,{onClick:function(){return D.user.projects.run()}},"\u91CD\u8BD5"),n.createElement(g,{onClick:function(){return D.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),n.createElement(_,null,n.createElement("table",{className:"projects-list"},n.createElement("thead",null,n.createElement("tr",null,n.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),n.createElement("td",null,n.createElement("b",null,"\u8BF4\u660E")),n.createElement("td",null,n.createElement("b",null,"\u661F")))),n.createElement("tbody",null,J.loading?n.createElement("tr",null,n.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):J.error?n.createElement("tr",null,n.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",J.error)):J.value&&J.value.map(function(Q,Y){return n.createElement("tr",{key:Y},n.createElement("td",null,n.createElement("a",{href:Q.url,target:"__blank"},Q.name)),n.createElement("td",null,Q.description),n.createElement("td",null,Q.stars))})))))}});case 17:case"end":return U.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y,"autostore-docs":s},renderOpts:{compile:function(){var l=N()(R()().mark(function r(){var o,p=arguments;return R()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,e.e(39).then(e.bind(e,39039));case 2:return _.abrupt("return",(o=_.sent).default.apply(o,p));case 3:case"end":return _.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}}}},16960:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(28627),K={}},87524:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return s}});var W=e(24325),u=e.n(W),K=e(28633),R=e.n(K),E=e(29008),i=e.n(E),A=e(70958),N=e.n(A),n=e(92379),T=e(46267),O=e(44970),y=e(19644),s={"docs-guide-computed-async-demo-0":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D;return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.delay,r=l.createStore,o=l.computed,$.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return p=$.sent,t=p.Input,_=p.ColorBlock,g=r({user:{firstName:"Zhang",lastName:"Fisher",fullName:o(function(){var j=N()(i()().mark(function V(z){return i()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,a(1e3);case 2:return H.abrupt("return",z.firstName+" "+z.lastName);case 3:case"end":return H.stop()}},V)}));return function(V){return j.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),S=g.useAsyncState,b=g.useState,P=g.state,D=g.bind,$.abrupt("return",{default:function(){var V=b("user.firstName"),z=R()(V,1),U=z[0],H=b("user.lastName"),M=R()(H,1),F=M[0],Z=S("user.fullName");return n.createElement(n.Fragment,null,n.createElement(t,u()({label:"firstName",value:U},D("user.firstName"))),n.createElement(t,u()({label:"lastName",value:F},D("user.lastName"))),n.createElement(_,{name:"FullName",loading:Z.loading},Z.value))}});case 13:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-1":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g;return i()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=b.sent,a=l.useStore,r=l.computed,o=l.delay,b.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return p=b.sent,t=p.ColorBlock,_=p.Button,g=p.JsonView,b.abrupt("return",{default:function(){var D=a({firstName:"Zhang",lastName:"Fisher",fullName:r(function(){var z=N()(i()().mark(function U(H){return i()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,o();case 2:if(!H.triggerError){F.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return F.abrupt("return",H.firstName+" "+H.lastName);case 5:case"end":return F.stop()}},U)}));return function(U){return z.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),C=D.state,$=D.$,j=D.useAsyncState,V=j("fullName");return n.createElement("div",null,n.createElement(t,{name:"FirstName"},$("firstName")),n.createElement(t,{name:"FirstName"},$("lastName")),n.createElement(t,{name:"FullName",loading:V.loading},V.loading?"\u6B63\u5728\u8BA1\u7B97...":V.error?"ERROR:".concat(V.error):V.value),n.createElement("div",null,n.createElement(_,{onClick:function(){C.triggerError=!1,C.firstName=C.firstName+"\u{1F525}"}},"Change FirstName"),n.createElement(_,{onClick:function(){C.triggerError=!1,C.lastName=C.lastName+"\u2764\uFE0F"}},"Change LastName")),n.createElement("div",null,n.createElement(_,{onClick:function(){C.firstName=C.firstName+"\u{1F525}"}},"Change FirstName with Error"),n.createElement(_,{onClick:function(){C.triggerError=!0,C.lastName=C.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),n.createElement("div",null,"state.fullName=",n.createElement(g,null,JSON.stringify(V))))}});case 13:case"end":return b.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-2":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D,C,$,j,V;return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=U.sent,a=l.delay,r=l.createStore,o=l.computed,p=l.ObserverScopeRef,U.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=U.sent,_=t.JsonView,g=t.Button,S=t.Input,b=t.Loading,P=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:o(function(){var H=N()(i()().mark(function M(F,Z){var J,Q,Y,se,oe;return i()().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return J=R()(F,2),Q=J[0],Y=J[1],se=Z.getProgressbar,oe=se(),G.abrupt("return",new Promise(function(){var w=N()(i()().mark(function q(le){var de;return i()().wrap(function(ie){for(;;)switch(ie.prev=ie.next){case 0:de=1;case 1:if(!(de<=100)){ie.next=8;break}return ie.next=4,a(20);case 4:oe.value(de);case 5:de++,ie.next=1;break;case 8:oe.end(),le(Q*Y);case 10:case"end":return ie.stop()}},q)}));return function(q){return w.apply(this,arguments)}}()));case 4:case"end":return G.stop()}},M)}));return function(M,F){return H.apply(this,arguments)}}(),["order.count","order.price"],{scope:p.Depends})}}),D=P.useState,C=P.state,$=P.$,j=P.bind,V=P.useAsyncState,U.abrupt("return",{default:function(){var M=D("order.count"),F=R()(M,1),Z=F[0],J=V("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,C.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,C.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(g,{onClick:function(){return C.order.count--}},"-"),n.createElement(S,u()({value:Z},j("order.count"))),n.createElement(g,{onClick:function(){return C.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",null,J.loading?n.createElement(b,null):null,J.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(J.progress,"%"):J.error?"ERROR:".concat(J.error):J.value)))),n.createElement("div",null,n.createElement(_,null,JSON.stringify(C.order.total))))}});case 16:case"end":return U.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-3":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D,C,$,j,V,z;return i()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=H.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,p=l.delay,H.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=H.sent,_=t.Input,g=t.Button,S=t.Loading,b=t.JsonView,P=t.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var M=N()(i()().mark(function F(Z){var J,Q,Y;return i()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return J=R()(Z,2),Q=J[0],Y=J[1],oe.next=3,p(5e3);case 3:return oe.abrupt("return",Q*Y);case 4:case"end":return oe.stop()}},F)}));return function(F){return M.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:o.Depends})}}),C=D.useState,$=D.state,j=D.$,V=D.bind,z=D.useAsyncState,H.abrupt("return",{default:function(){var F=C("order.count"),Z=R()(F,1),J=Z[0],Q=z("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,$.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,$.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(g,{onClick:function(){return $.order.count--}},"-"),n.createElement(_,u()({value:J},V("order.count"))),n.createElement(g,{onClick:function(){return $.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",null,Q.loading?n.createElement(S,null):null,Q.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(Q.timeout,"ms"):Q.error?n.createElement(P,{text:"ERROR: {".concat(Q.error,"}"),color:"red"}):null)))),n.createElement("div",null,n.createElement(b,null,JSON.stringify($.order.total))))}});case 17:case"end":return H.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-4":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D,C,$,j,V,z;return i()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=H.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,p=l.delay,H.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=H.sent,_=t.Input,g=t.Button,S=t.Loading,b=t.JsonView,P=t.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var M=N()(i()().mark(function F(Z){var J,Q,Y;return i()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return J=R()(Z,2),Q=J[0],Y=J[1],oe.next=3,p(6e3);case 3:return oe.abrupt("return",Q*Y);case 4:case"end":return oe.stop()}},F)}));return function(F){return M.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:o.Depends})}}),C=D.useState,$=D.state,j=D.$,V=D.bind,z=D.useAsyncState,H.abrupt("return",{default:function(){var F=C("order.count"),Z=R()(F,1),J=Z[0],Q=z("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,$.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,$.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(g,{onClick:function(){return $.order.count--}},"-"),n.createElement(_,u()({value:J},V("order.count"))),n.createElement(g,{onClick:function(){return $.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},Q.loading?n.createElement(S,null):null,Q.loading?n.createElement(P,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(Q.timeout,"}\u79D2"),color:"red"}):Q.error?n.createElement(P,{text:"ERROR: {".concat(Q.error,"}"),color:"red"}):null)))),n.createElement("div",null,n.createElement(b,null,JSON.stringify($.order.total))))}});case 17:case"end":return H.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-5":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D,C,$,j,V,z;return i()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=H.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,p=l.delay,H.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return t=H.sent,_=t.Input,g=t.Button,S=t.Loading,b=t.JsonView,P=t.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var M=N()(i()().mark(function F(Z){var J,Q,Y;return i()().wrap(function(oe){for(;;)switch(oe.prev=oe.next){case 0:return J=R()(Z,2),Q=J[0],Y=J[1],oe.next=3,p();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return oe.stop()}},F)}));return function(F){return M.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:o.Depends})}}),C=D.useState,$=D.state,j=D.$,V=D.bind,z=D.useAsyncState,H.abrupt("return",{default:function(){var F=C("order.count"),Z=R()(F,1),J=Z[0],Q=z("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,$.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,$.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(g,{onClick:function(){return $.order.count--}},"-"),n.createElement(_,u()({value:J},V("order.count"))),n.createElement(g,{onClick:function(){return $.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},Q.loading?n.createElement(S,null):null,Q.loading?n.createElement(P,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):Q.error&&n.createElement(P,{text:"\u51FA\u9519: {".concat(Q.error,"}"),color:"red"}),Q.retry>0&&n.createElement(P,{text:"\u91CD\u8BD5: {".concat(Q.retry,"}"),color:"red"}))))),n.createElement("div",null,n.createElement(b,null,JSON.stringify($.order.total))))}});case 17:case"end":return H.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-6":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D,C,$,j,V;return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=U.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,U.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return p=U.sent,t=p.Input,_=p.Button,g=p.Loading,S=p.JsonView,b=p.RichLabel,P=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var H=N()(i()().mark(function M(F,Z){var J,Q,Y,se;return i()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return J=R()(F,2),Q=J[0],Y=J[1],se=Z.abortSignal,ve.abrupt("return",new Promise(function(G,w){var q=setTimeout(function(){G(Q*Y)},1e6);se.addEventListener("abort",function(){clearTimeout(q),w("cancelled")})}));case 3:case"end":return ve.stop()}},M)}));return function(M,F){return H.apply(this,arguments)}}(),["order.count","order.price"],{scope:o.Depends})}}),D=P.useState,C=P.state,$=P.$,j=P.bind,V=P.useAsyncState,U.abrupt("return",{default:function(){var M=D("order.count"),F=R()(M,1),Z=F[0],J=V("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,C.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,C.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(_,{onClick:function(){return C.order.count--}},"-"),n.createElement(t,u()({value:Z},j("order.count"))),n.createElement(_,{onClick:function(){return C.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},J.loading?n.createElement(g,null):null,J.loading?n.createElement(b,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):J.error&&n.createElement(b,{text:"\u51FA\u9519: {".concat(J.error,"}"),color:"red"}),J.loading&&n.createElement(_,{onClick:function(){return J.cancel()}},"\u53D6\u6D88"))))),n.createElement("div",null,n.createElement(S,null,JSON.stringify(C.order.total))))}});case 16:case"end":return U.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-7":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g;return i()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=b.sent,a=l.createStore,b.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=b.sent,o=r.ColorBlock,p=r.Button,t=a({bookName:"ZhangFisher",price:100,count:3,total:function(){var P=N()(i()().mark(function C($){return i()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.abrupt("return",$.price*$.count);case 1:case"end":return V.stop()}},C)}));function D(C){return P.apply(this,arguments)}return D}()}),_=t.state,g=t.$,b.abrupt("return",{default:function(){return n.createElement("div",null,n.createElement(o,{name:"\u4E66\u540D"},g("bookName")),n.createElement(o,{name:"\u4EF7\u683C"},g("price")),n.createElement(o,{name:"\u6570\u91CF"},n.createElement(p,{onClick:function(){return _.count--}},"-"),g("count"),n.createElement(p,{onClick:function(){return _.count++}},"+")),n.createElement(o,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},g("total.value",{errorBoundary:function(C){var $=C.error;return n.createElement(n.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",$.message)}})),n.createElement(o,{name:"state.total"},String(_.total)))}});case 11:case"end":return b.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},60409:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return O}});var W=e(29008),u=e.n(W),K=e(28633),R=e.n(K),E=e(70958),i=e.n(E),A=e(92379),N=e(25231),n=e(44970),T=e(19644),O={"docs-guide-computed-create-demo-0":{component:A.memo(A.lazy(i()(u()().mark(function y(){var s,d,l,a,r,o,p;return u()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=_.sent,d=s.createStore,l=s.computed,_.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return a=_.sent,r=a.ColorBlock,o=a.Button,p=d({order:{price:100,count:3,total1:function(S){return S.price*S.count},total2:l(function(g){return g.price*g.count})}}),_.abrupt("return",{default:function(){var S=p.useState(),b=R()(S,2),P=b[0],D=b[1];return A.createElement("div",null,A.createElement(r,{name:"Price"},P.order.price),A.createElement(r,{name:"Count"},P.order.count),A.createElement(r,{name:"Total 1"},P.order.total1),A.createElement(r,{name:"Total 2"},P.order.total2),A.createElement(o,{onClick:function(){return D(function($){return $.order.count++})}},"Count++"))}});case 12:case"end":return _.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}}}},71252:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(83717),K={}},87755:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(76938),A=e(44970),N=e(19644),n={"docs-guide-computed-getter-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o,p,t,_;return u()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=S.sent,y=O.createStore,s=O.computed,d=O.delay,S.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=S.sent,a=l.ColorBlock,r=l.Button,o=y({order:{price:100,count:3,total:s(function(){var b=R()(u()().mark(function P(D){return u()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,d(1e3);case 2:return $.abrupt("return",D.price*D.count);case 3:case"end":return $.stop()}},P)}));return function(P){return b.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),p=o.state,t=o.$,_=o.computedObjects,S.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",_.get("total")),E.createElement("div",null,E.createElement(a,{name:"price"},t("order.price")),E.createElement(a,{name:"count"},t("order.count")),E.createElement(a,{name:"Total"},t(function(P){var D=P.value,C=P.loading;return E.createElement("div",null,C?"\u8BA1\u7B97\u4E2D...":D+1e3)},"order.total")),E.createElement(r,{onClick:function(){return p.order.count++}},"Count++"),E.createElement(r,{onClick:function(){return _.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return S.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},18731:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return l}});var W=e(12027),u=e.n(W),K=e(34180),R=e.n(K),E=e(28633),i=e.n(E),A=e(29008),N=e.n(A),n=e(70958),T=e.n(n),O=e(92379),y=e(87480),s=e(44970),d=e(19644),l={"docs-guide-computed-objects-demo-0":{component:O.memo(O.lazy(T()(N()().mark(function a(){var r,o,p,t,_,g,S,b,P;return N()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return r=C.sent,o=r.createStore,p=r.computed,C.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return t=C.sent,_=t.Divider,g=t.ColorBlock,S=t.Button,b=0,P=o({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(j){return j.firstName+j.lastName+"".concat(++b)},fullName2:p(function(){var $=T()(N()().mark(function j(V){return N()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.abrupt("return",V.firstName+V.lastName+"".concat(++b));case 1:case"end":return U.stop()}},j)}));return function(j){return $.apply(this,arguments)}}(),["./firstName","./lastName"])}}),C.abrupt("return",{default:function(){var j=P.useState(),V=i()(j,1),z=V[0];return O.createElement("div",null,O.createElement(g,{name:"FirstName"},z.user.firstName),O.createElement(g,{name:"lastName"},z.user.lastName),O.createElement(g,{name:"FullName",value:z.user.fullName}),O.createElement(g,{name:"FullName2",value:z.user.fullName2.value}),O.createElement(_,null),O.createElement("div",null,"typeof(store.computedObjects)==",R()(P.computedObjects)),O.createElement("div",null,"store.computedObjects instanceof Map=",String(P.computedObjects instanceof Map)),O.createElement("div",null,"store.computedObjects.size=",P.computedObjects.size),O.createElement("div",null,"store.computedObjects.size=",P.computedObjects.size),O.createElement("div",null,"store.computedObjects.keys()=",u()(P.computedObjects.keys()).join(" , ")),O.createElement(S,{onClick:function(){return P.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),O.createElement(S,{onClick:function(){return P.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),O.createElement(S,{onClick:function(){return P.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return C.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":d},renderOpts:{compile:function(){var a=T()(N()().mark(function o(){var p,t=arguments;return N()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(39).then(e.bind(e,39039));case 2:return g.abrupt("return",(p=g.sent).default.apply(p,t));case 3:case"end":return g.stop()}},o)}));function r(){return a.apply(this,arguments)}return r}()}}}},87336:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(15968),K={}},58217:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return s}});var W=e(24325),u=e.n(W),K=e(28633),R=e.n(K),E=e(29008),i=e.n(E),A=e(70958),N=e.n(A),n=e(92379),T=e(49613),O=e(44970),y=e(19644),s={"docs-guide-computed-run-demo-0":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P;return i()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=C.sent,a=l.createStore,r=l.computed,o=l.delay,C.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return p=C.sent,t=p.Divider,_=p.ColorBlock,g=p.Button,S=0,b={book:{name:"Zhang",count:4,price:100,total1:r(function(){var $=N()(i()().mark(function j(V){return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,o();case 2:return U.abrupt("return",V.count*V.price);case 3:case"end":return U.stop()}},j)}));return function(j){return $.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:r(function(){var $=N()(i()().mark(function j(V){return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,o();case 2:return U.abrupt("return",V.count*V.price);case 3:case"end":return U.stop()}},j)}));return function(j){return $.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:r(function(){var $=N()(i()().mark(function j(V){return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,o();case 2:return U.abrupt("return",V.count*V.price);case 3:case"end":return U.stop()}},j)}));return function(j){return $.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:r(function(){var $=N()(i()().mark(function j(V){return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,o();case 2:return U.abrupt("return",V.price/V.count);case 3:case"end":return U.stop()}},j)}));return function(j){return $.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:r(function(){var $=N()(i()().mark(function j(V){return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,o();case 2:return U.abrupt("return",V.price/V.count);case 3:case"end":return U.stop()}},j)}));return function(j){return $.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:r(function(){var $=N()(i()().mark(function j(V){return i()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,o();case 2:return U.abrupt("return",V.price/V.count);case 3:case"end":return U.stop()}},j)}));return function(j){return $.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},P=a(b),C.abrupt("return",{default:function(){var j=P.useState(),V=R()(j,1),z=V[0];return n.createElement("div",null,n.createElement(t,{title:"Total Group"}),n.createElement(_,{name:"Total1",loading:z.book.total1.loading},z.book.total1.loading?"\u8BA1\u7B97\u4E2D...":z.book.total1.value),n.createElement(_,{name:"Total2",loading:z.book.total2.loading},z.book.total2.loading?"\u8BA1\u7B97\u4E2D...":z.book.total2.value),n.createElement(_,{name:"Total3",loading:z.book.total3.loading},z.book.total3.loading?"\u8BA1\u7B97\u4E2D...":z.book.total3.value),n.createElement(g,{onClick:function(){return P.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),n.createElement(t,{title:"Average Group"}),n.createElement(_,{name:"Average1",loading:z.book.average1.loading}," ",z.book.average1.loading?"\u8BA1\u7B97\u4E2D...":z.book.average1.value),n.createElement(_,{name:"Average2",loading:z.book.average2.loading}," ",z.book.average2.loading?"\u8BA1\u7B97\u4E2D...":z.book.average2.value),n.createElement(_,{name:"Average3",loading:z.book.average3.loading}," ",z.book.average3.loading?"\u8BA1\u7B97\u4E2D...":z.book.average3.value),n.createElement(g,{onClick:function(){return P.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return C.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-run-demo-1":{component:n.memo(n.lazy(N()(i()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D,C,$,j;return i()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=z.sent,a=l.createStore,r=l.computed,o=l.delay,z.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return p=z.sent,t=p.Divider,_=p.ColorBlock,g=p.Button,S=p.Input,b=0,P={book:{name:"Zhang",count:4,price:100,total1:r(function(){var U=N()(i()().mark(function H(M){return i()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,o();case 2:return Z.abrupt("return",M.count*M.price);case 3:case"end":return Z.stop()}},H)}));return function(H){return U.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:r(function(){var U=N()(i()().mark(function H(M){return i()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,o();case 2:return Z.abrupt("return",M.count*M.price);case 3:case"end":return Z.stop()}},H)}));return function(H){return U.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:r(function(){var U=N()(i()().mark(function H(M){return i()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,o();case 2:return Z.abrupt("return",M.count*M.price);case 3:case"end":return Z.stop()}},H)}));return function(H){return U.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},D=a(P),C=D.useState,$=D.computedObjects,j=D.bind,z.abrupt("return",{default:function(){var H=C(),M=R()(H,1),F=M[0];return n.createElement("div",null,n.createElement(_,{name:"BookName"},F.book.name),n.createElement(_,{name:"count"},n.createElement("div",{style:{display:"flex",alignItems:"center"}},n.createElement(g,{onClick:function(){return F.book.count--}},"-"),n.createElement(S,u()({value:F.book.count},j("book.count"))),n.createElement(g,{onClick:function(){return F.book.count++}},"+"))),n.createElement(_,{name:"price"}," ",n.createElement(S,u()({value:F.book.price},j("book.price")))),n.createElement(t,{title:"Total Group"}),n.createElement("table",{className:"table table-bordered"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,"Total1 ="),n.createElement("td",null,F.book.total1.loading?"\u8BA1\u7B97\u4E2D...":F.book.total1.value),n.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),n.createElement("tr",null,n.createElement("td",null,"Total2 ="),n.createElement("td",null,F.book.total2.loading?"\u8BA1\u7B97\u4E2D...":F.book.total2.value),n.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",n.createElement("input",{type:"checkbox",checked:$.get("book/total2")}),")")),n.createElement("tr",null,n.createElement("td",null,"Total3 ="),n.createElement("td",null,F.book.total3.loading?"\u8BA1\u7B97\u4E2D...":F.book.total3.value),n.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),n.createElement(g,{onClick:function(){return $.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return z.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},87237:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(87975),A=e(44970),N=e(19644),n={"docs-guide-computed-scope-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=r.sent,y=O.ObserverScopeRef,s=O.useStore,r.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var p=s({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}},{scope:function(){return y.Current}}),t=p.state;return E.createElement("div",null,E.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-computed-scope-demo-1":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=r.sent,y=O.useStore,s=O.ObserverScopeRef,r.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var p=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.user.firstName+g.user.lastName}}},{scope:s.Root}),t=p.state;return E.createElement("div",null,E.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-computed-scope-demo-2":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r;return u()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=p.sent,y=O.createStore,s=O.ObserverScopeRef,p.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=p.sent,l=d.ColorBlock,a=y({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(_){return _.user.firstName+_.user.lastName}}}},{scope:s.Parent}),r=a.state,p.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(l,{name:"FullName"},r.parent.user.fullName))}});case 11:case"end":return p.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-computed-scope-demo-3":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=o.sent,y=O.createStore,o.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=o.sent,d=s.ColorBlock,l=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),a=l.state,o.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return o.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-computed-scope-demo-4":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=o.sent,y=O.createStore,o.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=o.sent,d=s.ColorBlock,l=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),a=l.state,o.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return o.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-computed-scope-demo-5":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=t.sent,y=O.createStore,s=O.computed,d=O.ObserverScopeRef,t.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=t.sent,a=l.ColorBlock,r=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:s(function(){var _=R()(u()().mark(function g(S){return u()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.abrupt("return",S[0]+S[1]);case 1:case"end":return P.stop()}},g)}));return function(g){return _.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:d.Depends})}}),o=r.state,t.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(a,{name:"FullName"},o.user.fullName.value))}});case 12:case"end":return t.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},46369:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return O}});var W=e(29008),u=e.n(W),K=e(28633),R=e.n(K),E=e(70958),i=e.n(E),A=e(92379),N=e(48120),n=e(44970),T=e(19644),O={"docs-guide-computed-sync-demo-0":{component:A.memo(A.lazy(i()(u()().mark(function y(){var s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=t.sent,d=s.createStore,t.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=t.sent,a=l.ColorBlock,r=l.Button,o=d({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.firstName+g.lastName}}}),t.abrupt("return",{default:function(){var g=o.useState(),S=R()(g,2),b=S[0],P=S[1];return A.createElement("div",null,A.createElement(a,{name:"First Name"},b.user.firstName),A.createElement(a,{name:"Last Name"},b.user.lastName),A.createElement(a,{name:"Full Name"},b.user.fullName),A.createElement(r,{onClick:function(){return P(function(C){return C.user.firstName="\u2764\uFE0F"+C.user.firstName})}},"Change First Name"),A.createElement(r,{onClick:function(){return P(function(C){return C.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return t.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}},"docs-guide-computed-sync-demo-1":{component:A.memo(A.lazy(i()(u()().mark(function y(){var s,d,l,a,r;return u()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=p.sent,d=s.createStore,p.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=p.sent,a=l.Button,r=d({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(_){return _.price*_.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(_){return _.price*_.count}}],total:function(_){return _.books.reduce(function(g,S){return g+S.total},0)}}),p.abrupt("return",{default:function(){var _=r.useState(),g=R()(_,2),S=g[0],b=g[1];return A.createElement("table",{className:"table table-bordered table-hover"},A.createElement("thead",null,A.createElement("tr",null,A.createElement("th",null,"\u4E66\u540D"),A.createElement("th",null,"\u4F5C\u8005"),A.createElement("th",null,"\u5355\u4EF7"),A.createElement("th",null,"\u6570\u91CF"),A.createElement("th",null,"\u5C0F\u8BA1"))),A.createElement("tbody",null,S.books.map(function(P,D){return A.createElement("tr",{key:D},A.createElement("td",null,P.name),A.createElement("td",null,P.author),A.createElement("td",null,P.price),A.createElement("td",null,A.createElement(a,{onClick:function(){return r.state.books[D].count--}},"-"),P.count,A.createElement(a,{onClick:function(){return r.state.books[D].count++}},"+")),A.createElement("td",null,P.total))}),A.createElement("tr",null,A.createElement("td",{colSpan:4},"\u603B\u8BA1"),A.createElement("td",null,S.total))))}});case 10:case"end":return p.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}}}},21037:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(93359),K={}},31996:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(76233),K={}},15274:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return s}});var W=e(29008),u=e.n(W),K=e(24325),R=e.n(K),E=e(28633),i=e.n(E),A=e(70958),N=e.n(A),n=e(92379),T=e(97820),O=e(44970),y=e(19644),s={"docs-guide-form-bind-demo-0":{component:n.memo(n.lazy(N()(u()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P;return u()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=C.sent,a=l.createStore,C.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=C.sent,o=r.ColorBlock,p=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(j){return j.firstName+j.lastName}}}),g=_.state,S=_.$,b=_.bind,P=_.useState,C.abrupt("return",{default:function(){var j=P("user.firstName"),V=i()(j,2),z=V[0],U=V[1],H=P("user.lastName"),M=i()(H,2),F=M[0],Z=M[1],J=P("user.vip"),Q=i()(J,2),Y=Q[0],se=Q[1];return n.createElement("div",null,n.createElement(t,R()(R()({label:"First Name"},b("user.firstName")),{},{value:z})),n.createElement(t,R()(R()({label:"last Name"},b("user.lastName")),{},{value:F})),n.createElement(t,R()(R()({type:"checkbox",label:"VIP"},b("user.vip")),{},{value:Y})),n.createElement(o,{name:"First Name"},S("user.firstName")),n.createElement(o,{name:"Last Name"},S("user.lastName")),n.createElement(o,{name:"Full Name"},S("user.fullName")),n.createElement(o,{name:"VIP"},S("user.vip")),n.createElement(p,{onClick:function(){U("Zhang"),Z("Fisher")}},"Reset"))}});case 12:case"end":return C.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(u()().mark(function a(){var r,o=arguments;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},95668:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return O}});var W=e(29008),u=e.n(W),K=e(24325),R=e.n(K),E=e(70958),i=e.n(E),A=e(92379),N=e(36339),n=e(44970),T=e(19644),O={"docs-guide-form-bindings-demo-0":{component:A.memo(A.lazy(i()(u()().mark(function y(){var s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=t.sent,d=s.useStore,t.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=t.sent,a=l.ColorBlock,r=l.Button,o=l.Input,t.abrupt("return",{default:function(){var g=d({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),S=g.state,b=g.$,P=g.useFormBindings,D=P();return A.createElement("div",null,A.createElement(o,R()({label:"First Name"},D.user.firstName)),A.createElement(o,R()({label:"last Name"},D.user.lastName)),A.createElement(o,R()({label:"Age"},D.user.age)),A.createElement(o,R()({type:"checkbox",label:"VIP"},D.user.vip)),A.createElement(a,{name:"First Name"},b("user.firstName")),A.createElement(a,{name:"Last Name"},b("user.lastName")),A.createElement(a,{name:"Age"},b("user.age")),A.createElement(a,{name:"VIP"},b("user.vip")),A.createElement(r,{onClick:function(){S.user.firstName="Zhang",S.user.lastName="Fisher",S.user.age=18,S.user.vip=!1}},"Reset"))}});case 11:case"end":return t.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-form-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}}}},72433:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return s}});var W=e(28633),u=e.n(W),K=e(29008),R=e.n(K),E=e(24325),i=e.n(E),A=e(70958),N=e.n(A),n=e(92379),T=e(45889),O=e(44970),y=e(19644),s={"docs-guide-form-use-input-demo-0":{component:n.memo(n.lazy(N()(R()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D;return R()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.createStore,$.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=$.sent,o=r.ColorBlock,p=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),g=_.state,S=_.$,b=_.bind,P=_.useState,D=_.useInput,$.abrupt("return",{default:function(){var V=D("user.firstName"),z=D("user.lastName"),U=D("user.vip"),H=D("user.job");return n.createElement("div",null,n.createElement(t,i()({label:"First Name"},V)),n.createElement(t,i()({label:"last Name"},z)),n.createElement(t,i()({type:"checkbox",label:"VIP"},U)),n.createElement(o,{name:"Job"},n.createElement("select",i()({id:"job"},H),n.createElement("option",{value:"1"},"Engineer"),n.createElement("option",{value:"2"},"Doctor"),n.createElement("option",{value:"3"},"Teacher"))),n.createElement(o,{name:"First Name"},S("user.firstName")),n.createElement(o,{name:"Last Name"},S("user.lastName")),n.createElement(o,{name:"VIP"},S("user.vip")),n.createElement(o,{name:"Job"},S("user.job")),n.createElement(p,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useInput"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(R()().mark(function a(){var r,o=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-1":{component:n.memo(n.lazy(N()(R()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P,D;return R()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.createStore,$.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=$.sent,o=r.ColorBlock,p=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher"}}),g=_.state,S=_.$,b=_.bind,P=_.useState,D=_.useInput,$.abrupt("return",{default:function(){var V=D(function(z){return z.user.firstName+" "+z.user.lastName},function(z,U){var H=z.split(/\s+/),M=u()(H,2),F=M[0],Z=M[1];U.user.firstName=F,U.user.lastName=Z});return n.createElement("div",null,n.createElement(t,i()({label:"FullName"},V)),n.createElement(o,{name:"First Name"},S("user.firstName")),n.createElement(o,{name:"Last Name"},S("user.lastName")),n.createElement(p,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(R()().mark(function a(){var r,o=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-2":{component:n.memo(n.lazy(N()(R()().mark(function d(){var l,a,r,o,p,t,_,g,S,b,P;return R()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=C.sent,a=l.createStore,C.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=C.sent,o=r.ColorBlock,p=r.Button,t=r.Input,_=a({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),g=_.state,S=_.$,b=_.bind,P=_.useInput,C.abrupt("return",{default:function(){var j=P("user");return n.createElement("div",null,n.createElement(t,i()({label:"First Name"},j.firstName)),n.createElement(t,i()({label:"last Name"},j.lastName)),n.createElement(t,i()({label:"Age"},j.age)),n.createElement(t,i()({type:"checkbox",label:"VIP"},j.vip)),n.createElement(o,{name:"First Name"},S("user.firstName")),n.createElement(o,{name:"Last Name"},S("user.lastName")),n.createElement(o,{name:"Age"},S("user.age")),n.createElement(o,{name:"VIP"},S("user.vip")),n.createElement(p,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher",g.user.age=18,g.user.vip=!1}},"Reset"))}});case 12:case"end":return C.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(R()().mark(function a(){var r,o=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-3":{component:n.memo(n.lazy(N()(R()().mark(function d(){var l,a,r,o,p,t;return R()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=g.sent,a=l.useStore,g.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return r=g.sent,o=r.ColorBlock,p=r.Button,t=r.Input,g.abrupt("return",{default:function(){var b=a({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),P=b.state,D=b.$,C=b.bind,$=b.useInput,j=$();return n.createElement("div",null,n.createElement(t,i()({label:"First Name"},j.firstName)),n.createElement(t,i()({label:"last Name"},j.lastName)),n.createElement(t,i()({label:"Age"},j.age)),n.createElement(t,i()({type:"checkbox",label:"VIP"},j.vip)),n.createElement(o,{name:"First Name"},D("firstName")),n.createElement(o,{name:"Last Name"},D("lastName")),n.createElement(o,{name:"Age"},D("age")),n.createElement(o,{name:"VIP"},D("vip")),n.createElement(p,{onClick:function(){P.firstName="Zhang",P.lastName="Fisher",P.age=18,P.vip=!1}},"Reset"))}});case 11:case"end":return g.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":O,"x-react-components":y},renderOpts:{compile:function(){var d=N()(R()().mark(function a(){var r,o=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},50090:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(9159),K={}},91775:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(61077),K={}},74905:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(47315),K={}},41344:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(26916),K={}},10117:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(3694),K={}},31837:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(4180),A=e(44970),N=e(19644),n={"docs-guide-signal-about-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=t.sent,y=O.createStore,t.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=t.sent,d=s.Button,l=s.ColorBlock,a=y({age:18}),r=a.state,o=a.$,t.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(l,null,"Age+Signal :",o("age")),E.createElement(l,null,"Age :",r.age),E.createElement(d,{onClick:function(){return r.age=r.age+1}},"+Age"))}});case 11:case"end":return t.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},11296:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(75690),K={}},14787:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(8767),A=e(44970),N=e(19644),n={"docs-guide-signal-computed-render-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=r.sent,y=O.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var p=y({user:{age:18}}),t=p.state,_=p.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_(function(g){var S=g.value;return E.createElement("div",null,S)},function(g){return g.user.age})),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-computed-render-demo-1":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=o.sent,y=O.useStore,s=O.computed,o.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=o.sent,l=d.Button,a=d.ColorBlock,o.abrupt("return",{default:function(){var t=y({user:{age:18}}),_=t.state,g=t.$;return E.createElement("div",null,E.createElement(a,{name:"Age"},g(function(S){var b=S.value;return E.createElement("div",null,b)},s(function(S){return S.user.age}))),E.createElement(l,{onClick:function(){return _.user.age++}},"+Age"))}});case 11:case"end":return o.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-computed-render-demo-2":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=t.sent,y=O.useStore,s=O.delay,d=O.computed,t.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,o=l.Loading,t.abrupt("return",{default:function(){var g=y({order:{price:10,count:1}}),S=g.state,b=g.$;return E.createElement("div",null,E.createElement(r,{name:"Price"},b("order.price")),E.createElement(r,{name:"Count"},b("order.count")),E.createElement(r,{name:"Total"},b(function(P){var D=P.value,C=P.loading;return E.createElement("div",null,C?E.createElement(o,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},d(function(){var P=R()(u()().mark(function D(C){return u()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,s(1e3);case 2:return j.abrupt("return",C.order.price*C.order.count);case 3:case"end":return j.stop()}},D)}));return function(D){return P.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),E.createElement(a,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},14727:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(63518),A=e(44970),N=e(19644),n={"docs-guide-signal-custom-render-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=r.sent,y=O.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var p=y({user:{age:18}}),t=p.state,_=p.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_(function(g){var S=g.value;return E.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},E.createElement("span",{style:{flexGrow:1}},S),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return r.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-custom-render-demo-1":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r;return u()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=p.sent,y=O.useStore,s=O.delay,d=O.computed,p.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=p.sent,a=l.Button,r=l.ColorBlock,p.abrupt("return",{default:function(){var _=y({order:{price:100,count:1,total:d(function(){var D=R()(u()().mark(function C($){return u()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,s();case 2:return V.abrupt("return",$.price*$.count);case 3:case"end":return V.stop()}},C)}));return function(C){return D.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),g=_.state,S=_.$,b=_.useAsyncState,P=b("order.total");return E.createElement("div",null,E.createElement(r,{name:"Price"},S("order.price")),E.createElement(r,{name:"Count"},S("order.count")),E.createElement(r,{name:"Total",loading:P.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total.value")),E.createElement(r,{name:"Total",loading:P.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total")),E.createElement(a,{onClick:function(){return g.order.count++}},"+Count"))}});case 12:case"end":return p.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-custom-render-demo-2":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o,p,t;return u()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=g.sent,y=O.createStore,s=O.computed,d=O.delay,g.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=g.sent,a=l.Button,r=l.ColorBlock,o=y({order:{price:100,count:1,total:s(function(){var S=R()(u()().mark(function b(P){return u()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,d(2e3);case 2:return C.abrupt("return",P.price*P.count);case 3:case"end":return C.stop()}},b)}));return function(b){return S.apply(this,arguments)}}(),["./price","./count"])}}),p=o.state,t=o.$,g.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(r,{name:"Price"},t("order.price")),E.createElement(r,{name:"Count"},t("order.count")),E.createElement(r,{name:"Total"},t(function(b){var P=b.value,D=b.loading;return E.createElement(E.Fragment,null,D&&E.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!D&&E.createElement("span",null,P,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),E.createElement(a,{onClick:function(){return p.order.count++}},"Count++"))}});case 13:case"end":return g.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},67317:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(35371),K={}},5619:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(33358),A=e(44970),N=e(19644),n={"docs-guide-signal-state-render-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=r.sent,y=O.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var p=y({user:{age:18}}),t=p.state,_=p.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_("user.age")),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-state-render-demo-1":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o,p;return u()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=_.sent,y=O.createStore,_.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=_.sent,d=s.Button,l=s.ColorBlock,a=y({user:{firstName:"\u5F20",lastName:"\u4E09"}}),r=a.state,o=a.signal,p=a.$,_.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(l,{name:"FirstName"},p("user.firstName")),E.createElement(l,{name:"LastName"},p("user.lastName")),E.createElement(l,null,"FullName :",p(function(S){return S.user.firstName+" "+S.user.lastName})),E.createElement(d,{onClick:function(){return r.user.firstName=r.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),E.createElement(d,{onClick:function(){return r.user.lastName=r.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return _.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-state-render-demo-2":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o,p,t;return u()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=g.sent,y=O.createStore,s=O.delay,d=O.computed,g.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=g.sent,a=l.Button,r=l.ColorBlock,o=y({order:{price:100,count:1,total:d(function(){var S=R()(u()().mark(function b(P){return u()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,s(1e3);case 2:return C.abrupt("return",P.price*P.count);case 3:case"end":return C.stop()}},b)}));return function(b){return S.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),p=o.state,t=o.$,g.abrupt("return",{default:function(){return E.createElement("div",null,E.createElement(r,{name:"Price"},t("order.price")),E.createElement(r,{name:"Count"},t("order.count")),E.createElement(r,{name:"Total"},t("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),E.createElement(r,{name:"Total"},t("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),E.createElement(a,{onClick:function(){return p.order.count++}},"+Count"))}});case 13:case"end":return g.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},22234:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(23841),A=e(44970),N=e(19644),n={"docs-guide-signal-watch-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=r.sent,y=O.useStore,r.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var p=y({user:{age:18}}),t=p.state,_=p.$;return E.createElement("div",null,E.createElement(l,{name:"Age"},_(function(g){var S=g.value;return E.createElement("div",null,S)},function(g){return g.user.age})),E.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-watch-demo-1":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=o.sent,y=O.useStore,s=O.computed,o.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return d=o.sent,l=d.Button,a=d.ColorBlock,o.abrupt("return",{default:function(){var t=y({user:{age:18}}),_=t.state,g=t.$;return E.createElement("div",null,E.createElement(a,{name:"Age"},g(function(S){var b=S.value;return E.createElement("div",null,b)},s(function(S){return S.user.age}))),E.createElement(l,{onClick:function(){return _.user.age++}},"+Age"))}});case 11:case"end":return o.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}},"docs-guide-signal-watch-demo-2":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=t.sent,y=O.useStore,s=O.delay,d=O.computed,t.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,o=l.Loading,t.abrupt("return",{default:function(){var g=y({order:{price:10,count:1}}),S=g.state,b=g.$;return E.createElement("div",null,E.createElement(r,{name:"Price"},b("order.price")),E.createElement(r,{name:"Count"},b("order.count")),E.createElement(r,{name:"Total"},b(function(P){var D=P.value,C=P.loading;return E.createElement("div",null,C?E.createElement(o,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},d(function(){var P=R()(u()().mark(function D(C){return u()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,s(1e3);case 2:return j.abrupt("return",C.order.price*C.order.count);case 3:case"end":return j.stop()}},D)}));return function(D){return P.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),E.createElement(a,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},16645:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(81897),K={}},77680:function(te,m,e){"use strict";var W;e.r(m),e.d(m,{demos:function(){return y}});var u=e(29008),K=e.n(u),R=e(28633),E=e.n(R),i=e(70958),A=e.n(i),N=e(92379),n=e(94451),T=e(19644),O=e(44970),y={"docs-guide-store-render-demo-0":{component:N.memo(N.lazy(A()(K()().mark(function s(){var d,l,a,r,o,p,t,_,g,S,b,P;return K()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return d=C.sent,l=d.default,a=d.createContext,r=d.useContext,o=d.useState,C.next=9,Promise.resolve().then(e.bind(e,19644));case 9:return p=C.sent,t=p.ColorBlock,_=p.Button,g=p.Divider,S=a({firstName:"Zhang",lastName:"Fisher",age:18}),b=l.memo(function($){var j=r(S);return l.createElement(t,{name:"\u5B50\u7EC4\u4EF6:".concat($.name)},l.createElement("span",null,"Hello :",j.firstName," ",j.lastName))}),P=0,C.abrupt("return",{default:function(){var j=o({firstName:"Zhang",lastName:"Fisher",age:18}),V=E()(j,2),z=V[0],U=V[1];return l.createElement(S.Provider,{value:z},l.createElement(g,{title:"\u6839\u7EC4\u4EF6"}),l.createElement(t,{name:"FullName"},z.firstName," ",z.lastName),l.createElement(t,{name:"Age"},"Age :",z.age),l.createElement(g,{title:"\u5B50\u7EC4\u4EF6"}),l.createElement(b,{name:"A"}),l.createElement(b,{name:"B"}),l.createElement(_,{onClick:function(){U({firstName:"Zhang",lastName:"Fisher",age:++P})}},"+Age"))}});case 17:case"end":return C.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{react:W||(W=e.t(N,2)),"x-react-components":T},renderOpts:{compile:function(){var s=A()(K()().mark(function l(){var a,r=arguments;return K()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(39).then(e.bind(e,39039));case 2:return p.abrupt("return",(a=p.sent).default.apply(a,r));case 3:case"end":return p.stop()}},l)}));function d(){return s.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-1":{component:N.memo(N.lazy(A()(K()().mark(function s(){var d,l,a,r,o,p,t,_,g,S,b,P;return K()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=C.sent,l=d.createStore,C.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=C.sent,r=a.default,C.next=10,Promise.resolve().then(e.bind(e,19644));case 10:return o=C.sent,p=o.ColorBlock,t=o.Button,_=o.Divider,g=l({firstName:"Zhang",lastName:"Fisher",age:18}),S=r.memo(function($){var j=g.useState("firstName"),V=E()(j,1),z=V[0];return r.createElement(p,{name:"\u5B50\u7EC4\u4EF6:FirstName"},z)}),b=r.memo(function($){var j=g.useState("lastName"),V=E()(j,1),z=V[0];return r.createElement(p,{name:"\u5B50\u7EC4\u4EF6:lastName"},z)}),P=0,C.abrupt("return",{default:function(){var j=g.useState("age"),V=E()(j,1),z=V[0];return r.createElement(r.Fragment,null,r.createElement(_,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(p,{name:"FullName"},"Hello :",g.state.firstName," ",g.state.lastName),r.createElement(p,{name:"Age"},z),r.createElement(_,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(S,null),r.createElement(b,null),r.createElement(t,{onClick:function(){return g.state.age=g.state.age+1}},"+Age"),r.createElement(t,{onClick:function(){return g.state.firstName=g.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return C.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,react:W||(W=e.t(N,2)),"x-react-components":T},renderOpts:{compile:function(){var s=A()(K()().mark(function l(){var a,r=arguments;return K()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(39).then(e.bind(e,39039));case 2:return p.abrupt("return",(a=p.sent).default.apply(a,r));case 3:case"end":return p.stop()}},l)}));function d(){return s.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-2":{component:N.memo(N.lazy(A()(K()().mark(function s(){var d,l,a,r,o,p,t,_,g,S,b,P,D,C;return K()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=j.sent,l=d.createStore,j.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=j.sent,r=a.default,j.next=10,Promise.resolve().then(e.bind(e,19644));case 10:return o=j.sent,p=o.ColorBlock,t=o.Button,_=o.Divider,g=l({firstName:"Zhang",lastName:"Fisher",age:18}),S=g.state,b=g.$,P=function(){return r.createElement(p,{name:"\u5B50\u7EC4\u4EF6:FirstName"},b("firstName"))},D=function(){return r.createElement(p,{name:"\u5B50\u7EC4\u4EF6:LastName"},b("lastName"))},C=0,j.abrupt("return",{default:function(){return r.createElement(r.Fragment,null,r.createElement(_,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(p,{name:"FullName"},b("firstName")," ",b("lastName")),r.createElement(p,{name:"Age"},b("age")," - ",++C),r.createElement(_,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(P,null),r.createElement(D,null),r.createElement(t,{onClick:function(){return S.age=S.age+1}},"+Age"),r.createElement(t,{onClick:function(){return S.firstName=S.firstName+"."}},"Change FirstName"),r.createElement(t,{onClick:function(){return S.lastName=S.lastName+"*"}},"Change LastName"))}});case 19:case"end":return j.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":O,react:W||(W=e.t(N,2)),"x-react-components":T},renderOpts:{compile:function(){var s=A()(K()().mark(function l(){var a,r=arguments;return K()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(39).then(e.bind(e,39039));case 2:return p.abrupt("return",(a=p.sent).default.apply(a,r));case 3:case"end":return p.stop()}},l)}));function d(){return s.apply(this,arguments)}return d}()}}}},33788:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return O}});var W=e(28633),u=e.n(W),K=e(29008),R=e.n(K),E=e(70958),i=e.n(E),A=e(92379),N=e(61786),n=e(44970),T=e(19644),O={"docs-guide-store-state-demo-0":{component:A.memo(A.lazy(i()(R()().mark(function y(){var s,d,l,a,r,o,p,t,_,g;return R()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=b.sent,d=s.createStore,l=s.computed,b.next=7,Promise.resolve().then(e.bind(e,19644));case 7:return a=b.sent,r=a.Button,o=a.ColorBlock,p=d({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(D){return D.firstName+D.lastName},salary:l(function(){var P=i()(R()().mark(function D(C){return R()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",C.age*10);case 1:case"end":return j.stop()}},D)}));return function(D){return P.apply(this,arguments)}}(),["age"])}),t=p.state,_=p.useState,g=p.$,globalThis.state=t,b.abrupt("return",{default:function(){var D=_("age"),C=u()(D,2),$=C[0],j=C[1],V=_("salary"),z=u()(V,2),U=z[0],H=z[1],M=_(function(Q){return Q.lastName},function(Q,Y){return Y.lastName=Q}),F=u()(M,2),Z=F[0],J=F[1];return A.createElement("div",null,A.createElement(o,null,"Fullname :",t.firstName," ",Z),A.createElement(o,null,"Age :",$),A.createElement(o,null,"Salary: ",g("salary")),A.createElement(r,{onClick:function(){return j($+1)}},"+Age"),A.createElement(r,{onClick:function(){return J(Z+".")}},"Change lastName"))}});case 13:case"end":return b.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(R()().mark(function d(){var l,a=arguments;return R()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}},"docs-guide-store-state-demo-1":{component:A.memo(A.lazy(i()(R()().mark(function y(){var s,d,l,a,r,o,p,t,_,g;return R()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=b.sent,d=s.createStore,b.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=b.sent,a=l.ColorBlock,b.next=10,Promise.resolve().then(e.bind(e,19644));case 10:return r=b.sent,o=r.Button,p=d({firstName:"Zhang",lastName:"Fisher",fullName:function(D){return D.firstName+D.lastName}}),t=p.useState,_=p.state,g=p.$,b.abrupt("return",{default:function(){var D=t(function(M){return M.firstName},function(M,F){return F.firstName=M}),C=u()(D,2),$=C[0],j=C[1],V=t(function(M){return M.fullName},function(M,F){var Z=u()(M,2),J=Z[0],Q=Z[1];F.firstName=J,F.lastName=Q}),z=u()(V,2),U=z[0],H=z[1];return A.createElement("div",null,A.createElement(a,{name:"FullName",value:U}),A.createElement(o,{onClick:function(){return j("<".concat($,">"))}},"Change FirstName"),A.createElement(o,{onClick:function(){return H(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return b.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(R()().mark(function d(){var l,a=arguments;return R()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}},"docs-guide-store-state-demo-2":{component:A.memo(A.lazy(i()(R()().mark(function y(){var s,d,l,a,r,o,p,t;return R()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=g.sent,d=s.createStore,g.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return l=g.sent,a=l.Button,r=l.ColorBlock,o=d({age:18}),p=o.state,t=o.$,g.abrupt("return",{default:function(){return A.createElement("div",null,A.createElement(r,null,"Age+Signal :",t("age")),A.createElement(r,null,"Age :",p.age),A.createElement(a,{onClick:function(){return p.age=p.age+1}},"+Age"))}});case 11:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(R()().mark(function d(){var l,a=arguments;return R()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}}}},85244:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return n}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(92379),i=e(34450),A=e(44970),N=e(19644),n={"docs-guide-store-demo-0":{component:E.memo(E.lazy(R()(u()().mark(function T(){var O,y,s,d,l,a,r,o,p;return u()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return O=_.sent,y=O.useStore,_.next=6,Promise.resolve().then(e.bind(e,19644));case 6:return s=_.sent,d=s.Button,l=s.ColorBlock,_.abrupt("return",{default:function(){var S=y({count:18}),b=S.state,P=S.$;return E.createElement("div",null,E.createElement(l,{name:"Count"},P("count")),E.createElement(d,{onClick:function(){return b.count++}},"Count++"))}});case 11:case"end":return _.stop()}},T)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":A,"x-react-components":N},renderOpts:{compile:function(){var T=R()(u()().mark(function y(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},y)}));function O(){return T.apply(this,arguments)}return O}()}}}},35860:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(89073),K={}},45988:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return O}});var W=e(29008),u=e.n(W),K=e(28633),R=e.n(K),E=e(70958),i=e.n(E),A=e(92379),N=e(26826),n=e(44970),T=e(19644),O={"docs-guide-watch-objects-demo-0":{component:A.memo(A.lazy(i()(u()().mark(function y(){var s,d,l,a,r,o,p,t,_;return u()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return p=function(P){return l(function(D,C){var $=C.state;return $.price*D},function(D){return D[D.length-1]==="count"},{initial:2,group:P})},S.next=3,Promise.resolve().then(e.bind(e,44970));case 3:return s=S.sent,d=s.createStore,l=s.watch,S.next=8,Promise.resolve().then(e.bind(e,19644));case 8:return a=S.sent,r=a.ColorBlock,o=a.Divider,t={bookName:"zhang",price:2,count:1,total1:p("a"),total2:p("a"),total3:p("b"),total4:p("b"),total5:p("b")},_=d({state:t}),globalThis.Store=_,S.abrupt("return",{default:function(){var P=_.useState(),D=R()(P,2),C=D[0],$=D[1];return typeof C.total1=="function"&&console.warn("state.total1 is function"),A.createElement("div",null,A.createElement("div",null,"bookName=",C.bookName),A.createElement("div",null,"price=",C.price),A.createElement("div",null,"count=",A.createElement("button",{onClick:function(){return $(function(V){return V.count=V.count-1})}},"-"),A.createElement("input",{value:C.count,onChange:_.sync(function(j){return j.count})}),A.createElement("button",{onClick:function(){return $(function(V){return V.count=V.count+1})}},"+")),A.createElement(o,{name:"A Group"}),A.createElement(r,{name:"Total-1",value:C.total1}),A.createElement(r,{name:"Total-2",value:C.total2}),A.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("a",!0)}},"Enable A Group"),A.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("a",!1)}},"Disable A Group"),A.createElement("div",null,"\u5F53\u7981\u7528A Group\u65F6\uFF0C\u4FEE\u6539count\u65F6\u4E0D\u4F1A\u5BFC\u81F4total\u53D8\u5316\uFF0C\u56E0\u4E3A\u8BE5\u7EC4\u88AB\u7981\u6B62\u6267\u884C\u4E86"),A.createElement(o,{name:"B Group"}),A.createElement(r,{name:"Total-3",value:C.total3}),A.createElement(r,{name:"Total-4",value:C.total4}),A.createElement(r,{name:"Total-5",value:C.total5}),A.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("b",!0)}},"Enable B Group"),A.createElement("button",{onClick:function(){return _.watchObjects.enableGroup("b",!1)}},"Disable B Group"))}});case 15:case"end":return S.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,watch } from "@autostorejs/react" 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":T},renderOpts:{compile:function(){var y=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}}}},81824:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(56081),K={}},32804:function(te,m,e){"use strict";var W;e.r(m),e.d(m,{demos:function(){return O}});var u=e(29008),K=e.n(u),R=e(28633),E=e.n(R),i=e(70958),A=e.n(i),N=e(92379),n=e(42380),T=e(44970),O={"docs-guide-watch-demo-0":{component:N.memo(N.lazy(A()(K()().mark(function y(){var s,d,l,a,r;return K()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=p.sent,d=s.createStore,l=s.watch,a={orders:[{bookName:"SpeedForm Quick-Start",price:100,count:1,total:function(_){return _.price*_.count}},{bookName:"Helux",price:98,count:1,total:function(_){return _.price*_.count}}],total:l(function(t){return r.state.orders.reduce(function(_,g){return _+g.count*g.price},0)},function(t){return t[t.length-1]==="count"},{initial:198})},r=d({state:a},{singleton:!1}),p.abrupt("return",{default:function(){var _=r.useState(),g=E()(_,1),S=g[0];return N.createElement("table",null,N.createElement("thead",null,N.createElement("tr",null,N.createElement("th",null,"BookName"),N.createElement("th",null,"Price"),N.createElement("th",null,"Count"),N.createElement("th",null,"Total"))),N.createElement("tbody",null,S.orders.map(function(b,P){return N.createElement("tr",{key:P},N.createElement("td",null,b.bookName),N.createElement("td",null,b.price),N.createElement("td",null,N.createElement("input",{value:b.count,onChange:r.sync(function(D){return D.orders[P].count})})),N.createElement("td",null,b.total))}),N.createElement("tr",null,N.createElement("td",{colSpan:3},"Total"),N.createElement("td",null,S.total))))}});case 8:case"end":return p.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":T},renderOpts:{compile:function(){var y=A()(K()().mark(function d(){var l,a=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}},"docs-guide-watch-demo-1":{component:N.memo(N.lazy(A()(K()().mark(function y(){var s,d,l,a,r,o,p,t,_;return K()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=S.sent,d=s.createStore,l=s.computed,a=s.ObserverScopeRef,S.next=8,Promise.resolve().then(e.t.bind(e,92379,19));case 8:return r=S.sent,o=r.useEffect,p=r.useState,t={user:{firstName:"zhang",lastName:"fisher",fullName:l(function(){var b=A()(K()().mark(function P(D){var C,$,j;return K()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return C=E()(D,2),$=C[0],j=C[1],z.abrupt("return",$+j);case 2:case"end":return z.stop()}},P)}));return function(P){return b.apply(this,arguments)}}(),["user/firstName","user/lastName"],{scope:a.Depends})}},_=d({state:t}),S.abrupt("return",{default:function(){var P=_.useState(),D=E()(P,1),C=D[0],$=p(""),j=E()($,2),V=j[0],z=j[1];return o(function(){var U=_.watch(function(H){z(H.map(function(M){return M.join("/")}).join(","))},["user/firstName","user/lastName"]);return U},[]),N.createElement("div",null,N.createElement("div",null,"watch: ",V),N.createElement("div",null,"firstName=",N.createElement("input",{value:C.user.firstName,onChange:_.sync(function(U){return U.user.firstName})})),N.createElement("div",null,"lastName=",N.createElement("input",{value:C.user.lastName,onChange:_.sync(function(U){return U.user.lastName})})),N.createElement("div",null,"fullName=",C.user.fullName.result))}});case 14:case"end":return S.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef } from "@autostorejs/react" 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":T,react:W||(W=e.t(N,2))},renderOpts:{compile:function(){var y=A()(K()().mark(function d(){var l,a=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}},"docs-guide-watch-demo-2":{component:N.memo(N.lazy(A()(K()().mark(function y(){var s,d,l,a,r,o,p,t;return K()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=g.sent,d=s.createStore,l=s.computed,a=s.ObserverScopeRef,g.next=8,Promise.resolve().then(e.t.bind(e,92379,19));case 8:return r=g.sent,o=r.useState,p={user:{firstName:"zhang",lastName:"fisher",fullName:l(function(){var S=A()(K()().mark(function b(P){var D,C,$;return K()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return D=E()(P,2),C=D[0],$=D[1],V.abrupt("return",C+$);case 2:case"end":return V.stop()}},b)}));return function(b){return S.apply(this,arguments)}}(),["user/firstName","user/lastName"],{scope:a.Depends})}},t=d({state:p}),g.abrupt("return",{default:function(){var b=t.useState(),P=E()(b,1),D=P[0],C=o(""),$=E()(C,2),j=$[0],V=$[1],z=o("user/firstName"),U=E()(z,2),H=U[0],M=U[1],F=o(""),Z=E()(F,2),J=Z[0],Q=Z[1];return t.useWatch(function(Y,se){return V(se.join("/")),Q(Y),Y},H,{id:"use1"}),N.createElement("div",null,N.createElement("div",null,"watch for: ",H),N.createElement("div",null,"Watch value:",J),N.createElement("div",null,"firstName=",N.createElement("input",{value:D.user.firstName,onChange:t.sync(function(Y){return Y.user.firstName})})),N.createElement("div",null,"lastName=",N.createElement("input",{value:D.user.lastName,onChange:t.sync(function(Y){return Y.user.lastName})})),N.createElement("div",null,"fullName=",D.user.fullName.result),N.createElement("button",{onClick:function(){return M("user/firstName")}},"watch firstName"),N.createElement("button",{onClick:function(){return M("user/lastName")}},"watch lastName"))}});case 13:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef } from "@autostorejs/react" 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":T,react:W||(W=e.t(N,2))},renderOpts:{compile:function(){var y=A()(K()().mark(function d(){var l,a=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(39).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return y.apply(this,arguments)}return s}()}}}},45618:function(te,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return K}});var W=e(92379),u=e(43112),K={}},77101:function(te,m,e){"use strict";e.r(m),e.d(m,{Author:function(){return d},Counter:function(){return T},getProjects:function(){return p}});var W=e(28633),u=e.n(W),K=e(92379),R=e(44970),E=e(19644),i=e(651),A=(0,R.createStore)({root:{count:1}}),N=A.state,n=A.$,T=function(){var g=(0,K.useState)(1),S=u()(g,2),b=S[0],P=S[1];return(0,i.jsxs)(E.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[b,(0,i.jsxs)(E.ColorBlock,{children:["Count:",b]}),(0,i.jsxs)(E.ColorBlock,{children:["Count:",n("root.count")]}),(0,i.jsx)(E.Button,{onClick:function(){return P(b+1)},children:"State +1"}),(0,i.jsx)(E.Button,{onClick:function(){return N.root.count++},children:"Signal +1"})]})},O=(0,R.createStore)({firstName:"Zhang",lastName:"Fisher"}),y=O.state,s=O.$,d=function(){var g=(0,K.useState)(1),S=u()(g,2),b=S[0],P=S[1];return(0,i.jsxs)(E.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[b,(0,i.jsxs)(E.ColorBlock,{children:["Count:",b]}),(0,i.jsx)(E.ColorBlock,{children:s(function(D){return D.firstName+" "+D.lastName})}),(0,i.jsx)(E.Button,{onClick:function(){return P(b+1)},children:"State +1"}),(0,i.jsx)(E.Button,{onClick:function(){return y.lastName=y.lastName+"."},children:"Update lastName"})]})},l=e(29008),a=e.n(l),r=e(70958),o=e.n(r);function p(_){return t.apply(this,arguments)}function t(){return t=o()(a()().mark(function _(g){var S,b,P;return a()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,fetch(g);case 2:if(S=C.sent,!S.ok){C.next=11;break}return C.next=6,S.json();case 6:return b=C.sent,P=b.map(function($){return{name:$.name,url:$.html_url,description:$.description,stars:$.stargazers_count}}),C.abrupt("return",P);case 11:throw new Error("".concat(S.status," - ").concat(S.statusText));case 12:case"end":return C.stop()}},_)})),t.apply(this,arguments)}},19644:function(te,m,e){"use strict";e.r(m),e.d(m,{Box:function(){return K},Button:function(){return N},Card:function(){return O},Col:function(){return _},ColorBlock:function(){return t},Divider:function(){return a},Field:function(){return l},Input:function(){return C},JsonView:function(){return U},Loading:function(){return E},RichLabel:function(){return V},Row:function(){return g},ValidResult:function(){return d}});var W=e(92379),u=e(651),K=function(M){var F=M.title,Z=M.enable,J=Z===void 0?!0:Z,Q=M.visible,Y=Q===void 0?!0:Q;return(0,u.jsxs)("div",{style:{display:Y?"flex":"none",position:"relative",flexDirection:"column",padding:"8px",margin:"16px 4px 4px 4px",boxSizing:"border-box",border:"1px solid #bbb"},children:[(0,u.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:J?"#bbb":"gray"},children:F||""}),M.children]})},R=e(97106),E=function(M){var F=M.size,Z=F===void 0?20:F,J=M.visible,Q=J===void 0?!0:J,Y=M.color,se=M.tips,oe=se===void 0?"loading...":se;return(0,u.jsxs)("span",{title:oe,style:{display:Q?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,u.jsx)(R.Z1,{width:Z,height:Z,color:Y}),M.title?(0,u.jsx)("span",{style:{marginLeft:"4px"},children:M.title}):null]})},i=e(94039),A=(0,i.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(M){return M.visible!==!1?M.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #eee",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"speed-button"}),N=function(M){var F=M.loading,Z=M.timeout,J=Z===void 0?0:Z,Q=M.progress,Y=Q===void 0?0:Q,se=M.cancel,oe=M.onClick;return(0,u.jsxs)("div",{className:A.className,style:A.getStyle(M),onClick:oe,children:[F?(0,u.jsx)(E,{}):null,(0,u.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:M.children}),J>0?(0,u.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:J}):"",Y>0?(0,u.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[Y,"%"]}):"",M.error?(0,u.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:M.error}):"",M.loading&&typeof se=="function"?(0,u.jsx)("button",{onClick:se,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},n=(0,i.zo)({border:"1px solid #e1e1e1",background:function(M){return M.enable!==!1?"white":"gray"},margin:"8px",display:function(M){return M.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"card"}),T=(0,i.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555"},{className:"card-header"}),O=function(M){var F=M.title,Z=M.enable,J=Z===void 0?!0:Z,Q=M.buttons,Y=Q===void 0?[]:Q,se=Array.isArray(M.children)?M.children:[M.children];return(0,u.jsxs)("div",{className:n.className,style:n.getStyle(M),children:[(0,u.jsxs)("div",{className:T.className,style:T.getStyle(M),children:[(0,u.jsx)("span",{style:{flexGrow:1,color:J?"#222":"gray"},children:F}),(0,u.jsx)("span",{style:{},children:Y.map(function(oe,ve){return(0,u.jsx)("span",{className:"button",style:{padding:"4px",margin:"4px",cursor:"pointer"},onClick:oe.onClick,children:oe.title},ve)})})]}),(0,u.jsx)("div",{style:{padding:"12px"},children:se.map(function(oe,ve){return se.length>1&&ve==se.length-1&&oe.classList&&oe.classList.contains("footer")?(0,u.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:oe},ve):oe})})]})},y=e(24325),s=e.n(y),d=function(M){var F=M.validate,Z=M.help;if(F!=null){var J=typeof F!="boolean",Q=J?F==null?void 0:F.result:F,Y=J?F==null?void 0:F.loading:!1,se=J?F==null?void 0:F.error:Z;return(0,u.jsxs)("span",{style:{color:"red",display:Y||!Q?"flex":"none"},children:[(0,u.jsx)(E,{visible:Y,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!Y&&(Q?"":se)]})}},l=function(M){var F=M.enable,Z=F===void 0?!0:F,J=M.visible,Q=J===void 0?!0:J,Y=M.label,se=Y===void 0?"":Y,oe=M.children,ve=oe===void 0?"":oe,G=M.memo;return(0,u.jsxs)("div",{className:"field",style:{position:"relative",display:Q===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,u.jsxs)("label",{className:"field-label",style:{minWidth:"160px",fontWeight:"bold",color:Z===!1?"gray":"inherit"},children:[se,":"]}),(0,u.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:Z===!1?"gray":"inherit"},children:[typeof ve=="function"?"":ve,G&&(0,u.jsx)("span",{style:{color:"gray"},children:G})]}),(0,u.jsx)(d,s()({},M))]})},a=function(M){var F=M.title,Z=M.visible,J=Z===void 0?!0:Z;return(0,u.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:J?"flex":"none"},children:(0,u.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:F})})},r=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],o=0;function p(){return o++,o>=r.length&&(o=0),r[o]}var t=function(M){var F=(0,W.useRef)(0),Z=M.name,J=M.value,Q=J===void 0?"":J,Y=M.loading,se=Y===void 0?!1:Y,oe=M.comment,ve=p(),G="white";return(0,W.useEffect)(function(){F.current++}),(0,u.jsxs)("div",{style:s()(s()({backgroundColor:ve,padding:"6px",color:G,display:"flex"},M.style),{},{alignItems:"center"}),children:[(0,u.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[Z?(0,u.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:Z}):null,Z?(0,u.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,u.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(Q),M.children]})]}),oe?(0,u.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:oe}):null,se?(0,u.jsx)(E,{color:"white"}):null,(0,u.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:F.current})]})},_=function(M){var F=M.visible,Z=F===void 0?!0:F,J=M.border,Q=J===void 0?!0:J,Y=M.padding,se=Y===void 0?"8px":Y,oe=M.margin,ve=oe===void 0?"0px":oe,G=M.grow,w=G===void 0?1:G;return(0,u.jsx)("div",{className:"layout-col",style:{display:Z?"flex":"none",position:"relative",flexDirection:"column",padding:se,flexGrow:w,margin:ve,boxSizing:"border-box",border:Q?"1px solid #eee":"none"},children:M.children})},g=function(M){var F=M.visible,Z=F===void 0?!0:F,J=M.border,Q=J===void 0?!0:J,Y=M.padding,se=Y===void 0?"8px":Y,oe=M.grow,ve=oe===void 0?1:oe;return(0,u.jsx)("div",{className:"layout-row",style:{display:Z?"flex":"none",position:"relative",flexDirection:"row",flexGrow:ve,padding:se,margin:"4px",boxSizing:"border-box",border:Q?"1px solid #eee":"none"},children:M.children})},S=e(19317),b=e.n(S),P=["id","enable","value"],D=(0,i.zo)({border:function(M){return M.validate===!1?"1px solid red":"1px solid #bbb"},borderRadius:"4px",background:function(M){return M.enable===!1?"gray":"white"},display:function(M){return M.visible===!1?"none":"block"},margin:"4px",padding:"8px",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}},{className:"xc-input"}),C=function(M){var F=M.id,Z=F===void 0?Math.random().toString(36).slice(2):F,J=M.enable,Q=J===void 0?!0:J,Y=M.value,se=b()(M,P),oe={color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"};return(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[M.label?(0,u.jsx)("label",{htmlFor:Z,style:oe,children:M.label}):null,(0,u.jsx)("input",s()(s()({id:Z,value:Y,readOnly:!Q},se),{},{className:D.className,style:D.getStyle(M)})),(0,u.jsx)("form",{})]})},$=e(28633),j=e.n($),V=function(M){var F=M.text,Z=M.color,J=Z===void 0?"#ff6c00":Z,Q=M.rules,Y=typeof J=="string"?{default:J}:Object.assign({default:""},J),se=F;return Q?Object.entries(Q).forEach(function(oe){var ve=j()(oe,2),G=ve[0],w=ve[1];se=se.replace(w,function(q){var le=G.includes(":")?G:"color:".concat(G,";");return"<span style='".concat(le,"'>").concat(q,"</span>")})}):se=F.replace(/\{\s?(.*?)\s?\}/gm,function(oe,ve){return"<span style='color: ".concat(ve in Y?Y[ve]:Y.default,"'>").concat(ve,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,u.jsx)("div",{style:s()({boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},M.style),children:(0,u.jsx)("span",{dangerouslySetInnerHTML:{__html:se}})})},z=function(M){return M.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},U=function(M){var F=z(String(M.children));return(0,u.jsx)(V,{text:F,rules:{"color:green;":/true|false/g,"color:#222;padding:4px;":/\"(.*?)\"/g,"color:#bd0081;padding:4px;":/(?!=\:\s*)[\d\.]+/g,"color:#888;padding:4px;":/(null|defined)/g,"color:#918213;paddingRight:4px;":/^\{|\}$/g},style:{}})}},99640:function(te,m,e){"use strict";e.d(m,{eg:function(){return oe},_L:function(){return V},WE:function(){return rt},M1:function(){return At},CD:function(){return j},up:function(){return se},Xr:function(){return Je},BG:function(){return tt},e2:function(){return U},vp:function(){return Qe},FM:function(){return H},y1:function(){return F},MI:function(){return M},Q6:function(){return J},kF:function(){return Q},Rn:function(){return Ze},fR:function(){return Le},f7:function(){return Y},QI:function(){return Z},X3:function(){return at},W5:function(){return z},RY:function(){return lt},LG:function(){return ut},Rh:function(){return Fe},Fl:function(){return q},Ws:function(){return xt},gw:function(){return pt},b0:function(){return et},tl:function(){return ct},if:function(){return vt},zv:function(){return $e},ux:function(){return ye},kM:function(){return it},vM:function(){return we},Jy:function(){return he},O5:function(){return le},Jq:function(){return pe},vo:function(){return ie},c6:function(){return st},_N:function(){return ge},iI:function(){return de},vb:function(){return _e},PH:function(){return Ee},J_:function(){return xe},PO:function(){return be},pt:function(){return ht},tI:function(){return ue},RM:function(){return Ne},_R:function(){return ae},UQ:function(){return Me},Xl:function(){return Ce},DH:function(){return ze},KZ:function(){return G},Ql:function(){return It},ZW:function(){return mt},Y6:function(){return Se},EG:function(){return qe},YP:function(){return ot}});var W=e(29008),u=e.n(W),K=e(70958),R=e.n(K),E=e(12027),i=e.n(E),A=e(34180),N=e.n(A),n=e(93949),T=e.n(n),O=e(6270),y=e.n(O),s=e(28810),d=e.n(s),l=e(77701),a=e.n(l),r=e(28249),o=e.n(r),p=e(29861),t=e.n(p),_=e(14582),g=e.n(_),S=e(48510),b=e.n(S),P=e(30790),D=e.n(P),C=e(5672),$=e.n(C),j=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h)}($()(Error)),V=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h)}(j),z=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h)}(j),U=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h)}(j),H=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h)}(j),M=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h)}(j),F=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h)}(j),Z=Symbol("skip-proxy"),J=Symbol("observer-descriptor-builder"),Q=Symbol("observer-descriptor"),Y=".",se="__batch_update__",oe=Symbol("AsyncComputedValue");function ve(f){return f.constructor.name==="AsyncFunction"}function G(f){return f?f.map(function(v){return Array.isArray(v)?v:typeof v=="string"?["/","./","../"].some(function(h){return v.startsWith(h)})?v:v.includes(Y)?v.split(Y):v.split("."):[]}):[]}function w(){return{objectify:!0,async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0}}function q(){var f=arguments[0];if(typeof f!="function")throw new Error("computed getter must be a function");var v=[],h=Object.assign({},w());if(arguments.length===1)v=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))h.depends=arguments[1];else if(N()(arguments[1])==="object")Object.assign(h,arguments[1]),h.depends=G(h.depends);else throw new H;else arguments.length>=3&&(v=G(arguments[1]),Object.assign(h,arguments[2]),h.depends=v);h.async=h.async===!0||ve(f)||arguments.length>=2&&Array.isArray(arguments[1]);var I=function(){return t()({type:"computed",getter:f,options:h},Q,!0)};return I[J]=!0,I}function le(f){return f?f.some(function(v){return typeof v=="string"?v.startsWith("./")||v.startsWith("../")||v.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(v):!0}):!1}function de(f){return N()(f)==="object"&&f.hasOwnProperty("type")&&typeof f.type=="string"&&f.hasOwnProperty("getter")&&typeof f.getter=="function"&&f.hasOwnProperty("options")&&N()(f.options)==="object"}function ae(f){try{return f[Z]===!0}catch(v){}return!1}function ie(f,v){if(f===v)return!0;if(f===null||v===null||N()(f)!==N()(v))return!1;if(N()(f)==="object"){if(Array.isArray(f)&&Array.isArray(v))return f.length!==v.length?!1:f.every(function(I,c){return ie(I,v[c])});if(!Array.isArray(f)&&!Array.isArray(v)){var h=Object.keys(f);return h.length!==Object.keys(v).length?!1:h.every(function(I){return ie(f[I],v[I])})}else return!1}return!1}function ge(f){return toString.call(f)==="[object Map]"}function Ee(f,v){return!f||!v||f.length!==v.length?!1:f.every(function(h,I){return h===v[I]})}function xe(f,v){var h=Ee(f,v);return h?!0:f.length!==v.length?!1:f.every(function(I,c){return I==="*"?!0:I===v[c]})}function be(f){return f==null||N()(f)!=="object"?!1:Object.prototype.toString.call(f)==="[object Object]"}function pe(f){return f&&N()(f)==="object"&&f.hasOwnProperty(oe)}function ue(f){try{return!!f&&(N()(f)==="object"||typeof f=="function")&&typeof f.then=="function"&&typeof f.catch=="function"&&(f instanceof Promise||Object.prototype.toString.call(f)==="[object Promise]")}catch(v){return!1}}function _e(f){return typeof f=="function"&&f[J]===!0}function Ne(f){return N()(f)==="object"&&f!==null&&!("__isProxy"in f)}function ye(f,v){var h=f.get(v);if(h!==void 0)return h;var I=f.get(Number(v)||v);if(I!==void 0)return I}function he(f,v){if(!v||v.length===0)return f;var h,I=f;return v.forEach(function(c){if(ge(I))h=ye(I,c);else if(c in I)h=I[c];else throw new Error("invalid state path: ".concat(v.join(".")));I=h}),h}function Ce(f){try{f[Z]=!0}catch(v){}return f}function Se(f,v,h,I){var c=f,x=v.length-1;v.forEach(function(B,L){var k=ge(c);if(L===x){if(I===!0){var ee=k?ye(c,B):c[B];pe(ee)&&(c=ee,B="value")}k?c.set(B,h):c[B]=h;return}var X=k?ye(c,B):c[B];c=X})}function Me(f){return(f||["ROOT"]).map(function(v){return Array.isArray(v)?v.join("."):v}).join(Y)}function $e(){return Math.random().toString(36).slice(2)}function Ge(f,v,h){var I=f&&!f[0].startsWith("#");if(Array.isArray(v))return v;if(v==="self")return I?f:void 0;if(v==="root")return I?[]:void 0;if(v==="parent")return I?f.slice(0,-2):void 0;if(v==="current")return I?f.slice(0,-1):void 0;if(typeof v=="string")return v.startsWith("./")?I?[].concat(i()(f.slice(0,-1)),i()(v.slice(2).split(Y))):void 0:v.startsWith("../")?I?Ge(f.slice(0,-1),v.slice(3),!0):void 0:v.startsWith("/")?v.replace(/^(\/)*/,"").split(Y):I&&h?[].concat(i()(f.slice(0,-1)),i()(v.split(Y))):v.split(Y)}function Fe(f,v){return v?v.map(function(h){return Ge(f,h)}).filter(function(h){return h!==void 0}):[]}function ct(f,v){var h="";return v.id?h=v.id:h=Me(f),h}function qe(f,v,h){var I=f,c=v.length-1;v.forEach(function(x,B){var L=ge(I);if(B===c){var k=L?I.get(x):I[x];N()(k)==="object"&&Object.assign(k,h);return}L?(I.has(x)||I.set(x,{}),I=I.get(x)):(x in I||(I[x]={}),I=I[x])})}function et(f,v){function h(I,c){for(var x in I){var B=I[x];typeof v=="function"&&v({value:B,key:x,parent:I,path:c.concat(x)}),N()(B)==="object"&&h(B,c.concat(x))}}h(f,[])}function it(f){return f}function pt(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(v){setTimeout(v,f)})}function ze(f){var v=new Map;return f.forEach(function(h){var I=h.join(".");v.set(I,h)}),Array.from(v.values())}function mt(f,v){return f.length>v.length?!1:f.every(function(h,I){return h===v[I]})}function vt(f,v){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"none",I=[];return typeof f=="function"?I=v.collectDependencies(function(){return f(v.state)}):typeof f=="string"?I=[f.split(Y)]:Array.isArray(f)?I=[i()(f)]:I=[],h!=="none"&&I.forEach(function(c){var x=v.peep(function(B){return he(B,c)});pe(x)&&c.push(h==="all"?"*":"value")}),I}function It(f,v){if(!v||v.length===0)return!1;for(var h,I=f,c=0;c<v.length;c++){var x=v[c],B=!1;if(ge(I)){if(B=I.has(x),!B)return!1;h=ye(I,x)}else{if(B=x in I,!B)return!1;h=I[x]}I=h}return!0}var ft=e(24325),Te=e.n(ft);function we(f,v){if(Array.isArray(f)){for(var h=i()(f),I=0;I<h.length;I++)h[I]=we(h[I],v);return h}else if(N()(f)==="object"){if(!v&&pe(f))return f.value;var c=Te()({},f);for(var x in c)c[x]=we(c[x],v);return c}return f}function ht(f){return f==null||typeof f=="string"||typeof f=="number"||typeof f=="boolean"}function xt(f){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof f=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(f)}var tt=function(f){a()(h,f);var v=o()(h);function h(I){var c;return T()(this,h),c=v.call(this),c.store=I,c}return y()(h,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(c){this.store.options.enableComputed=c}},{key:"create",value:function(){var c=de(arguments[0])?arguments[0]:q.apply(void 0,arguments)();if(c.options.async&&!le(c.options.depends))throw new F("The scope of the dynamic computed object must be the root state object or an absolute path");var x=c.options.scope;if(x===void 0)c.options.scope="ROOT";else if(!le([x]))throw new M("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(c)}},{key:"runGroup",value:function(){var I=R()(u()().mark(function x(B,L,k){return u()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,this.run(function(ne){return ne.group==B},L,k);case 2:return X.abrupt("return",X.sent);case 3:case"end":return X.stop()}},x,this)}));function c(x,B,L){return I.apply(this,arguments)}return c}()},{key:"run",value:function(){var I=R()(u()().mark(function x(){var B=arguments,L=this,k,ee,X,ne,re=arguments;return u()().wrap(function(ce){for(;;)switch(ce.prev=ce.next){case 0:if(re.length!=0){ce.next=2;break}return ce.abrupt("return",Promise.all(i()(this.values()).map(function(me){return me.run()})));case 2:return typeof re[0]=="function"?k=re[0]:typeof re[0]=="string"&&(k=function(Pe){return Pe.id==B[0]}),ee=Object.assign({},re[1]),X=Object.assign({wait:!1,timeout:0},re[2]),ne={},ce.abrupt("return",new Promise(function(me,Pe){if(X.wait){var fe;ee.onDone=function(Ae){var Re=Ae.id;if(ne[Re]=!0,Object.values(ne).every(function(ke){return ke}))return clearTimeout(fe),!0},X.timeout>0&&(fe=setTimeout(function(){Pe(new z)},X.timeout))}Promise.all(i()(L.values()).filter(function(Ae){return k(Ae)?(ne[Ae.id]=!1,!0):!1}).map(function(Ae){return Ae.run(ee)})),X.wait||me()}));case 7:case"end":return ce.stop()}},x,this)}));function c(){return I.apply(this,arguments)}return c}()},{key:"enableGroup",value:function(){var I=R()(u()().mark(function x(B){var L,k,ee;return u()().wrap(function(ne){for(;;)switch(ne.prev=ne.next){case 0:L=g()(this.values());try{for(L.s();!(k=L.n()).done;)ee=k.value,ee.options.enable=B}catch(re){L.e(re)}finally{L.f()}case 2:case"end":return ne.stop()}},x,this)}));function c(x){return I.apply(this,arguments)}return c}()},{key:"delete",value:function(c){var x;return(x=this.get(c))===null||x===void 0||x.detach(),b()(D()(h.prototype),"delete",this).call(this,c)}},{key:"find",value:function(c){if(c){var x=Array.isArray(c)?c:c.split(Y),B=g()(this.values()),L;try{for(B.s();!(L=B.n()).done;){var k=L.value;if(Ee(k.path,x))return k}}catch(ee){B.e(ee)}finally{B.f()}}}}]),h}($()(Map)),gt=e(69075);function _t(f){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",h=typeof f=="function"?f():f instanceof Error?f.stack:f;try{var I;(I=console)[v].apply(I,["[AutoStore] "].concat(i()(Array.isArray(h)?h:[h])))}catch(c){}}function Ue(f,v){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Y,I=[];try{return typeof v=="function"&&(v=v.call(f,f)),I=Array.isArray(v)?v:typeof v=="string"?v.split(h):[],I.length>0?he(f,I):f}catch(c){return f}}var Le=function(f){return f.Root="ROOT",f.Current="CURRENT",f.Parent="PARENT",f.Depends="DEPENDS",f.Self="SELF",f}({});function yt(f,v,h){var I=v==null?h:v;if(typeof I=="function")try{I=I.call(f.store,f)}catch(c){}return I==null?h==null?Le.Current:h:I}function Ve(f,v,h,I){var c=f.store.state,x=f.store.options;if(typeof x.getRootScope=="function"){var B=x.getRootScope(f,{observerType:v,valuePath:h==null?void 0:h.path});B!==void 0&&(c=B)}var L=h||{},k=L.path,ee=L.parentPath,X=yt(f,I.scope,x.scope),ne=c;try{if(X===Le.Current)ne=Ue(c,ee);else if(X===Le.Parent)ne=Ue(c,k.slice(0,k.length-2<0?0:k.length-2));else if(X===Le.Root)ne=c;else if(X===Le.Depends){var re;ne=(re=f.depends)===null||re===void 0?void 0:re.map(function(Ie){return Ue(c,Ie)})}else typeof X=="string"?X.startsWith("@")?ne=Ve(f,v,h,Te()(Te()({},I),{},{scope:Ve(f,v,Te()(Te()({},h),{},{path:X.slice(1).split(Y)}),Te()(Te()({},I),{},{scope:X.slice(1)}))})):ne=Ue(c,Ge(f.path,X)):Array.isArray(X)&&(ne=Ue(c,X))}catch(Ie){x.log("Error while getting computed scope ".concat(f.toString(),": ").concat(Ie.message),"error")}return ne}var Ze=function(){function f(v,h,I){T()(this,f),t()(this,"_path",void 0),t()(this,"_id",""),t()(this,"_initial",void 0),t()(this,"_value",void 0),t()(this,"_associated",!1),t()(this,"_attached",!1),t()(this,"_getter",void 0),t()(this,"_depends",[]),t()(this,"_options",void 0),t()(this,"_subscribers",[]),t()(this,"_strPath",void 0),this.store=v,this.descriptor=h,this.context=I,this._associated=I!==void 0,this._getter=h.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},h.options),this._id=this._options.id||(this._associated?Me(I==null?void 0:I.path):$e()),this._path=(I==null?void 0:I.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this._depends=Fe(this._path,this._options.depends),this._onInitial()}return y()(f,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(h){this._options.enable=h}},{key:"group",get:function(){return this._options.group},set:function(h){this._options.group=h}},{key:"initial",get:function(){return this._initial},set:function(h){this._initial=h}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(h){this._depends=h}},{key:"getter",get:function(){return this._getter},set:function(h){this._getter=h}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(Y)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?he(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(h){this._associated?Se(this.store.state,this._path,h):(this._value=h,this.store._notify({type:"set",path:this.path,value:h}))}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"update",value:function(h,I){var c=this;this.store.update(function(){c.value=h},I)}},{key:"silentUpdate",value:function(h){this.update(h,{silent:!0})}},{key:"watch",value:function(h,I){var c=this;return this.store.watch(this.getValueWatchPath(),function(x){h.call(c,x)},I)}},{key:"getValueWatchPath",value:function(){return this.path.join(Y)}},{key:"emitStoreEvent",value:function(h,I){var c=this;setTimeout(function(){c.store.emit(h,I)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(h){}},{key:"attach",value:function(){var h=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(h.toString()," subscribed to ").concat(h.depends.map(function(I){return I.join(Y)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(h){return h.off()}),this._attached=!1)}}]),f}(),Je=function(f){a()(h,f);var v=o()(h);function h(I,c,x){var B;return T()(this,h),B=v.call(this,I,c,x),B.store=I,B.descriptor=c,B.context=x,c.options.depends=Fe(B.path,B.options.depends),B}return y()(h,[{key:"toString",value:function(){return"ComputedObject<".concat(Me(this.path),">")}},{key:"isDisable",value:function(c){return!this.store.options.enableComputed||!this.enable&&c!==!0||c===!1}},{key:"run",value:function(c){throw new Error("Method not implemented.")}}]),h}(Ze),at=function(f){a()(h,f);var v=o()(h);function h(){return T()(this,h),v.apply(this,arguments)}return y()(h,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(c){var x=this,B=Object.assign({first:!1,changed:void 0},c),L=B.first,k=B.changed;if(!L&&this.isDisable(c==null?void 0:c.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!L&&this.store.log(function(){return"Run sync computed for : ".concat(x.toString())});var ee=c?Object.assign({},this.options,c):this.options,X=Ve(this,"computed",this.context,ee),ne=ee.initial;try{ne=this.getter.call(this,X,{changed:k,first:L}),L&&(this.initial=ne),this.store.peep(function(){x.value=ne}),!L&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:ne,computedObject:this})}catch(re){throw!L&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:re,computedObject:this}),re}}},{key:"collectDependencies",value:function(){var c=[],x=this.store.watch(function(B){c.push(B.path)},{operates:["get"]});this.run({first:!0}),x.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&c.push.apply(c,i()(Fe(this.path,this.options.depends))),this.depends=ze(c),this.attach()}},{key:"onDependsChange",value:function(c){this.run({changed:c})}}]),h}(Je);function Et(f,v,h,I,c){return h==="push"?function(){for(var x=v.length,B=arguments.length,L=new Array(B),k=0;k<B;k++)L[k]=arguments[k];var ee=I.apply(v,L);if(v.length>x){var X=Array.from({length:v.length-x},function(ne,re){return re+x});f({type:"insert",path:c,indexs:X,value:L,oldValue:void 0,parentPath:c,parent:v})}return ee}:h==="pop"?function(){var x=v.length,B=I.apply(v);return v.length==x-1&&f({type:"remove",path:c,indexs:[x-1],value:[B],oldValue:void 0,parentPath:c,parent:v}),B}:h==="splice"?function(x,B){for(var L=arguments.length,k=new Array(L>2?L-2:0),ee=2;ee<L;ee++)k[ee-2]=arguments[ee];var X=I.apply(v,[x,B].concat(k));if(X.length>0){var ne=Array.from({length:X.length},function(Ie,ce){return x+ce});f({type:"remove",path:c,indexs:ne,value:X,oldValue:void 0,parentPath:c,parent:v})}if(k.length>0){var re=Array.from({length:k.length},function(Ie,ce){return x+ce});f({type:"insert",path:c,indexs:re,value:k,oldValue:void 0,parentPath:c,parent:v})}return X}:h==="unshift"?function(){for(var x=v.length,B=arguments.length,L=new Array(B),k=0;k<B;k++)L[k]=arguments[k];var ee=I.apply(v,L);if(v.length>x){var X=Array.from({length:v.length-x},function(ne,re){return re});f({type:"insert",path:c,indexs:X,value:L,oldValue:void 0,parentPath:c,parent:v})}return ee}:h==="shift"?function(){var x=v.length,B=I.apply(v);return v.length==x-1&&f({type:"remove",path:c,indexs:[0],value:[B],oldValue:void 0,parentPath:c,parent:v}),B}:h==="fill"?function(x,B,L){var k=I.apply(v,[x,B,L]),ee=B!=null?B:0,X=L!=null?L:v.length,ne=Array.from({length:X-ee},function(Ie,ce){return ce+ee}),re=Array.from({length:X-ee},function(){return x});return f({type:"update",path:c,indexs:ne,value:re,oldValue:void 0,parentPath:c,parent:v}),k}:h==="concat"?function(){for(var x=v.length,B=arguments.length,L=new Array(B),k=0;k<B;k++)L[k]=arguments[k];var ee=I.apply(v,L),X=Array.from({length:L.length},function(ne,re){return x+re});return f({type:"insert",path:c,indexs:X,value:L,oldValue:void 0,parentPath:c,parent:v}),ee}:I}var He=Symbol("__NOTIFY__");function nt(f,v,h,I,c){if(ae(f)||N()(f)!=="object"||f===null)return f;if(h.has(f))return h.get(f);var x=new Proxy(f,{get:function(L,k,ee){var X=Reflect.get(L,k,ee);if(typeof k!="string")return X;var ne=[].concat(i()(v),[String(k)]);if(typeof X=="function"||!Object.hasOwn(L,k))if(typeof X=="function"){if(Array.isArray(L))return Et(c.notify,L,k,X,v);if(!ae(X)&&Object.hasOwn(L,k)){var re=ne.join(".");try{if(I.has(re)){var Ie=[].concat(i()(I.keys()),[re]);throw I.clear(),new U('The computed property "'.concat(re,'" has a circular dependency, steps: ').concat(Ie.join(" <- ")))}return I.set(re,!0),c.createComputedObject(ne,X,v,L)}finally{I.delete(re)}}else return X}else return X;return c.notify({type:"get",path:ne,indexs:[],value:X,oldValue:void 0,parentPath:v,parent:L}),nt(X,ne,h,I,c)},set:function(L,k,ee,X){var ne=Reflect.get(L,k,X),re=Reflect.set(L,k,ee,X);if(k===He)return!0;if(re&&k!==He&&ee!==ne)if(Array.isArray(L))c.notify({type:"update",path:v,indexs:[Number(k)],value:ee,oldValue:ne,parentPath:v,parent:L});else{var Ie=[].concat(i()(v),[String(k)]);c.notify({type:"set",path:Ie,indexs:[],value:ee,oldValue:ne,parentPath:v,parent:L})}return re},deleteProperty:function(L,k){var ee=L[k],X=[].concat(i()(v),[String(k)]),ne=Reflect.deleteProperty(L,k);return ne&&k!==He&&c.notify({type:"delete",path:X,indexs:[],value:ee,oldValue:void 0,parentPath:v,parent:L}),ne}});return h.set(f,x),x}function bt(f,v){var h=new Map,I=new WeakMap;return nt(f,[],I,h,v)}var Ct=e(28633),Xe=e.n(Ct),Ot=e(75396),St=e.n(Ot),Bt=e(21206);function Nt(f){return f instanceof Error?f:new Error(f)}var rt=function(f){a()(h,f);var v=o()(h);function h(){var I;T()(this,h);for(var c=arguments.length,x=new Array(c),B=0;B<c;B++)x[B]=arguments[B];return I=v.call.apply(v,[this].concat(x)),t()(d()(I),"_isComputedRunning",!1),t()(d()(I),"_defaultAbortController",null),t()(d()(I),"_userAbortController",void 0),I}return y()(h,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return b()(D()(h.prototype),"value",this)},set:function(c){St()(D()(h.prototype),"value",c,this,!0)}},{key:"onInitial",value:function(){var c=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(c.options.immediate===!0||c.options.immediate==="auto"&&c.options.initial===void 0)&&c.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var c=this;return Object.assign(t()(t()(t()(t()(t()(t()(t()(t()(t()({},oe,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",Ce(function(x){return c.store.computedObjects.run(c.id,Object.assign({},x))})),"cancel",Ce(function(){c.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(c){var x=this,B=this.strPath,L=Object.keys(c).length;if(this.associated)this.store.update(function(ee){qe(ee,x.path,c)},{batch:L>1?B:!1});else{Object.assign(this.value,c);var k=L>1;Object.entries(c).forEach(function(ee){var X=Xe()(ee,2),ne=X[0],re=X[1],Ie={type:"set",path:[x.strPath,ne],value:re,parent:x.value};k&&(Ie.reply=!0),x.store.operates.emit("".concat(x.strPath,".").concat(ne),Ie)}),k&&this.store.operates.emit(B,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var I=R()(u()().mark(function x(B){var L=this,k,ee,X,ne,re,Ie;return u()().wrap(function(me){for(;;)switch(me.prev=me.next){case 0:if(k=B!=null?B:{},ee=k.first,X=ee===void 0?!1:ee,!this.isDisable(B==null?void 0:B.enable)){me.next=4;break}return this.store.log(function(){return"Async computed <".concat(L.toString(),"> is disabled")},"warn"),me.abrupt("return");case 4:if(!X&&this.store.log(function(){return"Run async computed for : ".concat(L.toString())}),ne=B?Object.assign({},this.options,B):this.options,re=Ve(this,"computed",this.context,ne),Ie=ne.noReentry,!(Ie&&this._isComputedRunning)){me.next=12;break}return this.store.log(function(){return"Reentry async computed: ".concat(L.toString())},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),me.abrupt("return");case 12:return this._isComputedRunning=!0,me.prev=13,me.next=16,this.executeGetter(re,ne);case 16:return me.abrupt("return",me.sent);case 17:return me.prev=17,this._isComputedRunning=!1,me.finish(17);case 20:case"end":return me.stop()}},x,this,[[13,,17,20]])}));function c(x){return I.apply(this,arguments)}return c}()},{key:"createComputeProgressbar",value:function(c){var x=this,B=Object.assign({},c),L=B.max,k=L===void 0?100:L,ee=B.min,X=ee===void 0?0:ee,ne=B.value,re=ne===void 0?0:ne;return this.updateComputedValue({progress:re}),{value:function(ce){ce>k&&(ce=k),ce<X&&(ce=X),x.updateComputedValue({progress:ce})},end:function(){this.value(k)}}}},{key:"onDoneCallback",value:function(c,x,B,L,k,ee){typeof c.onDone=="function"&&c.onDone.call(this,{id:this.id,path:this.path,value:ee,error:x,abort:B,timeout:L,scope:k})}},{key:"getAbortController",value:function(c){if(c&&typeof c.abortController=="function"){var x=c.abortController();x&&x instanceof AbortController&&(this._userAbortController=x)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(c,x,B){var L=this,k=B.timeout,ee=Array.isArray(k)?k:[k,0],X=Xe()(ee,2),ne=X[0],re=ne===void 0?0:ne,Ie=X[1],ce=Ie===void 0?0:Ie,me,Pe;return re>0&&(x.timeout=ce>1?ce:re,Pe=setTimeout(function(){c.hasTimeout=!0,c.hasError=!0,c.error="TIMEOUT",typeof c.timeoutCallback=="function"&&c.timeoutCallback(),clearInterval(me),L.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},re),ce>1&&(me=setInterval(function(){L.updateComputedValue({timeout:ce--}),ce===0&&clearInterval(me)},re/(ce+1)))),{clear:function(){clearTimeout(Pe),clearInterval(me)},enable:re>0}}},{key:"executeGetter",value:function(){var I=R()(u()().mark(function x(B,L){var k,ee,X,ne,re,Ie,ce,me,Pe,fe,Ae,Re,ke,De,Be,je;return u()().wrap(function(Oe){for(;;)switch(Oe.prev=Oe.next){case 0:k=L.retry,ee=k===void 0?[0,0]:k,X=Array.isArray(ee)?ee:[Number(ee),0],ne=Xe()(X,2),re=ne[0],Ie=ne[1],me=this.getAbortController(L),Pe={onTimeout:function(Ke){return ce=Ke},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Ke){return Ke},cancel:me.abort,extras:L.extras,changed:L.changed,abortSignal:me.signal},fe={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:ce},me.signal.addEventListener("abort",function(){return fe.hasAbort=!0}),Ae={clear:function(){},enable:!1},ke=function(Ke){return Object.assign(fe,Ke)},De=0;case 9:if(!(De<re+1)){Oe.next=46;break}if(Be={},Oe.prev=11,je={loading:!0},fe.hasError&&(je.error=null),re>0&&(je.retry=De>0?re-De+1:0),De>0&&ke({error:null,hasError:!1,hasTimeout:!1}),Ae=this.setTimeoutControl(fe,je,L),this.updateComputedValue(je),!fe.hasAbort){Oe.next=20;break}throw new V;case 20:return Oe.next=22,this.getter.call(this,B,Pe);case 22:if(Re=Oe.sent,!fe.hasAbort){Oe.next=25;break}throw new V;case 25:fe.hasTimeout||(Be.value=Re,Ae.enable&&(Be.timeout=0)),Oe.next=33;break;case 28:Oe.prev=28,Oe.t0=Oe.catch(11),fe.hasError=!0,fe.error=Oe.t0,fe.hasTimeout||(Be.error=Nt(Oe.t0).message);case 33:return Oe.prev=33,Ae.clear(),De===re&&(fe.hasTimeout&&(Be.error=fe.error),re>0&&(Be.retry=0)),Be.loading=!1,this.updateComputedValue(Be),Oe.finish(33);case 39:if(!fe.hasError){Oe.next=43;break}if(!(re>0&&Ie>0&&De<re)){Oe.next=43;break}return Oe.next=43,(0,Bt.g)(Ie);case 43:De++,Oe.next=9;break;case 46:fe.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):fe.hasError||fe.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:fe.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:Re,computedObject:this}),this.onDoneCallback(L,fe.error,fe.hasAbort,fe.hasTimeout,B,Re);case 48:case"end":return Oe.stop()}},x,this,[[11,28,33,39]])}));function c(x,B){return I.apply(this,arguments)}return c}()},{key:"onDependsChange",value:function(c){var x=this;this.store.log(function(){return"AsyncComputed<".concat(x.id,"> is running by depends ").concat(c.type,"/").concat(c.path.join(".")," changed ")}),this.run({changed:c})}},{key:"getValueWatchPath",value:function(){var c=this.path.join(Y);return["".concat(c,".*"),c]}},{key:"getDepends",value:function(){var c=this,x=b()(D()(h.prototype),"getDepends",this).call(this);return x.map(function(B){if(B.length===0)return B;var L=g()(c.store.computedObjects.values()),k;try{for(L.s();!(k=L.n()).done;){var ee=k.value;if(Ee(ee.path,B)&&ee.async)return["".concat(B,".value")]}}catch(X){L.e(X)}finally{L.f()}return B})}}]),h}(Je);function ot(){var f=arguments[0],v=typeof arguments[1]=="function"?arguments[1]:function(){return!0},h=N()(arguments[1])==="object"?arguments[1]:arguments[2],I=Object.assign({depends:[],enable:!0,objectify:!0,filter:v},h),c=function(){return{type:"watch",getter:f,options:I}};return c[J]=!0,c}var ut=function(f){a()(h,f);var v=o()(h);function h(I){var c;return T()(this,h),c=v.call(this),t()(d()(c),"_watcher",{off:function(){}}),t()(d()(c),"_enable",!0),c.store=I,c}return y()(h,[{key:"enable",get:function(){return this._enable},set:function(c){this._enable=c}},{key:"set",value:function(c,x){return b()(D()(h.prototype),"size",this)==0&&this.createWacher(),b()(D()(h.prototype),"set",this).call(this,c,x)}},{key:"createWacher",value:function(){var c=this;this._watcher=this.store.watch("**",function(x){var B=x.path;if(c._enable){var L=he(c.store.state,B),k=g()(c.values()),ee;try{for(k.s();!(ee=k.n()).done;){var X=ee.value;X.isMatched(B,L)&&X.run(B,L)}}catch(ne){k.e(ne)}finally{k.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off(),this.createWacher()}},{key:"create",value:function(c,x,B){var L=ot(c,x,B),k=L();return this.store._createWatch(k)}},{key:"enableGroup",value:function(c){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,B=g()(this.values()),L;try{for(B.s();!(L=B.n()).done;){var k=L.value;k.options.group==c&&(k.options.enable=x)}}catch(ee){B.e(ee)}finally{B.f()}}}]),h}($()(Map)),lt=function(f){a()(h,f);var v=o()(h);function h(I,c,x){var B;if(T()(this,h),B=v.call(this,I,c,x),t()(d()(B),"_cache",void 0),B.store=I,B.context=x,typeof B.options.filter!="function")throw new Error("watch options.filter must be a function");return B}return y()(h,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(c,x){return ie(c,this.path)?!1:this.filter(c,x)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(c,x){if(!this.enable){this.store.options.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var B,L=(B=this.getter)===null||B===void 0?void 0:B.call(this,{path:c,value:x},this);this.value=L,this.emitStoreEvent("watch:done",{value:L,watchObject:this})}catch(k){this.emitStoreEvent("watch:error",{error:k,watchObject:this})}}}]),h}(Ze),dt=Y;function st(f,v){if(!v||v==="**")return!0;var h=f.split(dt),I=v.split(dt);if(h.length!==I.length)return!1;for(var c=0;c<I.length;c++)if(I[c]!=="*"&&I[c]!==h[c])return!1;return!0}var Qe=function(){function f(){T()(this,f),t()(this,"_listeners",new Map)}return y()(f,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var h=this,I=arguments[0],c=arguments[1],x=arguments[2],B=c;return I==="**"?this.addHandler("*",B,x):String(I).includes("*")?(B=function(k,ee){st(ee,I)&&c(k,ee)},this.addHandler("*",B,x)):this.addHandler(I,B,x),{off:function(){return h.off(I,B)}}}},{key:"addHandler",value:function(h,I,c){var x=this._listeners.get(h);x?c?x.unshift(I):x.push(I):this._listeners.set(h,[I])}},{key:"once",value:function(h,I){var c=this,x=function B(L,k){try{I(L,k)}finally{c.off(k,B)}};return this.on(h,x)}},{key:"off",value:function(h,I){String(h).includes("*")&&(h="*");var c=this._listeners.get(h);c&&(I?c.splice(c.indexOf(I)>>>0,1):this._listeners.set(h,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(h){return this.on("**",h)}},{key:"wait",value:function(){var h=this,I=N()(arguments[0]),c=I==="string"?arguments[0]:void 0,x=arguments[1]||0,B=I==="function"?I:void 0,L;return new Promise(function(k,ee){var X;c?X=h.once(c,function(ne){clearTimeout(L),k(ne)}):typeof B=="function"&&(X=h.onAny(function(ne,re){var Ie=B(re,ne);Ie!==!1&&(X.off(),clearTimeout(L),k(ne))})),x>0&&(L=setTimeout(function(){X.off(),ee(new Error("timeout"))},x))})}},{key:"emit",value:function(h,I){var c=this._listeners.get("*");c&&c.slice().map(function(x){x(I,h)}),c=this._listeners.get(h),c&&c.slice().map(function(x){x(I,h)})}}]),f}();function Pt(f){var v;return _e(f)?v=f():typeof f=="function"&&(v={type:"computed",getter:f,options:Object.assign({},w(),{async:ve(f)})}),v}var At=function(f){a()(h,f);var v=o()(h);function h(I,c){var x;return T()(this,h),x=v.call(this),t()(d()(x),"_data",void 0),t()(d()(x),"computedObjects",void 0),t()(d()(x),"watchObjects",void 0),t()(d()(x),"_operates",new Qe),t()(d()(x),"_options",void 0),t()(d()(x),"_silenting",!1),t()(d()(x),"_batching",!1),t()(d()(x),"_batchOperates",[]),t()(d()(x),"_peeping",!1),x._options=(0,gt.w)({id:$e(),debug:!1,lazy:!1,enableComputed:!0,log:_t},c),x.computedObjects=new tt(d()(x)),x.watchObjects=new ut(d()(x)),x.subscribeCallbacks(),x._data=bt(I,{notify:x._notify.bind(d()(x)),createComputedObject:x.createObserverObject.bind(d()(x))}),x._options.lazy||et(x._data),x._options.debug&&N()(globalThis.__AUTO_STORES__)=="object"&&globalThis.__AUTO_STORES__.add(d()(x)),x.getSnap=x.getSnap.bind(d()(x)),x.watch=x.watch.bind(d()(x)),x.update=x.update.bind(d()(x)),x.peep=x.peep.bind(d()(x)),x.silentUpdate=x.silentUpdate.bind(d()(x)),x.batchUpdate=x.batchUpdate.bind(d()(x)),x.collectDependencies=x.collectDependencies.bind(d()(x)),x.trace=x.trace.bind(d()(x)),x.installExtends(),x.emit("load",d()(x)),x}return y()(h,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(c,x){this._options.debug&&this.options.log(c,x)}},{key:"installExtends",value:function(){var c=this,x=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(x)&&x.forEach(function(B){return typeof B=="function"&&B(c)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(c){this._peeping&&c.type=="get"||(this._batching&&this._batchOperates.push(c),!this._silenting&&this.operates.emit(c.path.join(Y),c))}},{key:"watch",value:function(){var c=this,x=typeof arguments[0]=="function"||arguments[0]==="*",B=x?arguments[0]:arguments[1],L=function(Be,je){return function(We){if(Be!=="*"){if(Be==="write"){if(We.type==="get")return}else if(Be==="read"){if(We.type!=="get")return}else if(Array.isArray(Be)&&Be.length>0&&!Be.includes(We.type))return}typeof je=="function"&&!je(We)||B.call(c,We)}};if(x){var k=Object.assign({once:!1,operates:"write"},arguments[1]),ee=k.operates,X=k.filter,ne=L(ee,X);return this.operates.onAny(ne)}else{var re=arguments[0],Ie=Array.isArray(re)?re.map(function(De){return typeof De=="string"?De:De.join(Y)}):[re],ce=Object.assign({once:!1,operates:"write"},arguments[2]),me=ce.once,Pe=ce.operates,fe=ce.filter,Ae=me?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),Re=[],ke=L(Pe,fe);return Ie.forEach(function(De){Re.push(Ae.call(c,De,ke))}),{off:function(){return Re.forEach(function(Be){return Be.off()})}}}}},{key:"createObserverObject",value:function(c,x,B,L){var k=Pt(x),ee={path:c,value:x,parentPath:B,parent:L};if(k){if(k.type==="computed"){var X=this._createComputed(k,ee);return X==null?void 0:X.initial}else if(k.type==="watch"){var ne=this._createWatch(k,ee);return ne==null?void 0:ne.initial}}else return x}},{key:"_createComputed",value:function(c,x){var B;return c.options.async?B=new rt(this,c,x):B=new at(this,c,x),B&&(B.silentUpdate(B.initial),B.options.objectify&&this.computedObjects.set(B.id,B),this.emit("computed:created",B)),B}},{key:"_createWatch",value:function(c,x){var B=new lt(this,c,x);return c.options.objectify&&this.watchObjects.set(B.id,B),this.emit("watch:created",B),B}},{key:"silentUpdate",value:function(c){this.update(c,{silent:!0})}},{key:"batchUpdate",value:function(c){this.update(c,{batch:!0})}},{key:"update",value:function(c,x){var B=this,L=Object.assign({},x),k=L.batch,ee=k===void 0?!1:k,X=L.reply,ne=X===void 0?!0:X,re=L.silent,Ie=re===void 0?!1:re,ce=L.peep,me=ce===void 0?!1:ce;if(typeof c=="function"){Ie&&(this._silenting=!0),ee&&(this._batching=!0,this._silenting=!0),me&&(this._peeping=!0);try{var Pe=c(this.state);if(ee&&ue(Pe))throw new Error("Batch update method can't be async function")}finally{if(this._silenting=!1,this._batching=!1,this._peeping=!1,this._batchOperates.length>0){var fe=i()(this._batchOperates);this._batchOperates=[],ne&&fe.forEach(function(Re){Re.reply=!0,B._notify(Re)});try{var Ae=ee===!0?se:String(ee);this.operates.emit(Ae,{type:"batch",path:[Ae],value:fe})}finally{this._batchOperates=[]}}}}else throw new Error("update method must provide a function argument")}},{key:"peep",value:function(){var c=arguments,x=this,B=typeof arguments[0]=="function"?function(){return c[0](x.state)}:function(){return he(x.state,Array.isArray(c[0])?c[0]:c[0].split(Y))};this._peeping=!0;try{return B()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(c){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",B=[],L=this.watch(function(k){B.push(k.path)},{operates:x});try{c()}finally{L.off()}return ze(B)}},{key:"trace",value:function(c,x){var B=this,L;return{stop:function(){return L&&L.off()},start:function(){var k=R()(u()().mark(function X(ne){var re;return u()().wrap(function(ce){for(;;)switch(ce.prev=ce.next){case 0:return re=[],ce.abrupt("return",new Promise(function(me){L=B.watch(function(Pe){re.push(Pe),ne&&ne(Pe)&&(L.off(),me(re))},{operates:x}),Promise.resolve(c()).finally(function(){typeof ne!="function"&&(L.off(),me(re))})}));case 2:case"end":return ce.stop()}},X)}));function ee(X){return k.apply(this,arguments)}return ee}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(c){var x=Object.assign({reserveAsync:!0},c),B=x.reserveAsync,L=x.entry;return we(L?he(this._data,L):this._data,B)}}]),h}(Qe)},11933:function(te,m,e){"use strict";e.r(m);var W=e(86714),u=e.n(W),K={};for(var R in W)R!=="default"&&(K[R]=function(E){return W[E]}.bind(0,R));e.d(m,K)},86714:function(){},77283:function(te,m,e){"use strict";e.d(m,{o:function(){return K}});var W=e(80007),u=e(92379);function K(R,E){var i=(0,u.useRef)();return i.current||(i.current=new W.n(R,E)),i.current}},44970:function(te,m,e){"use strict";e.r(m),e.d(m,{ASYNC_COMPUTED_VALUE:function(){return i.eg},AbortError:function(){return i._L},AsyncComputedObject:function(){return i.WE},AutoStore:function(){return i.M1},AutoStoreError:function(){return i.CD},BATCH_UPDATE_EVENT:function(){return i.up},ComputedObject:function(){return i.Xr},ComputedObjects:function(){return i.BG},CyleDependError:function(){return i.e2},EventEmitter:function(){return i.vp},InvalidComputedArgumentsError:function(){return i.FM},InvalidDependsError:function(){return i.y1},InvalidScopeError:function(){return i.MI},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return i.Q6},OBSERVER_DESCRIPTOR_FLAG:function(){return i.kF},ObserverObject:function(){return i.Rn},ObserverScopeRef:function(){return i.fR},PATH_DELIMITER:function(){return i.f7},ReactAutoStore:function(){return W.n},SKIP_PROXY_FLAG:function(){return i.QI},SyncComputedObject:function(){return i.X3},TimeoutError:function(){return i.W5},WatchObject:function(){return i.RY},WatchObjects:function(){return i.LG},calcDependPaths:function(){return i.Rh},computed:function(){return i.Fl},createStore:function(){return W.M},defineExtend:function(){return i.Ws},delay:function(){return i.gw},forEachObject:function(){return i.b0},getComputedId:function(){return i.tl},getDepends:function(){return i.if},getId:function(){return i.zv},getMapVal:function(){return i.ux},getSnap:function(){return i.kM},getSnapshot:function(){return i.vM},getVal:function(){return i.Jy},isAbsolutePath:function(){return i.O5},isAsyncComputedValue:function(){return i.Jq},isEq:function(){return i.vo},isEventMatched:function(){return i.c6},isMap:function(){return i._N},isObserverDescriptor:function(){return i.iI},isObserverDescriptorBuilder:function(){return i.vb},isPathEq:function(){return i.PH},isPathMatched:function(){return i.J_},isPlainObject:function(){return i.PO},isPrimitive:function(){return i.pt},isPromise:function(){return i.tI},isProxy:function(){return i.RM},isRaw:function(){return i._R},joinValuePath:function(){return i.UQ},markRaw:function(){return i.Xl},noRepeat:function(){return i.DH},normalizeDeps:function(){return i.KZ},pathIsExists:function(){return i.Ql},pathStartsWith:function(){return i.ZW},setVal:function(){return i.Y6},updateObjectVal:function(){return i.EG},useStore:function(){return E.o},watch:function(){return i.YP}});var W=e(80007),u=e(11933),K={};for(var R in u)["default","ReactAutoStore","createStore"].indexOf(R)<0&&(K[R]=function(A){return u[A]}.bind(0,R));e.d(m,K);var E=e(77283),i=e(99640)},80007:function(te,m,e){"use strict";e.d(m,{n:function(){return oe},M:function(){return ve}});var W=e(6270),u=e.n(W),K=e(93949),R=e.n(K),E=e(28810),i=e.n(E),A=e(77701),N=e.n(A),n=e(28249),T=e.n(n),O=e(29861),y=e.n(O),s=e(99640),d=e(12027),l=e.n(d),a=e(24325),r=e.n(a),o=e(28633),p=e.n(o),t=e(92379);function _(G,w,q,le){if(!w)return G.state;var de;try{typeof w=="function"?de=w(G.state):Array.isArray(w)?de=(0,s.Jy)(G.state,w):de=(0,s.Jy)(G.state,w.split(s.f7)),q&&(0,s.Jq)(de)&&(de=de.value)}catch(ae){if(le)return le(ae)}return de}function g(G){return function(){var w=arguments,q=w.length>=1&&(Array.isArray(w[0])||typeof w[0]=="string"||typeof w[0]=="function")?w[0]:void 0,le=w.length===2&&typeof w[1]=="function"?w[1]:void 0,de=w.length===2&&(typeof q=="string"||Array.isArray(q))&&typeof w[1]=="boolean"?w[1]:!1,ae=(0,t.useState)(function(){return _(G,q,de!==!0)}),ie=p()(ae,2),ge=ie[0],Ee=ie[1],xe=G.useDeps(q,de===!0?"all":"value");(0,t.useEffect)(function(){var pe;return xe.length===0?pe=G.watch(function(){Ee(r()({},G.state))}):pe=G.watch(xe,function(){var ue=_(G,q);Ee((0,s.PO)(ue)?r()({},ue):Array.isArray(ue)?l()(ue):ue)}),function(){return pe.off()}},[xe]);var be=(0,t.useCallback)(function(pe){q?typeof q=="string"?G.update(function(ue){return(0,s.Y6)(ue,q.split(s.f7),pe)}):Array.isArray(q)?G.update(function(ue){return(0,s.Y6)(ue,q,pe)}):typeof q=="function"&&le&&G.update(function(ue){return le(pe,ue)}):typeof pe=="function"&&G.update(function(ue){return pe(ue)},{batch:!0})},[q]);return[ge,be]}}function S(G){return function(w){var q=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",le=(0,t.useState)(function(){return(0,s.if)(w,G,q)}),de=p()(le,1),ae=de[0];return ae}}var b=e(651);function P(G,w,q){var le=q.errorBoundary||G.options.signalErrorBoundary;return t.memo(function(){var de=G.useDeps(w),ae=(0,t.useState)(null),ie=p()(ae,2),ge=ie[0],Ee=ie[1],xe=(0,t.useState)(function(){return _(G,w,!0,Ee)}),be=p()(xe,2),pe=be[0],ue=be[1];return(0,t.useEffect)(function(){var _e=G.watch(de,function(){ue(_(G,w,!0,Ee))});return function(){return _e.off()}},[de]),(0,b.jsx)(b.Fragment,{children:ge?(0,b.jsx)(le,{error:ge}):String(pe)})},function(){return!0})}function D(G,w,q,le){var de=le.errorBoundary||G.options.signalErrorBoundary;return t.memo(function(){var ae=(0,t.useState)(null),ie=p()(ae,2),ge=ie[0],Ee=ie[1],xe=(0,t.useState)(function(){return _(G,q,!1,Ee)}),be=p()(xe,2),pe=be[0],ue=be[1],_e=(0,s.Jq)(pe),Ne=(0,t.useMemo)(function(){return _e?pe:{value:pe}},[pe]),ye=G.useDeps(q,"none");return(0,t.useEffect)(function(){var he=_e?"".concat(Array.isArray(q)?q.join(s.f7):q,".*"):ye,Ce=G.watch(he,function(Se){var Me=Se.path,$e=Se.value;ue(_e?r()(r()({},pe),{},y()({},Me[Me.length-1],$e)):_(G,q,!1,Ee))});return function(){return Ce.off()}},[ye]),(0,b.jsx)(b.Fragment,{children:ge?(0,b.jsx)(de,{error:ge}):w(Ne)})},function(){return!0})}function C(G,w,q,le){var de=le.errorBoundary||G.options.signalErrorBoundary;return t.memo(function(){var ae=(0,t.useState)(null),ie=p()(ae,2),ge=ie[0],Ee=ie[1],xe=(0,s.vb)(q)?q():q,be=(0,t.useState)(function(){try{if((0,s.iI)(xe)){if(xe.options.objectify=!1,xe.type==="computed")return G.computedObjects.create(xe);if(xe.type==="watch")return G.watchObjects.create(xe)}else{var Ce=(0,s.Fl)(xe),Se=Ce();return Se.options.objectify=!1,G.computedObjects.create(Se)}}catch(Me){return Ee(Me),null}}),pe=p()(be,1),ue=pe[0],_e=(0,t.useState)(function(){return ue?ue.async?ue.value:{value:ue.value}:{value:""}}),Ne=p()(_e,2),ye=Ne[0],he=Ne[1];return(0,t.useEffect)(function(){var Ce={off:function(){}};return ue&&(Ce=ue.watch(function(Se){if(!Se.reply)try{if(ue.type==="computed")if(ue.async){var Me=ue;((0,s.PH)(Se.path,Me.path)||(0,s.PH)(Se.path.slice(0,-1),Me.path))&&he(r()({},Me.value))}else he({value:ue.value});else ue.type==="watch"&&he({value:ue.value})}catch($e){Ee($e)}},{operates:"write"})),function(){return Ce.off()}},[xe]),(0,b.jsx)(b.Fragment,{children:ge?(0,b.jsx)(de,{error:ge}):w(ye)})},function(){return!0})}function $(G){return function(){var w=arguments,q=w.length>=1&&(typeof w[0]=="string"||typeof w[0]=="function")&&(!w[1]||(0,s.PO)(w[1]))?w[0]:void 0,le=w.length>=2&&typeof w[0]=="function"&&(typeof w[1]=="string"||Array.isArray(w[1])||typeof w[1]=="function")?w[0]:void 0,de=w.length>=2&&typeof w[1]=="function"?w[1]:void 0,ae=w.length>=2&&typeof w[0]=="function"&&(typeof w[1]=="string"||Array.isArray(w[1]))?w[1]:void 0,ie=Object.assign({},w.length>1&&(0,s.PO)(w[w.length-1])?w[w.length-1]:void 0),ge=q?P(G,q,ie):ae?D(G,le,ae,ie):de?C(G,le,de,ie):function(){return(0,b.jsx)(b.Fragment,{})};return(0,b.jsx)(ge,{})}}function j(G){var w=G;if(G){G.persist&&G.persist();var q=G.currentTarget;q&&G.type?q.tagName==="INPUT"&&q.type==="checkbox"?w=q.checked:w=q.value:G.nativeEvent&&G.target&&(w=G.target.value)}return w}function V(G){return function(){var w=arguments,q=w.length>=1&&typeof w[0]=="string"?w[0]:void 0;if(!q)throw new Error("Input bind must have at least one argument");var le={};return le.onChange=function(de){var ae=j(de);(0,s.Y6)(G.state,q.split(s.f7),ae)},le}}function z(G){return function(){var w=arguments,q=w.length>=1?Array.isArray(w[0])?w[0]:typeof w[0]=="string"?w[0].split(s.f7):void 0:void 0,le=w.length>=2&&typeof w[0]=="function"?w[0]:void 0,de=w.length>=2&&typeof w[1]=="function"?w[1]:void 0,ae=(0,t.useCallback)(function(ue,_e){return{value:_e,onChange:function(ye){var he=j(ye);ue?G.update(function(Ce){return(0,s.Y6)(Ce,Array.isArray(ue)?ue:ue.split(s.f7),he)}):de(he,G.state)}}},[]),ie=(0,t.useCallback)(function(ue,_e){var Ne={};return Object.entries(_e).forEach(function(ye){var he=p()(ye,2),Ce=he[0],Se=he[1];if((0,s.pt)(Se)){var Me=ue?[].concat(l()(ue),[Ce]):[Ce];Ne[Ce]=ae(Me,Se)}}),Ne},[]),ge=(0,t.useState)(function(){if(typeof le=="function")return ae(void 0,le(G.state));var ue=q?_(G,q,!0):G.state;if((0,s.PO)(ue))return ie(q,ue);if(typeof q=="string")return ae(q,ue);if(Array.isArray(q))return ae(q.join(s.f7),ue)}),Ee=p()(ge,2),xe=Ee[0],be=Ee[1],pe=G.useDeps(q||le);return(0,t.useEffect)(function(){var ue;if(pe.length===0||w.length===0)ue=G.watch(function(ye){var he=ye.path,Ce=ye.value;he.length===1&&(0,s.pt)(Ce)&&be(r()(r()({},xe),{},y()({},he[0],ae(he[0],Ce))))});else if(pe.length>0){var _e=q?_(G,q,!0):void 0,Ne=(0,s.PO)(_e);q&&Ne&&pe.length===1&&pe[0].push("*"),ue=G.watch(pe,function(ye){var he=ye.path,Ce=ye.value;if(typeof le=="function"){var Se=le(G.state);be(ae(void 0,Se))}else be(Ne?r()(r()({},xe),{},y()({},he[he.length-1],ae(he,Ce))):ae(he,Ce))})}return function(){return ue.off()}},[pe]),xe}}function U(G){var w=arguments;return function(){var q=w[0],le=w[1],de=w[2];(0,t.useEffect)(function(){var ae=G.watch(q,le,de);return function(){return ae.off()}},[])}}var H=e(34180),M=e.n(H),F=Symbol("FAKE_BINDINGS");function Z(G,w){var q={};return w instanceof Map?w.forEach(function(le,de){q[de]=F}):Object.entries(w).forEach(function(le){var de=p()(le,1),ae=de[0];q[ae]=F}),q}function J(G,w,q){return{value:q,onChange:function(de){var ae=j(de);G.update(function(ie){return(0,s.Y6)(ie,w,ae)})}}}function Q(G,w,q,le,de){if(M()(G)!=="object"||G===null)return G;var ae=w.length===0?"__ROOT__":w.join(".");if(q.has(ae))return q.get(ae);var ie=G;(Array.isArray(G)||(0,s.PO)(G))&&(ie=Z(le,G));var ge=new Proxy(ie,{get:function(xe,be,pe){if(typeof be!="string")return Reflect.get(xe,be,pe);var ue=[].concat(l()(de),l()(w),[String(be)]),_e=(0,s.Jy)(le.state,ue);return(0,s.pt)(_e)?J(le,ue,_e):(0,s.Jq)(_e)?J(le,[].concat(l()(ue),["value"]),_e):Q(_e,ue,q,le,de)}});return q.set(ae,ge),ge}function Y(G,w){var q=new Map;return Q({},[],q,G,w)}function se(G){return function(){var w=arguments,q=w.length>0?typeof w[0]=="string"?w[0].split(s.f7):Array.isArray(w[0])?w[0]:[]:[],le=(0,t.useState)(function(){return G.getSnap({entry:q})}),de=p()(le,2),ae=de[0],ie=de[1],ge=(0,t.useState)(function(){return Y(G,q)}),Ee=p()(ge,1),xe=Ee[0];return(0,t.useSyncExternalStore)(function(be){var pe=G.watch(function(ue){var _e=ue.path,Ne=ue.value;if((0,s.ZW)(q,_e)){var ye=_e.slice(q.length);(0,s.Y6)(ae,ye,Ne),(0,s.Y6)(xe,[].concat(l()(ye),["value"]),Ne),ie(r()({},ae)),be()}});return function(){pe.off()}},function(){return ae}),xe}}var oe=function(G){N()(q,G);var w=T()(q);function q(le,de){var ae;return R()(this,q),ae=w.call(this,le,Object.assign({signalErrorBoundary:function(){return(0,b.jsx)(b.Fragment,{children:"ERROR"})}},de)),y()(i()(ae),"useState",void 0),y()(i()(ae),"useAsyncState",void 0),y()(i()(ae),"useDeps",void 0),y()(i()(ae),"$",void 0),y()(i()(ae),"signal",void 0),y()(i()(ae),"bind",void 0),y()(i()(ae),"useInput",void 0),y()(i()(ae),"useWatch",void 0),y()(i()(ae),"useFormBindings",void 0),ae.signal=ae.$=$(i()(ae)).bind(i()(ae)),ae.useState=g(i()(ae)).bind(i()(ae)),ae.useAsyncState=function(ie){return ae.useState(ie,!0)[0]},ae.useDeps=S(i()(ae)).bind(i()(ae)),ae.useInput=z(i()(ae)).bind(i()(ae)),ae.bind=V(i()(ae)).bind(i()(ae)),ae.useWatch=U(i()(ae)).bind(i()(ae)),ae.useFormBindings=se(i()(ae)).bind(i()(ae)),ae}return u()(q)}(s.M1);function ve(G,w){return new oe(G,w)}},60358:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(77643);const u=[]},19962:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(61668);const u=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},63611:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(28627);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
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
`,paraId:18,tocIndex:3},{value:"\u66F4\u591A\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:19,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:20,tocIndex:3},{value:"\u3002",paraId:19,tocIndex:3}]},58524:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(46267);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
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
`,paraId:58,tocIndex:16}]},77614:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(25231);const u=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
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

`,paraId:15,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:16,tocIndex:4},{value:"\uFF1A",paraId:16,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:17,tocIndex:4},{value:"./",paraId:17,tocIndex:4},{value:"\u3001",paraId:17,tocIndex:4},{value:"./",paraId:17,tocIndex:4},{value:"\u3001",paraId:17,tocIndex:4},{value:"PARENT",paraId:17,tocIndex:4},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:17,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:17,tocIndex:4},{value:"associated=true",paraId:17,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:17,tocIndex:4},{value:"obj.value",paraId:17,tocIndex:4},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:17,tocIndex:4},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:18,tocIndex:4},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:19,tocIndex:4},{value:"\u4F7F\u7528",paraId:20},{value:"computed(<getter>,<depends>,<options>)",paraId:20},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:20},{value:"getter",paraId:21},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:21},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:22},{value:"depends",paraId:21},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:21},{value:"\u4F9D\u8D56",paraId:23},{value:"options",paraId:21},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:21},{value:"\u9009\u9879",paraId:24}]},68258:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(83717);const u=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
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
`,paraId:25,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:26,tocIndex:5},{value:"./price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"./count",paraId:26,tocIndex:5},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:26,tocIndex:5},{value:"price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"count",paraId:26,tocIndex:5},{value:"\u5C5E\u6027\u3002",paraId:26,tocIndex:5},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:26,tocIndex:5},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:26,tocIndex:5}]},94957:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(76938);const u=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},15467:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(87480);const u=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"store.computedObjects",paraId:0,tocIndex:0},{value:"\u6765\u7BA1\u7406",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A",paraId:1,tocIndex:0},{value:"Map",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u662F\u4E00\u4E2A\u7C7B\uFF0C\u67E5\u770BAPI\u6587\u6863\u53EF\u4EE5\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\u3002",paraId:3}]},33989:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(15968);const u=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u652F\u6301",paraId:0,tocIndex:0},{value:"ComputedOptions",paraId:0,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u53C2\u6570\u6765\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`// \u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
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
`,paraId:48,tocIndex:14},{value:"\u7C7B\u578B",paraId:49,tocIndex:15},{value:"\uFF1A",paraId:49,tocIndex:15},{value:"(error:Error)=>void",paraId:49,tocIndex:15},{value:"\u5F53\u6267\u884C\u8BA1\u7B97",paraId:50,tocIndex:15},{value:"getter",paraId:50,tocIndex:15},{value:"\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03",paraId:50,tocIndex:15},{value:"\u7C7B\u578B",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:"(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void",paraId:51,tocIndex:16},{value:"\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u5B8C\u6210\u65F6\u7684\u56DE\u8C03",paraId:52,tocIndex:16}]},51289:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(49613);const u=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:0,tocIndex:0},{value:"\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:1,tocIndex:0},{value:"ComputedObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:0},{value:"ComputedObject",paraId:2,tocIndex:0},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:2,tocIndex:0},{value:"store.computedObjects",paraId:2,tocIndex:0},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:2,tocIndex:0},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"store.computedObjects.get(<id>).run()",paraId:3,tocIndex:1},{value:"\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:`import { createStore,computed } from '@autostorejs/react';
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
    changed?: StateOperate       // \u53D8\u5316\u7684\u4F9D\u8D56\u4FE1\u606F
} 
`,paraId:8,tocIndex:2},{value:"\u5F53\u624B\u52A8\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u65F6\uFF0C\u5141\u8BB8\u4F20\u5165",paraId:9,tocIndex:2},{value:"RuntimeComputedOptions",paraId:9,tocIndex:2},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u8986\u76D6\u9ED8\u8BA4\u7684\u8BA1\u7B97\u53C2\u6570\u3002",paraId:9,tocIndex:2},{value:"first",paraId:9,tocIndex:2},{value:"\u53C2\u6570\u7528\u6765\u6807\u8BC6\u662F\u5426\u4E3A\u7B2C\u4E00\u6B21\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002\u4E00\u822C\u624B\u5DE5\u8FD0\u884C\u65F6\u4E0D\u8981\u6307\u5B9A",paraId:9,tocIndex:2},{value:"changed",paraId:9,tocIndex:2},{value:"\u53C2\u6570\u7528\u6765\u6307\u5B9A\u53D8\u5316\u7684\u4F9D\u8D56\u4FE1\u606F\uFF0C\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u503C\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u4F20\u5165\u6B64\u53C2\u6570\uFF0C\u6B64\u53C2\u6570\u5305\u542B\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u4FE1\u606F\u3002\u800C\u5F53\u624B\u5DE5\u6267\u884C\u65F6\uFF0C\u4E0D\u9700\u8981\u6307\u5B9A\u6B64\u53C2\u6570\u3002",paraId:9,tocIndex:2},{value:"ComputedOptions",paraId:9,tocIndex:2},{value:"\u7684\u914D\u7F6E\u53C2\u6570\u53EF\u4EE5\u53C2\u8003",paraId:9,tocIndex:2},{value:"\u8BA1\u7B97\u53C2\u6570",paraId:10,tocIndex:2},{value:"\u3002",paraId:9,tocIndex:2},{value:"ComputedObjects",paraId:11,tocIndex:3},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:`\u65B9\u6CD5\uFF0C\u7528\u6765\u6267\u884C\u5206\u7EC4\u8BA1\u7B97\u3002
\u5F53\u4F7F\u7528`,paraId:11,tocIndex:3},{value:"computed",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"group",paraId:11,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:11,tocIndex:3},{value:"computed",paraId:12,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"enable",paraId:12,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:12,tocIndex:4},{value:"enable=false",paraId:12,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:12,tocIndex:4},{value:"enable=true",paraId:12,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:13,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:14,tocIndex:4},{value:"enable",paraId:14,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:14,tocIndex:4}]},48248:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(87975);const u=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
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
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},92205:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(48120);const u=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
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
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},35603:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(93359);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0}]},80870:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(76233);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useFormBindings",paraId:2,tocIndex:0}]},94226:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(97820);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},63653:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(36339);const u=[{value:"useFormBindings",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u7EC8\u6781\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u7ED1\u5B9A\u5728\u4E00\u8D77\uFF0C\u4EE3\u7801\u66F4\u52A0\u7B80\u6D01\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useFormBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useFormBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1},{value:"\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:2,tocIndex:2},{value:"useFormBindings",paraId:2,tocIndex:2},{value:"\u6765\u6536\u96C6\u8868\u5355\u6570\u636E\uFF0C\u901A\u8FC7",paraId:2,tocIndex:2},{value:"ref",paraId:2,tocIndex:2},{value:"\u5C5E\u6027\u7ED1\u5B9A\u5230",paraId:2,tocIndex:2},{value:"form",paraId:2,tocIndex:2},{value:"\u5143\u7D20\u4E0A\uFF0C\u7136\u540E\u901A\u8FC7",paraId:2,tocIndex:2},{value:"bindings.ref",paraId:2,tocIndex:2},{value:"\u6765\u83B7\u53D6",paraId:2,tocIndex:2},{value:"form",paraId:2,tocIndex:2},{value:"\u5143\u7D20\u7684\u5F15\u7528\u3002",paraId:2,tocIndex:2},{value:"useFormBindings",paraId:3,tocIndex:2},{value:"\u4F1A\u4FA6\u542C\u8868\u5355\u7684",paraId:3,tocIndex:2},{value:"change",paraId:3,tocIndex:2},{value:"\u4E8B\u4EF6\uFF0C\u7136\u540E\u81EA\u52A8\u540C\u6B65\u8868\u5355\u6570\u636E\u5230\u72B6\u6001\u4E2D\u3002",paraId:3,tocIndex:2},{value:`import { useStore } from '@autostorejs/react';
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

`,paraId:4,tocIndex:2}]},13927:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(45889);const u=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useInput",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useInput(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useInput",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
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
`,paraId:6}]},86231:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(9159);const u=[]},26021:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(61077);const u=[]},27067:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(47315);const u=[]},72997:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(26916);const u=[{value:`npm install  @autostorejs/react
`,paraId:0},{value:`yarn add @autostorejs/react
`,paraId:1},{value:`pnpm add @autostorejs/react
`,paraId:2}]},42516:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(3694);const u=[]},679:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(4180);const u=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
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
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},86761:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(75690);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},47864:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(8767);const u=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},57143:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(63518);const u=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
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
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},82919:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(35371);const u=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},89615:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(33358);const u=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},56126:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(23841);const u=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
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
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},32465:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(81897);const u=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF08\u57FA\u4E8E",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u5C01\u88C5\uFF09\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},80814:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(94451);const u=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},60726:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(61786);const u=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},37445:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(34450);const u=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
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
`,paraId:14,tocIndex:2}]},1451:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(89073);const u=[{value:"watch",paraId:0},{value:"\u51FD\u6570\u4E0E",paraId:0},{value:"computed",paraId:0},{value:"\u51FD\u6570\u529F\u80FD\u7684\u533A\u522B\u5982\u4E0B\uFF1A",paraId:0},{value:"computed",paraId:1},{value:"\u51FD\u6570\u662F\u7528\u6765\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u7684\uFF0C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u662F\u7528\u6765\u4FA6\u542C",paraId:1},{value:"State",paraId:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u7684\u3002",paraId:1},{value:"computed",paraId:1},{value:"\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:1},{value:"State",paraId:1},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\uFF0C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:1},{value:"computed",paraId:1},{value:"\u51FD\u6570\u7684\u521B\u5EFA\u7684\u8BA1\u7B97\u5C5E\u6027\u662F\u57FA\u4E8E\u4F9D\u8D56\u6536\u96C6\u7684\uFF0C\u800C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u662F\u57FA\u4E8E\u4FA6\u542C\u7684,\u6BCF\u5F53",paraId:1},{value:"State",paraId:1},{value:"\u72B6\u6001\u53D8\u5316\u65F6\u5747\u4F1A\u8C03\u7528",paraId:1},{value:"watchOptions.on",paraId:1},{value:"\u8FC7\u6EE4\u51FD\u6570\u6765\u5339\u914D\u4FA6\u542C\u51FD\u6570\uFF0C\u56E0\u6B64\u7406\u8BBA\u4E0A\uFF0C",paraId:1},{value:"computed",paraId:1},{value:"\u51FD\u6570\u7684\u6027\u80FD\u66F4\u597D\uFF0C\u800C",paraId:1},{value:"watch",paraId:1},{value:"\u51FD\u6570\u6027\u80FD\u4F1A\u5DEE\u4E9B\u3002",paraId:1},{value:"watch",paraId:1},{value:"\u53EA\u80FD\u662F\u540C\u6B65\u4FA6\u542C\u51FD\u6570\uFF0C\u800C",paraId:1},{value:"computed",paraId:1},{value:"\u53EF\u4EE5\u662F\u5F02\u6B65\u51FD\u6570\u3002",paraId:1}]},65365:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(26826);const u=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6BCF\u4E00\u4E2A\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u5305\u88C5\u7684\u8BA1\u7B97\u51FD\u6570\u5747\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:`export interface WatchObject extends WatchOptions>{ 
    path:string[]
    run:(fromPath:string[])=>void
    listener:(...args:any[])=>any
}
`,paraId:2,tocIndex:0},{value:"\u6240\u6709\u521B\u5EFA\u7684",paraId:3,tocIndex:0},{value:"WatchObject",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:3,tocIndex:0},{value:"Store.watchObjects",paraId:3,tocIndex:0},{value:` class WatchObjects extends Map{
    enable:boolean
    reset(){}
    enableGroup(groupName:string,value:boolean=true){}
 }

`,paraId:4,tocIndex:0}]},39668:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(56081);const u=[{value:"\u5927\u90E8\u4EFD\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u5E94\u8BE5\u4F7F\u7528",paraId:0},{value:"computed",paraId:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\uFF0C\u800C\u4E0D\u662F\u4F7F\u7528",paraId:0},{value:"watch",paraId:0},{value:"\u51FD\u6570\u6765\u4FA6\u542C",paraId:0},{value:"State",paraId:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002\u4F46\u662F\u5728\u4E00\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u53EF\u80FD\u9700\u8981\u4F7F\u7528",paraId:0},{value:"watch",paraId:0},{value:"\u51FD\u6570\uFF0C\u4E3B\u8981\u5728\u4E8E\uFF1A",paraId:0},{value:"\u52A8\u6001\u4F9D\u8D56",paraId:1},{value:"computed",paraId:2},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u4E00\u822C\u662F\u786E\u5B9A\u7684\uFF0C\u800C",paraId:2},{value:"watch",paraId:2},{value:"\u51FD\u6570\u7684\u4F9D\u8D56\u662F\u52A8\u6001\u7684\u3002\u8FD9\u6BD4\u8F83\u9002\u5408\u4E00\u4E9B\u9700\u8981\u52A8\u6001\u4FA6\u542C\u7684\u573A\u666F\uFF0C\u6BD4\u5982\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u52A8\u6001\u4FA6\u542C",paraId:2},{value:"orders[].count",paraId:2},{value:"\u7684\u53D8\u5316\u6765\u8BA1\u7B97",paraId:2},{value:"total",paraId:2},{value:"\u3002\u800C",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\uFF0C\u4E00\u65E6\u58F0\u660E\u5C31\u4E0D\u4F1A\u53D8\u5316\u3002",paraId:2},{value:"\u591A\u5B57\u6BB5\u590D\u5408\u8BA1\u7B97",paraId:3},{value:"\u5F53\u67D0\u4E2A\u5B57\u6BB5\u9700\u8981\u8FDB\u884C\u590D\u5408\u8BA1\u7B97\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528",paraId:4},{value:"watch",paraId:4},{value:"\u51FD\u6570\u6765\u5B9E\u73B0\u3002\u6BD4\u5982\u5728",paraId:4},{value:"SpeedForm",paraId:4},{value:"\u5B9E\u73B0\u8868\u5355\u7684",paraId:4},{value:"validate",paraId:4},{value:"\u548C",paraId:4},{value:"dirty",paraId:4},{value:"\u5C5E\u6027\u7684\u8BA1\u7B97\u65F6\uFF0C\u5C31\u662F\u4F7F\u7528",paraId:4},{value:"watch",paraId:4},{value:"\u5B9E\u73B0\u3002",paraId:4},{value:"\u6BD4\u5982\u8FD9\u662F\u8868\u5355",paraId:5},{value:"validate",paraId:5},{value:"\u68C0\u6D4B\u7684\u5B9E\u73B0\u4EE3\u7801\uFF1A",paraId:5},{value:`export function validate<T=any>(options?:ValidateOptions){
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
`,paraId:8},{value:"value",paraId:9},{value:"\uFF1A\u53D8\u5316\u7684\u503C",paraId:9},{value:"fromPath",paraId:10},{value:"\uFF1A\u6307\u7684\u662F\u54EA\u91CC\u53D1\u751F\u53D8\u5316\u7684\u8DEF\u5F84",paraId:10},{value:"getCache",paraId:11},{value:"\uFF1A\u7528\u6765\u83B7\u53D6\u5F53\u524D",paraId:11},{value:"watch",paraId:11},{value:"\u7684",paraId:11},{value:"cache",paraId:11},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4FDD\u5B58\u6821\u9A8C\u503C\u3002",paraId:11},{value:"\u5728",paraId:12},{value:"cache",paraId:12},{value:"\u91CC\u9762\u6211\u4EEC\u4FDD\u5B58\u4ECE\u6821\u9A8C\u8303\u56F4\u5185\u6240\u6709",paraId:12},{value:"value=false",paraId:12},{value:"\uFF0C\u5982\u679C",paraId:12},{value:"Object.keys(selfCache).length==0",paraId:12},{value:"\u5C31\u4EE3\u8868\u5728\u8BE5\u6821\u9A8C\u8303\u56F4\u5185\u6240\u6709\u5B57\u6BB5\u5747\u6709\u6548\u3002",paraId:12}]},68414:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(42380);const u=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u529F\u80FD\uFF0C\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:1,tocIndex:0},{value:"watch",paraId:1,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:1,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:2,tocIndex:0},{value:"State",paraId:2,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:2,tocIndex:0},{value:"store.watch",paraId:2,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:2,tocIndex:0},{value:"State",paraId:2,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:2,tocIndex:0},{value:"store.useWatch",paraId:2,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:2,tocIndex:0},{value:"store",paraId:2,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:2,tocIndex:0},{value:"@autostorejs/react",paraId:3,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:3,tocIndex:1},{value:"watch",paraId:3,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:3,tocIndex:1},{value:"state",paraId:3,tocIndex:1},{value:"\u58F0\u660E\u6765\u4FA6\u542C",paraId:3,tocIndex:1},{value:"State",paraId:3,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:1},{value:"watch",paraId:4,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:"watch",paraId:5,tocIndex:1},{value:"\u53EF\u4EE5\u7528\u6765\u4FA6\u542C\u6574\u4E2A",paraId:5,tocIndex:1},{value:"store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u53D8\u5316\uFF0C\u5F53\u4FA6\u542C\u5230\u53D8\u5316\u65F6\u4F1A\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:5,tocIndex:1},{value:"\u4FA6\u542C\u5668\u51FD\u6570\u53EA\u80FD\u662F\u4E00\u4E2A\u540C\u6B65\u51FD\u6570\u3002",paraId:5,tocIndex:1},{value:"\u4FA6\u542C\u5668\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4F1A\u5199\u5165",paraId:5,tocIndex:1},{value:"watch",paraId:5,tocIndex:1},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:5,tocIndex:1},{value:"watch",paraId:6,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`function watch<Value = any,Result=Value>(
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
`,paraId:20,tocIndex:4},{value:"\u5728\u8FDB\u884C\u8868\u5355\u9A8C\u8BC1\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528",paraId:21,tocIndex:4},{value:"formState.validate",paraId:21,tocIndex:4},{value:"\u6765\u83B7\u53D6\u6574\u4E2A\u8868\u5355\u7684\u9A8C\u8BC1\u7ED3\u679C\u3002",paraId:21,tocIndex:4},{value:"\u9664\u4E86\u53EF\u4EE5\u5728",paraId:22,tocIndex:5},{value:"State",paraId:22,tocIndex:5},{value:"\u4E2D\u58F0\u660E",paraId:22,tocIndex:5},{value:"watch",paraId:22,tocIndex:5},{value:"\u51FD\u6570\u5916\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u5728",paraId:22,tocIndex:5},{value:"Store",paraId:22,tocIndex:5},{value:"\u5BF9\u8C61\u4E2D\u58F0\u660E",paraId:22,tocIndex:5},{value:"watch",paraId:22,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:22,tocIndex:5},{value:"State",paraId:22,tocIndex:5},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:22,tocIndex:5},{value:"\u5728\u7EC4\u4EF6\u5185\u4FA6\u542C\u53EF\u4EE5\u4F7F\u7528",paraId:23,tocIndex:6},{value:"store.useWatch",paraId:23,tocIndex:6},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:23,tocIndex:6},{value:"store",paraId:23,tocIndex:6},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:23,tocIndex:6}]},36109:function(te,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return u}});var W=e(43112);const u=[]}}]);
