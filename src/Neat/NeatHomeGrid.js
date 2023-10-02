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
import ShowTarget from "./ShowTarget";
import generateTriangleImages from "./DataToImage";

const sketch_size = 450;
const sketch_height = sketch_size;
const sketch_width = sketch_size;
const shrink_factor = 5;

function NeatHome() {
    const [maxPolygons, setMaxPolygons] = useState(15); // Initial value
    const [maxPopulation, setMaxPopulation] = useState(30); // Initial value
    const [scaleMultiplier, setScaleMultiplier] = useState(2.5); // Initial value
    const [viewScore, setViewScore] = useState(false);
    const [downloadMode, setDownloadMode] = useState(false);
    let generationGlobal = new Generation(1, maxPopulation, sketch_height, sketch_width, maxPolygons, target1);
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
        generationGlobal = new Generation(1, maxPopulation, sketch_height, sketch_width, maxPolygons, target1);
        generationGlobal.random_populate();
        setGeneration(() => generationGlobal);
        // console.log(generation);
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

    const DownloadModeHandler = (e) => {
        setDownloadMode((v) => !v);
    };

    const viewScoreHandler = (e) => {
        setViewScore((v) => !v);
    };

    const viewGeneration = () => {
        console.log(generation);
    };

    const nextHandler = () => {};
    const scoreHandler = () => {
        // generationGlobal.score_generation();
        // setGeneration(() => generationGlobal);

        generation.score_generation();
        setGeneration(() => generation);
    };
    const synthesizeHandler = () => {
        if (generation == null || generation.members.length === 0) return;

        const promises = [];

        for (let i = 0; i < generation.members.length; i++) {
            const pokemon = generation.members[i];
            const promise = generateTriangleImages(pokemon.triangles, sketch_width, sketch_height);
            promises.push(promise);
        }

        // Use Promise.all to wait for all image generation promises to resolve
        Promise.all(promises)
            .then((images) => {
                // 'images' is an array containing the generated images (HTML Image elements)
                // You can now use or display these images as needed
                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    const pokemon = generation.members[i];
                    pokemon.image = image; // Append the generated image to the 'image' parameter of the pokemon
                }
            })
            .catch((error) => {
                console.error("Error generating images:", error);
            });
    };

    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1 bg_color7">
                {/* <ShowTarget target1={target1} sketch_width={sketch_width} sketch_height={sketch_height} shrink_factor={shrink_factor} /> */}
                <div className="sd_heading9 font_size3 ">NEAT</div>
                <div className="neat_container_full flexDirection_rowB_cols">
                    <NeatControls
                        randomHandler={randomHandler}
                        maxPolygons={maxPolygons}
                        handleSliderChange={handleSliderChange}
                        handleSliderChange2={handleSliderChange2}
                        handleSliderChange3={handleSliderChange3}
                        maxPopulation={maxPopulation}
                        scaleMultiplier={scaleMultiplier}
                        viewScoreHandler={viewScoreHandler}
                        viewGeneration={viewGeneration}
                        target1={target1}
                        sketch_height={sketch_height}
                        sketch_width={sketch_width}
                        shrink_factor={shrink_factor}
                        nextHandler={nextHandler}
                        synthesizeHandler={synthesizeHandler}
                        scoreHandler={scoreHandler}
                        DownloadModeHandler={DownloadModeHandler}
                        downloadMode={downloadMode}
                    />
                    <GridLayout
                        scale_multiplier={scaleMultiplier}
                        generation={generation}
                        sketch_width={sketch_width}
                        sketch_height={sketch_height}
                        viewScore={viewScore}
                        downloadMode={downloadMode}
                    />
                </div>
            </div>
        </>
    );
}

export default NeatHome;
