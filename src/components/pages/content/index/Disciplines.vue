<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.disciplines#disciplines
        +e.container.container
            +e#disciplinesItem.H2.title.title.animation-on-scroll(ref="title" :class="{'show': scrollAnimation.title}") ДИСЦИПЛИНЫ #[br]#[span и ВОЗМОЖНОСТИ]
            +e.slider(v-swiper:main="swiper" :class="{'swiper-container': imagePrefix !== 'desktop'}")
                +e.wrapper(:class="{'swiper-wrapper': imagePrefix !== 'desktop'}")
                    +e.slide.swiper-slide(
                        v-for="(item,index) in items"
                        :class="{'hide': item.hidden, 'disciplines__slide--big': index === 0 || index === 1}"
                        ref="slides"
                    )
                        +e.img
                            +e.background(:class="'disciplines__background--' + (index + 1) ")
                                img(:src="`public/media/images/disciplines/${index + 1}/bg-${imagePrefix}.jpg`")
                            +e.powder(
                            :class="'disciplines__powder--' + (index + 1) "
                            )
                                img(:src="`public/media/images/disciplines/${index + 1}/powder-${imagePrefix}.png`")
                            +e.model(
                            :class="'disciplines__model--' + (index + 1) "
                            )
                                img(:src="`public/media/images/disciplines/${index + 1}/model-${imagePrefix}.png`")
                        +e.name.text-shadow
                            span(v-html="item.name")
                                //b {{ item.name }}
                        +e.info(:class="'disciplines__info--' + (index + 1) ")
                            p(v-html="item.info")
            +e.pagination.swiper-pagination
</template>

<script>
    import {isElementInViewport} from "../../../../mixins/frontEnd/isElementInViewport";
    export default {
        mixins: [isElementInViewport],
        data() {
            return {
                imagePrefix: 'mobile',
                scrollAnimation: {
                    title: false
                },
                swiper: {
                    freeMode: false,
                    slidesPerView: 'auto',
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type: 'bullets',
                        bulletClass: 'bullet',
                        bulletActiveClass: 'active',
                        currentClass: 'current'
                    },
                },
                items: [
                    {
                        name: 'FITNESS,<br> CROSSFIT & <br> POWER TRAINING <b>FITNESS, CROSSFIT & <br> POWER TRAINING</b>',
                        info: 'Фитнес и Кроссфит залы',
                        hidden: true
                    },
                    {

                        name: 'YOGA, SPA <br> & MASSAGE <b>YOGA, SPA <br> & MASSAGE</b>',
                        info: 'Финская сауна и Джакузи. Йога Студия (90 квм)',
                        hidden: true
                    },
                    {

                        name: 'Volleyball<br> & Soccer <b>Volleyball<br> & Soccer</b>',
                        info: 'Поле для пляжного волейбола, футбола, футволея',
                        hidden: true
                    },
                    {
                        name: 'SWiM ZONE<b>SWiM ZONE</b>',
                        info: 'Спортивный открытый бассейн (25 х 10 м)',
                        hidden: true
                    },
                    {
                        name: 'LEISURE<br>ZONE<b>LEISURE<br>ZONE</b>',
                        info: 'Зеленая релакс зона и прокат велосипедов',
                        hidden: true
                    }
                ],
            };
        },
        methods: {
            animationOnScroll(){
                if(this.isElementInViewport(this.$refs.title) && !this.scrollAnimation.title){
                    this.scrollAnimation.title = true;
                }
            },
            onResize(){
                if (window.innerWidth >= 1200) {
                    this.main.destroy(true, true);
                } else {
                    this.main.init();
                }
            },
            onScroll(){
                this.animationOnScroll();
                this.$refs.slides.map((slide,index)=>{

                    if(this.isInViewport(slide,-window.innerHeight/3)) {
                        let timeOut = 0;

                        if (index % 2 !== 0 ){
                            timeOut = 200
                        }

                        setTimeout(()=>{
                            this.items[index].hidden = false
                        }, timeOut)

                    }


                })

            },
            isInViewport(el,offset){
                const rect = el.getBoundingClientRect();
                const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

                return (rect.top <= windowHeight + offset) && ((rect.top + rect.height) >= 0);
            },
            setImagesPrefix(){

                if(window.innerWidth < 650){
                    return 'mobile'
                } else if(window.innerWidth < 1200){
                    return 'tablet'
                } else {
                    return 'desktop'
                }
            },

        },
        mounted() {
            this.imagePrefix = this.setImagesPrefix();
            if (window.innerWidth >= 1200) {
                this.main.destroy(true, true);
            }
            this.onScroll();
            window.addEventListener('scroll', this.onScroll);
            window.addEventListener('resize', this.onResize);
        },
        destroyed(){
            window.removeEventListener('scroll', this.onScroll)
        }
    };
</script>