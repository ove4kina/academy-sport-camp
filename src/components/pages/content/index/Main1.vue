<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.MAIN.main(
        ref="main"
        :class="{'slider-inited': status.slider}"
    )
        <!--mdb-carousel(:interval="8000")-->
            <!--mdb-carousel-item( video src="public/media/video/1.mp4" alt="First slide" auto loop)-->
            <!--mdb-carousel-item( video src="public/media/video/2.mp4" alt="First slide" auto loop)-->
            <!--mdb-carousel-item( img src="public/media/images/main/1.jpg" alt="First slide")-->
        <!--+e#canvas.canvas(-->
            <!--ref="canvas"-->
        <!--)-->
        <!--+e#planes.planes(ref="planes")-->
            <!--img(src="/public/media/video/texture.jpg" data-sampler="displacement" crossorigin="anonymous")-->
            <!--video(src="public/media/video/1.mp4" data-sampler="firstTexture" crossorigin="anonymous")-->
            <!--video(src="public/media/video/2.mp4" data-sampler="secondTexture" crossorigin="anonymous")-->
            <!--img(src="public/media/images/main/1.jpg" data-sampler="thirdTexture" crossorigin="anonymous")-->
        +e.notify
            p Скрольте вниз, чтобы узнать больше об Academy Sport Camp
        +e.container.container
            +e.navigation
                +e.button--navigation.button--navigation.--prev
                p {{sliderInformation.activeSlide}} / {{sliderInformation.slidesCount}}
                +e.button--navigation.button--navigation.--next
        +e.slider.swiper-container.slider__(
            v-swiper:mySwiper="swiper" ref="swiper"
        )
            +e.wrapper.swiper-wrapper
                +e.item.swiper-slide(
                    v-for="(item,index) in titleText"
                    ref="slides"
                    :class="{'hide': animation.hide === index,'next': animation.next === index,'prev':  animation.prev === index }"
                )
                    +e.wrap
                        <!--+e.img-->
                            <!--video(-->
                                <!--loop,muted="muted"-->
                                <!--ref="video"-->
                                <!--v-if="index === 1 || index === 2"-->
                                <!--:style="{width: video.width, height: video.height}"-->
                            <!--)-->
                                <!--source(:data-src="`public/media/video/${index}.webm`")-->
                                <!--source(:data-src="`public/media/video/${index}.mp4`")-->
                            <!--img.swiper-lazy(:data-src="`public/media/images/main/${(index + 1)}.jpg`")-->
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
                                +e.buttons(:style="{transitionDelay: animation.delayButtons}")
                                    +e.A.button--more.button--skew.--yellow(href="#")
                                        span Узнать больше
                                    <!--+e.BUTTON(-->
                                        <!--type="button"-->
                                        <!--ref="sendButtons"-->
                                    <!--).button--order.button--skew.--transparent-->
                                        <!--span Оставить заявку-->
            +e.pagination.swiper-pagination
</template>

<script>
    import { TweenLite } from 'gsap'
    import {Curtains} from 'curtainsjs';

    // import { mdbCarousel, mdbCarouselItem, mdbCarouselCaption } from 'mdbvue';

    import {scrollTo} from "../../../../mixins/frontEnd/scrollTo";
    import {loadVideo} from "../../../../mixins/frontEnd/loadVideo";


    export default {
        mixins: [scrollTo,loadVideo],
        data() {
            return {
                swiper: {
                    freeMode: false,
                    slidesPerView: 'auto',
                    loop: true,
                    init: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type: 'bullets',
                        bulletClass: 'bullet',
                        bulletActiveClass: 'active',
                        currentClass: 'current'
                    },
                    navigation: {
                        nextEl: '.main__button--navigation.button--next',
                        prevEl: '.main__button--navigation.button--prev',
                    },
                    lazy: {
                        loadPrevNext: true
                    },
                    effect: 'fade',
                    speed: 1000,
                    preventInteractionOnTransition: true,
                    preloadImages: true,
                    on: {
                        slideChange: ()=>{

                            setTimeout(()=>{
                                this.sliderInformation.activeSlide = this.mySwiper.realIndex + 1;
                            })

                        },
                        init: () => {
                            setTimeout(() => {
                                let titles = this.$refs.titles;
                                for (let i = 0; i < titles.length; i++) {
                                    let p = titles[i].getElementsByTagName('p');
                                    this.mySwiper.slides[i].querySelector('.slider__buttons').style.transitionDelay = `${parseFloat(this.getStyle(p[p.length - 1],'transitionDelay')) + 0.05}s`;
                                }

                                let buttonsOrder = document.querySelectorAll('.slider__button--order');
                                let buttonsMore = document.querySelectorAll('.slider__button--more');

                                for (let button of buttonsOrder) {
                                    button.addEventListener('click', (e)=>{
                                        e.stopPropagation();
                                        this.openPopup();
                                    })
                                }

                                for (let button of buttonsMore) {
                                    button.addEventListener('click', (e)=>{
                                        e.stopPropagation();
                                        this.scrollTo(document.getElementById('prices'),1000)
                                    })
                                }
                                this.sliderInformation.slidesCount = this.mySwiper.slides.length - 2;
                            })
                        },
                        slideChangeTransitionStart: () => {
                            this.animation.gsap.map( (item) => {
                                item.pause();
                            });
                        },
                        slideChangeTransitionEnd:() => {
                            this.animation.hide = null;

                            this.animation.gsap.map( (item) => {
                                TweenLite.set(item.target,{clearProps: "width"})
                                item.kill();
                            });

                            this.animation.gsap = [];


                            let delay = 0;

                            if(!this.inited){
                                delay = 1000
                            }


                            setTimeout(() => {
                                this.loading(this.mySwiper.activeIndex);
                                this.inited = true
                            },delay)


                        },
                        slideNextTransitionStart: () => {
                            setTimeout(() => {
                                if (!this.animation.start) {
                                    this.animation.start = true;
//                                    this.animation.next = this.mySwiper.realIndex + 1;
                                } else {
                                    this.animation.next = null;
                                    this.animation.hide = this.mySwiper.activeIndex - 2;



                                    if (this.mySwiper.activeIndex >= this.titleText.length) {
//                                        this.animation.next = 0;

                                        if (this.mySwiper.activeIndex !== this.mySwiper.slides.length - 1) {
                                            this.mySwiper.slides[this.mySwiper.activeIndex + 1].classList.add('next');

                                        } else {
                                            this.mySwiper.slides[this.mySwiper.activeIndex].classList.remove('next');
                                            this.mySwiper.slides[this.titleText.length - 1].classList.remove('prev');
                                            this.animation.next = 1;
                                        }

                                    }
                                }
                                if(this.inited){
                                    this.changeWebGlSlide('next');
                                }

                            })



                        },
                        slidePrevTransitionStart: () => {

                            setTimeout(() => {

                                this.animation.hide = this.mySwiper.activeIndex;

                                setTimeout(() => {
                                    this.animation.hide = null;
                                }, 600)

                                if (this.mySwiper.activeIndex === 0) {
                                    this.mySwiper.slides[this.titleText.length - 1].classList.add('prev');
                                } else {
                                    this.mySwiper.slides[this.titleText.length - 1].classList.remove('prev');
                                    this.mySwiper.slides[this.mySwiper.activeIndex].classList.remove('next');
                                }

                                if(this.inited){
                                    this.changeWebGlSlide('prev');
                                }

                            })
                        }
                    }
                },
                sliderInformation: {
                    activeSlide: 1,
                    slidesCount: 3

                },
                titleText: ['Тренировочный лагерь полного цикла в Паттайе','Лучшие спортсмены со всего мира в одном месте','Естественный детокс и релаксация'],
                // titleText: ['Лучшие спортсмены со всего мира в одном месте'],
                offsetLeft: null,
                animation: {
                    hide: null,
                    next: null,
                    priv: null,
                    start: false,
                    gsap: [],
                    delayButtons: 0
                },
                status: {
                    slider: true
                },
                inited: false,
                sliderTimeout: null,
                video: {
                    width: '',
                    height: ''
                },
                webGL: {
                    canvas: null,
                    planeElements: null,
                    plane: null,
                    activeTexture: 0,
                    transitionTimer: 0,
                    timer: 0,
                    activeSlide: 0,
                    clicked: false,
                    inited: false,
                    params: {
                        vertexShaderID: "plane-vs",
                        fragmentShaderID: "plane-fs",
                        imageCover: true,
                        uniforms: {
                            transitionTimer: {
                                name: "uTransitionTimer",
                                type: "1f",
                                value: 0,
                            },
                            activeSlide: {
                                name: "uActiveSlide",
                                type: "1i",
                                value: 0
                            },
                            inited: {
                                name: "uSliderInited",
                                type: "1i",
                                value: 0
                            },
                            direction: {
                                name: "uSliderDirection",
                                type: "1i",
                                value: 0
                            }
                        },
                    }
                }
            };
        },
        methods: {
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
            loading(index) {
                let time = 1.5,
                    spans = this.mySwiper.slides[index].querySelectorAll('.stroke'),
                    step = null;

//                step = time / (spans.length-1);
//                 step = time;

                for (let i = 0; i < spans.length; i++) {

                    this.animation.gsap[i] = TweenLite.to(
                        spans[i],
                        time,
                        {css: {width: spans[i].scrollWidth + 'px'}, delay: i*0.15,ease: Power4.easeOut,
                        onComplete: () => {
                            clearTimeout(this.sliderTimeout)
                            this.sliderTimeout = setTimeout(() => {
                                if (i === spans.length - 1) {
                                    this.hide = index;
                                    this.mySwiper.slideNext();
                                    setTimeout(() => {
                                        TweenLite.set(spans,{clearProps: "width"})
                                    },1000)
                                }
                            },5000)
                        }}
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
            setVideoSize(){
                let videoWidth = this.$refs.video[0].clientWidth,
                    videoHeight = this.$refs.video[0].clientHeight,
                    sectionWidth = this.$refs.main.clientWidth,
                    sectionHeight = this.$refs.main.clientHeight,
                    videoRatio = 1920/900,
                    sectionRatio = sectionWidth/sectionHeight;



                if(videoRatio < sectionRatio){
                    this.video.width = sectionWidth + 'px';
                    this.video.height = parseInt(this.video.width,10)/videoRatio + 'px';
                } else {
                    this.video.height = sectionHeight + 'px';
                    this.video.width = parseInt(this.video.height,10)*videoRatio + 'px';
                }




            },
            changeWebGlSlide(direction){

                let directionCode = null;

                switch (direction){
                    case 'next': {
                        directionCode = 1;
                        break;
                    }
                    case 'prev': {
                        directionCode = 0;
                        break;
                    }
                }

                this.webGL.plane.uniforms.direction.value = parseInt(directionCode,10);




                if(direction === 'next'){
                    if(this.webGL.plane.uniforms.inited.value === 0) {

                        this.webGL.plane.uniforms.inited.value = parseInt(1,10)
                    } else if (this.webGL.plane.uniforms.activeSlide.value === 0) {
                        if(this.webGL.plane.uniforms.inited.value % 2 === 0) {
                            this.webGL.plane.uniforms.inited.value = 1
                        } else {
                            this.webGL.plane.uniforms.inited.value = 2
                        }
                    }
                    if(this.webGL.activeTexture === 2) {
                        this.webGL.plane.uniforms.activeSlide.value = 0;
                        this.webGL.activeTexture = 0;

                    }
                    else {
                        this.webGL.plane.uniforms.activeSlide.value++;
                        this.webGL.activeTexture++;
                    }
                } else if (direction === 'prev') {
                    if(this.webGL.plane.uniforms.inited.value === 0) {

                        this.webGL.plane.uniforms.inited.value = parseInt(1,10)
                    } else if (this.webGL.plane.uniforms.activeSlide.value === 2) {
                        if(this.webGL.plane.uniforms.inited.value % 2 === 0) {
                            this.webGL.plane.uniforms.inited.value = 1
                        } else {
                            this.webGL.plane.uniforms.inited.value = 2
                        }
                    }

                    if(this.webGL.activeTexture === 0) {
                        this.webGL.plane.uniforms.activeSlide.value = 2;
                        this.webGL.activeTexture = 2;

                    }
                    else {
                        this.webGL.plane.uniforms.activeSlide.value--;
                        this.webGL.activeTexture--;
                    }
                }

                this.webGL.clicked = !this.webGL.clicked;
            },
            initWebGL(){
                this.webGL.canvas = new Curtains("canvas");
                this.webGL.planeElements = this.$refs.planes;
                this.webGL.plane = this.webGL.canvas.addPlane(this.webGL.planeElements, this.webGL.params);
                this.webGL.params.uniforms.activeSlide.value = parseInt(this.webGL.params.uniforms.activeSlide.value,10)
                this.webGL.plane && this.webGL.plane.onReady(() => {
                    this.webGL.plane.playVideos();
                    // this.mySwiper.init();
                    setTimeout(()=>{
                        this.status.slider = true;
                    },500)
                }).onRender(() => {
                    // increase or decrease our timer based on the active texture value
                    // at 60fps this should last one second
                    if(this.webGL.clicked) {
                        this.webGL.timer = Math.min(60, this.webGL.timer + 1);
                    }
                    else {
                        this.webGL.timer = Math.max(0, this.webGL.timer - 1);
                    }
                    // update our transition timer uniform
                    this.webGL.plane.uniforms.transitionTimer.value = this.webGL.timer;
                });
            }
        },
        components: {
            // mdbCarousel,
            // mdbCarouselItem,mdbCarouselCaption
        },
        mounted(){
            // this.initWebGL();
        },
        destroyed(){
            let buttonsOrder = document.querySelectorAll('.slider__button--order');
            let buttonsMore = document.querySelectorAll('.slider__button--more');

            for (let button of buttonsOrder) {
                button.removeEventListener('click', (e)=>{
                    e.stopPropagation();
                    this.openPopup();
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