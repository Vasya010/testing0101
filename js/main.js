'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // Бар загрузки страниц
    (function() {
      var simplebar = new Nanobar();
          simplebar.go(100);
    })();

    // Главный Слайдер
    var slider = tns({
        container: '.main-slider__list',
        edgePadding: 1,
        controlsContainer: '.main-slider__controls',
        nav: true,
        autoplayHoverPause: true,
        autoplay: true,
        lazyload: true,
        mouseDrag: true,
        touch: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 8000,
        speed: 600
    });

    // AJAX модалка
    $(document).on('click', '.open-fancy', function (e) {
        e.preventDefault();
        var link = $(this).attr('href');
        $.fancybox.open({
            src: link,
            type: 'ajax',
            opts: {
                buttons: false,
            }
        });
    });

    // jQuery - Мобильное меню
    var mobileMenu = (function() {
        var $trigger = $('.menu-mobile__arrow');
        var animationSpeed = 200;

        // Mobile menu
        $trigger.on('click', function() {
            toggleMenu($(this));
        });

        function toggleMenu(el) {
            var li = el.closest('li');
            el.toggleClass('is-active');
            li.children('ul').slideToggle(animationSpeed, function() {});
        }
    })();


    // Прокрутка к главной части
    (function() {
        var anchorSelector = '[data-anchor-target]';

        init();

        function init() {
            setEvents();
        }

        function setEvents() {
            document.addEventListener('click', anchorClickHandler);
        }

        function anchorClickHandler(e) {
            var $tg = e.target;
            if ($tg.matches(anchorSelector)) {
                e.preventDefault();

                scrollToTarget(getTargetValue($tg));
            }
        }

        function scrollToTarget(coord) {
            window.scrollTo({
                top: coord,
                behavior: 'smooth'
            });
        }

        function getTargetValue($tg) {
            var href = $tg.getAttribute('data-anchor-target');

            if (!isNaN(parseInt(href))) {
                // Работаем как с числом
                return href;
            } else {
                // Работаем как со строкой числом
                var $coordElement = document.querySelector('[data-anchor-name="' + href + '"]');

                if ($coordElement) {
                    // Высчитываем позицию элемента от начала страницы
                    return getCoords($coordElement).top;
                } else {
                    console.error('Error: Scroll target element is not defined');
                }
            }
        }

        function getCoords($el) {
            var box = $el.getBoundingClientRect();

            return {
                top: box.top + window.pageYOffset,
                left: box.left + window.pageXOffset
            };
        }
    })();

    // Мобильное меню
    (function() {

        var $mobileOpen = document.querySelector('.js-open-mobile');
        var $mobileClose = document.querySelector('.js-close-mobile');

        var $mobileBg = document.querySelector('.js-mobile')
        var $mobileOverlay = document.querySelector('.mobile__overlay');
        var $mobilePanel = document.querySelector('.mobile__panel');

        $mobileOpen.addEventListener('click', panelOpen);
        $mobileClose.addEventListener('click', panelClose);
        function panelOpen() {
            $mobileOverlay.style.visibility = 'visible';
            $mobilePanel.style.right = '0';
            $mobilePanel.style.opacity = '1';
            this.style.opacity = '0';
            document.body.style.overflow = 'hidden';
        }

        function panelClose() {
            $mobileOverlay.style.visibility = 'hidden';
            $mobilePanel.style.right = '-100%';
            $mobilePanel.style.opacity = '0';
            $mobileOpen.style.opacity = '1';
            document.body.style.overflow = '';
        }
    }())


});
function captchaReload() {
    this.parentNode.querySelector('img').src = '/captcha/flat?' + Math.random();
}
