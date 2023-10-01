import React from "react";
import Slider from "@mui/material/Slider";
import ShowTarget from "./ShowTarget";

function NeatControls({
    randomHandler,
    maxPolygons,
    handleSliderChange,
    maxPopulation,
    handleSliderChange2,
    scaleMultiplier,
    handleSliderChange3,
    viewScoreHandler,
    viewGeneration,
    sketch_height,
    sketch_width,
    shrink_factor,
    target1,
    nextHandler,
    synthesizeHandler,
    scoreHandler,
    DownloadModeHandler,
}) {
    return (
        <div className="NEAT_Controls font_size_2_3" style={{ textAlign: "center" }}>
            <ShowTarget target1={target1} sketch_width={sketch_width} sketch_height={sketch_height} shrink_factor={shrink_factor} />
            <div className="NEAT_control_item" onScroll={scoreHandler}>
                Score Me
            </div>
            <div className="NEAT_control_item font_size_2_2" onClick={synthesizeHandler}>
                Synthesize
            </div>
            <div className="NEAT_control_item" onClick={nextHandler}>
                NEXT
            </div>
            <div className="NEAT_control_item" onClick={randomHandler}>
                Random
            </div>
            <div>
                <div className="font_size2">Max Polygons per Pokemon: {maxPolygons}</div>
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

            <div>
                <div className="font_size2" style={{ textAlign: "center" }}>
                    Max Population Per Generation: {maxPopulation}
                </div>
                <Slider
                    min={1}
                    max={50}
                    value={maxPopulation}
                    onChange={handleSliderChange2}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    // color='#52af77'
                    style={{ color: "#3ee8ac" }}
                />
            </div>

            <div>
                <div className="font_size2" style={{ textAlign: "center" }}>
                    Grid Shrinker: {scaleMultiplier}
                </div>
                <Slider
                    step={0.01}
                    min={1}
                    max={4.5}
                    value={scaleMultiplier}
                    onChange={handleSliderChange3}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    // color='#52af77'
                    style={{ color: "#3ee8ac" }}
                />
            </div>
            <div className="NEAT_control_item font_size_1_2" onClick={viewScoreHandler}>
                View Score
            </div>

            <div className="NEAT_control_item font_size_1_2" onClick={viewGeneration}>
                View Generation
            </div>

            <div className="NEAT_control_item font_size_1_2" onClick={DownloadModeHandler}>
                Download Mode
            </div>

            {/* <div className="NEAT_control_item font_size_2_3" onClick={() => captureImage_class(".rect_frame")}>
                Capture
            </div>

            <div className="NEAT_control_item" onClick={() => captureImage_dom()}>
                Capture
            </div> */}
        </div>
    );
}

export default NeatControls;
