
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper';

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// import 'uikit/dist/css/uikit.min.css';
import './css/style.scss';


// UIkit.notification('Hello world.');
// console.log('hello, world');


// for index page only

document.addEventListener('DOMContentLoaded', () => {

	if (document.querySelector('.page--index')) {
		
		var slideshowMain = new Swiper('.slideshow-nav', {
			loop: true,
			loopedSlides: 6,
			slidesPerView: '1',
			speed: 600,
			grabCursor: true,
			clickable: true, //zrx photoswipe
			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			allowTouchMove: true,
			keyboard: {
				enabled: true,
			},
			effect: 'slide',

		});

	}



});
