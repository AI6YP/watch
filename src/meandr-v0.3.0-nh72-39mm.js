'use strict';

const { draw, makeCylinder, makeBox, twistExtrude, drawParametricFunction } = replicad;

const circleParametric = (a, b, n) => (t) => [
  Math.pow(Math.abs(Math.cos(t)), 2 / n) * a * Math.sign(Math.cos(t)),
  Math.pow(Math.abs(Math.sin(t)), 2 / n) * b * Math.sign(Math.sin(t))
];

const approximationConfig = {pointsCount: 16, start: 0, stop: 2 * Math.PI};

// BEGIN segments
const seg_g0_path0 = () => draw()
  .movePointerTo([0.01, 17]) // m
  .ellipseTo([-0.199, 16.801], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.199, 14.09]) // v
  .lineTo([-1.273, 14.033]) // l
    .lineTo([-1.557, 16.729]) // l
  .ellipseTo([-1.787, 16.906], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.523, 16.631]) // l
  .ellipseTo([-3.689, 16.391], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.125, 13.74]) // L
    .lineTo([-4.164, 13.463]) // L
    .lineTo([-5, 16.039]) // L
  .ellipseTo([-5.262, 16.164], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.904, 15.535]) // l
  .ellipseTo([-7.016, 15.268], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.914, 12.791]) // l
    .lineTo([-6.871, 12.303]) // l
    .lineTo([-8.227, 14.648]) // l
  .ellipseTo([-8.51, 14.717], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.984, 13.758]) // l
  .ellipseTo([-10.037, 13.473], 0.2, 0.2, 0, false, true) // a
  .lineTo([-8.443, 11.281]) // l
    .lineTo([-9.279, 10.605]) // l
    .lineTo([-11.092, 12.619]) // l
  .ellipseTo([-11.383, 12.627], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.627, 11.383]) // l
  .ellipseTo([-12.619, 11.092], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.605, 9.279]) // l
    .lineTo([-11.281, 8.443]) // l
    .lineTo([-13.473, 10.037]) // l
  .ellipseTo([-13.758, 9.984], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.717, 8.51]) // l
  .ellipseTo([-14.648, 8.227], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.303, 6.871]) // l
    .lineTo([-12.791, 5.914]) // l
    .lineTo([-15.268, 7.016]) // l
  .ellipseTo([-15.535, 6.904], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.164, 5.262]) // l
  .ellipseTo([-16.039, 5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-13.463, 4.164]) // l
    .lineTo([-13.74, 3.125]) // l
    .lineTo([-16.391, 3.689]) // l
  .ellipseTo([-16.631, 3.523], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.906, 1.787]) // l
  .ellipseTo([-16.729, 1.557], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.033, 1.273]) // l
    .lineTo([-14.09, 0.199]) // l
  .lineTo([-16.801, 0.199]) // h
  .ellipseTo([-17, -0.01], 0.2, 0.2, 0, false, true) // A
  .lineTo([-16.908, -1.766]) // l
  .ellipseTo([-16.687, -1.955], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.992, -1.672]) // l
    .lineTo([-13.824, -2.734]) // l
    .lineTo([-16.475, -3.297]) // l
  .ellipseTo([-16.627, -3.545], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.172, -5.242]) // l
  .ellipseTo([-15.916, -5.381], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.338, -4.543]) // l
    .lineTo([-12.953, -5.549]) // l
    .lineTo([-15.43, -6.65]) // l
  .ellipseTo([-15.525, -6.924], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.727, -8.49]) // l
  .ellipseTo([-14.449, -8.572], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.102, -7.219]) // l
    .lineTo([-11.516, -8.119]) // l
    .lineTo([-13.709, -9.713]) // l
  .ellipseTo([-13.746, -10], 0.2, 0.2, 0, false, true) // A
  .lineTo([-12.641, -11.367]) // l
  .ellipseTo([-12.352, -11.389], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.338, -9.576]) // l
    .lineTo([-9.576, -10.338]) // l
    .lineTo([-11.389, -12.352]) // l
  .ellipseTo([-11.367, -12.641], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10, -13.746]) // L
  .ellipseTo([-9.713, -13.709], 0.2, 0.2, 0, false, true) // a
  .lineTo([-8.119, -11.516]) // l
    .lineTo([-7.219, -12.102]) // l
    .lineTo([-8.572, -14.449]) // l
  .ellipseTo([-8.49, -14.727], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.924, -15.525]) // l
  .ellipseTo([-6.65, -15.43], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.549, -12.953]) // l
    .lineTo([-4.543, -13.338]) // l
    .lineTo([-5.381, -15.916]) // l
  .ellipseTo([-5.242, -16.172], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.545, -16.627]) // l
  .ellipseTo([-3.297, -16.475], 0.2, 0.2, 0, false, true) // a
  .lineTo([-2.734, -13.824]) // l
    .lineTo([-1.672, -13.992]) // l
    .lineTo([-1.955, -16.688]) // l
  .ellipseTo([-1.766, -16.908], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.01, -17]) // L
  .ellipseTo([0.199, -16.801], 0.2, 0.2, 0, false, true) // a
  .lineTo([0.199, -14.09]) // v
  .lineTo([1.273, -14.033]) // l
    .lineTo([1.557, -16.729]) // l
  .ellipseTo([1.787, -16.906], 0.2, 0.2, 0, false, true) // A
  .lineTo([3.523, -16.631]) // L
  .ellipseTo([3.689, -16.391], 0.2, 0.2, 0, false, true) // A
  .lineTo([3.125, -13.74]) // L
    .lineTo([4.164, -13.463]) // L
    .lineTo([5, -16.039]) // L
  .ellipseTo([5.262, -16.164], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.904, -15.535]) // L
  .ellipseTo([7.016, -15.268], 0.2, 0.2, 0, false, true) // A
  .lineTo([5.914, -12.791]) // l
    .lineTo([6.871, -12.303]) // l
    .lineTo([8.227, -14.648]) // l
  .ellipseTo([8.51, -14.717], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.984, -13.758]) // L
  .ellipseTo([10.037, -13.473], 0.2, 0.2, 0, false, true) // a
  .lineTo([8.443, -11.281]) // L
    .lineTo([9.279, -10.605]) // L
    .lineTo([11.092, -12.619]) // L
  .ellipseTo([11.383, -12.627], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.627, -11.383]) // l
  .ellipseTo([12.619, -11.092], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.605, -9.279]) // L
    .lineTo([11.281, -8.443]) // L
    .lineTo([13.473, -10.037]) // L
  .ellipseTo([13.758, -9.984], 0.2, 0.2, 0, false, true) // A
  .lineTo([14.717, -8.51]) // L
  .ellipseTo([14.648, -8.227], 0.2, 0.2, 0, false, true) // A
  .lineTo([12.303, -6.871]) // L
    .lineTo([12.791, -5.914]) // L
    .lineTo([15.268, -7.016]) // L
  .ellipseTo([15.535, -6.904], 0.2, 0.2, 0, false, true) // A
  .lineTo([16.164, -5.262]) // L
  .ellipseTo([16.039, -5], 0.2, 0.2, 0, false, true) // A
  .lineTo([13.463, -4.164]) // L
    .lineTo([13.74, -3.125]) // L
    .lineTo([16.391, -3.689]) // L
  .ellipseTo([16.631, -3.523], 0.2, 0.2, 0, false, true) // A
  .lineTo([16.906, -1.787]) // L
  .ellipseTo([16.729, -1.557], 0.2, 0.2, 0, false, true) // A
  .lineTo([14.033, -1.273]) // l
    .lineTo([14.09, -0.199]) // l
  .lineTo([16.801, -0.199]) // h
  .lineTo([16.801, 0.199]) // v
  .lineTo([13.9, 0.199]) // h
  .ellipseTo([13.701, 0.01], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.625, -1.443]) // L
  .ellipseTo([13.803, -1.652], 0.2, 0.2, 0, false, true) // a
  .lineTo([16.477, -1.934]) // l
    .lineTo([16.27, -3.254]) // l
    .lineTo([13.637, -2.695]) // l
  .ellipseTo([13.402, -2.838], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.027, -4.244]) // l
  .ellipseTo([13.158, -4.484], 0.2, 0.2, 0, false, true) // a
  .lineTo([15.715, -5.316]) // l
    .lineTo([15.238, -6.564]) // l
    .lineTo([12.779, -5.471]) // l
  .ellipseTo([12.52, -5.563], 0.2, 0.2, 0, false, true) // A
  .lineTo([11.859, -6.859]) // l
  .ellipseTo([11.938, -7.123], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.268, -8.467]) // l
    .lineTo([13.539, -9.59]) // l
    .lineTo([11.363, -8.008]) // l
  .ellipseTo([11.09, -8.045], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.174, -9.176]) // l
  .ellipseTo([10.195, -9.449], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.195, -11.248]) // l
    .lineTo([11.248, -12.195]) // l
    .lineTo([9.449, -10.195]) // l
  .ellipseTo([9.176, -10.174], 0.2, 0.2, 0, false, true) // a
  .lineTo([8.045, -11.09]) // l
  .ellipseTo([8.008, -11.363], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.59, -13.539]) // L
    .lineTo([8.467, -14.268]) // L
    .lineTo([7.123, -11.938]) // L
  .ellipseTo([6.859, -11.859], 0.2, 0.2, 0, false, true) // A
  .lineTo([5.563, -12.52]) // L
  .ellipseTo([5.471, -12.779], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.564, -15.238]) // l
  .lineTo([5.316, -15.715]) // L
    .lineTo([4.484, -13.158]) // L
  .ellipseTo([4.244, -13.027], 0.2, 0.2, 0, false, true) // A
  .lineTo([2.838, -13.402]) // l
  .ellipseTo([2.695, -13.637], 0.2, 0.2, 0, false, true) // a
  .lineTo([3.254, -16.27]) // l
    .lineTo([1.934, -16.477]) // l
    .lineTo([1.652, -13.803]) // l
  .ellipseTo([1.443, -13.625], 0.2, 0.2, 0, false, true) // A
  .lineTo([-0.01, -13.701]) // l
  .ellipseTo([-0.199, -13.9], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.199, -16.588]) // v
  .lineTo([-1.535, -16.52]) // l
    .lineTo([-1.254, -13.846]) // l
  .ellipseTo([-1.422, -13.627], 0.2, 0.2, 0, false, true) // a
  .lineTo([-2.859, -13.398]) // l
  .ellipseTo([-3.086, -13.555], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.646, -16.186]) // l
    .lineTo([-4.936, -15.84]) // l
    .lineTo([-4.105, -13.281]) // l
  .ellipseTo([-4.223, -13.033], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.582, -12.512]) // l
  .ellipseTo([-5.836, -12.617], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.93, -15.074]) // l
    .lineTo([-8.121, -14.467]) // l
    .lineTo([-6.777, -12.139]) // l
  .ellipseTo([-6.842, -11.871], 0.2, 0.2, 0, false, true) // a
  .lineTo([-8.061, -11.078]) // l
  .ellipseTo([-8.332, -11.127], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.914, -13.303]) // l
    .lineTo([-10.951, -12.463]) // l
    .lineTo([-9.152, -10.463]) // l
  .ellipseTo([-9.16, -10.189], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.189, -9.16]) // L
  .ellipseTo([-10.463, -9.152], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.463, -10.951]) // l
    .lineTo([-13.303, -9.914]) // l
    .lineTo([-11.127, -8.332]) // l
  .ellipseTo([-11.078, -8.061], 0.2, 0.2, 0, false, true) // a
  .lineTo([-11.871, -6.842]) // l
  .ellipseTo([-12.139, -6.777], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.467, -8.121]) // l
    .lineTo([-15.074, -6.93]) // l
    .lineTo([-12.617, -5.836]) // l
  .ellipseTo([-12.512, -5.582], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.033, -4.223]) // l
  .ellipseTo([-13.281, -4.105], 0.2, 0.2, 0, false, true) // A
  .lineTo([-15.84, -4.936]) // l
    .lineTo([-16.186, -3.646]) // l
    .lineTo([-13.555, -3.086]) // l
  .ellipseTo([-13.398, -2.859], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.627, -1.422]) // l
  .ellipseTo([-13.846, -1.254], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.52, -1.535]) // l
    .lineTo([-16.588, -0.199]) // l
  .lineTo([-13.9, -0.199]) // h
  .ellipseTo([-13.701, -0.01], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.625, 1.443]) // L
  .ellipseTo([-13.803, 1.652], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.477, 1.934]) // l
    .lineTo([-16.27, 3.254]) // l
    .lineTo([-13.637, 2.695]) // l
  .ellipseTo([-13.402, 2.838], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.027, 4.244]) // l
  .ellipseTo([-13.158, 4.484], 0.2, 0.2, 0, false, true) // a
  .lineTo([-15.715, 5.316]) // l
    .lineTo([-15.238, 6.564]) // l
    .lineTo([-12.779, 5.471]) // l
  .ellipseTo([-12.52, 5.563], 0.2, 0.2, 0, false, true) // a
  .lineTo([-11.859, 6.859]) // l
  .ellipseTo([-11.938, 7.123], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.268, 8.467]) // l
    .lineTo([-13.539, 9.59]) // l
    .lineTo([-11.363, 8.008]) // l
  .ellipseTo([-11.09, 8.045], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.174, 9.176]) // l
  .ellipseTo([-10.195, 9.449], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.195, 11.248]) // l
    .lineTo([-11.248, 12.195]) // l
    .lineTo([-9.449, 10.195]) // l
  .ellipseTo([-9.176, 10.174], 0.2, 0.2, 0, false, true) // a
  .lineTo([-8.045, 11.09]) // l
  .ellipseTo([-8.008, 11.363], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.59, 13.539]) // l
    .lineTo([-8.467, 14.268]) // l
    .lineTo([-7.123, 11.937]) // l
  .ellipseTo([-6.859, 11.859], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.563, 12.52]) // l
  .ellipseTo([-5.471, 12.779], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.564, 15.238]) // l
    .lineTo([-5.316, 15.715]) // l
    .lineTo([-4.484, 13.158]) // l
  .ellipseTo([-4.244, 13.027], 0.2, 0.2, 0, false, true) // a
  .lineTo([-2.838, 13.402]) // l
  .ellipseTo([-2.695, 13.637], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.254, 16.27]) // l
    .lineTo([-1.934, 16.477]) // l
    .lineTo([-1.652, 13.803]) // l
  .ellipseTo([-1.443, 13.625], 0.2, 0.2, 0, false, true) // a
  .lineTo([0.01, 13.701]) // l
  .ellipseTo([0.199, 13.9], 0.2, 0.2, 0, false, true) // a
  .lineTo([0.199, 16.588]) // v
  .lineTo([1.535, 16.52]) // l
    .lineTo([1.254, 13.846]) // l
  .ellipseTo([1.422, 13.627], 0.2, 0.2, 0, false, true) // a
  .lineTo([2.859, 13.398]) // l
  .ellipseTo([3.086, 13.555], 0.2, 0.2, 0, false, true) // a
  .lineTo([3.646, 16.186]) // l
    .lineTo([4.936, 15.84]) // l
    .lineTo([4.105, 13.281]) // l
  .ellipseTo([4.223, 13.033], 0.2, 0.2, 0, false, true) // a
  .lineTo([5.582, 12.512]) // l
  .ellipseTo([5.836, 12.617], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.93, 15.074]) // l
    .lineTo([8.121, 14.467]) // l
    .lineTo([6.777, 12.139]) // l
  .ellipseTo([6.842, 11.871], 0.2, 0.2, 0, false, true) // a
  .lineTo([8.061, 11.078]) // l
  .ellipseTo([8.332, 11.127], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.914, 13.303]) // l
    .lineTo([10.951, 12.463]) // l
    .lineTo([9.152, 10.463]) // l
  .ellipseTo([9.16, 10.189], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.189, 9.16]) // l
  .ellipseTo([10.463, 9.152], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.463, 10.951]) // l
    .lineTo([13.303, 9.914]) // l
    .lineTo([11.127, 8.332]) // l
  .ellipseTo([11.078, 8.061], 0.2, 0.2, 0, false, true) // a
  .lineTo([11.871, 6.842]) // l
  .ellipseTo([12.139, 6.777], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.467, 8.121]) // l
    .lineTo([15.074, 6.93]) // l
    .lineTo([12.617, 5.836]) // l
  .ellipseTo([12.512, 5.582], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.033, 4.223]) // l
  .ellipseTo([13.281, 4.105], 0.2, 0.2, 0, false, true) // a
  .lineTo([15.84, 4.936]) // l
    .lineTo([16.186, 3.646]) // l
    .lineTo([13.555, 3.086]) // l
  .ellipseTo([13.398, 2.859], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.627, 1.422]) // l
  .ellipseTo([13.846, 1.254], 0.2, 0.2, 0, false, true) // a
  .lineTo([16.729, 1.557]) // l
    .lineTo([16.687, 1.955]) // l
    .lineTo([13.992, 1.672]) // l
    .lineTo([13.824, 2.734]) // l
    .lineTo([16.475, 3.297]) // l
  .ellipseTo([16.627, 3.545], 0.2, 0.2, 0, false, true) // a
  .lineTo([16.172, 5.242]) // l
  .ellipseTo([15.916, 5.381], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.338, 4.543]) // l
    .lineTo([12.953, 5.549]) // l
    .lineTo([15.43, 6.65]) // l
  .ellipseTo([15.525, 6.924], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.727, 8.49]) // l
  .ellipseTo([14.449, 8.572], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.102, 7.219]) // l
    .lineTo([11.516, 8.119]) // l
    .lineTo([13.709, 9.713]) // l
  .ellipseTo([13.746, 10], 0.2, 0.2, 0, false, true) // A
  .lineTo([12.641, 11.367]) // l
  .ellipseTo([12.352, 11.389], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.338, 9.576]) // l
    .lineTo([9.576, 10.338]) // l
    .lineTo([11.389, 12.352]) // l
  .ellipseTo([11.367, 12.641], 0.2, 0.2, 0, false, true) // a
  .lineTo([10, 13.746]) // L
  .ellipseTo([9.713, 13.709], 0.2, 0.2, 0, false, true) // a
  .lineTo([8.119, 11.516]) // l
    .lineTo([7.219, 12.102]) // l
    .lineTo([8.572, 14.449]) // l
  .ellipseTo([8.49, 14.727], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.924, 15.525]) // l
  .ellipseTo([6.65, 15.43], 0.2, 0.2, 0, false, true) // a
  .lineTo([5.549, 12.953]) // l
    .lineTo([4.543, 13.338]) // l
    .lineTo([5.381, 15.916]) // l
  .ellipseTo([5.242, 16.172], 0.2, 0.2, 0, false, true) // a
  .lineTo([3.545, 16.627]) // l
  .ellipseTo([3.297, 16.475], 0.2, 0.2, 0, false, true) // a
  .lineTo([2.734, 13.824]) // l
    .lineTo([1.672, 13.992]) // l
    .lineTo([1.955, 16.688]) // l
  .ellipseTo([1.766, 16.908], 0.2, 0.2, 0, false, true) // A
  .close(); // Z
// END segments

const main = (r, cfg) => {
  let shape;
  shape = makeBox([0.4, 2, 5.0]).translate([16.5, 0, -5.0])
  // shape = makeCylinder(16.9, 0.2, [0, 0]);
  shape = shape.fuse(seg_g0_path0().sketchOnPlane('XY').extrude(5.0).translateZ(-5.0));
  // shape = shape.cut(makeCylinder(13, 0.2, [0, 0]))
  // shape = shape.fuse(makeCylinder(3, 0.2, [12.5,  0]))
  // shape = shape.fuse(makeCylinder(3, 0.2, [-12.5, 0]))
  // shape = shape.fuse(makeCylinder(3, 0.2, [0,  12.5]))
  // shape = shape.fuse(makeCylinder(3, 0.2, [0, -12.5]))
  shape = shape
    .cut(makeCylinder(1.50, 20).rotate(90, [0,0,0], [0,1,0]).translateZ(-2.6)) // head
    .cut(makeBox([0, -1.20, 0], [20, 1.2, 1.2]).rotate(25.3, [0,0,0], [0,0,1]).translateZ(-2.6))
    .cut(makeBox([0, -1.20, 0], [20, 1.2, 1.2]).rotate(-126.7, [0,0,0], [0,0,1]).translateZ(-2.6))

  shape = shape.fuse(
    makeCylinder(17, 0.7, [0, 0, 0])
      .cut(makeCylinder(16.6, 0.7, [0, 0, 0])))

  // shape = shape.fuse(makeCylinder(0.2, 1.2, [-15.5, -2.7])) // fix
  // shape = shape.fuse(makeCylinder(16.6, 0.2, [0, 0]));


  return [
    {name: 'meandr-v0.3.0-nh72-39mm', shape, color: '#555', opacity: 1}
  ];
};
