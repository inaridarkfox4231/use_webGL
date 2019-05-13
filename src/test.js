'use strict';

function calc_ratio(theta, phi){
  let p = Math.cos(phi) + Math.sqrt(Math.pow(Math.cos(phi), 2) - Math.pow(Math.sin(theta), 2));
  let q = Math.pow(Math.sin(theta), 2);
  return p / q;
}

const PI = 3.14159;
let ratio, s, r;
let r_end;
let theta = PI / 8;
let phi = PI / 4;

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
}
