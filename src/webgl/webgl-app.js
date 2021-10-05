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
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
  SplineCurve,
  TextureLoader,
  PlaneGeometry,
  MeshBasicMaterial,
  Vector2,
  DirectionalLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import vuiCircle from "./VUI/vuiClass";

export default class WebGLApp {
  constructor(htmlElem, windowInfo) {
    this.htmlElem = htmlElem;
    this.windowInfo = windowInfo;
    this.rafId = 0;
    this.isRendering = false;
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
    this.camera.position.set(0, 0, 28);
    this.camera.lookAt(this.scene.position);
    this.tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.windowInfo.width, this.windowInfo.height);
    this.renderer.shadowMap.enabled = true;
    this.htmlElem.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.clock = new Clock();
    this.createLights();
    this.createPhoneBackground();
    this.initPostprocessing();
    this.vuiObj = new vuiCircle(this.outlinePass);
    this.vuiObj.init();
    //this.scene.add(this.vuiObj.coverMesh);
    this.scene.add(this.vuiObj.mesh);
    this.outlinePass.selectedObjects = [this.vuiObj.mesh];
  };

  createGridHelper = () => {
    this.gridHelper = new GridHelper(10, 10);
    this.scene.add(this.gridHelper);
    console.log("created grid helper", this.gridHelper);
  };

  createCube = () => {
    let geometry = new BoxGeometry(2, 2, 2);
    let material = new MeshPhongMaterial({
      color: new Color("Orange"),
      wireframe: true,
    });
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);
    console.log("created cube", this.cube);
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

  createPhoneBackground = () => {
    const textureLoader = new TextureLoader();
    const phoneBackground = textureLoader.load("assets/iphone_dark.jpg");
    const geometry = new PlaneGeometry(16, 32);
    const material = new MeshBasicMaterial({
      map: phoneBackground,
    });
    const mesh = new Mesh(geometry, material);
    this.scene.add(mesh);
  };

  createLine = () => {
    const material = new LineBasicMaterial({ color: 0xffffff });
    // smooth my curve over this many points
    var numPoints = 100;
    const z = 5;
    var curve = new SplineCurve([
      new Vector3(-2.75, 0, z),
      new Vector3(0, 0, z),
      new Vector3(1.0, 0, z),
      new Vector3(1.5, 0, z),
      new Vector3(2.5, 0, z),
      new Vector3(2.75, 0, z),
    ]);
    var points = curve.getPoints(numPoints);
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    this.scene.add(line);
  };

  vuiChangeState = (stateStr) => {
    this.vuiObj.changeState(stateStr);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  handleResize = (newWidth, newHeight) => {
    this.camera.aspect = newWidth / newHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(newWidth, newHeight);
  };

  update = () => {
    this.controls.update();
    this.rafId = requestAnimationFrame(this.update);
    if (this.vuiObj !== undefined) {
      this.vuiObj.update(this.clock.getDelta());
    }
    //this.renderScene();
    this.composer.render();
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
