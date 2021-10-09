import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  GridHelper,
  MeshPhongMaterial,
  AmbientLight,
  Clock,
  TextureLoader,
  PlaneGeometry,
  MeshBasicMaterial,
  Vector2,
  DirectionalLight,
  ShaderMaterial,
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

export default class WebGLApp {
  constructor(htmlElem, cssElem, cssRef, windowInfo) {
    this.htmlElem = htmlElem;
    this.cssElem = cssElem;
    this.cssRef = cssRef;
    this.windowInfo = windowInfo;
    this.rafId = 0;
    this.isRendering = false;
  }

  setup = () => {
    this.scene = new Scene();
    this.scene.background = new Color(0x0d1426); //Color(0xb6eafa);
    this.camera = new PerspectiveCamera(
      75,
      this.windowInfo.width / this.windowInfo.height,
      1,
      1000
    );
    this.camera.position.set(0, 0, 28);
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
  };

  addCSSElems = () => {
    this.phoneCutout = createElemObject(
      this.cssRef,
      window.innerWidth / 2,
      window.innerHeight / 2,
      0xffffff,
      false
    );
    this.phoneCutout.position.set(0, 0, 1);
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
    const texture1 = textureLoader.load("assets/visualization/sequence/1.png");
    const texture2 = textureLoader.load("assets/visualization/sequence/2.png");
    const geometry = new PlaneGeometry(18.5, 35);
    this.bgUniforms = {
      u_tex1: {
        value: texture1,
      },
      u_text2: {
        value: texture2,
      },
      u_resolution: {
        value: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      },
      u_useTexLerp: {
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
    this.scene.add(mesh);
  };

  vuiChangeState = (stateStr) => {
    this.vuiObj.changeState(stateStr);
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
  };

  update = () => {
    this.controls.update();
    this.rafId = requestAnimationFrame(this.update);
    if (this.vuiObj !== undefined) {
      this.vuiObj.update(this.clock.getDelta());
    }
    //this.renderScene();
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
