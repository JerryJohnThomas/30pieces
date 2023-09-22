import React from "react";
import "./ShapeDemo.css";
import Triangle_p5 from "./Triangle_p5";
import Triangle_css from "./Triangle_css";
import Animate_Tri_p5 from "./Animate_Tri_p5";
import Animate_Tri_css from "./Animate_Tri_css";
import Triangle_svg from "./Triangle_svg";
import Animate_Triangle_svg from "./Animate_Triangle_svg";

function ShapeDemo() {
    return (
        <>
            <Triangle_p5 />
            <Triangle_css />
            <Triangle_svg />
            <Animate_Tri_p5 />
            <Animate_Tri_css />
            <Animate_Triangle_svg />
        </>
    );
}

export default ShapeDemo;
