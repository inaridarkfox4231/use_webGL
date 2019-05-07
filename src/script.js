'use strict';

onload = function(){
  // canvasエレメントの取得
  var c = document.getElementById("canvas");
  c.width = 500;
  c.height = 300;

  // webGLコンテキストの取得
  var gl = c.getContext('webgl');

  // 画面をクリアするためのメソッド：gl.clear
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.COLOR_BUFFER_BITに設定したい色を放り込んでその色でクリアする感じ
  // gl.COLOR_BUFFER_BITに色を設定するメソッドがgl.clearColor(x, y, z, w) (これらは0~1のfloat)

  // canvasを黒でクリアする
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
