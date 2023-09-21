import React from "react";

const sketch_size = 100;
const sketch_height = sketch_size;
const sketch_width = sketch_size;

function Triangle_css() {

    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1">
                <div className="sd_heading1 font_size3">
                    Lets create a Triangle using CSS
                </div>
                <div className="sd_triangle"></div>
                <div
                    className="roboto_text sd_text1 font_size_2_3"
                    style={{ marginTop: "5vh" }}
                >
                    Advantages are hopefully easier animation in the future
                </div>
                <div className="roboto_text sd_text1 font_size_2_3 ">
                    Limitations are we specify border-left, right etc to determine the shape
                </div>
            </div>
        </>
    );
}

export default Triangle_css;
