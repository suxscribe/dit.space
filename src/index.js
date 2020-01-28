
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper';

import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';





class Fade extends Highway.Transition {
	in({from, to, done}) {

		// const tl = new TimelineLite();
		// tl.fromTo(to, 0.5, {left: '0%'}, {left: '0%', opacity: 0})
		// .fromTo(to, 0.5, {opacity: 0 }, {opacity: 1, onComplete: function() {
		// 	from.remove();
		// 	done();
		// }});

		const tl = new TimelineLite();
		// Reset Scroll
		window.scrollTo(0, 0);

		// Remove Old View
		from.remove();
	
		// Animation
		tl.fromTo(to, 0.5,
		  { opacity: 0 },
		  {
			opacity: 1,
			onComplete: done
		  }
		);

		// Hangle Burger modal on page change
		var burger = document.getElementById('burger');
		const moveBurgerBack = (event) => {
			document.querySelector('.page__wrap').appendChild(burger);
			console.log('burger moved');
		}
		burger.addEventListener('hidden', moveBurgerBack, false);

	}
	out({from, done}) {

		var burger = document.getElementById('burger');
		burger.remove();
		const moveBurgerBack = (event) => {
			document.querySelector('.page__wrap').appendChild(burger);
			console.log('burger moved');
		}
		burger.removeEventListener('hidden', moveBurgerBack, false);

		console.log('moved');
		const tl = new TimelineLite();
		// Animation
		tl.fromTo(from, 0.5,
			{ opacity: 1 },
			{
			  opacity: 0,
			  onComplete: done
			}
		);
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
		// document.querySelector('.header__burger').addEventListener('click', () => {
		// 	var burger = UIkit.modal("#burger");
	
		// 	burger.toggle();
		// 	return false;
		// });
	}



});



