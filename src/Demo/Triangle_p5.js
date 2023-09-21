import React from "react";
import "./ShapeDemo.css";
import Sketch from "react-p5";

const sketch_size = 100;
const sketch_height = sketch_size;
const sketch_width = sketch_size;

function Triangle_p5() {
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref (without that p5 will render the canvas outside of your component)
        p5.createCanvas(sketch_height, sketch_width).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background("#785EBB");
        // p5.background(0);
        p5.noStroke();
        p5.fill("#F9E049");
        p5.triangle(100, 100, 0, 100, 50, 0);
    };
    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1">
                <div className="sd_heading1 font_size3">
                    Lets create a Triangle using P5
                </div>
                <Sketch setup={setup} draw={draw} />
                <div
                    className="roboto_text sd_text1 font_size_2_3"
                    style={{ marginTop: "5vh" }}
                >
                    Advantages are ease of trianlge placement
                </div>
                <div className="roboto_text sd_text1 font_size_2_3 ">
                    Limitations are ease of animating when moving from one
                    animal to another
                </div>
            </div>
        </>
    );
}

export default Triangle_p5;
