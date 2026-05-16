#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');

const range = require('lodash.range');
const neghero = require('neghero');

const pcbHeader = () => `\
(kicad_pcb
  (version 20260206)
  (generator "pcbnew")
  (generator_version "10.0")
  (general
    (thickness 0.6)
    (legacy_teardrops no)
  )
  (paper "A4")
  (layers
    (0 "F.Cu" signal)
    (2 "B.Cu" signal)
    (9 "F.Adhes" user "F.Adhesive")
    (11 "B.Adhes" user "B.Adhesive")
    (13 "F.Paste" user)
    (15 "B.Paste" user)
    (5 "F.SilkS" user "F.Silkscreen")
    (7 "B.SilkS" user "B.Silkscreen")
    (1 "F.Mask" user)
    (3 "B.Mask" user)
    (17 "Dwgs.User" user "User.Drawings")
    (19 "Cmts.User" user "User.Comments")
    (21 "Eco1.User" user "User.Eco1")
    (23 "Eco2.User" user "User.Eco2")
    (25 "Edge.Cuts" user)
    (27 "Margin" user)
    (31 "F.CrtYd" user "F.Courtyard")
    (29 "B.CrtYd" user "B.Courtyard")
    (35 "F.Fab" user)
    (33 "B.Fab" user)
    (39 "User.1" user)
    (41 "User.2" user)
    (43 "User.3" user)
    (45 "User.4" user)
  )
  (setup
    (stackup
      (layer "F.SilkS"
        (type "Top Silk Screen")
        (color "Black")
      )
      (layer "F.Paste"
        (type "Top Solder Paste")
      )
      (layer "F.Mask"
        (type "Top Solder Mask")
        (color "#808080CC")
        (thickness 0.01)
      )
      (layer "F.Cu"
        (type "copper")
        (thickness 0.035)
      )
      (layer "dielectric 1"
        (type "core")
        (color "FR4 natural")
        (thickness 0.51)
        (material "FR4")
        (epsilon_r 4.5)
        (loss_tangent 0.02)
      )
      (layer "B.Cu"
        (type "copper")
        (thickness 0.035)
      )
      (layer "B.Mask"
        (type "Bottom Solder Mask")
        (color "#808080CC")
        (thickness 0.01)
      )
      (layer "B.Paste"
        (type "Bottom Solder Paste")
      )
      (layer "B.SilkS"
        (type "Bottom Silk Screen")
        (color "Black")
      )
      (copper_finish "None")
      (dielectric_constraints no)
    )
    (pad_to_mask_clearance 0)
    (allow_soldermask_bridges_in_footprints no)
    (tenting front back)
    (pcbplotparams
      (layerselection 0x00000000_00000000_55555555_5755f5ff)
      (plot_on_all_layers_selection 0x00000000_00000000_00000000_00000000)
      (disableapertmacros no)
      (usegerberextensions no)
      (usegerberattributes yes)
      (usegerberadvancedattributes yes)
      (creategerberjobfile yes)
      (dashed_line_dash_ratio 12.000000)
      (dashed_line_gap_ratio 3.000000)
      (svgprecision 4)
      (plotframeref no)
      (mode 1)
      (useauxorigin no)
      (hpglpennumber 1)
      (hpglpenspeed 20)
      (hpglpendiameter 15.000000)
      (pdf_front_fp_property_popups yes)
      (pdf_back_fp_property_popups yes)
      (pdf_metadata yes)
      (pdf_single_document no)
      (dxfpolygonmode yes)
      (dxfimperialunits yes)
      (dxfusepcbnewfont yes)
      (psnegative no)
      (psa4output no)
      (plot_black_and_white yes)
      (plotinvisibletext no)
      (sketchpadsonfab no)
      (plotpadnumbers no)
      (hidednponfab no)
      (sketchdnponfab yes)
      (crossoutdnponfab yes)
      (subtractmaskfromsilk no)
      (outputformat 1)
      (mirror no)
      (drillshape 1)
      (scaleselection 1)
      (outputdirectory "")
    )
  )
  (net 0 "")
`;

const pcbFooter = () => `
  (embedded_fonts no)
)
`;

const euclidianDistance = (c, p0, p1, p2) => {
  const d0 = (p0.x - c.x) ** 2 + (p0.y - c.y) ** 2;
  const d1 = (p1.x - c.x) ** 2 + (p1.y - c.y) ** 2;
  const d2 = (p2.x - c.x) ** 2 + (p2.y - c.y) ** 2;
  console.log(d0 - d1, d1 - d2);
};

const cCenter = (p0, p1, p2) => {
  const p01 = {
    x: (p1.x + p0.x) / 2,
    y: (p1.y + p0.y) / 2,
    dx: p1.x - p0.x,
    dy: p1.y - p0.y
  };
  p01.slope = p01.dy / p01.dx;
  const p12 = {
    x: (p2.x + p1.x) / 2,
    y: (p2.y + p1.y) / 2,
    dx: p2.x - p1.x,
    dy: p2.y - p1.y
  };
  p12.slope = p12.dy / p12.dx;
  const p20 = {
    dy: p0.y - p2.y
  };

  const center = {x: (
    (p01.slope * p12.slope * p20.dy / 2 + p12.slope * p01.x - p01.slope * p12.x)
    / (p12.slope - p01.slope)
  )};
  center.y = (p01.x - center.x) / p01.slope + p01.y;
  return center;
};


const grArc = (pos) => {
  if (pos?.obstacles === undefined) {
    return `
  (gr_arc
    (start ${pos.start.x.toFixed(2)} ${pos.start.y.toFixed(2)})
    (mid ${pos.mid.x.toFixed(2)} ${pos.mid.y.toFixed(2)})
    (end ${pos.end.x.toFixed(2)} ${pos.end.y.toFixed(2)})
    (stroke (width ${pos.width || 0.2}) (type solid))
    (layer "${pos.layer}")
  )`;
  }
  const center = cCenter(pos.start, pos.mid, pos.end);
  const radius = Math.sqrt((pos.start.y - center.y) ** 2 + (pos.start.x - center.x) ** 2);
  let astart = Math.atan2(pos.start.y - center.y, pos.start.x - center.x);
  let aend = Math.atan2(pos.end.y - center.y, pos.end.x - center.x);
  // [astart, aend] = (astart > aend) ? [aend, astart] : [astart, aend];
  if (aend < astart) {
    aend += Math.PI * 2;
  }
  const fullAngle = aend - astart;
  const points = [];
  for (let i = 0; i <= 90; i += 1) {
    const a = astart + i * fullAngle / 90;
    points.push({
      x: radius *  Math.cos(a) + center.x,
      y: radius *  Math.sin(a) + center.y
    });
  }
  points.map((point, idx) => { point.idx = idx; });
  pos.obstacles.map((o) =>
    points.map((p, idx) => {
      if (
        p &&
        (p.x > o.start.x) && (p.y > o.start.y) &&
        (p.x < o.end.x)   && (p.y < o.end.y)
      ) {
        points[idx] = null;
      }
    })
  );
  return points.flatMap((point, idx, arr) => {
    const from = arr[idx - 1];
    if (!(from && point)) {
      return [];
    }
    return [grLine({start: arr[idx - 1], end: point, layer: pos.layer})];
  }).join('');
};

const grCircle = (pos) => `
  (gr_circle
    (center ${pos.center.x} ${pos.center.y})
    (end ${pos.end.x} ${pos.end.y})
    (stroke (width 0.2) (type default))
    (fill ${pos.fill ? 'yes' : 'no'})
    (layer "${pos.layer}")
  )`;

const grRect = ({start, end, layer, fill, stroke}) => `
  (gr_rect
    (start ${start.x} ${start.y})
    (end ${end.x} ${end.y})
    (stroke (width ${stroke?.width || 0.05}) (type default))
    (fill ${fill ? 'yes' : 'no'})
    (layer "${layer}")
  )`;

const grLine = (pos) => `
  (gr_line
    (start ${pos.start.x} ${pos.start.y})
    (end ${pos.end.x} ${pos.end.y})
    (stroke (width 0.2) (type default))
    (layer "${pos.layer}")
  )`;

const grText = (pos) => `
  (gr_text "${pos.text}"
    (at ${pos.at.x} ${pos.at.y} ${pos.at.angle || ''})
    (layer "${pos.layer}")
    (effects (font (face "${pos.font.face}") (size ${pos.font.size || 1.5} ${pos.font.size || 1.5}) (thickness ${pos.font.thickness || 0.2})))
  )`;

const via = (pos) => `
  (via
    (at ${pos.at.x} ${pos.at.y})
    (size ${pos.size})
    (drill ${pos.drill})
    (layers ${pos.layers.map((layer) => '"' + layer + '"').join(' ')})
    (tenting none)
    (net 0)
  )`;

const pcbEdge = ({center, r1, r2, r3}) => [
  grCircle({
    center,
    end: {x: center.x + r2, y: center.y},
    layer: 'Edge.Cuts'
  }),
  grCircle({
    center,
    end: {x: center.x + 2.88 / 2, y: center.y},
    layer: 'Edge.Cuts'
  }),


  // via({
  //   at: {x: center.x + 9.672, y: center.y - 8.667},
  //   size: 1, drill: 0.54,
  //   layers: ['F.Cu', 'B.Cu']
  // }),
  // via({
  //   at: {x: center.x - 9.466, y: center.y + 8.93},
  //   size: 1, drill: 0.54,
  //   layers: ['F.Cu', 'B.Cu']
  // }),
  // via({ // date window
  //   at: {
  //     x: center.x + 10.55 * Math.cos(2 * Math.PI * 0 / 31),
  //     y: center.y + 10.55 * Math.sin(2 * Math.PI * 0 / 31)
  //   },
  //   size: 4, drill: 3,
  //   layers: ['F.Cu', 'B.Cu']
  // }),
  // grRect({
  //   start: {x: center.x + 10.55 - 2.9 / 2, y: center.y - 2 / 2},
  //   end:   {x: center.x + 10.55 + 2.9 / 2, y: center.y + 2 / 2},
  //   layer: 'Edge.Cuts'
  // }),
  `
  (gr_poly
    (pts
      ${range(361).map((a) => `(xy ${
    (r1 *  Math.sin(Math.PI * a / 180) + center.x).toFixed(2)
  } ${
    (r1 * -Math.cos(Math.PI * a / 180) + center.y).toFixed(2)
  })`).join(' ')}
      ${range(361).map((a) => `(xy ${
    (r3 *  Math.sin(Math.PI * -a / 180) + center.x).toFixed(2)
  } ${
    (r3 * -Math.cos(Math.PI * -a / 180) + center.y).toFixed(2)
  })`).join(' ')}
    )
    (stroke (width 0) (type solid))
    (fill yes)
    (layer "F.Mask")
  )`
];

const smithPos = (re, im) => {
  const alfa = 2 * Math.atan(im / re);
  const x = re * (Math.cos(alfa) - 1);
  const y = re * Math.sin(alfa);
  return [x, -y];
};

const obstacles = [
  {start: {x: 47.0, y: 42.0}, end: {x: 53.0, y: 45.0}},
  {start: {x: 44.1, y: 56.3}, end: {x: 56.1, y: 58.1}},
  {start: {x: 49.3, y: 55.0}, end: {x: 50.7, y: 57.0}}
];

const smithReLine = (cfg) => (x, y0, y1) => {
  y0 = Number(y0.toFixed(5));
  y1 = Number(y1.toFixed(5));
  x  = Number(x.toFixed(5));
  if ((x === -1) || (y0 === 0) || (y1 === 0)) {
    return '';
  }
  const r = cfg.radius;
  const cx = cfg.center.x;
  const cy = cfg.center.y;
  x = r / (1 + x);
  let y2 = (y0 + y1) / 2;
  y0 = r / y0;
  y1 = r / y1;
  y2 = r / y2;
  // const r = x;
  const [xs, ys] = smithPos(x, y1);
  const [xm, ym] = smithPos(x, y2);
  const [xe, ye] = smithPos(x, y0);
  // const flag = (x > y0) ? 1 : 0;
  return grArc({
    start:  {x: xs + cx + r, y: ys + cy},
    mid:    {x: xm + cx + r, y: ym + cy},
    end:    {x: xe + cx + r, y: ye + cy},
    obstacles,
    layer:  'F.Cu'
  });
};

const smithImLine = (cfg) => (x0, x1, y) => {
  y  = Number(y.toFixed(5));
  x0 = Number(x0.toFixed(5));
  x1 = Number(x1.toFixed(5));
  if ((y === 0) || (x0 === -1) || (x1 === -1)) {
    return '';
  }
  const r = cfg.radius;
  const cx = cfg.center.x;
  const cy = cfg.center.y;
  x0 = 1 / (1 + x0);
  x1 = 1 / (1 + x1);
  y = cfg.radius / y;
  // const r0 = Math.abs(y);
  const r1 = r * x0;
  const r2 = r * x1;
  const r3 = (r1 + r2) / 2;
  // const sweep = (y > 0) ? 1 : 0;
  const [xs, ys] = smithPos(r2, y);
  const [xm, ym] = smithPos(r3, y);
  const [xe, ye] = smithPos(r1, y);
  const from = {x: xs + cx + r, y: ys + cy};
  const to = {x: xe + cx + r, y: ye + cy};
  return grArc({
    start:  (y < 0) ? to : from,
    mid:    {x: xm + cx + r, y: ym + cy},
    end:    (y < 0) ? from : to,
    obstacles,
    layer:  'F.Cu'
  });
};

const smithChart = (cfg) => [
  grCircle({
    ...cfg,
    end: {x: cfg.center.x + cfg.radius, y: cfg.center.y},
    layer: 'F.Cu'
  }),
  grLine({
    start: {x: cfg.center.x - cfg.radius, y: cfg.center.y},
    end: {x: cfg.center.x + cfg.radius, y: cfg.center.y},
    layer: 'F.Cu'
  }),
  ...[
    ...range(0, 0.3, 0.05).map((e) => [e, 0.3, -0.3]),
    ...range(0, 1, 0.1).map((e) => [e, 1, -1]),
    ...range(0, 2, 0.2).map((e) => [e, 2, -2]),
    ...range(1, 4, 1).map((e) => [e, 5, -5]),
    [5, 10, -10],
    [10, 20, -20],
    [20, 20, -20]
  ].map((pos) => smithReLine(cfg)(...pos)),
  ...[
    ...range(-0.3, 0.3, 0.05).map((e) => [0, 0.3, e]),
    ...range(-1, 1, .1).map((e) => [0, 1, e]),
    ...range(-2, 2, .2).map((e) => [0, 2, e]),
    ...range(-4, 4.1, 1).map((e) => [0, 5, e]),
    [0, 10, -5],  [0, 10, 5],
    [0, 20, -10], [0, 20, 10],
    [0, 20, -20], [0, 20, 20]
  ].map((pos) => smithImLine(cfg)(...pos))
].join('\n');

const hmark = ({x, y, a, size1, size2, drill1, drill2}) => `
  (footprint "AI6YP:hmark"
    (layer "F.Cu")
    (at ${x} ${y} 0)
    (descr "generated")
    (tags "watch")
    (attr smd)
    (pad "1" thru_hole oval
      (at 0 0 ${-a})
      (size ${size1 || 1.4} ${size2 || 3.6})
      (drill oval ${drill1 || 0.8} ${drill2 || 3.0})
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (embedded_fonts no)
  )`;

const hmarkDot = ({x, y, a, drill, size}) => `
  (footprint "AI6YP:hmark_dot"
    (layer "F.Cu")
    (at ${x} ${y} 0)
    (descr "generated")
    (tags "watch")
    (attr smd)
    (pad "1" thru_hole oval
      (at 0 0 ${-(a || 0)})
      (size ${size || 1.4} ${size || 1.4})
      (drill oval ${drill || 0.8} ${drill || 0.8})
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (embedded_fonts no)
  )`;

const hexHole = ({center, r}) => `
(footprint "AI6YP:hex_hole" (layer "F.Cu")
  (attr through_hole)
  (fp_poly
    (pts ${[0, 1, 2, 3, 4, 5].map((i) =>
    `(xy ${(Math.cos(i * Math.PI / 3) * r + center.x).toFixed(2)} ${(Math.sin(i * Math.PI / 3) * r + center.y).toFixed(2)})`
  ).join(' ')})
    (stroke (width 0.05) (type solid)) (fill none) (layer "Edge.Cuts")
  )
  (pad "1" thru_hole custom (at 0 0) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask")
    (options (clearance outline) (anchor circle))
    (primitives
      (gr_poly
        (pts ${[0, 1, 2, 3, 4, 5].map((i) =>
    `(xy ${(Math.cos(i * Math.PI / 3) * (r + 0.3) + center.x).toFixed(2)} ${(Math.sin(i * Math.PI / 3) * (r + 0.2) + center.y).toFixed(2)})`
  ).join(' ')})
        (width 0) (fill yes)
      )
    )
  )
)
  `;

const hmarkAnt = ({x, y}) => `
  (footprint "AI6YP:hmark_ant"
    (layer "F.Cu")
    (at ${x} ${y} 0)
    (descr "generated")
    (tags "watch")
    (attr smd)
    (pad "1" thru_hole oval
      (at 0 3 0)
      (size 1.2 6.2)
      (drill oval 0.6 5.6)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (pad "2" thru_hole oval
      (at -1.2 2 35)
      (size 1.2 4.8)
      (drill oval 0.6 4.2)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (pad "3" thru_hole oval
      (at 1.2 2 -35)
      (size 1.2 4.8)
      (drill oval 0.6 4.2)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (embedded_fonts no)
  )`;

const hmarkGnd = ({x, y}) => `
  (footprint "AI6YP:hmark_gnd"
    (layer "F.Cu")
    (at ${x} ${y} 0)
    (descr "generated")
    (tags "watch")
    (attr smd)
    (pad "1" thru_hole oval
      (at 0 -4.5 0)
      (size 1.2 3.2)
      (drill oval 0.6 2.6)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (pad "2" thru_hole oval
      (at 0 -3.5 90)
      (size 1.2 5.4)
      (drill oval 0.6 4.8)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (pad "3" thru_hole oval
      (at 0 -2 90)
      (size 1.2 3.6)
      (drill oval 0.6 3.0)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (pad "4" thru_hole oval
      (at 0 -0.5 90)
      (size 1.2 1.8)
      (drill oval 0.6 1.2)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (embedded_fonts no)
  )`;

const dateWindow = ({x, y}) => `
(footprint "AI6YP:dateWindow"
  (layer "F.Cu")
  (at ${x} ${y} 0)
  (descr "generated")
  (tags "watch")
  (attr smd)
  (pad "1" thru_hole oval
    (at 0 0 90)
    (size 2.6 3.8)
    (drill oval 2.2 3.4)
    (layers "*.Cu" "*.Mask")
    (remove_unused_layers no)
  )
  (embedded_fonts no)
)`;

const radioDiamond = () => {
  const r = 5.5;
  const l = -5;
  const t = -4;
  const b = 4;
  return `\
  (footprint "AI6YP:RadioDiamond"
    (layer "F.Cu")
    (at 50 50)
    (attr smd)
    (fp_line (start  0   -9  ) (end  0   -8  ) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start  0 ${t-1}) (end  0   ${t}) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start  0 ${b+1}) (end  0   ${b}) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start  0    9  ) (end  0    8  ) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${l} ${t}) (end ${r} ${t}) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${l} ${b}) (end ${r} ${b}) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))

    (fp_arc  (start ${l} -4) (mid  ${l-1} -3  ) (end  ${l} -2) (stroke (width 0.2) (type solid)) (layer "F.SilkS"))
    (fp_arc  (start ${l} -2) (mid  ${l-1} -0.7) (end  ${l}  0) (stroke (width 0.2) (type solid)) (layer "F.SilkS"))
    (fp_arc  (start ${l}  0) (mid  ${l-1}  0.7) (end  ${l}  2) (stroke (width 0.2) (type solid)) (layer "F.SilkS"))
    (fp_arc  (start ${l}  2) (mid  ${l-1}  3  ) (end  ${l}  4) (stroke (width 0.2) (type solid)) (layer "F.SilkS"))

    (fp_line (start ${r}   -4  ) (end ${r}   -0.5) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${r+2} -0.5) (end ${r-2} -0.5) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${r+2}  0.5) (end ${r-2}  0.5) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${r}    4  ) (end ${r}    0.5) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${r-2}  2  ) (end ${r+2}  -2 ) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${r+2} -2  ) (end ${r+1.2+.2}  ${-1.2+.2} ) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start ${r+2} -2  ) (end ${r+1.2-.2}  ${-1.2-.2} ) (stroke (width 0.2) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))

    (embedded_fonts no)
  )`
};

const text24 = ({radius, center}) => [
  // even 12 hour numbers
  ...[0, 2, 4, 6, 8, 10].flatMap(idx => {
    const digits = idx.toString().split('');
    const kerning = 2.1;
    return digits.map((digit, i, arr) => grText({
      text: digit,
      at: {
        x: ((radius - 2.8) *  Math.sin(Math.PI * (idx / 6)) + center.x + kerning * (-(arr.length - 1) / 2 + i)).toFixed(2),
        y: ((radius - 2.8) * -Math.cos(Math.PI * (idx / 6)) + center.y + 0.0).toFixed(2),
        // angle: (((f ? 12 : 24) - idx) * 360 / 24).toFixed(2)
      },
      font: {face: 'Baloo 2', size: 4.2},
      layer: 'F.SilkS'
    }));
  }),
  // odd 24 hour numbers
  ...[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23].map(idx => {
    const f = (idx > 6) && (idx < 18);
    return grText({
      text: idx,
      at: {
        x: ((radius - 1.0 + (f ? .3 : 0)) *  Math.sin(Math.PI * (idx / 12)) + center.x).toFixed(2),
        y: ((radius - 1.0 + (f ? .3 : 0)) * -Math.cos(Math.PI * (idx / 12)) + center.y).toFixed(2),
        angle: (((f ? 12 : 24) - idx) * 360 / 24).toFixed(2)
      },
      font: {face: 'Iosevka', size: 1.3},
      layer: 'F.SilkS'
    });
  }),
  // // 1,3,5,6,...23 around
  // ...[...range(1, 12), ...range(13, 24)].map(idx => {
  //   const f = (idx > 6) && (idx < 18);
  //   return grText({
  //     text: idx,
  //     at: {
  //       x: ((radius + (f ? .3 : 0)) *  Math.sin(Math.PI * (idx / 12)) + center.x).toFixed(2),
  //       y: ((radius + (f ? .3 : 0)) * -Math.cos(Math.PI * (idx / 12)) + center.y).toFixed(2),
  //       angle: (((f ? 12 : 24) - idx) * 360 / 24).toFixed(2)
  //     },
  //     font: {face: 'Iosevka'},
  //     layer: 'F.SilkS'
  //   });
  // }),
  // // dots 2,4,6,8,10,12,14,16,18,20,22,24 around
  // ...range(1.5, 23, 1).map(idx => grLine({
  //   start: {
  //     x: ((radius + .2) *  Math.sin(Math.PI * (idx / 12)) + center.x).toFixed(2),
  //     y: ((radius + .2) * -Math.cos(Math.PI * (idx / 12)) + center.y).toFixed(2),
  //   },
  //   end: {
  //     x: ((radius + .1) *  Math.sin(Math.PI * (idx / 12)) + center.x).toFixed(2),
  //     y: ((radius + .1) * -Math.cos(Math.PI * (idx / 12)) + center.y).toFixed(2),
  //   },
  //   layer: 'F.SilkS'
  // })),
  // minute marks
  ...[...range(1, 60)].flatMap((idx) => !(idx % 5) ? [] : [grLine({
    start: {
      x: ((radius + 0.2) *  Math.sin(Math.PI * (idx / 30)) + center.x).toFixed(2),
      y: ((radius + 0.2) * -Math.cos(Math.PI * (idx / 30)) + center.y).toFixed(2),
    },
    end: {
      x: ((radius + 0.9) *  Math.sin(Math.PI * (idx / 30)) + center.x).toFixed(2),
      y: ((radius + 0.9) * -Math.cos(Math.PI * (idx / 30)) + center.y).toFixed(2),
    },
    layer: 'F.SilkS'
  })]),
  // hour marks
  ...[1, 5, 7, 9, 11].map((idx) => hmark({
    x: ((radius - 2) *  Math.sin(Math.PI * (idx / 6)) + center.x).toFixed(2),
    y: ((radius - 2) * -Math.cos(Math.PI * (idx / 6)) + center.y).toFixed(2),
    a: idx * 30,
    size1: 1.4, size2: 4.8,
    drill1: 1.0, drill2: 4.4
  })),
  ...[3].map((idx) => hmark({
    x: ((radius - 1) *  Math.sin(Math.PI * (idx / 6)) + center.x).toFixed(2),
    y: ((radius - 1) * -Math.cos(Math.PI * (idx / 6)) + center.y).toFixed(2),
    a: idx * 30,
    size1: 1.4, size2: 2.8,
    drill1: 1.0, drill2: 2.4
  })),
  // even 12 hour dots
  ...[0, 2, 4, 6, 8, 10].map((idx) => hmarkDot({
    x: ((radius + 0.2) *  Math.sin(Math.PI * (idx / 6)) + center.x).toFixed(2),
    y: ((radius + 0.2) * -Math.cos(Math.PI * (idx / 6)) + center.y).toFixed(2),
    a: idx * 30,
    drill: 1.2,
    size: 1.8
  })),
  // // Antenna 0 hour mark
  // hmarkAnt({
  //   x: (center.x).toFixed(2),
  //   y: (center.y - radius).toFixed(2)
  // }),
  // // Ground 6 hour mark
  // hmarkGnd({
  //   x: (center.x).toFixed(2),
  //   y: (center.y + radius).toFixed(2)
  // }),
  // dateWindow({
  //   x: center.x + 10.55,
  //   y: center.y
  // }),
  // // 6-18 Hour day Arc
  // grArc({
  //   start:  {x: 65.2, y: 50},
  //   mid:    {x: 50,   y: 65.2},
  //   end:    {x: 34.8, y: 50},
  //   width: 2,
  //   layer:  'F.Cu'
  // })
];

const labels = ({center}) => [
  // grRect({
  //   start: {x: 48.0, y: 43.2},
  //   end:   {x: 52.0, y: 43.8},
  //   stroke: {width: 2},
  //   layer: 'F.Cu', fill: true
  // }),
  grText({
    text: '50Ω',
    at: {x: center.x, y: center.y - 6.3},
    font: {face: 'Adwaita Sans', size: 2},
    layer: 'F.Cu'
  }),
  grText({
    text: '50Ω',
    at: {x: center.x, y: center.y - 6.3},
    font: {face: 'Adwaita Sans', size: 2},
    layer: 'F.SilkS'
  }),
  // grRect({
  //   start: {x: 44.0, y: 56.6},
  //   end:   {x: 56.0, y: 57.7},
  //   stroke: {width: 1},
  //   layer: 'F.Cu', fill: true
  // }),
  grText({
    text: 'Арктик',
    at: {x: center.x, y: center.y + 6.5},
    font: {face: 'Adwaita Sans', size: 1.4},
    layer: 'F.Cu'
  }),
  grText({
    text: 'Арктик',
    at: {x: center.x, y: center.y + 6.5},
    font: {face: 'Adwaita Sans', size: 1.4},
    layer: 'F.SilkS'
  }),
  // grText({
  //   text: 'A',
  //   at: {x: center.x, y: center.y + 6.9},
  //   font: {face: 'Roboto Mono', size: 2.5},
  //   layer: 'F.Cu'
  // }),
  // grText({
  //   text: 'A',
  //   at: {x: center.x, y: center.y + 6.9},
  //   font: {face: 'Roboto Mono', size: 2.5},
  //   layer: 'F.Mask'
  // })
];

const main = async () => {
  const pcbFilePathOnly = path.resolve(__dirname, '..', 'dial-polarnik-v1.0.0');

  try {
    await fs.promises.access(pcbFilePathOnly);
  } catch (error) {
    await fs.promises.mkdir(pcbFilePathOnly);
  }

  const pcbFilePath = path.resolve(pcbFilePathOnly, 'dial-polarnik-v1.0.0.kicad_pcb');

  const center = {x: 50, y: 50};
  const pcbFileBody = [
    pcbHeader(),
    ...pcbEdge({r1: 32.4 / 2, r2: 33.8 / 2, r3: 40 / 2, center}),
    // smithChart({radius: 14, center}),
    ...text24({radius: 15, center}),
    // radioDiamond(),

    // clean bottom side
    grCircle({center, end: {x: center.x + 17, y: center.y}, layer: 'B.Mask', fill: true}),

    ...labels({center}),
    ...neghero.kicad({
      tree: [5, [5, [4, [4, [9, [18, [4, [10, [6, [6, 4, 3], 6], 1], [10, [4, 3, 1], 4]], 3], [8, [5, 3, 1], [4, 1, 1]]], 5], 4], 3], 4],
      s: 1,
      l: 5,
      p: 0.2,
      center
    }),
    ...hexHole({center: {x: center.x + 10.55, y: center.y}, r: 1.6}),
    // feets
    hmarkDot({x: center.x + 9.672, y: center.y - 8.667, drill: 0.62, size: 1}),
    hmarkDot({x: center.x - 9.466, y: center.y + 8.93, drill: 0.62, size: 1}),

    pcbFooter()
  ].join('');
  await fs.promises.writeFile(pcbFilePath, pcbFileBody);
};

main();
