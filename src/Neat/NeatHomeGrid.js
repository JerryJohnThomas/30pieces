import React from "react";
import "./NeatHome.css";
import Triangle from "../Demo/Triangle";
import target1 from "./assets/post_processing/target1.png";
import Generation from "./Generation";
import { useEffect } from "react";
import { useState } from "react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import domtoimage from "dom-to-image";
import NeatControls from "./NeatControls";
import GridLayout from "./GridLayout";

const sketch_size = 450;
const sketch_height = sketch_size;
const sketch_width = sketch_size;
const shrink_factor = 5;

function NeatHome() {
    const [maxPolygons, setMaxPolygons] = useState(5); // Initial value
    const [maxPopulation, setMaxPopulation] = useState(5); // Initial value
    const [scaleMultiplier, setScaleMultiplier] = useState(2); // Initial value
    let generationGlobal = new Generation(1, maxPopulation, sketch_height, sketch_width, maxPolygons);
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
        generationGlobal = new Generation(1, maxPopulation, sketch_height, sketch_width, maxPolygons);
        generationGlobal.random_populate();
        setGeneration(() => generationGlobal);
        console.log(generation);
    };

    const handleSliderChange = (event, value) => {
        setMaxPolygons(value);
    };

    const handleSliderChange2 = (event, value) => {
        setMaxPopulation(value);
    };

    
    const handleSliderChange3 = (event, value) => {
        setScaleMultiplier(value);
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

    const captureImage_dom = () => {
        const container = trainingOut1.current;

        // Use dom-to-image to capture the container as an image
        domtoimage
            .toPng(container)
            .then((dataUrl) => {
                // Create an "a" element to download the image
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "captured-image.png";
                a.click();
            })
            .catch((error) => {
                console.error("Error capturing image:", error);
            });
    };

    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1 bg_color7">
                <ShowTarget />
                <div className="sd_heading9 font_size3">NEAT</div>
                <div className="neat_container_full flexDirection_rowB_cols">
                    <NeatControls
                        randomHandler={randomHandler}
                        maxPolygons={maxPolygons}
                        handleSliderChange={handleSliderChange}
                        handleSliderChange2={handleSliderChange2}
                        handleSliderChange3={handleSliderChange3}
                        maxPopulation={maxPopulation}
                        scaleMultiplier={scaleMultiplier}
                    />
                    <GridLayout
                        scale_multiplier = {scaleMultiplier}
                        generation={generation}
                        sketch_width={sketch_width}
                        sketch_height={sketch_height}
                    />
                </div>
            </div>
        </>
    );
}

let ShowTarget = () => {
    return (
        <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3 absolute_grid_container">
            <div className="font_size_2_3 text_neat_sub"> Target Image</div>
            <div
                className="rect_frame"
                style={{
                    width: sketch_width / shrink_factor,
                    height: sketch_height / shrink_factor,
                    // marginBottom: "3vh",
                    backgroundColor: "peachpuff",
                }}
            >
                <img
                    src={target1}
                    style={{ height: sketch_height / shrink_factor, width: sketch_width / shrink_factor }}
                    className="target_image_neat_container"
                />
            </div>
        </div>
    );
};

export default NeatHome;
