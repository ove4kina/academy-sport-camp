<template lang="pug">
    include ../../../../tools/mixins.pug

    +b#about.SECTION.about
        +e.popup(
            :class="{'active': popup.status}"
            v-on:click="closePopup"
            ref="popup"
        )
            +e.video(
                v-on:click.stop="stopProp"
            )
                +e.close(
                    v-on:click="closePopup"
                )
                youtube(video-id="CAHjrYTKOaI" ref="youtube" :width="video.width" :height="video.height" v-if="video.init")
        +e.container.container
            +e.wrapper
                +e.H2#aboutItem.title.title--custom.animated-about(
                    v-html="content.title"
                    ref="title"
                    :class="{'show': animation.show.title}"
                )
                +e.text.animated-about(
                    v-html="content.text"
                    :class="{'show': animation.show.text}"
                    ref="text"
                )
            +e.video-toggle(
                v-on:click="openPopup"
                :class="{'animated-about': animation.hide.video,'show': animation.show.video}"
                ref="video"
            )
                +e.icon
                    img(src="/public/media/images/about/play.svg")
                +e.skew-wrapper
                    +e.unskew-wrapper
                        img(src="/public/media/images/about/video-preview.jpg")
            +e.tabs-wrapper
                +e.tabs.tabs__
                    +e.BUTTON.item--program.--white.button(
                        type="button"
                        v-for="(tab,index) in content.tabs"
                        :class="{'active': activeTab === index}"
                        v-on:click="setTabIndex(index)"
                    )
                        span {{tab}}
            +e.TRANSITION-GROUP.benefits(
                name="fade"
                tag="div"
                mode="out-in"
                v-if="isMobile"
            )
                +e.benefit(
                    v-for="(benefit,index) in content.benefits"
                    :key="index"
                    v-html="benefit"
                    v-if="index === activeTab"
                    ref="benefits"
                )
            +e.benefits.animated-about(
                v-if="!isMobile"
                ref="benefits"
                :class="{'show': animation.show.benefits}"
            )
                +e.scroller
                    +e.benefit(
                        v-for="(benefit,index) in content.benefits"
                        v-html="benefit"
                        :class="{'animated-about': animation.benefit}"
                    )



</template>

<script>
    import { disablePageScroll, enablePageScroll } from 'scroll-lock';
    import {howMuchCentered} from "../../../../mixins/frontEnd/howMuchCentered";
    import {isElementInViewport} from "../../../../mixins/frontEnd/isElementInViewport";
    import {scrollTo} from "../../../../mixins/frontEnd/scrollTo";
    export default {
        mixins: [howMuchCentered,isElementInViewport,scrollTo],
        data(){

            return {
                activeTab: 0,
                minHeight: null,
                content: {
                    title: '<span><b>Что</b> <b class="del--1">такое</b></span> <b class="del--2">academy</b> <b class="del--3">sport</b> <b class="del--4">camp</b> <img src="/public/media/images/about/logo.svg"/>',
                    text: '<p>Первый функциональный спортивный лагерь в Таиланде, где можно провести незабываемое время с пользой для здоровья.</p><p>Посмотрите нашу видео-презентацию:</p>',
                    benefits: ['<h4>Проживание</h4><p>Academy Sport Camp располагается в деревне с виллами VIP-класса «Mountain Village 2». Проживание включено в разработанные нами <b data-href="program" id="toProgram"><span>программы.</span></b></p>','<h4>Тренировки</h4><p>Наш лагерь регулярно посещают настоящие <b data-href="training" id="toTraining"><span>спортивные звезды</span></b> вместе со своими наставниками. Тренируйтесь с лучшими и перенимайте опыт.</p>','<h4>Расположение</h4><p>ASC расположен в тихом месте <br><b data-href="footer" id="toFooter"><span>Паттайи</span></b>, где редко бывают туристы. Наслаждайтесь спокойным и размеренным отдыхом.</p>'],
                    tabs: ['Проживание','Тренировки','Расположение']
                },
                isMobile: false,
                video: {
                    width: 560,
                    height: 315,
                    init: false
                },
                popup:{
                    status: false
                },
                animation:{
                    hide: {
                        video: true,
                    },
                    show: {
                        title: false,
                        text: false,
                        video: false,
                        benefits: false
                    }
                }
            }
        },
        mounted(){
            if(window.innerWidth < 650){
                this.isMobile = true;
            }
            this.setVideoSize();
            this.video.init = true;

            document.addEventListener('scroll', this.animationOnScroll)
            this.animationOnScroll();
            if(window.innerWidth >= 650){
                this.setLinks();
            } else {
                setTimeout(() => {
                    document.getElementById('toProgram').addEventListener('click', this.scrollToSection);
                },100)
            }
        },
        methods: {
            setTabIndex(index){
                if(this.activeTab === 0){
                    document.getElementById('toProgram').removeEventListener('click', this.scrollToSection);
                } else if (this.activeTab === 1){
                    document.getElementById('toTraining').removeEventListener('click', this.scrollToSection);
                } else {
                    document.getElementById('toFooter').removeEventListener('click', this.scrollToSection);
                }
                this.activeTab = index;
                setTimeout(() => {
                    if(this.activeTab === 0){
                        document.getElementById('toProgram').addEventListener('click', this.scrollToSection);
                    } else if (this.activeTab === 1){
                        document.getElementById('toTraining').addEventListener('click', this.scrollToSection);
                    } else {
                        document.getElementById('toFooter').addEventListener('click', this.scrollToSection);
                    }
                },100)
            },
            setLinks(){
                document.getElementById('toFooter').addEventListener('click', this.scrollToSection);
                document.getElementById('toTraining').addEventListener('click', this.scrollToSection);
                document.getElementById('toProgram').addEventListener('click', this.scrollToSection);
            },
            removeLinks(){
                document.getElementById('toFooter').removeEventListener('click', this.scrollToSection);
                document.getElementById('toTraining').removeEventListener('click', this.scrollToSection);
                document.getElementById('toProgram').removeEventListener('click', this.scrollToSection);
            },
            scrollToSection(e){
                let element = e.target || e.srcElement;
                let id = element.parentNode.getAttribute("data-href");
                this.scrollTo(document.getElementById(id), 1000);
            },
            animationOnScroll(){
                for (let el in this.$refs) {
                    if(typeof this.$refs[el].length === 'undefined'){
                        if(typeof this.$refs[el].$el === 'undefined') {
                            if(this.isElementInViewport(this.$refs[el]) && !this.animation.show[el]){
                                this.animation.show[el] = true;
                                if(el === 'video'){
                                    this.clearAnimation();
                                }
                            }
                        }

                    }
                }
            },
            clearAnimation(){
                setTimeout(()=>{
                    this.animation.show.video = false;
                    this.animation.hide.video = false;
                },1600)
            },
            stopProp(e){
                e.stopPropagation();
            },
            setVideoSize(){

                if(window.innerWidth < 768){
                    this.video.width = window.innerWidth;
                    this.video.height = window.innerWidth * 315/560;
                } else if (window.innerWidth < 1200){
                    this.video.width = 726;
                    this.video.height = 726 * 315/560;
                } else {
                    let rem = window.innerWidth / 100;

                    if(window.innerWidth >=1600){
                        rem = 16
                    }
                    this.video.width = 870/12 * rem;
                    this.video.height = this.video.width * 315/560;
                }
            },
            openPopup(){
                this.popup.status = true;
                document.addEventListener('keydown',this.onKeyDown);
                disablePageScroll(this.$refs.popup);
            },
            closePopup(){
                this.popup.status = false;
                document.removeEventListener('keydown',this.onKeyDown);
                enablePageScroll(this.$refs.popup);
                this.$refs.youtube.player.stopVideo();
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
        },
        destroyed(){
            this.removeLinks();
            document.removeEventListener('scroll', this.animationOnScroll)
        }
    }
</script>
