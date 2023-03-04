const sharp = require('sharp');
const imageSrc = './temp/test3.jpg'; 

convertToAsciiArt(imageSrc, 300);

async function convertToAsciiArt(image, maxWidth, inverted) {
    // TODO create validators for arguments
    // TODO implement possibility to pass string as argument to the function
    let asciiString = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
    if (inverted) {
        let invertedSring = asciiString.split("").reverse("").join("");
        asciiString = invertedSring
    }

    const outputWidth = await setWidth(image, maxWidth);
    const { rgbArray, width, height } = await toRgbValues(image, outputWidth);
    const brightnessArray = await mapRgbToBrightArr(rgbArray);
    const imageString = mapArrToImgSting(brightnessArray, asciiString, width, height); 

    console.log(imageString);
}

async function setWidth(imageSrc, maxWidth) {
    const metadata = await sharp(imageSrc).metadata();

    if (metadata.width < maxWidth) {
        return metadata.width;
    }
    return maxWidth;
}

async function toRgbValues(image, outputWidth) {
    const { data, info } = await sharp(image)
        .resize({width: outputWidth})
        .raw()
        .toBuffer({ resolveWithObject: true });
    
    const rgbArray = new Uint8ClampedArray(data.buffer);
    const { width, height } = info;

    return { rgbArray, width, height };
}

async function mapRgbToBrightArr(rgbArray) {
    const brightnessArray = [];
    for (i = 0; i < rgbArray.length; i += 3) {
        let brightness = (0.21 * rgbArray[i] + 0.72 * rgbArray[i+1] + 0.07 * rgbArray[i+2])
        brightnessArray.push(brightness);
    }
    return brightnessArray;
}

function mapArrToImgSting(numArray, asciiString, width, height) {
    let imageString = "";
    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            const mapValue = Math.floor(numArray[i * width + j] / 4);
            imageString += asciiString.charAt(mapValue);
            imageString += asciiString.charAt(mapValue);
        }
        imageString += "\n";
    }
    return imageString;
}