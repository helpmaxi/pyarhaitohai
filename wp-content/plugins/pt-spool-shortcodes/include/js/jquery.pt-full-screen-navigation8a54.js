(function( jQuery ) {
	"use strict";
	
	jQuery.fn.pt_fullscreen_navigation = function() {
		return this.each(function() {
			var $this_area = jQuery(this),
			$bgs = $this_area.find('.fn-bgs'),
			$links = $this_area.find('.fn-pages'),
			linkLocation = '';


			jQuery(window).on('load resize', function() {
				$this_area.css({
					height: jQuery(window).outerHeight()-jQuery('.header-space:visible:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight()
				});
			});

			function play_video(eq) {
				var video = $bgs.find('.item').eq(eq).find('.video');
				if(video.length > 0) {
          video.addClass('is-playing');
          control_video(video,'play');
          video.parent().siblings().find('video').removeClass('is-playing');
          control_video(video.parent().siblings().find('video'), 'pause');
				}
			}

			$links.on('mouseenter', 'a', function() {
				if($this_area.hasClass('loading')) return false;

				var eq = jQuery(this).parent().index(),
				color = jQuery(this).data('color');
				
				jQuery(this).parent().addClass('current').removeClass('v').siblings().removeClass('current').addClass('v');
				$bgs.find('.item').eq(eq).fadeIn().addClass('current').siblings().fadeOut().removeClass('current');

				play_video(eq);

				$this_area.removeClass('white black').addClass(color);
			});

			$links.on('click', 'a', function() {
				var c_height = $links.height()/2,
				height   = $links.find('li.current').outerHeight()/2,
				top      = $links.find('li.current').position().top,
				a_top    = c_height-top-height;

				jQuery(this).parent().attr('style', 'transform: translate3d(0px, '+a_top+'px, 0px);');

				event.preventDefault();
				$this_area.addClass('loading');

				setTimeout(function() {
					jQuery('.pace').hide();
					jQuery('body').removeClass('loaded');
				}, 1300);
				linkLocation = this.href;
				setTimeout(redirectPage, 1600);
			});

			function redirectPage() {
				window.location = linkLocation;
			}

			play_video(0);
		});
	};
})(jQuery);