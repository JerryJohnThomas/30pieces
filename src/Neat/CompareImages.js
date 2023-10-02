import Pixels from "image-pixels";
import resizeImg from "resize-img"; // Import the resize-img librar
import resizeImage from "resize-image";

class CompareImages {
    // constructor(target_image, sketch_width, sketch_height) {
    //     this.rescaleTargetImage(target_image);
    //     // this.target_image = target_image;
    //     this.image2 = null;
    //     this.sketch_width = sketch_width;
    //     this.sketch_height = sketch_height;
    // }

    constructor(target_image, sketch_width, sketch_height) {
        // Rescale the target image and set it as the target_image property
        this.rescaleTargetImage(target_image, sketch_width, sketch_height)
            .then((rescaledImage) => {
                this.target_image = rescaledImage;
                this.image2 = null;
                this.sketch_width = sketch_width;
                this.sketch_height = sketch_height;
            })
            .catch((error) => {
                console.error("Error while rescaling the target image:", error);
            });
    }

    async rescaleTargetImage(target_image) {
        var data = await resizeImage.resize(target_image, this.sketch_height, this.width, resizeImage.PNG);
        let Img = new Image();
        Img.src = data;
        return Img;
    }

    async rescaleTargetImage2(target_image) {
        if (!(target_image instanceof HTMLImageElement)) {
            console.error("Invalid target image provided.");
            return;
        }

        try {
            // Fetch the image as a Blob
            const response = await fetch(target_image.src);
            const imageBlob = await response.blob();

            // Read the image data as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result;

                // Use resize-img to rescale the target image
                const resizedBuffer = resizeImg(dataUrl, {
                    width: this.sketch_width,
                    height: this.sketch_height,
                });

                // Convert the resized image buffer to a Data URL
                const rescaledImageSrc = `data:image/png;base64,${resizedBuffer.toString("base64")}`;

                // Create a new Image object for the rescaled image
                const rescaledImage = new Image();
                rescaledImage.src = rescaledImageSrc;

                return rescaledImage;
            };

            // Read the image blob as a data URL
            reader.readAsDataURL(imageBlob);
        } catch (error) {
            console.error("Error while rescaling the target image:", error);
        }
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

    async calculateMSE(image2) {
        console.log(this.target_image);
        console.log(image2);

        // this is the current_image
        this.image2 = image2;
        const pixels2 = await this.getPixelData(this.image2);
        const target_pixels = await this.getPixelData(this.target_image);

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
