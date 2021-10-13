import gsap, { Power2 } from "gsap/gsap-core";
import { initial_ripple_intensity, intense_ripple } from "./shaderConsts";

export function speakingOn() {
  var repeatTl = gsap.timeline({ repeat: -1 });
  const moveDiff = 0.75;
  gsap.to(this.uniforms.u_ripple_layers, {
    value: intense_ripple,
    duration: 3.0,
    ease: Power2.easeInOut,
  });
  repeatTl.to(
    this.mesh.position,
    {
      y: this.mesh.position.y - moveDiff,
      duration: 2,
      ease: Power2.easeInOut,
    },
    2
  );
  repeatTl.to(
    this.mesh.position,
    {
      y: this.mesh.position.y + moveDiff,
      duration: 2,
      ease: Power2.easeInOut,
    },
    2
  );
  repeatTl.to(this.mesh.position, {
    y: this.mesh.position.y - moveDiff,
    duration: 2,
    ease: Power2.easeInOut,
  });
  repeatTl.to(this.mesh.position, {
    y: this.mesh.position.y + moveDiff,
    duration: 2,
    ease: Power2.easeInOut,
  });
  repeatTl.to(this.mesh.position, {
    y: this.mesh.position.y - moveDiff,
    duration: 2,
    ease: Power2.easeInOut,
  });
  repeatTl.to(this.mesh.position, {
    y: this.mesh.position.y + moveDiff,
    duration: 2,
    ease: Power2.easeInOut,
  });
}

export function speakingOff() {
  var tl = gsap.timeline();
  gsap.killTweensOf(this.mesh.position);
  tl.to(this.uniforms.u_ripple_layers, {
    value: initial_ripple_intensity,
    duration: 3.0,
    ease: Power2.easeInOut,
  });
}
