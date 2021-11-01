(this.webpackJsonpnova=this.webpackJsonpnova||[]).push([[0],{40:function(e,n,t){},43:function(e,n,t){},67:function(e,n,t){},68:function(e,n,t){},75:function(e,n,t){},76:function(e,n,t){},77:function(e,n,t){},83:function(e,n,t){},84:function(e,n,t){},85:function(e,n,t){},86:function(e,n,t){"use strict";t.r(n);var i=t(6),a=t(23),o=t.n(a),s=(t(67),t(43),t(40),t(68),t(20)),r=t(24),c=function(e,n,t){return{type:"VUI_STATE_CHANGE",payload:{stateStr:e,visState:n,playSound:t}}},u=t(25),l=t(9);var d=function(){var e=Object(i.useRef)(),n=Object(i.useRef)(),t=Object(i.useRef)(),a=Object(i.useRef)(),o=[e,n,t];return Object(i.useEffect)((function(){var e=u.a.timeline({delay:.5}),n="power3.out";o.forEach((function(t,i){e.to(t.current,{opacity:1,duration:2,ease:n},1.2*i)})),e.to(a.current,{opacity:1,"margin-top":0,skewY:"-10deg",duration:3,ease:n},1)}),[]),Object(l.jsx)("div",{className:"root",children:Object(l.jsx)("div",{className:"landing__container",children:Object(l.jsxs)("div",{className:"content__container",ref:a,children:[Object(l.jsxs)("h1",{className:"title__text",ref:e,children:[" ","Nova"," "]}),Object(l.jsx)("h4",{className:"landing__blurb",ref:n,children:"Meet Nova, a voice user-interface designed to help users navigate their anxiety through guided, interactive mindfulness exercises."}),Object(l.jsxs)(s.b,{to:"/nova",children:[" ",Object(l.jsx)("button",{id:"enter__btn",children:"Let's Begin "})]})]})})})},h=t(21),v=(t(75),t(76),t(77),t(0)),p=t(5),m=t(34),f=t(48),g=t(53),_=t(49),x=t(32),b=t(50),y=t(51),j=2.5,O=.025,w=-20,I=7,S=t(1);function z(){var e=S.z.timeline({repeat:-1}),n=this.mesh.position.y,t=this.mesh.position.y+.75;this.mesh.position.y;S.z.to(this.uniforms.u_ripple_layers,{value:6,duration:3,ease:S.c.easeInOut}),e.to(this.mesh.position,{y:t,duration:2,ease:S.c.easeInOut}),e.to(this.mesh.position,{y:n,duration:2,ease:S.c.easeInOut}),e.to(this.mesh.position,{y:t,duration:2,ease:S.c.easeInOut}),e.to(this.mesh.position,{y:n,duration:2,ease:S.c.easeInOut})}function k(){var e=S.z.timeline();S.z.killTweensOf(this.mesh.position),e.to(this.uniforms.u_ripple_layers,{value:5,duration:2,ease:S.c.easeInOut})}function E(){this.isAnimatingSound=!0;var e=S.z.timeline();e.to(this.mesh.scale,{x:this.inVis?.5:1.2,y:this.inVis?.5:1.2,duration:2,ease:S.c.easeInOut},.5),e.to(this.uniforms.u_ripple_size,{value:3,duration:5,ease:S.b.easeInOut},0),e.to(this.uniforms.u_ripple_intensity,{value:6,duration:1,ease:S.b.easeInOut},0),e.to(this.uniforms.u_rIncre,{value:.2,duration:1,ease:S.c.easeInOut},0)}function N(){var e=this;this.inVis?(C(e),setTimeout((function(){e.thinkingOn()}),4e3)):C(this)}function C(e){var n=S.z.timeline();n.to(e.uniforms.u_rIncre,{value:0,duration:1,ease:S.c.easeInOut},0),n.to(e.mesh.scale,{x:e.inVis?.4:1,y:e.inVis?.4:1,duration:2,ease:S.d.easeInOut},0),n.to(e.uniforms.u_ripple_size,{value:j,duration:5,ease:S.b.easeInOut},0)}function T(e){this.isAnimating=!0;var n=this,t=S.z.timeline({onComplete:function(){n.isAnimating=!1,n.inVis=!0,e()}});t.to(this.mesh.scale,{x:.4,y:.4,duration:2,ease:S.c.easeInOut},0),t.to(this.mesh.position,{y:-15.5,duration:2,ease:S.c.easeInOut}),t.to(this.sceneOutlinePass,{edgeStrength:.7,duration:1,ease:S.c.easeInOut})}function A(){var e=S.z.timeline();e.to(this.mesh.scale,{x:2,y:2,duration:2,ease:S.c.easeInOut},0),e.to(this.mesh.position,{y:8,duration:3,ease:S.c.easeInOut},0)}function L(){var e=S.z.timeline();e.to(this.uniforms.u_bIncre,{value:.1,duration:1,ease:S.c.easeInOut},0),e.to(this.uniforms.u_rIncre,{value:.1,duration:1,ease:S.c.easeInOut},0),e.to(this.uniforms.u_opaque,{value:.8,duration:2,ease:S.c.easeInOut},0),e.to(this.mesh.rotation,{z:2*Math.PI,duration:2,ease:S.b.easeInOut},0),e.to(this.uniforms.u_opaque,{value:O,duration:2,ease:S.c.easeInOut},2),e.to(this.uniforms.u_bIncre,{value:0,duration:.5,ease:S.c.easeInOut},2),e.to(this.uniforms.u_rIncre,{value:0,duration:.5,ease:S.c.easeInOut},2)}function R(){var e=S.z.timeline();S.z.killTweensOf(this.mesh.rotation),e.to(this.mesh.rotation,{duration:3,ease:S.b.easeInOut}),e.to(this.uniforms.u_opaque,{value:O,duration:1,ease:S.c.easeInOut}),e.to(this.uniforms.u_bIncre,{value:0,duration:.5,ease:S.c.easeInOut}),e.to(this.uniforms.u_rIncre,{value:0,duration:.5,ease:S.c.easeInOut})}function D(){var e=S.z.timeline();e.to(this.mesh.rotation,{z:2*Math.PI,duration:2,ease:S.c.easeInOut},0),e.to(this.uniforms.u_rIncre,{value:.8,duration:1.5,ease:S.c.easeInOut},0),e.to(this.uniforms.u_gIncre,{value:-.07,duration:1.5,ease:S.c.easeInOut},0),e.to(this.uniforms.u_ripple_layers,{value:5.5,duration:2,ease:S.c.easeInOut},0),e.to(this.uniforms.u_opaque,{value:5,duration:2,ease:S.c.easeInOut},0),e.to(this.uniforms.u_ripple_size,{value:1.2,duration:2},0),e.to(this.uniforms.u_rIncre,{value:0,duration:1.5,ease:S.c.easeInOut,delay:5}),e.to(this.uniforms.u_gIncre,{value:0,duration:1.5,ease:S.c.easeInOut},"end"),e.to(this.uniforms.u_ripple_layers,{value:5,duration:2,ease:S.c.easeInOut},"end"),e.to(this.uniforms.u_opaque,{value:O,duration:2,ease:S.c.easeInOut},"end"),e.to(this.uniforms.u_ripple_size,{value:j,duration:2},"end")}function P(){console.log(this);var e=S.z.timeline({});e.to(this.uniforms.u_alpha,{value:1,duration:3,ease:S.c.easeInOut},0),e.to(this.sceneOutlinePass,{edgeStrength:1,duration:3,ease:S.c.easeInOut},1)}function V(){var e=S.z.timeline();e.to(this.mesh.scale,{x:0,y:0,z:0,duration:3,ease:S.c.easeInOut},0),e.to(this.uniforms.u_alpha,{value:0,duration:3,ease:S.c.easeInOut},0),e.to(this.sceneOutlinePass,{edgeStrength:0,duration:3,ease:S.c.easeInOut},1)}var F=function(e,n,t){e[t]=n.bind(e)},U=function e(n){var t=this;Object(v.a)(this,e),this.init=function(){var e=(new p.I).load("assets/texture/static_grain.png");t.uniforms={u_tex:{value:e},u_duration:{value:5},u_time:{value:0},u_ripple_size:{value:j},u_ripple_layers:{value:5},u_rIncre:{value:0},u_bIncre:{value:0},u_gIncre:{value:0},u_opaque:{value:O},u_alpha:{value:0},u_delt:{value:1}};var n=new p.F({uniforms:t.uniforms,vertexShader:"\n#define PI 3.141592653589\n\nfloat random (vec2 st) {\n  return fract(sin(dot(st.xy, vec2(5.9898,78.233)))* 43758.5453123);\n}\n\nvarying vec2 v_uv;\nvarying vec3 v_position;\nvarying vec3 v_normal;\nuniform float u_time;\n\nvoid main() {\t\n  v_uv = uv;\n  v_position = position;\n  v_normal = normal;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( v_position, 1.0 );\n}\n",fragmentShader:"\n#define PI 3.141592653589\n\nfloat random (vec2 st) {\n  return fract(sin(dot(st.xy, vec2(5.9898,78.233)))* 43758.5453123);\n}\n\nuniform sampler2D u_tex;\nuniform float u_duration;\nuniform float u_time;\nuniform float u_ripple_size;\nuniform float u_ripple_layers;\nuniform float u_rIncre;\nuniform float u_bIncre;\nuniform float u_gIncre;\nuniform float u_opaque;\nuniform float u_alpha;\nuniform float u_delt;\nvarying vec2 v_uv;\nvarying vec3 v_position;\nvarying vec3 v_normal;\n\nvoid main (void)\n{\n  float contrast = 1.0;\n  vec2 p = v_position.xy;\n  float len = length(p) / 1.5;\n  vec2 ripple = v_uv + p/len*u_opaque*cos(len*u_ripple_layers-u_time * u_ripple_size);\n  float delta = u_delt * (sin(mod(u_time, u_duration) * (15.0 * PI/u_duration)))/15.0*(random(ripple)*u_bIncre);\n  vec2 uv = mix(ripple, v_uv, 0.0);\n  vec3 rippled;\n  rippled = texture2D(u_tex, uv).rgb;\n  rippled.r += u_rIncre;\n  rippled.b += u_bIncre;\n  rippled.r -= u_bIncre;\n  rippled.g += u_gIncre;\n  rippled.rgb = ((rippled.rgb - 0.5) * max(contrast, 0.0)) + 0.5;\n  gl_FragColor = vec4(rippled, u_alpha); \n}\n",transparent:!0}),i=new p.h(4.5,32);t.mesh=new p.s(i,n),t.mesh.position.set(w,I,.5);!function(e,n,t){n.length===t.length?n.forEach((function(n,i){F(e,n,t[i])})):console.log("Wrong inputs to bind new methods")}(t,[z,k,E,N,D,L,R,P,V,T,A],["speakingOn","speakingOff","listenOn","listenOff","reassuringOn","thinkingOn","thinkingOff","animateAppear","animateDisappear","activateVisualization","finishVisualization"])},this.update=function(e){void 0!==t.uniforms&&(t.uniforms.u_time.value+=e)},this.changeState=function(e){if(!t.isAnimating){console.log("Vui state has changed to: ",e);var n=t.state;if(t.state=e,n!==t.state)switch(t.state){case"appearing":t.animateAppear();break;case"listening":if("none"===n)return;t.listenOn();break;case"stop_listening":t.listenOff();break;case"speaking":t.speakingOn();break;case"stop_speaking":t.speakingOff();break;case"reassuring":t.reassuringOn();break;case"thinking":t.thinkingOn();break;case"stop_thinking":t.thinkingOff();break;case"disappearing":t.animateDisappear();break;case"activate_visualization":var i=t.speakingOn;t.activateVisualization(i);break;case"visualization":break;case"finish_visualization":t.finishVisualization();break;default:return}}},this.state="none",this.sceneOutlinePass=n,this.isAnimating=!1,this.inVis=!1},M=t(52),H=function e(n,t,i,a,o){var s=this;Object(v.a)(this,e),this.setup=function(){s.scene=new p.E,s.scene.background=new p.j(15130621),s.camera=new p.z(75,s.windowInfo.width/s.windowInfo.height,1,1e3),s.camera.position.set(0,0,30),s.camera.lookAt(s.scene.position),s.setupRenderers(),s.controls=new f.a(s.camera,s.renderer.domElement),s.controls.update(),s.clock=new p.i,s.createLights(),s.createBackground(),s.initPostprocessing(),s.vuiObj=new U(s.outlinePass),s.vuiObj.init(),s.scene.add(s.vuiObj.mesh),s.outlinePass.selectedObjects=[s.vuiObj.mesh],s.addCSSElems(),s.setupListener()},this.setupListener=function(){s.listener=new p.d,s.camera.add(s.listener),s.audioLoader=new p.e},this.playSound=function(){var e=s,n=new p.c(s.listener);n.onEnded=function(){console.log("Finished sound clip"),e.vuiObj.changeState("stop_speaking"),e.toggleSpeakingFunc(!1)};var t="assets/audio/vui/"+s.soundClip.toString()+".mp3";console.log("Load sound path",t),s.audioLoader.load(t,(function(t){console.log("Playing sound clip",e.soundClip),void 0!==e.vuiObj&&(e.vuiObj.changeState("speaking"),e.toggleSpeakingFunc(!0)),n.setBuffer(t),n.setLoop(!1),n.play(),e.soundClip++}))},this.addCSSElems=function(){s.phoneCutout=function(e,n,t,i,a){var o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];e.style.width=n+"px",e.style.height=t+"px",e.style.opacity=.999,e.style.boxSizing="border-box";var s=new p.x;s.scale.set(.1,.1,.1);var r=new m.a(e);if(s.css3dObject=r,s.add(r),o){var c=new p.v({opacity:a,color:i,blending:p.w}),u=new p.f(n,t,1),l=new p.s(u,c);l.castShadow=!0,l.receiveShadow=!0,s.lightShadowMesh=l,s.add(l)}return s}(s.cssRef,window.screen.width,window.screen.height,16777215,!0),s.phoneCutout.position.set(-5,-5,0),s.scene.add(s.phoneCutout)},this.setupRenderers=function(){s.renderer=new p.N({antialias:!0}),s.renderer.setSize(s.windowInfo.width,s.windowInfo.height),s.renderer.shadowMap.enabled=!0,s.htmlElem.appendChild(s.renderer.domElement),s.cssRenderer=new m.b,s.cssRenderer.setSize(window.innerWidth,window.innerHeight),s.cssRenderer.domElement.style.position="absolute",s.cssRenderer.domElement.style.top=0,s.cssElem.appendChild(s.cssRenderer.domElement)},this.createGridHelper=function(){s.gridHelper=new p.o(10,10),s.scene.add(s.gridHelper),console.log("created grid helper",s.gridHelper)},this.initPostprocessing=function(){s.composer=new g.a(s.renderer);var e=new _.a(s.scene,s.camera);s.composer.addPass(e);var n=new b.a(new p.K(window.innerWidth,window.innerHeight),s.scene,s.camera);n.edgeStrength=0,n.edgeGlow=10,n.edgeThickness=9,n.visibleEdgeColor=new p.j(.8,.8,.8),n.downSampleRatio=1.8;var t=new x.a(y.a);t.uniforms.resolution.value.set(1/window.innerWidth,1/window.innerHeight),t.renderToScreen=!0,s.composer.addPass(t),s.composer.addPass(n),s.outlinePass=n},this.createLights=function(){s.ambientLight=new p.b(4210752),s.scene.add(s.ambientLight);var e=new p.k(14548957,.4);e.position.z=1,e.position.y=1,e.position.x=1,s.scene.add(e)},this.createBackground=function(){for(var e,n=new p.I,t="assets/visualization/sequence/",i=".png",a=[],o=1;o<=14;o++)e=n.load(t+o.toString()+i),a.push(e);s.visTextures=a;var r=n.load(t+"intro"+i);s.visIntroTex=r,console.log("Textures",a);var c=new p.A(17,36);s.bgUniforms={u_tex1:{value:r},u_tex2:{value:r},u_resolution:{value:{x:window.innerWidth,y:window.innerHeight}},u_useTexLerp:{value:0},u_time:{value:0}};var u=new p.F({uniforms:s.bgUniforms,vertexShader:"\nvarying vec2 v_uv;\nvarying vec3 v_position;\nvarying vec3 v_normal;\nvarying float v_wave;\nuniform float u_time;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v) {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n  \n  // First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n  \n  // Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n  \n  // Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n           \n  // Gradients: 7x7 points over a square, mapped onto an octahedron.\n  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n  \n  // Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  \n  // Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\n\nvoid main() {\t\n  v_uv = uv;\n  v_position = position;\n  v_normal = normal;\n\n  vec3 pos = position;\n  float noiseFreq = 0.05;\n  float noiseAmp = 0.01; \n  vec3 noisePos = vec3(pos.x* noiseFreq + u_time , pos.y , pos.z);\n  pos.z += snoise(noisePos) * noiseAmp;\n  v_wave = pos.z;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n}\n",fragmentShader:"\nuniform sampler2D u_tex1;\nuniform sampler2D u_tex2;\nuniform vec2 u_resolution;\nuniform float u_useTexLerp;\nuniform float u_time;\nvarying vec2 v_uv;\nvarying vec3 v_position;\nvarying vec3 v_normal;\nvarying float v_wave;\n\nvoid main (void)\n{\n  float wave = v_wave * 0.25;\n  vec3 mapped1 = texture2D(u_tex1, v_uv ).rgb;\n  vec3 mapped2 = texture2D(u_tex2, v_uv ).rgb;\n  vec3 color = mix(mapped1, mapped2, u_useTexLerp);\n  gl_FragColor = vec4(color, 1); \n}\n",transparent:!0}),l=new p.s(c,u);l.position.set(-20,-1.5,0),s.scene.add(l)},this.lerpBackground=function(){if(void 0!==s.bgUniforms){var e=M.a.timeline({onComplete:function(){}});s.bgUniforms.u_useTexLerp.value=0,e.to(s.bgUniforms.u_useTexLerp,{value:1,duration:2,ease:"sine.out"})}},this.changeState=function(e,n,t){t&&s.playSound(),s.vuiObj.changeState(e),n<0||(s.bgUniforms.u_tex1.value=s.bgUniforms.u_tex2.value,s.bgUniforms.u_tex2.value=n>14?s.visIntroTex:s.visTextures[n-1],s.lerpBackground())},this.renderScene=function(){s.renderer.render(s.scene,s.camera),s.cssRenderer.render(s.scene,s.camera)},this.handleResize=function(e,n){s.camera.aspect=e/n,s.camera.updateProjectionMatrix(),s.renderer.setSize(e,n),s.cssRenderer.setSize(e,n),s.bgUniforms.u_resolution.value.x=e,s.bgUniforms.u_resolution.value.y=n},this.update=function(){s.controls.update(),s.rafId=requestAnimationFrame(s.update),void 0!==s.vuiObj&&s.vuiObj.update(s.clock.getDelta()),s.bgUniforms.u_time.value=s.clock.getElapsedTime(),s.composer.render(),s.cssRenderer.render(s.scene,s.camera)},this.render=function(e){s.isRendering!==e&&(s.isRendering=e,e?s.update():cancelAnimationFrame(s.rafId))},this.htmlElem=n,this.cssElem=t,this.cssRef=i,this.windowInfo=a,this.rafId=0,this.isRendering=!1,this.soundClip=0,this.toggleSpeakingFunc=o},W=t(37),q=t.n(W);var G=[{vui_texts:["Ok, let\u2019s go to a different place together, a more peaceful place. ","Imagine you are at a lake, the waters are calm, and the current is mild. You can feel a light breeze passing by you.","What do you hear? "]},{vui_texts:["And the weather? It is a warm day, comfortable but not hot at all, nearing sunset. From where you sit, you can see the whole landscape around you. ","What colors do you imagine?"]},{vui_texts:["Our landscape is beginning to come together. The hills have tall green grass on them. When you focus in you can see the grass moving slowly in the wind. ","Imagine you are looking up, you see some blue birds flying through the clouds above you. What else do you see?"]},{vui_texts:["Now let\u2019s take some time to relax in the personal landscape that we've created. ","Notice where your body touches the grass and your feet meet the ground. Feel the weight of your arms and hands resting. Acknowledge your senses: notice anything you can smell, hear or taste, sensations of heat or cold.","What are you feeling right now?"]},{vui_texts:["Do you want to continue the visualization? "]},{vui_texts:["Okay, I hope you feel proud of yourself for getting through this.","Do you want to share what brought you here today? "]},{vui_texts:["I see, thank you for sharing that with me. You will be okay and I will always be here for you. ","Would you like to share this session with your therapist?"]}];var B=["January","February","March","April","May","June","July","August","September","October","November","December"];t(83);function J(){return Object(l.jsxs)("div",{id:"header__container row",children:[Object(l.jsx)("div",{id:"navigation__container",children:Object(l.jsxs)("div",{id:"nav__content",children:[Object(l.jsx)("div",{class:"column narrow__left",id:"nav__content__left",children:Object(l.jsx)(s.c,{className:"nav__route",to:"/",children:Object(l.jsx)("span",{id:"logo__text",children:"Nova"})})}),Object(l.jsxs)("div",{class:"column wide__right",id:"nav__content__right",children:[Object(l.jsx)(s.c,{className:"nav__route",to:"/nova",children:"Meet Nova"}),Object(l.jsx)(s.c,{className:"nav__route",to:"/matrix",children:"State Matrix"}),Object(l.jsx)(s.c,{className:"nav__route",to:"/about",children:"About"})]})]})}),Object(l.jsx)("hr",{})]})}var Y=["Nova, I need help.","Visualization.","I hear the ripples of the water.","The sky is becoming brighter.","(Continued) I can see the light blue water, some white clouds, and some green hills and trees.","I see some water lilies near me.","I\u2019m feeling calmer now.","No, I\u2019m alright. ","I was feeling really overwhelmed by my classes and my work. I think I took on too much this semester and then it just all started crashing down on me."];var X=function(){var e=Object(r.c)((function(e){return e.vuiState})),n=Object(r.b)(),t=Object(i.useRef)(null),a=Object(i.useRef)(null),o=Object(i.useRef)(null),s=Object(i.useRef)(null),d=Object(i.useState)(""),v=Object(h.a)(d,2),p=v[0],m=v[1],f=new Date,g=Object(i.useState)(["Welcome, it's "+B[f.getMonth()]+" "+f.getDate()+", "+f.getFullYear()+"."]),_=Object(h.a)(g,2),x=_[0],b=_[1],y=Object(i.useRef)(),j=Object(i.useState)([]),O=Object(h.a)(j,2),w=O[0],I=O[1],z=Object(i.useState)(0),k=Object(h.a)(z,2),E=k[0],N=k[1],C=Object(i.useState)(0),T=Object(h.a)(C,2),A=T[0],L=T[1],R=Object(i.useState)(!1),D=Object(h.a)(R,2),P=D[0],V=D[1];Object(i.useEffect)((function(){N(A),console.log("Set instruction text to",A)}),[A,E]),Object(i.useEffect)((function(){var e=E+2;if(e>=Y.length)console.log("Reached end of instruction");else{for(var n=[],t=E;t<=e;t++)n.push(Y[t]);I(n),console.log("Set new instruction text arr to",n)}}),[E]),Object(i.useEffect)((function(){if(null!==t.current&&null===a.current)return console.log("Initializing GL with: ",t.current),a.current=new H(t.current,s.current,o.current,{width:window.innerWidth,height:window.innerHeight},V),a.current.setup(),a.current.render(!0),window.addEventListener("resize",e,!1),document.addEventListener("keydown",re,!1),document.addEventListener("keyup",ce,!1),function(){a.current.render(!1),window.removeEventListener("resize",e,!1),document.removeEventListener("keydown",re,!1),document.removeEventListener("keyup",ce,!1)};function e(){a.current.handleResize(window.innerWidth,window.innerHeight)}}),[]),Object(i.useEffect)((function(){void 0!==a.current&&null!==a.current&&void 0!==a.current.vuiObj&&null!==a.current.vuiObj&&(console.log(e.vuiState),a.current.changeState(e.vuiState.vuiStateStr,e.vuiState.visState,e.vuiState.playSound))}),[e]);var F=function(){var e=A+1;L(e),console.log("User text changed to",e)},U=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,t=function(){F(),e()},i=u.a.timeline({onComplete:t,delay:n});i.to(y.current,{opacity:0,duration:2,ease:S.c.easeInOut})},M=function(){u.a.timeline().to(y.current,{opacity:1,duration:2,ease:S.c.easeInOut})},X=function(){b(["Hi Caitlyn, you will get through this moment. I am always here for you and to guide you. ","Would you like to do a visualization or a sensory exercise? "]),m(""),n(c("appearing",-10,!0),[n]),M()},K=function(){b(G[0].vui_texts),m(""),n(c("activate_visualization",1,!0),[n]),M()},Q=function(){b(G[1].vui_texts),m(""),n(c("visualization",3,!0),[n]),M()},Z=function(){b(G[2].vui_texts),m(""),n(c("visualization",9,!0),[n]),M()},$=function(){b(G[3].vui_texts),m(""),n(c("visualization",13,!0),[n]),M()},ee=function(){b(G[4].vui_texts),m(""),n(c("visualization",13,!0),[n]),M()},ne=[{command:"Nova I need help",callback:function(){n(c("appearing",-10,!1),[n]),U(X,2)}},{command:"(a) visualization",callback:function(){U(K)}},{command:"I hear the ripples of the water",callback:function(){U(Q)}},{command:"* sky is becoming brighter",callback:function(){n(c("visualization",5,!1),[n]),F()}},{command:"* light blue water *",callback:function(){U(Z)}},{command:"* water lilies *",callback:function(){U($)}},{command:"* feeling calmer *",callback:function(){U(ee)}},{command:"No I'm alright",callback:function(){U((function(){b(G[5].vui_texts),m(""),n(c("no_change",13,!0),[n]),M()}))}},{command:"I was feeling overwhelmed *",callback:function(){U((function(){b(G[6].vui_texts),m(""),n(c("finish_visualization",20,!0),[n]),M()}))}},{command:"I don't know",callback:function(){b(["Let\u2019s focus on using an exercise to calm your anxiety right now.","Which exercise would you like to do, a visualization or a sensory exercise?"]),n(c("static",-10),[n])}}],te=Object(W.useSpeechRecognition)({commands:ne,isFuzzyMatch:!0}),ie=te.transcript,ae=te.listening,oe=te.resetTranscript,se=te.browserSupportsSpeechRecognition,re=function(e){P||e.repeat||(console.log("Start listen"),q.a.startListening({continuous:!0}),oe(),n(c("listening",-10,!1),[n]))},ce=function(){var e;P||(console.log("Stop listen"),q.a.stopListening(),""!==ie&&(n(c("stop_listening",-10,!1),[n]),m((e=ie).charAt(0).toUpperCase()+e.slice(1)+".",!0)))};return se?Object(l.jsxs)("div",{className:"VUI",children:[Object(l.jsx)("div",{id:"webgl",ref:t}),Object(l.jsx)("div",{id:"css",ref:s}),Object(l.jsx)("img",{src:"./images/iphone_cutout_color.png",id:"iphoneCutout",alt:"oops",ref:o}),Object(l.jsxs)("div",{className:"root",children:[Object(l.jsx)(J,{}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"column left",id:"VUI_UI_container",children:Object(l.jsxs)("div",{className:"conversation__container",ref:y,children:[x.map((function(e,n){return Object(l.jsx)("span",{className:"transcript__text__vui",children:e},n)})),ae?Object(l.jsxs)("span",{className:"transcript__text__user",children:[" ",ie]}):Object(l.jsxs)("span",{className:"transcript__text__user",children:[" ",p]})]})}),Object(l.jsx)("div",{className:"column right",id:"info__container",children:Object(l.jsxs)("div",{id:"info__content",children:[Object(l.jsxs)("div",{id:"about__container",children:[Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("h1",{children:" Visualization Exercise "}),Object(l.jsx)("hr",{})]}),Object(l.jsxs)("p",{children:[" ","The Visualization Exercise gives you the opportunity to co-create a personal landscape with Nova. Nova will guide you through this sensory experience with ambient sound, calming visuals, and breathing exercises."," "]})]}),Object(l.jsxs)("div",{id:"instructions__container",children:[Object(l.jsx)("h2",{children:"Speak the script below to engage with Nova."}),Object(l.jsx)("hr",{}),Object(l.jsxs)("div",{id:"instructions__texts",children:[" ",w.map((function(e,n){return Object(l.jsx)("span",{className:"instruction__text",children:e},n)}))]}),Object(l.jsx)("hr",{})]}),Object(l.jsxs)("div",{id:"manual__helper",children:[P?Object(l.jsxs)("h2",{children:[" ","Nova is currently talking. You can engage with Nova after they finish."," "]}):Object(l.jsxs)("h2",{children:[" ","Hold the ",Object(l.jsx)("span",{id:"highlight__text",children:" spacebar "})," to speak."," "]}),Object(l.jsxs)("p",{children:["Microphone is currently ",ae?"on":"off","."]})]})]})})]})]})]}):Object(l.jsx)("span",{children:"Browser doesn't support speech recognition."})},K=t(12),Q=t(89),Z=t(90),$=function(e,n,t,i){var a=u.a.timeline({paused:!0});return a.set(e,{opacity:t}),a.to(e,{opacity:i,duration:1.5,ease:S.c.easeInOut,delay:n}),a.then((function(){console.log("Finished page transition animation")})),a};t(84);function ee(){return Object(l.jsxs)("div",{id:"matrix__root",children:[Object(l.jsx)(J,{}),Object(l.jsx)("p",{children:" This is the matrix page. "})]})}t(85);function ne(){return Object(l.jsxs)("div",{id:"process__root",children:[Object(l.jsx)(J,{}),Object(l.jsx)("p",{children:" This is about page. "})]})}var te=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(s.a,{children:Object(l.jsx)(K.a,{render:function(e){var n=e.location,t=(n.pathname,n.key);return Object(l.jsx)(Q.a,{component:null,children:Object(l.jsx)(Z.a,{native:!0,appear:!0,onEnter:function(e){return function(e,n){$(n,1,0,1).play()}(0,e)},onExiting:function(e){return function(e,n){$(n,0,1,0).play()}(0,e)},timeout:{enter:300,exit:350},children:Object(l.jsxs)(K.c,{location:n,children:[Object(l.jsx)(K.a,{exact:!0,path:"/CDT-project-01",component:d}),Object(l.jsx)(K.a,{path:"/nova",component:X}),Object(l.jsx)(K.a,{path:"/matrix",component:ee}),Object(l.jsx)(K.a,{path:"/about",component:ne})]})},t)})}})})})},ie=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,91)).then((function(n){var t=n.getCLS,i=n.getFID,a=n.getFCP,o=n.getLCP,s=n.getTTFB;t(e),i(e),a(e),o(e),s(e)}))},ae=t(35),oe=t(19),se={vuiState:{vuiStateStr:"none",visState:-10,playSound:!1},isSpeaking:!1,userName:"User"},re=Object(ae.a)({vuiState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,n=arguments.length>1?arguments[1]:void 0;return"VUI_STATE_CHANGE"===n.type?Object(oe.a)(Object(oe.a)({},e),{},{vuiState:{vuiStateStr:n.payload.stateStr,visState:n.payload.visState,playSound:n.payload.playSound}}):e},soundState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,n=arguments.length>1?arguments[1]:void 0;return"SOUND_STATE_CHANGE"===n.type?Object(oe.a)(Object(oe.a)({},e),{},{soundsState:n.payload}):e},username:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,n=arguments.length>1?arguments[1]:void 0;return"USER_NAME_CHANGE"===n.type?(console.log("user name change"),Object(oe.a)(Object(oe.a)({},e),{},{userName:n.payload})):e},visPhase:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,n=arguments.length>1?arguments[1]:void 0;return"VIS_PHASE_CHANGE"===n.type?(console.log("Visualization phase has changed to",n.payload),Object(oe.a)(Object(oe.a)({},e),{},{visPhaseInt:n.payload})):e}}),ce=re,ue=Object(ae.b)(ce,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());o.a.render(Object(l.jsx)(r.a,{store:ue,children:Object(l.jsx)(te,{})}),document.getElementById("root")),ie()}},[[86,1,2]]]);
//# sourceMappingURL=main.adc8cf61.chunk.js.map