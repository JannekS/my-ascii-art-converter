const sharp = require('sharp');
const imageSrc = './temp/zebra-test-small.jpg'; 

async function getImgDimensions(imageSrc) {
    const metadata = await sharp(imageSrc).metadata();

    console.log(metadata.width);
    console.log(metadata.height);

};

getImgDimensions(imageSrc);
