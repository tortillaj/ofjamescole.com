(function(JC, $, ScrollMagic) {
	JC = JC || {};

	function HomeAnimations() {
		this.enabled = false;

		this.$slides = $('.js-slide');
		this.$aboutContent = $('.js-about-content');
		this.$portfolioNav = $('.js-portfolio-nav');
		this.$portfolioNavLinks = $('.portfolio-list__link', this.$portfolioNav);
		this.$imageGroups = $('.js-image-group');
		this.$imagesLeft = $('.js-image.portfolio-images__group-image--left');
		this.$imagesRight = $('.js-image.portfolio-images__group-image--right');
		this.$images = $('.portfolio-images__group-specimen');
	}

	HomeAnimations.prototype.init = function init() {
		var ha = this;

		if (!ha.$slides.length || $(window).width() < 768) {
			return this.enabled = false;
		}

		ha.shouldStart();

		$(window).on('resize', function(e) {
			ha.shouldStart();
		});
	};

	HomeAnimations.prototype.shouldStart = function shouldStart() {
		var ha = this;
		var width = $(window).width();

		if (width >= 768 && !ha.enabled) {
			ha.start();
			ha.enabled = true;
		} else if (width < 768 && ha.enabled) {
			ha.enabled = false;
			ha.controller.destroy(true);
		}

		if (width < 768) {
			ha.$aboutContent.css({transform: 'none', opacity: 1});
			ha.$imagesLeft.css({transform: 'none'});
			ha.$imagesRight.css({transform: 'none'});
			ha.$images.css({opacity: 1});
		}
	};

	HomeAnimations.prototype.start = function start() {
		var ha = this;

		ha.controller = new ScrollMagic.Controller;

		ha.$portfolioNavLinks.each(function(i) {
			$(this).attr('data-index', i);
		});

		ha.$images.imagesLoaded(function() {
			ha.setState();
		});
	};

	HomeAnimations.prototype.setState = function setStage() {
		var ha = this;

		// SCENE 1
		ha.$slides.each(function(index, slide) {
			var id = $(slide).attr('id');
			var slideScene = new ScrollMagic.Scene({
					triggerElement: slide,
					offset: -95
				})
				.setClassToggle('#' + id, 'is-active')
				.addTo(ha.controller);
		});

		// SCENE 2
		ha.$portfolioNav.each(function(index, nav) {
			var portfolio = document.getElementById('portfolio');
			var portfolioHeight = portfolio.getClientRects()[0].height;
			var slideScene = new ScrollMagic.Scene({
					triggerElement: portfolio,
					offset: 450,
					duration: portfolioHeight
				})
				.setClassToggle(nav, 'is-active')
				.addTo(ha.controller);
		});

		// SCENE 3 - 1
		ha.$imageGroups.each(function(index, group) {
			var height = $(group).outerHeight();
			var id = $(group).attr('id');
			var link = document.querySelectorAll('[href*=' + id + ']');

			var slideScene = new ScrollMagic.Scene({
					triggerElement: group,
					duration: height
				})
				.setClassToggle(link, 'is-active')
				.addTo(ha.controller);
		});

		// SCENE 4 -1
		ha.$imagesLeft.each(function(index, image) {
			var slideParallaxScene = new ScrollMagic.Scene({
					triggerElement: image,
					triggerHook: 1,
					duration: "100%"
				})
				.setTween(TweenMax.from(image, 1, {
					y: 150,
					autoAlpha: 0.3,
					ease: Power0.easeNone
				}))
				.setTween(TweenMax.to(image, 1, {
					y: 0,
					autoAlpha: 0.8,
					ease: Power0.easeNone
				}))
				.addTo(ha.controller);
		});

		// SCENE 4 - 2
		ha.$imagesRight.each(function(index, image) {
			var slideParallaxScene = new ScrollMagic.Scene({
					triggerElement: image,
					triggerHook: 1,
					duration: "100%"
				})
				.setTween(TweenMax.from(image, 1, {
					y: 250,
					autoAlpha: 0.3,
					ease: Power0.easeNone
				}))
				.setTween(TweenMax.to(image, 1, {
					y: -100,
					autoAlpha: 0.8,
					ease: Power0.easeNone
				}))
				.addTo(ha.controller);
		});

		// SCENE 5
		ha.$images.each(function(index, image) {
			var slideScene = new ScrollMagic.Scene({
					triggerElement: image,
					offset: -200
				})
				.setClassToggle(image, 'is-active')
				.addTo(ha.controller);
		});
	};

	return JC.HomeAnimations = HomeAnimations;
})(JC, jQuery, ScrollMagic, undefined)
