import { CircleGeometry, Mesh, ShaderMaterial, TextureLoader } from "three";
import { vshader, fshader } from "../shaders/ripples.glsl";
import gsap, { Power4, Power1, Power2, Power3, Bounce } from "gsap/gsap-core";
import {
  circle_pos,
  initial_ripple_intensity,
  initial_ripple_opaque,
  initial_ripple_size,
  intense_ripple,
  ripple_opaque,
} from "./shaderConsts";

const appear = false;

class vuiCircle {
  constructor() {
    this.state = "static";
  }

  init = () => {
    const loader = new TextureLoader();
    const texture = loader.load(
      "assets/texture/static_grain.png",
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
      u_opaque: {
        value: initial_ripple_opaque,
      },
    };
    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vshader,
      fragmentShader: fshader,
      transparent: true,
    });
    const geometry = new CircleGeometry(1.75, 32);
    this.mesh = new Mesh(geometry, material);
    if (!appear) {
      this.mesh.scale.set(0, 0, 0);
    }
    this.mesh.position.set(0, 4, 1);
    console.log(this.mesh);
  };

  update = (delta) => {
    if (this.uniforms !== undefined) {
      this.uniforms.u_time.value += delta;
    }
  };

  /**Private */

  changeState = (state) => {
    console.log("Vui state has changed to: ", state);
    this.state = state;

    switch (this.state) {
      case "appearing":
        this.animateAppear();
        break;
      case "listening":
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
    console.log("Animating appear");
    const dur = 5;
    const tl = gsap.timeline();
    tl.to(
      this.mesh.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        ease: Power4.easeInOut,
        duration: dur / 2,
      },
      "scale"
    );

    tl.to(
      this.mesh.position,
      {
        x: circle_pos.x,
        y: circle_pos.y,
        z: 1,
        ease: Power2.easeInOut,
        duration: dur,
      },
      "scale+=2"
    );
  };

  animateDisappear() {
    const tl = gsap.timeline();
    tl.to(this.mesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: Power4.easeInOut,
      duration: 3,
    });
  }

  speakingOn = () => {
    var tl = gsap.timeline();
    tl.to(this.mesh.position, {
      y: this.mesh.position.y + 0.5,
      duration: 0.5,
      ease: Power4.easeInOut,
    });
    tl.to(
      this.mesh.rotation,
      {
        y: Math.PI * 2,
        duration: 2,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(this.uniforms.u_ripple_layers, {
      value: intense_ripple,
      duration: 3.0,
      ease: Power2.easeInOut,
    });
    tl.to(
      this.mesh.position,
      {
        y: this.mesh.position.y - 0.5,
        duration: 2,
        ease: Power4.easeInOut,
      },
      4
    );
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
        y: Math.PI * 2,
        duration: 2,
        ease: Power2.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_rIncre,
      {
        value: 0.3,
        duration: 1.5,
        ease: Power2.easeInOut,
      },
      2.5
    );
    tl.to(this.uniforms.u_ripple_layers, {
      value: intense_ripple,
      duration: 3.0,
      ease: Power2.easeInOut,
    });
    tl.to(this.uniforms.u_ripple_layers, {
      value: initial_ripple_intensity,
      duration: 1.0,
      ease: Power2.easeInOut,
      delay: 1,
    });
    tl.to(this.uniforms.u_rIncre, {
      value: 0,
      duration: 0.5,
      ease: Power2.easeInOut,
    });
  };

  thinkingOn = () => {
    var tl = gsap.timeline();
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
      this.uniforms.u_opaque,
      {
        value: ripple_opaque,
        duration: 1.5,
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
    tl.to(this.uniforms.u_bIncre, {
      value: 0,
      duration: 1.5,
      ease: Power2.easeInOut,
    });
    tl.to(this.uniforms.u_opaque, {
      value: initial_ripple_opaque,
      duration: 1.5,
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
        x: 1.5,
        y: 1.5,
        duration: 2,
        ease: Power4.easeInOut,
      },
      0
    );
    tl.to(
      this.uniforms.u_ripple_size,
      {
        value: 3.0,
        duration: 5,
        ease: Power3.easeInOut,
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
