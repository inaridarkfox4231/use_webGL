'use strict';

onload = function(){
  // canvasエレメントの取得（１）
  var c = document.getElementById("canvas");
  c.width = 300;
  c.height = 300;

  // webGLコンテキストの取得（２）
  var gl = c.getContext('webgl');

  // canvasを初期化する色を設定する
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // canvasを初期化する際の深度を設定する
  gl.clearDepth(1.0);

  // canvas初期化(深さについての組み込み変数を追加)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// ---------------------------------------------------- //

  // 頂点シェーダとフラグメントシェーダの生成
  var v_shader = create_shader('vs');
  var f_shader = create_shader('fs');

  // プログラムオブジェクトの生成とリンク
  var prg = create_program(v_shader, f_shader);

  // attributeLocationの取得（？）
  // prgは対象となるプログラムオブジェクト、第二引数はattribute変数の名前（この場合は'position'）
  var attLocation = gl.getAttribLocation(prg, 'position');

  // attributeの要素数（この場合は xyz の3要素）（positionが3つの変数からなるため。）
  var attStride = 3;

// ---------------------------------------------------- //
  // モデルデータを作る（頂点のデータ）。さらにVBOを生成して頂点シェーダと関連付ける
  var vertex_position = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
  ];

  // VBOの生成
  var vbo = create_vbo(vertex_position);

  // VBOをバインド
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

  // attribute属性を有効にする
  gl.enableVertexAttribArray(attLocation);

  // attribute属性を登録
  // attLocationはattribute変数の何番目であるかを示す変数
  // attStrideはattribute変数の要素数（この場合は3）を示す変数
  gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);

// ---------------------------------------------------- //
  // レンダリングの為の座標変換行列を用意する

  // matIVオブジェクトを用意する
  var m = new matIV();

  // 各種行列の生成と初期化
  var mMatrix = m.identity(m.create());
  var vMatrix = m.identity(m.create());
  var pMatrix = m.identity(m.create());
  var mvpMatrix = m.identity(m.create());

  // 今回はモデル変換行列はノータッチで。

  // ビュー座標変換行列
  // カメラの位置は上に1.0, うしろに3.0の所、注視点は原点、上方向はy軸の正の向き。
  m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);

  // プロジェクション座標変換行列
  m.perspective(90, c.width / c.height, 0.1, 100, pMatrix);

  // 行列を掛け合わせる
  m.multiply(pMatrix, vMatrix, mvpMatrix);
  m.multiply(mvpMatrix, mMatrix, mvpMatrix);

  // uniformLocationの取得
  var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

  // uniformLocationへ座標変換行列を登録
  gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

// ---------------------------------------------------- //
  // モデルの描画
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // コンテキストの再描画
  gl.flush();

// ---------------------------------------------------- //
  // シェーダの作成とコンパイル（３）
  // ここのidはscriptタグのid情報。
  function create_shader(id){
    // シェーダを格納する変数
    var shader;

    // HTMLタグからscriptタグへの参照を取得
    var scriptElement = document.getElementById(id);

    // scriptタグが存在しない場合は抜ける
    if(!scriptElement){ return; }

    // scriptタグのtype属性をチェックしたうえでシェーダを生成する
    switch(scriptElement.type){

      // 頂点シェーダの場合
      case 'x-shader/x-vertex':
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;

      // フラグメントシェーダの場合
      case 'x-shader/x-fragment':
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
      default:
        return;
    }
    // この時点ではシェーダのソースコードには触れていないみたい。
    // 生成されたシェーダにソースコードを割り当てる
    gl.shaderSource(shader, scriptElement.text);

    // シェーダをコンパイルする
    gl.compileShader(shader);

    // シェーダが正しくコンパイルされたかチェック
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      // 成功していたらシェーダを返して終了
      return shader;
    }else{
      // 失敗していたらエラーログをアラートする
      alert(gl.getShaderInfoLog(shader));
    }
  }

// ---------------------------------------------------- //
  // プログラムオブジェクトの生成（３）
  // プログラムオブジェクトは、ふたつのシェーダ間のやりとり、またはWebGLとシェーダ間のやりとりを・・する？
  function create_program(vs, fs){
    // プログラムオブジェクトの生成
    var program = gl.createProgram();

    // プログラムオブジェクトにシェーダを割り当てる
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    // シェーダをリンク
    gl.linkProgram(program);

    // シェーダのリンクが正しく行われたかチェック
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){

      // 成功していたらプログラムオブジェクトを有効にする
      gl.useProgram(program);

      // プログラムオブジェクトを返して終了
      return program;
    }else{

      // 失敗していたらエラーログをアラートする
      alert(gl.getProgramInfoLog(program));
    }
  }

// ---------------------------------------------------- //
  // VBO（頂点バッファ）を生成する関数（４）
  function create_vbo(data){
    // バッファオブジェクトを生成
    var vbo = gl.createBuffer();

    // バッファをバインドする（配列型のバッファ）
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    // バッファにデータをセット
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    // バッファのバインドを無効化（一度にバインドできるバッファは一度に一つだけ）
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // 生成したVBOを返して終了
    return vbo;
  }
}
