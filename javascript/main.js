var body = document.querySelector('body');

// :leaflet contact map
var contactMap = L.map('contact-map').setView([39.160, -75.529], 14);

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16,
	minZoom: 14
}).addTo(contactMap);

var marker = L.marker([39.158, -75.525]).addTo(contactMap);

marker.bindPopup('<span style="font-weight: bold;">Here We Are!</span>').openPopup();
// leaflet contact map:

// lory slider init

(function init_lory() {

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
})();

// lory:

// :baguetteBox.js gallery
function init_gallery(){
	baguetteBox.run('.gallery', {
		animation: 'slideIn',
		async: true,
		noScrollBars: true
	});
}

init_gallery();
// bB.js:

// :parallax scrolling
function parallax_images(className){

	var elements_matched = document.getElementsByClassName(className);
	var elTop = [],
	elBottom = [];

	for(var i = 0; i < elements_matched.length; i++) {
		var elBoundingRect = elements_matched[i].getBoundingClientRect();
		elTop.push(elBoundingRect.top);
		elBottom.push(elBoundingRect.bottom);
	}
}

function parallax_scroll(elements_matched, elTop, elBottom) {
	var scrollTop = window.pageYOffset,
		i = 0;
	while(scrollTop > elTop[i]) {
		if(scrollTop < elBottom[i]) {
			parallax_img_txt(scrollTop, elements_matched[i], elTop[i], elBottom[i]);
		}
		i++;
	}
}

function parallax_img_txt(scrollTop, element, elTop, elBottom) {
	element.nextSibling.style.top = (elBottom-elTop)*0.14 + (scrollTop - elTop)/1.6 + "px";
	element.nextSibling.style.opacity = 1-(scrollTop - elTop)/(elBottom - elTop);
}

// .image-fixed-parallax is the general class

parallax_images('image-fixed-parallax');
// parallax scrolling:

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


function init_events(){
		addClickEvents()
}

init_events();
// event listeners:
