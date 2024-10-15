(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[1904],{1801:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(77643),k={}},44887:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return s}});var U=e(24325),o=e.n(U),k=e(29008),R=e.n(k),b=e(28633),d=e.n(b),D=e(70958),W=e.n(D),u=e(92379),A=e(61668),v=e(44970),y=e(365),i=e(20927),s={"docs-exmaples-get-repos-demo-0":{component:u.memo(u.lazy(W()(R()().mark(function l(){var a,n,r,c,t,I,p,O,g,x,N,h,M,P,j;return R()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=L.sent,n=a.computed,r=a.createStore,L.next=7,Promise.resolve().then(e.bind(e,365));case 7:return c=L.sent,t=c.Input,I=c.Box,p=c.Button,L.next=13,Promise.resolve().then(e.bind(e,20927));case 13:return O=L.sent,g=O.api,x=r({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:n(function(){var Z=W()(R()().mark(function w(V,Y){var te,H,de;return R()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return te=d()(V,1),H=te[0],de=Y.abortSignal,ve.next=4,new Promise(function(_e,ye){de.addEventListener("abort",function(){ye("cancelled")}),g.getProjects(H).then(function(De){_e(De)}).catch(function(De){ye(De)})});case 4:case"end":return ve.stop()}},w)}));return function(w,V){return Z.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),N=x.state,h=x.bind,M=x.$,P=x.useState,j=x.useAsyncState,L.abrupt("return",{default:function(){var w=P("user.repo"),V=d()(w,1),Y=V[0],te=j("user.projects");return u.createElement("div",null,u.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),u.createElement(t,o()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:Y},h("user.repo"))),u.createElement(p,{onClick:function(){return N.user.projects.run()}},"\u91CD\u8BD5"),u.createElement(p,{onClick:function(){return N.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),u.createElement(I,null,u.createElement("table",{className:"projects-list"},u.createElement("thead",null,u.createElement("tr",null,u.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),u.createElement("td",null,u.createElement("b",null,"\u8BF4\u660E")),u.createElement("td",null,u.createElement("b",null,"\u661F")))),u.createElement("tbody",null,te.loading?u.createElement("tr",null,u.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):te.error?u.createElement("tr",null,u.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",te.error)):te.value&&te.value.map(function(H,de){return u.createElement("tr",{key:de},u.createElement("td",null,u.createElement("a",{href:H.url,target:"__blank"},H.name)),u.createElement("td",null,H.description),u.createElement("td",null,H.stars))})))))}});case 17:case"end":return L.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y,"autostore-docs":i},renderOpts:{compile:function(){var l=W()(R()().mark(function n(){var r,c=arguments;return R()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(9039).then(e.bind(e,39039));case 2:return I.abrupt("return",(r=I.sent).default.apply(r,c));case 3:case"end":return I.stop()}},n)}));function a(){return l.apply(this,arguments)}return a}()}}}},16960:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(28627),k={}},87524:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return i}});var U=e(24325),o=e.n(U),k=e(28633),R=e.n(k),b=e(29008),d=e.n(b),D=e(70958),W=e.n(D),u=e(92379),A=e(46267),v=e(44970),y=e(365),i={"docs-guide-computed-async-demo-0":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N;return d()().wrap(function(M){for(;;)switch(M.prev=M.next){case 0:return M.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=M.sent,a=l.delay,n=l.createStore,r=l.computed,M.next=8,Promise.resolve().then(e.bind(e,365));case 8:return c=M.sent,t=c.Input,I=c.ColorBlock,p=n({user:{firstName:"Zhang",lastName:"Fisher",fullName:r(function(){var P=W()(d()().mark(function j(K){return d()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,a(1e3);case 2:return Z.abrupt("return",K.firstName+" "+K.lastName);case 3:case"end":return Z.stop()}},j)}));return function(j){return P.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),O=p.useAsyncState,g=p.useState,x=p.state,N=p.bind,M.abrupt("return",{default:function(){var j=g("user.firstName"),K=R()(j,1),L=K[0],Z=g("user.lastName"),w=R()(Z,1),V=w[0],Y=O("user.fullName");return u.createElement(u.Fragment,null,u.createElement(t,o()({label:"firstName",value:L},N("user.firstName"))),u.createElement(t,o()({label:"lastName",value:V},N("user.lastName"))),u.createElement(I,{name:"FullName",loading:Y.loading},Y.value))}});case 13:case"end":return M.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-1":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p;return d()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=g.sent,a=l.useStore,n=l.computed,r=l.delay,g.next=8,Promise.resolve().then(e.bind(e,365));case 8:return c=g.sent,t=c.ColorBlock,I=c.Button,p=c.JsonView,g.abrupt("return",{default:function(){var N=a({firstName:"Zhang",lastName:"Fisher",fullName:n(function(){var K=W()(d()().mark(function L(Z){return d()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,r();case 2:if(!Z.triggerError){V.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return V.abrupt("return",Z.firstName+" "+Z.lastName);case 5:case"end":return V.stop()}},L)}));return function(L){return K.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),h=N.state,M=N.$,P=N.useAsyncState,j=P("fullName");return u.createElement("div",null,u.createElement(t,{name:"FirstName"},M("firstName")),u.createElement(t,{name:"FirstName"},M("lastName")),u.createElement(t,{name:"FullName",loading:j.loading},j.loading?"\u6B63\u5728\u8BA1\u7B97...":j.error?"ERROR:".concat(j.error):j.value),u.createElement("div",null,u.createElement(I,{onClick:function(){h.triggerError=!1,h.firstName=h.firstName+"\u{1F525}"}},"Change FirstName"),u.createElement(I,{onClick:function(){h.triggerError=!1,h.lastName=h.lastName+"\u2764\uFE0F"}},"Change LastName")),u.createElement("div",null,u.createElement(I,{onClick:function(){h.firstName=h.firstName+"\u{1F525}"}},"Change FirstName with Error"),u.createElement(I,{onClick:function(){h.triggerError=!0,h.lastName=h.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),u.createElement("div",null,"state.fullName=",u.createElement(p,null,JSON.stringify(j))))}});case 13:case"end":return g.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-2":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N,h,M,P,j;return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.delay,n=l.createStore,r=l.computed,c=l.ObserverScopeRef,L.next=9,Promise.resolve().then(e.bind(e,365));case 9:return t=L.sent,I=t.JsonView,p=t.Button,O=t.Input,g=t.Loading,x=n({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:r(function(){var Z=W()(d()().mark(function w(V,Y){var te,H,de,Ee,ve;return d()().wrap(function(ye){for(;;)switch(ye.prev=ye.next){case 0:return te=R()(V,2),H=te[0],de=te[1],Ee=Y.getProgressbar,ve=Ee(),ye.abrupt("return",new Promise(function(){var De=W()(d()().mark(function X(J){var q;return d()().wrap(function(Ie){for(;;)switch(Ie.prev=Ie.next){case 0:q=1;case 1:if(!(q<=100)){Ie.next=8;break}return Ie.next=4,a(20);case 4:ve.value(q);case 5:q++,Ie.next=1;break;case 8:ve.end(),J(H*de);case 10:case"end":return Ie.stop()}},X)}));return function(X){return De.apply(this,arguments)}}()));case 4:case"end":return ye.stop()}},w)}));return function(w,V){return Z.apply(this,arguments)}}(),["order.count","order.price"],{scope:c.Depends})}}),N=x.useState,h=x.state,M=x.$,P=x.bind,j=x.useAsyncState,L.abrupt("return",{default:function(){var w=N("order.count"),V=R()(w,1),Y=V[0],te=j("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,h.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,h.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(p,{onClick:function(){return h.order.count--}},"-"),u.createElement(O,o()({value:Y},P("order.count"))),u.createElement(p,{onClick:function(){return h.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",null,te.loading?u.createElement(g,null):null,te.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(te.progress,"%"):te.error?"ERROR:".concat(te.error):te.value)))),u.createElement("div",null,u.createElement(I,null,JSON.stringify(h.order.total))))}});case 16:case"end":return L.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-3":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N,h,M,P,j,K;return d()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=Z.sent,a=l.createStore,n=l.computed,r=l.ObserverScopeRef,c=l.delay,Z.next=9,Promise.resolve().then(e.bind(e,365));case 9:return t=Z.sent,I=t.Input,p=t.Button,O=t.Loading,g=t.JsonView,x=t.RichLabel,N=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var w=W()(d()().mark(function V(Y){var te,H,de;return d()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return te=R()(Y,2),H=te[0],de=te[1],ve.next=3,c(5e3);case 3:return ve.abrupt("return",H*de);case 4:case"end":return ve.stop()}},V)}));return function(V){return w.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:r.Depends})}}),h=N.useState,M=N.state,P=N.$,j=N.bind,K=N.useAsyncState,Z.abrupt("return",{default:function(){var V=h("order.count"),Y=R()(V,1),te=Y[0],H=K("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,M.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,M.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(p,{onClick:function(){return M.order.count--}},"-"),u.createElement(I,o()({value:te},j("order.count"))),u.createElement(p,{onClick:function(){return M.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",null,H.loading?u.createElement(O,null):null,H.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(H.timeout,"ms"):H.error?u.createElement(x,{text:"ERROR: {".concat(H.error,"}"),color:"red"}):null)))),u.createElement("div",null,u.createElement(g,null,JSON.stringify(M.order.total))))}});case 17:case"end":return Z.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-4":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N,h,M,P,j,K;return d()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=Z.sent,a=l.createStore,n=l.computed,r=l.ObserverScopeRef,c=l.delay,Z.next=9,Promise.resolve().then(e.bind(e,365));case 9:return t=Z.sent,I=t.Input,p=t.Button,O=t.Loading,g=t.JsonView,x=t.RichLabel,N=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var w=W()(d()().mark(function V(Y){var te,H,de;return d()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return te=R()(Y,2),H=te[0],de=te[1],ve.next=3,c(6e3);case 3:return ve.abrupt("return",H*de);case 4:case"end":return ve.stop()}},V)}));return function(V){return w.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:r.Depends})}}),h=N.useState,M=N.state,P=N.$,j=N.bind,K=N.useAsyncState,Z.abrupt("return",{default:function(){var V=h("order.count"),Y=R()(V,1),te=Y[0],H=K("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,M.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,M.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(p,{onClick:function(){return M.order.count--}},"-"),u.createElement(I,o()({value:te},j("order.count"))),u.createElement(p,{onClick:function(){return M.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},H.loading?u.createElement(O,null):null,H.loading?u.createElement(x,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(H.timeout,"}\u79D2"),color:"red"}):H.error?u.createElement(x,{text:"ERROR: {".concat(H.error,"}"),color:"red"}):null)))),u.createElement("div",null,u.createElement(g,null,JSON.stringify(M.order.total))))}});case 17:case"end":return Z.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-5":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N,h,M,P,j,K;return d()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=Z.sent,a=l.createStore,n=l.computed,r=l.ObserverScopeRef,c=l.delay,Z.next=9,Promise.resolve().then(e.bind(e,365));case 9:return t=Z.sent,I=t.Input,p=t.Button,O=t.Loading,g=t.JsonView,x=t.RichLabel,N=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var w=W()(d()().mark(function V(Y){var te,H,de;return d()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return te=R()(Y,2),H=te[0],de=te[1],ve.next=3,c();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return ve.stop()}},V)}));return function(V){return w.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:r.Depends})}}),h=N.useState,M=N.state,P=N.$,j=N.bind,K=N.useAsyncState,Z.abrupt("return",{default:function(){var V=h("order.count"),Y=R()(V,1),te=Y[0],H=K("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,M.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,M.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(p,{onClick:function(){return M.order.count--}},"-"),u.createElement(I,o()({value:te},j("order.count"))),u.createElement(p,{onClick:function(){return M.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},H.loading?u.createElement(O,null):null,H.loading?u.createElement(x,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):H.error&&u.createElement(x,{text:"\u51FA\u9519: {".concat(H.error,"}"),color:"red"}),H.retry>0&&u.createElement(x,{text:"\u91CD\u8BD5: {".concat(H.retry,"}"),color:"red"}))))),u.createElement("div",null,u.createElement(g,null,JSON.stringify(M.order.total))))}});case 17:case"end":return Z.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-6":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N,h,M,P,j;return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=L.sent,a=l.createStore,n=l.computed,r=l.ObserverScopeRef,L.next=8,Promise.resolve().then(e.bind(e,365));case 8:return c=L.sent,t=c.Input,I=c.Button,p=c.Loading,O=c.JsonView,g=c.RichLabel,x=a({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:n(function(){var Z=W()(d()().mark(function w(V,Y){var te,H,de,Ee;return d()().wrap(function(_e){for(;;)switch(_e.prev=_e.next){case 0:return te=R()(V,2),H=te[0],de=te[1],Ee=Y.abortSignal,_e.abrupt("return",new Promise(function(ye,De){var X=setTimeout(function(){ye(H*de)},1e6);Ee.addEventListener("abort",function(){clearTimeout(X),De("cancelled")})}));case 3:case"end":return _e.stop()}},w)}));return function(w,V){return Z.apply(this,arguments)}}(),["order.count","order.price"],{scope:r.Depends})}}),N=x.useState,h=x.state,M=x.$,P=x.bind,j=x.useAsyncState,L.abrupt("return",{default:function(){var w=N("order.count"),V=R()(w,1),Y=V[0],te=j("order.total");return u.createElement("div",null,u.createElement("table",{className:"table table-bordered table-striped"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4E66\u540D")),u.createElement("td",null,h.order.bookName)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u4EF7\u683C")),u.createElement("td",null,h.order.price)),u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u6570\u91CF")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},u.createElement(I,{onClick:function(){return h.order.count--}},"-"),u.createElement(t,o()({value:Y},P("order.count"))),u.createElement(I,{onClick:function(){return h.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),u.createElement("tfoot",null,u.createElement("tr",null,u.createElement("td",null,u.createElement("b",null,"\u603B\u4EF7")),u.createElement("td",{style:{display:"flex",alignItems:"center"}},te.loading?u.createElement(p,null):null,te.loading?u.createElement(g,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):te.error&&u.createElement(g,{text:"\u51FA\u9519: {".concat(te.error,"}"),color:"red"}),te.loading&&u.createElement(I,{onClick:function(){return te.cancel()}},"\u53D6\u6D88"))))),u.createElement("div",null,u.createElement(O,null,JSON.stringify(h.order.total))))}});case 16:case"end":return L.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-async-demo-7":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p;return d()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=g.sent,a=l.createStore,g.next=6,Promise.resolve().then(e.bind(e,365));case 6:return n=g.sent,r=n.ColorBlock,c=n.Button,t=a({bookName:"ZhangFisher",price:100,count:3,total:function(){var x=W()(d()().mark(function h(M){return d()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",M.price*M.count);case 1:case"end":return j.stop()}},h)}));function N(h){return x.apply(this,arguments)}return N}()}),I=t.state,p=t.$,g.abrupt("return",{default:function(){return u.createElement("div",null,u.createElement(r,{name:"\u4E66\u540D"},p("bookName")),u.createElement(r,{name:"\u4EF7\u683C"},p("price")),u.createElement(r,{name:"\u6570\u91CF"},u.createElement(c,{onClick:function(){return I.count--}},"-"),p("count"),u.createElement(c,{onClick:function(){return I.count++}},"+")),u.createElement(r,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},p("total.value",{errorBoundary:function(h){var M=h.error;return u.createElement(u.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",M.message)}})),u.createElement(r,{name:"state.total"},String(I.total)))}});case 11:case"end":return g.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}}}},60409:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return v}});var U=e(29008),o=e.n(U),k=e(28633),R=e.n(k),b=e(70958),d=e.n(b),D=e(92379),W=e(25231),u=e(44970),A=e(365),v={"docs-guide-computed-create-demo-0":{component:D.memo(D.lazy(d()(o()().mark(function y(){var i,s,l,a,n,r,c;return o()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=I.sent,s=i.createStore,l=i.computed,I.next=7,Promise.resolve().then(e.bind(e,365));case 7:return a=I.sent,n=a.ColorBlock,r=a.Button,c=s({order:{price:100,count:3,total1:function(O){return O.price*O.count},total2:l(function(p){return p.price*p.count})}}),I.abrupt("return",{default:function(){var O=c.useState(),g=R()(O,2),x=g[0],N=g[1];return D.createElement("div",null,D.createElement(n,{name:"Price"},x.order.price),D.createElement(n,{name:"Count"},x.order.count),D.createElement(n,{name:"Total 1"},x.order.total1),D.createElement(n,{name:"Total 2"},x.order.total2),D.createElement(r,{onClick:function(){return N(function(M){return M.order.count++})}},"Count++"))}});case 12:case"end":return I.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(o()().mark(function s(){var l,a=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}}}},71252:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(83717),k={}},87755:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(76938),D=e(44970),W=e(365),u={"docs-guide-computed-getter-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r,c,t,I;return o()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=O.sent,y=v.createStore,i=v.computed,s=v.delay,O.next=8,Promise.resolve().then(e.bind(e,365));case 8:return l=O.sent,a=l.ColorBlock,n=l.Button,r=y({order:{price:100,count:3,total:i(function(){var g=R()(o()().mark(function x(N){return o()().wrap(function(M){for(;;)switch(M.prev=M.next){case 0:return M.next=2,s(1e3);case 2:return M.abrupt("return",N.price*N.count);case 3:case"end":return M.stop()}},x)}));return function(x){return g.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),c=r.state,t=r.$,I=r.computedObjects,O.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",I.get("total")),b.createElement("div",null,b.createElement(a,{name:"price"},t("order.price")),b.createElement(a,{name:"count"},t("order.count")),b.createElement(a,{name:"Total"},t(function(x){var N=x.value,h=x.loading;return b.createElement("div",null,h?"\u8BA1\u7B97\u4E2D...":N+1e3)},"order.total")),b.createElement(n,{onClick:function(){return c.order.count++}},"Count++"),b.createElement(n,{onClick:function(){return I.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return O.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},18731:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return l}});var U=e(12027),o=e.n(U),k=e(34180),R=e.n(k),b=e(28633),d=e.n(b),D=e(29008),W=e.n(D),u=e(70958),A=e.n(u),v=e(92379),y=e(87480),i=e(44970),s=e(365),l={"docs-guide-computed-objects-demo-0":{component:v.memo(v.lazy(A()(W()().mark(function a(){var n,r,c,t,I,p,O,g,x;return W()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return n=h.sent,r=n.createStore,c=n.computed,h.next=7,Promise.resolve().then(e.bind(e,365));case 7:return t=h.sent,I=t.Divider,p=t.ColorBlock,O=t.Button,g=0,x=r({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(P){return P.firstName+P.lastName+"".concat(++g)},fullName2:c(function(){var M=A()(W()().mark(function P(j){return W()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.abrupt("return",j.firstName+j.lastName+"".concat(++g));case 1:case"end":return L.stop()}},P)}));return function(P){return M.apply(this,arguments)}}(),["./firstName","./lastName"])}}),h.abrupt("return",{default:function(){var P=x.useState(),j=d()(P,1),K=j[0];return v.createElement("div",null,v.createElement(p,{name:"FirstName"},K.user.firstName),v.createElement(p,{name:"lastName"},K.user.lastName),v.createElement(p,{name:"FullName",value:K.user.fullName}),v.createElement(p,{name:"FullName2",value:K.user.fullName2.value}),v.createElement(I,null),v.createElement("div",null,"typeof(store.computedObjects)==",R()(x.computedObjects)),v.createElement("div",null,"store.computedObjects instanceof Map=",String(x.computedObjects instanceof Map)),v.createElement("div",null,"store.computedObjects.size=",x.computedObjects.size),v.createElement("div",null,"store.computedObjects.size=",x.computedObjects.size),v.createElement("div",null,"store.computedObjects.keys()=",o()(x.computedObjects.keys()).join(" , ")),v.createElement(O,{onClick:function(){return x.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),v.createElement(O,{onClick:function(){return x.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),v.createElement(O,{onClick:function(){return x.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return h.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":s},renderOpts:{compile:function(){var a=A()(W()().mark(function r(){var c,t=arguments;return W()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(9039).then(e.bind(e,39039));case 2:return p.abrupt("return",(c=p.sent).default.apply(c,t));case 3:case"end":return p.stop()}},r)}));function n(){return a.apply(this,arguments)}return n}()}}}},87336:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(15968),k={}},58217:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return i}});var U=e(24325),o=e.n(U),k=e(28633),R=e.n(k),b=e(29008),d=e.n(b),D=e(70958),W=e.n(D),u=e(92379),A=e(49613),v=e(44970),y=e(365),i={"docs-guide-computed-run-demo-0":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x;return d()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=h.sent,a=l.createStore,n=l.computed,r=l.delay,h.next=8,Promise.resolve().then(e.bind(e,365));case 8:return c=h.sent,t=c.Divider,I=c.ColorBlock,p=c.Button,O=0,g={book:{name:"Zhang",count:4,price:100,total1:n(function(){var M=W()(d()().mark(function P(j){return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,r();case 2:return L.abrupt("return",j.count*j.price);case 3:case"end":return L.stop()}},P)}));return function(P){return M.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:n(function(){var M=W()(d()().mark(function P(j){return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,r();case 2:return L.abrupt("return",j.count*j.price);case 3:case"end":return L.stop()}},P)}));return function(P){return M.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:n(function(){var M=W()(d()().mark(function P(j){return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,r();case 2:return L.abrupt("return",j.count*j.price);case 3:case"end":return L.stop()}},P)}));return function(P){return M.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:n(function(){var M=W()(d()().mark(function P(j){return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,r();case 2:return L.abrupt("return",j.price/j.count);case 3:case"end":return L.stop()}},P)}));return function(P){return M.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:n(function(){var M=W()(d()().mark(function P(j){return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,r();case 2:return L.abrupt("return",j.price/j.count);case 3:case"end":return L.stop()}},P)}));return function(P){return M.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:n(function(){var M=W()(d()().mark(function P(j){return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,r();case 2:return L.abrupt("return",j.price/j.count);case 3:case"end":return L.stop()}},P)}));return function(P){return M.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},x=a(g),h.abrupt("return",{default:function(){var P=x.useState(),j=R()(P,1),K=j[0];return u.createElement("div",null,u.createElement(t,{title:"Total Group"}),u.createElement(I,{name:"Total1",loading:K.book.total1.loading},K.book.total1.loading?"\u8BA1\u7B97\u4E2D...":K.book.total1.value),u.createElement(I,{name:"Total2",loading:K.book.total2.loading},K.book.total2.loading?"\u8BA1\u7B97\u4E2D...":K.book.total2.value),u.createElement(I,{name:"Total3",loading:K.book.total3.loading},K.book.total3.loading?"\u8BA1\u7B97\u4E2D...":K.book.total3.value),u.createElement(p,{onClick:function(){return x.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),u.createElement(t,{title:"Average Group"}),u.createElement(I,{name:"Average1",loading:K.book.average1.loading}," ",K.book.average1.loading?"\u8BA1\u7B97\u4E2D...":K.book.average1.value),u.createElement(I,{name:"Average2",loading:K.book.average2.loading}," ",K.book.average2.loading?"\u8BA1\u7B97\u4E2D...":K.book.average2.value),u.createElement(I,{name:"Average3",loading:K.book.average3.loading}," ",K.book.average3.loading?"\u8BA1\u7B97\u4E2D...":K.book.average3.value),u.createElement(p,{onClick:function(){return x.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return h.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-computed-run-demo-1":{component:u.memo(u.lazy(W()(d()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N,h,M,P;return d()().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:return K.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=K.sent,a=l.createStore,n=l.computed,r=l.delay,K.next=8,Promise.resolve().then(e.bind(e,365));case 8:return c=K.sent,t=c.Divider,I=c.ColorBlock,p=c.Button,O=c.Input,g=0,x={book:{name:"Zhang",count:4,price:100,total1:n(function(){var L=W()(d()().mark(function Z(w){return d()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,r();case 2:return Y.abrupt("return",w.count*w.price);case 3:case"end":return Y.stop()}},Z)}));return function(Z){return L.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:n(function(){var L=W()(d()().mark(function Z(w){return d()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,r();case 2:return Y.abrupt("return",w.count*w.price);case 3:case"end":return Y.stop()}},Z)}));return function(Z){return L.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:n(function(){var L=W()(d()().mark(function Z(w){return d()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,r();case 2:return Y.abrupt("return",w.count*w.price);case 3:case"end":return Y.stop()}},Z)}));return function(Z){return L.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},N=a(x),h=N.useState,M=N.computedObjects,P=N.bind,K.abrupt("return",{default:function(){var Z=h(),w=R()(Z,1),V=w[0];return u.createElement("div",null,u.createElement(I,{name:"BookName"},V.book.name),u.createElement(I,{name:"count"},u.createElement("div",{style:{display:"flex",alignItems:"center"}},u.createElement(p,{onClick:function(){return V.book.count--}},"-"),u.createElement(O,o()({value:V.book.count},P("book.count"))),u.createElement(p,{onClick:function(){return V.book.count++}},"+"))),u.createElement(I,{name:"price"}," ",u.createElement(O,o()({value:V.book.price},P("book.price")))),u.createElement(t,{title:"Total Group"}),u.createElement("table",{className:"table table-bordered"},u.createElement("tbody",null,u.createElement("tr",null,u.createElement("td",null,"Total1 ="),u.createElement("td",null,V.book.total1.loading?"\u8BA1\u7B97\u4E2D...":V.book.total1.value),u.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),u.createElement("tr",null,u.createElement("td",null,"Total2 ="),u.createElement("td",null,V.book.total2.loading?"\u8BA1\u7B97\u4E2D...":V.book.total2.value),u.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",u.createElement("input",{type:"checkbox",checked:M.get("book/total2")}),")")),u.createElement("tr",null,u.createElement("td",null,"Total3 ="),u.createElement("td",null,V.book.total3.loading?"\u8BA1\u7B97\u4E2D...":V.book.total3.value),u.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),u.createElement(p,{onClick:function(){return M.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return K.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(d()().mark(function a(){var n,r=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}}}},87237:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(87975),D=e(44970),W=e(365),u={"docs-guide-computed-scope-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=n.sent,y=v.ObserverScopeRef,i=v.useStore,n.next=7,Promise.resolve().then(e.bind(e,365));case 7:return s=n.sent,l=s.ColorBlock,n.abrupt("return",{default:function(){var c=i({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(p){return p.firstName+p.lastName}}},{scope:function(){return y.Current}}),t=c.state;return b.createElement("div",null,b.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return n.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-computed-scope-demo-1":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=n.sent,y=v.useStore,i=v.ObserverScopeRef,n.next=7,Promise.resolve().then(e.bind(e,365));case 7:return s=n.sent,l=s.ColorBlock,n.abrupt("return",{default:function(){var c=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(p){return p.user.firstName+p.user.lastName}}},{scope:i.Root}),t=c.state;return b.createElement("div",null,b.createElement(l,{name:"FullName"},t.user.fullName))}});case 10:case"end":return n.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-computed-scope-demo-2":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n;return o()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=c.sent,y=v.createStore,i=v.ObserverScopeRef,c.next=7,Promise.resolve().then(e.bind(e,365));case 7:return s=c.sent,l=s.ColorBlock,a=y({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(I){return I.user.firstName+I.user.lastName}}}},{scope:i.Parent}),n=a.state,c.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(l,{name:"FullName"},n.parent.user.fullName))}});case 11:case"end":return c.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-computed-scope-demo-3":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=r.sent,y=v.createStore,r.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=r.sent,s=i.ColorBlock,l=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),a=l.state,r.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(s,{name:"FullName"},a.user.fullName))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-computed-scope-demo-4":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=r.sent,y=v.createStore,r.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=r.sent,s=i.ColorBlock,l=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(t){return t},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),a=l.state,r.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(s,{name:"FullName"},a.user.fullName))}});case 10:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-computed-scope-demo-5":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=t.sent,y=v.createStore,i=v.computed,s=v.ObserverScopeRef,t.next=8,Promise.resolve().then(e.bind(e,365));case 8:return l=t.sent,a=l.ColorBlock,n=y({user:{firstName:"Zhang",lastName:"Fisher",fullName:i(function(){var I=R()(o()().mark(function p(O){return o()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.abrupt("return",O[0]+O[1]);case 1:case"end":return x.stop()}},p)}));return function(p){return I.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:s.Depends})}}),r=n.state,t.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(a,{name:"FullName"},r.user.fullName.value))}});case 12:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},46369:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return v}});var U=e(29008),o=e.n(U),k=e(28633),R=e.n(k),b=e(70958),d=e.n(b),D=e(92379),W=e(48120),u=e(44970),A=e(365),v={"docs-guide-computed-sync-demo-0":{component:D.memo(D.lazy(d()(o()().mark(function y(){var i,s,l,a,n,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=t.sent,s=i.createStore,t.next=6,Promise.resolve().then(e.bind(e,365));case 6:return l=t.sent,a=l.ColorBlock,n=l.Button,r=s({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(p){return p.firstName+p.lastName}}}),t.abrupt("return",{default:function(){var p=r.useState(),O=R()(p,2),g=O[0],x=O[1];return D.createElement("div",null,D.createElement(a,{name:"First Name"},g.user.firstName),D.createElement(a,{name:"Last Name"},g.user.lastName),D.createElement(a,{name:"Full Name"},g.user.fullName),D.createElement(n,{onClick:function(){return x(function(h){return h.user.firstName="\u2764\uFE0F"+h.user.firstName})}},"Change First Name"),D.createElement(n,{onClick:function(){return x(function(h){return h.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return t.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(o()().mark(function s(){var l,a=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}},"docs-guide-computed-sync-demo-1":{component:D.memo(D.lazy(d()(o()().mark(function y(){var i,s,l,a,n;return o()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=c.sent,s=i.createStore,c.next=6,Promise.resolve().then(e.bind(e,365));case 6:return l=c.sent,a=l.Button,n=s({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(I){return I.price*I.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(I){return I.price*I.count}}],total:function(I){return I.books.reduce(function(p,O){return p+O.total},0)}}),c.abrupt("return",{default:function(){var I=n.useState(),p=R()(I,2),O=p[0],g=p[1];return D.createElement("table",{className:"table table-bordered table-hover"},D.createElement("thead",null,D.createElement("tr",null,D.createElement("th",null,"\u4E66\u540D"),D.createElement("th",null,"\u4F5C\u8005"),D.createElement("th",null,"\u5355\u4EF7"),D.createElement("th",null,"\u6570\u91CF"),D.createElement("th",null,"\u5C0F\u8BA1"))),D.createElement("tbody",null,O.books.map(function(x,N){return D.createElement("tr",{key:N},D.createElement("td",null,x.name),D.createElement("td",null,x.author),D.createElement("td",null,x.price),D.createElement("td",null,D.createElement(a,{onClick:function(){return n.state.books[N].count--}},"-"),x.count,D.createElement(a,{onClick:function(){return n.state.books[N].count++}},"+")),D.createElement("td",null,x.total))}),D.createElement("tr",null,D.createElement("td",{colSpan:4},"\u603B\u8BA1"),D.createElement("td",null,O.total))))}});case 10:case"end":return c.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(o()().mark(function s(){var l,a=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}}}},23522:function(ee,m,e){"use strict";var U;e.r(m),e.d(m,{demos:function(){return i}});var o=e(29008),k=e.n(o),R=e(28633),b=e.n(R),d=e(70958),D=e.n(d),W=e(92379),u=e(89004),A=e(44970),v=e(365),y=e(53225),i={"docs-guide-debug-circular-dependency-demo-0":{component:W.memo(W.lazy(D()(k()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x;return k()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=h.sent,a=l.useStore,n=l.computed,h.next=7,Promise.resolve().then(e.bind(e,365));case 7:return r=h.sent,c=r.ColorBlock,t=r.Button,I=r.JsonView,h.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return p=h.sent,O=p.useState,h.next=17,Promise.resolve().then(e.bind(e,53225));case 17:return g=h.sent,x=g.installCycleDetectExtend,x({onDetected:function(P){return console.error("\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56:",P),"disable"}}),h.abrupt("return",{default:function(){var P=O(null),j=b()(P,2),K=j[0],L=j[1],Z=a({x:1,a:n(function(){var te=D()(k()().mark(function H(de){return k()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return ve.abrupt("return",de.b.value+de.x);case 1:case"end":return ve.stop()}},H)}));return function(H){return te.apply(this,arguments)}}(),["b","x"]),b:n(function(){var te=D()(k()().mark(function H(de){return k()().wrap(function(ve){for(;;)switch(ve.prev=ve.next){case 0:return ve.abrupt("return",de.a.value+ +de.x);case 1:case"end":return ve.stop()}},H)}));return function(H){return te.apply(this,arguments)}}(),["a","x"])},{debug:!0}),w=Z.useState(),V=b()(w,1),Y=V[0];return W.createElement("div",null,W.createElement(c,{name:"x"},W.createElement(t,{onClick:function(){return Z.state.x--}},"-"),Z.$("x"),W.createElement(t,{onClick:function(){return Z.state.x++}},"+")),W.createElement("div",{style:{color:"red"}},K),W.createElement(I,{data:Y}))}});case 21:case"end":return h.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-debug-circular-dependency-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"@autostorejs/devtools":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u7531\u4E8Ea,b\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u5185\u90E8\u4F1A\u5FFD\u7565a,b\u7684\u8BA1\u7B97\uFF0C\u5BFC\u81F4a,b\u7684\u503C\u4E3A\u65E0\u6CD5\u8BA1\u7B97\u3002",title:"\u6253\u5F00\u63A7\u5236\u53F0\u89C2\u5BDF\u4FE1\u606F"},context:{"@autostorejs/react":A,"x-react-components":v,react:U||(U=e.t(W,2)),"@autostorejs/devtools":y},renderOpts:{compile:function(){var s=D()(k()().mark(function a(){var n,r=arguments;return k()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}}}},21037:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return v}});var U=e(28633),o=e.n(U),k=e(29008),R=e.n(k),b=e(70958),d=e.n(b),D=e(92379),W=e(93359),u=e(44970),A=e(365),v={"docs-guide-debug-dev-tools-demo-0":{component:D.memo(D.lazy(d()(R()().mark(function y(){var i,s,l,a,n,r,c,t,I,p;return R()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=g.sent,s=i.createStore,l=i.computed,g.next=7,Promise.resolve().then(e.bind(e,365));case 7:return a=g.sent,n=a.Button,r=a.ColorBlock,c=s({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(N){return N.firstName+N.lastName},salary:l(function(){var x=d()(R()().mark(function N(h){return R()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.abrupt("return",h.age*10);case 1:case"end":return P.stop()}},N)}));return function(N){return x.apply(this,arguments)}}(),["age"])},{debug:!0,id:"user"}),t=c.state,I=c.useState,p=c.$,g.abrupt("return",{default:function(){var N=I("age"),h=o()(N,2),M=h[0],P=h[1],j=I("salary"),K=o()(j,2),L=K[0],Z=K[1],w=I(function(H){return H.lastName},function(H,de){return de.lastName=H}),V=o()(w,2),Y=V[0],te=V[1];return D.createElement("div",null,D.createElement(r,null,"Fullname :",t.firstName," ",Y),D.createElement(r,null,"Age :",M),D.createElement(r,null,"Salary: ",p("salary")),D.createElement(n,{onClick:function(){return P(M+1)}},"Age++"),D.createElement(n,{onClick:function(){return te(Y+".")}},"Change lastName"))}});case 12:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-debug-dev-tools-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(R()().mark(function s(){var l,a=arguments;return R()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}}}},46365:function(ee,m,e){"use strict";var U;e.r(m),e.d(m,{demos:function(){return A}});var o=e(29008),k=e.n(o),R=e(70958),b=e.n(R),d=e(92379),D=e(6205),W=e(44970),u=e(365),A={"docs-guide-debug-log-demo-0":{component:d.memo(d.lazy(b()(k()().mark(function v(){var y,i,s,l,a,n,r,c,t,I;return k()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return y=O.sent,i=y.useStore,s=y.computed,O.next=7,Promise.resolve().then(e.bind(e,365));case 7:return l=O.sent,a=l.Box,n=l.Button,r=l.ColorBlock,O.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return c=O.sent,t=c.useRef,I=function(x){return x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},O.abrupt("return",{default:function(){var x=t(),N=i({price:100,count:2,total:s(function(P){return P.price*P.count})},{debug:!0,log:function(j){var K=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"info",L=typeof j=="function"?j():j instanceof Error?j.message:j;x.current&&x.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        <b>[`.concat(K,"]</b> - ").concat(I(L),"</p>"))}}),h=N.state,M=N.$;return d.createElement("div",null,d.createElement(r,{name:"Price"},M("price")),d.createElement(r,{name:"Count"},d.createElement(n,{onClick:function(){return h.count--}},"-"),M("count"),d.createElement(n,{onClick:function(){return h.count++}},"+")),d.createElement(r,{name:"Total"},M("total")),d.createElement(n,{onClick:function(){return x.current.innerHTML=""}},"Clear"),d.createElement(a,{ref:x}))}});case 17:case"end":return O.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-debug-log-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u8C03\u8282count\u503C\uFF0C\u67E5\u770B\u65E5\u5FD7\u8F93\u51FA",title:"\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA"},context:{"@autostorejs/react":W,"x-react-components":u,react:U||(U=e.t(d,2))},renderOpts:{compile:function(){var v=b()(k()().mark(function i(){var s,l=arguments;return k()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(s=n.sent).default.apply(s,l));case 3:case"end":return n.stop()}},i)}));function y(){return v.apply(this,arguments)}return y}()}}}},13933:function(ee,m,e){"use strict";var U;e.r(m),e.d(m,{demos:function(){return A}});var o=e(29008),k=e.n(o),R=e(70958),b=e.n(R),d=e(92379),D=e(42246),W=e(44970),u=e(365),A={"docs-guide-debug-trace-demo-0":{component:d.memo(d.lazy(b()(k()().mark(function v(){var y,i,s,l,a,n,r,c,t,I;return k()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return y=O.sent,i=y.createStore,O.next=6,Promise.resolve().then(e.bind(e,365));case 6:return s=O.sent,l=s.Box,O.next=10,Promise.resolve().then(e.t.bind(e,92379,19));case 10:return a=O.sent,n=a.useRef,r=a.useEffect,c=i({a:1,b:2,c:function(x){return x.a+x.b}}),t=c.state,I=c.trace,O.abrupt("return",{default:function(){var x=n();return r(function(){var N=I(function(){t.a=10,t.b=20});N.start().then(function(h){h.forEach(function(M){x.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(M.type," ").concat(M.path.join("."),"</p>"))})})},[]),d.createElement(l,{ref:x})}});case 15:case"end":return O.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":W,"x-react-components":u,react:U||(U=e.t(d,2))},renderOpts:{compile:function(){var v=b()(k()().mark(function i(){var s,l=arguments;return k()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(s=n.sent).default.apply(s,l));case 3:case"end":return n.stop()}},i)}));function y(){return v.apply(this,arguments)}return y}()}},"docs-guide-debug-trace-demo-1":{component:d.memo(d.lazy(b()(k()().mark(function v(){var y,i,s,l,a,n,r,c,t,I,p,O;return k()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return y=x.sent,i=y.createStore,s=y.computed,l=y.delay,x.next=8,Promise.resolve().then(e.bind(e,365));case 8:return a=x.sent,n=a.Box,x.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return r=x.sent,c=r.useRef,t=r.useEffect,I=i({a:1,b:2,c:s(function(){var N=b()(k()().mark(function h(M){return k()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",M.a+M.b);case 1:case"end":return j.stop()}},h)}));return function(h){return N.apply(this,arguments)}}(),["a","b"])}),p=I.state,O=I.trace,x.abrupt("return",{default:function(){var h=c();return t(function(){var M=O(b()(k()().mark(function P(){return k()().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:return p.a=10,K.next=3,l();case 3:p.b=20;case 4:case"end":return K.stop()}},P)})));M.start().then(function(P){P.forEach(function(j){h.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(j.type," ").concat(j.path.join("."),"</p>"))})})},[]),d.createElement(n,{ref:h})}});case 17:case"end":return x.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"c\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4F9D\u8D56\u4E8Ea\u548Cb\uFF0C\u5F53a\u6216b\u53D8\u5316\u65F6\uFF0Cc\u4F1A\u91CD\u65B0\u8BA1\u7B97",title:"\u5F02\u6B65\u8DDF\u8E2A"},context:{"@autostorejs/react":W,"x-react-components":u,react:U||(U=e.t(d,2))},renderOpts:{compile:function(){var v=b()(k()().mark(function i(){var s,l=arguments;return k()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(s=n.sent).default.apply(s,l));case 3:case"end":return n.stop()}},i)}));function y(){return v.apply(this,arguments)}return y}()}},"docs-guide-debug-trace-demo-2":{component:d.memo(d.lazy(b()(k()().mark(function v(){var y,i,s,l,a,n,r,c,t,I,p,O;return k()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return y=x.sent,i=y.createStore,s=y.computed,l=y.delay,x.next=8,Promise.resolve().then(e.bind(e,365));case 8:return a=x.sent,n=a.Box,x.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return r=x.sent,c=r.useRef,t=r.useEffect,I=i({a:1,b:2,c:s(function(){var N=b()(k()().mark(function h(M){return k()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",M.a+M.b);case 1:case"end":return j.stop()}},h)}));return function(h){return N.apply(this,arguments)}}(),["a","b"]),d:s(function(){var N=b()(k()().mark(function h(M){return k()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",M.c.value+1);case 1:case"end":return j.stop()}},h)}));return function(h){return N.apply(this,arguments)}}(),["c"])}),p=I.state,O=I.trace,x.abrupt("return",{default:function(){var h=c();return t(function(){var M=O(b()(k()().mark(function P(){return k()().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:return p.a=10,K.next=3,l();case 3:p.b=20;case 4:case"end":return K.stop()}},P)})));M.start().then(function(P){P.forEach(function(j){h.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(j.type," ").concat(j.path.join("."),"</p>"))})})},[]),d.createElement(n,{ref:h})}});case 17:case"end":return x.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":W,"x-react-components":u,react:U||(U=e.t(d,2))},renderOpts:{compile:function(){var v=b()(k()().mark(function i(){var s,l=arguments;return k()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(s=n.sent).default.apply(s,l));case 3:case"end":return n.stop()}},i)}));function y(){return v.apply(this,arguments)}return y}()}},"docs-guide-debug-trace-demo-3":{component:d.memo(d.lazy(b()(k()().mark(function v(){var y,i,s,l,a,n,r,c,t,I,p,O;return k()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return y=x.sent,i=y.createStore,s=y.computed,l=y.delay,x.next=8,Promise.resolve().then(e.bind(e,365));case 8:return a=x.sent,n=a.Box,x.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return r=x.sent,c=r.useRef,t=r.useEffect,I=i({a:1,b:2,c:s(function(){var N=b()(k()().mark(function h(M){return k()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",M.a+M.b);case 1:case"end":return j.stop()}},h)}));return function(h){return N.apply(this,arguments)}}(),["a","b"]),d:s(function(){var N=b()(k()().mark(function h(M){return k()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",M.c.value+1);case 1:case"end":return j.stop()}},h)}));return function(h){return N.apply(this,arguments)}}(),["c"])}),p=I.state,O=I.trace,x.abrupt("return",{default:function(){var h=c();return t(function(){var M=O(b()(k()().mark(function P(){return k()().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:return p.a=10,K.next=3,l();case 3:p.b=20;case 4:case"end":return K.stop()}},P)})));M.start(function(P){if(P.type=="set"&&P.path.length===2&&P.path[0]==="d"&&P.path[1]==="value")return!0}).then(function(P){P.forEach(function(j){h.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(j.type," ").concat(j.path.join("."),"</p>"))})})},[]),d.createElement(n,{ref:h})}});case 17:case"end":return x.stop()}},v)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":W,"x-react-components":u,react:U||(U=e.t(d,2))},renderOpts:{compile:function(){var v=b()(k()().mark(function i(){var s,l=arguments;return k()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(s=n.sent).default.apply(s,l));case 3:case"end":return n.stop()}},i)}));function y(){return v.apply(this,arguments)}return y}()}}}},31996:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(76233),k={}},15274:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return i}});var U=e(29008),o=e.n(U),k=e(24325),R=e.n(k),b=e(28633),d=e.n(b),D=e(70958),W=e.n(D),u=e(92379),A=e(97820),v=e(44970),y=e(365),i={"docs-guide-form-bind-demo-0":{component:u.memo(u.lazy(W()(o()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x;return o()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=h.sent,a=l.createStore,h.next=6,Promise.resolve().then(e.bind(e,365));case 6:return n=h.sent,r=n.ColorBlock,c=n.Button,t=n.Input,I=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(P){return P.firstName+P.lastName}}}),p=I.state,O=I.$,g=I.bind,x=I.useState,h.abrupt("return",{default:function(){var P=x("user.firstName"),j=d()(P,2),K=j[0],L=j[1],Z=x("user.lastName"),w=d()(Z,2),V=w[0],Y=w[1],te=x("user.vip"),H=d()(te,2),de=H[0],Ee=H[1];return u.createElement("div",null,u.createElement(t,R()(R()({label:"First Name"},g("user.firstName")),{},{value:K})),u.createElement(t,R()(R()({label:"last Name"},g("user.lastName")),{},{value:V})),u.createElement(t,R()(R()({type:"checkbox",label:"VIP"},g("user.vip")),{},{value:de})),u.createElement(r,{name:"First Name"},O("user.firstName")),u.createElement(r,{name:"Last Name"},O("user.lastName")),u.createElement(r,{name:"Full Name"},O("user.fullName")),u.createElement(r,{name:"VIP"},O("user.vip")),u.createElement(c,{onClick:function(){L("Zhang"),Y("Fisher")}},"Reset"))}});case 12:case"end":return h.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(o()().mark(function a(){var n,r=arguments;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}}}},55106:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return v}});var U=e(29008),o=e.n(U),k=e(24325),R=e.n(k),b=e(70958),d=e.n(b),D=e(92379),W=e(12357),u=e(44970),A=e(365),v={"docs-guide-form-use-bindings-demo-0":{component:D.memo(D.lazy(d()(o()().mark(function y(){var i,s,l,a,n,r,c;return o()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=I.sent,s=i.useStore,I.next=6,Promise.resolve().then(e.bind(e,365));case 6:return l=I.sent,a=l.Layout,n=l.ColorBlock,r=l.Button,c=l.Input,I.abrupt("return",{default:function(){var O=s({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),g=O.state,x=O.$,N=O.useBindings,h=N();return D.createElement(a,null,D.createElement("div",null,D.createElement(c,R()({label:"First Name"},h.user.firstName)),D.createElement(c,R()({label:"last Name"},h.user.lastName)),D.createElement(c,R()({label:"Age"},h.user.age)),D.createElement(c,R()({type:"checkbox",label:"VIP"},h.user.vip)),D.createElement(r,{onClick:function(){g.user.firstName="Zhang",g.user.lastName="Fisher",g.user.age=18,g.user.vip=!1}},"Reset")),D.createElement("div",null,D.createElement(n,{name:"First Name"},x("user.firstName")),D.createElement(n,{name:"Last Name"},x("user.lastName")),D.createElement(n,{name:"Age"},x("user.age")),D.createElement(n,{name:"VIP"},x("user.vip"))))}});case 12:case"end":return I.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(o()().mark(function s(){var l,a=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}}}},4493:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return v}});var U=e(29008),o=e.n(U),k=e(28633),R=e.n(k),b=e(70958),d=e.n(b),D=e(92379),W=e(79247),u=e(44970),A=e(365),v={"docs-guide-form-use-form-demo-0":{component:D.memo(D.lazy(d()(o()().mark(function y(){var i,s,l,a,n,r,c,t,I,p;return o()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=g.sent,s=i.useStore,g.next=6,Promise.resolve().then(e.bind(e,365));case 6:return l=g.sent,a=l.TextArea,n=l.Layout,r=l.Button,c=l.Input,t=l.CheckBox,I=l.JsonView,p=l.Select,g.abrupt("return",{default:function(){var N=s({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),h=N.state,M=N.$,P=N.useForm,j=N.useState,K=j(),L=R()(K,1),Z=L[0],w=P();return D.createElement(n,null,D.createElement("div",null,D.createElement("form",w,D.createElement(c,{name:"user.firstName",label:"First Name"}),D.createElement(c,{name:"user.lastName",label:"lastName"}),D.createElement(c,{name:"user.age",label:"Age"}),D.createElement(p,{name:"job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),D.createElement(a,{name:"user.resume",label:"Resume"}),D.createElement(t,{name:"user.vip",label:"VIP"})),D.createElement(r,{onClick:function(){h.user.firstName="Zhang",h.user.lastName="Fisher",h.user.age=18,h.user.vip=!1}},"Reset")),D.createElement("div",null,D.createElement(I,{data:Z})))}});case 15:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
          <TextArea name="user.resume" label="Resume"/>
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(o()().mark(function s(){var l,a=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}}}},72433:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return i}});var U=e(28633),o=e.n(U),k=e(29008),R=e.n(k),b=e(24325),d=e.n(b),D=e(70958),W=e.n(D),u=e(92379),A=e(45889),v=e(44970),y=e(365),i={"docs-guide-form-use-input-demo-0":{component:u.memo(u.lazy(W()(R()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N;return R()().wrap(function(M){for(;;)switch(M.prev=M.next){case 0:return M.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=M.sent,a=l.createStore,M.next=6,Promise.resolve().then(e.bind(e,365));case 6:return n=M.sent,r=n.ColorBlock,c=n.Button,t=n.Input,I=a({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),p=I.state,O=I.$,g=I.bind,x=I.useState,N=I.useInput,M.abrupt("return",{default:function(){var j=N("user.firstName"),K=N("user.lastName"),L=N("user.vip"),Z=N("user.job");return u.createElement("div",null,u.createElement(t,d()({label:"First Name"},j)),u.createElement(t,d()({label:"last Name"},K)),u.createElement(t,d()({type:"checkbox",label:"VIP"},L)),u.createElement(r,{name:"Job"},u.createElement("select",d()({id:"job"},Z),u.createElement("option",{value:"1"},"Engineer"),u.createElement("option",{value:"2"},"Doctor"),u.createElement("option",{value:"3"},"Teacher"))),u.createElement(r,{name:"First Name"},O("user.firstName")),u.createElement(r,{name:"Last Name"},O("user.lastName")),u.createElement(r,{name:"VIP"},O("user.vip")),u.createElement(r,{name:"Job"},O("user.job")),u.createElement(c,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return M.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useInput"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(R()().mark(function a(){var n,r=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-1":{component:u.memo(u.lazy(W()(R()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x,N;return R()().wrap(function(M){for(;;)switch(M.prev=M.next){case 0:return M.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=M.sent,a=l.createStore,M.next=6,Promise.resolve().then(e.bind(e,365));case 6:return n=M.sent,r=n.ColorBlock,c=n.Button,t=n.Input,I=a({user:{firstName:"Zhang",lastName:"Fisher"}}),p=I.state,O=I.$,g=I.bind,x=I.useState,N=I.useInput,M.abrupt("return",{default:function(){var j=N(function(K){return K.user.firstName+" "+K.user.lastName},function(K,L){var Z=K.split(/\s+/),w=o()(Z,2),V=w[0],Y=w[1];L.user.firstName=V,L.user.lastName=Y});return u.createElement("div",null,u.createElement(t,d()({label:"FullName"},j)),u.createElement(r,{name:"First Name"},O("user.firstName")),u.createElement(r,{name:"Last Name"},O("user.lastName")),u.createElement(c,{onClick:function(){p.user.firstName="Zhang",p.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return M.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(R()().mark(function a(){var n,r=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-2":{component:u.memo(u.lazy(W()(R()().mark(function s(){var l,a,n,r,c,t,I,p,O,g,x;return R()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=h.sent,a=l.createStore,h.next=6,Promise.resolve().then(e.bind(e,365));case 6:return n=h.sent,r=n.ColorBlock,c=n.Button,t=n.Input,I=a({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),p=I.state,O=I.$,g=I.bind,x=I.useInput,h.abrupt("return",{default:function(){var P=x("user");return u.createElement("div",null,u.createElement(t,d()({label:"First Name"},P.firstName)),u.createElement(t,d()({label:"last Name"},P.lastName)),u.createElement(t,d()({label:"Age"},P.age)),u.createElement(t,d()({type:"checkbox",label:"VIP"},P.vip)),u.createElement(r,{name:"First Name"},O("user.firstName")),u.createElement(r,{name:"Last Name"},O("user.lastName")),u.createElement(r,{name:"Age"},O("user.age")),u.createElement(r,{name:"VIP"},O("user.vip")),u.createElement(c,{onClick:function(){p.user.firstName="Zhang",p.user.lastName="Fisher",p.user.age=18,p.user.vip=!1}},"Reset"))}});case 12:case"end":return h.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(R()().mark(function a(){var n,r=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}},"docs-guide-form-use-input-demo-3":{component:u.memo(u.lazy(W()(R()().mark(function s(){var l,a,n,r,c,t;return R()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return l=p.sent,a=l.useStore,p.next=6,Promise.resolve().then(e.bind(e,365));case 6:return n=p.sent,r=n.ColorBlock,c=n.Button,t=n.Input,p.abrupt("return",{default:function(){var g=a({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),x=g.state,N=g.$,h=g.bind,M=g.useInput,P=M();return u.createElement("div",null,u.createElement(t,d()({label:"First Name"},P.firstName)),u.createElement(t,d()({label:"last Name"},P.lastName)),u.createElement(t,d()({label:"Age"},P.age)),u.createElement(t,d()({type:"checkbox",label:"VIP"},P.vip)),u.createElement(r,{name:"First Name"},N("firstName")),u.createElement(r,{name:"Last Name"},N("lastName")),u.createElement(r,{name:"Age"},N("age")),u.createElement(r,{name:"VIP"},N("vip")),u.createElement(c,{onClick:function(){x.firstName="Zhang",x.lastName="Fisher",x.age=18,x.vip=!1}},"Reset"))}});case 11:case"end":return p.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-input-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":v,"x-react-components":y},renderOpts:{compile:function(){var s=W()(R()().mark(function a(){var n,r=arguments;return R()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(9039).then(e.bind(e,39039));case 2:return t.abrupt("return",(n=t.sent).default.apply(n,r));case 3:case"end":return t.stop()}},a)}));function l(){return s.apply(this,arguments)}return l}()}}}},50090:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(9159),k={}},91775:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return l}});var U=e(24325),o=e.n(U),k=e(12027),R=e.n(k),b=e(29008),d=e.n(b),D=e(28633),W=e.n(D),u=e(70958),A=e.n(u),v=e(92379),y=e(61077),i=e(44970),s=e(365),l={"docs-guide-intro-get-started-demo-0":{component:v.memo(v.lazy(A()(d()().mark(function a(){var n,r,c,t,I,p,O,g,x,N,h,M;return d()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return n=j.sent,r=n.createStore,j.next=6,Promise.resolve().then(e.bind(e,365));case 6:return c=j.sent,t=c.ColorBlock,I=c.Button,p=c.Divider,O=c.Layout,g=c.JsonView,x=r({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:39.9,count:1,total:function(L){return L.price*L.count}}],total:function(L){return L.orders.reduce(function(Z,w){return Z+w.total},0)}}),N=x.state,h=x.$,M=x.useState,j.abrupt("return",{default:function(){var L=M(),Z=W()(L,1),w=Z[0];return v.createElement(O,null,v.createElement("div",null,v.createElement(t,{name:"\u4E66\u540D"},h("orders.0.book")),v.createElement(t,{name:"\u5355\u4EF7"},h("orders.0.price")),v.createElement(t,{name:"\u6570\u91CF"},v.createElement(I,{onClick:function(){return N.orders[0].count--}},"-"),h("orders.0.count"),v.createElement(I,{onClick:function(){return N.orders[0].count++}},"+")),v.createElement(t,{name:"\u5C0F\u8BA1"},h("orders.0.total")),v.createElement(p,null),v.createElement(t,{name:"\u603B\u8BA1"},h("total"))),v.createElement("div",null,v.createElement(g,{data:w})))}});case 14:case"end":return j.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":s},renderOpts:{compile:function(){var a=A()(d()().mark(function r(){var c,t=arguments;return d()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(9039).then(e.bind(e,39039));case 2:return p.abrupt("return",(c=p.sent).default.apply(c,t));case 3:case"end":return p.stop()}},r)}));function n(){return a.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-1":{component:v.memo(v.lazy(A()(d()().mark(function a(){var n,r,c,t,I,p,O,g,x,N,h;return d()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return n=P.sent,r=n.createStore,c=n.delay,t=n.computed,P.next=8,Promise.resolve().then(e.bind(e,365));case 8:return I=P.sent,p=I.Button,O=I.Table,g=r({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(K){return Math.floor(K.price*K.count)}}],discount:t(function(){var j=A()(d()().mark(function K(L){return d()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.next=2,c(2e3);case 2:return w.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return w.stop()}},K)}));return function(K){return j.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:t(function(){var j=A()(d()().mark(function K(L){return d()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.abrupt("return",(L.orders.reduce(function(V,Y){return V+Y.total},0)*L.discount.value).toFixed(2));case 1:case"end":return w.stop()}},K)}));return function(K){return j.apply(this,arguments)}}(),["discount"])}),x=g.state,N=g.$,h=g.useState,P.abrupt("return",{default:function(){var K=h(),L=W()(K,1),Z=L[0];return v.createElement("div",null,v.createElement(O,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(R()(Z.orders.map(function(w,V){return[w.book,"\uFFE5".concat(w.price),function(){return v.createElement("div",null,v.createElement(p,{onClick:function(){return w.count--}},"-"),w.count,v.createElement(p,{onClick:function(){return w.count++}},"+"))},"\uFFE5".concat(w.total)]})),[["\u6298\u6263",null,null,function(){return v.createElement(v.Fragment,null,N("discount"))}],["\u603B\u8BA1",null,null,function(){return v.createElement(v.Fragment,null,"\uFFE5",N("total"))}]])}))}});case 13:case"end":return P.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":s},renderOpts:{compile:function(){var a=A()(d()().mark(function r(){var c,t=arguments;return d()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(9039).then(e.bind(e,39039));case 2:return p.abrupt("return",(c=p.sent).default.apply(c,t));case 3:case"end":return p.stop()}},r)}));function n(){return a.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-2":{component:v.memo(v.lazy(A()(d()().mark(function a(){var n,r,c,t,I,p,O,g,x,N,h,M;return d()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return n=j.sent,r=n.createStore,c=n.delay,t=n.computed,j.next=8,Promise.resolve().then(e.bind(e,365));case 8:return I=j.sent,p=I.Button,O=I.Loading,g=I.Table,x=r({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(L){return Math.floor(L.price*L.count)}}],discount:t(function(){var K=A()(d()().mark(function L(Z){return d()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,c(2e3);case 2:return V.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return V.stop()}},L)}));return function(L){return K.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:t(function(){var K=A()(d()().mark(function L(Z){return d()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.next=2,c(2e3);case 2:return V.abrupt("return",(Z.orders.reduce(function(Y,te){return Y+te.total},0)*Z.discount.value).toFixed(2));case 3:case"end":return V.stop()}},L)}));return function(L){return K.apply(this,arguments)}}(),["discount"])}),N=x.state,h=x.$,M=x.useState,j.abrupt("return",{default:function(){var L=M(),Z=W()(L,1),w=Z[0];return v.createElement("div",null,v.createElement(g,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(R()(w.orders.map(function(V,Y){return[V.book,"\uFFE5".concat(V.price),function(){return v.createElement("div",null,v.createElement(p,{onClick:function(){return V.count--}},"-"),V.count,v.createElement(p,{onClick:function(){return V.count++}},"+"))},"\uFFE5".concat(V.total)]})),[["\u6298\u6263",null,null,function(){return v.createElement(v.Fragment,null,w.discount.loading?v.createElement(O,null):w.discount.value)}],["\u603B\u8BA1",null,null,function(){return v.createElement(v.Fragment,null,w.total.loading?v.createElement(O,null):w.total.value)}]])}))}});case 14:case"end":return j.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":s},renderOpts:{compile:function(){var a=A()(d()().mark(function r(){var c,t=arguments;return d()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(9039).then(e.bind(e,39039));case 2:return p.abrupt("return",(c=p.sent).default.apply(c,t));case 3:case"end":return p.stop()}},r)}));function n(){return a.apply(this,arguments)}return n}()}},"docs-guide-intro-get-started-demo-3":{component:v.memo(v.lazy(A()(d()().mark(function a(){var n,r,c,t,I,p,O,g,x,N,h,M,P,j,K;return d()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return n=Z.sent,r=n.createStore,c=n.delay,t=n.computed,I=n.useStore,Z.next=9,Promise.resolve().then(e.bind(e,365));case 9:return p=Z.sent,O=p.Input,g=p.Button,x=p.Loading,N=p.Table,h=function(V){return Math.floor(V.price*V.count)},M=r({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:h}],discount:t(function(){var w=A()(d()().mark(function V(Y){return d()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,c(2e3);case 2:return H.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return H.stop()}},V)}));return function(V){return w.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:t(function(){var w=A()(d()().mark(function V(Y){return d()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,c(2e3);case 2:return H.abrupt("return",(Y.orders.reduce(function(de,Ee){return de+Ee.total},0)*Y.discount.value).toFixed(2));case 3:case"end":return H.stop()}},V)}));return function(V){return w.apply(this,arguments)}}(),["discount"])}),P=M.state,j=M.$,K=M.useState,Z.abrupt("return",{default:function(){var V=K(),Y=W()(V,1),te=Y[0],H=I({book:"\u7CBE\u901AAutoStore",price:10,count:1}),de=H.state,Ee=H.useForm,ve=Ee();return v.createElement("div",null,v.createElement(N,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(R()(te.orders.map(function(_e,ye){return[_e.book,"\uFFE5".concat(_e.price),function(){return v.createElement("div",null,v.createElement(g,{onClick:function(){return _e.count--}},"-"),_e.count,v.createElement(g,{onClick:function(){return _e.count++}},"+"))},"\uFFE5".concat(_e.total)]})),[["\u6298\u6263",null,null,function(){return v.createElement(v.Fragment,null,te.discount.loading?v.createElement(x,null):te.discount.value)}],["\u603B\u8BA1",null,null,function(){return v.createElement(v.Fragment,null,te.total.loading?v.createElement(x,null):te.total.value)}]])},v.createElement("form",ve,v.createElement("h5",null,"\u65B0\u589E\u8BA2\u5355"),v.createElement(O,{name:"book"}),v.createElement(O,{name:"price"}),v.createElement(O,{name:"count"}),v.createElement(g,{onClick:function(){P.orders.push(o()(o()({},de),{},{total:h}))}},"Add"))))}});case 17:case"end":return Z.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed,useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":s},renderOpts:{compile:function(){var a=A()(d()().mark(function r(){var c,t=arguments;return d()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(9039).then(e.bind(e,39039));case 2:return p.abrupt("return",(c=p.sent).default.apply(c,t));case 3:case"end":return p.stop()}},r)}));function n(){return a.apply(this,arguments)}return n}()}}}},74905:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(47315),k={}},41344:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(26916),k={}},10117:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(3694),k={}},31837:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(4180),D=e(44970),W=e(365),u={"docs-guide-signal-about-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=t.sent,y=v.createStore,t.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=t.sent,s=i.Button,l=i.ColorBlock,a=y({age:18}),n=a.state,r=a.$,t.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(l,null,"Age+Signal :",r("age")),b.createElement(l,null,"Age :",n.age),b.createElement(s,{onClick:function(){return n.age=n.age+1}},"+Age"))}});case 11:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},11296:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(75690),k={}},14787:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(8767),D=e(44970),W=e(365),u={"docs-guide-signal-computed-render-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=n.sent,y=v.useStore,n.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=n.sent,s=i.Button,l=i.ColorBlock,n.abrupt("return",{default:function(){var c=y({user:{age:18}}),t=c.state,I=c.$;return b.createElement("div",null,b.createElement(l,{name:"Age"},I(function(p){var O=p.value;return b.createElement("div",null,O)},function(p){return p.user.age})),b.createElement(s,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-computed-render-demo-1":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=r.sent,y=v.useStore,i=v.computed,r.next=7,Promise.resolve().then(e.bind(e,365));case 7:return s=r.sent,l=s.Button,a=s.ColorBlock,r.abrupt("return",{default:function(){var t=y({user:{age:18}}),I=t.state,p=t.$;return b.createElement("div",null,b.createElement(a,{name:"Age"},p(function(O){var g=O.value;return b.createElement("div",null,g)},i(function(O){return O.user.age}))),b.createElement(l,{onClick:function(){return I.user.age++}},"+Age"))}});case 11:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-computed-render-demo-2":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=t.sent,y=v.useStore,i=v.delay,s=v.computed,t.next=8,Promise.resolve().then(e.bind(e,365));case 8:return l=t.sent,a=l.Button,n=l.ColorBlock,r=l.Loading,t.abrupt("return",{default:function(){var p=y({order:{price:10,count:1}}),O=p.state,g=p.$;return b.createElement("div",null,b.createElement(n,{name:"Price"},g("order.price")),b.createElement(n,{name:"Count"},g("order.count")),b.createElement(n,{name:"Total"},g(function(x){var N=x.value,h=x.loading;return b.createElement("div",null,h?b.createElement(r,{title:"\u8BA1\u7B97\u4E2D..."}):N,"\u{1F4B8}\u{1F4B8}")},s(function(){var x=R()(o()().mark(function N(h){return o()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,i(1e3);case 2:return P.abrupt("return",h.order.price*h.order.count);case 3:case"end":return P.stop()}},N)}));return function(N){return x.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),b.createElement(a,{onClick:function(){return O.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},14727:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(63518),D=e(44970),W=e(365),u={"docs-guide-signal-custom-render-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=n.sent,y=v.useStore,n.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=n.sent,s=i.Button,l=i.ColorBlock,n.abrupt("return",{default:function(){var c=y({user:{age:18}}),t=c.state,I=c.$;return b.createElement("div",null,b.createElement(l,{name:"Age"},I(function(p){var O=p.value;return b.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},b.createElement("span",{style:{flexGrow:1}},O),b.createElement(s,{onClick:function(){return t.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return n.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-custom-render-demo-1":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n;return o()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=c.sent,y=v.useStore,i=v.delay,s=v.computed,c.next=8,Promise.resolve().then(e.bind(e,365));case 8:return l=c.sent,a=l.Button,n=l.ColorBlock,c.abrupt("return",{default:function(){var I=y({order:{price:100,count:1,total:s(function(){var N=R()(o()().mark(function h(M){return o()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,i();case 2:return j.abrupt("return",M.price*M.count);case 3:case"end":return j.stop()}},h)}));return function(h){return N.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),p=I.state,O=I.$,g=I.useAsyncState,x=g("order.total");return b.createElement("div",null,b.createElement(n,{name:"Price"},O("order.price")),b.createElement(n,{name:"Count"},O("order.count")),b.createElement(n,{name:"Total",loading:x.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},O("order.total.value")),b.createElement(n,{name:"Total",loading:x.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},O("order.total")),b.createElement(a,{onClick:function(){return p.order.count++}},"+Count"))}});case 12:case"end":return c.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-custom-render-demo-2":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r,c,t;return o()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=p.sent,y=v.createStore,i=v.computed,s=v.delay,p.next=8,Promise.resolve().then(e.bind(e,365));case 8:return l=p.sent,a=l.Button,n=l.ColorBlock,r=y({order:{price:100,count:1,total:i(function(){var O=R()(o()().mark(function g(x){return o()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,s(2e3);case 2:return h.abrupt("return",x.price*x.count);case 3:case"end":return h.stop()}},g)}));return function(g){return O.apply(this,arguments)}}(),["./price","./count"])}}),c=r.state,t=r.$,p.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(n,{name:"Price"},t("order.price")),b.createElement(n,{name:"Count"},t("order.count")),b.createElement(n,{name:"Total"},t(function(g){var x=g.value,N=g.loading;return b.createElement(b.Fragment,null,N&&b.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!N&&b.createElement("span",null,x,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),b.createElement(a,{onClick:function(){return c.order.count++}},"Count++"))}});case 13:case"end":return p.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},67317:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(35371),k={}},5619:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(33358),D=e(44970),W=e(365),u={"docs-guide-signal-state-render-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=n.sent,y=v.useStore,n.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=n.sent,s=i.Button,l=i.ColorBlock,n.abrupt("return",{default:function(){var c=y({user:{age:18}}),t=c.state,I=c.$;return b.createElement("div",null,b.createElement(l,{name:"Age"},I("user.age")),b.createElement(s,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-state-render-demo-1":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r,c;return o()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=I.sent,y=v.createStore,I.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=I.sent,s=i.Button,l=i.ColorBlock,a=y({user:{firstName:"\u5F20",lastName:"\u4E09"}}),n=a.state,r=a.signal,c=a.$,I.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(l,{name:"FirstName"},c("user.firstName")),b.createElement(l,{name:"LastName"},c("user.lastName")),b.createElement(l,null,"FullName :",c(function(O){return O.user.firstName+" "+O.user.lastName})),b.createElement(s,{onClick:function(){return n.user.firstName=n.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),b.createElement(s,{onClick:function(){return n.user.lastName=n.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return I.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-state-render-demo-2":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r,c,t;return o()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=p.sent,y=v.createStore,i=v.delay,s=v.computed,p.next=8,Promise.resolve().then(e.bind(e,365));case 8:return l=p.sent,a=l.Button,n=l.ColorBlock,r=y({order:{price:100,count:1,total:s(function(){var O=R()(o()().mark(function g(x){return o()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,i(1e3);case 2:return h.abrupt("return",x.price*x.count);case 3:case"end":return h.stop()}},g)}));return function(g){return O.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),c=r.state,t=r.$,p.abrupt("return",{default:function(){return b.createElement("div",null,b.createElement(n,{name:"Price"},t("order.price")),b.createElement(n,{name:"Count"},t("order.count")),b.createElement(n,{name:"Total"},t("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),b.createElement(n,{name:"Total"},t("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),b.createElement(a,{onClick:function(){return c.order.count++}},"+Count"))}});case 13:case"end":return p.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},22234:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(23841),D=e(44970),W=e(365),u={"docs-guide-signal-watch-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=n.sent,y=v.useStore,n.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=n.sent,s=i.Button,l=i.ColorBlock,n.abrupt("return",{default:function(){var c=y({user:{age:18}}),t=c.state,I=c.$;return b.createElement("div",null,b.createElement(l,{name:"Age"},I(function(p){var O=p.value;return b.createElement("div",null,O)},function(p){return p.user.age})),b.createElement(s,{onClick:function(){return t.user.age++}},"+Age"))}});case 10:case"end":return n.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-watch-demo-1":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=r.sent,y=v.useStore,i=v.computed,r.next=7,Promise.resolve().then(e.bind(e,365));case 7:return s=r.sent,l=s.Button,a=s.ColorBlock,r.abrupt("return",{default:function(){var t=y({user:{age:18}}),I=t.state,p=t.$;return b.createElement("div",null,b.createElement(a,{name:"Age"},p(function(O){var g=O.value;return b.createElement("div",null,g)},i(function(O){return O.user.age}))),b.createElement(l,{onClick:function(){return I.user.age++}},"+Age"))}});case 11:case"end":return r.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}},"docs-guide-signal-watch-demo-2":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=t.sent,y=v.useStore,i=v.delay,s=v.computed,t.next=8,Promise.resolve().then(e.bind(e,365));case 8:return l=t.sent,a=l.Button,n=l.ColorBlock,r=l.Loading,t.abrupt("return",{default:function(){var p=y({order:{price:10,count:1}}),O=p.state,g=p.$;return b.createElement("div",null,b.createElement(n,{name:"Price"},g("order.price")),b.createElement(n,{name:"Count"},g("order.count")),b.createElement(n,{name:"Total"},g(function(x){var N=x.value,h=x.loading;return b.createElement("div",null,h?b.createElement(r,{title:"\u8BA1\u7B97\u4E2D..."}):N,"\u{1F4B8}\u{1F4B8}")},s(function(){var x=R()(o()().mark(function N(h){return o()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,i(1e3);case 2:return P.abrupt("return",h.order.price*h.order.count);case 3:case"end":return P.stop()}},N)}));return function(N){return x.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),b.createElement(a,{onClick:function(){return O.order.count++}},"Count++"))}});case 13:case"end":return t.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},83786:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(31363),k={}},16645:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(81897),k={}},77680:function(ee,m,e){"use strict";var U;e.r(m),e.d(m,{demos:function(){return y}});var o=e(29008),k=e.n(o),R=e(28633),b=e.n(R),d=e(70958),D=e.n(d),W=e(92379),u=e(94451),A=e(365),v=e(44970),y={"docs-guide-store-render-demo-0":{component:W.memo(W.lazy(D()(k()().mark(function i(){var s,l,a,n,r,c,t,I,p,O,g,x;return k()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return s=h.sent,l=s.default,a=s.createContext,n=s.useContext,r=s.useState,h.next=9,Promise.resolve().then(e.bind(e,365));case 9:return c=h.sent,t=c.ColorBlock,I=c.Button,p=c.Divider,O=a({firstName:"Zhang",lastName:"Fisher",age:18}),g=l.memo(function(M){var P=n(O);return l.createElement(t,{name:"\u5B50\u7EC4\u4EF6:".concat(M.name)},l.createElement("span",null,"Hello :",P.firstName," ",P.lastName))}),x=0,h.abrupt("return",{default:function(){var P=r({firstName:"Zhang",lastName:"Fisher",age:18}),j=b()(P,2),K=j[0],L=j[1];return l.createElement(O.Provider,{value:K},l.createElement(p,{title:"\u6839\u7EC4\u4EF6"}),l.createElement(t,{name:"FullName"},K.firstName," ",K.lastName),l.createElement(t,{name:"Age"},"Age :",K.age),l.createElement(p,{title:"\u5B50\u7EC4\u4EF6"}),l.createElement(g,{name:"A"}),l.createElement(g,{name:"B"}),l.createElement(I,{onClick:function(){L({firstName:"Zhang",lastName:"Fisher",age:++x})}},"+Age"))}});case 17:case"end":return h.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{react:U||(U=e.t(W,2)),"x-react-components":A},renderOpts:{compile:function(){var i=D()(k()().mark(function l(){var a,n=arguments;return k()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,e.e(9039).then(e.bind(e,39039));case 2:return c.abrupt("return",(a=c.sent).default.apply(a,n));case 3:case"end":return c.stop()}},l)}));function s(){return i.apply(this,arguments)}return s}()}},"docs-guide-store-render-demo-1":{component:W.memo(W.lazy(D()(k()().mark(function i(){var s,l,a,n,r,c,t,I,p,O,g,x;return k()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=h.sent,l=s.createStore,h.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=h.sent,n=a.default,h.next=10,Promise.resolve().then(e.bind(e,365));case 10:return r=h.sent,c=r.ColorBlock,t=r.Button,I=r.Divider,p=l({firstName:"Zhang",lastName:"Fisher",age:18}),O=n.memo(function(M){var P=p.useState("firstName"),j=b()(P,1),K=j[0];return n.createElement(c,{name:"\u5B50\u7EC4\u4EF6:FirstName"},K)}),g=n.memo(function(M){var P=p.useState("lastName"),j=b()(P,1),K=j[0];return n.createElement(c,{name:"\u5B50\u7EC4\u4EF6:lastName"},K)}),x=0,h.abrupt("return",{default:function(){var P=p.useState("age"),j=b()(P,1),K=j[0];return n.createElement(n.Fragment,null,n.createElement(I,{title:"\u6839\u7EC4\u4EF6"}),n.createElement(c,{name:"FullName"},"Hello :",p.state.firstName," ",p.state.lastName),n.createElement(c,{name:"Age"},K),n.createElement(I,{title:"\u5B50\u7EC4\u4EF6"}),n.createElement(O,null),n.createElement(g,null),n.createElement(t,{onClick:function(){return p.state.age=p.state.age+1}},"+Age"),n.createElement(t,{onClick:function(){return p.state.firstName=p.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return h.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,react:U||(U=e.t(W,2)),"x-react-components":A},renderOpts:{compile:function(){var i=D()(k()().mark(function l(){var a,n=arguments;return k()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,e.e(9039).then(e.bind(e,39039));case 2:return c.abrupt("return",(a=c.sent).default.apply(a,n));case 3:case"end":return c.stop()}},l)}));function s(){return i.apply(this,arguments)}return s}()}},"docs-guide-store-render-demo-2":{component:W.memo(W.lazy(D()(k()().mark(function i(){var s,l,a,n,r,c,t,I,p,O,g,x,N,h;return k()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return s=P.sent,l=s.createStore,P.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return a=P.sent,n=a.default,P.next=10,Promise.resolve().then(e.bind(e,365));case 10:return r=P.sent,c=r.ColorBlock,t=r.Button,I=r.Divider,p=l({firstName:"Zhang",lastName:"Fisher",age:18}),O=p.state,g=p.$,x=function(){return n.createElement(c,{name:"\u5B50\u7EC4\u4EF6:FirstName"},g("firstName"))},N=function(){return n.createElement(c,{name:"\u5B50\u7EC4\u4EF6:LastName"},g("lastName"))},h=0,P.abrupt("return",{default:function(){return n.createElement(n.Fragment,null,n.createElement(I,{title:"\u6839\u7EC4\u4EF6"}),n.createElement(c,{name:"FullName"},g("firstName")," ",g("lastName")),n.createElement(c,{name:"Age"},g("age")," - ",++h),n.createElement(I,{title:"\u5B50\u7EC4\u4EF6"}),n.createElement(x,null),n.createElement(N,null),n.createElement(t,{onClick:function(){return O.age=O.age+1}},"+Age"),n.createElement(t,{onClick:function(){return O.firstName=O.firstName+"."}},"Change FirstName"),n.createElement(t,{onClick:function(){return O.lastName=O.lastName+"*"}},"Change LastName"))}});case 19:case"end":return P.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":v,react:U||(U=e.t(W,2)),"x-react-components":A},renderOpts:{compile:function(){var i=D()(k()().mark(function l(){var a,n=arguments;return k()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,e.e(9039).then(e.bind(e,39039));case 2:return c.abrupt("return",(a=c.sent).default.apply(a,n));case 3:case"end":return c.stop()}},l)}));function s(){return i.apply(this,arguments)}return s}()}}}},33788:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return v}});var U=e(28633),o=e.n(U),k=e(29008),R=e.n(k),b=e(70958),d=e.n(b),D=e(92379),W=e(61786),u=e(44970),A=e(365),v={"docs-guide-store-state-demo-0":{component:D.memo(D.lazy(d()(R()().mark(function y(){var i,s,l,a,n,r,c,t,I,p;return R()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=g.sent,s=i.createStore,l=i.computed,g.next=7,Promise.resolve().then(e.bind(e,365));case 7:return a=g.sent,n=a.Button,r=a.ColorBlock,c=s({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(N){return N.firstName+N.lastName},salary:l(function(){var x=d()(R()().mark(function N(h){return R()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.abrupt("return",h.age*10);case 1:case"end":return P.stop()}},N)}));return function(N){return x.apply(this,arguments)}}(),["age"])}),t=c.state,I=c.useState,p=c.$,globalThis.state=t,g.abrupt("return",{default:function(){var N=I("age"),h=o()(N,2),M=h[0],P=h[1],j=I("salary"),K=o()(j,2),L=K[0],Z=K[1],w=I(function(H){return H.lastName},function(H,de){return de.lastName=H}),V=o()(w,2),Y=V[0],te=V[1];return D.createElement("div",null,D.createElement(r,null,"Fullname :",t.firstName," ",Y),D.createElement(r,null,"Age :",M),D.createElement(r,null,"Salary: ",p("salary")),D.createElement(n,{onClick:function(){return P(M+1)}},"+Age"),D.createElement(n,{onClick:function(){return te(Y+".")}},"Change lastName"))}});case 13:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(R()().mark(function s(){var l,a=arguments;return R()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}},"docs-guide-store-state-demo-1":{component:D.memo(D.lazy(d()(R()().mark(function y(){var i,s,l,a,n,r,c,t,I,p;return R()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=g.sent,s=i.createStore,g.next=6,Promise.resolve().then(e.bind(e,365));case 6:return l=g.sent,a=l.ColorBlock,g.next=10,Promise.resolve().then(e.bind(e,365));case 10:return n=g.sent,r=n.Button,c=s({firstName:"Zhang",lastName:"Fisher",fullName:function(N){return N.firstName+N.lastName}}),t=c.useState,I=c.state,p=c.$,g.abrupt("return",{default:function(){var N=t(function(w){return w.firstName},function(w,V){return V.firstName=w}),h=o()(N,2),M=h[0],P=h[1],j=t(function(w){return w.fullName},function(w,V){var Y=o()(w,2),te=Y[0],H=Y[1];V.firstName=te,V.lastName=H}),K=o()(j,2),L=K[0],Z=K[1];return D.createElement("div",null,D.createElement(a,{name:"FullName",value:L}),D.createElement(r,{onClick:function(){return P("<".concat(M,">"))}},"Change FirstName"),D.createElement(r,{onClick:function(){return Z(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return g.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(R()().mark(function s(){var l,a=arguments;return R()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}},"docs-guide-store-state-demo-2":{component:D.memo(D.lazy(d()(R()().mark(function y(){var i,s,l,a,n,r,c,t;return R()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=p.sent,s=i.createStore,p.next=6,Promise.resolve().then(e.bind(e,365));case 6:return l=p.sent,a=l.Button,n=l.ColorBlock,r=s({age:18}),c=r.state,t=r.$,p.abrupt("return",{default:function(){return D.createElement("div",null,D.createElement(n,null,"Age+Signal :",t("age")),D.createElement(n,null,"Age :",c.age),D.createElement(a,{onClick:function(){return c.age=c.age+1}},"+Age"))}});case 11:case"end":return p.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(R()().mark(function s(){var l,a=arguments;return R()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}}}},85244:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return u}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(92379),d=e(34450),D=e(44970),W=e(365),u={"docs-guide-store-demo-0":{component:b.memo(b.lazy(R()(o()().mark(function A(){var v,y,i,s,l,a,n,r,c;return o()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return v=I.sent,y=v.useStore,I.next=6,Promise.resolve().then(e.bind(e,365));case 6:return i=I.sent,s=i.Button,l=i.ColorBlock,I.abrupt("return",{default:function(){var O=y({count:18}),g=O.state,x=O.$;return b.createElement("div",null,b.createElement(l,{name:"Count"},x("count")),b.createElement(s,{onClick:function(){return g.count++}},"Count++"))}});case 11:case"end":return I.stop()}},A)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":D,"x-react-components":W},renderOpts:{compile:function(){var A=R()(o()().mark(function y(){var i,s=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(9039).then(e.bind(e,39039));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,s));case 3:case"end":return a.stop()}},y)}));function v(){return A.apply(this,arguments)}return v}()}}}},26992:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(22273),k={}},33463:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(66663),k={}},45988:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return l}});var U=e(29008),o=e.n(U),k=e(12027),R=e.n(k),b=e(34180),d=e.n(b),D=e(24325),W=e.n(D),u=e(70958),A=e.n(u),v=e(92379),y=e(26826),i=e(44970),s=e(365),l={"docs-guide-watch-objects-demo-0":{component:v.memo(v.lazy(A()(o()().mark(function a(){var n,r,c,t,I,p,O,g,x,N,h,M,P,j;return o()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return n=L.sent,r=n.createStore,c=n.watch,L.next=7,Promise.resolve().then(e.bind(e,365));case 7:return t=L.sent,I=t.Divider,p=t.ColorBlock,O=t.Button,g=t.Box,x=t.Input,N=r({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(w){return w.firstName+" "+w.lastName},dirty:c(function(Z,w){var V=Z.path,Y=Z.value;return w.cache[V.join(".")]=!0,!0},function(Z){return["firstName","lastName"].includes(Z[Z.length-1])},{initial:!1})}}),h=N.state,M=N.useBindings,P=N.watchObjects,j=N.$,L.abrupt("return",{default:function(){var w=M("user");return v.createElement("div",null,v.createElement(x,W()({label:"FirstName"},w.firstName)),v.createElement(x,W()({label:"lastName"},w.lastName)),v.createElement(I,null),v.createElement(g,null,v.createElement(p,{name:"FullName"},j("user.fullName")),v.createElement(p,{name:"Dirty"},j("user.dirty")),v.createElement(O,{onClick:function(){h.user.firstName="Zhang",h.user.lastName="Fisher",P.get("user.dirty").reset()}},"Reset")),v.createElement(g,null,v.createElement("div",null,"typeof(store.watchObjects)==",d()(P)),v.createElement("div",null,"store.watchObjects.size=",P.size),v.createElement("div",null,"store.watchObjects.size=",P.size),v.createElement("div",null,"store.watchObjects.keys()=",R()(P.keys()).join(" , "))))}});case 15:case"end":return L.stop()}},a)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx",description:"\u7F16\u8F91firstName\u6216lastName,\u4F1A\u89E6\u53D1dirty\u7684\u53D8\u5316",title:"\u4F7F\u7528watch\u529F\u80FD\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF"},context:{"@autostorejs/react":i,"x-react-components":s},renderOpts:{compile:function(){var a=A()(o()().mark(function r(){var c,t=arguments;return o()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=2,e.e(9039).then(e.bind(e,39039));case 2:return p.abrupt("return",(c=p.sent).default.apply(c,t));case 3:case"end":return p.stop()}},r)}));function n(){return a.apply(this,arguments)}return n}()}}}},54915:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return v}});var U=e(29008),o=e.n(U),k=e(28633),R=e.n(k),b=e(70958),d=e.n(b),D=e(92379),W=e(37686),u=e(44970),A=e(365),v={"docs-guide-watch-state-demo-0":{component:D.memo(D.lazy(d()(o()().mark(function y(){var i,s,l,a,n,r,c,t,I;return o()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return i=O.sent,s=i.createStore,l=i.watch,O.next=7,Promise.resolve().then(e.bind(e,365));case 7:return a=O.sent,n=a.Input,r=a.Button,c=s({orders:[{name:"AutoStore\u5B9E\u6218\u6307\u5357",price:100,count:1,total:function(x){return x.price*x.count}},{name:"\u6DF1\u5165\u6D45\u51FAAutoStore",price:98,count:1,total:function(x){return x.price*x.count}}],total:l(function(g){return t.orders.reduce(function(x,N){return x+N.count*N.price},0)},function(g){return g[g.length-1]==="count"},{initial:198})}),t=c.state,I=c.useState,O.abrupt("return",{default:function(){var x=I(),N=R()(x,1),h=N[0];return D.createElement("table",{className:"table"},D.createElement("thead",null,D.createElement("tr",null,D.createElement("th",null,"Name"),D.createElement("th",null,"Price"),D.createElement("th",null,"Count"),D.createElement("th",null,"Total"))),D.createElement("tbody",null,h.orders.map(function(M,P){return D.createElement("tr",{key:P},D.createElement("td",null,M.name),D.createElement("td",null,M.price),D.createElement("td",null,D.createElement(r,{onClick:function(){return M.count--}},"-"),D.createElement(n,{value:M.count,style:{display:"inline-flex"}}),D.createElement(r,{onClick:function(){return M.count++}},"+")),D.createElement("td",null,M.total))}),D.createElement("tr",null,D.createElement("td",{colSpan:3},"Total"),D.createElement("td",null,t.total))))}});case 12:case"end":return O.stop()}},y)})))),asset:{type:"BLOCK",id:"docs-guide-watch-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"}},entry:"index.tsx"},context:{"@autostorejs/react":u,"x-react-components":A},renderOpts:{compile:function(){var y=d()(o()().mark(function s(){var l,a=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(l=r.sent).default.apply(l,a));case 3:case"end":return r.stop()}},s)}));function i(){return y.apply(this,arguments)}return i}()}}}},14097:function(ee,m,e){"use strict";var U;e.r(m),e.d(m,{demos:function(){return s}});var o=e(24325),k=e.n(o),R=e(29008),b=e.n(R),d=e(28633),D=e.n(d),W=e(70958),u=e.n(W),A=e(92379),v=e(73549),y=e(44970),i=e(365),s={"docs-guide-watch-store-demo-0":{component:A.memo(A.lazy(u()(b()().mark(function l(){var a,n,r,c,t,I,p,O,g,x,N,h,M,P,j,K,L;return b()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=w.sent,n=a.createStore,r=a.computed,c=a.useStore,w.next=8,Promise.resolve().then(e.bind(e,365));case 8:return t=w.sent,I=t.Box,p=t.Button,O=t.ColorBlock,g=t.Layout,x=t.CheckBox,w.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return N=w.sent,h=N.useEffect,M=N.useRef,P=n({order:{price:10,count:2,total:r(function(V){return V.price*V.count})}}),j=P.state,K=P.watch,L=P.$,w.abrupt("return",{default:function(){var Y=M(),te=c({operates:"*"}),H=te.useState("operates"),de=D()(H,2),Ee=de[0],ve=de[1];return h(function(){var _e=K(function(ye){Y.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(ye.type," ").concat(ye.path.join("."),"</p>"))},{operates:Ee});return function(){return _e.off()}},[Ee]),A.createElement(g,{style:{maxHeight:"400px"}},A.createElement("div",null,A.createElement(O,{name:"Price"},L("order.price")),A.createElement(O,{name:"Count"},A.createElement(p,{onClick:function(){j.order.count--,Y.current.insertAdjacentHTML("beforeend","----------")}},"-"),L("order.count"),A.createElement(p,{onClick:function(){j.order.count++,Y.current.insertAdjacentHTML("beforeend","----------")}},"+")),A.createElement(O,{name:"Total"},L("order.total")),A.createElement(I,null,A.createElement(x,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:Ee==="*",onChange:function(ye){ve(ye.target.checked?"*":"read")}}),A.createElement(x,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:Ee==="write",onChange:function(ye){ve(ye.target.checked?"write":"*")}}),A.createElement(x,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:Ee==="read",onChange:function(ye){ve(ye.target.checked?"read":"*")}})),A.createElement(p,{onClick:function(){Y.current.innerHTML=""}},"Clear")),A.createElement("div",{ref:Y,style:{overflowY:"auto"}}))}});case 21:case"end":return w.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":y,"x-react-components":i,react:U||(U=e.t(A,2))},renderOpts:{compile:function(){var l=u()(b()().mark(function n(){var r,c=arguments;return b()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(9039).then(e.bind(e,39039));case 2:return I.abrupt("return",(r=I.sent).default.apply(r,c));case 3:case"end":return I.stop()}},n)}));function a(){return l.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-1":{component:A.memo(A.lazy(u()(b()().mark(function l(){var a,n,r,c,t,I,p,O,g,x,N,h,M,P,j,K,L;return b()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=w.sent,n=a.createStore,r=a.computed,c=a.useStore,w.next=8,Promise.resolve().then(e.bind(e,365));case 8:return t=w.sent,I=t.Box,p=t.Button,O=t.ColorBlock,g=t.Layout,x=t.CheckBox,w.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return N=w.sent,h=N.useEffect,M=N.useRef,P=n({order:{price:10,count:2,total:r(function(V){return V.price*V.count})}}),j=P.state,K=P.watch,L=P.$,w.abrupt("return",{default:function(){var Y=M(),te=c({operates:"*"}),H=te.useState("operates"),de=D()(H,2),Ee=de[0],ve=de[1];return h(function(){var _e=K("order.total",function(ye){Y.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(ye.type," ").concat(ye.path.join("."),"</p>"))},{operates:Ee});return function(){return _e.off()}},[Ee]),A.createElement(g,{style:{maxHeight:"400px"}},A.createElement("div",null,A.createElement(O,{name:"Price"},L("order.price")),A.createElement(O,{name:"Count"},A.createElement(p,{onClick:function(){j.order.count--,Y.current.insertAdjacentHTML("beforeend","----------")}},"-"),L("order.count"),A.createElement(p,{onClick:function(){j.order.count++,Y.current.insertAdjacentHTML("beforeend","----------")}},"+")),A.createElement(O,{name:"Total"},L("order.total")),A.createElement(I,null,A.createElement(x,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:Ee==="*",onChange:function(ye){ve(ye.target.checked?"*":"read")}}),A.createElement(x,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:Ee==="write",onChange:function(ye){ve(ye.target.checked?"write":"*")}}),A.createElement(x,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:Ee==="read",onChange:function(ye){ve(ye.target.checked?"read":"*")}})),A.createElement(p,{onClick:function(){Y.current.innerHTML=""}},"Clear")),A.createElement("div",{ref:Y,style:{overflowY:"auto"}}))}});case 21:case"end":return w.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":y,"x-react-components":i,react:U||(U=e.t(A,2))},renderOpts:{compile:function(){var l=u()(b()().mark(function n(){var r,c=arguments;return b()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(9039).then(e.bind(e,39039));case 2:return I.abrupt("return",(r=I.sent).default.apply(r,c));case 3:case"end":return I.stop()}},n)}));function a(){return l.apply(this,arguments)}return a}()}},"docs-guide-watch-store-demo-2":{component:A.memo(A.lazy(u()(b()().mark(function l(){var a,n,r,c,t,I,p,O,g,x,N,h,M,P,j;return b()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,Promise.resolve().then(e.bind(e,44970));case 2:return a=L.sent,n=a.createStore,L.next=6,Promise.resolve().then(e.bind(e,365));case 6:return r=L.sent,c=r.Button,t=r.Layout,I=r.Input,L.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return p=L.sent,O=p.useEffect,g=p.useRef,x=n({order:{price:10,count:2,books:["AutoStore\u5B9E\u6218\u6307\u5357","\u6DF1\u5165\u6D45\u51FAAutoStore","AutoStore\u6700\u4F73\u5B9E\u8DF5"]}}),N=x.state,h=x.watch,M=x.$,P=x.useState,j=x.useBindings,L.abrupt("return",{default:function(){var w=g(),V=g();O(function(){var te=h("order.books",function(H){w.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          `.concat(H.type," ").concat(H.path.join("."),"[").concat(H.indexs[0],`]
        </p>`))},{operates:["insert","remove","update"]});return function(){return te.off()}},[]);var Y=j("order.books");return A.createElement(t,{style:{maxHeight:"400px"}},A.createElement("div",null,N.order.books.map(function(te,H){return A.createElement(I,k()({key:H},Y[H]))}),A.createElement(I,{ref:V,actions:["+"],placeholder:"\u8BF7\u8F93\u5165\u4E66\u540D",onAction:function(H,de){String(de).length>0&&(N.order.books.push(de),V.current.value="")}}),A.createElement(c,{onClick:function(){w.current.innerHTML=""}},"Clear")),A.createElement("div",{ref:w,style:{overflowY:"auto"}}))}});case 17:case"end":return L.stop()}},l)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.0"},"x-react-components":{type:"NPM",value:"1.0.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":y,"x-react-components":i,react:U||(U=e.t(A,2))},renderOpts:{compile:function(){var l=u()(b()().mark(function n(){var r,c=arguments;return b()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,e.e(9039).then(e.bind(e,39039));case 2:return I.abrupt("return",(r=I.sent).default.apply(r,c));case 3:case"end":return I.stop()}},n)}));function a(){return l.apply(this,arguments)}return a}()}}}},45618:function(ee,m,e){"use strict";e.r(m),e.d(m,{demos:function(){return k}});var U=e(92379),o=e(43112),k={}},20927:function(ee,m,e){"use strict";e.r(m),e.d(m,{Author:function(){return s},Counter:function(){return A},getProjects:function(){return c},useOneEffect:function(){return I}});var U=e(28633),o=e.n(U),k=e(92379),R=e(44970),b=e(365),d=e(651),D=(0,R.createStore)({root:{count:1}}),W=D.state,u=D.$,A=function(){var O=(0,k.useState)(1),g=o()(O,2),x=g[0],N=g[1];return(0,d.jsxs)(b.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[x,(0,d.jsxs)(b.ColorBlock,{children:["Count:",x]}),(0,d.jsxs)(b.ColorBlock,{children:["Count:",u("root.count")]}),(0,d.jsx)(b.Button,{onClick:function(){return N(x+1)},children:"State +1"}),(0,d.jsx)(b.Button,{onClick:function(){return W.root.count++},children:"Signal +1"})]})},v=(0,R.createStore)({firstName:"Zhang",lastName:"Fisher"}),y=v.state,i=v.$,s=function(){var O=(0,k.useState)(1),g=o()(O,2),x=g[0],N=g[1];return(0,d.jsxs)(b.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[x,(0,d.jsxs)(b.ColorBlock,{children:["Count:",x]}),(0,d.jsx)(b.ColorBlock,{children:i(function(h){return h.firstName+" "+h.lastName})}),(0,d.jsx)(b.Button,{onClick:function(){return N(x+1)},children:"State +1"}),(0,d.jsx)(b.Button,{onClick:function(){return y.lastName=y.lastName+"."},children:"Update lastName"})]})},l=e(29008),a=e.n(l),n=e(70958),r=e.n(n);function c(p){return t.apply(this,arguments)}function t(){return t=r()(a()().mark(function p(O){var g,x,N;return a()().wrap(function(M){for(;;)switch(M.prev=M.next){case 0:return M.next=2,fetch(O);case 2:if(g=M.sent,!g.ok){M.next=11;break}return M.next=6,g.json();case 6:return x=M.sent,N=x.map(function(P){return{name:P.name,url:P.html_url,description:P.description,stars:P.stargazers_count}}),M.abrupt("return",N);case 11:throw new Error("".concat(g.status," - ").concat(g.statusText));case 12:case"end":return M.stop()}},p)})),t.apply(this,arguments)}function I(p){var O=(0,k.useRef)(!1);(0,k.useEffect)(function(){if(!O.current)return O.current=!0,p()})}},365:function(ee,m,e){"use strict";e.r(m),e.d(m,{Box:function(){return k},Button:function(){return W},Card:function(){return v},CheckBox:function(){return w},ColorBlock:function(){return t},Divider:function(){return a},ErrorBoundary:function(){return X},Field:function(){return l},Input:function(){return h},JsonView:function(){return L},Layout:function(){return p},Loading:function(){return b},RichLabel:function(){return j},Select:function(){return Y},Table:function(){return q},TextArea:function(){return Ie},ValidResult:function(){return s}});var U=e(92379),o=e(651),k=(0,U.forwardRef)(function(z,T){var oe=z.title,le=z.enable,ae=le===void 0?!0:le,se=z.visible,ce=se===void 0?!0:se;return(0,o.jsxs)("div",{ref:T,style:{display:ce?"flex":"none",position:"relative",flexDirection:"column",padding:"8px",margin:"16px 4px 4px 4px",boxSizing:"border-box",border:"1px solid #bbb"},children:[(0,o.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:ae?"#bbb":"gray"},children:oe||""}),z.children]})}),R=e(97106),b=function(T){var oe=T.size,le=oe===void 0?20:oe,ae=T.visible,se=ae===void 0?!0:ae,ce=T.color,ne=T.tips,pe=ne===void 0?"loading...":ne;return(0,o.jsxs)("span",{title:pe,style:{display:se?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,o.jsx)(R.Z1,{width:le,height:le,color:ce}),T.title?(0,o.jsx)("span",{style:{marginLeft:"4px"},children:T.title}):null]})},d=e(94039),D=(0,d.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(T){return T.visible!==!1?T.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #eee",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555",fontSize:"0.8em","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"x-button"}),W=function(T){var oe=T.loading,le=T.timeout,ae=le===void 0?0:le,se=T.progress,ce=se===void 0?0:se,ne=T.cancel,pe=T.onClick;return(0,o.jsxs)("div",{className:D.className,style:D.getStyle(T),onClick:pe,children:[oe?(0,o.jsx)(b,{}):null,(0,o.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:T.children}),ae>0?(0,o.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:ae}):"",ce>0?(0,o.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[ce,"%"]}):"",T.error?(0,o.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:T.error}):"",T.loading&&typeof ne=="function"?(0,o.jsx)("button",{onClick:ne,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},u=(0,d.zo)({border:"1px solid #e1e1e1",background:function(T){return T.enable!==!1?"white":"gray"},margin:"8px",display:function(T){return T.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"card"}),A=(0,d.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555"},{className:"card-header"}),v=function(T){var oe=T.title,le=T.enable,ae=le===void 0?!0:le,se=T.buttons,ce=se===void 0?[]:se,ne=Array.isArray(T.children)?T.children:[T.children];return(0,o.jsxs)("div",{className:u.className,style:u.getStyle(T),children:[(0,o.jsxs)("div",{className:A.className,style:A.getStyle(T),children:[(0,o.jsx)("span",{style:{flexGrow:1,color:ae?"#222":"gray"},children:oe}),(0,o.jsx)("span",{style:{},children:ce.map(function(pe,fe){return(0,o.jsx)("span",{className:"button",style:{padding:"4px",margin:"4px",cursor:"pointer"},onClick:pe.onClick,children:pe.title},fe)})})]}),(0,o.jsx)("div",{style:{padding:"12px"},children:ne.map(function(pe,fe){return ne.length>1&&fe===ne.length-1&&pe.classList&&pe.classList.contains("footer")?(0,o.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:pe},fe):pe})})]})},y=e(24325),i=e.n(y),s=function(T){var oe=T.validate,le=T.help;if(oe!==void 0){var ae=typeof oe!="boolean",se=ae?oe==null?void 0:oe.result:oe,ce=ae?oe==null?void 0:oe.loading:!1,ne=ae?oe==null?void 0:oe.error:le;return(0,o.jsxs)("span",{style:{color:"red",display:ce||!se?"flex":"none"},children:[(0,o.jsx)(b,{visible:ce,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!ce&&(se?"":ne)]})}},l=function(T){var oe=T.enable,le=oe===void 0?!0:oe,ae=T.visible,se=ae===void 0?!0:ae,ce=T.label,ne=ce===void 0?"":ce,pe=T.children,fe=pe===void 0?"":pe,he=T.memo;return(0,o.jsxs)("div",{className:"field",style:{position:"relative",display:se===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,o.jsxs)("label",{className:"field-label",style:{minWidth:"160px",fontWeight:"bold",color:le===!1?"gray":"inherit"},children:[ne,":"]}),(0,o.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:le===!1?"gray":"inherit"},children:[typeof fe=="function"?"":fe,he&&(0,o.jsx)("span",{style:{color:"gray"},children:he})]}),(0,o.jsx)(s,i()({},T))]})},a=function(T){var oe=T.title,le=T.visible,ae=le===void 0?!0:le;return(0,o.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:ae?"flex":"none"},children:(0,o.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:oe})})},n=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],r=0;function c(){return r++,r>=n.length&&(r=0),n[r]}var t=function(T){var oe=(0,U.useRef)(0),le=T.name,ae=T.value,se=ae===void 0?"":ae,ce=T.loading,ne=ce===void 0?!1:ce,pe=T.comment,fe=c(),he="white";return(0,U.useEffect)(function(){oe.current++}),(0,o.jsxs)("div",{style:i()(i()({backgroundColor:fe,padding:"6px",color:he,display:"flex"},T.style),{},{alignItems:"center"}),children:[(0,o.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[le?(0,o.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:le}):null,le?(0,o.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,o.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(se),T.children]})]}),pe?(0,o.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:pe}):null,ne?(0,o.jsx)(b,{color:"white"}):null,(0,o.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:oe.current})]})},I=(0,d.zo)({display:function(T){return T.visible===!1?"none":"flex"},position:"relative",flexDirection:function(T){return T.direction||"row"},padding:"4px",margin:"4px",boxSizing:"border-box",alignItems:"stretch","&>*":{flex:1,boxSizing:"border-box",position:"relative",borderLeft:"1px solid #eee",borderTop:"1px solid #eee",borderBottom:"1px solid #eee",padding:"8px"},"&>:last-child":{borderRight:"1px solid #eee"}},{className:"x-layout"}),p=function(T){return(0,o.jsx)("div",{className:I.className,style:I.getStyle(T,T.style),children:T.children})},O=e(19317),g=e.n(O),x=["id","enable","style","value","actions"],N=(0,d.zo)({border:function(T){return T.validate===!1?"1px solid red":"1px solid #bbb"},borderRadius:"4px",background:function(T){return T.enable===!1?"gray":"white"},display:function(T){return T.visible===!1?"none":"block"},margin:"4px",padding:"8px",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}},{className:"x-input"}),h=function(T){var oe=T.id,le=oe===void 0?Math.random().toString(36).slice(2):oe,ae=T.enable,se=ae===void 0?!0:ae,ce=T.style,ne=ce===void 0?{}:ce,pe=T.value,fe=T.actions,he=g()(T,x),ge=T.label||T.name||T.id,be=(0,U.useRef)(null),Be={color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"};return(0,o.jsxs)("div",{style:i()({display:"flex",alignItems:"center"},ne),children:[ge?(0,o.jsx)("label",{htmlFor:le,style:Be,children:ge}):null,(0,o.jsx)("input",i()(i()({ref:be,id:le,value:pe,readOnly:!se},he),{},{className:N.className,style:N.getStyle(T)})),fe==null?void 0:fe.map(function(Ne){return(0,o.jsx)("button",{onClick:function(Ze){var We;(We=T.onAction)===null||We===void 0||We.call(T,Ne,be.current.value,Ze)},children:Ne},Ne)})]})},M=e(28633),P=e.n(M),j=function(T){var oe=T.text,le=T.color,ae=le===void 0?"#ff6c00":le,se=T.rules,ce=typeof ae=="string"?{default:ae}:Object.assign({default:""},ae),ne=oe;return se?Object.entries(se).forEach(function(pe){var fe=P()(pe,2),he=fe[0],ge=fe[1];ne=ne.replace(ge,function(be){var Be=he.includes(":")?he:"color:".concat(he,";");return"<span style='".concat(Be,"'>").concat(be,"</span>")})}):ne=oe.replace(/\{\s?(.*?)\s?\}/gm,function(pe,fe){return"<span style='color: ".concat(fe in ce?ce[fe]:ce.default,"'>").concat(fe,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,o.jsx)("div",{style:i()({boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},T.style),children:(0,o.jsx)("span",{dangerouslySetInnerHTML:{__html:ne}})})},K=function(T){return T.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},L=function(T){var oe=T.data,le=K(oe?JSON.stringify(oe,null,4):String(T.children));return(0,o.jsx)(j,{text:le,rules:{"color:green;":/true|false/g,"color:#222;padding:4px;":/"(.*?)"/g,"color:#bd0081;padding:4px;":/(?!=:\s*)[\d.]+/g,"color:#888;padding:4px;":/(null|defined)/g,"color:#918213;paddingRight:4px;":/^\{|\}$/g},style:{}})},Z=(0,d.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-checkbox"}),w=function(T){var oe=T.id,le=oe===void 0?Math.random().toString(36).slice(2):oe,ae=T.labelPos,se=ae===void 0?"right":ae,ce=T.label||T.name||T.id;return(0,o.jsxs)("div",{className:Z.className,style:Z.getStyle(T),children:[se==="left"?(0,o.jsx)("label",{htmlFor:le,children:ce}):null,(0,o.jsx)("input",i()(i()({},T),{},{id:le,type:"checkbox"})),se==="right"?(0,o.jsx)("label",{htmlFor:le,children:ce}):null]})},V=(0,d.zo)({display:"flex",alignItems:"center",cursor:"pointer","&>label":{userSelect:"none",fontSize:"14px",cursor:"pointer",width:"100px",flexShrink:0},"&>select":{margin:"4px",padding:"8px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-select"}),Y=function(T){var oe=T.items,le=oe===void 0?[]:oe,ae=T.label||T.name||T.id;return(0,o.jsxs)("div",{className:V.className,style:V.getStyle(T),children:[(0,o.jsx)("label",{children:ae}),(0,o.jsx)("select",i()(i()({},T),{},{value:T.value,children:le.map(function(se){return(0,o.jsx)("option",{value:se.value,children:se.title},se.value)})}))]})},te=e(93949),H=e.n(te),de=e(6270),Ee=e.n(de),ve=e(77701),_e=e.n(ve),ye=e(28249),De=e.n(ye),X=function(z){_e()(oe,z);var T=De()(oe);function oe(le){var ae;return H()(this,oe),ae=T.call(this,le),ae.state={error:void 0},ae}return Ee()(oe,[{key:"render",value:function(){return this.state.error?(0,o.jsx)(k,{children:this.state.error}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(ae){return{error:ae.stack}}}]),oe}(U.Component),J=(0,d.zo)({width:"100%",marginBottom:"1rem",color:"#212529",backgroundColor:"white",borderCollapse:"collapse",border:"1px solid #dee2e6","& th":{backgroundColor:"#f7f7f7"},"& th,td":{padding:".5rem",verticalAlign:"top",border:"1px solid #dee2e6"},"& td":{padding:".5rem",border:"1px solid #dee2e6",verticalAlign:"middle"},"& tfoot":{backgroundColor:"#f7f7f7",padding:".75rem"}},{className:"x-table"}),q=function(T){var oe,le=T.cols.map(function(ae){var se=typeof ae=="string"?{name:ae,align:"center"}:ae;return se.name.startsWith("<")&&(se.align="left",se.name=se.name.substring(1)),se.name.startsWith(">")&&(se.align="right",se.name=se.name.substring(1)),se});return(0,o.jsxs)("table",{className:J.className,style:J.getStyle(T),children:[(0,o.jsxs)("thead",{children:[T.title?(0,o.jsx)("tr",{children:(0,o.jsx)("th",{colSpan:le.length,children:T.title})}):null,(0,o.jsx)("tr",{children:le==null?void 0:le.map(function(ae,se){return(0,o.jsx)("th",{style:{width:ae.width?ae.width:void 0,textAlign:ae.align?ae.align:void 0},children:ae.name},se)})})]}),(0,o.jsx)("tbody",{children:(oe=T.rows)===null||oe===void 0?void 0:oe.map(function(ae,se){return(0,o.jsx)("tr",{children:ae.map(function(ce,ne){var pe=1;if(ce!=null){for(var fe=ne+1;fe<ae.length&&ae[fe]==null;fe++)pe++;return(0,o.jsx)("td",{colSpan:pe>1?pe:void 0,style:{textAlign:le[ne].align},children:typeof ce=="function"?ce():String(ce)},ne)}})},se)})}),T.children?(0,o.jsx)("tfoot",{children:(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:le.length,children:T.children})})}):null]})},me=(0,d.zo)({padding:"0px",display:"flex","&>label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&>textarea":{margin:"4px",padding:"8px",minHeight:"80px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-textArea"}),Ie=function(T){var oe=T.id,le=oe===void 0?Math.random().toString(36).slice(2):oe,ae=T.label||T.name||T.id;return(0,o.jsxs)("div",{className:me.className,style:me.getStyle(T),children:[(0,o.jsx)("label",{htmlFor:le,children:ae}),(0,o.jsx)("textarea",i()(i()({},T),{},{id:le}))]})}},99640:function(ee,m,e){"use strict";e.d(m,{eg:function(){return ve},_L:function(){return j},WE:function(){return ot},M1:function(){return At},CD:function(){return P},up:function(){return Ee},Xr:function(){return Ye},BG:function(){return at},e2:function(){return L},vp:function(){return qe},FM:function(){return Z},y1:function(){return V},MI:function(){return w},Q6:function(){return te},kF:function(){return H},Rn:function(){return He},fR:function(){return Ue},f7:function(){return de},QI:function(){return Y},X3:function(){return nt},W5:function(){return K},RY:function(){return dt},LG:function(){return lt},Rh:function(){return Le},Fl:function(){return X},Ws:function(){return ht},gw:function(){return pt},b0:function(){return tt},tl:function(){return Ze},if:function(){return vt},zv:function(){return Be},ux:function(){return pe},kM:function(){return it},vM:function(){return Ge},Jy:function(){return fe},O5:function(){return J},Jq:function(){return ae},vo:function(){return Ie},c6:function(){return ct},_N:function(){return z},iI:function(){return q},vb:function(){return ce},PH:function(){return T},J_:function(){return oe},PO:function(){return le},pt:function(){return xt},tI:function(){return se},RM:function(){return ne},_R:function(){return me},UQ:function(){return be},Xl:function(){return he},DH:function(){return Je},KZ:function(){return ye},Ql:function(){return mt},ZW:function(){return It},Y6:function(){return ge},EG:function(){return We},YP:function(){return ut}});var U=e(29008),o=e.n(U),k=e(70958),R=e.n(k),b=e(12027),d=e.n(b),D=e(34180),W=e.n(D),u=e(93949),A=e.n(u),v=e(6270),y=e.n(v),i=e(28810),s=e.n(i),l=e(77701),a=e.n(l),n=e(28249),r=e.n(n),c=e(29861),t=e.n(c),I=e(14582),p=e.n(I),O=e(48510),g=e.n(O),x=e(30790),N=e.n(x),h=e(5672),M=e.n(h),P=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B)}(M()(Error)),j=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B)}(P),K=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B)}(P),L=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B)}(P),Z=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B)}(P),w=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B)}(P),V=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B)}(P),Y=Symbol("skip-proxy"),te=Symbol("observer-descriptor-builder"),H=Symbol("observer-descriptor"),de=".",Ee="__batch_update__",ve=Symbol("AsyncComputedValue");function _e(C){return C.constructor.name==="AsyncFunction"}function ye(C){return C?C.map(function(_){return Array.isArray(_)?_:typeof _=="string"?["/","./","../"].some(function(B){return _.startsWith(B)})?_:_.includes(de)?_.split(de):_.split("."):[]}):[]}function De(){return{async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0,objectify:!0}}function X(){var C=arguments[0];if(typeof C!="function")throw new Error("computed getter must be a function");var _=[],B=Object.assign({},De());if(arguments.length===1)_=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))B.depends=arguments[1];else if(W()(arguments[1])==="object")Object.assign(B,arguments[1]),B.depends=ye(B.depends);else throw new Z;else arguments.length>=3&&(_=ye(arguments[1]),Object.assign(B,arguments[2]),B.depends=_);B.async=B.async===!0||_e(C)||arguments.length>=2&&Array.isArray(arguments[1]);var E=function(){return t()({type:"computed",getter:C,options:B},H,!0)};return E[te]=!0,E}function J(C){return C?C.some(function(_){return typeof _=="string"?_.startsWith("./")||_.startsWith("../")||_.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(_):!0}):!1}function q(C){return W()(C)==="object"&&C.hasOwnProperty("type")&&typeof C.type=="string"&&C.hasOwnProperty("getter")&&typeof C.getter=="function"&&C.hasOwnProperty("options")&&W()(C.options)==="object"}function me(C){try{return C[Y]===!0}catch(_){}return!1}function Ie(C,_){if(C===_)return!0;if(C===null||_===null||W()(C)!==W()(_))return!1;if(W()(C)==="object"){if(Array.isArray(C)&&Array.isArray(_))return C.length!==_.length?!1:C.every(function(E,f){return Ie(E,_[f])});if(!Array.isArray(C)&&!Array.isArray(_)){var B=Object.keys(C);return B.length!==Object.keys(_).length?!1:B.every(function(E){return Ie(C[E],_[E])})}else return!1}return!1}function z(C){return toString.call(C)==="[object Map]"}function T(C,_){return!C||!_||C.length!==_.length?!1:C.every(function(B,E){return B===_[E]})}function oe(C,_){var B=T(C,_);return B?!0:C.length!==_.length?!1:C.every(function(E,f){return E==="*"?!0:E===_[f]})}function le(C){return C==null||W()(C)!=="object"?!1:Object.prototype.toString.call(C)==="[object Object]"}function ae(C){return C&&W()(C)==="object"&&C.hasOwnProperty(ve)}function se(C){try{return!!C&&(W()(C)==="object"||typeof C=="function")&&typeof C.then=="function"&&typeof C.catch=="function"&&(C instanceof Promise||Object.prototype.toString.call(C)==="[object Promise]")}catch(_){return!1}}function ce(C){return typeof C=="function"&&C[te]===!0}function ne(C){return W()(C)==="object"&&C!==null&&!("__isProxy"in C)}function pe(C,_){var B=C.get(_);if(B!==void 0)return B;var E=C.get(Number(_)||_);if(E!==void 0)return E}function fe(C,_,B){if(!_||_.length===0)return C;for(var E,f=C,S=0;S<_.length;S++){var $=_[S];if(z(f))E=pe(f,$);else if($ in f)E=f[$];else{if(B!==void 0)return B;throw new Error("invalid state path: ".concat(_.join(".")))}f=E}return E}function he(C){try{C[Y]=!0}catch(_){}return C}function ge(C,_,B,E){for(var f=C,S=_.length-1,$=0;$<_.length;$++){var F=_[$],G=z(f);if($===S){if(E===!0){var re=G?pe(f,F):f[F];ae(re)&&(f=re,F="value")}G?f.set(F,B):f[F]=B;return}var Q=G?pe(f,F):f[F];f=Q}}function be(C){return(C||["ROOT"]).map(function(_){return Array.isArray(_)?_.join("."):_}).join(de)}function Be(){return Math.random().toString(36).slice(2)}function Ne(C,_,B){var E=C&&!C[0].startsWith("#");if(Array.isArray(_))return _;if(_==="self")return E?C:void 0;if(_==="root")return E?[]:void 0;if(_==="parent")return E?C.slice(0,-2):void 0;if(_==="current")return E?C.slice(0,-1):void 0;if(typeof _=="string")return _.startsWith("./")?E?[].concat(d()(C.slice(0,-1)),d()(_.slice(2).split(de))):void 0:_.startsWith("../")?E?Ne(C.slice(0,-1),_.slice(3),!0):void 0:_.startsWith("/")?_.replace(/^(\/)*/,"").split(de):E&&B?[].concat(d()(C.slice(0,-1)),d()(_.split(de))):_.split(de)}function Le(C,_){return _?_.map(function(B){return Ne(C,B)}).filter(function(B){return B!==void 0}):[]}function Ze(C,_){var B="";return _.id?B=_.id:B=be(C),B}function We(C,_,B){var E=C,f=_.length-1;_.forEach(function(S,$){var F=z(E);if($===f){var G=F?E.get(S):E[S];W()(G)==="object"&&Object.assign(G,B);return}F?(E.has(S)||E.set(S,{}),E=E.get(S)):(S in E||(E[S]={}),E=E[S])})}function tt(C,_){function B(E,f){for(var S in E){var $=E[S];typeof _=="function"&&_({value:$,key:S,parent:E,path:f.concat(S)}),W()($)==="object"&&B($,f.concat(S))}}B(C,[])}function it(C){return C}function pt(){var C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(_){setTimeout(_,C)})}function Je(C){var _=new Map;return C.forEach(function(B){var E=B.join(".");_.set(E,B)}),Array.from(_.values())}function It(C,_){return C.length>_.length?!1:C.every(function(B,E){return B===_[E]})}function vt(C,_){var B=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"none",E=[];return typeof C=="function"?E=_.collectDependencies(function(){return C(_.state)}):typeof C=="string"?E=[C.split(de)]:Array.isArray(C)?E=[d()(C)]:E=[],B!=="none"&&E.forEach(function(f){var S=_.peep(function($){return fe($,f)});ae(S)&&f.push(B==="all"?"*":"value")}),E}function mt(C,_){if(!_||_.length===0)return!1;for(var B,E=C,f=0;f<_.length;f++){var S=_[f],$=!1;if(z(E)){if($=E.has(S),!$)return!1;B=pe(E,S)}else{if($=S in E,!$)return!1;B=E[S]}E=B}return!0}var ft=e(24325),ke=e.n(ft);function Ge(C,_){if(Array.isArray(C)){for(var B=d()(C),E=0;E<B.length;E++)B[E]=Ge(B[E],_);return B}else if(W()(C)==="object"){if(!_&&ae(C))return C.value;var f=ke()({},C);for(var S in f)f[S]=Ge(f[S],_);return f}return C}function xt(C){return C==null||typeof C=="string"||typeof C=="number"||typeof C=="boolean"}function ht(C){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof C=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(C)}var at=function(C){a()(B,C);var _=r()(B);function B(E){var f;return A()(this,B),f=_.call(this),f.store=E,f}return y()(B,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(f){this.store.options.enableComputed=f}},{key:"create",value:function(){var f=q(arguments[0])?arguments[0]:X.apply(void 0,arguments)();if(f.options.async&&!J(f.options.depends))throw new V("The scope of the dynamic computed object must be the root state object or an absolute path");var S=f.options.scope;if(S===void 0)f.options.scope="ROOT";else if(!J([S]))throw new w("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(f)}},{key:"runGroup",value:function(){var E=R()(o()().mark(function S($,F,G){return o()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,this.run(function(ue){return ue.group===$},F,G);case 2:return Q.abrupt("return",Q.sent);case 3:case"end":return Q.stop()}},S,this)}));function f(S,$,F){return E.apply(this,arguments)}return f}()},{key:"run",value:function(){var E=R()(o()().mark(function S(){var $=arguments,F=this,G,re,Q,ue,ie=arguments;return o()().wrap(function(xe){for(;;)switch(xe.prev=xe.next){case 0:if(ie.length!==0){xe.next=2;break}return xe.abrupt("return",Promise.all(d()(this.values()).map(function(Se){return Se.run()})));case 2:return typeof ie[0]=="function"?G=ie[0]:typeof ie[0]=="string"&&(G=function(Me){return Me.id===$[0]}),re=Object.assign({},ie[1]),Q=Object.assign({wait:!1,timeout:0},ie[2]),ue={},xe.abrupt("return",new Promise(function(Se,Me){if(Q.wait){var Oe;re.onDone=function(je){var $e=je.id;if(ue[$e]=!0,Object.values(ue).every(function(Ke){return Ke}))return clearTimeout(Oe),!0},Q.timeout>0&&(Oe=setTimeout(function(){Me(new K)},Q.timeout))}Promise.all(d()(F.values()).filter(function(je){return G(je)?(ue[je.id]=!1,!0):!1}).map(function(je){return je.run(re)})),Q.wait||Se()}));case 7:case"end":return xe.stop()}},S,this)}));function f(){return E.apply(this,arguments)}return f}()},{key:"enableGroup",value:function(){var E=R()(o()().mark(function S($){var F,G,re;return o()().wrap(function(ue){for(;;)switch(ue.prev=ue.next){case 0:F=p()(this.values());try{for(F.s();!(G=F.n()).done;)re=G.value,re.options.enable=$}catch(ie){F.e(ie)}finally{F.f()}case 2:case"end":return ue.stop()}},S,this)}));function f(S){return E.apply(this,arguments)}return f}()},{key:"delete",value:function(f){var S;return(S=this.get(f))===null||S===void 0||S.detach(),g()(N()(B.prototype),"delete",this).call(this,f)}},{key:"find",value:function(f){if(f){var S=Array.isArray(f)?f:f.split(de),$=p()(this.values()),F;try{for($.s();!(F=$.n()).done;){var G=F.value;if(T(G.path,S))return G}}catch(re){$.e(re)}finally{$.f()}}}}]),B}(M()(Map)),_t=e(69075);function gt(C){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",B=typeof C=="function"?C():C instanceof Error?C.stack:C;try{var E;(E=console)[_].apply(E,["[AutoStore<".concat(this.id,">]")].concat(d()(Array.isArray(B)?B:[B])))}catch(f){}}function we(C,_){var B=arguments.length>2&&arguments[2]!==void 0?arguments[2]:de,E=[];try{return typeof _=="function"&&(_=_.call(C,C)),E=Array.isArray(_)?_:typeof _=="string"?_.split(B):[],E.length>0?fe(C,E):C}catch(f){return C}}var Ue=function(C){return C.Root="ROOT",C.Current="CURRENT",C.Parent="PARENT",C.Depends="DEPENDS",C.Self="SELF",C}({});function yt(C,_,B){var E=_===void 0?B:_;if(typeof E=="function")try{E=E.call(C.store,C)}catch(f){}return E===void 0?B===void 0?Ue.Current:B:E}function ze(C,_,B,E){var f=C.store.state,S=C.store.options;if(typeof S.getRootScope=="function"){var $=S.getRootScope(C,{observerType:_,valuePath:B==null?void 0:B.path});$!==void 0&&(f=$)}var F=B||{},G=F.path,re=F.parentPath,Q=yt(C,E.scope,S.scope),ue=f;try{if(Q===Ue.Current)ue=we(f,re);else if(Q===Ue.Parent)ue=we(f,G.slice(0,G.length-2<0?0:G.length-2));else if(Q===Ue.Root)ue=f;else if(Q===Ue.Depends){var ie;ue=(ie=C.depends)===null||ie===void 0?void 0:ie.map(function(Ce){return we(f,Ce)})}else typeof Q=="string"?Q.startsWith("@")?ue=ze(C,_,B,ke()(ke()({},E),{},{scope:ze(C,_,ke()(ke()({},B),{},{path:Q.slice(1).split(de)}),ke()(ke()({},E),{},{scope:Q.slice(1)}))})):ue=we(f,Ne(C.path,Q)):Array.isArray(Q)&&(ue=we(f,Q))}catch(Ce){S.log("Error while getting computed scope ".concat(C.toString(),": ").concat(Ce.message),"error")}return ue}var He=function(){function C(_,B,E){A()(this,C),t()(this,"_path",void 0),t()(this,"_id",""),t()(this,"_initial",void 0),t()(this,"_value",void 0),t()(this,"_associated",!1),t()(this,"_attached",!1),t()(this,"_getter",void 0),t()(this,"_depends",[]),t()(this,"_options",void 0),t()(this,"_subscribers",[]),t()(this,"_strPath",void 0),this.store=_,this.descriptor=B,this.context=E,this._associated=E!==void 0,this._getter=B.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},B.options),this._id=this._options.id||(this._associated?be(E==null?void 0:E.path):Be()),this._path=(E==null?void 0:E.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=Le(this._path,this._options.depends),this._onObserverCreated(),this._onInitial()}return y()(C,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(B){this._options.enable=B}},{key:"group",get:function(){return this._options.group},set:function(B){this._options.group=B}},{key:"initial",get:function(){return this._initial},set:function(B){this._initial=B}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(B){this._depends=B}},{key:"getter",get:function(){return this._getter},set:function(B){this._getter=B}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(de)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?fe(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(B){this._associated?ge(this.store.state,this._path,B):(this._value=B,this.store._notify({type:"set",path:this.path,value:B}))}},{key:"_onObserverCreated",value:function(){typeof this.store.options.onObserverCreated=="function"&&this.store.options.onObserverCreated(this)}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"onInitOptions",value:function(B){}},{key:"update",value:function(B,E){var f=this;this.store.update(function(){f.value=B},E)}},{key:"silentUpdate",value:function(B){this.update(B,{silent:!0})}},{key:"watch",value:function(B,E){var f=this;return this.store.watch(this.getValueWatchPath(),function(S){B.call(f,S)},E)}},{key:"getValueWatchPath",value:function(){return this.path.join(de)}},{key:"emitStoreEvent",value:function(B,E){var f=this;setTimeout(function(){f.store.emit(B,E)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(B){}},{key:"attach",value:function(){var B=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(B.toString()," subscribed to ").concat(B.depends.map(function(E){return E.join(de)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(B){return B.off()}),this._attached=!1)}},{key:"run",value:function(){}}]),C}(),Ye=function(C){a()(B,C);var _=r()(B);function B(E,f,S){var $;return A()(this,B),$=_.call(this,E,f,S),$.store=E,$.descriptor=f,$.context=S,f.options.depends=Le($.path,$.options.depends),$}return y()(B,[{key:"toString",value:function(){return"ComputedObject<".concat(be(this.path),">")}},{key:"isDisable",value:function(f){return!this.store.options.enableComputed||!this.enable&&f!==!0||f===!1}},{key:"run",value:function(f){throw new Error("Method not implemented.")}}]),B}(He),nt=function(C){a()(B,C);var _=r()(B);function B(){return A()(this,B),_.apply(this,arguments)}return y()(B,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(f){var S=this,$=Object.assign({first:!1,operate:void 0},f),F=$.first,G=$.operate;if(!F&&this.isDisable(f==null?void 0:f.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!F&&this.store.log(function(){return"Run sync computed for : ".concat(S.toString())});var re=f?Object.assign({},this.options,f):this.options,Q=ze(this,"computed",this.context,re),ue=re.initial;try{ue=this.getter.call(this,Q,{operate:G,first:F}),F&&(this.initial=ue),this.store.peep(function(){S.value=ue}),!F&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:ue,computedObject:this})}catch(ie){throw!F&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:ie,computedObject:this}),ie}}},{key:"collectDependencies",value:function(){var f=[],S=this.store.watch(function($){f.push($.path)},{operates:["get"]});this.run({first:!0}),S.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&f.push.apply(f,d()(Le(this.path,this.options.depends))),this.depends=Je(f),this.attach()}},{key:"onDependsChange",value:function(f){this.run({operate:f})}}]),B}(Ye);function Et(C,_,B,E,f){return B==="push"?function(){for(var S=_.length,$=arguments.length,F=new Array($),G=0;G<$;G++)F[G]=arguments[G];var re=E.apply(_,F);if(_.length>S){var Q=Array.from({length:_.length-S},function(ue,ie){return ie+S});C({type:"insert",path:f,indexs:Q,value:F,oldValue:void 0,parentPath:f,parent:_})}return re}:B==="pop"?function(){var S=_.length,$=E.apply(_);return _.length===S-1&&C({type:"remove",path:f,indexs:[S-1],value:[$],oldValue:void 0,parentPath:f,parent:_}),$}:B==="splice"?function(S,$){for(var F=arguments.length,G=new Array(F>2?F-2:0),re=2;re<F;re++)G[re-2]=arguments[re];var Q=E.apply(_,[S,$].concat(G));if(Q.length>0){var ue=Array.from({length:Q.length},function(Ce,xe){return S+xe});C({type:"remove",path:f,indexs:ue,value:Q,oldValue:void 0,parentPath:f,parent:_})}if(G.length>0){var ie=Array.from({length:G.length},function(Ce,xe){return S+xe});C({type:"insert",path:f,indexs:ie,value:G,oldValue:void 0,parentPath:f,parent:_})}return Q}:B==="unshift"?function(){for(var S=_.length,$=arguments.length,F=new Array($),G=0;G<$;G++)F[G]=arguments[G];var re=E.apply(_,F);if(_.length>S){var Q=Array.from({length:_.length-S},function(ue,ie){return ie});C({type:"insert",path:f,indexs:Q,value:F,oldValue:void 0,parentPath:f,parent:_})}return re}:B==="shift"?function(){var S=_.length,$=E.apply(_);return _.length===S-1&&C({type:"remove",path:f,indexs:[0],value:[$],oldValue:void 0,parentPath:f,parent:_}),$}:B==="fill"?function(S,$,F){var G=E.apply(_,[S,$,F]),re=$!=null?$:0,Q=F!=null?F:_.length,ue=Array.from({length:Q-re},function(Ce,xe){return xe+re}),ie=Array.from({length:Q-re},function(){return S});return C({type:"update",path:f,indexs:ue,value:ie,oldValue:void 0,parentPath:f,parent:_}),G}:B==="concat"?function(){for(var S=_.length,$=arguments.length,F=new Array($),G=0;G<$;G++)F[G]=arguments[G];var re=E.apply(_,F),Q=Array.from({length:F.length},function(ue,ie){return S+ie});return C({type:"insert",path:f,indexs:Q,value:F,oldValue:void 0,parentPath:f,parent:_}),re}:E}var Xe=Symbol("__NOTIFY__");function rt(C,_,B,E,f){if(me(C)||W()(C)!=="object"||C===null)return C;if(B.has(C))return B.get(C);var S=new Proxy(C,{get:function(F,G,re){var Q=Reflect.get(F,G,re);if(typeof G!="string")return Q;var ue=[].concat(d()(_),[String(G)]);if(typeof Q=="function"||!Object.hasOwn(F,G))if(typeof Q=="function"){if(Array.isArray(F))return Et(f.notify,F,G,Q,_);if(!me(Q)&&Object.hasOwn(F,G)){var ie=ue.join(".");try{if(E.has(ie)){var Ce=[].concat(d()(E.keys()),[ie]);throw E.clear(),new L('Find circular dependency at <"'.concat(ue,'">, steps: ').concat(Ce.join(" <- ")))}return E.set(ie,!0),f.createComputedObject(ue,Q,_,F)}finally{E.delete(ie)}}else return Q}else return Q;return f.notify({type:"get",path:ue,indexs:[],value:Q,oldValue:void 0,parentPath:_,parent:F}),rt(Q,ue,B,E,f)},set:function(F,G,re,Q){var ue=Reflect.get(F,G,Q),ie=Reflect.set(F,G,re,Q);if(G===Xe)return!0;if(ie&&G!==Xe&&re!==ue)if(Array.isArray(F))f.notify({type:"update",path:_,indexs:[Number(G)],value:re,oldValue:ue,parentPath:_,parent:F});else{var Ce=[].concat(d()(_),[String(G)]);f.notify({type:"set",path:Ce,indexs:[],value:re,oldValue:ue,parentPath:_,parent:F})}return ie},deleteProperty:function(F,G){var re=F[G],Q=[].concat(d()(_),[String(G)]),ue=Reflect.deleteProperty(F,G);return ue&&G!==Xe&&f.notify({type:"delete",path:Q,indexs:[],value:re,oldValue:void 0,parentPath:_,parent:F}),ue}});return B.set(C,S),S}function bt(C,_){var B=new Map,E=new WeakMap;return rt(C,[],E,B,_)}var Ct=e(28633),Qe=e.n(Ct),Ot=e(75396),Bt=e.n(Ot),St=e(21206);function Pt(C){return C instanceof Error?C:new Error(C)}var ot=function(C){a()(B,C);var _=r()(B);function B(){var E;A()(this,B);for(var f=arguments.length,S=new Array(f),$=0;$<f;$++)S[$]=arguments[$];return E=_.call.apply(_,[this].concat(S)),t()(s()(E),"_isRunning",!1),t()(s()(E),"_defaultAbortController",null),t()(s()(E),"_userAbortController",void 0),t()(s()(E),"_firstRun",!1),E}return y()(B,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return g()(N()(B.prototype),"value",this)},set:function(f){Bt()(N()(B.prototype),"value",f,this,!0)}},{key:"running",get:function(){return this._isRunning}},{key:"onInitOptions",value:function(f){f.reentry||(f.reentry=this.store.options.reentry)}},{key:"onInitial",value:function(){var f=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(f.options.immediate===!0||f.options.immediate==="auto"&&f.options.initial===void 0)&&f.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var f=this;return Object.assign(t()(t()(t()(t()(t()(t()(t()(t()(t()({},ve,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",he(function(S){return f.store.computedObjects.run(f.id,Object.assign({},S))})),"cancel",he(function(){f.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(f){var S=this,$=this.strPath,F=Object.keys(f).length;if(this.associated)this.store.update(function(re){We(re,S.path,f)},{batch:F>1?$:!1});else{Object.assign(this.value,f);var G=F>1;Object.entries(f).forEach(function(re){var Q=Qe()(re,2),ue=Q[0],ie=Q[1],Ce={type:"set",path:[S.strPath,ue],value:ie,parent:S.value};G&&(Ce.reply=!0),S.store.operates.emit("".concat(S.strPath,".").concat(ue),Ce)}),G&&this.store.operates.emit($,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var E=R()(o()().mark(function S($){var F=this,G,re,Q,ue,ie;return o()().wrap(function(xe){for(;;)switch(xe.prev=xe.next){case 0:if(G=$!=null?$:{},re=G.first,!this.isDisable($==null?void 0:$.enable)){xe.next=4;break}return this.store.log(function(){return"Async computed <".concat(F.toString(),"> is disabled")},"warn"),xe.abrupt("return");case 4:if(this._firstRun=!0,!re&&this.store.log(function(){return"Run async computed for : ".concat(F.toString())}),Q=$?Object.assign({first:re},this.options,$):this.options,ue=ze(this,"computed",this.context,Q),ie=Q.reentry,!(this._isRunning&&!ie)){xe.next=13;break}return this.store.log(function(){return"Async computed: ".concat(F.toString()," is over maximum reentry count")},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),xe.abrupt("return");case 13:return this._isRunning=!0,xe.prev=14,xe.next=17,this.executeGetter(ue,Q);case 17:return xe.abrupt("return",xe.sent);case 18:return xe.prev=18,this._isRunning=!1,xe.finish(18);case 21:case"end":return xe.stop()}},S,this,[[14,,18,21]])}));function f(S){return E.apply(this,arguments)}return f}()},{key:"createComputeProgressbar",value:function(f){var S=this,$=Object.assign({},f),F=$.max,G=F===void 0?100:F,re=$.min,Q=re===void 0?0:re,ue=$.value,ie=ue===void 0?0:ue;return this.updateComputedValue({progress:ie}),{value:function(xe){xe>G&&(xe=G),xe<Q&&(xe=Q),S.updateComputedValue({progress:xe})},end:function(){this.value(G)}}}},{key:"getAbortController",value:function(f){if(f&&typeof f.abortController=="function"){var S=f.abortController();S&&S instanceof AbortController&&(this._userAbortController=S)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(f,S,$){var F=this,G=$.timeout,re=Array.isArray(G)?G:[G,0],Q=Qe()(re,2),ue=Q[0],ie=ue===void 0?0:ue,Ce=Q[1],xe=Ce===void 0?0:Ce,Se,Me;return ie>0&&(S.timeout=xe>1?xe:ie,Me=setTimeout(function(){f.hasTimeout=!0,f.hasError=!0,f.error="TIMEOUT",typeof f.timeoutCallback=="function"&&f.timeoutCallback(),clearInterval(Se),F.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},ie),xe>1&&(Se=setInterval(function(){F.updateComputedValue({timeout:xe--}),xe===0&&clearInterval(Se)},ie/(xe+1)))),{clear:function(){clearTimeout(Me),clearInterval(Se)},enable:ie>0}}},{key:"executeGetter",value:function(){var E=R()(o()().mark(function S($,F){var G,re,Q,ue,ie,Ce,xe,Se,Me,Oe,je,$e,Ke,Re,Ae,Te;return o()().wrap(function(Pe){for(;;)switch(Pe.prev=Pe.next){case 0:G=F.retry,re=G===void 0?[0,0]:G,Q=Array.isArray(re)?re:[Number(re),0],ue=Qe()(Q,2),ie=ue[0],Ce=ue[1],Se=this.getAbortController(F),Me={onTimeout:function(Ve){return xe=Ve},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(Ve){return Ve},cancel:Se.abort,extras:F.extras,operate:F.operate,first:F.first,abortSignal:Se.signal},Oe={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:xe},Se.signal.addEventListener("abort",function(){return Oe.hasAbort=!0}),je={clear:function(){},enable:!1},Ke=function(Ve){return Object.assign(Oe,Ve)},Re=0;case 9:if(!(Re<ie+1)){Pe.next=46;break}if(Ae={},Pe.prev=11,Te={loading:!0},Oe.hasError&&(Te.error=null),ie>0&&(Te.retry=Re>0?ie-Re+1:0),Re>0&&Ke({error:null,hasError:!1,hasTimeout:!1}),je=this.setTimeoutControl(Oe,Te,F),this.updateComputedValue(Te),!Oe.hasAbort){Pe.next=20;break}throw new j;case 20:return Pe.next=22,this.getter.call(this,$,Me);case 22:if($e=Pe.sent,!Oe.hasAbort){Pe.next=25;break}throw new j;case 25:Oe.hasTimeout||(Ae.value=$e,je.enable&&(Ae.timeout=0)),Pe.next=33;break;case 28:Pe.prev=28,Pe.t0=Pe.catch(11),Oe.hasError=!0,Oe.error=Pe.t0,Oe.hasTimeout||(Ae.error=Pt(Pe.t0).message);case 33:return Pe.prev=33,je.clear(),Re===ie&&(Oe.hasTimeout&&(Ae.error=Oe.error),ie>0&&(Ae.retry=0)),Ae.loading=!1,this.updateComputedValue(Ae),Pe.finish(33);case 39:if(!Oe.hasError){Pe.next=43;break}if(!(ie>0&&Ce>0&&Re<ie)){Pe.next=43;break}return Pe.next=43,(0,St.g)(Ce);case 43:Re++,Pe.next=9;break;case 46:Oe.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):Oe.hasError||Oe.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:Oe.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:$e,computedObject:this}),this.onDoneCallback(F,Oe.error,Oe.hasAbort,Oe.hasTimeout,$,$e);case 48:case"end":return Pe.stop()}},S,this,[[11,28,33,39]])}));function f(S,$){return E.apply(this,arguments)}return f}()},{key:"onDoneCallback",value:function(f,S,$,F,G,re){typeof f.onDone=="function"&&f.onDone.call(this,{id:this.id,path:this.path,value:re,error:S,abort:$,timeout:F,scope:G})}},{key:"onDependsChange",value:function(f){var S=this;this.store.log(function(){return"AsyncComputed<".concat(S.id,"> is running by depends ").concat(f.type,"/").concat(f.path.join(".")," operate ")}),this.run({operate:f,first:!this._firstRun})}},{key:"getValueWatchPath",value:function(){var f=this.path.join(de);return["".concat(f,".*"),f]}},{key:"getDepends",value:function(){var f=this,S=g()(N()(B.prototype),"getDepends",this).call(this);return S.map(function($){if($.length===0)return $;var F=p()(f.store.computedObjects.values()),G;try{for(F.s();!(G=F.n()).done;){var re=G.value;if(T(re.path,$)&&re.async)return["".concat($,".value")]}}catch(Q){F.e(Q)}finally{F.f()}return $})}}]),B}(Ye);function ut(){var C=arguments[0],_=typeof arguments[1]=="function"?arguments[1]:function(){return!0},B=W()(arguments[1])==="object"?arguments[1]:arguments[2],E=Object.assign({depends:[],enable:!0,objectify:!0,filter:_},B),f=function(){return{type:"watch",getter:C,options:E}};return f[te]=!0,f}var lt=function(C){a()(B,C);var _=r()(B);function B(E){var f;return A()(this,B),f=_.call(this),t()(s()(f),"_watcher",{off:function(){}}),t()(s()(f),"_enable",!0),f.store=E,f}return y()(B,[{key:"enable",get:function(){return this._enable},set:function(f){this._enable=f}},{key:"set",value:function(f,S){return g()(N()(B.prototype),"size",this)===0&&this.createWacher(),g()(N()(B.prototype),"set",this).call(this,f,S)}},{key:"createWacher",value:function(){var f=this;this._watcher=this.store.watch("**",function(S){var $=S.path;if(f._enable){var F=fe(f.store.state,$),G=p()(f.values()),re;try{for(G.s();!(re=G.n()).done;){var Q=re.value;Q.isMatched($,F)&&Q.run($,F)}}catch(ue){G.e(ue)}finally{G.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off(),this.createWacher()}},{key:"create",value:function(f,S,$){var F=ut(f,S,$),G=F();return this.store._createWatch(G)}},{key:"enableGroup",value:function(f){var S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,$=p()(this.values()),F;try{for($.s();!(F=$.n()).done;){var G=F.value;G.options.group===f&&(G.options.enable=S)}}catch(re){$.e(re)}finally{$.f()}}}]),B}(M()(Map)),dt=function(C){a()(B,C);var _=r()(B);function B(E,f,S){var $;if(A()(this,B),$=_.call(this,E,f,S),t()(s()($),"_cache",void 0),$.store=E,$.context=S,typeof $.options.filter!="function")throw new Error("watch options.filter must be a function");return $}return y()(B,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(f,S){return Ie(f,this.path)?!1:this.filter(f,S)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(f,S){if(!this.enable){this.store.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var $,F=($=this.getter)===null||$===void 0?void 0:$.call(this,{path:f,value:S},this);this.value=F,this.emitStoreEvent("watch:done",{value:F,watchObject:this})}catch(G){this.emitStoreEvent("watch:error",{error:G,watchObject:this})}}}]),B}(He),st=de;function ct(C,_){if(!_||_==="**")return!0;var B=C.split(st),E=_.split(st);if(B.length!==E.length)return!1;for(var f=0;f<E.length;f++)if(E[f]!=="*"&&E[f]!==B[f])return!1;return!0}var qe=function(){function C(){A()(this,C),t()(this,"_listeners",new Map)}return y()(C,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var B=this,E=arguments[0],f=arguments[1],S=arguments[2],$=f;return E==="**"?this.addHandler("*",$,S):String(E).includes("*")?($=function(G,re){ct(re,E)&&f(G,re)},this.addHandler("*",$,S)):this.addHandler(E,$,S),{off:function(){return B.off(E,$)}}}},{key:"addHandler",value:function(B,E,f){var S=this._listeners.get(B);S?f?S.unshift(E):S.push(E):this._listeners.set(B,[E])}},{key:"once",value:function(B,E){var f=this,S=function $(F,G){try{E(F,G)}finally{f.off(G,$)}};return this.on(B,S)}},{key:"off",value:function(B,E){String(B).includes("*")&&(B="*");var f=this._listeners.get(B);f&&(E?f.splice(f.indexOf(E)>>>0,1):this._listeners.set(B,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(B){return this.on("**",B)}},{key:"wait",value:function(){var B=this,E=W()(arguments[0]),f=E==="string"?arguments[0]:void 0,S=arguments[1]||0,$=E==="function"?E:void 0,F;return new Promise(function(G,re){var Q;f?Q=B.once(f,function(ue){clearTimeout(F),G(ue)}):typeof $=="function"&&(Q=B.onAny(function(ue,ie){var Ce=$(ie,ue);Ce!==!1&&(Q.off(),clearTimeout(F),G(ue))})),S>0&&(F=setTimeout(function(){Q.off(),re(new Error("timeout"))},S))})}},{key:"emit",value:function(B,E){var f=this._listeners.get("*");f&&f.slice().map(function(S){S(E,B)}),f=this._listeners.get(B),f&&f.slice().map(function(S){S(E,B)})}}]),C}();function Nt(C){var _;return ce(C)?_=C():typeof C=="function"&&(_={type:"computed",getter:C,options:Object.assign({},De(),{async:_e(C)})}),_}var At=function(C){a()(B,C);var _=r()(B);function B(E,f){var S;return A()(this,B),S=_.call(this),t()(s()(S),"_data",void 0),t()(s()(S),"computedObjects",void 0),t()(s()(S),"watchObjects",void 0),t()(s()(S),"_operates",new qe),t()(s()(S),"_options",void 0),t()(s()(S),"_silenting",!1),t()(s()(S),"_batching",!1),t()(s()(S),"_batchOperates",[]),t()(s()(S),"_peeping",!1),S._options=(0,_t.w)({id:Be(),debug:!1,lazy:!1,enableComputed:!0,reentry:!0,log:gt},f),S.computedObjects=new at(s()(S)),S.watchObjects=new lt(s()(S)),S.subscribeCallbacks(),S._data=bt(E,{notify:S._notify.bind(s()(S)),createComputedObject:S.createObserverObject.bind(s()(S))}),S.getSnap=S.getSnap.bind(s()(S)),S.watch=S.watch.bind(s()(S)),S.update=S.update.bind(s()(S)),S.peep=S.peep.bind(s()(S)),S.silentUpdate=S.silentUpdate.bind(s()(S)),S.batchUpdate=S.batchUpdate.bind(s()(S)),S.collectDependencies=S.collectDependencies.bind(s()(S)),S.trace=S.trace.bind(s()(S)),S.installExtends(),S._options.lazy||tt(S._data),S._options.debug&&W()(globalThis.__AUTOSTORE_DEVTOOLS__)==="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(s()(S)),S.emit("load",s()(S)),S}return y()(B,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(f,S){this._options.debug&&this.options.log.call(this,f,S)}},{key:"installExtends",value:function(){var f=this,S=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(S)&&S.forEach(function($){return typeof $=="function"&&$(f)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(f){this._peeping&&f.type==="get"||(this._batching&&this._batchOperates.push(f),!this._silenting&&this.operates.emit(f.path.join(de),f))}},{key:"watch",value:function(){var f=this,S=typeof arguments[0]=="function"||arguments[0]==="*",$=S?arguments[0]:arguments[1],F=function(Ae,Te){return function(Fe){if(Ae!=="*"){if(Ae==="write"){if(Fe.type==="get")return}else if(Ae==="read"){if(Fe.type!=="get")return}else if(Array.isArray(Ae)&&Ae.length>0&&!Ae.includes(Fe.type))return}if(!(typeof Te=="function"&&!Te(Fe)))try{f._peeping=!0,$(Fe)}finally{f._peeping=!1}}};if(S){var G=Object.assign({once:!1,operates:"write"},arguments[1]),re=G.operates,Q=G.filter,ue=F(re,Q);return this.operates.onAny(ue)}else{var ie=arguments[0],Ce=Array.isArray(ie)?ie.map(function(Re){return typeof Re=="string"?Re:Re.join(de)}):[ie],xe=Object.assign({once:!1,operates:"write"},arguments[2]),Se=xe.once,Me=xe.operates,Oe=xe.filter,je=Se?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),$e=[],Ke=F(Me,Oe);return Ce.forEach(function(Re){$e.push(je.call(f,Re,Ke))}),{off:function(){return $e.forEach(function(Ae){return Ae.off()})}}}}},{key:"createObserverObject",value:function(f,S,$,F){var G=Nt(S),re={path:f,value:S,parentPath:$,parent:F};if(G){if(G.type==="computed"){var Q=this._createComputed(G,re);return Q==null?void 0:Q.initial}else if(G.type==="watch"){var ue=this._createWatch(G,re);return ue==null?void 0:ue.initial}}else return S}},{key:"_createComputed",value:function(f,S){var $;return f.options.async?$=new ot(this,f,S):$=new nt(this,f,S),$&&($.silentUpdate($.initial),$.options.objectify&&this.computedObjects.set($.id,$),this.emit("computed:created",$)),$}},{key:"_createWatch",value:function(f,S){var $=new dt(this,f,S);return f.options.objectify&&this.watchObjects.set($.id,$),this.emit("watch:created",$),$}},{key:"silentUpdate",value:function(f){this.update(f,{silent:!0})}},{key:"batchUpdate",value:function(f){this.update(f,{batch:!0})}},{key:"update",value:function(f,S){var $=this,F=Object.assign({},S),G=F.batch,re=G===void 0?!1:G,Q=F.reply,ue=Q===void 0?!0:Q,ie=F.silent,Ce=ie===void 0?!1:ie,xe=F.peep,Se=xe===void 0?!1:xe;if(typeof f=="function"){Ce&&(this._silenting=!0),re&&(this._batching=!0,this._silenting=!0),Se&&(this._peeping=!0);try{var Me=f(this.state);if(re&&se(Me))throw new Error("Batch update method can't be async function")}finally{if(this._silenting=!1,this._batching=!1,this._peeping=!1,this._batchOperates.length>0){var Oe=d()(this._batchOperates);this._batchOperates=[],ue&&Oe.forEach(function($e){$e.reply=!0,$._notify($e)});try{var je=re===!0?Ee:String(re);this.operates.emit(je,{type:"batch",path:[je],value:Oe})}finally{this._batchOperates=[]}}}}else throw new Error("update method must provide a function argument")}},{key:"peep",value:function(){var f=arguments,S=this,$=typeof arguments[0]=="function"?function(){return f[0](S.state)}:function(){return fe(S.state,Array.isArray(f[0])?f[0]:f[0].split(de))};this._peeping=!0;try{return $()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(f){var S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",$=[],F=this.watch(function(G){$.push(G.path)},{operates:S});try{f()}finally{F.off()}return Je($)}},{key:"trace",value:function(f){var S=this,$=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",F;return{stop:function(){return F&&F.off()},start:function(){var G=R()(o()().mark(function Q(ue){var ie;return o()().wrap(function(xe){for(;;)switch(xe.prev=xe.next){case 0:return ie=[],xe.abrupt("return",new Promise(function(Se){F=S.watch(function(Me){ie.push(Me),ue&&ue(Me)&&(F.off(),Se(ie))},{operates:$}),Promise.resolve(f()).finally(function(){typeof ue!="function"&&(F.off(),Se(ie))})}));case 2:case"end":return xe.stop()}},Q)}));function re(Q){return G.apply(this,arguments)}return re}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(f){var S=Object.assign({reserveAsync:!0},f),$=S.reserveAsync,F=S.entry;return Ge(F?fe(this._data,F):this._data,$)}}]),B}(qe)},11933:function(ee,m,e){"use strict";e.r(m);var U=e(86714),o=e.n(U),k={};for(var R in U)R!=="default"&&(k[R]=function(b){return U[b]}.bind(0,R));e.d(m,k)},86714:function(){},77283:function(ee,m,e){"use strict";e.d(m,{o:function(){return k}});var U=e(35170),o=e(92379);function k(R,b){var d=(0,o.useRef)();return d.current||(d.current=new U.n(R,b)),d.current}},44970:function(ee,m,e){"use strict";e.r(m),e.d(m,{ASYNC_COMPUTED_VALUE:function(){return d.eg},AbortError:function(){return d._L},AsyncComputedObject:function(){return d.WE},AutoStore:function(){return d.M1},AutoStoreError:function(){return d.CD},BATCH_UPDATE_EVENT:function(){return d.up},ComputedObject:function(){return d.Xr},ComputedObjects:function(){return d.BG},CyleDependError:function(){return d.e2},EventEmitter:function(){return d.vp},InvalidComputedArgumentsError:function(){return d.FM},InvalidDependsError:function(){return d.y1},InvalidScopeError:function(){return d.MI},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return d.Q6},OBSERVER_DESCRIPTOR_FLAG:function(){return d.kF},ObserverObject:function(){return d.Rn},ObserverScopeRef:function(){return d.fR},PATH_DELIMITER:function(){return d.f7},ReactAutoStore:function(){return U.n},SKIP_PROXY_FLAG:function(){return d.QI},SyncComputedObject:function(){return d.X3},TimeoutError:function(){return d.W5},WatchObject:function(){return d.RY},WatchObjects:function(){return d.LG},calcDependPaths:function(){return d.Rh},computed:function(){return d.Fl},createStore:function(){return U.M},defineExtend:function(){return d.Ws},delay:function(){return d.gw},forEachObject:function(){return d.b0},getComputedId:function(){return d.tl},getDepends:function(){return d.if},getId:function(){return d.zv},getMapVal:function(){return d.ux},getSnap:function(){return d.kM},getSnapshot:function(){return d.vM},getVal:function(){return d.Jy},isAbsolutePath:function(){return d.O5},isAsyncComputedValue:function(){return d.Jq},isEq:function(){return d.vo},isEventMatched:function(){return d.c6},isMap:function(){return d._N},isObserverDescriptor:function(){return d.iI},isObserverDescriptorBuilder:function(){return d.vb},isPathEq:function(){return d.PH},isPathMatched:function(){return d.J_},isPlainObject:function(){return d.PO},isPrimitive:function(){return d.pt},isPromise:function(){return d.tI},isProxy:function(){return d.RM},isRaw:function(){return d._R},joinValuePath:function(){return d.UQ},markRaw:function(){return d.Xl},noRepeat:function(){return d.DH},normalizeDeps:function(){return d.KZ},pathIsExists:function(){return d.Ql},pathStartsWith:function(){return d.ZW},setVal:function(){return d.Y6},updateObjectVal:function(){return d.EG},useStore:function(){return b.o},watch:function(){return d.YP}});var U=e(35170),o=e(11933),k={};for(var R in o)["default","ReactAutoStore","createStore"].indexOf(R)<0&&(k[R]=function(D){return o[D]}.bind(0,R));e.d(m,k);var b=e(77283),d=e(99640)},35170:function(ee,m,e){"use strict";e.d(m,{n:function(){return ye},M:function(){return De}});var U=e(6270),o=e.n(U),k=e(93949),R=e.n(k),b=e(28810),d=e.n(b),D=e(77701),W=e.n(D),u=e(28249),A=e.n(u),v=e(29861),y=e.n(v),i=e(99640),s=e(12027),l=e.n(s),a=e(24325),n=e.n(a),r=e(28633),c=e.n(r),t=e(92379);function I(X,J,q,me){if(!J)return X.state;var Ie;try{typeof J=="function"?Ie=J(X.state):Array.isArray(J)?Ie=(0,i.Jy)(X.state,J):Ie=(0,i.Jy)(X.state,J.split(i.f7)),q&&(0,i.Jq)(Ie)&&(Ie=Ie.value)}catch(z){if(me)return me(z)}return Ie}function p(X){return function(){var J=arguments,q=J.length>=1&&(Array.isArray(J[0])||typeof J[0]=="string"||typeof J[0]=="function")?J[0]:void 0,me=J.length===2&&typeof J[1]=="function"?J[1]:void 0,Ie=J.length===2&&(typeof q=="string"||Array.isArray(q))&&typeof J[1]=="boolean"?J[1]:!1,z=(0,t.useState)(function(){return I(X,q,Ie!==!0)}),T=c()(z,2),oe=T[0],le=T[1],ae=X.useDeps(q,Ie===!0?"all":"value");(0,t.useEffect)(function(){var ce;return ae.length===0?ce=X.watch(function(){le(n()({},X.state))}):ce=X.watch(ae,function(){var ne=I(X,q);le((0,i.PO)(ne)?n()({},ne):Array.isArray(ne)?l()(ne):ne)}),function(){return ce.off()}},[ae]);var se=(0,t.useCallback)(function(ce){q?typeof q=="string"?X.update(function(ne){return(0,i.Y6)(ne,q.split(i.f7),ce)}):Array.isArray(q)?X.update(function(ne){return(0,i.Y6)(ne,q,ce)}):typeof q=="function"&&me&&X.update(function(ne){return me(ce,ne)}):typeof ce=="function"&&X.update(function(ne){return ce(ne)},{batch:!0})},[q]);return[oe,se]}}function O(X){return function(J){var q=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",me=(0,t.useState)(function(){return(0,i.if)(J,X,q)}),Ie=c()(me,1),z=Ie[0];return z}}var g=e(651);function x(X,J,q){var me=q.errorBoundary||X.options.signalErrorBoundary;return t.memo(function(){var Ie=X.useDeps(J),z=(0,t.useState)(null),T=c()(z,2),oe=T[0],le=T[1],ae=(0,t.useState)(function(){return I(X,J,!0,le)}),se=c()(ae,2),ce=se[0],ne=se[1];return(0,t.useEffect)(function(){var pe=X.watch(Ie,function(){ne(I(X,J,!0,le))});return function(){return pe.off()}},[Ie]),(0,g.jsx)(g.Fragment,{children:oe?(0,g.jsx)(me,{error:oe}):String(ce)})},function(){return!0})}function N(X,J,q,me){var Ie=me.errorBoundary||X.options.signalErrorBoundary;return t.memo(function(){var z=(0,t.useState)(null),T=c()(z,2),oe=T[0],le=T[1],ae=(0,t.useState)(function(){return I(X,q,!1,le)}),se=c()(ae,2),ce=se[0],ne=se[1],pe=(0,i.Jq)(ce),fe=(0,t.useMemo)(function(){return pe?ce:{value:ce}},[ce]),he=X.useDeps(q,"none");return(0,t.useEffect)(function(){var ge=pe?"".concat(Array.isArray(q)?q.join(i.f7):q,".*"):he,be=X.watch(ge,function(Be){var Ne=Be.path,Le=Be.value;ne(pe?n()(n()({},ce),{},y()({},Ne[Ne.length-1],Le)):I(X,q,!1,le))});return function(){return be.off()}},[he]),(0,g.jsx)(g.Fragment,{children:oe?(0,g.jsx)(Ie,{error:oe}):J(fe)})},function(){return!0})}function h(X,J,q,me){var Ie=me.errorBoundary||X.options.signalErrorBoundary;return t.memo(function(){var z=(0,t.useState)(null),T=c()(z,2),oe=T[0],le=T[1],ae=(0,i.vb)(q)?q():q,se=(0,t.useState)(function(){try{if((0,i.iI)(ae)){if(ae.options.objectify=!1,ae.type==="computed")return X.computedObjects.create(ae);if(ae.type==="watch")return X.watchObjects.create(ae)}else{var be=(0,i.Fl)(ae),Be=be();return Be.options.objectify=!1,X.computedObjects.create(Be)}}catch(Ne){return le(Ne),null}}),ce=c()(se,1),ne=ce[0],pe=(0,t.useState)(function(){return ne?ne.async?ne.value:{value:ne.value}:{value:""}}),fe=c()(pe,2),he=fe[0],ge=fe[1];return(0,t.useEffect)(function(){var be={off:function(){}};return ne&&(be=ne.watch(function(Be){if(!Be.reply)try{if(ne.type==="computed")if(ne.async){var Ne=ne;((0,i.PH)(Be.path,Ne.path)||(0,i.PH)(Be.path.slice(0,-1),Ne.path))&&ge(n()({},Ne.value))}else ge({value:ne.value});else ne.type==="watch"&&ge({value:ne.value})}catch(Le){le(Le)}},{operates:"write"})),function(){return be.off()}},[ae]),(0,g.jsx)(g.Fragment,{children:oe?(0,g.jsx)(Ie,{error:oe}):J(he)})},function(){return!0})}function M(X){return function(){var J=arguments,q=J.length>=1&&(typeof J[0]=="string"||typeof J[0]=="function")&&(!J[1]||(0,i.PO)(J[1]))?J[0]:void 0,me=J.length>=2&&typeof J[0]=="function"&&(typeof J[1]=="string"||Array.isArray(J[1])||typeof J[1]=="function")?J[0]:void 0,Ie=J.length>=2&&typeof J[1]=="function"?J[1]:void 0,z=J.length>=2&&typeof J[0]=="function"&&(typeof J[1]=="string"||Array.isArray(J[1]))?J[1]:void 0,T=Object.assign({},J.length>1&&(0,i.PO)(J[J.length-1])?J[J.length-1]:void 0),oe=q?x(X,q,T):z?N(X,me,z,T):Ie?h(X,me,Ie,T):function(){return(0,g.jsx)(g.Fragment,{})};return(0,g.jsx)(oe,{})}}function P(X){var J=X;if(X){X.persist&&X.persist();var q=X.currentTarget;q&&X.type?q.tagName==="INPUT"&&q.type==="checkbox"?J=q.checked:J=q.value:X.nativeEvent&&X.target&&(J=X.target.value)}return J}function j(X){return function(){var J=arguments,q=J.length>=1&&typeof J[0]=="string"?J[0]:void 0;if(!q)throw new Error("Input bind must have at least one argument");var me={};return me.onChange=function(Ie){var z=P(Ie);(0,i.Y6)(X.state,q.split(i.f7),z)},me}}function K(X){return function(){var J=arguments,q=J.length>=1?Array.isArray(J[0])?J[0]:typeof J[0]=="string"?J[0].split(i.f7):void 0:void 0,me=J.length>=2&&typeof J[0]=="function"?J[0]:void 0,Ie=J.length>=2&&typeof J[1]=="function"?J[1]:void 0,z=(0,t.useCallback)(function(ne,pe){return{value:pe,onChange:function(he){var ge=P(he);ne?X.update(function(be){return(0,i.Y6)(be,Array.isArray(ne)?ne:ne.split(i.f7),ge)}):Ie(ge,X.state)}}},[]),T=(0,t.useCallback)(function(ne,pe){var fe={};return Object.entries(pe).forEach(function(he){var ge=c()(he,2),be=ge[0],Be=ge[1];if((0,i.pt)(Be)){var Ne=ne?[].concat(l()(ne),[be]):[be];fe[be]=z(Ne,Be)}}),fe},[]),oe=(0,t.useState)(function(){if(typeof me=="function")return z(void 0,me(X.state));var ne=q?I(X,q,!0):X.state;if((0,i.PO)(ne))return T(q,ne);if(typeof q=="string")return z(q,ne);if(Array.isArray(q))return z(q.join(i.f7),ne)}),le=c()(oe,2),ae=le[0],se=le[1],ce=X.useDeps(q||me);return(0,t.useEffect)(function(){var ne;if(ce.length===0||J.length===0)ne=X.watch(function(he){var ge=he.path,be=he.value;ge.length===1&&(0,i.pt)(be)&&se(n()(n()({},ae),{},y()({},ge[0],z(ge[0],be))))});else if(ce.length>0){var pe=q?I(X,q,!0):void 0,fe=(0,i.PO)(pe);q&&fe&&ce.length===1&&ce[0].push("*"),ne=X.watch(ce,function(he){var ge=he.path,be=he.value;if(typeof me=="function"){var Be=me(X.state);se(z(void 0,Be))}else se(fe?n()(n()({},ae),{},y()({},ge[ge.length-1],z(ge,be))):z(ge,be))})}return function(){return ne.off()}},[ce]),ae}}function L(X){var J=arguments;return function(){var q=J[0],me=J[1],Ie=J[2];(0,t.useEffect)(function(){var z=X.watch(q,me,Ie);return function(){return z.off()}},[])}}var Z=e(34180),w=e.n(Z),V=Symbol("FAKE_BINDINGS");function Y(X,J){var q={};return J instanceof Map?J.forEach(function(me,Ie){q[Ie]=V}):Object.entries(J).forEach(function(me){var Ie=c()(me,1),z=Ie[0];q[z]=V}),q}function te(X,J,q){return{value:q,onChange:function(Ie){var z=P(Ie);X.update(function(T){return(0,i.Y6)(T,J,z)})}}}function H(X,J,q,me,Ie){if(w()(X)!=="object"||X===null)return X;var z=J.length===0?"__ROOT__":J.join(".");if(q.has(z))return q.get(z);var T=X;(Array.isArray(X)||(0,i.PO)(X))&&(T=Y(me,X));var oe=new Proxy(T,{get:function(ae,se,ce){if(typeof se!="string")return Reflect.get(ae,se,ce);var ne=[].concat(l()(Ie),l()(J),[String(se)]),pe=(0,i.Jy)(me.state,ne);return(0,i.pt)(pe)?te(me,ne,pe):(0,i.Jq)(pe)?te(me,[].concat(l()(ne),["value"]),pe):H(pe,ne,q,me,Ie)}});return q.set(z,oe),oe}function de(X,J){var q=new Map;return H({},[],q,X,J)}function Ee(X){return function(){var J=arguments,q=J.length>0?typeof J[0]=="string"?J[0].split(i.f7):Array.isArray(J[0])?J[0]:[]:[],me=(0,t.useState)(function(){return X.getSnap({entry:q})}),Ie=c()(me,2),z=Ie[0],T=Ie[1],oe=(0,t.useState)(function(){return de(X,q)}),le=c()(oe,1),ae=le[0];return(0,t.useSyncExternalStore)(function(se){var ce=X.watch(function(ne){var pe=ne.path,fe=ne.value;if((0,i.ZW)(q,pe)){var he=pe.slice(q.length);(0,i.Y6)(z,he,fe),(0,i.Y6)(ae,[].concat(l()(he),["value"]),fe),T(n()({},z)),se()}});return function(){ce.off()}},function(){return z}),ae}}var ve=Symbol("empty");function _e(X){var J=arguments;return function(){var q=J,me=q.length>0?typeof q[0]=="string"?q[0].split(i.f7):Array.isArray(q[0])?q[0]:[]:[],Ie=q.length>1?q[1]:{},z=(0,t.useRef)(!1),T=(0,t.useRef)(),oe=(0,t.useRef)(null);return(0,t.useEffect)(function(){var le=oe.current;if(le){if(!z.current&&le){var ae=X.getSnap({entry:me});T.current=new Map;var se=le.querySelectorAll("input,textarea,select");se.forEach(function(pe){var fe=pe.name;if(fe){var he=[].concat(l()(me),l()(fe.split(i.f7))),ge=(0,i.Jy)(ae,he,ve);ge!==ve&&(pe.value=ge),T.current.set(he.join(i.f7),pe)}}),z.current=!0}var ce=X.watch(function(pe){var fe=pe.path,he=pe.value;if((0,i.ZW)(me,fe)){var ge=fe.join(i.f7);if(T.current.has(ge)){var be=T.current.get(ge).value;be!==he&&(T.current.get(ge).value=he)}}}),ne=function(fe){var he=fe.target,ge=he.name;if(ge){var be=[].concat(l()(me),l()(ge.split(i.f7))),Be=he.type==="checkbox"?he.checked:he.value;X.update(function(Ne){(0,i.Y6)(Ne,be,Be)},{peep:!0})}};return le.addEventListener("input",ne),function(){ce.off(),le.removeEventListener("input",ne)}}},[me]),{ref:oe}}}var ye=function(X){W()(q,X);var J=A()(q);function q(me,Ie){var z;return R()(this,q),z=J.call(this,me,Object.assign({signalErrorBoundary:function(){return(0,g.jsx)(g.Fragment,{children:"ERROR"})}},Ie)),y()(d()(z),"useState",void 0),y()(d()(z),"useAsyncState",void 0),y()(d()(z),"useDeps",void 0),y()(d()(z),"$",void 0),y()(d()(z),"signal",void 0),y()(d()(z),"bind",void 0),y()(d()(z),"useInput",void 0),y()(d()(z),"useWatch",void 0),y()(d()(z),"useBindings",void 0),y()(d()(z),"useForm",void 0),z.signal=z.$=M(d()(z)).bind(d()(z)),z.useState=p(d()(z)).bind(d()(z)),z.useAsyncState=function(T){return z.useState(T,!0)[0]},z.useDeps=O(d()(z)).bind(d()(z)),z.useInput=K(d()(z)).bind(d()(z)),z.bind=j(d()(z)).bind(d()(z)),z.useWatch=L(d()(z)).bind(d()(z)),z.useBindings=Ee(d()(z)).bind(d()(z)),z.useForm=_e(d()(z)).bind(d()(z)),z}return o()(q)}(i.M1);function De(X,J){return new ye(X,J)}},60358:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(77643);const o=[]},19962:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(61668);const o=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},63611:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(28627);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
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
`,paraId:18,tocIndex:3},{value:"\u66F4\u591A\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:19,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:20,tocIndex:3},{value:"\u3002",paraId:19,tocIndex:3}]},58524:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(46267);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
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
`,paraId:58,tocIndex:16}]},77614:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(25231);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
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
`,paraId:21,tocIndex:7},{value:"\u4F7F\u7528",paraId:22,tocIndex:7},{value:"computed",paraId:22,tocIndex:7},{value:"\u53EF\u4EE5\u8FDB\u884C\u66F4\u591A\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982",paraId:22,tocIndex:7},{value:"options",paraId:22,tocIndex:7},{value:"\u7B49\u3002",paraId:22,tocIndex:7},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:23,tocIndex:8},{value:"\uFF1A",paraId:23,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"PARENT",paraId:24,tocIndex:8},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:24,tocIndex:8},{value:"associated=true",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:24,tocIndex:8},{value:"obj.value",paraId:24,tocIndex:8},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:24,tocIndex:8},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:25,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:26,tocIndex:8},{value:"\u4F7F\u7528",paraId:27},{value:"computed(<getter>,<depends>,<options>)",paraId:27},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:27},{value:"getter",paraId:28},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:28},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:29},{value:"depends",paraId:28},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:28},{value:"\u4F9D\u8D56",paraId:30},{value:"options",paraId:28},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:28},{value:"\u9009\u9879",paraId:31}]},68258:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(83717);const o=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
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
`,paraId:30,tocIndex:6},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:31,tocIndex:6},{value:"./price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"./count",paraId:31,tocIndex:6},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:31,tocIndex:6},{value:"price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"count",paraId:31,tocIndex:6},{value:"\u5C5E\u6027\u3002",paraId:31,tocIndex:6},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:31,tocIndex:6},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:31,tocIndex:6}]},94957:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(76938);const o=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},15467:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(87480);const o=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"store.computedObjects",paraId:0,tocIndex:0},{value:"\u6765\u7BA1\u7406",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A",paraId:1,tocIndex:0},{value:"Map",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u662F\u4E00\u4E2A\u7C7B\uFF0C\u67E5\u770BAPI\u6587\u6863\u53EF\u4EE5\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\u3002",paraId:3}]},33989:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(15968);const o=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u652F\u6301",paraId:0,tocIndex:0},{value:"ComputedOptions",paraId:0,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u53C2\u6570\u6765\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`// \u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
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
`,paraId:48,tocIndex:14},{value:"\u7C7B\u578B",paraId:49,tocIndex:15},{value:"\uFF1A",paraId:49,tocIndex:15},{value:"(error:Error)=>void",paraId:49,tocIndex:15},{value:"\u5F53\u6267\u884C\u8BA1\u7B97",paraId:50,tocIndex:15},{value:"getter",paraId:50,tocIndex:15},{value:"\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03",paraId:50,tocIndex:15},{value:"\u7C7B\u578B",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:"(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void",paraId:51,tocIndex:16},{value:"\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u5B8C\u6210\u65F6\u7684\u56DE\u8C03",paraId:52,tocIndex:16}]},51289:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(49613);const o=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:0,tocIndex:0},{value:"\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:1,tocIndex:0},{value:"ComputedObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:0},{value:"ComputedObject",paraId:2,tocIndex:0},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:2,tocIndex:0},{value:"store.computedObjects",paraId:2,tocIndex:0},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:2,tocIndex:0},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"store.computedObjects.get(<id>).run()",paraId:3,tocIndex:1},{value:"\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:`import { createStore,computed } from '@autostorejs/react';
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
\u5F53\u4F7F\u7528`,paraId:11,tocIndex:3},{value:"computed",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"group",paraId:11,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:11,tocIndex:3},{value:"computed",paraId:12,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"enable",paraId:12,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:12,tocIndex:4},{value:"enable=false",paraId:12,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:12,tocIndex:4},{value:"enable=true",paraId:12,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:13,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:14,tocIndex:4},{value:"enable",paraId:14,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:14,tocIndex:4}]},48248:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(87975);const o=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
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
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},92205:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(48120);const o=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
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
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},80233:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(89004);const o=[{value:`\u5728\u590D\u6742\u7684\u72B6\u6001\u4E2D\uFF0C\u6709\u65F6\u4F1A\u4E0D\u7ECF\u610F\u95F4\u4F1A\u4EA7\u751F\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u8FD9\u662F\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u4E2D\u7684\u4E00\u4E2A\u5E38\u89C1\u95EE\u9898\u3002
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
`,paraId:10,tocIndex:6},{value:"return 'disable'",paraId:11,tocIndex:6},{value:"\uFF1A \u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:11,tocIndex:6},{value:"return 'ignore'",paraId:11,tocIndex:6},{value:":  \u4EE3\u8868\u5FFD\u7565",paraId:11,tocIndex:6},{value:"\u5176\u4ED6\u4F1A\u89E6\u53D1\u9519\u8BEF",paraId:11,tocIndex:6},{value:"installCycleDetectExtend",paraId:12,tocIndex:7},{value:"\u5177\u6709\u4EE5\u4E0B\u914D\u7F6E\u53C2\u6570\uFF1A",paraId:12,tocIndex:7},{value:"\u53C2\u6570",paraId:13,tocIndex:7},{value:"\u7C7B\u578B",paraId:13,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:13,tocIndex:7},{value:"\u8BF4\u660E",paraId:13,tocIndex:7},{value:"maxOperates",paraId:13,tocIndex:7},{value:"number",paraId:13,tocIndex:7},{value:"200",paraId:13,tocIndex:7},{value:"\u6700\u5927\u64CD\u4F5C\u6570\uFF0C\u4ECE\u5F00\u59CB\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u540E\uFF0C\u5F53\u6536\u96C6\u5230\u6B64\u6570\u91CF\u7684\u64CD\u4F5C\u4E8B\u4EF6\u540E\u5F00\u5982\u5206\u6790\u3002",paraId:13,tocIndex:7},{value:"onDetected",paraId:13,tocIndex:7},{value:"(paths:string)=>'disable' | 'ignore' | void",paraId:13,tocIndex:7},{value:"-",paraId:13,tocIndex:7},{value:"\u5F53\u68C0\u6D4B\u5230\u5FAA\u73AF\u4F9D\u8D56\u65F6\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"disable",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"ignore",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u5FFD\u7565,\u5176\u4ED6\u89E6\u53D1\u9519\u8BEF\u3002",paraId:13,tocIndex:7}]},35603:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(93359);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u9996\u5148\u9700\u8981\u5B89\u88C5",paraId:1,tocIndex:2},{value:"@autostorejs/devtools",paraId:1,tocIndex:2},{value:"\u548C",paraId:1,tocIndex:2},{value:"Redux DevTools Extension",paraId:1,tocIndex:2},{value:"\u3002",paraId:1,tocIndex:2},{value:`npm install  @autostorejs/devtools
`,paraId:2},{value:`yarn add @autostorejs/devtools
`,paraId:3},{value:`pnpm add @autostorejs/devtools
`,paraId:4},{value:"\u5728\u4F60\u7684\u9879\u76EE\u7684\u6700\u5F00\u59CB\u5904\u5BFC\u5165",paraId:5,tocIndex:3},{value:"@autostorejs/devtools",paraId:5,tocIndex:3},{value:"\u3002",paraId:5,tocIndex:3},{value:`//main.ts | app.ts | index.ts

import \`@autostorejs/devtools\`

`,paraId:6,tocIndex:3},{value:"\u7136\u540E\u5728\u521B\u5EFA",paraId:7,tocIndex:3},{value:"AutoStore",paraId:7,tocIndex:3},{value:"\u65F6,\u6307\u5B9A",paraId:7,tocIndex:3},{value:"debug=true",paraId:7,tocIndex:3},{value:"\u542F\u7528",paraId:8},{value:"debug=true",paraId:8},{value:"\u540E\uFF0C",paraId:8},{value:"AutoStore",paraId:8},{value:"\u4F1A\u81EA\u52A8\u8FDE\u63A5\u5230",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u3002",paraId:8},{value:"\u6BCF\u4E2A",paraId:8},{value:"Store",paraId:8},{value:"\u5747\u5177\u6709\u4E00\u4E2A",paraId:8},{value:"id",paraId:8},{value:"\uFF0C\u5982\u679C\u6CA1\u6709\u4F20\u5165\u5219\u4F1A\u968F\u673A\u751F\u6210\u3002\u5728\u4F7F\u7528",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A",paraId:8},{value:"store",paraId:8},{value:"\u53D6\u4E2A\u6709\u610F\u4E49\u7684\u540D\u79F0\u3002",paraId:8},{value:"\u73B0\u5728\uFF0C\u4F60\u53EF\u4EE5\u6253\u5F00",paraId:9,tocIndex:4},{value:"Redux DevTools Extension",paraId:9,tocIndex:4},{value:"\u67E5\u770B",paraId:9,tocIndex:4},{value:"AutoStore",paraId:9,tocIndex:4},{value:"\u7684\u72B6\u6001\u4E86\u3002",paraId:9,tocIndex:4},{value:"\u5355\u51FB\u4EE5\u4E0A\u793A\u4F8B\u4E2D\u7684",paraId:10},{value:"Age++",paraId:10},{value:"\u548C",paraId:10},{value:"Change lastName",paraId:10},{value:"\u6309\u94AE\uFF0C\u7136\u540E\u67E5\u770B",paraId:10},{value:"Redux DevTools Extension",paraId:10},{value:"\u4E2D\u7684\u72B6\u6001\u53D8\u5316\u3002",paraId:10},{value:"\u5728\u63A7\u5236\u53F0\u4F60\u8FD8\u53EF\u4EE5\u770B\u5230\u66F4\u591A\u7684\u8C03\u8BD5\u4FE1\u606F\u3002",paraId:10}]},37797:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(6205);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u65E5\u5FD7\u529F\u80FD\uFF0C\u7528\u4E8E\u8BB0\u5F55",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u4E0E\u8BCA\u65AD\u3002",paraId:0,tocIndex:0},{value:"\u5F53\u521B\u5EFA",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u65F6\u8BBE\u7F6E",paraId:1,tocIndex:1},{value:"debug",paraId:1,tocIndex:1},{value:"\u4E3A",paraId:1,tocIndex:1},{value:"true",paraId:1,tocIndex:1},{value:"\u65F6\uFF0C",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u4F1A\u8BB0\u5F55\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6,\u6253\u5370\u5728\u63A7\u5236\u53F0\u4E2D\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`import { createStore } from "@autostorejs/react"

const store = createStore({
  //....
},{
  id:"user",
  debug:true   // \u5F00\u542F\u8C03\u8BD5\u6A21\u5F0F  
})
`,paraId:2,tocIndex:1},{value:"\u63A7\u5236\u53F0\u8F93\u51FA\u6837\u5F0F\u5982\u4E0B:",paraId:3,tocIndex:1},{value:"\u5F53\u5E94\u7528\u5177\u6709\u591A\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A\u6BCF\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u8BBE\u7F6E\u4E0D\u540C\u7684",paraId:4},{value:"id",paraId:4},{value:"\uFF0C\u4EE5\u4FBF\u533A\u5206\u4E0D\u540C\u7684",paraId:4},{value:"AutoStore",paraId:4},{value:"\u3002",paraId:4},{value:"\u5982\u679C\u5BF9\u9ED8\u8BA4\u7684\u65E5\u5FD7\u8F93\u51FA\u4E0D\u6EE1\u610F\u6216\u8005\u60F3\u5C06",paraId:5,tocIndex:2},{value:"AutoStore",paraId:5,tocIndex:2},{value:"\u7684\u65E5\u5FD7\u4FE1\u606F\u8F6C\u53D1\u81F3\u60A8\u81EA\u5DF1\u7684\u65E5\u5FD7\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E",paraId:5,tocIndex:2},{value:"options.log",paraId:5,tocIndex:2},{value:"\u51FD\u6570\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA\u3002",paraId:5,tocIndex:2},{value:"options.log",paraId:6},{value:"\u7684\u7C7B\u578B\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:6},{value:`type LogMessageArgs = string | Error | (()=>string)
type LogLevel = 'log' | 'error' | 'warn'
function log(this:AutoStore<any>,message: LogMessageArgs,level:LogLevel='log'){
`,paraId:7}]},86288:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(42246);const o=[{value:"\u7531\u4E8E\u72B6\u6001\u4E4B\u95F4\u53EF\u80FD\u5B58\u5728\u590D\u6742\u7684\u4F9D\u8D56\u8BA1\u7B97\u5173\u7CFB\uFF0C\u4E3A\u4E86\u66F4\u597D\u7684\u8C03\u8BD5\u72B6\u6001\u7684\u53D8\u5316\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"trace",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u5E2E\u52A9\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u64CD\u4F5C\u3002",paraId:0,tocIndex:0},{value:"trace",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type StateTracker= {
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
\u5BF9`,paraId:8},{value:"d",paraId:8},{value:"\u7684\u8BA1\u7B97\u662F\u5728\u8DDF\u8E2A\u51FD\u6570\u7684\u6267\u884C\u540E\u7684\u4E0B\u4E00\u6B21\u5F02\u6B65\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\u8FDB\u884C\u7684\uFF0C\u800C\u6B64\u65F6\u8DDF\u8E2A\u51FD\u6570\u5DF2\u7ECF\u6267\u884C\u5B8C\u6BD5\u4E86\uFF0C\u6240\u4EE5\u5C31\u65E0\u6CD5\u8DDF\u8E2A\u5230\u5BF9",paraId:8},{value:"d",paraId:8},{value:"\u7684\u64CD\u4F5C\u3002",paraId:8},{value:"\u663E\u7136\uFF0C\u6211\u4EEC\u9884\u671F\u662F\u5728",paraId:9},{value:"state.b = 20",paraId:9},{value:"\u4E4B\u540E\uFF0C\u80FD\u8DDF\u8E2A\u5230\u5176\u6D3E\u751F\u7684\u4E00\u7CFB\u5217\u64CD\u4F5C\u65E5\u5FD7\u7684\u3002",paraId:9},{value:"\u56E0\u6B64\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u9700\u8981\u4E3A",paraId:10},{value:"start()",paraId:10},{value:"\u63D0\u4F9B\u4E00\u4E2A\u9884\u671F\u7684\u7ED3\u675F\u51FD\u6570\uFF0C\u6765\u5224\u65AD\u662F\u5426\u505C\u6B62\u8DDF\u8E2A\uFF0C\u5982\u4E0B\uFF1A",paraId:10},{value:"\u5982\u679C\u56E0\u4E3A\u67D0\u4E9B\u539F\u56E0\uFF0C\u6211\u4EEC\u65E0\u6CD5\u63A5\u6536",paraId:11},{value:"set d.value",paraId:11},{value:"\u7684\u64CD\u4F5C\uFF0C\u53EF\u4EE5\u8C03\u7528",paraId:11},{value:"tracker.stop()",paraId:11},{value:"\u65B9\u6CD5\u6765\u505C\u6B62\u8DDF\u8E2A\u3002",paraId:11},{value:"trace",paraId:12},{value:"\u65B9\u6CD5\u4EC5\u5728\u5F00\u53D1\u65F6\u8FDB\u884C\u8C03\u5EA6\u4F7F\u7528\u3002",paraId:12}]},80870:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(76233);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useBindings",paraId:2,tocIndex:0}]},94226:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(97820);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},90342:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(12357);const o=[{value:"\u5982\u679C\u8981\u5BF9\u6DF1\u5C42\u5D4C\u5957\u7684\u5BF9\u8C61\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useBindings",paraId:0,tocIndex:0},{value:".",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1}]},23249:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(79247);const o=[{value:"useFrom",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u5B8C\u6574\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u4F7F\u5F97\u6536\u96C6\u6570\u636E\u53D8\u5F97\u66F4\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"useFrom",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type UseFormResult={
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
`,paraId:4,tocIndex:1},{value:"\u5E94\u7528\u5230",paraId:5,tocIndex:1},{value:"form",paraId:5,tocIndex:1},{value:"\u5143\u7D20\u4E0A\u540E\uFF0C\u5C31\u53EF\u4EE5\u8F7B\u677E\u5B9E\u73B0",paraId:5,tocIndex:1},{value:"\u8868\u5355",paraId:5,tocIndex:1},{value:"\u4E0E",paraId:5,tocIndex:1},{value:"State",paraId:5,tocIndex:1},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u4E86\u3002",paraId:5,tocIndex:1},{value:"\u4EE5\u4E0B\u662F\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:6,tocIndex:1},{value:"useForm",paraId:7,tocIndex:2},{value:"\u7684\u5DE5\u4F5C\u539F\u7406\u5982\u4E0B\uFF1A",paraId:7,tocIndex:2},{value:"ref",paraId:8},{value:"useForm",paraId:9,tocIndex:3},{value:"\u8FD4\u56DE\u4E00\u4E2A",paraId:9,tocIndex:3},{value:"{ref,...}",paraId:9,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u5176\u4E2D",paraId:9,tocIndex:3},{value:"ref",paraId:9,tocIndex:3},{value:"\u662F\u4E00\u4E2A",paraId:9,tocIndex:3},{value:"React.RefObject<HTMLFormElement>",paraId:9,tocIndex:3},{value:"\u5BF9\u8C61\u3002\u5F53\u6211\u4EEC\u5728\u8868\u5355\u4E0A\u4F7F\u7528",paraId:9,tocIndex:3},{value:"{...myform}",paraId:9,tocIndex:3},{value:"\u65F6\uFF0C",paraId:9,tocIndex:3},{value:"ref",paraId:9,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u7ED1\u5B9A\u5230",paraId:9,tocIndex:3},{value:"form",paraId:9,tocIndex:3},{value:"\u5143\u7D20\u4E0A\u3002\u8FD9\u662F\u5DE5\u4F5C\u7684\u57FA\u7840\u3002",paraId:9,tocIndex:3},{value:"useForm",paraId:10,tocIndex:4},{value:"\u5185\u90E8\u7684",paraId:10,tocIndex:4},{value:"useEffect",paraId:10,tocIndex:4},{value:"\u4F1A\u81EA\u52A8\u521D\u59CB\u5316\u8868\u5355.",paraId:10,tocIndex:4},{value:"\u7531\u4E8E",paraId:11,tocIndex:4},{value:"ref",paraId:11,tocIndex:4},{value:"\u7ED1\u5B9A\u5230",paraId:11,tocIndex:4},{value:"form",paraId:11,tocIndex:4},{value:"\u5143\u7D20\u4E0A\uFF0C\u901A\u8FC7",paraId:11,tocIndex:4},{value:"ref.current",paraId:11,tocIndex:4},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230",paraId:11,tocIndex:4},{value:"form",paraId:11,tocIndex:4},{value:"\u5143\u7D20",paraId:11,tocIndex:4},{value:"\u7136\u540E\u901A\u8FC7",paraId:11,tocIndex:4},{value:"ref.current.querySelectorAll('input,textarea,select')",paraId:11,tocIndex:4},{value:"\u83B7\u53D6\u5230\u6240\u6709\u8868\u5355\u5185\u90E8\u7684",paraId:11,tocIndex:4},{value:"input",paraId:11,tocIndex:4},{value:",",paraId:11,tocIndex:4},{value:"textarea",paraId:11,tocIndex:4},{value:",",paraId:11,tocIndex:4},{value:"select",paraId:11,tocIndex:4},{value:"\u5143\u7D20",paraId:11,tocIndex:4},{value:"\u4F9D\u6B21\u904D\u5386\u8FD9\u4E9B\u5143\u7D20\uFF0C\u6839\u636E",paraId:11,tocIndex:4},{value:"name",paraId:11,tocIndex:4},{value:"\u5C5E\u6027\uFF0C\u4ECE",paraId:11,tocIndex:4},{value:"state",paraId:11,tocIndex:4},{value:"\u4E2D\u83B7\u53D6\u5BF9\u5E94\u7684\u503C\uFF0C\u5E76\u8BBE\u7F6E\u5230\u8868\u5355\u5143\u7D20\u4E0A\u3002",paraId:11,tocIndex:4},{value:"\u8981\u5B9E\u73B0\u53CC\u5411\u7ED1\u5B9A\uFF0C\u6211\u4EEC\u9700\u8981\uFF1A",paraId:12,tocIndex:5},{value:"\u76D1\u542C\u8868\u5355\u5143\u7D20\u7684",paraId:13,tocIndex:5},{value:"change",paraId:13,tocIndex:5},{value:"\u4E8B\u4EF6",paraId:13,tocIndex:5},{value:"\u7531\u4E8E\u8868\u5355\u4E8B\u4EF6",paraId:14,tocIndex:5},{value:"onchange",paraId:14,tocIndex:5},{value:"\u8FDB\u884C\u8FDB\u884C\u5192\u6CE1\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EA\u9700\u8981\u5728",paraId:14,tocIndex:5},{value:"form",paraId:14,tocIndex:5},{value:"\u5143\u7D20\u4E0A\u76D1\u542C",paraId:14,tocIndex:5},{value:"change",paraId:14,tocIndex:5},{value:"\u4E8B\u4EF6\u5373\u53EF\u3002",paraId:14,tocIndex:5},{value:"\u6240\u4EE5\u901A\u8FC7",paraId:15,tocIndex:5},{value:"ref.current.addEventListener('input',onChange)",paraId:15,tocIndex:5},{value:"\u5C31\u53EF\u4EE5\u5728\u8868\u5355\u5143\u7D20\u53D8\u5316\u65F6\u89E6\u53D1\u6355\u83B7\u5230",paraId:15,tocIndex:5},{value:"onChange",paraId:15,tocIndex:5},{value:"\u4E8B\u4EF6\u3002",paraId:15,tocIndex:5},{value:"\u7136\u540E\u5728",paraId:16,tocIndex:5},{value:"onChange",paraId:16,tocIndex:5},{value:"\u4E8B\u4EF6\u4E2D\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:16,tocIndex:5},{value:"event.target",paraId:16,tocIndex:5},{value:"\u83B7\u53D6\u5230\u8868\u5355\u5143\u7D20.",paraId:16,tocIndex:5},{value:"\u6700\u540E\u5C06\u8868\u5355\u5143\u7D20\u7684\u503C\u66F4\u65B0\u5230",paraId:17,tocIndex:5},{value:"state[event.target.name]",paraId:17,tocIndex:5},{value:"\u3002",paraId:17,tocIndex:5},{value:"\u76D1\u542C",paraId:18,tocIndex:5},{value:"state",paraId:18,tocIndex:5},{value:"\u7684\u53D8\u5316",paraId:18,tocIndex:5},{value:"\u4F7F\u7528",paraId:19,tocIndex:5},{value:"store.watch",paraId:19,tocIndex:5},{value:"\u76D1\u542C",paraId:19,tocIndex:5},{value:"state",paraId:19,tocIndex:5},{value:"\u7684\u53D8\u5316\uFF0C\u5F53",paraId:19,tocIndex:5},{value:"state",paraId:19,tocIndex:5},{value:"\u53D8\u5316\u65F6\uFF0C\u5C06\u6570\u636E\u66F4\u65B0\u5230",paraId:19,tocIndex:5},{value:"name=<path>",paraId:19,tocIndex:5},{value:"\u7684\u8868\u5355\u5143\u7D20\u4E0A\u5373\u53EF\u3002",paraId:19,tocIndex:5},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:20,tocIndex:6},{value:"useForm",paraId:20,tocIndex:6},{value:"\u57FA\u672C\u5DE5\u4F5C\u8FC7\u7A0B\uFF0C\u5176\u5B9E\u73B0\u6E90\u7801\u4E0D\u5230",paraId:20,tocIndex:6},{value:"50",paraId:20,tocIndex:6},{value:"\u884C.",paraId:20,tocIndex:6},{value:"\u5F53\u7136\uFF0C\u53CC\u5411\u7ED1\u5B9A\u6709\u4E00\u4E2A\u6F5C\u5728\u7684\u95EE\u9898\uFF0C\u5C31\u662F\u53EF\u80FD\u5BFC\u81F4\u5FAA\u73AF\u66F4\u65B0\uFF0C\u4F46\u662F",paraId:21,tocIndex:6},{value:"AutoStore",paraId:21,tocIndex:6},{value:"\u5185\u90E8\u5DF2\u7ECF\u5904\u7406\u4E86\u8FD9\u4E2A\u95EE\u9898\uFF0C\u6240\u4EE5\u4E0D\u7528\u62C5\u5FC3\u3002",paraId:21,tocIndex:6}]},13927:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(45889);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useInput",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useInput(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useInput",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
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
`,paraId:6}]},86231:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(9159);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u6B3E\u73B0\u4EE3\u5316\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u5E93\uFF0C\u63D0\u4F9B\u4E86\u5F3A\u5927\u7684\u72B6\u6001\u7BA1\u7406\u80FD\u529B\uFF0C\u652F\u6301",paraId:0,tocIndex:0},{value:"\u54CD\u5E94\u5F0F",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8868\u5355\u53CC\u5411\u7ED1\u5B9A",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:0,tocIndex:0},{value:"\u7B49\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:"\u4E3B\u8981\u7279\u6027\uFF1A",paraId:1,tocIndex:0},{value:"\u54CD\u5E94\u5F0F\u6838\u5FC3",paraId:2,tocIndex:0},{value:"\uFF1A\u57FA\u4E8E",paraId:2,tocIndex:0},{value:"Proxy",paraId:2,tocIndex:0},{value:"\u5B9E\u73B0\uFF0C\u6570\u636E\u53D8\u5316\u81EA\u52A8\u89E6\u53D1\u89C6\u56FE\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u5C31\u5730\u8BA1\u7B97\u5C5E\u6027",paraId:2,tocIndex:0},{value:"\uFF1A\u72EC\u6709\u7684\u5C31\u5730\u8BA1\u7B97\u7279\u6027\uFF0C\u53EF\u4EE5\u5728\u72B6\u6001\u6811\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u58F0\u660E",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\uFF0C\u8BA1\u7B97\u7ED3\u679C\u539F\u5730\u5199\u5165\u3002",paraId:2,tocIndex:0},{value:"\u4F9D\u8D56\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"\uFF1A\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\u7684\u4F9D\u8D56\uFF0C\u53EA\u6709\u4F9D\u8D56\u53D8\u5316\u65F6\u624D\u4F1A\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:2,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u63A7\u5236\u80FD\u529B\uFF0C\u652F\u6301",paraId:2,tocIndex:0},{value:"\u8D85\u65F6\u3001\u91CD\u8BD5\u3001\u53D6\u6D88\u3001\u5012\u8BA1\u65F6\u3001\u8FDB\u5EA6",paraId:2,tocIndex:0},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:2,tocIndex:0},{value:"\u72B6\u6001\u53D8\u66F4\u76D1\u542C",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u76D1\u542C",paraId:2,tocIndex:0},{value:"get/set/delete/insert/update",paraId:2,tocIndex:0},{value:"\u7B49\u72B6\u6001\u5BF9\u8C61\u548C\u6570\u7EC4\u7684\u64CD\u4F5C\u76D1\u542C\u3002",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"signal",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u673A\u5236\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u7EC6\u7C92\u5EA6\u7684\u7EC4\u4EF6\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u4E0E\u8BCA\u65AD",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"chrome",paraId:2,tocIndex:0},{value:"\u7684",paraId:2,tocIndex:0},{value:"Redux DevTools Extension",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u5DE5\u5177\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u72B6\u6001\u53D8\u5316\u3002",paraId:2,tocIndex:0},{value:"\u5D4C\u5957\u72B6\u6001",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301\u4EFB\u610F\u6DF1\u5EA6\u7684\u5D4C\u5957\u72B6\u6001\uFF0C\u65E0\u9700\u62C5\u5FC3\u72B6\u6001\u7BA1\u7406\u7684\u590D\u6742\u6027\u3002",paraId:2,tocIndex:0},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u800C\u7B80\u6D01\u7684\u53CC\u5411\u8868\u5355\u7ED1\u5B9A\uFF0C\u6570\u636E\u6536\u96C6\u7B80\u5355\u5FEB\u901F\u3002",paraId:2,tocIndex:0},{value:"\u5FAA\u73AF\u4F9D\u8D56",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u5E2E\u52A9\u68C0\u6D4B\u5FAA\u73AF\u4F9D\u8D56\u51CF\u5C11\u6545\u969C\u3002",paraId:2,tocIndex:0},{value:"Typescript",paraId:2,tocIndex:0},{value:": \u5B8C\u5168\u652F\u6301Typescript\uFF0C\u63D0\u4F9B\u5B8C\u6574\u7684\u7C7B\u578B\u63A8\u65AD\u548C\u63D0\u793A",paraId:2,tocIndex:0},{value:"\u5355\u5143\u6D4B\u8BD5",paraId:2,tocIndex:0},{value:"\uFF1A\u63D0\u4F9B\u5B8C\u6574\u7684\u5355\u5143\u6D4B\u8BD5\u8986\u76D6\u7387\uFF0C\u4FDD\u8BC1\u4EE3\u7801\u8D28\u91CF\u3002",paraId:2,tocIndex:0}]},26021:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(61077);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u529F\u80FD\u5F3A\u5927\uFF0C\u6613\u4E8E\u4F7F\u7528\u3002\u4EE5\u4E0B\u901A\u8FC7\u6784\u5EFA\u4E00\u4E2A\u7B80\u5355\u4E66\u5E97\u5546\u57CE\u7684\u4F8B\u5B50\u6765\u5C55\u793A\u5982\u4F55\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\uFF0C\u4F53\u9A8C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u6781\u81F4\u4F18\u96C5\u548C\u5F3A\u5927\u7684\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:`npm install  @autostorejs/react
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
`,paraId:32},{value:"\u5C06store\u4E0E\u8868\u5355\u4E4B\u95F4\u8FDB\u884C\u53CC\u5411\u8868\u5355\u975E\u5E38\u7B80\u5355\uFF0C\u53EA\u9700\u8981",paraId:33},{value:"2",paraId:33},{value:"\u6B65\u5373\u53EF\u3002",paraId:33},{value:"Step 1\uFF1A  \u5728\u8868\u5355\u5143\u7D20\u4E0A",paraId:34},{value:"{...newOrderFrom}",paraId:34},{value:"\uFF0C\u5373\u53EF\u5C06\u8868\u5355\u5143\u7D20\u4E0Estore\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:34},{value:"Step 2: \u5728",paraId:34},{value:"input",paraId:34},{value:"\u8F93\u5165\u7EC4\u4EF6\u4E2D\u6307\u5B9A\u72B6\u6001\u7684",paraId:34},{value:"name",paraId:34},{value:"\u5C5E\u6027,\u8BA9",paraId:34},{value:"name",paraId:34},{value:"\u7B49\u4E8E\u72B6\u6001\u8DEF\u5F84\u540D\u79F0\u5373\u53EF\u3002",paraId:34},{value:"\u7136\u540E\uFF0C\u5F53\u8FDB\u884C\u8F93\u5165\u65F6\u5C31\u4F1A\u81EA\u52A8\u540C\u6B65\u5230",paraId:35},{value:"store",paraId:35},{value:"\u4E2D\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:35},{value:"\u5355\u51FB",paraId:36},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:37},{value:"\u67E5\u770B\u66F4\u591A\u5185\u5BB9.",paraId:36},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"createStore",paraId:38,tocIndex:7},{value:"\u6216",paraId:38,tocIndex:7},{value:"useStore",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4EFB\u610F\u5D4C\u5957\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u5BF9\u8C61\u3002",paraId:38,tocIndex:7},{value:"\u5728\u7EC4\u4EF6\u4E2D\u4F7F\u7528",paraId:38,tocIndex:7},{value:"useState",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u8BBF\u95EE\u72B6\u6001\u6570\u636E\uFF0C\u5E76\u5728\u72B6\u6001\u53D8\u5316\u65F6\u81EA\u52A8\u91CD\u65B0\u6E32\u67D3\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"$('\u72B6\u6001\u8DEF\u5F84')",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5C06\u6E32\u67D3\u66F4\u65B0\u9650\u5236\u5728\u8F83\u7EC6\u7684\u8303\u56F4\u5185\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"computed",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u503C\u662F\u6839\u636E\u5176\u4ED6\u72B6\u6001\u8BA1\u7B97\u800C\u6765\uFF0C\u5F53\u4F9D\u8D56\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:38,tocIndex:7},{value:"\u5F02\u6B65\u8BA1\u7B97\u652F\u6301",paraId:38,tocIndex:7},{value:"loading",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"error",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"timeout",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"retry",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"cancel",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"progress",paraId:38,tocIndex:7},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:38,tocIndex:7},{value:"useForm",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u5C06\u8868\u5355\u5143\u7D20\u4E0E",paraId:38,tocIndex:7},{value:"store",paraId:38,tocIndex:7},{value:"\u53CC\u5411\u7ED1\u5B9A\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:38,tocIndex:7}]},27067:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(47315);const o=[]},72997:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(26916);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5171\u5305\u62EC\u4E09\u4E2A\u5305\uFF1A",paraId:0,tocIndex:0},{value:"autostore",paraId:1,tocIndex:0},{value:": \u6838\u5FC3\u5305",paraId:1,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:": \u9762\u5411",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u5F00\u53D1\u8005",paraId:1,tocIndex:0},{value:"@autostorejs/devtools",paraId:1,tocIndex:0},{value:": \u4F7F\u7528",paraId:1,tocIndex:0},{value:"Redux DevTools",paraId:1,tocIndex:0},{value:"\u8C03\u8BD5",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"autostore",paraId:2,tocIndex:1},{value:"\u662F\u6838\u5FC3\u5305\uFF0C\u63D0\u4F9B\u4E86",paraId:2,tocIndex:1},{value:"AutoStore",paraId:2,tocIndex:1},{value:"\u7684\u6838\u5FC3\u529F\u80FD\u3002",paraId:2,tocIndex:1},{value:"\u5982\u679C\u4F60\u662F",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u7B49\u5176\u4ED6\u6846\u67B6\u7684\u5F00\u53D1\u8005\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528",paraId:3,tocIndex:1},{value:"autostore",paraId:3,tocIndex:1},{value:"\u3002",paraId:3,tocIndex:1},{value:"\u8BE5\u5305\u4F7F\u7528",paraId:4,tocIndex:1},{value:"new AutoStore",paraId:4,tocIndex:1},{value:"\u6765\u521B\u5EFA",paraId:4,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5B9E\u4F8B\u3002",paraId:4,tocIndex:1},{value:`npm install  autostore
`,paraId:5},{value:`yarn add autostore
`,paraId:6},{value:`pnpm add autostore
`,paraId:7},{value:"\u5982\u679C\u60A8\u662F",paraId:8},{value:"React",paraId:8},{value:"\u5F00\u53D1\u8005\uFF0C\u53EA\u9700\u8981\u5B89\u88C5",paraId:8},{value:"@autostorejs/react",paraId:8},{value:"\u5373\u53EF\u3002",paraId:8},{value:"@autostorejs/react",paraId:9},{value:"\u5DF2\u7ECF\u96C6\u6210\u4E86",paraId:9},{value:"autostore",paraId:9},{value:"\u5305\u7684\u6240\u6709\u529F\u80FD\uFF0C",paraId:9},{value:"\u4E0D\u9700\u8981\u989D\u5916\u5B89\u88C5",paraId:9},{value:"autostore",paraId:9},{value:"\u3002",paraId:9},{value:`npm install  @autostorejs/react
`,paraId:10},{value:`yarn add @autostorejs/react
`,paraId:11},{value:`pnpm add @autostorejs/react
`,paraId:12},{value:"@autostorejs/devtools",paraId:13,tocIndex:3},{value:"\u662F",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u8C03\u8BD5\u5DE5\u5177\u5305\uFF0C\u57FA\u4E8E",paraId:13,tocIndex:3},{value:"chrome",paraId:13,tocIndex:3},{value:"\u7684",paraId:13,tocIndex:3},{value:"Redux DevTools Extension",paraId:13,tocIndex:3},{value:"\u6765\u8C03\u8BD5",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u72B6\u6001\u3002",paraId:13,tocIndex:3},{value:`npm install  @autostorejs/devtools
`,paraId:14},{value:`yarn add @autostorejs/devtools
`,paraId:15},{value:`pnpm add @autostorejs/devtools
`,paraId:16},{value:"\u76EE\u524D\u8FD8\u6CA1\u6709\u5B9E\u73B0\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5C01\u88C5",paraId:17,tocIndex:4},{value:"autostore",paraId:17,tocIndex:4},{value:"\u5B9E\u73B0",paraId:17,tocIndex:4},{value:"Vue",paraId:17,tocIndex:4},{value:"\u7684\u96C6\u6210\u3002",paraId:17,tocIndex:4},{value:"@autostorejs/react",paraId:18,tocIndex:4},{value:"\u4E5F\u4EC5\u662F",paraId:18,tocIndex:4},{value:"autostore",paraId:18,tocIndex:4},{value:"\u7684\u5C01\u88C5\uFF0C\u4EE3\u7801\u91CF\u5F88\u5C11\uFF0C\u6709\u5174\u8DA3\u7684\u540C\u5B66\u53EF\u4EE5\u5C1D\u8BD5\u4E00\u4E0B\u3002",paraId:18,tocIndex:4}]},42516:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(3694);const o=[]},679:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(4180);const o=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
`,paraId:4,tocIndex:1},{value:"\u56E0\u6B64",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u5C31\u6709\u4E86",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u6982\u5FF5\uFF0C\u901A\u8FC7",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u8C03\u5EA6\u6765\u5B9E\u73B0\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4F46\u662F",paraId:5,tocIndex:1},{value:"Fiber",paraId:5,tocIndex:1},{value:"\u7684\u8C03\u5EA6\u903B\u8F91\u5F88\u590D\u6742\uFF0C\u5B98\u65B9\u641E\u8FD9\u73A9\u610F\u6298\u817E\u4E86\u6709\u4E00\u5E74\u3002",paraId:5,tocIndex:1},{value:"\u7136\u540E\u5C31\u662F\u4E00\u5806\u7684",paraId:5,tocIndex:1},{value:"React.memo",paraId:5,tocIndex:1},{value:"\u7684\u4F18\u5316\u624B\u6BB5\uFF0C\u4F46\u662F\u5E94\u7528\u590D\u6742\u65F6\uFF0C\u9A7E\u9A6D\u8D77\u6765\u4E5F\u6709",paraId:5,tocIndex:1},{value:"\u6BD4\u8F83\u5927\u7684\u5FC3\u667A\u8D1F\u62C5",paraId:5,tocIndex:1},{value:"\u3002",paraId:5,tocIndex:1},{value:"\u56E0\u6B64\uFF0C\u5B98\u65B9\u53C8\u641E\u4E86\u4E2A",paraId:5,tocIndex:1},{value:"React Compiler",paraId:5,tocIndex:1},{value:"\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4E3A\u4EE3\u7801\u81EA\u52A8\u6DFB\u52A0",paraId:5,tocIndex:1},{value:"React.memo",paraId:5,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u4F46\u8FD9\u73A9\u610F\u4ECE\u63D0\u51FA\u5230\u73B0\u5728\u600E\u4E48\u4E5F\u6709\u4E24\u5E74\u4E86\uFF0C\u8FD8\u5728\u5B9E\u9A8C\u9636\u6BB5\u3002\u4F30\u8BA1\u4E5F\u662F\u4E0D\u592A\u597D\u641E\u3002",paraId:5,tocIndex:1},{value:"\u7531\u4E8E",paraId:6,tocIndex:1},{value:"Virtual DOM",paraId:6,tocIndex:1},{value:"\u7684\u7279\u6027\uFF0C\u65E0\u8BBA\u662F",paraId:6,tocIndex:1},{value:"React",paraId:6,tocIndex:1},{value:"\u8FD8\u662F",paraId:6,tocIndex:1},{value:"Vue",paraId:6,tocIndex:1},{value:"\uFF0C\u672C\u8D28\u4E0A\u90FD\u662F\u5728",paraId:6,tocIndex:1},{value:"Virtual DOM",paraId:6,tocIndex:1},{value:"\u4E0A\u8FDB\u884C",paraId:6,tocIndex:1},{value:"diff",paraId:6,tocIndex:1},{value:"\u7B97\u6CD5\uFF0C\u7136\u540E\u518D\u8FDB\u884C",paraId:6,tocIndex:1},{value:"patch",paraId:6,tocIndex:1},{value:"\u64CD\u4F5C\uFF0C\u5DEE\u522B\u5C31\u662F",paraId:6,tocIndex:1},{value:"diff",paraId:6,tocIndex:1},{value:"\u7B97\u6CD5\u7684\u5B9E\u73B0\u65B9\u5F0F\u4E0D\u540C\u3002",paraId:6,tocIndex:1},{value:"\u4F46\u662F\u65E0\u8BBA\u600E\u4E48\u6574\uFF0C \u5728",paraId:7,tocIndex:1},{value:"Virtual DOM",paraId:7,tocIndex:1},{value:"\u7684",paraId:7,tocIndex:1},{value:"diff",paraId:7,tocIndex:1},{value:"\u7B97\u6CD5\u52A0\u6301\u4E0B\uFF0C\u5C06",paraId:7,tocIndex:1},{value:"\u72B6\u6001\u7684\u53D8\u5316",paraId:7,tocIndex:1},{value:"\u603B\u662F\u96BE\u4EE5\u7CBE\u51C6\u5730\u4E0E",paraId:7,tocIndex:1},{value:"DOM",paraId:7,tocIndex:1},{value:"\u5BF9\u5E94\u5339\u914D\u3002",paraId:7,tocIndex:1},{value:"\u901A\u4FD7\u8BF4\uFF0C\u5C31\u662F\u5F53",paraId:8,tocIndex:1},{value:"state.xxx",paraId:8,tocIndex:1},{value:"\u66F4\u65B0\u65F6\uFF0C\u4E0D\u662F\u76F4\u63A5\u627E\u5230\u4F7F\u7528",paraId:8,tocIndex:1},{value:"state.xxx",paraId:8,tocIndex:1},{value:"\u7684",paraId:8,tocIndex:1},{value:"DOM",paraId:8,tocIndex:1},{value:"\u8FDB\u884C\u7CBE\u51C6\u66F4\u65B0\uFF0C\u800C\u662F\u901A\u8FC7",paraId:8,tocIndex:1},{value:"Virtual DOM",paraId:8,tocIndex:1},{value:"\u7684",paraId:8,tocIndex:1},{value:"diff",paraId:8,tocIndex:1},{value:"\u7B97\u6CD5\u6BD4\u8F83\u7B97\u51FA\u9700\u8981\u66F4\u65B0\u7684",paraId:8,tocIndex:1},{value:"DOM",paraId:8,tocIndex:1},{value:"\u5143\u7D20\uFF0C\u7136\u540E\u518D\u8FDB\u884C",paraId:8,tocIndex:1},{value:"patch",paraId:8,tocIndex:1},{value:"\u64CD\u4F5C\u3002",paraId:8,tocIndex:1},{value:"\u95EE\u9898\u662F\uFF0C\u8FD9\u79CD",paraId:9,tocIndex:1},{value:"diff",paraId:9,tocIndex:1},{value:"\u7B97\u6CD5\u6BD4\u8F83\u590D\u6742\uFF0C\u9700\u8981\u8FDB\u884C\u5404\u5904\u4F18\u5316\uFF0C\u5BF9\u5F00\u53D1\u8005\u4E5F\u6709\u4E00\u5B9A\u7684\u5FC3\u667A\u8D1F\u62C5\uFF0C\u6BD4\u5982\u5728\u5728\u5927\u578B",paraId:9,tocIndex:1},{value:"React",paraId:9,tocIndex:1},{value:"\u5E94\u7528\u4E2D\u5BF9",paraId:9,tocIndex:1},{value:"React.memo",paraId:9,tocIndex:1},{value:"\u7684\u4F7F\u7528,\u6216\u8005\u5728",paraId:9,tocIndex:1},{value:"Vue",paraId:9,tocIndex:1},{value:"\u4E2D\u7684\u6A21\u677F\u4F18\u5316\u7B49\u7B49\u3002",paraId:9,tocIndex:1},{value:"Q: ",paraId:10},{value:"\u4E3A\u4EC0\u4E48\u8BF4\u5728\u5927\u578B\u5E94\u7528\u4E2D\u4F7F\u7528",paraId:10},{value:"React.memo",paraId:10},{value:"\u662F\u4E00\u79CD\u5FC3\u667A\u8D1F\u62C5\uFF1F",paraId:10},{value:"A: \u5B9E\u9645\u4E0A",paraId:10},{value:"React.memo",paraId:10},{value:"\u7684\u903B\u8F91\u672C\u8EAB\u5F88\u7B80\u5355\uFF0C\u65E0\u8BBA\u8001\u624B\u6216\u5C0F\u767D\u5747\u53EF\u4EE5\u8F7B\u677E\u638C\u63E1\u3002\u4F46\u662F\u5728\u5927\u578B\u5E94\u7528\u4E2D\uFF0C\u4E00\u65B9\u9762\u7EC4\u4EF6\u7684\u5D4C\u5957\u5C42\u7EA7\u5F88\u6DF1\uFF0C\u7EC4\u4EF6\u4E4B\u95F4\u7684\u4F9D\u8D56\u5173\u7CFB\u5F88\u590D\u6742\uFF0C\u53E6\u5916\u4E00\u65B9\u9762\uFF0C\u7EC4\u4EF6\u6570\u91CF\u6210\u767E\u4E0A\u5343\u3002\u5982\u679C\u90FD\u8981\u4F7F\u7528",paraId:10},{value:"React.memo",paraId:10},{value:"\u6765\u4F18\u5316\u6E32\u67D3\uFF0C\u5C31\u662F\u4E00\u79CD\u5F88\u5927\u7684\u5FC3\u667A\u8D1F\u62C5\u3002\u5982\u679C\u91C7\u7528\u540E\u671F\u4F18\u5316\uFF0C\u5219\u95EE\u9898\u66F4\u52A0\u4E25\u91CD\uFF0C\u5F80\u5F80\u9700\u8981\u4F7F\u7528\u4E00\u4E9B\u6027\u80FD\u5206\u6790\u5DE5\u5177\u624D\u53EF\u4EE5\u8FDB\u884C\u9488\u5BF9\u6027\u7684\u4F18\u5316\u3002\u7B80\u5355\u5730\u8BF4\uFF0C\u5F53\u5E94\u7528\u590D\u6742\u540E\uFF0C",paraId:10},{value:"React.memo",paraId:10},{value:"\u624D\u4F1A\u6210\u4E3A\u8D1F\u62C5\u3002",paraId:10},{value:"\u56E0\u6B64\u6846\u67B6\u7684\u6700\u6838\u5FC3\u7684\u95EE\u9898\u5C31\u662F",paraId:11},{value:"\u80FD\u6839\u636E",paraId:11},{value:"\u72B6\u6001\u7684\u53D8\u5316",paraId:11},{value:"\u5FEB\u901F\u627E\u5230\u4F9D\u8D56\u4E8E\u8BE5\u72B6\u6001\u7684",paraId:11},{value:"DOM",paraId:11},{value:"\u7684\u8FDB\u884C\u91CD\u65B0\u6E32\u67D3",paraId:11},{value:"\uFF0C\u5373\u6240\u8C13\u7684",paraId:11},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:11},{value:"\u3002",paraId:11},{value:"\u5373\u7136\u57FA\u4E8E",paraId:12},{value:"Virtual DOM",paraId:12},{value:"\u7684",paraId:12},{value:"diff",paraId:12},{value:"\u7B97\u6CD5\u5728\u89E3\u51B3\u7EC6\u7C92\u5EA6\u66F4\u65B0\u65B9\u9762\u5B58\u5728\u95EE\u9898\uFF0C\u90A3\u4E48\u662F\u5426\u53EF\u4EE5\u4E0D\u8FDB\u884C",paraId:12},{value:"diff",paraId:12},{value:"\u7B97\u6CD5\uFF0C\u76F4\u63A5\u627E\u5230",paraId:12},{value:"state.xxx",paraId:12},{value:"\u5BF9\u5E94\u7684",paraId:12},{value:"DOM",paraId:12},{value:"\u8FDB\u884C\u66F4\u65B0\u5462\uFF1F",paraId:12},{value:"\u65B9\u6CD5\u662F\u6709\u7684\uFF0C\u5C31\u662F\u524D\u7AEF\u6700\u7EA2\u7684",paraId:13},{value:"signal",paraId:13},{value:"\u7684\u6982\u5FF5\u3002",paraId:13},{value:"\u4E8B\u5B9E\u4E0A",paraId:14},{value:"signal",paraId:14},{value:"\u6982\u5FF5\u5F88\u65E9\u5C31\u6709\u4E86\uFF0C\u4F46\u662F\u81EA\u51FA\u4E86",paraId:14},{value:"Svelte",paraId:14},{value:"\u4E4B\u7C7B\u7684\u6846\u67B6\uFF0C\u5B83\u4E0D\u4F7F\u7528",paraId:14},{value:"Virtual DOM",paraId:14},{value:"\uFF0C\u4E0D\u9700\u8981",paraId:14},{value:"diff",paraId:14},{value:"\u7B97\u6CD5\uFF0C\u800C\u662F\u5F15\u5165",paraId:14},{value:"signal",paraId:14},{value:"\u6982\u5FF5\uFF0C\u53EF\u4EE5\u5728",paraId:14},{value:"\u4FE1\u53F7\u89E6\u53D1\u65F6\u53EA\u66F4\u65B0\u53D8\u5316\u7684\u90E8\u5206\uFF0C\u771F\u6B63\u7684\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:14},{value:"\uFF0C\u5E76\u4E14\u6027\u80FD\u4E5F\u975E\u5E38\u597D\u3002",paraId:14},{value:"\u8FD9\u4E00\u4E0B\u5B50\u5C31\u628A",paraId:15},{value:"React",paraId:15},{value:"\u548C",paraId:15},{value:"Vue",paraId:15},{value:"\u4E4B\u7C7B\u7684",paraId:15},{value:"Virtual DOM",paraId:15},{value:"\u73A9\u5BB6\u4EEC\u7ED9\u6253\u8499\u4E86\uFF0C\u4E00\u65F6\u95F4",paraId:15},{value:"signal",paraId:15},{value:`\u6210\u4E86\u524D\u7AEF\u5F00\u53D1\u7684\u65B0\u5BA0\u3002
\u6240\u6709\u7684\u524D\u7AEF\u6846\u67B6\u5747\u5728`,paraId:15},{value:"signal",paraId:15},{value:"\u9760\u62E2\uFF0C",paraId:15},{value:"Svelte",paraId:15},{value:"\u548C",paraId:15},{value:"solidjs",paraId:15},{value:"\u6210\u4E86",paraId:15},{value:"signal",paraId:15},{value:"\u6D41\u6D3E\u7684\u4EE3\u8868\uFF0C\u5C31\u8FDE",paraId:15},{value:"Vue",paraId:15},{value:"\u4E5F\u4E0D\u80FD\u514D\u4FD7\uFF0C",paraId:15},{value:"Vue Vapor",paraId:15},{value:"\u5C31\u662F",paraId:15},{value:"Vue",paraId:15},{value:"\u7684",paraId:15},{value:"signal",paraId:15},{value:"\u5B9E\u73B0\uFF08\u8FD8\u6CA1\u6709\u53D1\u5E03\uFF09\u3002",paraId:15},{value:"\u90A3\u4E48\u4EC0\u4E48\u662F\u4FE1\u53F7\uFF1F",paraId:16},{value:"\u5F15\u7528\u5361\u9882\u8001\u5E08\u5173\u4E8E",paraId:17},{value:"signal",paraId:17},{value:"\u7684\u4E00\u7BC7\u6587\u7AE0",paraId:17},{value:"Signal:\u66F4\u591A\u524D\u7AEF\u6846\u67B6\u7684\u9009\u62E9",paraId:17},{value:"\u3002",paraId:17},{value:"\u5361\u9882\u8001\u5E08\u8BF4",paraId:18},{value:"signal\u7684\u672C\u8D28\uFF0C\u662F\u5C06\u5BF9\u72B6\u6001\u7684\u5F15\u7528\u4EE5\u53CA\u5BF9\u72B6\u6001\u503C\u7684\u83B7\u53D6\u5206\u79BB\u5F00\u3002",paraId:18},{value:"\u5927\u795E\u5C31\u662F\u5927\u795E\uFF0C\u4E00\u53E5\u8BDD\u5C31\u628A",paraId:19},{value:"signal",paraId:19},{value:"\u7684\u672C\u8D28\u8BF4\u6E05\u695A\u4E86\u3002\u4F46\u662F\u4E5F\u628A\u6211\u7B49\u666E\u901A\u4EBA\u7ED9\u8BF4\u61F5\u903C\u4E86\uFF0C\u8FD9\u4E2A\u6982\u5FF5\u903C\u683C\u592A\u9AD8\u592A\u62BD\u8C61\u4E86\uFF0C\u679C\u7136\u662F\u5927\u795E\u554A\u3002",paraId:19},{value:"\u4E0B\u9762\u6211\u4EEC\u6309\u51E1\u4EBA\u7684\u601D\u7EF4\u6765\u7406\u4E00\u7406",paraId:20},{value:"signal",paraId:20},{value:"\uFF0C\u6784\u5EFA\u4E00\u5957",paraId:20},{value:"signal",paraId:20},{value:"\u673A\u5236\u7684\u57FA\u672C\u6D41\u7A0B\u539F\u7406\u5982\u4E0B\uFF1A",paraId:20},{value:"\u7B2C1\u6B65\uFF1A \u8BA9\u72B6\u6001\u6570\u636E\u53EF\u89C2\u5BDF",paraId:21},{value:"\u8BA9\u72B6\u6001\u6570\u636E\u53D8\u6210",paraId:22},{value:"\u54CD\u5E94\u5F0F",paraId:22},{value:"\u6216\u8005",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:22},{value:"\uFF0C\u529E\u6CD5\u5C31\u662F\u4F7F\u7528",paraId:22},{value:"Proxy",paraId:22},{value:"\u6216\u8005",paraId:22},{value:"Object.defineProperty",paraId:22},{value:"\u7B49\u65B9\u6CD5\uFF0C\u5C06\u72B6\u6001\u6570\u636E\u53D8\u6210\u4E00\u4E2A",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:22},{value:"\u5BF9\u8C61\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u666E\u901A\u7684\u6570\u636E\u5BF9\u8C61\u3002",paraId:22},{value:"\u53EF\u89C2\u5BDF",paraId:23},{value:"\u5BF9\u8C61\u7684\u4F5C\u7528\u5C31\u662F",paraId:23},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE",paraId:23},{value:"\uFF0C\u5F53\u72B6\u6001\u53D1\u751F\u8BFB\u5199\u53D8\u5316\u65F6\uFF0C\u5C31\u53EF\u4EE5\u6536\u96C6\u4F9D\u8D56\u4FE1\u606F\u3002",paraId:23},{value:"\u8BA9\u6570\u636E\u53EF\u89C2\u5BDF\u6709\u591A\u79CD\u65B9\u6CD5\uFF0C\u6BD4\u5982",paraId:24},{value:"mobx",paraId:24},{value:"\u5C31\u4E0D\u662F\u4F7F\u7528",paraId:24},{value:"Proxy",paraId:24},{value:"\uFF0C\u800C\u662F\u4F7F\u7528",paraId:24},{value:"Class",paraId:24},{value:"\u7684",paraId:24},{value:"get",paraId:24},{value:"\u5C5E\u6027\u6765\u5B9E\u73B0\u7684\u3002\u751A\u81F3\u4F60\u4E5F\u53EF\u4EE5\u7528\u81EA\u5DF1\u7684\u4E00\u5957",paraId:24},{value:"API",paraId:24},{value:"\u6765\u5B9E\u73B0\u3002\u53EA\u4E0D\u8FC7\u73B0\u5728\u666E\u904D\u4F7F\u7528",paraId:24},{value:"Proxy",paraId:24},{value:"\u5B9E\u73B0\u3002\u6838\u5FC3\u539F\u7406\u5C31\u662F\u8981",paraId:24},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE\uFF0C\u4ECE\u800C\u6536\u96C6\u4F9D\u8D56\u4FE1\u606F",paraId:24},{value:"\u3002",paraId:24},{value:"\u8BA9\u72B6\u6001\u6570\u636E\u53EF\u89C2\u5BDF\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u611F\u77E5\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u8FD9\u6837\u624D\u80FD\u8FDB\u884C\u4E0B\u4E00\u6B65\u7684\u54CD\u5E94\u3002\u611F\u77E5\u7684\u9897\u7C92\u5EA6\u8D8A\u7EC6\uFF0C\u5C31\u8D8A\u80FD\u5B9E\u73B0\u7EC6\u7C92\u5EA6\u66F4\u65B0\u3002",paraId:25},{value:"\u7B2C2\u6B65\uFF1A\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:26},{value:"\u7531\u4E8E\u53EF\u4EE5\u901A\u8FC7",paraId:27},{value:"\u62E6\u622A\u5BF9\u72B6\u6001\u7684\u8BBF\u95EE",paraId:27},{value:"\uFF0C\u56E0\u6B64\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u77E5\u9053\u4EC0\u4E48\u65F6\u5019\u8BFB\u5199\u72B6\u6001\u4E86\uFF0C\u90A3\u4E48\u6211\u4EEC\u5C31\u53EF\u4EE5\u5728\u8BFB\u5199\u72B6\u6001\u65F6\uFF0C\u53D1\u5E03\u4E00\u4E2A",paraId:27},{value:"\u4FE1\u53F7",paraId:27},{value:"\uFF0C\u901A\u77E5\u8BA2\u9605\u8005\uFF0C\u72B6\u6001\u53D1\u751F\u4E86\u53D8\u5316\u3002",paraId:27},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u5C31\u9700\u8981\u4E00\u4E2A",paraId:28},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:28},{value:"\u7684\u673A\u5236\uFF0C\u6765\u767B\u8BB0\u4EC0\u4E48\u4FE1\u53F7\u53D1\u751F\u4E86\u53D8\u5316\uFF0C\u4EE5\u53CA\u8C01\u8BA2\u9605\u4E86\u8FD9\u4E2A\u4FE1\u53F7\u3002",paraId:28},{value:"\u60A8\u53EF\u4EE5\u4F7F\u7528\u7C7B\u4F3C",paraId:29},{value:"mitt",paraId:29},{value:"\u3001",paraId:29},{value:"EventEmitter",paraId:29},{value:"\u4E4B\u7C7B\u7684\u5E93\u6765\u6784\u5EFA",paraId:29},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:29},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u5199\u4E00\u4E2A\u3002",paraId:29},{value:"\u4FE1\u53F7\u53D1\u5E03/\u8BA2\u9605",paraId:30},{value:"\u6700\u6838\u5FC3\u7684\u4E8B\u5B9E\u4E0A\u5C31\u662F\u4E00\u4E2A\u8BA2\u9605\u8868\uFF0C\u8BB0\u5F55\u4E86\u8C01\u8BA2\u9605\u4E86\u4EC0\u4E48\u4FE1\u53F7\uFF0C\u5728\u524D\u7AEF\u5C31\u662F\u54EA\u4E2ADOM\u6E32\u67D3\u51FD\u6570\uFF0C\u4F9D\u8D56\u4E8E\u54EA\u4E2A\u4FE1\u53F7\uFF08\u72B6\u6001\u53D8\u5316\uFF09\u3002",paraId:30},{value:"\u5EFA\u7ACB\u4E00\u4E2A\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u5EFA\u7ACB",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\u4E0E",paraId:31},{value:"\u72B6\u6001\u6570\u636E",paraId:31},{value:"\u4E4B\u95F4\u7684\u6620\u5C04\u5173\u7CFB\uFF0C\u5F53\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6839\u636E\u6B64\u6765\u67E5\u8BE2\u5230\u4F9D\u8D56\u4E8E\u8BE5\u72B6\u6001\u6570\u636E\u7684",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\uFF0C\u7136\u540E\u6267\u884C\u8FD9\u4E9B",paraId:31},{value:"\u6E32\u67D3\u51FD\u6570",paraId:31},{value:"\uFF0C\u4ECE\u800C\u5B9E\u73B0",paraId:31},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:31},{value:"\u3002",paraId:31},{value:"\u7B2C3\u6B65\uFF1A\u6E32\u67D3\u51FD\u6570",paraId:32},{value:"\u63A5\u4E0B\u6765\u6211\u4EEC\u7F16\u5199",paraId:33},{value:"DOM",paraId:33},{value:"\u7684\u6E32\u67D3\u51FD\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:33},{value:`  function render() {
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
`,paraId:42},{value:"\u90A3\u4E48\u6211\u4EEC\u5982\u4F55\u5728",paraId:43,tocIndex:3},{value:"React",paraId:43,tocIndex:3},{value:"\u4E2D\u4F7F\u7528",paraId:43,tocIndex:3},{value:"signal",paraId:43,tocIndex:3},{value:"\u5462\uFF1F",paraId:43,tocIndex:3},{value:"\u4ECE\u4E0A\u9762\u6211\u4EEC\u53EF\u4EE5\u77E5\u9053\uFF0C",paraId:44,tocIndex:3},{value:"signal",paraId:44,tocIndex:3},{value:"\u9A71\u52A8\u7684\u524D\u7AEF\u6846\u67B6\u662F\u5B8C\u5168\u4E0D\u9700\u8981",paraId:44,tocIndex:3},{value:"Virtual DOM",paraId:44,tocIndex:3},{value:"\u7684\u3002",paraId:44,tocIndex:3},{value:"\u800C\u672C\u8D28\u4E0A",paraId:45,tocIndex:3},{value:"React",paraId:45,tocIndex:3},{value:"\u5E76\u4E0D\u662F\u4E00\u4E2A",paraId:45,tocIndex:3},{value:"Signal",paraId:45,tocIndex:3},{value:"\u6846\u67B6\uFF0C\u5176\u6E32\u67D3\u8C03\u5EA6\u662F\u57FA\u4E8E",paraId:45,tocIndex:3},{value:"Virtual DOM",paraId:45,tocIndex:3},{value:"\u3001",paraId:45,tocIndex:3},{value:"fiber",paraId:45,tocIndex:3},{value:"\u548C",paraId:45,tocIndex:3},{value:"diff",paraId:45,tocIndex:3},{value:"\u7B97\u6CD5\u7684\u3002",paraId:45,tocIndex:3},{value:"\u56E0\u6B64\uFF0C",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u5E76\u4E0D\u652F\u6301",paraId:46,tocIndex:3},{value:"signal",paraId:46,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u9664\u6392\u672A\u6765",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u50CF",paraId:46,tocIndex:3},{value:"Vue",paraId:46,tocIndex:3},{value:"\u4E00\u6837\u5347\u7EA7",paraId:46,tocIndex:3},{value:"Vue Vapor mode",paraId:46,tocIndex:3},{value:"\u8FDB\u884C\u91CD\u5927\u5347\u7EA7\uFF0C\u629B\u5F03",paraId:46,tocIndex:3},{value:"Virtual DOM",paraId:46,tocIndex:3},{value:"\uFF0C\u5426\u5219\u5728",paraId:46,tocIndex:3},{value:"React",paraId:46,tocIndex:3},{value:"\u5728\u4E2D\u662F\u4E0D\u80FD\u771F\u6B63\u4F7F\u7528\u5982\u540C",paraId:46,tocIndex:3},{value:"solidjs",paraId:46,tocIndex:3},{value:"\u548C",paraId:46,tocIndex:3},{value:"Svelte",paraId:46,tocIndex:3},{value:"\u7684",paraId:46,tocIndex:3},{value:"signal",paraId:46,tocIndex:3},{value:"\u6982\u5FF5\u7684\u3002",paraId:46,tocIndex:3},{value:"\u4F46\u662F\u65E0\u8BBA\u662F",paraId:47,tocIndex:3},{value:"Virtual DOM",paraId:47,tocIndex:3},{value:"\u8FD8\u662F",paraId:47,tocIndex:3},{value:"signal",paraId:47,tocIndex:3},{value:"\uFF0C\u6838\u5FC3\u5747\u662F\u4E3A\u4E86\u89E3\u51B3",paraId:47,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:47,tocIndex:3},{value:"\u7684\u95EE\u9898\uFF0C\u4ECE\u800C\u63D0\u9AD8\u6E32\u67D3\u6027\u80FD\u3002",paraId:47,tocIndex:3},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7ED3\u5408",paraId:48,tocIndex:3},{value:"React",paraId:48,tocIndex:3},{value:"\u7684",paraId:48,tocIndex:3},{value:"React.memo",paraId:48,tocIndex:3},{value:"\u548C",paraId:48,tocIndex:3},{value:"useMemo",paraId:48,tocIndex:3},{value:"\u7B49\u65B9\u6CD5\u6765\u6A21\u62DF",paraId:48,tocIndex:3},{value:"signal",paraId:48,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u5B9E\u73B0",paraId:48,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:48,tocIndex:3},{value:"\u3002",paraId:48,tocIndex:3},{value:"\u8FD9\u6837\u6211\u4EEC\u5C31\u6709\u4E86",paraId:49,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:49,tocIndex:3},{value:"\u7684\u6982\u5FF5\uFF0C\u5176\u672C\u8D28\u4E0A\u662F\u4F7F\u7528",paraId:49,tocIndex:3},{value:"React.memo",paraId:49,tocIndex:3},{value:"\u5305\u88F9\u7684",paraId:49,tocIndex:3},{value:"ReactNode",paraId:49,tocIndex:3},{value:"\u7EC4\u4EF6\uFF0C\u5C06\u6E32\u67D3\u66F4\u65B0\u9650\u5236\u5728\u8F83\u7EC6\u7684\u8303\u56F4\u5185\u3002",paraId:49,tocIndex:3},{value:"\u6838\u5FC3\u662F\u4E00\u5957\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u5206\u53D1\u673A\u5236\uFF0C\u7528\u6765\u611F\u77E5\u72B6\u6001\u53D8\u5316\uFF0C\u7136\u540E\u901A\u8FC7\u4E8B\u4EF6\u5206\u53D1\u53D8\u5316\u3002",paraId:50,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6\u672C\u8D28\u4E0A\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u7684\u662FReact\u7EC4\u4EF6\uFF0C\u4F46\u4F7F\u7528",paraId:50,tocIndex:3},{value:"React.memo(()=>{.....},()=>true)",paraId:50,tocIndex:3},{value:"\u8FDB\u884C\u5305\u88C5\uFF0C",paraId:50,tocIndex:3},{value:"diff",paraId:50,tocIndex:3},{value:"\u603B\u662F\u8FD4\u56DE",paraId:50,tocIndex:3},{value:"true",paraId:50,tocIndex:3},{value:",\u7528\u6765\u9694\u79BB",paraId:50,tocIndex:3},{value:"DOM",paraId:50,tocIndex:3},{value:"\u6E32\u67D3\u8303\u56F4\u3002",paraId:50,tocIndex:3},{value:"\u7136\u540E\u5728\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u4F1A\u4ECE\u72B6\u6001\u5206\u53D1\u4E2D\u8BA2\u9605\u6240\u4F9D\u8D56\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\u91CD\u65B0\u6E32\u67D3\u8BE5\u7EC4\u4EF6\u3002",paraId:50,tocIndex:3},{value:"\u7531\u4E8E",paraId:50,tocIndex:3},{value:"diff",paraId:50,tocIndex:3},{value:"\u603B\u662F\u8FD4\u56DE",paraId:50,tocIndex:3},{value:"true",paraId:50,tocIndex:3},{value:"\uFF0C\u56E0\u6B64\u91CD\u65B0\u6E32\u67D3\u5C31\u88AB\u7EA6\u675F\u5728\u4E86\u8BE5\u7EC4\u4EF6\u5185\u90E8\uFF0C\u4E0D\u4F1A\u5F15\u8D77\u8FDE\u9501\u53CD\u5E94\uFF0C\u4ECE\u800C\u5B9E\u73B0\u4E86",paraId:50,tocIndex:3},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:50,tocIndex:3},{value:"\u3002",paraId:50,tocIndex:3},{value:"\u4EE5\u4E0B\u662F",paraId:51,tocIndex:3},{value:"AutoStore",paraId:51,tocIndex:3},{value:"\u4E2D\u7684",paraId:51,tocIndex:3},{value:"signal",paraId:51,tocIndex:3},{value:"\u7684\u4E00\u4E2A\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:51,tocIndex:3},{value:"\u4FE1\u53F7\u7EC4\u4EF6\u4EC5\u4EC5\u662F\u6A21\u62DF",paraId:52},{value:"signal",paraId:52},{value:"\u5B9E\u73B0\u4E86",paraId:52},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:52},{value:"\uFF0C\u5176\u672C\u8D28\u4E0A\u662F\u4F7F\u7528",paraId:52},{value:"React.memo",paraId:52},{value:"\u5305\u88F9\u7684",paraId:52},{value:"ReactNode",paraId:52},{value:"\u7EC4\u4EF6\u3002",paraId:52},{value:"\u521B\u5EFA",paraId:52},{value:"$",paraId:52},{value:"\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C",paraId:52},{value:"$",paraId:52},{value:"\u662F",paraId:52},{value:"signal",paraId:52},{value:"\u7684\u5FEB\u6377\u540D\u79F0\u3002\u56E0\u6B64\u4E0A\u9762\u7684",paraId:52},{value:"{$('age')}",paraId:52},{value:"\u7B49\u4EF7\u4E8E",paraId:52},{value:'{signal("age")}',paraId:52},{value:"\u3002",paraId:52},{value:"\u66F4\u591A\u7684",paraId:52},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:52},{value:"\u7684\u7528\u6CD5\u8BF7\u53C2\u8003",paraId:52},{value:"signal",paraId:53},{value:"\u3002",paraId:52},{value:"\u7531\u4E8E",paraId:54,tocIndex:5},{value:"React",paraId:54,tocIndex:5},{value:"\u6C89\u91CD\u7684\u5386\u53F2\u5305\u88B1\uFF0C\u5728\u53EF\u4EE5\u9884\u89C1\u7684\u672A\u6765\uFF0C",paraId:54,tocIndex:5},{value:"React",paraId:54,tocIndex:5},{value:"\u5E94\u8BE5\u4E0D\u4F1A\u652F\u6301\u771F\u6B63\u610F\u4E49\u4E0A\u7684",paraId:54,tocIndex:5},{value:"signal",paraId:54,tocIndex:5},{value:"\u3002",paraId:54,tocIndex:5},{value:"\u5728\u5361\u9882\u8001\u5E08`\u7684",paraId:55,tocIndex:5},{value:"Signal:\u66F4\u591A\u524D\u7AEF\u6846\u67B6\u7684\u9009\u62E9",paraId:55,tocIndex:5},{value:"\u4E2D\u4E5F\u63D0\u5230\uFF0C",paraId:55,tocIndex:5},{value:"React\u56E2\u961F\u6210\u5458\u5BF9\u6B64\u7684\u89C2\u70B9\u662F\uFF1A",paraId:56,tocIndex:5},{value:"\u6709\u53EF\u80FD\u5F15\u5165\u7C7B\u4F3C",paraId:57,tocIndex:5},{value:"Signal",paraId:57,tocIndex:5},{value:"\u7684\u539F\u8BED",paraId:57,tocIndex:5},{value:"Signal",paraId:57,tocIndex:5},{value:"\u6027\u80FD\u786E\u5B9E\u597D\uFF0C\u4F46\u4E0D\u592A\u7B26\u5408",paraId:57,tocIndex:5},{value:"React",paraId:57,tocIndex:5},{value:"\u7684\u7406\u5FF5",paraId:57,tocIndex:5},{value:"\u800C",paraId:58,tocIndex:5},{value:"AutoStore",paraId:58,tocIndex:5},{value:"\u6240\u652F\u6301\u7684",paraId:58,tocIndex:5},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:58,tocIndex:5},{value:"\u7684\u6982\u5FF5\uFF0C\u53EF\u4EE5\u89C6\u4E3A\u6A21\u62DF",paraId:58,tocIndex:5},{value:"signal",paraId:58,tocIndex:5},{value:"\u6216\u8005\u7C7B\u4F3C",paraId:58,tocIndex:5},{value:"Signal",paraId:58,tocIndex:5},{value:"\u7684\u539F\u8BED\uFF0C\u4F7F\u5F97\u6211\u4EEC\u53EF\u4EE5\u5728",paraId:58,tocIndex:5},{value:"React",paraId:58,tocIndex:5},{value:"\u4E2D\u5B9E\u73B0",paraId:58,tocIndex:5},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:58,tocIndex:5},{value:"\uFF0C\u800C\u4E0D\u7528\u518D\u53BB\u7EA0\u7ED3",paraId:58,tocIndex:5},{value:"React.memo",paraId:58,tocIndex:5},{value:"\u7684\u4F7F\u7528\u3002",paraId:58,tocIndex:5},{value:"\u81EA",paraId:59},{value:"React 19",paraId:59},{value:"\u5F00\u59CB,",paraId:59},{value:"React",paraId:59},{value:"\u5B98\u65B9\u63A8\u51FA",paraId:59},{value:"Compiler",paraId:59},{value:"\uFF0C\u5E2E\u52A9\u7528\u6237\u89E3\u51B3",paraId:59},{value:"React.memo",paraId:59},{value:"\u7684\u95EE\u9898\uFF0C\u51CF\u5C11\u7528\u6237\u7684\u5FC3\u667A\u8D1F\u62C5\u3002\u4F46\u662F\u5176\u5E76\u4E0D\u662F\u4E3A\u5173\u4E8E\u51B3\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u95EE\u9898\uFF0C\u800C\u662F\u4F18\u5316\u63D0\u9AD8",paraId:59},{value:"React",paraId:59},{value:`\u7684\u6027\u80FD\u3002
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},86761:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(75690);const o=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},47864:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(8767);const o=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},57143:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(63518);const o=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
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
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},82919:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(35371);const o=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},89615:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(33358);const o=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},56126:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(23841);const o=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
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
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},51337:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(31363);const o=[]},32465:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(81897);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF08\u57FA\u4E8E",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u5C01\u88C5\uFF09\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},80814:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(94451);const o=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},60726:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(61786);const o=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},37445:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(34450);const o=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
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
`,paraId:14,tocIndex:2}]},98041:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(22273);const o=[{value:"\u6839\u636E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684",paraId:0,tocIndex:0},{value:"\u57FA\u672C\u539F\u7406",paraId:1,tocIndex:0},{value:"\uFF0C\u5176\u5185\u7F6E\u4E86\u4E00\u4E2A\u72B6\u6001\u53D8\u5316\u4E8B\u4EF6\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:`\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002
\u901A\u8FC7\u4FA6\u542C\u4E8B\u4EF6\u5C31\u53EF\u4EE5\u4F7F\u7528`,paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:3,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.useWatch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"store",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:3,tocIndex:0}]},32982:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(66663);const o=[{value:"useWatch",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u7528\u6765\u4FA6\u542C",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\uFF0C\u672C\u8D28\u4E0A\u662F\u5BF9",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u7684\u5C01\u88C5\u3002",paraId:0,tocIndex:0},{value:"useWatch",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export interface UseWatchType {
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
`,paraId:5,tocIndex:0}]},65365:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(26826);const o=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6240\u6709\u5728\u72B6\u6001\u4E2D\u76F4\u63A5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u58F0\u660E\u7684\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u5E94",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:"\u4EE5\u4E0B\u662F\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF\u7684\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:2,tocIndex:0},{value:"\u540C",paraId:3,tocIndex:2},{value:"computed",paraId:3,tocIndex:2},{value:"\u4E00\u6837\uFF0C\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E",paraId:3,tocIndex:2},{value:"watch",paraId:3,tocIndex:2},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:3,tocIndex:2},{value:"store.watchObjects.create",paraId:3,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61",paraId:3,tocIndex:2},{value:"create",paraId:4,tocIndex:2},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:2},{value:`  create<Value=any,DependValue=any>(
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

`,paraId:7,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u76D1\u542C\u5BF9\u8C61\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684",paraId:9,tocIndex:2},{value:"associated=false",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u76D1\u542C\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:9,tocIndex:2},{value:"obj.value",paraId:9,tocIndex:2},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:9,tocIndex:2},{value:"\u540C",paraId:10,tocIndex:3},{value:"ComputedObject",paraId:10,tocIndex:3},{value:"\u4E00\u6837\uFF0C",paraId:10,tocIndex:3},{value:"WatchObject",paraId:10,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u624B\u52A8\u6267\u884C\uFF0C\u901A\u8FC7",paraId:10,tocIndex:3},{value:'store.watchObjects.get("<id>").run()',paraId:10,tocIndex:3},{value:"\u6765\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:10,tocIndex:3}]},89167:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(37686);const o=[{value:"@autostorejs/react",paraId:0,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:0,tocIndex:1},{value:"watch",paraId:0,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:0,tocIndex:1},{value:"state",paraId:0,tocIndex:1},{value:"\u4E2D\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5BF9\u8C61,\u7136\u540E\u76D1\u542C\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E\u6240\u5728\u8DEF\u5F84\u3002",paraId:0,tocIndex:1},{value:"watch",paraId:1,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:"\u5728\u72B6\u6001\u4E2D\u7684\u4EFB\u610F\u4F4D\u7F6E\uFF0C\u4F7F\u7528",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u6765\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5668\u5BF9\u8C61\u3002",paraId:2,tocIndex:1},{value:"\u5728",paraId:2,tocIndex:1},{value:"createStore",paraId:2,tocIndex:1},{value:"\u6267\u884C\u540E\uFF0C\u4F1A\u626B\u63CF\u72B6\u6001\u6570\u636E\uFF0C\u5982\u679C\u53D1\u73B0\u4E00\u4E2A\u503C\u662F",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:",\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u76D1\u542C",paraId:2,tocIndex:1},{value:"State",paraId:2,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:1},{value:"\u521B\u5EFA\u7684",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4F1A\u4FDD\u5B58\u5728",paraId:2,tocIndex:1},{value:"Store",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"watchObjects",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4E2D",paraId:2,tocIndex:1},{value:"\u5F53\u6240\u76D1\u542C\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u8C03\u7528",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"getter",paraId:2,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8FD4\u56DE\u7ED3\u679C\u5199\u5165\u5230\u58F0\u660E",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:1},{value:"watch",paraId:3,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:2},{value:`// \u76D1\u542Cfilter\u8FC7\u6EE4\u540E\u7684
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
`,paraId:18,tocIndex:5},{value:"\u8BF4\u660E\uFF1A",paraId:19,tocIndex:5},{value:"\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5B9E\u73B0\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u6765\u8868\u5355\u6574\u4E2A\u8868\u5355\u7684\u6709\u6548\uFF0C\u5F53\u72B6\u6001\u4E2D\u4EFB\u610F\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u7684",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u90FD\u4E3A",paraId:20,tocIndex:5},{value:"false",paraId:20,tocIndex:5},{value:"\u65F6\uFF0C\u5219",paraId:20,tocIndex:5},{value:"validate=false",paraId:20,tocIndex:5},{value:"\uFF0C\u5426\u5219\u4E3A",paraId:20,tocIndex:5},{value:"true",paraId:20,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5},{value:"\u73B0\u5728\u95EE\u9898\u662F",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u53EF\u80FD\u662F\u5728\u4E00\u4E2A\u590D\u6742\u7684\u5D4C\u5957\u5BF9\u8C61\u4E2D\uFF0C\u5E76\u4E14\u53EF\u80FD\u662F\u52A8\u6001\u7684\u3002\u8FD9\u65F6\u5019\uFF0C\u6211\u4EEC\u65E0\u6CD5\u4F7F\u7528",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u6765\u8FDB\u884C\u8BA1\u7B97\uFF0C\u56E0\u4E3A",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\u3002",paraId:20,tocIndex:5},{value:"\u6B64\u65F6\u5C31\u662F\u4F7F\u7528",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\u7684\u65F6\u5019\u4E86\uFF0C\u6211\u4EEC\u58F0\u660E\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u76D1\u542C\u6240\u6709\u8DEF\u5F84\u4E2D\u7684",paraId:20,tocIndex:5},{value:"path[path.length-1]=='validate'",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u7684\u53D8\u5316\u5373\u53EF\u3002",paraId:20,tocIndex:5},{value:"\u5173\u4E8E",paraId:20,tocIndex:5},{value:"WatchObject",paraId:20,tocIndex:5},{value:"\u7684\u4ECB\u7ECD\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:20,tocIndex:5},{value:"\u76D1\u542C\u5BF9\u8C61",paraId:21,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5}]},23989:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(73549);const o=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"watch",paraId:1,tocIndex:1},{value:"\u65B9\u6CD5\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`// \u76D1\u542C\u5168\u90E8
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
`,paraId:26,tocIndex:9},{value:"store.watch",paraId:27},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:27},{value:"State",paraId:27},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u5B9E\u73B0\u4E5F\u662F\u57FA\u4E8E",paraId:27},{value:"watch",paraId:27},{value:"\u65B9\u6CD5\u3002",paraId:27}]},36109:function(ee,m,e){"use strict";e.r(m),e.d(m,{texts:function(){return o}});var U=e(43112);const o=[]}}]);
