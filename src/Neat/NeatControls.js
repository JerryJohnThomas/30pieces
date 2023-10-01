import React from "react";
import Slider from "@mui/material/Slider";

function NeatControls({
    randomHandler,
    maxPolygons,
    handleSliderChange,
    maxPopulation,
    handleSliderChange2,
    scaleMultiplier,
    handleSliderChange3,
 }) {
    return (
        <div className="NEAT_Controls font_size_2_4">
            <div className="NEAT_control_item">start</div>
            <div className="NEAT_control_item">stop</div>
            <div className="NEAT_control_item" onClick={randomHandler}>
                Random
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
                    Grid Viewer: {scaleMultiplier}
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
