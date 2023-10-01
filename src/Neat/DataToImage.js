function generateTriangleImage2(triangleDataArray) {
    const canvas = document.createElement("canvas");
    canvas.width = sketch_width;
    canvas.height = sketch_height;
    const context = canvas.getContext("2d");

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill the canvas with a white background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (const triangleData of triangleDataArray) {
        // Draw each triangle using the provided data
        context.beginPath();
        context.moveTo(triangleData.x1, triangleData.y1);
        context.lineTo(triangleData.x2, triangleData.y2);
        context.lineTo(triangleData.x3, triangleData.y3);
        context.closePath();

        // Fill the triangle with a color
        context.fillStyle = triangleData.rgba || "black";
        context.fill();
    }

    // Convert the canvas to a data URL
    return canvas.toDataURL("image/png");
}

const handleGenerateImage = () => {
    // const imageDataUrl = generateTriangleImage(triangleData, canvasWidth, canvasHeight);
    const imageDataUrl = generateTriangleImage2(generation.members[0].triangles, canvasWidth, canvasHeight);

    // Perform actions with the imageDataUrl, such as sending it to a server or using it in your application
    console.log("Image data URL:", imageDataUrl);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = imageDataUrl;
    a.download = "triangle.png";

    // Trigger a click event on the anchor element to initiate the download
    a.click();
};
