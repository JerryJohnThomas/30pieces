// function generateTriangleImage(triangleDataArray) {
//     const canvas = document.createElement("canvas");
//     canvas.width = sketch_width;
//     canvas.height = sketch_height;
//     const context = canvas.getContext("2d");

//     // Clear the canvas
//     context.clearRect(0, 0, canvas.width, canvas.height);
    
//     // Fill the canvas with a white background
//     context.fillStyle = "white";
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     for (const triangleData of triangleDataArray) {
//         // Draw each triangle using the provided data
//         context.beginPath();
//         context.moveTo(triangleData.x1, triangleData.y1);
//         context.lineTo(triangleData.x2, triangleData.y2);
//         context.lineTo(triangleData.x3, triangleData.y3);
//         context.closePath();

//         // Fill the triangle with a color
//         context.fillStyle = triangleData.rgba || "black";
//         context.fill();
//     }

//     // Convert the canvas to a data URL
//     return canvas.toDataURL("image/png");
// }

// const handleGenerateImage = (data) => {
//     // const imageDataUrl = generateTriangleImage(triangleData, canvasWidth, canvasHeight);
//     const imageDataUrl = generateTriangleImage(generation.members[0].triangles, canvasWidth, canvasHeight);

//     // Perform actions with the imageDataUrl, such as sending it to a server or using it in your application
//     console.log("Image data URL:", imageDataUrl);

//     // Create a temporary anchor element
//     const a = document.createElement("a");
//     a.href = imageDataUrl;
//     a.download = "triangle.png";

//     // Trigger a click event on the anchor element to initiate the download
//     a.click();
// };

export default function generateTriangleImages(triangleDataArray, canvasWidth, canvasHeight) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const context = canvas.getContext("2d");

        // Fill the canvas with a white background
        context.fillStyle = "white";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        for (const triangle of triangleDataArray) {
                // Draw each triangle using the provided data
                context.beginPath();
                context.moveTo(triangle.x1, triangle.y1);
                context.lineTo(triangle.x2, triangle.y2);
                context.lineTo(triangle.x3, triangle.y3);
                context.closePath();

                // Fill the triangle with a color
                context.fillStyle = triangle.rgba || "black";
                context.fill();
        }

        // Create an HTML Image element and set its source to the generated image
        const image = new Image();
        image.src = canvas.toDataURL("image/png");

        // Wait for the image to load before resolving the Promise
        image.onload = () => {
            resolve(image);
        };

        // Handle any loading errors
        image.onerror = (error) => {
            reject(error);
        };
    });
};
