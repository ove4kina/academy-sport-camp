<template lang="pug">
    include ../../../../tools/mixins.pug

    +b#benefits.SECTION.benefits
        +e.cotainer.container
            +e#benefitsItem.H2.title.title.animated-benefits(
                :class="{'show': animation.show.title}"
                ref="title"
            ) #[span Почему стоит выбрать </br>] academy</br> Sport Camp
        +e.slider.swiper-container(
            v-swiper:mySwiper="swiper"
            ref="slider"
            :class="{'show': animation.show.slider, 'animated-benefits': animation.hide.slider}"
        )
            +e.swiper-wrapper.swiper-wrapper
                +e.card.swiper-slide.benefits-card__(
                    v-for="(card,index) in content.benefits"
                )
                    +e.photo
                        +e.skew-wrapper
                            +e.unskew-wrapper
                                img.swiper-lazy(
                                    :src="`/public/media/images/benefits/${index + 1}/${imagePrefix}.jpg`"
                                )
                    +e.description
                        h3(v-html="card.title")
                        p {{card.text}}
            +e.pagination.swiper-pagination
            +e.BUTTON.button--nav.--prev.button--navigation.--prev(
                v-on:click="slideMoveTo('prev')"
                :class="{'prev-lock': buttons.prevLock, 'prev-show': !buttons.prevLock}"
                type="button"
            )
            +e.BUTTON.button--nav.--next.button--navigation.--next(
                type="button"
                v-on:click="slideMoveTo('next')"
                :class="{'next-lock': buttons.nextLock, 'next-show': !buttons.nextLock}"
            )


</template>

<script>
    import {howMuchCentered} from "../../../../mixins/frontEnd/howMuchCentered";
    export default {
        mixins: [howMuchCentered],
        data(){
            return {
                buttons: {
                    prevLock: true,
                    nextLock: false,
                },
                swiper:{
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    slidesOffsetAfter: 30,
                    speed: 500,
                    centeredSlides: true,
//                    navigation: {
//                        nextEl: '.benefits__button--next',
//                        prevEl: '.benefits__button--prev',
//                    },
                    // lazy: {
                    //     loadPrevNext: true,
                    //     loadPrevNextAmount: 5
                    // },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type: 'bullets',
                        bulletClass: 'bullet',
                        bulletActiveClass: 'active',
                        currentClass: 'current'
                    },
                    breakpoints: {
                        // when window width is >= 320px
                        649: {
                            centeredSlides: false,
                            loop: false
                        }
                    },
                    on: {
                        slideChange: ()=>{
                            if(this.mySwiper.activeIndex === 0){
                                this.buttons.prevLock = true;
                            } else {
                                this.buttons.prevLock = false;
                            }
                            if(this.mySwiper.activeIndex === this.mySwiper.slides.length - 1){
                                this.buttons.nextLock = true;
                            } else {
                                this.buttons.nextLock = false;
                            }
                        },
                        init: ()=>{
                            setTimeout(()=>{
                                document.addEventListener('scroll', this.animationOnScroll)
                                this.animationOnScroll();
                            },1000)
                        },
                    }
                },
                content: {
                    benefits: [
                        {
                            title: 'Еда из свежих<br>фруктов и овощей',
                            text: 'На территории ASC готовят исключительно из свежих фруктов и овощей, а в меню вы можете найти популярные блюда со всего мира на свой вкус.',
                            image: '/public/media/images/benefits/5/photo.jpg'
                        },
                        {
                            title: 'Проживание<br>в Виллах VIP-класса',
                            text: 'Наслаждайтесь отдыхом на первоклассных виллах от Mountain Village 2 с частным бассейном на территории.',
                            image: '/public/media/images/benefits/1/photo.jpg'
                        },
                        {
                            title: 'Тренировки<br>с профессионалами',
                            text: 'Перенимайте опыт профессионалов со всего мира на открытых тренировках в Academy Sport Camp.',
                            image: '/public/media/images/benefits/2/photo.jpg'
                        },
                        {
                            title: 'Экзотические<br>Прогулки',
                            text: 'Раскройте для себя культуру Таиланда с профессиональным экскурсоводом, пройдя по самым сокровенным и интересным местам.',
                            image: '/public/media/images/benefits/3/photo.jpg'
                        },
                        {
                            title: 'Лазурные<br>пляжи',
                            text: 'В 20 минутах ходьбы от ASC располагается чистейший «Военный пляж».',
                            image: '/public/media/images/benefits/4/photo.jpg'
                        }
                    ]
                },
                imagePrefix: 'mobile',
                animation: {
                    show: {
                        title: false,
                        slider: false
                    },
                    hide:{
                        slider: true
                    }
                }
            }
        },
        mounted(){
            this.setImagesPrefix()
        },
        destroyed(){
            document.removeEventListener('scroll', this.animationOnScroll)
        },
        methods: {
            slideMoveTo(direction){
                if(window.innerWidth >= 1200){
                    if(direction === 'prev'){
                        this.mySwiper.slidePrev();
                    } else {
                        this.mySwiper.slideNext();
                    }
                }
            },
            animationOnScroll(){
                for (let el in this.$refs) {
                    if(this.howMuchCentered(this.$refs[el]) > -0.4 && !this.animation.show[el]){
                        this.animation.show[el] = true;
                        if(el === 'slider'){
                            this.clearAnimation();
                        }
                    }
                }
            },
            clearAnimation(){
                setTimeout(()=>{
                    this.animation.show.slider = false;
                    this.animation.hide.slider = false;
                },900)
            },
            setImagesPrefix(){

                if(window.innerWidth < 650){
                    this.imagePrefix = 'mobile'
                } else if(window.innerWidth < 1200){
                    this.imagePrefix = 'tablet'
                } else {
                    this.imagePrefix = 'desktop'
                }
            },
        }
    }
</script>

