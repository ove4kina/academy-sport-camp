<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.SECTION.conditions#conditions
        +e.container.container
            +e.wrapper
                +e.H2.title.title--small.animation-on-scroll--1(
                    ref="title"
                    :class="{'show': scrollAnimation.title}"
                ) Индивидуальные #[span Условия]
                +e.description.animation-on-scroll--2(
                    ref="description"
                    :class="{'show': scrollAnimation.description}"
                ) Расскажите нашему менеджеру о ваших пожеланиях и мы согласуем персональную цену вашего путешествия
                +e.steps
                    +e.step.animation-on-scroll--3(
                        ref="step1"
                        :class="{'show': scrollAnimation.step1}"
                    )
                        +e.number--one
                        p Размещение
                        span Вы можете поехать как один, так и целой группой друзей до 20-ти человек
                    +e.step.animation-on-scroll--4(
                        ref="step2"
                        :class="{'show': scrollAnimation.step2}"
                    )
                        +e.number--two
                        p Перемещение
                        span Трансфер из аэропорта, экскурсовод и путеводитель на ваш выбор — познайте Таиланд с комфортом
                    +e.step.animation-on-scroll--5(
                        ref="step3"
                        :class="{'show': scrollAnimation.step3}"
                    )
                        +e.number--three
                        p Досуг и SPA
                        span SPA-процедуры, тренировки и вечеринки на территории Academy Sport Camp
</template>

<script>
    import {howMuchCentered} from "../../../../mixins/frontEnd/howMuchCentered";
    import {isElementInViewport} from "../../../../mixins/frontEnd/isElementInViewport";

    export default {
        mixins: [howMuchCentered,isElementInViewport],
        data() {
            return {
                scrollAnimation: {
                    title: false,
                    description: false,
                    step1: false,
                    step2: false,
                    step3: false,
                }
            }
        },
        methods: {
            animationOnScroll(){
                for (let el in this.$refs) {
                    if(this.isElementInViewport(this.$refs[el]) && !this.scrollAnimation[el] && this.howMuchCentered(this.$refs[el]) > -0.4){
                        this.scrollAnimation[el] = true;
                    }
                }
            },
        },
        mounted(){
            if( window.innerWidth > 1200){
                window.addEventListener('scroll', this.animationOnScroll)
            }
        },
        destroyed(){
            window.removeEventListener('scroll', this.animationOnScroll)
        }
    };
</script>