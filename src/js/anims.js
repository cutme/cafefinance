import { gsap, Elastic, Power1 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    window.animsInit = function() {
        const hero = document.querySelector('.c-hero--home');
        
        if (hero) {         
            let tl = gsap.timeline({ repeat: -1, yoyoEase: "elastic.out(1, .8)", repeatDelay: 2 }).delay(1);
            
            tl      
            .to(hero.querySelector('.o-lead--01'), {
                duration: .5,
                autoAlpha: 0,
                display: 'none',
                yoyoEase: true
            })
            
            .to(hero.querySelector('.o-lead--02'), {
                duration: .5,
                autoAlpha: 1,
                display: 'block',
                yoyoEase: true
            })
            
            .to(hero.querySelector('.o-pill--yellow-orange.left'), {
                left: '100%',
                duration: 1,
                autoAlpha: 0,
                width: 500,
                yoyoEase: true
            }, '-=1')
            
            .to(hero.querySelector('.o-pill--yellow-orange.right'), {
                x: -100,
                duration: 1,
                width: 500,
                ease: 'elastic.out(1, .8)',
                yoyoEase: true
            }, '-=1')
            
            .to(hero.querySelector('.o-pill--blue-orange'), {
                bottom: '100%',
                y: -24,
                duration: 1,
                autoAlpha: 1,
                height: 200,
                ease: 'elastic.out(1, .8)',
                yoyoEase: true
            }, '-=1')

            
            .to(hero.querySelector('.o-pill--green-blue'), {
                y: 100,
                duration: 1,
                height: 200,
                ease: 'elastic.out(1, .8)',
                yoyoEase: true
            }, '-=')
            
            
            
            
/*
            tl            
            .to(hero.querySelector('.o-lead--01'), {
                duration: .5,
                autoAlpha: 1,
            })
*/

/*
            .fromTo(
                hero.querySelector('.o-pill--yellow-orange.left'),
                {
                    autoAlpha: 0,
                    right: 0,
                }, {
                    autoAlpha: 1,
                    left: 0
                }
            )
*/
            
/*
            .to(hero.querySelector('.o-pill--yellow-orange.left'), {
                left: '3rem',
                duration: 2,
                autoAlpha: 1,
                width: 200,
                ease: 'elastic.out(1, .8)',
            }, '-=.5')
            
            .to(hero.querySelector('.o-pill--green-blue'), {
                duration: 2,
                autoAlpha: 1,
            }, '-=2.5')
*/



           
            
/*
            const cfrom = {
                //y: 20,
                scaleX: 2.2,
                scaleY: 2.2,
                autoAlpha: 0,
            }
            
            const cto = {
                autoAlpha: 1,
                stagger: { 
                from: "random", 
                    amount: 1
                },
                duration: 1,
                scaleX: 1,
                scaleY: 1,
                onStart: function(e) {
                    this._targets[0].parentNode.classList.add('glitch');
                },
                ease: 'elastic.out(1, .8)',
            }
*/
            
            
            
/*
            .to(document.querySelector('.o-dora--global .o-dora__hide'), {
                duration: 1.2,
                scale: 1.1,
                opacity: .8,
                ease: 'power1.out'
            }, '-=.6')
*/
            
                       
        }
        
        if (document.querySelectorAll('.panel').length > 0) {
            gsap.utils.toArray(".panel").forEach((panel, i) => {
              ScrollTrigger.create({
                trigger: panel,
                start: "top bottom-=2",
                end: () => "+=" + (window.innerHeight * 2 - 4),
              });
            });
        }
        
        if (document.querySelectorAll('.fade').length > 0) {
            gsap.utils.toArray(".fade > *").forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: '-50px bottom',
                        toggleActions: "play complete complete reset",
                    },
                    autoAlpha: 0, 
                    duration: 1,
                    y: 50,
                    
                });
            });
        }
        
        if (document.querySelector('.gs-scrollleft')) {
            gsap.to(".gs-scrollleft", {
                left: '3rem',
                ease: "none",
                scrollTrigger: {
                   trigger: ".gs-scrollleft",
                   scrub: 1.2,
                   start: 'top bottom',
                   end: 'center center',
                }, 
            });
        }
        
        if (document.querySelector('.gs-scrolldown')) {
            gsap.utils.toArray(".gs-scrolldown").forEach((section) => {
                gsap.to(section.querySelector('i'), {
                    bottom: 0,
                    ease: "none",
                    scrollTrigger: {
                       trigger: section,
                       scrub: 1.1,
                       start: 'top center',
                       end: 'bottom center',
                    }, 
                });
            })
        }
    };


}, false)
