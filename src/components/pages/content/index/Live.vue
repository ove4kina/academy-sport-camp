<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.SECTION.live
        +e.main-container
            +e.H2.title.title #[span тренируйся #[br] и] живи
            +e.wrapper--slider
                +e.slider.swiper-container(v-swiper:main="swiper")
                    +e.wrapper.swiper-wrapper
                        +e.slide.slide__.swiper-slide(v-for="item in 3")
                            +e.wrapper
                                +e.img
                                    img(src="/public/media/images/live-slide.jpg")
                                +e.content.text-shadow
                                    span Зона отдыха
                                        b Зона отдыха
                                    p Уникальная площадка, расположенная в гористом уголке юга Таиланда в живописной, тропической зоне приморского г. Саттахипа.
                +e.navigation
                    +e.BUTTON.button--navigation.--prev.button--skew.--transparent(type="button")
                    +e.pagination
                    +e.BUTTON.button--navigation.--next.button--skew.--transparent(type="button")
            +e.wrapper--content
                +e.P.info Уникальная площадка, расположенная в гористом уголке юга Таиланда в живописной, тропической зоне приморского г. Саттахипа.
                +e.UL.list.list__
                    +e.LI.item--live.--live-width-25
                        span 10 минут
                        p Дорога до Паттайи
                    +e.LI.item--live.--live-width-25
                        span 200 +
                        p Гостей обслуживается
                    +e.LI.item--live.--live-width-43
                        span 15 тренеров
                        p Профессионалов своего дела
                +e.A.button--price.button--skew.--transparent(href="#" v-scroll-to="'#prices'")
                    span Показать цены
</template>

<script>

    export default {
        data() {
            return {
                swiper: {
                    freeMode: false,
                    init: true,
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: '.live__button--next',
                        prevEl: '.live__button--prev'
                    },
                    pagination: {
                        el: '.live__pagination',
                        type: 'fraction'
                    }
                }
            };
        },
    };
</script>