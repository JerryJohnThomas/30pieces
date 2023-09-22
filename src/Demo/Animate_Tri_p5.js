import React from "react";
import "./ShapeDemo.css";
import Sketch from "react-p5";

const sketch_size = 300;
const sketch_height = sketch_size;
const sketch_width = sketch_size;

let delta = 0.1;
let offset = 0;

function Animate_Tri_p5() {
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref (without that p5 will render the canvas outside of your component)
        p5.createCanvas(sketch_height, sketch_width).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background("#785EBB");
        // p5.background(0);
        p5.noStroke();
        p5.fill("#F9E049");
        p5.triangle(100 + offset, 100, 0 + offset, 100, 50 + offset, 0);
        offset+=delta;
        p5.noFill();
        p5.stroke("#fff");
        p5.rect(0,0,sketch_width,sketch_height);
    };
    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1">
                <div className="sd_heading0 font_size3">Lets Move the Triangle using P5</div>
                <Sketch setup={setup} draw={draw} />
                <div className="roboto_text sd_text1 font_size_2_3" style={{ marginTop: "5vh" }}>
                    Done by adding a delta value to the position in each frame
                </div>
                <div className="roboto_text sd_text1 font_size_2_3 ">
                    Limitations are ease of animating when moving from one animal to another
                </div>
            </div>
        </>
    );
}

export default Animate_Tri_p5;
