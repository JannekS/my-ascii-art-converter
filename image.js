const { raw } = require('express');
const sharp = require('sharp');
const imageSrc = './temp/zebra-test.jpg'; 

async function createAsciiArt(src, maxWidth, inverted) {
    // create validators for arguments
    let widthOut = maxWidth;
    const metadata = await sharp(src).metadata();
    if (metadata.width < maxWidth) {
        widthOut = metadata.width;
    }

    const { data, info } = await sharp(src)
        .resize({width: widthOut})
        .raw()
        .toBuffer({ resolveWithObject: true });
    
    const rawArray = new Uint8ClampedArray(data.buffer);
    const { width, height } = info;
    const pixelArr = [];
    const pixelMatrix = [];

    let asciiString = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
    if (inverted) {
        let invertedSring = asciiString.split("").reverse("").join("");
        asciiString = invertedSring
    }
    let imageString = "";

    for (i = 0; i < rawArray.length; i += 3) {
        let brightness = (0.21 * rawArray[i] + 0.72 * rawArray[i+1] + 0.07 * rawArray[i+2])
        pixelArr.push(brightness);
    }

    for (i = 0; i < height; i++) {
        pixelMatrix[i] = [];
        for (j = 0; j < width; j++) {
            pixelMatrix[i][j] = pixelArr[i * width + j];
        }
    }

    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            const mapValue = Math.floor(pixelMatrix[i][j] / 4);
            imageString += asciiString.charAt(mapValue);
            imageString += asciiString.charAt(mapValue);
        }
        imageString += "\n";
    }

    console.log(imageString);
}

createAsciiArt(imageSrc, 400);

