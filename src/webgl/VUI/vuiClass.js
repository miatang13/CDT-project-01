import { CircleGeometry, Mesh, ShaderMaterial, TextureLoader } from "three";
import { vshader, fshader } from "../shaders/ripples.glsl";
import {
  initial_ripple_intensity,
  initial_ripple_opaque,
  initial_ripple_size,
} from "./shaderConsts";
import { circle_pos } from "./screenConsts";
import { DEBUG_STATES } from "../../utility/debug";
import { speakingOn, speakingOff } from "./speaking";
import { listenOn, listenOff } from "./listen";
import { activateVisualization } from "./visualization";
import { thinkingOn, thinkingOff } from "./thinking";
import { reassuringOn } from "./reassure";
import { animateAppear, animateDisappear } from "./presence";
import { bindNewMethods } from "../../utility/bind";

const appear = DEBUG_STATES;

class vuiCircle {
  constructor(outlinePass) {
    this.state = "none";
    this.sceneOutlinePass = outlinePass;
    this.isAnimating = false;
  }

  init = () => {
    const loader = new TextureLoader();
    const texture = loader.load("assets/texture/static_grain.png");
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
    this.mesh.scale.set(0, 0, 0);
    if (appear) {
      this.sceneOutlinePass.edgeStrength = 1;
    }
    const BIND_FUNCS = [
      speakingOn,
      speakingOff,
      listenOn,
      listenOff,
      reassuringOn,
      thinkingOn,
      thinkingOff,
      animateAppear,
      animateDisappear,
      activateVisualization,
    ];
    const FUNC_NAMES = [
      "speakingOn",
      "speakingOff",
      "listenOn",
      "listenOff",
      "reassuringOn",
      "thinkingOn",
      "thinkingOff",
      "animateAppear",
      "animateDisappear",
      "activateVisualization",
    ];
    bindNewMethods(this, BIND_FUNCS, FUNC_NAMES);
  };

  update = (delta) => {
    if (this.uniforms !== undefined) {
      this.uniforms.u_time.value += delta;
    }
  };

  /**Private */

  changeState = (state) => {
    if (this.isAnimating) return;

    console.log("Vui state has changed to: ", state);
    const prevState = this.state;
    this.state = state;

    if (prevState === this.state) return;

    switch (this.state) {
      case "appearing":
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
      case "stop_thinking":
        this.thinkingOff();
        break;
      case "disappearing":
        this.animateDisappear();
        break;
      case "activate_visualization":
        this.activateVisualization();
        break;
      default:
        return;
    }
  };
}

export default vuiCircle;
