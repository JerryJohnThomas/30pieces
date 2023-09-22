import React from "react";
import "./Animate_Tri_css.css";
import { useState } from "react";
import { useEffect } from "react";

const sketch_size = 300;
const sketch_height = sketch_size;
const sketch_width = sketch_size;

function Animate_Tri_css() {
    const [left, setLeft] = useState(-50);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeft((prevLeft) => prevLeft + 0.05); // Move the triangle to the left by increasing the left position
        }, 0.1); // Adjust the speed by changing the interval (smaller value for slower movement)

        // return () => clearInterval(interval); // Cleanup when the component unmounts
    }, []);

    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1">
                <div className="sd_heading0 font_size3">Lets Move Triangle using CSS</div>
                <div className="rect_frame" style={{ width: sketch_width, height: sketch_height, marginBottom: "3vh" }}>
                    <div className="sd_triangle" style={{ marginLeft: `${left}px` }}></div>
                </div>
                <div className="roboto_text sd_text1 font_size_2_3">Done by Animating the Margin Left Attribute</div>
                <div className="roboto_text sd_text1 font_size_2_3 ">
                    Limitations we cannot exactly determine a 3 point triangle with coordinates similar in css
                </div>
                <div className="roboto_text sd_text1 font_size_2_3 ">
                    Also if too slow the Animations seem to be jittery, possible fix: use "requestAnimationFrame" instead of setInterval(...,1)
                </div>
            </div>
        </>
    );
}

export default Animate_Tri_css;
