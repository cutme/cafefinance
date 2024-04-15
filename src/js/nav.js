import { gsap, Power1 } from "gsap";
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

document.addEventListener('DOMContentLoaded', () => {

    const nav = document.getElementsByClassName('js-nav')[0],
          hamburger = document.getElementsByClassName('js-hamburger')[0],
          menu = document.getElementsByClassName('js-menu')[0];

    const init = function() {

        window.hideMenu = function() {
            document.querySelector('.js-nav').classList.remove('is-visible');
            document.querySelector('.js-hamburger').classList.remove('is-active');
            
            document.removeEventListener('click', clickOutside);
            document.documentElement.classList.remove('menu-opened');
            
            setTimeout(function() {
                document.querySelector('.js-nav').classList.remove('is-block');
                document.querySelector('.js-nav').classList.remove('is-animated');
            }, 400);
            
            enableBodyScroll(document.getElementsByClassName('js-menu')[0]);
        };

        const showMenu = () => {
            nav.classList.add('is-block');
            hamburger.classList.add('is-active', 'is-disabled');
            document.documentElement.classList.add('menu-opened');

            setTimeout(function() {
                nav.classList.add('is-visible');
                document.addEventListener('click', clickOutside);
                showLinks();
            }, 10);
            
            const showLinks = function() {
                const blocks = menu.querySelectorAll("li");
                const tl = gsap.timeline().delay(.1).eventCallback("onComplete", () => {
                          nav.classList.add('is-animated');
                          hamburger.classList.remove('is-disabled');
                      })

                .from(blocks, {
                    x: 50,
                    opacity: 0,
                    stagger: {
                        each: 0.1
                    }
                });                
            };

            disableBodyScroll(menu);
        };

        const toggleMenu = function(e) {
            nav.classList.contains('is-visible') ? hideMenu() : showMenu();
        };

        
        hamburger.addEventListener('click', toggleMenu);
        
        const clickOutside = function(e) {
            if (!e.target.closest('.js-nav')) {
                hideMenu();
        	}
        };
        


        // Hide menu on ESC

        document.addEventListener('keydown', function(evt) {
            // evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                hideMenu();
            }
        });
        
        
        const checkWindowSize = function() {
            if (window.innerWidth > 1200) {
                hideMenu();
                window.removeEventListener('resize', checkWindowSize);
            }
        };
        
        window.addEventListener('resize', checkWindowSize);
    };

    nav ? init() : false;

}, false);