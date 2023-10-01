import React from "react";
import Triangle from "../Demo/Triangle";
import "./GridLayout.css";

function GridLayout({ scale_multiplier, generation, sketch_width, sketch_height }) {
    return (
        <div className="gridLayoutcontainer image-grid " >
            {/* {generation && generation.members[0] && (
                <SingleRender
                    pokemon={generation.members[0]}
                    sketch_height={sketch_height / scale_multiplier}
                    sketch_width={sketch_width / scale_multiplier}
                />
            )} */}
            {generation &&
                generation.members.map((pokemon, index) => (
                    <div key={index}>
                        <SingleRender
                            scale_multiplier={scale_multiplier}
                            pokemon={pokemon}
                            sketch_height={sketch_height / scale_multiplier}
                            sketch_width={sketch_width / scale_multiplier}
                        />
                    </div>
                ))}
        </div>
    );
}

let SingleRender = ({ scale_multiplier, pokemon, sketch_width, sketch_height }) => {
    return (
        <div
            className="rect_frame training1"
            style={{
                width: sketch_width,
                height: sketch_height,
                border: "none",
                backgroundColor: "peachpuff",
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
        </div>
    );
};
export default GridLayout;
