import gsap, { Power2 } from "gsap/gsap-core";

export function animateAppear() {
  console.log(this);
  const dur = 3;
  const tl = gsap.timeline();
  tl.to(
    this.uniforms.u_alpha,
    {
      value: 1,
      duration: dur,
      ease: Power2.easeInOut,
    },
    0
  );
  tl.to(
    this.sceneOutlinePass,
    {
      edgeStrength: 1,
      duration: dur,
      ease: Power2.easeInOut,
    },
    1
  );
}

export function animateDisappear() {
  const tl = gsap.timeline();
  const dur = 3;
  tl.to(
    this.uniforms.u_alpha,
    {
      value: 0,
      duration: dur,
      ease: Power2.easeInOut,
    },
    0
  );
  tl.to(
    this.sceneOutlinePass,
    {
      edgeStrength: 0,
      duration: dur,
      ease: Power2.easeInOut,
    },
    1
  );
}
