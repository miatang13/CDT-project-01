import gsap, { Power4, Power1, Power2 } from "gsap/gsap-core";
import { initial_ripple_intensity, initial_ripple_size } from "./shaderConsts";

export function listenOn() {
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
}

export function listenOff() {
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
}
