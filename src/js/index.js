
import Pace from 'pace-progressbar';
Pace.start();
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper';

import Highway from '@dogstudio/highway';
import {TimelineLite, CSSPlugin} from 'gsap/all';

const plugins = [ CSSPlugin];

// Force CSSPlugin to not get dropped during build
// gsap.registerPlugin(CSSPlugin)

// import 'pace-progressbar/themes/black/pace-theme-center-simple.css';

// const paceOptions = {
// 	ajax: true,
// 	document:true,
// 	eventLag: false
// };

if (document.querySelector('.page--index')) {
	//Pace.start();

	// Pace.on('done', function() {
	// 	console.log('pace done');
	// 	// Pace.stop();
	// })
	
}


// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// import 'uikit/dist/css/uikit.min.css';
// import './css/style.scss';


// Page Transition FADE
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
		  { opacity: 0,
			// x: '-100vw'
		},
		  {
			opacity: 1,
			// x: '0',
			onComplete: done
		  }
		);

		// Hangle Burger modal on page change
		// var burger = document.getElementById('burger');
		// const moveBurgerBack = (event) => {
		// 	document.querySelector('.page__wrap').appendChild(burger);
		// 	console.log('burger moved');
		// }
		// burger.addEventListener('hidden', moveBurgerBack, false);

		// page scripts

		pageScriptsLoad(); // reinit all scripts when switch to another page

	}
	out({from, done}) {


		pageScriptsUnload();

		// const moveBurgerBack = (event) => {
		// 	document.querySelector('.page__wrap').appendChild(burger);
		// 	console.log('burger moved');
		// }
		// burger.removeEventListener('hidden', moveBurgerBack, false);

		// document.querySelector('.pace').remove();

		console.log('moved');
		const tl = new TimelineLite();
		// Animation
		tl.fromTo(from, 0.5,
			{ opacity: 1,
			//   x: 0
			},
			{
			  opacity: 0,
			//   x: '100vw',
			  onComplete: done
			}
		);
	}
}

// TRANSITION OVERLAP
class Overlap extends Highway.Transition {
	in({ from, to, done }) {
	  // Reset Scroll
	  window.scrollTo(0, 0);
  
	  const tl = new TimelineLite();

	  // Animation
	  tl.fromTo(to, 0.5,
		{ 
			x: '100vw',
			// opacity: 0
		},
		{
		  x: '0',
		//   opacity: 1,
		  onComplete: done
		}, 0
	  );
  
	  // Animation
	  tl.fromTo(from, 0.5,
		{ x: '0' },
		{
		  x: '-100vw',
		  onComplete: () => {
			// Set New View in DOM Stream
			// to.style.position = 'static';
  
			// Remove Old View
			from.remove();
		  }
		}, 0
	  );

	  pageScriptsLoad(); // reinit all scripts when switch to another page

	}
  
	out({ done }) {
		var burger = document.getElementById('burger');
		burger.remove();

		// TODO Add pageScriptsUnload(); 
	  	done();
	}
  }
  
const H = new Highway.Core({
	transitions: {
		default: Fade
		// default: Overlap
	}
});


// SCROLL EVENT LISTENER

const watchScroll = () => {
	if (pageYOffset >= document.querySelector('.watch-scroll').offsetHeight) {
		document.querySelector('.header').classList.add('header--invert');
	}
	else {
		document.querySelector('.header').classList.remove('header--invert');
	}
}


// SCRIPTS LOADED ON PAGE LOAD

const pageScriptsLoad = () => {

	// Preloader
	var imgs = document.images,
    len = imgs.length,
    counter = 0;
    console.log("TCL: number of images", len);

	[].forEach.call( imgs, function( img ) {
		if(img.complete) {
			incrementCounter();
			console.log("TCL: pageScriptsLoad -> counter", counter)
			console.log('image src', img.src);
		}
		else
		img.addEventListener( 'load', incrementCounter, false );
	} );

	if (len == 0 ) {
		hidePreloader();
	}

	function hidePreloader() {
		if (document.querySelector('.preloader')) {
			document.querySelector('.preloader').classList.remove('preloader--active');
		}
	}

	function incrementCounter() {
		counter++;
		if ( counter === len ) {
			console.log( 'All images loaded!' );
			hidePreloader();
		}
	}

	
	// for index page only
	if (document.querySelector('.page--index')) {
			
		var slideshowMain = new Swiper('.slideshow-nav', {
			loop: true,
			loopedSlides: 6,
			slidesPerView: 'auto',
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
			centeredSlides: true,
			// cssMode:true,

		});
		const slideshow = document.querySelector('.slideshow-nav');
		const slideshowNavNext = document.querySelector('.slideshow-nav__nav-next');
		const slideshowNavPrev = document.querySelector('.slideshow-nav__nav-prev');
		const sun = document.querySelector('.index__sun');
		const sunTitle = document.querySelector('.index__sun-title');
		const sunIcon = document.querySelector('.index__sun-icon');
		const logo = document.querySelector('.index__logo');
		const logoTitle = document.querySelector('.index__logo-title');
		const logoIcon = document.querySelector('.index__logo-icon');


		const tween = new TimelineLite();
		
		tween.from(slideshow, 1.5, {scale: 0.7, opacity: 0});
		tween.from(slideshowNavNext, 0.2, {scale: 0.7, opacity: 0, x: '-5vw'}, 1);
		tween.from(slideshowNavPrev, 0.2, {scale: 0.7, opacity: 0, x: '5vw'}, 1);
		
		tween.from(sun, 1, {y: '-10vh', opacity: '0'}, 1.5);
		tween.from(sunTitle, 0.2, {y: '-5vh', opacity:'0'}, 2);
		tween.from(sunIcon, 0.3, {y: '-5vh', opacity:'0'}, 2);

		tween.from(logo, 1, {y: '10vh', opacity: '0'}, 1.5);
		tween.from(logoTitle, 0.2, {y: '5vh', opacity:'0'}, 2);
		tween.from(logoIcon, 0.3, {y: '5vh', opacity:'0'}, 2);

	}

	if (document.querySelector('.watch-scroll')) {
		console.log('watch-scroll');
		window.addEventListener("scroll", watchScroll);
	}

};

const pageScriptsUnload = () => {

	window.removeEventListener('scroll', watchScroll);

	//remove burger menu to where it belongs from <body>
	var burger = document.getElementById('burger');
	burger.remove();

}


document.addEventListener('DOMContentLoaded', () => {
	pageScriptsLoad();
});