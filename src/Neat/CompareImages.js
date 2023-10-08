import Pixels from "image-pixels";
import resizeImg from "resize-img"; // Import the resize-img librar
import resizeImage from "resize-image";


const mseNormaliser = 1000;
const invertmseNormaliser = 1000000;
class CompareImages {
    // IMPORTANT, you have to call the rescale in the comparer functino as the first line
    constructor(target_image, sketch_width, sketch_height) {
        this.target_image = target_image;
        this.image2 = null;
        this.sketch_width = sketch_width;
        this.sketch_height = sketch_height;
    }

    async rescaleTargetImage(target_image) {
        var data = await resizeImage.resize(target_image, this.sketch_height, this.width, resizeImage.PNG);
        let Img = new Image();
        Img.src = data;
        return Img;
    }

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

    async calculateMSEMAX(){
        let score = await this.calculateMSE(this.target_image);
        return score;   
    }

    async calculateMSE(image2) {
        await this.rescaleTargetImage(this.target_image).then((rescaledImage) => {
            this.target_image = rescaledImage;
        });

        // this is the current_image
        this.image2 = image2;
        const pixels2 = await this.getPixelData(this.image2);
        const target_pixels = await this.getPixelData(this.target_image);

        // console.log("pixel data collected ");
        // console.log(target_pixels);
        // console.log(pixels2);

        // Ensure both images have the same dimensions
        if (target_pixels.width !== pixels2.width || target_pixels.height !== pixels2.height) {
            throw new Error("Images have different dimensions");
        }

        let sumSquaredError = 0;

        // Iterate through each pixel and calculate squared error for RGB channels
        for (let i = 0; i < target_pixels.data.length; i += 4) {
            // Extract RGB values from the pixel data array
            const pixel1 = {
                r: target_pixels.data[i],
                g: target_pixels.data[i + 1],
                b: target_pixels.data[i + 2],
            };

            const pixel2 = {
                r: pixels2.data[i],
                g: pixels2.data[i + 1],
                b: pixels2.data[i + 2],
            };

            // Compare the RGB channels (ignore alpha)
            const squaredError = Math.pow(pixel1.r - pixel2.r, 2) + Math.pow(pixel1.g - pixel2.g, 2) + Math.pow(pixel1.b - pixel2.b, 2);

            sumSquaredError += squaredError;
        }

        // Calculate mean squared error
        let mse = sumSquaredError / (target_pixels.width * target_pixels.height);
        // mse = mse / mseNormaliser;
        mse = mse.toFixed(2);

        // Invert the score
        let invertedScore = 1 / mse;
        invertedScore = invertedScore * invertmseNormaliser;
        invertedScore = invertedScore.toFixed(2);

        return parseFloat(invertedScore);
    }

    // Add other comparison functions here
}

export default CompareImages;
