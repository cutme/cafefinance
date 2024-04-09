document.addEventListener('DOMContentLoaded', () => {

    const cover = document.getElementById('cover');
    
    const init = () => {
        document.documentElement.removeAttribute('style');
        document.documentElement.classList.add('is-loaded');
        
        setTimeout(() => {
            //window.carousels();
            cover.remove();
        }, 250);  
    };
    
    window.addEventListener('load', init);

}, false);