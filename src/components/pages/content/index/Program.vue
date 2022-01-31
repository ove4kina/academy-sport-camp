<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.SECTION.program#program(
        ref="programSection"
        :style="{'min-height': `${sectionMinHeight}px`}"
        :class="{'bg-loaded': bgLoaded}"
    )
        +e.background
            img.placeholder(
                src="/public/media/images/program/bg-placeholder.jpg"
                v-if="hidePlaceholder"
            )
            img(:src="`/public/media/images/program/bg-${imagePrefix}.jpg`")
        +e.container.container(ref="container" :class="{'animation-on-scroll': !tabAnimation.container, 'show': scrollAnimation.container, 'tab-animation': tabAnimation.container || isMobile}")
            +e#programItem.H2.title.title--black #[span Программы] Тренировок
            +e.wrapper
                +e.P.info Мы разработали специальные программы, чтобы вы тренировались с лучшими спортсменами и достигали поставленных целей и могли насладиться незабываемым отдыхом в комфортных условиях.
                +e.persons(
                    :class="{'hide-persons': hidePersons}"
                )
                    +e.person(
                        v-for="(content,index) in contents"
                        :class="{'active': tabIndex === index, 'hide':  tabIndex !== index}")
                        img(:src="`${content.img + imagePrefix}.png`")
                +e.tabs-wrapper
                    +e.tabs.tabs__
                        +e.BUTTON.item--program.--black.button(
                            :class="{'active': tabIndex === 0}"
                            v-on:click="setTabIndex(0)"
                            data-text="Похудание"
                        )
                            span Похудание
                        +e.BUTTON.item--program.--black.button(
                            :class="{'active': tabIndex === 1}"
                            v-on:click="setTabIndex(1)"
                            data-text="Muay Thai"
                        )
                            span Muay Thai
                        +e.BUTTON.item--program.--black.button(
                            :class="{'active': tabIndex === 2}"
                            v-on:click="setTabIndex(2)"
                            data-text="MMA"
                        )
                            span MMA
                +e.contents(
                    ref="content"
                    :style="{'min-height': contentHeight}"
                )
                    +e.text(
                        v-for="(content, index) in contents"
                        ref="text"
                        :class="{'active': tabIndex === index, 'hide': tabIndex !== index,}"
                        v-html="content.text"
                    )
                +e.prices
                    +e.BUTTON.button.button__.--skew.--yellow(
                        v-on:click="openPopup"
                        data-text="Узнать цены и тарифы"
                    )
                        span Узнать цены и тарифы
                    //+e.prices-description От #[span 85$] за день проживания

</template>

<script>
    import {getScroll} from "../../../../mixins/frontEnd/getScroll";
    import {howMuchCentered} from "../../../../mixins/frontEnd/howMuchCentered";
    import {isAnyElementInViewport} from "../../../../mixins/frontEnd/isAnyElementInViewport";
    import {lazyImg} from "../../../../mixins/frontEnd/lazyImg";

    export default {
        mixins: [howMuchCentered,isAnyElementInViewport,getScroll,lazyImg],
        data() {
            return {
                scrollAnimation: {
                    container: false
                },
                tabAnimation: {
                    container: false
                },
                hidePersons: true,
                sectionMinHeight: 0,
                imagePrefix: 'mobile',
                isMobile: true,
                tabIndex: 1,
                contentHeight: null,
                contents: [
                    {
                        text: "<p>Начните новую жизнь с красивым, упругим и стройным телом!</p><p>Совместно с группой профессиональных тренеров и диетологов мы разработали курс оптимального похудания с естественной детоксикацией вашего организма.</p><p>Сбалансированное питание, индивидуальные тренировки (на ваш вкус: от тайского бокса до пилатеса), процедуры в SPA-комплексе по расписанию и многое другое.</p><ul><li><i class='cook'></i><p>Персональный<br> диетолог</p></li><li><i class='trainer'></i><p>Профессиональные<br> тренеры</p></li><li><i class='excursion'></i><p>Экскурсия<br>в подарок</p></li></ul>",
                        img: "/public/media/images/program/1/img-"
                    },
                    {
                        text: "<p>Тайский бокс — древнее боевое искусство Таиланда, которое набрало невероятную популярность во всем мире.</p><p>В наш спортивный лагерь приезжают знаменитости, чтобы тренироваться в максимально комфортных условиях: меньше минуты пешком до тренировочной зоны от виллы, SPA-комплекс, бассейн и свежая еда от шеф-повара.</p><p>Согласуйте свои индивидуальные условия с менеджером и отправляйтесь в незабываемое и продуктивное путешествие!</p><ul><li><i class='cook'></i><p>Персональный<br> диетолог</p></li><li><i class='trainer'></i><p>Профессиональные<br> тренеры</p></li><li><i class='excursion'></i><p>Экскурсия<br>в подарок</p></li></ul>",
                        img: "/public/media/images/program/2/img-"
                    },
                    {
                        text: "<p>Познайте все искусство смешанных боевых единоборств вместе с признанными мастерами со всего мира!</p><p>В наш лагерь регулярно приезжают мировые звезды ММА, с которыми вы можете тренироваться бок о бок, перенимая их опыт и умения.</p><p>Главное преимущество ASC — вы живете в двух минутах от спортивного лагеря. Тренируйтесь с максимальным комфортом и результатом для себя.</p><ul><li><i class='cook'></i><p>Персональный<br> диетолог</p></li><li><i class='trainer'></i><p>Профессиональные<br> тренеры</p></li><li><i class='excursion'></i><p>Экскурсия<br>в подарок</p></li></ul>",
                        img: "/public/media/images/program/3/img-"
                    }
                ],
                bgLoaded: false,
                hidePlaceholder: true
            }
        },
        methods: {
            setImagePrefix(){
                if(window.innerWidth >= 1200){
                    this.imagePrefix = 'desktop';
                } else if(window.innerWidth >= 650 && window.innerWidth < 1200){
                    this.imagePrefix = 'tablet';
                } else {
                    this.imagePrefix = 'mobile';
                }

                this.lazyImg(`/public/media/images/program/bg-${this.imagePrefix}.jpg`, this.onImgLoaded)
            },
            onImgLoaded(){
                this.bgLoaded = true;
                setTimeout(()=>{
                    this.hidePlaceholder = false;

                },1000)
                setTimeout(()=>{
                    this.hidePersons = false;
                },500)
            },
            setTabIndex(index){
                this.tabIndex = index;
                this.contentHeight = this.$refs.text[index].getBoundingClientRect().height + 'px';
            },
            animationOnScroll(){
                for (let el in this.$refs) {
                    if(el !== 'text'){
                        if(this.isAnyElementInViewport(this.$refs[el]) && !this.scrollAnimation[el] && this.howMuchCentered(this.$refs[el]) > -0.6){
                            this.scrollAnimation[el] = true;
                            setTimeout(()=>{
                                this.tabAnimation[el] = true
                            },1000)
                        }
                    }
                }
            },
            openPopup(){
                this.$emit('openPopup','секция программы тренировок')
            },
            setTabContentHeight(){
                this.contentHeight = `${this.$refs.content.getBoundingClientRect().height}px`;
            }
        },
        mounted(){
            this.sectionMinHeight = this.$refs.programSection.scrollHeight;
            this.setImagePrefix();
            if(window.innerWidth < 1200){
                this.isMobile = true;
            } else {
                this.isMobile = false
            }
            window.addEventListener("load", this.setTabContentHeight);
            if( window.innerWidth > 1200){
                window.addEventListener('scroll', this.animationOnScroll)
            }

        },
        destroyed(){
            window.removeEventListener('scroll', this.animationOnScroll)
        }
    };
</script>