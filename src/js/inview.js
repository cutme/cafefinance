document.addEventListener('DOMContentLoaded', ()=> {

    const anim = document.querySelectorAll(".anim");

    const options = {
        root: null,
        threshold: 0
    }

    const observer = new IntersectionObserver((entries, observer)=> {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("anim--visible");
                observer.unobserve(entry.target);
            } else {
                return;
            }
        });
    }, options);
    
    anim.forEach(card => observer.observe(card));

}, false);
