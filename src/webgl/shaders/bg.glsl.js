export const bg_vshader = `
varying vec2 v_uv;
varying vec3 v_position;
varying vec3 v_normal;
uniform float u_time;

void main() {	
  v_uv = uv;
  v_position = position;
  v_normal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( v_position, 1.0 );
}
`;

export const bg_fshader = `
uniform sampler2D u_tex;
uniform vec2 u_resolution;
varying vec2 v_uv;
varying vec3 v_position;
varying vec3 v_normal;

void main (void)
{
  vec2 uv = gl_FragCoord.xy/u_resolution;
  vec3 mapped = texture2D(u_tex, uv).rgb;
  gl_FragColor = vec4(mapped, 1); 
}
`;
