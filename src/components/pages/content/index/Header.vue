<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.HEADER.header(
        :class="{'fixed': status.fixed, 'open-menu': status.menu}"
    )
        +e.container.container
            +e.styler
                +e.wrapper
                    +e.logo(v-on:click="scrollToSection('main-section')")
                         img(src="/public/media/images/logo.svg")
                    +e.hamburger(
                        :class="{'active': status.menu}"
                        v-on:click="toggleMobileMenu"
                    )
                        span
                    +e.list(
                        ref="list"
                    )
                        +e.A.item.link--about(href="#about" v-scroll-to="{el: '#about', offset: offset.about}" v-on:click="toggleMobileMenu" :class="{'active': activeItemIndex === 1}")
                            p Узнать о лагере
                            span фотографии и описание
                        +e.A.item.link--training(href="#training" v-scroll-to="'#training'" v-on:click="toggleMobileMenu" :class="{'active': activeItemIndex === 0}")
                            p Спортсмены
                            span тренируйтесь с лучшими
                        +e.A.item.link--program(href="#program" v-scroll-to="{el: '#program', offset: offset.program}" v-on:click="toggleMobileMenu" :class="{'active': activeItemIndex === 2}")
                            p Программы
                            span и цены
                        +e.A.item.link--disciplines(href="#disciplines" v-scroll-to="'#disciplines'" v-on:click="toggleMobileMenu" :class="{'active': activeItemIndex === 3}")
                            p Дисциплины
                            span Спорт и досуг
                        +e.A.item.link--contacts(href="#footer" v-scroll-to="'#footer'" v-on:click="toggleMobileMenu" :class="{'active': activeItemIndex === 4}")
                            p Контакты
                    +e.socials
                        +e.A(href="https://www.instagram.com/academysport.camp/").social--inst
                        +e.A(href="https://www.facebook.com/AcademySport.camp/").social--fb
                        +e.A(href="https://vk.com/academysport.camp").social--vk
                +e.phones
                    +e.phone
                        a.phone-thai(href="tel:+66950282582") +66 950 282 582
                        span Viber & WhatsApp
                    +e.phone
                        a.phone-rus(href="tel:+79620523582") +7 962 052 35 82
                        span Основной
                +e.A(href="tel:+66969311920").phone-mobile
</template>

<script>

    import {getScroll} from "../../../../mixins/frontEnd/getScroll";
    import {howMuchCentered} from "../../../../mixins/frontEnd/howMuchCentered";
    import {isElementInViewport} from "../../../../mixins/frontEnd/isElementInViewport";
    import { disablePageScroll, enablePageScroll } from 'scroll-lock';

    import {scrollTo} from "../../../../mixins/frontEnd/scrollTo";


    export default {
        mixins: [getScroll,howMuchCentered,isElementInViewport,scrollTo],
        data() {
            return {
                offset:{
                  about: null,
                  program: null
                },
                status: {
                    fixed: false,
                    menu: false
                },
                activeItemIndex: null
            };
        },
        mounted(){
            this.setSectionsOffset();
            if(window.innerWidth >= 1200){
                this.onScroll();
                document.addEventListener('scroll',this.onScroll);
            }
        },
        destroyed(){
            if(window.innerWidth >= 1200){
                document.removeEventListener('scroll',this.onScroll)
            }
        },
        methods:{
            setSectionsOffset(){
                if(window.innerWidth < 650){
                    this.offset.about = 0;
                    this.offset.program = 0;
                } else if(window.innerWidth >= 650 && window.innerWidth < 1200){
                    this.offset.about = 0;
                    this.offset.program = 200;
                } else {
                    this.offset.about = -100;
                    this.offset.program = 200;
                }
            },
            scrollToSection(id){
                this.scrollTo(document.getElementById(id), 1000)
            },
            toggleMobileMenu(){
                if(window.innerWidth < 1200){
                    this.status.menu = !this.status.menu;

                    if(this.status.menu){
                        disablePageScroll(this.$refs.list);
                    } else {
                        enablePageScroll(this.$refs.list);
                    }
                }


            },
            onScroll(){
                if(this.getScroll().y > 0){
                    this.status.fixed = true
                } else {
                    this.status.fixed = false
                }

                if(window.innerWidth >= 1200){
                    this.setActiveItem();
                }

            },
            setActiveItem(){
                if(this.howMuchCentered(document.getElementById('trainingItem')) > 0 && this.isElementInViewport(document.getElementById('trainingItem')) && this.activeItemIndex !== 0){
                    this.activeItemIndex = 0;
                } else if(this.howMuchCentered(document.getElementById('aboutItem')) > 0 && this.isElementInViewport(document.getElementById('aboutItem')) && this.activeItemIndex !== 1){
                    this.activeItemIndex = 1;
                } else if(this.howMuchCentered(document.getElementById('programItem')) > 0 && this.isElementInViewport(document.getElementById('programItem')) && this.activeItemIndex !== 2){
                    this.activeItemIndex = 2;
                } else if(this.howMuchCentered(document.getElementById('disciplinesItem')) > 0 && this.isElementInViewport(document.getElementById('disciplinesItem')) && this.activeItemIndex !== 3){
                    this.activeItemIndex = 3;
                } else if(this.howMuchCentered(document.getElementById('contactsItem')) > 0 && this.isElementInViewport(document.getElementById('contactsItem')) && this.activeItemIndex !== 4){
                    this.activeItemIndex = 4;
                } else if (this.howMuchCentered(document.getElementById('aboutItem')) < -1) {
                    this.activeItemIndex = null;
                }
            }
        }
    };
</script>