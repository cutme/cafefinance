import Swiper, { Grid, FreeMode, Lazy, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/lazy/lazy.scss';
import 'swiper/modules/mousewheel/mousewheel.scss';

document.addEventListener('DOMContentLoaded',function() {
    
    const products = document.getElementsByClassName('js-products')[0],
          reviews = document.getElementsByClassName('js-reviews')[0];

    const productsCarousel = function() {
        const swiper = new Swiper(products, {
            modules: [FreeMode, Lazy, Navigation, Pagination],
            centeredSlides: true,
            freeMode: true,
            lazy: true,
            loop: true,
            navigation: {
                nextEl: products.querySelector('.swiper-button-next'),
                prevEl: products.querySelector('.swiper-button-prev'),
            },
            preloadImages: false,
            spaceBetween: 20,
            slidesPerView: 'auto',
            speed: 400,
            pagination: {
                el: products.querySelector('.swiper-pagination'),
                    clickable: true,
                    dynamicBullets: true
            },
            watchSlidesProgress: true
        });
    }
    
    const reviewsCarousel = function() {
        const swiper = new Swiper(reviews, {
    	    slidesPerView: 2,
        });
    }

    window.carousels = function() {
        products ? productsCarousel() : false;
       // reviews ? productsCarousel() : false;
    }

}, false)
