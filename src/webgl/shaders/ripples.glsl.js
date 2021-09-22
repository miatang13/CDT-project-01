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
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
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
  float len = length(p);
  vec2 ripple = v_uv + p/len*0.03*cos(len*12.0-u_time * 4.0);
  float delta = (sin(mod(u_time, u_duration) * (2.0 * PI/u_duration))+1.0)/2.0;
  vec2 uv = mix(ripple, v_uv, 0.0);
  vec3 color = texture2D(u_tex, uv).rgb;
  float rand = random(p);
  float r = color.r * rand + 0.5 ;
  float g = clamp(color.g, 0.25, 0.5);
  float b = clamp(abs(sin(u_time)), 0.3, 0.8) ;
  gl_FragColor = vec4(r, g, b, 1.0); 
}
`;

export { vshader, fshader };
