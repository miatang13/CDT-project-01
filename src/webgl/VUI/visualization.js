import gsap, { Power2 } from "gsap/gsap-core";

export function activateVisualization() {
  const tl = gsap.timeline();
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
    y: -11,
    duration: 2,
    ease: Power2.easeInOut,
  });
}
