#!/usr/bin/env node
'use strict';

const onml = require('onml');
const fs = require('fs');


const polar2cartesian = (r, a) => {
  return [
    Math.round(r * Math.cos(a) * 1000) / 1000,
    Math.round(r * Math.sin(a) * 1000) / 1000
  ];
};

const main = async () => {

  const r1 = 34 / 2 - 0.3; // outer radius
  const r0 = 26.8 / 2 + 0.2; // inner radius
  const d = ['M', ...polar2cartesian(r1, 0)];
  for (let i = 0; i < 30; i++) {
    const a0 = i          * Math.PI / 15;
    const a1 = (i + 0.5)  * Math.PI / 15;
    const a2 = (i + 1)    * Math.PI / 15;
    d.push(
      'L', ...polar2cartesian(r1, a0),
      'L', ...polar2cartesian(r0, a0),
      'L', ...polar2cartesian(r0, a1),
      'L', ...polar2cartesian(r1, a1)
    );
    if (i < 29) {
      d.push(
        'L', ...polar2cartesian(r1, a2)
      );
    }
  }

  const pathOpts = {
    id: 'path0',
    fill: 'none',
    stroke: 'black',
    'stroke-width': 0.4,
    style: 'stroke-linejoin: round;',
    d: d.join(' ')
  };
  const body = ['g', ['g', onml.tt(20, 20, {id: 'g0'}), ['path', pathOpts]]];
  const svg = [...onml.gen.svg(40, 40), body];
  const svgStr = onml.stringify(svg, 2);
  fs.promises.writeFile('meandr-v0.1.0.svg', svgStr, 'utf8');
};

main();
