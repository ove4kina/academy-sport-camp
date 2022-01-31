<template lang="pug">
    include ../../../../tools/mixins.pug

    +b#training.SECTION.training
        +e#particlesDesktop.particles(
            :class="{'active': select.init}"
        )
        +e.container.container(ref="container")
            +e.select-wrapper(
                ref="wrapper1"
                :class="{'animation-on-scroll': !scrollAnimationLock.wrapper1, 'show': scrollAnimation.wrapper1}"
            )
                +e#trainingItem.H2.title--top.title тренируйся #[br] #[span с лучшими]
                +e.background
                    img(src="public/media/images/training-bg_mobile.png")
                    +e#particlesMobile.particles(
                        :class="{'active': select.init}"
                    )
                +e.select(ref="select")
                    +e.names-wrapper(
                        :class="{'active': nameWrapper.nameWrapperAnimation, 'hide': nameWrapper.nameWrapperAnimationHide }"
                    )
                        +e.names(:class="{'active':select.activeIndex !== null}")
                            +e.name(:class="{'active':select.activeName === 1}")
                                p Mr Putithon Youyong
                                span Тренер по функциональному тренингу и кроссфиту.
                            +e.name(:class="{'active':select.activeName === 2}")
                                p СЕРГЕЙ ХАРИТОНОВ
                                span Профессиональный боец ММА
                            +e.name(:class="{'active':select.activeName === 3}")
                                p Александр
                                span Тренер по физ. подготовке ММА и К1
                    +e.swiper(
                        v-swiper:training="swiperOptions"
                        :class="{'swiper-container': window.windowWidth <= 768}"
                    )
                        +e.swiper-wrapper(:class="{'swiper-wrapper': window.windowWidth <= 768}")
                            +e.swiper-slide.swiper-slide(v-for="slide of 3")
                    +e.top-pagination
                        +e.top-pagination-bullet.bullet(:class="{'active': bullet.index === 0}")
                        +e.top-pagination-bullet.bullet(:class="{'active': bullet.index === 1}")
                        +e.top-pagination-bullet.bullet(:class="{'active': bullet.index === 2}")
                    +e.man--1(
                        :class="[{'hover': select.hoverIndex === 1,'active': select.activeIndex === 1}, select.positions.thai]"
                    )
                        +e.IMG.photo--dark(:src="`public/media/images/select/1/dark-${imagePrefix}.png`")
                        +e.IMG.photo--light(:src="`public/media/images/select/1/light-${imagePrefix}.png`")
                        +e.SVG.work-area(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 351.64 594.73")
                            polygon(
                                v-on:mouseenter="select.hoverIndex = 1"
                                v-on:mouseleave="select.hoverIndex = null"
                                v-on:click="changePosition('thai')"
                                points="37.52 594.23 55.73 410.53 37.52 405.98 10.22 363.2 0.51 335.9 6.58 272.18 18.41 225.76 42.98 208.47 107.61 170.24 122.17 151.13 124.85 148.4 124.85 138.3 115.23 122.2 111.39 120.51 108.26 112.1 94.8 92.39 97.45 80.61 104.18 77.73 109.95 79.65 108.26 38.06 121.24 17.15 138.79 6.33 155.62 1.77 170.04 0.51 191.68 5.85 204.41 15.71 215.23 31.81 220.76 49.6 223.16 66.67 223.16 76.52 231.34 79.17 233.26 86.14 231.34 94.79 225.81 100.56 223.16 109.22 220.28 119.07 217.16 120.75 212.11 133.25 211.39 137.58 212.11 146.47 219.8 152 226.05 163.54 278.93 193.59 313.31 213.54 331.58 246.47 343.84 284.94 351.14 321.47 349.61 342.87 337.83 385.41 325.81 411.86 296 419.07 293.12 420.75 293.6 457.77 319.08 594.23 37.52 594.23"
                            )
                    +e.man--2(
                        :class="[{'hover': select.hoverIndex === 2,'active': select.activeIndex === 2},select.positions.khar]"
                    )
                        +e.IMG.photo--dark(:src="`public/media/images/select/2/dark-${imagePrefix}.png`")
                        +e.IMG.photo--light(:src="`public/media/images/select/2/light-${imagePrefix}.png`")
                        +e.SVG.work-area(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450.26 590.78")
                            polygon(
                                v-on:mouseenter="select.hoverIndex = 2"
                                v-on:mouseleave="select.hoverIndex = null"
                                v-on:click="changePosition('khar')"
                                points="80.22 589.57 100.73 391.31 93.89 340.03 69.96 365.67 31.5 384.47 10.98 379.34 0.5 363.96 0.5 330.63 10.13 293.02 34.92 264.81 45.17 239.17 59.7 210.11 87.05 180.2 117.82 175.07 178.5 148.58 172.52 126.35 166.19 118.07 155.95 91.26 155.95 83.95 158.88 77.13 166.19 77.13 169.49 79.37 167.89 60.6 172.08 35.79 182.21 16.93 193.74 8.54 216.81 1.9 231.83 0.51 249.3 4.35 263.62 11.69 276.2 25.31 282.14 38.94 284.24 56.76 284.24 73.88 284.24 79.47 288.43 78.07 292.62 80.87 292.62 87.86 292.62 95.19 284.59 121.05 279.7 126.29 276.2 127.69 276.9 135.72 269.21 152.84 272.36 152.49 287.03 158.43 322.67 174.85 359.36 182.89 393.6 227.62 438.67 299.24 446.71 323.7 449.75 359.69 445.66 382.4 438.32 392.88 425.4 398.12 382.07 385.54 362.85 370.87 350.27 353.05 345.38 393.58 345.38 465.21 343.64 477.78 350.27 560.24 354.82 590.27 80.22 589.57"
                            )
                    +e.man--3(
                        :class="[{'hover': select.hoverIndex === 3,'active': select.activeIndex === 3}, select.positions.rus]"
                    )
                        +e.IMG.photo--dark(:src="`public/media/images/select/3/dark-${imagePrefix}.png`")
                        +e.IMG.photo--light(:src="`public/media/images/select/3/light-${imagePrefix}.png`")
                        +e.SVG.work-area(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 366.78 594.35")
                            polygon(
                                v-on:mouseenter="select.hoverIndex = 3"
                                v-on:mouseleave="select.hoverIndex = null"
                                v-on:click="changePosition('rus')"
                                points="55.14 593.72 59.63 571.1 47.3 567.73 59.63 519.53 59.63 408.54 43.37 406.3 25.43 384.44 0 318.86 0 297.18 7.5 270.65 6.94 252.71 9.18 220.76 24.31 192.74 37.21 183.21 56.83 179.28 111.76 155.18 134.74 149.57 134.74 142.85 128.01 119.31 117.36 80.07 117.36 46.44 128.01 21.77 154.92 4.4 183.39 0 208.73 4.96 233.39 23.45 245.16 49.8 245.16 71.66 247.97 79.51 242.92 116.5 239.56 122.67 236.2 137.8 231.15 148.45 236.2 152.94 298.98 175.92 311.31 186.57 332.05 194.42 349.98 213.47 357.83 236.46 357.83 265.04 357.83 283.54 366.78 314.93 366.78 333.99 347.74 408.54 338.77 420.31 319.15 427.6 305.14 430.96 304.58 454.5 323.64 555.96 307.38 559.32 314.67 594.35 55.14 593.72"
                            )
                +e.text(ref="text")
                    +e.wrapper
                        +e.changing-text
                            +e.P.info {{content.text.training.info}}
                            +e.UL.list.list__
                                +e.LI.item--training(
                                    v-for="item in content.text.training.list"
                                )
                                    span(
                                        v-html="item.title"
                                    )
                                    p(
                                        v-html="item.text"
                                    )
                            +e.BUTTON.button--price.button.button--skew.--transparent(v-on:click="$emit('openPopup')" data-text="Посмотреть цены")
                                span Посмотреть цены
            +e.slider-wrapper(ref="wrapper2" :class="{'animation-on-scroll': !scrollAnimationLock.wrapper2, 'show': scrollAnimation.wrapper2}")
                +e.H2.title--bottom.title живи#[br] #[span в комфорте]
                +e.wrapper--slider
                    +e.slider.swiper-container(
                        v-swiper:mainMobile="swiperMobile"
                        ref="sliderMobile"
                        v-if="window.windowWidthMobile"
                    )
                        .swiper-wrapper
                            +e.slide.slide__.swiper-slide(
                            v-for="(slide,index) in content.sliderContent"
                            )
                                +e.img
                                    img.swiper-lazy(:data-src="`${slide.image+(index+1)}/img-${imagePrefix}.jpg`")
                                +e.wrapper
                                    +e.title--mobile
                                        b {{slide.title}}
                                    +e.title--desktop
                                        span(v-html="slide.titleDesktop")
                                    +e.text {{slide.text}}
                    +e.slider.swiper-container(
                        v-swiper:mainDesktop="swiperDesktop"
                        ref="sliderDesktop"
                        v-else
                    )
                        .swiper-wrapper(
                            :class="{'hide': slide.slideChanged}"
                        )
                            +e.slide.slide__.swiper-slide(

                                ref="slide"
                                v-for="(slide, index) in content.sliderContent"
                            )
                                +e.img
                                    img.swiper-lazy(:data-src="`${slide.image+(index+1)}/img-${imagePrefix}.jpg`")
                                +e.wrapper
                                    +e.title--mobile
                                        b {{slide.title}}
                                    +e.title--desktop
                                        span(v-html="slide.titleDesktop")
                                    +e.text {{slide.text}}
                    +e.navigation--mobile.swiper-pagination
                    +e.navigation--desktop
                        +e.button--prev.button--navigation.--prev(v-on:click="slideMoveTo('prev')")
                        +e.navigation-text {{ sliderInformation.bottomSlideIndex + 1}} / {{ sliderInformation.bottomSlidesLength }}
                        +e.button--next.button--navigation.--next(v-on:click="slideMoveTo('next')")
</template>

<script>

    import {getOffset} from "../../../../mixins/frontEnd/getOffset";
    import {getScroll} from "../../../../mixins/frontEnd/getScroll";
    import {howMuchCentered} from "../../../../mixins/frontEnd/howMuchCentered";
    import {isElementInViewport} from "../../../../mixins/frontEnd/isElementInViewport";
    import {isAnyElementInViewport} from "../../../../mixins/frontEnd/isAnyElementInViewport";
    import {scrollTo} from "../../../../mixins/frontEnd/scrollTo";

    export default {
        mixins: [getOffset,getScroll,howMuchCentered,isElementInViewport,isAnyElementInViewport,scrollTo],
        data() {
            return {
                scrollAnimation:{
                    wrapper1: false,
                    wrapper2: false
                },
                scrollAnimationLock:{
                    wrapper1: false,
                    wrapper2: false
                },
                bullet: {
                    index: 0
                },
                sliderInformation:{
                    bottomSlideIndex: 0,
                    bottomSlidesLength: 0,
                },
                hideNames: false,
                bottomSliderActive: false,
                slide: {
                    slideInited: false,
                    slideChanged: false,
                    activeSlideIndex: 0,
                },
                nameWrapper:{
                    nameWrapperAnimation: false,
                    nameWrapperAnimationHide: false,
                },
                swiperOptions:{
                    loop: true,
                    speed: 1300,
                    freeMode: false,
                    slidesPerView: 1,
                    on: {
                        slideChange: ()=> {
                            if(this.slide.slideInited){
                                setTimeout( ()=> {
                                    this.bullet.index = this.training.realIndex;
                                    let model = '';
                                    switch(this.training.realIndex) {
                                        case 0: {
                                            model =  'khar';
                                            break;
                                        }
                                        case 1: {
                                            model =  'rus';
                                            break;
                                        }
                                        case 2: {
                                            model =  'thai';
                                            break;
                                        }
                                    }
                                    this.changePosition(model)

                                })
                            }
                            this.slide.slideInited = true;
                        },
                    }
                },
                window:{
                    windowWidth: 0,
                    windowWidthMobile: false,
                },
                content: {
                    sliderContent: [
                        {
                            title: 'Зона отдыха',
                            titleDesktop: 'Зона<br>отдыха<b>Зона<br>отдыха</b>',
                            text: 'Уникальная площадка, расположенная в гористом уголке юга Таиланда в живописной тропической зоне',
                            image: '/public/media/images/training/'
                        },
                        {
                            title: 'Групповые тренировки',
                            titleDesktop: 'Групповые<br>тренировки<b>Групповые<br>тренировки</b>',
                            text: 'На территории лагеря есть много разных зон: пилатес, тренажерный зал, бассейны и песчаные поля, где проходят тренировки по расписанию',
                            image: '/public/media/images/training/'
                        },
                        {
                            title: 'Активный отдых',
                            titleDesktop: 'Активный<br>отдых<b>Активный<br>отдых</b>',
                            text: 'Разнообразьте свой отдых — мы регулярно проводим чемпионаты с профессиональными спортсменами на территории ASC',
                            image: '/public/media/images/training/'
                        },
                        {
                            title: 'Живописные окрестности',
                            titleDesktop: 'Живописные<br>окрестности<b>Живописные<br>окрестности</b>',
                            text: 'Рядом расположены парк Нонг Нуч и виноградник «Сильвер Лейк» — наслаждайтесь изучением окрестностей самостоятельно или с гидом',
                            image: '/public/media/images/training/'
                        },
                        {
                            title: 'Первоклассное жилье',
                            titleDesktop: 'Первоклассное<br>жилье<b>Первоклассное<br>жилье</b>',
                            text: 'Виллы обустроены с максимальным комфортом для вашего отдыха: отдельные спальни, сплит-система и частный бассейн на территории',
                            image: '/public/media/images/training/'
                        },
                        {
                            title: 'Традиционный SPA и Массаж',
                            titleDesktop: 'Традиционный<br>SPA и Массаж<b>Традиционный<br>SPA и Массаж</b>',
                            text: 'В ASC работают лицензированные профессиональные тайские массажисты с медицинским образованием',
                            image: '/public/media/images/training/'
                        },
                        {
                            title: 'Бассейн на территории',
                            titleDesktop: 'Бассейн<br>на территории<b>Бассейн<br>на территории</b>',
                            text: 'В нашем бассейне мы поддерживаем идеальную чистоту, чтобы вы могли с комфортом искупаться и позагорать на солнце',
                            image: '/public/media/images/training/'
                        },
                        {
                            title: 'Уникальные экскурсии',
                            titleDesktop: 'Уникальные<br>экскурсии<b>Уникальные<br>экскурсии</b>',
                            text: 'Мы регулярно проводим незабываемые экскурсии по живописным окрестностям и достопримечательностям Таиланда',
                            image: '/public/media/images/training/'
                        }
                    ],
                    text: {
                        training: {
                            info: 'Наш лагерь посещают много известных спортсменов и звезд. Хотите стать лучше? Тренируйтесь с лучшими!',
                            list: [
                                {
                                    title: '12 направлений',
                                    text: 'Спортивных дисциплин'
                                },
                                {
                                    title: '200 +',
                                    text: 'Гостей обслуживается'
                                },
                                {
                                    title: '15 тренеров',
                                    text: 'Мировые звезды и заслуженные бойцы'
                                }
                            ]
                        },
                        live: {
                            info: 'Academy Sport Camp — дочерний проект коттеджного поселка Top Mountain Village. Вы можете арендовать или купить виллу, чтобы насладиться всей прелестью непрерывной концентрации на любимом деле и комфортной жизнью.',
                            list: [
                                {
                                    title: 'Комфорт',
                                    text: 'На территории кемпа есть все необходимые условия для релаксации: spa-салоны, бассейны, сауны и даже зал йоги'
                                },
                                {
                                    title: 'Выгодные условия',
                                    text: 'предлагаются всем клиентам и гостям, которые хотят приехать на долгое время в тренировочный лагерь'
                                }
                            ]
                        }
                    }
                },
                imagePrefix: 'tablet',
                swiperMobile: {
                    effect: 'slide',
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    speed: 500,
                    loop: false,
                    lazy: {
                        loadPrevNext: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type: 'bullets',
                        bulletClass: 'bullet',
                        bulletActiveClass: 'active',
                        currentClass: 'current'
                    }
                },
                swiperDesktop: {
                    effect: 'fade',
                    slidesPerView: 1,
                    spaceBetween: 0,
                    speed: 1300,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type: 'bullets',
                        bulletClass: 'bullet',
                        bulletActiveClass: 'active',
                        currentClass: 'current'
                    },
                    lazy: {
                        loadPrevNext: true,
                    },
                    on: {
                        slideChange: ()=>{
                            setTimeout(()=>{
                                this.slide.activeSlideIndex = this.mainDesktop.activeIndex;
                                this.sliderInformation.bottomSlideIndex = this.mainDesktop.realIndex;
                            })
                        },
                        init: ()=>{
                            setTimeout(()=>{
                                if(window.innerWidth >= 650){
                                    this.sliderInformation.bottomSlidesLength = this.mainDesktop.slides.length;
                                }
                            })
                        }
                    }
                },
                startPosition: {
                    left: null,
                    width: null,
                    height: null,
                    top: null,
                    triggerHeight: null,
                    triggerTop: null
                },
                dynamicPosition: {
                    left: null,
                    width: null,
                    top: null,
                    position: null,
                    bottom: null
                },
                select: {
                    hoverIndex: null,
                    activeIndex: null,
                    activeName: 2,
                    init: false,
                    positions: {
                        thai: 'left',
                        khar: 'center',
                        rus: 'right'
                    }
                },
                activeLive: false
            };
        },
        created(){
        },
        mounted(){
            if(this.mainDesktop.params.init === true){
                this.initEvents();
            }
            this.imagePrefix = this.setImagesPrefix();
            if(typeof window !== 'undefined'){
                this.window.windowWidth = window.innerWidth;
            }
            if(window.innerWidth < 1200){
                this.nameWrapper.nameWrapperAnimation = true;
            }
            if(window.innerWidth < 650){
                this.window.windowWidthMobile = true;
                setTimeout(()=>{
                    this.mainMobile.lazy.loadInSlide(0);
                    this.mainMobile.lazy.loadInSlide(1);
                })
            } else {
                setTimeout(()=>{
                    this.mainDesktop.lazy.loadInSlide(0);
                    this.mainDesktop.lazy.loadInSlide(1);
                    this.mainDesktop.lazy.loadInSlide(2);
                    this.mainDesktop.lazy.loadInSlide(3);
                    this.mainDesktop.lazy.loadInSlide(4);
                })
                this.window.windowWidthMobile = false;
            }
            if(window.innerWidth < 767){
                // this.initParticles();
            } else {
                this.training.destroy(true, true)
            }
        },
        destroyed(){
            window.removeEventListener('scroll', this.onScroll)
        },
        methods:{
            scrollToProgram(){
                this.scrollTo(document.getElementById('program'),1000,'easeInOutCubic', -200)
            },
            slideMoveTo(direction){
                if(window.innerWidth >= 650){
                    this.slide.slideChanged = true;
                    setTimeout(()=>{
                        if(direction === 'prev'){
                            if(this.mainDesktop.activeIndex === 0){
                                this.mainDesktop.slideTo(this.mainDesktop.slides.length - 1);
                            } else {
                                this.mainDesktop.slidePrev();
                            }
                        } else {
                            if(this.mainDesktop.activeIndex === this.mainDesktop.slides.length - 1){
                                this.mainDesktop.slideTo(0);
                            } else {
                                this.mainDesktop.slideNext();
                            }
                        }
                        this.slide.slideChanged = false;
                    },600)
                }
            },
            animationOnScroll(){
                for (let el in this.$refs) {
                    if(typeof this.$refs[el].length === 'undefined'){
                        if(this.isAnyElementInViewport(this.$refs[el]) && !this.scrollAnimation[el] && this.howMuchCentered(this.$refs[el]) > -0.7){
                            this.scrollAnimation[el] = true;
                            if(el === 'wrapper1'){
                                setTimeout(()=>{
                                    this.nameWrapper.nameWrapperAnimation = true;
                                },700)
                            }
                            setTimeout(()=>{
                                this.scrollAnimationLock[el] = true;
                            },1000)
                        }
                    }
                }
            },
            openPopup(){
                this.$emit('openPopup','секция тренируйся и живи')
            },
            setImagesPrefix(){
                if(window.innerWidth < 1200){
                    return 'tablet'
                } else if(window.innerWidth < 650) {
                    return 'mobile'
                } else {
                    return 'desktop'
                }
            },
            howMuchCentered(el) {
                let elementOffsetTop = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop),
                    rect = el.getBoundingClientRect(),
                    viewportHeight = window.innerHeight,
                    k = (2*this.getScroll().y-2*elementOffsetTop+viewportHeight-rect.height)/(viewportHeight + rect.height);
                return k;
            },
            changePosition(name){
                if(this.select.activeIndex === 3 && name === 'rus' || this.select.activeIndex === 1 && name === 'thai' || this.select.activeIndex === 2 && name === 'khar' ){
                    return
                }
                switch(name){
                    case 'thai': {
                        switch (this.select.positions.thai) {
                            case 'left':{
                                this.select.positions.khar = 'right';
                                this.select.positions.rus = 'left';
                                break;
                            }
                            case 'right':{
                                this.select.positions.khar = 'right';
                                this.select.positions.rus = 'left';
                                break;
                            }
                        }
                        this.select.positions.thai = 'center';
                        this.select.activeIndex = 1;
                        break;
                    }
                    case 'khar': {
                        switch (this.select.positions.khar) {
                            case 'left':{
                                this.select.positions.thai = 'left';
                                this.select.positions.rus = 'right';
                                break;
                            }
                            case 'right':{
                                this.select.positions.thai = 'left';
                                this.select.positions.rus = 'right';
                                break;
                            }
                        }
                        this.select.positions.khar = 'center';
                        this.select.activeIndex = 2;

                        break;
                    }
                    case 'rus': {
                        switch (this.select.positions.rus) {
                            case 'left':{
                                this.select.positions.thai = 'right';
                                this.select.positions.khar = 'left';
                                break;
                            }
                            case 'right':{
                                this.select.positions.thai = 'right';
                                this.select.positions.khar = 'left';
                                break;
                            }
                        }
                        this.select.positions.rus = 'center';
                        this.select.activeIndex = 3;

                        break;
                    }
                }
                this.nameWrapper.nameWrapperAnimationHide = true;
                this.nameWrapper.nameWrapperAnimation = false;
                setTimeout(()=>{
                    this.select.activeName = this.select.activeIndex;
                    setTimeout(() => {
                        this.nameWrapper.nameWrapperAnimation = true;
                        this.nameWrapper.nameWrapperAnimationHide = false;
                    })
                },400)
            },
            getStartPosition(){
                this.startPosition.left = this.$refs.text.offsetLeft + this.$refs.container.offsetLeft;
                this.startPosition.width = this.$refs.text.clientWidth;
                this.startPosition.height = this.$refs.text.scrollHeight;
                this.startPosition.top = this.getOffset(this.$refs.text).top;

                this.startPosition.triggerHeight = this.$refs.container.clientHeight;
                this.startPosition.triggerTop = this.getOffset(this.$refs.container).top;
            },
            onResize(){

                this.getStartPosition();
                window.addEventListener('scroll', this.onScroll);
                this.onScroll();

            },
            fixText(){
                if(this.getScroll().y > this.startPosition.top - 60){
                    this.dynamicPosition.top = '60px';
                    this.dynamicPosition.left = `${this.startPosition.left}px`;
                    this.dynamicPosition.width = `${this.startPosition.width}px`;
                    this.dynamicPosition.position = 'fixed';
                    this.dynamicPosition.bottom = 'auto';
                    if(this.getScroll().y > this.startPosition.triggerHeight + this.startPosition.triggerTop - this.startPosition.height - 60){
                        this.dynamicPosition.top = 'auto';
                        this.dynamicPosition.left = 'auto';
                        this.dynamicPosition.bottom = `${this.$refs.text.scrollHeight - this.$refs.text.clientHeight}px`;
                        this.dynamicPosition.position = 'absolute';
                    }
                } else {
                    this.dynamicPosition.top = null;
                    this.dynamicPosition.left = null;
                    this.dynamicPosition.width = null;
                    this.dynamicPosition.position = null;
                }
            },
            activeMan(){
                if((!this.select.init || window.innerWidth < 768) && this.select.activeIndex === null){
                    if (this.howMuchCentered(this.$refs.select) >= -0.25){
                        this.select.activeIndex = 2;
                        // this.initParticles();
                    }
                }

            },
            changeText(){
                if (this.howMuchCentered(this.$refs.sliderDesktop) >= -0.45){
                    this.activeLive = true;
                }
                if (this.howMuchCentered(this.$refs.select) <= 0.45){
                    this.activeLive = false;
                }
            },
            onScroll(){

                if(window.innerWidth >= 1200){
                    this.animationOnScroll();
                    this.fixText();
                    this.changeText();
                }

                this.activeMan()



            },
            initEvents(){
                setTimeout(()=>{
                    this.getStartPosition();
                    this.onScroll();
                    window.addEventListener('scroll', this.onScroll);
                    window.addEventListener('resize', this.onResize)
                })
            },
            initParticles(){
                let selector = 'particlesDesktop';
                if (window.innerWidth < 600){
                    selector = 'particlesMobile'
                }
                particlesJS(selector,{
                    "particles": {
                        "number": {
                            "value":200,
                            "density":{
                                "enable":true,
                                "value_area":3000
                            }
                        },
                        "color":{
                            "value":"#fc0000"
                        },
                        "shape":{
                            "type":"circle",
                            "stroke":{
                                "width":0,
                                "color":"#000000"
                            },
                            "polygon":{
                                "nb_sides":3
                            },
                            "image":{
                                "src":"img/github.svg",
                                "width":100,"height":100
                            }
                        },
                        "opacity":{
                            "value":0.5,
                            "random":true,
                            "anim":{
                                "enable":false,
                                "speed":1,
                                "opacity_min":0.1,
                                "sync":false}
                        },
                        "size":{
                            "value":4,
                            "random":true,
                            "anim":{
                                "enable":true,
                                "speed":5,
                                "size_min":0,
                                "sync":false
                            }
                        },
                        "line_linked":{
                            "enable":false,
                            "distance":500,
                            "color":"#ffffff",
                            "opacity":0.4,
                            "width":2
                        },
                        "move":{
                            "enable":true,
                            "speed":7.8914764163227265,
                            "direction":"top",
                            "random":true,
                            "straight":false,
                            "out_mode":"out",
                            "bounce":false,"attract":{
                                "enable":false,
                                "rotateX":600,
                                "rotateY":1200
                            }
                        }
                    },
                    "interactivity":{
                        "detect_on":"canvas",
                        "events":{
                            "onhover":{
                                "enable":false,
                                "mode":"bubble"
                            },
                            "onclick":{
                                "enable":false,
                                "mode":"repulse"
                            },"resize":true
                        },
                        "modes":{
                            "grab":{
                                "distance":400,
                                "line_linked":{
                                    "opacity":0.5
                                }
                            },
                            "bubble":{
                                "distance":400,
                                "size":4,
                                "duration":0.3,
                                "opacity":1,
                                "speed":3
                            },
                            "repulse":{
                                "distance":200,
                                "duration":0.4
                            },
                            "push":{
                                "particles_nb":4
                            },
                            "remove":{
                                "particles_nb":2
                            }
                        }
                    },
                    "retina_detect":true
                });

                setTimeout(()=>{
                    this.select.init = true;
                })
            }
        }
    };
</script>