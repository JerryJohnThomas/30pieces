import React from "react";
import "./NeatHome.css";
import Triangle from "../Demo/Triangle";
import target1 from "./assets/post_processing/target1.png";
import Generation from "./Generation";
import { useEffect } from "react";
import { useState } from "react";

const sketch_size = 450;
const sketch_height = sketch_size;
const sketch_width = sketch_size;
const max_population = 1;
const max_triangles_per_pokemon = 5;
function NeatHome() {

    let generationGlobal = new Generation(1, max_population, sketch_height, sketch_width, max_triangles_per_pokemon);
    const [generation, setGeneration] = useState(generationGlobal);
    const [isLoaded, setIsloaded] = useState(false);

    useEffect(() => {
        // Populate the generation with random Pokemon when the component mounts

        // generationGlobal = new Generation(1, max_population, sketch_height, sketch_width);
        randomHandler();
        console.log("generation");
        console.log(generationGlobal);
    }, []);

    let randomHandler = () => {
        // Populate the generation with random Pokemon when the component mounts
        generationGlobal.random_populate();
        setGeneration(generationGlobal);
    };

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
                            Random
                        </div>
                    </div>
                    <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3">
                        <div className="font_size_2_4 text_neat_sub"> Training Image </div>
                        <div
                            className="rect_frame"
                            style={{
                                width: sketch_width,
                                height: sketch_height,
                                // marginBottom: "3vh",
                                border: "none",
                                backgroundColor: "peachpuff",
                            }}
                        >
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
                            {/* <Triangle x1={100} y1={100} x2={0} y2={100} x3={50} y3={0} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NeatHome;
