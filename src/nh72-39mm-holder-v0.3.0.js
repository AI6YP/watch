'use strict';

const { draw, makeCylinder, makeBox, twistExtrude, drawParametricFunction } = replicad;

const circleParametric = (a, b, n) => (t) => [
  Math.pow(Math.abs(Math.cos(t)), 2 / n) * a * Math.sign(Math.cos(t)),
  Math.pow(Math.abs(Math.sin(t)), 2 / n) * b * Math.sign(Math.sin(t))
];

const approximationConfig = {pointsCount: 16, start: 0, stop: 2 * Math.PI};

// BEGIN segments

const seg_g0_path0_1 = () => draw()
  .movePointerTo([-3, 0])
  .cubicBezierCurveTo([0, 3], [-3, 2.5], [-2.5, 3])
  .cubicBezierCurveTo([3, 0], [2.5, 3], [3, 2.5])
  .cubicBezierCurveTo([0, -3], [3, -2.5], [2.5, -3])
  .cubicBezierCurveTo([-3, 0], [-2.5, -3], [-3, -2.5])
  .close();

const seg_g0_path0_2 = () => draw()
  .movePointerTo([-2.5, 0])
  .cubicBezierCurveTo([0, 2.5], [-2.5, 2], [-2, 2.5])
  .cubicBezierCurveTo([2.5, 0], [2, 2.5], [2.5, 2])
  .cubicBezierCurveTo([0, -2.5], [2.5, -2], [1.5, -2.5])
  .cubicBezierCurveTo([-2.5, 0], [-2, -2.5], [-2.5, -2])
  .close();

const seg_g0_path0_3 = () => draw()
  .movePointerTo([-1.5, 0])
  .cubicBezierCurveTo([0, 1.5], [-1.5, 1], [-1, 1.5])
  .cubicBezierCurveTo([1.5, 0], [1, 1.475], [1.495, 1])
  .cubicBezierCurveTo([0, -1.5], [1.495, -1], [1, -1.5])
  .cubicBezierCurveTo([-1.5, 0], [-1, -1.5], [-1.5, -1])
  .close();

const seg_g3_path3_1 = () => draw()
  .movePointerTo([-3, 0])
  .cubicBezierCurveTo([0, 3], [-3, 2.5], [-2.5, 3])
  .cubicBezierCurveTo([2.935, 1.23], [2.02, 3], [2.735, 2.675])
  .cubicBezierCurveTo([2.435, 0], [2.98, 0.89], [2.905, 0.325])
  .cubicBezierCurveTo([2.95, -1.09], [2.77, -0.225], [2.985, -0.78])
  .cubicBezierCurveTo([0, -3], [2.78, -2.655], [2.085, -3])
  .cubicBezierCurveTo([-3, 0], [-2.5, -3], [-3, -2.5])
  .close();

const seg_g3_path3_2 = () => draw()
  .movePointerTo([-1.02, 0])
  .cubicBezierCurveTo([0.010000000000000009, 0.5], [-0.5, 0.23], [-0.5700000000000001, 0.465])
  .cubicBezierCurveTo([1.33, 0.25], [0.43000000000000005, 0.29], [0.98, 0.065])
  .cubicBezierCurveTo([0.46, 1.38], [0.7050000000000001, 0.45499999999999996], [1.0350000000000001, 1.145])
  .cubicBezierCurveTo([-1.645, 0.75], [-0.010000000000000009, 1.02], [-1.17, 0.84])
  .cubicBezierCurveTo([-1.4275, 0.6174999999999999], [-0.8725, 0.7274999999999999], [-1.2375, 0.4725])
  .cubicBezierCurveTo([-1, 1.305], [-1.255, 0.8899999999999999], [-1.11, 1.1749999999999998])
  .cubicBezierCurveTo([1, 1.5025], [-0.725, 1.3225], [0.9850000000000001, 1.5175])
  .cubicBezierCurveTo([2.35, 0.825], [1.295, 2.505], [2.26, 2.19])
  .cubicBezierCurveTo([1.815, 0], [2.365, 0.6], [1.815, 0.285])
  .cubicBezierCurveTo([1.4575, -0.845], [0.9075, -0.23], [1.4575, -0.655])
  .cubicBezierCurveTo([0, -2.5], [2.35, -2.32], [1.635, -2.505])
  .cubicBezierCurveTo([-2.06, -1.985], [-0.005, -2.51], [-1.68, -2.755])
  .cubicBezierCurveTo([-2.21, -1], [-2.405, -1.675], [-2.465, -1.15])
  .cubicBezierCurveTo([-0.395, -0.88], [-0.895, -0.5], [-0.57, -0.58])
  .cubicBezierCurveTo([1.75, -0.8099999999999999], [-0.11499999999999999, -1.2349999999999999], [1.5, -1.095])
  .cubicBezierCurveTo([0.5, 0.25], [0.77, -0.47], [0.88, 0.15000000000000002])
  .cubicBezierCurveTo([-1, -0.25], [0.20500000000000002, -0.175], [0.08500000000000002, -0.10500000000000001])
  .cubicBezierCurveTo([-1.02, 0], [-0.735, -0.53], [-1.02, -0.295])
  .close();

const seg_g6_path6_1 = () => draw()
  .movePointerTo([-3, 0])
  .cubicBezierCurveTo([1.5, 3], [-1.5, 2.5], [-1, 3])
  .cubicBezierCurveTo([3, -1.5], [2.5, 1.5], [3, 1])
  .cubicBezierCurveTo([-1.5, -3], [1.5, -2.5], [1, -3])
  .cubicBezierCurveTo([-3, 1.5], [-2.5, -1.5], [-3, -1])
  .close();

const seg_g6_path6_2 = () => draw()
  .movePointerTo([0, 2.5])
  .cubicBezierCurveTo([2.35, -0.08499999999999996], [0, 1.25], [2.235, 1.355])
  .cubicBezierCurveTo([0.56, 0.5875], [1.185, 0.47250000000000003], [0.8250000000000001, 0.08250000000000002])
  .cubicBezierCurveTo([0, 1.82], [1.755, 1.535], [0.685, 1.805])
  .cubicBezierCurveTo([-1.5, 0.68], [-1.3, 1.79], [-2.12, 1.06])
  .cubicBezierCurveTo([0, 0.775], [-1.315, 0.5], [-0.595, 0.73])
  .cubicBezierCurveTo([1.83, 0.38], [1.04, 0.86], [1.5, 0.645])
  .cubicBezierCurveTo([2.365, -0.845], [2.245, 0.06], [2.36, -0.625])
  .cubicBezierCurveTo([0, -2.5], [2.405, -2.32], [1.635, -2.505])
  .cubicBezierCurveTo([-2.5, 0], [-2, -2.5], [-2.5, -2])
  .cubicBezierCurveTo([0, 2.5], [-2.475, 2.4], [-1.38, 2.5])
  .close();

const seg_g6_path6_3 = () => draw()
  .movePointerTo([-1.695, -0.895])
  .cubicBezierCurveTo([0, 0], [-1.68, -0.3], [-1, 0])
  .cubicBezierCurveTo([1.655, -1], [1, -0.025], [1.68, -0.5])
  .cubicBezierCurveTo([0, -1.98], [1.715, -1.5], [1, -1.98])
  .cubicBezierCurveTo([-1.695, -0.895], [-1, -1.98], [-1.635, -1.505])
  .close();

// END segments

const dig0 = (body) => body
  .fuse(seg_g0_path0_1().sketchOnPlane('XY').extrude(1).translate([0, 13, -0.5]))
  .cut(seg_g0_path0_2().sketchOnPlane('XY').extrude(1).translate([0, 13, -0.3]))
  .fuse(seg_g0_path0_3().sketchOnPlane('XY').extrude(1).translate([0, 13, -0.5]))

const dig3 = (body) => body
  .fuse(seg_g3_path3_1().sketchOnPlane('XY').extrude(1).translate([13, 0, -0.5]))
  .cut(seg_g3_path3_2().sketchOnPlane('XY').extrude(1).translate([13, 0, -0.3]))

const dig6 = (body) => body
  .fuse(seg_g6_path6_1().sketchOnPlane('XY').extrude(1).translate([0, -13, -0.5]))
  .cut(seg_g6_path6_2().sketchOnPlane('XY').extrude(1).rotate(180).translate([0, -13, -0.3]))
  .fuse(seg_g6_path6_3().sketchOnPlane('XY').extrude(1).rotate(180).translate([0, -13, -0.5]))

const dig9 = (body) => body
  .fuse(seg_g6_path6_1().sketchOnPlane('XY').extrude(1).translate([-13, 0, -0.5]))
  .cut(seg_g6_path6_2().sketchOnPlane('XY').extrude(1).translate([-13, 0, -0.3]))
  .fuse(seg_g6_path6_3().sketchOnPlane('XY').extrude(1).translate([-13, 0, -0.5]))

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
    .vLine(4.30)
    .line(1.00, 1.00)
    .vLine(0.20)
    .line(0.50, 0.50)
    .vLine(0.20)
    .close()
    .translate([-16.90, 0.00])
    .sketchOnPlane('XZ').revolve()

  // Draw the parametric function
  const mark = drawParametricFunction(
    circleParametric(1, 2, 5), approximationConfig
  ).sketchOnPlane('XY').extrude(1)

  // shape = [0, 3, 6, 9].reduce((res, e) => {
  //   return res
  //     .fuse(drawParametricFunction(
  //       circleParametric(3, 3, 3), approximationConfig
  //     ).sketchOnPlane('XY').extrude(1).translate([13.5, 0, -0.5]).rotate(e * -30 + 90))
  //     .cut(drawParametricFunction(
  //       circleParametric(2.5, 2.5, 3), approximationConfig
  //     ).sketchOnPlane('XY').extrude(1).translate([13.5, 0, -0.3]).rotate(e * -30 + 90))
  // }, shape);

  // shape = [0].reduce((res, e) => {
  //   return res
  //     .fuse(drawParametricFunction(
  //       circleParametric(1.4, 1.4, 3), approximationConfig
  //     ).sketchOnPlane('XY').extrude(1).translate([13.5, 0, -0.5]).rotate(e * -30 + 90))
  // }, shape);

  // shape = [6, 9].reduce((res, e) => {
  //   return res
  //     // .cut(drawParametricFunction(
  //     //   circleParametric(1.50, 2.50, 3), approximationConfig
  //     // ).sketchOnPlane('XY').extrude(1).translate([14.5, 0, -0.3]).rotate(e * -30 + 90))
  //     .fuse(
  //       drawParametricFunction(circleParametric(2.0, 2.0, 3), approximationConfig)
  //         .sketchOnPlane('XY').extrude(1)
  //         .translate([0.38, 0.38, 0.00])
  //         .cut(
  //           drawParametricFunction(circleParametric(1.50, 1.95, 3.00), approximationConfig)
  //             .sketchOnPlane('XY').extrude(1)
  //             .translate([0.75, 0.38, 0.00])
  //         )
  //         // .fuse(
  //         //   drawParametricFunction(circleParametric(1.49, 0.49, 3), approximationConfig)
  //         //     .sketchOnPlane('XY').extrude(1)
  //         //     .translate([0.74, 0.00, 0])
  //         // )
  //         // .fuse(
  //         //   drawParametricFunction(circleParametric(0.50, 0.50, 3), approximationConfig)
  //         //     .sketchOnPlane('XY').extrude(1)
  //         //     // .translate([-0.5, 0.5, 0])
  //         // )
  //         .rotate(e === 9 ? -90 : 0)
  //         .translate([13.5, 0, -0.5]).rotate(e * -30 + 90))
  // }, shape);


  shape = [ 1,2,  4,5,  7,8,  10,11].reduce((res, e) => {
    return res
      .fuse(drawParametricFunction(
        circleParametric(2.2, 1, 3), approximationConfig
      ).sketchOnPlane('XY').extrude(1).translate([14, 0, -0.5]).rotate(e * 30))
      .cut(drawParametricFunction(
        circleParametric(1.7, .5, 3), approximationConfig
      ).sketchOnPlane('XY').extrude(1).translate([14, 0, -0.3]).rotate(e * 30))
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
    {name: 'nh72-39mm-holder-v0.3.0', shape, color: '#555', opacity: 1}
    // {name: 'nh72-39mm-holder-v0.3.0', shape: holder3, color: '#555', opacity: 1}
  ];
};
