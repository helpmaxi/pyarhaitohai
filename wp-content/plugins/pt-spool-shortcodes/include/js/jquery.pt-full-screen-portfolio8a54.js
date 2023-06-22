(function (jQuery) {
  "use strict";

  jQuery.fn.pt_full_screen_portfolio = function (options) {
    return this.each(function () {
      var settings = jQuery.extend({
        speed: "300",
        autoplay: "on",
        autoplay_speed: "5000",
        mobile_cols: "1",
        tablet_cols: "2",
        desktop_cols: "3",
      }, options);

      var $this_area = jQuery(this),
        $head_slider = $this_area.find('.fs-portfolio'),
        $content = $this_area.find('.fs-content'),
        $bg = $this_area.find('.fs-bg'),
        $filter_buttons = $this_area.find('.filter-button-group');

      control_video($bg.find('.video'), 'play');

      function showProjectsbyCat(cat) {
        $head_slider.addClass('loading');
        setTimeout(function () {
          if (cat == '*') {
            $this_area.find('.cache-items .owl-item:not(.cloned) .item').each(function () {
              var $elem = jQuery(this).parent().html();
              $head_slider.trigger('add.owl.carousel', [$elem]);
              jQuery(this).parent().remove();
              $head_slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
            })
          } else {
            $this_area.find('.cache-items .item' + cat).each(function () {
              var $elem = jQuery(this).parent().html();
              $head_slider.trigger('add.owl.carousel', [$elem]);
              jQuery(this).parent().remove();
              $head_slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
            });
            $head_slider.find('.item:not(' + cat + ')').each(function () {
              var targetPos = jQuery(this).parent().index(),
                $elem = jQuery(this).parent();
              jQuery($elem).clone().appendTo(jQuery('.cache-items'));
              $head_slider.trigger('remove.owl.carousel', [targetPos]);
              $head_slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
            })
          }
        }, 500);
      }

      $filter_buttons.on('click', 'button', function (e) {
        e.preventDefault();
        jQuery(this).addClass('active').siblings().removeClass('active');

        var cat = jQuery(this).data('filter');
        showProjectsbyCat(cat);
      });

      $head_slider.on('refreshed.owl.carousel', function () {
        setTimeout(function () {
          $head_slider.removeClass('loading')
        }, 500);
      });

      if ($head_slider.find('.fs-portfolio-item').length > 1) {
        $head_slider.addClass('owl-carousel').owlCarousel({
          loop: false,
          items: 1,
          nav: true,
          dots: false,
          autoplay: settings.autoplay,
          autoplayTimeout: settings.autoplay_speed,
          autoplayHoverPause: false,
          smartSpeed: settings.speed,
          navClass: ['owl-prev solid-arrow-collection-left-arrow-6', 'owl-next solid-arrow-collection-right-arrow-6'],
          navText: false,
          margin: 30,
          responsive: {
            0: {
              items: settings.mobile_cols
            },
            768: {
              items: settings.tablet_cols
            },
            992: {
              items: settings.desktop_cols
            },
          }
        });
      }

      jQuery(window).on('load resize', function () {
        $this_area.find('.cell-container').css({
          height: jQuery(window).outerHeight() - jQuery('.header-space:visible:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight(),
          width: jQuery(window).width()
        });
      });

      $head_slider.on('click', '.fs-portfolio-item', function () {
        var data = {
          action: 'pt_portfolio_load_project',
          post_id: jQuery(this).data('id')
        };

        $this_area.addClass('loading');

        jQuery.post(yprm_ajax.url, data, function (data) {
          data = jQuery.parseJSON(data);

          $content.find('.heading a').text(data['name']);
          $content.find('.heading a').attr('href', data['link']);
          $content.find('.description').text(data['content']);
          $content.find('.bottom').html(data['bottom_html']);
          if (data['video_popup_attr']) {
            $content.find('.fs-play-button').removeClass('not').attr('data-video', data['video_popup_attr']);
          } else {
            $content.find('.fs-play-button').addClass('not');
          }

          if (data['video_bg']) {
            $bg.find('.video-block').fadeOut().queue(function(next) {
              jQuery(this).remove();
              next();
            });
            $bg.html(data['video_bg']);
            control_video($bg.find('.video'), 'play');
          } else {
            if($bg.find('.video-block').length > 0) {
              $bg.find('.video-block').fadeOut().queue(function(next) {
                jQuery(this).children().remove();
                next();
              });
            }
          }
          $bg.css('background-image', 'url(' + data['image'] + ')');
          $bg.attr('data-video', data['video_url']);
          $bg.attr('data-video-type', data['video_type']);

          $this_area.removeClass('loading');
        });
      });
    });
  };
})(jQuery);