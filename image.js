const sharp = require('sharp');
const imageSrc = './temp/zebra-test-small.jpg'; 

// async function getMetadata(src) {
//     const metadata = await sharp(src).metadata();

//     console.log(metadata);

// };

function convertToGreyscale(src) {
    sharp(src).greyscale().toFile('./temp/test.jpg').then(info => {
        console.log(info)
            ;    });
}

convertToGreyscale(imageSrc);

// getMetadata(imageSrc);




