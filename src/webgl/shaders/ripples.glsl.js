const vshader = `
varying vec2 v_uv;
varying vec3 v_position;
varying vec3 v_normal;

void main() {	
  v_uv = uv;
  v_position = position;
  v_normal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( v_position, 1.0 );
}
`;

const fshader = `
#define PI 3.141592653589

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(5.9898,78.233)))* 43758.5453123);
}

uniform sampler2D u_tex;
uniform float u_duration;
uniform float u_time;
varying vec2 v_uv;
varying vec3 v_position;
varying vec3 v_normal;

void main (void)
{
  vec2 p = v_position.xy;
  float len = length(p) / 1.5;
  vec2 ripple = v_uv + p/len*0.025*cos(len*6.0-u_time * 1.5)*(random(v_uv)*1.5);
  float delta = (sin(mod(u_time, u_duration) * (15.0 * PI/u_duration)))/15.0;
  vec2 uv = mix(ripple, v_uv, 0.0);
  vec3 rippled = texture2D(u_tex, uv).rgb;
  gl_FragColor = vec4(rippled, 1.0); 
}
`;
export { vshader, fshader };
