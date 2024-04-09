const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

document.addEventListener('DOMContentLoaded',function() {

    const el = document.getElementsByClassName('js-nav')[0],
          nav = document.getElementsByClassName('js-children'),
          menu = document.getElementsByClassName('js-menu')[0],
          hamburger = document.getElementsByClassName('js-hamburger')[0],
          parent = el.getElementsByTagName('li');

    const init = function() {

        let ww = 0;
        
/*
        const searchform = document.getElementById('searchform'),
        	  searchform__content = document.getElementById('searchform__content');
*/

        const checkWindowWidth = function() {
            ww = window.innerWidth;

            if (ww > 1024) {

                hideMenu();
            }
        }
        
        const hideMenu = function() {

            enableBodyScroll(el);
            el.classList.remove('is-visible');
            hamburger.classList.remove('is-active');

            for (let i = 0; i < nav.length; i ++) {
                nav[i].classList.remove('is-active');
            }
            
            //cutme.Helpers.detach(searchform__content, searchform);
            //searchform__content.classList.remove('is-visible');
            
            let parent = el.getElementsByClassName('menu-item-has-children');
            
            for (let i = 0; i < parent.length; i ++) {
                parent[i].classList.remove('is-active');
            }
        };

        const showMenu = function(e) {
        
            if (e.currentTarget.classList.contains('is-active')) {
            
                hideMenu();            
            
            } else {
            
                disableBodyScroll(el);
                el.classList.add('is-visible');
                hamburger.classList.add('is-active');
                
                //cutme.Helpers.detach(searchform__content, el);
                
               /*
 setTimeout(function() {
	                searchform__content.classList.add('is-visible');
                }, 100);
*/
            }
        };

        

        window.addEventListener('resize', checkWindowWidth);

        checkWindowWidth();

        hamburger.addEventListener('click', showMenu);


        const parent = menu.getElementsByTagName('li');

        const submenu = function(e) {
        
            if (ww <= 1024) {
                let item = e.currentTarget;
               
                e.stopPropagation();
                
                if (item.classList.contains('menu-item-has-children')) {
                    if (item.classList.contains('is-active')) {
                        item.classList.remove('is-active');
                    } else {
                        item.classList.add('is-active');
                    }
                } else {
                    let url = item.getElementsByTagName('a')[0].getAttribute('href');
                    window.open(url, '_self');
                    hideMenu();
                }

                e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
            }
        }


        for (let j = 0; j < parent.length; j++) {
            parent[j].addEventListener('click', submenu);
        }


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

    };

    el ? init() : false;

}, false);