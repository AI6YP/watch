#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const onml = require('onml');
const commander = require('commander');

const dstr2arr = (d) => {
  d = d.split(/\s*,\s*/);
  d = d.flatMap((e) => e.split(/\s+/));
  return d.map((e) => isNaN(e) ? e : parseFloat(e));
};

const r = (val) => Math.round(val * 1000) / 1000;

const lineTo = (o) => {
  return '.lineTo([' + r(o.x) + ', ' + -r(o.y) + '])';
};

const movePointerTo = (o) => {
  return '.movePointerTo([' + r(o.x) + ', ' + -r(o.y) + '])';
};

const point = (x, y) => {
  return '[' + r(x) + ', ' + -r(y) + ']';
};

const cmdf = (cfg, o, d) => {
  const sx = (x) => x * cfg.sx;
  const sy = (y) => y * cfg.sy;
  const d1 = () => d[o.i + 1];
  const d2 = () => d[o.i + 2];
  const d3 = () => d[o.i + 3];
  const d4 = () => d[o.i + 4];
  const d5 = () => d[o.i + 5];
  const d6 = () => d[o.i + 6];
  return {
    z: () => {
      return '.close();';
    },
    Z: () => {
      return '.close();';
    },
    m: () => {
      o.x += sx(d1()); o.y += sy(d2()); o.i += 2; return movePointerTo(o);
    },
    M: () => {
      o.x = sx(d1()); o.y = sy(d2()); o.i += 2; return movePointerTo(o);
    },
    v: () => {
      o.y += sy(d1()); o.i += 1; return lineTo(o);
    },
    V: () => {
      o.y = sy(d1()); o.i += 1; return lineTo(o);
    },
    h: () => {
      o.x += sx(d1()); o.i += 1; return lineTo(o);
    },
    H: () => {
      o.x = sx(d1()); o.i += 1; return lineTo(o);
    },
    l: () => {
      o.x += sx(d1()); o.y += sy(d2()); o.i += 2; return lineTo(o);
    },
    L: () => {
      o.x = sx(d1()); o.y = sy(d2()); o.i += 2; return lineTo(o);
    },
    C: () => {
      o.x = sx(d5()); o.y = sy(d6());
      const res = '.cubicBezierCurveTo('
        + point(o.x, o.y) + ', '
        + point(sx(d1()), sy(d2())) + ', '
        + point(sx(d3()), sy(d4())) + ')';
      o.i += 6;
      return res;
    },
    c: () => {
      const res = '.cubicBezierCurveTo('
        + point(o.x + sx(d5()), o.y + sy(d6())) + ', '
        + point(o.x + sx(d1()), o.y + sy(d2())) + ', '
        + point(o.x + sx(d3()), o.y + sy(d4())) + ')'
      o.x += sx(d5());
      o.y += sy(d6());
      o.i += 6;
      return res;
    },
    A: () => {
      let [rx, ry, xrot, large, sweep, ex, ey] = d.slice(o.i + 1, o.i + 8);
      rx = sx(rx);
      ry = sy(ry);
      ex = sx(ex);
      ey = sy(ey);
      const res = '.ellipseTo('
        + point(ex, ey) + ', '
        + r(rx) + ', ' + r(ry) + ', '
        + xrot + ', '
        + (large === 1) + ', '
        + (sweep === 0) + ')';
      o.x = ex;
      o.y = ey;
      o.i += 7;
      return res;
    },
    a: () => {
      let [rx, ry, xrot, large, sweep, ex, ey] = d.slice(o.i + 1, o.i + 8);
      rx = sx(rx);
      ry = sy(ry);
      ex = sx(ex);
      ey = sy(ey);
      const res = '.ellipseTo('
        + point(o.x + ex, o.y + ey) + ', '
        + r(rx) + ', ' + r(ry) + ', '
        + xrot + ', '
        + (large === 1) + ', '
        + (sweep === 0) + ')';
      o.x += ex;
      o.y += ey;
      o.i += 7;
      return res;
    }
  };
};


const path2draw = (d, cfg) => {
  let res = '';
  const o = {x: 0, y: 0, i: 0};
  const cmdo = cmdf(cfg, o, d);
  while(o.i < d.length) {
    const cmd = d[o.i];
    for (let j = 0; j < 100; j++) {
      const fn = cmdo[cmd];
      if (!fn) {
        console.log('unknown cmd', cmd);
        break;
      }
      res += '  ' + fn() + ' // ' + cmd + '\n';
      if (typeof d[o.i + 1] !== 'number') {
        break;
      }
      res += '  ';
    }
    o.i += 1;
  }
  return res;
};

const main = async () => {
  const program = new commander.Command();
  program
    .requiredOption('-i, --input <file>', 'input SVG file')
    .option('-o, --output <file>', 'output file', 'out.js')
    .option('--sx <n>', 'scale x', parseFloat, 0.5)
    .option('--sy <n>', 'scale y', parseFloat, 0.5)
    .parse(process.argv);

  const opts = program.opts();
  opts.input = path.resolve(opts.input);
  opts.output = path.resolve(opts.output);
  const svgStr = await fs.promises.readFile(opts.input, 'utf8');
  const svgMl = onml.parse(svgStr);

  const segGroupMl = svgMl[4].flatMap((e) => !Array.isArray(e) ? [] :
    [{
      id: e[1].id,
      body: e.slice(2).map((seg) => seg[1])
    }]
  );

  let res = '';
  for (const ge of segGroupMl) {
    for (const se of ge.body) {
      res += 'const seg_' + ge.id + '_' + se.id + ' = () => draw()\n';
      res += path2draw(dstr2arr(se.d), opts);
    }
  }
  if (opts.output) {
    await fs.promises.writeFile(opts.output, res);
  } else {
    console.log(res);
  }
};

main();
