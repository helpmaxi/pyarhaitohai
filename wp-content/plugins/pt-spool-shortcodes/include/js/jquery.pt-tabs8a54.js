(function( jQuery ) {
	"use strict";
	jQuery.fn.pt_tabs = function() {
		return this.each(function() {
			var $tabs = jQuery(this),
				$tabs_head = $tabs.find('.tabs-head'),
				$tabs_body = $tabs.find('.tabs-body'),
				$tab_content = $tabs.find('.tab-content');
			
			function set_tab(index) {
				$tabs_head.find('.item').eq(index).addClass('current').siblings().removeClass('current');
				$tab_content.eq(index).children('.tab-m-button').addClass('current').parent().siblings().children('.tab-m-button').removeClass('current');
				$tab_content.eq(index).children('.tab-inner-content').slideDown().parent().siblings().children('.tab-inner-content').slideUp();

				if($tabs.find('.isotope').length > 0) {
					$tabs.find('.isotope').isotope();
				}
				jQuery(window).trigger('resize').trigger('scroll');

				setTimeout(function() {jQuery(window).trigger('resize').trigger('scroll');},500);
			}

			$tabs_head.on('click', '.item:not(.current)', function() {
				set_tab(jQuery(this).index());
			});

			$tab_content.on('click', '.tab-m-button:not(.current)', function() {
				set_tab(jQuery(this).parent().index());
			});

			set_tab(0);
		});
	};
})(jQuery);