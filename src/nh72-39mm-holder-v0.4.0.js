'use strict';

const { draw, makeCylinder, makeBox, twistExtrude, drawParametricFunction } = replicad;

const circleParametric = (a, b, n) => (t) => [
  Math.pow(Math.abs(Math.cos(t)), 2 / n) * a * Math.sign(Math.cos(t)),
  Math.pow(Math.abs(Math.sin(t)), 2 / n) * b * Math.sign(Math.sin(t))
];

const approximationConfig = {pointsCount: 16, start: 0, stop: 2 * Math.PI};

// BEGIN segments
const seg_g0_path0_1 = () => draw()
  .movePointerTo([-3.00000005, 1.27156585e-7])
  .cubicBezierCurveTo([-1.27156585e-7, 3.00000005], [-3.00000005, 2.50000005], [-2.50000005, 3.00000005])
  .cubicBezierCurveTo([2.9999998, 1.27156585e-7], [2.4999998, 3.00000005], [2.9999998, 2.50000005])
  .cubicBezierCurveTo([-1.27156585e-7, -2.9999998], [2.9999998, -2.4999998], [2.4999998, -2.9999998])
  .cubicBezierCurveTo([-3.00000005, 1.27156585e-7], [-2.50000005, -2.9999998], [-3.00000005, -2.4999998])
  .close();

const seg_g0_path0_2 = () => draw()
  .movePointerTo([-2.50000005, 1.27156585e-7])
  .cubicBezierCurveTo([-1.27156585e-7, 2.50000005], [-2.50000005, 2.00000005], [-2.00000005, 2.50000005])
  .cubicBezierCurveTo([2.4999998, 1.27156585e-7], [1.9999998, 2.50000005], [2.4999998, 2.00000005])
  .cubicBezierCurveTo([-1.27156585e-7, -2.4999998], [2.4999998, -1.9999998], [1.49999985, -2.4999998])
  .cubicBezierCurveTo([-2.50000005, 1.27156585e-7], [-2.00000005, -2.4999998], [-2.50000005, -1.9999998])
  .close();

const seg_g0_path0_3 = () => draw()
  .movePointerTo([-1.5000001, 1.27156585e-7])
  .cubicBezierCurveTo([-1.27156585e-7, 1.5000001], [-1.5000001, 1.0000001], [-1.0000001, 1.5000001])
  .cubicBezierCurveTo([1.49999985, 1.27156585e-7], [0.99999985, 1.47726245], [1.49477185, 1.0000001])
  .cubicBezierCurveTo([-1.25e-7, -1.4995441], [1.49477185, -0.99999985], [0.99999985, -1.49999985])
  .cubicBezierCurveTo([-1.5000001, 1.27156585e-7], [-1.0000001, -1.49999985], [-1.5000001, -0.99999985])
  .close();

const seg_g3_path3_1 = () => draw()
  .movePointerTo([-3.00000005, 1.27156585e-7])
  .cubicBezierCurveTo([-1.27156585e-7, 3.00000005], [-3.00000005, 2.50000005], [-2.50000005, 3.00000005])
  .cubicBezierCurveTo([2.9338096, 1.2314326], [2.01906715, 3.00000005], [2.73361175, 2.6738694])
  .cubicBezierCurveTo([2.43288695, 0.000005156235], [2.9814958, 0.88785065], [2.90645515, 0.323081765])
  .cubicBezierCurveTo([2.9513556, -1.090573], [2.7719852, -0.223857595], [2.98610185, -0.7780052])
  .cubicBezierCurveTo([-1.27156585e-7, -2.9999998], [2.77768985, -2.65282135], [2.08320185, -2.9999998])
  .cubicBezierCurveTo([-3.00000005, 1.27156585e-7], [-2.50000005, -2.9999998], [-3.00000005, -2.4999998])
  .close();

const seg_g3_path3_2 = () => draw()
  .movePointerTo([-1.02083025, 1.25e-7])
  .cubicBezierCurveTo([-0.50000035, 0.5000001], [-1.01122175, 0.23064202], [-1.0803734999999999, 0.465451395])
  .cubicBezierCurveTo([1.0790500500000002, 0.5000001], [0.17779582500000002, 0.5403481], [0.7289511999999999, 0.31430241499999995])
  .cubicBezierCurveTo([0.9999996000000002, 1.6281075], [1.2435942500000001, 0.7031349499999999], [1.5718458500000003, 1.3954257499999998])
  .cubicBezierCurveTo([-1.1435876999999999, 1.56184585], [0.49119769000000024, 1.8351368000000001], [-0.6717395999999998, 1.650782])
  .cubicBezierCurveTo([-2.0000003, 1.3952593000000002], [-1.44518065, 1.5050001000000002], [-1.8067772, 1.2536882500000002])
  .cubicBezierCurveTo([-2.0000003, 2.00000005], [-2.2574975, 1.5839228000000003], [-2.1112378499999997, 1.8712440500000003])
  .cubicBezierCurveTo([-3.8146973491137715e-7, 2.50000005], [-1.72266995, 2.32100645], [-0.01345979999999991, 2.5168243])
  .cubicBezierCurveTo([2.3498125, 0.8274053], [1.2938879, 2.50428155], [2.27537065, 2.2267216])
  .cubicBezierCurveTo([1.81595685, 1.25e-7], [2.36198235, 0.5986431], [1.8159568, 0.28739363])
  .cubicBezierCurveTo([2.3639466000000002, -0.84687985], [1.81595685, -0.231687035], [2.3659972, -0.65378645])
  .cubicBezierCurveTo([-1.27156585e-7, -2.4999998], [2.3482956, -2.3206325], [1.63638855, -2.5044206])
  .cubicBezierCurveTo([-2.06147485, -1.98410165], [-0.00286509, -2.50982255], [-1.68090385, -2.754933])
  .cubicBezierCurveTo([-2.2124813, -0.99999985], [-2.40336445, -1.67271235], [-2.4669274, -1.1502656])
  .cubicBezierCurveTo([-1.5000003499999999, -1.38176745], [-2.0000003, -0.99999985], [-1.6751306, -1.0806225])
  .cubicBezierCurveTo([0.9999996, -1.4999998499999998], [-0.8647160499999998, -1.92700225], [0.7516105500000003, -1.78759685])
  .cubicBezierCurveTo([0.9999996, -0.49999985499999977], [1.2712088, -1.2204779999999997], [1.3812424, -0.5995947999999998])
  .cubicBezierCurveTo([-0.5000003500000001, -0.49999985499999977], [0.7061632, -0.4232387649999998], [0.58411125, -0.35375869999999976])
  .cubicBezierCurveTo([-1.02083025, 1.25e-7], [-0.7335846, -0.5315092], [-1.02083025, -0.29640195])
  .close();

const seg_g6_path6_1 = () => draw()
  .movePointerTo([-3, 0])
  .cubicBezierCurveTo([0, 3.00000005], [-3, 2.50000005], [-2.5, 3.00000005])
  .cubicBezierCurveTo([3, 0], [2.5, 3.00000005], [3, 2.50000005])
  .cubicBezierCurveTo([0, -3], [3, -2.5], [2.5, -3])
  .cubicBezierCurveTo([-3, 0], [-2.50000055, -2.9999998], [-3, -2.5])
  .close();

const seg_g6_path6_2 = () => draw()
  .movePointerTo([-6.357829e-7, 2.50000005])
  .cubicBezierCurveTo([2.3250078, 1.37724255], [1.0147541, 2.50600465], [1.9999993, 2.44740795])
  .cubicBezierCurveTo([1.6618121, 1.47128895], [2.34308665, 1.21083995], [1.802372, 1.02420225])
  .cubicBezierCurveTo([0, 1.81962495], [1.4057249, 1.80869985], [0.76190105, 1.86308395])
  .cubicBezierCurveTo([-1.5578782, 0.7378398], [-1.3001671, 1.7914958], [-2.00531125, 1.5578777])
  .cubicBezierCurveTo([0, 0.82223315], [-1.3714034, 0.5578777], [-0.59865505, 0.7972939])
  .cubicBezierCurveTo([1.7994204, 0.264583455], [1.08268165, 0.8673364], [1.25608655, 0.64983095])
  .cubicBezierCurveTo([2.37634895, -0.84274575], [2.21283185, -0.05805422], [2.32465605, -0.385069005])
  .cubicBezierCurveTo([-1.27156595e-7, -2.4999998], [2.3537784, -2.09782045], [1.6239862, -2.4999998])
  .cubicBezierCurveTo([-2.50000055, 1.27156585e-7], [-2.00000055, -2.4999998], [-2.49983105, -1.9999997])
  .cubicBezierCurveTo([-6.357829e-7, 2.50000005], [-2.57251375, 2.4457289], [-1.50000085, 2.50000005])
  .close();

const seg_g6_path6_3 = () => draw()
  .movePointerTo([-1.69407555, -0.89296875])
  .cubicBezierCurveTo([-6.357829e-7, 1.27156585e-7], [-1.67753905, -0.298111875], [-1.00000065, 1.27156585e-7])
  .cubicBezierCurveTo([1.6531901, -0.99999985], [1.14882745, 0.06407903], [1.681035, -0.499999855])
  .cubicBezierCurveTo([0, -1.9791013], [1.71410595, -1.49999985], [1, -1.9795573])
  .cubicBezierCurveTo([-1.69407555, -0.89296875], [-1, -1.9795573], [-1.6361979, -1.5045444])
  .close();


// END segments

const dig0 = (body) => body
  .fuse(seg_g0_path0_1().sketchOnPlane('XY').extrude(1.2).translate([0, 13, -0.7]))
  .cut(seg_g0_path0_2().sketchOnPlane('XY').extrude(1.2).translate([0, 13, -0.3]))
  .fuse(seg_g0_path0_3().sketchOnPlane('XY').extrude(1.2).translate([0, 13, -0.7]))

const dig3 = (body) => body
  .fuse(seg_g3_path3_1().sketchOnPlane('XY').extrude(1.2).translate([13, 0, -0.7]))
  .cut(seg_g3_path3_2().sketchOnPlane('XY').extrude(1.2).translate([13, 0, -0.3]))

const dig6 = (body) => body
  .fuse(seg_g6_path6_1().sketchOnPlane('XY').extrude(1.2).translate([0, -13, -0.7]))
  .cut(seg_g6_path6_2().sketchOnPlane('XY').extrude(1.2).translate([0, -13, -0.3]))
  .fuse(seg_g6_path6_3().sketchOnPlane('XY').extrude(1.2).translate([0, -13, -0.7]))

const dig9 = (body) => body
  .fuse(seg_g6_path6_1().sketchOnPlane('XY').extrude(1.2).translate([-13, 0, -0.7]))
  .cut(seg_g6_path6_2().sketchOnPlane('XY').extrude(1.2).rotate(180).translate([-13, 0, -0.3]))
  .fuse(seg_g6_path6_3().sketchOnPlane('XY').extrude(1.2).rotate(180).translate([-13, 0, -0.7]))

const main = (r, cfg) => {
  const d0 = 39; // outer case diameter
  const d1 = 33; // inner case diameter under glass
  const d2 = 34; // inner case diameter under dial
  const h0 = 13; // outer case height

  const dh1 = 25.40; // top movement openning
  const dh2 = 26.80; // top movement step

  const wcase = makeCylinder(d0 / 2, h0)
    .cut(makeCylinder(d1 / 2, h0))
    .cut(makeCylinder(d2 / 2, h0 - 4));

  let shape;

  shape = draw()
    .vLine(-1.75)
    .line( 1.50, -3.00)
    .vLine(-1.45)
    .hLine(1.25)
    .vLine(3.90)
    .line(1.00, 1.00)
    .vLine(0.60)
    .line(0.50, 0.50)
    .vLine(0.20)
    .close()
    .translate([-16.90, 0.00])
    .sketchOnPlane('XZ').revolve()


  shape = [ 1,2,  4,5,  7,8,  10,11].reduce((res, e) => {
    return res
      .fuse(drawParametricFunction(
        circleParametric(2.2, 1, 3), approximationConfig
      ).sketchOnPlane('XY').extrude(1.3).translate([14, 0, -0.7]).rotate(e * 30))
      .cut(drawParametricFunction(
        circleParametric(1.7, .5, 3), approximationConfig
      ).sketchOnPlane('XY').extrude(1.3).translate([14, 0, -0.3]).rotate(e * 30))
  }, shape);

  shape = dig0(shape);
  shape = dig3(shape);
  shape = dig6(shape);
  shape = dig9(shape);

  shape = shape
    .cut(makeCylinder(1.50, 20).rotate(90, [0,0,0], [0,1,0]).translateZ(-2.6)) // head
    .cut(makeBox([0, -1.20, 0], [20, 1.2, 1.2]).rotate(25.3, [0,0,0], [0,0,1]).translateZ(-2.6))
    .cut(makeBox([0, -1.20, 0], [20, 1.2, 1.2]).rotate(-126.7, [0,0,0], [0,0,1]).translateZ(-2.6))

  return [
    // {name: '39mm-case', shape: wcase, color: '#f00', opacity: .2},
    {name: 'nh72-39mm-holder-v0.4.0', shape, color: '#555', opacity: 1}
    // {name: 'nh72-39mm-holder-v0.3.0', shape: holder3, color: '#555', opacity: 1}
  ];
};
