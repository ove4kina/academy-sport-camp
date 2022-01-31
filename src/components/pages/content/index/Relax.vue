<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.SECTION.relax
        parallax-container.horizontal-card(v-if="!isMobile")
            +e.container.container.animation-on-scroll(ref="container" :class="{'show': scrollAnimation.container}")
                +e.H2.title.title Семейный #[span отдых]
                +e.content
                    +e.background
                        +e.img--family
                            img(:src="`public/media/images/relax/bg-${imagePrefix}.png`")
                    +e.text--noImage
                        p {{content.paragraph1}}
                    +e.line
                        +e.text--pineapple
                            span {{content.paragraph2.title}}
                            p {{content.paragraph2.text}}
                            +e.img--pineapple.--absolute
                                parallax-element.background-image(:parallaxStrength="-3" :type="'translation'")
                                    img(src="public/media/images/relax/pineapple.svg")
                            +e.img--apple.--absolute
                                parallax-element.background-image(:parallaxStrength="5" :type="'translation'")
                                    img(src="public/media/images/relax/apple.svg")
                        +e.text--banana
                            span {{content.paragraph3.title}}
                            p {{content.paragraph3.text}}
                            +e.img--juice.--absolute
                                parallax-element.background-image(:parallaxStrength="3" :type="'translation'")
                                    img(src="public/media/images/relax/juice.svg")
                            +e.img--banana.--absolute
                                parallax-element.background-image(:parallaxStrength="-5" :type="'translation'")
                                    img(src="public/media/images/relax/banana.svg")
        template(v-else)
            +e.container.container
                +e.H2.title.title Семейный #[span отдых]
                +e.content
                    +e.background
                        +e.img--family
                            img(:src="`public/media/images/relax/bg-${imagePrefix}.png`")
                        +e.text--noImage
                            p {{content.paragraph1}}
                    +e.line
                        +e.text--pineapple
                            span {{content.paragraph2.title}}
                            p {{content.paragraph2.text}}
                            +e.img--pineapple.--absolute
                                img(src="public/media/images/relax/pineapple.svg")
                            +e.img--apple.--absolute
                                img(src="public/media/images/relax/apple.svg")
                        +e.text--banana
                            span {{content.paragraph3.title}}
                            p {{content.paragraph3.text}}
                            +e.img--juice.--absolute
                                img(src="public/media/images/relax/juice.svg")
                            +e.img--banana.--absolute
                                img(src="public/media/images/relax/banana.svg")
</template>

<script>
    import {isAnyElementInViewport} from "../../../../mixins/frontEnd/isAnyElementInViewport";
    import {getScroll} from "../../../../mixins/frontEnd/getScroll";
    export default {
        mixins: [isAnyElementInViewport,getScroll],
        data() {
            return {
                scrollAnimation:{
                    container: false
                },
                isMobile: false,
                imagePrefix: 'mobile',
                content: {
                    paragraph1: 'Это хорошая возможность провести незабываемое время вместе с близкими. Восстановить силы и посетить значимые места Паттайи.',
                    paragraph2: {
                        title: 'Будьте здоровы ',
                        text: 'Наслаждайтесь вкуснейшими тропическими фруктами и коктейлями из свежего манго, которые помогают вашему организму провести полную детоксикацию.'
                    },
                    paragraph3: {
                        title: 'Наслаждайтесь отдыхом',
                        text: 'На территории расположены SPA, спортивная площадка, бассейн и прочие приятные мелочи.'
                    }
                }
            };
        },
        mounted() {
            this.imagePrefix = this.setImagesPrefix();
            if (window.innerWidth >= 1200) {
                this.isMobile = false;
                window.addEventListener('scroll', this.animationOnScroll)
            } else {
                this.isMobile = true;
            }
        },
        methods: {
            animationOnScroll(){
                for (let el in this.$refs) {
                    if(this.isAnyElementInViewport(this.$refs[el]) && !this.scrollAnimation[el] && this.howMuchCentered(this.$refs[el]) > -0.4){
                        this.scrollAnimation[el] = true;
                    }
                }
            },
            howMuchCentered(el) {
                let elementOffsetTop = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop),
                    rect = el.getBoundingClientRect(),
                    viewportHeight = window.innerHeight,
                    k = (2*this.getScroll().y-2*elementOffsetTop+viewportHeight-rect.height)/(viewportHeight + rect.height);
                return k;
            },
            setImagesPrefix(){
                if(window.innerWidth < 650){
                    return 'mobile'
                } else if(window.innerWidth < 1200){
                    return 'tablet'
                } else {
                    return 'desktop'
                }
            }
        }
    };
</script>