import gsap, { Power1, Power2 } from "gsap/gsap-core";
import { initial_ripple_opaque, ripple_opaque } from "./shaderConsts";

export function thinkingOn() {
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
}
