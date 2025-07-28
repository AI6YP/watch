'use strict';

const { draw, makeCylinder, makeBox, twistExtrude } = replicad;

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

  const holder1 = draw()
    .vLine(-1.75)
    .line( 1.50, -1.50)
    .vLine(-2.75)
    .hLine(1.50)
    .vLine(4.50)
    .line(1.25, 1.25)
    .vLine(0.25)
    .close()
    .translate([-16.90, 0.00])
    .sketchOnPlane('XZ').revolve()

  const holder2 = [0,1,2,3,4,5,6,7,8,9,10,11].reduce((res, e) => {
    return res.fuse(makeCylinder(2.00, 1).translateX(14).rotate(e * 30))
  }, holder1);

  const holder3 = holder2
    .cut(makeCylinder(1.50, 20).rotate(90, [0,0,0], [0,1,0]).translateZ(-2.6)) // head
    .cut(makeBox([0, -1.20, 0], [20, 1.2, 1.2]).rotate(25.3, [0,0,0], [0,0,1]).translateZ(-2.6))
    .cut(makeBox([0, -1.20, 0], [20, 1.2, 1.2]).rotate(-126.7, [0,0,0], [0,0,1]).translateZ(-2.6))
  return [
    // {name: '39mm-case', shape: wcase, color: '#f00', opacity: .2},
    {name: 'nh72-39mm-holder-v0.2.0', shape: holder3, color: '#555', opacity: 1}
  ];
};
