'use strict';

const { draw, makeCylinder, makeBox, twistExtrude, drawParametricFunction } = replicad;

const circleParametric = (a, b, n) => (t) => [
  Math.pow(Math.abs(Math.cos(t)), 2 / n) * a * Math.sign(Math.cos(t)),
  Math.pow(Math.abs(Math.sin(t)), 2 / n) * b * Math.sign(Math.sin(t))
];

const approximationConfig = {pointsCount: 16, start: 0, stop: 2 * Math.PI};

// BEGIN segments
const seg_g1_path1 = () => draw()
  .movePointerTo([-1.021, 15.914]) // m
  .cubicBezierCurveTo([-12.167, 10.156], [-6.142, 15.384], [-9.78, 13.05]) // c
    .cubicBezierCurveTo([-15.869, 1.033], [-14.554, 7.263], [-15.699, 3.818]) // c
  .ellipseTo([-15.693, 0.822], 0.2, 0.2, 0, false, true) // a
  .lineTo([-15.7, 0.823]) // l
  .lineTo([-15.7, -0.5]) // V
  .ellipseTo([-15.642, -0.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([-15.142, -1.142]) // l
  .ellipseTo([-15, -1.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([-11.2, -1.2]) // h
  .lineTo([-11.2, -1.3]) // V
  .lineTo([-15, -1.3]) // H
  .ellipseTo([-15.2, -1.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-15.2, -2]) // v
  .ellipseTo([-15.142, -2.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.142, -3.142]) // l
  .ellipseTo([-14, -3.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([-10.5, -3.2]) // h
  .ellipseTo([-10.358, -3.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.358, -2.142]) // l
  .ellipseTo([-9.3, -2], 0.2, 0.2, 0, false, true) // A
  .lineTo([-9.3, 1.5]) // v
  .ellipseTo([-9.358, 1.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.358, 2.642]) // l
  .ellipseTo([-10.5, 2.7], 0.2, 0.2, 0, false, true) // A
  .lineTo([-12, 2.7]) // h
  .ellipseTo([-12.2, 2.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-12.2, 1.5]) // v
  .ellipseTo([-12.142, 1.358], 0.2, 0.2, 0, false, true) // a
  .lineTo([-11.7, 0.917]) // l
  .lineTo([-11.7, 0.7]) // v
  .lineTo([-12.8, 0.7]) // h
  .lineTo([-12.8, 0.917]) // v
  .lineTo([-12.358, 1.358]) // l
  .ellipseTo([-12.3, 1.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-12.3, 2.5]) // V
  .ellipseTo([-12.5, 2.7], 0.2, 0.2, 0, false, true) // A
  .lineTo([-14, 2.7]) // h
  .ellipseTo([-14.142, 2.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([-14.742, 2.041]) // l
  .cubicBezierCurveTo([-14.539, 3.684], [-14.744, 2.475], [-14.741, 2.945]) // c
    .cubicBezierCurveTo([-13.317, 6.787], [-14.292, 4.589], [-13.862, 5.676]) // c
  .lineTo([-10.424, 5.098]) // l
  .cubicBezierCurveTo([-9.722, 6.31], [-9.762, 4.711], [-9.06, 5.923]) // c
  .lineTo([-12.613, 7.998]) // l
  .cubicBezierCurveTo([-8.014, 12.603], [-11.555, 9.678], [-9.898, 11.4]) // c
  .lineTo([-6.372, 9.783]) // l
  .cubicBezierCurveTo([-5.16, 10.483], [-5.987, 9.121], [-4.777, 9.82]) // c
  .lineTo([-6.792, 13.311]) // l
  .cubicBezierCurveTo([-3.713, 14.523], [-6.014, 13.752], [-4.807, 14.219]) // c
    .cubicBezierCurveTo([-2.204, 14.855], [-3.133, 14.685], [-2.597, 14.803]) // c
    .cubicBezierCurveTo([-1.909, 14.874], [-2.078, 14.872], [-2, 14.871]) // c
  .lineTo([-2.642, 14.142]) // l
  .ellipseTo([-2.7, 14], 0.2, 0.2, 0, false, true) // A
  .lineTo([-2.7, 10.5]) // v
  .ellipseTo([-2.642, 10.358], 0.2, 0.2, 0, false, true) // a
  .lineTo([-1.642, 9.358]) // l
  .ellipseTo([-1.5, 9.3], 0.2, 0.2, 0, false, true) // A
  .lineTo([0, 9.3]) // H
  .ellipseTo([0.2, 9.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([0.2, 11.5]) // v
  .ellipseTo([0.142, 11.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.3, 12.083]) // l
  .lineTo([-0.3, 12.417]) // v
  .lineTo([0.083, 12.8]) // l
  .lineTo([0.417, 12.8]) // h
  .lineTo([0.8, 12.417]) // l
  .lineTo([0.8, 12.083]) // v
  .lineTo([0.358, 11.642]) // l
  .ellipseTo([0.3, 11.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([0.3, 9.5]) // v
  .ellipseTo([0.5, 9.3], 0.2, 0.2, 0, false, true) // A
  .lineTo([2, 9.3]) // h
  .ellipseTo([2.142, 9.358], 0.2, 0.2, 0, false, true) // a
  .lineTo([3.142, 10.358]) // l
  .ellipseTo([3.2, 10.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([3.2, 14]) // v
  .ellipseTo([3.142, 14.142], 0.2, 0.2, 0, false, true) // A
  .lineTo([2.549, 14.734]) // L
  .cubicBezierCurveTo([4.482, 14.455], [3.039, 14.739], [3.649, 14.703]) // c
    .cubicBezierCurveTo([7.293, 13.315], [5.464, 14.163], [6.492, 13.734]) // c
  .lineTo([5.659, 10.502]) // l
  .cubicBezierCurveTo([6.872, 9.802], [5.274, 9.839], [6.487, 9.139]) // c
  .lineTo([8.504, 12.613]) // l
  .cubicBezierCurveTo([13.119, 7.983], [10.287, 11.5], [11.962, 9.813]) // c
  .lineTo([10.333, 6.362]) // l
  .cubicBezierCurveTo([11.034, 5.15], [9.67, 5.977], [10.371, 4.765]) // c
  .lineTo([13.821, 6.771]) // l
  .cubicBezierCurveTo([15.008, 3.79], [14.252, 5.966], [14.707, 4.831]) // c
    .cubicBezierCurveTo([15.343, 2.319], [15.168, 3.236], [15.287, 2.719]) // c
    .cubicBezierCurveTo([15.371, 1.912], [15.366, 2.155], [15.37, 2.028]) // c
  .lineTo([14.642, 2.642]) // L
  .ellipseTo([14.5, 2.7], 0.2, 0.2, 0, false, true) // A
  .lineTo([11, 2.7]) // h
  .ellipseTo([10.858, 2.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([9.858, 1.642]) // l
  .ellipseTo([9.8, 1.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([9.8, 0.5]) // v
  .ellipseTo([10, 0.3], 0.2, 0.2, 0, false, true) // A
  .lineTo([11, 0.3]) // h
  .ellipseTo([11.142, 0.358], 0.2, 0.2, 0, false, true) // a
  .lineTo([11.583, 0.8]) // l
  .lineTo([13.8, 0.8]) // h
  .lineTo([13.8, 0.7]) // v
  .lineTo([12, 0.7]) // H
  .ellipseTo([11.858, 0.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([11.358, 0.142]) // l
  .ellipseTo([11.3, 0], 0.2, 0.2, 0, false, true) // A
  .lineTo([11.3, -0.5]) // v
  .ellipseTo([11.358, -0.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([11.858, -1.142]) // l
  .ellipseTo([12, -1.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([13.8, -1.2]) // h
  .lineTo([13.8, -1.3]) // V
  .lineTo([11.583, -1.3]) // H
  .lineTo([11.142, -0.858]) // L
  .ellipseTo([11, -0.8], 0.2, 0.2, 0, false, true) // A
  .lineTo([10, -0.8]) // H
  .ellipseTo([9.8, -1], 0.2, 0.2, 0, false, true) // A
  .lineTo([9.8, -2]) // v
  .ellipseTo([9.858, -2.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.858, -3.142]) // l
  .ellipseTo([11, -3.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([14.5, -3.2]) // h
  .ellipseTo([14.642, -3.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([15.37, -2.413]) // l
  .cubicBezierCurveTo([15.354, -2.705], [15.367, -2.503], [15.37, -2.582]) // c
    .cubicBezierCurveTo([15.036, -4.169], [15.304, -3.087], [15.192, -3.604]) // c
    .cubicBezierCurveTo([13.82, -7.299], [14.743, -5.234], [14.283, -6.436]) // c
  .lineTo([10.935, -5.621]) // l
  .cubicBezierCurveTo([10.233, -6.832], [10.272, -5.236], [9.571, -6.446]) // c
  .lineTo([13.116, -8.511]) // l
  .cubicBezierCurveTo([8.465, -13.12], [12.006, -10.255], [10.388, -11.923]) // c
  .lineTo([6.855, -10.312]) // l
  .cubicBezierCurveTo([5.643, -11.011], [6.474, -9.646], [5.262, -10.345]) // c
  .lineTo([7.253, -13.821]) // l
  .cubicBezierCurveTo([4.422, -14.982], [6.48, -14.253], [5.424, -14.692]) // c
    .cubicBezierCurveTo([2.96, -15.312], [3.888, -15.137], [3.379, -15.253]) // c
    .cubicBezierCurveTo([2.472, -15.312], [2.731, -15.344], [2.632, -15.316]) // c
  .lineTo([3.142, -14.642]) // L
  .ellipseTo([3.2, -14.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([3.2, -12.5]) // V
  .ellipseTo([3.142, -12.358], 0.2, 0.2, 0, false, true) // A
  .lineTo([2.642, -11.858]) // l
  .ellipseTo([2.5, -11.8], 0.2, 0.2, 0, false, true) // A
  .lineTo([-0.8, -11.8]) // H
  .lineTo([-0.8, -11.7]) // V
  .lineTo([3, -11.7]) // H
  .ellipseTo([3.2, -11.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([3.2, -11]) // V
  .ellipseTo([3.142, -10.858], 0.2, 0.2, 0, false, true) // A
  .lineTo([2.142, -9.858]) // l
  .ellipseTo([2, -9.8], 0.2, 0.2, 0, false, true) // A
  .lineTo([-1.5, -9.8]) // h
  .ellipseTo([-1.642, -9.858], 0.2, 0.2, 0, false, true) // a
  .lineTo([-2.642, -10.858]) // l
  .ellipseTo([-2.7, -11], 0.2, 0.2, 0, false, true) // A
  .lineTo([-2.7, -14.5]) // v
  .ellipseTo([-2.642, -14.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([-1.928, -15.355]) // l
  .cubicBezierCurveTo([-2.319, -15.325], [-2.042, -15.352], [-2.162, -15.348]) // c
    .cubicBezierCurveTo([-3.794, -14.994], [-2.721, -15.268], [-3.24, -15.151]) // c
    .cubicBezierCurveTo([-6.763, -13.825], [-4.835, -14.699], [-5.967, -14.254]) // c
  .lineTo([-5.124, -10.998]) // l
  .cubicBezierCurveTo([-6.335, -10.296], [-4.74, -10.335], [-5.948, -9.635]) // c
  .lineTo([-7.983, -13.113]) // l
  .cubicBezierCurveTo([-12.612, -8.496], [-9.781, -11.957], [-11.505, -10.257]) // c
  .lineTo([-9.772, -6.886]) // l
  .cubicBezierCurveTo([-10.47, -5.671], [-9.105, -6.507], [-9.803, -5.292]) // c
  .lineTo([-13.317, -7.289]) // l
  .cubicBezierCurveTo([-14.803, -2.965], [-14.064, -5.894], [-14.571, -4.263]) // c
  .ellipseTo([-15.035, -2.803], 0.2, 0.2, 0, false, true) // a
    .ellipseTo([-15.197, -3.035], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-13.586, -7.67], [-14.949, -4.428], [-14.417, -6.185]) // c
  .ellipseTo([-13.312, -7.746], 0.2, 0.2, 0, false, true) // a
  .lineTo([-10.272, -6.02]) // l
  .cubicBezierCurveTo([-9.97, -6.537], [-10.07, -5.904], [-9.767, -6.422]) // c
  .lineTo([-13.012, -8.263]) // l
  .ellipseTo([-13.085, -8.54], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-8.033, -13.583], [-11.911, -10.482], [-10.005, -12.355]) // c
  .ellipseTo([-7.755, -13.514], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.99, -10.498]) // l
  .cubicBezierCurveTo([-5.47, -10.797], [-5.872, -10.296], [-5.352, -10.595]) // c
  .lineTo([-7.225, -13.824]) // l
  .ellipseTo([-7.15, -14.098], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-3.903, -15.379], [-6.305, -14.582], [-5.036, -15.058]) // c
    .cubicBezierCurveTo([-2.376, -15.721], [-3.337, -15.539], [-2.806, -15.66]) // c
    .cubicBezierCurveTo([-1.811, -15.765], [-2.161, -15.751], [-1.972, -15.768]) // c
    .cubicBezierCurveTo([-1.391, -15.668], [-1.649, -15.761], [-1.516, -15.749]) // c
  .ellipseTo([-1.358, -15.358], 0.2, 0.2, 0, false, true) // a
  .lineTo([-2.3, -14.417]) // l
  .lineTo([-2.3, -11.083]) // v
  .lineTo([-1.417, -10.2]) // l
  .lineTo([1.917, -10.2]) // h
  .lineTo([2.8, -11.083]) // l
  .lineTo([2.8, -11.3]) // v
  .lineTo([-1, -11.3]) // H
  .ellipseTo([-1.2, -11.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-1.2, -12]) // v
  .ellipseTo([-1, -12.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([2.417, -12.2]) // h
  .lineTo([2.8, -12.583]) // l
  .lineTo([2.8, -14.417]) // v
  .lineTo([1.858, -15.358]) // l
  .ellipseTo([1.933, -15.688], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([3.016, -15.708], [2.207, -15.786], [2.569, -15.77]) // C
    .cubicBezierCurveTo([4.533, -15.367], [3.462, -15.646], [3.986, -15.526]) // C
    .cubicBezierCurveTo([7.641, -14.091], [5.628, -15.05], [6.815, -14.579]) // C
  .ellipseTo([7.712, -13.819], 0.2, 0.2, 0, false, true) // a
  .lineTo([5.989, -10.812]) // l
  .cubicBezierCurveTo([6.509, -10.511], [5.873, -10.609], [6.393, -10.308]) // c
  .lineTo([8.232, -13.52]) // l
  .ellipseTo([8.51, -13.591], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([13.586, -8.559], [10.634, -12.313], [12.408, -10.471]) // c
  .ellipseTo([13.517, -8.281], 0.2, 0.2, 0, false, true) // A
  .lineTo([10.435, -6.486]) // l
  .cubicBezierCurveTo([10.733, -5.967], [10.233, -6.369], [10.532, -5.849]) // c
  .lineTo([13.819, -7.761]) // l
  .ellipseTo([14.094, -7.687], 0.2, 0.2, 0, false, true) // A
  .cubicBezierCurveTo([15.422, -4.274], [14.616, -6.768], [15.104, -5.429]) // C
    .cubicBezierCurveTo([15.75, -2.757], [15.581, -3.697], [15.696, -3.168]) // C
    .cubicBezierCurveTo([15.779, -2.229], [15.777, -2.551], [15.788, -2.375]) // C
    .cubicBezierCurveTo([15.614, -1.836], [15.77, -2.082], [15.765, -1.941]) // C
  .ellipseTo([15.358, -1.858], 0.2, 0.2, 0, false, true) // a
  .lineTo([14.417, -2.8]) // L
  .lineTo([11.083, -2.8]) // H
  .lineTo([10.2, -1.917]) // L
  .lineTo([10.2, -1.2]) // V
  .lineTo([10.917, -1.2]) // h
  .lineTo([11.358, -1.642]) // l
  .ellipseTo([11.5, -1.7], 0.2, 0.2, 0, false, true) // A
  .lineTo([14, -1.7]) // h
  .ellipseTo([14.2, -1.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([14.2, -1]) // V
  .ellipseTo([14, -0.8], 0.2, 0.2, 0, false, true) // A
  .lineTo([12.083, -0.8]) // H
  .lineTo([11.7, -0.417]) // L
  .lineTo([11.7, -0.083]) // V
  .lineTo([12.083, 0.3]) // l
  .lineTo([14, 0.3]) // H
  .ellipseTo([14.2, 0.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([14.2, 1]) // V
  .ellipseTo([14, 1.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([11.5, 1.2]) // h
  .ellipseTo([11.358, 1.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.917, 0.7]) // l
  .lineTo([10.2, 0.7]) // h
  .lineTo([10.2, 1.417]) // v
  .lineTo([11.083, 2.3]) // l
  .lineTo([14.417, 2.3]) // h
  .lineTo([15.358, 1.358]) // l
  .ellipseTo([15.661, 1.382], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([15.776, 1.807], [15.752, 1.506], [15.77, 1.644]) // c
    .cubicBezierCurveTo([15.738, 2.374], [15.783, 1.969], [15.768, 2.159]) // c
    .cubicBezierCurveTo([15.392, 3.901], [15.679, 2.804], [15.555, 3.335]) // c
    .cubicBezierCurveTo([14.095, 7.158], [15.064, 5.034], [14.577, 6.305]) // c
  .ellipseTo([13.82, 7.232], 0.2, 0.2, 0, false, true) // a
  .lineTo([10.834, 5.496]) // l
  .cubicBezierCurveTo([10.534, 6.017], [10.632, 5.379], [10.332, 5.899]) // c
  .lineTo([13.519, 7.753]) // l
  .ellipseTo([13.589, 8.03], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([8.549, 13.084], [12.359, 10.041], [10.514, 11.902]) // c
  .ellipseTo([8.272, 13.013], 0.2, 0.2, 0, false, true) // a
  .lineTo([6.525, 10.002]) // l
  .cubicBezierCurveTo([6.006, 10.302], [6.408, 9.8], [5.889, 10.1]) // c
  .lineTo([7.753, 13.312]) // l
  .ellipseTo([7.676, 13.588], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([4.597, 14.839], [6.824, 14.053], [5.672, 14.519]) // c
    .cubicBezierCurveTo([1.949, 15.193], [3.522, 15.159], [2.552, 15.353]) // c
  .ellipseTo([1.858, 14.858], 0.2, 0.2, 0, false, true) // a
  .lineTo([2.8, 13.917]) // l
  .lineTo([2.8, 10.583]) // v
  .lineTo([1.917, 9.7]) // l
  .lineTo([0.7, 9.7]) // H
  .lineTo([0.7, 11.417]) // v
  .lineTo([1.142, 11.858]) // l
  .ellipseTo([1.2, 12], 0.2, 0.2, 0, false, true) // A
  .lineTo([1.2, 12.5]) // v
  .ellipseTo([1.142, 12.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([0.642, 13.142]) // l
  .ellipseTo([0.5, 13.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([0, 13.2]) // H
  .ellipseTo([-0.142, 13.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.642, 12.642]) // l
  .ellipseTo([-0.7, 12.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-0.7, 12]) // v
  .ellipseTo([-0.642, 11.858], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.2, 11.417]) // l
  .lineTo([-0.2, 9.7]) // v
  .lineTo([-1.417, 9.7]) // H
  .lineTo([-2.3, 10.583]) // l
  .lineTo([-2.3, 13.917]) // v
  .lineTo([-1.358, 14.858]) // l
  .ellipseTo([-1.321, 15.089], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-1.51, 15.246], [-1.366, 15.179], [-1.443, 15.222]) // c
    .cubicBezierCurveTo([-1.718, 15.284], [-1.576, 15.27], [-1.643, 15.279]) // c
    .cubicBezierCurveTo([-2.257, 15.252], [-1.867, 15.294], [-2.045, 15.28]) // c
    .cubicBezierCurveTo([-3.82, 14.909], [-2.68, 15.195], [-3.228, 15.074]) // c
    .cubicBezierCurveTo([-7.184, 13.58], [-5.004, 14.58], [-6.354, 14.086]) // c
  .ellipseTo([-7.253, 13.309], 0.2, 0.2, 0, false, true) // a
  .lineTo([-5.507, 10.284]) // l
  .cubicBezierCurveTo([-6.026, 9.984], [-5.39, 10.082], [-5.909, 9.782]) // c
  .lineTo([-7.784, 13.003]) // l
  .ellipseTo([-8.062, 13.073], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-13.083, 8.045], [-10.141, 11.792], [-11.964, 9.886]) // c
  .ellipseTo([-13.013, 7.768], 0.2, 0.2, 0, false, true) // a
  .lineTo([-9.924, 5.964]) // l
  .cubicBezierCurveTo([-10.222, 5.443], [-9.722, 5.846], [-10.02, 5.326]) // c
  .lineTo([-13.317, 7.25]) // L
  .ellipseTo([-13.597, 7.168], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-14.925, 3.789], [-14.207, 5.958], [-14.653, 4.783]) // c
    .cubicBezierCurveTo([-15.196, 1.461], [-15.196, 2.795], [-15.302, 1.992]) // c
  .ellipseTo([-14.858, 1.358], 0.2, 0.2, 0, false, true) // a
  .lineTo([-13.917, 2.3]) // l
  .lineTo([-12.7, 2.3]) // h
  .lineTo([-12.7, 1.583]) // v
  .lineTo([-13.142, 1.142]) // l
  .ellipseTo([-13.2, 1], 0.2, 0.2, 0, false, true) // A
  .lineTo([-13.2, 0.5]) // v
  .ellipseTo([-13, 0.3], 0.2, 0.2, 0, false, true) // A
  .lineTo([-11.5, 0.3]) // h
  .ellipseTo([-11.3, 0.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-11.3, 1]) // v
  .ellipseTo([-11.358, 1.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([-11.8, 1.583]) // l
  .lineTo([-11.8, 2.3]) // v
  .lineTo([-10.583, 2.3]) // h
  .lineTo([-9.7, 1.417]) // l
  .lineTo([-9.7, -1.917]) // v
  .lineTo([-10.583, -2.8]) // l
  .lineTo([-13.917, -2.8]) // h
  .lineTo([-14.8, -1.917]) // l
  .lineTo([-14.8, -1.7]) // V
  .lineTo([-11, -1.7]) // H
  .ellipseTo([-10.8, -1.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-10.8, -1]) // V
  .ellipseTo([-11, -0.8], 0.2, 0.2, 0, false, true) // A
  .lineTo([-14.917, -0.8]) // h
  .lineTo([-15.3, -0.417]) // L
  .lineTo([-15.3, 1]) // V
  .ellipseTo([-15.447, 1.166], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-11.858, 9.901], [-15.251, 3.836], [-14.143, 7.132]) // c
    .cubicBezierCurveTo([-1.177, 15.477], [-9.563, 12.683], [-6.086, 14.916]) // c
  .ellipseTo([-1, 15.3], 0.2, 0.2, 0, false, true) // A
  .lineTo([1.5, 15.3]) // h
  .ellipseTo([1.666, 15.466], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([15.97, 1.17], [8.932, 14.886], [15.377, 8.91]) // C
  .ellipseTo([15.8, 1], 0.2, 0.2, 0, false, true) // A
  .lineTo([15.8, 0.583]) // v
  .lineTo([15.358, 0.142]) // l
  .ellipseTo([15.3, 0], 0.2, 0.2, 0, false, true) // A
  .lineTo([15.3, -0.5]) // v
  .ellipseTo([15.358, -0.642], 0.2, 0.2, 0, false, true) // a
  .lineTo([15.8, -1.083]) // l
  .lineTo([15.8, -1.5]) // V
  .ellipseTo([15.977, -1.677], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([1.664, -15.964], [15.506, -8.105], [10.333, -15.118]) // C
  .ellipseTo([1.5, -15.8], 0.2, 0.2, 0, false, true) // A
  .lineTo([0.7, -15.8]) // H
  .lineTo([0.7, -14.583]) // V
  .lineTo([1.142, -14.142]) // L
  .ellipseTo([1.2, -14], 0.2, 0.2, 0, false, true) // A
  .lineTo([1.2, -13.5]) // V
  .ellipseTo([1, -13.3], 0.2, 0.2, 0, false, true) // A
  .lineTo([-0.5, -13.3]) // H
  .ellipseTo([-0.7, -13.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([-0.7, -14]) // v
  .ellipseTo([-0.642, -14.142], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.2, -14.583]) // l
  .lineTo([-0.2, -15.8]) // v
  .lineTo([-1, -15.8]) // H
  .ellipseTo([-1.166, -15.966], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-15.303, -2.966], [-9.662, -15.071], [-14.324, -8.643]) // C
  .ellipseTo([-15.534, -2.803], 0.2, 0.2, 0, false, true) // a
    .ellipseTo([-15.697, -3.034], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([-1.019, -16.397], [-14.683, -8.916], [-9.823, -15.564]) // c
  .ellipseTo([-0.8, -16.199], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.8, -16.2]) // v
  .lineTo([0, -16.2]) // H
  .ellipseTo([0.2, -16], 0.2, 0.2, 0, false, true) // A
  .lineTo([0.2, -14.5]) // v
  .ellipseTo([0.142, -14.358], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.3, -13.917]) // l
  .lineTo([-0.3, -13.7]) // V
  .lineTo([0.8, -13.7]) // H
  .lineTo([0.8, -13.917]) // v
  .lineTo([0.358, -14.358]) // L
  .ellipseTo([0.3, -14.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([0.3, -16]) // v
  .ellipseTo([0.5, -16.2], 0.2, 0.2, 0, false, true) // A
  .lineTo([1.304, -16.2]) // h
  .ellipseTo([1.518, -16.396], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([16.404, -1.512], [10.587, -15.611], [16.008, -8.233]) // C
  .ellipseTo([16.205, -1.3], 0.2, 0.2, 0, false, true) // A
  .lineTo([16.2, -1.3]) // h
  .lineTo([16.2, -1]) // V
  .ellipseTo([16.142, -0.858], 0.2, 0.2, 0, false, true) // A
  .lineTo([15.7, -0.417]) // L
  .lineTo([15.7, -0.083]) // V
  .lineTo([16.142, 0.358]) // l
  .ellipseTo([16.2, 0.5], 0.2, 0.2, 0, false, true) // A
  .lineTo([16.2, 0.802]) // v
  .ellipseTo([16.398, 1.013], 0.2, 0.2, 0, false, true) // a
  .cubicBezierCurveTo([1.514, 15.894], [15.879, 9.117], [9.115, 15.382]) // C
  .ellipseTo([1.306, 15.7], 0.2, 0.2, 0, false, true) // a
  .lineTo([-0.8, 15.7]) // h
  .lineTo([-0.8, 15.715]) // v
  .ellipseTo([-1.021, 15.914], 0.2, 0.2, 0, false, true) // a
  .close(); // z
// END segments

const main = (r, cfg) => {
  let shape;
  shape = makeCylinder(16.9, 0.2, [0, 0]);
  shape = shape.cut(makeCylinder(13, 0.2, [0, 0]))
  shape = shape.fuse(makeCylinder(3, 0.2, [12.5,  0]))
  shape = shape.fuse(makeCylinder(3, 0.2, [-12.5, 0]))
  shape = shape.fuse(makeCylinder(3, 0.2, [0,  12.5]))
  shape = shape.fuse(makeCylinder(3, 0.2, [0, -12.5]))
  shape = shape.fuse(seg_g1_path1().sketchOnPlane('XY').extrude(1.0).translate([-0.25, 0.25, 0.2]));
  shape = shape.fuse(
    makeCylinder(16.2, 1.0, [0, 0, 1.2])
      .cut(makeCylinder(15.9, 1.0, [0, 0, 1.2])))
  shape = shape.fuse(makeCylinder(0.2, 1.2, [-15.5, -2.7])) // fix
  // shape = shape.fuse(makeCylinder(16.6, 0.2, [0, 0]));


  return [
    {name: 'nh72-39mm-holder-v0.7.0', shape, color: '#555', opacity: 1}
  ];
};
