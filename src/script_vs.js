attribute vec3 position; // 頂点の位置情報
uniform mat4 mvpMatrix; // モデル、ビュー、プロジェクションの行列を全てかけ合わせた4x4の行列

// 今回の頂点シェーダでは頂点の位置座標を変換するだけなので、
// やることはこの行列を頂点の位置座標に掛けることだけ。
void main(void){
  // vec3をvec4に変換する
  gl_Position = mvpMatrix * vec4(position, 1.0);
}
