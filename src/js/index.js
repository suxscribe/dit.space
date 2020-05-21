
import Pace from 'pace-progressbar';
Pace.start();
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper';

import Highway from '@dogstudio/highway';
import {TimelineLite, CSSPlugin} from 'gsap/all';

// loads the Icon plugin
UIkit.use(Icons);

const plugins = [ CSSPlugin];

// Force CSSPlugin to not get dropped during build
// gsap.registerPlugin(CSSPlugin)

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

// Page Transition FADE
class Fade extends Highway.Transition {
	in({from, to, done}) {

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

	// stop preloader after 7000ms
	setTimeout(() => {  hidePreloader(); }, 7000);
	
	// for index page only
	if (document.querySelector('.page--index')) {
			
		var slideshowMain = new Swiper('.slideshow-nav', {
			loop: true,
			// loopedSlides: 6,
			// slidesPerView: '1',
			// speed: 600,
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
			// effect: 'flip',
			centeredSlides: true,
			crossfade: true,
			// cssMode:true,

		});

		slideshowMain.on('init', () => {
			slideshowMain.update();
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

		// pause not active slides
		const slideshowSlides = document.querySelectorAll('.slideshow-nav__item-image video');
		const pauseSlideshowSlides = () => {
			slideshowSlides.forEach((el,i) => {
				if (i === slideshowMain.activeIndex) {
					el.play();
				} else {
					el.pause();
				}
			})
		};
		slideshowMain.on('init', function() {
			pauseSlideshowSlides();
		});
		slideshowMain.on('slideChange', function() {
			pauseSlideshowSlides();
		});

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

	} // page index
	if (document.querySelector('.page--stream'))  { // || document.querySelector('.page--index'))
		if (document.querySelector('#twitch-embed')) {
			const twitchChannel = document.querySelector('.content__top-media').dataset.twitch;
			new Twitch.Embed("twitch-embed", {
				channel: twitchChannel,
				layout: "video",
				autoplay: false
			});
		}
	}

	if (document.querySelector('.watch-scroll')) {
		console.log('watch-scroll');
		window.addEventListener("scroll", watchScroll);
	}

}; // pageScriptsLoad

const pageScriptsUnload = () => {

	window.removeEventListener('scroll', watchScroll);

	//remove burger menu to where it belongs from <body>
	var burger = document.getElementById('burger');
	burger.remove();

}


document.addEventListener('DOMContentLoaded', () => {
	pageScriptsLoad();
});