'use strict';

function calc_ratio(theta, phi){
  let p = Math.cos(phi) + Math.sqrt(Math.pow(Math.cos(phi), 2) - Math.pow(Math.sin(theta), 2));
  let q = Math.pow(Math.sin(theta), 2);
  return p / q;
}
// 補助的な変数alphaを計算する（epsironには上記の計算結果であるratioが入る）
function calc_alpha(theta, epsiron){
  return (Math.pow(epsiron * Math.sin(theta), 2.0) - 1.0) / (2.0 * epsiron * Math.cos(theta));
}

// 角度thetaと角度phiの示す角の挟む距離の比の値を算出する
function calc_distRatio_1(theta, alpha, epsiron){
  return ((epsiron * (1.0 + Math.cos(theta)) + alpha) * Math.tan(theta / 2.0)) / Math.sqrt(1.0 - Math.pow(alpha, 2.0));
}

// 角度phiと角度PI/2の示す角の挟む距離の比の値を算出する
function calc_distRatio_2(alpha){
  return Math.sqrt((1.0 + alpha) / (1.0 - alpha));
}

const PI = 3.14159;
let ratio, s, r;
let r_end;
let theta = PI / 5;
let phi = PI / 7;

onload = function(){
  console.log('hello');
  ratio = calc_ratio(theta, phi);
  console.log('ratio = %f', ratio);
  r = 0.5;
  console.log('r = %f', r);
  s = ratio * r;
  console.log('s = %f', s);
  r_end = s * s * Math.pow(Math.sin(theta), 2) / r;
  console.log('r_end = %f', r_end);
  let alpha = calc_alpha(theta, ratio);
  console.log('alpha = %f', alpha);
  let ratio_0 = ratio * Math.sin(theta);
  console.log('ratio_0 = %f', ratio_0);
  let ratio_1 = calc_distRatio_1(theta, alpha, ratio);
  console.log('ratio_1 = %f', ratio_1);
  let ratio_2 = calc_distRatio_2(theta, alpha, ratio);
  console.log('ratio_2 = %f', ratio_2);
  let d_odd_odd = Math.pow(ratio_0 * ratio_1 * ratio_2, 2) * r;
  console.log('d_odd_odd = %f', d_odd_odd);
}
