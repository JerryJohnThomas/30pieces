import React from "react";
import "./NeatHome.css";
import Triangle from "../Demo/Triangle";
import target1 from "./assets/post_processing/target1.png";
// import target1 from "./assets/post_processing/step_up/triangle_red_1x.png";
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
const bgColor = "white";
// const bgColor = "black";

function NeatHome() {
    const [maxPolygons, setMaxPolygons] = useState(13); // Initial value
    const [maxPopulation, setMaxPopulation] = useState(5); // Initial value
    const [scaleMultiplier, setScaleMultiplier] = useState(3.5); // Initial value
    const [viewScore, setViewScore] = useState(false);
    const [downloadMode, setDownloadMode] = useState(false);
    let generationGlobal = new Generation(1, maxPopulation, sketch_height, sketch_width, maxPolygons, target1, bgColor);
    const [generation, setGeneration] = useState(generationGlobal);
    const [isLoaded, setIsloaded] = useState(false);
    const trainingOut1 = useRef(null);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        // Populate the generation with random Pokemon when the component mounts
        randomHandler();
    }, []);


    const handleKeyPress = (event) => {
        // Check if the pressed key is the one you want (e.g., "Enter" key with keycode 13)
        if (event.key === "a") synthesizeHandler();
        else if (event.key === "s") scoreHandler();
        else if (event.key === "d") nextHandler();
        else if (event.key === "z") viewScoreHandler();
        else if (event.key === "x") DownloadModeHandler();
      };

    let randomHandler = () => {
        console.log("trace: random Handler");
        // Populate the generation with random Pokemon when the component mounts
        generationGlobal = new Generation(1, maxPopulation, sketch_height, sketch_width, maxPolygons, target1, bgColor);
        // generationGlobal.random_populate();
        generationGlobal.random_populate_withWhite();
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

        let scores = [];
        for(let poke of generation.members)
            scores.push(poke.score);
        console.log("scores: ", scores);
    };

    const DoAllEvolve = async () => {
        // let x = synthesizeHandler().then(async (data)=> await scoreHandler().then(async (d) => await nextHandler()));
        // console.log(x);

        synthesizeHandler();
        setTimeout(() => {
            scoreHandler();
          }, 50);
          setTimeout(() => {
              nextHandler();
          }, 100);

    }

    const nextHandler = () => {
        generation.next_generation();
        let generationCopy = generation.deepCopy();
        setGeneration(generationCopy);
    };
    const scoreHandler = async () => {
        await generation.score_generation();
        let copyGeneration = generation.deepCopy();
        setGeneration(copyGeneration);
    };
    const synthesizeHandler = () => {
        if (generation == null || generation.members.length === 0) return;

        const promises = [];

        for (let i = 0; i < generation.members.length; i++) {
            const pokemon = generation.members[i];
            const promise = generateTriangleImages(pokemon.triangles, sketch_width, sketch_height, bgColor);
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
                        DoAllEvolve = {DoAllEvolve}
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
