document.addEventListener('DOMContentLoaded', ()=> {
    
    const el = document.querySelectorAll('.js-cooperatewithus');
    
    const init = ()=> {
        
        for (let i = 0; i < el.length; i++) {
            const observerElements = el[i].querySelectorAll('dl');
            const observerOptions = {
                root: null,
                rootMargin: '-49% 10px',
                threshold: 0
            };
            
            const Observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio > 0) {
                            for (let j = 0; j < observerElements.length; j++) {
                                observerElements[j].classList.remove('is-active');
                            }
                            entry.target.classList.add('is-active');
                        }
                    });
                }, 
                observerOptions
            );
    
            observerElements.forEach(el => {
                Observer.observe(el);
            });
        }
    };
    
    el.length > 0 ? init() : false;
    
}, false);