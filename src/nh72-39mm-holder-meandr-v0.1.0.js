'use strict';

const { draw, makeCylinder, makeBox, twistExtrude, drawParametricFunction } = replicad;

const circleParametric = (a, b, n) => (t) => [
  Math.pow(Math.abs(Math.cos(t)), 2 / n) * a * Math.sign(Math.cos(t)),
  Math.pow(Math.abs(Math.sin(t)), 2 / n) * b * Math.sign(Math.sin(t))
];

const approximationConfig = {pointsCount: 16, start: 0, stop: 2 * Math.PI};

// BEGIN segments
const seg_g0_path0 = () => draw()
  .movePointerTo([0.01, 16.9]) // m
  .ellipseTo([-0.199, 16.699], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.199, 13.789]) // v
  .lineTo([-1.242, 13.734]) // l
    .lineTo([-1.547, 16.631]) // l
  .ellipseTo([-1.777, 16.807], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.504, 16.533]) // l
  .ellipseTo([-3.668, 16.293], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.062, 13.447]) // l
    .lineTo([-4.072, 13.176]) // l
    .lineTo([-4.971, 15.945]) // l
  .ellipseTo([-5.232, 16.07], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.865, 15.443]) // l
  .ellipseTo([-6.977, 15.174], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.791, 12.516]) // l
    .lineTo([-6.721, 12.043]) // l
    .lineTo([-8.178, 14.562]) // l
  .ellipseTo([-8.459, 14.631], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.926, 13.68]) // l
  .ellipseTo([-9.979, 13.393], 0.2, 0.2, 0, false, true) // a
  .lineTo([-8.268, 11.039]) // l
    .lineTo([-9.078, 10.383]) // l
    .lineTo([-11.025, 12.545]) // l
  .ellipseTo([-11.314, 12.553], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.553, 11.314]) // l
  .ellipseTo([-12.545, 11.025], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.383, 9.078]) // l
    .lineTo([-11.039, 8.268]) // l
    .lineTo([-13.393, 9.979]) // l
  .ellipseTo([-13.68, 9.926], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.631, 8.459]) // l
  .ellipseTo([-14.563, 8.178], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.043, 6.721]) // l
    .lineTo([-12.516, 5.791]) // l
    .lineTo([-15.174, 6.977]) // l
  .ellipseTo([-15.443, 6.865], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.07, 5.232]) // l
  .ellipseTo([-15.945, 4.971], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.176, 4.072]) // l
    .lineTo([-13.447, 3.062]) // l
    .lineTo([-16.293, 3.668]) // l
  .ellipseTo([-16.533, 3.504], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.807, 1.777]) // l
  .ellipseTo([-16.631, 1.547], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.734, 1.242]) // l
    .lineTo([-13.789, 0.199]) // l
  .lineTo([-16.699, 0.199]) // h
  .ellipseTo([-16.9, -0.01], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.809, -1.756]) // l
  .ellipseTo([-16.588, -1.945], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.693, -1.641]) // l
    .lineTo([-13.529, -2.672]) // l
    .lineTo([-16.377, -3.275]) // l
  .ellipseTo([-16.527, -3.523], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.076, -5.213]) // l
  .ellipseTo([-15.82, -5.352], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.053, -4.451]) // l
    .lineTo([-12.68, -5.426]) // l
    .lineTo([-15.338, -6.609]) // l
  .ellipseTo([-15.434, -6.883], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.641, -8.441]) // l
  .ellipseTo([-14.363, -8.523], 0.2, 0.2, 0, false, true) // a
  .lineTo([-11.842, -7.068]) // l
    .lineTo([-11.273, -7.943]) // l
    .lineTo([-13.629, -9.654]) // l
  .ellipseTo([-13.666, -9.941], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.566, -11.301]) // l
  .ellipseTo([-12.277, -11.322], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.113, -9.375]) // L
    .lineTo([-9.375, -10.113]) // L
  .lineTo([-11.322, -12.277]) // l
  .ellipseTo([-11.301, -12.566], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.941, -13.666]) // l
  .ellipseTo([-9.654, -13.629], 0.2, 0.2, 0, false, true) // a
  .lineTo([-7.943, -11.273]) // l
    .lineTo([-7.068, -11.842]) // l
    .lineTo([-8.523, -14.363]) // l
  .ellipseTo([-8.441, -14.641], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.883, -15.434]) // l
  .ellipseTo([-6.609, -15.338], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.426, -12.68]) // l
    .lineTo([-4.451, -13.053]) // l
    .lineTo([-5.352, -15.82]) // l
  .ellipseTo([-5.213, -16.076], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.523, -16.527]) // l
  .ellipseTo([-3.275, -16.377], 0.2, 0.2, 0, false, true) // a
  .lineTo([-2.672, -13.529]) // l
    .lineTo([-1.641, -13.693]) // l
    .lineTo([-1.945, -16.588]) // l
  .ellipseTo([-1.756, -16.809], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.01, -16.9]) // l
  .ellipseTo([0.199, -16.699], 0.2, 0.2, 0, false, true) // a
  .lineTo([0.199, -13.789]) // v
  .lineTo([1.242, -13.734]) // l
    .lineTo([1.547, -16.631]) // l
  .ellipseTo([1.777, -16.807], 0.2, 0.2, 0, false, true) // a
  .lineTo([3.504, -16.533]) // L
  .ellipseTo([3.668, -16.293], 0.2, 0.2, 0, false, true) // A
  .lineTo([3.063, -13.447]) // L
    .lineTo([4.072, -13.176]) // L
    .lineTo([4.971, -15.945]) // L
  .ellipseTo([5.232, -16.07], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.865, -15.443]) // L
  .ellipseTo([6.977, -15.174], 0.2, 0.2, 0, false, true) // A
  .lineTo([5.791, -12.516]) // L
    .lineTo([6.721, -12.043]) // L
    .lineTo([8.178, -14.563]) // L
  .ellipseTo([8.459, -14.631], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.926, -13.68]) // l
  .ellipseTo([9.979, -13.393], 0.2, 0.2, 0, false, true) // a
  .lineTo([8.268, -11.039]) // l
    .lineTo([9.078, -10.383]) // l
    .lineTo([11.025, -12.545]) // l
  .ellipseTo([11.314, -12.553], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.553, -11.314]) // l
  .ellipseTo([12.545, -11.025], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.383, -9.078]) // l
    .lineTo([11.039, -8.268]) // l
    .lineTo([13.393, -9.979]) // l
  .ellipseTo([13.68, -9.926], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.631, -8.459]) // L
  .ellipseTo([14.563, -8.178], 0.2, 0.2, 0, false, true) // A
  .lineTo([12.043, -6.721]) // L
    .lineTo([12.516, -5.791]) // L
    .lineTo([15.174, -6.977]) // L
  .ellipseTo([15.443, -6.865], 0.2, 0.2, 0, false, true) // A
  .lineTo([16.07, -5.232]) // L
  .ellipseTo([15.945, -4.971], 0.2, 0.2, 0, false, true) // A
  .lineTo([13.176, -4.072]) // L
    .lineTo([13.447, -3.063]) // L
    .lineTo([16.293, -3.668]) // L
  .ellipseTo([16.533, -3.504], 0.2, 0.2, 0, false, true) // A
  .lineTo([16.807, -1.777]) // L
  .ellipseTo([16.631, -1.547], 0.2, 0.2, 0, false, true) // A
  .lineTo([13.734, -1.242]) // l
    .lineTo([13.789, -0.199]) // l
  .lineTo([16.699, -0.199]) // h
  .lineTo([16.699, 0.199]) // v
  .lineTo([13.6, 0.199]) // h
  .ellipseTo([13.4, 0.01], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.326, -1.412]) // l
  .ellipseTo([13.504, -1.621], 0.2, 0.2, 0, false, true) // a
  .lineTo([16.379, -1.924]) // l
    .lineTo([16.17, -3.232]) // l
    .lineTo([13.344, -2.633]) // l
  .ellipseTo([13.109, -2.775], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.74, -4.15]) // l
  .ellipseTo([12.873, -4.393], 0.2, 0.2, 0, false, true) // a
  .lineTo([15.621, -5.287]) // l
    .lineTo([15.145, -6.523]) // l
    .lineTo([12.506, -5.35]) // l
  .ellipseTo([12.246, -5.441], 0.2, 0.2, 0, false, true) // a
  .lineTo([11.6, -6.709]) // l
  .ellipseTo([11.678, -6.973], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.18, -8.418]) // L
    .lineTo([13.459, -9.531]) // L
    .lineTo([11.121, -7.832]) // L
  .ellipseTo([10.848, -7.867], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.951, -8.975]) // L
  .ellipseTo([9.973, -9.248], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.121, -11.182]) // L
    .lineTo([11.182, -12.121]) // L
    .lineTo([9.248, -9.973]) // L
  .ellipseTo([8.975, -9.951], 0.2, 0.2, 0, false, true) // A
  .lineTo([7.867, -10.848]) // L
  .ellipseTo([7.832, -11.121], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.531, -13.459]) // L
    .lineTo([8.418, -14.18]) // L
    .lineTo([6.973, -11.678]) // L
  .ellipseTo([6.709, -11.6], 0.2, 0.2, 0, false, true) // a
  .lineTo([5.441, -12.246]) // l
  .ellipseTo([5.35, -12.506], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.523, -15.145]) // L
    .lineTo([5.287, -15.621]) // L
    .lineTo([4.393, -12.873]) // L
  .ellipseTo([4.15, -12.74], 0.2, 0.2, 0, false, true) // A
  .lineTo([2.775, -13.109]) // l
  .ellipseTo([2.633, -13.344], 0.2, 0.2, 0, false, true) // A
  .lineTo([3.232, -16.17]) // l
    .lineTo([1.924, -16.379]) // l
    .lineTo([1.621, -13.504]) // l
  .ellipseTo([1.412, -13.326], 0.2, 0.2, 0, false, true) // A
  .lineTo([-0.01, -13.4]) // l
  .ellipseTo([-0.199, -13.6], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.199, -16.488]) // v
  .lineTo([-1.525, -16.422]) // l
    .lineTo([-1.223, -13.545]) // l
  .ellipseTo([-1.391, -13.328], 0.2, 0.2, 0, false, true) // A
  .lineTo([-2.797, -13.105]) // l
  .ellipseTo([-3.023, -13.262], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.625, -16.088]) // L
  .lineTo([-4.906, -15.744]) // l
    .lineTo([-4.014, -12.996]) // l
  .ellipseTo([-4.131, -12.748], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.461, -12.236]) // l
  .ellipseTo([-5.715, -12.342], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.891, -14.982]) // l
    .lineTo([-8.072, -14.381]) // l
    .lineTo([-6.627, -11.879]) // l
  .ellipseTo([-6.691, -11.609], 0.2, 0.2, 0, false, true) // a
  .lineTo([-7.885, -10.836]) // l
  .ellipseTo([-8.156, -10.885], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.855, -13.223]) // l
    .lineTo([-10.885, -12.389]) // l
    .lineTo([-8.951, -10.24]) // l
  .ellipseTo([-8.959, -9.965], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.965, -8.959]) // L
  .ellipseTo([-10.24, -8.951], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.389, -10.885]) // l
    .lineTo([-13.223, -9.855]) // l
    .lineTo([-10.885, -8.156]) // l
  .ellipseTo([-10.836, -7.885], 0.2, 0.2, 0, false, true) // a
  .lineTo([-11.609, -6.691]) // l
  .ellipseTo([-11.879, -6.627], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.381, -8.072]) // l
    .lineTo([-14.982, -6.891]) // l
    .lineTo([-12.342, -5.715]) // l
  .ellipseTo([-12.236, -5.461], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.748, -4.131]) // L
  .ellipseTo([-12.996, -4.014], 0.2, 0.2, 0, false, true) // A
  .lineTo([-15.744, -4.906]) // L
    .lineTo([-16.088, -3.625]) // L
    .lineTo([-13.262, -3.023]) // L
  .ellipseTo([-13.105, -2.797], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.328, -1.391]) // l
  .ellipseTo([-13.545, -1.223], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.422, -1.525]) // l
    .lineTo([-16.488, -0.199]) // l
  .lineTo([-13.6, -0.199]) // h
  .ellipseTo([-13.4, -0.01], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.326, 1.412]) // l
  .ellipseTo([-13.504, 1.621], 0.2, 0.2, 0, false, true) // a
  .lineTo([-16.379, 1.924]) // l
    .lineTo([-16.17, 3.232]) // l
    .lineTo([-13.344, 2.633]) // l
  .ellipseTo([-13.109, 2.775], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.74, 4.15]) // l
  .ellipseTo([-12.873, 4.393], 0.2, 0.2, 0, false, true) // a
  .lineTo([-15.621, 5.287]) // l
    .lineTo([-15.145, 6.523]) // l
    .lineTo([-12.506, 5.35]) // l
  .ellipseTo([-12.246, 5.441], 0.2, 0.2, 0, false, true) // a
  .lineTo([-11.6, 6.709]) // l
  .ellipseTo([-11.678, 6.973], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.18, 8.418]) // l
    .lineTo([-13.459, 9.531]) // l
    .lineTo([-11.121, 7.832]) // l
  .ellipseTo([-10.848, 7.867], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.951, 8.975]) // l
  .ellipseTo([-9.973, 9.248], 0.2, 0.2, 0, false, true) // a
  .lineTo([-12.121, 11.182]) // l
    .lineTo([-11.182, 12.121]) // l
    .lineTo([-9.248, 9.973]) // l
  .ellipseTo([-8.975, 9.951], 0.2, 0.2, 0, false, true) // a
  .lineTo([-7.867, 10.848]) // l
  .ellipseTo([-7.832, 11.121], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.531, 13.459]) // l
    .lineTo([-8.418, 14.18]) // l
    .lineTo([-6.973, 11.678]) // l
  .ellipseTo([-6.709, 11.6], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.441, 12.246]) // l
  .ellipseTo([-5.35, 12.506], 0.2, 0.2, 0, false, true) // a
  .lineTo([-6.523, 15.145]) // l
    .lineTo([-5.287, 15.621]) // l
    .lineTo([-4.393, 12.873]) // l
  .ellipseTo([-4.15, 12.74], 0.2, 0.2, 0, false, true) // a
  .lineTo([-2.775, 13.109]) // l
  .ellipseTo([-2.633, 13.344], 0.2, 0.2, 0, false, true) // a
  .lineTo([-3.232, 16.17]) // l
    .lineTo([-1.924, 16.379]) // l
    .lineTo([-1.621, 13.504]) // l
  .ellipseTo([-1.412, 13.326], 0.2, 0.2, 0, false, true) // a
  .lineTo([0.01, 13.4]) // l
  .ellipseTo([0.199, 13.6], 0.2, 0.2, 0, false, true) // a
  .lineTo([0.199, 16.488]) // v
  .lineTo([1.525, 16.422]) // l
    .lineTo([1.223, 13.545]) // l
  .ellipseTo([1.391, 13.328], 0.2, 0.2, 0, false, true) // a
  .lineTo([2.797, 13.105]) // l
  .ellipseTo([3.023, 13.262], 0.2, 0.2, 0, false, true) // a
  .lineTo([3.625, 16.088]) // L
  .lineTo([4.906, 15.744]) // l
    .lineTo([4.014, 12.996]) // l
  .ellipseTo([4.131, 12.748], 0.2, 0.2, 0, false, true) // a
  .lineTo([5.461, 12.236]) // l
  .ellipseTo([5.715, 12.342], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.891, 14.982]) // l
    .lineTo([8.072, 14.381]) // l
    .lineTo([6.627, 11.879]) // l
  .ellipseTo([6.691, 11.609], 0.2, 0.2, 0, false, true) // a
  .lineTo([7.885, 10.836]) // l
  .ellipseTo([8.156, 10.885], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.855, 13.223]) // l
    .lineTo([10.885, 12.389]) // l
    .lineTo([8.951, 10.24]) // l
  .ellipseTo([8.959, 9.965], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.965, 8.959]) // l
  .ellipseTo([10.24, 8.951], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.389, 10.885]) // l
    .lineTo([13.223, 9.855]) // l
    .lineTo([10.885, 8.156]) // l
  .ellipseTo([10.836, 7.885], 0.2, 0.2, 0, false, true) // a
  .lineTo([11.609, 6.691]) // l
  .ellipseTo([11.879, 6.627], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.381, 8.072]) // l
    .lineTo([14.982, 6.891]) // l
    .lineTo([12.342, 5.715]) // l
  .ellipseTo([12.236, 5.461], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.748, 4.131]) // l
  .ellipseTo([12.996, 4.014], 0.2, 0.2, 0, false, true) // a
  .lineTo([15.744, 4.906]) // l
    .lineTo([16.088, 3.625]) // l
    .lineTo([13.262, 3.023]) // l
  .ellipseTo([13.105, 2.797], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.328, 1.391]) // l
  .ellipseTo([13.545, 1.223], 0.2, 0.2, 0, false, true) // a
  .lineTo([16.631, 1.547]) // l
    .lineTo([16.588, 1.945]) // l
    .lineTo([13.693, 1.641]) // l
    .lineTo([13.529, 2.672]) // l
    .lineTo([16.377, 3.275]) // l
  .ellipseTo([16.527, 3.523], 0.2, 0.2, 0, false, true) // a
  .lineTo([16.076, 5.213]) // l
  .ellipseTo([15.82, 5.352], 0.2, 0.2, 0, false, true) // a
  .lineTo([13.053, 4.451]) // l
    .lineTo([12.68, 5.426]) // l
    .lineTo([15.338, 6.609]) // l
  .ellipseTo([15.434, 6.883], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.641, 8.441]) // l
  .ellipseTo([14.363, 8.523], 0.2, 0.2, 0, false, true) // a
  .lineTo([11.842, 7.068]) // l
    .lineTo([11.273, 7.943]) // l
    .lineTo([13.629, 9.654]) // l
  .ellipseTo([13.666, 9.941], 0.2, 0.2, 0, false, true) // a
  .lineTo([12.566, 11.301]) // l
  .ellipseTo([12.277, 11.322], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.113, 9.375]) // L
    .lineTo([9.375, 10.113]) // L
  .lineTo([11.322, 12.277]) // l
  .ellipseTo([11.301, 12.566], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.941, 13.666]) // l
  .ellipseTo([9.654, 13.629], 0.2, 0.2, 0, false, true) // a
  .lineTo([7.943, 11.273]) // l
    .lineTo([7.068, 11.842]) // l
    .lineTo([8.523, 14.363]) // l
  .ellipseTo([8.441, 14.641], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.883, 15.434]) // l
  .ellipseTo([6.609, 15.338], 0.2, 0.2, 0, false, true) // a
  .lineTo([5.426, 12.68]) // l
    .lineTo([4.451, 13.053]) // l
    .lineTo([5.352, 15.82]) // l
  .ellipseTo([5.213, 16.076], 0.2, 0.2, 0, false, true) // a
  .lineTo([3.523, 16.527]) // l
  .ellipseTo([3.275, 16.377], 0.2, 0.2, 0, false, true) // a
  .lineTo([2.672, 13.529]) // l
    .lineTo([1.641, 13.693]) // l
    .lineTo([1.945, 16.588]) // l
  .ellipseTo([1.756, 16.809], 0.2, 0.2, 0, false, true) // a
  .close(); // z
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
    makeCylinder(16.9, 0.7, [0, 0, 0])
      .cut(makeCylinder(16.5, 0.7, [0, 0, 0])))

  // shape = shape.fuse(makeCylinder(0.2, 1.2, [-15.5, -2.7])) // fix
  // shape = shape.fuse(makeCylinder(16.6, 0.2, [0, 0]));


  return [
    {name: 'nh72-39mm-holder-meandr-v0.1.0', shape, color: '#555', opacity: 1}
  ];
};
