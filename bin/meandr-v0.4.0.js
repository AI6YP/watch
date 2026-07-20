#!/usr/bin/env node
'use strict';

const onml = require('onml');
const fs = require('fs');


const polar2cartesian = (r, a) => {
  return [
    Math.round(r * Math.cos(a) * 10000) / 10000,
    Math.round(r * Math.sin(a) * 10000) / 10000
  ];
};

const meandr = (r0, r1, steps) => [
  'M', ...polar2cartesian(r1, 0),
  ...Array.from({length: steps}).flatMap((_, i) => {
    const a0 = i          * 2 * Math.PI / steps;
    const a1 = (i + 0.5)  * 2 * Math.PI / steps;
    const a2 = (i + 1)    * 2 * Math.PI / steps;
    return [
      'L', ...polar2cartesian(r1, a0),
      'L', ...polar2cartesian(r0, a0),
      'L', ...polar2cartesian(r0, a1),
      'L', ...polar2cartesian(r1, a1),
      ...((i < (steps - 1)) ? ['L', ...polar2cartesian(r1, a2)] : [])
    ];
  })
].join(' ');

const main = async () => {

  const body = ['g', ['g', onml.tt(20, 20, {id: 'g0'}),
    ['path', {
      id: 'path0',
      fill: 'none', stroke: 'blue', 'stroke-width': 0.4, // style: 'stroke-linejoin: round;',
      d: meandr(
        27.40 / 2 + 0.2, // inner radius NH72 press fit
        34.00 / 2 - 0.2, // outer radius 39MM Titanium case press fit
        30
      )
    }],
    ['path', {
      id: 'path1',
      fill: 'none', stroke: 'red', 'stroke-width': 0.4, // style: 'stroke-linejoin: round;',
      d: meandr(
        27.40 / 2 + 0.2 + 0.5, // inner radius + extra space for oscillating weight
        34.00 / 2 - 0.2 - 1.0, // outer radius + extra space for back plate
        30
      )
    }],
  ]];
  const svg = [...onml.gen.svg(40, 40), body];
  const svgStr = onml.stringify(svg, 2);
  fs.promises.writeFile('meandr-v0.4.0.svg', svgStr, 'utf8');
};

main();
