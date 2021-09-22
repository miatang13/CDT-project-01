import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  GridHelper,
  MeshPhongMaterial,
  PointLight,
  AmbientLight,
  SphereGeometry,
  TextureLoader,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap, { Power4 } from "gsap/gsap-core";
import { vshader, fshader } from "./shaders/ripple.glsl";

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
    this.scene.background = new Color(0xb6eafa);
    this.camera = new PerspectiveCamera(
      75,
      this.windowInfo.width / this.windowInfo.height,
      1,
      1000
    );
    this.camera.position.set(5, 5, 10);
    this.camera.lookAt(this.scene.position);
    this.tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.windowInfo.width, this.windowInfo.height);
    this.renderer.shadowMap.enabled = true;
    this.htmlElem.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
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

  createSphere = () => {
    const loader = new TextureLoader();
    const texture = loader.load(
      "assets/texture/ir1.jpg",
      function (texture) {
        console.log("loaded", texture);
      },
      null,
      function (err) {
        console.log("load error", err);
      }
    );
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    const geometry = new SphereGeometry(2, 32, 32);
    this.sphere = new Mesh(geometry, material);
    this.sphere.scale.set(0, 0, 0);
    this.sphere.position.set(0, -2, 0);
    this.sphere.opacity = 0;
    this.scene.add(this.sphere);

    this.animateSphere();
  };

  animateSphere = () => {
    const dur = 3;
    gsap.to(
      this.sphere.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        ease: Power4.easeInOut,
        duration: dur,
      },
      0
    );

    gsap.to(
      this.sphere.position,
      {
        x: 0,
        y: 0,
        z: 0,
        ease: Power4.easeInOut,
        duration: dur,
      },
      0
    );

    gsap.to(
      this.sphere.material,
      {
        opacity: 1,
        ease: Power4.easeInOut,
        duration: dur,
      },
      0
    );
  };

  createObjs = () => {
    // this.createGridHelper();
    this.createLights();
    this.createSphere();
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
    if (this.sphere !== undefined) {
      this.sphere.rotation.x += 0.01;
      this.sphere.rotation.z += 0.01;
    }
    this.controls.update();
    this.rafId = requestAnimationFrame(this.update);
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
