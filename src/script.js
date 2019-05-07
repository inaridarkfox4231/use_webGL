'use strict';

onload = function(){
  // canvasエレメントの取得
  var c = document.getElementById("canvas");
  c.width = 300;
  c.height = 300;

  // webGLコンテキストの取得
  var gl = c.getContext('webgl');

  // canvasを初期化する色を設定する
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // canvasを初期化する際の深度を設定する
  gl.clearDepth(1.0);

  // canvas初期化(深さについての組み込み変数を追加)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  function
}
