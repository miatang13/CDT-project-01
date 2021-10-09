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
uniform sampler2D u_tex1;
uniform sampler2D u_tex2;
uniform vec2 u_resolution;
uniform float u_useTexLerp;
varying vec2 v_uv;
varying vec3 v_position;
varying vec3 v_normal;

void main (void)
{
  
  vec2 uv = gl_FragCoord.xy/u_resolution;
  vec3 mapped1 = texture2D(u_tex1, uv).rgb;
  vec3 mapped2 = texture2D(u_tex2, uv).rgb;
  vec3 staticColor = vec3(13.0/255.0, 20.0/255.0, 38.0/255.0);
  vec3 color = mix(mapped1, mapped2, u_useTexLerp);
  gl_FragColor = vec4(color, 1); 
}
`;
