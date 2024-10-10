(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[904],{1801:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(77643),z={}},44887:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return d}});var K=e(24325),o=e.n(K),z=e(29008),M=e.n(z),y=e(28633),p=e.n(y),j=e(70958),k=e.n(j),n=e(92379),P=e(61668),b=e(44970),C=e(2849),i=e(20927),d={"docs-exmaples-get-repos-demo-0":{component:n.memo(n.lazy(k()(M()().mark(function l(){var a,r,u,I,t,g,x,B,E,O,D,S,$,R,w;return M()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=L.sent,r=a.computed,u=a.createStore,L.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return I=L.sent,t=I.Input,g=I.Box,x=I.Button,L.next=13,Promise.resolve().then(e.bind(e,20927));case 13:return B=L.sent,E=B.api,O=u({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:r(function(){var q=k()(M()().mark(function H(J,N){var V,G,Q;return M()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return V=p()(J,1),G=V[0],Q=N.abortSignal,re.next=4,new Promise(function(le,T){Q.addEventListener("abort",function(){T("cancelled")}),E.getProjects(G).then(function(U){le(U)}).catch(function(U){T(U)})});case 4:case"end":return re.stop()}},H)}));return function(H,J){return q.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),D=O.state,S=O.bind,$=O.$,R=O.useState,w=O.useAsyncState,L.abrupt("return",{default:function(){var H=R("user.repo"),J=p()(H,1),N=J[0],V=w("user.projects");return n.createElement("div",null,n.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),n.createElement(t,o()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:N},S("user.repo"))),n.createElement(x,{onClick:function(){return D.user.projects.run()}},"\u91CD\u8BD5"),n.createElement(x,{onClick:function(){return D.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),n.createElement(g,null,n.createElement("table",{className:"projects-list"},n.createElement("thead",null,n.createElement("tr",null,n.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),n.createElement("td",null,n.createElement("b",null,"\u8BF4\u660E")),n.createElement("td",null,n.createElement("b",null,"\u661F")))),n.createElement("tbody",null,V.loading?n.createElement("tr",null,n.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):V.error?n.createElement("tr",null,n.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",V.error)):V.value&&V.value.map(function(G,Q){return n.createElement("tr",{key:Q},n.createElement("td",null,n.createElement("a",{href:G.url,target:"__blank"},G.name)),n.createElement("td",null,G.description),n.createElement("td",null,G.stars))})))))}});case 17:case"end":return L.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C,"autostore-docs":i},renderOpts:{compile:function(){var l=k()(M()().mark(function r(){var u,I=arguments;return M()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(39).then(e.bind(e,39039));case 2:return g.abrupt("return",(u=g.sent).default.apply(u,I));case 3:case"end":return g.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}}}},16960:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(28627),z={}},87524:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return i}});var K=e(24325),o=e.n(K),z=e(28633),M=e.n(z),y=e(29008),p=e.n(y),j=e(70958),k=e.n(j),n=e(92379),P=e(46267),b=e(44970),C=e(2849),i={"docs-guide-computed-async-demo-0":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D;return p()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.delay,r=l.createStore,u=l.computed,$.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return I=$.sent,t=I.Input,g=I.ColorBlock,x=r({user:{firstName:"Zhang",lastName:"Fisher",fullName:u(function(){var R=k()(p()().mark(function w(Z){return p()().wrap(function(q){for(;;)switch(q.prev=q.next){case 0:return q.next=2,a(1e3);case 2:return q.abrupt("return",Z.firstName+" "+Z.lastName);case 3:case"end":return q.stop()}},w)}));return function(w){return R.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),B=x.useAsyncState,E=x.useState,O=x.state,D=x.bind,$.abrupt("return",{default:function(){var w=E("user.firstName"),Z=M()(w,1),L=Z[0],q=E("user.lastName"),H=M()(q,1),J=H[0],N=B("user.fullName");return n.createElement(n.Fragment,null,n.createElement(t,o()({label:"firstName",value:L},D("user.firstName"))),n.createElement(t,o()({label:"lastName",value:J},D("user.lastName"))),n.createElement(g,{name:"FullName",loading:N.loading},N.value))}});case 13:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-1":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x;return p()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=E.sent,a=l.useStore,r=l.computed,u=l.delay,E.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return I=E.sent,t=I.ColorBlock,g=I.Button,x=I.JsonView,E.abrupt("return",{default:function(){var D=a({firstName:"Zhang",lastName:"Fisher",fullName:r(function(){var Z=k()(p()().mark(function L(q){return p()().wrap(function(J){for(;;)switch(J.prev=J.next){case 0:return J.next=2,u();case 2:if(!q.triggerError){J.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return J.abrupt("return",q.firstName+" "+q.lastName);case 5:case"end":return J.stop()}},L)}));return function(L){return Z.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),S=D.state,$=D.$,R=D.useAsyncState,w=R("fullName");return n.createElement("div",null,n.createElement(t,{name:"FirstName"},$("firstName")),n.createElement(t,{name:"FirstName"},$("lastName")),n.createElement(t,{name:"FullName",loading:w.loading},w.loading?"\u6B63\u5728\u8BA1\u7B97...":w.error?"ERROR:".concat(w.error):w.value),n.createElement("div",null,n.createElement(g,{onClick:function(){S.triggerError=!1,S.firstName=S.firstName+"\u{1F525}"}},"Change FirstName"),n.createElement(g,{onClick:function(){S.triggerError=!1,S.lastName=S.lastName+"\u2764\uFE0F"}},"Change LastName")),n.createElement("div",null,n.createElement(g,{onClick:function(){S.firstName=S.firstName+"\u{1F525}"}},"Change FirstName with Error"),n.createElement(g,{onClick:function(){S.triggerError=!0,S.lastName=S.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),n.createElement("div",null,"state.fullName=",n.createElement(x,null,JSON.stringify(w))))}});case 13:case"end":return E.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-2":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D,S,$,R,w;return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.delay,r=l.createStore,u=l.computed,I=l.ObserverScopeRef,L.next=9,Promise.resolve().then(e.bind(e,2849));case 9:return t=L.sent,g=t.JsonView,x=t.Button,B=t.Input,E=t.Loading,O=r({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:u(function(){var q=k()(p()().mark(function H(J,N){var V,G,Q,se,re;return p()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return V=M()(J,2),G=V[0],Q=V[1],se=N.getProgressbar,re=se(),T.abrupt("return",new Promise(function(){var U=k()(p()().mark(function Y(ce){var de;return p()().wrap(function(ie){for(;;)switch(ie.prev=ie.next){case 0:de=1;case 1:if(!(de<=100)){ie.next=8;break}return ie.next=4,a(20);case 4:re.value(de);case 5:de++,ie.next=1;break;case 8:re.end(),ce(G*Q);case 10:case"end":return ie.stop()}},Y)}));return function(Y){return U.apply(this,arguments)}}()));case 4:case"end":return T.stop()}},H)}));return function(H,J){return q.apply(this,arguments)}}(),["order.count","order.price"],{scope:I.Depends})}}),D=O.useState,S=O.state,$=O.$,R=O.bind,w=O.useAsyncState,L.abrupt("return",{default:function(){var H=D("order.count"),J=M()(H,1),N=J[0],V=w("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,S.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,S.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return S.order.count--}},"-"),n.createElement(B,o()({value:N},R("order.count"))),n.createElement(x,{onClick:function(){return S.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",null,V.loading?n.createElement(E,null):null,V.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(V.progress,"%"):V.error?"ERROR:".concat(V.error):V.value)))),n.createElement("div",null,n.createElement(g,null,JSON.stringify(S.order.total))))}});case 16:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-3":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D,S,$,R,w,Z;return p()().wrap(function(q){for(;;)switch(q.prev=q.next){case 0:return q.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=q.sent,a=l.createStore,r=l.computed,u=l.ObserverScopeRef,I=l.delay,q.next=9,Promise.resolve().then(e.bind(e,2849));case 9:return t=q.sent,g=t.Input,x=t.Button,B=t.Loading,E=t.JsonView,O=t.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var H=k()(p()().mark(function J(N){var V,G,Q;return p()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return V=M()(N,2),G=V[0],Q=V[1],re.next=3,I(5e3);case 3:return re.abrupt("return",G*Q);case 4:case"end":return re.stop()}},J)}));return function(J){return H.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:u.Depends})}}),S=D.useState,$=D.state,R=D.$,w=D.bind,Z=D.useAsyncState,q.abrupt("return",{default:function(){var J=S("order.count"),N=M()(J,1),V=N[0],G=Z("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,$.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,$.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return $.order.count--}},"-"),n.createElement(g,o()({value:V},w("order.count"))),n.createElement(x,{onClick:function(){return $.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",null,G.loading?n.createElement(B,null):null,G.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(G.timeout,"ms"):G.error?n.createElement(O,{text:"ERROR: {".concat(G.error,"}"),color:"red"}):null)))),n.createElement("div",null,n.createElement(E,null,JSON.stringify($.order.total))))}});case 17:case"end":return q.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-4":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D,S,$,R,w,Z;return p()().wrap(function(q){for(;;)switch(q.prev=q.next){case 0:return q.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=q.sent,a=l.createStore,r=l.computed,u=l.ObserverScopeRef,I=l.delay,q.next=9,Promise.resolve().then(e.bind(e,2849));case 9:return t=q.sent,g=t.Input,x=t.Button,B=t.Loading,E=t.JsonView,O=t.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var H=k()(p()().mark(function J(N){var V,G,Q;return p()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return V=M()(N,2),G=V[0],Q=V[1],re.next=3,I(6e3);case 3:return re.abrupt("return",G*Q);case 4:case"end":return re.stop()}},J)}));return function(J){return H.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:u.Depends})}}),S=D.useState,$=D.state,R=D.$,w=D.bind,Z=D.useAsyncState,q.abrupt("return",{default:function(){var J=S("order.count"),N=M()(J,1),V=N[0],G=Z("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,$.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,$.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return $.order.count--}},"-"),n.createElement(g,o()({value:V},w("order.count"))),n.createElement(x,{onClick:function(){return $.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},G.loading?n.createElement(B,null):null,G.loading?n.createElement(O,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(G.timeout,"}\u79D2"),color:"red"}):G.error?n.createElement(O,{text:"ERROR: {".concat(G.error,"}"),color:"red"}):null)))),n.createElement("div",null,n.createElement(E,null,JSON.stringify($.order.total))))}});case 17:case"end":return q.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-5":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D,S,$,R,w,Z;return p()().wrap(function(q){for(;;)switch(q.prev=q.next){case 0:return q.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=q.sent,a=l.createStore,r=l.computed,u=l.ObserverScopeRef,I=l.delay,q.next=9,Promise.resolve().then(e.bind(e,2849));case 9:return t=q.sent,g=t.Input,x=t.Button,B=t.Loading,E=t.JsonView,O=t.RichLabel,D=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var H=k()(p()().mark(function J(N){var V,G,Q;return p()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:return V=M()(N,2),G=V[0],Q=V[1],re.next=3,I();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return re.stop()}},J)}));return function(J){return H.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:u.Depends})}}),S=D.useState,$=D.state,R=D.$,w=D.bind,Z=D.useAsyncState,q.abrupt("return",{default:function(){var J=S("order.count"),N=M()(J,1),V=N[0],G=Z("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,$.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,$.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return $.order.count--}},"-"),n.createElement(g,o()({value:V},w("order.count"))),n.createElement(x,{onClick:function(){return $.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},G.loading?n.createElement(B,null):null,G.loading?n.createElement(O,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):G.error&&n.createElement(O,{text:"\u51FA\u9519: {".concat(G.error,"}"),color:"red"}),G.retry>0&&n.createElement(O,{text:"\u91CD\u8BD5: {".concat(G.retry,"}"),color:"red"}))))),n.createElement("div",null,n.createElement(E,null,JSON.stringify($.order.total))))}});case 17:case"end":return q.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-6":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D,S,$,R,w;return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.createStore,r=l.computed,u=l.ObserverScopeRef,L.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return I=L.sent,t=I.Input,g=I.Button,x=I.Loading,B=I.JsonView,E=I.RichLabel,O=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var q=k()(p()().mark(function H(J,N){var V,G,Q,se;return p()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return V=M()(J,2),G=V[0],Q=V[1],se=N.abortSignal,le.abrupt("return",new Promise(function(T,U){var Y=setTimeout(function(){T(G*Q)},1e6);se.addEventListener("abort",function(){clearTimeout(Y),U("cancelled")})}));case 3:case"end":return le.stop()}},H)}));return function(H,J){return q.apply(this,arguments)}}(),["order.count","order.price"],{scope:u.Depends})}}),D=O.useState,S=O.state,$=O.$,R=O.bind,w=O.useAsyncState,L.abrupt("return",{default:function(){var H=D("order.count"),J=M()(H,1),N=J[0],V=w("order.total");return n.createElement("div",null,n.createElement("table",{className:"table table-bordered table-striped"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4E66\u540D")),n.createElement("td",null,S.order.bookName)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u4EF7\u683C")),n.createElement("td",null,S.order.price)),n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u6570\u91CF")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},n.createElement(g,{onClick:function(){return S.order.count--}},"-"),n.createElement(t,o()({value:N},R("order.count"))),n.createElement(g,{onClick:function(){return S.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),n.createElement("tfoot",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("b",null,"\u603B\u4EF7")),n.createElement("td",{style:{display:"flex",alignItems:"center"}},V.loading?n.createElement(x,null):null,V.loading?n.createElement(E,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):V.error&&n.createElement(E,{text:"\u51FA\u9519: {".concat(V.error,"}"),color:"red"}),V.loading&&n.createElement(g,{onClick:function(){return V.cancel()}},"\u53D6\u6D88"))))),n.createElement("div",null,n.createElement(B,null,JSON.stringify(S.order.total))))}});case 16:case"end":return L.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-7":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x;return p()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=E.sent,a=l.createStore,E.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return r=E.sent,u=r.ColorBlock,I=r.Button,t=a({bookName:"ZhangFisher",price:100,count:3,total:function(){var O=k()(p()().mark(function S($){return p()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.abrupt("return",$.price*$.count);case 1:case"end":return w.stop()}},S)}));function D(S){return O.apply(this,arguments)}return D}()}),g=t.state,x=t.$,E.abrupt("return",{default:function(){return n.createElement("div",null,n.createElement(u,{name:"\u4E66\u540D"},x("bookName")),n.createElement(u,{name:"\u4EF7\u683C"},x("price")),n.createElement(u,{name:"\u6570\u91CF"},n.createElement(I,{onClick:function(){return g.count--}},"-"),x("count"),n.createElement(I,{onClick:function(){return g.count++}},"+")),n.createElement(u,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},x("total.value",{errorBoundary:function(S){var $=S.error;return n.createElement(n.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",$.message)}})),n.createElement(u,{name:"state.total"},String(g.total)))}});case 11:case"end":return E.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},60409:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return b}});var K=e(29008),o=e.n(K),z=e(28633),M=e.n(z),y=e(70958),p=e.n(y),j=e(92379),k=e(25231),n=e(44970),P=e(2849),b={"docs-guide-computed-create-demo-0":{component:j.memo(j.lazy(p()(o()().mark(function C(){var i,d,l,a,r,u,I;return o()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=g.sent,d=i.createStore,l=i.computed,g.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return a=g.sent,r=a.ColorBlock,u=a.Button,I=d({order:{price:100,count:3,total1:function(B){return B.price*B.count},total2:l(function(x){return x.price*x.count})}}),g.abrupt("return",{default:function(){var B=I.useState(),E=M()(B,2),O=E[0],D=E[1];return j.createElement("div",null,j.createElement(r,{name:"Price"},O.order.price),j.createElement(r,{name:"Count"},O.order.count),j.createElement(r,{name:"Total 1"},O.order.total1),j.createElement(r,{name:"Total 2"},O.order.total2),j.createElement(u,{onClick:function(){return D(function($){return $.order.count++})}},"Count++"))}});case 12:case"end":return g.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(o()().mark(function d(){var l,a=arguments;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}}}},71252:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(83717),z={}},87755:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(76938),j=e(44970),k=e(2849),n={"docs-guide-computed-getter-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u,I,t,g;return o()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=B.sent,C=b.createStore,i=b.computed,d=b.delay,B.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return l=B.sent,a=l.ColorBlock,r=l.Button,u=C({order:{price:100,count:3,total:i(function(){var E=M()(o()().mark(function O(D){return o()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,d(1e3);case 2:return $.abrupt("return",D.price*D.count);case 3:case"end":return $.stop()}},O)}));return function(O){return E.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),I=u.state,t=u.$,g=u.computedObjects,B.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",g.get("total")),y.createElement("div",null,y.createElement(a,{name:"price"},t("order.price")),y.createElement(a,{name:"count"},t("order.count")),y.createElement(a,{name:"Total"},t(function(O){var D=O.value,S=O.loading;return y.createElement("div",null,S?"\u8BA1\u7B97\u4E2D...":D+1e3)},"order.total")),y.createElement(r,{onClick:function(){return I.order.count++}},"Count++"),y.createElement(r,{onClick:function(){return g.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return B.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},18731:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return l}});var K=e(12027),o=e.n(K),z=e(34180),M=e.n(z),y=e(28633),p=e.n(y),j=e(29008),k=e.n(j),n=e(70958),P=e.n(n),b=e(92379),C=e(87480),i=e(44970),d=e(2849),l={"docs-guide-computed-objects-demo-0":{component:b.memo(b.lazy(P()(k()().mark(function a(){var r,u,I,t,g,x,B,E,O;return k()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return r=S.sent,u=r.createStore,I=r.computed,S.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return t=S.sent,g=t.Divider,x=t.ColorBlock,B=t.Button,E=0,O=u({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(R){return R.firstName+R.lastName+"".concat(++E)},fullName2:I(function(){var $=P()(k()().mark(function R(w){return k()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",w.firstName+w.lastName+"".concat(++E));case 1:case"end":return L.stop()}},R)}));return function(R){return $.apply(this,arguments)}}(),["./firstName","./lastName"])}}),S.abrupt("return",{default:function(){var R=O.useState(),w=p()(R,1),Z=w[0];return b.createElement("div",null,b.createElement(x,{name:"FirstName"},Z.user.firstName),b.createElement(x,{name:"lastName"},Z.user.lastName),b.createElement(x,{name:"FullName",value:Z.user.fullName}),b.createElement(x,{name:"FullName2",value:Z.user.fullName2.value}),b.createElement(g,null),b.createElement("div",null,"typeof(store.computedObjects)==",M()(O.computedObjects)),b.createElement("div",null,"store.computedObjects instanceof Map=",String(O.computedObjects instanceof Map)),b.createElement("div",null,"store.computedObjects.size=",O.computedObjects.size),b.createElement("div",null,"store.computedObjects.size=",O.computedObjects.size),b.createElement("div",null,"store.computedObjects.keys()=",o()(O.computedObjects.keys()).join(" , ")),b.createElement(B,{onClick:function(){return O.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),b.createElement(B,{onClick:function(){return O.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),b.createElement(B,{onClick:function(){return O.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return S.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":d},renderOpts:{compile:function(){var a=P()(k()().mark(function u(){var I,t=arguments;return k()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(39).then(e.bind(e,39039));case 2:return x.abrupt("return",(I=x.sent).default.apply(I,t));case 3:case"end":return x.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}}}},87336:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(15968),z={}},58217:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return i}});var K=e(24325),o=e.n(K),z=e(28633),M=e.n(z),y=e(29008),p=e.n(y),j=e(70958),k=e.n(j),n=e(92379),P=e(49613),b=e(44970),C=e(2849),i={"docs-guide-computed-run-demo-0":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O;return p()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=S.sent,a=l.createStore,r=l.computed,u=l.delay,S.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return I=S.sent,t=I.Divider,g=I.ColorBlock,x=I.Button,B=0,E={book:{name:"Zhang",count:4,price:100,total1:r(function(){var $=k()(p()().mark(function R(w){return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,u();case 2:return L.abrupt("return",w.count*w.price);case 3:case"end":return L.stop()}},R)}));return function(R){return $.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:r(function(){var $=k()(p()().mark(function R(w){return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,u();case 2:return L.abrupt("return",w.count*w.price);case 3:case"end":return L.stop()}},R)}));return function(R){return $.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:r(function(){var $=k()(p()().mark(function R(w){return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,u();case 2:return L.abrupt("return",w.count*w.price);case 3:case"end":return L.stop()}},R)}));return function(R){return $.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:r(function(){var $=k()(p()().mark(function R(w){return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,u();case 2:return L.abrupt("return",w.price/w.count);case 3:case"end":return L.stop()}},R)}));return function(R){return $.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:r(function(){var $=k()(p()().mark(function R(w){return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,u();case 2:return L.abrupt("return",w.price/w.count);case 3:case"end":return L.stop()}},R)}));return function(R){return $.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:r(function(){var $=k()(p()().mark(function R(w){return p()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,u();case 2:return L.abrupt("return",w.price/w.count);case 3:case"end":return L.stop()}},R)}));return function(R){return $.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},O=a(E),S.abrupt("return",{default:function(){var R=O.useState(),w=M()(R,1),Z=w[0];return n.createElement("div",null,n.createElement(t,{title:"Total Group"}),n.createElement(g,{name:"Total1",loading:Z.book.total1.loading},Z.book.total1.loading?"\u8BA1\u7B97\u4E2D...":Z.book.total1.value),n.createElement(g,{name:"Total2",loading:Z.book.total2.loading},Z.book.total2.loading?"\u8BA1\u7B97\u4E2D...":Z.book.total2.value),n.createElement(g,{name:"Total3",loading:Z.book.total3.loading},Z.book.total3.loading?"\u8BA1\u7B97\u4E2D...":Z.book.total3.value),n.createElement(x,{onClick:function(){return O.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),n.createElement(t,{title:"Average Group"}),n.createElement(g,{name:"Average1",loading:Z.book.average1.loading}," ",Z.book.average1.loading?"\u8BA1\u7B97\u4E2D...":Z.book.average1.value),n.createElement(g,{name:"Average2",loading:Z.book.average2.loading}," ",Z.book.average2.loading?"\u8BA1\u7B97\u4E2D...":Z.book.average2.value),n.createElement(g,{name:"Average3",loading:Z.book.average3.loading}," ",Z.book.average3.loading?"\u8BA1\u7B97\u4E2D...":Z.book.average3.value),n.createElement(x,{onClick:function(){return O.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return S.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-computed-run-demo-1":{component:n.memo(n.lazy(k()(p()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D,S,$,R;return p()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=Z.sent,a=l.createStore,r=l.computed,u=l.delay,Z.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return I=Z.sent,t=I.Divider,g=I.ColorBlock,x=I.Button,B=I.Input,E=0,O={book:{name:"Zhang",count:4,price:100,total1:r(function(){var L=k()(p()().mark(function q(H){return p()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,u();case 2:return N.abrupt("return",H.count*H.price);case 3:case"end":return N.stop()}},q)}));return function(q){return L.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:r(function(){var L=k()(p()().mark(function q(H){return p()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,u();case 2:return N.abrupt("return",H.count*H.price);case 3:case"end":return N.stop()}},q)}));return function(q){return L.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:r(function(){var L=k()(p()().mark(function q(H){return p()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,u();case 2:return N.abrupt("return",H.count*H.price);case 3:case"end":return N.stop()}},q)}));return function(q){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},D=a(O),S=D.useState,$=D.computedObjects,R=D.bind,Z.abrupt("return",{default:function(){var q=S(),H=M()(q,1),J=H[0];return n.createElement("div",null,n.createElement(g,{name:"BookName"},J.book.name),n.createElement(g,{name:"count"},n.createElement("div",{style:{display:"flex",alignItems:"center"}},n.createElement(x,{onClick:function(){return J.book.count--}},"-"),n.createElement(B,o()({value:J.book.count},R("book.count"))),n.createElement(x,{onClick:function(){return J.book.count++}},"+"))),n.createElement(g,{name:"price"}," ",n.createElement(B,o()({value:J.book.price},R("book.price")))),n.createElement(t,{title:"Total Group"}),n.createElement("table",{className:"table table-bordered"},n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,"Total1 ="),n.createElement("td",null,J.book.total1.loading?"\u8BA1\u7B97\u4E2D...":J.book.total1.value),n.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),n.createElement("tr",null,n.createElement("td",null,"Total2 ="),n.createElement("td",null,J.book.total2.loading?"\u8BA1\u7B97\u4E2D...":J.book.total2.value),n.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",n.createElement("input",{type:"checkbox",checked:$.get("book/total2")}),")")),n.createElement("tr",null,n.createElement("td",null,"Total3 ="),n.createElement("td",null,J.book.total3.loading?"\u8BA1\u7B97\u4E2D...":J.book.total3.value),n.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),n.createElement(x,{onClick:function(){return $.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return Z.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(p()().mark(function a(){var r,u=arguments;return p()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},87237:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(87975),j=e(44970),k=e(2849),n={"docs-guide-computed-scope-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=r.sent,C=b.ObserverScopeRef,i=b.useStore,r.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var I=i({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(x){return x.firstName+x.lastName}}},{scope:function(){return C.Current}}),t=I.state;return y.createElement("div",null,y.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-computed-scope-demo-1":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=r.sent,C=b.useStore,i=b.ObserverScopeRef,r.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return d=r.sent,l=d.ColorBlock,r.abrupt("return",{default:function(){var I=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(x){return x.user.firstName+x.user.lastName}}},{scope:i.Root}),t=I.state;return y.createElement("div",null,y.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return r.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-computed-scope-demo-2":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r;return o()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=I.sent,C=b.createStore,i=b.ObserverScopeRef,I.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return d=I.sent,l=d.ColorBlock,a=C({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(g){return g.user.firstName+g.user.lastName}}}},{scope:i.Parent}),r=a.state,I.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(l,{name:"FullName"},r.parent.user.fullName))}});case 11:case"end":return I.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-computed-scope-demo-3":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=u.sent,C=b.createStore,u.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=u.sent,d=i.ColorBlock,l=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),a=l.state,u.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return u.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-computed-scope-demo-4":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=u.sent,C=b.createStore,u.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=u.sent,d=i.ColorBlock,l=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),a=l.state,u.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(d,{name:"FullName"},a.user.fullName))}});case 10:case"end":return u.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-computed-scope-demo-5":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=t.sent,C=b.createStore,i=b.computed,d=b.ObserverScopeRef,t.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return l=t.sent,a=l.ColorBlock,r=C({user:{firstName:"Zhang",lastName:"Fisher",fullName:i(function(){var g=M()(o()().mark(function x(B){return o()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.abrupt("return",B[0]+B[1]);case 1:case"end":return O.stop()}},x)}));return function(x){return g.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:d.Depends})}}),u=r.state,t.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(a,{name:"FullName"},u.user.fullName.value))}});case 12:case"end":return t.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},46369:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return b}});var K=e(29008),o=e.n(K),z=e(28633),M=e.n(z),y=e(70958),p=e.n(y),j=e(92379),k=e(48120),n=e(44970),P=e(2849),b={"docs-guide-computed-sync-demo-0":{component:j.memo(j.lazy(p()(o()().mark(function C(){var i,d,l,a,r,u;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=t.sent,d=i.createStore,t.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return l=t.sent,a=l.ColorBlock,r=l.Button,u=d({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(x){return x.firstName+x.lastName}}}),t.abrupt("return",{default:function(){var x=u.useState(),B=M()(x,2),E=B[0],O=B[1];return j.createElement("div",null,j.createElement(a,{name:"First Name"},E.user.firstName),j.createElement(a,{name:"Last Name"},E.user.lastName),j.createElement(a,{name:"Full Name"},E.user.fullName),j.createElement(r,{onClick:function(){return O(function(S){return S.user.firstName="\u2764\uFE0F"+S.user.firstName})}},"Change First Name"),j.createElement(r,{onClick:function(){return O(function(S){return S.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return t.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(o()().mark(function d(){var l,a=arguments;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}},"docs-guide-computed-sync-demo-1":{component:j.memo(j.lazy(p()(o()().mark(function C(){var i,d,l,a,r;return o()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=I.sent,d=i.createStore,I.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return l=I.sent,a=l.Button,r=d({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(g){return g.price*g.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(g){return g.price*g.count}}],total:function(g){return g.books.reduce(function(x,B){return x+B.total},0)}}),I.abrupt("return",{default:function(){var g=r.useState(),x=M()(g,2),B=x[0],E=x[1];return j.createElement("table",{className:"table table-bordered table-hover"},j.createElement("thead",null,j.createElement("tr",null,j.createElement("th",null,"\u4E66\u540D"),j.createElement("th",null,"\u4F5C\u8005"),j.createElement("th",null,"\u5355\u4EF7"),j.createElement("th",null,"\u6570\u91CF"),j.createElement("th",null,"\u5C0F\u8BA1"))),j.createElement("tbody",null,B.books.map(function(O,D){return j.createElement("tr",{key:D},j.createElement("td",null,O.name),j.createElement("td",null,O.author),j.createElement("td",null,O.price),j.createElement("td",null,j.createElement(a,{onClick:function(){return r.state.books[D].count--}},"-"),O.count,j.createElement(a,{onClick:function(){return r.state.books[D].count++}},"+")),j.createElement("td",null,O.total))}),j.createElement("tr",null,j.createElement("td",{colSpan:4},"\u603B\u8BA1"),j.createElement("td",null,B.total))))}});case 10:case"end":return I.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(o()().mark(function d(){var l,a=arguments;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}}}},21037:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(93359),z={}},31996:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(76233),z={}},15274:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return i}});var K=e(29008),o=e.n(K),z=e(24325),M=e.n(z),y=e(28633),p=e.n(y),j=e(70958),k=e.n(j),n=e(92379),P=e(97820),b=e(44970),C=e(2849),i={"docs-guide-form-bind-demo-0":{component:n.memo(n.lazy(k()(o()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O;return o()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=S.sent,a=l.createStore,S.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return r=S.sent,u=r.ColorBlock,I=r.Button,t=r.Input,g=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(R){return R.firstName+R.lastName}}}),x=g.state,B=g.$,E=g.bind,O=g.useState,S.abrupt("return",{default:function(){var R=O("user.firstName"),w=p()(R,2),Z=w[0],L=w[1],q=O("user.lastName"),H=p()(q,2),J=H[0],N=H[1],V=O("user.vip"),G=p()(V,2),Q=G[0],se=G[1];return n.createElement("div",null,n.createElement(t,M()(M()({label:"First Name"},E("user.firstName")),{},{value:Z})),n.createElement(t,M()(M()({label:"last Name"},E("user.lastName")),{},{value:J})),n.createElement(t,M()(M()({type:"checkbox",label:"VIP"},E("user.vip")),{},{value:Q})),n.createElement(u,{name:"First Name"},B("user.firstName")),n.createElement(u,{name:"Last Name"},B("user.lastName")),n.createElement(u,{name:"Full Name"},B("user.fullName")),n.createElement(u,{name:"VIP"},B("user.vip")),n.createElement(I,{onClick:function(){L("Zhang"),N("Fisher")}},"Reset"))}});case 12:case"end":return S.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(o()().mark(function a(){var r,u=arguments;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},95668:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return b}});var K=e(29008),o=e.n(K),z=e(24325),M=e.n(z),y=e(70958),p=e.n(y),j=e(92379),k=e(36339),n=e(44970),P=e(2849),b={"docs-guide-form-bindings-demo-0":{component:j.memo(j.lazy(p()(o()().mark(function C(){var i,d,l,a,r,u;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=t.sent,d=i.useStore,t.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return l=t.sent,a=l.ColorBlock,r=l.Button,u=l.Input,t.abrupt("return",{default:function(){var x=d({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),B=x.state,E=x.$,O=x.useFormBindings,D=O();return j.createElement("div",null,j.createElement(u,M()({label:"First Name"},D.user.firstName)),j.createElement(u,M()({label:"last Name"},D.user.lastName)),j.createElement(u,M()({label:"Age"},D.user.age)),j.createElement(u,M()({type:"checkbox",label:"VIP"},D.user.vip)),j.createElement(a,{name:"First Name"},E("user.firstName")),j.createElement(a,{name:"Last Name"},E("user.lastName")),j.createElement(a,{name:"Age"},E("user.age")),j.createElement(a,{name:"VIP"},E("user.vip")),j.createElement(r,{onClick:function(){B.user.firstName="Zhang",B.user.lastName="Fisher",B.user.age=18,B.user.vip=!1}},"Reset"))}});case 11:case"end":return t.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-form-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(o()().mark(function d(){var l,a=arguments;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}}}},72433:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return i}});var K=e(28633),o=e.n(K),z=e(29008),M=e.n(z),y=e(24325),p=e.n(y),j=e(70958),k=e.n(j),n=e(92379),P=e(45889),b=e(44970),C=e(2849),i={"docs-guide-form-use-input-demo-0":{component:n.memo(n.lazy(k()(M()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D;return M()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.createStore,$.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return r=$.sent,u=r.ColorBlock,I=r.Button,t=r.Input,g=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),x=g.state,B=g.$,E=g.bind,O=g.useState,D=g.useInput,$.abrupt("return",{default:function(){var w=D("user.firstName"),Z=D("user.lastName"),L=D("user.vip"),q=D("user.job");return n.createElement("div",null,n.createElement(t,p()({label:"First Name"},w)),n.createElement(t,p()({label:"last Name"},Z)),n.createElement(t,p()({type:"checkbox",label:"VIP"},L)),n.createElement(u,{name:"Job"},n.createElement("select",p()({id:"job"},q),n.createElement("option",{value:"1"},"Engineer"),n.createElement("option",{value:"2"},"Doctor"),n.createElement("option",{value:"3"},"Teacher"))),n.createElement(u,{name:"First Name"},B("user.firstName")),n.createElement(u,{name:"Last Name"},B("user.lastName")),n.createElement(u,{name:"VIP"},B("user.vip")),n.createElement(u,{name:"Job"},B("user.job")),n.createElement(I,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useInput"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(M()().mark(function a(){var r,u=arguments;return M()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-1":{component:n.memo(n.lazy(k()(M()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O,D;return M()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=$.sent,a=l.createStore,$.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return r=$.sent,u=r.ColorBlock,I=r.Button,t=r.Input,g=a({user:{firstName:"Zhang",lastName:"Fisher"}}),x=g.state,B=g.$,E=g.bind,O=g.useState,D=g.useInput,$.abrupt("return",{default:function(){var w=D(function(Z){return Z.user.firstName+" "+Z.user.lastName},function(Z,L){var q=Z.split(/\s+/),H=o()(q,2),J=H[0],N=H[1];L.user.firstName=J,L.user.lastName=N});return n.createElement("div",null,n.createElement(t,p()({label:"FullName"},w)),n.createElement(u,{name:"First Name"},B("user.firstName")),n.createElement(u,{name:"Last Name"},B("user.lastName")),n.createElement(I,{onClick:function(){x.user.firstName="Zhang",x.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return $.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(M()().mark(function a(){var r,u=arguments;return M()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-2":{component:n.memo(n.lazy(k()(M()().mark(function d(){var l,a,r,u,I,t,g,x,B,E,O;return M()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=S.sent,a=l.createStore,S.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return r=S.sent,u=r.ColorBlock,I=r.Button,t=r.Input,g=a({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),x=g.state,B=g.$,E=g.bind,O=g.useInput,S.abrupt("return",{default:function(){var R=O("user");return n.createElement("div",null,n.createElement(t,p()({label:"First Name"},R.firstName)),n.createElement(t,p()({label:"last Name"},R.lastName)),n.createElement(t,p()({label:"Age"},R.age)),n.createElement(t,p()({type:"checkbox",label:"VIP"},R.vip)),n.createElement(u,{name:"First Name"},B("user.firstName")),n.createElement(u,{name:"Last Name"},B("user.lastName")),n.createElement(u,{name:"Age"},B("user.age")),n.createElement(u,{name:"VIP"},B("user.vip")),n.createElement(I,{onClick:function(){x.user.firstName="Zhang",x.user.lastName="Fisher",x.user.age=18,x.user.vip=!1}},"Reset"))}});case 12:case"end":return S.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(M()().mark(function a(){var r,u=arguments;return M()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-3":{component:n.memo(n.lazy(k()(M()().mark(function d(){var l,a,r,u,I,t;return M()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=x.sent,a=l.useStore,x.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return r=x.sent,u=r.ColorBlock,I=r.Button,t=r.Input,x.abrupt("return",{default:function(){var E=a({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),O=E.state,D=E.$,S=E.bind,$=E.useInput,R=$();return n.createElement("div",null,n.createElement(t,p()({label:"First Name"},R.firstName)),n.createElement(t,p()({label:"last Name"},R.lastName)),n.createElement(t,p()({label:"Age"},R.age)),n.createElement(t,p()({type:"checkbox",label:"VIP"},R.vip)),n.createElement(u,{name:"First Name"},D("firstName")),n.createElement(u,{name:"Last Name"},D("lastName")),n.createElement(u,{name:"Age"},D("age")),n.createElement(u,{name:"VIP"},D("vip")),n.createElement(I,{onClick:function(){O.firstName="Zhang",O.lastName="Fisher",O.age=18,O.vip=!1}},"Reset"))}});case 11:case"end":return x.stop()}},d)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":b,"x-react-components":C},renderOpts:{compile:function(){var d=k()(M()().mark(function a(){var r,u=arguments;return M()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(39).then(e.bind(e,39039));case 2:return t.abrupt("return",(r=t.sent).default.apply(r,u));case 3:case"end":return t.stop()}},a)}));function l(){return d.apply(this,arguments)}return l}()}}}},50090:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(9159),z={}},91775:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(61077),z={}},74905:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(47315),z={}},41344:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(26916),z={}},10117:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(3694),z={}},31837:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(4180),j=e(44970),k=e(2849),n={"docs-guide-signal-about-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=t.sent,C=b.createStore,t.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=t.sent,d=i.Button,l=i.ColorBlock,a=C({age:18}),r=a.state,u=a.$,t.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(l,null,"Age+Signal :",u("age")),y.createElement(l,null,"Age :",r.age),y.createElement(d,{onClick:function(){return r.age=r.age+1}},"+Age"))}});case 11:case"end":return t.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},11296:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(75690),z={}},14787:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(8767),j=e(44970),k=e(2849),n={"docs-guide-signal-computed-render-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=r.sent,C=b.useStore,r.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=r.sent,d=i.Button,l=i.ColorBlock,r.abrupt("return",{default:function(){var I=C({user:{age:18}}),t=I.state,g=I.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},g(function(x){var B=x.value;return y.createElement("div",null,B)},function(x){return x.user.age})),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-computed-render-demo-1":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=u.sent,C=b.useStore,i=b.computed,u.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return d=u.sent,l=d.Button,a=d.ColorBlock,u.abrupt("return",{default:function(){var t=C({user:{age:18}}),g=t.state,x=t.$;return y.createElement("div",null,y.createElement(a,{name:"Age"},x(function(B){var E=B.value;return y.createElement("div",null,E)},i(function(B){return B.user.age}))),y.createElement(l,{onClick:function(){return g.user.age++}},"+Age"))}});case 11:case"end":return u.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-computed-render-demo-2":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=t.sent,C=b.useStore,i=b.delay,d=b.computed,t.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,u=l.Loading,t.abrupt("return",{default:function(){var x=C({order:{price:10,count:1}}),B=x.state,E=x.$;return y.createElement("div",null,y.createElement(r,{name:"Price"},E("order.price")),y.createElement(r,{name:"Count"},E("order.count")),y.createElement(r,{name:"Total"},E(function(O){var D=O.value,S=O.loading;return y.createElement("div",null,S?y.createElement(u,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},d(function(){var O=M()(o()().mark(function D(S){return o()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,i(1e3);case 2:return R.abrupt("return",S.order.price*S.order.count);case 3:case"end":return R.stop()}},D)}));return function(D){return O.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),y.createElement(a,{onClick:function(){return B.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},14727:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(63518),j=e(44970),k=e(2849),n={"docs-guide-signal-custom-render-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=r.sent,C=b.useStore,r.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=r.sent,d=i.Button,l=i.ColorBlock,r.abrupt("return",{default:function(){var I=C({user:{age:18}}),t=I.state,g=I.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},g(function(x){var B=x.value;return y.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},y.createElement("span",{style:{flexGrow:1}},B),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return r.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-custom-render-demo-1":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r;return o()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=I.sent,C=b.useStore,i=b.delay,d=b.computed,I.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return l=I.sent,a=l.Button,r=l.ColorBlock,I.abrupt("return",{default:function(){var g=C({order:{price:100,count:1,total:d(function(){var D=M()(o()().mark(function S($){return o()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.next=2,i();case 2:return w.abrupt("return",$.price*$.count);case 3:case"end":return w.stop()}},S)}));return function(S){return D.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),x=g.state,B=g.$,E=g.useAsyncState,O=E("order.total");return y.createElement("div",null,y.createElement(r,{name:"Price"},B("order.price")),y.createElement(r,{name:"Count"},B("order.count")),y.createElement(r,{name:"Total",loading:O.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},B("order.total.value")),y.createElement(r,{name:"Total",loading:O.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},B("order.total")),y.createElement(a,{onClick:function(){return x.order.count++}},"+Count"))}});case 12:case"end":return I.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-custom-render-demo-2":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u,I,t;return o()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=x.sent,C=b.createStore,i=b.computed,d=b.delay,x.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return l=x.sent,a=l.Button,r=l.ColorBlock,u=C({order:{price:100,count:1,total:i(function(){var B=M()(o()().mark(function E(O){return o()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,d(2e3);case 2:return S.abrupt("return",O.price*O.count);case 3:case"end":return S.stop()}},E)}));return function(E){return B.apply(this,arguments)}}(),["./price","./count"])}}),I=u.state,t=u.$,x.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(r,{name:"Price"},t("order.price")),y.createElement(r,{name:"Count"},t("order.count")),y.createElement(r,{name:"Total"},t(function(E){var O=E.value,D=E.loading;return y.createElement(y.Fragment,null,D&&y.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!D&&y.createElement("span",null,O,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),y.createElement(a,{onClick:function(){return I.order.count++}},"Count++"))}});case 13:case"end":return x.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},67317:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(35371),z={}},5619:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(33358),j=e(44970),k=e(2849),n={"docs-guide-signal-state-render-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=r.sent,C=b.useStore,r.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=r.sent,d=i.Button,l=i.ColorBlock,r.abrupt("return",{default:function(){var I=C({user:{age:18}}),t=I.state,g=I.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},g("user.age")),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-state-render-demo-1":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u,I;return o()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=g.sent,C=b.createStore,g.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=g.sent,d=i.Button,l=i.ColorBlock,a=C({user:{firstName:"\u5F20",lastName:"\u4E09"}}),r=a.state,u=a.signal,I=a.$,g.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(l,{name:"FirstName"},I("user.firstName")),y.createElement(l,{name:"LastName"},I("user.lastName")),y.createElement(l,null,"FullName :",I(function(B){return B.user.firstName+" "+B.user.lastName})),y.createElement(d,{onClick:function(){return r.user.firstName=r.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),y.createElement(d,{onClick:function(){return r.user.lastName=r.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return g.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-state-render-demo-2":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u,I,t;return o()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=x.sent,C=b.createStore,i=b.delay,d=b.computed,x.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return l=x.sent,a=l.Button,r=l.ColorBlock,u=C({order:{price:100,count:1,total:d(function(){var B=M()(o()().mark(function E(O){return o()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,i(1e3);case 2:return S.abrupt("return",O.price*O.count);case 3:case"end":return S.stop()}},E)}));return function(E){return B.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),I=u.state,t=u.$,x.abrupt("return",{default:function(){return y.createElement("div",null,y.createElement(r,{name:"Price"},t("order.price")),y.createElement(r,{name:"Count"},t("order.count")),y.createElement(r,{name:"Total"},t("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),y.createElement(r,{name:"Total"},t("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),y.createElement(a,{onClick:function(){return I.order.count++}},"+Count"))}});case 13:case"end":return x.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},22234:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(23841),j=e(44970),k=e(2849),n={"docs-guide-signal-watch-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=r.sent,C=b.useStore,r.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=r.sent,d=i.Button,l=i.ColorBlock,r.abrupt("return",{default:function(){var I=C({user:{age:18}}),t=I.state,g=I.$;return y.createElement("div",null,y.createElement(l,{name:"Age"},g(function(x){var B=x.value;return y.createElement("div",null,B)},function(x){return x.user.age})),y.createElement(d,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return r.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-watch-demo-1":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=u.sent,C=b.useStore,i=b.computed,u.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return d=u.sent,l=d.Button,a=d.ColorBlock,u.abrupt("return",{default:function(){var t=C({user:{age:18}}),g=t.state,x=t.$;return y.createElement("div",null,y.createElement(a,{name:"Age"},x(function(B){var E=B.value;return y.createElement("div",null,E)},i(function(B){return B.user.age}))),y.createElement(l,{onClick:function(){return g.user.age++}},"+Age"))}});case 11:case"end":return u.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}},"docs-guide-signal-watch-demo-2":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=t.sent,C=b.useStore,i=b.delay,d=b.computed,t.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return l=t.sent,a=l.Button,r=l.ColorBlock,u=l.Loading,t.abrupt("return",{default:function(){var x=C({order:{price:10,count:1}}),B=x.state,E=x.$;return y.createElement("div",null,y.createElement(r,{name:"Price"},E("order.price")),y.createElement(r,{name:"Count"},E("order.count")),y.createElement(r,{name:"Total"},E(function(O){var D=O.value,S=O.loading;return y.createElement("div",null,S?y.createElement(u,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},d(function(){var O=M()(o()().mark(function D(S){return o()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,i(1e3);case 2:return R.abrupt("return",S.order.price*S.order.count);case 3:case"end":return R.stop()}},D)}));return function(D){return O.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),y.createElement(a,{onClick:function(){return B.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},83786:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(31363),z={}},16645:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(81897),z={}},77680:function(ee,c,e){"use strict";var K;e.r(c),e.d(c,{demos:function(){return C}});var o=e(29008),z=e.n(o),M=e(28633),y=e.n(M),p=e(70958),j=e.n(p),k=e(92379),n=e(94451),P=e(2849),b=e(44970),C={"docs-guide-store-render-demo-0":{component:k.memo(k.lazy(j()(z()().mark(function i(){var d,l,a,r,u,I,t,g,x,B,E,O;return z()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return d=S.sent,l=d.default,a=d.createContext,r=d.useContext,u=d.useState,S.next=9,Promise.resolve().then(e.bind(e,2849));case 9:return I=S.sent,t=I.ColorBlock,g=I.Button,x=I.Divider,B=a({firstName:"Zhang",lastName:"Fisher",age:18}),E=l.memo(function($){var R=r(B);return l.createElement(t,{name:"\u5B50\u7EC4\u4EF6:".concat($.name)},l.createElement("span",null,"Hello :",R.firstName," ",R.lastName))}),O=0,S.abrupt("return",{default:function(){var R=u({firstName:"Zhang",lastName:"Fisher",age:18}),w=y()(R,2),Z=w[0],L=w[1];return l.createElement(B.Provider,{value:Z},l.createElement(x,{title:"\u6839\u7EC4\u4EF6"}),l.createElement(t,{name:"FullName"},Z.firstName," ",Z.lastName),l.createElement(t,{name:"Age"},"Age :",Z.age),l.createElement(x,{title:"\u5B50\u7EC4\u4EF6"}),l.createElement(E,{name:"A"}),l.createElement(E,{name:"B"}),l.createElement(g,{onClick:function(){L({firstName:"Zhang",lastName:"Fisher",age:++O})}},"+Age"))}});case 17:case"end":return S.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{react:K||(K=e.t(k,2)),"x-react-components":P},renderOpts:{compile:function(){var i=j()(z()().mark(function l(){var a,r=arguments;return z()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(39).then(e.bind(e,39039));case 2:return I.abrupt("return",(a=I.sent).default.apply(a,r));case 3:case"end":return I.stop()}},l)}));function d(){return i.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-1":{component:k.memo(k.lazy(j()(z()().mark(function i(){var d,l,a,r,u,I,t,g,x,B,E,O;return z()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=S.sent,l=d.createStore,S.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=S.sent,r=a.default,S.next=10,Promise.resolve().then(e.bind(e,2849));case 10:return u=S.sent,I=u.ColorBlock,t=u.Button,g=u.Divider,x=l({firstName:"Zhang",lastName:"Fisher",age:18}),B=r.memo(function($){var R=x.useState("firstName"),w=y()(R,1),Z=w[0];return r.createElement(I,{name:"\u5B50\u7EC4\u4EF6:FirstName"},Z)}),E=r.memo(function($){var R=x.useState("lastName"),w=y()(R,1),Z=w[0];return r.createElement(I,{name:"\u5B50\u7EC4\u4EF6:lastName"},Z)}),O=0,S.abrupt("return",{default:function(){var R=x.useState("age"),w=y()(R,1),Z=w[0];return r.createElement(r.Fragment,null,r.createElement(g,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(I,{name:"FullName"},"Hello :",x.state.firstName," ",x.state.lastName),r.createElement(I,{name:"Age"},Z),r.createElement(g,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(B,null),r.createElement(E,null),r.createElement(t,{onClick:function(){return x.state.age=x.state.age+1}},"+Age"),r.createElement(t,{onClick:function(){return x.state.firstName=x.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return S.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,react:K||(K=e.t(k,2)),"x-react-components":P},renderOpts:{compile:function(){var i=j()(z()().mark(function l(){var a,r=arguments;return z()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(39).then(e.bind(e,39039));case 2:return I.abrupt("return",(a=I.sent).default.apply(a,r));case 3:case"end":return I.stop()}},l)}));function d(){return i.apply(this,arguments)}return d}()}},"docs-guide-store-render-demo-2":{component:k.memo(k.lazy(j()(z()().mark(function i(){var d,l,a,r,u,I,t,g,x,B,E,O,D,S;return z()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return d=R.sent,l=d.createStore,R.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=R.sent,r=a.default,R.next=10,Promise.resolve().then(e.bind(e,2849));case 10:return u=R.sent,I=u.ColorBlock,t=u.Button,g=u.Divider,x=l({firstName:"Zhang",lastName:"Fisher",age:18}),B=x.state,E=x.$,O=function(){return r.createElement(I,{name:"\u5B50\u7EC4\u4EF6:FirstName"},E("firstName"))},D=function(){return r.createElement(I,{name:"\u5B50\u7EC4\u4EF6:LastName"},E("lastName"))},S=0,R.abrupt("return",{default:function(){return r.createElement(r.Fragment,null,r.createElement(g,{title:"\u6839\u7EC4\u4EF6"}),r.createElement(I,{name:"FullName"},E("firstName")," ",E("lastName")),r.createElement(I,{name:"Age"},E("age")," - ",++S),r.createElement(g,{title:"\u5B50\u7EC4\u4EF6"}),r.createElement(O,null),r.createElement(D,null),r.createElement(t,{onClick:function(){return B.age=B.age+1}},"+Age"),r.createElement(t,{onClick:function(){return B.firstName=B.firstName+"."}},"Change FirstName"),r.createElement(t,{onClick:function(){return B.lastName=B.lastName+"*"}},"Change LastName"))}});case 19:case"end":return R.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":b,react:K||(K=e.t(k,2)),"x-react-components":P},renderOpts:{compile:function(){var i=j()(z()().mark(function l(){var a,r=arguments;return z()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(39).then(e.bind(e,39039));case 2:return I.abrupt("return",(a=I.sent).default.apply(a,r));case 3:case"end":return I.stop()}},l)}));function d(){return i.apply(this,arguments)}return d}()}}}},33788:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return b}});var K=e(28633),o=e.n(K),z=e(29008),M=e.n(z),y=e(70958),p=e.n(y),j=e(92379),k=e(61786),n=e(44970),P=e(2849),b={"docs-guide-store-state-demo-0":{component:j.memo(j.lazy(p()(M()().mark(function C(){var i,d,l,a,r,u,I,t,g,x;return M()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=E.sent,d=i.createStore,l=i.computed,E.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return a=E.sent,r=a.Button,u=a.ColorBlock,I=d({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(D){return D.firstName+D.lastName},salary:l(function(){var O=p()(M()().mark(function D(S){return M()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.abrupt("return",S.age*10);case 1:case"end":return R.stop()}},D)}));return function(D){return O.apply(this,arguments)}}(),["age"])}),t=I.state,g=I.useState,x=I.$,globalThis.state=t,E.abrupt("return",{default:function(){var D=g("age"),S=o()(D,2),$=S[0],R=S[1],w=g("salary"),Z=o()(w,2),L=Z[0],q=Z[1],H=g(function(G){return G.lastName},function(G,Q){return Q.lastName=G}),J=o()(H,2),N=J[0],V=J[1];return j.createElement("div",null,j.createElement(u,null,"Fullname :",t.firstName," ",N),j.createElement(u,null,"Age :",$),j.createElement(u,null,"Salary: ",x("salary")),j.createElement(r,{onClick:function(){return R($+1)}},"+Age"),j.createElement(r,{onClick:function(){return V(N+".")}},"Change lastName"))}});case 13:case"end":return E.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(M()().mark(function d(){var l,a=arguments;return M()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}},"docs-guide-store-state-demo-1":{component:j.memo(j.lazy(p()(M()().mark(function C(){var i,d,l,a,r,u,I,t,g,x;return M()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=E.sent,d=i.createStore,E.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return l=E.sent,a=l.ColorBlock,E.next=10,Promise.resolve().then(e.bind(e,2849));case 10:return r=E.sent,u=r.Button,I=d({firstName:"Zhang",lastName:"Fisher",fullName:function(D){return D.firstName+D.lastName}}),t=I.useState,g=I.state,x=I.$,E.abrupt("return",{default:function(){var D=t(function(H){return H.firstName},function(H,J){return J.firstName=H}),S=o()(D,2),$=S[0],R=S[1],w=t(function(H){return H.fullName},function(H,J){var N=o()(H,2),V=N[0],G=N[1];J.firstName=V,J.lastName=G}),Z=o()(w,2),L=Z[0],q=Z[1];return j.createElement("div",null,j.createElement(a,{name:"FullName",value:L}),j.createElement(u,{onClick:function(){return R("<".concat($,">"))}},"Change FirstName"),j.createElement(u,{onClick:function(){return q(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return E.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(M()().mark(function d(){var l,a=arguments;return M()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}},"docs-guide-store-state-demo-2":{component:j.memo(j.lazy(p()(M()().mark(function C(){var i,d,l,a,r,u,I,t;return M()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=x.sent,d=i.createStore,x.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return l=x.sent,a=l.Button,r=l.ColorBlock,u=d({age:18}),I=u.state,t=u.$,x.abrupt("return",{default:function(){return j.createElement("div",null,j.createElement(r,null,"Age+Signal :",t("age")),j.createElement(r,null,"Age :",I.age),j.createElement(a,{onClick:function(){return I.age=I.age+1}},"+Age"))}});case 11:case"end":return x.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(M()().mark(function d(){var l,a=arguments;return M()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}}}},85244:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return n}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(92379),p=e(34450),j=e(44970),k=e(2849),n={"docs-guide-store-demo-0":{component:y.memo(y.lazy(M()(o()().mark(function P(){var b,C,i,d,l,a,r,u,I;return o()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return b=g.sent,C=b.useStore,g.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return i=g.sent,d=i.Button,l=i.ColorBlock,g.abrupt("return",{default:function(){var B=C({count:18}),E=B.state,O=B.$;return y.createElement("div",null,y.createElement(l,{name:"Count"},O("count")),y.createElement(d,{onClick:function(){return E.count++}},"Count++"))}});case 11:case"end":return g.stop()}},P)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":j,"x-react-components":k},renderOpts:{compile:function(){var P=M()(o()().mark(function C(){var i,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(39).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,d));case 3:case"end":return a.stop()}},C)}));function b(){return P.apply(this,arguments)}return b}()}}}},26992:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(22273),z={}},33463:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(66663),z={}},45988:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return l}});var K=e(29008),o=e.n(K),z=e(12027),M=e.n(z),y=e(34180),p=e.n(y),j=e(24325),k=e.n(j),n=e(70958),P=e.n(n),b=e(92379),C=e(26826),i=e(44970),d=e(2849),l={"docs-guide-watch-objects-demo-0":{component:b.memo(b.lazy(P()(o()().mark(function a(){var r,u,I,t,g,x,B,E,O,D,S,$,R,w;return o()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return r=L.sent,u=r.createStore,I=r.watch,L.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return t=L.sent,g=t.Divider,x=t.ColorBlock,B=t.Button,E=t.Box,O=t.Input,D=u({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(H){return H.firstName+" "+H.lastName},dirty:I(function(q,H){var J=q.path,N=q.value;return H.cache[J.join(".")]=!0,!0},function(q){return["firstName","lastName"].includes(q[q.length-1])},{initial:!1})}}),S=D.state,$=D.useFormBindings,R=D.watchObjects,w=D.$,L.abrupt("return",{default:function(){var H=$("user");return b.createElement("div",null,b.createElement(O,k()({label:"FirstName"},H.firstName)),b.createElement(O,k()({label:"lastName"},H.lastName)),b.createElement(g,null),b.createElement(E,null,b.createElement(x,{name:"FullName"},w("user.fullName")),b.createElement(x,{name:"Dirty"},w("user.dirty")),b.createElement(B,{onClick:function(){S.user.firstName="Zhang",S.user.lastName="Fisher",R.get("user.dirty").reset()}},"Reset")),b.createElement(E,null,b.createElement("div",null,"typeof(store.watchObjects)==",p()(R)),b.createElement("div",null,"store.watchObjects.size=",R.size),b.createElement("div",null,"store.watchObjects.size=",R.size),b.createElement("div",null,"store.watchObjects.keys()=",M()(R.keys()).join(" , "))))}});case 15:case"end":return L.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Box,Input } from "x-react-components"

 const { state,useFormBindings,watchObjects,$  } = createStore({
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
  const bindings = useFormBindings('user')
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u7F16\u8F91firstName\u6216lastName,\u4F1A\u89E6\u53D1dirty\u7684\u53D8\u5316",title:"\u4F7F\u7528watch\u529F\u80FD\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF"},context:{"@autostorejs/react":i,"x-react-components":d},renderOpts:{compile:function(){var a=P()(o()().mark(function u(){var I,t=arguments;return o()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,e.e(39).then(e.bind(e,39039));case 2:return x.abrupt("return",(I=x.sent).default.apply(I,t));case 3:case"end":return x.stop()}},u)}));function r(){return a.apply(this,arguments)}return r}()}}}},54915:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return b}});var K=e(29008),o=e.n(K),z=e(28633),M=e.n(z),y=e(70958),p=e.n(y),j=e(92379),k=e(37686),n=e(44970),P=e(2849),b={"docs-guide-watch-state-demo-0":{component:j.memo(j.lazy(p()(o()().mark(function C(){var i,d,l,a,r,u,I,t,g;return o()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=B.sent,d=i.createStore,l=i.watch,B.next=7,Promise.resolve().then(e.bind(e,2849));case 7:return a=B.sent,r=a.Input,u=a.Button,I=d({orders:[{name:"AutoStore\u5B9E\u6218\u6307\u5357",price:100,count:1,total:function(O){return O.price*O.count}},{name:"\u6DF1\u5165\u6D45\u51FAAutoStore",price:98,count:1,total:function(O){return O.price*O.count}}],total:l(function(E){return t.orders.reduce(function(O,D){return O+D.count*D.price},0)},function(E){return E[E.length-1]==="count"},{initial:198})}),t=I.state,g=I.useState,B.abrupt("return",{default:function(){var O=g(),D=M()(O,1),S=D[0];return j.createElement("table",{className:"table"},j.createElement("thead",null,j.createElement("tr",null,j.createElement("th",null,"Name"),j.createElement("th",null,"Price"),j.createElement("th",null,"Count"),j.createElement("th",null,"Total"))),j.createElement("tbody",null,S.orders.map(function($,R){return j.createElement("tr",{key:R},j.createElement("td",null,$.name),j.createElement("td",null,$.price),j.createElement("td",null,j.createElement(u,{onClick:function(){return $.count--}},"-"),j.createElement(r,{value:$.count,style:{display:"inline-flex"}}),j.createElement(u,{onClick:function(){return $.count++}},"+")),j.createElement("td",null,$.total))}),j.createElement("tr",null,j.createElement("td",{colSpan:3},"Total"),j.createElement("td",null,t.total))))}});case 12:case"end":return B.stop()}},C)})))),asset:{type:"BLOCK",id:"docs-guide-watch-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":n,"x-react-components":P},renderOpts:{compile:function(){var C=p()(o()().mark(function d(){var l,a=arguments;return o()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,e.e(39).then(e.bind(e,39039));case 2:return u.abrupt("return",(l=u.sent).default.apply(l,a));case 3:case"end":return u.stop()}},d)}));function i(){return C.apply(this,arguments)}return i}()}}}},14097:function(ee,c,e){"use strict";var K;e.r(c),e.d(c,{demos:function(){return d}});var o=e(24325),z=e.n(o),M=e(29008),y=e.n(M),p=e(28633),j=e.n(p),k=e(70958),n=e.n(k),P=e(92379),b=e(73549),C=e(44970),i=e(2849),d={"docs-guide-watch-store-demo-0":{component:P.memo(P.lazy(n()(y()().mark(function l(){var a,r,u,I,t,g,x,B,E,O,D,S,$,R,w,Z,L;return y()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=H.sent,r=a.createStore,u=a.computed,I=a.useStore,H.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return t=H.sent,g=t.Box,x=t.Button,B=t.ColorBlock,E=t.Layout,O=t.CheckBox,H.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return D=H.sent,S=D.useEffect,$=D.useRef,R=r({order:{price:10,count:2,total:u(function(J){return J.price*J.count})}}),w=R.state,Z=R.watch,L=R.$,H.abrupt("return",{default:function(){var N=$(),V=I({operates:"*"}),G=V.useState("operates"),Q=j()(G,2),se=Q[0],re=Q[1];return S(function(){var le=Z(function(T){N.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(T.type," ").concat(T.path.join("."),"</p>"))},{operates:se});return function(){return le.off()}},[se]),P.createElement(E,{style:{maxHeight:"400px"}},P.createElement("div",null,P.createElement(B,{name:"Price"},L("order.price")),P.createElement(B,{name:"Count"},P.createElement(x,{onClick:function(){w.order.count--,N.current.insertAdjacentHTML("beforeend","----------")}},"-"),L("order.count"),P.createElement(x,{onClick:function(){w.order.count++,N.current.insertAdjacentHTML("beforeend","----------")}},"+")),P.createElement(B,{name:"Total"},L("order.total")),P.createElement(g,null,P.createElement(O,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:se==="*",onChange:function(T){re(T.target.checked?"*":"read")}}),P.createElement(O,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:se==="write",onChange:function(T){re(T.target.checked?"write":"*")}}),P.createElement(O,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:se==="read",onChange:function(T){re(T.target.checked?"read":"*")}})),P.createElement(x,{onClick:function(){N.current.innerHTML=""}},"Clear")),P.createElement("div",{ref:N,style:{overflowY:"auto"}}))}});case 21:case"end":return H.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":C,"x-react-components":i,react:K||(K=e.t(P,2))},renderOpts:{compile:function(){var l=n()(y()().mark(function r(){var u,I=arguments;return y()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(39).then(e.bind(e,39039));case 2:return g.abrupt("return",(u=g.sent).default.apply(u,I));case 3:case"end":return g.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-1":{component:P.memo(P.lazy(n()(y()().mark(function l(){var a,r,u,I,t,g,x,B,E,O,D,S,$,R,w,Z,L;return y()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=H.sent,r=a.createStore,u=a.computed,I=a.useStore,H.next=8,Promise.resolve().then(e.bind(e,2849));case 8:return t=H.sent,g=t.Box,x=t.Button,B=t.ColorBlock,E=t.Layout,O=t.CheckBox,H.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return D=H.sent,S=D.useEffect,$=D.useRef,R=r({order:{price:10,count:2,total:u(function(J){return J.price*J.count})}}),w=R.state,Z=R.watch,L=R.$,H.abrupt("return",{default:function(){var N=$(),V=I({operates:"*"}),G=V.useState("operates"),Q=j()(G,2),se=Q[0],re=Q[1];return S(function(){var le=Z("order.total",function(T){N.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(T.type," ").concat(T.path.join("."),"</p>"))},{operates:se});return function(){return le.off()}},[se]),P.createElement(E,{style:{maxHeight:"400px"}},P.createElement("div",null,P.createElement(B,{name:"Price"},L("order.price")),P.createElement(B,{name:"Count"},P.createElement(x,{onClick:function(){w.order.count--,N.current.insertAdjacentHTML("beforeend","----------")}},"-"),L("order.count"),P.createElement(x,{onClick:function(){w.order.count++,N.current.insertAdjacentHTML("beforeend","----------")}},"+")),P.createElement(B,{name:"Total"},L("order.total")),P.createElement(g,null,P.createElement(O,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:se==="*",onChange:function(T){re(T.target.checked?"*":"read")}}),P.createElement(O,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:se==="write",onChange:function(T){re(T.target.checked?"write":"*")}}),P.createElement(O,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:se==="read",onChange:function(T){re(T.target.checked?"read":"*")}})),P.createElement(x,{onClick:function(){N.current.innerHTML=""}},"Clear")),P.createElement("div",{ref:N,style:{overflowY:"auto"}}))}});case 21:case"end":return H.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":C,"x-react-components":i,react:K||(K=e.t(P,2))},renderOpts:{compile:function(){var l=n()(y()().mark(function r(){var u,I=arguments;return y()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(39).then(e.bind(e,39039));case 2:return g.abrupt("return",(u=g.sent).default.apply(u,I));case 3:case"end":return g.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-2":{component:P.memo(P.lazy(n()(y()().mark(function l(){var a,r,u,I,t,g,x,B,E,O,D,S,$,R,w;return y()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=L.sent,r=a.createStore,L.next=6,Promise.resolve().then(e.bind(e,2849));case 6:return u=L.sent,I=u.Button,t=u.Layout,g=u.Input,L.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return x=L.sent,B=x.useEffect,E=x.useRef,O=r({order:{price:10,count:2,books:["AutoStore\u5B9E\u6218\u6307\u5357","\u6DF1\u5165\u6D45\u51FAAutoStore","AutoStore\u6700\u4F73\u5B9E\u8DF5"]}}),D=O.state,S=O.watch,$=O.$,R=O.useState,w=O.useFormBindings,L.abrupt("return",{default:function(){var H=E(),J=E();B(function(){var V=S("order.books",function(G){H.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          `.concat(G.type," ").concat(G.path.join("."),"[").concat(G.indexs[0],`]
        </p>`))},{operates:["insert","remove","update"]});return function(){return V.off()}},[]);var N=w("order.books");return P.createElement(t,{style:{maxHeight:"400px"}},P.createElement("div",null,D.order.books.map(function(V,G){return P.createElement(g,z()({key:G},N[G]))}),P.createElement(g,{ref:J,actions:["+"],placeholder:"\u8BF7\u8F93\u5165\u4E66\u540D",onAction:function(G,Q){String(Q).length>0&&(D.order.books.push(Q),J.current.value="")}}),P.createElement(I,{onClick:function(){H.current.innerHTML=""}},"Clear")),P.createElement("div",{ref:H,style:{overflowY:"auto"}}))}});case 17:case"end":return L.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
import { Box,Button,ColorBlock,Layout,CheckBox ,Input} from "x-react-components"
import { useEffect,useRef } from "react" 

const { state,watch,$,useState,useFormBindings } = createStore({
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

  const bindBooks = useFormBindings('order.books')


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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":C,"x-react-components":i,react:K||(K=e.t(P,2))},renderOpts:{compile:function(){var l=n()(y()().mark(function r(){var u,I=arguments;return y()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(39).then(e.bind(e,39039));case 2:return g.abrupt("return",(u=g.sent).default.apply(u,I));case 3:case"end":return g.stop()}},r)}));function a(){return l.apply(this,arguments)}return a}()}}}},45618:function(ee,c,e){"use strict";e.r(c),e.d(c,{demos:function(){return z}});var K=e(92379),o=e(43112),z={}},20927:function(ee,c,e){"use strict";e.r(c),e.d(c,{Author:function(){return d},Counter:function(){return P},getProjects:function(){return I},useOneEffect:function(){return g}});var K=e(28633),o=e.n(K),z=e(92379),M=e(44970),y=e(2849),p=e(651),j=(0,M.createStore)({root:{count:1}}),k=j.state,n=j.$,P=function(){var B=(0,z.useState)(1),E=o()(B,2),O=E[0],D=E[1];return(0,p.jsxs)(y.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[O,(0,p.jsxs)(y.ColorBlock,{children:["Count:",O]}),(0,p.jsxs)(y.ColorBlock,{children:["Count:",n("root.count")]}),(0,p.jsx)(y.Button,{onClick:function(){return D(O+1)},children:"State +1"}),(0,p.jsx)(y.Button,{onClick:function(){return k.root.count++},children:"Signal +1"})]})},b=(0,M.createStore)({firstName:"Zhang",lastName:"Fisher"}),C=b.state,i=b.$,d=function(){var B=(0,z.useState)(1),E=o()(B,2),O=E[0],D=E[1];return(0,p.jsxs)(y.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[O,(0,p.jsxs)(y.ColorBlock,{children:["Count:",O]}),(0,p.jsx)(y.ColorBlock,{children:i(function(S){return S.firstName+" "+S.lastName})}),(0,p.jsx)(y.Button,{onClick:function(){return D(O+1)},children:"State +1"}),(0,p.jsx)(y.Button,{onClick:function(){return C.lastName=C.lastName+"."},children:"Update lastName"})]})},l=e(29008),a=e.n(l),r=e(70958),u=e.n(r);function I(x){return t.apply(this,arguments)}function t(){return t=u()(a()().mark(function x(B){var E,O,D;return a()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,fetch(B);case 2:if(E=$.sent,!E.ok){$.next=11;break}return $.next=6,E.json();case 6:return O=$.sent,D=O.map(function(R){return{name:R.name,url:R.html_url,description:R.description,stars:R.stargazers_count}}),$.abrupt("return",D);case 11:throw new Error("".concat(E.status," - ").concat(E.statusText));case 12:case"end":return $.stop()}},x)})),t.apply(this,arguments)}function g(x){var B=(0,z.useRef)(!1);(0,z.useEffect)(function(){if(!B.current)return B.current=!0,x()})}},2849:function(ee,c,e){"use strict";e.r(c),e.d(c,{Box:function(){return z},Button:function(){return k},Card:function(){return b},CheckBox:function(){return H},ColorBlock:function(){return t},Divider:function(){return a},Field:function(){return l},Input:function(){return S},JsonView:function(){return L},Layout:function(){return x},Loading:function(){return y},RichLabel:function(){return w},ValidResult:function(){return d}});var K=e(92379),o=e(651),z=function(N){var V=N.title,G=N.enable,Q=G===void 0?!0:G,se=N.visible,re=se===void 0?!0:se;return(0,o.jsxs)("div",{style:{display:re?"flex":"none",position:"relative",flexDirection:"column",padding:"8px",margin:"16px 4px 4px 4px",boxSizing:"border-box",border:"1px solid #bbb"},children:[(0,o.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:Q?"#bbb":"gray"},children:V||""}),N.children]})},M=e(97106),y=function(N){var V=N.size,G=V===void 0?20:V,Q=N.visible,se=Q===void 0?!0:Q,re=N.color,le=N.tips,T=le===void 0?"loading...":le;return(0,o.jsxs)("span",{title:T,style:{display:se?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,o.jsx)(M.Z1,{width:G,height:G,color:re}),N.title?(0,o.jsx)("span",{style:{marginLeft:"4px"},children:N.title}):null]})},p=e(94039),j=(0,p.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(N){return N.visible!==!1?N.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #eee",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555",fontSize:"0.8em","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"x-button"}),k=function(N){var V=N.loading,G=N.timeout,Q=G===void 0?0:G,se=N.progress,re=se===void 0?0:se,le=N.cancel,T=N.onClick;return(0,o.jsxs)("div",{className:j.className,style:j.getStyle(N),onClick:T,children:[V?(0,o.jsx)(y,{}):null,(0,o.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:N.children}),Q>0?(0,o.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:Q}):"",re>0?(0,o.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[re,"%"]}):"",N.error?(0,o.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:N.error}):"",N.loading&&typeof le=="function"?(0,o.jsx)("button",{onClick:le,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},n=(0,p.zo)({border:"1px solid #e1e1e1",background:function(N){return N.enable!==!1?"white":"gray"},margin:"8px",display:function(N){return N.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"card"}),P=(0,p.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555"},{className:"card-header"}),b=function(N){var V=N.title,G=N.enable,Q=G===void 0?!0:G,se=N.buttons,re=se===void 0?[]:se,le=Array.isArray(N.children)?N.children:[N.children];return(0,o.jsxs)("div",{className:n.className,style:n.getStyle(N),children:[(0,o.jsxs)("div",{className:P.className,style:P.getStyle(N),children:[(0,o.jsx)("span",{style:{flexGrow:1,color:Q?"#222":"gray"},children:V}),(0,o.jsx)("span",{style:{},children:re.map(function(T,U){return(0,o.jsx)("span",{className:"button",style:{padding:"4px",margin:"4px",cursor:"pointer"},onClick:T.onClick,children:T.title},U)})})]}),(0,o.jsx)("div",{style:{padding:"12px"},children:le.map(function(T,U){return le.length>1&&U==le.length-1&&T.classList&&T.classList.contains("footer")?(0,o.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:T},U):T})})]})},C=e(24325),i=e.n(C),d=function(N){var V=N.validate,G=N.help;if(V!=null){var Q=typeof V!="boolean",se=Q?V==null?void 0:V.result:V,re=Q?V==null?void 0:V.loading:!1,le=Q?V==null?void 0:V.error:G;return(0,o.jsxs)("span",{style:{color:"red",display:re||!se?"flex":"none"},children:[(0,o.jsx)(y,{visible:re,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!re&&(se?"":le)]})}},l=function(N){var V=N.enable,G=V===void 0?!0:V,Q=N.visible,se=Q===void 0?!0:Q,re=N.label,le=re===void 0?"":re,T=N.children,U=T===void 0?"":T,Y=N.memo;return(0,o.jsxs)("div",{className:"field",style:{position:"relative",display:se===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,o.jsxs)("label",{className:"field-label",style:{minWidth:"160px",fontWeight:"bold",color:G===!1?"gray":"inherit"},children:[le,":"]}),(0,o.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:G===!1?"gray":"inherit"},children:[typeof U=="function"?"":U,Y&&(0,o.jsx)("span",{style:{color:"gray"},children:Y})]}),(0,o.jsx)(d,i()({},N))]})},a=function(N){var V=N.title,G=N.visible,Q=G===void 0?!0:G;return(0,o.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:Q?"flex":"none"},children:(0,o.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:V})})},r=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],u=0;function I(){return u++,u>=r.length&&(u=0),r[u]}var t=function(N){var V=(0,K.useRef)(0),G=N.name,Q=N.value,se=Q===void 0?"":Q,re=N.loading,le=re===void 0?!1:re,T=N.comment,U=I(),Y="white";return(0,K.useEffect)(function(){V.current++}),(0,o.jsxs)("div",{style:i()(i()({backgroundColor:U,padding:"6px",color:Y,display:"flex"},N.style),{},{alignItems:"center"}),children:[(0,o.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[G?(0,o.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:G}):null,G?(0,o.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,o.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(se),N.children]})]}),T?(0,o.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:T}):null,le?(0,o.jsx)(y,{color:"white"}):null,(0,o.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:V.current})]})},g=(0,p.zo)({display:function(N){return N.visible===!1?"none":"flex"},position:"relative",flexDirection:function(N){return N.direction||"row"},padding:"4px",margin:"4px",boxSizing:"border-box",alignItems:"stretch","&>*":{flex:1,boxSizing:"border-box",position:"relative",borderLeft:"1px solid #eee",borderTop:"1px solid #eee",borderBottom:"1px solid #eee",padding:"8px"},"&>:last-child":{borderRight:"1px solid #eee"}},{className:"x-layout"}),x=function(N){return(0,o.jsx)("div",{className:g.className,style:g.getStyle(N,N.style),children:N.children})},B=e(19317),E=e.n(B),O=["id","enable","style","value","actions"],D=(0,p.zo)({border:function(N){return N.validate===!1?"1px solid red":"1px solid #bbb"},borderRadius:"4px",background:function(N){return N.enable===!1?"gray":"white"},display:function(N){return N.visible===!1?"none":"block"},margin:"4px",padding:"8px",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}},{className:"xc-input"}),S=function(N){var V=N.id,G=V===void 0?Math.random().toString(36).slice(2):V,Q=N.enable,se=Q===void 0?!0:Q,re=N.style,le=re===void 0?{}:re,T=N.value,U=N.actions,Y=E()(N,O),ce=(0,K.useRef)(null),de={color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"};return(0,o.jsxs)("div",{style:i()({display:"flex",alignItems:"center"},le),children:[N.label?(0,o.jsx)("label",{htmlFor:G,style:de,children:N.label}):null,(0,o.jsx)("input",i()(i()({ref:ce,id:G,value:T,readOnly:!se},Y),{},{className:D.className,style:D.getStyle(N)})),U==null?void 0:U.map(function(te){return(0,o.jsx)("button",{onClick:function(xe){var _e;(_e=N.onAction)===null||_e===void 0||_e.call(N,te,ce.current.value,xe)},children:te},te)})]})},$=e(28633),R=e.n($),w=function(N){var V=N.text,G=N.color,Q=G===void 0?"#ff6c00":G,se=N.rules,re=typeof Q=="string"?{default:Q}:Object.assign({default:""},Q),le=V;return se?Object.entries(se).forEach(function(T){var U=R()(T,2),Y=U[0],ce=U[1];le=le.replace(ce,function(de){var te=Y.includes(":")?Y:"color:".concat(Y,";");return"<span style='".concat(te,"'>").concat(de,"</span>")})}):le=V.replace(/\{\s?(.*?)\s?\}/gm,function(T,U){return"<span style='color: ".concat(U in re?re[U]:re.default,"'>").concat(U,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,o.jsx)("div",{style:i()({boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},N.style),children:(0,o.jsx)("span",{dangerouslySetInnerHTML:{__html:le}})})},Z=function(N){return N.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},L=function(N){var V=Z(String(N.children));return(0,o.jsx)(w,{text:V,rules:{"color:green;":/true|false/g,"color:#222;padding:4px;":/\"(.*?)\"/g,"color:#bd0081;padding:4px;":/(?!=\:\s*)[\d\.]+/g,"color:#888;padding:4px;":/(null|defined)/g,"color:#918213;paddingRight:4px;":/^\{|\}$/g},style:{}})},q=(0,p.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-checkbox"}),H=function(N){var V=N.id,G=V===void 0?Math.random().toString(36).slice(2):V,Q=N.labelPos,se=Q===void 0?"right":Q,re=N.label,le=re===void 0?"":re;return(0,o.jsxs)("div",{className:q.className,style:q.getStyle(N),children:[se==="left"?(0,o.jsx)("label",{htmlFor:G,children:le}):null,(0,o.jsx)("input",i()(i()({},N),{},{id:G,type:"checkbox"})),se==="right"?(0,o.jsx)("label",{htmlFor:G,children:le}):null]})}},99640:function(ee,c,e){"use strict";e.d(c,{eg:function(){return re},_L:function(){return w},WE:function(){return rt},M1:function(){return At},CD:function(){return R},up:function(){return se},Xr:function(){return Je},BG:function(){return tt},e2:function(){return L},vp:function(){return Xe},FM:function(){return q},y1:function(){return J},MI:function(){return H},Q6:function(){return V},kF:function(){return G},Rn:function(){return Ze},fR:function(){return Te},f7:function(){return Q},QI:function(){return N},X3:function(){return at},W5:function(){return Z},RY:function(){return lt},LG:function(){return ut},Rh:function(){return Fe},Fl:function(){return Y},Ws:function(){return xt},gw:function(){return pt},b0:function(){return et},tl:function(){return ct},if:function(){return mt},zv:function(){return $e},ux:function(){return Ee},kM:function(){return it},vM:function(){return we},Jy:function(){return he},O5:function(){return ce},Jq:function(){return Ie},vo:function(){return ie},c6:function(){return st},_N:function(){return xe},iI:function(){return de},vb:function(){return ye},PH:function(){return _e},J_:function(){return ge},PO:function(){return be},pt:function(){return ht},tI:function(){return ue},RM:function(){return Ne},_R:function(){return te},UQ:function(){return Me},Xl:function(){return Ce},DH:function(){return ze},KZ:function(){return T},Ql:function(){return vt},ZW:function(){return It},Y6:function(){return Be},EG:function(){return qe},YP:function(){return ot}});var K=e(29008),o=e.n(K),z=e(70958),M=e.n(z),y=e(12027),p=e.n(y),j=e(34180),k=e.n(j),n=e(93949),P=e.n(n),b=e(6270),C=e.n(b),i=e(28810),d=e.n(i),l=e(77701),a=e.n(l),r=e(28249),u=e.n(r),I=e(29861),t=e.n(I),g=e(14582),x=e.n(g),B=e(48510),E=e.n(B),O=e(30790),D=e.n(O),S=e(5672),$=e.n(S),R=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h)}($()(Error)),w=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h)}(R),Z=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h)}(R),L=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h)}(R),q=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h)}(R),H=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h)}(R),J=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h)}(R),N=Symbol("skip-proxy"),V=Symbol("observer-descriptor-builder"),G=Symbol("observer-descriptor"),Q=".",se="__batch_update__",re=Symbol("AsyncComputedValue");function le(f){return f.constructor.name==="AsyncFunction"}function T(f){return f?f.map(function(m){return Array.isArray(m)?m:typeof m=="string"?["/","./","../"].some(function(h){return m.startsWith(h)})?m:m.includes(Q)?m.split(Q):m.split("."):[]}):[]}function U(){return{objectify:!0,async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0}}function Y(){var f=arguments[0];if(typeof f!="function")throw new Error("computed getter must be a function");var m=[],h=Object.assign({},U());if(arguments.length===1)m=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))h.depends=arguments[1];else if(k()(arguments[1])==="object")Object.assign(h,arguments[1]),h.depends=T(h.depends);else throw new q;else arguments.length>=3&&(m=T(arguments[1]),Object.assign(h,arguments[2]),h.depends=m);h.async=h.async===!0||le(f)||arguments.length>=2&&Array.isArray(arguments[1]);var v=function(){return t()({type:"computed",getter:f,options:h},G,!0)};return v[V]=!0,v}function ce(f){return f?f.some(function(m){return typeof m=="string"?m.startsWith("./")||m.startsWith("../")||m.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(m):!0}):!1}function de(f){return k()(f)==="object"&&f.hasOwnProperty("type")&&typeof f.type=="string"&&f.hasOwnProperty("getter")&&typeof f.getter=="function"&&f.hasOwnProperty("options")&&k()(f.options)==="object"}function te(f){try{return f[N]===!0}catch(m){}return!1}function ie(f,m){if(f===m)return!0;if(f===null||m===null||k()(f)!==k()(m))return!1;if(k()(f)==="object"){if(Array.isArray(f)&&Array.isArray(m))return f.length!==m.length?!1:f.every(function(v,s){return ie(v,m[s])});if(!Array.isArray(f)&&!Array.isArray(m)){var h=Object.keys(f);return h.length!==Object.keys(m).length?!1:h.every(function(v){return ie(f[v],m[v])})}else return!1}return!1}function xe(f){return toString.call(f)==="[object Map]"}function _e(f,m){return!f||!m||f.length!==m.length?!1:f.every(function(h,v){return h===m[v]})}function ge(f,m){var h=_e(f,m);return h?!0:f.length!==m.length?!1:f.every(function(v,s){return v==="*"?!0:v===m[s]})}function be(f){return f==null||k()(f)!=="object"?!1:Object.prototype.toString.call(f)==="[object Object]"}function Ie(f){return f&&k()(f)==="object"&&f.hasOwnProperty(re)}function ue(f){try{return!!f&&(k()(f)==="object"||typeof f=="function")&&typeof f.then=="function"&&typeof f.catch=="function"&&(f instanceof Promise||Object.prototype.toString.call(f)==="[object Promise]")}catch(m){return!1}}function ye(f){return typeof f=="function"&&f[V]===!0}function Ne(f){return k()(f)==="object"&&f!==null&&!("__isProxy"in f)}function Ee(f,m){var h=f.get(m);if(h!==void 0)return h;var v=f.get(Number(m)||m);if(v!==void 0)return v}function he(f,m){if(!m||m.length===0)return f;var h,v=f;return m.forEach(function(s){if(xe(v))h=Ee(v,s);else if(s in v)h=v[s];else throw new Error("invalid state path: ".concat(m.join(".")));v=h}),h}function Ce(f){try{f[N]=!0}catch(m){}return f}function Be(f,m,h,v){var s=f,_=m.length-1;m.forEach(function(A,W){var F=xe(s);if(W===_){if(v===!0){var ae=F?Ee(s,A):s[A];Ie(ae)&&(s=ae,A="value")}F?s.set(A,h):s[A]=h;return}var X=F?Ee(s,A):s[A];s=X})}function Me(f){return(f||["ROOT"]).map(function(m){return Array.isArray(m)?m.join("."):m}).join(Q)}function $e(){return Math.random().toString(36).slice(2)}function Ge(f,m,h){var v=f&&!f[0].startsWith("#");if(Array.isArray(m))return m;if(m==="self")return v?f:void 0;if(m==="root")return v?[]:void 0;if(m==="parent")return v?f.slice(0,-2):void 0;if(m==="current")return v?f.slice(0,-1):void 0;if(typeof m=="string")return m.startsWith("./")?v?[].concat(p()(f.slice(0,-1)),p()(m.slice(2).split(Q))):void 0:m.startsWith("../")?v?Ge(f.slice(0,-1),m.slice(3),!0):void 0:m.startsWith("/")?m.replace(/^(\/)*/,"").split(Q):v&&h?[].concat(p()(f.slice(0,-1)),p()(m.split(Q))):m.split(Q)}function Fe(f,m){return m?m.map(function(h){return Ge(f,h)}).filter(function(h){return h!==void 0}):[]}function ct(f,m){var h="";return m.id?h=m.id:h=Me(f),h}function qe(f,m,h){var v=f,s=m.length-1;m.forEach(function(_,A){var W=xe(v);if(A===s){var F=W?v.get(_):v[_];k()(F)==="object"&&Object.assign(F,h);return}W?(v.has(_)||v.set(_,{}),v=v.get(_)):(_ in v||(v[_]={}),v=v[_])})}function et(f,m){function h(v,s){for(var _ in v){var A=v[_];typeof m=="function"&&m({value:A,key:_,parent:v,path:s.concat(_)}),k()(A)==="object"&&h(A,s.concat(_))}}h(f,[])}function it(f){return f}function pt(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(m){setTimeout(m,f)})}function ze(f){var m=new Map;return f.forEach(function(h){var v=h.join(".");m.set(v,h)}),Array.from(m.values())}function It(f,m){return f.length>m.length?!1:f.every(function(h,v){return h===m[v]})}function mt(f,m){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"none",v=[];return typeof f=="function"?v=m.collectDependencies(function(){return f(m.state)}):typeof f=="string"?v=[f.split(Q)]:Array.isArray(f)?v=[p()(f)]:v=[],h!=="none"&&v.forEach(function(s){var _=m.peep(function(A){return he(A,s)});Ie(_)&&s.push(h==="all"?"*":"value")}),v}function vt(f,m){if(!m||m.length===0)return!1;for(var h,v=f,s=0;s<m.length;s++){var _=m[s],A=!1;if(xe(v)){if(A=v.has(_),!A)return!1;h=Ee(v,_)}else{if(A=_ in v,!A)return!1;h=v[_]}v=h}return!0}var ft=e(24325),Le=e.n(ft);function we(f,m){if(Array.isArray(f)){for(var h=p()(f),v=0;v<h.length;v++)h[v]=we(h[v],m);return h}else if(k()(f)==="object"){if(!m&&Ie(f))return f.value;var s=Le()({},f);for(var _ in s)s[_]=we(s[_],m);return s}return f}function ht(f){return f==null||typeof f=="string"||typeof f=="number"||typeof f=="boolean"}function xt(f){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof f=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(f)}var tt=function(f){a()(h,f);var m=u()(h);function h(v){var s;return P()(this,h),s=m.call(this),s.store=v,s}return C()(h,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(s){this.store.options.enableComputed=s}},{key:"create",value:function(){var s=de(arguments[0])?arguments[0]:Y.apply(void 0,arguments)();if(s.options.async&&!ce(s.options.depends))throw new J("The scope of the dynamic computed object must be the root state object or an absolute path");var _=s.options.scope;if(_===void 0)s.options.scope="ROOT";else if(!ce([_]))throw new H("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(s)}},{key:"runGroup",value:function(){var v=M()(o()().mark(function _(A,W,F){return o()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,this.run(function(ne){return ne.group==A},W,F);case 2:return X.abrupt("return",X.sent);case 3:case"end":return X.stop()}},_,this)}));function s(_,A,W){return v.apply(this,arguments)}return s}()},{key:"run",value:function(){var v=M()(o()().mark(function _(){var A=arguments,W=this,F,ae,X,ne,oe=arguments;return o()().wrap(function(pe){for(;;)switch(pe.prev=pe.next){case 0:if(oe.length!=0){pe.next=2;break}return pe.abrupt("return",Promise.all(p()(this.values()).map(function(me){return me.run()})));case 2:return typeof oe[0]=="function"?F=oe[0]:typeof oe[0]=="string"&&(F=function(Pe){return Pe.id==A[0]}),ae=Object.assign({},oe[1]),X=Object.assign({wait:!1,timeout:0},oe[2]),ne={},pe.abrupt("return",new Promise(function(me,Pe){if(X.wait){var fe;ae.onDone=function(Ae){var je=Ae.id;if(ne[je]=!0,Object.values(ne).every(function(ke){return ke}))return clearTimeout(fe),!0},X.timeout>0&&(fe=setTimeout(function(){Pe(new Z)},X.timeout))}Promise.all(p()(W.values()).filter(function(Ae){return F(Ae)?(ne[Ae.id]=!1,!0):!1}).map(function(Ae){return Ae.run(ae)})),X.wait||me()}));case 7:case"end":return pe.stop()}},_,this)}));function s(){return v.apply(this,arguments)}return s}()},{key:"enableGroup",value:function(){var v=M()(o()().mark(function _(A){var W,F,ae;return o()().wrap(function(ne){for(;;)switch(ne.prev=ne.next){case 0:W=x()(this.values());try{for(W.s();!(F=W.n()).done;)ae=F.value,ae.options.enable=A}catch(oe){W.e(oe)}finally{W.f()}case 2:case"end":return ne.stop()}},_,this)}));function s(_){return v.apply(this,arguments)}return s}()},{key:"delete",value:function(s){var _;return(_=this.get(s))===null||_===void 0||_.detach(),E()(D()(h.prototype),"delete",this).call(this,s)}},{key:"find",value:function(s){if(s){var _=Array.isArray(s)?s:s.split(Q),A=x()(this.values()),W;try{for(A.s();!(W=A.n()).done;){var F=W.value;if(_e(F.path,_))return F}}catch(ae){A.e(ae)}finally{A.f()}}}}]),h}($()(Map)),gt=e(69075);function _t(f){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",h=typeof f=="function"?f():f instanceof Error?f.stack:f;try{var v;(v=console)[m].apply(v,["[AutoStore] "].concat(p()(Array.isArray(h)?h:[h])))}catch(s){}}function Ue(f,m){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Q,v=[];try{return typeof m=="function"&&(m=m.call(f,f)),v=Array.isArray(m)?m:typeof m=="string"?m.split(h):[],v.length>0?he(f,v):f}catch(s){return f}}var Te=function(f){return f.Root="ROOT",f.Current="CURRENT",f.Parent="PARENT",f.Depends="DEPENDS",f.Self="SELF",f}({});function yt(f,m,h){var v=m==null?h:m;if(typeof v=="function")try{v=v.call(f.store,f)}catch(s){}return v==null?h==null?Te.Current:h:v}function Ve(f,m,h,v){var s=f.store.state,_=f.store.options;if(typeof _.getRootScope=="function"){var A=_.getRootScope(f,{observerType:m,valuePath:h==null?void 0:h.path});A!==void 0&&(s=A)}var W=h||{},F=W.path,ae=W.parentPath,X=yt(f,v.scope,_.scope),ne=s;try{if(X===Te.Current)ne=Ue(s,ae);else if(X===Te.Parent)ne=Ue(s,F.slice(0,F.length-2<0?0:F.length-2));else if(X===Te.Root)ne=s;else if(X===Te.Depends){var oe;ne=(oe=f.depends)===null||oe===void 0?void 0:oe.map(function(ve){return Ue(s,ve)})}else typeof X=="string"?X.startsWith("@")?ne=Ve(f,m,h,Le()(Le()({},v),{},{scope:Ve(f,m,Le()(Le()({},h),{},{path:X.slice(1).split(Q)}),Le()(Le()({},v),{},{scope:X.slice(1)}))})):ne=Ue(s,Ge(f.path,X)):Array.isArray(X)&&(ne=Ue(s,X))}catch(ve){_.log("Error while getting computed scope ".concat(f.toString(),": ").concat(ve.message),"error")}return ne}var Ze=function(){function f(m,h,v){P()(this,f),t()(this,"_path",void 0),t()(this,"_id",""),t()(this,"_initial",void 0),t()(this,"_value",void 0),t()(this,"_associated",!1),t()(this,"_attached",!1),t()(this,"_getter",void 0),t()(this,"_depends",[]),t()(this,"_options",void 0),t()(this,"_subscribers",[]),t()(this,"_strPath",void 0),this.store=m,this.descriptor=h,this.context=v,this._associated=v!==void 0,this._getter=h.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},h.options),this._id=this._options.id||(this._associated?Me(v==null?void 0:v.path):$e()),this._path=(v==null?void 0:v.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this._depends=Fe(this._path,this._options.depends),this._onInitial()}return C()(f,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(h){this._options.enable=h}},{key:"group",get:function(){return this._options.group},set:function(h){this._options.group=h}},{key:"initial",get:function(){return this._initial},set:function(h){this._initial=h}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(h){this._depends=h}},{key:"getter",get:function(){return this._getter},set:function(h){this._getter=h}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(Q)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?he(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(h){this._associated?Be(this.store.state,this._path,h):(this._value=h,this.store._notify({type:"set",path:this.path,value:h}))}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"update",value:function(h,v){var s=this;this.store.update(function(){s.value=h},v)}},{key:"silentUpdate",value:function(h){this.update(h,{silent:!0})}},{key:"watch",value:function(h,v){var s=this;return this.store.watch(this.getValueWatchPath(),function(_){h.call(s,_)},v)}},{key:"getValueWatchPath",value:function(){return this.path.join(Q)}},{key:"emitStoreEvent",value:function(h,v){var s=this;setTimeout(function(){s.store.emit(h,v)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(h){}},{key:"attach",value:function(){var h=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(h.toString()," subscribed to ").concat(h.depends.map(function(v){return v.join(Q)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(h){return h.off()}),this._attached=!1)}}]),f}(),Je=function(f){a()(h,f);var m=u()(h);function h(v,s,_){var A;return P()(this,h),A=m.call(this,v,s,_),A.store=v,A.descriptor=s,A.context=_,s.options.depends=Fe(A.path,A.options.depends),A}return C()(h,[{key:"toString",value:function(){return"ComputedObject<".concat(Me(this.path),">")}},{key:"isDisable",value:function(s){return!this.store.options.enableComputed||!this.enable&&s!==!0||s===!1}},{key:"run",value:function(s){throw new Error("Method not implemented.")}}]),h}(Ze),at=function(f){a()(h,f);var m=u()(h);function h(){return P()(this,h),m.apply(this,arguments)}return C()(h,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(s){var _=this,A=Object.assign({first:!1,changed:void 0},s),W=A.first,F=A.changed;if(!W&&this.isDisable(s==null?void 0:s.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!W&&this.store.log(function(){return"Run sync computed for : ".concat(_.toString())});var ae=s?Object.assign({},this.options,s):this.options,X=Ve(this,"computed",this.context,ae),ne=ae.initial;try{ne=this.getter.call(this,X,{changed:F,first:W}),W&&(this.initial=ne),this.store.peep(function(){_.value=ne}),!W&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:ne,computedObject:this})}catch(oe){throw!W&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:oe,computedObject:this}),oe}}},{key:"collectDependencies",value:function(){var s=[],_=this.store.watch(function(A){s.push(A.path)},{operates:["get"]});this.run({first:!0}),_.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&s.push.apply(s,p()(Fe(this.path,this.options.depends))),this.depends=ze(s),this.attach()}},{key:"onDependsChange",value:function(s){this.run({changed:s})}}]),h}(Je);function Et(f,m,h,v,s){return h==="push"?function(){for(var _=m.length,A=arguments.length,W=new Array(A),F=0;F<A;F++)W[F]=arguments[F];var ae=v.apply(m,W);if(m.length>_){var X=Array.from({length:m.length-_},function(ne,oe){return oe+_});f({type:"insert",path:s,indexs:X,value:W,oldValue:void 0,parentPath:s,parent:m})}return ae}:h==="pop"?function(){var _=m.length,A=v.apply(m);return m.length==_-1&&f({type:"remove",path:s,indexs:[_-1],value:[A],oldValue:void 0,parentPath:s,parent:m}),A}:h==="splice"?function(_,A){for(var W=arguments.length,F=new Array(W>2?W-2:0),ae=2;ae<W;ae++)F[ae-2]=arguments[ae];var X=v.apply(m,[_,A].concat(F));if(X.length>0){var ne=Array.from({length:X.length},function(ve,pe){return _+pe});f({type:"remove",path:s,indexs:ne,value:X,oldValue:void 0,parentPath:s,parent:m})}if(F.length>0){var oe=Array.from({length:F.length},function(ve,pe){return _+pe});f({type:"insert",path:s,indexs:oe,value:F,oldValue:void 0,parentPath:s,parent:m})}return X}:h==="unshift"?function(){for(var _=m.length,A=arguments.length,W=new Array(A),F=0;F<A;F++)W[F]=arguments[F];var ae=v.apply(m,W);if(m.length>_){var X=Array.from({length:m.length-_},function(ne,oe){return oe});f({type:"insert",path:s,indexs:X,value:W,oldValue:void 0,parentPath:s,parent:m})}return ae}:h==="shift"?function(){var _=m.length,A=v.apply(m);return m.length==_-1&&f({type:"remove",path:s,indexs:[0],value:[A],oldValue:void 0,parentPath:s,parent:m}),A}:h==="fill"?function(_,A,W){var F=v.apply(m,[_,A,W]),ae=A!=null?A:0,X=W!=null?W:m.length,ne=Array.from({length:X-ae},function(ve,pe){return pe+ae}),oe=Array.from({length:X-ae},function(){return _});return f({type:"update",path:s,indexs:ne,value:oe,oldValue:void 0,parentPath:s,parent:m}),F}:h==="concat"?function(){for(var _=m.length,A=arguments.length,W=new Array(A),F=0;F<A;F++)W[F]=arguments[F];var ae=v.apply(m,W),X=Array.from({length:W.length},function(ne,oe){return _+oe});return f({type:"insert",path:s,indexs:X,value:W,oldValue:void 0,parentPath:s,parent:m}),ae}:v}var He=Symbol("__NOTIFY__");function nt(f,m,h,v,s){if(te(f)||k()(f)!=="object"||f===null)return f;if(h.has(f))return h.get(f);var _=new Proxy(f,{get:function(W,F,ae){var X=Reflect.get(W,F,ae);if(typeof F!="string")return X;var ne=[].concat(p()(m),[String(F)]);if(typeof X=="function"||!Object.hasOwn(W,F))if(typeof X=="function"){if(Array.isArray(W))return Et(s.notify,W,F,X,m);if(!te(X)&&Object.hasOwn(W,F)){var oe=ne.join(".");try{if(v.has(oe)){var ve=[].concat(p()(v.keys()),[oe]);throw v.clear(),new L('The computed property "'.concat(oe,'" has a circular dependency, steps: ').concat(ve.join(" <- ")))}return v.set(oe,!0),s.createComputedObject(ne,X,m,W)}finally{v.delete(oe)}}else return X}else return X;return s.notify({type:"get",path:ne,indexs:[],value:X,oldValue:void 0,parentPath:m,parent:W}),nt(X,ne,h,v,s)},set:function(W,F,ae,X){var ne=Reflect.get(W,F,X),oe=Reflect.set(W,F,ae,X);if(F===He)return!0;if(oe&&F!==He&&ae!==ne)if(Array.isArray(W))s.notify({type:"update",path:m,indexs:[Number(F)],value:ae,oldValue:ne,parentPath:m,parent:W});else{var ve=[].concat(p()(m),[String(F)]);s.notify({type:"set",path:ve,indexs:[],value:ae,oldValue:ne,parentPath:m,parent:W})}return oe},deleteProperty:function(W,F){var ae=W[F],X=[].concat(p()(m),[String(F)]),ne=Reflect.deleteProperty(W,F);return ne&&F!==He&&s.notify({type:"delete",path:X,indexs:[],value:ae,oldValue:void 0,parentPath:m,parent:W}),ne}});return h.set(f,_),_}function bt(f,m){var h=new Map,v=new WeakMap;return nt(f,[],v,h,m)}var Ct=e(28633),Ye=e.n(Ct),Ot=e(75396),Bt=e.n(Ot),St=e(21206);function Nt(f){return f instanceof Error?f:new Error(f)}var rt=function(f){a()(h,f);var m=u()(h);function h(){var v;P()(this,h);for(var s=arguments.length,_=new Array(s),A=0;A<s;A++)_[A]=arguments[A];return v=m.call.apply(m,[this].concat(_)),t()(d()(v),"_isComputedRunning",!1),t()(d()(v),"_defaultAbortController",null),t()(d()(v),"_userAbortController",void 0),v}return C()(h,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return E()(D()(h.prototype),"value",this)},set:function(s){Bt()(D()(h.prototype),"value",s,this,!0)}},{key:"onInitial",value:function(){var s=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(s.options.immediate===!0||s.options.immediate==="auto"&&s.options.initial===void 0)&&s.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var s=this;return Object.assign(t()(t()(t()(t()(t()(t()(t()(t()(t()({},re,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",Ce(function(_){return s.store.computedObjects.run(s.id,Object.assign({},_))})),"cancel",Ce(function(){s.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(s){var _=this,A=this.strPath,W=Object.keys(s).length;if(this.associated)this.store.update(function(ae){qe(ae,_.path,s)},{batch:W>1?A:!1});else{Object.assign(this.value,s);var F=W>1;Object.entries(s).forEach(function(ae){var X=Ye()(ae,2),ne=X[0],oe=X[1],ve={type:"set",path:[_.strPath,ne],value:oe,parent:_.value};F&&(ve.reply=!0),_.store.operates.emit("".concat(_.strPath,".").concat(ne),ve)}),F&&this.store.operates.emit(A,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var v=M()(o()().mark(function _(A){var W=this,F,ae,X,ne,oe,ve;return o()().wrap(function(me){for(;;)switch(me.prev=me.next){case 0:if(F=A!=null?A:{},ae=F.first,X=ae===void 0?!1:ae,!this.isDisable(A==null?void 0:A.enable)){me.next=4;break}return this.store.log(function(){return"Async computed <".concat(W.toString(),"> is disabled")},"warn"),me.abrupt("return");case 4:if(!X&&this.store.log(function(){return"Run async computed for : ".concat(W.toString())}),ne=A?Object.assign({},this.options,A):this.options,oe=Ve(this,"computed",this.context,ne),ve=ne.noReentry,!(ve&&this._isComputedRunning)){me.next=12;break}return this.store.log(function(){return"Reentry async computed: ".concat(W.toString())},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),me.abrupt("return");case 12:return this._isComputedRunning=!0,me.prev=13,me.next=16,this.executeGetter(oe,ne);case 16:return me.abrupt("return",me.sent);case 17:return me.prev=17,this._isComputedRunning=!1,me.finish(17);case 20:case"end":return me.stop()}},_,this,[[13,,17,20]])}));function s(_){return v.apply(this,arguments)}return s}()},{key:"createComputeProgressbar",value:function(s){var _=this,A=Object.assign({},s),W=A.max,F=W===void 0?100:W,ae=A.min,X=ae===void 0?0:ae,ne=A.value,oe=ne===void 0?0:ne;return this.updateComputedValue({progress:oe}),{value:function(pe){pe>F&&(pe=F),pe<X&&(pe=X),_.updateComputedValue({progress:pe})},end:function(){this.value(F)}}}},{key:"onDoneCallback",value:function(s,_,A,W,F,ae){typeof s.onDone=="function"&&s.onDone.call(this,{id:this.id,path:this.path,value:ae,error:_,abort:A,timeout:W,scope:F})}},{key:"getAbortController",value:function(s){if(s&&typeof s.abortController=="function"){var _=s.abortController();_&&_ instanceof AbortController&&(this._userAbortController=_)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(s,_,A){var W=this,F=A.timeout,ae=Array.isArray(F)?F:[F,0],X=Ye()(ae,2),ne=X[0],oe=ne===void 0?0:ne,ve=X[1],pe=ve===void 0?0:ve,me,Pe;return oe>0&&(_.timeout=pe>1?pe:oe,Pe=setTimeout(function(){s.hasTimeout=!0,s.hasError=!0,s.error="TIMEOUT",typeof s.timeoutCallback=="function"&&s.timeoutCallback(),clearInterval(me),W.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},oe),pe>1&&(me=setInterval(function(){W.updateComputedValue({timeout:pe--}),pe===0&&clearInterval(me)},oe/(pe+1)))),{clear:function(){clearTimeout(Pe),clearInterval(me)},enable:oe>0}}},{key:"executeGetter",value:function(){var v=M()(o()().mark(function _(A,W){var F,ae,X,ne,oe,ve,pe,me,Pe,fe,Ae,je,ke,De,Se,Re;return o()().wrap(function(Oe){for(;;)switch(Oe.prev=Oe.next){case 0:F=W.retry,ae=F===void 0?[0,0]:F,X=Array.isArray(ae)?ae:[Number(ae),0],ne=Ye()(X,2),oe=ne[0],ve=ne[1],me=this.getAbortController(W),Pe={onTimeout:function(Ke){return pe=Ke},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Ke){return Ke},cancel:me.abort,extras:W.extras,changed:W.changed,abortSignal:me.signal},fe={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:pe},me.signal.addEventListener("abort",function(){return fe.hasAbort=!0}),Ae={clear:function(){},enable:!1},ke=function(Ke){return Object.assign(fe,Ke)},De=0;case 9:if(!(De<oe+1)){Oe.next=46;break}if(Se={},Oe.prev=11,Re={loading:!0},fe.hasError&&(Re.error=null),oe>0&&(Re.retry=De>0?oe-De+1:0),De>0&&ke({error:null,hasError:!1,hasTimeout:!1}),Ae=this.setTimeoutControl(fe,Re,W),this.updateComputedValue(Re),!fe.hasAbort){Oe.next=20;break}throw new w;case 20:return Oe.next=22,this.getter.call(this,A,Pe);case 22:if(je=Oe.sent,!fe.hasAbort){Oe.next=25;break}throw new w;case 25:fe.hasTimeout||(Se.value=je,Ae.enable&&(Se.timeout=0)),Oe.next=33;break;case 28:Oe.prev=28,Oe.t0=Oe.catch(11),fe.hasError=!0,fe.error=Oe.t0,fe.hasTimeout||(Se.error=Nt(Oe.t0).message);case 33:return Oe.prev=33,Ae.clear(),De===oe&&(fe.hasTimeout&&(Se.error=fe.error),oe>0&&(Se.retry=0)),Se.loading=!1,this.updateComputedValue(Se),Oe.finish(33);case 39:if(!fe.hasError){Oe.next=43;break}if(!(oe>0&&ve>0&&De<oe)){Oe.next=43;break}return Oe.next=43,(0,St.g)(ve);case 43:De++,Oe.next=9;break;case 46:fe.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):fe.hasError||fe.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:fe.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:je,computedObject:this}),this.onDoneCallback(W,fe.error,fe.hasAbort,fe.hasTimeout,A,je);case 48:case"end":return Oe.stop()}},_,this,[[11,28,33,39]])}));function s(_,A){return v.apply(this,arguments)}return s}()},{key:"onDependsChange",value:function(s){var _=this;this.store.log(function(){return"AsyncComputed<".concat(_.id,"> is running by depends ").concat(s.type,"/").concat(s.path.join(".")," changed ")}),this.run({changed:s})}},{key:"getValueWatchPath",value:function(){var s=this.path.join(Q);return["".concat(s,".*"),s]}},{key:"getDepends",value:function(){var s=this,_=E()(D()(h.prototype),"getDepends",this).call(this);return _.map(function(A){if(A.length===0)return A;var W=x()(s.store.computedObjects.values()),F;try{for(W.s();!(F=W.n()).done;){var ae=F.value;if(_e(ae.path,A)&&ae.async)return["".concat(A,".value")]}}catch(X){W.e(X)}finally{W.f()}return A})}}]),h}(Je);function ot(){var f=arguments[0],m=typeof arguments[1]=="function"?arguments[1]:function(){return!0},h=k()(arguments[1])==="object"?arguments[1]:arguments[2],v=Object.assign({depends:[],enable:!0,objectify:!0,filter:m},h),s=function(){return{type:"watch",getter:f,options:v}};return s[V]=!0,s}var ut=function(f){a()(h,f);var m=u()(h);function h(v){var s;return P()(this,h),s=m.call(this),t()(d()(s),"_watcher",{off:function(){}}),t()(d()(s),"_enable",!0),s.store=v,s}return C()(h,[{key:"enable",get:function(){return this._enable},set:function(s){this._enable=s}},{key:"set",value:function(s,_){return E()(D()(h.prototype),"size",this)==0&&this.createWacher(),E()(D()(h.prototype),"set",this).call(this,s,_)}},{key:"createWacher",value:function(){var s=this;this._watcher=this.store.watch("**",function(_){var A=_.path;if(s._enable){var W=he(s.store.state,A),F=x()(s.values()),ae;try{for(F.s();!(ae=F.n()).done;){var X=ae.value;X.isMatched(A,W)&&X.run(A,W)}}catch(ne){F.e(ne)}finally{F.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off(),this.createWacher()}},{key:"create",value:function(s,_,A){var W=ot(s,_,A),F=W();return this.store._createWatch(F)}},{key:"enableGroup",value:function(s){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,A=x()(this.values()),W;try{for(A.s();!(W=A.n()).done;){var F=W.value;F.options.group==s&&(F.options.enable=_)}}catch(ae){A.e(ae)}finally{A.f()}}}]),h}($()(Map)),lt=function(f){a()(h,f);var m=u()(h);function h(v,s,_){var A;if(P()(this,h),A=m.call(this,v,s,_),t()(d()(A),"_cache",void 0),A.store=v,A.context=_,typeof A.options.filter!="function")throw new Error("watch options.filter must be a function");return A}return C()(h,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(s,_){return ie(s,this.path)?!1:this.filter(s,_)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(s,_){if(!this.enable){this.store.options.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var A,W=(A=this.getter)===null||A===void 0?void 0:A.call(this,{path:s,value:_},this);this.value=W,this.emitStoreEvent("watch:done",{value:W,watchObject:this})}catch(F){this.emitStoreEvent("watch:error",{error:F,watchObject:this})}}}]),h}(Ze),dt=Q;function st(f,m){if(!m||m==="**")return!0;var h=f.split(dt),v=m.split(dt);if(h.length!==v.length)return!1;for(var s=0;s<v.length;s++)if(v[s]!=="*"&&v[s]!==h[s])return!1;return!0}var Xe=function(){function f(){P()(this,f),t()(this,"_listeners",new Map)}return C()(f,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var h=this,v=arguments[0],s=arguments[1],_=arguments[2],A=s;return v==="**"?this.addHandler("*",A,_):String(v).includes("*")?(A=function(F,ae){st(ae,v)&&s(F,ae)},this.addHandler("*",A,_)):this.addHandler(v,A,_),{off:function(){return h.off(v,A)}}}},{key:"addHandler",value:function(h,v,s){var _=this._listeners.get(h);_?s?_.unshift(v):_.push(v):this._listeners.set(h,[v])}},{key:"once",value:function(h,v){var s=this,_=function A(W,F){try{v(W,F)}finally{s.off(F,A)}};return this.on(h,_)}},{key:"off",value:function(h,v){String(h).includes("*")&&(h="*");var s=this._listeners.get(h);s&&(v?s.splice(s.indexOf(v)>>>0,1):this._listeners.set(h,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(h){return this.on("**",h)}},{key:"wait",value:function(){var h=this,v=k()(arguments[0]),s=v==="string"?arguments[0]:void 0,_=arguments[1]||0,A=v==="function"?v:void 0,W;return new Promise(function(F,ae){var X;s?X=h.once(s,function(ne){clearTimeout(W),F(ne)}):typeof A=="function"&&(X=h.onAny(function(ne,oe){var ve=A(oe,ne);ve!==!1&&(X.off(),clearTimeout(W),F(ne))})),_>0&&(W=setTimeout(function(){X.off(),ae(new Error("timeout"))},_))})}},{key:"emit",value:function(h,v){var s=this._listeners.get("*");s&&s.slice().map(function(_){_(v,h)}),s=this._listeners.get(h),s&&s.slice().map(function(_){_(v,h)})}}]),f}();function Pt(f){var m;return ye(f)?m=f():typeof f=="function"&&(m={type:"computed",getter:f,options:Object.assign({},U(),{async:le(f)})}),m}var At=function(f){a()(h,f);var m=u()(h);function h(v,s){var _;return P()(this,h),_=m.call(this),t()(d()(_),"_data",void 0),t()(d()(_),"computedObjects",void 0),t()(d()(_),"watchObjects",void 0),t()(d()(_),"_operates",new Xe),t()(d()(_),"_options",void 0),t()(d()(_),"_silenting",!1),t()(d()(_),"_batching",!1),t()(d()(_),"_batchOperates",[]),t()(d()(_),"_peeping",!1),_._options=(0,gt.w)({id:$e(),debug:!1,lazy:!1,enableComputed:!0,log:_t},s),_.computedObjects=new tt(d()(_)),_.watchObjects=new ut(d()(_)),_.subscribeCallbacks(),_._data=bt(v,{notify:_._notify.bind(d()(_)),createComputedObject:_.createObserverObject.bind(d()(_))}),_._options.lazy||et(_._data),_._options.debug&&k()(globalThis.__AUTO_STORES__)=="object"&&globalThis.__AUTO_STORES__.add(d()(_)),_.getSnap=_.getSnap.bind(d()(_)),_.watch=_.watch.bind(d()(_)),_.update=_.update.bind(d()(_)),_.peep=_.peep.bind(d()(_)),_.silentUpdate=_.silentUpdate.bind(d()(_)),_.batchUpdate=_.batchUpdate.bind(d()(_)),_.collectDependencies=_.collectDependencies.bind(d()(_)),_.trace=_.trace.bind(d()(_)),_.installExtends(),_.emit("load",d()(_)),_}return C()(h,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(s,_){this._options.debug&&this.options.log(s,_)}},{key:"installExtends",value:function(){var s=this,_=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(_)&&_.forEach(function(A){return typeof A=="function"&&A(s)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(s){this._peeping&&s.type=="get"||(this._batching&&this._batchOperates.push(s),!this._silenting&&this.operates.emit(s.path.join(Q),s))}},{key:"watch",value:function(){var s=this,_=typeof arguments[0]=="function"||arguments[0]==="*",A=_?arguments[0]:arguments[1],W=function(Se,Re){return function(We){if(Se!=="*"){if(Se==="write"){if(We.type==="get")return}else if(Se==="read"){if(We.type!=="get")return}else if(Array.isArray(Se)&&Se.length>0&&!Se.includes(We.type))return}if(!(typeof Re=="function"&&!Re(We)))try{s._peeping=!0,A(We)}finally{s._peeping=!1}}};if(_){var F=Object.assign({once:!1,operates:"write"},arguments[1]),ae=F.operates,X=F.filter,ne=W(ae,X);return this.operates.onAny(ne)}else{var oe=arguments[0],ve=Array.isArray(oe)?oe.map(function(De){return typeof De=="string"?De:De.join(Q)}):[oe],pe=Object.assign({once:!1,operates:"write"},arguments[2]),me=pe.once,Pe=pe.operates,fe=pe.filter,Ae=me?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),je=[],ke=W(Pe,fe);return ve.forEach(function(De){je.push(Ae.call(s,De,ke))}),{off:function(){return je.forEach(function(Se){return Se.off()})}}}}},{key:"createObserverObject",value:function(s,_,A,W){var F=Pt(_),ae={path:s,value:_,parentPath:A,parent:W};if(F){if(F.type==="computed"){var X=this._createComputed(F,ae);return X==null?void 0:X.initial}else if(F.type==="watch"){var ne=this._createWatch(F,ae);return ne==null?void 0:ne.initial}}else return _}},{key:"_createComputed",value:function(s,_){var A;return s.options.async?A=new rt(this,s,_):A=new at(this,s,_),A&&(A.silentUpdate(A.initial),A.options.objectify&&this.computedObjects.set(A.id,A),this.emit("computed:created",A)),A}},{key:"_createWatch",value:function(s,_){var A=new lt(this,s,_);return s.options.objectify&&this.watchObjects.set(A.id,A),this.emit("watch:created",A),A}},{key:"silentUpdate",value:function(s){this.update(s,{silent:!0})}},{key:"batchUpdate",value:function(s){this.update(s,{batch:!0})}},{key:"update",value:function(s,_){var A=this,W=Object.assign({},_),F=W.batch,ae=F===void 0?!1:F,X=W.reply,ne=X===void 0?!0:X,oe=W.silent,ve=oe===void 0?!1:oe,pe=W.peep,me=pe===void 0?!1:pe;if(typeof s=="function"){ve&&(this._silenting=!0),ae&&(this._batching=!0,this._silenting=!0),me&&(this._peeping=!0);try{var Pe=s(this.state);if(ae&&ue(Pe))throw new Error("Batch update method can't be async function")}finally{if(this._silenting=!1,this._batching=!1,this._peeping=!1,this._batchOperates.length>0){var fe=p()(this._batchOperates);this._batchOperates=[],ne&&fe.forEach(function(je){je.reply=!0,A._notify(je)});try{var Ae=ae===!0?se:String(ae);this.operates.emit(Ae,{type:"batch",path:[Ae],value:fe})}finally{this._batchOperates=[]}}}}else throw new Error("update method must provide a function argument")}},{key:"peep",value:function(){var s=arguments,_=this,A=typeof arguments[0]=="function"?function(){return s[0](_.state)}:function(){return he(_.state,Array.isArray(s[0])?s[0]:s[0].split(Q))};this._peeping=!0;try{return A()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(s){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",A=[],W=this.watch(function(F){A.push(F.path)},{operates:_});try{s()}finally{W.off()}return ze(A)}},{key:"trace",value:function(s,_){var A=this,W;return{stop:function(){return W&&W.off()},start:function(){var F=M()(o()().mark(function X(ne){var oe;return o()().wrap(function(pe){for(;;)switch(pe.prev=pe.next){case 0:return oe=[],pe.abrupt("return",new Promise(function(me){W=A.watch(function(Pe){oe.push(Pe),ne&&ne(Pe)&&(W.off(),me(oe))},{operates:_}),Promise.resolve(s()).finally(function(){typeof ne!="function"&&(W.off(),me(oe))})}));case 2:case"end":return pe.stop()}},X)}));function ae(X){return F.apply(this,arguments)}return ae}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(s){var _=Object.assign({reserveAsync:!0},s),A=_.reserveAsync,W=_.entry;return we(W?he(this._data,W):this._data,A)}}]),h}(Xe)},11933:function(ee,c,e){"use strict";e.r(c);var K=e(86714),o=e.n(K),z={};for(var M in K)M!=="default"&&(z[M]=function(y){return K[y]}.bind(0,M));e.d(c,z)},86714:function(){},77283:function(ee,c,e){"use strict";e.d(c,{o:function(){return z}});var K=e(80007),o=e(92379);function z(M,y){var p=(0,o.useRef)();return p.current||(p.current=new K.n(M,y)),p.current}},44970:function(ee,c,e){"use strict";e.r(c),e.d(c,{ASYNC_COMPUTED_VALUE:function(){return p.eg},AbortError:function(){return p._L},AsyncComputedObject:function(){return p.WE},AutoStore:function(){return p.M1},AutoStoreError:function(){return p.CD},BATCH_UPDATE_EVENT:function(){return p.up},ComputedObject:function(){return p.Xr},ComputedObjects:function(){return p.BG},CyleDependError:function(){return p.e2},EventEmitter:function(){return p.vp},InvalidComputedArgumentsError:function(){return p.FM},InvalidDependsError:function(){return p.y1},InvalidScopeError:function(){return p.MI},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return p.Q6},OBSERVER_DESCRIPTOR_FLAG:function(){return p.kF},ObserverObject:function(){return p.Rn},ObserverScopeRef:function(){return p.fR},PATH_DELIMITER:function(){return p.f7},ReactAutoStore:function(){return K.n},SKIP_PROXY_FLAG:function(){return p.QI},SyncComputedObject:function(){return p.X3},TimeoutError:function(){return p.W5},WatchObject:function(){return p.RY},WatchObjects:function(){return p.LG},calcDependPaths:function(){return p.Rh},computed:function(){return p.Fl},createStore:function(){return K.M},defineExtend:function(){return p.Ws},delay:function(){return p.gw},forEachObject:function(){return p.b0},getComputedId:function(){return p.tl},getDepends:function(){return p.if},getId:function(){return p.zv},getMapVal:function(){return p.ux},getSnap:function(){return p.kM},getSnapshot:function(){return p.vM},getVal:function(){return p.Jy},isAbsolutePath:function(){return p.O5},isAsyncComputedValue:function(){return p.Jq},isEq:function(){return p.vo},isEventMatched:function(){return p.c6},isMap:function(){return p._N},isObserverDescriptor:function(){return p.iI},isObserverDescriptorBuilder:function(){return p.vb},isPathEq:function(){return p.PH},isPathMatched:function(){return p.J_},isPlainObject:function(){return p.PO},isPrimitive:function(){return p.pt},isPromise:function(){return p.tI},isProxy:function(){return p.RM},isRaw:function(){return p._R},joinValuePath:function(){return p.UQ},markRaw:function(){return p.Xl},noRepeat:function(){return p.DH},normalizeDeps:function(){return p.KZ},pathIsExists:function(){return p.Ql},pathStartsWith:function(){return p.ZW},setVal:function(){return p.Y6},updateObjectVal:function(){return p.EG},useStore:function(){return y.o},watch:function(){return p.YP}});var K=e(80007),o=e(11933),z={};for(var M in o)["default","ReactAutoStore","createStore"].indexOf(M)<0&&(z[M]=function(j){return o[j]}.bind(0,M));e.d(c,z);var y=e(77283),p=e(99640)},80007:function(ee,c,e){"use strict";e.d(c,{n:function(){return re},M:function(){return le}});var K=e(6270),o=e.n(K),z=e(93949),M=e.n(z),y=e(28810),p=e.n(y),j=e(77701),k=e.n(j),n=e(28249),P=e.n(n),b=e(29861),C=e.n(b),i=e(99640),d=e(12027),l=e.n(d),a=e(24325),r=e.n(a),u=e(28633),I=e.n(u),t=e(92379);function g(T,U,Y,ce){if(!U)return T.state;var de;try{typeof U=="function"?de=U(T.state):Array.isArray(U)?de=(0,i.Jy)(T.state,U):de=(0,i.Jy)(T.state,U.split(i.f7)),Y&&(0,i.Jq)(de)&&(de=de.value)}catch(te){if(ce)return ce(te)}return de}function x(T){return function(){var U=arguments,Y=U.length>=1&&(Array.isArray(U[0])||typeof U[0]=="string"||typeof U[0]=="function")?U[0]:void 0,ce=U.length===2&&typeof U[1]=="function"?U[1]:void 0,de=U.length===2&&(typeof Y=="string"||Array.isArray(Y))&&typeof U[1]=="boolean"?U[1]:!1,te=(0,t.useState)(function(){return g(T,Y,de!==!0)}),ie=I()(te,2),xe=ie[0],_e=ie[1],ge=T.useDeps(Y,de===!0?"all":"value");(0,t.useEffect)(function(){var Ie;return ge.length===0?Ie=T.watch(function(){_e(r()({},T.state))}):Ie=T.watch(ge,function(){var ue=g(T,Y);_e((0,i.PO)(ue)?r()({},ue):Array.isArray(ue)?l()(ue):ue)}),function(){return Ie.off()}},[ge]);var be=(0,t.useCallback)(function(Ie){Y?typeof Y=="string"?T.update(function(ue){return(0,i.Y6)(ue,Y.split(i.f7),Ie)}):Array.isArray(Y)?T.update(function(ue){return(0,i.Y6)(ue,Y,Ie)}):typeof Y=="function"&&ce&&T.update(function(ue){return ce(Ie,ue)}):typeof Ie=="function"&&T.update(function(ue){return Ie(ue)},{batch:!0})},[Y]);return[xe,be]}}function B(T){return function(U){var Y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",ce=(0,t.useState)(function(){return(0,i.if)(U,T,Y)}),de=I()(ce,1),te=de[0];return te}}var E=e(651);function O(T,U,Y){var ce=Y.errorBoundary||T.options.signalErrorBoundary;return t.memo(function(){var de=T.useDeps(U),te=(0,t.useState)(null),ie=I()(te,2),xe=ie[0],_e=ie[1],ge=(0,t.useState)(function(){return g(T,U,!0,_e)}),be=I()(ge,2),Ie=be[0],ue=be[1];return(0,t.useEffect)(function(){var ye=T.watch(de,function(){ue(g(T,U,!0,_e))});return function(){return ye.off()}},[de]),(0,E.jsx)(E.Fragment,{children:xe?(0,E.jsx)(ce,{error:xe}):String(Ie)})},function(){return!0})}function D(T,U,Y,ce){var de=ce.errorBoundary||T.options.signalErrorBoundary;return t.memo(function(){var te=(0,t.useState)(null),ie=I()(te,2),xe=ie[0],_e=ie[1],ge=(0,t.useState)(function(){return g(T,Y,!1,_e)}),be=I()(ge,2),Ie=be[0],ue=be[1],ye=(0,i.Jq)(Ie),Ne=(0,t.useMemo)(function(){return ye?Ie:{value:Ie}},[Ie]),Ee=T.useDeps(Y,"none");return(0,t.useEffect)(function(){var he=ye?"".concat(Array.isArray(Y)?Y.join(i.f7):Y,".*"):Ee,Ce=T.watch(he,function(Be){var Me=Be.path,$e=Be.value;ue(ye?r()(r()({},Ie),{},C()({},Me[Me.length-1],$e)):g(T,Y,!1,_e))});return function(){return Ce.off()}},[Ee]),(0,E.jsx)(E.Fragment,{children:xe?(0,E.jsx)(de,{error:xe}):U(Ne)})},function(){return!0})}function S(T,U,Y,ce){var de=ce.errorBoundary||T.options.signalErrorBoundary;return t.memo(function(){var te=(0,t.useState)(null),ie=I()(te,2),xe=ie[0],_e=ie[1],ge=(0,i.vb)(Y)?Y():Y,be=(0,t.useState)(function(){try{if((0,i.iI)(ge)){if(ge.options.objectify=!1,ge.type==="computed")return T.computedObjects.create(ge);if(ge.type==="watch")return T.watchObjects.create(ge)}else{var Ce=(0,i.Fl)(ge),Be=Ce();return Be.options.objectify=!1,T.computedObjects.create(Be)}}catch(Me){return _e(Me),null}}),Ie=I()(be,1),ue=Ie[0],ye=(0,t.useState)(function(){return ue?ue.async?ue.value:{value:ue.value}:{value:""}}),Ne=I()(ye,2),Ee=Ne[0],he=Ne[1];return(0,t.useEffect)(function(){var Ce={off:function(){}};return ue&&(Ce=ue.watch(function(Be){if(!Be.reply)try{if(ue.type==="computed")if(ue.async){var Me=ue;((0,i.PH)(Be.path,Me.path)||(0,i.PH)(Be.path.slice(0,-1),Me.path))&&he(r()({},Me.value))}else he({value:ue.value});else ue.type==="watch"&&he({value:ue.value})}catch($e){_e($e)}},{operates:"write"})),function(){return Ce.off()}},[ge]),(0,E.jsx)(E.Fragment,{children:xe?(0,E.jsx)(de,{error:xe}):U(Ee)})},function(){return!0})}function $(T){return function(){var U=arguments,Y=U.length>=1&&(typeof U[0]=="string"||typeof U[0]=="function")&&(!U[1]||(0,i.PO)(U[1]))?U[0]:void 0,ce=U.length>=2&&typeof U[0]=="function"&&(typeof U[1]=="string"||Array.isArray(U[1])||typeof U[1]=="function")?U[0]:void 0,de=U.length>=2&&typeof U[1]=="function"?U[1]:void 0,te=U.length>=2&&typeof U[0]=="function"&&(typeof U[1]=="string"||Array.isArray(U[1]))?U[1]:void 0,ie=Object.assign({},U.length>1&&(0,i.PO)(U[U.length-1])?U[U.length-1]:void 0),xe=Y?O(T,Y,ie):te?D(T,ce,te,ie):de?S(T,ce,de,ie):function(){return(0,E.jsx)(E.Fragment,{})};return(0,E.jsx)(xe,{})}}function R(T){var U=T;if(T){T.persist&&T.persist();var Y=T.currentTarget;Y&&T.type?Y.tagName==="INPUT"&&Y.type==="checkbox"?U=Y.checked:U=Y.value:T.nativeEvent&&T.target&&(U=T.target.value)}return U}function w(T){return function(){var U=arguments,Y=U.length>=1&&typeof U[0]=="string"?U[0]:void 0;if(!Y)throw new Error("Input bind must have at least one argument");var ce={};return ce.onChange=function(de){var te=R(de);(0,i.Y6)(T.state,Y.split(i.f7),te)},ce}}function Z(T){return function(){var U=arguments,Y=U.length>=1?Array.isArray(U[0])?U[0]:typeof U[0]=="string"?U[0].split(i.f7):void 0:void 0,ce=U.length>=2&&typeof U[0]=="function"?U[0]:void 0,de=U.length>=2&&typeof U[1]=="function"?U[1]:void 0,te=(0,t.useCallback)(function(ue,ye){return{value:ye,onChange:function(Ee){var he=R(Ee);ue?T.update(function(Ce){return(0,i.Y6)(Ce,Array.isArray(ue)?ue:ue.split(i.f7),he)}):de(he,T.state)}}},[]),ie=(0,t.useCallback)(function(ue,ye){var Ne={};return Object.entries(ye).forEach(function(Ee){var he=I()(Ee,2),Ce=he[0],Be=he[1];if((0,i.pt)(Be)){var Me=ue?[].concat(l()(ue),[Ce]):[Ce];Ne[Ce]=te(Me,Be)}}),Ne},[]),xe=(0,t.useState)(function(){if(typeof ce=="function")return te(void 0,ce(T.state));var ue=Y?g(T,Y,!0):T.state;if((0,i.PO)(ue))return ie(Y,ue);if(typeof Y=="string")return te(Y,ue);if(Array.isArray(Y))return te(Y.join(i.f7),ue)}),_e=I()(xe,2),ge=_e[0],be=_e[1],Ie=T.useDeps(Y||ce);return(0,t.useEffect)(function(){var ue;if(Ie.length===0||U.length===0)ue=T.watch(function(Ee){var he=Ee.path,Ce=Ee.value;he.length===1&&(0,i.pt)(Ce)&&be(r()(r()({},ge),{},C()({},he[0],te(he[0],Ce))))});else if(Ie.length>0){var ye=Y?g(T,Y,!0):void 0,Ne=(0,i.PO)(ye);Y&&Ne&&Ie.length===1&&Ie[0].push("*"),ue=T.watch(Ie,function(Ee){var he=Ee.path,Ce=Ee.value;if(typeof ce=="function"){var Be=ce(T.state);be(te(void 0,Be))}else be(Ne?r()(r()({},ge),{},C()({},he[he.length-1],te(he,Ce))):te(he,Ce))})}return function(){return ue.off()}},[Ie]),ge}}function L(T){var U=arguments;return function(){var Y=U[0],ce=U[1],de=U[2];(0,t.useEffect)(function(){var te=T.watch(Y,ce,de);return function(){return te.off()}},[])}}var q=e(34180),H=e.n(q),J=Symbol("FAKE_BINDINGS");function N(T,U){var Y={};return U instanceof Map?U.forEach(function(ce,de){Y[de]=J}):Object.entries(U).forEach(function(ce){var de=I()(ce,1),te=de[0];Y[te]=J}),Y}function V(T,U,Y){return{value:Y,onChange:function(de){var te=R(de);T.update(function(ie){return(0,i.Y6)(ie,U,te)})}}}function G(T,U,Y,ce,de){if(H()(T)!=="object"||T===null)return T;var te=U.length===0?"__ROOT__":U.join(".");if(Y.has(te))return Y.get(te);var ie=T;(Array.isArray(T)||(0,i.PO)(T))&&(ie=N(ce,T));var xe=new Proxy(ie,{get:function(ge,be,Ie){if(typeof be!="string")return Reflect.get(ge,be,Ie);var ue=[].concat(l()(de),l()(U),[String(be)]),ye=(0,i.Jy)(ce.state,ue);return(0,i.pt)(ye)?V(ce,ue,ye):(0,i.Jq)(ye)?V(ce,[].concat(l()(ue),["value"]),ye):G(ye,ue,Y,ce,de)}});return Y.set(te,xe),xe}function Q(T,U){var Y=new Map;return G({},[],Y,T,U)}function se(T){return function(){var U=arguments,Y=U.length>0?typeof U[0]=="string"?U[0].split(i.f7):Array.isArray(U[0])?U[0]:[]:[],ce=(0,t.useState)(function(){return T.getSnap({entry:Y})}),de=I()(ce,2),te=de[0],ie=de[1],xe=(0,t.useState)(function(){return Q(T,Y)}),_e=I()(xe,1),ge=_e[0];return(0,t.useSyncExternalStore)(function(be){var Ie=T.watch(function(ue){var ye=ue.path,Ne=ue.value;if((0,i.ZW)(Y,ye)){var Ee=ye.slice(Y.length);(0,i.Y6)(te,Ee,Ne),(0,i.Y6)(ge,[].concat(l()(Ee),["value"]),Ne),ie(r()({},te)),be()}});return function(){Ie.off()}},function(){return te}),ge}}var re=function(T){k()(Y,T);var U=P()(Y);function Y(ce,de){var te;return M()(this,Y),te=U.call(this,ce,Object.assign({signalErrorBoundary:function(){return(0,E.jsx)(E.Fragment,{children:"ERROR"})}},de)),C()(p()(te),"useState",void 0),C()(p()(te),"useAsyncState",void 0),C()(p()(te),"useDeps",void 0),C()(p()(te),"$",void 0),C()(p()(te),"signal",void 0),C()(p()(te),"bind",void 0),C()(p()(te),"useInput",void 0),C()(p()(te),"useWatch",void 0),C()(p()(te),"useFormBindings",void 0),te.signal=te.$=$(p()(te)).bind(p()(te)),te.useState=x(p()(te)).bind(p()(te)),te.useAsyncState=function(ie){return te.useState(ie,!0)[0]},te.useDeps=B(p()(te)).bind(p()(te)),te.useInput=Z(p()(te)).bind(p()(te)),te.bind=w(p()(te)).bind(p()(te)),te.useWatch=L(p()(te)).bind(p()(te)),te.useFormBindings=se(p()(te)).bind(p()(te)),te}return o()(Y)}(i.M1);function le(T,U){return new re(T,U)}},60358:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(77643);const o=[]},19962:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(61668);const o=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},63611:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(28627);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
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
`,paraId:18,tocIndex:3},{value:"\u66F4\u591A\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:19,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:20,tocIndex:3},{value:"\u3002",paraId:19,tocIndex:3}]},58524:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(46267);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
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
`,paraId:58,tocIndex:16}]},77614:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(25231);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
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
`,paraId:21,tocIndex:7},{value:"\u4F7F\u7528",paraId:22,tocIndex:7},{value:"computed",paraId:22,tocIndex:7},{value:"\u53EF\u4EE5\u8FDB\u884C\u66F4\u591A\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982",paraId:22,tocIndex:7},{value:"options",paraId:22,tocIndex:7},{value:"\u7B49\u3002",paraId:22,tocIndex:7},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:23,tocIndex:8},{value:"\uFF1A",paraId:23,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"PARENT",paraId:24,tocIndex:8},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:24,tocIndex:8},{value:"associated=true",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:24,tocIndex:8},{value:"obj.value",paraId:24,tocIndex:8},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:24,tocIndex:8},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:25,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:26,tocIndex:8},{value:"\u4F7F\u7528",paraId:27},{value:"computed(<getter>,<depends>,<options>)",paraId:27},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:27},{value:"getter",paraId:28},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:28},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:29},{value:"depends",paraId:28},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:28},{value:"\u4F9D\u8D56",paraId:30},{value:"options",paraId:28},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:28},{value:"\u9009\u9879",paraId:31}]},68258:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(83717);const o=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
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
`,paraId:25,tocIndex:5},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:26,tocIndex:5},{value:"./price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"./count",paraId:26,tocIndex:5},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:26,tocIndex:5},{value:"price",paraId:26,tocIndex:5},{value:"\u548C",paraId:26,tocIndex:5},{value:"count",paraId:26,tocIndex:5},{value:"\u5C5E\u6027\u3002",paraId:26,tocIndex:5},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:26,tocIndex:5},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:26,tocIndex:5}]},94957:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(76938);const o=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},15467:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(87480);const o=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"store.computedObjects",paraId:0,tocIndex:0},{value:"\u6765\u7BA1\u7406",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A",paraId:1,tocIndex:0},{value:"Map",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u662F\u4E00\u4E2A\u7C7B\uFF0C\u67E5\u770BAPI\u6587\u6863\u53EF\u4EE5\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\u3002",paraId:3}]},33989:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(15968);const o=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u652F\u6301",paraId:0,tocIndex:0},{value:"ComputedOptions",paraId:0,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u53C2\u6570\u6765\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`// \u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
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
`,paraId:48,tocIndex:14},{value:"\u7C7B\u578B",paraId:49,tocIndex:15},{value:"\uFF1A",paraId:49,tocIndex:15},{value:"(error:Error)=>void",paraId:49,tocIndex:15},{value:"\u5F53\u6267\u884C\u8BA1\u7B97",paraId:50,tocIndex:15},{value:"getter",paraId:50,tocIndex:15},{value:"\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03",paraId:50,tocIndex:15},{value:"\u7C7B\u578B",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:"(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void",paraId:51,tocIndex:16},{value:"\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u5B8C\u6210\u65F6\u7684\u56DE\u8C03",paraId:52,tocIndex:16}]},51289:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(49613);const o=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:0,tocIndex:0},{value:"\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:1,tocIndex:0},{value:"ComputedObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:0},{value:"ComputedObject",paraId:2,tocIndex:0},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:2,tocIndex:0},{value:"store.computedObjects",paraId:2,tocIndex:0},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:2,tocIndex:0},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"store.computedObjects.get(<id>).run()",paraId:3,tocIndex:1},{value:"\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:`import { createStore,computed } from '@autostorejs/react';
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
\u5F53\u4F7F\u7528`,paraId:11,tocIndex:3},{value:"computed",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"group",paraId:11,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:11,tocIndex:3},{value:"computed",paraId:12,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"enable",paraId:12,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:12,tocIndex:4},{value:"enable=false",paraId:12,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:12,tocIndex:4},{value:"enable=true",paraId:12,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:13,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:14,tocIndex:4},{value:"enable",paraId:14,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:14,tocIndex:4}]},48248:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(87975);const o=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
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
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},92205:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(48120);const o=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
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
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},35603:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(93359);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0}]},80870:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(76233);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useFormBindings",paraId:2,tocIndex:0}]},94226:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(97820);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},63653:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(36339);const o=[{value:"useFormBindings",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u7EC8\u6781\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u7ED1\u5B9A\u5728\u4E00\u8D77\uFF0C\u4EE3\u7801\u66F4\u52A0\u7B80\u6D01\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useFormBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useFormBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1},{value:"\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:2,tocIndex:2},{value:"useFormBindings",paraId:2,tocIndex:2},{value:"\u6765\u6536\u96C6\u8868\u5355\u6570\u636E\uFF0C\u901A\u8FC7",paraId:2,tocIndex:2},{value:"ref",paraId:2,tocIndex:2},{value:"\u5C5E\u6027\u7ED1\u5B9A\u5230",paraId:2,tocIndex:2},{value:"form",paraId:2,tocIndex:2},{value:"\u5143\u7D20\u4E0A\uFF0C\u7136\u540E\u901A\u8FC7",paraId:2,tocIndex:2},{value:"bindings.ref",paraId:2,tocIndex:2},{value:"\u6765\u83B7\u53D6",paraId:2,tocIndex:2},{value:"form",paraId:2,tocIndex:2},{value:"\u5143\u7D20\u7684\u5F15\u7528\u3002",paraId:2,tocIndex:2},{value:"useFormBindings",paraId:3,tocIndex:2},{value:"\u4F1A\u4FA6\u542C\u8868\u5355\u7684",paraId:3,tocIndex:2},{value:"change",paraId:3,tocIndex:2},{value:"\u4E8B\u4EF6\uFF0C\u7136\u540E\u81EA\u52A8\u540C\u6B65\u8868\u5355\u6570\u636E\u5230\u72B6\u6001\u4E2D\u3002",paraId:3,tocIndex:2},{value:`import { useStore } from '@autostorejs/react';
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

`,paraId:4,tocIndex:2}]},13927:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(45889);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useInput",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useInput(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useInput",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
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
`,paraId:6}]},86231:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(9159);const o=[]},26021:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(61077);const o=[]},27067:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(47315);const o=[]},72997:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(26916);const o=[{value:`npm install  @autostorejs/react
`,paraId:0},{value:`yarn add @autostorejs/react
`,paraId:1},{value:`pnpm add @autostorejs/react
`,paraId:2}]},42516:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(3694);const o=[]},679:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(4180);const o=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
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
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},86761:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(75690);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},47864:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(8767);const o=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},57143:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(63518);const o=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
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
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},82919:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(35371);const o=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},89615:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(33358);const o=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},56126:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(23841);const o=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
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
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},51337:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(31363);const o=[]},32465:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(81897);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF08\u57FA\u4E8E",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u5C01\u88C5\uFF09\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},80814:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(94451);const o=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},60726:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(61786);const o=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},37445:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(34450);const o=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
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
`,paraId:14,tocIndex:2}]},98041:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(22273);const o=[{value:"\u6839\u636E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684",paraId:0,tocIndex:0},{value:"\u57FA\u672C\u539F\u7406",paraId:1,tocIndex:0},{value:"\uFF0C\u5176\u5185\u7F6E\u4E86\u4E00\u4E2A\u72B6\u6001\u53D8\u5316\u4E8B\u4EF6\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:`\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002
\u901A\u8FC7\u4FA6\u542C\u4E8B\u4EF6\u5C31\u53EF\u4EE5\u4F7F\u7528`,paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:3,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.useWatch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"store",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:3,tocIndex:0}]},32982:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(66663);const o=[{value:"useWatch",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u7528\u6765\u4FA6\u542C",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\uFF0C\u672C\u8D28\u4E0A\u662F\u5BF9",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u7684\u5C01\u88C5\u3002",paraId:0,tocIndex:0},{value:"useWatch",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export interface UseWatchType {
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
`,paraId:5,tocIndex:0}]},65365:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(26826);const o=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6240\u6709\u5728\u72B6\u6001\u4E2D\u76F4\u63A5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u58F0\u660E\u7684\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u5E94",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:"\u4EE5\u4E0B\u662F\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF\u7684\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:2,tocIndex:0},{value:"\u540C",paraId:3,tocIndex:2},{value:"computed",paraId:3,tocIndex:2},{value:"\u4E00\u6837\uFF0C\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E",paraId:3,tocIndex:2},{value:"watch",paraId:3,tocIndex:2},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:3,tocIndex:2},{value:"store.watchObjects.create",paraId:3,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61",paraId:3,tocIndex:2},{value:"create",paraId:4,tocIndex:2},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:2},{value:`  create<Value=any,DependValue=any>(
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

`,paraId:7,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u76D1\u542C\u5BF9\u8C61\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684",paraId:9,tocIndex:2},{value:"associated=false",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u76D1\u542C\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:9,tocIndex:2},{value:"obj.value",paraId:9,tocIndex:2},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:9,tocIndex:2},{value:"\u540C",paraId:10,tocIndex:3},{value:"ComputedObject",paraId:10,tocIndex:3},{value:"\u4E00\u6837\uFF0C",paraId:10,tocIndex:3},{value:"WatchObject",paraId:10,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u624B\u52A8\u6267\u884C\uFF0C\u901A\u8FC7",paraId:10,tocIndex:3},{value:'store.watchObjects.get("<id>").run()',paraId:10,tocIndex:3},{value:"\u6765\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:10,tocIndex:3}]},89167:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(37686);const o=[{value:"@autostorejs/react",paraId:0,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:0,tocIndex:1},{value:"watch",paraId:0,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:0,tocIndex:1},{value:"state",paraId:0,tocIndex:1},{value:"\u4E2D\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5BF9\u8C61,\u7136\u540E\u76D1\u542C\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E\u6240\u5728\u8DEF\u5F84\u3002",paraId:0,tocIndex:1},{value:"watch",paraId:1,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:"\u5728\u72B6\u6001\u4E2D\u7684\u4EFB\u610F\u4F4D\u7F6E\uFF0C\u4F7F\u7528",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u6765\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5668\u5BF9\u8C61\u3002",paraId:2,tocIndex:1},{value:"\u5728",paraId:2,tocIndex:1},{value:"createStore",paraId:2,tocIndex:1},{value:"\u6267\u884C\u540E\uFF0C\u4F1A\u626B\u63CF\u72B6\u6001\u6570\u636E\uFF0C\u5982\u679C\u53D1\u73B0\u4E00\u4E2A\u503C\u662F",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:",\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u76D1\u542C",paraId:2,tocIndex:1},{value:"State",paraId:2,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:1},{value:"\u521B\u5EFA\u7684",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4F1A\u4FDD\u5B58\u5728",paraId:2,tocIndex:1},{value:"Store",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"watchObjects",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4E2D",paraId:2,tocIndex:1},{value:"\u5F53\u6240\u76D1\u542C\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u8C03\u7528",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"getter",paraId:2,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8FD4\u56DE\u7ED3\u679C\u5199\u5165\u5230\u58F0\u660E",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:1},{value:"watch",paraId:3,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:2},{value:`// \u76D1\u542Cfilter\u8FC7\u6EE4\u540E\u7684
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
`,paraId:18,tocIndex:5},{value:"\u8BF4\u660E\uFF1A",paraId:19,tocIndex:5},{value:"\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5B9E\u73B0\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u6765\u8868\u5355\u6574\u4E2A\u8868\u5355\u7684\u6709\u6548\uFF0C\u5F53\u72B6\u6001\u4E2D\u4EFB\u610F\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u7684",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u90FD\u4E3A",paraId:20,tocIndex:5},{value:"false",paraId:20,tocIndex:5},{value:"\u65F6\uFF0C\u5219",paraId:20,tocIndex:5},{value:"validate=false",paraId:20,tocIndex:5},{value:"\uFF0C\u5426\u5219\u4E3A",paraId:20,tocIndex:5},{value:"true",paraId:20,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5},{value:"\u73B0\u5728\u95EE\u9898\u662F",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u53EF\u80FD\u662F\u5728\u4E00\u4E2A\u590D\u6742\u7684\u5D4C\u5957\u5BF9\u8C61\u4E2D\uFF0C\u5E76\u4E14\u53EF\u80FD\u662F\u52A8\u6001\u7684\u3002\u8FD9\u65F6\u5019\uFF0C\u6211\u4EEC\u65E0\u6CD5\u4F7F\u7528",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u6765\u8FDB\u884C\u8BA1\u7B97\uFF0C\u56E0\u4E3A",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\u3002",paraId:20,tocIndex:5},{value:"\u6B64\u65F6\u5C31\u662F\u4F7F\u7528",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\u7684\u65F6\u5019\u4E86\uFF0C\u6211\u4EEC\u58F0\u660E\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u76D1\u542C\u6240\u6709\u8DEF\u5F84\u4E2D\u7684",paraId:20,tocIndex:5},{value:"path[path.length-1]=='validate'",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u7684\u53D8\u5316\u5373\u53EF\u3002",paraId:20,tocIndex:5},{value:"\u5173\u4E8E",paraId:20,tocIndex:5},{value:"WatchObject",paraId:20,tocIndex:5},{value:"\u7684\u4ECB\u7ECD\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:20,tocIndex:5},{value:"\u76D1\u542C\u5BF9\u8C61",paraId:21,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5}]},23989:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(73549);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"watch",paraId:1,tocIndex:1},{value:"\u65B9\u6CD5\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`// \u76D1\u542C\u5168\u90E8
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
`,paraId:26,tocIndex:9},{value:"store.watch",paraId:27},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:27},{value:"State",paraId:27},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u5B9E\u73B0\u4E5F\u662F\u57FA\u4E8E",paraId:27},{value:"watch",paraId:27},{value:"\u65B9\u6CD5\u3002",paraId:27}]},36109:function(ee,c,e){"use strict";e.r(c),e.d(c,{texts:function(){return o}});var K=e(43112);const o=[]}}]);
