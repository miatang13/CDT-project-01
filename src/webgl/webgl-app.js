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
  ShaderMaterial,
  Clock,
  CircleGeometry,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
  SplineCurve,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap, { Power4, Power1 } from "gsap/gsap-core";
import { vshader, fshader } from "./shaders/ripples.glsl";

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
      "assets/texture/static_landscape_hor.png",
      function (texture) {
        console.log("loaded", texture);
      },
      null,
      function (err) {
        console.log("load error", err);
      }
    );
    this.uniforms = {
      u_tex: {
        value: texture,
      },
      u_duration: {
        value: 5.0,
      },
      u_time: {
        value: 0,
      },
      u_ripple_size: {
        value: 1.5,
      },
    };
    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vshader,
      fragmentShader: fshader,
      transparent: true,
    });
    const geometry = new CircleGeometry(3, 32);
    this.sphere = new Mesh(geometry, material);
    //this.sphere.scale.set(0, 0, 0);
    this.sphere.position.set(0, 0, -1);
    this.scene.add(this.sphere);

    //this.animateSphere();
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

  animateSound = () => {
    console.log("gl animate sound");
    this.isAnimatingSound = true;
    const callback = () => {
      this.isAnimatingSound = false;
    };
    var tl = gsap.timeline({ onComplete: callback });
    console.log(this.sphere);
    tl.to(
      this.sphere.scale,
      {
        x: 1.5,
        y: 1.5,
        duration: 2,
        ease: Power4.easeInOut,
      },
      0
    );
    tl.to(
      this.sphere.scale,
      {
        x: 1,
        y: 1,
        duration: 2,
        ease: Power4.easeInOut,
      },
      3
    );
    tl.to(
      this.uniforms.u_ripple_size,
      {
        value: 2.5,
        duration: 2.5,
        ease: Power1.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_ripple_size,
      {
        value: 1.5,
        duration: 3,
        ease: Power1.easeInOut,
      },
      3
    );
  };

  createObjs = () => {
    // this.createGridHelper();
    this.createLights();
    this.createSphere();
    //this.createLine();
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
    if (this.uniforms !== undefined) {
      this.uniforms.u_time.value += this.clock.getDelta();
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
