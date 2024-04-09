import { TweenLite, ScrollToPlugin } from "gsap/all";
const scrollPlugin = ScrollToPlugin;
import customSelect from 'custom-select';
//import ScrollToPlugin from 'gsap/ScrollToPlugin';
 
(function(window, document, cutme, undefined) {
    
/*
    const debounce = function(func, time){
        var time = time || 100; // 100 by default if no param
        var timer;
        return function(event){
            if(timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }
    
    window.addEventListener("resize", debounce( () => swiper.update(), 150 ));
*/

    const Helpers = function() {
        return {
	        debounce: debounce,
	        detach: detach,
        	isInView: isInView,
        	scrollTo: scrollTo,
        	thisIndex: thisIndex
        };
    };
    
    const debounce = (func, wait, immediate) => {
	    var timeout;
	    return () => {
	        const context = this, args = arguments;
	        const later = function() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        const callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};
    
	const detach = function(node, target) {
		let parent = node.parentNode;
		let next = node.nextSibling;
	
		if (!parent) { return; }
		
		parent.removeChild(node);	// Detach node from DOM.		
		target.append(node, next);	// Append
	};
    
    const isInView = function(el) {
        let bottomOfWindow = (window.pageYOffset || window.scrollY) + window.innerHeight;
        
        if ( el.getBoundingClientRect().top + (window.pageYOffset || window.scrollY) < bottomOfWindow ) {
            return true;
        }
    };
    
    const scrollTo = function (target, speed, offset) {    
		TweenLite.to(window, speed, {
			scrollTo: {
				y: target - offset,
				autoKill: false
			},
			ease: Power1.easeOut
		});
	};
	
	const thisIndex = function(elm) {
        let nodes = elm.parentNode.childNodes, node, i = 0, count = 0;
    
        while( (node = nodes.item(i++)) && node != elm ) {
            if( node.nodeType == 1 ) count++;            
        }
    
        return count;
    };

    cutme.Helpers = new Helpers();
    
    
    // Select
    
    (function() {
        
        const select = document.getElementsByTagName('select');
    
        const init = function() {
    
            const cstSel = customSelect(select);
            
            for (let i = 0; i < select.length; i ++) {
                cstSel[i].container.addEventListener('custom-select:open', (e) => { 
                    e.target.style.position = 'relative';
                    e.target.style.zIndex = '5';
                });
                
                cstSel[i].container.addEventListener('custom-select:close', (e) => { 
                    e.target.removeAttribute('style');
                });
            }
        };
                
        select ? init() : false;
        
    })();
    

}(window, document, window.cutme = window.cutme  || {}));