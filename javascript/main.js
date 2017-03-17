var body = document.querySelector('body');


function init() {
	init_leaflet();
	init_lory();
	init_gallery();
	init_plyr('.plyr-video');
	init_events();
	reveal_document();
}

// after document is loaded remove screen screen
	function reveal_document() {

		window.addEventListener('load', function(){
			scroll_loading();
		}, true);

	}

	function scroll_loading() {

		setTimeout(function(){
			body.classList.remove('loading');
		}, 1000);
	}
// loading:
// :leaflet contact map

function init_leaflet() {
	var contactMap = L.map('contact-map').setView([39.160, -75.529], 14);

	L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
		maxZoom: 16,
		minZoom: 14
	}).addTo(contactMap);

	var marker = L.marker([39.158, -75.525]).addTo(contactMap);

	marker.bindPopup('<span style="font-weight: bold;">Here We Are!</span>').openPopup();
}
// leaflet contact map:

// lory slider init

function init_lory() {

	var video_slider = document.getElementById('video-slider'),
		image_slider = document.getElementById('gallery');

	lory(video_slider, {
		ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
		rewind: true,
		slidesToScroll: 1
	});

	lory(image_slider, {
		ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
		rewind: true,
		slidesToScroll: 1
	});
};

// lory:

// :baguetteBox.js gallery
function init_gallery(){
	baguetteBox.run('.gallery', {
		animation: 'slideIn',
		async: true,
		noScrollBars: true
	});
}

// bB.js:

// :plyr
function init_plyr(className){
	var videos = plyr.setup(className, {
		controls: ['play-large'],
		showPosterOnEnd: true
	});
}
// plyr:
// :parallax scrolling

function parallax_scroll(elements_matched, elTop, elBottom, scrollTop) {
	var	i = 0,
	active = false;

	for (i = 0; i < elBottom.length; i++) {
		if(scrollTop + window.innerHeight*0.86 > elTop[i] && scrollTop < elBottom[i]) {
			parallax_img_txt(scrollTop, elements_matched[i], elTop[i], elBottom[i]);
		}
	}
}

function parallax_img_txt(scrollTop, element, elTop, elBottom) {

	element.nextSibling.style.top = Math.floor((elBottom-elTop)*0.14 + (scrollTop+window.innerHeight*0.86 - elTop)/(1+2*(scrollTop/elBottom))) + "px";
	element.nextSibling.style.opacity = 1-0.3*(scrollTop+window.innerHeight - elTop)/(elBottom - elTop);
}

// .image-fixed-parallax is the general class

function title_parallax(video, scrollTop, vBboxTop, vBboxBottom) {

	if(scrollTop < vBboxBottom) {
		video.nextSibling.style.top = vBboxBottom*0.25 + (scrollTop)/(1.2+0.6*(scrollTop/vBboxBottom))+"px";
		video.nextSibling.style.opacity = 1-(scrollTop - vBboxTop)/(vBboxBottom-vBboxTop);
	} else {
		return true;
	}
}
// parallax scrolling:

// :other scrolling

function ancillary_reveal(elementTop, anc_el, classToAdd, scrollTop) {
	if(scrollTop > elementTop - window.innerHeight*0.54) {
		for(i = 0; i < anc_el.length; i++) {
			anc_el[i].classList.add(classToAdd);
		}

		return true;
	}

	return false;
}
// other scrolling:

// :Add event listeners

function addClickEvents(){

	var hamburger = document.getElementById('hamburger'),
		overlay = document.getElementById('overlay-hdr');
	if(hamburger) {
		hamburger.addEventListener('click', function(e){
			var that = this;

			transitionHamburger(that);
			transitionPage(overlay);
		});
	}
}

// animate the hamburger on click for open/close

function transitionHamburger(element) {
	element.classList.toggle('is-active');
	hamburger.previousSibling.classList.toggle('scrunch');
}

// animate the page opening

function transitionPage(el) {
	el.classList.toggle('page-open');
	body.classList.toggle('hide-scroll');
}

// :scroll event

function addScrollEvent() {

	var initial_offset = window.pageYOffset;
	// consider making an object here?
	var anc_el = document.getElementsByClassName('inf-byte');

	// title video
	var video = document.getElementById('landing-video');
	if(video) {
		var vBboxTop = video.getBoundingClientRect().top + initial_offset,
			vBboxBottom = video.getBoundingClientRect().bottom + initial_offset;
	 }

	 document.addEventListener('resize', function(){
		 vBboxTop = video.getBoundingClientRect().top + initial_offset,
		 vBboxBottom = video.getBoundingClientRect().bottom + initial_offset;
		 anc_top = anc_el[0].getBoundingClientRect().top+window.pageYOffset;
		 elTop = [],
	 	 elBottom = [];

	 	 for(var i = 0; i < elements_matched.length; i++) {
	 		var elBoundingRect = elements_matched[i].getBoundingClientRect();
	 	 	elTop.push(elBoundingRect.top + initial_offset);
	 	 	elBottom.push(elBoundingRect.bottom +initial_offset);
	 	 }

	 });
	// ancillary	var anc_el = document.getElementsByClassName('inf-byte'),
 	anc_top = anc_el[0].getBoundingClientRect().top+window.pageYOffset;
	var revealed = false;
// parallax variables
	var elements_matched = document.getElementsByClassName('image-fixed-parallax');
	elTop = [],
	elBottom = [];

	for(var i = 0; i < elements_matched.length; i++) {
		var elBoundingRect = elements_matched[i].getBoundingClientRect();
		elTop.push(elBoundingRect.top + initial_offset);
		elBottom.push(elBoundingRect.bottom +initial_offset);
	}

	document.addEventListener('scroll', function(){

		var scrollTop = window.pageYOffset;

		if(title_parallax(video, scrollTop, vBboxTop, vBboxBottom)) {
			parallax_scroll(elements_matched, elTop, elBottom, scrollTop);
		}
		if(!revealed) {
			if(ancillary_reveal(anc_top, anc_el, 'active', scrollTop)) {
				revealed=true;
			}
		}
	});
}

// scroll event:

function init_events(){
		addClickEvents();
		addScrollEvent();
}

// event listeners:

init();
