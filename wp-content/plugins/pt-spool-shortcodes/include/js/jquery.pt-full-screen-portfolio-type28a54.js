(function( jQuery ) {
	"use strict";
	jQuery.fn.pt_full_screen_portfolio_type2 = function(options) {
		return this.each(function() {
			var settings = jQuery.extend({
                speed: "300",
                autoplay: "on",
                autoplay_speed: "5000",
                navigation: "true",
	        }, options );

	        var $this_area      = jQuery(this);


            jQuery(window).on('load resize', function() {
            	$this_area.find('.cell-container').css({
            		height: jQuery(window).outerHeight()-jQuery('.header-space:visible:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight()
            	});
            });

            if($this_area.find('.item').length > 1) {
				$this_area.addClass('owl-carousel').owlCarousel({
					loop:true,
					items:1,
					nav: settings['navigation'],
					navContainer: $this_area.find('.item .owl-nav'),
					dots: false,
					autoplay: settings['autoplay'],
					autoplayTimeout: settings['autoplay_speed'],
					smartSpeed: settings['speed'],
					autoHeight: true,
					autoplayHoverPause: true,
					navClass: ['owl-prev solid-arrow-collection-left-arrow-6','owl-next solid-arrow-collection-right-arrow-6'],
					navText: false
				});
			}
		});
	};
})(jQuery);