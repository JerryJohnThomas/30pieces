import React from "react";
import Triangle from "../Demo/Triangle";
import "./GridLayout.css";
import DownloadIcon from "@mui/icons-material/Download";
function GridLayout({ viewScore, scale_multiplier, generation, sketch_width, sketch_height, downloadMode }) {
    return (
        <div className="gridLayoutcontainer image-grid ">
            {generation &&
                generation.members.map((pokemon, index) => (
                    <div key={index}>
                        <SingleRender
                            viewScore={viewScore}
                            scale_multiplier={scale_multiplier}
                            pokemon={pokemon}
                            sketch_height={sketch_height / scale_multiplier}
                            sketch_width={sketch_width / scale_multiplier}
                            downloadMode={downloadMode}
                        />
                    </div>
                ))}
        </div>
    );
}

let SingleRender = ({ viewScore, scale_multiplier, pokemon, sketch_width, sketch_height, downloadMode }) => {
    const handleDownloadImage = (pokemon) => {
        if (pokemon.image) {
            const downloadLink = document.createElement("a");
            downloadLink.href = pokemon.image.src;
            downloadLink.download = `pokemon_image${pokemon.id}.png`; // Set the desired file name

            // Trigger a click event on the download link to initiate the download
            downloadLink.click();
        } else {
            alert("no image found, click on syntesize button before downloading");
            console.error("Pokemon image not available.");
        }
    };

    return (
        <div
            className="rect_frame training1"
            style={{
                width: sketch_width,
                height: sketch_height,
                border: "none",
                // backgroundColor: "peachpuff",
                backgroundColor: "white",
            }}
        >
            <div>
                {pokemon &&
                    pokemon.triangles.map((triangle, index) => {
                        return (
                            <Triangle
                                key={index}
                                x1={triangle.x1 / scale_multiplier}
                                y1={triangle.y1 / scale_multiplier}
                                x2={triangle.x2 / scale_multiplier}
                                y2={triangle.y2 / scale_multiplier}
                                x3={triangle.x3 / scale_multiplier}
                                y3={triangle.y3 / scale_multiplier}
                                rgba={triangle.rgba}
                                width={sketch_width}
                                height={sketch_height}
                            />
                        );
                    })}
            </div>
            {viewScore && (
                <div
                    className="score_handle font_size3"
                    style={{
                        width: sketch_width,
                        height: sketch_height,
                    }}
                >
                    {pokemon.score}
                </div>
            )}

            {downloadMode && (
                <div
                    className="score_handle font_size3"
                    style={{
                        width: sketch_width,
                        height: sketch_height,
                    }}
                >
                    <DownloadIcon className="button_download" onClick={() => handleDownloadImage(pokemon)} />
                </div>
            )}
        </div>
    );
};
export default GridLayout;
