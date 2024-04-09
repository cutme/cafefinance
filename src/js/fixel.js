import stickybits from 'stickybits';

document.addEventListener('DOMContentLoaded',function() {

    const el = document.getElementsByClassName('js-sticky');

    const init = function() {
    
        for (let i = 0; i < el.length; i ++) {
                            
            let stickybit = stickybits(el[i], {
	            stickyBitStickyOffset: 140
            });
        }
    };

    window.addEventListener('load', function() {
        el.length > 0 ? init() : false;
    })
    

}, false);
