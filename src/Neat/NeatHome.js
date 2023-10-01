import React from "react";
import "./NeatHome.css";
import Triangle from "../Demo/Triangle";
import target1 from "./assets/post_processing/target1.png";
import Generation from "./Generation";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import html2canvas from "html2canvas";
import { useRef } from "react";

const sketch_size = 450;
const sketch_height = sketch_size;
const sketch_width = sketch_size;
const max_population = 1;

function NeatHome() {
    const [maxPolygons, setMaxPolygons] = useState(5); // Initial value
    let generationGlobal = new Generation(1, max_population, sketch_height, sketch_width, maxPolygons);
    const [generation, setGeneration] = useState(generationGlobal);
    const [isLoaded, setIsloaded] = useState(false);
    const trainingOut1 = useRef(null);

    useEffect(() => {
        // Populate the generation with random Pokemon when the component mounts
        randomHandler();
    }, []);

    let randomHandler = () => {
        console.log("trace: random Handler");
        // Populate the generation with random Pokemon when the component mounts
        generationGlobal = new Generation(1, max_population, sketch_height, sketch_width, maxPolygons);
        generationGlobal.random_populate();
        setGeneration(() => generationGlobal);
        console.log(generation);
    };

    const handleSliderChange = (event, value) => {
        setMaxPolygons(value);
    };

    function captureImage_class(class_name) {
        // Find the target HTML element to capture
        const targetElement = document.querySelector(class_name); // Replace with the appropriate selector

        // Use html2canvas to capture the element as an image
        html2canvas(targetElement).then((canvas) => {
            // Convert the canvas to a data URL
            const imageDataUrl = canvas.toDataURL("image/png");

            // Create an "a" element to download the image
            const a = document.createElement("a");
            a.href = imageDataUrl;
            a.download = "captured-image.png";
            a.click();
        });
    }

    function captureImage_ref() {
        const container = trainingOut1.current;

        // Use html2canvas to capture the element as an image
        html2canvas(container).then((canvas) => {
            // Convert the canvas to a data URL
            const imageDataUrl = canvas.toDataURL("image/png");

            // Create an "a" element to download the image
            const a = document.createElement("a");
            a.href = imageDataUrl;
            a.download = "captured-image.png";
            a.click();
        });
    }

    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1 bg_color7">
                <div className="sd_heading9 font_size3">NEAT</div>
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
                            <img src={target1} className="target_image_neat_container" />
                        </div>
                    </div>

                    <div className="NEAT_Controls font_size_2_4">
                        <div className="NEAT_control_item">start</div>
                        <div className="NEAT_control_item">stop</div>
                        <div className="NEAT_control_item" onClick={randomHandler}>
                            {" "}
                            Random{" "}
                        </div>
                        <div>
                            <div className="font_size2" style={{ textAlign: "center" }}>
                                Max Polygons per Pokemon: {maxPolygons}
                            </div>
                            <Slider
                                min={1}
                                max={40}
                                value={maxPolygons}
                                onChange={handleSliderChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                // color='#52af77'
                                style={{ color: "#3ee8ac" }}
                            />
                        </div>
                        <div
                            className="NEAT_control_item font_size_2_3"
                            onClick={() => captureImage_class(".rect_frame")}
                        >
                            Capture
                        </div>

                        <div className="NEAT_control_item" onClick={() => captureImage_ref()}>
                            Capture
                        </div>
                    </div>
                    <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3">
                        <div className="font_size_2_4 text_neat_sub"> Training Image </div>
                        <div
                            ref={trainingOut1}
                            className="rect_frame training1"
                            style={{
                                width: sketch_width,
                                height: sketch_height,
                                // marginBottom: "3vh",
                                border: "none",
                                backgroundColor: "peachpuff",
                            }}
                        >
                            <div>
                                {generation.members[0] &&
                                    generation.members[0].triangles.map((triangle, index) => {
                                        return (
                                            <Triangle
                                                key={index}
                                                x1={triangle.x1}
                                                y1={triangle.y1}
                                                x2={triangle.x2}
                                                y2={triangle.y2}
                                                x3={triangle.x3}
                                                y3={triangle.y3}
                                                rgba={triangle.rgba}
                                                width={sketch_width}
                                                height={sketch_height}
                                            />
                                        );
                                    })}
                            </div>
                            {/* <Triangle x1={100} y1={100} x2={0} y2={100} x3={50} y3={0} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NeatHome;
