const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

(async () => {
	const files = await imagemin(['src/assets/*.{jpg}'], 'src/assets', {
		use: [
			imageminWebp({quality: 50})
		]
    });
    const filesPNG = await imagemin(['src/assets/*.{png}'], 'src/assets', {
		use: [
			imageminWebp({lossless: true})
		]
    });
    console.log(files);
	console.log('Images optimized');
})();