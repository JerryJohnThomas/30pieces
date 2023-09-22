import React from "react";
import "./ShapeDemo.css";
import Sketch from "react-p5";
import Triangle from "./Triangle";
import { useState } from "react";
import { useEffect } from "react";

const sketch_size = 300;
const sketch_height = sketch_size;
const sketch_width = sketch_size;

let offset = 30;
function Animate_Triangle_svg() {
    const [animationProgress, setAnimationProgress] = useState(0);
    const [points, setPoints] = useState({ x1: 100, y1: 100, x2: 0, y2: 100, x3: 50, y3: 0 });

    const targetPoints = { x1: 200, y1: 200, x2: 100, y2: 200, x3: 150, y3: 100 }; // Second set of points

    const animateTriangle = () => {
        let startTime;
        const duration = 15000; // Animation duration in milliseconds

        const animationStep = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1

            setAnimationProgress(progress);

            if (progress < 1) {
                requestAnimationFrame(animationStep);
            } else {
                setPoints(targetPoints);
            }
        };

        requestAnimationFrame(animationStep);
    };

    useEffect(() => {
        animateTriangle();
    }, []);


     const setup = (p5, canvasParentRef) => {
         // use parent to render the canvas in this ref (without that p5 will render the canvas outside of your component)
         p5.createCanvas(sketch_height, sketch_width).parent(canvasParentRef);
     };

     const draw = (p5) => {
        p5.background("#785EBB");
        // p5.background(0);
        p5.noStroke();
        p5.fill("red");
        //  p5.triangle(100, 100, 0, 100, 50, 0);
        p5.triangle(points.x1, points.y1, points.x2,points.y2, points.x3, points.y3);
        p5.noStroke();
        p5.fill("green");
        p5.triangle(targetPoints.x1, targetPoints.y1, targetPoints.x2,targetPoints.y2, targetPoints.x3, targetPoints.y3);
     };

    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1">
                <div className="sd_heading0 font_size3">Lets Animate a Triangle with SVG</div>
                <div className="rect_frame" style={{ width: sketch_width, height: sketch_height, marginBottom: "3vh" }}>
                    {/* <div className="sd_triangle" style={{ marginLeft: `0px`, position: "absolute" }}></div> */}
                    <Triangle
                        x1={points.x1 + (targetPoints.x1 - points.x1) * animationProgress}
                        y1={points.y1 + (targetPoints.y1 - points.y1) * animationProgress}
                        x2={points.x2 + (targetPoints.x2 - points.x2) * animationProgress}
                        y2={points.y2 + (targetPoints.y2 - points.y2) * animationProgress}
                        x3={points.x3 + (targetPoints.x3 - points.x3) * animationProgress}
                        y3={points.y3 + (targetPoints.y3 - points.y3) * animationProgress}
                    />
                    <Sketch setup={setup} draw={draw} />
                </div>

                <div className="roboto_text sd_text1 font_size_2_3" style={{ marginTop: "5vh" }}>
                    Animation is from one set of triangle points to another set of points
                </div>
                <div className="roboto_text sd_text1 font_size_2_3" >
                    Animated using 'requestAnimationFrame' for fps and translating the points
                </div>
            </div>
        </>
    );
}

export default Animate_Triangle_svg;
// you may refer to my 30 pieces triangle conversation for more details 