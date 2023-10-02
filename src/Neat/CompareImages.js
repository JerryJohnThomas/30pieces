import Pixels from "image-pixels";

class CompareImages {
    constructor(target_image) {
        this.target_image = target_image;
        this.image2 = null;
    }

    // async getPixelData(image) {
    //     // Create a temporary canvas element
    //     const canvas = document.createElement("canvas");
    //     const context = canvas.getContext("2d");

    //     // Set canvas dimensions to match the image
    //     canvas.width = image.width;
    //     canvas.height = image.height;

    //     // Draw the image on the canvas
    //     context.drawImage(image, 0, 0);

    //     // Get the pixel data from the canvas
    //     const pixels = await Pixels.fromCanvas(canvas);
    //     return pixels;
    // }

    // async getPixelData(image) {
    //     const canvas = document.createElement("canvas");
    //     const context = canvas.getContext("2d");

    //     canvas.width = image.width;
    //     canvas.height = image.height;

    //     context.drawImage(image, 0, 0, image.width, image.height);

    //     const pix = await Pixels.fromCanvas(canvas);
    //     return pix;
    // }

    async getPixelData(image) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0, image.width, image.height);

        const imageData = context.getImageData(0, 0, image.width, image.height);
        const pixels = new Pixels(imageData);

        return pixels;
    }

    async calculateMSE(image2) {
        // this is the current_image
        this.image2 = image2;
        const target_pixels = await this.getPixelData(this.target_image);
        const pixels2 = await this.getPixelData(this.image2);

        console.log("pixel data collected ");
        console.log(target_pixels);
        console.log(pixels2);

        // Ensure both images have the same dimensions
        if (target_pixels.width !== pixels2.width || target_pixels.height !== pixels2.height) {
            throw new Error("Images have different dimensions");
        }

        let sumSquaredError = 0;

        // Iterate through each pixel and calculate squared error
        for (let y = 0; y < target_pixels.height; y++) {
            for (let x = 0; x < target_pixels.width; x++) {
                const pixel1 = target_pixels.get(x, y);
                const pixel2 = pixels2.get(x, y);
                const squaredError = Math.pow(pixel1.r - pixel2.r, 2); // Compare the red channel
                sumSquaredError += squaredError;
            }
        }

        // Calculate mean squared error
        const mse = sumSquaredError / (target_pixels.width * target_pixels.height);

        return mse;
    }

    // Add other comparison functions here
}

export default CompareImages;
