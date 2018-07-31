varying float noise;

void main() {

  vec3 color = vec3(0.5 - 1. * noise , 0.95 - 1. * noise , 0.63 - 1. * noise);
  gl_FragColor = vec4( color.rgb, 1.0 );

}