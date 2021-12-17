(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{21:function(e,n,t){},39:function(e,n,t){},40:function(e,n,t){},42:function(e,n,t){},43:function(e,n,t){},54:function(e,n,t){},55:function(e,n,t){"use strict";t.r(n);var i=t(5),r=t.n(i),c=t(18),o=t.n(c),a=(t(39),t(40),t(0)),s=t(6),d=t(31),l=function e(n,t){var i=this;Object(a.a)(this,e),this.setup=function(){console.log("set up with DOM elem ",i.htmlElem),i.scene=new s.l,i.scene.background=new s.c(11987706),i.camera=new s.j(75,i.windowInfo.width/i.windowInfo.height,1,1e3),i.camera.position.set(5,5,10),i.camera.lookAt(i.scene.position),i.tanFOV=Math.tan(Math.PI/180*i.camera.fov/2),i.renderer=new s.s({antialias:!0}),i.renderer.setSize(i.windowInfo.width,i.windowInfo.height),i.renderer.shadowMap.enabled=!0,i.htmlElem.appendChild(i.renderer.domElement),i.controls=new d.a(i.camera,i.renderer.domElement),i.controls.update()},this.createGridHelper=function(){i.gridHelper=new s.e(10,10),i.scene.add(i.gridHelper),console.log("created grid helper",i.gridHelper)},this.createCube=function(){var e=new s.b(2,2,2),n=new s.i({color:new s.c("Orange"),wireframe:!0});i.cube=new s.g(e,n),i.scene.add(i.cube),console.log("created cube",i.cube)},this.createLights=function(){i.ambientLight=new s.a(4210752),i.scene.add(i.ambientLight)},this.createSphere=function(){var e=(new s.p).load("assets/texture/ir1.jpg",(function(e){console.log("loaded",e)}),null,(function(e){console.log("load error",e)}));console.log(e);var n=new s.h({map:e}),t=new s.m(2,32,32);i.sphere=new s.g(t,n),i.scene.add(i.sphere)},this.createObjs=function(){i.createLights(),i.createSphere()},this.renderScene=function(){i.renderer.render(i.scene,i.camera)},this.handleResize=function(e,n){i.camera.aspect=e/n,i.camera.updateProjectionMatrix(),i.renderer.setSize(e,n)},this.update=function(){i.sphere.rotation.x+=.01,i.sphere.rotation.z+=.01,i.controls.update(),i.rafId=requestAnimationFrame(i.update),i.renderScene()},this.render=function(e){i.isRendering!==e&&(i.isRendering=e,e?i.update():cancelAnimationFrame(i.rafId))},this.htmlElem=n,this.windowInfo=t,this.rafId=0,this.isRendering=!1},u=t(16),h=t(8),j=t(58),p=t(59),b=t(34),m=t(4),f=function(e,n,t,i){var r=b.a.timeline({paused:!0});return r.set(e,{opacity:t}),r.to(e,{opacity:i,duration:1.5,ease:m.b.easeInOut,delay:n}),r.then((function(){console.log("Finished page transition animation")})),r},g=(t(21),t(42),t(43),t(7));var O=function(){return Object(g.jsx)("div",{className:"root",children:Object(g.jsxs)("div",{className:"landing__container",children:[Object(g.jsx)("h1",{className:"title__text",children:" Title "}),Object(g.jsxs)("p",{className:"landing__blurb",children:[" ",'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.']}),Object(g.jsx)(u.b,{to:"/intro",children:Object(g.jsx)("button",{children:" Begin Your Journey "})})]})})},w=t(22),x=t.n(w),v=function(){var e=Object(w.useSpeechRecognition)(),n=e.transcript,t=e.listening,i=e.resetTranscript;return e.browserSupportsSpeechRecognition?Object(g.jsxs)("div",{children:[Object(g.jsxs)("p",{children:["Microphone: ",t?"on":"off"]}),Object(g.jsx)("button",{onClick:x.a.startListening,children:"Start"}),Object(g.jsx)("button",{onClick:x.a.stopListening,children:"Stop"}),Object(g.jsx)("button",{onClick:i,children:"Reset"}),Object(g.jsx)("p",{children:n})]}):Object(g.jsx)("span",{children:"Browser doesn't support speech recognition."})};var I=function(){return Object(g.jsxs)("div",{className:"root",children:[Object(g.jsx)("p",{children:" Visualization page UI"}),Object(g.jsx)(v,{})]})};var S=function(){return Object(g.jsx)("div",{className:"root",children:Object(g.jsx)("p",{children:" Count page UI"})})};t(54);var z=function(){return Object(g.jsx)("div",{className:"root",children:Object(g.jsxs)("div",{className:"intro__container",children:[Object(g.jsx)("p",{children:" Intro page UI"}),Object(g.jsxs)("div",{className:"buttons",children:[Object(g.jsxs)("button",{children:[" ",Object(g.jsx)(u.b,{to:"/visualization",children:" Visualization "})," "]}),Object(g.jsxs)("button",{children:[" ",Object(g.jsx)(u.b,{to:"/counting-technique",children:" 5-4-3-2-1 "})," "]})]})]})})};var E=function(){var e=Object(i.useRef)(null),n=Object(i.useRef)(null);return Object(i.useEffect)((function(){if(null!==e.current)return console.log("Initializing GL with: ",e.current),n.current=new l(e.current,{width:window.innerWidth,height:window.innerHeight}),n.current.setup(),n.current.createObjs(),n.current.render(!0),window.addEventListener("resize",t,!1),function(){n.current.render(!1),window.removeEventListener("resize",t,!1)};function t(){n.current.handleResize(window.innerWidth,window.innerHeight)}}),[]),Object(i.useEffect)((function(){})),Object(g.jsxs)("div",{className:"App",children:[Object(g.jsx)("div",{id:"webgl",ref:e}),Object(g.jsx)(u.a,{children:Object(g.jsx)(h.a,{render:function(e){var n=e.location,t=(n.pathname,n.key);return Object(g.jsx)(j.a,{component:null,children:Object(g.jsx)(p.a,{native:!0,appear:!0,onEnter:function(e){return function(e,n){f(n,1,0,1).play()}(0,e)},onExiting:function(e){return function(e,n){f(n,0,1,0).play()}(0,e)},timeout:{enter:250,exit:250},children:Object(g.jsxs)(h.c,{location:n,children:[Object(g.jsx)(h.a,{exact:!0,path:"/CDT-project-01",component:O}),Object(g.jsx)(h.a,{path:"/intro",component:z}),Object(g.jsx)(h.a,{path:"/visualization",component:I}),Object(g.jsx)(h.a,{path:"/counting-technique",component:S})]})},t)})}})})]})},L=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,60)).then((function(n){var t=n.getCLS,i=n.getFID,r=n.getFCP,c=n.getLCP,o=n.getTTFB;t(e),i(e),r(e),c(e),o(e)}))};o.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(E,{})}),document.getElementById("root")),L()}},[[55,1,2]]]);
//# sourceMappingURL=main.f10ee43d.chunk.js.map