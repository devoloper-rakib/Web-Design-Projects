'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};
// todo opening modal window
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

// point :  smooth scrolling with btn scroll to

btnScrollTo.addEventListener('click', function (e) {
	e.preventDefault();

	section1.scrollIntoView({ behavior: 'smooth' });
});

// //////////////////////////////////////////////////////////////////////// Page Navigation

// point : 1.2 : page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();

	// Matching strategy
	if (e.target.classList.contains('nav__link')) {
		console.log('link');
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});

// point : Tabbed component

tabsContainer.addEventListener('click', function (e) {
	const clicked = e.target.closest('.operations__tab');

	// Guard clause
	if (!clicked) return;

	// Remove active classes
	tabs.forEach((t) => t.classList.remove('operations__tab--active'));
	tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

	// Activate tab
	clicked.classList.add('operations__tab--active');

	// Activate content area
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add('operations__content--active');
});

// point : Menu fade animation
const handleHover = function (e) {
	if (e.target.classList.contains('nav__link')) {
		const link = e.target;
		const siblings = link.closest('.nav').querySelectorAll('.nav__link');
		const logo = link.closest('.nav').querySelector('img');

		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// point : Sticky navigation ///////////////////////

// point : Sticky navigation: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entire) {
	const [entry] = entire;
	if (!entry.isIntersecting) nav.classList.add('sticky');
	else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`, // / 90px before the root/target element
});
headerObserver.observe(header);

// point :  Reveal sections on Scroll ///////////////////////

const revelSection = function (entries, observer) {
	const [entry] = entries;
	// point : Guard clause : if entry is not intersecting
	if (!entry.isIntersecting) return;
	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
};

const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(revelSection, {
	root: null,
	threshold: 0.15,
});

allSections.forEach(function (section) {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});

// point :  lazy loading images ///////////////////////

const imgTargets = document.querySelectorAll('img[data-src]'); // select all images with data-src attribute and store in imgTargets variable
const loadImg = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;
	// Replace src with data-src
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener('load', function () {
		entry.target.classList.remove('lazy-img');
	});

	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));
