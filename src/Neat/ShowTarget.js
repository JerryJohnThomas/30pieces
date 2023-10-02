import React from "react";
import DownloadIcon from "@mui/icons-material/Download";

function ShowTarget({ target1, sketch_width, sketch_height, shrink_factor, downloadMode }) {
    const handleDownloadImage = () => {
        if (target1) {
            const downloadLink = document.createElement("a");
            downloadLink.href = target1;
            downloadLink.download = `target_image.png`; // Set the desired file name

            // Trigger a click event on the download link to initiate the download
            downloadLink.click();
        } else {
            alert("no image found, click on syntesize button before downloading");
            console.error("Pokemon image not available.");
        }
    };

    const handleDownloadImage2 = () => {
        if (target1) {
            // Create a new canvas with the desired dimensions
            const canvas = document.createElement("canvas");
            canvas.width = sketch_width;
            canvas.height = sketch_height;
            const context = canvas.getContext("2d");

            // Create an Image object and set its src to the imported image
            const img = new Image();
            img.src = target1;

            // Wait for the image to load
            img.onload = () => {
                // Draw the loaded image onto the canvas, resizing it to fit the dimensions
                context.drawImage(img, 0, 0, sketch_width, sketch_height);

                // Convert the canvas to a data URL
                const reshapedImageDataURL = canvas.toDataURL("image/png");

                const downloadLink = document.createElement("a");
                downloadLink.href = reshapedImageDataURL;
                downloadLink.download = `reshaped_target_image.png`; // Set the desired file name

                // Trigger a click event on the download link to initiate the download
                downloadLink.click();
            };
        } else {
            alert("No image found. Click on the Synthesize button before downloading.");
            console.error("Target image not available.");
        }
    };

    return (
        // <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3 absolute_grid_container">
        <div className="sketch_box_neat roboto_text flex_center flexDirection_col  font_size_2_3">
            <div className="font_size_2_3 text_neat_sub"> Target Image</div>
            <div
                className="rect_frame"
                style={{
                    width: sketch_width / shrink_factor,
                    height: sketch_height / shrink_factor,
                    position: "relative",
                }}
            >
                <img
                    src={target1}
                    style={{ height: sketch_height / shrink_factor, width: sketch_width / shrink_factor, position: "relative" }}
                    className="target_image_neat_container"
                />
                {downloadMode && (
                    <div
                        className="score_handle font_size3"
                        style={{
                            width: sketch_width / shrink_factor,
                            height: sketch_height / shrink_factor,
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <DownloadIcon className="button_download" onClick={() => handleDownloadImage2()} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowTarget;
