<template lang="pug">
    include ../../../node_modules/bemto.pug/bemto.pug

    div(
        :class="{'main-hide': animation.mainHide, 'main-show': animation.mainShow}"
    )
        header-component
        main-component(
            @openPopup="openPopup"
            @sliderReady="initMain"
        )
        about-component
        training-component(
            @openPopup="openPopup"
        )
        program-component(
            @openPopup="openPopup"
        )
        conditions-component
        disciplines-component
        benefits-component
        <!--prices-component(-->
            <!--@openPopup="openPopup"-->
        <!--)-->
        <!--relax-component-->
        contact-form-component
        footer-component
        //popup-component(
        //    :status="popup.status"
        //    :target="popup.target"
        //    @close="closePopup"
        //)
        popup-formation-component(
            :active="popup.status"
            @closePopup="closePopup"
        )
</template>

<script>
    import Header from '@/components/pages/content/index/Header.vue'
    import Main from '@/components/pages/content/index/Main.vue'
    import About from '@/components/pages/content/index/About.vue'
    import Training from '@/components/pages/content/index/Training.vue'
    import Benefits from '@/components/pages/content/index/Benefits.vue'
    import Program from '@/components/pages/content/index/Program.vue'
    import Conditions from '@/components/pages/content/index/Conditions.vue'
    import Disciplines from '@/components/pages/content/index/Disciplines.vue'
    import Prices from '@/components/pages/content/index/Prices.vue'
    import Relax from '@/components/pages/content/index/Relax.vue'
    import ContactForm from '@/components/pages/content/index/ContactForm.vue'
    import Footer from '@/components/pages/content/index/Footer.vue'
    import Popup from '@/components/pages/content/index/Popup.vue'
    import PopupFormation from '@/components/pages/content/index/PopupFormation.vue'

    export default {
        data(){
            return {
                popup:{
                    status: false,
                    target:''
                },
                animation: {
                    mainHide: true,
                    mainShow: false
                }
            }
        },
        methods: {
            openPopup(){
                this.popup.status = true;
            },
            closePopup(){
                this.popup.status = false
            },
            initMain(){
                setTimeout(() => {
                    this.animation.mainShow = true;
                })
                setTimeout(()=>{
                    this.animation.mainShow = false;
                    this.animation.mainHide = false;
                },1800)

            }

        },
        title() {
            return 'Academy Sport Camp — Тренировочный лагерь полного цикла в Паттайе'
        },
        meta() {
            return '<meta name="description" content="Тренировки по ММА и тайскому боксу, программы восстановления и естественного детокса под надзором профессионального диетолога и отдых с удовольствием в уютном спортивном лагере Тайланда">';
        },
        components: {
            'header-component': Header,
            'main-component': Main,
            'about-component': About,
            'training-component': Training,
            'benefits-component': Benefits,
            'program-component': Program,
            'conditions-component': Conditions,
            'disciplines-component': Disciplines,
            'prices-component': Prices,
            'relax-component': Relax,
            'contact-form-component': ContactForm,
            'footer-component': Footer,
            'popup-component': Popup,
            'popup-formation-component': PopupFormation
        },
    };
</script>