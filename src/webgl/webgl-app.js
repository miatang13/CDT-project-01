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
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vuiCircle from "./VUI/vuiClass";

export default class WebGLApp {
  constructor(htmlElem, windowInfo) {
    this.htmlElem = htmlElem;
    this.windowInfo = windowInfo;
    this.rafId = 0;
    this.isRendering = false;
  }

  setup = () => {
    console.log("set up with DOM elem ", this.htmlElem);
    this.scene = new Scene();
    this.scene.background = new Color(0xffffff); //Color(0xb6eafa);
    this.camera = new PerspectiveCamera(
      75,
      this.windowInfo.width / this.windowInfo.height,
      1,
      1000
    );
    this.camera.position.set(0, 0, 15);
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
    this.vuiObj = new vuiCircle();
    this.vuiObj.init();
    this.scene.add(this.vuiObj.mesh);
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

  createLights = () => {
    this.ambientLight = new AmbientLight(0x404040);
    this.scene.add(this.ambientLight);
  };

  createPhoneBackground = () => {
    const textureLoader = new TextureLoader();
    const phoneBackground = textureLoader.load("assets/iphone.png");
    const geometry = new PlaneGeometry(8, 15);
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
    console.log(line);
  };

  vuiChangeState = (stateStr) => {
    console.log("vuiObj change state to: ", stateStr);
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
    this.renderScene();
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
