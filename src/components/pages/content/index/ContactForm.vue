<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.contact-form#contact-form(
        ref="contactForm"
        :class="{'send': form.send, 'loading': form.loading}"
    )
        +e.container.container.animation-on-scroll(ref="container" :class="{'show': scrollAnimation.container}")
            +e.text
                +e.H2.title.title СВЯЗАТЬСЯ #[br]#[span С НАМИ]
                +e.info Согласуйте индивидуальные условия и цену вашего путешествия c нашим менеджером — мы порекомендуем и подберем оптимальный варинат для Вас.
            +e.wrapper
                +e.FORM.form
                    +e.body
                        +e.form-wrapper
                            +e.input(
                                :class="{'error': inputs.phone.error,'focus': inputs.phone.focus,'blur': inputs.phone.blur}"
                            )
                                +e.placeholder Ваш телефон
                                input(
                                    v-on:focus="onFocus('phone')"
                                    v-on:blur="onBlur('phone')"
                                    v-model="inputs.phone.value"
                                    type="tel"
                                )
                            +e.input(
                                :class="{'error': inputs.email.error,'focus': inputs.email.focus,'blur': inputs.email.blur}"
                            )
                                +e.placeholder E-mail
                                input(
                                    v-on:focus="onFocus('email')"
                                    v-on:blur="onBlur('email')"
                                    v-model="inputs.email.value"
                                    type="email"
                                )
                            +e.BUTTON.button.button__.--yellow.--skew(
                                v-on:click="send"
                                type="button"
                                data-text="Получить консультацию"
                            )
                                span Получить консультацию
                    +e.preloader--desktop
                        span
                        span
                    +e.preloader--mobile
                        svg(height="50" width="50" viewBox="0 0 50 50")
                            circle(r="21" fill="none" cy="25" cx="25" stroke="#FDD835" stroke-width="4" stroke-dasharray="25 100")
                    +e.response
                        p Заявка отправлена, ожидайте ответа менеджера.
</template>

<script>
    import axios from 'axios';
    import {isAnyElementInViewport} from "../../../../mixins/frontEnd/isAnyElementInViewport";
    import {howMuchCentered} from "../../../../mixins/frontEnd/howMuchCentered";

    export default {
        mixins: [isAnyElementInViewport,howMuchCentered],
        data() {
            return {
                form: {
                    loading: false,
                    send: false
                },
                inputs: {
                    phone: {
                        value: '',
                        error: false,
                        focus: false,
                        blur: false
                    },
                    email: {
                        value: '',
                        error: false,
                        focus: false,
                        blur: false
                    }

                },
                scrollAnimation: {
                    container: false
                },
            };
        },
        methods: {
            onFocus(name){
                this.inputs[name].focus = true;
                this.inputs[name].blur = false;
            },
            onBlur(name){
                if(this.inputs[name].value.length === 0){
                    this.inputs[name].blur = true;
                    this.inputs[name].focus = false;
                }
            },
            send(){
                if(this.inputs.phone.value !== '') {
                    this.inputs.phone.error = false;
                } else {
                    this.inputs.phone.error = true;
                }
                if(this.inputs.email.value !== '') {
                    this.inputs.email.error = false;
                } else {
                    this.inputs.email.error = true;
                }
                if(!this.inputs.phone.error && !this.inputs.email.error) {
                    this.form.loading = true;

                    axios({
                        method: 'post',
                        url: '/send-form-order',
                        data: {
                            name: this.inputs.email.value,
                            phone: this.inputs.phone.value,
                            target: 'Форма связаться с нами'
                        }
                    })
                        .then(response => {
                            if(response.status === 200){
                                setTimeout(() => {
                                    this.form.send = true;
                                },1000);
                                setTimeout(() => {
                                    this.form.loading = false;
                                },1500)
                            }
                        })
                        .catch(e => {
//                        console.log(e)
                        })
                }
            },
            animationOnScroll(){
                for (let el in this.$refs) {
                    if(this.isAnyElementInViewport(this.$refs[el]) && !this.scrollAnimation[el] && this.howMuchCentered(this.$refs[el]) > -0.6){
                        this.scrollAnimation[el] = true;
                    }
                }
            },
            onScroll(){
                if(this.form.send && !this.isAnyElementInViewport(this.$refs.contactForm)){
                    this.inputs.phone.focus = false;
                    this.inputs.email.focus = false;
                    this.inputs.phone.value = '';
                    this.inputs.email.value = '';
                    this.form.send = false;
                }
                this.animationOnScroll();
            },
            isInViewport(el,offset){
                const rect = el.getBoundingClientRect();
                const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
                return (rect.top <= windowHeight + offset) && ((rect.top + rect.height) >= 0);
            },
        },
        mounted() {
            this.onScroll();
            window.addEventListener('scroll', this.onScroll);
        },
        destroyed(){
            window.removeEventListener('scroll', this.onScroll)
        }
    };
</script>