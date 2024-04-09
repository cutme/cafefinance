document.addEventListener('DOMContentLoaded', function() {
    
    const el = document.getElementsByClassName('js-topbar')[0],
          hero = document.getElementsByClassName('js-hero')[0];
    
    let narrow = false;
    
    const action = function() {
        let scroll_pos = window.pageYOffset || window.scrollY,
            ww = window.innerWidth;

        if (scroll_pos > 0) {
            if (narrow === false) {
	            el.classList.add('is-narrow');
	            hero ? hero.classList.add('is-narrow') : false;
	            narrow = !narrow;
            }
        } else {
            el.classList.remove('is-narrow');
            hero ? hero.classList.remove('is-narrow') : false;
	        narrow = !narrow;
        }       
    }

    action();
    el ? window.addEventListener('scroll', action) : false;

}, false);
