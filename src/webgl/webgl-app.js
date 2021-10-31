import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  GridHelper,
  AmbientLight,
  Clock,
  TextureLoader,
  PlaneGeometry,
  Vector2,
  DirectionalLight,
  ShaderMaterial,
  Audio,
  AudioListener,
  AudioLoader,
} from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import vuiCircle from "./VUI/vuiClass";
import { bg_vshader, bg_fshader } from "./shaders/bg.glsl";
import { createElemObject } from "./helpers/css3d";
import gsap from "gsap/all";
const TEX_MAX = 14;

export default class WebGLApp {
  constructor(htmlElem, cssElem, cssRef, windowInfo) {
    this.htmlElem = htmlElem;
    this.cssElem = cssElem;
    this.cssRef = cssRef;
    this.windowInfo = windowInfo;
    this.rafId = 0;
    this.isRendering = false;
    this.soundClip = 0;
  }

  setup = () => {
    this.scene = new Scene();
    this.scene.background = new Color(0xffffff); //Color(0xb6eafa);
    this.camera = new PerspectiveCamera(
      75,
      this.windowInfo.width / this.windowInfo.height,
      1,
      1000
    );
    this.camera.position.set(0, 0, 30);
    this.camera.lookAt(this.scene.position);
    this.setupRenderers();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.clock = new Clock();
    this.createLights();
    this.createBackground();
    this.initPostprocessing();
    this.vuiObj = new vuiCircle(this.outlinePass);
    this.vuiObj.init();
    this.scene.add(this.vuiObj.mesh);
    this.outlinePass.selectedObjects = [this.vuiObj.mesh];
    this.addCSSElems();
    this.setupListener();
  };

  setupListener = () => {
    // create an AudioListener and add it to the camera
    this.listener = new AudioListener();
    this.camera.add(this.listener);
    this.audioLoader = new AudioLoader();
  };

  playSound = () => {
    const that = this;
    const path = "assets/audio/vui/";
    // create a global audio source
    const sound = new Audio(this.listener);
    sound.onEnded = () => {
      console.log("Finished sound clip");
      that.vuiObj.changeState("stop_speaking");
    };

    const f_type = ".mp3";
    const loadV = path + this.soundClip.toString() + f_type;

    console.log("Load sound path", loadV);

    this.audioLoader.load(loadV, function (buffer) {
      console.log("Playing sound clip", that.soundClip);

      if (that.vuiObj !== undefined) {
        that.vuiObj.changeState("speaking");
      }

      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.play();

      that.soundClip++;
    });
  };

  addCSSElems = () => {
    this.phoneCutout = createElemObject(
      this.cssRef,
      window.screen.width,
      window.screen.height,
      0xffffff,
      true
    );
    this.phoneCutout.position.set(-5, -5, 0);
    this.scene.add(this.phoneCutout);
  };

  setupRenderers = () => {
    // webgl
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.windowInfo.width, this.windowInfo.height);
    this.renderer.shadowMap.enabled = true;
    this.htmlElem.appendChild(this.renderer.domElement);

    // css
    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    this.cssRenderer.domElement.style.position = "absolute";
    this.cssRenderer.domElement.style.top = 0;
    this.cssElem.appendChild(this.cssRenderer.domElement);
  };

  createGridHelper = () => {
    this.gridHelper = new GridHelper(10, 10);
    this.scene.add(this.gridHelper);
    console.log("created grid helper", this.gridHelper);
  };

  initPostprocessing = () => {
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    const outlinePass = new OutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    );
    const edgeGlow = 10;
    outlinePass.edgeStrength = 0;
    outlinePass.edgeGlow = edgeGlow;
    outlinePass.edgeThickness = edgeGlow - 1;
    outlinePass.visibleEdgeColor = new Color(0.8, 0.8, 0.8);
    outlinePass.downSampleRatio = 1.8;
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms["resolution"].value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    effectFXAA.renderToScreen = true;
    this.composer.addPass(effectFXAA);
    this.composer.addPass(outlinePass);
    this.outlinePass = outlinePass;
  };

  createLights = () => {
    this.ambientLight = new AmbientLight(0x404040);
    this.scene.add(this.ambientLight);
    var light = new DirectionalLight(0xddffdd, 0.4);
    light.position.z = 1;
    light.position.y = 1;
    light.position.x = 1;
    this.scene.add(light);
  };

  createBackground = () => {
    const textureLoader = new TextureLoader();

    let texture;
    const path = "assets/visualization/sequence/";
    const f_ex = ".png";
    var textures = [];
    for (var i = 1; i <= TEX_MAX; i++) {
      texture = textureLoader.load(path + i.toString() + f_ex);
      textures.push(texture);
    }
    this.visTextures = textures;
    const introTexture = textureLoader.load(path + "intro" + f_ex);
    this.visIntroTex = introTexture;
    console.log("Textures", textures);
    const geometry = new PlaneGeometry(17, 36);
    this.bgUniforms = {
      u_tex1: {
        value: introTexture, //introTexture,
      },
      u_tex2: {
        value: introTexture,
      },
      u_resolution: {
        value: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      },
      u_useTexLerp: {
        value: 0.0,
      },
      u_time: {
        value: 0,
      },
    };
    const material = new ShaderMaterial({
      uniforms: this.bgUniforms,
      vertexShader: bg_vshader,
      fragmentShader: bg_fshader,
      transparent: true,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(-20, -1.5, 0);
    this.scene.add(mesh);
  };

  lerpBackground = () => {
    if (this.bgUniforms === undefined) return;

    var that = this;
    const tl = gsap.timeline({
      onComplete: function () {},
    });
    this.bgUniforms.u_useTexLerp.value = 0.0;
    tl.to(this.bgUniforms.u_useTexLerp, {
      value: 1.0,
      duration: 2,
      ease: "sine.out",
    });
  };

  changeState = (vuiState, visState, playVuiSounds) => {
    if (playVuiSounds) {
      this.playSound();
    }

    this.vuiObj.changeState(vuiState);

    if (visState < 0) return;
    this.bgUniforms.u_tex1.value = this.bgUniforms.u_tex2.value;
    if (visState > TEX_MAX) {
      this.bgUniforms.u_tex2.value = this.visIntroTex;
    } else {
      this.bgUniforms.u_tex2.value = this.visTextures[visState - 1];
    }
    // visState == 0 => directly lerp
    this.lerpBackground();
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
    this.cssRenderer.render(this.scene, this.camera);
  };

  handleResize = (newWidth, newHeight) => {
    this.camera.aspect = newWidth / newHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(newWidth, newHeight);
    this.cssRenderer.setSize(newWidth, newHeight);
    this.bgUniforms.u_resolution.value.x = newWidth;
    this.bgUniforms.u_resolution.value.y = newHeight;
  };

  update = () => {
    this.controls.update();
    this.rafId = requestAnimationFrame(this.update);
    if (this.vuiObj !== undefined) {
      this.vuiObj.update(this.clock.getDelta());
    }
    this.bgUniforms.u_time.value = this.clock.getElapsedTime();
    this.composer.render();
    this.cssRenderer.render(this.scene, this.camera);
  };

  render = (render) => {
    if (this.isRendering === render) return;
    this.isRendering = render;
    if (render) {
      this.update();
    } else {
      cancelAnimationFrame(this.rafId);
    }
  };
}
