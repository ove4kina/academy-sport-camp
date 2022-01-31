<template lang="pug">
    include ../../../../tools/mixins.pug

    +b#main-section.MAIN.main(
        ref="main"
            :class="{'first-to-last': sliderInformation.activeSlide - 1 === 0 && windowWidth.desktop, 'last-to-first': sliderInformation.activeSlide - 1 === sliderInformation.slidesCount - 1 && windowWidth.desktop}"
    )
        +e.canvas(
            :class="{'show-canvas': initCanvas}"
        )
            vue-displacement-slideshow(
                :images="sliderDisplacement.images"
                displacement="/public/media/images/dis.jpg"
                :intensity="0.2"
                :speedIn="1"
                :speedOut="1"
                ease="Expo.easeInOut"
                ref="slideshow"
                v-if="sliderDisplacement.mounted"
                @loaded="initCanvas = true"
            )
        +e.notify
            p Скрольте вниз, чтобы узнать больше об Academy Sport Camp
        +e.container--navigation.container
            +e.navigation(:class="{'show-canvas': initCanvas}")
                +e.button--navigation.button--navigation.--prev(v-on:click="slideMoveTo('prev')")
                p {{sliderInformation.activeSlide}} / {{sliderInformation.slidesCount}}
                +e.button--navigation.button--navigation.--next(v-on:click="slideMoveTo('next')")
        +e.slider.swiper-container.slider__(
            v-swiper:mySwiper="swiper" ref="swiper"
        )
            +e.wrapper.swiper-wrapper
                +e.item.swiper-slide(
                    v-for="(item,index) in titleText"
                    ref="slides"
                )
                    +e.wrap
                        +e.content
                            +e.container.container
                                +e.H1.title(
                                    ref="titles"
                                    v-html="splitSpan(item)"
                                )
                                        <!--+e.DIV.stroke-wrapper(-->
                                            <!--v-html="splitSpan(item)"-->
                                            <!--ref="strokeWrapper"-->
                                            <!--)-->
                                +e.buttons
                                    +e.A.button--more.button--skew.--yellow(
                                        href="#"
                                        data-text="Узнать больше"
                                    )
                                        span Узнать больше
            +e.pagination
                +e.bullet.bullet(
                    v-for="(bullet,index) in sliderInformation.slidesCount"
                    :class="{'active': index === sliderInformation.activeSlide - 1}"
                    v-on:click="changeSlide(index)"
                )
</template>

<script>
    import { TweenLite } from 'gsap'
    import VueDisplacementSlideshow from "vue-displacement-slideshow";


    import {scrollTo} from "../../../../mixins/frontEnd/scrollTo";
    import {loadVideo} from "../../../../mixins/frontEnd/loadVideo";

    export default {
        mixins: [scrollTo,loadVideo],
        data() {
            return {
                initCanvas: false,
                windowWidth:{
                    desktop: false
                },
                sliderInformation: {
                    activeSlide: 1,
                    slidesCount: 3
                },
                swiper: {
                    freeMode: false,
                    slidesPerView: 'auto',
                    allowTouchMove: false,
                    loop: false,
                    effect: 'fade',
                    //loop: true,
                    fadeEffect: {
                        crossFade: true
                    },
                    speed: 1000,
                    preventInteractionOnTransition: true,
                    preloadImages: true,
//                    navigation: {
//                        nextEl: '.button--next',
//                        prevEl: '.button--prev',
//                    },
                    breakpoints: {
                      1199: {
                          loop: true,
                          allowTouchMove: true
                      }
                    },
                    on: {
                        slideChange: () => {
                            if(window.innerWidth >= 1200){
                                if(this.mySwiper.activeIndex === 0 || this.mySwiper.activeIndex === this.mySwiper.slides.length - 1){
                                    this.animation.slideLoopClass = true;
                                } else {
                                    this.animation.slideLoopClass = false;
                                }
                                setTimeout(()=>{
                                    this.sliderInformation.activeSlide = this.mySwiper.activeIndex + 1;
                                    this.$refs.slideshow.goTo(this.mySwiper.activeIndex);
                                })
                            } else {
                                if(this.inited){
                                    let index = this.mySwiper.realIndex;
                                    if(this.sliderInformation.activeSlide - 1 !== index){
                                        this.sliderInformation.activeSlide = index + 1;
                                        this.$refs.slideshow.goTo(index);
                                    }
                                }
                            }
                        },
                        init: () => {
                            this.inited = true;
                            setTimeout(() => {
                                let buttonsOrder = document.querySelectorAll('.slider__button--order');
                                let buttonsMore = document.querySelectorAll('.slider__button--more');

                                for (let button of buttonsOrder) {
                                    button.addEventListener('click', (e)=>{
                                        e.stopPropagation();
                                        this.scrollTo(document.getElementById('about'),1000)
                                    })
                                }

                                for (let button of buttonsMore) {
                                    button.addEventListener('click', (e)=>{
                                        e.stopPropagation();
                                        this.scrollTo(document.getElementById('about'),1000,'easeInOutCubic', 100)
                                    })
                                }
                                if(window.innerWidth >=1200){
                                    this.sliderInformation.slidesCount = this.mySwiper.slides.length;
                                } else {
                                    this.sliderInformation.slidesCount = this.mySwiper.slides.length - 2;
                                }

                            })
                        },

                    }
                },
                titleText: ['Тренировочный лагерь полного цикла в Паттайе','Естественный детокс и релаксация','Лучшие спортсмены со всего мира в одном месте'],
                // titleText: ['Лучшие спортсмены со всего мира в одном месте'],
                offsetLeft: null,
                animation: {
                    slideLoopClass: false,
                    hide: null,
                    next: null,
                    priv: null,
                    start: false,
                    gsap: [],
                },
                inited: false,
                sliderTimeout: null,
                sliderDisplacement: {
                    images: [],
                    mounted: false,
                    ready: false,
                    source: {
                        mobile: ['/public/media/images/main/1/mobile.jpg','/public/media/images/main/2/mobile.jpg','/public/media/images/main/3/mobile.jpg'],
                        tablet: ['/public/media/images/main/1/tablet.jpg','/public/media/images/main/2/tablet.jpg','/public/media/images/main/3/tablet.jpg'],
                        desktop: ['/public/media/images/main/1/desktop.jpg','/public/media/images/main/2/desktop.jpg','/public/media/images/main/3/desktop.jpg'],
                    }
                }
            };
        },
        methods: {
            slideMoveTo(direction){
                if(window.innerWidth >= 1200){
                    if(direction === 'prev'){
                        if(this.mySwiper.activeIndex === 0){
                            this.mySwiper.slideTo(this.mySwiper.slides.length - 1);
                        } else {
                            this.mySwiper.slidePrev();
                        }
                    } else {
                        if(this.mySwiper.activeIndex === this.mySwiper.slides.length - 1){
                            this.mySwiper.slideTo(0);
                        } else {
                            this.mySwiper.slideNext();
                        }
                    }
                }
            },
            splitSpan(text) {
                let arr = text.split(' '),
                    strokeArr = [],
                    titleArr=[],
                    count = 0,
                    currentIndex = 0,
                    maxStrokeLength = 18;

                if(typeof window !== 'undefined'){
                    if(window.innerWidth < 400 || (window.innerWidth >= 650 && window.innerWidth < 768)){
                        maxStrokeLength = 14
                    }
                }
                arr.map((item,index) => {
                    if (item.length + count <= maxStrokeLength) {
                        if (typeof strokeArr[currentIndex] !== 'undefined') {
                            strokeArr[currentIndex] += ' ' + item;
                        } else {
                            strokeArr[currentIndex] = item;

                        }
                        count += item.length + 1;

                        if (index === arr.length - 1) {
                            titleArr[currentIndex] = `<p>${strokeArr[currentIndex]}</p>`;
                            strokeArr[currentIndex] = `<span class="stroke">${strokeArr[currentIndex]}</span>`;
                            //
                            // if(text.indexOf('детокс') !== -1){
                            //     console.log(strokeArr)
                            // }
                        }


                        // if(text.indexOf('детокс') !== -1){
                        //     console.log(index)
                        // }


                    } else {
                        titleArr[currentIndex] = `<p>${strokeArr[currentIndex]}</p>`;
                        strokeArr[currentIndex] = `<span class="stroke">${strokeArr[currentIndex]}</span>`;

                        let checkStroke = titleArr[currentIndex].replace('<p>','').replace('</p>','');
                        count = 0;
                        currentIndex++;

                        //Перенос висячего предлога "в"
                        if (checkStroke[checkStroke.length - 1] === 'в' && checkStroke[checkStroke.length - 2] === ' '){
                            titleArr[currentIndex - 1] = titleArr[currentIndex - 1].substring(0,titleArr[currentIndex - 1].length - 5) + '</p>'
                            strokeArr[currentIndex - 1] = strokeArr[currentIndex - 1].substring(0,strokeArr[currentIndex - 1].length - 8) + '</span>'
                            strokeArr[currentIndex] = 'в ' + item;
                        } else {
                            strokeArr[currentIndex] = item;
                        }


                        count = item.length;

                        if (index === arr.length - 1) {
                            titleArr[currentIndex] = `<p>${strokeArr[currentIndex]}</p>`;
                            strokeArr[currentIndex] = `<span class="stroke">${strokeArr[currentIndex]}</span>`;
                        }


                    }

                });

                titleArr = `${titleArr.join('')}<div class="slider__stroke-wrapper">${strokeArr.join('')}</div>`



                return titleArr;
            },
            getStyle(el, styleProp) {
                let value, defaultView = (el.ownerDocument || document).defaultView;
                // W3C standard way:
                if (defaultView && defaultView.getComputedStyle) {
                    // sanitize property name to css notation
                    // (hypen separated words eg. font-Size)
                    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
                } else if (el.currentStyle) { // IE
                    // sanitize property name to camelCase
                    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                        return letter.toUpperCase();
                    });
                    value = el.currentStyle[styleProp];
                    // convert other units to pixels on IE
                    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                        return (function(value) {
                            var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                            el.runtimeStyle.left = el.currentStyle.left;
                            el.style.left = value || 0;
                            value = el.style.pixelLeft + "px";
                            el.style.left = oldLeft;
                            el.runtimeStyle.left = oldRsLeft;
                            return value;
                        })(value);
                    }
                    return value;
                }
            },
            clearLoading(index){
                let spans = this.mySwiper.slides[index].querySelectorAll('.stroke');


                TweenLite.set(spans,{clearProps: "width"});

                // for (let i = 0; i < spans.length; i++) {
                //
                // }
            },
            loading(index) {
                let time = 1.5,
                    spans = this.mySwiper.slides[index].querySelectorAll('.stroke');

                for (let i = 0; i < spans.length; i++) {

                    this.animation.gsap[i] = TweenLite.to(
                        spans[i],
                        time,
                        {
                            css: {
                                width: spans[i].scrollWidth + 'px'
                            },
                            delay: i*0.15,ease: Power4.easeOut,

                        }
                    );
                }
            },
            openPopup(){
                let content = this.mySwiper.slides[this.mySwiper.activeIndex].querySelector('.slider__title').querySelectorAll('p');
                let target = '';
                for (let i = 0; i < content.length; i++) {
                    target += content[i].innerHTML;
                    if(i !== content.length - 1 && target[target.length - 1] !== ' '){
                        target += ' ';
                    }
                }
                this.$emit('openPopup',target)
            },
            changeSlide(index) {
                this.mySwiper.slideToLoop(index,500,false);
            },
            onSliderReady(){
                this.$emit('sliderReady');
            },
            initSlider(){
                if(window.innerWidth < 650){
                    this.sliderDisplacement.images = this.sliderDisplacement.source.mobile
                } else if(window.innerWidth < 1200){
                    this.sliderDisplacement.images = this.sliderDisplacement.source.tablet
                } else if(window.innerWidth >= 1200){
                    this.sliderDisplacement.images = this.sliderDisplacement.source.desktop
                }
                this.sliderDisplacement.mounted = true;

            }
        },
        mounted(){
            if(window.innerWidth < 1200){
                this.windowWidth.desktop = false;
            } else {
                this.windowWidth.desktop = true;
            }

            this.initSlider();
            this.onSliderReady();
        },
        components: {
            VueDisplacementSlideshow,
        },

        destroyed(){
            let buttonsOrder = document.querySelectorAll('.slider__button--order');
            let buttonsMore = document.querySelectorAll('.slider__button--more');

            for (let button of buttonsOrder) {
                button.removeEventListener('click', (e)=>{
                    e.stopPropagation();
                    this.scrollTo(document.getElementById('about'),1000)
                })
            }

            for (let button of buttonsMore) {
                button.removeEventListener('click', (e)=>{
                    e.stopPropagation();
                    this.scrollTo(document.getElementById('prices'),1000)
                })
            }
        }
    };
</script>