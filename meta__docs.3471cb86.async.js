"use strict";(self.webpackChunkautostore_docs=self.webpackChunkautostore_docs||[]).push([[1904],{1801:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(77643),K={}},44887:function(te,y,e){e.r(y),e.d(y,{demos:function(){return m}});var G=e(24325),d=e.n(G),K=e(29008),L=e.n(K),B=e(28633),x=e.n(B),P=e(70958),U=e.n(P),i=e(92379),j=e(61668),g=e(28524),E=e(48611),b=e(20927),m={"docs-exmaples-get-repos-demo-0":{component:i.memo(i.lazy(U()(L()().mark(function I(){var n,o,l,v,r,_,f,S,N,C,D,O,R,A,$;return L()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return n=k.sent,o=n.computed,l=n.createStore,k.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return v=k.sent,r=v.Input,_=v.Box,f=v.Button,k.next=13,Promise.resolve().then(e.bind(e,20927));case 13:return S=k.sent,N=S.api,C=l({user:{repo:"https://api.github.com/users/zhangfisher/repos",projects:o(function(){var Y=U()(L()().mark(function z(H,Q){var ee,X,ae;return L()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return ee=x()(H,1),X=ee[0],ae=Q.abortSignal,de.next=4,new Promise(function(fe,ge){ae.addEventListener("abort",function(){ge("cancelled")}),N.getProjects(X).then(function(De){fe(De)}).catch(function(De){ge(De)})});case 4:case"end":return de.stop()}},z)}));return function(z,H){return Y.apply(this,arguments)}}(),["./repo"],{scope:"depends"})}}),D=C.state,O=C.bind,R=C.$,A=C.useState,$=C.useAsyncState,k.abrupt("return",{default:function(){var z=A("user.repo"),H=x()(z,1),Q=H[0],ee=$("user.projects");return i.createElement("div",null,i.createElement("h3",null,"\u4FEE\u6539\u4ED3\u5E93\u5730\u5740\u5C06\u89E6\u53D1\u91CD\u65B0\u52A0\u8F7D\u8BE5\u4ED3\u5E93\u9879\u76EE\u5217\u8868"),i.createElement(r,d()({label:"\u4ED3\u5E93\u5730\u5740\uFF1A",value:Q},O("user.repo"))),i.createElement(f,{onClick:function(){return D.user.projects.run()}},"\u91CD\u8BD5"),i.createElement(f,{onClick:function(){return D.user.repo="https://api.github.com/users/zhangfisher/repos"}},"\u6062\u590D"),i.createElement(_,null,i.createElement("table",{className:"projects-list"},i.createElement("thead",null,i.createElement("tr",null,i.createElement("td",{colSpan:"3"},"\u4EE5\u4E0B\u662F\u6211\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u611F\u8C22\u652F\u6301\uFF01")),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u9879\u76EE\u540D\u79F0")),i.createElement("td",null,i.createElement("b",null,"\u8BF4\u660E")),i.createElement("td",null,i.createElement("b",null,"\u661F")))),i.createElement("tbody",null,ee.loading?i.createElement("tr",null,i.createElement("td",{colSpan:3},"\u6B63\u5728\u52A0\u8F7D...:")):ee.error?i.createElement("tr",null,i.createElement("td",{colSpan:2},"\u52A0\u8F7D\u9519\u8BEF:",ee.error)):ee.value&&ee.value.map(function(X,ae){return i.createElement("tr",{key:ae},i.createElement("td",null,i.createElement("a",{href:X.url,target:"__blank"},X.name)),i.createElement("td",null,X.description),i.createElement("td",null,X.stars))})))))}});case 17:case"end":return k.stop()}},I)})))),asset:{type:"BLOCK",id:"docs-exmaples-get-repos-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { computed,createStore } from "@autostorejs/react"
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

}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},"autostore-docs":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E,"autostore-docs":b},renderOpts:{compile:function(){var I=U()(L()().mark(function o(){var l,v=arguments;return L()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,e.e(9039).then(e.bind(e,39039));case 2:return _.abrupt("return",(l=_.sent).default.apply(l,v));case 3:case"end":return _.stop()}},o)}));function n(){return I.apply(this,arguments)}return n}()}}}},16960:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(28627),K={}},87524:function(te,y,e){e.r(y),e.d(y,{demos:function(){return b}});var G=e(24325),d=e.n(G),K=e(28633),L=e.n(K),B=e(29008),x=e.n(B),P=e(70958),U=e.n(P),i=e(92379),j=e(46267),g=e(28524),E=e(48611),b={"docs-guide-computed-async-demo-0":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D;return x()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=R.sent,n=I.delay,o=I.createStore,l=I.computed,R.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=R.sent,r=v.Input,_=v.ColorBlock,f=o({user:{firstName:"Zhang",lastName:"Fisher",fullName:l(function(){var A=U()(x()().mark(function $(W){return x()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,n(1e3);case 2:return Y.abrupt("return",W.firstName+" "+W.lastName);case 3:case"end":return Y.stop()}},$)}));return function($){return A.apply(this,arguments)}}(),["user.firstName","./lastName"],{initial:"ZhangFisher"})}},{id:"async-base",debug:!0}),S=f.useAsyncState,N=f.useState,C=f.state,D=f.bind,R.abrupt("return",{default:function(){var $=N("user.firstName"),W=L()($,1),k=W[0],Y=N("user.lastName"),z=L()(Y,1),H=z[0],Q=S("user.fullName");return i.createElement(i.Fragment,null,i.createElement(r,d()({label:"firstName",value:k},D("user.firstName"))),i.createElement(r,d()({label:"lastName",value:H},D("user.lastName"))),i.createElement(_,{name:"FullName",loading:Q.loading},Q.value))}});case 13:case"end":return R.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846firstName\u548ClastName\u7684\u503C\u53D8\u5316\u65F6\uFF0CfullName\u4F1A\u5EF6\u65F6\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",title:"\u5F02\u6B65\u8BA1\u7B97"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-async-demo-1":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f;return x()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=N.sent,n=I.useStore,o=I.computed,l=I.delay,N.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=N.sent,r=v.ColorBlock,_=v.Button,f=v.JsonView,N.abrupt("return",{default:function(){var D=n({firstName:"Zhang",lastName:"Fisher",fullName:o(function(){var W=U()(x()().mark(function k(Y){return x()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,l();case 2:if(!Y.triggerError){H.next=4;break}throw new Error("\u8BA1\u7B97FullName\u65F6\u51FA\u9519");case 4:return H.abrupt("return",Y.firstName+" "+Y.lastName);case 5:case"end":return H.stop()}},k)}));return function(k){return W.apply(this,arguments)}}(),["firstName","lastName"]),triggerError:!1}),O=D.state,R=D.$,A=D.useAsyncState,$=A("fullName");return i.createElement("div",null,i.createElement(r,{name:"FirstName"},R("firstName")),i.createElement(r,{name:"FirstName"},R("lastName")),i.createElement(r,{name:"FullName",loading:$.loading},$.loading?"\u6B63\u5728\u8BA1\u7B97...":$.error?"ERROR:".concat($.error):$.value),i.createElement("div",null,i.createElement(_,{onClick:function(){O.triggerError=!1,O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName"),i.createElement(_,{onClick:function(){O.triggerError=!1,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName")),i.createElement("div",null,i.createElement(_,{onClick:function(){O.firstName=O.firstName+"\u{1F525}"}},"Change FirstName with Error"),i.createElement(_,{onClick:function(){O.triggerError=!0,O.lastName=O.lastName+"\u2764\uFE0F"}},"Change LastName with Error")),i.createElement("div",null,"state.fullName=",i.createElement(f,null,JSON.stringify($))))}});case 13:case"end":return N.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-async-demo-2":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D,O,R,A,$;return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=k.sent,n=I.delay,o=I.createStore,l=I.computed,v=I.ObserverScopeRef,k.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return r=k.sent,_=r.JsonView,f=r.Button,S=r.Input,N=r.Loading,C=o({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:l(function(){var Y=U()(x()().mark(function z(H,Q){var ee,X,ae,me,de;return x()().wrap(function(ge){for(;;)switch(ge.prev=ge.next){case 0:return ee=L()(H,2),X=ee[0],ae=ee[1],me=Q.getProgressbar,de=me(),ge.abrupt("return",new Promise(function(){var De=U()(x()().mark(function je(Ke){var Re;return x()().wrap(function(Me){for(;;)switch(Me.prev=Me.next){case 0:Re=1;case 1:if(!(Re<=100)){Me.next=8;break}return Me.next=4,n(20);case 4:de.value(Re);case 5:Re++,Me.next=1;break;case 8:de.end(),Ke(X*ae);case 10:case"end":return Me.stop()}},je)}));return function(je){return De.apply(this,arguments)}}()));case 4:case"end":return ge.stop()}},z)}));return function(z,H){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:v.Depends})}}),D=C.useState,O=C.state,R=C.$,A=C.bind,$=C.useAsyncState,k.abrupt("return",{default:function(){var z=D("order.count"),H=L()(z,1),Q=H[0],ee=$("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,O.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,O.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(f,{onClick:function(){return O.order.count--}},"-"),i.createElement(S,d()({value:Q},A("order.count"))),i.createElement(f,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",null,ee.loading?i.createElement(N,null):null,ee.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(ee.progress,"%"):ee.error?"ERROR:".concat(ee.error):ee.value)))),i.createElement("div",null,i.createElement(_,null,JSON.stringify(O.order.total))))}});case 16:case"end":return k.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-async-demo-3":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D,O,R,A,$,W;return x()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=Y.sent,n=I.createStore,o=I.computed,l=I.ObserverScopeRef,v=I.delay,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return r=Y.sent,_=r.Input,f=r.Button,S=r.Loading,N=r.JsonView,C=r.RichLabel,D=n({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:o(function(){var z=U()(x()().mark(function H(Q){var ee,X,ae;return x()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return ee=L()(Q,2),X=ee[0],ae=ee[1],de.next=3,v(5e3);case 3:return de.abrupt("return",X*ae);case 4:case"end":return de.stop()}},H)}));return function(H){return z.apply(this,arguments)}}(),["order.count","order.price"],{timeout:1e3,scope:l.Depends})}}),O=D.useState,R=D.state,A=D.$,$=D.bind,W=D.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=L()(H,1),ee=Q[0],X=W("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,R.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,R.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(f,{onClick:function(){return R.order.count--}},"-"),i.createElement(_,d()({value:ee},$("order.count"))),i.createElement(f,{onClick:function(){return R.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",null,X.loading?i.createElement(S,null):null,X.loading?"\u6B63\u5728\u8BA1\u7B97......".concat(X.timeout,"ms"):X.error?i.createElement(C,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),i.createElement("div",null,i.createElement(N,null,JSON.stringify(R.order.total))))}});case 17:case"end":return Y.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-async-demo-4":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D,O,R,A,$,W;return x()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=Y.sent,n=I.createStore,o=I.computed,l=I.ObserverScopeRef,v=I.delay,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return r=Y.sent,_=r.Input,f=r.Button,S=r.Loading,N=r.JsonView,C=r.RichLabel,D=n({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:o(function(){var z=U()(x()().mark(function H(Q){var ee,X,ae;return x()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return ee=L()(Q,2),X=ee[0],ae=ee[1],de.next=3,v(6e3);case 3:return de.abrupt("return",X*ae);case 4:case"end":return de.stop()}},H)}));return function(H){return z.apply(this,arguments)}}(),["order.count","order.price"],{timeout:[5*1e3,5],scope:l.Depends})}}),O=D.useState,R=D.state,A=D.$,$=D.bind,W=D.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=L()(H,1),ee=Q[0],X=W("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,R.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,R.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(f,{onClick:function(){return R.order.count--}},"-"),i.createElement(_,d()({value:ee},$("order.count"))),i.createElement(f,{onClick:function(){return R.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?i.createElement(S,null):null,X.loading?i.createElement(C,{text:"\u6B63\u5728\u8BA1\u7B97......\u5012\u8BA1\u65F6{".concat(X.timeout,"}\u79D2"),color:"red"}):X.error?i.createElement(C,{text:"ERROR: {".concat(X.error,"}"),color:"red"}):null)))),i.createElement("div",null,i.createElement(N,null,JSON.stringify(R.order.total))))}});case 17:case"end":return Y.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-async-demo-5":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D,O,R,A,$,W;return x()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=Y.sent,n=I.createStore,o=I.computed,l=I.ObserverScopeRef,v=I.delay,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return r=Y.sent,_=r.Input,f=r.Button,S=r.Loading,N=r.JsonView,C=r.RichLabel,D=n({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:o(function(){var z=U()(x()().mark(function H(Q){var ee,X,ae;return x()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return ee=L()(Q,2),X=ee[0],ae=ee[1],de.next=3,v();case 3:throw new Error("\u8BA1\u7B97\u51FA\u9519");case 4:case"end":return de.stop()}},H)}));return function(H){return z.apply(this,arguments)}}(),["order.count","order.price"],{retry:[5,1e3],scope:l.Depends})}}),O=D.useState,R=D.state,A=D.$,$=D.bind,W=D.useAsyncState,Y.abrupt("return",{default:function(){var H=O("order.count"),Q=L()(H,1),ee=Q[0],X=W("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,R.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,R.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(f,{onClick:function(){return R.order.count--}},"-"),i.createElement(_,d()({value:ee},$("order.count"))),i.createElement(f,{onClick:function(){return R.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},X.loading?i.createElement(S,null):null,X.loading?i.createElement(C,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):X.error&&i.createElement(C,{text:"\u51FA\u9519: {".concat(X.error,"}"),color:"red"}),X.retry>0&&i.createElement(C,{text:"\u91CD\u8BD5: {".concat(X.retry,"}"),color:"red"}))))),i.createElement("div",null,i.createElement(N,null,JSON.stringify(R.order.total))))}});case 17:case"end":return Y.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-async-demo-6":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D,O,R,A,$;return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=k.sent,n=I.createStore,o=I.computed,l=I.ObserverScopeRef,k.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=k.sent,r=v.Input,_=v.Button,f=v.Loading,S=v.JsonView,N=v.RichLabel,C=n({order:{bookName:"Proficient in AutoStore",price:100,count:1,total:o(function(){var Y=U()(x()().mark(function z(H,Q){var ee,X,ae,me;return x()().wrap(function(fe){for(;;)switch(fe.prev=fe.next){case 0:return ee=L()(H,2),X=ee[0],ae=ee[1],me=Q.abortSignal,fe.abrupt("return",new Promise(function(ge,De){var je=setTimeout(function(){ge(X*ae)},1e6);me.addEventListener("abort",function(){clearTimeout(je),De("cancelled")})}));case 3:case"end":return fe.stop()}},z)}));return function(z,H){return Y.apply(this,arguments)}}(),["order.count","order.price"],{scope:l.Depends})}}),D=C.useState,O=C.state,R=C.$,A=C.bind,$=C.useAsyncState,k.abrupt("return",{default:function(){var z=D("order.count"),H=L()(z,1),Q=H[0],ee=$("order.total");return i.createElement("div",null,i.createElement("table",{className:"table table-bordered table-striped"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4E66\u540D")),i.createElement("td",null,O.order.bookName)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u4EF7\u683C")),i.createElement("td",null,O.order.price)),i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u6570\u91CF")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},i.createElement(_,{onClick:function(){return O.order.count--}},"-"),i.createElement(r,d()({value:Q},A("order.count"))),i.createElement(_,{onClick:function(){return O.order.count++}},"+"),"\u8C03\u8282\u6570\u91CF"))),i.createElement("tfoot",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("b",null,"\u603B\u4EF7")),i.createElement("td",{style:{display:"flex",alignItems:"center"}},ee.loading?i.createElement(f,null):null,ee.loading?i.createElement(N,{text:"\u6B63\u5728\u8BA1\u7B97......",color:"red"}):ee.error&&i.createElement(N,{text:"\u51FA\u9519: {".concat(ee.error,"}"),color:"red"}),ee.loading&&i.createElement(_,{onClick:function(){return ee.cancel()}},"\u53D6\u6D88"))))),i.createElement("div",null,i.createElement(S,null,JSON.stringify(O.order.total))))}});case 16:case"end":return k.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-6",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-async-demo-7":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f;return x()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=N.sent,n=I.createStore,N.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return o=N.sent,l=o.ColorBlock,v=o.Button,r=n({bookName:"ZhangFisher",price:100,count:3,total:function(){var C=U()(x()().mark(function O(R){return x()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",R.price*R.count);case 1:case"end":return $.stop()}},O)}));function D(O){return C.apply(this,arguments)}return D}()}),_=r.state,f=r.$,N.abrupt("return",{default:function(){return i.createElement("div",null,i.createElement(l,{name:"\u4E66\u540D"},f("bookName")),i.createElement(l,{name:"\u4EF7\u683C"},f("price")),i.createElement(l,{name:"\u6570\u91CF"},i.createElement(v,{onClick:function(){return _.count--}},"-"),f("count"),i.createElement(v,{onClick:function(){return _.count++}},"+")),i.createElement(l,{name:"\u603B\u4EF7",comment:"\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97"},f("total.value",{errorBoundary:function(O){var R=O.error;return i.createElement(i.Fragment,null,"\u4FE1\u53F7\u7EC4\u4EF6\u51FA\u9519\uFF1A",R.message)}})),i.createElement(l,{name:"state.total"},String(_.total)))}});case 11:case"end":return N.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-async-demo-7",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}}}},60409:function(te,y,e){e.r(y),e.d(y,{demos:function(){return g}});var G=e(29008),d=e.n(G),K=e(28633),L=e.n(K),B=e(70958),x=e.n(B),P=e(92379),U=e(25231),i=e(28524),j=e(48611),g={"docs-guide-computed-create-demo-0":{component:P.memo(P.lazy(x()(d()().mark(function E(){var b,m,I,n,o,l,v;return d()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=_.sent,m=b.createStore,I=b.computed,_.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return n=_.sent,o=n.ColorBlock,l=n.Button,v=m({order:{price:100,count:3,total1:function(S){return S.price*S.count},total2:I(function(f){return f.price*f.count})}}),_.abrupt("return",{default:function(){var S=v.useState(),N=L()(S,2),C=N[0],D=N[1];return P.createElement("div",null,P.createElement(o,{name:"Price"},C.order.price),P.createElement(o,{name:"Count"},C.order.count),P.createElement(o,{name:"Total 1"},C.order.total1),P.createElement(o,{name:"Total 2"},C.order.total2),P.createElement(l,{onClick:function(){return D(function(R){return R.order.count++})}},"Count++"))}});case 12:case"end":return _.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-computed-create-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(d()().mark(function m(){var I,n=arguments;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}}}},71252:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(83717),K={}},87755:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(76938),P=e(28524),U=e(48611),i={"docs-guide-computed-getter-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l,v,r,_;return d()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=S.sent,E=g.createStore,b=g.computed,m=g.delay,S.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=S.sent,n=I.ColorBlock,o=I.Button,l=E({order:{price:100,count:3,total:b(function(){var N=L()(d()().mark(function C(D){return d()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,m(1e3);case 2:return R.abrupt("return",D.price*D.count);case 3:case"end":return R.stop()}},C)}));return function(C){return N.apply(this,arguments)}}(),["./price","./count"],{id:"total"})}}),v=l.state,r=l.$,_=l.computedObjects,S.abrupt("return",{default:function(){return console.log("computedObjects.get('total')=",_.get("total")),B.createElement("div",null,B.createElement(n,{name:"price"},r("order.price")),B.createElement(n,{name:"count"},r("order.count")),B.createElement(n,{name:"Total"},r(function(C){var D=C.value,O=C.loading;return B.createElement("div",null,O?"\u8BA1\u7B97\u4E2D...":D+1e3)},"order.total")),B.createElement(o,{onClick:function(){return v.order.count++}},"Count++"),B.createElement(o,{onClick:function(){return _.get("total").run()}},"\u624B\u52A8\u6267\u884C"))}});case 13:case"end":return S.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-getter-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},18731:function(te,y,e){e.r(y),e.d(y,{demos:function(){return I}});var G=e(12027),d=e.n(G),K=e(34180),L=e.n(K),B=e(28633),x=e.n(B),P=e(29008),U=e.n(P),i=e(70958),j=e.n(i),g=e(92379),E=e(87480),b=e(28524),m=e(48611),I={"docs-guide-computed-objects-demo-0":{component:g.memo(g.lazy(j()(U()().mark(function n(){var o,l,v,r,_,f,S,N,C;return U()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return o=O.sent,l=o.createStore,v=o.computed,O.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return r=O.sent,_=r.Divider,f=r.ColorBlock,S=r.Button,N=0,C=l({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(A){return A.firstName+A.lastName+"".concat(++N)},fullName2:v(function(){var R=j()(U()().mark(function A($){return U()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.abrupt("return",$.firstName+$.lastName+"".concat(++N));case 1:case"end":return k.stop()}},A)}));return function(A){return R.apply(this,arguments)}}(),["./firstName","./lastName"])}}),O.abrupt("return",{default:function(){var A=C.useState(),$=x()(A,1),W=$[0];return g.createElement("div",null,g.createElement(f,{name:"FirstName"},W.user.firstName),g.createElement(f,{name:"lastName"},W.user.lastName),g.createElement(f,{name:"FullName",value:W.user.fullName}),g.createElement(f,{name:"FullName2",value:W.user.fullName2.value}),g.createElement(_,null),g.createElement("div",null,"typeof(store.computedObjects)==",L()(C.computedObjects)),g.createElement("div",null,"store.computedObjects instanceof Map=",String(C.computedObjects instanceof Map)),g.createElement("div",null,"store.computedObjects.size=",C.computedObjects.size),g.createElement("div",null,"store.computedObjects.size=",C.computedObjects.size),g.createElement("div",null,"store.computedObjects.keys()=",d()(C.computedObjects.keys()).join(" , ")),g.createElement(S,{onClick:function(){return C.computedObjects.get("user.fullName").run()}},"\u6267\u884CfullName\u8BA1\u7B97\u51FD\u6570"),g.createElement(S,{onClick:function(){return C.computedObjects.get("user.fullName2").run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"),g.createElement(S,{onClick:function(){return C.state.user.fullName2.run()}},"\u6267\u884CfullName2\u8BA1\u7B97\u51FD\u6570"))}});case 14:case"end":return O.stop()}},n)})))),asset:{type:"BLOCK",id:"docs-guide-computed-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":m},renderOpts:{compile:function(){var n=j()(U()().mark(function l(){var v,r=arguments;return U()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,r));case 3:case"end":return f.stop()}},l)}));function o(){return n.apply(this,arguments)}return o}()}}}},87336:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(15968),K={}},58217:function(te,y,e){e.r(y),e.d(y,{demos:function(){return b}});var G=e(24325),d=e.n(G),K=e(28633),L=e.n(K),B=e(29008),x=e.n(B),P=e(70958),U=e.n(P),i=e(92379),j=e(49613),g=e(28524),E=e(48611),b={"docs-guide-computed-run-demo-0":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C;return x()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=O.sent,n=I.createStore,o=I.computed,l=I.delay,O.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=O.sent,r=v.Divider,_=v.ColorBlock,f=v.Button,S=0,N={book:{name:"Zhang",count:4,price:100,total1:o(function(){var R=U()(x()().mark(function A($){return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,l();case 2:return k.abrupt("return",$.count*$.price);case 3:case"end":return k.stop()}},A)}));return function(A){return R.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total2:o(function(){var R=U()(x()().mark(function A($){return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,l();case 2:return k.abrupt("return",$.count*$.price);case 3:case"end":return k.stop()}},A)}));return function(A){return R.apply(this,arguments)}}(),[],{async:!0,group:"total"}),total3:o(function(){var R=U()(x()().mark(function A($){return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,l();case 2:return k.abrupt("return",$.count*$.price);case 3:case"end":return k.stop()}},A)}));return function(A){return R.apply(this,arguments)}}(),[],{async:!0,group:"total"}),average1:o(function(){var R=U()(x()().mark(function A($){return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,l();case 2:return k.abrupt("return",$.price/$.count);case 3:case"end":return k.stop()}},A)}));return function(A){return R.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average2:o(function(){var R=U()(x()().mark(function A($){return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,l();case 2:return k.abrupt("return",$.price/$.count);case 3:case"end":return k.stop()}},A)}));return function(A){return R.apply(this,arguments)}}(),[],{async:!0,group:"average"}),average3:o(function(){var R=U()(x()().mark(function A($){return x()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,l();case 2:return k.abrupt("return",$.price/$.count);case 3:case"end":return k.stop()}},A)}));return function(A){return R.apply(this,arguments)}}(),[],{async:!0,group:"average"})}},C=n(N),O.abrupt("return",{default:function(){var A=C.useState(),$=L()(A,1),W=$[0];return i.createElement("div",null,i.createElement(r,{title:"Total Group"}),i.createElement(_,{name:"Total1",loading:W.book.total1.loading},W.book.total1.loading?"\u8BA1\u7B97\u4E2D...":W.book.total1.value),i.createElement(_,{name:"Total2",loading:W.book.total2.loading},W.book.total2.loading?"\u8BA1\u7B97\u4E2D...":W.book.total2.value),i.createElement(_,{name:"Total3",loading:W.book.total3.loading},W.book.total3.loading?"\u8BA1\u7B97\u4E2D...":W.book.total3.value),i.createElement(f,{onClick:function(){return C.computedObjects.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"),i.createElement(r,{title:"Average Group"}),i.createElement(_,{name:"Average1",loading:W.book.average1.loading}," ",W.book.average1.loading?"\u8BA1\u7B97\u4E2D...":W.book.average1.value),i.createElement(_,{name:"Average2",loading:W.book.average2.loading}," ",W.book.average2.loading?"\u8BA1\u7B97\u4E2D...":W.book.average2.value),i.createElement(_,{name:"Average3",loading:W.book.average3.loading}," ",W.book.average3.loading?"\u8BA1\u7B97\u4E2D...":W.book.average3.value),i.createElement(f,{onClick:function(){return C.computedObjects.runGroup("average")}},"\u6267\u884C\u7EC4Average\u8BA1\u7B97\u51FD\u6570"))}});case 16:case"end":return O.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-computed-run-demo-1":{component:i.memo(i.lazy(U()(x()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D,O,R,A;return x()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=W.sent,n=I.createStore,o=I.computed,l=I.delay,W.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return v=W.sent,r=v.Divider,_=v.ColorBlock,f=v.Button,S=v.Input,N=0,C={book:{name:"Zhang",count:4,price:100,total1:o(function(){var k=U()(x()().mark(function Y(z){return x()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,l();case 2:return Q.abrupt("return",z.count*z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return k.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total"}),total2:o(function(){var k=U()(x()().mark(function Y(z){return x()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,l();case 2:return Q.abrupt("return",z.count*z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return k.apply(this,arguments)}}(),["book.count","book.price"],{async:!0,group:"total",initial:100,enable:!1}),total3:o(function(){var k=U()(x()().mark(function Y(z){return x()().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.next=2,l();case 2:return Q.abrupt("return",z.count*z.price);case 3:case"end":return Q.stop()}},Y)}));return function(Y){return k.apply(this,arguments)}}(),[],{async:!0,group:"total"})}},D=n(C),O=D.useState,R=D.computedObjects,A=D.bind,W.abrupt("return",{default:function(){var Y=O(),z=L()(Y,1),H=z[0];return i.createElement("div",null,i.createElement(_,{name:"BookName"},H.book.name),i.createElement(_,{name:"count"},i.createElement("div",{style:{display:"flex",alignItems:"center"}},i.createElement(f,{onClick:function(){return H.book.count--}},"-"),i.createElement(S,d()({value:H.book.count},A("book.count"))),i.createElement(f,{onClick:function(){return H.book.count++}},"+"))),i.createElement(_,{name:"price"}," ",i.createElement(S,d()({value:H.book.price},A("book.price")))),i.createElement(r,{title:"Total Group"}),i.createElement("table",{className:"table table-bordered"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,"Total1 ="),i.createElement("td",null,H.book.total1.loading?"\u8BA1\u7B97\u4E2D...":H.book.total1.value),i.createElement("td",null,"\u9ED8\u8BA4\u81EA\u52A8\u8BA1\u7B97")),i.createElement("tr",null,i.createElement("td",null,"Total2 ="),i.createElement("td",null,H.book.total2.loading?"\u8BA1\u7B97\u4E2D...":H.book.total2.value),i.createElement("td",null,"\u7981\u7528\u8BA1\u7B97\uFF0C\u6307\u5B9A\u4E86\u9ED8\u8BA4\u503C(",i.createElement("input",{type:"checkbox",checked:R.get("book/total2")}),")")),i.createElement("tr",null,i.createElement("td",null,"Total3 ="),i.createElement("td",null,H.book.total3.loading?"\u8BA1\u7B97\u4E2D...":H.book.total3.value),i.createElement("td",null,"\u65E0\u4F9D\u8D56\uFF0C\u9700\u8981\u624B\u52A8\u8BA1\u7B97")))),i.createElement(f,{onClick:function(){return R.runGroup("total")}},"\u6267\u884C\u7EC4total\u8BA1\u7B97\u51FD\u6570"))}});case 17:case"end":return W.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-computed-run-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(x()().mark(function n(){var o,l=arguments;return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}}}},87237:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(87975),P=e(28524),U=e(48611),i={"docs-guide-computed-scope-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=o.sent,E=g.ObserverScopeRef,b=g.useStore,o.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return m=o.sent,I=m.ColorBlock,o.abrupt("return",{default:function(){var v=b({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(f){return f.firstName+f.lastName}}},{scope:function(){return E.Current}}),r=v.state;return B.createElement("div",null,B.createElement(I,{name:"FullName"},r.user.fullName))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user",title:"ObserverScopeRef.Current"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-computed-scope-demo-1":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=o.sent,E=g.useStore,b=g.ObserverScopeRef,o.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return m=o.sent,I=m.ColorBlock,o.abrupt("return",{default:function(){var v=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(f){return f.user.firstName+f.user.lastName}}},{scope:b.Root}),r=v.state;return B.createElement("div",null,B.createElement(I,{name:"FullName"},r.user.fullName))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===",title:"ObserverScopeRef.Root"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-computed-scope-demo-2":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o;return d()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=v.sent,E=g.createStore,b=g.ObserverScopeRef,v.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return m=v.sent,I=m.ColorBlock,n=E({parent:{user:{firstName:"Zhang",lastName:"Fisher",fullName:function(_){return _.user.firstName+_.user.lastName}}}},{scope:b.Parent}),o=n.state,v.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(I,{name:"FullName"},o.parent.user.fullName))}});case 11:case"end":return v.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===parent",title:"ObserverScopeRef.Parent"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-computed-scope-demo-3":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=l.sent,E=g.createStore,l.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=l.sent,m=b.ColorBlock,I=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(r){return r},address:{city:"Quanzhou"}}},{scope:"user.address.city"}),n=I.state,l.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(m,{name:"FullName"},n.user.fullName))}});case 10:case"end":return l.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address.city",title:"<\u5B57\u7B26\u4E32>"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-computed-scope-demo-4":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=l.sent,E=g.createStore,l.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=l.sent,m=b.ColorBlock,I=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(r){return r},address:{"main.city":"Quanzhou"}}},{scope:["user","address","main.city"]}),n=I.state,l.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(m,{name:"FullName"},n.user.fullName))}});case 10:case"end":return l.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-4",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope===user.address['main.city']",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4 >"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-computed-scope-demo-5":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=r.sent,E=g.createStore,b=g.computed,m=g.ObserverScopeRef,r.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=r.sent,n=I.ColorBlock,o=E({user:{firstName:"Zhang",lastName:"Fisher",fullName:b(function(){var _=L()(d()().mark(function f(S){return d()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.abrupt("return",S[0]+S[1]);case 1:case"end":return C.stop()}},f)}));return function(f){return _.apply(this,arguments)}}(),["user.firstName","user.lastName"],{async:!0,scope:m.Depends})}}),l=o.state,r.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(n,{name:"FullName"},l.user.fullName.value))}});case 12:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-computed-scope-demo-5",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"scope==[firstName,lastName]",title:"<\u5B57\u7B26\u4E32\u6570\u7EC4>"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},46369:function(te,y,e){e.r(y),e.d(y,{demos:function(){return g}});var G=e(29008),d=e.n(G),K=e(28633),L=e.n(K),B=e(70958),x=e.n(B),P=e(92379),U=e(48120),i=e(28524),j=e(48611),g={"docs-guide-computed-sync-demo-0":{component:P.memo(P.lazy(x()(d()().mark(function E(){var b,m,I,n,o,l;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=r.sent,m=b.createStore,r.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=r.sent,n=I.ColorBlock,o=I.Button,l=m({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(f){return f.firstName+f.lastName}}}),r.abrupt("return",{default:function(){var f=l.useState(),S=L()(f,2),N=S[0],C=S[1];return P.createElement("div",null,P.createElement(n,{name:"First Name"},N.user.firstName),P.createElement(n,{name:"Last Name"},N.user.lastName),P.createElement(n,{name:"Full Name"},N.user.fullName),P.createElement(o,{onClick:function(){return C(function(O){return O.user.firstName="\u2764\uFE0F"+O.user.firstName})}},"Change First Name"),P.createElement(o,{onClick:function(){return C(function(O){return O.user.lastName+="\u2600\uFE0F"})}},"Change Last Name"))}});case 11:case"end":return r.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(d()().mark(function m(){var I,n=arguments;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}},"docs-guide-computed-sync-demo-1":{component:P.memo(P.lazy(x()(d()().mark(function E(){var b,m,I,n,o;return d()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=v.sent,m=b.createStore,v.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=v.sent,n=I.Button,o=m({books:[{name:"\u5F20\u4E09",price:18,author:"tom",count:2,total:function(_){return _.price*_.count}},{name:"\u674E\u56DB",price:19,author:"jack",count:3,total:function(_){return _.price*_.count}}],total:function(_){return _.books.reduce(function(f,S){return f+S.total},0)}}),v.abrupt("return",{default:function(){var _=o.useState(),f=L()(_,2),S=f[0],N=f[1];return P.createElement("table",{className:"table table-bordered table-hover"},P.createElement("thead",null,P.createElement("tr",null,P.createElement("th",null,"\u4E66\u540D"),P.createElement("th",null,"\u4F5C\u8005"),P.createElement("th",null,"\u5355\u4EF7"),P.createElement("th",null,"\u6570\u91CF"),P.createElement("th",null,"\u5C0F\u8BA1"))),P.createElement("tbody",null,S.books.map(function(C,D){return P.createElement("tr",{key:D},P.createElement("td",null,C.name),P.createElement("td",null,C.author),P.createElement("td",null,C.price),P.createElement("td",null,P.createElement(n,{onClick:function(){return o.state.books[D].count--}},"-"),C.count,P.createElement(n,{onClick:function(){return o.state.books[D].count++}},"+")),P.createElement("td",null,C.total))}),P.createElement("tr",null,P.createElement("td",{colSpan:4},"\u603B\u8BA1"),P.createElement("td",null,S.total))))}});case 10:case"end":return v.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-computed-sync-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,ObserverScopeRef } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(d()().mark(function m(){var I,n=arguments;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}}}},23522:function(te,y,e){var G;e.r(y),e.d(y,{demos:function(){return b}});var d=e(29008),K=e.n(d),L=e(28633),B=e.n(L),x=e(70958),P=e.n(x),U=e(92379),i=e(89004),j=e(28524),g=e(48611),E=e(53225),b={"docs-guide-debug-circular-dependency-demo-0":{component:U.memo(U.lazy(P()(K()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C;return K()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=O.sent,n=I.useStore,o=I.computed,O.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return l=O.sent,v=l.ColorBlock,r=l.Button,_=l.JsonView,O.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return f=O.sent,S=f.useState,O.next=17,Promise.resolve().then(e.bind(e,53225));case 17:return N=O.sent,C=N.installCycleDetectExtend,C({onDetected:function(A){return console.error("\u53D1\u73B0\u5FAA\u73AF\u4F9D\u8D56:",A),"disable"}}),O.abrupt("return",{default:function(){var A=S(null),$=B()(A,2),W=$[0],k=$[1],Y=n({x:1,a:o(function(){var ee=P()(K()().mark(function X(ae){return K()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return de.abrupt("return",ae.b.value+ae.x);case 1:case"end":return de.stop()}},X)}));return function(X){return ee.apply(this,arguments)}}(),["b","x"]),b:o(function(){var ee=P()(K()().mark(function X(ae){return K()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return de.abrupt("return",ae.a.value+ +ae.x);case 1:case"end":return de.stop()}},X)}));return function(X){return ee.apply(this,arguments)}}(),["a","x"])},{debug:!0}),z=Y.useState(),H=B()(z,1),Q=H[0];return U.createElement("div",null,U.createElement(v,{name:"x"},U.createElement(r,{onClick:function(){return Y.state.x--}},"-"),Y.$("x"),U.createElement(r,{onClick:function(){return Y.state.x++}},"+")),U.createElement("div",{style:{color:"red"}},W),U.createElement(_,{data:Q}))}});case 21:case"end":return O.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-debug-circular-dependency-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"@autostorejs/devtools":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7531\u4E8Ea,b\u5B58\u5728\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u5185\u90E8\u4F1A\u5FFD\u7565a,b\u7684\u8BA1\u7B97\uFF0C\u5BFC\u81F4a,b\u7684\u503C\u4E3A\u65E0\u6CD5\u8BA1\u7B97\u3002",title:"\u6253\u5F00\u63A7\u5236\u53F0\u89C2\u5BDF\u4FE1\u606F"},context:{"@autostorejs/react":j,"x-react-components":g,react:G||(G=e.t(U,2)),"@autostorejs/devtools":E},renderOpts:{compile:function(){var m=P()(K()().mark(function n(){var o,l=arguments;return K()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}}}},21037:function(te,y,e){e.r(y),e.d(y,{demos:function(){return g}});var G=e(28633),d=e.n(G),K=e(29008),L=e.n(K),B=e(70958),x=e.n(B),P=e(92379),U=e(93359),i=e(28524),j=e(48611),g={"docs-guide-debug-dev-tools-demo-0":{component:P.memo(P.lazy(x()(L()().mark(function E(){var b,m,I,n,o,l,v,r,_,f;return L()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=N.sent,m=b.createStore,I=b.computed,N.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return n=N.sent,o=n.Button,l=n.ColorBlock,v=m({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(D){return D.firstName+D.lastName},salary:I(function(){var C=x()(L()().mark(function D(O){return L()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.abrupt("return",O.age*10);case 1:case"end":return A.stop()}},D)}));return function(D){return C.apply(this,arguments)}}(),["age"])},{debug:!0,id:"user"}),r=v.state,_=v.useState,f=v.$,N.abrupt("return",{default:function(){var D=_("age"),O=d()(D,2),R=O[0],A=O[1],$=_("salary"),W=d()($,2),k=W[0],Y=W[1],z=_(function(X){return X.lastName},function(X,ae){return ae.lastName=X}),H=d()(z,2),Q=H[0],ee=H[1];return P.createElement("div",null,P.createElement(l,null,"Fullname :",r.firstName," ",Q),P.createElement(l,null,"Age :",R),P.createElement(l,null,"Salary: ",f("salary")),P.createElement(o,{onClick:function(){return A(R+1)}},"Age++"),P.createElement(o,{onClick:function(){return ee(Q+".")}},"Change lastName"))}});case 12:case"end":return N.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-debug-dev-tools-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(L()().mark(function m(){var I,n=arguments;return L()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}}}},46365:function(te,y,e){var G;e.r(y),e.d(y,{demos:function(){return j}});var d=e(29008),K=e.n(d),L=e(70958),B=e.n(L),x=e(92379),P=e(6205),U=e(28524),i=e(48611),j={"docs-guide-debug-log-demo-0":{component:x.memo(x.lazy(B()(K()().mark(function g(){var E,b,m,I,n,o,l,v,r,_;return K()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return E=S.sent,b=E.useStore,m=E.computed,S.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return I=S.sent,n=I.Box,o=I.Button,l=I.ColorBlock,S.next=13,Promise.resolve().then(e.t.bind(e,92379,19));case 13:return v=S.sent,r=v.useRef,_=function(C){return C.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},S.abrupt("return",{default:function(){var C=r(),D=b({price:100,count:2,total:m(function(A){return A.price*A.count})},{debug:!0,log:function($){var W=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"info",k=typeof $=="function"?$():$ instanceof Error?$.message:$;C.current&&C.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        <b>[`.concat(W,"]</b> - ").concat(_(k),"</p>"))}}),O=D.state,R=D.$;return x.createElement("div",null,x.createElement(l,{name:"Price"},R("price")),x.createElement(l,{name:"Count"},x.createElement(o,{onClick:function(){return O.count--}},"-"),R("count"),x.createElement(o,{onClick:function(){return O.count++}},"+")),x.createElement(l,{name:"Total"},R("total")),x.createElement(o,{onClick:function(){return C.current.innerHTML=""}},"Clear"),x.createElement(n,{ref:C}))}});case 17:case"end":return S.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-guide-debug-log-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u8C03\u8282count\u503C\uFF0C\u67E5\u770B\u65E5\u5FD7\u8F93\u51FA",title:"\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA"},context:{"@autostorejs/react":U,"x-react-components":i,react:G||(G=e.t(x,2))},renderOpts:{compile:function(){var g=B()(K()().mark(function b(){var m,I=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(m=o.sent).default.apply(m,I));case 3:case"end":return o.stop()}},b)}));function E(){return g.apply(this,arguments)}return E}()}}}},13933:function(te,y,e){var G;e.r(y),e.d(y,{demos:function(){return j}});var d=e(29008),K=e.n(d),L=e(70958),B=e.n(L),x=e(92379),P=e(42246),U=e(28524),i=e(48611),j={"docs-guide-debug-trace-demo-0":{component:x.memo(x.lazy(B()(K()().mark(function g(){var E,b,m,I,n,o,l,v,r,_;return K()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return E=S.sent,b=E.createStore,S.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return m=S.sent,I=m.Box,S.next=10,Promise.resolve().then(e.t.bind(e,92379,19));case 10:return n=S.sent,o=n.useRef,l=n.useEffect,v=b({a:1,b:2,c:function(C){return C.a+C.b}}),r=v.state,_=v.trace,S.abrupt("return",{default:function(){var C=o();return l(function(){var D=_(function(){r.a=10,r.b=20});D.start().then(function(O){O.forEach(function(R){C.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat(R.type," ").concat(R.path.join("."),"</p>"))})})},[]),x.createElement(I,{ref:C})}});case 15:case"end":return S.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":U,"x-react-components":i,react:G||(G=e.t(x,2))},renderOpts:{compile:function(){var g=B()(K()().mark(function b(){var m,I=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(m=o.sent).default.apply(m,I));case 3:case"end":return o.stop()}},b)}));function E(){return g.apply(this,arguments)}return E}()}},"docs-guide-debug-trace-demo-1":{component:x.memo(x.lazy(B()(K()().mark(function g(){var E,b,m,I,n,o,l,v,r,_,f,S;return K()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return E=C.sent,b=E.createStore,m=E.computed,I=E.delay,C.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return n=C.sent,o=n.Box,C.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return l=C.sent,v=l.useRef,r=l.useEffect,_=b({a:1,b:2,c:m(function(){var D=B()(K()().mark(function O(R){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",R.a+R.b);case 1:case"end":return $.stop()}},O)}));return function(O){return D.apply(this,arguments)}}(),["a","b"])}),f=_.state,S=_.trace,C.abrupt("return",{default:function(){var O=v();return r(function(){var R=S(B()(K()().mark(function A(){return K()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return f.a=10,W.next=3,I();case 3:f.b=20;case 4:case"end":return W.stop()}},A)})));R.start().then(function(A){A.forEach(function($){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat($.type," ").concat($.path.join("."),"</p>"))})})},[]),x.createElement(o,{ref:O})}});case 17:case"end":return C.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"c\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4F9D\u8D56\u4E8Ea\u548Cb\uFF0C\u5F53a\u6216b\u53D8\u5316\u65F6\uFF0Cc\u4F1A\u91CD\u65B0\u8BA1\u7B97",title:"\u5F02\u6B65\u8DDF\u8E2A"},context:{"@autostorejs/react":U,"x-react-components":i,react:G||(G=e.t(x,2))},renderOpts:{compile:function(){var g=B()(K()().mark(function b(){var m,I=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(m=o.sent).default.apply(m,I));case 3:case"end":return o.stop()}},b)}));function E(){return g.apply(this,arguments)}return E}()}},"docs-guide-debug-trace-demo-2":{component:x.memo(x.lazy(B()(K()().mark(function g(){var E,b,m,I,n,o,l,v,r,_,f,S;return K()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return E=C.sent,b=E.createStore,m=E.computed,I=E.delay,C.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return n=C.sent,o=n.Box,C.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return l=C.sent,v=l.useRef,r=l.useEffect,_=b({a:1,b:2,c:m(function(){var D=B()(K()().mark(function O(R){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",R.a+R.b);case 1:case"end":return $.stop()}},O)}));return function(O){return D.apply(this,arguments)}}(),["a","b"]),d:m(function(){var D=B()(K()().mark(function O(R){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",R.c.value+1);case 1:case"end":return $.stop()}},O)}));return function(O){return D.apply(this,arguments)}}(),["c"])}),f=_.state,S=_.trace,C.abrupt("return",{default:function(){var O=v();return r(function(){var R=S(B()(K()().mark(function A(){return K()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return f.a=10,W.next=3,I();case 3:f.b=20;case 4:case"end":return W.stop()}},A)})));R.start().then(function(A){A.forEach(function($){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat($.type," ").concat($.path.join("."),"</p>"))})})},[]),x.createElement(o,{ref:O})}});case 17:case"end":return C.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":U,"x-react-components":i,react:G||(G=e.t(x,2))},renderOpts:{compile:function(){var g=B()(K()().mark(function b(){var m,I=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(m=o.sent).default.apply(m,I));case 3:case"end":return o.stop()}},b)}));function E(){return g.apply(this,arguments)}return E}()}},"docs-guide-debug-trace-demo-3":{component:x.memo(x.lazy(B()(K()().mark(function g(){var E,b,m,I,n,o,l,v,r,_,f,S;return K()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return E=C.sent,b=E.createStore,m=E.computed,I=E.delay,C.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return n=C.sent,o=n.Box,C.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return l=C.sent,v=l.useRef,r=l.useEffect,_=b({a:1,b:2,c:m(function(){var D=B()(K()().mark(function O(R){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",R.a+R.b);case 1:case"end":return $.stop()}},O)}));return function(O){return D.apply(this,arguments)}}(),["a","b"]),d:m(function(){var D=B()(K()().mark(function O(R){return K()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.abrupt("return",R.c.value+1);case 1:case"end":return $.stop()}},O)}));return function(O){return D.apply(this,arguments)}}(),["c"])}),f=_.state,S=_.trace,C.abrupt("return",{default:function(){var O=v();return r(function(){var R=S(B()(K()().mark(function A(){return K()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return f.a=10,W.next=3,I();case 3:f.b=20;case 4:case"end":return W.stop()}},A)})));R.start(function(A){if(A.type=="set"&&A.path.length===2&&A.path[0]==="d"&&A.path[1]==="value")return!0}).then(function(A){A.forEach(function($){O.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        `.concat($.type," ").concat($.path.join("."),"</p>"))})})},[]),x.createElement(o,{ref:O})}});case 17:case"end":return C.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-guide-debug-trace-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":U,"x-react-components":i,react:G||(G=e.t(x,2))},renderOpts:{compile:function(){var g=B()(K()().mark(function b(){var m,I=arguments;return K()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(9039).then(e.bind(e,39039));case 2:return o.abrupt("return",(m=o.sent).default.apply(m,I));case 3:case"end":return o.stop()}},b)}));function E(){return g.apply(this,arguments)}return E}()}}}},31996:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(76233),K={}},15274:function(te,y,e){e.r(y),e.d(y,{demos:function(){return b}});var G=e(29008),d=e.n(G),K=e(24325),L=e.n(K),B=e(28633),x=e.n(B),P=e(70958),U=e.n(P),i=e(92379),j=e(97820),g=e(28524),E=e(48611),b={"docs-guide-form-bind-demo-0":{component:i.memo(i.lazy(U()(d()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C;return d()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=O.sent,n=I.createStore,O.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return o=O.sent,l=o.ColorBlock,v=o.Button,r=o.Input,_=n({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,fullName:function(A){return A.firstName+A.lastName}}}),f=_.state,S=_.$,N=_.bind,C=_.useState,O.abrupt("return",{default:function(){var A=C("user.firstName"),$=x()(A,2),W=$[0],k=$[1],Y=C("user.lastName"),z=x()(Y,2),H=z[0],Q=z[1],ee=C("user.vip"),X=x()(ee,2),ae=X[0],me=X[1];return i.createElement("div",null,i.createElement(r,L()(L()({label:"First Name"},N("user.firstName")),{},{value:W})),i.createElement(r,L()(L()({label:"last Name"},N("user.lastName")),{},{value:H})),i.createElement(r,L()(L()({type:"checkbox",label:"VIP"},N("user.vip")),{},{value:ae})),i.createElement(l,{name:"First Name"},S("user.firstName")),i.createElement(l,{name:"Last Name"},S("user.lastName")),i.createElement(l,{name:"Full Name"},S("user.fullName")),i.createElement(l,{name:"VIP"},S("user.vip")),i.createElement(v,{onClick:function(){k("Zhang"),Q("Fisher")}},"Reset"))}});case 12:case"end":return O.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-bind-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(d()().mark(function n(){var o,l=arguments;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}}}},55106:function(te,y,e){e.r(y),e.d(y,{demos:function(){return g}});var G=e(29008),d=e.n(G),K=e(24325),L=e.n(K),B=e(70958),x=e.n(B),P=e(92379),U=e(12357),i=e(28524),j=e(48611),g={"docs-guide-form-use-bindings-demo-0":{component:P.memo(P.lazy(x()(d()().mark(function E(){var b,m,I,n,o,l,v;return d()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=_.sent,m=b.useStore,_.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=_.sent,n=I.Layout,o=I.ColorBlock,l=I.Button,v=I.Input,_.abrupt("return",{default:function(){var S=m({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),N=S.state,C=S.$,D=S.useBindings,O=D();return P.createElement(n,null,P.createElement("div",null,P.createElement(v,L()({label:"First Name"},O.user.firstName)),P.createElement(v,L()({label:"last Name"},O.user.lastName)),P.createElement(v,L()({label:"Age"},O.user.age)),P.createElement(v,L()({type:"checkbox",label:"VIP"},O.user.vip)),P.createElement(l,{onClick:function(){N.user.firstName="Zhang",N.user.lastName="Fisher",N.user.age=18,N.user.vip=!1}},"Reset")),P.createElement("div",null,P.createElement(o,{name:"First Name"},C("user.firstName")),P.createElement(o,{name:"Last Name"},C("user.lastName")),P.createElement(o,{name:"Age"},C("user.age")),P.createElement(o,{name:"VIP"},C("user.vip"))))}});case 12:case"end":return _.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-bindings-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(d()().mark(function m(){var I,n=arguments;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}}}},9887:function(te,y,e){e.r(y),e.d(y,{demos:function(){return b}});var G=e(28633),d=e.n(G),K=e(29008),L=e.n(K),B=e(24325),x=e.n(B),P=e(70958),U=e.n(P),i=e(92379),j=e(36044),g=e(28524),E=e(48611),b={"docs-guide-form-use-field-demo-0":{component:i.memo(i.lazy(U()(L()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D;return L()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=R.sent,n=I.createStore,R.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return o=R.sent,l=o.ColorBlock,v=o.Button,r=o.Input,_=n({user:{firstName:"Zhang",lastName:"Fisher",vip:!1,job:"unknown"}}),f=_.state,S=_.$,N=_.bind,C=_.useState,D=_.useField,R.abrupt("return",{default:function(){var $=D("user.firstName"),W=D("user.lastName"),k=D("user.vip"),Y=D("user.job");return i.createElement("div",null,i.createElement(r,x()({label:"First Name"},$)),i.createElement(r,x()({label:"last Name"},W)),i.createElement(r,x()({type:"checkbox",label:"VIP"},k)),i.createElement(l,{name:"Job"},i.createElement("select",x()({id:"job"},Y),i.createElement("option",{value:"1"},"Engineer"),i.createElement("option",{value:"2"},"Doctor"),i.createElement("option",{value:"3"},"Teacher"))),i.createElement(l,{name:"First Name"},S("user.firstName")),i.createElement(l,{name:"Last Name"},S("user.lastName")),i.createElement(l,{name:"VIP"},S("user.vip")),i.createElement(l,{name:"Job"},S("user.job")),i.createElement(v,{onClick:function(){setFirstName("Zhang"),setLastName("Fisher")}},"Reset"))}});case 12:case"end":return R.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"useField"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(L()().mark(function n(){var o,l=arguments;return L()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-form-use-field-demo-1":{component:i.memo(i.lazy(U()(L()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C,D;return L()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=R.sent,n=I.createStore,R.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return o=R.sent,l=o.ColorBlock,v=o.Button,r=o.Input,_=n({user:{firstName:"Zhang",lastName:"Fisher"}}),f=_.state,S=_.$,N=_.bind,C=_.useState,D=_.useField,R.abrupt("return",{default:function(){var $=D(function(W){return W.user.firstName+" "+W.user.lastName},function(W,k){var Y=W.split(/\s+/),z=d()(Y,2),H=z[0],Q=z[1];k.user.firstName=H,k.user.lastName=Q});return i.createElement("div",null,i.createElement(r,x()({label:"FullName"},$)),i.createElement(l,{name:"First Name"},S("user.firstName")),i.createElement(l,{name:"Last Name"},S("user.lastName")),i.createElement(v,{onClick:function(){f.user.firstName="Zhang",f.user.lastName="Fisher"}},"Reset"))}});case 12:case"end":return R.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"FullName\u8F93\u5165\u6846\u4E2D\u7684firstName\u548ClastName\u4F7F\u7528\u7A7A\u683C\u5206\u5F00",title:"onInput"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(L()().mark(function n(){var o,l=arguments;return L()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-form-use-field-demo-2":{component:i.memo(i.lazy(U()(L()().mark(function m(){var I,n,o,l,v,r,_,f,S,N,C;return L()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=O.sent,n=I.createStore,O.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return o=O.sent,l=o.ColorBlock,v=o.Button,r=o.Input,_=n({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}}),f=_.state,S=_.$,N=_.bind,C=_.useField,O.abrupt("return",{default:function(){var A=C("user");return i.createElement("div",null,i.createElement(r,x()({label:"First Name"},A.firstName)),i.createElement(r,x()({label:"last Name"},A.lastName)),i.createElement(r,x()({label:"Age"},A.age)),i.createElement(r,x()({type:"checkbox",label:"VIP"},A.vip)),i.createElement(l,{name:"First Name"},S("user.firstName")),i.createElement(l,{name:"Last Name"},S("user.lastName")),i.createElement(l,{name:"Age"},S("user.age")),i.createElement(l,{name:"VIP"},S("user.vip")),i.createElement(v,{onClick:function(){f.user.firstName="Zhang",f.user.lastName="Fisher",f.user.age=18,f.user.vip=!1}},"Reset"))}});case 12:case"end":return O.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u6846\u7684\u503C\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u72B6\u6001\u4E2D\u3002",title:"onInput"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(L()().mark(function n(){var o,l=arguments;return L()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}},"docs-guide-form-use-field-demo-3":{component:i.memo(i.lazy(U()(L()().mark(function m(){var I,n,o,l,v,r;return L()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return I=f.sent,n=I.useStore,f.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return o=f.sent,l=o.ColorBlock,v=o.Button,r=o.Input,f.abrupt("return",{default:function(){var N=n({firstName:"Zhang",lastName:"Fisher",age:18,vip:!1}),C=N.state,D=N.$,O=N.bind,R=N.useField,A=R();return i.createElement("div",null,i.createElement(r,x()({label:"First Name"},A.firstName)),i.createElement(r,x()({label:"last Name"},A.lastName)),i.createElement(r,x()({label:"Age"},A.age)),i.createElement(r,x()({type:"checkbox",label:"VIP"},A.vip)),i.createElement(l,{name:"First Name"},D("firstName")),i.createElement(l,{name:"Last Name"},D("lastName")),i.createElement(l,{name:"Age"},D("age")),i.createElement(l,{name:"VIP"},D("vip")),i.createElement(v,{onClick:function(){C.firstName="Zhang",C.lastName="Fisher",C.age=18,C.vip=!1}},"Reset"))}});case 11:case"end":return f.stop()}},m)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-field-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u53CC\u5411\u7ED1\u5B9A\u6839\u72B6\u6001\u3002",title:"onInput"},context:{"@autostorejs/react":g,"x-react-components":E},renderOpts:{compile:function(){var m=U()(L()().mark(function n(){var o,l=arguments;return L()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(9039).then(e.bind(e,39039));case 2:return r.abrupt("return",(o=r.sent).default.apply(o,l));case 3:case"end":return r.stop()}},n)}));function I(){return m.apply(this,arguments)}return I}()}}}},4493:function(te,y,e){e.r(y),e.d(y,{demos:function(){return g}});var G=e(29008),d=e.n(G),K=e(28633),L=e.n(K),B=e(70958),x=e.n(B),P=e(92379),U=e(79247),i=e(28524),j=e(48611),g={"docs-guide-form-use-form-demo-0":{component:P.memo(P.lazy(x()(d()().mark(function E(){var b,m,I,n,o,l,v,r,_,f;return d()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=N.sent,m=b.useStore,N.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=N.sent,n=I.TextArea,o=I.Layout,l=I.Button,v=I.Input,r=I.CheckBox,_=I.JsonView,f=I.Select,N.abrupt("return",{default:function(){var D=m({user:{firstName:"Zhang",lastName:"Fisher",age:18,vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),O=D.state,R=D.$,A=D.useForm,$=D.useState,W=$(),k=L()(W,1),Y=k[0],z=A(),H=z.Form;return P.createElement(o,null,P.createElement("div",null,P.createElement(H,null,P.createElement(v,{name:"user.firstName",label:"First Name"}),P.createElement(v,{name:"user.lastName",label:"lastName"}),P.createElement(v,{name:"user.age",label:"Age"}),P.createElement(f,{name:"user.job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),P.createElement(n,{name:"user.resume",label:"Resume"}),P.createElement(r,{name:"user.vip",label:"VIP"})),P.createElement(l,{onClick:function(){O.user.firstName="Zhang",O.user.lastName="Fisher",O.user.age=18,O.user.vip=!1}},"Reset")),P.createElement("div",null,P.createElement(_,{data:Y})))}});case 15:case"end":return N.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(d()().mark(function m(){var I,n=arguments;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}},"docs-guide-form-use-form-demo-1":{component:P.memo(P.lazy(x()(d()().mark(function E(){var b,m,I,n,o,l,v,r,_,f,S;return d()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=C.sent,m=b.useStore,C.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=C.sent,n=I.TextArea,o=I.Layout,l=I.ColorBlock,v=I.Button,r=I.Input,_=I.CheckBox,f=I.JsonView,S=I.Select,C.abrupt("return",{default:function(){var O=m({user:{firstName:"Zh",lastName:"Fi",age:"18n",email:"",vip:!1,job:1,resume:"\u975E\u8457\u540D\u5F00\u6E90\u8F6F\u4EF6\u5F00\u53D1\u8005"}}),R=O.state,A=O.$,$=O.useForm,W=O.useState,k=W(),Y=L()(k,1),z=Y[0],H=$({validate:function(me,de){if(me=="user.firstName")return de.length>3;if(me=="user.lastName")return de.length>3;if(me=="user.age")return!isNaN(parseFloat(de))&&isFinite(de)&&parseInt(de)>0}}),Q=H.Form,ee=H.valid,X=H.dirty;return P.createElement(o,null,P.createElement("div",null,P.createElement(l,{name:"\u6709\u6548"},String(ee)),P.createElement(l,{name:"\u810F"},String(X)),P.createElement(Q,null,P.createElement(r,{name:"user.firstName",label:"First Name","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),P.createElement(r,{name:"user.lastName",label:"lastName","data-error-tips":"\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E3"}),P.createElement(r,{name:"user.age",label:"Age","data-error-tips":"\u5FC5\u987B\u662F\u5927\u4E8E0\u7684\u6570\u5B57"}),P.createElement(r,{name:"user.email",label:"Email",type:"email","data-error-tips":"\u5FC5\u987B\u8F93\u5165\u6709\u6548\u7684Email"}),P.createElement(S,{name:"job",label:"Job",items:[{title:"Engineer",value:1},{title:"Doctor",value:2},{title:"Teacher",value:3}]}),P.createElement(n,{name:"user.resume",label:"Resume","data-error-tips":"\u4E0D\u80FD\u5927\u4E8E20\u4E2A\u5B57\u7B26"}),P.createElement(_,{name:"user.vip",label:"VIP"})),P.createElement(v,{onClick:function(){R.user.firstName="Zhang",R.user.lastName="Fisher",R.user.age=18,R.user.vip=!1}},"Reset")),P.createElement("div",null,P.createElement(f,{data:z})))}});case 16:case"end":return C.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-form-use-form-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u8F93\u5165\u65E0\u6548\u7684\u6570\u636E\u770B\u770B\u4F1A\u53D1\u751F\u4EC0\u4E48",title:"\u8868\u5355\u8F93\u5165\u6821\u9A8C"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(d()().mark(function m(){var I,n=arguments;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}}}},50090:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(9159),K={}},91775:function(te,y,e){e.r(y),e.d(y,{demos:function(){return I}});var G=e(24325),d=e.n(G),K=e(12027),L=e.n(K),B=e(29008),x=e.n(B),P=e(28633),U=e.n(P),i=e(70958),j=e.n(i),g=e(92379),E=e(61077),b=e(28524),m=e(48611),I={"docs-guide-intro-get-started-demo-0":{component:g.memo(g.lazy(j()(x()().mark(function n(){var o,l,v,r,_,f,S,N,C,D,O,R;return x()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return o=$.sent,l=o.createStore,$.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return v=$.sent,r=v.ColorBlock,_=v.Button,f=v.Divider,S=v.Layout,N=v.JsonView,C=l({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:39.9,count:1,total:function(k){return k.price*k.count}}],total:function(k){return k.orders.reduce(function(Y,z){return Y+z.total},0)}}),D=C.state,O=C.$,R=C.useState,$.abrupt("return",{default:function(){var k=R(),Y=U()(k,1),z=Y[0];return g.createElement(S,null,g.createElement("div",null,g.createElement(r,{name:"\u4E66\u540D"},O("orders.0.book")),g.createElement(r,{name:"\u5355\u4EF7"},O("orders.0.price")),g.createElement(r,{name:"\u6570\u91CF"},g.createElement(_,{onClick:function(){return D.orders[0].count--}},"-"),O("orders.0.count"),g.createElement(_,{onClick:function(){return D.orders[0].count++}},"+")),g.createElement(r,{name:"\u5C0F\u8BA1"},O("orders.0.total")),g.createElement(f,null),g.createElement(r,{name:"\u603B\u8BA1"},O("total"))),g.createElement("div",null,g.createElement(N,{data:z})))}});case 14:case"end":return $.stop()}},n)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":m},renderOpts:{compile:function(){var n=j()(x()().mark(function l(){var v,r=arguments;return x()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,r));case 3:case"end":return f.stop()}},l)}));function o(){return n.apply(this,arguments)}return o}()}},"docs-guide-intro-get-started-demo-1":{component:g.memo(g.lazy(j()(x()().mark(function n(){var o,l,v,r,_,f,S,N,C,D,O;return x()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return o=A.sent,l=o.createStore,v=o.delay,r=o.computed,A.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return _=A.sent,f=_.Button,S=_.Table,N=l({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(W){return Math.floor(W.price*W.count)}}],discount:r(function(){var $=j()(x()().mark(function W(k){return x()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.next=2,v(2e3);case 2:return z.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return z.stop()}},W)}));return function(W){return $.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:r(function(){var $=j()(x()().mark(function W(k){return x()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.abrupt("return",(k.orders.reduce(function(H,Q){return H+Q.total},0)*k.discount.value).toFixed(2));case 1:case"end":return z.stop()}},W)}));return function(W){return $.apply(this,arguments)}}(),["discount"])}),C=N.state,D=N.$,O=N.useState,A.abrupt("return",{default:function(){var W=O(),k=U()(W,1),Y=k[0];return g.createElement("div",null,g.createElement(S,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(L()(Y.orders.map(function(z,H){return[z.book,"\uFFE5".concat(z.price),function(){return g.createElement("div",null,g.createElement(f,{onClick:function(){return z.count--}},"-"),z.count,g.createElement(f,{onClick:function(){return z.count++}},"+"))},"\uFFE5".concat(z.total)]})),[["\u6298\u6263",null,null,function(){return g.createElement(g.Fragment,null,D("discount"))}],["\u603B\u8BA1",null,null,function(){return g.createElement(g.Fragment,null,"\uFFE5",D("total"))}]])}))}});case 13:case"end":return A.stop()}},n)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":m},renderOpts:{compile:function(){var n=j()(x()().mark(function l(){var v,r=arguments;return x()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,r));case 3:case"end":return f.stop()}},l)}));function o(){return n.apply(this,arguments)}return o}()}},"docs-guide-intro-get-started-demo-2":{component:g.memo(g.lazy(j()(x()().mark(function n(){var o,l,v,r,_,f,S,N,C,D,O,R;return x()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return o=$.sent,l=o.createStore,v=o.delay,r=o.computed,$.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return _=$.sent,f=_.Button,S=_.Loading,N=_.Table,C=l({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:function(k){return Math.floor(k.price*k.count)}}],discount:r(function(){var W=j()(x()().mark(function k(Y){return x()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,v(2e3);case 2:return H.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return H.stop()}},k)}));return function(k){return W.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:r(function(){var W=j()(x()().mark(function k(Y){return x()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.next=2,v(2e3);case 2:return H.abrupt("return",(Y.orders.reduce(function(Q,ee){return Q+ee.total},0)*Y.discount.value).toFixed(2));case 3:case"end":return H.stop()}},k)}));return function(k){return W.apply(this,arguments)}}(),["discount"])}),D=C.state,O=C.$,R=C.useState,$.abrupt("return",{default:function(){var k=R(),Y=U()(k,1),z=Y[0];return g.createElement("div",null,g.createElement(N,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(L()(z.orders.map(function(H,Q){return[H.book,"\uFFE5".concat(H.price),function(){return g.createElement("div",null,g.createElement(f,{onClick:function(){return H.count--}},"-"),H.count,g.createElement(f,{onClick:function(){return H.count++}},"+"))},"\uFFE5".concat(H.total)]})),[["\u6298\u6263",null,null,function(){return g.createElement(g.Fragment,null,z.discount.loading?g.createElement(S,null):z.discount.value)}],["\u603B\u8BA1",null,null,function(){return g.createElement(g.Fragment,null,z.total.loading?g.createElement(S,null):z.total.value)}]])}))}});case 14:case"end":return $.stop()}},n)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":m},renderOpts:{compile:function(){var n=j()(x()().mark(function l(){var v,r=arguments;return x()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,r));case 3:case"end":return f.stop()}},l)}));function o(){return n.apply(this,arguments)}return o}()}},"docs-guide-intro-get-started-demo-3":{component:g.memo(g.lazy(j()(x()().mark(function n(){var o,l,v,r,_,f,S,N,C,D,O,R,A,$,W;return x()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return o=Y.sent,l=o.createStore,v=o.delay,r=o.computed,_=o.useStore,Y.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return f=Y.sent,S=f.Input,N=f.Button,C=f.Loading,D=f.Table,O=function(H){return Math.floor(H.price*H.count)},R=l({orders:[{book:"AutoStore\u6700\u4F73\u5B9E\u8DF5",price:10,count:1,total:O}],discount:r(function(){var z=j()(x()().mark(function H(Q){return x()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,v(2e3);case 2:return X.abrupt("return",(.5+Math.random()).toFixed(2));case 3:case"end":return X.stop()}},H)}));return function(H){return z.apply(this,arguments)}}(),["orders.*.total"],{initial:.9}),total:r(function(){var z=j()(x()().mark(function H(Q){return x()().wrap(function(X){for(;;)switch(X.prev=X.next){case 0:return X.next=2,v(2e3);case 2:return X.abrupt("return",(Q.orders.reduce(function(ae,me){return ae+me.total},0)*Q.discount.value).toFixed(2));case 3:case"end":return X.stop()}},H)}));return function(H){return z.apply(this,arguments)}}(),["discount"])}),A=R.state,$=R.$,W=R.useState,Y.abrupt("return",{default:function(){var H=W(),Q=U()(H,1),ee=Q[0],X=_({book:"\u7CBE\u901AAutoStore",price:10,count:1}),ae=X.state,me=X.useForm,de=me();return g.createElement("div",null,g.createElement(D,{title:"\u4E66\u5E97\u8BA2\u5355",cols:["<\u4E66\u540D","\u5355\u4EF7","\u6570\u91CF","\u5C0F\u8BA1"],rows:[].concat(L()(ee.orders.map(function(fe,ge){return[fe.book,"\uFFE5".concat(fe.price),function(){return g.createElement("div",null,g.createElement(N,{onClick:function(){return fe.count--}},"-"),fe.count,g.createElement(N,{onClick:function(){return fe.count++}},"+"))},"\uFFE5".concat(fe.total)]})),[["\u6298\u6263",null,null,function(){return g.createElement(g.Fragment,null,ee.discount.loading?g.createElement(C,null):ee.discount.value)}],["\u603B\u8BA1",null,null,function(){return g.createElement(g.Fragment,null,ee.total.loading?g.createElement(C,null):ee.total.value)}]])},g.createElement("form",de,g.createElement("h5",null,"\u65B0\u589E\u8BA2\u5355"),g.createElement(S,{name:"book"}),g.createElement(S,{name:"price"}),g.createElement(S,{name:"count"}),g.createElement(N,{onClick:function(){A.orders.push(d()(d()({},ae),{},{total:O}))}},"Add"))))}});case 17:case"end":return Y.stop()}},n)})))),asset:{type:"BLOCK",id:"docs-guide-intro-get-started-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,delay,computed,useStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":b,"x-react-components":m},renderOpts:{compile:function(){var n=j()(x()().mark(function l(){var v,r=arguments;return x()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,r));case 3:case"end":return f.stop()}},l)}));function o(){return n.apply(this,arguments)}return o}()}}}},74905:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(47315),K={}},41344:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(26916),K={}},10117:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(3694),K={}},31837:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(4180),P=e(28524),U=e(48611),i={"docs-guide-signal-about-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=r.sent,E=g.createStore,r.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=r.sent,m=b.Button,I=b.ColorBlock,n=E({age:18}),o=n.state,l=n.$,r.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(I,null,"Age+Signal :",l("age")),B.createElement(I,null,"Age :",o.age),B.createElement(m,{onClick:function(){return o.age=o.age+1}},"+Age"))}});case 11:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-about-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6,\u5185\u90E8\u4F1A\u8BA2\u9605age\u7684\u53D8\u66F4\u4E8B\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},11296:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(75690),K={}},14787:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(8767),P=e(28524),U=e(48611),i={"docs-guide-signal-computed-render-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=o.sent,E=g.useStore,o.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=o.sent,m=b.Button,I=b.ColorBlock,o.abrupt("return",{default:function(){var v=E({user:{age:18}}),r=v.state,_=v.$;return B.createElement("div",null,B.createElement(I,{name:"Age"},_(function(f){var S=f.value;return B.createElement("div",null,S)},function(f){return f.user.age})),B.createElement(m,{onClick:function(){return r.user.age++}},"+Age"))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-computed-render-demo-1":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=l.sent,E=g.useStore,b=g.computed,l.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return m=l.sent,I=m.Button,n=m.ColorBlock,l.abrupt("return",{default:function(){var r=E({user:{age:18}}),_=r.state,f=r.$;return B.createElement("div",null,B.createElement(n,{name:"Age"},f(function(S){var N=S.value;return B.createElement("div",null,N)},b(function(S){return S.user.age}))),B.createElement(I,{onClick:function(){return _.user.age++}},"+Age"))}});case 11:case"end":return l.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-computed-render-demo-2":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=r.sent,E=g.useStore,b=g.delay,m=g.computed,r.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=r.sent,n=I.Button,o=I.ColorBlock,l=I.Loading,r.abrupt("return",{default:function(){var f=E({order:{price:10,count:1}}),S=f.state,N=f.$;return B.createElement("div",null,B.createElement(o,{name:"Price"},N("order.price")),B.createElement(o,{name:"Count"},N("order.count")),B.createElement(o,{name:"Total"},N(function(C){var D=C.value,O=C.loading;return B.createElement("div",null,O?B.createElement(l,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},m(function(){var C=L()(d()().mark(function D(O){return d()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,b(1e3);case 2:return A.abrupt("return",O.order.price*O.order.count);case 3:case"end":return A.stop()}},D)}));return function(D){return C.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),B.createElement(n,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-computed-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},14727:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(63518),P=e(28524),U=e(48611),i={"docs-guide-signal-custom-render-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=o.sent,E=g.useStore,o.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=o.sent,m=b.Button,I=b.ColorBlock,o.abrupt("return",{default:function(){var v=E({user:{age:18}}),r=v.state,_=v.$;return B.createElement("div",null,B.createElement(I,{name:"Age"},_(function(f){var S=f.value;return B.createElement("div",{style:{position:"relative",display:"flex",alignItems:"center",color:"red",background:"white"}},B.createElement("span",{style:{flexGrow:1}},S),B.createElement(m,{onClick:function(){return r.user.age++}},"+Age"))},"user.age")))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-custom-render-demo-1":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o;return d()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=v.sent,E=g.useStore,b=g.delay,m=g.computed,v.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=v.sent,n=I.Button,o=I.ColorBlock,v.abrupt("return",{default:function(){var _=E({order:{price:100,count:1,total:m(function(){var D=L()(d()().mark(function O(R){return d()().wrap(function($){for(;;)switch($.prev=$.next){case 0:return $.next=2,b();case 2:return $.abrupt("return",R.price*R.count);case 3:case"end":return $.stop()}},O)}));return function(O){return D.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),f=_.state,S=_.$,N=_.useAsyncState,C=N("order.total");return B.createElement("div",null,B.createElement(o,{name:"Price"},S("order.price")),B.createElement(o,{name:"Count"},S("order.count")),B.createElement(o,{name:"Total",loading:C.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total.value")),B.createElement(o,{name:"Total",loading:C.loading,comment:"\u5EF6\u8FDF\u66F4\u65B0"},S("order.total")),B.createElement(n,{onClick:function(){return f.order.count++}},"+Count"))}});case 12:case"end":return v.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"order.total\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027",title:"\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-custom-render-demo-2":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l,v,r;return d()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=f.sent,E=g.createStore,b=g.computed,m=g.delay,f.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=f.sent,n=I.Button,o=I.ColorBlock,l=E({order:{price:100,count:1,total:b(function(){var S=L()(d()().mark(function N(C){return d()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,m(2e3);case 2:return O.abrupt("return",C.price*C.count);case 3:case"end":return O.stop()}},N)}));return function(N){return S.apply(this,arguments)}}(),["./price","./count"])}}),v=l.state,r=l.$,f.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(o,{name:"Price"},r("order.price")),B.createElement(o,{name:"Count"},r("order.count")),B.createElement(o,{name:"Total"},r(function(N){var C=N.value,D=N.loading;return B.createElement(B.Fragment,null,D&&B.createElement("span",null,"\u6B63\u5728\u8BA1\u7B97...\u23F3"),!D&&B.createElement("span",null,C,"\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}\u{1F4B8}"))},"order.total")),B.createElement(n,{onClick:function(){return v.order.count++}},"Count++"))}});case 13:case"end":return f.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-custom-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},67317:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(35371),K={}},5619:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(33358),P=e(28524),U=e(48611),i={"docs-guide-signal-state-render-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=o.sent,E=g.useStore,o.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=o.sent,m=b.Button,I=b.ColorBlock,o.abrupt("return",{default:function(){var v=E({user:{age:18}}),r=v.state,_=v.$;return B.createElement("div",null,B.createElement(I,{name:"Age"},_("user.age")),B.createElement(m,{onClick:function(){return r.user.age++}},"+Age"))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-state-render-demo-1":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l,v;return d()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=_.sent,E=g.createStore,_.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=_.sent,m=b.Button,I=b.ColorBlock,n=E({user:{firstName:"\u5F20",lastName:"\u4E09"}}),o=n.state,l=n.signal,v=n.$,_.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(I,{name:"FirstName"},v("user.firstName")),B.createElement(I,{name:"LastName"},v("user.lastName")),B.createElement(I,null,"FullName :",v(function(S){return S.user.firstName+" "+S.user.lastName})),B.createElement(I,null,"FullName :",v(function(S){return B.createElement("span",{style:{color:"yellow"}},S.user.firstName," - ",S.user.lastName)})),B.createElement(m,{onClick:function(){return o.user.firstName=o.user.firstName+"\u2764\uFE0F"}},"Change FirstName"),B.createElement(m,{onClick:function(){return o.user.lastName=o.user.lastName+"\u2708\uFE0F"}},"Change LastName"))}});case 11:case"end":return _.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed,delay } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-state-render-demo-2":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l,v,r;return d()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=f.sent,E=g.createStore,b=g.delay,m=g.computed,f.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=f.sent,n=I.Button,o=I.ColorBlock,l=E({order:{price:100,count:1,total:m(function(){var S=L()(d()().mark(function N(C){return d()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,b(1e3);case 2:return O.abrupt("return",C.price*C.count);case 3:case"end":return O.stop()}},N)}));return function(N){return S.apply(this,arguments)}}(),["order.price","order.count"],{initial:100})}}),v=l.state,r=l.$,f.abrupt("return",{default:function(){return B.createElement("div",null,B.createElement(o,{name:"Price"},r("order.price")),B.createElement(o,{name:"Count"},r("order.count")),B.createElement(o,{name:"Total"},r("order.total.value"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),B.createElement(o,{name:"Total"},r("order.total"),"\xA0\xA0-\xA0\xA0\u5EF6\u8FDF\u66F4\u65B0"),B.createElement(n,{onClick:function(){return v.order.count++}},"+Count"))}});case 13:case"end":return f.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-state-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`/**
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},22234:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(23841),P=e(28524),U=e(48611),i={"docs-guide-signal-watch-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=o.sent,E=g.useStore,o.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=o.sent,m=b.Button,I=b.ColorBlock,o.abrupt("return",{default:function(){var v=E({user:{age:18}}),r=v.state,_=v.$;return B.createElement("div",null,B.createElement(I,{name:"Age"},_(function(f){var S=f.value;return B.createElement("div",null,S)},function(f){return f.user.age})),B.createElement(m,{onClick:function(){return r.user.age++}},"+Age"))}});case 10:case"end":return o.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-watch-demo-1":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=l.sent,E=g.useStore,b=g.computed,l.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return m=l.sent,I=m.Button,n=m.ColorBlock,l.abrupt("return",{default:function(){var r=E({user:{age:18}}),_=r.state,f=r.$;return B.createElement("div",null,B.createElement(n,{name:"Age"},f(function(S){var N=S.value;return B.createElement("div",null,N)},b(function(S){return S.user.age}))),B.createElement(I,{onClick:function(){return _.user.age++}},"+Age"))}});case 11:case"end":return l.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}},"docs-guide-signal-watch-demo-2":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=r.sent,E=g.useStore,b=g.delay,m=g.computed,r.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return I=r.sent,n=I.Button,o=I.ColorBlock,l=I.Loading,r.abrupt("return",{default:function(){var f=E({order:{price:10,count:1}}),S=f.state,N=f.$;return B.createElement("div",null,B.createElement(o,{name:"Price"},N("order.price")),B.createElement(o,{name:"Count"},N("order.count")),B.createElement(o,{name:"Total"},N(function(C){var D=C.value,O=C.loading;return B.createElement("div",null,O?B.createElement(l,{title:"\u8BA1\u7B97\u4E2D..."}):D,"\u{1F4B8}\u{1F4B8}")},m(function(){var C=L()(d()().mark(function D(O){return d()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,b(1e3);case 2:return A.abrupt("return",O.order.price*O.order.count);case 3:case"end":return A.stop()}},D)}));return function(D){return C.apply(this,arguments)}}(),["order.price","order.count"],{initial:10}))),B.createElement(n,{onClick:function(){return S.order.count++}},"Count++"))}});case 13:case"end":return r.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-signal-watch-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore,delay,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},83786:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(31363),K={}},16645:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(81897),K={}},77680:function(te,y,e){var G;e.r(y),e.d(y,{demos:function(){return E}});var d=e(29008),K=e.n(d),L=e(28633),B=e.n(L),x=e(70958),P=e.n(x),U=e(92379),i=e(94451),j=e(48611),g=e(28524),E={"docs-guide-store-render-demo-0":{component:U.memo(U.lazy(P()(K()().mark(function b(){var m,I,n,o,l,v,r,_,f,S,N,C;return K()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.t.bind(e,92379,19));case 2:return m=O.sent,I=m.default,n=m.createContext,o=m.useContext,l=m.useState,O.next=9,Promise.resolve().then(e.bind(e,48611));case 9:return v=O.sent,r=v.ColorBlock,_=v.Button,f=v.Divider,S=n({firstName:"Zhang",lastName:"Fisher",age:18}),N=I.memo(function(R){var A=o(S);return I.createElement(r,{name:"\u5B50\u7EC4\u4EF6:".concat(R.name)},I.createElement("span",null,"Hello :",A.firstName," ",A.lastName))}),C=0,O.abrupt("return",{default:function(){var A=l({firstName:"Zhang",lastName:"Fisher",age:18}),$=B()(A,2),W=$[0],k=$[1];return I.createElement(S.Provider,{value:W},I.createElement(f,{title:"\u6839\u7EC4\u4EF6"}),I.createElement(r,{name:"FullName"},W.firstName," ",W.lastName),I.createElement(r,{name:"Age"},"Age :",W.age),I.createElement(f,{title:"\u5B50\u7EC4\u4EF6"}),I.createElement(N,{name:"A"}),I.createElement(N,{name:"B"}),I.createElement(_,{onClick:function(){k({firstName:"Zhang",lastName:"Fisher",age:++C})}},"+Age"))}});case 17:case"end":return O.stop()}},b)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React,{createContext,useContext,useState} from "react"
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
}`},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{react:G||(G=e.t(U,2)),"x-react-components":j},renderOpts:{compile:function(){var b=P()(K()().mark(function I(){var n,o=arguments;return K()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(9039).then(e.bind(e,39039));case 2:return v.abrupt("return",(n=v.sent).default.apply(n,o));case 3:case"end":return v.stop()}},I)}));function m(){return b.apply(this,arguments)}return m}()}},"docs-guide-store-render-demo-1":{component:U.memo(U.lazy(P()(K()().mark(function b(){var m,I,n,o,l,v,r,_,f,S,N,C;return K()().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return m=O.sent,I=m.createStore,O.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return n=O.sent,o=n.default,O.next=10,Promise.resolve().then(e.bind(e,48611));case 10:return l=O.sent,v=l.ColorBlock,r=l.Button,_=l.Divider,f=I({firstName:"Zhang",lastName:"Fisher",age:18}),S=o.memo(function(R){var A=f.useState("firstName"),$=B()(A,1),W=$[0];return o.createElement(v,{name:"\u5B50\u7EC4\u4EF6:FirstName"},W)}),N=o.memo(function(R){var A=f.useState("lastName"),$=B()(A,1),W=$[0];return o.createElement(v,{name:"\u5B50\u7EC4\u4EF6:lastName"},W)}),C=0,O.abrupt("return",{default:function(){var A=f.useState("age"),$=B()(A,1),W=$[0];return o.createElement(o.Fragment,null,o.createElement(_,{title:"\u6839\u7EC4\u4EF6"}),o.createElement(v,{name:"FullName"},"Hello :",f.state.firstName," ",f.state.lastName),o.createElement(v,{name:"Age"},W),o.createElement(_,{title:"\u5B50\u7EC4\u4EF6"}),o.createElement(S,null),o.createElement(N,null),o.createElement(r,{onClick:function(){return f.state.age=f.state.age+1}},"+Age"),o.createElement(r,{onClick:function(){return f.state.firstName=f.state.firstName+"."}},"Change FirstName"))}});case 19:case"end":return O.stop()}},b)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,react:G||(G=e.t(U,2)),"x-react-components":j},renderOpts:{compile:function(){var b=P()(K()().mark(function I(){var n,o=arguments;return K()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(9039).then(e.bind(e,39039));case 2:return v.abrupt("return",(n=v.sent).default.apply(n,o));case 3:case"end":return v.stop()}},I)}));function m(){return b.apply(this,arguments)}return m}()}},"docs-guide-store-render-demo-2":{component:U.memo(U.lazy(P()(K()().mark(function b(){var m,I,n,o,l,v,r,_,f,S,N,C,D,O;return K()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return m=A.sent,I=m.createStore,A.next=6,Promise.resolve().then(e.t.bind(e,92379,19));case 6:return n=A.sent,o=n.default,A.next=10,Promise.resolve().then(e.bind(e,48611));case 10:return l=A.sent,v=l.ColorBlock,r=l.Button,_=l.Divider,f=I({firstName:"Zhang",lastName:"Fisher",age:18}),S=f.state,N=f.$,C=function(){return o.createElement(v,{name:"\u5B50\u7EC4\u4EF6:FirstName"},N("firstName"))},D=function(){return o.createElement(v,{name:"\u5B50\u7EC4\u4EF6:LastName"},N("lastName"))},O=0,A.abrupt("return",{default:function(){return o.createElement(o.Fragment,null,o.createElement(_,{title:"\u6839\u7EC4\u4EF6"}),o.createElement(v,{name:"FullName"},N("firstName")," ",N("lastName")),o.createElement(v,{name:"Age"},N("age")," - ",++O),o.createElement(_,{title:"\u5B50\u7EC4\u4EF6"}),o.createElement(C,null),o.createElement(D,null),o.createElement(r,{onClick:function(){return S.age=S.age+1}},"+Age"),o.createElement(r,{onClick:function(){return S.firstName=S.firstName+"."}},"Change FirstName"),o.createElement(r,{onClick:function(){return S.lastName=S.lastName+"*"}},"Change LastName"))}});case 19:case"end":return A.stop()}},b)})))),asset:{type:"BLOCK",id:"docs-guide-store-render-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":g,react:G||(G=e.t(U,2)),"x-react-components":j},renderOpts:{compile:function(){var b=P()(K()().mark(function I(){var n,o=arguments;return K()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,e.e(9039).then(e.bind(e,39039));case 2:return v.abrupt("return",(n=v.sent).default.apply(n,o));case 3:case"end":return v.stop()}},I)}));function m(){return b.apply(this,arguments)}return m}()}}}},33788:function(te,y,e){e.r(y),e.d(y,{demos:function(){return g}});var G=e(28633),d=e.n(G),K=e(29008),L=e.n(K),B=e(70958),x=e.n(B),P=e(92379),U=e(61786),i=e(28524),j=e(48611),g={"docs-guide-store-state-demo-0":{component:P.memo(P.lazy(x()(L()().mark(function E(){var b,m,I,n,o,l,v,r,_,f;return L()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=N.sent,m=b.createStore,I=b.computed,N.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return n=N.sent,o=n.Button,l=n.ColorBlock,v=m({firstName:"Zhang",lastName:"Fisher",age:18,fullName:function(D){return D.firstName+D.lastName},salary:I(function(){var C=x()(L()().mark(function D(O){return L()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.abrupt("return",O.age*10);case 1:case"end":return A.stop()}},D)}));return function(D){return C.apply(this,arguments)}}(),["age"])}),r=v.state,_=v.useState,f=v.$,globalThis.state=r,N.abrupt("return",{default:function(){var D=_("age"),O=d()(D,2),R=O[0],A=O[1],$=_("salary"),W=d()($,2),k=W[0],Y=W[1],z=_(function(X){return X.lastName},function(X,ae){return ae.lastName=X}),H=d()(z,2),Q=H[0],ee=H[1];return P.createElement("div",null,P.createElement(l,null,"Fullname :",r.firstName," ",Q),P.createElement(l,null,"Age :",R),P.createElement(l,null,"Salary: ",f("salary")),P.createElement(o,{onClick:function(){return A(R+1)}},"+Age"),P.createElement(o,{onClick:function(){return ee(Q+".")}},"Change lastName"))}});case 13:case"end":return N.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,computed } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(L()().mark(function m(){var I,n=arguments;return L()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}},"docs-guide-store-state-demo-1":{component:P.memo(P.lazy(x()(L()().mark(function E(){var b,m,I,n,o,l,v,r,_,f;return L()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=N.sent,m=b.createStore,N.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=N.sent,n=I.ColorBlock,N.next=10,Promise.resolve().then(e.bind(e,48611));case 10:return o=N.sent,l=o.Button,v=m({firstName:"Zhang",lastName:"Fisher",fullName:function(D){return D.firstName+D.lastName}}),r=v.useState,_=v.state,f=v.$,N.abrupt("return",{default:function(){var D=r(function(z){return z.firstName},function(z,H){return H.firstName=z}),O=d()(D,2),R=O[0],A=O[1],$=r(function(z){return z.fullName},function(z,H){var Q=d()(z,2),ee=Q[0],X=Q[1];H.firstName=ee,H.lastName=X}),W=d()($,2),k=W[0],Y=W[1];return P.createElement("div",null,P.createElement(n,{name:"FullName",value:k}),P.createElement(l,{onClick:function(){return A("<".concat(R,">"))}},"Change FirstName"),P.createElement(l,{onClick:function(){return Y(["Hello","Voerkai18n"])}},"Change FullName"))}});case 14:case"end":return N.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(L()().mark(function m(){var I,n=arguments;return L()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}},"docs-guide-store-state-demo-2":{component:P.memo(P.lazy(x()(L()().mark(function E(){var b,m,I,n,o,l,v,r;return L()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=f.sent,m=b.createStore,f.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return I=f.sent,n=I.Button,o=I.ColorBlock,l=m({age:18}),v=l.state,r=l.$,f.abrupt("return",{default:function(){return P.createElement("div",null,P.createElement(o,null,"Age+Signal :",r("age")),P.createElement(o,null,"Age :",v.age),P.createElement(n,{onClick:function(){return v.age=v.age+1}},"+Age"))}});case 11:case"end":return f.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-store-state-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u901A\u8FC7state.age=n\u76F4\u63A5\u5199\u72B6\u6001\u65F6\uFF0C\u9700\u8981\u4F7F\u7528{$('age')}\u6765\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",title:"\u76F4\u5199\u72B6\u6001"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(L()().mark(function m(){var I,n=arguments;return L()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}}}},85244:function(te,y,e){e.r(y),e.d(y,{demos:function(){return i}});var G=e(29008),d=e.n(G),K=e(70958),L=e.n(K),B=e(92379),x=e(34450),P=e(28524),U=e(48611),i={"docs-guide-store-demo-0":{component:B.memo(B.lazy(L()(d()().mark(function j(){var g,E,b,m,I,n,o,l,v;return d()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return g=_.sent,E=g.useStore,_.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return b=_.sent,m=b.Button,I=b.ColorBlock,_.abrupt("return",{default:function(){var S=E({count:18}),N=S.state,C=S.$;return B.createElement("div",null,B.createElement(I,{name:"Count"},C("count")),B.createElement(m,{onClick:function(){return N.count++}},"Count++"))}});case 11:case"end":return _.stop()}},j)})))),asset:{type:"BLOCK",id:"docs-guide-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { useStore } from '@autostorejs/react';
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

const { state, $, watch  } = store`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":P,"x-react-components":U},renderOpts:{compile:function(){var j=L()(d()().mark(function E(){var b,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(9039).then(e.bind(e,39039));case 2:return n.abrupt("return",(b=n.sent).default.apply(b,m));case 3:case"end":return n.stop()}},E)}));function g(){return j.apply(this,arguments)}return g}()}}}},26992:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(22273),K={}},33463:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(66663),K={}},45988:function(te,y,e){e.r(y),e.d(y,{demos:function(){return I}});var G=e(29008),d=e.n(G),K=e(12027),L=e.n(K),B=e(34180),x=e.n(B),P=e(24325),U=e.n(P),i=e(70958),j=e.n(i),g=e(92379),E=e(26826),b=e(28524),m=e(48611),I={"docs-guide-watch-objects-demo-0":{component:g.memo(g.lazy(j()(d()().mark(function n(){var o,l,v,r,_,f,S,N,C,D,O,R,A,$;return d()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return o=k.sent,l=o.createStore,v=o.watch,k.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return r=k.sent,_=r.Divider,f=r.ColorBlock,S=r.Button,N=r.Box,C=r.Input,D=l({user:{firstName:"Zhang",lastName:"Fisher",fullName:function(z){return z.firstName+" "+z.lastName},dirty:v(function(Y,z){var H=Y.path,Q=Y.value;return z.cache[H.join(".")]=!0,!0},function(Y){return["firstName","lastName"].includes(Y[Y.length-1])},{initial:!1})}}),O=D.state,R=D.useBindings,A=D.watchObjects,$=D.$,k.abrupt("return",{default:function(){var z=R("user");return g.createElement("div",null,g.createElement(C,U()({label:"FirstName"},z.firstName)),g.createElement(C,U()({label:"lastName"},z.lastName)),g.createElement(_,null),g.createElement(N,null,g.createElement(f,{name:"FullName"},$("user.fullName")),g.createElement(f,{name:"Dirty"},$("user.dirty")),g.createElement(S,{onClick:function(){O.user.firstName="Zhang",O.user.lastName="Fisher",A.get("user.dirty").reset()}},"Reset")),g.createElement(N,null,g.createElement("div",null,"typeof(store.watchObjects)==",x()(A)),g.createElement("div",null,"store.watchObjects.size=",A.size),g.createElement("div",null,"store.watchObjects.size=",A.size),g.createElement("div",null,"store.watchObjects.keys()=",L()(A.keys()).join(" , "))))}});case 15:case"end":return k.stop()}},n)})))),asset:{type:"BLOCK",id:"docs-guide-watch-objects-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx",description:"\u7F16\u8F91firstName\u6216lastName,\u4F1A\u89E6\u53D1dirty\u7684\u53D8\u5316",title:"\u4F7F\u7528watch\u529F\u80FD\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF"},context:{"@autostorejs/react":b,"x-react-components":m},renderOpts:{compile:function(){var n=j()(d()().mark(function l(){var v,r=arguments;return d()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,e.e(9039).then(e.bind(e,39039));case 2:return f.abrupt("return",(v=f.sent).default.apply(v,r));case 3:case"end":return f.stop()}},l)}));function o(){return n.apply(this,arguments)}return o}()}}}},54915:function(te,y,e){e.r(y),e.d(y,{demos:function(){return g}});var G=e(29008),d=e.n(G),K=e(28633),L=e.n(K),B=e(70958),x=e.n(B),P=e(92379),U=e(37686),i=e(28524),j=e(48611),g={"docs-guide-watch-state-demo-0":{component:P.memo(P.lazy(x()(d()().mark(function E(){var b,m,I,n,o,l,v,r,_;return d()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return b=S.sent,m=b.createStore,I=b.watch,S.next=7,Promise.resolve().then(e.bind(e,48611));case 7:return n=S.sent,o=n.Input,l=n.Button,v=m({orders:[{name:"AutoStore\u5B9E\u6218\u6307\u5357",price:100,count:1,total:function(C){return C.price*C.count}},{name:"\u6DF1\u5165\u6D45\u51FAAutoStore",price:98,count:1,total:function(C){return C.price*C.count}}],total:I(function(N){return r.orders.reduce(function(C,D){return C+D.count*D.price},0)},function(N){return N[N.length-1]==="count"},{initial:198})}),r=v.state,_=v.useState,S.abrupt("return",{default:function(){var C=_(),D=L()(C,1),O=D[0];return P.createElement("table",{className:"table"},P.createElement("thead",null,P.createElement("tr",null,P.createElement("th",null,"Name"),P.createElement("th",null,"Price"),P.createElement("th",null,"Count"),P.createElement("th",null,"Total"))),P.createElement("tbody",null,O.orders.map(function(R,A){return P.createElement("tr",{key:A},P.createElement("td",null,R.name),P.createElement("td",null,R.price),P.createElement("td",null,P.createElement(l,{onClick:function(){return R.count--}},"-"),P.createElement(o,{value:R.count,style:{display:"inline-flex"}}),P.createElement(l,{onClick:function(){return R.count++}},"+")),P.createElement("td",null,R.total))}),P.createElement("tr",null,P.createElement("td",{colSpan:3},"Total"),P.createElement("td",null,r.total))))}});case 12:case"end":return S.stop()}},E)})))),asset:{type:"BLOCK",id:"docs-guide-watch-state-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore,watch } from '@autostorejs/react';
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"}},entry:"index.tsx"},context:{"@autostorejs/react":i,"x-react-components":j},renderOpts:{compile:function(){var E=x()(d()().mark(function m(){var I,n=arguments;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,e.e(9039).then(e.bind(e,39039));case 2:return l.abrupt("return",(I=l.sent).default.apply(I,n));case 3:case"end":return l.stop()}},m)}));function b(){return E.apply(this,arguments)}return b}()}}}},14097:function(te,y,e){var G;e.r(y),e.d(y,{demos:function(){return m}});var d=e(24325),K=e.n(d),L=e(29008),B=e.n(L),x=e(28633),P=e.n(x),U=e(70958),i=e.n(U),j=e(92379),g=e(73549),E=e(28524),b=e(48611),m={"docs-guide-watch-store-demo-0":{component:j.memo(j.lazy(i()(B()().mark(function I(){var n,o,l,v,r,_,f,S,N,C,D,O,R,A,$,W,k;return B()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return n=z.sent,o=n.createStore,l=n.computed,v=n.useStore,z.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return r=z.sent,_=r.Box,f=r.Button,S=r.ColorBlock,N=r.Layout,C=r.CheckBox,z.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return D=z.sent,O=D.useEffect,R=D.useRef,A=o({order:{price:10,count:2,total:l(function(H){return H.price*H.count})}}),$=A.state,W=A.watch,k=A.$,z.abrupt("return",{default:function(){var Q=R(),ee=v({operates:"*"}),X=ee.useState("operates"),ae=P()(X,2),me=ae[0],de=ae[1];return O(function(){var fe=W(function(ge){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(ge.type," ").concat(ge.path.join("."),"</p>"))},{operates:me});return function(){return fe.off()}},[me]),j.createElement(N,{style:{maxHeight:"400px"}},j.createElement("div",null,j.createElement(S,{name:"Price"},k("order.price")),j.createElement(S,{name:"Count"},j.createElement(f,{onClick:function(){$.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),k("order.count"),j.createElement(f,{onClick:function(){$.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),j.createElement(S,{name:"Total"},k("order.total")),j.createElement(_,null,j.createElement(C,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:me==="*",onChange:function(ge){de(ge.target.checked?"*":"read")}}),j.createElement(C,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:me==="write",onChange:function(ge){de(ge.target.checked?"write":"*")}}),j.createElement(C,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:me==="read",onChange:function(ge){de(ge.target.checked?"read":"*")}})),j.createElement(f,{onClick:function(){Q.current.innerHTML=""}},"Clear")),j.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return z.stop()}},I)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@autostorejs/react":E,"x-react-components":b,react:G||(G=e.t(j,2))},renderOpts:{compile:function(){var I=i()(B()().mark(function o(){var l,v=arguments;return B()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,e.e(9039).then(e.bind(e,39039));case 2:return _.abrupt("return",(l=_.sent).default.apply(l,v));case 3:case"end":return _.stop()}},o)}));function n(){return I.apply(this,arguments)}return n}()}},"docs-guide-watch-store-demo-1":{component:j.memo(j.lazy(i()(B()().mark(function I(){var n,o,l,v,r,_,f,S,N,C,D,O,R,A,$,W,k;return B()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return n=z.sent,o=n.createStore,l=n.computed,v=n.useStore,z.next=8,Promise.resolve().then(e.bind(e,48611));case 8:return r=z.sent,_=r.Box,f=r.Button,S=r.ColorBlock,N=r.Layout,C=r.CheckBox,z.next=16,Promise.resolve().then(e.t.bind(e,92379,19));case 16:return D=z.sent,O=D.useEffect,R=D.useRef,A=o({order:{price:10,count:2,total:l(function(H){return H.price*H.count})}}),$=A.state,W=A.watch,k=A.$,z.abrupt("return",{default:function(){var Q=R(),ee=v({operates:"*"}),X=ee.useState("operates"),ae=P()(X,2),me=ae[0],de=ae[1];return O(function(){var fe=W("order.total",function(ge){Q.current.insertAdjacentHTML("beforeend","<p style='margin:2px;'}>".concat(ge.type," ").concat(ge.path.join("."),"</p>"))},{operates:me});return function(){return fe.off()}},[me]),j.createElement(N,{style:{maxHeight:"400px"}},j.createElement("div",null,j.createElement(S,{name:"Price"},k("order.price")),j.createElement(S,{name:"Count"},j.createElement(f,{onClick:function(){$.order.count--,Q.current.insertAdjacentHTML("beforeend","----------")}},"-"),k("order.count"),j.createElement(f,{onClick:function(){$.order.count++,Q.current.insertAdjacentHTML("beforeend","----------")}},"+")),j.createElement(S,{name:"Total"},k("order.total")),j.createElement(_,null,j.createElement(C,{id:"watch-all",label:"\u76D1\u542C\u6240\u6709\u64CD\u4F5C",checked:me==="*",onChange:function(ge){de(ge.target.checked?"*":"read")}}),j.createElement(C,{id:"watch-write",label:"\u53EA\u76D1\u542C\u5199\u64CD\u4F5C",checked:me==="write",onChange:function(ge){de(ge.target.checked?"write":"*")}}),j.createElement(C,{id:"watch-read",label:"\u53EA\u76D1\u542C\u8BFB\u64CD\u4F5C",checked:me==="read",onChange:function(ge){de(ge.target.checked?"read":"*")}})),j.createElement(f,{onClick:function(){Q.current.innerHTML=""}},"Clear")),j.createElement("div",{ref:Q,style:{overflowY:"auto"}}))}});case 21:case"end":return z.stop()}},I)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":E,"x-react-components":b,react:G||(G=e.t(j,2))},renderOpts:{compile:function(){var I=i()(B()().mark(function o(){var l,v=arguments;return B()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,e.e(9039).then(e.bind(e,39039));case 2:return _.abrupt("return",(l=_.sent).default.apply(l,v));case 3:case"end":return _.stop()}},o)}));function n(){return I.apply(this,arguments)}return n}()}},"docs-guide-watch-store-demo-2":{component:j.memo(j.lazy(i()(B()().mark(function I(){var n,o,l,v,r,_,f,S,N,C,D,O,R,A,$;return B()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,Promise.resolve().then(e.bind(e,28524));case 2:return n=k.sent,o=n.createStore,k.next=6,Promise.resolve().then(e.bind(e,48611));case 6:return l=k.sent,v=l.Button,r=l.Layout,_=l.Input,k.next=12,Promise.resolve().then(e.t.bind(e,92379,19));case 12:return f=k.sent,S=f.useEffect,N=f.useRef,C=o({order:{price:10,count:2,books:["AutoStore\u5B9E\u6218\u6307\u5357","\u6DF1\u5165\u6D45\u51FAAutoStore","AutoStore\u6700\u4F73\u5B9E\u8DF5"]}}),D=C.state,O=C.watch,R=C.$,A=C.useState,$=C.useBindings,k.abrupt("return",{default:function(){var z=N(),H=N();S(function(){var ee=O("order.books",function(X){z.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          `.concat(X.type," ").concat(X.path.join("."),"[").concat(X.indexs[0],`]
        </p>`))},{operates:["insert","remove","update"]});return function(){return ee.off()}},[]);var Q=$("order.books");return j.createElement(r,{style:{maxHeight:"400px"}},j.createElement("div",null,D.order.books.map(function(ee,X){return j.createElement(_,K()({key:X},Q[X]))}),j.createElement(_,{ref:H,actions:["+"],placeholder:"\u8BF7\u8F93\u5165\u4E66\u540D",onAction:function(X,ae){String(ae).length>0&&(D.order.books.push(ae),H.current.value="")}}),j.createElement(v,{onClick:function(){z.current.innerHTML=""}},"Clear")),j.createElement("div",{ref:z,style:{overflowY:"auto"}}))}});case 17:case"end":return k.stop()}},I)})))),asset:{type:"BLOCK",id:"docs-guide-watch-store-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { createStore, computed,useStore } from "@autostorejs/react"
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
}`},"@autostorejs/react":{type:"NPM",value:"1.0.1"},"x-react-components":{type:"NPM",value:"1.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",description:"\u4F7F\u7528watch(paths,listener,options?)\u65B9\u6CD5\u7528\u6765\u76D1\u542C\u6307\u5B9A\u8DEF\u5F84\u7684\u6570\u636E\u53D8\u5316\u3002",title:"\u5C40\u90E8\u76D1\u542C"},context:{"@autostorejs/react":E,"x-react-components":b,react:G||(G=e.t(j,2))},renderOpts:{compile:function(){var I=i()(B()().mark(function o(){var l,v=arguments;return B()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,e.e(9039).then(e.bind(e,39039));case 2:return _.abrupt("return",(l=_.sent).default.apply(l,v));case 3:case"end":return _.stop()}},o)}));function n(){return I.apply(this,arguments)}return n}()}}}},45618:function(te,y,e){e.r(y),e.d(y,{demos:function(){return K}});var G=e(92379),d=e(43112),K={}},20927:function(te,y,e){e.r(y),e.d(y,{Author:function(){return m},Counter:function(){return j},getProjects:function(){return v},useOneEffect:function(){return _}});var G=e(28633),d=e.n(G),K=e(92379),L=e(28524),B=e(48611),x=e(651),P=(0,L.createStore)({root:{count:1}}),U=P.state,i=P.$,j=function(){var S=(0,K.useState)(1),N=d()(S,2),C=N[0],D=N[1];return(0,x.jsxs)(B.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[C,(0,x.jsxs)(B.ColorBlock,{children:["Count:",C]}),(0,x.jsxs)(B.ColorBlock,{children:["Count:",i("root.count")]}),(0,x.jsx)(B.Button,{onClick:function(){return D(C+1)},children:"State +1"}),(0,x.jsx)(B.Button,{onClick:function(){return U.root.count++},children:"Signal +1"})]})},g=(0,L.createStore)({firstName:"Zhang",lastName:"Fisher"}),E=g.state,b=g.$,m=function(){var S=(0,K.useState)(1),N=d()(S,2),C=N[0],D=N[1];return(0,x.jsxs)(B.Card,{title:"\u663E\u793A\u72B6\u6001\u503C",children:[C,(0,x.jsxs)(B.ColorBlock,{children:["Count:",C]}),(0,x.jsx)(B.ColorBlock,{children:b(function(O){return O.firstName+" "+O.lastName})}),(0,x.jsx)(B.Button,{onClick:function(){return D(C+1)},children:"State +1"}),(0,x.jsx)(B.Button,{onClick:function(){return E.lastName=E.lastName+"."},children:"Update lastName"})]})},I=e(29008),n=e.n(I),o=e(70958),l=e.n(o);function v(f){return r.apply(this,arguments)}function r(){return r=l()(n()().mark(function f(S){var N,C,D;return n()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:return R.next=2,fetch(S);case 2:if(N=R.sent,!N.ok){R.next=11;break}return R.next=6,N.json();case 6:return C=R.sent,D=C.map(function(A){return{name:A.name,url:A.html_url,description:A.description,stars:A.stargazers_count}}),R.abrupt("return",D);case 11:throw new Error("".concat(N.status," - ").concat(N.statusText));case 12:case"end":return R.stop()}},f)})),r.apply(this,arguments)}function _(f){var S=(0,K.useRef)(!1);(0,K.useEffect)(function(){if(!S.current)return S.current=!0,f()})}},48611:function(te,y,e){e.r(y),e.d(y,{Box:function(){return K},Button:function(){return U},Card:function(){return g},CheckBox:function(){return ee},ColorBlock:function(){return r},Divider:function(){return n},ErrorBoundary:function(){return Ge},Field:function(){return I},Input:function(){return O},JsonView:function(){return H},Layout:function(){return f},List:function(){return at},Loading:function(){return B},Radio:function(){return dt},RichLabel:function(){return W},Select:function(){return ae},Star:function(){return Fe},Table:function(){return we},TextArea:function(){return lt},ValidResult:function(){return m}});var G=e(92379),d=e(651),K=(0,G.forwardRef)(function(pe,F){var re=pe.title,oe=pe.enable,ue=oe===void 0?!0:oe,ce=pe.visible,ve=ce===void 0?!0:ce;return(0,d.jsxs)("div",{ref:F,style:{display:ve?"flex":"none",position:"relative",flexDirection:"column",padding:"16px",margin:"16px 8px 8px 8px",boxSizing:"border-box",border:"1px solid #ccc"},children:[(0,d.jsx)("span",{style:{position:"absolute",padding:"2px 4px 2px 4px",top:"-16px",background:"white",left:"8px",color:ue?"#999":"gray"},children:re||""}),pe.children]})}),L=e(97106),B=function(F){var re=F.size,oe=re===void 0?20:re,ue=F.visible,ce=ue===void 0?!0:ue,ve=F.color,he=F.tips,_e=he===void 0?"loading...":he;return(0,d.jsxs)("span",{title:_e,style:{display:ce?"inline-flex":"none",cursor:"pointer",padding:"2px",alignItems:"center"},children:[(0,d.jsx)(L.Z1,{width:oe,height:oe,color:ve}),F.title?(0,d.jsx)("span",{style:{marginLeft:"4px"},children:F.title}):null]})},x=e(94039),P=(0,x.zo)({padding:"8px",margin:"4px",cursor:"pointer",display:function(F){return F.visible!==!1?F.block!==!1?"inline-flex":"flex":"none"},flexDirection:"row",borderRadius:"6px",alignItems:"center",border:"1px solid #eee",background:"#fafafa",textAlign:"center",userSelect:"none",color:"#555",fontSize:"0.8em","&:hover":{background:"#2c7af0",color:"white",borderColor:"#2c7af0"},"&:active":{transform:"scale(0.95)",transition:"transform 0.1s"}},{className:"x-button"}),U=function(F){var re=F.loading,oe=F.timeout,ue=oe===void 0?0:oe,ce=F.progress,ve=ce===void 0?0:ce,he=F.cancel,_e=F.onClick;return(0,d.jsxs)("div",{className:P.className,style:P.getStyle(F),onClick:_e,children:[re?(0,d.jsx)(B,{}):null,(0,d.jsx)("div",{style:{flexGrow:1,backgroundColor:"transparent"},children:F.children}),ue>0?(0,d.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:ue}):"",ve>0?(0,d.jsxs)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:[ve,"%"]}):"",F.error?(0,d.jsx)("span",{style:{padding:"4px",color:"red",backgroundColor:"#eee",borderRadius:"4px"},children:F.error}):"",F.loading&&typeof he=="function"?(0,d.jsx)("button",{onClick:he,style:{padding:"4px",color:"red",margin:"2px",fontSize:"10px",backgroundColor:"#eee",borderRadius:"4px",cursor:"pointer"},children:" \u5355\u51FB\u53D6\u6D88"}):""]})},i=(0,x.zo)({border:"1px solid #e1e1e1",background:function(F){return F.enable!==!1?"white":"gray"},margin:"8px",display:function(F){return F.visible!==!1?"flex":"none"},flexDirection:"column",borderRadius:"6px",minWidth:"320px",minHeight:"200px",boxShadow:"0 0 4px rgba(0,0,0,0.1)"},{className:"x-card"}),j=(0,x.zo)({display:"flex",flexDirection:"row",backgroundColor:"#f5f5f5",padding:"8px",lineHeight:"200%",color:"#555",borderRadius:"6px 6px 0 0"},{className:"x-card-header"}),g=function(F){var re=F.title,oe=F.enable,ue=oe===void 0?!0:oe,ce=F.actions,ve=ce===void 0?[]:ce,he=Array.isArray(F.children)?F.children:[F.children];return(0,d.jsxs)("div",{className:i.className,style:i.getStyle(F),children:[(0,d.jsxs)("div",{className:j.className,style:j.getStyle(F),children:[(0,d.jsx)("span",{style:{flexGrow:1,color:ue?"#222":"gray"},children:re}),(0,d.jsx)("span",{style:{},children:ve.map(function(_e,ye){return(0,d.jsx)(U,{onClick:_e.onClick,children:_e.title})})})]}),(0,d.jsx)("div",{style:{padding:"12px"},children:he.map(function(_e,ye){return he.length>1&&ye===he.length-1&&_e.classList&&_e.classList.contains("footer")?(0,d.jsx)("div",{className:"footer",style:{borderTop:"1px solid #ccc",padding:"8px"},children:_e},ye):_e})})]})},E=e(24325),b=e.n(E),m=function(F){var re=F.validate,oe=F.help;if(re!==void 0){var ue=typeof re!="boolean",ce=ue?re==null?void 0:re.result:re,ve=ue?re==null?void 0:re.loading:!1,he=ue?re==null?void 0:re.error:oe;return(0,d.jsxs)("span",{style:{color:"red",display:ve||!ce?"flex":"none"},children:[(0,d.jsx)(B,{visible:ve,tips:"\u6B63\u5728\u9A8C\u8BC1..."}),!ve&&(ce?"":he)]})}},I=function(F){var re=F.enable,oe=re===void 0?!0:re,ue=F.visible,ce=ue===void 0?!0:ue,ve=F.label,he=ve===void 0?"":ve,_e=F.children,ye=_e===void 0?"":_e,Se=F.memo;return(0,d.jsxs)("div",{className:"field",style:{position:"relative",display:ce===!1?"none":"flex",boxSizing:"border-box",flexDirection:"row",width:"100%",alignItems:"center",padding:"8px"},children:[(0,d.jsxs)("label",{className:"field-label",style:{minWidth:"160px",fontWeight:"bold",color:oe===!1?"gray":"inherit"},children:[he,":"]}),(0,d.jsxs)("span",{className:"field-value",style:{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",color:oe===!1?"gray":"inherit"},children:[typeof ye=="function"?"":ye,Se&&(0,d.jsx)("span",{style:{color:"gray"},children:Se})]}),(0,d.jsx)(m,b()({},F))]})},n=function(F){var re=F.title,oe=F.visible,ue=oe===void 0?!0:oe;return(0,d.jsx)("div",{style:{height:"36px",borderBottom:"1px solid #eee",marginBottom:"16px",display:ue?"flex":"none"},children:(0,d.jsx)("h4",{style:{position:"absolute",background:"white",padding:"4px",color:"#bbb"},children:re})})},o=["#ff4d4f","#a8071a","#ff7a45","#ad2102","#ffa940","#ad4e00","#ffc53d","#ad6800","#bae637","#5b8c00","#73d13d","#237804","#36cfc9","#006d75","#4096ff","#003eb3","#597ef7","#10239e","#9254de","#391085","#f759ab","#9e1068","#4bc703","#eb03c4","#eb7d00","#99170e991","red","#028b8b9"],l=0;function v(){return l++,l>=o.length-1&&(l=0),o[l]}var r=function(F){var re=(0,G.useRef)(0),oe=F.name,ue=F.value,ce=ue===void 0?"":ue,ve=F.loading,he=ve===void 0?!1:ve,_e=F.comment,ye=F.inline,Se=v(),Le="white";return(0,G.useEffect)(function(){re.current++}),(0,d.jsxs)("div",{style:b()(b()({backgroundColor:Se,padding:"6px",color:Le,display:ye?"inline-flex ":"flex"},F.style),{},{alignItems:"center"}),children:[(0,d.jsxs)("span",{style:{display:"flex",alignItems:"center",flexGrow:1},children:[oe?(0,d.jsx)("span",{style:{padding:"4px",flexShrink:0,minWidth:"80px"},children:oe}):null,oe?(0,d.jsx)("span",{style:{padding:"4px",flexShrink:0},children:":\xA0"}):null,(0,d.jsxs)("span",{style:{padding:"4px",flexGrow:1},children:[String(ce),F.children]})]}),_e?(0,d.jsx)("span",{style:{paddingRight:"6px ",flexShrink:0},children:_e}):null,he?(0,d.jsx)(B,{color:"white"}):null,(0,d.jsx)("span",{title:"Render Count",style:{fontSize:"8px",paddingLeft:"6px"},children:re.current})]})},_=(0,x.zo)({display:function(F){return F.visible===!1?"none":"flex"},position:"relative",flexDirection:function(F){return F.direction||"row"},padding:"4px",margin:"4px",boxSizing:"border-box",alignItems:"stretch","&>*":{flex:1,boxSizing:"border-box",position:"relative",borderLeft:"1px solid #ccc",borderTop:"1px solid #ccc",borderBottom:function(F){return F.direction==="column"?"none":"1px solid #ccc"},borderRight:function(F){return F.direction==="column"?"1px solid #ccc":"none"},padding:"8px"},"&>:last-child":{borderRight:"1px solid #ccc",borderBottom:"1px solid #ccc"},"&+.x-layout":{borderTop:"none",marginTop:"-12px","&>*":{borderTop:"none",paddingTop:"12px"}}},{className:"x-layout"}),f=function(F){return(0,d.jsx)("div",{className:_.className,style:_.getStyle(F,F.style),children:F.children})},S=e(19317),N=e.n(S),C=["id","enable","style","value","actions"],D=(0,x.zo)({display:"flex",alignItems:"center","& input":{border:function(F){return F.validate===!1?"1px solid red":"1px solid #bbb"},borderRadius:"4px",background:function(F){return F.enable===!1?"gray":"white"},display:function(F){return F.visible===!1?"none":"flex"},margin:"4px",padding:"8px",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"},"&.invalid":{border:"1px solid red",color:"red"}},"& label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&.invalid>label":{color:"red"},"& .error":{display:"none","&.invalid":{display:"block",color:"red"}}},{className:"x-input"}),O=function(F){var re=F.id,oe=re===void 0?Math.random().toString(36).slice(2):re,ue=F.enable,ce=ue===void 0?!0:ue,ve=F.style,he=ve===void 0?{}:ve,_e=F.value,ye=F.actions,Se=N()(F,C),Le=F.label||F.name||F.id,Ve=(0,G.useRef)(null);return(0,d.jsxs)("div",{className:D.className,style:D.getStyle(F,he),"data-field-name":F.name,children:[Le?(0,d.jsx)("label",{htmlFor:oe,children:Le}):null,(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("input",b()({ref:Ve,id:oe,value:_e,readOnly:!ce},Se)),ye==null?void 0:ye.map(function(Ae){return(0,d.jsx)("button",{onClick:function(Ze){var Qe;(Qe=F.onAction)===null||Qe===void 0||Qe.call(F,Ae,Ve.current.value,Ze)},children:Ae},Ae)})]}),(0,d.jsx)("span",{className:"error","data-validate-field":F.name})]})]})},R=e(28633),A=e.n(R);function $(pe){return pe.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var W=function(F){var re=F.text,oe=F.color,ue=oe===void 0?"#ff6c00":oe,ce=F.rules,ve=typeof ue=="string"?{default:ue}:Object.assign({default:""},ue),he=$(re||String(F.children));return ce?Object.entries(ce).forEach(function(_e){var ye=A()(_e,2),Se=ye[0],Le=ye[1];he=he.replace(Le,function(Ve){var Ae=Se.includes(":")?Se:"color:".concat(Se,";");return"<span style='".concat(Ae,"'>").concat(Ve,"</span>")})}):he=he.replace(/\{\s?(.*?)\s?\}/gm,function(_e,ye){return"<span style='color: ".concat(ye in ve?ve[ye]:ve.default,"'>").concat(ye,"</span>")}).replaceAll("undefined","\u7A7A\u503C"),(0,d.jsx)("div",{className:F.className,style:b()({boxSizing:"border-box",padding:"8px",margin:"4px",color:"#222"},F.style),children:(0,d.jsx)("span",{dangerouslySetInnerHTML:{__html:he}})})},k=e(48092),Y=e.n(k),z=(0,x.zo)({"&>.json-pretty":{lineHeight:"150%","& .json-key":{color:"#5a5a5ac6",padding:"2px"},"& .json-string":{color:"#007912",padding:"2px"},"& .json-number":{color:"#e67206",padding:"2px"},"& .json-boolean":{color:"red"}}},{className:"x-json-view"}),H=function(F){var re=F.data;return(0,d.jsx)("div",{className:z.className,dangerouslySetInnerHTML:{__html:Y()(re)}})},Q=(0,x.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-checkbox"}),ee=function(F){var re=F.id,oe=re===void 0?Math.random().toString(36).slice(2):re,ue=F.labelPos,ce=ue===void 0?"right":ue,ve=F.label||F.name||F.id;return(0,d.jsxs)("div",{className:Q.className,style:Q.getStyle(F),children:[ce==="left"?(0,d.jsx)("label",{htmlFor:oe,children:ve}):null,(0,d.jsx)("input",b()(b()({},F),{},{id:oe,checked:F.checked,value:F.value,type:"checkbox"})),ce==="right"?(0,d.jsx)("label",{htmlFor:oe,children:ve}):null]})},X=(0,x.zo)({display:"flex",alignItems:"center",cursor:"pointer","&>label":{userSelect:"none",fontSize:"14px",cursor:"pointer",width:"100px",flexShrink:0},"&>select":{margin:"4px",padding:"8px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-select"}),ae=function(F){var re=F.items,oe=re===void 0?[]:re,ue=F.label||F.name||F.id;return(0,d.jsxs)("div",{className:X.className,style:X.getStyle(F),children:[(0,d.jsx)("label",{children:ue}),(0,d.jsx)("select",b()(b()({},F),{},{value:F.value,children:oe.map(function(ce){return(0,d.jsx)("option",{value:ce.value,children:ce.title},ce.value)})}))]})},me=e(93949),de=e.n(me),fe=e(6270),ge=e.n(fe),De=e(77701),je=e.n(De),Ke=e(28249),Re=e.n(Ke),Ge=function(pe){je()(re,pe);var F=Re()(re);function re(oe){var ue;return de()(this,re),ue=F.call(this,oe),ue.state={error:void 0},ue}return ge()(re,[{key:"render",value:function(){return this.state.error?(0,d.jsx)(K,{children:this.state.error}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(ue){return{error:ue.stack}}}]),re}(G.Component),Me=(0,x.zo)({width:"100%",marginBottom:"1rem",color:"#212529",backgroundColor:"white",borderCollapse:"collapse",border:"1px solid #dee2e6","& th":{backgroundColor:"#f7f7f7"},"& th,td":{padding:".5rem",verticalAlign:"top",border:"1px solid #dee2e6"},"& td":{padding:".5rem",border:"1px solid #dee2e6",verticalAlign:"middle"},"& tfoot":{backgroundColor:"#f7f7f7",padding:".75rem"}},{className:"x-table"}),we=function(F){var re,oe=F.cols.map(function(ue){var ce=typeof ue=="string"?{name:ue,align:"center"}:ue;return ce.name.startsWith("<")&&(ce.align="left",ce.name=ce.name.substring(1)),ce.name.startsWith(">")&&(ce.align="right",ce.name=ce.name.substring(1)),ce});return(0,d.jsxs)("table",{className:Me.className,style:Me.getStyle(F),children:[(0,d.jsxs)("thead",{children:[F.title?(0,d.jsx)("tr",{children:(0,d.jsx)("th",{colSpan:oe.length,children:F.title})}):null,(0,d.jsx)("tr",{children:oe==null?void 0:oe.map(function(ue,ce){return(0,d.jsx)("th",{style:{width:ue.width?ue.width:void 0,textAlign:ue.align?ue.align:void 0},children:ue.name},ce)})})]}),(0,d.jsx)("tbody",{children:(re=F.rows)===null||re===void 0?void 0:re.map(function(ue,ce){return(0,d.jsx)("tr",{children:ue.map(function(ve,he){var _e=1;if(ve!=null){for(var ye=he+1;ye<ue.length&&ue[ye]==null;ye++)_e++;return(0,d.jsx)("td",{colSpan:_e>1?_e:void 0,style:{textAlign:oe[he].align},children:typeof ve=="function"?ve():String(ve)},he)}})},ce)})}),F.children?(0,d.jsx)("tfoot",{children:(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:oe.length,children:F.children})})}):null]})},ke=(0,x.zo)({padding:"0px",display:"flex","&>label":{color:"#666",fontSize:"14px",marginBottom:"4px",flexShrink:0,width:"100px"},"&>textarea":{margin:"4px",padding:"8px",minHeight:"80px",borderRadius:"4px",border:"1px solid #bbb",flexGrow:1,"&:focus":{outline:"none",boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"}}},{className:"x-textArea"}),lt=function(F){var re=F.id,oe=re===void 0?Math.random().toString(36).slice(2):re,ue=F.label||F.name||F.id;return(0,d.jsxs)("div",{className:ke.className,style:ke.getStyle(F),children:[(0,d.jsx)("label",{htmlFor:oe,children:ue}),(0,d.jsx)("textarea",b()(b()({},F),{},{id:oe}))]})},Fe=function(F){var re=F.max,oe=re===void 0?5:re,ue=F.value,ce=ue===void 0?1:ue,ve=Array.from({length:oe}),he=(0,G.useRef)(null),_e=(0,G.useState)(ce),ye=A()(_e,2),Se=ye[0],Le=ye[1];return(0,d.jsx)("div",{ref:he,style:{display:"flex",flexDirection:"row",fontSize:"1.2em"},children:ve.map(function(Ve,Ae){return(0,d.jsxs)("span",{style:{cursor:"pointer",padding:"4px",color:Ae<Se?"#ffe70c":"#ccc"},onClick:function(){Le(Ae===Se-1?Ae:Ae+1);var Ze=new InputEvent("input",{bubbles:!0,cancelable:!0,data:String(Se)});he.current.dispatchEvent(Ze)},children:[(0,d.jsx)("svg",{viewBox:"64 64 896 896",focusable:"false","data-icon":"star",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:(0,d.jsx)("path",{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"})}),"   "]},Ae)})})},$e=(0,x.zo)({listStyle:"'\u03BF'",margin:0,paddingLeft:"1em","&>li":{cursor:"pointer","&:hover":{background:"#f9f9f9",borderRadius:"4px"}}},{className:"x-list"}),at=function(F){return(0,d.jsxs)(K,{title:F.title,children:[F.description&&(0,d.jsx)(W,{text:F.description}),(0,d.jsx)("ul",{className:$e.className,style:$e.getStyle(),children:F.items&&F.items.map(function(re,oe){return Array.isArray(re)?(0,d.jsx)("li",{children:(0,d.jsx)(W,{text:re[0],color:re[1]})},oe):(0,d.jsx)("li",{children:(0,d.jsx)(W,{text:re,color:"red"})},oe)})})]})},ze=(0,x.zo)({padding:"4px",margin:"4px",display:"flex",alignItems:"center",cursor:"pointer","&>label":{padding:"4px",userSelect:"none",cursor:"pointer"},"&>input":{margin:"0px",padding:"0px",width:"1.2em",height:"1.2em",cursor:"pointer"}},{className:"x-radio"}),dt=function(F){var re=F.id,oe=re===void 0?Math.random().toString(36).slice(2):re,ue=F.label||F.name||F.id;return(0,d.jsxs)("div",{className:ze.className,style:ze.getStyle(F),children:[(0,d.jsx)("label",{htmlFor:oe,children:ue}),(0,d.jsx)("input",b()(b()({},F),{},{id:oe,checked:F.checked,value:F.value,type:"radio"}))]})}},28524:function(te,y,e){e.r(y),e.d(y,{ASYNC_COMPUTED_VALUE:function(){return de},AbortError:function(){return $},AsyncComputedObject:function(){return Ot},AutoStore:function(){return Dt},AutoStoreError:function(){return A},BATCH_UPDATE_EVENT:function(){return me},ComputedObject:function(){return ct},ComputedObjects:function(){return Et},CyleDependError:function(){return k},EventEmitter:function(){return pt},FAKE_BINDINGS:function(){return vt},InvalidComputedArgumentsError:function(){return Y},InvalidDependsError:function(){return H},InvalidScopeError:function(){return z},OBSERVER_DESCRIPTOR_BUILDER_FLAG:function(){return ee},OBSERVER_DESCRIPTOR_FLAG:function(){return X},ObserverObject:function(){return st},ObserverScopeRef:function(){return Je},PATH_DELIMITER:function(){return ae},ReactAutoStore:function(){return et},SKIP_PROXY_FLAG:function(){return Q},SyncComputedObject:function(){return bt},TimeoutError:function(){return W},WatchObject:function(){return Nt},WatchObjects:function(){return Bt},calcDependPaths:function(){return he},computed:function(){return je},createBindingsState:function(){return Rt},createFakeObjectBindings:function(){return mt},createInputBinding:function(){return ft},createStore:function(){return da},createUseBindings:function(){return $t},createUseField:function(){return Mt},defineExtend:function(){return Kt},delay:function(){return Ve},forEachObject:function(){return Se},getComputedId:function(){return _e},getDepends:function(){return Ze},getId:function(){return ce},getMapVal:function(){return pe},getSnap:function(){return Le},getSnapshot:function(){return nt},getVal:function(){return F},isAbsolutePath:function(){return Ke},isAsyncComputedValue:function(){return $e},isEq:function(){return Me},isEventMatched:function(){return At},isFunction:function(){return yt},isMap:function(){return we},isObserverDescriptor:function(){return Re},isObserverDescriptorBuilder:function(){return ze},isPathEq:function(){return ke},isPathMatched:function(){return lt},isPlainObject:function(){return Fe},isPrimitive:function(){return rt},isPromise:function(){return at},isProxy:function(){return dt},isRaw:function(){return Ge},joinValuePath:function(){return ue},markRaw:function(){return re},noRepeat:function(){return Ae},normalizeDeps:function(){return ge},pathIsExists:function(){return Qe},pathStartsWith:function(){return Xe},setVal:function(){return oe},updateObjectVal:function(){return ye},useForm:function(){return Ba},useStore:function(){return Na},watch:function(){return St}});var G=e(6270),d=e.n(G),K=e(93949),L=e.n(K),B=e(28810),x=e.n(B),P=e(77701),U=e.n(P),i=e(28249),j=e.n(i),g=e(29861),E=e.n(g),b=e(29008),m=e.n(b),I=e(70958),n=e.n(I),o=e(12027),l=e.n(o),v=e(34180),r=e.n(v),_=e(14582),f=e.n(_),S=e(48510),N=e.n(S),C=e(30790),D=e.n(C),O=e(5672),R=e.n(O),A=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u)}(R()(Error)),$=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u)}(A),W=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u)}(A),k=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u)}(A),Y=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u)}(A),z=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u)}(A),H=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u)}(A),Q=Symbol("skip-proxy"),ee=Symbol("observer-descriptor-builder"),X=Symbol("observer-descriptor"),ae=".",me="__batch_update__",de=Symbol("AsyncComputedValue");function fe(a){return a.constructor.name==="AsyncFunction"}function ge(a){return a?a.map(function(t){return Array.isArray(t)?t:typeof t=="string"?["/","./","../"].some(function(u){return t.startsWith(u)})?t:t.includes(ae)?t.split(ae):t.split("."):[]}):[]}function De(){return{async:!1,enable:!0,timeout:0,depends:[],immediate:"auto",extras:void 0,objectify:!0}}function je(){var a=arguments[0];if(typeof a!="function")throw new Error("computed getter must be a function");var t=[],u=Object.assign({},De());if(arguments.length===1)t=[];else if(arguments.length===2)if(Array.isArray(arguments[1]))u.depends=arguments[1];else if(r()(arguments[1])==="object")Object.assign(u,arguments[1]),u.depends=ge(u.depends);else throw new Y;else arguments.length>=3&&(t=ge(arguments[1]),Object.assign(u,arguments[2]),u.depends=t);u.async=u.async===!0||fe(a)||arguments.length>=2&&Array.isArray(arguments[1]);var p=function(){return E()({type:"computed",getter:a,options:u},X,!0)};return p[ee]=!0,p}function Ke(a){return a?a.some(function(t){return typeof t=="string"?t.startsWith("./")||t.startsWith("../")||t.startsWith("@")?!1:!["CURRENT","ROOT","SELF","PARENT"].includes(t):!0}):!1}function Re(a){return r()(a)==="object"&&a.hasOwnProperty("type")&&typeof a.type=="string"&&a.hasOwnProperty("getter")&&typeof a.getter=="function"&&a.hasOwnProperty("options")&&r()(a.options)==="object"}function Ge(a){try{return a[Q]===!0}catch(t){}return!1}function Me(a,t){if(a===t)return!0;if(a===null||t===null||r()(a)!==r()(t))return!1;if(r()(a)==="object"){if(Array.isArray(a)&&Array.isArray(t))return a.length!==t.length?!1:a.every(function(p,c){return Me(p,t[c])});if(!Array.isArray(a)&&!Array.isArray(t)){var u=Object.keys(a);return u.length!==Object.keys(t).length?!1:u.every(function(p){return Me(a[p],t[p])})}else return!1}return!1}function we(a){return toString.call(a)==="[object Map]"}function ke(a,t){return!a||!t||a.length!==t.length?!1:a.every(function(u,p){return u===t[p]})}function lt(a,t){var u=ke(a,t);return u?!0:a.length!==t.length?!1:a.every(function(p,c){return p==="*"?!0:p===t[c]})}function Fe(a){return a==null||r()(a)!=="object"?!1:Object.prototype.toString.call(a)==="[object Object]"}function $e(a){return a&&r()(a)==="object"&&a.hasOwnProperty(de)}function at(a){try{return!!a&&(r()(a)==="object"||typeof a=="function")&&typeof a.then=="function"&&typeof a.catch=="function"&&(a instanceof Promise||Object.prototype.toString.call(a)==="[object Promise]")}catch(t){return!1}}function ze(a){return typeof a=="function"&&a[ee]===!0}function dt(a){return r()(a)==="object"&&a!==null&&!("__isProxy"in a)}function pe(a,t){var u=a.get(t);if(u!==void 0)return u;var p=a.get(Number(t)||t);if(p!==void 0)return p}function F(a,t,u){if(!t||t.length===0)return a;for(var p,c=a,s=0;s<t.length;s++){var h=t[s];if(we(c))p=pe(c,h);else if(h in c)p=c[h];else{if(u!==void 0)return u;throw new Error("invalid state path: ".concat(t.join(".")))}c=p}return p}function re(a){try{a[Q]=!0}catch(t){}return a}function oe(a,t,u,p){for(var c=a,s=t.length-1,h=0;h<t.length;h++){var M=t[h],T=we(c);if(h===s){if(p===!0){var J=T?pe(c,M):c[M];$e(J)&&(c=J,M="value")}T?c.set(M,u):c[M]=u;return}var w=T?pe(c,M):c[M];c=w}}function ue(a){return(a||["ROOT"]).map(function(t){return Array.isArray(t)?t.join("."):t}).join(ae)}function ce(){return Math.random().toString(36).slice(2)}function ve(a,t,u){var p=a&&!a[0].startsWith("#");if(Array.isArray(t))return t;if(t==="self")return p?a:void 0;if(t==="root")return p?[]:void 0;if(t==="parent")return p?a.slice(0,-2):void 0;if(t==="current")return p?a.slice(0,-1):void 0;if(typeof t=="string")return t.startsWith("./")?p?[].concat(l()(a.slice(0,-1)),l()(t.slice(2).split(ae))):void 0:t.startsWith("../")?p?ve(a.slice(0,-1),t.slice(3),!0):void 0:t.startsWith("/")?t.replace(/^(\/)*/,"").split(ae):p&&u?[].concat(l()(a.slice(0,-1)),l()(t.split(ae))):t.split(ae)}function he(a,t){return t?t.map(function(u){return ve(a,u)}).filter(function(u){return u!==void 0}):[]}function _e(a,t){var u="";return t.id?u=t.id:u=ue(a),u}function ye(a,t,u){var p=a,c=t.length-1;t.forEach(function(s,h){var M=we(p);if(h===c){var T=M?p.get(s):p[s];r()(T)==="object"&&Object.assign(T,u);return}M?(p.has(s)||p.set(s,{}),p=p.get(s)):(s in p||(p[s]={}),p=p[s])})}function Se(a,t){function u(p,c){for(var s in p){var h=p[s];typeof t=="function"&&t({value:h,key:s,parent:p,path:c.concat(s)}),r()(h)==="object"&&u(h,c.concat(s))}}u(a,[])}function Le(a){return a}function Ve(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1e3;return new Promise(function(t){setTimeout(t,a)})}function Ae(a){var t=new Map;return a.forEach(function(u){var p=u.join(".");t.set(p,u)}),Array.from(t.values())}function Xe(a,t){return a.length>t.length?!1:a.every(function(u,p){return u===t[p]})}function Ze(a,t){var u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"none",p=[];return typeof a=="function"?p=t.collectDependencies(function(){return a(t.state)}):typeof a=="string"?p=[a.split(ae)]:Array.isArray(a)?p=[l()(a)]:p=[],u!=="none"&&p.forEach(function(c){var s=t.peep(function(h){return F(h,c)});$e(s)&&c.push(u==="all"?"*":"value")}),p}function Qe(a,t){if(!t||t.length===0)return!1;for(var u,p=a,c=0;c<t.length;c++){var s=t[c],h=!1;if(we(p)){if(h=p.has(s),!h)return!1;u=pe(p,s)}else{if(h=s in p,!h)return!1;u=p[s]}p=u}return!0}var Ut=e(24325),Ce=e.n(Ut);function nt(a,t){if(Array.isArray(a)){for(var u=l()(a),p=0;p<u.length;p++)u[p]=nt(u[p],t);return u}else if(r()(a)==="object"){if(!t&&$e(a))return a.value;var c=Ce()({},a);for(var s in c)c[s]=nt(c[s],t);return c}return a}function rt(a){return a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean"}function Kt(a){globalThis.__AUTOSTORE_EXTENDS__&&(globalThis.__AUTOSTORE_EXTENDS__=[]),typeof a=="function"&&globalThis.__AUTOSTORE_EXTENDS__.push(a)}function yt(a){return a?typeof a=="function":!1}var Et=function(a){U()(u,a);var t=j()(u);function u(p){var c;return L()(this,u),c=t.call(this),c.store=p,c}return d()(u,[{key:"enable",get:function(){return this.store.options.enableComputed},set:function(c){this.store.options.enableComputed=c}},{key:"create",value:function(){var c=Re(arguments[0])?arguments[0]:je.apply(void 0,arguments)();if(c.options.async&&!Ke(c.options.depends))throw new H("The scope of the dynamic computed object must be the root state object or an absolute path");var s=c.options.scope;if(s===void 0)c.options.scope="ROOT";else if(!Ke([s]))throw new z("The scope of the dynamic computed object must be the root state object or an absolute path");return this.store._createComputed(c)}},{key:"runGroup",value:function(){var p=n()(m()().mark(function s(h,M,T){return m()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.next=2,this.run(function(Z){return Z.group===h},M,T);case 2:return w.abrupt("return",w.sent);case 3:case"end":return w.stop()}},s,this)}));function c(s,h,M){return p.apply(this,arguments)}return c}()},{key:"run",value:function(){var p=n()(m()().mark(function s(){var h=arguments,M=this,T,J,w,Z,V=arguments;return m()().wrap(function(q){for(;;)switch(q.prev=q.next){case 0:if(V.length!==0){q.next=2;break}return q.abrupt("return",Promise.all(l()(this.values()).map(function(se){return se.run()})));case 2:return typeof V[0]=="function"?T=V[0]:typeof V[0]=="string"&&(T=function(ie){return ie.id===h[0]}),J=Object.assign({},V[1]),w=Object.assign({wait:!1,timeout:0},V[2]),Z={},q.abrupt("return",new Promise(function(se,ie){if(w.wait){var le;J.onDone=function(xe){var be=xe.id;if(Z[be]=!0,Object.values(Z).every(function(Te){return Te}))return clearTimeout(le),!0},w.timeout>0&&(le=setTimeout(function(){ie(new W)},w.timeout))}Promise.all(l()(M.values()).filter(function(xe){return T(xe)?(Z[xe.id]=!1,!0):!1}).map(function(xe){return xe.run(J)})),w.wait||se()}));case 7:case"end":return q.stop()}},s,this)}));function c(){return p.apply(this,arguments)}return c}()},{key:"enableGroup",value:function(){var p=n()(m()().mark(function s(h){var M,T,J;return m()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:M=f()(this.values());try{for(M.s();!(T=M.n()).done;)J=T.value,J.options.enable=h}catch(V){M.e(V)}finally{M.f()}case 2:case"end":return Z.stop()}},s,this)}));function c(s){return p.apply(this,arguments)}return c}()},{key:"delete",value:function(c){var s;return(s=this.get(c))===null||s===void 0||s.detach(),N()(D()(u.prototype),"delete",this).call(this,c)}},{key:"find",value:function(c){if(c){var s=Array.isArray(c)?c:c.split(ae),h=f()(this.values()),M;try{for(h.s();!(M=h.n()).done;){var T=M.value;if(ke(T.path,s))return T}}catch(J){h.e(J)}finally{h.f()}}}}]),u}(R()(Map)),wt=e(69075);function Vt(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",u=typeof a=="function"?a():a instanceof Error?a.stack:a;try{var p;(p=console)[t].apply(p,["[AutoStore<".concat(this.id,">]")].concat(l()(Array.isArray(u)?u:[u])))}catch(c){}}function qe(a,t){var u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ae,p=[];try{return typeof t=="function"&&(t=t.call(a,a)),p=Array.isArray(t)?t:typeof t=="string"?t.split(u):[],p.length>0?F(a,p):a}catch(c){return a}}var Je=function(a){return a.Root="ROOT",a.Current="CURRENT",a.Parent="PARENT",a.Depends="DEPENDS",a.Self="SELF",a}({});function Gt(a,t,u){var p=t===void 0?u:t;if(typeof p=="function")try{p=p.call(a.store,a)}catch(c){}return p===void 0?u===void 0?Je.Current:u:p}function ot(a,t,u,p){var c=a.store.state,s=a.store.options;if(typeof s.getRootScope=="function"){var h=s.getRootScope(a,{observerType:t,valuePath:u==null?void 0:u.path});h!==void 0&&(c=h)}var M=u||{},T=M.path,J=M.parentPath,w=Gt(a,p.scope,s.scope),Z=c;try{if(w===Je.Current)Z=qe(c,J);else if(w===Je.Parent)Z=qe(c,T.slice(0,T.length-2<0?0:T.length-2));else if(w===Je.Root)Z=c;else if(w===Je.Depends){var V;Z=(V=a.depends)===null||V===void 0?void 0:V.map(function(ne){return qe(c,ne)})}else typeof w=="string"?w.startsWith("@")?Z=ot(a,t,u,Ce()(Ce()({},p),{},{scope:ot(a,t,Ce()(Ce()({},u),{},{path:w.slice(1).split(ae)}),Ce()(Ce()({},p),{},{scope:w.slice(1)}))})):Z=qe(c,ve(a.path,w)):Array.isArray(w)&&(Z=qe(c,w))}catch(ne){s.log("Error while getting computed scope ".concat(a.toString(),": ").concat(ne.message),"error")}return Z}var st=function(){function a(t,u,p){L()(this,a),E()(this,"_path",void 0),E()(this,"_id",""),E()(this,"_initial",void 0),E()(this,"_value",void 0),E()(this,"_associated",!1),E()(this,"_attached",!1),E()(this,"_getter",void 0),E()(this,"_depends",[]),E()(this,"_options",void 0),E()(this,"_subscribers",[]),E()(this,"_strPath",void 0),this.store=t,this.descriptor=u,this.context=p,this._associated=p!==void 0,this._getter=u.getter,this._options=Object.assign({enable:!0,group:"",depends:[]},u.options),this._id=this._options.id||(this._associated?ue(p==null?void 0:p.path):ce()),this._path=(p==null?void 0:p.path)||["#".concat(this._id)],this._path||(this._path=["#".concat(this._id)]),this._initial=this._options.initial,this.onInitOptions(this._options),this._depends=he(this._path,this._options.depends),this._onObserverCreated(),this._onInitial()}return d()(a,[{key:"type",get:function(){return this.descriptor.type}},{key:"options",get:function(){return this._options}},{key:"id",get:function(){return this._id}},{key:"associated",get:function(){return this._associated}},{key:"async",get:function(){return this._options.async}},{key:"enable",get:function(){return this._options.enable},set:function(u){this._options.enable=u}},{key:"group",get:function(){return this._options.group},set:function(u){this._options.group=u}},{key:"initial",get:function(){return this._initial},set:function(u){this._initial=u}},{key:"path",get:function(){return this._path}},{key:"attached",get:function(){return this._attached}},{key:"depends",get:function(){return this._depends},set:function(u){this._depends=u}},{key:"getter",get:function(){return this._getter},set:function(u){this._getter=u}},{key:"strPath",get:function(){return this._strPath||(this._strPath=this._path.join(ae)),this._strPath}},{key:"toString",value:function(){return"ObserverObject<".concat(this.strPath,">")}},{key:"value",get:function(){return this._associated?F(this.store.state,this._path):(this.store._notify({type:"get",path:this.path,value:this._value}),this._value)},set:function(u){this._associated?oe(this.store.state,this._path,u):(this._value=u,this.store._notify({type:"set",path:this.path,value:u}))}},{key:"_onObserverCreated",value:function(){typeof this.store.options.onObserverCreated=="function"&&this.store.options.onObserverCreated(this)}},{key:"_onInitial",value:function(){this._options.initial!==void 0&&this.update(this._options.initial,{silent:!0}),this.onInitial()}},{key:"onInitial",value:function(){}},{key:"onInitOptions",value:function(u){}},{key:"update",value:function(u,p){var c=this;this.store.update(function(){c.value=u},p)}},{key:"silentUpdate",value:function(u){this.update(u,{silent:!0})}},{key:"watch",value:function(u,p){var c=this;return this.store.watch(this.getValueWatchPath(),function(s){u.call(c,s)},p)}},{key:"getValueWatchPath",value:function(){return this.path.join(ae)}},{key:"emitStoreEvent",value:function(u,p){var c=this;setTimeout(function(){c.store.emit(u,p)},0)}},{key:"getDepends",value:function(){return this.depends}},{key:"onDependsChange",value:function(u){}},{key:"attach",value:function(){var u=this;!this._attached&&this.depends&&this.depends.length>0&&(this._subscribers.push(this.store.watch(this.getDepends(),this.onDependsChange.bind(this),{operates:"write"})),this.store.log(function(){return"".concat(u.toString()," subscribed to ").concat(u.depends.map(function(p){return p.join(ae)}).join(","))}),this._attached=!0)}},{key:"detach",value:function(){this._attached&&(this._subscribers.forEach(function(u){return u.off()}),this._attached=!1)}},{key:"run",value:function(){}}]),a}(),ct=function(a){U()(u,a);var t=j()(u);function u(p,c,s){var h;return L()(this,u),h=t.call(this,p,c,s),h.store=p,h.descriptor=c,h.context=s,c.options.depends=he(h.path,h.options.depends),h}return d()(u,[{key:"toString",value:function(){return"ComputedObject<".concat(ue(this.path),">")}},{key:"isDisable",value:function(c){return!this.store.options.enableComputed||!this.enable&&c!==!0||c===!1}},{key:"run",value:function(c){throw new Error("Method not implemented.")}}]),u}(st),bt=function(a){U()(u,a);var t=j()(u);function u(){return L()(this,u),t.apply(this,arguments)}return d()(u,[{key:"async",get:function(){return!1}},{key:"onInitial",value:function(){this.collectDependencies()}},{key:"run",value:function(c){var s=this,h=Object.assign({first:!1,operate:void 0},c),M=h.first,T=h.operate;if(!M&&this.isDisable(c==null?void 0:c.enable)){this.store.log("Sync computed <".concat(this.toString(),"> is disabled"),"warn");return}!M&&this.store.log(function(){return"Run sync computed for : ".concat(s.toString())});var J=c?Object.assign({},this.options,c):this.options,w=ot(this,"computed",this.context,J),Z=J.initial;try{Z=this.getter.call(this,w,{operate:T,first:M}),M&&(this.initial=Z),this.store.peep(function(){s.value=Z}),!M&&this.emitStoreEvent("computed:done",{id:this.id,path:this.path,value:Z,computedObject:this})}catch(V){throw!M&&this.emitStoreEvent("computed:error",{id:this.id,path:this.path,error:V,computedObject:this}),V}}},{key:"collectDependencies",value:function(){var c=[],s=this.store.watch(function(h){c.push(h.path)},{operates:["get"]});this.run({first:!0}),s.off(),Array.isArray(this.options.depends)&&this.options.depends.length>0&&c.push.apply(c,l()(he(this.path,this.options.depends))),this.depends=Ae(c),this.attach()}},{key:"onDependsChange",value:function(c){this.run({operate:c})}}]),u}(ct);function zt(a,t,u,p,c){return u==="push"?function(){for(var s=t.length,h=arguments.length,M=new Array(h),T=0;T<h;T++)M[T]=arguments[T];var J=p.apply(t,M);if(t.length>s){var w=Array.from({length:t.length-s},function(Z,V){return V+s});a({type:"insert",path:c,indexs:w,value:M,oldValue:void 0,parentPath:c,parent:t})}return J}:u==="pop"?function(){var s=t.length,h=p.apply(t);return t.length===s-1&&a({type:"remove",path:c,indexs:[s-1],value:[h],oldValue:void 0,parentPath:c,parent:t}),h}:u==="splice"?function(s,h){for(var M=arguments.length,T=new Array(M>2?M-2:0),J=2;J<M;J++)T[J-2]=arguments[J];var w=p.apply(t,[s,h].concat(T));if(w.length>0){var Z=Array.from({length:w.length},function(ne,q){return s+q});a({type:"remove",path:c,indexs:Z,value:w,oldValue:void 0,parentPath:c,parent:t})}if(T.length>0){var V=Array.from({length:T.length},function(ne,q){return s+q});a({type:"insert",path:c,indexs:V,value:T,oldValue:void 0,parentPath:c,parent:t})}return w}:u==="unshift"?function(){for(var s=t.length,h=arguments.length,M=new Array(h),T=0;T<h;T++)M[T]=arguments[T];var J=p.apply(t,M);if(t.length>s){var w=Array.from({length:t.length-s},function(Z,V){return V});a({type:"insert",path:c,indexs:w,value:M,oldValue:void 0,parentPath:c,parent:t})}return J}:u==="shift"?function(){var s=t.length,h=p.apply(t);return t.length===s-1&&a({type:"remove",path:c,indexs:[0],value:[h],oldValue:void 0,parentPath:c,parent:t}),h}:u==="fill"?function(s,h,M){var T=p.apply(t,[s,h,M]),J=h!=null?h:0,w=M!=null?M:t.length,Z=Array.from({length:w-J},function(ne,q){return q+J}),V=Array.from({length:w-J},function(){return s});return a({type:"update",path:c,indexs:Z,value:V,oldValue:void 0,parentPath:c,parent:t}),T}:u==="concat"?function(){for(var s=t.length,h=arguments.length,M=new Array(h),T=0;T<h;T++)M[T]=arguments[T];var J=p.apply(t,M),w=Array.from({length:M.length},function(Z,V){return s+V});return a({type:"insert",path:c,indexs:w,value:M,oldValue:void 0,parentPath:c,parent:t}),J}:p}var it=Symbol("__NOTIFY__");function Ct(a,t,u,p,c){if(Ge(a)||r()(a)!=="object"||a===null)return a;if(u.has(a))return u.get(a);var s=new Proxy(a,{get:function(M,T,J){var w=Reflect.get(M,T,J);if(typeof T!="string")return w;var Z=[].concat(l()(t),[String(T)]);if(typeof w=="function"||!Object.hasOwn(M,T))if(typeof w=="function"){if(Array.isArray(M))return zt(c.notify,M,T,w,t);if(!Ge(w)&&Object.hasOwn(M,T)){var V=Z.join(".");try{if(p.has(V)){var ne=[].concat(l()(p.keys()),[V]);throw p.clear(),new k('Find circular dependency at <"'.concat(Z,'">, steps: ').concat(ne.join(" <- ")))}return p.set(V,!0),c.createComputedObject(Z,w,t,M)}finally{p.delete(V)}}else return w}else return w;return c.notify({type:"get",path:Z,indexs:[],value:w,oldValue:void 0,parentPath:t,parent:M}),Ct(w,Z,u,p,c)},set:function(M,T,J,w){var Z=Reflect.get(M,T,w),V=Reflect.set(M,T,J,w);if(T===it)return!0;if(V&&T!==it&&J!==Z)if(Array.isArray(M))c.notify({type:"update",path:t,indexs:[Number(T)],value:J,oldValue:Z,parentPath:t,parent:M});else{var ne=[].concat(l()(t),[String(T)]);c.notify({type:"set",path:ne,indexs:[],value:J,oldValue:Z,parentPath:t,parent:M})}return V},deleteProperty:function(M,T){var J=M[T],w=[].concat(l()(t),[String(T)]),Z=Reflect.deleteProperty(M,T);return Z&&T!==it&&c.notify({type:"delete",path:w,indexs:[],value:J,oldValue:void 0,parentPath:t,parent:M}),Z}});return u.set(a,s),s}function Zt(a,t){var u=new Map,p=new WeakMap;return Ct(a,[],p,u,t)}var Jt=e(28633),Ee=e.n(Jt),Ht=e(75396),Yt=e.n(Ht),Xt=e(21206);function Qt(a){return a instanceof Error?a:new Error(a)}var Ot=function(a){U()(u,a);var t=j()(u);function u(){var p;L()(this,u);for(var c=arguments.length,s=new Array(c),h=0;h<c;h++)s[h]=arguments[h];return p=t.call.apply(t,[this].concat(s)),E()(x()(p),"_isRunning",!1),E()(x()(p),"_defaultAbortController",null),E()(x()(p),"_userAbortController",void 0),E()(x()(p),"_firstRun",!1),p}return d()(u,[{key:"async",get:function(){return!0}},{key:"value",get:function(){return N()(D()(u.prototype),"value",this)},set:function(c){Yt()(D()(u.prototype),"value",c,this,!0)}},{key:"running",get:function(){return this._isRunning}},{key:"onInitOptions",value:function(c){c.reentry||(c.reentry=this.store.options.reentry)}},{key:"onInitial",value:function(){var c=this;this.initial=this.createAsyncComputedValue(),this.attach(),setTimeout(function(){(c.options.immediate===!0||c.options.immediate==="auto"&&c.options.initial===void 0)&&c.run({first:!0})},0)}},{key:"createAsyncComputedValue",value:function(){var c=this;return Object.assign(E()(E()(E()(E()(E()(E()(E()(E()(E()({},de,!0),"loading",!1),"timeout",0),"retry",0),"error",null),"value",this.options.initial),"progress",0),"run",re(function(s){return c.store.computedObjects.run(c.id,Object.assign({},s))})),"cancel",re(function(){c.getAbortController().abort()})))}},{key:"updateComputedValue",value:function(c){var s=this,h=this.strPath,M=Object.keys(c).length;if(this.associated)this.store.update(function(J){ye(J,s.path,c)},{batch:M>1?h:!1});else{Object.assign(this.value,c);var T=M>1;Object.entries(c).forEach(function(J){var w=Ee()(J,2),Z=w[0],V=w[1],ne={type:"set",path:[s.strPath,Z],value:V,parent:s.value};T&&(ne.reply=!0),s.store.operates.emit("".concat(s.strPath,".").concat(Z),ne)}),T&&this.store.operates.emit(h,{type:"batch",path:this.path,value:this.value})}}},{key:"run",value:function(){var p=n()(m()().mark(function s(h){var M=this,T,J,w,Z,V;return m()().wrap(function(q){for(;;)switch(q.prev=q.next){case 0:if(T=h!=null?h:{},J=T.first,!this.isDisable(h==null?void 0:h.enable)){q.next=4;break}return this.store.log(function(){return"Async computed <".concat(M.toString(),"> is disabled")},"warn"),q.abrupt("return");case 4:if(this._firstRun=!0,!J&&this.store.log(function(){return"Run async computed for : ".concat(M.toString())}),w=h?Object.assign({first:J},this.options,h):this.options,Z=ot(this,"computed",this.context,w),V=w.reentry,!(this._isRunning&&!V)){q.next=13;break}return this.store.log(function(){return"Async computed: ".concat(M.toString()," is over maximum reentry count")},"warn"),this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,reason:"reentry",computedObject:this}),q.abrupt("return");case 13:return this._isRunning=!0,q.prev=14,q.next=17,this.executeGetter(Z,w);case 17:return q.abrupt("return",q.sent);case 18:return q.prev=18,this._isRunning=!1,q.finish(18);case 21:case"end":return q.stop()}},s,this,[[14,,18,21]])}));function c(s){return p.apply(this,arguments)}return c}()},{key:"createComputeProgressbar",value:function(c){var s=this,h=Object.assign({},c),M=h.max,T=M===void 0?100:M,J=h.min,w=J===void 0?0:J,Z=h.value,V=Z===void 0?0:Z;return this.updateComputedValue({progress:V}),{value:function(q){q>T&&(q=T),q<w&&(q=w),s.updateComputedValue({progress:q})},end:function(){this.value(T)}}}},{key:"getAbortController",value:function(c){if(c&&typeof c.abortController=="function"){var s=c.abortController();s&&s instanceof AbortController&&(this._userAbortController=s)}return this._userAbortController?this._userAbortController:(this._defaultAbortController||(this._defaultAbortController=new AbortController),this._defaultAbortController.signal.aborted&&(this._defaultAbortController=new AbortController),this._defaultAbortController)}},{key:"setTimeoutControl",value:function(c,s,h){var M=this,T=h.timeout,J=Array.isArray(T)?T:[T,0],w=Ee()(J,2),Z=w[0],V=Z===void 0?0:Z,ne=w[1],q=ne===void 0?0:ne,se,ie;return V>0&&(s.timeout=q>1?q:V,ie=setTimeout(function(){c.hasTimeout=!0,c.hasError=!0,c.error="TIMEOUT",typeof c.timeoutCallback=="function"&&c.timeoutCallback(),clearInterval(se),M.updateComputedValue({loading:!1,error:"TIMEOUT",timeout:0})},V),q>1&&(se=setInterval(function(){M.updateComputedValue({timeout:q--}),q===0&&clearInterval(se)},V/(q+1)))),{clear:function(){clearTimeout(ie),clearInterval(se)},enable:V>0}}},{key:"executeGetter",value:function(){var p=n()(m()().mark(function s(h,M){var T,J,w,Z,V,ne,q,se,ie,le,xe,be,Te,Pe,Ne,Ue;return m()().wrap(function(Oe){for(;;)switch(Oe.prev=Oe.next){case 0:T=M.retry,J=T===void 0?[0,0]:T,w=Array.isArray(J)?J:[Number(J),0],Z=Ee()(w,2),V=Z[0],ne=Z[1],se=this.getAbortController(M),ie={onTimeout:function(tt){return q=tt},getProgressbar:this.createComputeProgressbar.bind(this),getSnap:function(tt){return tt},cancel:se.abort,extras:M.extras,operate:M.operate,first:M.first,abortSignal:se.signal},le={error:null,hasError:!1,hasTimeout:!1,hasAbort:!1,timeoutCallback:q},se.signal.addEventListener("abort",function(){return le.hasAbort=!0}),xe={clear:function(){},enable:!1},Te=function(tt){return Object.assign(le,tt)},Pe=0;case 9:if(!(Pe<V+1)){Oe.next=46;break}if(Ne={},Oe.prev=11,Ue={loading:!0},le.hasError&&(Ue.error=null),V>0&&(Ue.retry=Pe>0?V-Pe+1:0),Pe>0&&Te({error:null,hasError:!1,hasTimeout:!1}),xe=this.setTimeoutControl(le,Ue,M),this.updateComputedValue(Ue),!le.hasAbort){Oe.next=20;break}throw new $;case 20:return Oe.next=22,this.getter.call(this,h,ie);case 22:if(be=Oe.sent,!le.hasAbort){Oe.next=25;break}throw new $;case 25:le.hasTimeout||(Ne.value=be,xe.enable&&(Ne.timeout=0)),Oe.next=33;break;case 28:Oe.prev=28,Oe.t0=Oe.catch(11),le.hasError=!0,le.error=Oe.t0,le.hasTimeout||(Ne.error=Qt(Oe.t0).message);case 33:return Oe.prev=33,xe.clear(),Pe===V&&(le.hasTimeout&&(Ne.error=le.error),V>0&&(Ne.retry=0)),Ne.loading=!1,this.updateComputedValue(Ne),Oe.finish(33);case 39:if(!le.hasError){Oe.next=43;break}if(!(V>0&&ne>0&&Pe<V)){Oe.next=43;break}return Oe.next=43,(0,Xt.g)(ne);case 43:Pe++,Oe.next=9;break;case 46:le.hasAbort?this.emitStoreEvent("computed:cancel",{path:this.path,id:this.id,computedObject:this}):le.hasError||le.hasTimeout?this.emitStoreEvent("computed:error",{path:this.path,id:this.id,error:le.error,computedObject:this}):this.emitStoreEvent("computed:done",{path:this.path,id:this.id,value:be,computedObject:this}),this.onDoneCallback(M,le.error,le.hasAbort,le.hasTimeout,h,be);case 48:case"end":return Oe.stop()}},s,this,[[11,28,33,39]])}));function c(s,h){return p.apply(this,arguments)}return c}()},{key:"onDoneCallback",value:function(c,s,h,M,T,J){typeof c.onDone=="function"&&c.onDone.call(this,{id:this.id,path:this.path,value:J,error:s,abort:h,timeout:M,scope:T})}},{key:"onDependsChange",value:function(c){var s=this;this.store.log(function(){return"AsyncComputed<".concat(s.id,"> is running by depends ").concat(c.type,"/").concat(c.path.join(".")," operate ")}),this.run({operate:c,first:!this._firstRun})}},{key:"getValueWatchPath",value:function(){var c=this.path.join(ae);return["".concat(c,".*"),c]}},{key:"getDepends",value:function(){var c=this,s=N()(D()(u.prototype),"getDepends",this).call(this);return s.map(function(h){if(h.length===0)return h;var M=f()(c.store.computedObjects.values()),T;try{for(M.s();!(T=M.n()).done;){var J=T.value;if(ke(J.path,h)&&J.async)return["".concat(h,".value")]}}catch(w){M.e(w)}finally{M.f()}return h})}}]),u}(ct);function St(){var a=arguments[0],t=typeof arguments[1]=="function"?arguments[1]:function(){return!0},u=r()(arguments[1])==="object"?arguments[1]:arguments[2],p=Object.assign({depends:[],enable:!0,objectify:!0,filter:t},u),c=function(){return{type:"watch",getter:a,options:p}};return c[ee]=!0,c}var Bt=function(a){U()(u,a);var t=j()(u);function u(p){var c;return L()(this,u),c=t.call(this),E()(x()(c),"_watcher",{off:function(){}}),E()(x()(c),"_enable",!0),c.store=p,c}return d()(u,[{key:"enable",get:function(){return this._enable},set:function(c){this._enable=c}},{key:"set",value:function(c,s){return N()(D()(u.prototype),"size",this)===0&&this.createWacher(),N()(D()(u.prototype),"set",this).call(this,c,s)}},{key:"createWacher",value:function(){var c=this;this._watcher=this.store.watch("**",function(s){var h=s.path;if(c._enable){var M=F(c.store.state,h),T=f()(c.values()),J;try{for(T.s();!(J=T.n()).done;){var w=J.value;w.isMatched(h,M)&&w.run(h,M)}}catch(Z){T.e(Z)}finally{T.f()}}})}},{key:"reset",value:function(){this._watcher&&this._watcher.off(),this.createWacher()}},{key:"create",value:function(c,s,h){var M=St(c,s,h),T=M();return this.store._createWatch(T)}},{key:"enableGroup",value:function(c){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,h=f()(this.values()),M;try{for(h.s();!(M=h.n()).done;){var T=M.value;T.options.group===c&&(T.options.enable=s)}}catch(J){h.e(J)}finally{h.f()}}}]),u}(R()(Map)),Nt=function(a){U()(u,a);var t=j()(u);function u(p,c,s){var h;if(L()(this,u),h=t.call(this,p,c,s),E()(x()(h),"_cache",void 0),h.store=p,h.context=s,typeof h.options.filter!="function")throw new Error("watch options.filter must be a function");return h}return d()(u,[{key:"filter",get:function(){return this.options.filter}},{key:"cache",get:function(){return this._cache||(this._cache={}),this._cache}},{key:"toString",value:function(){return"WatchObject<".concat(this.id,">")}},{key:"onInitial",value:function(){}},{key:"isMatched",value:function(c,s){return Me(c,this.path)?!1:this.filter(c,s)}},{key:"reset",value:function(){this._cache={},this.value=this.initial}},{key:"run",value:function(c,s){if(!this.enable){this.store.log("WatchObject <".concat(this.toString(),"> is disabled"));return}try{var h,M=(h=this.getter)===null||h===void 0?void 0:h.call(this,{path:c,value:s},this);this.value=M,this.emitStoreEvent("watch:done",{value:M,watchObject:this})}catch(T){this.emitStoreEvent("watch:error",{error:T,watchObject:this})}}}]),u}(st),Pt=ae;function At(a,t){if(!t||t==="**")return!0;var u=a.split(Pt),p=t.split(Pt);if(u.length!==p.length)return!1;for(var c=0;c<p.length;c++)if(p[c]!=="*"&&p[c]!==u[c])return!1;return!0}var pt=function(){function a(){L()(this,a),E()(this,"_listeners",new Map)}return d()(a,[{key:"listeners",get:function(){return this._listeners}},{key:"on",value:function(){var u=this,p=arguments[0],c=arguments[1],s=arguments[2],h=c;return p==="**"?this.addHandler("*",h,s):String(p).includes("*")?(h=function(T,J){At(J,p)&&c(T,J)},this.addHandler("*",h,s)):this.addHandler(p,h,s),{off:function(){return u.off(p,h)}}}},{key:"addHandler",value:function(u,p,c){var s=this._listeners.get(u);s?c?s.unshift(p):s.push(p):this._listeners.set(u,[p])}},{key:"once",value:function(u,p){var c=this,s=function h(M,T){try{p(M,T)}finally{c.off(T,h)}};return this.on(u,s)}},{key:"off",value:function(u,p){String(u).includes("*")&&(u="*");var c=this._listeners.get(u);c&&(p?c.splice(c.indexOf(p)>>>0,1):this._listeners.set(u,[]))}},{key:"offAll",value:function(){this._listeners.clear()}},{key:"onAny",value:function(u){return this.on("**",u)}},{key:"wait",value:function(){var u=this,p=r()(arguments[0]),c=p==="string"?arguments[0]:void 0,s=arguments[1]||0,h=p==="function"?p:void 0,M;return new Promise(function(T,J){var w;c?w=u.once(c,function(Z){clearTimeout(M),T(Z)}):typeof h=="function"&&(w=u.onAny(function(Z,V){var ne=h(V,Z);ne!==!1&&(w.off(),clearTimeout(M),T(Z))})),s>0&&(M=setTimeout(function(){w.off(),J(new Error("timeout"))},s))})}},{key:"emit",value:function(u,p){var c=this._listeners.get("*");c&&c.slice().map(function(s){s(p,u)}),c=this._listeners.get(u),c&&c.slice().map(function(s){s(p,u)})}}]),a}();function qt(a){var t;return ze(a)?t=a():typeof a=="function"&&(t={type:"computed",getter:a,options:Object.assign({},De(),{async:fe(a)})}),t}var Dt=function(a){U()(u,a);var t=j()(u);function u(p,c){var s;return L()(this,u),s=t.call(this),E()(x()(s),"_data",void 0),E()(x()(s),"computedObjects",void 0),E()(x()(s),"watchObjects",void 0),E()(x()(s),"_operates",new pt),E()(x()(s),"_options",void 0),E()(x()(s),"_silenting",!1),E()(x()(s),"_batching",!1),E()(x()(s),"_batchOperates",[]),E()(x()(s),"_peeping",!1),s._options=(0,wt.w)({id:ce(),debug:!1,lazy:!1,enableComputed:!0,reentry:!0,log:Vt},c),s.computedObjects=new Et(x()(s)),s.watchObjects=new Bt(x()(s)),s.subscribeCallbacks(),s._data=Zt(p,{notify:s._notify.bind(x()(s)),createComputedObject:s.createObserverObject.bind(x()(s))}),s.getSnap=s.getSnap.bind(x()(s)),s.watch=s.watch.bind(x()(s)),s.update=s.update.bind(x()(s)),s.peep=s.peep.bind(x()(s)),s.silentUpdate=s.silentUpdate.bind(x()(s)),s.batchUpdate=s.batchUpdate.bind(x()(s)),s.collectDependencies=s.collectDependencies.bind(x()(s)),s.trace=s.trace.bind(x()(s)),s.installExtends(),s._options.lazy||Se(s._data),s._options.debug&&r()(globalThis.__AUTOSTORE_DEVTOOLS__)==="object"&&globalThis.__AUTOSTORE_DEVTOOLS__.add(x()(s)),s.emit("load",x()(s)),s}return d()(u,[{key:"id",get:function(){return this._options.id}},{key:"state",get:function(){return this._data}},{key:"operates",get:function(){return this._operates}},{key:"options",get:function(){return this._options}},{key:"silenting",get:function(){return this._silenting}},{key:"batching",get:function(){return this._batching}},{key:"peeping",get:function(){return this._peeping}},{key:"log",value:function(c,s){this._options.debug&&this.options.log.call(this,c,s)}},{key:"installExtends",value:function(){var c=this,s=globalThis.__AUTOSTORE_EXTENDS__;Array.isArray(s)&&s.forEach(function(h){return typeof h=="function"&&h(c)})}},{key:"subscribeCallbacks",value:function(){this._options.onComputedCreated&&this.on("computed:created",this._options.onComputedCreated.bind(this)),this._options.onComputedDone&&this.on("computed:done",this._options.onComputedDone.bind(this)),this._options.onComputedError&&this.on("computed:error",this._options.onComputedError.bind(this)),this._options.onComputedCancel&&this.on("computed:cancel",this._options.onComputedCancel.bind(this))}},{key:"_notify",value:function(c){this._peeping&&c.type==="get"||(this._batching&&this._batchOperates.push(c),!this._silenting&&this.operates.emit(c.path.join(ae),c))}},{key:"watch",value:function(){var c=this,s=typeof arguments[0]=="function"||arguments[0]==="*",h=s?arguments[0]:arguments[1],M=function(Ne,Ue){return function(Ye){if(Ne!=="*"){if(Ne==="write"){if(Ye.type==="get")return}else if(Ne==="read"){if(Ye.type!=="get")return}else if(Array.isArray(Ne)&&Ne.length>0&&!Ne.includes(Ye.type))return}if(!(typeof Ue=="function"&&!Ue(Ye)))try{c._peeping=!0,h(Ye)}finally{c._peeping=!1}}};if(s){var T=Object.assign({once:!1,operates:"write"},arguments[1]),J=T.operates,w=T.filter,Z=M(J,w);return this.operates.onAny(Z)}else{var V=arguments[0],ne=Array.isArray(V)?V.map(function(Pe){return typeof Pe=="string"?Pe:Pe.join(ae)}):[V],q=Object.assign({once:!1,operates:"write"},arguments[2]),se=q.once,ie=q.operates,le=q.filter,xe=se?this.operates.once.bind(this.operates):this.operates.on.bind(this.operates),be=[],Te=M(ie,le);return ne.forEach(function(Pe){be.push(xe.call(c,Pe,Te))}),{off:function(){return be.forEach(function(Ne){return Ne.off()})}}}}},{key:"createObserverObject",value:function(c,s,h,M){var T=qt(s),J={path:c,value:s,parentPath:h,parent:M};if(T){if(T.type==="computed"){var w=this._createComputed(T,J);return w==null?void 0:w.initial}else if(T.type==="watch"){var Z=this._createWatch(T,J);return Z==null?void 0:Z.initial}}else return s}},{key:"_createComputed",value:function(c,s){var h;return c.options.async?h=new Ot(this,c,s):h=new bt(this,c,s),h&&(h.silentUpdate(h.initial),h.options.objectify&&this.computedObjects.set(h.id,h),this.emit("computed:created",h)),h}},{key:"_createWatch",value:function(c,s){var h=new Nt(this,c,s);return c.options.objectify&&this.watchObjects.set(h.id,h),this.emit("watch:created",h),h}},{key:"silentUpdate",value:function(c){this.update(c,{silent:!0})}},{key:"batchUpdate",value:function(c){this.update(c,{batch:!0})}},{key:"update",value:function(c,s){var h=this,M=Object.assign({},s),T=M.batch,J=T===void 0?!1:T,w=M.reply,Z=w===void 0?!0:w,V=M.silent,ne=V===void 0?!1:V,q=M.peep,se=q===void 0?!1:q;if(typeof c=="function"){ne&&(this._silenting=!0),J&&(this._batching=!0,this._silenting=!0),se&&(this._peeping=!0);try{var ie=c(this.state);if(J&&at(ie))throw new Error("Batch update method can't be async function")}finally{if(this._silenting=!1,this._batching=!1,this._peeping=!1,this._batchOperates.length>0){var le=l()(this._batchOperates);this._batchOperates=[],Z&&le.forEach(function(be){be.reply=!0,h._notify(be)});try{var xe=J===!0?me:String(J);this.operates.emit(xe,{type:"batch",path:[xe],value:le})}finally{this._batchOperates=[]}}}}else throw new Error("update method must provide a function argument")}},{key:"peep",value:function(){var c=arguments,s=this,h=typeof arguments[0]=="function"?function(){return c[0](s.state)}:function(){return F(s.state,Array.isArray(c[0])?c[0]:c[0].split(ae))};this._peeping=!0;try{return h()}finally{this._peeping=!1}}},{key:"collectDependencies",value:function(c){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",h=[],M=this.watch(function(T){h.push(T.path)},{operates:s});try{c()}finally{M.off()}return Ae(h)}},{key:"trace",value:function(c){var s=this,h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"*",M;return{stop:function(){return M&&M.off()},start:function(){var T=n()(m()().mark(function w(Z){var V;return m()().wrap(function(q){for(;;)switch(q.prev=q.next){case 0:return V=[],q.abrupt("return",new Promise(function(se){M=s.watch(function(ie){V.push(ie),Z&&Z(ie)&&(M.off(),se(V))},{operates:h}),Promise.resolve(c()).finally(function(){typeof Z!="function"&&(M.off(),se(V))})}));case 2:case"end":return q.stop()}},w)}));function J(w){return T.apply(this,arguments)}return J}()}}},{key:"destroy",value:function(){this.offAll(),this._operates.offAll(),this.watchObjects.clear(),this.computedObjects.clear(),this.emit("unload",this)}},{key:"getSnap",value:function(c){var s=Object.assign({reserveAsync:!0},c),h=s.reserveAsync,M=s.entry;return nt(M?F(this._data,M):this._data,h)}}]),u}(pt),Ie=e(92379);function We(a,t,u,p){if(!t)return a.state;var c;try{typeof t=="function"?c=t(a.state):Array.isArray(t)?c=F(a.state,t):c=F(a.state,t.split(ae)),u&&$e(c)&&(c=c.value)}catch(s){if(p)return p(s)}return c}function ea(a){return function(){var t=arguments,u=t.length>=1&&(Array.isArray(t[0])||typeof t[0]=="string"||typeof t[0]=="function")?t[0]:void 0,p=t.length===2&&typeof t[1]=="function"?t[1]:void 0,c=t.length===2&&(typeof u=="string"||Array.isArray(u))&&typeof t[1]=="boolean"?t[1]:!1,s=(0,Ie.useState)(function(){return We(a,u,c!==!0)}),h=Ee()(s,2),M=h[0],T=h[1],J=a.useDeps(u,c===!0?"all":"value");(0,Ie.useEffect)(function(){var Z;return J.length===0?Z=a.watch(function(V){var ne=V.reply;ne||T(Ce()({},a.state))}):Z=a.watch(J,function(){var V=We(a,u);T(Fe(V)?Ce()({},V):Array.isArray(V)?l()(V):V)}),function(){return Z.off()}},[J]);var w=(0,Ie.useCallback)(function(Z){u?typeof u=="string"?a.update(function(V){return oe(V,u.split(ae),Z)}):Array.isArray(u)?a.update(function(V){return oe(V,u,Z)}):typeof u=="function"&&p&&a.update(function(V){return p(Z,V)}):typeof Z=="function"&&a.update(function(V){return Z(V)},{batch:!0})},[u]);return[M,w]}}function ta(a){return function(t){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",p=(0,Ie.useState)(function(){return Ze(t,a,u)}),c=Ee()(p,1),s=c[0];return s}}var Be=e(651);function aa(a,t,u){var p=u.errorBoundary||a.options.signalErrorBoundary;return Ie.memo(function(){var c=a.useDeps(t),s=(0,Ie.useState)(null),h=Ee()(s,2),M=h[0],T=h[1],J=(0,Ie.useState)(function(){return We(a,t,!0,T)}),w=Ee()(J,2),Z=w[0],V=w[1];return(0,Ie.useEffect)(function(){var ne=a.watch(c,function(){V(We(a,t,!0,T))});return function(){return ne.off()}},[c]),(0,Be.jsx)(Be.Fragment,{children:M?(0,Be.jsx)(p,{error:M}):Z})},function(){return!0})}function na(a,t,u,p){var c=p.errorBoundary||a.options.signalErrorBoundary;return Ie.memo(function(){var s=(0,Ie.useState)(null),h=Ee()(s,2),M=h[0],T=h[1],J=(0,Ie.useState)(function(){return We(a,u,!1,T)}),w=Ee()(J,2),Z=w[0],V=w[1],ne=$e(Z),q=(0,Ie.useMemo)(function(){return ne?Z:{value:Z}},[Z]),se=a.useDeps(u,"none");return(0,Ie.useEffect)(function(){var ie=ne?"".concat(Array.isArray(u)?u.join(ae):u,".*"):se,le=a.watch(ie,function(xe){var be=xe.path,Te=xe.value;V(ne?Ce()(Ce()({},Z),{},E()({},be[be.length-1],Te)):We(a,u,!1,T))});return function(){return le.off()}},[se]),(0,Be.jsx)(Be.Fragment,{children:M?(0,Be.jsx)(c,{error:M}):t(q)})},function(){return!0})}function ra(a,t,u,p){var c=p.errorBoundary||a.options.signalErrorBoundary;return Ie.memo(function(){var s=(0,Ie.useState)(null),h=Ee()(s,2),M=h[0],T=h[1],J=ze(u)?u():u,w=(0,Ie.useState)(function(){try{if(Re(J)){if(J.options.objectify=!1,J.type==="computed")return a.computedObjects.create(J);if(J.type==="watch")return a.watchObjects.create(J)}else{var le=je(J),xe=le();return xe.options.objectify=!1,a.computedObjects.create(xe)}}catch(be){return T(be),null}}),Z=Ee()(w,1),V=Z[0],ne=(0,Ie.useState)(function(){return V?V.async?V.value:{value:V.value}:{value:""}}),q=Ee()(ne,2),se=q[0],ie=q[1];return(0,Ie.useEffect)(function(){var le={off:function(){}};return V&&(le=V.watch(function(xe){if(!xe.reply)try{if(V.type==="computed")if(V.async){var be=V;(ke(xe.path,be.path)||ke(xe.path.slice(0,-1),be.path))&&ie(Ce()({},be.value))}else ie({value:V.value});else V.type==="watch"&&ie({value:V.value})}catch(Te){T(Te)}},{operates:"write"})),function(){return le.off()}},[J]),(0,Be.jsx)(Be.Fragment,{children:M?(0,Be.jsx)(c,{error:M}):t(se)})},function(){return!0})}function oa(a){return function(){var t=arguments,u=t.length>=1&&(typeof t[0]=="string"||typeof t[0]=="function")&&(!t[1]||Fe(t[1]))?t[0]:void 0,p=t.length>=2&&typeof t[0]=="function"&&(typeof t[1]=="string"||Array.isArray(t[1])||typeof t[1]=="function")?t[0]:void 0,c=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,s=t.length>=2&&typeof t[0]=="function"&&(typeof t[1]=="string"||Array.isArray(t[1]))?t[1]:void 0,h=Object.assign({},t.length>1&&Fe(t[t.length-1])?t[t.length-1]:void 0),M=u?aa(a,u,h):s?na(a,p,s,h):c?ra(a,p,c,h):function(){return(0,Be.jsx)(Be.Fragment,{})};return(0,Be.jsx)(M,{})}}function It(a){var t=a;if(a){a.persist&&a.persist();var u=a.currentTarget;u&&a.type?u.tagName==="INPUT"&&u.type==="checkbox"?t=u.checked:t=u.value:a.nativeEvent&&a.target&&(t=a.target.value)}return t}function ua(a){return function(){var t=arguments,u=t.length>=1&&typeof t[0]=="string"?t[0]:void 0;if(!u)throw new Error("Input bind must have at least one argument");var p={};return p.onChange=function(c){var s=It(c);oe(a.state,u.split(ae),s)},p}}function Mt(a){return function(){var t=arguments,u=t.length>=1?Array.isArray(t[0])?t[0]:typeof t[0]=="string"?t[0].split(ae):void 0:void 0,p=t.length>=2&&typeof t[0]=="function"?t[0]:void 0,c=t.length>=2&&typeof t[1]=="function"?t[1]:void 0,s=(0,Ie.useCallback)(function(V,ne){return{value:ne,onChange:function(se){var ie=It(se);V?a.update(function(le){return oe(le,Array.isArray(V)?V:V.split(ae),ie)}):c(ie,a.state)}}},[]),h=(0,Ie.useCallback)(function(V,ne){var q={};return Object.entries(ne).forEach(function(se){var ie=Ee()(se,2),le=ie[0],xe=ie[1];if(rt(xe)){var be=V?[].concat(l()(V),[le]):[le];q[le]=s(be,xe)}}),q},[]),M=(0,Ie.useState)(function(){if(typeof p=="function")return s(void 0,p(a.state));var V=u?We(a,u,!0):a.state;if(Fe(V))return h(u,V);if(typeof u=="string")return s(u,V);if(Array.isArray(u))return s(u.join(ae),V)}),T=Ee()(M,2),J=T[0],w=T[1],Z=a.useDeps(u||p);return(0,Ie.useEffect)(function(){var V;if(Z.length===0||t.length===0)V=a.watch(function(se){var ie=se.path,le=se.value;ie.length===1&&rt(le)&&w(Ce()(Ce()({},J),{},E()({},ie[0],s(ie[0],le))))});else if(Z.length>0){var ne=u?We(a,u,!0):void 0,q=Fe(ne);u&&q&&Z.length===1&&Z[0].push("*"),V=a.watch(Z,function(se){var ie=se.path,le=se.value;if(typeof p=="function"){var xe=p(a.state);w(s(void 0,xe))}else w(q?Ce()(Ce()({},J),{},E()({},ie[ie.length-1],s(ie,le))):s(ie,le))})}return function(){return V.off()}},[Z]),J}}function la(a){var t=arguments;return function(){var u=t[0],p=t[1],c=t[2];(0,Ie.useEffect)(function(){var s=a.watch(u,p,c);return function(){return s.off()}},[])}}var vt=Symbol("FAKE_BINDINGS");function mt(a,t){var u={};return t instanceof Map?t.forEach(function(p,c){u[c]=vt}):Object.entries(t).forEach(function(p){var c=Ee()(p,1),s=c[0];u[s]=vt}),u}function ft(a,t,u){return{value:u,onChange:function(c){var s=It(c);a.update(function(h){return oe(h,t,s)})}}}function jt(a,t,u,p,c){if(r()(a)!=="object"||a===null)return a;var s=t.length===0?"__ROOT__":t.join(".");if(u.has(s))return u.get(s);var h=a;(Array.isArray(a)||Fe(a))&&(h=mt(p,a));var M=new Proxy(h,{get:function(J,w,Z){if(typeof w!="string")return Reflect.get(J,w,Z);var V=[].concat(l()(c),l()(t),[String(w)]),ne=F(p.state,V);return rt(ne)?ft(p,V,ne):$e(ne)?ft(p,[].concat(l()(V),["value"]),ne):jt(ne,V,u,p,c)}});return u.set(s,M),M}function Rt(a,t){var u=new Map;return jt({},[],u,a,t)}function $t(a){return function(){var t=arguments,u=t.length>0?typeof t[0]=="string"?t[0].split(ae):Array.isArray(t[0])?t[0]:[]:[],p=(0,Ie.useState)(function(){return a.getSnap({entry:u})}),c=Ee()(p,2),s=c[0],h=c[1],M=(0,Ie.useState)(function(){return Rt(a,u)}),T=Ee()(M,1),J=T[0];return(0,Ie.useSyncExternalStore)(function(w){var Z=a.watch(function(V){var ne=V.path,q=V.value;if(Xe(u,ne)){var se=ne.slice(u.length);oe(s,se,q),oe(J,[].concat(l()(se),["value"]),q),h(Ce()({},s)),w()}});return function(){Z.off()}},function(){return s}),J}}var et=function(a){U()(u,a);var t=j()(u);function u(p,c){var s;return L()(this,u),s=t.call(this,p,Object.assign({signalErrorBoundary:function(){return(0,Be.jsx)(Be.Fragment,{children:"ERROR"})}},c)),E()(x()(s),"useState",void 0),E()(x()(s),"useAsyncState",void 0),E()(x()(s),"useDeps",void 0),E()(x()(s),"$",void 0),E()(x()(s),"signal",void 0),E()(x()(s),"bind",void 0),E()(x()(s),"useField",void 0),E()(x()(s),"useWatch",void 0),E()(x()(s),"useBindings",void 0),E()(x()(s),"useReactive",void 0),E()(x()(s),"useAsyncReactive",void 0),s.signal=s.$=oa(x()(s)).bind(x()(s)),s.useState=ea(x()(s)).bind(x()(s)),s.useAsyncState=function(h){return s.useState(h,!0)[0]},s.useDeps=ta(x()(s)).bind(x()(s)),s.useField=Mt(x()(s)).bind(x()(s)),s.bind=ua(x()(s)).bind(x()(s)),s.useWatch=la(x()(s)).bind(x()(s)),s.useBindings=$t(x()(s)).bind(x()(s)),s.useReactive=s.useState,s.useAsyncReactive=s.useAsyncState.bind(x()(s)),s}return d()(u)}(Dt);function da(a,t){return new et(a,t)}function Lt(a,t){if(a)try{if(a.classList){var u;(u=a.classList).remove.apply(u,l()(t.split(/\s+/)))}}catch(p){}}function Pa(a,t){if(t){var u=a.getAttribute("style")||"";u.endsWith(";")||(u+=";"),t.endsWith(";")||(t=t+=";"),t.split(";").forEach(function(p){var c=p.split(":"),s=_slicedToArray(c,2),h=s[0],M=s[1];a.style[h]=M})}}function Aa(a,t){t&&(t.endsWith(";")||(t=t+=";"),t.split(";").forEach(function(u){var p=u.split(":"),c=_slicedToArray(p,2),s=c[0],h=c[1];a.style[s]=""}))}function sa(a,t){var u=a.indexOf(t);u>=0&&a.splice(u,1)}function Da(a,t,u){if(t){var p=function(s,h){u==="style"?insertStyle(a,h):addClass(a,h)};_typeof(t)==="object"?Object.entries(t).forEach(function(c){var s=_slicedToArray(c,2),h=s[0],M=s[1],T=h.toLocaleUpperCase()==="ROOT"?a:a.querySelector(h);p(T,M)}):typeof t=="string"&&p(a,t)}}function Ma(a,t,u){if(t){var p=function(s,h){u==="style"?removeStyle(a,h):removeClass(a,h)};_typeof(t)==="object"?Object.entries(t).forEach(function(c){var s=_slicedToArray(c,2),h=s[0],M=s[1],T=h.toLocaleUpperCase()==="ROOT"?a:a.querySelector(h);p(T,M)}):typeof t=="string"&&p(a,t)}}function xt(a){return["input","textarea","select"].includes(a.tagName.toLowerCase())}function ca(a){return a.tagName.toLowerCase()==="input"}function ia(a){return a.tagName.toLowerCase()==="select"}var Tt=Symbol("empty"),He="invalid",pa="data-invalid-tips",Ia="data-field-part",ja="data-validate-field",Ra={ROOT:"color:red;border:1px solid red;",input:"color:red;border:1px solid red;"};function va(a){var t=a.querySelectorAll(":scope input[name],input[name][value=''],textarea[name],textarea[name][value=''],select[name],select[name][value=''],[data-field-name]"),u=Array.from(t).filter(function(p){return p.nodeType&&p.nodeType===1});return u}function ma(a,t){var u=t?t(a):va(a),p={};return u.reduce(function(c,s){var h=s.getAttribute("name")||s.getAttribute("data-field-name");if(h){var M=Array.from(xt(s)?[s]:s.querySelectorAll("input,textarea,select"));M.forEach(function(T){T.setAttribute("name",h)}),c[h]||(c[h]=[]),c[h].push({path:h,el:s,inputs:M,invalidTips:s.getAttribute(pa)})}return c},{})}function fa(a,t,u,p,c){if(!u)return t;if(Array.isArray(p))p[parseInt(u)]=t;else if(r()(p)==="object")p[u]=t;else{if(typeof p=="string")return p.replace(new RegExp(u),function(s,h){return s.replace(h,t)});if(typeof p=="boolean")return!!t;if(typeof p=="number")return parseFloat(t)}return t}function xa(a,t,u,p,c){var s=c.toState||fa,h=t.dataset.fieldPart,M=u.split(ae),T=t.dataset.typeof,J=a.peep(function(Z){return F(Z,M)}),w=s(u,p,h,J,t);a.update(function(Z){oe(Z,u.split(ae),w)},{peep:!0})}function kt(a){return typeof a=="boolean"}function ut(a){return a==null?!0:Array.isArray(a)?a.length===0:r()(a)==="object"?Object.keys(a).length===0:typeof a=="string"?a.trim()==="":!1}function ha(a){return typeof a=="number"||typeof a=="string"&&!isNaN(parseFloat(a))}function ga(a){return a==null?!1:typeof a=="boolean"||typeof a=="number"||typeof a=="string"||_typeof(a)==="symbol"?!0:Array.isArray(a)?a.every(ga):!!React.isValidElement(a)}function Ft(a){var t,u=a.dataset.typeof;if(ca(a))if(a.type==="checkbox")if(ut(a.value))t=a.checked;else{var p=String(a.value).split(","),c=Ee()(p,2),s=c[0],h=c[1];t=a.checked?s:h}else if(a.type==="radio"){var M=a.name,T=document.querySelectorAll('input[type="radio"][name="'.concat(M,'"]'));if(T.length>1){var J=Array.from(T).findIndex(function(Z){return Z.checked});t=J>=0?T[J].value:null}else t=T[0].checked}else t=a.value;else if(ia(a))if(a.multiple){var w=a.selectedOptions;t=Array.from(w).map(function(Z){return Z.value})}else t=a.value;if(u){if(u==="boolean")t=t==="true";else if(u==="number")t=parseFloat(t);else if(u==="object")try{t=JSON.parse(t)}catch(Z){}}return t}function _a(a,t){if(a.type==="checkbox")if(ut(a.value))a.checked=t;else{var u=String(a.value).split(","),p=Ee()(u,2),c=p[0],s=p[1];a.checked=c==t}else if(a.type==="radio"){var h=a.name,M=document.querySelectorAll('input[type="radio"][name="'.concat(h,'"]')),T=f()(M),J;try{for(T.s();!(J=T.n()).done;){var w=J.value,Z=w.dataset.typeof;Z?Z==="boolean"?w.checked=w.value===String(t):Z==="number"?w.checked=parseFloat(w.value)===t:w.checked=w.value==t:w.checked=w.value==t}}catch(V){T.e(V)}finally{T.f()}}else a.value=t}function ya(a,t,u){if(!u)return t;if(Array.isArray(t)&&ha(u))return t[u];if(r()(t)==="object")return t[u];if(typeof t=="string"){var p=t.match(new RegExp(u));if(p)return p.length===1?p[0]:p[1]}return t}function Wt(a,t,u,p){var c=u.fromState||ya,s=!1;return a.inputs.forEach(function(h){if(p){if(h.type==="checkbox")ut(h.value)&&!kt(t)&&(h.value="".concat(t,","));else if(h.type==="radio"&&kt(t)){var M,T=(M=u.ref)===null||M===void 0?void 0:M.current;if(T){var J=T.querySelectorAll(':scope input[type="radio"][name="'.concat(h.name,'"]'));if(J.length>1){var w=Array.from(J).findIndex(function(q){return q.value==="true"});h.value=String(w<0)}}}h.dataset.typeof=Array.isArray(t)?"array":r()(t)}var Z=h.dataset.fieldPart,V=Ft(h),ne=c(a.path,t,Z);(p||V!==ne)&&(_a(h,ne),s=!0)}),s}function ht(a){var t;return xt(a)?[a]:(t=a.querySelectorAll("input,textarea,select"),Array.from(t))}function gt(a,t){if(a)try{a.classList&&t.split(/\s+/).forEach(function(u){a.classList.add(u)})}catch(u){}}var Ea=function(){function a(t,u){L()(this,a),E()(this,"_onInvalid",void 0),E()(this,"_invalids",[]),this.store=t,this.formCtx=u,this._onInvalid=this.onInvalid.bind(this),this.attach()}return d()(a,[{key:"form",get:function(){return this.formCtx.formRef.current}},{key:"options",get:function(){return this.formCtx.options}},{key:"fields",get:function(){return this.formCtx.fields}},{key:"attach",value:function(){this.form.addEventListener("invalid",this._onInvalid,!0)}},{key:"detach",value:function(){this.form.removeEventListener("invalid",this._onInvalid,!0),this._invalids=[]}},{key:"onInvalid",value:function(u){var p=u.target}},{key:"setValid",value:function(u){this.formCtx.setValid(u)}},{key:"updateInvalids",value:function(u,p){p?sa(this._invalids,u):this._invalids.includes(u)||this._invalids.push(u),this.setValid(this._invalids.length===0)}},{key:"validateAll",value:function(){for(var u=this,p=0,c=Object.values(this.fields);p<c.length;p++){var s=c[p];s.forEach(function(h){u.validate(h.el)})}}},{key:"validate",value:function(u){var p=this.options.validate,c=p&&yt(p),s=this.getFieldName(u);if(s){var h={path:s,value:!0,error:null},M=ht(u),T=f()(M),J;try{for(T.s();!(J=T.n()).done;){var w=J.value;w&&w.checkValidity&&!w.checkValidity()?(h.value=!1,h.error=w.validationMessage):(h.value=!0,h.error=null),this.updateInvalids(s,h.value),this.report(u,h)}}catch(xe){T.e(xe)}finally{T.f()}if(c){var Z=ht(u),V=f()(Z),ne;try{for(V.s();!(ne=V.n()).done;){var q=ne.value,se=q.value,ie=q.getAttribute(Ia),le=p(s,se,ie,u);typeof le=="boolean"?(h.value=le,h.error=u.dataset.errorTips||"ERROR"):typeof le=="string"&&(h.value=!1,h.error=le),this.updateInvalids(s,h.value),q&&q.setCustomValidity&&this.options.customReport&&q.setCustomValidity(h.error||""),this.report(u,h)}}catch(xe){V.e(xe)}finally{V.f()}}return h}}},{key:"getFieldName",value:function(u){return u.getAttribute("name")||u.getAttribute("data-field-name")}},{key:"getFieldRelElements",value:function(u){var p=this.getFieldName(u);if(!p)return[];var c=[];return this.fields[p]&&this.fields[p].forEach(function(s){c.push(s.el),c.push.apply(c,l()(s.inputs))}),c}},{key:"getReportElements",value:function(u,p){if(!u)return[];var c=this.getFieldName(u),s=this.form.querySelectorAll("[data-validate-field='".concat(c,"']"));return s&&s.forEach(function(h){gt(h,He)}),s}},{key:"toggleReport",value:function(u,p){p.value?this.hideReport(u,p):this.showReport(u,p)}},{key:"showReport",value:function(u,p){var c=this.getReportElements(u,p),s=p.error||u.dataset.invalidTips||"ERROR";c&&s&&c.forEach(function(M){M.innerHTML=s,M.style.display="block",gt(M,He)});var h=this.getFieldRelElements(u);h.forEach(function(M){gt(M,He)})}},{key:"hideReport",value:function(u,p){var c=this.getReportElements(u,p);c&&c.forEach(function(h){h.classList.contains(He)&&(h.style.display="none"),Lt(h,He)});var s=this.getFieldRelElements(u);s.forEach(function(h){Lt(h,He)})}},{key:"report",value:function(u,p){var c=this.options.customReport!==!1;if(c)this.toggleReport(u,p);else{var s=ht(u);s.forEach(function(h){h.reportValidity()})}}},{key:"reportAll",value:function(){this.form.reportValidity()}}]),a}();function ba(a){return a===!0}function Ca(a,t,u){var p=u.entry,c=p===void 0?[]:p,s=a.getSnap({entry:c});Object.entries(t).forEach(function(h){var M=Ee()(h,2),T=M[0],J=M[1],w=[].concat(l()(c),l()(T.split(ae))),Z=F(s,w,Tt);Z!==Tt&&J.forEach(function(V){V.initial=Z,Wt(V,Z,u,!0)})})}function Oa(a,t){var u=t.current,p=t.current.options;return function(c){var s=(0,Ie.useRef)(!1),h=(0,Ie.useCallback)(function(){var M=p.ref.current;if(M){var T=!0;if(u.fields=ma(M,p.findFields),ut(u.fields)){a.log("No fields found in the autoform","warn");return}u.validator=new Ea(a,u),Ca(a,u.fields,p),ba(p.validAtInit)||u.validator.validateAll(),s.current=!0,u.setValid(T),u.setDirty(!1)}},[]);return(0,Ie.useEffect)(function(){var M=p.ref.current;if(M){var T=p.entry,J=T===void 0?[]:T;!s.current&&M&&h();var w=a.watch(function(V){var ne=V.path,q=V.value;if(Xe(J,ne)){var se=ne.join(ae);if(se in u.fields){var ie=u.fields[se];ie&&ie.forEach(function(le){Wt(le,q,u.options)&&u.validator.validate(le.el)})}}}),Z=function(ne){var q,se=ne.target,ie=se.name;if(ie){var le=Ft(se);(q=u.validator.validate(se))!==null&&q!==void 0&&q.value&&(xa(a,se,ie,le,u.options),u.setDirty())}};return M.addEventListener("input",Z),function(){w.off(),M.removeEventListener("input",Z),s.current=!1}}},[]),(0,Be.jsx)("form",Ce()(Ce()({},c),{},{ref:p.ref,children:c.children}))}}function Sa(a,t){var u=t.current,p=t.current.options;return Ie.memo(function(c){var s=c.render,h=c.name,M=(0,Ie.useRef)(null),T=a.useReactive(c.name,!0),J=Ee()(T,1),w=J[0];(0,Ie.useEffect)(function(){},[]);var Z={value:w,onChange:function(ne,q){var se=ne.target;if(typeof q=="function")a.batchUpdate(function(le){q(le)});else if(typeof h=="string"&&!xt(se)){var ie=new CustomEvent("input",{detail:{value:q}});se.dispatchEvent(ie)}}};return(0,Be.jsx)(Be.Fragment,{children:s(Z)})},function(){return!0})}function Ba(){var a=(0,Ie.useRef)(null),t=(0,Ie.useRef)(null),u=(0,Ie.useRef)(null),p=(0,Ie.useRef)(null),c=(0,Ie.useRef)(null),s=arguments[1]||{};s.ref||(s.ref=u),c.current||(c.current=arguments[0]instanceof et?arguments[0]:new et(arguments[0],arguments[1]));var h=(0,Ie.useState)(!0),M=Ee()(h,2),T=M[0],J=M[1],w=(0,Ie.useState)(!1),Z=Ee()(w,2),V=Z[0],ne=Z[1],q=c.current;return a.current||(p.current={options:s,setDirty:function(){var ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return ne(ie)},setValid:J,state:F(q.state,s.entry||[]),formRef:u},a.current=Oa(q,p),t.current=Sa(q,p)),(0,Ie.useEffect)(function(){return function(){var se;a.current=null,t.current=null,p.current=null,(se=c.current)===null||se===void 0||se.destroy(),c.current=null}},[]),Ce()(Ce()({},q),{},{state:q.state,Form:a.current,Field:t.current,valid:T,dirty:V})}function Na(a,t){var u=(0,Ie.useRef)();return u.current||(u.current=new et(a,t)),(0,Ie.useEffect)(function(){return function(){var p;(p=u.current)===null||p===void 0||p.destroy(),u.current=void 0}},[]),u.current}},60358:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(77643);const d=[]},19962:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(61668);const d=[{value:"\u672C\u793A\u4F8B\u6F14\u793A\u5982\u4F55\u4ECE",paraId:0,tocIndex:0},{value:"github",paraId:0,tocIndex:0},{value:"\u83B7\u53D6\u7528\u6237\u7684\u4ED3\u5E93\u9879\u76EE\u5217\u8868\u3002",paraId:0,tocIndex:0},{value:"\u8BF4\u660E",paraId:1},{value:"\u4F7F\u7528",paraId:2},{value:"computed",paraId:2},{value:"\u51FD\u6570\u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C",paraId:2},{value:"computed",paraId:2},{value:`\u53C2\u6570\uFF1A
`,paraId:2},{value:"\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u6216\u8005\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A",paraId:3},{value:"Promise",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u5728\u6B64\u51FD\u6570\u4E2D\u7F16\u5199\u4E1A\u52A1\u903B\u8F91\uFF0C\u5728\u672C\u4F8B\u4E2D\u4ECE",paraId:3},{value:"github",paraId:3},{value:"\u52A0\u8F7D\u9879\u76EE\u5217\u8868\u3002",paraId:3},{value:"\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u7528\u6765\u6307\u5B9A\u4F9D\u8D56\u7684\u72B6\u6001\u8DEF\u5F84\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\u3002",paraId:3},{value:"\u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedOptions",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u4E00\u4E9B\u9009\u9879\u3002",paraId:3},{value:"\u91CD\u70B9\uFF1A\u7ECF\u8FC7",paraId:4},{value:"createStore",paraId:4},{value:"\u5904\u7406\u540E\uFF0C",paraId:4},{value:"state.user.projects",paraId:4},{value:"\u8F6C\u6362\u4E3A\u4E00\u4E2A",paraId:4},{value:"AsyncComputedObject",paraId:4},{value:"\u5BF9\u8C61\uFF0C\u901A\u8FC7\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u8BFB\u53D6\u5230\u5F02\u6B65\u8BA1\u7B97\u7684\u8FDB\u5EA6\u4EE5\u53CA\u7ED3\u679C\u7B49\u4FE1\u606F\u3002",paraId:4},{value:"\u5728\u4E0A\u4F8B\u4E2D",paraId:5},{value:"state.user.projects",paraId:5},{value:"\u503C\u4E3A",paraId:5},{value:`  {
    "loading":false,  // \u662F\u5426\u6B63\u5728\u8BA1\u7B97
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "value":/**\u6B64\u5904\u5C31\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C**/
  }
`,paraId:6}]},63611:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(28627);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u65E0\u4E0E\u4F26\u6BD4\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u652F\u6301\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5177\u5907\u4E30\u5BCC\u7684\u8BA1\u7B97\u91CD\u8BD5\u3001\u8D85\u65F6\u3001\u52A0\u8F7D\u4E2D\u3001\u9519\u8BEF\u7B49\u72B6\u6001\u7BA1\u7406\u3002",paraId:0,tocIndex:0},{value:"AutoStore",paraId:1},{value:"\u5B9E\u73B0\u4E86\u6700\u72EC\u7279\u7684\u79FB\u82B1\u63A5\u6728\u5F0F\u7684\u8BA1\u7B97\u5C5E\u6027\u5B9E\u73B0\u65B9\u5F0F",paraId:1},{value:"\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:1},{value:"\u57FA\u672C\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:2},{value:"\u9996\u5148\u76F4\u63A5\u5728",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\uFF0C\u5982",paraId:3},{value:"total=computed(scope)=>scope.price*scope.count",paraId:3},{value:"\u3002",paraId:3},{value:"\u8C03\u7528",paraId:3},{value:"createStore",paraId:3},{value:"\u521B\u5EFA",paraId:3},{value:"AutoStore",paraId:3},{value:"\u65F6\uFF0C\u4F1A\u4F7F\u7528",paraId:3},{value:"Proxy",paraId:3},{value:"\u4EE3\u7406",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u62E6\u622A\u5BF9",paraId:3},{value:"State",paraId:3},{value:"\u5BF9\u8C61\u7684\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5EFA\u7ACB\u4E00\u4E2A\u72B6\u6001\u53D8\u66F4\u7684\u4E8B\u4EF6\u53D1\u5E03/\u8BA2\u9605\u673A\u5236\u3002",paraId:3},{value:"\u7136\u540E\u5728\u521D\u59CB\u5316\u65F6\u626B\u63CF\u6574\u4E2A",paraId:3},{value:"State",paraId:3},{value:"\u6570\u636E\uFF0C\u5982\u679C\u662F",paraId:3},{value:"\u51FD\u6570",paraId:3},{value:"\u6216\u8005",paraId:3},{value:"ObserverDescriptorBuilder",paraId:3},{value:"\u5BF9\u8C61\uFF08\u5373",paraId:3},{value:"computed",paraId:3},{value:"\u548C",paraId:3},{value:"watch",paraId:3},{value:"\u5C01\u88C5\u7684\u51FD\u6570\uFF09\uFF0C\u5219\u4F1A\u521B\u5EFA",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u6216",paraId:3},{value:"WatchObject",paraId:3},{value:",\u7136\u540E\u6839\u636E\u4F9D\u8D56\u8BA2\u9605\u4E8B\u4EF6\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u4F1A\u6839\u636E\u72B6\u6001\u4E0A\u4E0B\u6587\u548C\u4F9D\u8D56\u6536\u96C6\uFF0C\u4FA6\u542C\u72B6\u6001\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:3},{value:"\u5F53",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:3},{value:"State",paraId:3},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:3},{value:"\u5728\u4E0A\u56FE\u4E2D\uFF0C\u5F53",paraId:4},{value:"price",paraId:4},{value:"\u548C",paraId:4},{value:"count",paraId:4},{value:"\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1",paraId:4},{value:"total",paraId:4},{value:"\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:4},{value:"total",paraId:4},{value:"\u5C5E\u6027\u3002\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u8BBF\u95EE",paraId:4},{value:"state.total",paraId:4},{value:"\u65F6,\u5C31\u662F\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u4E86\u3002",paraId:4},{value:"\u4EE5\u4E0A\u5C31\u662F",paraId:5},{value:"@autostorejs/react",paraId:5},{value:"\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u539F\u7406",paraId:5},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u79FB\u82B1\u63A5\u6728\u7684\u8FC7\u7A0B\u5982\u4E0B\uFF1A",paraId:6,tocIndex:2},{value:`const state = {
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
`,paraId:18,tocIndex:3},{value:"\u66F4\u591A\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:19,tocIndex:3},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:20,tocIndex:3},{value:"\u3002",paraId:19,tocIndex:3}]},58524:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(46267);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u975E\u5E38\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7279\u6027\uFF0C\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u6765\u58F0\u660E\u521B\u5EFA\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u57FA\u672C\u65B9\u6CD5\u662F\u76F4\u63A5\u5728",paraId:1,tocIndex:1},{value:"State",paraId:1,tocIndex:1},{value:"\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u4F7F\u7528",paraId:1,tocIndex:1},{value:"computed",paraId:1,tocIndex:1},{value:"\u8FDB\u884C\u58F0\u660E\u3002",paraId:1,tocIndex:1},{value:`import { computed } from "@autostorejs/react"
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
`,paraId:58,tocIndex:16}]},77614:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(25231);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:`
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
`,paraId:21,tocIndex:7},{value:"\u4F7F\u7528",paraId:22,tocIndex:7},{value:"computed",paraId:22,tocIndex:7},{value:"\u53EF\u4EE5\u8FDB\u884C\u66F4\u591A\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982",paraId:22,tocIndex:7},{value:"options",paraId:22,tocIndex:7},{value:"\u7B49\u3002",paraId:22,tocIndex:7},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u8BA1\u7B97\u5C5E\u6027\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:23,tocIndex:8},{value:"\uFF1A",paraId:23,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"./",paraId:24,tocIndex:8},{value:"\u3001",paraId:24,tocIndex:8},{value:"PARENT",paraId:24,tocIndex:8},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684",paraId:24,tocIndex:8},{value:"associated=true",paraId:24,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u8BA1\u7B97\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:24,tocIndex:8},{value:"obj.value",paraId:24,tocIndex:8},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:24,tocIndex:8},{value:"\u66F4\u8BE6\u7EC6\u4ECB\u7ECD\u8BF7\u53C2\u8003",paraId:25,tocIndex:8},{value:"\u52A8\u6001\u521B\u5EFA\u8BA1\u7B97\u5BF9\u8C61",paraId:26,tocIndex:8},{value:"\u4F7F\u7528",paraId:27},{value:"computed(<getter>,<depends>,<options>)",paraId:27},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u6D89\u53CA\u5230:",paraId:27},{value:"getter",paraId:28},{value:"\uFF1A\u8BA1\u7B97\u51FD\u6570, \u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u3002\u8BE6\u89C1",paraId:28},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:29},{value:"depends",paraId:28},{value:"\uFF1A\u4F9D\u8D56, \u8BE6\u89C1",paraId:28},{value:"\u4F9D\u8D56",paraId:30},{value:"options",paraId:28},{value:"\uFF1A\u5404\u79CD\u63A7\u5236\u9009\u9879, \u8BE6\u89C1",paraId:28},{value:"\u9009\u9879",paraId:31}]},68258:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(83717);const d=[{value:"\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u66F4\u65F6\uFF08\u5373\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF09\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u7684",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4E86\u89E3\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u4E4B\u524D\uFF0C\u5148\u4E86\u89E3\u4E0B\u4F9D\u8D56\u8DEF\u5F84\u7684\u6982\u5FF5\u3002\u4F9D\u8D56\u8DEF\u5F84\u662F\u6307\u5728\u72B6\u6001\u6811\u4E2D\u7684\u8DEF\u5F84\uFF0C\u4F9D\u8D56\u8DEF\u5F84\u7684\u683C\u5F0F\u4E3A\uFF1A",paraId:1,tocIndex:1},{value:`type DependPath  = string | string[]
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
`,paraId:30,tocIndex:6},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u8DEF\u5F84\u662F\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6307\u5B9A\u4E86",paraId:31,tocIndex:6},{value:"./price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"./count",paraId:31,tocIndex:6},{value:"\uFF0C\u5373\u4F9D\u8D56\u4E86",paraId:31,tocIndex:6},{value:"price",paraId:31,tocIndex:6},{value:"\u548C",paraId:31,tocIndex:6},{value:"count",paraId:31,tocIndex:6},{value:"\u5C5E\u6027\u3002",paraId:31,tocIndex:6},{value:"\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4F9D\u8D56\u8DEF\u5F84\uFF0C\u5F53\u4F9D\u8D56\u8DEF\u5F84\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u90FD\u4F1A\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:31,tocIndex:6},{value:"\u4F9D\u8D56\u8DEF\u5F84\u53EF\u4EE5\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4E5F\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u7684\u76F8\u5BF9\u5BF9\u8C61\u662F\u8BA1\u7B97\u5C5E\u6027\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:31,tocIndex:6}]},94957:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(76938);const d=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed(<getter>,[depends],<options>)",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u65E0\u8BBA\u662F\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u8FD8\u662F\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u9700\u8981\u6307\u5B9A\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u903B\u8F91\uFF0C",paraId:0,tocIndex:0},{value:"\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u8BA1\u7B97\u5C5E\u6027\u7684\u503C",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u548C\u5F02\u6B65\u8BA1\u7B97\u5C5E\u7684",paraId:1,tocIndex:0},{value:"Getter",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u4E0D\u662F\u4E00\u6837\u7684\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:2,tocIndex:1},{value:`type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
`,paraId:3,tocIndex:1},{value:"\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684Getter\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:1},{value:`type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
`,paraId:5,tocIndex:1},{value:"\u5F53\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u4F1A\u81EA\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570",paraId:6,tocIndex:3},{value:"Getter",paraId:6,tocIndex:3},{value:".",paraId:6,tocIndex:3},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4F46\u662F\u5728\u67D0\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u53EF\u80FD\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:7,tocIndex:4},{value:"run",paraId:7,tocIndex:4},{value:"\u65B9\u6CD5\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:7,tocIndex:4},{value:"\u66F4\u591A\u5173\u4E8E",paraId:8},{value:"computedObjects",paraId:8},{value:"\u4EE5\u53CA\u624B\u52A8\u6267\u884C\u7B49\u8BF7\u53C2\u8003",paraId:8},{value:"\u8BA1\u7B97\u5BF9\u8C61",paraId:9},{value:"\u7AE0\u8282\u3002",paraId:8}]},15467:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(87480);const d=[{value:"\u5F53\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u521B\u5EFA\u597D\u8BA1\u7B97\u5C5E\u6027\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"store.computedObjects",paraId:0,tocIndex:0},{value:"\u6765\u7BA1\u7406",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5185\u7684\u6240\u6709\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u5230\u6240\u6709\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C",paraId:1,tocIndex:0},{value:"store.computedObjects",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A",paraId:1,tocIndex:0},{value:"Map",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u8BF4\u660E",paraId:2},{value:":",paraId:2},{value:"\u4EE5\u4E0A\u521B\u5EFA\u4E86\u4E00",paraId:3},{value:"fullName",paraId:3},{value:"\u548C",paraId:3},{value:"fullName2",paraId:3},{value:"\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027",paraId:3},{value:"store.computedObjects",paraId:3},{value:"\u662F\u4E00\u4E2A",paraId:3},{value:"Map",paraId:3},{value:"\u5BF9\u8C61,\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName")',paraId:3},{value:"\u6765\u83B7\u53D6",paraId:3},{value:"fullName",paraId:3},{value:"\u7684\u8BA1\u7B97\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u662F\u4E00\u4E2A",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"run",paraId:3},{value:"\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u5BF9\u4E8E\u5F02\u6B65\u8BA1\u7B97\u5373\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName2").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7",paraId:3},{value:"store.state.user.fullName2.run()",paraId:3},{value:"\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"\u800C\u540C\u6B65\u8BA1\u7B97\u53EA\u80FD\u901A\u8FC7",paraId:3},{value:'store.computedObjects.get("user.fullName").run()',paraId:3},{value:"\u6765\u624B\u52A8\u6267\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u5B9E\u4F8B\u6709\u4E00\u4E2A",paraId:3},{value:"value",paraId:3},{value:"\u5C5E\u6027\uFF0C\u53EF\u4EE5\u83B7\u53D6\u8BA1\u7B97\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002",paraId:3},{value:"ComputedObject",paraId:3},{value:"\u662F\u4E00\u4E2A\u7C7B\uFF0C\u67E5\u770BAPI\u6587\u6863\u53EF\u4EE5\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\u3002",paraId:3}]},33989:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(15968);const d=[{value:"\u65E0\u8BBA\u662F\u540C\u6B65\u6216\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u5747\u63A8\u8350\u4F7F\u7528",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u58F0\u660E\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u652F\u6301",paraId:0,tocIndex:0},{value:"ComputedOptions",paraId:0,tocIndex:0},{value:"\u914D\u7F6E\u53C2\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u53C2\u6570\u6765\u63A7\u5236\u8BA1\u7B97\u5C5E\u6027\u7684\u884C\u4E3A\u3002",paraId:0,tocIndex:0},{value:"computed",paraId:1,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u51FD\u6570\u7B7E\u540D\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`// \u58F0\u660E\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027
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
`,paraId:48,tocIndex:14},{value:"\u7C7B\u578B",paraId:49,tocIndex:15},{value:"\uFF1A",paraId:49,tocIndex:15},{value:"(error:Error)=>void",paraId:49,tocIndex:15},{value:"\u5F53\u6267\u884C\u8BA1\u7B97",paraId:50,tocIndex:15},{value:"getter",paraId:50,tocIndex:15},{value:"\u51FD\u6570\u51FA\u9519\u65F6\u7684\u56DE\u8C03",paraId:50,tocIndex:15},{value:"\u7C7B\u578B",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:"(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void",paraId:51,tocIndex:16},{value:"\u5F53\u8BA1\u7B97\u51FD\u6570\u6267\u884C\u5B8C\u6210\u65F6\u7684\u56DE\u8C03",paraId:52,tocIndex:16}]},51289:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(49613);const d=[{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u8BA1\u7B97\u662F\u81EA\u52A8\u8FDB\u884C\u7684\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\uFF0C\u8BA1\u7B97\u5C5E\u6027\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:0,tocIndex:0},{value:"\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u9700\u8981\u624B\u52A8\u6267\u884C\u8BA1\u7B97\uFF0C\u6216\u8005\u5BF9\u8BA1\u7B97\u8FDB\u884C\u5206\u7EC4\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u4F7F\u7528",paraId:1,tocIndex:0},{value:"ComputedObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u6BCF\u4E00\u4E2A\u8BA1\u7B97\u51FD\u6570\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:0},{value:"ComputedObject",paraId:2,tocIndex:0},{value:"\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728",paraId:2,tocIndex:0},{value:"store.computedObjects",paraId:2,tocIndex:0},{value:",\u8BE5\u5BF9\u8C61\u6709\u4EE5\u4E0B\u5C5E\u6027\u548C\u65B9\u6CD5:",paraId:2,tocIndex:0},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"store.computedObjects.get(<id>).run()",paraId:3,tocIndex:1},{value:"\u6765\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u3002",paraId:3,tocIndex:1},{value:`import { createStore,computed } from '@autostorejs/react';
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
\u5F53\u4F7F\u7528`,paraId:11,tocIndex:3},{value:"computed",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A",paraId:11,tocIndex:3},{value:"group",paraId:11,tocIndex:3},{value:"\u53C2\u6570\uFF0C\u7528\u6765\u4E3A\u8BA1\u7B97\u5C5E\u6027\u5206\u7EC4\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7",paraId:11,tocIndex:3},{value:"runGroup",paraId:11,tocIndex:3},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u624B\u52A8\u6267\u884C\u8BE5\u5206\u7EC4\u8BA1\u7B97\u51FD\u6570\u3002",paraId:11,tocIndex:3},{value:"computed",paraId:12,tocIndex:4},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:12,tocIndex:4},{value:"enable",paraId:12,tocIndex:4},{value:"\u5C5E\u6027\u7528\u6765\u63A7\u5236\u662F\u5426\u8FDB\u884C\u8BA1\u7B97\u3002\u5F53",paraId:12,tocIndex:4},{value:"enable=false",paraId:12,tocIndex:4},{value:"\u65F6\uFF0C\u5F53\u4F9D\u8D56\u53D8\u5316\u65F6\u4E0D\u4F1A\u8FDB\u884C\u8BA1\u7B97\uFF0C\u76F4\u81F3",paraId:12,tocIndex:4},{value:"enable=true",paraId:12,tocIndex:4},{value:"\u3002",paraId:12,tocIndex:4},{value:"\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:13,tocIndex:4},{value:"\u53EF\u4EE5\u5728\u4F7F\u7528",paraId:14,tocIndex:4},{value:"computed",paraId:14,tocIndex:4},{value:"\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u4F20\u5165",paraId:14,tocIndex:4},{value:"enable",paraId:14,tocIndex:4},{value:"\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u7684\u9ED8\u8BA4\u72B6\u6001\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.get(<\u8DEF\u5F84\u540D\u79F0>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u8BA1\u7B97\u3002",paraId:14,tocIndex:4},{value:"\u53EF\u4EE5\u901A\u8FC7",paraId:14,tocIndex:4},{value:"ComputedObjects.enableGroup(<true/false>)",paraId:14,tocIndex:4},{value:"\u6765\u542F\u7528/\u7981\u7528\u67D0\u4E2A\u7EC4\u7684\u8BA1\u7B97\u3002",paraId:14,tocIndex:4}]},48248:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(87975);const d=[{value:"\u8BA1\u7B97\u4F5C\u7528\u57DF",paraId:0,tocIndex:0},{value:"\u6307\u7684\u662F\u4F20\u9012\u7ED9\u8BA1\u7B97\u51FD\u6570",paraId:0,tocIndex:0},{value:"Getter",paraId:0,tocIndex:0},{value:"\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002",paraId:0,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:"\u5728\u521B\u5EFA",paraId:1,tocIndex:0},{value:"Store",paraId:1,tocIndex:0},{value:"\u65F6\uFF0C\u652F\u6301\u914D\u7F6E",paraId:1,tocIndex:0},{value:"scope",paraId:1,tocIndex:0},{value:"\u53C2\u6570\u6765\u6307\u5B9A\u8BA1\u7B97\u5C5E\u6027\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export enum ObserverScopeRef{
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
`,paraId:12,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C",paraId:13,tocIndex:3},{value:"scope==ObserverScopeRef.Current",paraId:13,tocIndex:3},{value:"\u65F6\uFF0C\u8BA1\u7B97\u51FD\u6570\u7684",paraId:13,tocIndex:3},{value:"scope",paraId:13,tocIndex:3},{value:"\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u3002",paraId:13,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C",paraId:14},{value:"fullName",paraId:14},{value:"\u51FD\u6570\u7684",paraId:14},{value:"scope",paraId:14},{value:"\u6307\u5411\u6240\u5728\u7684",paraId:14},{value:"user",paraId:14},{value:"\u5BF9\u8C61\uFF0C\u5373",paraId:14},{value:"state.user",paraId:14},{value:"\u3002",paraId:14},{value:"scope==ObserverScopeRef.Current",paraId:15},{value:"\u662F\u9ED8\u8BA4\u503C\uFF0C\u4E00\u822C\u4E0D\u9700\u8981\u6307\u5B9A\uFF0C\u4EE5\u4E0A\u4EC5\u4EC5\u662F\u793A\u4F8B\u3002",paraId:15},{value:"@autostorejs/react",paraId:16,tocIndex:5},{value:"\u4F1A\u5C06\u8BA1\u7B97\u5C5E\u51FD\u6570\u7684",paraId:16,tocIndex:5},{value:"scope",paraId:16,tocIndex:5},{value:"\u6307\u5411",paraId:16,tocIndex:5},{value:"ObserverScopeRef.Root",paraId:16,tocIndex:5},{value:"\uFF0C\u5373\u5F53\u524D\u7684",paraId:16,tocIndex:5},{value:"State",paraId:16,tocIndex:5},{value:"\u6839\u5BF9\u8C61\uFF0C\u5982\u4E0B\uFF1A",paraId:16,tocIndex:5},{value:"\u5F53",paraId:17,tocIndex:7},{value:"scope==ObserverScopeRef.Parent",paraId:17,tocIndex:7},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u6240\u5728\u7684\u5BF9\u8C61\u7684\u7236\u5BF9\u8C61\u3002",paraId:17,tocIndex:7},{value:"\u5F53",paraId:18,tocIndex:9},{value:"store.options.scope==<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u65F6\uFF0C\u6B64\u65F6",paraId:18,tocIndex:9},{value:"<\u5B57\u7B26\u4E32>",paraId:18,tocIndex:9},{value:"\u5C31\u662F\u6307\u5411\u7EDD\u5BF9\u8DEF\u5F84\u3002",paraId:18,tocIndex:9},{value:"scope===<\u5B57\u7B26\u4E32>",paraId:19},{value:"\u65F6\u4F7F\u7528\u7684\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u91C7\u7528",paraId:19},{value:".",paraId:19},{value:"\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u5982",paraId:19},{value:"user.address.city",paraId:19},{value:"\u3002",paraId:19},{value:"\u5F53\u72B6\u6001\u8DEF\u5F84\u4E2D\u5305\u542B",paraId:20},{value:".",paraId:20},{value:"\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6570\u7EC4\u6765\u6307\u5B9A\u8DEF\u5F84,\u907F\u514D\u4EA7\u751F\u6B67\u4E49\u3002",paraId:20},{value:"\u5F53",paraId:21,tocIndex:13},{value:"scope==ObserverScopeRef.Depends",paraId:21,tocIndex:13},{value:"\u65F6\uFF0C\u6307\u5411\u8BA1\u7B97\u51FD\u6570\u7684\u4F9D\u8D56\u9879\u7684\u503C\u3002",paraId:21,tocIndex:13},{value:"ObserverScopeRef.Depends",paraId:22},{value:"\u4EC5\u5728\u5F02\u6B65\u8BA1\u7B97\u65F6\u751F\u6548,\u800C\u5F02\u6B65\u8BA1\u7B97\u5FC5\u987B\u901A\u8FC7computed\u51FD\u6570\u6765\u6307\u5B9A\u4F9D\u8D56",paraId:22}]},92205:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(48120);const d=[{value:"\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u76F4\u63A5\u58F0\u660E\u5728\u72B6\u6001\u4E2D\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C,\u5F53",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u8BA1\u7B97\u5C5E\u6027\u7684\u91CD\u65B0\u8BA1\u7B97\uFF0C\u5C06\u8BA1\u7B97\u7ED3\u679C\u8D4B\u503C\u7ED9",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u5BF9\u5E94\u5C5E\u6027\u3002",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u76F4\u63A5\u5728",paraId:1,tocIndex:2},{value:"State",paraId:1,tocIndex:2},{value:"\u4E2D\u58F0\u660E\u666E\u901A\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\u3002",paraId:1,tocIndex:2},{value:`import { createStore } from '@autostorejs/react';
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
`,paraId:7,tocIndex:3},{value:"\u7531\u4E8E\u53EF\u4EE5\u6307\u5B9A",paraId:8,tocIndex:3},{value:"computedScope",paraId:8,tocIndex:3},{value:",\u56E0\u6B64\u8BA1\u7B97\u51FD\u6570\u5C31\u53EF\u4EE5\u5B9E\u73B0\u76F8\u5BF9\u8BA1\u7B97\u3002",paraId:8,tocIndex:3},{value:"\u4F7F\u7528",paraId:9,tocIndex:4},{value:"computed(<getter>,<options>)",paraId:9,tocIndex:4},{value:"\u521B\u5EFA\u540C\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4EE5\u4E0B\u53C2\u6570\uFF1A",paraId:9,tocIndex:4},{value:"\u53C2\u6570",paraId:10,tocIndex:4},{value:"\u7C7B\u578B",paraId:10,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:10,tocIndex:4},{value:"\u8BF4\u660E",paraId:10,tocIndex:4},{value:"id",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u7528\u4E8E\u5728",paraId:10,tocIndex:4},{value:"computedObjects",paraId:10,tocIndex:4},{value:"\u4E2D\u67E5\u627E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:10,tocIndex:4},{value:"scope",paraId:10,tocIndex:4},{value:"ObserverScopeRef",paraId:10,tocIndex:4},{value:"ObserverScopeRef.Current",paraId:10,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u5373",paraId:10,tocIndex:4},{value:"\u4F5C\u7528\u57DF",paraId:10,tocIndex:4},{value:"\u3002",paraId:10,tocIndex:4},{value:"group",paraId:10,tocIndex:4},{value:"string",paraId:10,tocIndex:4},{value:"\u7528\u4E8E\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u8FDB\u884C\u5206\u7EC4\uFF0C\u53EF\u4EE5",paraId:10,tocIndex:4},{value:"computedObjects.runGroup(name)",paraId:10,tocIndex:4},{value:"\u6765\u8FD0\u884C\u4E00\u7EC4\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:10,tocIndex:4},{value:"objectify",paraId:10,tocIndex:4},{value:"boolean",paraId:10,tocIndex:4},{value:"true",paraId:10,tocIndex:4},{value:"\u662F\u5426\u5C06\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u4FDD\u5B58\u5728",paraId:10,tocIndex:4},{value:"store.computedObjects",paraId:10,tocIndex:4}]},80233:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(89004);const d=[{value:`\u5728\u590D\u6742\u7684\u72B6\u6001\u4E2D\uFF0C\u6709\u65F6\u4F1A\u4E0D\u7ECF\u610F\u95F4\u4F1A\u4EA7\u751F\u5FAA\u73AF\u4F9D\u8D56\uFF0C\u8FD9\u662F\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u4E2D\u7684\u4E00\u4E2A\u5E38\u89C1\u95EE\u9898\u3002
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
`,paraId:10,tocIndex:6},{value:"return 'disable'",paraId:11,tocIndex:6},{value:"\uFF1A \u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\u3002",paraId:11,tocIndex:6},{value:"return 'ignore'",paraId:11,tocIndex:6},{value:":  \u4EE3\u8868\u5FFD\u7565",paraId:11,tocIndex:6},{value:"\u5176\u4ED6\u4F1A\u89E6\u53D1\u9519\u8BEF",paraId:11,tocIndex:6},{value:"installCycleDetectExtend",paraId:12,tocIndex:7},{value:"\u5177\u6709\u4EE5\u4E0B\u914D\u7F6E\u53C2\u6570\uFF1A",paraId:12,tocIndex:7},{value:"\u53C2\u6570",paraId:13,tocIndex:7},{value:"\u7C7B\u578B",paraId:13,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:13,tocIndex:7},{value:"\u8BF4\u660E",paraId:13,tocIndex:7},{value:"maxOperates",paraId:13,tocIndex:7},{value:"number",paraId:13,tocIndex:7},{value:"200",paraId:13,tocIndex:7},{value:"\u6700\u5927\u64CD\u4F5C\u6570\uFF0C\u4ECE\u5F00\u59CB\u8FD0\u884C\u8BA1\u7B97\u51FD\u6570\u540E\uFF0C\u5F53\u6536\u96C6\u5230\u6B64\u6570\u91CF\u7684\u64CD\u4F5C\u4E8B\u4EF6\u540E\u5F00\u5982\u5206\u6790\u3002",paraId:13,tocIndex:7},{value:"onDetected",paraId:13,tocIndex:7},{value:"(paths:string)=>'disable' | 'ignore' | void",paraId:13,tocIndex:7},{value:"-",paraId:13,tocIndex:7},{value:"\u5F53\u68C0\u6D4B\u5230\u5FAA\u73AF\u4F9D\u8D56\u65F6\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"disable",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u7981\u7528\u8BE5\u8BA1\u7B97\u5C5E\u6027\uFF0C\u8FD4\u56DE",paraId:13,tocIndex:7},{value:"ignore",paraId:13,tocIndex:7},{value:"\u4EE3\u8868\u5FFD\u7565,\u5176\u4ED6\u89E6\u53D1\u9519\u8BEF\u3002",paraId:13,tocIndex:7}]},35603:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(93359);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u652F\u6301\u4F7F\u7528",paraId:0,tocIndex:0},{value:"Redux DevTools Extension",paraId:0,tocIndex:0},{value:"\u6765\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u9996\u5148\u9700\u8981\u5B89\u88C5",paraId:1,tocIndex:2},{value:"@autostorejs/devtools",paraId:1,tocIndex:2},{value:"\u548C",paraId:1,tocIndex:2},{value:"Redux DevTools Extension",paraId:1,tocIndex:2},{value:"\u3002",paraId:1,tocIndex:2},{value:`npm install  @autostorejs/devtools
`,paraId:2},{value:`yarn add @autostorejs/devtools
`,paraId:3},{value:`pnpm add @autostorejs/devtools
`,paraId:4},{value:"\u5728\u4F60\u7684\u9879\u76EE\u7684\u6700\u5F00\u59CB\u5904\u5BFC\u5165",paraId:5,tocIndex:3},{value:"@autostorejs/devtools",paraId:5,tocIndex:3},{value:"\u3002",paraId:5,tocIndex:3},{value:`//main.ts | app.ts | index.ts

import \`@autostorejs/devtools\`

`,paraId:6,tocIndex:3},{value:"\u7136\u540E\u5728\u521B\u5EFA",paraId:7,tocIndex:3},{value:"AutoStore",paraId:7,tocIndex:3},{value:"\u65F6,\u6307\u5B9A",paraId:7,tocIndex:3},{value:"debug=true",paraId:7,tocIndex:3},{value:"\u542F\u7528",paraId:8},{value:"debug=true",paraId:8},{value:"\u540E\uFF0C",paraId:8},{value:"AutoStore",paraId:8},{value:"\u4F1A\u81EA\u52A8\u8FDE\u63A5\u5230",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u3002",paraId:8},{value:"\u6BCF\u4E2A",paraId:8},{value:"Store",paraId:8},{value:"\u5747\u5177\u6709\u4E00\u4E2A",paraId:8},{value:"id",paraId:8},{value:"\uFF0C\u5982\u679C\u6CA1\u6709\u4F20\u5165\u5219\u4F1A\u968F\u673A\u751F\u6210\u3002\u5728\u4F7F\u7528",paraId:8},{value:"Redux DevTools Extension",paraId:8},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A",paraId:8},{value:"store",paraId:8},{value:"\u53D6\u4E2A\u6709\u610F\u4E49\u7684\u540D\u79F0\u3002",paraId:8},{value:"\u73B0\u5728\uFF0C\u4F60\u53EF\u4EE5\u6253\u5F00",paraId:9,tocIndex:4},{value:"Redux DevTools Extension",paraId:9,tocIndex:4},{value:"\u67E5\u770B",paraId:9,tocIndex:4},{value:"AutoStore",paraId:9,tocIndex:4},{value:"\u7684\u72B6\u6001\u4E86\u3002",paraId:9,tocIndex:4},{value:"\u5355\u51FB\u4EE5\u4E0A\u793A\u4F8B\u4E2D\u7684",paraId:10},{value:"Age++",paraId:10},{value:"\u548C",paraId:10},{value:"Change lastName",paraId:10},{value:"\u6309\u94AE\uFF0C\u7136\u540E\u67E5\u770B",paraId:10},{value:"Redux DevTools Extension",paraId:10},{value:"\u4E2D\u7684\u72B6\u6001\u53D8\u5316\u3002",paraId:10},{value:"\u5728\u63A7\u5236\u53F0\u4F60\u8FD8\u53EF\u4EE5\u770B\u5230\u66F4\u591A\u7684\u8C03\u8BD5\u4FE1\u606F\u3002",paraId:10}]},37797:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(6205);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u65E5\u5FD7\u529F\u80FD\uFF0C\u7528\u4E8E\u8BB0\u5F55",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u4E0E\u8BCA\u65AD\u3002",paraId:0,tocIndex:0},{value:"\u5F53\u521B\u5EFA",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u65F6\u8BBE\u7F6E",paraId:1,tocIndex:1},{value:"debug",paraId:1,tocIndex:1},{value:"\u4E3A",paraId:1,tocIndex:1},{value:"true",paraId:1,tocIndex:1},{value:"\u65F6\uFF0C",paraId:1,tocIndex:1},{value:"AutoStore",paraId:1,tocIndex:1},{value:"\u4F1A\u8BB0\u5F55\u5185\u90E8\u53D1\u751F\u7684\u4E8B\u4EF6,\u6253\u5370\u5728\u63A7\u5236\u53F0\u4E2D\uFF0C\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`import { createStore } from "@autostorejs/react"

const store = createStore({
  //....
},{
  id:"user",
  debug:true   // \u5F00\u542F\u8C03\u8BD5\u6A21\u5F0F  
})
`,paraId:2,tocIndex:1},{value:"\u63A7\u5236\u53F0\u8F93\u51FA\u6837\u5F0F\u5982\u4E0B:",paraId:3,tocIndex:1},{value:"\u5F53\u5E94\u7528\u5177\u6709\u591A\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u65F6\uFF0C\u5EFA\u8BAE\u4E3A\u6BCF\u4E2A",paraId:4},{value:"AutoStore",paraId:4},{value:"\u8BBE\u7F6E\u4E0D\u540C\u7684",paraId:4},{value:"id",paraId:4},{value:"\uFF0C\u4EE5\u4FBF\u533A\u5206\u4E0D\u540C\u7684",paraId:4},{value:"AutoStore",paraId:4},{value:"\u3002",paraId:4},{value:"\u5982\u679C\u5BF9\u9ED8\u8BA4\u7684\u65E5\u5FD7\u8F93\u51FA\u4E0D\u6EE1\u610F\u6216\u8005\u60F3\u5C06",paraId:5,tocIndex:2},{value:"AutoStore",paraId:5,tocIndex:2},{value:"\u7684\u65E5\u5FD7\u4FE1\u606F\u8F6C\u53D1\u81F3\u60A8\u81EA\u5DF1\u7684\u65E5\u5FD7\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E",paraId:5,tocIndex:2},{value:"options.log",paraId:5,tocIndex:2},{value:"\u51FD\u6570\u81EA\u5B9A\u4E49\u65E5\u5FD7\u8F93\u51FA\u3002",paraId:5,tocIndex:2},{value:"options.log",paraId:6},{value:"\u7684\u7C7B\u578B\u58F0\u660E\u5982\u4E0B\uFF1A",paraId:6},{value:`type LogMessageArgs = string | Error | (()=>string)
type LogLevel = 'log' | 'error' | 'warn'
function log(this:AutoStore<any>,message: LogMessageArgs,level:LogLevel='log'){
`,paraId:7}]},86288:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(42246);const d=[{value:"\u7531\u4E8E\u72B6\u6001\u4E4B\u95F4\u53EF\u80FD\u5B58\u5728\u590D\u6742\u7684\u4F9D\u8D56\u8BA1\u7B97\u5173\u7CFB\uFF0C\u4E3A\u4E86\u66F4\u597D\u7684\u8C03\u8BD5\u72B6\u6001\u7684\u53D8\u5316\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"trace",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u6765\u5E2E\u52A9\u8C03\u8BD5",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u64CD\u4F5C\u3002",paraId:0,tocIndex:0},{value:"trace",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type StateTracker= {
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
\u5BF9`,paraId:8},{value:"d",paraId:8},{value:"\u7684\u8BA1\u7B97\u662F\u5728\u8DDF\u8E2A\u51FD\u6570\u7684\u6267\u884C\u540E\u7684\u4E0B\u4E00\u6B21\u5F02\u6B65\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\u8FDB\u884C\u7684\uFF0C\u800C\u6B64\u65F6\u8DDF\u8E2A\u51FD\u6570\u5DF2\u7ECF\u6267\u884C\u5B8C\u6BD5\u4E86\uFF0C\u6240\u4EE5\u5C31\u65E0\u6CD5\u8DDF\u8E2A\u5230\u5BF9",paraId:8},{value:"d",paraId:8},{value:"\u7684\u64CD\u4F5C\u3002",paraId:8},{value:"\u663E\u7136\uFF0C\u6211\u4EEC\u9884\u671F\u662F\u5728",paraId:9},{value:"state.b = 20",paraId:9},{value:"\u4E4B\u540E\uFF0C\u80FD\u8DDF\u8E2A\u5230\u5176\u6D3E\u751F\u7684\u4E00\u7CFB\u5217\u64CD\u4F5C\u65E5\u5FD7\u7684\u3002",paraId:9},{value:"\u56E0\u6B64\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u9700\u8981\u4E3A",paraId:10},{value:"start()",paraId:10},{value:"\u63D0\u4F9B\u4E00\u4E2A\u9884\u671F\u7684\u7ED3\u675F\u51FD\u6570\uFF0C\u6765\u5224\u65AD\u662F\u5426\u505C\u6B62\u8DDF\u8E2A\uFF0C\u5982\u4E0B\uFF1A",paraId:10},{value:"\u5982\u679C\u56E0\u4E3A\u67D0\u4E9B\u539F\u56E0\uFF0C\u6211\u4EEC\u65E0\u6CD5\u63A5\u6536",paraId:11},{value:"set d.value",paraId:11},{value:"\u7684\u64CD\u4F5C\uFF0C\u53EF\u4EE5\u8C03\u7528",paraId:11},{value:"tracker.stop()",paraId:11},{value:"\u65B9\u6CD5\u6765\u505C\u6B62\u8DDF\u8E2A\u3002",paraId:11},{value:"trace",paraId:12},{value:"\u65B9\u6CD5\u4EC5\u5728\u5F00\u53D1\u65F6\u8FDB\u884C\u8C03\u5EA6\u4F7F\u7528\u3002",paraId:12}]},80870:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(76233);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u4E0E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u4E4B\u95F4\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0},{value:"\u76EE\u524D\u652F\u6301\u7684\u65B9\u6CD5\u6709\uFF1A",paraId:1,tocIndex:0},{value:"bind",paraId:2,tocIndex:0},{value:"useInput",paraId:2,tocIndex:0},{value:"useBindings",paraId:2,tocIndex:0}]},94226:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(97820);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u5E2E\u52A9\u4F60\u66F4\u65B9\u4FBF\u5730\u5B9E\u73B0\u8868\u5355\u8F93\u5165\u63A7\u4EF6\u7684\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:0,tocIndex:0}]},90342:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(12357);const d=[{value:"\u5982\u679C\u8981\u5BF9\u6DF1\u5C42\u5D4C\u5957\u7684\u5BF9\u8C61\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useBindings",paraId:0,tocIndex:0},{value:".",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u5D4C\u5957\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u652F\u6301\u5D4C\u5957\u6210\u5458,\u76F4\u63A5\u6839\u636E\u8DEF\u5F84\u7ED1\u5B9A\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u5373\u53EF\u3002",paraId:1},{value:"useBindings",paraId:1},{value:"\u521B\u5EFA\u7684\u7ED1\u5B9A\u5BF9\u8C61\uFF0C\u4F1A\u81EA\u52A8\u540C\u6B65\u72B6\u6001\u4E2D\u7684\u503C\u5230\u8868\u5355\u63A7\u4EF6\u4E0A\u3002",paraId:1}]},71769:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(36044);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"useField",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\u66F4\u52A0\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u81EA\u5B9A\u4E49",paraId:1,tocIndex:3},{value:"getter",paraId:1,tocIndex:3},{value:"\u548C",paraId:1,tocIndex:3},{value:"setter",paraId:1,tocIndex:3},{value:"\u65B9\u6CD5\u3002\u53EF\u4EE5\u5B9E\u73B0\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u591A\u4E2A\u503C\uFF0C\u751A\u81F3\u66F4\u590D\u6742\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002",paraId:1,tocIndex:3},{value:"\u5F53",paraId:2,tocIndex:5},{value:"useField(<path>)",paraId:2,tocIndex:5},{value:"\u7684\u8DEF\u5F84\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u4E3A\u8BE5\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u521B\u5EFA\u4E00\u4E2A\u53CC\u5411\u7ED1\u5B9A\u3002\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002",paraId:2,tocIndex:5},{value:"\u4F7F\u7528\u5BF9\u8C61\u53CC\u5411\u7ED1\u5B9A\u65F6\uFF0C\u4E0D\u652F\u6301\u6DF1\u5C42\u5D4C\u5957\u5BF9\u8C61\u3002",paraId:3},{value:"\u5982\u679C\u6CA1\u6709\u4E3A",paraId:4},{value:"useField",paraId:4},{value:"\u6307\u5B9A\u8DEF\u5F84\uFF0C\u90A3\u4E48\u4F1A\u7ED1\u5B9A\u6574\u4E2A\u72B6\u6001\u3002\u4F46\u662F\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\u3002",paraId:4},{value:"\u6CE8\u610F",paraId:5},{value:"\uFF1A\u4E0D\u80FD\u652F\u6301\u5D4C\u5957\u6210\u5458\uFF0C\u6240\u4EE5\u4EE5\u4E0B\u7528\u6CD5\u662F\u4E0D\u652F\u6301\u7684\u3002",paraId:5},{value:`export default ()=>{
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
`,paraId:6}]},23249:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(79247);const d=[{value:"useFrom",paraId:0,tocIndex:0},{value:"\u662F\u521B\u5EFA\u53EF\u7ED1\u5B9A\u8868\u5355\u7684\u5B8C\u6574\u89E3\u51B3\u65B9\u6848,\u53EF\u4EE5\u8BA9\u66F4\u65B9\u4FBF\u5C06",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u72B6\u6001\u548C\u8868\u5355\u63A7\u4EF6\u8FDB\u884C\u53CC\u5411\u7ED1\u5B9A\uFF0C\u4F7F\u5F97\u6536\u96C6\u6570\u636E\u53D8\u5F97\u66F4\u7B80\u5355\u3002",paraId:0,tocIndex:0},{value:"useFrom",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`type UseFormResult={
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

`,paraId:33,tocIndex:9},{value:"Reset",paraId:4}]},86231:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(9159);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u6B3E\u73B0\u4EE3\u5316\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7BA1\u7406\u5E93\uFF0C\u63D0\u4F9B\u4E86\u5F3A\u5927\u7684\u72B6\u6001\u7BA1\u7406\u80FD\u529B\uFF0C\u652F\u6301",paraId:0,tocIndex:0},{value:"\u54CD\u5E94\u5F0F",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u8868\u5355\u53CC\u5411\u7ED1\u5B9A",paraId:0,tocIndex:0},{value:"\u3001",paraId:0,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:0,tocIndex:0},{value:"\u7B49\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:"\u4E3B\u8981\u7279\u6027\uFF1A",paraId:1,tocIndex:0},{value:"\u54CD\u5E94\u5F0F\u6838\u5FC3",paraId:2,tocIndex:0},{value:"\uFF1A\u57FA\u4E8E",paraId:2,tocIndex:0},{value:"Proxy",paraId:2,tocIndex:0},{value:"\u5B9E\u73B0\uFF0C\u6570\u636E\u53D8\u5316\u81EA\u52A8\u89E6\u53D1\u89C6\u56FE\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u5C31\u5730\u8BA1\u7B97\u5C5E\u6027",paraId:2,tocIndex:0},{value:"\uFF1A\u72EC\u6709\u7684\u5C31\u5730\u8BA1\u7B97\u7279\u6027\uFF0C\u53EF\u4EE5\u5728\u72B6\u6001\u6811\u4E2D\u4EFB\u610F\u4F4D\u7F6E\u58F0\u660E",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\uFF0C\u8BA1\u7B97\u7ED3\u679C\u539F\u5730\u5199\u5165\u3002",paraId:2,tocIndex:0},{value:"\u4F9D\u8D56\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"\uFF1A\u81EA\u52A8\u8FFD\u8E2A",paraId:2,tocIndex:0},{value:"computed",paraId:2,tocIndex:0},{value:"\u5C5E\u6027\u7684\u4F9D\u8D56\uFF0C\u53EA\u6709\u4F9D\u8D56\u53D8\u5316\u65F6\u624D\u4F1A\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:2,tocIndex:0},{value:"\u5F02\u6B65\u8BA1\u7B97",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u7684\u5F02\u6B65\u8BA1\u7B97\u63A7\u5236\u80FD\u529B\uFF0C\u652F\u6301",paraId:2,tocIndex:0},{value:"\u8D85\u65F6\u3001\u91CD\u8BD5\u3001\u53D6\u6D88\u3001\u5012\u8BA1\u65F6\u3001\u8FDB\u5EA6",paraId:2,tocIndex:0},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:2,tocIndex:0},{value:"\u72B6\u6001\u53D8\u66F4\u76D1\u542C",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u76D1\u542C",paraId:2,tocIndex:0},{value:"get/set/delete/insert/update",paraId:2,tocIndex:0},{value:"\u7B49\u72B6\u6001\u5BF9\u8C61\u548C\u6570\u7EC4\u7684\u64CD\u4F5C\u76D1\u542C\u3002",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"signal",paraId:2,tocIndex:0},{value:"\u4FE1\u53F7\u673A\u5236\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u7EC6\u7C92\u5EA6\u7684\u7EC4\u4EF6\u66F4\u65B0\u3002",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u4E0E\u8BCA\u65AD",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301",paraId:2,tocIndex:0},{value:"chrome",paraId:2,tocIndex:0},{value:"\u7684",paraId:2,tocIndex:0},{value:"Redux DevTools Extension",paraId:2,tocIndex:0},{value:"\u8C03\u8BD5\u5DE5\u5177\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u72B6\u6001\u53D8\u5316\u3002",paraId:2,tocIndex:0},{value:"\u5D4C\u5957\u72B6\u6001",paraId:2,tocIndex:0},{value:"\uFF1A\u652F\u6301\u4EFB\u610F\u6DF1\u5EA6\u7684\u5D4C\u5957\u72B6\u6001\uFF0C\u65E0\u9700\u62C5\u5FC3\u72B6\u6001\u7BA1\u7406\u7684\u590D\u6742\u6027\u3002",paraId:2,tocIndex:0},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:2,tocIndex:0},{value:"\uFF1A\u5F3A\u5927\u800C\u7B80\u6D01\u7684\u53CC\u5411\u8868\u5355\u7ED1\u5B9A\uFF0C\u6570\u636E\u6536\u96C6\u7B80\u5355\u5FEB\u901F\u3002",paraId:2,tocIndex:0},{value:"\u5FAA\u73AF\u4F9D\u8D56",paraId:2,tocIndex:0},{value:"\uFF1A\u80FD\u5E2E\u52A9\u68C0\u6D4B\u5FAA\u73AF\u4F9D\u8D56\u51CF\u5C11\u6545\u969C\u3002",paraId:2,tocIndex:0},{value:"Typescript",paraId:2,tocIndex:0},{value:": \u5B8C\u5168\u652F\u6301Typescript\uFF0C\u63D0\u4F9B\u5B8C\u6574\u7684\u7C7B\u578B\u63A8\u65AD\u548C\u63D0\u793A",paraId:2,tocIndex:0},{value:"\u5355\u5143\u6D4B\u8BD5",paraId:2,tocIndex:0},{value:"\uFF1A\u63D0\u4F9B\u5B8C\u6574\u7684\u5355\u5143\u6D4B\u8BD5\u8986\u76D6\u7387\uFF0C\u4FDD\u8BC1\u4EE3\u7801\u8D28\u91CF\u3002",paraId:2,tocIndex:0}]},26021:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(61077);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u529F\u80FD\u5F3A\u5927\uFF0C\u6613\u4E8E\u4F7F\u7528\u3002\u4EE5\u4E0B\u901A\u8FC7\u6784\u5EFA\u4E00\u4E2A\u7B80\u5355\u4E66\u5E97\u5546\u57CE\u7684\u4F8B\u5B50\u6765\u5C55\u793A\u5982\u4F55\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\uFF0C\u4F53\u9A8C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u6781\u81F4\u4F18\u96C5\u548C\u5F3A\u5927\u7684\u529F\u80FD\u3002",paraId:0,tocIndex:0},{value:`npm install  @autostorejs/react
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
`,paraId:32},{value:"\u5C06store\u4E0E\u8868\u5355\u4E4B\u95F4\u8FDB\u884C\u53CC\u5411\u8868\u5355\u975E\u5E38\u7B80\u5355\uFF0C\u53EA\u9700\u8981",paraId:33},{value:"2",paraId:33},{value:"\u6B65\u5373\u53EF\u3002",paraId:33},{value:"Step 1\uFF1A  \u5728\u8868\u5355\u5143\u7D20\u4E0A",paraId:34},{value:"{...newOrderFrom}",paraId:34},{value:"\uFF0C\u5373\u53EF\u5C06\u8868\u5355\u5143\u7D20\u4E0Estore\u53CC\u5411\u7ED1\u5B9A\u3002",paraId:34},{value:"Step 2: \u5728",paraId:34},{value:"input",paraId:34},{value:"\u8F93\u5165\u7EC4\u4EF6\u4E2D\u6307\u5B9A\u72B6\u6001\u7684",paraId:34},{value:"name",paraId:34},{value:"\u5C5E\u6027,\u8BA9",paraId:34},{value:"name",paraId:34},{value:"\u7B49\u4E8E\u72B6\u6001\u8DEF\u5F84\u540D\u79F0\u5373\u53EF\u3002",paraId:34},{value:"\u7136\u540E\uFF0C\u5F53\u8FDB\u884C\u8F93\u5165\u65F6\u5C31\u4F1A\u81EA\u52A8\u540C\u6B65\u5230",paraId:35},{value:"store",paraId:35},{value:"\u4E2D\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:35},{value:"\u5355\u51FB",paraId:36},{value:"\u8868\u5355\u7ED1\u5B9A",paraId:37},{value:"\u67E5\u770B\u66F4\u591A\u5185\u5BB9.",paraId:36},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"createStore",paraId:38,tocIndex:7},{value:"\u6216",paraId:38,tocIndex:7},{value:"useStore",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4EFB\u610F\u5D4C\u5957\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u5BF9\u8C61\u3002",paraId:38,tocIndex:7},{value:"\u5728\u7EC4\u4EF6\u4E2D\u4F7F\u7528",paraId:38,tocIndex:7},{value:"useState",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u8BBF\u95EE\u72B6\u6001\u6570\u636E\uFF0C\u5E76\u5728\u72B6\u6001\u53D8\u5316\u65F6\u81EA\u52A8\u91CD\u65B0\u6E32\u67D3\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"$('\u72B6\u6001\u8DEF\u5F84')",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5C06\u6E32\u67D3\u66F4\u65B0\u9650\u5236\u5728\u8F83\u7EC6\u7684\u8303\u56F4\u5185\u3002",paraId:38,tocIndex:7},{value:"\u4F7F\u7528",paraId:38,tocIndex:7},{value:"computed",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u5176\u503C\u662F\u6839\u636E\u5176\u4ED6\u72B6\u6001\u8BA1\u7B97\u800C\u6765\uFF0C\u5F53\u4F9D\u8D56\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97\u3002",paraId:38,tocIndex:7},{value:"\u5F02\u6B65\u8BA1\u7B97\u652F\u6301",paraId:38,tocIndex:7},{value:"loading",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"error",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"timeout",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"retry",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"cancel",paraId:38,tocIndex:7},{value:"\u3001",paraId:38,tocIndex:7},{value:"progress",paraId:38,tocIndex:7},{value:"\u7B49\u9AD8\u7EA7\u529F\u80FD\u3002",paraId:38,tocIndex:7},{value:"useForm",paraId:38,tocIndex:7},{value:"\u53EF\u4EE5\u5C06\u8868\u5355\u5143\u7D20\u4E0E",paraId:38,tocIndex:7},{value:"store",paraId:38,tocIndex:7},{value:"\u53CC\u5411\u7ED1\u5B9A\uFF0C\u975E\u5E38\u65B9\u4FBF\u3002",paraId:38,tocIndex:7}]},27067:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(47315);const d=[]},72997:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(26916);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5171\u5305\u62EC\u4E09\u4E2A\u5305\uFF1A",paraId:0,tocIndex:0},{value:"autostore",paraId:1,tocIndex:0},{value:": \u6838\u5FC3\u5305",paraId:1,tocIndex:0},{value:"@autostorejs/react",paraId:1,tocIndex:0},{value:": \u9762\u5411",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u5F00\u53D1\u8005",paraId:1,tocIndex:0},{value:"@autostorejs/devtools",paraId:1,tocIndex:0},{value:": \u4F7F\u7528",paraId:1,tocIndex:0},{value:"Redux DevTools",paraId:1,tocIndex:0},{value:"\u8C03\u8BD5",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"autostore",paraId:2,tocIndex:1},{value:"\u662F\u6838\u5FC3\u5305\uFF0C\u63D0\u4F9B\u4E86",paraId:2,tocIndex:1},{value:"AutoStore",paraId:2,tocIndex:1},{value:"\u7684\u6838\u5FC3\u529F\u80FD\u3002",paraId:2,tocIndex:1},{value:"\u5982\u679C\u4F60\u662F",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u7B49\u5176\u4ED6\u6846\u67B6\u7684\u5F00\u53D1\u8005\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528",paraId:3,tocIndex:1},{value:"autostore",paraId:3,tocIndex:1},{value:"\u3002",paraId:3,tocIndex:1},{value:"\u8BE5\u5305\u4F7F\u7528",paraId:4,tocIndex:1},{value:"new AutoStore",paraId:4,tocIndex:1},{value:"\u6765\u521B\u5EFA",paraId:4,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5B9E\u4F8B\u3002",paraId:4,tocIndex:1},{value:`npm install  autostore
`,paraId:5},{value:`yarn add autostore
`,paraId:6},{value:`pnpm add autostore
`,paraId:7},{value:"\u5982\u679C\u60A8\u662F",paraId:8},{value:"React",paraId:8},{value:"\u5F00\u53D1\u8005\uFF0C\u53EA\u9700\u8981\u5B89\u88C5",paraId:8},{value:"@autostorejs/react",paraId:8},{value:"\u5373\u53EF\u3002",paraId:8},{value:"@autostorejs/react",paraId:9},{value:"\u5DF2\u7ECF\u96C6\u6210\u4E86",paraId:9},{value:"autostore",paraId:9},{value:"\u5305\u7684\u6240\u6709\u529F\u80FD\uFF0C",paraId:9},{value:"\u4E0D\u9700\u8981\u989D\u5916\u5B89\u88C5",paraId:9},{value:"autostore",paraId:9},{value:"\u3002",paraId:9},{value:`npm install  @autostorejs/react
`,paraId:10},{value:`yarn add @autostorejs/react
`,paraId:11},{value:`pnpm add @autostorejs/react
`,paraId:12},{value:"@autostorejs/devtools",paraId:13,tocIndex:3},{value:"\u662F",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u8C03\u8BD5\u5DE5\u5177\u5305\uFF0C\u57FA\u4E8E",paraId:13,tocIndex:3},{value:"chrome",paraId:13,tocIndex:3},{value:"\u7684",paraId:13,tocIndex:3},{value:"Redux DevTools Extension",paraId:13,tocIndex:3},{value:"\u6765\u8C03\u8BD5",paraId:13,tocIndex:3},{value:"AutoStore",paraId:13,tocIndex:3},{value:"\u7684\u72B6\u6001\u3002",paraId:13,tocIndex:3},{value:`npm install  @autostorejs/devtools
`,paraId:14},{value:`yarn add @autostorejs/devtools
`,paraId:15},{value:`pnpm add @autostorejs/devtools
`,paraId:16},{value:"\u76EE\u524D\u8FD8\u6CA1\u6709\u5B9E\u73B0\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5C01\u88C5",paraId:17,tocIndex:4},{value:"autostore",paraId:17,tocIndex:4},{value:"\u5B9E\u73B0",paraId:17,tocIndex:4},{value:"Vue",paraId:17,tocIndex:4},{value:"\u7684\u96C6\u6210\u3002",paraId:17,tocIndex:4},{value:"@autostorejs/react",paraId:18,tocIndex:4},{value:"\u4E5F\u4EC5\u662F",paraId:18,tocIndex:4},{value:"autostore",paraId:18,tocIndex:4},{value:"\u7684\u5C01\u88C5\uFF0C\u4EE3\u7801\u91CF\u5F88\u5C11\uFF0C\u6709\u5174\u8DA3\u7684\u540C\u5B66\u53EF\u4EE5\u5C1D\u8BD5\u4E00\u4E0B\u3002",paraId:18,tocIndex:4}]},42516:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(3694);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u529F\u80FD\u5F3A\u5927\uFF0CAPI\u8BBE\u8BA1\u4F18\u96C5\uFF0C\u6587\u6863\u793A\u4F8B\u4E5F\u5F88\u9F50\u5168\uFF0C\u8BA4\u771F\u9605\u8BFB\u5B98\u7F51\u6587\u6863\u53EF\u4EE5\u89E3\u51B3\u5927\u591A\u6570\u95EE\u9898\u3002",paraId:0,tocIndex:0},{value:"\u2753\u4E5F\u6B22\u8FCE\u5927\u5BB6\u63D0",paraId:1,tocIndex:0},{value:"issue",paraId:1,tocIndex:0},{value:"\u6765\u53CD\u9988\u95EE\u9898\u3002",paraId:1,tocIndex:0},{value:"\u{1F31F}\u5982\u679C\u4F60\u89C9\u5F97",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u597D\u7528\uFF0C\u6B22\u8FCE\u7ED9\u4E2A",paraId:1,tocIndex:0},{value:"star",paraId:1,tocIndex:0},{value:"\u{1F4E6}\u5982\u679C\u4F60\u6709\u597D\u7684\u5EFA\u8BAE\u6216\u8005\u9700\u6C42\uFF0C\u6B22\u8FCE\u63D0",paraId:1,tocIndex:0},{value:"PR",paraId:1,tocIndex:0},{value:"\u4E5F\u6B22\u8FCE\u5927\u5BB6\u52A0\u5165",paraId:2,tocIndex:0},{value:"AutoStore",paraId:2,tocIndex:0},{value:"\u7684\u5FAE\u4FE1\u4EA4\u6D41\u7FA4\uFF0C\u4E00\u8D77\u8BA8\u8BBA\u95EE\u9898\uFF0C\u5206\u4EAB\u7ECF\u9A8C\u3002",paraId:2,tocIndex:0},{value:"\u52A0\u5165\u65B9\u5F0F\uFF1A",paraId:3,tocIndex:0},{value:"\u626B\u63CF\u4E0A\u65B9\u4E8C\u7EF4\u7801\uFF0C\u5907\u6CE8",paraId:4,tocIndex:0},{value:"AutoStore",paraId:4,tocIndex:0},{value:"\u5373\u53EF\u52A0\u5165\u3002",paraId:4,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u6574\u7406\u4E86\u4E00\u4E9B\u5E38\u89C1\u95EE\u9898\uFF0C\u5E0C\u671B\u80FD\u5E2E\u52A9\u4F60\u66F4\u597D\u7684\u4F7F\u7528",paraId:5,tocIndex:0},{value:"AutoStore",paraId:5,tocIndex:0},{value:"\u3002",paraId:5,tocIndex:0}]},679:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(4180);const d=[{value:"\u5728\u4E3B\u6D41\u7684\u524D\u7AEF\u5F00\u53D1\u6846\u67B6\u4E2D\uFF0C\u65E0\u8BBA\u662F",paraId:0,tocIndex:1},{value:"React",paraId:0,tocIndex:1},{value:"\u3001",paraId:0,tocIndex:1},{value:"Vue",paraId:0,tocIndex:1},{value:"\u8FD8\u662F",paraId:0,tocIndex:1},{value:"Svelte",paraId:0,tocIndex:1},{value:"\uFF0C\u6838\u5FC3\u90FD\u662F\u56F4\u7ED5\u7740\u66F4\u9AD8\u6548\u5730\u8FDB\u884C",paraId:0,tocIndex:1},{value:"UI",paraId:0,tocIndex:1},{value:"\u6E32\u67D3\u5C55\u5F00\u7684\u3002",paraId:0,tocIndex:1},{value:"\u4E3A\u4E86\u5B9E\u73B0\u9AD8\u6027\u80FD\uFF0C\u57FA\u4E8EDOM\u603B\u662F\u6BD4\u8F83\u6162\u8FD9\u4E2A\u5047\u8BBE\u524D\u63D0\uFF0C\u5176\u6700\u6838\u5FC3\u7684\u8981\u89E3\u51B3\u7684\u95EE\u9898\u6709\u4E24\u4E2A\uFF1A",paraId:1,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:2,tocIndex:1},{value:"\u4E3A\u4E86\u5C06",paraId:3,tocIndex:1},{value:"\u54CD\u5E94\u5F0F\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:3,tocIndex:1},{value:"\u4F18\u5316\u5230\u6781\u81F4\uFF0C\u5404\u79CD\u6846\u67B6\u662F\u516B\u4ED9\u8FC7\u6D77\uFF0C\u5404\u663E\u795E\u901A\u3002\u4EE5\u6700\u6D41\u884C\u7684",paraId:3,tocIndex:1},{value:"React",paraId:3,tocIndex:1},{value:"\u548C",paraId:3,tocIndex:1},{value:"Vue",paraId:3,tocIndex:1},{value:"\u4E3A\u4F8B\uFF0C",paraId:3,tocIndex:1},{value:"\u9996\u5148\u4E24\u8005\u5747\u5F15\u5165\u4E86",paraId:4,tocIndex:1},{value:"Virtual DOM",paraId:4,tocIndex:1},{value:"\u7684\u6982\u5FF5\u3002",paraId:4,tocIndex:1},{value:"Vue",paraId:4,tocIndex:1},{value:"\u7684\u9759\u6001\u6A21\u677F\u7F16\u8BD1\uFF0C\u901A\u8FC7\u7F16\u8BD1\u65F6\u7684\u9759\u6001\u5206\u6790\uFF0C\u6765\u4F18\u5316",paraId:4,tocIndex:1},{value:"\u7EC6\u7C92\u5EA6\u66F4\u65B0",paraId:4,tocIndex:1},{value:"\u903B\u8F91\uFF0C\u5728\u7F16\u8BD1\u9636\u6BB5\u5C3D\u53EF\u80FD\u5730\u5206\u6790\u51FA\u8BE5\u6E32\u67D3\u7684DOM\u3002",paraId:4,tocIndex:1},{value:"\u800C",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:1},{value:"JSX",paraId:4,tocIndex:1},{value:"\u52A8\u6001\u8BED\u6CD5\uFF0C\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u96BE\u4EE5\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u6240\u4EE5",paraId:4,tocIndex:1},{value:"React",paraId:4,tocIndex:1},{value:`\u53EA\u80FD\u5728\u8FD0\u884C\u65F6\u60F3\u529E\u6CD5\u3002
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
\u672C\u4EBA\u5BF9`,paraId:59},{value:"Compiler",paraId:59},{value:"\u7684\u4F7F\u7528\u5E76\u4E0D\u662F\u5F88\u770B\u597D\uFF0C\u6709\u5F85\u8FDB\u4E00\u6B65\u7814\u7A76\u3002",paraId:59}]},86761:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(75690);const d=[{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u53EF\u4EE5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"$",paraId:0,tocIndex:0},{value:"\u6216",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:`\u6765\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
\u9605\u8BFB\u524D\u6587\u4E8E`,paraId:12},{value:"\u76D1\u542C\u5C5E\u6027",paraId:13},{value:"\u7AE0\u8282\uFF0C\u4E86\u89E3\u76D1\u542C\u5C5E\u6027\u7684\u57FA\u672C\u6982\u5FF5\u3002",paraId:12}]},47864:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(8767);const d=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u524D\u6587\u4E2D\uFF0C\u6211\u4EEC\u4ECB\u7ECD\u4E86\u5982\u4F55\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u666E\u901A\u72B6\u6001\u6570\u636E\u8FD8\u662F\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7",paraId:1,tocIndex:1},{value:"$",paraId:1,tocIndex:1},{value:"\u6216",paraId:1,tocIndex:1},{value:"signal",paraId:1,tocIndex:1},{value:`\u51FD\u6570\u5C06\u5176\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u3002
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
`,paraId:25,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\uFF0C",paraId:26,tocIndex:4},{value:"computed(....)",paraId:26,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:26,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:26,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:26,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:27,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:28},{value:"computed",paraId:28},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:28},{value:"loading",paraId:28},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:28}]},57143:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(63518);const d=[{value:"\u524D\u6587\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\u76F8\u5BF9\u7B80\u5355\uFF0C\u56E0\u6B64\u4E5F\u63D0\u4F9B\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\uFF0C\u53EF\u4EE5\u5728\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u8FDB\u884C\u66F4\u590D\u6742\u7684\u5916\u89C2\u6216\u6837\u5F0F\u63A7\u5236\uFF0C\u8FD4\u56DE\u4E00\u4E2A",paraId:0,tocIndex:1},{value:"ReactNode",paraId:0,tocIndex:1},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u3002",paraId:0,tocIndex:1},{value:"\u53EF\u4EE5\u5728\u5C06",paraId:1,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u6307\u5B9A\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570",paraId:1,tocIndex:1},{value:"\uFF0C\u65B9\u6CD5\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`interface SignalComponentType<State extends Dict>{
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
`,paraId:6,tocIndex:2},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A",paraId:7,tocIndex:2},{value:"$(render,'<\u72B6\u6001\u8DEF\u5F84>')",paraId:7,tocIndex:2},{value:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u51FD\u6570\u7684\u793A\u4F8B\uFF1A",paraId:7,tocIndex:2},{value:"\u5982\u679C\u72B6\u6001\u6570\u636E\u8DEF\u5F84\u6240\u6307\u5411\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5BF9\u8C61",paraId:8,tocIndex:3},{value:"AsyncComputedValue",paraId:8,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:8,tocIndex:3},{value:"loading",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"error",paraId:8,tocIndex:3},{value:"\u3001",paraId:8,tocIndex:3},{value:"value",paraId:8,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:8,tocIndex:3},{value:"\u6B64\u65F6\u540C\u6837\u652F\u6301\u4F7F\u7528",paraId:9,tocIndex:3},{value:"$('<\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u7684\u8DEF\u5F84>')",paraId:9,tocIndex:3},{value:"\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\u3002",paraId:9,tocIndex:3},{value:"$('order.count')",paraId:10},{value:"\u548C",paraId:10},{value:"$('order.total.value')",paraId:10},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:10},{value:"AsyncComputedValue",paraId:10},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:10},{value:"value",paraId:10},{value:"\u3002",paraId:10},{value:"\u5982\u679C\u76EE\u6807\u8DEF\u5F84\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\uFF0C\u4E5F\u91C7\u7528\u540C\u6837\u7684",paraId:11,tocIndex:5},{value:"$(<render>,<path>)",paraId:11,tocIndex:5},{value:"\u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6E32\u67D3\uFF0C\u4F46\u6B64\u65F6\u6E32\u67D3\u51FD\u6570\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5BF9\u8C61",paraId:11,tocIndex:5},{value:"AsyncComputedValue",paraId:11,tocIndex:5},{value:"\uFF0C\u5305\u542B\u4E86",paraId:11,tocIndex:5},{value:"value",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"loading",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"error",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"timeout",paraId:11,tocIndex:5},{value:"\u3001",paraId:11,tocIndex:5},{value:"retry",paraId:11,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u3002",paraId:11,tocIndex:5},{value:"\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6839\u636E",paraId:12,tocIndex:5},{value:"loading",paraId:12,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"error",paraId:12,tocIndex:5},{value:"\u7B49\u5C5E\u6027\u8FDB\u884C\u66F4\u591A\u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u63A7\u5236\u3002",paraId:12,tocIndex:5},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u4EC5\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:13}]},82919:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(35371);const d=[{value:"\u5F53\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u51FA\u9519\u65F6\u53EF\u4EE5\u901A\u8FC7",paraId:0,tocIndex:0},{value:"options.errorBoundary",paraId:0,tocIndex:0},{value:"\u9009\u9879\u6765\u6307\u5B9A\u9519\u8BEF\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u81EA\u5B9A\u4E49\u8FD4\u56DE",paraId:0,tocIndex:0},{value:"ReactNode",paraId:0,tocIndex:0},{value:"\u7C7B\u578B\u7684\u7EC4\u4EF6\u8FDB\u884C\u9519\u8BEF\u5448\u73B0\u3002",paraId:0,tocIndex:0}]},89615:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(33358);const d=[{value:"\u5C06\u72B6\u6001\u6570\u636E\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:`interface SignalComponentType<State extends Dict>{
    // \u6307\u5B9A\u72B6\u6001\u6570\u636E\u8DEF\u5F84
    (selector: string):React.ReactNode   
    // \u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570
    (selector: (state:ComputedState<State>)=>React.ReactNode):React.ReactNode 
}
`,paraId:1,tocIndex:0},{value:"\u53EA\u9700\u8981\u6307\u5B9A\u72B6\u6001\u6570\u5E93\u7684\u8DEF\u5F84\u6216\u8005\u63D0\u4F9B\u4E00\u4E2A\u8FD4\u56DE\u72B6\u6001\u6570\u636E\u7684\u51FD\u6570\u5373\u53EF\u3002",paraId:2},{value:"\u4F7F\u7528",paraId:3,tocIndex:1},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:3,tocIndex:1},{value:"\u5C06",paraId:3,tocIndex:1},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:3,tocIndex:1},{value:"\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002",paraId:3,tocIndex:1},{value:"\u4F7F\u7528",paraId:4,tocIndex:2},{value:"$((state)=>{.....})",paraId:4,tocIndex:2},{value:"\u5C06\u591A\u4E2A\u72B6\u6001\u6570\u636E\u7EC4\u5408\u521B\u5EFA\u4E3A\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53\u4F9D\u8D56\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u8BE5\u4FE1\u53F7\u7EC4\u4EF6\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:2},{value:"\u5F53\u4F7F\u7528",paraId:5,tocIndex:3},{value:"$('<\u72B6\u6001\u8DEF\u5F84>')",paraId:5,tocIndex:3},{value:"\u5C06",paraId:5,tocIndex:3},{value:"\u72B6\u6001\u6570\u636E\u76F4\u63A5\u76F4\u63A5\u5C01\u88C5\u4E3A\u4FE1\u53F7\u7EC4\u4EF6",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u5982\u679C\u72B6\u6001\u6570\u636E\u662F\u5F02\u6B65\u6570\u636E\u5BF9\u8C61",paraId:5,tocIndex:3},{value:"AsyncComputedValue",paraId:5,tocIndex:3},{value:"\u65F6\uFF0C\u8BE5\u5BF9\u8C61\u5305\u542B\u4E86",paraId:5,tocIndex:3},{value:"loading",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"error",paraId:5,tocIndex:3},{value:"\u3001",paraId:5,tocIndex:3},{value:"value",paraId:5,tocIndex:3},{value:"\u7B49\u5C5E\u6027\u3002",paraId:5,tocIndex:3},{value:"\u5F53\u8DEF\u5F84\u6307\u5B9A\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u5C5E\u6027\u65F6\uFF0C\u521B\u5EFA\u7684\u4FE1\u53F7\u7EC4\u4EF6\u65F6\u4F1A\u81EA\u52A8\u6DFB\u52A0",paraId:6},{value:"value",paraId:6},{value:"\u5C5E\u6027\u3002\u56E0\u6B64\uFF0C\u4EE5\u4E0A",paraId:6},{value:"$('order.total')",paraId:6},{value:"\u548C",paraId:6},{value:"$('order.total.value')",paraId:6},{value:"\u662F\u7B49\u4EF7\u7684\u3002",paraId:6},{value:"$('order.count')",paraId:7},{value:"\u548C",paraId:7},{value:"$('order.total.value')",paraId:7},{value:"\u662F\u7B49\u4EF7\u7684\uFF0C\u521B\u5EFA\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u5982\u679C\u53D1\u73B0\u76EE\u6807\u662F",paraId:7},{value:"AsyncComputedValue",paraId:7},{value:"\u5219\u81EA\u52A8\u6DFB\u52A0",paraId:7},{value:"value",paraId:7},{value:"\u3002",paraId:7},{value:"\u60A8\u53EF\u80FD\u5DF2\u7ECF\u6CE8\u610F\u5230\u4E86\uFF0C\u5F53\u524D\u9875\u9762\u7684\u6E32\u67D3\u8272\u5757\u7EC4\u4EF6\u90FD\u4E0D\u4F1A\u53D8\u5316\u26A1\u3002\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7EC6\u7C92\u5EA6\u66F4\u65B0\u7684\u9B45\u529B\u6240\u5728\uFF0C\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u7684\u6E32\u67D3\u88AB\u9650\u5236\u5728\u4FE1\u53F7\u7EC4\u4EF6\u5185\u90E8\u3002",paraId:7}]},56126:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(23841);const d=[{value:"\u9605\u8BFB\u672C\u8282\u65F6\u8BF7\u5148\u7406\u89E3",paraId:0},{value:"computed",paraId:0},{value:"\u548C",paraId:0},{value:"watch",paraId:0},{value:"\u7AE0\u8282\u3002",paraId:0},{value:"\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u662F\u5C06",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:"\u5C01\u88C5\u6210\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u5F53",paraId:1,tocIndex:1},{value:"computedObject",paraId:1,tocIndex:1},{value:`\u4E2D\u7684\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1\u4FE1\u53F7\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3\u3002
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
`,paraId:22,tocIndex:4},{value:"\u9700\u8981\u4F20\u5165\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\uFF0C",paraId:23,tocIndex:4},{value:"computed(....)",paraId:23,tocIndex:4},{value:"\u53EF\u4EE5\u6784\u5EFA\u4E00\u4E2A",paraId:23,tocIndex:4},{value:"ObserverDescriptorBuilder",paraId:23,tocIndex:4},{value:"\u5BF9\u8C61\uFF0C\u5176\u4F7F\u7528\u65B9\u6CD5\u4E0E\u8BA1\u7B97\u5C5E\u6027\u76F8\u540C\u3002",paraId:23,tocIndex:4},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u5F02\u6B65\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6\u7684\u793A\u4F8B\uFF1A",paraId:24,tocIndex:4},{value:"\u521B\u5EFA\u5F02\u6B65\u4FE1\u53F7\u7EC4\u4EF6\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:25},{value:"computed",paraId:25},{value:"\u521B\u5EFA\u7684\u5F02\u6B65\u8BA1\u7B97\u7684\u6240\u6709\u7279\u6027\uFF0C\u5305\u62EC",paraId:25},{value:"loading",paraId:25},{value:"\u3001\u8D85\u65F6\u63A7\u5236\u3001\u91CD\u8BD5\u3001\u9519\u8BEF\u5904\u7406\u3001\u8FDB\u5EA6\u7B49\u7B49\u3002",paraId:25}]},51337:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(31363);const d=[]},32465:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(81897);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7C7B\u662F",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0,tocIndex:0},{value:"\u5728\u4F7F\u7528",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u4E4B\u524D\u6211\u4EEC\u7B80\u5355\u5173\u4E8E\u4E00\u4E0B",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u7684\u57FA\u672C\u539F\u7406\u548C\u5DE5\u4F5C\u6D41\u7A0B\u3002",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u7ED3\u6784",paraId:2},{value:"AutoStore",paraId:3,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u57FA\u672C\u5DE5\u4F5C\u539F\u7406\u7ED3\u6784\u5982\u4E0B\uFF1A",paraId:3,tocIndex:1},{value:"AutoStore",paraId:4,tocIndex:1},{value:"\u5BF9\u8C61\u7684\u6838\u5FC3\u90E8\u4EF6\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A",paraId:4,tocIndex:1},{value:"state",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u6570\u636E\u7684",paraId:5,tocIndex:1},{value:"Proxy",paraId:5,tocIndex:1},{value:"\u4EE3\u7406\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u62E6\u622A\u72B6\u6001\u6570\u636E\u7684\u8BFB\u5199\u64CD\u4F5C\u3002",paraId:5,tocIndex:1},{value:"computedObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u8BA1\u7B97\u5C5E\u6027\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"watchObjects",paraId:5,tocIndex:1},{value:"\uFF1A\u76D1\u542C\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B58\u50A8\u6240\u6709\u7684\u76D1\u542C\u5BF9\u8C61\u3002",paraId:5,tocIndex:1},{value:"operates",paraId:5,tocIndex:1},{value:"\uFF1A\u72B6\u6001\u8BFB\u5199\u4E8B\u4EF6\u89E6\u53D1\u5668\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u90E8\u7684",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\u603B\u7EBF",paraId:5,tocIndex:1},{value:"\uFF0C\u7528\u6765\u8BA2\u9605\u548C\u53D1\u5E03\u72B6\u6001\u6570\u636E\u7684\u53D8\u66F4\u4E8B\u4EF6\u3002\u5F53",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u503C\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u89E6\u53D1",paraId:5,tocIndex:1},{value:"operates.emit('a.b.c')",paraId:5,tocIndex:1},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7",paraId:5,tocIndex:1},{value:"operates.on('a.b.c')",paraId:5,tocIndex:1},{value:"\u6765\u8BA2\u9605",paraId:5,tocIndex:1},{value:"a.b.c",paraId:5,tocIndex:1},{value:"\u7684\u8BFB\u5199\u53D8\u66F4\u4E8B\u4EF6\u3002",paraId:5,tocIndex:1},{value:"\u5DE5\u4F5C\u6D41\u7A0B",paraId:2},{value:"\u51C6\u5907\u9636\u6BB5",paraId:2},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"AutoStore",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:6,tocIndex:3},{value:"Proxy",paraId:6,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406\u72B6\u6001\u6570\u636E\u3002",paraId:6,tocIndex:3},{value:"\u540C\u65F6\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3A",paraId:6,tocIndex:3},{value:"operates",paraId:6,tocIndex:3},{value:"\u7684",paraId:6,tocIndex:3},{value:"EventEmitter",paraId:6,tocIndex:3},{value:"\uFF0C\u5C31\u662F\u4E00\u4E2A\u4E8B\u4EF6\u5206\u53D1\u5668\uFF0C\u5C31\u5982\u4F55",paraId:6,tocIndex:3},{value:"mitt",paraId:6,tocIndex:3},{value:"\u3001",paraId:6,tocIndex:3},{value:"eventemitter2",paraId:6,tocIndex:3},{value:"\u3002",paraId:6,tocIndex:3},{value:"\u7136\u540E\u9012\u5F52\u904D\u5386\u72B6\u6001\u6570\u636E\u65F6\uFF0C\u4F1A\u6839\u636E\u6570\u636E\u7C7B\u578B\u521B\u5EFA\u4E0D\u540C\u7684\u5BF9\u8C61\uFF08\u652F\u6301\u8BBE\u7F6E",paraId:6,tocIndex:3},{value:"lazy=true",paraId:6,tocIndex:3},{value:`\uFF0C\u4EC5\u5728\u8BFB\u53D6\u65F6\u521B\u5EFA\uFF09\uFF1A
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"Proxy",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u4EE3\u7406",paraId:7,tocIndex:3},{value:"{}",paraId:7,tocIndex:3},{value:"\u6216",paraId:7,tocIndex:3},{value:"\u6570\u7EC4",paraId:7,tocIndex:3},{value:"\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5B9E\u73B0\u652F\u6301\u4EFB\u610F\u5D4C\u5957\u7684\u72B6\u6001\u6570\u636E\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\uFF0C\u540C\u65F6\u8BE5",paraId:7,tocIndex:3},{value:"ComputedObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u4F1A\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.computedObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5982\u679C\u662F",paraId:7,tocIndex:3},{value:"\u76D1\u542C\u51FD\u6570",paraId:7,tocIndex:3},{value:"\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:7,tocIndex:3},{value:"WatchObject",paraId:7,tocIndex:3},{value:"\u5BF9\u8C61\u5B9E\u4F8B\u4FDD\u5B58\u5230",paraId:7,tocIndex:3},{value:"store.watchObjects",paraId:7,tocIndex:3},{value:"\u4E2D\u3002",paraId:7,tocIndex:3},{value:"\u5F53\u521B\u5EFA",paraId:6,tocIndex:3},{value:"ComputedObject",paraId:6,tocIndex:3},{value:`\u5BF9\u8C61\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u6839\u636E\u540C\u6B65\u6216\u5F02\u6B65\u7684\u65B9\u5F0F\u8BA1\u7B97\u51FA\u521D\u59CB\u503C\u548C\u6536\u96C6\u4F9D\u8D56\u3002
`,paraId:6,tocIndex:3},{value:"\u5982\u679C\u662F\u540C\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u4F1A\u6267\u884C\u4E00\u6B21\u6765\u81EA\u52A8\u6536\u96C6\u4F9D\u8D56\u3002",paraId:8,tocIndex:3},{value:`\u5982\u679C\u662F\u5F02\u6B65\u8BA1\u7B97\u51FD\u6570\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6307\u5B9A\u4F9D\u8D56\u3002
\u7136\u540E\uFF0C\u6839\u636E\u4F9D\u8D56\u7684\u76EE\u6807\u8DEF\u5F84\uFF0C\u8C03\u7528`,paraId:8,tocIndex:3},{value:"store.operates.on('\u4F9D\u8D56\u8DEF\u5F84')",paraId:8,tocIndex:3},{value:"\u6765\u8BA2\u9605\u53D8\u66F4\u4E8B\u4EF6",paraId:8,tocIndex:3},{value:"\u8BA1\u7B97\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"computed",paraId:9},{value:"\uFF0C\u5F53\u6240\u4F9D\u8D56\u7684\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\uFF0C\u4E00\u822C\u4F9D\u8D56\u662F\u786E\u5B9A\u7684\u3002\u800C",paraId:9},{value:"\u76D1\u542C\u51FD\u6570",paraId:9},{value:"\u7B49\u540C\u4E8E",paraId:9},{value:"Vue",paraId:9},{value:"\u7684",paraId:9},{value:"watch",paraId:9},{value:"\uFF0C\u7528\u6765\u76D1\u542C\u72B6\u6001\u6570\u636E\u7684\u53D8\u5316\uFF0C\u53EF\u4EE5\u76D1\u542C\u52A8\u6001\u8303\u56F4\u7684\u4F9D\u8D56\u53D8\u5316\u3002",paraId:9},{value:"\u66F4\u65B0\u9636\u6BB5",paraId:2},{value:"\u63A5\u4E0B\u6765\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u540E\u7EED\u6D41\u7A0B\u5982\u4E0B\uFF1A",paraId:10,tocIndex:4},{value:"\u5F53",paraId:11,tocIndex:4},{value:"store.state.count=100",paraId:11,tocIndex:4},{value:"\u66F4\u65B0\u72B6\u6001\u503C\u65F6\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u88AB",paraId:11,tocIndex:4},{value:"Proxy",paraId:11,tocIndex:4},{value:"\u5BF9\u8C61",paraId:11,tocIndex:4},{value:"set",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\u62E6\u622A\uFF0C\u8BA1\u7B97\u51FA\u66F4\u65B0\u7684\u72B6\u6001\u503C\u7684\u8DEF\u5F84",paraId:11,tocIndex:4},{value:"['count']",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u7136\u540E\u5728",paraId:11,tocIndex:4},{value:"store.operates",paraId:11,tocIndex:4},{value:"\u89E6\u53D1",paraId:11,tocIndex:4},{value:"emit('<\u72B6\u6001\u8DEF\u5F84>',<operateParams>)",paraId:11,tocIndex:4},{value:"\u65B9\u6CD5\uFF0C\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005\u3002",paraId:11,tocIndex:4},{value:"\u5BF9\u5E94\u7684",paraId:11,tocIndex:4},{value:"ComputedObject",paraId:11,tocIndex:4},{value:"\u8BA2\u9605\u8005\u6536\u5230\u901A\u77E5\u540E\uFF0C\u4F1A\u6267\u884C",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\uFF0C",paraId:11,tocIndex:4},{value:"\u6700\u540E\u5C06",paraId:11,tocIndex:4},{value:"\u8BA1\u7B97\u51FD\u6570Getter",paraId:11,tocIndex:4},{value:"\u7684\u6267\u884C\u7ED3\u679C\u4FDD\u5B58\u5230",paraId:11,tocIndex:4},{value:"store.state",paraId:11,tocIndex:4},{value:"\u4E2D\u7684\u539F\u59CB\u8DEF\u5F84\u4E0A\u3002",paraId:11,tocIndex:4}]},80814:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(94451);const d=[{value:"@autostorejs/react",paraId:0,tocIndex:0},{value:"\u662F\u4E00\u4E2A\u57FA\u4E8E",paraId:0,tocIndex:0},{value:"Proxy",paraId:0,tocIndex:0},{value:"\u7684\u54CD\u5E94\u5F0F\u72B6\u6001\u7CFB\u7EDF\uFF0C\u5176\u63D0\u4F9B\u4E86",paraId:0,tocIndex:0},{value:"useState",paraId:0,tocIndex:0},{value:"\u548C",paraId:0,tocIndex:0},{value:"signal",paraId:0,tocIndex:0},{value:"\u673A\u5236\u6765\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\u3002",paraId:0,tocIndex:0},{value:"\u4EE5\u4E0B\u6211\u4EEC\u5C31\u5982\u4F55\u4F18\u5316",paraId:1,tocIndex:0},{value:"React",paraId:1,tocIndex:0},{value:"\u6E32\u67D3,\u4E3E\u4E86\u51E0\u4E2A\u4F8B\u5B50\u3002",paraId:1,tocIndex:0},{value:"Context",paraId:2},{value:"\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u4F20\u7EDF\u7684",paraId:3,tocIndex:1},{value:"Context",paraId:3,tocIndex:1},{value:"\u7684\u6E32\u67D3\u4F8B\u5B50\u3002",paraId:3,tocIndex:1},{value:"\u4ECE\u4E0A\u9762\u7684\u4F8B\u5B50\u53EF\u770B\u5230\uFF0C\u5F53\u66F4\u65B0",paraId:4},{value:"Context.age",paraId:4},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u4E0D\u7BA1\u662F\u5426\u6709\u4F7F\u7528",paraId:4},{value:"Age",paraId:4},{value:"\u5747\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:4},{value:"Context",paraId:4},{value:"\u7684\u6570\u636E\uFF0C\u4E3A\u6B64\u6211\u4EEC\u4E00\u822C\u9700\u8981\u4F7F\u7528",paraId:4},{value:"React.memo",paraId:4},{value:"\u6216\u4E00\u4E9B\u7B2C\u4E09\u65B9\u5E93\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:4},{value:"\u6700\u5927\u7684\u95EE\u9898\u5728\u4E8E\uFF0C\u5F53\u66F4\u65B0\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u65F6\uFF0C\u6240\u6709\u7684\u5B50\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u8FD9\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u5B50\u7EC4\u4EF6\u5E76\u6CA1\u6709\u4F7F\u7528\u5230\u6839",paraId:5},{value:"Context",paraId:5},{value:"\u7684\u6570\u636E\u3002\u6211\u4EEC\u5E0C\u671B\u80FD\u5B9E\u73B0\u66F4\u7EC6\u7C92\u5EA6\u7684\u6E32\u67D3\uFF0C\u53EA\u6709\u5F53\u5B50\u7EC4\u4EF6\u4F7F\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:5},{value:"\u4E3A\u4E86\u4F18\u5316\u6E32\u67D3\u903B\u8F91\uFF0C\u4E00\u822C\u6211\u4EEC\u4F1A\u4F7F\u7528",paraId:6,tocIndex:2},{value:"React.memo",paraId:6,tocIndex:2},{value:"\u6765\u8FDB\u884C\u4F18\u5316\u6E32\u67D3\u3002",paraId:6,tocIndex:2},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u5F53\u66F4\u65B0",paraId:7},{value:"Age",paraId:7},{value:"\u65F6\uFF0C\u4EC5\u6839\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C",paraId:7},{value:"FirstName",paraId:7},{value:"\u548C",paraId:7},{value:"LastName",paraId:7},{value:"\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230",paraId:7},{value:"Age",paraId:7},{value:"\u3002",paraId:7},{value:"\u5F53\u5728\u6839\u7EC4\u4EF6\u4E2D\u66F4\u65B0",paraId:7},{value:"FirstName",paraId:7},{value:"\u65F6\uFF0C\u4EC5",paraId:7},{value:"FirstName",paraId:7},{value:"\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u800C",paraId:7},{value:"LastName",paraId:7},{value:"\u7EC4\u4EF6\u4E2D\u6CA1\u6709",paraId:7},{value:"FirstName",paraId:7},{value:"\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:7},{value:"\u5728\u5927\u578B",paraId:8},{value:"React",paraId:8},{value:"\u5E94\u7528\uFF0C\u9762\u5BF9\u590D\u6742\u7684\u72B6\u6001\u53D8\u5316\uFF0C\u5982\u4F55\u51B3\u5B9A\u4F55\u65F6\u4F7F\u7528",paraId:8},{value:"React.memo",paraId:8},{value:"\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u5FC3\u667A\u95EE\u9898,\u4E5F\u662F\u6700\u5BB9\u6613\u641E\u5751\u91CC\u7684\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48",paraId:8},{value:"React",paraId:8},{value:"\u5B98\u65B9\u8981\u63A8",paraId:8},{value:"Compiler",paraId:8},{value:"\u7684\u539F\u56E0\uFF0C\u60F3\u81EA\u52A8\u5E2E\u52A9\u7528\u6237\u5305\u88C5",paraId:8},{value:"React.memo",paraId:8},{value:"\u800C\u66F4\u597D\u7684\u529E\u6CD5\u5C31\u662F\u6700\u8FD1\u6BD4\u8F83\u6D41\u884C\u7684",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\uFF0C",paraId:9,tocIndex:3},{value:"signal",paraId:9,tocIndex:3},{value:"\u673A\u5236\u53EF\u4EE5\u5C06",paraId:9,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u9650\u5B9A\u5728\u7EC4\u4EF6\u8303\u56F4",paraId:9,tocIndex:3},{value:"\uFF0C\u53EA\u6709\u4F7F\u7528\u5230\u6570\u636E\u7684\u7EC4\u4EF6\u624D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002",paraId:9,tocIndex:3},{value:"\u57FA\u4E8E",paraId:10,tocIndex:3},{value:"Signal",paraId:10,tocIndex:3},{value:",",paraId:10,tocIndex:3},{value:"\u6E32\u67D3\u9897\u7C92\u5EA6\u53EF\u4EE5\u662F\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u7247\u6BB5\u6216ReactNode",paraId:10,tocIndex:3},{value:"\uFF0C\u66F4\u52A0\u7CBE\u7EC6\uFF0C\u66F4\u52A0\u9AD8\u6548\u3002",paraId:10,tocIndex:3},{value:"\u5728\u4E0A\u4F8B\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u5F53\u72B6\u6001\u53D8\u5316\u65F6\uFF0C\u4EC5",paraId:11},{value:"$(....)",paraId:11},{value:"\u5185\u90E8\u4F1A\u91CD\u65B0\u6E32\u67D3\uFF0C\u800C\u5176\u4ED6\u90E8\u5206\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002\u518D\u4E5F\u4E0D\u9700\u8981",paraId:11},{value:"React.memo",paraId:11},{value:"\u4E86\u3002",paraId:11},{value:"\u5173\u4E8E",paraId:11},{value:"Signal",paraId:11},{value:"\u7684\u66F4\u591A\u7528\u6CD5\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:11},{value:"\u4FE1\u53F7\u7EC4\u4EF6",paraId:12},{value:"\u672C\u6587\u6863\u6F14\u793A\u4E2D\u4F7F\u7528\u7684\u8272\u5757\u7EC4\u4EF6",paraId:13},{value:"ColorBlock",paraId:13},{value:"\u5728\u6700\u53F3\u4FA7\u4F1A\u663E\u793A\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570\uFF0C\u6BCF\u6E32\u67D3\u4E00\u6B21+1\uFF0C\u65B9\u4FBF\u89C2\u5BDF\u7EC4\u4EF6\u7684\u6E32\u67D3\u66F4\u65B0\u60C5\u51B5\u3002",paraId:13}]},60726:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(61786);const d=[{value:"\u5F53\u521B\u5EFA\u597D",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u5B9E\u4F8B\u540E\u5C31\u53EF\u4EE5\u5B58\u53D6\u72B6\u6001\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528",paraId:1,tocIndex:0},{value:"useState",paraId:1,tocIndex:0},{value:"\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:2,tocIndex:0},{value:"Store",paraId:2,tocIndex:0},{value:"\u7684\u72B6\u6001\u6570\u636E\uFF0C\u66F4\u65B0\u65F6\u4F1A\u5BFC\u81F4\u91CD\u65B0\u6E32\u67D3\u3002",paraId:2,tocIndex:0},{value:"\u76F4\u63A5\u8BFB\u5199",paraId:3,tocIndex:0},{value:"store.state",paraId:3,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61",paraId:4,tocIndex:0},{value:"reactive",paraId:4,tocIndex:0},{value:"\uFF0C\u5176\u5B9E\u8D28\u662F\u901A\u8FC7",paraId:4,tocIndex:0},{value:"Proxy",paraId:4,tocIndex:0},{value:"\u5B9E\u73B0\u7684\uFF0C\u5F53\u8BFB\u5199",paraId:4,tocIndex:0},{value:"store.state",paraId:4,tocIndex:0},{value:"\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u76F8\u5173\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\uFF0C\u914D\u5408",paraId:4,tocIndex:0},{value:"signal",paraId:4,tocIndex:0},{value:"\u673A\u5236\u53EF\u4EE5\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u7EC6\u7C92\u5EA6\u91CD\u65B0\u6E32\u67D3\u3002",paraId:4,tocIndex:0},{value:"Store",paraId:5,tocIndex:1},{value:"\u5BF9\u8C61\u63D0\u4F9B\u4E86",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\uFF0C\u7528\u6765\u5728\u7EC4\u4EF6\u4E2D\u8BBF\u95EE\u548C\u66F4\u65B0",paraId:5,tocIndex:1},{value:"Store",paraId:5,tocIndex:1},{value:"\u7684\u72B6\u6001\u6570\u636E\u3002\u5176\u4F7F\u7528\u65B9\u5F0F\u4E0E",paraId:5,tocIndex:1},{value:"React",paraId:5,tocIndex:1},{value:"\u7684",paraId:5,tocIndex:1},{value:"useState",paraId:5,tocIndex:1},{value:"\u65B9\u6CD5\u7C7B\u4F3C\u3002",paraId:5,tocIndex:1},{value:"\u5F53\u66F4\u65B0",paraId:6},{value:"Age",paraId:6},{value:"\u65F6\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u5176\u884C\u4E3A\u4E0E",paraId:6},{value:"React",paraId:6},{value:"\u7684",paraId:6},{value:"useState",paraId:6},{value:"\u7C7B\u4F3C\u3002",paraId:6},{value:"useState",paraId:7},{value:"\u8FD8\u53EF\u4EE5\u63A5\u53D7",paraId:7},{value:"getter",paraId:7},{value:" \u548C",paraId:7},{value:"setter",paraId:7},{value:"\u4E24\u4E2A\u51FD\u6570\u53C2\u6570\uFF0C\u7528\u6765\u83B7\u53D6\u548C\u8BBE\u7F6E",paraId:7},{value:"State",paraId:7},{value:"\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u3002",paraId:7},{value:"\u9664\u4E86\u4F7F\u7528",paraId:8,tocIndex:2},{value:"useState",paraId:8,tocIndex:2},{value:"\u65B9\u6CD5\u8BFB\u5199\u72B6\u6001\u5916\uFF0C",paraId:8,tocIndex:2},{value:"sotre.state",paraId:8,tocIndex:2},{value:"\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F",paraId:8,tocIndex:2},{value:"Proxy",paraId:8,tocIndex:2},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BFB\u5199\u4E5F\u4F1A\u89E6\u53D1\u5185\u90E8\u7684\u4F9D\u8D56\u6536\u96C6\u548C\u4E8B\u4EF6\u54CD\u5E94\u3002",paraId:8,tocIndex:2},{value:"\u6B64\u4F8B\u4E2D\u66F4\u65B0",paraId:9},{value:"Age",paraId:9},{value:"\u65F6\u5E76\u4E0D\u4F1A\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u7EC4\u4EF6,\u800C\u53EA\u4F1A\u6E32\u67D3",paraId:9},{value:"$('age')",paraId:9},{value:`\uFF0C\u8FD9\u5C31\u662F\u4FE1\u53F7\u7EC4\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u53EF\u4EE5\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\u6E32\u67D3\u3002
`,paraId:9},{value:"$('age')",paraId:9},{value:"\u672C\u8D28\u4E0A\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u7ECF\u8FC7",paraId:9},{value:"React.memo",paraId:9},{value:"\u5305\u88C5\u7684",paraId:9},{value:"ReactNode",paraId:9},{value:"\u3002",paraId:9},{value:"\u66F4\u65B0",paraId:10,tocIndex:4},{value:"Store",paraId:10,tocIndex:4},{value:"\u7684\u72B6\u6001\u53EF\u4EE5\u4E0D\u9700\u8981\u4F7F\u7528",paraId:10,tocIndex:4},{value:"useState",paraId:10,tocIndex:4},{value:"\u8FD4\u56DE\u7684",paraId:10,tocIndex:4},{value:"setXXXXX",paraId:10,tocIndex:4},{value:",\u76F4\u63A5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"state.xxxx=xxx",paraId:10,tocIndex:4},{value:"\u5373\u53EF\u66F4\u65B0\u72B6\u6001\u89E6\u53D1\u54CD\u5E94\u3002",paraId:10,tocIndex:4},{value:"\u5982\u679C\u8981\u63D0\u4F9B\u7EC6\u7C92\u5EA6\u7684\u66F4\u65B0\uFF0C\u53EF\u4EE5\u4F7F\u7528",paraId:10,tocIndex:4},{value:"signal",paraId:10,tocIndex:4},{value:"\u673A\u5236\uFF0C\u901A\u8FC7",paraId:10,tocIndex:4},{value:"$",paraId:10,tocIndex:4},{value:"\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u4FE1\u53F7\u7EC4\u4EF6\uFF0C\u7528\u6765\u89E6\u53D1\u5C40\u90E8\u66F4\u65B0\u3002",paraId:10,tocIndex:4}]},37445:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(34450);const d=[{value:"\u4F7F\u7528",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u8D77\u624B\u5F0F\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\uFF0C",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u662F",paraId:0},{value:"AutoStore",paraId:0},{value:"\u7684\u6838\u5FC3\u5BF9\u8C61\uFF0C\u6240\u6709\u7684\u529F\u80FD\u90FD\u662F\u57FA\u4E8E",paraId:0},{value:"Store",paraId:0},{value:"\u5BF9\u8C61\u6765\u5B9E\u73B0\u7684\u3002",paraId:0},{value:"createStore",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u6765\u521B\u5EFA",paraId:1,tocIndex:0},{value:"AutoStore",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:1,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D",paraId:2,tocIndex:0},{value:"createStore",paraId:3,tocIndex:0},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:0},{value:`function createStore<State extends Dict>(
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
`,paraId:14,tocIndex:2}]},98041:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(22273);const d=[{value:"\u6839\u636E",paraId:0,tocIndex:0},{value:"AutoStore",paraId:0,tocIndex:0},{value:"\u7684",paraId:0,tocIndex:0},{value:"\u57FA\u672C\u539F\u7406",paraId:1,tocIndex:0},{value:"\uFF0C\u5176\u5185\u7F6E\u4E86\u4E00\u4E2A\u72B6\u6001\u53D8\u5316\u4E8B\u4EF6\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:`\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u72B6\u6001\u6570\u636E\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002
\u901A\u8FC7\u4FA6\u542C\u4E8B\u4EF6\u5C31\u53EF\u4EE5\u4F7F\u7528`,paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u7528\u6765\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u6570\u636E\u7684\u53D8\u5316,\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"\u63D0\u4F9B\u4E09\u79CD\u4F7F\u7528",paraId:2,tocIndex:0},{value:"watch",paraId:2,tocIndex:0},{value:"\u7684\u65B9\u5F0F\uFF1A",paraId:2,tocIndex:0},{value:"\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:3,tocIndex:0},{value:"\u76F4\u63A5\u5728",paraId:3,tocIndex:0},{value:"State",paraId:3,tocIndex:0},{value:"\u4E2D\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570,\u7136\u540E\u5C06\u4FA6\u542C\u5668\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E",paraId:3,tocIndex:0},{value:"watch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\u6240\u5728\u7684\u4F4D\u7F6E\u3002",paraId:3,tocIndex:0},{value:"\u5728\u7EC4\u4EF6\u4E2D\u8C03\u7528",paraId:3,tocIndex:0},{value:"store.useWatch",paraId:3,tocIndex:0},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u4FA6\u542C",paraId:3,tocIndex:0},{value:"store",paraId:3,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\u3002",paraId:3,tocIndex:0}]},32982:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(66663);const d=[{value:"useWatch",paraId:0,tocIndex:0},{value:"\u51FD\u6570\u7528\u6765\u4FA6\u542C",paraId:0,tocIndex:0},{value:"store",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u7684\u53D8\u5316,\u5F53\u7EC4\u4EF6\u9500\u6BC1\u81EA\u52A8\u53D6\u6D88\u8BA2\u9605\uFF0C\u672C\u8D28\u4E0A\u662F\u5BF9",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u7684\u5C01\u88C5\u3002",paraId:0,tocIndex:0},{value:"useWatch",paraId:1,tocIndex:0},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:0},{value:`export interface UseWatchType {
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
`,paraId:5,tocIndex:0}]},65365:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(26826);const d=[{value:"\u5982\u540C",paraId:0,tocIndex:0},{value:"ComputedObject",paraId:0,tocIndex:0},{value:"\u4E00\u6837\uFF0C\u6240\u6709\u5728\u72B6\u6001\u4E2D\u76F4\u63A5\u4F7F\u7528",paraId:0,tocIndex:0},{value:"watch",paraId:0,tocIndex:0},{value:"\u58F0\u660E\u7684\u5747\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u5E94",paraId:0,tocIndex:0},{value:"WatchObject",paraId:0,tocIndex:0},{value:"\u5BF9\u8C61\u3002",paraId:0,tocIndex:0},{value:"\u901A\u8FC7",paraId:1,tocIndex:0},{value:"Store.watchObjects",paraId:1,tocIndex:0},{value:"\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u58F0\u660E\u7684",paraId:1,tocIndex:0},{value:"WatchObject",paraId:1,tocIndex:0},{value:"\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8FDB\u884C\u76F8\u5173\u7684\u52A8\u6001\u79FB\u9664/\u7981\u7528\u7B49\u64CD\u4F5C\u3002",paraId:1,tocIndex:0},{value:"\u4EE5\u4E0B\u662F\u5B9E\u73B0\u8868\u5355\u6570\u636E\u7684\u810F\u68C0\u5BDF\u7684\u7B80\u5355\u793A\u4F8B\uFF1A",paraId:2,tocIndex:0},{value:"\u540C",paraId:3,tocIndex:2},{value:"computed",paraId:3,tocIndex:2},{value:"\u4E00\u6837\uFF0C\u4E0D\u5728\u72B6\u6001\u4E2D\u58F0\u660E",paraId:3,tocIndex:2},{value:"watch",paraId:3,tocIndex:2},{value:"\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:3,tocIndex:2},{value:"store.watchObjects.create",paraId:3,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61",paraId:3,tocIndex:2},{value:"create",paraId:4,tocIndex:2},{value:"\u65B9\u6CD5\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:4,tocIndex:2},{value:`  create<Value=any,DependValue=any>(
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

`,paraId:7,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u65F6\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u76D1\u542C\u5BF9\u8C61\u76F8\u6BD4\uFF0C\u5B58\u5728\u4EE5\u4E0B\u533A\u522B",paraId:8,tocIndex:2},{value:"\uFF1A",paraId:8,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u4E0D\u5B58\u5728\u72B6\u6001\u4E0A\u4E0B\u6587\uFF0C\u6307\u4F9D\u8D56\u65F6\u4E0D\u4F7F\u7528\u76F8\u5BF9\u4F9D\u8D56\uFF0C\u53EA\u80FD\u4F7F\u7528\u7EDD\u5BF9\u4F9D\u8D56\uFF0C\u5373",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"./",paraId:9,tocIndex:2},{value:"\u3001",paraId:9,tocIndex:2},{value:"PARENT",paraId:9,tocIndex:2},{value:"\u7B49\u4F9D\u8D56\u662F\u65E0\u6548\u7684\u3002",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684",paraId:9,tocIndex:2},{value:"associated=false",paraId:9,tocIndex:2},{value:"\u52A8\u6001\u521B\u5EFA\u76D1\u542C\u5BF9\u8C61\u7684\u529F\u80FD\u4E0E\u5728\u72B6\u6001\u4E2D\u58F0\u660E\u521B\u5EFA\u7684\u529F\u80FD\u57FA\u672C\u76F8\u540C\uFF0C\u4F46\u8BA1\u7B97\u7ED3\u679C\u6CA1\u6709\u5B58\u50A8\u5728\u72B6\u6001\u4E2D\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u76D1\u542C\u5BF9\u8C61\u4E2D\u3002\u53EF\u4EE5\u901A\u8FC7",paraId:9,tocIndex:2},{value:"obj.value",paraId:9,tocIndex:2},{value:"\u6765\u83B7\u53D6\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:9,tocIndex:2},{value:"\u540C",paraId:10,tocIndex:3},{value:"ComputedObject",paraId:10,tocIndex:3},{value:"\u4E00\u6837\uFF0C",paraId:10,tocIndex:3},{value:"WatchObject",paraId:10,tocIndex:3},{value:"\u4E5F\u53EF\u4EE5\u624B\u52A8\u6267\u884C\uFF0C\u901A\u8FC7",paraId:10,tocIndex:3},{value:'store.watchObjects.get("<id>").run()',paraId:10,tocIndex:3},{value:"\u6765\u6267\u884C\u76D1\u542C\u51FD\u6570\u3002",paraId:10,tocIndex:3}]},89167:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(37686);const d=[{value:"@autostorejs/react",paraId:0,tocIndex:1},{value:"\u63D0\u4F9B\u4E86",paraId:0,tocIndex:1},{value:"watch",paraId:0,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u5728",paraId:0,tocIndex:1},{value:"state",paraId:0,tocIndex:1},{value:"\u4E2D\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5BF9\u8C61,\u7136\u540E\u76D1\u542C\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5199\u5165\u58F0\u660E\u6240\u5728\u8DEF\u5F84\u3002",paraId:0,tocIndex:1},{value:"watch",paraId:1,tocIndex:1},{value:"\u51FD\u6570\u7684\u57FA\u672C\u7279\u6027\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:"\u5728\u72B6\u6001\u4E2D\u7684\u4EFB\u610F\u4F4D\u7F6E\uFF0C\u4F7F\u7528",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u6765\u58F0\u660E\u4E00\u4E2A\u76D1\u542C\u5668\u5BF9\u8C61\u3002",paraId:2,tocIndex:1},{value:"\u5728",paraId:2,tocIndex:1},{value:"createStore",paraId:2,tocIndex:1},{value:"\u6267\u884C\u540E\uFF0C\u4F1A\u626B\u63CF\u72B6\u6001\u6570\u636E\uFF0C\u5982\u679C\u53D1\u73B0\u4E00\u4E2A\u503C\u662F",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:",\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\uFF0C\u7528\u6765\u76D1\u542C",paraId:2,tocIndex:1},{value:"State",paraId:2,tocIndex:1},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\u3002",paraId:2,tocIndex:1},{value:"\u521B\u5EFA\u7684",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4F1A\u4FDD\u5B58\u5728",paraId:2,tocIndex:1},{value:"Store",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"watchObjects",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u4E2D",paraId:2,tocIndex:1},{value:"\u5F53\u6240\u76D1\u542C\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u8C03\u7528",paraId:2,tocIndex:1},{value:"WatchObject",paraId:2,tocIndex:1},{value:"\u5BF9\u8C61\u7684",paraId:2,tocIndex:1},{value:"getter",paraId:2,tocIndex:1},{value:"\u51FD\u6570\uFF0C\u7136\u540E\u5C06\u8FD4\u56DE\u7ED3\u679C\u5199\u5165\u5230\u58F0\u660E",paraId:2,tocIndex:1},{value:"watch(...)",paraId:2,tocIndex:1},{value:"\u7684\u4F4D\u7F6E\u3002",paraId:2,tocIndex:1},{value:"watch",paraId:3,tocIndex:2},{value:"\u51FD\u6570\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:3,tocIndex:2},{value:`// \u76D1\u542Cfilter\u8FC7\u6EE4\u540E\u7684
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
`,paraId:18,tocIndex:5},{value:"\u8BF4\u660E\uFF1A",paraId:19,tocIndex:5},{value:"\u4E0A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5B9E\u73B0\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u6765\u8868\u5355\u6574\u4E2A\u8868\u5355\u7684\u6709\u6548\uFF0C\u5F53\u72B6\u6001\u4E2D\u4EFB\u610F\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u7684",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u90FD\u4E3A",paraId:20,tocIndex:5},{value:"false",paraId:20,tocIndex:5},{value:"\u65F6\uFF0C\u5219",paraId:20,tocIndex:5},{value:"validate=false",paraId:20,tocIndex:5},{value:"\uFF0C\u5426\u5219\u4E3A",paraId:20,tocIndex:5},{value:"true",paraId:20,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5},{value:"\u73B0\u5728\u95EE\u9898\u662F",paraId:20,tocIndex:5},{value:"validate",paraId:20,tocIndex:5},{value:"\u53EF\u80FD\u662F\u5728\u4E00\u4E2A\u590D\u6742\u7684\u5D4C\u5957\u5BF9\u8C61\u4E2D\uFF0C\u5E76\u4E14\u53EF\u80FD\u662F\u52A8\u6001\u7684\u3002\u8FD9\u65F6\u5019\uFF0C\u6211\u4EEC\u65E0\u6CD5\u4F7F\u7528",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u6765\u8FDB\u884C\u8BA1\u7B97\uFF0C\u56E0\u4E3A",paraId:20,tocIndex:5},{value:"computed",paraId:20,tocIndex:5},{value:"\u7684\u4F9D\u8D56\u662F\u9759\u6001\u7684\u3002",paraId:20,tocIndex:5},{value:"\u6B64\u65F6\u5C31\u662F\u4F7F\u7528",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\u7684\u65F6\u5019\u4E86\uFF0C\u6211\u4EEC\u58F0\u660E\u4E00\u4E2A",paraId:20,tocIndex:5},{value:"watch",paraId:20,tocIndex:5},{value:"\u51FD\u6570\uFF0C\u7528\u6765\u76D1\u542C\u6240\u6709\u8DEF\u5F84\u4E2D\u7684",paraId:20,tocIndex:5},{value:"path[path.length-1]=='validate'",paraId:20,tocIndex:5},{value:"\u5B57\u6BB5\u7684\u53D8\u5316\u5373\u53EF\u3002",paraId:20,tocIndex:5},{value:"\u5173\u4E8E",paraId:20,tocIndex:5},{value:"WatchObject",paraId:20,tocIndex:5},{value:"\u7684\u4ECB\u7ECD\uFF0C\u53EF\u4EE5\u53C2\u8003",paraId:20,tocIndex:5},{value:"\u76D1\u542C\u5BF9\u8C61",paraId:21,tocIndex:5},{value:"\u3002",paraId:20,tocIndex:5}]},23989:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(73549);const d=[{value:"\u4F7F\u7528",paraId:0,tocIndex:0},{value:"store.watch",paraId:0,tocIndex:0},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:0,tocIndex:0},{value:"State",paraId:0,tocIndex:0},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u5F53\u6240\u76D1\u89C6\u7684\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u53EF\u4EE5\u6267\u884C\u4FA6\u542C\u5668\u51FD\u6570\u3002",paraId:0,tocIndex:0},{value:"watch",paraId:1,tocIndex:1},{value:"\u65B9\u6CD5\u7684\u7B7E\u540D\u5982\u4E0B\uFF1A",paraId:1,tocIndex:1},{value:`// \u76D1\u542C\u5168\u90E8
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
`,paraId:26,tocIndex:9},{value:"store.watch",paraId:27},{value:"\u65B9\u6CD5\u7528\u4E8E\u5168\u5C40\u76D1\u89C6",paraId:27},{value:"State",paraId:27},{value:"\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u8BA1\u7B97\u5C5E\u6027\u7684\u5B9E\u73B0\u4E5F\u662F\u57FA\u4E8E",paraId:27},{value:"watch",paraId:27},{value:"\u65B9\u6CD5\u3002",paraId:27}]},36109:function(te,y,e){e.r(y),e.d(y,{texts:function(){return d}});var G=e(43112);const d=[]}}]);
