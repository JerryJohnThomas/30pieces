import React from "react";
import "./ShapeDemo.css";
import Sketch from "react-p5";
import Triangle from "./Triangle";

const sketch_size = 100;
const sketch_height = sketch_size;
const sketch_width = sketch_size;

let offset=30;
function Triangle_svg() {

    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1">
                <div className="sd_heading1 font_size3">Lets create a Triangle with SVG</div>
                <div className="rect_frame" style={{ width: sketch_width, height: sketch_height, marginBottom: "3vh", border: "none" }}>
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
