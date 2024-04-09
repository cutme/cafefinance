const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

document.addEventListener('DOMContentLoaded',function() {

    const nav = document.getElementsByClassName('js-nav')[0];

    const init = function() {
        
        const menu = document.getElementsByClassName('js-menu')[0],          
              hamburger = document.getElementsByClassName('js-hamburger')[0];
        
        window.hideMenu = function() {
            nav.classList.remove('is-visible');
            hamburger.classList.remove('is-active');
            
            document.removeEventListener('click', clickOutside);
            
            setTimeout(function() {
                nav.classList.remove('is-block');
                nav.classList.remove('is-animated');
            }, 400);
            
            if (window.innerWidth <= 640) {
                enableBodyScroll(nav);
            }
        };

        const showMenu = function() {
            
            nav.classList.add('is-block');
            hamburger.classList.add('is-active');

            setTimeout(function() {
                nav.classList.add('is-visible');
                document.addEventListener('click', clickOutside);
            }, 100);
            
            setTimeout(function() {
                nav.classList.add('is-animated');
            }, 400);

            if (window.innerWidth <= 640) {
                disableBodyScroll(nav);
            }
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
        
        const checkWindowSize = function() {
            
            if (window.innerWidth > 1100) {
                hideMenu();
                window.removeEventListener('resize', checkWindowSize);
            }
        };
        
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
        
        window.addEventListener('resize', checkWindowSize);
        

        const links = menu.getElementsByTagName('a');
        
        const action = function(e) {
            
            e.preventDefault() ? e.preventDefault() : e.preventDefault = false;

            const target = e.currentTarget.getAttribute('href');
            
            if ( document.getElementById( target.slice(1, target.length) ) ) {
                window.runScroll(target);
            } else {
                window.open(window.location.origin + target, '_self');
            }

            hideMenu();         
        };
        
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', action);
        }
    };

    nav ? init() : false;

}, false);