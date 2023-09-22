import React from "react";
import "./ShapeDemo.css";
import Sketch from "react-p5";
import Triangle from "./Triangle";

const sketch_size = 100;
const sketch_height = sketch_size;
const sketch_width = sketch_size;

let offset=30;
function Triangle_svg() {
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
    };
    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1">
                <div className="sd_heading1 font_size3">Lets create a Triangle with SVG</div>
                <div className="rect_frame" style={{ width: sketch_width, height: sketch_height, marginBottom: "3vh", border: "none" }}>
                    {/* <div className="sd_triangle" style={{ marginLeft: `0px`, position: "absolute" }}></div> */}
                    <Triangle x1={100} y1={100} x2={0} y2={100} x3={50} y3={0}  />
                </div>

                <div className="roboto_text sd_text1 font_size_2_3" style={{ marginTop: "5vh" }}>
                    with SVG, we can specify the 3 coordinates just like in p5
                </div>

            </div>
        </>
    );
}

export default Triangle_svg;
