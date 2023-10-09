/**
 *	edrea - Personal Portfolio Templete (HTML)
 *	Author: codeefly
 *	Author URL: http://themeforest.net/user/codeefly
 *	Copyright Ã‚Â© edrea by codeefly. All Rights Reserved.
 **/

 (function ($) {
    "use strict";
    var edrea = {
      /* edrea init */
      init() {
        edrea.edrea_tm_trigger_menu(),
          edrea.edrea_tm_cursor(),
          edrea.edrea_tm_imgtosvg(),
          edrea.edrea_tm_data_images(),
          edrea.breadcrubHeading(),
          edrea.submenu__Mobile(),
          edrea.edrea_tm_headline(),
          edrea.edrea_tm_swiper(),
          edrea.edrea_tm_modalbox(),
          edrea.edrea_tm_popup(),
          edrea.edrea_tm_about_popup(),
          edrea.edrea_tm_portfolio_popup();
      },
      preloader() {
        var speed = 500;
        setTimeout(function () {
          var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
            navigator.userAgent
          )
            ? true
            : false;
          var preloader = $("#preloader");
  
          if (!isMobile) {
            setTimeout(function () {
              preloader.addClass("preloaded");
            }, 800);
            setTimeout(function () {
              preloader.remove();
            }, 2000);
          } else {
            preloader.remove();
          }
        }, speed);
      },
      edrea_tm_trigger_menu() {
        var hamburger = jQuery(".edrea_tm_topbar .trigger .hamburger");
        var mobileMenu = jQuery(".edrea_tm_mobile_menu");
        var mobileMenuList = jQuery(".edrea_tm_mobile_menu ul li a");
  
        hamburger.on("click", function () {
          var element = jQuery(this);
  
          if (element.hasClass("is-active")) {
            element.removeClass("is-active");
            mobileMenu.removeClass("opened");
          } else {
            element.addClass("is-active");
            mobileMenu.addClass("opened");
          }
          return false;
        });
  
        mobileMenuList.on("click", function () {
          jQuery(".edrea_tm_topbar .trigger .hamburger").removeClass("is-active");
          mobileMenu.removeClass("opened");
          return false;
        });
      },
      edrea_tm_cursor() {
        var myCursor = jQuery(".mouse-cursor");
  
        if (myCursor.length) {
          if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
              t = document.querySelector(".cursor-outer");
            let n,
              i = 0,
              o = !1;
            (window.onmousemove = function (s) {
              o ||
                (t.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (e.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (n = s.clientY),
                (i = s.clientX);
            }),
              $("body").on(
                "mouseenter",
                "a,.edrea_tm_topbar .trigger, .cursor-pointer",
                function () {
                  e.classList.add("cursor-hover"),
                    t.classList.add("cursor-hover");
                }
              ),
              $("body").on(
                "mouseleave",
                "a,.edrea_tm_topbar .trigger, .cursor-pointer",
                function () {
                  ($(this).is("a") &&
                    $(this).closest(".cursor-pointer").length) ||
                    (e.classList.remove("cursor-hover"),
                    t.classList.remove("cursor-hover"));
                }
              ),
              (e.style.visibility = "visible"),
              (t.style.visibility = "visible");
          }
        }
      },
      edrea_tm_imgtosvg() {
        jQuery("img.svg").each(function () {
          var jQueryimg = jQuery(this);
          var imgClass = jQueryimg.attr("class");
          var imgURL = jQueryimg.attr("src");
  
          jQuery.get(
            imgURL,
            function (data) {
              // Get the SVG tag, ignore the rest
              var jQuerysvg = jQuery(data).find("svg");
  
              // Add replaced image's classes to the new SVG
              if (typeof imgClass !== "undefined") {
                jQuerysvg = jQuerysvg.attr("class", imgClass + " replaced-svg");
              }
  
              // Remove any invalid XML tags as per http://validator.w3.org
              jQuerysvg = jQuerysvg.removeAttr("xmlns:a");
  
              // Replace image with new SVG
              jQueryimg.replaceWith(jQuerysvg);
            },
            "xml"
          );
        });
      },
      edrea_tm_data_images() {
        var data = jQuery("*[data-img-url]");
        data.each(function () {
          var element = jQuery(this);
          var url = element.data("img-url");
          element.css({ backgroundImage: "url(" + url + ")" });
        });
      },
      breadcrubHeading() {
        // Get the text content of the paragraph
        var paragraphText = $(".edrea_tm_main_title h3").text();
  
        // Define the text you want to target
        var targetText =
          paragraphText.split(" ")[paragraphText.split(" ").length - 1];
        // Find the index of the target text within the paragraph
        var startIndex = paragraphText.indexOf(targetText);
        var endIndex = startIndex + targetText.length;
  
        if (startIndex !== -1) {
          // Wrap the target text in a <span> element with a class
          var modifiedText =
            paragraphText.substring(0, startIndex) +
            '<span class="coloring">' +
            paragraphText.substring(startIndex, endIndex) +
            "</span>" +
            paragraphText.substring(endIndex);
          // Update the paragraph with the modified text
          if (paragraphText.split(" ").length > 1) {
            $(".edrea_tm_main_title h3").html(modifiedText);
          }
        }
      },
      submenu__Mobile() {
        var nav = $("ul.transition_link, .widget_nav_menu ul.menu");
        nav.each(function () {
          $(this)
            .find("a")
            .off()
            .on("click", function (e) {
              var element = $(this);
              var parentItem = element.parent("li");
              var parentItems = element.parents("li");
              var parentUls = parentItem.parents("ul.sub-menu");
              var subMenu = element.next();
              var allSubMenusParents = nav.find("li");
  
              allSubMenusParents.removeClass("opened");
  
              if (subMenu.length) {
                e.preventDefault();
  
                if (!subMenu.parent("li").hasClass("active")) {
                  if (!parentItems.hasClass("opened")) {
                    parentItems.addClass("opened");
                  }
  
                  allSubMenusParents.each(function () {
                    var el = $(this);
                    if (!el.hasClass("opened")) {
                      el.find("ul.sub-menu").slideUp();
                    }
                  });
  
                  allSubMenusParents.removeClass("active");
                  parentUls.parent("li").addClass("active");
                  subMenu.parent("li").addClass("active");
                  subMenu.slideDown();
                } else {
                  subMenu.parent("li").removeClass("active");
                  subMenu.slideUp();
                }
                return false;
              }
            });
        });
      },
      edrea_tm_headline() {
        var animationDelay = 2500,
          //loading bar effect
          barAnimationDelay = 3800,
          barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
          //letters effect
          lettersDelay = 50,
          //type effect
          typeLettersDelay = 150,
          selectionDuration = 500,
          typeAnimationDelay = selectionDuration + 800,
          //clip effect
          revealDuration = 600,
          revealAnimationDelay = 1500;
  
        initHeadline();
  
        function initHeadline() {
          //insert <i> element for each letter of a changing word
          singleLetters($(".cd-headline.letters").find("b"));
          //initialise headline animation
          animateHeadline($(".cd-headline"));
        }
  
        function singleLetters($words) {
          $words.each(function () {
            var word = $(this),
              letters = word.text().split(""),
              selected = word.hasClass("is-visible");
            for (i in letters) {
              if (word.parents(".rotate-2").length > 0)
                letters[i] = "<em>" + letters[i] + "</em>";
              letters[i] = selected
                ? '<i class="in">' + letters[i] + "</i>"
                : "<i>" + letters[i] + "</i>";
            }
            var newLetters = letters.join("");
            word.html(newLetters).css("opacity", 1);
          });
        }
  
        function animateHeadline($headlines) {
          var duration = animationDelay;
          $headlines.each(function () {
            var headline = $(this);
  
            if (headline.hasClass("loading-bar")) {
              duration = barAnimationDelay;
              setTimeout(function () {
                headline.find(".cd-words-wrapper").addClass("is-loading");
              }, barWaiting);
            } else if (headline.hasClass("clip")) {
              var spanWrapper = headline.find(".cd-words-wrapper"),
                newWidth = spanWrapper.width() + 10;
              spanWrapper.css("width", newWidth);
            } else if (!headline.hasClass("type")) {
              //assign to .cd-words-wrapper the width of its longest word
              var words = headline.find(".cd-words-wrapper b"),
                width = 0;
              words.each(function () {
                var wordWidth = $(this).width();
                if (wordWidth > width) width = wordWidth;
              });
              headline.find(".cd-words-wrapper").css("width", width);
            }
  
            //trigger animation
            setTimeout(function () {
              hideWord(headline.find(".is-visible").eq(0));
            }, duration);
          });
        }
  
        function hideWord($word) {
          var nextWord = takeNext($word);
  
          if ($word.parents(".cd-headline").hasClass("type")) {
            var parentSpan = $word.parent(".cd-words-wrapper");
            parentSpan.addClass("selected").removeClass("waiting");
            setTimeout(function () {
              parentSpan.removeClass("selected");
              $word
                .removeClass("is-visible")
                .addClass("is-hidden")
                .children("i")
                .removeClass("in")
                .addClass("out");
            }, selectionDuration);
            setTimeout(function () {
              showWord(nextWord, typeLettersDelay);
            }, typeAnimationDelay);
          } else if ($word.parents(".cd-headline").hasClass("letters")) {
            var bool =
              $word.children("i").length >= nextWord.children("i").length
                ? true
                : false;
            hideLetter($word.find("i").eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find("i").eq(0), nextWord, bool, lettersDelay);
          } else if ($word.parents(".cd-headline").hasClass("clip")) {
            $word
              .parents(".cd-words-wrapper")
              .animate({ width: "2px" }, revealDuration, function () {
                switchWord($word, nextWord);
                showWord(nextWord);
              });
          } else if ($word.parents(".cd-headline").hasClass("loading-bar")) {
            $word.parents(".cd-words-wrapper").removeClass("is-loading");
            switchWord($word, nextWord);
            setTimeout(function () {
              hideWord(nextWord);
            }, barAnimationDelay);
            setTimeout(function () {
              $word.parents(".cd-words-wrapper").addClass("is-loading");
            }, barWaiting);
          } else {
            switchWord($word, nextWord);
            setTimeout(function () {
              hideWord(nextWord);
            }, animationDelay);
          }
        }
  
        function showWord($word, $duration) {
          if ($word.parents(".cd-headline").hasClass("type")) {
            showLetter($word.find("i").eq(0), $word, false, $duration);
            $word.addClass("is-visible").removeClass("is-hidden");
          } else if ($word.parents(".cd-headline").hasClass("clip")) {
            $word
              .parents(".cd-words-wrapper")
              .animate(
                { width: $word.width() + 10 },
                revealDuration,
                function () {
                  setTimeout(function () {
                    hideWord($word);
                  }, revealAnimationDelay);
                }
              );
          }
        }
  
        function hideLetter($letter, $word, $bool, $duration) {
          $letter.removeClass("in").addClass("out");
  
          if (!$letter.is(":last-child")) {
            setTimeout(function () {
              hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
          } else if ($bool) {
            setTimeout(function () {
              hideWord(takeNext($word));
            }, animationDelay);
          }
  
          if (
            $letter.is(":last-child") &&
            $("html").hasClass("no-csstransitions")
          ) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
          }
        }
  
        function showLetter($letter, $word, $bool, $duration) {
          $letter.addClass("in").removeClass("out");
  
          if (!$letter.is(":last-child")) {
            setTimeout(function () {
              showLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
          } else {
            if ($word.parents(".cd-headline").hasClass("type")) {
              setTimeout(function () {
                $word.parents(".cd-words-wrapper").addClass("waiting");
              }, 200);
            }
            if (!$bool) {
              setTimeout(function () {
                hideWord($word);
              }, animationDelay);
            }
          }
        }
  
        function takeNext($word) {
          return !$word.is(":last-child")
            ? $word.next()
            : $word.parent().children().eq(0);
        }
  
        function takePrev($word) {
          return !$word.is(":first-child")
            ? $word.prev()
            : $word.parent().children().last();
        }
  
        function switchWord($oldWord, $newWord) {
          $oldWord.removeClass("is-visible").addClass("is-hidden");
          $newWord.removeClass("is-hidden").addClass("is-visible");
        }
      },
      edrea_tm_about_popup() {
        var button = jQuery(
          ".edrea_tm_about .edrea_tm_button a, .popup-btn .edrea_tm_button a"
        );
        var close = jQuery(".edrea_tm_modalbox .close");
        var modalBox = jQuery(".edrea_tm_modalbox");
        var hiddenContent = jQuery(".edrea_tm_hidden_content").html();
  
        button.on("click", function () {
          modalBox.addClass("opened");
          modalBox.find(".description_wrap").html(hiddenContent);
          edrea.edrea_tm_data_images();
          edrea.edrea_tm_popup();
          edrea.edrea_tm_my_progress();
          edrea.edrea_tm_circular_progress();
          edrea.edrea_tm_mycarousel();
          edrea.edrea_tm_location();
        });
        close.on("click", function () {
          modalBox.removeClass("opened");
          modalBox.find(".description_wrap").html("");
        });
      },
      edrea_tm_my_progress() {
        jQuery(".progress_inner").each(function () {
          var progress = jQuery(this);
          var pValue = parseInt(progress.data("value"), 10);
          var pColor = progress.data("color");
          var pBarWrap = progress.find(".bar");
          var pBar = progress.find(".bar_in");
          pBar.css({ width: pValue + "%", backgroundColor: pColor });
          setTimeout(function () {
            pBarWrap.addClass("open");
          });
        });
      },
      edrea_tm_mycarousel() {
        var carousel = jQuery(".edrea_tm_modalbox .owl-carousel");
  
        carousel.owlCarousel({
          loop: true,
          items: 1,
          lazyLoad: false,
          margin: 0,
          autoplay: true,
          autoplayTimeout: 7000,
          dots: false,
          nav: false,
          navSpeed: false,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 1,
            },
          },
        });
      },
      edrea_tm_circular_progress() {
        var circVal = 110;
  
        var colorSchemes = jQuery(":root").css("--main-color");
  
        jQuery(".circular_progress_bar .myCircle").each(function () {
          var element = jQuery(this);
          element.append('<span class="number"></span>');
          var value = element.data("value");
          element
            .circleProgress({
              size: circVal,
              value: 0,
              animation: { duration: 1400 },
              thickness: 2,
              fill: colorSchemes,
              emptyFill: "rgba(0,0,0,0)",
              startAngle: -Math.PI / 2,
            })
            .on(
              "circle-animation-progress",
              function (event, progress, stepValue) {
                element
                  .find(".number")
                  .text(parseInt(stepValue.toFixed(2) * 100) + "%");
              }
            );
          element.circleProgress("value", 1.0);
          setTimeout(function () {
            element.circleProgress("value", value);
          }, 1400);
        });
      },
      edrea_tm_location() {
        var button = jQuery(".href_location");
        button.on("click", function () {
          var element = jQuery(this);
          var address = element.text();
          address = address.replace(/\ /g, "+");
          var text = "https://maps.google.com?q=";
          window.open(text + address);
          return false;
        });
      },
      edrea_tm_swiper() {
        $(".swiper-section").each(function () {
          var element = $(this);
          var container = element.find(".swiper-container");
          var mySwiper = new Swiper(container, {
            loop: false,
            slidesPerView: 1,
            spaceBetween: 0,
            loopAdditionalSlides: 1,
            autoplay: {
              delay: 6000,
            },
  
            navigation: {
              nextEl: ".my_next",
              prevEl: ".my_prev",
            },
  
            pagination: {
              el: ".edrea_tm_swiper_progress",
              type: "custom", // progressbar
              renderCustom: function (swiper, current, total) {
                // progress animation
                var scale, translateX;
                var progressDOM = container.find(".edrea_tm_swiper_progress");
                if (progressDOM.hasClass("fill")) {
                  translateX = "0px";
                  scale = parseInt((current / total) * 100) / 100;
                } else {
                  scale = parseInt((1 / total) * 100) / 100;
                  translateX =
                    ((current - 1) * parseInt((100 / total) * 100)) / 100 + "px";
                }
  
                progressDOM.find(".all span").css({
                  transform:
                    "translate3d(" +
                    translateX +
                    ",0px,0px) scaleX(" +
                    scale +
                    ") scaleY(1)",
                });
                if (current < 10) {
                  current = "0" + current;
                }
                if (total < 10) {
                  total = "0" + total;
                }
                progressDOM.find(".current").html(current);
                progressDOM.find(".total").html(total);
              },
            },
            breakpoints: {
              700: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            },
          });
        });
        edrea.edrea_tm_imgtosvg();
      },
      edrea_tm_portfolio_popup() {
        var modalBox = jQuery(".edrea_tm_modalbox");
        var button = jQuery(".edrea_tm_portfolio .portfolio_popup");
        var closePopup = modalBox.find(".close");
  
        button.off().on("click", function () {
          var element = jQuery(this);
          var parent = element.closest(".list_inner");
          var content = parent.find(".edrea_tm_hidden_content").html();
          var image = parent.find(".image .main").data("img-url");
          var title = parent.find(".details h3").text();
          var category = parent.find(".details span").text();
          modalBox.addClass("opened");
          modalBox.find(".description_wrap").html(content);
  
          modalBox
            .find(".portfolio_popup_details .top_image")
            .after(
              '<div class="portfolio_main_title"><h3>' +
                title +
                '</h3><span><a href="#">' +
                category +
                "</a></span><div>"
            );
          edrea.edrea_tm_data_images();
          edrea.edrea_tm_popup();
          return false;
        });
        closePopup.on("click", function () {
          modalBox.removeClass("opened");
          modalBox.find(".description_wrap").html("");
          return false;
        });
      },
      edrea_tm_modalbox() {
        jQuery(".edrea_tm_all_wrap").prepend(
          '<div class="edrea_tm_modalbox"><div class="box_inner"><div class="close"><a href="#"><i class="icon-cancel"></i></a></div><div class="description_wrap"></div></div></div>'
        );
      },
      edrea_tm_popup() {
        jQuery(".gallery_zoom").each(function () {
          // the containers for all your galleries
          jQuery(this).magnificPopup({
            delegate: "a.zoom", // the selector for gallery item
            type: "image",
            gallery: {
              enabled: true,
            },
            removalDelay: 300,
            mainClass: "mfp-fade",
          });
        });
        jQuery(".popup-youtube, .popup-vimeo").each(function () {
          // the containers for all your galleries
          jQuery(this).magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
          });
        });
  
        jQuery(".soundcloude_link").magnificPopup({
          type: "image",
          gallery: {
            enabled: true,
          },
        });
      },
    };
  
    $(document).ready(function () {
      $("select").niceSelect();
      edrea.init();
    }),
      $(window).on("load", function () {
        edrea.preloader();
      });
  })(jQuery);