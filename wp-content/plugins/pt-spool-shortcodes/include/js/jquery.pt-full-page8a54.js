(function( jQuery ) {
	"use strict";
	jQuery.fn.pt_full_page = function() {
		return this.each(function() {
			var $this = jQuery(this),
				$nav = $this.find('.fc-navigation'),
				$items = $this.find('.fc-item'),
				status = false;

			jQuery('body').addClass('body-overflow-hidden');
			$items.each(function(index) {
				jQuery(this).css('z-index', parseInt($items.length-jQuery(this).index()));
				$nav.find('ul').append('<li class="nav-item"></li>');
			});

			scroll(false, 0);

			jQuery(window).on('load resize', function() {
				$this.css('height', jQuery(window).outerHeight()-jQuery('.header-space:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());
				$items.find('.cell-container').css({
					'height': $this.height(),
					'width': $this.width(),
				});
				$items.find('.container-fluid').css('width', $this.width());
				$this.find('.fc-navigation .item').css('height', parseInt($this.height()/$items.length));

				if(jQuery(window) <= 992) {
					$items.addClass('active');
				}
			});

			function scroll(coef, index) {
				index = index === undefined ? false : index;
				if(coef != false) {
					var index = $this.find('.fc-item.active').index()-coef;
				}
				$items.eq(index).removeClass('prev next').addClass('active').siblings().removeClass('active');
				$items.eq(index).prevAll().removeClass('next').addClass('prev');
				$items.eq(index).nextAll().removeClass('prev').addClass('next');

				$nav.find('.nav-item').eq(index).addClass('active').siblings().removeClass('active');

				if($items.eq(index).hasClass('starting-split-item')) {
					jQuery('body').addClass('wrap-lines-right-dark');
				} else {
					jQuery('body').removeClass('wrap-lines-right-dark');
				}

				if($items.eq(index).find('.owl-carousel').length > 0) {
					$items.eq(index).find('.owl-carousel').each(function() {
						jQuery(this).trigger('to.owl.carousel', [0, 0]);
					});
				}



				$items.eq(index).find('.video').each(function(){
          jQuery(this).addClass('is-playing');
					control_video(jQuery(this), 'play');
				});

				$items.eq(index).siblings().find('video.jquery-background-video').each(function(){
					jQuery(this).removeClass('is-playing');
					control_video(jQuery(this), 'pause');
				});
			}

			$this.on('mousewheel wheel', function(e) {
				if(jQuery(window).width() > 992) {
					e.preventDefault();
					var cur = $this.find('.fc-item.active').index(),
						delay = 1000;
					if(status != true) {
						status = true;
						if(e.originalEvent.deltaY > 0 && cur != parseInt($items.length-1)) {
							scroll('-1');
							setTimeout(function(){status = false}, delay);
						} else if(e.originalEvent.deltaY < 0 && cur != 0) {
							scroll('1');
							setTimeout(function(){status = false}, delay);
						} else {
							status = false;
						}
					}
				}
			});

			$this.swipe( {
		    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
		      if(direction == 'up') {
		      	scroll('-1');
		      } else if(direction == 'down') {
		      	scroll('1');
		      }
		    },
		    preventDefaultEvents: false
		  });

			$nav.on('click', '.nav-item', function() {
				scroll(false, jQuery(this).index());
			});
		});
	};
})(jQuery);