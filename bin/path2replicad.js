#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const onml = require('onml');

const dstr2arr = (d) => {
  d = d.split(/\s*,\s*/);
  d = d.flatMap((e) => e.split(/\s+/));
  return d.map((e) => isNaN(e) ? e : parseFloat(e));
};

const path2draw = (d, cfg) => {
  const sx = (val) => val * cfg.sx;
  const sy = (val) => val * cfg.sy; // TODO flip compare to SVG
  let res = '';
  let i = 0;
  let x = 0;
  let y = 0;
  while(i < d.length) {
    switch (d[i]) {
    case 'Z':
    case 'z':
      res += '  .close();\n\n';
      break;
    case 'm':
      x += sx(d[i + 1]);
      y += sy(d[i + 2]);
      res += '  .movePointerTo([' + x + ', ' + -y + '])\n';
      i += 2;
      break;
    case 'M':
      x = sx(d[i + 1]);
      y = sy(d[i + 2]);
      res += '  .movePointerTo([' + x + ', ' + -y + '])\n';
      i += 2;
      break;
    case 'C':
      for (let j = 0; j < 100; j++) {
        res += '  .cubicBezierCurveTo('
          + '[' + sx(d[i + 5]) + ', ' + -sy(d[i + 6]) + '], '
          + '[' + sx(d[i + 1]) + ', ' + -sy(d[i + 2]) + '], '
          + '[' + sx(d[i + 3]) + ', ' + -sy(d[i + 4]) + '])\n';
        x = sx(d[i + 5]);
        y = sy(d[i + 6]);
        i += 6;
        if (typeof d[i + 1] !== 'number') {
          break;
        }
      }
      break;
    case 'c':
      for (let j = 0; j < 100; j++) {
        res += '  .cubicBezierCurveTo('
          + '[' + (x + sx( d[i + 5])) + ', ' + -(y + sy( d[i + 6])) + '], '
          + '[' + (x + sx( d[i + 1])) + ', ' + -(y + sy( d[i + 2])) + '], '
          + '[' + (x + sx( d[i + 3])) + ', ' + -(y + sy( d[i + 4])) + '])\n';
        x += sx(d[i + 5]);
        y += sy(d[i + 6]);
        i += 6;
        if (typeof d[i + 1] !== 'number') {
          // res += '// ' + d[i + 1];
          break;
        }
      }
      break;
    }
    i++;
  }
  return res;
};

const main = async (sx, sy) => {
  const svgPath = path.resolve(__dirname, '..', 'digits.svg');
  const svgStr = await fs.promises.readFile(svgPath, 'utf8');
  const svgMl = onml.parse(svgStr);

  const segGroupMl = svgMl[4].flatMap((e) => !Array.isArray(e) ? [] :
    [{
      id: e[1].id,
      body: e.slice(2).map((seg) => seg[1])
    }]
  );

  // console.log(JSON.stringify(segGroupMl, null, 2));
  let res = '';
  for (const ge of segGroupMl) {
    for (const se of ge.body) {
      res += 'const seg_' + ge.id + '_' + se.id + ' = () => draw()\n';
      res += path2draw(dstr2arr(se.d), {sx, sy});
    }
  }
  console.log(res);

};

main(0.5, 0.5);
