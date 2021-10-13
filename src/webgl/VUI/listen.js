import gsap, { Power4, Power1, Power2 } from "gsap/gsap-core";
import { initial_ripple_intensity, initial_ripple_size } from "./shaderConsts";

export function listenOn() {
  this.isAnimatingSound = true;
  var tl = gsap.timeline();
  tl.to(
    this.mesh.scale,
    {
      x: this.inVis ? 0.5 : 1.2,
      y: this.inVis ? 0.5 : 1.2,
      duration: 2,
      ease: Power2.easeInOut,
    },
    0.5
  );
  tl.to(
    this.uniforms.u_ripple_size,
    {
      value: initial_ripple_size * 1.2,
      duration: 5,
      ease: Power1.easeInOut,
    },
    0
  );
  tl.to(
    this.uniforms.u_ripple_intensity,
    {
      value: initial_ripple_intensity * 1.2,
      duration: 1,
      ease: Power1.easeInOut,
    },
    0
  );
  tl.to(
    this.uniforms.u_rIncre,
    {
      value: 0.2,
      duration: 1,
      ease: Power2.easeInOut,
    },
    0
  );
}

export function listenOff() {
  const that = this;
  if (this.inVis) {
    animateListenOff(that);
    setTimeout(function () {
      that.thinkingOn();
    }, 4000);
  } else {
    animateListenOff(this);
  }
}

function animateListenOff(vuiObj) {
  var tl = gsap.timeline();
  tl.to(
    vuiObj.uniforms.u_rIncre,
    {
      value: 0,
      duration: 1,
      ease: Power2.easeInOut,
    },
    0
  );
  tl.to(
    vuiObj.mesh.scale,
    {
      x: vuiObj.inVis ? 0.4 : 1,
      y: vuiObj.inVis ? 0.4 : 1,
      duration: 2,
      ease: Power4.easeInOut,
    },
    0
  );
  tl.to(
    vuiObj.uniforms.u_ripple_size,
    {
      value: initial_ripple_size,
      duration: 5,
      ease: Power1.easeInOut,
    },
    0
  );
}
