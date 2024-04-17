import Swiper, { Navigation } from 'swiper';
import 'swiper/swiper.scss';

document.addEventListener('DOMContentLoaded', () => {
    
    const partners = document.querySelector('.js-partners');

    const partnersCarousel = function() {
        const swiper = new Swiper(partners, {
            modules: [Navigation],
            breakpoints: {
                641: {
                    slidesPerView: 2,
                },
                769: {
                    slidesPerView: 4,
                }
            },
            centeredSlidesBounds: true,
            navigation: {
                nextEl: '.c-partners__carousel .swiper-button-next',
                prevEl: '.c-partners__carousel .swiper-button-prev',
            },
            spaceBetween: 20,
            slidesPerView: 1,
            speed: 600,
        });
    }

    window.carousels = function() {
        partners ? partnersCarousel() : false;
    }

}, false)
