
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper';

import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

class Fade extends Highway.Transition {
	in({from, to, done}) {

		const tl = new TimelineLite();
		tl.fromTo(to, 0.5, {left: '-100%', top: '50%'}, {left: '0%'})
		.fromTo(to, 0.5, {height: '2vh'}, {height:'90vh', top: '10%', onComplete: function() {
			from.remove();
			done();
		}});
	}
	out({from, done}) {
		done();
	}
}

const H = new Highway.Core({
	transitions: {
		default: Fade
	}
});

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
	if (document.querySelector('.project')) {
		document.querySelector('.header__burger').addEventListener('click', () => {
			var burger = UIkit.modal("#burger");
	
			burger.toggle();
			return false;
		});
	}



});
