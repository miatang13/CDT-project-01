import gsap, { Power2 } from "gsap/gsap-core";

export function activateVisualization(callbackFunc) {
  this.isAnimating = true;
  const that = this;
  const tl = gsap.timeline({
    onComplete: function () {
      that.isAnimating = false;
      that.inVis = true;
      callbackFunc();
    },
  });
  tl.to(
    this.mesh.scale,
    {
      x: 0.4,
      y: 0.4,
      duration: 2,
      ease: Power2.easeInOut,
    },
    0
  );
  tl.to(this.mesh.position, {
    y: -16.5,
    duration: 2,
    ease: Power2.easeInOut,
  });
  tl.to(this.sceneOutlinePass, {
    edgeStrength: 0.7,
    duration: 1,
    ease: Power2.easeInOut,
  });
}

export function finishVisualization() {
  const tl = gsap.timeline();
  tl.to(
    this.mesh.scale,
    {
      x: 2,
      y: 2,
      duration: 2,
      ease: Power2.easeInOut,
    },
    0
  );
  tl.to(
    this.mesh.position,
    {
      y: 8,
      duration: 3,
      ease: Power2.easeInOut,
    },
    0
  );
}
