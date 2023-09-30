import React from "react";
import "./NeatHome.css";
import Triangle from "../Demo/Triangle";
import target1 from "./assets/post_processing/target1.png"

const sketch_size = 450;
const sketch_height = sketch_size;
const sketch_width = sketch_size;


function NeatHome() {

    
    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1 bg_color7">
                <div className="sd_heading0 font_size3">NEAT</div>
                <div className="neat_container flexDirection_rowB_cols">
                    <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3">
                        <div className="font_size_2_4 text_neat_sub"> Target Image</div>
                        <div
                            className="rect_frame"
                            style={{
                                width: sketch_width,
                                height: sketch_height,
                                marginBottom: "3vh",
                                backgroundColor: "peachpuff",
                            }}
                        >
                            <img src={target1}  className="target_image_neat_container"/>
                        </div>
                    </div>
                    <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3">
                        <div className="font_size_2_4 text_neat_sub"> Training Image </div>
                        <div
                            className="rect_frame"
                            style={{
                                width: sketch_width,
                                height: sketch_height,
                                marginBottom: "3vh",
                                border: "none",
                                backgroundColor: "white",
                            }}
                        >
                            <Triangle x1={100} y1={100} x2={0} y2={100} x3={50} y3={0} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NeatHome;
