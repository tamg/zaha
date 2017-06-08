export default function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(200, 200, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    if (p.mouseIsPressed) {
     p.fill(26);
   } else {
     p.fill(255);
   }
   p.ellipse(p.mouseX - p.width/2, p.mouseY - p.height/2, 80, 80);
    // p.background(100);
    // p.noStroke();
    //
    // p.push();
    // p.translate(-150, 100);
    // p.rotateY(rotation);
    // p.rotateX(-0.9);
    // p.box(100);
    // p.pop();
    //
    // p.noFill();
    // p.stroke(255);
    // p.push();
    // p.translate(500, p.height*0.35, -200);
    // p.sphere(300);
    // p.pop();
  };
};
