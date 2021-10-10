import gsap, { Power2 } from "gsap/gsap-core";

export function activateVisualization() {
  this.isAnimating = true;
  const tl = gsap.timeline({
    onComplete: function () {
      this.isAnimating = false;
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
    y: -15.5,
    duration: 2,
    ease: Power2.easeInOut,
  });
}
