<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.popup(
        :class="{'active': status,'send': form.status.send, 'loading': form.status.loading}"
        ref="main"
    )
        +e.wrapper(v-on:click.stop="stopBubbling")
            +e.form(
                ref="form"
                :style="{height:form.height}"
            )
                +e.body
                    +e.text--body
                        p Введите данные для связи с нами
                        span Это не займет много времени
                    +e.INPUT-COMPONENT.input(
                        :placeholder="inputs.name.placeholder"
                        :value="inputs.name.value"
                        :name="inputs.name.name"
                        :error="inputs.name.error"
                        :type="inputs.name.type"
                        @change="changeInput"
                    )
                    +e.INPUT-COMPONENT.input(
                        :placeholder="inputs.phone.placeholder"
                        :value="inputs.phone.value"
                        :name="inputs.phone.name"
                        :error="inputs.phone.error"
                        :type="inputs.phone.type"
                        @change="changeInput"
                    )
                    +e.BUTTON.button--send.button--skew.--yellow(
                        type="button"
                        v-on:click="send"
                        data-text="Отправить"
                    )
                        span Отправить
                    +e.privacy Нажимая на кнопку «Зарегистрироваться», вы даете согласие на &nbsp
                        a(href="/privacy") обработку персональных данных
                +e.response
                    +e.text--response
                        p Спасибо за уделенное время
                        span Наш менеджер скоро свяжется с вами.
            +e.preloader
                span
                span
            +e.close(v-on:click="closePopup")
    
</template>

<script>
    import Input from '../../../blanks/Input.vue'
    import axios from 'axios';

    import { disablePageScroll, enablePageScroll } from 'scroll-lock';
    export default {
        props: ['status', 'target'],
        data(){
            return {
                inputs: {
                    name: {
                        value: '',
                        error: false,
                        name: 'name',
                        placeholder: 'Ваше имя',
                        type: 'text'
                    },
                    phone: {
                        value: '',
                        error: false,
                        name: 'phone',
                        placeholder: 'Телефон',
                        type: 'tel'
                    }
                },
                form: {
                    height: null,
                    status: {
                        send: false,
                        loading: false
                    }
                }
            }
        },
        methods: {
            stopBubbling(e){

                e.preventDefault();
            },

            changeInput(data){

                this.inputs[data.name].value = data.value

            },
            closePopup(){
                this.$emit('close')
            },
            onKeyDown(event){
                event = event || window.event;
                let isEscape = false;
                if ("key" in event) {
                    isEscape = (event.key == "Escape" || event.key == "Esc");
                } else {
                    isEscape = (event.keyCode == 27);
                }
                if (isEscape) {
                    this.closePopup()
                }
            },
            send(){
                if (this.inputs.name.value !== ''){
                    this.inputs.name.error = false
                } else {
                    this.inputs.name.error = true
                }


                if (this.inputs.phone.value !== ''){
                    this.inputs.phone.error = false
                } else {
                    this.inputs.phone.error = true
                }


                if(!this.inputs.phone.error && !this.inputs.name.error) {

                    this.form.status.loading = true;

                    axios({
                        method: 'post',
                        url: '/send-form-order',
                        data: {
                            name: this.inputs.name.value,
                            phone: this.inputs.phone.value,
                            target: this.target
                        }
                    })
                        .then(response => {

                            if(response.status === 200){
                                setTimeout(()=>{
                                    this.form.status.loading = false;
                                    this.form.status.send = true;
                                },1000)
                            }

                        })
                        .catch(e => {
//                        console.log(e)
                        })
                }



            }

        },
        mounted(){
            this.form.height = `${this.$refs.form.clientHeight}px`;
        },
        watch: {
            status: function (newValue) {

                if(newValue){
                    window.addEventListener('keydown', this.onKeyDown);
                    window.addEventListener('click', this.closePopup);
                    disablePageScroll(this.$refs.main);
                } else {
                    window.removeEventListener('keydown', this.onKeyDown)
                    window.removeEventListener('click', this.closePopup)
                    enablePageScroll(this.$refs.main);
                    setTimeout(()=>{
                        this.form.status.loading = false;
                        this.form.status.send = false;
                    },300)

                }

            }
        },
        components: {
            'input-component': Input
        }
    }
</script>
