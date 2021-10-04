import {
  CircleGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  TextureLoader,
} from "three";
import { vshader, fshader } from "../shaders/ripples.glsl";
import gsap, { Power4, Power1, Power2 } from "gsap/gsap-core";
import {
  initial_ripple_intensity,
  initial_ripple_opaque,
  initial_ripple_size,
  intense_ripple,
  ripple_opaque,
} from "./shaderConsts";
import { circle_pos } from "./screenConsts";

const appear = false;

class vuiCircle {
  constructor(outlinePass) {
    this.state = "none";
    this.sceneOutlinePass = outlinePass;
  }

  init = () => {
    const loader = new TextureLoader();
    const texture = loader.load("assets/texture/static_grain.png");
    const texture1 = loader.load("assets/texture/static_landscape_hor.png");
    this.texture1 = texture1;
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
        value: initial_ripple_size,
      },
      u_ripple_layers: {
        value: initial_ripple_intensity,
      },
      u_rIncre: {
        value: 0.0,
      },
      u_bIncre: {
        value: 0.0,
      },
      u_gIncre: {
        value: 0.0,
      },
      u_opaque: {
        value: initial_ripple_opaque,
      },
      u_alpha: {
        value: appear ? 1.0 : 0.0,
      },
      u_delt: {
        value: 1.0,
      },
    };
    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vshader,
      fragmentShader: fshader,
      transparent: true,
    });
    const geometry = new CircleGeometry(4, 32);
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(circle_pos.x, circle_pos.y, 1);
    if (appear) {
      this.sceneOutlinePass.edgeStrength = 1;
    }
  };

  update = (delta) => {
    if (this.uniforms !== undefined) {
      this.uniforms.u_time.value += delta;
    }
  };

  /**Private */

  changeState = (state) => {
    console.log("Vui state has changed to: ", state);
    const prevState = this.state;
    this.state = state;

    if (prevState === this.state) return;

    switch (this.state) {
      case "appearing":
        console.log("in appearing");
        this.animateAppear();
        break;
      case "listening":
        if (prevState === "none") {
          return;
        }
        this.listenOn();
        break;
      case "stop_listening":
        this.listenOff();
        break;
      case "speaking":
        this.speakingOn();
        break;
      case "stop_speaking":
        this.speakingOff();
        break;
      case "reassuring":
        this.reassuringOn();
        break;
      case "thinking":
        this.thinkingOn();
        break;
      case "disappearing":
        this.animateDisappear();
        break;
      default:
    }
  };

  animateAppear = () => {
    console.log("Animating appear", this.sceneOutlinePass);
    const dur = 3;
    const tl = gsap.timeline();
    tl.to(
      this.uniforms.u_alpha,
      {
        value: 1,
        duration: dur,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.sceneOutlinePass,
      {
        edgeStrength: 1,
        duration: dur,
        ease: Power2.easeInOut,
      },
      1
    );
  };

  animateDisappear() {
    const tl = gsap.timeline();
    const dur = 3;
    tl.to(
      this.uniforms.u_alpha,
      {
        value: 0,
        duration: dur,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.sceneOutlinePass,
      {
        edgeStrength: 0,
        duration: dur,
        ease: Power2.easeInOut,
      },
      1
    );
  }

  speakingOn = () => {
    var tl = gsap.timeline();
    const moveDiff = 0.75;
    tl.to(this.uniforms.u_ripple_layers, {
      value: intense_ripple,
      duration: 3.0,
      ease: Power2.easeInOut,
    });
    tl.to(
      this.mesh.position,
      {
        y: this.mesh.position.y - moveDiff,
        duration: 2,
        ease: Power2.easeInOut,
      },
      2
    );
    tl.to(
      this.mesh.position,
      {
        y: this.mesh.position.y + moveDiff,
        duration: 2,
        ease: Power2.easeInOut,
      },
      2
    );
    tl.to(this.mesh.position, {
      y: this.mesh.position.y - moveDiff,
      duration: 2,
      ease: Power2.easeInOut,
    });
    tl.to(this.mesh.position, {
      y: this.mesh.position.y + moveDiff,
      duration: 2,
      ease: Power2.easeInOut,
    });
    tl.to(this.mesh.position, {
      y: this.mesh.position.y - moveDiff,
      duration: 2,
      ease: Power2.easeInOut,
    });
    tl.to(this.mesh.position, {
      y: this.mesh.position.y + moveDiff,
      duration: 2,
      ease: Power2.easeInOut,
    });
  };

  speakingOff = () => {
    var tl = gsap.timeline();
    tl.to(this.uniforms.u_ripple_layers, {
      value: initial_ripple_intensity,
      duration: 3.0,
      ease: Power2.easeInOut,
    });
  };

  reassuringOn = () => {
    var tl = gsap.timeline();
    tl.to(
      this.mesh.rotation,
      {
        z: Math.PI * 2,
        duration: 2,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_rIncre,
      {
        value: 0.8,
        duration: 1.5,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_gIncre,
      {
        value: -0.07,
        duration: 1.5,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_ripple_layers,
      {
        value: 5.5,
        duration: 2,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_opaque,
      {
        value: 5.0,
        duration: 2.0,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(this.uniforms.u_ripple_size, { value: 1.2, duration: 2 }, 0);
    // go back
    tl.to(this.uniforms.u_rIncre, {
      value: 0,
      duration: 1.5,
      ease: Power2.easeInOut,
      delay: 5,
    });
    tl.to(
      this.uniforms.u_gIncre,
      {
        value: 0,
        duration: 1.5,
        ease: Power2.easeInOut,
      },
      "end"
    );
    tl.to(
      this.uniforms.u_ripple_layers,
      {
        value: initial_ripple_intensity,
        duration: 2,
        ease: Power2.easeInOut,
      },
      "end"
    );
    tl.to(
      this.uniforms.u_opaque,
      {
        value: initial_ripple_opaque,
        duration: 2.0,
        ease: Power2.easeInOut,
      },
      "end"
    );
    tl.to(
      this.uniforms.u_ripple_size,
      { value: initial_ripple_size, duration: 2 },
      "end"
    );
  };

  thinkingOn = () => {
    var tl = gsap.timeline();
    const opqDur = 3;
    tl.to(
      this.uniforms.u_bIncre,
      {
        value: 0.1,
        duration: 1.5,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_rIncre,
      {
        value: 0.1,
        duration: 1.5,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_opaque,
      {
        value: ripple_opaque,
        duration: opqDur,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.mesh.rotation,
      {
        z: Math.PI * 2,
        duration: 3,
        ease: Power1.easeInOut,
        repeat: 2,
        repeatDelay: 0.3,
      },
      0
    );

    tl.to(this.uniforms.u_opaque, {
      value: initial_ripple_opaque,
      duration: opqDur,
      ease: Power2.easeInOut,
    });

    tl.to(this.uniforms.u_bIncre, {
      value: 0,
      duration: 1.5,
      ease: Power2.easeInOut,
    });
    tl.to(this.uniforms.u_rIncre, {
      value: 0,
      duration: 1,
      ease: Power2.easeInOut,
    });
  };

  listenOn = () => {
    console.log("gl animate sound");
    this.isAnimatingSound = true;
    var tl = gsap.timeline();
    tl.to(
      this.mesh.scale,
      {
        x: 1.2,
        y: 1.2,
        duration: 3,
        ease: Power2.easeInOut,
      },
      0.5
    );
    tl.to(
      this.uniforms.u_ripple_size,
      {
        value: initial_ripple_size * 1.5,
        duration: 2,
        ease: Power1.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_ripple_intensity,
      {
        value: initial_ripple_intensity * 3.5,
        duration: 2,
        ease: Power1.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_rIncre,
      {
        value: 0.2,
        duration: 3,
        ease: Power2.easeInOut,
      },
      0
    );
  };

  listenOff = () => {
    const callback = () => {
      this.isAnimatingSound = false;
    };
    var tl = gsap.timeline({ onComplete: callback });
    tl.to(
      this.uniforms.u_rIncre,
      {
        value: 0,
        duration: 3,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.mesh.scale,
      {
        x: 1,
        y: 1,
        duration: 2,
        ease: Power4.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_ripple_size,
      {
        value: initial_ripple_size,
        duration: 3,
        ease: Power1.easeInOut,
      },
      0
    );
  };
}

export default vuiCircle;
