#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');

const range = require('lodash.range');

const { writeFile, mkdir, access } = fs.promises;

const pcbHeader = () => `\
(kicad_pcb
  (version 20241229)
  (generator "pcbnew")
  (generator_version "9.0")
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
      )
      (layer "F.Paste"
        (type "Top Solder Paste")
      )
      (layer "F.Mask"
        (type "Top Solder Mask")
        (thickness 0.01)
      )
      (layer "F.Cu"
        (type "copper")
        (thickness 0.035)
      )
      (layer "dielectric 1"
        (type "core")
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
        (thickness 0.01)
      )
      (layer "B.Paste"
        (type "Bottom Solder Paste")
      )
      (layer "B.SilkS"
        (type "Bottom Silk Screen")
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

const grArc = (pos) => `
  (gr_arc
    (start ${pos.start.x.toFixed(2)} ${pos.start.y.toFixed(2)})
    (mid ${pos.mid.x.toFixed(2)} ${pos.mid.y.toFixed(2)})
    (end ${pos.end.x.toFixed(2)} ${pos.end.y.toFixed(2)})
    (stroke (width ${pos.width || 0.2}) (type solid))
    (layer "${pos.layer}")
  )`;

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
  grCircle({
    center: {x: center.x + 9.672,       y: center.y - 8.667},
    end:    {x: center.x + 9.672 + 1.5,  y: center.y - 8.667},
    layer: 'B.Cu', fill: true
  }),
  grCircle({
    center: {x: center.x - 9.466,        y: center.y + 8.93},
    end:    {x: center.x - 9.466 + 1.5,  y: center.y + 8.93},
    layer: 'B.Cu', fill: true
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
  via({
    at: {x: center.x + 10.55, y: center.y},
    size: 4, drill: 3,
    layers: ['F.Cu', 'B.Cu']
  }),
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
  const [xs, ys] = smithPos(x, y0);
  const [xm, ym] = smithPos(x, y2);
  const [xe, ye] = smithPos(x, y1);
  // const flag = (x > y0) ? 1 : 0;
  return grArc({
    start:  {x: xs + cx + r, y: ys + cy},
    mid:    {x: xm + cx + r, y: ym + cy},
    end:    {x: xe + cx + r, y: ye + cy},
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
  return grArc({
    start:  {x: xs + cx + r, y: ys + cy},
    mid:    {x: xm + cx + r, y: ym + cy},
    end:    {x: xe + cx + r, y: ye + cy},
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

const hmark = ({x, y, a}) => `
  (footprint "AI6YP:hmark"
    (layer "F.Cu")
    (at ${x} ${y} 0)
    (descr "generated")
    (tags "watch")
    (attr smd)
    (pad "1" thru_hole oval
      (at 0 0 ${-a})
      (size 1.4 3.6)
      (drill oval 0.8 3.0)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (embedded_fonts no)
  )`;

const hmarkDot = ({x, y, a}) => `
  (footprint "AI6YP:hmark_dot"
    (layer "F.Cu")
    (at ${x} ${y} 0)
    (descr "generated")
    (tags "watch")
    (attr smd)
    (pad "1" thru_hole oval
      (at 0 0 ${-a})
      (size 1.4 1.4)
      (drill oval 0.8 0.8)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
    )
    (embedded_fonts no)
  )`;

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

const radioDiamond = () => `\
  (footprint "AI6YP:RadioDiamond"
    (layer "F.Cu")
    (at 50 50)
    (attr smd)
    (fp_line (start  0   -9  ) (end  0   -8  ) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start  0   -5  ) (end  0   -4  ) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start  0    5  ) (end  0    4  ) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start  0    9  ) (end  0    8  ) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start -4   -4  ) (end  4   -4  ) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start -4    4  ) (end  4    4  ) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))

    (fp_line (start -4   -4  ) (end -4   -0.7) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start -6   -0.7) (end -2   -0.7) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start -6    0.7) (end -2    0.7) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))
    (fp_line (start -4    4  ) (end -4    0.7) (stroke (width 0.3) (type solid) (color 68 68 68 1)) (layer "F.SilkS"))

    (fp_arc  (start  4   -4  ) (mid  5   -3  ) (end  4   -2  ) (stroke (width 0.3) (type solid)) (layer "F.SilkS"))
    (fp_arc  (start  4   -2  ) (mid  5   -0.7) (end  4    0  ) (stroke (width 0.3) (type solid)) (layer "F.SilkS"))
    (fp_arc  (start  4    0  ) (mid  5    0.7) (end  4    2  ) (stroke (width 0.3) (type solid)) (layer "F.SilkS"))
    (fp_arc  (start  4    2  ) (mid  5    3  ) (end  4    4  ) (stroke (width 0.3) (type solid)) (layer "F.SilkS"))
    (embedded_fonts no)
  )`;

const text24 = ({radius, center}) => [
  ...[...range(1, 12), ...range(13, 24)].map(idx => {
    const f = (idx > 6) && (idx < 18);
    return grText({
      text: idx,
      at: {
        x: ((radius + (f ? .3 : 0)) *  Math.sin(Math.PI * (idx / 12)) + center.x).toFixed(2),
        y: ((radius + (f ? .3 : 0)) * -Math.cos(Math.PI * (idx / 12)) + center.y).toFixed(2),
        angle: (((f ? 12 : 24) - idx) * 360 / 24).toFixed(2)
      },
      font: {face: 'Iosevka'},
      layer: 'F.SilkS'
    });
  }),
  ...range(1.5, 23, 1).map(idx => grLine({
    start: {
      x: ((radius + .2) *  Math.sin(Math.PI * (idx / 12)) + center.x).toFixed(2),
      y: ((radius + .2) * -Math.cos(Math.PI * (idx / 12)) + center.y).toFixed(2),
    },
    end: {
      x: ((radius + .1) *  Math.sin(Math.PI * (idx / 12)) + center.x).toFixed(2),
      y: ((radius + .1) * -Math.cos(Math.PI * (idx / 12)) + center.y).toFixed(2),
    },
    layer: 'F.SilkS'
  })),
  ...[...range(2, 29), ...range(32, 59)].flatMap((idx) => !(idx % 5) ? [] : [grLine({
    start: {
      x: ((radius - 1.2) *  Math.sin(Math.PI * (idx / 30)) + center.x).toFixed(2),
      y: ((radius - 1.2) * -Math.cos(Math.PI * (idx / 30)) + center.y).toFixed(2),
    },
    end: {
      x: ((radius - 2.1) *  Math.sin(Math.PI * (idx / 30)) + center.x).toFixed(2),
      y: ((radius - 2.1) * -Math.cos(Math.PI * (idx / 30)) + center.y).toFixed(2),
    },
    layer: 'F.SilkS'
  })]),
  ...[1, 2,  4, 5,  7, 8, 9, 10, 11].map((idx) => hmark({
    x: ((radius - 2.7) *  Math.sin(Math.PI * (idx / 6)) + center.x).toFixed(2),
    y: ((radius - 2.7) * -Math.cos(Math.PI * (idx / 6)) + center.y).toFixed(2),
    a: idx * 30
  })),
  ...[3].map((idx) => hmarkDot({
    x: ((radius - 1.6) *  Math.sin(Math.PI * (idx / 6)) + center.x).toFixed(2),
    y: ((radius - 1.6) * -Math.cos(Math.PI * (idx / 6)) + center.y).toFixed(2),
    a: idx * 30
  })),
  hmarkAnt({
    x: (center.x).toFixed(2),
    y: (center.y - radius).toFixed(2)
  }),
  hmarkGnd({
    x: (center.x).toFixed(2),
    y: (center.y + radius).toFixed(2)
  }),
  // dateWindow({
  //   x: center.x + 10.55,
  //   y: center.y
  // }),
  grArc({
    start:  {x: 65.2, y: 50},
    mid:    {x: 50,   y: 65.2},
    end:    {x: 34.8, y: 50},
    width: 2,
    layer:  'F.Cu'
  })
];

const labels = ({center}) => [
  grRect({
    start: {x: 48.0, y: 43.2},
    end:   {x: 52.0, y: 43.8},
    stroke: {width: 2},
    layer: 'F.Cu', fill: true
  }),
  grText({
    text: '50Ω',
    at: {x: center.x, y: center.y - 6.3},
    font: {face: 'Adwaita Sans', size: 2},
    layer: 'F.Mask'
  }),
  grRect({
    start: {x: 44.0, y: 56.6},
    end:   {x: 56.0, y: 57.7},
    stroke: {width: 1},
    layer: 'F.Cu', fill: true
  }),
  grText({
    text: 'EU2A  I6YP',
    at: {x: center.x, y: center.y + 7.3},
    font: {face: 'Luxi Mono', size: 1.5},
    layer: 'F.Mask'
  }),
  grText({
    text: 'A',
    at: {x: center.x, y: center.y + 6.9},
    font: {face: 'Luxi Mono', size: 2.5},
    layer: 'F.Cu'
  }),
  grText({
    text: 'A',
    at: {x: center.x, y: center.y + 6.9},
    font: {face: 'Luxi Mono', size: 2.5},
    layer: 'F.Mask'
  })
];

const main = async () => {
  const pcbFilePathOnly = path.resolve(__dirname, '..', 'dial-v2');

  try {
    await access(pcbFilePathOnly);
  } catch (error) {
    await mkdir(pcbFilePathOnly);
  }

  const pcbFilePath = path.resolve(pcbFilePathOnly, 'dial-v2.kicad_pcb');

  const center = {x: 50, y: 50};
  const pcbFileBody = [
    pcbHeader(),
    ...pcbEdge({r1: 32.4 / 2, r2: 33.8 / 2, r3: 40 / 2, center}),
    smithChart({radius: 14, center}),
    ...text24({radius: 15, center}),
    radioDiamond(),
    grCircle({center, end: {x: center.x + 17, y: center.y}, layer: 'B.Mask', fill: true}),
    // ...[0, 6, 9].map((h) => via({
    //   at: {
    //     x: (26 *  Math.sin(Math.PI * (h / 6)) + center.x).toFixed(2),
    //     y: (26 * -Math.cos(Math.PI * (h / 6)) + center.y).toFixed(2)
    //   },
    //   size: 3, drill: 2,
    //   layers: ['F.Cu', 'B.Cu']
    // })),
    // ...[1, 2, 4, 5, 7, 8, 10, 11].map((h) => via({
    //   at: {
    //     x: (26 *  Math.sin(Math.PI * (h / 6)) + center.x).toFixed(2),
    //     y: (26 * -Math.cos(Math.PI * (h / 6)) + center.y).toFixed(2)
    //   },
    //   size: 2, drill: 1,
    //   layers: ['F.Cu', 'B.Cu']
    // })),
    ...labels({center}),
    pcbFooter()
  ].join('');
  await writeFile(pcbFilePath, pcbFileBody);
};

main();
