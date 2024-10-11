(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[1904],{1801:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(77643),w={}},44887:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return d}});var T=e(24325),u=e.n(T),w=e(29008),j=e.n(w),y=e(28633),i=e.n(y),P=e(70958),k=e.n(P),n=e(92379),A=e(61668),C=e(44970),E=e(37487),s=e(20927),d={"docs-exmaples-get-repos-demo-0":{component:n.memo(n.lazy(k()(j()().mark(function l(){var a,r,o,c,t,m,x,B,b,O,M,S,L,R,F;return j()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=$.sent,r=a.computed,o=a.createStore,$.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return c=$.sent,t=c.Input,m=c.Box,x=c.Button,$.next=13,Promise.resolve().then(e.bind(e,20927));case 13:return B=$.sent,b=B.api,O=o({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:r(function(){var ee=k()(j()().mark(function J(Q,ae){var H,N,z;return j()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return H=i()(Q,1),N=H[0],z=ae.abortSignal,re.next=4,new Promise(function(ce,le){z.addEventListener("abort",function(){le("cancelled")}),b.getProjects(N).then(function(fe){ce(fe)}).catch(function(fe){le(fe)})});case 4:case"end":return re.stop()}},J)}));return function(J,Q){return ee.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),M=O.state,S=O.bind,L=O.$,R=O.useState,F=O.useAsyncState,$.abrupt("return",{default:function(){var J=R("user.repo"),Q=i()(J,1),ae=Q[0],H=F("user.projects");return n.createElement("div",null,n.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),n.createElement(t,u()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:ae},S("user.repo"))),n.createElement(x,{onClick:function(){return M.user.projects.run()}},"\u91CD\u8BD5"),n.createElement(x,{onClick:function(){return M.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),n.createElement(m,null,n.createElement("table",{className:"projects-list"},n.createElement("thead",null,n.createElement("tr",null,n.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),n.createElement("td",null,n.createElement("b",null,"\u8BF4\u660E")),n.createElement("td",null,n.createElement("b",null,"\u661F")))),n.createElement("tbody",null,H.loading?n.createElement("tr",null,n.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):H.error?n.createElement("tr",null,n.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",H.error)):H.value&&H.value.map(function(N,z){return n.createElement("tr",{key:z},n.createElement("td",null,n.createElement("a",{href:N.url,target:"__blank"},N.name)),n.createElement("td",null,N.description),n.createElement("td",null,N.stars))})))))}});case 17:case"end":return $.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E,"autostore-docs":s},renderOpts:{compile:function(){var l=k()(j()().mark(function r(){var o,c=arguments;return j()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,e.e(9039).then(e.bind(e,39039));case 2:return m.abrupt("return",(o=m.sent).default.apply(o,c));case 3:case"end":return m.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}}}},16960:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(28627),w={}},87524:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return s}});var T=e(24325),u=e.n(T),w=e(28633),j=e.n(w),y=e(29008),i=e.n(y),P=e(70958),k=e.n(P),n=e(92379),A=e(46267),C=e(44970),E=e(37487),s={"docs-guide-computed-async-demo-0":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M;return i()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.delay,r=l.createStore,o=l.computed,L.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return c=L.sent,t=c.Input,m=c.ColorBlock,x=r({user:{firstName:"Zhang",lastName:"Fisher",fullName:o(function(){var R=k()(i()().mark(function F(G){return i()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return ee.next=2,a(1e3);case 2:return ee.abrupt("return",G.firstName+" "+G.lastName);case 3:case"end":return ee.stop()}},F)}));return function(F){return R.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),B=x.useAsyncState,b=x.useState,O=x.state,M=x.bind,L.abrupt("return",{default:function(){var F=b("user.firstName"),G=j()(F,1),$=G[0],ee=b("user.lastName"),J=j()(ee,1),Q=J[0],ae=B("user.fullName");return n.createElement(n.Fragment,null,n.createElement(t,u()({label:"firstName",value:$},M("user.firstName"))),n.createElement(t,u()({label:"lastName",value:Q},M("user.lastName"))),n.createElement(m,{name:"FullName",loading:ae.loading},ae.value))}});case 13:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-1":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x;return i()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=b.sent,a=l.useStore,r=l.computed,o=l.delay,b.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return c=b.sent,t=c.ColorBlock,m=c.Button,x=c.JsonView,b.abrupt("return",{default:function(){var M=a({firstName:"Zhang",lastName:"Fisher",fullName:r(function(){var G=k()(i()().mark(function $(ee){return i()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,o();case 2:if(!ee.triggerError){Q.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return Q.abrupt("return",ee.firstName+" "+ee.lastName);case 5:case"end":return Q.stop()}},$)}));return function($){return G.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),S=M.state,L=M.$,R=M.useAsyncState,F=R("fullName");return n.createElement("div",null,n.createElement(t,{name:"FirstName"},L("firstName")),n.createElement(t,{name:"FirstName"},L("lastName")),n.createElement(t,{name:"FullName",loading:F.loading},F.loading?"\u6B63\u5728\u8BA1\u7B97...":F.error?"ERROR:".concat(F.error):F.value),n.createElement("div",null,n.createElement(m,{onClick:function(){S.triggerError=!1,S.firstName=S.firstName+"\u{1F525}"}},"Change FirstName"),n.createElement(m,{onClick:function(){S.triggerError=!1,S.lastName=S.lastName+"\u2764\uFE0F"}},"Change LastName")),n.createElement("div",null,n.createElement(m,{onClick:function(){S.firstName=S.firstName+"\u{1F525}"}},"Change FirstName with Error"),n.createElement(m,{onClick:function(){S.triggerError=!0,S.lastName=S.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),n.createElement("div",null,"state.fullName=",n.createElement(x,null,JSON.stringify(F))))}});case 13:case"end":return b.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-2":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M,S,L,R,F;return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.delay,r=l.createStore,o=l.computed,c=l.ObserverScopeRef,$.next=9,Promise.resolve().then(e.bind(e,37487));case 9:return t=$.sent,m=t.JsonView,x=t.Button,B=t.Input,b=t.Loading,O=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:o(function(){var ee=k()(i()().mark(function J(Q,ae){var H,N,z,ue,re;return i()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return H=j()(Q,2),N=H[0],z=H[1],ue=ae.getProgressbar,re=ue(),le.abrupt("return",new Promise(function(){var fe=k()(i()().mark(function V(U){var Z;return i()().wrap(function(se){for(;;)switch(se.prev=se.next){case 0:Z=1;case 1:if(!(Z<=100)){se.next=8;break}return se.next=4,a(20);case 4:re.value(Z);case 5:Z++,se.next=1;break;case 8:re.end(),U(N*z);case 10:case"end":return se.stop()}},V)}));return function(V){return fe.apply(this,arguments)}}()));case 4:case"end":return le.stop()}},J)}));return function(J,Q){return ee.apply(this,arguments)}}(),["order.count","order.price"],{scope:c.Depends})}}),M=O.useState,S=O.state,L=O.$,R=O.bind,F=O.useAsyncState,$.abrupt("return",{default:function(){var J=M("order.count"),Q=j()(J,1),ae=Q[0],H=F("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,S.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,S.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return S.order.count--}},"-"),n.createElement(B,u()({value:ae},R("order.count"))),n.createElement(x,{onClick:function(){return S.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",null,H.loading?n.createElement(b,null):null,H.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(H.progress,"%"):H.error?"ERROR:".concat(H.error):H.value)))),n.createElement("div",null,n.createElement(m,null,JSON.stringify(S.order.total))))}});case 16:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-3":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M,S,L,R,F,G;return i()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return ee.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=ee.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,c=l.delay,ee.next=9,Promise.resolve().then(e.bind(e,37487));case 9:return t=ee.sent,m=t.Input,x=t.Button,B=t.Loading,b=t.JsonView,O=t.RichLabel,M=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var J=k()(i()().mark(function Q(ae){var H,N,z;return i()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return H=j()(ae,2),N=H[0],z=H[1],re.next=3,c(5e3);case 3:return re.abrupt("return",N*z);case 4:case"end":return re.stop()}},Q)}));return function(Q){return J.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:o.Depends})}}),S=M.useState,L=M.state,R=M.$,F=M.bind,G=M.useAsyncState,ee.abrupt("return",{default:function(){var Q=S("order.count"),ae=j()(Q,1),H=ae[0],N=G("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,L.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,L.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return L.order.count--}},"-"),n.createElement(m,u()({value:H},F("order.count"))),n.createElement(x,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",null,N.loading?n.createElement(B,null):null,N.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(N.timeout,"ms"):N.error?n.createElement(O,{text:"ERROR: {".concat(N.error,"}"),color:"red"}):null)))),n.createElement("div",null,n.createElement(b,null,JSON.stringify(L.order.total))))}});case 17:case"end":return ee.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-4":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M,S,L,R,F,G;return i()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return ee.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=ee.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,c=l.delay,ee.next=9,Promise.resolve().then(e.bind(e,37487));case 9:return t=ee.sent,m=t.Input,x=t.Button,B=t.Loading,b=t.JsonView,O=t.RichLabel,M=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var J=k()(i()().mark(function Q(ae){var H,N,z;return i()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return H=j()(ae,2),N=H[0],z=H[1],re.next=3,c(6e3);case 3:return re.abrupt("return",N*z);case 4:case"end":return re.stop()}},Q)}));return function(Q){return J.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:o.Depends})}}),S=M.useState,L=M.state,R=M.$,F=M.bind,G=M.useAsyncState,ee.abrupt("return",{default:function(){var Q=S("order.count"),ae=j()(Q,1),H=ae[0],N=G("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,L.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,L.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return L.order.count--}},"-"),n.createElement(m,u()({value:H},F("order.count"))),n.createElement(x,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},N.loading?n.createElement(B,null):null,N.loading?n.createElement(O,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(N.timeout,"}\u79D2"),color:"red"}):N.error?n.createElement(O,{text:"ERROR: {".concat(N.error,"}"),color:"red"}):null)))),n.createElement("div",null,n.createElement(b,null,JSON.stringify(L.order.total))))}});case 17:case"end":return ee.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-5":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M,S,L,R,F,G;return i()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return ee.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=ee.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,c=l.delay,ee.next=9,Promise.resolve().then(e.bind(e,37487));case 9:return t=ee.sent,m=t.Input,x=t.Button,B=t.Loading,b=t.JsonView,O=t.RichLabel,M=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var J=k()(i()().mark(function Q(ae){var H,N,z;return i()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return H=j()(ae,2),N=H[0],z=H[1],re.next=3,c();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return re.stop()}},Q)}));return function(Q){return J.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:o.Depends})}}),S=M.useState,L=M.state,R=M.$,F=M.bind,G=M.useAsyncState,ee.abrupt("return",{default:function(){var Q=S("order.count"),ae=j()(Q,1),H=ae[0],N=G("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,L.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,L.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return L.order.count--}},"-"),n.createElement(m,u()({value:H},F("order.count"))),n.createElement(x,{onClick:function(){return L.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},N.loading?n.createElement(B,null):null,N.loading?n.createElement(O,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):N.error&&n.createElement(O,{text:"\u51FA\u9519: {".concat(N.error,"}"),color:"red"}),N.retry>0&&n.createElement(O,{text:"\u91CD\u8BD5: {".concat(N.retry,"}"),color:"red"}))))),n.createElement("div",null,n.createElement(b,null,JSON.stringify(L.order.total))))}});case 17:case"end":return ee.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-6":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M,S,L,R,F;return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.createStore,r=l.computed,o=l.ObserverScopeRef,$.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return c=$.sent,t=c.Input,m=c.Button,x=c.Loading,B=c.JsonView,b=c.RichLabel,O=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var ee=k()(i()().mark(function J(Q,ae){var H,N,z,ue;return i()().wrap(function(ce){for(;;)switch(ce.prev=ce.next){case 0:return H=j()(Q,2),N=H[0],z=H[1],ue=ae.abortSignal,ce.abrupt("return",new Promise(function(le,fe){var V=setTimeout(function(){le(N*z)},1e6);ue.addEventListener("abort",function(){clearTimeout(V),fe("cancelled")})}));case 3:case"end":return ce.stop()}},J)}));return function(J,Q){return ee.apply(this,arguments)}}(),["order.count","order.price"],{scope:o.Depends})}}),M=O.useState,S=O.state,L=O.$,R=O.bind,F=O.useAsyncState,$.abrupt("return",{default:function(){var J=M("order.count"),Q=j()(J,1),ae=Q[0],H=F("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,S.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,S.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(m,{onClick:function(){return S.order.count--}},"-"),n.createElement(t,u()({value:ae},R("order.count"))),n.createElement(m,{onClick:function(){return S.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},H.loading?n.createElement(x,null):null,H.loading?n.createElement(b,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):H.error&&n.createElement(b,{text:"\u51FA\u9519: {".concat(H.error,"}"),color:"red"}),H.loading&&n.createElement(m,{onClick:function(){return H.cancel()}},"\u53D6\u6D88"))))),n.createElement("div",null,n.createElement(B,null,JSON.stringify(S.order.total))))}});case 16:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-7":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x;return i()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=b.sent,a=l.createStore,b.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return r=b.sent,o=r.ColorBlock,c=r.Button,t=a({bookName:"ZhangFisher",price:100,count:3,total:function(){var O=k()(i()().mark(function S(L){return i()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.abrupt("return",L.price*L.count);case 1:case"end":return F.stop()}},S)}));function M(S){return O.apply(this,arguments)}return M}()}),m=t.state,x=t.$,b.abrupt("return",{default:function(){return n.createElement("div",null,n.createElement(o,{name:"\u4E66\u540D"},x("bookName")),n.createElement(o,{name:"\u4EF7\u683C"},x("price")),n.createElement(o,{name:"\u6570\u91CF"},n.createElement(c,{onClick:function(){return m.count--}},"-"),x("count"),n.createElement(c,{onClick:function(){return m.count++}},"+")),n.createElement(o,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},x("total.value",{errorBoundary:function(S){var L=S.error;return n.createElement(n.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",L.message)}})),n.createElement(o,{name:"state.total"},String(m.total)))}});case 11:case"end":return b.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},60409:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return C}});var T=e(29008),u=e.n(T),w=e(28633),j=e.n(w),y=e(70958),i=e.n(y),P=e(92379),k=e(25231),n=e(44970),A=e(37487),C={"docs-guide-computed-create-demo-0":{component:P.memo(P.lazy(i()(u()().mark(function E(){var s,d,l,a,r,o,c;return u()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=m.sent,d=s.createStore,l=s.computed,m.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return a=m.sent,r=a.ColorBlock,o=a.Button,c=d({order:{price:100,count:3,total1:function(B){return B.price*B.count},total2:l(function(x){return x.price*x.count})}}),m.abrupt("return",{default:function(){var B=c.useState(),b=j()(B,2),O=b[0],M=b[1];return P.createElement("div",null,P.createElement(r,{name:"Price"},O.order.price),P.createElement(r,{name:"Count"},O.order.count),P.createElement(r,{name:"Total 1"},O.order.total1),P.createElement(r,{name:"Total 2"},O.order.total2),P.createElement(o,{onClick:function(){return M(function(L){return L.order.count++})}},"Count++"))}});case 12:case"end":return m.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}}}},71252:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(83717),w={}},87755:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(76938),P=e(44970),k=e(37487),n={"docs-guide-computed-getter-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o,c,t,m;return u()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=B.sent,E=C.createStore,s=C.computed,d=C.delay,B.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return l=B.sent,a=l.ColorBlock,r=l.Button,o=E({order:{price:100,count:3,total:s(function(){var b=j()(u()().mark(function O(M){return u()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,d(1e3);case 2:return L.abrupt("return",M.price*M.count);case 3:case"end":return L.stop()}},O)}));return function(O){return b.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),c=o.state,t=o.$,m=o.computedObjects,B.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",m.get("total")),y.createElement("div",null,y.createElement(a,{name:"price"},t("order.price")),y.createElement(a,{name:"count"},t("order.count")),y.createElement(a,{name:"Total"},t(function(O){var M=O.value,S=O.loading;return y.createElement("div",null,S?"\u8BA1\u7B97\u4E2D...":M+1e3)},"order.total")),y.createElement(r,{onClick:function(){return c.order.count++}},"Count++"),y.createElement(r,{onClick:function(){return m.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return B.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},18731:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return l}});var T=e(12027),u=e.n(T),w=e(34180),j=e.n(w),y=e(28633),i=e.n(y),P=e(29008),k=e.n(P),n=e(70958),A=e.n(n),C=e(92379),E=e(87480),s=e(44970),d=e(37487),l={"docs-guide-computed-objects-demo-0":{component:C.memo(C.lazy(A()(k()().mark(function a(){var r,o,c,t,m,x,B,b,O;return k()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return r=S.sent,o=r.createStore,c=r.computed,S.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return t=S.sent,m=t.Divider,x=t.ColorBlock,B=t.Button,b=0,O=o({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(R){return R.firstName+R.lastName+"".concat(++b)},fullName2:c(function(){var L=A()(k()().mark(function R(F){return k()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",F.firstName+F.lastName+"".concat(++b));case 1:case"end":return $.stop()}},R)}));return function(R){return L.apply(this,arguments)}}(),["./firstName","./lastName"])}}),S.abrupt("return",{default:function(){var R=O.useState(),F=i()(R,1),G=F[0];return C.createElement("div",null,C.createElement(x,{name:"FirstName"},G.user.firstName),C.createElement(x,{name:"lastName"},G.user.lastName),C.createElement(x,{name:"FullName",value:G.user.fullName}),C.createElement(x,{name:"FullName2",value:G.user.fullName2.value}),C.createElement(m,null),C.createElement("div",null,"typeof(store.computedObjects)==",j()(O.computedObjects)),C.createElement("div",null,"store.computedObjects instanceof Map=",String(O.computedObjects instanceof Map)),C.createElement("div",null,"store.computedObjects.size=",O.computedObjects.size),C.createElement("div",null,"store.computedObjects.size=",O.computedObjects.size),C.createElement("div",null,"store.computedObjects.keys()=",u()(O.computedObjects.keys()).join(" , ")),C.createElement(B,{onClick:function(){return O.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),C.createElement(B,{onClick:function(){return O.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),C.createElement(B,{onClick:function(){return O.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return S.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":s,"x-react-components":d},renderOpts:{compile:function(){var a=A()(k()().mark(function o(){var c,t=arguments;return k()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(9039).then(e.bind(e,39039));case 2:return x.abrupt("return",(c=x.sent).default.apply(c,t));case 3:case"end":return x.stop()}},o)}));function r(){return a.apply(this,arguments)}return r}()}}}},87336:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(15968),w={}},58217:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return s}});var T=e(24325),u=e.n(T),w=e(28633),j=e.n(w),y=e(29008),i=e.n(y),P=e(70958),k=e.n(P),n=e(92379),A=e(49613),C=e(44970),E=e(37487),s={"docs-guide-computed-run-demo-0":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O;return i()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=S.sent,a=l.createStore,r=l.computed,o=l.delay,S.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return c=S.sent,t=c.Divider,m=c.ColorBlock,x=c.Button,B=0,b={book:{name:"Zhang",count:4,price:100,total1:r(function(){var L=k()(i()().mark(function R(F){return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,o();case 2:return $.abrupt("return",F.count*F.price);case 3:case"end":return $.stop()}},R)}));return function(R){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:r(function(){var L=k()(i()().mark(function R(F){return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,o();case 2:return $.abrupt("return",F.count*F.price);case 3:case"end":return $.stop()}},R)}));return function(R){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:r(function(){var L=k()(i()().mark(function R(F){return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,o();case 2:return $.abrupt("return",F.count*F.price);case 3:case"end":return $.stop()}},R)}));return function(R){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:r(function(){var L=k()(i()().mark(function R(F){return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,o();case 2:return $.abrupt("return",F.price/F.count);case 3:case"end":return $.stop()}},R)}));return function(R){return L.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:r(function(){var L=k()(i()().mark(function R(F){return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,o();case 2:return $.abrupt("return",F.price/F.count);case 3:case"end":return $.stop()}},R)}));return function(R){return L.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:r(function(){var L=k()(i()().mark(function R(F){return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,o();case 2:return $.abrupt("return",F.price/F.count);case 3:case"end":return $.stop()}},R)}));return function(R){return L.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},O=a(b),S.abrupt("return",{default:function(){var R=O.useState(),F=j()(R,1),G=F[0];return n.createElement("div",null,n.createElement(t,{title:"Total Group"}),n.createElement(m,{name:"Total1",loading:G.book.total1.loading},G.book.total1.loading?"\u8BA1\u7B97\u4E2D...":G.book.total1.value),n.createElement(m,{name:"Total2",loading:G.book.total2.loading},G.book.total2.loading?"\u8BA1\u7B97\u4E2D...":G.book.total2.value),n.createElement(m,{name:"Total3",loading:G.book.total3.loading},G.book.total3.loading?"\u8BA1\u7B97\u4E2D...":G.book.total3.value),n.createElement(x,{onClick:function(){return O.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),n.createElement(t,{title:"Average Group"}),n.createElement(m,{name:"Average1",loading:G.book.average1.loading}," ",G.book.average1.loading?"\u8BA1\u7B97\u4E2D...":G.book.average1.value),n.createElement(m,{name:"Average2",loading:G.book.average2.loading}," ",G.book.average2.loading?"\u8BA1\u7B97\u4E2D...":G.book.average2.value),n.createElement(m,{name:"Average3",loading:G.book.average3.loading}," ",G.book.average3.loading?"\u8BA1\u7B97\u4E2D...":G.book.average3.value),n.createElement(x,{onClick:function(){return O.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return S.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-run-demo-1":{component:n.memo(n.lazy(k()(i()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M,S,L,R;return i()().wrap(function(G){for(;;)switch(G.prev=G.next){case 0:return G.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=G.sent,a=l.createStore,r=l.computed,o=l.delay,G.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return c=G.sent,t=c.Divider,m=c.ColorBlock,x=c.Button,B=c.Input,b=0,O={book:{name:"Zhang",count:4,price:100,total1:r(function(){var $=k()(i()().mark(function ee(J){return i()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return ae.next=2,o();case 2:return ae.abrupt("return",J.count*J.price);case 3:case"end":return ae.stop()}},ee)}));return function(ee){return $.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:r(function(){var $=k()(i()().mark(function ee(J){return i()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return ae.next=2,o();case 2:return ae.abrupt("return",J.count*J.price);case 3:case"end":return ae.stop()}},ee)}));return function(ee){return $.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:r(function(){var $=k()(i()().mark(function ee(J){return i()().wrap(function(ae){for(;;)switch(ae.prev=ae.next){case 0:return ae.next=2,o();case 2:return ae.abrupt("return",J.count*J.price);case 3:case"end":return ae.stop()}},ee)}));return function(ee){return $.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},M=a(O),S=M.useState,L=M.computedObjects,R=M.bind,G.abrupt("return",{default:function(){var ee=S(),J=j()(ee,1),Q=J[0];return n.createElement("div",null,n.createElement(m,{name:"BookName"},Q.book.name),n.createElement(m,{name:"count"},n.createElement("div",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return Q.book.count--}},"-"),n.createElement(B,u()({value:Q.book.count},R("book.count"))),n.createElement(x,{onClick:function(){return Q.book.count++}},"+"))),n.createElement(m,{name:"price"}," ",n.createElement(B,u()({value:Q.book.price},R("book.price")))),n.createElement(t,{title:"Total Group"}),n.createElement("table",{className:"table table-bordered"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,"Total1 ="),n.createElement("td",null,Q.book.total1.loading?"\u8BA1\u7B97\u4E2D...":Q.book.total1.value),n.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),n.createElement("tr",null,n.createElement("td",null,"Total2 ="),n.createElement("td",null,Q.book.total2.loading?"\u8BA1\u7B97\u4E2D...":Q.book.total2.value),n.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",n.createElement("input",{type:"checkbox",checked:L.get("book/total2")}),")")),n.createElement("tr",null,n.createElement("td",null,"Total3 ="),n.createElement("td",null,Q.book.total3.loading?"\u8BA1\u7B97\u4E2D...":Q.book.total3.value),n.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),n.createElement(x,{onClick:function(){return L.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return G.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(i()().mark(function a(){var r,o=arguments;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},87237:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(87975),P=e(44970),k=e(37487),n={"docs-guide-computed-scope-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,E=C.ObserverScopeRef,s=C.useStore,r.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var c=s({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(x){return x.firstName+x.lastName}}},{scope:function(){return E.Current}}),t=c.state;return y.createElement("div",null,y.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-1":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,E=C.useStore,s=C.ObserverScopeRef,r.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var c=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(x){return x.user.firstName+x.user.lastName}}},{scope:s.Root}),t=c.state;return y.createElement("div",null,y.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-2":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r;return u()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=c.sent,E=C.createStore,s=C.ObserverScopeRef,c.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return d=c.sent,l=d.ColorBlock,a=E({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(m){return m.user.firstName+m.user.lastName}}}},{scope:s.Parent}),r=a.state,c.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(l,{name:"FullName"},r.parent.user.fullName))}});case 11:case"end":return c.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-3":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,E=C.createStore,o.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=o.sent,d=s.ColorBlock,l=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),a=l.state,o.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return o.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-4":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,E=C.createStore,o.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=o.sent,d=s.ColorBlock,l=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),a=l.state,o.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return o.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-computed-scope-demo-5":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,E=C.createStore,s=C.computed,d=C.ObserverScopeRef,t.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return l=t.sent,a=l.ColorBlock,r=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:s(function(){var m=j()(u()().mark(function x(B){return u()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.abrupt("return",B[0]+B[1]);case 1:case"end":return O.stop()}},x)}));return function(x){return m.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:d.Depends})}}),o=r.state,t.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(a,{name:"FullName"},o.user.fullName.value))}});case 12:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},46369:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return C}});var T=e(29008),u=e.n(T),w=e(28633),j=e.n(w),y=e(70958),i=e.n(y),P=e(92379),k=e(48120),n=e(44970),A=e(37487),C={"docs-guide-computed-sync-demo-0":{component:P.memo(P.lazy(i()(u()().mark(function E(){var s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=t.sent,d=s.createStore,t.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return l=t.sent,a=l.ColorBlock,r=l.Button,o=d({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(x){return x.firstName+x.lastName}}}),t.abrupt("return",{default:function(){var x=o.useState(),B=j()(x,2),b=B[0],O=B[1];return P.createElement("div",null,P.createElement(a,{name:"First Name"},b.user.firstName),P.createElement(a,{name:"Last Name"},b.user.lastName),P.createElement(a,{name:"Full Name"},b.user.fullName),P.createElement(r,{onClick:function(){return O(function(S){return S.user.firstName="\u2764\uFE0F"+S.user.firstName})}},"Change First Name"),P.createElement(r,{onClick:function(){return O(function(S){return S.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return t.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}},"docs-guide-computed-sync-demo-1":{component:P.memo(P.lazy(i()(u()().mark(function E(){var s,d,l,a,r;return u()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=c.sent,d=s.createStore,c.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return l=c.sent,a=l.Button,r=d({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(m){return m.price*m.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(m){return m.price*m.count}}],total:function(m){return m.books.reduce(function(x,B){return x+B.total},0)}}),c.abrupt("return",{default:function(){var m=r.useState(),x=j()(m,2),B=x[0],b=x[1];return P.createElement("table",{className:"table table-bordered table-hover"},P.createElement("thead",null,P.createElement("tr",null,P.createElement("th",null,"\u4E66\u540D"),P.createElement("th",null,"\u4F5C\u8005"),P.createElement("th",null,"\u5355\u4EF7"),P.createElement("th",null,"\u6570\u91CF"),P.createElement("th",null,"\u5C0F\u8BA1"))),P.createElement("tbody",null,B.books.map(function(O,M){return P.createElement("tr",{key:M},P.createElement("td",null,O.name),P.createElement("td",null,O.author),P.createElement("td",null,O.price),P.createElement("td",null,P.createElement(a,{onClick:function(){return r.state.books[M].count--}},"-"),O.count,P.createElement(a,{onClick:function(){return r.state.books[M].count++}},"+")),P.createElement("td",null,O.total))}),P.createElement("tr",null,P.createElement("td",{colSpan:4},"\u603B\u8BA1"),P.createElement("td",null,B.total))))}});case 10:case"end":return c.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}}}},21037:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return C}});var T=e(28633),u=e.n(T),w=e(29008),j=e.n(w),y=e(70958),i=e.n(y),P=e(92379),k=e(93359),n=e(44970),A=e(37487),C={"docs-guide-debug-dev-tools-demo-0":{component:P.memo(P.lazy(i()(j()().mark(function E(){var s,d,l,a,r,o,c,t,m,x;return j()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=b.sent,d=s.createStore,l=s.computed,b.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return a=b.sent,r=a.Button,o=a.ColorBlock,c=d({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(M){return M.firstName+M.lastName},salary:l(function(){var O=i()(j()().mark(function M(S){return j()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",S.age*10);case 1:case"end":return R.stop()}},M)}));return function(M){return O.apply(this,arguments)}}(),["age"])},{debug:!0,id:"user"}),t=c.state,m=c.useState,x=c.$,b.abrupt("return",{default:function(){var M=m("age"),S=u()(M,2),L=S[0],R=S[1],F=m("salary"),G=u()(F,2),$=G[0],ee=G[1],J=m(function(N){return N.lastName},function(N,z){return z.lastName=N}),Q=u()(J,2),ae=Q[0],H=Q[1];return P.createElement("div",null,P.createElement(o,null,"Fullname :",t.firstName," ",ae),P.createElement(o,null,"Age :",L),P.createElement(o,null,"Salary: ",x("salary")),P.createElement(r,{onClick:function(){return R(L+1)}},"Age++"),P.createElement(r,{onClick:function(){return H(ae+".")}},"Change lastName"))}});case 12:case"end":return b.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-debug-dev-tools-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(j()().mark(function d(){var l,a=arguments;return j()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}}}},13933:function(q,I,e){"use strict";var T;e.r(I),e.d(I,{demos:function(){return A}});var u=e(29008),w=e.n(u),j=e(70958),y=e.n(j),i=e(92379),P=e(42246),k=e(44970),n=e(37487),A={"docs-guide-debug-trace-demo-0":{component:i.memo(i.lazy(y()(w()().mark(function C(){var E,s,d,l,a,r,o,c,t,m;return w()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return E=B.sent,s=E.createStore,B.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return d=B.sent,l=d.Box,B.next=10,Promise.resolve().then(e.t.bind(e,92379,19));case 10:return a=B.sent,r=a.useRef,o=a.useEffect,c=s({a:1,b:2,c:function(O){return O.a+O.b}}),t=c.state,m=c.trace,B.abrupt("return",{default:function(){var O=r();return o(function(){var M=m(function(){t.a=10,t.b=20});M.start().then(function(S){S.forEach(function(L){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(L.type," ").concat(L.path.join("."),"</p>"))})})},[]),i.createElement(l,{ref:O})}});case 15:case"end":return B.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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

  return <Box ref={ref}> 
  </Box>
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":k,"x-react-components":n,react:T||(T=e.t(i,2))},renderOpts:{compile:function(){var C=y()(w()().mark(function s(){var d,l=arguments;return w()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(d=r.sent).default.apply(d,l));case 3:case"end":return r.stop()}},s)}));function E(){return C.apply(this,arguments)}return E}()}}}},31996:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(76233),w={}},15274:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return s}});var T=e(29008),u=e.n(T),w=e(24325),j=e.n(w),y=e(28633),i=e.n(y),P=e(70958),k=e.n(P),n=e(92379),A=e(97820),C=e(44970),E=e(37487),s={"docs-guide-form-bind-demo-0":{component:n.memo(n.lazy(k()(u()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O;return u()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=S.sent,a=l.createStore,S.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return r=S.sent,o=r.ColorBlock,c=r.Button,t=r.Input,m=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(R){return R.firstName+R.lastName}}}),x=m.state,B=m.$,b=m.bind,O=m.useState,S.abrupt("return",{default:function(){var R=O("user.firstName"),F=i()(R,2),G=F[0],$=F[1],ee=O("user.lastName"),J=i()(ee,2),Q=J[0],ae=J[1],H=O("user.vip"),N=i()(H,2),z=N[0],ue=N[1];return n.createElement("div",null,n.createElement(t,j()(j()({label:"First Name"},b("user.firstName")),{},{value:G})),n.createElement(t,j()(j()({label:"last Name"},b("user.lastName")),{},{value:Q})),n.createElement(t,j()(j()({type:"checkbox",label:"VIP"},b("user.vip")),{},{value:z})),n.createElement(o,{name:"First Name"},B("user.firstName")),n.createElement(o,{name:"Last Name"},B("user.lastName")),n.createElement(o,{name:"Full Name"},B("user.fullName")),n.createElement(o,{name:"VIP"},B("user.vip")),n.createElement(c,{onClick:function(){$("Zhang"),ae("Fisher")}},"Reset"))}});case 12:case"end":return S.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(u()().mark(function a(){var r,o=arguments;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},55106:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return C}});var T=e(29008),u=e.n(T),w=e(24325),j=e.n(w),y=e(70958),i=e.n(y),P=e(92379),k=e(12357),n=e(44970),A=e(37487),C={"docs-guide-form-use-bindings-demo-0":{component:P.memo(P.lazy(i()(u()().mark(function E(){var s,d,l,a,r,o,c;return u()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=m.sent,d=s.useStore,m.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return l=m.sent,a=l.Layout,r=l.ColorBlock,o=l.Button,c=l.Input,m.abrupt("return",{default:function(){var B=d({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),b=B.state,O=B.$,M=B.useBindings,S=M();return P.createElement(a,null,P.createElement("div",null,P.createElement(c,j()({label:"First Name"},S.user.firstName)),P.createElement(c,j()({label:"last Name"},S.user.lastName)),P.createElement(c,j()({label:"Age"},S.user.age)),P.createElement(c,j()({type:"checkbox",label:"VIP"},S.user.vip)),P.createElement(o,{onClick:function(){b.user.firstName="Zhang",b.user.lastName="Fisher",b.user.age=18,b.user.vip=!1}},"Reset")),P.createElement("div",null,P.createElement(r,{name:"First Name"},O("user.firstName")),P.createElement(r,{name:"Last Name"},O("user.lastName")),P.createElement(r,{name:"Age"},O("user.age")),P.createElement(r,{name:"VIP"},O("user.vip"))))}});case 12:case"end":return m.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}}}},4493:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return C}});var T=e(29008),u=e.n(T),w=e(28633),j=e.n(w),y=e(70958),i=e.n(y),P=e(92379),k=e(79247),n=e(44970),A=e(37487),C={"docs-guide-form-use-form-demo-0":{component:P.memo(P.lazy(i()(u()().mark(function E(){var s,d,l,a,r,o,c,t,m;return u()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=B.sent,d=s.useStore,B.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return l=B.sent,a=l.Layout,r=l.Button,o=l.Input,c=l.CheckBox,t=l.JsonView,m=l.Select,B.abrupt("return",{default:function(){var O=d({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),M=O.state,S=O.$,L=O.useForm,R=O.useState,F=R(),G=j()(F,1),$=G[0],ee=L();return P.createElement(a,null,P.createElement("div",null,P.createElement("form",ee,P.createElement(o,{name:"user.firstName",label:"First Name"}),P.createElement(o,{name:"user.lastName",label:"lastName"}),P.createElement(o,{name:"user.age",label:"Age"}),P.createElement(m,{name:"job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),P.createElement("textarea",{name:"user.resume"}),P.createElement(c,{name:"user.vip",label:"VIP"})),P.createElement(r,{onClick:function(){M.user.firstName="Zhang",M.user.lastName="Fisher",M.user.age=18,M.user.vip=!1}},"Reset")),P.createElement("div",null,P.createElement(t,{data:$})))}});case 14:case"end":return B.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
import { Layout,ColorBlock,Button,Input,Box,CheckBox,JsonView,Select } from "x-react-components"
 
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

  const userform = useForm()

  return <Layout>
      <div>    
        <form {...userform}>
          <Input name="user.firstName" label="First Name"/>
          <Input name="user.lastName" label="lastName"/>
          <Input name="user.age" label="Age"/>
          <Select name="job" label="Job" items={[
              { title:"Engineer", value:1 },
              { title:"Doctor", value:2 },
              { title:"Teacher", value:3 }
          ]}/>
          <textarea name="user.resume"/>
          <CheckBox name="user.vip" label="VIP"/>
        </form>
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}}}},72433:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return s}});var T=e(28633),u=e.n(T),w=e(29008),j=e.n(w),y=e(24325),i=e.n(y),P=e(70958),k=e.n(P),n=e(92379),A=e(45889),C=e(44970),E=e(37487),s={"docs-guide-form-use-input-demo-0":{component:n.memo(n.lazy(k()(j()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M;return j()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.createStore,L.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return r=L.sent,o=r.ColorBlock,c=r.Button,t=r.Input,m=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),x=m.state,B=m.$,b=m.bind,O=m.useState,M=m.useInput,L.abrupt("return",{default:function(){var F=M("user.firstName"),G=M("user.lastName"),$=M("user.vip"),ee=M("user.job");return n.createElement("div",null,n.createElement(t,i()({label:"First Name"},F)),n.createElement(t,i()({label:"last Name"},G)),n.createElement(t,i()({type:"checkbox",label:"VIP"},$)),n.createElement(o,{name:"Job"},n.createElement("select",i()({id:"job"},ee),n.createElement("option",{value:"1"},"Engineer"),n.createElement("option",{value:"2"},"Doctor"),n.createElement("option",{value:"3"},"Teacher"))),n.createElement(o,{name:"First Name"},B("user.firstName")),n.createElement(o,{name:"Last Name"},B("user.lastName")),n.createElement(o,{name:"VIP"},B("user.vip")),n.createElement(o,{name:"Job"},B("user.job")),n.createElement(c,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useInput"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(j()().mark(function a(){var r,o=arguments;return j()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-1":{component:n.memo(n.lazy(k()(j()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O,M;return j()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.createStore,L.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return r=L.sent,o=r.ColorBlock,c=r.Button,t=r.Input,m=a({user:{firstName:"Zhang",lastName:"Fisher"}}),x=m.state,B=m.$,b=m.bind,O=m.useState,M=m.useInput,L.abrupt("return",{default:function(){var F=M(function(G){return G.user.firstName+" "+G.user.lastName},function(G,$){var ee=G.split(/\s+/),J=u()(ee,2),Q=J[0],ae=J[1];$.user.firstName=Q,$.user.lastName=ae});return n.createElement("div",null,n.createElement(t,i()({label:"FullName"},F)),n.createElement(o,{name:"First Name"},B("user.firstName")),n.createElement(o,{name:"Last Name"},B("user.lastName")),n.createElement(c,{onClick:function(){x.user.firstName="Zhang",x.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(j()().mark(function a(){var r,o=arguments;return j()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-2":{component:n.memo(n.lazy(k()(j()().mark(function d(){var l,a,r,o,c,t,m,x,B,b,O;return j()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=S.sent,a=l.createStore,S.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return r=S.sent,o=r.ColorBlock,c=r.Button,t=r.Input,m=a({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),x=m.state,B=m.$,b=m.bind,O=m.useInput,S.abrupt("return",{default:function(){var R=O("user");return n.createElement("div",null,n.createElement(t,i()({label:"First Name"},R.firstName)),n.createElement(t,i()({label:"last Name"},R.lastName)),n.createElement(t,i()({label:"Age"},R.age)),n.createElement(t,i()({type:"checkbox",label:"VIP"},R.vip)),n.createElement(o,{name:"First Name"},B("user.firstName")),n.createElement(o,{name:"Last Name"},B("user.lastName")),n.createElement(o,{name:"Age"},B("user.age")),n.createElement(o,{name:"VIP"},B("user.vip")),n.createElement(c,{onClick:function(){x.user.firstName="Zhang",x.user.lastName="Fisher",x.user.age=18,x.user.vip=!1}},"Reset"))}});case 12:case"end":return S.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(j()().mark(function a(){var r,o=arguments;return j()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-3":{component:n.memo(n.lazy(k()(j()().mark(function d(){var l,a,r,o,c,t;return j()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=x.sent,a=l.useStore,x.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return r=x.sent,o=r.ColorBlock,c=r.Button,t=r.Input,x.abrupt("return",{default:function(){var b=a({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),O=b.state,M=b.$,S=b.bind,L=b.useInput,R=L();return n.createElement("div",null,n.createElement(t,i()({label:"First Name"},R.firstName)),n.createElement(t,i()({label:"last Name"},R.lastName)),n.createElement(t,i()({label:"Age"},R.age)),n.createElement(t,i()({type:"checkbox",label:"VIP"},R.vip)),n.createElement(o,{name:"First Name"},M("firstName")),n.createElement(o,{name:"Last Name"},M("lastName")),n.createElement(o,{name:"Age"},M("age")),n.createElement(o,{name:"VIP"},M("vip")),n.createElement(c,{onClick:function(){O.firstName="Zhang",O.lastName="Fisher",O.age=18,O.vip=!1}},"Reset"))}});case 11:case"end":return x.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":C,"x-react-components":E},renderOpts:{compile:function(){var d=k()(j()().mark(function a(){var r,o=arguments;return j()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,o));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},50090:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(9159),w={}},91775:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(61077),w={}},74905:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(47315),w={}},41344:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(26916),w={}},10117:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(3694),w={}},31837:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(4180),P=e(44970),k=e(37487),n={"docs-guide-signal-about-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,E=C.createStore,t.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=t.sent,d=s.Button,l=s.ColorBlock,a=E({age:18}),r=a.state,o=a.$,t.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(l,null,"Age+Signal :",o("age")),y.createElement(l,null,"Age :",r.age),y.createElement(d,{onClick:function(){return r.age=r.age+1}},"+Age"))}});case 11:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},11296:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(75690),w={}},14787:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(8767),P=e(44970),k=e(37487),n={"docs-guide-signal-computed-render-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,E=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var c=E({user:{age:18}}),t=c.state,m=c.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},m(function(x){var B=x.value;return y.createElement("div",null,B)},function(x){return x.user.age})),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-computed-render-demo-1":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,E=C.useStore,s=C.computed,o.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return d=o.sent,l=d.Button,a=d.ColorBlock,o.abrupt("return",{default:function(){var t=E({user:{age:18}}),m=t.state,x=t.$;return y.createElement("div",null,y.createElement(a,{name:"Age"},x(function(B){var b=B.value;return y.createElement("div",null,b)},s(function(B){return B.user.age}))),y.createElement(l,{onClick:function(){return m.user.age++}},"+Age"))}});case 11:case"end":return o.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-computed-render-demo-2":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,E=C.useStore,s=C.delay,d=C.computed,t.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,o=l.Loading,t.abrupt("return",{default:function(){var x=E({order:{price:10,count:1}}),B=x.state,b=x.$;return y.createElement("div",null,y.createElement(r,{name:"Price"},b("order.price")),y.createElement(r,{name:"Count"},b("order.count")),y.createElement(r,{name:"Total"},b(function(O){var M=O.value,S=O.loading;return y.createElement("div",null,S?y.createElement(o,{title:"\u8BA1\u7B97\u4E2D..."}):M,"\u{1F4B8}\u{1F4B8}")},d(function(){var O=j()(u()().mark(function M(S){return u()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,s(1e3);case 2:return R.abrupt("return",S.order.price*S.order.count);case 3:case"end":return R.stop()}},M)}));return function(M){return O.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),y.createElement(a,{onClick:function(){return B.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},14727:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(63518),P=e(44970),k=e(37487),n={"docs-guide-signal-custom-render-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,E=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var c=E({user:{age:18}}),t=c.state,m=c.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},m(function(x){var B=x.value;return y.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},y.createElement("span",{style:{flexGrow:1}},B),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-custom-render-demo-1":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r;return u()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=c.sent,E=C.useStore,s=C.delay,d=C.computed,c.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return l=c.sent,a=l.Button,r=l.ColorBlock,c.abrupt("return",{default:function(){var m=E({order:{price:100,count:1,total:d(function(){var M=j()(u()().mark(function S(L){return u()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.next=2,s();case 2:return F.abrupt("return",L.price*L.count);case 3:case"end":return F.stop()}},S)}));return function(S){return M.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),x=m.state,B=m.$,b=m.useAsyncState,O=b("order.total");return y.createElement("div",null,y.createElement(r,{name:"Price"},B("order.price")),y.createElement(r,{name:"Count"},B("order.count")),y.createElement(r,{name:"Total",loading:O.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},B("order.total.value")),y.createElement(r,{name:"Total",loading:O.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},B("order.total")),y.createElement(a,{onClick:function(){return x.order.count++}},"+Count"))}});case 12:case"end":return c.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-custom-render-demo-2":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o,c,t;return u()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=x.sent,E=C.createStore,s=C.computed,d=C.delay,x.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return l=x.sent,a=l.Button,r=l.ColorBlock,o=E({order:{price:100,count:1,total:s(function(){var B=j()(u()().mark(function b(O){return u()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,d(2e3);case 2:return S.abrupt("return",O.price*O.count);case 3:case"end":return S.stop()}},b)}));return function(b){return B.apply(this,arguments)}}(),["./price","./count"])}}),c=o.state,t=o.$,x.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(r,{name:"Price"},t("order.price")),y.createElement(r,{name:"Count"},t("order.count")),y.createElement(r,{name:"Total"},t(function(b){var O=b.value,M=b.loading;return y.createElement(y.Fragment,null,M&&y.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!M&&y.createElement("span",null,O,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),y.createElement(a,{onClick:function(){return c.order.count++}},"Count++"))}});case 13:case"end":return x.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},67317:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(35371),w={}},5619:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(33358),P=e(44970),k=e(37487),n={"docs-guide-signal-state-render-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,E=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var c=E({user:{age:18}}),t=c.state,m=c.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},m("user.age")),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-state-render-demo-1":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o,c;return u()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=m.sent,E=C.createStore,m.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=m.sent,d=s.Button,l=s.ColorBlock,a=E({user:{firstName:"\u5F20",lastName:"\u4E09"}}),r=a.state,o=a.signal,c=a.$,m.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(l,{name:"FirstName"},c("user.firstName")),y.createElement(l,{name:"LastName"},c("user.lastName")),y.createElement(l,null,"FullName :",c(function(B){return B.user.firstName+" "+B.user.lastName})),y.createElement(d,{onClick:function(){return r.user.firstName=r.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),y.createElement(d,{onClick:function(){return r.user.lastName=r.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return m.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-state-render-demo-2":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o,c,t;return u()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=x.sent,E=C.createStore,s=C.delay,d=C.computed,x.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return l=x.sent,a=l.Button,r=l.ColorBlock,o=E({order:{price:100,count:1,total:d(function(){var B=j()(u()().mark(function b(O){return u()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,s(1e3);case 2:return S.abrupt("return",O.price*O.count);case 3:case"end":return S.stop()}},b)}));return function(b){return B.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),c=o.state,t=o.$,x.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(r,{name:"Price"},t("order.price")),y.createElement(r,{name:"Count"},t("order.count")),y.createElement(r,{name:"Total"},t("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),y.createElement(r,{name:"Total"},t("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),y.createElement(a,{onClick:function(){return c.order.count++}},"+Count"))}});case 13:case"end":return x.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},22234:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(23841),P=e(44970),k=e(37487),n={"docs-guide-signal-watch-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l;return u()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=r.sent,E=C.useStore,r.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=r.sent,d=s.Button,l=s.ColorBlock,r.abrupt("return",{default:function(){var c=E({user:{age:18}}),t=c.state,m=c.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},m(function(x){var B=x.value;return y.createElement("div",null,B)},function(x){return x.user.age})),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-watch-demo-1":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=o.sent,E=C.useStore,s=C.computed,o.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return d=o.sent,l=d.Button,a=d.ColorBlock,o.abrupt("return",{default:function(){var t=E({user:{age:18}}),m=t.state,x=t.$;return y.createElement("div",null,y.createElement(a,{name:"Age"},x(function(B){var b=B.value;return y.createElement("div",null,b)},s(function(B){return B.user.age}))),y.createElement(l,{onClick:function(){return m.user.age++}},"+Age"))}});case 11:case"end":return o.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}},"docs-guide-signal-watch-demo-2":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o;return u()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=t.sent,E=C.useStore,s=C.delay,d=C.computed,t.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,o=l.Loading,t.abrupt("return",{default:function(){var x=E({order:{price:10,count:1}}),B=x.state,b=x.$;return y.createElement("div",null,y.createElement(r,{name:"Price"},b("order.price")),y.createElement(r,{name:"Count"},b("order.count")),y.createElement(r,{name:"Total"},b(function(O){var M=O.value,S=O.loading;return y.createElement("div",null,S?y.createElement(o,{title:"\u8BA1\u7B97\u4E2D..."}):M,"\u{1F4B8}\u{1F4B8}")},d(function(){var O=j()(u()().mark(function M(S){return u()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,s(1e3);case 2:return R.abrupt("return",S.order.price*S.order.count);case 3:case"end":return R.stop()}},M)}));return function(M){return O.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),y.createElement(a,{onClick:function(){return B.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},83786:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(31363),w={}},16645:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(81897),w={}},77680:function(q,I,e){"use strict";var T;e.r(I),e.d(I,{demos:function(){return E}});var u=e(29008),w=e.n(u),j=e(28633),y=e.n(j),i=e(70958),P=e.n(i),k=e(92379),n=e(94451),A=e(37487),C=e(44970),E={"docs-guide-store-render-demo-0":{component:k.memo(k.lazy(P()(w()().mark(function s(){var d,l,a,r,o,c,t,m,x,B,b,O;return w()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return d=S.sent,l=d.default,a=d.createContext,r=d.useContext,o=d.useState,S.next=9,Promise.resolve().then(e.bind(e,37487));case 9:return c=S.sent,t=c.ColorBlock,m=c.Button,x=c.Divider,B=a({firstName:"Zhang",lastName:"Fisher",age:18}),b=l.memo(function(L){var R=r(B);return l.createElement(t,{name:"\u5B50\u7EC4\u4EF6:".concat(L.name)},l.createElement("span",null,"Hello :",R.firstName," ",R.lastName))}),O=0,S.abrupt("return",{default:function(){var R=o({firstName:"Zhang",lastName:"Fisher",age:18}),F=y()(R,2),G=F[0],$=F[1];return l.createElement(B.Provider,{value:G},l.createElement(x,{title:"\u6839\u7EC4\u4EF6"}),l.createElement(t,{name:"FullName"},G.firstName," ",G.lastName),l.createElement(t,{name:"Age"},"Age :",G.age),l.createElement(x,{title:"\u5B50\u7EC4\u4EF6"}),l.createElement(b,{name:"A"}),l.createElement(b,{name:"B"}),l.createElement(m,{onClick:function(){$({firstName:"Zhang",lastName:"Fisher",age:++O})}},"+Age"))}});case 17:case"end":return S.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{react:T||(T=e.t(k,2)),"x-react-components":A},renderOpts:{compile:function(){var s=P()(w()().mark(function l(){var a,r=arguments;return w()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,e.e(9039).then(e.bind(e,39039));case 2:return c.abrupt("return",(a=c.sent).default.apply(a,r));case 3:case"end":return c.stop()}},l)}));function d(){return s.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-1":{component:k.memo(k.lazy(P()(w()().mark(function s(){var d,l,a,r,o,c,t,m,x,B,b,O;return w()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=S.sent,l=d.createStore,S.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=S.sent,r=a.default,S.next=10,Promise.resolve().then(e.bind(e,37487));case 10:return o=S.sent,c=o.ColorBlock,t=o.Button,m=o.Divider,x=l({firstName:"Zhang",lastName:"Fisher",age:18}),B=r.memo(function(L){var R=x.useState("firstName"),F=y()(R,1),G=F[0];return r.createElement(c,{name:"\u5B50\u7EC4\u4EF6:FirstName"},G)}),b=r.memo(function(L){var R=x.useState("lastName"),F=y()(R,1),G=F[0];return r.createElement(c,{name:"\u5B50\u7EC4\u4EF6:lastName"},G)}),O=0,S.abrupt("return",{default:function(){var R=x.useState("age"),F=y()(R,1),G=F[0];return r.createElement(r.Fragment,null,r.createElement(m,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(c,{name:"FullName"},"Hello :",x.state.firstName," ",x.state.lastName),r.createElement(c,{name:"Age"},G),r.createElement(m,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(B,null),r.createElement(b,null),r.createElement(t,{onClick:function(){return x.state.age=x.state.age+1}},"+Age"),r.createElement(t,{onClick:function(){return x.state.firstName=x.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return S.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,react:T||(T=e.t(k,2)),"x-react-components":A},renderOpts:{compile:function(){var s=P()(w()().mark(function l(){var a,r=arguments;return w()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,e.e(9039).then(e.bind(e,39039));case 2:return c.abrupt("return",(a=c.sent).default.apply(a,r));case 3:case"end":return c.stop()}},l)}));function d(){return s.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-2":{component:k.memo(k.lazy(P()(w()().mark(function s(){var d,l,a,r,o,c,t,m,x,B,b,O,M,S;return w()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=R.sent,l=d.createStore,R.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=R.sent,r=a.default,R.next=10,Promise.resolve().then(e.bind(e,37487));case 10:return o=R.sent,c=o.ColorBlock,t=o.Button,m=o.Divider,x=l({firstName:"Zhang",lastName:"Fisher",age:18}),B=x.state,b=x.$,O=function(){return r.createElement(c,{name:"\u5B50\u7EC4\u4EF6:FirstName"},b("firstName"))},M=function(){return r.createElement(c,{name:"\u5B50\u7EC4\u4EF6:LastName"},b("lastName"))},S=0,R.abrupt("return",{default:function(){return r.createElement(r.Fragment,null,r.createElement(m,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(c,{name:"FullName"},b("firstName")," ",b("lastName")),r.createElement(c,{name:"Age"},b("age")," - ",++S),r.createElement(m,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(O,null),r.createElement(M,null),r.createElement(t,{onClick:function(){return B.age=B.age+1}},"+Age"),r.createElement(t,{onClick:function(){return B.firstName=B.firstName+"."}},"Change FirstName"),r.createElement(t,{onClick:function(){return B.lastName=B.lastName+"*"}},"Change LastName"))}});case 19:case"end":return R.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":C,react:T||(T=e.t(k,2)),"x-react-components":A},renderOpts:{compile:function(){var s=P()(w()().mark(function l(){var a,r=arguments;return w()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,e.e(9039).then(e.bind(e,39039));case 2:return c.abrupt("return",(a=c.sent).default.apply(a,r));case 3:case"end":return c.stop()}},l)}));function d(){return s.apply(this,arguments)}return d}()}}}},33788:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return C}});var T=e(28633),u=e.n(T),w=e(29008),j=e.n(w),y=e(70958),i=e.n(y),P=e(92379),k=e(61786),n=e(44970),A=e(37487),C={"docs-guide-store-state-demo-0":{component:P.memo(P.lazy(i()(j()().mark(function E(){var s,d,l,a,r,o,c,t,m,x;return j()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=b.sent,d=s.createStore,l=s.computed,b.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return a=b.sent,r=a.Button,o=a.ColorBlock,c=d({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(M){return M.firstName+M.lastName},salary:l(function(){var O=i()(j()().mark(function M(S){return j()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",S.age*10);case 1:case"end":return R.stop()}},M)}));return function(M){return O.apply(this,arguments)}}(),["age"])}),t=c.state,m=c.useState,x=c.$,globalThis.state=t,b.abrupt("return",{default:function(){var M=m("age"),S=u()(M,2),L=S[0],R=S[1],F=m("salary"),G=u()(F,2),$=G[0],ee=G[1],J=m(function(N){return N.lastName},function(N,z){return z.lastName=N}),Q=u()(J,2),ae=Q[0],H=Q[1];return P.createElement("div",null,P.createElement(o,null,"Fullname :",t.firstName," ",ae),P.createElement(o,null,"Age :",L),P.createElement(o,null,"Salary: ",x("salary")),P.createElement(r,{onClick:function(){return R(L+1)}},"+Age"),P.createElement(r,{onClick:function(){return H(ae+".")}},"Change lastName"))}});case 13:case"end":return b.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(j()().mark(function d(){var l,a=arguments;return j()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}},"docs-guide-store-state-demo-1":{component:P.memo(P.lazy(i()(j()().mark(function E(){var s,d,l,a,r,o,c,t,m,x;return j()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=b.sent,d=s.createStore,b.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return l=b.sent,a=l.ColorBlock,b.next=10,Promise.resolve().then(e.bind(e,37487));case 10:return r=b.sent,o=r.Button,c=d({firstName:"Zhang",lastName:"Fisher",fullName:function(M){return M.firstName+M.lastName}}),t=c.useState,m=c.state,x=c.$,b.abrupt("return",{default:function(){var M=t(function(J){return J.firstName},function(J,Q){return Q.firstName=J}),S=u()(M,2),L=S[0],R=S[1],F=t(function(J){return J.fullName},function(J,Q){var ae=u()(J,2),H=ae[0],N=ae[1];Q.firstName=H,Q.lastName=N}),G=u()(F,2),$=G[0],ee=G[1];return P.createElement("div",null,P.createElement(a,{name:"FullName",value:$}),P.createElement(o,{onClick:function(){return R("<".concat(L,">"))}},"Change FirstName"),P.createElement(o,{onClick:function(){return ee(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return b.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(j()().mark(function d(){var l,a=arguments;return j()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}},"docs-guide-store-state-demo-2":{component:P.memo(P.lazy(i()(j()().mark(function E(){var s,d,l,a,r,o,c,t;return j()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=x.sent,d=s.createStore,x.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return l=x.sent,a=l.Button,r=l.ColorBlock,o=d({age:18}),c=o.state,t=o.$,x.abrupt("return",{default:function(){return P.createElement("div",null,P.createElement(r,null,"Age+Signal :",t("age")),P.createElement(r,null,"Age :",c.age),P.createElement(a,{onClick:function(){return c.age=c.age+1}},"+Age"))}});case 11:case"end":return x.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(j()().mark(function d(){var l,a=arguments;return j()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}}}},85244:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return n}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(92379),i=e(34450),P=e(44970),k=e(37487),n={"docs-guide-store-demo-0":{component:y.memo(y.lazy(j()(u()().mark(function A(){var C,E,s,d,l,a,r,o,c;return u()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return C=m.sent,E=C.useStore,m.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return s=m.sent,d=s.Button,l=s.ColorBlock,m.abrupt("return",{default:function(){var B=E({count:18}),b=B.state,O=B.$;return y.createElement("div",null,y.createElement(l,{name:"Count"},O("count")),y.createElement(d,{onClick:function(){return b.count++}},"Count++"))}});case 11:case"end":return m.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":k},renderOpts:{compile:function(){var A=j()(u()().mark(function E(){var s,d=arguments;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(s=a.sent).default.apply(s,d));case 3:case"end":return a.stop()}},E)}));function C(){return A.apply(this,arguments)}return C}()}}}},26992:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(22273),w={}},33463:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(66663),w={}},45988:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return l}});var T=e(29008),u=e.n(T),w=e(12027),j=e.n(w),y=e(34180),i=e.n(y),P=e(24325),k=e.n(P),n=e(70958),A=e.n(n),C=e(92379),E=e(26826),s=e(44970),d=e(37487),l={"docs-guide-watch-objects-demo-0":{component:C.memo(C.lazy(A()(u()().mark(function a(){var r,o,c,t,m,x,B,b,O,M,S,L,R,F;return u()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return r=$.sent,o=r.createStore,c=r.watch,$.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return t=$.sent,m=t.Divider,x=t.ColorBlock,B=t.Button,b=t.Box,O=t.Input,M=o({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(J){return J.firstName+" "+J.lastName},dirty:c(function(ee,J){var Q=ee.path,ae=ee.value;return J.cache[Q.join(".")]=!0,!0},function(ee){return["firstName","lastName"].includes(ee[ee.length-1])},{initial:!1})}}),S=M.state,L=M.useBindings,R=M.watchObjects,F=M.$,$.abrupt("return",{default:function(){var J=L("user");return C.createElement("div",null,C.createElement(O,k()({label:"FirstName"},J.firstName)),C.createElement(O,k()({label:"lastName"},J.lastName)),C.createElement(m,null),C.createElement(b,null,C.createElement(x,{name:"FullName"},F("user.fullName")),C.createElement(x,{name:"Dirty"},F("user.dirty")),C.createElement(B,{onClick:function(){S.user.firstName="Zhang",S.user.lastName="Fisher",R.get("user.dirty").reset()}},"Reset")),C.createElement(b,null,C.createElement("div",null,"typeof(store.watchObjects)==",i()(R)),C.createElement("div",null,"store.watchObjects.size=",R.size),C.createElement("div",null,"store.watchObjects.size=",R.size),C.createElement("div",null,"store.watchObjects.keys()=",j()(R.keys()).join(" , "))))}});case 15:case"end":return $.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u7F16\u8F91firstName\u6216lastName,\u4F1A\u89E6\u53D1dirty\u7684\u53D8\u5316",title:"\u4F7F\u7528watch\u529F\u80FD\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF"},context:{"@autostorejs/react":s,"x-react-components":d},renderOpts:{compile:function(){var a=A()(u()().mark(function o(){var c,t=arguments;return u()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(9039).then(e.bind(e,39039));case 2:return x.abrupt("return",(c=x.sent).default.apply(c,t));case 3:case"end":return x.stop()}},o)}));function r(){return a.apply(this,arguments)}return r}()}}}},54915:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return C}});var T=e(29008),u=e.n(T),w=e(28633),j=e.n(w),y=e(70958),i=e.n(y),P=e(92379),k=e(37686),n=e(44970),A=e(37487),C={"docs-guide-watch-state-demo-0":{component:P.memo(P.lazy(i()(u()().mark(function E(){var s,d,l,a,r,o,c,t,m;return u()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=B.sent,d=s.createStore,l=s.watch,B.next=7,Promise.resolve().then(e.bind(e,37487));case 7:return a=B.sent,r=a.Input,o=a.Button,c=d({orders:[{name:"AutoStore\u5B9E\u6218\u6307\u5357",price:100,count:1,total:function(O){return O.price*O.count}},{name:"\u6DF1\u5165\u6D45\u51FAAutoStore",price:98,count:1,total:function(O){return O.price*O.count}}],total:l(function(b){return t.orders.reduce(function(O,M){return O+M.count*M.price},0)},function(b){return b[b.length-1]==="count"},{initial:198})}),t=c.state,m=c.useState,B.abrupt("return",{default:function(){var O=m(),M=j()(O,1),S=M[0];return P.createElement("table",{className:"table"},P.createElement("thead",null,P.createElement("tr",null,P.createElement("th",null,"Name"),P.createElement("th",null,"Price"),P.createElement("th",null,"Count"),P.createElement("th",null,"Total"))),P.createElement("tbody",null,S.orders.map(function(L,R){return P.createElement("tr",{key:R},P.createElement("td",null,L.name),P.createElement("td",null,L.price),P.createElement("td",null,P.createElement(o,{onClick:function(){return L.count--}},"-"),P.createElement(r,{value:L.count,style:{display:"inline-flex"}}),P.createElement(o,{onClick:function(){return L.count++}},"+")),P.createElement("td",null,L.total))}),P.createElement("tr",null,P.createElement("td",{colSpan:3},"Total"),P.createElement("td",null,t.total))))}});case 12:case"end":return B.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-watch-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":A},renderOpts:{compile:function(){var E=i()(u()().mark(function d(){var l,a=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(l=o.sent).default.apply(l,a));case 3:case"end":return o.stop()}},d)}));function s(){return E.apply(this,arguments)}return s}()}}}},14097:function(q,I,e){"use strict";var T;e.r(I),e.d(I,{demos:function(){return d}});var u=e(24325),w=e.n(u),j=e(29008),y=e.n(j),i=e(28633),P=e.n(i),k=e(70958),n=e.n(k),A=e(92379),C=e(73549),E=e(44970),s=e(37487),d={"docs-guide-watch-store-demo-0":{component:A.memo(A.lazy(n()(y()().mark(function l(){var a,r,o,c,t,m,x,B,b,O,M,S,L,R,F,G,$;return y()().wrap(function(J){for(;;)switch(J.prev=J.next){case 0:return J.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=J.sent,r=a.createStore,o=a.computed,c=a.useStore,J.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return t=J.sent,m=t.Box,x=t.Button,B=t.ColorBlock,b=t.Layout,O=t.CheckBox,J.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return M=J.sent,S=M.useEffect,L=M.useRef,R=r({order:{price:10,count:2,total:o(function(Q){return Q.price*Q.count})}}),F=R.state,G=R.watch,$=R.$,J.abrupt("return",{default:function(){var ae=L(),H=c({operates:"*"}),N=H.useState("operates"),z=P()(N,2),ue=z[0],re=z[1];return S(function(){var ce=G(function(le){ae.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(le.type," ").concat(le.path.join("."),"</p>"))},{operates:ue});return function(){return ce.off()}},[ue]),A.createElement(b,{style:{maxHeight:"400px"}},A.createElement("div",null,A.createElement(B,{name:"Price"},$("order.price")),A.createElement(B,{name:"Count"},A.createElement(x,{onClick:function(){F.order.count--,ae.current.insertAdjacentHTML("beforeend","----------")}},"-"),$("order.count"),A.createElement(x,{onClick:function(){F.order.count++,ae.current.insertAdjacentHTML("beforeend","----------")}},"+")),A.createElement(B,{name:"Total"},$("order.total")),A.createElement(m,null,A.createElement(O,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:ue==="*",onChange:function(le){re(le.target.checked?"*":"read")}}),A.createElement(O,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:ue==="write",onChange:function(le){re(le.target.checked?"write":"*")}}),A.createElement(O,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:ue==="read",onChange:function(le){re(le.target.checked?"read":"*")}})),A.createElement(x,{onClick:function(){ae.current.innerHTML=""}},"Clear")),A.createElement("div",{ref:ae,style:{overflowY:"auto"}}))}});case 21:case"end":return J.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":E,"x-react-components":s,react:T||(T=e.t(A,2))},renderOpts:{compile:function(){var l=n()(y()().mark(function r(){var o,c=arguments;return y()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,e.e(9039).then(e.bind(e,39039));case 2:return m.abrupt("return",(o=m.sent).default.apply(o,c));case 3:case"end":return m.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-1":{component:A.memo(A.lazy(n()(y()().mark(function l(){var a,r,o,c,t,m,x,B,b,O,M,S,L,R,F,G,$;return y()().wrap(function(J){for(;;)switch(J.prev=J.next){case 0:return J.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=J.sent,r=a.createStore,o=a.computed,c=a.useStore,J.next=8,Promise.resolve().then(e.bind(e,37487));case 8:return t=J.sent,m=t.Box,x=t.Button,B=t.ColorBlock,b=t.Layout,O=t.CheckBox,J.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return M=J.sent,S=M.useEffect,L=M.useRef,R=r({order:{price:10,count:2,total:o(function(Q){return Q.price*Q.count})}}),F=R.state,G=R.watch,$=R.$,J.abrupt("return",{default:function(){var ae=L(),H=c({operates:"*"}),N=H.useState("operates"),z=P()(N,2),ue=z[0],re=z[1];return S(function(){var ce=G("order.total",function(le){ae.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(le.type," ").concat(le.path.join("."),"</p>"))},{operates:ue});return function(){return ce.off()}},[ue]),A.createElement(b,{style:{maxHeight:"400px"}},A.createElement("div",null,A.createElement(B,{name:"Price"},$("order.price")),A.createElement(B,{name:"Count"},A.createElement(x,{onClick:function(){F.order.count--,ae.current.insertAdjacentHTML("beforeend","----------")}},"-"),$("order.count"),A.createElement(x,{onClick:function(){F.order.count++,ae.current.insertAdjacentHTML("beforeend","----------")}},"+")),A.createElement(B,{name:"Total"},$("order.total")),A.createElement(m,null,A.createElement(O,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:ue==="*",onChange:function(le){re(le.target.checked?"*":"read")}}),A.createElement(O,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:ue==="write",onChange:function(le){re(le.target.checked?"write":"*")}}),A.createElement(O,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:ue==="read",onChange:function(le){re(le.target.checked?"read":"*")}})),A.createElement(x,{onClick:function(){ae.current.innerHTML=""}},"Clear")),A.createElement("div",{ref:ae,style:{overflowY:"auto"}}))}});case 21:case"end":return J.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":E,"x-react-components":s,react:T||(T=e.t(A,2))},renderOpts:{compile:function(){var l=n()(y()().mark(function r(){var o,c=arguments;return y()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,e.e(9039).then(e.bind(e,39039));case 2:return m.abrupt("return",(o=m.sent).default.apply(o,c));case 3:case"end":return m.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-2":{component:A.memo(A.lazy(n()(y()().mark(function l(){var a,r,o,c,t,m,x,B,b,O,M,S,L,R,F;return y()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=$.sent,r=a.createStore,$.next=6,Promise.resolve().then(e.bind(e,37487));case 6:return o=$.sent,c=o.Button,t=o.Layout,m=o.Input,$.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return x=$.sent,B=x.useEffect,b=x.useRef,O=r({order:{price:10,count:2,books:["AutoStore\u5B9E\u6218\u6307\u5357","\u6DF1\u5165\u6D45\u51FAAutoStore","AutoStore\u6700\u4F73\u5B9E\u8DF5"]}}),M=O.state,S=O.watch,L=O.$,R=O.useState,F=O.useBindings,$.abrupt("return",{default:function(){var J=b(),Q=b();B(function(){var H=S("order.books",function(N){J.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          `.concat(N.type," ").concat(N.path.join("."),"[").concat(N.indexs[0],`]
        </p>`))},{operates:["insert","remove","update"]});return function(){return H.off()}},[]);var ae=F("order.books");return A.createElement(t,{style:{maxHeight:"400px"}},A.createElement("div",null,M.order.books.map(function(H,N){return A.createElement(m,w()({key:N},ae[N]))}),A.createElement(m,{ref:Q,actions:["+"],placeholder:"\u8BF7\u8F93\u5165\u4E66\u540D",onAction:function(N,z){String(z).length>0&&(M.order.books.push(z),Q.current.value="")}}),A.createElement(c,{onClick:function(){J.current.innerHTML=""}},"Clear")),A.createElement("div",{ref:J,style:{overflowY:"auto"}}))}});case 17:case"end":return $.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":E,"x-react-components":s,react:T||(T=e.t(A,2))},renderOpts:{compile:function(){var l=n()(y()().mark(function r(){var o,c=arguments;return y()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,e.e(9039).then(e.bind(e,39039));case 2:return m.abrupt("return",(o=m.sent).default.apply(o,c));case 3:case"end":return m.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}}}},45618:function(q,I,e){"use strict";e.r(I),e.d(I,{demos:function(){return w}});var T=e(92379),u=e(43112),w={}},20927:function(q,I,e){"use strict";e.r(I),e.d(I,{Author:function(){return d},Counter:function(){return A},getProjects:function(){return c},useOneEffect:function(){return m}});var T=e(28633),u=e.n(T),w=e(92379),j=e(44970),y=e(37487),i=e(651),P=(0,j.createStore)({root:{count:1}}),k=P.state,n=P.$,A=function(){var B=(0,w.useState)(1),b=u()(B,2),O=b[0],M=b[1];return(0,i.jsxs)(y.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[O,(0,i.jsxs)(y.ColorBlock,{children:["Count:",O]}),(0,i.jsxs)(y.ColorBlock,{children:["Count:",n("root.count")]}),(0,i.jsx)(y.Button,{onClick:function(){return M(O+1)},children:"State +1"}),(0,i.jsx)(y.Button,{onClick:function(){return k.root.count++},children:"Signal +1"})]})},C=(0,j.createStore)({firstName:"Zhang",lastName:"Fisher"}),E=C.state,s=C.$,d=function(){var B=(0,w.useState)(1),b=u()(B,2),O=b[0],M=b[1];return(0,i.jsxs)(y.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[O,(0,i.jsxs)(y.ColorBlock,{children:["Count:",O]}),(0,i.jsx)(y.ColorBlock,{children:s(function(S){return S.firstName+" "+S.lastName})}),(0,i.jsx)(y.Button,{onClick:function(){return M(O+1)},children:"State +1"}),(0,i.jsx)(y.Button,{onClick:function(){return E.lastName=E.lastName+"."},children:"Update lastName"})]})},l=e(29008),a=e.n(l),r=e(70958),o=e.n(r);function c(x){return t.apply(this,arguments)}function t(){return t=o()(a()().mark(function x(B){var b,O,M;return a()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,fetch(B);case 2:if(b=L.sent,!b.ok){L.next=11;break}return L.next=6,b.json();case 6:return O=L.sent,M=O.map(function(R){return{name:R.name,url:R.html_url,description:R.description,stars:R.stargazers_count}}),L.abrupt("return",M);case 11:throw new Error("".concat(b.status," - ").concat(b.statusText));case 12:case"end":return L.stop()}},x)})),t.apply(this,arguments)}function m(x){var B=(0,w.useRef)(!1);(0,w.useEffect)(function(){if(!B.current)return B.current=!0,x()})}},37487:function(q,I,e){"use strict";e.r(I),e.d(I,{Box:function(){return w},Button:function(){return k},Card:function(){return C},CheckBox:function(){return J},ColorBlock:function(){return t},Divider:function(){return a},Field:function(){return l},Input:function(){return S},JsonView:function(){return $},Layout:function(){return x},Loading:function(){return y},RichLabel:function(){return F},Select:function(){return ae},ValidResult:function(){return d}});var T=e(92379),u=e(651),w=(0,T.forwardRef)(function(H,N){var z=H.title,ue=H.enable,re=ue===void 0?!0:ue,ce=H.visible,le=ce===void 0?!0:ce;return(0,u.jsxs)("div",{ref:N,style:{display:le?"flex":"none",position:"relative",flexDirection:"column",padding:"8px",margin:"16px 4px 4px 4px",boxSizing:"border-box",border:"1px solid #bbb"},children:[(0,u.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:re?"#bbb":"gray"},children:z||""}),H.children]})}),j=e(97106),y=function(N){var z=N.size,ue=z===void 0?20:z,re=N.visible,ce=re===void 0?!0:re,le=N.color,fe=N.tips,V=fe===void 0?"loading...":fe;return(0,u.jsxs)("span",{title:V,style:{display:ce?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,u.jsx)(j.Z1,{width:ue,height:ue,color:le}),N.title?(0,u.jsx)("span",{style:{marginLeft:"4px"},children:N.title}):null]})},i=e(94039),P=(0,i.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(N){return N.visible!==!1?N.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #eee",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555",fontSize:"0.8em","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"x-button"}),k=function(N){var z=N.loading,ue=N.timeout,re=ue===void 0?0:ue,ce=N.progress,le=ce===void 0?0:ce,fe=N.cancel,V=N.onClick;return(0,u.jsxs)("div",{className:P.className,style:P.getStyle(N),onClick:V,children:[z?(0,u.jsx)(y,{}):null,(0,u.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:N.children}),re>0?(0,u.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:re}):"",le>0?(0,u.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[le,"%"]}):"",N.error?(0,u.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:N.error}):"",N.loading&&typeof fe=="function"?(0,u.jsx)("button",{onClick:fe,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},n=(0,i.zo)({border:"1px solid #e1e1e1",background:function(N){return N.enable!==!1?"white":"gray"},margin:"8px",display:function(N){return N.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"card"}),A=(0,i.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555"},{className:"card-header"}),C=function(N){var z=N.title,ue=N.enable,re=ue===void 0?!0:ue,ce=N.buttons,le=ce===void 0?[]:ce,fe=Array.isArray(N.children)?N.children:[N.children];return(0,u.jsxs)("div",{className:n.className,style:n.getStyle(N),children:[(0,u.jsxs)("div",{className:A.className,style:A.getStyle(N),children:[(0,u.jsx)("span",{style:{flexGrow:1,color:re?"#222":"gray"},children:z}),(0,u.jsx)("span",{style:{},children:le.map(function(V,U){return(0,u.jsx)("span",{className:"button",style:{padding:"4px",margin:"4px",cursor:"pointer"},onClick:V.onClick,children:V.title},U)})})]}),(0,u.jsx)("div",{style:{padding:"12px"},children:fe.map(function(V,U){return fe.length>1&&U==fe.length-1&&V.classList&&V.classList.contains("footer")?(0,u.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:V},U):V})})]})},E=e(24325),s=e.n(E),d=function(N){var z=N.validate,ue=N.help;if(z!=null){var re=typeof z!="boolean",ce=re?z==null?void 0:z.result:z,le=re?z==null?void 0:z.loading:!1,fe=re?z==null?void 0:z.error:ue;return(0,u.jsxs)("span",{style:{color:"red",display:le||!ce?"flex":"none"},children:[(0,u.jsx)(y,{visible:le,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!le&&(ce?"":fe)]})}},l=function(N){var z=N.enable,ue=z===void 0?!0:z,re=N.visible,ce=re===void 0?!0:re,le=N.label,fe=le===void 0?"":le,V=N.children,U=V===void 0?"":V,Z=N.memo;return(0,u.jsxs)("div",{className:"field",style:{position:"relative",display:ce===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,u.jsxs)("label",{className:"field-label",style:{minWidth:"160px",fontWeight:"bold",color:ue===!1?"gray":"inherit"},children:[fe,":"]}),(0,u.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:ue===!1?"gray":"inherit"},children:[typeof U=="function"?"":U,Z&&(0,u.jsx)("span",{style:{color:"gray"},children:Z})]}),(0,u.jsx)(d,s()({},N))]})},a=function(N){var z=N.title,ue=N.visible,re=ue===void 0?!0:ue;return(0,u.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:re?"flex":"none"},children:(0,u.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:z})})},r=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],o=0;function c(){return o++,o>=r.length&&(o=0),r[o]}var t=function(N){var z=(0,T.useRef)(0),ue=N.name,re=N.value,ce=re===void 0?"":re,le=N.loading,fe=le===void 0?!1:le,V=N.comment,U=c(),Z="white";return(0,T.useEffect)(function(){z.current++}),(0,u.jsxs)("div",{style:s()(s()({backgroundColor:U,padding:"6px",color:Z,display:"flex"},N.style),{},{alignItems:"center"}),children:[(0,u.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[ue?(0,u.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:ue}):null,ue?(0,u.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,u.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(ce),N.children]})]}),V?(0,u.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:V}):null,fe?(0,u.jsx)(y,{color:"white"}):null,(0,u.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:z.current})]})},m=(0,i.zo)({display:function(N){return N.visible===!1?"none":"flex"},position:"relative",flexDirection:function(N){return N.direction||"row"},padding:"4px",margin:"4px",boxSizing:"border-box",alignItems:"stretch","&>*":{flex:1,boxSizing:"border-box",position:"relative",borderLeft:"1px solid #eee",borderTop:"1px solid #eee",borderBottom:"1px solid #eee",padding:"8px"},"&>:last-child":{borderRight:"1px solid #eee"}},{className:"x-layout"}),x=function(N){return(0,u.jsx)("div",{className:m.className,style:m.getStyle(N,N.style),children:N.children})},B=e(19317),b=e.n(B),O=["id","enable","style","value","actions"],M=(0,i.zo)({border:function(N){return N.validate===!1?"1px solid red":"1px solid #bbb"},borderRadius:"4px",background:function(N){return N.enable===!1?"gray":"white"},display:function(N){return N.visible===!1?"none":"block"},margin:"4px",padding:"8px",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}},{className:"x-input"}),S=function(N){var z=N.id,ue=z===void 0?Math.random().toString(36).slice(2):z,re=N.enable,ce=re===void 0?!0:re,le=N.style,fe=le===void 0?{}:le,V=N.value,U=N.actions,Z=b()(N,O),ie=N.label||N.name||N.id,se=(0,T.useRef)(null),X={color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"};return(0,u.jsxs)("div",{style:s()({display:"flex",alignItems:"center"},fe),children:[ie?(0,u.jsx)("label",{htmlFor:ue,style:X,children:ie}):null,(0,u.jsx)("input",s()(s()({ref:se,id:ue,value:V,readOnly:!ce},Z),{},{className:M.className,style:M.getStyle(N)})),U==null?void 0:U.map(function(pe){return(0,u.jsx)("button",{onClick:function(Ce){var me;(me=N.onAction)===null||me===void 0||me.call(N,pe,se.current.value,Ce)},children:pe},pe)})]})},L=e(28633),R=e.n(L),F=function(N){var z=N.text,ue=N.color,re=ue===void 0?"#ff6c00":ue,ce=N.rules,le=typeof re=="string"?{default:re}:Object.assign({default:""},re),fe=z;return ce?Object.entries(ce).forEach(function(V){var U=R()(V,2),Z=U[0],ie=U[1];fe=fe.replace(ie,function(se){var X=Z.includes(":")?Z:"color:".concat(Z,";");return"<span style='".concat(X,"'>").concat(se,"</span>")})}):fe=z.replace(/\{\s?(.*?)\s?\}/gm,function(V,U){return"<span style='color: ".concat(U in le?le[U]:le.default,"'>").concat(U,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,u.jsx)("div",{style:s()({boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},N.style),children:(0,u.jsx)("span",{dangerouslySetInnerHTML:{__html:fe}})})},G=function(N){return N.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},$=function(N){var z=N.data,ue=G(z?JSON.stringify(z,null,4):String(N.children));return(0,u.jsx)(F,{text:ue,rules:{"color:green;":/true|false/g,"color:#222;padding:4px;":/\"(.*?)\"/g,"color:#bd0081;padding:4px;":/(?!=\:\s*)[\d\.]+/g,"color:#888;padding:4px;":/(null|defined)/g,"color:#918213;paddingRight:4px;":/^\{|\}$/g},style:{}})},ee=(0,i.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-checkbox"}),J=function(N){var z=N.id,ue=z===void 0?Math.random().toString(36).slice(2):z,re=N.labelPos,ce=re===void 0?"right":re,le=N.label||N.name||N.id;return(0,u.jsxs)("div",{className:ee.className,style:ee.getStyle(N),children:[ce==="left"?(0,u.jsx)("label",{htmlFor:ue,children:le}):null,(0,u.jsx)("input",s()(s()({},N),{},{id:ue,type:"checkbox"})),ce==="right"?(0,u.jsx)("label",{htmlFor:ue,children:le}):null]})},Q=(0,i.zo)({display:"flex",alignItems:"center",cursor:"pointer","&>label":{userSelect:"none",fontSize:"14px",cursor:"pointer",width:"100px",flexShrink:0},"&>select":{margin:"4px",padding:"8px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-select"}),ae=function(N){var z=N.items,ue=z===void 0?[]:z,re=N.label||N.name||N.id;return(0,u.jsxs)("div",{className:Q.className,style:Q.getStyle(N),children:[(0,u.jsx)("label",{children:re}),(0,u.jsx)("select",s()(s()({},N),{},{value:N.value,children:ue.map(function(ce){return(0,u.jsx)("option",{value:ce.value,children:ce.title},ce.value)})}))]})}},99640:function(q,I,e){"use strict";e.d(I,{eg:function(){return re},_L:function(){return F},WE:function(){return rt},M1:function(){return At},CD:function(){return R},up:function(){return ue},Xr:function(){return Je},BG:function(){return tt},e2:function(){return $},vp:function(){return Xe},FM:function(){return ee},y1:function(){return Q},MI:function(){return J},Q6:function(){return H},kF:function(){return N},Rn:function(){return Ze},fR:function(){return We},f7:function(){return z},QI:function(){return ae},X3:function(){return at},W5:function(){return G},RY:function(){return lt},LG:function(){return ut},Rh:function(){return $e},Fl:function(){return V},Ws:function(){return ht},gw:function(){return pt},b0:function(){return et},tl:function(){return ct},if:function(){return mt},zv:function(){return Ne},ux:function(){return ve},kM:function(){return it},vM:function(){return we},Jy:function(){return Ee},O5:function(){return U},Jq:function(){return me},vo:function(){return se},c6:function(){return st},_N:function(){return X},iI:function(){return Z},vb:function(){return xe},PH:function(){return pe},J_:function(){return Be},PO:function(){return Ce},pt:function(){return xt},tI:function(){return Se},RM:function(){return de},_R:function(){return ie},UQ:function(){return Oe},Xl:function(){return ye},DH:function(){return ze},KZ:function(){return le},Ql:function(){return vt},ZW:function(){return It},Y6:function(){return _e},EG:function(){return qe},YP:function(){return ot}});var T=e(29008),u=e.n(T),w=e(70958),j=e.n(w),y=e(12027),i=e.n(y),P=e(34180),k=e.n(P),n=e(93949),A=e.n(n),C=e(6270),E=e.n(C),s=e(28810),d=e.n(s),l=e(77701),a=e.n(l),r=e(28249),o=e.n(r),c=e(29861),t=e.n(c),m=e(14582),x=e.n(m),B=e(48510),b=e.n(B),O=e(30790),M=e.n(O),S=e(5672),L=e.n(S),R=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g)}(L()(Error)),F=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g)}(R),G=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g)}(R),$=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g)}(R),ee=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g)}(R),J=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g)}(R),Q=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g)}(R),ae=Symbol("skip-proxy"),H=Symbol("observer-descriptor-builder"),N=Symbol("observer-descriptor"),z=".",ue="__batch_update__",re=Symbol("AsyncComputedValue");function ce(h){return h.constructor.name==="AsyncFunction"}function le(h){return h?h.map(function(v){return Array.isArray(v)?v:typeof v=="string"?["/","./","../"].some(function(g){return v.startsWith(g)})?v:v.includes(z)?v.split(z):v.split("."):[]}):[]}function fe(){return{objectify:!0,async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0}}function V(){var h=arguments[0];if(typeof h!="function")throw new Error("computed getter must be a function");var v=[],g=Object.assign({},fe());if(arguments.length===1)v=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))g.depends=arguments[1];else if(k()(arguments[1])==="object")Object.assign(g,arguments[1]),g.depends=le(g.depends);else throw new ee;else arguments.length>=3&&(v=le(arguments[1]),Object.assign(g,arguments[2]),g.depends=v);g.async=g.async===!0||ce(h)||arguments.length>=2&&Array.isArray(arguments[1]);var f=function(){return t()({type:"computed",getter:h,options:g},N,!0)};return f[H]=!0,f}function U(h){return h?h.some(function(v){return typeof v=="string"?v.startsWith("./")||v.startsWith("../")||v.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(v):!0}):!1}function Z(h){return k()(h)==="object"&&h.hasOwnProperty("type")&&typeof h.type=="string"&&h.hasOwnProperty("getter")&&typeof h.getter=="function"&&h.hasOwnProperty("options")&&k()(h.options)==="object"}function ie(h){try{return h[ae]===!0}catch(v){}return!1}function se(h,v){if(h===v)return!0;if(h===null||v===null||k()(h)!==k()(v))return!1;if(k()(h)==="object"){if(Array.isArray(h)&&Array.isArray(v))return h.length!==v.length?!1:h.every(function(f,p){return se(f,v[p])});if(!Array.isArray(h)&&!Array.isArray(v)){var g=Object.keys(h);return g.length!==Object.keys(v).length?!1:g.every(function(f){return se(h[f],v[f])})}else return!1}return!1}function X(h){return toString.call(h)==="[object Map]"}function pe(h,v){return!h||!v||h.length!==v.length?!1:h.every(function(g,f){return g===v[f]})}function Be(h,v){var g=pe(h,v);return g?!0:h.length!==v.length?!1:h.every(function(f,p){return f==="*"?!0:f===v[p]})}function Ce(h){return h==null||k()(h)!=="object"?!1:Object.prototype.toString.call(h)==="[object Object]"}function me(h){return h&&k()(h)==="object"&&h.hasOwnProperty(re)}function Se(h){try{return!!h&&(k()(h)==="object"||typeof h=="function")&&typeof h.then=="function"&&typeof h.catch=="function"&&(h instanceof Promise||Object.prototype.toString.call(h)==="[object Promise]")}catch(v){return!1}}function xe(h){return typeof h=="function"&&h[H]===!0}function de(h){return k()(h)==="object"&&h!==null&&!("__isProxy"in h)}function ve(h,v){var g=h.get(v);if(g!==void 0)return g;var f=h.get(Number(v)||v);if(f!==void 0)return f}function Ee(h,v,g){if(!v||v.length===0)return h;for(var f,p=h,_=0;_<v.length;_++){var D=v[_];if(X(p))f=ve(p,D);else if(D in p)f=p[D];else{if(g!==void 0)return g;throw new Error("invalid state path: ".concat(v.join(".")))}p=f}return f}function ye(h){try{h[ae]=!0}catch(v){}return h}function _e(h,v,g,f){for(var p=h,_=v.length-1,D=0;D<v.length;D++){var W=v[D],K=X(p);if(D===_){if(f===!0){var te=K?ve(p,W):p[W];me(te)&&(p=te,W="value")}K?p.set(W,g):p[W]=g;return}var Y=K?ve(p,W):p[W];p=Y}}function Oe(h){return(h||["ROOT"]).map(function(v){return Array.isArray(v)?v.join("."):v}).join(z)}function Ne(){return Math.random().toString(36).slice(2)}function De(h,v,g){var f=h&&!h[0].startsWith("#");if(Array.isArray(v))return v;if(v==="self")return f?h:void 0;if(v==="root")return f?[]:void 0;if(v==="parent")return f?h.slice(0,-2):void 0;if(v==="current")return f?h.slice(0,-1):void 0;if(typeof v=="string")return v.startsWith("./")?f?[].concat(i()(h.slice(0,-1)),i()(v.slice(2).split(z))):void 0:v.startsWith("../")?f?De(h.slice(0,-1),v.slice(3),!0):void 0:v.startsWith("/")?v.replace(/^(\/)*/,"").split(z):f&&g?[].concat(i()(h.slice(0,-1)),i()(v.split(z))):v.split(z)}function $e(h,v){return v?v.map(function(g){return De(h,g)}).filter(function(g){return g!==void 0}):[]}function ct(h,v){var g="";return v.id?g=v.id:g=Oe(h),g}function qe(h,v,g){var f=h,p=v.length-1;v.forEach(function(_,D){var W=X(f);if(D===p){var K=W?f.get(_):f[_];k()(K)==="object"&&Object.assign(K,g);return}W?(f.has(_)||f.set(_,{}),f=f.get(_)):(_ in f||(f[_]={}),f=f[_])})}function et(h,v){function g(f,p){for(var _ in f){var D=f[_];typeof v=="function"&&v({value:D,key:_,parent:f,path:p.concat(_)}),k()(D)==="object"&&g(D,p.concat(_))}}g(h,[])}function it(h){return h}function pt(){var h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(v){setTimeout(v,h)})}function ze(h){var v=new Map;return h.forEach(function(g){var f=g.join(".");v.set(f,g)}),Array.from(v.values())}function It(h,v){return h.length>v.length?!1:h.every(function(g,f){return g===v[f]})}function mt(h,v){var g=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"none",f=[];return typeof h=="function"?f=v.collectDependencies(function(){return h(v.state)}):typeof h=="string"?f=[h.split(z)]:Array.isArray(h)?f=[i()(h)]:f=[],g!=="none"&&f.forEach(function(p){var _=v.peep(function(D){return Ee(D,p)});me(_)&&p.push(g==="all"?"*":"value")}),f}function vt(h,v){if(!v||v.length===0)return!1;for(var g,f=h,p=0;p<v.length;p++){var _=v[p],D=!1;if(X(f)){if(D=f.has(_),!D)return!1;g=ve(f,_)}else{if(D=_ in f,!D)return!1;g=f[_]}f=g}return!0}var ft=e(24325),ke=e.n(ft);function we(h,v){if(Array.isArray(h)){for(var g=i()(h),f=0;f<g.length;f++)g[f]=we(g[f],v);return g}else if(k()(h)==="object"){if(!v&&me(h))return h.value;var p=ke()({},h);for(var _ in p)p[_]=we(p[_],v);return p}return h}function xt(h){return h==null||typeof h=="string"||typeof h=="number"||typeof h=="boolean"}function ht(h){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof h=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(h)}var tt=function(h){a()(g,h);var v=o()(g);function g(f){var p;return A()(this,g),p=v.call(this),p.store=f,p}return E()(g,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(p){this.store.options.enableComputed=p}},{key:"create",value:function(){var p=Z(arguments[0])?arguments[0]:V.apply(void 0,arguments)();if(p.options.async&&!U(p.options.depends))throw new Q("The scope of the dynamic computed object must be the root state object or an absolute path");var _=p.options.scope;if(_===void 0)p.options.scope="ROOT";else if(!U([_]))throw new J("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(p)}},{key:"runGroup",value:function(){var f=j()(u()().mark(function _(D,W,K){return u()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,this.run(function(ne){return ne.group==D},W,K);case 2:return Y.abrupt("return",Y.sent);case 3:case"end":return Y.stop()}},_,this)}));function p(_,D,W){return f.apply(this,arguments)}return p}()},{key:"run",value:function(){var f=j()(u()().mark(function _(){var D=arguments,W=this,K,te,Y,ne,oe=arguments;return u()().wrap(function(Ie){for(;;)switch(Ie.prev=Ie.next){case 0:if(oe.length!=0){Ie.next=2;break}return Ie.abrupt("return",Promise.all(i()(this.values()).map(function(he){return he.run()})));case 2:return typeof oe[0]=="function"?K=oe[0]:typeof oe[0]=="string"&&(K=function(Me){return Me.id==D[0]}),te=Object.assign({},oe[1]),Y=Object.assign({wait:!1,timeout:0},oe[2]),ne={},Ie.abrupt("return",new Promise(function(he,Me){if(Y.wait){var be;te.onDone=function(je){var Le=je.id;if(ne[Le]=!0,Object.values(ne).every(function(Ue){return Ue}))return clearTimeout(be),!0},Y.timeout>0&&(be=setTimeout(function(){Me(new G)},Y.timeout))}Promise.all(i()(W.values()).filter(function(je){return K(je)?(ne[je.id]=!1,!0):!1}).map(function(je){return je.run(te)})),Y.wait||he()}));case 7:case"end":return Ie.stop()}},_,this)}));function p(){return f.apply(this,arguments)}return p}()},{key:"enableGroup",value:function(){var f=j()(u()().mark(function _(D){var W,K,te;return u()().wrap(function(ne){for(;;)switch(ne.prev=ne.next){case 0:W=x()(this.values());try{for(W.s();!(K=W.n()).done;)te=K.value,te.options.enable=D}catch(oe){W.e(oe)}finally{W.f()}case 2:case"end":return ne.stop()}},_,this)}));function p(_){return f.apply(this,arguments)}return p}()},{key:"delete",value:function(p){var _;return(_=this.get(p))===null||_===void 0||_.detach(),b()(M()(g.prototype),"delete",this).call(this,p)}},{key:"find",value:function(p){if(p){var _=Array.isArray(p)?p:p.split(z),D=x()(this.values()),W;try{for(D.s();!(W=D.n()).done;){var K=W.value;if(pe(K.path,_))return K}}catch(te){D.e(te)}finally{D.f()}}}}]),g}(L()(Map)),_t=e(69075);function gt(h){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",g=typeof h=="function"?h():h instanceof Error?h.stack:h;try{var f;(f=console)[v].apply(f,["[AutoStore] "].concat(i()(Array.isArray(g)?g:[g])))}catch(p){}}function Fe(h,v){var g=arguments.length>2&&arguments[2]!==void 0?arguments[2]:z,f=[];try{return typeof v=="function"&&(v=v.call(h,h)),f=Array.isArray(v)?v:typeof v=="string"?v.split(g):[],f.length>0?Ee(h,f):h}catch(p){return h}}var We=function(h){return h.Root="ROOT",h.Current="CURRENT",h.Parent="PARENT",h.Depends="DEPENDS",h.Self="SELF",h}({});function yt(h,v,g){var f=v==null?g:v;if(typeof f=="function")try{f=f.call(h.store,h)}catch(p){}return f==null?g==null?We.Current:g:f}function Ge(h,v,g,f){var p=h.store.state,_=h.store.options;if(typeof _.getRootScope=="function"){var D=_.getRootScope(h,{observerType:v,valuePath:g==null?void 0:g.path});D!==void 0&&(p=D)}var W=g||{},K=W.path,te=W.parentPath,Y=yt(h,f.scope,_.scope),ne=p;try{if(Y===We.Current)ne=Fe(p,te);else if(Y===We.Parent)ne=Fe(p,K.slice(0,K.length-2<0?0:K.length-2));else if(Y===We.Root)ne=p;else if(Y===We.Depends){var oe;ne=(oe=h.depends)===null||oe===void 0?void 0:oe.map(function(ge){return Fe(p,ge)})}else typeof Y=="string"?Y.startsWith("@")?ne=Ge(h,v,g,ke()(ke()({},f),{},{scope:Ge(h,v,ke()(ke()({},g),{},{path:Y.slice(1).split(z)}),ke()(ke()({},f),{},{scope:Y.slice(1)}))})):ne=Fe(p,De(h.path,Y)):Array.isArray(Y)&&(ne=Fe(p,Y))}catch(ge){_.log("Error while getting computed scope ".concat(h.toString(),": ").concat(ge.message),"error")}return ne}var Ze=function(){function h(v,g,f){A()(this,h),t()(this,"_path",void 0),t()(this,"_id",""),t()(this,"_initial",void 0),t()(this,"_value",void 0),t()(this,"_associated",!1),t()(this,"_attached",!1),t()(this,"_getter",void 0),t()(this,"_depends",[]),t()(this,"_options",void 0),t()(this,"_subscribers",[]),t()(this,"_strPath",void 0),this.store=v,this.descriptor=g,this.context=f,this._associated=f!==void 0,this._getter=g.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},g.options),this._id=this._options.id||(this._associated?Oe(f==null?void 0:f.path):Ne()),this._path=(f==null?void 0:f.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this._depends=$e(this._path,this._options.depends),this._onInitial()}return E()(h,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(g){this._options.enable=g}},{key:"group",get:function(){return this._options.group},set:function(g){this._options.group=g}},{key:"initial",get:function(){return this._initial},set:function(g){this._initial=g}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(g){this._depends=g}},{key:"getter",get:function(){return this._getter},set:function(g){this._getter=g}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(z)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?Ee(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(g){this._associated?_e(this.store.state,this._path,g):(this._value=g,this.store._notify({type:"set",path:this.path,value:g}))}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"update",value:function(g,f){var p=this;this.store.update(function(){p.value=g},f)}},{key:"silentUpdate",value:function(g){this.update(g,{silent:!0})}},{key:"watch",value:function(g,f){var p=this;return this.store.watch(this.getValueWatchPath(),function(_){g.call(p,_)},f)}},{key:"getValueWatchPath",value:function(){return this.path.join(z)}},{key:"emitStoreEvent",value:function(g,f){var p=this;setTimeout(function(){p.store.emit(g,f)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(g){}},{key:"attach",value:function(){var g=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(g.toString()," subscribed to ").concat(g.depends.map(function(f){return f.join(z)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(g){return g.off()}),this._attached=!1)}}]),h}(),Je=function(h){a()(g,h);var v=o()(g);function g(f,p,_){var D;return A()(this,g),D=v.call(this,f,p,_),D.store=f,D.descriptor=p,D.context=_,p.options.depends=$e(D.path,D.options.depends),D}return E()(g,[{key:"toString",value:function(){return"ComputedObject<".concat(Oe(this.path),">")}},{key:"isDisable",value:function(p){return!this.store.options.enableComputed||!this.enable&&p!==!0||p===!1}},{key:"run",value:function(p){throw new Error("Method not implemented.")}}]),g}(Ze),at=function(h){a()(g,h);var v=o()(g);function g(){return A()(this,g),v.apply(this,arguments)}return E()(g,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(p){var _=this,D=Object.assign({first:!1,changed:void 0},p),W=D.first,K=D.changed;if(!W&&this.isDisable(p==null?void 0:p.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!W&&this.store.log(function(){return"Run sync computed for : ".concat(_.toString())});var te=p?Object.assign({},this.options,p):this.options,Y=Ge(this,"computed",this.context,te),ne=te.initial;try{ne=this.getter.call(this,Y,{changed:K,first:W}),W&&(this.initial=ne),this.store.peep(function(){_.value=ne}),!W&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:ne,computedObject:this})}catch(oe){throw!W&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:oe,computedObject:this}),oe}}},{key:"collectDependencies",value:function(){var p=[],_=this.store.watch(function(D){p.push(D.path)},{operates:["get"]});this.run({first:!0}),_.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&p.push.apply(p,i()($e(this.path,this.options.depends))),this.depends=ze(p),this.attach()}},{key:"onDependsChange",value:function(p){this.run({changed:p})}}]),g}(Je);function Et(h,v,g,f,p){return g==="push"?function(){for(var _=v.length,D=arguments.length,W=new Array(D),K=0;K<D;K++)W[K]=arguments[K];var te=f.apply(v,W);if(v.length>_){var Y=Array.from({length:v.length-_},function(ne,oe){return oe+_});h({type:"insert",path:p,indexs:Y,value:W,oldValue:void 0,parentPath:p,parent:v})}return te}:g==="pop"?function(){var _=v.length,D=f.apply(v);return v.length==_-1&&h({type:"remove",path:p,indexs:[_-1],value:[D],oldValue:void 0,parentPath:p,parent:v}),D}:g==="splice"?function(_,D){for(var W=arguments.length,K=new Array(W>2?W-2:0),te=2;te<W;te++)K[te-2]=arguments[te];var Y=f.apply(v,[_,D].concat(K));if(Y.length>0){var ne=Array.from({length:Y.length},function(ge,Ie){return _+Ie});h({type:"remove",path:p,indexs:ne,value:Y,oldValue:void 0,parentPath:p,parent:v})}if(K.length>0){var oe=Array.from({length:K.length},function(ge,Ie){return _+Ie});h({type:"insert",path:p,indexs:oe,value:K,oldValue:void 0,parentPath:p,parent:v})}return Y}:g==="unshift"?function(){for(var _=v.length,D=arguments.length,W=new Array(D),K=0;K<D;K++)W[K]=arguments[K];var te=f.apply(v,W);if(v.length>_){var Y=Array.from({length:v.length-_},function(ne,oe){return oe});h({type:"insert",path:p,indexs:Y,value:W,oldValue:void 0,parentPath:p,parent:v})}return te}:g==="shift"?function(){var _=v.length,D=f.apply(v);return v.length==_-1&&h({type:"remove",path:p,indexs:[0],value:[D],oldValue:void 0,parentPath:p,parent:v}),D}:g==="fill"?function(_,D,W){var K=f.apply(v,[_,D,W]),te=D!=null?D:0,Y=W!=null?W:v.length,ne=Array.from({length:Y-te},function(ge,Ie){return Ie+te}),oe=Array.from({length:Y-te},function(){return _});return h({type:"update",path:p,indexs:ne,value:oe,oldValue:void 0,parentPath:p,parent:v}),K}:g==="concat"?function(){for(var _=v.length,D=arguments.length,W=new Array(D),K=0;K<D;K++)W[K]=arguments[K];var te=f.apply(v,W),Y=Array.from({length:W.length},function(ne,oe){return _+oe});return h({type:"insert",path:p,indexs:Y,value:W,oldValue:void 0,parentPath:p,parent:v}),te}:f}var He=Symbol("__NOTIFY__");function nt(h,v,g,f,p){if(ie(h)||k()(h)!=="object"||h===null)return h;if(g.has(h))return g.get(h);var _=new Proxy(h,{get:function(W,K,te){var Y=Reflect.get(W,K,te);if(typeof K!="string")return Y;var ne=[].concat(i()(v),[String(K)]);if(typeof Y=="function"||!Object.hasOwn(W,K))if(typeof Y=="function"){if(Array.isArray(W))return Et(p.notify,W,K,Y,v);if(!ie(Y)&&Object.hasOwn(W,K)){var oe=ne.join(".");try{if(f.has(oe)){var ge=[].concat(i()(f.keys()),[oe]);throw f.clear(),new $('The computed property "'.concat(oe,'" has a circular dependency, steps: ').concat(ge.join(" <- ")))}return f.set(oe,!0),p.createComputedObject(ne,Y,v,W)}finally{f.delete(oe)}}else return Y}else return Y;return p.notify({type:"get",path:ne,indexs:[],value:Y,oldValue:void 0,parentPath:v,parent:W}),nt(Y,ne,g,f,p)},set:function(W,K,te,Y){var ne=Reflect.get(W,K,Y),oe=Reflect.set(W,K,te,Y);if(K===He)return!0;if(oe&&K!==He&&te!==ne)if(Array.isArray(W))p.notify({type:"update",path:v,indexs:[Number(K)],value:te,oldValue:ne,parentPath:v,parent:W});else{var ge=[].concat(i()(v),[String(K)]);p.notify({type:"set",path:ge,indexs:[],value:te,oldValue:ne,parentPath:v,parent:W})}return oe},deleteProperty:function(W,K){var te=W[K],Y=[].concat(i()(v),[String(K)]),ne=Reflect.deleteProperty(W,K);return ne&&K!==He&&p.notify({type:"delete",path:Y,indexs:[],value:te,oldValue:void 0,parentPath:v,parent:W}),ne}});return g.set(h,_),_}function bt(h,v){var g=new Map,f=new WeakMap;return nt(h,[],f,g,v)}var Ct=e(28633),Ye=e.n(Ct),Ot=e(75396),Bt=e.n(Ot),St=e(21206);function Nt(h){return h instanceof Error?h:new Error(h)}var rt=function(h){a()(g,h);var v=o()(g);function g(){var f;A()(this,g);for(var p=arguments.length,_=new Array(p),D=0;D<p;D++)_[D]=arguments[D];return f=v.call.apply(v,[this].concat(_)),t()(d()(f),"_isComputedRunning",!1),t()(d()(f),"_defaultAbortController",null),t()(d()(f),"_userAbortController",void 0),f}return E()(g,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return b()(M()(g.prototype),"value",this)},set:function(p){Bt()(M()(g.prototype),"value",p,this,!0)}},{key:"onInitial",value:function(){var p=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(p.options.immediate===!0||p.options.immediate==="auto"&&p.options.initial===void 0)&&p.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var p=this;return Object.assign(t()(t()(t()(t()(t()(t()(t()(t()(t()({},re,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",ye(function(_){return p.store.computedObjects.run(p.id,Object.assign({},_))})),"cancel",ye(function(){p.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(p){var _=this,D=this.strPath,W=Object.keys(p).length;if(this.associated)this.store.update(function(te){qe(te,_.path,p)},{batch:W>1?D:!1});else{Object.assign(this.value,p);var K=W>1;Object.entries(p).forEach(function(te){var Y=Ye()(te,2),ne=Y[0],oe=Y[1],ge={type:"set",path:[_.strPath,ne],value:oe,parent:_.value};K&&(ge.reply=!0),_.store.operates.emit("".concat(_.strPath,".").concat(ne),ge)}),K&&this.store.operates.emit(D,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var f=j()(u()().mark(function _(D){var W=this,K,te,Y,ne,oe,ge;return u()().wrap(function(he){for(;;)switch(he.prev=he.next){case 0:if(K=D!=null?D:{},te=K.first,Y=te===void 0?!1:te,!this.isDisable(D==null?void 0:D.enable)){he.next=4;break}return this.store.log(function(){return"Async computed <".concat(W.toString(),"> is disabled")},"warn"),he.abrupt("return");case 4:if(!Y&&this.store.log(function(){return"Run async computed for : ".concat(W.toString())}),ne=D?Object.assign({},this.options,D):this.options,oe=Ge(this,"computed",this.context,ne),ge=ne.noReentry,!(ge&&this._isComputedRunning)){he.next=12;break}return this.store.log(function(){return"Reentry async computed: ".concat(W.toString())},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),he.abrupt("return");case 12:return this._isComputedRunning=!0,he.prev=13,he.next=16,this.executeGetter(oe,ne);case 16:return he.abrupt("return",he.sent);case 17:return he.prev=17,this._isComputedRunning=!1,he.finish(17);case 20:case"end":return he.stop()}},_,this,[[13,,17,20]])}));function p(_){return f.apply(this,arguments)}return p}()},{key:"createComputeProgressbar",value:function(p){var _=this,D=Object.assign({},p),W=D.max,K=W===void 0?100:W,te=D.min,Y=te===void 0?0:te,ne=D.value,oe=ne===void 0?0:ne;return this.updateComputedValue({progress:oe}),{value:function(Ie){Ie>K&&(Ie=K),Ie<Y&&(Ie=Y),_.updateComputedValue({progress:Ie})},end:function(){this.value(K)}}}},{key:"onDoneCallback",value:function(p,_,D,W,K,te){typeof p.onDone=="function"&&p.onDone.call(this,{id:this.id,path:this.path,value:te,error:_,abort:D,timeout:W,scope:K})}},{key:"getAbortController",value:function(p){if(p&&typeof p.abortController=="function"){var _=p.abortController();_&&_ instanceof AbortController&&(this._userAbortController=_)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(p,_,D){var W=this,K=D.timeout,te=Array.isArray(K)?K:[K,0],Y=Ye()(te,2),ne=Y[0],oe=ne===void 0?0:ne,ge=Y[1],Ie=ge===void 0?0:ge,he,Me;return oe>0&&(_.timeout=Ie>1?Ie:oe,Me=setTimeout(function(){p.hasTimeout=!0,p.hasError=!0,p.error="TIMEOUT",typeof p.timeoutCallback=="function"&&p.timeoutCallback(),clearInterval(he),W.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},oe),Ie>1&&(he=setInterval(function(){W.updateComputedValue({timeout:Ie--}),Ie===0&&clearInterval(he)},oe/(Ie+1)))),{clear:function(){clearTimeout(Me),clearInterval(he)},enable:oe>0}}},{key:"executeGetter",value:function(){var f=j()(u()().mark(function _(D,W){var K,te,Y,ne,oe,ge,Ie,he,Me,be,je,Le,Ue,Re,Ae,Te;return u()().wrap(function(Pe){for(;;)switch(Pe.prev=Pe.next){case 0:K=W.retry,te=K===void 0?[0,0]:K,Y=Array.isArray(te)?te:[Number(te),0],ne=Ye()(Y,2),oe=ne[0],ge=ne[1],he=this.getAbortController(W),Me={onTimeout:function(Ve){return Ie=Ve},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Ve){return Ve},cancel:he.abort,extras:W.extras,changed:W.changed,abortSignal:he.signal},be={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:Ie},he.signal.addEventListener("abort",function(){return be.hasAbort=!0}),je={clear:function(){},enable:!1},Ue=function(Ve){return Object.assign(be,Ve)},Re=0;case 9:if(!(Re<oe+1)){Pe.next=46;break}if(Ae={},Pe.prev=11,Te={loading:!0},be.hasError&&(Te.error=null),oe>0&&(Te.retry=Re>0?oe-Re+1:0),Re>0&&Ue({error:null,hasError:!1,hasTimeout:!1}),je=this.setTimeoutControl(be,Te,W),this.updateComputedValue(Te),!be.hasAbort){Pe.next=20;break}throw new F;case 20:return Pe.next=22,this.getter.call(this,D,Me);case 22:if(Le=Pe.sent,!be.hasAbort){Pe.next=25;break}throw new F;case 25:be.hasTimeout||(Ae.value=Le,je.enable&&(Ae.timeout=0)),Pe.next=33;break;case 28:Pe.prev=28,Pe.t0=Pe.catch(11),be.hasError=!0,be.error=Pe.t0,be.hasTimeout||(Ae.error=Nt(Pe.t0).message);case 33:return Pe.prev=33,je.clear(),Re===oe&&(be.hasTimeout&&(Ae.error=be.error),oe>0&&(Ae.retry=0)),Ae.loading=!1,this.updateComputedValue(Ae),Pe.finish(33);case 39:if(!be.hasError){Pe.next=43;break}if(!(oe>0&&ge>0&&Re<oe)){Pe.next=43;break}return Pe.next=43,(0,St.g)(ge);case 43:Re++,Pe.next=9;break;case 46:be.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):be.hasError||be.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:be.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:Le,computedObject:this}),this.onDoneCallback(W,be.error,be.hasAbort,be.hasTimeout,D,Le);case 48:case"end":return Pe.stop()}},_,this,[[11,28,33,39]])}));function p(_,D){return f.apply(this,arguments)}return p}()},{key:"onDependsChange",value:function(p){var _=this;this.store.log(function(){return"AsyncComputed<".concat(_.id,"> is running by depends ").concat(p.type,"/").concat(p.path.join(".")," changed ")}),this.run({changed:p})}},{key:"getValueWatchPath",value:function(){var p=this.path.join(z);return["".concat(p,".*"),p]}},{key:"getDepends",value:function(){var p=this,_=b()(M()(g.prototype),"getDepends",this).call(this);return _.map(function(D){if(D.length===0)return D;var W=x()(p.store.computedObjects.values()),K;try{for(W.s();!(K=W.n()).done;){var te=K.value;if(pe(te.path,D)&&te.async)return["".concat(D,".value")]}}catch(Y){W.e(Y)}finally{W.f()}return D})}}]),g}(Je);function ot(){var h=arguments[0],v=typeof arguments[1]=="function"?arguments[1]:function(){return!0},g=k()(arguments[1])==="object"?arguments[1]:arguments[2],f=Object.assign({depends:[],enable:!0,objectify:!0,filter:v},g),p=function(){return{type:"watch",getter:h,options:f}};return p[H]=!0,p}var ut=function(h){a()(g,h);var v=o()(g);function g(f){var p;return A()(this,g),p=v.call(this),t()(d()(p),"_watcher",{off:function(){}}),t()(d()(p),"_enable",!0),p.store=f,p}return E()(g,[{key:"enable",get:function(){return this._enable},set:function(p){this._enable=p}},{key:"set",value:function(p,_){return b()(M()(g.prototype),"size",this)==0&&this.createWacher(),b()(M()(g.prototype),"set",this).call(this,p,_)}},{key:"createWacher",value:function(){var p=this;this._watcher=this.store.watch("**",function(_){var D=_.path;if(p._enable){var W=Ee(p.store.state,D),K=x()(p.values()),te;try{for(K.s();!(te=K.n()).done;){var Y=te.value;Y.isMatched(D,W)&&Y.run(D,W)}}catch(ne){K.e(ne)}finally{K.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off(),this.createWacher()}},{key:"create",value:function(p,_,D){var W=ot(p,_,D),K=W();return this.store._createWatch(K)}},{key:"enableGroup",value:function(p){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,D=x()(this.values()),W;try{for(D.s();!(W=D.n()).done;){var K=W.value;K.options.group==p&&(K.options.enable=_)}}catch(te){D.e(te)}finally{D.f()}}}]),g}(L()(Map)),lt=function(h){a()(g,h);var v=o()(g);function g(f,p,_){var D;if(A()(this,g),D=v.call(this,f,p,_),t()(d()(D),"_cache",void 0),D.store=f,D.context=_,typeof D.options.filter!="function")throw new Error("watch options.filter must be a function");return D}return E()(g,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(p,_){return se(p,this.path)?!1:this.filter(p,_)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(p,_){if(!this.enable){this.store.options.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var D,W=(D=this.getter)===null||D===void 0?void 0:D.call(this,{path:p,value:_},this);this.value=W,this.emitStoreEvent("watch:done",{value:W,watchObject:this})}catch(K){this.emitStoreEvent("watch:error",{error:K,watchObject:this})}}}]),g}(Ze),dt=z;function st(h,v){if(!v||v==="**")return!0;var g=h.split(dt),f=v.split(dt);if(g.length!==f.length)return!1;for(var p=0;p<f.length;p++)if(f[p]!=="*"&&f[p]!==g[p])return!1;return!0}var Xe=function(){function h(){A()(this,h),t()(this,"_listeners",new Map)}return E()(h,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var g=this,f=arguments[0],p=arguments[1],_=arguments[2],D=p;return f==="**"?this.addHandler("*",D,_):String(f).includes("*")?(D=function(K,te){st(te,f)&&p(K,te)},this.addHandler("*",D,_)):this.addHandler(f,D,_),{off:function(){return g.off(f,D)}}}},{key:"addHandler",value:function(g,f,p){var _=this._listeners.get(g);_?p?_.unshift(f):_.push(f):this._listeners.set(g,[f])}},{key:"once",value:function(g,f){var p=this,_=function D(W,K){try{f(W,K)}finally{p.off(K,D)}};return this.on(g,_)}},{key:"off",value:function(g,f){String(g).includes("*")&&(g="*");var p=this._listeners.get(g);p&&(f?p.splice(p.indexOf(f)>>>0,1):this._listeners.set(g,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(g){return this.on("**",g)}},{key:"wait",value:function(){var g=this,f=k()(arguments[0]),p=f==="string"?arguments[0]:void 0,_=arguments[1]||0,D=f==="function"?f:void 0,W;return new Promise(function(K,te){var Y;p?Y=g.once(p,function(ne){clearTimeout(W),K(ne)}):typeof D=="function"&&(Y=g.onAny(function(ne,oe){var ge=D(oe,ne);ge!==!1&&(Y.off(),clearTimeout(W),K(ne))})),_>0&&(W=setTimeout(function(){Y.off(),te(new Error("timeout"))},_))})}},{key:"emit",value:function(g,f){var p=this._listeners.get("*");p&&p.slice().map(function(_){_(f,g)}),p=this._listeners.get(g),p&&p.slice().map(function(_){_(f,g)})}}]),h}();function Pt(h){var v;return xe(h)?v=h():typeof h=="function"&&(v={type:"computed",getter:h,options:Object.assign({},fe(),{async:ce(h)})}),v}var At=function(h){a()(g,h);var v=o()(g);function g(f,p){var _;return A()(this,g),_=v.call(this),t()(d()(_),"_data",void 0),t()(d()(_),"computedObjects",void 0),t()(d()(_),"watchObjects",void 0),t()(d()(_),"_operates",new Xe),t()(d()(_),"_options",void 0),t()(d()(_),"_silenting",!1),t()(d()(_),"_batching",!1),t()(d()(_),"_batchOperates",[]),t()(d()(_),"_peeping",!1),_._options=(0,_t.w)({id:Ne(),debug:!1,lazy:!1,enableComputed:!0,log:gt},p),_.computedObjects=new tt(d()(_)),_.watchObjects=new ut(d()(_)),_.subscribeCallbacks(),_._data=bt(f,{notify:_._notify.bind(d()(_)),createComputedObject:_.createObserverObject.bind(d()(_))}),_._options.lazy||et(_._data),_._options.debug&&k()(globalThis.__AUTO_STORES__)=="object"&&globalThis.__AUTO_STORES__.add(d()(_)),_.getSnap=_.getSnap.bind(d()(_)),_.watch=_.watch.bind(d()(_)),_.update=_.update.bind(d()(_)),_.peep=_.peep.bind(d()(_)),_.silentUpdate=_.silentUpdate.bind(d()(_)),_.batchUpdate=_.batchUpdate.bind(d()(_)),_.collectDependencies=_.collectDependencies.bind(d()(_)),_.trace=_.trace.bind(d()(_)),_.installExtends(),_.emit("load",d()(_)),_}return E()(g,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(p,_){this._options.debug&&this.options.log(p,_)}},{key:"installExtends",value:function(){var p=this,_=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(_)&&_.forEach(function(D){return typeof D=="function"&&D(p)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(p){this._peeping&&p.type=="get"||(this._batching&&this._batchOperates.push(p),!this._silenting&&this.operates.emit(p.path.join(z),p))}},{key:"watch",value:function(){var p=this,_=typeof arguments[0]=="function"||arguments[0]==="*",D=_?arguments[0]:arguments[1],W=function(Ae,Te){return function(Ke){if(Ae!=="*"){if(Ae==="write"){if(Ke.type==="get")return}else if(Ae==="read"){if(Ke.type!=="get")return}else if(Array.isArray(Ae)&&Ae.length>0&&!Ae.includes(Ke.type))return}if(!(typeof Te=="function"&&!Te(Ke)))try{p._peeping=!0,D(Ke)}finally{p._peeping=!1}}};if(_){var K=Object.assign({once:!1,operates:"write"},arguments[1]),te=K.operates,Y=K.filter,ne=W(te,Y);return this.operates.onAny(ne)}else{var oe=arguments[0],ge=Array.isArray(oe)?oe.map(function(Re){return typeof Re=="string"?Re:Re.join(z)}):[oe],Ie=Object.assign({once:!1,operates:"write"},arguments[2]),he=Ie.once,Me=Ie.operates,be=Ie.filter,je=he?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),Le=[],Ue=W(Me,be);return ge.forEach(function(Re){Le.push(je.call(p,Re,Ue))}),{off:function(){return Le.forEach(function(Ae){return Ae.off()})}}}}},{key:"createObserverObject",value:function(p,_,D,W){var K=Pt(_),te={path:p,value:_,parentPath:D,parent:W};if(K){if(K.type==="computed"){var Y=this._createComputed(K,te);return Y==null?void 0:Y.initial}else if(K.type==="watch"){var ne=this._createWatch(K,te);return ne==null?void 0:ne.initial}}else return _}},{key:"_createComputed",value:function(p,_){var D;return p.options.async?D=new rt(this,p,_):D=new at(this,p,_),D&&(D.silentUpdate(D.initial),D.options.objectify&&this.computedObjects.set(D.id,D),this.emit("computed:created",D)),D}},{key:"_createWatch",value:function(p,_){var D=new lt(this,p,_);return p.options.objectify&&this.watchObjects.set(D.id,D),this.emit("watch:created",D),D}},{key:"silentUpdate",value:function(p){this.update(p,{silent:!0})}},{key:"batchUpdate",value:function(p){this.update(p,{batch:!0})}},{key:"update",value:function(p,_){var D=this,W=Object.assign({},_),K=W.batch,te=K===void 0?!1:K,Y=W.reply,ne=Y===void 0?!0:Y,oe=W.silent,ge=oe===void 0?!1:oe,Ie=W.peep,he=Ie===void 0?!1:Ie;if(typeof p=="function"){ge&&(this._silenting=!0),te&&(this._batching=!0,this._silenting=!0),he&&(this._peeping=!0);try{var Me=p(this.state);if(te&&Se(Me))throw new Error("Batch update method can't be async function")}finally{if(this._silenting=!1,this._batching=!1,this._peeping=!1,this._batchOperates.length>0){var be=i()(this._batchOperates);this._batchOperates=[],ne&&be.forEach(function(Le){Le.reply=!0,D._notify(Le)});try{var je=te===!0?ue:String(te);this.operates.emit(je,{type:"batch",path:[je],value:be})}finally{this._batchOperates=[]}}}}else throw new Error("update method must provide a function argument")}},{key:"peep",value:function(){var p=arguments,_=this,D=typeof arguments[0]=="function"?function(){return p[0](_.state)}:function(){return Ee(_.state,Array.isArray(p[0])?p[0]:p[0].split(z))};this._peeping=!0;try{return D()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(p){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",D=[],W=this.watch(function(K){D.push(K.path)},{operates:_});try{p()}finally{W.off()}return ze(D)}},{key:"trace",value:function(p){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",D,W=this;return{stop:function(){return D&&D.off()},start:function(){var K=j()(u()().mark(function Y(ne){var oe;return u()().wrap(function(Ie){for(;;)switch(Ie.prev=Ie.next){case 0:return oe=[],Ie.abrupt("return",new Promise(function(he){D=W.watch(function(Me){oe.push(Me),ne&&ne(Me)&&(D.off(),he(oe))},{operates:_}),Promise.resolve(p()).finally(function(){typeof ne!="function"&&(D.off(),he(oe))})}));case 2:case"end":return Ie.stop()}},Y)}));function te(Y){return K.apply(this,arguments)}return te}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(p){var _=Object.assign({reserveAsync:!0},p),D=_.reserveAsync,W=_.entry;return we(W?Ee(this._data,W):this._data,D)}}]),g}(Xe)},11933:function(q,I,e){"use strict";e.r(I);var T=e(86714),u=e.n(T),w={};for(var j in T)j!=="default"&&(w[j]=function(y){return T[y]}.bind(0,j));e.d(I,w)},86714:function(){},77283:function(q,I,e){"use strict";e.d(I,{o:function(){return w}});var T=e(35170),u=e(92379);function w(j,y){var i=(0,u.useRef)();return i.current||(i.current=new T.n(j,y)),i.current}},44970:function(q,I,e){"use strict";e.r(I),e.d(I,{ASYNC_COMPUTED_VALUE:function(){return i.eg},AbortError:function(){return i._L},AsyncComputedObject:function(){return i.WE},AutoStore:function(){return i.M1},AutoStoreError:function(){return i.CD},BATCH_UPDATE_EVENT:function(){return i.up},ComputedObject:function(){return i.Xr},ComputedObjects:function(){return i.BG},CyleDependError:function(){return i.e2},EventEmitter:function(){return i.vp},InvalidComputedArgumentsError:function(){return i.FM},InvalidDependsError:function(){return i.y1},InvalidScopeError:function(){return i.MI},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return i.Q6},OBSERVER_DESCRIPTOR_FLAG:function(){return i.kF},ObserverObject:function(){return i.Rn},ObserverScopeRef:function(){return i.fR},PATH_DELIMITER:function(){return i.f7},ReactAutoStore:function(){return T.n},SKIP_PROXY_FLAG:function(){return i.QI},SyncComputedObject:function(){return i.X3},TimeoutError:function(){return i.W5},WatchObject:function(){return i.RY},WatchObjects:function(){return i.LG},calcDependPaths:function(){return i.Rh},computed:function(){return i.Fl},createStore:function(){return T.M},defineExtend:function(){return i.Ws},delay:function(){return i.gw},forEachObject:function(){return i.b0},getComputedId:function(){return i.tl},getDepends:function(){return i.if},getId:function(){return i.zv},getMapVal:function(){return i.ux},getSnap:function(){return i.kM},getSnapshot:function(){return i.vM},getVal:function(){return i.Jy},isAbsolutePath:function(){return i.O5},isAsyncComputedValue:function(){return i.Jq},isEq:function(){return i.vo},isEventMatched:function(){return i.c6},isMap:function(){return i._N},isObserverDescriptor:function(){return i.iI},isObserverDescriptorBuilder:function(){return i.vb},isPathEq:function(){return i.PH},isPathMatched:function(){return i.J_},isPlainObject:function(){return i.PO},isPrimitive:function(){return i.pt},isPromise:function(){return i.tI},isProxy:function(){return i.RM},isRaw:function(){return i._R},joinValuePath:function(){return i.UQ},markRaw:function(){return i.Xl},noRepeat:function(){return i.DH},normalizeDeps:function(){return i.KZ},pathIsExists:function(){return i.Ql},pathStartsWith:function(){return i.ZW},setVal:function(){return i.Y6},updateObjectVal:function(){return i.EG},useStore:function(){return y.o},watch:function(){return i.YP}});var T=e(35170),u=e(11933),w={};for(var j in u)["default","ReactAutoStore","createStore"].indexOf(j)<0&&(w[j]=function(P){return u[P]}.bind(0,j));e.d(I,w);var y=e(77283),i=e(99640)},35170:function(q,I,e){"use strict";e.d(I,{n:function(){return le},M:function(){return fe}});var T=e(6270),u=e.n(T),w=e(93949),j=e.n(w),y=e(28810),i=e.n(y),P=e(77701),k=e.n(P),n=e(28249),A=e.n(n),C=e(29861),E=e.n(C),s=e(99640),d=e(12027),l=e.n(d),a=e(24325),r=e.n(a),o=e(28633),c=e.n(o),t=e(92379);function m(V,U,Z,ie){if(!U)return V.state;var se;try{typeof U=="function"?se=U(V.state):Array.isArray(U)?se=(0,s.Jy)(V.state,U):se=(0,s.Jy)(V.state,U.split(s.f7)),Z&&(0,s.Jq)(se)&&(se=se.value)}catch(X){if(ie)return ie(X)}return se}function x(V){return function(){var U=arguments,Z=U.length>=1&&(Array.isArray(U[0])||typeof U[0]=="string"||typeof U[0]=="function")?U[0]:void 0,ie=U.length===2&&typeof U[1]=="function"?U[1]:void 0,se=U.length===2&&(typeof Z=="string"||Array.isArray(Z))&&typeof U[1]=="boolean"?U[1]:!1,X=(0,t.useState)(function(){return m(V,Z,se!==!0)}),pe=c()(X,2),Be=pe[0],Ce=pe[1],me=V.useDeps(Z,se===!0?"all":"value");(0,t.useEffect)(function(){var xe;return me.length===0?xe=V.watch(function(){Ce(r()({},V.state))}):xe=V.watch(me,function(){var de=m(V,Z);Ce((0,s.PO)(de)?r()({},de):Array.isArray(de)?l()(de):de)}),function(){return xe.off()}},[me]);var Se=(0,t.useCallback)(function(xe){Z?typeof Z=="string"?V.update(function(de){return(0,s.Y6)(de,Z.split(s.f7),xe)}):Array.isArray(Z)?V.update(function(de){return(0,s.Y6)(de,Z,xe)}):typeof Z=="function"&&ie&&V.update(function(de){return ie(xe,de)}):typeof xe=="function"&&V.update(function(de){return xe(de)},{batch:!0})},[Z]);return[Be,Se]}}function B(V){return function(U){var Z=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",ie=(0,t.useState)(function(){return(0,s.if)(U,V,Z)}),se=c()(ie,1),X=se[0];return X}}var b=e(651);function O(V,U,Z){var ie=Z.errorBoundary||V.options.signalErrorBoundary;return t.memo(function(){var se=V.useDeps(U),X=(0,t.useState)(null),pe=c()(X,2),Be=pe[0],Ce=pe[1],me=(0,t.useState)(function(){return m(V,U,!0,Ce)}),Se=c()(me,2),xe=Se[0],de=Se[1];return(0,t.useEffect)(function(){var ve=V.watch(se,function(){de(m(V,U,!0,Ce))});return function(){return ve.off()}},[se]),(0,b.jsx)(b.Fragment,{children:Be?(0,b.jsx)(ie,{error:Be}):String(xe)})},function(){return!0})}function M(V,U,Z,ie){var se=ie.errorBoundary||V.options.signalErrorBoundary;return t.memo(function(){var X=(0,t.useState)(null),pe=c()(X,2),Be=pe[0],Ce=pe[1],me=(0,t.useState)(function(){return m(V,Z,!1,Ce)}),Se=c()(me,2),xe=Se[0],de=Se[1],ve=(0,s.Jq)(xe),Ee=(0,t.useMemo)(function(){return ve?xe:{value:xe}},[xe]),ye=V.useDeps(Z,"none");return(0,t.useEffect)(function(){var _e=ve?"".concat(Array.isArray(Z)?Z.join(s.f7):Z,".*"):ye,Oe=V.watch(_e,function(Ne){var De=Ne.path,$e=Ne.value;de(ve?r()(r()({},xe),{},E()({},De[De.length-1],$e)):m(V,Z,!1,Ce))});return function(){return Oe.off()}},[ye]),(0,b.jsx)(b.Fragment,{children:Be?(0,b.jsx)(se,{error:Be}):U(Ee)})},function(){return!0})}function S(V,U,Z,ie){var se=ie.errorBoundary||V.options.signalErrorBoundary;return t.memo(function(){var X=(0,t.useState)(null),pe=c()(X,2),Be=pe[0],Ce=pe[1],me=(0,s.vb)(Z)?Z():Z,Se=(0,t.useState)(function(){try{if((0,s.iI)(me)){if(me.options.objectify=!1,me.type==="computed")return V.computedObjects.create(me);if(me.type==="watch")return V.watchObjects.create(me)}else{var Oe=(0,s.Fl)(me),Ne=Oe();return Ne.options.objectify=!1,V.computedObjects.create(Ne)}}catch(De){return Ce(De),null}}),xe=c()(Se,1),de=xe[0],ve=(0,t.useState)(function(){return de?de.async?de.value:{value:de.value}:{value:""}}),Ee=c()(ve,2),ye=Ee[0],_e=Ee[1];return(0,t.useEffect)(function(){var Oe={off:function(){}};return de&&(Oe=de.watch(function(Ne){if(!Ne.reply)try{if(de.type==="computed")if(de.async){var De=de;((0,s.PH)(Ne.path,De.path)||(0,s.PH)(Ne.path.slice(0,-1),De.path))&&_e(r()({},De.value))}else _e({value:de.value});else de.type==="watch"&&_e({value:de.value})}catch($e){Ce($e)}},{operates:"write"})),function(){return Oe.off()}},[me]),(0,b.jsx)(b.Fragment,{children:Be?(0,b.jsx)(se,{error:Be}):U(ye)})},function(){return!0})}function L(V){return function(){var U=arguments,Z=U.length>=1&&(typeof U[0]=="string"||typeof U[0]=="function")&&(!U[1]||(0,s.PO)(U[1]))?U[0]:void 0,ie=U.length>=2&&typeof U[0]=="function"&&(typeof U[1]=="string"||Array.isArray(U[1])||typeof U[1]=="function")?U[0]:void 0,se=U.length>=2&&typeof U[1]=="function"?U[1]:void 0,X=U.length>=2&&typeof U[0]=="function"&&(typeof U[1]=="string"||Array.isArray(U[1]))?U[1]:void 0,pe=Object.assign({},U.length>1&&(0,s.PO)(U[U.length-1])?U[U.length-1]:void 0),Be=Z?O(V,Z,pe):X?M(V,ie,X,pe):se?S(V,ie,se,pe):function(){return(0,b.jsx)(b.Fragment,{})};return(0,b.jsx)(Be,{})}}function R(V){var U=V;if(V){V.persist&&V.persist();var Z=V.currentTarget;Z&&V.type?Z.tagName==="INPUT"&&Z.type==="checkbox"?U=Z.checked:U=Z.value:V.nativeEvent&&V.target&&(U=V.target.value)}return U}function F(V){return function(){var U=arguments,Z=U.length>=1&&typeof U[0]=="string"?U[0]:void 0;if(!Z)throw new Error("Input bind must have at least one argument");var ie={};return ie.onChange=function(se){var X=R(se);(0,s.Y6)(V.state,Z.split(s.f7),X)},ie}}function G(V){return function(){var U=arguments,Z=U.length>=1?Array.isArray(U[0])?U[0]:typeof U[0]=="string"?U[0].split(s.f7):void 0:void 0,ie=U.length>=2&&typeof U[0]=="function"?U[0]:void 0,se=U.length>=2&&typeof U[1]=="function"?U[1]:void 0,X=(0,t.useCallback)(function(de,ve){return{value:ve,onChange:function(ye){var _e=R(ye);de?V.update(function(Oe){return(0,s.Y6)(Oe,Array.isArray(de)?de:de.split(s.f7),_e)}):se(_e,V.state)}}},[]),pe=(0,t.useCallback)(function(de,ve){var Ee={};return Object.entries(ve).forEach(function(ye){var _e=c()(ye,2),Oe=_e[0],Ne=_e[1];if((0,s.pt)(Ne)){var De=de?[].concat(l()(de),[Oe]):[Oe];Ee[Oe]=X(De,Ne)}}),Ee},[]),Be=(0,t.useState)(function(){if(typeof ie=="function")return X(void 0,ie(V.state));var de=Z?m(V,Z,!0):V.state;if((0,s.PO)(de))return pe(Z,de);if(typeof Z=="string")return X(Z,de);if(Array.isArray(Z))return X(Z.join(s.f7),de)}),Ce=c()(Be,2),me=Ce[0],Se=Ce[1],xe=V.useDeps(Z||ie);return(0,t.useEffect)(function(){var de;if(xe.length===0||U.length===0)de=V.watch(function(ye){var _e=ye.path,Oe=ye.value;_e.length===1&&(0,s.pt)(Oe)&&Se(r()(r()({},me),{},E()({},_e[0],X(_e[0],Oe))))});else if(xe.length>0){var ve=Z?m(V,Z,!0):void 0,Ee=(0,s.PO)(ve);Z&&Ee&&xe.length===1&&xe[0].push("*"),de=V.watch(xe,function(ye){var _e=ye.path,Oe=ye.value;if(typeof ie=="function"){var Ne=ie(V.state);Se(X(void 0,Ne))}else Se(Ee?r()(r()({},me),{},E()({},_e[_e.length-1],X(_e,Oe))):X(_e,Oe))})}return function(){return de.off()}},[xe]),me}}function $(V){var U=arguments;return function(){var Z=U[0],ie=U[1],se=U[2];(0,t.useEffect)(function(){var X=V.watch(Z,ie,se);return function(){return X.off()}},[])}}var ee=e(34180),J=e.n(ee),Q=Symbol("FAKE_BINDINGS");function ae(V,U){var Z={};return U instanceof Map?U.forEach(function(ie,se){Z[se]=Q}):Object.entries(U).forEach(function(ie){var se=c()(ie,1),X=se[0];Z[X]=Q}),Z}function H(V,U,Z){return{value:Z,onChange:function(se){var X=R(se);V.update(function(pe){return(0,s.Y6)(pe,U,X)})}}}function N(V,U,Z,ie,se){if(J()(V)!=="object"||V===null)return V;var X=U.length===0?"__ROOT__":U.join(".");if(Z.has(X))return Z.get(X);var pe=V;(Array.isArray(V)||(0,s.PO)(V))&&(pe=ae(ie,V));var Be=new Proxy(pe,{get:function(me,Se,xe){if(typeof Se!="string")return Reflect.get(me,Se,xe);var de=[].concat(l()(se),l()(U),[String(Se)]),ve=(0,s.Jy)(ie.state,de);return(0,s.pt)(ve)?H(ie,de,ve):(0,s.Jq)(ve)?H(ie,[].concat(l()(de),["value"]),ve):N(ve,de,Z,ie,se)}});return Z.set(X,Be),Be}function z(V,U){var Z=new Map;return N({},[],Z,V,U)}function ue(V){return function(){var U=arguments,Z=U.length>0?typeof U[0]=="string"?U[0].split(s.f7):Array.isArray(U[0])?U[0]:[]:[],ie=(0,t.useState)(function(){return V.getSnap({entry:Z})}),se=c()(ie,2),X=se[0],pe=se[1],Be=(0,t.useState)(function(){return z(V,Z)}),Ce=c()(Be,1),me=Ce[0];return(0,t.useSyncExternalStore)(function(Se){var xe=V.watch(function(de){var ve=de.path,Ee=de.value;if((0,s.ZW)(Z,ve)){var ye=ve.slice(Z.length);(0,s.Y6)(X,ye,Ee),(0,s.Y6)(me,[].concat(l()(ye),["value"]),Ee),pe(r()({},X)),Se()}});return function(){xe.off()}},function(){return X}),me}}var re=Symbol("empty");function ce(V){var U=arguments;return function(){var Z=U,ie=Z.length>0?typeof Z[0]=="string"?Z[0].split(s.f7):Array.isArray(Z[0])?Z[0]:[]:[],se=Z.length>1?Z[1]:{},X=(0,t.useRef)(!1),pe=(0,t.useRef)(),Be=(0,t.useRef)(null);return(0,t.useEffect)(function(){var Ce=Be.current;if(Ce){if(!X.current&&Ce){var me=V.getSnap({entry:ie});pe.current=new Map;var Se=Ce.querySelectorAll("input,textarea,select");Se.forEach(function(ve){var Ee=ve.name;if(Ee){var ye=[].concat(l()(ie),l()(Ee.split(s.f7))),_e=(0,s.Jy)(me,ye,re);_e!==re&&(ve.value=_e),pe.current.set(ye.join(s.f7),ve)}}),X.current=!0}var xe=V.watch(function(ve){var Ee=ve.path,ye=ve.value;if((0,s.ZW)(ie,Ee)){var _e=Ee.join(s.f7);if(pe.current.has(_e)){var Oe=pe.current.get(_e).value;Oe!==ye&&(pe.current.get(_e).value=ye)}}}),de=function(Ee){var ye=Ee.target,_e=ye.name;if(_e){var Oe=[].concat(l()(ie),l()(_e.split(s.f7))),Ne=ye.type=="checkbox"?ye.checked:ye.value;V.update(function(De){(0,s.Y6)(De,Oe,Ne)},{peep:!0})}};return Ce.addEventListener("input",de),function(){xe.off(),Ce.removeEventListener("input",de)}}},[ie]),{ref:Be}}}var le=function(V){k()(Z,V);var U=A()(Z);function Z(ie,se){var X;return j()(this,Z),X=U.call(this,ie,Object.assign({signalErrorBoundary:function(){return(0,b.jsx)(b.Fragment,{children:"ERROR"})}},se)),E()(i()(X),"useState",void 0),E()(i()(X),"useAsyncState",void 0),E()(i()(X),"useDeps",void 0),E()(i()(X),"$",void 0),E()(i()(X),"signal",void 0),E()(i()(X),"bind",void 0),E()(i()(X),"useInput",void 0),E()(i()(X),"useWatch",void 0),E()(i()(X),"useBindings",void 0),E()(i()(X),"useForm",void 0),X.signal=X.$=L(i()(X)).bind(i()(X)),X.useState=x(i()(X)).bind(i()(X)),X.useAsyncState=function(pe){return X.useState(pe,!0)[0]},X.useDeps=B(i()(X)).bind(i()(X)),X.useInput=G(i()(X)).bind(i()(X)),X.bind=F(i()(X)).bind(i()(X)),X.useWatch=$(i()(X)).bind(i()(X)),X.useBindings=ue(i()(X)).bind(i()(X)),X.useForm=ce(i()(X)).bind(i()(X)),X}return u()(Z)}(s.M1);function fe(V,U){return new le(V,U)}},60358:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(77643);const u=[]},19962:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(61668);const u=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},63611:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(28627);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
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
`,paraId:18,tocIndex:3},{value:"\u66F4\u591A\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:19,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:20,tocIndex:3},{value:"\u3002",paraId:19,tocIndex:3}]},58524:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(46267);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
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
`,paraId:58,tocIndex:16}]},77614:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(25231);const u=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
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
`,paraId:21,tocIndex:7},{value:"\u4F7F\u7528",paraId:22,tocIndex:7},{value:"computed",paraId:22,tocIndex:7},{value:"\u53EF\u4EE5\u8FDB\u884C\u66F4\u591A\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982",paraId:22,tocIndex:7},{value:"options",paraId:22,tocIndex:7},{value:"\u7B49\u3002",paraId:22,tocIndex:7},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:23,tocIndex:8},{value:"\uFF1A",paraId:23,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"PARENT",paraId:24,tocIndex:8},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:24,tocIndex:8},{value:"associated=true",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:24,tocIndex:8},{value:"obj.value",paraId:24,tocIndex:8},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:24,tocIndex:8},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:25,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:26,tocIndex:8},{value:"\u4F7F\u7528",paraId:27},{value:"computed(<getter>,<depends>,<options>)",paraId:27},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:27},{value:"getter",paraId:28},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:28},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:29},{value:"depends",paraId:28},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:28},{value:"\u4F9D\u8D56",paraId:30},{value:"options",paraId:28},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:28},{value:"\u9009\u9879",paraId:31}]},68258:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(83717);const u=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
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
`,paraId:25,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:26,tocIndex:5},{value:"./price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"./count",paraId:26,tocIndex:5},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:26,tocIndex:5},{value:"price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"count",paraId:26,tocIndex:5},{value:"\u5C5E\u6027\u3002",paraId:26,tocIndex:5},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:26,tocIndex:5},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:26,tocIndex:5}]},94957:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(76938);const u=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},15467:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(87480);const u=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"store.computedObjects",paraId:0,tocIndex:0},{value:"\u6765\u7BA1\u7406",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A",paraId:1,tocIndex:0},{value:"Map",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u662F\u4E00\u4E2A\u7C7B\uFF0C\u67E5\u770BAPI\u6587\u6863\u53EF\u4EE5\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\u3002",paraId:3}]},33989:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(15968);const u=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u652F\u6301",paraId:0,tocIndex:0},{value:"ComputedOptions",paraId:0,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u53C2\u6570\u6765\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`// \u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
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
`,paraId:48,tocIndex:14},{value:"\u7C7B\u578B",paraId:49,tocIndex:15},{value:"\uFF1A",paraId:49,tocIndex:15},{value:"(error:Error)=>void",paraId:49,tocIndex:15},{value:"\u5F53\u6267\u884C\u8BA1\u7B97",paraId:50,tocIndex:15},{value:"getter",paraId:50,tocIndex:15},{value:"\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03",paraId:50,tocIndex:15},{value:"\u7C7B\u578B",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:"(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void",paraId:51,tocIndex:16},{value:"\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u5B8C\u6210\u65F6\u7684\u56DE\u8C03",paraId:52,tocIndex:16}]},51289:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(49613);const u=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:0,tocIndex:0},{value:"\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:1,tocIndex:0},{value:"ComputedObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:0},{value:"ComputedObject",paraId:2,tocIndex:0},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:2,tocIndex:0},{value:"store.computedObjects",paraId:2,tocIndex:0},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:2,tocIndex:0},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"store.computedObjects.get(<id>).run()",paraId:3,tocIndex:1},{value:"\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:`import { createStore,computed } from '@autostorejs/react';
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
\u5F53\u4F7F\u7528`,paraId:11,tocIndex:3},{value:"computed",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"group",paraId:11,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:11,tocIndex:3},{value:"computed",paraId:12,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"enable",paraId:12,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:12,tocIndex:4},{value:"enable=false",paraId:12,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:12,tocIndex:4},{value:"enable=true",paraId:12,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:13,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:14,tocIndex:4},{value:"enable",paraId:14,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:14,tocIndex:4}]},48248:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(87975);const u=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
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
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},92205:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(48120);const u=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
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
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},35603:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(93359);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u9996\u5148\u9700\u8981\u5B89\u88C5",paraId:1,tocIndex:2},{value:"@autostorejs/devtools",paraId:1,tocIndex:2},{value:"\u548C",paraId:1,tocIndex:2},{value:"Redux DevTools Extension",paraId:1,tocIndex:2},{value:"\u3002",paraId:1,tocIndex:2},{value:`npm install  @autostorejs/devtools
`,paraId:2},{value:`yarn add @autostorejs/devtools
`,paraId:3},{value:`pnpm add @autostorejs/devtools
`,paraId:4},{value:"\u5728\u4F60\u7684\u9879\u76EE\u7684\u6700\u5F00\u59CB\u5904\u5BFC\u5165",paraId:5,tocIndex:3},{value:"@autostorejs/devtools",paraId:5,tocIndex:3},{value:"\u3002",paraId:5,tocIndex:3},{value:`//main.ts | app.ts | index.ts

import \`@autostorejs/devtools\`

`,paraId:6,tocIndex:3},{value:"\u7136\u540E\u5728\u521B\u5EFA",paraId:7,tocIndex:3},{value:"AutoStore",paraId:7,tocIndex:3},{value:"\u65F6,\u6307\u5B9A",paraId:7,tocIndex:3},{value:"debug=true",paraId:7,tocIndex:3},{value:"\u542F\u7528",paraId:8},{value:"debug=true",paraId:8},{value:"\u540E\uFF0C",paraId:8},{value:"AutoStore",paraId:8},{value:"\u4F1A\u81EA\u52A8\u8FDE\u63A5\u5230",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u3002",paraId:8},{value:"\u6BCF\u4E2A",paraId:8},{value:"Store",paraId:8},{value:"\u5747\u5177\u6709\u4E00\u4E2A",paraId:8},{value:"id",paraId:8},{value:"\uFF0C\u5982\u679C\u6CA1\u6709\u4F20\u5165\u5219\u4F1A\u968F\u673A\u751F\u6210\u3002\u5728\u4F7F\u7528",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A",paraId:8},{value:"store",paraId:8},{value:"\u53D6\u4E2A\u6709\u610F\u4E49\u7684\u540D\u79F0\u3002",paraId:8},{value:"\u73B0\u5728\uFF0C\u4F60\u53EF\u4EE5\u6253\u5F00",paraId:9,tocIndex:4},{value:"Redux DevTools Extension",paraId:9,tocIndex:4},{value:"\u67E5\u770B",paraId:9,tocIndex:4},{value:"AutoStore",paraId:9,tocIndex:4},{value:"\u7684\u72B6\u6001\u4E86\u3002",paraId:9,tocIndex:4},{value:"\u5355\u51FB\u4EE5\u4E0A\u793A\u4F8B\u4E2D\u7684",paraId:10},{value:"Age++",paraId:10},{value:"\u548C",paraId:10},{value:"Change lastName",paraId:10},{value:"\u6309\u94AE\uFF0C\u7136\u540E\u67E5\u770B",paraId:10},{value:"Redux DevTools Extension",paraId:10},{value:"\u4E2D\u7684\u72B6\u6001\u53D8\u5316\u3002",paraId:10},{value:"\u5728\u63A7\u5236\u53F0\u4F60\u8FD8\u53EF\u4EE5\u770B\u5230\u66F4\u591A\u7684\u8C03\u8BD5\u4FE1\u606F\u3002",paraId:10}]},86288:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(42246);const u=[{value:"\u7531\u4E8E\u72B6\u6001\u4E4B\u95F4\u53EF\u80FD\u5B58\u5728\u590D\u6742\u7684\u4F9D\u8D56\u8BA1\u7B97\u5173\u7CFB\uFF0C\u4E3A\u4E86\u66F4\u597D\u7684\u8C03\u8BD5\u72B6\u6001\u7684\u53D8\u5316\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"trace",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u5E2E\u52A9\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u64CD\u4F5C\u3002",paraId:0,tocIndex:0},{value:"trace",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type StateTracker= {
    stop:()=>void,
    start(isStop?:(operate:StateOperate)=>boolean):Promise<StateOperate[]>
}
trace(fn: SyncFunction,operates?:WatchListenerOptions['operates']):StateTracker { 
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
// \u5F00\u59CB\u8DDF\u8E2A
tracker.start((operate)=>{
  console.log(operate)
})  
// \u51FD\u6570\u6267\u884C\u5B8C\u6BD5\u65F6\u81EA\u52A8\u7ED3\u675F\u8DDF\u8E2A\uFF0C\u5F02\u6B65\u51FD\u6570\u53EF\u4EE5\u4F7F\u7528stop\u6765\u505C\u6B62\u8DDF\u8E2A
tracker.stop()  

`,paraId:3,tocIndex:1},{value:"\u5B9E\u9645\u4F53\u9A8C\u4E00\u4E0B\uFF1A",paraId:4,tocIndex:1}]},80870:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(76233);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useBindings",paraId:2,tocIndex:0}]},94226:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(97820);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},90342:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(12357);const u=[{value:"\u5982\u679C\u8981\u5BF9\u6DF1\u5C42\u5D4C\u5957\u7684\u5BF9\u8C61\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useBindings",paraId:0,tocIndex:0},{value:".",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1}]},23249:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(79247);const u=[{value:"useFrom",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u5B8C\u6574\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u4F7F\u5F97\u6536\u96C6\u6570\u636E\u53D8\u5F97\u66F4\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"useFrom",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type UseFormResult={
    ref: React.RefObject<HTMLFormElement>  
}
type UseFormOptions={}
interface UseFormType {
    (entry?: string | string[],options?:UseFormOptions): UseFormResult
}
`,paraId:2,tocIndex:0},{value:"useFrom",paraId:3,tocIndex:1},{value:"\u8FD4\u56DE\u4E00\u4E2A\u53EF\u4EE5\u7ED1\u5B9A\u5230",paraId:3,tocIndex:1},{value:"form",paraId:3,tocIndex:1},{value:"\u5143\u7D20\u7684\u5BF9\u8C61\uFF0C\u7136\u540E\u53EA\u9700\u8981\u5C06\u4E4B\u5E94\u7528\u5230",paraId:3,tocIndex:1},{value:"form",paraId:3,tocIndex:1},{value:"\u5143\u7D20\u4E0A\u5373\u53EF\u3002",paraId:3,tocIndex:1},{value:`const { state, useForm } = useStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }  
})

const myform = useForm()
<form {...myform}>
  <input name="user.firstName" />
  <input name="user.lastName" />
  <input name="user.age" />
  <input name="user.vip" />
</form>
`,paraId:4,tocIndex:1},{value:"\u5E94\u7528\u5230",paraId:5,tocIndex:1},{value:"form",paraId:5,tocIndex:1},{value:"\u5143\u7D20\u4E0A\u540E\uFF0C\u5C31\u53EF\u4EE5\u8F7B\u677E\u5B9E\u73B0",paraId:5,tocIndex:1},{value:"\u8868\u5355",paraId:5,tocIndex:1},{value:"\u4E0E",paraId:5,tocIndex:1},{value:"State",paraId:5,tocIndex:1},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u4E86\u3002",paraId:5,tocIndex:1},{value:"\u4EE5\u4E0B\u662F\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:6,tocIndex:1},{value:"useForm",paraId:7,tocIndex:2},{value:"\u7684\u5DE5\u4F5C\u539F\u7406\u5982\u4E0B\uFF1A",paraId:7,tocIndex:2},{value:"ref",paraId:8},{value:"useForm",paraId:9,tocIndex:3},{value:"\u8FD4\u56DE\u4E00\u4E2A",paraId:9,tocIndex:3},{value:"{ref,...}",paraId:9,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u5176\u4E2D",paraId:9,tocIndex:3},{value:"ref",paraId:9,tocIndex:3},{value:"\u662F\u4E00\u4E2A",paraId:9,tocIndex:3},{value:"React.RefObject<HTMLFormElement>",paraId:9,tocIndex:3},{value:"\u5BF9\u8C61\u3002\u5F53\u6211\u4EEC\u5728\u8868\u5355\u4E0A\u4F7F\u7528",paraId:9,tocIndex:3},{value:"{...myform}",paraId:9,tocIndex:3},{value:"\u65F6\uFF0C",paraId:9,tocIndex:3},{value:"ref",paraId:9,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u7ED1\u5B9A\u5230",paraId:9,tocIndex:3},{value:"form",paraId:9,tocIndex:3},{value:"\u5143\u7D20\u4E0A\u3002\u8FD9\u662F\u5DE5\u4F5C\u7684\u57FA\u7840\u3002",paraId:9,tocIndex:3},{value:"useForm",paraId:10,tocIndex:4},{value:"\u5185\u90E8\u7684",paraId:10,tocIndex:4},{value:"useEffect",paraId:10,tocIndex:4},{value:"\u4F1A\u81EA\u52A8\u521D\u59CB\u5316\u8868\u5355.",paraId:10,tocIndex:4},{value:"\u7531\u4E8E",paraId:11,tocIndex:4},{value:"ref",paraId:11,tocIndex:4},{value:"\u7ED1\u5B9A\u5230",paraId:11,tocIndex:4},{value:"form",paraId:11,tocIndex:4},{value:"\u5143\u7D20\u4E0A\uFF0C\u901A\u8FC7",paraId:11,tocIndex:4},{value:"ref.current",paraId:11,tocIndex:4},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230",paraId:11,tocIndex:4},{value:"form",paraId:11,tocIndex:4},{value:"\u5143\u7D20",paraId:11,tocIndex:4},{value:"\u7136\u540E\u901A\u8FC7",paraId:11,tocIndex:4},{value:"ref.current.querySelectorAll('input,textarea,select')",paraId:11,tocIndex:4},{value:"\u83B7\u53D6\u5230\u6240\u6709\u8868\u5355\u5185\u90E8\u7684",paraId:11,tocIndex:4},{value:"input",paraId:11,tocIndex:4},{value:",",paraId:11,tocIndex:4},{value:"textarea",paraId:11,tocIndex:4},{value:",",paraId:11,tocIndex:4},{value:"select",paraId:11,tocIndex:4},{value:"\u5143\u7D20",paraId:11,tocIndex:4},{value:"\u4F9D\u6B21\u904D\u5386\u8FD9\u4E9B\u5143\u7D20\uFF0C\u6839\u636E",paraId:11,tocIndex:4},{value:"name",paraId:11,tocIndex:4},{value:"\u5C5E\u6027\uFF0C\u4ECE",paraId:11,tocIndex:4},{value:"state",paraId:11,tocIndex:4},{value:"\u4E2D\u83B7\u53D6\u5BF9\u5E94\u7684\u503C\uFF0C\u5E76\u8BBE\u7F6E\u5230\u8868\u5355\u5143\u7D20\u4E0A\u3002",paraId:11,tocIndex:4},{value:"\u8981\u5B9E\u73B0\u53CC\u5411\u7ED1\u5B9A\uFF0C\u6211\u4EEC\u9700\u8981\uFF1A",paraId:12,tocIndex:5},{value:"\u76D1\u542C\u8868\u5355\u5143\u7D20\u7684",paraId:13,tocIndex:5},{value:"change",paraId:13,tocIndex:5},{value:"\u4E8B\u4EF6",paraId:13,tocIndex:5},{value:"\u7531\u4E8E\u8868\u5355\u4E8B\u4EF6",paraId:14,tocIndex:5},{value:"onchange",paraId:14,tocIndex:5},{value:"\u8FDB\u884C\u8FDB\u884C\u5192\u6CE1\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EA\u9700\u8981\u5728",paraId:14,tocIndex:5},{value:"form",paraId:14,tocIndex:5},{value:"\u5143\u7D20\u4E0A\u76D1\u542C",paraId:14,tocIndex:5},{value:"change",paraId:14,tocIndex:5},{value:"\u4E8B\u4EF6\u5373\u53EF\u3002",paraId:14,tocIndex:5},{value:"\u6240\u4EE5\u901A\u8FC7",paraId:15,tocIndex:5},{value:"ref.current.addEventListener('input',onChange)",paraId:15,tocIndex:5},{value:"\u5C31\u53EF\u4EE5\u5728\u8868\u5355\u5143\u7D20\u53D8\u5316\u65F6\u89E6\u53D1\u6355\u83B7\u5230",paraId:15,tocIndex:5},{value:"onChange",paraId:15,tocIndex:5},{value:"\u4E8B\u4EF6\u3002",paraId:15,tocIndex:5},{value:"\u7136\u540E\u5728",paraId:16,tocIndex:5},{value:"onChange",paraId:16,tocIndex:5},{value:"\u4E8B\u4EF6\u4E2D\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:16,tocIndex:5},{value:"event.target",paraId:16,tocIndex:5},{value:"\u83B7\u53D6\u5230\u8868\u5355\u5143\u7D20.",paraId:16,tocIndex:5},{value:"\u6700\u540E\u5C06\u8868\u5355\u5143\u7D20\u7684\u503C\u66F4\u65B0\u5230",paraId:17,tocIndex:5},{value:"state[event.target.name]",paraId:17,tocIndex:5},{value:"\u3002",paraId:17,tocIndex:5},{value:"\u76D1\u542C",paraId:18,tocIndex:5},{value:"state",paraId:18,tocIndex:5},{value:"\u7684\u53D8\u5316",paraId:18,tocIndex:5},{value:"\u4F7F\u7528",paraId:19,tocIndex:5},{value:"store.watch",paraId:19,tocIndex:5},{value:"\u76D1\u542C",paraId:19,tocIndex:5},{value:"state",paraId:19,tocIndex:5},{value:"\u7684\u53D8\u5316\uFF0C\u5F53",paraId:19,tocIndex:5},{value:"state",paraId:19,tocIndex:5},{value:"\u53D8\u5316\u65F6\uFF0C\u5C06\u6570\u636E\u66F4\u65B0\u5230",paraId:19,tocIndex:5},{value:"name=<path>",paraId:19,tocIndex:5},{value:"\u7684\u8868\u5355\u5143\u7D20\u4E0A\u5373\u53EF\u3002",paraId:19,tocIndex:5},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:20,tocIndex:6},{value:"useForm",paraId:20,tocIndex:6},{value:"\u57FA\u672C\u5DE5\u4F5C\u8FC7\u7A0B\uFF0C\u5176\u5B9E\u73B0\u6E90\u7801\u4E0D\u5230",paraId:20,tocIndex:6},{value:"50",paraId:20,tocIndex:6},{value:"\u884C.",paraId:20,tocIndex:6},{value:"\u5F53\u7136\uFF0C\u53CC\u5411\u7ED1\u5B9A\u6709\u4E00\u4E2A\u6F5C\u5728\u7684\u95EE\u9898\uFF0C\u5C31\u662F\u53EF\u80FD\u5BFC\u81F4\u5FAA\u73AF\u66F4\u65B0\uFF0C\u4F46\u662F",paraId:21,tocIndex:6},{value:"AutoStore",paraId:21,tocIndex:6},{value:"\u5185\u90E8\u5DF2\u7ECF\u5904\u7406\u4E86\u8FD9\u4E2A\u95EE\u9898\uFF0C\u6240\u4EE5\u4E0D\u7528\u62C5\u5FC3\u3002",paraId:21,tocIndex:6}]},13927:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(45889);const u=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useInput",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useInput(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useInput",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
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
`,paraId:6}]},86231:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(9159);const u=[]},26021:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(61077);const u=[]},27067:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(47315);const u=[]},72997:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(26916);const u=[{value:`npm install  @autostorejs/react
`,paraId:0},{value:`yarn add @autostorejs/react
`,paraId:1},{value:`pnpm add @autostorejs/react
`,paraId:2}]},42516:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(3694);const u=[]},679:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(4180);const u=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
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
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},86761:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(75690);const u=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},47864:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(8767);const u=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},57143:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(63518);const u=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
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
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},82919:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(35371);const u=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},89615:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(33358);const u=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},56126:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(23841);const u=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
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
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},51337:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(31363);const u=[]},32465:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(81897);const u=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF08\u57FA\u4E8E",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u5C01\u88C5\uFF09\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},80814:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(94451);const u=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},60726:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(61786);const u=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},37445:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(34450);const u=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
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
`,paraId:14,tocIndex:2}]},98041:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(22273);const u=[{value:"\u6839\u636E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684",paraId:0,tocIndex:0},{value:"\u57FA\u672C\u539F\u7406",paraId:1,tocIndex:0},{value:"\uFF0C\u5176\u5185\u7F6E\u4E86\u4E00\u4E2A\u72B6\u6001\u53D8\u5316\u4E8B\u4EF6\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:`\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002
\u901A\u8FC7\u4FA6\u542C\u4E8B\u4EF6\u5C31\u53EF\u4EE5\u4F7F\u7528`,paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:3,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.useWatch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"store",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:3,tocIndex:0}]},32982:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(66663);const u=[{value:"useWatch",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u7528\u6765\u4FA6\u542C",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\uFF0C\u672C\u8D28\u4E0A\u662F\u5BF9",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u7684\u5C01\u88C5\u3002",paraId:0,tocIndex:0},{value:"useWatch",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export interface UseWatchType {
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
`,paraId:5,tocIndex:0}]},65365:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(26826);const u=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6240\u6709\u5728\u72B6\u6001\u4E2D\u76F4\u63A5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u58F0\u660E\u7684\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u5E94",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:"\u4EE5\u4E0B\u662F\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF\u7684\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:2,tocIndex:0},{value:"\u540C",paraId:3,tocIndex:2},{value:"computed",paraId:3,tocIndex:2},{value:"\u4E00\u6837\uFF0C\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E",paraId:3,tocIndex:2},{value:"watch",paraId:3,tocIndex:2},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:3,tocIndex:2},{value:"store.watchObjects.create",paraId:3,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61",paraId:3,tocIndex:2},{value:"create",paraId:4,tocIndex:2},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:2},{value:`  create<Value=any,DependValue=any>(
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

`,paraId:7,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u76D1\u542C\u5BF9\u8C61\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684",paraId:9,tocIndex:2},{value:"associated=false",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u76D1\u542C\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:9,tocIndex:2},{value:"obj.value",paraId:9,tocIndex:2},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:9,tocIndex:2},{value:"\u540C",paraId:10,tocIndex:3},{value:"ComputedObject",paraId:10,tocIndex:3},{value:"\u4E00\u6837\uFF0C",paraId:10,tocIndex:3},{value:"WatchObject",paraId:10,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u624B\u52A8\u6267\u884C\uFF0C\u901A\u8FC7",paraId:10,tocIndex:3},{value:'store.watchObjects.get("<id>").run()',paraId:10,tocIndex:3},{value:"\u6765\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:10,tocIndex:3}]},89167:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(37686);const u=[{value:"@autostorejs/react",paraId:0,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:0,tocIndex:1},{value:"watch",paraId:0,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:0,tocIndex:1},{value:"state",paraId:0,tocIndex:1},{value:"\u4E2D\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5BF9\u8C61,\u7136\u540E\u76D1\u542C\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E\u6240\u5728\u8DEF\u5F84\u3002",paraId:0,tocIndex:1},{value:"watch",paraId:1,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:"\u5728\u72B6\u6001\u4E2D\u7684\u4EFB\u610F\u4F4D\u7F6E\uFF0C\u4F7F\u7528",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u6765\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5668\u5BF9\u8C61\u3002",paraId:2,tocIndex:1},{value:"\u5728",paraId:2,tocIndex:1},{value:"createStore",paraId:2,tocIndex:1},{value:"\u6267\u884C\u540E\uFF0C\u4F1A\u626B\u63CF\u72B6\u6001\u6570\u636E\uFF0C\u5982\u679C\u53D1\u73B0\u4E00\u4E2A\u503C\u662F",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:",\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u76D1\u542C",paraId:2,tocIndex:1},{value:"State",paraId:2,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:1},{value:"\u521B\u5EFA\u7684",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4F1A\u4FDD\u5B58\u5728",paraId:2,tocIndex:1},{value:"Store",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"watchObjects",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4E2D",paraId:2,tocIndex:1},{value:"\u5F53\u6240\u76D1\u542C\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u8C03\u7528",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"getter",paraId:2,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8FD4\u56DE\u7ED3\u679C\u5199\u5165\u5230\u58F0\u660E",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:1},{value:"watch",paraId:3,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:2},{value:`// \u76D1\u542Cfilter\u8FC7\u6EE4\u540E\u7684
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
`,paraId:18,tocIndex:5},{value:"\u8BF4\u660E\uFF1A",paraId:19,tocIndex:5},{value:"\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5B9E\u73B0\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u6765\u8868\u5355\u6574\u4E2A\u8868\u5355\u7684\u6709\u6548\uFF0C\u5F53\u72B6\u6001\u4E2D\u4EFB\u610F\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u7684",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u90FD\u4E3A",paraId:20,tocIndex:5},{value:"false",paraId:20,tocIndex:5},{value:"\u65F6\uFF0C\u5219",paraId:20,tocIndex:5},{value:"validate=false",paraId:20,tocIndex:5},{value:"\uFF0C\u5426\u5219\u4E3A",paraId:20,tocIndex:5},{value:"true",paraId:20,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5},{value:"\u73B0\u5728\u95EE\u9898\u662F",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u53EF\u80FD\u662F\u5728\u4E00\u4E2A\u590D\u6742\u7684\u5D4C\u5957\u5BF9\u8C61\u4E2D\uFF0C\u5E76\u4E14\u53EF\u80FD\u662F\u52A8\u6001\u7684\u3002\u8FD9\u65F6\u5019\uFF0C\u6211\u4EEC\u65E0\u6CD5\u4F7F\u7528",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u6765\u8FDB\u884C\u8BA1\u7B97\uFF0C\u56E0\u4E3A",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\u3002",paraId:20,tocIndex:5},{value:"\u6B64\u65F6\u5C31\u662F\u4F7F\u7528",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\u7684\u65F6\u5019\u4E86\uFF0C\u6211\u4EEC\u58F0\u660E\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u76D1\u542C\u6240\u6709\u8DEF\u5F84\u4E2D\u7684",paraId:20,tocIndex:5},{value:"path[path.length-1]=='validate'",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u7684\u53D8\u5316\u5373\u53EF\u3002",paraId:20,tocIndex:5},{value:"\u5173\u4E8E",paraId:20,tocIndex:5},{value:"WatchObject",paraId:20,tocIndex:5},{value:"\u7684\u4ECB\u7ECD\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:20,tocIndex:5},{value:"\u76D1\u542C\u5BF9\u8C61",paraId:21,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5}]},23989:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(73549);const u=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"watch",paraId:1,tocIndex:1},{value:"\u65B9\u6CD5\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`// \u76D1\u542C\u5168\u90E8
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
`,paraId:26,tocIndex:9},{value:"store.watch",paraId:27},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:27},{value:"State",paraId:27},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u5B9E\u73B0\u4E5F\u662F\u57FA\u4E8E",paraId:27},{value:"watch",paraId:27},{value:"\u65B9\u6CD5\u3002",paraId:27}]},36109:function(q,I,e){"use strict";e.r(I),e.d(I,{texts:function(){return u}});var T=e(43112);const u=[]}}]);
