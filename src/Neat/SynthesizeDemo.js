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
import domtoimage from "dom-to-image";

const sketch_size = 450;
const sketch_height = sketch_size;
const sketch_width = sketch_size;
const max_population = 1;

function generateTriangleImage2(triangleDataArray) {
    const canvas = document.createElement("canvas");
    canvas.width = sketch_width;
    canvas.height = sketch_height;
    const context = canvas.getContext("2d");

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Fill the canvas with a white background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (const triangleData of triangleDataArray) {
        // Draw each triangle using the provided data
        context.beginPath();
        context.moveTo(triangleData.x1, triangleData.y1);
        context.lineTo(triangleData.x2, triangleData.y2);
        context.lineTo(triangleData.x3, triangleData.y3);
        context.closePath();

        // Fill the triangle with a color
        context.fillStyle = triangleData.rgba || "black";
        context.fill();
    }

    // Convert the canvas to a data URL
    return canvas.toDataURL("image/png");
}

function SynthesizeDemo() {
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

    // Example triangle data
    const triangleData = {
        x1: 10,
        y1: 10,
        x2: 50,
        y2: 50,
        x3: 90,
        y3: 10,
        rgba: "rgba(255, 0, 0, 0.5)", // Color with alpha
    };

    const triangleData2 = [
        {
            x1: 10,
            y1: 10,
            x2: 50,
            y2: 50,
            x3: 90,
            y3: 10,
            rgba: "rgba(255, 0, 0, 0.5)", // Color with alpha
        },
        {
            x1: 20,
            y1: 20,
            x2: 150,
            y2: 150,
            x3: 20,
            y3: 110,
            rgba: "rgba(255, 255, 0, 0.5)", // Color with alpha
        },
        {
            x1: 50,
            y1: 30,
            x2: 20,
            y2: 10,
            x3: 100,
            y3: 20,
            rgba: "rgba(0, 0, 255, 0.5)", // Color with alpha
        },
    ];
    const canvasWidth = 200;
    const canvasHeight = 200;

    const handleGenerateImage = () => {
        // const imageDataUrl = generateTriangleImage(triangleData, canvasWidth, canvasHeight);
        const imageDataUrl = generateTriangleImage2(generation.members[0].triangles, canvasWidth, canvasHeight);

        // Perform actions with the imageDataUrl, such as sending it to a server or using it in your application
        console.log("Image data URL:", imageDataUrl);

        // Create a temporary anchor element
        const a = document.createElement("a");
        a.href = imageDataUrl;
        a.download = "triangle.png";

        // Trigger a click event on the anchor element to initiate the download
        a.click();
    };



    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1 bg_color7">
                <div className="sd_heading9 font_size3">NEAT</div>
                <div className="neat_container flexDirection_rowB_cols">
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
                        <div className="NEAT_control_item font_size_2_3">Capture</div>

                        <div className="NEAT_control_item">Capture</div>
                        <div className="NEAT_control_item" onClick={handleGenerateImage}>
                            Generate Triangle Image
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SynthesizeDemo;
