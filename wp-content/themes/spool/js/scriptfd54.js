/*------------------------------------------------------------------
[Master Scripts]

Project:    Spool Theme
Version:    1.0.1

[Table of contents]

[Components]

	-Preloader
	-Stick sidebar
	-Dropdown img
	-Equal Height function
	-Navigation open
	-Search
	-Mobile menu
	-Fixed header
	-Screen rezise events
	-Fix centered container
	-Blog items & filtering
	-Full sreen navigation
	-Animation
	-Animation
	-Load more
	-Comment reply
	-Popup image
	-Parallax
	-Tabs
	-Quantity
	
-------------------------------------------------------------------*/

"use strict";

/*------------------------------------------------------------------
[ Preloader ]
*/

jQuery(window).on('load', function () {
	jQuery('body').addClass('loaded');

	jQuery(window).trigger('resize').trigger('scroll');
	jQuery('.owl-carousel').trigger('refresh.owl.carousel');

	setTimeout(function() {
		jQuery('.preloader-default-area, .preloader-area').remove();
	}, 2500);

	setTimeout(function() {
		jQuery(window).trigger('resize').trigger('scroll');
		jQuery('.owl-carousel').trigger('refresh.owl.carousel');
		jQuery('.fullpage-navigation-area').addClass('loaded');
	}, 1000)
});

function leadZero(n) { return (n < 10 ? '0' : '') + n; }

jQuery('.side-navigation .sub-menu').each(function() {
	jQuery(this).prepend('<li class="back solid-arrow-collection-left-arrow-1"></li>');
});

/*------------------------------------------------------------------
[ Equal Height function ]
*/
function equalHeight(group) {
	 if(jQuery(window).width() > '768') {
		var tallest = 0;
			jQuery(group).each(function() {
				var thisHeight = jQuery(this).css('height', '').outerHeight();
				if(thisHeight > tallest) {
					 tallest = thisHeight;
				}
		  });
		  jQuery(group).css('height', tallest);
	 } else {
		jQuery(group).css('height', '');
	 }
}
function equalWidth(group) {
	 if(jQuery(window).width() > '768') {
		var tallest = 0;
			jQuery(group).each(function() {
				var thisWidth = jQuery(this).css('width', '').outerWidth();
				if(thisWidth > tallest) {
					 tallest = thisWidth;
				}
		  });
		  jQuery(group).css('width', tallest);
	 } else {
		jQuery(group).css('width', '');
	 }
}

jQuery('.mega-menu').each(function() {
	var $this = jQuery(this),
		cols_count = $this.find('.sub-menu.mega-menu-row').length;

	$this.addClass('cols-'+cols_count);
});

jQuery('input.style1, textarea.style1').each(function() {
	var $this = jQuery(this);
	$this.wrap('<div class="input-row-s1"></div>');
});

jQuery(document).ready(function() {
	/*------------------------------------------------------------------
	[ Right click disable ]
	*/

	jQuery('.right-click-disable').on('contextmenu', function() {
		jQuery('.right-click-disable-message').addClass('active');
		return false;
	});

	jQuery('.right-click-disable-message:not(.lic)').on('click', function() {
		jQuery(this).removeClass('active');
		return false;
	});

	
	jQuery('input.style1, textarea.style1').on('focusin', function() {
		var $this = jQuery(this);
		$this.parent('.input-row-s1').addClass('focus');
	}).on('focusout', function() {
		var $this = jQuery(this);
		if(!$this.val()) {
			$this.parent('.input-row-s1').removeClass('focus');
		}
	});

	jQuery('.wpb_fixed').each(function() {
		var this_el = jQuery(this);
		this_el.children('.wpb_column').stick_in_parent({
			parent: ".wpb_fixed"
		});

		jQuery(window).on("resize", (function(_this) {
			return function(e) {
				if(jQuery(window).width() > 768) {
					return this_el.trigger("sticky_kit:recalc");
				} else {
					return this_el.trigger("sticky_kit:detach");
				}
			};
		})(this));
	});

	jQuery('.project-side-images').each(function() {
		var this_el = jQuery(this);
		this_el.find('[data-sticky_column]').stick_in_parent({
			parent: this_el.find('[data-sticky_parent]')
		});

		jQuery(window).on("resize", (function(_this) {
			return function(e) {
				if(jQuery(window).width() > 768) {
					return this_el.find('[data-sticky_column]').trigger("sticky_kit:recalc");
				} else {
					return this_el.find('[data-sticky_column]').trigger("sticky_kit:detach");
				}
			};
		})(this));
	});

	 if(jQuery('.navigation > ul > li').length > 6) {
		jQuery('.navigation').addClass('min');
	}

	jQuery('#wpadminbar').addClass('wpadminbar');


	/*------------------------------------------------------------------
	[ Search ]
	*/

	jQuery('.site-header .search-button').on("click", function(){
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.search-popup').fadeOut();
		} else {
			jQuery(this).addClass('active');
			jQuery('.search-popup').fadeIn();
		}
	});

	jQuery('.search-popup .close').on("click", function(){
		jQuery('.site-header .search-button').removeClass('active');
		jQuery('.search-popup').fadeOut();
	});
	
	/*------------------------------------------------------------------
	[ Navigation ]
	*/

	jQuery('.butter-button.hidden_menu, .butter-button.visible_menu, .butter-button.centered_menu').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.navigation').removeClass('active');
			jQuery('body').removeClass('navigation-opened');
		} else {
			jQuery(this).addClass('active');
			jQuery('.navigation').addClass('active');
			jQuery('body').addClass('navigation-opened');
		}
	});

	jQuery('.butter-button.minified-button').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active').find('.butter-button').removeClass('active');
			jQuery('.minified-block, .navigation, .butter-button.hidden_menu').removeClass('active');
			jQuery('body').removeClass('navigation-opened');
		} else {
			jQuery(this).addClass('active').find('.butter-button').addClass('active');
			jQuery('.minified-block, .navigation, .butter-button.hidden_menu').addClass('active');
			jQuery('body').addClass('navigation-opened');
		}
	});

	jQuery('.butter-button.full_screen').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.full-screen-nav').fadeOut();
		} else {
			jQuery(this).addClass('active');
			jQuery('.full-screen-nav').fadeIn();
		}
	});

	jQuery('.full-screen-nav .close').on("click", function(){
		jQuery('.butter-button.full_screen').removeClass('active');
		jQuery('.full-screen-nav').fadeOut();
	});

	jQuery('.butter-button.on_side').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.right-side-nav').removeClass('active');
		} else {
			jQuery(this).addClass('active');
			jQuery('.right-side-nav').addClass('active');
		}
	});

	jQuery('.right-side-nav .close').on("click", function(){
		jQuery('.butter-button.on_side').removeClass('active');
		jQuery('.right-side-nav').removeClass('active');
	});

	jQuery('.full-screen-nav .menu-item-has-children > a').on("click", function(){
		if(!jQuery(this).hasClass('active')) {
			jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().parent().siblings().children('a').removeClass('active').next('.sub-menu').slideUp();
			return false;
		}
	});

	jQuery('.side-navigation ul li.menu-item-has-children > a,.side-navigation ul li.page_item_has_children > a').on('click', function(){
		jQuery(this).parents('li').addClass('active-child');
		return false;
	});

	jQuery('.side-navigation .sub-menu .back,.side-navigation .children .back').on('click', function(){
		jQuery(this).parent().parent().removeClass('active-child');
		return false;
	});

	jQuery('.right-side-navigation ul li.menu-item-has-children > a').on('click', function() {
		if(jQuery(this).parent().hasClass('active')) {
			jQuery(this).parent().removeClass('active').find('.sub-menu').slideUp().find('.active').removeClass('active');
		} else {
			jQuery(this).parent().addClass('active').children('.sub-menu').slideDown();
		}

		return false;
	});

	jQuery('.full-screen-nav .close').on("click", function(){
		jQuery('.butter-button.full_screen').removeClass('active');
		jQuery('.full-screen-nav').fadeOut();
	});

	jQuery('.side-nav-button').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.side-navigation-block').removeClass('active');
		} else {
			jQuery(this).addClass('active');
			jQuery('.side-navigation-block').addClass('active');
		}
	});

	jQuery('.side-navigation-block .close').on("click", function(){
		jQuery('.side-nav-button').removeClass('active');
		jQuery('.side-navigation-block').removeClass('active');
	});
	
	/*------------------------------------------------------------------
	[ Side bar ]
	*/

	jQuery('.sidebar-button').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.side-bar-area').removeClass('active');
		} else {
			jQuery(this).addClass('active');
			jQuery('.side-bar-area').addClass('active');
		}
	});

	jQuery('.side-bar-area .close').on("click", function(){
		jQuery('.side-bar-area').removeClass('active');
	});

	/*------------------------------------------------------------------
	[ Fixed header ]
	*/

	jQuery(window).on("load resize scroll", function(){
		if ( jQuery(document).scrollTop() > 0 ) {
			jQuery('.site-header').addClass('fixed');
		} else {
			jQuery('.site-header').removeClass('fixed');
		}
	});

	/*------------------------------------------------------------------
	[ Screen rezise events ]
	*/
	
	var nav_el = '';
	if(jQuery('.navigation').hasClass('visible_menu')) {
		nav_el = 'yes';
	}
	jQuery(window).on("load resize", function(){
		jQuery('.banner-area').each(function() {
			if((jQuery(this).offset().top-jQuery('#wpadminbar').outerHeight()) == 0) {
				jQuery(this).addClass('on-top').find('.container > .cell').css('padding-top', parseInt(30+jQuery('#wpadminbar').outerHeight()+jQuery('.site-header').outerHeight()))
			}
		});

		/*------------------------------------------------------------------
		[ Mobile menu ]
		*/
		if(jQuery(window).width() < '768') {
			jQuery('.navigation .menu-item-has-children > a').on("click", function(){
				if(!jQuery(this).hasClass('active')) {
					jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
					jQuery(this).addClass('active').parent().children('.mega-menu').slideDown().siblings().children('.mega-menu').slideUp();
					return false;
				}
			});
		}

		jQuery('.header-space').css('height', jQuery('.site-header').outerHeight()+jQuery('.header + .navigation').outerHeight());

		jQuery('main.main-row').css('min-height', jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.header-space:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());

		jQuery('.project-horizontal-slider').each(function() {
			var val = parseInt((jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.header-space:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight()-jQuery('.project-horizontal-slider').height())/2);

			if(val < 0) {
				val = 0;
			}

			jQuery(this).css('margin-top', val);
		});

		jQuery('.block-404 .cell').css('height', jQuery(window).outerHeight()-jQuery('.header-space:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());

		jQuery('.protected-post-form .cell').css('height', jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.footer-social-button').outerHeight()-jQuery('.header-space:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight()-parseInt(jQuery('#all').css('padding-top'))-parseInt(jQuery('#all').css('padding-bottom')))

		jQuery('.banner:not(.fixed-height)').each(function(){
			var coef = 0;
			jQuery(this).css('height', jQuery(window).outerHeight()-jQuery('.header-space:visible:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight()-coef);
			jQuery(this).find('.item, .cell').css('height', jQuery(this).height());
		});
		jQuery('.banner.fixed-height').each(function(){
			jQuery(this).find('.item, .cell').css('height', jQuery(this).height());
		});

		jQuery('.full-screen-nav .cell').css('height', jQuery(window).height()-20-jQuery('#wpadminbar').height()-jQuery('.ypromo-site-bar').outerHeight());

		jQuery('.block-coming-soon.fixed-height').each(function() {
			var height = jQuery(this).height();

			jQuery(this).find('.cell').css('height', 'auto').css('height', height);
		});

		jQuery('.categories-carousel:not(.fixed-height)').each(function() {
			jQuery(this).find('.item').css('height', jQuery(window).outerHeight()-jQuery('.header-space:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());
		});

		if (nav_el == "yes") {
			if(jQuery(window).width() > 768) {
				jQuery('.navigation').addClass('visible_menu');
				jQuery('.butter-button').addClass('hidden').removeClass('active');
			} else {
				jQuery('.navigation').removeClass('visible_menu');
				jQuery('.butter-button').removeClass('hidden');
			}
		}

		jQuery('.banner-categories-carousel').each(function() {
			var area = jQuery(this).parent('.banner-area').height();
			jQuery(this).find('.item').css('height', area);
		});

		jQuery('div[data-vc-full-width-mod="true"]').each(function() {
			var coef = (jQuery('.container').outerWidth(true)-jQuery('#all').width())/2;
			jQuery(this).css('left', coef).css('width', jQuery('#all').width());
		});

		jQuery('.products.row').each(function(){
			equalHeight(jQuery(this).find('.product'));
		});

		jQuery('.icon-box.row').each(function(){
			equalHeight(jQuery(this).find('.wrap'));
		});

		jQuery('.mega-sub-menu').each(function(){
			equalHeight(jQuery(this).children('.mega-menu-column'));
		});

		jQuery('.side-header .wrap').each(function() {
			var height = jQuery(this).height();
			jQuery(this).find('.cell').css('height', height);
		});

		jQuery('.project-horizontal .cell').css('height', jQuery('.project-horizontal').outerHeight());

		jQuery('.projects-slider').css('height', jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.site-header').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight()-jQuery('.ypromo-site-bar').outerHeight());

		jQuery('.portfolio-h').each(function(){
			var parent_w = jQuery(this).width();

			jQuery(this).find('.ph-slider-area').css('margin-right', -(jQuery(window).width()-parent_w)/2);
		});

		/*------------------------------------------------------------------
		[ Fix centered container ]
		*/
		jQuery('.centered-container').each(function() {
			var width = parseInt(Math.round(jQuery(this).width()).toFixed(0)),
				height = parseInt(Math.round(jQuery(this).height()).toFixed(0));

			jQuery(this).css('width', '').css('height', '');

			if ( width & 1 ) {jQuery(this).css('width', (width+1)+'px');}

			if ( height & 1 ) {jQuery(this).css('height', (height+1)+'px');}
		});

		/*------------------------------------------------------------------
		[ Parallax ]
		*/
		jQuery('.background-parallax').each(function(){
			var wScroll = jQuery(window).scrollTop()-jQuery(this).parent().offset().top+jQuery('#wpadminbar').height()+jQuery('.header-space').height()-jQuery('.ypromo-site-bar').outerHeight();
			jQuery(this).css('transform', 'translate(0px,' + wScroll + 'px)');
			jQuery(this).parents('.owl-carousel').find('.owl-nav div').css('margin-top', wScroll);
		});

		jQuery('.navigation-img').each(function() {
			jQuery(this).css('height', parseInt(jQuery(this).parents('.mega-menu-row').height()));
		});

		jQuery('.one-screen-area').each(function() {
			var $this = jQuery(this),
				rows  = $this.find('.portfolio-cols-slider').data('rows');

			$this.css('height', jQuery(window).outerHeight()-jQuery('.header-space:visible').height()-jQuery('#wpadminbar').outerHeight()-jQuery('.ypromo-site-bar').outerHeight());
			$this.find('.item').css('height', $this.height());
			$this.find('.one-screen-contact .content .cell').css('height', $this.height());

			if(rows) {
				$this.find('.pcs-item .cell').css('height', $this.height()/rows);
			}
		});

		jQuery('.vertical-parallax-slider .vps-item.last').each(function() {
			jQuery(this).css('bottom', -parseInt(jQuery('.vertical-parallax-slider .vps-item.last').outerHeight()-jQuery('.vps-item .page-title').position().top-jQuery('.vps-item .page-title').outerHeight(true)));
		});

		jQuery('.navigation.centered_menu').each(function() {
			var $this = jQuery(this),
				this_w = $this.width(),
				$container = $this.parent().parent(),
				$container_fr = $container.find('.fr'),
				container_w = $container.width();

			$this.css('margin-right', 0);
			$this.css('margin-right', parseInt( (container_w/2)-($container_fr.width()-this_w)-this_w/2 ));
		});
	});

	setTimeout(function() {jQuery(window).trigger('resize').trigger('scroll');},500);

	/*------------------------------------------------------------------
	[ Scroll top button ]
	*/

	jQuery('#scroll-top').on("click", function(){
		jQuery('body, html').animate({ scrollTop: '0' }, 1100); 
		return false;
	});

	/*------------------------------------------------------------------
	[ Comment reply ]
	*/

	jQuery('.replytocom').on('click', function(){
		var id_parent = jQuery(this).attr('data-id');
		jQuery('#comment_parent').val(id_parent);
		jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));
		jQuery('#cancel-comment-reply-link').show();
		return false;
	});

	jQuery('#cancel-comment-reply-link').on('click', function(){
		jQuery('#comment_parent').val('0');
		jQuery('#respond').appendTo(jQuery('#commentform-area'));
		jQuery('#cancel-comment-reply-link').hide();
		return false;
	});

	/*------------------------------------------------------------------
	[ Quantity ]
	*/

	jQuery('.quantity .down').on("click", function(){
		var val = jQuery(this).parent().find('.input-text').val();
		if(val > 1) {
			val = parseInt(val) - 1;
			jQuery(this).parent().find('.input-text').val(val);
		}
		return false;
	});

	jQuery('.quantity .up').on("click", function(){
		var val = jQuery(this).parent().find('.input-text').val();
		val = parseInt(val) + 1;
		jQuery(this).parent().find('.input-text').val(val);
		return false;
  });
  
	/*------------------------------------------------------------------
	[ Animations ]
	*/

	jQuery(window).on('load scroll', function(){
		jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function(){
			var th = jQuery(this);
			th.imagesLoaded( function() {
				var top = jQuery(document).scrollTop()+jQuery(window).height(),
					pos_top = th.offset().top;
				if (top > pos_top) {
					th.addClass('wpb_start_animation animated');
				}
			});
		});
		
		jQuery('.skill-item .rating-line').each(function(){
			var top = jQuery(document).scrollTop()+jQuery(window).height(),
				pos_top = jQuery(this).offset().top,
				val = jQuery(this).data('percent');
			if (top > pos_top) {
				if(!jQuery(this).hasClass('animated')) {
					jQuery(this).addClass('animated').find('.line div').css('width', val+'%');
				}
			}
		});
	});
});

