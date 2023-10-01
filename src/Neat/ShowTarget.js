import React from "react";
function ShowTarget({ target1, sketch_width, sketch_height, shrink_factor }) {
    return (
        // <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3 absolute_grid_container">
        <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3">
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
}

export default ShowTarget;
