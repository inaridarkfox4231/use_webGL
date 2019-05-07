attribute vec3 position;
uniform mat4 mvpMatrix;

void main(void){
  // vec3をvec4に変換する
  gl_Position = mvpMatrix * vec4(position, 1.0);
}
