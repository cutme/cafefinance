import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

document.addEventListener('DOMContentLoaded',function() {
    
    window.runScroll = function(el, o) {
        
        let offsetTop = document.querySelector(el).offsetTop;
        let topbar_height = document.getElementsByClassName('js-topbar')[0].clientHeight;

        o === undefined ? o = 0 : false;

        scroll({
            top: offsetTop-topbar_height - o,
            behavior: "smooth"
        })
    };

    const gtt = document.querySelectorAll("[data-target]");
    const privacyindex = document.getElementsByClassName('js-privacyindex')[0];

    if (gtt.length > 0) {
        const action = function(e) {
        	e.preventDefault() ? e.preventDefault() : e.preventDefault = false;  
            let target = e.currentTarget.dataset.target,
                offset = e.currentTarget.dataset.offset;            

            let url = location.protocol + "//" + document.domain + "/" + location.pathname.split('/')[1];
          
            document.getElementById(target.slice(1, target.length)) ? window.runScroll(target, offset) :
                window.open(url + target, '_self');

            if (privacyindex) {
                let i =0,
                    active = privacyindex.getElementsByClassName('is-active')[0];

                active ? active.classList.remove('is-active') : false;
                e.currentTarget.classList.add('is-active');    
            }
        };

        for (let i = 0; i < gtt.length; i++) {
            gtt[i].addEventListener('click', action);
        }
    }
    
}, false);
