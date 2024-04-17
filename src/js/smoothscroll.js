import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

document.addEventListener('DOMContentLoaded', ()=> {
    
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

    if (gtt.length > 0) {
        const action = function(e) {
        	e.preventDefault() ? e.preventDefault() : e.preventDefault = false;  
            let target = e.currentTarget.dataset.target,
                offset = e.currentTarget.dataset.offset;            

            //let url = location.protocol + "//" + document.domain + "/" + location.pathname.split('/')[1];          
            document.querySelector(target) ? window.runScroll(target, offset) : window.open(e.currentTarget.href + target, '_self');
            document.documentElement.classList.contains('menu-opened') ? window.hideMenu() : false;
        };

        for (let i = 0; i < gtt.length; i++) {
            gtt[i].addEventListener('click', action);
        }
    }
    
}, false);
