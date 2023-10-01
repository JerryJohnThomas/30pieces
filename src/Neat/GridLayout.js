import React from "react";
import Triangle from "../Demo/Triangle";
import "./GridLayout.css";

function GridLayout({ generation, sketch_width, sketch_height }) {
    return (
        <div className="gridLayoutcontainer">
            <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3">
                <div className="font_size_2_4 text_neat_sub"> Training Image </div>
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
                        {generation &&
                            generation.members[0] &&
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
    );
}

export default GridLayout;
