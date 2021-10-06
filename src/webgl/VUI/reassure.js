import gsap, { Power2 } from "gsap/gsap-core";
import {
  initial_ripple_intensity,
  initial_ripple_opaque,
  initial_ripple_size,
} from "./shaderConsts";

export function reassuringOn() {
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
}
